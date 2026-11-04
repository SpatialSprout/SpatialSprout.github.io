/* The Interactive Classroom — extra models for Grade 4: a coordinate grid (plot, slide and flip points),
   an angle maker, a stem-and-leaf plot, a probability line, a decimal number line, meshing gears,
   a lever, a pulley and light rays that bounce off a mirror.
   Load after math-kit3.js. A lesson asks for one with set.custom = 'coord' | 'angle' | 'stem' | 'pline' | 'dline' | 'gears' | 'lever' | 'pulley' | 'rays'. */
(function(){
"use strict";
const P=window.PM;if(!P||P.failed||!P.K2||!P.K2.CUSTOM)return;
const {THREE,V,G,mk,lam,label,A,tween}=P;const K2=P.K2,C=K2.CUSTOM;
const COL=['#ff8a5b','#4fb3ff','#5cc46a','#ffb347','#b07cff','#ff6b9a','#26a69a','#f2c12e'];
const box=(w,h,d,c,th)=>mk(G('m4_b'+w+'_'+h+'_'+d,()=>new THREE.BoxGeometry(w,h,d)),lam(c),th===0?0:20);
const cyl=(a,b,h,c,n)=>mk(G('m4_c'+a+'_'+b+'_'+h+'_'+(n||32),()=>new THREE.CylinderGeometry(a,b,h,n||32)),lam(c),0);
const sph=(r,c)=>mk(G('m4_s'+r,()=>new THREE.SphereGeometry(r,18,12)),lam(c),0);
const at=(o,x,y,z)=>{o.position.set(x,y,z);return o;};
const tag=(t,o)=>label(String(t),Object.assign({size:.22,bg:'#ffffff',border:'#1b2236'},o||{}));
const name=(o,n,part)=>{o.userData.name=n;if(part!=null)o.userData.part=String(part);return o;};
const flat=o=>{o.rotation.x=-Math.PI/2.6;return o;};
function tube(a,b,r,c){const d=b.clone().sub(a);const m=cyl(r,r,1,c,8);m.scale.y=d.length();m.position.copy(a).add(b).multiplyScalar(.5);m.quaternion.setFromUnitVectors(V(0,1,0),d.normalize());return m;}
const slide=(o,x,y,z,d)=>{const p0=o.position.clone();return tween(d||.6,k=>{o.position.set(p0.x+(x-p0.x)*k,p0.y+(y-p0.y)*k+Math.sin(k*Math.PI)*.15,p0.z+(z-p0.z)*k);});};
const fmt=n=>{const r=Math.round(n*10)/10;return Number.isInteger(r)?String(r):r.toFixed(1);};

/* ---------- coordinate grid (first quadrant): plot points, translate and reflect ---------- */
C.coord=function(g2,st,h,set){const N=set.size||8,c=Math.min(.36,2.5/N),x0=-N*c/2-.2,z0=-1.15;const X=i=>x0+i*c,Z=j=>z0-j*c;
  const pl=box(N*c+.1,.02,N*c+.1,'#ffffff',0);at(pl,x0+N*c/2,.005,z0-N*c/2);g2.add(pl);
  for(let i=0;i<=N;i++){const v=box(.012,.012,N*c,i?'#c5cbe0':'#1b2236',0);at(v,X(i),.02,z0-N*c/2);g2.add(v);const hz=box(N*c,.012,.012,i?'#c5cbe0':'#1b2236',0);at(hz,x0+N*c/2,.02,Z(i));g2.add(hz);
    if(i%(N>10?2:1)===0){const a=label(String(i),{size:.13,color:'#1b2236'});a.position.set(X(i),.05,z0+.16);g2.add(a);const b=label(String(i),{size:.13,color:'#1b2236'});b.position.set(x0-.15,.05,Z(i));g2.add(b);}}
  const ax=label('x',{size:.15,color:'#e4572e'});ax.position.set(X(N)+.18,.05,z0+.02);g2.add(ax);const ay=label('y',{size:.15,color:'#e4572e'});ay.position.set(x0,.05,Z(N)-.15);g2.add(ay);
  if(set.mirror!=null){const m=box(.03,.05,N*c,'#b07cff',0);m.material=P.glow?P.glow('#b07cff',.8,.4):m.material;at(m,X(set.mirror),.04,z0-N*c/2);name(m,'mirror line','mirror');g2.add(m);}
  const pts=(set.pts||[]).map(([x,y,t],i)=>{const d=sph(.08,COL[i%COL.length]);at(d,X(x),.1,Z(y));name(d,t||'point',t||'p'+i);g2.add(d);if(t){const L=tag(set.hide?t:t+' ('+x+', '+y+')',{size:.14});L.position.set(0,.22,0);d.add(L);}return d;});
  const shape=set.shape;let sg=null;if(shape){sg=new THREE.Group();shape.forEach(([x,y])=>{const t=box(c*.9,.06,c*.9,set.col||'#4fb3ff');at(t,X(x)+c/2,.04,Z(y)-c/2);sg.add(t);});name(sg,'shape');g2.add(sg);}
  const side=set.info?(()=>{const L=tag(set.info,{size:.2,bg:'#fff3c4'});L.position.set(1.55,.5,-2.6);name(L,'info');g2.add(L);return L;})():null;
  const play=()=>{const mv=set.move;if(mv&&pts[0]){const [dx,dy]=mv;const p=pts[0];const sx=(p.position.x-x0)/c,sy=(z0-p.position.z)/c;
      const path=[];for(let k=1;k<=Math.abs(dx);k++)path.push([sx+Math.sign(dx)*k,sy]);for(let k=1;k<=Math.abs(dy);k++)path.push([sx+dx,sy+Math.sign(dy)*k]);
      let q=Promise.resolve();path.forEach(([a,b])=>{q=q.then(()=>slide(p,X(a),.1,Z(b),.28));});q.then(()=>{A.later(()=>slide(p,X(sx),.1,Z(sy),.5),1600);});}
    if(sg&&set.slide){const [dx,dy]=set.slide;const p0=sg.position.clone();slide(sg,p0.x+dx*c,0,p0.z-dy*c,.9).then(()=>A.later(()=>slide(sg,p0.x,0,p0.z,.6),1500));}
    if(sg&&set.mirror!=null){const ghost=sg.clone();ghost.traverse(o=>{if(o.isMesh){o.material=P.glow?P.glow('#b07cff',.75,.3):o.material;}});g2.add(ghost);const mx=X(set.mirror);ghost.scale.x=-1;ghost.position.x=2*mx-2*(0)-0;ghost.position.x=2*mx;ghost.visible=false;A.later(()=>{ghost.visible=true;const y0=ghost.position.y;tween(.4,k=>{ghost.position.y=y0+Math.sin(k*Math.PI)*.2;});},300);}
    if(!mv&&!set.slide&&set.mirror==null)pts.forEach((p,i)=>A.later(()=>{const y0=p.position.y;tween(.4,k=>{p.position.y=y0+Math.sin(k*Math.PI)*.3;});},i*250));};
  return {play,controls:()=>st.round?[]:[{t:set.move||set.slide?'Slide it!':set.mirror!=null?'Flip it!':'Show the points',go:true,fn:play}]};};

/* ---------- angle maker: two arms and an arc; names the angle ---------- */
const kindOf=d=>d===90?'right':d===180?'straight':d<90?'acute':'obtuse';
C.angle=function(g2,st,h,set){const list=set.list||[set.deg];const n=list.length,sp=Math.min(1.5,4.2/n);const arms=[];
  list.forEach((deg,i)=>{const g=new THREE.Group();at(g,(i-(n-1)/2)*sp-(n===1?.3:0),0,-1.9);g2.add(g);const L=n===1?1.2:Math.min(.75,sp*.42);
    const base=box(L,.04,.05,'#1b2236',0);at(base,L/2,.04,0);g.add(base);const pv=sph(.06,'#e4572e');at(pv,0,.05,0);g.add(pv);
    const arm=new THREE.Group();arm.position.y=.06;const a=box(L,.04,.05,'#2f7de1',0);a.position.x=L/2;arm.add(a);g.add(arm);name(arm,'arm','arm');
    const arcG=new THREE.Group();arcG.position.y=.05;g.add(arcG);
    const lab=tag(set.labels===false?'?':(deg+'° '+kindOf(deg)),{size:n===1?.24:.16,bg:'#fff3c4'});lab.position.set(L*.45,.55,-.35);name(lab,kindOf(deg),'type');g.add(lab);
    if(deg===90){const sq=box(.16,.01,.16,'#e4572e',0);at(sq,.08,.06,-.08);g.add(sq);}
    const setDeg=d=>{arm.rotation.y=d*Math.PI/180;while(arcG.children.length)arcG.remove(arcG.children[0]);if(d>1&&deg!==90){const t=mk(new THREE.TorusGeometry(.28,.015,6,24,d*Math.PI/180),lam('#e4572e'),0);t.rotation.x=-Math.PI/2;arcG.add(t);}};
    setDeg(st.round?deg:deg);arms.push([setDeg,deg]);});
  const play=()=>arms.forEach(([f,d],i)=>A.later(()=>tween(1.0,k=>f(d*k)),i*300));
  return {play,controls:()=>st.round?[]:[{t:'Open the angle',go:true,fn:play}]};};

/* ---------- stem-and-leaf plot ---------- */
C.stem=function(g2,st,h,set){const data=(set.data||[]).slice().sort((a,b)=>a-b);const stems={};data.forEach(v=>{const s=Math.floor(v/10);(stems[s]=stems[s]||[]).push(v%10);});
  const keys=Object.keys(stems).map(Number);const lo=Math.min(...keys),hi=Math.max(...keys);const rows=hi-lo+1,dz=Math.min(.42,2.1/rows);const z0=-3.0;const leaves=[];
  const hd=tag('Stem | Leaf',{size:.17,bg:'#e8f8ee',border:'#16a36f'});flat(hd);hd.position.set(-1.3,.06,z0-.35);g2.add(hd);
  const bar=box(.04,.03,rows*dz,'#1b2236',0);at(bar,-1.15,.02,z0+rows*dz/2-dz/2);g2.add(bar);
  for(let s=lo;s<=hi;s++){const z=z0+(s-lo)*dz;const S=tag(s,{size:.2,bg:'#fff3c4'});flat(S);S.position.set(-1.45,.06,z);name(S,'stem','s'+s);g2.add(S);
    (stems[s]||[]).forEach((l,i)=>{const L=tag(l,{size:.2});flat(L);L.position.set(-.85+i*.3,.06,z);name(L,'leaf','l'+s);g2.add(L);leaves.push(L);});}
  if(set.title){const T=tag(set.title,{size:.2,bg:'#fff3c4'});T.position.set(.9,.7,-3.3);name(T,'title');g2.add(T);}
  const key=tag('Key: '+(lo)+' | '+(data.length?data[0]%10:0)+' = '+(lo*10+(data.length?data[0]%10:0)),{size:.15});flat(key);key.position.set(1.2,.06,-1.25);name(key,'key');g2.add(key);
  return {play(){leaves.forEach((o,i)=>A.later(()=>{const y0=o.position.y;tween(.35,k=>{o.position.y=y0+Math.sin(k*Math.PI)*.2;});},i*140));}};};

/* ---------- probability line: impossible … certain ---------- */
const PW=['impossible','unlikely','equally likely','likely','certain'];
C.pline=function(g2,st,h,set){const z=-2.0,L0=-2.0,L1=2.0,X=p=>L0+p*(L1-L0);
  const bar=box(4.1,.06,.12,'#1b2236',0);at(bar,0,.03,z);g2.add(bar);
  const grad=['#e4572e','#ff8a5b','#f2c12e','#8bd36b','#16a36f'];
  PW.forEach((w,i)=>{const p=i/4;const t=box(.03,.03,.3,'#1b2236',0);at(t,X(p),.05,z);g2.add(t);const L=tag(w,{size:.14,bg:grad[i],color:'#ffffff',border:grad[i]});L.position.set(X(p),.12,z+.42+(i%2)*.25);flat(L);name(L,w,'w'+i);g2.add(L);
    const f=label(['0','',' 1/2','','1'][i],{size:.13,color:'#7a8094'});f.position.set(X(p),.08,z-.25);g2.add(f);});
  const evs=set.events||[[set.p==null?.5:set.p,set.item||'spinner',set.label]];const marks=evs.map(([p,item,lab],i)=>{const g=new THREE.Group();const pin=cyl(.015,.015,.6,'#1b2236',6);pin.position.y=.3;g.add(pin);
      const thing=P.STAGE&&P.PROP3&&P.PROP3[item]?P.STAGE.prop(item,{s:.5,label:false,bare:true,tap:false}):K2.standee(item||'star',{label:false,s:.4});thing.position.y=.62;g.add(thing);
      if(lab){const T=tag(lab,{size:.14,bg:'#ffffff'});T.position.set(0,1.15,0);g.add(T);}at(g,X(p),0,z-.55-(i%2)*.55);name(g,'marker','m'+i);g2.add(g);g.userData.p=p;return g;});
  return {play(){marks.forEach((m,i)=>{const p=m.userData.p;m.position.x=X(0);A.later(()=>tween(1.0,k=>{m.position.x=X(p*k);}),i*350);});}};};

/* ---------- decimal number line with hops (tenths) ---------- */
C.dline=function(g2,st,h,set){const lo=set.min||0,hi=set.max==null?lo+1:set.max,step=set.step||.1;const L0=-2.1,L1=2.1,X=n=>L0+(n-lo)/(hi-lo)*(L1-L0),z=-2.0;
  const bar=box(4.4,.05,.07,'#1b2236',0);at(bar,0,.03,z);g2.add(bar);const N=Math.round((hi-lo)/step);
  for(let k=0;k<=N;k++){const n=lo+k*step;const whole=Math.abs(n-Math.round(n))<1e-6;const t=box(.025,.02,whole?.28:.15,'#1b2236',0);at(t,X(n),.05,z);g2.add(t);
    if(whole||N<=12){const L=label(fmt(n),{size:whole?.19:.14,color:whole?'#1b2236':'#5b6478'});L.position.set(X(n),.12,z+.32);g2.add(L);}}
  (set.mark||[]).forEach((n,i)=>{const d=sph(.08,'#e4572e');at(d,X(n),.1,z);name(d,'mark','m'+i);g2.add(d);const L=tag(fmt(n),{size:.16,bg:'#fdecea',border:'#e4572e'});L.position.set(0,.3,0);d.add(L);});
  const hops=set.hops||[];const fr=K2.standee(set.who||'frog',{label:false,s:.5});const start=hops.length?hops[0][0]:lo;at(fr,X(start),.05,z-.12);name(fr,'frog');g2.add(fr);
  const play=()=>{fr.position.x=X(start);let q=Promise.resolve();hops.forEach(([a,b])=>{q=q.then(()=>P.hop(fr,V(X(b),.05,z-.12),.4,.5));});};
  return {play,controls:()=>st.round||!hops.length?[]:[{t:'Hop!',go:true,fn:play}]};};

/* ---------- gears: a driver turns a follower the other way; big vs small ---------- */
function gearMesh(r,teeth,c){const g=new THREE.Group();const d=cyl(r,r,.1,c,32);g.add(d);for(let i=0;i<teeth;i++){const a=i/teeth*Math.PI*2;const t=box(.09,.1,.1,c);t.position.set(Math.cos(a)*(r+.04),0,Math.sin(a)*(r+.04));t.rotation.y=-a;g.add(t);}
  const hub=cyl(.06,.06,.14,'#495057',12);g.add(hub);const mk2=box(r*.8,.11,.05,'#ffffff',0);mk2.position.x=r*.45;g.add(mk2);return g;}
C.gears=function(g2,st,h,set){const sz=set.sizes||[[.55,16],[.3,9]];const gs=[];let x=-1.2;sz.forEach(([r,n],i)=>{if(i)x+=sz[i-1][0]+r+.09;const g=gearMesh(r,n,COL[(i*2+1)%COL.length]);const holder=new THREE.Group();holder.add(g);holder.rotation.x=-Math.PI/2.3;at(holder,x,r+.15,-2.4);name(holder,i?'follower':'driver','g'+i);g2.add(holder);
    const st2=cyl(.03,.03,r+.15,'#868e96',6);at(st2,x,(r+.15)/2,-2.45);g2.add(st2);const L=tag((i?'follower':'driver')+' · '+n+' teeth',{size:.15});L.position.set(x,2*r+.45,-2.4);g2.add(L);gs.push([g,r,n]);});
  let spin=st.round?0:(set.spin==null?.6:set.spin);
  return {tick:(dt)=>{let w=spin;gs.forEach(([g,r,n],i)=>{if(i)w=-w*gs[i-1][2]/n;g.rotation.y+=w*dt;});},play(){spin=spin?0:.9;},controls:()=>st.round?[]:[{t:'Turn the crank',go:true,fn:()=>{spin=spin?0:.9;}}]};};

/* ---------- lever: effort, load and fulcrum ---------- */
C.lever=function(g2,st,h,set){const f=set.fulcrum==null?0:set.fulcrum;const z=-2.2;const fu=mk(G('m4_tri',()=>new THREE.ConeGeometry(.2,.35,3)),lam('#868e96'),20);at(fu,f,.17,z);name(fu,'fulcrum');g2.add(fu);
  const beam=new THREE.Group();at(beam,f,.36,z);g2.add(beam);const b=box(3.6,.06,.24,'#c9a26b');b.position.x=-f;beam.add(b);
  const load=set.load||'rock';const L=P.STAGE&&P.PROP3&&P.PROP3[load]?P.STAGE.prop(load,{s:.8,label:false,bare:true,tap:false}):K2.standee(load,{label:false,s:.6});L.position.set(-1.6-f,.04,0);name(L,'load');beam.add(L);
  const hand=K2.standee(set.who||'girl',{label:false,s:.55});hand.position.set(1.6-f,.04,0);name(hand,'effort');beam.add(hand);
  [['load',-1.6],['fulcrum',f],['effort',1.6]].forEach(([t,x])=>{const T=tag(t,{size:.16,bg:t==='fulcrum'?'#e9ecef':t==='load'?'#fdecea':'#e8f8ee'});T.position.set(x,.08,z+.55);flat(T);name(T,t);g2.add(T);});
  const tilt=-.18;beam.rotation.z=-tilt;
  const play=()=>{tween(.8,k=>{beam.rotation.z=-tilt+2*tilt*Math.sin(k*Math.PI/2);}).then(()=>A.later(()=>tween(.8,k=>{beam.rotation.z=tilt-2*tilt*Math.sin(k*Math.PI/2);}),900));};
  return {play,controls:()=>st.round?[]:[{t:'Push down!',go:true,fn:play}]};};

/* ---------- pulley: pull the rope, the load goes up ---------- */
C.pulley=function(g2,st,h,set){const z=-2.4,n=set.wheels||1;const top=box(2.6,.08,.1,'#8b5a2b');at(top,0,2.0,z);g2.add(top);[-1.25,1.25].forEach(x=>{const p=box(.08,2.0,.1,'#8b5a2b');at(p,x,1.0,z);g2.add(p);});
  const wh=[];for(let i=0;i<n;i++){const w=cyl(.22,.22,.08,'#fab005',24);w.rotation.x=Math.PI/2;at(w,-.25+i*.5,1.75-(i%2)*.0,z);name(w,'wheel','w');g2.add(w);wh.push(w);}
  const load=P.STAGE&&P.PROP3&&P.PROP3[set.load||'bucket']?P.STAGE.prop(set.load||'bucket',{s:.7,label:false,bare:true,tap:false}):K2.standee('bucket',{label:false,s:.5});at(load,-.47,.02,z);name(load,'load');g2.add(load);
  const r1=box(.02,1.0,.02,'#5c3d2e',0);g2.add(r1);const r2=box(.02,1.0,.02,'#5c3d2e',0);g2.add(r2);const kid=K2.standee(set.who||'boy',{label:false,s:.55});at(kid,.6,0,z+.35);name(kid,'effort');g2.add(kid);
  let y=0;const draw=()=>{load.position.y=.02+y;const t=1.75,ly=.5+y;r1.scale.y=(t-ly);r1.position.set(-.47,(t+ly)/2,z);const ky=.6-y*.4;r2.scale.y=(t-ky);r2.position.set(-.03+(n-1)*.5+.0,(t+ky)/2,z);};draw();
  const play=()=>tween(1.4,k=>{y=Math.sin(k*Math.PI/2)*.9;wh.forEach(w=>w.rotation.y=k*6);draw();}).then(()=>A.later(()=>tween(1.0,k=>{y=.9*(1-k);draw();}),1200));
  if(set.label){const T=tag(set.label,{size:.18,bg:'#fff3c4'});T.position.set(1.4,1.3,z);g2.add(T);}
  return {play,controls:()=>st.round?[]:[{t:'Pull the rope!',go:true,fn:play}]};};

/* ---------- light rays: a torch, a mirror (or glass / wood) and what the light does ---------- */
C.rays=function(g2,st,h,set){const mode=set.mode||'reflect';const z=-2.2;
  const torch=P.STAGE&&P.PROP3&&P.PROP3.flashlight?P.STAGE.prop('flashlight',{s:.5,label:false,bare:true,tap:false}):K2.standee('flashlight',{label:false,s:.5});at(torch,-1.9,.1,z+.6);torch.rotation.y=.4;g2.add(torch);
  const hit=V(0,.25,z-.4);const a=V(-1.6,.25,z+.45);const mat={reflect:'#a5d8ff',refract:'#d0ebff',absorb:'#5c3d2e'}[mode];
  const sc=mode==='refract'?box(.9,.5,.5,mat):box(1.2,.6,.06,mat);if(mode==='refract'){sc.material=P.glow?P.glow('#a5d8ff',.45,.3):sc.material;at(sc,.1,.25,z-.4);}else{at(sc,0,.3,z-.75);}name(sc,mode==='reflect'?'mirror':mode==='refract'?'glass':'wood');g2.add(sc);
  const outs={reflect:[V(1.6,.25,z+.45)],refract:[V(.55,.25,z-.25),V(1.8,.25,z-.15)],absorb:[]}[mode];const rays=[];let prev=a;
  [hit].concat(outs).forEach((b,i)=>{const r=tube(prev,b,.025,'#ffd43b');r.material=P.glow?P.glow('#ffd43b',1,.9):r.material;r.visible=false;g2.add(r);rays.push(r);prev=b;});
  const T=tag(set.label||({reflect:'reflected: it bounces',refract:'refracted: it bends',absorb:'absorbed: it is taken in'}[mode]),{size:.2,bg:'#fff3c4'});T.position.set(.8,1.0,z-.9);name(T,mode);g2.add(T);
  const play=()=>{rays.forEach(r=>r.visible=false);rays.forEach((r,i)=>A.later(()=>{r.visible=true;},i*450));};A.later(play,300);
  return {play,controls:()=>st.round?[]:[{t:'Shine the light!',go:true,fn:play}]};};
/* ---------- place-value mat to 10 000: thousands cubes, hundreds flats, tens rods, ones cubes ---------- */
C.pv=function(g2,st,h,set){const n=set.n||0;const ds=String(n).padStart(4,'0').slice(-4).split('').map(Number);const heads=['thousands','hundreds','tens','ones'],cols=['#b07cff','#4fb3ff','#5cc46a','#ff8a5b'];const items=[];
  heads.forEach((hd,i)=>{const x=-1.62+i*1.08;const mat=box(1.0,.02,2.0,['#f3ecff','#e7f5ff','#ebfbee','#fff4e6'][i],0);at(mat,x,.01,-2.35);g2.add(mat);
    const H=tag(hd,{size:.16,bg:cols[i],color:'#ffffff',border:cols[i]});flat(H);H.position.set(x,.05,-3.45);g2.add(H);
    const D=tag(set.hide?'?':ds[i],{size:.34,bg:'#ffffff',border:cols[i]});D.position.set(x,.5,-1.1);name(D,hd,'d'+i);g2.add(D);
    for(let k=0;k<ds[i];k++){let o;const u=.055;
      if(i===0){o=box(.3,.3,.3,cols[0]);at(o,x-.25+(k%3)*.25,.15+Math.floor(k/9)*.3,-3.0+Math.floor((k%9)/3)*.42);}
      else if(i===1){o=box(.38,.035,.38,cols[1]);at(o,x,.02+k*.045,-2.5);}
      else if(i===2){o=box(.05,.05,.5,cols[2]);at(o,x-.36+k*.09,.03,-2.5);}
      else{o=box(.07,.07,.07,cols[3]);at(o,x-.3+(k%3)*.16,.04,-2.9+Math.floor(k/3)*.18);}
      name(o,hd,'b');g2.add(o);items.push(o);}});
  if(set.label!==false&&!set.hide){const T=tag(set.label||(n.toLocaleString('en-CA')),{size:.26,bg:'#fff3c4'});T.position.set(0,1.0,-1.6);name(T,'number');g2.add(T);}
  return {play(){items.forEach((o,i)=>A.later(()=>{const y0=o.position.y;tween(.3,k=>{o.position.y=y0+Math.sin(k*Math.PI)*.2;});},i*90));}};};
/* ---------- multiple-bar graph: two (or more) series side by side, with a scale and a legend ---------- */
C.bars2=function(g2,st,h,set){const cats=set.cats,ser=set.series,n=cats.length,k=ser.length,sp=Math.min(1.2,3.8/n),bw=Math.min(.32,sp*.8/k);const mx=Math.max(...ser.map(s=>Math.max(...s.v)));const H=1.15,u=H/mx;const SC=['#4fb3ff','#ff8a5b','#5cc46a','#b07cff'];const bars=[];
  const axis=box(.03,H+.2,.03,'#1b2236',0);at(axis,-sp*n/2-.15+.0,(H+.2)/2,-2.75);g2.add(axis);const step=set.step||Math.max(1,Math.ceil(mx/5));
  for(let v=0;v<=mx;v+=step){const L=label(String(v),{size:.12,color:'#5b6478'});L.position.set(-sp*n/2-.35,v*u+.02,-2.75);g2.add(L);const gl=box(sp*n+.1,.008,.008,'#d0d5e4',0);at(gl,0,v*u+.01,-2.8);g2.add(gl);}
  cats.forEach((c,i)=>{const x=(i-(n-1)/2)*sp;ser.forEach((s,j)=>{const v=s.v[i];const b=box(bw*.9,1,bw*.9,SC[j%4]);b.scale.y=Math.max(.001,v*u);at(b,x+(j-(k-1)/2)*bw,v*u/2,-2.6);name(b,s.name,'s'+j);g2.add(b);bars.push([b,v*u]);
      const L=tag(String(v),{size:.13});L.position.set(x+(j-(k-1)/2)*bw,v*u+.15,-2.6);g2.add(L);});
    const C2=tag(c,{size:.15});flat(C2);C2.position.set(x,.05,-2.05);name(C2,c);g2.add(C2);});
  ser.forEach((s,j)=>{const sw=box(.16,.05,.16,SC[j%4]);at(sw,1.1,.03,-1.55+j*.32-(k-1)*.16);g2.add(sw);const L=tag(s.name,{size:.15});flat(L);L.position.set(1.55,.05,-1.55+j*.32-(k-1)*.16);name(L,'legend');g2.add(L);});
  if(set.title){const T=tag(set.title,{size:.2,bg:'#fff3c4'});T.position.set(0,H+.55,-2.9);name(T,'title');g2.add(T);}
  if(set.source){const S2=tag('Source: '+set.source,{size:.13});flat(S2);S2.position.set(-1.0,.05,-1.4);name(S2,'source');g2.add(S2);}
  return {play(){bars.forEach(([b,hh],i)=>{A.later(()=>tween(.6,q=>{b.scale.y=Math.max(.001,hh*q);b.position.y=hh*q/2;}),i*120);});}};};
})();
