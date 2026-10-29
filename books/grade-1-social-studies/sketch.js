/* The Interactive Classroom — "paper diorama" look (load FIRST, before kit/subject-kit/stage).
   Every model on the page becomes a hand-drawn paper sculpture: warm paper surfaces with pencil
   hatching that gets denser in shadow, ink outlines, and bright colour only where it matters
   (water, light, sound, motion ribbons). People are jointed wooden art mannequins with carved hair
   and painted clothes. Labels are handwritten cards. A set-piece kit builds detailed dioramas. */
(function(){
"use strict";
const P=window.PM;if(!P||P.failed||!P.THREE)return;const BK=window.BOOK||{};if(!BK.sketch)return;
const {THREE,V,G,M,tween,A}=P;
const PAPER='#fbf7ee',INKC='#24232a';
const mixHex=(a,b,t)=>{const p=h=>{h=h.replace('#','');if(h.length===3)h=h.split('').map(c=>c+c).join('');return [0,2,4].map(i=>parseInt(h.slice(i,i+2),16));};const x=p(a),y=p(b);return '#'+x.map((v,i)=>Math.round(v+(y[i]-v)*t).toString(16).padStart(2,'0')).join('');};
const lum=h=>{h=h.replace('#','');if(h.length===3)h=h.split('').map(c=>c+c).join('');const r=parseInt(h.slice(0,2),16),g=parseInt(h.slice(2,4),16),b=parseInt(h.slice(4,6),16);return (r*.299+g*.587+b*.114)/255;};

/* ---------- pencil-hatch material: Lambert lighting + world-space triplanar hatching ---------- */
const HV='varying vec3 vSkWP;\nvarying vec3 vSkWN;\n';
function hatch(mat,o){o=o||{};const dens=(o.dens||26).toFixed(1),amt=(o.amt==null?.5:o.amt).toFixed(2);
  mat.extensions={derivatives:true};
  mat.onBeforeCompile=sh=>{
    sh.vertexShader=sh.vertexShader.replace('#include <common>','#include <common>\n'+HV).replace('#include <project_vertex>','#include <project_vertex>\n vSkWP=(modelMatrix*vec4(transformed,1.0)).xyz; vSkWN=normalize(mat3(modelMatrix)*objectNormal);');
    sh.fragmentShader=sh.fragmentShader.replace('#include <common>','#include <common>\n'+HV).replace('#include <envmap_fragment>',`#include <envmap_fragment>
  { float L=dot(outgoingLight,vec3(.299,.587,.114));
    vec3 an=abs(normalize(vSkWN));
    vec2 q=an.x>an.y&&an.x>an.z? vSkWP.zy : (an.y>an.z? vSkWP.xz : vSkWP.xy);
    float D=${dens};
    float s1=(q.x*0.8+q.y*0.6)*D; float w1=fwidth(s1);
    float k1=clamp((0.98-L)*1.3,0.2,0.8);
    float l1=1.0-smoothstep(k1*0.5-w1,k1*0.5+w1,abs(fract(s1)-0.5));
    float s2=(q.x*0.6-q.y*0.8)*D*1.07; float w2=fwidth(s2);
    float k2=clamp((0.62-L)*1.6,0.0,0.7);
    float l2=k2>0.0?1.0-smoothstep(k2*0.5-w2,k2*0.5+w2,abs(fract(s2)-0.5)):0.0;
    float fade=clamp(1.0-max(w1,w2)*1.6,0.0,1.0);
    float ink=max(l1*0.85,l2)*${amt}*fade;
    outgoingLight=mix(outgoingLight,outgoingLight*0.32+vec3(0.06,0.06,0.08),ink);
  }`);};
  mat.customProgramCacheKey=()=>'hatch'+dens+amt;return mat;}
const MATS={};
/* paper(c): a hatched paper material. mix: how far toward paper white (0 = full colour). */
P.paper=function(c,o){o=o||{};const mx=o.mix==null?(lum(c)>.86?0:.36):o.mix;const key=c+'|'+mx+'|'+(o.op||1)+'|'+(o.em||'')+'|'+(o.amt||'')+'|'+(o.dens||'');
  if(MATS[key])return MATS[key];const col=mixHex(c,PAPER,mx);
  const m=new THREE.MeshLambertMaterial(Object.assign({color:col},o.op<1?{transparent:true,opacity:o.op,depthWrite:o.op>.6}:{},o.em?{emissive:o.em,emissiveIntensity:o.ei||.5}:{}));
  if(o.flat!==true)hatch(m,o);return MATS[key]=m;};
/* glow(c): saturated, softly lit colour for light, water and motion (no hatching) */
P.glow=function(c,op,ei){const key='glow'+c+(op||1)+(ei||'');if(MATS[key])return MATS[key];const m=new THREE.MeshLambertMaterial({color:c,emissive:c,emissiveIntensity:ei==null?.45:ei,transparent:(op||1)<1,opacity:op||1,depthWrite:(op||1)>.6});return MATS[key]=m;};

/* ---------- ink: edges on hard corners + a silhouette outline on curved shapes ---------- */
const lineMat=new THREE.LineBasicMaterial({color:INKC,transparent:true,opacity:.72});
const hullMat=new THREE.ShaderMaterial({side:THREE.BackSide,uniforms:{},vertexShader:'void main(){vec4 mv=modelViewMatrix*vec4(position,1.0);vec3 n=normalize(normalMatrix*normal);mv.xyz+=n*(-mv.z)*0.0032;gl_Position=projectionMatrix*mv;}',fragmentShader:'void main(){gl_FragColor=vec4(0.14,0.137,0.165,1.0);}'});
const EDG=new WeakMap();
function inkIt(m,th,soft){const geo=m.geometry;if(!geo||!geo.attributes||!geo.attributes.position)return m;const t=geo.type||'';if(!geo.boundingSphere)geo.computeBoundingSphere();if(geo.boundingSphere&&geo.boundingSphere.radius<.045)return m;
  const curved=/Sphere|Cylinder|Cone|Torus|Lathe|Extrude|Tube|Capsule|Circle|Ring/.test(t);
  if(!/Plane/.test(t)&&!(soft&&curved)){let e=EDG.get(geo);if(!e){e=new THREE.EdgesGeometry(geo,th||28);EDG.set(geo,e);}const l=new THREE.LineSegments(e,lineMat);l.raycast=function(){};l.userData.ink=1;m.add(l);}
  if(curved&&geo.attributes.normal&&!(m.material&&m.material.transparent)){const h=new THREE.Mesh(geo,hullMat);h.raycast=function(){};h.userData.ink=1;h.castShadow=false;h.receiveShadow=false;m.add(h);}
  return m;}
P.inkIt=inkIt;
const oldMk=P.mk;
P.mk=function(geo,mat,th){const m=new THREE.Mesh(geo,mat);m.castShadow=true;m.receiveShadow=true;const one=mat&&!Array.isArray(mat)?mat:null;
  const skip=one&&(one.emissiveIntensity>.3||one.isMeshBasicMaterial||(one.transparent&&one.opacity<.6));if(!skip)inkIt(m,th>0?th:28,th===0);return m;};
P.lam=c=>P.paper(c);
/* handwritten labels and speech bubbles */
const oldLabel=P.label;
P.label=function(t,o){o=Object.assign({},o||{});if(!o.font)o.font='400 104px "Patrick Hand", "Comic Sans MS", cursive';if(o.bg&&o.bg.toLowerCase()==='#ffffff')o.bg='#fffdf6';if(o.border==null&&o.bg)o.border=INKC;return oldLabel(t,o);};
/* extruded picture figures get the paper look in their own (softened) colours */
P.matFor=(col,op)=>{const c=(col&&col[0]==='#')?col:new THREE.Color(col||'#cccccc').getStyle();let hex=c;if(c.indexOf('rgb')===0){const cc=new THREE.Color(c);hex='#'+cc.getHexString();}return P.paper(hex,{mix:.22,op:op,amt:.3,dens:44});};

/* ---------- geometry helpers ---------- */
const g0=(k,f)=>G('sk_'+k,f);
function capsule(r,len,seg){return g0('cap'+r+'_'+len,()=>{const pts=[];const n=8;for(let i=0;i<=n;i++){const a=-Math.PI/2+i/n*Math.PI/2;pts.push(new THREE.Vector2(Math.cos(a)*r,Math.sin(a)*r-len/2));}
  for(let i=0;i<=n;i++){const a=i/n*Math.PI/2;pts.push(new THREE.Vector2(Math.cos(a)*r,Math.sin(a)*r+len/2));}return new THREE.LatheGeometry(pts,seg||14);});}
const ell=(rx,ry,rz)=>{const s=g0('ell',()=>new THREE.SphereGeometry(1,20,14));return {g:s,sc:[rx,ry,rz]};};
function part(par,geo,mat,x,y,z,sc){const m=P.mk(geo.g||geo,mat);m.position.set(x||0,y||0,z||0);if(geo.sc)m.scale.set(...geo.sc);if(sc)m.scale.set(...sc);par.add(m);return m;}

/* ---------- wooden art mannequins (replace the cartoon kids) ---------- */
const WOOD='#ecdcbf',JOINT='#d8c19b';
function mannequin(p){p=p||{};const g=new THREE.Group(),body=new THREE.Group();g.add(body);const wood=P.paper(WOOD,{mix:0,amt:.36,dens:46}),joint=P.paper(JOINT,{mix:0,amt:.36,dens:46});
  const cloth=P.paper(p.c||'#3b82f6',{mix:.18,amt:.34,dens:40}),hairM=P.paper(mixHex(p.h||'#5b3a1e','#c8a676',.35),{mix:0,amt:.5,dens:60});
  const u=g.userData;
  /* hips and legs */
  part(body,ell(.13,.075,.09),cloth,0,.45,0);
  const legs=[-1,1].map(sx=>{const hip=new THREE.Group();hip.position.set(sx*.075,.43,0);body.add(hip);part(hip,{g:capsule(.05,.13)},p.skirt?wood:cloth,0,-.1,0);
    const knee=new THREE.Group();knee.position.y=-.2;hip.add(knee);part(knee,{g:g0('kn',()=>new THREE.SphereGeometry(.045,12,10))},joint,0,0,0);part(knee,{g:capsule(.042,.13)},wood,0,-.1,0);
    part(knee,ell(.05,.03,.085),P.paper('#5b4636',{mix:.1}),0,-.2,.035);return {hip,knee};});
  if(p.skirt){const sk=part(body,{g:g0('skirt',()=>new THREE.ConeGeometry(.17,.2,16,1,true))},cloth,0,.4,0);sk.material=P.paper(p.c,{mix:.18,amt:.34});}
  /* torso */
  part(body,ell(.105,.09,.075),wood,0,.55,0);
  const chest=part(body,ell(.15,.12,.095),cloth,0,.69,0);
  part(body,{g:g0('neck',()=>new THREE.CylinderGeometry(.035,.04,.08,10))},wood,0,.82,0);
  /* arms on shoulder pivots, with elbows */
  const arms=[-1,1].map(sx=>{const pv=new THREE.Group();pv.position.set(sx*.16,.76,0);body.add(pv);part(pv,{g:g0('sh',()=>new THREE.SphereGeometry(.05,12,10))},cloth,0,0,0);
    part(pv,{g:capsule(.038,.1)},cloth,0,-.09,0);const el=new THREE.Group();el.position.y=-.18;pv.add(el);part(el,{g:g0('el',()=>new THREE.SphereGeometry(.035,10,8))},joint,0,0,0);
    part(el,{g:capsule(.032,.1)},wood,0,-.08,0);part(el,ell(.035,.05,.025),wood,0,-.19,0);pv.rotation.z=sx*.12;pv.userData.el=el;return pv;});
  /* head: smooth oval, a hint of a face, and carved hair */
  const head=new THREE.Group();head.position.y=.95;body.add(head);
  part(head,ell(.095,.12,.1),wood,0,0,0);
  [-1,1].forEach(sx=>{const e=part(head,{g:g0('eye',()=>new THREE.SphereGeometry(.012,8,6))},P.paper(INKC,{mix:0,flat:true}),sx*.035,.01,.093);e.children.forEach(c=>{c.visible=false;});});
  const st=p.st||'short';
  const cap=part(head,{g:g0('hair',()=>new THREE.SphereGeometry(.104,18,12,0,Math.PI*2,0,Math.PI*.55))},hairM,0,.012,-.006);cap.rotation.x=-.25;
  if(st==='pony'||st==='braid'||st==='long'){const t=part(head,{g:capsule(.03,st==='long'?.16:.12)},hairM,0,-.06,-.1);t.rotation.x=.3;}
  if(st==='puffs'||st==='bun'){[-1,1].forEach(sx=>{if(st==='bun'&&sx<0)return;part(head,{g:g0('puff',()=>new THREE.SphereGeometry(.05,12,10))},hairM,st==='bun'?0:sx*.08,st==='bun'?.1:.07,-.04);});}
  if(st==='curly'||st==='spiky'){for(let i=0;i<6;i++){const a=i/6*Math.PI*2;part(head,{g:g0('curl',()=>new THREE.SphereGeometry(.032,8,6))},hairM,Math.cos(a)*.07,.08+Math.sin(i)*.01,Math.sin(a)*.07-.01);}}
  if(st==='cap'||p.cap){const c=part(head,{g:g0('capb',()=>new THREE.SphereGeometry(.108,16,10,0,Math.PI*2,0,Math.PI*.5))},P.paper(p.cap||'#ef4444',{mix:.15}),0,.02,0);const b=part(head,{g:g0('capv',()=>new THREE.CylinderGeometry(.09,.09,.012,16,1,false,0,Math.PI))},P.paper(p.cap||'#ef4444',{mix:.15}),0,.03,.05);b.rotation.y=Math.PI/2;}
  if(p.gl){[-1,1].forEach(sx=>{const r=part(head,{g:g0('gl',()=>new THREE.TorusGeometry(.025,.006,6,14))},P.paper(INKC,{mix:0,flat:true}),sx*.036,.012,.098);});}
  if(p.scarf){part(head,{g:g0('scarf',()=>new THREE.TorusGeometry(.06,.025,8,16))},P.paper(p.scarf,{mix:.15}),0,-.13,0).rotation.x=Math.PI/2;}
  Object.assign(u,{arms,head,body,legs,mann:1});
  /* legs and elbows move with the acting modes (walk, run, cheer…) */
  u.extra=(k,dt)=>{const m=u.mode,t=u.t||0;let a=0,b=0,kn=0;
    if(m==='walk'){a=Math.sin(t*7)*.45;kn=.3;}else if(m==='run'){a=Math.sin(t*12)*.8;kn=.7;}else if(m==='jump'||m==='cheer'){kn=.25*Math.abs(Math.sin(t*6));}else if(m==='sit'){legs.forEach(l=>{l.hip.rotation.x=-1.45;l.knee.rotation.x=1.45;});return;}else if(m==='kick'){a=Math.sin(t*6)*.7;}
    legs[0].hip.rotation.x=a;legs[1].hip.rotation.x=-a;legs[0].knee.rotation.x=Math.max(0,-a)*kn*2+(m==='run'?.3:0);legs[1].knee.rotation.x=Math.max(0,a)*kn*2+(m==='run'?.3:0);
    arms.forEach((pv,i)=>{const el=pv.userData.el;el.rotation.x=(m==='walk'||m==='run')?-.5:(m==='read'||m==='eat'||m==='think')?-1.4:(m==='clap')?-1.0:-.15;});};
  return g;}
P.mannequin=mannequin;
P.kid=function(p){return mannequin(p);};

/* ---------- handwritten paper cards that stand on the page ---------- */
const CARDT={};
function cardTex(text,o){const key=text+'|'+(o.sub||'')+'|'+(o.col||'')+'|'+(o.w||0);if(CARDT[key])return CARDT[key];const c=document.createElement('canvas');const g=c.getContext('2d');
  const big='400 '+(o.size||120)+'px "Patrick Hand", "Comic Sans MS", cursive';g.font=big;const tw=Math.ceil(g.measureText(text).width);let sw=0;if(o.sub){g.font='400 52px "Patrick Hand", cursive';sw=g.measureText(o.sub).width;}
  c.width=Math.max(220,Math.max(tw,sw)+90,o.w||0);c.height=o.sub?260:190;g.fillStyle='#fffdf4';g.fillRect(0,0,c.width,c.height);
  g.strokeStyle='rgba(36,35,42,.85)';g.lineWidth=5;g.strokeRect(6,6,c.width-12,c.height-12);g.strokeStyle='rgba(36,35,42,.18)';g.lineWidth=2;for(let y=40;y<c.height;y+=44){g.beginPath();g.moveTo(16,y);g.lineTo(c.width-16,y);g.stroke();}
  g.fillStyle=o.col||'#1f2a6b';g.font=big;g.textAlign='center';g.textBaseline='middle';g.fillText(text,c.width/2,o.sub?100:c.height/2+6);if(o.sub){g.font='400 52px "Patrick Hand", cursive';g.fillStyle='#3b3b46';g.fillText(o.sub,c.width/2,200);}
  const t=new THREE.CanvasTexture(c);t.anisotropy=8;return CARDT[key]={t,w:c.width,h:c.height};}
P.card=function(text,o){o=o||{};const T=cardTex(String(text),o);const h=o.h||.34,w=h*T.w/T.h;const g=new THREE.Group();
  const face=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshLambertMaterial({map:T.t}));face.castShadow=true;face.position.y=h/2+.03;
  const back=new THREE.Mesh(new THREE.PlaneGeometry(w,h),P.paper('#f3ede0'));back.rotation.y=Math.PI;back.position.copy(face.position);g.add(face,back);
  const e=new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(w,h,.004)),lineMat);e.position.copy(face.position);g.add(e);
  if(o.stand!==false){const leg=P.mk(new THREE.BoxGeometry(w*.5,h*.6,.012),P.paper('#efe6d2'));leg.position.set(0,h*.3,-.12);leg.rotation.x=.42;g.add(leg);}
  g.rotation.x=o.tilt==null?-.8:o.tilt;g.userData.card=1;return g;};

/* ---------- motion ribbons: flat glowing bands that draw themselves along a path ---------- */
P.ribbon=function(points,col,o){o=o||{};const curve=new THREE.CatmullRomCurve3(points.map(p=>Array.isArray(p)?V(p[0],p[1],p[2]):p));const n=o.seg||80,w=o.w||.06;
  const pos=[],idx=[];for(let i=0;i<=n;i++){const t=i/n,pt=curve.getPoint(t),tg=curve.getTangent(t);const side=new THREE.Vector3().crossVectors(tg,o.up||V(0,1,0)).normalize().multiplyScalar(w/2);
    if(side.lengthSq()<1e-6)side.set(w/2,0,0);pos.push(pt.x+side.x,pt.y+side.y,pt.z+side.z,pt.x-side.x,pt.y-side.y,pt.z-side.z);if(i<n){const a=i*2;idx.push(a,a+1,a+2,a+1,a+3,a+2);}}
  const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));geo.setIndex(idx);geo.computeVertexNormals();
  const m=new THREE.Mesh(geo,new THREE.MeshLambertMaterial({color:col,emissive:col,emissiveIntensity:.5,side:THREE.DoubleSide,transparent:true,opacity:o.op||.95}));m.castShadow=true;
  geo.setDrawRange(0,0);const total=idx.length;m.userData.grow=(d)=>tween(d||1.2,k=>geo.setDrawRange(0,Math.floor(total*k/6)*6));m.userData.full=()=>geo.setDrawRange(0,total);return m;};

/* ---------- set pieces for dioramas (all in local units; y up, things sit on y=0) ---------- */
const B=(w,h,d,c,o)=>P.mk(G('skb'+w+'_'+h+'_'+d,()=>new THREE.BoxGeometry(w,h,d)),P.paper(c,o));
const CY=(r1,r2,h,c,n,o)=>P.mk(G('skc'+r1+'_'+r2+'_'+h+'_'+(n||18),()=>new THREE.CylinderGeometry(r1,r2,h,n||18)),P.paper(c,o));
const SP=(r,c,o)=>P.mk(G('sks'+r,()=>new THREE.SphereGeometry(r,18,14)),P.paper(c,o));
const CO=(r,h,c,n,o)=>P.mk(G('skk'+r+'_'+h+'_'+(n||16),()=>new THREE.ConeGeometry(r,h,n||16)),P.paper(c,o));
const at=(o,x,y,z)=>{o.position.set(x,y,z);return o;};
const S={
 /* a thick card base the whole scene stands on, with a tinted ground patch */
 /* the diorama plinth: a thick card board with a pencilled edge, a tinted ground and little details on it */
 base(w,d,ground){const g=new THREE.Group();const s=B(w,.16,d,'#efe7d4');s.position.y=-.08;g.add(s);const lip=B(w+.06,.03,d+.06,'#d9cdb2');lip.position.y=-.17;g.add(lip);
   if(ground){const t=P.mk(G('skgr'+w+d,()=>new THREE.BoxGeometry(w*.97,.014,d*.95)),P.paper(ground,{mix:.12,amt:.4,dens:22}));t.position.y=.007;g.add(t);
     const c=new THREE.Color(ground),hsl={};c.getHSL(hsl);let seed=Math.round(w*97+d*13);const R=()=>{seed=(seed*9301+49297)%233280;return seed/233280;};
     if(hsl.h>.18&&hsl.h<.45&&hsl.s>.2){/* grass tufts and tiny flowers */const geo=new THREE.ConeGeometry(.018,.07,4);const m=new THREE.InstancedMesh(geo,P.paper(mixHex(ground,'#3f7d36',.45),{mix:.1,amt:.3}),140);const o=new THREE.Object3D();
       for(let k=0;k<140;k++){o.position.set((R()-.5)*w*.94,.04,(R()-.5)*d*.92);o.rotation.set((R()-.5)*.5,R()*3,(R()-.5)*.5);o.scale.setScalar(.6+R()*.8);o.updateMatrix();m.setMatrixAt(k,o.matrix);}m.receiveShadow=true;g.add(m);
       const fg=new THREE.SphereGeometry(.016,6,4);['#ffffff','#ffd43b','#ff8fab'].forEach((fc,q)=>{const fm=new THREE.InstancedMesh(fg,P.paper(fc,{mix:0,flat:true}),14);for(let k=0;k<14;k++){o.position.set((R()-.5)*w*.94,.03,(R()-.5)*d*.92);o.rotation.set(0,0,0);o.scale.setScalar(1);o.updateMatrix();fm.setMatrixAt(k,o.matrix);}g.add(fm);});}}
   return g;},
 house(o){o=o||{};const w=o.w||.9,h=o.h||.6,d=o.d||.7,c=o.c||'#f6efe2',roof=o.roof||'#c2553a';const g=new THREE.Group();g.add(at(B(w,h,d,c),0,h/2,0));
   g.add(at(B(w+.03,.05,d+.03,'#d8cbb3'),0,.025,0));/* footing */
   const r=P.mk(G('skroof'+w+d,()=>{const s=new THREE.Shape();s.moveTo(-w/2-.07,-.02);s.lineTo(0,w*.42);s.lineTo(w/2+.07,-.02);s.lineTo(w/2+.07,.02);s.lineTo(0,w*.42+.04);s.lineTo(-w/2-.07,.02);s.closePath();return new THREE.ExtrudeGeometry(s,{depth:d+.14,bevelEnabled:false});}),P.paper(roof,{mix:.2}));r.position.set(0,h,-d/2-.07);g.add(r);
   const gab=P.mk(G('skgab'+w+d,()=>{const s=new THREE.Shape();s.moveTo(-w/2,0);s.lineTo(0,w*.4);s.lineTo(w/2,0);s.closePath();return new THREE.ExtrudeGeometry(s,{depth:d,bevelEnabled:false});}),P.paper(c));gab.position.set(0,h,-d/2);g.add(gab);
   /* shingle lines on the roof */const sl=Math.atan2(w*.42,w/2+.07);for(let k=1;k<4;k++){[-1,1].forEach(sx=>{const L=B(.006,.006,d+.12,mixHex(roof,'#2b1d14',.4),{mix:0,flat:true});const f=k/4;L.position.set(sx*(w/2+.07)*(1-f),h+w*.42*f+.025,0);g.add(L);});}
   const door=B(.17,.28,.025,'#8a5f3e');door.position.set(w*.2,.14+.03,d/2+.01);g.add(door);const fr=B(.21,.31,.012,'#efe3cc');fr.position.set(w*.2,.155+.03,d/2+.004);g.add(fr);g.add(at(SP(.015,'#e8c34a',{mix:0}),w*.2+.05,.17,d/2+.03));
   g.add(at(B(.26,.04,.12,'#d8cbb3'),w*.2,.02,d/2+.06));/* step */
   const win=(x,y)=>{const f=B(.19,.17,.015,'#efe3cc');f.position.set(x,y,d/2+.006);g.add(f);const gl=B(.15,.13,.02,'#a8d4f5',{mix:.1});gl.position.set(x,y,d/2+.01);g.add(gl);g.add(at(B(.012,.13,.024,'#efe3cc'),x,y,d/2+.012));g.add(at(B(.15,.012,.024,'#efe3cc'),x,y,d/2+.012));
     g.add(at(B(.22,.02,.05,'#d8cbb3'),x,y-.09,d/2+.025));};win(-w*.2,h*.62);if(w>=.8)win(w*.2,h*.7+.04);
   [-1,1].forEach(sx=>{const sw=B(.015,.17,.15,'#efe3cc');sw.position.set(sx*(w/2+.007),h*.6,0);if(d>.45)g.add(sw);});
   if(o.chimney!==false){const ch=B(.1,.24,.1,'#d8cbb3');ch.position.set(-w*.25,h+w*.26,0);g.add(ch);g.add(at(B(.13,.03,.13,'#cdbf9f'),-w*.25,h+w*.26+.13,0));}return g;},
 tree(o){o=o||{};const s=o.s||1,g=new THREE.Group();const tr=at(CY(.04*s,.075*s,.52*s,'#8a6a4a',9),0,.26*s,0);g.add(tr);
   [[-1,.38,.6],[1,.42,-.7]].forEach(([sx,y,r])=>{const b=at(CY(.015*s,.025*s,.2*s,'#8a6a4a',6),sx*.07*s,y*s,0);b.rotation.z=-sx*.8;g.add(b);});
   const c=o.c||'#7cbf6a';[[0,.66,0,.24],[.15,.56,.06,.17],[-.15,.58,-.05,.18],[.06,.82,-.04,.16],[-.08,.76,.08,.15],[.1,.66,-.14,.15],[-.05,.6,.15,.14]].forEach(([x,y,z,r],k)=>g.add(at(SP(r*s,k%2?mixHex(c,'#2f6b2a',.15):c),x*s,y*s,z*s)));
   g.add(at(CY(.12*s,.14*s,.02*s,'#9c7a55',12),0,.01,0));return g;},
 pine(o){o=o||{};const s=o.s||1,g=new THREE.Group();g.add(at(CY(.04*s,.05*s,.2*s,'#8a6a4a',8),0,.1*s,0));[[.28,.36,.3],[.22,.3,.52],[.15,.24,.72]].forEach(([r,h,y])=>g.add(at(CO(r*s,h*s,o.c||'#5f9e63',10),0,y*s,0)));return g;},
 fence(len,o){o=o||{};const g=new THREE.Group();const n=Math.max(2,Math.round(len/.18));for(let i=0;i<n;i++){g.add(at(B(.04,.22,.03,'#efe3cc'),-len/2+i*len/(n-1),.11,0));}g.add(at(B(len,.03,.02,'#efe3cc'),0,.16,.02));g.add(at(B(len,.03,.02,'#efe3cc'),0,.07,.02));return g;},
 table(o){o=o||{};const w=o.w||.8,d=o.d||.5,h=o.h||.36,g=new THREE.Group();g.add(at(B(w,.04,d,o.c||'#e7d4b4'),0,h,0));[[-1,-1],[1,-1],[-1,1],[1,1]].forEach(([a,b])=>g.add(at(B(.04,h,.04,'#d2bb94'),a*(w/2-.05),h/2,b*(d/2-.05))));g.userData.top=h+.02;return g;},
 chair(o){o=o||{};const g=new THREE.Group();g.add(at(B(.26,.03,.26,o.c||'#e7d4b4'),0,.24,0));g.add(at(B(.26,.28,.03,o.c||'#e7d4b4'),0,.38,-.12));[[-1,-1],[1,-1],[-1,1],[1,1]].forEach(([a,b])=>g.add(at(B(.03,.24,.03,'#d2bb94'),a*.11,.12,b*.11)));return g;},
 bed(o){o=o||{};const g=new THREE.Group();g.add(at(B(.55,.16,.95,'#e7d4b4'),0,.08,0));g.add(at(B(.5,.07,.85,o.c||'#a8c8f0',{mix:.15}),0,.19,.04));g.add(at(B(.3,.06,.16,'#fffaf0'),0,.24,-.34));g.add(at(B(.55,.36,.04,'#d2bb94'),0,.18,-.47));return g;},
 bench(o){const g=new THREE.Group();g.add(at(B(.7,.04,.2,'#c99a6a'),0,.2,0));g.add(at(B(.7,.16,.03,'#c99a6a'),0,.32,-.09));[-1,1].forEach(a=>g.add(at(B(.04,.2,.18,'#9a7350'),a*.3,.1,0)));return g;},
 lamp(o){o=o||{};const g=new THREE.Group();g.add(at(CY(.012,.012,.7,'#55555f',6),0,.35,0));const b=at(SP(.07,'#fff3b0',{em:'#ffcf5a',ei:.8,flat:true}),0,.72,0);g.add(b);g.userData.bulb=b;return g;},
 pond(r,o){o=o||{};const g=new THREE.Group();const w=P.mk(G('skpond'+r,()=>new THREE.CylinderGeometry(r,r,.02,40)),P.glow(o.c||'#5ab0f0',.78,.25));w.position.y=.012;g.add(w);
   for(let i=0;i<7;i++){const a=i/7*Math.PI*2;g.add(at(SP(.035+(i%3)*.012,'#d9d2c4'),Math.cos(a)*r,.02,Math.sin(a)*r));}g.userData.water=w;return g;},
 road(len,o){const g=new THREE.Group();g.add(at(B(len,.012,.36,'#b7b2a6',{mix:.2}),0,.006,0));for(let i=0;i<Math.floor(len/.3);i++)g.add(at(B(.14,.014,.03,'#fffdf5',{mix:0}),-len/2+.15+i*.3,.01,0));return g;},
 /* a hill made of stacked paper contour layers, like a cut-paper relief map */
 hill(r,o){o=o||{};const g=new THREE.Group();const n=o.n||5,h=o.h||r*.13;const c=o.c||'#a7d08c';for(let k=0;k<n;k++){const f=1-k/n;const rr=r*(.35+.65*f)*(1+(k%2)*.03);
   const L=P.mk(G('skhl'+r+'_'+k+'_'+n,()=>{const sh=new THREE.Shape();const m=28;for(let q=0;q<=m;q++){const a=q/m*Math.PI*2;const w=1+.07*Math.sin(a*3+k)+.05*Math.cos(a*5+k*2);const x=Math.cos(a)*rr*w,y=Math.sin(a)*rr*w*.85;q?sh.lineTo(x,y):sh.moveTo(x,y);}return new THREE.ExtrudeGeometry(sh,{depth:h,bevelEnabled:false,curveSegments:2});}),P.paper(mixHex(c,'#ffffff',k*.06),{mix:.35}));
   L.rotation.x=-Math.PI/2;L.position.set(-k*r*.03,k*h,k*r*.02);g.add(L);}g.userData.top=n*h;return g;},
 mountain(o){o=o||{};const s=o.s||1,g=new THREE.Group();g.add(at(CO(.5*s,.9*s,o.c||'#bdb5a6',7),0,.45*s,0));g.add(at(CO(.18*s,.22*s,'#ffffff',7,{mix:0}),0,.8*s,0));return g;},
 cloud(o){const g=new THREE.Group();[[0,0,.16],[.15,-.02,.12],[-.15,-.03,.11],[.06,.09,.11]].forEach(([x,y,r])=>g.add(at(SP(r,'#ffffff',{mix:0,amt:.25}),x,y,0)));return g;},
 sun(o){const g=new THREE.Group();g.add(SP(.18,'#ffd34d',{em:'#ffb000',ei:.6,flat:true}));for(let i=0;i<10;i++){const a=i/10*Math.PI*2;const r=at(B(.035,.14,.02,'#ffbf3a',{em:'#ff9f00',ei:.5,flat:true}),Math.cos(a)*.28,Math.sin(a)*.28,0);r.rotation.z=a-Math.PI/2;g.add(r);}return g;},
 flame(o){o=o||{};const g=new THREE.Group();const f1=at(CO(.08,.22,'#ff8a2a',10,{em:'#ff6a00',ei:.9,flat:true}),0,.11,0),f2=at(CO(.045,.14,'#ffd84a',10,{em:'#ffc400',ei:1,flat:true}),0,.08,.0);g.add(f1,f2);
   const lt=new THREE.PointLight(0xff9a40,.0,2.2);lt.position.y=.25;g.add(lt);g.userData.tick=(t)=>{f1.scale.set(1,1+Math.sin(t*13)*.12,1);f2.scale.set(1,1+Math.sin(t*17+1)*.15,1);lt.intensity=.55+Math.sin(t*9)*.15;};return g;},
 sign(text,o){o=o||{};const g=new THREE.Group();g.add(at(B(.04,.42,.04,'#b08a62'),0,.21,0));const c=P.card(text,{h:o.h||.24,stand:false,col:o.col});c.position.set(0,.3,.025);c.rotation.x=0;g.add(c);return g;},
 tag(text,o){return P.card(text,Object.assign({h:.2},o||{}));},
 water(w,d){const g=new THREE.Group();const m=P.mk(G('skwat'+w+d,()=>new THREE.BoxGeometry(w,.03,d)),P.glow('#5aaeea',.75,.2));m.position.y=.015;g.add(m);g.userData.water=m;return g;},
 shelf(o){const g=new THREE.Group();g.add(at(B(.9,.03,.24,'#e3cfaa'),0,.5,0));g.add(at(B(.9,.03,.24,'#e3cfaa'),0,.02,0));[-1,1].forEach(a=>g.add(at(B(.03,.5,.24,'#d2bb94'),a*.44,.26,0)));return g;},
 boat(o){o=o||{};const g=new THREE.Group();const h=P.mk(G('skboat',()=>{const s=new THREE.Shape();s.moveTo(-.4,.08);s.lineTo(.4,.08);s.lineTo(.3,-.06);s.lineTo(-.3,-.06);s.closePath();return new THREE.ExtrudeGeometry(s,{depth:.24,bevelEnabled:false});}),P.paper(o.c||'#d9714a',{mix:.15}));h.position.set(0,.06,-.12);g.add(h);
   if(o.sail){g.add(at(CY(.01,.01,.6,'#8a6a4a',6),0,.42,0));const s=P.mk(G('sksail',()=>{const sh=new THREE.Shape();sh.moveTo(0,0);sh.lineTo(.28,0);sh.lineTo(0,.46);sh.closePath();return new THREE.ShapeGeometry(sh);}),P.paper('#ffffff',{mix:0}));s.material.side=THREE.DoubleSide;s.position.set(.01,.18,0);g.add(s);}return g;},
 car(o){o=o||{};const g=new THREE.Group();g.add(at(B(.5,.12,.26,o.c||'#e05a4a',{mix:.15}),0,.12,0));g.add(at(B(.28,.1,.24,o.c||'#e05a4a',{mix:.15}),-.02,.23,0));
   const wh=[];[[-.16,.13],[.16,.13],[-.16,-.13],[.16,-.13]].forEach(([x,z])=>{const w=at(CY(.055,.055,.04,'#34343c',14),x,.055,z);w.rotation.x=Math.PI/2;g.add(w);wh.push(w);});g.userData.wheels=wh;return g;},
 stairs(n,o){const g=new THREE.Group();for(let i=0;i<n;i++)g.add(at(B(.4,.08*(i+1),.12,'#efe5d0'),0,.04*(i+1),-i*.12));return g;},
 rug(w,d,c){return at(P.mk(G('skrug'+w+d,()=>new THREE.BoxGeometry(w,.01,d)),P.paper(c||'#e9a0a0',{mix:.25,amt:.25})),0,.005,0);},
 window(o){const g=new THREE.Group();g.add(at(B(.42,.36,.03,'#efe3cc'),0,.18,0));g.add(at(B(.34,.28,.02,'#bfe3ff',{mix:.1}),0,.18,.012));g.add(at(B(.02,.28,.025,'#efe3cc'),0,.18,.016));g.add(at(B(.34,.02,.025,'#efe3cc'),0,.18,.016));return g;},
 wall(w,h,c){const g=new THREE.Group();g.add(at(B(w,h,.05,c||'#f3ead8'),0,h/2,0));return g;},
 burst(at0,col){const g=new THREE.Group();for(let i=0;i<10;i++){const a=i/10*Math.PI*2;const r=P.mk(G('skray',()=>new THREE.BoxGeometry(.02,.12,.02)),P.glow(col||'#ffcc33',1,.6));r.position.set(Math.cos(a)*.2,Math.sin(a)*.2,0);r.rotation.z=a-Math.PI/2;g.add(r);}g.position.copy(at0);g.scale.setScalar(.01);tween(.5,k=>g.scale.setScalar(Math.max(.01,k*1.2)));return g;}
};
P.SET=S;
/* ---------- extra set pieces ---------- */
Object.assign(S,{
 flower(kind,o){o=o||{};const g=new THREE.Group();const h=o.h||(kind==='sunflower'?.62:.4);const stem=at(CY(.012,.014,h,'#5c9e4a',6),0,h/2,0);g.add(stem);
   [[-1,.35],[1,.55]].forEach(([sx,k])=>{const lf=at(P.mk(G('sklf',()=>new THREE.SphereGeometry(.06,10,6)),P.paper('#6fb35a',{mix:.15})),sx*.05,h*k,0);lf.scale.set(1,.35,.55);lf.rotation.z=sx*.6;g.add(lf);});
   const head=new THREE.Group();head.position.y=h;g.add(head);g.userData.head=head;
   if(kind==='sunflower'){head.rotation.x=-.5;for(let i=0;i<14;i++){const a=i/14*Math.PI*2;const pt=at(P.mk(G('skpet',()=>new THREE.SphereGeometry(.05,8,6)),P.paper('#ffcf33',{mix:.08})),Math.cos(a)*.1,Math.sin(a)*.1,0);pt.scale.set(1,.45,.25);pt.rotation.z=a;head.add(pt);}
     const c=at(CY(.075,.075,.035,'#7a4b25',16),0,0,.01);c.rotation.x=Math.PI/2;head.add(c);}
   else if(kind==='tulip'){const cup=at(P.mk(G('sktul',()=>new THREE.SphereGeometry(.07,14,10,0,Math.PI*2,0,Math.PI*.62)),P.paper(o.c||'#ff6f91',{mix:.1})),0,.05,0);cup.rotation.x=Math.PI;cup.position.y=.06;head.add(cup);
     for(let i=0;i<3;i++){const pt=at(CO(.035,.07,o.c||'#ff6f91',6,{mix:.1}),Math.cos(i*2.1)*.04,.09,Math.sin(i*2.1)*.04);head.add(pt);}}
   else if(kind==='rose'){for(let i=0;i<3;i++){const r=at(P.mk(G('skrose'+i,()=>new THREE.TorusGeometry(.03+i*.018,.018,6,14)),P.paper(o.c||'#e2384d',{mix:.08})),0,.03-i*.012,0);r.rotation.x=Math.PI/2;head.add(r);}head.add(at(SP(.03,o.c||'#e2384d',{mix:.08}),0,.04,0));}
   else{for(let i=0;i<6;i++){const a=i/6*Math.PI*2;const pt=at(SP(.035,o.c||'#ffffff',{mix:.05}),Math.cos(a)*.05,0,Math.sin(a)*.05);pt.scale.set(1,.4,1);head.add(pt);}head.add(at(SP(.025,'#ffcf33'),0,.01,0));}
   return g;},
 bush(o){o=o||{};const g=new THREE.Group();[[0,.12,0,.16],[.14,.1,.03,.12],[-.14,.1,-.02,.13]].forEach(([x,y,z,r])=>g.add(at(SP(r*(o.s||1),o.c||'#78b765'),x*(o.s||1),y*(o.s||1),z)));
   if(o.berry){for(let i=0;i<9;i++){const a=i*2.4;g.add(at(SP(.022,o.berry,{mix:.05}),Math.cos(a)*.17*(o.s||1),.12+Math.sin(i*1.7)*.07,Math.sin(a)*.1+.08));}}return g;},
 rock(o){o=o||{};const m=P.mk(G('skrock',()=>new THREE.DodecahedronGeometry(.12,0)),P.paper(o.c||'#b9b2a5',{mix:.2}));m.scale.set(1.3*(o.s||1),.7*(o.s||1),1*(o.s||1));m.position.y=.04;return m;},
 jar(o){o=o||{};const g=new THREE.Group();g.add(at(CY(.07,.07,o.h||.32,o.c||'#d9cfc0',16),0,(o.h||.32)/2,0));return g;},
 dish(o){o=o||{};const g=new THREE.Group();g.add(at(CY(.16,.12,.035,o.c||'#e6eef8',24),0,.02,0));if(o.soup)g.add(at(CY(.13,.13,.006,o.soup,24,{mix:.1}),0,.04,0));return g;},
 bowl(o){o=o||{};const g=new THREE.Group();const b=P.mk(G('skbowl',()=>new THREE.SphereGeometry(.13,18,10,0,Math.PI*2,Math.PI/2,Math.PI/2)),P.paper(o.c||'#e8eef6'));b.position.y=.13;g.add(b);if(o.fill)g.add(at(CY(.12,.12,.01,o.fill,18,{mix:.1}),0,.11,0));return g;},
 tray(o){o=o||{};return at(B(o.w||.5,.03,o.d||.34,o.c||'#c9ced6'),0,.015,0);},
 bag(o){o=o||{};const g=new THREE.Group();const b=at(SP(.14,o.c||'#d7c49e'),0,.13,0);b.scale.set(1,1.1,.85);g.add(b);g.add(at(CY(.05,.08,.06,o.c||'#d7c49e',10),0,.28,0));return g;},
 sack(o){return S.bag(o);},
 box(o){o=o||{};const g=new THREE.Group();g.add(at(B(o.w||.26,o.h||.18,o.d||.2,o.c||'#d9b98a'),0,(o.h||.18)/2,0));return g;},
 basket(o){o=o||{};const g=new THREE.Group();g.add(at(CY(.15,.12,.14,o.c||'#c99a5b',16),0,.07,0));const hd=P.mk(G('skhandle',()=>new THREE.TorusGeometry(.13,.012,6,18,Math.PI)),P.paper('#a87a45'));hd.position.y=.14;g.add(hd);
   if(o.fill){for(let i=0;i<7;i++)g.add(at(SP(.035,o.fill,{mix:.05}),Math.cos(i*2.4)*.08,.15,Math.sin(i*2.4)*.06));}return g;},
 river(w,d,o){const g=new THREE.Group();const m=P.mk(G('skriv'+w+d,()=>new THREE.BoxGeometry(w,.02,d)),P.glow((o&&o.c)||'#5aaeea',.8,.22));m.position.y=.012;g.add(m);g.userData.water=m;
   for(let i=0;i<6;i++){const r=P.ribbon([[-w/2+.1,.03,-d/4+i%3*d/4],[-w/4,.03,-d/4+i%3*d/4+.04],[w/4,.03,-d/4+i%3*d/4-.04],[w/2-.1,.03,-d/4+i%3*d/4]],'#d9f0ff',{w:.015,op:.9,up:V(0,0,1)});r.userData.full();r.rotation.x=0;g.add(r);}return g;},
 ship(o){o=o||{};const g=S.boat({c:o.c||'#8a5a3a',sail:true});g.scale.setScalar(o.s||1.2);return g;},
 campfire(o){const g=new THREE.Group();for(let i=0;i<4;i++){const l=at(CY(.025,.025,.3,'#8a6a4a',8),0,.03,0);l.rotation.z=Math.PI/2;l.rotation.y=i*Math.PI/4;g.add(l);}for(let i=0;i<8;i++){const a=i/8*Math.PI*2;g.add(at(SP(.04,'#bdb5a6'),Math.cos(a)*.2,.02,Math.sin(a)*.2));}const f=S.flame();f.position.y=.04;g.add(f);g.userData.tick=f.userData.tick;return g;},
 tent(o){o=o||{};const g=new THREE.Group();const t=P.mk(G('sktent',()=>{const s=new THREE.Shape();s.moveTo(-.32,0);s.lineTo(0,.42);s.lineTo(.32,0);s.closePath();return new THREE.ExtrudeGeometry(s,{depth:.6,bevelEnabled:false});}),P.paper(o.c||'#e8833a',{mix:.15}));t.position.z=-.3;g.add(t);return g;},
 skeleton(o){const g=new THREE.Group();const bone=P.paper('#f6f0e2',{mix:0});const bb=(w,h,d,x,y,z,r)=>{const m=P.mk(new THREE.BoxGeometry(w,h,d),bone);m.position.set(x,y,z);if(r)m.rotation.z=r;g.add(m);return m;};
   bb(.9,.06,.06,0,.55,0);for(let i=0;i<6;i++){bb(.03,.22,.03,-.25+i*.1,.45,.06);bb(.03,.22,.03,-.25+i*.1,.45,-.06);}bb(.5,.05,.05,.65,.5,0,-.25);bb(.3,.05,.05,.95,.38,0,-.35);
   const sk=P.mk(new THREE.BoxGeometry(.32,.18,.14),bone);sk.position.set(-.6,.65,0);g.add(sk);const jw=P.mk(new THREE.BoxGeometry(.28,.05,.12),bone);jw.position.set(-.62,.53,0);g.add(jw);
   [[-.15,1],[.2,1]].forEach(([x])=>{bb(.04,.3,.04,x,.32,.08,.2);bb(.04,.3,.04,x,.32,-.08,.2);bb(.12,.03,.05,x+.05,.17,.08);});return g;},
 sign2(text,o){return S.sign(text,o);},
 clock(o){const g=new THREE.Group();const f=at(CY(.18,.18,.05,'#fffaf0',24),0,.2,0);f.rotation.x=Math.PI/2;g.add(f);const hh=at(B(.012,.1,.01,INKC,{mix:0}),0,.24,.03);const mm=at(B(.01,.14,.01,INKC,{mix:0}),0,.26,.035);g.add(hh,mm);g.userData.hands=[hh,mm];[-1,1].forEach(sx=>g.add(at(SP(.05,'#e6b84a'),sx*.12,.4,0)));g.add(at(B(.04,.06,.04,'#555'),-.1,.02,0));g.add(at(B(.04,.06,.04,'#555'),.1,.02,0));return g;},
 kettle(o){const g=new THREE.Group();g.add(at(SP(.12,'#d8dde3'),0,.1,0));g.add(at(CY(.02,.03,.12,'#d8dde3',8),.12,.15,0).rotateZ(-.8));const h=P.mk(G('sktk',()=>new THREE.TorusGeometry(.08,.012,6,16,Math.PI)),P.paper('#555'));h.position.y=.2;g.add(h);return g;},
 stove(o){const g=new THREE.Group();g.add(at(B(.6,.36,.36,'#eef0f2'),0,.18,0));[-1,1].forEach(sx=>g.add(at(CY(.08,.08,.01,'#33333a',16),sx*.14,.365,0)));return g;},
 pan(o){const g=new THREE.Group();g.add(at(CY(.12,.11,.03,'#3a3a40',18),0,.015,0));g.add(at(B(.18,.015,.03,'#3a3a40'),.2,.025,0));return g;},
 fridge(o){const g=new THREE.Group();g.add(at(B(.36,.8,.32,'#f2f4f6'),0,.4,0));g.add(at(B(.02,.14,.02,'#999'),.14,.55,.17));return g;},
 counter(w,o){const g=new THREE.Group();g.add(at(B(w,.34,.3,'#e8dcc6'),0,.17,0));g.add(at(B(w+.02,.03,.32,'#d6c7ad'),0,.355,0));return g;},
 door(o){const g=new THREE.Group();g.add(at(B(.34,.58,.04,(o&&o.c)||'#b98b5e'),0,.29,0));g.add(at(SP(.018,'#e8c34a'),.12,.28,.03));return g;},
 cast(o){return at(CY(.045,.045,.16,'#ff8a2a',12,{mix:.1}),0,0,0);},
 scooter(o){o=o||{};const g=new THREE.Group();g.add(at(B(.42,.03,.09,o.c||'#9b59d0',{mix:.1}),0,.06,0));const pole=at(CY(.012,.012,.4,o.c||'#9b59d0',6),.19,.26,0);pole.rotation.z=-.15;g.add(pole);g.add(at(B(.02,.02,.2,'#333'),.22,.46,0));
   [-.17,.19].forEach(x=>{const w=at(CY(.045,.045,.03,'#333',12),x,.045,0);w.rotation.x=Math.PI/2;g.add(w);});return g;},
 bike(o){o=o||{};const g=new THREE.Group();const c=o.c||'#e05a7a';[-.2,.2].forEach(x=>{const w=P.mk(G('skwh',()=>new THREE.TorusGeometry(.12,.015,6,20)),P.paper('#333'));w.position.set(x,.12,0);g.add(w);});
   g.add(at(B(.38,.025,.025,c,{mix:.1}),0,.2,0));const s=at(B(.025,.2,.025,c,{mix:.1}),-.06,.22,0);g.add(s);g.add(at(B(.1,.03,.06,'#333'),-.07,.33,0));g.add(at(B(.02,.24,.02,c,{mix:.1}),.18,.24,0));g.add(at(B(.02,.02,.18,'#333'),.18,.36,0));
   if(o.training){[-1,1].forEach(sz=>{const w=at(CY(.04,.04,.02,'#666',10),-.24,.04,sz*.12);w.rotation.x=Math.PI/2;g.add(w);});}return g;},
 album(o){const g=new THREE.Group();g.add(at(B(.36,.04,.26,(o&&o.c)||'#3b6fd8',{mix:.1}),0,.02,0));return g;},
 stamp(o){o=o||{};const g=new THREE.Group();g.add(at(B(.16,.005,.2,'#fffdf5',{mix:0}),0,.004,0));if(o.pic){const p=P.STAGE.prop(o.pic,{label:false,s:.35,bare:true});p.position.set(0,.01,0);g.add(p);}return g;},
 piano(o){const g=new THREE.Group();g.add(at(B(.7,.4,.3,'#3a2a24'),0,.38,0));g.add(at(B(.66,.03,.12,'#fffdf5',{mix:0}),0,.34,.2));for(let i=0;i<5;i++)g.add(at(B(.03,.02,.07,'#222'),-.26+i*.12,.36,.18));[-1,1].forEach(sx=>g.add(at(B(.04,.2,.04,'#3a2a24'),sx*.3,.1,.18)));return g;},
 firetruck(o){const g=S.car({c:'#d93c32'});g.scale.set(1.5,1.2,1.2);return g;},
 swing(o){const g=new THREE.Group();[-1,1].forEach(sx=>{const l=at(CY(.02,.02,.8,'#8a6a4a',6),sx*.35,.38,0);l.rotation.z=sx*.12;g.add(l);});g.add(at(CY(.02,.02,.8,'#8a6a4a',6).rotateZ(Math.PI/2),0,.76,0));
   const seat=new THREE.Group();seat.position.y=.76;g.add(seat);[-1,1].forEach(sx=>seat.add(at(CY(.005,.005,.5,'#555',4),sx*.1,-.25,0)));seat.add(at(B(.26,.02,.1,'#d9714a'),0,-.5,0));g.userData.seat=seat;return g;},
 slipper(o){const g=new THREE.Group();const b=at(SP(.08,o&&o.c||'#a58ad8'),0,.04,0);b.scale.set(1,.5,1.8);g.add(b);for(let i=0;i<6;i++)g.add(at(SP(.025,'#c8b5ec'),Math.cos(i)*.06,.07,Math.sin(i*1.7)*.1));return g;},
 spider(o){const g=new THREE.Group();g.add(at(SP(.16,'#3a3340',{mix:.1}),0,.2,0));g.add(at(SP(.1,'#3a3340',{mix:.1}),0,.22,.18));for(let i=0;i<8;i++){const sx=i<4?-1:1,k=i%4;const l=at(CY(.012,.012,.36,'#3a3340',5,{mix:.1}),sx*.22,.18,-.12+k*.09);l.rotation.z=sx*1.0;g.add(l);}
   [-1,1].forEach(sx=>g.add(at(SP(.025,'#ffffff',{mix:0}),sx*.04,.27,.27)));return g;},
 ocean(w,d){return S.river(w,d,{c:'#4c9fe0'});},
 cave(o){const g=new THREE.Group();const m=P.mk(G('skcave',()=>new THREE.SphereGeometry(.45,18,12,0,Math.PI*2,0,Math.PI/2)),P.paper('#b9ae9c',{mix:.15}));g.add(m);g.add(at(B(.3,.32,.05,'#4a4038',{mix:0}),0,.16,.43));return g;},
 crane(o){/* paper crane for stamps */const g=new THREE.Group();g.add(at(CO(.06,.2,'#e2384d',4),0,.1,0).rotateZ(Math.PI/2));return g;}
});
/* ---------- people: adults and kids as wooden mannequins with painted clothes ---------- */
P.PEOPLE={grandpa:{c:'#8b6f47',h:'#e4e4e4',st:'short',gl:1,s:1.05},grandma:{c:'#b5577a',h:'#ececec',st:'bun',gl:1,s:1.02,skirt:1},mom:{c:'#e0604f',h:'#3b2314',st:'long',s:1.07},dad:{c:'#3b6ea5',h:'#2b1d14',st:'short',s:1.12},
 teacher:{c:'#7a4fb5',h:'#6b3f1f',st:'bun',gl:1,s:1.07,skirt:1},doctor:{c:'#f4f6f8',h:'#1d1a17',st:'short',s:.9},aunt:{c:'#2aa58a',h:'#5b3a1e',st:'pony',s:1.05},uncle:{c:'#e3a32b',h:'#141414',st:'short',s:.9},
 man:{c:'#5d7f3a',h:'#3d2a1a',st:'short',s:.9},woman:{c:'#d9534f',h:'#6b3f1f',st:'pony',s:1.07},explorer:{c:'#2e4d8a',h:'#6b4423',st:'short',s:.9,cap:'#2e3b55'},firefighter:{c:'#e0b030',h:'#141414',st:'short',s:.9,cap:'#d93c32'},
 boy:{c:'#3b82f6',h:'#3d2a1a',st:'short',s:.7},girl:{c:'#ef6fa0',h:'#141414',st:'pony',s:.7},baby:{c:'#ffd8e2',h:'#c8a676',st:'short',s:0.55}};
/* ---------- tiny director for dioramas ---------- */
const DIO={
 base(sc,ground,o){o=o||{};const b=S.base(o.w||4.15,o.d||2.35,ground);b.position.set(o.x||0,0,o.z==null?-2.5:o.z);b.traverse(m=>{if(m.isMesh)m.castShadow=false;});sc.g.add(b);return b;},
 put(sc,obj,x,z,o){o=o||{};obj.position.set(x,o.y||0,z);if(o.ry!=null)obj.rotation.y=o.ry;if(o.s)obj.scale.multiplyScalar(o.s);sc.g.add(obj);if(obj.userData.tick)sc.tick((dt,t)=>obj.userData.tick(t));if(o.hide){obj.visible=false;}if(o.on){obj.visible=false;sc.on(o.on,()=>DIO.grow(obj),o.nth);}return obj;},
 grow(obj,dur){obj.visible=true;const s0=obj.userData.s0||(obj.userData.s0=obj.scale.clone());obj.scale.setScalar(.01);return tween(dur||.6,k=>{const f=k<.7?k/.7*1.12:1.12-(k-.7)/.3*.12;obj.scale.set(s0.x*Math.max(.01,f),s0.y*Math.max(.01,f),s0.z*Math.max(.01,f));});},
 shrink(obj,dur){const s0=obj.scale.clone();return tween(dur||.4,k=>obj.scale.copy(s0).multiplyScalar(Math.max(.01,1-k))).then(()=>{obj.visible=false;obj.scale.copy(s0);});},
 card(sc,text,x,z,o){o=o||{};const c=P.card(text,{h:o.h||.26,sub:o.sub,col:o.col,stand:o.stand,tilt:o.tilt});if(o.ry!=null)c.rotation.y=o.ry;return DIO.put(sc,c,x,z,o);},
 person(sc,who,x,z,o){o=o||{};const p=typeof who==='string'?Object.assign({},P.PEOPLE[who]||P.PEOPLE.man,o.p||{}):who;const k=sc.kid(p,x,z,Object.assign({s:p.s||.72,ry:o.ry||0,mode:o.mode||'idle',tap:o.tap},o.say?{say:o.say}:{}));if(o.name)k.userData.name=o.name;if(o.hide||o.on){k.visible=false;if(o.on)sc.on(o.on,()=>DIO.grow(k),o.nth);}return k;},
 kid(sc,i,x,z,o){o=o||{};const k=sc.kid(i,x,z,Object.assign({s:o.s||.84,ry:o.ry||0,mode:o.mode||'idle',tap:o.tap},o.say?{say:o.say}:{}));if(o.hide||o.on){k.visible=false;if(o.on)sc.on(o.on,()=>DIO.grow(k),o.nth);}return k;},
 face(k,x,z){const dx=x-k.position.x,dz=z-k.position.z;k.userData.ry=Math.atan2(dx,dz);},
 walk(sc,k,x,z,dur,then){DIO.face(k,x,z);k.userData.mode=dur<.9?'run':'walk';return sc.move(k,x,z,dur||1.4).then(()=>{k.userData.mode=then||'idle';});},
 arc(obj,x,y,z,h,dur){const p0=obj.position.clone(),p1=V(x,y,z);return tween(dur||.8,k=>{obj.position.lerpVectors(p0,p1,k);obj.position.y+=Math.sin(Math.PI*k)*(h==null?.5:h);});},
 ribbon(sc,pts,col,o){o=o||{};o.w=o.w||.07;const r=P.ribbon(pts,col,o);sc.g.add(r);if(o.on)sc.on(o.on,()=>r.userData.grow(o.dur||1.2),o.nth);else r.userData.grow(o.dur||1.2);return r;},
 say(sc,o,text,ms){return sc.say(o,text,ms||2600);},
 at:(sc,w,f,nth)=>sc.on(w,f,nth),
 spin(sc,o,sp){sc.tick(dt=>{o.rotation.y+=dt*(sp||1);});},
 bob(sc,o,a,sp){const y0=o.position.y;sc.tick((dt,t)=>{o.position.y=y0+Math.sin(t*(sp||2))*(a||.05);});},
 sway(sc,o,a){sc.tick((dt,t)=>{o.rotation.z=Math.sin(t*1.5+o.position.x)*(a||.06);});}};
P.DIO=DIO;
/* soft, short shadows and a brighter fill: the look of paper models under a desk lamp */
if(P.lights){const L=P.lights;L.sun.position.set(-1.8,16,3.6);L.sun.intensity=.36;L.hemi.intensity=1.04;L.hemi.groundColor.set('#d3d8e2');Object.assign(L.sun.shadow.camera,{left:-8,right:8,top:8,bottom:-8});L.sun.shadow.camera.updateProjectionMatrix();}
})();
