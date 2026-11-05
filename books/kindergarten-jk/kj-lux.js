/* Junior Kindergarten: the premium look. For the lessons listed in P.KLUX this file gives the 3D stage
   soft, chubby, toy-like models, glossy clay-like materials, rounded edges, warm gentle light and soft
   contact shadows. It only changes how things look: every game, tap and animation works exactly as before. */
(function(){
"use strict";
const P=window.PM;if(!P||P.failed||!P.K2)return;const BK=window.BOOK||{};if(!BK.kSpread)return;
const {THREE}=P;
P.KLUX=P.KLUX||{aA:1};

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
Object.assign(P.KLUX,{aB:1,aC:1,aD:1,aE:1,aF:1,aG:1});
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
})();
