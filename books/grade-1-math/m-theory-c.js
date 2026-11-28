/* Grade 1 Math: staged 3D theory pages (group c). Generated from snippets. ASCII only. */
(function(){
"use strict";
const P=window.PM;if(!P||!P.DIR||!P.G1H||!P.G1X||!P.MK)return;
const page=P.DIR.page;P.MU=P.MU||{};
const {all,pop,liteq,mkq,hearts,tin,tout,glow,moveT,fly,tileFly,squash,wave}=P.G1H;
const {blk,rowX,sentence,reflow,bfly,bshake,bpulse,bout,bcross,recolor,mk,enter,drop,popIn,cheer,crates,intoCrate,markB,speak}=P.G1X;
const {gfx}=P.MK;
const {tally,mark,clock,turn,pie,split,shape,chart,tframe,growF,nline,drawN,ell,span,drawS,pulse,num,balance,pencil,shade,bar,cube,tower,tag,growX,growY,slideB,glowB,vline,hline,drawL,fadeL,boing}=P.MK;
const rnd=(a,b)=>a+Math.random()*(b-a);
/* ---------- shapes2d ---------- */
{
const KH=1.45;
const CC={a:'#1c7ed6',b:'#7048e8',c:'#e8590c',g:'#2b8a3e',r:'#e03131'};
const sIn=(R,o,sec)=>R.T(sec||.45,e=>{o.s=e<.7?e/.7*1.12:1.12-(e-.7)/.3*.12;});
/* light up each side, one by one, with a counted number */
const countSides=async(R,G,o,col,n)=>{const out=[];for(let i=0;i<n;i++){o.side[i]=col||'#ffd43b';const m=o.mid(i);const b=blk(G,String(i+1),m.x+(m.x-o.x)*.35,m.y+(m.y-o.y)*.35,CC.c,.24);out.push(b);await tin(R,b,.18);await R.wait(.45);}return out;};
const countDots=async(R,G,o,n)=>{const out=[];const p=o.pts();for(let i=0;i<n;i++){o.dot[i]=true;R.fx('sparkle',p[i][0],p[i][1],5,{w:.15,t:.4});const b=blk(G,String(i+1),p[i][0]+(p[i][0]-o.x)*.35,p[i][1]+(p[i][1]-o.y)*.35,CC.r,.24);out.push(b);await tin(R,b,.18);await R.wait(.45);}return out;};
{const B={
 'shapes are everywhere':async(R,S)=>{await R.bg('classroom');R.label('2-D shapes','#7048e8');S.G=gfx(R);S.tch=await enter(R,'pa-teacher',-1.95,1.5,{sec:1});},
 'five flat shapes':async(R,S)=>{S.sh=[['circle',-1.2,1.35,.33,'#ffd43b'],['triangle',-.25,1.35,.38,'#e03131'],['square',.7,1.35,.36,'#1c7ed6'],['rectangle',-.75,.5,.3,'#2b8a3e'],['hexagon',.55,.5,.36,'#9c36b5']].map(([k,x,y,r,c])=>shape(S.G,k,x,y,r,c));},
 'a circle':async(R,S)=>{await sIn(R,S.sh[0]);S.t=[await tag(R,S.G,'circle',-1.2,.85,'#495057',.2)];},
 'a triangle':async(R,S)=>{await sIn(R,S.sh[1]);S.t.push(await tag(R,S.G,'triangle',-.25,.85,'#495057',.2));},
 'a square':async(R,S)=>{await sIn(R,S.sh[2]);S.t.push(await tag(R,S.G,'square',.7,.85,'#495057',.2));},
 'a rectangle':async(R,S)=>{await sIn(R,S.sh[3]);S.t.push(await tag(R,S.G,'rectangle',-.75,.05+.03,'#495057',.2));},
 'and a hexagon':async(R,S)=>{await sIn(R,S.sh[4]);S.t.push(await tag(R,S.G,'hexagon',.55,.05+.03,'#495057',.2));},
 'its own special look':async(R,S)=>{for(const o of S.sh)await R.T(.35,e=>{o.hl=Math.sin(e*Math.PI);});}
};
page('shapes2d',0,{old:mkq(B),neu:mkq(B),tm:{"shapes are everywhere": 0, "five flat shapes": 2.83, "a circle": 4.04, "a triangle": 5.57, "a square": 7.26, "a rectangle": 8.75, "and a hexagon": 10.48, "its own special look": 13.89}});}
{const B={
 'a side is a straight line':async(R,S)=>{await R.bg('classroom');R.label('Sides','#e8590c');S.G=gfx(R);S.T=shape(S.G,'triangle',.0,.95,.7,'#e03131');await sIn(R,S.T,.6);
  S.h=mk(R,'pa-timpoint',{x:-1.8,y:.2,h:1.3,face:1});await S.h.show(.3,'pop');},
 'count the sides of this triangle':async(R,S)=>{S.t=await tag(R,S.G,'side',1.25,1.6,CC.c,.28);},
 'one two three':async(R,S)=>{S.n=await countSides(R,S.G,S.T,'#ffd43b',3);},
 'a triangle has three sides':async(R,S)=>{S.e=blk(S.G,'3 sides',1.25,1.15,CC.b,.32);await tin(R,S.e,.3);await R.T(.8,e=>{S.T.rot=e*Math.PI*2/3;});},
 'tri means three':async(R,S)=>{S.e2=blk(S.G,'TRI = 3',1.25,.65,CC.r,.3);await tin(R,S.e2,.3);await S.h.swap('pa-timcheer',.25,{h:1.3});}
};
page('shapes2d',1,{old:mkq(B),neu:mkq(B),tm:{"a side is a straight line": 0, "count the sides of this triangle": 4.4, "one two three": 6.46, "a triangle has three sides": 8.36, "tri means three": 11.1}});}
{const B={
 'a corner is where two sides meet':async(R,S)=>{await R.bg('classroom');R.label('Corners','#c2255c');S.G=gfx(R);S.T=shape(S.G,'triangle',.0,.95,.7,'#e03131');await sIn(R,S.T,.5);
  S.T.side[0]='#ffd43b';S.T.side[2]='#ffd43b';await R.wait(.4);S.T.dot[0]=true;R.fx('sparkle',S.T.pts()[0][0],S.T.pts()[0][1],10,{w:.2,t:.6});},
 'call corners vertices':async(R,S)=>{S.t=await tag(R,S.G,'corner = vertex',1.2,1.75,CC.r,.26);S.T.side={};S.T.dot={};},
 'one two three':async(R,S)=>{S.n=await countDots(R,S.G,S.T,3);},
 'three sides and three corners':async(R,S)=>{S.T.side={0:'#ffd43b',1:'#ffd43b',2:'#ffd43b'};S.e=blk(S.G,'3 sides, 3 corners',1.15,1.2,CC.b,.28);await tin(R,S.e,.3);await R.T(.7,e=>{S.T.hl=Math.sin(e*Math.PI);});}
};
page('shapes2d',2,{old:mkq(B),neu:mkq(B),tm:{"a corner is where two sides meet": 0, "call corners vertices": 3.89, "one two three": 8.69, "three sides and three corners": 12.32}});}
{const B={
 'a square and a rectangle':async(R,S)=>{await R.bg('playroom1');R.label('Square and rectangle','#1c7ed6');S.G=gfx(R);S.sq=shape(S.G,'square',-.9,1.0,.48,'#1c7ed6');S.re=shape(S.G,'rectangle',.85,1.0,.4,'#2b8a3e');
  await sIn(R,S.sq);await sIn(R,S.re);S.t1=await tag(R,S.G,'square',-.9,1.75,'#495057',.24);S.t2=await tag(R,S.G,'rectangle',.85,1.75,'#495057',.24);},
 'four sides and four corners':async(R,S)=>{for(let i=0;i<4;i++){S.sq.dot[i]=true;S.re.dot[i]=true;await R.wait(.3);}S.e=blk(S.G,'4 sides, 4 corners',.0,.2,CC.b,.28);await tin(R,S.e,.3);},
 'look closely':async(R,S)=>{await all([R.T(.5,e=>{S.sq.hl=Math.sin(e*Math.PI);}),R.T(.5,e=>{S.re.hl=Math.sin(e*Math.PI);})]);},
 'the same length':async(R,S)=>{for(let i=0;i<4;i++){S.sq.side[i]='#ffd43b';await R.wait(.25);}S.eq=blk(S.G,'all the same',-.9,.2+.0,CC.c,.24);S.eq.y=.42;await tin(R,S.eq,.25);},
 'two long sides':async(R,S)=>{S.re.side[0]='#e03131';S.re.side[2]='#e03131';await R.wait(.4);},
 'two short sides':async(R,S)=>{S.re.side[1]='#ffd43b';S.re.side[3]='#ffd43b';S.e2=blk(S.G,'2 long, 2 short',.85,.42,CC.c,.24);await tin(R,S.e2,.25);}
};
page('shapes2d',3,{old:mkq(B),neu:mkq(B),tm:{"a square and a rectangle": 0, "four sides and four corners": 2.68, "look closely": 5.67, "the same length": 9.13, "two long sides": 11.9, "two short sides": 13.3}});}
{const B={
 'the circle is different':async(R,S)=>{await R.bg('schoolyard1');R.label('The circle','#e67700');S.G=gfx(R);S.c=shape(S.G,'circle',-.7,1.0,.5,'#ffd43b');await sIn(R,S.c,.5);},
 'no straight sides':async(R,S)=>{S.x1=blk(S.G,'0 sides',.75,1.55,CC.r,.3);await tin(R,S.x1,.3);},
 'no corners at all':async(R,S)=>{S.x2=blk(S.G,'0 corners',.75,1.05,CC.r,.3);await tin(R,S.x2,.3);},
 'round all the way around':async(R,S)=>{await R.T(1.4,e=>{S.c.ring=e;});},
 'a circle can roll':async(R,S)=>{S.c.ring=0;await bout(R,[S.x1,S.x2],.2);S.c.y=.55;await R.T(1.8,e=>{S.c.x=-.7+e*2.2;S.c.rot=-e*6;});S.b=await popIn(R,'pa-beachball',-1.4,.2,.55);await S.b.go(1.2,.2,1.6,{lin:true});}
};
page('shapes2d',4,{old:mkq(B),neu:mkq(B),tm:{"the circle is different": 0, "no straight sides": 2.91, "no corners at all": 4.55, "round all the way around": 6.86, "a circle can roll": 9.96}});}
{const B={
 'this shape is a hexagon':async(R,S)=>{await R.bg('farm23');R.label('The hexagon','#9c36b5');S.G=gfx(R);S.h=shape(S.G,'hexagon',-.35,1.0,.6,'#9c36b5');await sIn(R,S.h,.5);},
 'count its sides':async(R,S)=>{S.t=await tag(R,S.G,'hexagon',1.1,1.8,'#495057',.26);},
 'one two three four five six':async(R,S)=>{S.n=await countSides(R,S.G,S.h,'#ffd43b',6);},
 'six sides and six corners':async(R,S)=>{for(let i=0;i<6;i++){S.h.dot[i]=true;await R.wait(.12);}S.e=blk(S.G,'6 sides, 6 corners',1.05,1.3,CC.b,.26);await tin(R,S.e,.3);},
 'their honeycomb with hexagons':async(R,S)=>{S.hc=await popIn(R,'pa-honeycomb',1.15,.25,.6);S.bee=mk(R,'pa-bee',{x:-1.9,y:1.6,h:.3,face:1});await S.bee.show(.2);await S.bee.go(1.0,1.0,1.4,{arc:.5});}
};
page('shapes2d',5,{old:mkq(B),neu:mkq(B),tm:{"this shape is a hexagon": 0, "count its sides": 2.99, "one two three four five six": 4.14, "six sides and six corners": 8.86, "their honeycomb with hexagons": 12.48}});}
{const B={
 'you will find shapes everywhere':async(R,S)=>{await R.bg('kitchen-day');R.label('Shapes around us','#2b8a3e');S.G=gfx(R);S.mia=await enter(R,'pa-miawave',-1.95,1.3,{sec:1});},
 'a plate is a circle':async(R,S)=>{S.p=await popIn(R,'pa-plate',-.95,.25,.45);S.s1=shape(S.G,'circle',-.95,1.25,.2,'#ffd43b');await sIn(R,S.s1);},
 'a slice of watermelon is a triangle':async(R,S)=>{S.w=await popIn(R,'pa-wmslice',-.15,.25,.45);S.s2=shape(S.G,'triangle',-.15,1.25,.22,'#e03131');await sIn(R,S.s2);},
 'a window is a square':async(R,S)=>{S.wi=await popIn(R,'pa-window2',.65,.25,.55);S.s3=shape(S.G,'square',.65,1.3,.2,'#1c7ed6');await sIn(R,S.s3);},
 'a door is a rectangle':async(R,S)=>{S.d=await popIn(R,'pa-door',1.45,.25,.9);S.s4=shape(S.G,'rectangle',1.45,1.5,.15,'#2b8a3e',{rot:Math.PI/2});await sIn(R,S.s4);},
 'great shape spotting':async(R,S)=>{await S.mia.swap('pa-miacheer',.25,{h:1.3});for(const o of[S.s1,S.s2,S.s3,S.s4])R.T(.6,e=>{o.hl=Math.sin(e*Math.PI);});hearts(R,.3,1.8,8);}
};
page('shapes2d',6,{old:mkq(B),neu:mkq(B),tm:{"you will find shapes everywhere": 1.21, "a plate is a circle": 3.08, "a slice of watermelon is a triangle": 5.4, "a window is a square": 8.89, "a door is a rectangle": 11.07, "great shape spotting": 13.46}});}
P.MU['shapes2d']=[{"say": "Meet the shapes", "speech": "Shapes are everywhere! Here are five flat shapes. A circle. A triangle. A square. A rectangle. And a hexagon. Each shape has its own special look."}, {"say": "Sides", "speech": "A side is a straight line on the edge of a shape. Let us count the sides of this triangle. One, two, three. A triangle has three sides. Tri means three!"}, {"say": "Corners", "speech": "A corner is where two sides meet. Some people call corners vertices. Let us count the corners of the triangle. One, two, three. A triangle has three sides and three corners."}, {"say": "Square and rectangle", "speech": "A square and a rectangle both have four sides and four corners. But look closely. All four sides of a square are the same length. A rectangle has two long sides and two short sides."}, {"say": "The circle", "speech": "The circle is different. It has no straight sides, and no corners at all. It is round all the way around. That is why a circle can roll!"}, {"say": "The hexagon", "speech": "This shape is a hexagon. Let us count its sides. One, two, three, four, five, six. A hexagon has six sides, and six corners. Bees build their honeycomb with hexagons!"}, {"say": "Shapes all around us", "speech": "Look around, and you will find shapes everywhere. A plate is a circle. A slice of watermelon is a triangle. A window is a square. A door is a rectangle. Great shape spotting!"}];
}
/* ---------- shapes2 ---------- */
{
const KH=1.45;
const CC={a:'#1c7ed6',b:'#7048e8',c:'#e8590c',g:'#2b8a3e',r:'#e03131'};
{const B={
 'look at this butterfly':async(R,S)=>{await R.bg('sunhill1');R.label('Symmetry','#9c36b5');S.G=gfx(R);S.b=mk(R,'pa-butterfly',{x:-.2,y:.3,h:1.4,face:1});await S.b.show(.5,'pop');await S.b.grow(1.06,.95,.3);await S.b.grow(1,1,.3);},
 'straight down the middle':async(R,S)=>{S.l=vline(S.G,-.2,.15,1.95,'#e03131');await drawL(R,S.l,.9);},
 'exactly the same like a mirror':async(R,S)=>{S.t1=await tag(R,S.G,'left',-1.0,1.95,CC.a,.26);S.t2=await tag(R,S.G,'right',.6,1.95,CC.c,.26);await S.b.grow(.92,1,.3);await S.b.grow(1,1,.3);},
 'both halves match':async(R,S)=>{R.fx('sparkle',-.2,1.0,20,{w:1.4,h:1.2,t:.9});},
 'the shape has symmetry':async(R,S)=>{S.e=blk(S.G,'symmetry',1.35,1.0,CC.b,.32);await tin(R,S.e,.3);await glowB(R,S.e,.8);}
};
page('shapes2',0,{old:mkq(B),neu:mkq(B),tm:{"look at this butterfly": 0, "straight down the middle": 3.56, "exactly the same like a mirror": 7.92, "both halves match": 11.04, "the shape has symmetry": 12.79}});}
{const B={
 'test for symmetry':async(R,S)=>{await R.bg('classroom');R.label('The fold test','#c2255c');S.G=gfx(R);S.h=mk(R,'pa-heart2',{x:-.3,y:.35,h:1.2,face:1});await S.h.show(.4,'pop');S.k=await enter(R,'pa-avawave',1.85,1.3,{from:2.9,sec:1});},
 'fold the shape along the line':async(R,S)=>{S.l=vline(S.G,-.3,.25,1.75,'#e03131');await drawL(R,S.l,.6);},
 'match exactly':async(R,S)=>{await S.h.grow(.04,1,.6);R.fx('sparkle',-.3,.95,12,{w:.3,h:1,t:.5});await R.wait(.2);await S.h.grow(1,1,.6);},
 'nothing sticking out':async(R,S)=>{S.t=await tag(R,S.G,'halves match',-.3,1.95,CC.g,.28);},
 'this heart folds perfectly':async(R,S)=>{await S.k.swap('pa-avacheer',.25,{h:1.3});hearts(R,-.3,1.4,10);}
};
page('shapes2',1,{old:mkq(B),neu:mkq(B),tm:{"test for symmetry": 1.31, "fold the shape along the line": 2.55, "match exactly": 6.86, "nothing sticking out": 8.3, "this heart folds perfectly": 11.0}});}
{const B={
 'share one sandwich':async(R,S)=>{await R.bg('lunchtable1');R.label('Halves','#e8590c');S.G=gfx(R);S.leo=await enter(R,'pa-leowave',-1.95,1.3,{sec:.9});S.mia=await enter(R,'pa-miawave',1.75,1.3,{from:2.9,sec:.9});
  S.L=bar(S.G,-.85,.55,.75,.75,'#f4d5a6',{layer:'F'});S.R=bar(S.G,-.1,.55,.75,.75,'#f4d5a6',{layer:'F'});S.L.s=0;S.R.s=0;await all([R.T(.4,e=>{S.L.s=e;}),R.T(.4,e=>{S.R.s=e;})]);},
 'straight down the middle':async(R,S)=>{S.cut=vline(S.G,-.1,.45,1.4,'#e03131');await drawL(R,S.cut,.6);R.fx('sparkle',-.1,.9,10,{w:.1,h:.9,t:.5});},
 'two equal parts':async(R,S)=>{await fadeL(R,S.cut,.2);await all([slideB(R,S.L,-1.05,.55,.6),slideB(R,S.R,.1,.55,.6)]);S.eq=blk(S.G,'=',-.1,.95,CC.b,.36);await tin(R,S.eq,.25);},
 'each part is one half':async(R,S)=>{S.h1=blk(S.G,'1 half',-.67,1.6,CC.a,.26);S.h2=blk(S.G,'1 half',.47,1.6,CC.c,.26);await tin(R,S.h1,.25);await tin(R,S.h2,.25);},
 'one half for leo':async(R,S)=>{await slideB(R,S.L,-1.55,.55,.6);await S.leo.jump(.15);},
 'one half for mia':async(R,S)=>{await slideB(R,S.R,.6,.55,.6);await S.mia.jump(.15);},
 'two halves make one whole':async(R,S)=>{await all([slideB(R,S.L,-.85,.55,.6),slideB(R,S.R,-.1,.55,.6),bout(R,[S.h1,S.h2,S.eq],.3)]);S.w=blk(S.G,'2 halves = 1 whole',-.1,1.65,CC.b,.3);await tin(R,S.w,.3);}
};
page('shapes2',2,{old:mkq(B),neu:mkq(B),tm:{"share one sandwich": 1.63, "straight down the middle": 4.34, "two equal parts": 6.44, "each part is one half": 7.54, "one half for leo": 9.86, "one half for mia": 12.08, "two halves make one whole": 13.3}});}
{const B={
 'cut the sandwich like this':async(R,S)=>{await R.bg('lunchtable1');R.label('Fair or not fair?','#e03131');S.G=gfx(R);S.L=bar(S.G,-1.0,.55,1.1,.75,'#f4d5a6',{layer:'F'});S.R=bar(S.G,.1,.55,.4,.75,'#f4d5a6',{layer:'F'});
  S.cut=vline(S.G,.1,.45,1.4,'#e03131');await drawL(R,S.cut,.6);await fadeL(R,S.cut,.2);await all([slideB(R,S.L,-1.2,.55,.5),slideB(R,S.R,.3,.55,.5)]);},
 'one part is big':async(R,S)=>{S.t1=blk(S.G,'big',-.65,1.6,CC.c,.28);await tin(R,S.t1,.25);await glowB(R,S.L,.6);},
 'one part is small':async(R,S)=>{S.t2=blk(S.G,'small',.5,1.6,CC.a,.28);await tin(R,S.t2,.25);await glowB(R,S.R,.6);},
 'not a fair share':async(R,S)=>{S.x=blk(S.G,'not fair!',-.1,.25,CC.r,.34);S.x.y=.25;await tin(R,S.x,.3);await bshake(R,S.x,.6);S.leo=await popIn(R,'pa-leowave',1.55,.2,1.1);await S.leo.shiver(.6);},
 'must be the same size':async(R,S)=>{S.ok=blk(S.G,'fair = same size',-.1,1.95,CC.g,.28);await tin(R,S.ok,.3);}
};
page('shapes2',3,{old:mkq(B),neu:mkq(B),tm:{"cut the sandwich like this": 2.15, "one part is big": 3.63, "one part is small": 5.81, "not a fair share": 10.5, "must be the same size": 13.06}});}
{const B={
 'four friends share one pizza':async(R,S)=>{await R.bg('picnic5');R.label('Fourths','#2b8a3e');S.G=gfx(R);S.P=pie(S.G,-.1,1.0,.6,4,'#ffd43b');await R.T(.5,e=>{S.P.s=e;});
  S.k=[];for(const[k,x,y]of[['pa-leowave',-1.85,.15],['pa-miawave',1.6,.15]]){S.k.push(await popIn(R,k,x,y,1.0));}},
 'four equal parts':async(R,S)=>{await R.T(.8,e=>{S.P.cut=e;});await split(R,S.P,.14,.5);},
 'each part is one fourth':async(R,S)=>{S.P.parts[0].hl=1;S.f=blk(S.G,'1 fourth',1.0,1.75,CC.b,.28);await tin(R,S.f,.3);await R.T(.6,e=>{S.P.parts[0].hl=1-e;});},
 'call it a quarter':async(R,S)=>{S.q=blk(S.G,'= 1 quarter',1.0,1.35,CC.c,.24);await tin(R,S.q,.25);},
 'one two three four':async(R,S)=>{for(let i=0;i<4;i++){const p=S.P.parts[i];const mid=(p.a0+p.a1)/2;R.T(.5,e=>{p.hl=Math.sin(e*Math.PI);});R.word(String(i+1),-.1+Math.cos(mid)*.42,1.0-Math.sin(mid)*.42,'#1c7ed6',.55);await R.wait(.45);}},
 'four fourths make one whole pizza':async(R,S)=>{await split(R,S.P,0,.5);S.w=blk(S.G,'4 fourths = 1 whole',-.1,.1+.0,CC.b,.28);S.w.y=.12;await tin(R,S.w,.3);await cheer(R,S.k,-.1,1.7);}
};
page('shapes2',4,{old:mkq(B),neu:mkq(B),tm:{"four friends share one pizza": 0.4, "four equal parts": 4.15, "each part is one fourth": 5.41, "call it a quarter": 9.17, "one two three four": 10.3, "four fourths make one whole pizza": 12.51}});}
{const B={
 'halves are bigger than fourths':async(R,S)=>{await R.bg('picnic5');R.label('Halves or fourths?','#e8590c');S.G=gfx(R);S.A=pie(S.G,-.95,1.0,.5,2,'#ffd43b');S.B=pie(S.G,.85,1.0,.5,4,'#ffd43b');
  await all([R.T(.5,e=>{S.A.s=e;}),R.T(.5,e=>{S.B.s=e;})]);await all([R.T(.6,e=>{S.A.cut=e;}),R.T(.6,e=>{S.B.cut=e;})]);await all([split(R,S.A,.1,.4),split(R,S.B,.1,.4)]);
  S.t1=blk(S.G,'halves',-.95,1.82,CC.a,.26);S.t2=blk(S.G,'fourths',.85,1.82,CC.c,.26);await tin(R,S.t1,.25);await tin(R,S.t2,.25);},
 'each part gets smaller':async(R,S)=>{S.A.parts[0].hl=1;S.B.parts[0].hl=1;await R.wait(.5);await all([R.T(.6,e=>{S.A.parts[0].hl=1-e;}),R.T(.6,e=>{S.B.parts[0].hl=1-e;})]);},
 'two friends get bigger pieces':async(R,S)=>{S.k1=await popIn(R,'pa-samwave',-1.85,.15,.95);S.e1=blk(S.G,'bigger',-.95,.25,CC.a,.24);S.e1.y=.25;await tin(R,S.e1,.25);},
 'four friends get smaller pieces':async(R,S)=>{S.k2=await popIn(R,'pa-avawave',1.75,.15,.95);S.e2=blk(S.G,'smaller',.85,.25,CC.c,.24);S.e2.y=.25;await tin(R,S.e2,.25);}
};
page('shapes2',5,{old:mkq(B),neu:mkq(B),tm:{"halves are bigger than fourths": 0, "each part gets smaller": 5.58, "two friends get bigger pieces": 7.14, "four friends get smaller pieces": 9.93}});}
{const B={
 'symmetry means both sides match':async(R,S)=>{await R.bg('schoolyard1');R.label('Sharing champions!','#9c36b5');S.G=gfx(R);S.b=await popIn(R,'pa-butterfly',-1.2,.35,.9);S.l=vline(S.G,-1.2,.25,1.4,'#e03131');await drawL(R,S.l,.5);},
 'fair shares are equal parts':async(R,S)=>{S.P=pie(S.G,.3,.95,.45,4,'#ffd43b');await R.T(.4,e=>{S.P.s=e;});await R.T(.5,e=>{S.P.cut=e;});await split(R,S.P,.1,.4);},
 'two halves make a whole':async(R,S)=>{S.e1=blk(S.G,'2 halves = 1 whole',.5,1.85,CC.a,.26);await tin(R,S.e1,.25);},
 'four fourths make a whole':async(R,S)=>{S.e2=blk(S.G,'4 fourths = 1 whole',.5,1.5+.0,CC.c,.26);S.e2.y=1.5+.0;S.e2.x=.5;S.e2.y=1.48;await split(R,S.P,0,.4);await tin(R,S.e2,.25);},
 'you are a sharing champion':async(R,S)=>{S.k=await popIn(R,'pa-miacheer',1.6,.15,1.05);await cheer(R,[S.k],.3,1.5);}
};
page('shapes2',6,{old:mkq(B),neu:mkq(B),tm:{"symmetry means both sides match": 0, "fair shares are equal parts": 2.48, "two halves make a whole": 5.09, "four fourths make a whole": 7.5, "you are a sharing champion": 9.07}});}
P.MU['shapes2']=[{"say": "What is symmetry?", "speech": "Look at this butterfly. Let us draw a line, straight down the middle. The left side and the right side are exactly the same, like a mirror. When both halves match, we say the shape has symmetry."}, {"say": "The fold test", "speech": "Here is a way to test for symmetry. Fold the shape along the line. If the two halves match exactly, with nothing sticking out, it has symmetry. This heart folds perfectly!"}, {"say": "Two halves make a whole", "speech": "Leo and Mia want to share one sandwich. We cut it straight down the middle, into two equal parts. Each part is one half. One half for Leo, and one half for Mia. Two halves make one whole."}, {"say": "Fair or not fair?", "speech": "Uh oh. What if we cut the sandwich like this? One part is big, and one part is small. The parts are not equal. That is not a fair share! Fair shares must be the same size."}, {"say": "Fourths", "speech": "Now four friends share one pizza. We cut it into four equal parts. Each part is one fourth. Some people call it a quarter. One, two, three, four. Four fourths make one whole pizza."}, {"say": "Halves or fourths?", "speech": "Halves are bigger than fourths. When we cut a pizza into more equal parts, each part gets smaller. Two friends get bigger pieces. Four friends get smaller pieces."}, {"say": "Sharing champions", "speech": "Symmetry means both sides match. Fair shares are equal parts. Two halves make a whole, and four fourths make a whole. You are a sharing champion!"}];
}
/* ---------- solids ---------- */
{
const KH=1.45;
const CC={a:'#1c7ed6',b:'#7048e8',c:'#e8590c',g:'#2b8a3e',r:'#e03131'};
/* roll an actor along the floor (it spins as it goes) */
const roll=(R,a,x,sec)=>{const x0=a.st.x,y=a.st.y;return R.T(sec||1.2,e=>{const k=e<.5?2*e*e:1-Math.pow(-2*e+2,2)/2;a.st.rz=-(x-x0)*k*3.2;a.at(x0+(x-x0)*k,y);});};
const slide=(R,a,x,sec)=>{const x0=a.st.x,y=a.st.y;return R.T(sec||1.0,e=>{const k=e<.5?2*e*e:1-Math.pow(-2*e+2,2)/2;a.at(x0+(x-x0)*k,y);});};
{const B={
 'this square is flat':async(R,S)=>{await R.bg('classroom');R.label('Flat or solid?','#7048e8');S.G=gfx(R);S.sq=shape(S.G,'square',-.9,1.0,.45,'#1c7ed6');await R.T(.5,e=>{S.sq.s=e;});S.t1=await tag(R,S.G,'flat: 2-D',-.9,1.75,CC.a,.28);},
 'like a drawing':async(R,S)=>{await R.T(.8,e=>{S.sq.hl=Math.sin(e*Math.PI);});},
 'look at this cube':async(R,S)=>{S.cu=await drop(R,'pa-cubey',.9,.25,.8);},
 'it is a solid':async(R,S)=>{S.t2=await tag(R,S.G,'solid: 3-D',.9,1.75,CC.c,.28);},
 'pick it up hold it and turn it around':async(R,S)=>{S.k=await enter(R,'pa-leowave',-1.95,1.3,{sec:.8});await S.cu.go(.9,.75,.5,{arc:.2});await R.T(1.2,e=>{S.cu.st.rz=Math.sin(e*Math.PI*2)*.5;S.cu.at(.9,.75);});await S.cu.go(.9,.25,.4);},
 'solids are three dimensional':async(R,S)=>{S.e=blk(S.G,'3-D = solid',.0,.35,CC.b,.3);S.e.y=.35;await tin(R,S.e,.3);await S.k.swap('pa-leocheer',.25,{h:1.3});}
};
page('solids',0,{old:mkq(B),neu:mkq(B),tm:{"this square is flat": 0, "like a drawing": 3.73, "look at this cube": 5.67, "it is a solid": 8.84, "pick it up hold it and turn it around": 11.82, "solids are three dimensional": 14.46}});}
{const B={
 'let us meet six solids':async(R,S)=>{await R.bg('playroom1');R.label('Meet the solids','#e8590c');S.G=gfx(R);S.a=[];S.t=[];
  S.add=async(k,x,y,h,name)=>{const a=await drop(R,k,x,y,h);S.a.push(a);const t=blk(S.G,name,x,y+h+.2,'#495057',.2);S.t.push(t);await tin(R,t,.2);};},
 'a sphere is round':async(R,S)=>{await S.add('pa-sphere',-1.45,1.05,.5,'sphere');},
 'a cube has square faces':async(R,S)=>{await S.add('pa-cubey',-.35,1.05,.5,'cube');},
 'a cylinder is like a can':async(R,S)=>{await S.add('pa-cylinder',.75,1.05,.55,'cylinder');},
 'a cone has a point on top':async(R,S)=>{await S.add('pa-cone',-1.45,.2,.6,'cone');R.fx('sparkle',-1.45,.82,8,{w:.15,t:.5});},
 'a pyramid has triangle sides':async(R,S)=>{await S.add('pa-pyramid',-.35,.2,.6,'pyramid');},
 'a rectangular prism is like a box':async(R,S)=>{await S.add('pa-prism',.75,.2,.55,'prism');await all(S.a.map((a,i)=>R.wait(i*.08).then(()=>a.jump(.15))));}
};
page('solids',1,{old:mkq(B),neu:mkq(B),tm:{"let us meet six solids": 0, "a sphere is round": 1.95, "a cube has square faces": 4.73, "a cylinder is like a can": 7.23, "a cone has a point on top": 9.82, "a pyramid has triangle sides": 12.41, "a rectangular prism is like a box": 16.27}});}
{const B={
 'are called faces':async(R,S)=>{await R.bg('classroom');R.label('Faces','#2b8a3e');S.G=gfx(R);S.cu=await drop(R,'pa-cubey',-.8,.25,.9);S.t=await tag(R,S.G,'face = flat part',-.8,1.55,CC.g,.28);R.fx('sparkle',-.8,.7,12,{w:.6,t:.7});},
 'a cube has six faces':async(R,S)=>{S.n=[];for(let i=0;i<6;i++){const b=blk(S.G,String(i+1),.4+(i%3)*.4,1.25-Math.floor(i/3)*.45,CC.a,.28);S.n.push(b);await tin(R,b,.15);await R.wait(.25);}},
 'every face is a square':async(R,S)=>{await bout(R,S.n,.2);S.sq=shape(S.G,'square',.75,1.0,.32,'#1c7ed6');await R.T(.4,e=>{S.sq.s=e;});},
 'press a cube into soft clay':async(R,S)=>{await all([bout(R,[S.t],.2),R.T(.3,e=>{S.sq.a=1-e;})]);S.clay=bar(S.G,-.25,.2,1.1,.28,'#f783ac');S.clay.s=0;await R.T(.4,e=>{S.clay.s=e;});S.cu.go(.3,1.2,.6,{arc:.3});await R.wait(.6);await S.cu.go(.3,.35,.35);R.fx('dust',.3,.35,14,{w:.7,t:.6});},
 'a square print':async(R,S)=>{await S.cu.go(-1.0,.8,.6,{arc:.3});S.pr=shape(S.G,'square',.3,.55,.28,'#d9a066');await R.T(.5,e=>{S.pr.s=e;});},
 'the face of the cube is a square':async(R,S)=>{S.e=blk(S.G,'cube face = square',.3,1.4,CC.b,.3);await tin(R,S.e,.3);await R.T(.7,e=>{S.pr.hl=Math.sin(e*Math.PI);});}
};
page('solids',2,{old:mkq(B),neu:mkq(B),tm:{"are called faces": 1.92, "a cube has six faces": 3.12, "every face is a square": 5.74, "press a cube into soft clay": 9.08, "a square print": 11.8, "the face of the cube is a square": 12.86}});}
{const B={
 'some solids roll':async(R,S)=>{await R.bg('schoolyard1');R.label('Roll or slide?','#c2255c');S.G=gfx(R);S.sp=await popIn(R,'pa-sphere',-1.3,1.2,.45);S.cu=await popIn(R,'pa-cubey',-1.3,.25,.45);S.k=await enter(R,'pa-samwave',-1.95,1.3,{sec:.8});},
 'give the sphere a push':async(R,S)=>{await S.k.go(-1.75,1.3,.3);},
 'it rolls away':async(R,S)=>{await roll(R,S.sp,1.3,1.6);S.t1=await tag(R,S.G,'rolls',1.3,1.85,CC.a,.28);},
 'round all over':async(R,S)=>{R.fx('sparkle',1.3,1.4,10,{w:.4,t:.6});},
 'push the cube':async(R,S)=>{await slide(R,S.cu,.3,1.0);R.fx('dust',.0,.3,10,{w:.5,t:.6});},
 'it slides':async(R,S)=>{S.t2=await tag(R,S.G,'slides',.3,.95,CC.c,.28);},
 'the cylinder can do both':async(R,S)=>{S.cy=await popIn(R,'pa-cylinder',-1.0,.25,.5);await slide(R,S.cy,-.4,.7);S.t3=await tag(R,S.G,'both!',-.6,1.0,CC.g,.28);await S.k.swap('pa-samcheer',.25,{h:1.3});}
};
page('solids',3,{old:mkq(B),neu:mkq(B),tm:{"some solids roll": 0, "give the sphere a push": 3.09, "it rolls away": 5.19, "round all over": 7.93, "push the cube": 9.03, "it slides": 10.78, "the cylinder can do both": 14.21}});}
{const B={
 'which solids can stack':async(R,S)=>{await R.bg('playroom1');R.label('Stack them up','#0c8599');S.G=gfx(R);S.k=await enter(R,'pa-milodance',-1.95,1.3,{sec:.9});},
 'cubes stack well':async(R,S)=>{S.c=[];},
 'one two three cubes':async(R,S)=>{for(let i=0;i<3;i++){const a=await drop(R,'pa-cubey',-.2,.25+i*.5,.52);S.c.push(a);R.word(String(i+1),.35,.5+i*.5,'#1c7ed6',.55);}},
 'a sphere will not stay on top':async(R,S)=>{S.sp=await drop(R,'pa-sphere',-.2,1.75,.42);await S.sp.shiver(.4);},
 'it rolls right off':async(R,S)=>{await S.sp.go(.5,1.2,.4,{arc:.15});await roll(R,S.sp,1.4,.9);await S.sp.go(1.45,.25,.5);R.fx('dust',1.45,.3,10,{w:.4,t:.5});await S.k.shiver(.5);}
};
page('solids',4,{old:mkq(B),neu:mkq(B),tm:{"which solids can stack": 0, "cubes stack well": 1.76, "one two three cubes": 6.74, "a sphere will not stay on top": 10.02, "it rolls right off": 11.91}});}
{const B={
 'solids are everywhere':async(R,S)=>{await R.bg('kitchen-day');R.label('Solids around us','#e67700');S.G=gfx(R);S.mia=await enter(R,'pa-miawave',-1.95,1.3,{sec:.9});S.r=[];
  S.add=async(k,x,h,name)=>{const a=await drop(R,k,x,.25,h);S.r.push(a);const t=blk(S.G,name,x,.25+h+.25,'#495057',.2);await tin(R,t,.2);};},
 'an orange is a sphere':async(R,S)=>{await S.add('pa-orange',-1.1,.42,'sphere');},
 'a soup can is a cylinder':async(R,S)=>{await S.add('pa-can',-.45,.55,'cylinder');},
 'an ice cream cone is a cone':async(R,S)=>{await S.add('pa-icecream',.2,.65,'cone');},
 'a gift box is a cube':async(R,S)=>{await S.add('pa-giftbox',.85,.5,'cube');},
 'a cereal box is a rectangular prism':async(R,S)=>{await S.add('pa-cereal',1.5,.75,'prism');},
 'yum':async(R,S)=>{await S.mia.swap('pa-miacheer',.25,{h:1.3});await all(S.r.map((a,i)=>R.wait(i*.08).then(()=>a.jump(.15))));}
};
page('solids',5,{old:mkq(B),neu:mkq(B),tm:{"solids are everywhere": 1.11, "an orange is a sphere": 2.84, "a soup can is a cylinder": 5.08, "an ice cream cone is a cone": 7.46, "a gift box is a cube": 10.22, "a cereal box is a rectangular prism": 13.51, "yum": 16.39}});}
{const B={
 'sphere cube cylinder cone pyramid and prism':async(R,S)=>{await R.bg('schoolyard1');R.label('Solid champions!','#7048e8');S.G=gfx(R);S.a=[];
  const L=[['pa-sphere',.42],['pa-cubey',.42],['pa-cylinder',.48],['pa-cone',.52],['pa-pyramid',.5],['pa-prism',.46]];for(let i=0;i<6;i++){const a=await popIn(R,L[i][0],-1.5+i*.6,.25,L[i][1]);S.a.push(a);await R.wait(.25);}},
 'faces are the flat parts':async(R,S)=>{S.t=await tag(R,S.G,'faces = flat parts',.0,1.6,CC.g,.28);},
 'round solids roll':async(R,S)=>{await roll(R,S.a[0],-1.2,.6);await roll(R,S.a[0],-1.5,.6);},
 'slide and stack':async(R,S)=>{await S.a[1].jump(.2);},
 'a solid shape champion':async(R,S)=>{S.tr=await drop(R,'pa-trophy',.0,1.0,.5);R.fx('sparkle',0,1.4,20,{w:1,t:1});await all(S.a.map(a=>a.jump(.18)));}
};
page('solids',6,{old:mkq(B),neu:mkq(B),tm:{"sphere cube cylinder cone pyramid and prism": 0, "faces are the flat parts": 3.93, "round solids roll": 6.55, "slide and stack": 9.73, "a solid shape champion": 12.07}});}
P.MU['solids']=[{"say": "Flat or solid?", "speech": "This square is flat. It lies on the paper, like a drawing. Now look at this cube. It is not flat! It is a solid. You can pick it up, hold it, and turn it around. Solids are three dimensional."}, {"say": "Meet the solids", "speech": "Let us meet six solids. A sphere is round, like a ball. A cube has square faces. A cylinder is like a can. A cone has a point on top. A pyramid has triangle sides. And a rectangular prism is like a box."}, {"say": "Faces", "speech": "The flat parts of a solid are called faces. A cube has six faces, and every face is a square. Watch! When we press a cube into soft clay, it leaves a square print. The face of the cube is a square."}, {"say": "Roll or slide?", "speech": "Some solids roll, and some solids slide. Give the sphere a push. It rolls away, because it is round all over. Push the cube. It slides, because its faces are flat. The cylinder can do both!"}, {"say": "Stack them up", "speech": "Which solids can stack? Cubes stack well, because their flat faces sit on top of each other. One, two, three cubes! But a sphere will not stay on top. It rolls right off!"}, {"say": "Solids around us", "speech": "Look around! Solids are everywhere. An orange is a sphere. A soup can is a cylinder. An ice cream cone is a cone. A gift box is a cube. And a cereal box is a rectangular prism. Yum!"}, {"say": "Solid champions", "speech": "Sphere, cube, cylinder, cone, pyramid, and prism. Faces are the flat parts. Round solids roll, and flat faces slide and stack. You are a solid shape champion!"}];
}
/* ---------- where1 ---------- */
{
const KH=1.45;
const CC={a:'#1c7ed6',b:'#7048e8',c:'#e8590c',g:'#2b8a3e',r:'#e03131'};
{const B={
 'position words tell us where things are':async(R,S)=>{await R.bg('livingroom');R.label('Where is it?','#7048e8');S.G=gfx(R);S.box=await drop(R,'pa-openbox',-.2,.25,.75);},
 'where is the puppy':async(R,S)=>{S.p=mk(R,'pa-puppy2',{x:2.5,y:.25,h:.6,face:-1});await S.p.show(.2);await S.p.go(.75,.25,1.1,{hops:3});R.word('?',.75,1.15,'#7048e8',1);},
 'near the box':async(R,S)=>{await S.p.go(.55,.25,.5,{hops:1});S.t=await tag(R,S.G,'near',.55,1.1,CC.g,.28);},
 'or far away':async(R,S)=>{await bout(R,[S.t],.2);await S.p.go(1.5,.45,.8,{hops:2});S.t2=await tag(R,S.G,'far',1.5,1.25,CC.c,.28);},
 'the words that tell where':async(R,S)=>{S.k=await enter(R,'pa-norawave',-1.95,1.3,{sec:.9});speak(S.k,'Where, where?',1600);}
};
page('where1',0,{old:mkq(B),neu:mkq(B),tm:{"position words tell us where things are": 0, "where is the puppy": 2.59, "near the box": 5.57, "or far away": 6.62, "the words that tell where": 8.87}});}
{const B={
 'in front of the box':async(R,S)=>{await R.bg('livingroom');R.label('In front of, behind','#e8590c');S.G=gfx(R);
  S.kit=mk(R,'pa-kitten',{x:-.2,y:.62,h:.55,face:1});S.box=await drop(R,'pa-openbox',-.2,.25,.8);S.p=mk(R,'pa-puppy2',{x:1.6,y:.12,h:.62,face:-1});await S.p.show(.2);await S.p.go(-.1,.05,.9,{hops:3});
  S.t1=await tag(R,S.G,'in front of',.75,.55,CC.a,.28);},
 'we can see all of it':async(R,S)=>{await S.p.jump(.2);R.fx('sparkle',-.1,.4,10,{w:.5,t:.6});},
 'the kitten hides behind the box':async(R,S)=>{await S.p.go(1.25,.05,.6,{hops:2});await S.kit.show(.3);S.t2=await tag(R,S.G,'behind',-.2,1.75,CC.c,.28);},
 'only see a little bit of the kitten':async(R,S)=>{await S.kit.go(-.2,.72,.4);await S.kit.go(-.2,.62,.4);},
 'peek a boo':async(R,S)=>{await S.kit.go(-.75,.62,.5);await S.kit.jump(.25);await S.kit.go(-.2,.62,.5);hearts(R,-.2,1.5,6);}
};
page('where1',1,{old:mkq(B),neu:mkq(B),tm:{"in front of the box": 1.03, "we can see all of it": 2.33, "the kitten hides behind the box": 5.34, "only see a little bit of the kitten": 10.03, "peek a boo": 12.2}});}
{const B={
 'look at the plate':async(R,S)=>{await R.bg('kitchen-day');R.label('Left and right','#1c7ed6');S.G=gfx(R);S.pl=await drop(R,'pa-plate',.0,.25,.45);},
 'on the left side of the plate':async(R,S)=>{S.ap=await drop(R,'pa-apple2',-1.0,.25,.5);S.ar1=span(S.G,-.4,1.0,-1.4,1.0,CC.a);S.ar1.a=0;await drawS(R,S.ar1,.4);S.t1=await tag(R,S.G,'left',-1.0,1.4,CC.a,.32);},
 'on the right side of the plate':async(R,S)=>{S.ba=await drop(R,'pa-banana',1.0,.25,.5);S.ar2=span(S.G,.4,1.0,1.4,1.0,CC.c);await drawS(R,S.ar2,.4);S.t2=await tag(R,S.G,'right',1.0,1.4,CC.c,.32);},
 'left and right':async(R,S)=>{await S.ap.jump(.2);await S.ba.jump(.2);},
 'they are opposite sides':async(R,S)=>{await all([glowB(R,S.t1,.8),glowB(R,S.t2,.8)]);}
};
page('where1',2,{old:mkq(B),neu:mkq(B),tm:{"look at the plate": 0, "on the left side of the plate": 2.73, "on the right side of the plate": 6.06, "left and right": 8.05, "they are opposite sides": 9.92}});}
{const B={
 'a trick to find your left':async(R,S)=>{await R.bg('classroom');R.label('The L trick','#2b8a3e');S.G=gfx(R);S.k=await enter(R,'pa-teacher',-1.95,1.5,{sec:.9});},
 'hold up both hands':async(R,S)=>{S.l=mk(R,'hand',{x:-.6,y:.4,h:.9,face:-1});S.r=mk(R,'hand',{x:.8,y:.4,h:.9,face:1});await all([S.l.show(.4,'pop'),S.r.show(.4,'pop')]);},
 'thumbs out':async(R,S)=>{await all([S.l.wag(.5,.12,2),S.r.wag(.5,.12,2)]);},
 'makes the letter l':async(R,S)=>{S.lt=blk(S.G,'L',-.6,1.6,CC.g,.6);await tin(R,S.lt,.35);await glowB(R,S.lt,.8);},
 'that is your left hand':async(R,S)=>{S.t1=await tag(R,S.G,'left',-.6,.25,CC.a,.32);await S.l.jump(.2);},
 'the other one is your right':async(R,S)=>{S.t2=await tag(R,S.G,'right',.8,.25,CC.c,.32);await S.r.jump(.2);await S.k.jump(.2);}
};
page('where1',3,{old:mkq(B),neu:mkq(B),tm:{"a trick to find your left": 0.62, "hold up both hands": 2.3, "thumbs out": 5.89, "makes the letter l": 7.9, "that is your left hand": 9.11, "the other one is your right": 11.19}});}
{const B={
 'the bunny sits next to the puppy':async(R,S)=>{await R.bg('park');R.label('Next to, between','#c2255c');S.G=gfx(R);S.p=await popIn(R,'pa-puppy2',-.75,.25,.65);S.b=await popIn(R,'pa-bunny',.05,.25,.6);S.t1=await tag(R,S.G,'next to',-.35,1.25,CC.a,.28);},
 'the kitten comes along':async(R,S)=>{S.k=mk(R,'pa-kitten',{x:2.6,y:.25,h:.6,face:-1});await S.k.show(.2);await S.k.go(.85,.25,1.0,{hops:3});await bout(R,[S.t1],.2);},
 'between the puppy and the kitten':async(R,S)=>{S.l1=vline(S.G,-.35,.2,1.2,'#e03131');S.l2=vline(S.G,.45,.2,1.2,'#e03131');await all([drawL(R,S.l1,.5),drawL(R,S.l2,.5)]);S.t2=await tag(R,S.G,'between',.05,1.45,CC.c,.3);await S.b.jump(.25);},
 'in the middle of two things':async(R,S)=>{await all([S.p.jump(.15),S.k.jump(.15)]);hearts(R,.05,1.2,6);}
};
page('where1',4,{old:mkq(B),neu:mkq(B),tm:{"the bunny sits next to the puppy": 0, "the kitten comes along": 3.06, "between the puppy and the kitten": 6.06, "in the middle of two things": 9.48}});}
{const B={
 'let us follow directions':async(R,S)=>{await R.bg('playroom1');R.label('Follow the directions','#0c8599');S.G=gfx(R);S.ch=await drop(R,'pa-chair2',.0,.35,.85);
  S.ball=await popIn(R,'ball',-1.6,1.6,.35);S.ted=await popIn(R,'pa-teddy2',-1.0,1.6,.45);S.cat=await popIn(R,'pa-kitten',1.5,1.6,.42);},
 'put the ball to the right of the chair':async(R,S)=>{await S.ball.go(.85,.35,.8,{arc:.5});S.t1=await tag(R,S.G,'right',.85,.95,CC.c,.24);},
 'good':async(R,S)=>{R.fx('sparkle',.85,.55,10,{w:.4,t:.6});},
 'to the left of the chair':async(R,S)=>{await S.ted.go(-.85,.35,.8,{arc:.5});S.t2=await tag(R,S.G,'left',-.85,1.05,CC.a,.24);},
 'put the cat in front of the chair':async(R,S)=>{await S.cat.go(.05,.08,.8,{arc:.5});S.t3=await tag(R,S.G,'in front',.05,.0+.02,CC.g,.22);S.t3.y=.02;},
 'you did it':async(R,S)=>{await all([S.ball.jump(.15),S.ted.jump(.15),S.cat.jump(.15)]);hearts(R,0,1.5,8);}
};
page('where1',5,{old:mkq(B),neu:mkq(B),tm:{"let us follow directions": 0, "put the ball to the right of the chair": 1.95, "good": 4.7, "to the left of the chair": 7.08, "put the cat in front of the chair": 9.52, "you did it": 11.48}});}
{const B={
 'in front of and behind':async(R,S)=>{await R.bg('schoolyard1');R.label('Position champions!','#7048e8');S.G=gfx(R);S.w=[];for(const[t,x]of[['in front of',-1.2],['behind',.2]]){S.w.push(blk(S.G,t,x,1.8,CC.a,.28));}for(const b of S.w)await tin(R,b,.2);},
 'left and right':async(R,S)=>{for(const[t,x]of[['left',-1.2],['right',.2]]){const b=blk(S.G,t,x,1.35,CC.c,.28);S.w.push(b);await tin(R,b,.2);}},
 'next to and between':async(R,S)=>{for(const[t,x]of[['next to',-1.2],['between',.2]]){const b=blk(S.G,t,x,.9,CC.g,.28);S.w.push(b);await tin(R,b,.2);}},
 'tell exactly where things are':async(R,S)=>{await wave(R,S.w);},
 'great job':async(R,S)=>{S.k=await popIn(R,'pa-norawave',1.45,.15,1.1);await cheer(R,[S.k],.5,1.6);}
};
page('where1',6,{old:mkq(B),neu:mkq(B),tm:{"in front of and behind": 0, "left and right": 1.81, "next to and between": 3.68, "tell exactly where things are": 7.83, "great job": 9.82}});}
P.MU['where1']=[{"say": "Position words", "speech": "Position words tell us where things are. Where is the puppy? Is it near the box, or far away? Let us learn the words that tell where."}, {"say": "In front of and behind", "speech": "The puppy sits in front of the box. We can see all of it. Now the kitten hides behind the box. The box is in the way, so we only see a little bit of the kitten. Peek a boo!"}, {"say": "Left and right", "speech": "Look at the plate. The apple is on the left side of the plate. The banana is on the right side of the plate. Left, and right. They are opposite sides."}, {"say": "The L trick", "speech": "Here is a trick to find your left. Hold up both hands, with your fingers up and thumbs out. Which hand makes the letter L? That is your left hand! The other one is your right."}, {"say": "Next to and between", "speech": "The bunny sits next to the puppy. Now the kitten comes along. The bunny is between the puppy and the kitten. Between means in the middle of two things."}, {"say": "Follow the directions", "speech": "Let us follow directions. Put the ball to the right of the chair. Good! Now put the teddy bear to the left of the chair. Now put the cat in front of the chair. You did it!"}, {"say": "Position champions", "speech": "In front of, and behind. Left, and right. Next to, and between. Position words help us tell exactly where things are. Great job!"}];
}
/* ---------- where2 ---------- */
{
const KH=1.45;
const CC={a:'#1c7ed6',b:'#7048e8',c:'#e8590c',g:'#2b8a3e',r:'#e03131'};
{const B={
 'here is a big box':async(R,S)=>{await R.bg('livingroom');R.label('Inside, outside','#e8590c');S.G=gfx(R);S.box=await drop(R,'pa-openbox',-.3,.25,.9);},
 'the bunny hops inside the box':async(R,S)=>{S.b=mk(R,'pa-bunny',{x:-1.7,y:.25,h:.6,face:1});await S.b.show(.2);await S.b.go(-1.0,.25,.6,{hops:2});await S.b.go(-.3,.72,.6,{arc:.7});R.fx('dust',-.3,.8,10,{w:.5,t:.5});},
 'now the bunny is in the box':async(R,S)=>{S.t1=await tag(R,S.G,'inside',-.3,1.7,CC.a,.3);await S.box.shiver(.4);},
 'the puppy stays outside the box':async(R,S)=>{S.p=await enter(R,'pa-puppy2',1.1,.65,{from:2.8,sec:1});S.t2=await tag(R,S.G,'outside',1.1,1.25,CC.c,.3);},
 'inside means in':async(R,S)=>{await all([glowB(R,S.t1,.7),S.b.jump(.15)]);},
 'outside means out':async(R,S)=>{await all([glowB(R,S.t2,.7),S.p.jump(.15)]);}
};
page('where2',0,{old:mkq(B),neu:mkq(B),tm:{"here is a big box": 0, "the bunny hops inside the box": 1.75, "now the bunny is in the box": 4.62, "the puppy stays outside the box": 7.22, "inside means in": 10.1, "outside means out": 12.13}});}
{const B={
 'look at the bridge':async(R,S)=>{await R.bg('laketown1');R.label('Over and under','#1c7ed6');S.G=gfx(R);S.br=await drop(R,'pa-bridge',.0,.35,.85);},
 'a bird flies over the bridge':async(R,S)=>{S.bird=mk(R,'bird',{x:-2.4,y:1.6,h:.35,face:1});await S.bird.show(.2);await S.bird.go(1.0,1.5,1.6,{arc:.3});S.t1=await tag(R,S.G,'over',.0,1.95,CC.a,.3);},
 'high above it':async(R,S)=>{S.a1=span(S.G,.0,1.15,.0,1.4,CC.a);await drawS(R,S.a1,.4);},
 'a duck swims under the bridge':async(R,S)=>{S.d=mk(R,'pa-duck',{x:-1.8,y:.3,h:.32,face:1});await S.d.show(.2);await S.d.go(.0,.33,1.3,{lin:true,wob:.02});S.t2=await tag(R,S.G,'under',-.9,.95,CC.c,.3);},
 'down below it':async(R,S)=>{await S.d.go(1.3,.33,1.0,{lin:true,wob:.02});},
 'over is up and across':async(R,S)=>{await S.bird.go(1.6,1.6,.7,{arc:.2});},
 'under is down beneath':async(R,S)=>{await S.d.jump(.15);}
};
page('where2',1,{old:mkq(B),neu:mkq(B),tm:{"look at the bridge": 0, "a bird flies over the bridge": 1.36, "high above it": 4.04, "a duck swims under the bridge": 5.03, "down below it": 7.72, "over is up and across": 8.68, "under is down beneath": 11.06}});}
{const B={
 'look at the table':async(R,S)=>{await R.bg('kitchen-day');R.label('On and under','#2b8a3e');S.G=gfx(R);S.tb=await drop(R,'pa-table',.0,.25,.95);},
 'the cupcake is on the table':async(R,S)=>{S.c=await drop(R,'pa-cupcake',.0,1.1,.4);S.t1=await tag(R,S.G,'on',.75,1.4,CC.a,.32);},
 'right on top':async(R,S)=>{R.fx('sparkle',.0,1.4,10,{w:.4,t:.6});},
 'the kitten naps under the table':async(R,S)=>{S.k=mk(R,'pa-kitten',{x:-1.8,y:.25,h:.45,face:1});await S.k.show(.2);await S.k.go(-.05,.25,1.0,{hops:2});S.t2=await tag(R,S.G,'under',-.95,.75,CC.c,.32);},
 'below the table top':async(R,S)=>{R.word('zzz',.3,.75,'#7048e8',.6);},
 'on and under':async(R,S)=>{await all([glowB(R,S.t1,.7),glowB(R,S.t2,.7)]);}
};
page('where2',2,{old:mkq(B),neu:mkq(B),tm:{"look at the table": 0.38, "the cupcake is on the table": 1.61, "right on top": 5.44, "the kitten naps under the table": 6.47, "below the table top": 10.37, "on and under": 11.89}});}
{const B={
 'a balloon floats above the umbrella':async(R,S)=>{await R.bg('street');R.label('Above and below','#c2255c');S.G=gfx(R);S.u=await drop(R,'pa-umbrella2',.0,.55,.8);
  S.b=mk(R,'pa-balloon',{x:.0,y:.3,h:.5,face:1});await S.b.show(.2);await S.b.go(.0,1.45,1.4,{wob:.03});S.t1=await tag(R,S.G,'above',.85,1.75,CC.a,.3);},
 'a puddle is below the umbrella':async(R,S)=>{S.p=ell(S.G,.0,.28,.5,.12,'#74c0fc',{rim:'#a5d8ff'});await R.T(.4,e=>{S.p.s=e;});R.fx('splash',0,.3,10,{w:.6,t:.6});S.t2=await tag(R,S.G,'below',.85,.3,CC.c,.3);},
 'above means higher up':async(R,S)=>{S.a1=span(S.G,-.75,1.5,-.75,1.0,CC.a);await drawS(R,S.a1,.4);await S.b.go(0,1.6,.5,{wob:.02});},
 'below means lower down':async(R,S)=>{S.a2=span(S.G,-.75,.85,-.75,.35,CC.c);await drawS(R,S.a2,.4);},
 'up and down':async(R,S)=>{await S.b.go(0,1.45,.5);}
};
page('where2',3,{old:mkq(B),neu:mkq(B),tm:{"a balloon floats above the umbrella": 0, "a puddle is below the umbrella": 2.37, "above means higher up": 5.27, "below means lower down": 7.38, "up and down": 9.78}});}
{const B={
 'the tree is near to leo':async(R,S)=>{await R.bg('sunhill1');R.label('Near and far','#0c8599');S.G=gfx(R);S.leo=await enter(R,'pa-leowave',-1.6,1.3,{sec:.9});S.tr=await popIn(R,'pa-summertree',-.85,.2,1.1);S.t1=await tag(R,S.G,'near',-.85,1.55,CC.g,.3);},
 'he can touch it':async(R,S)=>{await S.leo.go(-1.3,.2,.4);await S.tr.shiver(.4);},
 'the house is far from leo':async(R,S)=>{S.h=await popIn(R,'pa-house',1.4,.9,.55);S.t2=await tag(R,S.G,'far',1.4,1.75,CC.c,.3);},
 'walk a long way':async(R,S)=>{S.path=span(S.G,-1.0,.35,1.3,.9,'#868e96');await drawS(R,S.path,.8);},
 'near means close by':async(R,S)=>{await glowB(R,S.t1,.7);},
 'far means a long way away':async(R,S)=>{await glowB(R,S.t2,.7);}
};
page('where2',4,{old:mkq(B),neu:mkq(B),tm:{"the tree is near to leo": 0, "he can touch it": 1.77, "the house is far from leo": 3.61, "walk a long way": 7.34, "near means close by": 9.12, "far means a long way away": 11.39}});}
{const B={
 'let us play a game':async(R,S)=>{await R.bg('park');R.label('Where is the frog?','#7048e8');S.G=gfx(R);S.rk=await drop(R,'pa-rock2',-1.35,.2,.4);S.u=await drop(R,'pa-umbrella2',-.35,.3,.85);S.bk=await drop(R,'pa-bucket',.6,.2,.45);S.bx=await drop(R,'pa-openbox',1.4,.2,.6);},
 'where is the frog':async(R,S)=>{S.f=mk(R,'pa-frog',{x:-1.35,y:1.6,h:.32,face:1});await S.f.show(.3,'pop');},
 'the frog is on the rock':async(R,S)=>{await S.f.go(-1.35,.55,.5,{arc:.2});S.t=blk(S.G,'on',-1.35,1.15,CC.a,.28);await tin(R,S.t,.25);},
 'under the umbrella':async(R,S)=>{await S.f.go(-.35,.22,.6,{arc:.5});S.t.text='under';S.t.x=-.35;S.t.y=1.5;await glowB(R,S.t,.5);},
 'next to the bucket':async(R,S)=>{await S.f.go(.95,.22,.6,{arc:.5});S.t.text='next to';S.t.x=.85;S.t.y=.95;await glowB(R,S.t,.5);},
 'inside the box':async(R,S)=>{await S.f.go(1.4,.55,.6,{arc:.6});S.t.text='inside';S.t.x=1.4;S.t.y=1.2;await glowB(R,S.t,.5);},
 'hop hop':async(R,S)=>{await S.f.jump(.25);hearts(R,1.4,1.4,6);}
};
page('where2',5,{old:mkq(B),neu:mkq(B),tm:{"let us play a game": 0, "where is the frog": 1.49, "the frog is on the rock": 3.37, "under the umbrella": 7.56, "next to the bucket": 10.54, "inside the box": 13.61, "hop hop": 14.79}});}
{const B={
 'inside and outside':async(R,S)=>{await R.bg('schoolyard1');R.label('Where words!','#e8590c');S.G=gfx(R);S.w=[];for(const[t,x]of[['inside',-1.2],['outside',.1]]){const b=blk(S.G,t,x,1.85,CC.a,.28);S.w.push(b);await tin(R,b,.2);}},
 'over and under':async(R,S)=>{for(const[t,x]of[['over',-1.2],['under',.1]]){const b=blk(S.G,t,x,1.42,CC.c,.28);S.w.push(b);await tin(R,b,.2);}},
 'on above and below':async(R,S)=>{for(const[t,x]of[['on',-1.4],['above',-.6],['below',.2]]){const b=blk(S.G,t,x,1.0,CC.g,.28);S.w.push(b);await tin(R,b,.2);}},
 'near and far':async(R,S)=>{for(const[t,x]of[['near',-1.2],['far',.1]]){const b=blk(S.G,t,x,.58,CC.b,.28);S.w.push(b);await tin(R,b,.2);}},
 'tell where anything is':async(R,S)=>{await wave(R,S.w);S.k=await popIn(R,'pa-leocheer',1.45,.15,1.1);await cheer(R,[S.k],.5,1.6);}
};
page('where2',6,{old:mkq(B),neu:mkq(B),tm:{"inside and outside": 0, "over and under": 1.77, "on above and below": 3.54, "near and far": 5.88, "tell where anything is": 8.97}});}
P.MU['where2']=[{"say": "Inside and outside", "speech": "Here is a big box. The bunny hops inside the box. Now the bunny is in the box. The puppy stays outside the box. Inside means in. Outside means out."}, {"say": "Over and under", "speech": "Look at the bridge. A bird flies over the bridge, high above it. A duck swims under the bridge, down below it. Over is up and across. Under is down beneath."}, {"say": "On and under the table", "speech": "Now look at the table. The cupcake is on the table. It sits right on top. The kitten naps under the table. It is below the table top. On, and under."}, {"say": "Above and below", "speech": "A balloon floats above the umbrella. A puddle is below the umbrella. Above means higher up. Below means lower down. Up and down!"}, {"say": "Near and far", "speech": "The tree is near to Leo. He can touch it. The house is far from Leo. He has to walk a long way to get there. Near means close by. Far means a long way away."}, {"say": "Where is the frog?", "speech": "Let us play a game. Where is the frog? The frog is on the rock. Now the frog is under the umbrella. Now the frog is next to the bucket. Now the frog is inside the box. Hop, hop!"}, {"say": "Where words champions", "speech": "Inside and outside. Over and under. On, above, and below. Near and far. Now you can tell where anything is!"}];
}
P.DIR.mount();
})();
