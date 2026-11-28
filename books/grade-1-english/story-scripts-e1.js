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

/* ================= LESSON 1 : Beginning sounds ================= */
const LEO_H=1.45;
const E1s={
 lunchtime:async(R,S)=>{await R.bg('classroom');R.label('Lunchtime','#e8590c');const G=S.G=gfx(R);
  S.tb=await pop(R,'pa-table21',{x:.95,y:.2,h:.7,face:1,idle:'none'},.4);
  S.leo=R.act('pa-leowave',{x:-2.1,y:.2,h:LEO_H,face:1,idle:'none'});S.leo.st.op=0;S.leo.ap();await S.leo.show(.2);await S.leo.go(-1.0,.2,1.5,{hops:4});},
 hungry:async(R,S)=>{await S.leo.swap('pa-leotummy',.25,{h:LEO_H});R.word('Grumble, grumble!',-1.0,1.95,'#c2255c',1.4);await S.leo.shiver(.6);},
 opens:async(R,S)=>{S.lb=await pop(R,'pa-lbclosed',{x:.95,y:.78,h:.42,face:1,idle:'none'},.4);await R.wait(.5);await S.lb.swap('pa-lbopen',.3,{h:.5});R.fx('sparkle',.95,1.2,12,{w:.5,t:1});await S.leo.swap('pa-leobox',.25,{h:LEO_H});},
 carrot:async(R,S)=>{await S.leo.swap('pa-leosay',.25,{h:LEO_H});S.cr=R.act('pa-carrot',{x:.95,y:.95,h:.6,face:1,idle:'none'});S.cr.st.op=0;S.cr.ap();await S.cr.show(.2);await S.cr.go(-.1,1.1,.8,{arc:.6});R.fx('crumb',.0,1.2,10,{w:.3,t:.8});},
 'says the c':async(R,S)=>{S.t1=S.G.tile('c',.2,1.6,colOf('c'),.46);await tin(R,S.t1);R.word('/c/',.2,1.2,'#e8590c',1.3);await glow(R,S.t1,.7);},
 banana:async(R,S)=>{S.cr.hide(.25);S.bn=R.act('pa-banana',{x:.95,y:.95,h:.6,face:1,idle:'none'});S.bn.st.op=0;S.bn.ap();await S.bn.show(.2);await S.bn.go(-.1,1.1,.8,{arc:.6});R.fx('sparkle',.0,1.3,8,{w:.4,t:.8});},
 'says the b':async(R,S)=>{S.t2=S.G.tile('b',.8,1.6,colOf('b'),.46);await tin(R,S.t2);R.word('/b/',.8,1.2,'#1c7ed6',1.3);await glow(R,S.t2,.7);},
 'soft sandwich':async(R,S)=>{S.bn.hide(.25);S.sd=R.act('pa-sandwich',{x:.95,y:.95,h:.6,face:1,idle:'none'});S.sd.st.op=0;S.sd.ap();await S.sd.show(.2);await S.sd.go(-.1,1.1,.8,{arc:.6});S.t3=S.G.tile('s',1.4,1.6,colOf('s'),.46);await tin(R,S.t3);R.word('/s/',1.4,1.2,'#2b8a3e',1.3);},
 knows:async(R,S)=>{await S.leo.swap('pa-leocheer',.25,{h:LEO_H});await all([glow(R,S.t1,.8),glow(R,S.t2,.8),glow(R,S.t3,.8)]);},
 eat:async(R,S)=>{S.sd.hide(.3);await S.leo.swap('pa-leoeat',.3,{h:1.0});R.fx('crumb',-1.0,.8,12,{w:.4,t:1});hearts(R,-1.0,1.4,8);}
};
page('e01',0,{old:mkq(E1s),neu:mkq(E1s)});

/* theory pages for lesson 1 */
const E1a={
 'say moon':async(R,S)=>{await R.bg('classroom');R.label('Stretch the first sound','#e8505b');const G=S.G=gfx(R);S.mn=await pop(R,'pa-moon',{x:-.9,y:.7,h:.95,face:1,idle:'none'},.5);
  S.w1=wordTiles(G,'moon',.5,1.0,.5);for(const t of S.w1){await tin(R,t,.25);}
  R.word('mmm - oon',.5,1.75,'#c2255c',1.6);
  await R.T(1.2,e=>{S.w1.forEach((t,i)=>{t.x=t.baseX+(i-1.5)*.16*Math.sin(e*Math.PI);});});},
 'first sound is m':async(R,S)=>{S.w1.slice(1).forEach(t=>{t.a=.35;});await moveT(R,S.w1[0],-.1,1.55,.7);await glow(R,S.w1[0],.7);R.word('/m/',-.1,1.95,'#c2255c',1.4);},
 'now say sun':async(R,S)=>{S.w1.forEach(t=>S.G.rmTile(t));S.mn.hide(.25);S.sn=await pop(R,'sun',{x:-.9,y:.7,h:.95,face:1,idle:'none'},.5);
  S.w2=wordTiles(S.G,'sun',.5,1.0,.5);for(const t of S.w2){await tin(R,t,.25);}
  await R.T(1.0,e=>{S.w2.forEach((t,i)=>{t.x=t.baseX+(i-1)*.18*Math.sin(e*Math.PI);});});},
 'first sound is s':async(R,S)=>{S.w2.slice(1).forEach(t=>{t.a=.35;});await moveT(R,S.w2[0],-.1,1.55,.7);await glow(R,S.w2[0],.7);R.word('/s/',-.1,1.95,'#2b8a3e',1.4);},
 'pops out':async(R,S)=>{R.fx('sparkle',-.1,1.55,26,{w:1.2,t:1.4});await S.sn.jump(.3);}
};
page('e01',1,{old:mkq(E1a),neu:mkq(E1a)});
const E1b={
 'say fox':async(R,S)=>{await R.bg('classroom');R.label('Find the letter','#e8505b');const G=S.G=gfx(R);S.fx=await pop(R,'fox',{x:-1.0,y:.3,h:1.0,face:1,idle:'none'},.5);
  S.w=wordTiles(G,'fox',.6,1.0,.55,0);for(const t of S.w){await tin(R,t,.25);}},
 'first sound is f':async(R,S)=>{R.word('/f/',-1.0,1.6,'#7048e8',1.5);await S.fx.jump(.3);},
 'which letter':async(R,S)=>{S.c=['f','b','m'].map((ch,i)=>{const t=S.G.tile(ch,.0+i*.7,.5,colOf(ch),.5);return t;});for(const t of S.c){await tin(R,t,.25);}},
 'the letter f':async(R,S)=>{await glow(R,S.c[0],.7);S.c[1].a=.3;S.c[2].a=.3;},
 'fill the gap':async(R,S)=>{S.w[0].gap=false;S.w[0].ch='f';S.w[0].col=colOf('f');S.w[0].s=1;S.w[0].a=0;await all([moveT(R,S.c[0],S.w[0].x,S.w[0].y,.8),R.T(.8,e=>{S.w[0].a=e;})]);S.G.rmTile(S.c[0]);S.w[0].a=1;S.c[1].a=0;S.c[2].a=0;R.fx('sparkle',.6,1.0,16,{w:.8,t:1});await S.fx.jump(.3);hearts(R,-1.0,1.4,6);}
};
page('e01',2,{old:mkq(E1b),neu:mkq(E1b)});
const E1c={
 bee:async(R,S)=>{await R.bg('classroom');R.label('Same first sound','#e8505b');const G=S.G=gfx(R);S.bee=await pop(R,'bee',{x:-1.3,y:.5,h:.75,face:1,idle:'none'},.4);S.tb=G.tile('b',-1.3,1.5,colOf('b'),.46);await tin(R,S.tb,.3);},
 bear:async(R,S)=>{S.br=await pop(R,'bear',{x:-.3,y:.3,h:1.0,face:1,idle:'none'},.4);S.tb2=S.G.tile('b',-.3,1.5,colOf('b'),.46);await tin(R,S.tb2,.3);},
 bus:async(R,S)=>{S.bs=await pop(R,'pa-bus',{x:.9,y:.3,h:.65,face:1,idle:'none'},.4);S.tb3=S.G.tile('b',.9,1.5,colOf('b'),.46);await tin(R,S.tb3,.3);},
 'same sound':async(R,S)=>{await all([glow(R,S.tb,.8),glow(R,S.tb2,.8),glow(R,S.tb3,.8)]);},
 'say them with me':async(R,S)=>{R.word('Bee!',-1.3,1.95,'#e8a900',1.0);await S.bee.jump(.25);R.word('Bear!',-.3,1.95,'#a0522d',1.0);await S.br.jump(.25);R.word('Bus!',.9,1.95,'#c92a2a',1.0);await S.bs.jump(.25);hearts(R,-.3,1.4,8);}
};
page('e01',3,{old:mkq(E1c),neu:mkq(E1c)});
P.DIR.mount();
})();
