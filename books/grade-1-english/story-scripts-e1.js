/* Grade 1 English, lessons 1-5: story and theory pages staged as short clay films. ASCII only. */
(function(){
"use strict";
const P=window.PM;if(!P||!P.DIR)return;
const page=P.DIR.page;
/* the staged pages drive their own action, so the old per-step cue lists of these lessons are dropped */
const STAGED=/^e0[1-5]$/;const U0=P.unit;P.unit=function(d){if(d&&STAGED.test(d.id)&&d.steps)d.steps.forEach(st=>{st.cues=[];});return U0.apply(this,arguments);};
const all=ps=>Promise.all(ps);
const pop=async(R,k,o,t)=>{const a=R.act(k,o);a.st.op=0;a.ap();await a.show(t||.45,'pop');return a;};
const liteq=f=>(R,S)=>{const prev=S._q||Promise.resolve();const p=prev.then(()=>f(R,S));S._q=p.catch(()=>0);p.catch(e=>{if(e)console.error(e);});return Promise.race([p.catch(()=>0),R.wait(.7)]);};
const mkq=L=>Object.keys(L).map(k=>[k,liteq(L[k])]);
const hearts=(R,x,y,n)=>R.fx('heart',x,y,n||8,{w:.8,t:1.6});
/* canvas overlay for letter tiles, labels and arrows (world coordinates, two layers: behind and in front of the clay actors) */
const gfx=(R)=>{const T=window.THREE,PX=200,X0=-2.2,W=Math.round(4.1*PX),H=Math.round(2.15*PX);
 const mk=ro=>{const c=document.createElement('canvas');c.width=W;c.height=H;const g=c.getContext('2d');const m=new T.Mesh(new T.PlaneGeometry(W/PX,H/PX),new T.MeshBasicMaterial({map:new T.CanvasTexture(c),transparent:true,depthTest:false,depthWrite:false}));m.position.set(X0+W/PX/2,H/PX/2,.03);m.renderOrder=ro;R.root.add(m);R.own(m);return {c,g,m};};
 const B=mk(4),F=mk(14);const G={items:[],X:x=>(x-X0)*PX,Y:y=>H-y*PX,PX};
 G.add=(layer,fn)=>{const it={layer,fn,a:1};G.items.push(it);return it;};
 G.rm=it=>{const i=G.items.indexOf(it);if(i>=0)G.items.splice(i,1);};
 G.clear=()=>{G.items.length=0;};
 G.fade=(it,to,sec)=>{const a0=it.a;return R.T(sec,e=>{it.a=a0+(to-a0)*e;});};
 G.line=(g,x1,y1,x2,y2,col,w)=>{g.beginPath();g.moveTo(G.X(x1),G.Y(y1));g.lineTo(G.X(x2),G.Y(y2));g.strokeStyle=col;g.lineWidth=w||4;g.lineCap='round';g.stroke();};
 G.poly=(g,pts,fill)=>{g.beginPath();pts.forEach((p,i)=>i?g.lineTo(G.X(p[0]),G.Y(p[1])):g.moveTo(G.X(p[0]),G.Y(p[1])));g.closePath();g.fillStyle=fill;g.fill();};
 G.arrow=(g,x1,y1,x2,y2,col,w)=>{G.line(g,x1,y1,x2,y2,col,w||8);const a=Math.atan2(y2-y1,x2-x1),hl=.17;G.poly(g,[[x2,y2],[x2-hl*Math.cos(a-.5),y2-hl*Math.sin(a-.5)],[x2-hl*Math.cos(a+.5),y2-hl*Math.sin(a+.5)]],col);};
 G.text=(g,t,x,y,size,col)=>{g.font='bold '+size+'px sans-serif';g.textAlign='center';g.textBaseline='middle';const w=g.measureText(t).width+24,h=size*1.3;let cx=G.X(x);cx=Math.max(w/2+4,Math.min(W-w/2-4,cx));const cy=G.Y(y);g.fillStyle='rgba(255,255,255,.94)';g.strokeStyle=col;g.lineWidth=3;g.beginPath();if(g.roundRect)g.roundRect(cx-w/2,cy-h/2,w,h,h/2);else g.rect(cx-w/2,cy-h/2,w,h);g.fill();g.stroke();g.fillStyle=col;g.fillText(t,cx,cy+1);};
 /* a clay-look letter tile; t.s is its scale (0 hides it), t.a opacity, t.hl glow, t.gap draws an empty dashed slot instead */
 G.tile=(ch,x,y,col,size)=>{const t={ch,x,y,col:col||'#e8505b',s:0,a:1,hl:0,rot:0,size:size||.6,gap:false};
  t.it=G.add('F',g=>{if(t.s<=.01)return;const sz=t.size*G.PX*t.s,cx=G.X(t.x),cy=G.Y(t.y);g.save();g.globalAlpha*=t.a;g.translate(cx,cy);g.rotate(-t.rot);
   if(t.gap){g.setLineDash([10,8]);g.strokeStyle='#5b4a8a';g.lineWidth=5;g.beginPath();g.roundRect(-sz/2,-sz/2,sz,sz,sz*.22);g.stroke();g.restore();return;}
   if(t.hl){g.shadowColor='rgba(255,214,10,'+t.hl+')';g.shadowBlur=34*t.hl;}
   g.fillStyle='rgba(0,0,0,.18)';g.beginPath();g.roundRect(-sz/2+4,-sz/2+9,sz,sz,sz*.24);g.fill();g.shadowBlur=0;
   const gr=g.createLinearGradient(0,-sz/2,0,sz/2);gr.addColorStop(0,'#ffffff');gr.addColorStop(.12,t.col);gr.addColorStop(1,t.col);g.fillStyle=gr;g.beginPath();g.roundRect(-sz/2,-sz/2,sz,sz,sz*.24);g.fill();
   g.strokeStyle='rgba(255,255,255,.55)';g.lineWidth=3;g.beginPath();g.roundRect(-sz/2+5,-sz/2+5,sz-10,sz-10,sz*.2);g.stroke();
   g.font='bold '+Math.round(sz*.72)+'px "Atkinson Hyperlegible",sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillStyle='rgba(0,0,0,.22)';g.fillText(t.ch,2,sz*.05+3);g.fillStyle='#ffffff';g.fillText(t.ch,0,sz*.05);g.restore();});
  return t;};
 G.rmTile=t=>G.rm(t.it);
 R.actors.push({kill:()=>{},tick:()=>{for(const L of [B,F])L.g.clearRect(0,0,W,H);for(const it of G.items){const L=it.layer==='B'?B:F;L.g.globalAlpha=it.a;it.fn(L.g);}B.g.globalAlpha=F.g.globalAlpha=1;B.m.material.map.needsUpdate=true;F.m.material.map.needsUpdate=true;}});
 return G;};
const tin=(R,t,sec)=>R.T(sec||.45,e=>{t.s=e<.7?e/.7*1.18:1.18-.18*((e-.7)/.3);});
const tout=(R,t,sec)=>R.T(sec||.3,e=>{t.a=1-e;});
const glow=(R,t,sec)=>R.T(sec||.6,e=>{t.hl=Math.sin(e*Math.PI);t.s=1+.12*Math.sin(e*Math.PI);});
const moveT=(R,t,x,y,sec)=>{const x0=t.x,y0=t.y;return R.T(sec||.6,e=>{t.x=x0+(x-x0)*e;t.y=y0+(y-y0)*e+Math.sin(e*Math.PI)*.18;});};
const COL={c:'#e8590c',b:'#1c7ed6',s:'#2b8a3e',m:'#c2255c',f:'#7048e8',p:'#e8a900',t:'#0c8599'};
const colOf=ch=>COL[ch]||'#e8505b';
/* a word as a row of tiles centred on cx */
const wordTiles=(G,word,cx,y,size,gapIdx)=>{const n=word.length,sp=size*1.08,x0=cx-(n-1)*sp/2;return word.split('').map((ch,i)=>{const t=G.tile(ch,x0+i*sp,y,colOf(ch),size);t.baseX=x0+i*sp;if(i===gapIdx)t.gap=true;return t;});};
const hideAct=a=>a&&a.hide?a.hide(.25):0;

/* ================= LESSON 1 : Beginning sounds (redone with real action) ================= */
const LEO_H=1.45;
const fly=(R,a,x1,y1,sec,o)=>{o=o||{};const x0=a.st.x,y0=a.st.y,r0=a.st.rz||0,ar=o.arc==null?.6:o.arc,sp=o.spin||0;return R.T(sec,e=>{a.st.x=x0+(x1-x0)*e;a.st.y=y0+(y1-y0)*e+Math.sin(e*Math.PI)*ar;a.st.rz=r0+sp*e;a.ap();});};
const tileFly=(R,t,x,y,sec,arc)=>{const x0=t.x,y0=t.y;return R.T(sec,e=>{t.x=x0+(x-x0)*e;t.y=y0+(y-y0)*e+Math.sin(e*Math.PI)*(arc==null?.5:arc);t.rot=Math.sin(e*Math.PI*2)*.35;t.s=1+.25*Math.sin(e*Math.PI);});};
const squash=async(R,a,n)=>{for(let i=0;i<(n||2);i++){await a.jump(.22);}};
const wave=async(R,ts)=>{for(const t of ts){await R.T(.22,e=>{t.y0=t.y0==null?t.y:t.y0;t.y=t.y0+Math.sin(e*Math.PI)*.28;t.s=1+.2*Math.sin(e*Math.PI);t.hl=Math.sin(e*Math.PI);});}};
const E1s={
 lunchtime:async(R,S)=>{await R.bg('classroom');R.label('Lunchtime','#e8590c');const G=S.G=gfx(R);
  S.bell=await pop(R,'pa-bell',{x:1.2,y:1.35,h:.5,face:1,idle:'none'},.4);
  S.leo=R.act('pa-leowave',{x:-2.2,y:.2,h:LEO_H,face:1,idle:'none'});S.leo.st.op=0;S.leo.ap();await S.leo.show(.2);
  R.word('Ding dong!',1.1,2.0,'#e8a900',1.6);R.fx('note',1.2,1.8,6,{w:.6,t:1.4});
  await all([R.T(1.2,e=>{S.bell.st.rz=Math.sin(e*Math.PI*8)*.45*(1-e);S.bell.ap();}),S.leo.go(-1.1,.2,1.7,{hops:5})]);},
 'tummy goes':async(R,S)=>{S.bell.hide(.3);await S.leo.swap('pa-leotummy',.25,{h:LEO_H});R.word('Grumble!',-1.1,2.0,'#c2255c',.9);R.fx('dust',-1.1,.5,8,{w:.7,t:.6});await S.leo.shiver(.5);R.word('Grumble!',-.3,1.8,'#c2255c',.9);R.fx('dust',-1.1,.5,8,{w:.7,t:.6});await S.leo.shiver(.6);},
 'opens his':async(R,S)=>{await R.bg('lunchtable1');R.label('Lunchtime','#e8590c');const G=S.G=gfx(R);
  S.leo=R.act('pa-leobox',{x:-1.5,y:.2,h:1.6,face:1,idle:'none'});S.leo.st.op=0;S.leo.ap();await S.leo.show(.3);
  S.lb=R.act('pa-lbclosed',{x:1.4,y:.55,h:.85,face:1,idle:'none'});S.lb.st.op=0;S.lb.ap();await S.lb.show(.35,'pop');await R.wait(.4);
  await S.lb.swap('pa-lbopen',.25,{h:1.0});R.fx('sparkle',1.4,1.5,22,{w:.9,t:1.2});await S.lb.jump(.25);},
 'yellow banana':async(R,S)=>{S.bn=R.act('pa-banana',{x:1.4,y:.9,h:.6,face:1,idle:'none'});S.bn.st.op=0;S.bn.ap();await S.bn.show(.15);await fly(R,S.bn,-.5,.5,1.0,{arc:1.1,spin:Math.PI*4});await S.bn.jump(.3);R.fx('dust',-.5,.5,8,{w:.5,t:.6});},
 'first sound is b':async(R,S)=>{S.t1=S.G.tile('b',-.5,.9,colOf('b'),.5);S.t1.s=.2;await tileFly(R,S.t1,-.5,1.75,.7,.25);await tin(R,S.t1,.2);R.word('b !',-.5,2.05,COL.b,1.2);R.fx('sparkle',-.5,1.75,16,{w:.7,t:1});await all([glow(R,S.t1,.7),S.bn.jump(.35)]);},
 'sweet muffin':async(R,S)=>{S.mf=R.act('pa-muffin',{x:1.4,y:.9,h:.55,face:1,idle:'none'});S.mf.st.op=0;S.mf.ap();await S.mf.show(.15);await fly(R,S.mf,.25,.5,1.0,{arc:1.2,spin:-Math.PI*4});await S.mf.jump(.3);R.fx('crumb',.25,.6,10,{w:.4,t:.8});},
 'first sound is m':async(R,S)=>{S.t2=S.G.tile('m',.25,.9,colOf('m'),.5);S.t2.s=.2;await tileFly(R,S.t2,.25,1.75,.7,.25);await tin(R,S.t2,.2);R.word('m !',.25,2.05,COL.m,1.2);R.fx('sparkle',.25,1.75,16,{w:.7,t:1});await all([glow(R,S.t2,.7),S.mf.jump(.35)]);},
 'soft sandwich':async(R,S)=>{S.sd=R.act('pa-sandwich',{x:1.4,y:.9,h:.55,face:1,idle:'none'});S.sd.st.op=0;S.sd.ap();await S.sd.show(.15);await fly(R,S.sd,.75,.5,.9,{arc:1.3,spin:Math.PI*2});await S.sd.jump(.3);R.fx('dust',.75,.5,8,{w:.5,t:.6});},
 'first sound is s':async(R,S)=>{S.t3=S.G.tile('s',.75,.9,colOf('s'),.5);S.t3.s=.2;await tileFly(R,S.t3,.75,1.75,.7,.25);await tin(R,S.t3,.2);R.word('s !',.75,2.05,COL.s,1.2);R.fx('sparkle',1.0,1.75,16,{w:.7,t:1});await all([glow(R,S.t3,.7),S.sd.jump(.35)]);},
 knows:async(R,S)=>{await S.leo.swap('pa-leocheer',.25,{h:1.6});R.fx('heart',-1.5,1.9,8,{w:.8,t:1.5});await wave(R,[S.t1,S.t2,S.t3]);await wave(R,[S.t1,S.t2,S.t3]);},
 eat:async(R,S)=>{await S.leo.swap('pa-leoeat',.3,{h:1.3});[S.bn,S.mf,S.sd].forEach((a,i)=>{});for(const a of [S.bn,S.mf,S.sd]){await fly(R,a,-1.4,1.0,.6,{arc:.5,spin:Math.PI*2});a.hide(.12);R.fx('crumb',-1.4,.9,8,{w:.3,t:.7});await S.leo.jump(.15);}R.word('Yum!',-1.2,2.0,'#2b8a3e',1.4);hearts(R,-1.4,1.7,8);await R.wait(.5);}
};
page('e01',0,{old:mkq(E1s),neu:mkq(E1s),tm:{"lunchtime": 2.45, "tummy goes": 6.0, "opens his": 8.69, "yellow banana": 14.25, "first sound is b": 15.95, "sweet muffin": 18.96, "first sound is m": 20.61, "soft sandwich": 24.02, "first sound is s": 25.88, "knows": 28.23, "eat": 33.42}});

/* theory pages for lesson 1 */
const E1a={
 'say moon':async(R,S)=>{await R.bg('nighthill1');R.label('Stretch the first sound','#e8505b');const G=S.G=gfx(R);
  S.mn=R.act('pa-moon',{x:-.9,y:-.7,h:1.0,face:1,idle:'none'});S.mn.st.op=0;S.mn.ap();await S.mn.show(.2);
  for(const[px,py]of[[-1.7,1.9],[-.2,2.0],[1.0,1.85],[1.5,1.5]]){const s=R.act('pa-star',{x:px,y:py,h:.28,face:1,idle:'none'});s.st.op=0;s.ap();s.show(.4,'pop');}
  await fly(R,S.mn,-.9,.75,1.6,{arc:0});R.fx('sparkle',-.9,1.2,14,{w:.8,t:1});
  S.w1=wordTiles(G,'moon',.6,.9,.5);for(const t of S.w1){await tin(R,t,.22);}
  R.word('mmm - oon',.6,1.7,'#c2255c',1.6);
  await R.T(1.2,e=>{S.w1.forEach((t,i)=>{t.x=t.baseX+(i-1.5)*.16*Math.sin(e*Math.PI);});});},
 'first sound is m':async(R,S)=>{S.w1.slice(1).forEach(t=>{t.a=.35;});await tileFly(R,S.w1[0],-.9,1.95,.9,.35);await glow(R,S.w1[0],.7);R.word('m !',-.9,2.1,'#c2255c',1.3);R.fx('sparkle',-.9,1.95,18,{w:.8,t:1.1});await S.mn.jump(.35);},
 'now say sun':async(R,S)=>{S.G.clear();await R.bg('sunhill1');R.label('Stretch the first sound','#e8505b');const G=S.G=gfx(R);
  S.sn=R.act('sun',{x:-.9,y:-.7,h:1.0,face:1,idle:'none'});S.sn.st.op=0;S.sn.ap();await S.sn.show(.2);await fly(R,S.sn,-.9,.8,1.4,{arc:0,spin:Math.PI*2});R.fx('sparkle',-.9,1.3,20,{w:1.0,t:1.2});
  S.w2=wordTiles(G,'sun',.6,.9,.5);for(const t of S.w2){await tin(R,t,.22);}
  await R.T(1.0,e=>{S.w2.forEach((t,i)=>{t.x=t.baseX+(i-1)*.18*Math.sin(e*Math.PI);});});},
 'first sound is s':async(R,S)=>{S.w2.slice(1).forEach(t=>{t.a=.35;});await tileFly(R,S.w2[0],-.9,2.0,.9,.35);await glow(R,S.w2[0],.7);R.word('s !',-.9,2.1,'#2b8a3e',1.3);R.fx('sparkle',-.9,2.0,18,{w:.8,t:1.1});await S.sn.jump(.35);},
 'pops out':async(R,S)=>{R.fx('sparkle',-.9,1.9,30,{w:1.4,t:1.5});R.fx('heart',.2,1.4,8,{w:1,t:1.5});await S.sn.jump(.3);await S.sn.jump(.2);}
};
page('e01',1,{old:mkq(E1a),neu:mkq(E1a),tm:{"say moon": 0, "first sound is m": 4.17, "now say sun": 5.68, "first sound is s": 8.1, "pops out": 12.99}});
const E1b={
 'say fox':async(R,S)=>{await R.bg('forest1');R.label('Find the letter','#e8505b');const G=S.G=gfx(R);S.fx=R.act('fox',{x:-2.3,y:.3,h:1.0,face:1,idle:'none'});S.fx.st.op=0;S.fx.ap();await S.fx.show(.2);await S.fx.go(-1.1,.3,1.4,{hops:5});
  S.w=wordTiles(G,'fox',.6,1.0,.55,0);for(const t of S.w){await tin(R,t,.22);}},
 'first sound is f':async(R,S)=>{R.word('f !',-1.1,1.7,'#7048e8',1.4);R.fx('sparkle',-1.1,1.5,12,{w:.6,t:1});await S.fx.jump(.35);await S.fx.jump(.25);},
 'which letter':async(R,S)=>{S.c=['f','b','m'].map((ch,i)=>{const t=S.G.tile(ch,-.2+i*.8,2.4,colOf(ch),.5);t.s=1;t.y1=.5;return t;});for(const t of S.c){R.T(.7,e=>{const b=e<.7?e/.7:1;t.y=2.4+(.5-2.4)*(1-Math.pow(1-e,2))+Math.abs(Math.sin(e*Math.PI*2.5))*.25*(1-e);});await R.wait(.25);}await R.wait(.6);},
 'the letter f':async(R,S)=>{await glow(R,S.c[0],.8);R.fx('sparkle',S.c[0].x,.9,14,{w:.6,t:1});for(const t of [S.c[1],S.c[2]]){R.T(.6,e=>{t.x=t.x+Math.sin(e*Math.PI*8)*.01;t.a=1-.65*e;});}await R.wait(.5);},
 'fill the gap':async(R,S)=>{S.w[0].gap=false;S.w[0].ch='f';S.w[0].col=colOf('f');S.w[0].s=1;S.w[0].a=0;await all([tileFly(R,S.c[0],S.w[0].x,S.w[0].y,.9,.7),R.T(.9,e=>{S.w[0].a=e;})]);S.G.rmTile(S.c[0]);S.w[0].a=1;R.T(.6,e=>{S.c[1].y-=.05*e;S.c[1].a=.35*(1-e);S.c[2].y-=.05*e;S.c[2].a=.35*(1-e);});R.fx('sparkle',.6,1.0,24,{w:1.0,t:1.2});await all([S.fx.jump(.45),glow(R,S.w[0],.8)]);hearts(R,-1.1,1.5,8);await S.fx.go(-.3,.3,.9,{hops:3});R.fx('heart',-.3,1.5,6,{w:.6,t:1.2});}
};
page('e01',2,{old:mkq(E1b),neu:mkq(E1b),tm:{"say fox": 0, "first sound is f": 3.29, "which letter": 4.97, "the letter f": 7.15, "fill the gap": 9.7}});
const E1c={
 'look a bee':async(R,S)=>{await R.bg('schoolyard1');R.label('Same first sound','#e8505b');const G=S.G=gfx(R);S.bee=R.act('bee',{x:-2.3,y:1.9,h:.7,face:1,idle:'none'});S.bee.st.op=0;S.bee.ap();await S.bee.show(.15);
  await fly(R,S.bee,-1.8,1.2,.5,{arc:.2});await fly(R,S.bee,-1.4,1.7,.5,{arc:.2});await fly(R,S.bee,-1.3,.8,.5,{arc:.3});S.tb=G.tile('b',-1.3,1.7,colOf('b'),.46);await tin(R,S.tb,.3);R.fx('sparkle',-1.3,1.7,10,{w:.5,t:.9});},
 'a bear':async(R,S)=>{S.br=R.act('bear',{x:-2.4,y:.3,h:1.05,face:1,idle:'none'});S.br.st.op=0;S.br.ap();await S.br.show(.15);await S.br.go(-.3,.3,1.3,{hops:4,wob:.1});R.fx('dust',-.3,.3,8,{w:.6,t:.6});S.tb2=S.G.tile('b',-.3,1.7,colOf('b'),.46);await tin(R,S.tb2,.3);R.fx('sparkle',-.3,1.7,10,{w:.5,t:.9});},
 'and a bus':async(R,S)=>{S.bs=R.act('pa-bus',{x:2.4,y:.3,h:.7,face:-1,idle:'none'});S.bs.st.op=0;S.bs.ap();await S.bs.show(.1);R.word('Beep beep!',1.3,1.5,'#c92a2a',1.1);R.fx('note',1.6,1.1,4,{w:.4,t:1});await S.bs.go(.95,.3,1.3,{lin:true,wob:.03});R.fx('dust',1.4,.3,10,{w:.7,t:.8});S.tb3=S.G.tile('b',.95,1.7,colOf('b'),.46);await tin(R,S.tb3,.3);R.fx('sparkle',.95,1.7,10,{w:.5,t:.9});},
 'same sound':async(R,S)=>{await all([glow(R,S.tb,.8),glow(R,S.tb2,.8),glow(R,S.tb3,.8)]);},
 'say them with me':async(R,S)=>{R.word('Bee!',-1.3,2.1,'#e8a900',1.0);await all([S.bee.jump(.35),wave(R,[S.tb])]);R.word('Bear!',-.3,2.1,'#a0522d',1.0);await all([S.br.jump(.3),wave(R,[S.tb2])]);R.word('Bus!',.95,2.1,'#c92a2a',1.0);await all([S.bs.jump(.3),wave(R,[S.tb3])]);hearts(R,-.3,1.5,10);await all([S.bee.jump(.3),S.br.jump(.3),S.bs.jump(.3)]);}
};
page('e01',3,{old:mkq(E1c),neu:mkq(E1c),tm:{"look a bee": 0, "a bear": 1.19, "and a bus": 2.39, "same sound": 5.82, "say them with me": 7.01}});

/* ================= LESSON 2 : Ending sounds ================= */
const MIA_H=1.4;
const endTiles=async(R,S,word,sound,col)=>{const ts=wordTiles(S.G,word,.55,1.55,.4);S.ts=(S.ts||[]).concat(ts);for(const t of ts){await tin(R,t,.18);}
  const last=ts[ts.length-1];ts.slice(0,-1).forEach(t=>{t.a=.35;});await moveT(R,last,last.x,1.8,.5);await glow(R,last,.7);R.word('/'+sound+'/',last.x,1.3,col,1.3);return ts;};
const E2s={
 loves:async(R,S)=>{await R.bg('market2');R.label('At the market','#e8590c');S.G=gfx(R);S.mia=R.act('pa-miawave',{x:-2.1,y:.25,h:MIA_H,face:1,idle:'none'});S.mia.st.op=0;S.mia.ap();await S.mia.show(.2);await S.mia.go(-1.1,.25,1.3,{hops:3});await S.mia.jump(.25);},
 hops:async(R,S)=>{R.label('Ride to the market','#2b8a3e');await R.bg('park');S.mia.hide(.1);S.mb=R.act('pa-miabike',{x:-2.1,y:.25,h:1.0,face:1,idle:'none'});S.mb.st.op=0;S.mb.ap();await S.mb.show(.2);await S.mb.go(1.5,.25,2.6,{lin:true,wob:.02});},
 'at the market':async(R,S)=>{await R.bg('market2');R.label('At the market','#e8590c');S.G=gfx(R);S.mb.hide(.1);S.mia=R.act('pa-miawave',{x:-2.1,y:.25,h:MIA_H,face:1,idle:'none'});S.mia.st.op=0;S.mia.ap();await S.mia.show(.2);await S.mia.go(-1.1,.25,1.2,{hops:3});},
 'big red bus':async(R,S)=>{S.bus=R.act('pa-bus',{x:2.4,y:.25,h:.95,face:-1,idle:'none'});S.bus.st.op=0;S.bus.ap();await S.bus.show(.15);await S.bus.go(.7,.25,1.3,{lin:true});R.fx('dust',1.2,.3,6,{w:.3,t:.7,vx:.8});R.word('Beep beep!',.7,1.95,'#c92a2a',1.2);},
 'end of bus':async(R,S)=>{await S.mia.swap('pa-miapoint',.25,{h:MIA_H});await endTiles(R,S,'bus','s',COL.s);},
 'tall clock':async(R,S)=>{(S.ts||[]).forEach(t=>S.G.rmTile(t));S.ts=[];await all([S.bus.go(-2.6,.25,1.0,{lin:true}).then(()=>S.bus.hide(.1)),0]);S.ck=R.act('pa-clock',{x:.8,y:.25,h:1.2,face:1,idle:'none'});S.ck.st.op=0;S.ck.ap();await S.ck.show(.35,'pop');R.fx('note',.8,1.5,4,{t:1});},
 'end of clock':async(R,S)=>{await endTiles(R,S,'clock','k',COL.c);},
 'fresh pear':async(R,S)=>{(S.ts||[]).forEach(t=>S.G.rmTile(t));S.ts=[];S.ck.hide(.25);await S.mia.swap('pa-miapear',.25,{h:MIA_H});S.pr=R.act('pa-pear',{x:.8,y:.5,h:.55,face:1,idle:'none'});S.pr.st.op=0;S.pr.ap();await S.pr.show(.3,'pop');R.fx('sparkle',.8,.9,10,{w:.4,t:.9});},
 'end of pear':async(R,S)=>{await endTiles(R,S,'pear','r',COL.m);},
 knows:async(R,S)=>{(S.ts||[]).forEach(t=>S.G.rmTile(t));S.pr.hide(.2);await S.mia.swap('pa-miacheer',.25,{h:MIA_H});const a=[['s',COL.s],['k',COL.c],['r',COL.m]].map(([c,col],i)=>S.G.tile(c,-.1+i*.6,1.6,col,.46));for(const t of a)await tin(R,t,.2);await all(a.map(t=>glow(R,t,.8)));hearts(R,.2,1.6,10);}
};
page('e02',0,{old:mkq(E2s),neu:mkq(E2s)});

/* theory pages for lesson 2 */
const E2a={
 'say cat':async(R,S)=>{await R.bg('playroom1');R.label('Stretch to the last sound','#e8505b');const G=S.G=gfx(R);S.cat=await pop(R,'cat',{x:-1.0,y:.4,h:.95,face:1,idle:'none'},.5);
  S.w1=wordTiles(G,'cat',.5,1.0,.5);for(const t of S.w1){await tin(R,t,.25);}R.word('caaa - t',.5,1.75,'#c2255c',1.6);
  await R.T(1.2,e=>{S.w1.forEach((t,i)=>{t.x=t.baseX+(i-1)*.18*Math.sin(e*Math.PI);});});},
 'last sound is t':async(R,S)=>{S.w1.slice(0,-1).forEach(t=>{t.a=.35;});const l=S.w1[2];await moveT(R,l,-.1,1.55,.7);await glow(R,l,.7);R.word('/t/',-.1,1.95,COL.t,1.4);},
 'now say bus':async(R,S)=>{S.w1.forEach(t=>S.G.rmTile(t));S.cat.hide(.25);S.bs=await pop(R,'pa-bus',{x:-1.0,y:.4,h:.7,face:1,idle:'none'},.5);
  S.w2=wordTiles(S.G,'bus',.5,1.0,.5);for(const t of S.w2){await tin(R,t,.25);}
  await R.T(1.0,e=>{S.w2.forEach((t,i)=>{t.x=t.baseX+(i-1)*.18*Math.sin(e*Math.PI);});});},
 'last sound is s':async(R,S)=>{S.w2.slice(0,-1).forEach(t=>{t.a=.35;});const l=S.w2[2];await moveT(R,l,-.1,1.55,.7);await glow(R,l,.7);R.word('/s/',-.1,1.95,COL.s,1.4);},
 'listen for the very end':async(R,S)=>{R.fx('sparkle',-.1,1.55,26,{w:1.2,t:1.4});await S.bs.jump(.3);}
};
page('e02',1,{old:mkq(E2a),neu:mkq(E2a)});
const E2b={
 'say bus again':async(R,S)=>{await R.bg('playroom1');R.label('Find the letter','#e8505b');const G=S.G=gfx(R);S.bs=await pop(R,'pa-bus',{x:-1.0,y:.4,h:.7,face:1,idle:'none'},.5);
  S.w=wordTiles(G,'bus',.6,1.0,.55,2);for(const t of S.w){await tin(R,t,.25);}},
 'last sound is s':async(R,S)=>{R.word('/s/',-1.0,1.5,COL.s,1.5);await S.bs.jump(.3);},
 'which letter':async(R,S)=>{S.c=['s','t','n'].map((ch,i)=>S.G.tile(ch,.0+i*.7,.5,colOf(ch),.5));for(const t of S.c){await tin(R,t,.25);}},
 'the letter s':async(R,S)=>{await glow(R,S.c[0],.7);S.c[1].a=.3;S.c[2].a=.3;},
 'go into the gap':async(R,S)=>{const g=S.w[2];g.gap=false;g.ch='s';g.col=colOf('s');g.s=1;g.a=0;await all([moveT(R,S.c[0],g.x,g.y,.8),R.T(.8,e=>{g.a=e;})]);S.G.rmTile(S.c[0]);g.a=1;S.c[1].a=0;S.c[2].a=0;R.fx('sparkle',.6,1.0,16,{w:.8,t:1});await S.bs.jump(.3);hearts(R,-1.0,1.3,6);}
};
page('e02',2,{old:mkq(E2b),neu:mkq(E2b)});
const E2c={
 'pen starts':async(R,S)=>{await R.bg('playroom1');R.label('First and last','#e8505b');const G=S.G=gfx(R);S.pen=await pop(R,'pa-pen',{x:-1.3,y:.4,h:.85,face:1,idle:'none'},.45);S.pw=wordTiles(G,'pen',-.1,1.0,.45);for(const t of S.pw)await tin(R,t,.2);await glow(R,S.pw[0],.7);R.word('starts p',-.1,1.7,COL.b,1.2);},
 'ends with n':async(R,S)=>{await glow(R,S.pw[2],.7);R.word('ends n',-.1,1.7,COL.s,1.2);await S.pen.jump(.25);},
 'drum starts':async(R,S)=>{S.pw.forEach(t=>S.G.rmTile(t));S.pen.hide(.25);S.dr=await pop(R,'pa-drum',{x:-1.3,y:.4,h:.8,face:1,idle:'none'},.45);S.dw=wordTiles(S.G,'drum',-.1,1.0,.45);for(const t of S.dw)await tin(R,t,.2);await glow(R,S.dw[0],.7);R.word('starts d',-.1,1.7,COL.b,1.2);},
 'ends with m':async(R,S)=>{await glow(R,S.dw[3],.7);R.word('ends m',-.1,1.7,COL.s,1.2);await S.dr.jump(.25);},
 'both ends':async(R,S)=>{R.fx('sparkle',-.1,1.2,26,{w:1.6,t:1.4});hearts(R,-.1,1.4,8);}
};
page('e02',3,{old:mkq(E2c),neu:mkq(E2c)});
P.DIR.mount();
})();
