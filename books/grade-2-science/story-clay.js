/* Clay pop-up pictures for the animal lessons (1-5): every 3D page is a Gemini clay scene that pops up
   on the book and follows the narration. Story page, theory pages and practice rounds. */
(function(){
"use strict";
const P=window.PM;if(!P||!P.DIO||!P.PIC)return;
const D=P.DIO,{V,tween,burst,THREE,A,PIC}=P;
const ease=k=>k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2;
const TH={tilt:-.95,z:-1.0,lz:-.2};            /* theory / practice framing */
const ST={tilt:-.2,z:-1.95,lz:-1.15};          /* story framing */
const COL={dog:'#e8590c',cow:'#1c7ed6',fish:'#1c7ed6',frog:'#2b8a3e'};
const cap=k=>k.charAt(0).toUpperCase()+k.slice(1);

/* the picture manager: show(key) pops the picture up, label card, sparkle */
function stage(sc,keys,o){o=o||{};sc.__sid='c09pic';D.base(sc,'#e9e2d6');
  const S={};keys.forEach(k=>{const g=new THREE.Group();g.position.set(0,.02,o.z!=null?o.z:TH.z);g.rotation.x=o.tilt!=null?o.tilt:TH.tilt;sc.g.add(g);
    const m=PIC.plane('pic-'+k,PIC.W,PIC.H,1,true);m.geometry.translate(0,PIC.H/2,0);g.add(m);m.material.opacity=0;g.visible=false;S[k]={g,m,k};});
  const X={S,cur:null,curK:null,lab:null};
  X.show=(k,label)=>{const n=S[k];if(!n||n===X.cur)return;const old=X.cur;X.cur=n;X.curK=k;
    if(old){const f=old.m.material.opacity;tween(.55,e=>{old.m.material.opacity=f*(1-e);}).then(()=>{if(X.cur!==old)old.g.visible=false;});}
    n.g.visible=true;n.m.material.opacity=0;n.g.scale.set(1,.04,1);
    tween(.8,e=>{const z=ease(e);n.m.material.opacity=Math.min(1,e*1.6);n.g.scale.y=.04+.96*z+Math.sin(e*Math.PI)*.07;n.g.scale.x=1.05-.05*z;}).then(()=>n.g.scale.set(1,1,1));
    sc.later(()=>{try{burst(V(0,.7,-1.6));}catch(e){}},500);
    X.setLab(label||cap(k));};
  X.setLab=txt=>{if(!txt)return;const c=D.card(sc,txt,0,o.lz!=null?o.lz:TH.lz,{h:.2,col:COL[X.curK]||'#2b8a3e'});c.visible=true;D.grow(c);if(X.lab)X.lab.visible=false;X.lab=c;};
  X.pulse=()=>{const n=X.cur;if(!n)return;tween(.5,e=>{const s=1+Math.sin(e*Math.PI)*.045;n.g.scale.set(s,s,1);}).then(()=>n.g.scale.set(1,1,1));};
  /* the picture breathes a little so it feels alive */
  sc.tick((dt,t)=>{const n=X.cur;if(!n||!n.g.visible)return;n.g.rotation.z=Math.sin(t*.7)*.01;n.m.position.y=Math.sin(t*1.3)*.015;});
  sc.later(()=>{if(!A||!A.drag)return;Object.keys(S).forEach(k=>{A.drag(S[k].m,{tap:()=>{if(X.cur!==S[k])return;A.pop();X.pulse();try{burst(V(0,.7,-1.6));}catch(e){}sc.say(S[k].m,cap(k)+'!',1400);}});});},800);
  return X;}
P.CLAY={stage};

/* a page scene: cues = [[word, key, label?], ...]; the first picture also shows at the start unless story */
const page=(keys,cues,o)=>sc=>{const X=stage(sc,keys,o);P.CAMO=sc;P.CLAY_X=X;
  cues.forEach(c=>D.at(sc,c[0],()=>X.show(c[1],c[2])));
  if(!(o&&o.noFirst))sc.later(()=>X.show(cues[0][1],cues[0][2]),700);return {};};
P.CLAY.page=page;

/* ---- per lesson: story cues (s0) and theory step cues ---- */
const L={
 c01:{story:[['frog','frog','Amphibian'],['snake','snake','Reptile'],['parrot','parrot','Bird'],['whale','whale','Mammal']],
  steps:{1:[['mammals','dog','Mammal'],['birds','owl','Bird'],['fish','fish','Fish'],['reptiles','turtle','Reptile'],['amphibians','frog','Amphibian']],
   2:[['cow','cow','Cow'],['whale','whale','Whale'],['monkey','monkey','Monkey']],
   3:[['mammals','dog','Mammal'],['birds','duck','Bird']]}},
 c02:{story:[['lion','lion','Sharp teeth'],['horse','horse','Flat teeth'],['elephant','elephant','Trunk'],['frog','frog','Sticky tongue']],
  steps:{1:[['beaver','beaver','Chews wood'],['shark','shark','Catches prey'],['horse','horse','Grinds grass']],
   2:[['fish','fish','Swim'],['bird','parrot','Fly'],['rabbit','rabbit','Hop'],['snake','snake','Slither'],['duck','duck','Waddle']],
   3:[['walk','child','Walk']]}},
 c03:{story:[['beaver','beaver','Lodge'],['spider','spider','Web'],['bird','robin','Nest'],['rabbit','rabbit','Burrow']],
  steps:{1:[['toad','toad','Shade'],['bear','bear','Warmth'],['nest','robin','Safe nest']],
   2:[['bee','bee','Hive'],['fox','fox','Den'],['bat','bat','Roost'],['rabbit','rabbit','Warren']],
   3:[['eagle','eagle','Tree top'],['swan','swan','By the water'],['small','robin','Cup nest']]}},
 c04:{story:[['squirrel','squirrel','Stores nuts'],['wolf','wolf','Thick fur'],['bear','bear','Hibernates'],['fish','fish','Slows down']],
  steps:{1:[['bears','bear','Bear'],['frogs','frog','Frog'],['turtles','turtle','Turtle']],
   2:[['wolves','wolf','Thicker fur'],['ptarmigan','ptarmigan','Feathery feet']],
   3:[['squirrels','squirrel','Store food'],['bears','bear','Hibernate']]}},
 c05:{story:[['monarch','butterfly','Monarch'],['caribou','caribou','Caribou'],['whales','whale','Grey whale'],['salmon','salmon','Salmon']],
  steps:{2:[['geese','goose','Air'],['hummingbirds','hummingbird','Air'],['caribou','caribou','Land'],['garter','garter','Land'],['whales','whale','Water'],['turtles','turtle','Water']]}}};
const need={};Object.keys(L).forEach(id=>{const keys={};L[id].story.forEach(c=>keys[c[1]]=1);Object.keys(L[id].steps).forEach(i=>L[id].steps[i].forEach(c=>keys[c[1]]=1));need[id]=Object.keys(keys);});
Object.keys(L).forEach(id=>{const X=P.SCN[id]=P.SCN[id]||{};X.steps=X.steps||[];
  X.steps[0]={set:{},scene:page(L[id].story.map(c=>c[1]),L[id].story,Object.assign({noFirst:true},ST))};
  Object.keys(L[id].steps).forEach(i=>{const cues=L[id].steps[i];X.steps[+i]={set:{},scene:page(cues.map(c=>c[1]).filter((k,j,a)=>a.indexOf(k)===j),cues,TH)};});});

/* ---- practice rounds: the lesson's picture for the animal in the question ---- */
const ALIAS={mammal:'dog',mammals:'dog',birds:'owl',bird:'owl',reptile:'turtle',reptiles:'turtle',amphibian:'frog',amphibians:'frog',alligator:'turtle',toad:'toad',goldfish:'fish',robin:'robin',
 platypus:'duck',dolphin:'whale',kangaroo:'rabbit',hare:'rabbit',chipmunk:'squirrel',rufous:'hummingbird',hummingbird:'hummingbird',goose:'goose',geese:'goose',monarch:'butterfly',butterfly:'butterfly',
 salmon:'salmon',caribou:'caribou',whale:'whale',garter:'garter',beaver:'beaver',squirrel:'squirrel',wolf:'wolf',bear:'bear',turtle:'turtle',ptarmigan:'ptarmigan',frog:'frog',fish:'fish',snake:'snake',
 lion:'lion',horse:'horse',elephant:'elephant',shark:'shark',spider:'spider',bee:'bee',fox:'fox',bat:'bat',eagle:'eagle',swan:'swan',duck:'duck',cow:'cow',monkey:'monkey',dog:'dog',parrot:'parrot',owl:'owl',rabbit:'rabbit',child:'child',people:'child',
 nest:'robin',nests:'robin',roost:'bat',hive:'bee',lodge:'beaver',web:'spider',den:'fox',burrow:'rabbit',warren:'rabbit',feathers:'owl',fins:'fish',trunk:'elephant',tongue:'frog',teeth:'beaver',hibernation:'bear',hibernates:'bear',hibernate:'bear',hibernating:'bear'};
const pickKey=(r,have)=>{const clean=s=>String(s||'').toLowerCase().replace(/\*/g,'').replace(/[^a-z\s]/g,' ').split(/\s+/).filter(Boolean);
  const scan=ws=>{for(const w of ws){const k=ALIAS[w]||ALIAS[w.replace(/s$/,'')];if(k&&have.includes(k))return k;}return null;};
  return scan(clean(r.ans))||scan(clean(r.q))||scan(clean((r.o||[]).join(' ')));};
const roundScene=(k,keys,label)=>(sc,st,set,hk)=>{const X=stage(sc,[k],TH);P.CAMO=sc;P.CLAY_X=X;sc.later(()=>X.show(k,label||undefined),200);
  return {win(){X.pulse();try{burst(V(0,.7,-1.6));}catch(e){}tween(.6,e=>{X.S[k].g.position.y=.02+Math.sin(e*Math.PI)*.18;});return 2600;},miss(){tween(.4,e=>{X.S[k].g.position.x=Math.sin(e*Math.PI*6)*.08*(1-e);});}};};
const simple=r=>{const s=r.set||{};if(r.scene)return false;if(s.bins||s.grid||s.fill||s.build||s.items||s.custom)return false;
  if(s.row&&!(s.row.length===1||s.keep)){/* a row of choices to tap is a game: keep it */return false;}return true;};
P.CLAY.rounds=function(d){const id=d.id;if(!L[id])return;
  const have=Object.keys(ALIAS).map(w=>ALIAS[w]).filter((k,i,a)=>a.indexOf(k)===i);
  const keys=need[id].concat(Object.keys(PRACTICE[id]||{}));
  let n=0;(d.rounds||[]).forEach((r,i)=>{if(!simple(r))return;let k=pickKey(r,have.filter(x=>PRACTICE_OK.indexOf(x)>=0||need[id].indexOf(x)>=0));
    if(!k){const all=need[id];k=all[(n++)%all.length];}
    r.set={};r.scene=roundScene(k,keys,null);});};
const PRACTICE={};
/* pictures that exist (filled in by the lesson list above and the extra animals) */
const PRACTICE_OK=['dog','duck','owl','cow','fish','turtle','monkey','lion','horse','elephant','beaver','shark','rabbit','spider','bee','fox','bat','eagle','swan','robin','squirrel','wolf','bear','ptarmigan','butterfly','caribou','salmon','goose','hummingbird','garter','toad','child','frog','snake','parrot','whale'];
})();
