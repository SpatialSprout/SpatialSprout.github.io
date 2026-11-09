import sys, json, threading, functools
from http.server import HTTPServer, SimpleHTTPRequestHandler
from playwright.sync_api import sync_playwright

book = sys.argv[1] if len(sys.argv) > 1 else "books/grade-1-english"
out = sys.argv[2] if len(sys.argv) > 2 else "theory_text.json"
port = int(sys.argv[3]) if len(sys.argv) > 3 else 8123

Handler = functools.partial(SimpleHTTPRequestHandler, directory=book)
server = HTTPServer(("127.0.0.1", port), Handler)
threading.Thread(target=server.serve_forever, daemon=True).start()

with sync_playwright() as p:
    b = p.chromium.launch(args=["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"])
    pg = b.new_page(viewport={"width": 800, "height": 600})
    pg.route("**/voice.js*", lambda r: r.fulfill(body="window.VOICE={};", content_type="text/javascript"))
    pg.route("**/vtime.js*", lambda r: r.fulfill(body="window.VTIME={};", content_type="text/javascript"))
    pg.route("**/fonts.googleapis.com/**", lambda r: r.fulfill(body="", content_type="text/css"))
    pg.route("**/fonts.gstatic.com/**", lambda r: r.abort())
    pg.goto("http://127.0.0.1:%d/index.html" % port, timeout=120000)
    pg.wait_for_function("window.PM&&PM.debug&&PM.debug.SP.length>1", timeout=60000)
    pg.wait_for_timeout(1500)
    res = pg.evaluate("()=>{const D=PM.debug;const o=[];D.SP.forEach((sp,i)=>{if(sp.kind!=='learn')return;const t=PM.theoryText(i);o.push({id:sp.id,speech:t.speech,n:t.words.length});});return o;}")
    json.dump(res, open(out, "w"))
    print("theory_spreads=%d total_words=%d" % (len(res), sum(r["n"] for r in res)))
    b.close()
server.shutdown()
