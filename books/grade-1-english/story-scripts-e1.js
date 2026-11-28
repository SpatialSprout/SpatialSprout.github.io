/* Grade 1 English, lessons 1-5: story and theory pages staged as short clay films. ASCII only. */
(function(){
"use strict";
const P=window.PM;if(!P||!P.DIR)return;
const page=P.DIR.page;
/* the staged pages drive their own action, so the old per-step cue lists of these lessons are dropped */
const STAGED=P.G1STAGED=new Set(['e01','e02','e03','e04','e05','e06','e07','e08','e09']);const U0=P.unit;P.unit=function(d){if(d&&STAGED.has(d.id)&&d.steps)d.steps.forEach(st=>{st.cues=[];});return U0.apply(this,arguments);};
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
/* ================= LESSON 3 : Short vowels ================= */
const VC={a:'#e03131',e:'#f08c00',i:'#7048e8',o:'#0c8599',u:'#2b8a3e'};
const vcol=ch=>VC[ch]||colOf(ch);
const vTiles=(G,word,cx,y,size,gapIdx)=>{const n=word.length,sp=size*1.08,x0=cx-(n-1)*sp/2;return word.split('').map((ch,i)=>{const t=G.tile(ch,x0+i*sp,y,VC[ch]||'#5c7cfa',size);t.baseX=x0+i*sp;if(i===gapIdx)t.gap=true;return t;});};
const TIM_H=1.5;
const nounTag=async(R,S,word,x,y)=>{const ts=vTiles(S.G,word,x,y,.3);S.tags=(S.tags||[]).concat(ts);for(const t of ts){t.s=.2;}for(const t of ts){await tin(R,t,.12);}await glow(R,ts[1],.5);return ts;};
const E3s={
 'pet hen':async(R,S)=>{await R.bg('farm23');R.label("Tim's Pet Hen",'#2b8a3e');const G=S.G=gfx(R);
  S.tim=R.act('pa-timwave',{x:-2.3,y:.2,h:TIM_H,face:1,idle:'none'});S.tim.st.op=0;S.tim.ap();await S.tim.show(.2);
  S.hen=R.act('pa-hen',{x:2.2,y:.2,h:.8,face:-1,idle:'none'});S.hen.st.op=0;S.hen.ap();S.hen.show(.15);
  await all([S.tim.go(-1.2,.2,1.0,{hops:3}),S.hen.go(-.1,.2,1.2,{hops:4,wob:.08})]);R.fx('dust',-.1,.2,8,{w:.5,t:.6});hearts(R,-.6,1.7,6);S.hen.jump(.3);},
 'in a pen':async(R,S)=>{S.pen=R.act('pa-penfence',{x:.95,y:.25,h:1.05,face:1,idle:'none'});S.pen.st.op=0;S.pen.ap();S.pen.show(.3,'pop');R.fx('dust',.95,.3,10,{w:.8,t:.6});nounTag(R,S,'hen',-.2,2.0);nounTag(R,S,'pen',.95,2.0);
  await S.hen.go(.95,.25,.9,{hops:3,arc:.5});R.fx('crumb',.95,.4,8,{w:.4,t:.7});S.hen.jump(.3);},
 'red cap':async(R,S)=>{S.cap=R.act('pa-cap',{x:-1.2,y:2.4,h:.45,face:1,idle:'none'});S.cap.st.op=0;S.cap.ap();await S.cap.show(.1);await fly(R,S.cap,-1.2,1.55,.55,{arc:0,spin:Math.PI*2});S.cap.jump(.2);S.tim.swap('pa-timcheer',.2,{h:TIM_H});R.fx('sparkle',-1.2,1.8,14,{w:.5,t:1});nounTag(R,S,'cap',-1.2,2.3);await S.tim.jump(.3);},
 'big bug':async(R,S)=>{S.tim.swap('pa-timwow',.2,{h:TIM_H});S.bug=R.act('pa-bug',{x:2.4,y:.2,h:.5,face:-1,idle:'none'});S.bug.st.op=0;S.bug.ap();S.bug.show(.1);R.word('Eek!',-1.1,2.0,'#e03131',.9);nounTag(R,S,'bug',1.0,1.5);await all([S.bug.go(1.5,.2,.9,{lin:true,wob:.05,hops:5}),S.tim.shiver(.6)]);},
 'cluck cluck':async(R,S)=>{await S.hen.swap('pa-henflap',.15,{h:.8});R.word('Cluck!',.4,1.7,'#a0522d',.8);await S.hen.jump(.25);R.word('Cluck!',.8,2.0,'#a0522d',.8);R.fx('note',.9,1.5,4,{w:.4,t:1});await all([S.hen.jump(.25),S.bug.go(2.8,.2,1.0,{lin:true,hops:6})]);S.bug.hide(.1);await S.hen.swap('pa-hen',.15,{h:.8});},
 'i see a nut':async(R,S)=>{S.tim.swap('pa-timpoint',.2,{h:TIM_H});S.nut=R.act('pa-walnut',{x:-.3,y:2.4,h:.4,face:1,idle:'none'});S.nut.st.op=0;S.nut.ap();S.nut.show(.1);await fly(R,S.nut,-.3,.2,.6,{arc:0,spin:Math.PI*3});R.fx('crumb',-.3,.3,8,{w:.4,t:.7});nounTag(R,S,'nut',-.3,1.2);await S.nut.jump(.3);},
 'are happy':async(R,S)=>{await S.tim.swap('pa-timcheer',.2,{h:TIM_H});hearts(R,-1.2,1.9,10);R.fx('sparkle',.3,1.6,26,{w:1.8,t:1.4});await all([S.tim.jump(.4),S.hen.jump(.4)]);await wave(R,S.tags||[]);await S.tim.jump(.3);}
};
page('e03',0,{old:mkq(E3s),neu:mkq(E3s),tm:{"pet hen": 0.93, "in a pen": 2.81, "red cap": 4.77, "big bug": 6.74, "cluck cluck": 7.48, "i see a nut": 9.69, "are happy": 13.24}});
/* step 1: five vowels */
const E3a={
 'five letters':async(R,S)=>{await R.bg('playroom1');R.label('Five vowels','#e8505b');const G=S.G=gfx(R);
  S.vt={};for(const[i,ch]of['a','e','i','o','u'].entries()){const x=-1.7+i*.85;const t=G.tile(ch,x,2.0,vcol(ch),.62);t.s=.1;S.vt[ch]=t;R.fx('sparkle',x,2.0,8,{w:.3,t:.7});await tin(R,t,.35);await R.wait(.15);}},
 'in cat':async(R,S)=>{S.cat=R.act('cat',{x:-1.7,y:2.6,h:.8,face:1,idle:'none'});S.cat.st.op=0;S.cat.ap();await S.cat.show(.1);await fly(R,S.cat,-1.7,.25,.7,{arc:0});R.fx('dust',-1.7,.25,8,{w:.5,t:.6});R.word('a! a!',-1.7,1.5,vcol('a'),1.2);await all([glow(R,S.vt.a,.8),S.cat.jump(.3)]);},
 'in egg':async(R,S)=>{S.egg=R.act('egg',{x:-.85,y:2.6,h:.55,face:1,idle:'none'});S.egg.st.op=0;S.egg.ap();await S.egg.show(.1);await fly(R,S.egg,-.85,.25,.7,{arc:0});await S.egg.shiver(.5);await S.egg.swap('pa-chickegg',.2,{h:.7});R.fx('sparkle',-.85,.7,14,{w:.5,t:.9});R.word('e! e!',-.85,1.5,vcol('e'),1.2);await all([glow(R,S.vt.e,.8),S.egg.jump(.3)]);},
 fig:async(R,S)=>{S.fg=R.act('pa-fig',{x:0,y:2.6,h:.5,face:1,idle:'none'});S.fg.st.op=0;S.fg.ap();await S.fg.show(.1);await fly(R,S.fg,0,.25,.5,{arc:0,spin:Math.PI*2});R.word('i! i!',0,1.5,vcol('i'),1.2);await all([glow(R,S.vt.i,.8),S.fg.jump(.3)]);},
 frog:async(R,S)=>{S.fr=R.act('frog',{x:-2.3,y:.25,h:.7,face:1,idle:'none'});S.fr.st.op=0;S.fr.ap();await S.fr.show(.1);await S.fr.go(.85,.25,.7,{hops:2,arc:.5});R.word('o! o!',.85,1.5,vcol('o'),1.2);await all([glow(R,S.vt.o,.8),S.fr.jump(.3)]);},
 'and bus':async(R,S)=>{S.bs=R.act('pa-bus',{x:2.6,y:.25,h:.7,face:-1,idle:'none'});S.bs.st.op=0;S.bs.ap();await S.bs.show(.1);R.word('Beep!',1.9,1.2,'#c92a2a',.8);await S.bs.go(1.7,.25,.7,{lin:true,wob:.03});R.fx('dust',2.1,.3,8,{w:.6,t:.7});R.word('u! u!',1.7,1.5,vcol('u'),1.2);await all([glow(R,S.vt.u,.8),S.bs.jump(.3)]);hearts(R,0,1.7,8);}
};
page('e03',1,{old:mkq(E3a),neu:mkq(E3a),tm:{"five letters": 0, "in cat": 4.0, "in egg": 6.07, "fig": 8.25, "frog": 9.11, "and bus": 9.46}});
/* step 2: fill the gap in fig */
const E3b={
 'say fig':async(R,S)=>{await R.bg('forest1');R.label('Fill the vowel','#e8505b');const G=S.G=gfx(R);
  S.fg=R.act('pa-fig',{x:-1.3,y:2.6,h:.7,face:1,idle:'none'});S.fg.st.op=0;S.fg.ap();await S.fg.show(.1);await fly(R,S.fg,-1.3,.3,.8,{arc:0,spin:Math.PI*3});await S.fg.jump(.3);R.fx('dust',-1.3,.3,8,{w:.5,t:.6});
  S.w=vTiles(G,'fig',.5,1.0,.6,1);for(const t of S.w){await tin(R,t,.2);}},
 'short i':async(R,S)=>{S.c=['i','a','o'].map((ch,i)=>{const t=S.G.tile(ch,-.3+i*.8,2.5,vcol(ch),.5);return t;});for(const t of S.c){R.T(.8,e=>{t.y=2.5+(.4-2.5)*(1-Math.pow(1-e,2))+Math.abs(Math.sin(e*Math.PI*2.5))*.22*(1-e);});await R.wait(.25);}await R.wait(.7);await all([glow(R,S.c[0],.8)]);R.word('i !',-.3,1.2,vcol('i'),1.2);S.c[1].a=.4;S.c[2].a=.4;},
 'fill the gap':async(R,S)=>{S.w[1].gap=false;S.w[1].ch='i';S.w[1].col=vcol('i');S.w[1].s=1;S.w[1].a=0;await all([tileFly(R,S.c[0],S.w[1].x,S.w[1].y,.9,.7),R.T(.9,e=>{S.w[1].a=e;})]);S.G.rmTile&&S.G.rmTile(S.c[0]);S.w[1].a=1;R.fx('sparkle',.5,1.0,24,{w:1,t:1.2});await all([S.fg.jump(.45),glow(R,S.w[1],.8)]);hearts(R,-1.3,1.4,8);await S.fg.jump(.3);}
};
page('e03',2,{old:mkq(E3b),neu:mkq(E3b),tm:{"say fig": 0, "short i": 2.83, "fill the gap": 4.99}});
/* step 3: change the vowel pan - pen - pin */
const E3c={
 'look at':async(R,S)=>{await R.bg('playroom1');R.label('Change the vowel','#e8505b');const G=S.G=gfx(R);
  S.w=vTiles(G,'pan',.6,1.1,.7,1);S.w[1].gap=true;for(const t of S.w){await tin(R,t,.2);}
  S.vv=['a','e','i'].map((ch,i)=>{const t=G.tile(ch,-.2+i*.8,.45,vcol(ch),.45);t.s=.2;return t;});for(const t of S.vv){await tin(R,t,.2);}},
 'with a':async(R,S)=>{S.item=R.act('pa-pan',{x:-1.5,y:.25,h:.8,face:1,idle:'none'});S.item.st.op=0;S.item.ap();await S.item.show(.2,'pop');await tileFly(R,S.vv[0],S.w[1].x,S.w[1].y,.7,.6);const w1=S.w[1];w1.gap=false;w1.ch='a';w1.col=vcol('a');w1.a=1;S.vv[0].a=0;R.word('pan',.6,1.9,vcol('a'),1.2);R.fx('sparkle',-1.5,.9,14,{w:.5,t:.9});await S.item.jump(.3);},
 'with e':async(R,S)=>{S.vv[1].x=S.vv[1].x;await tileFly(R,S.vv[1],S.w[1].x,S.w[1].y,.7,.6);S.w[1].ch='e';S.w[1].col=vcol('e');S.vv[1].a=0;await S.item.swap('pa-pen',.25,{h:.8});R.word('pen',.6,1.9,vcol('e'),1.2);R.fx('sparkle',-1.5,.9,14,{w:.5,t:.9});await S.item.jump(.3);},
 'with i':async(R,S)=>{await tileFly(R,S.vv[2],S.w[1].x,S.w[1].y,.7,.6);S.w[1].ch='i';S.w[1].col=vcol('i');S.vv[2].a=0;await S.item.swap('pa-pin',.25,{h:.8});R.word('pin',.6,1.9,vcol('i'),1.2);R.fx('sparkle',-1.5,.9,14,{w:.5,t:.9});await S.item.jump(.3);},
 'one little':async(R,S)=>{hearts(R,-.2,1.6,10);await wave(R,S.w);await S.item.jump(.3);await S.item.jump(.2);}
};
page('e03',3,{old:mkq(E3c),neu:mkq(E3c),tm:{"look at": 0, "with a": 1.79, "with e": 4.19, "with i": 6.64, "one little": 9.09}});
/* ================= LESSON 4 : Long vowels ================= */
const NH=1.5;
const tg=async(R,S,word,x,y,sz)=>{const ts=vTiles(S.G,word,x,y,sz||.3);S.tags=(S.tags||[]).concat(ts);for(const t of ts)t.s=.2;for(const t of ts)await tin(R,t,.1);return ts;};
const E4s={
 'at night':async(R,S)=>{await R.bg('nighthill1');R.label('Looking Up at the Sky','#3b5bdb');S.G=gfx(R);
  S.n=R.act('pa-norawave',{x:-2.4,y:.2,h:NH,face:1,idle:'none'});S.n.st.op=0;S.n.ap();S.n.show(.2);
  await S.n.go(-1.3,.2,1.1,{hops:3});await S.n.swap('pa-noralook',.2,{h:NH});R.fx('sparkle',-.2,1.7,12,{w:1.6,t:1.2});},
 'the moon':async(R,S)=>{S.mn=R.act('pa-moon',{x:1.4,y:-.6,h:.95,face:1,idle:'none'});S.mn.st.op=0;S.mn.ap();S.mn.show(.2);
  await S.mn.go(1.4,1.35,1.5,{arc:.2});R.fx('sparkle',1.4,1.35,24,{w:.9,t:1.4});await all([R.T(.7,e=>{S.mn.st.rz=Math.sin(e*Math.PI*2)*.15;S.mn.ap();}),S.n.jump(.3)]);tg(R,S,'moon',.7,.55,.28);},
 'tiny stars':async(R,S)=>{await S.n.swap('pa-noratele',.2,{h:NH});S.st=[];const P=[[-1.9,1.9],[-.6,1.75],[.1,1.95],[.8,1.7],[2.0,1.9],[-1.0,1.55]];
  for(const[x,y]of P){const a=R.act('pa-star',{x:x,y:y-.4,h:.3,face:1,idle:'none'});a.st.op=0;a.ap();a.show(.15,'pop');S.st.push(a);R.fx('sparkle',x,y,6,{w:.3,t:.6});a.go(x,y,.35,{arc:.15});await R.wait(.38);}
  for(const a of S.st)a.shiver(.5);await R.wait(.4);},
 'shooting star':async(R,S)=>{S.ss=R.act('pa-shootstar',{x:2.3,y:1.9,h:.6,face:-1,idle:'none'});S.ss.st.op=0;S.ss.ap();S.ss.show(.05);
  S.n.swap('pa-norawonder',.15,{h:NH});
  await all([S.ss.go(-2.0,.9,.85,{lin:true}),(async()=>{for(let i=0;i<6;i++){R.fx('sparkle',2.0-i*.7,1.85-i*.18,7,{w:.35,t:.7});await R.wait(.13);}})()]);
  S.ss.hide(.2);R.word('Make a wish!',-.2,1.5,'#f59f00',1.6);hearts(R,-1.3,1.9,6);},
 'in the daytime':async(R,S)=>{await R.bg('sunhill1');R.label('Looking Up at the Sky','#3b5bdb');S.G=gfx(R);
  S.n=R.act('pa-norawave',{x:-1.3,y:.2,h:NH,face:1,idle:'none'});S.n.st.op=0;S.n.ap();S.n.show(.2);
  S.sun=R.act('pa-sunface',{x:1.5,y:-.2,h:.8,face:1,idle:'none'});S.sun.st.op=0;S.sun.ap();S.sun.show(.2);
  await all([S.sun.go(1.5,1.4,1.4,{arc:.2}),S.n.jump(.35)]);R.fx('sparkle',1.5,1.4,18,{w:.8,t:1.2});await S.n.swap('pa-noralook',.2,{h:NH});},
 'a whale':async(R,S)=>{S.wh=R.act('pa-whalecloud',{x:3.2,y:1.3,h:.85,face:-1,idle:'none'});S.wh.st.op=0;S.wh.ap();S.wh.show(.2);
  await S.wh.go(.5,1.4,1.4,{arc:.15,wob:.06});R.fx('sparkle',.45,1.95,10,{w:.3,t:.9});R.word('Whoosh!',.5,1.95,'#1c7ed6',.8);await S.n.swap('pa-norapoint',.2,{h:NH});},
 'a kite':async(R,S)=>{S.kc=R.act('pa-kitecloud',{x:-3.0,y:1.2,h:.85,face:1,idle:'none'});S.kc.st.op=0;S.kc.ap();S.kc.show(.2);
  await S.kc.go(-.45,1.5,1.3,{arc:.2,wob:.06});await all([S.kc.jump(.3),S.n.jump(.4)]);await tg(R,S,'kite',-.45,.75,.3);hearts(R,-.45,1.9,10);R.fx('sparkle',.0,1.6,24,{w:1.8,t:1.4});await S.n.swap('pa-norawave',.2,{h:NH});await S.n.jump(.35);}
};
page('e04',0,{old:mkq(E4s),neu:mkq(E4s),tm:{"at night": 0, "the moon": 2.49, "tiny stars": 5.59, "shooting star": 9.62, "in the daytime": 10.6, "a whale": 15.15, "a kite": 17.07}});
const E4a={
 'long vowel':async(R,S)=>{await R.bg('sunhill1');R.label('Long vowels say their name','#3b5bdb');const G=S.G=gfx(R);
  S.n=R.act('pa-norawave',{x:-2.4,y:.2,h:NH,face:1,idle:'none'});S.n.st.op=0;S.n.ap();S.n.show(.2);S.n.go(-1.9,.2,.8,{hops:2});
  S.vt={};for(const[i,ch]of['a','i','o'].entries()){const x=-.7+i*1.0;const t=G.tile(ch,x,1.95,vcol(ch),.6);t.s=.1;S.vt[ch]=t;R.fx('sparkle',x,1.95,8,{w:.3,t:.7});await tin(R,t,.35);await R.wait(.12);}
  for(const ch of['a','i','o']){R.word(ch.toUpperCase()+'!',S.vt[ch].x,1.55,vcol(ch),.55);await glow(R,S.vt[ch],.35);}},
 'in cake':async(R,S)=>{S.ck=R.act('pa-cake',{x:-.7,y:2.6,h:.7,face:1,idle:'none'});S.ck.st.op=0;S.ck.ap();await S.ck.show(.1);await fly(R,S.ck,-.7,.2,.6,{arc:0,spin:Math.PI*2});R.fx('crumb',-.7,.3,10,{w:.5,t:.7});
  R.word('A!',-.7,1.3,vcol('a'),1.0);tg(R,S,'cake',-.7,.95,.28);await all([glow(R,S.vt.a,.8),S.ck.jump(.35),S.n.jump(.3)]);},
 'in kite':async(R,S)=>{S.kt=R.act('kite',{x:2.5,y:.3,h:.8,face:-1,idle:'none'});S.kt.st.op=0;S.kt.ap();await S.kt.show(.1);
  await S.kt.go(.3,1.2,1.0,{arc:.5,wob:.08});R.word('I!',.3,1.7,vcol('i'),1.0);tg(R,S,'kite',.3,.6,.28);await all([glow(R,S.vt.i,.8),S.kt.shiver(.6)]);hearts(R,.3,1.4,6);},
 'in rose':async(R,S)=>{S.rs=R.act('rose',{x:1.6,y:.2,h:.9,face:1,idle:'none'});S.rs.st.op=0;S.rs.ap();await S.rs.show(.5,'pop');R.fx('sparkle',1.6,.7,18,{w:.5,t:1});R.word('O!',1.6,1.55,vcol('o'),1.0);tg(R,S,'rose',1.6,.0+1.35,.28);
  await all([glow(R,S.vt.o,.8),S.rs.jump(.4)]);await S.n.swap('pa-norawave',.2,{h:NH});hearts(R,0,1.6,10);await all([S.n.jump(.35),S.ck.jump(.35),S.rs.jump(.35)]);await wave(R,Object.values(S.vt));}
};
page('e04',1,{old:mkq(E4a),neu:mkq(E4a),tm:{"long vowel": 0.28, "in cake": 2.35, "in kite": 4.49, "in rose": 6.84}});
const E4b={
 'the word kit':async(R,S)=>{await R.bg('picnic5');R.label('The silent e','#3b5bdb');const G=S.G=gfx(R);
  S.n=R.act('pa-noralook',{x:-1.9,y:.2,h:NH,face:1,idle:'none'});S.n.st.op=0;S.n.ap();S.n.show(.2);
  S.kit=R.act('pa-kit',{x:.9,y:2.6,h:.7,face:1,idle:'none'});S.kit.st.op=0;S.kit.ap();await S.kit.show(.1);await fly(R,S.kit,.9,.2,.6,{arc:0,spin:Math.PI*2});R.fx('dust',.9,.25,8,{w:.5,t:.6});
  S.w=vTiles(G,'kite',-.2,1.5,.6);S.w[3].a=0;for(const t of S.w.slice(0,3)){await tin(R,t,.22);}await S.kit.jump(.3);},
 'silent e':async(R,S)=>{const e=S.w[3];e.a=0;e.y=2.2;e.s=.6;R.word('shh!',.9,2.0,'#868e96',.9);await all([tileFly(R,e,e.baseX,1.5,.9,.4),R.T(.9,k=>{e.a=.35+.5*k;})]);e.a=.5;await R.wait(.3);},
 'becomes kite':async(R,S)=>{S.w[3].a=1;R.fx('sparkle',S.w[3].x,1.5,20,{w:.6,t:1});await S.kit.swap('kite',.25,{h:.9});await all([S.kit.go(1.5,1.2,1.0,{arc:.5,wob:.08}),S.n.jump(.4)]);hearts(R,1.5,1.7,8);},
 'makes the i long':async(R,S)=>{R.word('I!',S.w[1].x,2.0,vcol('i'),1.2);await all([R.T(1.0,e=>{S.w[1].s=1+.4*Math.sin(e*Math.PI);S.w[1].hl=Math.sin(e*Math.PI);}),S.kit.jump(.4),S.n.jump(.4)]);},
 'cap plus e':async(R,S)=>{for(const t of S.w)tout(R,t,.3);S.kit.hide(.25);await R.wait(.3);S.G.clear();S.cp=R.act('pa-cap',{x:.9,y:.2,h:.55,face:1,idle:'none'});S.cp.st.op=0;S.cp.ap();S.cp.show(.2,'pop');
  S.w=vTiles(S.G,'cape',-.2,1.5,.6);S.w[3].a=0;for(const t of S.w.slice(0,3)){t.s=.2;await tin(R,t,.2);}const e=S.w[3];e.y=2.2;e.s=.6;R.word('shh!',.9,2.0,'#868e96',.8);await all([tileFly(R,e,e.baseX,1.5,.7,.4),R.T(.7,k=>{e.a=k;})]);},
 'long too':async(R,S)=>{S.cp.swap('pa-cape',.2,{h:.9});R.fx('sparkle',.9,.7,20,{w:.6,t:1});R.word('A!',S.w[1].x,2.0,vcol('a'),1.2);S.n.swap('pa-norawave',.2,{h:NH});
  await all([R.T(.9,e=>{S.w[1].s=1+.4*Math.sin(e*Math.PI);S.w[1].hl=Math.sin(e*Math.PI);}),S.n.jump(.4)]);await S.cp.go(.5,1.3,.9,{arc:.5,wob:.08});hearts(R,.5,1.8,10);await all([S.cp.jump(.3),S.n.jump(.3)]);}
};
page('e04',2,{old:mkq(E4b),neu:mkq(E4b),tm:{"the word kit": 0.68, "silent e": 2.49, "becomes kite": 4.72, "makes the i long": 8.16, "cap plus e": 9.28, "long too": 12.67}});
/* ================= LESSON 5 : Rhyming words ================= */
const MH=1.5;
const RCOL=['#2b8a3e','#e8590c','#7048e8','#1c7ed6','#c2255c'];
const rtag=(G,word,cx,y,size,col)=>{const n=word.length,sp=size*1.08,x0=cx-(n-1)*sp/2;return word.split('').map((ch,i)=>{const t=G.tile(ch,x0+i*sp,y,col,size);t.baseX=x0+i*sp;return t;});};
const rpair=async(R,S,w1,x1,w2,x2,y,col)=>{const a=rtag(S.G,w1,x1,y,.26,col),b=rtag(S.G,w2,x2,y,.26,col);const all2=a.concat(b);for(const t of all2)t.s=.2;
  if(S.pr)for(const t of S.pr)tout(R,t,.3);S.pr=all2;for(const t of a)await tin(R,t,.09);for(const t of b)await tin(R,t,.09);await all([...all2.map(t=>glow(R,t,.5))]);R.word('rhyme!',(x1+x2)/2,y-.45,col,.9);return all2;};
const E5s={
 'i like rice':async(R,S)=>{await R.bg('picnic5');R.label('A Spicy Song','#e8590c');S.G=gfx(R);
  S.m=R.act('pa-milosing',{x:-2.4,y:.2,h:MH,face:1,idle:'none'});S.m.st.op=0;S.m.ap();S.m.show(.2);
  S.mic=R.act('pa-mic',{x:-.7,y:.2,h:.85,face:1,idle:'none'});S.mic.st.op=0;S.mic.ap();S.mic.show(.25,'pop');
  await S.m.go(-1.5,.2,1.0,{hops:3});R.fx('note',-1.2,1.6,6,{w:.8,t:1.3});
  S.rc=R.act('pa-rice',{x:.9,y:2.6,h:.55,face:1,idle:'none'});S.rc.st.op=0;S.rc.ap();await S.rc.show(.1);await fly(R,S.rc,.9,.2,.55,{arc:0,spin:Math.PI*2});R.fx('crumb',.9,.3,8,{w:.4,t:.7});S.rc.jump(.3);},
 'that is nice':async(R,S)=>{await all([rpair(R,S,'rice',-1.0,'nice',.9,1.95,RCOL[0]),S.m.jump(.4)]);hearts(R,.9,1.0,6);},
 'i like bread':async(R,S)=>{S.rc.hide(.25);S.br=R.act('pa-bread',{x:2.7,y:.2,h:.65,face:-1,idle:'none'});S.br.st.op=0;S.br.ap();S.br.show(.15);await S.br.go(.9,.2,.9,{lin:true,wob:.04});R.fx('dust',.9,.3,8,{w:.5,t:.6});await S.m.swap('pa-milodance',.2,{h:MH});S.m.jump(.35);},
 'jam on red':async(R,S)=>{S.jm=R.act('pa-jam',{x:.9,y:2.6,h:.55,face:1,idle:'none'});S.jm.st.op=0;S.jm.ap();await S.jm.show(.1);await fly(R,S.jm,.9,.95,.5,{arc:0,spin:-.5});R.fx('sparkle',.9,.9,12,{w:.4,t:.8});await all([rpair(R,S,'bread',-1.0,'red',.9,1.95,RCOL[1]),S.jm.jump(.3)]);},
 'a bowl of soup':async(R,S)=>{S.jm.hide(.25);S.br.hide(.25);S.sp=R.act('pa-soup',{x:.9,y:.2,h:.6,face:1,idle:'none'});S.sp.st.op=0;S.sp.ap();await S.sp.show(.4,'pop');R.fx('dust',.9,.8,10,{w:.3,t:1.2});await S.m.swap('pa-milosing',.2,{h:MH});},
 'the group':async(R,S)=>{S.nr=R.act('pa-norawave',{x:-2.9,y:.2,h:MH,face:1,idle:'none'});S.nr.st.op=0;S.nr.ap();S.nr.show(.15);S.tm=R.act('pa-timwave',{x:3.0,y:.2,h:MH,face:-1,idle:'none'});S.tm.st.op=0;S.tm.ap();S.tm.show(.15);
  await all([S.nr.go(-.2,.2,1.0,{hops:3}),S.tm.go(1.8,.2,1.0,{hops:3}),rpair(R,S,'soup',-1.0,'group',.9,1.95,RCOL[2])]);await all([S.m.jump(.35),S.nr.jump(.35),S.tm.jump(.35)]);},
 'a slice of pie':async(R,S)=>{S.sp.hide(.2);S.pi=R.act('pa-pie',{x:.9,y:.2,h:.6,face:1,idle:'none'});S.pi.st.op=0;S.pi.ap();await S.pi.show(.3,'pop');R.fx('crumb',.9,.4,8,{w:.4,t:.7});},
 'way up high':async(R,S)=>{S.m.swap('pa-milobow',.2,{h:MH});await all([S.pi.go(.9,1.6,.7,{arc:.3}),rpair(R,S,'pie',-1.0,'high',.9,1.95,RCOL[3])]);await S.pi.jump(.3);},
 'food is fun':async(R,S)=>{await S.m.swap('pa-milodance',.2,{h:MH});R.fx('note',-.2,1.6,10,{w:1.6,t:1.6});R.word('Yum! Yum!',.4,1.45,'#e8590c',1.2);await all([S.m.jump(.35),S.nr.jump(.35),S.tm.jump(.35),S.pi.jump(.35)]);await all([S.m.jump(.3),S.nr.jump(.3),S.tm.jump(.3)]);},
 'happy tum':async(R,S)=>{await S.m.swap('pa-milotummy',.2,{h:MH});hearts(R,-1.5,1.9,12);R.fx('sparkle',.3,1.6,24,{w:2,t:1.4});await all([S.m.jump(.4),S.nr.jump(.4),S.tm.jump(.4)]);await S.m.shiver(.5);}
};
page('e05',0,{old:mkq(E5s),neu:mkq(E5s),tm:{"i like rice": 0, "that is nice": 1.27, "i like bread": 2.25, "jam on red": 4.15, "a bowl of soup": 5.04, "the group": 6.93, "a slice of pie": 7.59, "way up high": 9.05, "food is fun": 9.95, "happy tum": 14.69}});
const E5a={
 'cat and hat':async(R,S)=>{await R.bg('playroom1');R.label('Same ending sound','#e8590c');S.G=gfx(R);
  S.ct=R.act('pa-cat',{x:-2.5,y:.2,h:.85,face:1,idle:'none'});S.ct.st.op=0;S.ct.ap();S.ct.show(.2);S.ct.go(-1.0,.2,1.0,{hops:3});
  S.ht=R.act('pa-hat',{x:-1.0,y:2.7,h:.4,face:1,idle:'none'});S.ht.st.op=0;S.ht.ap();await R.wait(.5);await S.ht.show(.1);await fly(R,S.ht,-1.0,.98,.7,{arc:0,spin:Math.PI*2});R.fx('sparkle',-1.0,1.1,14,{w:.4,t:.9});S.ct.jump(.3);
  await rpair(R,S,'cat',-1.0,'hat',.7,1.95,RCOL[0]);},
 'they rhyme':async(R,S)=>{await all([S.ct.jump(.4),R.T(.8,e=>{S.ht.st.y=.98+Math.abs(Math.sin(e*Math.PI))*.35;S.ht.ap();})]);hearts(R,-1.0,1.6,8);R.word('-at',-1.0,1.4,RCOL[0],1.0);},
 'moon and spoon':async(R,S)=>{S.ct.hide(.2);S.ht.hide(.2);S.mn=R.act('pa-moon',{x:.4,y:2.5,h:.8,face:1,idle:'none'});S.mn.st.op=0;S.mn.ap();S.mn.show(.2);await S.mn.go(.4,1.0,.8,{arc:.1});
  S.spn=R.act('pa-spoon',{x:2.7,y:.3,h:1.1,face:-1,idle:'none'});S.spn.st.op=0;S.spn.ap();S.spn.show(.2);S.spn.st.rz=-.5;S.spn.ap();await all([S.spn.go(.5,.55,.8,{arc:.4}),S.mn.go(.45,.85,.8)]);R.fx('sparkle',.45,.85,16,{w:.5,t:1});
  await rpair(R,S,'moon',-1.1,'spoon',.8,1.95,RCOL[2]);},
 'rhyme too':async(R,S)=>{hearts(R,.45,1.4,10);await all([S.mn.jump(.4),S.spn.jump(.4)]);R.word('-oon',.45,1.5,RCOL[2],1.0);await all([S.mn.jump(.3),S.spn.jump(.3)]);}
};
page('e05',1,{old:mkq(E5a),neu:mkq(E5a),tm:{"cat and hat": 0, "they rhyme": 3.03, "moon and spoon": 4.25, "rhyme too": 7.4}});
const E5b={
 'let us sort':async(R,S)=>{await R.bg('schoolyard1');R.label('Sort the rhymes','#e8590c');const G=S.G=gfx(R);
  S.c1=R.act('pa-crate1',{x:-1.0,y:-.4,h:.8,face:1,idle:'none'});S.c1.st.op=0;S.c1.ap();S.c1.show(.2);S.c2=R.act('pa-crate2',{x:1.3,y:-.4,h:.8,face:1,idle:'none'});S.c2.st.op=0;S.c2.ap();S.c2.show(.2);
  await all([S.c1.go(-1.0,.2,.5,{arc:.3}),S.c2.go(1.3,.2,.5,{arc:.3})]);R.fx('dust',-1.0,.3,8,{w:.7,t:.6});R.fx('dust',1.3,.3,8,{w:.7,t:.6});
  for(const t of rtag(G,'og',-1.0,1.35,.4,RCOL[1]).concat(rtag(G,'ee',1.3,1.35,.4,RCOL[3])))await tin(R,t,.2);
  S.it={};for(const[k,a,x,y]of[['pa-frog',null,-1.8,1.8],['pa-dog',null,-.5,1.8],['bee',null,.8,1.8],['pa-tree',null,1.8,1.8]]){const o=R.act(k.replace('pa-frog','frog'),{x:x,y:y+.5,h:.6,face:1,idle:'none'});o.st.op=0;o.ap();o.show(.15,'pop');o.go(x,y-.3,.35,{arc:.1});S.it[k]=o;await R.wait(.3);}
  },
 'frog and dog':async(R,S)=>{const f=S.it['pa-frog'],d=S.it['pa-dog'];await f.go(-1.2,.55,.9,{arc:.9});R.fx('dust',-1.2,.6,8,{w:.4,t:.6});await all([S.c1.shiver(.4),f.jump(.2)]);d.go(-.8,.55,.8,{arc:.8});await R.wait(.8);await all([S.c1.shiver(.5),d.jump(.2)]);R.word('-og!',-1.0,1.7,RCOL[1],1.0);hearts(R,-1.0,1.8,6);},
 'bee and tree':async(R,S)=>{const b=S.it['bee'],t=S.it['pa-tree'];await b.go(1.1,.6,1.0,{arc:.9,wob:.1});await all([S.c2.shiver(.4),b.jump(.2)]);t.go(1.6,.55,.9,{arc:.9});await R.wait(.9);await all([S.c2.shiver(.5),t.jump(.2)]);R.word('-ee!',1.3,1.7,RCOL[3],1.0);hearts(R,1.3,1.8,8);R.fx('sparkle',.1,1.5,26,{w:2.4,t:1.4});await all([S.c1.jump(.35),S.c2.jump(.35)]);}
};
page('e05',2,{old:mkq(E5b),neu:mkq(E5b),tm:{"let us sort": 0, "frog and dog": 1.19, "bee and tree": 3.44}});
/* ================= LESSON 6 : Nouns ================= */
const NC={person:'#1c7ed6',animal:'#e8590c',place:'#2b8a3e',thing:'#7048e8'};
const ntag=async(R,S,word,x,cat,y)=>{y=y||1.95;if(S.tgl)for(const t of S.tgl)tout(R,t,.25);const ts=rtag(S.G,word,x,y,.28,NC[cat]);S.tgl=ts;for(const t of ts)t.s=.2;for(const t of ts)await tin(R,t,.07);R.word(cat+'!',x,y-.42,NC[cat],.9);await all(ts.map(t=>glow(R,t,.45)));};
const SAM_H=1.5;
const E6s={
 'my name is sam':async(R,S)=>{await R.bg('laketown1');R.label('Pen Pals','#2b8a3e');S.G=gfx(R);
  S.sam=R.act('pa-timwave',{x:-2.4,y:.2,h:SAM_H,face:1,idle:'none'});S.sam.st.op=0;S.sam.ap();S.sam.show(.2);await S.sam.go(-1.5,.2,1.0,{hops:3});S.sam.jump(.3);await ntag(R,S,'Sam',-1.5,'person');},
 'a small town':async(R,S)=>{S.h1=R.act('pa-house',{x:1.2,y:-.3,h:.75,face:1,idle:'none'});S.h1.st.op=0;S.h1.ap();S.h2=R.act('pa-house',{x:.2,y:-.3,h:.6,face:1,idle:'none'});S.h2.st.op=0;S.h2.ap();
  S.h2.show(.2,'pop');S.h2.go(.2,.35,.4,{arc:.2});await R.wait(.15);S.h1.show(.2,'pop');await S.h1.go(1.3,.3,.4,{arc:.2});R.fx('dust',.8,.4,12,{w:1.4,t:.7});await ntag(R,S,'town',.8,'place');},
 'a big lake':async(R,S)=>{S.gf=R.act('pa-goldfish',{x:-.3,y:.3,h:.5,face:1,idle:'none'});S.gf.st.op=0;S.gf.ap();S.gf.show(.1);await fly(R,S.gf,.9,.35,1.0,{arc:1.1,spin:Math.PI*2});R.fx('sparkle',.9,.4,16,{w:.6,t:.9});S.gf.hide(.2);await ntag(R,S,'lake',-.2,'place');},
 'a dog':async(R,S)=>{S.dg=R.act('pa-dog',{x:2.6,y:.2,h:.7,face:-1,idle:'none'});S.dg.st.op=0;S.dg.ap();S.dg.show(.1);await S.dg.go(.6,.2,.9,{lin:true,hops:4,wob:.05});R.word('Woof!',.6,1.3,'#a0522d',.8);await all([S.dg.jump(.3),S.sam.jump(.3)]);await ntag(R,S,'dog',.6,'animal');},
 'a red bike':async(R,S)=>{S.bk=R.act('pa-bike',{x:-3.2,y:.2,h:.75,face:1,idle:'none'});S.bk.st.op=0;S.bk.ap();S.bk.show(.1);await S.bk.go(-.4,.2,1.0,{lin:true,wob:.03});R.word('Ring ring!',-.4,1.3,'#e03131',.8);await S.bk.jump(.3);await ntag(R,S,'bike',-.4,'thing');},
 'skate':async(R,S)=>{S.sk=R.act('pa-skates',{x:.3,y:2.4,h:.5,face:1,idle:'none'});S.sk.st.op=0;S.sk.ap();S.sk.show(.1);await fly(R,S.sk,.3,.2,.5,{arc:0});await S.sk.go(2.0,.2,1.0,{lin:true,wob:.06});R.fx('sparkle',1.0,.3,20,{w:1.6,t:1.2});await all([S.sam.jump(.3)]);},
 'your school':async(R,S)=>{S.sc=R.act('pa-school',{x:1.4,y:-.5,h:1.0,face:1,idle:'none'});S.sc.st.op=0;S.sc.ap();S.sc.show(.15);await S.sc.go(1.3,.3,.5,{arc:.2});R.fx('dust',1.3,.3,12,{w:1,t:.7});S.sam.swap('pa-timlook',.2,{h:SAM_H});await ntag(R,S,'school',1.3,'place');},
 'write back':async(R,S)=>{S.sam.swap('pa-timwave',.2,{h:SAM_H});S.lt=R.act('pa-letter',{x:-1.3,y:1.0,h:.35,face:1,idle:'none'});S.lt.st.op=0;S.lt.ap();S.lt.show(.15,'pop');await fly(R,S.lt,1.2,1.7,1.0,{arc:.4,spin:Math.PI*2});hearts(R,1.2,1.8,10);R.fx('sparkle',0,1.5,24,{w:2.4,t:1.4});await all([S.sam.jump(.4),S.dg.jump(.4)]);}
};
page('e06',0,{old:mkq(E6s),neu:mkq(E6s),tm:{"my name is sam": 1.0, "a small town": 3.22, "a big lake": 4.29, "a dog": 5.99, "a red bike": 7.59, "skate": 9.75, "your school": 12.4, "write back": 14.3}});
const E6a={
 'a noun names':async(R,S)=>{await R.bg('schoolyard1');R.label('Nouns name things','#2b8a3e');S.G=gfx(R);
  S.cats=[];for(const[i,c]of['person','animal','place','thing'].entries()){const x=(i%2?.9:-1.0),yy=(i<2?2.05:1.7);const ts=rtag(S.G,c,x,yy,.22,NC[c]);for(const t of ts)t.s=.2;S.cats.push(ts);R.fx('sparkle',x,2.0,6,{w:.4,t:.6});for(const t of ts)await tin(R,t,.05);}},
 'a teacher':async(R,S)=>{S.tc=R.act('pa-teacher',{x:-2.5,y:.2,h:1.3,face:1,idle:'none'});S.tc.st.op=0;S.tc.ap();S.tc.show(.15);await S.tc.go(-1.7,.2,.8,{hops:3});await all(S.cats[0].map(t=>glow(R,t,.6)));R.word('person!',-1.7,1.75,NC.person,1);S.tc.jump(.3);},
 'a bear':async(R,S)=>{S.br=R.act('pa-bear',{x:-.5,y:2.5,h:.8,face:1,idle:'none'});S.br.st.op=0;S.br.ap();await S.br.show(.1);await fly(R,S.br,-.55,.2,.6,{arc:0});R.fx('dust',-.55,.3,8,{w:.6,t:.6});await all(S.cats[1].map(t=>glow(R,t,.6)));R.word('animal!',-.55,1.4,NC.animal,1);S.br.jump(.3);},
 'a school':async(R,S)=>{S.sc=R.act('pa-school',{x:.7,y:-.6,h:1.0,face:1,idle:'none'});S.sc.st.op=0;S.sc.ap();S.sc.show(.15);await S.sc.go(.75,.3,.5,{arc:.2});R.fx('dust',.75,.3,12,{w:1,t:.7});await all(S.cats[2].map(t=>glow(R,t,.6)));R.word('place!',.75,1.55,NC.place,1);S.sc.jump(.3);},
 'a book':async(R,S)=>{S.bk=R.act('pa-bluebook',{x:1.9,y:2.5,h:.6,face:1,idle:'none'});S.bk.st.op=0;S.bk.ap();await S.bk.show(.1);await fly(R,S.bk,1.9,.2,.6,{arc:0,spin:Math.PI*2});R.fx('crumb',1.9,.3,8,{w:.5,t:.7});await all(S.cats[3].map(t=>glow(R,t,.6)));R.word('thing!',1.9,1.3,NC.thing,1);hearts(R,0,1.7,10);await all([S.tc.jump(.4),S.br.jump(.4),S.sc.jump(.4),S.bk.jump(.4)]);}
};
page('e06',1,{old:mkq(E6a),neu:mkq(E6a),tm:{"a noun names": 0, "a teacher": 4.26, "a bear": 6.42, "a school": 8.4, "a book": 10.33}});
const E6b={
 'let us sort':async(R,S)=>{await R.bg('schoolyard1');R.label('Sort the nouns','#2b8a3e');const G=S.G=gfx(R);
  S.c1=R.act('pa-crate1',{x:-1.1,y:-.4,h:.8,face:1,idle:'none'});S.c1.st.op=0;S.c1.ap();S.c1.show(.2);S.c2=R.act('pa-crate2',{x:1.3,y:-.4,h:.8,face:1,idle:'none'});S.c2.st.op=0;S.c2.ap();S.c2.show(.2);
  await all([S.c1.go(-1.1,.2,.5,{arc:.3}),S.c2.go(1.3,.2,.5,{arc:.3})]);R.fx('dust',-1.1,.3,8,{w:.7,t:.6});R.fx('dust',1.3,.3,8,{w:.7,t:.6});
  for(const t of rtag(G,'people',-1.1,1.3,.19,NC.person).concat(rtag(G,'animals',1.1,1.3,.19,NC.animal)))await tin(R,t,.08);
  S.it={};for(const[k,x]of[['pa-doctor',-1.9],['pa-baby',-.6],['pa-cat',.8],['pa-goldfish',1.8]]){const o=R.act(k,{x:x,y:2.2,h:k==='pa-doctor'?.85:.6,face:1,idle:'none'});o.st.op=0;o.ap();o.show(.15,'pop');o.go(x,1.7,.35,{arc:.1});S.it[k]=o;await R.wait(.3);}},
 'doctor and baby':async(R,S)=>{const d=S.it['pa-doctor'],b=S.it['pa-baby'];await d.go(-1.3,.5,.9,{arc:.9});R.fx('dust',-1.3,.5,8,{w:.4,t:.6});await all([S.c1.shiver(.4),d.jump(.2)]);b.go(-.9,.5,.8,{arc:.8});await R.wait(.8);await all([S.c1.shiver(.5),b.jump(.2)]);R.word('people!',-1.1,1.7,NC.person,1);hearts(R,-1.1,1.8,6);},
 'cat and fish':async(R,S)=>{const c=S.it['pa-cat'],f=S.it['pa-goldfish'];await c.go(1.1,.5,.9,{arc:.9});await all([S.c2.shiver(.4),c.jump(.2)]);f.go(1.6,.5,.8,{arc:.8});await R.wait(.8);await all([S.c2.shiver(.5),f.jump(.2)]);R.word('animals!',1.3,1.7,NC.animal,1);hearts(R,1.3,1.8,8);R.fx('sparkle',.1,1.5,26,{w:2.4,t:1.4});await all([S.c1.jump(.35),S.c2.jump(.35)]);}
};
page('e06',2,{old:mkq(E6b),neu:mkq(E6b),tm:{"let us sort": 0, "doctor and baby": 2.92, "cat and fish": 5.43}});
/* ================= LESSON 7 : Common nouns ================= */
const DAD_H=1.45;
const E7s={
 'every saturday':async(R,S)=>{await R.bg('kitchen-day');R.label('Our Busy Kitchen','#e8590c');S.G=gfx(R);
  S.dad=R.act('pa-dadwave',{x:-2.5,y:.2,h:DAD_H,face:1,idle:'none'});S.dad.st.op=0;S.dad.ap();S.dad.show(.2);await S.dad.go(-1.6,.2,1.0,{hops:3});
  S.bw=R.act('pa-bowl',{x:.2,y:2.5,h:.5,face:1,idle:'none'});S.bw.st.op=0;S.bw.ap();await S.bw.show(.1);await fly(R,S.bw,.2,.2,.55,{arc:0,spin:Math.PI*2});R.fx('dust',.2,.25,8,{w:.5,t:.6});S.bw.jump(.3);},
 'my dad':async(R,S)=>{S.dad.swap('pa-dadcheer',.2,{h:DAD_H});await all([S.dad.jump(.4),ntag(R,S,'dad',-1.6,'person')]);},
 'the eggs':async(R,S)=>{S.eg=R.act('pa-eggs',{x:1.4,y:2.5,h:.5,face:1,idle:'none'});S.eg.st.op=0;S.eg.ap();await S.eg.show(.1);await fly(R,S.eg,1.4,.2,.55,{arc:0});R.fx('dust',1.4,.25,8,{w:.5,t:.6});
  for(let i=0;i<2;i++){const e=R.act('egg',{x:1.4,y:.5,h:.25,face:1,idle:'none'});e.st.op=0;e.ap();e.show(.05);await fly(R,e,.2,.45,.6,{arc:.9,spin:Math.PI*3});R.fx('crumb',.2,.5,10,{w:.3,t:.6});e.hide(.1);}
  await ntag(R,S,'eggs',1.4,'thing');},
 'my brother':async(R,S)=>{S.bro=R.act('pa-timwave',{x:2.8,y:.2,h:1.3,face:-1,idle:'none'});S.bro.st.op=0;S.bro.ap();S.bro.show(.2);await S.bro.go(.9,.2,.9,{hops:3});S.bro.swap('pa-timcheer',.2,{h:1.3});ntag(R,S,'brother',.9,'person');
  S.fl=R.act('pa-flour',{x:-.6,y:.9,h:.55,face:1,idle:'none'});S.fl.st.op=0;S.fl.ap();S.fl.show(.2,'pop');await R.wait(.3);await R.T(.7,e=>{S.fl.st.rz=-.9*Math.sin(e*Math.PI);S.fl.ap();});R.fx('dust',.2,.7,16,{w:.4,t:1});
  S.mk=R.act('pa-milk',{x:.8,y:1.1,h:.55,face:1,idle:'none'});S.mk.st.op=0;S.mk.ap();S.mk.show(.2,'pop');await R.wait(.3);await R.T(.7,e=>{S.mk.st.rz=.9*Math.sin(e*Math.PI);S.mk.ap();});R.fx('sparkle',.25,.7,12,{w:.3,t:.9});await S.bro.jump(.3);S.fl.hide(.2);S.mk.hide(.2);},
 'the pan':async(R,S)=>{S.dad.swap('pa-dadpan',.2,{h:DAD_H});S.pn=R.act('pa-pan',{x:-.5,y:.8,h:.4,face:1,idle:'none'});S.pn.st.op=0;S.pn.ap();S.pn.show(.2,'pop');R.fx('dust',-.5,1.0,8,{w:.4,t:1});
  await fly(R,S.bw,-.5,.8,.5,{arc:.4,spin:-.5});R.fx('sparkle',-.5,.9,14,{w:.3,t:.8});S.bw.hide(.2);S.pc=R.act('pa-pancakes',{x:-.5,y:.8,h:.35,face:1,idle:'none'});S.pc.st.op=0;S.pc.ap();S.pc.show(.2,'pop');await fly(R,S.pc,-.5,.8,.8,{arc:1.0,spin:Math.PI*2});await S.dad.jump(.3);ntag(R,S,'pan',-.5,'thing');},
 'our cat':async(R,S)=>{S.wn=R.act('pa-window',{x:1.9,y:1.0,h:.8,face:1,idle:'none'});S.wn.st.op=0;S.wn.ap();S.wn.show(.2,'pop');S.ct=R.act('pa-cat',{x:2.8,y:.2,h:.6,face:-1,idle:'none'});S.ct.st.op=0;S.ct.ap();S.ct.show(.1);await S.ct.go(1.9,.2,.7,{hops:2});await S.ct.go(1.9,.85,.5,{arc:.4});R.word('Meow!',1.9,1.7,'#e8590c',.8);await ntag(R,S,'cat',1.9,'animal');},
 'the table':async(R,S)=>{S.tb=R.act('pa-table21',{x:.2,y:.2,h:.85,face:1,idle:'none'});S.tb.st.op=0;S.tb.ap();S.tb.show(.25,'pop');R.fx('dust',.2,.3,10,{w:1,t:.7});
  S.pl=R.act('pa-plate',{x:.2,y:2.5,h:.2,face:1,idle:'none'});S.pl.st.op=0;S.pl.ap();await S.pl.show(.1);await fly(R,S.pl,.2,.95,.5,{arc:0});S.pc2=R.act('pa-pancakes',{x:.2,y:2.5,h:.4,face:1,idle:'none'});S.pc2.st.op=0;S.pc2.ap();await S.pc2.show(.1);await fly(R,S.pc2,.2,1.15,.5,{arc:0});R.fx('sparkle',.2,1.3,16,{w:.4,t:.9});ntag(R,S,'table',.2,'thing');
  await all([S.dad.go(-1.1,.2,.7,{hops:2}),S.bro.go(1.0,.2,.7,{hops:2})]);},
 'yum':async(R,S)=>{S.dad.swap('pa-dadcheer',.2,{h:DAD_H});R.word('Yum!',.2,1.7,'#e8590c',1.2);hearts(R,.2,1.9,12);R.fx('sparkle',.2,1.6,26,{w:2.2,t:1.4});await all([S.dad.jump(.4),S.bro.jump(.4),S.ct.jump(.4)]);await all([S.dad.jump(.3),S.bro.jump(.3)]);}
};
page('e07',0,{old:mkq(E7s),neu:mkq(E7s),tm:{"every saturday": 0, "my dad": 2.3, "the eggs": 3.81, "my brother": 4.6, "the pan": 9.12, "our cat": 9.64, "the table": 13.64, "yum": 14.74}});
const E7a={
 'a common noun':async(R,S)=>{await R.bg('sunhill1');R.label('Any one at all','#e8590c');S.G=gfx(R);R.word('ANY!',-.2,1.6,'#e8590c',1.2);hearts(R,-.2,1.9,8);R.fx('sparkle',-.2,1.6,20,{w:2,t:1.2});await R.wait(.6);},
 'sister':async(R,S)=>{S.sis=R.act('pa-miawave',{x:-2.5,y:.2,h:1.3,face:1,idle:'none'});S.sis.st.op=0;S.sis.ap();S.sis.show(.15);await S.sis.go(-1.7,.2,.6,{hops:2});ntag(R,S,'sister',-1.5,'person',1.95);},
 'duck':async(R,S)=>{S.dk=R.act('pa-duck',{x:-.55,y:2.2,h:.6,face:1,idle:'none'});S.dk.st.op=0;S.dk.ap();S.dk.show(.1);await fly(R,S.dk,-.55,.2,.4,{arc:0});S.dk.jump(.25);},
 'garden':async(R,S)=>{S.gd=R.act('pa-tree',{x:.5,y:-.3,h:.9,face:1,idle:'none'});S.gd.st.op=0;S.gd.ap();S.gd.show(.15,'pop');await S.gd.go(.5,.25,.4,{arc:.2});R.fx('sparkle',.5,.8,14,{w:.6,t:.8});},
 'and paper':async(R,S)=>{S.pp=R.act('paper',{x:1.5,y:2.2,h:.5,face:1,idle:'none'});S.pp.st.op=0;S.pp.ap();S.pp.show(.1);await fly(R,S.pp,1.5,.2,.4,{arc:0,spin:Math.PI*2});},
 'small letters':async(R,S)=>{if(S.tgl)for(const t of S.tgl)tout(R,t,.2);S.tgl=[];for(const[w,x,yy]of[['sister',-1.0,2.0],['duck',.9,2.0],['garden',-1.0,1.65],['paper',.9,1.65]]){const ts=rtag(S.G,w,x,yy,.22,'#e8590c');for(const t of ts)t.s=.2;S.tgl=S.tgl.concat(ts);for(const t of ts)await tin(R,t,.04);}
  R.word('small letters!',0,1.3,'#e8590c',1.4);await wave(R,S.tgl);hearts(R,0,1.6,10);await all([S.sis.jump(.3),S.dk.jump(.3),S.gd.jump(.3),S.pp.jump(.3)]);}
};
page('e07',1,{old:mkq(E7a),neu:mkq(E7a),tm:{"a common noun": 0, "sister": 4.41, "duck": 5.51, "garden": 6.08, "and paper": 6.58, "small letters": 9.96}});
const E7b={
 'find the common':async(R,S)=>{await R.bg('playroom1');R.label('Build a sentence','#e8590c');S.G=gfx(R);
  S.mt=R.act('pa-blanket',{x:.8,y:.2,h:.28,face:1,idle:'none'});S.mt.st.op=0;S.mt.ap();S.mt.show(.25,'pop');R.fx('dust',.8,.25,8,{w:.8,t:.6});
  S.ct=R.act('pa-cat',{x:-2.3,y:.2,h:.8,face:1,idle:'none'});S.ct.st.op=0;S.ct.ap();S.ct.show(.2);
  S.q=['?','?','?'].map((q,i)=>{const t=S.G.tile(q,-1.0+i*.7,1.95,'#adb5bd',.36);t.s=.2;return t;});for(const t of S.q)await tin(R,t,.15);R.word('nouns?',-.3,1.5,'#e8590c',.9);},
 'the cat sat':async(R,S)=>{for(const t of S.q)tout(R,t,.2);await S.ct.go(.4,.2,.9,{hops:3});await S.ct.go(.8,.38,.5,{arc:.5});R.word('purr',.8,1.2,'#e8590c',.9);await S.ct.jump(.25);},
 'cat and mat':async(R,S)=>{const c=rtag(S.G,'cat',-.9,1.95,.4,NC.animal),m=rtag(S.G,'mat',.9,1.95,.4,NC.thing);for(const t of c.concat(m))t.s=.2;for(const t of c)await tin(R,t,.1);for(const t of m)await tin(R,t,.1);await all(c.concat(m).map(t=>glow(R,t,.6)));R.word('common nouns!',.35,1.45,'#e8590c',1.2);hearts(R,.8,1.0,10);R.fx('sparkle',.3,1.6,24,{w:2,t:1.2});await S.ct.jump(.4);await S.ct.jump(.3);}
};
page('e07',2,{old:mkq(E7b),neu:mkq(E7b),tm:{"find the common": 0, "the cat sat": 2.89, "cat and mat": 4.43}});
/* ================= LESSON 8 : Proper nouns ================= */
const GOLD='#e8a900';
const ptag=async(R,S,word,x,y,sz,crown)=>{y=y||1.95;sz=sz||.3;if(S.tgl)for(const t of S.tgl)tout(R,t,.25);const n=word.length,sp=sz*1.08,x0=x-(n-1)*sp/2;const ts=word.split('').map((ch,i)=>{const t=S.G.tile(ch,x0+i*sp,y,i===0?GOLD:'#5c7cfa',i===0?sz*1.3:sz);t.s=.2;return t;});S.tgl=ts;
  for(const t of ts.slice(1))t.a=0;await tin(R,ts[0],.2);const cw=R.act('pa-crown',{x:ts[0].x,y:y+1.0,h:.3,face:1,idle:'none'});cw.st.op=0;cw.ap();cw.show(.05);await fly(R,cw,ts[0].x,y+.3,.4,{arc:0});R.fx('sparkle',ts[0].x,y+.3,12,{w:.3,t:.8});for(const t of ts.slice(1)){t.a=1;await tin(R,t,.06);}await R.wait(.25);cw.hide(.3);};
const E8s={
 'hi leo':async(R,S)=>{await R.bg('street');R.label('A Letter from Vancouver','#c2255c');S.G=gfx(R);
  S.nr=R.act('pa-norawave',{x:-2.5,y:.2,h:1.5,face:1,idle:'none'});S.nr.st.op=0;S.nr.ap();S.nr.show(.2);await S.nr.go(-1.5,.2,1.0,{hops:3});S.nr.jump(.3);await ptag(R,S,'Leo',-1.5);},
 'vancouver':async(R,S)=>{await R.bg('city1');S.G=gfx(R);S.nr=R.act('pa-norawave',{x:-1.5,y:.2,h:1.5,face:1,idle:'none'});S.nr.st.op=0;S.nr.ap();S.nr.show(.2);S.nr.jump(.3);R.fx('sparkle',.8,1.4,20,{w:1.6,t:1});await ptag(R,S,'Vancouver',.3);},
 'maple lane':async(R,S)=>{S.sg=R.act('pa-signpost',{x:1.5,y:-.4,h:.95,face:1,idle:'none'});S.sg.st.op=0;S.sg.ap();S.sg.show(.15);await S.sg.go(1.5,.25,.5,{arc:.2});R.fx('dust',1.5,.3,10,{w:.7,t:.6});S.ml=R.act('pa-mapleleaf',{x:1.5,y:2.4,h:.3,face:1,idle:'none'});S.ml.st.op=0;S.ml.ap();await S.ml.show(.1);await fly(R,S.ml,1.5,.9,.8,{arc:.2,spin:Math.PI*3});await ptag(R,S,'Maple',-.2,1.95);},
 'cat biscuit':async(R,S)=>{S.ct=R.act('pa-cat',{x:-2.8,y:.2,h:.7,face:1,idle:'none'});S.ct.st.op=0;S.ct.ap();S.ct.show(.1);await S.ct.go(-.2,.2,1.0,{hops:4});R.word('Meow!',-.2,1.2,'#e8590c',.8);S.ct.jump(.3);await ptag(R,S,'Biscuit',-.2);},
 'sunday':async(R,S)=>{S.sn=R.act('pa-sunface',{x:1.2,y:-.2,h:.7,face:1,idle:'none'});S.sn.st.op=0;S.sn.ap();S.sn.show(.2);S.sn.go(1.2,1.4,1.0,{arc:.1});await ptag(R,S,'Sunday',1.0,1.95);},
 'stanley park':async(R,S)=>{await R.bg('park');S.G=gfx(R);S.nr=R.act('pa-norapoint',{x:-1.5,y:.2,h:1.5,face:1,idle:'none'});S.nr.st.op=0;S.nr.ap();S.nr.show(.2);S.hr=R.act('pa-heron',{x:2.7,y:.2,h:1.0,face:-1,idle:'none'});S.hr.st.op=0;S.hr.ap();S.hr.show(.2);await S.hr.go(.9,.2,1.0,{hops:2,wob:.04});await ptag(R,S,'Stanley',-.1,1.95);},
 'toronto':async(R,S)=>{S.nr.swap('pa-noralook',.2,{h:1.5});S.ml=R.act('pa-mapleleaf',{x:.2,y:2.4,h:.35,face:1,idle:'none'});S.ml.st.op=0;S.ml.ap();S.ml.show(.1);await fly(R,S.ml,.2,1.2,.8,{arc:.2,spin:Math.PI*2});await ptag(R,S,'Toronto',.2,1.95);},
 'from nora':async(R,S)=>{S.nr.swap('pa-norawave',.2,{h:1.5});await ptag(R,S,'Nora',-1.0,1.95);hearts(R,-1.0,1.9,10);R.fx('sparkle',0,1.5,24,{w:2.4,t:1.4});await all([S.nr.jump(.4),S.hr.jump(.4)]);}
};
page('e08',0,{old:mkq(E8s),neu:mkq(E8s),tm:{"hi leo": 0, "vancouver": 1.75, "maple lane": 4.72, "cat biscuit": 6.16, "sunday": 9.2, "stanley park": 10.53, "toronto": 12.41, "from nora": 14.5}});
const E8a={
 'girl is a common':async(R,S)=>{await R.bg('playroom1');R.label('Special names','#c2255c');S.G=gfx(R);
  S.mia=R.act('pa-miawave',{x:-2.5,y:.2,h:1.5,face:1,idle:'none'});S.mia.st.op=0;S.mia.ap();S.mia.show(.2);await S.mia.go(-1.5,.2,1.0,{hops:3});
  S.t1=rtag(S.G,'girl',-1.5,1.95,.28,'#adb5bd');for(const t of S.t1)t.s=.2;for(const t of S.t1)await tin(R,t,.1);R.word('common',-1.5,1.5,'#868e96',.9);},
 'mia is a proper':async(R,S)=>{S.mia.swap('pa-miacheer',.2,{h:1.5});for(const t of S.t1)tout(R,t,.3);S.tgl=null;await all([S.mia.jump(.4),ptag(R,S,'Mia',-1.5)]);R.word('proper!',-1.5,1.5,GOLD,1.0);},
 'dog is common':async(R,S)=>{S.dg=R.act('pa-dog',{x:2.6,y:.2,h:.7,face:-1,idle:'none'});S.dg.st.op=0;S.dg.ap();S.dg.show(.1);await S.dg.go(.7,.2,.9,{lin:true,hops:4});const t2=rtag(S.G,'dog',.7,1.95,.28,'#adb5bd');for(const t of t2)t.s=.2;for(const t of t2)await tin(R,t,.1);await R.wait(.8);for(const t of t2)tout(R,t,.3);await ptag(R,S,'Rex',.7);R.word('proper!',.7,1.5,GOLD,1.0);await S.dg.jump(.3);},
 'capital letter':async(R,S)=>{R.word('Capital Letter!',-.4,1.55,GOLD,1.6);hearts(R,-.4,1.8,10);for(const x of[-1.5,.7]){const cw=R.act('pa-crown',{x:x,y:2.6,h:.35,face:1,idle:'none'});cw.st.op=0;cw.ap();cw.show(.05);fly(R,cw,x,1.75,.6,{arc:0,spin:Math.PI*2});}R.fx('sparkle',-.4,1.6,30,{w:2.6,t:1.5});await all([S.mia.jump(.4),S.dg.jump(.4)]);await all([S.mia.jump(.3),S.dg.jump(.3)]);}
};
page('e08',1,{old:mkq(E8a),neu:mkq(E8a),tm:{"girl is a common": 0, "mia is a proper": 1.83, "dog is common": 6.66, "capital letter": 12.09}});
const E8b={
 'the name ottawa':async(R,S)=>{await R.bg('street');R.label('Give it a capital','#c2255c');const G=S.G=gfx(R);
  S.hs=R.act('pa-house',{x:1.4,y:-.3,h:.9,face:1,idle:'none'});S.hs.st.op=0;S.hs.ap();S.hs.show(.2);S.hs.go(1.4,.3,.5,{arc:.2});
  S.w=vTiles(G,'ottawa',-.6,1.45,.5,0);S.w[0].gap=true;for(const t of S.w){t.col=t.col||'#5c7cfa';t.s=.2;}for(const t of S.w.slice(1)){t.col='#5c7cfa';await tin(R,t,.12);}await tin(R,S.w[0],.12);},
 'needs a capital':async(R,S)=>{S.c=['O','o','A'].map((ch,i)=>{const t=S.G.tile(ch,-.9+i*.8,2.5,GOLD,.5);return t;});for(const t of S.c){R.T(.8,e=>{t.y=2.5+(.7-2.5)*(1-Math.pow(1-e,2))+Math.abs(Math.sin(e*Math.PI*2.5))*.2*(1-e);});await R.wait(.25);}await R.wait(.7);await glow(R,S.c[0],.8);R.word('O is capital!',-.6,1.95,GOLD,1.2);S.c[1].a=.4;S.c[2].a=.4;},
 'fill the first space':async(R,S)=>{S.w[0].gap=false;S.w[0].ch='O';S.w[0].col=GOLD;S.w[0].s=1;S.w[0].a=0;await all([tileFly(R,S.c[0],S.w[0].x,S.w[0].y,.9,.7),R.T(.9,e=>{S.w[0].a=e;})]);S.G.rmTile(S.c[0]);S.w[0].a=1;R.T(.6,e=>{S.c[1].a=.35*(1-e);S.c[2].a=.35*(1-e);});
  const cw=R.act('pa-crown',{x:S.w[0].x,y:2.6,h:.35,face:1,idle:'none'});cw.st.op=0;cw.ap();cw.show(.05);await fly(R,cw,S.w[0].x,S.w[0].y+.4,.5,{arc:0});R.fx('sparkle',-.6,1.5,26,{w:1.4,t:1.2});await all([S.hs.jump(.4),glow(R,S.w[0],.8)]);hearts(R,1.4,1.4,8);await wave(R,S.w);cw.hide(.3);}
};
page('e08',2,{old:mkq(E8b),neu:mkq(E8b),tm:{"the name ottawa": 0, "needs a capital": 1.42, "fill the first space": 4.73}});
/* ================= LESSON 9 : One and more than one ================= */
const PG='#e8a900';
const pltag=async(R,S,word,x,y,plural,keep)=>{y=y||1.95;const sz=.28;if(S.tgl&&!keep)for(const t of S.tgl)tout(R,t,.25);const n=word.length+(plural?1:0),sp=sz*1.08,x0=x-(n-1)*sp/2;
  const ts=word.split('').map((ch,i)=>{const t=S.G.tile(ch,x0+i*sp,y,'#0c8599',sz);t.s=.2;return t;});for(const t of ts)await tin(R,t,.06);
  if(plural){const t=S.G.tile('s',x0+word.length*sp,y+1.0,PG,sz*1.25);t.s=1;await tileFly(R,t,x0+word.length*sp,y,.45,.2);R.fx('sparkle',t.x,y,12,{w:.3,t:.7});ts.push(t);}
  S.tgl=ts;return ts;};
const E9s={
 'baby brother':async(R,S)=>{await R.bg('livingroom');R.label('The New Baby','#e8590c');S.G=gfx(R);
  S.mia=R.act('pa-miawave',{x:-2.4,y:.2,h:1.45,face:1,idle:'none'});S.mia.st.op=0;S.mia.ap();S.mia.show(.2);await S.mia.go(-1.7,.2,.9,{hops:3});
  S.bb=R.act('pa-baby',{x:.2,y:2.6,h:.55,face:1,idle:'none'});S.bb.st.op=0;S.bb.ap();await S.bb.show(.1);await fly(R,S.bb,.2,.3,.7,{arc:0,spin:Math.PI*2});R.fx('dust',.2,.3,10,{w:.6,t:.6});hearts(R,.2,1.0,8);S.mia.jump(.3);await pltag(R,S,'brother',.2,1.95,false);R.word('one!',.2,1.5,'#0c8599',.9);},
 'tiny hands':async(R,S)=>{S.mia.swap('pa-miapoint',.2,{h:1.45});await S.bb.shiver(.5);R.fx('sparkle',.2,.6,12,{w:.7,t:.8});await pltag(R,S,'hand',.2,1.95,true);R.word('2 hands',.2,1.5,'#0c8599',.9);},
 'ten tiny toes':async(R,S)=>{for(let i=0;i<10;i++){R.fx('sparkle',-.1+i*.07,.15,3,{w:.2,t:.5});await R.wait(.12);}await pltag(R,S,'toe',.2,1.95,true);R.word('10 toes',.2,1.5,'#0c8599',.9);await S.bb.jump(.3);},
 'two soft blankets':async(R,S)=>{S.mia.swap('pa-miawave',.2,{h:1.45});S.b1=R.act('pa-blanket',{x:1.8,y:2.4,h:.28,face:1,idle:'none'});S.b2=R.act('pa-blanket',{x:1.8,y:2.4,h:.28,face:1,idle:'none'});for(const b of[S.b1,S.b2]){b.st.op=0;b.ap();}
  await S.b1.show(.1);await fly(R,S.b1,1.3,.2,.5,{arc:0,spin:Math.PI*2});await S.b2.show(.1);await fly(R,S.b2,1.55,.5,.5,{arc:0,spin:-Math.PI*2});R.fx('dust',1.4,.3,10,{w:.7,t:.6});await pltag(R,S,'blanket',1.4,1.95,true);R.word('2 blankets',1.4,1.5,'#0c8599',.9);},
 'made a cake':async(R,S)=>{S.ck=R.act('pa-cake',{x:-.6,y:2.6,h:.7,face:1,idle:'none'});S.ck.st.op=0;S.ck.ap();await S.ck.show(.1);await fly(R,S.ck,-.6,.2,.6,{arc:0,spin:Math.PI*2});R.fx('crumb',-.6,.3,10,{w:.5,t:.7});await pltag(R,S,'cake',-.6,1.95,false);R.word('one!',-.6,1.5,'#0c8599',.9);await S.ck.jump(.3);},
 'cards':async(R,S)=>{const xs=[-1.1,-.6,-.1];S.cd=[];for(const x of xs){const c=R.act('pa-card',{x:2.8,y:1.2,h:.4,face:1,idle:'none'});c.st.op=0;c.ap();c.show(.05);S.cd.push(c);fly(R,c,x+1.5,.25,.5,{arc:.6,spin:Math.PI*2});await R.wait(.25);}await R.wait(.4);await pltag(R,S,'card',.7,1.95,true);},
 'hearts':async(R,S)=>{hearts(R,.7,1.0,14);R.word('♥ ♥ ♥',.7,1.4,'#e03131',1);await pltag(R,S,'heart',.7,1.95,true);},
 'and stars':async(R,S)=>{S.st=[];for(const x of[-.4,.5,1.4]){const a=R.act('pa-star',{x:x,y:2.3,h:.35,face:1,idle:'none'});a.st.op=0;a.ap();a.show(.1,'pop');R.fx('sparkle',x,2.0,8,{w:.3,t:.6});S.st.push(a);await R.wait(.2);}await pltag(R,S,'star',.5,1.5,true);hearts(R,0,1.9,10);R.fx('sparkle',0,1.5,26,{w:2.4,t:1.4});await all([S.mia.jump(.4),S.bb.jump(.4),S.ck.jump(.4)]);}
};
page('e09',0,{old:mkq(E9s),neu:mkq(E9s),tm:{"baby brother": 0.74, "tiny hands": 3.4, "ten tiny toes": 4.63, "two soft blankets": 7.32, "made a cake": 9.29, "cards": 11.73, "hearts": 12.46, "and stars": 12.91}});
const E9a={
 'singular means':async(R,S)=>{await R.bg('livingroom');R.label('One or more than one','#e8590c');S.G=gfx(R);R.word('1  or  many?',-.2,1.6,'#0c8599',1.3);await R.wait(.5);},
 'one cat':async(R,S)=>{S.c1=R.act('pa-cat',{x:-1.8,y:2.4,h:.7,face:1,idle:'none'});S.c1.st.op=0;S.c1.ap();await S.c1.show(.1);await fly(R,S.c1,-1.8,.2,.5,{arc:0});R.fx('dust',-1.8,.3,8,{w:.5,t:.6});await pltag(R,S,'cat',-1.5,1.95,false);R.word('one!',-1.5,1.5,'#0c8599',.9);},
 'plural means':async(R,S)=>{S.c1.jump(.3);await R.wait(.3);},
 'two cats':async(R,S)=>{S.c2=R.act('pa-cat',{x:-.8,y:2.4,h:.7,face:1,idle:'none'});S.c2.st.op=0;S.c2.ap();await S.c2.show(.1);await fly(R,S.c2,-1.0,.2,.5,{arc:0});R.fx('dust',-1.0,.3,8,{w:.5,t:.6});await pltag(R,S,'cat',-.7,1.95,true);R.word('2 cats!',-.7,1.5,'#0c8599',.9);await all([S.c1.jump(.3),S.c2.jump(.3)]);},
 'one apple':async(R,S)=>{S.a1=R.act('pa-apple',{x:.9,y:2.4,h:.45,face:1,idle:'none'});S.a1.st.op=0;S.a1.ap();await S.a1.show(.1);await fly(R,S.a1,.9,.2,.5,{arc:0});await pltag(R,S,'apple',1.1,1.95,false);},
 'three apples':async(R,S)=>{S.a2=R.act('pa-apple',{x:1.4,y:2.4,h:.45,face:1,idle:'none'});S.a3=R.act('pa-apple',{x:1.0,y:2.4,h:.45,face:1,idle:'none'});for(const a of[S.a2,S.a3]){a.st.op=0;a.ap();}
  await S.a2.show(.1);await fly(R,S.a2,1.5,.2,.4,{arc:0});await S.a3.show(.1);await fly(R,S.a3,1.2,.55,.4,{arc:0});await pltag(R,S,'apple',1.1,1.95,true);R.word('3 apples!',1.1,1.5,'#0c8599',.9);hearts(R,0,1.7,10);await all([S.c1.jump(.3),S.c2.jump(.3),S.a1.jump(.3),S.a2.jump(.3),S.a3.jump(.3)]);}
};
page('e09',1,{old:mkq(E9a),neu:mkq(E9a),tm:{"singular means": 0, "one cat": 1.84, "plural means": 2.58, "two cats": 4.9, "one apple": 5.55, "three apples": 6.88}});
const E9b={
 'add an s':async(R,S)=>{await R.bg('livingroom');R.label('Add an s','#e8590c');const G=S.G=gfx(R);
  S.w=vTiles(G,'book',-.6,1.45,.55);for(const t of S.w){t.col='#0c8599';t.s=.2;}for(const t of S.w)await tin(R,t,.1);
  S.bk=R.act('pa-bluebook',{x:-.4,y:2.4,h:.6,face:1,idle:'none'});S.bk.st.op=0;S.bk.ap();await S.bk.show(.1);await fly(R,S.bk,-.4,.25,.5,{arc:0,spin:Math.PI*2});R.fx('dust',-.4,.3,8,{w:.5,t:.6});
  S.sb=G.tile('s',2.2,1.45,PG,.6);S.sb.s=.2;await tin(R,S.sb,.3);R.word('add an s!',1.6,1.95,PG,1.0);},
 'book becomes books':async(R,S)=>{const x=S.w[3].x+.6*1.08;await all([tileFly(R,S.sb,x,1.45,.9,.6)]);R.fx('sparkle',x,1.45,16,{w:.4,t:.9});
  S.bk2=R.act('pa-bluebook',{x:.6,y:2.4,h:.6,face:1,idle:'none'});S.bk3=R.act('pa-bluebook',{x:1.3,y:2.4,h:.6,face:1,idle:'none'});for(const b of[S.bk2,S.bk3]){b.st.op=0;b.ap();}
  await S.bk2.show(.1,'pop');await fly(R,S.bk2,.4,.25,.4,{arc:.5,spin:Math.PI*2});await S.bk3.show(.1,'pop');await fly(R,S.bk3,1.2,.25,.4,{arc:.5,spin:-Math.PI*2});R.fx('sparkle',.5,.6,20,{w:1.4,t:1});R.word('books!',.5,1.0,'#0c8599',1.0);},
 'slide into place':async(R,S)=>{await all([glow(R,S.sb,.7),S.bk.jump(.35),S.bk2.jump(.35),S.bk3.jump(.35)]);hearts(R,.3,1.7,10);await wave(R,S.w.concat([S.sb]));await all([S.bk.jump(.3),S.bk2.jump(.3),S.bk3.jump(.3)]);}
};
page('e09',2,{old:mkq(E9b),neu:mkq(E9b),tm:{"add an s": 0.88, "book becomes books": 3.16, "slide into place": 6.76}});
/* shared helpers for the later lesson files */
P.G1H={all,pop,liteq,mkq,hearts,gfx,tin,tout,glow,moveT,COL,colOf,wordTiles,fly,tileFly,squash,wave,VC,vcol,vTiles,rtag,ntag,NC,tg,nounTag,ptag,pltag,GOLD,PG,RCOL,rpair};
P.DIR.mount();
})();
