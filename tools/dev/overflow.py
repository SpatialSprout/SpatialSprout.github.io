"""WebGL test for a SpatialSprout book: every spread, every theory cue, demos, tasks, page renders.
pages/screens: shots.py port out json[[name,spread,step,mode,arg]] mode=page|screen|round"""
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
    pg = b.new_page(viewport={'width': int(os.environ.get('VW','1280')), 'height': int(os.environ.get('VH','800'))},device_scale_factor=float(os.environ.get('DPR','1')))
    pg.on('console', lambda m: errs.append(m.text) if m.type in ('error',) else None)
    pg.on('pageerror', lambda e: errs.append('PAGEERROR ' + str(e)))
    pg.route('**/three.min.js', lambda r: r.fulfill(path=f'{V}/three/build/three.min.js', content_type='text/javascript'))
    pg.route('**/SVGLoader.js', lambda r: r.fulfill(path=f'{V}/three/examples/js/loaders/SVGLoader.js', content_type='text/javascript'))
    pg.route('**/voice.js', lambda r: r.fulfill(body='window.VOICE={};', content_type='text/javascript'))
    pg.route('**/OrbitControls.js', lambda r: r.fulfill(path=f'{V}/three/examples/js/controls/OrbitControls.js', content_type='text/javascript'))
    pg.route('**/fonts.googleapis.com/**', lambda r: r.fulfill(body=CSS, content_type='text/css'))
    pg.route('**/fonts.gstatic.com/**', lambda r: r.abort())
    pg.route(re.compile(r'.*/__font/\d+\.ttf'), lambda r: r.fulfill(path=FF[int(r.request.url.split('/')[-1][:-4])], content_type='font/ttf'))
    pg.goto(f'http://localhost:{port}/index.html'); pg.wait_for_function('window.PM&&PM.debug&&PM.debug.SP.length>1', timeout=60000)
    pg.wait_for_timeout(1500)
    r=pg.evaluate("""async()=>{const D=PM.debug;D.TS=.05;D.openBook(0);for(let i=0;i<40;i++){D.sim(.5);await new Promise(r=>setTimeout(r,10));}const out=[];
      for(let t=1;t<D.SP.length;t++){const sp=D.SP[t];if(!sp.L)continue;D.goSpread(t);for(let i=0;i<200&&D.busy;i++){D.sim(.5);await new Promise(r=>setTimeout(r,5));}
        try{const y=sp.kind==='learn'?sp.L.left(D.leftP,sp.S):null;if(y!=null&&y>1300)out.push([t,sp.L.id,sp.kind,Math.round(y)]);}catch(e){out.push([t,sp.L.id,'ERR '+e]);}}
      return out;}""")
    print('OVERFLOW',json.dumps(r))
    print('ERRORS', len(errs)); [print(' ', e[:300]) for e in errs[:20]]
    b.close()
