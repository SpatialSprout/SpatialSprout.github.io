import sys
from playwright.sync_api import sync_playwright
port=sys.argv[1];V='/root/vendor';errs=[]
with sync_playwright() as p:
    b=p.chromium.launch(args=['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader'])
    pg=b.new_page(viewport={'width':800,'height':600});cur={'id':''}
    pg.on('console',lambda m: errs.append(cur['id']+' '+m.text) if m.type=='error' else None);pg.on('pageerror',lambda e: errs.append(cur['id']+' PAGEERROR '+str(e)))
    for pat,f in [('**/three.min.js',f'{V}/three/build/three.min.js'),('**/SVGLoader.js',f'{V}/three/examples/js/loaders/SVGLoader.js'),('**/OrbitControls.js',f'{V}/three/examples/js/controls/OrbitControls.js')]:
        pg.route(pat,(lambda ff:(lambda r:r.fulfill(path=ff,content_type='text/javascript')))(f))
    pg.route('**/voice.js*',lambda r:r.fulfill(body='window.VOICE={};',content_type='text/javascript'))
    pg.route('**/fonts.googleapis.com/**',lambda r:r.fulfill(body='',content_type='text/css'));pg.route('**/fonts.gstatic.com/**',lambda r:r.abort())
    pg.goto(f'http://localhost:{port}/index.html',timeout=120000);pg.wait_for_function('window.PM&&PM.debug&&PM.debug.SP.length>1',timeout=60000)
    pg.evaluate("async()=>{const D=PM.debug;D.norender=true;D.TS=.05;D.openBook(0);for(let i=0;i<60;i++){D.sim(.5);await new Promise(r=>setTimeout(r,5));}}")
    n=pg.evaluate("PM.debug.SP.length");dock=0
    for t in range(1,n):
        cur['id']=pg.evaluate(f"PM.debug.SP[{t}].id")
        r=pg.evaluate(f"""async()=>{{const D=PM.debug;D.goSpread({t});for(let i=0;i<300&&D.busy;i++){{D.sim(.5);await new Promise(r=>setTimeout(r,5));}}const sp=D.SP[{t}];let dk=0;
          for(let s=0;s<sp.steps.length;s++){{D.setStep(s);for(let i=0;i<25;i++)D.sim(.1);await new Promise(r=>setTimeout(r,2));if(sp.kind==='learn'&&!document.getElementById('dock').hidden)dk++;}}
          if(sp.kind==='play'){{for(let r=0;r<5;r++){{try{{D.api.task(r);}}catch(e){{console.error('task',r,e.message);}}for(let i=0;i<10;i++)D.sim(.1);}}}}return dk;}}""")
        dock+=r
    print('spreads',n,'learn-dock-visible',dock);b.close()
print('ISSUES',len(errs));[print(' ',e[:220]) for e in errs[:40]]
