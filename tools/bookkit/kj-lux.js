/* Junior Kindergarten: the premium look. For the lessons listed in P.KLUX this file gives the 3D stage
   soft, chubby, toy-like models, glossy clay-like materials, rounded edges, warm gentle light and soft
   contact shadows. It only changes how things look: every game, tap and animation works exactly as before. */
(function(){
"use strict";
const P=window.PM;if(!P||P.failed||!P.K2)return;const BK=window.BOOK||{};if(!BK.kSpread)return;
const {THREE}=P;
P.KLUX=new Proxy({},{get:(o,k)=>typeof k==='string'?1:undefined});

/* ---------- materials: soft clay-toy plastic with a gentle clear coat ---------- */
const MC={};
function soft(c,o){o=o||{};const key=new THREE.Color(c).getHexString()+'|'+(o.r||.5)+'|'+(o.cc!=null?o.cc:.45)+'|'+(o.m||0)+'|'+(o.e||'');if(MC[key])return MC[key];
  const m=new THREE.MeshPhysicalMaterial({color:new THREE.Color(c),roughness:o.r||.5,metalness:o.m||0,clearcoat:o.cc!=null?o.cc:.45,clearcoatRoughness:.32,reflectivity:.35});if(o.e)m.emissive=new THREE.Color(o.e);m.userData.lux=1;return MC[key]=m;}
const SM={};
function luxMat(src){if(!src||src.userData.lux)return src;if(!(src.isMeshLambertMaterial||src.isMeshPhongMaterial))return src;const k=src.uuid;if(SM[k])return SM[k];
  const c=src.color.clone();const hsl={};c.getHSL(hsl);c.setHSL(hsl.h,Math.min(1,hsl.s*.92),Math.min(.93,hsl.l*1.02+.03));
  const m=new THREE.MeshPhysicalMaterial({color:c,roughness:.48,metalness:0,clearcoat:.4,clearcoatRoughness:.35,reflectivity:.3,transparent:src.transparent,opacity:src.opacity,side:src.side,map:src.map||null,depthWrite:src.depthWrite});
  if(src.emissive)m.emissive=src.emissive.clone();m.userData.lux=1;return SM[k]=m;}

/* ---------- geometry: rounded boxes and rounded cylinders instead of sharp blocks ---------- */
const GC={};
function roundBox(w,h,d,r,seg){const key=['b',w,h,d,r].map(x=>typeof x==='number'?x.toFixed(3):x).join('|');if(GC[key])return GC[key];seg=seg||5;
  const g=new THREE.BoxGeometry(w,h,d,seg*2,seg*2,seg*2);const p=g.attributes.position,v=new THREE.Vector3(),inner=new THREE.Vector3(w/2-r,h/2-r,d/2-r);
  for(let i=0;i<p.count;i++){v.fromBufferAttribute(p,i);const c=new THREE.Vector3(Math.max(-inner.x,Math.min(inner.x,v.x)),Math.max(-inner.y,Math.min(inner.y,v.y)),Math.max(-inner.z,Math.min(inner.z,v.z)));
    const dlt=v.clone().sub(c);if(dlt.lengthSq()>1e-12){dlt.normalize().multiplyScalar(r);v.copy(c).add(dlt);}p.setXYZ(i,v.x,v.y,v.z);}
  g.computeVertexNormals();g.userData.lux=1;return GC[key]=g;}
function roundCyl(rt,rb,h,seg){const key=['c',rt,rb,h,seg].map(x=>x.toFixed?x.toFixed(3):x).join('|');if(GC[key])return GC[key];const r=Math.min(h*.3,Math.min(rt,rb)*.35);const pts=[];
  pts.push(new THREE.Vector2(0,-h/2));const N=6;for(let i=0;i<=N;i++){const a=-Math.PI/2+i/N*Math.PI/2;pts.push(new THREE.Vector2(rb-r+Math.cos(a)*r,-h/2+r+Math.sin(a)*r));}
  for(let i=0;i<=N;i++){const a=i/N*Math.PI/2;pts.push(new THREE.Vector2(rt-r+Math.cos(a)*r,h/2-r+Math.sin(a)*r));}pts.push(new THREE.Vector2(0,h/2));
  const g=new THREE.LatheGeometry(pts,Math.max(24,seg||24));g.computeVertexNormals();g.userData.lux=1;return GC[key]=g;}
function luxGeo(geo){if(!geo||geo.userData.lux)return geo;const pr=geo.parameters||{};
  if(geo.type==='BoxGeometry'){const m=Math.min(pr.width,pr.height,pr.depth);if(m<.012)return geo;const r=Math.min(m*.32,.09);return roundBox(pr.width,pr.height,pr.depth,r);}
  if(geo.type==='CylinderGeometry'){if(pr.openEnded||(pr.thetaLength&&pr.thetaLength<6.2)||Math.min(pr.radiusTop,pr.radiusBottom)<.045||pr.height<.03)return geo;return roundCyl(pr.radiusTop,pr.radiusBottom,pr.height,pr.radialSegments);}
  if(geo.type==='SphereGeometry'&&pr.widthSegments<24&&pr.radius>.05&&(pr.phiLength==null||pr.phiLength>6.2)&&(pr.thetaLength==null||pr.thetaLength>3.1)){const key='s'+pr.radius.toFixed(3);return GC[key]||(GC[key]=Object.assign(new THREE.SphereGeometry(pr.radius,32,24),{userData:{lux:1}}));}
  return geo;}

/* ---------- soft contact shadows: a gentle blurry blob under everything that stands up ---------- */
let BT=null;function blobTex(){if(BT)return BT;const c=document.createElement('canvas');c.width=c.height=128;const g=c.getContext('2d');const gr=g.createRadialGradient(64,64,0,64,64,64);
  gr.addColorStop(0,'rgba(60,40,90,.42)');gr.addColorStop(.45,'rgba(60,40,90,.22)');gr.addColorStop(1,'rgba(60,40,90,0)');g.fillStyle=gr;g.fillRect(0,0,128,128);BT=new THREE.CanvasTexture(c);return BT;}
const BG=new THREE.PlaneGeometry(1,1);
function blobFor(g2,o){const box=new THREE.Box3().setFromObject(o);if(box.isEmpty())return;const sc=new THREE.Vector3();g2.getWorldScale(sc);const sz=box.getSize(new THREE.Vector3()).divide(sc);
  if(sz.y<.16||Math.max(sz.x,sz.z)<.08||Math.max(sz.x,sz.z)>3.2)return null;const ctr=g2.worldToLocal(box.getCenter(new THREE.Vector3()));
  const m=new THREE.Mesh(BG,new THREE.MeshBasicMaterial({map:blobTex(),transparent:true,depthWrite:false,opacity:1}));m.rotation.x=-Math.PI/2;m.renderOrder=2;m.userData.luxBlob=1;m.userData.follow=o;
  m.userData.off=new THREE.Vector3(ctr.x-o.position.x,0,ctr.z-o.position.z);m.userData.r=Math.min(1.6,Math.max(sz.x,sz.z)*1.05+.12);m.userData.y0=o.position.y;g2.add(m);return m;}
function pass(g2){if(!g2)return;const tops=g2.children.slice();
  g2.traverse(o=>{if(!o.isMesh||o.userData.luxBlob||o.userData.noLux)return;if(!o.userData.luxDone){o.geometry=luxGeo(o.geometry);o.userData.luxDone=1;}
    if(Array.isArray(o.material)){if(o.material.some(m=>m&&!m.userData.lux&&(m.isMeshLambertMaterial||m.isMeshPhongMaterial)))o.material=o.material.map(luxMat);}else if(o.material&&!o.material.userData.lux)o.material=luxMat(o.material);
    if(o.castShadow)o.castShadow=false;});
  tops.forEach(o=>{if(o.userData.luxBlob||o.isSprite||o.userData.blobbed)return;o.userData.blobbed=1;blobFor(g2,o);});
  g2.children.forEach(b=>{if(!b.userData.luxBlob)return;const o=b.userData.follow;if(!o||o.parent!==g2){g2.remove(b);return;}let vis=o.visible;
    const lift=Math.max(0,o.position.y-(b.userData.y0||0));const f=1/(1+lift*1.4);b.visible=vis&&o.scale.x>.05;b.position.set(o.position.x+b.userData.off.x,.034,o.position.z+b.userData.off.z);
    const s=b.userData.r*Math.max(.4,f)*Math.min(1,o.scale.x/(o.userData.s0lux||(o.userData.s0lux=o.scale.x||1)));b.scale.set(s,s,1);b.material.opacity=Math.min(1,f*1.05);});}
P.kLuxPass=pass;

/* ---------- warm, gentle light for these lessons ---------- */
let hemiG0=null;
P.onSpread=sp=>{const on=!!(sp&&sp.L&&P.KLUX[sp.L.id]);const L=P.lights;if(L&&L.hemi){if(hemiG0==null)hemiG0=L.hemi.groundColor.getHex();L.hemi.groundColor.setHex(on?0xe2d4c6:hemiG0);}
  P.kHemiK=on?1.3:1;P.kSunK=on?.7:1;if(P.applyLight)P.applyLight();};

/* ---------- the cute models ---------- */
const V3=(x,y,z)=>new THREE.Vector3(x,y,z);
const SG={};const sphG=(r)=>SG[r]||(SG[r]=new THREE.SphereGeometry(r,32,24));
const mesh=(geo,mat)=>{const m=new THREE.Mesh(geo,mat);m.userData.luxDone=1;return m;};
function ball(g,r,c,x,y,z,sx,sy,sz,o){const m=mesh(sphG(r),c.isMaterial?c:soft(c,o));m.position.set(x,y,z);m.scale.set(sx||1,sy||1,sz||1);g.add(m);return m;}
function capsule(g,a,b,r,c,o){const d=b.clone().sub(a);const L=d.length();const key='cap'+r.toFixed(3)+'_'+L.toFixed(3);const geo=GC[key]||(GC[key]=roundCyl(r,r,L+r*1.2,20));const m=mesh(geo,soft(c,o));m.position.copy(a).add(b).multiplyScalar(.5);m.quaternion.setFromUnitVectors(V3(0,1,0),d.normalize());g.add(m);return m;}
function face(g,x,y,z,s,o){o=o||{};s=s||1;const eyeM=soft('#1b1b2f',{r:.2,cc:1});const hiM=soft('#ffffff',{r:.3,cc:0,e:'#ffffff'});const sp=(o.sp||.085)*s;
  [-1,1].forEach(k=>{ball(g,.042*s,eyeM,x+k*sp,y,z,1,1.15,.6);ball(g,.014*s,hiM,x+k*sp+.012*s,y+.018*s,z+.024*s);if(!o.noCheek)ball(g,.035*s,'#ff9ab0',x+k*(sp+.07*s),y-.05*s,z-.012*s,1,.6,.35,{r:.8,cc:0});});
  const sm=mesh(new THREE.TorusGeometry(.035*s,.009*s,8,20,Math.PI),soft('#7a2e3a',{r:.6,cc:0}));sm.position.set(x,y-.045*s,z+.004*s);sm.rotation.z=Math.PI;g.add(sm);}
function lathe(pts,seg){const g=new THREE.LatheGeometry(pts.map(p=>new THREE.Vector2(p[0],p[1])),seg||48);g.computeVertexNormals();return g;}
const fin=(g,k)=>{g.scale.multiplyScalar(k);return g;};

const M={};
M.apple=s=>{const g=new THREE.Group();const body=mesh(lathe([[0,.03],[.12,0],[.24,.03],[.33,.12],[.37,.25],[.37,.38],[.33,.5],[.24,.58],[.12,.6],[.05,.56],[0,.53]]),soft('#ff5c6c',{r:.38,cc:.85}));g.add(body);
  capsule(g,V3(0,.54,0),V3(.03,.7,0),.022,'#8a5a3c');const lf=ball(g,.1,'#5fd16a',.1,.68,0,1.5,.32,.8);lf.rotation.z=.5;face(g,0,.33,.345,1);return fin(g,s*.86);};
M.ant=s=>{const g=new THREE.Group();const C='#d0733f';ball(g,.2,C,-.3,.28,0,1.25,1,1);ball(g,.12,C,-.03,.27,0);ball(g,.2,C,.2,.36,.04);
  [[-1,.1],[0,0],[1,-.1]].forEach(([i,dz])=>[-1,1].forEach(sd=>{const a=V3(-.03+i*.08,.24,sd*.08),k=V3(-.03+i*.16,.3,sd*.26),f=V3(-.03+i*.22,.03,sd*.34);capsule(g,a,k,.026,'#a8552c');capsule(g,k,f,.024,'#a8552c');ball(g,.04,'#a8552c',f.x,f.y,f.z);}));
  [-1,1].forEach(sd=>{const a=V3(.2+sd*.06,.52,.08),b=V3(.24+sd*.14,.7,.14);capsule(g,a,b,.016,'#a8552c');ball(g,.045,'#ff8fab',b.x,b.y,b.z);});face(g,.2,.38,.235,1,{sp:.07});g.rotation.y=-.25;return fin(g,s*.9);};
M.airplane=s=>{const g=new THREE.Group();ball(g,.2,'#74c0fc',0,.4,0,2.0,1,1);ball(g,.12,'#ffd43b',.37,.4,0,1,1,1);
  const pr=new THREE.Group();pr.position.set(.48,.4,0);ball(pr,.12,'#f8f9fa',0,0,0,.18,1.4,.35);ball(pr,.12,'#f8f9fa',0,0,0,.18,.35,1.4);ball(pr,.045,'#ff6b6b',.02,0,0);pr.userData.luxSpin=1;g.add(pr);
  ball(g,.5,'#ff8787',-.02,.36,0,.34,.06,1.0);ball(g,.24,'#ff8787',-.4,.44,0,.3,.05,.85);const tf=ball(g,.2,'#ffa94d',-.4,.56,0,.6,.75,.12);tf.rotation.z=.35;
  [.1,-.04,-.18].forEach(x=>{ball(g,.045,'#e7f5ff',x,.48,.17,1,1,.4,{r:.15,cc:1});});face(g,.26,.44,.19,.9,{sp:.06,noCheek:true});
  [-1,1].forEach(sd=>{capsule(g,V3(.1,.28,sd*.1),V3(.1,.13,sd*.14),.018,'#adb5bd');ball(g,.06,'#495057',.1,.1,sd*.15,1,1,.7);});return fin(g,s*.95);};
M.anchor=s=>{const g=new THREE.Group();const C='#6d8cff';const o={r:.32,cc:.9,m:.1};
  const ring=mesh(new THREE.TorusGeometry(.1,.038,16,40),soft(C,o));ring.position.y=.86;g.add(ring);capsule(g,V3(0,.14,0),V3(0,.74,0),.05,C,o);capsule(g,V3(-.2,.64,0),V3(.2,.64,0),.04,C,o);
  [-1,1].forEach(k=>ball(g,.055,'#ffd43b',k*.22,.64,0,1,1,1,{r:.3,cc:1}));const arm=mesh(new THREE.TorusGeometry(.28,.05,16,48,Math.PI),soft(C,o));arm.rotation.z=Math.PI;arm.position.y=.36;g.add(arm);
  [-1,1].forEach(k=>{const c=mesh(new THREE.ConeGeometry(.1,.17,24),soft(C,o));c.position.set(k*.28,.42,0);c.rotation.z=-k*.25;g.add(c);});ball(g,.065,'#ffd43b',0,.1,0,1,1,1,{r:.3,cc:1});return fin(g,s*.8);};
M.avocado=s=>{const g=new THREE.Group();const sk=mesh(lathe([[0,0],[.18,.02],[.27,.12],[.28,.26],[.22,.4],[.15,.54],[.08,.62],[0,.64]]),soft('#4d8a2a',{r:.6,cc:.3}));sk.scale.z=.6;sk.position.y=.02;g.add(sk);
  const fl=mesh(lathe([[0,0],[.16,.02],[.24,.12],[.25,.25],[.19,.38],[.13,.5],[.06,.57],[0,.58]]),soft('#d8f5a2',{r:.5,cc:.3}));fl.scale.z=.12;fl.position.set(0,.05,.14);g.add(fl);
  ball(g,.1,'#a0602f',0,.2,.16,1,1,.6,{r:.35,cc:.8});face(g,0,.42,.175,.8,{sp:.065});return fin(g,s*.9);};
M.ambulance=s=>{const g=new THREE.Group();const add=(geo,c,x,y,z,o)=>{const m=mesh(geo,soft(c,o));m.position.set(x,y,z);g.add(m);return m;};
  add(roundBox(.62,.42,.46,.09),'#ffffff',-.08,.36,0);add(roundBox(.3,.3,.44,.08),'#ffffff',.36,.3,0);add(roundBox(.92,.06,.47,.03),'#ff6b6b',.04,.3,0);
  add(roundBox(.12,.17,.42,.04),'#a5d8ff',.4,.4,.012,{r:.15,cc:1});add(roundBox(.06,.16,.03,.015),'#ff4d5e',-.1,.42,.24);add(roundBox(.16,.05,.03,.015),'#ff4d5e',-.1,.42,.24);
  ball(g,.05,'#ff6b6b',-.15,.6,0,1,1,1,{e:'#661111'});ball(g,.05,'#4dabf7',.0,.6,0,1,1,1,{e:'#0b3a66'});ball(g,.04,'#ffe066',.52,.28,.14,1,1,.6,{e:'#665500'});ball(g,.04,'#ffe066',.52,.28,-.14,1,1,.6,{e:'#665500'});
  [[-.25,1],[.3,1],[-.25,-1],[.3,-1]].forEach(([x,k])=>{const w=add(roundCyl(.1,.1,.08,24),'#495057',x,.12,k*.22,{r:.6,cc:.2});w.rotation.x=Math.PI/2;const hb=add(roundCyl(.045,.045,.09,16),'#dee2e6',x,.12,k*.23);hb.rotation.x=Math.PI/2;});return fin(g,s*.85);};
M.alien=s=>{const g=new THREE.Group();const C='#7ee08a';ball(g,.2,C,0,.22,0,1,1.05,.95);ball(g,.25,C,0,.55,0,1.1,.95,1);
  [-1,1].forEach(k=>{ball(g,.07,'#ffffff',k*.1,.58,.2,1,1.2,.5,{r:.2,cc:1});ball(g,.04,'#1b1b2f',k*.1,.58,.24,1,1.2,.5,{r:.2,cc:1});ball(g,.013,'#ffffff',k*.1+.012,.6,.26,1,1,1,{e:'#ffffff'});
    capsule(g,V3(k*.1,.76,0),V3(k*.17,.92,0),.014,'#5cb85c');ball(g,.045,'#ff8fab',k*.17,.93,0);ball(g,.05,C,k*.2,.25,.04,1.2,.8,.8);ball(g,.035,'#ff9ab0',k*.17,.5,.2,1,.6,.35,{r:.8,cc:0});ball(g,.07,C,k*.1,.04,.03,1,.6,1.2);});
  const sm=mesh(new THREE.TorusGeometry(.04,.01,8,20,Math.PI),soft('#2b6b33'));sm.position.set(0,.47,.255);sm.rotation.z=Math.PI;g.add(sm);return fin(g,s*.85);};
M.duck=s=>{const g=new THREE.Group();const Y='#ffd84d';ball(g,.25,Y,0,.26,-.02,1.15,.9,1.05);const tl=ball(g,.08,Y,0,.36,-.27,1,1.2,1);tl.rotation.x=-.6;ball(g,.17,Y,0,.55,.07);
  ball(g,.08,'#ff922b',0,.51,.23,1.15,.45,1.1,{r:.35,cc:.8});[-1,1].forEach(k=>{ball(g,.1,'#ffc94d',k*.26,.28,-.02,.35,.75,1.0);ball(g,.07,'#ff922b',k*.1,.03,.08,1.2,.35,1.5);});face(g,0,.6,.205,.85,{sp:.07});return fin(g,s*.95);};
M.bear=s=>{const g=new THREE.Group();const C='#c98b5a',L='#f5dcc3';ball(g,.3,C,0,.32,0,1,1.02,.92);ball(g,.2,L,0,.3,.17,1,1.05,.5,{r:.6,cc:.2});ball(g,.25,C,0,.76,.02);
  [-1,1].forEach(k=>{ball(g,.085,C,k*.18,.95,0);ball(g,.05,'#ffb3c1',k*.18,.95,.04,1,1,.5);ball(g,.1,C,k*.3,.4,.1,.8,1.25,.8);ball(g,.11,C,k*.16,.08,.16,1,.75,1.2);ball(g,.06,L,k*.16,.08,.27,1,1,.4);});
  ball(g,.1,L,0,.7,.21,1.15,.85,.75);ball(g,.035,'#3b2a20',0,.74,.29,1.2,.85,.8,{r:.25,cc:1});face(g,0,.82,.22,1,{sp:.085});return fin(g,s*.78);};
M.spider=()=>{const g=new THREE.Group();const C='#9b7bff';ball(g,.3,C,0,.42,-.05,1,.95,1);ball(g,.12,'#c5b3ff',0,.55,-.3,1,1,1);
  [-1,1].forEach(sd=>{for(let i=0;i<4;i++){const z=-.2+i*.13,a=V3(sd*.22,.38,z),k=V3(sd*.46,.52,z+(i-1.5)*.05),f=V3(sd*.62,.02,z+(i-1.5)*.1);capsule(g,a,k,.035,'#7b5cf0');capsule(g,k,f,.032,'#7b5cf0');ball(g,.045,'#ff8fab',f.x,f.y,f.z);}});
  [-1,1].forEach(k=>{ball(g,.075,'#ffffff',k*.1,.5,.22,1,1.1,.5,{r:.2,cc:1});ball(g,.045,'#1b1b2f',k*.1,.5,.26,1,1.1,.5,{r:.2,cc:1});ball(g,.014,'#ffffff',k*.1+.014,.52,.285,1,1,1,{e:'#ffffff'});ball(g,.04,'#ff9ab0',k*.19,.42,.22,1,.6,.35,{r:.8,cc:0});});
  const sm=mesh(new THREE.TorusGeometry(.045,.011,8,20,Math.PI),soft('#4a2a8a'));sm.position.set(0,.39,.28);sm.rotation.z=Math.PI;g.add(sm);return g;};
P.LUXM=M;

/* tiny idle life for the cute models (spinning propeller) */
P.kLuxTick=(g2,dt)=>{g2.traverse(o=>{if(o.userData.luxSpin)o.rotation.x+=dt*12;});};
})();
/* ===== more cute models: lessons 2 to 7 (B, C, D, E, F, G) ===== */
(function(){
"use strict";
const P=window.PM;if(!P||!P.LUXM)return;const {THREE}=P;const M=P.LUXM;

const V3=(x,y,z)=>new THREE.Vector3(x,y,z);const MC={};
const soft=(c,o)=>{o=o||{};const k=c+'|'+(o.r||.5)+'|'+(o.cc!=null?o.cc:.45)+'|'+(o.e||'')+'|'+(o.m||0);if(MC[k])return MC[k];const m=new THREE.MeshPhysicalMaterial({color:new THREE.Color(c),roughness:o.r||.5,metalness:o.m||0,clearcoat:o.cc!=null?o.cc:.45,clearcoatRoughness:.32,reflectivity:.35});if(o.e)m.emissive=new THREE.Color(o.e);m.userData.lux=1;return MC[k]=m;};
const SG={};const sphG=r=>SG[r]||(SG[r]=new THREE.SphereGeometry(r,32,24));
const mesh=(geo,mat)=>{const m=new THREE.Mesh(geo,mat);m.userData.luxDone=1;return m;};
const ball=(g,r,c,x,y,z,sx,sy,sz,o)=>{const m=mesh(sphG(r),c.isMaterial?c:soft(c,o));m.position.set(x,y,z);m.scale.set(sx||1,sy||1,sz||1);g.add(m);return m;};
const GC={};const rcyl=(rt,rb,h,seg)=>{const k=[rt,rb,h].join('|');if(GC[k])return GC[k];const r=Math.min(h*.3,Math.min(rt,rb)*.35);const pts=[new THREE.Vector2(0,-h/2)];
  for(let i=0;i<=6;i++){const a=-Math.PI/2+i/6*Math.PI/2;pts.push(new THREE.Vector2(rb-r+Math.cos(a)*r,-h/2+r+Math.sin(a)*r));}for(let i=0;i<=6;i++){const a=i/6*Math.PI/2;pts.push(new THREE.Vector2(rt-r+Math.cos(a)*r,h/2-r+Math.sin(a)*r));}pts.push(new THREE.Vector2(0,h/2));
  const g=new THREE.LatheGeometry(pts,seg||32);g.computeVertexNormals();return GC[k]=g;};
const cyl=(g,rt,rb,h,c,x,y,z,o)=>{const m=mesh(rcyl(rt,rb,h),soft(c,o));m.position.set(x,y,z);g.add(m);return m;};
const cap=(g,a,b,r,c,o)=>{const d=b.clone().sub(a);const L=d.length();const m=mesh(rcyl(r,r,L+r*1.2),soft(c,o));m.position.copy(a).add(b).multiplyScalar(.5);m.quaternion.setFromUnitVectors(V3(0,1,0),d.normalize());g.add(m);return m;};
const rbox=(w,h,d,r)=>{const k='b'+[w,h,d,r].join('|');if(GC[k])return GC[k];const g=new THREE.BoxGeometry(w,h,d,10,10,10);const p=g.attributes.position,v=new THREE.Vector3(),I=V3(w/2-r,h/2-r,d/2-r);
  for(let i=0;i<p.count;i++){v.fromBufferAttribute(p,i);const c=V3(Math.max(-I.x,Math.min(I.x,v.x)),Math.max(-I.y,Math.min(I.y,v.y)),Math.max(-I.z,Math.min(I.z,v.z)));const dl=v.clone().sub(c);if(dl.lengthSq()>1e-12){dl.normalize().multiplyScalar(r);v.copy(c).add(dl);}p.setXYZ(i,v.x,v.y,v.z);}g.computeVertexNormals();return GC[k]=g;};
const box=(g,w,h,d,c,x,y,z,o)=>{const m=mesh(rbox(w,h,d,Math.min(w,h,d)*.28),soft(c,o));m.position.set(x,y,z);g.add(m);return m;};
const tor=(g,R,r,c,x,y,z,arc,o)=>{const m=mesh(new THREE.TorusGeometry(R,r,16,40,arc||Math.PI*2),soft(c,o));m.position.set(x,y,z);g.add(m);return m;};
const lathe=(pts,seg)=>{const g=new THREE.LatheGeometry(pts.map(p=>new THREE.Vector2(p[0],p[1])),seg||40);g.computeVertexNormals();return g;};
function face(g,x,y,z,s,o){o=o||{};s=s||1;const sp=(o.sp||.085)*s;[-1,1].forEach(k=>{ball(g,.042*s,'#1b1b2f',x+k*sp,y,z,1,1.15,.6,{r:.2,cc:1});ball(g,.014*s,'#ffffff',x+k*sp+.012*s,y+.018*s,z+.024*s,1,1,1,{e:'#ffffff',cc:0});
    if(!o.noCheek)ball(g,.035*s,'#ff9ab0',x+k*(sp+.07*s),y-.05*s,z-.012*s,1,.6,.35,{r:.8,cc:0});});if(!o.noSmile){const sm=mesh(new THREE.TorusGeometry(.035*s,.009*s,8,20,Math.PI),soft('#7a2e3a',{r:.6,cc:0}));sm.position.set(x,y-.045*s,z+.004*s);sm.rotation.z=Math.PI;g.add(sm);}}
const fin=(g,k)=>{g.scale.multiplyScalar(k);return g;};
/* a chubby sitting animal: the base for most of the animals */
function critter(o){const g=new THREE.Group();const C=o.c,B=o.belly||C,H=o.head||.24,hy=o.hy||.72;
  ball(g,.28,C,0,.3,0,1,1.02,.92);ball(g,.19,B,0,.29,.16,1,1.05,.5,{r:.6,cc:.2});ball(g,H,C,0,hy,.03);
  [-1,1].forEach(k=>{ball(g,.09,C,k*.27,.38,.1,.8,1.25,.8);ball(g,.1,C,k*.15,.07,.16,1,.72,1.25);
    const e=o.ears||'round';if(e==='round'){ball(g,.08,C,k*H*.72,hy+H*.75,0);ball(g,.048,o.earIn||'#ffb3c1',k*H*.72,hy+H*.75,.035,1,1,.45);}
    else if(e==='point'){const c=mesh(new THREE.ConeGeometry(.08,.17,20),soft(C));c.position.set(k*H*.62,hy+H*.88,0);c.rotation.z=-k*.25;g.add(c);const c2=mesh(new THREE.ConeGeometry(.045,.1,16),soft(o.earIn||'#ffb3c1'));c2.position.set(k*H*.62,hy+H*.86,.04);c2.rotation.z=-k*.25;g.add(c2);}
    else if(e==='long'){ball(g,.07,C,k*H*.4,hy+H*1.35,0,.75,2.4,.55);ball(g,.045,o.earIn||'#ffb3c1',k*H*.4,hy+H*1.35,.035,.7,2.2,.3);}
    else if(e==='flop'){const f=ball(g,.08,o.earC||C,k*H*1.0,hy+H*.15,0,.6,1.6,.6);f.rotation.z=k*.35;}
    else if(e==='big'){ball(g,.2,o.earC||C,k*H*1.25,hy+.02,-.02,.55,1.0,.25);}});
  if(o.muzzle!==false)ball(g,H*.42,o.muzzle||B,0,hy-H*.28,H*.86,1.15,.85,.75);if(o.nose!==false)ball(g,H*.14,o.nose||'#3b2a20',0,hy-H*.16,H*1.12,1.2,.85,.8,{r:.25,cc:1});
  face(g,0,hy+H*.18,H*.92,H/.24,{sp:.085*(H/.24)});if(o.extra)o.extra(g,hy,H);g.rotation.y=o.ry||0;return fin(g,o.k||.78);}
const S=(fn)=>s=>fn(s||1);
/* animals */
M.monkey=S(s=>fin(critter({c:'#9c6644',belly:'#f1d3b3',muzzle:'#f1d3b3',ears:'big',earC:'#f1d3b3',extra:(g,hy)=>{const t=new THREE.Group();g.add(t);cap(g,V3(.15,.12,-.2),V3(.35,.45,-.3),.035,'#9c6644');ball(g,.05,'#9c6644',.35,.48,-.3);}}),s));
M.hippo=S(s=>fin(critter({c:'#b197fc',belly:'#d0bfff',muzzle:'#d0bfff',ears:'round',earIn:'#ffc9de',head:.26,nose:false,extra:(g,hy,H)=>{[-1,1].forEach(k=>ball(g,.025,'#7048e8',k*.06,hy-H*.2,H*1.22));}}),s));
M.lion=S(s=>fin(critter({c:'#ffc078',belly:'#ffe8cc',muzzle:'#fff4e6',ears:'round',earIn:'#e8590c',nose:'#a0522d',extra:(g,hy,H)=>{for(let i=0;i<14;i++){const a=i/14*Math.PI*2;ball(g,.1,'#e8590c',Math.cos(a)*H*1.02,hy+Math.sin(a)*H*1.02,-.04,1,1,.7);}cap(g,V3(.15,.1,-.2),V3(.4,.25,-.3),.03,'#ffc078');ball(g,.06,'#e8590c',.42,.27,-.3);}}),s));
M.dog=S(s=>fin(critter({c:'#e9b872',belly:'#fff4e6',muzzle:'#fff4e6',ears:'flop',earC:'#a0522d',extra:(g)=>{cap(g,V3(0,.15,-.24),V3(.05,.38,-.36),.04,'#e9b872');}}),s));
M.puppy=S(s=>fin(critter({c:'#f8f0e3',belly:'#ffffff',muzzle:'#ffffff',ears:'flop',earC:'#8d5a3b',head:.26,extra:(g,hy,H)=>{ball(g,.07,'#8d5a3b',.1,hy+.08,H*.8,1,1,.4);cap(g,V3(0,.15,-.24),V3(.05,.38,-.36),.04,'#f8f0e3');}}),s));
M.cat=S(s=>fin(critter({c:'#ffa94d',belly:'#fff4e6',muzzle:'#fff4e6',ears:'point',nose:'#ff8fab',extra:(g,hy,H)=>{[-1,1].forEach(k=>[0,1].forEach(j=>cap(g,V3(k*.07,hy-H*.25+j*.03,H*1.1),V3(k*.22,hy-H*.22+j*.06,H*1.05),.006,'#495057')));cap(g,V3(.12,.1,-.22),V3(.3,.55,-.3),.04,'#ffa94d');}}),s));
M.kitten=S(s=>fin(critter({c:'#ced4da',belly:'#ffffff',muzzle:'#ffffff',ears:'point',nose:'#ff8fab',head:.27,extra:(g)=>{cap(g,V3(.12,.1,-.22),V3(.3,.5,-.3),.04,'#ced4da');}}),s));
M.rabbit=S(s=>fin(critter({c:'#f8f9fa',belly:'#ffffff',muzzle:'#ffffff',ears:'long',nose:'#ff8fab',extra:(g)=>{ball(g,.08,'#ffffff',0,.2,-.27);}}),s));
M.cow=S(s=>fin(critter({c:'#ffffff',belly:'#ffffff',muzzle:'#ffc9de',ears:'flop',earC:'#ffffff',nose:'#e64980',head:.26,extra:(g,hy,H)=>{[[-.12,.35,.2],[.14,.25,.22],[-.08,hy+.12,.15]].forEach(p=>ball(g,.07,'#343a40',p[0],p[1],p[2],1,1,.4));
  [-1,1].forEach(k=>{const c=mesh(new THREE.ConeGeometry(.04,.12,14),soft('#ffe066'));c.position.set(k*.13,hy+H*.95,0);c.rotation.z=-k*.4;g.add(c);});}}),s));
M.goat=S(s=>fin(critter({c:'#f1f3f5',belly:'#ffffff',muzzle:'#ffffff',ears:'flop',earC:'#e9ecef',nose:'#868e96',extra:(g,hy,H)=>{[-1,1].forEach(k=>{const h=mesh(new THREE.TorusGeometry(.08,.025,10,20,Math.PI*1.2),soft('#c9a26b'));h.position.set(k*.1,hy+H*.95,-.03);h.rotation.y=Math.PI/2;g.add(h);});ball(g,.05,'#dee2e6',0,hy-H*.75,H*.85,1,1.6,.8);}}),s));
M.gorilla=S(s=>fin(critter({c:'#5c5f66',belly:'#a6a9b0',muzzle:'#a6a9b0',ears:'round',earIn:'#a6a9b0',head:.25,nose:'#343a40'}),s*1.05));
M.elephant=S(s=>fin(critter({c:'#a5b4d8',belly:'#c5cfe8',muzzle:false,nose:false,ears:'big',earC:'#bfc8ea',head:.27,extra:(g,hy,H)=>{cap(g,V3(0,hy-H*.2,H*.95),V3(0,hy-H*.75,H*1.25),.06,'#a5b4d8');ball(g,.06,'#a5b4d8',0,hy-H*.85,H*1.3);}}),s));
M.giraffe=S(s=>{const g=critter({c:'#ffd43b',belly:'#fff3bf',muzzle:'#fff3bf',ears:'point',head:.2,hy:1.15,nose:'#8d5a3b',k:.62,extra:(g,hy)=>{cap(g,V3(0,.45,.02),V3(0,hy-.1,.02),.1,'#ffd43b');[[.05,.6],[-.06,.8],[.06,.98],[.12,.35],[-.15,.28]].forEach(p=>ball(g,.045,'#e8590c',p[0],p[1],.12,1,1,.35));[-1,1].forEach(k=>{cap(g,V3(k*.05,hy+.15,0),V3(k*.06,hy+.27,0),.018,'#e8590c');ball(g,.032,'#a0522d',k*.06,hy+.29,0);});}});return fin(g,s);});
M.frog=S(s=>{const g=new THREE.Group();const C='#69db7c';ball(g,.27,C,0,.24,0,1.15,.85,1);ball(g,.15,'#d3f9d8',0,.2,.16,1.3,.9,.6);[-1,1].forEach(k=>{ball(g,.1,C,k*.13,.48,.1);ball(g,.06,'#ffffff',k*.13,.5,.17,1,1,.6,{r:.2,cc:1});ball(g,.035,'#1b1b2f',k*.13,.5,.21,1,1.1,.5,{r:.2,cc:1});ball(g,.012,'#ffffff',k*.13+.012,.52,.23,1,1,1,{e:'#fff'});
  ball(g,.09,C,k*.24,.08,.12,1.3,.5,1.4);ball(g,.035,'#ff9ab0',k*.17,.3,.24,1,.6,.35);});const sm=mesh(new THREE.TorusGeometry(.1,.012,8,24,Math.PI),soft('#2b8a3e'));sm.position.set(0,.33,.27);sm.rotation.z=Math.PI;g.add(sm);return fin(g,s*.85);});
M.chick=S(s=>{const g=new THREE.Group();ball(g,.26,'#ffe066',0,.27,0,1,.95,1);ball(g,.06,'#ff922b',0,.33,.25,1.2,.6,1.1);[-1,1].forEach(k=>{ball(g,.09,'#ffd43b',k*.24,.28,0,.4,.8,.9);ball(g,.06,'#ff922b',k*.09,.02,.08,1.2,.35,1.5);});ball(g,.05,'#ffd43b',0,.55,0,.6,1,.6);face(g,0,.41,.22,.85,{sp:.075,noSmile:true});return fin(g,s*.9);});
M.penguin=S(s=>{const g=new THREE.Group();ball(g,.27,'#364fc7',0,.36,0,1,1.25,.95);ball(g,.2,'#ffffff',0,.33,.1,1,1.2,.7);[-1,1].forEach(k=>{const w=ball(g,.08,'#364fc7',k*.27,.35,0,.35,1.3,.8);w.rotation.z=k*.3;ball(g,.07,'#ff922b',k*.09,.03,.1,1.2,.35,1.5);});
  ball(g,.06,'#ff922b',0,.5,.27,1,.55,1.1);face(g,0,.58,.22,.85,{sp:.075,noSmile:true});return fin(g,s*.85);});
M.eagle=S(s=>{const g=new THREE.Group();ball(g,.26,'#8d5a3b',0,.32,0,1,1.15,.9);ball(g,.2,'#ffffff',0,.68,.02);ball(g,.06,'#ffd43b',0,.63,.2,1,.7,1.3);[-1,1].forEach(k=>{const w=ball(g,.2,'#7a4a2e',k*.3,.38,-.02,.35,1,.85);w.rotation.z=k*.4;ball(g,.06,'#ffd43b',k*.1,.04,.1,1.2,.4,1.4);});face(g,0,.73,.17,.85,{sp:.075,noSmile:true});return fin(g,s*.85);});
M.fish=S(s=>{const g=new THREE.Group();ball(g,.24,'#ff922b',0,.3,0,1.35,1,.7);const t=mesh(new THREE.ConeGeometry(.16,.24,24),soft('#ffa94d'));t.rotation.z=Math.PI/2;t.position.set(-.38,.3,0);g.add(t);ball(g,.08,'#ffd8a8',.0,.5,0,1,.6,.3);
  [[.05,.3],[-.1,.3]].forEach(p=>ball(g,.06,'#ffffff',p[0],p[1],.14,.4,1.4,.25));ball(g,.06,'#ffffff',.2,.36,.13,1,1,.5,{r:.2,cc:1});ball(g,.035,'#1b1b2f',.21,.36,.16,1,1.1,.5,{r:.2,cc:1});ball(g,.03,'#ff9ab0',.24,.27,.12,1,.6,.35);return fin(g,s*.85);});
M.dolphin=S(s=>{const g=new THREE.Group();ball(g,.22,'#74c0fc',0,.32,0,1.6,.9,.8);ball(g,.15,'#e7f5ff',.05,.26,.08,1.6,.6,.6);ball(g,.07,'#74c0fc',.38,.28,0,1.4,.7,.8);const f=mesh(new THREE.ConeGeometry(.08,.18,20),soft('#4dabf7'));f.position.set(-.02,.55,0);f.rotation.z=-.3;g.add(f);
  const t=mesh(new THREE.ConeGeometry(.1,.2,20),soft('#4dabf7'));t.position.set(-.4,.38,0);t.rotation.z=.9;g.add(t);face(g,.22,.38,.15,.75,{sp:.06});return fin(g,s*.9);});
M.dinosaur=S(s=>{const g=new THREE.Group();const C='#8ce99a';ball(g,.27,C,0,.3,0,1.2,1,.9);cap(g,V3(.15,.45,0),V3(.28,.7,.04),.11,C);ball(g,.17,C,.3,.82,.08,1.1,1,1);cap(g,V3(-.25,.25,0),V3(-.55,.12,0),.08,C);
  for(let i=0;i<5;i++){const c=mesh(new THREE.ConeGeometry(.05,.1,12),soft('#ffa94d'));c.position.set(-.25+i*.13,.58-Math.abs(i-2)*.03,0);g.add(c);}[-1,1].forEach(k=>ball(g,.09,C,k*.12,.06,.12,1,.7,1.2));face(g,.33,.86,.22,.8,{sp:.065});return fin(g,s*.9);});
M.bee=S(s=>{const g=new THREE.Group();ball(g,.22,'#ffd43b',0,.32,0,1.25,1,1);[-.08,.1].forEach(x=>{const r=mesh(new THREE.TorusGeometry(.2,.035,10,32),soft('#343a40'));r.position.set(x,.32,0);r.rotation.y=Math.PI/2;r.scale.set(1,1.02,1.02);g.add(r);});
  [-1,1].forEach(k=>{const w=ball(g,.14,'#e7f5ff',-.02,.55,k*.12,.6,.25,1,{r:.1,cc:1});w.material=new THREE.MeshPhysicalMaterial({color:'#e7f5ff',transparent:true,opacity:.75,clearcoat:1,roughness:.2});w.material.userData.lux=1;});face(g,.22,.36,.12,.8,{sp:.06});return fin(g,s*.85);});
M.crab=S(s=>{const g=new THREE.Group();const C='#ff6b6b';ball(g,.25,C,0,.22,0,1.25,.7,1);[-1,1].forEach(k=>{cap(g,V3(k*.22,.2,.1),V3(k*.38,.35,.2),.04,C);ball(g,.09,C,k*.42,.42,.24,1,.8,.6);for(let i=0;i<3;i++)cap(g,V3(k*.22,.15,-.08+i*.08),V3(k*.42,.02,-.12+i*.1),.025,C);
  cap(g,V3(k*.07,.3,.12),V3(k*.09,.45,.14),.02,C);ball(g,.05,'#ffffff',k*.09,.47,.15,1,1,.7,{r:.2,cc:1});ball(g,.03,'#1b1b2f',k*.09,.47,.19,1,1,.6,{r:.2,cc:1});});const sm=mesh(new THREE.TorusGeometry(.05,.01,8,20,Math.PI),soft('#7a2e3a'));sm.position.set(0,.2,.24);sm.rotation.z=Math.PI;g.add(sm);return fin(g,s*.9);});
/* things */
M.ball=S(s=>{const g=new THREE.Group();ball(g,.32,'#ff6b6b',0,.32,0,1,1,1,{r:.3,cc:1});[['#ffd43b',0],['#4dabf7',Math.PI/2]].forEach(([c,a])=>{const t=mesh(new THREE.TorusGeometry(.322,.06,12,48),soft(c,{r:.3,cc:1}));t.position.y=.32;t.rotation.y=a;g.add(t);});ball(g,.33,'#ffffff',0,.32,0,.15,1.0,1.0,{r:.3,cc:1}).visible=false;return fin(g,s*.8);});
M.banana=S(s=>{const g=new THREE.Group();const t=mesh(new THREE.TorusGeometry(.32,.09,20,40,Math.PI*.75),soft('#ffe066',{r:.4,cc:.7}));t.rotation.z=Math.PI*1.12;t.position.set(0,.45,0);t.scale.set(1,1,1);g.add(t);ball(g,.035,'#6b4f2a',-.27,.56,0);ball(g,.03,'#6b4f2a',.26,.28,0);return fin(g,s*.9);});
M.bus=S(s=>{const g=new THREE.Group();box(g,.95,.5,.48,'#ffd43b',0,.36,0);[-.3,-.08,.14].forEach(x=>box(g,.17,.15,.03,'#a5d8ff',x,.45,.24,{r:.15,cc:1}));box(g,.12,.28,.03,'#74c0fc',.36,.38,.24);box(g,.97,.05,.5,'#ff8787',0,.25,0);
  [[-.28,1],[.28,1],[-.28,-1],[.28,-1]].forEach(([x,k])=>{const w=cyl(g,.1,.1,.08,'#495057',x,.12,k*.23,{r:.6,cc:.2});w.rotation.x=Math.PI/2;});ball(g,.04,'#fff3bf',.48,.28,.14,1,1,.6,{e:'#665500'});ball(g,.04,'#fff3bf',.48,.28,-.14,1,1,.6,{e:'#665500'});return fin(g,s*.8);});
M.boat=S(s=>{const g=new THREE.Group();const h=mesh(lathe([[0,0],[.18,.02],[.3,.12],[.34,.22],[0,.22]]),soft('#ff8787'));h.scale.set(1.5,1,.8);g.add(h);box(g,.6,.04,.4,'#fff4e6',0,.22,0);cyl(g,.02,.02,.7,'#8d5a3b',0,.55,0);
  const sl=mesh(new THREE.ConeGeometry(.22,.55,3),soft('#ffffff'));sl.position.set(.1,.58,0);sl.scale.z=.15;g.add(sl);box(g,.12,.08,.01,'#4dabf7',0,.92,0);return fin(g,s*.85);});
M.book=S(s=>{const g=new THREE.Group();box(g,.5,.62,.12,'#4dabf7',0,.33,0);box(g,.44,.58,.1,'#fffdf5',.03,.33,0);box(g,.3,.08,.01,'#ffd43b',0,.45,.065);const st=ball(g,.05,'#ffd43b',0,.3,.065,1,1,.3,{e:'#554400'});return fin(g,s*.9);});
M.car=S(s=>{const g=new THREE.Group();box(g,.85,.28,.46,'#ff6b6b',0,.25,0);box(g,.48,.26,.42,'#ff8787',-.04,.48,0);box(g,.2,.16,.43,'#a5d8ff',.08,.49,0,{r:.15,cc:1});box(g,.16,.16,.43,'#a5d8ff',-.18,.49,0,{r:.15,cc:1});
  [[-.25,1],[.25,1],[-.25,-1],[.25,-1]].forEach(([x,k])=>{const w=cyl(g,.11,.11,.09,'#495057',x,.12,k*.22,{r:.6,cc:.2});w.rotation.x=Math.PI/2;cyl(g,.05,.05,.1,'#dee2e6',x,.12,k*.23).rotation.x=Math.PI/2;});face(g,.43,.29,.12,.7,{sp:.1,noCheek:true});return fin(g,s*.8);});
M.cake=S(s=>{const g=new THREE.Group();cyl(g,.32,.32,.24,'#ffc9de',0,.12,0);cyl(g,.33,.33,.06,'#ffffff',0,.26,0);cyl(g,.24,.24,.18,'#ffe3ec',0,.38,0);cyl(g,.25,.25,.05,'#ffffff',0,.48,0);
  for(let i=0;i<8;i++){const a=i/8*Math.PI*2;ball(g,.035,['#ff6b6b','#ffd43b','#4dabf7','#69db7c'][i%4],Math.cos(a)*.27,.29,Math.sin(a)*.27);}ball(g,.06,'#e03131',0,.55,0,1,1,1,{r:.3,cc:1});return fin(g,s*.85);});
M.carrot=S(s=>{const g=new THREE.Group();const c=mesh(lathe([[0,0],[.05,.06],[.1,.25],[.13,.45],[.12,.55],[0,.56]]),soft('#ff922b'));g.add(c);[-1,0,1].forEach(k=>{const l=ball(g,.05,'#51cf66',k*.05,.66,0,.5,1.6,.5);l.rotation.z=-k*.4;});return fin(g,s*.95);});
M.cookie=S(s=>{const g=new THREE.Group();const c=cyl(g,.3,.3,.09,'#e0a96d',0,.3,0);c.rotation.x=Math.PI/2.4;[[-.1,.38],[.1,.4],[0,.25],[.14,.22],[-.14,.24]].forEach(p=>ball(g,.035,'#5c3d2e',p[0],p[1],.07));ball(g,.3,'#e0a96d',0,.04,0,.8,.1,.5).visible=false;return fin(g,s*.9);});
M.drum=S(s=>{const g=new THREE.Group();cyl(g,.3,.3,.36,'#ff6b6b',0,.2,0);cyl(g,.31,.31,.04,'#ffffff',0,.39,0);cyl(g,.31,.31,.04,'#ffd43b',0,.02,0);for(let i=0;i<6;i++){const a=i/6*Math.PI*2;cap(g,V3(Math.cos(a)*.305,.05,Math.sin(a)*.305),V3(Math.cos(a+.5)*.305,.36,Math.sin(a+.5)*.305),.012,'#ffd43b');}
  [-1,1].forEach(k=>{cap(g,V3(k*.12,.44,.05),V3(k*.32,.6,.12),.018,'#c9a26b');ball(g,.04,'#ff8787',k*.33,.61,.12);});return fin(g,s*.85);});
M.donut=S(s=>{const g=new THREE.Group();const d=tor(g,.2,.11,'#e9b872',0,.3,0);const f=tor(g,.2,.1,'#ff8fc7',0,.31,.03);f.scale.z=.6;[0,1,2,3,4,5,6,7].forEach(i=>{const a=i/8*Math.PI*2;box(g,.05,.015,.015,['#4dabf7','#ffd43b','#69db7c','#ffffff'][i%4],Math.cos(a)*.2,.31+Math.sin(a)*.2,.1);});return fin(g,s*.9);});
M.door=S(s=>{const g=new THREE.Group();box(g,.5,.85,.08,'#c08552',0,.43,0);box(g,.38,.3,.02,'#a8734f',0,.62,.045);box(g,.38,.3,.02,'#a8734f',0,.25,.045);ball(g,.04,'#ffd43b',.17,.43,.06,1,1,1,{r:.2,cc:1,m:.3});return fin(g,s*.85);});
M.egg=S(s=>{const g=new THREE.Group();g.add(mesh(lathe([[0,0],[.15,.02],[.22,.12],[.24,.25],[.2,.4],[.12,.5],[0,.53]]),soft('#fff8ec',{r:.3,cc:.9})));face(g,0,.25,.235,.9,{sp:.07});return fin(g,s*.95);});
M.envelope=S(s=>{const g=new THREE.Group();box(g,.62,.42,.06,'#fff4e6',0,.25,0);const f=mesh(new THREE.ConeGeometry(.33,.24,4),soft('#ffe8cc'));f.rotation.z=Math.PI;f.rotation.y=Math.PI/4;f.scale.z=.12;f.position.set(0,.37,.03);g.add(f);
  const h=ball(g,.06,'#ff6b6b',0,.28,.05,1,1,.4);return fin(g,s*.9);});
M.ear=S(s=>{const g=new THREE.Group();const e=tor(g,.18,.08,'#ffc9a8',0,.35,0,Math.PI*1.6);e.rotation.z=-Math.PI*.3;ball(g,.12,'#ffb38a',0,.33,-.02,1,1.3,.5);return fin(g,s*.9);});
M.eye=S(s=>{const g=new THREE.Group();ball(g,.28,'#ffffff',0,.3,0,1.2,.85,.6,{r:.3,cc:1});ball(g,.14,'#4dabf7',0,.3,.13,1,1,.4,{r:.25,cc:1});ball(g,.07,'#1b1b2f',0,.3,.18,1,1,.4,{r:.2,cc:1});ball(g,.025,'#ffffff',.04,.34,.2,1,1,1,{e:'#fff'});return fin(g,s*.9);});
M.earth=S(s=>{const g=new THREE.Group();ball(g,.32,'#4dabf7',0,.33,0,1,1,1,{r:.4,cc:.8});[[.1,.45,.25,.12],[-.15,.25,.27,.1],[.18,.2,.22,.09],[-.05,.55,.18,.08]].forEach(p=>ball(g,p[3],'#69db7c',p[0],p[1],p[2],1.3,1,.45));face(g,0,.36,.31,.9,{sp:.09});return fin(g,s*.85);});
M.flower=S(s=>{const g=new THREE.Group();cap(g,V3(0,0,0),V3(0,.45,0),.025,'#40c057');const l=ball(g,.07,'#51cf66',.08,.18,0,1.4,.4,.7);l.rotation.z=.4;for(let i=0;i<6;i++){const a=i/6*Math.PI*2;ball(g,.09,'#ff8fc7',Math.cos(a)*.12,.55+Math.sin(a)*.12,0,1,1,.45);}ball(g,.08,'#ffd43b',0,.55,.03,1,1,.6);face(g,0,.57,.075,.6,{sp:.06,noCheek:true});return fin(g,s*.9);});
M.fork=S(s=>{const g=new THREE.Group();cap(g,V3(0,.05,0),V3(0,.45,0),.035,'#ced4da',{m:.5,r:.3});box(g,.2,.08,.04,'#ced4da',0,.5,0,{m:.5,r:.3});[-.075,-.025,.025,.075].forEach(x=>cap(g,V3(x,.52,0),V3(x,.72,0),.015,'#ced4da',{m:.5,r:.3}));return fin(g,s*.9);});
M.flag=S(s=>{const g=new THREE.Group();cap(g,V3(-.2,0,0),V3(-.2,.85,0),.02,'#adb5bd');ball(g,.04,'#ffd43b',-.2,.88,0);box(g,.42,.28,.03,'#ff6b6b',.02,.68,0);ball(g,.05,'#ffffff',0,.68,.02,1,1,.3);return fin(g,s*.85);});
M.fire=S(s=>{const g=new THREE.Group();[[-.12,0],[.12,0],[0,.1]].forEach(([x,z])=>{const l=cap(g,V3(x-.1,.05,z),V3(x+.1,.08,z+.05),.04,'#a0522d');});[['#ff6b6b',.22,.28],['#ffa94d',.16,.32],['#ffe066',.09,.3]].forEach(([c,r,y])=>{const f=ball(g,r,c,0,y,0,1,1.6,1,{e:c==='#ffe066'?'#665500':'#661a00',cc:.2});});face(g,0,.3,.17,.75,{sp:.06});return fin(g,s*.9);});
M.fries=S(s=>{const g=new THREE.Group();for(let i=0;i<7;i++){const x=(i-3)*.05;cap(g,V3(x,.3,0),V3(x+(i%2?.03:-.02),.62+(i%3)*.04,0),.022,'#ffd43b');}const b=mesh(lathe([[0,0],[.14,0],[.2,.38],[0,.38]],4),soft('#ff6b6b'));b.rotation.y=Math.PI/4;b.scale.z=.6;g.add(b);ball(g,.05,'#ffffff',0,.2,.09,1,1,.3);return fin(g,s*.9);});
M.grapes=S(s=>{const g=new THREE.Group();[[0,.15],[-.1,.27],[.1,.27],[-.15,.4],[0,.4],[.15,.4],[-.1,.53],[.1,.53],[0,.62]].forEach(p=>ball(g,.085,'#9775fa',p[0],p[1],(p[1]>.3?0:.02)+(Math.abs(p[0])<.05?.05:0),1,1,1,{r:.3,cc:1}));cap(g,V3(0,.68,0),V3(.03,.8,0),.02,'#8d5a3b');const l=ball(g,.07,'#51cf66',.1,.76,0,1.4,.35,.8);l.rotation.z=.4;return fin(g,s*.9);});
M.gift=S(s=>{const g=new THREE.Group();box(g,.5,.4,.5,'#ff8fc7',0,.2,0);box(g,.56,.1,.56,'#ff6ba8',0,.44,0);box(g,.1,.42,.51,'#ffd43b',0,.2,0);box(g,.51,.42,.1,'#ffd43b',0,.2,0);[-1,1].forEach(k=>{const b=tor(g,.07,.025,'#ffd43b',k*.07,.54,0);b.rotation.y=k*.6;});return fin(g,s*.85);});
M.guitar=S(s=>{const g=new THREE.Group();ball(g,.2,'#ffa94d',0,.22,0,1,1,.35);ball(g,.15,'#ffa94d',0,.45,0,1,1,.35);ball(g,.06,'#5c3d2e',0,.32,.07,1,1,.3);box(g,.07,.5,.04,'#8d5a3b',0,.75,0);box(g,.1,.12,.05,'#5c3d2e',0,1.02,0);return fin(g,s*.75);});
M.glasses=S(s=>{const g=new THREE.Group();[-1,1].forEach(k=>{tor(g,.13,.03,'#e64980',k*.16,.35,0);const l=ball(g,.12,'#d0ebff',k*.16,.35,0,1,1,.15);l.material=new THREE.MeshPhysicalMaterial({color:'#d0ebff',transparent:true,opacity:.55,clearcoat:1,roughness:.1});l.material.userData.lux=1;cap(g,V3(k*.29,.37,0),V3(k*.3,.37,-.3),.02,'#e64980');});cap(g,V3(-.04,.38,0),V3(.04,.38,0),.02,'#e64980');return fin(g,s*.95);});
P.LUXH={soft,ball,cyl,cap,box,tor,lathe,face,fin,critter,rbox,V3,mesh,rcyl};
})();
/* ===== the rest of the book: H to Z, numbers, shapes and colours ===== */
(function(){
"use strict";
const P=window.PM;if(!P||!P.LUXM||!P.LUXH)return;const {THREE}=P;const M=P.LUXM;const {soft,ball,cyl,cap,box,tor,lathe,face,fin,critter,V3,mesh}=P.LUXH;
const S=fn=>s=>fn(s||1);const G0=()=>new THREE.Group();
const ext=(g,pts,depth,c,x,y,z,o)=>{const sh=new THREE.Shape();pts.forEach((p,i)=>i?sh.lineTo(p[0],p[1]):sh.moveTo(p[0],p[1]));const geo=new THREE.ExtrudeGeometry(sh,{depth,bevelEnabled:true,bevelThickness:.03,bevelSize:.025,bevelSegments:6,curveSegments:16});geo.center();const m=mesh(geo,soft(c,o));m.position.set(x||0,y||0,z||0);g.add(m);return m;};
const txt=(g,str,c,size,y,z)=>{const t=P.PKX&&P.PKX.txt3?P.PKX.txt3(str,c,{size,depth:size*.35}):null;if(t){t.position.set(0,y||0,z||0);g.add(t);}return t;};
const smiley=(g,y,mood)=>{ball(g,.3,'#ffd43b',0,y,0,1,1,.95,{r:.4,cc:.8});return g;};
/* H */
M.hat=S(s=>{const g=G0();cyl(g,.42,.42,.05,'#845ef7',0,.03,0);cyl(g,.22,.25,.42,'#845ef7',0,.26,0);cyl(g,.255,.255,.07,'#ff8fc7',0,.12,0);const f=ball(g,.07,'#ffd43b',.2,.15,.12,1,1,.6);return fin(g,s*.85);});
M.house=S(s=>{const g=G0();box(g,.62,.46,.5,'#fff4e6',0,.23,0);const r=mesh(new THREE.ConeGeometry(.52,.36,4),soft('#ff6b6b'));r.rotation.y=Math.PI/4;r.position.y=.64;r.scale.set(1,1,.8);g.add(r);box(g,.16,.26,.03,'#a0522d',0,.14,.26);
  [-1,1].forEach(k=>box(g,.13,.13,.03,'#a5d8ff',k*.19,.3,.26,{r:.15,cc:1}));box(g,.1,.2,.1,'#868e96',.17,.78,0);return fin(g,s*.85);});
M.horse=S(s=>{const g=critter({c:'#c08552',belly:'#e9c9a8',muzzle:'#e9c9a8',ears:'point',earIn:'#e9c9a8',nose:'#5c3d2e',head:.22,extra:(g,hy,H)=>{for(let i=0;i<5;i++)ball(g,.06,'#5c3d2e',0,hy+H*.9-i*.09,-H*.7-i*.02,1,1,.8);}});return fin(g,s);});
M.heart=S(s=>{const g=G0();ball(g,.17,'#ff6b8b',-.12,.5,0,1,1,.7,{r:.3,cc:1});ball(g,.17,'#ff6b8b',.12,.5,0,1,1,.7,{r:.3,cc:1});const c=mesh(new THREE.ConeGeometry(.26,.38,32),soft('#ff6b8b',{r:.3,cc:1}));c.rotation.z=Math.PI;c.position.y=.27;c.scale.z=.65;g.add(c);face(g,0,.45,.13,.8,{sp:.07});return fin(g,s*.9);});
M.hamburger=S(s=>{const g=G0();ball(g,.28,'#e8a85c',0,.42,0,1,.5,1);cyl(g,.29,.29,.08,'#8d4f2a',0,.27,0);cyl(g,.31,.31,.02,'#ffd43b',0,.32,0);cyl(g,.3,.3,.03,'#69db7c',0,.22,0);cyl(g,.27,.27,.1,'#e8a85c',0,.12,0);for(let i=0;i<6;i++)ball(g,.015,'#fff4e6',Math.cos(i)*.15,.53,Math.sin(i)*.15+.05);return fin(g,s*.9);});
M.hedgehog=S(s=>{const g=critter({c:'#c9a26b',belly:'#f5dcc3',muzzle:'#f5dcc3',ears:'round',head:.22,extra:(g,hy)=>{for(let i=0;i<16;i++){const a=i/16*Math.PI*2,c=mesh(new THREE.ConeGeometry(.05,.16,10),soft('#7a5230'));c.position.set(Math.cos(a)*.27,.38+Math.sin(a)*.25,-.12);c.rotation.z=a-Math.PI/2;g.add(c);}}});return fin(g,s);});
M.helicopter=S(s=>{const g=G0();ball(g,.25,'#ffa94d',0,.4,0,1.3,1,1);ball(g,.15,'#a5d8ff',.18,.45,0,1,1,1.3,{r:.15,cc:1});cap(g,V3(-.3,.42,0),V3(-.7,.5,0),.05,'#ffa94d');const r=G0();r.position.set(0,.7,0);box(r,1.1,.03,.08,'#495057',0,0,0);box(r,.08,.03,1.1,'#495057',0,0,0);r.userData.luxSpin=1;r.rotation.order='YXZ';g.add(r);
  [-1,1].forEach(k=>cap(g,V3(-.2,.08,k*.17),V3(.25,.08,k*.17),.025,'#868e96'));face(g,.24,.42,.2,.8,{sp:.06,noCheek:true});return fin(g,s*.85);});
/* I */
M.igloo=S(s=>{const g=G0();const d=mesh(new THREE.SphereGeometry(.42,40,20,0,Math.PI*2,0,Math.PI/2),soft('#f1f8ff'));g.add(d);for(let i=1;i<4;i++){const t=tor(g,Math.sqrt(.42*.42-(i*.1)**2),.008,'#c5dbf0',0,i*.1,0);t.rotation.x=Math.PI/2;}const e=mesh(new THREE.CylinderGeometry(.14,.14,.22,24,1,false,0,Math.PI),soft('#e7f5ff'));e.rotation.x=Math.PI/2;e.rotation.z=Math.PI/2;e.position.set(0,.0,.4);e.rotation.set(0,0,0);
  const door=mesh(new THREE.SphereGeometry(.15,24,16,0,Math.PI*2,0,Math.PI/2),soft('#5c7cfa'));door.scale.set(1,1.1,.4);door.position.set(0,0,.4);g.add(door);return fin(g,s*.9);});
M['ice cream']=S(s=>{const g=G0();const c=mesh(new THREE.ConeGeometry(.17,.45,32),soft('#e8b77d'));c.rotation.z=Math.PI;c.position.y=.24;g.add(c);ball(g,.17,'#ffc9de',0,.52,0);ball(g,.15,'#d0ebff',0,.7,0);ball(g,.05,'#e03131',0,.86,0,1,1,1,{r:.3,cc:1});face(g,0,.53,.16,.7,{sp:.06});return fin(g,s*.85);});
M.ice=S(s=>{const g=G0();[[0,.2,0],[.18,.18,.1],[-.12,.4,.05]].forEach(p=>{const b=box(g,.28,.28,.28,'#c5f6fa',p[0],p[1],p[2],{r:.08,cc:1});b.rotation.set(.3,.5,.1);b.material=new THREE.MeshPhysicalMaterial({color:'#c5f6fa',transparent:true,opacity:.8,roughness:.08,clearcoat:1});b.material.userData.lux=1;});return fin(g,s*.9);});
M.island=S(s=>{const g=G0();const w=cyl(g,.5,.5,.04,'#74c0fc',0,.02,0);ball(g,.35,'#ffe8a3',0,.02,0,1,.35,1);cap(g,V3(0,.1,0),V3(.08,.65,0),.035,'#a0522d');for(let i=0;i<5;i++){const a=i/5*Math.PI*2;const l=ball(g,.08,'#51cf66',.08+Math.cos(a)*.15,.66,Math.sin(a)*.15,2,.3,.8);l.rotation.y=-a;}return fin(g,s*.9);});
/* J */
M.jar=S(s=>{const g=G0();const j=mesh(lathe([[0,0],[.2,0],[.24,.1],[.24,.4],[.18,.48],[.18,.52],[0,.52]]),new THREE.MeshPhysicalMaterial({color:'#e3fafc',transparent:true,opacity:.55,roughness:.05,clearcoat:1}));j.material.userData.lux=1;g.add(j);ball(g,.2,'#ff6b6b',0,.2,0,1,.9,1);cyl(g,.2,.2,.08,'#ffd43b',0,.55,0);face(g,0,.25,.24,.8,{sp:.07});return fin(g,s*.9);});
M.juice=S(s=>{const g=G0();box(g,.3,.5,.22,'#ffa94d',0,.25,0);box(g,.3,.18,.23,'#fff4e6',0,.3,0);ball(g,.06,'#ff922b',0,.3,.12,1,1,.3);cap(g,V3(.08,.5,0),V3(.12,.72,0),.015,'#ff6b8b');return fin(g,s*.9);});
M.jug=S(s=>{const g=G0();g.add(mesh(lathe([[0,0],[.18,0],[.24,.15],[.22,.4],[.14,.52],[.15,.58],[0,.58]]),soft('#74c0fc')));const h=tor(g,.11,.03,'#74c0fc',.22,.32,0,Math.PI*1.3);h.rotation.z=-Math.PI*.65;return fin(g,s*.9);});
M.jellyfish=S(s=>{const g=G0();const b=mesh(new THREE.SphereGeometry(.26,32,16,0,Math.PI*2,0,Math.PI/2),soft('#e599f7',{r:.2,cc:1}));b.position.y=.4;g.add(b);for(let i=0;i<6;i++){const a=i/6*Math.PI*2;cap(g,V3(Math.cos(a)*.15,.4,Math.sin(a)*.15),V3(Math.cos(a)*.18,.08,Math.sin(a)*.18),.022,'#f3d9fa');}face(g,0,.5,.24,.8,{sp:.07});return fin(g,s*.9);});
/* K */
M.kite=S(s=>{const g=G0();const k=ext(g,[[0,.35],[.24,0],[0,-.4],[-.24,0]],.04,'#ff6b6b',0,.5,0);box(g,.02,.75,.02,'#ffd43b',0,.5,.04);box(g,.48,.02,.02,'#ffd43b',0,.5,.04);for(let i=0;i<4;i++)ball(g,.04,['#4dabf7','#ffd43b','#69db7c','#ff8fc7'][i],Math.sin(i)*.06,.06-i*.0,.0+i*.0,1,.6,.6).position.set(Math.sin(i*1.4)*.08,.06+i*.0,0);cap(g,V3(0,.1,0),V3(0,.0,0),.008,'#495057');face(g,0,.55,.05,.7,{sp:.06});return fin(g,s*.9);});
M.key=S(s=>{const g=G0();const r=tor(g,.12,.045,'#ffd43b',-.22,.32,0);cap(g,V3(-.1,.32,0),V3(.32,.32,0),.035,'#ffd43b',{r:.25,m:.3});box(g,.05,.1,.05,'#ffd43b',.22,.25,0,{r:.25,m:.3});box(g,.05,.08,.05,'#ffd43b',.3,.26,0,{r:.25,m:.3});return fin(g,s*.9);});
M.kangaroo=S(s=>{const g=critter({c:'#d9925b',belly:'#f5d6b8',muzzle:'#f5d6b8',ears:'long',earIn:'#f5d6b8',head:.21,hy:.82,extra:(g)=>{cap(g,V3(0,.15,-.2),V3(0,.05,-.6),.07,'#d9925b');ball(g,.09,'#f5d6b8',0,.25,.2,1.3,.8,.5);}});return fin(g,s);});
M.kiwi=S(s=>{const g=G0();ball(g,.3,'#8d6e4f',0,.3,-.03,1,1,.8,{r:.8,cc:0});const f=cyl(g,.27,.27,.04,'#8ce99a',0,.3,.2);f.rotation.x=Math.PI/2;const c=cyl(g,.09,.09,.045,'#f4fce3',0,.3,.21);c.rotation.x=Math.PI/2;for(let i=0;i<10;i++){const a=i/10*Math.PI*2;ball(g,.015,'#1b1b2f',Math.cos(a)*.13,.3+Math.sin(a)*.13,.23,1,1.6,.6);}return fin(g,s*.9);});
/* L */
M.lemon=S(s=>{const g=G0();ball(g,.24,'#ffe066',0,.26,0,1.3,1,1,{r:.4,cc:.7});[-1,1].forEach(k=>ball(g,.06,'#ffe066',k*.3,.26,0,1,.8,.8));face(g,0,.3,.23,.8,{sp:.07});return fin(g,s*.9);});
M.leaf=S(s=>{const g=G0();const l=ball(g,.3,'#51cf66',0,.35,0,.7,1,.12,{r:.4,cc:.6});cap(g,V3(0,.05,.03),V3(0,.6,.03),.012,'#2b8a3e');[[-1,.3],[1,.4],[-1,.45],[1,.25]].forEach(([k,y])=>cap(g,V3(0,y,.03),V3(k*.14,y+.08,.03),.008,'#2b8a3e'));return fin(g,s*.9);});
M.ladybug=S(s=>{const g=G0();const b=mesh(new THREE.SphereGeometry(.28,32,16,0,Math.PI*2,0,Math.PI/2),soft('#ff4d5e',{r:.3,cc:1}));b.scale.set(1,1,1.15);b.position.y=.05;g.add(b);box(g,.012,.01,.6,'#1b1b2f',0,.33,0);[[.12,.2,.1],[-.12,.2,.1],[.1,.2,-.12],[-.1,.2,-.12],[0,.27,.02]].forEach(p=>ball(g,.05,'#1b1b2f',p[0],p[1],p[2],1,.5,1));ball(g,.13,'#1b1b2f',0,.1,.3);face(g,0,.13,.42,.65,{sp:.06});return fin(g,s*.9);});
/* M */
M.moon=S(s=>{const g=G0();const m=tor(g,.22,.13,'#fff3bf',0,.4,0,Math.PI*1.1);m.rotation.z=Math.PI*.95;m.material=soft('#ffe066',{e:'#3a3000'});face(g,-.2,.4,.12,.7,{sp:.05,noSmile:true});return fin(g,s*.9);});
M.mouse=S(s=>{const g=critter({c:'#ced4da',belly:'#f1f3f5',muzzle:'#f1f3f5',ears:'big',earC:'#ffc9de',nose:'#ff8fab',head:.22,extra:(g)=>{cap(g,V3(.1,.08,-.2),V3(.45,.15,-.35),.02,'#ffc9de');}});return fin(g,s*.9);});
M.mushroom=S(s=>{const g=G0();cyl(g,.12,.15,.32,'#fff4e6',0,.16,0);const c=mesh(new THREE.SphereGeometry(.32,32,16,0,Math.PI*2,0,Math.PI/2),soft('#ff6b6b'));c.position.y=.3;c.scale.y=.8;g.add(c);[[.15,.42,.15],[-.18,.4,.1],[0,.52,0],[.05,.38,-.22]].forEach(p=>ball(g,.05,'#ffffff',p[0],p[1],p[2],1,.5,1));face(g,0,.18,.13,.6,{sp:.05});return fin(g,s*.9);});
/* N */
M.nest=S(s=>{const g=G0();const n=tor(g,.26,.1,'#b08254',0,.12,0);n.rotation.x=Math.PI/2;ball(g,.24,'#8d6e4f',0,.08,0,1,.35,1);[[-.08,0],[.08,.03],[0,-.08]].forEach(p=>ball(g,.08,'#a5d8ff',p[0],.18,p[1],1,1.25,1,{r:.3,cc:1}));return fin(g,s*.95);});
M.nose=S(s=>{const g=G0();ball(g,.22,'#ffc9a8',0,.3,0,.9,1.1,.9);[-1,1].forEach(k=>{ball(g,.1,'#ffc9a8',k*.15,.18,.03);ball(g,.035,'#c2755a',k*.08,.12,.12,1,.6,1);});return fin(g,s*.95);});
M.nine=S(s=>{const g=G0();txt(g,'9','#4dabf7',.75,0,0);return fin(g,s*.95);});
M.noodles=S(s=>{const g=G0();const b=mesh(new THREE.SphereGeometry(.3,32,16,0,Math.PI*2,Math.PI/2,Math.PI/2),soft('#ff8787'));b.position.y=.3;g.add(b);ball(g,.27,'#ffe8a3',0,.3,0,1,.15,1);[-1,1].forEach(k=>cap(g,V3(k*.04,.32,0),V3(k*.12+.1,.75,-.05),.012,'#c9a26b'));face(g,0,.15,.29,.7,{sp:.07});return fin(g,s*.9);});
/* O */
M.owl=S(s=>{const g=G0();ball(g,.3,'#b08968',0,.34,0,1,1.15,.9);ball(g,.2,'#f5e6d3',0,.3,.12,1,1.2,.6);[-1,1].forEach(k=>{ball(g,.1,'#ffffff',k*.11,.48,.2,1,1,.5,{r:.2,cc:1});ball(g,.055,'#1b1b2f',k*.11,.48,.25,1,1,.5,{r:.2,cc:1});ball(g,.015,'#ffffff',k*.11+.015,.5,.28,1,1,1,{e:'#fff'});const e=mesh(new THREE.ConeGeometry(.06,.14,12),soft('#b08968'));e.position.set(k*.18,.72,0);e.rotation.z=-k*.3;g.add(e);ball(g,.12,'#9c7652',k*.29,.32,0,.35,1,.8);});
  const bk=mesh(new THREE.ConeGeometry(.04,.08,12),soft('#ffa94d'));bk.rotation.x=Math.PI/2+.4;bk.position.set(0,.4,.28);g.add(bk);return fin(g,s*.9);});
M.octopus=S(s=>{const g=G0();ball(g,.28,'#ff8fc7',0,.5,0,1,1.05,1);for(let i=0;i<8;i++){const a=i/8*Math.PI*2;cap(g,V3(Math.cos(a)*.18,.32,Math.sin(a)*.18),V3(Math.cos(a)*.36,.06,Math.sin(a)*.36),.05,'#ff8fc7');ball(g,.05,'#ffa8d5',Math.cos(a)*.38,.05,Math.sin(a)*.38);}face(g,0,.5,.27,.9,{sp:.08});return fin(g,s*.85);});
M.orange=S(s=>{const g=G0();ball(g,.3,'#ff922b',0,.3,0,1,1,1,{r:.55,cc:.6});ball(g,.03,'#2b8a3e',0,.6,0);const l=ball(g,.06,'#51cf66',.06,.62,0,1.6,.35,.8);face(g,0,.32,.29,.85,{sp:.08});return fin(g,s*.85);});
M.onion=S(s=>{const g=G0();g.add(mesh(lathe([[0,0],[.18,.03],[.28,.18],[.24,.36],[.08,.5],[.03,.62],[0,.64]]),soft('#d0a3f0')));[-1,1].forEach(k=>cap(g,V3(k*.01,.6,0),V3(k*.06,.78,0),.012,'#69db7c'));face(g,0,.25,.26,.8,{sp:.07});return fin(g,s*.9);});
/* P */
M.pig=S(s=>{const g=critter({c:'#ffb3c6',belly:'#ffd1dc',muzzle:'#ff8fab',ears:'point',earIn:'#ff8fab',nose:false,head:.25,extra:(g,hy,H)=>{[-1,1].forEach(k=>ball(g,.018,'#c2255c',k*.035,hy-H*.28,H*1.18));const t=tor(g,.04,.012,'#ffb3c6',0,.3,-.27);}});return fin(g,s);});
M.pizza=S(s=>{const g=G0();const p=ext(g,[[0,.42],[-.26,-.2],[.26,-.2]],.06,'#ffd43b',0,.3,0);const cr=cap(g,V3(-.28,.1,0),V3(.28,.1,0),.06,'#e8a85c');[[0,.32],[-.08,.18],[.09,.2]].forEach(p2=>ball(g,.05,'#e03131',p2[0],p2[1],.05,1,1,.3));face(g,0,.22,.07,.6,{sp:.05});return fin(g,s*.9);});
M.pumpkin=S(s=>{const g=G0();for(let i=0;i<6;i++){const a=i/6*Math.PI*2;ball(g,.2,'#ff922b',Math.cos(a)*.13,.27,Math.sin(a)*.13,1,1.05,1);}ball(g,.22,'#ff922b',0,.27,0);cap(g,V3(0,.48,0),V3(.03,.6,0),.035,'#5c940d');face(g,0,.3,.33,.9,{sp:.08});return fin(g,s*.85);});
/* Q */
M.quilt=S(s=>{const g=G0();const cols=['#ff8787','#ffd43b','#74c0fc','#69db7c','#da77f2','#ffa94d'];for(let i=0;i<3;i++)for(let j=0;j<3;j++)box(g,.2,.2,.06,cols[(i+j*2)%6],(i-1)*.21,.2+j*.21,0,{r:.8,cc:0});return fin(g,s*.95);});
M.queen=S(s=>{const g=critter({c:'#ffd8c4',belly:'#da77f2',muzzle:false,nose:false,ears:'none',head:.24,extra:(g,hy,H)=>{ball(g,.26,'#da77f2',0,.32,0,1.1,1.05,.95);ball(g,H*.9,'#a0522d',0,hy+.04,-.05,1.1,1,1);cyl(g,.13,.16,.12,'#ffd43b',0,hy+H+.02,0,{m:.3,r:.3});for(let i=0;i<5;i++){const a=i/5*Math.PI*2;ball(g,.025,'#ff6b8b',Math.cos(a)*.15,hy+H+.1,Math.sin(a)*.15);}}});return fin(g,s);});
M.question=S(s=>{const g=G0();txt(g,'?','#9775fa',.8,0,0);return fin(g,s*.95);});
M.quill=S(s=>{const g=G0();const f=ball(g,.12,'#a5d8ff',0,.45,0,.6,2.6,.15);f.rotation.z=-.4;cap(g,V3(-.16,.08,0),V3(.18,.8,0),.012,'#495057');return fin(g,s*.9);});
/* R */
M.rocket=S(s=>{const g=G0();cyl(g,.18,.22,.6,'#f8f9fa',0,.42,0);const n=mesh(new THREE.ConeGeometry(.18,.3,32),soft('#ff6b6b'));n.position.y=.87;g.add(n);ball(g,.08,'#74c0fc',0,.5,.18,1,1,.4,{r:.15,cc:1});[0,1,2].forEach(j=>{const a=j*Math.PI*2/3;box(g,.04,.22,.18,'#ff6b6b',Math.cos(a)*.2,.2,Math.sin(a)*.2).rotation.y=-a;});ball(g,.1,'#ffd43b',0,.06,0,1,1.4,1,{e:'#663300'});return fin(g,s*.85);});
M.robot=S(s=>{const g=G0();box(g,.4,.36,.3,'#adb5bd',0,.28,0,{m:.3,r:.35});box(g,.36,.28,.28,'#ced4da',0,.65,0,{m:.3,r:.35});[-1,1].forEach(k=>{ball(g,.05,'#74c0fc',k*.08,.67,.14,1,1,.5,{e:'#0b3a66'});cap(g,V3(k*.22,.38,0),V3(k*.3,.2,.05),.04,'#868e96');cap(g,V3(k*.1,.1,0),V3(k*.1,0,0),.05,'#868e96');});
  cap(g,V3(0,.8,0),V3(0,.92,0),.012,'#868e96');ball(g,.04,'#ff6b6b',0,.94,0,1,1,1,{e:'#661111'});box(g,.12,.03,.02,'#495057',0,.58,.14);ball(g,.04,'#ff8787',0,.3,.16,1,1,.5);return fin(g,s*.85);});
M.rainbow=S(s=>{const g=G0();['#ff6b6b','#ffa94d','#ffd43b','#69db7c','#4dabf7','#9775fa'].forEach((c,i)=>tor(g,.42-i*.055,.03,c,0,.05,0,Math.PI));[-1,1].forEach(k=>{ball(g,.1,'#ffffff',k*.33,.06,0);ball(g,.08,'#ffffff',k*.43,.05,.02);});return fin(g,s*.95);});
/* S */
M.sun=S(s=>{const g=G0();ball(g,.26,'#ffd43b',0,.4,0,1,1,.9,{e:'#4a3a00'});for(let i=0;i<10;i++){const a=i/10*Math.PI*2;const c=mesh(new THREE.ConeGeometry(.06,.14,12),soft('#ffa94d'));c.position.set(Math.cos(a)*.36,.4+Math.sin(a)*.36,0);c.rotation.z=a-Math.PI/2;g.add(c);}face(g,0,.42,.24,.9,{sp:.08});return fin(g,s*.85);});
M.snake=S(s=>{const g=G0();const t=tor(g,.22,.08,'#69db7c',0,.08,0,Math.PI*1.6);t.rotation.x=Math.PI/2;cap(g,V3(.2,.08,.1),V3(.15,.35,.15),.08,'#69db7c');ball(g,.12,'#69db7c',.14,.42,.17);face(g,.14,.45,.27,.7,{sp:.05});return fin(g,s*.95);});
M.snail=S(s=>{const g=G0();cap(g,V3(-.3,.06,0),V3(.3,.08,0),.07,'#ffd8a8');ball(g,.1,'#ffd8a8',.32,.18,0);const sh=tor(g,.13,.09,'#da77f2',-.03,.27,0);ball(g,.08,'#e599f7',-.03,.27,.04,1,1,.8);[-1,1].forEach(k=>{cap(g,V3(.32,.25,k*.04),V3(.36,.36,k*.06),.012,'#ffd8a8');ball(g,.025,'#1b1b2f',.36,.37,k*.06);});return fin(g,s*.95);});
M.star=S(s=>{const g=G0();const p=[];for(let i=0;i<10;i++){const a=Math.PI/2+i*Math.PI/5,r=i%2?.16:.36;p.push([Math.cos(a)*r,Math.sin(a)*r]);}ext(g,p,.12,'#ffd43b',0,.4,0,{e:'#3a3000'});face(g,0,.4,.1,.75,{sp:.065});return fin(g,s*.9);});
/* T */
M.tree=S(s=>{const g=G0();cyl(g,.08,.11,.5,'#a8734f',0,.25,0);ball(g,.3,'#6fcf63',0,.65,0);ball(g,.22,'#6fcf63',-.2,.55,.05);ball(g,.22,'#6fcf63',.2,.57,-.02);return fin(g,s*.85);});
M.turtle=S(s=>{const g=G0();const sh=mesh(new THREE.SphereGeometry(.3,32,16,0,Math.PI*2,0,Math.PI/2),soft('#51cf66'));sh.position.y=.08;g.add(sh);for(let i=0;i<5;i++){const a=i/5*Math.PI*2;ball(g,.07,'#2f9e44',Math.cos(a)*.15,.27,Math.sin(a)*.15,1,.4,1);}
  ball(g,.13,'#a9e34b',0,.2,.34);[[-1,1],[1,1],[-1,-1],[1,-1]].forEach(([a,b])=>ball(g,.07,'#a9e34b',a*.22,.05,b*.2,1,.6,1));face(g,0,.23,.45,.6,{sp:.05});return fin(g,s*.95);});
M.tiger=S(s=>{const g=critter({c:'#ff922b',belly:'#fff4e6',muzzle:'#fff4e6',ears:'round',earIn:'#fff4e6',extra:(g,hy,H)=>{[[-.2,.4],[.2,.4],[-.22,.25],[.22,.25]].forEach(p=>box(g,.03,.12,.03,'#343a40',p[0],p[1],.18));[-1,1].forEach(k=>box(g,.03,.08,.02,'#343a40',k*.08,hy+H*.75,H*.6));cap(g,V3(.12,.1,-.22),V3(.32,.5,-.3),.04,'#ff922b');}});return fin(g,s);});
M.train=S(s=>{const g=G0();box(g,.5,.3,.36,'#ff6b6b',.05,.32,0);box(g,.26,.42,.36,'#4dabf7',-.25,.38,0);cyl(g,.06,.08,.18,'#495057',.2,.55,0);box(g,.3,.06,.4,'#ffd43b',-.25,.62,0);[-.25,0,.2].forEach(x=>[-1,1].forEach(k=>{const w=cyl(g,.09,.09,.06,'#495057',x,.1,k*.18);w.rotation.x=Math.PI/2;}));face(g,.31,.36,.0,.0001);return fin(g,s*.85);});
/* U */
M.umbrella=S(s=>{const g=G0();const c=mesh(new THREE.SphereGeometry(.4,8,12,0,Math.PI*2,0,Math.PI/2.3),soft('#ff8fc7'));c.position.y=.45;c.scale.y=.75;g.add(c);cap(g,V3(0,.1,0),V3(0,.7,0),.018,'#868e96');const h=tor(g,.06,.018,'#868e96',.06,.1,0,Math.PI);h.rotation.z=Math.PI;ball(g,.03,'#ffd43b',0,.8,0);return fin(g,s*.9);});
M.unicorn=S(s=>{const g=critter({c:'#ffffff',belly:'#fff0f6',muzzle:'#fff0f6',ears:'point',earIn:'#ffc9de',nose:'#ffc9de',extra:(g,hy,H)=>{const h=mesh(new THREE.ConeGeometry(.05,.22,16),soft('#ffd43b',{e:'#332800'}));h.position.set(0,hy+H+.08,.08);h.rotation.x=.25;g.add(h);['#ff8fc7','#b197fc','#74c0fc','#ffd43b'].forEach((c,i)=>ball(g,.07,c,0,hy+H*.7-i*.09,-H*.75,1,1,.8));}});return fin(g,s);});
M.ufo=S(s=>{const g=G0();ball(g,.42,'#adb5bd',0,.3,0,1,.25,1,{m:.3,r:.3});const d=ball(g,.2,'#a5d8ff',0,.4,0,1,.8,1,{r:.1,cc:1});d.material=new THREE.MeshPhysicalMaterial({color:'#a5d8ff',transparent:true,opacity:.7,roughness:.05,clearcoat:1});d.material.userData.lux=1;ball(g,.1,'#8ce99a',0,.42,0);
  for(let i=0;i<6;i++){const a=i/6*Math.PI*2;ball(g,.035,['#ffd43b','#ff8787','#74c0fc'][i%3],Math.cos(a)*.36,.29,Math.sin(a)*.36,1,1,1,{e:'#444400'});}return fin(g,s*.85);});
M.up=S(s=>{const g=G0();ext(g,[[0,.42],[.3,.08],[.12,.08],[.12,-.4],[-.12,-.4],[-.12,.08],[-.3,.08]],.12,'#4dabf7',0,.42,0);return fin(g,s*.85);});
/* V */
M.volcano=S(s=>{const g=G0();const v=mesh(new THREE.CylinderGeometry(.12,.45,.5,32),soft('#a0522d'));v.position.y=.25;g.add(v);ball(g,.13,'#ff6b6b',0,.5,0,1,.4,1,{e:'#661a00'});[[-.06,.6],[.05,.7],[0,.82]].forEach((p,i)=>ball(g,.07-i*.012,'#e9ecef',p[0],p[1],0));face(g,0,.25,.36,.8,{sp:.08});return fin(g,s*.9);});
M.violin=S(s=>{const g=G0();ball(g,.18,'#c0703a',0,.22,0,1,1,.3);ball(g,.14,'#c0703a',0,.45,0,1,1,.3);box(g,.06,.42,.04,'#3b2a20',0,.62,.03);box(g,.05,.1,.04,'#3b2a20',0,.88,0);[-1,1].forEach(k=>ball(g,.02,'#3b2a20',k*.06,.34,.06));cap(g,V3(-.3,.1,.08),V3(.3,.75,.08),.01,'#e9ecef');return fin(g,s*.85);});
M.vase=S(s=>{const g=G0();g.add(mesh(lathe([[0,0],[.14,0],[.22,.15],[.2,.32],[.1,.45],[.12,.52],[0,.52]]),soft('#4dabf7')));[0,1,2].forEach(i=>{cap(g,V3(0,.45,0),V3((i-1)*.12,.78,0),.012,'#40c057');ball(g,.06,['#ff8fc7','#ffd43b','#ff6b6b'][i],(i-1)*.12,.8,0);});return fin(g,s*.85);});
M.van=S(s=>{const g=G0();box(g,.85,.45,.46,'#ffa94d',0,.34,0);box(g,.22,.18,.47,'#a5d8ff',.27,.42,0,{r:.15,cc:1});box(g,.3,.16,.47,'#fff4e6',-.15,.42,0);[[-.25,1],[.25,1],[-.25,-1],[.25,-1]].forEach(([x,k])=>{const w=cyl(g,.1,.1,.08,'#495057',x,.11,k*.22);w.rotation.x=Math.PI/2;});face(g,.43,.32,.0,.0001);return fin(g,s*.8);});
/* W */
M.whale=S(s=>{const g=G0();ball(g,.3,'#4dabf7',0,.3,0,1.5,.9,1);ball(g,.22,'#d0ebff',.05,.2,.08,1.4,.6,.8);const t=ball(g,.15,'#4dabf7',-.5,.42,0,.4,1,1.2);t.rotation.z=.6;[0,1,2].forEach(i=>ball(g,.03,'#a5d8ff',.15+(i-1)*.04,.6+i*.04,0));face(g,.3,.35,.24,.9,{sp:.08});return fin(g,s*.8);});
M.wagon=S(s=>{const g=G0();box(g,.7,.22,.42,'#ff6b6b',0,.28,0);[[-.22,1],[.22,1],[-.22,-1],[.22,-1]].forEach(([x,k])=>{const w=cyl(g,.11,.11,.06,'#495057',x,.11,k*.22);w.rotation.x=Math.PI/2;});cap(g,V3(.35,.25,0),V3(.6,.45,0),.02,'#868e96');return fin(g,s*.85);});
M.watermelon=S(s=>{const g=G0();const w=mesh(new THREE.SphereGeometry(.38,40,16,0,Math.PI),soft('#40c057'));w.rotation.x=-Math.PI/2;w.position.y=.0;w.rotation.set(0,0,0);w.rotation.x=0;
  const sl=mesh(new THREE.CylinderGeometry(.38,.38,.12,40,1,false,0,Math.PI),soft('#ff6b6b'));sl.rotation.x=Math.PI/2;sl.rotation.z=-Math.PI/2;sl.position.set(0,.02,0);g.remove(w);const rind=mesh(new THREE.CylinderGeometry(.4,.4,.11,40,1,false,0,Math.PI),soft('#40c057'));rind.rotation.copy(sl.rotation);rind.position.set(0,.01,-.01);g.add(rind);g.add(sl);
  [[-.15,.15],[0,.25],[.15,.15],[-.05,.1],[.08,.08]].forEach(p=>ball(g,.02,'#1b1b2f',p[0],p[1],.065,1,1.6,.5));face(g,0,.2,.07,.0001);return fin(g,s*.95);});
M.worm=S(s=>{const g=G0();[0,1,2,3].forEach(i=>ball(g,.1,'#ff8fc7',-.3+i*.17,.1+Math.abs(Math.sin(i*1.4))*.08,0));ball(g,.12,'#ff8fc7',.32,.22,0);face(g,.32,.25,.11,.6,{sp:.05});return fin(g,s*.95);});
/* X */
M.box=S(s=>{const g=G0();box(g,.5,.4,.5,'#d9a066',0,.2,0,{r:.8,cc:0});box(g,.52,.05,.12,'#c08552',0,.41,0);txt(g,'X','#e03131',.25,.12,.27);return fin(g,s*.9);});
M.fox=S(s=>{const g=critter({c:'#ff922b',belly:'#ffffff',muzzle:'#ffffff',ears:'point',earIn:'#343a40',extra:(g)=>{cap(g,V3(.12,.1,-.22),V3(.38,.3,-.3),.1,'#ff922b');ball(g,.1,'#ffffff',.42,.33,-.31);}});return fin(g,s);});
M.ox=S(s=>{const g=critter({c:'#8d6e4f',belly:'#c9a26b',muzzle:'#e9c9a8',ears:'flop',nose:'#5c3d2e',head:.26,extra:(g,hy,H)=>{[-1,1].forEach(k=>{const h=tor(g,.12,.03,'#fff4e6',k*.24,hy+H*.65,0,Math.PI*.6);h.rotation.z=k>0?0:Math.PI*.4;});}});return fin(g,s);});
M.six=S(s=>{const g=G0();txt(g,'6','#ff8787',.75,0,0);return fin(g,s*.95);});
/* Y */
M['yo-yo']=S(s=>{const g=G0();[-1,1].forEach(k=>{const d=cyl(g,.25,.25,.1,k>0?'#ff6b6b':'#4dabf7',0,.32,k*.07);d.rotation.x=Math.PI/2;});cap(g,V3(0,.32,0),V3(0,.9,0),.008,'#495057');ball(g,.04,'#ffd43b',0,.92,0);face(g,0,.33,.13,.75,{sp:.07});return fin(g,s*.85);});
M.yarn=S(s=>{const g=G0();ball(g,.28,'#ff8fc7',0,.28,0,1,1,1,{r:.8,cc:0});for(let i=0;i<4;i++){const t=tor(g,.28,.012,'#f783ac',0,.28,0);t.rotation.set(i*.8,i*.5,0);}cap(g,V3(.2,.08,.1),V3(.5,.02,.2),.012,'#f783ac');return fin(g,s*.9);});
M.yacht=S(s=>{const g=G0();const h=mesh(lathe([[0,0],[.18,.02],[.3,.12],[.34,.22],[0,.22]]),soft('#ffffff'));h.scale.set(1.5,1,.8);g.add(h);box(g,.6,.03,.4,'#4dabf7',0,.17,0);cyl(g,.02,.02,.7,'#adb5bd',0,.55,0);const sl=mesh(new THREE.ConeGeometry(.24,.6,3),soft('#ffd43b'));sl.position.set(.1,.58,0);sl.scale.z=.15;g.add(sl);return fin(g,s*.85);});
M.yellow=S(s=>{const g=G0();g.add(mesh(lathe([[0,0],[.2,0],[.24,.3],[.24,.34],[0,.34]]),soft('#ced4da',{m:.3,r:.3})));cyl(g,.22,.22,.04,'#ffd43b',0,.33,0);ball(g,.08,'#ffd43b',.2,.34,.1,1,.5,1);return fin(g,s*.95);});
/* Z */
M.zebra=S(s=>{const g=critter({c:'#ffffff',belly:'#ffffff',muzzle:'#495057',ears:'point',earIn:'#495057',nose:'#212529',head:.23,extra:(g,hy,H)=>{[[-.22,.42],[.22,.42],[-.25,.28],[.25,.28],[-.18,.55],[.18,.55]].forEach(p=>box(g,.035,.1,.04,'#212529',p[0],p[1],.17));[-1,1].forEach(k=>box(g,.03,.08,.02,'#212529',k*.09,hy+H*.7,H*.6));for(let i=0;i<4;i++)ball(g,.05,'#212529',0,hy+H*.8-i*.08,-H*.7);}});return fin(g,s);});
M.zero=S(s=>{const g=G0();txt(g,'0','#69db7c',.75,0,0);return fin(g,s*.95);});
M.zigzag=S(s=>{const g=G0();ext(g,[[-.4,0],[-.2,.25],[0,0],[.2,.25],[.4,0],[.4,-.12],[.2,.13],[0,-.12],[-.2,.13],[-.4,-.12]],.1,'#ff922b',0,.35,0);return fin(g,s*.9);});
M.zzz=S(s=>{const g=G0();const a=txt(g,'Z','#748ffc',.45,0,0);const b=txt(g,'z','#91a7ff',.32,.0,0);if(b)b.position.set(.28,.45,0);const c=txt(g,'z','#bac8ff',.24,0,0);if(c)c.position.set(.46,.75,0);return fin(g,s*.95);});
/* numbers, shapes, colours */
M.butterfly=S(s=>{const g=G0();cap(g,V3(0,.15,0),V3(0,.6,0),.045,'#5f3dc4');[-1,1].forEach(k=>{const w=ball(g,.2,'#ff8fc7',k*.2,.48,0,1,1.1,.12,{r:.3,cc:.8});w.rotation.z=k*.4;const w2=ball(g,.14,'#ffc9de',k*.16,.24,0,1,1,.12);ball(g,.05,'#ffd43b',k*.2,.5,.03,1,1,.3);cap(g,V3(k*.02,.6,0),V3(k*.08,.75,0),.01,'#5f3dc4');});face(g,0,.58,.05,.5,{sp:.04});return fin(g,s*.85);});
M.clock=S(s=>{const g=G0();const c=cyl(g,.3,.3,.1,'#74c0fc',0,.36,0);c.rotation.x=Math.PI/2;const f=cyl(g,.25,.25,.11,'#ffffff',0,.36,.005);f.rotation.x=Math.PI/2;box(g,.03,.16,.02,'#1b1b2f',0,.42,.07);box(g,.12,.03,.02,'#1b1b2f',.05,.36,.07);[-1,1].forEach(k=>ball(g,.07,'#ffd43b',k*.2,.66,0));return fin(g,s*.9);});
M.pyramid=S(s=>{const g=G0();const p=mesh(new THREE.ConeGeometry(.42,.5,4),soft('#ffd8a8'));p.rotation.y=Math.PI/4;p.position.y=.25;g.add(p);return fin(g,s*.9);});
M.tent=S(s=>{const g=G0();const p=mesh(new THREE.CylinderGeometry(.01,.42,.55,3),soft('#ff922b'));p.position.y=.27;p.rotation.y=Math.PI/2;p.scale.set(1,1,1.3);g.add(p);const d=mesh(new THREE.CylinderGeometry(.005,.16,.3,3),soft('#5c3d2e'));d.position.set(0,.15,.2);d.rotation.y=Math.PI/2;d.scale.z=.3;g.add(d);return fin(g,s*.9);});
M.block=S(s=>{const g=G0();box(g,.4,.4,.4,'#ff8787',0,.2,0);txt(g,'A','#ffffff',.22,.1,.21);return fin(g,s*.9);});
M.strawberry=S(s=>{const g=G0();const b=mesh(lathe([[0,0],[.08,.04],[.2,.2],[.24,.36],[.18,.46],[0,.48]]),soft('#ff4d5e',{r:.35,cc:.9}));g.add(b);for(let i=0;i<14;i++){const a=i*2.4,y=.1+(i%5)*.07;ball(g,.012,'#fff3bf',Math.cos(a)*.18*(y/.4+.3),y,Math.sin(a)*.18*(y/.4+.3));}for(let i=0;i<5;i++){const a=i/5*Math.PI*2;const l=ball(g,.06,'#51cf66',Math.cos(a)*.08,.49,Math.sin(a)*.08,1.4,.3,.7);l.rotation.y=-a;}face(g,0,.28,.22,.75,{sp:.06});return fin(g,s*.9);});
M.cherries=S(s=>{const g=G0();[-1,1].forEach(k=>{ball(g,.14,'#e03131',k*.14,.15,0,1,1,1,{r:.3,cc:1});cap(g,V3(k*.12,.27,0),V3(0,.62,0),.012,'#2b8a3e');});const l=ball(g,.07,'#51cf66',.06,.62,0,1.5,.35,.8);return fin(g,s*.9);});
M.basket=S(s=>{const g=G0();const b=mesh(lathe([[0,0],[.3,0],[.36,.28],[.33,.3],[.27,.04],[0,.04]]),soft('#d9a066',{r:.8,cc:0}));g.add(b);const h=tor(g,.3,.03,'#c08552',0,.28,0,Math.PI);h.rotation.y=Math.PI/2;return fin(g,s*1.1);});
M.pond=S(s=>{const g=G0();const w=cyl(g,.6,.6,.05,'#74c0fc',0,.03,0,{r:.1,cc:1});ball(g,.6,'#a9e34b',0,0,0,1.06,.06,1.06);const l=cyl(g,.14,.14,.03,'#51cf66',.25,.07,.15);ball(g,.05,'#ff8fc7',.25,.1,.15);return fin(g,s);});
})();
(function(){const P=window.PM;if(!P||!P.LUXM||!P.LUXH)return;const {THREE}=P;const {cyl,ball,cap,V3,fin}=P.LUXH;
P.LUXM.candle=s=>{const g=new THREE.Group();const c=['#ff8fc7','#74c0fc','#ffd43b','#69db7c'][Math.floor(Math.random()*4)];cyl(g,.05,.05,.32,c,0,.16,0);for(let i=0;i<3;i++){const t=cyl(g,.052,.052,.03,'#ffffff',0,.07+i*.09,0);}cap(g,V3(0,.32,0),V3(0,.37,0),.008,'#495057');return fin(g,(s||1)*1.0);};})();
