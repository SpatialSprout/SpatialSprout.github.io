/* The Interactive Classroom — Kindergarten play kit. Big, bouncy, tappable 3D toys for four- and five-year-olds.
   Everything can be tapped: things hop, squeak, say their name, pop into confetti or jump into a basket.
   set.custom = 'tap'   : tap the right toys (pop them, collect them into a basket or an animal, or light them up)
              = 'count' : tap each toy to count it out loud; a ten frame can hold them
              = 'gap'   : a row with a missing piece (patterns, ABC, 1-2-3); tap the piece that fits
              = 'mix'   : two paint pots swirl into a new colour
   Items are written as strings: 'apple' (a 3D prop or picture), 'shape:circle:#ff6b6b', 'solid:cube:#4fb3ff',
   'balloon:A:#ff8a5b', 'block:b', 'dots:4', 'num:7', 'paint:#ff0000'. Add '*' at the start for a right answer. */
(function(){
"use strict";
const P=window.PM;if(!P||P.failed||!P.K2||!P.K2.CUSTOM)return;
const {THREE,V,G,mk,lam,label,A,tween}=P;const K2=P.K2,C=K2.CUSTOM;
const COL=['#ff6b6b','#4fb3ff','#5cc46a','#ffb347','#b07cff','#ff6bb5','#26c6b0','#ffd43b'];
const at=(o,x,y,z)=>{o.position.set(x,y,z);return o;};
const tag=(t,o)=>label(String(t),Object.assign({size:.26,bg:'#ffffff',border:'#1b2236'},o||{}));
const SAY=t=>{try{if(P.speak&&t)P.speak(String(t));else if(t)A.say(String(t));}catch(e){}};
const WORDS=['zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen','twenty'];
const tex=(draw,w,h)=>{const c=document.createElement('canvas');c.width=w||256;c.height=h||256;const g=c.getContext('2d');draw(g,c.width,c.height);const t=new THREE.CanvasTexture(c);t.anisotropy=4;return t;};
const FONT='700 170px "Patrick Hand","Comic Sans MS",cursive';
/* ---------- toy makers ---------- */
function shapeGeo(k,s){const sh=new THREE.Shape();s=s||.32;
  if(k==='circle'||k==='oval'){sh.absellipse(0,0,s*(k==='oval'?1.3:1),s*(k==='oval'?.8:1),0,Math.PI*2,false);}
  else if(k==='square'){sh.moveTo(-s,-s);sh.lineTo(s,-s);sh.lineTo(s,s);sh.lineTo(-s,s);}
  else if(k==='rectangle'){sh.moveTo(-s*1.45,-s*.75);sh.lineTo(s*1.45,-s*.75);sh.lineTo(s*1.45,s*.75);sh.lineTo(-s*1.45,s*.75);}
  else if(k==='triangle'){sh.moveTo(-s*1.1,-s*.85);sh.lineTo(s*1.1,-s*.85);sh.lineTo(0,s*1.05);}
  else if(k==='diamond'){sh.moveTo(0,-s*1.2);sh.lineTo(s*.85,0);sh.lineTo(0,s*1.2);sh.lineTo(-s*.85,0);}
  else if(k==='star'){for(let i=0;i<10;i++){const a=Math.PI/2+i*Math.PI/5,r=i%2?s*.48:s*1.12;const x=Math.cos(a)*r,y=Math.sin(a)*r;i?sh.lineTo(x,y):sh.moveTo(x,y);}}
  else if(k==='heart'){sh.moveTo(0,-s*.95);sh.bezierCurveTo(s*1.4,-s*.1,s*.75,s*1.05,0,s*.45);sh.bezierCurveTo(-s*.75,s*1.05,-s*1.4,-s*.1,0,-s*.95);}
  else if(k==='hexagon'){for(let i=0;i<6;i++){const a=i*Math.PI/3;i?sh.lineTo(Math.cos(a)*s,Math.sin(a)*s):sh.moveTo(Math.cos(a)*s,Math.sin(a)*s);}}
  sh.closePath();return new THREE.ExtrudeGeometry(sh,{depth:.1,bevelEnabled:true,bevelThickness:.03,bevelSize:.025,bevelSegments:3,curveSegments:24});}
function shapeToy(k,c){const g=new THREE.Group();const m=mk(G('pk_sh'+k,()=>shapeGeo(k)),lam(c||'#ff6b6b'),20);m.position.set(0,.42,-.05);m.rotation.x=-.18;g.add(m);
  const st=mk(G('pk_stand',()=>new THREE.CylinderGeometry(.16,.2,.06,20)),lam('#ffffff'),0);st.position.y=.03;g.add(st);
  const stem=mk(G('pk_stem',()=>new THREE.CylinderGeometry(.025,.025,.12,8)),lam('#ffffff'),0);stem.position.y=.09;g.add(stem);g.userData.face=m;return g;}
function solidToy(k,c){const g=new THREE.Group();const s=.27;let geo;
  if(k==='sphere'||k==='ball')geo=G('pk_sp',()=>new THREE.SphereGeometry(s,28,20));
  else if(k==='cube')geo=G('pk_cu',()=>new THREE.BoxGeometry(s*1.7,s*1.7,s*1.7));
  else if(k==='cone')geo=G('pk_co',()=>new THREE.ConeGeometry(s,s*2.3,28));
  else if(k==='cylinder')geo=G('pk_cy',()=>new THREE.CylinderGeometry(s*.85,s*.85,s*2,28));
  else if(k==='pyramid')geo=G('pk_py',()=>new THREE.ConeGeometry(s*1.15,s*2,4));
  else geo=G('pk_pr',()=>new THREE.CylinderGeometry(s,s,s*2,3));
  const m=mk(geo,lam(c||'#4fb3ff'),20);const bb=new THREE.Box3().setFromObject(m);m.position.y=-bb.min.y;if(k==='pyramid')m.rotation.y=Math.PI/4;g.add(m);return g;}
function letterTex(t,bg,fg){return tex((g,w,h)=>{g.fillStyle=bg;g.fillRect(0,0,w,h);g.strokeStyle='rgba(0,0,0,.12)';g.lineWidth=14;g.strokeRect(7,7,w-14,h-14);g.fillStyle=fg;g.font=String(t).length>2?'700 96px "Patrick Hand",cursive':String(t).length>1?'700 130px "Patrick Hand",cursive':FONT;g.textAlign='center';g.textBaseline='middle';g.fillText(t,w/2,h/2+8);});}
function blockToy(t,c){const g=new THREE.Group();const s=.46;const T=letterTex(t,c||'#ffe08a','#1b2236');const side=new THREE.MeshLambertMaterial({map:T});
  const m=new THREE.Mesh(G('pk_blk',()=>new THREE.BoxGeometry(s,s,s)),[side,side,new THREE.MeshLambertMaterial({color:c||'#ffe08a'}),side,side,side]);m.position.y=s/2;m.castShadow=true;g.add(m);g.userData.face=m;return g;}
function balloonToy(t,c){const g=new THREE.Group();const b=mk(G('pk_bal',()=>new THREE.SphereGeometry(.3,26,20)),new THREE.MeshPhongMaterial({color:c||'#ff6b6b',shininess:80}),0);b.scale.set(1,1.15,1);b.position.y=.82;b.castShadow=false;g.add(b);
  const knot=mk(G('pk_knot',()=>new THREE.ConeGeometry(.05,.07,8)),lam(c||'#ff6b6b'),0);knot.position.y=.46;knot.castShadow=false;knot.rotation.x=Math.PI;g.add(knot);
  const str=mk(G('pk_str',()=>new THREE.CylinderGeometry(.006,.006,.44,4)),lam('#7a8094'),0);str.position.y=.22;str.castShadow=false;g.add(str);
  if(t!=null&&t!==''){const L=tag(t,{size:.34,bg:'rgba(255,255,255,0)',border:'rgba(0,0,0,0)',color:'#ffffff'});L.position.set(0,.84,.3);g.add(L);}
  const ph=Math.random()*6;g.userData.tick=tt=>{b.position.y=.82+Math.sin(tt*1.6+ph)*.05;b.rotation.z=Math.sin(tt+ph)*.08;};g.userData.face=b;return g;}
function diceToy(n,c){const g=new THREE.Group();const s=.5;const T=tex((ctx,w,h)=>{ctx.fillStyle=c||'#ffffff';ctx.fillRect(0,0,w,h);ctx.strokeStyle='rgba(0,0,0,.15)';ctx.lineWidth=12;ctx.strokeRect(6,6,w-12,h-12);ctx.fillStyle='#1b2236';
    const P2={1:[[.5,.5]],2:[[.28,.28],[.72,.72]],3:[[.25,.25],[.5,.5],[.75,.75]],4:[[.28,.28],[.72,.28],[.28,.72],[.72,.72]],5:[[.25,.25],[.75,.25],[.5,.5],[.25,.75],[.75,.75]],6:[[.28,.22],[.72,.22],[.28,.5],[.72,.5],[.28,.78],[.72,.78]]}[n]||[];
    P2.forEach(([x,y])=>{ctx.beginPath();ctx.arc(x*w,y*h,w*.085,0,Math.PI*2);ctx.fill();});});
  const mat=new THREE.MeshLambertMaterial({map:T});const m=new THREE.Mesh(G('pk_die',()=>new THREE.BoxGeometry(s,s,s)),mat);m.position.y=s/2;m.castShadow=true;g.add(m);return g;}
function paintToy(c){const g=new THREE.Group();const pot=mk(G('pk_pot',()=>new THREE.CylinderGeometry(.24,.2,.26,24)),lam('#f1f3f5'),20);pot.position.y=.13;g.add(pot);
  const p=mk(G('pk_paint',()=>new THREE.CylinderGeometry(.22,.22,.03,24)),lam(c),0);p.position.y=.255;g.add(p);const drip=mk(G('pk_drip',()=>new THREE.SphereGeometry(.05,10,8)),lam(c),0);drip.position.set(.2,.2,.08);drip.scale.set(.7,1.4,.7);g.add(drip);g.userData.paint=p;return g;}
/* chunky glossy 3D letters and numbers (Andika Bold) */
let KF=null;const TGC={};
function txt3(str,c,o){o=o||{};if(!KF&&window.KFONT&&THREE.Font)KF=new THREE.Font(window.KFONT);const g=new THREE.Group();str=String(str);
  if(!KF){const b=blockToy(str,c);g.add(b);return g;}
  const LX=!!P.kLuxNow;const key=str+'|'+(o.size||1)+'|'+(o.depth||.28)+(LX?'|lux':'');let geo=TGC[key];
  if(!geo){const sz=o.size||1;geo=new THREE.TextGeometry(str,LX?{font:KF,size:sz,height:(o.depth||.28)*.75,curveSegments:16,bevelEnabled:true,bevelThickness:sz*.09,bevelSize:sz*.05,bevelSegments:8}:{font:KF,size:o.size||1,height:o.depth||.28,curveSegments:10,bevelEnabled:true,bevelThickness:.05,bevelSize:.035,bevelSegments:4});geo.computeBoundingBox();const bb=geo.boundingBox;geo.translate(-(bb.min.x+bb.max.x)/2,-bb.min.y,-(o.depth||.28)/2);geo.computeVertexNormals();TGC[key]=geo;}
  const fc=new THREE.Color(c||'#ff6b6b'),sc=fc.clone().lerp(new THREE.Color('#1b2236'),.38);const m=new THREE.Mesh(geo,[new THREE.MeshPhongMaterial({color:fc,shininess:60,specular:new THREE.Color('#ffffff').multiplyScalar(.25)}),new THREE.MeshPhongMaterial({color:sc,shininess:30})]);m.castShadow=true;g.add(m);g.userData.face=m;g.userData.txt=str;return g;}
function make(spec,s){let k=String(spec);const ok=k[0]==='*';if(ok)k=k.slice(1);let sz=1;const mm=k.match(/^(.*)@([\d.]+)$/);if(mm){k=mm[1];sz=+mm[2];}const parts=k.split(':');const solo=parts.length<2;let o,name=k,lab=null;if(parts.length<2)parts.length=1;
  if(solo){}else if(parts[0]==='txt'){o=txt3(parts[1],parts[2]||COL[(parts[1].charCodeAt(0)||0)%8],{size:parts[1].length>1?.42:.55});name=parts[1];lab=parts[1];}
  else if(parts[0]==='shape'){o=shapeToy(parts[1],parts[2]||COL[(parts[1].length)%8]);name=parts[1];lab=parts[1];}
  else if(parts[0]==='solid'){o=solidToy(parts[1],parts[2]||COL[(parts[1].length+3)%8]);name=parts[1];lab=parts[1];}
  else if(parts[0]==='balloon'){o=balloonToy(parts[1],parts[2]||COL[(parts[1].charCodeAt(0)||0)%8]);name=parts[1];lab=parts[1];}
  else if(parts[0]==='block'||parts[0]==='num'){o=blockToy(parts[1],parts[2]||(parts[0]==='num'?'#bfe3ff':'#ffe08a'));name=parts[1];lab=parts[1];}
  else if(parts[0]==='dots'){o=diceToy(+parts[1],parts[2]);name=parts[1];lab=parts[1];}
  else if(parts[0]==='paint'){o=paintToy(parts[1]);name=parts[2]||parts[1];lab=parts[2]||'';}
  else if(parts[0]==='blank'){o=new THREE.Group();name='';}
  if(!o&&P.kLuxNow&&P.LUXM&&P.LUXM[k]){o=P.LUXM[k](s||1);}
  if(!o){o=P.STAGE&&P.STAGE.prop?P.STAGE.prop(k,{s:.62*(s||1),label:false,bare:true,tap:false}):K2.standee(k,{label:false,s:.7*(s||1)});name=k;lab=k;}
  if(s&&parts.length>1)o.scale.multiplyScalar(s);
  if(sz!==1)o.scale.multiplyScalar(sz);o.userData.pk={ok,name,lab:parts[3]!=null?parts[3]:lab};return o;}
const mat=(g2,w,d,z,c)=>{if(P.kMatCol)c=P.kMatCol;const m=mk(G('pk_mat'+w+'_'+d,()=>new THREE.BoxGeometry(w,.03,d)),lam(c||'#fff4d6'),0);at(m,0,.015,z);g2.add(m);
  const rim=mk(G('pk_rim'+w+'_'+d,()=>new THREE.BoxGeometry(w+.08,.02,d+.08)),lam('#ffd6a5'),0);at(rim,0,.005,z);g2.add(rim);return m;};
function layout(n,kind,o){o=o||{};const pts=[];
  if(kind==='float'){const cols=Math.min(n,5),rows=Math.ceil(n/cols);for(let i=0;i<n;i++){const r=Math.floor(i/cols),c=i%cols,nc=Math.min(cols,n-r*cols);pts.push([(c-(nc-1)/2)*Math.min(.85,4/cols)+(r%2)*.2,(r%2)*.25,-2.75+r*.65]);}}
  else if(kind==='scatter'){const cols=Math.min(n,n>8?5:4),rows=Math.ceil(n/cols);for(let i=0;i<n;i++){const r=Math.floor(i/cols),c=i%cols,nc=Math.min(cols,n-r*cols);pts.push([(c-(nc-1)/2)*Math.min(.95,3.9/cols)+((i*37)%7-3)*.03,0,-2.85+r*Math.min(.75,1.7/Math.max(1,rows-1||1))+((i*53)%5-2)*.03]);}}
  else{const sp=o.sp||Math.min(1.05,4.1/Math.max(1,n));for(let i=0;i<n;i++)pts.push([(i-(n-1)/2)*sp,0,o.z==null?-2.2:o.z]);}
  return pts;}
/* a basket (or a hungry animal) that collects toys */
function catcher(g2,kind,x,z){const g=new THREE.Group();at(g,x,0,z);g2.add(g);let o;
  if(!kind||kind==='basket'){o=P.STAGE&&P.PROP3&&P.PROP3.basket?P.STAGE.prop('basket',{s:1.0,label:false,bare:true,tap:false}):K2.standee('basket',{label:false,s:.8});}
  else if(P.kLuxNow&&P.LUXM&&P.LUXM[kind])o=P.LUXM[kind](1.5);
  else o=P.STAGE&&P.STAGE.prop?P.STAGE.prop(kind,{s:1.05,label:false,bare:true,tap:false}):K2.standee(kind,{label:false,s:.9});
  g.add(o);g.userData.o=o;return g;}
const jump=(o,h)=>{const y0=o.userData.y0==null?(o.userData.y0=o.position.y):o.userData.y0;return tween(.42,k=>{o.position.y=y0+Math.sin(k*Math.PI)*(h||.35);o.rotation.y=(o.userData.ry||0)+Math.sin(k*Math.PI*2)*.25;});};
const wobble=o=>{const r0=o.rotation.z;return tween(.45,k=>{o.rotation.z=r0+Math.sin(k*Math.PI*4)*.25*(1-k);});};
const boom=o=>{try{const w=new THREE.Vector3();o.getWorldPosition(w);w.y+=.5;P.burst(w);}catch(e){}};
const sticker=(o,t,c)=>{const L=tag(t,{size:.3,bg:c||'#ffd43b',border:'#e09b00'});L.position.set(0,1.0,0);o.add(L);L.scale.multiplyScalar(.01);tween(.3,k=>L.scale.setScalar(Math.max(.01,k*1.1)));return L;};

/* ---------- TAP: find, pop, collect or light up the right toys ---------- */
C.tap=function(g2,st,h,set){st._pkt=[];const items=set.items||[];const n=items.length;const kind=set.layout||(set.mode==='pop'?'float':n>5?'scatter':'row');const pts=layout(n,kind,{z:set.z,sp:set.sp});
  mat(g2,4.3,kind==='row'?1.25:2.2,kind==='row'?(set.z||-2.2):-2.35,set.mat);
  let bask=null;if(set.mode==='collect'){bask=catcher(g2,set.basket,set.bx==null?1.7:set.bx,set.bz==null?-1.55:set.bz);}
  const objs=items.map((it,i)=>{const o=make(it,set.s);const [x,y,z]=pts[i];at(o,x+(bask&&kind!=='row'?-.35:0),y,z);o.userData.ry=(Math.random()-.5)*.4;o.rotation.y=o.userData.ry;g2.add(o);if(o.userData.tick){const f=o.userData.tick;o.userData.tick=null;st._pkt=(st._pkt||[]).concat([f]);}return o;});
  const anyOk=objs.some(o=>o.userData.pk.ok);const need=set.need||(anyOk?objs.filter(o=>o.userData.pk.ok).length:objs.length);let got=0;const done=new Set();
  objs.forEach((o,i)=>A.drag(o,{tap:()=>{if(done.has(i))return;const d=o.userData.pk;A.pop&&A.pop();
    const play=h.isPlay?h.isPlay():false;
    if(set.free){jump(o,.4);SAY(d.lab);return;}
    if(!play&&!d.ok){jump(o);SAY(set.sayAll===false?'':d.lab);return;}
    if(d.ok||!anyOk){done.add(i);got++;
      if(set.count){sticker(o,got);SAY(WORDS[got]||got);}else if(set.sayAll!==false)SAY(d.lab);
      if(set.mode==='pop'){boom(o);tween(.25,k=>o.scale.setScalar(Math.max(.01,1-k)));}
      else if(set.mode==='collect'&&bask){const w=new THREE.Vector3();bask.getWorldPosition(w);const tx=bask.position.x+(got%3-1)*.15,tz=bask.position.z;const p0=o.position.clone();tween(.6,k=>{o.position.set(p0.x+(tx-p0.x)*k,p0.y+Math.sin(k*Math.PI)*.9+(.35-p0.y)*k,p0.z+(tz-p0.z)*k);o.scale.setScalar(1-.45*k);}).then(()=>{jump(bask.userData.o,.2);});}
      else{jump(o,.5);const ring=mk(G('pk_ring',()=>new THREE.TorusGeometry(.36,.035,8,30)),lam('#5cc46a'),0);ring.rotation.x=Math.PI/2;ring.position.y=.03;o.add(ring);}
      if(got>=need){if(play)A.later(()=>h.win(set.ok),set.mode==='collect'?650:350);else{A.later(()=>{objs.forEach((q,j)=>A.later(()=>jump(q,.3),j*90));},400);}}}
    else{wobble(o);SAY(d.lab);if(play)h.miss(set.hint);}}}));
  return {tick:(dt,t)=>{(st._pkt||[]).forEach(f=>f(t));},play(){objs.forEach((o,j)=>A.later(()=>jump(o,.35),j*140));}};};
C.tap.bare=1;

/* ---------- COUNT: tap each toy, it hops and says its number; a ten frame can hold them ---------- */
C.count=function(g2,st,h,set){st._pkt=[];const n=set.n||5,item=set.item||'apple';const objs=[];
  if(set.frame){const F=set.frame,cols=5,rows=F/5,c=.62,x0=-(cols-1)*c/2,z0=-2.85;mat(g2,cols*c+.4,rows*c+.4,z0+(rows-1)*c/2,'#ffffff');
    for(let i=0;i<F;i++){const cell=mk(G('pk_cell',()=>new THREE.BoxGeometry(c*.92,.035,c*.92)),lam(i<5?'#ffe3e3':'#e7f5ff'),0);at(cell,x0+(i%5)*c,.03,z0+Math.floor(i/5)*c);g2.add(cell);}
    for(let i=0;i<n;i++){const o=make(item,.75);at(o,x0+(i%5)*c,.05,z0+Math.floor(i/5)*c);g2.add(o);objs.push(o);}}
  else{const pts=layout(n,n>5?'scatter':'row',{z:-2.25});mat(g2,4.3,n>5?2.1:1.2,n>5?-2.35:-2.25);for(let i=0;i<n;i++){const o=make(item);at(o,pts[i][0],0,pts[i][2]);g2.add(o);objs.push(o);}}
  let c=0;const seen=new Set();const away=set.away||0,keep=n-away;
  objs.forEach((o,i)=>{if(i>=keep){const X=tag('✗',{size:.42,bg:'#ffe3e3',border:'#e4572e',color:'#e4572e'});X.position.set(0,.55,.1);o.add(X);o.rotation.z=.5;o.position.y+=.02;o.userData.gone=1;}});
  objs.forEach((o,i)=>A.drag(o,{tap:()=>{A.pop&&A.pop();if(o.userData.gone){wobble(o);SAY(set.goneSay||'gone!');return;}if(seen.has(i)){jump(o,.2);return;}seen.add(i);c++;jump(o,.45);if(!set.noSticker)sticker(o,c);else{try{boom(o);}catch(e){}}SAY(WORDS[c]||c);
    if(c===keep){A.later(()=>{SAY(set.done||(keep+'! '+(set.say||'')));objs.forEach((q,j)=>A.later(()=>jump(q,.3),j*80));},700);}}}));
  if(set.show){const T=tag(set.show,{size:.32,bg:'#fff3c4'});T.position.set(0,1.25,-3.1);g2.add(T);}
  const play=()=>{if(c)return;objs.forEach((o,j)=>{if(o.userData.gone)return;A.later(()=>{c++;seen.add(j);jump(o,.45);if(!set.noSticker)sticker(o,c);SAY(WORDS[c]||c);},j*600);});};
  return {play,controls:()=>st.round?[]:[{t:'Count with me!',go:true,fn:play}]};};
C.count.bare=1;

/* ---------- GAP: a row with something missing; tap the piece that fits ---------- */
C.gap=function(g2,st,h,set){st._pkt=[];const row=set.seq||[],ch=set.choices||[];const sp=Math.min(.85,4.1/row.length);const zR=-2.75,zC=-1.75;mat(g2,4.3,2.2,-2.3);
  let slot=null;const top=row.map((it,i)=>{const x=(i-(row.length-1)/2)*sp;if(it==='?'){const g=new THREE.Group();const q=tag('?',{size:.42,bg:'#fff3c4',border:'#e09b00'});q.position.y=.42;g.add(q);const r=mk(G('pk_slot',()=>new THREE.TorusGeometry(.3,.03,8,30)),lam('#ffb347'),0);r.rotation.x=Math.PI/2;r.position.y=.03;g.add(r);at(g,x,0,zR);g2.add(g);slot=g;g.userData.ry=0;st._pkt=[t=>{q.position.y=.42+Math.sin(t*3)*.05;}];return g;}
    const o=make(it,set.s);at(o,x,0,zR);g2.add(o);A.drag(o,{tap:()=>{jump(o,.3);SAY(o.userData.pk.lab);}});return o;});
  const csp=Math.min(1.1,4/Math.max(1,ch.length));let solved=false;
  ch.forEach((it,i)=>{const o=make(it,set.s);at(o,(i-(ch.length-1)/2)*csp,0,zC);g2.add(o);const ring=mk(G('pk_cring',()=>new THREE.TorusGeometry(.38,.025,8,30)),lam('#4fb3ff'),0);ring.rotation.x=Math.PI/2;ring.position.y=.02;o.add(ring);
    A.drag(o,{tap:()=>{if(solved)return;A.pop&&A.pop();const d=o.userData.pk;const play=h.isPlay?h.isPlay():false;
      if(d.ok){solved=true;SAY(set.done||d.lab);const p0=o.position.clone(),to=slot.position.clone();o.remove(ring);tween(.6,k=>{o.position.set(p0.x+(to.x-p0.x)*k,Math.sin(k*Math.PI)*.8,p0.z+(to.z-p0.z)*k);}).then(()=>{slot.visible=false;boom(o);top.forEach((q,j)=>A.later(()=>jump(q,.3),j*110));if(play)A.later(()=>h.win(set.ok),500);});}
      else{wobble(o);SAY(d.lab);if(play)h.miss(set.hint);}}});});
  return {tick:(dt,t)=>{(st._pkt||[]).forEach(f=>f(t));},play(){top.forEach((q,j)=>A.later(()=>jump(q,.3),j*160));}};};
C.gap.bare=1;

/* ---------- MIX: two paint pots pour into a bowl and make a new colour ---------- */
C.mix=function(g2,st,h,set){mat(g2,4.3,1.6,-2.3);const a=make('paint:'+set.a+':'+(set.an||'')),b=make('paint:'+set.b+':'+(set.bn||''));at(a,-1.4,0,-2.4);at(b,1.4,0,-2.4);g2.add(a);g2.add(b);
  const bowl=mk(G('pk_bowl',()=>new THREE.SphereGeometry(.45,28,16,0,Math.PI*2,Math.PI/2,Math.PI/2)),lam('#ffffff'),20);bowl.position.set(0,.45,-2.3);g2.add(bowl);
  const fill=mk(G('pk_fill',()=>new THREE.CylinderGeometry(.4,.4,.03,28)),lam('#ffffff'),0);fill.position.set(0,.3,-2.3);g2.add(fill);
  [[a,set.an],[b,set.bn]].forEach(([p,n],i)=>{const T=tag(n||'',{size:.24});T.position.set(p.position.x,.75,-2.4);g2.add(T);A.drag(p,{tap:()=>{jump(p,.3);SAY(n);}});});
  const R=tag(set.label||'?',{size:.3,bg:'#fff3c4'});R.position.set(0,1.15,-2.3);R.visible=false;g2.add(R);let done=false;
  const play=()=>{if(done)return;done=true;const ca=new THREE.Color(set.a),cr=new THREE.Color(set.res);[a,b].forEach((p,i)=>{const p0=p.position.clone();tween(.6,k=>{p.position.x=p0.x+(i?-1:1)*k*.7;p.rotation.z=(i?1:-1)*k*1.0;p.position.y=k*.5;}).then(()=>A.later(()=>tween(.5,k=>{p.position.x=p0.x+(i?-1:1)*(1-k)*.7;p.rotation.z=(i?1:-1)*(1-k);p.position.y=(1-k)*.5;}),600));});
    A.later(()=>{fill.material=lam(set.a);tween(1.2,k=>{const c=ca.clone().lerp(cr,k);fill.material.color.copy(c);fill.position.y=.3+k*.08;fill.rotation.y=k*8;}).then(()=>{R.visible=true;boom(fill);SAY(set.say||set.label);});},500);};
  return {play,controls:()=>st.round?[]:[{t:'Mix the paint!',go:true,fn:play}]};};
C.mix.bare=1;
P.PKX={make,txt3,jump,wobble,boom,sticker,SAY,mat,tag,layout,catcher,WORDS,COL,at};
})();
