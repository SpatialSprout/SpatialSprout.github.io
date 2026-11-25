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

const HERO={"frog":[0.3953,0.5992,0.4292,0.7917],"snake":[0.2703,0.807,0.2736,0.9208],"parrot":[0.2719,0.9211,0.2347,0.8708],"whale":[0.3172,0.7523,0.3958,0.8028],"dog":[0.3383,0.6633,0.2847,0.875],"duck":[0.3789,0.6312,0.3986,0.8194],"owl":[0.3828,0.6062,0.2472,0.7722],"cow":[0.3055,0.7031,0.2792,0.9042],"fish":[0.3648,0.6625,0.3153,0.75],"turtle":[0.3602,0.7062,0.4403,0.825],"monkey":[0.2719,0.9328,0.2264,0.8528],"lion":[0.3281,0.7375,0.2597,0.8986],"horse":[0.2594,0.6781,0.2139,0.9028],"elephant":[0.3711,0.8094,0.275,0.9],"beaver":[0.2352,0.4953,0.3556,0.9375],"shark":[0.3219,0.7523,0.2597,0.7306],"rabbit":[0.2773,0.4797,0.3125,0.8597],"spider":[0.3938,0.5984,0.4431,0.6806],"bee":[0.3492,0.4984,0.2597,0.5528],"fox":[0.4,0.7594,0.5,0.9694],"bat":[0.2688,0.7133,0.1569,0.7375],"eagle":[0.1891,0.8094,0.1778,1.0],"swan":[0.2625,0.5875,0.2625,0.8153],"robin":[0.4273,0.8672,0.2778,0.9028],"squirrel":[0.2328,0.5102,0.3319,0.8972],"wolf":[0.3641,0.7633,0.2931,0.9278],"bear":[0.0,0.8164,0.0,1.0],"ptarmigan":[0.4023,0.7008,0.3139,0.8722],"butterfly":[0.4945,0.7023,0.1653,0.6792],"caribou":[0.2156,0.5898,0.2778,0.8972],"salmon":[0.3609,0.6117,0.3056,0.7347],"goose":[0.2547,0.7133,0.0972,0.6181],"hummingbird":[0.3086,0.5977,0.25,0.6667],"garter":[0.3125,0.7445,0.5708,0.8194],"toad":[0.3805,0.6039,0.4847,0.8583],"child":[0.407,0.6008,0.1931,0.8694]};
const MOVE={butterfly:'flutter',hummingbird:'flutter',bee:'flutter',goose:'glide',fish:'swim',salmon:'swim',whale:'swim',shark:'swim',duck:'swim',swan:'swim',turtle:'swim',
 frog:'hop',rabbit:'hop',toad:'hop',squirrel:'hop',child:'walk',spider:'sway',bat:'sway',garter:'slither',snake:'slither'};
/* the picture manager: show(key) pops the picture up with the animal standing out of it in 3D */
function stage(sc,keys,o){o=o||{};sc.__sid='c09pic';D.base(sc,'#e9e2d6');
  const S={};keys.forEach(k=>{const g=new THREE.Group();g.position.set(0,.02,o.z!=null?o.z:TH.z);g.rotation.x=o.tilt!=null?o.tilt:TH.tilt;sc.g.add(g);
    const m=PIC.plane('pic-'+k,PIC.W,PIC.H,1,true);m.geometry.translate(0,PIC.H/2,0);g.add(m);m.material.opacity=0;g.visible=false;
    const N={g,m,k,hero:null};const hb=HERO[k];
    if(hb){const w=(hb[1]-hb[0])*PIC.W,h=(hb[3]-hb[2])*PIC.H;const hm=PIC.plane('pic-'+k+'-h',w,h,3,false);hm.geometry.translate(0,h/2,0);
      const hx=((hb[0]+hb[1])/2-.5)*PIC.W,hy=(1-hb[3])*PIC.H;hm.position.set(hx,hy,.55);hm.userData={hx,hy,w,h,mv:MOVE[k]||'walk',ph:Math.random()*6};hm.material.opacity=0;g.add(hm);N.hero=hm;
      /* a soft shadow on the picture under the animal */
      const sh=new THREE.Mesh(new THREE.CircleGeometry(.5,32),new THREE.MeshBasicMaterial({color:'#000000',transparent:true,opacity:0,depthWrite:false}));sh.scale.set(w*.9,Math.min(.22,h*.16),1);sh.rotation.x=-Math.PI/2+.0;sh.position.set(hx,hy+.01,.3);sh.renderOrder=2;sh.userData.base=.22;g.add(sh);N.shadow=sh;}
    S[k]=N;});
  const X={S,cur:null,curK:null,lab:null,boost:0};
  X.show=(k,label)=>{const n=S[k];if(!n||n===X.cur)return;const old=X.cur;X.cur=n;X.curK=k;
    if(old){const f=old.m.material.opacity;const hf=old.hero?old.hero.material.opacity:0;tween(.55,e=>{old.m.material.opacity=f*(1-e);if(old.hero)old.hero.material.opacity=hf*(1-e);if(old.shadow)old.shadow.material.opacity=0;}).then(()=>{if(X.cur!==old)old.g.visible=false;});}
    n.g.visible=true;n.m.material.opacity=0;n.g.scale.set(1,.04,1);n.t0=null;
    tween(.8,e=>{const z=ease(e);n.m.material.opacity=Math.min(1,e*1.6);n.g.scale.y=.04+.96*z+Math.sin(e*Math.PI)*.07;n.g.scale.x=1.05-.05*z;}).then(()=>n.g.scale.set(1,1,1));
    if(n.hero){n.hero.userData.busy=1;n.hero.scale.set(.2,.2,1);
      sc.later(()=>{tween(.7,e=>{const z=ease(e);n.hero.material.opacity=Math.min(1,e*2.2);const s=.2+.8*z+Math.sin(e*Math.PI)*.16;n.hero.scale.set(s,s,1);n.hero.position.y=n.hero.userData.hy+Math.sin(e*Math.PI)*.3;n.shadow.material.opacity=n.shadow.userData.base*e;}).then(()=>{n.hero.scale.set(1,1,1);n.hero.position.y=n.hero.userData.hy;n.hero.userData.busy=0;});try{burst(V(0,.7,-1.6));}catch(e){}},520);}
    X.setLab(label||cap(k));};
  X.setLab=txt=>{if(!txt)return;const c=D.card(sc,txt,0,o.lz!=null?o.lz:TH.lz,{h:.2,col:COL[X.curK]||'#2b8a3e'});c.visible=true;D.grow(c);if(X.lab)X.lab.visible=false;X.lab=c;};
  X.pulse=()=>{const n=X.cur;if(!n)return;const hm=n.hero;tween(.6,e=>{const s=1+Math.sin(e*Math.PI)*.05;n.g.scale.set(s,s,1);if(hm){hm.userData.busy=1;const j=Math.sin(e*Math.PI);hm.position.y=hm.userData.hy+j*.35;hm.scale.set(1-j*.06,1+j*.1,1);}}).then(()=>{n.g.scale.set(1,1,1);if(hm){hm.userData.busy=0;hm.scale.set(1,1,1);hm.position.y=hm.userData.hy;}});};
  /* life: the scene swings slowly so the depth shows, and each animal moves its own way */
  sc.tick((dt,t)=>{const n=X.cur;if(!n||!n.g.visible)return;n.g.rotation.y=Math.sin(t*.55)*.1;n.g.rotation.z=Math.sin(t*.7)*.008;
    const hm=n.hero;if(!hm||hm.userData.busy)return;const u=hm.userData,tt=t+u.ph;let dx=0,dy=0,sx=1,sy=1,rz=0;
    switch(u.mv){
     case 'flutter':dy=Math.sin(tt*2.6)*.07+Math.sin(tt*.9)*.05;dx=Math.sin(tt*1.3)*.08;sx=1+Math.sin(tt*18)*.06;rz=Math.sin(tt*1.6)*.05;break;
     case 'glide':dx=Math.sin(tt*.8)*.12;dy=Math.sin(tt*1.6)*.05;rz=Math.sin(tt*.8)*.05;sy=1+Math.sin(tt*5)*.025;break;
     case 'swim':dx=Math.sin(tt*.9)*.09;dy=Math.sin(tt*1.7)*.045;rz=Math.sin(tt*.9)*.035;sx=1+Math.sin(tt*3)*.012;break;
     case 'hop':{const c=(tt*.55)%1;if(c<.25){const j=Math.sin(c/.25*Math.PI);dy=j*.22;sy=1+j*.06;sx=1-j*.04;}else{const q=Math.sin((c-.25)*3);sy=1-Math.max(0,.025*Math.sin(tt*4));}}break;
     case 'slither':dx=Math.sin(tt*1.4)*.08;sx=1+Math.sin(tt*2.8)*.025;rz=Math.sin(tt*1.4)*.018;break;
     case 'sway':rz=Math.sin(tt*1.1)*.08;dy=Math.sin(tt*2.2)*.02;break;
     default:sy=1+Math.sin(tt*2.2)*.02;sx=1-Math.sin(tt*2.2)*.01;rz=Math.sin(tt*1.15)*.018;dy=Math.max(0,Math.sin(tt*2.2))*.012;}
    hm.position.x=u.hx+dx;hm.position.y=u.hy+dy;hm.scale.set(sx,sy,1);hm.rotation.z=rz;
    if(n.shadow){n.shadow.position.x=u.hx+dx*.5;n.shadow.scale.x=u.w*.9*(1-dy*.6);}});
  sc.later(()=>{if(!A||!A.drag)return;Object.keys(S).forEach(k=>{const t=S[k].hero||S[k].m;A.drag(t,{tap:()=>{if(X.cur!==S[k])return;A.pop();X.pulse();try{burst(V(0,.7,-1.6));}catch(e){}sc.say(t,cap(k)+'!',1400);}});});},800);
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
