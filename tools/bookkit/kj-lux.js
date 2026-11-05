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
