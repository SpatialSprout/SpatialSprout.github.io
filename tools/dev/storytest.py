"""Play each learn spread's story step to the end (no audio, fallback pacing); report errors and unmatched sync words."""
import sys, json, os, re
from playwright.sync_api import sync_playwright
port=sys.argv[1]; V='/root/vendor'; only=sys.argv[2].split(',') if len(sys.argv)>2 else None
errs=[]
with sync_playwright() as p:
    b=p.chromium.launch(args=['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader'])
    pg=b.new_page(viewport={'width':900,'height':700})
    cur={'id':''}
    pg.on('console',lambda m: errs.append(cur['id']+' '+m.text) if m.type in ('error','warning') else None)
    pg.on('pageerror',lambda e: errs.append(cur['id']+' PAGEERROR '+str(e)))
    pg.route('**/three.min.js',lambda r:r.fulfill(path=f'{V}/three/build/three.min.js',content_type='text/javascript'))
    pg.route('**/SVGLoader.js',lambda r:r.fulfill(path=f'{V}/three/examples/js/loaders/SVGLoader.js',content_type='text/javascript'))
    pg.route('**/OrbitControls.js',lambda r:r.fulfill(path=f'{V}/three/examples/js/controls/OrbitControls.js',content_type='text/javascript'))
    pg.route('**/voice.js*',lambda r:r.fulfill(body='window.VOICE={};',content_type='text/javascript'))
    pg.route('**/fonts.googleapis.com/**',lambda r:r.fulfill(body='',content_type='text/css'));pg.route('**/fonts.gstatic.com/**',lambda r:r.abort())
    pg.goto(f'http://localhost:{port}/index.html',timeout=120000); pg.wait_for_function('window.PM&&PM.debug&&PM.debug.SP.length>1',timeout=60000)
    pg.evaluate("async()=>{const D=PM.debug;D.norender=true;D.TS=.05;D.openBook(0);for(let i=0;i<60;i++){D.sim(.5);await new Promise(r=>setTimeout(r,5));}}")
    n=pg.evaluate("PM.debug.SP.length")
    for t in range(1,n,2):
        lid=pg.evaluate(f"PM.debug.SP[{t}].id");cur['id']=lid
        if only and lid not in only:continue
        r=pg.evaluate(f"""async()=>{{const D=PM.debug;D.goSpread({t});for(let i=0;i<300&&D.busy;i++){{D.sim(.5);await new Promise(r=>setTimeout(r,5));}}
          const sp=D.SP[{t}];const last=sp.steps.length-1;D.setStep(last);const s=sp.steps[last];
          for(let i=0;i<500;i++){{D.sim(.1);if(i%20==0)await new Promise(r=>setTimeout(r,2));}}
          const st=D.S.st;return {{read:!!s.storyRead,wi:st.wi,n:PM.storyOf(sp.L.id).toks.length,steps:sp.steps.map(x=>x.say)}};}}""")
        print(lid,r['read'],r['wi'],r['n'],len(r['steps']),flush=True)
    b.close()
print('ISSUES',len(errs));[print(' ',e[:240]) for e in errs[:80]]
