"""WebGL test for a SpatialSprout book: every spread, every theory cue, demos, tasks, page renders.
collect spoken strings"""
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
    pg.route('**/voice.js', lambda r: r.fulfill(body='window.VOICE={};', content_type='text/javascript'))
    pg.route('**/OrbitControls.js', lambda r: r.fulfill(path=f'{V}/three/examples/js/controls/OrbitControls.js', content_type='text/javascript'))
    pg.route('**/fonts.googleapis.com/**', lambda r: r.fulfill(body=CSS, content_type='text/css'))
    pg.route('**/fonts.gstatic.com/**', lambda r: r.abort())
    pg.route(re.compile(r'.*/__font/\d+\.ttf'), lambda r: r.fulfill(path=FF[int(r.request.url.split('/')[-1][:-4])], content_type='font/ttf'))
    pg.goto(f'http://localhost:{port}/index.html'); pg.wait_for_function('window.PM&&PM.debug&&PM.debug.SP.length>1', timeout=60000)
    pg.wait_for_timeout(1500)
    res = pg.evaluate("""()=>{const D=PM.debug,out=[];D.SP.forEach(sp=>{(sp.steps||[]).forEach(s=>out.push(s.speech||s.say));});return out;}""")
    lines=json.load(open('/root/site/tools/bookkit/lines.json'))
    extra=pg.evaluate("()=>[(window.BOOK&&BOOK.winLine)||'Amazing! You finished all '+['zero','one','two','three','four','five','six','seven','eight','nine','ten'][(window.BOOK&&BOOK.rounds)||5]+' questions!'].concat(((window.BOOK&&BOOK.goLines)||[]).map(x=>typeof x==='string'?x:x.speech))")
    for k,v in lines.items():
        if isinstance(v,list): res+= [x for x in v if isinstance(x,str)]
        elif isinstance(v,str): res.append(v)
    ranks=[r[1] for r in lines['ranksKid']+lines['ranksOld']]
    res+= [lines['rankUp']+' '+('an' if n[0] in 'AEIOU' else 'a')+' '+n+'!' for n in ranks]
    res+= extra+['Tap the cover to open the book.']
    res=[r for r in dict.fromkeys(res) if r]
    json.dump(res,open(out+'/strings.json','w'),indent=0);print('strings',len(res))
    print('ERRORS', len(errs)); [print(' ', e[:300]) for e in errs[:10]]
    b.close()
