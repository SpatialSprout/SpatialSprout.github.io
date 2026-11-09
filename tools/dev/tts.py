"""Kokoro TTS for SpatialSprout books. usage: python3 tts.py <book-dir> <strings.json> [speed]
Writes voice/<fnv>.mp3 for each new string and merges durations into voice.js."""
import sys,os,json,re,subprocess,numpy as np,onnxruntime as ort,wave
K='/root/vendor/kok';PP=K+'/piper_phonemize'
env=dict(os.environ,LD_LIBRARY_PATH=PP+'/lib')
def fnv(t):
    h=0x811c9dc5
    for u in t.encode('utf-16-le').hex() and [int.from_bytes(t.encode('utf-16-le')[i:i+2],'little') for i in range(0,len(t.encode('utf-16-le')),2)]:
        h^=u;h=(h*0x01000193)&0xffffffff
    return '%08x'%h
# Phonics: letter -> its spoken sound, for when a lone letter means a SOUND
# rather than its name ("the first sound is m" -> "mmm", not "em").
# Set SOUNDS=0 in the environment to disable this mapping.
LETTER_SOUNDS = {
    'b':'buh','c':'kuh','d':'duh','f':'fff','g':'guh','h':'huh','j':'juh',
    'k':'kuh','l':'lll','m':'mmm','n':'nnn','p':'puh','q':'kwuh','r':'rrr',
    's':'sss','t':'tuh','v':'vvv','w':'wuh','x':'ks','y':'yuh','z':'zzz',
}

def _sound(m):
    return LETTER_SOUNDS.get(m.group(1).lower(), m.group(1))

def norm(t):
    # Collapse every run of whitespace/newlines to one space: raw line breaks
    # otherwise read as abrupt, robotic pauses.
    t = re.sub(r'\s+', ' ', t).strip()
    # Normalize smart punctuation so espeak-ng never reads literal glyphs.
    t = (t.replace('\u2018', "'").replace('\u2019', "'")
          .replace('\u201c', '"').replace('\u201d', '"')
          .replace('\u2013', ', ').replace('\u2014', ', ')
          .replace('\u2026', '.').replace('\u00a0', ' '))
    # Fill-in-the-blank markers become a spoken word, never "underscore".
    t = re.sub(r'_{2,}', ' blank ', t)
    # Strip visual emphasis markers (UI-only, not speech).
    t = t.replace('*', '')
    # Brand / author pronunciations.
    t = t.replace('M. A. Mafodh', 'Em Eh Mafodh')
    t = t.replace('SpatialSprout 3D', 'Spatial Sprout 3 D')
    t = t.replace('SpatialSprout', 'Spatial Sprout')
    # Abbreviations and units.
    t = re.sub(r'\ba\.m\.', 'A M', t)
    t = re.sub(r'\bp\.m\.', 'P M', t)
    t = (t.replace('°C', ' degrees Celsius').replace('¢', ' cents')
          .replace('×', ' times ').replace('÷', ' divided by '))
    # Money and simple arithmetic.
    t = re.sub(r'\$(\d+)', r'\1 dollars', t)
    t = re.sub(r'(\d)\s*\+\s*(\d)', r'\1 plus \2', t)
    t = re.sub(r'(\d)\s*-\s*(\d)', r'\1 minus \2', t)
    t = re.sub(r'(\d)\s*=\s*(\d)', r'\1 equals \2', t)
    # Phonics: "the first sound is m" / "same sound: b" / "the b sound" ->
    # the SOUND ("mmm"/"buh"), so early learners hear the phoneme, not the
    # letter name ("em"/"bee").
    if os.environ.get('SOUNDS', '1') != '0':
        t = re.sub(r'\bsound\s+is\s+([a-zA-Z])\b', lambda m: 'sound is ' + _sound(m), t)
        t = re.sub(r'\bsound\s*:\s*([a-zA-Z])\b', lambda m: 'sound: ' + _sound(m), t)
        t = re.sub(r'\bthe\s+([a-zA-Z])\s+sound\b', lambda m: 'the ' + _sound(m) + ' sound', t)
    # Re-collapse any double spaces introduced above.
    return re.sub(r'\s+', ' ', t).strip()
cfg=json.load(open(K+'/config.json'));vocab=cfg['vocab']
voices=np.load(K+'/voices-v1.0.bin')
sess=ort.InferenceSession(K+'/kokoro-v1.0.onnx',providers=['CPUExecutionProvider'])
inames=[i.name for i in sess.get_inputs()]
def phon(t):
    out=[]
    for part in re.findall(r'[^.,!?;:]+[.,!?;:]*',t):
        m=re.match(r'(.*?)([.,!?;:]*)$',part.strip());body,p=m.group(1),m.group(2)
        if body.strip():
            ph=subprocess.run([PP+'/bin/espeak-ng','-q','--ipa','-v','en-us','--path='+PP+'/share'],input=body,capture_output=True,text=True,env=env).stdout
            out.append(' '.join(ph.split())+p)
    return ' '.join(out)
def synth(text,voice='af_heart',speed=.95):
    ph=phon(norm(text));ids=[vocab[c] for c in ph if c in vocab][:510]
    toks=np.array([[0,*ids,0]],dtype=np.int64);st=voices[voice][len(ids)].astype(np.float32).reshape(1,-1)
    feed={inames[0]:toks,inames[1]:st,inames[2]:np.array([speed],dtype=np.float32)}
    return sess.run(None,feed)[0].reshape(-1)
def main():
    d=sys.argv[1];strs=json.load(open(sys.argv[2]));speed=float(sys.argv[3]) if len(sys.argv)>3 else .95
    vd=os.path.join(d,'voice');os.makedirs(vd,exist_ok=True);vj=os.path.join(d,'voice.js');V={}
    if os.path.exists(vj):V=json.loads(open(vj).read().split('=',1)[1].rstrip().rstrip(';'))
    todo=[s for s in dict.fromkeys(strs) if s and not os.path.exists(os.path.join(vd,fnv(s)+'.mp3'))]
    print('new clips',len(todo),'of',len(set(strs)),flush=True)
    for i,s in enumerate(todo):
        h=fnv(s);a=synth(s,speed=speed);a=np.clip(a,-1,1);w=os.path.join('/tmp',h+'.wav')
        with wave.open(w,'wb') as f:f.setnchannels(1);f.setsampwidth(2);f.setframerate(24000);f.writeframes((a*32767).astype('<i2').tobytes())
        subprocess.run(['ffmpeg','-v','error','-y','-i',w,'-ac','1','-b:a','40k',os.path.join(vd,h+'.mp3')]);os.remove(w)
        V[h]=round(len(a)/24000,2)
        if i%25==0:print(i,flush=True);open(vj,'w').write('window.VOICE='+json.dumps(V,separators=(',',':'))+';')
    for s in strs:
        h=fnv(s)
        if h not in V and os.path.exists(os.path.join(vd,h+'.mp3')):
            r=subprocess.run(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',os.path.join(vd,h+'.mp3')],capture_output=True,text=True).stdout.strip()
            V[h]=round(float(r),2) if r else 2.0
    open(vj,'w').write('window.VOICE='+json.dumps(V,separators=(',',':'))+';');print('done',len(V))
if __name__=='__main__':main()
