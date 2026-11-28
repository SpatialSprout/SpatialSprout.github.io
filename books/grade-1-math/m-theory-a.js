/* Grade 1 Math: staged 3D theory pages (group a). Generated from snippets. ASCII only. */
(function(){
"use strict";
const P=window.PM;if(!P||!P.DIR||!P.G1H||!P.G1X||!P.MK)return;
const page=P.DIR.page;P.MU=P.MU||{};
const {all,pop,liteq,mkq,hearts,tin,tout,glow,moveT,fly,tileFly,squash,wave}=P.G1H;
const {blk,rowX,sentence,reflow,bfly,bshake,bpulse,bout,bcross,recolor,mk,enter,drop,popIn,cheer,crates,intoCrate,markB,speak}=P.G1X;
const {gfx}=P.MK;
const {tally,mark,clock,turn,pie,split,shape,chart,tframe,growF,nline,drawN,ell,span,drawS,pulse,num,balance,pencil,shade,bar,cube,tower,tag,growX,growY,slideB,glowB,vline,hline,drawL,fadeL,boing}=P.MK;
const rnd=(a,b)=>a+Math.random()*(b-a);
/* ---------- compare1 ---------- */
{
const KH=1.45;
const C1={big:'#1c7ed6',bigger:'#7048e8',biggest:'#e8590c',same:'#2b8a3e'};
{const B={
 'today we are going to compare':async(R,S)=>{await R.bg('classroom');R.label('Let us compare!','#7048e8');S.G=gfx(R);
  R.word('Compare!',0,1.7,'#7048e8',1.1);},
 'here comes leo':async(R,S)=>{S.leo=await enter(R,'pa-leowave',-1.7,KH,{sec:1.2});speak(S.leo,'Two balls!',1800);},
 'it is small':async(R,S)=>{S.a=await popIn(R,'ball',-.5,.2,.32);S.ta=await tag(R,S.G,'small',-.5,.85,C1.big);await S.a.jump(.2);},
 'it is big':async(R,S)=>{S.b=await drop(R,'ball',.95,.2,.95);S.tb=await tag(R,S.G,'big',.95,1.45,C1.biggest);await boing(R,S.b,.15);},
 'bigger than the small ball':async(R,S)=>{S.tb.text='bigger';recolor(R,S.tb,C1.bigger);await all([glowB(R,S.tb,.9),boing(R,S.b,.2),S.leo.swap('pa-leocheer',.25,{h:KH})]);
  hearts(R,.95,1.7,6);}
};
page('compare1',0,{old:mkq(B),neu:mkq(B),tm:{"today we are going to compare": 1.28, "here comes leo": 8.69, "it is small": 13.18, "it is big": 17.0, "bigger than the small ball": 20.21}});}
{const B={
 'mia grew three pumpkins':async(R,S)=>{await R.bg('farm23');R.label('Big, bigger, biggest','#e8590c');S.G=gfx(R);
  S.mia=await enter(R,'pa-miawave',-1.85,KH,{sec:1.1});speak(S.mia,'My pumpkins!',1800);},
 'this pumpkin is big':async(R,S)=>{S.p1=await popIn(R,'pa-pumpkin',-.85,.2,.4);S.t1=await tag(R,S.G,'big',-.85,.95,C1.big);},
 'this pumpkin is bigger':async(R,S)=>{S.p2=await popIn(R,'pa-pumpkin',.1,.2,.62);S.t2=await tag(R,S.G,'bigger',.1,1.15,C1.bigger);},
 'the biggest of all':async(R,S)=>{S.p3=await drop(R,'pa-pumpkin',1.25,.2,.95);R.fx('dust',1.25,.25,14,{w:1,t:.8});S.t3=await tag(R,S.G,'biggest',.55,1.75,C1.biggest);await boing(R,S.p3,.14);},
 'big bigger biggest':async(R,S)=>{for(const[p,t]of[[S.p1,S.t1],[S.p2,S.t2],[S.p3,S.t3]]){await all([p.jump(.22),glowB(R,t,.5)]);}},
 'gets a shiny crown':async(R,S)=>{S.cr=await drop(R,'pa-crown',1.22,.96,.34,{spin:0});R.fx('sparkle',1.25,1.3,16,{w:.6,t:1});
  await S.mia.swap('pa-miacheer',.25,{h:KH});await cheer(R,[S.mia,S.p3],1.2,1.7);}
};
page('compare1',1,{old:mkq(B),neu:mkq(B),tm:{"mia grew three pumpkins": 0, "this pumpkin is big": 4.47, "this pumpkin is bigger": 6.7, "the biggest of all": 10.91, "big bigger biggest": 12.23, "gets a shiny crown": 16.55}});}
{const B={
 'tim is building towers':async(R,S)=>{await R.bg('playroom1');R.label('Tall, taller, tallest','#2b8a3e');S.G=gfx(R);
  S.tim=await enter(R,'pa-timwave',-1.85,KH,{sec:1.1});speak(S.tim,'Up, up, up!',1800);},
 'the first tower has two blocks':async(R,S)=>{S.w1=tower(S.G,-.8,2,'#4dabf7',{sz:.24});await S.w1.build(R,.3);},
 'it is tall':async(R,S)=>{S.t1=await tag(R,S.G,'tall',-.8,S.w1.top()+.25,C1.big,.28);},
 'the next tower has four blocks':async(R,S)=>{S.w2=tower(S.G,.15,4,'#69db7c',{sz:.24});await S.w2.build(R,.28);},
 'it is taller':async(R,S)=>{S.t2=await tag(R,S.G,'taller',.15,S.w2.top()+.25,C1.bigger,.28);},
 'the last tower has six blocks':async(R,S)=>{S.w3=tower(S.G,1.15,6,'#ff922b',{sz:.24});await S.w3.build(R,.26);},
 'it is the tallest':async(R,S)=>{S.t3=await tag(R,S.G,'tallest',1.15,S.w3.top()+.25,C1.biggest,.28);await S.w3.hop(R,.12);},
 'reaches up the highest':async(R,S)=>{S.l=hline(S.G,S.w3.top(),-1.2,1.5,'#e03131');await drawL(R,S.l,.8);await S.w3.glow(R);
  await S.tim.swap('pa-timcheer',.25,{h:KH});await cheer(R,[S.tim],1.1,1.9);}
};
page('compare1',2,{old:mkq(B),neu:mkq(B),tm:{"tim is building towers": 0, "the first tower has two blocks": 2.58, "it is tall": 5.23, "the next tower has four blocks": 6.88, "it is taller": 9.54, "the last tower has six blocks": 11.27, "it is the tallest": 14.0, "reaches up the highest": 17.79}});}
{const B={
 'now let us look for the short one':async(R,S)=>{await R.bg('farm23');R.label('Short, shorter, shortest','#0c8599');S.G=gfx(R);},
 'here are three animals':async(R,S)=>{S.cat=await enter(R,'pa-cat2',-1.2,.62,{sec:1});S.hor=await enter(R,'pa-horse',.0,1.0,{from:-2.9,sec:1.2});S.gir=await enter(R,'pa-giraffe',1.25,1.75,{from:2.9,sec:1.3});},
 'the cat is short':async(R,S)=>{S.t1=await tag(R,S.G,'short',-1.2,1.0,C1.big,.28);await S.cat.jump(.2);},
 'taller than the cat':async(R,S)=>{S.t2=await tag(R,S.G,'taller',.0,1.4,C1.bigger,.28);await S.hor.jump(.15);},
 'the giraffe is the tallest':async(R,S)=>{S.t3=await tag(R,S.G,'tallest',.6,1.9,C1.biggest,.28);await S.gir.grow(1,1.08,.4);await S.gir.grow(1,1,.3);},
 'who is the shortest':async(R,S)=>{R.word('?',-.1,1.75,'#e8590c',1.2);await all([S.cat.shiver(.5),S.hor.shiver(.5),S.gir.shiver(.5)]);},
 'the cat is the shortest':async(R,S)=>{S.t1.text='shortest';recolor(R,S.t1,'#e03131');await all([glowB(R,S.t1,.9),S.cat.jump(.3)]);hearts(R,-1.2,1.0,8);}
};
page('compare1',3,{old:mkq(B),neu:mkq(B),tm:{"now let us look for the short one": 0, "here are three animals": 2.14, "the cat is short": 6.93, "taller than the cat": 10.23, "the giraffe is the tallest": 11.5, "who is the shortest": 15.46, "the cat is the shortest": 16.79}});}
{const B={
 'here is a smart trick':async(R,S)=>{await R.bg('classroom');R.label('A smart trick','#c2255c');S.G=gfx(R);
  S.tch=await enter(R,'pa-teacher',-1.85,1.55,{sec:1.1});speak(S.tch,'Listen!',1500);},
 'compare just two things':async(R,S)=>{S.w1=tower(S.G,-.75,3,'#4dabf7',{sz:.24});S.w2=tower(S.G,.05,5,'#69db7c',{sz:.24});await all([S.w1.build(R,.25),S.w2.build(R,.25)]);
  S.n2=await tag(R,S.G,'2 things',-.35,2.0,'#495057',.26);},
 'we say taller':async(R,S)=>{S.b1=blk(S.G,'tall',-.55,1.65,'#7048e8',.34);S.b2=blk(S.G,'er',.05,1.65,'#e8590c',.34);await tin(R,S.b1,.3);await tin(R,S.b2,.3);
  await all([bfly(R,S.b2,S.b1.x+.2,1.65,.45),S.w2.hop(R,.12)]);await bout(R,[S.b2],.12);S.b1.text='taller';S.b1.c1=null;R.fx('sparkle',S.b1.x,1.65,14,{w:.6,t:.7});await glowB(R,S.b1,.8);},
 'three or more things':async(R,S)=>{await bout(R,[S.b1,S.n2],.3);S.w3=tower(S.G,.85,7,'#ff922b',{sz:.24});await S.w3.build(R,.22);
  S.n3=await tag(R,S.G,'3 things',-.35,2.0,'#495057',.26);},
 'we say tallest':async(R,S)=>{S.b3=blk(S.G,'tall',-.6,1.65,'#7048e8',.34);S.b4=blk(S.G,'est',.0,1.65,'#e8590c',.34);await tin(R,S.b3,.3);await tin(R,S.b4,.3);
  await all([bfly(R,S.b4,S.b3.x+.2,1.65,.45),S.w3.hop(R,.12)]);await bout(R,[S.b4],.12);S.b3.text='tallest';R.fx('sparkle',S.b3.x,1.65,14,{w:.6,t:.7});await glowB(R,S.b3,.8);},
 'two things taller':async(R,S)=>{await all([S.w1.glow(R),S.w2.glow(R)]);},
 'three things tallest':async(R,S)=>{await all([S.w1.glow(R),S.w2.glow(R),S.w3.glow(R)]);await cheer(R,[S.tch],.2,1.9);}
};
page('compare1',4,{old:mkq(B),neu:mkq(B),tm:{"here is a smart trick": 0, "compare just two things": 2.82, "we say taller": 4.41, "three or more things": 6.91, "we say tallest": 8.36, "two things taller": 9.34, "three things tallest": 11.38}});}
{const B={
 'ava has three ribbons':async(R,S)=>{await R.bg('playroom1');R.label('Long, longer, longest','#e8590c');S.G=gfx(R);
  S.ava=await enter(R,'pa-avawave',-1.9,KH,{sec:1.1});
  S.r=[bar(S.G,-.6,1.55,1.3,.2,'#e03131',{fx:0,stripe:true}),bar(S.G,-1.2,1.05,1.9,.2,'#1c7ed6',{fx:0,stripe:true}),bar(S.G,-.9,.55,2.5,.2,'#2b8a3e',{fx:0,stripe:true})];
  for(const b of S.r){await growX(R,b,.6);}},
 'which one is the longest':async(R,S)=>{R.word('?',1.6,1.8,'#e8590c',1.1);await all(S.r.map(b=>glowB(R,b,.6)));},
 'line up the ends':async(R,S)=>{S.l=vline(S.G,-1.3,.4,1.9,'#e03131');await drawL(R,S.l,.6);await all(S.r.map(b=>slideB(R,b,-1.3,b.y,.8)));R.fx('sparkle',-1.3,1.1,12,{w:.2,h:1.3,t:.8});},
 'easy to see':async(R,S)=>{S.e=vline(S.G,1.25,.4,1.9,'#868e96');await drawL(R,S.e,.5);},
 'the red ribbon is long':async(R,S)=>{S.t1=await tag(R,S.G,'long',.25,1.95,C1.big,.26);await glowB(R,S.r[0]);},
 'the blue ribbon is longer':async(R,S)=>{S.t2=await tag(R,S.G,'longer',.85,1.42,C1.bigger,.26);await glowB(R,S.r[1]);},
 'the green ribbon is the longest':async(R,S)=>{S.t3=await tag(R,S.G,'longest',1.5,.92,C1.biggest,.26);await glowB(R,S.r[2],.9);
  await S.ava.swap('pa-avacheer',.25,{h:KH});await cheer(R,[S.ava],.3,1.7);}
};
page('compare1',5,{old:mkq(B),neu:mkq(B),tm:{"ava has three ribbons": 0, "which one is the longest": 1.97, "line up the ends": 5.7, "easy to see": 11.65, "the red ribbon is long": 12.61, "the blue ribbon is longer": 14.87, "the green ribbon is the longest": 17.24}});}
{const B={
 'sometimes two things are the same':async(R,S)=>{await R.bg('classroom');R.label('The same','#2b8a3e');S.G=gfx(R);
  S.p1=pencil(S.G,-1.0,1.3,1.9,'#fcc419',{h:.24});S.p2=pencil(S.G,-1.0,.75,1.9,'#4dabf7',{h:.24});await tin(R,S.p1,.4);await tin(R,S.p2,.4);},
 'start at the same line':async(R,S)=>{S.a=vline(S.G,-1.0,.45,1.65,'#e03131');await drawL(R,S.a,.6);await all([glowB(R,S.p1,.5),glowB(R,S.p2,.5)]);},
 'end at the same line':async(R,S)=>{S.b=vline(S.G,.9,.45,1.65,'#e03131');await drawL(R,S.b,.6);await all([glowB(R,S.p1,.5),glowB(R,S.p2,.5)]);},
 'they are the same length':async(R,S)=>{S.t=await tag(R,S.G,'same length',-.2,1.95,C1.same,.3);R.word('=',1.1,1.0,'#2b8a3e',1.2);},
 'neither one is longer':async(R,S)=>{await all([slideB(R,S.p1,-1.0,1.4,.3),slideB(R,S.p2,-1.0,.65,.3)]);await all([slideB(R,S.p1,-1.0,1.3,.3),slideB(R,S.p2,-1.0,.75,.3)]);},
 'now you can compare':async(R,S)=>{await all([bout(R,[S.t],.3),bout(R,[S.p1,S.p2],.3),fadeL(R,S.a),fadeL(R,S.b)]);
  const cast=[['pa-leocheer',-1.6],['pa-miacheer',-.55],['pa-timcheer',.5],['pa-avacheer',1.5]];S.c=[];
  for(const[k,x]of cast){S.c.push(await popIn(R,k,x,.15,1.2));}await cheer(R,S.c,0,1.8);}
};
page('compare1',6,{old:mkq(B),neu:mkq(B),tm:{"sometimes two things are the same": 0, "start at the same line": 3.95, "end at the same line": 6.19, "they are the same length": 7.62, "neither one is longer": 9.68, "now you can compare": 15.06}});}
P.MU['compare1']=[{"say": "What does compare mean?", "speech": "Hello, friends! Today we are going to compare. To compare means to look at two things, and find out how they are different. Here comes Leo with two balls. Look at this ball. It is small. Now look at that ball. It is big. The big ball is bigger than the small ball."}, {"say": "Big, bigger, biggest", "speech": "Mia grew three pumpkins in her garden. Look closely. This pumpkin is big. This pumpkin is bigger. And this pumpkin is the biggest of all! Big, bigger, biggest. The biggest pumpkin gets a shiny crown!"}, {"say": "Tall, taller, tallest", "speech": "Tim is building towers with blocks. The first tower has two blocks. It is tall. The next tower has four blocks. It is taller. The last tower has six blocks. It is the tallest! The tallest tower reaches up the highest."}, {"say": "Short, shorter, shortest", "speech": "Now let us look for the short one. Here are three animals: a cat, a horse, and a giraffe. The cat is short. The horse is taller than the cat. The giraffe is the tallest of all. So, who is the shortest? The cat is the shortest!"}, {"say": "Two things or three things?", "speech": "Here is a smart trick. When we compare just two things, we say taller. When we compare three or more things, we say tallest. Two things, taller. Three things, tallest."}, {"say": "Long, longer, longest", "speech": "Ava has three ribbons. Which one is the longest? First, we line up the ends on one side, just like runners at the start line. Now it is easy to see. The red ribbon is long. The blue ribbon is longer. The green ribbon is the longest!"}, {"say": "The same", "speech": "Sometimes two things are the same. These two pencils start at the same line, and they end at the same line. They are the same length. Neither one is longer. Bigger, taller, longer, and the same. Now you can compare like a pro!"}];
}
/* ---------- compare2 ---------- */
{
const KH=1.45;
const CC={a:'#1c7ed6',b:'#7048e8',c:'#e8590c',g:'#2b8a3e',r:'#e03131'};
{const B={
 'nora is at the park':async(R,S)=>{await R.bg('park');R.label('Wide and narrow','#1c7ed6');S.G=gfx(R);
  S.nora=await enter(R,'pa-norawave',-1.9,KH,{sec:1.1});},
 'two roads for toy cars':async(R,S)=>{S.w=bar(S.G,-1.2,.25,2.4,.8,'#868e96',{fx:0});S.n=bar(S.G,-1.2,1.4,2.4,.26,'#868e96',{fx:0});await all([growX(R,S.w,.8),growX(R,S.n,.8)]);},
 'this road is wide':async(R,S)=>{S.aw=span(S.G,1.38,.27,1.38,1.03,CC.c);await drawS(R,S.aw,.5);S.tw=await tag(R,S.G,'wide',.8,1.17,CC.c,.28);},
 'three cars can drive':async(R,S)=>{S.cars=[];for(const[y,d]of[[.3,0],[.55,.25],[.8,.5]]){const c=mk(R,'pa-toycar',{x:-1.6,y:y+.12,h:.27,face:1});S.cars.push(c);c.show(.2);}
  await all(S.cars.map((c,i)=>R.wait(i*.15).then(()=>c.go(.5-i*.3,[.42,.67,.92][i],1.4,{lin:true,wob:.01}))));},
 'that road is narrow':async(R,S)=>{S.an=span(S.G,1.38,1.42,1.38,1.64,CC.a);await drawS(R,S.an,.4);S.tn=await tag(R,S.G,'narrow',.8,1.9,CC.a,.28);},
 'only one car can fit':async(R,S)=>{S.c4=mk(R,'pa-toycar',{x:-1.6,y:1.5,h:.24,face:1});await S.c4.show(.2);await S.c4.go(.6,1.5,1.4,{lin:true,wob:.01});},
 'lots of space':async(R,S)=>{await all([glowB(R,S.w,.8),glowB(R,S.tw,.8)]);},
 'only a little space':async(R,S)=>{await all([glowB(R,S.n,.8),glowB(R,S.tn,.8)]);await S.nora.jump(.25);}
};
page('compare2',0,{old:mkq(B),neu:mkq(B),tm:{"nora is at the park": 0, "two roads for toy cars": 3.04, "this road is wide": 4.78, "three cars can drive": 6.82, "that road is narrow": 10.79, "only one car can fit": 12.87, "lots of space": 16.7, "only a little space": 20.54}});}
{const B={
 'here are three paths':async(R,S)=>{await R.bg('sunhill1');R.label('Widest and narrowest','#7048e8');S.G=gfx(R);
  S.p=[bar(S.G,-1.0,1.6,2.0,.16,'#c08a5a',{fx:0}),bar(S.G,-1.0,1.05,2.0,.32,'#c08a5a',{fx:0}),bar(S.G,-1.0,.25,2.0,.55,'#c08a5a',{fx:0})];
  S.L=[];for(const[i,y]of[[0,1.68],[1,1.21],[2,.52]]){S.L.push(await num(R,S.G,'ABC'[i],-1.35,y,'#495057',.3));await growX(R,S.p[i],.5);}},
 'path a is narrow':async(R,S)=>{S.t0=await tag(R,S.G,'narrow',1.4,1.68,CC.a,.26);await glowB(R,S.p[0]);},
 'path b is wider':async(R,S)=>{S.t1=await tag(R,S.G,'wider',1.4,1.21,CC.b,.26);await glowB(R,S.p[1]);},
 'the widest of all':async(R,S)=>{S.t2=await tag(R,S.G,'widest',1.4,.52,CC.c,.26);S.bun=await enter(R,'rabbit',-1.6,.4,{y:.3,sec:.9});await S.bun.go(.7,.3,1.4,{hops:5});},
 'which path is the narrowest':async(R,S)=>{R.word('?',.3,1.95,'#e8590c',1.1);await all(S.p.map(b=>glowB(R,b,.5)));},
 'path a is the narrowest':async(R,S)=>{S.t0.text='narrowest';recolor(R,S.t0,CC.r);S.ant=mk(R,'ant',{x:-.9,y:1.6,h:.16,face:1});await S.ant.show(.2);await all([glowB(R,S.t0,.9),S.ant.go(.8,1.6,1.6,{wob:.01})]);}
};
page('compare2',1,{old:mkq(B),neu:mkq(B),tm:{"here are three paths": 0, "path a is narrow": 2.26, "path b is wider": 4.13, "the widest of all": 7.5, "which path is the narrowest": 9.69, "path a is the narrowest": 11.45}});}
{const B={
 'look at these two beds':async(R,S)=>{await R.bg('livingroom');R.label('Thick and thin','#0c8599');S.G=gfx(R);
  S.ma=await drop(R,'pa-mattress',-1.0,.2,.75);S.mt=await drop(R,'pa-mat',.9,.2,.55);},
 'the mattress is thick':async(R,S)=>{S.sp1=span(S.G,-1.85,.25,-1.85,.82,CC.c);await drawS(R,S.sp1);S.t1=await tag(R,S.G,'thick',-1.0,1.25,CC.c,.28);},
 'soft and puffy':async(R,S)=>{await S.ma.grow(1.05,1.12,.3);await S.ma.grow(1,1,.3);},
 'the mat is thin':async(R,S)=>{S.t2=await tag(R,S.G,'thin',.9,1.0,CC.a,.28);await glowB(R,S.t2);},
 'now look at two books':async(R,S)=>{await all([S.ma.hide(.3),S.mt.hide(.3),bout(R,[S.t1,S.t2],.3),fadeL(R,S.sp1,.3)]);
  S.d=await drop(R,'pa-dictionary',-.8,.2,.85);S.c=await drop(R,'pa-comic',.9,.2,.7);},
 'the dictionary is thick':async(R,S)=>{S.t3=await tag(R,S.G,'thick',-.8,1.3,CC.c,.28);await S.d.jump(.15);},
 'many many pages':async(R,S)=>{R.fx('sparkle',-.8,.7,14,{w:.8,t:.9});},
 'the comic book is thin':async(R,S)=>{S.t4=await tag(R,S.G,'thin',.9,1.15,CC.a,.28);await S.c.jump(.15);}
};
page('compare2',2,{old:mkq(B),neu:mkq(B),tm:{"look at these two beds": 0, "the mattress is thick": 1.68, "soft and puffy": 4.99, "the mat is thin": 6.22, "now look at two books": 11.03, "the dictionary is thick": 13.11, "many many pages": 15.87, "the comic book is thin": 17.22}});}
{const B={
 'this is a balance':async(R,S)=>{await R.bg('classroom');R.label('Heavier and lighter','#e8590c');S.G=gfx(R);
  S.B=balance(S.G,R,.1,{arm:1.0,post:1.0});S.B.s=1;R.fx('sparkle',.1,1.2,16,{w:1.6,t:.9});S.tim=await enter(R,'pa-timpoint',-1.95,1.35,{sec:1});},
 'put a brick on this side':async(R,S)=>{S.br=mk(R,'pa-brick',{x:-1.3,y:1.9,h:.3,face:1});await S.br.show(.3,'pop');await S.B.put(R,S.br,0);},
 'a feather on that side':async(R,S)=>{S.fe=mk(R,'pa-feather2',{x:1.6,y:1.9,h:.32,face:1});await S.fe.show(.3,'pop');await S.B.put(R,S.fe,1);},
 'down goes the brick':async(R,S)=>{await S.B.tilt(R,.32,1.0);R.fx('dust',S.B.ends()[0].x,.4,10,{w:.5,t:.6});},
 'the brick is heavier':async(R,S)=>{const e=S.B.ends()[0];S.t1=await tag(R,S.G,'heavier',e.x,.25,CC.c,.28);},
 'up goes the feather':async(R,S)=>{await S.fe.jump(.15);},
 'the feather is lighter':async(R,S)=>{const e=S.B.ends()[1];S.t2=await tag(R,S.G,'lighter',e.x,e.y+.3,CC.a,.28);await S.tim.swap('pa-timcheer',.25,{h:1.35});}
};
page('compare2',3,{old:mkq(B),neu:mkq(B),tm:{"this is a balance": 0, "put a brick on this side": 5.67, "a feather on that side": 7.53, "down goes the brick": 8.92, "the brick is heavier": 10.99, "up goes the feather": 13.08, "the feather is lighter": 15.02}});}
{const B={
 'try an apple and a watermelon':async(R,S)=>{await R.bg('kitchen-day');R.label('The same weight','#2b8a3e');S.G=gfx(R);
  S.B=balance(S.G,R,.1,{arm:1.0,post:1.0});S.mia=await enter(R,'pa-miawave',-1.95,1.35,{sec:1});
  S.ap=mk(R,'pa-apple2',{x:-1.2,y:1.9,h:.28,face:1});await S.ap.show(.3,'pop');await S.B.put(R,S.ap,0);
  S.wm=mk(R,'pa-watermelon',{x:1.5,y:1.9,h:.42,face:1});await S.wm.show(.3,'pop');await S.B.put(R,S.wm,1);},
 'the watermelon side goes down':async(R,S)=>{await S.B.tilt(R,-.32,1.0);R.fx('dust',S.B.ends()[1].x,.4,10,{w:.5,t:.6});},
 'heavier than the apple':async(R,S)=>{const e=S.B.ends()[1];S.t1=await tag(R,S.G,'heavier',e.x,.22,CC.c,.28);},
 'an apple on each side':async(R,S)=>{await bout(R,[S.t1],.2);await S.wm.go(2.6,1.2,.7,{arc:.5});S.wm.hide(.2);S.B.on[1]=[];
  S.ap2=mk(R,'pa-apple2',{x:1.5,y:1.9,h:.28,face:1});await S.ap2.show(.3,'pop');await S.B.put(R,S.ap2,1);},
 'the balance stays level':async(R,S)=>{await S.B.tilt(R,0,1.1);S.l=hline(S.G,1.15,-1.2,1.4,'#2b8a3e');await drawL(R,S.l,.6);},
 'weigh the same':async(R,S)=>{S.t2=await tag(R,S.G,'the same',.1,1.85,CC.g,.3);await S.mia.swap('pa-miacheer',.25,{h:1.35});hearts(R,.1,1.6,8);}
};
page('compare2',4,{old:mkq(B),neu:mkq(B),tm:{"try an apple and a watermelon": 0.88, "the watermelon side goes down": 2.94, "heavier than the apple": 7.49, "an apple on each side": 10.5, "the balance stays level": 11.79, "weigh the same": 17.23}});}
{const B={
 'count the ducks in each pond':async(R,S)=>{await R.bg('laketown1');R.label('Most and fewest','#1c7ed6');S.G=gfx(R);
  S.P=[[-1.35,'A',3],[-.1,'B',7],[1.15,'C',5]].map(([x,l,n])=>({x,l,n,e:ell(S.G,x,.55,.56,.3,'#4dabf7',{rim:'#a5d8ff'})}));
  for(const p of S.P){await tin(R,p.e,.4);p.L=await num(R,S.G,p.l,p.x-.22,1.05,'#495057',.3);}
  S.addD=async(R,S,i)=>{const p=S.P[i];p.d=[];for(let k=0;k<p.n;k++){const col=k%3,row=Math.floor(k/3);const x=p.x-.36+col*.36+(row%2)*.12,y=.38+row*.17;const d=mk(R,'pa-duck',{x,y,h:.2,face:1});p.d.push(d);await d.show(.25,'pop');R.fx('sparkle',x,y+.15,4,{w:.15,t:.4});}
   p.N=await num(R,S.G,p.n,p.x+.22,1.05,'#1c7ed6',.32);};},
 'pond a has three ducks':async(R,S)=>{await S.addD(R,S,0);},
 'pond b has seven ducks':async(R,S)=>{await S.addD(R,S,1);},
 'pond c has five ducks':async(R,S)=>{await S.addD(R,S,2);},
 'pond b has the most ducks':async(R,S)=>{S.t1=await tag(R,S.G,'most',0,1.85,CC.c,.3);await all(S.P[1].d.map(d=>d.jump(.15)));},
 'pond a has the fewest ducks':async(R,S)=>{S.t2=await tag(R,S.G,'fewest',-1.35,1.85,CC.a,.3);await all(S.P[0].d.map(d=>d.jump(.15)));},
 'pond c is in between':async(R,S)=>{S.t3=await tag(R,S.G,'in between',1.35,1.85,CC.b,.28);await all(S.P[2].d.map(d=>d.jump(.15)));}
};
page('compare2',5,{old:mkq(B),neu:mkq(B),tm:{"count the ducks in each pond": 0.56, "pond a has three ducks": 2.36, "pond b has seven ducks": 4.66, "pond c has five ducks": 7.17, "pond b has the most ducks": 9.68, "pond a has the fewest ducks": 12.26, "pond c is in between": 14.8}});}
{const B={
 'which group has more':async(R,S)=>{await R.bg('forest1');R.label('Match them up','#2b8a3e');S.G=gfx(R);
  S.pads=[];for(let i=0;i<4;i++){const e=ell(S.G,-1.35+i*.75,.4,.28,.1,'#40c057',{rim:'#8ce99a'});S.pads.push(e);}
  S.fr=[];for(let i=0;i<6;i++){const f=mk(R,'pa-frog',{x:-1.6+i*.6,y:1.35,h:.32,face:1});S.fr.push(f);f.show(.35,'pop');await R.wait(.12);}
  await all(S.pads.map((p,i)=>R.wait(i*.1).then(()=>tin(R,p,.35))));},
 'match them up one to one':async(R,S)=>{S.lines=[];for(let i=0;i<4;i++){const l=vline(S.G,-1.35+i*.75,.55,1.3,'#ffd43b');S.lines.push(l);drawL(R,l,.4);await R.wait(.15);}},
 'each frog jumps onto a lily pad':async(R,S)=>{await all(S.lines.map(l=>fadeL(R,l,.3)));for(let i=0;i<4;i++){await S.fr[i].go(-1.35+i*.75,.42,.55,{arc:.6});R.fx('splash',-1.35+i*.75,.45,6,{w:.3,t:.5});}},
 'two frogs have no lily pad':async(R,S)=>{await all([S.fr[4].shiver(.7),S.fr[5].shiver(.7)]);R.word('2 extra!',1.3,1.9,'#e8590c',1);},
 'more frogs than lily pads':async(R,S)=>{S.t1=await tag(R,S.G,'more frogs',.3,1.95,CC.c,.3);await all(S.fr.map(f=>f.jump(.12)));},
 'fewer lily pads than frogs':async(R,S)=>{S.t2=await tag(R,S.G,'fewer lily pads',-.3,.95,CC.a,.26);await all(S.pads.map(p=>pulse(R,p,.7)));}
};
page('compare2',6,{old:mkq(B),neu:mkq(B),tm:{"which group has more": 1.02, "match them up one to one": 2.2, "each frog jumps onto a lily pad": 4.59, "two frogs have no lily pad": 8.97, "more frogs than lily pads": 12.42, "fewer lily pads than frogs": 15.53}});}
{const B={
 'wide and narrow':async(R,S)=>{await R.bg('schoolyard1');R.label('Super comparer!','#c2255c');S.G=gfx(R);
  S.w=[];for(const[t,x,y,c]of[['wide',-1.3,1.7,CC.c],['narrow',-.3,1.7,CC.a]]){S.w.push(await tag(R,S.G,t,x,y,c,.28));}},
 'thick and thin':async(R,S)=>{for(const[t,x,y,c]of[['thick',.7,1.7,CC.c],['thin',1.5,1.7,CC.a]]){S.w.push(await tag(R,S.G,t,x,y,c,.28));}},
 'heavier and lighter':async(R,S)=>{for(const[t,x,y,c]of[['heavier',-1.2,1.25,CC.c],['lighter',-.15,1.25,CC.a]]){S.w.push(await tag(R,S.G,t,x,y,c,.28));}},
 'most and fewest':async(R,S)=>{for(const[t,x,y,c]of[['most',.85,1.25,CC.c],['fewest',1.6,1.25,CC.a]]){S.w.push(await tag(R,S.G,t,x,y,c,.28));}},
 'compare so many things':async(R,S)=>{await wave(R,S.w);},
 'you are a super comparer':async(R,S)=>{S.c=[];for(const[k,x]of[['pa-norawave',-1.5],['pa-timcheer',-.5],['pa-miacheer',.5],['pa-leocheer',1.5]]){S.c.push(await popIn(R,k,x,.12,.95));}
  await cheer(R,S.c,0,1.0);await R.fx('sparkle',0,1.6,30,{w:3.5,t:1.4});}
};
page('compare2',7,{old:mkq(B),neu:mkq(B),tm:{"wide and narrow": 0, "thick and thin": 1.38, "heavier and lighter": 3.1, "most and fewest": 5.18, "compare so many things": 8.38, "you are a super comparer": 10.09}});}
P.MU['compare2']=[{"say": "Wide and narrow", "speech": "Nora is at the park. She sees two roads for toy cars. This road is wide. Three cars can drive on it, side by side. That road is narrow. Only one car can fit. Wide means lots of space from side to side. Narrow means only a little space."}, {"say": "Widest and narrowest", "speech": "Here are three paths in the garden. Path A is narrow. Path B is wider. Path C is the widest of all. So which path is the narrowest? Path A is the narrowest."}, {"say": "Thick and thin", "speech": "Look at these two beds. The mattress is thick. It is soft and puffy. The mat is thin. It is flat and close to the floor. Now look at two books. The dictionary is thick, with many, many pages. The comic book is thin."}, {"say": "Heavier and lighter", "speech": "This is a balance. It helps us find out which thing is heavier. Let us put a brick on this side, and a feather on that side. Down goes the brick! The brick is heavier. Up goes the feather. The feather is lighter."}, {"say": "The same weight", "speech": "Now let us try an apple and a watermelon. The watermelon side goes down. The watermelon is heavier than the apple. What if we put an apple on each side? The balance stays level. When a balance is level, the two things weigh the same."}, {"say": "Most and fewest", "speech": "Let us count the ducks in each pond. Pond A has three ducks. Pond B has seven ducks. Pond C has five ducks. Pond B has the most ducks. Pond A has the fewest ducks. Pond C is in between."}, {"say": "More and fewer: match them up", "speech": "How can we tell which group has more? Match them up, one to one! Each frog jumps onto a lily pad. Oh no, two frogs have no lily pad. So there are more frogs than lily pads. And there are fewer lily pads than frogs."}, {"say": "You are a super comparer!", "speech": "Wide and narrow. Thick and thin. Heavier and lighter. Most and fewest. You can compare so many things now. You are a super comparer!"}];
}
/* ---------- order1 ---------- */
{
const KH=1.45;
const CC={a:'#1c7ed6',b:'#7048e8',c:'#e8590c',g:'#2b8a3e',r:'#e03131'};
const ITEMS=[['pa-apple2',.46],['pa-pear',.48],['pa-strawberry',.42],['ball',.44],['pa-cubey',.4],['pa-kite',.56]];
/* drop an item into a crate so it pokes out of the top */
const intoC=async(R,a,cr,dx)=>{await a.go(cr.x+(dx||0),.98,.55,{arc:.6});R.fx('dust',cr.x,.95,8,{w:.4,t:.5});cr.c.shiver(.3);a.jump(.1);await R.wait(.15);};
{const B={
 'toy box is a big mix up':async(R,S)=>{await R.bg('playroom1');R.label('What is sorting?','#7048e8');S.G=gfx(R);
  S.leo=await enter(R,'pa-leowave',-1.9,KH,{sec:1});S.box=await drop(R,'pa-toybox',-.6,.2,.6);
  S.it=[];const xs=[-.1,.35,.8,1.25,1.65,.55];const ys=[.25,.25,.25,.25,.25,1.0];
  for(let i=0;i<ITEMS.length;i++){const[k,h]=ITEMS[i];const a=mk(R,k,{x:-.6,y:.6,h,face:1});await a.show(.1);S.it.push(a);a.go(xs[i],ys[i],.6,{arc:.9});await R.wait(.18);}
  await R.wait(.5);await S.box.shiver(.5);},
 'all jumbled together':async(R,S)=>{await all(S.it.map((a,i)=>R.wait(i*.08).then(()=>a.jump(.18))));},
 'to sort means':async(R,S)=>{S.t=await tag(R,S.G,'sort = put the same together',.25,1.9,CC.b,.28);},
 'what is the same':async(R,S)=>{speak(S.leo,'What is the same?',2200);await all(S.it.map(a=>a.shiver(.6)));}
};
page('order1',0,{old:mkq(B),neu:mkq(B),tm:{"toy box is a big mix up": 1.13, "all jumbled together": 5.16, "to sort means": 6.6, "what is the same": 13.47}});}
{const B={
 'the apple the pear':async(R,S)=>{await R.bg('playroom1');R.label('Sort by kind','#2b8a3e');S.G=gfx(R);
  S.cr=await crates(R,S.G,['fruit','toys'],{h:.85,ly:1.3,xs:[-1.0,1.0],cols:[CC.g,CC.a]});
  S.it=[];const xs=[-1.55,-.95,-.35,.35,.95,1.5];for(let i=0;i<ITEMS.length;i++){const[k,h]=ITEMS[i];const a=mk(R,k,{x:xs[i],y:1.6,h,face:1});S.it.push(a);a.show(.35,'pop');await R.wait(.12);}},
 'are all fruit':async(R,S)=>{await all(S.it.slice(0,3).map(a=>a.jump(.2)));},
 'in they go':async(R,S)=>{for(const[i,dx]of[[0,-.26],[1,0],[2,.26]]){await intoC(R,S.it[i],S.cr[0],dx);}},
 'are all toys':async(R,S)=>{await all(S.it.slice(3).map(a=>a.jump(.2)));},
 'in they go too':async(R,S)=>{for(const[i,dx]of[[3,-.26],[4,0],[5,.26]]){await intoC(R,S.it[i],S.cr[1],dx);}},
 'our sorting rule is':async(R,S)=>{S.r=await tag(R,S.G,'Rule: what kind is it?',.05,1.95,CC.b,.28);await all([glowB(R,S.cr[0].b,.8),glowB(R,S.cr[1].b,.8)]);}
};
page('order1',1,{old:mkq(B),neu:mkq(B),tm:{"the apple the pear": 0, "are all fruit": 2.77, "in they go": 3.7, "are all toys": 8.26, "in they go too": 9.1, "our sorting rule is": 10.97}});}
{const B={
 'another way by colour':async(R,S)=>{await R.bg('playroom1');R.label('Sort by colour','#e03131');S.G=gfx(R);
  S.cr=await crates(R,S.G,['red','not red'],{h:.85,ly:1.3,xs:[-1.0,1.0],cols:[CC.r,'#868e96']});
  S.it=[];const xs=[-1.55,-.95,-.35,.35,.95,1.5];for(let i=0;i<ITEMS.length;i++){const[k,h]=ITEMS[i];const a=mk(R,k,{x:xs[i],y:1.6,h,face:1});S.it.push(a);a.show(.35,'pop');await R.wait(.12);}},
 'red things go in this crate':async(R,S)=>{for(const[i,dx]of[[0,-.26],[2,0],[3,.26]]){await intoC(R,S.it[i],S.cr[0],dx);}},
 'not red go in that crate':async(R,S)=>{for(const[i,dx]of[[1,-.26],[4,0],[5,.26]]){await intoC(R,S.it[i],S.cr[1],dx);}},
 'same things but a new rule':async(R,S)=>{S.r=await tag(R,S.G,'Rule: what colour is it?',.05,1.95,CC.r,.28);},
 'more than one way to sort':async(R,S)=>{R.word('2 ways!',.05,1.55,'#7048e8',1.0);await all([S.cr[0].c.jump(.2),S.cr[1].c.jump(.2)]);}
};
page('order1',2,{old:mkq(B),neu:mkq(B),tm:{"another way by colour": 2.34, "red things go in this crate": 4.03, "not red go in that crate": 8.12, "same things but a new rule": 9.68, "more than one way to sort": 13.35}});}
{const B={
 'which one does not belong':async(R,S)=>{await R.bg('laketown1');R.label('Which one does not belong?','#c2255c');S.G=gfx(R);
  S.a=[];for(const[k,x,h]of[['pa-duck',-1.4,.42],['pa-frog',-.5,.45],['turtle',.4,.4],['pa-toycar',1.35,.34]]){const a=await popIn(R,k,x,.25,h);S.a.push(a);}
  R.word('?',0,1.7,'#c2255c',1.1);},
 'are all animals':async(R,S)=>{S.t=await tag(R,S.G,'animals',-.5,1.35,CC.g,.3);await all(S.a.slice(0,3).map(a=>a.jump(.2)));S.ring=span(S.G,-1.75,1.05,.75,1.05,CC.g);await drawS(R,S.ring,.5);},
 'the car is not an animal':async(R,S)=>{S.x=blk(S.G,'X',1.35,.5,CC.r,.5);await tin(R,S.x,.3);await S.a[3].shiver(.7);},
 'does not belong in this group':async(R,S)=>{S.t2=await tag(R,S.G,'does not belong',1.2,1.35,CC.r,.26);},
 'off it goes':async(R,S)=>{await bout(R,[S.x],.2);await S.a[3].go(3.0,.25,1.2,{lin:true,wob:.02});R.fx('dust',2.2,.3,10,{w:.6,t:.7});}
};
page('order1',3,{old:mkq(B),neu:mkq(B),tm:{"which one does not belong": 0, "are all animals": 4.98, "the car is not an animal": 6.94, "does not belong in this group": 9.47, "off it goes": 11.28}});}
{const B={
 'put things in order':async(R,S)=>{await R.bg('classroom');R.label('Order: shortest to tallest','#0c8599');S.G=gfx(R);},
 'here are four towers':async(R,S)=>{S.T={};S.L={};const def=[['A',4,'#4dabf7'],['B',2,'#69db7c'],['C',6,'#ff922b'],['D',3,'#da77f2']];
  for(let i=0;i<4;i++){const[l,n,c]=def[i];const x=-1.2+i*.85;S.T[l]=tower(S.G,x,n,c,{sz:.24});await S.T[l].build(R,.2);S.L[l]=blk(S.G,l,x,.06,'#495057',.22);await tin(R,S.L[l],.25);}},
 'they are all mixed up':async(R,S)=>{await all(Object.values(S.T).map(t=>t.hop(R,.1)));},
 'from the shortest to the tallest':async(R,S)=>{S.ar=span(S.G,-1.4,1.95,1.6,1.95,CC.c);await drawS(R,S.ar,.6);},
 'b then d then a then c':async(R,S)=>{const ord=['B','D','A','C'];
  for(let i=0;i<4;i++){const l=ord[i],x=-1.2+i*.85;await all([S.T[l].slide(R,x,.6),slideB(R,S.L[l],x,S.L[l].y,.6)]);}},
 'just like stairs':async(R,S)=>{S.st=[];const ord=['B','D','A','C'];for(let i=0;i<4;i++){await S.T[ord[i]].glow(R);}
  S.kid=mk(R,'pa-milodance',{x:-1.75,y:.2,h:.7,face:1});await S.kid.show(.3,'pop');
  for(let i=0;i<4;i++){const t=S.T[ord[i]];await S.kid.go(-1.2+i*.85,t.top(),.45,{arc:.35});}hearts(R,1.35,1.95,8);}
};
page('order1',4,{old:mkq(B),neu:mkq(B),tm:{"put things in order": 0.83, "here are four towers": 2.12, "they are all mixed up": 5.95, "from the shortest to the tallest": 9.7, "b then d then a then c": 11.56, "just like stairs": 16.15}});}
{const B={
 'order by how many':async(R,S)=>{await R.bg('kitchen-day');R.label('Order by how many','#e8590c');S.G=gfx(R);
  S.pl=[[-1.3,5],[0,2],[1.3,8]].map(([x,n])=>({x,n,e:ell(S.G,x,.45,.55,.18,'#f1f3f5',{rim:'#ced4da'}),c:[]}));for(const p of S.pl)await tin(R,p.e,.35);
  S.fill=async(i)=>{const p=S.pl[i];for(let k=0;k<p.n;k++){const col=k%4,row=Math.floor(k/4);const a=mk(R,'pa-cookie',{x:p.x-.3+col*.2,y:.4+row*.2,h:.18,face:1});p.c.push(a);await a.show(.18,'pop');}p.N=await num(R,S.G,p.n,p.x,1.15,'#1c7ed6',.36);};},
 'this plate has five cookies':async(R,S)=>{await S.fill(0);},
 'this plate has two cookies':async(R,S)=>{await S.fill(1);},
 'this plate has eight cookies':async(R,S)=>{await S.fill(2);},
 'from fewest to most':async(R,S)=>{const go=(p,x)=>{const dx=x-p.x,ex=p.e.x,nx=p.N.x;const cs=p.c.map(c=>[c,c.st.x,c.st.y]);p.x=x;
   return R.T(.8,e=>{const k=e<.5?2*e*e:1-Math.pow(-2*e+2,2)/2;p.e.x=ex+dx*k;p.N.x=nx+dx*k;cs.forEach(([c,cx,cy])=>c.at(cx+dx*k,cy+Math.sin(e*Math.PI)*.2));});};
  await all([go(S.pl[0],0),go(S.pl[1],-1.3)]);S.ar=span(S.G,-1.6,1.7,1.65,1.7,CC.c);await drawS(R,S.ar,.6);},
 'two five eight':async(R,S)=>{for(const i of[1,0,2]){await glow(R,S.pl[i].N,.6);}S.t=await tag(R,S.G,'fewest to most',0,1.95,CC.c,.28);}
};
page('order1',5,{old:mkq(B),neu:mkq(B),tm:{"order by how many": 1.79, "this plate has five cookies": 3.0, "this plate has two cookies": 5.64, "this plate has eight cookies": 8.13, "from fewest to most": 11.85, "two five eight": 13.34}});}
{const B={
 'let us remember':async(R,S)=>{await R.bg('playroom1');R.label('Sort and order','#7048e8');S.G=gfx(R);
  S.cr=await crates(R,S.G,['sorting'],{xs:[-1.1],cols:[CC.g]});},
 'sorting puts things':async(R,S)=>{S.a=[];for(const[k,dx]of[['pa-apple2',-.22],['pa-pear',0],['pa-strawberry',.22]]){const a=mk(R,k,{x:-1.1+dx,y:1.7,h:.3,face:1});await a.show(.25,'pop');S.a.push(a);}
  for(const[i,dx]of[[0,-.26],[1,0],[2,.26]])await intoC(R,S.a[i],S.cr[0],dx);},
 'ordering puts things in a line':async(R,S)=>{S.o=blk(S.G,'ordering',1.0,1.2,CC.a,.34);await tin(R,S.o,.3);
  S.tw=[];for(let i=0;i<4;i++){const t=tower(S.G,.25+i*.45,i+1,['#69db7c','#4dabf7','#da77f2','#ff922b'][i],{sz:.2});S.tw.push(t);await t.build(R,.15);}},
 'or fewest to most':async(R,S)=>{for(const t of S.tw)await t.hop(R,.12);},
 'great job super sorter':async(R,S)=>{S.k=[];for(const[k,x]of[['pa-leocheer',-1.6],['pa-miacheer',1.65]])S.k.push(await popIn(R,k,x,.12,1.1));await cheer(R,S.k,0,1.7);}
};
page('order1',6,{old:mkq(B),neu:mkq(B),tm:{"let us remember": 0, "sorting puts things": 1.35, "ordering puts things in a line": 5.47, "or fewest to most": 11.15, "great job super sorter": 12.45}});}
P.MU['order1']=[{"say": "What is sorting?", "speech": "Uh oh! Leo's toy box is a big mix up. Fruit and toys are all jumbled together. To sort means to put things that are the same, together in a group. So first, we look for what is the same."}, {"say": "Sort by kind", "speech": "The apple, the pear, and the strawberry are all fruit. In they go! The ball, the block, and the kite are all toys. In they go too! Our sorting rule is: what kind of thing is it?"}, {"say": "Sort by colour", "speech": "We can sort the very same things another way: by colour! Red things go in this crate. Things that are not red go in that crate. Same things, but a new rule. There is more than one way to sort!"}, {"say": "Which one does not belong?", "speech": "Which one does not belong? The duck, the frog, and the turtle are all animals. But the car is not an animal. It does not belong in this group! Off it goes."}, {"say": "Put things in order", "speech": "Now let us put things in order. Here are four towers: A, B, C, and D. They are all mixed up. Let us line them up from the shortest to the tallest. B, then D, then A, then C. Look! They go up, just like stairs."}, {"say": "Order by how many", "speech": "We can also put groups in order by how many. This plate has five cookies. This plate has two cookies. This plate has eight cookies. In order from fewest to most: two, five, eight!"}, {"say": "Sorting and ordering", "speech": "Let us remember. Sorting puts things that are the same together in a group. Ordering puts things in a line, from small to big, or short to tall, or fewest to most. Great job, super sorter!"}];
}
/* ---------- seq1 ---------- */
{
const KH=1.45;
const CC={a:'#1c7ed6',b:'#7048e8',c:'#e8590c',g:'#2b8a3e',r:'#e03131'};
const ORDW=['first','second','third','fourth','fifth','sixth','seventh','eighth','ninth','tenth'];
const ORDS=['1st','2nd','3rd','4th','5th','6th','7th','8th','9th','10th'];
{const B={
 'some things happen in order':async(R,S)=>{await R.bg('farm23');R.label('First, next, last','#2b8a3e');S.G=gfx(R);S.mia=await enter(R,'pa-miawave',-1.95,1.35,{sec:1});},
 'first mia puts a seed':async(R,S)=>{S.a=await drop(R,'pa-seed',-1.0,.25,.38);S.t=[await tag(R,S.G,'first',-1.0,1.5,CC.a,.26)];},
 'next a tiny sprout':async(R,S)=>{S.ar1=span(S.G,-.75,.6,-.4,.6,'#adb5bd');S.ar1.a=0;S.b=await popIn(R,'pa-sprout',-.05,.25,.62);S.t.push(await tag(R,S.G,'next',-.05,1.5,CC.b,.26));},
 'then the plant grows bigger':async(R,S)=>{S.c=await popIn(R,'pa-plant',.85,.25,.88);await S.c.grow(1.05,1.12,.3);await S.c.grow(1,1,.3);S.t.push(await tag(R,S.G,'then',.85,1.5,CC.g,.26));},
 'last a flower opens':async(R,S)=>{S.d=await popIn(R,'pa-flowerpot',1.6,.25,1.05);R.fx('sparkle',1.65,.95,16,{w:.6,t:1});S.t.push(await tag(R,S.G,'last',1.6,1.7,CC.c,.26));},
 'first next then last':async(R,S)=>{await wave(R,S.t);await S.mia.swap('pa-miacheer',.25,{h:1.35});}
};
page('seq1',0,{old:mkq(B),neu:mkq(B),tm:{"some things happen in order": 0, "first mia puts a seed": 1.96, "next a tiny sprout": 5.0, "then the plant grows bigger": 8.01, "last a flower opens": 10.69, "first next then last": 13.26}});}
{const B={
 'your morning has an order':async(R,S)=>{await R.bg('livingroom');R.label('My morning in order','#1c7ed6');S.G=gfx(R);},
 'first you wake up':async(R,S)=>{S.a=await drop(R,'pa-bed',-1.4,.25,.55);S.n=[await num(R,S.G,1,-1.4,1.05,CC.a,.34)];R.word('Yawn!',-1.4,1.55,'#7048e8',.8);},
 'next you eat breakfast':async(R,S)=>{S.b=await drop(R,'pa-pancakes',-.45,.25,.5);S.n.push(await num(R,S.G,2,-.45,1.05,CC.a,.34));},
 'then you brush your teeth':async(R,S)=>{S.c=await drop(R,'pa-toothbrush',.5,.25,.6);await S.c.wag(.8,.25,3);S.n.push(await num(R,S.G,3,.5,1.05,CC.a,.34));},
 'grab your backpack':async(R,S)=>{S.d=await drop(R,'pa-backpack',1.45,.25,.6);S.n.push(await num(R,S.G,4,1.45,1.05,CC.a,.34));},
 'go to school':async(R,S)=>{S.k=await enter(R,'pa-samwave',1.9,1.2,{sec:.8,from:2.9});await all(S.n.map((t,i)=>R.wait(i*.15).then(()=>glow(R,t,.5))));},
 'before you wake up':async(R,S)=>{S.x=blk(S.G,'3 before 1? No!',.0,1.75,CC.r,.3);await tin(R,S.x,.3);await bshake(R,S.x,.6);}
};
page('seq1',1,{old:mkq(B),neu:mkq(B),tm:{"your morning has an order": 0, "first you wake up": 2.19, "next you eat breakfast": 4.25, "then you brush your teeth": 6.5, "grab your backpack": 10.25, "go to school": 11.62, "before you wake up": 14.68}});}
{const B={
 'these pictures are mixed up':async(R,S)=>{await R.bg('farm23');R.label('Fix the order','#c2255c');S.G=gfx(R);
  S.k=[['pa-flowerpot',1.05],['pa-plant',.88],['pa-sprout',.62],['pa-seed',.38]];S.a=[];const xs=[-1.35,-.45,.45,1.35];
  for(let i=0;i<4;i++){const[k,h]=S.k[i];const a=mk(R,k,{x:xs[i],y:.3,h,face:1});await a.show(.35,'pop');S.a.push(a);}R.word('?!',0,1.7,'#c2255c',1);},
 'the flower came first':async(R,S)=>{await S.a[0].shiver(.6);},
 'the seed came last':async(R,S)=>{await S.a[3].shiver(.6);},
 'let us fix the order':async(R,S)=>{const xs=[-1.35,-.45,.45,1.35];const want=[3,2,1,0];
  await all(want.map((ai,pos)=>S.a[ai].go(xs[pos],.3,.9,{arc:.6})));R.fx('sparkle',0,.6,18,{w:3,t:.8});},
 'seed sprout plant flower':async(R,S)=>{const want=[3,2,1,0];S.n=[];for(let i=0;i<4;i++){await S.a[want[i]].jump(.2);S.n.push(await num(R,S.G,i+1,-1.35+i*.9,1.35,CC.a,.3));}},
 'now it makes sense':async(R,S)=>{S.t=await tag(R,S.G,'in order!',0,1.85,CC.g,.3);hearts(R,0,1.6,8);}
};
page('seq1',2,{old:mkq(B),neu:mkq(B),tm:{"these pictures are mixed up": 0.68, "the flower came first": 2.42, "the seed came last": 5.0, "let us fix the order": 8.49, "seed sprout plant flower": 10.6, "now it makes sense": 13.45}});}
{const B={
 'in a race':async(R,S)=>{await R.bg('park');R.label('Who came first?','#e8590c');S.G=gfx(R);
  S.lanes=[.25,.75,1.25].map(y=>bar(S.G,-1.9,y-.02,3.4,.06,'#ffffff'));S.fin=vline(S.G,.5,.15,1.75,'#212529');await drawL(R,S.fin,.5);S.flag=await popIn(R,'flag',.6,1.6,.35);
  S.r=[['pa-duck',.5,.3],['turtle',.48,.8],['pa-ladybug',.38,1.3]].map(([k,h,y])=>{const a=mk(R,k,{x:-1.85,y,h,face:1});a.show(.2);return a;});},
 'special numbers to tell the position':async(R,S)=>{S.t0=await tag(R,S.G,'position',-.3,1.95,CC.b,.28);},
 'the duck crosses the finish line first':async(R,S)=>{S.r.forEach((a,i)=>a.go([.15,-.15,-.45][i],a.st.y,2.0,{hops:i===1?2:5}));await R.wait(2.1);await S.r[0].go(.95,.3,.5,{hops:2});R.fx('sparkle',.95,.7,14,{w:.4,t:.8});
  S.m1=await drop(R,'pa-gold',1.45,.35,.32,{spin:0});},
 'the turtle is second':async(R,S)=>{await S.r[1].go(.9,.8,.9,{hops:2});S.m2=await drop(R,'pa-silver',1.45,.85,.3,{spin:0});},
 'the ladybug is third':async(R,S)=>{await S.r[2].go(.85,1.3,.7,{hops:3});S.m3=await drop(R,'pa-bronze',1.45,1.35,.28,{spin:0});},
 'first second third':async(R,S)=>{for(const a of S.r)await a.jump(.2);}
};
page('seq1',3,{old:mkq(B),neu:mkq(B),tm:{"in a race": 0, "special numbers to tell the position": 1.43, "the duck crosses the finish line first": 3.79, "the turtle is second": 7.06, "the ladybug is third": 9.14, "first second third": 11.43}});}
{const B={
 'write these numbers in a short way':async(R,S)=>{await R.bg('classroom');R.label('1st, 2nd, 3rd','#7048e8');S.G=gfx(R);S.t=await enter(R,'pa-teacher',-1.9,1.5,{sec:1});
  S.m=[];for(const[k,x]of[['pa-gold',-.8],['pa-silver',.15],['pa-bronze',1.1]]){S.m.push(await popIn(R,k,x,.2,.55));}},
 'first is a one':async(R,S)=>{S.b1=blk(S.G,'1st',-.8,1.3,CC.c,.42);await tin(R,S.b1,.35);S.w1=await tag(R,S.G,'first',-.8,1.75,'#495057',.24);},
 'second is a two':async(R,S)=>{S.b2=blk(S.G,'2nd',.15,1.3,'#868e96',.42);await tin(R,S.b2,.35);S.w2=await tag(R,S.G,'second',.15,1.75,'#495057',.24);},
 'third is a three':async(R,S)=>{S.b3=blk(S.G,'3rd',1.1,1.3,'#a0522d',.42);await tin(R,S.b3,.35);S.w3=await tag(R,S.G,'third',1.1,1.75,'#495057',.24);},
 'then comes fourth':async(R,S)=>{await all([...S.m.map(m=>m.hide(.3)),bout(R,[S.w1,S.w2,S.w3],.3)]);S.b4=blk(S.G,'4th',1.55,1.3,CC.a,.34);await tin(R,S.b4,.35);},
 'and fifth sixth and more':async(R,S)=>{S.more=[];for(const[t,x]of[['5th',-.6],['6th',.3],['7th',1.2]]){const b=blk(S.G,t,x,.55,CC.g,.34);S.more.push(b);await tin(R,b,.25);}},
 'all with t h':async(R,S)=>{await wave(R,[S.b4,...S.more]);}
};
page('seq1',4,{old:mkq(B),neu:mkq(B),tm:{"write these numbers in a short way": 0.54, "first is a one": 2.58, "second is a two": 5.22, "third is a three": 7.99, "then comes fourth": 10.78, "and fifth sixth and more": 13.53, "all with t h": 15.7}});}
{const B={
 'a line of animals':async(R,S)=>{await R.bg('picnic5');R.label('Count from the front','#0c8599');S.G=gfx(R);
  S.sn=await popIn(R,'pa-cupcake',-1.85,.25,.45);S.ar=span(S.G,-1.4,1.55,-1.85,1.55,CC.c);
  S.a=[];const L=[['pa-duck',.4],['turtle',.38],['pa-ladybug',.3],['pa-frog',.4],['pa-bee',.34],['fish',.32]];
  for(let i=0;i<6;i++){const[k,h]=L[i];const a=mk(R,k,{x:2.6,y:.25,h,face:-1});a.show(.2);S.a.push(a);a.go(-1.25+i*.58,.25,1.2,{hops:3});await R.wait(.22);}await R.wait(1);},
 'count from the front of the line':async(R,S)=>{await drawS(R,S.ar,.5);S.fr=await tag(R,S.G,'front',-1.85,1.95,CC.c,.26);},
 'first second third fourth fifth sixth':async(R,S)=>{S.o=[];for(let i=0;i<6;i++){await S.a[i].jump(.18);const b=blk(S.G,ORDS[i],-1.25+i*.58,1.0,CC.a,.28);S.o.push(b);await tin(R,b,.2);}},
 'the fish is sixth':async(R,S)=>{await all([glowB(R,S.o[5],.9),S.a[5].jump(.3)]);},
 'so it is also last':async(R,S)=>{S.l=await tag(R,S.G,'last',1.6,1.7,CC.r,.28);}
};
page('seq1',5,{old:mkq(B),neu:mkq(B),tm:{"a line of animals": 0.67, "count from the front of the line": 4.29, "first second third fourth fifth sixth": 6.2, "the fish is sixth": 9.79, "so it is also last": 14.2}});}
{const B={
 'ordinal numbers go on and on':async(R,S)=>{await R.bg('laketown1');R.label('All the way to tenth','#e8590c');S.G=gfx(R);
  S.pond=ell(S.G,-1.75,.4,.4,.16,'#4dabf7',{rim:'#a5d8ff'});await tin(R,S.pond,.4);},
 'ten ducklings march':async(R,S)=>{S.d=[];for(let i=0;i<10;i++){const a=mk(R,'pa-duck',{x:2.6,y:.3,h:.24,face:-1});a.show(.15);S.d.push(a);a.go(-1.3+i*.31,.3,1.1,{hops:3});await R.wait(.08);}await R.wait(.9);},
 'first second third fourth fifth sixth seventh eighth ninth tenth':async(R,S)=>{S.o=[];for(let i=0;i<10;i++){S.d[i].jump(.16);const b=blk(S.G,ORDS[i],-1.3+i*.31,i%2?.95:.72,i===9?CC.r:CC.a,.2);S.o.push(b);await tin(R,b,.12);await R.wait(.06);}},
 'the tenth duckling is the last':async(R,S)=>{await all([glowB(R,S.o[9],.9),S.d[9].jump(.3)]);S.t=await tag(R,S.G,'tenth = last',1.6,1.6,CC.r,.26);
  for(let i=0;i<10;i++){S.d[i].go(-1.75+((i%3)-1)*.18,.35,.5+i*.08,{hops:2});}}
};
page('seq1',6,{old:mkq(B),neu:mkq(B),tm:{"ordinal numbers go on and on": 0, "ten ducklings march": 2.05, "first second third fourth fifth sixth seventh eighth ninth tenth": 4.91, "the tenth duckling is the last": 10.89}});}
{const B={
 'tell us when things happen':async(R,S)=>{await R.bg('schoolyard1');R.label('Order words','#c2255c');S.G=gfx(R);
  S.w=[];for(const[t,x]of[['first',-1.4],['next',-.5],['then',.4],['last',1.3]]){S.w.push(blk(S.G,t,x,1.7,CC.b,.3));}for(const b of S.w)await tin(R,b,.2);},
 'tell us the position':async(R,S)=>{S.o=[];for(const[t,x]of[['1st',-1.4],['2nd',-.5],['3rd',.4],['10th',1.3]]){const b=blk(S.G,t,x,1.25,CC.a,.3);S.o.push(b);await tin(R,b,.2);}},
 'you know your order words':async(R,S)=>{S.k=[];for(const[k,x]of[['pa-miacheer',-1.3],['pa-samcheer',0],['pa-avacheer',1.3]])S.k.push(await popIn(R,k,x,.1,.95));await cheer(R,S.k,0,1.0);await wave(R,S.w.concat(S.o));}
};
page('seq1',7,{old:mkq(B),neu:mkq(B),tm:{"tell us when things happen": 2.1, "tell us the position": 7.46, "you know your order words": 9.86}});}
P.MU['seq1']=[{"say": "First, next, then, last", "speech": "Some things happen in order. First, Mia puts a seed in the soil. Next, a tiny sprout pops up. Then, the plant grows bigger. Last, a flower opens! First, next, then, last."}, {"say": "My morning in order", "speech": "Your morning has an order too. First, you wake up. Next, you eat breakfast. Then, you brush your teeth. Last, you grab your backpack and go to school. You cannot brush your teeth before you wake up!"}, {"say": "Fix the mixed-up order", "speech": "Oh no, these pictures are mixed up! The flower came first, and the seed came last. That cannot be right. Let us fix the order. Seed, sprout, plant, flower. Now it makes sense!"}, {"say": "First, second, third", "speech": "In a race, we use special numbers to tell the position. The duck crosses the finish line first. The turtle is second. The ladybug is third. First, second, third."}, {"say": "1st, 2nd, 3rd", "speech": "We can write these numbers in a short way. First is a one, with s t. Second is a two, with n d. Third is a three, with r d. Then comes fourth, with t h, and fifth, sixth, and more, all with t h."}, {"say": "Count from the front", "speech": "Here is a line of animals waiting for a snack. Always count from the front of the line. First, second, third, fourth, fifth, sixth. The fish is sixth. It is at the very end, so it is also last."}, {"say": "All the way to tenth", "speech": "Ordinal numbers go on and on. Ten ducklings march to the pond. First, second, third, fourth, fifth, sixth, seventh, eighth, ninth, tenth! The tenth duckling is the last one in line."}, {"say": "You know your order words!", "speech": "First, next, then, and last tell us when things happen. First, second, third, all the way to tenth, tell us the position. Hooray! You know your order words!"}];
}
/* ---------- num10 ---------- */
{
const KH=1.45;
const CC={a:'#1c7ed6',b:'#7048e8',c:'#e8590c',g:'#2b8a3e',r:'#e03131'};
const NW=['zero','one','two','three','four','five','six','seven','eight','nine','ten'];
{const B={
 'numbers tell us how many':async(R,S)=>{await R.bg('kitchen-day');R.label('How many?','#e8590c');S.G=gfx(R);S.k=await enter(R,'pa-miawave',-1.95,1.3,{sec:.9});},
 'here is one apple':async(R,S)=>{S.a=[await popIn(R,'pa-apple2',-1.0,.25,.45)];S.n1=await num(R,S.G,1,-1.0,1.05,CC.a,.4);},
 'here are two strawberries':async(R,S)=>{S.b=[];for(let i=0;i<2;i++)S.b.push(await popIn(R,'pa-strawberry',-.2+i*.35,.25,.42));S.n2=await num(R,S.G,2,-.03,1.05,CC.a,.4);},
 'here are three cupcakes':async(R,S)=>{S.c=[];for(let i=0;i<3;i++)S.c.push(await popIn(R,'pa-cupcake',.75+i*.33,.25,.42));S.n3=await num(R,S.G,3,1.08,1.05,CC.a,.4);},
 'one two three':async(R,S)=>{for(const t of[S.n1,S.n2,S.n3]){await glow(R,t,.45);}},
 'a name and a way to write it':async(R,S)=>{S.w=blk(S.G,'3 = three',.2,1.75,CC.b,.34);await tin(R,S.w,.3);await S.k.swap('pa-miacheer',.25,{h:1.3});}
};
page('num10',0,{old:mkq(B),neu:mkq(B),tm:{"numbers tell us how many": 0, "here is one apple": 2.79, "here are two strawberries": 4.02, "here are three cupcakes": 6.23, "one two three": 8.55, "a name and a way to write it": 12.07}});}
{const B={
 'count the bees as they buzz in':async(R,S)=>{await R.bg('sunhill1');R.label('Count to five','#e67700');S.G=gfx(R);S.fl=await popIn(R,'pa-flowerpot',1.4,.2,.8);},
 'one two three four five':async(R,S)=>{S.b=[];for(let i=0;i<5;i++){const a=mk(R,'pa-bee',{x:-2.4,y:1.6,h:.32,face:1});await a.show(.1);S.b.push(a);a.go(-1.4+i*.5,.5+(i%2)*.45,.7,{arc:.3});await R.wait(.4);
  const t=blk(S.G,String(i+1),-1.4+i*.5,1.45,CC.a,.28);await tin(R,t,.15);await R.wait(.25);}},
 'five bees':async(R,S)=>{S.n=await num(R,S.G,5,1.4,1.5,CC.c,.5);await all(S.b.map(b=>b.jump(.12)));},
 'the same as one hand':async(R,S)=>{S.h=await popIn(R,'hand',.0,.15,.0+.85);},
 'count your fingers':async(R,S)=>{for(let i=0;i<5;i++){R.word(String(i+1),-.32+i*.16,1.15,'#e8590c',.45);await R.wait(.3);}}
};
page('num10',1,{old:mkq(B),neu:mkq(B),tm:{"count the bees as they buzz in": 0.58, "one two three four five": 2.59, "five bees": 5.16, "the same as one hand": 7.35, "count your fingers": 11.25}});}
{const B={
 'all the way to ten':async(R,S)=>{await R.bg('laketown1');R.label('Count to ten','#1c7ed6');S.G=gfx(R);S.p=ell(S.G,.0,.55,1.75,.4,'#4dabf7',{rim:'#a5d8ff'});await R.T(.5,e=>{S.p.s=e;});},
 'one two three four five six seven eight nine ten':async(R,S)=>{S.f=[];for(let i=0;i<10;i++){const x=-1.4+(i%5)*.7,y=i<5?.68:.3;const a=mk(R,'pa-goldfish',{x,y:y+.6,h:.28,face:i%2?1:-1});await a.show(.1);S.f.push(a);a.go(x,y,.35,{arc:.1});R.fx('splash',x,y+.05,5,{w:.2,t:.4});
  const t=blk(S.G,String(i+1),x,y+.38,CC.a,.22);await tin(R,t,.12);await R.wait(.22);}},
 'ten fish in the pond':async(R,S)=>{S.n=await num(R,S.G,10,.0,1.7,CC.c,.5);},
 'the same as two hands':async(R,S)=>{S.h1=await popIn(R,'hand',-1.6,1.15,.6);S.h2=await popIn(R,'hand',1.6,1.15,.6);}
};
page('num10',2,{old:mkq(B),neu:mkq(B),tm:{"all the way to ten": 1.44, "one two three four five six seven eight nine ten": 2.73, "ten fish in the pond": 7.5, "the same as two hands": 10.85}});}
{const B={
 'the ten frame helps us see numbers':async(R,S)=>{await R.bg('classroom');R.label('Seeing seven','#7048e8');S.G=gfx(R);S.F=tframe(S.G,-.3,.85,.38);await growF(R,S.F,.6);},
 'seven is five and two more':async(R,S)=>{S.e=blk(S.G,'7 = 5 + 2',1.35,1.65,CC.b,.32);await tin(R,S.e,.3);},
 'the top row is full with five':async(R,S)=>{S.c=[];for(let i=0;i<5;i++){const c=S.F.cell(i);const a=mk(R,'pa-counter',{x:c.x,y:c.y+.5,h:.24,face:1});S.c.push(a);await a.show(.1);a.go(c.x,c.y-.12,.3);await R.wait(.18);}S.t5=await tag(R,S.G,'5',-.3,1.7,CC.a,.3);},
 'then two more on the bottom':async(R,S)=>{for(let i=5;i<7;i++){const c=S.F.cell(i);const a=mk(R,'pa-counter',{x:c.x,y:c.y+.5,h:.24,face:1});S.c.push(a);await a.show(.1);a.go(c.x,c.y-.12,.3);await R.wait(.25);}},
 'five and two make seven':async(R,S)=>{S.n=await num(R,S.G,7,1.35,.9,CC.c,.55);await all(S.c.map(a=>a.jump(.1)));}
};
page('num10',3,{old:mkq(B),neu:mkq(B),tm:{"the ten frame helps us see numbers": 0, "seven is five and two more": 2.5, "the top row is full with five": 6.13, "then two more on the bottom": 8.13, "five and two make seven": 10.5}});}
{const B={
 'count these six stars':async(R,S)=>{await R.bg('nighthill1');R.label('Still the same number','#c2255c');S.G=gfx(R);S.s=[];for(let i=0;i<6;i++){const a=await popIn(R,'pa-star',-1.4+i*.55,.6,.38);S.s.push(a);}},
 'one two three four five six':async(R,S)=>{S.t=[];for(let i=0;i<6;i++){await S.s[i].jump(.12);const b=blk(S.G,String(i+1),-1.4+i*.55,1.25,CC.a,.24);S.t.push(b);await tin(R,b,.12);await R.wait(.18);}},
 'let us mix them up':async(R,S)=>{await bout(R,S.t,.2);const P=[[-1.2,1.3],[-.4,.3],[.2,1.5],[.6,.6],[1.3,1.2],[-.9,.7]];await all(S.s.map((a,i)=>a.go(P[i][0],P[i][1],.8,{arc:.5})));},
 'count again':async(R,S)=>{for(let i=0;i<6;i++){await S.s[i].jump(.12);R.word(String(i+1),S.s[i].st.x,S.s[i].st.y+.55,'#1c7ed6',.5);await R.wait(.2);}},
 'still six':async(R,S)=>{S.n=await num(R,S.G,6,1.5,.3,CC.c,.5);},
 'does not change how many':async(R,S)=>{S.e=blk(S.G,'same number!',.0,1.95,CC.b,.3);await tin(R,S.e,.3);hearts(R,0,1.7,8);}
};
page('num10',4,{old:mkq(B),neu:mkq(B),tm:{"count these six stars": 0, "one two three four five six": 1.8, "let us mix them up": 5.72, "count again": 7.06, "still six": 8.61, "does not change how many": 11.32}});}
{const B={
 'which group has more':async(R,S)=>{await R.bg('forest1');R.label('More or fewer?','#2b8a3e');S.G=gfx(R);S.a=[];S.b=[];
  for(let i=0;i<4;i++)S.a.push(await popIn(R,'pa-ladybug',-1.5+i*.3,1.35,.26));for(let i=0;i<6;i++)S.b.push(await popIn(R,'pa-ladybug',-1.5+i*.3,.85,.26));
  S.n4=await num(R,S.G,4,.55,1.5,CC.a,.36);S.n6=await num(R,S.G,6,.55,1.0,CC.c,.36);},
 'six is more than four':async(R,S)=>{S.e1=blk(S.G,'6 > 4',1.35,1.0,CC.c,.32);await tin(R,S.e1,.3);await all(S.b.map(a=>a.jump(.12)));},
 'four is fewer than six':async(R,S)=>{S.e2=blk(S.G,'4 < 6',1.35,1.5,CC.a,.32);await tin(R,S.e2,.3);},
 'on the number line':async(R,S)=>{S.L=nline(S.G,-1.6,1.5,.3,0,10,{fs:22});await drawN(R,S.L,.8);},
 'six comes after four':async(R,S)=>{S.L.hot[4]=CC.a;await R.wait(.4);S.L.hot[6]=CC.c;S.ar=span(S.G,S.L.pos(4),.58,S.L.pos(6),.58,CC.g);await drawS(R,S.ar,.4);}
};
page('num10',5,{old:mkq(B),neu:mkq(B),tm:{"which group has more": 0, "six is more than four": 4.01, "four is fewer than six": 6.33, "on the number line": 8.66, "six comes after four": 10.74}});}
{const B={
 'one two three four five six seven eight nine ten':async(R,S)=>{await R.bg('schoolyard1');R.label('Number champions!','#e8590c');S.G=gfx(R);S.t=[];for(let i=1;i<=10;i++){const b=blk(S.G,String(i),-1.5+(i-1)*.33,1.6,i%2?CC.a:CC.c,.3);S.t.push(b);await tin(R,b,.12);await R.wait(.22);}},
 'show numbers on a ten frame':async(R,S)=>{S.F=tframe(S.G,-.4,.75,.26);await growF(R,S.F,.4);for(let i=0;i<8;i++){const c=S.F.cell(i);mk(R,'pa-counter',{x:c.x,y:c.y-.08,h:.17,face:1}).show(.12);await R.wait(.08);}},
 'tell which is more':async(R,S)=>{S.e=blk(S.G,'8 > 5',1.1,.75,CC.b,.32);await tin(R,S.e,.3);},
 'super counting':async(R,S)=>{S.k=await popIn(R,'pa-milodance',1.5,.12,1.05);await wave(R,S.t);await cheer(R,[S.k],.3,1.6);}
};
page('num10',6,{old:mkq(B),neu:mkq(B),tm:{"one two three four five six seven eight nine ten": 0, "show numbers on a ten frame": 6.39, "tell which is more": 8.64, "super counting": 9.94}});}
P.MU['num10']=[{"say": "Numbers tell how many", "speech": "Numbers tell us how many. Look! Here is one apple. Here are two strawberries. Here are three cupcakes. One, two, three. Every number has a name, and a way to write it."}, {"say": "Count to five", "speech": "Let us count the bees as they buzz in. One, two, three, four, five. Five bees! Five is the same as one hand. Hold up your hand and count your fingers."}, {"say": "Count to ten", "speech": "Let us keep going, all the way to ten. One, two, three, four, five, six, seven, eight, nine, ten. Ten fish in the pond! Ten is the same as two hands."}, {"say": "Five and some more", "speech": "The ten frame helps us see numbers. Seven is five, and two more. Look! The top row is full with five. Then two more on the bottom. Five and two make seven."}, {"say": "Same number, any order", "speech": "Count these six stars. One, two, three, four, five, six. Now let us mix them up. Count again. Still six! Moving things around does not change how many there are."}, {"say": "More or fewer?", "speech": "Which group has more, four ladybugs or six ladybugs? Six is more than four. Four is fewer than six. On the number line, six comes after four, so six is more."}, {"say": "Number champions", "speech": "One, two, three, four, five, six, seven, eight, nine, ten! You can count to ten, show numbers on a ten frame, and tell which is more. Super counting!"}];
}
/* ---------- plus1 ---------- */
{
const KH=1.45;
const CC={a:'#1c7ed6',b:'#7048e8',c:'#e8590c',g:'#2b8a3e',r:'#e03131'};
{const B={
 'tim has four balloons':async(R,S)=>{await R.bg('park');R.label('One more','#2b8a3e');S.G=gfx(R);S.tim=await enter(R,'pa-timwave',-1.7,1.3,{sec:.9});
  S.b=[];for(let i=0;i<4;i++){const a=mk(R,'pa-balloon',{x:-.6+i*.42,y:.4,h:.55,face:1});S.b.push(a);await a.show(.2);a.go(-.6+i*.42,1.05+(i%2)*.15,.6,{wob:.02});await R.wait(.12);}
  S.n=blk(S.G,'4',1.45,1.6,CC.a,.55);await tin(R,S.n,.3);},
 'here comes one more balloon':async(R,S)=>{S.x=mk(R,'pa-balloon',{x:2.4,y:1.7,h:.55,face:1});await S.x.show(.2);await S.x.go(1.1,1.1,1.2,{wob:.03});S.p=blk(S.G,'+1',1.1,1.75,CC.g,.3);await tin(R,S.p,.25);},
 'now he has five':async(R,S)=>{S.n.text='5';await glowB(R,S.n,.8);await S.tim.swap('pa-timcheer',.25,{h:1.3});},
 'one more than four is five':async(R,S)=>{S.e=blk(S.G,'4 + 1 = 5',.3,.3,CC.b,.34);S.e.y=.3;await tin(R,S.e,.3);},
 'count up by one':async(R,S)=>{R.word('4',.9,.85,'#1c7ed6',.7);await R.wait(.5);R.word('5!',1.3,.85,'#2b8a3e',.9);await all(S.b.concat([S.x]).map(b=>b.jump(.1)));}
};
page('plus1',0,{old:mkq(B),neu:mkq(B),tm:{"tim has four balloons": 0, "here comes one more balloon": 1.71, "now he has five": 4.14, "one more than four is five": 6.13, "count up by one": 10.88}});}
{const B={
 'mia has five cookies':async(R,S)=>{await R.bg('kitchen-day');R.label('One less','#e03131');S.G=gfx(R);S.mia=await enter(R,'pa-miawave',-1.75,1.3,{sec:.9});S.pl=ell(S.G,.15,.4,1.0,.2,'#f1f3f5',{rim:'#ced4da'});await R.T(.4,e=>{S.pl.s=e;});
  S.c=[];for(let i=0;i<5;i++)S.c.push(await popIn(R,'pa-cookie',-.55+i*.35,.32,.3));S.n=blk(S.G,'5',1.5,1.55,CC.a,.55);await tin(R,S.n,.3);},
 'she eats one':async(R,S)=>{const c=S.c.pop();await c.go(-1.3,1.2,.7,{arc:.3});await c.hide(.2);S.m=blk(S.G,'-1',-.9,1.6,CC.r,.3);await tin(R,S.m,.25);},
 'crunch':async(R,S)=>{R.word('Crunch!',-1.3,1.75,'#e8590c',.7);R.fx('dust',-1.3,1.3,8,{w:.3,t:.4});},
 'now there are four cookies':async(R,S)=>{S.n.text='4';await glowB(R,S.n,.8);},
 'one less than five is four':async(R,S)=>{S.e=blk(S.G,'5 - 1 = 4',.2,1.05,CC.b,.34);await tin(R,S.e,.3);},
 'count back by one':async(R,S)=>{R.word('5',.9,1.6,'#1c7ed6',.7);await R.wait(.5);R.word('4',1.3,1.6,'#e03131',.9);await all(S.c.map(c=>c.jump(.1)));}
};
page('plus1',1,{old:mkq(B),neu:mkq(B),tm:{"mia has five cookies": 0, "she eats one": 1.87, "crunch": 3.56, "now there are four cookies": 4.64, "one less than five is four": 6.39, "count back by one": 11.21}});}
{const B={
 'the number line shows':async(R,S)=>{await R.bg('laketown1');R.label('Forward and back','#0c8599');S.G=gfx(R);S.L=nline(S.G,-1.7,1.5,.5,0,10,{fs:24});await drawN(R,S.L,.8);},
 'froggy sits on six':async(R,S)=>{S.f=mk(R,'pa-frog',{x:S.L.pos(6),y:.58,h:.36,face:1});await S.f.show(.3,'pop');S.L.hot[6]=CC.a;},
 'one hop forward lands on seven':async(R,S)=>{await S.f.go(S.L.pos(7),.58,.55,{arc:.45});S.L.hot[7]=CC.g;S.a1=span(S.G,S.L.pos(6),1.15,S.L.pos(7),1.15,CC.g);await drawS(R,S.a1,.3);},
 'that is one more':async(R,S)=>{S.t1=await tag(R,S.G,'+1  one more',S.L.pos(7)+.25,1.55,CC.g,.26);},
 'one hop back lands on five':async(R,S)=>{await S.f.go(S.L.pos(6),.58,.4,{arc:.3});await S.f.go(S.L.pos(5),.58,.55,{arc:.45});S.L.hot[5]=CC.r;S.a2=span(S.G,S.L.pos(6),.98,S.L.pos(5),.98,CC.r);await drawS(R,S.a2,.3);},
 'that is one less':async(R,S)=>{S.t2=await tag(R,S.G,'-1  one less',S.L.pos(5)-.3,1.9,CC.r,.26);}
};
page('plus1',2,{old:mkq(B),neu:mkq(B),tm:{"the number line shows": 0, "froggy sits on six": 2.8, "one hop forward lands on seven": 5.11, "that is one more": 8.05, "one hop back lands on five": 9.93, "that is one less": 12.69}});}
{const B={
 'we can also jump by two':async(R,S)=>{await R.bg('laketown1');R.label('Two more, two less','#7048e8');S.G=gfx(R);S.L=nline(S.G,-1.7,1.5,.5,0,10,{fs:24});await drawN(R,S.L,.8);},
 'start at three':async(R,S)=>{S.f=mk(R,'pa-frog',{x:S.L.pos(3),y:.58,h:.34,face:1});await S.f.show(.3,'pop');S.L.hot[3]=CC.a;},
 'two more is five':async(R,S)=>{for(const n of[4,5]){await S.f.go(S.L.pos(n),.58,.45,{arc:.4});}S.L.hot[5]=CC.g;S.e1=blk(S.G,'3 + 2 = 5',-.7,1.6,CC.g,.3);await tin(R,S.e1,.25);},
 'start at eight':async(R,S)=>{S.d=mk(R,'pa-duck',{x:S.L.pos(8),y:.58,h:.34,face:-1});await S.d.show(.3,'pop');S.L.hot[8]=CC.a;},
 'two less is six':async(R,S)=>{for(const n of[7,6]){await S.d.go(S.L.pos(n),.58,.45,{arc:.4});}S.L.hot[6]=CC.r;S.e2=blk(S.G,'8 - 2 = 6',.85,1.6,CC.r,.3);await tin(R,S.e2,.25);},
 'two more counts up two':async(R,S)=>{await glowB(R,S.e1,.6);},
 'two less counts back two':async(R,S)=>{await glowB(R,S.e2,.6);}
};
page('plus1',3,{old:mkq(B),neu:mkq(B),tm:{"we can also jump by two": 0, "start at three": 2.09, "two more is five": 3.86, "start at eight": 5.79, "two less is six": 7.5, "two more counts up two": 9.51, "two less counts back two": 11.68}});}
{const B={
 'here are three towers':async(R,S)=>{await R.bg('playroom1');R.label('Towers','#e8590c');S.G=gfx(R);},
 'the middle tower has five blocks':async(R,S)=>{S.m=tower(S.G,.0,5,'#4dabf7',{sz:.25});await S.m.build(R,.22);S.nm=await num(R,S.G,5,.0,S.m.top()+.3,CC.a,.34);},
 'one more block':async(R,S)=>{S.r=tower(S.G,1.0,6,'#69db7c',{sz:.25});await S.r.build(R,.18);S.r.cubes[5].hl=1;},
 'it has six':async(R,S)=>{S.nr=await num(R,S.G,6,1.0,S.r.top()+.3,CC.g,.34);S.t1=await tag(R,S.G,'one more',1.0,.0+.02,CC.g,.22);S.t1.y=.02;},
 'one less block':async(R,S)=>{S.l=tower(S.G,-1.0,4,'#ff922b',{sz:.25});await S.l.build(R,.18);},
 'it has four':async(R,S)=>{S.nl=await num(R,S.G,4,-1.0,S.l.top()+.3,CC.r,.34);S.t2=await tag(R,S.G,'one less',-1.0,.02,CC.r,.22);},
 'four five six':async(R,S)=>{for(const t of[S.l,S.m,S.r])await t.hop(R,.12);S.r.cubes[5].hl=0;}
};
page('plus1',4,{old:mkq(B),neu:mkq(B),tm:{"here are three towers": 0, "the middle tower has five blocks": 1.67, "one more block": 6.89, "it has six": 7.93, "one less block": 12.04, "it has four": 13.09, "four five six": 14.77}});}
{const B={
 'the number just after':async(R,S)=>{await R.bg('classroom');R.label('Before and after','#c2255c');S.G=gfx(R);S.k=await enter(R,'pa-teacher',-1.95,1.5,{sec:.9});
  S.mid=blk(S.G,'8',.0,1.1,CC.a,.6);await tin(R,S.mid,.3);},
 'the number just before is one less':async(R,S)=>{S.q1=blk(S.G,'?',-.85,1.1,'#868e96',.6);S.q2=blk(S.G,'?',.85,1.1,'#868e96',.6);await tin(R,S.q1,.25);await tin(R,S.q2,.25);},
 'what comes just after eight':async(R,S)=>{await bpulse(R,S.q2,.6);},
 'nine':async(R,S)=>{S.q2.text='9';recolor(R,S.q2,CC.g);await glowB(R,S.q2,.7);S.t1=await tag(R,S.G,'after: +1',.85,1.75,CC.g,.24);},
 'what comes just before eight':async(R,S)=>{await bpulse(R,S.q1,.6);},
 'seven':async(R,S)=>{S.q1.text='7';recolor(R,S.q1,CC.r);await glowB(R,S.q1,.7);S.t2=await tag(R,S.G,'before: -1',-.85,1.75,CC.r,.24);await S.k.jump(.2);}
};
page('plus1',5,{old:mkq(B),neu:mkq(B),tm:{"the number just after": 0, "the number just before is one less": 3.05, "what comes just after eight": 5.85, "nine": 8.3, "what comes just before eight": 9.32, "seven": 11.19}});}
{const B={
 'one more means count up one':async(R,S)=>{await R.bg('schoolyard1');R.label('Counting champions!','#2b8a3e');S.G=gfx(R);S.L=nline(S.G,-1.6,1.5,.5,0,10,{fs:22});await drawN(R,S.L,.6);
  S.f=mk(R,'pa-frog',{x:S.L.pos(5),y:.58,h:.32,face:1});await S.f.show(.3,'pop');await S.f.go(S.L.pos(6),.58,.45,{arc:.4});S.L.hot[6]=CC.g;},
 'one less means count back one':async(R,S)=>{await S.f.go(S.L.pos(5),.58,.45,{arc:.4});await S.f.go(S.L.pos(4),.58,.45,{arc:.4});S.L.hot[4]=CC.r;},
 'just jump by two':async(R,S)=>{for(const n of[6,8]){await S.f.go(S.L.pos(n),.58,.45,{arc:.4});}S.L.hot[8]=CC.b;},
 'you are a counting champion':async(R,S)=>{S.k=await popIn(R,'pa-timcheer',-1.6,1.05,.9);await cheer(R,[S.k],0,1.6);}
};
page('plus1',6,{old:mkq(B),neu:mkq(B),tm:{"one more means count up one": 0, "one less means count back one": 2.04, "just jump by two": 6.77, "you are a counting champion": 7.93}});}
P.MU['plus1']=[{"say": "One more", "speech": "Tim has four balloons. Here comes one more balloon! Now he has five. One more than four is five. When we add one more, we count up by one."}, {"say": "One less", "speech": "Mia has five cookies. She eats one. Crunch! Now there are four cookies. One less than five is four. When we take one away, we count back by one."}, {"say": "Hops on the number line", "speech": "The number line shows one more and one less. Froggy sits on six. One hop forward lands on seven. That is one more. One hop back lands on five. That is one less."}, {"say": "Two more, two less", "speech": "We can also jump by two. Start at three. Two more is five. Start at eight. Two less is six. Two more counts up two. Two less counts back two."}, {"say": "Towers: one more, one less", "speech": "Here are three towers. The middle tower has five blocks. The tower on the right has one more block. It has six. The tower on the left has one less block. It has four. Four, five, six!"}, {"say": "What comes before and after?", "speech": "The number just after a number is one more. The number just before is one less. What comes just after eight? Nine! What comes just before eight? Seven!"}, {"say": "One more, one less champions", "speech": "One more means count up one. One less means count back one. Two more, two less, just jump by two. You are a counting champion!"}];
}
P.DIR.mount();
})();
