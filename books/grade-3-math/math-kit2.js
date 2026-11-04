/* The Interactive Classroom — math models for the P.unit books (Grade 2 Math and up).
   Each model is a small 3D toy built from code, named so narration cues can light up its parts:
   base-ten blocks, column sums with carrying, number lines with hops, clocks, Canadian coins, rulers,
   area grids, polygons, solids and skeletons, equal groups, arrays, fraction pies and bars, jugs,
   a balance, a thermometer, a calendar, a hundreds chart, bar graphs, pictographs, tallies and spinners.
   A lesson asks for one with set.custom = 'blocks' | 'col' | 'line' | … (plus that model's settings). */
(function(){
"use strict";
const P=window.PM;if(!P||P.failed||!P.K2)return;
const {THREE,V,G,M,lam,mk,label,A,tween,burst,unitBox,wedgeGeo,INK}=P;const K=P.K,K2=P.K2,C=K2.CUSTOM;
const COL=['#ff8a5b','#4fb3ff','#5cc46a','#ffb347','#b07cff','#ff6b9a','#26a69a','#f2c12e'];
const box=(w,h,d,c,th)=>mk(G('mk_b'+w+'_'+h+'_'+d,()=>new THREE.BoxGeometry(w,h,d)),lam(c),th===0?0:20);
const cyl=(a,b,h,c,n,th)=>mk(G('mk_c'+a+'_'+b+'_'+h+'_'+(n||32),()=>new THREE.CylinderGeometry(a,b,h,n||32)),lam(c),th==null?0:th);
const sph=(r,c)=>mk(G('mk_s'+r,()=>new THREE.SphereGeometry(r,18,12)),lam(c),0);
const at=(o,x,y,z)=>{o.position.set(x,y,z);return o;};
const tag=(t,o)=>label(String(t),Object.assign({size:.22,bg:'#ffffff',border:'#1b2236'},o||{}));
const name=(o,n,part)=>{o.userData.name=n;if(part!=null)o.userData.part=String(part);return o;};
const num=(t,o)=>{const b=K2.block(String(t),o);return b;};
const pop=(o,d)=>{const s0=o.scale.clone();o.scale.multiplyScalar(.01);return tween(d||.35,k=>{const f=k<.75?k/.75*1.12:1.12-(k-.75)/.25*.12;o.scale.set(s0.x*f,s0.y*f,s0.z*f);});};
const thing=(n,s)=>{if(K.TOYS&&K.TOYS[n])return K.toy(n,{s:s||1.6});const g=K2.standee(n,{label:false,s:(s||1.6)*.45});return g;};
function tube(a,b,r,c){const d=b.clone().sub(a);const m=cyl(r,r,1,c,8);m.scale.y=d.length();m.position.copy(a).add(b).multiplyScalar(.5);m.quaternion.setFromUnitVectors(V(0,1,0),d.normalize());return m;}

/* ---------- base-ten blocks: hundreds flats, tens rods, ones cubes ---------- */
C.blocks=function(g2,st,h,set){const u=set.u||.105;const H=set.h||0,Tn=set.t||0,O=set.o||0;let x=-2.15;const out={};
  const grp=(n,k)=>{const g=new THREE.Group();name(g,n);g2.add(g);return g;};
  if(H){const gH=grp('hundreds');for(let i=0;i<H;i++){const f=unitBox(10,1,10,'#ffb347',u);at(f,x+5*u+i*(10*u+.08),u/2+i*.0,-2.4);gH.add(f);}const L=tag(H+(H>1?' hundreds':' hundred'));L.position.set(x+H*(5*u+.04),.42,-1.72);gH.add(L);x+=H*(10*u+.08)+.12;}
  if(Tn){const gT=grp('tens');for(let i=0;i<Tn;i++){const r=unitBox(1,1,10,'#4fb3ff',u);at(r,x+u/2+i*(u+.05),u/2,-2.4);gT.add(r);}const L=tag(Tn+(Tn>1?' tens':' ten'));L.position.set(x+Tn*(u+.05)/2,.42,-1.72);gT.add(L);x+=Tn*(u+.05)+.14;}
  if(O){const gO=grp('ones');for(let i=0;i<O;i++){const c=unitBox(1,1,1,'#5cc46a',u);at(c,x+u/2+(i%2)*(u+.04),u/2,-2.85+Math.floor(i/2)*(u+.04));gO.add(c);}const L=tag(O+(O>1?' ones':' one'));L.position.set(x+u,.42,-1.72);gO.add(L);x+=2*(u+.04);}
  if(set.show!==false){const n=H*100+Tn*10+O;const L=tag(set.label||(set.eq?(H?H*100+' + ':'')+(Tn*10)+' + '+O+' = '+n:String(n)),{size:.3,bg:'#fff3c4'});L.position.set(0,.95,-2.9);name(L,'number');g2.add(L);}
  return {play(){let k=0;g2.traverse(o=>{if(o.isMesh&&o.geometry&&o.geometry.type==='BoxGeometry'&&o.parent&&o.parent.userData.name)A.later(()=>{const y0=o.position.y;tween(.3,q=>{o.position.y=y0+Math.sin(q*Math.PI)*.2;});},(k++)*90);});}};};

/* ---------- column addition / subtraction with carrying and trading ---------- */
C.col=function(g2,st,h,set){const a=set.a,b=set.b,op=set.op||'+';const ans=op==='+'?a+b:op==='-'?a-b:a*b;const W=Math.max(String(a).length,String(b).length,String(ans).length);
  const cw=.62,x0=.35+(W-1)*cw/2;const xs=i=>x0-i*cw;/* i = place from the right */const z=[-3.0,-2.3,-1.45];const done=st.colDone||set.done;
  const lab=['ones','tens','hundreds'];for(let i=0;i<W;i++){const L=tag(lab[i][0].toUpperCase(),{size:.2,color:'#7a8094'});L.position.set(xs(i),.12,-3.12);g2.add(L);
    const lane=mk(G('mk_lane',()=>new THREE.BoxGeometry(cw*.92,.02,1.95)),new THREE.MeshLambertMaterial({color:i%2?'#eaf4ff':'#fff6e0'}),0);at(lane,xs(i),.01,-2.15);name(lane,lab[i]+' column',lab[i]);g2.add(lane);}
  const put=(n,row,part)=>{String(n).split('').reverse().forEach((d,i)=>{const bl=num(d,{side:row===2?'#5fd38a':'#ffd24a'});bl.scale.setScalar(.95);at(bl,xs(i),.02,z[row]);bl.userData.part=part+i;g2.add(bl);});};
  put(a,0,'a');put(b,1,'b');const s=num(op==='*'?'×':op,{side:'#ff8a5b'});s.scale.setScalar(.8);at(s,xs(W-1)-cw-.05,.02,z[1]);g2.add(s);
  const bar=box(W*cw+.5,.04,.05,'#1b2236',0);at(bar,x0-(W-1)*cw/2-.2,.06,-1.88);g2.add(bar);
  /* carries (addition) and trades (subtraction) */
  const marks=[];if(op==='+'){let c=0;for(let i=0;i<W;i++){const s2=(Math.floor(a/10**i)%10)+(Math.floor(b/10**i)%10)+c;c=s2>=10?1:0;if(c&&i+1<W)marks.push([i+1,'1']);}}
  if(op==='-'){let bor=0;for(let i=0;i<W;i++){const da=(Math.floor(a/10**i)%10)-bor,db=Math.floor(b/10**i)%10;if(da<db){marks.push([i,'+10']);marks.push([i+1,'-1']);bor=1;}else bor=0;}}
  const showM=()=>marks.forEach(([i,t])=>{const L=tag(t,{size:.2,bg:'#ffe066',border:'#e09b00'});L.position.set(xs(i)+(t==='+10'?.22:0),.95,-3.0);name(L,'carry','carry');g2.add(L);});
  if(done){put(ans,2,'ans');showM();}else{for(let i=0;i<String(ans).length;i++){const gh=new THREE.Group();const q=tag('?',{size:.3,color:'#c27c00'});q.position.y=.3;gh.add(q);at(gh,xs(i),0,z[2]);gh.userData.part='ans'+i;g2.add(gh);}}
  return {play(){if(st.colDone)return;st.colDone=true;showM();h.redrawCustom();},controls:()=>st.round||done||st.colDone?[]:[{t:'Show the answer',go:true,fn:()=>{st.colDone=true;h.redrawCustom();}}]};};

/* ---------- number line with hops ---------- */
C.line=function(g2,st,h,set){const lo=set.min,hi=set.max,step=set.step||1,every=set.every||step;const L0=-2.1,L1=2.1,X=n=>L0+(n-lo)/(hi-lo)*(L1-L0),z=-2.0;
  const bar=box(4.4,.05,.07,'#1b2236',0);at(bar,0,.03,z);g2.add(bar);
  for(let n=lo;n<=hi+1e-9;n+=step){const big=Math.abs((n-lo)%every)<1e-9;const t=box(.025,.02,big?.24:.14,'#1b2236',0);at(t,X(n),.05,z);t.userData.part='n'+n;g2.add(t);
    if(big){const L=label(String(n),{size:.17,color:(set.mark||[]).includes(n)?'#e4572e':'#1b2236'});L.position.set(X(n),.12,z+.32);L.userData.part='n'+n;g2.add(L);}}
  (set.mark||[]).forEach(n=>{const d=sph(.07,'#e4572e');at(d,X(n),.1,z);name(d,'mark','m'+n);g2.add(d);});
  const hops=set.hops||[];const fr=K2.standee(set.who||'frog',{label:false,s:.55});name(fr,'frog');const start=hops.length?hops[0][0]:(set.at!=null?set.at:lo);at(fr,X(start),.05,z-.1);g2.add(fr);
  const arcs=[];hops.forEach(([a,b],i)=>{const pts=[];for(let k=0;k<=20;k++){const q=k/20;pts.push(V(X(a)+(X(b)-X(a))*q,.08+Math.sin(q*Math.PI)*(.25+Math.min(.5,Math.abs(X(b)-X(a))*.25)),z));}
    const tb=new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts),20,.018,6),lam(b>a?'#16a36f':'#e4572e'));tb.visible=!!(st.lineDone||set.done);name(tb,'hop','hop'+i);g2.add(tb);arcs.push(tb);
    if(set.hopLabels!==false){const t=tag((b>a?'+':'')+(b-a),{size:.16,bg:b>a?'#e8f8ee':'#fdecea',border:b>a?'#16a36f':'#e4572e'});t.position.set((X(a)+X(b))/2,.7,z);t.visible=tb.visible;tb.add(t);t.position.sub(tb.position);}});
  if(st.lineDone||set.done){const last=hops.length?hops[hops.length-1][1]:start;fr.position.x=X(last);}
  const api={play(){fr.position.x=X(start);arcs.forEach(t=>{t.visible=false;t.children.forEach(c=>c.visible=false);});let p=Promise.resolve();hops.forEach(([a,b],i)=>{p=p.then(()=>{arcs[i].visible=true;arcs[i].children.forEach(c=>c.visible=true);return P.hop(fr,V(X(b),.05,z-.1),.45,.55);});});p.then(()=>{st.lineDone=true;});}};
  api.controls=()=>st.round||!hops.length?[]:[{t:'Hop!',go:true,fn:()=>api.play()}];return api;};

/* ---------- clock (one or two) ---------- */
function clockAt(g2,x,z,hh,mm,s){const g=new THREE.Group();at(g,x,0,z);g2.add(g);name(g,'clock');const face=cyl(.62*s,.62*s,.08,'#ffffff',48,20);face.position.y=.04;g.add(face);const rim=mk(G('mk_rim'+s,()=>new THREE.TorusGeometry(.62*s,.05*s,8,48)),lam('#2f7de1'),0);rim.rotation.x=Math.PI/2;rim.position.y=.09;g.add(rim);
  for(let i=1;i<=12;i++){const a=i/12*Math.PI*2;const L=label(String(i),{size:.13*s*1.6,color:'#1b2236'});L.position.set(Math.sin(a)*.48*s,.1,-Math.cos(a)*.48*s);g.add(L);}
  for(let i=0;i<60;i++){if(i%5)continue;}
  const hand=(len,w,c,n)=>{const p=new THREE.Group();p.position.y=.1;const m=box(w,.03,len,c,0);m.position.z=-len/2;p.add(m);name(p,n,n);g.add(p);return p;};
  const H=hand(.3*s,.06*s,'#1b2236','hour hand'),Mn=hand(.47*s,.035*s,'#e4572e','minute hand');const hub=cyl(.05*s,.05*s,.06,'#1b2236',16);hub.position.y=.12;g.add(hub);
  const setT=(h1,m1)=>{Mn.rotation.y=-m1/60*Math.PI*2;H.rotation.y=-((h1%12)+m1/60)/12*Math.PI*2;};setT(hh,mm);g.userData.setT=setT;return g;}
const tstr=(h1,m1)=>h1+':'+String(m1).padStart(2,'0');
C.clock=function(g2,st,h,set){const cs=set.clocks||[[set.h,set.m||0]];const n=cs.length,s=n>1?.85:1.1;const cl=cs.map(([hh,mm],i)=>{const c=clockAt(g2,n>1?(i-(n-1)/2)*2.0:0,-2.25,hh,mm,s);
    if(set.digital!==false&&set.show!==false){const L=tag(set.say?set.say[i]:tstr(hh,mm),{size:.24,bg:'#fff3c4'});L.position.set(c.position.x,.25,-1.35);name(L,'time');g2.add(L);}return c;});
  return {play(){if(set.from){const [h0,m0]=set.from,[h1,m1]=cs[0];const t0=h0*60+m0,t1=h1*60+m1+(h1*60+m1<t0?720:0);tween(2.2,k=>{const t=t0+(t1-t0)*k;cl[0].userData.setT(Math.floor(t/60),t%60);});}}};};

/* ---------- Canadian coins ---------- */
const COIN={toonie:{d:.84,c:'#cfd6dc',in:'#e0b84a',v:200,t:'$2'},loonie:{d:.8,c:'#e0b84a',v:100,t:'$1',sides:11},quarter:{d:.72,c:'#cfd6dc',v:25,t:'25¢'},dime:{d:.54,c:'#cfd6dc',v:10,t:'10¢'},nickel:{d:.64,c:'#cfd6dc',v:5,t:'5¢'}};
function coin(k){const c=COIN[k];const g=new THREE.Group();name(g,k);const d=cyl(c.d/2,c.d/2,.06,c.c,c.sides||40,20);d.position.y=.03;g.add(d);if(c.in){const i=cyl(c.d*.3,c.d*.3,.062,c.in,40,0);i.position.y=.031;g.add(i);}
  const L=label(c.t,{size:.2,color:'#1b2236'});L.position.set(0,.22,0);g.add(L);g.userData.v=c.v;return g;}
C.coins=function(g2,st,h,set){const list=set.coins||[];const n=list.length,sp=Math.min(.92,4.3/Math.max(1,n>7?Math.ceil(n/2):n));let tot=0;list.forEach((k,i)=>{const c=coin(k);const row=n>7?Math.floor(i/Math.ceil(n/2)):0,per=n>7?Math.ceil(n/2):n;const j=n>7?i%per:i;
    at(c,(j-(per-1)/2)*sp,0,(set.item?-1.75:-2.4)+row*.9);c.userData.i=i;g2.add(c);tot+=COIN[k].v;A.drag(c,{tap:()=>{A.pop();A.say(COIN[k].t);const y0=c.position.y;tween(.4,q=>{c.position.y=y0+Math.sin(q*Math.PI)*.3;c.rotation.x=q*Math.PI*2;});}});});
  if(set.item){const it=thing(set.item,1.4);at(it,-1.5,0,-2.85);name(it,set.item);g2.add(it);const pt=tag(set.price,{size:.26,bg:'#fff3c4',border:'#e09b00'});pt.position.set(-.75,.6,-2.85);name(pt,'price');g2.add(pt);}
  if(set.total){const L=tag(set.totalText||('Total: '+(tot>=100&&tot%100===0?'$'+tot/100:tot>=100?'$'+(tot/100).toFixed(2):tot+'¢')),{size:.26,bg:'#e8f8ee',border:'#16a36f'});L.position.set(1.3,.6,-2.9);name(L,'total');g2.add(L);}
  return {play(){let s=0;g2.children.filter(o=>o.userData.v).forEach((c,i)=>A.later(()=>{s+=c.userData.v;const y0=c.position.y;tween(.35,q=>{c.position.y=y0+Math.sin(q*Math.PI)*.35;});A.say(s>=100?'$'+(s/100).toFixed(2):s+'¢');},i*520));}};};

/* ---------- ruler and things to measure ---------- */
C.ruler=function(g2,st,h,set){const N=set.cm||15,u=Math.min(.27,4.2/N),x0=-u*N/2;const r=box(u*N+.16,.04,.42,'#ffe7a3',20);at(r,0,.02,-1.9);name(r,'ruler');g2.add(r);
  for(let i=0;i<=N;i++){const t=box(.015,.01,i%5?.1:.18,'#1b2236',0);at(t,x0+i*u,.045,-2.08+(i%5?.04:.08));g2.add(t);const L=label(String(i),{size:.12,color:'#1b2236'});L.position.set(x0+i*u,.07,-1.82);g2.add(L);}
  const cm=label('cm',{size:.12,color:'#7a8094'});cm.position.set(x0+N*u+.15,.07,-1.82);g2.add(cm);
  (set.objs||[{len:set.len,start:set.start||0,c:set.c||'#ff6b9a',n:set.obj||'worm'}]).forEach((o,j)=>{const b=box(o.len*u,.12,.16,o.c||COL[j],20);at(b,x0+(o.start||0)*u+o.len*u/2,.06,-2.45-j*.32);name(b,o.n||'object');g2.add(b);
    if(set.show){const L=tag(o.len+' cm',{size:.17});L.position.set(b.position.x,.35,b.position.z);g2.add(L);}});return {};};
/* non-standard units: a thing and a row of units along it */
C.units=function(g2,st,h,set){const n=set.n,w=Math.min(.6,3.8/n);const b=box(n*w,.12,.18,set.c||'#ff6b9a',20);at(b,0,.06,-2.6);name(b,set.obj||'ribbon');g2.add(b);
  const us=[];for(let i=0;i<n;i++){const u=thing(set.unit||'paperclip',.9);u.scale.multiplyScalar(w/.6);at(u,-n*w/2+w/2+i*w,0,-2.0);name(u,'unit');u.visible=!!(st.unitsDone||set.done);g2.add(u);us.push(u);}
  return {play(){us.forEach((u,i)=>A.later(()=>{u.visible=true;pop(u);A.say(String(i+1));},i*350));}};};

/* ---------- squares grid: area and perimeter ---------- */
C.area=function(g2,st,h,set){const R=set.rows||5,Cc=set.cols||8,c=Math.min(.42,4.2/Cc,2.2/R),x0=-(Cc-1)*c/2,z0=-3.0+c/2;const on=new Set((set.cells||[]).map(([r,q])=>r+','+q));
  for(let r=0;r<R;r++)for(let q=0;q<Cc;q++){const lit=on.has(r+','+q);const t=mk(G('mk_cell'+c,()=>new THREE.BoxGeometry(c*.94,.04,c*.94)),lam(lit?(set.col||'#4fb3ff'):'#f4f6fb'),lit?20:0);at(t,x0+q*c,lit?.04:.02,z0+r*c);if(lit)name(t,'square','sq');g2.add(t);}
  if(set.perim){const edges=[];on.forEach(k=>{const [r,q]=k.split(',').map(Number);[[0,-1,'h',r,q],[0,1,'h',r+1,q],[-1,0,'v',r,q],[1,0,'v',r,q+1]].forEach(([dq,dr,o,rr,qq])=>{const nb=(r+(o==='h'?(dr):0))+','+(q+(o==='v'?dq:0));if(!on.has(nb))edges.push([o,rr,qq]);});});
    edges.forEach(([o,rr,qq])=>{const a=o==='h'?V(x0+(qq-.5)*c,.09,z0+(rr-.5)*c):V(x0+(qq-.5)*c,.09,z0+(rr-.5)*c);const b2=o==='h'?V(x0+(qq+.5)*c,.09,z0+(rr-.5)*c):V(x0+(qq-.5)*c,.09,z0+(rr+.5)*c);const t=tube(a,b2,.025,'#e4572e');name(t,'perimeter','edge');g2.add(t);});}
  if(set.label!==false&&set.cells){const L=tag(set.label||(set.cells.length+' squares'),{size:.24,bg:'#fff3c4'});L.position.set(0,.6,z0+R*c+.12);name(L,'area');g2.add(L);}
  return {play(){const sq=g2.children.filter(o=>o.userData.name==='square');sq.forEach((o,i)=>A.later(()=>{const y0=o.position.y;tween(.3,q=>{o.position.y=y0+Math.sin(q*Math.PI)*.15;});if(sq.length<=30)A.say(String(i+1));},i*200));}};};

/* ---------- polygons ---------- */
const SH={triangle:3,square:4,rectangle:4,pentagon:5,hexagon:6,heptagon:7,octagon:8,circle:0,parallelogram:4,rhombus:4,trapezoid:4};
function polyGeo(kind,s,reg){const sh=new THREE.Shape();const n=SH[kind];if(kind==='circle'){sh.absarc(0,0,s,0,Math.PI*2,false);}
  else if(kind==='rectangle'){sh.moveTo(-s*1.25,-s*.65);sh.lineTo(s*1.25,-s*.65);sh.lineTo(s*1.25,s*.65);sh.lineTo(-s*1.25,s*.65);}
  else if(kind==='parallelogram'){sh.moveTo(-s*1.1,-s*.6);sh.lineTo(s*.7,-s*.6);sh.lineTo(s*1.1,s*.6);sh.lineTo(-s*.7,s*.6);}
  else if(kind==='trapezoid'){sh.moveTo(-s*1.1,-s*.6);sh.lineTo(s*1.1,-s*.6);sh.lineTo(s*.55,s*.6);sh.lineTo(-s*.55,s*.6);}
  else{const off=n===4?Math.PI/4:Math.PI/2;for(let i=0;i<n;i++){const a=off+i*Math.PI*2/n,rr=reg===false&&i%2?s*.7:s;const x=Math.cos(a)*rr,y=Math.sin(a)*rr;i?sh.lineTo(x,y):sh.moveTo(x,y);}}
  sh.closePath();return new THREE.ExtrudeGeometry(sh,{depth:.08,bevelEnabled:false});}
function poly(kind,o){o=o||{};const g=new THREE.Group();name(g,kind);const geo=G('mk_pg'+kind+(o.s||.45)+(o.reg===false?'i':''),()=>polyGeo(kind,o.s||.45,o.reg));const m=mk(geo,lam(o.c||'#4fb3ff'),20);m.rotation.x=-Math.PI/2;m.position.y=.01;g.add(m);
  if(o.verts&&SH[kind]){const pos=geo.attributes.position;const seen=[];for(let i=0;i<pos.count;i++){const x=pos.getX(i),y=pos.getY(i),z=pos.getZ(i);if(z>.01)continue;const k=x.toFixed(2)+','+y.toFixed(2);if(seen.includes(k))continue;seen.push(k);const d=sph(.05,'#e4572e');d.position.set(x,.1,-y);name(d,'vertex','v');g.add(d);}}
  if(o.label!==false){const L=tag(o.label||kind,{size:.18});L.position.set(0,.45,0);g.add(L);}return g;}
C.shapes=function(g2,st,h,set){const L=set.shapes,n=L.length,sp=Math.min(1.25,4.3/n);L.forEach((k,i)=>{const spec=typeof k==='string'?{k}:k;const g=poly(spec.k,{c:spec.c||COL[i%COL.length],verts:set.verts,label:set.labels===false?false:spec.label,reg:spec.reg,s:spec.s||(n>4?.36:.45)});
    at(g,(i-(n-1)/2)*sp,0,spec.z||-2.3);g.userData.i=i;g2.add(g);A.drag(g,{tap:()=>{A.pop();A.say(spec.label||spec.k);const r0=g.rotation.y;tween(.6,q=>{g.rotation.y=r0+q*Math.PI*2;});}});});
  if(set.sym){const ln=box(.03,.02,1.6,'#e4572e',0);ln.rotation.y=set.sym;at(ln,0,.12,-2.3);name(ln,'line of symmetry');g2.add(ln);}return {};};

/* ---------- solids and skeletons ---------- */
const SOL={cube:'cube',rprism:'rectangular prism',tprism:'triangular prism',spyr:'square pyramid',tpyr:'triangular pyramid',ppyr:'pentagonal pyramid',cone:'cone',cyl:'cylinder',sphere:'sphere',hprism:'hexagonal prism'};
function solidGeo(k){return G('mk_sol'+k,()=>{switch(k){case 'cube':return new THREE.BoxGeometry(.7,.7,.7);case 'rprism':return new THREE.BoxGeometry(1.0,.5,.55);
  case 'tprism':{const g=new THREE.CylinderGeometry(.42,.42,.9,3);g.rotateZ(Math.PI/2);return g;}case 'hprism':return new THREE.CylinderGeometry(.4,.4,.6,6);
  case 'spyr':{const g=new THREE.ConeGeometry(.52,.75,4);g.rotateY(Math.PI/4);return g;}case 'tpyr':return new THREE.ConeGeometry(.5,.75,3);case 'ppyr':return new THREE.ConeGeometry(.5,.75,5);
  case 'cone':return new THREE.ConeGeometry(.4,.8,32);case 'cyl':return new THREE.CylinderGeometry(.35,.35,.75,32);default:return new THREE.SphereGeometry(.4,32,20);}});}
function solid(k,o){o=o||{};const g=new THREE.Group();name(g,SOL[k]||k);const geo=solidGeo(k);geo.computeBoundingBox();const y=-geo.boundingBox.min.y;
  if(o.skel){const e=new THREE.EdgesGeometry(geo,20);const p=e.attributes.position;const vs=[];for(let i=0;i<p.count;i+=2){const a=V(p.getX(i),p.getY(i)+y,p.getZ(i)),b=V(p.getX(i+1),p.getY(i+1)+y,p.getZ(i+1));const t=tube(a,b,.025,'#a1887f');name(t,'edge','edge');g.add(t);[a,b].forEach(v=>{if(!vs.some(w=>w.distanceTo(v)<.01))vs.push(v);});}
    vs.forEach(v=>{const m=sph(.06,'#ffffff');m.position.copy(v);name(m,'vertex','vertex');g.add(m);});g.userData.edges=p.count/2;g.userData.verts=vs.length;}
  else{const m=mk(geo,lam(o.c||'#4fb3ff'),k==='sphere'||k==='cone'||k==='cyl'?0:20);m.position.y=y;g.add(m);}
  if(o.label!==false){const L=tag(o.label||SOL[k],{size:.17});L.position.set(0,y*2+.32,0);g.add(L);}if(o.s)g.scale.setScalar(o.s);return g;}
C.solids=function(g2,st,h,set){const L=set.solids,n=L.length,sp=Math.min(1.4,4.3/n);L.forEach((k,i)=>{const g=solid(k,{c:COL[i%COL.length],skel:set.skel,label:set.labels===false?false:(set.labels&&set.labels[i]),s:n>3?.85:1});at(g,(i-(n-1)/2)*sp,0,-2.3);g.userData.i=i;g2.add(g);
    A.drag(g,{tap:()=>{A.pop();A.say(set.labels&&set.labels[i]||SOL[k]);const r0=g.rotation.y;tween(.8,q=>{g.rotation.y=r0+q*Math.PI*2;});}});});
  return {play(){g2.children.filter(o=>o.userData.i!=null).forEach((g,i)=>A.later(()=>{const r0=g.rotation.y;tween(1.2,q=>{g.rotation.y=r0+q*Math.PI*2;});},i*300));}};};
/* things that roll and slide on a ramp */
C.ramp=function(g2,st,h,set){const r=box(3.6,.06,1.0,'#d7ccc8',20);r.rotation.z=-.18;at(r,0,.38,-2.3);g2.add(r);const objs=(set.solids||['sphere','cube']).map((k,i,a)=>{const g=solid(k,{c:COL[i],s:.55,label:false});at(g,-1.4,.72,-2.55+i*(.5/(a.length-1||1)));g.userData.k=k;g2.add(g);return g;});
  return {play(){objs.forEach(g=>{const k=g.userData.k,rolls=['sphere','cyl','cone'].includes(k),slides=!['sphere'].includes(k);const x0=g.position.x,y0=g.position.y;tween(1.8,q=>{g.position.x=x0+q*2.6;g.position.y=y0-q*2.6*.18;if(rolls)g.rotation.z=-q*8;});});}};};

/* ---------- equal groups, sharing, arrays ---------- */
C.groups=function(g2,st,h,set){const n=set.g,k=set.n,item=set.item||'apple';const cols=Math.min(n,set.cols||(n>4?Math.ceil(n/2):n)),rows=Math.ceil(n/cols),sp=Math.min(1.3,4.4/cols),zs=rows>1?[-2.65,-1.6]:[-2.2];
  const plates=[];for(let i=0;i<n;i++){const x=(i%cols-(cols-1)/2)*sp,z=zs[Math.floor(i/cols)];const pl=cyl(Math.min(.46,sp*.38),Math.min(.42,sp*.35),.04,'#fff3d6',40,0);at(pl,x,.025,z);name(pl,'group','g'+i);g2.add(pl);plates.push([x,z]);
    const show=set.share?((st.shareDone||set.done)?k:0):k;for(let j=0;j<show;j++){const a=j/Math.max(1,k)*Math.PI*2,rr=k>1?Math.min(.3,sp*.25):0;const t=thing(item,k>6?.9:1.2);at(t,x+Math.cos(a)*rr,.05,z+Math.sin(a)*rr*.8);name(t,item);g2.add(t);}}
  if(set.share&&!(st.shareDone||set.done)){for(let j=0;j<n*k;j++){const t=thing(item,1.0);at(t,-2.0+(j%12)*.36,.05,-.95-Math.floor(j/12)*.3);name(t,item,'pile');g2.add(t);}}
  if(set.show!==false){const L=tag(set.label||(n+' groups of '+k),{size:.24,bg:'#fff3c4'});L.position.set(0,.85,-3.05);name(L,'sentence');g2.add(L);}
  return {play(){if(set.share&&!st.shareDone){const pile=g2.children.filter(o=>o.userData.part==='pile');pile.forEach((t,j)=>A.later(()=>{const [x,z]=plates[j%n];const r2=Math.min(.3,sp*.25),a=Math.floor(j/n)/k*Math.PI*2;P.hop(t,V(x+Math.cos(a)*r2,.05,z+Math.sin(a)*r2*.8),.5,.35);},j*170));A.later(()=>{st.shareDone=true;},pile.length*170+400);return;}
    plates.forEach((p,i)=>A.later(()=>{A.say(String((i+1)*k));burst(V(p[0],.6,p[1]-.0));},i*600));}};};
C.array=function(g2,st,h,set){const r=set.r,c=set.c,item=set.item||'apple',sp=Math.min(.55,3.8/c,2.0/r);for(let i=0;i<r;i++){for(let j=0;j<c;j++){const t=thing(item,1.1);at(t,(j-(c-1)/2)*sp,.0,-2.9+i*sp);name(t,item,'r'+i);g2.add(t);}
    const L=tag(String((i+1)*c),{size:.17});L.position.set((c/2)*sp+.25,.25,-2.9+i*sp);L.visible=!!set.counts;g2.add(L);}
  if(set.show!==false){const L=tag(set.label||(r+' rows of '+c),{size:.22,bg:'#fff3c4'});L.position.set(0,.85,-3.2);name(L,'sentence');g2.add(L);}return {};};

/* ---------- fractions ---------- */
C.frac=function(g2,st,h,set){const list=set.list||[{parts:set.parts,shade:set.shade,shape:set.shape}];const n=list.length,sp=Math.min(1.5,4.3/n);
  list.forEach((f,i)=>{const x=(i-(n-1)/2)*sp,z=-2.3,g=new THREE.Group();at(g,x,0,z);name(g,'whole','w'+i);g2.add(g);const col=f.c||set.c||'#ff8a5b';
    if((f.shape||'pie')==='pie'){const r=Math.min(.6,sp*.42);for(let k=0;k<f.parts;k++){const w=mk(new THREE.CylinderGeometry(r,r,.12,32,1,false,k/f.parts*Math.PI*2,Math.PI*2/f.parts),lam(k<f.shade?col:'#ffffff'),20);w.position.y=.06;name(w,k<f.shade?'shaded':'part',k<f.shade?'shaded':'part');g.add(w);}}
    else{const W=Math.min(1.3,sp*.9),wd=W/f.parts;for(let k=0;k<f.parts;k++){const b=box(wd*.96,.12,.55,k<f.shade?col:'#ffffff');at(b,-W/2+wd/2+k*wd,.06,0);name(b,k<f.shade?'shaded':'part',k<f.shade?'shaded':'part');g.add(b);}}
    if(set.labels!==false){const L=tag(f.label||(f.shade+'/'+f.parts),{size:.22,bg:'#ffffff'});L.position.set(0,.6,-.0);g.add(L);L.position.z=.75;L.position.y=.2;}});
  return {play(){g2.traverse(o=>{if(o.userData.part==='shaded'){const y0=o.position.y;tween(.6,q=>{o.position.y=y0+Math.sin(q*Math.PI)*.25;});}});}};};

/* ---------- jugs and capacity ---------- */
C.jugs=function(g2,st,h,set){const L=set.jugs,n=L.length,sp=Math.min(1.3,4.2/n);L.forEach((j,i)=>{const x=(i-(n-1)/2)*sp,r=j.r||.32,hh=j.h||.9;const g=new THREE.Group();at(g,x,0,-2.35);name(g,j.n||('jug'+i));g2.add(g);
    const glass=new THREE.Mesh(G('mk_jg'+r+hh,()=>new THREE.CylinderGeometry(r,r*.92,hh,32,1,true)),new THREE.MeshLambertMaterial({color:'#dff3ff',transparent:true,opacity:.35,side:THREE.DoubleSide,depthWrite:false}));glass.position.y=hh/2;g.add(glass);
    const base=cyl(r*.92,r*.92,.02,'#b3e5fc',32,0);base.position.y=.01;g.add(base);const f=Math.max(.001,j.fill==null?.7:j.fill);const w=cyl(r*.9,r*.86,hh*f,'#4fb3ff',32,0);w.position.y=hh*f/2;w.material=new THREE.MeshLambertMaterial({color:'#4fb3ff',transparent:true,opacity:.75});name(w,'water','water');g.add(w);
    if(j.label!==false){const t=tag(j.label||String.fromCharCode(65+i),{size:.2});t.position.set(0,hh+.25,0);g.add(t);}});return {};};

/* ---------- balance ---------- */
C.balance=function(g2,st,h,set){const tilt=set.tilt==null?0:set.tilt;const z=-2.25;const post=box(.12,.6,.12,'#8d6e63');at(post,0,.3,z);g2.add(post);const base=box(.7,.06,.5,'#8d6e63');at(base,0,.03,z);g2.add(base);
  const beam=new THREE.Group();at(beam,0,.64,z);g2.add(beam);const bar=box(3.2,.06,.1,'#a1887f');beam.add(bar);name(beam,'balance');
  const pans=[-1.45,1.45].map((x,s)=>{const p=new THREE.Group();p.position.set(x,0,0);beam.add(p);const pl=cyl(.4,.34,.05,s?'#cfe8ff':'#ffe0cc',32,0);pl.position.y=-.3;p.add(pl);[[-.3,0],[.3,0],[0,.3]].forEach(([a,b])=>{const t=tube(V(a*.9,-.28,b*.9),V(0,0,0),.008,'#7a8094');p.add(t);});[[-.3,0],[.3,0],[0,.3]].forEach(()=>{});name(p,s?'right':'left');return p;});
  [set.left||[],set.right||[]].forEach((list,s)=>{const nn=list.length,spp=Math.min(.3,.8/Math.max(1,nn));list.forEach((it,i)=>{const o=(K.TOYS&&K.TOYS[it])||(window.PICS||{})[it]?thing(it,nn>3?.9:1.3):num(it,{side:s?'#8fd3ff':'#ffd24a'});if(!((K.TOYS&&K.TOYS[it])||(window.PICS||{})[it]))o.scale.setScalar(.6);
    o.position.set((i-(nn-1)/2)*spp,-.28,0);pans[s].add(o);});});
  const setTilt=a=>{beam.rotation.z=a*.18;pans.forEach(p=>{p.rotation.z=-beam.rotation.z;});};setTilt(st.balDone||set.done?tilt:0);
  return {play(){tween(1.0,q=>setTilt(tilt*Math.sin(q*Math.PI/2))).then(()=>{st.balDone=true;});}};};

/* ---------- thermometer ---------- */
C.thermo=function(g2,st,h,set){const lo=set.min==null?-20:set.min,hi=set.max==null?40:set.max,T0=set.t;const z=-2.5,H=1.9,y0=.25,Y=t=>y0+(t-lo)/(hi-lo)*H;const ts=set.list||[T0];const n=ts.length,sp=n>1?1.6:0;
  ts.forEach((t,i)=>{const x=(i-(n-1)/2)*sp;const g=new THREE.Group();at(g,x,0,z);g2.add(g);name(g,'thermometer');const back=box(.5,H+.5,.06,'#ffffff');back.position.set(0,y0+H/2,-.06);g.add(back);
    const tb=new THREE.Mesh(G('mk_tt',()=>new THREE.CylinderGeometry(.05,.05,H,16)),new THREE.MeshLambertMaterial({color:'#eef2f7'}));tb.position.y=y0+H/2;g.add(tb);const bulb=sph(.11,'#e53935');bulb.position.y=y0-.05;g.add(bulb);
    const lq=cyl(.035,.035,1,'#e53935',12,0);const set2=v=>{const hh=Math.max(.01,Y(v)-y0);lq.scale.y=hh;lq.position.y=y0+hh/2;};set2(t);name(lq,'red line','liquid');g.add(lq);
    for(let v=lo;v<=hi;v+=(set.every||10)){const tk=box(.12,.012,.01,'#1b2236',0);tk.position.set(.12,Y(v),0);g.add(tk);const L=label(v+'°',{size:.13,color:'#1b2236'});L.position.set(.33,Y(v),.02);g.add(L);}
    const T=tag(t+'°C',{size:.22,bg:'#fff3c4'});T.position.set(0,y0+H+.45,0);name(T,'reading');g.add(T);g.userData.set2=set2;});
  return {};};

/* ---------- calendar ---------- */
C.calendar=function(g2,st,h,set){const days=set.days||30,start=set.start||0,c=.5,x0=-3*c,z0=-3.05;const D='SMTWTFS';for(let i=0;i<7;i++){const L=label(D[i],{size:.16,color:'#7a8094'});L.position.set(x0+i*c,.08,z0-.02);g2.add(L);}
  const mark=set.mark||{};for(let d=1;d<=days;d++){const k=start+d-1,col=k%7,row=Math.floor(k/7);const mc=mark[d];const t=mk(G('mk_day',()=>new THREE.BoxGeometry(c*.92,.05,c*.36)),lam(mc||'#ffffff'),20);at(t,x0+col*c,.025,z0+.3+row*c*.42);name(t,'day '+d,'d'+d);g2.add(t);
    const L=label(String(d),{size:.14,color:'#1b2236'});L.position.set(x0+col*c,.08,z0+.3+row*c*.42);g2.add(L);}
  if(set.month){const T=tag(set.month,{size:.24,bg:'#fff3c4'});T.position.set(0,.55,z0-.35);g2.add(T);}return {};};

/* ---------- hundreds chart ---------- */
C.chart=function(g2,st,h,set){const lo=set.from||1,c=.27,x0=-4.5*c,z0=-3.15;const hi=set.hi||{};const cv=document.createElement('canvas');const cw=100;cv.width=cv.height=cw*10;const g=cv.getContext('2d');
  for(let i=0;i<100;i++){const n=lo+i,x=(i%10)*cw,y=Math.floor(i/10)*cw;g.fillStyle=hi[n]||'#ffffff';g.fillRect(x+2,y+2,cw-4,cw-4);if((set.blank||[]).includes(n)){g.fillStyle='#fff3c4';g.fillRect(x+2,y+2,cw-4,cw-4);g.fillStyle='#c27c00';g.font='700 46px sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText('?',x+cw/2,y+cw/2);continue;}
    g.fillStyle='#1b2236';g.font='700 42px "Zilla Slab", Georgia, serif';g.textAlign='center';g.textBaseline='middle';g.fillText(String(n),x+cw/2,y+cw/2+3);}
  const t=new THREE.CanvasTexture(cv);t.anisotropy=4;const side=lam('#e2e8f0');const b=mk(new THREE.BoxGeometry(10*c,.05,10*c),[side,side,new THREE.MeshLambertMaterial({map:t}),side,side,side],20);at(b,0,.025,z0+4.5*c);name(b,'hundreds chart');g2.add(b);
  Object.keys(hi).forEach(k=>{const i=+k-lo;if(i<0||i>99)return;const m=mk(G('mk_hit',()=>new THREE.BoxGeometry(c*.9,.02,c*.9)),new THREE.MeshBasicMaterial({transparent:true,opacity:0,depthWrite:false}),0);at(m,x0+(i%10)*c,.06,z0+Math.floor(i/10)*c);name(m,'lit','n'+k);g2.add(m);});return {};};

/* ---------- bar graph (blocks) ---------- */
C.bars=function(g2,st,h,set){const n=set.cats.length,sp=Math.min(.95,4.2/n),u=set.u||Math.min(.22,1.9/Math.max(...set.v));set.cats.forEach((c,i)=>{const x=(i-(n-1)/2)*sp;for(let k=0;k<set.v[i];k++){const b=unitBox(1,1,1,COL[i%COL.length],u);at(b,x,u/2+k*u,-2.6);name(b,c,'bar'+i);g2.add(b);}
    const s=K2.standee(c,{label:set.labels?set.labels[i]:c,col:COL[i%COL.length],s:.55});at(s,x,0,-1.75);g2.add(s);const L=tag(String(set.v[i]),{size:.18});L.position.set(x,set.v[i]*u+.2,-2.6);g2.add(L);});
  if(set.title){const T=tag(set.title,{size:.22,bg:'#fff3c4'});T.position.set(0,Math.max(...set.v)*u+.6,-2.9);name(T,'title');g2.add(T);}return {};};
/* pictograph: rows of little symbols */
C.pict=function(g2,st,h,set){const n=set.cats.length,dz=Math.min(.55,2.2/n);set.cats.forEach((c,i)=>{const z=-2.95+i*dz;const s=K2.standee(c,{label:set.labels?set.labels[i]:c,col:COL[i%COL.length],s:.4});at(s,-1.95,0,z);g2.add(s);
    for(let k=0;k<set.v[i];k++){const t=thing(set.item||'star',.8);at(t,-1.3+k*.33,.0,z);name(t,c,'p'+i);g2.add(t);}});
  if(set.key){const L=tag(set.key,{size:.18,bg:'#ffffff'});L.position.set(1.5,.5,-.95);g2.add(L);}if(set.title){const T=tag(set.title,{size:.22,bg:'#fff3c4'});T.position.set(.3,.75,-3.25);g2.add(T);}return {};};
/* tally marks */
C.tally=function(g2,st,h,set){const n=set.cats.length,dz=Math.min(.6,2.2/n);set.cats.forEach((c,i)=>{const z=-2.9+i*dz;const s=K2.standee(c,{label:set.labels?set.labels[i]:c,col:COL[i%COL.length],s:.4});at(s,-1.9,0,z);g2.add(s);
    for(let k=0;k<set.v[i];k++){const grp=Math.floor(k/5),j=k%5;const x=-1.2+grp*.62+j*.1;if(j<4){const t=box(.03,.03,.32,'#1b2236',0);at(t,x,.02,z);name(t,c,'t'+i);g2.add(t);}else{const t=box(.03,.03,.5,'#e4572e',0);t.rotation.y=1.0;at(t,x-.25,.03,z);name(t,c,'t'+i);g2.add(t);}}});return {};};

/* ---------- spinner ---------- */
C.spinner=function(g2,st,h,set){const secs=set.sectors,n=secs.length,r=.85;const g=new THREE.Group();at(g,0,0,-2.25);g2.add(g);name(g,'spinner');
  secs.forEach((col,k)=>{const w=mk(new THREE.CylinderGeometry(r,r,.08,48,1,false,k/n*Math.PI*2,Math.PI*2/n),lam(col),20);w.position.y=.04;name(w,set.names?set.names[k]:col);g.add(w);});
  const ar=new THREE.Group();ar.position.y=.12;g.add(ar);const a=box(.06,.03,.75,'#1b2236',0);a.position.z=-.3;ar.add(a);const tip=mk(G('mk_tip',()=>new THREE.ConeGeometry(.08,.18,8)),lam('#1b2236'),0);tip.rotation.x=-Math.PI/2;tip.position.z=-.7;ar.add(tip);name(ar,'arrow');
  return {play(){const r0=ar.rotation.y,to=r0-(Math.PI*6+Math.random()*Math.PI*2);tween(2.2,q=>{ar.rotation.y=r0+(to-r0)*(1-Math.pow(1-q,3));});},controls:()=>st.round?[]:[{t:'Spin!',go:true,fn:()=>{const r0=ar.rotation.y,to=r0-(Math.PI*6+Math.random()*Math.PI*2);tween(2.2,q=>{ar.rotation.y=r0+(to-r0)*(1-Math.pow(1-q,3));});}}]};};

/* ---------- number tiles in a row (patterns, ordering) ---------- */
C.tiles=function(g2,st,h,set){const L=set.nums,n=L.length,sp=Math.min(.9,4.3/n);L.forEach((t,i)=>{const b=t==='_'?(()=>{const g=new THREE.Group();const q=tag('?',{size:.32,color:'#c27c00'});q.position.y=.3;g.add(q);return g;})():num(String(t),{side:(set.hl||[]).includes(i)?'#5fd38a':'#ffd24a'});
    b.scale.setScalar(Math.min(1,sp/.9));at(b,(i-(n-1)/2)*sp,0,-2.3);b.userData.part='t'+i;g2.add(b);});
  if(set.rule){const R=tag(set.rule,{size:.22,bg:'#e8f8ee',border:'#16a36f'});R.position.set(0,.8,-2.9);name(R,'rule');g2.add(R);}return {};};
})();
