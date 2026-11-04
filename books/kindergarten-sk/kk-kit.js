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
  const finish=()=>{L.userData.face&&(L.userData.face.material=new THREE.MeshPhongMaterial({color:'#ffd43b',shininess:90}));boom(L);jump(L,.3);SAY(set.say||ch);if(set.item){const o=make(set.item,1.2);at(o,1.75,0,-2.2);g2.add(o);pop(o);}done(g2,h,set,900);};
  const tapDot=i=>{if(i!==nxt){if(i<nxt)return;wobble(balls[i]);if(isPlay(h)&&i>nxt+1)SAY('Find the glowing dot!');return;}A.pop&&A.pop();const d=dots[i];if(i>0&&!d.start)seg(dots[i-1].p,d.p);balls[i].material=lam(col);jump(balls[i],.15);nxt++;if(nxt>=dots.length)finish();};
  on((dt,t)=>{balls.forEach((b,i)=>{const s=i===nxt?1.25+Math.sin(t*6)*.25:1;b.scale.setScalar(s);});});
  const auto=()=>{if(nxt>=dots.length)return;let k=0;const step=()=>{if(nxt>=dots.length)return;tapDot(nxt);k++;A.later(step,170);};step();};
  return {tick:TK(st),play:auto,controls:()=>st.round?[]:[{t:'Show me how',go:true,fn:auto}]};};
C.trace.bare=1;

/* ---------- BUBBLES: bubbles float up with letters, numbers or pictures inside; pop the right ones ---------- */
C.bubbles=function(g2,st,h,set){const on=tickers(st);mat(g2,4.4,2.3,-2.3,'#e7f5ff');const items=set.items||[];const need=set.need||items.filter(x=>String(x)[0]==='*').length;let got=0;
  const bs=items.map((it,i)=>{const g=new THREE.Group();const sp=mk(G('kk_bub',()=>new THREE.SphereGeometry(.36,28,20)),new THREE.MeshPhongMaterial({color:'#a5d8ff',transparent:true,opacity:.32,shininess:120,specular:new THREE.Color('#ffffff'),depthWrite:false}),0);sp.castShadow=false;g.add(sp);
    const hl=mk(G('kk_bubh',()=>new THREE.SphereGeometry(.07,10,8)),new THREE.MeshBasicMaterial({color:'#ffffff'}),0);hl.position.set(-.14,.16,.25);g.add(hl);
    const c=make(it,.62);c.position.y=-.2;c.traverse(o=>{if(o.isMesh)o.castShadow=false;});g.add(c);g.userData.pk=c.userData.pk;
    const x=-1.75+((i*1.37)%1)*3.5+(i%2)*.2,z=-2.95+((i*.61)%1)*1.2;g.userData.base=[x,z,.25+(i%3)*.12,i*.37];g.position.set(x,((i*.53)%1)*2,z);g2.add(g);
    A.drag(g,{tap:()=>{if(g.userData.gone)return;const d=g.userData.pk;if(d.ok||!items.some(x=>String(x)[0]==='*')){g.userData.gone=1;boom(g);A.pop&&A.pop();SAY(d.lab);tween(.2,k=>g.scale.setScalar(Math.max(.01,1+k*.4-k*1.4)));A.later(()=>{g.visible=false;},220);got++;if(got>=need)done(g2,h,set,400);}
      else{wobble(g);SAY(d.lab);if(isPlay(h))h.miss(set.hint);}}});return g;});
  on((dt,t)=>bs.forEach(g=>{if(g.userData.gone)return;const [x,z,v,ph]=g.userData.base;g.position.y+=dt*v;if(g.position.y>2.1)g.position.y=-.1;g.position.x=x+Math.sin(t*1.2+ph*5)*.12;g.position.z=z;g.rotation.y=Math.sin(t+ph)*.3;}));
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
C.web=function(g2,st,h,set){const on=tickers(st);mat(g2,4.4,2.3,-2.3,'#f8f0fc');const sp=spider();at(sp,0,0,-2.3);g2.add(sp);
  const ring=mk(G('kk_web',()=>new THREE.TorusGeometry(.6,.008,4,40)),lam('#dee2e6'),0);ring.rotation.x=Math.PI/2;at(ring,0,.02,-2.3);g2.add(ring);
  const items=set.items||[];const n=items.length;const need=items.filter(x=>String(x)[0]==='*').length;let got=0;
  items.forEach((it,i)=>{const a=Math.PI*(0.15+0.7*i/Math.max(1,n-1));const o=make(it,1.0);at(o,-Math.cos(a)*1.75,0,-2.3-Math.sin(a)*.85+.55);g2.add(o);
    A.drag(o,{tap:()=>{if(o.userData.got)return;const d=o.userData.pk;SAY(d.lab);if(d.ok){o.userData.got=1;got++;const a0=V(0,.45,-2.3),b0=o.position.clone().add(V(0,.3,0));const m=mk(G('kk_silk',()=>new THREE.CylinderGeometry(.015,.015,1,6)),lam('#ffffff'),0);g2.add(m);
        tween(.45,k=>{const b=a0.clone().lerp(b0,k);const dd=b.clone().sub(a0);m.scale.y=Math.max(.01,dd.length());m.position.copy(a0).add(b).multiplyScalar(.5);m.quaternion.setFromUnitVectors(V(0,1,0),dd.normalize());}).then(()=>{jump(o,.35);boom(o);if(got>=need){jump(sp,.4);done(g2,h,set,500);}});}
      else{wobble(o);if(isPlay(h))h.miss(set.hint);}}});});
  on((dt,t)=>{sp.rotation.y=Math.sin(t*1.3)*.25;});A.drag(sp,{tap:()=>{jump(sp,.3);SAY(set.spiderSay||'Hello!');}});
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
})();
