/* Grade 1 English: staged theory pages (group c). Generated from snippets. ASCII only. */
(function(){
"use strict";
const P=window.PM;if(!P||!P.DIR||!P.G1H||!P.G1X)return;
const page=P.DIR.page;
const {all,pop,liteq,mkq,hearts,gfx,tin,tout,glow,moveT,COL,colOf,wordTiles,fly,tileFly,squash,wave,VC,vcol,vTiles,rtag,ntag,NC,tg,nounTag,ptag,pltag,GOLD,PG,RCOL,rpair}=P.G1H;
const {blk,rowX,sentence,reflow,bfly,bshake,bpulse,bout,bcross,recolor,mk,enter,drop,popIn,cheer,crates,intoCrate,markB,MARKC,speak}=P.G1X;
const rnd=(a,b)=>a+Math.random()*(b-a);
/* ---------- e15 ---------- */
{
const CAP='#e8a900';
/* a block whose first letter is a gold capital: draw as two blocks side by side */
const cw=async(R,S,word,x,y,h)=>{h=h||.36;const b=blk(S.G,word,x,y,'#5c7cfa',h);b.c1=CAP;await tin(R,b,.25);R.fx('sparkle',b.x-b.w()/2+.1,y,8,{w:.2,t:.6});const t={hl:0,s:1};b.t=b;return {b,t:b};};
const col0=w=>'#5c7cfa';
const E15a={
 'days months':async(R,S)=>{await R.bg('schoolyard1');R.label('Capitals for time words','#16a36f');S.G=gfx(R);
  S.k=await enter(R,'pa-norawave',-1.9,1.45,{sec:.8});S.c=blk(S.G,'day  month  holiday',.2,2.05,'#868e96',.32);await tin(R,S.c,.3);},
 'saturday':async(R,S)=>{bout(R,S.c,.3);S.a=await cw(R,S,'Saturday',-.2,1.95);},
 'august':async(R,S)=>{S.sn=mk(R,'pa-sunface',{x:1.3,y:-.3,h:.6,face:1});S.sn.show(.2);S.sn.go(1.3,.7,.8,{arc:.2});S.b=await cw(R,S,'August',.2,1.45);},
 'canada day':async(R,S)=>{S.fl=await popIn(R,'pa-mapleleaf',-.6,.3,.45);S.d=await cw(R,S,'Canada Day',.2,.95,.32);await all([bpulse(R,S.a.b,.7),bpulse(R,S.b.b,.7),bpulse(R,S.d.b,.7)]);await cheer(R,[S.k],.2,1.7);}
};
page('e15',1,{old:mkq(E15a),neu:mkq(E15a),tm:{"days months": 0, "saturday": 4.39, "august": 5.88, "canada day": 7.3}});
const E15b={
 'there are seven':async(R,S)=>{await R.bg('sunhill1');R.label('The days of the week','#16a36f');S.G=gfx(R);
  S.k=await enter(R,'pa-leowave',-2.0,1.4,{sec:.8});S.cal=await popIn(R,'pa-calendar',.9,.2,.7);S.n=blk(S.G,'7 days',-.1,1.3,'#16a36f',.42);await tin(R,S.n,.35);},
 'monday':async(R,S)=>{bout(R,S.n,.3);const D=['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];S.d=D.map((w,i)=>blk(S.G,w,0,i<4?2.0:1.55,'#5c7cfa',.3));
  const r1=S.d.slice(0,4),r2=S.d.slice(4);rowX(r1,-.1).forEach((x,i)=>r1[i].x=x);rowX(r2,-.1).forEach((x,i)=>r2[i].x=x);
  for(const b of S.d){tin(R,b,.22);R.fx('sparkle',b.x,b.y,5,{w:.2,t:.5});await R.wait(.62);}},
 'wednesday':async(R,S)=>{},
 'friday':async(R,S)=>{},
 'sunday':async(R,S)=>{S.sn=mk(R,'pa-sunface',{x:1.4,y:-.3,h:.5,face:1});S.sn.show(.2);await S.sn.go(1.3,.45,.7,{arc:.2});},
 'each one starts':async(R,S)=>{for(const b of S.d){b.c1=CAP;bpulse(R,b,.4);await R.wait(.1);}await wave(R,S.d);await cheer(R,[S.k,S.sn],0,1.7);}
};
page('e15',2,{old:mkq(E15b),neu:mkq(E15b),tm:{"there are seven": 0, "monday": 2.02, "wednesday": 3.91, "friday": 5.43, "sunday": 6.77, "each one starts": 7.27}});
const E15c={
 'my birthday':async(R,S)=>{await R.bg('playroom1');R.label('Fix the month','#16a36f');S.G=gfx(R);
  S.ck=await drop(R,'pa-cake',1.2,.2,.6);S.cal=await popIn(R,'pa-calendar',.3,.2,.6);S.k=await enter(R,'pa-miacheer',-1.9,1.45,{sec:.7});
  S.s=await sentence(R,S.G,['My','birthday','is','in'],-.6,1.95,{h:.32,t:.12});S.j=blk(S.G,'june.',S.s[3].x+.7,1.95,'#e03131',.32);await tin(R,S.j,.3);},
 'june is a month':async(R,S)=>{await bshake(R,S.j,.6);R.word('a month!',S.j.x,1.45,'#e03131',1);},
 'needs a capital':async(R,S)=>{await R.T(.3,e=>{S.j.s=1-e*.9;});S.j.text='June.';S.j.col='#5c7cfa';await R.T(.4,e=>{S.j.s=.1+1.1*e;});S.j.s=1;S.j.c1=CAP;S.jt=S.j;R.fx('sparkle',S.j.x-.2,1.95,12,{w:.3,t:.7});},
 'now it says':async(R,S)=>{await bpulse(R,S.jt,.8);R.fx('heart',1.2,1.0,10,{w:.6,t:1.4});await all([S.ck.jump(.4),S.k.jump(.4)]);}
};
page('e15',3,{old:mkq(E15c),neu:mkq(E15c),tm:{"my birthday": 0, "june is a month": 1.97, "needs a capital": 4.31, "now it says": 5.62}});
const E15d={
 'holidays have':async(R,S)=>{await R.bg('park');R.label('Holidays have names','#16a36f');S.G=gfx(R);
  S.k=await enter(R,'pa-timwave',-1.9,1.45,{sec:.8});},
 'canada day':async(R,S)=>{S.fl=await popIn(R,'flag',-.5,.2,.8);R.fx('sparkle',-.2,1.5,24,{w:1.6,t:1.2});S.a=await cw(R,S,'Canada Day',.6,1.95);},
 'valentines day':async(R,S)=>{S.ht=await popIn(R,'pa-heart',.9,.2,.55);hearts(R,.9,.9,10);S.b=await cw(R,S,"Valentine's Day",.4,1.4,.3);},
 'each word starts':async(R,S)=>{await all([bpulse(R,S.a.b,.8),bpulse(R,S.b.b,.8)]);await cheer(R,[S.k,S.fl,S.ht],.2,1.7);}
};
page('e15',4,{old:mkq(E15d),neu:mkq(E15d),tm:{"holidays have": 0, "canada day": 2.44, "valentines day": 4.11, "each word starts": 6.18}});
const E15e={
 'which one is right':async(R,S)=>{await R.bg('sunhill1');R.label('Which is right?','#16a36f');S.G=gfx(R);
  S.k=await enter(R,'pa-leosay',-1.9,1.4,{sec:.8});},
 'with a small m':async(R,S)=>{S.a=blk(S.G,'monday',-.3,1.8,'#868e96',.42);await tin(R,S.a,.3);},
 'with a capital m':async(R,S)=>{S.b=await cw(R,S,'Monday',1.1,1.8,.42);},
 'monday days always':async(R,S)=>{await bcross(R,S.a,.4);R.word('Yes!',1.1,1.25,'#2b8a3e',1.2);await bpulse(R,S.b.b,.8);await S.k.swap('pa-leocheer',.25,{h:1.4});await cheer(R,[S.k],.3,1.6);}
};
page('e15',5,{old:mkq(E15e),neu:mkq(E15e),tm:{"which one is right": 0, "with a small m": 2.12, "with a capital m": 4.22, "monday days always": 5.46}});
}
P.G1STAGED&&P.G1STAGED.add('e15');
/* ---------- e16 ---------- */
{
const putMark=async(R,S,bs,ch,y)=>{const last=bs[bs.length-1];const p=markB(S.G,ch,2.6,2.6,bs[0].h);p.s=1;await bfly(R,p,last.x+last.w()/2+bs[0].h*.55,y,.7,.4);R.fx('sparkle',p.x,y,12,{w:.3,t:.7});await bpulse(R,p,.5);return p;};
const snow=(R,n)=>{for(let i=0;i<(n||6);i++){const f=mk(R,'snowflake',{x:-1.8+Math.random()*3.4,y:2.5,h:.2,face:1});f.show(.2);f.go(f.st.x+(Math.random()-.5)*.6,.2,2.2+Math.random(),{lin:true,wob:.3,waves:2}).then(()=>f.hide(.4));}};
const E16a={
 'a telling sentence':async(R,S)=>{await R.bg('nighthill1');R.label('Three end marks','#16a36f');S.G=gfx(R);snow(R,6);
  S.m=[];S.m[0]=markB(S.G,'.',-1.1,1.6,.7);await tin(R,S.m[0],.4);S.l0=blk(S.G,'telling',-1.1,1.0,MARKC['.'],.32);await tin(R,S.l0,.3);},
 'an asking sentence':async(R,S)=>{S.m[1]=markB(S.G,'?',.2,1.6,.7);await tin(R,S.m[1],.4);R.T(1,e=>{S.m[1].rot=Math.sin(e*Math.PI*3)*.3;});S.l1=blk(S.G,'asking',.2,1.0,MARKC['?'],.32);await tin(R,S.l1,.3);},
 'a surprising sentence':async(R,S)=>{S.m[2]=markB(S.G,'!',1.25,1.6,.7);await tin(R,S.m[2],.4);R.T(1,e=>{S.m[2].s=1+.3*Math.sin(e*Math.PI*3)*(1-e);});S.l2=blk(S.G,'surprise',1.25,1.0,MARKC['!'],.32);await tin(R,S.l2,.3);snow(R,6);await wave(R,S.m);}
};
page('e16',1,{old:mkq(E16a),neu:mkq(E16a),tm:{"a telling sentence": 0, "an asking sentence": 2.82, "a surprising sentence": 6.89}});
const E16b={
 'is it snowing hmm':async(R,S)=>{await R.bg('nighthill1');R.label('Choose the mark','#16a36f');S.G=gfx(R);snow(R,8);
  S.k=await enter(R,'pa-norawonder',-1.9,1.45,{sec:.7});S.s=await sentence(R,S.G,['Is','it','snowing'],-.1,1.95,{h:.4,t:.12});S.p=await putMark(R,S,S.s,'.',1.95);},
 'that is not right':async(R,S)=>{await bshake(R,S.p,.6);await bcross(R,S.p,.3);R.word('Hmm!',S.p.x,1.4,'#e03131',1);},
 'it asks something':async(R,S)=>{const x=S.p.x;await bfly(R,S.p,x,-.5,.5,.2);S.p.s=0;snow(R,6);S.q=markB(S.G,'?',x,2.7,.4);S.q.s=1;await bfly(R,S.q,x,1.95,.6,.2);R.fx('sparkle',x,1.95,14,{w:.3,t:.8});},
 'mark is it snowing':async(R,S)=>{await bpulse(R,S.q,.6);await S.k.swap('pa-norawave',.25,{h:1.45});await cheer(R,[S.k],.0,1.6);snow(R,8);}
};
page('e16',2,{old:mkq(E16b),neu:mkq(E16b),tm:{"is it snowing hmm": 0, "that is not right": 2.3, "it asks something": 3.55, "mark is it snowing": 6.88}});
const E16c={
 'i made a snowman':async(R,S)=>{await R.bg('nighthill1');R.label('Mark match','#16a36f');S.G=gfx(R);snow(R,6);
  S.sm=await popIn(R,'snowman',1.3,.2,.9);S.k=await enter(R,'pa-timwave',-1.9,1.45,{sec:.6});S.s1=await sentence(R,S.G,['I','made','a','snowman'],-.3,2.05,{h:.3,t:.1});},
 'that gets a period':async(R,S)=>{await putMark(R,S,S.s1,'.',2.05);},
 'do you like':async(R,S)=>{S.s2=await sentence(R,S.G,['Do','you','like','my','snowman'],-.3,1.55,{h:.3,t:.1});},
 'that gets a question':async(R,S)=>{await putMark(R,S,S.s2,'?',1.55);await S.sm.shiver(.4);},
 'it is huge':async(R,S)=>{S.s3=await sentence(R,S.G,['It','is','huge'],-.3,1.05,{h:.3,col:'#e03131',t:.1});S.sm.grow(1.25,1.25,.6);},
 'that gets an exclamation':async(R,S)=>{await putMark(R,S,S.s3,'!',1.05);await S.k.swap('pa-timcheer',.25,{h:1.45});await cheer(R,[S.k,S.sm],0,1.7);}
};
page('e16',3,{old:mkq(E16c),neu:mkq(E16c),tm:{"i made a snowman": 0, "that gets a period": 1.36, "do you like": 3.42, "that gets a question": 5.46, "it is huge": 7.88, "that gets an exclamation": 9.69}});
const E16d={
 'your voice':async(R,S)=>{await R.bg('playroom1');R.label('Use your voice','#16a36f');S.G=gfx(R);
  S.k=await enter(R,'pa-milosing',-1.9,1.45,{sec:.8});S.mic=await popIn(R,'pa-mic',-1.2,.2,.7);},
 'a question goes up':async(R,S)=>{S.q=markB(S.G,'?',.0,1.4,.6);await tin(R,S.q,.3);S.ar=S.G.add('F',g=>{S.G.arrow(g,-.5,1.0,.4,2.0,MARKC['?'],8);});S.ar.a=0;await S.G.fade(S.ar,1,.4);R.word('up!',.4,2.1,MARKC['?'],1);},
 'a strong feeling':async(R,S)=>{S.e=markB(S.G,'!',.7,1.4,.6);await tin(R,S.e,.3);R.word('LOUD!',.7,2.0,MARKC['!'],1.3);await all([R.T(.8,e=>{S.e.s=1+.4*Math.sin(e*Math.PI*2)*(1-e);}),S.k.jump(.5)]);},
 'a telling sentence is calm':async(R,S)=>{S.p=markB(S.G,'.',1.35,1.4,.6);await tin(R,S.p,.3);R.word('calm',1.35,2.0,MARKC['.'],1);await S.k.swap('pa-milobow',.3,{h:1.45});}
};
page('e16',4,{old:mkq(E16d),neu:mkq(E16d),tm:{"your voice": 0, "a question goes up": 2.05, "a strong feeling": 4.72, "a telling sentence is calm": 7.1}});
const E16e={
 'where are my mittens oops':async(R,S)=>{await R.bg('nighthill1');R.label('Fix the mark','#16a36f');S.G=gfx(R);snow(R,6);
  S.k=await enter(R,'pa-norawonder',-1.9,1.45,{sec:.6});S.s=await sentence(R,S.G,['Where','are','my','mittens'],-.2,1.95,{h:.34,t:.1});S.p=await putMark(R,S,S.s,'.',1.95);R.word('Oops!',S.p.x,1.45,'#e03131',1);},
 'that asks something':async(R,S)=>{await bshake(R,S.p,.5);await bcross(R,S.p,.3);},
 'so it needs':async(R,S)=>{const x=S.p.x;await bfly(R,S.p,x,-.5,.5,.2);S.p.s=0;S.q=markB(S.G,'?',x,2.7,.34);S.q.s=1;await bfly(R,S.q,x,1.95,.6,.2);R.fx('sparkle',x,1.95,14,{w:.3,t:.8});},
 'mark where are my mittens':async(R,S)=>{S.mt=await drop(R,'pa-mitten',.5,.2,.5);S.mt2=await drop(R,'pa-mitten',1.0,.2,.5);await S.k.swap('pa-norawave',.25,{h:1.45});await cheer(R,[S.k,S.mt,S.mt2],.3,1.6);}
};
page('e16',5,{old:mkq(E16e),neu:mkq(E16e),tm:{"where are my mittens oops": 0, "that asks something": 2.4, "so it needs": 3.83, "mark where are my mittens": 5.32}});
}
P.G1STAGED&&P.G1STAGED.add('e16');
/* ---------- e17 ---------- */
{
const SUBJ='#1c7ed6',REST='#868e96';
/* draw a box (lasso) around the subject blocks */
const lasso=(R,S,bs,col)=>{const x0=bs[0].x-bs[0].w()/2-.08,x1=bs[bs.length-1].x+bs[bs.length-1].w()/2+.08,y=bs[0].y,h=bs[0].h/2+.1;const it=S.G.add('F',g=>{g.save();g.strokeStyle=col||SUBJ;g.lineWidth=7;g.setLineDash([14,8]);g.beginPath();g.roundRect(S.G.X(x0),S.G.Y(y+h),(x1-x0)*S.G.PX,2*h*S.G.PX,24);g.stroke();g.restore();});it.a=0;S.G.fade(it,1,.4);return it;};
const subjTag=async(R,S,bs)=>{for(const b of bs)b.col=SUBJ;await all(bs.map(b=>bpulse(R,b,.6)));const l=lasso(R,S,bs);const x=(bs[0].x+bs[bs.length-1].x)/2;const t=blk(S.G,'subject',x,bs[0].y-.48,SUBJ,.26);await tin(R,t,.3);return {l,t};};
const E17a={
 'the dog runs fast':async(R,S)=>{await R.bg('park');R.label('Who is it about?','#16a36f');S.G=gfx(R);
  S.dg=mk(R,'pa-dog',{x:-2.8,y:.2,h:.6,face:1});S.dg.show(.1);S.dg.go(1.4,.2,1.8,{lin:true,hops:8});R.fx('dust',0,.3,10,{w:2,t:.8});S.s=await sentence(R,S.G,['The','dog','runs','fast.'],0,1.95,{h:.4,col:REST,t:.12});},
 'who is this':async(R,S)=>{S.k=await enter(R,'pa-miathink',-1.9,1.45,{sec:.6});R.word('Who?',-1.3,1.7,SUBJ,1.1);},
 'the dog the dog':async(R,S)=>{S.t=await subjTag(R,S,S.s.slice(0,2));await S.dg.jump(.4);},
 'is the subject':async(R,S)=>{await S.k.swap('pa-miacheer',.25,{h:1.45});R.word('The subject!',.2,1.0,SUBJ,1.2);await cheer(R,[S.k,S.dg],.3,1.6);}
};
page('e17',1,{old:mkq(E17a),neu:mkq(E17a),tm:{"the dog runs fast": 0, "who is this": 1.76, "the dog the dog": 4.19, "is the subject": 6.95}});
const E17b={
 'anna reads':async(R,S)=>{await R.bg('livingroom');R.label('Change the subject','#16a36f');S.G=gfx(R);
  S.a=await enter(R,'pa-avawave',-.8,1.25,{sec:.8});S.bk=await popIn(R,'pa-bluebook',-.4,.65,.35);S.s=await sentence(R,S.G,['Anna','reads','a','book.'],.1,1.95,{h:.4,cols:[SUBJ,REST,REST,REST],t:.12});},
 'now change':async(R,S)=>{const b=S.s[0];await bfly(R,b,b.x,2.8,.5,.1);b.s=0;await S.a.go(-2.9,.2,.8,{hops:3});S.bk.hide(.2);},
 'grandpa reads':async(R,S)=>{S.g=await enter(R,'grandpa',-.8,1.3,{sec:.8});S.bk2=await popIn(R,'pa-bluebook',-.4,.7,.35);const nb=blk(S.G,'Grandpa',0,2.8,SUBJ,.4);nb.s=1;const all2=[nb].concat(S.s.slice(1));const xs=rowX(all2,.1);
  nb.x=xs[0];await all([bfly(R,nb,xs[0],1.95,.6,.1)].concat(S.s.slice(1).map((b,i)=>{const x0=b.x;return R.T(.6,e=>{b.x=x0+(xs[i+1]-x0)*e;});})));S.nb=nb;R.fx('sparkle',xs[0],1.95,12,{w:.4,t:.7});},
 'the rest stays':async(R,S)=>{await all(S.s.slice(1).map(b=>bpulse(R,b,.7)));R.word('same!',.6,1.4,REST,1);await S.g.jump(.3);}
};
page('e17',2,{old:mkq(E17b),neu:mkq(E17b),tm:{"anna reads": 0, "now change": 1.52, "grandpa reads": 3.89, "the rest stays": 6.09}});
const E17c={
 'the sun shines':async(R,S)=>{await R.bg('sunhill1');R.label('Things can be subjects','#16a36f');S.G=gfx(R);
  S.sn=mk(R,'pa-sunface',{x:.4,y:-.4,h:.8,face:1});S.sn.show(.2);S.sn.go(.4,.7,1.0,{arc:.2});R.fx('sparkle',.4,1.1,24,{w:1,t:1.4});S.s=await sentence(R,S.G,['The','sun','shines.'],0,1.95,{h:.4,col:REST,t:.14});},
 'what is it about':async(R,S)=>{R.word('What?',-1.0,1.4,SUBJ,1.1);await R.wait(.3);},
 'the sun a subject':async(R,S)=>{S.t=await subjTag(R,S,S.s.slice(0,2));await S.sn.jump(.3);},
 'a person an animal':async(R,S)=>{const k=await popIn(R,'kid2',-1.6,.2,1.0);const d=await popIn(R,'pa-cat',-.7,.2,.55);const b=await popIn(R,'ball',1.5,.2,.4);await cheer(R,[k,d,b,S.sn],0,1.5);}
};
page('e17',3,{old:mkq(E17c),neu:mkq(E17c),tm:{"the sun shines": 0, "what is it about": 1.42, "the sun a subject": 3.3, "a person an animal": 6.54}});
const E17d={
 'my sister sings':async(R,S)=>{await R.bg('playroom1');R.label('Find the subject','#16a36f');S.G=gfx(R);
  S.k=await enter(R,'pa-miawave',-.6,1.45,{sec:.8});R.fx('note',-.4,1.6,10,{w:.8,t:1.4});S.s=await sentence(R,S.G,['My','sister','sings.'],.4,1.95,{h:.4,col:REST,t:.14});},
 'who sings':async(R,S)=>{R.word('Who sings?',.4,1.4,SUBJ,1.1);R.fx('note',-.4,1.6,8,{w:.8,t:1.2});await S.k.jump(.3);},
 'my sister the':async(R,S)=>{S.t=await subjTag(R,S,S.s.slice(0,2));},
 'the subject is':async(R,S)=>{await S.k.swap('pa-miacheer',.25,{h:1.45});await cheer(R,[S.k],-.4,1.7);}
};
page('e17',4,{old:mkq(E17d),neu:mkq(E17d),tm:{"my sister sings": 0, "who sings": 1.56, "my sister the": 3.04, "the subject is": 3.92}});
const E17e={
 'mom and i bake':async(R,S)=>{await R.bg('kitchen-day');R.label('Two in the subject','#16a36f');S.G=gfx(R);
  S.m=await enter(R,'pa-momstir',-1.6,1.4,{sec:.8,y:-.05});S.k=await enter(R,'pa-miawave',-.8,1.25,{sec:.8});S.ck=await drop(R,'pa-cake',.9,.2,.6);S.s=await sentence(R,S.G,['Mom','and','I','bake','a','cake.'],.1,1.95,{h:.34,col:REST,t:.1});},
 'who bakes':async(R,S)=>{R.word('Who bakes?',.3,1.4,SUBJ,1.1);await S.ck.shiver(.4);},
 'mom and i a':async(R,S)=>{S.t=await subjTag(R,S,S.s.slice(0,3));await all([S.m.jump(.3),S.k.jump(.3)]);},
 'a subject can have':async(R,S)=>{R.word('Two people!',.2,.95,SUBJ,1.2);await cheer(R,[S.m,S.k,S.ck],-.4,1.6);}
};
page('e17',5,{old:mkq(E17e),neu:mkq(E17e),tm:{"mom and i bake": 0, "who bakes": 1.81, "mom and i a": 3.26, "a subject can have": 4.16}});
}
P.G1STAGED&&P.G1STAGED.add('e17');
/* ---------- e18 ---------- */
{
const PRO='#c2255c',NOUN='#1c7ed6';
/* a noun block that turns into a pronoun block */
const swapTo=async(R,b,word)=>{await R.T(.3,e=>{b.s=1-e*.9;b.rot=e*Math.PI;});b.text=word;b.col=PRO;await R.T(.35,e=>{b.s=.1+1.1*e;b.rot=Math.PI*(1-e);});b.rot=0;b.s=1;await bpulse(R,b,.4);};
const E18a={
 'grandpa can become':async(R,S)=>{await R.bg('farm23');R.label('Pronouns replace nouns','#2f7de1');S.G=gfx(R);
  S.g=await enter(R,'grandpa',-1.6,1.3,{sec:.8});S.b1=blk(S.G,'Grandpa',-1.6,1.95,NOUN,.34);await tin(R,S.b1,.25);await R.wait(.4);await swapTo(R,S.b1,'he');R.fx('sparkle',-1.6,1.95,10,{w:.3,t:.6});},
 'grandma can become':async(R,S)=>{S.m=await enter(R,'grandma',-.5,1.25,{from:2.9,sec:.8});S.b2=blk(S.G,'Grandma',-.5,1.95,NOUN,.34);await tin(R,S.b2,.25);await R.wait(.3);await swapTo(R,S.b2,'she');},
 'the turnip':async(R,S)=>{S.t=await drop(R,'pa-turnip',.6,.2,.75);S.b3=blk(S.G,'the turnip',.6,1.95,NOUN,.3);await tin(R,S.b3,.25);await R.wait(.3);await swapTo(R,S.b3,'it');},
 'the family':async(R,S)=>{S.k=await enter(R,'kid1',1.5,1.0,{from:2.9,sec:.6});S.b4=blk(S.G,'the family',.4,1.35,NOUN,.3);await tin(R,S.b4,.25);await R.wait(.3);await swapTo(R,S.b4,'they');await cheer(R,[S.g,S.m,S.k,S.t],0,1.7);}
};
page('e18',1,{old:mkq(E18a),neu:mkq(E18a),tm:{"grandpa can become": 0, "grandma can become": 1.89, "the turnip": 4.21, "the family": 6.43}});
const E18b={
 'leo is happy':async(R,S)=>{await R.bg('schoolyard1');R.label('He and she','#2f7de1');S.G=gfx(R);
  S.l=await enter(R,'pa-leocheer',-1.5,1.4,{sec:.8});S.s1=await sentence(R,S.G,['Leo','is','happy.'],.4,1.95,{h:.36,cols:[NOUN],t:.12});},
 'he is happy':async(R,S)=>{await swapTo(R,S.s1[0],'He');await S.l.jump(.4);},
 'mia is tall':async(R,S)=>{S.m=await enter(R,'pa-miawave',-.4,1.55,{from:2.9,sec:.7});S.m.grow(1,1.12,.5);S.s2=await sentence(R,S.G,['Mia','is','tall.'],.6,1.4,{h:.36,cols:[NOUN],t:.12});},
 'she is tall':async(R,S)=>{await swapTo(R,S.s2[0],'She');await S.m.jump(.3);},
 'he and she take':async(R,S)=>{await all([bpulse(R,S.s1[0],.7),bpulse(R,S.s2[0],.7)]);R.word('instead of names!',.4,.95,PRO,1.2);await cheer(R,[S.l,S.m],-.6,1.7);}
};
page('e18',2,{old:mkq(E18b),neu:mkq(E18b),tm:{"leo is happy": 0, "he is happy": 1.36, "mia is tall": 3.06, "she is tall": 4.88, "he and she take": 6.44}});
const E18c={
 'the ball is red':async(R,S)=>{await R.bg('park');R.label('It and they','#2f7de1');S.G=gfx(R);
  S.bl=await drop(R,'ball',-1.2,.2,.5);S.s1=await sentence(R,S.G,['The','ball','is','red.'],-.2,1.95,{h:.34,cols:[NOUN,NOUN],t:.1});},
 'it is red':async(R,S)=>{const b=S.s1[0];bout(R,S.s1[1],.2);S.s1[1].s=0;await swapTo(R,b,'It');await reflow(R,[b,S.s1[2],S.s1[3]],-.2,1.95,.5);await S.bl.jump(.4);},
 'the birds sing':async(R,S)=>{S.bd=[];for(const[x,y]of[[.6,1.0],[1.1,1.25],[1.5,.9]]){const b=mk(R,'bird',{x:2.9,y,h:.35,face:-1,idle:'flutter'});b.show(.1);b.fly(x,y,.8);S.bd.push(b);await R.wait(.15);}R.fx('note',1.0,1.4,8,{w:.8,t:1.2});S.s2=await sentence(R,S.G,['The','birds','sing.'],-.2,1.4,{h:.34,cols:[NOUN,NOUN],t:.1});},
 'they sing':async(R,S)=>{const b=S.s2[0];bout(R,S.s2[1],.2);S.s2[1].s=0;await swapTo(R,b,'They');await reflow(R,[b,S.s2[2]],-.2,1.4,.5);R.fx('note',1.0,1.4,8,{w:.8,t:1.2});},
 'it is for one':async(R,S)=>{R.word('it = one',-1.0,.85,PRO,1);await S.bl.jump(.3);R.word('they = many',.8,.6+.25,PRO,1);await all(S.bd.map(b=>b.jump(.25)));}
};
page('e18',3,{old:mkq(E18c),neu:mkq(E18c),tm:{"the ball is red": 0, "it is red": 1.45, "the birds sing": 3.08, "they sing": 4.9, "it is for one": 6.41}});
const E18d={
 'when i talk about me i':async(R,S)=>{await R.bg('schoolyard1');R.label('I and we','#2f7de1');S.G=gfx(R);
  S.k=await enter(R,'pa-timpoint',-.6,1.45,{sec:.8});},
 'i say i':async(R,S)=>{S.i=blk(S.G,'I',-.6,1.95,PRO,.5);await tin(R,S.i,.3);await S.k.jump(.3);},
 'me and my friends':async(R,S)=>{S.f1=await enter(R,'pa-miawave',.5,1.4,{from:2.9,sec:.6});S.f2=await enter(R,'kid0',1.4,1.1,{from:2.9,sec:.6});},
 'i say we':async(R,S)=>{await swapTo(R,S.i,'we');await bfly(R,S.i,.4,1.95,.5,.2);},
 'we play together':async(R,S)=>{S.bl=await drop(R,'ball',.4,.2,.35);await fly(R,S.bl,1.2,.2,.6,{arc:.8});await fly(R,S.bl,-.3,.2,.6,{arc:.8});await cheer(R,[S.k,S.f1,S.f2],.4,1.6);}
};
page('e18',4,{old:mkq(E18d),neu:mkq(E18d),tm:{"when i talk about me i": 0, "i say i": 1.78, "me and my friends": 4.17, "i say we": 5.47, "we play together": 6.12}});
const E18e={
 'the apples are ripe':async(R,S)=>{await R.bg('farm23');R.label('Swap the noun','#2f7de1');S.G=gfx(R);
  S.tr=await popIn(R,'apple_tree',-1.3,.2,1.3);S.ap=[];for(const x of[.5,.9,1.3]){const a=await drop(R,'pa-apple',x,.2,.4);S.ap.push(a);}
  S.s1=await sentence(R,S.G,['The','apples','are','ripe.'],-.1,1.95,{h:.34,cols:[NOUN,NOUN],t:.1});},
 'they are red':async(R,S)=>{S.s2=await sentence(R,S.G,['They','are','red.'],-.1,1.4,{h:.34,cols:[PRO],t:.1});},
 'the word they':async(R,S)=>{const a=S.s1.slice(0,2),t=S.s2[0];for(const b of a){b.col=NOUN;bpulse(R,b,.6);}await bpulse(R,t,.6);S.ar=S.G.add('F',g=>{S.G.arrow(g,t.x,1.6,(a[0].x+a[1].x)/2,1.75,PRO,6);});S.ar.a=0;await S.G.fade(S.ar,1,.3);R.word('they = the apples',-.1,.9,PRO,1.2);await all(S.ap.map(x=>x.jump(.3)));}
};
page('e18',5,{old:mkq(E18e),neu:mkq(E18e),tm:{"the apples are ripe": 0, "they are red": 1.62, "the word they": 3.27}});
}
P.G1STAGED&&P.G1STAGED.add('e18');
/* ---------- e19 ---------- */
{
const VERB='#e8590c';
const act=async(R,S,word,x,y)=>{const b=blk(S.G,word,x,y,VERB,.36);await tin(R,b,.2);R.fx('sparkle',x,y,8,{w:.3,t:.6});return b;};
const E19a={
 'a verb tells':async(R,S)=>{await R.bg('schoolyard1');R.label('Verbs are actions','#2f7de1');S.G=gfx(R);
  S.v=blk(S.G,'verb = action!',.2,2.05,VERB,.36);await tin(R,S.v,.3);},
 'run':async(R,S)=>{bout(R,S.v,.2);S.dg=mk(R,'pa-dog',{x:-2.8,y:.2,h:.55,face:1});S.dg.show(.1);S.dg.go(-1.3,.2,.6,{lin:true,hops:4});S.b1=await act(R,S,'run',-1.3,1.3);},
 'swim':async(R,S)=>{S.sw=mk(R,'swimmer',{x:-.4,y:.3,h:.75,face:1,idle:'swim'});S.sw.show(.3,'pop');S.sw.go(-.2,.35,.6,{waves:2,wob:.08});S.b2=await act(R,S,'swim',-.35,1.3);},
 'sing':async(R,S)=>{S.sg=await popIn(R,'pa-milosing',.6,.2,1.05);R.fx('note',.6,1.2,8,{w:.6,t:1.2});S.b3=await act(R,S,'sing',.6,1.55);},
 'dance':async(R,S)=>{S.dc=await popIn(R,'pa-miacheer',1.45,.2,1.05);S.dc.wag(.8,.12,4);S.b4=await act(R,S,'dance',1.4,1.55);},
 'these are all':async(R,S)=>{await all([S.dg.jump(.3),S.sw.jump(.2),S.sg.jump(.3),S.dc.jump(.4)]);await wave(R,[S.b1,S.b2,S.b3,S.b4]);R.word('action words!',.1,2.05,VERB,1.2);}
};
page('e19',1,{old:mkq(E19a),neu:mkq(E19a),tm:{"a verb tells": 0, "run": 2.11, "swim": 3.37, "sing": 4.7, "dance": 6.0, "these are all": 7.38}});
const E19b={
 'we walk to school':async(R,S)=>{await R.bg('street');R.label('Find the verb','#2f7de1');S.G=gfx(R);
  S.sc=await popIn(R,'pa-school',1.4,.2,.9);S.a=mk(R,'pa-leowave',{x:-2.8,y:.2,h:1.3,face:1});S.b=mk(R,'pa-miawave',{x:-3.3,y:.2,h:1.3,face:1});S.a.show(.1);S.b.show(.1);S.a.walk(-.6,.2,2.0);S.b.walk(-1.2,.2,2.0);
  S.s=await sentence(R,S.G,['We','walk','to','school.'],0,1.95,{h:.4,col:'#868e96',t:.14});},
 'what do we do':async(R,S)=>{R.word('What do we do?',0,1.4,VERB,1.1);await R.wait(.4);},
 'we walk walk':async(R,S)=>{await recolor(R,S.s[1],VERB);S.s[1].ul=VERB;S.a.walk(.3,.2,1.2);S.b.walk(-.3,.2,1.2);},
 'so walk is the verb':async(R,S)=>{R.word('verb!',S.s[1].x,1.4,VERB,1.2);await R.T(.8,e=>{S.s[1].y=1.95+Math.sin(e*Math.PI*2)*.12;});await cheer(R,[S.a,S.b],0,1.6);}
};
page('e19',2,{old:mkq(E19b),neu:mkq(E19b),tm:{"we walk to school": 0, "what do we do": 1.37, "we walk walk": 2.98, "so walk is the verb": 6.62}});
const E19c={
 'jump':async(R,S)=>{await R.bg('playroom1');R.label('Act it out','#2f7de1');S.G=gfx(R);
  S.k=await enter(R,'pa-timcheer',-1.4,1.45,{sec:.6});S.b1=await act(R,S,'Jump!',-1.4,2.05);await S.k.jump(.6);},
 'clap':async(R,S)=>{S.m=await popIn(R,'pa-miacheer',-.3,.2,1.35);S.b2=await act(R,S,'Clap!',-.3,2.05);for(let i=0;i<3;i++){R.word('clap',-.3,1.3,VERB,.6);await S.m.shiver(.25);}},
 'wave':async(R,S)=>{S.l=await popIn(R,'pa-leowave',.75,.2,1.35);S.b3=await act(R,S,'Wave!',.75,2.05);await S.l.wag(.9,.12,3);},
 'hop':async(R,S)=>{S.fr=mk(R,'frog',{x:2.8,y:.2,h:.5,face:-1});S.fr.show(.1);S.b4=await act(R,S,'Hop!',1.5,1.55);await S.fr.go(1.5,.2,.8,{hops:3,arc:.5});},
 'can you do':async(R,S)=>{R.word('You try!',0,1.35,VERB,1.2);await all([S.k.jump(.5),S.m.jump(.4),S.l.jump(.4),S.fr.jump(.5)]);},
 'every one of them':async(R,S)=>{await wave(R,[S.b1,S.b2,S.b3,S.b4]);R.word('All verbs!',0,1.35,VERB,1.2);hearts(R,0,1.7,10);}
};
page('e19',3,{old:mkq(E19c),neu:mkq(E19c),tm:{"jump": 0, "clap": 0.66, "wave": 1.2, "hop": 1.73, "can you do": 2.71, "every one of them": 4.52}});
const E19d={
 'a bird flies':async(R,S)=>{await R.bg('forest1');R.label('Animal actions','#2f7de1');S.G=gfx(R);
  S.bd=mk(R,'bird',{x:-2.8,y:1.5,h:.45,face:1,idle:'flutter'});S.bd.show(.1);S.bd.fly(-1.3,1.3,1.0);S.b1=await act(R,S,'flies',-1.3,1.9);},
 'a fish swims':async(R,S)=>{S.fs=mk(R,'fish',{x:2.8,y:.35,h:.4,face:-1,idle:'swim'});S.fs.show(.1);S.fs.swim(-.4,.35,1.0);R.fx('sparkle',-.4,.5,8,{w:.4,t:.7});S.b2=await act(R,S,'swims',-.4,1.0);},
 'a frog hops':async(R,S)=>{S.fr=mk(R,'frog',{x:-2.8,y:.2,h:.45,face:1});S.fr.show(.1);S.fr.go(.6,.2,1.0,{hops:3,arc:.5});S.b3=await act(R,S,'hops',.6,1.0);},
 'a snake slides':async(R,S)=>{S.sn=mk(R,'snake',{x:2.8,y:.2,h:.45,face:-1});S.sn.show(.1);S.sn.slither(1.5,.2,1.0);S.b4=await act(R,S,'slides',1.4,1.0);},
 'flies swims hops':async(R,S)=>{await wave(R,[S.b1,S.b2,S.b3,S.b4]);await all([S.bd.jump(.2),S.fs.jump(.2),S.fr.jump(.4),S.sn.jump(.2)]);R.word('verbs!',.2,1.6,VERB,1.2);}
};
page('e19',4,{old:mkq(E19d),neu:mkq(E19d),tm:{"a bird flies": 0, "a fish swims": 1.49, "a frog hops": 3.33, "a snake slides": 5.18, "flies swims hops": 7.18}});
const E19e={
 'is kick a verb':async(R,S)=>{await R.bg('park');R.label('Verb or not?','#2f7de1');S.G=gfx(R);
  S.k=await enter(R,'pa-leowave',-1.5,1.4,{sec:.7});S.bl=await drop(R,'ball',-.8,.2,.4);S.b1=blk(S.G,'kick',-.8,1.95,'#868e96',.4);await tin(R,S.b1,.3);},
 'yes you can kick':async(R,S)=>{S.b1.col=VERB;bpulse(R,S.b1,.5);R.word('Yes!',-.8,1.45,'#2b8a3e',1.1);await fly(R,S.bl,1.6,.2,.9,{arc:1.0,spin:Math.PI*4});R.word('Kick!',.5,1.4,VERB,.9);},
 'is chair a verb':async(R,S)=>{S.ch=await drop(R,'chair',.7,.2,.7);S.b2=blk(S.G,'chair',.7,1.95,'#868e96',.4);await tin(R,S.b2,.3);},
 'no you cannot':async(R,S)=>{R.word('No!',.7,1.45,'#e03131',1.1);await bcross(R,S.b2,.4);await S.k.shiver(.4);},
 'a chair is a thing':async(R,S)=>{R.word('a thing',.7,1.0,'#7048e8',1);await S.ch.jump(.2);}
};
page('e19',5,{old:mkq(E19e),neu:mkq(E19e),tm:{"is kick a verb": 0, "yes you can kick": 1.38, "is chair a verb": 3.89, "no you cannot": 5.73, "a chair is a thing": 7.95}});
}
P.G1STAGED&&P.G1STAGED.add('e19');
P.DIR.mount();
})();
