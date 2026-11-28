/* Grade 1 English: staged theory pages (group d). Generated from snippets. ASCII only. */
(function(){
"use strict";
const P=window.PM;if(!P||!P.DIR||!P.G1H||!P.G1X)return;
const page=P.DIR.page;
const {all,pop,liteq,mkq,hearts,gfx,tin,tout,glow,moveT,COL,colOf,wordTiles,fly,tileFly,squash,wave,VC,vcol,vTiles,rtag,ntag,NC,tg,nounTag,ptag,pltag,GOLD,PG,RCOL,rpair}=P.G1H;
const {blk,rowX,sentence,reflow,bfly,bshake,bpulse,bout,bcross,recolor,mk,enter,drop,popIn,cheer,crates,intoCrate,markB,MARKC,speak}=P.G1X;
const rnd=(a,b)=>a+Math.random()*(b-a);
/* ---------- e20 ---------- */
{
const AM='#7048e8',IS='#1c7ed6',ARE='#2b8a3e';
const verbB=async(R,S,bs,i,word,col)=>{const b=bs[i];b.text=word;b.col=col;await bpulse(R,b,.6);};
const E20a={
 'use am with i':async(R,S)=>{await R.bg('playroom1');R.label('Which word?','#2f7de1');S.G=gfx(R);
  S.r=[['I','am',AM,-1.2],['one','is',IS,.15],['many','are',ARE,1.4]].map(([a,w,c,x])=>({a:blk(S.G,a,x,2.05,'#868e96',.3),w:blk(S.G,w,x,1.6,c,.42)}));await tin(R,S.r[0].a,.2);await tin(R,S.r[0].w,.3);},
 'use is for one':async(R,S)=>{await tin(R,S.r[1].a,.2);await tin(R,S.r[1].w,.3);},
 'use are for more':async(R,S)=>{await tin(R,S.r[2].a,.2);await tin(R,S.r[2].w,.3);},
 'i am happy':async(R,S)=>{S.k=await enter(R,'pa-leocheer',-1.2,1.1,{sec:.6});bpulse(R,S.r[0].w,.6);await S.k.jump(.4);},
 'the dog is big':async(R,S)=>{S.d=await enter(R,'dog',.15,.8,{from:2.9,sec:.6});bpulse(R,S.r[1].w,.6);await S.d.jump(.3);},
 'the dogs are big':async(R,S)=>{S.d2=await enter(R,'dog',1.2,.8,{from:2.9,sec:.5});S.d3=await enter(R,'dog',1.65,.75,{from:2.9,sec:.4});bpulse(R,S.r[2].w,.6);await cheer(R,[S.k,S.d,S.d2,S.d3],.2,1.3);}
};
page('e20',1,{old:mkq(E20a),neu:mkq(E20a),tm:{"use am with i": 0, "use is for one": 1.38, "use are for more": 3.3, "i am happy": 5.73, "the dog is big": 7.45, "the dogs are big": 9.45}});
const E20b={
 'i am leo':async(R,S)=>{await R.bg('schoolyard1');R.label('Am goes with I','#2f7de1');S.G=gfx(R);
  S.k=await enter(R,'pa-leowave',-1.4,1.45,{sec:.7});S.s=await sentence(R,S.G,['I','am','Leo.'],.4,1.95,{h:.4,cols:[AM,AM],t:.12});},
 'i am hungry':async(R,S)=>{await S.k.swap('pa-leotummy',.25,{h:1.45});S.s[2].text='hungry.';bpulse(R,S.s[2],.5);await reflow(R,S.s,.4,1.95,.4);R.word('Grumble!',-1.2,1.75,'#c2255c',.9);await S.k.shiver(.5);},
 'i am happy':async(R,S)=>{await S.k.swap('pa-leocheer',.25,{h:1.45});S.s[2].text='happy!';bpulse(R,S.s[2],.5);await reflow(R,S.s,.4,1.95,.4);await S.k.jump(.5);},
 'the word am':async(R,S)=>{await all([bpulse(R,S.s[0],.8),bpulse(R,S.s[1],.8)]);R.word('I + am',.4,1.4,AM,1.3);hearts(R,-1.4,1.8,8);}
};
page('e20',2,{old:mkq(E20b),neu:mkq(E20b),tm:{"i am leo": 0, "i am hungry": 1.14, "i am happy": 2.83, "the word am": 4.52}});
const E20c={
 'the cat is sleepy':async(R,S)=>{await R.bg('livingroom');R.label('Is for one','#2f7de1');S.G=gfx(R);
  S.ct=mk(R,'pa-cat',{x:-1.3,y:.2,h:.6,face:1,idle:'sleep'});S.ct.show(.4,'pop');R.word('Zzz',-1.1,.95,'#7048e8',.8);S.s1=await sentence(R,S.G,['The','cat','is','sleepy.'],.2,2.05,{h:.3,cols:[0,0,IS].map(c=>c||'#868e96'),t:.1});},
 'the cake is yummy':async(R,S)=>{S.ck=await drop(R,'pa-cake',.1,.2,.55);R.word('Yum!',.1,1.0,'#e8590c',.8);S.s2=await sentence(R,S.G,['The','cake','is','yummy.'],.2,1.6,{h:.3,cols:['#868e96','#868e96',IS],t:.1});},
 'the sun is hot':async(R,S)=>{S.sn=mk(R,'pa-sunface',{x:1.4,y:-.3,h:.55,face:1});S.sn.show(.2);await S.sn.go(1.4,.6,.7,{arc:.2});S.s3=await sentence(R,S.G,['The','sun','is','hot.'],.2,1.15,{h:.3,cols:['#868e96','#868e96',IS],t:.1});},
 'just one thing':async(R,S)=>{await all([S.s1[2],S.s2[2],S.s3[2]].map(b=>bpulse(R,b,.7)));R.word('one: is',-.9,1.6,IS,1.2);await all([S.ct.jump(.2),S.ck.jump(.3),S.sn.jump(.3)]);}
};
page('e20',3,{old:mkq(E20c),neu:mkq(E20c),tm:{"the cat is sleepy": 0, "the cake is yummy": 1.49, "the sun is hot": 3.44, "just one thing": 5.31}});
const E20d={
 'the birds are loud':async(R,S)=>{await R.bg('park');R.label('Are for more','#2f7de1');S.G=gfx(R);
  S.bd=[];for(const[x,y]of[[-1.5,1.2],[-1.0,1.35],[-.6,1.1]]){const b=mk(R,'bird',{x:-2.9,y,h:.35,face:1,idle:'flutter'});b.show(.1);b.fly(x,y,.8);S.bd.push(b);await R.wait(.12);}R.word('Tweet tweet!',-1.0,1.65,'#1c7ed6',.9);
  S.s1=await sentence(R,S.G,['The','birds','are','loud.'],.4,2.05,{h:.3,cols:['#868e96','#868e96',ARE],t:.1});},
 'the apples are red':async(R,S)=>{S.ap=[];for(const x of[.3,.65,1.0]){const a=await drop(R,'pa-apple',x,.2,.38);S.ap.push(a);}S.s2=await sentence(R,S.G,['The','apples','are','red.'],.4,1.6,{h:.3,cols:['#868e96','#868e96',ARE],t:.1});},
 'we are friends':async(R,S)=>{S.a=await enter(R,'pa-miawave',1.3,1.2,{from:2.9,sec:.5});S.b=await enter(R,'pa-timwave',1.7,1.2,{from:2.9,sec:.5});S.s3=await sentence(R,S.G,['We','are','friends.'],.4,1.15,{h:.3,cols:['#868e96',ARE],t:.1});},
 'more than one gets':async(R,S)=>{await all([S.s1[2],S.s2[2],S.s3[1]].map(b=>bpulse(R,b,.7)));R.word('many: are',-.8,.7+.3,ARE,1.2);await cheer(R,[S.a,S.b].concat(S.ap),.6,1.4);}
};
page('e20',4,{old:mkq(E20d),neu:mkq(E20d),tm:{"the birds are loud": 0, "the apples are red": 1.52, "we are friends": 3.58, "more than one gets": 5.3}});
const E20e={
 'the frogs blank':async(R,S)=>{await R.bg('forest1');R.label('Fill it in','#2f7de1');S.G=gfx(R);
  S.fr=[];for(const x of[-1.4,-.9]){const f=mk(R,'frog',{x:-2.9,y:.2,h:.45,face:1});f.show(.1);f.go(x,.2,.8,{hops:2,arc:.4});S.fr.push(f);await R.wait(.1);}
  S.s1=await sentence(R,S.G,['The','frogs','____','green.'],.3,1.95,{h:.34,t:.1});S.s1[2].gap=true;},
 'there is more':async(R,S)=>{const g=S.s1[2];g.gap=false;g.text='are';g.col=ARE;g.s=0;await tin(R,g,.4);await reflow(R,S.s1,.3,1.95,.3);R.word('more than one: are',.3,1.4,ARE,1.1);await all(S.fr.map(f=>f.jump(.3)));},
 'the frog blank':async(R,S)=>{S.f1=mk(R,'frog',{x:2.9,y:.2,h:.45,face:-1});S.f1.show(.1);S.f1.go(1.2,.2,.8,{hops:2,arc:.4});S.s2=await sentence(R,S.G,['The','frog','____','green.'],.3,1.0,{h:.34,t:.1});S.s2[2].gap=true;},
 'just one frog':async(R,S)=>{const g=S.s2[2];g.gap=false;g.text='is';g.col=IS;g.s=0;await tin(R,g,.4);await reflow(R,S.s2,.3,1.0,.3);R.word('one: is',.3,.55,IS,1.1);await S.f1.jump(.4);}
};
page('e20',5,{old:mkq(E20e),neu:mkq(E20e),tm:{"the frogs blank": 0, "there is more": 1.77, "the frog blank": 5.19, "just one frog": 7.38}});
}
P.G1STAGED&&P.G1STAGED.add('e20');
/* ---------- e21 ---------- */
{
const ADJ='#f08c00';
const adj=async(R,S,a,n,x,y,h)=>{const bs=await sentence(R,S.G,[a,n],x,y,{h:h||.32,cols:[ADJ,'#4c6ef5'],t:.1});return bs;};
const E21a={
 'adjectives are':async(R,S)=>{await R.bg('sunhill1');R.label('Describing words','#2f7de1');S.G=gfx(R);S.b=blk(S.G,'adjective = describing word',.1,2.05,ADJ,.32);await tin(R,S.b,.3);},
 'a big elephant':async(R,S)=>{bout(R,S.b,.3);S.el=mk(R,'elephant',{x:-2.9,y:.2,h:1.0,face:1});S.el.show(.1);S.el.walk(-1.3,.2,.9);S.a1=await adj(R,S,'big','elephant',-1.3,1.55);await S.el.grow(1.15,1.15,.4);},
 'a small mouse':async(R,S)=>{S.ms=mk(R,'mouse',{x:2.9,y:.2,h:.35,face:-1});S.ms.show(.1);S.ms.go(-.5,.2,.7,{lin:true,hops:6});R.word('Squeak!',-.5,.8,'#868e96',.7);S.a2=await adj(R,S,'small','mouse',-.85,1.0);},
 'cold ice':async(R,S)=>{S.ic=await drop(R,'ice',.6,.2,.5,{fx:'sparkle'});await S.ic.shiver(.4);S.a3=await adj(R,S,'cold','ice',.75,1.0);R.word('Brrr!',.6,1.45,'#1c7ed6',.8);},
 'a hot fire':async(R,S)=>{S.fi=await popIn(R,'fire',1.45,.2,.65);R.fx('dust',1.45,.9,10,{w:.3,t:1.2});S.a4=await adj(R,S,'hot','fire',1.4,1.55);await wave(R,[S.a1[0],S.a2[0],S.a3[0],S.a4[0]]);}
};
page('e21',1,{old:mkq(E21a),neu:mkq(E21a),tm:{"adjectives are": 0, "a big elephant": 2.59, "a small mouse": 4.47, "cold ice": 6.24, "a hot fire": 7.87}});
const E21b={
 'the candy is sweet':async(R,S)=>{await R.bg('kitchen-day');R.label('How it tastes','#2f7de1');S.G=gfx(R);
  S.k=await enter(R,'pa-leoeat',-1.6,1.3,{sec:.7});S.cd=await drop(R,'candy',.3,.25,.45);S.s1=await sentence(R,S.G,['The','candy','is','sweet.'],.3,1.95,{h:.34,cols:['#868e96','#4c6ef5','#868e96',ADJ],t:.1});},
 'sweet tells how':async(R,S)=>{await bpulse(R,S.s1[3],.7);R.word('Yum!',.3,1.0,'#e8590c',1);await fly(R,S.cd,-1.4,1.0,.6,{arc:.4});S.cd.hide(.15);await S.k.jump(.3);},
 'the cookie is crunchy':async(R,S)=>{S.ck=await drop(R,'cookie',.5,.25,.45);S.s2=await sentence(R,S.G,['The','cookie','is','crunchy.'],.3,1.4,{h:.34,cols:['#868e96','#4c6ef5','#868e96',ADJ],t:.1});},
 'crunchy tells':async(R,S)=>{await fly(R,S.ck,-1.4,1.0,.6,{arc:.4});S.ck.hide(.15);for(let i=0;i<3;i++){R.word('Crunch!',-1.0+i*.3,1.5+i*.15,'#a0522d',.6);R.fx('crumb',-1.4,1.0,6,{w:.3,t:.6});await S.k.chew(2,.35);}await bpulse(R,S.s2[3],.6);}
};
page('e21',2,{old:mkq(E21b),neu:mkq(E21b),tm:{"the candy is sweet": 0, "sweet tells how": 1.54, "the cookie is crunchy": 4.42, "crunchy tells": 6.61}});
const E21c={
 'describing words can tell':async(R,S)=>{await R.bg('park');R.label('Colour and size','#2f7de1');S.G=gfx(R);S.k=await enter(R,'pa-norapoint',-1.9,1.45,{sec:.8});},
 'a red apple':async(R,S)=>{S.ap=await drop(R,'pa-apple',-.7,.2,.5);S.a1=await adj(R,S,'red','apple',-.7,1.1,.3);S.a1[0].col='#e03131';},
 'a tiny bug':async(R,S)=>{S.bg=mk(R,'pa-bug',{x:2.9,y:.2,h:.25,face:-1});S.bg.show(.1);S.bg.go(.35,.2,.8,{lin:true,hops:8});S.a2=await adj(R,S,'tiny','bug',.35,.8,.3);},
 'a tall tree':async(R,S)=>{S.tr=await popIn(R,'tree',1.35,.2,1.4);S.tr.grow(1,1.15,.6);S.a3=await adj(R,S,'tall','tree',1.25,1.9,.3);await wave(R,[S.a1[0],S.a2[0],S.a3[0]]);await S.k.jump(.3);}
};
page('e21',3,{old:mkq(E21c),neu:mkq(E21c),tm:{"describing words can tell": 0, "a red apple": 3.01, "a tiny bug": 4.73, "a tall tree": 6.53}});
const E21d={
 'describing words can tell how':async(R,S)=>{await R.bg('livingroom');R.label('How it feels','#2f7de1');S.G=gfx(R);S.k=await enter(R,'pa-miawave',-1.9,1.45,{sec:.8});},
 'a soft pillow':async(R,S)=>{S.pl=await drop(R,'pa-pillow',-.75,.2,.45,{spin:.6});await R.T(.6,e=>{S.pl.st.sy=1-.2*Math.sin(e*Math.PI);S.pl.ap();});S.a1=await adj(R,S,'soft','pillow',-.75,1.05,.3);R.word('squish',-.75,1.45,ADJ,.7);},
 'a hard rock':async(R,S)=>{S.rk=await drop(R,'rock',.35,.2,.5,{spin:0});R.word('Thud!',.35,1.0,'#868e96',.8);S.a2=await adj(R,S,'hard','rock',.35,1.45,.3);},
 'a fuzzy puppy':async(R,S)=>{S.pp=await enter(R,'pa-puppy',1.35,.6,{from:2.9,sec:.6,hops:4});hearts(R,1.35,1.0,8);S.a3=await adj(R,S,'fuzzy','puppy',1.25,1.05,.3);await S.k.swap('pa-miacheer',.25,{h:1.45});await wave(R,[S.a1[0],S.a2[0],S.a3[0]]);await S.pp.jump(.3);}
};
page('e21',4,{old:mkq(E21d),neu:mkq(E21d),tm:{"describing words can tell how": 0, "a soft pillow": 3.38, "a hard rock": 5.24, "a fuzzy puppy": 6.99}});
const E21e={
 'the dog runs add':async(R,S)=>{await R.bg('park');R.label('Make it better','#2f7de1');S.G=gfx(R);
  S.dg=mk(R,'dog',{x:-2.9,y:.2,h:.65,face:1});S.dg.show(.1);S.dg.go(-.6,.2,1.0,{lin:true,hops:5});S.s=await sentence(R,S.G,['The','dog','runs.'],0,1.95,{h:.4,col:'#868e96',t:.12});},
 'add a describing':async(R,S)=>{S.gap=blk(S.G,'?',0,2.65,'#adb5bd',.4);S.gap.gap=true;S.gap.s=1;await reflow(R,[S.s[0],S.gap,S.s[1],S.s[2]],0,1.95,.6);},
 'the happy dog runs':async(R,S)=>{S.gap.gap=false;S.gap.text='happy';S.gap.col=ADJ;S.gap.s=0;await tin(R,S.gap,.4);await reflow(R,[S.s[0],S.gap,S.s[1],S.s[2]],0,1.95,.3);R.fx('sparkle',S.gap.x,1.95,16,{w:.5,t:.8});
  S.dg.go(1.3,.2,1.0,{lin:true,hops:6});hearts(R,.4,1.2,10);await S.dg.jump(.4);},
 'now we can picture':async(R,S)=>{await bpulse(R,S.gap,.8);R.word('Wag wag!',1.3,1.1,ADJ,.9);await S.dg.wag(.8,.12,4);}
};
page('e21',5,{old:mkq(E21e),neu:mkq(E21e),tm:{"the dog runs add": 0, "add a describing": 1.4, "the happy dog runs": 3.65, "now we can picture": 5.89}});
}
P.G1STAGED&&P.G1STAGED.add('e21');
/* ---------- e22 ---------- */
{
const LOC='#0c8599';
const tag=async(R,S,w,x,y)=>{if(S.t)bout(R,S.t,.2);S.t=blk(S.G,w,x,y,LOC,.38);await tin(R,S.t,.3);R.fx('sparkle',x,y,8,{w:.3,t:.6});};
const E22a={
 'location words':async(R,S)=>{await R.bg('livingroom');R.label('Where is it?','#2f7de1');S.G=gfx(R);
  S.bx=await drop(R,'box',-1.4,.2,.55);S.ch=await drop(R,'chair',-.4,.2,.7);S.bd=await drop(R,'pa-bed',.6,.2,.55);S.tr=await popIn(R,'tree',1.45,.2,1.0);
  S.ct=mk(R,'pa-cat',{x:-2.9,y:.2,h:.42,face:1});S.ct.show(.1);await S.ct.go(-2.0,.2,.6,{hops:2});},
 'in the box':async(R,S)=>{await S.ct.go(-1.4,.5,.6,{arc:.6});S.ct.st.op=.0;S.ct.ap();R.fx('dust',-1.4,.6,8,{w:.4,t:.5});S.ct.st.op=1;S.ct.at(-1.4,.48);await tag(R,S,'in',-1.4,1.95);},
 'on the chair':async(R,S)=>{await S.ct.go(-.4,.75,.6,{arc:.7});await tag(R,S,'on',-.4,1.95);},
 'under the bed':async(R,S)=>{await S.ct.go(.6,.18,.6,{arc:.3});S.ct.st.s=.8;S.ct.ap();await tag(R,S,'under',.6,1.95);},
 'behind the tree':async(R,S)=>{S.ct.st.s=1;await S.ct.go(1.5,.25,.6,{arc:.4});S.ct.st.op=.35;S.ct.ap();await tag(R,S,'behind',1.4,1.95);R.word('Peek-a-boo!',1.0,1.45,LOC,.9);}
};
page('e22',1,{old:mkq(E22a),neu:mkq(E22a),tm:{"location words": 0, "in the box": 1.97, "on the chair": 3.68, "under the bed": 5.3, "behind the tree": 6.98}});
const E22b={
 'the bird flies over':async(R,S)=>{await R.bg('street');R.label('Over and under','#2f7de1');S.G=gfx(R);
  S.hs=await popIn(R,'pa-house',-.6,.2,.9);S.bd=mk(R,'bird',{x:-2.9,y:1.6,h:.38,face:1,idle:'flutter'});S.bd.show(.1);await S.bd.fly(-.6,1.5,1.2);await tag(R,S,'over',-.6,2.05);S.bd.fly(.5,1.6,.8);},
 'the cat hides':async(R,S)=>{S.tb=await popIn(R,'pa-table21',1.0,.2,.7);S.ct=mk(R,'pa-cat',{x:2.9,y:.2,h:.35,face:-1});S.ct.show(.1);await S.ct.go(1.0,.2,.8,{hops:3});S.ct.st.s=.9;S.ct.ap();await tag(R,S,'under',1.0,1.5);},
 'over is up high':async(R,S)=>{S.ar=S.G.add('F',g=>{S.G.arrow(g,-1.4,1.2,-1.4,2.0,LOC,8);});S.ar.a=0;await S.G.fade(S.ar,1,.3);R.word('up high!',-1.4,2.15,LOC,.9);await S.bd.jump(.2);},
 'under is down low':async(R,S)=>{S.ar2=S.G.add('F',g=>{S.G.arrow(g,1.75,1.2,1.75,.4,LOC,8);});S.ar2.a=0;await S.G.fade(S.ar2,1,.3);R.word('down low!',1.55,.45,LOC,.9);await S.ct.shiver(.4);}
};
page('e22',2,{old:mkq(E22b),neu:mkq(E22b),tm:{"the bird flies over": 0, "the cat hides": 2.09, "over is up high": 4.69, "under is down low": 6.63}});
const E22c={
 'the dog sits beside':async(R,S)=>{await R.bg('park');R.label('Beside and between','#2f7de1');S.G=gfx(R);
  S.ct=await popIn(R,'pa-cat',-1.2,.2,.55);S.dg=mk(R,'pa-dog',{x:-2.9,y:.2,h:.6,face:1});S.dg.show(.1);await S.dg.go(-1.75,.2,.7,{hops:3});await tag(R,S,'beside',-1.45,1.6);},
 'the ball is between':async(R,S)=>{S.b1=await drop(R,'box',.3,.2,.5);S.b2=await drop(R,'box',1.4,.2,.5);S.bl=mk(R,'ball',{x:.85,y:2.6,h:.38,face:1});S.bl.show(.1);await fly(R,S.bl,.85,.2,.6,{arc:0});S.bl.jump(.2);await tag(R,S,'between',.85,1.4);},
 'beside means':async(R,S)=>{R.word('next to!',-1.45,1.1,LOC,1);await all([S.dg.jump(.3),S.ct.jump(.3)]);},
 'between means':async(R,S)=>{R.word('in the middle!',.85,1.0,LOC,1);await S.bl.jump(.4);}
};
page('e22',3,{old:mkq(E22c),neu:mkq(E22c),tm:{"the dog sits beside": 0, "the ball is between": 2.11, "beside means": 5.02, "between means": 7.2}});
const E22d={
 'watch the ball':async(R,S)=>{await R.bg('playroom1');R.label('Follow the ball','#2f7de1');S.G=gfx(R);
  S.bk=await popIn(R,'pa-laundry',.4,.2,.6);S.k=await enter(R,'pa-leowave',-1.8,1.4,{sec:.7});S.bl=mk(R,'ball',{x:-1.3,y:.9,h:.35,face:1});S.bl.show(.3,'pop');},
 'it goes in':async(R,S)=>{await fly(R,S.bl,.4,.45,.8,{arc:.9,spin:Math.PI*2});R.fx('dust',.4,.6,8,{w:.4,t:.5});await tag(R,S,'in',.4,1.6);},
 'now it is on':async(R,S)=>{await fly(R,S.bl,.4,.85,.6,{arc:.4});await S.bl.jump(.15);await tag(R,S,'on',.4,1.6);},
 'now it is behind':async(R,S)=>{await fly(R,S.bl,.75,.5,.6,{arc:.5});S.bl.st.op=.35;S.bl.ap();await tag(R,S,'behind',.4,1.6);R.word('Where?',1.3,1.2,LOC,.9);await S.k.swap('pa-leocheer',.25,{h:1.4});await S.k.jump(.3);}
};
page('e22',4,{old:mkq(E22d),neu:mkq(E22d),tm:{"watch the ball": 0, "it goes in": 1.3, "now it is on": 3.43, "now it is behind": 5.73}});
const E22e={
 'where is the frog':async(R,S)=>{await R.bg('forest1');R.label('Where is the frog?','#2f7de1');S.G=gfx(R);
  S.rk=await drop(R,'rock',.4,.2,.65,{spin:0});S.fr=mk(R,'frog',{x:-2.9,y:.2,h:.4,face:1});S.fr.show(.1);await S.fr.go(-.3,.2,.9,{hops:3,arc:.4});},
 'it is beside':async(R,S)=>{await tag(R,S,'beside',-.2,1.6);},
 'now it is on':async(R,S)=>{R.word('Hop!',.0,1.2,'#2b8a3e',.8);await S.fr.go(.4,.75,.6,{arc:.6});await tag(R,S,'on',.4,1.6);},
 'now it is behind':async(R,S)=>{R.word('Hop!',.6,1.4,'#2b8a3e',.8);await S.fr.go(.65,.35,.6,{arc:.6});S.fr.st.op=.35;S.fr.ap();await tag(R,S,'behind',.4,1.6);R.word('Ribbit!',1.1,1.0,'#2b8a3e',.8);}
};
page('e22',5,{old:mkq(E22e),neu:mkq(E22e),tm:{"where is the frog": 0, "it is beside": 1.41, "now it is on": 4.59, "now it is behind": 7.2}});
}
P.G1STAGED&&P.G1STAGED.add('e22');
/* ---------- e23 ---------- */
{
const AC='#e8590c',ANC='#7048e8',THE='#0c8599';
const art=async(R,S,a,n,x,y,col)=>sentence(R,S.G,[a,n],x,y,{h:.36,cols:[col,'#4c6ef5'],t:.12});
const E23a={
 'use a before':async(R,S)=>{await R.bg('playroom1');R.label('A or an?','#2f7de1');S.G=gfx(R);
  S.a=blk(S.G,'a',-.9,2.05,AC,.5);S.an=blk(S.G,'an',.9,2.05,ANC,.5);await all([tin(R,S.a,.3),tin(R,S.an,.3)]);},
 'like a dog':async(R,S)=>{S.dg=await enter(R,'dog',-.9,.7,{from:-2.9,sec:.6});S.w1=await art(R,S,'a','dog',-.9,1.4,AC);},
 'use an before':async(R,S)=>{await bpulse(R,S.an,.6);R.word('a e i o u',.9,1.5,ANC,1);},
 'like an egg':async(R,S)=>{S.eg=await drop(R,'egg',.5,.2,.45);S.w2=await art(R,S,'an','egg',.5,.95,ANC);},
 'and an apple':async(R,S)=>{S.ap=await drop(R,'pa-apple',1.35,.2,.45);S.w3=await art(R,S,'an','apple',1.3,1.45,ANC);await cheer(R,[S.dg,S.eg,S.ap],.3,1.8);}
};
page('e23',1,{old:mkq(E23a),neu:mkq(E23a),tm:{"use a before": 0, "like a dog": 2.46, "use an before": 3.32, "like an egg": 6.04, "and an apple": 6.89}});
const E23b={
 'owl starts':async(R,S)=>{await R.bg('nighthill1');R.label('An owl','#2f7de1');S.G=gfx(R);
  S.ow=mk(R,'owl',{x:2.9,y:1.4,h:.6,face:-1,idle:'flutter'});S.ow.show(.1);await S.ow.fly(-.6,.25,1.1);R.word('Hoot!',-.6,1.0,'#a0522d',.9);
  S.t=S.G.tile('o',-.6,1.95,vcol('o'),.5);S.t.s=0;await tin(R,S.t,.3);await glow(R,S.t,.6);},
 'so we say an owl':async(R,S)=>{S.w1=await art(R,S,'an','owl',-.6,1.4,ANC);await S.ow.jump(.3);},
 'ant starts':async(R,S)=>{S.an=mk(R,'ant',{x:2.9,y:.2,h:.35,face:-1});S.an.show(.1);S.an.go(.9,.2,.9,{lin:true,hops:8});S.t2=S.G.tile('a',.9,1.95,vcol('a'),.5);S.t2.s=0;await tin(R,S.t2,.3);await glow(R,S.t2,.6);},
 'so we say an ant':async(R,S)=>{S.w2=await art(R,S,'an','ant',.9,1.4,ANC);await cheer(R,[S.ow,S.an],.2,1.7);}
};
page('e23',2,{old:mkq(E23b),neu:mkq(E23b),tm:{"owl starts": 0, "so we say an owl": 2.43, "ant starts": 4.31, "so we say an ant": 7.04}});
const E23c={
 'a cat':async(R,S)=>{await R.bg('playroom1');R.label('A for the rest','#2f7de1');S.G=gfx(R);S.ct=await enter(R,'cat',-1.2,.6,{from:-2.9,sec:.6});S.w1=await art(R,S,'a','cat',-1.2,1.3,AC);},
 'a ball':async(R,S)=>{S.bl=await drop(R,'ball',.1,.2,.4);S.w2=await art(R,S,'a','ball',.1,1.3,AC);},
 'a hat':async(R,S)=>{S.ht=await drop(R,'pa-hat',1.3,.2,.4);S.w3=await art(R,S,'a','hat',1.3,1.3,AC);},
 'these start':async(R,S)=>{const fs=[S.w1[1],S.w2[1],S.w3[1]];for(const b of fs)bpulse(R,b,.6);R.word('c  b  h',.1,1.85,'#4c6ef5',1);await wave(R,[S.w1[0],S.w2[0],S.w3[0]]);await all([S.ct.jump(.3),S.bl.jump(.3),S.ht.jump(.3)]);}
};
page('e23',3,{old:mkq(E23c),neu:mkq(E23c),tm:{"a cat": 0, "a ball": 0.98, "a hat": 2.47, "these start": 3.87}});
const E23d={
 'we use the':async(R,S)=>{await R.bg('street');R.label('The one you mean','#2f7de1');S.G=gfx(R);S.th=blk(S.G,'the = that one!',.2,2.05,THE,.34);await tin(R,S.th,.3);},
 'i see a cat':async(R,S)=>{bout(R,S.th,.2);S.cs=[];for(const[k,x]of[['cat',-1.2],['pa-cat',.1],['cat',1.3]]){const c=await enter(R,k,x,.55,{from:x<0?-2.9:2.9,sec:.5});S.cs.push(c);}S.s1=await sentence(R,S.G,['I','see','a','cat.'],.1,2.0,{h:.32,cols:['#868e96','#868e96',AC],t:.1});},
 'the cat is orange':async(R,S)=>{S.s2=await sentence(R,S.G,['The','cat','is','orange.'],.1,1.5,{h:.32,cols:[THE],t:.1});const c=S.cs[1];await c.jump(.4);S.ring=S.G.add('B',g=>{g.save();g.strokeStyle=THE;g.lineWidth=8;g.beginPath();g.arc(S.G.X(.1),S.G.Y(.5),70,0,7);g.stroke();g.restore();});S.ring.a=0;await S.G.fade(S.ring,1,.3);},
 'now we know':async(R,S)=>{S.cs[0].hide(.4);S.cs[2].hide(.4);await bpulse(R,S.s2[0],.8);R.word('that cat!',.1,1.05,THE,1.1);await S.cs[1].jump(.3);}
};
page('e23',4,{old:mkq(E23d),neu:mkq(E23d),tm:{"we use the": 0, "i see a cat": 2.4, "the cat is orange": 4.13, "now we know": 6.19}});
const E23e={
 'let us sort':async(R,S)=>{await R.bg('playroom1');R.label('Sort a and an','#2f7de1');const G=S.G=gfx(R);
  S.cr=await crates(R,G,['a','an'],{xs:[-.8,1.1],cols:[AC,ANC]});S.it={};for(const[k,x,h]of[['dog',-1.5,.5],['pa-bus',-.6,.45],['egg',.4,.4],['owl',1.3,.5]]){S.it[k]=mk(R,k,{x,y:1.6,h,face:1});S.it[k].show(.35,'pop');await R.wait(.12);}},
 'a dog and a bus':async(R,S)=>{R.word('a!',-.8,2.05,AC,1);await intoCrate(R,S.it['dog'],S.cr[0],-.2);await intoCrate(R,S.it['pa-bus'],S.cr[0],.2);},
 'an egg and an owl':async(R,S)=>{R.word('an!',1.1,2.05,ANC,1);await intoCrate(R,S.it['egg'],S.cr[1],-.2);await intoCrate(R,S.it['owl'],S.cr[1],.2);await cheer(R,[S.cr[0].c,S.cr[1].c],.2,1.7);}
};
page('e23',5,{old:mkq(E23e),neu:mkq(E23e),tm:{"let us sort": 0, "a dog and a bus": 1.19, "an egg and an owl": 4.14}});
}
P.G1STAGED&&P.G1STAGED.add('e23');
/* ---------- e24 ---------- */
{
const AND='#2b8a3e',OR='#e8590c';
const E24a={
 'i have a ball':async(R,S)=>{await R.bg('park');R.label('And adds','#f08a24');S.G=gfx(R);
  S.k=await enter(R,'pa-timwave',-1.6,1.45,{sec:.7});S.bl=await drop(R,'ball',-.4,.2,.45);S.s=await sentence(R,S.G,['I','have','a','ball'],-.4,1.95,{h:.34,t:.1});},
 'and a kite':async(R,S)=>{S.an=blk(S.G,'and',0,1.95,AND,.34);S.k2=blk(S.G,'a kite.',0,1.95,'#4c6ef5',.34);const r=S.s.concat([S.an,S.k2]);const xs=rowX(r,0);
  await all(S.s.map((b,i)=>{const x0=b.x;return R.T(.4,e=>{b.x=x0+(xs[i]-x0)*e;});}));S.an.x=xs[4];S.k2.x=xs[5];await tin(R,S.an,.3);await tin(R,S.k2,.3);
  S.kt=mk(R,'kite',{x:1.4,y:.3,h:.6,face:1});S.kt.show(.2);await S.kt.go(1.0,1.2,1.0,{arc:.4,wob:.08});},
 'and means both':async(R,S)=>{await bpulse(R,S.an,.7);R.word('both!',0,1.4,AND,1.2);await all([S.bl.jump(.3),S.kt.jump(.3),S.k.jump(.3)]);hearts(R,0,1.2,8);}
};
page('e24',1,{old:mkq(E24a),neu:mkq(E24a),tm:{"i have a ball": 0, "and a kite": 1.05, "and means both": 1.83}});
const E24b={
 'do you want':async(R,S)=>{await R.bg('kitchen-day');R.label('Or is a choice','#f08a24');S.G=gfx(R);
  S.k=await enter(R,'pa-miathink',-1.7,1.45,{sec:.7});S.ap=await drop(R,'pa-apple',-.2,.2,.5);S.pr=await drop(R,'pa-pear',1.1,.2,.55);},
 'or a pear':async(R,S)=>{S.s=await sentence(R,S.G,['an','apple','or','a','pear?'],.3,1.95,{h:.34,cols:['#4c6ef5','#4c6ef5',OR],t:.1});},
 'or means you choose':async(R,S)=>{await bpulse(R,S.s[2],.7);R.word('pick one!',.3,1.4,OR,1.2);await S.k.swap('pa-miapear',.25,{h:1.45});S.pr.hide(.3);await S.k.jump(.3);S.ap.shiver(.4);}
};
page('e24',2,{old:mkq(E24b),neu:mkq(E24b),tm:{"do you want": 0, "or a pear": 1.42, "or means you choose": 2.11}});
const E24c={
 'the cat sleeps':async(R,S)=>{await R.bg('livingroom');R.label('Join with and','#f08a24');S.G=gfx(R);
  S.ct=mk(R,'pa-cat',{x:-.9,y:.2,h:.55,face:1,idle:'sleep'});S.ct.show(.4,'pop');S.s1=await sentence(R,S.G,['The','cat','sleeps.'],-.8,1.95,{h:.32,t:.1});},
 'the dog sleeps':async(R,S)=>{S.dg=mk(R,'pa-dog',{x:.9,y:.2,h:.6,face:-1,idle:'sleep'});S.dg.show(.4,'pop');R.word('Zzz',.9,1.0,'#7048e8',.8);S.s2=await sentence(R,S.G,['The','dog','sleeps.'],.9,1.4,{h:.32,t:.1});},
 'join them':async(R,S)=>{S.an=blk(S.G,'and',.1,2.6,AND,.36);S.an.s=1;await bfly(R,S.an,.1,1.0,.6,.2);await all([S.ct.go(-.35,.2,.6,{hops:2}),S.dg.go(.4,.2,.6,{hops:2})]);},
 'the cat and the dog':async(R,S)=>{bout(R,S.s1.concat(S.s2),.3);S.an.s=0;await R.wait(.3);S.s3=await sentence(R,S.G,['The','cat','and','the','dog','sleep.'],0,1.95,{h:.32,cols:['#4c6ef5','#4c6ef5',AND],t:.1});R.word('Zzz',.0,1.0,'#7048e8',.9);await bpulse(R,S.s3[2],.6);}
};
page('e24',3,{old:mkq(E24c),neu:mkq(E24c),tm:{"the cat sleeps": 0, "the dog sleeps": 1.36, "join them": 3.32, "the cat and the dog": 5.26}});
const E24d={
 'we can bake':async(R,S)=>{await R.bg('farm23');R.label('Pick with or','#f08a24');S.G=gfx(R);
  S.g=await enter(R,'grandpa',-1.7,1.35,{sec:.7});S.ck=await drop(R,'cookie',-.4,.2,.45);S.s1=await sentence(R,S.G,['bake','cookies'],-.6,1.95,{h:.32,t:.1});},
 'or we can go':async(R,S)=>{S.or=blk(S.G,'or',.4,1.95,OR,.38);await tin(R,S.or,.3);S.fr=await popIn(R,'pa-fishrod',1.1,.2,.8);S.s2=await sentence(R,S.G,['go','fishing'],1.2,1.95,{h:.32,t:.1});},
 'which one':async(R,S)=>{R.word('Which one?',.4,1.4,OR,1.1);await S.ck.shiver(.4);await S.fr.shiver(.4);},
 'we pick fishing':async(R,S)=>{bout(R,S.s1,.3);S.ck.hide(.3);await all(S.s2.map(b=>bpulse(R,b,.6)));S.k=await enter(R,'pa-timcheer',.4,1.35,{from:2.9,sec:.6});S.fs=await drop(R,'fish',.9,.6,.4);await cheer(R,[S.g,S.k,S.fs],.3,1.7);}
};
page('e24',4,{old:mkq(E24d),neu:mkq(E24d),tm:{"we can bake": 0, "or we can go": 1.57, "which one": 3.0, "we pick fishing": 4.33}});
const E24e={
 'bread and butter':async(R,S)=>{await R.bg('kitchen22');R.label('And or or?','#f08a24');S.G=gfx(R);
  S.br=await drop(R,'pa-bread',-1.2,.2,.45);S.bu=await drop(R,'cheese',-.5,.2,.35);S.s1=await sentence(R,S.G,['bread','and','butter'],-.7,1.95,{h:.32,cols:['#4c6ef5',AND],t:.1});},
 'we get both':async(R,S)=>{await bpulse(R,S.s1[1],.7);R.word('both!',-.8,1.4,AND,1.1);await all([S.br.jump(.3),S.bu.jump(.3)]);},
 'juice or milk':async(R,S)=>{S.ju=await drop(R,'juice',.7,.2,.45);S.mi=await drop(R,'milk',1.35,.2,.45);S.s2=await sentence(R,S.G,['juice','or','milk?'],1.0,1.4,{h:.32,cols:['#4c6ef5',OR],t:.1});},
 'we choose one':async(R,S)=>{await bpulse(R,S.s2[1],.7);R.word('one!',1.0,.95,OR,1.1);S.mi.hide(.3);await S.ju.jump(.4);}
};
page('e24',5,{old:mkq(E24e),neu:mkq(E24e),tm:{"bread and butter": 0, "we get both": 1.33, "juice or milk": 3.97, "we choose one": 5.8}});
}
P.G1STAGED&&P.G1STAGED.add('e24');
P.DIR.mount();
})();
