/* Theory pages rebuilt with fuller scenes: lesson 5 (pages 1 and 3), lessons 16-18 (pages 1-3). */
(function(){
"use strict";
const P=window.PM;if(!P||!P.DIR)return;
const page=P.DIR.page,W=P.PIC.W,H=P.PIC.H;
const all=ps=>Promise.all(ps);
const pr=(R,n,x,y,s)=>R.prop(n,x,y,s);
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
P.DIR.mount();
})();
