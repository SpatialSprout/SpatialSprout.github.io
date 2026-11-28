/* Grade 1 Math: shared drawing tools for the staged 3D theory (clay bars, cubes, towers, tags,
   ten frames, number lines). Everything is drawn on the director's canvas overlay (gfx), in world units:
   x from -2.2 (left) to 1.9 (right), y from 0 (floor) to 2.15 (top). ASCII only. */
(function(){
"use strict";
const P=window.PM;if(!P||!P.G1H||!P.G1X)return;
const {all,tin,tout,glow}=P.G1H;const gfx0=P.G1H.gfx;const {blk}=P.G1X;
/* the director canvas plus an UNDER layer ('U'): drawn behind the clay actors (roads, ponds, pads, the balance) */
const gfx=(R)=>{const G=gfx0(R);const T=window.THREE;const W=Math.round(4.1*G.PX),H=Math.round(2.15*G.PX);const c=document.createElement('canvas');c.width=W;c.height=H;const g=c.getContext('2d');
 const m=new T.Mesh(new T.PlaneGeometry(W/G.PX,H/G.PX),new T.MeshBasicMaterial({map:new T.CanvasTexture(c),transparent:true,depthWrite:false}));m.position.set(-2.2+W/G.PX/2,H/G.PX/2,.02);m.renderOrder=1.5;R.root.add(m);R.own(m);
 const U=[];const add0=G.add;G.add=(layer,fn)=>{if(layer==='U'){const it={layer,fn,a:1};U.push(it);return it;}return add0(layer,fn);};
 const rm0=G.rm;G.rm=it=>{const i=U.indexOf(it);if(i>=0)U.splice(i,1);else rm0(it);};
 R.actors.push({kill:()=>{},tick:()=>{g.clearRect(0,0,W,H);for(const it of U){g.globalAlpha=it.a;it.fn(g);}g.globalAlpha=1;m.material.map.needsUpdate=true;}});return G;};
const shade=(c,k)=>{const n=parseInt(c.slice(1),16);let r=n>>16,g=n>>8&255,b=n&255;const f=v=>Math.max(0,Math.min(255,Math.round(k>0?v+(255-v)*k:v*(1+k))));return '#'+((1<<24)|(f(r)<<16)|(f(g)<<8)|f(b)).toString(16).slice(1);};
/* a clay bar: x,y = left-bottom corner; o.w width, o.h height; o.fx = how much of it is drawn (0..1, grows from the left), o.fy = grows up */
const bar=(G,x,y,w,h,col,o)=>{o=Object.assign({x,y,w,h,col,s:1,a:1,hl:0,fx:1,fy:1,r:.06,stripe:false},o||{});
 o.it=G.add(o.layer||'U',g=>{if(o.s<=.01||o.fx<=.001||o.fy<=.001)return;const W0=o.w*o.fx*o.s,H0=o.h*o.fy*o.s;const X=G.X(o.x),Y=G.Y(o.y),wp=W0*G.PX,hp=H0*G.PX,r=Math.min(o.r*G.PX,hp/2,wp/2);
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
  fade:(R)=>all(cs.map(c=>R.T(.35,e=>{c.a=1-e;}))),
  slide:(R,x,sec)=>{const x0=T.x;return R.T(sec||.7,e=>{const k=e<.5?2*e*e:1-Math.pow(-2*e+2,2)/2;T.x=x0+(x-x0)*k;cs.forEach(c=>{c.x=T.x;c.dy=Math.sin(e*Math.PI)*.25;});});}};
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
const balance=(G,R,x,o)=>{o=o||{};const arm=o.arm||1.0,post=o.post||.95,y0=o.y==null?.15:o.y;const B={x,ang:0,a:1,s:1,on:[[],[]],col:o.col||'#e8590c',zoff:o.zoff==null?.06:o.zoff};
 const ends=()=>{const L={x:B.x-arm*Math.cos(B.ang),y:y0+post-arm*Math.sin(B.ang)},Rr={x:B.x+arm*Math.cos(B.ang),y:y0+post+arm*Math.sin(B.ang)};return [L,Rr];};
 B.ends=ends;
 B.it=G.add('U',g=>{if(B.s<=.01)return;g.save();g.globalAlpha*=B.a;const X=G.X,Y=G.Y,px=G.PX;
  /* base and post */
  g.fillStyle=shade(B.col,-.25);g.beginPath();g.roundRect(X(B.x-.38),Y(y0+.1),.76*px,.1*px,10);g.fill();
  g.fillStyle=B.col;g.beginPath();g.roundRect(X(B.x-.06),Y(y0+post),.12*px,(post-.05)*px,8);g.fill();
  const [L,Rr]=ends();
  /* strings and pans */
  [L,Rr].forEach(e=>{g.strokeStyle='#868e96';g.lineWidth=4;g.beginPath();g.moveTo(X(e.x),Y(e.y));g.lineTo(X(e.x-.3),Y(e.y-.42));g.moveTo(X(e.x),Y(e.y));g.lineTo(X(e.x+.3),Y(e.y-.42));g.stroke();
   const gr=g.createLinearGradient(0,Y(e.y-.42),0,Y(e.y-.52));gr.addColorStop(0,'#74c0fc');gr.addColorStop(1,'#1971c2');g.fillStyle=gr;g.beginPath();g.ellipse(X(e.x),Y(e.y-.45),.36*px,.07*px,0,0,7);g.fill();});
  /* beam */
  g.save();g.translate(X(B.x),Y(y0+post));g.rotate(-B.ang);const gb=g.createLinearGradient(0,-12,0,12);gb.addColorStop(0,shade(B.col,.4));gb.addColorStop(1,shade(B.col,-.15));g.fillStyle=gb;g.beginPath();g.roundRect(-arm*px-10,-11,(arm*2)*px+20,22,11);g.fill();g.restore();
  g.fillStyle='#ffd43b';g.beginPath();g.arc(X(B.x),Y(y0+post),14,0,7);g.fill();g.restore();});
 const seat=()=>{const E=ends();[0,1].forEach(i=>B.on[i].forEach((a,k)=>{const n=B.on[i].length,per=B.row||99,cols=Math.min(n,per),c=k%per,r=Math.floor(k/per);const dx=(c-(cols-1)/2)*(B.gap||.28);a.at(E[i].x+dx,E[i].y-.44+B.zoff+r*(B.rowH||.16));}));};
 B.put=async(R,a,i)=>{const E=ends();const n=B.on[i].length;B.on[i].push(a);const dx=(n-(B.on[i].length-1)/2)*.28;await a.go(E[i].x+dx*0,E[i].y-.44+B.zoff,.7,{arc:.6});seat();};
 B.tilt=(R,ang,sec)=>{const a0=B.ang;return R.T(sec||.9,e=>{const k=e<.5?2*e*e:1-Math.pow(-2*e+2,2)/2;B.ang=a0+(ang-a0)*k+Math.sin(e*Math.PI*3)*.03*(1-e);seat();});};
 return B;};
/* a clay oval (pond, lily pad, plate, puddle); x,y = centre */
const ell=(G,x,y,rx,ry,col,o)=>{o=Object.assign({x,y,rx,ry,col,s:0,a:1,hl:0,rim:null},o||{});
 o.it=G.add(o.layer||'U',g=>{if(o.s<=.01)return;const X=G.X(o.x),Y=G.Y(o.y),a=o.rx*G.PX*o.s,b=o.ry*G.PX*o.s;g.save();g.globalAlpha*=o.a;if(o.hl){g.shadowColor='rgba(255,214,10,'+o.hl+')';g.shadowBlur=34*o.hl;}
  g.fillStyle='rgba(0,0,0,.12)';g.beginPath();g.ellipse(X+4,Y+7,a,b,0,0,7);g.fill();g.shadowBlur=0;const gr=g.createRadialGradient(X-a*.3,Y-b*.4,2,X,Y,Math.max(a,b));gr.addColorStop(0,shade(o.col,.45));gr.addColorStop(1,o.col);g.fillStyle=gr;g.beginPath();g.ellipse(X,Y,a,b,0,0,7);g.fill();
  if(o.rim){g.strokeStyle=o.rim;g.lineWidth=6;g.stroke();}g.restore();});return o;};
/* a double-headed measuring arrow from (x1,y1) to (x2,y2) */
const span=(G,x1,y1,x2,y2,col)=>{const o={x1,y1,x2,y2,col:col||'#e8590c',a:0,k:1};
 o.it=G.add('F',g=>{if(o.a<=.01)return;g.save();g.globalAlpha*=o.a;const A=[G.X(o.x1),G.Y(o.y1)],B=[G.X(o.x2),G.Y(o.y2)];const mx=(A[0]+B[0])/2,my=(A[1]+B[1])/2;
  const P1=[mx+(A[0]-mx)*o.k,my+(A[1]-my)*o.k],P2=[mx+(B[0]-mx)*o.k,my+(B[1]-my)*o.k];g.strokeStyle=o.col;g.fillStyle=o.col;g.lineWidth=7;g.lineCap='round';g.beginPath();g.moveTo(P1[0],P1[1]);g.lineTo(P2[0],P2[1]);g.stroke();
  const head=(P,Q)=>{const an=Math.atan2(P[1]-Q[1],P[0]-Q[0]),L=22;g.beginPath();g.moveTo(P[0],P[1]);g.lineTo(P[0]-L*Math.cos(an-.5),P[1]-L*Math.sin(an-.5));g.lineTo(P[0]-L*Math.cos(an+.5),P[1]-L*Math.sin(an+.5));g.fill();};head(P1,P2);head(P2,P1);g.restore();});return o;};
const drawS=(R,o,sec)=>R.T(sec||.5,e=>{o.a=1;o.k=e;});
const pulse=(R,o,sec)=>R.T(sec||.8,e=>{o.hl=Math.sin(e*Math.PI);});
/* a number tile that pops in (big clay digit) */
const num=async(R,G,n,x,y,col,size)=>{const t=G.tile(String(n),x,y,col||'#1c7ed6',size||.42);await tin(R,t,.3);return t;};
/* a ten frame (2 rows of 5) drawn under the actors; F.cell(i) gives the centre of cell i (0..9), row by row */
const tframe=(G,x,y,cs,o)=>{o=o||{};const F={x,y,cs:cs||.3,s:0,a:1,hl:0,col:o.col||'#1c7ed6'};
 F.cell=i=>({x:F.x-2*F.cs+(i%5)*F.cs,y:F.y+(i<5?F.cs/2:-F.cs/2)});
 F.it=G.add('U',g=>{if(F.s<=.01)return;g.save();g.globalAlpha*=F.a;const c=F.cs*G.PX,X0=G.X(F.x-2.5*F.cs),Y0=G.Y(F.y+F.cs);const w=5*c,h=2*c;
  if(F.hl){g.shadowColor='rgba(255,214,10,'+F.hl+')';g.shadowBlur=40*F.hl;}g.fillStyle='rgba(0,0,0,.14)';g.beginPath();g.roundRect(X0+5,Y0+8,w*F.s,h,14);g.fill();g.shadowBlur=0;
  g.fillStyle='#fffdf7';g.beginPath();g.roundRect(X0,Y0,w*F.s,h,14);g.fill();g.strokeStyle=F.col;g.lineWidth=7;g.stroke();
  g.lineWidth=4;g.beginPath();for(let k=1;k<5;k++){if(k*c<=w*F.s){g.moveTo(X0+k*c,Y0+4);g.lineTo(X0+k*c,Y0+h-4);}}g.moveTo(X0+4,Y0+c);g.lineTo(X0+w*F.s-4,Y0+c);g.stroke();g.restore();});
 return F;};
const growF=(R,F,sec)=>R.T(sec||.6,e=>{F.s=e;});
/* a number line from value n0 to n1 between x1 and x2 at height y; L.pos(n) gives its x */
const nline=(G,x1,x2,y,n0,n1,o)=>{o=o||{};const L={x1,x2,y,n0,n1,k:0,a:1,hot:{},col:o.col||'#343a40',step:o.step||1,lab:o.lab||1};
 L.pos=n=>x1+(n-n0)/(n1-n0)*(x2-x1);
 L.it=G.add(o.layer||'F',g=>{if(L.k<=.01)return;g.save();g.globalAlpha*=L.a;const X=G.X,Y=G.Y;const xe=x1+(x2-x1)*L.k;g.strokeStyle=L.col;g.lineWidth=6;g.lineCap='round';g.beginPath();g.moveTo(X(x1-.08),Y(y));g.lineTo(X(xe+.08),Y(y));g.stroke();
  for(let n=n0;n<=n1;n+=L.step){const px=L.pos(n);if(px>xe+.001)break;const big=(n%5===0);g.lineWidth=big?5:3;g.beginPath();g.moveTo(X(px),Y(y)-(big?16:11));g.lineTo(X(px),Y(y)+(big?16:11));g.stroke();
   if((n-n0)%L.lab===0){const hot=L.hot[n];g.font='bold '+(hot?34:(o.fs||22))+'px "Atkinson Hyperlegible",sans-serif';g.textAlign='center';g.textBaseline='top';g.fillStyle=hot||'#343a40';g.fillText(String(n),X(px),Y(y)+20);}}
  g.restore();});return L;};
const drawN=(R,L,sec)=>R.T(sec||1,e=>{L.k=e;});
/* a number chart: cols x rows cells starting at n0; x,y = top-left; C.hot[n] = colour to fill a cell; C.k reveals cells in order */
const chart=(G,x,y,cell,cols,rows,n0,o)=>{o=o||{};const C={x,y,cell,cols,rows,n0,k:0,a:1,hot:{},ring:{}};
 C.pos=n=>{const i=n-n0;return {x:x+(i%cols+.5)*cell,y:y-(Math.floor(i/cols)+.5)*cell};};
 C.it=G.add(o.layer||'U',g=>{if(C.k<=0)return;g.save();g.globalAlpha*=C.a;const c=cell*G.PX;const N=cols*rows,show=Math.round(N*Math.min(1,C.k));
  g.fillStyle='rgba(0,0,0,.12)';g.fillRect(G.X(x)+5,G.Y(y)+7,cols*c,rows*c);g.fillStyle='#fffdf7';g.fillRect(G.X(x),G.Y(y),cols*c,rows*c);
  for(let i=0;i<show;i++){const n=n0+i,X=G.X(x)+(i%cols)*c,Y=G.Y(y)+Math.floor(i/cols)*c;if(C.hot[n]){g.fillStyle=C.hot[n];g.fillRect(X+2,Y+2,c-4,c-4);}
   g.strokeStyle='#adb5bd';g.lineWidth=2;g.strokeRect(X,Y,c,c);g.font='bold '+Math.round(c*.42)+'px "Atkinson Hyperlegible",sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillStyle=C.hot[n]?'#fff':'#343a40';g.fillText(String(n),X+c/2,Y+c/2+1);
   if(C.ring[n]){g.strokeStyle=C.ring[n];g.lineWidth=6;g.strokeRect(X+3,Y+3,c-6,c-6);}}
  g.restore();});return C;};
/* a flat clay 2-D shape. kind: circle, triangle, square, rectangle, hexagon, octagon, rhombus.
   o.side[i]=colour highlights side i; o.dot[i]=true shows corner i; o.rot spins it; points in world units */
const SHP={triangle:[[0,1],[.866,-.5],[-.866,-.5]],square:[[-.72,.72],[.72,.72],[.72,-.72],[-.72,-.72]],rectangle:[[-1.15,.6],[1.15,.6],[1.15,-.6],[-1.15,-.6]],
 hexagon:[0,1,2,3,4,5].map(i=>[Math.cos(Math.PI/3*i),Math.sin(Math.PI/3*i)]),octagon:[0,1,2,3,4,5,6,7].map(i=>[Math.cos(Math.PI/4*i+Math.PI/8),Math.sin(Math.PI/4*i+Math.PI/8)]),rhombus:[[0,1],[.7,0],[0,-1],[-.7,0]]};
const shape=(G,kind,x,y,r,col,o)=>{o=Object.assign({kind,x,y,r,col,s:0,a:1,hl:0,rot:0,side:{},dot:{},ring:0},o||{});
 o.pts=()=>(SHP[o.kind]||[]).map(([px,py])=>{const c=Math.cos(o.rot),sn=Math.sin(o.rot);const qx=px*c-py*sn,qy=px*sn+py*c;return [o.x+qx*o.r*o.s,o.y+qy*o.r*o.s];});
 o.mid=i=>{const p=o.pts(),a=p[i],b=p[(i+1)%p.length];return {x:(a[0]+b[0])/2,y:(a[1]+b[1])/2};};
 o.it=G.add(o.layer||'F',g=>{if(o.s<=.01)return;g.save();g.globalAlpha*=o.a;const X=G.X,Y=G.Y;
  if(o.hl){g.shadowColor='rgba(255,214,10,'+o.hl+')';g.shadowBlur=40*o.hl;}
  const path=()=>{g.beginPath();if(o.kind==='circle'){g.arc(X(o.x),Y(o.y),o.r*o.s*G.PX,0,7);}else{o.pts().forEach((p,i)=>i?g.lineTo(X(p[0]),Y(p[1])):g.moveTo(X(p[0]),Y(p[1])));g.closePath();}};
  g.save();g.translate(6,9);path();g.fillStyle='rgba(0,0,0,.16)';g.fill();g.restore();g.shadowBlur=0;
  path();const gr=g.createLinearGradient(0,Y(o.y+o.r),0,Y(o.y-o.r));gr.addColorStop(0,shade(o.col,.4));gr.addColorStop(1,shade(o.col,-.12));g.fillStyle=gr;g.fill();
  g.lineJoin='round';g.lineWidth=8;g.strokeStyle=shade(o.col,-.3);g.stroke();
  if(o.kind!=='circle'){const p=o.pts();p.forEach((a,i)=>{const b=p[(i+1)%p.length];if(o.side[i]){g.strokeStyle=o.side[i];g.lineWidth=16;g.lineCap='round';g.beginPath();g.moveTo(X(a[0]),Y(a[1]));g.lineTo(X(b[0]),Y(b[1]));g.stroke();}});
   p.forEach((a,i)=>{if(o.dot[i]){g.fillStyle='#fff';g.beginPath();g.arc(X(a[0]),Y(a[1]),15,0,7);g.fill();g.fillStyle=o.dot[i]===true?'#e03131':o.dot[i];g.beginPath();g.arc(X(a[0]),Y(a[1]),11,0,7);g.fill();}});}
  else if(o.ring){g.strokeStyle='#ffd43b';g.lineWidth=14;g.beginPath();g.arc(X(o.x),Y(o.y),o.r*o.s*G.PX,-Math.PI/2,-Math.PI/2+o.ring*Math.PI*2);g.stroke();}
  g.restore();});return o;};
/* a round pie / pizza cut into n equal parts (or custom angles): P.parts[i].d pushes a part outward, .hl glows it */
const pie=(G,x,y,r,n,col,o)=>{o=o||{};const angs=o.angs||Array.from({length:n},()=>1/n);const Pi={x,y,r,s:0,a:1,cut:0,col:col||'#ffa94d',top:o.top||'#e03131',parts:[]};let a0=-Math.PI/2;
 angs.forEach(f=>{Pi.parts.push({a0,a1:a0+f*Math.PI*2,d:0,hl:0,a:1});a0+=f*Math.PI*2;});
 Pi.it=G.add('F',g=>{if(Pi.s<=.01)return;g.save();g.globalAlpha*=Pi.a;const R0=Pi.r*Pi.s*G.PX;
  Pi.parts.forEach((p,i)=>{const mid=(p.a0+p.a1)/2,dx=Math.cos(mid)*p.d*G.PX,dy=Math.sin(mid)*p.d*G.PX;const X=G.X(Pi.x)+dx,Y=G.Y(Pi.y)+dy;g.save();g.globalAlpha*=p.a;
   if(p.hl){g.shadowColor='rgba(255,214,10,'+p.hl+')';g.shadowBlur=36*p.hl;}
   g.beginPath();g.moveTo(X,Y);g.arc(X,Y,R0,p.a0,p.a1);g.closePath();g.fillStyle='#e8a54b';g.fill();g.shadowBlur=0;
   g.beginPath();g.moveTo(X,Y);g.arc(X,Y,R0*.86,p.a0,p.a1);g.closePath();g.fillStyle=Pi.col;g.fill();
   for(let k=0;k<3;k++){const aa=p.a0+(p.a1-p.a0)*(k+.5)/3,rr=R0*(.35+.25*(k%2));g.fillStyle=Pi.top;g.beginPath();g.arc(X+Math.cos(aa)*rr,Y+Math.sin(aa)*rr,R0*.09,0,7);g.fill();}
   if(Pi.cut){g.strokeStyle='#fff';g.lineWidth=5;g.beginPath();g.moveTo(X,Y);g.lineTo(X+Math.cos(p.a0)*R0*Pi.cut,Y+Math.sin(p.a0)*R0*Pi.cut);g.stroke();}
   g.restore();});g.restore();});return Pi;};
const split=(R,Pi,d,sec)=>all(Pi.parts.map(p=>R.T(sec||.6,e=>{p.d=d*e;})));
/* an analog clock: C.h = hour (0..12, fractional ok), C.m = minutes; hands drawn from those */
const clock=(G,x,y,r,o)=>{o=o||{};const C={x,y,r,h:3,m:0,s:0,hl:0,col:o.col||'#e03131'};
 C.it=G.add('F',g=>{if(C.s<=.01)return;g.save();const X=G.X(C.x),Y=G.Y(C.y),Rr=C.r*G.PX*C.s;if(C.hl){g.shadowColor='rgba(255,214,10,'+C.hl+')';g.shadowBlur=40*C.hl;}
  g.fillStyle='rgba(0,0,0,.15)';g.beginPath();g.arc(X+6,Y+9,Rr,0,7);g.fill();g.fillStyle=C.col;g.beginPath();g.arc(X,Y,Rr,0,7);g.fill();g.shadowBlur=0;g.fillStyle='#fffdf7';g.beginPath();g.arc(X,Y,Rr*.86,0,7);g.fill();
  g.fillStyle='#343a40';g.font='bold '+Math.round(Rr*.22)+'px "Atkinson Hyperlegible",sans-serif';g.textAlign='center';g.textBaseline='middle';
  for(let k=1;k<=12;k++){const a=k/12*Math.PI*2-Math.PI/2;g.fillText(String(k),X+Math.cos(a)*Rr*.68,Y+Math.sin(a)*Rr*.68);}
  const hand=(ang,len,w,col)=>{g.strokeStyle=col;g.lineWidth=w;g.lineCap='round';g.beginPath();g.moveTo(X,Y);g.lineTo(X+Math.cos(ang)*len,Y+Math.sin(ang)*len);g.stroke();};
  hand(((C.h%12)+C.m/60)/12*Math.PI*2-Math.PI/2,Rr*.42,Rr*.09,'#1c7ed6');hand(C.m/60*Math.PI*2-Math.PI/2,Rr*.66,Rr*.055,'#e8590c');
  g.fillStyle='#343a40';g.beginPath();g.arc(X,Y,Rr*.07,0,7);g.fill();g.restore();});return C;};
const turn=(R,C,h,m,sec)=>{const h0=C.h,m0=C.m;const tot0=h0*60+m0,tot1=h*60+(m||0);return R.T(sec||1.2,e=>{const t=tot0+(tot1-tot0)*e;C.h=Math.floor(t/60);C.m=t%60;});};
/* tally marks at x (left), y (bottom): T.n marks shown (5th crosses the four) */
const tally=(G,x,y,o)=>{o=o||{};const T={x,y,n:0,h:o.h||.36,gap:o.gap||.075,col:o.col||'#343a40',a:1,hl:0};
 T.it=G.add('F',g=>{if(T.n<=0)return;g.save();g.globalAlpha*=T.a;g.strokeStyle=T.col;g.lineWidth=7;g.lineCap='round';if(T.hl){g.shadowColor='rgba(255,214,10,'+T.hl+')';g.shadowBlur=30*T.hl;}
  const n=Math.floor(T.n);for(let i=0;i<n;i++){const b=Math.floor(i/5),k=i%5;const bx=T.x+b*(T.gap*5+.12);if(k<4){const xx=bx+k*T.gap;g.beginPath();g.moveTo(G.X(xx),G.Y(T.y));g.lineTo(G.X(xx+.01),G.Y(T.y+T.h));g.stroke();}
   else{g.strokeStyle=o.cross||'#e03131';g.beginPath();g.moveTo(G.X(bx-.05),G.Y(T.y+.05));g.lineTo(G.X(bx+3*T.gap+.05),G.Y(T.y+T.h-.05));g.stroke();g.strokeStyle=T.col;}}g.restore();});return T;};
const mark=async(R,T,n,sec)=>{for(let i=Math.floor(T.n)+1;i<=n;i++){T.n=i;await R.wait(sec||.35);}};
/* a clay actor that wobbles bigger for a moment */
const boing=(R,a,k)=>a.grow?a.grow(1+(k||.12),1-(k||.12)*.6,.25).then(()=>a.grow(1,1,.25)):R.wait(.5);
P.MK={gfx,tally,mark,clock,turn,pie,split,shape,chart,tframe,growF,nline,drawN,ell,span,drawS,pulse,num,balance,pencil,shade,bar,cube,tower,tag,growX,growY,slideB,glowB,vline,hline,drawL,fadeL,boing};
})();
