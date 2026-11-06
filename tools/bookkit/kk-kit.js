/* The Interactive Classroom — Kindergarten games, part 2. Big glossy 3D letters and numbers that pop up beside a friend
   ("A is for apple"), dot-to-dot tracing on the letter itself, rising bubbles to pop, a stepping-stone path, a spider's web,
   a fishing pond, a sandbox dig, flip-card memory, a lily-pad number line and a ladybug that wants spots.
   Load after pk-kit.js. set.custom = 'hello' | 'trace' | 'bubbles' | 'path' | 'web' | 'fish' | 'dig' | 'memory' | 'frog' | 'spots'. */
(function(){
"use strict";
const P=window.PM;if(!P||P.failed||!P.K2||!P.PKX)return;
const {THREE,V,G,mk,lam,A,tween}=P;const C=P.K2.CUSTOM;const X=P.PKX;const {make,txt3,jump,wobble,boom,sticker,SAY,mat,tag,WORDS,COL,at}=X;
const isPlay=h=>h.isPlay?h.isPlay():false;
const pop=(o,d,s1)=>{const s=s1||o.scale.x||1;o.scale.setScalar(.001);return tween(d||.5,k=>{const f=k<.6?k/.6*1.18:1.18-(k-.6)/.4*.18;o.scale.setScalar(Math.max(.001,s*f));});};
const rise=(o,d)=>{const y=o.position.y;o.position.y=y-1.2;return tween(d||.6,k=>{const e=1-Math.pow(1-k,3);o.position.y=y-1.2*(1-e)+Math.sin(k*Math.PI)*.15;});};
const pedestal=(g2,x,z,c,r)=>{const p=mk(G('kk_ped'+(r||.5),()=>new THREE.CylinderGeometry(r||.5,(r||.5)*1.08,.12,36)),lam(c||'#ffffff'),20);at(p,x,.06,z);g2.add(p);const t=mk(G('kk_pedt'+(r||.5),()=>new THREE.TorusGeometry(r||.5,.03,8,40)),lam('#ffd43b'),0);t.rotation.x=Math.PI/2;at(t,x,.12,z);g2.add(t);return p;};
const done=(g2,h,set,ms)=>{if(isPlay(h))A.later(()=>h.win(set.ok),ms||500);};
const tickers=st=>{st._kk=[];return f=>st._kk.push(f);};
const TK=st=>(dt,t)=>(st._kk||[]).forEach(f=>{try{f(dt,t);}catch(e){}});
const BIG=c=>c||COL[Math.floor(Math.random()*COL.length)];

/* ---------- HELLO: a giant 3D letter (or number) rises up; its friend pops up beside it ---------- */
C.hello=function(g2,st,h,set){const on=tickers(st);mat(g2,4.4,2.3,-2.3,set.mat||'#fff8e8');
  const L=txt3(set.big,set.col||'#ff6b6b',{size:set.big.length>1?1.05:1.35,depth:.34});pedestal(g2,-1.0,-2.45,'#ffffff',.85);at(L,-1.0,.12,-2.45);g2.add(L);
  const items=[];const n=set.n||1;const it=set.item;
  if(it){if(n===1){pedestal(g2,1.15,-2.3,'#fff3bf',.6);const o=make(it,1.55);at(o,1.15,.12,-2.3);g2.add(o);items.push(o);}
    else{const cols=n>5?5:n,rows=Math.ceil(n/cols),sp=Math.min(.5,2.2/cols);for(let i=0;i<n;i++){const r=Math.floor(i/cols),c=i%cols,nc=Math.min(cols,n-r*cols);const o=make(it,n>6?.85:1.05);at(o,1.15+(c-(nc-1)/2)*sp,0,-2.75+r*.62);g2.add(o);items.push(o);}}}
  if(set.word){const T=tag(set.word,{size:.36,bg:'#ffffff',border:set.col||'#ff6b6b',color:'#1b2236'});T.position.set(0,1.9,-2.95);g2.add(T);}
  const show=()=>{rise(L,.7);A.later(()=>boom(L),350);items.forEach((o,i)=>{o.visible=false;A.later(()=>{o.visible=true;pop(o,.5);if(n>1){sticker(o,i+1);}if(i===items.length-1)boom(o);},900+i*(n>1?420:0));});};
  show();let ph=0;on((dt,t)=>{ph+=dt;L.rotation.y=Math.sin(t*.9)*.18;L.position.y=.12+Math.abs(Math.sin(t*1.6))*.04;});
  A.drag(L,{tap:()=>{jump(L,.35);boom(L);SAY(set.sayBig||set.big);}});
  items.forEach((o,i)=>A.drag(o,{tap:()=>{jump(o,.4);SAY(n>1?(WORDS[i+1]||i+1):(set.sayItem||o.userData.pk.lab));}}));
  return {tick:TK(st),play:show,controls:()=>st.round?[]:[{t:'Again!',go:true,fn:show}]};};
C.hello.bare=1;

/* ---------- TRACE: tap the glowing dots in order to trace the letter ---------- */
const arc=(cx,cy,rx,ry,a0,a1,n)=>{const p=[];n=n||8;for(let i=0;i<=n;i++){const a=(a0+(a1-a0)*i/n)*Math.PI/180;p.push([cx+Math.cos(a)*rx,cy+Math.sin(a)*ry]);}return p;};
const STROKES={A:[[[0,0],[.5,1],[1,0]],[[.22,.38],[.78,.38]]],B:[[[.1,0],[.1,1]],[[.1,1],[.6,1]].concat(arc(.6,.76,.26,.24,90,-90,4)),[[.1,.52],[.62,.52]].concat(arc(.62,.26,.3,.26,90,-90,4)).concat([[.1,0]])],
 C:[arc(.55,.5,.47,.5,40,320,9)],D:[[[.1,0],[.1,1]],[[.1,1],[.45,1]].concat(arc(.45,.5,.47,.5,90,-90,6)).concat([[.1,0]])],E:[[[.9,1],[.1,1],[.1,0],[.9,0]],[[.1,.5],[.75,.5]]],F:[[[.9,1],[.1,1],[.1,0]],[[.1,.5],[.75,.5]]],
 G:[arc(.55,.5,.47,.5,40,340,9).concat([[.95,.45],[.6,.45]])],H:[[[.1,1],[.1,0]],[[.9,1],[.9,0]],[[.1,.5],[.9,.5]]],I:[[[.5,1],[.5,0]]],J:[[[.75,1],[.75,.3]].concat(arc(.45,.3,.3,.3,0,-180,5))],
 K:[[[.1,1],[.1,0]],[[.9,1],[.1,.42]],[[.35,.6],[.9,0]]],L:[[[.1,1],[.1,0],[.85,0]]],M:[[[.05,0],[.1,1],[.5,.3],[.9,1],[.95,0]]],N:[[[.1,0],[.1,1],[.9,0],[.9,1]]],O:[arc(.5,.5,.47,.5,90,450,12)],
 P:[[[.1,0],[.1,1],[.55,1]].concat(arc(.55,.74,.33,.26,90,-90,5)).concat([[.1,.48]])],Q:[arc(.5,.52,.46,.48,90,450,12),[[.55,.25],[.95,-.05]]],R:[[[.1,0],[.1,1],[.55,1]].concat(arc(.55,.74,.33,.26,90,-90,5)).concat([[.1,.48]]),[[.45,.48],[.9,0]]],
 S:[arc(.5,.75,.38,.25,30,270,6).concat(arc(.5,.25,.4,.25,90,-160,6))],T:[[[.05,1],[.95,1]],[[.5,1],[.5,0]]],U:[[[.1,1],[.1,.35]].concat(arc(.5,.35,.4,.35,180,360,6)).concat([[.9,1]])],V:[[[0,1],[.5,0],[1,1]]],
 W:[[[0,1],[.22,0],[.5,.7],[.78,0],[1,1]]],X:[[[.05,1],[.95,0]],[[.95,1],[.05,0]]],Y:[[[0,1],[.5,.5],[1,1]],[[.5,.5],[.5,0]]],Z:[[[.08,1],[.92,1],[.08,0],[.92,0]]],
 '0':[arc(.5,.5,.45,.5,90,450,12)],'1':[[[.25,.75],[.55,1],[.55,0]]],'2':[arc(.5,.7,.38,.3,160,-20,5).concat([[.1,0],[.9,0]])],'3':[arc(.48,.75,.35,.25,150,-90,5).concat(arc(.48,.26,.4,.26,90,-150,5))],
 '4':[[[.7,0],[.7,1],[.05,.3],[.95,.3]]],'5':[[[.85,1],[.2,1],[.15,.58]].concat(arc(.48,.32,.4,.32,120,-150,6))],'6':[arc(.55,.6,.42,.42,80,190,4).concat(arc(.5,.3,.38,.3,180,540,9))],
 '7':[[[.08,1],[.92,1],[.35,0]]],'8':[arc(.5,.75,.32,.25,270,-90,8).concat(arc(.5,.27,.4,.27,90,450,9))],'9':[arc(.5,.72,.38,.28,0,360,8).concat([[.88,.72],[.8,0]])]};
C.trace=function(g2,st,h,set){const on=tickers(st);mat(g2,4.4,2.3,-2.3,'#fff8e8');const ch=String(set.ch).toUpperCase();const col=set.col||'#ff6b6b';
  const L=txt3(ch,'#ffe3e3',{size:ch.length>1?1.6:2.0,depth:.12});at(L,0,0,-2.85);L.rotation.x=-.25;g2.add(L);
  const face=L.userData.face;let bb;if(face){face.geometry.computeBoundingBox();bb=face.geometry.boundingBox;}else bb={min:{x:-.7,y:0},max:{x:.7,y:1.4}};
  const W=bb.max.x-bb.min.x,H=bb.max.y-bb.min.y,toW=(u,v)=>{L.updateMatrix();const p=new THREE.Vector3(bb.min.x+u*W,bb.min.y+v*H,.2);p.applyMatrix4(L.matrix);return p;};
  const chars=ch.split(''),nc=chars.length;const strokes=[];chars.forEach((c1,ci)=>(STROKES[c1]||STROKES.O).forEach(st1=>strokes.push(st1.map(([u,v])=>[(ci+(nc>1?.08+u*.84:u))/nc,v]))));const dots=[];
  strokes.forEach((s,si)=>{let acc=[],last=null;s.forEach((pt,i)=>{const p=toW(pt[0],pt[1]);if(!last){acc.push({p,si,start:true});last=p;return;}const d=p.distanceTo(last);const k=Math.max(1,Math.round(d/.3));for(let j=1;j<=k;j++){acc.push({p:last.clone().lerp(p,j/k),si});}last=p;});dots.push(...acc);});
  let nxt=0;const balls=dots.map((d,i)=>{const b=mk(G('kk_dot',()=>new THREE.SphereGeometry(.085,16,12)),lam(d.start?'#5cc46a':'#ffffff'),0);b.position.copy(d.p);g2.add(b);
    const r=mk(G('kk_dotr',()=>new THREE.TorusGeometry(.1,.018,6,20)),lam('#1b2236'),0);b.add(r);
    if(d.start){const T=tag(String(d.si+1),{size:.18,bg:'#5cc46a',border:'#2b8a3e',color:'#ffffff'});T.position.set(-.18,.18,0);b.add(T);}
    A.drag(b,{tap:()=>tapDot(i)});return b;});
  const line=[];const seg=(a,b)=>{const d=b.clone().sub(a);const m=mk(G('kk_tube',()=>new THREE.CylinderGeometry(.055,.055,1,10)),lam(col),0);m.scale.y=d.length();m.position.copy(a).add(b).multiplyScalar(.5);m.quaternion.setFromUnitVectors(V(0,1,0),d.normalize());g2.add(m);line.push(m);};
  const finish=()=>{P.kStepDone=true;if(!isPlay(h))A.later(()=>P.kNext&&P.kNext(),1800);L.userData.face&&(L.userData.face.material=new THREE.MeshPhongMaterial({color:'#ffd43b',shininess:90}));boom(L);jump(L,.3);SAY(set.say||ch);if(set.item){const o=make(set.item,1.2);at(o,1.75,0,-2.2);g2.add(o);pop(o);}done(g2,h,set,900);};
  const tapDot=i=>{if(i!==nxt){if(i<nxt)return;wobble(balls[i]);if(isPlay(h)&&i>nxt+1)SAY('Find the glowing dot!');return;}A.pop&&A.pop();const d=dots[i];if(i>0&&!d.start)seg(dots[i-1].p,d.p);balls[i].material=lam(col);jump(balls[i],.15);nxt++;if(nxt>=dots.length)finish();};
  on((dt,t)=>{balls.forEach((b,i)=>{const s=i===nxt?1.25+Math.sin(t*6)*.25:1;b.scale.setScalar(s);});});
  const auto=()=>{if(nxt>=dots.length)return;let k=0;const step=()=>{if(nxt>=dots.length)return;tapDot(nxt);k++;A.later(step,170);};step();};
  return {tick:TK(st),play:auto,controls:()=>(st.round||(window.BOOK||{}).kSpread)?[]:[{t:'Show me how',go:true,fn:auto}]};};
C.trace.bare=1;

/* ---------- BUBBLES: bubbles float up with letters, numbers or pictures inside; pop the right ones ---------- */
C.bubbles=function(g2,st,h,set){const on=tickers(st);mat(g2,4.4,2.3,-2.3,'#e7f5ff');const items=set.items||[];const need=set.need||items.filter(x=>String(x)[0]==='*').length;let got=0;
  const bs=items.map((it,i)=>{const g=new THREE.Group();const sp=mk(G('kk_bub',()=>new THREE.SphereGeometry(.36,28,20)),new THREE.MeshPhongMaterial({color:'#a5d8ff',transparent:true,opacity:.32,shininess:120,specular:new THREE.Color('#ffffff'),depthWrite:false}),0);sp.castShadow=false;g.add(sp);
    const hl=mk(G('kk_bubh',()=>new THREE.SphereGeometry(.07,10,8)),new THREE.MeshBasicMaterial({color:'#ffffff'}),0);hl.position.set(-.14,.16,.25);g.add(hl);
    const c=make(it,.62);c.position.y=-.2;c.traverse(o=>{if(o.isMesh)o.castShadow=false;});g.add(c);g.userData.pk=c.userData.pk;
    const x=-1.75+((i*1.37)%1)*3.5+(i%2)*.2,z=-2.95+((i*.61)%1)*1.2;g.userData.base=[x,z,.25+(i%3)*.12,i*.37];g.position.set(x,((i*.53)%1)*2,z);g2.add(g);
    A.drag(g,{instant:true,tap:()=>{if(g.userData.gone)return;const d=g.userData.pk;if(d.ok||!items.some(x=>String(x)[0]==='*')){g.userData.gone=1;boom(g);A.pop&&A.pop();SAY(d.lab);tween(.2,k=>g.scale.setScalar(Math.max(.01,1+k*.4-k*1.4)));A.later(()=>{g.visible=false;},220);got++;if(got>=need&&!g2.userData.kDone){g2.userData.kDone=1;P.kStepDone=true;done(g2,h,set,400);if(!isPlay(h))A.later(()=>P.kNext&&P.kNext(),1300);}if(set.respawn)A.later(()=>{g.userData.gone=0;g.scale.setScalar(1);g.position.y=-.25;g.visible=true;},1300);}
      else{wobble(g);SAY(d.lab);if(isPlay(h))h.miss(set.hint);}}});return g;});
  on((dt,t)=>bs.forEach(g=>{if(g.userData.gone)return;const [x,z,v,ph]=g.userData.base;g.position.y+=dt*v*(set.respawn?.6:1);if(g.position.y>2.1)g.position.y=-.1;g.position.x=x+Math.sin(t*1.2+ph*5)*.12;g.position.z=z;g.rotation.y=Math.sin(t+ph)*.3;}));
  return {tick:TK(st)};};
C.bubbles.bare=1;

/* ---------- PATH: hop the duck across stepping stones in order (A, B, C… or 1, 2, 3…) to reach home ---------- */
C.path=function(g2,st,h,set){mat(g2,4.4,2.3,-2.3,'#d0ebff');const seq=set.seq||[],extra=set.extra||[];const all=seq.concat(extra);
  const cols=4,rows=Math.ceil(all.length/cols),cells=[];for(let r=0;r<rows;r++)for(let c=0;c<cols;c++)cells.push([-1.35+c*.9,-3.0+r*.75]);
  const order=set.cells||cells.map((_,i)=>i);const pos=all.map((_,i)=>cells[order[i]%cells.length]);
  const stones=all.map((t,i)=>{const s=new THREE.Group();const d=mk(G('kk_stone',()=>new THREE.CylinderGeometry(.33,.37,.12,28)),lam(['#ffd8a8','#d3f9d8','#ffe3e3','#e5dbff'][i%4]),20);d.position.y=.06;s.add(d);
    const L=make(t.length===1&&/[A-Za-z0-9]/.test(t)?'txt:'+t+':'+COL[i%8]:t,.62);L.position.y=.12;s.add(L);s.userData.t=t;at(s,pos[i][0],0,pos[i][1]);g2.add(s);return s;});
  const hero=make(set.who||'duck',1.0);at(hero,-1.9,0,-1.25);g2.add(hero);const goal=make(set.goal||'house',1.0);at(goal,1.95,0,-1.25);g2.add(goal);
  let k=0;stones.forEach((s,i)=>A.drag(s,{tap:()=>{const t=s.userData.t;if(i<seq.length&&i===k){k++;A.pop&&A.pop();SAY(t);P.hop(hero,V(s.position.x,.12,s.position.z),.6,.5);s.children[0].material=lam('#ffd43b');
      if(k===seq.length){A.later(()=>{P.hop(hero,V(goal.position.x-.3,0,goal.position.z),.8,.6).then(()=>{boom(goal);jump(goal,.3);done(g2,h,set,300);});},600);}}
    else if(i<k)jump(s,.1);else{wobble(s);SAY(t);if(isPlay(h))h.miss(set.hint||'Which one comes next?');}}}));
  return {};};
C.path.bare=1;

/* ---------- WEB: a friendly spider shoots silk to the right things ---------- */
function spider(){const g=new THREE.Group();const b=mk(G('kk_spb',()=>new THREE.SphereGeometry(.28,20,16)),lam('#495057'),20);b.position.y=.42;g.add(b);const hd=mk(G('kk_sph',()=>new THREE.SphereGeometry(.18,18,14)),lam('#343a40'),20);hd.position.set(0,.4,.3);g.add(hd);
  [-1,1].forEach(s=>{const e=mk(G('kk_spe',()=>new THREE.SphereGeometry(.06,12,10)),lam('#ffffff'),0);e.position.set(s*.07,.47,.45);g.add(e);const p2=mk(G('kk_spp',()=>new THREE.SphereGeometry(.03,8,6)),lam('#1b2236'),0);p2.position.set(s*.07,.47,.5);g.add(p2);
    for(let i=0;i<4;i++){const l=mk(G('kk_spl',()=>new THREE.CylinderGeometry(.02,.02,.5,6)),lam('#343a40'),0);l.position.set(s*.28,.25,-.15+i*.12);l.rotation.z=s*1.0;l.rotation.x=(i-1.5)*.25;g.add(l);}});return g;}
C.web=function(g2,st,h,set){const on=tickers(st);mat(g2,4.4,2.3,-2.3,'#f8f0fc');const CO=!!set.corner,SX=CO?-1.85:0,SZ=CO?-3.15:-2.3;const sp=(P.kLuxNow&&P.LUXM&&P.LUXM.spider)?P.LUXM.spider():spider();at(sp,SX,0,SZ);if(CO)sp.scale.multiplyScalar(.6);g2.add(sp);
  const ring=mk(G('kk_web',()=>new THREE.TorusGeometry(.6,.008,4,40)),lam('#dee2e6'),0);ring.rotation.x=Math.PI/2;at(ring,SX,.02,SZ);if(CO)ring.scale.setScalar(.6);g2.add(ring);
  const SCAT=[[-.35,-3.1],[.95,-3.2],[2.0,-2.85],[-1.15,-1.7],[.35,-2.0],[1.6,-1.55],[-1.95,-2.2]];
  const items=set.items||[];const n=items.length;const need=items.filter(x=>String(x)[0]==='*').length;let got=0;
  items.forEach((it,i)=>{const a=Math.PI*(0.15+0.7*i/Math.max(1,n-1));const o=make(it,CO?.85:1.0);if(CO)at(o,SCAT[i%7][0],0,SCAT[i%7][1]);else at(o,-Math.cos(a)*1.75,0,-2.3-Math.sin(a)*.85+.55);g2.add(o);
    A.drag(o,{tap:()=>{if(o.userData.got)return;const d=o.userData.pk;SAY(d.lab);if(d.ok){o.userData.got=1;got++;const a0=V(SX,CO?.3:.45,SZ),b0=o.position.clone().add(V(0,.3,0));const m=mk(G('kk_silk',()=>new THREE.CylinderGeometry(.015,.015,1,6)),lam('#ffffff'),0);g2.add(m);
        tween(.45,k=>{const b=a0.clone().lerp(b0,k);const dd=b.clone().sub(a0);m.scale.y=Math.max(.01,dd.length());m.position.copy(a0).add(b).multiplyScalar(.5);m.quaternion.setFromUnitVectors(V(0,1,0),dd.normalize());}).then(()=>{jump(o,.35);boom(o);if(got>=need){jump(sp,.4);done(g2,h,set,500);}});}
      else{wobble(o);if(isPlay(h))h.miss(set.hint);}}});});
  on((dt,t)=>{sp.rotation.y=(CO?.6:0)+Math.sin(t*1.3)*.25;});A.drag(sp,{tap:()=>{jump(sp,.3);SAY(set.spiderSay||'Hello!');}});
  return {tick:TK(st)};};
C.web.bare=1;

/* ---------- FISH: catch the fish that carry the right letter ---------- */
C.fish=function(g2,st,h,set){const on=tickers(st);mat(g2,4.4,2.3,-2.3,'#fff8e8');const pond=mk(G('kk_pond',()=>new THREE.CylinderGeometry(1.45,1.45,.04,48)),new THREE.MeshPhongMaterial({color:'#4dabf7',shininess:90,transparent:true,opacity:.85}),0);pond.scale.set(1.25,1,.62);at(pond,-.25,.03,-2.4);g2.add(pond);
  const bucket=make('bucket',1.15);at(bucket,1.95,0,-1.6);g2.add(bucket);const items=set.items||[];const need=items.filter(x=>String(x)[0]==='*').length;let got=0;
  const fs=items.map((it,i)=>{const g=new THREE.Group();const f=make(set.kind||'fish',.95);g.add(f);const k=String(it);const lab=k.replace('*','');const T=make('txt:'+lab+':'+COL[(i*3)%8],.55);T.position.set(0,.4,0);g.add(T);g.userData.ok=k[0]==='*';g.userData.lab=lab;g.userData.ph=i*Math.PI*2/items.length;g.userData.r=.55+(i%2)*.45;g2.add(g);
    A.drag(g,{tap:()=>{if(g.userData.caught)return;SAY(lab);if(g.userData.ok){g.userData.caught=1;got++;const p0=g.position.clone(),to=bucket.position.clone().add(V(0,.35,0));tween(.7,k2=>{g.position.set(p0.x+(to.x-p0.x)*k2,p0.y+Math.sin(k2*Math.PI)*1.1+(to.y-p0.y)*k2,p0.z+(to.z-p0.z)*k2);g.scale.setScalar(1-.5*k2);}).then(()=>{boom(bucket);jump(bucket,.2);g.visible=false;if(got>=need)done(g2,h,set,300);});}
      else{wobble(g);if(isPlay(h))h.miss(set.hint);}}});return g;});
  on((dt,t)=>fs.forEach(g=>{if(g.userData.caught)return;const a=t*.35+g.userData.ph,r=g.userData.r;g.position.set(-.25+Math.cos(a)*r*1.5,.05+Math.sin(t*3+g.userData.ph)*.03,-2.4+Math.sin(a)*r*.6);g.rotation.y=-a;}));
  return {tick:TK(st)};};
C.fish.bare=1;

/* ---------- DIG: tap the sand mounds to find what is hiding ---------- */
C.dig=function(g2,st,h,set){mat(g2,4.4,2.3,-2.3,'#ffe8a1');const items=set.items||[];const n=items.length,cols=Math.min(4,n),need=items.filter(x=>String(x)[0]==='*').length;let got=0;
  items.forEach((it,i)=>{const r=Math.floor(i/cols),c=i%cols,nc=Math.min(cols,n-r*cols);const x=(c-(nc-1)/2)*1.05,z=-2.8+r*.95;const o=make(it,1.0);at(o,x,-.6,z);o.visible=false;g2.add(o);
    const m=mk(G('kk_mound',()=>new THREE.SphereGeometry(.42,22,12,0,Math.PI*2,0,Math.PI/2)),lam('#e9c46a'),20);m.scale.y=.75;at(m,x,0,z);g2.add(m);
    const sh=make('shovel',.6);at(sh,x+.35,.2,z+.1);sh.rotation.z=-.5;g2.add(sh);
    A.drag(m,{tap:()=>{if(m.userData.dug)return;m.userData.dug=1;A.pop&&A.pop();tween(.35,k=>{m.scale.set(1+k*.3,.75*(1-k*.85),1+k*.3);});sh.visible=false;o.visible=true;tween(.5,k=>{o.position.y=-.6+.6*k+Math.sin(k*Math.PI)*.35;});const d=o.userData.pk;SAY(d.lab);
      if(d.ok){A.later(()=>{boom(o);jump(o,.3);},500);got++;if(got>=need)done(g2,h,set,1000);}else if(isPlay(h)&&set.strict)h.miss(set.hint);}});
    A.drag(o,{tap:()=>{jump(o,.3);SAY(o.userData.pk.lab);}});});
  return {};};
C.dig.bare=1;

/* ---------- MEMORY: flip the cards and find the pairs ---------- */
C.memory=function(g2,st,h,set){mat(g2,4.4,2.3,-2.3,'#f3f0ff');const pairs=set.pairs||[];const cards=[];pairs.forEach((p,i)=>{cards.push({k:p[0],id:i});cards.push({k:p[1],id:i});});
  const order=set.fixed?cards:cards.map(c=>[Math.random(),c]).sort((a,b)=>a[0]-b[0]).map(x=>x[1]);const n=order.length,cols=n>6?4:3,rows=Math.ceil(n/cols);
  let open=[],matched=0,busy=false;
  order.forEach((cd,i)=>{const r=Math.floor(i/cols),c=i%cols;const x=(c-(cols-1)/2)*1.15,z=-2.85+r*.95;const g=new THREE.Group();at(g,x,0,z);g2.add(g);
    const card=mk(G('kk_card',()=>new THREE.BoxGeometry(.8,.06,.7)),lam('#845ef7'),20);card.position.y=.03;g.add(card);const q=tag('?',{size:.36,bg:'#845ef7',border:'#5f3dc4',color:'#ffffff'});q.position.set(0,.3,0);g.add(q);
    const face=mk(G('kk_face',()=>new THREE.BoxGeometry(.78,.065,.68)),lam('#ffffff'),0);face.position.y=.031;face.visible=false;g.add(face);
    const o=make(cd.k,.8);o.visible=false;o.position.y=.06;g.add(o);g.userData.cd=cd;
    const flip=up=>{tween(.3,k=>{g.rotation.z=(up?k:1-k)*Math.PI*.0;g.scale.y=1;card.scale.x=Math.max(.05,Math.abs(1-2*k));}).then(()=>{});A.later(()=>{q.visible=!up;face.visible=up;o.visible=up;card.material=lam(up?'#ffffff':'#845ef7');if(up)pop(o,.35);},150);};
    g.userData.flip=flip;
    A.drag(g,{tap:()=>{if(busy||g.userData.open)return;A.pop&&A.pop();g.userData.open=true;flip(true);SAY(o.userData.pk.lab);open.push(g);
      if(open.length===2){busy=true;const [a,b]=open;open=[];if(a.userData.cd.id===b.userData.cd.id){A.later(()=>{boom(a);boom(b);jump(a,.25);jump(b,.25);matched++;busy=false;if(matched>=pairs.length)done(g2,h,set,500);},500);}
        else A.later(()=>{a.userData.open=b.userData.open=false;a.userData.flip(false);b.userData.flip(false);busy=false;},1100);}}});});
  return {};};
C.memory.bare=1;

/* ---------- FROG: hop along numbered lily pads, counting out loud ---------- */
C.frog=function(g2,st,h,set){mat(g2,4.4,2.3,-2.3,'#fff8e8');const pond=mk(G('kk_fp',()=>new THREE.BoxGeometry(4.2,.03,1.7)),new THREE.MeshPhongMaterial({color:'#4dabf7',shininess:80}),0);at(pond,0,.02,-2.35);g2.add(pond);
  const N=set.max||10,to=set.to||N;const pads=[];for(let i=0;i<=N;i++){const x=-1.95+i*(3.9/N),z=-2.35+Math.sin(i*1.3)*.25;const p=new THREE.Group();const l=mk(G('kk_lily',()=>new THREE.CylinderGeometry(.19,.19,.03,24,1,false,0,Math.PI*1.8)),lam(i===0?'#ffd43b':'#69db7c'),0);l.position.y=.04;p.add(l);
    if(i>0){const T=make('txt:'+i+':'+COL[i%8],.42);T.position.y=.06;p.add(T);}at(p,x,0,z);g2.add(p);pads.push(p);}
  const fr=make('frog',.95);at(fr,pads[0].position.x,.05,pads[0].position.z);g2.add(fr);let at0=0;
  if(set.target!==false){const T=tag(set.label||('Hop to '+to+'!'),{size:.3,bg:'#fff3c4'});T.position.set(0,1.3,-3.1);g2.add(T);}
  pads.forEach((p,i)=>A.drag(p,{tap:()=>{if(i===at0+1){at0=i;A.pop&&A.pop();SAY(WORDS[i]||i);P.hop(fr,V(p.position.x,.05,p.position.z),.5,.4);if(i===to){A.later(()=>{boom(fr);done(g2,h,set,300);},500);}}else if(i>at0+1){wobble(p);if(isPlay(h))h.miss('Hop one pad at a time!');}}}));
  const auto=()=>{let k=0;const step=()=>{if(at0>=to)return;pads[at0+1]&&(at0++,SAY(WORDS[at0]),P.hop(fr,V(pads[at0].position.x,.05,pads[at0].position.z),.5,.4));A.later(step,550);};step();};
  return {play:auto,controls:()=>st.round?[]:[{t:'Hop, hop!',go:true,fn:auto}]};};
C.frog.bare=1;

/* ---------- SPOTS: give the ladybug exactly the right number of spots ---------- */
C.spots=function(g2,st,h,set){mat(g2,4.4,2.3,-2.3,'#ebfbee');const n=set.n||3;const g=new THREE.Group();at(g,0,0,-2.3);g2.add(g);
  const body=mk(G('kk_lb',()=>new THREE.SphereGeometry(.85,32,20,0,Math.PI*2,0,Math.PI/2)),new THREE.MeshPhongMaterial({color:'#fa5252',shininess:80}),20);body.scale.set(1,.55,1.2);g.add(body);
  const head=mk(G('kk_lbh',()=>new THREE.SphereGeometry(.38,20,16)),lam('#212529'),20);head.position.set(0,.18,1.0);g.add(head);[-1,1].forEach(s=>{const e=mk(G('kk_lbe',()=>new THREE.SphereGeometry(.09,12,10)),lam('#ffffff'),0);e.position.set(s*.15,.3,1.3);g.add(e);});
  const line=mk(G('kk_lbl',()=>new THREE.BoxGeometry(.03,.02,2.0)),lam('#212529'),0);line.position.set(0,.47,0);g.add(line);
  if(set.label!==false){const T=tag(set.label||(n+' spots, please!'),{size:.3,bg:'#fff3c4'});T.position.set(0,1.35,-3.1);g2.add(T);}
  const spots=[[-.4,.2],[.4,.2],[-.35,-.35],[.35,-.35],[-.5,.6],[.5,.6],[-.2,-.7],[.2,-.7],[-.6,-.1],[.6,-.1]];let c=0;
  A.drag(g,{tap:()=>{if(c>=n){jump(g,.15);return;}const [x,z]=spots[c];const s=mk(G('kk_spot',()=>new THREE.SphereGeometry(.13,14,10)),lam('#212529'),0);s.scale.y=.4;s.position.set(x,.42-Math.abs(z)*.12-Math.abs(x)*.12,z);g.add(s);pop(s,.3);c++;SAY(WORDS[c]||c);sticker(s,c);
    if(c===n){A.later(()=>{boom(g);jump(g,.3);},300);done(g2,h,set,800);}}});
  return {};};
C.spots.bare=1;
/* join the pairs: tap a shape (or colour) on the left, then the thing that matches it on the right; a rope joins them */
C.join=function(g2,st,h,set){const on=tickers(st);mat(g2,4.4,2.3,-2.3,'#eef7ff');const prs=(set.pairs||[]).slice(0,3);const n=prs.length;const zs=[-3.3,-2.3,-1.3];
  const ord=prs.map((p,i)=>i);for(let i=ord.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[ord[i],ord[j]]=[ord[j],ord[i]];}if(ord.every((v,i)=>v===i)&&n>1)ord.push(ord.shift());
  const RC=['#ff6b6b','#4dabf7','#51cf66'];let sel=null,got=0,fin=false;const ropes=[];
  const mkSide=(side,i,it,z,hy)=>{const x=side?1.55:-1.6;let base;
    if(side){base=mk(G('kj_js'+hy,()=>new THREE.BoxGeometry(.95,hy+.08,.62)),lam(['#ffe3e3','#fff3bf','#d3f9d8'][i%3]),20);at(base,x,(hy+.08)/2,z);g2.add(base);}else base=pedestal(g2,x,z,'#ffffff',.32);
    const o=make(it,side?.62:.58);const y0=side?hy+.08:.12;at(o,x,y0,z);g2.add(o);const ring=mk(G('kj_jring',()=>new THREE.TorusGeometry(.42,.035,8,40)),new THREE.MeshBasicMaterial({color:'#ffd43b'}),0);ring.rotation.x=Math.PI/2;at(ring,x,y0+.02,z);ring.visible=false;g2.add(ring);
    const hit=mk(G('kj_jhit',()=>new THREE.BoxGeometry(.95,.9,.62)),new THREE.MeshBasicMaterial({visible:false}),0);hit.userData.noLux=1;at(hit,x,y0+.4,z);g2.add(hit);
    const e={side,i,o,ring,y0,x,z,done:false,pk:o.userData.pk||{}};A.drag(hit,{tap:()=>tapIt(e)});return e;};
  const L=prs.map((p,i)=>mkSide(0,i,p[0],zs[i],0));const Rr=ord.map((pi,k)=>mkSide(1,pi,prs[pi][1],zs[k],(n-1-k)*.22));
  const rope=(a,b,c)=>{const A0=V(a.x+.3,a.y0+.35,a.z),B0=V(b.x-.4,b.y0+.35,b.z);const mid=A0.clone().lerp(B0,.5);mid.y+=.75;const cu=new THREE.QuadraticBezierCurve3(A0,mid,B0);
    const m=mk(new THREE.TubeGeometry(cu,40,.045,10,false),new THREE.MeshPhongMaterial({color:c,shininess:80}),0);m.castShadow=false;m.userData.noLux=1;g2.add(m);ropes.push(m);const d=m.geometry.index.count;m.geometry.setDrawRange(0,0);tween(.5,k=>m.geometry.setDrawRange(0,Math.floor(d*k/6)*6));};
  const pick=e=>{if(sel){sel.ring.visible=false;}sel=e;if(e){e.ring.visible=true;jump(e.o,.2);if(e.pk.lab)SAY(e.pk.lab);}};
  function tapIt(e){if(fin||e.done)return;A.pop&&A.pop();if(!sel||sel.side===e.side){pick(e);return;}
    const a=sel.side?e:sel,b=sel.side?sel:e;
    if(a.i===b.i){a.done=b.done=true;a.ring.visible=b.ring.visible=false;sel=null;rope(a,b,RC[got%3]);jump(a.o,.3);jump(b.o,.3);boom(b.o);SAY((a.pk.lab||'')+(b.pk.lab?' and '+b.pk.lab:''));got++;
      if(got>=n){fin=true;P.kStepDone=true;A.later(()=>{[...L,...Rr].forEach((q,k)=>A.later(()=>jump(q.o,.35),k*90));},600);done(g2,h,set,1500);}}
    else{wobble(e.o);wobble(sel.o);if(isPlay(h))h.miss(set.hint||'Those two do not match. Try another one!');pick(null);}}
  on((dt,t)=>{if(sel&&!sel.done){sel.o.position.y=sel.y0+.08+Math.sin(t*5)*.06;}[...L,...Rr].forEach(q=>{if(q!==sel&&!q.done)q.o.position.y+= (q.y0-q.o.position.y)*Math.min(1,dt*8);});});
  return {tick:TK(st)};};
C.join.bare=1;
})();
/* ===== Letter lessons, part 2: a slow little 3D show for every letter, and the hidden alphabet ===== */
(function(){
"use strict";
const P=window.PM;if(!P||P.failed||!P.K2||!P.PKX)return;
const {THREE,V,G,mk,lam,A,tween}=P;const C=P.K2.CUSTOM;const X=P.PKX;const {make,txt3,boom,mat,tag,COL,at}=X;
const ease=k=>1-Math.pow(1-k,3),back=k=>{const c=1.9;return 1+(c+1)*Math.pow(k-1,3)+c*Math.pow(k-1,2);};
const sq=(o,d)=>{const s=o.scale.x;return tween(d||.35,k=>{const f=Math.sin(k*Math.PI);o.scale.set(s*(1+f*.18),s*(1-f*.22),s*(1+f*.18));}).then(()=>o.scale.setScalar(s));};
const hop=(o,to,ht,d)=>{const p0=o.position.clone();return tween(d||.6,k=>{o.position.set(p0.x+(to.x-p0.x)*k,p0.y+(to.y-p0.y)*k+Math.sin(k*Math.PI)*(ht||.5),p0.z+(to.z-p0.z)*k);});};
const grow=(o,s,d,e)=>{o.visible=true;o.scale.setScalar(.001);return tween(d||.7,k=>o.scale.setScalar(Math.max(.001,s*(e||back)(k))));};
const growS=(o,d)=>{const v=o.userData.s0v||(o.userData.s0v=o.scale.clone());o.visible=true;o.scale.set(.001,.001,.001);return tween(d||.5,k=>{const f=Math.max(.001,back(k));o.scale.set(v.x*f,v.y*f,v.z*f);});};
const bob=(o,ht)=>{const y=o.position.y;return tween(.5,k=>{o.position.y=y+Math.sin(k*Math.PI)*(ht||.3);});};
function runner(st){const tok=(st._showTok=(st._showTok||0)+1);const ok=()=>st._showTok===tok;return {at:(ms,fn)=>A.later(()=>{if(ok())try{fn();}catch(e){console.error(e);}},ms),ok};}
function balloonOn(g2,o,c,dx){const b=make('balloon::'+c,1.0);b.position.set(dx,.55,0);o.add(b);return b;}
function giftBox(c,s){const g=new THREE.Group();s=s||1;const body=mk(G('kk_gb',()=>new THREE.BoxGeometry(.5,.42,.5)),lam(c),20);body.position.y=.21;g.add(body);
  const rb=mk(G('kk_gbr',()=>new THREE.BoxGeometry(.1,.425,.505)),lam('#ffffff'),0);rb.position.y=.21;g.add(rb);const rb2=mk(G('kk_gbr2',()=>new THREE.BoxGeometry(.505,.425,.1)),lam('#ffffff'),0);rb2.position.y=.21;g.add(rb2);
  const lid=new THREE.Group();const l=mk(G('kk_gbl',()=>new THREE.BoxGeometry(.56,.1,.56)),lam(c),20);lid.add(l);const bow=mk(G('kk_gbb',()=>new THREE.TorusGeometry(.08,.03,8,20)),lam('#ffffff'),0);bow.position.y=.1;lid.add(bow);lid.position.y=.47;g.add(lid);
  g.userData.lid=lid;g.scale.setScalar(s);return g;}

/* ---------- SHOW: the letter makes a grand entrance, then its friend, then three more friends. Nothing to tap; just watch. ---------- */
const LIN=['drop','gift','balloons','spin','roll','grow','rocket','flip'];
const IIN=['hop','fall','ground','bubble','zoom','twirl','peek'];
C.show=function(g2,st,h,set){mat(g2,4.4,2.3,-2.3,set.mat||'#fff8e8');let R=runner(st);const col=set.col||'#ff6b6b';const i=set.i||0;
  const ls=set.lin||LIN[i%LIN.length],is=set.iin||IIN[(i*3+1)%IIN.length];
  const LB=new THREE.Group();at(LB,-1.0,0,-2.75);g2.add(LB);const L=txt3(set.big,col,{size:set.big.length>1?1.05:1.3,depth:.34});LB.add(L);L.visible=false;
  const IB=new THREE.Group();at(IB,1.2,0,-2.6);g2.add(IB);const I=make(set.item,1.5);IB.add(I);I.visible=false;const is0=I.scale.x;
  const ws=(set.words||[]).slice(0,3);const WS=ws.map((w,j)=>{const g=new THREE.Group();at(g,(j-1)*1.45,0,-1.45);g2.add(g);const o=make(w,1.05);g.add(o);o.visible=false;const t=tag(w,{size:.24,bg:'#ffffff',border:COL[j%8]});t.position.set(0,.22,.6);t.visible=false;g.add(t);return {g,o,t,s:o.scale.x};});
  const T1=tag(set.line||set.big,{size:.36,bg:'#ffffff',border:col,color:'#1b2236'});T1.position.set(0,2.0,-3.1);T1.visible=false;g2.add(T1);
  const ext=[];const clean=()=>{ext.splice(0).forEach(o=>{o.parent&&o.parent.remove(o);});};
  const letterIn=()=>{L.visible=true;L.position.set(0,0,0);L.rotation.set(0,0,0);L.scale.setScalar(1);
    if(ls==='drop'){L.position.y=3.2;tween(1.1,k=>{L.position.y=3.2*(1-k*k);}).then(()=>{sq(L,.45);boom(L);});}
    else if(ls==='gift'){L.visible=false;const b=giftBox(col,1.5);LB.add(b);ext.push(b);grow(b,1.5,.6);R.at(900,()=>{const lid=b.userData.lid;tween(.6,k=>{lid.position.y=.47+k*1.4;lid.rotation.z=k*2.5;lid.position.x=k*.8;});});
      R.at(1100,()=>{L.visible=true;L.position.y=.2;L.scale.setScalar(.2);tween(.9,k=>{L.scale.setScalar(.2+.8*back(k));L.position.y=.2+Math.sin(k*Math.PI)*1.2+(.62-.2)*k;}).then(()=>boom(L));});
      R.at(2300,()=>{tween(.6,k=>{b.scale.setScalar(1.5*(1-k)+.001);}).then(()=>{b.visible=false;tween(.5,k=>{L.position.y=.62*(1-ease(k));});});});}
    else if(ls==='balloons'){L.position.y=3.0;const bs=[['#ff6b6b',-.35],['#4fb3ff',0],['#ffd43b',.35]].map(([c,dx])=>balloonOn(g2,L,c,dx));bs.forEach(b=>{b.position.y=1.1;});
      tween(2.0,k=>{L.position.y=3.0*(1-ease(k));L.rotation.z=Math.sin(k*Math.PI*3)*.12*(1-k);}).then(()=>{sq(L,.4);bs.forEach((b,j)=>{const p=b.position.clone();tween(1.4,k=>{b.position.set(p.x+(j-1)*k*.8,p.y+k*3,p.z);}).then(()=>{L.remove(b);});});});}
    else if(ls==='spin'){L.position.y=-1.2;tween(1.4,k=>{L.position.y=-1.2*(1-ease(k));L.rotation.y=(1-ease(k))*Math.PI*4;}).then(()=>boom(L));}
    else if(ls==='roll'){L.position.x=-2.5;tween(1.5,k=>{const e=ease(k);L.position.x=-2.5*(1-e);L.rotation.z=(1-e)*Math.PI*2;L.position.y=Math.abs(Math.sin(e*Math.PI*2))*.25*(1-e);}).then(()=>sq(L));}
    else if(ls==='grow'){L.scale.setScalar(.001);tween(1.3,k=>{const e=k<1?1+Math.sin(k*Math.PI*3.2)*(1-k)*.35:1;L.scale.setScalar(Math.max(.001,Math.min(1,k*2.2)*e));}).then(()=>boom(L));}
    else if(ls==='rocket'){const p0=V(2.6,2.6,-.8);tween(1.5,k=>{const e=ease(k);L.position.set(p0.x*(1-e),p0.y*(1-e)+Math.sin(e*Math.PI)*.8,p0.z*(1-e));L.rotation.z=(1-e)*-1.2;if(Math.random()<.35){const s=mk(G('kk_spk',()=>new THREE.SphereGeometry(.05,8,6)),lam(COL[Math.floor(Math.random()*8)]),0);s.position.copy(L.position);LB.add(s);ext.push(s);tween(.8,q=>{s.scale.setScalar(Math.max(.01,1-q));s.position.y-=.004;});}}).then(()=>{sq(L);boom(L);});}
    else{L.position.z=-1.5;L.position.y=.0;tween(1.6,k=>{const e=ease(k);L.position.z=-1.5*(1-e);L.position.y=Math.abs(Math.sin(e*Math.PI*2))*.7;L.rotation.x=e*Math.PI*4;}).then(()=>{L.rotation.x=0;sq(L);boom(L);});}};
  const itemIn=()=>{I.visible=true;I.position.set(0,0,0);I.rotation.set(0,0,0);I.scale.setScalar(is0);
    if(is==='hop'){I.position.x=2.0;let k0=Promise.resolve();[1.35,.7,0].forEach((x,j)=>{k0=k0.then(()=>hop(I,V(x,0,0),.45,.5));});k0.then(()=>sq(I));}
    else if(is==='fall'){I.position.y=3;tween(.9,k=>{I.position.y=3*(1-k*k);}).then(()=>{bob(I,.35).then(()=>bob(I,.12));});}
    else if(is==='ground'){I.position.y=-1;tween(1.0,k=>{I.position.y=-1*(1-back(k));}).then(()=>boom(I));}
    else if(is==='bubble'){I.position.y=1.6;const b=mk(G('kk_bub2',()=>new THREE.SphereGeometry(.6,28,20)),new THREE.MeshPhongMaterial({color:'#a5d8ff',transparent:true,opacity:.3,shininess:120,depthWrite:false}),0);b.castShadow=false;b.userData.bub=1;b.position.y=.5;I.add(b);
      tween(1.6,k=>{I.position.y=1.6*(1-ease(k))+Math.sin(k*Math.PI*2)*.1;I.position.x=Math.sin(k*Math.PI*2)*.25;}).then(()=>{boom(I);I.remove(b);sq(I);});}
    else if(is==='zoom'){I.position.z=-1.3;I.scale.setScalar(.001);tween(1.2,k=>{const e=ease(k);I.position.z=-1.3*(1-e);I.scale.setScalar(Math.max(.001,is0*back(k)));});}
    else if(is==='twirl'){I.scale.setScalar(.001);tween(1.3,k=>{I.scale.setScalar(Math.max(.001,is0*back(k)));I.rotation.y=(1-ease(k))*Math.PI*4;}).then(()=>boom(I));}
    else{I.position.set(-2.0,0,-.35);I.scale.setScalar(is0*.6);tween(.7,k=>{I.position.y=Math.sin(k*Math.PI)*.35;});R.at(900,()=>{const p0=I.position.clone();tween(1.0,k=>{I.position.set(p0.x*(1-k),Math.sin(k*Math.PI)*1.1,p0.z*(1-k));I.scale.setScalar(is0*(.6+.4*k));I.rotation.y=k*Math.PI*2;}).then(()=>{sq(I);boom(I);});});}};
  const run=()=>{const R2=runner(st);R=R2;clean();L.children.slice().forEach(c=>{if(c!==L.userData.face)L.remove(c);});I.children.slice().forEach(c=>{if(c.userData.bub)I.remove(c);});L.visible=false;I.visible=false;T1.visible=false;WS.forEach(w=>{w.o.visible=false;w.t.visible=false;});
    if(set.still){L.visible=true;I.visible=true;T1.visible=true;WS.forEach(w=>{w.o.visible=true;w.o.scale.setScalar(w.s);w.o.position.set(0,0,0);w.t.visible=true;});return;}
    const D0=set.intro?3200:0;if(set.intro){const it=tag(set.intro,{size:.42,bg:'#ffffff',border:col,color:'#1b2236'});it.position.set(0,1.5,-2.2);g2.add(it);ext.push(it);growS(it,.7);R2.at(2800,()=>{tween(.4,k=>{it.scale.multiplyScalar(.8);}).then(()=>{it.visible=false;});});}
    const RA=R2.at;R={at:RA,ok:R2.ok};R2.at=(ms,fn)=>RA(ms+D0,fn);
    R2.at(400,letterIn);R2.at(3000,itemIn);
    R2.at(5000,()=>{growS(T1,.6);});
    WS.forEach((w,j)=>R2.at(6200+j*1500,()=>{w.o.visible=true;w.o.position.set(0,1.4,0);w.o.scale.setScalar(.001);tween(.8,k=>{w.o.scale.setScalar(Math.max(.001,w.s*back(k)));w.o.position.y=1.4*(1-k*k);}).then(()=>{sq(w.o);growS(w.t,.4);});}));
    R2.at(6200+WS.length*1500+600,()=>{[L,I].concat(WS.map(w=>w.o)).forEach((o,j)=>R2.at(j*260,()=>bob(o,.35)));});
    R2.at(6200+WS.length*1500+2600,()=>{tween(1.2,k=>{L.rotation.y=ease(k)*Math.PI*2;});boom(L);});};
  /* labels: tag() makes sprites at their natural scale; remember it */
  [T1].concat(WS.map(w=>w.t)).forEach(t=>{t.userData.s0v=t.scale.clone();});
  run();let t0=0;
  return {tick:(dt,t)=>{t0+=dt;if(L.visible)LB.rotation.y=Math.sin(t*.7)*.12;},play:run,controls:()=>st.round?[]:[{t:'Again!',go:true,fn:run}]};};
C.show.bare=1;

/* ---------- ABC: the whole alphabet hides in little gift boxes. Letters we know are already out;
   today's letter comes out in a funny way, grows big, and the row says the order out loud. ---------- */
C.abc=function(g2,st,h,set){mat(g2,4.4,2.3,-2.3,'#f3f0ff');const R=runner(st);const idx=set.idx||0;const low=!!set.low;const AZ='ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(c=>low?c.toLowerCase():c);
  const rows=[9,9,8];const spots=[];let n=0;rows.forEach((cnt,r)=>{for(let c=0;c<cnt;c++){spots.push([(c-(cnt-1)/2)*.46,-3.1+r*.62]);n++;}});
  const boxes=AZ.map((ch,j)=>{const g=giftBox(['#ffadad','#ffd6a5','#fdffb6','#caffbf','#9bf6ff','#a0c4ff','#bdb2ff','#ffc6ff'][j%8],.62);at(g,spots[j][0],0,spots[j][1]);g2.add(g);
    const L=txt3(ch,COL[j%8],{size:.3,depth:.12});L.position.set(spots[j][0],.3,spots[j][1]);L.visible=j<idx;g2.add(L);
    if(j<idx){g.userData.lid.visible=false;g.scale.y=.4;}return {g,L,j};});
  const me=boxes[idx];const big=txt3(AZ[idx],set.col||'#ff6b6b',{size:1.05,depth:.3});big.visible=false;g2.add(big);
  const say=tag(set.line||AZ[idx]+'!',{size:.32,bg:'#ffffff',border:set.col||'#ff6b6b'});say.position.set(0,1.95,-2.6);say.visible=false;g2.add(say);
  const style=set.style!=null?set.style:idx%4;
  const fnv=t=>{let h=0x811c9dc5;for(let i=0;i<t.length;i++){h^=t.charCodeAt(i);h=Math.imul(h,0x01000193)>>>0;}return ('0000000'+h.toString(16)).slice(-8);};
  const cue=set.cue&&window.KCUE&&window.VOICE&&window.VOICE[fnv(set.cue)]?window.KCUE[fnv(set.cue)]:null;const T=cue!=null?Math.round(cue*1000)+150:(set.revealAt||2100);let waiting=true;
  const run=()=>{const R2=runner(st);waiting=true;const b=me.g,lid=b.userData.lid;lid.visible=true;lid.position.set(0,.47,0);lid.rotation.set(0,0,0);b.visible=true;b.scale.setScalar(.62);me.L.visible=false;big.visible=false;say.visible=false;
    boxes.forEach(x=>{if(x.j<idx){x.L.visible=true;x.L.position.y=.3;}});
    /* 1: the closed box wiggles, getting excited */
    R2.at(Math.max(300,T-1700),()=>{waiting=false;boxes.forEach(x=>{if(x.j>=idx)x.g.position.y=0;});tween(1.6,k=>{b.rotation.z=Math.sin(k*Math.PI*8)*.18*(1-k*.3);b.position.y=Math.abs(Math.sin(k*Math.PI*6))*.06;}).then(()=>{b.rotation.z=0;b.position.y=0;});});
    /* 2: out it comes! */
    R2.at(T,()=>{const p=me.L.position;me.L.visible=true;me.L.scale.setScalar(1);
      if(style===0){tween(.7,k=>{lid.position.y=.47+k*2.2;lid.rotation.x=k*6;});me.L.position.y=.1;tween(1.2,k=>{me.L.position.y=.1+Math.abs(Math.sin(k*Math.PI*3))*.8*(1-k)+.2*k;}).then(()=>boom(me.L));}
      else if(style===1){tween(.35,k=>b.scale.setScalar(.62*(1+k*.5))).then(()=>{boom(b);b.visible=false;me.L.position.y=.3;tween(1.2,k=>{me.L.rotation.z=Math.sin(k*Math.PI*6)*.35*(1-k);});});}
      else if(style===2){tween(.4,k=>{lid.position.y=.47+k*.25;});me.L.position.y=.05;tween(.4,k=>{me.L.position.y=.05+k*.25;});
        R2.at(800,()=>{tween(.3,k=>{lid.position.y=.72-k*.25;me.L.position.y=.3-k*.25;});});
        R2.at(1500,()=>{tween(.6,k=>{lid.position.y=.47+k*2;lid.position.x=k*1.2;lid.rotation.z=-k*4;});tween(1.0,k=>{me.L.position.y=.05+Math.sin(k*Math.PI)*1.3+k*.25;me.L.rotation.x=k*Math.PI*2;}).then(()=>{me.L.rotation.x=0;boom(me.L);});});}
      else{tween(.5,k=>{lid.position.y=.47+k*.6;lid.rotation.z=k*.6;});me.L.position.y=.1;tween(1.6,k=>{me.L.position.y=.1+Math.sin(k*Math.PI)*2.2+k*.2;me.L.rotation.y=k*Math.PI*4;}).then(()=>{me.L.rotation.y=0;boom(me.L);});}});
    /* 3: it grows big at the front and we say where it lives in the alphabet */
    R2.at(T+2200,()=>{big.visible=true;big.position.copy(me.L.position);big.scale.setScalar(.3);const p0=big.position.clone(),to=V(0,.15,-1.55);me.L.visible=false;
      tween(1.2,k=>{const e=ease(k);big.position.set(p0.x+(to.x-p0.x)*e,p0.y+(to.y-p0.y)*e+Math.sin(k*Math.PI)*.6,p0.z+(to.z-p0.z)*e);big.scale.setScalar(.3+.7*e);}).then(()=>{boom(big);growS(say,.5);});});
    /* 4: everyone we know hops in order, A, B, C… up to today's letter */
    R2.at(T+4500,()=>{boxes.slice(0,idx).forEach((x,j)=>R2.at(j*Math.max(160,700-idx*25),()=>bob(x.L,.3)));});
    R2.at(T+4700+idx*Math.max(160,700-idx*25),()=>{const p0=big.position.clone(),to=me.L.position.clone();tween(1.2,k=>{const e=ease(k);big.position.set(p0.x+(to.x-p0.x)*e,p0.y+(to.y-p0.y)*e+Math.sin(k*Math.PI)*.8,p0.z+(to.z-p0.z)*e);big.scale.setScalar(1-.7*e);}).then(()=>{big.visible=false;me.L.visible=true;me.L.position.y=.3;bob(me.L,.4);if(style!==1){tween(.4,k=>b.scale.y=.62*(1-.6*k));lid.visible=false;}});});};
  say.userData.s0v=say.scale.clone();run();
  return {tick:(dt,t)=>{if(big.visible)big.rotation.y=Math.sin(t*.9)*.2;if(waiting)boxes.forEach((x,j)=>{if(j>=idx&&x.g.visible)x.g.position.y=Math.max(0,Math.sin(t*3+j*1.7))*.05;});},play:run,controls:()=>st.round?[]:[{t:'Again!',go:true,fn:run}]};};
C.abc.bare=1;

/* PATH, letter version: the duck may only step on stones with today's letter */
const oldPath=C.path;
C.path=function(g2,st,h,set){if(!set.only)return oldPath(g2,st,h,set);mat(g2,4.4,2.3,-2.3,'#d0ebff');
  const cols=set.cols||5,rows=3,stones=[];const right=[];for(let c=0;c<cols;c++)right.push(Math.floor(Math.random()*rows));
  const others=set.extra||[];let oi=0;const isPlay=()=>h.isPlay?h.isPlay():false;
  for(let c=0;c<cols;c++)for(let r=0;r<rows;r++){const ok=right[c]===r;const t=ok?set.only:others[(oi++)%Math.max(1,others.length)];const s=new THREE.Group();
    const d=mk(G('kk_stone',()=>new THREE.CylinderGeometry(.33,.37,.12,28)),lam(['#ffd8a8','#d3f9d8','#ffe3e3','#e5dbff'][(c+r)%4]),20);d.position.y=.06;s.add(d);
    const L=make('txt:'+t+':'+COL[(c*3+r)%8],.62);L.position.y=.12;s.add(L);s.userData={t,ok,c};at(s,-1.45+c*(2.9/(cols-1)),0,-3.0+r*.72);g2.add(s);stones.push(s);}
  const hero=make(set.who||'duck',1.0);at(hero,-2.15,0,-2.28);g2.add(hero);const goal=make(set.goal||'house',1.0);at(goal,2.15,0,-2.28);g2.add(goal);
  let k=0;let busy=false;
  stones.forEach(s=>A.drag(s,{tap:()=>{const u=s.userData;if(busy)return;if(u.ok&&u.c===k){busy=true;k++;A.pop&&A.pop();P.hop(hero,V(s.position.x,.12,s.position.z),.6,.5);s.children[0].material=lam('#ffd43b');A.later(()=>{busy=false;},520);
      if(k===cols){A.later(()=>{P.hop(hero,V(goal.position.x-.3,0,goal.position.z),.8,.6).then(()=>{boom(goal);if(isPlay())A.later(()=>h.win(set.ok),400);});},650);}}
    else if(u.ok&&u.c<k){}
    else if(u.ok){X.wobble(s);if(isPlay())h.miss(set.hint||'Hop to the closest '+set.only+' first!');}
    else{X.wobble(s);if(isPlay())h.miss(set.hint||'Only hop on '+set.only+'!');}}}));
  return {};};
C.path.bare=1;
})();
/* ===== Kindergarten games, part 3: join the dots, the cup trick, shadow match and hide-and-seek ===== */
(function(){
"use strict";
const P=window.PM;if(!P||P.failed||!P.K2||!P.PKX)return;
const {THREE,V,G,mk,lam,A,tween}=P;const C=P.K2.CUSTOM;const X=P.PKX;const {make,boom,mat,tag,COL,at,wobble}=X;
const ease=k=>1-Math.pow(1-k,3),back=k=>{const c=1.9;return 1+(c+1)*Math.pow(k-1,3)+c*Math.pow(k-1,2);};
const isPlay=h=>h.isPlay?h.isPlay():false;const win=(h,set,ms)=>{if(isPlay(h))A.later(()=>h.win(set.ok),ms||600);};
const bob=(o,ht,d)=>{const y=o.position.y;return tween(d||.45,k=>{o.position.y=y+Math.sin(k*Math.PI)*(ht||.3);}).then(()=>{o.position.y=y;});};
const lbl=(t,i,s)=>make(/^[*]?(txt|shape|solid|balloon|paint|dots|num|block):/.test(t)?t:(String(t).length<=2?'txt:'+t+':'+COL[(i||0)%8]:t),s||.62);
const tube=(g2,a,b,c,r)=>{const d=b.clone().sub(a);const m=mk(G('kk_tb'+(r||.045),()=>new THREE.CylinderGeometry(r||.045,r||.045,1,10)),lam(c),0);m.scale.y=Math.max(.01,d.length());m.position.copy(a).add(b).multiplyScalar(.5);m.quaternion.setFromUnitVectors(V(0,1,0),d.normalize());g2.add(m);return m;};

/* ---------- DOTS: join the dots in order (A, B, C… or 1, 2, 3…) and a picture pops out of the middle ---------- */
const OUT={star:t=>{const a=Math.PI/2+t*Math.PI*2,r=(Math.round(t*10)%2)?.55:1;return [Math.cos(a)*r,Math.sin(a)*r];},
  circle:t=>[Math.cos(Math.PI/2+t*Math.PI*2),Math.sin(Math.PI/2+t*Math.PI*2)],
  heart:t=>{const a=t*Math.PI*2;return [Math.pow(Math.sin(a),3)*1.05,(13*Math.cos(a)-5*Math.cos(2*a)-2*Math.cos(3*a)-Math.cos(4*a))/16];},
  house:t=>{const P2=[[0,1],[.9,.25],[.9,-.9],[-.9,-.9],[-.9,.25]];const f=t*5,i=Math.floor(f)%5,k=f-Math.floor(f);const a=P2[i],b=P2[(i+1)%5];return [a[0]+(b[0]-a[0])*k,a[1]+(b[1]-a[1])*k];}};
C.dots=function(g2,st,h,set){mat(g2,4.4,2.3,-2.3,'#fffbe6');const seq=(set.seq||['A','B','C','D','E']).map(String);const n=seq.length;const sh=OUT[set.shape]||OUT[['star','circle','heart','house'][(set.seed||0)%4]];
  const cx=0,cz=-2.3,rx=1.25,rz=.95;const pts=seq.map((t,i)=>{const [x,y]=set.shape==='star'?OUT.star(i/n):sh(i/n);return V(cx+x*rx,.1,cz-y*rz);});
  const dots=seq.map((t,i)=>{const g=new THREE.Group();g.position.copy(pts[i]);g.position.y=0;g2.add(g);const d=mk(G('kk_dd',()=>new THREE.CylinderGeometry(.2,.22,.08,26)),lam('#ffffff'),20);d.position.y=.04;g.add(d);
    const ring=mk(G('kk_ddr',()=>new THREE.TorusGeometry(.21,.025,8,30)),lam('#1b2236'),0);ring.rotation.x=Math.PI/2;ring.position.y=.08;g.add(ring);const L=lbl(t,i,.68);L.position.y=.08;g.add(L);g.userData={i,d,L};return g;});
  const hid=make(set.item||'star',1.3);at(hid,cx,-1.0,cz);hid.visible=false;g2.add(hid);let nx=0;const col=set.col||'#ff6b6b';
  const finish=()=>{tube(g2,pts[n-1],pts[0],col);dots.forEach((d,j)=>A.later(()=>bob(d.userData.L,.3),j*90));A.later(()=>{hid.visible=true;tween(1.0,k=>{hid.position.y=-1+back(k);}).then(()=>{boom(hid);win(h,set,700);});},n*90+200);};
  dots.forEach((g,i)=>A.drag(g,{tap:()=>{if(nx>=n)return;if(i===nx){A.pop&&A.pop();g.userData.d.material=lam('#ffd43b');bob(g.userData.L,.35);if(i>0)tube(g2,pts[i-1],pts[i],col);nx++;if(nx===n)finish();}
    else if(i>nx){wobble(g);if(isPlay(h))h.miss(set.hint||('Find '+seq[nx]+' next!'));}}}));
  return {tick:(dt,t)=>{dots.forEach((g,i)=>{const s=i===nx?1.12+Math.sin(t*6)*.12:1;g.scale.setScalar(s);});}};};
C.dots.bare=1;

/* ---------- CUPS: watch the cup! The letter hides under a cup, the cups slide around slowly, then find it ---------- */
C.cups=function(g2,st,h,set){mat(g2,4.4,2.3,-2.3,'#e6fcf5');const items=[set.target].concat(set.others||[]).slice(0,3);const N=items.length;const xs=[-1.3,0,1.3].slice(0,N);const z=-2.3;
  const cupCol=set.cupCol||'#ff8787';const things=items.map((it,i)=>{const o=lbl(it,i,.7);at(o,xs[i],0,z);g2.add(o);return o;});
  const cups=items.map((it,i)=>{const g=new THREE.Group();const c=mk(G('kk_cup',()=>new THREE.CylinderGeometry(.34,.46,.8,30,1,true)),new THREE.MeshPhongMaterial({color:cupCol,side:THREE.DoubleSide,shininess:60}),20);c.position.y=.4;g.add(c);
    const top=mk(G('kk_cupt',()=>new THREE.CircleGeometry(.34,30)),lam(cupCol),0);top.rotation.x=-Math.PI/2;top.position.y=.8;g.add(top);const kn=mk(G('kk_cupk',()=>new THREE.SphereGeometry(.09,14,10)),lam('#ffd43b'),0);kn.position.y=.86;g.add(kn);
    const band=mk(G('kk_cupb',()=>new THREE.TorusGeometry(.4,.025,6,30)),lam('#ffffff'),0);band.rotation.x=Math.PI/2;band.position.y=.2;g.add(band);at(g,xs[i],1.6,z);g.userData={slot:i,item:i};g2.add(g);return g;});
  let ready=false,done=false;const slotOf=[0,1,2].slice(0,N);/* slotOf[item]=slot */
  const lift=(c,up)=>tween(.45,k=>{c.position.y=(up?k:1-k)*1.0;});
  const swap=(a,b,d)=>{const ca=cups.find(c=>c.userData.slot===a),cb=cups.find(c=>c.userData.slot===b);const xa=xs[a],xb=xs[b];
    return tween(d,k=>{const e=ease(k);ca.position.x=xa+(xb-xa)*e;ca.position.z=z+Math.sin(k*Math.PI)*.55;cb.position.x=xb+(xa-xb)*e;cb.position.z=z-Math.sin(k*Math.PI)*.55;}).then(()=>{ca.userData.slot=b;cb.userData.slot=a;ca.position.z=cb.position.z=z;});};
  /* 1: show the toys, 2: cups come down, 3: slow shuffles */
  A.later(()=>{things.forEach((o,i)=>A.later(()=>bob(o,.3),i*250));},300);
  A.later(()=>{Promise.all(cups.map(c=>tween(.7,k=>{c.position.y=1.6*(1-ease(k));}))).then(()=>{things.forEach(o=>o.visible=false);
    const moves=set.moves||(N<3?2:3+(set.level||0));let p=Promise.resolve();for(let m=0;m<moves;m++){const pair=N<3?[0,1]:[[0,1],[1,2],[0,2]][Math.floor(Math.random()*3)];p=p.then(()=>swap(pair[0],pair[1],set.speed||1.1));}
    p.then(()=>{ready=true;cups.forEach(c=>{const it=c.userData.item;things[it].position.x=xs[c.userData.slot];});});});},1600);
  cups.forEach(c=>A.drag(c,{tap:()=>{if(!ready||done||c.userData.open)return;const it=c.userData.item;const o=things[it];o.position.x=xs[c.userData.slot];o.visible=true;A.pop&&A.pop();
    if(it===0){done=true;c.userData.open=true;lift(c,true).then(()=>{bob(o,.5);boom(o);win(h,set,500);});}
    else{c.userData.open=true;lift(c,true).then(()=>{wobble(o);A.later(()=>{lift(c,false).then(()=>{o.visible=false;c.userData.open=false;});},900);});if(isPlay(h))h.miss(set.hint||'Not this one. Try another cup!');}}}));
  return {tick:(dt,t)=>{if(ready&&!done)cups.forEach((c,i)=>{c.rotation.z=Math.sin(t*3+i)*.03;});}};};
C.cups.bare=1;

/* ---------- SHADOW: which one fits the shadow? Tap it and it flies into its shadow and lights up ---------- */
C.shadow=function(g2,st,h,set){mat(g2,4.4,2.3,-2.3,'#f8f9fa');const choices=set.choices||[];const tgt=String(choices.find(c=>String(c)[0]==='*')||choices[0]).replace('*','');
  const wall=mk(G('kk_wall',()=>new THREE.BoxGeometry(1.9,1.3,.08)),lam('#fff3bf'),20);at(wall,0,.65,-3.25);g2.add(wall);const fr=mk(G('kk_wallf',()=>new THREE.BoxGeometry(2.02,1.42,.06)),lam('#e67700'),0);at(fr,0,.65,-3.3);g2.add(fr);
  const sh=lbl(tgt,0,set.big||1.0);sh.traverse(o=>{if(o.isMesh){o.material=new THREE.MeshBasicMaterial({color:'#343a40'});o.castShadow=false;}});sh.scale.z*=.15;at(sh,0,.2,-3.15);g2.add(sh);
  const shp=sh.position.clone(),shs=sh.scale.clone();const n=choices.length;let done=false;
  choices.forEach((c,i)=>{const o=lbl(String(c),i+1,set.big?set.big*.62:.72);const x=(i-(n-1)/2)*1.25;at(o,x,0,-1.55);g2.add(o);const ok=String(c)[0]==='*';const p0=o.position.clone(),s0=o.scale.clone();
    A.drag(o,{tap:()=>{if(done)return;A.pop&&A.pop();
      if(ok){done=true;tween(1.0,k=>{const e=ease(k);o.position.set(p0.x+(shp.x-p0.x)*e,p0.y+(shp.y+.02-p0.y)*e+Math.sin(k*Math.PI)*.9,p0.z+(shp.z+.12-p0.z)*e);const f=1+(shs.x/s0.x-1)*e;o.scale.set(s0.x*f,s0.y*f,s0.z*f);}).then(()=>{sh.visible=false;boom(o);bob(o,.25);win(h,set,700);});}
      else{tween(.7,k=>{o.position.set(p0.x+(shp.x-p0.x)*Math.sin(k*Math.PI)*.45,p0.y+Math.sin(k*Math.PI)*.6,p0.z+(shp.z-p0.z)*Math.sin(k*Math.PI)*.45);}).then(()=>{o.position.copy(p0);wobble(o);});if(isPlay(h))h.miss(set.hint||'That one does not fit the shadow. Try again!');}}});});
  return {};};
C.shadow.bare=1;

/* ---------- PEEK: hide-and-seek. Letters peek out from behind things; find every one that is today's letter ---------- */
C.peek=function(g2,st,h,set){mat(g2,4.4,2.3,-2.3,'#ebfbee');const spots=[[-1.55,-2.95],[-.5,-3.05],[.55,-2.95],[1.6,-3.05],[-1.05,-1.95],[1.05,-1.95]];const hide=set.hide||['tree','house','tent','tree','mushroom','rock'];
  const who=(set.items||[]).slice(0,6);const need=who.filter(x=>String(x)[0]==='*').length;let got=0;
  const H=spots.map(([x,z],i)=>{const cover=make(hide[i%hide.length],i<4?1.35:1.05);at(cover,x,0,z);g2.add(cover);const it=who[i];if(it==null)return null;
    const o=lbl(String(it).replace('*',''),i,.62);at(o,x+.05,0,z-.32);o.userData.ok=String(it)[0]==='*';o.userData.base=o.position.clone();o.userData.ph=i*1.7;g2.add(o);
    const tap=()=>{if(o.userData.out)return;A.pop&&A.pop();const b=o.userData.base;
      if(o.userData.ok){o.userData.out=true;got++;tween(.8,k=>{o.position.set(b.x+.0,Math.sin(k*Math.PI)*1.0,b.z+.75*ease(k));}).then(()=>{boom(o);if(got>=need)win(h,set,600);});}
      else{o.userData.busy=1;tween(.5,k=>{o.position.x=b.x+.45*Math.sin(k*Math.PI);o.position.y=.25*Math.sin(k*Math.PI);}).then(()=>{wobble(o);o.userData.busy=0;});if(isPlay(h))h.miss(set.hint);}};
    A.drag(cover,{tap});A.drag(o,{tap});return o;});
  return {tick:(dt,t)=>{H.forEach((o,i)=>{if(!o||o.userData.out||o.userData.busy)return;const b=o.userData.base;const s=Math.max(0,Math.sin(t*.9+o.userData.ph));const pk=Math.pow(s,6);o.position.x=b.x+(i%2?-1:1)*pk*.5;o.position.y=pk*.25;});}};};
C.peek.bare=1;
})();
/* ===== Kindergarten games, part 4: rocket launch, bowling and the letter train ===== */
(function(){
"use strict";
const P=window.PM;if(!P||P.failed||!P.K2||!P.PKX)return;
const {THREE,V,G,mk,lam,A,tween}=P;const C=P.K2.CUSTOM;const X=P.PKX;const {make,boom,mat,tag,COL,at,wobble}=X;
const ease=k=>1-Math.pow(1-k,3),back=k=>{const c=1.9;return 1+(c+1)*Math.pow(k-1,3)+c*Math.pow(k-1,2);};
const isPlay=h=>h.isPlay?h.isPlay():false;const win=(h,set,ms)=>{if(isPlay(h))A.later(()=>h.win(set.ok),ms||600);};
const lbl=(t,i,s)=>make(/^[*]?(txt|shape|solid|paint|dots|num|block):/.test(t)?t:(String(t).length<=2?'txt:'+t+':'+COL[(i||0)%8]:t),s||.62);
const ok=t=>String(t)[0]==='*',un=t=>String(t).replace(/^\*/,'');
const phong=(c,sh)=>new THREE.MeshPhongMaterial({color:c,shininess:sh||50});
const puff=(g2,p,c)=>{for(let j=0;j<6;j++){const s=mk(G('kk_puff',()=>new THREE.SphereGeometry(.12,10,8)),lam(c||'#f1f3f5'),0);s.position.copy(p);g2.add(s);const dx=(Math.random()-.5)*.6,dz=(Math.random()-.5)*.4;
  tween(.9,k=>{s.position.set(p.x+dx*k,p.y+k*.25,p.z+dz*k);s.scale.setScalar(1+k*1.6);}).then(()=>g2.remove(s));}};

/* ---------- ROCKET: three rockets on their pads. Tap the right one: 3, 2, 1… blast off! ---------- */
function rocket(c){const g=new THREE.Group();const body=mk(G('kk_rb',()=>new THREE.CylinderGeometry(.26,.3,1.1,28)),phong('#f8f9fa',80),20);body.position.y=.85;g.add(body);
  const nose=mk(G('kk_rn',()=>new THREE.ConeGeometry(.26,.45,28)),phong(c,60),20);nose.position.y=1.62;g.add(nose);
  const win=mk(G('kk_rw',()=>new THREE.CylinderGeometry(.13,.13,.06,24)),phong('#74c0fc',120),0);win.rotation.x=Math.PI/2;win.position.set(0,1.0,.28);g.add(win);
  const rim=mk(G('kk_rwr',()=>new THREE.TorusGeometry(.14,.025,8,24)),phong(c),0);rim.position.set(0,1.0,.3);g.add(rim);
  [0,1,2].forEach(j=>{const f=mk(G('kk_rf',()=>new THREE.BoxGeometry(.05,.38,.3)),phong(c),20);const a=j*Math.PI*2/3+Math.PI/2;f.position.set(Math.cos(a)*.3,.42,Math.sin(a)*.3);f.rotation.y=-a;g.add(f);});
  const fl=mk(G('kk_rfl',()=>new THREE.ConeGeometry(.2,.55,18)),new THREE.MeshBasicMaterial({color:'#ff922b'}),0);fl.rotation.x=Math.PI;fl.position.y=.05;fl.visible=false;g.add(fl);g.userData.flame=fl;
  const pad=mk(G('kk_rpad',()=>new THREE.CylinderGeometry(.55,.62,.12,30)),phong('#868e96'),20);pad.position.y=.06;const PG=new THREE.Group();PG.add(pad);PG.add(g);g.position.y=.12;PG.userData.r=g;return PG;}
C.rocket=function(g2,st,h,set){mat(g2,4.4,2.3,-2.3,'#e7f5ff');const items=(set.items||[]).slice(0,3);const n=items.length;let done=false;
  const R=items.map((t,i)=>{const P2=rocket(['#ff6b6b','#4dabf7','#ffa94d'][i%3]);at(P2,(i-(n-1)/2)*1.5,0,-2.55);g2.add(P2);P2.scale.setScalar(.78);const L=lbl(un(t),i,.8);L.position.set(0,.14,.78);P2.add(L);P2.userData.lab=L;P2.userData.ok=ok(t);return P2;});
  R.forEach(P2=>A.drag(P2,{tap:()=>{if(done)return;const r=P2.userData.r;A.pop&&A.pop();
    if(P2.userData.ok){done=true;let k3=3;const cd=tag('3',{size:.5,bg:'#ffffff',border:'#ff6b6b'});cd.position.set(P2.position.x,2.0,P2.position.z);g2.add(cd);
      const step=()=>{if(k3>1){k3--;g2.remove(cd);const c2=tag(String(k3),{size:.5,bg:'#ffffff',border:'#ff6b6b'});c2.position.copy(cd.position);g2.add(c2);A.later(()=>g2.remove(c2),900);A.later(step,900);}else{r.userData.flame.visible=true;puff(g2,V(P2.position.x,.2,P2.position.z));
        tween(2.2,k=>{r.position.y=.12+k*k*7;r.rotation.y=k*3;r.userData.flame.scale.setScalar(1+Math.sin(k*40)*.25);if(Math.random()<.4)puff(g2,V(P2.position.x,.1+k*k*7*.9,P2.position.z),'#ffe066');}).then(()=>{boom(P2);win(h,set,200);});}};A.later(()=>{g2.remove(cd);step();},700);}
    else{const y0=r.position.y;tween(.7,k=>{r.position.x=Math.sin(k*Math.PI*10)*.06;r.position.y=y0+Math.sin(k*Math.PI)*.15;}).then(()=>{r.position.x=0;r.position.y=y0;});puff(g2,V(P2.position.x,.25,P2.position.z),'#adb5bd');if(isPlay(h))h.miss(set.hint||'Pfft! That rocket will not go. Try another!');}}}));
  return {tick:(dt,t)=>{R.forEach((P2,i)=>{if(!done)P2.userData.r.rotation.y=Math.sin(t*1.2+i)*.12;});}};};
C.rocket.bare=1;

/* ---------- BOWL: a bowling lane. Tap a pin with the right letter: the ball rolls and knocks it down ---------- */
function pin(){const g=new THREE.Group();const b=mk(G('kk_pin',()=>new THREE.LatheGeometry([[0,0],[.13,0],[.17,.18],[.15,.36],[.08,.5],[.07,.58],[.1,.68],[.07,.8],[0,.83]].map(p=>new THREE.Vector2(p[0],p[1])),24)),phong('#ffffff',90),20);g.add(b);
  const st=mk(G('kk_pins',()=>new THREE.CylinderGeometry(.088,.09,.05,24)),phong('#ff6b6b'),0);st.position.y=.55;g.add(st);return g;}
C.bowl=function(g2,st,h,set){mat(g2,4.4,2.3,-2.3,'#fff4e6');const lane=mk(G('kk_lane',()=>new THREE.BoxGeometry(3.6,.05,1.9)),phong('#e8b77d',40),0);at(lane,0,.04,-2.35);g2.add(lane);
  [-1,1].forEach(sd=>{const gu=mk(G('kk_gut',()=>new THREE.BoxGeometry(3.6,.1,.1)),phong('#adb5bd'),0);at(gu,0,.07,-2.35+sd*1.0);g2.add(gu);});
  const items=(set.items||[]).slice(0,6);const need=items.filter(ok).length;let got=0,busy=false;const pos=[[-.6,-2.95],[.6,-2.95],[-1.2,-2.95],[1.2,-2.95],[0,-2.95],[0,-2.95]];
  const xs=items.length<=4?[-1.35,-.45,.45,1.35]:[-1.5,-.9,-.3,.3,.9,1.5];
  const pins=items.map((t,i)=>{const p=pin();at(p,xs[i],.06,-3.0);g2.add(p);const L=lbl(un(t),i,.5);L.position.set(0,.95,0);p.add(L);p.userData.ok=ok(t);return p;});
  const ball=mk(G('kk_ball',()=>new THREE.SphereGeometry(.26,28,20)),phong(set.ballCol||'#7048e8',120),20);at(ball,0,.32,-1.45);g2.add(ball);const home=ball.position.clone();
  pins.forEach(p=>A.drag(p,{tap:()=>{if(busy||p.userData.down)return;busy=true;A.pop&&A.pop();const to=V(p.position.x,.32,p.position.z+.25);const f=ball.position.clone();
    tween(1.0,k=>{ball.position.lerpVectors(f,to,k*(p.userData.ok?1:.8));ball.rotation.x-=.25;},x=>x).then(()=>{
      if(p.userData.ok){p.userData.down=true;got++;const sx=Math.random()<.5?-1:1;tween(.6,k=>{p.rotation.x=-k*1.5;p.rotation.z=sx*k*.6;p.position.y=.06+Math.sin(k*Math.PI)*.4;p.position.z=-3.0-k*.35;});boom(p);
        A.later(()=>{ball.position.copy(home);busy=false;if(got>=need)win(h,set,300);},800);}
      else{wobble(p);const b0=ball.position.clone();tween(.8,k=>{ball.position.lerpVectors(b0,home,k);}).then(()=>{busy=false;});if(isPlay(h))h.miss(set.hint||'Oops! Roll at the right pin.');}});}}));
  return {tick:(dt,t)=>{if(!busy)ball.position.y=.32+Math.abs(Math.sin(t*2.5))*.05;}};};
C.bowl.bare=1;

/* ---------- TRAIN: load the crates with the right letter into the wagons; then the train goes choo-choo ---------- */
function engine(c){const g=new THREE.Group();const base=mk(G('kk_tbase',()=>new THREE.BoxGeometry(1.0,.14,.62)),phong('#343a40'),20);base.position.y=.22;g.add(base);
  const boiler=mk(G('kk_tboil',()=>new THREE.CylinderGeometry(.24,.24,.62,24)),phong(c,70),20);boiler.rotation.z=Math.PI/2;boiler.position.set(.16,.53,0);g.add(boiler);
  const cab=mk(G('kk_tcab',()=>new THREE.BoxGeometry(.42,.62,.6)),phong(c,70),20);cab.position.set(-.27,.6,0);g.add(cab);const roof=mk(G('kk_troof',()=>new THREE.BoxGeometry(.52,.07,.7)),phong('#343a40'),0);roof.position.set(-.27,.95,0);g.add(roof);
  const ch=mk(G('kk_tch',()=>new THREE.CylinderGeometry(.08,.11,.3,14)),phong('#343a40'),0);ch.position.set(.34,.9,0);g.add(ch);g.userData.chimney=ch;
  const wn=mk(G('kk_twin',()=>new THREE.BoxGeometry(.2,.2,.62)),phong('#ffe066',120),0);wn.position.set(-.27,.7,0);g.add(wn);
  [-.3,.05,.35].forEach(x=>[-1,1].forEach(z=>{const w=mk(G('kk_twh',()=>new THREE.CylinderGeometry(.14,.14,.06,20)),phong('#212529'),0);w.rotation.x=Math.PI/2;w.position.set(x,.15,z*.32);g.add(w);}));return g;}
function wagon(c){const g=new THREE.Group();const b=mk(G('kk_wag',()=>new THREE.BoxGeometry(.8,.3,.6)),phong(c,60),20);b.position.y=.37;g.add(b);
  [-.25,.25].forEach(x=>[-1,1].forEach(z=>{const w=mk(G('kk_twh',()=>new THREE.CylinderGeometry(.14,.14,.06,20)),phong('#212529'),0);w.rotation.x=Math.PI/2;w.position.set(x,.15,z*.32);g.add(w);}));return g;}
C.train=function(g2,st,h,set){mat(g2,4.4,2.3,-2.3,'#f4fce3');const T=new THREE.Group();g2.add(T);
  for(let i=0;i<9;i++){const sl=mk(G('kk_sleep',()=>new THREE.BoxGeometry(.12,.04,.8)),phong('#a0522d'),0);at(sl,-2.0+i*.5,.04,-2.95);g2.add(sl);}[-1,1].forEach(z=>{const r=mk(G('kk_rail',()=>new THREE.BoxGeometry(4.4,.05,.05)),phong('#868e96'),0);at(r,0,.07,-2.95+z*.3);g2.add(r);});
  const E=engine(set.col||'#e03131');E.position.x=1.2;T.add(E);const need=(set.items||[]).filter(ok).length;const wg=[...Array(need)].map((_,j)=>{const w=wagon(['#4dabf7','#ffd43b','#69db7c','#da77f2'][j%4]);w.position.x=.25-j*.92;T.add(w);return w;});at(T,0,0,-2.95);
  const items=(set.items||[]).slice(0,6);let got=0,done=false;
  const crates=items.map((t,i)=>{const c=new THREE.Group();const b=mk(G('kk_crate',()=>new THREE.BoxGeometry(.5,.42,.5)),phong('#d9a066',30),20);b.position.y=.21;c.add(b);
    const L=lbl(un(t),i,.52);L.position.set(0,.42,0);c.add(L);at(c,(i-(items.length-1)/2)*.72,0,-1.65);c.userData.ok=ok(t);g2.add(c);return c;});
  crates.forEach(c=>A.drag(c,{tap:()=>{if(done||c.userData.in)return;A.pop&&A.pop();
    if(c.userData.ok&&got<need){const w=wg[got++];c.userData.in=true;const p0=c.position.clone();const to=V(T.position.x+w.position.x,.52,T.position.z);
      tween(.8,k=>{c.position.set(p0.x+(to.x-p0.x)*k,p0.y+(to.y-p0.y)*k+Math.sin(k*Math.PI)*1.0,p0.z+(to.z-p0.z)*k);c.scale.setScalar(1-.25*k);}).then(()=>{g2.remove(c);c.position.set(0,.52,0);w.add(c);boom(w);
        if(got>=need){done=true;A.later(()=>{tween(3.0,k=>{T.position.x=k*k*6;if(Math.random()<.3)puff(g2,V(T.position.x+E.position.x+.34,1.1,T.position.z),'#f8f9fa');}).then(()=>win(h,set,100));},500);}});}
    else{wobble(c);if(isPlay(h))h.miss(set.hint||'That crate does not go on this train!');}}}));
  return {tick:(dt,t)=>{if(!done)E.userData.chimney.scale.y=1+Math.sin(t*6)*.08;}};};
C.train.bare=1;
})();
/* ===== LINE: a hungry friend on one side, a tidy line of pictures with their names on the other.
   Tap the pictures that start with the letter: they fly over (into the mouth, or onto the spider's web). ===== */
(function(){
"use strict";
const P=window.PM;if(!P||P.failed||!P.K2||!P.PKX)return;
const {THREE,V,G,mk,lam,A,tween}=P;const C=P.K2.CUSTOM;const X=P.PKX;const {make,boom,mat,COL,at,wobble}=X;
const isPlay=h=>h.isPlay?h.isPlay():false;
/* a name card: the first letter in its own colour, the rest in dark ink */
const NT={};
function nameTag(word,c1){const key=word+'|'+c1;let tex=NT[key];const fs=96,font='700 '+fs+'px "Andika", "Patrick Hand", "Comic Sans MS", sans-serif';
  const cv=document.createElement('canvas');const g0=cv.getContext('2d');g0.font=font;const w0=g0.measureText(word.slice(0,1)).width,w1=g0.measureText(word.slice(1)).width;const W=Math.ceil(w0+w1+70),H=150;
  if(!tex){cv.width=W;cv.height=H;const g=cv.getContext('2d');g.font=font;const r=40;g.beginPath();g.moveTo(r,6);g.arcTo(W-6,6,W-6,H-6,r);g.arcTo(W-6,H-6,6,H-6,r);g.arcTo(6,H-6,6,6,r);g.arcTo(6,6,W-6,6,r);g.closePath();g.fillStyle='#ffffff';g.fill();g.lineWidth=8;g.strokeStyle=c1;g.stroke();
    g.textBaseline='middle';g.fillStyle=c1;g.fillText(word.slice(0,1),35,H/2+6);g.fillStyle='#1b2236';g.fillText(word.slice(1),35+w0,H/2+6);tex=NT[key]=new THREE.CanvasTexture(cv);tex.userData={w:W,h:H};}
  const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:tex,depthWrite:false,transparent:true}));const hh=.3;sp.scale.set(hh*tex.userData.w/tex.userData.h,hh,1);sp.renderOrder=5;return sp;}
X.nameTag=nameTag;
function web(){const g=new THREE.Group();const m=lam('#ced4da');for(let i=1;i<=4;i++){const t=mk(G('kl_wr'+i,()=>new THREE.TorusGeometry(i*.17,.007,6,48)),m,0);g.add(t);}
  for(let i=0;i<8;i++){const a=i/8*Math.PI*2;const s=mk(G('kl_ws',()=>new THREE.CylinderGeometry(.006,.006,.72,4)),m,0);s.position.set(Math.cos(a)*.36,Math.sin(a)*.36,0);s.rotation.z=a+Math.PI/2;g.add(s);}return g;}
C.line=function(g2,st,h,set){mat(g2,4.4,2.3,-2.3,'#fff8e8');const items=(set.items||[]).slice(0,5);const n=items.length;const need=items.filter(t=>String(t)[0]==='*').length;let got=0,busy=false;
  const isWeb=set.kind==='web';const who=set.who||(isWeb?'spider':'bear');const c1=set.c1||'#e03131';
  const hero=(P.kLuxNow&&P.LUXM&&P.LUXM[who])?P.LUXM[who](isWeb?1:1.6):make(who,1.5);at(hero,-1.35,0,-2.3);hero.rotation.y=.5;g2.add(hero);
  let W=null;if(isWeb){W=web();W.scale.setScalar(1.25);W.position.set(-1.35,.95,-3.1);g2.add(W);hero.position.z=-2.55;}
  const mouth=()=>V(hero.position.x+.12,isWeb?.9:.95,hero.position.z+.25);
  const zs=[...Array(n)].map((_,i)=>-3.25+i*(2.0/Math.max(1,n-1)));const ys=[...Array(n)].map((_,i)=>(n-1-i)*.3);
  ys.forEach((y,i)=>{const st0=mk(G('kl_step'+i,()=>new THREE.BoxGeometry(2.2,y+.08,.5)),lam(['#ffe3e3','#fff3bf','#d3f9d8','#d0ebff','#e5dbff'][i%5]),20);at(st0,1.0,(y+.08)/2,zs[i]);g2.add(st0);});
  items.forEach((t,i)=>{const ok=String(t)[0]==='*';const nm=String(t).replace(/^\*/,'');const o=make(nm,.82);at(o,.4,ys[i]+.08,zs[i]);o.rotation.y=-.2;g2.add(o);
    const lab=nameTag(set.names&&set.names[nm]||nm,c1);lab.position.set(1.45,ys[i]+.36,zs[i]+.05);g2.add(lab);o.userData={ok,lab,y0:0};
    A.drag(o,{tap:()=>{if(busy||o.userData.gone)return;A.pop&&A.pop();
      if(ok){busy=true;o.userData.gone=1;got++;const p0=o.position.clone();const to=isWeb?V(W.position.x+(Math.random()-.5)*.6,W.position.y+(Math.random()-.5)*.6,W.position.z+.08):mouth();const s0=o.scale.x;
        tween(.9,k=>{o.position.set(p0.x+(to.x-p0.x)*k,p0.y+(to.y-p0.y)*k+Math.sin(k*Math.PI)*1.0,p0.z+(to.z-p0.z)*k);o.scale.setScalar(s0*(isWeb?1-.45*k:1-.95*k));}).then(()=>{
          if(!isWeb){o.visible=false;const s=hero.scale.x;tween(.4,k=>{const f=Math.sin(k*Math.PI);hero.scale.set(s*(1+f*.12),s*(1-f*.1),s*(1+f*.12));}).then(()=>hero.scale.setScalar(s));}
          boom(isWeb?o:hero);tween(.3,k=>{lab.material.opacity=1-k;});busy=false;if(got>=need&&isPlay(h))A.later(()=>h.win(set.ok),700);});}
      else{wobble(o);if(isPlay(h))h.miss(set.hint||nm+' does not start with '+(set.letter||'that letter')+'. Try another!');}}});});
  return {tick:(dt,t)=>{if(!busy)hero.rotation.y=.5+Math.sin(t*1.5)*.08;}};};
C.line.bare=1;
})();
/* ===== Numbers (Junior K): the number show, put-N-on (candles on the cake), and find-the-group ===== */
(function(){
"use strict";
const P=window.PM;if(!P||P.failed||!P.K2||!P.PKX)return;
const {THREE,V,G,mk,lam,A,tween}=P;const C=P.K2.CUSTOM;const X=P.PKX;const {make,boom,mat,tag,COL,at,wobble}=X;
const isPlay=h=>h.isPlay?h.isPlay():false;const ease=k=>1-Math.pow(1-k,3),back=k=>{const c=1.9;return 1+(c+1)*Math.pow(k-1,3)+c*Math.pow(k-1,2);};
const fnv=t=>{let h=0x811c9dc5;for(let i=0;i<t.length;i++){h^=t.charCodeAt(i);h=Math.imul(h,0x01000193)>>>0;}return ('0000000'+h.toString(16)).slice(-8);};
const sq=(o,d)=>{const s=o.scale.x;return tween(d||.35,k=>{const f=Math.sin(k*Math.PI);o.scale.set(s*(1+f*.18),s*(1-f*.22),s*(1+f*.18));}).then(()=>o.scale.setScalar(s));};
const runner=st=>{const tok=(st._nTok=(st._nTok||0)+1);return {at:(ms,fn)=>A.later(()=>{if(st._nTok===tok)try{fn();}catch(e){console.error(e);}},ms)};};
/* NSHOW: the big number drops in, then the friends pop in one by one, in time with the counting voice. Nothing to tap. */
C.nshow=function(g2,st,h,set){mat(g2,4.4,2.3,-2.3,'#fff8e8');const n=set.n||1,col=set.col||'#ff6b6b';
  const NB=new THREE.Group();at(NB,-1.45,0,-2.55);g2.add(NB);const N=X.txt3(String(n),col,{size:1.15,depth:.4});NB.add(N);
  const PR=4,rows=Math.ceil(n/PR),sc=n<=4?.85:.62,dx=n<=4?.68:.6,dz=.62;const items=[...Array(n)].map((_,k)=>{const r=Math.floor(k/PR),c=k%PR,cn=Math.min(PR,n-r*PR);const o=make(set.item,sc);at(o,.75+(c-(cn-1)/2)*dx,0,-2.3+(r-(rows-1)/2)*dz);o.visible=false;g2.add(o);o.userData.s0=o.scale.x;return o;});
  const cue=set.cue&&window.KCUE&&window.VOICE&&window.VOICE[fnv(set.cue)]?window.KCUE[fnv(set.cue)]:null;const t0=Array.isArray(cue)?cue[0]*1000:2600,dur=Array.isArray(cue)?cue[1]*1000:n*800;
  const run=()=>{const R=runner(st);N.visible=true;N.position.set(0,3,0);items.forEach(o=>o.visible=false);
    tween(1.0,k=>{N.position.y=3*(1-k*k);}).then(()=>{sq(N,.45);boom(N);});
    if(set.still){N.position.y=0;items.forEach(o=>{o.visible=true;o.scale.setScalar(o.userData.s0);});return;}
    items.forEach((o,k)=>R.at(t0+dur*(k/n)+80,()=>{o.visible=true;o.scale.setScalar(.001);o.position.y=.8;tween(.55,q=>{o.scale.setScalar(Math.max(.001,o.userData.s0*back(q)));o.position.y=.8*(1-q*q);}).then(()=>sq(o,.3));boom(o);}));
    R.at(t0+dur+700,()=>{items.forEach((o,k)=>R.at(k*110,()=>{const y=o.position.y;tween(.45,q=>{o.position.y=y+Math.sin(q*Math.PI)*.35;});}));tween(1.2,k=>{N.rotation.y=ease(k)*Math.PI*2;});});};
  run();return {tick:(dt,t)=>{N.rotation.z=Math.sin(t*1.1)*.04;},play:run,controls:()=>st.round?[]:[{t:'Again!',go:true,fn:run}]};};
C.nshow.bare=1;

/* example show: the things pop in one by one, each exactly when the voice names it */
C.exshow=function(g2,st,h,set){mat(g2,4.4,2.3,-2.3,'#fff8e8');const its=(set.items||[]).slice(0,4),n=its.length,sp=set.sp||1.45;
  const objs=its.map((it,k)=>{const o=make(it,set.s||1.05);at(o,(k-(n-1)/2)*sp,0,-2.25);o.visible=false;g2.add(o);o.userData.s0=o.scale.x;A.drag(o,{instant:true,tap:()=>{if(!o.visible)return;const y=o.position.y;tween(.45,q=>{o.position.y=y+Math.sin(q*Math.PI)*.4;});sq(o,.3);}});return o;});
  const cue=set.cue&&window.KCUE&&window.VOICE&&window.VOICE[fnv(set.cue)]?window.KCUE[fnv(set.cue)]:null;const ts=cue&&cue.ex?cue.ex.map(x=>x*1000):its.map((_,k)=>2600+k*1300);
  const run=()=>{const R=runner(st);objs.forEach(o=>o.visible=false);
    if(set.still){objs.forEach(o=>{o.visible=true;o.scale.setScalar(o.userData.s0);});return;}
    objs.forEach((o,k)=>R.at((ts[k]||0)+60,()=>{o.visible=true;o.scale.setScalar(.001);o.position.y=.9;tween(.6,q=>{o.scale.setScalar(Math.max(.001,o.userData.s0*back(q)));o.position.y=.9*(1-q*q);}).then(()=>sq(o,.3));boom(o);}));
    R.at((ts[n-1]||0)+1500,()=>objs.forEach((o,k)=>R.at(k*130,()=>{const y=o.position.y;tween(.45,q=>{o.position.y=y+Math.sin(q*Math.PI)*.35;});})));};
  run();return {tick:(dt,t)=>{objs.forEach((o,k)=>{if(o.visible)o.rotation.y=Math.sin(t*.9+k)*.18;});},play:run,controls:()=>st.round?[]:[{t:'Again!',go:true,fn:run}]};};
C.exshow.bare=1;
/* PUTN: put exactly N things on the cake (candles) or in the basket. Every candle works; it is done at N. */
C.putn=function(g2,st,h,set){mat(g2,4.4,2.3,-2.3,'#fff4e6');const n=set.n||3,extra=set.extra==null?2:set.extra;const cake=set.on==='cake';
  const T=make(cake?'cake':'basket',cake?1.9:1.6);at(T,-1.0,0,-2.6);g2.add(T);let got=0,busy=false;
  const tot=n+extra,cols=Math.min(tot,6),rows=Math.ceil(tot/6);const spots=[...Array(n)].map((_,k)=>{const a=k/Math.max(1,n)*Math.PI*2;const r=n===1?0:(n<=6?.28:.34);return V(T.position.x+Math.cos(a)*r,cake?1.02:.5,T.position.z+Math.sin(a)*r*.8);});
  const pile=[...Array(tot)].map((_,k)=>{const o=make(set.item||'candle',set.s||.62);at(o,.5+(k%3)*.55,0,-3.0+Math.floor(k/3)*.62);g2.add(o);return o;});
  const flame=p=>{const f=mk(G('kn_fl',()=>new THREE.SphereGeometry(.05,12,10)),new THREE.MeshBasicMaterial({color:'#ffd43b'}),0);f.scale.set(1,1.7,1);f.position.copy(p).add(V(0,.32,0));g2.add(f);f.userData.noLux=1;return f;};
  const fl=[];pile.forEach(o=>A.drag(o,{tap:()=>{if(busy||o.userData.used||got>=n)return;busy=true;o.userData.used=1;A.pop&&A.pop();const to=spots[got];got++;const p0=o.position.clone();const s0=o.scale.x;
    tween(.7,k=>{o.position.set(p0.x+(to.x-p0.x)*k,p0.y+(to.y-p0.y)*k+Math.sin(k*Math.PI)*.9,p0.z+(to.z-p0.z)*k);if(!cake)o.scale.setScalar(s0*(1-.35*k));}).then(()=>{if(cake)fl.push(flame(o.position));boom(o);busy=false;
      if(got>=n){const c=tag(String(n)+'!',{size:.45,bg:'#ffffff',border:'#ff6b6b'});c.position.set(T.position.x,1.9,T.position.z);g2.add(c);if(isPlay(h))A.later(()=>h.win(set.ok),900);}});}}));
  return {tick:(dt,t)=>{fl.forEach((f,i)=>{f.scale.y=1.6+Math.sin(t*12+i)*.3;});}};};
C.putn.bare=1;
/* GROUPS: the number on one side; little groups of things on shelves on the other side. Tap the group with that many. */
C.groups=function(g2,st,h,set){mat(g2,4.4,2.3,-2.3,'#f8f0fc');const n=set.n||3,col=set.col||'#ff6b6b';const counts=set.counts||[n,n+1,Math.max(1,n-1)];let done=false;
  const N=X.txt3(String(n),col,{size:1.3,depth:.4});at(N,-1.45,0,-2.4);g2.add(N);
  const zs=[-3.15,-2.35,-1.55];counts.forEach((c,i)=>{const y=(counts.length-1-i)*.32;const shelf=mk(G('kn_sh'+i,()=>new THREE.BoxGeometry(2.6,y+.08,.62)),lam(['#ffe3e3','#fff3bf','#d3f9d8'][i%3]),20);at(shelf,.85,(y+.08)/2,zs[i]);g2.add(shelf);
    const grp=new THREE.Group();at(grp,.85,y+.08,zs[i]);g2.add(grp);const sp=Math.min(.36,2.3/Math.max(1,c));for(let k=0;k<c;k++){const o=make(set.item||'apple',set.s||.42);o.position.set((k-(c-1)/2)*sp,0,0);grp.add(o);}
    const hit=mk(G('kn_hit',()=>new THREE.BoxGeometry(2.6,.5,.6)),new THREE.MeshBasicMaterial({visible:false}),0);hit.position.y=.25;hit.userData.noLux=1;grp.add(hit);
    A.drag(grp,{tap:()=>{if(done)return;A.pop&&A.pop();if(c===n){done=true;boom(grp);grp.children.forEach((o,k)=>{if(o===hit)return;A.later(()=>{const y0=o.position.y;tween(.4,q=>{o.position.y=y0+Math.sin(q*Math.PI)*.3;});},k*90);});tween(.8,k=>{N.rotation.y=k*Math.PI*2;});if(isPlay(h))A.later(()=>h.win(set.ok),900);}
      else{wobble(grp);if(isPlay(h))h.miss(set.hint||'Count again! We need '+n+'.');}}});});
  return {};};
C.groups.bare=1;
})();
