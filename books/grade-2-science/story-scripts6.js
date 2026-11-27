/* Theory pages rebuilt with fuller scenes: lesson 5 (pages 1 and 3), lessons 16-18 (pages 1-3). */
(function(){
"use strict";
const P=window.PM;if(!P||!P.DIR)return;
const page=P.DIR.page,W=P.PIC.W,H=P.PIC.H;
const all=ps=>Promise.all(ps);
const pr=(R,n,x,y,s)=>R.prop(n,x,y,s);
const spin=(R,p,rate)=>{if(!p)return;let on=true;R.actors.push({kill:()=>{on=false;},tick:dt=>{if(on)p.rotation.z-=dt*(rate||7);}});};
const pop=async(R,k,o,t)=>{const a=R.act(k,o);a.st.op=0;a.ap();await a.show(t||.5,'pop');return a;};

/* ===== lesson 5, page 1: why animals migrate ===== */
const T5a={
 food:async(R,S)=>{await R.bg('field-snow');R.label('No food in winter','#868e96');R.snow(4,30);S.c=await pop(R,'pa-c5hungry',{x:-.4,y:.15,h:1.5,face:1});R.word('So hungry…',.5,1.9,'#868e96',1.3);await S.c.shiver(1.1);
   await R.bg('meadow');R.label('Food in the south','#2b8a3e');S.c=await pop(R,'pa-c5full',{x:-1.5,y:.15,h:1.5,face:1});await S.c.walk(.2,.15,2.4);for(let i=0;i<3;i++){R.fx('leaf',S.c.st.x+.5,.6,5,{w:.2,t:1});await S.c.chew(4,1.1);}R.fx('heart',.2,1.9,8,{w:.6,t:1.4});},
 weather:async(R,S)=>{await R.bg('field-snow');R.label('Too cold!','#74c0fc');R.snow(5,40);S.g=await pop(R,'pa-g5cold',{x:-.3,y:.2,h:1.0,face:1});R.word('Brrr!',.4,1.8,'#1c7ed6',1.6);await S.g.shiver(1.4);
   await R.bg('pond-summer');R.label('Warm and sunny','#e8590c');S.sn=pr(R,'sun',1.5,2.0,.8);R.fx('sparkle',1.5,2.0,14,{w:.8,t:1.5});S.h=R.hero('goose',{shadow:false});S.h.at(-W/2+.4,S.h.home.y+.4);S.h.face=1;await S.h.show(.3);await S.h.fly(S.h.home.x+.4,S.h.home.y,3.2);await S.h.jump(.12);R.fx('heart',S.h.st.x,1.5,8,{w:.6,t:1.4});},
 babies:async(R,S)=>{await R.bg('meadow');R.label('A safe place for babies','#c2255c');S.n=await pop(R,'pa-g5nest',{x:-.2,y:.15,h:1.15,face:1},.7);R.fx('sparkle',-.2,.9,16,{w:.7,t:1.4});R.word('Peep! Peep!',.5,1.7,'#e8a900',1.4);for(let i=0;i<3;i++){await S.n.jump(.1);R.fx('heart',-.2,1.4,4,{w:.5,t:1.3});}await S.n.wag(.8,.03,3);}
};
page('c05',1,{old:[['food',T5a.food],['weather',T5a.weather],['babies',T5a.babies]],neu:[['food',T5a.food],['weather',T5a.weather],['babies',T5a.babies]]});

/* ===== lesson 5, page 3: dangers ===== */
const T5b={
 pollution:async(R,S)=>{await R.bg('smoke');R.label('Pollution','#495057');R.fx('dust',.1,1.8,16,{w:1.6,t:3,vy:.5});S.g=await pop(R,'pa-g5smoke',{x:-1.6,y:.6,h:.85,face:1},.4);await S.g.go(.9,.75,3.2);R.word('Cough!',S.g.st.x,1.6,'#495057',1.4);R.fx('dust',S.g.st.x,.8,12,{w:.5,t:1.4,vy:.3});await S.g.wag(.7,.06,6);},
 hunters:async(R,S)=>{await R.bg('forest-edge');R.label('Hunters','#e8590c');S.h=await pop(R,'pa-hunter5',{x:.8,y:.1,h:1.3,face:-1});await S.h.wag(.8,.03,3);R.word('Watch out!',.8,1.8,'#e03131',1.3);const b=R.hero('goose',{h:.7,shadow:false});b.at(-W/2+.4,.9);b.face=1;await b.show(.2);await b.fly(W/2-.2,1.2,2.4);await b.hide(.3);},
 storms:async(R,S)=>{await R.bg('storm');R.label('Storms','#364fc7');R.fx('drop',0,2.2,26,{w:3.2,t:2.4,vy:-1.6});S.g=await pop(R,'pa-g5storm',{x:-1.3,y:.7,h:.9,face:1},.4);await all([S.g.go(1.0,.55,3.2),R.T(3.2,()=>{S.g.st.rz=Math.sin(R.t*14)*.07;})]);S.g.st.rz=0;R.word('Hang on!',S.g.st.x,1.5,'#364fc7',1.3);},
 predators:async(R,S)=>{await R.bg('forest-edge');R.label('Predators','#e8590c');S.b=R.hero('goose',{shadow:false});S.b.at(.9,S.b.home.y);S.b.face=-1;await S.b.show(.4,'pop');S.f=await pop(R,'pa-fox5',{x:-2.0,y:.1,h:.75,face:1},.3);await S.f.go(-.2,.1,2.6);R.word('!',S.b.st.x,1.5,'#e03131',2);await S.b.fly(W/2-.3,1.3,1.4);await S.f.hop(.5,.1,.5);R.fx('dust',.5,.15,10,{w:.5,t:1.1});}
};
page('c05',3,{old:[['pollution',T5b.pollution],['hunters',T5b.hunters],['storms',T5b.storms],['predators',T5b.predators]],neu:[['pollution',T5b.pollution],['hunters',T5b.hunters],['storms',T5b.storms],['predators',T5b.predators]]});

/* ===== lesson 16: Water around us ===== */
const bobA=(R,a,amp)=>{if(!a)return;let on=true,ph=0;R.actors.push({kill:()=>{on=false;},tick:dt=>{if(!on)return;ph+=dt*2;a.st.lift=Math.sin(ph)*(amp||.04);}});};
const T16a={
 rivers:async(R,S)=>{await R.bg('rapids');R.label('River','#1c7ed6');S.d=await pop(R,'pa-d16sky',{x:-1.3,y:.45,h:.8,face:1},.4);R.fx('splash',-1.3,.5,14,{w:.8,t:1.3});await S.d.go(1.1,.5,3.2);R.fx('splash',1.1,.5,12,{w:.6,t:1.2});},
 lakes:async(R,S)=>{await R.bg('lake');R.label('Lake','#1c7ed6');S.d=await pop(R,'pa-d16float',{x:-.2,y:.45,h:.7,face:1});bobA(R,S.d,.05);R.fx('bubble',-.2,.5,6,{w:.5,t:2.4,vy:.4});await S.d.go(.8,.45,2.6);await S.d.wag(.8,.03,2);},
 oceans:async(R,S)=>{await R.bg('ocean');R.label('Ocean','#0b7285');S.d=await pop(R,'pa-d16float',{x:-.6,y:.5,h:.7,face:1});bobA(R,S.d,.06);await S.d.go(.7,.5,2.8);R.word('So big!',.6,1.7,'#0b7285',1.3);},
 frozen:async(R,S)=>{await R.bg('pond-winter');R.label('Frozen: ice','#74c0fc');R.snow(5,40);S.d=await pop(R,'pa-d16ice',{x:-.2,y:.2,h:1.0,face:1});R.fx('sparkle',-.2,.8,12,{w:.6,t:1.4});await S.d.shiver(1.2);},
 wells:async(R,S)=>{await R.bg('meadow');R.label('Underground: a well','#8b5a2b');S.d=await pop(R,'pa-w16well',{x:-.1,y:.15,h:1.35,face:1},.6);R.fx('sparkle',-.1,1.0,14,{w:.8,t:1.4});await S.d.jump(.1);R.fx('drop',-.1,1.0,8,{w:.2,t:1.2,vy:-1});await S.d.wag(.8,.03,3);}
};
page('c16',1,{old:[['rivers',T16a.rivers],['lakes',T16a.lakes],['oceans',T16a.oceans],['frozen',T16a.frozen],['wells',T16a.wells]],neu:[['rivers',T16a.rivers],['lakes',T16a.lakes],['oceans',T16a.oceans],['frozen',T16a.frozen],['wells',T16a.wells]]});
const T16b={
 rain:async(R,S)=>{await R.bg('storm');R.label('Rain','#1c7ed6');R.fx('drop',0,2.2,26,{w:3.2,t:2.4,vy:-1.6});S.d=await pop(R,'pa-d16sky',{x:-.6,y:1.6,h:.8,face:1},.3);await S.d.go(-.6,.3,1.4);R.fx('splash',-.6,.3,14,{w:.5,t:1.2});},
 snow:async(R,S)=>{await R.bg('field-snow');R.label('Snow','#74c0fc');R.snow(8,50);S.d=await pop(R,'pa-d16snow',{x:.2,y:1.7,h:.8,face:1},.3);await all([S.d.go(.2,.25,3),R.T(3,e=>{S.d.st.rz=Math.sin(e*14)*.15;})]);S.d.st.rz=0;R.fx('sparkle',.2,.5,10,{w:.5,t:1.2});},
 fog:async(R,S)=>{await R.bg('fog');R.label('Fog','#868e96');S.d=await pop(R,'pa-d16fog',{x:-2.0,y:.3,h:.8,face:1},.3);await S.d.go(.4,.35,3.4);R.fx('fluff',.4,.5,12,{w:.9,t:2,vy:.2});await S.d.wag(.8,.03,2);},
 dew:async(R,S)=>{await R.bg('dew');R.label('Dew & frost','#2b8a3e');S.d=await pop(R,'pa-d16dew',{x:-.1,y:.25,h:1.0,face:1},.5);R.fx('sparkle',-.1,.8,18,{w:.9,t:1.6});await S.d.jump(.12);R.fx('sparkle',.4,.6,12,{w:.9,t:1.4});await S.d.wag(.8,.04,3);}
};
page('c16',2,{old:[['rain',T16b.rain],['snow',T16b.snow],['fog',T16b.fog],['dew',T16b.dew]],neu:[['rain',T16b.rain],['snow',T16b.snow],['fog',T16b.fog],['dew',T16b.dew]]});
const T16c={
 heat:async(R,S)=>{await R.bg('kitchen-day');R.label('Heat the pot','#e8590c');S.p=await pop(R,'pa-p16steam',{x:-.1,y:.25,h:1.25,face:1},.6);const f=pr(R,'fire',-.1,.2,.4);R.fx('sparkle',-.1,.4,10,{w:.5,t:1.2});await S.p.wag(.8,.03,4);},
 steam:async(R,S)=>{R.label('Evaporation: steam rises','#e8590c');await S.p.swap('pa-p16boil',.7,{h:1.35,face:1});R.fx('bubble',-.1,1.2,18,{w:.6,t:2.4,vy:1.2});await S.p.shiver(1.2);},
 drops:async(R,S)=>{R.label('Condensation: drops form','#7048e8');S.l=await pop(R,'pa-p16lid',{x:-.1,y:1.55,h:.7,face:1},.5);R.fx('drop',-.1,1.5,10,{w:.4,t:1.4,vy:-.4});await S.l.wag(.8,.04,4);},
 fall:async(R,S)=>{R.label('Precipitation: drops fall','#1c7ed6');R.word('Plip! Plop!',.7,1.9,'#1c7ed6',1.4);for(let i=0;i<3;i++){R.fx('drop',-.1,1.4,8,{w:.3,t:1.2,vy:-1.6});R.fx('splash',-.1,.5,8,{w:.3,t:.8});await S.p.jump(.06);}await S.l.hide(.5);R.fx('sparkle',-.1,1.2,14,{w:1,t:1.4});}
};
page('c16',3,{old:[['heat',T16c.heat],['steam',T16c.steam],['drops',T16c.drops],['fall',T16c.fall]],neu:[['heat',T16c.heat],['steam',T16c.steam],['drops',T16c.drops],['fall',T16c.fall]]});

/* ===== lesson 17: Clean air and water ===== */
const T17a={
 smoke:async(R,S)=>{await R.bg('smoke');R.label('Factory smoke','#495057');R.fx('dust',.1,1.9,22,{w:1.8,t:3.4,vy:.5});await R.wait(1.6);R.fx('dust',.6,1.7,16,{w:1.2,t:2.6,vy:.4});await R.wait(1);},
 exhaust:async(R,S)=>{await R.bg('street');R.label('Car exhaust','#495057');S.c=await pop(R,'pa-c17exhaust',{x:-2.2,y:.1,h:.5,face:1},.2);const e=S.c.go(1.4,.1,3.2);for(let i=0;i<6;i++){R.fx('dust',S.c.st.x-.4,.35,4,{w:.15,t:1.4,vy:.4});await R.wait(.5);}await e;},
 litter:async(R,S)=>{await R.bg('creek-dirty');R.label('Litter in the water','#868e96');S.d=await pop(R,'pa-d17sad',{x:-.2,y:.2,h:.6,face:1},.5);R.word('Yuck!',.4,1.8,'#2b8a3e',1.3);for(let i=0;i<3;i++){const t=pr(R,'trash',-1.2+i*1.2,1.9,.4);if(t)R.toss(t,-1.0+i*1.1,.35,.9,.4);await R.wait(.5);}await S.d.shiver(.9);},
 oil:async(R,S)=>{await R.bg('oil');R.label('Oil spill','#212529');S.t=await pop(R,'pa-t17tanker',{x:-.2,y:.2,h:1.0,face:1},.5);R.fx('drop',-.1,.5,12,{w:.4,t:1.6,vy:-.5});await S.t.wag(1,.03,3);R.word('Oh no!',.5,1.8,'#e03131',1.4);}
};
page('c17',1,{old:[['smoke',T17a.smoke],['exhaust',T17a.exhaust],['litter',T17a.litter],['oil',T17a.oil]],neu:[['smoke',T17a.smoke],['exhaust',T17a.exhaust],['litter',T17a.litter],['oil',T17a.oil]]});
const T17b={
 biking:async(R,S)=>{await R.bg('street');R.label('Biking & walking','#2b8a3e');S.b=await pop(R,'pa-k17bike',{x:-2.2,y:.1,h:1.0,face:1},.2);await S.b.go(1.4,.1,3.4);R.fx('sparkle',1.0,.6,14,{w:1.2,t:1.3});R.word('Clean air!',0,1.9,'#2b8a3e',1.4);},
 trees:async(R,S)=>{await R.bg('creek-clean');R.label('Trees clean the air','#2b8a3e');S.k=await pop(R,'pa-k17plant',{x:-.5,y:.15,h:.9,face:1},.5);const t=pr(R,'tree',.8,.25,.95);if(t){const s0=t.scale.x;t.scale.setScalar(s0*.1);await R.T(1.4,e=>t.scale.setScalar(s0*(.1+.9*e)));}R.fx('sparkle',.8,1.0,16,{w:.6,t:1.4});await S.k.jump(.1);},
 picking:async(R,S)=>{await R.bg('creek-dirty');R.label('Pick up litter','#2b8a3e');S.k=await pop(R,'pa-k17beach',{x:-.5,y:.15,h:.85,face:1},.5);await S.k.wag(1,.04,4);R.fx('sparkle',-.5,.6,12,{w:.8,t:1.2});await R.bg('creek-clean');S.d=await pop(R,'pa-d17happy',{x:.2,y:.3,h:.55,face:1},.5);R.fx('heart',.2,1.1,8,{w:.8,t:1.5});await S.d.jump(.1);}
};
page('c17',2,{old:[['biking',T17b.biking],['trees',T17b.trees],['picking',T17b.picking]],neu:[['biking',T17b.biking],['trees',T17b.trees],['picking',T17b.picking]]});
const T17c={
 care:async(R,S)=>{await R.bg('street');R.label('Care about Air!','#1c7ed6');R.word('Care About Air!',0,2.0,'#1c7ed6',1.3);S.b=await pop(R,'pa-k17bike',{x:-2.2,y:.1,h:1.0,face:1},.2);await S.b.go(1.3,.1,3);},
 waste:async(R,S)=>{await R.bg('bathroom');R.label("Don't waste water!",'#1c7ed6');S.k=await pop(R,'pa-k17tap',{x:-.2,y:.15,h:1.35,face:1},.5);R.fx('drop',.3,1.1,10,{w:.1,t:1.2,vy:-1});await R.wait(.8);await S.k.jump(.1);R.word('Drip stopped!',.6,1.9,'#2b8a3e',1.2);},
 litter:async(R,S)=>{await R.bg('park-bin');R.label('No more litter!','#e8590c');S.k=await pop(R,'pa-k17bin',{x:-.2,y:.15,h:1.3,face:1},.5);const p=pr(R,'paper',-.9,1.9,.35);if(p)await R.toss(p,.3,.45,1.0,.4);R.fx('sparkle',.4,.6,12,{w:.5,t:1.2});await S.k.jump(.12);},
 ocean:async(R,S)=>{await R.bg('isle');R.label('Save our ocean!','#0b7285');S.k=await pop(R,'pa-k17beach',{x:-.3,y:.1,h:1.2,face:1},.5);R.fx('splash',-1.4,.5,12,{w:.5,t:1.4});await S.k.wag(1,.04,4);R.fx('heart',-.3,1.5,10,{w:.8,t:1.5});}
};
page('c17',3,{old:[['care',T17c.care],['waste',T17c.waste],['litter',T17c.litter],['ocean',T17c.ocean]],neu:[['care',T17c.care],['waste',T17c.waste],['litter',T17c.litter],['ocean',T17c.ocean]]});

/* ===== lesson 18: Energy in, movement out ===== */
const T18a={
 pressing:async(R,S)=>{await R.bg('hall');R.label('Press a button','#d6336c');S.k=await pop(R,'pa-k18btn',{x:.1,y:.1,h:1.5,face:1});await S.k.jump(.1);R.fx('sparkle',1.0,1.2,10,{w:.4,t:1.2});},
 turning:async(R,S)=>{await R.bg('livingroom');R.label('Turn a key','#e8a900');S.k=await pop(R,'pa-k18wind',{x:-.3,y:.1,h:1.4,face:1});await S.k.wag(1.4,.06,7);R.word('Click, click!',.4,1.9,'#e8590c',1.3);},
 flipping:async(R,S)=>{await S.k.hide(.3);R.label('Flip a switch','#e8a900');S.s=await pop(R,'pa-k18switch',{x:-.3,y:.1,h:1.5,face:1});S.l=pr(R,'lamp',-1.3,.25,.7);await S.s.jump(.1);R.fx('sparkle',-1.3,1.2,18,{w:.8,t:1.6});}
};
page('c18',1,{old:[['pressing',T18a.pressing],['turning',T18a.turning],['flipping',T18a.flipping]],neu:[['pressing',T18a.pressing],['turning',T18a.turning],['flipping',T18a.flipping]]});
const T18b={
 door:async(R,S)=>{await R.bg('hall');R.label('The door opens','#2b8a3e');S.e=await pop(R,'pa-e18open',{x:-.1,y:.1,h:1.5,face:1},.6);R.fx('sparkle',-.1,1.0,16,{w:.8,t:1.4});await S.e.jump(.06);},
 robot:async(R,S)=>{await R.bg('livingroom');R.label('The robot walks','#868e96');S.r=await pop(R,'pa-r18march',{x:-1.5,y:.1,h:.9,face:1},.3);await S.r.walk(1.2,.1,3.4);R.fx('dust',1.0,.12,12,{w:.5,t:1.1});},
 light:async(R,S)=>{R.label('The light shines','#e8a900');S.l=pr(R,'light_bulb',-.3,.2,.8);const r=R.ring(-.3,.8,.5,'#ffd43b');await r.show();R.fx('sparkle',-.3,1.0,22,{w:1,t:1.8});await r.pulse(3,1);await r.hide();}
};
page('c18',2,{old:[['door',T18b.door],['robot',T18b.robot],['light',T18b.light]],neu:[['door',T18b.door],['robot',T18b.robot],['light',T18b.light]]});
const T18c={
 blender:async(R,S)=>{await R.bg('kitchen-day');R.label('Blender: electricity','#e8a900');S.b=await pop(R,'pa-b18blend',{x:-.2,y:.2,h:1.3,face:1},.5);const pl=pr(R,'plug',1.0,.3,.6);R.fx('sparkle',1.0,.8,12,{w:.4,t:1.2});await S.b.shiver(1.8);R.fx('bubble',-.2,1.0,12,{w:.4,t:1.6,vy:.8});},
 car:async(R,S)=>{await R.bg('gas');R.label('Car: fuel','#e8590c');S.c=await pop(R,'pa-c18pump',{x:-.1,y:.1,h:.8,face:1},.5);await S.c.wag(.8,.02,3);R.fx('drop',.5,.6,8,{w:.1,t:1.2,vy:-.5});await S.c.go(1.6,.1,2.2);},
 pinwheel:async(R,S)=>{await R.bg('park-wind');R.label('Pinwheel: wind','#1c7ed6');R.leaves(5,18);S.w=pr(R,'pinwheel',-.2,1.0,.9);spin(R,S.w,12);await R.wait(2.2);},
 food:async(R,S)=>{await R.bg('kitchen-day');R.label('You: food!','#2b8a3e');S.k=await pop(R,'pa-k18btn',{x:-.4,y:.15,h:1.5,face:1});const a=pr(R,'apple',1.4,1.9,.55);if(a)await R.toss(a,.2,.5,1.0,.5);R.fx('sparkle',-.4,1.2,18,{w:.8,t:1.5});await S.k.jump(.2);await S.k.jump(.2);R.fx('heart',-.4,1.8,8,{w:.8,t:1.5});}
};
page('c18',3,{old:[['blender',T18c.blender],['car',T18c.car],['pinwheel',T18c.pinwheel],['food',T18c.food]],neu:[['blender',T18c.blender],['car',T18c.car],['pinwheel',T18c.pinwheel],['food',T18c.food]]});
P.DIR.mount();
})();
