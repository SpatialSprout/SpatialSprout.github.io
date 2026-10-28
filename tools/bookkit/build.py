"""Assemble a book folder from the shared engine.
Usage: python3 build.py <book-folder>
The folder holds book.js (window.BOOK = {...}) and lessons-*.js. book.js lists the lesson
files in BOOK.files. This writes index.html and copies brand.js from engine/."""
import json,os,re,shutil,sys
here=os.path.dirname(os.path.abspath(__file__));d=os.path.abspath(sys.argv[1])
bj=open(os.path.join(d,'book.js')).read()
m=re.search(r'files\s*:\s*(\[[^\]]*\])',bj);files=json.loads(m.group(1).replace("'",'"'))
g=re.search(r'grade\s*:\s*(\d+)',bj).group(1);subj=re.search(r"subject\s*:\s*['\"]([^'\"]+)",bj).group(1)
eng=open(os.path.join(here,'engine.html')).read()
eng=eng.replace('/*LINES*/{}',open(os.path.join(here,'lines.json')).read().strip())
eng=eng.replace('{{TITLE}}',f'The Interactive Classroom: Grade {g} {subj}').replace('{{LESSON_SCRIPTS}}','\n'.join(f'<script src="{f}"></script>' for f in files))
HEAD=('<!doctype html>\n<html lang="en-CA">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n'
  '<style>:root{color-scheme:light;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}body{margin:0;font:14px system-ui,sans-serif}img{max-width:100%}[hidden]{display:none!important}</style>\n</head>\n<body>\n')
import hashlib
def ver(f):
    p=os.path.join(d,f) if f!='brand.js' else os.path.join(here,'brand.js')
    return hashlib.md5(open(p,'rb').read()).hexdigest()[:8] if os.path.exists(p) else '1'
for f in ['book.js','brand.js','voice.js']+files:eng=eng.replace(f'<script src="{f}"></script>',f'<script src="{f}?v={ver(f)}"></script>')
open(os.path.join(d,'index.html'),'w').write(HEAD+eng+'\n</body>\n</html>\n')
open(os.path.join(d,'preview.html'),'w').write(eng)  # skeleton-less copy for artifact previews
shutil.copy(os.path.join(here,'brand.js'),os.path.join(d,'brand.js'))
print('built',d,files)
