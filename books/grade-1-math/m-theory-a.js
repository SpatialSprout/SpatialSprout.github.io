/* Grade 1 Math: staged 3D theory pages (group a). Generated from snippets. ASCII only. */
(function(){
"use strict";
const P=window.PM;if(!P||!P.DIR||!P.G1H||!P.G1X||!P.MK)return;
const page=P.DIR.page;P.MU=P.MU||{};
const {all,pop,liteq,mkq,hearts,gfx,tin,tout,glow,moveT,fly,tileFly,squash,wave}=P.G1H;
const {blk,rowX,sentence,reflow,bfly,bshake,bpulse,bout,bcross,recolor,mk,enter,drop,popIn,cheer,crates,intoCrate,markB,speak}=P.G1X;
const {balance,pencil,shade,bar,cube,tower,tag,growX,growY,slideB,glowB,vline,hline,drawL,fadeL,boing}=P.MK;
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
P.DIR.mount();
})();
