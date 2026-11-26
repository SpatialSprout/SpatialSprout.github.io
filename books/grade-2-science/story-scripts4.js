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
const hearts=(R,x,y,n)=>R.fx('heart',x,y,n||8,{w:.8,t:1.6});
const spark=(R,x,y,n)=>R.fx('sparkle',x,y,n||12,{w:.8,t:1.3});
const tintP=(p,c)=>{if(p&&p.traverse)p.traverse(o=>{if(o.material&&o.material.color)o.material.color.set(c);});};
const grow=(R,p,k,sec)=>{if(!p)return R.wait(sec);const s0=p.scale.x;return R.T(sec,e=>p.scale.setScalar(s0+(k-s0)*e*e*(3-2*e)));};
const sceneBg=async(R,k,lab,col)=>{await R.bg(k);if(lab)R.label(lab,col||'#2b8a3e');};

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

/* ================= LESSONS 11-15 : theory pages with their own new clay art (pa-t11... pa-t15...) ================= */
const act=async(R,img,x,y,h,face,how)=>{const a=R.act(img,{x,y,h,face:face==null?1:face});await a.show(.5,how||'pop');return a;};
const ringAt=async(R,x,y,r,col)=>{const g=R.ring(x,y,r,col);await g.show();await g.pulse(2,1.1);await g.hide();};
const bubblesUp=(R,x,y,n)=>R.fx('bubble',x,y,n||10,{w:.3,t:1.8,vy:.9});

/* ---------- L11 page 1: sugar, salt, powder ---------- */
page('c11',1,{old:[
 ['sugar',async(R,S)=>{await sceneBg(R,'magic','Sugar','#e8590c');S.m=await act(R,'pa-soupglass',-1.05,.05,1.6);S.g=await act(R,'pa-t11sugar',.8,.15,1.35);
   for(let i=0;i<3;i++){const c=await pop(R,'candy',-.2+i*.15,1.9,.26);await R.toss(c,.8,1.2,.7,.3);R.drop(c);R.fx('splash',.8,1.1,8,{w:.2,t:.8});await S.g.jump(.08);}
   await S.m.swap('pa-soupstir',.5,{h:1.6,face:1});for(let i=0;i<3;i++){R.fx('sparkle',.8,.7,8,{w:.3,t:1});await all([S.m.wag(.7,.04,5),S.g.wag(.7,.06,5)]);}
   R.word('Gone!',.1,2.0,'#1c7ed6',1.4);await R.wait(.6);}],
 ['salt',async(R,S)=>{R.label('Salt','#868e96');const s=await pop(R,'salt',-.3,1.8,.5);await R.T(.6,e=>{s.position.x=-.3+e*1.1;s.rotation.z=-e*.9;});R.fx('crumb',.8,1.5,20,{w:.15,t:1.5,vy:-1.2});await R.wait(1);await all([S.g.wag(1,.07,6),R.T(1,e=>{s.rotation.z=-.9*(1-e);s.position.x=.8-e*1.1;})]);R.drop(s);R.fx('sparkle',.8,.7,12,{w:.3,t:1.2});R.word('Salty!',.1,2.0,'#868e96',1.3);await R.wait(.5);}],
 ['powder',async(R,S)=>{R.label('Drink powder','#c2255c');const j=await pop(R,'juice',-.3,1.8,.5);await R.T(.6,e=>{j.position.x=-.3+e*1.1;j.rotation.z=-e*.9;});R.fx('crumb',.8,1.5,22,{w:.15,t:1.5,vy:-1.2});await S.g.tint('#ffffff','#ff9ec4',1.2);await all([S.g.wag(1,.07,6),R.T(1,e=>{j.rotation.z=-.9*(1-e);j.position.x=.8-e*1.1;})]);R.drop(j);await S.g.tint('#ff9ec4','#ffffff',1.4);R.fx('sparkle',.8,.7,12,{w:.3,t:1.2});R.word('Pink, then gone!',.1,2.0,'#c2255c',1.6);await R.wait(.4);}],
 ['disappear',async(R,S)=>{R.word('Dissolved!',.2,2.0,'#1c7ed6',1.6);await ringAt(R,.8,.65,.5);R.fx('sparkle',.8,.7,24,{w:.6,t:1.6});await S.g.jump(.1);}],
 ['taste',async(R,S)=>{R.label('Still there: taste it!','#e8590c');await S.m.swap('pa-soupglass',.5,{h:1.6,face:1});await S.g.go(-.2,.15,1,{arc:.2});await S.g.jump(.15);R.word('Sweet!',.4,2.0,'#e8590c',1.5);hearts(R,-.2,1.6,12);await R.wait(.6);}]]});
/* ---------- L11 page 2: sand, rocks, toys ---------- */
page('c11',2,{old:[
 ['sand',async(R,S)=>{await sceneBg(R,'pond-summer','Sand','#c2a24d');S.j=await act(R,'pa-t11jars',.2,.2,1.0);R.fx('crumb',-.62,1.7,26,{w:.12,t:2,vy:-1.1});await ringAt(R,-.62,.45,.34,'#c2a24d');R.word('Sand sinks',.2,1.95,'#c2a24d',1.5);await S.j.jump(.06);}],
 ['rocks',async(R,S)=>{R.label('Rocks','#868e96');const r=await pop(R,'rock',.2,2.0,.28);await R.toss(r,.2,1.0,.8,.1);R.fx('splash',.2,.9,10,{w:.3,t:1});await R.T(.7,e=>{r.position.y=1.0-e*.55;});R.drop(r);await ringAt(R,.2,.42,.34,'#868e96');R.word('Plop!',.2,1.95,'#868e96',1.3);}],
 ['toys',async(R,S)=>{R.label('Toys','#e8590c');const t=await pop(R,'ball',1.02,2.0,.28);await R.toss(t,1.02,.95,.8,.1);R.fx('splash',1.02,.9,10,{w:.3,t:1});bobber(R,t,.025,2.4);await ringAt(R,1.02,.95,.3,'#e8590c');R.word('Float!',1.0,1.95,'#e8590c',1.3);}],
 ['sink',async(R,S)=>{R.word('Still there!',.2,1.95,'#e03131',1.7);for(let i=0;i<3;i++){R.fx('sparkle',-.62+i*.82,.6,8,{w:.3,t:1});await R.wait(.3);}await S.j.jump(.12);hearts(R,.2,1.5,10);await R.wait(.5);}]]});
/* ---------- L11 page 3: absorbing ---------- */
page('c11',3,{old:[
 ['spill',async(R,S)=>{await sceneBg(R,'magic','A spill','#1c7ed6');S.m=await act(R,'pa-soupspill',-1.15,.05,1.55);S.d=[];for(let i=0;i<5;i++){S.d.push(await pop(R,'drop',-.3+i*.38,.14,.3));}R.fx('splash',.4,.2,14,{w:1.2,t:1.2});R.word('Oops!',.4,2.0,'#e03131',1.4);await S.m.shiver(.9);}],
 ['sponge',async(R,S)=>{R.label('Sponge soaks it up','#e0a800');S.s=R.act('pa-t11sponge',{x:2.1,y:.1,h:.6,face:1});await S.s.show(.4);for(let i=4;i>=0;i--){await S.s.go(-.3+i*.38,.1,.55);R.fx('drop',-.3+i*.38,.3,3,{w:.1,t:.7,vy:-1});R.shrink(S.d[i],.4);}await S.s.jump(.15);R.word('Soaked!',.4,2.0,'#1c7ed6',1.4);hearts(R,.3,.9,6);await R.wait(.4);}],
 ['mop',async(R,S)=>{R.label('Mop','#1c7ed6');await S.s.hide(.4);S.t=await act(R,'pa-t11tools',.6,.1,1.0);await ringAt(R,.8,.7,.3,'#1c7ed6');await S.t.wag(.8,.03,4);}],
 ['towel',async(R,S)=>{R.label('Towel','#7048e8');await ringAt(R,.2,.55,.3,'#7048e8');R.fx('drop',.2,.7,8,{w:.2,t:1,vy:-1});await S.t.jump(.08);}],
 ['plastic',async(R,S)=>{R.label('Plastic block: does not absorb','#e03131');await ringAt(R,1.15,.4,.3,'#e03131');R.word('No!',1.1,1.6,'#e03131',1.3);await S.t.shiver(.8);await R.wait(.6);}]]});

/* ---------- L12 page 1: heat melts ice ---------- */
page('c12',1,{old:[
 ['heat',async(R,S)=>{await sceneBg(R,'pond-winter','Heat','#e8590c');S.w=await act(R,'pa-waterice',-1.0,.05,1.3);S.sun=await pop(R,'sun',1.4,1.6,.4);await grow(R,S.sun,.9,1.4);spark(R,1.4,1.7,14);}],
 ['ice',async(R,S)=>{R.label('Ice','#1c7ed6');R.word('Solid ice',.4,2.0,'#1c7ed6',1.4);await S.w.shiver(.8);R.fx('drop',S.w.st.x,1.0,12,{w:.4,t:1.4,vy:-1.4});await S.w.swap('pa-watermelt',1.4,{h:1.0,face:1});R.fx('drop',S.w.st.x,.7,12,{w:.4,t:1.2,vy:-1.4});}],
 ['snowman',async(R,S)=>{await R.bg('pond-spring');R.label('Snowman in the sun','#e8590c');S.s=await act(R,'pa-t12snowman',.5,.1,1.55);S.sun2=await pop(R,'sun',1.6,1.9,.6);await S.s.wag(.8,.03,3);}],
 ['melts',async(R,S)=>{R.label('Melts','#1c7ed6');R.fx('drop',.5,1.0,30,{w:.5,t:3,vy:-1.4});await S.s.grow(1.06,.7,2.2);R.fx('splash',.5,.2,14,{w:.8,t:1.2});await S.s.swap('pa-t12puddle',1.4,{h:.45,face:1});S.s.st.sy=1;S.s.st.sx=1;R.fx('splash',.5,.2,16,{w:.9,t:1.2});}],
 ['puddle',async(R,S)=>{R.word('A puddle!',.4,1.9,'#1c7ed6',1.5);S.w2=R.act('pa-waterdrop',{x:.5,y:.1,h:1.3,face:1});S.w2.st.op=0;S.w2.ap();R.fx('splash',.5,.3,20,{w:.8,t:1.3});await S.w2.show(.6,'pop');await S.w2.jump(.3);hearts(R,.5,1.7,10);await R.wait(.5);}]]});
/* ---------- L12 page 2: freezing ---------- */
page('c12',2,{old:[
 ['cold',async(R,S)=>{await sceneBg(R,'pond-winter','Cold','#1c7ed6');R.snow(6,50);S.w=await act(R,'pa-waterdrop',-1.15,.05,1.3);S.j=await pop(R,'juice',.6,.9,.75);R.word('Brrr!',.4,2.0,'#1c7ed6',1.4);await S.w.shiver(1.1);}],
 ['mold',async(R,S)=>{R.label('Mold','#868e96');S.m=[];for(let i=0;i<3;i++)S.m.push(await pop(R,'cup',-.2+i*.8,.2,.5));await R.T(.6,e=>S.j.rotation.z=-.8*e);for(const m of S.m){await slide(R,S.j,m.position.x+.1,.9,.5);R.fx('drop',m.position.x,.9,6,{w:.05,t:.8,vy:-1.6});await R.wait(.3);}await R.T(.5,e=>S.j.rotation.z=-.8*(1-e));}],
 ['freezer',async(R,S)=>{R.label('Freezer','#1c7ed6');R.word('Brrr!',.4,2.0,'#1c7ed6',1.5);R.snow(5,50);for(const m of S.m)tintP(m,'#cfe8ff');await S.w.shiver(1.8);R.fx('sparkle',.6,.5,20,{w:2.2,t:1.8});await R.wait(.6);}],
 ['freezes',async(R,S)=>{R.label('Ice pops!','#c2255c');await bye(R,[...S.m,S.j]);S.p=await act(R,'pa-t12pops',.5,.15,1.3);R.fx('sparkle',.5,.9,22,{w:1.8,t:1.5});await S.p.jump(.15);await S.p.wag(.8,.03,4);S.b=R.act('pa-boywalk',{x:2.7,y:.1,h:1.0,face:-1});S.b.st.fl=-1;await S.b.show(.2);await S.b.walk(1.7,.1,1.4);R.word('Yum!',1.5,1.8,'#c2255c',1.4);await S.b.jump(.18);hearts(R,1.7,1.4,10);await R.wait(.4);}]]});
/* ---------- L12 page 3: evaporating ---------- */
page('c12',3,{old:[
 ['wet',async(R,S)=>{await sceneBg(R,'pond-summer','Wet clothes','#1c7ed6');S.l=await act(R,'pa-t12line',.4,.9,1.25);S.l.tint('#ffffff','#7f9cc8',.6);R.fx('drop',.2,1.6,24,{w:1.8,t:2.6,vy:-1.4});R.word('Drip, drip',.9,2.0,'#1c7ed6',1.4);await S.l.wag(1.4,.03,3);}],
 ['dry',async(R,S)=>{R.label('Dries in the sun','#e8590c');S.su=await pop(R,'sun',1.7,1.9,.4);await grow(R,S.su,.85,1.4);R.fx('sparkle',1.7,1.9,14,{w:.7,t:1.3});await S.l.wag(1,.04,4);}],
 ['sun',async(R,S)=>{await S.l.tint('#7f9cc8','#ffffff',1.4);R.fx('sparkle',.4,1.7,18,{w:2,t:1.5});R.word('Dry!',.9,2.1,'#e8590c',1.4);await R.wait(.6);}],
 ['evaporates',async(R,S)=>{R.label('Evaporates into the air','#868e96');R.fx('bubble',.4,1.6,30,{w:2,t:3.4,vy:1.1});S.w=R.act('pa-watergas',{x:.1,y:1.0,h:1.1,face:1});S.w.st.op=0;S.w.ap();await S.w.show(.8);R.word('Up, up, up!',.7,2.15,'#868e96',1.5);await S.w.go(-.4,1.5,2,{arc:.2});await S.w.go(1.1,1.3,1.6,{arc:.2});await R.wait(.4);}]]});

/* ---------- L13 page 1: apple, coin, duck ---------- */
page('c13',1,{old:[
 ['apple',async(R,S)=>{await R.bg('river');S.s=await act(R,'pa-samlook',-1.45,.05,1.35);S.t=await act(R,'pa-t13tank',.7,.15,1.45);R.label('Apple floats','#2b8a3e');await ringAt(R,.45,1.25,.28,'#2b8a3e');R.word('Bob, bob!',.7,2.0,'#2b8a3e',1.3);await S.s.wag(.7,.04,3);}],
 ['coin',async(R,S)=>{R.label('Coin sinks','#868e96');await ringAt(R,.85,.4,.26,'#868e96');bubblesUp(R,.85,.4,10);R.word('Glug!',.7,2.0,'#868e96',1.3);await S.s.shiver(.5);}],
 ['duck',async(R,S)=>{R.label('Rubber duck floats','#e0a800');await ringAt(R,1.0,1.2,.3,'#e0a800');R.word('Quack!',.7,2.0,'#e0a800',1.3);await S.s.swap('pa-samcheer',.5,{h:1.0,face:1});await S.s.jump(.2);hearts(R,.7,1.8,10);await R.wait(.4);}]]});
/* ---------- L13 page 2: wood vs metal ---------- */
page('c13',2,{old:[
 ['raft',async(R,S)=>{await R.bg('river');R.label('Wood floats','#2b8a3e');S.lg=await pop(R,'log',-.8,1.0,.6);bobber(R,S.lg,.03,2);S.w=await pop(R,'raft',.5,.95,1.0);bobber(R,S.w,.03,2.2);spark(R,.5,1.5,10);await R.wait(.6);}],
 ['wood',async(R,S)=>{R.word('Wood floats!',.4,2.0,'#2b8a3e',1.6);S.s=R.act('pa-samraft',{x:.5,y:.8,h:.8,face:1});S.s.st.op=0;S.s.ap();await R.shrink(S.w,.4);R.drop(S.w);await S.s.show(.5,'pop');await S.s.go(1.3,.85,1.8,{arc:.04});await S.s.go(-.3,.85,2.2,{arc:.04});await R.wait(.3);}],
 ['anchor',async(R,S)=>{R.label('Metal sinks','#868e96');S.a=R.act('pa-t13anchor',{x:1.0,y:1.7,h:.55,face:1});await S.a.show(.4,'pop');await S.a.go(1.0,1.0,.9);R.fx('splash',1.0,1.05,14,{w:.4,t:1.2});bubblesUp(R,1.0,.6,12);await S.a.go(1.0,.35,1.8);}],
 ['metal',async(R,S)=>{R.word('Metal sinks!',.9,2.0,'#868e96',1.6);bubblesUp(R,1.0,.4,14);await S.s.go(.5,.85,1.2,{arc:.03});await R.wait(.5);}]]});
/* ---------- L13 page 3: clay ball and boat ---------- */
page('c13',3,{old:[
 ['clay',async(R,S)=>{await R.bg('river');R.label('A ball of clay','#a0703c');S.s=await act(R,'pa-samlook',-1.5,.05,1.35);S.c=await pop(R,'rock',-.4,1.9,.4);tintP(S.c,'#c97b3d');await R.toss(S.c,.4,1.0,.9,.3);R.fx('splash',.4,1.0,12,{w:.3,t:1});R.drop(S.c);S.t=await act(R,'pa-t13clay',.6,.15,1.35,1,'pop');}],
 ['sinks',async(R,S)=>{R.word('It sinks!',.8,2.0,'#e03131',1.5);await ringAt(R,.5,.35,.3,'#e03131');bubblesUp(R,.5,.4,10);await S.s.shiver(.9);}],
 ['boat',async(R,S)=>{R.label('Shape it into a boat','#2b8a3e');await S.t.hide(.5);S.b=R.act('pa-t13boat',{x:.5,y:.85,h:.8,face:1});S.b.st.op=0;S.b.ap();spark(R,.5,1.2,18);await S.b.show(.6,'pop');S.b.idle='swim';await S.s.swap('pa-samcheer',.5,{h:1.0,face:1});await S.s.jump(.2);}],
 ['matters',async(R,S)=>{R.word('Shape matters!',.5,2.0,'#2b8a3e',1.7);await S.b.go(1.3,.85,1.6,{arc:.03});await S.b.go(.3,.85,1.6,{arc:.03});hearts(R,.5,1.6,10);await R.wait(.5);}]]});

/* ---------- L14 page 1: poison ---------- */
page('c14',1,{old:[
 ['skull',async(R,S)=>{await R.bg('garage');R.label('Poisonous','#e03131');S.m=await act(R,'pa-mousebottle',-1.35,.05,1.2);S.c=R.act('pa-catstop',{x:2.8,y:.05,h:1.3,face:-1});await S.c.show(.1);await S.c.walk(1.3,.05,1);S.s=R.sign('skull',.1,1.55,1.3);await S.s.show();await S.s.shake(.8);R.word('Danger!',.4,2.15,'#e03131',1.3);}],
 ['death',async(R,S)=>{await S.m.swap('pa-mousescared',.4,{h:1.2,face:1});await all([S.m.shiver(1.2),S.s.shake(1.2)]);R.word('Not for drinking!',.4,2.15,'#e03131',1.7);}],
 ['washer',async(R,S)=>{R.label('Windshield washer fluid','#1c7ed6');await all([S.s.hide(),S.m.hide(.5),S.c.hide(.5)]);S.j=await act(R,'pa-t14jug',-.4,.1,1.4);const car=await pop(R,'car',1.2,.2,.9);const sg=R.sign('skull',.55,1.5,.9);await sg.show();await sg.shake(.7);await S.j.wag(.8,.04,4);await S.j.jump(.1);await R.wait(.5);}]]});
/* ---------- L14 page 2: flammable and explosive ---------- */
page('c14',2,{old:[
 ['flame',async(R,S)=>{await R.bg('garage');R.label('Flammable','#e8590c');S.c=await act(R,'pa-catpoint',-1.25,.05,1.35);S.f=R.sign('flame',.0,1.55,1.3);await S.f.show();await S.f.shake(.8);S.k=await act(R,'pa-t14fuel',1.4,.1,1.2);await S.k.wag(.8,.03,5);}],
 ['heat',async(R,S)=>{R.word('Keep away from fire!',.4,2.15,'#e8590c',1.9);await S.k.go(1.9,.1,1.2);await S.c.wag(.8,.04,3);R.fx('sparkle',1.9,.8,14,{w:.5,t:1.2});}],
 ['exploding',async(R,S)=>{R.label('Explosive','#e03131');await S.k.hide(.5);S.e=R.sign('burst',-.1,1.55,1.3);await S.e.show();await S.e.shake(.8);S.n=await act(R,'pa-t14can',1.3,.1,1.3);await S.n.grow(1.15,1.15,1.2);R.fx('sparkle',1.3,.9,12,{w:.4,t:1.2});}],
 ['poked',async(R,S)=>{R.word('Boom!',.4,2.15,'#e03131',1.6);R.fx('sparkle',1.3,.8,30,{w:.9,t:1.6});R.fx('dust',1.3,.4,14,{w:.8,t:1.4});await S.n.hide(.3);await S.c.shiver(.8);await R.wait(.5);}]]});
/* ---------- L14 page 3: be safe ---------- */
page('c14',3,{old:[
 ['hazard',async(R,S)=>{await R.bg('garage');R.label('Hazard symbol','#e03131');S.m=await act(R,'pa-mousebottle',-1.35,.05,1.2);S.s=R.sign('corrosive',.2,1.55,1.2);await S.s.show();S.b=await pop(R,'bottle',1.1,.2,.6);await S.s.shake(.7);}],
 ['touch',async(R,S)=>{R.word('Do not touch!',.4,2.15,'#e03131',1.8);S.c=R.act('pa-catstop',{x:2.8,y:.05,h:1.3,face:-1});await S.c.show(.1);await S.c.walk(1.7,.05,1.2);await S.m.swap('pa-mousescared',.4,{h:1.2,face:1});await S.m.shiver(.8);}],
 ['tell',async(R,S)=>{R.label('Tell a grown-up','#2b8a3e');const g=R.act('pa-keeper',{x:-2.6,y:.1,h:1.45,face:1});await g.show(.2);await g.walk(.1,.1,1.6);await g.jump(.15);R.word('Tell a grown-up!',.4,2.15,'#2b8a3e',1.8);hearts(R,.1,1.8,10);S.g=g;await R.wait(.4);}],
 ['closed',async(R,S)=>{R.label('Keep closed, up high','#7048e8');S.sh=R.act('pa-t14shelf',{x:1.5,y:1.3,h:.95,face:1});S.sh.st.op=0;S.sh.ap();await all([S.sh.show(.6,'pop'),S.g.walk(.8,.1,1.2)]);await slide(R,S.b,1.5,1.5,1.6);R.drop(S.b);spark(R,1.5,1.7,14);R.word('Up high!',.3,2.15,'#7048e8',1.5);await S.g.jump(.2);await R.wait(.4);}]]});

/* ---------- L15 page 1: wind ---------- */
page('c15',1,{old:[
 ['wind',async(R,S)=>{await R.bg('park-wind');R.label('Wind','#1c7ed6');S.l=R.act('pa-leorun',{x:-2.7,y:.05,h:1.3,face:1});await S.l.show(.2);R.leaves(5,24);await S.l.walk(-.3,.05,2.5);R.word('Whoosh!',.4,2.0,'#1c7ed6',1.4);}],
 ['kites',async(R,S)=>{R.label('Wind flies kites','#e8590c');S.k=await pop(R,'kite',-.1,1.3,.9);bobber(R,S.k,.1,2.4);S.tr=R.trail([[-.3,.8],[-.2,1.0],[-.1,1.25]],.8,'#fff');await S.tr.draw();await S.l.walk(.5,.05,1.2);await slide(R,S.k,.9,1.8,1.4);}],
 ['flags',async(R,S)=>{R.label('Flaps flags','#c2255c');S.fl=await pop(R,'flag',1.7,.3,.9);const f=S.fl;let on=true,ph=0;R.actors.push({kill:()=>{on=false;},tick:dt=>{if(on){ph+=dt*9;f.rotation.z=Math.sin(ph)*.1;}}});R.word('Flap, flap!',1.2,2.0,'#c2255c',1.4);await R.wait(1.2);}],
 ['clouds',async(R,S)=>{R.label('Pushes clouds','#868e96');S.c=await pop(R,'cloud',1.5,1.9,.8);const c2=await pop(R,'cloud',-.8,2.0,.6);await all([slide(R,S.c,-.9,1.95,3),slide(R,c2,1.8,2.0,3)]);}],
 ['sails',async(R,S)=>{R.label('Fills sails','#1c7ed6');await R.bg('river');S.s=R.act('pa-t15sail',{x:-1.4,y:.95,h:1.1,face:1});S.s.st.op=0;S.s.ap();await S.s.show(.5,'pop');S.s.idle='swim';R.fx('leaf',0,1.6,12,{w:2,t:3,vx:.9});await S.s.go(1.5,.95,3.2,{arc:.03});await R.wait(.4);}]]});
/* ---------- L15 page 2: air takes up space ---------- */
page('c15',2,{old:[
 ['air',async(R,S)=>{await R.bg('park');R.label('Air takes up space','#1c7ed6');S.a=await act(R,'pa-amybubbles',-1.3,.05,1.35);R.fx('bubble',-.8,1.2,20,{w:1.2,t:3,vy:.7});R.word('Bubbles!',.5,2.0,'#1c7ed6',1.3);await S.a.wag(1.2,.03,3);}],
 ['balloon',async(R,S)=>{S.b=await act(R,'pa-t15balloon',-.1,.1,.6);for(let i=0;i<3;i++){R.fx('bubble',-.4,.3,4,{w:.1,t:.7,vy:.3});await S.b.grow(1.15+i*.12,1.15+i*.12,.7);}R.word('Full of air!',.7,2.0,'#1c7ed6',1.5);await S.b.jump(.18);}],
 ['ball',async(R,S)=>{S.s=await act(R,'pa-t15ball',1.4,.1,.5);await S.s.jump(.5);await S.s.jump(.35);R.fx('dust',1.4,.2,6,{w:.3,t:.8});}],
 ['tire',async(R,S)=>{S.t=await act(R,'pa-t15bike',.7,1.4,.9);await S.t.go(.7,.1,.7,{arc:.1});for(let i=0;i<3;i++){R.fx('bubble',1.1,.3,4,{w:.1,t:.7,vy:.4});await S.t.wag(.5,.02,4);}}],
 ['squeeze',async(R,S)=>{R.label('It pushes back!','#e8590c');for(const a of [S.b,S.s]){await a.grow(1.3,.7,.5);R.fx('sparkle',a.st.x,a.st.y+.5,8,{w:.3,t:.8});await a.grow(1,1,.5);}R.word('Push!',.5,2.0,'#e8590c',1.4);await R.wait(.6);}]]});
/* ---------- L15 page 3 stays as before ---------- */
page('c15',3,{old:[
 ['cold',async(R,S)=>{await R.bg('park');R.label('Cold air','#1c7ed6');R.snow(5,30);S.k=R.act('pa-kidsbench',{x:.9,y:.12,h:1.0,face:1});await S.k.show(.6,'pop');await S.k.shiver(1.3);}],
 ['coats',async(R,S)=>{R.fx('crumb',0,1,1,{});await R.wait(.5);}],
 ['cocoa',async(R,S)=>{S.cu=await pop(R,'mug',-.2,.2,.5);R.fx('bubble',-.2,.9,10,{w:.2,t:1.8,vy:.9});R.fx('heart',.9,1.4,6,{w:.6,t:1.4});}],
 ['warm',async(R,S)=>{R.label('Warm air','#e8590c');S.su=await pop(R,'sun',-1.2,1.8,.7);R.fx('sparkle',-1.2,1.8,14,{w:.7,t:1.3});}],
 ['shorts',async(R,S)=>{S.sh=await pop(R,'shirt',-.9,.2,.6);await hop(R,S.sh,.25,.6);}],
 ['outside',async(R,S)=>{R.word('Play outside!',.6,1.9,'#2b8a3e',1.5);R.fx('heart',.9,1.3,10,{w:1,t:1.5});if(S.k)await S.k.jump(.2);}]]});

P.DIR.mount();
})();
