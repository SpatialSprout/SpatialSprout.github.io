/* Lessons 1-5 shot by shot. Every sentence of the narration has its own beat on the clay set.
   old: beats for the narration that is recorded now; neu: the new, fuller narration (used once its voice exists). */
(function(){
"use strict";
const P=window.PM;if(!P||!P.DIR)return;
const page=P.DIR.page,W=P.PIC.W,H=P.PIC.H;
const seq=(...fs)=>(R,S)=>fs.reduce((p,f)=>p.then(()=>R.alive()?f(R,S):null),Promise.resolve());
const all=ps=>Promise.all(ps);

/* ================= LESSON 1 : The Animal Club ================= */
const L1={
 club:async(R,S)=>{await R.bg('child');S.boy=R.act('pa-boywalk',{x:-W/2+.4,y:.3,h:1.5,face:1});await S.boy.show(.3);await S.boy.walk(-.2,.3,2.2);R.label('Animal Club','#e8590c');await S.boy.say('Look what I brought!',1700);},
 tadpole:async(R,S)=>{await R.bg('frog');S.tad=R.act('pa-tadpole',{x:-1.6,y:.55,h:.5,face:-1,idle:'swim'});S.tad.st.fl=-1;await S.tad.show(.4);
   const b=R.fx('bubble',-1.2,.6,8,{w:.6,t:1.6});await S.tad.swim(-.2,.55,2.4);await b;},
 legs:async(R,S)=>{if(!S.tad)return;await S.tad.wag(1.2,.08,5);R.fx('sparkle',S.tad.st.x,.65,8,{w:.4,t:1});await S.tad.grow(1.2,1.15,.6);},
 frog:async(R,S)=>{if(!S.tad)await L1.tadpole(R,S);S.frog=R.hero('frog');S.frog.st.op=0;S.frog.ap();
   await S.tad.hide(.35);R.fx('splash',-.05,.5,14,{w:.6,t:1});await S.frog.show(.6,'pop');await S.frog.jump(.35);R.word('Hop!',0,1.85,'#2b8a3e');await R.wait(.6);},
 amph:async(R,S)=>{R.label('Amphibian','#2b8a3e');R.fx('splash',0,.5,10,{w:.8,t:1});if(S.frog)await S.frog.jump(.2);await R.wait(.6);},
 snake:async(R,S)=>{await R.bg('snake');S.sn=R.hero('snake');await S.sn.show(.7,'pop');await S.sn.wag(1.6,.025,3);},
 scales:async(R,S)=>{const r=R.ring(.15,1.0,.42);await r.show();R.fx('sparkle',.15,1.0,10,{w:.6,h:.4,t:1.1});await r.pulse(2,1.4);await r.hide();},
 reptile:async(R,S)=>{R.label('Reptile','#e8590c');await R.wait(.8);},
 parrot:async(R,S)=>{await R.bg('parrot');S.pf=R.act('pa-parrotfly',{x:-W/2+.2,y:1.4,h:1.0,face:1,idle:'flutter'});await S.pf.show(.3);
   await S.pf.fly(.55,1.0,2.4);S.pp=R.hero('parrot');S.pp.st.op=0;S.pp.ap();await all([S.pp.show(.6),S.pf.hide(.6)]);R.fx('note',.6,1.9,4,{t:1.2});},
 feathers:async(R,S)=>{R.fx('sparkle',.55,1.5,12,{w:.8,h:.6,t:1.2});const r=R.ring(.55,1.5,.45,'#ffd43b');await r.show();await r.pulse(2,1.2);await r.hide();},
 bird:async(R,S)=>{R.label('Bird','#1c7ed6');await R.wait(.8);},
 whale:async(R,S)=>{await R.bg('whale');S.wh=R.hero('whale',{idle:'swim'});const hx=S.wh.home.x;S.wh.at(W/2-.6,S.wh.home.y);await S.wh.show(.4);await S.wh.swim(hx,null,2.6);},
 fish:async(R,S)=>{await R.word('A fish?',-1.1,1.9,'#1c7ed6');},
 spout:async(R,S)=>{const w=S.wh;const x=w?w.st.x+(w.w()*.12):0,y=w?w.st.y+w.h()*.95:1.4;await R.fx('drop',x,y,18,{w:.12,t:1.3,vy:2.2});},
 milk:async(R,S)=>{const w=S.wh;if(!w)return;await w.swap('pa-whalecalf',.8,{h:w.h()*1.05,face:1,col:'#a9c8ff'});R.fx('heart',w.st.x,w.st.y+1.0,8,{w:.8,t:1.6});await R.wait(.9);},
 mammal:async(R,S)=>{R.label('Mammal','#c2255c');R.fx('sparkle',0,1.2,10,{w:2,t:1.2});await R.wait(1);}
};
page('c01',0,{
 old:[['club',L1.club],['frog',seq(L1.tadpole,L1.legs,L1.frog,L1.amph)],['snake',seq(L1.snake,L1.scales,L1.reptile)],['parrot',seq(L1.parrot,L1.feathers,L1.bird)],
  ['whale',L1.whale],['fish',L1.fish],['milk',seq(L1.spout,L1.milk)],['mammals',L1.mammal]],
 neu:[['club',L1.club],['tadpole',L1.tadpole],['legs',L1.legs],['became',L1.frog],['amphibian',L1.amph],['snake',L1.snake],['scales',L1.scales],['reptile',L1.reptile],
  ['parrot',L1.parrot],['feathers',L1.feathers],['bird',L1.bird],['whale',L1.whale],['fish',L1.fish],['breathe',L1.spout],['milk',L1.milk],['mammals',L1.mammal]]});
/* theory 1: the five groups */
const G1={
 dog:async(R,S)=>{await R.bg('dog');S.d=R.hero('dog');await S.d.show(.6,'pop');R.fx('fluff',S.d.st.x,.9,12,{w:1,h:.6,t:1.2});await S.d.wag(1.2,.05,5);R.label('Mammal: fur','#e8590c');},
 owl:async(R,S)=>{await R.bg('owl');S.o=R.hero('owl');await S.o.show(.6,'pop');R.fx('sparkle',S.o.st.x,1.2,10,{w:.8,h:.6,t:1.2});await S.o.jump(.15);R.label('Bird: feathers','#1c7ed6');},
 fish:async(R,S)=>{await R.bg('fish');S.f=R.hero('fish',{idle:'swim'});S.f.at(W/2-.5,S.f.home.y);await S.f.show(.3);await S.f.swim(S.f.home.x,null,2);R.fx('bubble',S.f.st.x-.4,1.1,10,{w:.3,t:1.4});R.label('Fish: fins','#0b7285');},
 turtle:async(R,S)=>{await R.bg('turtle');S.t=R.hero('turtle');await S.t.show(.6,'pop');const r=R.ring(S.t.st.x+.2,.9,.4);await r.show();await r.pulse(2,1);await r.hide();R.label('Reptile: scales','#e8590c');},
 frog:async(R,S)=>{await R.bg('frog');const t=R.act('pa-tadpole',{x:-.4,y:.42,h:.4,face:-1,idle:'swim'});t.st.fl=-1;await t.show(.3);await t.swim(.0,.45,1.2);
   S.fr=R.hero('frog');S.fr.st.op=0;S.fr.ap();await t.hide(.3);R.fx('splash',0,.5,12,{w:.5,t:1});await S.fr.show(.5,'pop');await S.fr.jump(.3);R.label('Amphibian: water, then land','#2b8a3e');}
};
page('c01',1,{old:[['mammals',G1.dog],['birds',G1.owl],['fish',G1.fish],['reptiles',G1.turtle],['amphibians',G1.frog]],
 neu:[['dog',G1.dog],['owl',G1.owl],['fins',G1.fish],['turtle',G1.turtle],['frog',G1.frog]]});
const M1={
 cow:async(R,S)=>{if(S.c)return;await R.bg('cow');S.c=R.hero('cow');await S.c.show(.6,'pop');R.fx('fluff',S.c.st.x,1.1,10,{w:1.2,h:.5,t:1.2});R.label('Fur or hair','#e8590c');await R.wait(.6);},
 babies:async(R,S)=>{await M1.cow(R,S);await S.c.swap('pa-cowcalf',.9,{h:S.c.h()*1.0,face:-1});R.label('Born alive','#1c7ed6');await R.wait(.8);},
 milk:async(R,S)=>{R.fx('heart',S.c?S.c.st.x+.2:0,.9,10,{w:.6,t:1.6});R.label('Drinks milk','#c2255c');await R.wait(1.2);},
 whale:async(R,S)=>{await R.bg('whale');S.w=R.act('pa-whalecalf',{x:W/2-.7,y:.5,h:.95,face:1,idle:'swim'});S.w.st.fl=-1;await S.w.show(.3);await S.w.swim(.2,null,2.2);R.fx('drop',S.w.st.x-.3,1.4,12,{w:.1,t:1.2,vy:2});R.label('Whale: mammal','#1c7ed6');},
 monkey:async(R,S)=>{await R.bg('monkey');S.m=R.hero('monkey');await S.m.show(.7,'pop');await S.m.wag(1.4,.04,3);R.label('Monkey: mammal','#e8590c');}
};
page('c01',2,{old:[['mammals',M1.cow],['babies',M1.babies],['milk',M1.milk],['whale',M1.whale],['monkey',M1.monkey]],
 neu:[['cow',M1.cow],['born',M1.babies],['drinking',M1.milk],['whale',M1.whale],['monkey',M1.monkey]]});
page('c01',3,{old:[['mammals',async R=>{await R.bg('dog');const d=R.hero('dog');await d.show(.6,'pop');R.label('Mammal','#e8590c');await d.wag(1,.05,4);}],
 ['birds',async R=>{await R.bg('duck');const d=R.hero('duck',{idle:'swim'});await d.show(.6,'pop');R.label('Bird','#1c7ed6');await d.jump(.15);}]]});

/* ================= LESSON 2 : Lunchtime at the Zoo ================= */
const L2={
 lionSet:async(R,S)=>{if(S.l)return;await R.bg('lion');S.l=R.hero('lion');await S.l.show(.6,'pop');},
 keeper:async(R,S)=>{await L2.lionSet(R,S);S.k=R.act('pa-keeper',{x:-W/2+.2,y:.22,h:1.5,face:1});await S.k.show(.3);await S.k.walk(-1.0,.22,1.8);await S.k.say('Lunch time!',1500);},
 toss:async(R,S)=>{await L2.lionSet(R,S);const kx=S.k?S.k.st.x+.3:-1.4;const m=R.prop('meat',kx,1.0,.35);await R.toss(m,S.l.st.x-.35,.75,.9,.6);S.meat=m;},
 tear:async(R,S)=>{await L2.lionSet(R,S);await S.l.jump(.12);R.word('Chomp!',-.2,1.9,'#e8590c');const ch=S.l.chew(6,1.8);R.fx('crumb',S.l.st.x-.4,.9,10,{w:.3,t:1});if(S.meat){await R.shrink(S.meat,1.6);R.drop(S.meat);}await ch;R.label('Sharp teeth tear meat','#c92a2a');},
 lion:async(R,S)=>{await L2.keeper(R,S);await L2.toss(R,S);await L2.tear(R,S);},
 horseSet:async(R,S)=>{if(S.h)return;await R.bg('horse');S.k&&S.k.hide(.2);S.h=R.hero('horse');await S.h.show(.6,'pop');},
 hay:async(R,S)=>{await L2.horseSet(R,S);const k=R.act('pa-keeper',{x:W/2-.3,y:.22,h:1.45,face:1});k.st.fl=-1;await k.show(.3);await k.walk(1.5,.22,1.2);const p=R.prop('hay',1.3,.9,.42);await R.toss(p,S.h.st.x-.75,.35,.9,.5);S.hay=p;},
 munch:async(R,S)=>{await L2.horseSet(R,S);const ch=S.h.chew(8,2.4);for(let i=0;i<3;i++){R.fx('dust',S.h.st.x-.75,.5,4,{w:.2,t:.7});if(S.hay)S.hay.scale.multiplyScalar(.72);await R.wait(.75);}await ch;if(S.hay)R.drop(S.hay);R.label('Flat teeth grind grass','#2b8a3e');},
 horse:async(R,S)=>{await L2.hay(R,S);await L2.munch(R,S);},
 elephant:async(R,S)=>{await R.bg('elephant');S.e=R.hero('elephant');await S.e.show(.6,'pop');S.hp=R.prop('hay',S.e.st.x-1.05,.2,.4);await R.wait(.4);},
 trunk:async(R,S)=>{if(!S.e)await L2.elephant(R,S);await S.e.T(.5,e=>{S.e.st.rz=.05*Math.sin(e*Math.PI);});if(S.hp)R.drop(S.hp);await S.e.swap('pa-elephanthay',.7,{h:S.e.h()*1.02,face:-1});await S.e.jump(.06);R.label('A trunk can grab','#7048e8');await R.wait(.8);},
 frogSet:async(R,S)=>{if(S.fr)return;await R.bg('frog');S.fr=R.hero('frog');await S.fr.show(.6,'pop');},
 fly:async(R,S)=>{await L2.frogSet(R,S);S.fly=R.fly(-1.4,1.3);await S.fly.go(-.9,1.0,1.4);},
 zap:async(R,S)=>{await L2.frogSet(R,S);if(!S.fly)await L2.fly(R,S);await S.fr.swap('pa-frogtongue',.15,{h:S.fr.h()*1.0,face:-1});S.fr.at(S.fr.st.x+.3,S.fr.st.y);S.fly.kill();R.word('Zap!',-.6,1.8,'#c2255c');await R.wait(.8);
   await S.fr.swap('h:frog',.25);S.fr.at(S.fr.home.x,S.fr.home.y);await S.fr.chew(3,.8);R.label('Sticky tongue','#c2255c');},
 frog:async(R,S)=>{await L2.fly(R,S);await L2.zap(R,S);},
 duck:async(R,S)=>{await R.bg('duck');const d=R.hero('duck',{idle:'swim'});d.at(-W/2+.6,d.home.y);await d.show(.3);await d.go(d.home.x,d.home.y,2,{hops:5,arc:.03,wob:.08,lin:1});R.label('Waddle','#1c7ed6');},
 snake:async(R,S)=>{await R.bg('snake');const s=R.hero('snake');await s.show(.6,'pop');await s.wag(1.8,.03,4);R.label('Slither','#e8590c');},
 bird:async(R,S)=>{await R.bg('parrot');const f=R.act('pa-parrotfly',{x:-W/2+.2,y:.6,h:.95,face:1,idle:'flutter'});await f.show(.3);await f.fly(.55,1.0,2.2);const p=R.hero('parrot');p.st.op=0;p.ap();await all([p.show(.5),f.hide(.5)]);R.label('Fly','#2b8a3e');}
};
page('c02',0,{
 old:[['zookeeper',L2.keeper],['lion',seq(L2.toss,L2.tear)],['horse',L2.horse],['elephant',seq(L2.elephant,L2.trunk)],['frog',L2.frog],['duck',L2.duck],['snake',L2.snake],['bird',L2.bird]],
 neu:[['zookeeper',L2.keeper],['tossed',L2.toss],['tore',L2.tear],['horse',L2.hay],['munched',L2.munch],['elephant',L2.elephant],['trunk',L2.trunk],['fly',L2.fly],['zap',L2.zap],['duck',L2.duck],['snake',L2.snake],['bird',L2.bird]]});
const T2={
 beaver:async(R,S)=>{await R.bg('beaver');const b=R.hero('beaver');await b.show(.6,'pop');const ch=b.chew(10,2.4);for(let i=0;i<4;i++){R.fx('chip',b.st.x+.15,b.st.y+.75,6,{w:.2,t:.8});await R.wait(.55);}await ch;R.label('Strong front teeth chew wood','#e8590c');},
 shark:async(R,S)=>{await R.bg('shark');const s=R.hero('shark',{idle:'swim'});await s.show(.6,'pop');const f=R.prop('fish',s.st.x-1.4,s.st.y+.4,.32);
   await R.toss(f,s.st.x-.9,s.st.y+.45,1.2,.1);await s.go(s.st.x-.4,s.st.y,.35,{});R.word('Chomp!',-.4,1.9,'#1c7ed6');R.drop(f);R.fx('bubble',s.st.x-.6,s.st.y+.5,12,{w:.4,t:1});await s.go(s.home.x,s.home.y,.8,{});R.label('Rows of sharp teeth','#1c7ed6');},
 horse:async(R,S)=>{await R.bg('horse');const h=R.hero('horse');await h.show(.6,'pop');const p=R.prop('hay',h.st.x-.75,.35,.42);await h.chew(8,2.2);R.shrink(p,.6);R.label('Flat teeth grind grass','#2b8a3e');}
};
page('c02',1,{old:[['beaver',T2.beaver],['shark',T2.shark],['horse',T2.horse]],neu:[['beaver',T2.beaver],['shark',T2.shark],['horse',T2.horse]]});
const M2={
 fish:async(R,S)=>{await R.bg('fish');const f=R.hero('fish',{idle:'swim'});f.at(W/2-.5,f.home.y);await f.show(.3);const b=R.fx('bubble',f.st.x,1.0,10,{w:2,t:2});await f.swim(f.home.x,null,2.2);await b;R.label('Swims','#0b7285');},
 bird:L2.bird,
 rabbit:async(R,S)=>{await R.bg('rabbit');const r=R.hero('rabbit');r.at(-W/2+.4,r.home.y);await r.show(.3);await r.hop(r.home.x+.6,r.home.y,2.2,.35);R.label('Hops','#7048e8');},
 snake:L2.snake,
 duck:async(R,S)=>{await R.bg('duck');const d=R.hero('duck',{idle:'swim'});d.at(-W/2+.6,d.home.y);await d.show(.3);await d.go(d.home.x,d.home.y,1.6,{hops:4,arc:.03,wob:.08,lin:1});R.label('Waddles and paddles','#1c7ed6');R.fx('splash',d.st.x,d.st.y+.1,10,{w:.6,t:1});await d.swim(d.st.x+.8,null,1.6);}
};
page('c02',2,{old:[['fish',M2.fish],['bird',M2.bird],['rabbit',M2.rabbit],['snake',M2.snake],['duck',M2.duck]],neu:[['fish',M2.fish],['bird',M2.bird],['rabbit',M2.rabbit],['snake',M2.snake],['duck',M2.duck]]});
const walkBoy=async(R,S)=>{await R.bg('child');const b=R.act('pa-boywalk',{x:-W/2+.4,y:.3,h:1.55,face:1});await b.show(.3);await b.walk(1.4,.3,3.4);R.label('Walk on two legs','#e8590c');await b.say('Left, right!',1500);};
page('c02',3,{old:[['walk',walkBoy]],neu:[['walk',walkBoy]]});

/* ================= LESSON 3 : The Busy Pond ================= */
const L3={
 beaverSet:async(R,S)=>{if(S.b)return;await R.bg('beaver');S.b=R.hero('beaver');await S.b.show(.6,'pop');},
 build:async(R,S)=>{await L3.beaverSet(R,S);const b=S.b;S.logs=[];
   for(let i=0;i<3;i++){const lg=R.prop('wood',-1.9,.25,.3);await b.walk(-1.6,.15,.7);await b.T(.2,()=>{});const carry=b.T(1.4,()=>{lg.position.set(b.st.x+.3,b.st.y+.65,.08);});await all([b.walk(.25,.4,1.4),carry]);
     await R.toss(lg,.75+i*.18,.72+(i===1?.12:0),.5,.2);S.logs.push(lg);R.fx('splash',.8,.6,6,{w:.3,t:.7});}
   await b.walk(b.home.x,b.home.y,1.2);},
 mud:async(R,S)=>{R.fx('chip',.9,.95,14,{w:.5,t:1.2});R.fx('dust',.9,.8,8,{w:.5,t:1});await R.wait(1.2);},
 lodge:async(R,S)=>{R.label('Lodge','#e8590c');const r=R.ring(.9,.95,.5);await r.show();await r.pulse(2,1);await r.hide();},
 door:async(R,S)=>{const b=S.b;if(!b)return;await b.walk(.2,.5,1.2);R.fx('splash',.2,.6,16,{w:.6,t:1.1});await b.T(.6,e=>{b.st.op=1-e;b.st.y=.5-e*.25;});R.word('Splash!',.3,1.6,'#1c7ed6');await R.wait(.6);},
 beaver:async(R,S)=>{await L3.build(R,S);await L3.mud(R,S);await L3.lodge(R,S);},
 spider:async(R,S)=>{await R.bg('spider');const sp=R.hero('spider',{idle:'sway'});const top=H-.15;sp.at(sp.home.x,top);await sp.show(.4);
   const g=new P.THREE.Line(new P.THREE.BufferGeometry(),new P.THREE.LineBasicMaterial({color:'#ffffff'}));R.root.add(g);
   await sp.T(1.6,e=>{const y=top+(sp.home.y-top)*e;sp.st.y=y;sp.ap();g.geometry.setFromPoints([new P.THREE.Vector3(sp.home.x,top+.4,.5),new P.THREE.Vector3(sp.home.x,y+sp.h()*.8,.5)]);});R.root.remove(g);},
 web:async(R,S)=>{const TH3=P.THREE,cx=-.02,cy=1.05,web=new TH3.Group();web.position.set(cx,cy,.45);R.root.add(web);const lm=new TH3.LineBasicMaterial({color:'#ffffff',transparent:true,opacity:.95});const Rr=.95,spokes=[],rings=[];
   for(let i=0;i<10;i++){const a=i*Math.PI/5;const l=new TH3.Line(new TH3.BufferGeometry().setFromPoints([new TH3.Vector3(0,0,0),new TH3.Vector3(Math.cos(a)*Rr,Math.sin(a)*Rr,0)]),lm);l.scale.setScalar(.001);web.add(l);spokes.push(l);}
   await R.T(1.0,e=>spokes.forEach((l,i)=>l.scale.setScalar(Math.max(.001,Math.min(1,e*10-i)))));
   const pts=[];for(let i=0;i<=200;i++){const a=i/200*Math.PI*2*4,r=.12+i/200*(Rr-.15);pts.push(new TH3.Vector3(Math.cos(a)*r,Math.sin(a)*r,0));}
   const sp=new TH3.Line(new TH3.BufferGeometry().setFromPoints(pts),lm);sp.geometry.setDrawRange(0,0);web.add(sp);
   await R.T(2.2,e=>sp.geometry.setDrawRange(0,Math.floor(e*201)));R.fx('sparkle',cx,cy,12,{w:1.6,h:1.6,t:1.2});R.label('Web','#7048e8');await R.wait(.6);},
 nest:async(R,S)=>{await R.bg('robin');S.n=R.hero('robin');S.n.st.op=0;S.n.ap();const nx=S.n.home.x,ny=S.n.home.y+.45;
   for(let i=0;i<4;i++){const s=R.prop('stick',i%2?W/2-.2:-W/2+.2,1.9,.32);await R.toss(s,nx+(i-1.5)*.18,ny,.7,.4);S['st'+i]=s;}
   await S.n.show(.8,'pop');for(let i=0;i<4;i++)R.drop(S['st'+i]);R.fx('note',nx,ny+1.0,5,{t:1.3});R.label('Nest','#e8590c');},
 eggs:async(R,S)=>{if(!S.n)return;R.fx('sparkle',S.n.st.x-.15,S.n.st.y+.55,10,{w:.4,t:1.1});await R.wait(1);},
 fox:async(R,S)=>{if(!S.n)await L3.nest(R,S);const f=R.act('pa-foxup',{x:-W/2+.3,y:.02,h:1.15,face:1});await f.show(.3);await f.walk(-.6,.02,1.6);await f.jump(.2);await f.say('Too high!',1600);await f.walk(-W/2+.2,.02,1.3);await f.hide(.3);},
 rabbitSet:async(R,S)=>{if(S.r)return;await R.bg('rabbit');S.r=R.hero('rabbit');await S.r.show(.6,'pop');},
 hop:async(R,S)=>{await L3.rabbitSet(R,S);await S.r.hop(.6,.72,1.8,.3);},
 inside:async(R,S)=>{await L3.rabbitSet(R,S);const r=S.r;await r.T(.7,e=>{r.st.s=1-e*.6;r.st.y=.72+e*.12;r.st.x=.6+e*.05;r.st.op=1-e;});R.fx('dust',.62,.75,10,{w:.4,t:.9});await R.wait(.6);},
 burrow:async(R,S)=>{await R.bg('burrow',1.0);const r=R.hero('rabbit',{h:.5,x:-1.2,y:1.45,shadow:false});r.st.s=.9;await r.show(.4);
   const path=[[-1.2,1.45],[-1.05,1.0],[-.75,.75],[-.25,.72],[.25,.7]];for(let i=1;i<path.length;i++)await r.go(path[i][0],path[i][1],.55,{lin:1,hops:1,arc:.05});
   await r.hide(.5);R.label('Burrow','#7048e8');R.fx('z',.9,1.15,4,{w:.3,t:2.4,vy:.5});await R.wait(.6);},
 safe:async(R,S)=>{R.fx('heart',.85,1.05,8,{w:.8,t:1.6});await R.wait(1.2);}
};
page('c03',0,{
 old:[['beaver',L3.beaver],['spider',seq(L3.spider,L3.web)],['bird',L3.nest],['fox',L3.fox],['rabbit',seq(L3.hop,L3.inside,L3.burrow)],['safe',L3.safe]],
 neu:[['beaver',L3.build],['mud',L3.mud],['lodge',L3.lodge],['secret',L3.door],['spider',L3.spider],['web',L3.web],['bird',L3.nest],['eggs',L3.eggs],['fox',L3.fox],['rabbit',L3.hop],['inside',L3.inside],['burrow',L3.burrow],['safe',L3.safe]]});
const H3={
 toad:async(R,S)=>{await R.bg('toad');const t=R.hero('toad');t.at(1.4,.35);await t.show(.4);R.fx('sparkle',1.4,2.0,10,{w:1,t:1.2,vy:-.4});R.word('Hot!',1.4,1.7,'#e8590c');await t.hop(t.home.x,t.home.y,1.6,.25);R.label('Shady log','#2b8a3e');},
 bear:async(R,S)=>{await R.bg('bear');const d=R.hero('bear',{idle:'sleep'});await d.show(.7);R.snow(4,50);R.fx('z',-.1,1.2,4,{w:.3,t:2.4,vy:.5});R.label('Cozy den','#7048e8');await R.wait(1.2);},
 nest:async(R,S)=>{await R.bg('robin');const n=R.hero('robin');await n.show(.7,'pop');const f=R.act('pa-foxup',{x:-W/2+.3,y:.02,h:1.1,face:1});await f.show(.3);await f.walk(-.5,.02,1.4);await f.say('Too high!',1500);R.label('Eggs safe up high','#e8590c');}
};
page('c03',1,{old:[['toad',H3.toad],['bear',H3.bear],['nest',H3.nest]],neu:[['toad',H3.toad],['bear',H3.bear],['nest',H3.nest]]});
const K3={
 bee:async(R,S)=>{await R.bg('bee');const h=R.hero('bee');await h.show(.6,'pop');const bs=[0,1,2,3].map(i=>R.prop('bee',(i%2?1:-1)*1.8,1.6-i*.15,.2));
   await R.T(2.6,e=>bs.forEach((b,i)=>{if(!b)return;const a=e*Math.PI*3+i*1.6,r=(1-e)*1.4+.15;b.position.set(h.st.x+Math.cos(a)*r,h.st.y+.45+Math.sin(a*1.3)*r*.4,.08);b.scale.setScalar(Math.max(.05,1-e*.8));}));
   bs.forEach(b=>R.drop(b));R.label('Hive','#f08c00');},
 fox:async(R,S)=>{await R.bg('fox');const f=R.hero('fox');await f.show(.7,'pop');await f.jump(.12);R.label('Den','#e8590c');},
 bat:async(R,S)=>{await R.bg('bat');const b=R.hero('bat',{idle:'sway'});b.at(b.home.x+1.3,H-.9);await b.show(.3);await b.go(b.home.x,b.home.y,1.4,{waves:4,wob:.12});R.label('Roost','#495057');},
 rabbit:async(R,S)=>{await R.bg('burrow',1.0);R.fx('z',.9,1.15,4,{w:.3,t:2.4,vy:.5});R.label('Warren','#7048e8');await R.wait(1.4);}
};
page('c03',2,{old:[['bee',K3.bee],['fox',K3.fox],['bat',K3.bat],['rabbit',K3.rabbit]],neu:[['bee',K3.bee],['fox',K3.fox],['bat',K3.bat],['warren',K3.rabbit]]});
const N3={
 eagle:async(R,S)=>{await R.bg('eagle');const e=R.hero('eagle');e.st.op=0;e.ap();for(let i=0;i<3;i++){const s=R.prop('stick',(i%2?1:-1)*1.9,2.1,.36);await R.toss(s,e.home.x+(i-1)*.3,.55,.6,.4);R.drop(s);}await e.show(.8,'pop');R.label('Huge nest, very high','#e8590c');},
 swan:async(R,S)=>{await R.bg('swan');const s=R.hero('swan',{idle:'swim'});s.at(s.home.x+1.2,s.home.y);await s.show(.3);await s.swim(s.home.x,null,2);R.fx('splash',s.st.x,s.st.y+.1,8,{w:.5,t:.9});R.label('Reed nest by water','#1c7ed6');},
 robin:async(R,S)=>{await L3.nest(R,S);R.label('Cup nest in a bush','#2b8a3e');}
};
page('c03',3,{old:[['eagle',N3.eagle],['swan',N3.swan],['small',N3.robin]],neu:[['eagle',N3.eagle],['swan',N3.swan],['robin',N3.robin]]});

/* ================= LESSON 4 : Getting Ready for Winter ================= */
const L4={
 open:async(R,S)=>{await R.bg('squirrel');S.sq=R.hero('squirrel');await S.sq.show(.6,'pop');},
 leaves:async(R,S)=>{if(!S.sq)await L4.open(R,S);R.leaves(3.4,18);await R.wait(1.2);},
 gather:async(R,S)=>{if(!S.sq)await L4.open(R,S);const q=S.sq;q.face=1;await q.hop(.2,.28,1.8,.28);await q.T(.5,e=>{q.st.sy=1-Math.sin(e*Math.PI)*.1;});R.fx('sparkle',.45,.6,6,{w:.3,t:.8});await q.jump(.15);await q.say('Got one!',1100);await q.hop(-.65,.25,1.6,.28);},
 dig:async(R,S)=>{const q=S.sq;if(!q)return;await q.swap('pa-squirreldig',.4,{h:q.h()*.95,face:1,fl:1});
   for(let i=0;i<4;i++){R.fx('dust',q.st.x+.35,q.st.y+.15,6,{w:.25,t:.7,vy:.6});await q.T(.3,e=>{q.st.sy=1-Math.sin(e*Math.PI)*.06;});}},
 drop:async(R,S)=>{const q=S.sq;if(!q)return;R.fx('sparkle',q.st.x+.4,q.st.y+.3,8,{w:.3,t:.9});await R.wait(.6);},
 pat:async(R,S)=>{const q=S.sq;if(!q)return;for(let i=0;i<3;i++){await q.T(.25,e=>{q.st.sy=1-Math.sin(e*Math.PI)*.08;});R.fx('dust',q.st.x+.4,q.st.y+.12,4,{w:.2,t:.5});}},
 snack:async(R,S)=>{const q=S.sq;if(!q)return;await q.swap('h:squirrel',.4,{face:1,fl:1});await q.jump(.25);R.label('Food hidden for winter','#e8590c');await q.say('Saved for later!',1500);},
 squirrelAll:async(R,S)=>{await L4.gather(R,S);await L4.dig(R,S);await L4.drop(R,S);await L4.pat(R,S);await L4.snack(R,S);},
 wolf:async(R,S)=>{await R.bg('wolf');const hb=P.CLAY.HERO.wolf;S.w=R.act('pa-wolfthin',{h:(hb[3]-hb[2])*H*.92,x:((hb[0]+hb[1])/2-.5)*W,y:(1-hb[3])*H,face:-1});await S.w.show(.7,'pop');R.label('Summer: thin coat','#868e96');},
 brr:async(R,S)=>{if(!S.w)await L4.wolf(R,S);R.snow(4.5,60);R.word('Brrr!',-.9,1.8,'#1c7ed6');await S.w.shiver(2.4);},
 fur:async(R,S)=>{if(!S.w)await L4.wolf(R,S);const w=S.w;R.fx('fluff',w.st.x,w.st.y+.8,20,{w:1.4,h:.8,t:1.3,sz:1.3});R.fx('sparkle',w.st.x,w.st.y+.9,10,{w:1.4,h:.8,t:1.2});
   await w.swap('h:wolf',1.0,{face:-1});await w.grow(1.04,1.04,.5);R.label('Winter: thick, warm fur','#e8590c');await w.say('Cozy!',1300);},
 wolfAll:async(R,S)=>{await L4.wolf(R,S);await L4.brr(R,S);await L4.fur(R,S);},
 bear:async(R,S)=>{await R.bg('bear');S.den=R.hero('bear',{idle:'none',shadow:false});await S.den.show(.6);S.dk=R.dark(-.4,.9,1.2,.55,1);
   S.be=R.act('pa-beareat',{x:1.35,y:.05,h:1.35,face:-1});await S.be.show(.6,'pop');const ch=S.be.chew(7,2.4);R.fx('crumb',1.2,1.15,12,{w:.2,t:1.2});R.fx('heart',1.3,1.5,4,{w:.4,t:1.4});await ch;R.label('Eats and eats','#e8590c');},
 walkIn:async(R,S)=>{if(!S.be)await L4.bear(R,S);R.snow(6,70);const b=S.be;await b.swap('pa-bearwalk',.6,{h:1.0,face:1,fl:-1});await b.walk(.45,.25,2.6);
   await b.T(1.2,e=>{b.st.s=1-e*.5;b.st.x=.45-e*.75;b.st.y=.25+e*.45;b.st.op=1-e;});},
 sleep:async(R,S)=>{if(!S.dk)await L4.bear(R,S);await S.dk.fadeTo(0,1.6);S.den.idle='sleep';R.fx('z',-.1,1.15,4,{w:.3,t:2.4,vy:.5});await R.wait(1.2);},
 hibernate:async(R,S)=>{R.label('Hibernates until spring','#7048e8');R.fx('z',-.1,1.15,4,{w:.3,t:2.4,vy:.5});await R.wait(1.4);},
 bearAll:async(R,S)=>{await L4.bear(R,S);await L4.walkIn(R,S);await L4.sleep(R,S);await L4.hibernate(R,S);},
 pond:async(R,S)=>{await R.bg('fish');S.f=R.hero('fish',{idle:'none'});S.f.at(W/2-.6,1.5);await S.f.show(.3);await S.f.go(-1.0,1.45,1.0,{lin:1,wob:.05,waves:6});R.fx('snow',0,H-.05,24,{w:W,vy:-.2,t:2,spread:.6});},
 deep:async(R,S)=>{if(!S.f)await L4.pond(R,S);const f=S.f;R.label('Deep and slow','#1c7ed6');await f.go(f.home.x,f.home.y-.05,4.2,{wob:.012,waves:2});R.fx('bubble',f.st.x-.4,f.st.y+.8,4,{w:.1,t:3,vy:.3});await f.say('So... sleepy...',1700);},
 fishAll:async(R,S)=>{await L4.pond(R,S);await L4.deep(R,S);},
 ptar:async(R,S)=>{await R.bg('ptarmigan');const hb=P.CLAY.HERO.ptarmigan;S.p=R.act('pa-ptarbrown',{h:(hb[3]-hb[2])*H,x:((hb[0]+hb[1])/2-.5)*W,y:(1-hb[3])*H,face:1});await S.p.show(.7,'pop');R.label('Summer: brown feathers','#a0703c');await S.p.walk(S.p.st.x-.35,null,1.2);await S.p.walk(S.p.home.x,null,1.0);},
 white:async(R,S)=>{if(!S.p)await L4.ptar(R,S);R.snow(4,50);R.fx('sparkle',S.p.st.x,S.p.st.y+.8,12,{w:1,h:.9,t:1.3});await S.p.swap('h:ptarmigan',1.3,{});R.label('Winter: white as snow','#1c7ed6');},
 feet:async(R,S)=>{if(!S.p)await L4.ptar(R,S);const p=S.p;const r=R.ring(p.st.x,p.st.y+.12,.3);await r.show();R.fx('fluff',p.st.x,p.st.y+.1,12,{w:.4,h:.1,t:1.2,sz:1.2});await r.pulse(2,1.2);await r.hide();R.label('Feathery feet: snowshoes!','#7048e8');await p.walk(p.st.x-.6,null,1.4);},
 ptarAll:async(R,S)=>{await L4.ptar(R,S);await L4.white(R,S);await L4.feet(R,S);}
};
page('c04',0,{open:L4.open,
 old:[['forest',L4.leaves],['squirrel',L4.squirrelAll],['wolf',L4.wolfAll],['bear',L4.bearAll],['fish',L4.fishAll],['ptarmigan',L4.ptarAll]],
 neu:[['leaves',L4.leaves],['gathers',L4.gather],['digs',L4.dig],['drops',L4.drop],['pats',L4.pat],['snack',L4.snack],['wolf',L4.wolf],['brrr',L4.brr],['thick',L4.fur],
  ['bear',L4.bear],['snow',L4.walkIn],['curls',L4.sleep],['hibernate',L4.hibernate],['pond',L4.pond],['deep',L4.deep],['ptarmigan',L4.ptar],['white',L4.white],['snowshoes',L4.feet]]});
const T4={
 sleep:async(R,S)=>{if(S.den)return;await R.bg('bear');S.den=R.hero('bear',{idle:'sleep',shadow:false});await S.den.show(.8);R.snow(4,40);R.fx('z',-.1,1.15,4,{w:.3,t:2.4,vy:.5});R.label('Hibernate: sleep all winter','#7048e8');await R.wait(.6);},
 energy:async(R,S)=>{await T4.sleep(R,S);S.hb=R.heart(1.45,1.55,.5);await S.hb.show();S.hb.rate=2.2;await R.wait(1.2);},
 slow:async(R,S)=>{await T4.energy(R,S);R.label('Heart beats slowly','#c92a2a');await S.hb.slow(.45,2.6);R.fx('z',-.1,1.15,3,{w:.3,t:2.4,vy:.5});await R.wait(.8);},
 frogs:async(R,S)=>{await R.bg('frog');const f=R.act('pa-frogmud',{x:0,y:.4,h:.55,face:-1,idle:'sleep'});await f.show(.7,'pop');R.fx('z',.25,.95,3,{w:.2,t:2.2,vy:.4});R.label('Frogs sleep in mud','#2b8a3e');await R.wait(1);},
 turtles:async(R,S)=>{await R.bg('fish');const t=R.act('pa-turtlesleep',{x:.1,y:.25,h:.6,face:-1,idle:'sleep'});await t.show(.7,'pop');R.fx('bubble',0,.9,6,{w:.2,t:2.4,vy:.3});R.label('Turtles rest at the bottom','#0b7285');await R.wait(1);}
};
page('c04',1,{old:[['winter',T4.sleep],['energy',T4.energy],['heartbeat',T4.slow],['frogs',T4.frogs],['turtles',T4.turtles]],
 neu:[['hibernate',T4.sleep],['heart',T4.energy],['slowly',T4.slow,2],['frogs',T4.frogs],['turtles',T4.turtles]]});
page('c04',2,{old:[['wolves',seq(L4.wolf,L4.brr,L4.fur)],['ptarmigan',seq(L4.ptar,L4.white,L4.feet)]],neu:[['wolves',seq(L4.wolf,L4.brr,L4.fur)],['ptarmigan',seq(L4.ptar,L4.white)],['sinking',L4.feet]]});
page('c04',3,{old:[['squirrels',async(R,S)=>{await L4.open(R,S);await L4.squirrelAll(R,S);}],['bears',async(R,S)=>{await R.bg('bear');const d=R.hero('bear',{idle:'sleep',shadow:false});await d.show(.8);R.fx('z',-.1,1.15,4,{w:.3,t:2.4,vy:.5});R.label('Bears hibernate','#7048e8');await R.wait(1);}]]});

/* ================= LESSON 5 : The Long Trip South ================= */
const ONT=[.55,1.38],MEX=[.14,.55];
const L5={
 open:async(R,S)=>{await R.bg('butterfly');S.b=R.hero('butterfly',{idle:'flutter'});await S.b.show(.6,'pop');},
 trip:async(R,S)=>{if(!S.b)await L5.open(R,S);R.label('Monarch butterfly','#e8590c');await S.b.go(W/2-.3,H-.3,2.2,{arc:.3,waves:4,wob:.08,flap:10});await S.b.hide(.3);},
 map:async(R,S)=>{await R.bg('map',1.0);const tr=R.trail([ONT,[.7,1.0],[.45,.75],MEX],3.4,'#ffffff');S.tr=tr;const m=R.hero('butterfly',{h:.32,x:ONT[0],y:ONT[1],idle:'flutter',shadow:false});await m.show(.4,'pop');
   R.label('Ontario to Mexico','#e8590c');const n=tr.dots.length;const run=R.T(3.4,e=>{const p=tr.at(e);m.st.x=p[0];m.st.y=p[1]-.1;});await all([tr.draw(),run]);R.fx('sparkle',MEX[0],MEX[1]+.1,14,{w:.4,t:1.2});await m.jump(.2);},
 caribou:async(R,S)=>{await R.bg('caribou');const c=R.hero('caribou');const hx=c.home.x;c.at(W/2-.6,c.home.y);c.face=1;await c.show(.3);
   const herd=[0,1].map(i=>{const h=R.hero('caribou',{h:c.h()*.7,x:W/2-.2+i*.5,y:c.home.y+.25,shadow:false});h.face=1;h.st.op=.0;return h;});herd.forEach(h=>h.show(.4));
   await all([c.walk(hx,null,3.2)].concat(herd.map((h,i)=>h.walk(hx+.9+i*.6,null,3.2))));R.label('A huge herd','#a0703c');},
 whale:async(R,S)=>{await R.bg('whale');const w=R.act('pa-whalecalf',{x:-W/2+.7,y:.48,h:1.0,face:1,idle:'swim'});await w.show(.3);R.fx('drop',w.st.x+.3,1.5,12,{w:.1,t:1.2,vy:2});await w.swim(.3,null,3);R.fx('heart',.3,1.4,8,{w:.8,t:1.5});R.label('Warm water for babies','#1c7ed6');},
 salmon:async(R,S)=>{await R.bg('salmon');S.s=R.hero('salmon',{idle:'swim'});await S.s.show(.6,'pop');},
 ocean:async(R,S)=>{if(!S.s)await L5.salmon(R,S);const s=S.s;s.face=-1;await s.swim(-W/2+.5,null,1.8);await s.hide(.3);R.word('Years later...',0,1.8,'#0b7285',1.2);await R.wait(1.2);},
 leap:async(R,S)=>{if(!S.s)await L5.salmon(R,S);const s=S.s;s.at(-W/2+.6,.35);await s.show(.3);
   for(let i=0;i<3;i++){await s.go(s.st.x+.75,.4+i*.3,.8,{arc:.7,wob:.15,waves:1,lin:1});R.fx('splash',s.st.x,s.st.y+.1,12,{w:.4,t:.9});}R.label('Back home to lay eggs','#c2255c');},
 migrate:async(R,S)=>{await R.bg('map',1.0);const tr=R.trail([ONT,[.7,1.0],[.45,.75],MEX],1.6,'#ffd43b');await tr.draw();R.label('Migration','#e8590c');R.fx('sparkle',.4,1,16,{w:1.4,h:1,t:1.4});await R.wait(1);}
};
page('c05',0,{open:L5.open,
 old:[['monarch',L5.trip],['mexico',L5.map],['caribou',L5.caribou],['whales',L5.whale],['salmon',seq(L5.salmon,L5.ocean,L5.leap)],['migrate',L5.migrate]],
 neu:[['trip',L5.trip],['mexico',L5.map],['caribou',L5.caribou],['whales',L5.whale],['salmon',L5.salmon],['ocean',L5.ocean],['leap',L5.leap],['migration',L5.migrate]]});
const W5={
 geese:async(R,S)=>{await R.bg('goose');const g=R.hero('goose',{shadow:false});const hx=g.home.x,hy=g.home.y;g.at(-W/2+.6,hy+.2);g.face=1;await g.show(.3);
   const v=[1,2,3,4].map(i=>{const m=R.hero('goose',{h:g.h()*.6,shadow:false});m.face=1;return m;});const run=g.go(hx+.6,hy,3,{flap:12,arc:.15});
   await all([run,R.T(3,()=>v.forEach((m,i)=>{const r=Math.ceil((i+1)/2),sd=i%2?1:-1;m.st.op=Math.min(1,m.st.op+.05);m.st.x=g.st.x-r*.55;m.st.y=g.st.y+sd*r*.22+.1;m.ap();}))]);R.label('By air: a V of geese','#1c7ed6');},
 humm:async(R,S)=>{await R.bg('hummingbird');const h=R.hero('hummingbird',{idle:'flutter',shadow:false});h.at(-W/2+.5,h.home.y+.3);await h.show(.3);await h.fly(W/2-.5,h.home.y+.5,1.4);await h.fly(h.home.x,h.home.y,1.0);R.label('By air: zip!','#2b8a3e');},
 caribou:L5.caribou,
 garter:async(R,S)=>{await R.bg('garter');const g=R.hero('garter');g.at(-W/2+1,g.home.y);await g.show(.3);await g.slither(g.home.x,null,2.4);R.label('By land','#a0703c');},
 whales:async(R,S)=>{await L5.whale(R,S);R.label('By water','#1c7ed6');},
 turtles:async(R,S)=>{await R.bg('turtle');const t=R.hero('turtle',{idle:'swim'});t.at(W/2-.7,t.home.y);await t.show(.3);await t.swim(t.home.x,null,2.4);R.fx('bubble',t.st.x,t.st.y+.6,8,{w:.4,t:1.2});R.label('By water: sea turtle','#0b7285');}
};
page('c05',2,{old:[['geese',W5.geese],['hummingbirds',W5.humm],['caribou',W5.caribou],['garter',W5.garter],['whales',W5.whales],['turtles',W5.turtles]],
 neu:[['geese',W5.geese],['hummingbirds',W5.humm],['caribou',W5.caribou],['garter',W5.garter],['whales',W5.whales],['turtles',W5.turtles]]});

/* ---------- the new narration (switches on by itself once its voice files exist) ---------- */
P.DIR_NEW={
 c01:{story:"Ms. Ade's class started an *Animal Club*, and every student brought an animal to share. Raj went first. He showed a tiny *tadpole*, swimming in a pond. The tadpole grew legs, hopped out of the water, and became a *frog*! It lives in water when young and on land when grown, so it is an *amphibian*. Mei went next. Her *snake* slid out from behind a rock. Its skin is covered in dry, bumpy *scales*. That makes it a *reptile*. Liam's *parrot* spread its wings and flew to a branch. Its body is covered in bright *feathers*, so it is a *bird*. Last came Zara, with a giant *whale*. \"A fish!\" said Raj. \"No!\" laughed Zara. \"Whales breathe air, and baby whales drink their mother's milk. Whales are *mammals*!\"",
  steps:{1:"Scientists sort animals into groups by looking closely at their bodies. A dog has soft fur, so it is a mammal. An owl has feathers, so it is a bird. A fish has fins and gills, and lives in the water. A turtle has dry, scaly skin, so it is a reptile. And a frog starts life in the water, so it is an amphibian.",
   2:"Mammals have fur or hair. A cow has a soft, hairy coat. Mammal babies are born alive, and they drink their mother's milk. Look! This little calf is drinking milk right now. A whale and a monkey are mammals too."}},
 c02:{story:"At lunchtime, the *zookeeper* came by with a big bucket of food. She tossed a piece of meat to the *lion*. The lion tore it apart with its sharp, pointy teeth. Next, she gave hay to the *horse*. The horse munched and munched with its wide, flat teeth. The *elephant* curled its long *trunk* around a bundle of hay and lifted it up to its mouth. Down in the pond, a fly buzzed past a *frog*. Zap! Its sticky tongue caught the fly. After lunch, everyone moved. The duck waddled, the snake slithered, and the bird flew up to a branch.",
  steps:{1:"Teeth tell us what an animal eats. A beaver has strong front teeth that chew right through wood. A shark has rows and rows of sharp teeth to catch fish. A horse has flat teeth to grind up grass.",
   2:"Animals move in many ways. A fish swims with its fins and tail. A bird flaps its wings and flies. A rabbit hops on its strong back legs. A snake has no legs at all, so it slithers. And a duck waddles on land and paddles in the water.",
   3:"And how do you move? Two feet, two shoes, a pair of socks. People walk on two legs. Left, right, left, right!"}},
 c03:{story:"At the pond, everyone is busy building a home. A *beaver* drags sticks into the water and piles them up, with mud to hold them together. Soon it has a cozy *lodge*, with a secret door under the water. Between the reeds, a *spider* spins a sticky *web*, round and round. Up in a tree, a mother *bird* weaves twigs into a *nest* and lays her eggs. Down below, a sneaky fox looks up, but the nest is too high to reach! In the meadow, a *rabbit* hops to a hole in the ground and pops inside. Down in its cool, dark *burrow*, the whole rabbit family is curled up, safe and sound. Every home keeps its animals safe.",
  steps:{1:"Homes protect animals. On a hot, sunny day, a toad hides in the cool shade under a log. In the freezing winter, a bear sleeps warm and cozy in its den. And high up in a tree, a nest keeps the eggs safe from hungry animals.",
   2:"A bee lives in a hive with thousands of other bees. A fox lives in a den, dug under a tree. A bat hangs upside down in a roost. And a rabbit lives in a warren: a maze of tunnels under the ground.",
   3:"Birds build different nests. An eagle builds a huge nest of big sticks at the very top of a tall tree. A swan builds a nest of reeds right beside the water. And a small bird, like a robin, builds a little cup-shaped nest in a bush."}},
 c04:{story:"In the fall, the leaves turn orange and red, and the forest gets busy. Winter is coming! A *squirrel* gathers acorns, one by one. Then it digs a little hole, drops in an acorn, and pats the dirt down. Now it has a snack hidden for winter! A *wolf* has a thin coat all summer. Brrr! The air is getting colder. So the wolf grows a thick, warm coat of *fur*. A *bear* eats and eats: berries, fish and nuts. When the snow falls, the bear walks into its den, curls up, and falls asleep. It will *hibernate* until spring. In the pond, the water turns icy cold. The *fish* swim down deep and move very, very slowly. And the *ptarmigan*? Its brown feathers turn white as snow, and it grows fluffy feathers on its feet, like built-in snowshoes!",
  steps:{1:"Some animals hibernate. That means they sleep through the whole winter. A sleeping bear breathes slowly, and its heart beats slowly too, so it uses very little energy. Frogs dig into the mud and sleep, and turtles rest at the bottom of the pond.",
   2:"Other animals stay awake all winter, and grow warmer coats. In the fall, wolves grow thicker fur. The ptarmigan grows feathers on its feet, so it can walk on top of the snow without sinking."}},
 c05:{story:"Every fall, *monarch butterflies* in Ontario flap their orange wings and begin a very long trip. They fly south for weeks and weeks, all the way to *Mexico*! Up in the cold north, *caribou* walk together in a huge herd, looking for food. *Grey whales* swim from the icy north to warm water, where they have their babies. *Salmon* swim from their river out to the ocean. Years later, they leap back up the waterfalls to lay their eggs. Travelling far away and back again each year is called *migration*. Animals *migrate* to find food, warm weather, or a safe place for their babies.",
  steps:{2:"Some animals migrate by air. Geese fly south in a V shape, and tiny hummingbirds zip along. Some go by land, like caribou and garter snakes. And some travel by water, like grey whales and sea turtles."}}};
const plain=t=>String(t).replace(/\*/g,'').replace(/\s+/g,' ').trim();
const has=t=>!!(window.VOICE&&P.vhash&&window.VOICE[P.vhash(t)]);
P.DIR.voiced=(id,i)=>{const n=P.DIR_NEW[id];if(!n)return false;if(i===0)return !!n._on;return !!(n._st&&n._st[i]);};
/* swap the lesson's words for the new narration, page by page, only where the new voice is ready */
P.DIR.applyNarration=function(d){const n=P.DIR_NEW[d.id];if(!n)return;n._st={};
  if(n.story&&d.page&&d.page.story){const ti=String(d.page.story.title).trim();const sp=ti+(/[.!?]$/.test(ti)?' ':'. ')+plain(n.story);if(has(sp)){d.page.story.text=n.story;n._on=true;}}
  Object.keys(n.steps||{}).forEach(i=>{const t=n.steps[i];if(d.steps&&d.steps[+i]&&has(t)){d.steps[+i].speech=t;n._st[+i]=true;}});};
P.DIR.mount();
})();
