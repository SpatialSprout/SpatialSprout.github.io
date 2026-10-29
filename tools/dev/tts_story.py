"""Story narration with word timings. usage: python3 tts_story.py <book-dir> <stories.json>
Each story is spoken sentence by sentence (so sentence starts are exact), then each word's end time is
placed inside its sentence by its length. Writes voice/<fnv>.mp3, merges voice.js and writes vtime.js."""
import sys,os,json,re,subprocess,numpy as np,wave
sys.path.insert(0,'/root/work');import tts
d=sys.argv[1];stories=json.load(open(sys.argv[2]))
vd=os.path.join(d,'voice');vj=os.path.join(d,'voice.js');V=json.loads(open(vj).read().split('=',1)[1].rstrip().rstrip(';'))
tj=os.path.join(d,'vtime.js');T={}
if os.path.exists(tj):
    try:T=json.loads(open(tj).read().split('=',1)[1].rstrip().rstrip(';'))
    except Exception:T={}
SR=24000;GAP=float(os.environ.get('GAP','.3'));SPEED=float(os.environ.get('SPEED','.95'))
def trim(a,th=.012):
    idx=np.where(np.abs(a)>th)[0]
    if not len(idx):return a
    return a[max(0,idx[0]-int(.03*SR)):min(len(a),idx[-1]+int(.06*SR))]
def weight(w):
    core=re.sub(r'[^A-Za-z0-9]','',w);x=len(core)*1.0+1.6
    if re.search(r'[,;:]["”]?$',w):x+=3.0
    if re.search(r'[.!?]["”]?$',w):x+=1.0
    return x
force='--force' in sys.argv
for s in stories:
    sp=s['speech'];h=tts.fnv(sp);out=os.path.join(vd,h+'.mp3')
    if h in T and os.path.exists(out) and not force:continue
    ws0=sp.split();sents=[];cur=[]
    for i,w in enumerate(ws0):
        cur.append(w);nx=ws0[i+1] if i+1<len(ws0) else ''
        if re.search(r'[.!?]["”]?$',w) and (not nx or re.match(r'["“A-Z0-9]',nx)) and w not in ('Mr.','Mrs.','Dr.','T.','St.'):sents.append(' '.join(cur));cur=[]
        elif len(cur)>=24 and re.search(r'[.,;:!?…]["”)]?$',w):sents.append(' '.join(cur));cur=[]
    if cur:sents.append(' '.join(cur))
    assert ' '.join(sents).split()==sp.split(),s['id']
    audio=[np.zeros(int(.12*SR),dtype=np.float32)];t=.12;ends=[]
    for se in sents:
        a=trim(tts.synth(se,speed=SPEED).astype(np.float32));dur=len(a)/SR;ws=se.split();wt=[weight(w) for w in ws];tot=sum(wt);c=0
        for w in wt:c+=w;ends.append(round(t+dur*c/tot,3))
        audio+= [a,np.zeros(int(GAP*SR),dtype=np.float32)];t+=dur+GAP
    a=np.clip(np.concatenate(audio),-1,1);w=f'/tmp/{h}.wav'
    with wave.open(w,'wb') as f:f.setnchannels(1);f.setsampwidth(2);f.setframerate(SR);f.writeframes((a*32767).astype('<i2').tobytes())
    subprocess.run(['ffmpeg','-v','error','-y','-i',w,'-ac','1','-b:a','48k',out]);os.remove(w)
    V[h]=round(len(a)/SR,2);T[h]=ends;print(s['id'],h,V[h],len(ends),flush=True)
    open(vj,'w').write('window.VOICE='+json.dumps(V,separators=(',',':'))+';')
    open(tj,'w').write('window.VTIME='+json.dumps(T,separators=(',',':'))+';')
print('done')
