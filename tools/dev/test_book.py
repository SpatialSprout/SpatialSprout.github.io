"""WebGL test for a SpatialSprout book: every spread, every theory cue, demos, tasks, page renders.
usage: python3 test_book.py <port> <outdir> [shots]"""
import sys, json, os, re
from playwright.sync_api import sync_playwright
port, out = sys.argv[1], sys.argv[2]; shots = len(sys.argv) > 3
os.makedirs(out, exist_ok=True)
V = '/root/vendor'
FONTS = {'Zilla Slab': f'{V}/gf/ofl/zillaslab/ZillaSlab-Bold.ttf', 'Atkinson Hyperlegible': f'{V}/gf/ofl/atkinsonhyperlegible/AtkinsonHyperlegible-Regular.ttf', 'Patrick Hand': f'{V}/gf/ofl/patrickhand/PatrickHand-Regular.ttf'}
CSS = ''.join(f"@font-face{{font-family:'{k}';src:url(http://localhost:{port}/__font/{i}.ttf);font-weight:{'700' if 'Zilla' in k else '400'}}}" for i, k in enumerate(FONTS))
CSS += f"@font-face{{font-family:'Atkinson Hyperlegible';font-weight:700;src:url(http://localhost:{port}/__font/9.ttf)}}@font-face{{font-family:'Zilla Slab';font-weight:600;src:url(http://localhost:{port}/__font/0.ttf)}}"
FF = list(FONTS.values()) + [None] * 6 + [f'{V}/gf/ofl/atkinsonhyperlegible/AtkinsonHyperlegible-Bold.ttf']
errs = []
with sync_playwright() as p:
    b = p.chromium.launch(args=['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--autoplay-policy=no-user-gesture-required'])
    pg = b.new_page(viewport={'width': 1280, 'height': 800})
    pg.on('console', lambda m: errs.append(m.text) if m.type in ('error',) else None)
    pg.on('pageerror', lambda e: errs.append('PAGEERROR ' + str(e)))
    pg.route('**/three.min.js', lambda r: r.fulfill(path=f'{V}/three/build/three.min.js', content_type='text/javascript'))
    pg.route('**/SVGLoader.js', lambda r: r.fulfill(path=f'{V}/three/examples/js/loaders/SVGLoader.js', content_type='text/javascript'))
    pg.route('**/voice.js*', lambda r: r.fulfill(body='window.VOICE={};', content_type='text/javascript'))
    pg.route('**/OrbitControls.js', lambda r: r.fulfill(path=f'{V}/three/examples/js/controls/OrbitControls.js', content_type='text/javascript'))
    pg.route('**/fonts.googleapis.com/**', lambda r: r.fulfill(body=CSS, content_type='text/css'))
    pg.route('**/fonts.gstatic.com/**', lambda r: r.abort())
    pg.route(re.compile(r'.*/__font/\d+\.ttf'), lambda r: r.fulfill(path=FF[int(r.request.url.split('/')[-1][:-4])], content_type='font/ttf'))
    pg.goto(f'http://localhost:{port}/index.html'); pg.wait_for_function('window.PM&&PM.debug&&PM.debug.SP.length>1', timeout=60000)
    pg.wait_for_timeout(1500)
    pg.evaluate(f"()=>{{window.__S={os.environ.get('S','1')};window.__N={os.environ.get('N','999')};}}")
    res = pg.evaluate("""async()=>{const D=PM.debug,out={spreads:0,cues:[],empty:[],tasks:0,errs:[]};D.TS=.02;const wait=ms=>new Promise(r=>setTimeout(r,ms));
      const waitIdle=async()=>{for(let i=0;i<200&&D.busy;i++){D.sim(.5);await wait(20);}};
      D.openBook(0);for(let i=0;i<40;i++){D.sim(.5);await wait(10);}await waitIdle();
      for(let t=+(window.__S||1);t<Math.min(D.SP.length,+(window.__S||1)+(+(window.__N||999)));t++){D.goSpread(t);await wait(5);await waitIdle();out.spreads++;const sp=D.SP[t];
        if(sp.kind==='learn'){for(let i=0;i<sp.steps.length;i++){D.setStep(i);await wait(30);D.sim(.3);const s=sp.steps[i];
            if(s.cues)for(const c0 of s.cues){const c=Array.isArray(c0)?{w:c0[0],p:c0[1],l:c0[2]}:Object.assign({},c0);
              try{if(c.demo&&D.api.demo)D.api.demo(c.demo);}catch(e){out.errs.push(sp.L.id+' demo '+c.demo+': '+e);}
              await wait(160);D.sim(.6);await wait(40);
              if(c.p||c.l){PM.spot.on(c);D.sim(.5);const L=PM.spot.list;const last=L[L.length-1];const n=last?last.recs.length:0;out.cues.push(n);if(c.p&&!n)out.empty.push(sp.L.id+' step'+i+' "'+c.w+'"');}}
          }}
        if(sp.kind==='play'){for(let r=0;r<((window.BOOK&&BOOK.rounds)||5);r++){try{D.api.task(r);out.tasks++;}catch(e){out.errs.push(sp.L.id+' task'+r+': '+e);}}}
      }
      return out;}""")
    print(json.dumps({k: (v if k != 'cues' else len(v)) for k, v in res.items()}, indent=1))
    if shots:
        def shot(t, step, name, cue=None):
            pg.evaluate(f"""async()=>{{const D=PM.debug;D.goSpread({t});for(let i=0;i<300&&D.busy;i++){{D.sim(.5);await new Promise(r=>setTimeout(r,15));}}D.setStep({step});for(let i=0;i<10;i++){{D.sim(.2);await new Promise(r=>setTimeout(r,30));}}
              const s=D.SP[{t}].steps[{step}];if(s.cues){{const cs=s.cues.map(c=>Array.isArray(c)?{{w:c[0],p:c[1],l:c[2]}}:c);const upto={cue if cue is not None else 'cs.length-1'};for(let k=0;k<=upto;k++){{const c=cs[k];if(c.demo&&D.api.demo)D.api.demo(c.demo);for(let i=0;i<12;i++){{D.sim(.2);await new Promise(r=>setTimeout(r,25));}}if(c.p||c.l)PM.spot.on(Object.assign({{}},c,{{keep:k>0&&c.keep}}));}}}}
              for(let i=0;i<20;i++){{D.sim(.1);await new Promise(r=>setTimeout(r,15));}}}}""")
            pg.wait_for_timeout(300); pg.screenshot(path=f'{out}/{name}.png')
        for name, t, st, cue in json.loads(sys.argv[3]):
            shot(t, st, name, cue)
        pg.evaluate("()=>{const D=PM.debug;}")
    print('ERRORS', len(errs)); [print(' ', e[:300]) for e in errs[:30]]
    b.close()
