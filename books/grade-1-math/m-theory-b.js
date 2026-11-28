/* Grade 1 Math: staged 3D theory pages (group b). Generated from snippets. ASCII only. */
(function(){
"use strict";
const P=window.PM;if(!P||!P.DIR||!P.G1H||!P.G1X||!P.MK)return;
const page=P.DIR.page;P.MU=P.MU||{};
const {all,pop,liteq,mkq,hearts,tin,tout,glow,moveT,fly,tileFly,squash,wave}=P.G1H;
const {blk,rowX,sentence,reflow,bfly,bshake,bpulse,bout,bcross,recolor,mk,enter,drop,popIn,cheer,crates,intoCrate,markB,speak}=P.G1X;
const {gfx}=P.MK;
const {tally,mark,clock,turn,pie,split,shape,chart,tframe,growF,nline,drawN,ell,span,drawS,pulse,num,balance,pencil,shade,bar,cube,tower,tag,growX,growY,slideB,glowB,vline,hline,drawL,fadeL,boing}=P.MK;
const rnd=(a,b)=>a+Math.random()*(b-a);
/* ---------- num20 ---------- */
{
const KH=1.45;
const CC={a:'#1c7ed6',b:'#7048e8',c:'#e8590c',g:'#2b8a3e',r:'#e03131'};
const NW=['zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen','twenty'];
/* drop n counters into a ten frame, one by one, saying the count */
const fillF=async(R,S,F,n,from,col,say)=>{const out=[];
  if(say===false){for(let i=0;i<n;i++){const c=F.cell((from&&from>=10?0:0)+i);const a=mk(R,'pa-counter',{x:c.x,y:c.y+.4,h:.2,face:1});out.push(a);R.wait(i*.05).then(()=>{a.show(.1);a.go(c.x,c.y-.1,.25,{arc:.05});});}await R.wait(n*.05+.35);return out;}
  for(let i=0;i<n;i++){const c=F.cell(i);const a=mk(R,'pa-counter',{x:c.x,y:c.y+.4,h:.2,face:1});out.push(a);a.show(.1);a.go(c.x,c.y-.1,.22,{arc:.05});R.word(String((from||0)+i+1),c.x,c.y+.32,'#1c7ed6',.55);await R.wait(.3);}return out;};
{const B={
 'let us count the ladybugs':async(R,S)=>{await R.bg('forest1');R.label('Count carefully','#e03131');S.G=gfx(R);
  S.lb=[];const pos=[[-1.3,.3],[-.6,.55],[.1,.3],[.8,.6],[1.35,.3],[-.95,1.05],[.45,1.1]];for(const[x,y]of pos){const a=mk(R,'pa-ladybug',{x,y,h:.3,face:1});S.lb.push(a);a.show(.3,'pop');await R.wait(.12);}
  S.k=await enter(R,'pa-timpoint',-1.95,1.3,{sec:.9});},
 'touch each one just once':async(R,S)=>{S.h=mk(R,'hand',{x:-1.3,y:.75,h:.3,face:1});await S.h.show(.25,'pop');await S.h.go(-1.3,.55,.3);await S.lb[0].jump(.12);},
 'one two three four five six seven':async(R,S)=>{S.n=[];for(let i=0;i<7;i++){const a=S.lb[i];await S.h.go(a.st.x+.05,a.st.y+.3,.25,{arc:.15});a.jump(.15);const t=blk(S.G,String(i+1),a.st.x,a.st.y+.5,CC.a,.26);S.n.push(t);await tin(R,t,.18);await R.wait(.32);}},
 'the last number we say':async(R,S)=>{await all([glowB(R,S.n[6],1),S.lb[6].jump(.25)]);},
 'there are seven ladybugs':async(R,S)=>{await S.h.hide(.2);S.t=await num(R,S.G,7,.0,1.85,CC.r,.5);hearts(R,.0,1.6,8);}
};
page('num20',0,{old:mkq(B),neu:mkq(B),tm:{"let us count the ladybugs": 0, "touch each one just once": 3.72, "one two three four five six seven": 6.49, "the last number we say": 9.95, "there are seven ladybugs": 13.39}});}
{const B={
 'this is a ten frame':async(R,S)=>{await R.bg('classroom');R.label('The ten frame','#1c7ed6');S.G=gfx(R);S.F=tframe(S.G,.0,.75,.4);await growF(R,S.F,.7);S.leo=await enter(R,'pa-leowave',-1.95,1.35,{sec:1});},
 'two rows of five':async(R,S)=>{S.r1=span(S.G,-1.0,1.38,1.0,1.38,CC.c);await drawS(R,S.r1,.5);S.t5=await tag(R,S.G,'5',1.25,.95,CC.c,.28);S.t5b=await tag(R,S.G,'5',1.25,.55,CC.c,.28);},
 'one in each box':async(R,S)=>{await all([fadeL(R,S.r1,.3),bout(R,[S.t5,S.t5b],.3)]);},
 'one two three four five six seven eight nine ten':async(R,S)=>{S.c=await fillF(R,S,S.F,10,0);},
 'a full ten frame always shows ten':async(R,S)=>{S.t=await num(R,S.G,10,0,1.65,CC.r,.5);await all([pulse(R,S.F,.9),S.leo.swap('pa-leocheer',.25,{h:1.35})]);}
};
page('num20',1,{old:mkq(B),neu:mkq(B),tm:{"this is a ten frame": 0, "two rows of five": 4.17, "one in each box": 8.25, "one two three four five six seven eight nine ten": 9.39, "a full ten frame always shows ten": 14.05}});}
{const B={
 'let us make thirteen':async(R,S)=>{await R.bg('classroom');R.label('Teen numbers','#7048e8');S.G=gfx(R);S.F1=tframe(S.G,-.95,.75,.3);S.F2=tframe(S.G,.95,.75,.3,{col:'#e8590c'});},
 'one full ten frame':async(R,S)=>{await growF(R,S.F1,.5);S.c1=await fillF(R,S,S.F1,10,0,null,false);S.t1=await tag(R,S.G,'10',-.95,1.3,CC.a,.3);},
 'three more ones':async(R,S)=>{await growF(R,S.F2,.5);S.c2=await fillF(R,S,S.F2,3,10);S.t2=await tag(R,S.G,'3',.95,1.3,CC.c,.3);},
 'makes thirteen':async(R,S)=>{S.eq=blk(S.G,'10 + 3 = 13',0,1.8,CC.b,.36);await tin(R,S.eq,.35);hearts(R,0,1.6,6);},
 'the one means one ten':async(R,S)=>{await bout(R,[S.eq],.2);S.d1=blk(S.G,'1',-.22,1.8,CC.a,.5);S.d2=blk(S.G,'3',.28,1.8,CC.c,.5);await tin(R,S.d1,.3);await tin(R,S.d2,.3);
  await all([glowB(R,S.d1,.9),pulse(R,S.F1,.9),glowB(R,S.t1,.9)]);},
 'the three means three ones':async(R,S)=>{await all([glowB(R,S.d2,.9),pulse(R,S.F2,.9),glowB(R,S.t2,.9),...S.c2.map(c=>c.jump(.15))]);}
};
page('num20',2,{old:mkq(B),neu:mkq(B),tm:{"let us make thirteen": 0.4, "one full ten frame": 3.09, "three more ones": 7.27, "makes thirteen": 10.06, "the one means one ten": 13.2, "the three means three ones": 15.06}});}
{const B={
 'every teen number':async(R,S)=>{await R.bg('playroom1');R.label('Ten and some more','#2b8a3e');S.G=gfx(R);S.F1=tframe(S.G,-.95,.75,.3);S.F2=tframe(S.G,.95,.75,.3,{col:'#e8590c'});
  await all([growF(R,S.F1,.5),growF(R,S.F2,.5)]);S.c1=await fillF(R,S,S.F1,10,0,null,false);S.ones=[];},
 'sixteen is ten and six':async(R,S)=>{S.ones=S.ones.concat(await fillF(R,S,S.F2,6,10,null,false));S.e=blk(S.G,'16 = 10 + 6',0,1.75,CC.b,.34);await tin(R,S.e,.3);},
 'eighteen is ten and eight':async(R,S)=>{for(let i=6;i<8;i++){const c=S.F2.cell(i);const a=mk(R,'pa-counter',{x:c.x,y:c.y+.6,h:.2,face:1});S.ones.push(a);await a.show(.1);await a.go(c.x,c.y-.1,.28,{arc:.1});}
  S.e.text='18 = 10 + 8';await glowB(R,S.e,.7);},
 'nineteen is ten and nine':async(R,S)=>{const c=S.F2.cell(8);const a=mk(R,'pa-counter',{x:c.x,y:c.y+.6,h:.2,face:1});S.ones.push(a);await a.show(.1);await a.go(c.x,c.y-.1,.28,{arc:.1});S.e.text='19 = 10 + 9';await glowB(R,S.e,.7);},
 'we would fill another ten':async(R,S)=>{const c=S.F2.cell(9);S.h=blk(S.G,'?',c.x,c.y,CC.r,.28);await tin(R,S.h,.3);await bpulse(R,S.h,.8);}
};
page('num20',3,{old:mkq(B),neu:mkq(B),tm:{"every teen number": 0, "sixteen is ten and six": 3.5, "eighteen is ten and eight": 6.09, "nineteen is ten and nine": 8.5, "we would fill another ten": 12.82}});}
{const B={
 'here is one more counter':async(R,S)=>{await R.bg('playroom1');R.label('Twenty','#e8590c');S.G=gfx(R);S.F1=tframe(S.G,-.95,.75,.3);S.F2=tframe(S.G,.95,.75,.3,{col:'#e8590c'});
  await all([growF(R,S.F1,.4),growF(R,S.F2,.4)]);S.c1=await fillF(R,S,S.F1,10,0,null,false);S.c2=await fillF(R,S,S.F2,9,0,null,false);
  const c=S.F2.cell(9);S.last=mk(R,'pa-counter',{x:c.x,y:1.9,h:.26,face:1});await S.last.show(.3,'pop');},
 'plop':async(R,S)=>{const c=S.F2.cell(9);await S.last.go(c.x,c.y-.1,.4,{arc:.1});await S.last.grow(.77,.77,.2);R.fx('sparkle',c.x,c.y,10,{w:.3,t:.6});},
 'the second ten frame is full':async(R,S)=>{await pulse(R,S.F2,.9);},
 'ten and ten makes twenty':async(R,S)=>{S.e=blk(S.G,'10 + 10 = 20',0,1.75,CC.b,.36);await tin(R,S.e,.3);await all([pulse(R,S.F1,.8),pulse(R,S.F2,.8)]);},
 'twenty is two full tens':async(R,S)=>{S.n=await num(R,S.G,20,1.55,1.75,CC.r,.4);await all(S.c1.concat(S.c2).map((c,i)=>R.wait(i*.03).then(()=>c.jump(.12))));}
};
page('num20',4,{old:mkq(B),neu:mkq(B),tm:{"here is one more counter": 0, "plop": 1.96, "the second ten frame is full": 3.25, "ten and ten makes twenty": 5.62, "twenty is two full tens": 8.0}});}
{const B={
 'this is a number line':async(R,S)=>{await R.bg('laketown1');R.label('The number line','#0c8599');S.G=gfx(R);S.L=nline(S.G,-1.8,1.5,.55,0,20,{lab:1,fs:20});await drawN(R,S.L,1.2);},
 'from zero to twenty':async(R,S)=>{S.L.hot[0]=CC.c;S.L.hot[20]=CC.c;await R.wait(.6);},
 'froggy hops along it':async(R,S)=>{S.f=mk(R,'pa-frog',{x:S.L.pos(10),y:.62,h:.32,face:1});await S.f.show(.3,'pop');S.L.hot[10]=CC.a;},
 'each hop is one more':async(R,S)=>{S.t=await tag(R,S.G,'+1',S.L.pos(10.5),1.4,CC.g,.28);},
 'eleven twelve thirteen':async(R,S)=>{for(const n of[11,12,13]){await S.f.go(S.L.pos(n),.62,.45,{arc:.35});S.L.hot[n]=CC.a;R.word(String(n),S.L.pos(n),1.25,'#1c7ed6',.6);await R.wait(.25);}},
 'just after eleven':async(R,S)=>{S.L.hot[12]=CC.r;S.a1=span(S.G,S.L.pos(11),1.0,S.L.pos(12),1.0,CC.g);await drawS(R,S.a1,.4);},
 'just before thirteen':async(R,S)=>{S.a2=span(S.G,S.L.pos(12),1.0,S.L.pos(13),1.0,CC.c);await drawS(R,S.a2,.4);await S.f.jump(.2);}
};
page('num20',5,{old:mkq(B),neu:mkq(B),tm:{"this is a number line": 0, "from zero to twenty": 4.0, "froggy hops along it": 5.37, "each hop is one more": 7.66, "eleven twelve thirteen": 9.85, "just after eleven": 13.99, "just before thirteen": 15.78}});}
{const B={
 'fourteen or seventeen':async(R,S)=>{await R.bg('laketown1');R.label('Which is more?','#c2255c');S.G=gfx(R);S.L=nline(S.G,-1.8,1.5,.55,0,20,{lab:1,fs:20});S.L.k=1;
  S.a=blk(S.G,'14',-.6,1.75,CC.a,.4);S.b=blk(S.G,'17',.6,1.75,CC.c,.4);await tin(R,S.a,.3);await tin(R,S.b,.3);},
 'find them on the number line':async(R,S)=>{S.f1=mk(R,'pa-frog',{x:S.L.pos(0),y:.62,h:.3,face:1});S.f2=mk(R,'pa-duck',{x:S.L.pos(0),y:.62,h:.3,face:1});await all([S.f1.show(.3,'pop'),S.f2.show(.3,'pop')]);
  await all([S.f1.go(S.L.pos(14),.62,1.4,{hops:4}),S.f2.go(S.L.pos(17),.62,1.6,{hops:5})]);S.L.hot[14]=CC.a;S.L.hot[17]=CC.c;},
 'seventeen is farther along':async(R,S)=>{S.sp=span(S.G,S.L.pos(0),1.15,S.L.pos(17),1.15,CC.c);await drawS(R,S.sp,.7);},
 'the more it is':async(R,S)=>{await S.f2.jump(.25);},
 'seventeen is more than fourteen':async(R,S)=>{await bout(R,[S.a,S.b],.2);S.e=blk(S.G,'17 > 14',0,1.75,CC.b,.42);await tin(R,S.e,.35);hearts(R,S.L.pos(17),1.4,6);}
};
page('num20',6,{old:mkq(B),neu:mkq(B),tm:{"fourteen or seventeen": 1.63, "find them on the number line": 4.09, "seventeen is farther along": 5.68, "the more it is": 10.94, "seventeen is more than fourteen": 12.79}});}
{const B={
 'count all the way to twenty':async(R,S)=>{await R.bg('schoolyard1');R.label('Count to twenty!','#e8590c');S.G=gfx(R);S.k=await enter(R,'pa-milodance',-1.95,1.3,{sec:.9});},
 'one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen twenty':async(R,S)=>{S.t=[];
  for(let i=1;i<=20;i++){const col=(i-1)%10,row=i<=10?0:1;const b=blk(S.G,String(i),-1.35+col*.32,1.55-row*.55,i<=10?CC.a:CC.c,.26);S.t.push(b);await tin(R,b,.12);await R.wait(.15);}},
 'great counting':async(R,S)=>{await wave(R,S.t);await S.k.jump(.3);hearts(R,0,1.9,10);}
};
page('num20',7,{old:mkq(B),neu:mkq(B),tm:{"count all the way to twenty": 0.58, "one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen twenty": 2.98, "great counting": 15.51}});}
P.MU['num20']=[{"say": "Count carefully", "speech": "Let us count the ladybugs. When we count, we touch each one just once, and say one number. One, two, three, four, five, six, seven. The last number we say tells us how many. There are seven ladybugs!"}, {"say": "The ten frame", "speech": "This is a ten frame. It has ten boxes, in two rows of five. Let us fill it with counters, one in each box. One, two, three, four, five, six, seven, eight, nine, ten! A full ten frame always shows ten."}, {"say": "Thirteen is ten and three", "speech": "Now let us make thirteen. First, one full ten frame. That is ten. Then, three more ones. Ten and three more makes thirteen. In the number thirteen, the one means one ten, and the three means three ones."}, {"say": "More teen numbers", "speech": "Every teen number is one ten and some more ones. Sixteen is ten and six. Eighteen is ten and eight. Nineteen is ten and nine. Just one more, and we would fill another ten!"}, {"say": "Twenty: two full tens", "speech": "Here is one more counter. Plop! Now the second ten frame is full too. Ten and ten makes twenty. Twenty is two full tens."}, {"say": "The number line", "speech": "This is a number line. The numbers go in order, from zero to twenty. Froggy hops along it. Each hop is one more. Eleven, twelve, thirteen. Twelve comes just after eleven, and just before thirteen."}, {"say": "Which is more?", "speech": "Which number is more, fourteen or seventeen? Let us find them on the number line. Seventeen is farther along. The farther along a number is, the more it is. So seventeen is more than fourteen."}, {"say": "Count to twenty!", "speech": "Let us count all the way to twenty together. One, two, three, four, five, six, seven, eight, nine, ten, eleven, twelve, thirteen, fourteen, fifteen, sixteen, seventeen, eighteen, nineteen, twenty! Great counting!"}];
}
/* ---------- num100 ---------- */
{
const KH=1.45;
const CC={a:'#1c7ed6',b:'#7048e8',c:'#e8590c',g:'#2b8a3e',r:'#e03131'};
const TW=['','ten','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety','one hundred'];
/* a stick of ten (a tower of 10 small cubes) */
const stick=(G,x,col,o)=>tower(G,x,10,col||'#4dabf7',Object.assign({sz:.13,y:.22},o||{}));
{const B={
 'counting a big pile':async(R,S)=>{await R.bg('playroom1');R.label('Groups of ten','#1c7ed6');S.G=gfx(R);S.tim=await enter(R,'pa-timwave',-1.95,1.35,{sec:1});
  S.pile=[];for(let i=0;i<24;i++){const c=cube(S.G,-.9+Math.random()*1.5,.2+Math.random()*.4,.2,['#4dabf7','#ff922b','#69db7c','#f783ac'][i%4]);S.pile.push(c);R.T(.3,e=>{c.s=e;});await R.wait(.04);}},
 'takes a long long time':async(R,S)=>{speak(S.tim,'So many!',1600);await all(S.pile.map(c=>R.T(.4,e=>{c.dy=Math.sin(e*Math.PI)*.08;})));},
 'we make groups of ten':async(R,S)=>{S.t=await tag(R,S.G,'groups of 10',.35,1.9,CC.b,.3);},
 'snap snap snap':async(R,S)=>{S.st=stick(S.G,1.0,'#4dabf7');for(let i=0;i<10;i++){const c=S.pile[i];const d=S.st.cubes[i];R.T(.2,e=>{c.a=1-e;});d.dy=.4;R.T(.2,e=>{d.s=e;d.dy=.4*(1-e);});await R.wait(.09);}},
 'one stick is ten':async(R,S)=>{S.n=await num(R,S.G,10,1.0,1.75,CC.r,.36);await S.st.glow(R);await S.tim.swap('pa-timcheer',.25,{h:1.35});}
};
page('num100',0,{old:mkq(B),neu:mkq(B),tm:{"counting a big pile": 0, "takes a long long time": 2.53, "we make groups of ten": 6.89, "snap snap snap": 9.0, "one stick is ten": 13.53}});}
{const B={
 'count the sticks by tens':async(R,S)=>{await R.bg('classroom');R.label('Count by tens','#e8590c');S.G=gfx(R);S.mia=await enter(R,'pa-miawave',-1.95,1.35,{sec:1});},
 'ten twenty thirty forty fifty':async(R,S)=>{S.s=[];S.n=[];const cols=['#4dabf7','#69db7c','#ff922b','#da77f2','#ffd43b'];
  for(let i=0;i<5;i++){const x=-1.05+i*.55;const st=stick(S.G,x,cols[i]);S.s.push(st);await st.build(R,.025);const b=blk(S.G,String((i+1)*10),x,1.75,CC.a,.28);S.n.push(b);await tin(R,b,.15);await R.wait(.1);}},
 'five sticks make fifty':async(R,S)=>{S.e=blk(S.G,'5 tens = 50',.05,2.05,CC.b,.3);await tin(R,S.e,.3);for(const st of S.s)st.hop(R,.08);},
 'counting by tens is fast':async(R,S)=>{await S.mia.swap('pa-miacheer',.25,{h:1.35});hearts(R,.0,1.6,8);}
};
page('num100',1,{old:mkq(B),neu:mkq(B),tm:{"count the sticks by tens": 0.86, "ten twenty thirty forty fifty": 2.54, "five sticks make fifty": 5.77, "counting by tens is fast": 8.19}});}
{const B={
 'let us build thirty four':async(R,S)=>{await R.bg('classroom');R.label('Tens and ones','#7048e8');S.G=gfx(R);S.T=bar(S.G,-1.6,.15,1.9,.03,'#1c7ed6');S.O=bar(S.G,.55,.15,1.2,.03,'#e8590c');
  S.lt=await tag(R,S.G,'tens',-.65,2.0,CC.a,.28);S.lo=await tag(R,S.G,'ones',1.15,2.0,CC.c,.28);},
 'three sticks of ten':async(R,S)=>{S.s=[];for(let i=0;i<3;i++){const st=stick(S.G,-1.25+i*.5,'#4dabf7');S.s.push(st);}},
 'ten twenty thirty':async(R,S)=>{S.n=[];for(let i=0;i<3;i++){await S.s[i].build(R,.04);const b=blk(S.G,String((i+1)*10),-1.25+i*.5,1.7,CC.a,.24);S.n.push(b);await tin(R,b,.18);}},
 'four single cubes':async(R,S)=>{S.c=[];for(let i=0;i<4;i++){const c=cube(S.G,.75+i*.28,.22,.2,'#ff922b');c.dy=.5;S.c.push(c);}},
 'thirty one thirty two thirty three thirty four':async(R,S)=>{for(let i=0;i<4;i++){const c=S.c[i];R.T(.3,e=>{c.s=e;c.dy=.5*(1-e)*(1-e);});const b=blk(S.G,String(31+i),.75+i*.28,.7,CC.c,.2);await tin(R,b,.15);await R.wait(.45);}},
 'three tens and four ones':async(R,S)=>{S.e=blk(S.G,'34 = 3 tens + 4 ones',.0,1.4+.0,CC.b,.3);S.e.y=1.32;await tin(R,S.e,.35);for(const st of S.s)st.glow(R);await all(S.c.map(c=>R.T(.6,e=>{c.hl=Math.sin(e*Math.PI);})));}
};
page('num100',2,{old:mkq(B),neu:mkq(B),tm:{"let us build thirty four": 0, "three sticks of ten": 3.11, "ten twenty thirty": 4.48, "four single cubes": 7.91, "thirty one thirty two thirty three thirty four": 9.24, "three tens and four ones": 14.79}});}
{const B={
 'look at the number thirty four':async(R,S)=>{await R.bg('classroom');R.label('Tens place, ones place','#0c8599');S.G=gfx(R);
  S.d1=blk(S.G,'3',-.45,1.35,CC.a,.75);S.d2=blk(S.G,'4',.45,1.35,CC.c,.75);await tin(R,S.d1,.35);await tin(R,S.d2,.35);S.tch=await enter(R,'pa-teacher',-1.95,1.5,{sec:1});},
 'it has two digits':async(R,S)=>{await bpulse(R,S.d1,.5);await bpulse(R,S.d2,.5);},
 'the three is in the tens place':async(R,S)=>{S.l1=await tag(R,S.G,'tens',-.45,1.95,CC.a,.28);S.s=[];for(let i=0;i<3;i++){const st=stick(S.G,-.75+i*.3,'#4dabf7',{sz:.075,y:.2});S.s.push(st);st.show();}await glowB(R,S.d1,.8);},
 'how many tens':async(R,S)=>{for(const st of S.s)await st.hop(R,.1);},
 'the four is in the ones place':async(R,S)=>{S.l2=await tag(R,S.G,'ones',.45,1.95,CC.c,.28);S.c=[];for(let i=0;i<4;i++){const c=cube(S.G,.25+i*.15,.2,.12,'#ff922b');c.s=1;S.c.push(c);}await glowB(R,S.d2,.8);},
 'how many ones':async(R,S)=>{await all(S.c.map(c=>R.T(.45,e=>{c.dy=Math.sin(e*Math.PI)*.12;})));},
 'three tens four ones':async(R,S)=>{await all([glowB(R,S.d1,.8),glowB(R,S.d2,.8)]);await S.tch.jump(.2);}
};
page('num100',3,{old:mkq(B),neu:mkq(B),tm:{"look at the number thirty four": 0, "it has two digits": 1.92, "the three is in the tens place": 3.97, "how many tens": 8.11, "the four is in the ones place": 9.1, "how many ones": 13.04, "three tens four ones": 13.97}});}
{const B={
 'this is a hundred chart':async(R,S)=>{await R.bg('classroom');R.label('The hundred chart','#2b8a3e');S.G=gfx(R);S.C=chart(S.G,-1.05,2.08,.19,10,10,1);await R.T(1.6,e=>{S.C.k=e;});},
 'from one to one hundred':async(R,S)=>{S.C.hot[1]=CC.a;S.C.hot[100]=CC.c;await R.wait(.4);},
 'each row has ten numbers':async(R,S)=>{for(let n=11;n<=20;n++){S.C.hot[n]='#69db7c';await R.wait(.07);}},
 'jump straight down one row':async(R,S)=>{for(let n=11;n<=20;n++)delete S.C.hot[n];S.ar=span(S.G,1.1,S.C.pos(4).y,1.1,S.C.pos(14).y,CC.c);await drawS(R,S.ar,.4);S.t=await tag(R,S.G,'+10',1.45,1.9,CC.c,.28);},
 'four fourteen twenty four thirty four':async(R,S)=>{S.f=mk(R,'pa-frog',{x:S.C.pos(4).x,y:S.C.pos(4).y,h:.2,face:1});await S.f.show(.25,'pop');
  for(const n of[4,14,24,34]){S.C.hot[n]=CC.r;await S.f.go(S.C.pos(n).x,S.C.pos(n).y-.08+.1,.4,{arc:.15});await R.wait(.45);}},
 'each jump down is ten more':async(R,S)=>{for(const n of[44,54,64,74,84,94]){S.C.hot[n]='#ffa8a8';await R.wait(.12);}await glowB(R,S.t,.8);}
};
page('num100',4,{old:mkq(B),neu:mkq(B),tm:{"this is a hundred chart": 0, "from one to one hundred": 3.76, "each row has ten numbers": 5.27, "jump straight down one row": 8.84, "four fourteen twenty four thirty four": 11.44, "each jump down is ten more": 15.04}});}
{const B={
 'what comes after twenty nine':async(R,S)=>{await R.bg('playroom1');R.label('A brand new ten','#c2255c');S.G=gfx(R);
  S.s=[stick(S.G,-1.4,'#4dabf7'),stick(S.G,-1.0,'#4dabf7')];S.s.forEach(s=>s.show());S.c=[];for(let i=0;i<9;i++){const c=cube(S.G,-.5+(i%5)*.18,.22+Math.floor(i/5)*.19,.16,'#ff922b');c.s=1;S.c.push(c);}
  S.n=blk(S.G,'29',1.1,1.4,CC.a,.6);await tin(R,S.n,.35);},
 'twenty nine thirty':async(R,S)=>{const c=cube(S.G,-.5+4*.18,.22+.19,.16,'#ff922b');c.dy=.5;S.c.push(c);await R.T(.35,e=>{c.s=e;c.dy=.5*(1-e);});await R.wait(.3);
  /* the ten ones snap into a stick */
  S.s3=stick(S.G,-.6,'#ff922b');S.c.forEach(c=>R.T(.3,e=>{c.a=1-e;}));await S.s3.build(R,.04);S.n.text='30';await glowB(R,S.n,.8);R.fx('sparkle',-.6,1.0,14,{w:.3,h:1.2,t:.8});},
 'a brand new ten':async(R,S)=>{S.t=await tag(R,S.G,'new ten!',-.6,1.75,CC.c,.28);},
 'thirty nine forty':async(R,S)=>{S.n.text='39';await R.wait(.5);S.n.text='40';await glowB(R,S.n,.6);},
 'forty nine fifty':async(R,S)=>{S.n.text='49';await R.wait(.5);S.n.text='50';await glowB(R,S.n,.6);},
 'ninety nine one hundred':async(R,S)=>{S.n.text='99';await R.wait(.5);S.n.text='100';await glowB(R,S.n,.9);hearts(R,1.1,1.8,10);}
};
page('num100',5,{old:mkq(B),neu:mkq(B),tm:{"what comes after twenty nine": 0, "twenty nine thirty": 2.0, "a brand new ten": 8.07, "thirty nine forty": 9.06, "forty nine fifty": 11.2, "ninety nine one hundred": 13.36}});}
{const B={
 'count sticks of ten':async(R,S)=>{await R.bg('schoolyard1');R.label('One hundred!','#e8590c');S.G=gfx(R);},
 'ten twenty thirty forty fifty sixty seventy eighty ninety one hundred':async(R,S)=>{S.s=[];const cols=['#4dabf7','#69db7c','#ff922b','#da77f2','#ffd43b'];
  for(let i=0;i<10;i++){const x=-1.6+i*.33;const st=stick(S.G,x,cols[i%5]);S.s.push(st);await st.build(R,.025);const b=blk(S.G,String((i+1)*10),x,i%2?1.95:1.7,CC.a,.2);await tin(R,b,.12);await R.wait(.18);}},
 'ten tens make one hundred':async(R,S)=>{S.e=blk(S.G,'10 tens = 100',.0,.05+.0,CC.b,.3);S.e.y=.02;await tin(R,S.e,.3);for(const st of S.s)st.glow(R);},
 'that is a lot of cubes':async(R,S)=>{S.k=[];for(const[k,x]of[['pa-timcheer',-1.9],['pa-miacheer',1.55]])S.k.push(await popIn(R,k,x,.1,1.0));await cheer(R,S.k,0,1.6);}
};
page('num100',6,{old:mkq(B),neu:mkq(B),tm:{"count sticks of ten": 0.56, "ten twenty thirty forty fifty sixty seventy eighty ninety one hundred": 2.93, "ten tens make one hundred": 9.75, "that is a lot of cubes": 12.28}});}
P.MU['num100']=[{"say": "Groups of ten", "speech": "Counting a big pile one by one takes a long, long time. Here is a smart idea. We make groups of ten. Snap, snap, snap. Ten cubes make one stick. One stick is ten."}, {"say": "Count by tens", "speech": "Now let us count the sticks by tens. Ten, twenty, thirty, forty, fifty! Five sticks make fifty. Counting by tens is fast!"}, {"say": "Tens and ones", "speech": "Let us build thirty four. First, three sticks of ten. Ten, twenty, thirty. Then, four single cubes. Thirty one, thirty two, thirty three, thirty four. Thirty four is three tens and four ones."}, {"say": "What the digits mean", "speech": "Look at the number thirty four. It has two digits. The three is in the tens place. It tells us how many tens. The four is in the ones place. It tells us how many ones. Three tens, four ones."}, {"say": "The hundred chart", "speech": "This is a hundred chart. It shows the numbers from one to one hundred. Each row has ten numbers. When we jump straight down one row, we add ten. Four, fourteen, twenty four, thirty four. Each jump down is ten more."}, {"say": "Making a new ten", "speech": "What comes after twenty nine? Twenty nine, thirty! When the ones get all the way to nine, one more makes a brand new ten. Thirty nine, forty. Forty nine, fifty. Ninety nine, one hundred!"}, {"say": "Ten tens make one hundred", "speech": "Let us count sticks of ten, all the way up. Ten, twenty, thirty, forty, fifty, sixty, seventy, eighty, ninety, one hundred! Ten tens make one hundred. That is a lot of cubes!"}];
}
/* ---------- skip1 ---------- */
{
const KH=1.45;
const CC={a:'#1c7ed6',b:'#7048e8',c:'#e8590c',g:'#2b8a3e',r:'#e03131'};
{const B={
 'skip counting means':async(R,S)=>{await R.bg('park');R.label('Skip counting','#7048e8');S.G=gfx(R);S.L=nline(S.G,-1.75,1.45,.5,0,10,{fs:24});await drawN(R,S.L,1);},
 'jump over some numbers':async(R,S)=>{S.t=await tag(R,S.G,'jump!',-.2,1.9,CC.b,.3);},
 'big steps instead of tiny steps':async(R,S)=>{S.sn=mk(R,'pa-snail',{x:S.L.pos(0),y:.58,h:.26,face:1});S.fr=mk(R,'pa-frog',{x:S.L.pos(0),y:1.05,h:.3,face:1});await all([S.sn.show(.3,'pop'),S.fr.show(.3,'pop')]);},
 'tiny steps one two three four':async(R,S)=>{for(const n of[1,2,3,4]){S.L.hot[n]=CC.g;await S.sn.go(S.L.pos(n),.58,.55,{arc:.05});await R.wait(.25);}},
 'big steps two four six eight':async(R,S)=>{for(const n of[2,4,6,8]){S.L.hot[n]=CC.c;await S.fr.go(S.L.pos(n),1.05,.45,{arc:.45});R.word(String(n),S.L.pos(n),1.55,'#e8590c',.6);await R.wait(.2);}},
 'big steps get there faster':async(R,S)=>{await S.fr.go(S.L.pos(10),1.05,.45,{arc:.45});S.L.hot[10]=CC.c;hearts(R,S.L.pos(10),1.5,6);await S.sn.shiver(.5);}
};
page('skip1',0,{old:mkq(B),neu:mkq(B),tm:{"skip counting means": 0, "jump over some numbers": 1.75, "big steps instead of tiny steps": 6.42, "tiny steps one two three four": 8.88, "big steps two four six eight": 12.19, "big steps get there faster": 15.18}});}
{const B={
 'boots come in pairs':async(R,S)=>{await R.bg('livingroom');R.label('Count by 2s','#1c7ed6');S.G=gfx(R);S.b=[];
  for(let i=0;i<5;i++){const a=mk(R,'pa-rainboots',{x:-1.5+i*.75,y:.25,h:.42,face:1});S.b.push(a);a.show(.3,'pop');await R.wait(.1);}},
 'a pair is two':async(R,S)=>{S.t=await tag(R,S.G,'pair = 2',.0,1.9,CC.b,.3);await S.b[0].jump(.2);},
 'two four six eight ten':async(R,S)=>{S.n=[];for(let i=0;i<5;i++){await S.b[i].jump(.18);const t=blk(S.G,String((i+1)*2),-1.5+i*.75,1.05,CC.a,.32);S.n.push(t);await tin(R,t,.2);await R.wait(.3);}},
 'make ten boots':async(R,S)=>{await wave(R,S.n);S.e=blk(S.G,'5 pairs = 10',.0,1.5,CC.c,.3);await tin(R,S.e,.3);}
};
page('skip1',1,{old:mkq(B),neu:mkq(B),tm:{"boots come in pairs": 0, "a pair is two": 1.52, "two four six eight ten": 6.04, "make ten boots": 10.49}});}
{const B={
 'froggy jumps two at a time':async(R,S)=>{await R.bg('laketown1');R.label('Jumps of 2','#0c8599');S.G=gfx(R);S.L=nline(S.G,-1.8,1.5,.5,0,20,{fs:19});await drawN(R,S.L,1);
  S.f=mk(R,'pa-frog',{x:S.L.pos(0),y:.58,h:.3,face:1});await S.f.show(.3,'pop');S.L.hot[0]=CC.c;},
 'zero two four six eight ten twelve fourteen sixteen eighteen twenty':async(R,S)=>{for(let n=2;n<=20;n+=2){S.L.hot[n]=CC.c;const x0=S.L.pos(n-2),x1=S.L.pos(n);
  S.arc=S.arc||[];await S.f.go(x1,.58,.4,{arc:.4});R.word(String(n),x1,1.1+(n%4?0:.25),'#e8590c',.5);await R.wait(.15);}},
 'every jump lands on an even number':async(R,S)=>{S.t=await tag(R,S.G,'even numbers',-.15,1.9,CC.b,.3);await S.f.jump(.3);}
};
page('skip1',2,{old:mkq(B),neu:mkq(B),tm:{"froggy jumps two at a time": 1.51, "zero two four six eight ten twelve fourteen sixteen eighteen twenty": 3.31, "every jump lands on an even number": 9.73}});}
{const B={
 'each hand has five fingers':async(R,S)=>{await R.bg('classroom');R.label('Count by 5s','#e8590c');S.G=gfx(R);S.h=[];
  S.h0=await popIn(R,'hand',-.1,.35,.75);S.five=[];for(let i=0;i<5;i++){R.word(String(i+1),-.42+i*.16,1.25,'#1c7ed6',.45);await R.wait(.18);}},
 'count the fingers by fives':async(R,S)=>{await S.h0.hide(.3);},
 'five ten fifteen twenty twenty five thirty':async(R,S)=>{S.n=[];for(let i=0;i<6;i++){const x=-1.55+i*.62;const a=mk(R,'hand',{x,y:.25,h:.6,face:1});S.h.push(a);await a.show(.25,'pop');
  const t=blk(S.G,String((i+1)*5),x,1.2,CC.c,.3);S.n.push(t);await tin(R,t,.18);await R.wait(.3);}},
 'six hands have thirty fingers':async(R,S)=>{await wave(R,S.n);S.e=blk(S.G,'6 hands = 30 fingers',.0,1.75,CC.b,.3);await tin(R,S.e,.3);}
};
page('skip1',3,{old:mkq(B),neu:mkq(B),tm:{"each hand has five fingers": 0, "count the fingers by fives": 3.2, "five ten fifteen twenty twenty five thirty": 5.05, "six hands have thirty fingers": 9.25}});}
{const B={
 'colour the fives':async(R,S)=>{await R.bg('classroom');R.label('Fives make a pattern','#c2255c');S.G=gfx(R);S.C=chart(S.G,-1.05,2.08,.19,10,10,1);await R.T(1.2,e=>{S.C.k=e;});},
 'five ten fifteen twenty':async(R,S)=>{for(const n of[5,10,15,20]){S.C.hot[n]=CC.c;await R.wait(.45);}},
 'and on and on':async(R,S)=>{for(let n=25;n<=100;n+=5){S.C.hot[n]=CC.c;await R.wait(.12);}},
 'two straight lines':async(R,S)=>{S.l1=vline(S.G,S.C.pos(5).x,S.C.pos(95).y-.1,S.C.pos(5).y+.12,'#7048e8');S.l2=vline(S.G,S.C.pos(10).x,S.C.pos(100).y-.1,S.C.pos(10).y+.12,'#7048e8');await all([drawL(R,S.l1,.7),drawL(R,S.l2,.7)]);},
 'ends in a five or a zero':async(R,S)=>{S.t1=await tag(R,S.G,'...5',1.45,1.4,CC.c,.3);S.t2=await tag(R,S.G,'...0',1.45,.95,CC.c,.3);}
};
page('skip1',4,{old:mkq(B),neu:mkq(B),tm:{"colour the fives": 0.57, "five ten fifteen twenty": 2.94, "and on and on": 5.71, "two straight lines": 8.23, "ends in a five or a zero": 12.64}});}
{const B={
 'ten frames help us count by tens':async(R,S)=>{await R.bg('playroom1');R.label('Count by 10s','#2b8a3e');S.G=gfx(R);},
 'each full frame is ten':async(R,S)=>{S.F=[];for(let i=0;i<6;i++){const F=tframe(S.G,-1.25+(i%3)*1.2,i<3?1.4:.55,.19);S.F.push(F);}await growF(R,S.F[0],.4);
  S.c0=[];for(let k=0;k<10;k++){const c=S.F[0].cell(k);const a=mk(R,'pa-counter',{x:c.x,y:c.y-.06,h:.13,face:1});S.c0.push(a);a.show(.12);await R.wait(.06);}},
 'ten twenty thirty forty fifty sixty':async(R,S)=>{S.n=[];for(let i=0;i<6;i++){const F=S.F[i];if(i>0){await growF(R,F,.3);for(let k=0;k<10;k++){const c=F.cell(k);mk(R,'pa-counter',{x:c.x,y:c.y-.06,h:.13,face:1}).show(.1);}}
  const t=blk(S.G,String((i+1)*10),F.x+.62,F.y,CC.g,.26);S.n.push(t);await tin(R,t,.2);await R.wait(.35);}},
 'always ends in a zero':async(R,S)=>{await wave(R,S.n);S.t=await tag(R,S.G,'...0',.0,1.98,CC.r,.28);}
};
page('skip1',5,{old:mkq(B),neu:mkq(B),tm:{"ten frames help us count by tens": 0, "each full frame is ten": 2.61, "ten twenty thirty forty fifty sixty": 4.87, "always ends in a zero": 10.71}});}
{const B={
 'skip count one more time':async(R,S)=>{await R.bg('schoolyard1');R.label('Skip count champions!','#e8590c');S.G=gfx(R);},
 'by twos two four six eight ten':async(R,S)=>{S.a=[];for(let i=0;i<5;i++){const b=blk(S.G,String((i+1)*2),-1.4+i*.55,1.8,CC.a,.28);S.a.push(b);await tin(R,b,.15);await R.wait(.3);}},
 'by fives five ten fifteen twenty':async(R,S)=>{S.b=[];for(let i=0;i<4;i++){const b=blk(S.G,String((i+1)*5),-1.4+i*.55,1.3,CC.c,.28);S.b.push(b);await tin(R,b,.15);await R.wait(.3);}},
 'by tens ten twenty thirty forty fifty':async(R,S)=>{S.c=[];for(let i=0;i<5;i++){const b=blk(S.G,String((i+1)*10),-1.4+i*.55,.8,CC.g,.28);S.c.push(b);await tin(R,b,.15);await R.wait(.3);}},
 'a skip counting champion':async(R,S)=>{S.tr=await drop(R,'pa-trophy',1.45,.2,.75);R.fx('sparkle',1.45,.8,18,{w:.6,t:1});await wave(R,S.a.concat(S.b,S.c));}
};
page('skip1',6,{old:mkq(B),neu:mkq(B),tm:{"skip count one more time": 0.57, "by twos two four six eight ten": 2.17, "by fives five ten fifteen twenty": 5.49, "by tens ten twenty thirty forty fifty": 9.32, "a skip counting champion": 14.9}});}
P.MU['skip1']=[{"say": "What is skip counting?", "speech": "Skip counting means we jump over some numbers when we count. It is like taking big steps instead of tiny steps. Tiny steps: one, two, three, four. Big steps: two, four, six, eight. Big steps get there faster!"}, {"say": "Count by 2s: pairs", "speech": "Boots come in pairs. A pair is two. Let us count the boots by twos. Two, four, six, eight, ten. Five pairs of boots make ten boots."}, {"say": "Jumps of 2 on the number line", "speech": "On the number line, Froggy jumps two at a time. Zero, two, four, six, eight, ten, twelve, fourteen, sixteen, eighteen, twenty. Every jump lands on an even number."}, {"say": "Count by 5s: hands", "speech": "Each hand has five fingers. Let us count the fingers by fives. Five, ten, fifteen, twenty, twenty five, thirty. Six hands have thirty fingers!"}, {"say": "Fives on the hundred chart", "speech": "Let us colour the fives on the hundred chart. Five, ten, fifteen, twenty, and on and on. Look! They make two straight lines, going down. Counting by fives always ends in a five, or a zero."}, {"say": "Count by 10s", "speech": "Ten frames help us count by tens. Each full frame is ten. Ten, twenty, thirty, forty, fifty, sixty. Counting by tens always ends in a zero."}, {"say": "Skip count champions", "speech": "Let us skip count one more time. By twos: two, four, six, eight, ten. By fives: five, ten, fifteen, twenty. By tens: ten, twenty, thirty, forty, fifty. You are a skip counting champion!"}];
}
/* ---------- money1 ---------- */
{
const KH=1.45;
const CC={a:'#1c7ed6',b:'#7048e8',c:'#e8590c',g:'#2b8a3e',r:'#e03131',gold:'#e67700'};
const COIN={nickel:['pa-nickel',.42,'5¢'],dime:['pa-dime',.34,'10¢'],quarter:['pa-quarter',.48,'25¢'],loonie:['pa-loonie',.52,'$1'],toonie:['pa-toonie',.56,'$2']};
const coin=(R,k,x,y,s)=>mk(R,COIN[k][0],{x,y,h:COIN[k][1]*(s||1),face:1});
/* a coin flips in (spins around) */
const flipIn=async(R,a)=>{await a.show(.1);await a.grow(.05,1,.01);await a.grow(1,1,.35);R.fx('sparkle',a.st.x,a.st.y+.2,8,{w:.3,t:.5});};
{const B={
 'these are canadian coins':async(R,S)=>{await R.bg('market2');R.label('Canadian coins','#e67700');S.G=gfx(R);
  S.c=[];const ks=['nickel','dime','quarter','loonie','toonie'];for(let i=0;i<5;i++){const a=coin(R,ks[i],-1.45+i*.72,.3);S.c.push(a);await flipIn(R,a);await R.wait(.1);}},
 'we use coins to buy things':async(R,S)=>{S.sam=await enter(R,'pa-samwave',1.9,1.3,{from:2.9,sec:1});speak(S.sam,'Shopping!',1500);},
 'a name a picture and a value':async(R,S)=>{for(const a of S.c){await a.jump(.15);}},
 'how much the coin is worth':async(R,S)=>{S.t=await tag(R,S.G,'value = how much it is worth',-.2,1.9,CC.gold,.28);}
};
page('money1',0,{old:mkq(B),neu:mkq(B),tm:{"these are canadian coins": 0, "we use coins to buy things": 2.0, "a name a picture and a value": 6.13, "how much the coin is worth": 10.38}});}
{const B={
 'this coin is a nickel':async(R,S)=>{await R.bg('market2');R.label('Nickel and dime','#868e96');S.G=gfx(R);S.n=coin(R,'nickel',-.75,.35,2.2);await flipIn(R,S.n);S.tn=await tag(R,S.G,'nickel',-.75,1.55,'#495057',.28);},
 'it has a beaver on it':async(R,S)=>{S.bv=await popIn(R,'beaver',-1.6,.25,.6);await S.bv.jump(.2);},
 'worth five cents':async(R,S)=>{S.vn=blk(S.G,'5¢',-.75,1.9,CC.a,.4);await tin(R,S.vn,.3);},
 'this tiny coin is a dime':async(R,S)=>{S.d=coin(R,'dime',.85,.35,2.2);await flipIn(R,S.d);S.td=await tag(R,S.G,'dime',.85,1.4,'#495057',.28);},
 'it has a sailboat':async(R,S)=>{R.fx('splash',.85,.5,10,{w:.6,t:.7});},
 'worth ten cents':async(R,S)=>{S.vd=blk(S.G,'10¢',.85,1.9,CC.c,.4);await tin(R,S.vd,.3);},
 'the dime is smaller':async(R,S)=>{await all([S.d.shiver(.5),S.n.grow(1.06,1.06,.3)]);await S.n.grow(1,1,.3);},
 'worth more than the nickel':async(R,S)=>{S.gt=blk(S.G,'10¢ > 5¢',.05,.0+.05,CC.r,.3);S.gt.y=.1;await tin(R,S.gt,.3);await glowB(R,S.vd,.9);}
};
page('money1',1,{old:mkq(B),neu:mkq(B),tm:{"this coin is a nickel": 0, "it has a beaver on it": 1.77, "worth five cents": 5.42, "this tiny coin is a dime": 6.67, "it has a sailboat": 9.25, "worth ten cents": 12.57, "the dime is smaller": 13.8, "worth more than the nickel": 16.31}});}
{const B={
 'this is a quarter':async(R,S)=>{await R.bg('market2');R.label('The quarter','#868e96');S.G=gfx(R);S.q=coin(R,'quarter',-1.0,.35,2.0);await flipIn(R,S.q);S.tq=await tag(R,S.G,'quarter',-1.0,1.6,'#495057',.28);},
 'it has a caribou on it':async(R,S)=>{S.cb=await enter(R,'deer',1.9,.75,{from:2.9,sec:1});},
 'worth twenty five cents':async(R,S)=>{S.vq=blk(S.G,'25¢',-1.0,1.95,CC.c,.4);await tin(R,S.vq,.3);await S.cb.hide(.3);},
 'the same as five nickels':async(R,S)=>{S.eq=blk(S.G,'=',-.25,.65,CC.b,.5);await tin(R,S.eq,.3);S.n=[];for(let i=0;i<5;i++){const a=coin(R,'nickel',.25+(i%3)*.5,.25+Math.floor(i/3)*.6,1.1);S.n.push(a);await flipIn(R,a);}},
 'five ten fifteen twenty twenty five':async(R,S)=>{for(let i=0;i<5;i++){await S.n[i].jump(.15);R.word(String((i+1)*5)+'¢',S.n[i].st.x,S.n[i].st.y+.55,'#1c7ed6',.5);await R.wait(.3);}await glowB(R,S.vq,.9);}
};
page('money1',2,{old:mkq(B),neu:mkq(B),tm:{"this is a quarter": 0, "it has a caribou on it": 1.43, "worth twenty five cents": 5.09, "the same as five nickels": 7.79, "five ten fifteen twenty twenty five": 9.47}});}
{const B={
 'this gold coin is a loonie':async(R,S)=>{await R.bg('laketown1');R.label('Loonie and toonie','#e67700');S.G=gfx(R);S.l=coin(R,'loonie',-.9,.35,2.0);await flipIn(R,S.l);S.tl=await tag(R,S.G,'loonie',-.9,1.65,'#495057',.28);},
 'it has a loon bird on it':async(R,S)=>{S.bird=mk(R,'pa-duck',{x:-2.6,y:1.6,h:.3,face:1});await S.bird.show(.1);S.bird.go(-1.7,1.3,1.0,{arc:.3});},
 'worth one dollar':async(R,S)=>{S.vl=blk(S.G,'$1',-.9,2.0,CC.gold,.4);await tin(R,S.vl,.3);},
 'it is a toonie':async(R,S)=>{S.t=coin(R,'toonie',.95,.35,2.0);await flipIn(R,S.t);S.tt=await tag(R,S.G,'toonie',.95,1.7,'#495057',.28);},
 'it has a polar bear':async(R,S)=>{S.pb=await enter(R,'bear',1.95,.7,{from:2.9,sec:.9});},
 'worth two dollars':async(R,S)=>{S.vt=blk(S.G,'$2',.95,2.0,CC.gold,.4);await tin(R,S.vt,.3);await S.pb.hide(.3);},
 'two loonies make one toonie':async(R,S)=>{S.l2=coin(R,'loonie',-.4,.35,1.2);await flipIn(R,S.l2);await all([S.l.go(-.1,.35,.6,{arc:.3}),S.l.grow(.6,.6,.6)]);S.e=blk(S.G,'$1 + $1 = $2',.0,.08,CC.b,.3);S.e.y=.08;await tin(R,S.e,.3);}
};
page('money1',3,{old:mkq(B),neu:mkq(B),tm:{"this gold coin is a loonie": 0, "it has a loon bird on it": 2.12, "worth one dollar": 5.97, "it is a toonie": 9.69, "it has a polar bear": 11.49, "worth two dollars": 15.0, "two loonies make one toonie": 16.26}});}
{const B={
 'to count dimes we count by tens':async(R,S)=>{await R.bg('market2');R.label('Counting coins','#1c7ed6');S.G=gfx(R);S.d=[];for(let i=0;i<4;i++){const a=coin(R,'dime',-1.5+i*.48,1.05,1.3);S.d.push(a);a.show(.3,'pop');await R.wait(.1);}},
 'ten twenty thirty forty':async(R,S)=>{for(let i=0;i<4;i++){await S.d[i].jump(.15);const b=blk(S.G,String((i+1)*10)+'¢',-1.5+i*.48,1.75,CC.c,.24);await tin(R,b,.15);await R.wait(.3);}},
 'four dimes make forty cents':async(R,S)=>{S.e1=blk(S.G,'= 40¢',.55,1.25,CC.b,.36);await tin(R,S.e1,.3);},
 'to count nickels':async(R,S)=>{S.n=[];for(let i=0;i<3;i++){const a=coin(R,'nickel',-1.5+i*.6,.25,1.4);S.n.push(a);a.show(.3,'pop');await R.wait(.1);}},
 'five ten fifteen':async(R,S)=>{for(let i=0;i<3;i++){await S.n[i].jump(.15);const b=blk(S.G,String((i+1)*5)+'¢',-1.5+i*.6,.88,CC.a,.24);await tin(R,b,.15);await R.wait(.3);}},
 'three nickels make fifteen cents':async(R,S)=>{S.e2=blk(S.G,'= 15¢',.55,.45,CC.b,.36);await tin(R,S.e2,.3);}
};
page('money1',4,{old:mkq(B),neu:mkq(B),tm:{"to count dimes we count by tens": 0, "ten twenty thirty forty": 2.9, "four dimes make forty cents": 5.62, "to count nickels": 8.23, "five ten fifteen": 11.62, "three nickels make fifteen cents": 13.92}});}
{const B={
 'sam wants a lollipop':async(R,S)=>{await R.bg('market2');R.label('Let us go shopping','#c2255c');S.G=gfx(R);S.sam=await enter(R,'pa-samwave',-1.9,1.3,{sec:1});S.lp=await popIn(R,'pa-lollipop',1.3,.3,.75);},
 'it costs twenty five cents':async(R,S)=>{S.pr=blk(S.G,'25¢',1.3,1.35,CC.r,.4);await tin(R,S.pr,.3);},
 'pay with one quarter':async(R,S)=>{S.q=coin(R,'quarter',-1.2,1.2,1.5);await flipIn(R,S.q);await S.q.go(.3,.5,.8,{arc:.4});S.ok1=blk(S.G,'25¢',.3,1.25,CC.g,.3);await tin(R,S.ok1,.25);},
 'pay with five nickels':async(R,S)=>{await all([S.q.hide(.3),bout(R,[S.ok1],.2)]);S.n=[];for(let i=0;i<5;i++){const a=coin(R,'nickel',-.4+(i%3)*.4,.35+Math.floor(i/3)*.5,1.0);S.n.push(a);await flipIn(R,a);R.word(String((i+1)*5)+'¢',a.st.x,a.st.y+.45,'#1c7ed6',.45);}},
 'both ways make twenty five cents':async(R,S)=>{S.ok2=blk(S.G,'1 quarter = 5 nickels',.2,1.95,CC.b,.28);await tin(R,S.ok2,.3);},
 'yum':async(R,S)=>{await S.lp.go(-1.5,.9,.8,{arc:.4});await S.sam.swap('pa-samcheer',.25,{h:1.3});hearts(R,-1.5,1.6,8);}
};
page('money1',5,{old:mkq(B),neu:mkq(B),tm:{"sam wants a lollipop": 0, "it costs twenty five cents": 1.83, "pay with one quarter": 5.45, "pay with five nickels": 8.53, "both ways make twenty five cents": 10.06, "yum": 13.04}});}
{const B={
 'nickel five cents':async(R,S)=>{await R.bg('market2');R.label('Coin champions!','#e67700');S.G=gfx(R);S.c=[];S.v=[];
  const ks=[['nickel','5¢'],['dime','10¢'],['quarter','25¢'],['loonie','$1'],['toonie','$2']];S.add=async(i)=>{const[k,v]=ks[i];const a=coin(R,k,-1.5+i*.75,.35,1.3);S.c.push(a);await flipIn(R,a);const b=blk(S.G,v,-1.5+i*.75,1.35,i>2?CC.gold:CC.a,.3);S.v.push(b);await tin(R,b,.2);};await S.add(0);},
 'dime ten cents':async(R,S)=>{await S.add(1);},
 'quarter twenty five cents':async(R,S)=>{await S.add(2);},
 'loonie one dollar':async(R,S)=>{await S.add(3);},
 'toonie two dollars':async(R,S)=>{await S.add(4);},
 'you know your canadian coins':async(R,S)=>{await wave(R,S.v);await all(S.c.map(c=>c.jump(.2)));R.fx('sparkle',0,1.2,24,{w:3.5,t:1.2});}
};
page('money1',6,{old:mkq(B),neu:mkq(B),tm:{"nickel five cents": 0, "dime ten cents": 1.82, "quarter twenty five cents": 3.96, "loonie one dollar": 6.46, "toonie two dollars": 8.69, "you know your canadian coins": 10.77}});}
P.MU['money1']=[{"say": "Meet the coins", "speech": "These are Canadian coins. We use coins to buy things. Each coin has a name, a picture, and a value. The value tells us how much the coin is worth."}, {"say": "The nickel and the dime", "speech": "This coin is a nickel. It has a beaver on it. A nickel is worth five cents. This tiny coin is a dime. It has a sailboat. A dime is worth ten cents. The dime is smaller, but it is worth more than the nickel!"}, {"say": "The quarter", "speech": "This is a quarter. It has a caribou on it. A quarter is worth twenty five cents. That is the same as five nickels! Five, ten, fifteen, twenty, twenty five."}, {"say": "The loonie and the toonie", "speech": "This gold coin is a loonie. It has a loon bird on it. A loonie is worth one dollar. This coin has two colours. It is a toonie. It has a polar bear. A toonie is worth two dollars. Two loonies make one toonie!"}, {"say": "Counting coins", "speech": "To count dimes, we count by tens. Ten, twenty, thirty, forty. Four dimes make forty cents. To count nickels, we count by fives. Five, ten, fifteen. Three nickels make fifteen cents."}, {"say": "Let us go shopping", "speech": "Sam wants a lollipop. It costs twenty five cents. Sam can pay with one quarter. Or, Sam can pay with five nickels. Both ways make twenty five cents. Yum!"}, {"say": "Coin champions", "speech": "Nickel, five cents. Dime, ten cents. Quarter, twenty five cents. Loonie, one dollar. Toonie, two dollars. You know your Canadian coins!"}];
}
P.DIR.mount();
})();
