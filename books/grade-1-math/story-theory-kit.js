/* Grade 1 English: shared tools for the staged theory and story pages (word blocks, end marks,
   actors that walk in, props that drop, crates to sort into). ASCII only. */
(function(){
"use strict";
const P=window.PM;if(!P||!P.DIR||!P.G1H)return;
const H=P.G1H;const {all,hearts,gfx,tin,tout,glow,fly,tileFly,wave}=H;
const MC=document.createElement('canvas').getContext('2d');
const FONT=px=>'bold '+px+'px "Atkinson Hyperlegible",sans-serif';
/* a clay word block: b.s scale, b.a opacity, b.hl glow, b.gap dashed empty slot, b.cross red X over it, b.ul underline colour */
const blk=(G,text,x,y,col,h)=>{h=h||.42;const b={text,x,y,col:col||'#4c6ef5',h,s:0,a:1,hl:0,rot:0,gap:false,cross:0,ul:null,tc:'#fff'};
 b.w=()=>{MC.font=FONT(Math.round(h*G.PX*.56));return Math.max(h*1.05,(MC.measureText(b.text).width+h*G.PX*.55)/G.PX);};
 b.it=G.add('F',g=>{if(b.s<=.01)return;const hp=b.h*G.PX*b.s,wp=b.w()*G.PX*b.s,cx=G.X(b.x),cy=G.Y(b.y);g.save();g.globalAlpha*=b.a;g.translate(cx,cy);g.rotate(-b.rot);
  const r=hp*.3;
  if(b.gap){g.setLineDash([10,8]);g.strokeStyle='#5b4a8a';g.lineWidth=5;g.beginPath();g.roundRect(-wp/2,-hp/2,wp,hp,r);g.stroke();g.restore();return;}
  if(b.hl){g.shadowColor='rgba(255,214,10,'+b.hl+')';g.shadowBlur=36*b.hl;}
  g.fillStyle='rgba(0,0,0,.18)';g.beginPath();g.roundRect(-wp/2+4,-hp/2+8,wp,hp,r);g.fill();g.shadowBlur=0;
  const gr=g.createLinearGradient(0,-hp/2,0,hp/2);gr.addColorStop(0,'#ffffff');gr.addColorStop(.14,b.col);gr.addColorStop(1,b.col);g.fillStyle=gr;g.beginPath();g.roundRect(-wp/2,-hp/2,wp,hp,r);g.fill();
  g.strokeStyle='rgba(255,255,255,.55)';g.lineWidth=3;g.beginPath();g.roundRect(-wp/2+5,-hp/2+5,wp-10,hp-10,r*.8);g.stroke();
  g.font=FONT(Math.round(hp*.56));g.textBaseline='middle';
  if(b.c1&&b.text.length){const tw=g.measureText(b.text).width;let x=-tw/2;g.textAlign='left';g.fillStyle='rgba(0,0,0,.22)';g.fillText(b.text,x+2,hp*.04+3);
   for(let i=0;i<b.text.length;i++){const ch=b.text[i],cw=g.measureText(ch).width,cap=(i===0||b.text[i-1]===' ')&&/[A-Z]/.test(ch);
    if(cap){g.lineWidth=7;g.strokeStyle='#fff';g.strokeText(ch,x,hp*.04);g.fillStyle=b.c1;}else g.fillStyle=b.tc;g.fillText(ch,x,hp*.04);x+=cw;}}
  else{g.textAlign='center';g.fillStyle='rgba(0,0,0,.22)';g.fillText(b.text,2,hp*.04+3);g.fillStyle=b.tc;g.fillText(b.text,0,hp*.04);}
  if(b.ul){g.strokeStyle=b.ul;g.lineWidth=7;g.lineCap='round';g.beginPath();g.moveTo(-wp/2+10,hp/2+10);g.lineTo(wp/2-10,hp/2+10);g.stroke();}
  if(b.cross>0){g.strokeStyle='rgba(224,49,49,'+b.cross+')';g.lineWidth=9;g.lineCap='round';g.beginPath();g.moveTo(-wp/2+6,-hp/2+6);g.lineTo(wp/2-6,hp/2-6);g.moveTo(wp/2-6,-hp/2+6);g.lineTo(-wp/2+6,hp/2-6);g.stroke();}
  g.restore();});
 return b;};
/* lay a row of blocks out centred on cx (positions only); returns the x list */
const LMIN=-1.95,RMAX=1.4,MAXW=3.3;
const rowX=(bs,cx,gap)=>{gap=gap==null?.1:gap;let ws=bs.map(b=>b.w());let tot=ws.reduce((a,c)=>a+c,0)+gap*(bs.length-1);
 if(tot>MAXW){const k=MAXW/tot;bs.forEach(b=>{b.h*=k;});ws=bs.map(b=>b.w());tot=ws.reduce((a,c)=>a+c,0)+gap*(bs.length-1);}
 if(cx+tot/2>RMAX)cx=RMAX-tot/2;if(cx-tot/2<LMIN)cx=LMIN+tot/2;let x=cx-tot/2;return ws.map(w=>{const v=x+w/2;x+=w+gap;return v;});};
/* make a sentence of blocks and pop them in one by one */
const sentence=async(R,G,words,cx,y,o)=>{o=o||{};const cols=o.cols||[];const bs=words.map((w,i)=>blk(G,w,0,y,cols[i]||o.col||'#4c6ef5',o.h||.42));const xs=rowX(bs,cx,o.gap);bs.forEach((b,i)=>{b.x=xs[i];});
 if(o.instant){bs.forEach(b=>b.s=1);return bs;}
 for(const b of bs){R.fx&&o.fx!==false&&R.fx('sparkle',b.x,y,4,{w:.2,t:.5});await tin(R,b,o.t||.28);if(o.gapT)await R.wait(o.gapT);}return bs;};
/* slide blocks to new places in a row (word order, inserting a word) */
const reflow=(R,bs,cx,y,sec,gap)=>{const xs=rowX(bs,cx,gap);return all(bs.map((b,i)=>{const x0=b.x,y0=b.y,x1=xs[i];return R.T(sec||.7,e=>{const k=e<.5?2*e*e:1-Math.pow(-2*e+2,2)/2;b.x=x0+(x1-x0)*k;b.y=y0+(y-y0)*k+Math.sin(e*Math.PI)*(Math.abs(x1-x0)>.05?.25:0);});}));};
const bfly=(R,b,x,y,sec,arc)=>{const x0=b.x,y0=b.y;return R.T(sec||.7,e=>{b.x=x0+(x-x0)*e;b.y=y0+(y-y0)*e+Math.sin(e*Math.PI)*(arc==null?.45:arc);b.rot=Math.sin(e*Math.PI*2)*.25;});};
const bshake=(R,b,sec)=>{const x0=b.x;return R.T(sec||.5,e=>{b.x=x0+Math.sin(e*Math.PI*8)*.06*(1-e);});};
const bpulse=(R,b,sec)=>R.T(sec||.6,e=>{b.hl=Math.sin(e*Math.PI);b.s=1+.15*Math.sin(e*Math.PI);});
const bout=(R,bs,sec)=>all([].concat(bs).map(b=>R.T(sec||.3,e=>{b.a=1-e;b.s=1-e*.4;})));
const bcross=(R,b,sec)=>R.T(sec||.4,e=>{b.cross=e;});
const recolor=(R,b,col)=>{b.col=col;return bpulse(R,b,.5);};
/* actors */
const mk=(R,key,o)=>{const a=R.act(key,Object.assign({idle:'none'},o));a.st.op=0;a.ap();return a;};
const enter=async(R,key,x,h,o)=>{o=o||{};const from=o.from==null?(x<0?-2.9:2.9):o.from;const a=mk(R,key,{x:from,y:o.y==null?.2:o.y,h,face:o.face==null?(from<x?1:-1):o.face});a.show(.2);await a.go(x,o.y==null?.2:o.y,o.sec||1.1,{hops:o.hops==null?3:o.hops,arc:o.arc,wob:o.wob});return a;};
const drop=async(R,key,x,y,h,o)=>{o=o||{};const a=mk(R,key,{x,y:2.6,h,face:1});await a.show(.1);await fly(R,a,x,y,o.sec||.6,{arc:0,spin:o.spin==null?Math.PI*2:o.spin});R.fx(o.fx||'dust',x,y+.05,8,{w:.5,t:.6});if(o.bounce!==false)a.jump(.2);return a;};
const popIn=async(R,key,x,y,h,o)=>{const a=mk(R,key,Object.assign({x,y,h,face:1},o||{}));await a.show(.45,'pop');R.fx('sparkle',x,y+h*.5,10,{w:h*.6,t:.8});return a;};
const cheer=(R,acts,x,y)=>{hearts(R,x==null?0:x,y==null?1.8:y,10);R.fx('sparkle',x==null?0:x,(y==null?1.8:y)-.2,24,{w:2.2,t:1.3});return all(acts.filter(Boolean).map(a=>a.jump(.35)));};
/* crates to sort into, with a word block label on each */
const crates=async(R,G,labels,o)=>{o=o||{};const xs=o.xs||(labels.length===2?[-1.0,1.2]:[-1.4,.15,1.6]);const keys=o.keys||['pa-crate1','pa-crate2','pa-crate1'];const out=[];
 for(let i=0;i<labels.length;i++){const c=mk(R,keys[i%keys.length],{x:xs[i],y:-.4,h:o.h||.75,face:1});c.show(.2);c.go(xs[i],.2,.5,{arc:.3});const b=blk(G,labels[i],xs[i],o.ly||1.2,(o.cols||[])[i]||'#4c6ef5',.34);out.push({c,b,x:xs[i]});}
 await R.wait(.5);R.fx('dust',0,.3,14,{w:3,t:.7});for(const o2 of out)await tin(R,o2.b,.25);return out;};
const intoCrate=async(R,a,cr,dx)=>{await a.go(cr.x+(dx||0),.55,.8,{arc:.8});R.fx('dust',cr.x,.5,8,{w:.4,t:.6});await all([cr.c.shiver(.35),a.jump(.15)]);};
/* a big punctuation mark block */
const MARKC={'.':'#1c7ed6','?':'#7048e8','!':'#e03131',',':'#868e96'};
const markB=(G,ch,x,y,h)=>{const b=blk(G,ch,x,y,MARKC[ch]||'#495057',h||.5);return b;};
const speak=(a,t,ms)=>a&&a.say?a.say(t,ms):0;
P.G1X={blk,rowX,sentence,reflow,bfly,bshake,bpulse,bout,bcross,recolor,mk,enter,drop,popIn,cheer,crates,intoCrate,markB,MARKC,speak,FONT};
})();
