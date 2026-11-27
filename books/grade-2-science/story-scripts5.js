/* Lessons 13-18: story pages for the NEW punchier stories (shot on new clay sets). 13-15 keep the old beats for the old audio. */
(function(){
"use strict";
const P=window.PM;if(!P||!P.DIR||!P.DIR_NEW)return;
const page=P.DIR.page;
const all=ps=>Promise.all(ps);
const bob=(R,p,amp,sp)=>{if(!p)return;let on=true,ph=Math.random()*6,y0=p.position.y;R.actors.push({kill:()=>{on=false;},tick:dt=>{if(!on)return;ph+=dt*(sp||2.2);p.position.y=y0+Math.sin(ph)*(amp||.03);p.rotation.z=Math.sin(ph*.8)*.05;}});};
const spin=(R,p,rate)=>{if(!p)return;let on=true;R.actors.push({kill:()=>{on=false;},tick:dt=>{if(on)p.rotation.z-=dt*(rate||7);}});};
const sink=(R,p,sec)=>{if(!p)return R.wait(sec||1);const y0=p.position.y,s0=p.scale.x;return R.T(sec||1.2,e=>{p.position.y=y0-e*.28;p.scale.setScalar(s0*(1-e*.6));});};
const pr=(R,n,x,y,s)=>R.prop(n,x,y,s);
const pop=async(R,k,o,t)=>{const a=R.act(k,o);a.st.op=0;a.ap();await a.show(t||.5,'pop');return a;};
const swp=async(R,S,key,k,sec,o)=>{if(S[key])await S[key].swap(k,sec||.6,o);};

/* ===== 13: Sam on Pirate Island ===== */
const L13={
 stranded:async(R,S)=>{await R.bg('isle');R.label('Sam','#1c7ed6');S.s=R.act('pa-s13worry',{x:-2.6,y:.1,h:1.4,face:1});await S.s.show(.2);await S.s.walk(-.5,.1,2.4);R.word('Stranded!',-.2,2.0,'#e03131',1.5);await S.s.wag(.6,.04,3);},
 tide:async(R,S)=>{R.label('Tide rising','#1c7ed6');R.fx('splash',-1.5,.5,16,{w:.5,t:1.6});R.fx('bubble',-1.3,.6,10,{w:.6,t:2.4,vy:.5});await R.wait(1);},
 key:async(R,S)=>{R.label('Iron key','#868e96');S.k=pr(R,'key',-.4,1.0,.45);if(S.k)await R.toss(S.k,-1.5,.55,1.1,.7);},
 plop:async(R,S)=>{R.word('Plop!',-1.4,1.5,'#1c7ed6',1.3);R.fx('splash',-1.5,.55,14,{w:.3,t:1.2});await sink(R,S.k,1.2);},
 scissors:async(R,S)=>{R.label('Scissors','#868e96');S.c=pr(R,'scissors',-.4,1.0,.5);if(S.c)await R.toss(S.c,-1.3,.55,1.1,.7);R.fx('splash',-1.3,.55,12,{w:.3,t:1.2});await sink(R,S.c,1.2);},
 gone:async(R,S)=>{R.word('Gone!',-1.2,1.7,'#e03131',1.4);await R.wait(.5);},
 knees:async(R,S)=>{await R.bg('shallow');S.s.hide(.2);S.w=R.act('pa-s13wade',{x:-.3,y:.15,h:1.35,face:1});S.w.st.op=0;S.w.ap();await S.w.show(.5,'pop');R.fx('splash',-.3,.25,12,{w:.6,t:1.4});await S.w.wag(.8,.03,3);},
 log:async(R,S)=>{R.label('Hollow log','#8b5a2b');S.l=pr(R,'log',-.5,1.0,.6);if(S.l){await R.toss(S.l,.9,.9,1.1,.7);R.fx('splash',.9,.9,12,{w:.4,t:1.2});bob(R,S.l,.03,2.2);}},
 ring:async(R,S)=>{R.label('Life ring','#e8590c');S.r=pr(R,'life_ring',-.5,1.0,.55);if(S.r){await R.toss(S.r,1.6,.95,1.1,.7);R.fx('splash',1.6,.95,12,{w:.4,t:1.2});bob(R,S.r,.03,2.6);}},
 plank:async(R,S)=>{R.label('Wooden plank','#8b5a2b');S.f=pr(R,'raft',-.5,1.0,.7);if(S.f){await R.toss(S.f,2.3,.9,1.1,.7);R.fx('splash',2.3,.9,12,{w:.5,t:1.2});bob(R,S.f,.03,2);}},
 bobbed:async(R,S)=>{R.word('They float!',.4,2.0,'#2b8a3e',1.6);R.fx('sparkle',1,1.2,20,{w:2.6,t:1.6});await S.w.jump(.15);},
 strapped:async(R,S)=>{for(const p of [S.l,S.r,S.f])if(p)R.shrink(p,.6);await S.w.swap('pa-s13paddle',.7,{h:.8,face:1});await S.w.go(-.2,.75,.6);R.fx('sparkle',-.2,1.0,12,{w:.8,t:1.2});},
 paddled:async(R,S)=>{R.label('Paddling away','#1c7ed6');await all([S.w.go(1.2,.95,4),R.T(4,e=>{})]);R.fx('splash',1.4,.9,10,{w:.8,t:1.3});},
 buoyant:async(R,S)=>{R.label('Buoyant','#2b8a3e');R.word('Buoyant!',.6,2.0,'#2b8a3e',1.7);const r=R.ring(S.w.st.x,S.w.st.y+.3,.45,'#69db7c');await r.show();await r.pulse(2,1);await r.hide();R.fx('heart',S.w.st.x,1.6,8,{w:.8,t:1.5});}
};
const B13=[['stranded',L13.stranded],['tide',L13.tide],['key',L13.key],['plop',L13.plop],['scissors',L13.scissors],['gone',L13.gone],['knees',L13.knees],['log',L13.log],['ring',L13.ring],['plank',L13.plank],['bobbed',L13.bobbed],['strapped',L13.strapped],['paddled',L13.paddled],['buoyant',L13.buoyant]];
page('c13',0,{old:P.DIR_PAGES.c13[0].old,neu:B13});

/* ===== 14: Mouse and Cat at midnight ===== */
const SLOT={skull:[-1.1,1.7],flame:[-.25,1.7],burst:[.65,1.7],corrosive:[1.55,1.7]};
const sgn=async(R,S,k,lab,col)=>{R.label(lab,col);const s=R.sign(k,SLOT[k][0],SLOT[k][1],.8);(S.sg=S.sg||[]).push(s);await s.show();await s.shake(.8);};
const L14={
 midnight:async(R,S)=>{await R.bg('garage-night');R.label('Midnight','#364fc7');R.fx('sparkle',.5,2.0,6,{w:.3,t:2});await R.wait(1.1);},
 starving:async(R,S)=>{R.label('Mouse','#868e96');S.m=R.act('pa-m14cap',{x:-2.7,y:.1,h:1.2,face:1});await S.m.show(.2);await S.m.walk(-.5,.1,2.6);R.word('So hungry!',-.4,1.9,'#e8590c',1.3);},
 glowing:async(R,S)=>{R.label('Glowing bottle','#2b8a3e');const r=R.ring(-.1,.7,.35,'#69db7c');await r.show();await r.pulse(3,1);await r.hide();R.fx('sparkle',-.1,.7,12,{w:.4,t:1.4});},
 twisting:async(R,S)=>{R.word('Lime soda!',.4,1.9,'#2b8a3e',1.3);await S.m.wag(1,.05,6);},
 thwack:async(R,S)=>{R.word('THWACK!',1.0,1.5,'#e03131',1.6);S.c=R.act('pa-c14drop',{x:1.0,y:2.3,h:1.2,face:-1});S.c.st.op=0;S.c.ap();await S.c.show(.2);await S.c.go(1.0,.25,.5);R.fx('dust',1.0,.15,14,{w:.6,t:1.2});await S.m.shiver(.7);},
 skull:async(R,S)=>{R.label('Cat','#e8590c');await sgn(R,S,'skull','Skull','#212529');},
 poisonous:async(R,S)=>{R.label('Poisonous','#d6336c');await S.m.swap('pa-mousescared',.6,{h:1.2,face:1});await S.m.shiver(1);},
 sick:async(R,S)=>{R.word('Yuck!',-.7,1.95,'#2b8a3e',1.3);await R.wait(.5);},
 flame:async(R,S)=>{await sgn(R,S,'flame','Flame','#e8590c');},
 flammable:async(R,S)=>{R.label('Flammable','#e8590c');R.fx('sparkle',-.25,1.7,12,{w:.6,t:1.2});await R.wait(.4);},
 exploding:async(R,S)=>{await sgn(R,S,'burst','Exploding','#e03131');R.fx('sparkle',.65,1.7,16,{w:.8,t:1.2});},
 hand:async(R,S)=>{await sgn(R,S,'corrosive','Corrosive','#7048e8');},
 gulped:async(R,S)=>{R.word('Gulp!',-.5,1.9,'#868e96',1.3);await S.m.shiver(.9);},
 kitchen:async(R,S)=>{await R.bg('kitchen-night');S.k=R.act('pa-mc14walk',{x:-2.7,y:.1,h:1.3,face:1});await S.k.show(.2);await S.k.walk(-.3,.1,3);},
 cheese:async(R,S)=>{R.label('Real cheese','#e8a900');await S.k.swap('pa-m14cheese',.7,{h:1.2,face:1});R.fx('heart',-.3,1.5,8,{w:.6,t:1.5});await S.k.jump(.1);},
 whiskers:async(R,S)=>{R.word('Labels save whiskers!',.3,2.0,'#2b8a3e',1.5);R.fx('sparkle',-.3,1.2,20,{w:2.4,t:1.6});await S.k.wag(.8,.04,3);}
};
const B14=[['midnight',L14.midnight],['starving',L14.starving],['glowing',L14.glowing],['twisting',L14.twisting],['thwack',L14.thwack],['skull',L14.skull],['means',L14.poisonous],['sick',L14.sick],['flame',L14.flame],['catches',L14.flammable],['exploding',L14.exploding],['hand',L14.hand],['gulped',L14.gulped],['kitchen',L14.kitchen],['cheese',L14.cheese],['whiskers',L14.whiskers]];
page('c14',0,{old:P.DIR_PAGES.c14[0].old,neu:B14});

/* ===== 15: Leo's hat ===== */
const L15={
 hat:async(R,S)=>{await R.bg('park-wind');R.label('Leo','#2b8a3e');R.leaves(6,20);S.l=R.act('pa-l15shout',{x:.1,y:.1,h:1.7,face:1});await S.l.show(.4,'pop');R.word('Give back my hat!',.6,2.1,'#e03131',1.4);await S.l.wag(.8,.04,5);},
 invisible:async(R,S)=>{R.label('Invisible!','#1c7ed6');R.fx('leaf',-.8,1.0,14,{w:1.4,t:2.2,vx:1.4});await R.wait(.8);},
 flying:async(R,S)=>{S.cp=R.act('pa-l15cap',{x:.1,y:1.65,h:.4,face:1});S.cp.st.op=0;S.cp.ap();await S.cp.show(.2);await all([S.cp.go(2.2,2.0,3),R.T(3,e=>{})]);},
 flag:async(R,S)=>{R.label('Flag','#e03131');S.f=pr(R,'flag',1.7,1.0,.8);if(S.f){let on=true,ph=0;R.actors.push({kill:()=>{on=false;},tick:dt=>{if(on){ph+=dt*9;S.f.rotation.z=Math.sin(ph)*.16;}}});}await R.wait(1.3);},
 kite:async(R,S)=>{R.label('Kite','#e8590c');S.b=R.act('pa-b15kite',{x:-1.0,y:.1,h:1.2,face:1});S.b.st.op=0;S.b.ap();await S.b.show(.5,'pop');await S.b.wag(1.1,.04,6);},
 pinwheel:async(R,S)=>{R.label('Pinwheel','#7048e8');S.pw=pr(R,'pinwheel',1.0,1.1,.55);spin(R,S.pw,10);await R.wait(1.3);},
 bubbles:async(R,S)=>{R.label('Bubbles sideways','#1c7ed6');S.a=R.act('pa-a15bub',{x:1.3,y:.1,h:1.3,face:1});S.a.st.op=0;S.a.ap();await S.a.show(.5,'pop');R.fx('bubble',.6,1.2,18,{w:.3,t:3,vx:1.2,vy:.15});await R.wait(.8);},
 see:async(R,S)=>{R.word('You can\'t see air!',.4,2.1,'#1c7ed6',1.5);R.fx('bubble',-.2,1.0,12,{w:.4,t:2.4,vx:1.1,vy:.1});await S.a.jump(.12);},
 freezing:async(R,S)=>{R.label('Freezing!','#74c0fc');R.snow(4,24);await S.l.shiver(.9);},
 cocoa:async(R,S)=>{await R.bg('park');S.bn=R.act('pa-kidsbench',{x:.8,y:.1,h:1.2,face:1});await S.bn.show(.7,'pop');R.label('Hot cocoa','#8b5a2b');R.fx('bubble',.8,1.1,8,{w:.3,t:2.2,vy:.7});R.fx('heart',.9,1.7,8,{w:.6,t:1.6});await R.wait(.8);}
};
const B15=[['hat',L15.hat],['invisible',L15.invisible],['flying',L15.flying],['flag',L15.flag],['kite',L15.kite],['pinwheel',L15.pinwheel],['bubbles',L15.bubbles],['see',L15.see],['freezing',L15.freezing],['cocoa',L15.cocoa]];
page('c15',0,{old:P.DIR_PAGES.c15[0].old,neu:B15});

/* ===== 16: Drip, the water cycle ===== */
const L16={
 bored:async(R,S)=>{await R.bg('ocean');R.label('Drip','#1c7ed6');S.d=R.act('pa-d16float',{x:-.6,y:.5,h:.8,face:1});await S.d.show(.5,'pop');bob(R,S.d.m||S.d.o||null,.02,1.5);await S.d.wag(1,.03,2);R.fx('z',-.5,1.4,5,{w:.4,t:2,vy:.5});},
 sun:async(R,S)=>{R.label('Blazing sun','#e8590c');S.sn=pr(R,'sun',1.4,2.05,.8);if(S.sn)spin(R,S.sn,.6);R.fx('sparkle',1.4,2.0,14,{w:.8,t:1.6});await R.wait(.9);},
 whoosh:async(R,S)=>{R.word('WHOOSH!',-.2,1.5,'#e8590c',1.6);await S.d.swap('pa-d16vapor',.7,{h:1.0,face:1});R.fx('bubble',-.6,.6,14,{w:.6,t:2,vy:1.4});},
 evaporation:async(R,S)=>{R.label('Evaporation','#e8590c');await S.d.go(-.2,1.7,2.4);},
 freezing:async(R,S)=>{await R.bg('storm');R.label('High & freezing','#74c0fc');S.d=R.act('pa-d16vapor',{x:-.4,y:1.5,h:.9,face:1});await S.d.show(.5,'pop');R.snow(3,24);},
 huddled:async(R,S)=>{await S.d.swap('pa-d16cloud',.8,{h:1.0,face:1});await S.d.shiver(1);},
 condensation:async(R,S)=>{R.label('Condensation','#7048e8');R.word('Cloud!',.6,2.1,'#7048e8',1.4);R.fx('sparkle',-.4,1.5,16,{w:1.4,t:1.6});await R.wait(.6);},
 heavy:async(R,S)=>{R.fx('drop',-.4,1.3,14,{w:.8,t:1.6,vy:-1});await S.d.shiver(1);},
 wheee:async(R,S)=>{R.word('WHEEE!',.6,2.0,'#1c7ed6',1.6);await S.d.swap('pa-d16sky',.5,{h:.9,face:1});await S.d.go(-.2,.4,1.5);},
 precipitation:async(R,S)=>{R.label('Precipitation','#1c7ed6');R.fx('drop',0,2.0,24,{w:3,t:2,vy:-1.4});await R.wait(.6);},
 raging:async(R,S)=>{await R.bg('rapids');R.label('Raging river','#1c7ed6');S.d=R.act('pa-d16sky',{x:-1.2,y:.9,h:.8,face:1});await S.d.show(.4,'pop');R.fx('splash',-1.2,.8,18,{w:.8,t:1.4});},
 surfed:async(R,S)=>{await all([S.d.go(1.2,.8,3.4),R.T(3.4,e=>{})]);R.fx('splash',1.4,.7,14,{w:.8,t:1.4});},
 rollercoaster:async(R,S)=>{R.word('Best rollercoaster ever!',.2,2.1,'#d6336c',1.4);R.fx('heart',1.2,1.4,10,{w:1,t:1.6});await S.d.jump(.2);}
};
const B16=[['bored',L16.bored],['sun',L16.sun],['whoosh',L16.whoosh],['evaporation',L16.evaporation],['freezing',L16.freezing],['huddled',L16.huddled],['condensation',L16.condensation],['heavy',L16.heavy],['wheee',L16.wheee],['precipitation',L16.precipitation],['raging',L16.raging],['surfed',L16.surfed],['rollercoaster',L16.rollercoaster]];
page('c16',0,{old:null,neu:B16});

/* ===== 17: Captain Quack ===== */
const L17={
 packed:async(R,S)=>{await R.bg('creek-dirty');R.label('Captain Quack','#e8a900');S.q=R.act('pa-q17case',{x:-2.5,y:.1,h:1.3,face:1});await S.q.show(.2);await S.q.walk(-.7,.1,2.4);R.word('Goodbye!',-.4,2.0,'#e03131',1.3);},
 garbage:async(R,S)=>{R.label('Garbage','#868e96');S.t=pr(R,'trash',1.0,.5,.5);R.fx('dust',1.3,.5,10,{w:.6,t:1.6});await R.wait(.8);},
 exhaust:async(R,S)=>{R.label('Car exhaust','#495057');R.fx('dust',1.9,.9,18,{w:.5,t:2.6,vy:.6});await R.wait(.8);},
 clean:async(R,S)=>{R.label('Clean Team','#2b8a3e');S.k=R.act('pa-k17bags',{x:1.0,y:.1,h:1.2,face:-1});S.k.st.op=0;S.k.ap();await S.k.show(.5,'pop');await S.k.wag(.8,.04,4);},
 monday:async(R,S)=>{R.label('Monday','#1c7ed6');R.word('40 bags!',.8,2.0,'#2b8a3e',1.4);if(S.t)R.shrink(S.t,.8);R.fx('sparkle',1.0,.8,16,{w:1,t:1.4});await S.k.jump(.12);},
 tuesday:async(R,S)=>{await R.bg('street');R.label('Tuesday','#1c7ed6');S.k.hide(.3);S.b=R.act('pa-k17bike',{x:-2.4,y:.1,h:1.1,face:1});await S.b.show(.2);await S.b.walk(1.8,.1,3.2);},
 biked:async(R,S)=>{R.word('Bike to school!',0,2.0,'#2b8a3e',1.4);R.fx('sparkle',0,1.0,14,{w:1.6,t:1.4});await R.wait(.5);},
 wednesday:async(R,S)=>{await R.bg('creek-clean');R.label('Wednesday','#1c7ed6');for(let i=0;i<5;i++){const t=pr(R,'tree',-1.5+i*.8,.25,.95);if(t){const s0=t.scale.x;t.scale.setScalar(s0*.1);R.T(.7,e=>t.scale.setScalar(s0*(.1+.9*e)));}R.fx('sparkle',-1.5+i*.8,.8,6,{w:.3,t:1});await R.wait(.45);}},
 thursday:async(R,S)=>{R.label('Thursday','#1c7ed6');R.word('Care About Air!',-.8,2.15,'#1c7ed6',1.0);await R.wait(.7);R.word('Don\'t Waste Water!',.8,1.85,'#2b8a3e',1.0);await R.wait(.7);},
 friday:async(R,S)=>{R.label('Friday','#e8a900');R.word('No More Litter!',-.8,1.55,'#e8590c',1.0);R.word('Save Our Ocean!',.8,1.25,'#7048e8',1.0);S.q2=R.act('pa-q17case',{x:-1.4,y:.1,h:1.3,face:1});S.q2.st.op=0;S.q2.ap();await S.q2.show(.5,'pop');await R.wait(.5);},
 unpacked:async(R,S)=>{await S.q2.swap('pa-q17ducks',.7,{h:1.2,face:1});R.fx('heart',-.7,1.6,10,{w:1,t:1.6});},
 ducklings:async(R,S)=>{R.word('Ten ducklings!',.4,2.0,'#e8a900',1.5);await S.q2.go(.9,.1,3);R.fx('sparkle',.4,1.0,22,{w:2.6,t:1.8});}
};
const B17=[['packed',L17.packed],['garbage',L17.garbage],['exhaust',L17.exhaust],['clean',L17.clean],['monday',L17.monday],['tuesday',L17.tuesday],['biked',L17.biked],['wednesday',L17.wednesday],['thursday',L17.thursday],['friday',L17.friday],['brought',L17.unpacked],['ducklings',L17.ducklings]];
page('c17',0,{old:null,neu:B17});

/* ===== 18: Kai and the wind-up robot ===== */
const L18={
 gave:async(R,S)=>{await R.bg('livingroom');R.label('Grandpa','#8b5a2b');S.g=R.act('pa-g18laugh',{x:1.4,y:.1,h:1.5,face:-1});await S.g.show(.5,'pop');S.k=R.act('pa-k18wind',{x:-.5,y:.1,h:1.4,face:1});await S.k.show(.5,'pop');R.fx('sparkle',-.2,1.0,12,{w:.6,t:1.4});},
 key:async(R,S)=>{R.label('Brass key','#e8a900');await S.k.wag(1.2,.05,6);R.word('Click, click, click!',-.2,2.0,'#e8590c',1.3);},
 input:async(R,S)=>{R.label('Input','#1c7ed6');const r=R.ring(-.1,.8,.45,'#74c0fc');await r.show();await r.pulse(2,1);await r.hide();},
 stomped:async(R,S)=>{S.r=R.act('pa-r18march',{x:-.8,y:.1,h:.8,face:1});S.r.st.op=0;S.r.ap();await S.r.show(.4,'pop');await S.r.walk(.8,.1,3.2);R.fx('dust',.6,.1,12,{w:.6,t:1.2});},
 output:async(R,S)=>{R.label('Output','#2b8a3e');const r=R.ring(S.r.st.x,.5,.45,'#69db7c');await r.show();await r.pulse(2,1);await r.hide();},
 lamp:async(R,S)=>{S.r.hide(.3);S.k.hide(.3);S.l=pr(R,'lamp',-1.2,.2,.7);R.label('Switch','#e8a900');R.fx('sparkle',-1.2,1.2,18,{w:.8,t:1.6});await R.wait(.8);},
 button:async(R,S)=>{await R.bg('hall');R.label('Button','#d6336c');S.b=R.act('pa-k18btn',{x:.3,y:.1,h:1.5,face:1});await S.b.show(.5,'pop');await S.b.jump(.1);R.fx('sparkle',1.3,1.2,10,{w:.4,t:1.2});},
 energy:async(R,S)=>{R.label('Energy','#e8590c');R.word('Energy!',.5,2.0,'#e8590c',1.6);R.fx('sparkle',.3,1.0,20,{w:2,t:1.6});await R.wait(.6);},
 against:async(R,S)=>{await R.bg('livingroom');S.b.hide(.2);S.k=R.act('pa-k18wind',{x:-.5,y:.1,h:1.4,face:-1});S.k.st.op=0;S.k.ap();await S.k.show(.5,'pop');await S.k.wag(1,.06,6);},
 nothing:async(R,S)=>{R.word('Nothing!',-.4,2.0,'#868e96',1.5);await S.k.shiver(.9);},
 laughed:async(R,S)=>{S.g=R.act('pa-g18laugh',{x:1.4,y:.1,h:1.5,face:-1});S.g.st.op=0;S.g.ap();await S.g.show(.4,'pop');await S.g.wag(1,.04,6);R.fx('heart',1.4,1.9,8,{w:.8,t:1.5});},
 lunch:async(R,S)=>{R.word('It\'s lunch!',.5,2.1,'#2b8a3e',1.7);const s=pr(R,'sandwich',.2,1.0,.6);if(s)await R.toss(s,-.4,.3,1.2,.5);R.fx('heart',0,1.5,12,{w:2,t:1.6});}
};
const B18=[['gave',L18.gave],['key',L18.key],['input',L18.input],['stomped',L18.stomped],['output',L18.output],['lamp',L18.lamp],['button',L18.button],['energy',L18.energy],['against',L18.against],['happened',L18.nothing],['laughed',L18.laughed],['lunch',L18.lunch]];
page('c18',0,{old:null,neu:B18});
P.DIR.mount();
})();
