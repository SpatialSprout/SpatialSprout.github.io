/* Grade 1 English: staged theory pages (group e). Generated from snippets. ASCII only. */
(function(){
"use strict";
const P=window.PM;if(!P||!P.DIR||!P.G1H||!P.G1X)return;
const page=P.DIR.page;
const {all,pop,liteq,mkq,hearts,gfx,tin,tout,glow,moveT,COL,colOf,wordTiles,fly,tileFly,squash,wave,VC,vcol,vTiles,rtag,ntag,NC,tg,nounTag,ptag,pltag,GOLD,PG,RCOL,rpair}=P.G1H;
const {blk,rowX,sentence,reflow,bfly,bshake,bpulse,bout,bcross,recolor,mk,enter,drop,popIn,cheer,crates,intoCrate,markB,MARKC,speak}=P.G1X;
const rnd=(a,b)=>a+Math.random()*(b-a);
/* ---------- e25 ---------- */
{
const BUT='#c2255c';
const butIn=async(R,S,bs,i,y)=>{const b=bs[i];b.col=BUT;await bpulse(R,b,.6);R.fx('sparkle',b.x,y,10,{w:.3,t:.6});};
const E25a={
 'chickens have wings':async(R,S)=>{await R.bg('farm23');R.label('Two different ideas','#f08a24');S.G=gfx(R);
  S.ch=await enter(R,'chicken',-1.0,.65,{from:-2.9,sec:.7});S.s1=await sentence(R,S.G,['Chickens','have','wings,'],-.4,1.95,{h:.32,t:.1});await S.ch.go(-1.0,.2,.5,{flap:4});},
 'but they cannot':async(R,S)=>{S.s1b=await sentence(R,S.G,['but','they','cannot','fly','far.'],.0,1.5,{h:.3,cols:[BUT],t:.08});await S.ch.go(-.5,.55,.5,{arc:.4,flap:5});await S.ch.go(-.3,.2,.4,{});R.fx('dust',-.3,.25,8,{w:.4,t:.6});R.word('Flop!',-.3,1.0,'#a0522d',.8);},
 'penguins are birds':async(R,S)=>{bout(R,S.s1.concat(S.s1b),.3);S.pg=await enter(R,'penguin',.9,.75,{from:2.9,sec:.7});S.s2=await sentence(R,S.G,['Penguins','are','birds,'],-.2,1.95,{h:.32,t:.1});},
 'but they swim':async(R,S)=>{S.s2b=await sentence(R,S.G,['but','they','swim.'],.1,1.5,{h:.3,cols:[BUT],t:.08});await S.pg.go(1.3,.3,.8,{waves:3,wob:.12});R.word('Splash!',1.2,.9,'#1c7ed6',.9);R.fx('sparkle',1.3,.4,14,{w:.5,t:.8});},
 'but joins':async(R,S)=>{await all([bpulse(R,S.s2b[0],.8)]);R.word('different!',.1,1.05,BUT,1.2);await all([S.ch.jump(.3),S.pg.jump(.3)]);}
};
page('e25',1,{old:mkq(E25a),neu:mkq(E25a),tm:{"chickens have wings": 0, "but they cannot": 1.7, "penguins are birds": 3.48, "but they swim": 5.38, "but joins": 6.31}});
const E25b={
 'it is sunny':async(R,S)=>{await R.bg('nighthill1'.replace('nighthill1','sunhill1'));R.label('Choose but','#f08a24');S.G=gfx(R);
  S.sn=mk(R,'pa-sunface',{x:1.2,y:-.3,h:.7,face:1});S.sn.show(.2);S.sn.go(1.2,1.0,.9,{arc:.2});S.k=await enter(R,'pa-norawave',-1.5,1.45,{sec:.7});S.s1=await sentence(R,S.G,['It','is','sunny,'],-.3,1.95,{h:.34,t:.1});},
 'but it is cold':async(R,S)=>{S.s2=await sentence(R,S.G,['but','it','is','cold.'],.2,1.45,{h:.34,cols:[BUT],t:.1});for(let i=0;i<8;i++){const f=mk(R,'snowflake',{x:-1.8+i*.45,y:2.5,h:.18,face:1});f.show(.2);f.go(f.st.x,.2,2.2,{lin:true,wob:.3,waves:2}).then(()=>f.hide(.4));}R.word('Brrr!',-1.3,1.85,'#1c7ed6',1);await S.k.shiver(.8);},
 'the two ideas':async(R,S)=>{await bpulse(R,S.s2[0],.8);R.word('sunny + cold = but',.1,.95,BUT,1.2);}
};
page('e25',2,{old:mkq(E25b),neu:mkq(E25b),tm:{"it is sunny": 0, "but it is cold": 1.09, "the two ideas": 2.15}});
const E25c={
 'i have a face':async(R,S)=>{await R.bg('livingroom');R.label('A riddle with but','#f08a24');S.G=gfx(R);S.q=blk(S.G,'???',.4,.75,'#adb5bd',.7);await tin(R,S.q,.4);S.s1=await sentence(R,S.G,['I','have','a','face,'],-.4,1.95,{h:.3,t:.08});},
 'but no eyes':async(R,S)=>{S.s1b=await sentence(R,S.G,['but','no','eyes.'],.8,1.95,{h:.3,cols:[BUT],t:.08});await bshake(R,S.q,.4);},
 'i have hands':async(R,S)=>{S.s2=await sentence(R,S.G,['I','have','hands,'],-.4,1.45,{h:.3,t:.08});},
 'but no fingers':async(R,S)=>{S.s2b=await sentence(R,S.G,['but','no','fingers.'],.8,1.45,{h:.3,cols:[BUT],t:.08});await bshake(R,S.q,.4);},
 'what am i':async(R,S)=>{S.k=await enter(R,'pa-leosay',-1.8,1.4,{sec:.6});R.word('Hmm?',-1.4,1.7,'#e8590c',1);},
 'a clock':async(R,S)=>{bout(R,S.q,.3);S.cl=await popIn(R,'alarm_clock',.4,.2,.75);R.word('Ring ring!',.4,1.25,'#e03131',1.1);await S.cl.shiver(.8);await S.k.swap('pa-leocheer',.25,{h:1.4});await cheer(R,[S.k,S.cl],.2,1.4);}
};
page('e25',3,{old:mkq(E25c),neu:mkq(E25c),tm:{"i have a face": 0, "but no eyes": 1.23, "i have hands": 2.08, "but no fingers": 3.71, "what am i": 4.75, "a clock": 6.25}});
const E25d={
 'i like cats and':async(R,S)=>{await R.bg('livingroom');R.label('And or but?','#f08a24');S.G=gfx(R);
  S.k=await enter(R,'pa-miawave',-1.7,1.45,{sec:.6});S.ct=await enter(R,'pa-cat',-.4,.55,{from:2.9,sec:.6});S.dg=await enter(R,'pa-dog',.4,.6,{from:2.9,sec:.6});
  S.s1=await sentence(R,S.G,['I','like','cats','and','dogs.'],.0,1.95,{h:.3,cols:[0,0,0,'#2b8a3e'].map(c=>c||'#4c6ef5'),t:.08});},
 'both go together':async(R,S)=>{await bpulse(R,S.s1[3],.7);hearts(R,0,1.1,8);await all([S.ct.jump(.3),S.dg.jump(.3)]);},
 'i like cats but':async(R,S)=>{S.dg.hide(.3);S.sp=mk(R,'spider',{x:1.2,y:2.6,h:.4,face:1});S.sp.show(.1);await S.sp.go(1.2,1.0,.8,{lin:true});S.s2=await sentence(R,S.G,['I','like','cats,','but','not','spiders.'],.0,1.45,{h:.28,cols:[0,0,0,BUT].map(c=>c||'#4c6ef5'),t:.08});await S.k.shiver(.5);},
 'those are different':async(R,S)=>{await bpulse(R,S.s2[3],.7);R.word('different = but',.1,.95,BUT,1.1);await S.sp.go(1.2,2.7,.8,{lin:true});}
};
page('e25',4,{old:mkq(E25d),neu:mkq(E25d),tm:{"i like cats and": 0, "both go together": 1.9, "i like cats but": 4.84, "those are different": 8.1}});
const E25e={
 'the bear is big':async(R,S)=>{await R.bg('forest1');R.label('What comes next?','#f08a24');S.G=gfx(R);
  S.br=await enter(R,'bear',-1.0,1.1,{from:-2.9,sec:.8});R.word('Roar!',-1.0,1.4,'#a0522d',.9);S.s1=await sentence(R,S.G,['The','bear','is','big,'],-.3,1.95,{h:.34,t:.1});S.but=blk(S.G,'but',.0,1.45,BUT,.4);await tin(R,S.but,.3);},
 'the mouse is small':async(R,S)=>{S.ms=mk(R,'mouse',{x:2.9,y:.2,h:.3,face:-1});S.ms.show(.1);await S.ms.go(.8,.2,.8,{lin:true,hops:6});R.word('Squeak!',.8,.7,'#868e96',.8);S.s2=await sentence(R,S.G,['the','mouse','is','small!'],.5,1.0,{h:.3,t:.1});},
 'when you hear but':async(R,S)=>{await bpulse(R,S.but,.8);R.word('something different!',.1,2.35-.15,BUT,1);await all([S.br.jump(.3),S.ms.jump(.3)]);}
};
page('e25',5,{old:mkq(E25e),neu:mkq(E25e),tm:{"the bear is big": 0, "the mouse is small": 1.5, "when you hear but": 2.68}});
}
P.G1STAGED&&P.G1STAGED.add('e25');
/* ---------- e26 ---------- */
{
const W0='#4c6ef5';
const E26a={
 'the girl is walking':async(R,S)=>{await R.bg('park');R.label('Order makes sense','#f08a24');S.G=gfx(R);
  S.g=mk(R,'pa-miawave',{x:-2.9,y:.2,h:1.35,face:1});S.d=mk(R,'pa-dog',{x:-2.2,y:.2,h:.55,face:1});S.g.show(.1);S.d.show(.1);S.g.walk(-.4,.2,2.4);S.d.go(.4,.2,2.4,{lin:true,hops:8});
  S.s=await sentence(R,S.G,['The','girl','is','walking','the','dog.'],0,1.95,{h:.34,t:.14});},
 'these words are':async(R,S)=>{await wave(R,S.s);R.word('It makes sense!',.0,1.4,'#2b8a3e',1.2);await all([S.g.jump(.3),S.d.jump(.3)]);}
};
page('e26',1,{old:mkq(E26a),neu:mkq(E26a),tm:{"the girl is walking": 0, "these words are": 2.12}});
const E26b={
 'now swap two':async(R,S)=>{await R.bg('park');R.label('Order changes meaning','#f08a24');S.G=gfx(R);
  S.g=mk(R,'pa-miawave',{x:-.6,y:.2,h:1.35,face:1});S.d=mk(R,'pa-dog',{x:.4,y:.2,h:.55,face:1});S.g.show(.3);S.d.show(.3);S.s=await sentence(R,S.G,['The','girl','is','walking','the','dog.'],0,1.95,{h:.34,instant:true});S.s.forEach(b=>b.s=1);
  S.s[1].col='#c2255c';S.s[5].col='#e8590c';await all([bpulse(R,S.s[1],.5),bpulse(R,S.s[5],.5)]);},
 'the dog is walking':async(R,S)=>{S.s[1].text='dog';S.s[5].text='girl.';const o=[S.s[0],S.s[5],S.s[2],S.s[3],S.s[4],S.s[1]];o[1].text='dog';o[5].text='girl.';S.s[5].col='#e8590c';S.s[1].col='#c2255c';
  await reflow(R,[S.s[0],S.s[5],S.s[2],S.s[3],S.s[4],S.s[1]],0,1.95,1.0);
  await all([S.d.go(-1.0,.2,.8,{hops:4}),S.g.go(.4,.2,.8,{hops:2})]);S.d.grow(1.6,1.6,.5);R.word('Woof?!',-1.0,1.4,'#a0522d',1);},
 'that is silly':async(R,S)=>{R.word('Silly!',.4,1.45,'#e03131',1.3);await all([S.g.shiver(.6),S.d.go(-.4,.2,.8,{hops:4})]);S.g.go(.9,.2,.8,{hops:4});},
 'the order changes':async(R,S)=>{R.word('Order changes meaning!',.0,1.0,'#f08a24',1.2);await S.d.grow(1,1,.4);}
};
page('e26',2,{old:mkq(E26b),neu:mkq(E26b),tm:{"now swap two": 0, "the dog is walking": 1.72, "that is silly": 4.22, "the order changes": 5.88}});
const E26c={
 'ball the kicks':async(R,S)=>{await R.bg('park');R.label('Mixed up words','#f08a24');S.G=gfx(R);
  S.s=await sentence(R,S.G,['ball','the','kicks','boy.'],0,1.95,{h:.4,col:'#868e96',t:.12});S.s.forEach((b,i)=>{b.rot=(i%2?.12:-.12);});S.k=await enter(R,'pa-timwow',-1.6,1.45,{sec:.7});},
 'oh no':async(R,S)=>{for(const b of S.s)bshake(R,b,.6);R.word('Mixed up!',0,1.4,'#e03131',1.2);await S.k.shiver(.5);},
 'put the words':async(R,S)=>{S.s.forEach(b=>{b.rot=0;b.col=W0;});S.s[1].text='The';S.s[3].text='boy';S.s[0].text='ball.';const o=[S.s[1],S.s[3],S.s[2],S.s[1]];
  S.the2=blk(S.G,'the',0,2.6,W0,.4);S.the2.s=1;await reflow(R,[S.s[1],S.s[3],S.s[2],S.the2,S.s[0]],0,1.95,1.0);},
 'the boy kicks':async(R,S)=>{S.bl=await drop(R,'ball',-.6,.2,.4);await S.k.swap('pa-timcheer',.25,{h:1.45});await fly(R,S.bl,1.4,.2,.9,{arc:1.1,spin:Math.PI*4});R.word('Kick!',.4,1.3,'#e8590c',1);await wave(R,[S.s[1],S.s[3],S.s[2],S.the2,S.s[0]]);}
};
page('e26',3,{old:mkq(E26c),neu:mkq(E26c),tm:{"ball the kicks": 0, "oh no": 1.61, "put the words": 4.19, "the boy kicks": 6.39}});
const E26d={
 'the cat chases':async(R,S)=>{await R.bg('livingroom');R.label('Silly swaps','#f08a24');S.G=gfx(R);
  S.ms=mk(R,'mouse',{x:-.3,y:.2,h:.32,face:1});S.ct=mk(R,'pa-cat',{x:-1.4,y:.2,h:.55,face:1});S.ms.show(.2);S.ct.show(.2);S.ms.go(1.3,.2,1.6,{lin:true,hops:8});S.ct.go(.6,.2,1.6,{lin:true,hops:6});
  S.s=await sentence(R,S.G,['The','cat','chases','the','mouse.'],0,1.95,{h:.36,t:.12});},
 'swap them':async(R,S)=>{S.s[1].col='#e8590c';S.s[4].col='#868e96';await all([bpulse(R,S.s[1],.5),bpulse(R,S.s[4],.5)]);S.s[1].text='cat.';S.s[4].text='mouse';await reflow(R,[S.s[0],S.s[4],S.s[2],S.s[3],S.s[1]],0,1.95,1.0);},
 'the mouse chases':async(R,S)=>{S.ms.faceTo(-1);S.ct.faceTo(-1);S.ct.go(-1.6,.2,1.2,{lin:true,hops:6});await S.ms.go(-.6,.2,1.2,{lin:true,hops:8});R.word('Eek!',-1.6,1.1,'#e8590c',1);},
 'ha ha':async(R,S)=>{R.word('Ha ha!',.3,1.4,'#f08a24',1.4);await all([S.ms.jump(.3),S.ct.shiver(.6)]);}
};
page('e26',4,{old:mkq(E26d),neu:mkq(E26d),tm:{"the cat chases": 0, "swap them": 1.9, "the mouse chases": 3.42, "ha ha": 5.81}});
const E26e={
 'a sentence often':async(R,S)=>{await R.bg('savanna'.replace('savanna','sunhill1'));R.label('Who comes first','#f08a24');S.G=gfx(R);
  S.w1=blk(S.G,'1. who',-.8,2.05,'#1c7ed6',.36);S.w2=blk(S.G,'2. what they do',.8,2.05,'#e8590c',.36);await tin(R,S.w1,.3);},
 'then it tells':async(R,S)=>{await tin(R,S.w2,.3);},
 'the lion roars':async(R,S)=>{S.ln=await enter(R,'lion',-1.0,.9,{from:-2.9,sec:.7});R.word('ROAR!',-1.0,1.3,'#e8590c',1.2);await S.ln.shiver(.5);S.s1=await sentence(R,S.G,['The','lion','roars.'],-.4,1.45,{h:.32,cols:['#1c7ed6','#1c7ed6','#e8590c'],t:.1});},
 'the monkey laughs':async(R,S)=>{S.mk=await enter(R,'monkey',1.0,.8,{from:2.9,sec:.7});R.word('Ha ha!',1.0,1.2,'#a0522d',1);await S.mk.jump(.4);S.s2=await sentence(R,S.G,['The','monkey','laughs.'],.3,.95,{h:.32,cols:['#1c7ed6','#1c7ed6','#e8590c'],t:.1});await cheer(R,[S.ln,S.mk],0,1.6);}
};
page('e26',5,{old:mkq(E26e),neu:mkq(E26e),tm:{"a sentence often": 0, "then it tells": 2.42, "the lion roars": 4.73, "the monkey laughs": 6.73}});
}
P.G1STAGED&&P.G1STAGED.add('e26');
/* ---------- e27 ---------- */
{
const TOP='#0c8599';
const E27a={
 'these sentences':async(R,S)=>{await R.bg('kitchen-day'.replace('kitchen-day','hall'));R.label('Same topic','#f08a24');S.G=gfx(R);
  S.tp=blk(S.G,'topic: the dentist',.1,2.05,TOP,.34);await tin(R,S.tp,.3);S.th=await popIn(R,'pa-tooth',1.3,.2,.6);},
 'i sat in':async(R,S)=>{S.s1=await sentence(R,S.G,['I','sat','in','a','big','chair.'],-.2,1.6,{h:.26,col:TOP,t:.07});S.ch=await drop(R,'chair',-1.3,.2,.7);},
 'the dentist cleaned':async(R,S)=>{S.s2=await sentence(R,S.G,['The','dentist','cleaned','my','teeth.'],-.2,1.2,{h:.26,col:TOP,t:.07});R.fx('sparkle',1.3,.6,20,{w:.5,t:1});await S.th.jump(.3);},
 'i got a new':async(R,S)=>{S.s3=await sentence(R,S.G,['I','got','a','new','toothbrush.'],-.2,.8,{h:.26,col:TOP,t:.07});S.tb=await drop(R,'pa-toothbrush',.4,.2,.55,{spin:Math.PI});await bpulse(R,S.tp,.6);hearts(R,1.3,1.0,8);}
};
page('e27',1,{old:mkq(E27a),neu:mkq(E27a),tm:{"these sentences": 0, "i sat in": 3.03, "the dentist cleaned": 5.22, "i got a new": 7.83}});
const E27b={
 'the dentist checked':async(R,S)=>{await R.bg('hall');R.label('Does not belong','#f08a24');S.G=gfx(R);
  S.th=await popIn(R,'pa-tooth',1.3,.2,.6);S.s1=await sentence(R,S.G,['The','dentist','checked','my','teeth.'],-.2,1.95,{h:.3,col:TOP,t:.08});},
 'penguins can swim':async(R,S)=>{S.pg=await enter(R,'penguin',-1.2,.7,{from:-2.9,sec:.7});S.s2=await sentence(R,S.G,['Penguins','can','swim.'],-.2,1.45,{h:.3,col:'#868e96',t:.08});},
 'penguins are not':async(R,S)=>{for(const b of S.s2)bshake(R,b,.5);R.word('Not about the dentist!',-.1,1.0,'#e03131',1.1);await S.pg.shiver(.5);},
 'so that sentence':async(R,S)=>{for(const b of S.s2)bcross(R,b,.3);await R.wait(.4);await all(S.s2.map(b=>bfly(R,b,b.x-3,b.y-.3,.9,.3)));S.pg.go(-2.9,.2,.9,{hops:4});await bpulse(R,S.s1[1],.6);}
};
page('e27',2,{old:mkq(E27b),neu:mkq(E27b),tm:{"the dentist checked": 0, "penguins can swim": 2.21, "penguins are not": 4.29, "so that sentence": 7.42}});
const E27c={
 'my cat is soft':async(R,S)=>{await R.bg('livingroom');R.label('Find the odd one','#f08a24');S.G=gfx(R);
  S.ct=await popIn(R,'pa-cat',-1.4,.2,.6);S.s=[];S.s[0]=await sentence(R,S.G,['My','cat','is','soft.'],.3,2.1,{h:.24,col:TOP,t:.06});},
 'my cat drinks':async(R,S)=>{S.s[1]=await sentence(R,S.G,['My','cat','drinks','milk.'],.3,1.72,{h:.24,col:TOP,t:.06});S.mk=await drop(R,'milk',-.7,.2,.4);},
 'the bus is yellow my':async(R,S)=>{S.s[2]=await sentence(R,S.G,['The','bus','is','yellow.'],.3,1.34,{h:.24,col:TOP,t:.06});S.bs=mk(R,'pa-bus',{x:2.9,y:.2,h:.55,face:-1});S.bs.show(.1);S.bs.go(.9,.2,.8,{lin:true});},
 'my cat purrs':async(R,S)=>{S.s[3]=await sentence(R,S.G,['My','cat','purrs.'],.3,.96,{h:.24,col:TOP,t:.06});R.word('Purr...',-1.4,1.0,'#e8590c',.8);},
 'which one is not':async(R,S)=>{R.word('Which one?',.3,.55,'#e8590c',1);for(const r of S.s)for(const b of r)bpulse(R,b,.4);},
 'cat the bus':async(R,S)=>{for(const b of S.s[2]){b.col='#e03131';bshake(R,b,.5);}await R.wait(.5);for(const b of S.s[2])bcross(R,b,.3);await R.wait(.3);S.bs.go(-2.9,.2,1.2,{lin:true});R.word('Bye bus!',.3,1.34,'#e03131',.9);await S.ct.jump(.3);}
};
page('e27',3,{old:mkq(E27c),neu:mkq(E27c),tm:{"my cat is soft": 0, "my cat drinks": 1.58, "the bus is yellow my": 3.76, "my cat purrs": 5.86, "which one is not": 7.8, "cat the bus": 10.02}});
const E27d={
 'let us sort':async(R,S)=>{await R.bg('schoolyard1');R.label('Sort by topic','#f08a24');const G=S.G=gfx(R);
  S.cr=await crates(R,G,['beach','snow'],{xs:[-.9,1.0],cols:['#f08c00','#1c7ed6']});},
 'sand is warm':async(R,S)=>{S.a=blk(S.G,'Sand is warm.',-.5,2.0,'#f08c00',.28);await tin(R,S.a,.25);await bfly(R,S.a,-.9,1.55,.6,.3);S.cr[0].c.shiver(.3);},
 'snow is cold':async(R,S)=>{S.b=blk(S.G,'Snow is cold.',.5,2.0,'#1c7ed6',.28);await tin(R,S.b,.25);await bfly(R,S.b,1.0,1.55,.6,.3);S.cr[1].c.shiver(.3);},
 'waves splash':async(R,S)=>{S.c=blk(S.G,'Waves splash.',-.5,2.0,'#f08c00',.28);await tin(R,S.c,.25);await bfly(R,S.c,-.9,1.85,.6,.3);S.cr[0].c.shiver(.3);},
 'snowmen melt':async(R,S)=>{S.d=blk(S.G,'Snowmen melt.',.5,2.0,'#1c7ed6',.28);await tin(R,S.d,.25);await bfly(R,S.d,1.0,1.85,.6,.3);S.cr[1].c.shiver(.3);S.sm=await popIn(R,'snowman',1.0,.55,.5);},
 'two sentences':async(R,S)=>{await cheer(R,[S.cr[0].c,S.cr[1].c,S.sm],0,1.4);}
};
page('e27',4,{old:mkq(E27d),neu:mkq(E27d),tm:{"let us sort": 0, "sand is warm": 1.19, "snow is cold": 3.03, "waves splash": 4.9, "snowmen melt": 6.8, "two sentences": 8.58}});
const E27e={
 'when you write':async(R,S)=>{await R.bg('playroom1');R.label('Stay on topic','#f08a24');S.G=gfx(R);S.k=await enter(R,'pa-norawave',-1.8,1.45,{sec:.7});S.pc=await popIn(R,'pencil',-1.0,.3,.5);},
 'pick one idea':async(R,S)=>{S.dg=await enter(R,'dog',.6,.8,{from:2.9,sec:.7});S.tp=blk(S.G,'topic: my dog',.3,2.05,TOP,.34);await tin(R,S.tp,.3);},
 'then tell all':async(R,S)=>{await S.dg.wag(.6,.1,4);},
 'my dog is fluffy':async(R,S)=>{S.s1=await sentence(R,S.G,['My','dog','is','fluffy.'],.3,1.6,{h:.3,col:TOP,t:.08});await S.dg.grow(1.1,1.1,.4);},
 'my dog loves':async(R,S)=>{S.s2=await sentence(R,S.G,['My','dog','loves','to','run.'],.3,1.2,{h:.3,col:TOP,t:.08});S.dg.go(1.4,.2,.8,{hops:4});await cheer(R,[S.k],-.5,1.7);}
};
page('e27',5,{old:mkq(E27e),neu:mkq(E27e),tm:{"when you write": 0, "pick one idea": 2.5, "then tell all": 5.5, "my dog is fluffy": 7.78, "my dog loves": 9.96}});
}
P.G1STAGED&&P.G1STAGED.add('e27');
/* ---------- e28 ---------- */
{
const OC=['#2b8a3e','#1c7ed6','#7048e8','#e8590c'];
const step=async(R,S,word,i,x,y)=>{const b=blk(S.G,word,x,y,OC[i],.32);await tin(R,b,.25);R.fx('sparkle',x,y,8,{w:.3,t:.6});return b;};
const E28a={
 'a seed is planted':async(R,S)=>{await R.bg('farm23');R.label('First, next, last','#f08a24');S.G=gfx(R);
  S.b1=await step(R,S,'First',0,-1.1,2.0);S.sd=mk(R,'acorn',{x:-1.1,y:2.5,h:.3,face:1});S.sd.show(.1);await fly(R,S.sd,-1.1,.2,.6,{arc:0});R.fx('dust',-1.1,.25,8,{w:.4,t:.6});},
 'next a sprout':async(R,S)=>{S.b2=await step(R,S,'Next',1,.2,2.0);S.sp=mk(R,'seedling',{x:.2,y:.2,h:.1,face:1});S.sp.show(.2);await S.sp.go(.2,.2,.1);S.sp.st.s=1;await R.T(.8,e=>{const a=S.sp;a.st.sy=.3+.7*e;a.ap();});},
 'last a flower':async(R,S)=>{S.b3=await step(R,S,'Last',3,1.4,2.0);S.fl=mk(R,'flower',{x:1.4,y:.2,h:.8,face:1});S.fl.show(.5,'pop');R.fx('sparkle',1.4,.8,20,{w:.6,t:1});
  S.ar=S.G.add('F',g=>{S.G.arrow(g,-.75,1.0,-.15,1.0,'#868e96',6);S.G.arrow(g,.55,1.0,1.05,1.0,'#868e96',6);});S.ar.a=0;await S.G.fade(S.ar,1,.4);},
 'the order makes':async(R,S)=>{await wave(R,[S.b1,S.b2,S.b3]);await all([S.sd.jump(.2),S.sp.jump(.2),S.fl.jump(.3)]);hearts(R,1.4,1.2,8);}
};
page('e28',1,{old:mkq(E28a),neu:mkq(E28a),tm:{"a seed is planted": 0, "next a sprout": 2.05, "last a flower": 4.38, "the order makes": 6.78}});
const E28b={
 'first wake up':async(R,S)=>{await R.bg('livingroom');R.label('Order the morning','#f08a24');S.G=gfx(R);
  S.k=mk(R,'pa-leowave',{x:-1.3,y:.2,h:1.4,face:1,idle:'sleep'});S.k.show(.3);S.al=await popIn(R,'alarm_clock',-.4,.2,.45);R.word('Ring!',-.4,.85,'#e03131',.8);await S.al.shiver(.5);
  S.b1=await step(R,S,'1 wake up',0,-1.0,2.05);await S.k.jump(.4);},
 'then get dressed':async(R,S)=>{S.sh=await drop(R,'shirt',.4,.2,.45);S.b2=await step(R,S,'2 get dressed',1,.4,1.6);await fly(R,S.sh,-1.3,.8,.6,{arc:.4});S.sh.hide(.2);await S.k.swap('pa-leocheer',.2,{h:1.4});},
 'last eat breakfast':async(R,S)=>{S.bw=await drop(R,'bowl',1.2,.2,.4);S.b3=await step(R,S,'3 eat breakfast',3,.9,1.15);await S.k.swap('pa-leoeat',.25,{h:1.3});R.word('Yum!',-1.2,1.6,'#e8590c',1);},
 'now the morning':async(R,S)=>{await wave(R,[S.b1,S.b2,S.b3]);await S.k.jump(.3);}
};
page('e28',2,{old:mkq(E28b),neu:mkq(E28b),tm:{"first wake up": 0, "then get dressed": 1.37, "last eat breakfast": 3.26, "now the morning": 5.58}});
const E28c={
 'first get the bread':async(R,S)=>{await R.bg('kitchen22');R.label('Making a sandwich','#f08a24');S.G=gfx(R);
  S.b1=await step(R,S,'First',0,-1.4,2.05);S.br=await drop(R,'pa-bread',.2,.2,.32,{spin:0});},
 'next add the cheese':async(R,S)=>{S.b2=await step(R,S,'Next',1,-.5,2.05);S.ch=mk(R,'cheese',{x:.2,y:2.5,h:.25,face:1});S.ch.show(.1);await fly(R,S.ch,.2,.38,.6,{arc:0});},
 'then add the lettuce':async(R,S)=>{S.b3=await step(R,S,'Then',2,.4,2.05);S.le=mk(R,'pa-lettuce',{x:.2,y:2.5,h:.22,face:1});S.le.show(.1);await fly(R,S.le,.2,.55,.6,{arc:0});},
 'last put the bread':async(R,S)=>{S.b4=await step(R,S,'Last',3,1.3,2.05);S.br2=mk(R,'pa-bread',{x:.2,y:2.5,h:.32,face:1});S.br2.show(.1);await fly(R,S.br2,.2,.68,.6,{arc:0});R.fx('crumb',.2,.8,10,{w:.5,t:.7});R.word('Ta-da!',.2,1.4,'#e8590c',1.2);await wave(R,[S.b1,S.b2,S.b3,S.b4]);}
};
page('e28',3,{old:mkq(E28c),neu:mkq(E28c),tm:{"first get the bread": 0, "next add the cheese": 1.56, "then add the lettuce": 3.72, "last put the bread": 5.85}});
const E28d={
 'last i eat':async(R,S)=>{await R.bg('kitchen-day');R.label('Mixed up order','#f08a24');S.G=gfx(R);
  S.k=await enter(R,'pa-milospoon',-1.6,1.45,{sec:.6});S.a=blk(S.G,'Last, I eat the cake.',.2,2.0,OC[3],.3);await tin(R,S.a,.3);},
 'first i bake':async(R,S)=>{S.b=blk(S.G,'First, I bake the cake.',.2,1.55,OC[0],.3);await tin(R,S.b,.3);},
 'oops':async(R,S)=>{R.word('Oops!',.2,1.1,'#e03131',1.3);await all([bshake(R,S.a,.6),bshake(R,S.b,.6),S.k.shiver(.6)]);},
 'bake first':async(R,S)=>{await all([bfly(R,S.a,.2,1.55,.8,.4),bfly(R,S.b,.2,2.0,.8,-.4)]);S.ck=await drop(R,'pa-cake',.8,.2,.55);await S.k.swap('pa-milotummy',.25,{h:1.45});await cheer(R,[S.k,S.ck],.2,1.2);}
};
page('e28',4,{old:mkq(E28d),neu:mkq(E28d),tm:{"last i eat": 0, "first i bake": 1.74, "oops": 4.04, "bake first": 6.69}});
const E28e={
 'first next then':async(R,S)=>{await R.bg('playroom1');R.label('Order words','#f08a24');S.G=gfx(R);
  S.w=[];for(const[i,w]of['First','Next','Then','Last'].entries()){const b=await step(R,S,w,i,-1.2+i*.85,1.95);S.w.push(b);await R.wait(.15);}},
 'they help the reader':async(R,S)=>{S.k=await enter(R,'pa-miawave',-1.7,1.4,{from:-2.9,sec:.6});S.ar=S.G.add('F',g=>{S.G.arrow(g,-1.4,1.45,1.3,1.45,'#868e96',8);});S.ar.a=0;await S.G.fade(S.ar,1,.4);},
 'step by step':async(R,S)=>{for(const b of S.w){await R.T(.3,e=>{b.y=1.95+Math.sin(e*Math.PI)*.25;b.hl=Math.sin(e*Math.PI);});S.k.go(b.x,.2,.3,{hops:1,arc:.3});}await cheer(R,[S.k],.3,1.4);}
};
page('e28',5,{old:mkq(E28e),neu:mkq(E28e),tm:{"first next then": 0, "they help the reader": 3.28, "step by step": 6.17}});
}
P.G1STAGED&&P.G1STAGED.add('e28');
P.DIR.mount();
})();
