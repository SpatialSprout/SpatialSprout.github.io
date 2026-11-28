/* Grade 1 English: staged theory pages (group s). Generated from snippets. ASCII only. */
(function(){
"use strict";
const P=window.PM;if(!P||!P.DIR||!P.G1H||!P.G1X)return;
const page=P.DIR.page;
const {all,pop,liteq,mkq,hearts,gfx,tin,tout,glow,moveT,COL,colOf,wordTiles,fly,tileFly,squash,wave,VC,vcol,vTiles,rtag,ntag,NC,tg,nounTag,ptag,pltag,GOLD,PG,RCOL,rpair}=P.G1H;
const {blk,rowX,sentence,reflow,bfly,bshake,bpulse,bout,bcross,recolor,mk,enter,drop,popIn,cheer,crates,intoCrate,markB,MARKC,speak}=P.G1X;
const rnd=(a,b)=>a+Math.random()*(b-a);
/* ---------- e02 ---------- */
{
const MH=1.45;
const endT=async(R,S,w,x,y)=>{const ts=wordTiles(S.G,w,x,y,.36);for(const t of ts)await tin(R,t,.1);const l=ts[ts.length-1];await all([glow(R,l,.8),R.T(.8,e=>{l.y=y+Math.sin(e*Math.PI)*.3;})]);return ts;};
const E2s={
 'mia loves':async(R,S)=>{await R.bg('park');R.label("Mia's Market Trip",'#e8505b');S.G=gfx(R);S.m=await enter(R,'pa-miawave',-1.5,MH,{sec:1.0});hearts(R,-1.5,1.8,6);await S.m.jump(.3);},
 'hops on her red bike':async(R,S)=>{await S.m.swap('pa-miabike',.25,{h:1.3});R.word('Ring ring!',-1.0,1.6,'#e03131',.9);await S.m.go(2.8,.2,1.6,{lin:true,wob:.03});},
 'sees a big red bus':async(R,S)=>{await R.bg('market2');R.label("Mia's Market Trip",'#e8505b');S.G=gfx(R);S.m=await enter(R,'pa-miapoint',-1.8,MH,{sec:.8});
  S.bs=mk(R,'pa-bus',{x:3,y:.2,h:.85,face:-1});S.bs.show(.1);R.word('Beep beep!',1.2,1.5,'#c92a2a',.9);await S.bs.go(.6,.2,1.2,{lin:true});R.fx('dust',1.0,.3,10,{w:.8,t:.7});},
 'bus ends with s':async(R,S)=>{S.w=await endT(R,S,'bus',.6,1.6);R.word('s!',1.3,1.95,COL.s,1);},
 'a tall clock':async(R,S)=>{for(const t of S.w)tout(R,t,.3);S.bs.go(-3.2,.2,1.2,{lin:true});S.cl=await popIn(R,'pa-clock',.6,.2,1.1);R.word('Tick tock!',.6,1.5,'#7048e8',.9);await S.cl.shiver(.5);},
 'clock ends with k':async(R,S)=>{S.w=await endT(R,S,'clock',.6,1.75);R.word('k!',1.6,2.05,'#7048e8',1);},
 'a fresh pear':async(R,S)=>{for(const t of S.w)tout(R,t,.3);S.cl.hide(.3);S.pr=await drop(R,'pa-pear',.6,.2,.55);await S.m.swap('pa-miapear',.25,{h:MH});R.word('Yum!',-1.6,1.8,'#2b8a3e',.9);},
 'pear ends with r':async(R,S)=>{S.w=await endT(R,S,'pear',.6,1.4);R.word('r!',1.5,1.8,'#e8505b',1);},
 'knows all':async(R,S)=>{await S.m.swap('pa-miacheer',.25,{h:MH});await cheer(R,[S.m,S.pr],-.4,1.8);await wave(R,S.w);}
};
page('e02',0,{old:mkq(E2s),neu:mkq(E2s),tm:{"mia loves": 0, "hops on her red bike": 3.23, "sees a big red bus": 8.47, "bus ends with s": 10.04, "a tall clock": 13.85, "clock ends with k": 14.81, "a fresh pear": 18.15, "pear ends with r": 19.19, "knows all": 21.99}});
}
P.G1STAGED&&P.G1STAGED.add('e02');
/* ---------- e10 ---------- */
{
const E10s={
 'everyone helps':async(R,S)=>{await R.bg('livingroom');R.label('Chores at Our House','#16a36f');S.G=gfx(R);
  S.mom=await enter(R,'pa-momwave',-1.6,1.4,{sec:.8,y:-.05});S.dad=await enter(R,'pa-dadwave',1.4,1.45,{from:2.9,sec:.8});hearts(R,0,1.7,8);},
 'mom washes':async(R,S)=>{await R.bg('kitchen-day');R.label('Chores at Our House','#16a36f');S.G=gfx(R);S.mom=await enter(R,'pa-momdish',-1.4,1.3,{sec:.6,y:-.05});
  S.pl=[];for(const[i,x]of[-.4,.1,.6].entries()){const p=await drop(R,'pa-plate',x,.2+i*.0,.25,{spin:0});S.pl.push(p);}for(let i=0;i<3;i++){R.fx('sparkle'==='x'?'':'sparkle',.1,.5,8,{w:.6,t:.6});await S.pl[i].shiver(.3);}S.t=blk(S.G,'dishes',.1,1.4,'#16a36f',.34);await tin(R,S.t,.3);},
 'dad takes out':async(R,S)=>{await R.bg('street');R.label('Chores at Our House','#16a36f');S.G=gfx(R);S.tr=await popIn(R,'trash',.8,.2,.75);S.dad=await enter(R,'pa-dadwave',-1.2,1.45,{sec:.8});
  await S.dad.go(.2,.2,.8,{hops:3});await S.tr.shiver(.4);R.word('Clunk!',.8,1.3,'#495057',.9);S.t=blk(S.G,'garbage',.8,1.7,'#16a36f',.34);await tin(R,S.t,.3);},
 'feeds our dog':async(R,S)=>{await R.bg('kitchen-day');R.label('Chores at Our House','#16a36f');S.G=gfx(R);S.bro=await enter(R,'pa-timwave',-1.4,1.45,{sec:.7});S.bw=await drop(R,'bowl',.4,.2,.35);
  S.dg=await enter(R,'pa-dog',1.2,.6,{from:2.9,sec:.7,hops:5});await S.dg.go(.7,.2,.4,{hops:2});await S.dg.chew(4,1.0);R.word('Crunch!',.7,1.1,'#a0522d',.8);S.t=blk(S.G,'dog',.6,1.6,'#16a36f',.36);await tin(R,S.t,.3);},
 'make my bed':async(R,S)=>{await R.bg('playroom1');R.label('Chores at Our House','#16a36f');S.G=gfx(R);S.k=await enter(R,'pa-miawave',-1.5,1.45,{sec:.7});S.bd=await drop(R,'pa-bed',.2,.2,.65);
  S.pi=mk(R,'pa-pillow',{x:-.4,y:1.0,h:.3,face:1});S.pi.show(.3,'pop');await fly(R,S.pi,.0,.6,.6,{arc:.4});R.fx('sparkle',.2,.6,14,{w:.6,t:.8});
  S.ty=[];for(const[k,x]of[['teddy',1.1],['ball',1.5],['block',.9]]){const t=mk(R,k,{x,y:.2,h:.35,face:1});t.show(.3,'pop');S.ty.push(t);}await R.wait(.4);S.sh=await popIn(R,'pa-shelf',1.25,1.0,.4);for(const[i,t]of S.ty.entries()){await fly(R,t,1.05+i*.18,1.12,.4,{arc:.4});}},
 'when the chores':async(R,S)=>{R.word('All done!',.2,1.8,'#16a36f',1.2);await cheer(R,[S.k],-.5,1.7);},
 'go to the park':async(R,S)=>{await R.bg('park');R.label('Chores at Our House','#16a36f');S.G=gfx(R);const fam=[];for(const[k,x,h]of[['pa-momcheer',-1.4,1.4],['pa-dadwave',-.6,1.45],['pa-timwave',.3,1.3],['pa-miacheer',1.0,1.3]]){fam.push(await enter(R,k,x,h,{sec:.5}));}
  S.dg=await enter(R,'pa-dog',1.6,.55,{from:2.9,sec:.5,hops:4});await cheer(R,fam.concat([S.dg]),0,1.8);}
};
page('e10',0,{old:mkq(E10s),neu:mkq(E10s),tm:{"everyone helps": 0, "mom washes": 2.06, "dad takes out": 4.47, "feeds our dog": 8.52, "make my bed": 10.36, "when the chores": 12.98, "go to the park": 15.55}});
}
P.G1STAGED&&P.G1STAGED.add('e10');
/* ---------- e11 ---------- */
{
const E11s={
 'my grandma makes':async(R,S)=>{await R.bg('kitchen22');R.label('Dumplings with Grandma','#16a36f');S.G=gfx(R);S.gm=await enter(R,'grandma',-1.5,1.35,{sec:.8});S.k=await enter(R,'pa-miawave',1.5,1.3,{from:2.9,sec:.8});hearts(R,0,1.6,8);},
 'rolls the dough':async(R,S)=>{S.dg=await drop(R,'pa-dough',0,.2,.45,{spin:0});for(let i=0;i<3;i++){await R.T(.4,e=>{S.dg.st.rz=Math.sin(e*Math.PI)*.15*(i%2?1:-1);S.dg.st.sx=1+.08*Math.sin(e*Math.PI);S.dg.ap();});}R.word('Roll, roll!',0,1.2,'#a0522d',.9);},
 'a spoon of potato':async(R,S)=>{S.sp=mk(R,'spoon',{x:1.0,y:1.0,h:.4,face:-1});S.sp.show(.3,'pop');await fly(R,S.sp,.1,.6,.6,{arc:.4});R.fx('crumb',0,.5,10,{w:.3,t:.6});S.ch=await drop(R,'cheese',.3,.45,.22);S.sp.hide(.2);},
 'pinch the edges':async(R,S)=>{for(let i=0;i<4;i++){R.word('pinch!',-.2+i*.15,1.0+i*.12,'#e8590c',.6);await S.dg.shiver(.25);}S.ch.hide(.2);await S.dg.swap('pa-dumplings',.4,{h:.4});},
 'boils them':async(R,S)=>{S.pt=await drop(R,'pot',.0,.2,.7);S.dg.hide(.3);for(let i=0;i<5;i++){R.fx('dust',0,.85,6,{w:.4,t:1.2});await S.pt.shiver(.25);}R.word('Bubble bubble!',.0,1.5,'#1c7ed6',1);},
 'sour cream':async(R,S)=>{S.pt.hide(.3);S.pl=await drop(R,'pa-dumplings',.0,.2,.45);R.fx('sparkle',0,.5,14,{w:.6,t:.9});await S.k.swap('pa-miacheer',.25,{h:1.3});},
 'my favourite':async(R,S)=>{R.word('Yum!',0,1.4,'#e8590c',1.3);await cheer(R,[S.gm,S.k,S.pl],0,1.8);}
};
page('e11',0,{old:mkq(E11s),neu:mkq(E11s),tm:{"my grandma makes": 0, "rolls the dough": 2.95, "a spoon of potato": 5.43, "pinch the edges": 8.95, "boils them": 12.18, "sour cream": 15.66, "my favourite": 17.59}});
}
P.G1STAGED&&P.G1STAGED.add('e11');
/* ---------- e12 ---------- */
{
const E12s={
 'the wind said':async(R,S)=>{await R.bg('sunhill1');R.label('The Sun and the Wind','#16a36f');S.G=gfx(R);
  S.w=mk(R,'pa-windcloud',{x:-1.2,y:1.2,h:.7,face:1,idle:'sway'});S.w.show(.4,'pop');S.sn=mk(R,'pa-sunface',{x:1.2,y:1.2,h:.7,face:1});S.sn.show(.4,'pop');await S.w.grow(1.2,1.2,.5);R.word('I am stronger!',-1.0,2.0,'#495057',1);},
 'the sun asked':async(R,S)=>{await S.sn.jump(.3);S.b=mk(R,'pa-boycoat',{x:2.9,y:.2,h:1.1,face:-1});S.b.show(.1);await S.b.walk(.2,.2,1.4);S.q=blk(S.G,'?',1.2,.7+1.0,'#7048e8',.4);await tin(R,S.q,.3);},
 'blew and blew':async(R,S)=>{bout(R,S.q,.2);for(let i=0;i<5;i++){R.fx('dust',-.6+i*.2,1.0,8,{w:.6,t:.8});R.word('Whoosh!',-.5+i*.2,1.6-i*.1,'#868e96',.7);await S.w.go(-1.1+i*.05,1.2,.3,{wob:.08});}},
 'held his coat':async(R,S)=>{await S.b.shiver(1.0);R.word('Brrr!',.2,1.5,'#1c7ed6',1);},
 'the sun shone':async(R,S)=>{S.w.go(-2.9,1.4,1.0,{});await S.sn.go(.4,1.5,.9,{arc:.2});await S.sn.grow(1.35,1.35,.6);R.fx('sparkle',.4,1.5,30,{w:1.8,t:1.4});},
 'got hot':async(R,S)=>{R.word('Phew!',.2,1.4,'#e8590c',1);await S.b.swap('pa-boynocoat',.4,{h:1.1});await S.b.jump(.3);},
 'gentle can be':async(R,S)=>{await cheer(R,[S.sn,S.b],.3,1.7);R.word('Gentle is strong!',.2,2.0,'#e8a900',1.2);}
};
page('e12',0,{old:mkq(E12s),neu:mkq(E12s),tm:{"the wind said": 0, "the sun asked": 2.72, "blew and blew": 7.68, "held his coat": 9.6, "the sun shone": 11.89, "got hot": 14.95, "gentle can be": 16.88}});
}
P.G1STAGED&&P.G1STAGED.add('e12');
/* ---------- e13 ---------- */
{
const E13s={
 'ben and ava':async(R,S)=>{await R.bg('park');R.label('Duck Pond Surprise','#16a36f');S.G=gfx(R);S.b=await enter(R,'pa-timwave',-1.6,1.4,{sec:.8});S.a=await enter(R,'pa-avawave',-.9,1.3,{sec:.8});},
 'threw some seeds':async(R,S)=>{for(let i=0;i<6;i++){R.fx('crumb',-.6+i*.25,.5+Math.sin(i)*.2,4,{w:.3,t:.6});await R.wait(.12);}},
 'splash':async(R,S)=>{S.dk=mk(R,'duck',{x:1.2,y:2.5,h:.65,face:-1});S.dk.show(.1);await fly(R,S.dk,1.0,.2,.5,{arc:0});R.fx('sparkle',1.0,.3,24,{w:1,t:.9});R.word('Splash!',1.0,1.4,'#1c7ed6',1.3);},
 'flapped its wings':async(R,S)=>{await S.dk.go(1.0,.4,.8,{flap:6,arc:.3});R.word('Flap flap!',1.0,1.4,'#e8a900',.9);},
 'wow look':async(R,S)=>{S.dl=mk(R,'pa-ducklings',{x:2.9,y:.2,h:.55,face:-1});S.dl.show(.1);await S.dl.go(.3,.2,1.0,{hops:5,wob:.05});await S.a.swap('pa-avacheer',.25,{h:1.3});R.word('Wow!',-.9,1.8,'#e03131',1.3);await S.a.jump(.4);},
 'ran right up':async(R,S)=>{S.one=mk(R,'chick',{x:.3,y:.2,h:.35,face:-1});S.one.show(.2);await S.one.go(-1.2,.2,.9,{hops:6});},
 'it likes me':async(R,S)=>{await S.b.swap('pa-timcheer',.25,{h:1.4});hearts(R,-1.3,1.0,12);R.word('It likes me!',-1.4,1.85,'#e03131',1.1);await all([S.b.jump(.4),S.one.jump(.3)]);}
};
page('e13',0,{old:mkq(E13s),neu:mkq(E13s),tm:{"ben and ava": 0, "threw some seeds": 3.4, "splash": 4.74, "flapped its wings": 6.76, "wow look": 8.14, "ran right up": 13.47, "it likes me": 15.14}});
}
P.G1STAGED&&P.G1STAGED.add('e13');
/* ---------- e14 ---------- */
{
const snow=(R,n)=>{for(let i=0;i<(n||6);i++){const f=mk(R,'snowflake',{x:-1.8+Math.random()*3.4,y:2.5,h:.2,face:1});f.show(.2);f.go(f.st.x+(Math.random()-.5)*.6,.2,2.2+Math.random(),{lin:true,wob:.3,waves:2}).then(()=>f.hide(.4));}};
const E14s={
 'i love winter':async(R,S)=>{await R.bg('nighthill1');R.label('Winter Fun','#16a36f');S.G=gfx(R);snow(R,10);S.k=await enter(R,'pa-norawave',-1.6,1.45,{sec:.8});hearts(R,-1.6,1.9,6);},
 'build a snow fort':async(R,S)=>{S.kf=await enter(R,'kid0',-.6,1.1,{from:-2.9,sec:.6});S.ft=await popIn(R,'pa-snowfort',.8,.2,.6);snow(R,6);R.word('Build!',.8,1.2,'#1c7ed6',1);},
 'go sledding':async(R,S)=>{S.sl=mk(R,'pa-sled',{x:-2.6,y:1.6,h:.4,face:1});S.sl.show(.2);await S.sl.go(1.6,.2,1.4,{lin:true});R.word('Wheee!',.4,1.4,'#e03131',1.2);snow(R,6);},
 'dad makes hot':async(R,S)=>{S.sl.hide(.3);S.dad=await enter(R,'pa-dadwave',1.6,1.45,{from:2.9,sec:.7});S.cc=await popIn(R,'pa-cocoa',.9,.2,.45);R.fx('dust',.9,.7,8,{w:.2,t:1.2});},
 'my dog pepper':async(R,S)=>{S.dg=mk(R,'pa-dog',{x:-2.9,y:.2,h:.55,face:1});S.dg.show(.1);const sb=mk(R,'pa-snowball',{x:-.6,y:1.0,h:.25,face:1});sb.show(.2);
  fly(R,sb,1.5,.2,1.0,{arc:1});await S.dg.go(1.2,.2,1.1,{lin:true,hops:6});R.word('Woof!',1.2,1.0,'#a0522d',.9);sb.hide(.3);},
 'winter is the best':async(R,S)=>{snow(R,10);await cheer(R,[S.k,S.kf,S.dad,S.dg],0,1.8);}
};
page('e14',0,{old:mkq(E14s),neu:mkq(E14s),tm:{"i love winter": 0, "build a snow fort": 3.49, "go sledding": 5.65, "dad makes hot": 9.98, "my dog pepper": 11.57, "winter is the best": 15.53}});
}
P.G1STAGED&&P.G1STAGED.add('e14');
/* ---------- e15 ---------- */
{
const E15s={
 'our class has':async(R,S)=>{await R.bg('classroom');R.label('The Book Club','#16a36f');S.G=gfx(R);S.tc=await enter(R,'pa-teacher',-1.6,1.4,{sec:.8});
  S.bk=[];for(const x of[-.2,.4,1.0]){S.bk.push(await drop(R,x>0.5?'book':'pa-bluebook',x,.2,.45));}},
 'every friday':async(R,S)=>{S.cal=await popIn(R,'pa-calendar',1.4,1.0,.55);S.d=blk(S.G,'Friday',.4,1.85,'#5c7cfa',.36);S.d.c1='#e8a900';await tin(R,S.d,.3);},
 'in october':async(R,S)=>{S.d.text='October';bpulse(R,S.d,.5);S.pk=await drop(R,'pa-pumpkin',-.5,.2,.5);},
 'friendly ghost':async(R,S)=>{S.gh=mk(R,'pa-ghost',{x:.4,y:.3,h:.75,face:1,idle:'sway'});S.gh.show(.6,'pop');await S.gh.go(.6,.6,.9,{arc:.3,wob:.1});R.word('Boo!',.6,1.5,'#7048e8',1);S.gh.go(.6,2.7,.8,{});},
 'in december':async(R,S)=>{S.pk.hide(.3);S.d.text='December';bpulse(R,S.d,.5);for(let i=0;i<8;i++){const f=mk(R,'snowflake',{x:-1.8+i*.45,y:2.5,h:.18,face:1});f.show(.2);f.go(f.st.x,.2,2.2,{lin:true,wob:.3,waves:2}).then(()=>f.hide(.4));}},
 'a polar bear':async(R,S)=>{S.pb=await enter(R,'polar_bear',.4,.75,{from:2.9,sec:.9});R.word('Brrr!',.4,1.1,'#1c7ed6',.9);},
 'valentines day':async(R,S)=>{S.pb.hide(.3);S.d.text="Valentine's Day";bpulse(R,S.d,.5);for(const x of[-.3,.3,.9]){const h=mk(R,'pa-heart',{x,y:2.6,h:.35,face:1});h.show(.1);fly(R,h,x,.3,.6,{arc:0,spin:Math.PI});await R.wait(.15);}hearts(R,.3,1.0,14);},
 'i love book club':async(R,S)=>{await cheer(R,[S.tc].concat(S.bk),0,1.6);}
};
page('e15',0,{old:mkq(E15s),neu:mkq(E15s),tm:{"our class has": 0, "every friday": 3.24, "in october": 4.31, "friendly ghost": 8.04, "in december": 9.12, "a polar bear": 11.63, "valentines day": 13.4, "i love book club": 16.84}});
}
P.G1STAGED&&P.G1STAGED.add('e15');
/* ---------- e16 ---------- */
{
const snow=(R,n)=>{for(let i=0;i<(n||6);i++){const f=mk(R,'snowflake',{x:-1.8+Math.random()*3.4,y:2.5,h:.2,face:1});f.show(.2);f.go(f.st.x+(Math.random()-.5)*.6,.2,2.2+Math.random(),{lin:true,wob:.3,waves:2}).then(()=>f.hide(.4));}};
const E16s={
 'i woke up':async(R,S)=>{await R.bg('livingroom');R.label('Snow Day!','#16a36f');S.G=gfx(R);S.k=mk(R,'pa-timwave',{x:-1.3,y:.2,h:1.4,face:1,idle:'sleep'});S.k.show(.4);S.al=await popIn(R,'alarm_clock',-.3,.2,.45);await S.al.shiver(.6);R.word('Ring!',-.3,.9,'#e03131',.9);await S.k.jump(.4);},
 'everything was white':async(R,S)=>{await R.bg('nighthill1');R.label('Snow Day!','#16a36f');S.G=gfx(R);snow(R,14);S.k=await enter(R,'pa-timwow',-1.5,1.4,{sec:.6});R.word('White!',.4,1.6,'#1c7ed6',1.2);snow(R,10);},
 'was there school':async(R,S)=>{S.q=markB(S.G,'?',.3,1.6,.55);await tin(R,S.q,.3);await R.T(1,e=>{S.q.rot=Math.sin(e*Math.PI*3)*.3;});},
 'the radio said':async(R,S)=>{bout(R,S.q,.2);S.rd=await popIn(R,'pa-radio',.6,.2,.6);for(let i=0;i<3;i++){R.fx('note',.6,.9,4,{w:.4,t:.8});await S.rd.shiver(.25);}R.word('Schools closed!',.6,1.4,'#e03131',1.1);},
 'hooray':async(R,S)=>{await S.k.swap('pa-timcheer',.25,{h:1.4});R.word('Hooray!',-1.4,1.9,'#e8a900',1.3);await S.k.jump(.6);snow(R,8);},
 'snow pants':async(R,S)=>{S.rd.hide(.3);for(const[k,x]of[['boot'.replace('boot','pa-boot'),.2],['pa-mitten',.6],['pa-mitten',.9]]){const a=await drop(R,k,x,.2,.4);await fly(R,a,-1.4,.6,.5,{arc:.5});a.hide(.15);}},
 'made a snowman':async(R,S)=>{S.sm2=mk(R,'snowman',{x:.6,y:.2,h:1.0,face:1});S.sm2.st.op=1;S.sm2.st.s=.1;S.sm2.ap();R.word('Roll, roll!',.6,1.4,'#1c7ed6',.9);await S.sm2.T(1.4,e=>{S.sm2.st.s=.1+.9*e;});R.fx('sparkle',.6,.8,16,{w:.6,t:.9});
  S.bro=await enter(R,'kid2',1.5,1.1,{from:2.9,sec:.6});S.ca=await drop(R,'pa-carrot',.62,.8,.2,{bounce:false});},
 'what a fun':async(R,S)=>{snow(R,12);await cheer(R,[S.k,S.bro,S.sm2],0,1.8);}
};
page('e16',0,{old:mkq(E16s),neu:mkq(E16s),tm:{"i woke up": 0, "everything was white": 2.03, "was there school": 4.12, "the radio said": 6.28, "hooray": 9.72, "snow pants": 11.74, "made a snowman": 15.52, "what a fun": 17.58}});
}
P.G1STAGED&&P.G1STAGED.add('e16');
/* ---------- e17 ---------- */
{
const E17s={
 'my mom is a student':async(R,S)=>{await R.bg('classroom');R.label('Mom Goes Back to School','#16a36f');S.G=gfx(R);S.mom=await enter(R,'pa-mombook',-1.0,1.4,{sec:.9,y:-.05});S.bp=await drop(R,'pa-backpack',-.4,.2,.45);R.word('A student!',-1.0,1.8,'#16a36f',1);},
 'classes at night':async(R,S)=>{await R.bg('nighthill1');R.label('Mom Goes Back to School','#16a36f');S.G=gfx(R);S.mn=mk(R,'pa-moon',{x:1.2,y:-.3,h:.7,face:1});S.mn.show(.2);S.mn.go(1.2,1.4,1.0,{arc:.2});S.mom=await enter(R,'pa-mombook',-1.0,1.4,{sec:.7,y:-.05});S.bk=await popIn(R,'book',-.4,.6,.4);},
 'help her study':async(R,S)=>{await R.bg('livingroom');R.label('Mom Goes Back to School','#16a36f');S.G=gfx(R);S.mom=await enter(R,'pa-momwave',-1.4,1.4,{sec:.6,y:-.05});S.sis=await enter(R,'pa-miawave',.4,1.3,{from:2.9,sec:.6});S.me=await enter(R,'pa-timpoint',1.2,1.3,{from:2.9,sec:.6});S.pc=await popIn(R,'pencil',-.5,.4,.4);},
 'mom reads big':async(R,S)=>{S.b1=await drop(R,'pa-bluebook',-.6,.2,.5);S.pl=await popIn(R,'plant',-.6,.75,.5);R.fx('sparkle',-.6,1.0,12,{w:.4,t:.8});},
 'her teacher says':async(R,S)=>{S.tc=await enter(R,'pa-teacher',-.3,1.35,{from:-2.9,sec:.7});R.word('Hard worker!',-.3,1.85,'#e8a900',1);R.fx('sparkle',-1.4,1.6,16,{w:.6,t:1});},
 'i am proud':async(R,S)=>{await S.me.swap('pa-timcheer',.25,{h:1.3});hearts(R,-.4,1.4,14);await all([S.me.jump(.4),S.sis.jump(.4)]);},
 'learning is':async(R,S)=>{R.word('Learning is for everyone!',0,2.0,'#16a36f',1.2);await cheer(R,[S.mom,S.sis,S.me,S.tc],0,1.6);}
};
page('e17',0,{old:mkq(E17s),neu:mkq(E17s),tm:{"my mom is a student": 0, "classes at night": 3.4, "help her study": 6.32, "mom reads big": 7.46, "her teacher says": 10.38, "i am proud": 12.98, "learning is": 15.23}});
}
P.G1STAGED&&P.G1STAGED.add('e17');
/* ---------- e18 ---------- */
{
const E18s={
 'grandpa planted':async(R,S)=>{await R.bg('farm23');R.label('The Giant Turnip','#2f7de1');S.G=gfx(R);S.g=await enter(R,'grandpa',-1.4,1.3,{sec:.8});S.sd=mk(R,'seedling',{x:.4,y:.2,h:.3,face:1});S.sd.show(.4,'pop');R.fx('dust',.4,.25,8,{w:.4,t:.6});},
 'it grew and grew':async(R,S)=>{S.sd.hide(.3);S.tp=mk(R,'pa-turnip',{x:.5,y:.15,h:.3,face:1});S.tp.show(.3);await R.T(1.6,e=>{S.tp.st.s=1+e*2.4;S.tp.ap();});R.word('Grow!',.5,1.6,'#2b8a3e',1.1);},
 'he pulled':async(R,S)=>{await S.g.go(-.25,.2,.6,{hops:2});for(let i=0;i<3;i++){R.word('Pull!',-.4,1.6,'#e8590c',.8);await all([S.g.go(-.45,.2,.3,{}),S.tp.shiver(.3)]);await S.g.go(-.25,.2,.25,{});}},
 'grandma helped':async(R,S)=>{S.gm=await enter(R,'grandma',-.9,1.25,{sec:.6});},
 'she pulled too':async(R,S)=>{for(let i=0;i<2;i++){R.word('Pull!',-.6,1.7,'#e8590c',.8);await all([S.g.go(-.45,.2,.3,{}),S.gm.go(-1.1,.2,.3,{}),S.tp.shiver(.3)]);await all([S.g.go(-.25,.2,.25,{}),S.gm.go(-.9,.2,.25,{})]);}},
 'the girl the dog':async(R,S)=>{S.k=await enter(R,'pa-miawave',-1.5,1.15,{sec:.4});S.dg=await enter(R,'pa-dog',-1.95,.5,{sec:.4});S.ct=await enter(R,'pa-cat',-2.3,.45,{sec:.4});},
 'they pulled together':async(R,S)=>{const team=[S.g,S.gm,S.k,S.dg,S.ct];for(let i=0;i<2;i++){R.word('Pull! Pull!',-1.0,1.8,'#e8590c',1);await all(team.map(a=>a.go(a.st.x-.15,.2,.3,{})).concat([S.tp.shiver(.3)]));await all(team.map(a=>a.go(a.st.x+.15,.2,.25,{})));}},
 'pop':async(R,S)=>{R.word('POP!',.5,1.4,'#e03131',1.6);R.fx('dust',.5,.3,20,{w:1.2,t:.9});await all([S.tp.go(.9,.6,.6,{arc:.8}),S.g.go(-1.0,.2,.5,{}),S.gm.go(-1.5,.2,.5,{})]);},
 'we can do more':async(R,S)=>{await cheer(R,[S.g,S.gm,S.k,S.dg,S.ct,S.tp],-.4,1.8);}
};
page('e18',0,{old:mkq(E18s),neu:mkq(E18s),tm:{"grandpa planted": 0, "it grew and grew": 2.07, "he pulled": 3.95, "grandma helped": 6.81, "she pulled too": 8.69, "the girl the dog": 11.4, "they pulled together": 13.77, "pop": 15.71, "we can do more": 18.56}});
}
P.G1STAGED&&P.G1STAGED.add('e18');
/* ---------- e19 ---------- */
{
const E19s={
 'mister music plays':async(R,S)=>{await R.bg('playroom1');R.label("Mr. Music's Band",'#2f7de1');S.G=gfx(R);S.mm=await enter(R,'pa-oneband',-.6,1.45,{sec:1.0});R.fx('note',-.6,1.6,10,{w:1,t:1.4});},
 'bangs the drum':async(R,S)=>{for(let i=0;i<4;i++){R.word(i%2?'Boom!':'Bang!',-.9+i*.15,1.9,'#e8590c',.8);await S.mm.jump(.15);}S.t1=blk(S.G,'bangs',.9,2.0,'#e8590c',.32);await tin(R,S.t1,.25);},
 'strums the guitar':async(R,S)=>{S.gt=await popIn(R,'pa-guitar',.6,.3,.6);for(let i=0;i<3;i++){R.fx('note',.6,.9,4,{w:.4,t:.9});await S.gt.wag(.3,.12,2);}S.t2=blk(S.G,'strums',.9,1.6,'#e8590c',.32);await tin(R,S.t2,.25);},
 'blows the trumpet':async(R,S)=>{S.tp=await popIn(R,'pa-trumpet',1.3,.8,.5);R.word('Toot toot!',1.3,1.3,'#e8a900',1);await S.tp.shiver(.6);S.t3=blk(S.G,'blows',.9,1.2,'#e8590c',.32);await tin(R,S.t3,.25);},
 'sings a happy':async(R,S)=>{R.fx('note',-.6,1.8,16,{w:1.4,t:1.6});await S.mm.wag(1,.08,4);},
 'clap and dance':async(R,S)=>{S.a=await enter(R,'pa-miacheer',1.0,1.2,{from:2.9,sec:.5});S.b=await enter(R,'pa-leocheer',1.6,1.2,{from:2.9,sec:.5});for(let i=0;i<3;i++){R.word('clap!',1.3,1.5,'#e8590c',.7);await all([S.a.jump(.3),S.b.jump(.3)]);}},
 'everyone cheers':async(R,S)=>{R.word('Hooray!',.3,1.9,'#e8a900',1.3);await cheer(R,[S.mm,S.a,S.b],0,1.8);await wave(R,[S.t1,S.t2,S.t3]);}
};
page('e19',0,{old:mkq(E19s),neu:mkq(E19s),tm:{"mister music plays": 0, "bangs the drum": 3.46, "strums the guitar": 6.1, "blows the trumpet": 9.11, "sings a happy": 11.6, "clap and dance": 14.31, "everyone cheers": 15.34}});
}
P.G1STAGED&&P.G1STAGED.add('e19');
/* ---------- e20 ---------- */
{
const E20s={
 'my new puppy':async(R,S)=>{await R.bg('livingroom');R.label('My New Puppy','#2f7de1');S.G=gfx(R);S.k=await enter(R,'pa-leowave',-1.5,1.4,{sec:.7});S.bk=await popIn(R,'pa-laundry',.6,.2,.55);
  S.pp=mk(R,'pa-puppy',{x:.6,y:.4,h:.6,face:-1});S.pp.show(.5,'pop');hearts(R,.6,1.1,10);S.t=blk(S.G,'small and fuzzy',.4,1.9,'#2f7de1',.32);await tin(R,S.t,.3);},
 'his name is toby':async(R,S)=>{bout(R,S.t,.2);S.n=blk(S.G,'Toby',.6,1.55,'#5c7cfa',.42);S.n.c1='#e8a900';await tin(R,S.n,.35);await S.pp.go(.0,.2,.6,{hops:3});},
 'his ears are':async(R,S)=>{await S.pp.wag(.8,.12,4);R.word('flop flop!',.0,1.0,'#a0522d',.9);},
 'i am so happy':async(R,S)=>{await S.k.swap('pa-leocheer',.25,{h:1.4});await S.k.jump(.5);hearts(R,-1.5,1.8,8);},
 'best friends':async(R,S)=>{await S.pp.go(-.8,.2,.6,{hops:3});hearts(R,-1.1,1.2,14);await all([S.k.jump(.3),S.pp.jump(.3)]);},
 'play fetch':async(R,S)=>{await R.bg('park');R.label('My New Puppy','#2f7de1');S.G=gfx(R);S.k=await enter(R,'pa-leowave',-1.6,1.4,{sec:.5});S.pp=await enter(R,'pa-puppy',-.8,.55,{sec:.5,hops:4});
  S.bl=mk(R,'ball',{x:-1.3,y:.9,h:.3,face:1});S.bl.show(.2);await fly(R,S.bl,1.4,.2,.9,{arc:1.1});await S.pp.go(1.2,.2,.8,{lin:true,hops:6});R.word('Fetch!',1.2,1.0,'#e8590c',1);await S.pp.go(-.8,.2,.8,{lin:true,hops:6});},
 'at night toby':async(R,S)=>{await R.bg('nighthill1');R.label('My New Puppy','#2f7de1');S.G=gfx(R);S.bd=await popIn(R,'pa-bed',-.6,.2,.6);S.bk=await popIn(R,'pa-laundry',.7,.2,.5);
  S.pp=mk(R,'pa-puppysleep',{x:.7,y:.3,h:.4,face:-1,idle:'sleep'});S.pp.show(.5);R.word('Zzz',.9,1.0,'#7048e8',.9);await R.wait(.8);R.word('Zzz',1.0,1.2,'#7048e8',.8);}
};
page('e20',0,{old:mkq(E20s),neu:mkq(E20s),tm:{"my new puppy": 0, "his name is toby": 2.27, "his ears are": 4.45, "i am so happy": 7.17, "best friends": 10.74, "play fetch": 12.47, "at night toby": 14.68}});
}
P.G1STAGED&&P.G1STAGED.add('e20');
/* ---------- e21 ---------- */
{
const ADJ='#f08c00';
const tag=async(R,S,w,x,y)=>{const b=blk(S.G,w,x,y,ADJ,.32);await tin(R,b,.25);R.fx('sparkle',x,y,6,{w:.3,t:.5});return b;};
const E21s={
 'last night':async(R,S)=>{await R.bg('nighthill1');R.label('A Starry Night','#2f7de1');S.G=gfx(R);S.tn=await popIn(R,'pa-tent',1.1,.2,.8);S.k=await enter(R,'pa-norawave',-1.5,1.45,{sec:.8});S.t1=await tag(R,S,'quiet',.2,1.9);},
 'dark and clear':async(R,S)=>{S.t2=await tag(R,S,'dark',-.4,1.5);S.t3=await tag(R,S,'clear',.5,1.5);},
 'tiny stars':async(R,S)=>{for(const[x,y]of[[-1.8,2.0],[-.9,2.05],[.2,2.1],[1.0,2.0],[1.7,1.95],[-.3,2.15]]){const s=mk(R,'pa-star',{x,y,h:.2,face:1});s.show(.3,'pop');R.fx('sparkle',x,y,4,{w:.2,t:.5});await R.wait(.15);}S.t4=await tag(R,S,'tiny',-1.0,1.2);},
 'round and bright':async(R,S)=>{S.mn=mk(R,'pa-moon',{x:1.6,y:-.3,h:.6,face:1});S.mn.show(.2);await S.mn.go(1.5,1.3,1.0,{arc:.2});R.fx('sparkle',1.5,1.5,16,{w:.6,t:1});S.t5=await tag(R,S,'round',.6,1.1);S.t6=await tag(R,S,'bright',1.3,.8);},
 'warm fire':async(R,S)=>{S.fi=await popIn(R,'fire',.1,.2,.55);R.fx('dust',.1,.8,10,{w:.3,t:1.2});S.t7=await tag(R,S,'warm',.1,.95);await S.k.swap('pa-noralook',.25,{h:1.45});},
 'sticky marshmallows':async(R,S)=>{S.ms=mk(R,'pa-marshmallow',{x:-.8,y:.6,h:.6,face:1});S.ms.show(.4,'pop');await S.ms.go(-.3,.55,.6,{});R.word('Mmm, sticky!',-.4,1.25,ADJ,.9);},
 'a perfect night':async(R,S)=>{await S.k.swap('pa-norawave',.25,{h:1.45});await cheer(R,[S.k,S.fi,S.tn],0,1.7);await wave(R,[S.t1,S.t2,S.t3,S.t4,S.t5,S.t6,S.t7].filter(Boolean));}
};
page('e21',0,{old:mkq(E21s),neu:mkq(E21s),tm:{"last night": 0, "dark and clear": 4.26, "tiny stars": 5.35, "round and bright": 9.63, "warm fire": 12.27, "sticky marshmallows": 13.64, "a perfect night": 16.21}});
}
P.G1STAGED&&P.G1STAGED.add('e21');
/* ---------- e22 ---------- */
{
const LOC='#0c8599';
const where=async(R,S,w,x,y)=>{const b=blk(S.G,w,x,y,LOC,.34);await tin(R,b,.25);return b;};
const E22s={
 'hide and seek':async(R,S)=>{await R.bg('park');R.label('Hide and Seek','#2f7de1');S.G=gfx(R);S.me=await enter(R,'pa-leowave',-1.6,1.4,{sec:.7});R.word('1, 2, 3...',-1.6,1.9,'#e8590c',1);S.tr=await popIn(R,'tree',.8,.2,1.3);},
 'ali hid':async(R,S)=>{S.al=mk(R,'kid0',{x:2.9,y:.2,h:1.0,face:-1});S.al.show(.1);await S.al.go(1.05,.2,.8,{hops:3});S.al.st.op=.45;S.al.ap();S.w1=await where(R,S,'behind',.8,1.7);},
 'sara crawled':async(R,S)=>{await R.bg('playroom1');R.label('Hide and Seek','#2f7de1');S.G=gfx(R);S.bd=await popIn(R,'pa-bed',-.2,.2,.7);S.sa=mk(R,'kid3',{x:-2.9,y:.2,h:.9,face:1});S.sa.show(.1);await S.sa.go(-.2,.12,.9,{hops:4});S.sa.st.s=.6;S.sa.st.op=.6;S.sa.ap();S.w2=await where(R,S,'under',-.2,1.2);},
 'laundry basket':async(R,S)=>{S.lb=await popIn(R,'pa-laundry',1.1,.2,.55);S.bro=mk(R,'kid2',{x:2.9,y:.2,h:.8,face:-1});S.bro.show(.1);await S.bro.go(1.1,.35,.8,{arc:.6});S.bro.st.s=.6;S.bro.ap();S.w3=await where(R,S,'in',1.1,1.2);},
 'jumped on the shelf':async(R,S)=>{S.sh=await popIn(R,'pa-shelf',-1.3,1.1,.5);S.ct=mk(R,'pa-cat',{x:-2.6,y:.2,h:.45,face:1});S.ct.show(.1);await S.ct.go(-1.3,1.25,.8,{arc:.8});R.word('Meow!',-1.3,1.9,'#e8590c',.8);S.w4=await where(R,S,'on',-.5,1.85);},
 'a bird flew':async(R,S)=>{S.bd2=mk(R,'bird',{x:-2.9,y:1.9,h:.35,face:1,idle:'flutter'});S.bd2.show(.1);S.bd2.fly(2.9,1.9,2.0);S.w5=await where(R,S,'over',.3,2.05);},
 'ready or not':async(R,S)=>{S.me=await enter(R,'pa-leocheer',-.2,1.4,{from:-2.9,sec:.7});R.word('Here I come!',-.2,1.9,'#e8590c',1.2);await S.me.jump(.5);}
};
page('e22',0,{old:mkq(E22s),neu:mkq(E22s),tm:{"hide and seek": 0.79, "ali hid": 1.8, "sara crawled": 4.58, "laundry basket": 9.3, "jumped on the shelf": 11.38, "a bird flew": 12.67, "ready or not": 15.13}});
}
P.G1STAGED&&P.G1STAGED.add('e22');
/* ---------- e23 ---------- */
{
const E23s={
 'i have a wobbly':async(R,S)=>{await R.bg('kitchen-day');R.label('My Wobbly Tooth','#2f7de1');S.G=gfx(R);S.k=await enter(R,'pa-miawave',-1.4,1.45,{sec:.8});S.th=await popIn(R,'pa-tooth2',.4,.6,.5);for(let i=0;i<3;i++){R.word('wobble!',.4,1.3,'#e8590c',.7);await S.th.wag(.4,.25,3);}},
 'ate an apple':async(R,S)=>{S.ap=await drop(R,'pa-apple',.9,.2,.45);await fly(R,S.ap,-1.2,1.1,.6,{arc:.4});S.ap.hide(.15);R.word('Crunch!',-1.0,1.7,'#a0522d',.9);await S.th.wag(.6,.35,4);},
 'it fell out':async(R,S)=>{S.pl=await drop(R,'pa-plate',.4,.2,.25,{spin:0});await fly(R,S.th,.4,.35,.6,{arc:.2,spin:Math.PI*2});R.word('Plop!',.4,1.0,'#e03131',1);await S.k.swap('pa-miacheer',.25,{h:1.45});},
 'under my pillow':async(R,S)=>{await R.bg('nighthill1');R.label('My Wobbly Tooth','#2f7de1');S.G=gfx(R);S.bd=await popIn(R,'pa-bed',.2,.2,.7);S.pi=await drop(R,'pa-pillow',.0,.55,.3,{spin:0});S.th=mk(R,'pa-tooth',{x:-.6,y:1.2,h:.35,face:1});S.th.show(.3,'pop');await fly(R,S.th,.0,.6,.6,{arc:.3});S.th.hide(.3);R.word('Shh...',.2,1.4,'#7048e8',1);},
 'in the morning':async(R,S)=>{await R.bg('sunhill1');R.label('My Wobbly Tooth','#2f7de1');S.G=gfx(R);S.bd=await popIn(R,'pa-bed',.2,.2,.7);S.pi=await popIn(R,'pa-pillow',.0,.55,.3);S.k=await enter(R,'pa-miawave',-1.5,1.45,{sec:.6});},
 'a shiny coin':async(R,S)=>{S.pi.go(-.4,.55,.4,{});S.co=mk(R,'coin',{x:.1,y:.55,h:.35,face:1});S.co.show(.4,'pop');R.fx('sparkle',.1,.7,24,{w:.5,t:1});S.nt=await popIn(R,'paper',.5,.55,.3);},
 'big gap':async(R,S)=>{await S.k.swap('pa-miacheer',.25,{h:1.45});R.word('Big smile!',-1.3,1.9,'#e8a900',1.2);await cheer(R,[S.k,S.co],-.4,1.7);}
};
page('e23',0,{old:mkq(E23s),neu:mkq(E23s),tm:{"i have a wobbly": 0, "ate an apple": 2.54, "it fell out": 7.25, "under my pillow": 10.44, "in the morning": 11.51, "a shiny coin": 13.84, "big gap": 17.18}});
}
P.G1STAGED&&P.G1STAGED.add('e23');
/* ---------- e24 ---------- */
{
const AND='#2b8a3e',OR='#e8590c';
const E24s={
 'on saturday':async(R,S)=>{await R.bg('farm23');R.label('A Day with Grandpa','#f08a24');S.G=gfx(R);S.g=await enter(R,'grandpa',.3,1.3,{from:2.9,sec:.8});S.k=await enter(R,'pa-timwave',-1.4,1.4,{sec:.8});hearts(R,-.5,1.6,10);},
 'fed the birds':async(R,S)=>{for(let i=0;i<6;i++){R.fx('crumb',-.3+i*.3,.4,4,{w:.3,t:.6});await R.wait(.1);}S.bd=mk(R,'bird',{x:2.9,y:1.5,h:.35,face:-1,idle:'flutter'});S.bd.show(.1);S.bd.fly(.9,.25,1.0);S.sq=mk(R,'squirrel',{x:2.9,y:.2,h:.45,face:-1});S.sq.show(.1);await S.sq.go(1.5,.2,1.0,{hops:4});
  S.a=blk(S.G,'and',1.2,1.2,AND,.36);await tin(R,S.a,.3);},
 'grandpa asked':async(R,S)=>{bout(R,S.a,.2);S.bd.fly(2.9,1.6,.8);S.sq.go(2.9,.2,.8,{hops:3});S.ck=await popIn(R,'cookie',.6,1.3,.35);S.o=blk(S.G,'or',1.1,1.45,OR,.4);await tin(R,S.o,.3);S.fr=await popIn(R,'pa-fishrod',1.55,1.0,.6);await S.k.swap('pa-timlook',.25,{h:1.4});},
 'i picked fishing':async(R,S)=>{S.ck.hide(.3);bout(R,S.o,.2);await S.k.swap('pa-timcheer',.25,{h:1.4});await S.k.jump(.4);R.word('Fishing!',-1.4,1.9,'#1c7ed6',1.1);},
 'caught two fish':async(R,S)=>{await R.bg('laketown1');R.label('A Day with Grandpa','#f08a24');S.G=gfx(R);S.g=await enter(R,'grandpa',-1.4,1.3,{sec:.5});S.k=await enter(R,'pa-timcheer',-.6,1.35,{sec:.5});S.fr=await popIn(R,'pa-fishrod',.1,.4,.8);
  for(const x of[.7,1.1]){const f=mk(R,'fish',{x:1.0,y:.0,h:.35,face:1});f.show(.1);await fly(R,f,x,.3,.7,{arc:.9,spin:Math.PI*2});}R.word('Two fish!',.9,1.2,'#1c7ed6',1);},
 'one old boot':async(R,S)=>{const b=mk(R,'pa-boot',{x:1.0,y:.0,h:.4,face:1});b.show(.1);await fly(R,b,1.5,.3,.8,{arc:1.0,spin:Math.PI*2});R.word('A boot?!',1.5,1.1,'#a0522d',1.1);await all([S.g.jump(.3),S.k.jump(.3)]);},
 'sandwiches and lemonade':async(R,S)=>{S.sw=await drop(R,'pa-sandwich',-.2,.2,.4);S.lm=await drop(R,'pa-lemonade',.3,.2,.5);S.a2=blk(S.G,'and',.05,1.0,AND,.36);await tin(R,S.a2,.3);await cheer(R,[S.g,S.k],-.8,1.7);}
};
page('e24',0,{old:mkq(E24s),neu:mkq(E24s),tm:{"on saturday": 0, "fed the birds": 3.47, "grandpa asked": 5.35, "i picked fishing": 9.64, "caught two fish": 12.39, "one old boot": 13.67, "sandwiches and lemonade": 16.0}});
}
P.G1STAGED&&P.G1STAGED.add('e24');
/* ---------- e25 ---------- */
{
const BUT='#c2255c';
const E25s={
 'i have a face':async(R,S)=>{await R.bg('livingroom');R.label('Riddle Time','#f08a24');S.G=gfx(R);S.k=await enter(R,'pa-leosay',-1.6,1.4,{sec:.7});S.q=blk(S.G,'?',.4,.85,'#adb5bd',.8);S.q.gap=true;await tin(R,S.q,.4);S.b=blk(S.G,'but',.4,1.9,BUT,.42);await tin(R,S.b,.3);},
 'hands but no fingers':async(R,S)=>{await bpulse(R,S.b,.6);await bshake(R,S.q,.5);},
 'when to wake up':async(R,S)=>{R.word('Ring?',.4,1.45,'#e03131',1);await bshake(R,S.q,.5);S.k.swap('pa-leocheer'.replace('cheer','say'),.2,{h:1.4});},
 'a clock':async(R,S)=>{bout(R,S.q,.3);S.cl=await popIn(R,'alarm_clock',.4,.2,.8);R.word('A clock!',.4,1.35,'#e03131',1.2);await S.cl.shiver(.8);await S.k.swap('pa-leocheer',.25,{h:1.4});await S.k.jump(.4);},
 'here is another':async(R,S)=>{S.cl.hide(.3);S.q2=blk(S.G,'?',.4,.85,'#adb5bd',.8);S.q2.gap=true;await tin(R,S.q2,.4);await S.k.swap('pa-leosay',.25,{h:1.4});},
 'keys but no locks':async(R,S)=>{S.ky=await popIn(R,'key',1.4,.9,.4);await bpulse(R,S.b,.6);await bshake(R,S.q2,.5);},
 'i make music':async(R,S)=>{S.ky.hide(.3);R.fx('note',.4,1.2,12,{w:.8,t:1.4});await bshake(R,S.q2,.5);},
 'a piano':async(R,S)=>{bout(R,S.q2,.3);S.pn=await popIn(R,'pa-piano',.4,.2,.85);R.word('A piano!',.4,1.45,'#7048e8',1.2);R.fx('note',.4,1.0,14,{w:1,t:1.6});await S.k.swap('pa-leocheer',.25,{h:1.4});await cheer(R,[S.k,S.pn],-.3,1.8);}
};
page('e25',0,{old:mkq(E25s),neu:mkq(E25s),tm:{"i have a face": 0, "hands but no fingers": 3.13, "when to wake up": 5.91, "a clock": 8.42, "here is another": 9.66, "keys but no locks": 12.14, "i make music": 13.45, "a piano": 16.77}});
}
P.G1STAGED&&P.G1STAGED.add('e25');
/* ---------- e26 ---------- */
{
const E26s={
 'the lion roared':async(R,S)=>{await R.bg('sunhill1');R.label('The King of the Jungle','#f08a24');S.G=gfx(R);S.ln=await enter(R,'lion',-.8,1.0,{sec:.9});S.cr=mk(R,'pa-crown',{x:-.8,y:2.4,h:.3,face:1});S.cr.show(.1);await fly(R,S.cr,-.75,1.05,.6,{arc:0});R.word('ROAR!',-.8,1.6,'#e8590c',1.4);await S.ln.shiver(.6);},
 'the monkey laughed':async(R,S)=>{S.mk=await enter(R,'monkey',1.2,.8,{from:2.9,sec:.8});R.word('Ha ha ha!',1.2,1.25,'#a0522d',1.1);await S.mk.jump(.4);await S.mk.jump(.3);},
 'a king must be kind':async(R,S)=>{S.k=blk(S.G,'kind',.2,1.95,'#e8a900',.45);await tin(R,S.k,.35);hearts(R,.2,1.6,8);await S.mk.wag(.6,.1,3);},
 'helped the elephant':async(R,S)=>{S.mk.go(2.0,.2,.6,{hops:2});S.el=await enter(R,'elephant',1.2,1.0,{from:2.9,sec:.8});S.lg=await drop(R,'log',.3,.2,.4);await S.ln.go(.0,.2,.6,{hops:2});R.word('Heave!',.2,1.2,'#e8590c',.9);await fly(R,S.lg,1.8,.2,.8,{arc:.6});await S.el.jump(.3);},
 'shared his water':async(R,S)=>{S.el.go(2.9,.2,.8,{});S.zb=await enter(R,'pa-zebra',1.1,.75,{from:2.9,sec:.8});S.wt=await popIn(R,'drop',.5,.3,.4);await fly(R,S.wt,1.0,.5,.6,{arc:.4});S.wt.hide(.2);hearts(R,1.1,1.1,8);await S.zb.jump(.3);},
 'now all the animals':async(R,S)=>{S.el=await enter(R,'elephant',1.7,1.0,{from:2.9,sec:.5});S.mk2=await enter(R,'monkey',-1.7,.75,{from:-2.9,sec:.5});R.word('Hooray for the king!',.0,1.95,'#e8a900',1.1);await cheer(R,[S.ln,S.zb,S.el,S.mk2,S.cr],0,1.6);}
};
page('e26',0,{old:mkq(E26s),neu:mkq(E26s),tm:{"the lion roared": 0, "the monkey laughed": 3.26, "a king must be kind": 5.19, "helped the elephant": 9.7, "shared his water": 12.58, "now all the animals": 14.52}});
}
P.G1STAGED&&P.G1STAGED.add('e26');
/* ---------- e27 ---------- */
{
const E27s={
 'today i went':async(R,S)=>{await R.bg('hall');R.label('My First Visit to the Dentist','#f08a24');S.G=gfx(R);S.k=await enter(R,'pa-norawave',-1.5,1.45,{sec:.8});S.dn=await enter(R,'pa-dentist',1.2,1.35,{from:2.9,sec:.8});S.t=blk(S.G,'dentist',1.2,1.9,'#0c8599',.34);await tin(R,S.t,.3);},
 'a big chair':async(R,S)=>{S.ch=await drop(R,'chair',-.2,.2,.8);await S.k.go(-.2,.55,.6,{arc:.5});for(let i=0;i<2;i++){await S.k.go(-.2,.85,.4,{});await S.k.go(-.2,.55,.4,{});}R.word('Up and down!',-.2,1.9,'#e8590c',1);},
 'counted my teeth':async(R,S)=>{S.th=await popIn(R,'pa-tooth',.5,1.2,.45);for(const n of['1','2','3','4']){R.word(n,.5+(+n-2.5)*.25,1.8,'#0c8599',.7);await R.wait(.25);}},
 'cleaned them':async(R,S)=>{S.tb=mk(R,'pa-toothbrush',{x:1.0,y:1.2,h:.45,face:1});S.tb.show(.3,'pop');for(let i=0;i<4;i++){await S.tb.go(.6+(i%2)*.15,1.25,.2,{});R.fx('sparkle',.5,1.3,8,{w:.4,t:.6});}R.word('Sparkle!',.5,1.85,'#1c7ed6',1);},
 'brush in little':async(R,S)=>{await R.T(1.4,e=>{S.tb.st.x=.5+Math.cos(e*Math.PI*6)*.15;S.tb.st.y=1.2+Math.sin(e*Math.PI*6)*.12;S.tb.ap();});R.word('circles!',.6,.8,'#0c8599',.9);},
 'a new toothbrush':async(R,S)=>{S.k.go(-1.5,.2,.5,{arc:.3});await fly(R,S.tb,-1.2,.8,.7,{arc:.5});R.fx('sparkle',-1.2,1.0,16,{w:.4,t:.9});await cheer(R,[S.k,S.dn],0,1.7);}
};
page('e27',0,{old:mkq(E27s),neu:mkq(E27s),tm:{"today i went": 0, "a big chair": 3.22, "counted my teeth": 6.83, "cleaned them": 10.24, "brush in little": 14.37, "a new toothbrush": 16.84}});
}
P.G1STAGED&&P.G1STAGED.add('e27');
/* ---------- e28 ---------- */
{
const OC=['#2b8a3e','#1c7ed6','#7048e8','#e8590c'];
const st=async(R,S,w,i,x)=>{const b=blk(S.G,w,x,2.0,OC[i],.34);await tin(R,b,.25);return b;};
const E28s={
 'first i get':async(R,S)=>{await R.bg('kitchen22');R.label('Making a Sandwich','#f08a24');S.G=gfx(R);S.k=await enter(R,'pa-milospoon',-1.6,1.45,{sec:.8});S.b1=await st(R,S,'First',0,-1.0);
  S.br1=await drop(R,'pa-bread',.0,.2,.3,{spin:0});S.br2=await drop(R,'pa-bread',.8,.2,.3,{spin:0});},
 'next i spread':async(R,S)=>{S.b2=await st(R,S,'Next',1,-.2);S.kn=mk(R,'knife',{x:.4,y:.8,h:.4,face:1});S.kn.show(.3,'pop');for(let i=0;i<4;i++){await S.kn.go(-.1+(i%2)*.3,.55,.2,{});R.fx('sparkle',.1,.4,4,{w:.3,t:.4});}S.kn.hide(.3);},
 'then i add':async(R,S)=>{S.b3=await st(R,S,'Then',2,.6);S.ch=mk(R,'cheese',{x:.0,y:2.5,h:.22,face:1});S.ch.show(.1);await fly(R,S.ch,.0,.38,.5,{arc:0});S.le=mk(R,'pa-lettuce',{x:.0,y:2.5,h:.22,face:1});S.le.show(.1);await fly(R,S.le,.0,.52,.5,{arc:0});},
 'last i put':async(R,S)=>{S.b4=await st(R,S,'Last',3,1.4);await fly(R,S.br2,.0,.66,.7,{arc:.6,spin:Math.PI*2});R.fx('crumb',.0,.8,10,{w:.4,t:.6});S.kn.show(.2);await S.kn.go(.0,.7,.4,{});R.word('Chop!',.0,1.3,'#e8590c',.9);S.kn.hide(.2);},
 'now i can eat':async(R,S)=>{await S.k.swap('pa-milotummy',.25,{h:1.45});R.word('Yum!',-1.4,1.9,'#e8590c',1.2);await wave(R,[S.b1,S.b2,S.b3,S.b4]);},
 'mixed up the order':async(R,S)=>{await all([bfly(R,S.b4,-1.0,2.0,.7,.4),bfly(R,S.b1,1.4,2.0,.7,-.4),bshake(R,S.b2,.6)]);R.word('Messy!',.2,1.4,'#e03131',1.3);for(const a of[S.br1,S.ch,S.le,S.br2])fly(R,a,a.st.x+(Math.random()-.5)*1.4,.2,.6,{arc:.6,spin:Math.PI*3});await S.k.shiver(.6);}
};
page('e28',0,{old:mkq(E28s),neu:mkq(E28s),tm:{"first i get": 0, "next i spread": 2.66, "then i add": 5.38, "last i put": 8.09, "now i can eat": 12.35, "mixed up the order": 15.57}});
}
P.G1STAGED&&P.G1STAGED.add('e28');
P.DIR.mount();
})();
