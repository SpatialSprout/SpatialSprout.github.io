import base64,os,time
from playwright.sync_api import sync_playwright
V='/root/vendor';OUT='/tmp/claude-0/-home-claude/70a6bbde-7603-5391-bb56-635fe56bb8c7/scratchpad/baked'
with sync_playwright() as p:
    b=p.chromium.launch(args=['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--mute-audio']);pg=b.new_page(viewport={'width':640,'height':400})
    def rt(v):return lambda r,q=None:r.fulfill(path=f'{V}/three/{v}',content_type='text/javascript')
    for k,v in [('three.min.js','build/three.min.js'),('SVGLoader.js','examples/js/loaders/SVGLoader.js'),('OrbitControls.js','examples/js/controls/OrbitControls.js')]:pg.route('**/'+k,rt(v))
    pg.route('**/fonts.googleapis.com/**',lambda r,q=None:r.fulfill(body='',content_type='text/css'))
    pg.route('**/gate.js*',lambda r,q=None:r.fulfill(body='',content_type='text/javascript'))
    pg.goto('http://localhost:8884/books/kindergarten-jk/index.html');pg.wait_for_function('window.PM&&PM.debug&&PM.debug.SP.length>1',timeout=120000)
    pg.add_script_tag(path='/root/repos/three-r128/examples/js/exporters/GLTFExporter.js')
    keys=pg.evaluate("Object.keys(BOOK.glb)");print(len(keys),keys)
    pg.evaluate("()=>{'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach(c=>{try{PM.onSpread({L:{id:'a'+c}});}catch(e){}});(BOOK.glbLessons||[]).forEach(id=>{try{PM.onSpread({L:{id}});}catch(e){}});}")
    t=time.time()
    while time.time()-t<1500:
        n=pg.evaluate("Object.keys(PM.GLBM||{}).length")
        if n>=len(keys):break
        time.sleep(10)
    done=pg.evaluate("Object.keys(PM.GLBM||{})");print('ready',len(done),round(time.time()-t))
    for k in done:
        b64=pg.evaluate("""(k)=>new Promise(res=>{const o=PM.GLBM[k](1);o.updateMatrixWorld(true);
          /* bake: one mesh per material piece, world transform applied, keep position, normal, color */
          const g=new THREE.Group();o.traverse(x=>{if(x.isMesh){const geo=x.geometry.clone();geo.applyMatrix4(x.matrixWorld);['uv','uv2','tangent'].forEach(a=>geo.deleteAttribute&&geo.attributes[a]&&geo.deleteAttribute(a));
            const m=new THREE.Mesh(geo,new THREE.MeshStandardMaterial({vertexColors:true}));g.add(m);}});
          new THREE.GLTFExporter().parse(g,buf=>{let s='';const u=new Uint8Array(buf);for(let i=0;i<u.length;i+=32768)s+=String.fromCharCode.apply(null,u.subarray(i,i+32768));res(btoa(s));},{binary:true});})""",k)
        open(f'{OUT}/{k}.glb','wb').write(base64.b64decode(b64))
    print('written',len(os.listdir(OUT)))
    b.close()
