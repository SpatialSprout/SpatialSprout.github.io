import sys,json
from playwright.sync_api import sync_playwright
port,out=sys.argv[1],sys.argv[2];V='/root/vendor'
with sync_playwright() as p:
    b=p.chromium.launch(args=['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader'])
    pg=b.new_page(viewport={'width':800,'height':600})
    for pat,f in [('**/three.min.js',f'{V}/three/build/three.min.js'),('**/SVGLoader.js',f'{V}/three/examples/js/loaders/SVGLoader.js'),('**/OrbitControls.js',f'{V}/three/examples/js/controls/OrbitControls.js')]:
        pg.route(pat,(lambda ff:(lambda r:r.fulfill(path=ff,content_type='text/javascript')))(f))
    pg.route('**/voice.js*',lambda r:r.fulfill(body='window.VOICE={};',content_type='text/javascript'))
    pg.route('**/fonts.googleapis.com/**',lambda r:r.fulfill(body='',content_type='text/css'));pg.route('**/fonts.gstatic.com/**',lambda r:r.abort())
    pg.goto(f'http://localhost:{port}/index.html',timeout=120000);pg.wait_for_function('window.PM&&PM.debug&&PM.debug.SP.length>1',timeout=60000)
    pg.wait_for_timeout(1500)
    res=pg.evaluate("()=>{const D=PM.debug;const o=[];D.SP.forEach((sp,i)=>{if(sp.kind!=='learn')return;const t=PM.theoryText(i);o.push({id:sp.id,speech:t.speech,n:t.words.length});});return o;}")
    json.dump(res,open(out,'w'));print(len(res),sum(r['n'] for r in res));b.close()
