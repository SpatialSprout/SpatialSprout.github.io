import json,subprocess,sys,os,shutil
d=sys.argv[1];out=json.loads(subprocess.run(['node','/root/work/units.js',d],capture_output=True,text=True).stdout)
P=json.load(open('/root/work/allpics.json'));P.update(json.load(open('/root/work/g2/extra.json')))
extra=sys.argv[2:]  # names used only in scenes
names=sorted(set(out['names'])|set(extra)|{'book'})
miss=[n for n in names if n not in P];pm={n:P[n] for n in names if n in P}
os.makedirs(d+'/e',exist_ok=True)
for c in set(pm.values()):
    s='/root/vendor/twemoji/assets/svg/'+c+'.svg'
    if os.path.exists(s):shutil.copy(s,d+'/e/'+c+'.svg')
    else:print('NO SVG',c)
open(d+'/pics.js','w').write('window.PICS='+json.dumps(pm,separators=(',',':'))+';')
print('pics',len(pm),'missing',miss)
for u in out['units']:
    if u['rounds']<10:print('FEW ROUNDS',u)
