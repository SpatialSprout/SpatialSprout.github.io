/* The Interactive Classroom: Grade 1 English — story dioramas (see grade-2-english/dioramas.js for how they work). */
(function(){
"use strict";
const P=window.PM;if(!P||!P.DIO)return;P.SCN=P.SCN||{};
const D=P.DIO,S=P.SET,{V,tween,burst,THREE}=P;const ST=()=>P.STAGE;
const story=(id,fn)=>{P.SCN[id]=P.SCN[id]||{steps:[]};P.SCN[id].steps[0]={scene:sc=>{sc.__sid=id;return fn(sc);}};};
/* story cues fire when the narrator reaches the words, from the story's word timings (VTIME);
   the word hook stays as a backup, and each cue runs once */
const toks=t=>String(t).toLowerCase().replace(/[^a-z0-9\s']/g,' ').split(/\s+/).filter(Boolean);
const at=(sc,w,f,n)=>{let ran=false;const go=()=>{if(ran||!sc.g.parent)return;ran=true;try{f();}catch(e){console.error(e);}};
  try{const SY=P.storyOf&&P.storyOf(sc.__sid);const VT=SY&&(window.VTIME||{})[P.vhash?P.vhash(SY.speech):''];
    if(VT){const N=toks(SY.speech),ws=toks(w);let c=0,ix=-1;for(let i=0;i+ws.length<=N.length;i++){if(ws.every((x,j)=>N[i+j]===x||N[i+j]===x+'s')){c++;if(c===(n||1)){ix=i;break;}}}
      if(ix>=0)ST().later(go,Math.round((ix>0?VT[ix-1]:0)*1000)+150);}}catch(e){}
  sc.on(w,go,n);};

/* a picture prop (paper-tinted 3D figure); o.on = appear when that word is read */
const prop=(sc,n,x,z,o)=>{o=Object.assign({label:false,bare:true,tap:false},o||{});const p=sc.prop(n,x,z,o);if(o.on){p.visible=false;at(sc,o.on,()=>D.grow(p),o.nth);}if(o.hide)p.visible=false;return p;};
const wp=o=>o.getWorldPosition(new THREE.Vector3());
const put=(sc,o,x,z,opt)=>D.put(sc,o,x,z,opt);
const card=(sc,t,x,z,o)=>D.card(sc,t,x,z,Object.assign({h:.22},o||{}));
const pop=(sc,word,o,n)=>{o.visible=false;at(sc,word,()=>D.grow(o),n);return o;};
const boom=o=>burst(wp(o).add(V(0,.5,0)));
const disc=(sc,x,z,r,c,y)=>{const m=P.mk(new THREE.CylinderGeometry(r,r,.012,24),P.glow(c,.92,.25),0);m.position.set(x,y||.012,z);sc.g.add(m);return m;};
const fly=(o,x,y,z,h,dur)=>D.arc(o,x,y,z,h,dur);
const person=(sc,w,x,z,o)=>D.person(sc,w,x,z,o);
const kid=(sc,i,x,z,o)=>D.kid(sc,i,x,z,o);
const mode=(sc,k,m,ms)=>sc.mode(k,m,ms);
const L2=(f,ms)=>ST().later(f,ms);
const say=(sc,o,t,ms)=>D.say(sc,o,t,ms);
const rise=(o,dy,dur)=>{const y0=o.position.y;return tween(dur||.8,k=>{o.position.y=y0+dy*k;});};
const turn=(o,a,dur)=>{const r0=o.rotation.y;return tween(dur||.5,k=>{o.rotation.y=r0+a*k;});};
const tint=(o,c)=>o.traverse(m=>{if(m.isMesh&&m.material&&!m.userData.ink&&!Array.isArray(m.material))m.material=P.paper(c,{mix:.15});});
const row=(n,x0,x1,f)=>{for(let i=0;i<n;i++)f(n>1?x0+(x1-x0)*i/(n-1):x0,i);};

/* e01 · Leo's Lunchbox: pop-up of the user's art (dio/e01-*.webp); Leo pulls a carrot and a banana out of his lunchbox, then the sandwich */
story('e01',sc=>popScene(sc,{bg:'#c9e3a0',U:700,ground:{rows:0,grass0:'#9fbe68',grass1:'#b5cf7c',path:[190,200,300,330,420,300,560,380],flowers:46},fence:{white:true},
  props:[{id:'school',img:{'e01-school':[598,861]},x:-1.42,z:-2.95,k:.95},{img:{'e01-sunflower':[153,180]},x:1.72,z:-1.72,k:2.3},{img:{'e01-rock':[87,58]},x:-1.5,z:-1.7,k:2.2,shadow:false}],
  line:[{id:'leo',img:{'e01-leo0':[666,918],'e01-leo1':[666,919],'e01-leo2':[666,918]},x:.72,z:-2.3,k:1.45,ro:9,box:[-24,412],
    layers:{'e01-carrot':[215,167,-108,588],'e01-banana':[247,321,-102,634],'e01-sandwich':[123,92,-8,404]}}],
  cues:[['lunchtime at school','wobble:school'],['opens his blue lunchbox','hop:leo'],['crunchy carrot','rise:leo:e01-carrot:e01-leo1'],['says the c','letter:c:-.35:-2.55:#e8590c'],
    ['bright banana','rise:leo:e01-banana:e01-leo2'],['says the b','letter:b:-.35:-2.55:#e0a800'],['soft sandwich',['pulse:leo:e01-sandwich','letter:s:-.35:-2.55:#a0702a']],
    ['time to eat',['yay:leo','say:leo:Yum!:2200']]]}));
/* e02 · Mia's Market Trip: pop-up of the user's art (dio/e02-*.webp); Mia rides in, points at the bus and the clock, then sits by the pear */
story('e02',sc=>popScene(sc,{bg:'#cbbfa8',U:560,ground:{rows:0,grass0:'#8c7c68',grass1:'#9a8a74',cobbles:true,flowers:18},fence:{stone:true},
  props:[{id:'stall',img:{'e02-stall':[619,638]},x:-1.4,z:-2.95,k:.95},{id:'clock',img:{'e02-clock':[203,554]},x:-.45,z:-3.05,k:.9},
    {id:'pear',img:{'e02-pear':[220,316]},x:.55,z:-2.95,k:1.05},{img:{'e02-basket':[114,109]},x:1.02,z:-2.55,k:1.3},
    {id:'bus',img:{'e02-bus':[433,410]},x:-.85,z:-2.1,k:1.25},{img:{'e02-crate':[245,170]},x:-1.68,z:-1.65,k:1.3},
    {img:{'e02-sunflower':[142,184]},x:1.82,z:-1.9,k:1.5},{img:{'e02-block':[200,117]},x:1.55,z:-1.55,k:1.25,shadow:false}],
  line:[{id:'mia',img:{'e02-bike':[331,499],'e02-point':[240,399],'e02-sit':[351,458]},x:1.5,z:-1.95,k:1.5,ro:9}],
  cues:[['hops on her red bike','hop:mia'],['rides past the park','move:mia:.3:-2.0:2.4'],['big, red bus',['wobble:bus','move:mia:-.05:-2.2:.9:e02-point']],
    ['at the end of bus','letter:s:-.85:-2.75:#1c7ed6'],['tall clock',['wobble:clock','move:mia:-.05:-2.65:1:e02-point']],['at the end of clock','letter:k:-.05:-3.25:#c92a2a'],
    ['buys a fresh pear',['hop:pear','move:mia:1.32:-2.72:1.2:e02-sit']],['at the end of pear','letter:r:.95:-3.2:#c92a2a'],
    ['all the ending sounds',['yay:mia','say:mia:I know them all!:2400']]]}));
/* e03 · The Dog Who Would Not Share */
story('e03',sc=>{D.base(sc,'#bfe0a0');put(sc,S.tree({s:1}),-1.8,-3.3);put(sc,S.bush({s:.8}),1.8,-3.4);const pond=put(sc,S.pond(.55),1.0,-2.3);
  const big=prop(sc,'dog',-1.2,-2.4,{s:.7});const small=prop(sc,'dog',-1.6,-1.75,{s:.42,p3:{c:'#f1e3c6'},on:'small dog'});
  const stick=prop(sc,'stick',-.95,-2.4,{s:.35,on:'long stick'});
  at(sc,'asked to play',()=>{say(sc,small,'Can I play?',2000);ST().alive(small,true);});
  at(sc,'said no',()=>{say(sc,big,'No!',1500);});
  at(sc,'ran off',()=>{sc.move(big,.45,-2.3,1.4);sc.move(stick,.7,-2.3,1.4);});
  const refl=prop(sc,'dog',1.05,-2.3,{s:.55,hide:true});
  at(sc,'reflection',()=>{refl.visible=true;refl.scale.y*=-.35;refl.position.y=.03;refl.traverse(m=>{if(m.material&&!m.userData.ink){m.material=m.material.clone();m.material.transparent=true;m.material.opacity=.45;}});});
  at(sc,'barked',()=>{card(sc,'WOOF!',.4,-2.75,{h:.22,col:'#e8590c'}).visible=true;ST().alive(big,true);});
  at(sc,'fell in the water',()=>{fly(stick,1.0,-.05,-2.3,.4,.8).then(()=>{D.shrink(stick);D.ribbon(sc,[[.8,.04,-2.3],[1.0,.12,-2.2],[1.2,.04,-2.3]],'#a5d8ff',{w:.04});});});
  at(sc,'nothing',()=>{tween(.5,k=>{big.rotation.x=k*.3;});});
  card(sc,'Sharing is more fun!',-.5,-1.7,{on:'Sharing',h:.18,col:'#2b8a3e'});
});
/* e04 · Looking Up at the Sky */
story('e04',sc=>{const b=D.base(sc,'#2c3e70');const me=kid(sc,4,-.2,-1.8,{ry:Math.PI,mode:'lookup'});
  put(sc,S.house({w:.8,h:.5,d:.5,roof:'#5c7cfa'}),-1.6,-3.3);put(sc,S.tree({s:.8,c:'#5c7a5a'}),1.7,-3.3);
  const moon=prop(sc,'full moon',-.9,-3.0,{s:.7,y:.9,on:'moon'});at(sc,'glows',()=>{boom(moon);const l=new THREE.PointLight(0xfff3bf,.6,4);l.position.set(-.9,1.4,-3);sc.g.add(l);});
  const stars=[];at(sc,'Tiny stars',()=>{for(let i=0;i<9;i++){const s=prop(sc,'star',-1.7+i*.42,-3.2+(i%3)*.3,{s:.22,y:1.1+(i%2)*.25});stars.push(s);sc.tick((dt,t)=>{s.scale.setScalar(.9+Math.sin(t*4+i)*.15);});}});
  at(sc,'shooting star',()=>{const s=prop(sc,'star',-2,-3.2,{s:.3,y:1.6});tween(1.4,k=>{s.position.set(-2+k*3.5,1.6-k*.8,-3.2);});D.ribbon(sc,[[-2,1.6,-3.2],[-.3,1.25,-3.2],[1.5,.85,-3.2]],'#ffe066',{w:.04,dur:1.4});});
  at(sc,'daytime',()=>{b.children[2]&&(b.children[2].material=P.paper('#a7d8f0',{mix:.4}));stars.forEach(s=>D.shrink(s));D.shrink(moon);mode(sc,me,'lookup');});
  const wh=put(sc,S.cloud(),-.8,-3.0,{y:1.2,on:'like a whale',s:1.3});const wht=prop(sc,'whale',-.8,-3.0,{s:.4,y:1.2,on:'like a whale'});
  const kt=put(sc,S.cloud(),.9,-3.0,{y:1.25,on:'like a kite'});const ktp=prop(sc,'kite',.9,-3.0,{s:.4,y:1.1,on:'like a kite'});
  at(sc,'kite',()=>{mode(sc,me,'point');},1);
});
/* e05 · A Spicy Song */
story('e05',sc=>{D.base(sc,'#f3e3c3');const tb=put(sc,S.table({w:2.6,d:.9}),0,-2.7);
  const singer=kid(sc,5,0,-1.8,{ry:Math.PI,mode:'sing'});sc.fx('notes',{x:0,z:-1.8,w:.6,h:1.2,y:.8});
  const items=[['rice','bowl',-1.1],['bread','bread',-.55],['jam','jar',0],['soup','soup',.55],['pie','pie',1.1]];
  items.forEach(([w,n,x])=>{const p=prop(sc,n,x,-2.7,{s:.4,y:.4,on:w});at(sc,w,()=>{boom(p);ST().alive(p,true);});});
  at(sc,'way up high',()=>{const p=prop(sc,'pie',1.1,-2.4,{s:.4,y:.4});rise(p,.6,1);});
  at(sc,'yum',()=>{mode(sc,singer,'dance');card(sc,'yum, yum, yum!',0,-2.2,{h:.2,col:'#e8590c'}).visible=true;});
  at(sc,'happy tum',()=>{mode(sc,singer,'cheer');boom(singer);});
});
/* e06 · Pen Pals */
story('e06',sc=>{D.base(sc,'#cfe3b0');const lake=put(sc,S.water(1.6,1.0),1.1,-3.0);put(sc,S.house({w:.7,h:.45,d:.5}),-1.6,-3.2);put(sc,S.house({w:.6,h:.4,d:.5,roof:'#5c7cfa'}),-.8,-3.35);
  const sam=kid(sc,2,-.6,-2.2,{ry:.6,name:'Sam'});const desk=put(sc,S.table({w:.6,d:.4,h:.3}),-1.2,-2.0);const let1=prop(sc,'letter',-1.2,-2.0,{s:.4,y:.32});
  at(sc,'Dear Aiko',()=>{card(sc,'Dear Aiko,',-1.2,-1.65,{h:.18,col:'#1c4fb8'}).visible=true;mode(sc,sam,'read');});
  at(sc,'small town',()=>boom(sam));at(sc,'big lake',()=>sc.fx('sparkle',{x:1.1,z:-3,w:1.4,h:.4}));
  const dog=prop(sc,'dog',.1,-1.9,{s:.45,on:'Pepper'});const bike=prop(sc,'bicycle',.8,-1.9,{s:.6,on:'red bike'});
  at(sc,'skate',()=>{const k=kid(sc,2,.6,-3.0,{s:.6,mode:'dance'});k.position.y=.02;sc.tick((dt,t)=>{k.position.x=1.1+Math.cos(t)*.45;k.position.z=-3+Math.sin(t)*.3;k.userData.ry=-t;});sc.fx('snow',{x:0,z:-2.5,w:4,d:2,h:1.6});});
  at(sc,'write back',()=>{fly(let1,1.9,1.2,-3.5,.6,1.5).then(()=>D.shrink(let1));D.ribbon(sc,[[-1.2,.4,-2],[.3,1.3,-2.8],[1.9,1.2,-3.5]],'#f783ac',{w:.04,dur:1.5});});
  at(sc,'Your friend',()=>mode(sc,sam,'wave'));
});
/* e07 · Our Busy Kitchen */
story('e07',sc=>{D.base(sc,'#e9d8b8');put(sc,S.counter(2.2),-.7,-3.4);put(sc,S.stove(),1.0,-3.4);put(sc,S.fridge(),1.7,-3.4);const win=put(sc,S.window(),-1.4,-3.62,{y:.45});
  const cat=prop(sc,'cat',-1.4,-3.45,{s:.35,y:.38,on:'cat'});const tb=put(sc,S.table({w:1.3,d:.7}),.0,-2.2);
  const dad=person(sc,'dad',-.9,-2.95,{ry:0});const bro=kid(sc,0,-.3,-2.95,{ry:0});const me=kid(sc,3,.95,-2.85,{ry:0});
  at(sc,'pancakes',()=>{const p=prop(sc,'pancakes',.0,-2.2,{s:.45,y:.38});boom(p);},1);
  at(sc,'cracks the eggs',()=>{mode(sc,dad,'pull',1800);const e=prop(sc,'egg',-.9,-3.3,{s:.22,y:.38});sc.later(()=>D.shrink(e),1200);});
  const bowl=put(sc,S.bowl({fill:'#fff3bf'}),-.3,-3.35,{y:.37,on:'stirs'});at(sc,'stirs',()=>{mode(sc,bro,'eat',2500);D.spin(sc,bowl,3);});
  const pan=put(sc,S.pan(),1.0,-3.4,{y:.37});at(sc,'batter',()=>{mode(sc,me,'pull',1600);D.ribbon(sc,[[.9,.75,-3.2],[.95,.6,-3.3],[1.0,.42,-3.4]],'#ffe8a8',{w:.04});sc.fx('steam',{x:1.0,z:-3.4,w:.2,h:.6,y:.45});});
  at(sc,'watches',()=>{ST().alive(cat,true);say(sc,cat,'meow',1500);});
  at(sc,'sit at the table',()=>{[dad,bro,me].forEach((k,i)=>D.walk(sc,k,-.5+i*.5,-1.75,1,'eat'));const p=prop(sc,'pancakes',.0,-2.2,{s:.45,y:.38});});
  at(sc,'Yum',()=>[dad,bro,me].forEach(k=>mode(sc,k,'cheer')));
});
/* e08 · A Letter from Vancouver */
story('e08',sc=>{D.base(sc,'#cfe3b0');put(sc,S.mountain({s:.8}),1.6,-3.6);put(sc,S.mountain({s:.6}),1.05,-3.65);
  const sign=put(sc,S.sign('Maple Lane',{h:.18}),-1.75,-2.0,{on:'Maple Lane'});const h=put(sc,S.house({w:.85,h:.55,d:.6,roof:'#2b8a3e'}),-1.3,-3.15);
  const nora=kid(sc,1,-.6,-2.3,{ry:.4});card(sc,'Vancouver',-.2,-3.3,{on:'Vancouver',h:.2,col:'#1c4fb8'});
  const cat=prop(sc,'cat',-1.3,-2.8,{s:.35,y:.02,on:'Biscuit'});at(sc,'big window',()=>{fly(cat,-1.45,.28,-2.83,.3,.6);});
  const park=[put(sc,S.tree({s:.8}),.8,-2.9,{on:'Stanley Park'}),put(sc,S.pine({s:.75}),1.3,-2.6,{on:'Stanley Park'})];const w=put(sc,S.water(1.2,.6),1.3,-1.8,{on:'Stanley Park'});
  const her=prop(sc,'heron',1.1,-1.85,{s:.55,on:'heron'});at(sc,'heron',()=>{boom(her);D.walk(sc,nora,.6,-2.0,1,'point');});
  at(sc,'Toronto',()=>{const c=card(sc,'Toronto ♥',.0,-1.6,{h:.18,col:'#c92a2a'});c.visible=true;mode(sc,nora,'sad',1500);});
  at(sc,'like it here',()=>mode(sc,nora,'cheer'));
});
/* e09 · The New Baby */
story('e09',sc=>{D.base(sc,'#f3e6f2');put(sc,S.rug(1.8,1.1,'#ffc9de'),.2,-2.5);const crib=put(sc,S.bed({c:'#d0ebff'}),.2,-3.05,{s:.6,ry:Math.PI/2});
  const baby=person(sc,'baby',.2,-3.05,{mode:'sleep'});baby.position.y=.15;baby.visible=false;
  at(sc,'came home',()=>{D.grow(baby);boom(baby);});const me=kid(sc,1,-.6,-2.3,{ry:.8});
  at(sc,'tiny hands',()=>card(sc,'10 tiny toes',.85,-2.65,{h:.16,col:'#d6336c'}).visible=true);
  const gm=person(sc,'grandma',-1.5,-2.8,{ry:.8,on:'Grandma'});const bl=[prop(sc,'blanket',-1.1,-2.4,{s:.4,on:'soft blankets',p3:{c:'#ffc9de'}}),prop(sc,'blanket',-1.4,-2.2,{s:.4,on:'soft blankets'})];
  const dad=person(sc,'dad',1.5,-2.6,{ry:-.9,on:'Dad made'});const cake=prop(sc,'cake',1.2,-2.2,{s:.45,on:'cake'});
  at(sc,'cards',()=>{['♥','★','♥'].forEach((t,i)=>{const c=card(sc,t,-.6+i*.45,-1.7,{h:.2,col:i%2?'#f59f00':'#e64980'});c.visible=true;D.grow(c);});});
  at(sc,'big sister',()=>{mode(sc,me,'cheer');boom(me);});
  at(sc,'sing',()=>{D.walk(sc,me,-.1,-2.7,1,'sing');sc.fx('notes',{x:.2,z:-3,w:.5,h:1,y:.4});});
  at(sc,'read him books',()=>{prop(sc,'book',-.1,-2.45,{s:.3,y:.02});mode(sc,me,'read');});
});
/* e10 · Chores at Our House */
story('e10',sc=>{D.base(sc,'#e9d8b8');const wl=put(sc,P.mk(new THREE.BoxGeometry(.04,.35,2.2),P.paper('#e9e1d2')),0,-2.5,{y:.17});
  put(sc,S.counter(1.2),-1.3,-3.4);const mom=person(sc,'mom',-1.3,-2.95,{ry:Math.PI});
  at(sc,'washes the dishes',()=>{mode(sc,mom,'pull',2600);for(let i=0;i<3;i++){const d=put(sc,S.dish(),-1.6+i*.2,-3.35,{y:.37});}sc.fx('steam',{x:-1.3,z:-3.4,w:.5,h:.5,y:.4});});
  const dad=person(sc,'dad',-1.4,-2.0,{ry:.4,on:'Dad'});const bin=put(sc,P.mk(new THREE.CylinderGeometry(.13,.11,.3,14),P.paper('#495057')),-1.9,-1.7,{y:.15,on:'garbage'});
  at(sc,'takes out',()=>{D.walk(sc,dad,-1.75,-1.65,1,'pull');});
  const bro=kid(sc,4,.6,-1.85,{ry:-.6,on:'big brother'});const dog=prop(sc,'dog',1.0,-1.6,{s:.4});const bowl=put(sc,S.bowl({fill:'#8a5a32'}),.85,-1.5,{on:'feeds'});at(sc,'feeds',()=>{ST().alive(dog,true);mode(sc,bro,'point',1800);});
  const bed=put(sc,S.bed({c:'#8ce99a'}),1.3,-3.1,{ry:Math.PI/2});const me=kid(sc,3,.6,-3.0,{ry:.8});
  at(sc,'make my bed',()=>{mode(sc,me,'pull',1800);boom(bed);});
  const toys=[prop(sc,'ball',.5,-2.5,{s:.25}),prop(sc,'teddy',.2,-2.6,{s:.3})];const box=prop(sc,'box',1.75,-2.45,{s:.35});
  at(sc,'put away my toys',()=>toys.forEach((t,i)=>fly(t,1.75,.25,-2.45,.5,.8).then(()=>D.shrink(t))));
  at(sc,'park together',()=>{[mom,dad,bro,me].forEach(k=>{k.visible=true;mode(sc,k,'cheer');});boom(me);});
});
/* e11 · Dumplings with Grandma */
story('e11',sc=>{D.base(sc,'#eadfcf');put(sc,S.counter(1.8),-.9,-3.4);put(sc,S.stove(),1.3,-3.4);const tb=put(sc,S.table({w:1.6,d:.8}),0,-2.2);
  const gm=person(sc,'grandma',-.5,-2.85,{ry:0});const me=kid(sc,5,.6,-2.8,{ry:0});
  const dough=put(sc,P.mk(new THREE.CylinderGeometry(.3,.3,.02,24),P.paper('#fff4dc',{mix:0})),-.3,-2.2,{y:.38,on:'dough'});
  at(sc,'rolls',()=>{mode(sc,gm,'pull',2400);tween(1.2,k=>dough.scale.set(1+k*.5,1,1+k*.5));});
  const fill=[];at(sc,'potato',()=>{for(let i=0;i<4;i++){const f=put(sc,P.mk(new THREE.SphereGeometry(.035,8,6),P.paper('#fff3bf')),-.5+i*.15,-2.2,{y:.42});fill.push(f);D.grow(f);}mode(sc,me,'pull',1600);});
  const dumps=[];at(sc,'pinch',()=>{D.shrink(dough);fill.forEach((f,i)=>{D.shrink(f);const d=put(sc,P.mk(new THREE.SphereGeometry(.07,12,8,0,Math.PI*2,0,Math.PI/2),P.paper('#fff4dc',{mix:0})),-.5+i*.15,-2.2,{y:.39});d.scale.set(1,.7,.6);dumps.push(d);D.grow(d);});});
  const pot=sc.prop('pot',1.3,-3.4,{s:.7});pot.position.y=.37;
  at(sc,'boils',()=>{dumps.forEach((d,i)=>fly(d,1.3,.65,-3.4,.5,.8));sc.fx('steam',{x:1.3,z:-3.4,w:.3,h:1,y:.6});});
  at(sc,'sour cream',()=>{const b=put(sc,S.bowl({fill:'#ffffff'}),.4,-2.15,{y:.38});D.grow(b);});
  at(sc,'favourite',()=>{mode(sc,me,'cheer');mode(sc,gm,'clap');boom(me);});
});
/* e12 · The Sun and the Wind */
story('e12',sc=>{D.base(sc,'#cfe3b0');put(sc,S.road(4),0,-2.4);put(sc,S.tree({s:.9}),-1.8,-3.3);put(sc,S.pine({s:.8}),1.8,-3.35);
  const sun=put(sc,S.sun(),-1.1,-3.3,{y:1.25,s:.8,on:'Sun asked'});D.spin(sc,sun,.3);const wind=put(sc,S.cloud(),1.0,-3.2,{y:1.25,s:1.2,on:'The Wind said'});
  at(sc,'stronger than you',()=>say(sc,wind,'I am stronger!',2200));
  const boy=person(sc,'boy',-1.6,-2.4,{ry:1.5,mode:'walk'});sc.tick((dt,t)=>{if(!boy.userData.stop)boy.position.x=Math.min(1.6,-1.6+t*.06);});
  const coat=sc.prop('coat',0,0,{s:.5});coat.parent.remove(coat);boy.userData.body.add(coat);coat.position.set(0,.55,0);
  at(sc,'blew and blew',()=>{for(let i=0;i<4;i++)D.ribbon(sc,[[1,1.1-i*.15,-3.1],[.3,.8-i*.1,-2.8],[-.4,.6-i*.1,-2.5]],'#d0ebff',{w:.05,dur:1.2});boy.userData.mode='shiver';});
  at(sc,'held his coat tight',()=>say(sc,boy,'Brrr!',1800));
  at(sc,'warm and bright',()=>{D.shrink(wind);boom(sun);tween(1,k=>sun.scale.setScalar(.8*(1+k*.3)));});
  at(sc,'got hot',()=>{boy.userData.mode='hot';sc.fx('steam',{x:boy.position.x,z:-2.4,w:.3,h:.8,y:.8});});
  at(sc,'took off his coat',()=>{boy.userData.body.remove(coat);sc.g.add(coat);coat.position.set(boy.position.x+.3,.0,-2.2);boy.userData.mode='cheer';});
  card(sc,'Gentle can be strong!',0,-1.65,{on:'Gentle',h:.2,col:'#2b8a3e'});
});
/* e13 · Duck Pond Surprise */
story('e13',sc=>{D.base(sc,'#bfe0a0');const pond=put(sc,S.pond(.9),.5,-2.75);put(sc,S.tree({s:.9}),-1.8,-3.3);put(sc,S.bush({s:.8}),1.85,-3.3);
  const ben=person(sc,'boy',-.9,-1.9,{ry:.8,p:{c:'#1c7ed6'}});const ava=person(sc,'girl',-1.4,-2.2,{ry:.8,p:{c:'#e64980'}});
  const duck=prop(sc,'duck',.6,-2.8,{s:.55});
  at(sc,'threw some seeds',()=>{mode(sc,ben,'cheer',1200);for(let i=0;i<6;i++){const s=put(sc,P.mk(new THREE.SphereGeometry(.015,6,4),P.paper('#d9a35a')),-.8,-1.9,{y:.6});fly(s,-.2+i*.12,.02,-2.4+(i%2)*.15,.4,.8);}});
  at(sc,'Splash',()=>{card(sc,'Splash!',.6,-3.2,{h:.22,col:'#1971c2'}).visible=true;D.ribbon(sc,[[.3,.05,-2.8],[.6,.3,-2.8],[.9,.05,-2.8]],'#a5d8ff',{w:.06});});
  at(sc,'flapped',()=>{tween(1.2,k=>{duck.position.y=Math.abs(Math.sin(k*Math.PI*3))*.15;});});
  const lings=[];at(sc,'ducklings',()=>{for(let i=0;i<4;i++){const d=prop(sc,'chick',.2+i*.25,-2.4,{s:.22});lings.push(d);sc.tick((dt,t)=>{d.position.y=Math.abs(Math.sin(t*6+i))*.03;});}say(sc,ava,'Wow!',1800);mode(sc,ava,'cheer',1500);});
  at(sc,'ran right up',()=>{if(lings[0])sc.move(lings[0],-.75,-1.8,1.2);});
  at(sc,'It likes me',()=>{say(sc,ben,'It likes me!',2400);mode(sc,ben,'cheer');});
});
/* e14 · Winter Fun */
story('e14',sc=>{D.base(sc,'#eef3f8');const hill=put(sc,S.hill(.9,{c:'#ffffff'}),1.3,-3.0);put(sc,S.pine({s:.8,c:'#5f9e63'}),-1.9,-3.4);put(sc,S.sign('Pine Street',{h:.16}),-1.75,-2.0,{on:'Pine Street'});
  sc.fx('snow',{x:0,z:-2.5,w:4,d:2,h:1.6});const me=kid(sc,3,-.9,-2.4,{ry:.6});const kofi=kid(sc,0,-.3,-2.6,{ry:-.4,on:'Kofi'});
  const fort=new THREE.Group();for(let i=0;i<7;i++){const b=P.mk(new THREE.BoxGeometry(.18,.12,.14),P.paper('#ffffff',{mix:0}));const a=i/6*Math.PI;b.position.set(Math.cos(a)*.35,.06+(i%2)*.0,-Math.sin(a)*.3);b.rotation.y=a;fort.add(b);}put(sc,fort,-.6,-2.7,{on:'snow fort'});
  at(sc,'build',()=>{mode(sc,me,'pull',2000);mode(sc,kofi,'pull',2000);});
  const sled=prop(sc,'sled',1.3,-3.0,{s:.4,hide:true});
  at(sc,'sledding',()=>{sled.visible=true;const k=kid(sc,3,1.3,-3.0,{s:.6});tween(2,q=>{const y=.55*(1-q);sled.position.set(1.3-q*.9,y,-3.0+q*.9);k.position.set(1.3-q*.9,y+.05,-3.0+q*.9);});});
  const cocoa=[prop(sc,'cup',-1.5,-1.8,{s:.3,on:'hot chocolate',p3:{c:'#8a5a32'}}),person(sc,'dad',-1.85,-2.1,{ry:.5,on:'Dad makes'})];at(sc,'hot chocolate',()=>sc.fx('steam',{x:-1.5,z:-1.8,w:.2,h:.5,y:.3}));
  const dog=prop(sc,'dog',.4,-1.8,{s:.42,on:'Pepper'});at(sc,'snowballs',()=>{const b=put(sc,P.mk(new THREE.SphereGeometry(.05,10,8),P.paper('#ffffff',{mix:0})),-.3,-2.6,{y:.5});fly(b,.6,.05,-1.8,.6,.9);sc.move(dog,.7,-1.85,.9);});
  at(sc,'the best',()=>{mode(sc,me,'cheer');mode(sc,kofi,'cheer');});
});

/* e15 · The Book Club */
story('e15',sc=>{D.base(sc,'#e9d8b8');put(sc,S.shelf(),-1.4,-3.5);for(let i=0;i<6;i++)prop(sc,'book',-1.75+i*.13,-3.5,{s:.18,y:.52,p3:{c:['#e03131','#1c7ed6','#2b8a3e','#f59f00','#7950f2','#e64980'][i]}});
  put(sc,S.rug(2.2,1.3,'#ffd8a8'),.3,-2.4);const kids=[0,1,2,3,4].map(i=>{const a=i/5*Math.PI*2;const k=kid(sc,i,.3+Math.cos(a)*.7,-2.4+Math.sin(a)*.45,{ry:-a-Math.PI/2});return k;});
  card(sc,'Book Club · Friday',1.2,-3.45,{on:'Friday',h:.18,col:'#5f3dc4'});
  at(sc,'October',()=>{card(sc,'October',.3,-1.65,{h:.16,col:'#e8590c'}).visible=true;});
  const gh=prop(sc,'ghost',.3,-2.4,{s:.5,on:'friendly ghost'});at(sc,'friendly ghost',()=>{D.bob(sc,gh,.1,2);kids.forEach(k=>mode(sc,k,'cover',1500));});
  at(sc,'December',()=>{D.shrink(gh);card(sc,'December',.3,-1.65,{h:.16,col:'#1c7ed6'}).visible=true;});
  const pb=prop(sc,'polar bear',.3,-2.4,{s:.5,on:'polar bear'});at(sc,'polar bear',()=>sc.fx('snow',{x:.3,z:-2.4,w:1,d:.6,h:1}));
  at(sc,'bookmarks',()=>{D.shrink(pb);for(let i=0;i<4;i++){const h=prop(sc,'heart',-.1+i*.27,-2.4,{s:.25});D.bob(sc,h,.05,3);}});
  at(sc,'I love book club',()=>kids.forEach(k=>mode(sc,k,'cheer')));
});
/* e16 · Snow Day! */
story('e16',sc=>{const b=D.base(sc,'#bfe0a0');put(sc,S.house({w:.9,h:.6,d:.6}),-1.4,-3.2);const me=kid(sc,0,-.8,-2.6,{ry:.4});
  at(sc,'looked outside',()=>mode(sc,me,'lookup',1500));
  at(sc,'Everything was white',()=>{b.children[2].material=P.paper('#ffffff',{mix:0});sc.fx('snow',{x:0,z:-2.5,w:4,d:2,h:1.6});});
  at(sc,'school today',()=>{say(sc,me,'School today?',1800);mode(sc,me,'think',1800);});
  const rad=prop(sc,'radio',.0,-3.3,{s:.4,on:'radio'});at(sc,'All schools are closed',()=>{say(sc,rad,'All schools are closed!',2400);ST().alive(rad,true);});
  at(sc,'Hooray',()=>{mode(sc,me,'cheer');boom(me);});
  at(sc,'snow pants',()=>{sc.wear(me,'hat');});const bro=kid(sc,4,.5,-2.3,{ry:-.4,on:'My brother'});
  const sm=sc.prop('snowman',.9,-2.8,{s:.9});sm.visible=false;at(sc,'snowman',()=>{D.grow(sm);[me,bro].forEach(k=>mode(sc,k,'pull',1800));});
  at(sc,'carrot nose',()=>{const c=prop(sc,'carrot',.95,-2.5,{s:.2,y:.62});boom(c);});
  at(sc,'fun snow day',()=>[me,bro].forEach(k=>mode(sc,k,'cheer')));
});
/* e17 · Mom Goes Back to School */
story('e17',sc=>{D.base(sc,'#2f3a5c');put(sc,P.mk(new THREE.BoxGeometry(4,.012,2.2),P.paper('#e6dcc8',{mix:.1})),0,-2.5,{y:.012});
  put(sc,S.window(),-1.3,-3.62,{y:.5});prop(sc,'moon',-1.3,-3.5,{s:.3,y:.75,on:'night'});const lamp=put(sc,S.lamp(),1.6,-3.2);
  const tb=put(sc,S.table({w:1.4,d:.8}),.0,-2.6);const mom=person(sc,'mom',0,-3.1,{ry:0});mom.userData.mode='read';
  const books=[];at(sc,'big books',()=>{for(let i=0;i<3;i++){const b=prop(sc,'book',-.3+i*.3,-2.55,{s:.3,y:.38+i*.0,p3:{c:['#2b8a3e','#1c7ed6','#e8590c'][i]}});books.push(b);}prop(sc,'seedling',.5,-2.4,{s:.3,y:.38});});
  const sis=kid(sc,1,-.9,-2.3,{ry:.6,on:'My sister'});const me=kid(sc,4,.9,-2.3,{ry:-.6,on:'My sister'});
  at(sc,'help her study',()=>{mode(sc,sis,'point',2000);mode(sc,me,'read',2000);});
  const t=person(sc,'teacher',1.6,-2.2,{ry:-1,on:'teacher'});at(sc,'works hard',()=>say(sc,t,'Great work!',2200));
  at(sc,'proud',()=>{mode(sc,sis,'cheer');mode(sc,me,'cheer');boom(mom);});
  card(sc,'Learning is for everyone!',0,-1.65,{on:'Learning',h:.18,col:'#2b8a3e'});
});
/* popScene: a data-driven pop-up diorama of cut-out art (dio/*.webp) on a painted garden.
   A new story is a spec, no scene code. tools/cutout.py prints each cut-out's [w,h,offsetX].
   spec = { bg, ground:{rows}, fence:true, U:404,
     props:[{img:{name:[w,h,ox]}, x,z,k,ro,y}],                       scenery that never moves
     target:{img,x,z,k,ro,y,start,mound:true},                          the thing being pulled / lifted
     line:[{id,img:{pose:[w,h],pose2:[w,h]},x,z,ro,show:'words',laugh:'pose2'}],  the pullers, front to back
     popAt:[x,z], popText:'POP!',
     cues:[['story words', 'action' | ['action',..]]] }
   actions: wobble · grow · pull:id · pullAll · say:id:text:ms · pop · cheer */
const popScene=(sc,SP)=>{D.base(sc,SP.bg||'#b9d68a');const U=SP.U||404,TILT=-.45,TL=new THREE.TextureLoader();
  const cv=(w,h,f)=>{const c=document.createElement('canvas');c.width=w;c.height=h;f(c.getContext('2d'),w,h);const t=new THREE.CanvasTexture(c);t.anisotropy=8;return t;};
  const flat=(tex,w,d,x,z,y,ro)=>{const m=new THREE.Mesh(new THREE.PlaneGeometry(w,d),new THREE.MeshBasicMaterial({map:tex,transparent:true,depthWrite:false}));m.rotation.x=-Math.PI/2;m.position.set(x,y,z);m.renderOrder=ro||0;sc.g.add(m);return m;};
  /* painted ground: grass with soft furrows of soil */
  const GR=SP.ground||{},rows=GR.rows==null?4:GR.rows;
  flat(cv(1024,576,(c,w,h)=>{const g=c.createLinearGradient(0,0,0,h);g.addColorStop(0,GR.grass0||'#a9cf7c');g.addColorStop(1,GR.grass1||'#c3dd92');c.fillStyle=g;c.fillRect(0,0,w,h);
    let sd=7;const R=()=>(sd=(sd*16807)%2147483647)/2147483647;
    for(let i=0;i<rows;i++){const y=150+i*98,x0=150,x1=w-40,hh=58;const f=c.createLinearGradient(0,y,0,y+hh);f.addColorStop(0,'#a9794f');f.addColorStop(.45,'#8d5f3b');f.addColorStop(1,'#6f4729');
      c.fillStyle='rgba(60,40,20,.18)';c.beginPath();c.roundRect(x0-4,y+8,x1-x0+8,hh,30);c.fill();c.fillStyle=f;c.beginPath();c.roundRect(x0,y,x1-x0,hh,29);c.fill();
      c.fillStyle='rgba(255,225,180,.16)';c.beginPath();c.roundRect(x0+14,y+6,x1-x0-28,12,6);c.fill();
      for(let k=0;k<26;k++){c.fillStyle=R()<.5?'rgba(70,42,22,.5)':'rgba(205,165,120,.5)';c.beginPath();c.ellipse(x0+20+R()*(x1-x0-40),y+12+R()*(hh-22),3+R()*4,2+R()*2,0,0,7);c.fill();}}
    if(GR.cobbles){for(let yy=0;yy<h+30;yy+=26)for(let xx=-20;xx<w+30;xx+=34){const x=xx+(Math.floor(yy/26)%2)*17+R()*6,y=yy+R()*5,rw=14+R()*4,rh=10+R()*3,v=170+R()*40|0;
      c.fillStyle='rgba(70,58,48,.35)';c.beginPath();c.ellipse(x+1,y+2,rw,rh,0,0,7);c.fill();c.fillStyle=`rgb(${v},${v-14|0},${v-30|0})`;c.beginPath();c.ellipse(x,y,rw,rh,R()*.4-.2,0,7);c.fill();
      c.fillStyle='rgba(255,245,225,.18)';c.beginPath();c.ellipse(x-3,y-3,rw*.55,rh*.4,0,0,7);c.fill();}}
    if(GR.path){c.lineCap='round';const pp=GR.path;[[46,'rgba(150,115,70,.12)'],[26,'rgba(170,135,85,.16)']].forEach(([lw,col])=>{c.strokeStyle=col;c.lineWidth=lw;c.beginPath();c.moveTo(pp[0],pp[1]);c.bezierCurveTo(pp[2],pp[3],pp[4],pp[5],pp[6],pp[7]);c.stroke();});}
    if(GR.flowers)for(let k=0;k<GR.flowers;k++){const x=R()*w,y=R()*h,col=['#ffffff','#ffd43b','#ff8fab','#c084fc','#ffa94d'][k%5];c.fillStyle=col;for(let q=0;q<5;q++){c.beginPath();c.arc(x+Math.cos(q*1.26)*3.2,y+Math.sin(q*1.26)*2.4,2.4,0,7);c.fill();}c.fillStyle='#f59f00';c.beginPath();c.arc(x,y,1.6,0,7);c.fill();}
    if(!GR.cobbles)for(let k=0;k<150;k++){const x=R()*w,y=R()*h;c.strokeStyle=R()<.5?'#7fae55':'#d6ecaa';c.lineWidth=2;c.beginPath();c.moveTo(x,y);c.lineTo(x-3+R()*6,y-7-R()*6);c.stroke();}}),4.05,2.28,0,-2.5,.022,0);
  const blob=cv(128,128,(c)=>{const g=c.createRadialGradient(64,64,4,64,64,62);g.addColorStop(0,'rgba(40,25,10,.42)');g.addColorStop(1,'rgba(40,25,10,0)');c.fillStyle=g;c.fillRect(0,0,128,128);});
  /* a standee: art cut-outs leaning back on a hinge at their feet; several poses can share one hinge */
  const stand=(poses,x,z,o)=>{o=o||{};const h=new THREE.Group();h.position.set(x,o.y||0,z);const pv=new THREE.Group();pv.rotation.x=TILT;h.add(pv);const sk=o.k||1;const ms={};let ww=0;
    Object.keys(poses).forEach((n,i)=>{const [pw,ph,ox]=poses[n];const w=pw/U*sk,hh=ph/U*sk;ww=ww||w;const g=new THREE.PlaneGeometry(w,hh);g.translate((ox||0)/U*sk,hh/2,0);
      const m=new THREE.Mesh(g,new THREE.MeshBasicMaterial({map:TL.load('dio/'+n+'.webp'),transparent:true,depthWrite:false,side:THREE.DoubleSide}));m.renderOrder=o.ro||5;m.visible=i===0;pv.add(m);ms[n]=m;});
    const LY={};Object.keys(o.layers||{}).forEach(n=>{const [pw,ph,dx,dy]=o.layers[n];const m=new THREE.Mesh(new THREE.PlaneGeometry(pw/U*sk,ph/U*sk),new THREE.MeshBasicMaterial({map:TL.load('dio/'+n+'.webp'),transparent:true,depthWrite:false,side:THREE.DoubleSide}));
      m.userData.home=[dx/U*sk,dy/U*sk];m.position.set(m.userData.home[0],m.userData.home[1],.02);m.renderOrder=(o.ro||5)+1;m.visible=false;pv.add(m);LY[n]=m;});
    if(o.shadow!==false){const sh=flat(blob,ww*1.05,.3*sk,0,0,.026,1);sc.g.remove(sh);sh.position.set(0,.004,.03);h.add(sh);}
    sc.g.add(h);h.userData.pv=pv;h.userData.ms=ms;h.userData.LY=LY;h.userData.sk=sk;h.userData.x0=x;h.userData.pose=n=>Object.keys(ms).forEach(k=>ms[k].visible=k===n);return h;};
  /* backdrop: fence, then scenery */
  const FW=SP.fence&&SP.fence.white;if(SP.fence&&SP.fence.stone){const wall=new THREE.Mesh(new THREE.PlaneGeometry(3.9,.5),new THREE.MeshBasicMaterial({transparent:true,depthWrite:false,map:cv(1560,200,(c,w,h)=>{let sd=11;const R=()=>(sd=(sd*16807)%2147483647)/2147483647;
      c.fillStyle='#b8a68c';c.fillRect(0,14,w,h-14);for(let r=0;r<5;r++)for(let x=-30+(r%2)*36;x<w;x+=72){const y=16+r*36,v=180+R()*45|0;c.fillStyle=`rgb(${v},${v-12|0},${v-30|0})`;c.strokeStyle='#7d6c58';c.lineWidth=3;c.beginPath();c.roundRect(x+3,y+2,66+R()*4,32,8);c.fill();c.stroke();}
      c.fillStyle='#cdbfa6';c.strokeStyle='#7d6c58';c.lineWidth=3;for(let x=0;x<w;x+=78){c.beginPath();c.roundRect(x+2,2,74,20,7);c.fill();c.stroke();}
      c.strokeStyle='#5f8a3a';c.lineWidth=5;[300,980,1300].forEach(x0=>{c.beginPath();c.moveTo(x0,4);c.bezierCurveTo(x0+30,60,x0-30,110,x0+10,h);c.stroke();for(let k=0;k<9;k++){c.fillStyle=k%2?'#86b04f':'#a6c86a';c.beginPath();c.ellipse(x0-14+R()*30,10+k*20,8,5,R()*3,0,7);c.fill();}});})}));
    wall.geometry.translate(0,.25,0);wall.rotation.x=TILT;wall.position.set(.05,0,-3.58);wall.renderOrder=2;sc.g.add(wall);}
  else if(SP.fence!==false){const fence=new THREE.Mesh(new THREE.PlaneGeometry(3.9,.4),new THREE.MeshBasicMaterial({transparent:true,depthWrite:false,map:cv(1560,160,(c,w,h)=>{c.lineJoin='round';
    c.fillStyle=FW?'#e4e0d8':'#d9b98a';c.strokeStyle=FW?'#8f897f':'#8a6238';c.lineWidth=4;[52,104].forEach(y=>{c.beginPath();c.roundRect(4,y,w-8,16,6);c.fill();c.stroke();});
    for(let x=10;x<w-40;x+=52){const g=c.createLinearGradient(x,0,x+36,0);g.addColorStop(0,FW?'#ffffff':'#f1dcb4');g.addColorStop(1,FW?'#d6d2c9':'#d8b98a');c.fillStyle=g;c.beginPath();c.moveTo(x,h-4);c.lineTo(x,34);c.lineTo(x+18,8);c.lineTo(x+36,34);c.lineTo(x+36,h-4);c.closePath();c.fill();c.stroke();}})}));
    fence.geometry.translate(0,.2,0);fence.rotation.x=TILT;fence.position.set(.05,0,-3.58);fence.renderOrder=2;sc.g.add(fence);}
  const K={};(SP.props||[]).forEach(p=>{const k=stand(p.img,p.x,p.z,{ro:p.ro||3,k:p.k,y:p.y,shadow:p.shadow});if(p.id)K[p.id]=k;});
  /* the target sits in a mound of soil; its origin is the bottom of the thing */
  const T=SP.target||{img:{},x:0,z:-2.5,mound:false,shadow:false},tn=stand(T.img,T.x,T.z,{ro:T.ro||4,k:T.k,shadow:false,y:T.y});if(SP.target)flat(blob,1.9,.75,T.x,T.z+.06,.027,1);
  if(T.mound!==false){const mound=new THREE.Mesh(new THREE.PlaneGeometry(1.56,.36),new THREE.MeshBasicMaterial({transparent:true,depthWrite:false,map:cv(500,120,(c,w,h)=>{const g=c.createLinearGradient(0,0,0,h);g.addColorStop(0,'#9a6a42');g.addColorStop(1,'#6f4729');c.fillStyle=g;c.strokeStyle='#5a3a20';c.lineWidth=4;
    c.beginPath();c.moveTo(6,h);c.bezierCurveTo(40,30,120,10,170,34);c.bezierCurveTo(220,6,290,8,330,36);c.bezierCurveTo(380,10,470,40,494,h);c.closePath();c.fill();c.stroke();})}));
    mound.geometry.translate(0,.18,0);mound.rotation.x=TILT;mound.position.set(T.x,0,T.z+.12);mound.renderOrder=6;sc.g.add(mound);}
  const s0=T.start==null?.5:T.start;tn.scale.setScalar(s0);
  /* the line: everyone holds on in single file */
  const line=(SP.line||[]).map(L=>{const k=stand(L.img,L.x,L.z,{ro:L.ro||8,k:L.k,layers:L.layers});k.userData.box=L.box||[0,0];K[L.id]=k;k.userData.laugh=L.laugh;if(L.show){k.visible=false;at(sc,L.show,()=>D.grow(k));}return k;});
  let phase='idle';
  sc.tick((dt,t)=>{line.forEach((k,i)=>{const pv=k.userData.pv,u=k.userData;
    if(u.pull){const w=.5+.5*Math.sin(t*5.2-i*.25);pv.rotation.z=.05+.07*w;k.position.x=u.x0-.035*w;pv.scale.y=1-.02*w;}
    else if(u.cheer){const j=Math.abs(Math.sin(t*5+i*.9));k.position.y=.1*j;pv.rotation.z=Math.sin(t*5+i)*.05;pv.scale.y=1;}
    else{pv.scale.y=1+Math.sin(t*2+i)*.012;}});
    if(phase==='pull')tn.userData.pv.rotation.z=Math.sin(t*5.2)*.035;else if(phase==='out')tn.userData.pv.rotation.z=Math.sin(t*2.2)*.06;});
  const ACT={
    wobble:id=>{const o=id?K[id]:tn;tween(1.1,k=>{o.userData.pv.rotation.z=Math.sin(k*Math.PI*5)*.07*(1-k);});},
    pose:(id,n)=>K[id].userData.pose(n),
    hop:id=>{const o=K[id];tween(.5,q=>{o.position.y=Math.sin(q*Math.PI)*.14;});},
    letter:(t,x,z,col)=>{if(ACT._l)ACT._l.visible=false;const c=card(sc,t,+x,+z,{h:.34,col:col||'#e03131'});c.visible=true;D.grow(c);ACT._l=c;},
    rise:(id,ly,n)=>{const o=K[id],m=o.userData.LY[ly],b=o.userData.box,sk=o.userData.sk,h=m.userData.home,fx=b[0]/U*sk,fy=b[1]/U*sk;m.visible=true;
      tween(.8,q=>{const e=1-Math.pow(1-q,3);m.position.set(fx+(h[0]-fx)*e,fy+(h[1]-fy)*e+Math.sin(q*Math.PI)*.18,.02);m.scale.setScalar(.45+.55*e);m.rotation.z=Math.sin(q*Math.PI*2)*.25*(1-q);})
        .then(()=>{if(n){o.userData.pose(n);m.visible=false;}});boom(o);},
    pulse:(id,ly)=>{const o=K[id],m=o.userData.LY[ly],h=m.userData.home;m.visible=true;
      tween(2.4,q=>{const u=Math.sin(Math.min(1,q*1.25)*Math.PI);m.position.set(h[0],h[1]+.16*u,.03);m.scale.setScalar(1+.45*u);m.rotation.z=Math.sin(q*Math.PI*6)*.08*u;}).then(()=>{m.visible=false;});},
    yay:id=>{K[id].userData.cheer=true;},
    move:(id,x,z,d,n)=>{const o=K[id],x0=o.position.x,z0=o.position.z,tk=o.userData.mv=(o.userData.mv||0)+1;tween(+d||1.2,q=>{if(o.userData.mv!==tk)return;const e=q<.5?2*q*q:1-Math.pow(-2*q+2,2)/2;o.position.x=x0+(+x-x0)*e;o.position.z=z0+(+z-z0)*e;o.position.y=Math.abs(Math.sin(q*Math.PI*4))*.03;}).then(()=>{if(o.userData.mv!==tk)return;o.userData.x0=o.position.x;o.position.y=0;if(n)o.userData.pose(n);});},
    grow:()=>tween(2.2,k=>tn.scale.setScalar(s0+(1-s0)*(k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2))),
    pull:id=>{K[id].userData.pull=true;},
    pullAll:()=>{phase='pull';line.forEach(k=>{k.visible=true;k.userData.pull=true;});},
    say:(id,txt,ms)=>say(sc,K[id],txt,+ms||1800),
    cheer:()=>line.forEach(k=>{k.userData.cheer=true;}),
    pop:()=>{phase='out';const pa=SP.popAt||[-.45,-3.3];card(sc,SP.popText||'POP!',pa[0],pa[1],{h:.32,col:'#e03131'}).visible=true;
      const y0=tn.position.y;tween(.55,k=>{const e=1-Math.pow(1-k,3);tn.position.y=y0+.42*e;});boom(tn);
      for(let i=0;i<14;i++){const c=P.mk(new THREE.SphereGeometry(.03+Math.random()*.03,8,6),P.paper('#7a5232',{mix:.1}),0);const a=Math.random()*6.28,r=.5+Math.random()*.7,x0=T.x,z0=T.z+.11;c.position.set(x0,.1,z0);sc.g.add(c);
        tween(.7+Math.random()*.4,k=>{c.position.set(x0+Math.cos(a)*r*k,.1+Math.sin(k*Math.PI)*(.5+Math.random()*.02),z0+Math.sin(a)*r*.6*k);});}
      line.forEach(k=>{k.userData.pull=false;const pv=k.userData.pv,x=k.userData.x0;if(k.userData.laugh)k.userData.pose(k.userData.laugh);
        tween(.45,q=>{const e=1-Math.pow(1-q,2);k.position.x=x-.16*e;k.position.y=Math.sin(q*Math.PI)*.16;pv.rotation.z=.05*(1-q);}).then(()=>{k.userData.x0=x-.16;});});}};
  sc.pop={K,ACT,log:[]};
  (SP.cues||[]).forEach(([w,a])=>at(sc,w,()=>{sc.pop.log.push(w);[].concat(a).forEach(s=>{const p=s.split(':');ACT[p[0]].apply(null,p.slice(1));});}));
};
/* e18 · The Giant Turnip */
story('e18',sc=>popScene(sc,{bg:'#b9d68a',ground:{rows:4},
  props:[{img:{house:[347,422]},x:-1.5,z:-3.25,k:.85}],
  target:{img:{turnip:[822,1161,99]},x:1.45,z:-2.56,k:.72,y:-.12,start:.5},
  line:[{id:'gp',img:{grandpa:[356,477],grandpa2:[357,476]},x:.55,z:-2.5,ro:9,laugh:'grandpa2'},
        {id:'gi',img:{girl:[357,410],girl2:[391,407]},x:.05,z:-2.48,ro:8,laugh:'girl2',show:'the girl'},
        {id:'gm',img:{grandma:[269,435],grandma2:[371,320]},x:-.54,z:-2.52,ro:7,laugh:'grandma2',show:'Grandma helped'},
        {id:'dg',img:{dog:[229,227]},x:-1.1,z:-2.46,ro:8,show:'the dog'},
        {id:'ct',img:{cat:[256,222]},x:-1.58,z:-2.44,ro:9,show:'the cat'}],
  cues:[['planted','wobble'],['grew and grew','grow'],['He pulled',['pull:gp','say:gp:Heave!:1500']],['would not come out','say:gp:It is stuck!:1800'],
    ['She pulled','pull:gm'],['pulled together','pullAll'],['Pop','pop'],['more together','cheer']]}));
/* e19 · Mr. Music's Band */
story('e19',sc=>{D.base(sc,'#f3e3c3');const stage0=put(sc,P.mk(new THREE.BoxGeometry(2.4,.12,1.0),P.paper('#c99a6a')),0,-3.05,{y:.06});
  const mm=person(sc,{c:'#7950f2',h:'#141414',st:'curly',s:1.1,cap:'#fcc419'},0,-3.0,{ry:0});mm.position.y=.12;
  const dr=prop(sc,'drum',-.6,-3.0,{s:.45,y:.12,on:'drum'});at(sc,'bangs the drum',()=>{ST().alive(dr,true);card(sc,'BOOM!',-.6,-2.6,{h:.18,col:'#e03131'}).visible=true;mode(sc,mm,'kick',2000);});
  const gt=prop(sc,'guitar',.55,-3.0,{s:.55,y:.12,on:'guitar'});at(sc,'strums',()=>{mode(sc,mm,'clap',2000);sc.fx('notes',{x:.55,z:-3,w:.4,h:1,y:.6});});
  const tp=prop(sc,'trumpet',0,-2.7,{s:.35,y:.75,on:'trumpet'});at(sc,'blows',()=>{D.ribbon(sc,[[.1,.8,-2.7],[.5,1.0,-2.6],[1.0,1.1,-2.7]],'#fcc419',{w:.05});});
  at(sc,'sings',()=>{mode(sc,mm,'sing');sc.fx('notes',{x:0,z:-2.9,w:1,h:1.2,y:1});});
  const kids=[0,1,2,3,4,5].map(i=>kid(sc,i,-1.6+i*.64,-1.75,{ry:Math.PI,on:'children'}));
  at(sc,'clap and dance',()=>kids.forEach((k,i)=>mode(sc,k,i%2?'clap':'dance')));
  at(sc,'cheers',()=>{kids.forEach(k=>mode(sc,k,'cheer'));boom(mm);});
});
/* e20 · My New Puppy */
story('e20',sc=>{D.base(sc,'#bfe0a0');put(sc,S.house({w:.9,h:.6,d:.6}),-1.45,-3.2);put(sc,S.fence(2.2),.9,-3.55);put(sc,S.tree({s:.85}),1.75,-3.1);
  const me=kid(sc,3,-.6,-2.3,{ry:.6});const pup=prop(sc,'puppy',-.1,-2.3,{s:.38,on:'puppy'});
  card(sc,'Toby',-.1,-1.9,{on:'Toby',h:.18,col:'#e8590c'});at(sc,'floppy',()=>ST().alive(pup,true));
  at(sc,'so happy',()=>{mode(sc,me,'cheer');boom(me);});
  at(sc,'best friends',()=>{const h=prop(sc,'heart',-.35,-2.3,{s:.3,y:.9});D.bob(sc,h,.06,3);});
  const ball=prop(sc,'ball',-.5,-2.2,{s:.2,on:'fetch'});
  at(sc,'fetch',()=>{mode(sc,me,'point');fly(ball,1.2,0,-2.5,.8,1).then(()=>sc.move(pup,1.1,-2.5,.8)).then(()=>{sc.move(pup,-.2,-2.3,.8);fly(ball,-.2,.2,-2.3,.1,.8);});});
  at(sc,'At night',()=>{const bed=put(sc,S.bed({c:'#a5d8ff'}),-1.2,-2.1,{ry:Math.PI/2,s:.7});const bk=put(sc,S.basket(),-.6,-1.8,{s:1.2});D.grow(bed);D.grow(bk);sc.move(pup,-.6,-1.8,1);mode(sc,me,'sleep');});
});
/* e21 · A Starry Night */
story('e21',sc=>{D.base(sc,'#2c3e70');const lake=put(sc,S.water(2.6,.9),-.4,-3.1);put(sc,S.tent({c:'#e8590c'}),1.5,-3.1,{ry:-.4});put(sc,S.pine({s:.8,c:'#40634a'}),-1.9,-2.0);
  const fire=put(sc,S.campfire(),.2,-2.1);const fam=[kid(sc,1,-.4,-1.85,{ry:2}),kid(sc,4,.8,-1.85,{ry:-2}),person(sc,'dad',.2,-1.6,{ry:Math.PI})];
  at(sc,'quiet lake',()=>sc.fx('sparkle',{x:-.4,z:-3.1,w:2.4,h:.2}));
  const stars=[];at(sc,'Tiny stars',()=>{for(let i=0;i<10;i++){const s=prop(sc,'star',-1.9+i*.42,-3.4+(i%3)*.2,{s:.18,y:1.0+(i%2)*.3});sc.tick((dt,t)=>s.scale.setScalar(.85+Math.sin(t*5+i)*.2));}});
  const moon=prop(sc,'full moon',1.0,-3.3,{s:.6,y:1.1,on:'moon'});
  at(sc,'warm fire',()=>{const l=new THREE.PointLight(0xffa040,.7,3);l.position.set(.2,.5,-2.1);sc.g.add(l);});
  at(sc,'marshmallows',()=>fam.slice(0,2).forEach((k,i)=>{const st=P.mk(new THREE.CylinderGeometry(.008,.008,.6,5),P.paper('#8a6a4a'));st.rotation.z=i?.9:-.9;st.position.set(i?-.2:.2,-.2,.2);k.userData.arms[1].add(st);mode(sc,k,'eat');}));
  at(sc,'perfect night',()=>fam.forEach(k=>mode(sc,k,'cheer')));
});
/* e22 · Hide and Seek */
story('e22',sc=>{D.base(sc,'#e9d8b8');const tr=put(sc,S.tree({s:1.1}),-1.5,-3.2);const bed=put(sc,S.bed({c:'#91a7ff'}),.2,-3.0,{ry:Math.PI/2});const lb=prop(sc,'laundry',1.0,-2.3,{s:.45});const sh=put(sc,S.shelf(),1.4,-3.5);
  const me=kid(sc,0,-.4,-1.75,{ry:Math.PI,mode:'cover'});card(sc,'1, 2, 3…',-.4,-1.4,{h:.16,col:'#1c7ed6'});
  const ali=kid(sc,2,-.6,-2.3,{ry:0,on:'Ali'});at(sc,'behind the big tree',()=>D.walk(sc,ali,-1.5,-3.55,1,'idle'));
  const sara=kid(sc,1,-.2,-2.4,{ry:0,on:'Sara'});at(sc,'crawled under',()=>{D.walk(sc,sara,.2,-3.0,1,'idle');sc.later(()=>{sara.position.y=-.05;sara.scale.y*=.5;},1000);});
  const bro=kid(sc,5,.6,-2.0,{s:.6,on:'little brother'});at(sc,'laundry basket',()=>{D.walk(sc,bro,1.0,-2.3,.8,'idle');sc.later(()=>{bro.position.y=-.25;},800);});
  const cat=prop(sc,'cat',.9,-2.9,{s:.35,on:'The cat'});at(sc,'jumped on the shelf',()=>fly(cat,1.4,.52,-3.5,.5,.8));
  const bird=prop(sc,'bird',-2,-2.6,{s:.35,y:1.1,on:'A bird'});at(sc,'flew over',()=>tween(2,k=>{bird.position.set(-2+k*4,1.1+Math.sin(k*Math.PI)*.3,-2.6);}));
  at(sc,'here I come',()=>{me.userData.mode='run';say(sc,me,'Ready or not!',2400);D.walk(sc,me,0,-2.3,.8,'point');});
});
/* e23 · My Wobbly Tooth */
story('e23',sc=>{D.base(sc,'#f3e6f2');const me=kid(sc,5,-.9,-2.3,{ry:.6});const tooth=prop(sc,'tooth',-.9,-2.3,{s:.3,y:1.05,on:'wobbly tooth'});
  at(sc,'wobbly tooth',()=>sc.tick((dt,t)=>{tooth.rotation.z=Math.sin(t*12)*.25;}));
  const ap=prop(sc,'apple',-.5,-2.2,{s:.3,y:.3,on:'apple'});at(sc,'wiggled',()=>{mode(sc,me,'eat',1800);D.shrink(ap);});
  const tb=put(sc,S.table({w:1.0,d:.6}),.3,-2.0,{on:'dinner'});const nap=put(sc,P.mk(new THREE.BoxGeometry(.25,.01,.25),P.paper('#ffffff',{mix:0})),.3,-2.0,{y:.38,on:'napkin'});
  at(sc,'fell out',()=>{fly(tooth,.3,.42,-2.0,.4,.8);});
  const bed=put(sc,S.bed({c:'#ffc9de'}),1.3,-3.0,{ry:Math.PI/2});
  at(sc,'under my pillow',()=>{fly(tooth,1.3,.3,-3.35,.5,1).then(()=>D.shrink(tooth));D.walk(sc,me,1.3,-2.95,1.2,'sleep');sc.later(()=>{me.position.y=.25;},1300);});
  at(sc,'In the morning',()=>{const c=prop(sc,'coin',1.3,-3.3,{s:.25,y:.35});boom(c);me.position.y=0;me.userData.mode='cheer';const n=card(sc,'Thank you! - T.F.',.75,-3.2,{h:.14,col:'#ae3ec9'});n.visible=true;});
  at(sc,'gap-tooth smile',()=>{say(sc,me,':D',2000);boom(me);});
});
/* e24 · A Day with Grandpa */
story('e24',sc=>{D.base(sc,'#bfe0a0');const pond=put(sc,S.pond(.8),.9,-2.9);put(sc,S.house({w:.8,h:.5,d:.55}),-1.55,-3.2);put(sc,S.tree({s:.9}),-.4,-3.45);
  const gp=person(sc,'grandpa',-1.0,-2.3,{ry:.7});const me=kid(sc,2,-.5,-2.0,{ry:.4});
  const birds=[];at(sc,'fed the birds',()=>{for(let i=0;i<3;i++){const b=prop(sc,'bird',-.6+i*.25,-2.6,{s:.25});birds.push(b);}mode(sc,gp,'point',1500);});
  const sq=prop(sc,'squirrel',-.1,-2.8,{s:.3,on:'squirrels'});
  at(sc,'bake cookies',()=>{say(sc,gp,'Cookies or fishing?',2400);prop(sc,'cookie',-1.3,-1.7,{s:.25});prop(sc,'fishing rod',-.9,-1.6,{s:.35});});
  at(sc,'I picked fishing',()=>{say(sc,me,'Fishing!',1800);D.walk(sc,gp,.3,-2.5,1.2,'pull');D.walk(sc,me,.4,-2.0,1.2,'pull');});
  at(sc,'two fish',()=>{[0,1].forEach(i=>{const f=prop(sc,'fish',.9,-2.9,{s:.3});fly(f,.0+i*.3,.0,-1.75,.8,1);});});
  at(sc,'old boot',()=>{const b=prop(sc,'boot',.9,-2.9,{s:.3});fly(b,.6,0,-1.75,.8,1).then(()=>{mode(sc,me,'cheer');say(sc,me,'A boot!',1500);});});
  at(sc,'sandwiches',()=>{put(sc,S.blanket?S.blanket():P.STAGE.prop('blanket',{s:.8}),-1.1,-1.75);prop(sc,'sandwich',-1.2,-1.75,{s:.25});prop(sc,'lemon',-.9,-1.75,{s:.2});});
});
/* e25 · Riddle Time */
story('e25',sc=>{D.base(sc,'#e7e0f5');const me=kid(sc,1,-1.4,-2.3,{ry:.7,mode:'think'});
  const q=card(sc,'?',-.2,-2.7,{h:.5,col:'#7950f2'});
  at(sc,'face but no eyes',()=>say(sc,me,'A face but no eyes?',2000));
  const clk=prop(sc,'alarm clock',.5,-2.9,{s:.7,hide:true});
  at(sc,'A clock',()=>{D.shrink(q);clk.visible=true;D.grow(clk);ST().alive(clk,true);mode(sc,me,'cheer',1800);card(sc,'BRRRING!',.5,-2.4,{h:.18,col:'#e03131'}).visible=true;});
  const q2=card(sc,'?',-.2,-2.0,{h:.5,col:'#7950f2',on:'another one'});
  at(sc,'keys but no locks',()=>{mode(sc,me,'think');prop(sc,'key',-1.0,-1.7,{s:.25});});
  const pn=prop(sc,'piano',1.2,-2.0,{s:.8,hide:true});
  at(sc,'A piano',()=>{D.shrink(q2);pn.visible=true;D.grow(pn);sc.fx('notes',{x:1.2,z:-2,w:.6,h:1.2,y:.5});mode(sc,me,'dance');});
});
/* e26 · The King of the Jungle */
story('e26',sc=>{D.base(sc,'#b8d89a');put(sc,S.tree({s:1.1,c:'#4f9a4a'}),-1.8,-3.3);put(sc,S.tree({s:.9,c:'#5aa84f'}),1.85,-3.35);for(let i=0;i<4;i++)put(sc,S.bush({s:.6}),-1.2+i*.8,-3.6);
  const lion=prop(sc,'lion',-.8,-2.6,{s:.75});
  at(sc,'roared',()=>{say(sc,lion,'ROAR!',2000);ST().alive(lion,true);D.ribbon(sc,[[-.5,.6,-2.6],[0,.7,-2.4],[.5,.6,-2.2]],'#ffa94d',{w:.06});});
  const mk1=prop(sc,'monkey',.6,-3.1,{s:.5,on:'monkey'});at(sc,'laughed',()=>ST().alive(mk1,true));
  at(sc,'must be kind',()=>say(sc,mk1,'A king must be kind!',2400));
  const el=prop(sc,'elephant',.9,-2.3,{s:.8,on:'elephant'});const log=sc.prop('log',.3,-2.0,{s:.8});log.visible=false;
  at(sc,'lift a log',()=>{log.visible=true;sc.move(lion,.0,-2.2,1);sc.later(()=>rise(log,.35,.8),1000);});
  const zb=prop(sc,'zebra',-1.3,-1.8,{s:.6,on:'zebra'});const wt=put(sc,S.water(.6,.4),-.7,-1.65,{on:'water'});
  at(sc,'shared his water',()=>{sc.move(lion,-.9,-2.0,1);});
  at(sc,'cheer',()=>{[mk1,el,zb,lion].forEach((a,i)=>sc.later(()=>ST().alive(a,true),i*200));const cr=prop(sc,'trophy',-.9,-2.0,{s:.25,y:.7});boom(cr);});
});
/* e27 · My First Visit to the Dentist */
story('e27',sc=>{D.base(sc,'#e3f2f7');const chair=new THREE.Group();const seat=P.mk(new THREE.BoxGeometry(.9,.08,.35),P.paper('#4dabf7'));seat.position.y=.3;seat.rotation.z=.25;chair.add(seat);
  const post=P.mk(new THREE.CylinderGeometry(.05,.08,.3,10),P.paper('#adb5bd'));post.position.y=.15;chair.add(post);put(sc,chair,-.2,-2.7);
  const me=kid(sc,3,-.2,-2.7,{ry:-1.4,mode:'sleep'});me.position.y=.38;me.rotation.z=1.35;me.visible=false;
  at(sc,'big chair',()=>{me.visible=true;D.grow(me);});at(sc,'up and down',()=>tween(1.4,k=>{chair.position.y=Math.sin(k*Math.PI*2)*.12;me.position.y=.38+Math.sin(k*Math.PI*2)*.12;}));
  const den=person(sc,'doctor',.6,-2.95,{ry:-.6,on:'dentist'});const lamp=put(sc,S.lamp(),.1,-3.4);
  at(sc,'tiny mirror',()=>{const m=prop(sc,'mirror',.3,-2.75,{s:.3,y:.4});mode(sc,den,'point',2000);for(let i=1;i<=5;i++)sc.later(()=>{const c=card(sc,String(i*4),-.2+i*.18,-2.2,{h:.14,col:'#1c7ed6'});c.visible=true;},i*250);});
  at(sc,'sparkled',()=>sc.fx('sparkle',{x:-.3,z:-2.7,w:.6,h:.8,y:.5}));
  const tbr=prop(sc,'toothbrush',.9,-2.2,{s:.4,y:.3,on:'how to brush'});at(sc,'little circles',()=>sc.tick((dt,t)=>{tbr.position.x=.9+Math.cos(t*6)*.08;tbr.position.y=.3+Math.sin(t*6)*.08;}));
  at(sc,'new toothbrush',()=>{me.rotation.z=0;me.position.y=0;me.position.x=.6;me.position.z=-2.0;me.userData.mode='cheer';boom(tbr);});
});
/* e28 · Making a Sandwich */
story('e28',sc=>{D.base(sc,'#eadfcf');put(sc,S.counter(2.4),-.2,-3.4);put(sc,S.fridge(),1.6,-3.4);const tb=put(sc,S.table({w:1.6,d:.8}),0,-2.3);
  const me=kid(sc,4,0,-2.95,{ry:0});const board=put(sc,P.mk(new THREE.BoxGeometry(.6,.03,.4),P.paper('#d9a35a')),0,-2.3,{y:.38});
  const sl=(y,c,h)=>P.mk(new THREE.BoxGeometry(.24,h||.035,.24),P.paper(c,{mix:.05}));
  const b1=put(sc,sl(0,'#f1d4a0'),-.15,-2.3,{y:.42,on:'two slices'}),b2=put(sc,sl(0,'#f1d4a0'),.15,-2.3,{y:.42,on:'two slices'});
  card(sc,'1. First',-1.4,-1.75,{on:'First',h:.15,col:'#1c7ed6'});card(sc,'2. Next',-.5,-1.75,{on:'Next',h:.15,col:'#1c7ed6'});card(sc,'3. Then',.4,-1.75,{on:'Then',h:.15,col:'#1c7ed6'});card(sc,'4. Last',1.3,-1.75,{on:'Last',h:.15,col:'#1c7ed6'});
  const kn=prop(sc,'knife',.4,-2.2,{s:.25,y:.4,on:'spread butter'});const bt=[put(sc,sl(0,'#ffe066',.01),-.15,-2.3,{y:.445,on:'spread butter'}),put(sc,sl(0,'#ffe066',.01),.15,-2.3,{y:.445,on:'spread butter'})];
  at(sc,'spread butter',()=>mode(sc,me,'pull',1600));
  const ch=put(sc,sl(0,'#ffd43b',.02),-.15,-2.3,{y:.46,on:'cheese'});const lt=put(sc,sl(0,'#8ce99a',.02),-.15,-2.3,{y:.48,on:'lettuce'});
  at(sc,'put the slices together',()=>{fly(b2,-.15,.51,-2.3,.3,.6);bt[1].visible=false;});
  at(sc,'cut it in half',()=>{const c=P.mk(new THREE.BoxGeometry(.005,.15,.3),P.paper('#495057'));c.position.set(-.15,.48,-2.3);sc.g.add(c);c.rotation.y=.8;D.grow(c);});
  at(sc,'eat my lunch',()=>{mode(sc,me,'eat');say(sc,me,'Yum!',1800);});
  at(sc,'messy',()=>{const m=new THREE.Group();[b1,ch,lt].forEach((o,i)=>{fly(o,.8+i*.15,.4,-2.3+i*.1,.5,.6);o.rotation.z=i;});card(sc,'Oops!',.9,-2.0,{h:.2,col:'#e03131'}).visible=true;});
});
/* practice questions: no repeated character standing in every question — just the things it is about */
Object.keys(P.SCN).forEach(id=>{const R=P.SCN[id].rounds||{};Object.keys(R).forEach(k=>{const f=R[k];const src=String(typeof f==='function'?f:f&&f.scene);if(!/sc\.kid\(/.test(src))return;
  if(typeof f==='function')delete R[k];else delete f.scene;});});
})();
