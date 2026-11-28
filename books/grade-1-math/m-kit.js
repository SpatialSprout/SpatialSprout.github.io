/* Grade 1 Math: shared drawing tools for the staged 3D theory (clay bars, cubes, towers, tags,
   ten frames, number lines). Everything is drawn on the director's canvas overlay (gfx), in world units:
   x from -2.2 (left) to 1.9 (right), y from 0 (floor) to 2.15 (top). ASCII only. */
(function(){
"use strict";
const P=window.PM;if(!P||!P.G1H||!P.G1X)return;
const {all,gfx,tin,tout,glow}=P.G1H;const {blk}=P.G1X;
const shade=(c,k)=>{const n=parseInt(c.slice(1),16);let r=n>>16,g=n>>8&255,b=n&255;const f=v=>Math.max(0,Math.min(255,Math.round(k>0?v+(255-v)*k:v*(1+k))));return '#'+((1<<24)|(f(r)<<16)|(f(g)<<8)|f(b)).toString(16).slice(1);};
/* a clay bar: x,y = left-bottom corner; o.w width, o.h height; o.fx = how much of it is drawn (0..1, grows from the left), o.fy = grows up */
const bar=(G,x,y,w,h,col,o)=>{o=Object.assign({x,y,w,h,col,s:1,a:1,hl:0,fx:1,fy:1,r:.06,stripe:false},o||{});
 o.it=G.add(o.layer||'F',g=>{if(o.s<=.01||o.fx<=.001||o.fy<=.001)return;const W0=o.w*o.fx*o.s,H0=o.h*o.fy*o.s;const X=G.X(o.x),Y=G.Y(o.y),wp=W0*G.PX,hp=H0*G.PX,r=Math.min(o.r*G.PX,hp/2,wp/2);
  g.save();g.globalAlpha*=o.a;if(o.hl){g.shadowColor='rgba(255,214,10,'+o.hl+')';g.shadowBlur=36*o.hl;}
  g.fillStyle='rgba(0,0,0,.16)';g.beginPath();g.roundRect(X+5,Y-hp+8,wp,hp,r);g.fill();g.shadowBlur=0;
  const gr=g.createLinearGradient(0,Y-hp,0,Y);gr.addColorStop(0,shade(o.col,.45));gr.addColorStop(.25,o.col);gr.addColorStop(1,shade(o.col,-.18));g.fillStyle=gr;g.beginPath();g.roundRect(X,Y-hp,wp,hp,r);g.fill();
  g.strokeStyle='rgba(255,255,255,.5)';g.lineWidth=3;g.beginPath();g.roundRect(X+4,Y-hp+4,Math.max(1,wp-8),Math.max(1,hp-8),r*.7);g.stroke();
  if(o.stripe){g.strokeStyle='rgba(255,255,255,.35)';g.lineWidth=4;for(let k=X+18;k<X+wp-6;k+=26){g.beginPath();g.moveTo(k,Y-hp+5);g.lineTo(k-10,Y-5);g.stroke();}}
  g.restore();});return o;};
/* one clay cube (a counting block), x,y = centre-bottom */
const cube=(G,x,y,sz,col,o)=>{o=Object.assign({x,y,sz,col,s:0,a:1,hl:0,dy:0},o||{});
 o.it=G.add('F',g=>{if(o.s<=.01)return;const z=o.sz*G.PX*o.s,X=G.X(o.x),Y=G.Y(o.y+o.dy);g.save();g.globalAlpha*=o.a;if(o.hl){g.shadowColor='rgba(255,214,10,'+o.hl+')';g.shadowBlur=30*o.hl;}
  const d=z*.18;g.fillStyle=shade(o.col,-.3);g.beginPath();g.moveTo(X+z/2,Y-z);g.lineTo(X+z/2+d,Y-z-d);g.lineTo(X+z/2+d,Y-d);g.lineTo(X+z/2,Y);g.fill();
  g.fillStyle=shade(o.col,.35);g.beginPath();g.moveTo(X-z/2,Y-z);g.lineTo(X-z/2+d,Y-z-d);g.lineTo(X+z/2+d,Y-z-d);g.lineTo(X+z/2,Y-z);g.fill();g.shadowBlur=0;
  const gr=g.createLinearGradient(0,Y-z,0,Y);gr.addColorStop(0,shade(o.col,.25));gr.addColorStop(1,o.col);g.fillStyle=gr;g.beginPath();g.roundRect(X-z/2,Y-z,z,z,z*.12);g.fill();
  g.fillStyle='rgba(255,255,255,.35)';g.beginPath();g.arc(X,Y-z/2,z*.16,0,7);g.fill();g.restore();});return o;};
/* a tower of n cubes; returns {cubes, top(), build(R,sec)} */
const tower=(G,x,n,col,o)=>{o=o||{};const sz=o.sz||.26,y0=o.y==null?.18:o.y;const cs=[];for(let i=0;i<n;i++)cs.push(cube(G,x,y0+i*sz,sz,col));
 const T={cubes:cs,x,n,sz,top:()=>y0+cs.length*sz,
  build:async(R,sec)=>{for(const c of cs){c.dy=.6;R.T(sec||.28,e=>{c.s=Math.min(1,e*2);c.dy=.6*(1-e)*(1-e);});await R.wait((sec||.28)*.75);}await R.wait(.2);},
  show:()=>{cs.forEach(c=>{c.s=1;c.dy=0;});},
  glow:(R)=>all(cs.map(c=>R.T(.7,e=>{c.hl=Math.sin(e*Math.PI);}))),
  hop:(R,h)=>R.T(.45,e=>{const d=Math.sin(e*Math.PI)*(h||.15);cs.forEach(c=>{c.dy=d;});}),
  fade:(R)=>all(cs.map(c=>R.T(.35,e=>{c.a=1-e;})))};
 return T;};
/* a word tag (clay block) that pops in */
const tag=async(R,G,text,x,y,col,h)=>{const b=blk(G,text,x,y,col||'#7048e8',h||.3);await tin(R,b,.35);return b;};
/* grow a bar from the left (fx 0 -> 1) */
const growX=(R,b,sec)=>R.T(sec||.8,e=>{b.fx=e;});
const growY=(R,b,sec)=>R.T(sec||.8,e=>{b.fy=e;});
const slideB=(R,b,x,y,sec)=>{const x0=b.x,y0=b.y;return R.T(sec||.6,e=>{const k=e<.5?2*e*e:1-Math.pow(-2*e+2,2)/2;b.x=x0+(x-x0)*k;b.y=y0+(y-y0)*k;});};
const glowB=(R,b,sec)=>R.T(sec||.7,e=>{b.hl=Math.sin(e*Math.PI);});
/* a dashed upright line (to line things up or to show a height) */
const vline=(G,x,y1,y2,col)=>{const o={x,y1,y2,col:col||'#e03131',a:0,k:1};o.it=G.add('F',g=>{if(o.a<=.01)return;g.save();g.globalAlpha*=o.a;g.setLineDash([12,10]);g.strokeStyle=o.col;g.lineWidth=6;g.lineCap='round';g.beginPath();g.moveTo(G.X(o.x),G.Y(o.y1));g.lineTo(G.X(o.x),G.Y(o.y1+(o.y2-o.y1)*o.k));g.stroke();g.restore();});return o;};
const hline=(G,y,x1,x2,col)=>{const o={y,x1,x2,col:col||'#e03131',a:0,k:1};o.it=G.add('F',g=>{if(o.a<=.01)return;g.save();g.globalAlpha*=o.a;g.setLineDash([12,10]);g.strokeStyle=o.col;g.lineWidth=6;g.lineCap='round';g.beginPath();g.moveTo(G.X(o.x1),G.Y(o.y));g.lineTo(G.X(o.x1+(o.x2-o.x1)*o.k),G.Y(o.y));g.stroke();g.restore();});return o;};
const drawL=(R,l,sec)=>R.T(sec||.6,e=>{l.a=1;l.k=e;});
const fadeL=(R,l,sec)=>R.T(sec||.4,e=>{l.a=1-e;});
/* a flat clay pencil lying sideways: x = left end, y = middle; len long */
const pencil=(G,x,y,len,col,o)=>{o=Object.assign({x,y,len,col:col||'#fcc419',s:0,a:1,hl:0,h:.17},o||{});
 o.it=G.add('F',g=>{if(o.s<=.01)return;const X=G.X(o.x),Y=G.Y(o.y),L=o.len*G.PX,h=o.h*G.PX*o.s,tip=h*1.3;g.save();g.globalAlpha*=o.a;if(o.hl){g.shadowColor='rgba(255,214,10,'+o.hl+')';g.shadowBlur=30*o.hl;}
  g.fillStyle='#f783ac';g.beginPath();g.roundRect(X,Y-h/2,h*.9,h,h*.3);g.fill();g.fillStyle='#adb5bd';g.fillRect(X+h*.8,Y-h/2,h*.45,h);g.shadowBlur=0;
  const gr=g.createLinearGradient(0,Y-h/2,0,Y+h/2);gr.addColorStop(0,shade(o.col,.4));gr.addColorStop(.5,o.col);gr.addColorStop(1,shade(o.col,-.2));g.fillStyle=gr;g.fillRect(X+h*1.25,Y-h/2,L-h*1.25-tip,h);
  g.fillStyle='#f4d5a6';g.beginPath();g.moveTo(X+L-tip,Y-h/2);g.lineTo(X+L,Y);g.lineTo(X+L-tip,Y+h/2);g.fill();g.fillStyle='#343a40';g.beginPath();g.moveTo(X+L-tip*.35,Y-h*.17);g.lineTo(X+L,Y);g.lineTo(X+L-tip*.35,Y+h*.17);g.fill();g.restore();});return o;};
/* a clay balance scale centred at x (base on the floor). B.ang is the beam tilt (+ = left side down).
   B.put(R,actor,side) seats a clay actor on a pan; the actors ride the pans when B.tilt(R,ang,sec) runs. */
const balance=(G,R,x,o)=>{o=o||{};const arm=o.arm||1.0,post=o.post||.95,y0=o.y==null?.15:o.y;const B={x,ang:0,a:1,s:1,on:[[],[]],col:o.col||'#e8590c'};
 const pan=i=>{const sgn=i===0?-1:1;const px=B.x+sgn*arm*Math.cos(B.ang),py=y0+post+(-sgn)*arm*Math.sin(B.ang)*-1;return {x:px,y:y0+post-sgn*arm*Math.sin(-B.ang)-.42};};
 B.pan=i=>{const sgn=i===0?-1:1;const ex=B.x+sgn*arm*Math.cos(B.ang),ey=y0+post-sgn*arm*Math.sin(B.ang)*(-1)*(-1);return {ex,ey:y0+post+(i===0?-1:1)*arm*Math.sin(B.ang)*-1,px:ex,py:0};};
 const ends=()=>{const L={x:B.x-arm*Math.cos(B.ang),y:y0+post-arm*Math.sin(B.ang)},Rr={x:B.x+arm*Math.cos(B.ang),y:y0+post+arm*Math.sin(B.ang)};return [L,Rr];};
 B.ends=ends;
 B.it=G.add('F',g=>{if(B.s<=.01)return;g.save();g.globalAlpha*=B.a;const X=G.X,Y=G.Y,px=G.PX;
  /* base and post */
  g.fillStyle=shade(B.col,-.25);g.beginPath();g.roundRect(X(B.x-.38),Y(y0+.1),.76*px,.1*px,10);g.fill();
  g.fillStyle=B.col;g.beginPath();g.roundRect(X(B.x-.06),Y(y0+post),.12*px,(post-.05)*px,8);g.fill();
  const [L,Rr]=ends();
  /* strings and pans */
  [L,Rr].forEach(e=>{g.strokeStyle='#868e96';g.lineWidth=4;g.beginPath();g.moveTo(X(e.x),Y(e.y));g.lineTo(X(e.x-.3),Y(e.y-.42));g.moveTo(X(e.x),Y(e.y));g.lineTo(X(e.x+.3),Y(e.y-.42));g.stroke();
   const gr=g.createLinearGradient(0,Y(e.y-.42),0,Y(e.y-.52));gr.addColorStop(0,'#74c0fc');gr.addColorStop(1,'#1971c2');g.fillStyle=gr;g.beginPath();g.ellipse(X(e.x),Y(e.y-.45),.36*px,.07*px,0,0,7);g.fill();});
  /* beam */
  g.save();g.translate(X(B.x),Y(y0+post));g.rotate(B.ang);const gb=g.createLinearGradient(0,-12,0,12);gb.addColorStop(0,shade(B.col,.4));gb.addColorStop(1,shade(B.col,-.15));g.fillStyle=gb;g.beginPath();g.roundRect(-arm*px-10,-11,(arm*2)*px+20,22,11);g.fill();g.restore();
  g.fillStyle='#ffd43b';g.beginPath();g.arc(X(B.x),Y(y0+post),14,0,7);g.fill();g.restore();});
 const seat=()=>{const E=ends();[0,1].forEach(i=>B.on[i].forEach((a,k)=>{const n=B.on[i].length,dx=(k-(n-1)/2)*.28;a.at(E[i].x+dx,E[i].y-.44);}));};
 B.put=async(R,a,i)=>{const E=ends();const n=B.on[i].length;B.on[i].push(a);const dx=(n-(B.on[i].length-1)/2)*.28;await a.go(E[i].x+dx*0,E[i].y-.44,.7,{arc:.6});seat();};
 B.tilt=(R,ang,sec)=>{const a0=B.ang;return R.T(sec||.9,e=>{const k=e<.5?2*e*e:1-Math.pow(-2*e+2,2)/2;B.ang=a0+(ang-a0)*k+Math.sin(e*Math.PI*3)*.03*(1-e);seat();});};
 return B;};
/* a clay actor that wobbles bigger for a moment */
const boing=(R,a,k)=>a.grow?a.grow(1+(k||.12),1-(k||.12)*.6,.25).then(()=>a.grow(1,1,.25)):R.wait(.5);
P.MK={balance,pencil,shade,bar,cube,tower,tag,growX,growY,slideB,glowB,vline,hline,drawL,fadeL,boing};
})();
