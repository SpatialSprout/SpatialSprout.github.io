import sys,os,re,json
from playwright.sync_api import sync_playwright
port=sys.argv[1];out=sys.argv[2];V='/root/vendor'
with sync_playwright() as p:
    b=p.chromium.launch(args=['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader'])
    pg=b.new_page(viewport={'width':1400,'height':1000});errs=[]
    pg.on('console',lambda m: errs.append(m.text) if m.type=='error' else None);pg.on('pageerror',lambda e: errs.append(str(e)))
    for pat,f in [('**/three.min.js',f'{V}/three/build/three.min.js'),('**/SVGLoader.js',f'{V}/three/examples/js/loaders/SVGLoader.js'),('**/OrbitControls.js',f'{V}/three/examples/js/controls/OrbitControls.js')]:
        pg.route(pat,lambda r,f=f:r.fulfill(path=f,content_type='text/javascript'))
    pg.route('**/voice.js*',lambda r:r.fulfill(body='window.VOICE={};',content_type='text/javascript'))
    pg.route('**/fonts.googleapis.com/**',lambda r:r.fulfill(body='',content_type='text/css'));pg.route('**/fonts.gstatic.com/**',lambda r:r.abort())
    pg.goto(f'http://localhost:{port}/index.html',timeout=120000);pg.wait_for_function('window.PM&&PM.debug&&PM.debug.SP.length>1',timeout=60000)
    pg.evaluate("async()=>{const D=PM.debug;D.TS=.05;D.openBook(1);for(let i=0;i<80;i++){D.sim(.3);await new Promise(r=>setTimeout(r,10));}}")
    names=pg.evaluate("Object.keys(PM.PROP3)")
    per=int(os.environ.get('PER','30'))
    for k in range(0,len(names),per):
        chunk=names[k:k+per]
        pg.evaluate("""async(ns)=>{const D=PM.debug,P=PM;const sc=P.STAGE.cur;while(sc.g.children.length)sc.g.remove(sc.g.children[0]);
          ns.forEach((n,i)=>{const p=sc.prop(n,-1.8+(i%6)*.72,-3.6+Math.floor(i/6)*.55,{label:false,bare:true,tap:false,s:.55});const L=P.label(n,{size:.12,bg:'#ffffff'});L.position.set(-1.8+(i%6)*.72,.05,-3.35+Math.floor(i/6)*.55);sc.g.add(L);});
          for(let i=0;i<20;i++){D.sim(.1);await new Promise(r=>setTimeout(r,10));}}""",chunk)
        pg.wait_for_timeout(300);pg.screenshot(path=f'{out}/g{k//per}.png',timeout=180000)
    print('ERR',errs[:5]);b.close()
