/* Grade 1 English: staged theory pages (group a). Generated from snippets. ASCII only. */
(function(){
"use strict";
const P=window.PM;if(!P||!P.DIR||!P.G1H||!P.G1X)return;
const page=P.DIR.page;
const {all,pop,liteq,mkq,hearts,gfx,tin,tout,glow,moveT,COL,colOf,wordTiles,fly,tileFly,squash,wave,VC,vcol,vTiles,rtag,ntag,NC,tg,nounTag,ptag,pltag,GOLD,PG,RCOL,rpair}=P.G1H;
const {blk,rowX,sentence,reflow,bfly,bshake,bpulse,bout,bcross,recolor,mk,enter,drop,popIn,cheer,crates,intoCrate,markB,MARKC,speak}=P.G1X;
const rnd=(a,b)=>a+Math.random()*(b-a);
/* ---------- e01 ---------- */
{
const LH=1.45;
const E1d={
 'let us sort':async(R,S)=>{await R.bg('playroom1');R.label('Sort by first sound','#e8505b');const G=S.G=gfx(R);
  enter(R,'pa-leowave',-2.0,LH,{sec:1.0}).then(a=>S.leo=a);
  S.cr=await crates(R,G,['b','f'],{xs:[-.7,1.3],cols:[COL.b,COL.f]});
  S.it={};const L=[['ball',-1.0,.45],['bicycle',-.25,.55],['fish',.55,.5],['pa-fork',1.3,.6]];
  for(const[k,x,h]of L){S.it[k]=mk(R,k,{x,y:1.55,h,face:1});S.it[k].show(.4,'pop');R.fx('sparkle',x,1.8,8,{w:.4,t:.7});await R.wait(.22);}},
 'ball and bike':async(R,S)=>{await intoCrate(R,S.it['ball'],S.cr[0],-.15);R.word('b!',-.7,1.95,COL.b,1);await intoCrate(R,S.it['bicycle'],S.cr[0],.18);await glow(R,S.cr[0].b,.6);},
 'fish and fork':async(R,S)=>{await intoCrate(R,S.it['fish'],S.cr[1],-.15);R.word('f!',1.3,1.95,COL.f,1);await intoCrate(R,S.it['pa-fork'],S.cr[1],.18);await glow(R,S.cr[1].b,.6);},
 'each one hops':async(R,S)=>{await S.leo.swap('pa-leocheer',.25,{h:LH});await cheer(R,[S.leo,S.cr[0].c,S.cr[1].c],.3,1.7);await all([S.cr[0].c.jump(.3),S.cr[1].c.jump(.3)]);}
};
page('e01',4,{old:mkq(E1d),neu:mkq(E1d),tm:{"let us sort": 0, "ball and bike": 2.08, "fish and fork": 4.59, "each one hops": 7.07}});
const E1e={
 'listen sun':async(R,S)=>{await R.bg('sunhill1');R.label('Odd one out','#e8505b');const G=S.G=gfx(R);
  enter(R,'pa-leosay',-2.0,LH,{sec:.9}).then(a=>S.leo=a);
  S.a=await drop(R,'pa-sunface',-.8,.25,.7);S.b=await drop(R,'socks',.3,.25,.55);S.c=await enter(R,'dog',1.4,.7,{from:2.9,sec:.8});},
 'sun and socks':async(R,S)=>{S.t1=S.G.tile('s',-.8,1.35,colOf('s'),.45);S.t2=S.G.tile('s',.3,1.35,colOf('s'),.45);await all([tin(R,S.t1,.3),tin(R,S.t2,.3)]);
  await all([glow(R,S.t1,.7),glow(R,S.t2,.7),S.a.jump(.3),S.b.jump(.3)]);R.word('s and s!',-.25,1.95,COL.s,1.1);},
 'dog starts':async(R,S)=>{S.t3=S.G.tile('d',1.4,1.35,'#868e96',.45);await tin(R,S.t3,.3);await all([S.c.shiver(.6),glow(R,S.t3,.6)]);R.word('d?',1.4,1.95,'#868e96',1);},
 'odd one out':async(R,S)=>{R.word('Odd one out!',.6,1.95,'#e8590c',1.3);await all([S.c.go(2.9,.2,1.3,{hops:4}),tout(R,S.t3,.6)]);await S.leo.swap('pa-leocheer',.25,{h:LH});await cheer(R,[S.leo,S.a,S.b],-.3,1.6);await wave(R,[S.t1,S.t2]);}
};
page('e01',5,{old:mkq(E1e),neu:mkq(E1e),tm:{"listen sun": 0, "sun and socks": 3.13, "dog starts": 5.58, "odd one out": 9.09}});
}
P.G1STAGED&&P.G1STAGED.add('e01');
/* ---------- e02 ---------- */
{
const MH=1.45;
/* tiles for a word, with a small "end" or "start" flag */
const flag=(G,txt,x,y,col)=>{const b=blk(G,txt,x,y,col,.26);return b;};
const E2a={
 'say bus':async(R,S)=>{await R.bg('street');R.label('Listen for the last sound','#e8505b');const G=S.G=gfx(R);
  S.mia=await enter(R,'pa-miawave',-1.9,MH,{sec:1.0});
  S.bus=mk(R,'pa-bus',{x:3.0,y:.2,h:.85,face:-1});S.bus.show(.1);R.word('Beep beep!',1.6,1.5,'#c92a2a',.9);await S.bus.go(.7,.2,1.3,{lin:true,wob:.02});R.fx('dust',1.1,.3,10,{w:.8,t:.7});
  S.w=wordTiles(G,'bus',.7,1.55,.45);for(const t of S.w)await tin(R,t,.18);},
 'last sound is s':async(R,S)=>{const t=S.w[2];await all([R.T(1.0,e=>{t.y=1.55+Math.abs(Math.sin(e*Math.PI*2))*.25;t.hl=Math.sin(e*Math.PI);t.s=1+.25*Math.sin(e*Math.PI);}),S.bus.jump(.2)]);S.f1=flag(G0(S),'end',t.x,2.05,'#e8590c');await tin(R,S.f1,.3);R.word('s!',t.x+.5,1.95,COL.s,1);},
 'now say hat':async(R,S)=>{for(const t of S.w)tout(R,t,.3);tout(R,S.f1,.3);S.bus.go(-3.2,.2,1.4,{lin:true});R.word('Vroom!',-.6,1.2,'#c92a2a',.8);
  S.hat=mk(R,'hat',{x:-1.9,y:2.6,h:.4,face:1});await S.hat.show(.1);await fly(R,S.hat,-1.9,1.38,.8,{arc:0,spin:Math.PI*2});S.mia.jump(.2);R.fx('sparkle',-1.9,1.5,12,{w:.4,t:.8});
  S.w2=wordTiles(S.G,'hat',.5,1.4,.5);for(const t of S.w2)await tin(R,t,.18);},
 'last sound is t':async(R,S)=>{const t=S.w2[2];await R.T(1.0,e=>{t.y=1.4+Math.abs(Math.sin(e*Math.PI*2))*.25;t.hl=Math.sin(e*Math.PI);t.s=1+.25*Math.sin(e*Math.PI);});S.f2=flag(S.G,'end',t.x,1.95,'#e8590c');await tin(R,S.f2,.3);R.word('t!',t.x+.5,1.9,COL.t,1);},
 'the end of a word':async(R,S)=>{await S.mia.swap('pa-miacheer',.25,{h:MH});await cheer(R,[S.mia],.3,1.7);await wave(R,S.w2);}
};
const G0=S=>S.G;
page('e02',1,{old:mkq(E2a),neu:mkq(E2a),tm:{"say bus": 0, "last sound is s": 3.66, "now say hat": 5.29, "last sound is t": 7.98, "the end of a word": 9.18}});
const E2b={
 'say drum':async(R,S)=>{await R.bg('playroom1');R.label('Find the last letter','#e8505b');const G=S.G=gfx(R);
  S.mia=await enter(R,'pa-miawave',-1.9,MH,{sec:.9});
  S.dr=await drop(R,'pa-drum',-.6,.2,.7);for(let i=0;i<4;i++){R.word(i%2?'Boom!':'Bam!',-.6+(i%2?.4:-.3),1.4,'#e8590c',.7);R.fx('note',-.6,1.0,3,{w:.4,t:.8});await S.dr.jump(.12);}
  S.w=wordTiles(G,'drum',.75,1.45,.48,3);for(const t of S.w)await tin(R,t,.16);},
 'last sound is m':async(R,S)=>{await all([glow(R,S.w[3],.8),S.dr.jump(.25)]);R.word('m?',S.w[3].x,2.05,COL.m,1);},
 'which letter':async(R,S)=>{S.c=['m','n','b'].map((ch,i)=>S.G.tile(ch,.1+i*.7,2.5,colOf(ch),.42));for(const t of S.c){R.T(.8,e=>{t.y=2.5+(.55-2.5)*(1-Math.pow(1-e,2))+Math.abs(Math.sin(e*Math.PI*2.5))*.2*(1-e);t.s=1;});await R.wait(.25);}S.mia.swap('pa-miathink',.25,{h:MH});},
 'the letter m':async(R,S)=>{await glow(R,S.c[0],.8);R.word('m!',S.c[0].x,1.1,COL.m,1);S.c[1].a=.4;S.c[2].a=.4;},
 'fill the gap':async(R,S)=>{const g=S.w[3];g.gap=false;g.ch='m';g.col=colOf('m');g.a=0;await all([tileFly(R,S.c[0],g.x,g.y,.9,.6),R.T(.9,e=>{g.a=e;})]);S.G.rmTile(S.c[0]);g.a=1;R.T(.5,e=>{S.c[1].a=.4*(1-e);S.c[2].a=.4*(1-e);});
  R.fx('sparkle',.75,1.45,24,{w:1,t:1.2});await S.mia.swap('pa-miacheer',.25,{h:MH});await all([S.dr.jump(.4),S.mia.jump(.35)]);await wave(R,S.w);}
};
page('e02',2,{old:mkq(E2b),neu:mkq(E2b),tm:{"say drum": 0, "last sound is m": 3.42, "which letter": 4.96, "the letter m": 7.33, "fill the gap": 10.3}});
const E2c={
 'pen starts':async(R,S)=>{await R.bg('playroom1');R.label('First and last','#e8505b');const G=S.G=gfx(R);
  S.pn=await drop(R,'pa-pen',-1.2,.2,.7);S.w=wordTiles(G,'pen',-1.2,1.35,.42);for(const t of S.w)await tin(R,t,.15);
  S.f1=blk(G,'start',S.w[0].x,1.85,'#2b8a3e',.24);await all([tin(R,S.f1,.3),glow(R,S.w[0],.8)]);R.word('p!',-1.6,2.1,COL.p,.9);},
 'ends with n':async(R,S)=>{S.f2=blk(S.G,'end',S.w[2].x,1.85,'#e8590c',.24);await all([tin(R,S.f2,.3),glow(R,S.w[2],.8),S.pn.jump(.3)]);R.word('n!',-.7,2.1,'#e8505b',.9);},
 'drum starts':async(R,S)=>{S.dr=await drop(R,'pa-drum',1.1,.2,.7);S.w2=wordTiles(S.G,'drum',1.1,1.35,.42);for(const t of S.w2)await tin(R,t,.15);
  S.f3=blk(S.G,'start',S.w2[0].x,1.85,'#2b8a3e',.24);await all([tin(R,S.f3,.3),glow(R,S.w2[0],.8)]);},
 'ends with m':async(R,S)=>{S.f4=blk(S.G,'end',S.w2[3].x,1.85,'#e8590c',.24);await all([tin(R,S.f4,.3),glow(R,S.w2[3],.8),S.dr.jump(.3)]);R.word('m!',1.7,2.1,COL.m,.9);},
 'both ends':async(R,S)=>{await cheer(R,[S.pn,S.dr],0,1.7);await all([wave(R,[S.w[0],S.w[2]]),wave(R,[S.w2[0],S.w2[3]])]);}
};
page('e02',3,{old:mkq(E2c),neu:mkq(E2c),tm:{"pen starts": 0, "ends with n": 1.62, "drum starts": 2.5, "ends with m": 4.48, "both ends": 6.88}});
const E2d={
 'dog log and frog':async(R,S)=>{await R.bg('forest1');R.label('Same last sound','#e8505b');const G=S.G=gfx(R);
  S.dg=await enter(R,'dog',-1.3,.75,{from:-2.9,sec:.9});S.lg=await drop(R,'log',.1,.2,.5);S.fr=mk(R,'frog',{x:2.9,y:.2,h:.6,face:-1});S.fr.show(.1);await S.fr.go(1.4,.2,.9,{hops:3,arc:.4});
  S.ws=[];for(const[w,x]of[['dog',-1.3],['log',.1],['frog',1.4]]){const ts=wordTiles(G,w,x,1.35,.38);S.ws.push(ts);for(const t of ts)await tin(R,t,.12);}},
 'the last sound is g':async(R,S)=>{const gs=S.ws.map(ts=>ts[ts.length-1]);for(const t of gs){await all([glow(R,t,.45),R.T(.45,e=>{t.y=1.35+Math.sin(e*Math.PI)*.3;})]);}R.word('g g g!',.1,2.05,'#7048e8',1.1);},
 'say them with me':async(R,S)=>{await all([S.dg.jump(.3)]);await all([S.lg.jump(.25)]);await all([S.fr.jump(.35)]);},
 'dog log frog':async(R,S)=>{const gs=S.ws.map(ts=>ts[ts.length-1]);await cheer(R,[S.dg,S.lg,S.fr],.1,1.8);await wave(R,gs);await wave(R,gs);}
};
page('e02',4,{old:mkq(E2d),neu:mkq(E2d),tm:{"dog log and frog": 0, "the last sound is g": 3.74, "say them with me": 5.83, "dog log frog": 7.74}});
const E2e={
 'listen to sun':async(R,S)=>{await R.bg('sunhill1');R.label('Start or end?','#e8505b');const G=S.G=gfx(R);
  S.mia=await enter(R,'pa-miathink',-1.9,MH,{sec:.9});
  S.sn=mk(R,'pa-sunface',{x:-.3,y:-.3,h:.75,face:1});S.sn.show(.2);await S.sn.go(-.3,.3,.9,{arc:.3});R.fx('sparkle',-.3,.7,14,{w:.7,t:.9});
  S.w=wordTiles(G,'sun',.9,1.45,.48);for(const t of S.w)await tin(R,t,.16);
  S.qs=blk(G,'start',.0,2.05,'#2b8a3e',.26);S.qe=blk(G,'end',1.8,2.05,'#e8590c',.26);await all([tin(R,S.qs,.3),tin(R,S.qe,.3)]);},
 'end at the end':async(R,S)=>{const t=S.w[2];await all([glow(R,t,.8),bpulse(R,S.qe,.8)]);G1A(R,S,t.x,S.qe);R.word('At the end!',.9,.9,'#e8590c',1.1);await S.sn.jump(.3);},
 'now listen to nest':async(R,S)=>{for(const t of S.w)tout(R,t,.3);S.sn.hide(.3);S.ar&&(S.ar.a=0);await R.wait(.35);
  S.ns=await drop(R,'nest',-.3,.2,.55);S.w2=wordTiles(S.G,'nest',.9,1.45,.45);for(const t of S.w2)await tin(R,t,.14);},
 'end at the start':async(R,S)=>{const t=S.w2[0];await all([glow(R,t,.8),bpulse(R,S.qs,.8)]);G1A(R,S,t.x,S.qs);R.word('At the start!',.9,.9,'#2b8a3e',1.1);await S.mia.swap('pa-miacheer',.25,{h:MH});await cheer(R,[S.mia,S.ns],.3,1.7);}
};
/* an arrow from a flag down to a tile */
const G1A=(R,S,x,f)=>{S.ar=S.G.add('F',g=>{S.G.arrow(g,f.x,f.y-.15,x,1.75,'#5b4a8a',6);});S.ar.a=0;S.G.fade(S.ar,1,.3);};
page('e02',5,{old:mkq(E2e),neu:mkq(E2e),tm:{"listen to sun": 0, "end at the end": 4.7, "now listen to nest": 6.61, "end at the start": 12.14}});
}
P.G1STAGED&&P.G1STAGED.add('e02');
/* ---------- e03 ---------- */
{
const TH=1.5;
const midTiles=async(R,S,w,x,y,sz)=>{const ts=vTiles(S.G,w,x,y,sz||.42);for(const t of ts){t.s=.2;}for(const t of ts)await tin(R,t,.1);return ts;};
const midHop=(R,t)=>all([R.T(.8,e=>{t.y0=t.y0==null?t.y:t.y0;t.y=t.y0+Math.abs(Math.sin(e*Math.PI*2))*.28;t.hl=Math.sin(e*Math.PI);t.s=1+.25*Math.sin(e*Math.PI);})]);
const E3d={
 'short vowels like':async(R,S)=>{await R.bg('farm23');R.label('Listen for the middle','#e8505b');S.G=gfx(R);
  enter(R,'pa-timlook',-2.0,TH,{sec:1.0}).then(a=>S.tim=a);
  S.hs=[];for(const[i,x]of[-.7,.35,1.4].entries()){const b=blk(S.G,'?',x,1.95,'#adb5bd',.36);S.hs.push(b);tin(R,b,.3);await R.wait(.2);}R.word('Hide and seek!',.5,1.4,'#7048e8',1);},
 'bug has':async(R,S)=>{bout(R,S.hs[0],.3);S.bg=mk(R,'pa-bug',{x:-2.8,y:.2,h:.5,face:1});S.bg.show(.1);S.bg.go(-.7,.2,1.0,{lin:true,hops:6,wob:.05});
  S.w1=await midTiles(R,S,'bug',-.7,1.25,.28);await midHop(R,S.w1[1]);R.word('u!',-.7,1.95,vcol('u'),1);},
 'bed has':async(R,S)=>{bout(R,S.hs[1],.3);S.bd=await drop(R,'pa-bed',.35,.2,.6);S.w2=await midTiles(R,S,'bed',.35,1.25,.28);await midHop(R,S.w2[1]);R.word('e!',.35,1.95,vcol('e'),1);},
 'log has':async(R,S)=>{bout(R,S.hs[2],.3);S.lg=mk(R,'log',{x:2.8,y:.2,h:.45,face:-1});S.lg.show(.1);await S.lg.go(1.4,.2,.8,{wob:.4,waves:2});S.w3=await midTiles(R,S,'log',1.4,1.25,.28);await midHop(R,S.w3[1]);R.word('o!',1.4,1.95,vcol('o'),1);},
 'listen for the middle':async(R,S)=>{S.tim&&S.tim.swap('pa-timcheer',.25,{h:TH});await all([midHop(R,S.w1[1]),midHop(R,S.w2[1]),midHop(R,S.w3[1])]);await cheer(R,[S.tim,S.bg,S.bd,S.lg],.4,1.8);}
};
page('e03',4,{old:mkq(E3d),neu:mkq(E3d),tm:{"short vowels like": 0, "bug has": 2.38, "bed has": 4.52, "log has": 6.61, "listen for the middle": 8.68}});
const E3e={
 'let us sort':async(R,S)=>{await R.bg('playroom1');R.label('Sort the short vowels','#e8505b');const G=S.G=gfx(R);
  enter(R,'pa-timpoint',-2.1,TH,{sec:.9}).then(a=>S.tim=a);
  S.cr=await crates(R,G,['short a','short u'],{xs:[-.6,1.4],cols:[vcol('a'),vcol('u')]});
  S.it={};for(const[k,x,h]of[['hat',-1.0,.35],['pa-map',-.25,.45],['pa-sunface',.6,.5],['pa-bus',1.5,.5]]){S.it[k]=mk(R,k,{x,y:1.6,h,face:1});S.it[k].show(.4,'pop');await R.wait(.18);}},
 'hat and map':async(R,S)=>{R.word('a! a!',-.6,2.05,vcol('a'),1);await intoCrate(R,S.it['hat'],S.cr[0],-.18);await intoCrate(R,S.it['pa-map'],S.cr[0],.2);glow(R,S.cr[0].b,.6);},
 'sun and bus':async(R,S)=>{R.word('u! u!',1.4,2.05,vcol('u'),1);await intoCrate(R,S.it['pa-sunface'],S.cr[1],-.18);await intoCrate(R,S.it['pa-bus'],S.cr[1],.22);glow(R,S.cr[1].b,.6);},
 'into the boxes':async(R,S)=>{S.tim&&S.tim.swap('pa-timcheer',.25,{h:TH});await cheer(R,[S.tim,S.cr[0].c,S.cr[1].c],.4,1.8);}
};
page('e03',5,{old:mkq(E3e),neu:mkq(E3e),tm:{"let us sort": 0, "hat and map": 1.96, "sun and bus": 4.45, "into the boxes": 7.04}});
}
P.G1STAGED&&P.G1STAGED.add('e03');
/* ---------- e04 ---------- */
{
const NH=1.5;
const nameIt=async(R,S,ch,x,col)=>{const t=S.G.tile(ch.toUpperCase(),x,1.95,col,.5);t.s=.2;await tin(R,t,.3);R.word(ch.toUpperCase()+'!',x,1.45,col,1);await glow(R,t,.6);return t;};
const E4c={
 'acorn starts':async(R,S)=>{await R.bg('forest1');R.label('Vowels say their name','#3b5bdb');S.G=gfx(R);
  enter(R,'pa-norawave',-2.1,NH,{sec:.9}).then(a=>S.n=a);
  S.ac=mk(R,'acorn',{x:-.8,y:2.6,h:.5,face:1});await S.ac.show(.1);await fly(R,S.ac,-.8,.2,.6,{arc:0,spin:Math.PI*3});R.fx('crumb',-.8,.3,8,{w:.4,t:.6});S.ac.jump(.25);
  S.t1=await nameIt(R,S,'a',-.8,vcol('a'));},
 'eagle starts':async(R,S)=>{S.eg=mk(R,'eagle',{x:2.9,y:1.6,h:.75,face:-1});S.eg.show(.1);await S.eg.fly(.35,.25,1.1);R.fx('dust',.35,.3,8,{w:.6,t:.6});S.t2=await nameIt(R,S,'e',.35,vcol('e'));},
 'ice starts':async(R,S)=>{S.ic=await drop(R,'ice',1.5,.2,.55,{fx:'sparkle',spin:Math.PI});await S.ic.shiver(.4);R.word('Brrr!',1.5,1.1,'#1c7ed6',.8);S.t3=await nameIt(R,S,'i',1.5,vcol('i'));},
 'each vowel':async(R,S)=>{S.n&&S.n.swap('pa-noracheer'.replace('noracheer','norawave'),.2,{h:NH});await cheer(R,[S.n,S.ac,S.eg,S.ic],.4,1.6);await wave(R,[S.t1,S.t2,S.t3]);}
};
page('e04',3,{old:mkq(E4c),neu:mkq(E4c),tm:{"acorn starts": 0, "eagle starts": 2.12, "ice starts": 4.52, "each vowel": 6.99}});
const E4d={
 'bee and tree':async(R,S)=>{await R.bg('sunhill1');R.label('Long e and long u','#3b5bdb');S.G=gfx(R);
  S.tr=await popIn(R,'tree',-.9,.2,1.1);S.be=mk(R,'bee',{x:2.8,y:1.5,h:.45,face:-1,idle:'flutter'});S.be.show(.1);await S.be.fly(-.5,1.1,1.0);R.word('Bzzz!',-.4,1.7,'#e8a900',.8);
  S.w1=vTiles(S.G,'bee',.6,1.95,.34);S.w2=vTiles(S.G,'tree',.6,1.5,.34);for(const t of S.w1.concat(S.w2)){t.s=.2;tin(R,t,.2);}},
 'hear it e':async(R,S)=>{const es=S.w1.slice(1).concat(S.w2.slice(2));R.word('E!',1.6,1.8,vcol('e'),1.3);await all(es.map(t=>glow(R,t,.8)).concat([S.be.jump(.3)]));},
 'a cube':async(R,S)=>{for(const t of S.w1.concat(S.w2))tout(R,t,.3);S.cb=await drop(R,'pa-cube',.9,.2,.6,{spin:Math.PI*1.5});await S.cb.jump(.3);S.w3=vTiles(S.G,'cube',.9,1.5,.4);for(const t of S.w3){t.s=.2;await tin(R,t,.12);}},
 'hear it u':async(R,S)=>{R.word('U!',1.9,1.7,vcol('u'),1.3);await all([glow(R,S.w3[1],.9),R.T(.9,e=>{S.cb.st.rz=Math.sin(e*Math.PI*2)*.3;S.cb.ap();})]);await cheer(R,[S.cb,S.tr],.4,1.7);}
};
page('e04',4,{old:mkq(E4d),neu:mkq(E4d),tm:{"bee and tree": 0, "hear it e": 1.92, "a cube": 3.73, "hear it u": 6.09}});
const E4e={
 'let us sort':async(R,S)=>{await R.bg('nighthill1');R.label('Long or short?','#3b5bdb');const G=S.G=gfx(R);
  S.cr=await crates(R,G,['long','short'],{xs:[-.7,1.3],cols:['#f59f00','#4c6ef5']});
  S.it={};for(const[k,x,h]of[['pa-cake',-1.2,.45],['rose',-.4,.55],['cat',.5,.5],['frog',1.3,.45]]){S.it[k]=mk(R,k,{x,y:1.6,h,face:1});S.it[k].show(.35,'pop');await R.wait(.12);}},
 'cake and rose':async(R,S)=>{R.word('It says its name!',-.7,2.05,'#f59f00',1.2);await intoCrate(R,S.it['pa-cake'],S.cr[0],-.2);await intoCrate(R,S.it['rose'],S.cr[0],.2);},
 'cat and frog':async(R,S)=>{R.word('Short!',1.3,2.05,'#4c6ef5',1);await intoCrate(R,S.it['cat'],S.cr[1],-.2);await intoCrate(R,S.it['frog'],S.cr[1],.2);},
 'listen for a vowel':async(R,S)=>{await cheer(R,[S.cr[0].c,S.cr[1].c],.3,1.7);await all([glow(R,S.cr[0].b,.6),glow(R,S.cr[1].b,.6)]);}
};
page('e04',5,{old:mkq(E4e),neu:mkq(E4e),tm:{"let us sort": 0, "cake and rose": 1.19, "cat and frog": 4.0, "listen for a vowel": 6.67}});
}
P.G1STAGED&&P.G1STAGED.add('e04');
/* ---------- e05 ---------- */
{
const MH=1.5;
const ok=(R,S,x,y)=>{R.word('Yes!',x,y,'#2b8a3e',1.2);R.fx('sparkle',x,y,18,{w:.6,t:1});};
const no=(R,S,x,y)=>{R.word('No!',x,y,'#e03131',1.2);};
const E5c={
 'do cat and hat':async(R,S)=>{await R.bg('playroom1');R.label('Rhyme or not?','#e8590c');S.G=gfx(R);
  enter(R,'pa-milosing',-2.1,MH,{sec:.9}).then(a=>S.m=a);
  S.ct=await enter(R,'cat',-.6,.7,{from:-2.9,sec:.8});S.ht=await drop(R,'hat',.9,.2,.4);
  S.p1=rtag(S.G,'cat',-.6,1.6,.3,RCOL[0]);S.p2=rtag(S.G,'hat',.9,1.6,.3,RCOL[0]);for(const t of S.p1.concat(S.p2)){t.s=.2;tin(R,t,.2);}},
 'yes both end':async(R,S)=>{ok(R,S,.15,2.05);await all(S.p1.slice(1).concat(S.p2.slice(1)).map(t=>glow(R,t,.8)).concat([S.ct.jump(.3),S.ht.jump(.3)]));R.word('-at',.15,1.15,RCOL[0],1);},
 'do cat and dog':async(R,S)=>{for(const t of S.p2)tout(R,t,.3);S.ht.hide(.3);S.dg=await enter(R,'dog',.9,.7,{from:2.9,sec:.8});S.p3=rtag(S.G,'dog',.9,1.6,.3,'#868e96');for(const t of S.p3){t.s=.2;tin(R,t,.2);}},
 'no dog ends':async(R,S)=>{no(R,S,.15,2.05);await all([S.dg.shiver(.6),S.ct.shiver(.6)]);for(const t of S.p3.slice(1))glow(R,t,.6);R.word('-og',.9,1.15,'#868e96',1);S.m&&S.m.swap('pa-milobow',.25,{h:MH});}
};
page('e05',3,{old:mkq(E5c),neu:mkq(E5c),tm:{"do cat and hat": 0, "yes both end": 1.83, "do cat and dog": 4.24, "no dog ends": 6.59}});
const E5d={
 'change the first':async(R,S)=>{await R.bg('playroom1');R.label('Make a new rhyme','#e8590c');S.G=gfx(R);
  enter(R,'pa-milodance',-2.1,MH,{sec:.9}).then(a=>S.m=a);
  S.it=await drop(R,'box',-.3,.2,.6);S.w=rtag(S.G,'box',.9,1.45,.48,RCOL[1]);for(const t of S.w){t.s=.2;await tin(R,t,.15);}},
 'box becomes fox':async(R,S)=>{const t=S.w[0];await R.T(.35,e=>{t.s=1-e;});t.ch='f';t.col='#7048e8';await R.T(.35,e=>{t.s=e*1.2;});t.s=1;R.fx('sparkle',t.x,1.45,14,{w:.4,t:.8});await S.it.swap('pa-fox',.35,{h:.8});R.word('fox!',-.3,1.3,'#7048e8',1.1);await S.it.jump(.3);},
 'mug becomes bug':async(R,S)=>{for(const t of S.w)tout(R,t,.25);await S.it.swap('mug',.3,{h:.55});S.w=rtag(S.G,'mug',.9,1.45,.48,RCOL[3]);for(const t of S.w){t.s=1;}await R.wait(.6);
  const t=S.w[0];await R.T(.35,e=>{t.s=1-e;});t.ch='b';t.col='#e8590c';await R.T(.35,e=>{t.s=e*1.2;});t.s=1;await S.it.swap('pa-bug',.35,{h:.55});R.word('bug!',-.3,1.3,'#e8590c',1.1);S.it.go(-.1,.2,.8,{hops:5,wob:.05});},
 'same ending':async(R,S)=>{await all(S.w.slice(1).map(t=>glow(R,t,.8)));S.m&&S.m.jump(.35);await cheer(R,[S.m,S.it],.3,1.8);}
};
page('e05',4,{old:mkq(E5d),neu:mkq(E5d),tm:{"change the first": 0, "box becomes fox": 2.38, "mug becomes bug": 4.69, "same ending": 6.81}});
const pair=async(R,S,a,b,x,y,col,ha,hb)=>{const A=await popIn(R,a,x-.35,y,ha||.55);const B=await popIn(R,b,x+.35,y,hb||.55);R.fx('note',x,y+.9,5,{w:.5,t:1.2});await all([A.jump(.3),B.jump(.3)]);return [A,B];};
const E5e={
 'snake and cake':async(R,S)=>{await R.bg('picnic5');R.label('Rhyme time','#e8590c');S.G=gfx(R);
  S.m=mk(R,'pa-milosing',{x:-2.1,y:.2,h:MH,face:1});S.m.show(.3);S.mic=mk(R,'pa-mic',{x:-1.5,y:.2,h:.75,face:1});S.mic.show(.3,'pop');
  S.a=await pair(R,S,'snake','pa-cake',-.8,.2,RCOL[0]);R.word('-ake',-.8,1.2,RCOL[0],1);},
 'bear and chair':async(R,S)=>{S.b=await pair(R,S,'bear','chair',.3,.2,RCOL[1],.65,.6);R.word('-air',.3,1.3,RCOL[1],1);},
 'moon and spoon':async(R,S)=>{S.c=await pair(R,S,'pa-moon','pa-spoon',1.2,.9,RCOL[2],.5,.7);R.word('-oon',1.2,1.9,RCOL[2],1);},
 'rhyming words sound':async(R,S)=>{await S.m.swap('pa-milodance',.25,{h:MH});R.fx('note',0,1.6,14,{w:2.4,t:1.6});await all([].concat(S.a,S.b,S.c,[S.m]).map(a=>a.jump(.3)));await cheer(R,[S.m],0,1.8);}
};
page('e05',5,{old:mkq(E5e),neu:mkq(E5e),tm:{"snake and cake": 0, "bear and chair": 1.39, "moon and spoon": 3.11, "rhyming words sound": 5.07}});
}
P.G1STAGED&&P.G1STAGED.add('e05');
/* ---------- e06 ---------- */
{
const SH=1.5;
const nt=(R,S,w,x,cat,y)=>{const ts=rtag(S.G,w,x,y||1.75,.26,NC[cat]);for(const t of ts){t.s=.2;tin(R,t,.2);}return ts;};
const E6c={
 'look around':async(R,S)=>{await R.bg('park');R.label('Nouns all around','#2b8a3e');S.G=gfx(R);R.fx('leaves'==='x'?'':'sparkle',0,1.6,16,{w:3,t:1.2});
  S.b1=blk(S.G,'nouns?',.2,2.05,'#2b8a3e',.34);await tin(R,S.b1,.3);},
 'a girl':async(R,S)=>{S.g=mk(R,'pa-miawave',{x:-2.9,y:.2,h:1.35,face:1});S.g.show(.1);S.g.go(-1.5,.2,.7,{hops:2});S.t1=nt(R,S,'girl',-1.5,'person',1.6);},
 'a dog':async(R,S)=>{S.d=mk(R,'pa-dog',{x:2.9,y:.2,h:.6,face:-1});S.d.show(.1);S.d.go(-.5,.2,.6,{lin:true,hops:4});R.word('Woof!',-.5,1.0,'#a0522d',.7);S.t2=nt(R,S,'dog',-.5,'animal',1.0);},
 'a tree':async(R,S)=>{S.tr=mk(R,'tree',{x:.6,y:.2,h:1.1,face:1});S.tr.show(.4,'pop');S.t3=nt(R,S,'tree',.6,'thing',1.55);},
 'a ball':async(R,S)=>{S.bl=mk(R,'ball',{x:1.6,y:2.5,h:.4,face:1});S.bl.show(.1);fly(R,S.bl,1.6,.2,.5,{arc:0}).then(()=>S.bl.jump(.4));S.t4=nt(R,S,'ball',1.6,'thing',.95);},
 'every one':async(R,S)=>{await all([S.g.jump(.35),S.d.jump(.35),S.bl.jump(.45)]);bpulse(R,S.b1,.6);S.b1.text='nouns!';await wave(R,[].concat(S.t1,S.t2,S.t3,S.t4));hearts(R,0,1.8,10);}
};
page('e06',3,{old:mkq(E6c),neu:mkq(E6c),tm:{"look around": 0, "a girl": 1.54, "a dog": 2.82, "a tree": 3.44, "a ball": 4.22, "every one": 4.78}});
const E6d={
 'now sort':async(R,S)=>{await R.bg('schoolyard1');R.label('Places and things','#2b8a3e');const G=S.G=gfx(R);
  S.cr=await crates(R,G,['places','things'],{xs:[-.8,1.3],cols:[NC.place,NC.thing],h:.8});
  S.it={};for(const[k,x,h]of[['pa-school',-1.5,.6],['pa-house',-.6,.55],['pa-bluebook',.4,.45],['ball',1.3,.4]]){S.it[k]=mk(R,k,{x,y:1.6,h,face:1});S.it[k].show(.35,'pop');await R.wait(.12);}},
 'a school and a house':async(R,S)=>{R.word('places!',-.8,2.05,NC.place,1);await intoCrate(R,S.it['pa-school'],S.cr[0],-.2);await intoCrate(R,S.it['pa-house'],S.cr[0],.22);},
 'a book and a ball':async(R,S)=>{R.word('things!',1.3,2.05,NC.thing,1);await intoCrate(R,S.it['pa-bluebook'],S.cr[1],-.2);await intoCrate(R,S.it['ball'],S.cr[1],.2);await cheer(R,[S.cr[0].c,S.cr[1].c],.3,1.7);}
};
page('e06',4,{old:mkq(E6d),neu:mkq(E6d),tm:{"now sort": 0, "a school and a house": 2.06, "a book and a ball": 4.7}});
const E6e={
 'is jump a noun':async(R,S)=>{await R.bg('sunhill1');R.label('Noun or not?','#2b8a3e');S.G=gfx(R);
  S.t=await enter(R,'pa-timwave',-1.2,SH,{sec:.8});S.b=blk(S.G,'jump',-1.2,1.95,'#868e96',.4);await tin(R,S.b,.3);
  for(let i=0;i<2;i++)await S.t.jump(.5);},
 'no jump':async(R,S)=>{R.word('No!',-1.2,1.45,'#e03131',1.1);await bcross(R,S.b,.4);R.word('something you do',-.2,1.0,'#868e96',.9);await S.t.jump(.4);},
 'is apple':async(R,S)=>{S.ap=await drop(R,'pa-apple',1.1,.2,.55);S.b2=blk(S.G,'apple',1.1,1.95,NC.thing,.4);await tin(R,S.b2,.3);},
 'yes an apple':async(R,S)=>{R.word('Yes!',1.1,1.45,'#2b8a3e',1.1);await all([bpulse(R,S.b2,.7),S.ap.jump(.4)]);R.word('a thing!',1.1,1.0,NC.thing,.9);await S.t.swap('pa-timcheer',.25,{h:SH});await cheer(R,[S.t,S.ap],.3,1.8);}
};
page('e06',5,{old:mkq(E6e),neu:mkq(E6e),tm:{"is jump a noun": 0, "no jump": 1.46, "is apple": 4.26, "yes an apple": 6.14}});
}
P.G1STAGED&&P.G1STAGED.add('e06');
/* ---------- e07 ---------- */
{
const DH=1.45;
const E7c={
 'find the nouns':async(R,S)=>{await R.bg('park');R.label('Find the nouns','#e8590c');S.G=gfx(R);
  S.s=await sentence(R,S.G,['The','dog','has','a','bone.'],.2,1.95,{col:'#868e96',h:.38});},
 'the dog has':async(R,S)=>{S.d=await enter(R,'pa-dog',-.8,.75,{from:-2.9,sec:.9});S.bn=await drop(R,'pa-bone',.5,.2,.4);S.d.go(.1,.2,.7,{hops:3});R.word('Woof!',.1,1.1,'#a0522d',.8);},
 'dog is a noun':async(R,S)=>{await recolor(R,S.s[1],NC.animal);S.s[1].ul='#2b8a3e';R.word('noun!',S.s[1].x,1.45,NC.animal,1);await S.d.jump(.35);},
 'bone is a noun':async(R,S)=>{await recolor(R,S.s[4],NC.thing);S.s[4].ul='#2b8a3e';R.word('noun!',S.s[4].x,1.45,NC.thing,1);await all([S.bn.jump(.35),S.d.jump(.25)]);hearts(R,.3,1.0,8);}
};
page('e07',3,{old:mkq(E7c),neu:mkq(E7c),tm:{"find the nouns": 0, "the dog has": 2.12, "dog is a noun": 4.24, "bone is a noun": 6.15}});
const E7d={
 'dog is a common':async(R,S)=>{await R.bg('street');R.label('Any dog at all','#e8590c');S.G=gfx(R);
  S.b=blk(S.G,'dog',0,1.95,'#e8590c',.48);await tin(R,S.b,.35);R.word('common noun',0,1.4,'#e8590c',1);},
 'any dog':async(R,S)=>{bpulse(R,S.b,.6);R.fx('sparkle',0,1.95,14,{w:.6,t:.8});},
 'a big dog':async(R,S)=>{S.d1=await enter(R,'dog',-1.3,1.0,{from:-2.9,sec:.6});R.word('big!',-1.3,1.25,'#a0522d',.8);},
 'a small dog':async(R,S)=>{S.d2=await enter(R,'pa-dog',.2,.45,{from:2.9,sec:.6,hops:5});R.word('small!',.2,.85,'#a0522d',.8);},
 'a sleepy dog':async(R,S)=>{S.d3=mk(R,'dog',{x:1.5,y:.2,h:.6,face:-1,idle:'sleep'});S.d3.show(.4,'pop');S.d3.st.rz=-.25;S.d3.ap();R.word('Zzz',1.7,1.0,'#7048e8',.8);},
 'starts with a small':async(R,S)=>{R.word('small d',0,1.45,'#e8590c',1);await all([S.d1.jump(.3),S.d2.jump(.3)]);bpulse(R,S.b,.6);}
};
page('e07',4,{old:mkq(E7d),neu:mkq(E7d),tm:{"dog is a common": 0, "any dog": 3.31, "a big dog": 4.64, "a small dog": 5.61, "a sleepy dog": 6.71, "starts with a small": 8.6}});
const E7e={
 'our home':async(R,S)=>{await R.bg('livingroom');R.label('Nouns at home','#e8590c');S.G=gfx(R);
  S.dad=await enter(R,'pa-dadwave',-2.0,DH,{sec:.9});},
 'a bed':async(R,S)=>{S.bd=await drop(R,'pa-bed',-.8,.2,.6);S.t1=blk(S.G,'bed',-.8,1.25,NC.thing,.32);tin(R,S.t1,.25);},
 'a chair':async(R,S)=>{S.ch=await drop(R,'chair',.1,.2,.6);S.t2=blk(S.G,'chair',.1,1.25,NC.thing,.32);tin(R,S.t2,.25);},
 'a cup':async(R,S)=>{S.cp=await drop(R,'cup',.85,.2,.4);S.t3=blk(S.G,'cup',.85,1.0,NC.thing,.32);tin(R,S.t3,.25);},
 'a clock':async(R,S)=>{S.cl=await drop(R,'alarm_clock',1.45,.2,.45);S.t4=blk(S.G,'clock',1.45,1.05,NC.thing,.32);tin(R,S.t4,.25);R.word('Ring!',1.45,1.6,'#e03131',.8);S.cl.shiver(.6);},
 'can you find':async(R,S)=>{await S.dad.swap('pa-dadpoint',.25,{h:DH});R.word('More nouns?',.2,2.0,'#e8590c',1.2);await cheer(R,[S.bd,S.ch,S.cp,S.cl],.5,1.6);}
};
page('e07',5,{old:mkq(E7e),neu:mkq(E7e),tm:{"our home": 0, "a bed": 2.36, "a chair": 3.54, "a cup": 4.25, "a clock": 4.92, "can you find": 5.51}});
}
P.G1STAGED&&P.G1STAGED.add('e07');
/* ---------- e08 ---------- */
{
const NH=1.5;
const crownOn=async(R,S,t)=>{const cw=mk(R,'pa-crown',{x:t.x,y:2.6,h:.28,face:1});cw.show(.05);await fly(R,cw,t.x,t.y+.3,.45,{arc:0});R.fx('sparkle',t.x,t.y+.3,10,{w:.3,t:.7});return cw;};
const nameRow=async(R,S,word,x,y,sz)=>{sz=sz||.32;const n=word.length,sp=sz*1.08,x0=x-(n-1)*sp/2;const ts=word.split('').map((ch,i)=>{const t=S.G.tile(ch,x0+i*sp,y,i===0?GOLD:'#5c7cfa',i===0?sz*1.2:sz);t.s=.2;return t;});for(const t of ts)await tin(R,t,.06);const cw=await crownOn(R,S,ts[0]);return {ts,cw};};
const E8c={
 'places can':async(R,S)=>{await R.bg('city1');R.label('Names of places','#c2255c');S.G=gfx(R);
  enter(R,'pa-norapoint',-2.0,NH,{sec:.9}).then(a=>S.n=a);},
 'canada':async(R,S)=>{S.ml=await drop(R,'pa-mapleleaf',-.5,1.2,.5,{spin:Math.PI*3,bounce:false});S.r1=await nameRow(R,S,'Canada',.7,1.95);},
 'toronto':async(R,S)=>{S.r2=await nameRow(R,S,'Toronto',.7,1.45);},
 'maple street':async(R,S)=>{S.sg=mk(R,'pa-signpost',{x:1.5,y:-.5,h:.85,face:1});S.sg.show(.15);await S.sg.go(1.5,.2,.5,{arc:.2});R.fx('dust',1.5,.3,8,{w:.6,t:.6});S.r3=await nameRow(R,S,'Maple',.4,.95,.28);},
 'each name':async(R,S)=>{const caps=[S.r1,S.r2,S.r3].map(r=>r.ts[0]);for(const t of caps)glow(R,t,.8);R.word('Capitals!',.6,2.35-.1,GOLD,1.1);S.n&&S.n.jump(.35);hearts(R,.6,1.7,8);}
};
page('e08',3,{old:mkq(E8c),neu:mkq(E8c),tm:{"places can": 0, "canada": 2.45, "toronto": 3.88, "maple street": 5.49, "each name": 7.36}});
const E8d={
 'pets have':async(R,S)=>{await R.bg('livingroom');R.label('Pet names','#c2255c');S.G=gfx(R);
  S.mia=await enter(R,'pa-miawave',-2.0,NH,{sec:.9});R.word('Pets!',-.5,1.7,'#c2255c',1);},
 'the cat is':async(R,S)=>{S.ct=await enter(R,'pa-cat',-.7,.65,{from:2.9,sec:.8});S.r1=await nameRow(R,S,'Biscuit',-.8,1.95,.24);},
 'the dog is':async(R,S)=>{S.dg=await enter(R,'pa-dog',.5,.7,{from:2.9,sec:.7});R.word('Woof!',.5,1.0,'#a0522d',.7);S.r2=await nameRow(R,S,'Rex',.4,1.4,.3);},
 'the fish is':async(R,S)=>{S.fs=mk(R,'pa-goldfish',{x:2.9,y:.5,h:.5,face:-1,idle:'swim'});S.fs.show(.1);await S.fs.go(1.35,.3,.7,{waves:3,wob:.05});R.fx('sparkle',1.35,.9,8,{w:.3,t:.8});S.r3=await nameRow(R,S,'Bubbles',1.0,1.95,.2);},
 'every name':async(R,S)=>{for(const r of [S.r1,S.r2,S.r3])glow(R,r.ts[0],.8);await S.mia.swap('pa-miacheer',.25,{h:NH});await cheer(R,[S.mia,S.ct,S.dg,S.fs],.3,1.8);}
};
page('e08',4,{old:mkq(E8d),neu:mkq(E8d),tm:{"pets have": 0, "the cat is": 1.69, "the dog is": 3.8, "the fish is": 5.84, "every name": 7.96}});
const E8e={
 'let us sort':async(R,S)=>{await R.bg('playroom1');R.label('Common or proper?','#c2255c');const G=S.G=gfx(R);
  S.cr=await crates(R,G,['common','proper'],{xs:[-.9,1.1],cols:['#868e96',GOLD]});
  S.w=[['girl',-1.55,2.05],['city',-.65,2.05],['Mia',.45,2.05],['Ottawa',1.3,2.05]].map(([w,x,y])=>{const b=blk(G,w,x,y,w[0]===w[0].toUpperCase()?'#5c7cfa':'#868e96',.34);tin(R,b,.3);return b;});},
 'girl and city':async(R,S)=>{for(const[i,dx]of[[0,-.25],[1,.25]]){const b=S.w[i];await bfly(R,b,S.cr[0].x+dx,.75,.7,.5);R.fx('dust',S.cr[0].x,.5,6,{w:.4,t:.5});S.cr[0].c.shiver(.3);}R.word('common',-.8,1.6,'#868e96',1);},
 'mia and ottawa':async(R,S)=>{for(const[i,dx]of[[2,-.3],[3,.25]]){const b=S.w[i];await bfly(R,b,S.cr[1].x+dx,.75,.7,.5);R.fx('sparkle',S.cr[1].x,.6,10,{w:.4,t:.6});S.cr[1].c.shiver(.3);const cw=mk(R,'pa-crown',{x:b.x,y:1.4,h:.22,face:1});cw.show(.2,'pop');}
  R.word('proper!',1.1,1.6,GOLD,1.1);await cheer(R,[S.cr[0].c,S.cr[1].c],.3,1.8);}
};
page('e08',5,{old:mkq(E8e),neu:mkq(E8e),tm:{"let us sort": 0, "girl and city": 1.19, "mia and ottawa": 4.09}});
}
P.G1STAGED&&P.G1STAGED.add('e08');
/* ---------- e09 ---------- */
{
const MH=1.45;
const plw=(R,S,w,x,y,plural,sz)=>{sz=sz||.34;const n=w.length+(plural?1:0),sp=sz*1.08,x0=x-(n-1)*sp/2;const ts=w.split('').map((ch,i)=>{const t=S.G.tile(ch,x0+i*sp,y,'#0c8599',sz);t.s=1;return t;});return {ts,sx:x0+w.length*sp,sz};};
const addS=async(R,S,r,y)=>{const t=S.G.tile('s',r.sx,y+.9,PG,r.sz*1.25);t.s=1;await tileFly(R,t,r.sx,y,.45,.2);R.fx('sparkle',r.sx,y,12,{w:.3,t:.7});r.ts.push(t);return t;};
const E9c={
 'one bee':async(R,S)=>{await R.bg('sunhill1');R.label('Count and add s','#e8590c');S.G=gfx(R);S.fl=await popIn(R,'flower',.2,.2,.7);
  S.b=[];const b=mk(R,'bee',{x:-2.8,y:1.3,h:.4,face:1,idle:'flutter'});b.show(.1);S.b.push(b);b.fly(-1.2,1.2,.8);S.r=plw(R,S,'bee',.2,1.95);for(const t of S.r.ts){t.s=.2;tin(R,t,.2);}R.word('one',-1.2,1.65,'#0c8599',.9);},
 'two bees':async(R,S)=>{const b=mk(R,'bee',{x:2.8,y:1.0,h:.4,face:-1,idle:'flutter'});b.show(.1);S.b.push(b);b.fly(-.4,1.0,.8);await addS(R,S,S.r,1.95);R.word('two',-.4,1.45,'#0c8599',.9);},
 'three bees':async(R,S)=>{const b=mk(R,'bee',{x:2.8,y:1.5,h:.4,face:-1,idle:'flutter'});b.show(.1);S.b.push(b);await b.fly(1.2,1.3,.8);R.word('three!',1.2,1.75,'#0c8599',.9);R.word('Bzzz!',.4,.9,'#e8a900',.8);},
 'when there is':async(R,S)=>{await all([glow(R,S.r.ts[3],.8)].concat(S.b.map(b=>b.jump(.25))));R.word('more than one: add s',.2,1.45,PG,1.3);hearts(R,.2,1.0,8);}
};
page('e09',3,{old:mkq(E9c),neu:mkq(E9c),tm:{"one bee": 0, "two bees": 1.08, "three bees": 2.67, "when there is": 4.0}});
const E9d={
 'is ball one':async(R,S)=>{await R.bg('playroom1');R.label('Listen for the s','#e8590c');S.G=gfx(R);
  S.m=await enter(R,'pa-miathink',-2.0,MH,{sec:.8});S.b1=await drop(R,'ball',-.6,.2,.45);S.r=plw(R,S,'ball',-.9,1.95,false,.28);for(const t of S.r.ts){t.s=.2;tin(R,t,.15);}},
 'just one':async(R,S)=>{R.word('just one!',-.9,1.4,'#0c8599',1);await S.b1.jump(.4);},
 'is balls':async(R,S)=>{S.bs=[];for(const[x,y]of[[.7,.2],[1.15,.2],[.95,.55],[1.55,.2]]){const b=mk(R,'ball',{x,y:2.6,h:.4,face:1});b.show(.05);S.bs.push(b);fly(R,b,x,y,.5,{arc:0}).then(()=>b.jump(.2));await R.wait(.12);}
  S.r2=plw(R,S,'ball',.95,1.95,true,.28);for(const t of S.r2.ts){t.s=.2;tin(R,t,.15);}await R.wait(.4);await addS(R,S,S.r2,1.95);},
 'one more than one the':async(R,S)=>{R.word('more than one!',1.0,1.4,'#0c8599',1);await all(S.bs.map(b=>b.jump(.3)));},
 'the s tells':async(R,S)=>{await all([glow(R,S.r2.ts[4],.9),R.T(.9,e=>{const t=S.r2.ts[4];t.s=1+.4*Math.sin(e*Math.PI);})]);await S.m.swap('pa-miacheer',.25,{h:MH});await cheer(R,[S.m],0,1.7);}
};
page('e09',4,{old:mkq(E9d),neu:mkq(E9d),tm:{"is ball one": 0, "just one": 2.27, "is balls": 3.58, "one more than one the": 5.49, "the s tells": 7.5}});
const E9e={
 'let us sort':async(R,S)=>{await R.bg('kitchen-day');R.label('Sort one and many','#e8590c');const G=S.G=gfx(R);
  S.cr=await crates(R,G,['one','many'],{xs:[-.9,1.1],cols:['#0c8599',PG]});
  S.w=[['cup',-1.55],['dog',-.65],['cups',.45],['dogs',1.35]].map(([w,x])=>{const b=blk(G,w,x,2.05,'#0c8599',.34);tin(R,b,.3);return b;});},
 'cup and dog':async(R,S)=>{S.c1=await drop(R,'cup',-1.1,.55,.35,{bounce:false});for(const[i,dx]of[[0,-.25],[1,.25]]){await bfly(R,S.w[i],S.cr[0].x+dx,1.55,.7,.4);S.cr[0].c.shiver(.3);}R.word('singular',-.8,1.05,'#0c8599',1);},
 'cups and dogs':async(R,S)=>{for(const x of[.8,1.1,1.4]){const c=mk(R,'cup',{x,y:2.6,h:.32,face:1});c.show(.05);fly(R,c,x,.55,.45,{arc:0});await R.wait(.1);}for(const[i,dx]of[[2,-.28],[3,.3]]){await bfly(R,S.w[i],S.cr[1].x+dx,1.55,.7,.4);S.cr[1].c.shiver(.3);}R.word('plural',1.1,1.05,PG,1);await cheer(R,[S.cr[0].c,S.cr[1].c],.3,1.9);}
};
page('e09',5,{old:mkq(E9e),neu:mkq(E9e),tm:{"let us sort": 0, "cup and dog": 1.19, "cups and dogs": 3.53}});
}
P.G1STAGED&&P.G1STAGED.add('e09');
P.DIR.mount();
})();
