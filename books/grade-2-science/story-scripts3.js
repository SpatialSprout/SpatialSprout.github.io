/* Lessons 11-15: story pages shot sentence by sentence on clay sets (same director as lessons 1-10).
   Most cue words work for both the recorded narration and the new fuller narration, so one beat table serves both. */
(function(){
"use strict";
const P=window.PM;if(!P||!P.DIR||!P.DIR_NEW)return;
const page=P.DIR.page,W=P.PIC.W,H=P.PIC.H;
const all=ps=>Promise.all(ps);
/* persistent helpers: something floating on water, something spinning */
const bob=(R,p,amp,sp)=>{if(!p)return;let on=true,ph=Math.random()*6,y0=p.position.y;R.actors.push({kill:()=>{on=false;},tick:dt=>{if(!on)return;ph+=dt*(sp||2.2);p.position.y=y0+Math.sin(ph)*(amp||.03);p.rotation.z=Math.sin(ph*.8)*.05;}});};
const spin=(R,p,rate)=>{if(!p)return;let on=true;R.actors.push({kill:()=>{on=false;},tick:dt=>{if(on)p.rotation.z-=dt*(rate||7);}});};
const sway=(R,p,amp)=>{if(!p)return;let on=true,ph=0;R.actors.push({kill:()=>{on=false;},tick:dt=>{if(!on)return;ph+=dt*5;p.rotation.z=Math.sin(ph)*(amp||.12);}});};
const sink=(R,p,sec)=>{if(!p)return R.wait(sec||1);const y0=p.position.y,s0=p.scale.x;return R.T(sec||1.2,e=>{p.position.y=y0-e*.28;p.scale.setScalar(s0*(1-e*.6));});};
const later=async(R,ms)=>R.wait(ms);

/* ================= LESSON 11 : Mr. Soup's Magic Show ================= */
const L11={
 held:async(R,S)=>{await R.bg('magic');R.label('Mr. Soup','#7048e8');S.m=R.act('pa-soupglass',{x:-.5,y:.05,h:1.6,face:1});await S.m.show(.6,'pop');R.fx('sparkle',-.5,1.7,8,{w:.8,t:1.2});},
 watch:async(R,S)=>{R.word('Watch this!',.6,1.9,'#7048e8',1.3);await S.m.wag(.8,.05,3);},
 sugar:async(R,S)=>{R.label('Sugar','#e8590c');R.fx('crumb',-.15,1.15,12,{w:.2,t:1.4,vy:-1});await R.wait(.6);},
 stirred:async(R,S)=>{await S.m.swap('pa-soupstir',.7,{h:1.6,face:1});for(let i=0;i<3;i++){R.fx('sparkle',-.55,.5,6,{w:.3,t:1});await S.m.wag(.7,.04,5);}},
 abra:async(R,S)=>{R.word('Abracadabra!',.5,2.0,'#c2255c',1.8);R.fx('sparkle',-.4,1.0,22,{w:1.4,t:1.6});await S.m.jump(.12);},
 gone:async(R,S)=>{await S.m.swap('pa-soupglass',.6,{h:1.6,face:1});R.fx('sparkle',-.9,.6,14,{w:.6,t:1.2});R.word('Gone!',.6,1.9,'#1c7ed6',1.3);await R.wait(.5);},
 dissolved:async(R,S)=>{R.label('Dissolved','#1c7ed6');const r=R.ring(-1.0,.5,.4);await r.show();R.fx('sparkle',-1.0,.5,10,{w:.4,t:1.2});await r.pulse(2,1);await r.hide();},
 sweet:async(R,S)=>{R.word('Sweet!',.6,1.9,'#e8590c',1.2);R.fx('heart',-.3,1.5,6,{w:.8,t:1.4});await R.wait(.4);},
 oops:async(R,S)=>{await S.m.swap('pa-soupspill',.5,{h:1.55,face:1});R.word('Oops!',.6,1.9,'#e03131',1.5);R.fx('splash',-.1,.15,16,{w:.8,t:1.3});await S.m.shiver(.9);},
 sponge:async(R,S)=>{R.label('Sponge','#e0a800');S.sp=R.prop('sponge',1.0,1.7,.55);await R.toss(S.sp,.95,.2,1,.5);},
 towel:async(R,S)=>{R.label('Paper towel','#1c7ed6');S.pt=R.prop('paper',1.7,1.7,.55);await R.toss(S.pt,1.5,.2,1,.5);},
 metal:async(R,S)=>{R.label('Metal spoon','#868e96');S.sn=R.prop('spoon',2.0,1.7,.55);await R.toss(S.sn,1.95,.2,1,.5);},
 soaked:async(R,S)=>{R.label('Soaks up','#1c7ed6');await all([R.toss(S.sp,-.2,.14,1.1,.4),R.toss(S.pt,.2,.14,1.1,.4)]);R.fx('drop',0,.25,12,{w:.5,t:1.2,vy:-1});await all([R.shrink(S.sp,1.2),R.shrink(S.pt,1.2)]);R.fx('sparkle',0,.3,10,{w:.6,t:1});},
 not:async(R,S)=>{await R.toss(S.sn,-.1,.14,.9,.4);await R.toss(S.sn,.8,.2,.8,.5);R.word('No!',.8,1.2,'#e03131',1.1);},
 absorb:async(R,S)=>{R.label('Absorb','#2b8a3e');R.fx('sparkle',0,.6,12,{w:1.4,t:1.4});await R.wait(.5);},
 bowed:async(R,S)=>{await S.m.swap('pa-soupbow',.8,{h:1.35,face:1});R.fx('heart',-.3,1.5,10,{w:1.5,t:1.8});await S.m.wag(1,.03,3);}
};
const B11=[['held',L11.held],['watch',L11.watch],['sugar',L11.sugar],['stirred',L11.stirred],['abracadabra',L11.abra],['gone',L11.gone],['dissolved',L11.dissolved],['sweet',L11.sweet],['oops',L11.oops],['sponge',L11.sponge],['towel',L11.towel],['metal',L11.metal],['soaked',L11.soaked],['did',L11.not],['absorb',L11.absorb],['bowed',L11.bowed]];
page('c11',0,{old:B11,neu:B11});

/* ================= LESSON 12 : Mr. Water's Disguises ================= */
const L12={
 disguises:async(R,S)=>{await R.bg('pond-spring');R.label('Mr. Water','#1c7ed6');S.w=R.act('pa-waterdrop',{x:-.3,y:.05,h:1.3,face:1});await S.w.show(.6,'pop');await S.w.wag(1,.05,3);},
 winter:async(R,S)=>{await R.bg('pond-winter');R.snow(5,40);S.w=R.act('pa-waterice',{x:-.3,y:.05,h:1.3,face:1});await S.w.show(.6,'pop');R.fx('sparkle',-.3,1,8,{w:.9,t:1.2});},
 solid:async(R,S)=>{R.label('Solid','#1c7ed6');await S.w.shiver(1);},
 ice:async(R,S)=>{const r=R.ring(-.3,.7,.5,'#74c0fc');await r.show();await r.pulse(2,1);await r.hide();},
 spring:async(R,S)=>{await R.bg('pond-spring');S.w=R.act('pa-watermelt',{x:-.3,y:.05,h:1.0,face:1});await S.w.show(.6,'pop');R.fx('drop',-.3,.9,10,{w:.5,t:1.5,vy:-1});R.fx('sparkle',.8,1.8,10,{w:1,t:1.4});},
 melts:async(R,S)=>{R.label('Melting','#74c0fc');await S.w.shiver(1);},
 liquid:async(R,S)=>{R.label('Liquid','#1c7ed6');await S.w.swap('pa-waterdrop',.9,{h:1.3,face:1});R.fx('splash',-.3,.1,16,{w:.9,t:1.3});await S.w.jump(.15);},
 hot:async(R,S)=>{await R.bg('pond-summer');S.w=R.act('pa-waterdrop',{x:-.3,y:.05,h:1.3,face:1});await S.w.show(.6,'pop');R.fx('sparkle',-1,1.9,8,{w:.6,t:1.2});await S.w.wag(.8,.05,3);},
 evaporates:async(R,S)=>{R.label('Evaporates','#e8590c');await S.w.swap('pa-watergas',1.2,{h:1.2,face:1});R.fx('bubble',-.3,.8,10,{w:.6,t:2,vy:1.4});},
 gas:async(R,S)=>{R.label('Gas','#868e96');await S.w.go(S.w.st.x+.2,1.1,2.4);R.fx('bubble',S.w.st.x,1.2,10,{w:.6,t:2,vy:1.2});},
 cold:async(R,S)=>{await R.bg('pond-winter');S.w=R.act('pa-watergas',{x:-.3,y:1.0,h:1.1,face:1});await S.w.show(.6,'pop');await S.w.go(-.3,.2,1.5);R.snow(4,30);},
 freezes:async(R,S)=>{R.label('Freezes','#74c0fc');await S.w.swap('pa-waterice',.9,{h:1.3,face:1});R.fx('sparkle',-.3,.9,14,{w:.9,t:1.3});await S.w.shiver(.8);},
 guess:async(R,S)=>{await R.bg('pond-spring');R.word('Which state?',.6,2.0,'#7048e8',1.6);const xs=[['pa-waterice',-1.1],['pa-waterdrop',.2],['pa-watergas',1.4]],A=[];
   for(const [k,x] of xs){const a=R.act(k,{x:x,y:k==='pa-watergas'?.5:.05,h:1.0,face:1});A.push(a);await a.show(.5,'pop');await a.wag(.5,.05,3);}
   R.fx('sparkle',.2,1.0,18,{w:2.6,t:1.6});await R.wait(.6);}
};
const B12=[['disguises',L12.disguises],['winter',L12.winter],['solid',L12.solid],['ice',L12.ice],['spring',L12.spring],['melts',L12.melts],['liquid',L12.liquid],['hot',L12.hot],['evaporates',L12.evaporates],['gas',L12.gas],['again',L12.cold],['freezes',L12.freezes],['guess',L12.guess]];
page('c12',0,{old:B12,neu:B12});

/* ================= LESSON 13 : Sam Crosses the River ================= */
const L13={
 wanted:async(R,S)=>{await R.bg('river');R.label('Sam','#1c7ed6');S.s=R.act('pa-samlook',{x:-2.6,y:.05,h:1.35,face:1});await S.s.show(.2);await S.s.walk(-.9,.05,2.2);},
 float:async(R,S)=>{R.word('Float?',.8,1.9,'#1c7ed6',1.3);await S.s.wag(.8,.04,3);},
 key:async(R,S)=>{R.label('Key','#868e96');S.k=R.prop('key',-.6,.9,.45);await R.toss(S.k,.6,1.02,1.1,.7);},
 plop:async(R,S)=>{R.word('Plop!',.6,1.5,'#1c7ed6',1.2);R.fx('splash',.6,1.0,14,{w:.3,t:1.2});await sink(R,S.k,1.2);},
 scissors:async(R,S)=>{R.label('Scissors','#868e96');S.c=R.prop('scissors',-.6,.9,.5);await R.toss(S.c,1.1,1.02,1.1,.7);R.fx('splash',1.1,1.0,12,{w:.3,t:1.2});await sink(R,S.c,1.2);},
 sank:async(R,S)=>{R.word('Sank!',.9,1.5,'#e03131',1.3);await R.wait(.5);},
 log:async(R,S)=>{R.label('Log','#8b5a2b');S.l=R.prop('log',-.6,.9,.6);await R.toss(S.l,-.1,1.03,1.1,.7);R.fx('splash',-.1,1.0,12,{w:.4,t:1.2});bob(R,S.l,.03,2.2);},
 ring:async(R,S)=>{R.label('Life ring','#e8590c');S.r=R.prop('life_ring',-.6,.9,.55);await R.toss(S.r,.7,1.03,1.1,.7);R.fx('splash',.7,1.0,12,{w:.4,t:1.2});bob(R,S.r,.03,2.6);},
 raft:async(R,S)=>{R.label('Raft','#8b5a2b');S.f=R.prop('raft',-.6,.9,.7);await R.toss(S.f,1.5,1.03,1.1,.7);R.fx('splash',1.5,1.0,12,{w:.5,t:1.2});bob(R,S.f,.03,2);},
 floated:async(R,S)=>{R.word('They float!',.4,1.9,'#2b8a3e',1.6);R.fx('sparkle',.6,1.2,18,{w:2.4,t:1.6});await S.s.jump(.15);},
 paddled:async(R,S)=>{R.label('Sam on the raft','#1c7ed6');for(const p of [S.l,S.r,S.f])if(p)R.shrink(p,.6);await S.s.hide(.6);
   S.rf=R.act('pa-samraft',{x:-.5,y:.8,h:.8,face:1});S.rf.st.op=0;S.rf.ap();await S.rf.show(.5,'pop');await all([S.rf.go(.5,1.2,3.6),R.T(3.6,e=>{})]);R.fx('splash',.2,1.0,10,{w:.8,t:1.3});},
 buoyant:async(R,S)=>{R.label('Buoyant','#2b8a3e');R.word('Buoyant!',.6,1.95,'#2b8a3e',1.6);const r=R.ring(S.rf.st.x,S.rf.st.y+.3,.4,'#69db7c');await r.show();await r.pulse(2,1);await r.hide();},
 wood:async(R,S)=>{await S.rf.hide(.5);S.ch=R.act('pa-samcheer',{x:.6,y:1.2,h:.7,face:1});S.ch.st.op=0;S.ch.ap();await S.ch.show(.4,'pop');R.fx('heart',.6,1.9,8,{w:.8,t:1.4});await S.ch.jump(.15);await S.ch.jump(.15);}
};
const B13=[['wanted',L13.wanted],['float',L13.float],['key',L13.key],['plop',L13.plop],['scissors',L13.scissors],['sank',L13.sank],['log',L13.log],['ring',L13.ring],['raft',L13.raft],['floated',L13.floated],['paddled',L13.paddled],['buoyant',L13.buoyant],['wood',L13.wood]];
page('c13',0,{old:B13,neu:B13});

/* ================= LESSON 14 : Mouse and Cat Read the Labels ================= */
const SLOT={skull:[-1.0,1.6],flame:[-.15,1.6],burst:[.7,1.6],corrosive:[1.55,1.6]};
const sgn=async(R,S,k,lab,col)=>{R.label(lab,col);const s=R.sign(k,SLOT[k][0],SLOT[k][1],.8);(S.sg=S.sg||[]).push(s);await s.show();await s.shake(.8);};
const L14={
 found:async(R,S)=>{await R.bg('garage');R.label('Mouse','#868e96');S.m=R.act('pa-mousebottle',{x:-2.7,y:.05,h:1.2,face:1});await S.m.show(.2);await S.m.walk(-.4,.05,2.4);},
 juice:async(R,S)=>{R.word('Juice?!',-.4,1.9,'#2b8a3e',1.3);await S.m.wag(.8,.05,3);},
 stopped:async(R,S)=>{R.label('Cat','#e8590c');S.c=R.act('pa-catstop',{x:2.8,y:.05,h:1.3,face:-1});await S.c.show(.2);await S.c.walk(1.2,.05,1.6);await S.c.shiver(.6);R.word('Stop!',1.0,1.9,'#e03131',1.4);},
 label:async(R,S)=>{R.label('Label','#d6336c');await all([S.m.walk(-1.4,.05,1.5),S.c.hide(.5)]);S.p=R.act('pa-catpoint',{x:.6,y:.05,h:1.35,face:1});S.p.st.op=0;S.p.ap();await S.p.show(.5,'pop');},
 skull:async(R,S)=>{await sgn(R,S,'skull','Skull','#212529');},
 poisonous:async(R,S)=>{R.label('Poisonous','#d6336c');await S.m.swap('pa-mousescared',.6,{h:1.2,face:1});await S.m.shiver(1);},
 sick:async(R,S)=>{R.word('Yuck!',-.7,1.9,'#2b8a3e',1.3);await R.wait(.5);},
 flame:async(R,S)=>{await sgn(R,S,'flame','Flame','#e8590c');},
 flammable:async(R,S)=>{R.label('Flammable','#e8590c');R.fx('sparkle',-.15,1.6,12,{w:.6,t:1.2});await R.wait(.4);},
 exploding:async(R,S)=>{await sgn(R,S,'burst','Exploding','#e03131');R.fx('sparkle',.7,1.6,16,{w:.8,t:1.2});},
 hand:async(R,S)=>{await sgn(R,S,'corrosive','Corrosive','#7048e8');},
 labels:async(R,S)=>{R.label('Labels keep us safe','#2b8a3e');R.fx('heart',.2,1.3,12,{w:2.4,t:1.8});if(S.p&&S.p.jump)await S.p.jump(.12);}
};
const B14=[['found',L14.found],['juice',L14.juice],['stopped',L14.stopped],['label',L14.label],['skull',L14.skull],['poisonous',L14.poisonous],['sick',L14.sick],['flame',L14.flame],['flammable',L14.flammable],['exploding',L14.exploding],['hand',L14.hand],['labels',L14.labels]];
page('c14',0,{old:B14,neu:B14});

/* ================= LESSON 15 : A Windy Day at the Park ================= */
const L15={
 windy:async(R,S)=>{await R.bg('park-wind');R.label('Windy day','#1c7ed6');R.leaves(5,18);await R.wait(.8);},
 gust:async(R,S)=>{S.l=R.act('pa-leogust',{x:-.5,y:-.35,h:1.8,face:1});await S.l.show(.5,'pop');R.fx('leaf',-.5,1.2,10,{w:1,t:1.6});await S.l.shiver(.9);},
 hat:async(R,S)=>{S.h=R.prop('hat',-.4,1.55,.5);S.l.hide(.5);S.r=R.act('pa-leorun',{x:-.6,y:.05,h:1.3,face:1});S.r.st.op=0;S.r.ap();await S.r.show(.3);await all([R.toss(S.h,1.2,1.4,2.2,.5),S.r.walk(.9,.05,2.2)]);},
 flag:async(R,S)=>{R.label('Flag','#e03131');S.f=R.prop('flag',1.7,1.0,.8);sway(R,S.f,.14);await R.wait(1.2);},
 kite:async(R,S)=>{R.label('Kite','#e8590c');S.k=R.prop('kite',-1.2,1.4,.6);R.toss(S.k,.3,1.9,3,.3);sway(R,S.k,.1);await R.wait(1.4);},
 pinwheel:async(R,S)=>{R.label('Pinwheel','#7048e8');S.pw=R.prop('pinwheel',.9,1.05,.5);spin(R,S.pw,8);await R.wait(1.4);},
 bubbles:async(R,S)=>{R.label('Bubbles','#1c7ed6');if(S.r)S.r.hide(.5);S.a=R.act('pa-amybubbles',{x:-1.0,y:.05,h:1.35,face:1});S.a.st.op=0;S.a.ap();await S.a.show(.5,'pop');R.fx('bubble',-.4,1.1,16,{w:.3,t:3,vx:.8,vy:.2});},
 cannot:async(R,S)=>{R.word('Air!',.4,1.95,'#1c7ed6',1.5);R.fx('bubble',-.2,1.0,12,{w:.4,t:2.4,vx:1,vy:.1});await R.wait(.8);},
 bench:async(R,S)=>{await R.bg('park');S.b=R.act('pa-kidsbench',{x:1.1,y:.05,h:1.15,face:1});await S.b.show(.7,'pop');},
 cocoa:async(R,S)=>{R.label('Warm cocoa','#8b5a2b');R.fx('bubble',1.0,1.1,8,{w:.3,t:2.2,vy:.7});R.fx('heart',1.1,1.6,6,{w:.6,t:1.6});await R.wait(.6);},
 cold:async(R,S)=>{R.label('Cold air','#74c0fc');R.snow(4,24);await S.b.wag(.9,.03,3);}
};
const B15=[['windy',L15.windy],['gust',L15.gust],['hat',L15.hat],['flag',L15.flag],['kite',L15.kite],['pinwheel',L15.pinwheel],['bubbles',L15.bubbles],['cannot',L15.cannot],['bench',L15.bench],['cocoa',L15.cocoa],['cold',L15.cold]];
page('c15',0,{old:B15,neu:B15});

/* ---------- the new narration (switches on once its voice files exist) ---------- */
Object.assign(P.DIR_NEW,{
 c11:{story:"Mr. Soup the magician held up a glass of water. \"Watch this!\" he said. He dropped in a spoon of *sugar* and stirred and stirred. \"Abracadabra!\" The sugar was gone! \"It *dissolved*,\" whispered Mia. The sugar had not disappeared. It mixed into the water, and now the water tasted sweet. Then, oops! Mr. Soup knocked over his juice. He grabbed a *sponge*, a *paper towel*, and a metal spoon. The sponge and the towel soaked up the juice. The spoon did not. \"Some solids *absorb* liquids,\" he bowed."},
 c12:{story:"Mr. Water loves to wear *disguises*. In winter, he is a hard, cold *solid*: *ice* on the pond and snow on the hill. In spring, the sun warms him up and he *melts* into a *liquid* that splashes in rivers and puddles. On a hot day, he *evaporates* into an invisible *gas* that floats up into the sky. When it gets cold again, he *freezes* back into ice. \"Guess which state I am in now!\" he laughs."},
 c13:{story:"Sam wanted to cross a little river. \"I need things that *float*!\" he said. First, he tried a *key*. Plop! It sank. Next, he tried a pair of *scissors*. They sank too. Then he found a *log*, an old *life ring*, and a wooden *raft*. They all floated! Sam climbed onto the raft and paddled across, wearing the life ring. \"Things that float are *buoyant*,\" he called. \"Wood is great for boats!\""},
 c14:{story:"Mouse found a green bottle in the garage. \"Juice!\" he squeaked. Cat stopped him. \"Look at the *label*! See the *skull*? That means *poisonous*. If you drink it, you can get very sick.\" Mouse gulped. Next, they found a can with a *flame*. \"That is *flammable*,\" said Cat. \"It can catch fire.\" A spray can had an *exploding* symbol. A cleaner had a *hand* symbol: *corrosive*, it can burn skin. \"Labels keep us safe,\" said Cat."},
 c15:{story:"It was a *windy* day at the park. Whoosh! A gust of wind blew Leo's hat right off his head! Leo ran after it. The *flag* flapped, the *kite* soared high, and the *pinwheel* spun round and round. Amy blew *bubbles*, and the wind carried them far away. \"We cannot see air,\" said Amy, \"but we can see what it does!\" Then they sat on the bench and drank warm cocoa, because the air was *cold*."}});
P.DIR.mount();
})();
