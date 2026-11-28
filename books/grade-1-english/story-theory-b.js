/* Grade 1 English: staged theory pages (group b). Generated from snippets. ASCII only. */
(function(){
"use strict";
const P=window.PM;if(!P||!P.DIR||!P.G1H||!P.G1X)return;
const page=P.DIR.page;
const {all,pop,liteq,mkq,hearts,gfx,tin,tout,glow,moveT,COL,colOf,wordTiles,fly,tileFly,squash,wave,VC,vcol,vTiles,rtag,ntag,NC,tg,nounTag,ptag,pltag,GOLD,PG,RCOL,rpair}=P.G1H;
const {blk,rowX,sentence,reflow,bfly,bshake,bpulse,bout,bcross,recolor,mk,enter,drop,popIn,cheer,crates,intoCrate,markB,MARKC,speak}=P.G1X;
const rnd=(a,b)=>a+Math.random()*(b-a);
/* ---------- e10 ---------- */
{
const BLUE='#4c6ef5',CAP='#e8a900',GREY='#868e96';
/* turn the first letter of a block into a tall gold capital */
const capGlow=async(R,b)=>{const c=b.col;b.col=CAP;await bpulse(R,b,.7);b.col=c;};
const E10a={
 'a sentence tells':async(R,S)=>{await R.bg('livingroom');R.label('A complete thought','#16a36f');S.G=gfx(R);
  S.bb=await popIn(R,'pa-baby',.6,.25,.6);S.bb.idle='sleep';R.word('Zzz',1.0,1.0,'#7048e8',.8);},
 'the baby is sleeping':async(R,S)=>{S.s=await sentence(R,S.G,['The','baby','is','sleeping'],.1,1.95,{h:.4,t:.22});R.word('Zzz',1.1,1.1,'#7048e8',.8);},
 'begins with a capital':async(R,S)=>{S.c=S.G.tile('T',S.s[0].x-.12,2.55,CAP,.42);S.c.s=1;await capGlow(R,S.s[0]);R.word('capital T!',S.s[0].x,1.45,CAP,1);S.G.rmTile(S.c);},
 'ends with a period':async(R,S)=>{const last=S.s[S.s.length-1];const p=markB(S.G,'.',2.6,2.6,.42);p.s=1;await bfly(R,p,last.x+last.w()/2+.22,1.95,.8,.5);R.fx('sparkle',p.x,1.95,14,{w:.3,t:.8});await bpulse(R,p,.6);R.word('period!',p.x-.2,1.45,MARKC['.'],1);await S.bb.jump(.15);}
};
page('e10',1,{old:mkq(E10a),neu:mkq(E10a),tm:{"a sentence tells": 0, "the baby is sleeping": 2.35, "begins with a capital": 5.29, "ends with a period": 7.75}});
const E10b={
 'the big red that':async(R,S)=>{await R.bg('playroom1');R.label('Not a sentence','#16a36f');S.G=gfx(R);
  S.s=await sentence(R,S.G,['The','big','red'],-.3,1.95,{h:.4,col:GREY});S.q=blk(S.G,'???',S.s[2].x+.75,1.95,'#adb5bd',.4);S.q.gap=true;S.q.s=1;},
 'the big red what':async(R,S)=>{S.mia=await enter(R,'pa-miathink',-1.9,1.45,{sec:.8});R.word('What?',-1.2,1.5,'#e8590c',1.1);await bshake(R,S.q,.6);},
 'add more words':async(R,S)=>{S.bl=mk(R,'ball',{x:2.8,y:1.2,h:.45,face:-1});S.bl.show(.1);await fly(R,S.bl,.7,.2,.9,{arc:.6,spin:-Math.PI*3});R.fx('dust',.7,.25,8,{w:.4,t:.6});},
 'ball bounces':async(R,S)=>{S.q.s=0;const w=[blk(S.G,'ball',0,1.95,BLUE,.4),blk(S.G,'bounces.',0,1.95,BLUE,.4)];const all2=S.s.concat(w);const xs=rowX(all2,.2);w.forEach((b,i)=>{b.x=xs[3+i];});
  await all(S.s.map((b,i)=>{const x0=b.x;return R.T(.5,e=>{b.x=x0+(xs[i]-x0)*e;});}));for(const b of S.s)b.col=BLUE;for(const b of w){await tin(R,b,.25);}
  for(let i=0;i<3;i++){await S.bl.jump(.45);}},
 'now it is':async(R,S)=>{R.word('A whole sentence!',.2,1.35,'#16a36f',1.3);S.mia.swap('pa-miacheer',.25,{h:1.45});await cheer(R,[S.mia,S.bl],.2,1.7);}
};
page('e10',2,{old:mkq(E10b),neu:mkq(E10b),tm:{"the big red that": 0, "the big red what": 3.39, "add more words": 5.38, "ball bounces": 8.81, "now it is": 9.85}});
const E10c={
 'tells who':async(R,S)=>{await R.bg('kitchen-day');R.label('Who and what they do','#16a36f');S.G=gfx(R);
  S.who=blk(S.G,'who?',-.9,2.05,'#1c7ed6',.36);S.what=blk(S.G,'does what?',.9,2.05,'#e8590c',.36);await all([tin(R,S.who,.3),tin(R,S.what,.3)]);},
 'dad cooks':async(R,S)=>{bout(R,[S.who,S.what],.3);S.dad=await enter(R,'pa-dadpan',-1.6,1.4,{from:-2.9,sec:.8});R.fx('dust',-1.2,1.0,8,{w:.3,t:1});S.s1=await sentence(R,S.G,['Dad','cooks.'],-1.3,2.05,{h:.32,cols:['#1c7ed6','#e8590c'],t:.15});},
 'mia reads':async(R,S)=>{S.mia=await enter(R,'pa-miawave',.1,1.35,{from:2.9,sec:.7});S.bk=mk(R,'pa-bluebook',{x:.45,y:.75,h:.35,face:1});S.bk.show(.3,'pop');S.s2=await sentence(R,S.G,['Mia','reads.'],.2,1.6,{h:.32,cols:['#1c7ed6','#e8590c'],t:.15});},
 'the dog runs':async(R,S)=>{S.dg=mk(R,'pa-dog',{x:-2.9,y:.2,h:.6,face:1});S.dg.show(.1);S.dg.go(1.5,.2,1.2,{lin:true,hops:6});R.word('Woof!',1.2,.95,'#a0522d',.8);S.s3=await sentence(R,S.G,['The','dog','runs.'],1.2,1.15,{h:.3,cols:['#1c7ed6','#1c7ed6','#e8590c'],t:.12});},
 'each one tells':async(R,S)=>{await all([S.dad.jump(.3),S.mia.jump(.3),S.dg.jump(.3)]);await wave(R,[].concat(S.s1,S.s2,S.s3));hearts(R,0,1.8,8);}
};
page('e10',3,{old:mkq(E10c),neu:mkq(E10c),tm:{"tells who": 0.83, "dad cooks": 2.84, "mia reads": 4.49, "the dog runs": 6.2, "each one tells": 8.07}});
const E10d={
 'let us build':async(R,S)=>{await R.bg('playroom1');R.label('Build a sentence','#16a36f');S.G=gfx(R);
  S.slots=[-.9,.1,1.0].map(x=>{const b=blk(S.G,'    ',x,1.95,'#adb5bd',.42);b.gap=true;b.s=1;return b;});S.ct=await enter(R,'pa-cat',-1.9,.75,{from:-2.9,sec:.8});},
 'start with a capital':async(R,S)=>{S.w1=blk(S.G,'The',-.9,2.7,CAP,.42);S.w1.s=1;await bfly(R,S.w1,-.9,1.95,.7,.2);S.slots[0].s=0;R.fx('sparkle',-.9,1.95,12,{w:.4,t:.7});R.word('capital!',-.9,1.4,CAP,1);await R.wait(.4);S.w1.col=BLUE;},
 'add two words':async(R,S)=>{S.w2=blk(S.G,'cat',.1,2.7,BLUE,.42);S.w2.s=1;await bfly(R,S.w2,.1,1.95,.6,.2);S.slots[1].s=0;S.ct.go(-.6,.2,.6,{hops:2});
  S.w3=blk(S.G,'naps',1.0,2.7,BLUE,.42);S.w3.s=1;await bfly(R,S.w3,1.0,1.95,.6,.2);S.slots[2].s=0;S.ct.idle='sleep';R.word('Zzz',-.3,1.0,'#7048e8',.8);},
 'end with a period':async(R,S)=>{const p=markB(S.G,'.',2.6,2.6,.42);p.s=1;await bfly(R,p,1.0+S.w3.w()/2+.22,1.95,.7,.4);R.fx('sparkle',p.x,1.95,14,{w:.3,t:.8});S.p=p;R.word('period!',p.x,1.4,MARKC['.'],1);},
 'the cat naps':async(R,S)=>{await wave(R,[S.w1,S.w2,S.w3,S.p]);R.word('A sentence!',.2,1.35,'#16a36f',1.2);hearts(R,-.6,1.2,8);}
};
page('e10',4,{old:mkq(E10d),neu:mkq(E10d),tm:{"let us build": 0, "start with a capital": 1.85, "add two words": 5.43, "end with a period": 8.18, "the cat naps": 10.23}});
const E10e={
 'the frog jumps':async(R,S)=>{await R.bg('forest1');R.label('Sentence or not?','#16a36f');S.G=gfx(R);
  S.fr=mk(R,'frog',{x:-2.8,y:.2,h:.55,face:1});S.fr.show(.1);S.fr.go(-.9,.2,1.0,{hops:3,arc:.5});S.s1=await sentence(R,S.G,['The','frog','jumps.'],-.6,1.95,{h:.36,t:.15});},
 'yes under':async(R,S)=>{R.word('Yes!',-.6,1.45,'#2b8a3e',1.2);await all([S.fr.jump(.5),wave(R,S.s1)]);
  S.bd=await drop(R,'pa-bed',1.1,.2,.65);S.s2=await sentence(R,S.G,['under','the','bed'],1.0,1.3,{h:.32,col:GREY,t:.12});},
 'is that a sentence no':async(R,S)=>{R.word('No!',1.0,.85,'#e03131',1.2);for(const b of S.s2)bshake(R,b,.5);await R.wait(.5);},
 'only part':async(R,S)=>{R.word('Only part of an idea',.4,2.45-.1,'#e8590c',1.2);await all(S.s2.map(b=>bcross(R,b,.4)));await S.fr.jump(.3);}
};
page('e10',5,{old:mkq(E10e),neu:mkq(E10e),tm:{"the frog jumps": 0, "yes under": 3.45, "is that a sentence no": 5.52, "only part": 8.98}});
}
P.G1STAGED&&P.G1STAGED.add('e10');
/* ---------- e11 ---------- */
{
const BLUE='#4c6ef5';
const putMark=async(R,S,bs,ch,y)=>{const last=bs[bs.length-1];const p=markB(S.G,ch,2.6,2.6,bs[0].h);p.s=1;await bfly(R,p,last.x+last.w()/2+bs[0].h*.55,y,.7,.4);R.fx('sparkle',p.x,y,12,{w:.3,t:.7});await bpulse(R,p,.5);return p;};
const E11a={
 'a telling sentence':async(R,S)=>{await R.bg('kitchen22');R.label('It tells something','#16a36f');S.G=gfx(R);
  S.gm=await enter(R,'grandma',-1.6,1.35,{sec:1.0});S.pt=await drop(R,'pot',.4,.2,.65);R.fx('dust',.4,.9,10,{w:.3,t:1.2});},
 'grandma makes soup':async(R,S)=>{S.s=await sentence(R,S.G,['Grandma','makes','soup'],0,1.95,{h:.4,t:.2});S.gm.go(-.8,.2,.6,{hops:2});R.fx('dust',.4,.95,12,{w:.3,t:1.4});R.word('Stir, stir!',.4,1.35,'#e8590c',.9);await R.T(1.0,e=>{S.pt.st.rz=Math.sin(e*Math.PI*4)*.08;S.pt.ap();});},
 'it ends with a period':async(R,S)=>{S.p=await putMark(R,S,S.s,'.',1.95);R.word('period!',S.p.x,1.45,MARKC['.'],1);await cheer(R,[S.gm],-.6,1.7);}
};
page('e11',1,{old:mkq(E11a),neu:mkq(E11a),tm:{"a telling sentence": 0, "grandma makes soup": 3.57, "it ends with a period": 5.54}});
const E11b={
 'the pot is hot':async(R,S)=>{await R.bg('kitchen22');R.label('More telling sentences','#16a36f');S.G=gfx(R);
  S.pt=await drop(R,'pot',-.9,.2,.6);S.s1=await sentence(R,S.G,['The','pot','is','hot'],-.3,1.95,{h:.34,t:.14});R.word('Hot!',-.9,1.2,'#e03131',1);for(let i=0;i<3;i++){R.fx('dust',-.9,.9,6,{w:.3,t:1});await S.pt.shiver(.25);}S.p1=await putMark(R,S,S.s1,'.',1.95);},
 'the cat is sleepy':async(R,S)=>{S.ct=mk(R,'pa-cat',{x:1.3,y:.2,h:.6,face:-1,idle:'sleep'});S.ct.show(.4,'pop');R.word('Yawn!',1.3,1.0,'#7048e8',.9);S.s2=await sentence(R,S.G,['The','cat','is','sleepy'],-.3,1.4,{h:.34,t:.14});S.p2=await putMark(R,S,S.s2,'.',1.4);},
 'each one tells':async(R,S)=>{await all([bpulse(R,S.p1,.6),bpulse(R,S.p2,.6)]);R.word('Two telling sentences!',.3,.9,'#16a36f',1.3);await all([S.pt.jump(.2),S.ct.jump(.2)]);}
};
page('e11',2,{old:mkq(E11b),neu:mkq(E11b),tm:{"the pot is hot": 0, "the cat is sleepy": 1.41, "each one tells": 3.38}});
const E11c={
 'a period is':async(R,S)=>{await R.bg('street');R.label('The period stops','#16a36f');S.G=gfx(R);
  S.s=await sentence(R,S.G,['The','bus','goes'],-.6,1.95,{h:.38,t:.15});S.bs=mk(R,'pa-bus',{x:-3.0,y:.2,h:.75,face:1});S.bs.show(.1);S.bs.go(-.4,.2,1.4,{lin:true});R.word('Vroom!',-.6,1.2,'#c92a2a',.9);},
 'at the end':async(R,S)=>{S.p=markB(S.G,'.',2.6,2.6,.38);S.p.s=1;await bfly(R,S.p,S.s[2].x+S.s[2].w()/2+.22,1.95,.7,.4);await bpulse(R,S.p,.5);},
 'this idea is done':async(R,S)=>{S.sg=mk(R,'warning',{x:1.3,y:.2,h:.7,face:1});S.sg.show(.4,'pop');await S.bs.go(.6,.2,.8,{lin:true});await S.bs.shiver(.4);R.word('Stop!',1.0,1.3,'#e03131',1.2);},
 'stop and take':async(R,S)=>{R.word('Ahh...',-.4,1.35,'#1c7ed6',1);await all([R.T(1.2,e=>{S.p.s=1+.3*Math.sin(e*Math.PI);S.p.hl=Math.sin(e*Math.PI);}),S.bs.jump(.15)]);}
};
page('e11',3,{old:mkq(E11c),neu:mkq(E11c),tm:{"a period is": 0, "at the end": 1.81, "this idea is done": 4.83, "stop and take": 6.19}});
const E11d={
 'look at the picture':async(R,S)=>{await R.bg('park');R.label('Tell about a picture','#16a36f');S.G=gfx(R);
  S.fr=blk(S.G,'',0,1.15,'#ffffff',.01);S.dg=await enter(R,'pa-dog',-.8,.7,{from:-2.9,sec:.8});S.bl=await drop(R,'ball',.6,.2,.4);},
 'what can we tell':async(R,S)=>{S.k=await enter(R,'pa-leosay',-2.0,1.4,{sec:.7});R.word('Hmm?',-1.6,1.7,'#e8590c',1);},
 'the dog plays':async(R,S)=>{S.dg.go(.2,.2,.6,{hops:3});await fly(R,S.bl,1.5,.2,.8,{arc:.8,spin:Math.PI*2});S.dg.go(1.2,.2,.6,{hops:3});S.s=await sentence(R,S.G,['The','dog','plays','with','a','ball'],.1,1.95,{h:.32,t:.12});S.p=await putMark(R,S,S.s,'.',1.95);},
 'that is a telling':async(R,S)=>{await S.k.swap('pa-leocheer',.25,{h:1.4});await wave(R,S.s.concat([S.p]));await cheer(R,[S.k,S.dg],0,1.6);}
};
page('e11',4,{old:mkq(E11d),neu:mkq(E11d),tm:{"look at the picture": 0, "what can we tell": 1.47, "the dog plays": 3.16, "that is a telling": 5.6}});
const E11e={
 'the sun is hot':async(R,S)=>{await R.bg('sunhill1');R.label('Telling or asking?','#16a36f');S.G=gfx(R);
  S.sn=mk(R,'pa-sunface',{x:1.3,y:-.4,h:.8,face:1});S.sn.show(.2);S.sn.go(1.3,.8,1.0,{arc:.2});S.s1=await sentence(R,S.G,['The','sun','is','hot'],-.5,1.95,{h:.34,t:.14});},
 'that tells':async(R,S)=>{S.p1=await putMark(R,S,S.s1,'.',1.95);R.word('tells!',-.5,1.5,MARKC['.'],1);},
 'is the sun hot':async(R,S)=>{S.s2=await sentence(R,S.G,['Is','the','sun','hot'],-.5,1.2,{h:.34,t:.14});S.k=await enter(R,'pa-miathink',-2.0,1.3,{sec:.6});},
 'that asks':async(R,S)=>{S.p2=await putMark(R,S,S.s2,'?',1.2);R.word('asks!',-.5,.75,MARKC['?'],1);await all([bpulse(R,S.p1,.6),bpulse(R,S.p2,.6),S.sn.jump(.3)]);}
};
page('e11',5,{old:mkq(E11e),neu:mkq(E11e),tm:{"the sun is hot": 0, "that tells": 1.39, "is the sun hot": 4.73, "that asks": 6.62}});
}
P.G1STAGED&&P.G1STAGED.add('e11');
/* ---------- e12 ---------- */
{
const BLUE='#4c6ef5',QC=MARKC['?'];
const putMark=async(R,S,bs,ch,y)=>{const last=bs[bs.length-1];const p=markB(S.G,ch,2.6,2.6,bs[0].h);p.s=1;await bfly(R,p,last.x+last.w()/2+bs[0].h*.55,y,.7,.4);R.fx('sparkle',p.x,y,12,{w:.3,t:.7});await bpulse(R,p,.5);return p;};
const E12a={
 'an asking sentence':async(R,S)=>{await R.bg('playroom1');R.label('It asks something','#16a36f');S.G=gfx(R);
  S.m=await enter(R,'pa-miathink',-1.6,1.45,{sec:.9});S.l=await enter(R,'pa-leowave',1.4,1.45,{from:2.9,sec:.9});},
 'what do you like':async(R,S)=>{S.s=await sentence(R,S.G,['What','do','you','like'],-.1,1.95,{h:.38,t:.15});await S.m.jump(.3);},
 'it ends with a question':async(R,S)=>{S.p=await putMark(R,S,S.s,'?',1.95);R.word('question mark!',.3,1.45,QC,1.2);await R.T(1,e=>{S.p.rot=Math.sin(e*Math.PI*3)*.3;});S.l.swap('pa-leosay',.25,{h:1.45});await S.l.jump(.3);}
};
page('e12',1,{old:mkq(E12a),neu:mkq(E12a),tm:{"an asking sentence": 0, "what do you like": 2.48, "it ends with a question": 4.12}});
const E12b={
 'many questions':async(R,S)=>{await R.bg('street');R.label('Question words','#16a36f');S.G=gfx(R);
  S.q=[];const W=['who','what','where','when','why','how'];for(const[i,w]of W.entries()){const b=blk(S.G,w,-1.5+i*.56,2.05,['#e03131','#e8590c','#2b8a3e','#1c7ed6','#7048e8','#c2255c'][i],.28);S.q.push(b);tin(R,b,.25);await R.wait(.25);}},
 'where is my hat':async(R,S)=>{S.k=await enter(R,'pa-timlook',-1.7,1.4,{sec:.7});bpulse(R,S.q[2],.7);S.s1=await sentence(R,S.G,['Where','is','my','hat?'],.3,1.45,{h:.32,cols:['#2b8a3e'],t:.12});
  S.h=mk(R,'hat',{x:1.4,y:.2,h:.35,face:1});S.h.show(.3,'pop');await S.h.jump(.3);},
 'who is at the door':async(R,S)=>{bout(R,S.s1,.3);S.dr=await popIn(R,'door',.7,.2,1.0);R.word('Knock knock!',.7,1.4,'#a0522d',1);await S.dr.shiver(.5);bpulse(R,S.q[0],.7);S.s2=await sentence(R,S.G,['Who','is','at','the','door?'],.3,1.45,{h:.32,cols:['#e03131'],t:.12});S.k.jump(.3);}
};
page('e12',2,{old:mkq(E12b),neu:mkq(E12b),tm:{"many questions": 0, "where is my hat": 4.19, "who is at the door": 6.04}});
const E12c={
 'where is the cat':async(R,S)=>{await R.bg('livingroom');R.label('Ask and answer','#16a36f');S.G=gfx(R);
  S.ch=await drop(R,'chair',.8,.2,.85);S.m=await enter(R,'pa-miathink',-1.7,1.45,{sec:.7});S.s1=await sentence(R,S.G,['Where','is','the','cat?'],.0,1.95,{h:.34,t:.13});},
 'that is an asking':async(R,S)=>{await bpulse(R,S.s1[3],.7);R.word('asking!',.4,1.5,QC,1);},
 'the cat is under':async(R,S)=>{S.ct=mk(R,'pa-cat',{x:.8,y:.2,h:.45,face:-1});S.ct.show(.4,'pop');R.word('Meow!',.8,.9,'#e8590c',.8);await S.m.swap('pa-miapoint',.25,{h:1.45});
  S.s2=await sentence(R,S.G,['The','cat','is','under','the','chair.'],.1,1.4,{h:.3,t:.11});},
 'that is the answer':async(R,S)=>{await bpulse(R,S.s2[5],.7);R.word('answer!',.3,.95,MARKC['.'],1);await all([S.ct.jump(.2),S.m.jump(.3)]);}
};
page('e12',3,{old:mkq(E12c),neu:mkq(E12c),tm:{"where is the cat": 0, "that is an asking": 1.28, "the cat is under": 3.92, "that is the answer": 6.31}});
const E12d={
 'the dog is big':async(R,S)=>{await R.bg('park');R.label('Turn it into a question','#16a36f');S.G=gfx(R);
  S.dg=await enter(R,'dog',1.3,1.1,{from:2.9,sec:.8});S.s=await sentence(R,S.G,['The','dog','is','big.'],-.4,1.95,{h:.4,t:.15});},
 'now swap':async(R,S)=>{S.s[0].text='the';const is=S.s[2];is.text='Is';bpulse(R,is,.5);await R.wait(.3);
  const order=[S.s[2],S.s[0],S.s[1],S.s[3]];await reflow(R,order,-.4,1.95,1.0);},
 'is the dog big':async(R,S)=>{const last=S.s[3];last.text='big';const p=markB(S.G,'?',last.x+.4,2.6,.4);p.s=1;await bfly(R,p,last.x+last.w()/2+.24,1.95,.6,.3);S.p=p;R.fx('sparkle',p.x,1.95,12,{w:.3,t:.7});S.k=await enter(R,'pa-leosay',-1.9,1.45,{sec:.6});},
 'now it asks':async(R,S)=>{R.word('It asks!',-.3,1.4,QC,1.2);await all([bpulse(R,S.p,.7),S.dg.jump(.4),S.k.jump(.3)]);}
};
page('e12',4,{old:mkq(E12d),neu:mkq(E12d),tm:{"the dog is big": 0, "now swap": 1.52, "is the dog big": 3.72, "now it asks": 5.72}});
const E12e={
 'do you like apples':async(R,S)=>{await R.bg('kitchen-day');R.label('Which end mark?','#16a36f');S.G=gfx(R);
  S.ap=await drop(R,'pa-apple',1.4,.2,.5);S.s1=await sentence(R,S.G,['Do','you','like','apples'],-.4,1.95,{h:.34,t:.13});const l1=S.s1[3];S.m1=blk(S.G,'?',l1.x+l1.w()/2+.26,1.95,'#adb5bd',.34);S.m1.gap=true;S.m1.s=1;},
 'it asks so':async(R,S)=>{S.m1.gap=false;S.m1.col=QC;await bpulse(R,S.m1,.6);R.word('asks: ?',-.4,1.5,QC,1);},
 'i like apples':async(R,S)=>{S.s2=await sentence(R,S.G,['I','like','apples'],-.5,1.2,{h:.34,t:.13});const l2=S.s2[2];S.m2=blk(S.G,'.',l2.x+l2.w()/2+.26,1.2,'#adb5bd',.34);S.m2.gap=true;S.m2.s=1;S.k=await enter(R,'pa-leoeat',-1.9,1.3,{sec:.6});},
 'it tells so':async(R,S)=>{S.m2.gap=false;S.m2.col=MARKC['.'];await bpulse(R,S.m2,.6);R.word('tells: .',-.5,.75,MARKC['.'],1);await all([S.ap.jump(.3),S.k.jump(.3)]);hearts(R,1.4,1.0,6);}
};
page('e12',5,{old:mkq(E12e),neu:mkq(E12e),tm:{"do you like apples": 0, "it asks so": 1.42, "i like apples": 4.7, "it tells so": 6.53}});
}
P.G1STAGED&&P.G1STAGED.add('e12');
/* ---------- e13 ---------- */
{
const XC=MARKC['!'];
const putMark=async(R,S,bs,ch,y)=>{const last=bs[bs.length-1];const p=markB(S.G,ch,2.6,2.6,bs[0].h);p.s=1;await bfly(R,p,last.x+last.w()/2+bs[0].h*.55,y,.7,.4);R.fx('sparkle',p.x,y,12,{w:.3,t:.7});await bpulse(R,p,.5);return p;};
const snow=(R,n)=>{for(let i=0;i<(n||6);i++){const f=mk(R,'snowflake',{x:-1.8+Math.random()*3.4,y:2.5,h:.22,face:1});f.show(.2);f.go(f.st.x+(Math.random()-.5)*.6,.2,2.2+Math.random(),{lin:true,wob:.3,waves:2}).then(()=>f.hide(.4));}};
const E13a={
 'wow it is snowing':async(R,S)=>{await R.bg('nighthill1');R.label('A strong feeling','#16a36f');S.G=gfx(R);snow(R,8);
  S.k=await enter(R,'pa-norawonder',-1.6,1.45,{sec:.8});S.s=await sentence(R,S.G,['Wow,','it','is','snowing'],.0,1.95,{h:.38,t:.15});snow(R,6);},
 'this sentence shows':async(R,S)=>{R.word('Surprise!',.4,1.4,XC,1.2);await S.k.jump(.5);snow(R,6);},
 'it ends with an':async(R,S)=>{S.p=await putMark(R,S,S.s,'!',1.95);R.word('exclamation mark!',.3,1.4,XC,1.1);await R.T(.9,e=>{S.p.rot=Math.sin(e*Math.PI*6)*.25*(1-e);S.p.s=1+.3*Math.sin(e*Math.PI);});await S.k.swap('pa-norawave',.25,{h:1.45});await S.k.jump(.4);}
};
page('e13',1,{old:mkq(E13a),neu:mkq(E13a),tm:{"wow it is snowing": 0, "this sentence shows": 1.47, "it ends with an": 4.05}});
const E13b={
 'we can feel':async(R,S)=>{await R.bg('playroom1');R.label('Big feelings','#16a36f');S.G=gfx(R);
  S.f=[];for(const[i,w]of['surprised','scared','happy'].entries()){const b=blk(S.G,w,-1.1+i*1.15,2.0,['#7048e8','#1c7ed6','#e8a900'][i],.34);S.f.push(b);tin(R,b,.3);await R.wait(.35);}},
 'look out':async(R,S)=>{S.bl=mk(R,'ball',{x:2.8,y:1.4,h:.45,face:-1});S.bl.show(.1);S.k=await enter(R,'pa-timwow',-1.4,1.45,{from:-2.9,sec:.5});fly(R,S.bl,-.6,.3,.9,{arc:.6,spin:Math.PI*3});
  S.s1=await sentence(R,S.G,['Look','out!'],.6,1.4,{h:.4,cols:['#e03131','#e03131'],t:.12});await S.k.shiver(.6);bpulse(R,S.f[1],.6);},
 'hooray':async(R,S)=>{S.k.swap('pa-timcheer',.25,{h:1.45});S.s2=await sentence(R,S.G,['Hooray!'],.6,.85,{h:.42,col:'#e8a900',t:.2});await all([S.k.jump(.5),bpulse(R,S.f[2],.6)]);hearts(R,-1.3,1.6,8);},
 'these end':async(R,S)=>{for(const b of [S.s1[1],S.s2[0]])bpulse(R,b,.7);R.word('! ! !',.6,1.9,XC,1.3);await S.k.jump(.3);}
};
page('e13',2,{old:mkq(E13b),neu:mkq(E13b),tm:{"we can feel": 0, "look out": 3.09, "hooray": 4.48, "these end": 5.09}});
const E13c={
 'the cake is here that':async(R,S)=>{await R.bg('picnic5');R.label('Say it with feeling','#16a36f');S.G=gfx(R);
  S.ck=await drop(R,'pa-cake',.9,.2,.6);S.k=mk(R,'pa-milobow',{x:-1.6,y:.2,h:1.45,face:1});S.k.show(.3);S.s1=await sentence(R,S.G,['The','cake','is','here.'],-.1,1.95,{h:.36,col:'#868e96',t:.13});},
 'that sounds calm':async(R,S)=>{R.word('calm...',-.1,1.45,'#868e96',.9);await R.wait(.3);},
 'that sounds so exciting':async(R,S)=>{bout(R,S.s1,.3);await R.wait(.3);S.s2=await sentence(R,S.G,['The','cake','is','here!'],-.1,1.95,{h:.42,col:'#e03131',t:.1});await S.k.swap('pa-milodance',.2,{h:1.45});
  R.fx('sparkle',.9,1.0,26,{w:1.2,t:1.2});await all([S.k.jump(.6),S.ck.jump(.4)]);R.word('Yay!',-1.2,1.85,'#e8a900',1.1);},
 'the exclamation mark makes':async(R,S)=>{const p=S.s2[3];await R.T(1.0,e=>{p.s=1+.35*Math.sin(e*Math.PI);p.hl=Math.sin(e*Math.PI);});await cheer(R,[S.k,S.ck],.3,1.7);}
};
page('e13',3,{old:mkq(E13c),neu:mkq(E13c),tm:{"the cake is here that": 0, "that sounds calm": 1.34, "that sounds so exciting": 5.06, "the exclamation mark makes": 7.36}});
const E13d={
 'help a spider':async(R,S)=>{await R.bg('livingroom');R.label('Scared or angry','#16a36f');S.G=gfx(R);
  S.k=await enter(R,'pa-timwow',-1.4,1.45,{sec:.6});S.sp=mk(R,'spider',{x:.6,y:2.6,h:.45,face:1});S.sp.show(.1);await S.sp.go(.6,1.1,.8,{lin:true});
  S.s1=await sentence(R,S.G,['Help,','a','spider!'],.2,1.95,{h:.36,col:'#1c7ed6',t:.12});await S.k.shiver(.6);},
 'that is scared':async(R,S)=>{R.word('scared!',-1.4,1.85,'#1c7ed6',1);await S.sp.go(.6,2.7,.8,{lin:true});},
 'stop that rex':async(R,S)=>{bout(R,S.s1,.3);S.dg=mk(R,'pa-dog',{x:2.8,y:.2,h:.6,face:-1});S.dg.show(.1);S.sk=await drop(R,'socks',.6,.2,.45);await S.dg.go(.8,.2,.7,{hops:3});
  fly(R,S.sk,1.8,.3,.6,{arc:.3});S.dg.go(1.9,.2,.6,{hops:3});S.s2=await sentence(R,S.G,['Stop','that,','Rex!'],.2,1.95,{h:.36,col:'#e03131',t:.12});},
 'that is angry':async(R,S)=>{R.word('angry!',-1.4,1.85,'#e03131',1);await S.k.jump(.4);await S.k.shiver(.4);},
 'strong feelings':async(R,S)=>{await bpulse(R,S.s2[2],.7);R.word('!',S.s2[2].x+.5,1.95,XC,1.3);}
};
page('e13',4,{old:mkq(E13d),neu:mkq(E13d),tm:{"help a spider": 0, "that is scared": 1.43, "stop that rex": 3.17, "that is angry": 5.1, "strong feelings": 6.97}});
const E13e={
 'i see a duck':async(R,S)=>{await R.bg('park');R.label('Calm or excited?','#16a36f');S.G=gfx(R);
  S.k=await enter(R,'pa-leowave',-1.7,1.4,{sec:.7});S.dk=await enter(R,'duck',.8,.6,{from:2.9,sec:.8,hops:4});S.s1=await sentence(R,S.G,['I','see','a','duck'],-.3,1.95,{h:.34,t:.12});},
 'that is calm':async(R,S)=>{S.p1=await putMark(R,S,S.s1,'.',1.95);R.word('calm',-.3,1.5,'#1c7ed6',.9);},
 'a duck is chasing':async(R,S)=>{S.s2=await sentence(R,S.G,['A','duck','is','chasing','me'],-.1,1.2,{h:.32,col:'#e03131',t:.1});R.word('Quack!',.5,1.0,'#e8a900',.9);
  await all([S.k.go(-.6,.2,.7,{hops:4}),S.dk.go(.2,.2,.7,{hops:4})]);await all([S.k.go(-1.9,.2,.6,{hops:3}),S.dk.go(-1.0,.2,.6,{hops:3})]);},
 'that is a surprise':async(R,S)=>{S.p2=await putMark(R,S,S.s2,'!',1.2);R.word('surprise!',.6,.75,XC,1);await S.k.swap('pa-leocheer',.25,{h:1.4});await all([S.k.jump(.4),S.dk.jump(.3)]);}
};
page('e13',5,{old:mkq(E13e),neu:mkq(E13e),tm:{"i see a duck": 0, "that is calm": 1.25, "a duck is chasing": 4.36, "that is a surprise": 6.61}});
}
P.G1STAGED&&P.G1STAGED.add('e13');
/* ---------- e14 ---------- */
{
const CAP='#e8a900';
/* grow a small letter tile into a tall capital */
/* a block flips to a new text with a gold capital tile on its first letter */
const grow=async(R,b,txt)=>{await R.T(.3,e=>{b.s=1-e*.9;b.rot=e*Math.PI;});b.text=txt;b.c1=CAP;await R.T(.4,e=>{b.s=.1+1.25*e;b.rot=Math.PI*(1-e);});await R.T(.2,e=>{b.s=1.35-.35*e;});b.rot=0;b.s=1;R.fx('sparkle',b.x-b.w()/2+.1,b.y,12,{w:.3,t:.7});await bpulse(R,b,.4);};
const lt=(R,S,text,y,h)=>{const bs=text.split(' ').map(w=>{const b=blk(S.G,w,0,y,'#5c7cfa',h||.4);b.G=S.G;return b;});const xs=rowX(bs,-.1);bs.forEach((b,i)=>b.x=xs[i]);return bs;};
const showLt=async(R,bs)=>{for(const b of bs){tin(R,b,.22);await R.wait(.12);}};
const hl=(R,b)=>R.T(.8,e=>{b.hl=Math.sin(e*Math.PI);});
const E14a={
 'use a capital':async(R,S)=>{await R.bg('nighthill1');R.label('Three rules','#16a36f');S.G=gfx(R);
  S.r=[];for(const[i,w]of['first word','names','the word I'].entries()){const b=blk(S.G,(i+1)+'. '+w,-1.3+i*1.2,2.0,'#adb5bd',.28);S.r.push(b);tin(R,b,.3);await R.wait(.2);}},
 'the first word':async(R,S)=>{S.r[0].col=CAP;await bpulse(R,S.r[0],.7);S.s=await sentence(R,S.G,['The','snow','is','deep.'],-.2,1.3,{h:.32,t:.1});await recolor(R,S.s[0],CAP);},
 'names like kofi':async(R,S)=>{S.r[1].col=CAP;bpulse(R,S.r[1],.7);bout(R,S.s,.3);S.kf=await enter(R,'kid0',-.2,1.1,{sec:.7});S.n=blk(S.G,'Kofi',-.2,1.45,CAP,.36);await tin(R,S.n,.3);const cw=mk(R,'pa-crown',{x:-.2,y:2.5,h:.25,face:1});cw.show(.05);await fly(R,cw,-.36,1.68,.5,{arc:0});},
 'and the word i':async(R,S)=>{S.r[2].col=CAP;bpulse(R,S.r[2],.7);S.me=await enter(R,'pa-norawave',1.3,1.4,{from:2.9,sec:.6});S.i=blk(S.G,'I',1.3,1.55,CAP,.5);await tin(R,S.i,.3);R.word('Always tall!',1.2,1.05,CAP,1);await cheer(R,[S.kf,S.me],.5,1.7);}
};
page('e14',1,{old:mkq(E14a),neu:mkq(E14a),tm:{"use a capital": 0, "the first word": 2.65, "names like kofi": 5.23, "and the word i": 7.42}});
const E14b={
 'look i like snow':async(R,S)=>{await R.bg('nighthill1');R.label('Fix the small i','#16a36f');S.G=gfx(R);
  for(let i=0;i<8;i++){const f=mk(R,'snowflake',{x:-1.8+i*.48,y:2.5,h:.2,face:1});f.show(.2);f.go(f.st.x+.2,.2,2.5+i*.15,{lin:true,wob:.3,waves:2}).then(()=>f.hide(.4));}
  S.w=lt(R,S,'i like snow.',1.95,.4);await showLt(R,S.w);S.k=await enter(R,'pa-leowave',-1.8,1.4,{sec:.7});},
 'the word i is always':async(R,S)=>{const t=S.w[0];await all([hl(R,t),bshake(R,t,.6)]);R.word('too small!',t.x,1.45,'#e03131',1);},
 'watch the small':async(R,S)=>{await grow(R,S.w[0],'I');R.word('Tall I!',S.w[0].x,1.3,CAP,1.2);await S.k.swap('pa-leocheer',.25,{h:1.4});await cheer(R,[S.k],-.4,1.6);await wave(R,S.w);}
};
page('e14',2,{old:mkq(E14b),neu:mkq(E14b),tm:{"look i like snow": 0, "the word i is always": 1.46, "watch the small": 4.3}});
const E14c={
 'kofi mia':async(R,S)=>{await R.bg('schoolyard1');R.label('Names get capitals','#16a36f');S.G=gfx(R);
  S.a=await enter(R,'kid0',-1.3,1.1,{sec:.7});S.b=await enter(R,'pa-miawave',-.05,1.3,{from:2.9,sec:.7});S.c=await enter(R,'pa-leowave',1.15,1.35,{from:2.9,sec:.7});},
 'every name starts':async(R,S)=>{S.n=[];for(const[w,x,a]of[['Kofi',-1.3,S.a],['Mia',-.05,S.b],['Leo',1.15,S.c]]){const ts=w.split('').map((ch,i)=>{const t=S.G.tile(ch,x-(w.length-1)*.17+i*.34,1.95,i?'#5c7cfa':CAP,i?.32:.4);t.s=0;return t;});S.n.push(ts);for(const t of ts)await tin(R,t,.08);a.jump(.3);}},
 'like a tall flag':async(R,S)=>{for(const ts of S.n){const cw=mk(R,'pa-crown',{x:ts[0].x,y:2.6,h:.22,face:1});cw.show(.05);fly(R,cw,ts[0].x,2.3,.45,{arc:0});}await R.wait(.5);await all(S.n.map(ts=>glow(R,ts[0],.8)));await cheer(R,[S.a,S.b,S.c],0,1.5);}
};
page('e14',3,{old:mkq(E14c),neu:mkq(E14c),tm:{"kofi mia": 0, "every name starts": 2.3, "like a tall flag": 5.64}});
const E14d={
 'the dog runs oops':async(R,S)=>{await R.bg('park');R.label('The first word','#16a36f');S.G=gfx(R);
  S.w=lt(R,S,'the dog runs.',1.95,.38);await showLt(R,S.w);S.dg=mk(R,'pa-dog',{x:-2.8,y:.2,h:.6,face:1});S.dg.show(.1);S.dg.go(1.3,.2,1.6,{lin:true,hops:7});R.word('Oops!',-1.0,1.4,'#e03131',1.1);},
 'the first word needs':async(R,S)=>{const t=S.w[0];await hl(R,t);await grow(R,t,'The');},
 'now it says':async(R,S)=>{R.word('The dog runs.',-.1,1.4,'#16a36f',1.2);await wave(R,S.w);await S.dg.jump(.4);}
};
page('e14',4,{old:mkq(E14d),neu:mkq(E14d),tm:{"the dog runs oops": 0, "the first word needs": 2.39, "now it says": 4.5}});
const E14e={
 'my friend kofi':async(R,S)=>{await R.bg('schoolyard1');R.label('Fix them all','#16a36f');S.G=gfx(R);
  S.w=lt(R,S,'my friend kofi and i play.',1.95,.36);await showLt(R,S.w);S.a=await enter(R,'kid0',-1.2,1.0,{sec:.6});S.b=await enter(R,'pa-timwave',.9,1.3,{from:2.9,sec:.6});},
 'fix three letters':async(R,S)=>{const ts=[S.w[0],S.w[2],S.w[4]];for(const t of ts){hl(R,t);bshake(R,t,.5);}R.word('3 fixes!',.0,1.4,'#e03131',1.1);await R.wait(.6);},
 'my kofi i':async(R,S)=>{await grow(R,S.w[0],'My');await grow(R,S.w[2],'Kofi');await grow(R,S.w[4],'I');},
 'now the sentence':async(R,S)=>{await wave(R,S.w);await cheer(R,[S.a,S.b],-.1,1.5);}
};
page('e14',5,{old:mkq(E14e),neu:mkq(E14e),tm:{"my friend kofi": 0, "fix three letters": 2.25, "my kofi i": 4.25, "now the sentence": 8.19}});
}
P.G1STAGED&&P.G1STAGED.add('e14');
P.DIR.mount();
})();
