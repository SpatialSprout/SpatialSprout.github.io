/* Theory (right-hand) pages for lessons 6, 7, 8 and 10-15: each page is a short clay film that follows the narration,
   built from the clay prop set and the story backdrops. (Lesson 9 has its own director in story-camouflage.js.)
   Page 1..3 = the three theory steps of the lesson. */
(function(){
"use strict";
const P=window.PM;if(!P||!P.DIR)return;
const page=P.DIR.page,W=P.PIC.W,H=P.PIC.H;
const all=ps=>Promise.all(ps);
const seq=(...fs)=>(R,S)=>fs.reduce((p,f)=>p.then(()=>R.alive()?f(R,S):null),Promise.resolve());
/* a clay prop that pops in; returns the prop (or null) */
const pop=async(R,name,x,y,s)=>{const p=R.prop(name,x,y,s);if(!p)return null;const s0=p.scale.x;p.scale.setScalar(.01);
  await R.T(.45,e=>{p.scale.setScalar(s0*(.2+.8*Math.min(1,e*1.1)+Math.sin(e*Math.PI)*.18));});p.scale.setScalar(s0);p.userData.s0=s0;return p;};
const hop=(R,p,dy,sec)=>{if(!p)return R.wait(sec||.5);const y0=p.position.y;return R.T(sec||.55,e=>{p.position.y=y0+Math.sin(e*Math.PI)*(dy||.2);});};
const wiggle=(R,p,amp,sec)=>{if(!p)return R.wait(sec||.6);return R.T(sec||.7,e=>{p.rotation.z=Math.sin(e*Math.PI*6)*(amp||.1)*(1-e);}).then(()=>{p.rotation.z=0;});};
const slide=(R,p,x,y,sec)=>{if(!p)return R.wait(sec||1);const x0=p.position.x,y0=p.position.y;return R.T(sec||1,e=>{const k=e*e*(3-2*e);p.position.x=x0+(x-x0)*k;p.position.y=y0+(y-y0)*k;});};
const bobber=(R,p,amp,sp)=>{if(!p)return;let on=true,ph=Math.random()*6,y0=p.position.y;R.actors.push({kill:()=>{on=false;},tick:dt=>{if(!on)return;ph+=dt*(sp||2.2);p.position.y=y0+Math.sin(ph)*(amp||.03);p.rotation.z=Math.sin(ph*.8)*.05;}});};
const bye=(R,list)=>all(list.filter(Boolean).map(p=>R.shrink(p,.5))).then(()=>list.forEach(p=>p&&R.drop(p)));
const heartsAt=(R,x,y)=>R.fx('heart',x,y,8,{w:.8,t:1.5});

/* ================= LESSON 6 : Animal babies ================= */
/* page 1: special names */
const N6=(adult,baby,word,col,x,y,sa,sb,lab)=>async(R,S)=>{const a=await pop(R,adult,x,y,sa);const b=await pop(R,baby,x+.62,y,sb);
  R.word(word,x+.3,y+1.35,col,1.15);R.label(lab,col);await all([hop(R,b,.22,.6),wiggle(R,a,.05,.6)]);heartsAt(R,x+.3,y+1.0);};
page('c06',1,{old:[
 ['puppy',async(R,S)=>{await R.bg('dog');await N6('dog','dog','Puppy','#c2255c',-1.35,.2,.85,.5,'Puppy')(R,S);}],
 ['cygnet',N6('swan','swan','Cygnet','#1c7ed6',-.45,.45,.85,.5,'Cygnet')],
 ['fawn',N6('deer','deer','Fawn','#a0703c',.45,.2,.85,.5,'Fawn')],
 ['joey',N6('kangaroo','kangaroo','Joey','#e8590c',1.3,.15,.85,.45,'Joey')]]});
/* page 2: cubs and calves */
const trio=async(R,names,x0,sc)=>{const out=[];for(let i=0;i<names.length;i++){const a=await pop(R,names[i],x0+i*.95,.2,sc);const b=await pop(R,names[i],x0+i*.95+.5,.2,sc*.5);out.push(a,b);hop(R,b,.2,.5);}return out;};
page('c06',2,{old:[
 ['cubs',async(R,S)=>{await R.bg('bear');R.label('Cub','#e8590c');S.c=await trio(R,['bear','lion','wolf'],-1.45,.62);R.word('Cubs!',.2,2.0,'#e8590c',1.3);R.fx('heart',.2,1.5,10,{w:1.6,t:1.6});}],
 ['calves',async(R,S)=>{await bye(R,S.c||[]);await R.bg('cow');R.label('Calf','#8b5a2b');S.k=await trio(R,['cow','whale','camel'],-1.45,.62);R.word('Calves!',.2,2.0,'#8b5a2b',1.3);R.fx('heart',.2,1.5,10,{w:1.6,t:1.6});}]]});
/* page 3: how parents care */
page('c06',3,{old:[
 ['kangaroo',async(R,S)=>{await R.bg('lion');R.label('A pouch','#e8590c');const k=await pop(R,'kangaroo',-.9,.2,.95);const j=await pop(R,'kangaroo',-.9,.55,.3);S.j=j;await hop(R,k,.28,.7);if(j)j.position.y=.55;await hop(R,k,.28,.7);R.fx('heart',-.9,1.6,8,{w:.5,t:1.5});S.k=k;}],
 ['penguin',async(R,S)=>{R.label('Both parents feed','#1c7ed6');const a=await pop(R,'penguin',.2,.18,.75);const b=await pop(R,'penguin',1.0,.18,.75);const c=await pop(R,'chick',.6,.15,.38);
   for(let i=0;i<2;i++){await hop(R,c,.15,.4);R.fx('crumb',i?.9:.3,.9,6,{w:.2,t:1,vy:-.6});await R.wait(.2);}heartsAt(R,.6,1.1);}],
 ['turtles',async(R,S)=>{R.label('On its own','#2b8a3e');const t=await pop(R,'turtle',1.7,.1,.4);R.word('On its own!',.5,2.0,'#2b8a3e',1.5);await slide(R,t,-.2,.1,2.8);R.fx('dust',-.2,.12,8,{w:.4,t:1});}]]});

/* ================= LESSON 7 : Growing and changing ================= */
page('c07',1,{old:[
 ['egg',async(R,S)=>{await R.bg('cow');R.label('Egg','#c2a24d');S.e=await pop(R,'egg',-1.2,.15,.5);await wiggle(R,S.e,.1,.8);}],
 ['hatches',async(R,S)=>{R.label('Chick','#e0a800');R.fx('sparkle',-.35,.5,14,{w:.5,t:1.2});S.c=await pop(R,'chick',-.4,.15,.55);R.drop(S.e);await hop(R,S.c,.3,.6);}],
 ['hen',async(R,S)=>{R.label('Hen','#c2255c');S.h=await pop(R,'chicken',.6,.15,.95);R.fx('sparkle',.6,.9,10,{w:.8,t:1.2});}],
 ['line',async(R,S)=>{await all([slide(R,S.e,-1.4,.15,.01),0]);const e=await pop(R,'egg',-1.4,.15,.5);await slide(R,S.c,-.4,.15,.3);await hop(R,e,.2,.5);await hop(R,S.c,.2,.5);await hop(R,S.h,.2,.5);R.fx('heart',0,1.4,10,{w:1.8,t:1.6});}]]});
page('c07',2,{old:[
 ['beluga',async(R,S)=>{await R.bg('whale');R.label('Beluga whale','#1c7ed6');S.w=R.hero('whale',{idle:'swim',h:1.6});await S.w.show(.6,'pop');S.w.mesh().material.color.set('#e0a27c');S.w.st.s=.55;S.w.ap();}],
 ['newborn',async(R,S)=>{R.label('Newborn','#a0522d');await S.w.scaleTo(.55,.2);await S.w.swim(S.w.st.x+.4,null,1.4);}],
 ['young',async(R,S)=>{R.label('Young','#1c7ed6');await all([S.w.tint('#e0a27c','#9fb7d1',1.4),S.w.scaleTo(.8,1.4)]);}],
 ['adult',async(R,S)=>{R.label('Adult','#868e96');await all([S.w.tint('#9fb7d1','#ffffff',1.4),S.w.scaleTo(1,1.4)]);R.fx('sparkle',S.w.st.x,1.2,12,{w:1.2,t:1.4});}]]});
page('c07',3,{old:[
 ['pink',async(R,S)=>{await R.bg('child');R.label('Baby mouse','#c2255c');S.m=await pop(R,'mouse',-.5,.2,.5);const p=S.m;if(p&&p.traverse)p.traverse(o=>{if(o.material&&o.material.color)o.material.color.set('#ffb3c1');});await wiggle(R,S.m,.05,.8);}],
 ['fur',async(R,S)=>{R.label('Fur grows','#8b5a2b');const m=S.m;if(m&&m.traverse)m.traverse(o=>{if(o.material&&o.material.color)o.material.color.set('#ffffff');});R.fx('fluff',-.5,.5,14,{w:.5,t:1.3});await R.T(1,e=>{if(m)m.scale.setScalar((m.userData.s0||.5)*(1+e*.5));});}],
 ['closed',async(R,S)=>{R.fx('z',-.45,.8,5,{w:.3,t:1.6});await R.wait(1);}],
 ['open',async(R,S)=>{const r=R.ring(-.4,.55,.22);await r.show();R.fx('sparkle',-.4,.55,10,{w:.3,t:1});await r.pulse(2,1);await r.hide();}],
 ['who',async(R,S)=>{R.word('Who am I?',.6,1.9,'#7048e8',1.4);await R.wait(.3);}],
 ['mouse',async(R,S)=>{R.word('A baby mouse!',.4,1.9,'#c2255c',1.5);R.fx('heart',-.5,1.2,10,{w:.8,t:1.5});await hop(R,S.m,.25,.6);}]]});

/* ================= LESSON 8 : Life cycles ================= */
page('c08',1,{old:[
 ['egg',async(R,S)=>{await R.bg('frog');R.label('Egg','#2b8a3e');S.e=[];for(let i=0;i<5;i++){S.e.push(await pop(R,'bubbles',-1.3+i*.28,.12+(i%2)*.1,.26));}R.fx('bubble',-.9,.3,6,{w:.6,t:1.4});}],
 ['tadpole',async(R,S)=>{R.label('Tadpole','#0b7285');await bye(R,S.e);S.t=await pop(R,'tadpole',-.5,.35,.5);bobber(R,S.t,.04,3);await slide(R,S.t,.2,.4,1.6);}],
 ['legs',async(R,S)=>{R.label('Legs grow','#2b8a3e');R.fx('sparkle',.2,.5,12,{w:.4,t:1.2});await wiggle(R,S.t,.12,.9);R.drop(S.t);S.f=R.hero('frog',{h:.8});S.f.st.x=.4;S.f.ap();await S.f.show(.6,'pop');}],
 ['adult',async(R,S)=>{R.label('Adult frog','#2b8a3e');await S.f.jump(.4);R.word('Ribbit!',.4,1.9,'#2b8a3e',1.3);R.fx('splash',.4,.4,12,{w:.6,t:1});}]]});
page('c08',2,{old:[
 ['egg',async(R,S)=>{await R.bg('frog');R.label('Egg','#c2a24d');S.e=await pop(R,'egg',-1.2,.12,.35);}],
 ['larva',async(R,S)=>{R.label('Larva underwater','#1c7ed6');await R.wait(.2);R.drop(S.e);S.l=await pop(R,'tadpole',-.3,.3,.5);bobber(R,S.l,.04,2.6);R.fx('bubble',-.3,.4,10,{w:.5,t:2});}],
 ['climbs',async(R,S)=>{R.label('Climbs up','#2b8a3e');await slide(R,S.l,.8,1.3,1.8);}],
 ['flying',async(R,S)=>{R.label('Dragonfly','#7048e8');R.drop(S.l);const d=await pop(R,'dragonfly',.8,1.3,.55);R.fx('sparkle',.8,1.3,12,{w:.5,t:1.2});bobber(R,d,.06,4);await slide(R,d,-.3,1.8,2);await slide(R,d,1.4,1.5,2);}]]});
page('c08',3,{old:[
 ['butterflies',async(R,S)=>{await R.bg('butterfly');R.label('Complete change','#e8590c');S.b=R.hero('butterfly',{h:.9});await S.b.show(.6,'pop');S.f=await pop(R,'frog',1.5,.1,.5);hop(R,S.f,.3,.7);}],
 ['babies',async(R,S)=>{S.c=R.act('pa-caterbite',{x:-1.1,y:.1,h:.5,face:1});await S.c.show(.4);await S.c.chew(6,1.6);R.word('Not alike!',.5,2.0,'#e03131',1.4);}],
 ['metamorphosis',async(R,S)=>{R.label('Metamorphosis','#7048e8');R.fx('sparkle',0,1.2,24,{w:2.2,t:1.8});await S.b.jump(.25);}]]});

/* ================= LESSON 10 : Liquids and solids ================= */
page('c10',1,{old:[
 ['block',async(R,S)=>{await R.bg('store');R.label('A solid','#e8590c');S.b=await pop(R,'block',-.3,.35,.7);await wiggle(R,S.b,.06,.6);}],
 ['bowl',async(R,S)=>{S.bw=await pop(R,'bowl',.9,.3,.75);await slide(R,S.b,.9,.55,1.2);R.word('Same shape',.9,1.9,'#e8590c',1.3);}],
 ['plate',async(R,S)=>{S.pl=await pop(R,'plate',1.7,.3,.75);await slide(R,S.b,1.7,.5,1.3);await hop(R,S.b,.15,.4);}]]});
page('c10',2,{old:[
 ['water',async(R,S)=>{await R.bg('store');R.label('Water: a liquid','#1c7ed6');S.g=await pop(R,'glass',-.6,.25,.9);R.fx('drop',-.9,1.9,12,{w:.2,t:1.4,vy:-1.4});}],
 ['tall',async(R,S)=>{R.word('Tall!',-.6,1.95,'#1c7ed6',1.2);await hop(R,S.g,.12,.5);}],
 ['flat',async(R,S)=>{S.d=await pop(R,'plate',1.0,.28,1.0);R.fx('splash',1.0,.4,12,{w:.7,t:1.2});R.word('Flat!',1.0,1.0,'#1c7ed6',1.2);}],
 ['shape',async(R,S)=>{R.label('Takes the shape of its container','#2b8a3e');R.fx('sparkle',.2,1.0,14,{w:2.2,t:1.4});await R.wait(.4);}]]});
page('c10',3,{old:[
 ['pour',async(R,S)=>{await R.bg('store');R.label('Liquid','#1c7ed6');S.j=await pop(R,'juice',-1.2,.6,.75);S.c=await pop(R,'cup',-.2,.2,.65);await R.T(.5,e=>S.j.rotation.z=-.7*e);R.fx('drop',-.6,.9,14,{w:.15,t:1.3,vy:-1.6});await R.wait(.6);}],
 ['sip',async(R,S)=>{await R.T(.4,e=>S.j.rotation.z=-.7*(1-e));await hop(R,S.c,.3,.6);}],
 ['swish',async(R,S)=>{await wiggle(R,S.c,.15,.8);}],
 ['drip',async(R,S)=>{R.fx('drop',-.2,1.0,8,{w:.1,t:1.2,vy:-1.6});await R.wait(.8);}],
 ['knock',async(R,S)=>{R.label('Solid','#e8590c');await bye(R,[S.j,S.c]);S.b=await pop(R,'block',.6,.3,.7);R.word('Knock!',.6,1.7,'#e8590c',1.1);await wiggle(R,S.b,.08,.5);}],
 ['hold',async(R,S)=>{await hop(R,S.b,.3,.7);}],
 ['turn',async(R,S)=>{await R.T(.9,e=>S.b.rotation.z=e*Math.PI*2);S.b.rotation.z=0;}],
 ['fold',async(R,S)=>{R.word('Still a solid!',.6,1.9,'#e8590c',1.4);await wiggle(R,S.b,.05,.5);}]]});

/* ================= LESSON 11 : Dissolving and absorbing ================= */
page('c11',1,{old:[
 ['sugar',async(R,S)=>{await R.bg('magic');R.label('Sugar','#e8590c');S.g=await pop(R,'glass',-.4,.1,1.0);R.fx('crumb',-.4,1.2,12,{w:.2,t:1.4,vy:-1});await R.wait(.5);R.fx('sparkle',-.4,.6,12,{w:.3,t:1.2});R.word('Gone!',.7,1.9,'#1c7ed6',1.2);}],
 ['salt',async(R,S)=>{R.label('Salt','#868e96');const s=await pop(R,'salt',1.2,.25,.55);await R.toss(s,-.4,1.2,.8,.5);R.fx('crumb',-.4,1.2,10,{w:.2,t:1.2,vy:-1});await R.shrink(s,.4);R.fx('sparkle',-.4,.6,10,{w:.3,t:1.1});}],
 ['powder',async(R,S)=>{R.label('Drink powder','#c2255c');const j=await pop(R,'juice',1.3,.3,.55);await R.toss(j,-.4,1.3,.8,.5);R.fx('crumb',-.4,1.2,10,{w:.2,t:1.2,vy:-1});await R.shrink(j,.4);R.fx('sparkle',-.4,.6,10,{w:.3,t:1.1});}],
 ['disappear',async(R,S)=>{R.word('Dissolved!',.8,1.9,'#1c7ed6',1.5);await R.wait(.4);}],
 ['taste',async(R,S)=>{R.label('Still there: taste it!','#e8590c');R.fx('heart',-.4,1.4,8,{w:.6,t:1.5});await hop(R,S.g,.12,.6);}]]});
page('c11',2,{old:[
 ['sand',async(R,S)=>{await R.bg('pond-summer');R.label('Sand','#c2a24d');S.g=await pop(R,'glass',-.5,.2,1.0);R.fx('crumb',-.5,1.3,14,{w:.2,t:1.4,vy:-1.2});await R.wait(.6);}],
 ['rocks',async(R,S)=>{R.label('Rocks','#868e96');const r=await pop(R,'rock',.8,1.5,.35);await R.toss(r,-.5,.45,.9,.2);R.fx('splash',-.5,.6,8,{w:.3,t:1});}],
 ['toys',async(R,S)=>{R.label('Toys','#e8590c');const t=await pop(R,'ball',-.1,1.6,.35);await R.toss(t,-.45,1.1,.9,.3);bobber(R,t,.03,2.4);}],
 ['sink',async(R,S)=>{R.word('Still there!',.9,1.9,'#e03131',1.4);await R.wait(.4);}]]});
page('c11',3,{old:[
 ['spill',async(R,S)=>{await R.bg('magic');R.label('A spill','#1c7ed6');R.fx('splash',-.2,.15,14,{w:.8,t:1.2});S.j=await pop(R,'juice',-.2,.15,.55);await R.wait(.3);}],
 ['sponge',async(R,S)=>{R.label('Sponge','#e0a800');S.s=await pop(R,'sponge',.8,.2,.6);await slide(R,S.s,-.15,.15,.9);R.fx('drop',-.1,.3,10,{w:.4,t:1.2,vy:-1});await R.shrink(S.j,.8);}],
 ['mop',async(R,S)=>{R.label('Mop','#1c7ed6');const m=await pop(R,'broom',1.3,.2,.9);await slide(R,m,.5,.2,.8);await wiggle(R,m,.15,.8);}],
 ['towel',async(R,S)=>{R.label('Towel','#7048e8');const t=await pop(R,'paper',1.9,.2,.55);await hop(R,t,.2,.5);}],
 ['plastic',async(R,S)=>{R.label('Plastic block: does not absorb','#e03131');const b=await pop(R,'block',-1.2,.2,.6);R.word('No!',-1.2,1.3,'#e03131',1.1);await wiggle(R,b,.1,.6);}]]});

/* ================= LESSON 12 : Water: solid, liquid, gas ================= */
page('c12',1,{old:[
 ['heat',async(R,S)=>{await R.bg('pond-summer');R.label('Heat','#e8590c');S.sun=await pop(R,'sun',1.4,1.7,.75);R.fx('sparkle',1.4,1.7,10,{w:.6,t:1.2});}],
 ['ice',async(R,S)=>{await R.bg('pond-winter');R.label('Ice','#1c7ed6');await R.wait(.2);S.i=await pop(R,'ice',-.9,.2,.8);}],
 ['snowman',async(R,S)=>{await R.bg('pond-spring');S.s=await pop(R,'snowman',-.3,.2,1.0);S.sun2=await pop(R,'sun',1.5,1.8,.7);}],
 ['melts',async(R,S)=>{R.label('Melts','#1c7ed6');R.fx('drop',-.3,.8,16,{w:.4,t:1.6,vy:-1.4});await R.T(2.2,e=>{S.s.scale.set((S.s.userData.s0||1)*(1+e*.35),(S.s.userData.s0||1)*(1-e*.85),1);});R.fx('splash',-.3,.2,14,{w:.8,t:1.2});}],
 ['puddle',async(R,S)=>{R.word('A puddle!',.5,1.8,'#1c7ed6',1.4);R.fx('bubble',-.3,.2,6,{w:.6,t:1.2});await R.wait(.4);}]]});
page('c12',2,{old:[
 ['cold',async(R,S)=>{await R.bg('pond-winter');R.label('Cold','#1c7ed6');R.snow(5,40);S.g=await pop(R,'juice',-.8,.25,.8);R.fx('drop',-.8,1.0,10,{w:.1,t:1.2,vy:-1.4});}],
 ['mold',async(R,S)=>{R.label('Mold','#868e96');await R.wait(.5);}],
 ['freezer',async(R,S)=>{R.label('Freezer','#1c7ed6');R.word('Brrr!',.7,1.9,'#1c7ed6',1.3);R.fx('snow',0,H+.1,40,{w:W,vy:-1.6,t:3.5,spread:1});await R.wait(1);}],
 ['freezes',async(R,S)=>{R.label('Ice pops!','#c2255c');await R.shrink(S.g,.3);const a=await pop(R,'ice',-.3,.2,.6);const b=await pop(R,'ice',.4,.2,.6);const c=await pop(R,'ice',1.1,.2,.6);R.fx('sparkle',.4,.7,16,{w:1.6,t:1.4});await all([hop(R,a,.2,.5),hop(R,b,.25,.5),hop(R,c,.2,.5)]);}]]});
page('c12',3,{old:[
 ['wet',async(R,S)=>{await R.bg('pond-summer');R.label('Wet clothes','#1c7ed6');S.sh=[await pop(R,'shirt',-.9,1.2,.6),await pop(R,'socks',-.2,1.25,.5),await pop(R,'shirt',.5,1.2,.6)];S.sh.forEach(p=>bobber(R,p,.02,3));R.fx('drop',-.2,1.0,10,{w:1.4,t:1.6,vy:-1.2});}],
 ['dry',async(R,S)=>{R.label('Dry!','#e8590c');R.fx('sparkle',-.2,1.2,14,{w:1.6,t:1.4});await R.wait(.8);}],
 ['sun',async(R,S)=>{R.label('Sun','#e8590c');S.su=await pop(R,'sun',1.5,1.8,.7);R.fx('sparkle',1.5,1.8,12,{w:.6,t:1.2});}],
 ['evaporates',async(R,S)=>{R.label('Evaporates','#868e96');R.fx('bubble',-.2,1.2,16,{w:1.6,t:2.2,vy:1});R.word('Up, up, up!',.6,1.95,'#868e96',1.4);await R.wait(1);}]]});

/* ================= LESSON 13 : Sink or float? ================= */
const drop13=async(R,S,name,x,floatIt,lab,col,sz)=>{R.label(lab,col);const p=await pop(R,name,x,1.8,sz||.4);const wy=1.02;await R.toss(p,x,wy,.9,0);R.fx('splash',x,wy,10,{w:.3,t:1});
  if(floatIt)bobber(R,p,.03,2.4);else{const y0=p.position.y;await R.T(1.2,e=>{p.position.y=y0-e*.5;p.scale.setScalar(p.scale.x*(1-e*.01));});}return p;};
page('c13',1,{old:[
 ['apple',async(R,S)=>{await R.bg('river');await drop13(R,S,'apple',-.9,1,'Apple floats','#2b8a3e',.4);}],
 ['coin',async(R,S)=>{await drop13(R,S,'coin',.1,0,'Coin sinks','#868e96',.3);}],
 ['duck',async(R,S)=>{await drop13(R,S,'duck',1.1,1,'Rubber duck floats','#e0a800',.45);R.fx('heart',1.1,1.5,6,{w:.4,t:1.4});}]]});
page('c13',2,{old:[
 ['raft',async(R,S)=>{await R.bg('river');R.label('Wood floats','#2b8a3e');S.w=await pop(R,'raft',-.5,.95,1.0);bobber(R,S.w,.03,2.2);R.fx('sparkle',-.5,1.5,8,{w:.7,t:1.2});}],
 ['wood',async(R,S)=>{R.word('Wood!',-.5,1.9,'#2b8a3e',1.2);await R.wait(.3);}],
 ['anchor',async(R,S)=>{R.label('Metal sinks','#868e96');const a=await pop(R,'anchor',1.1,1.7,.5);await R.toss(a,1.1,1.02,.8,0);R.fx('splash',1.1,1.0,10,{w:.3,t:1});const y0=a.position.y;await R.T(1.4,e=>{a.position.y=y0-e*.5;});}],
 ['metal',async(R,S)=>{R.word('Metal!',1.1,1.9,'#868e96',1.2);await R.wait(.3);}]]});
page('c13',3,{old:[
 ['clay',async(R,S)=>{await R.bg('river');R.label('Clay ball','#a0703c');S.c=await pop(R,'rock',-.3,1.7,.4);if(S.c.traverse)S.c.traverse(o=>{if(o.material&&o.material.color)o.material.color.set('#c97b3d');});await R.toss(S.c,-.3,1.02,.8,0);R.fx('splash',-.3,1.0,10,{w:.3,t:1});const y0=S.c.position.y;await R.T(1.3,e=>{S.c.position.y=y0-e*.45;});}],
 ['sinks',async(R,S)=>{R.word('It sinks!',.8,1.9,'#e03131',1.3);await R.wait(.4);}],
 ['boat',async(R,S)=>{R.label('Shape it into a boat','#2b8a3e');await R.shrink(S.c,.3);S.b=await pop(R,'boat',.5,.95,.8);bobber(R,S.b,.03,2.2);R.fx('sparkle',.5,1.4,14,{w:.8,t:1.3});}],
 ['matters',async(R,S)=>{R.word('Shape matters!',.5,1.95,'#2b8a3e',1.6);heartsAt(R,.5,1.5);await R.wait(.4);}]]});

/* ================= LESSON 14 : Hazard symbols ================= */
const SLOT=[-1.0,-.3,.4,1.1];
page('c14',1,{old:[
 ['skull',async(R,S)=>{await R.bg('garage');R.label('Poisonous','#e03131');S.s=R.sign('skull',-.3,1.2,1.3);await S.s.show();await S.s.shake(.7);S.b=await pop(R,'bottle',.9,.2,.6);}],
 ['death',async(R,S)=>{R.word('Danger!',.5,2.0,'#e03131',1.4);await S.s.shake(.7);}],
 ['washer',async(R,S)=>{R.label('Windshield washer fluid','#1c7ed6');await hop(R,S.b,.2,.5);const car=await pop(R,'car',-1.0,.15,.9);}]]});
page('c14',2,{old:[
 ['flame',async(R,S)=>{await R.bg('garage');R.label('Flammable','#e8590c');S.f=R.sign('flame',-.8,1.2,1.2);await S.f.show();await S.f.shake(.6);S.fi=await pop(R,'fire',-.1,.2,.55);}],
 ['heat',async(R,S)=>{R.word('Keep away from fire!',.7,2.0,'#e8590c',1.8);await wiggle(R,S.fi,.12,.7);}],
 ['exploding',async(R,S)=>{R.label('Explosive','#e03131');S.e=R.sign('burst',.9,1.2,1.2);await S.e.show();await S.e.shake(.7);R.fx('sparkle',.9,1.2,18,{w:.8,t:1.4});}],
 ['poked',async(R,S)=>{R.word('Boom!',.9,2.0,'#e03131',1.3);R.fx('sparkle',.9,1.2,20,{w:1,t:1.4});await R.wait(.4);}]]});
page('c14',3,{old:[
 ['hazard',async(R,S)=>{await R.bg('garage');R.label('Hazard symbol','#e03131');S.s=R.sign('corrosive',-.6,1.2,1.2);await S.s.show();S.b=await pop(R,'bottle',.6,.2,.6);}],
 ['touch',async(R,S)=>{R.word('Do not touch!',.4,2.0,'#e03131',1.7);await wiggle(R,S.b,.1,.6);}],
 ['tell',async(R,S)=>{R.label('Tell a grown-up','#2b8a3e');const g=await pop(R,'man',1.5,.15,1.0);await hop(R,g,.15,.5);}],
 ['closed',async(R,S)=>{R.label('Keep closed, up high','#7048e8');await R.wait(.3);await slide(R,S.b,1.5,1.5,1.3);R.fx('sparkle',1.5,1.6,10,{w:.5,t:1.2});}]]});

/* ================= LESSON 15 : Air around us ================= */
page('c15',1,{old:[
 ['wind',async(R,S)=>{await R.bg('park-wind');R.label('Wind','#1c7ed6');R.leaves(4,18);}],
 ['kites',async(R,S)=>{S.k=await pop(R,'kite',-.6,1.6,.8);bobber(R,S.k,.08,2.4);}],
 ['flags',async(R,S)=>{S.fl=await pop(R,'flag',.5,.3,.9);const f=S.fl;let on=true,ph=0;R.actors.push({kill:()=>{on=false;},tick:dt=>{if(on){ph+=dt*9;f.rotation.z=Math.sin(ph)*.08;}}});}],
 ['clouds',async(R,S)=>{S.c=await pop(R,'cloud',1.3,1.8,.8);await slide(R,S.c,-.9,1.9,3);}],
 ['sails',async(R,S)=>{S.s=await pop(R,'sailboat',1.1,.55,.8);bobber(R,S.s,.03,2);await slide(R,S.s,.6,.55,1);}]]});
page('c15',2,{old:[
 ['air',async(R,S)=>{await R.bg('park');R.label('Air takes up space','#1c7ed6');await R.wait(.3);}],
 ['balloon',async(R,S)=>{S.b=await pop(R,'balloon',-1.0,.4,.7);await R.T(.8,e=>S.b.scale.setScalar((S.b.userData.s0||.7)*(1+Math.sin(e*Math.PI)*.12)));}],
 ['ball',async(R,S)=>{S.s=await pop(R,'ball',-.15,.2,.45);await hop(R,S.s,.35,.7);}],
 ['tire',async(R,S)=>{S.t=await pop(R,'bicycle',.8,.2,.9);}],
 ['squeeze',async(R,S)=>{R.label('It pushes back!','#e8590c');for(const p of [S.b,S.s]){if(p){const k=p.userData.s0||.5;await R.T(.5,e=>p.scale.set(k*(1-Math.sin(e*Math.PI)*.18),k*(1+Math.sin(e*Math.PI)*.1),1));}}R.fx('sparkle',-.5,.8,10,{w:1,t:1.2});}]]});
page('c15',3,{old:[
 ['cold',async(R,S)=>{await R.bg('park');R.label('Cold air','#1c7ed6');R.snow(5,30);S.k=R.act('pa-kidsbench',{x:.9,y:.12,h:1.0,face:1});await S.k.show(.6,'pop');await S.k.shiver(1.3);}],
 ['coats',async(R,S)=>{R.fx('crumb',0,1,1,{});await R.wait(.5);}],
 ['cocoa',async(R,S)=>{S.cu=await pop(R,'mug',-.2,.2,.5);R.fx('bubble',-.2,.9,10,{w:.2,t:1.8,vy:.9});R.fx('heart',.9,1.4,6,{w:.6,t:1.4});}],
 ['warm',async(R,S)=>{R.label('Warm air','#e8590c');S.su=await pop(R,'sun',-1.2,1.8,.7);R.fx('sparkle',-1.2,1.8,14,{w:.7,t:1.3});}],
 ['shorts',async(R,S)=>{S.sh=await pop(R,'shirt',-.9,.2,.6);await hop(R,S.sh,.25,.6);}],
 ['outside',async(R,S)=>{R.word('Play outside!',.6,1.9,'#2b8a3e',1.5);R.fx('heart',.9,1.3,10,{w:1,t:1.5});if(S.k)await S.k.jump(.2);}]]});

P.DIR.mount();
})();
