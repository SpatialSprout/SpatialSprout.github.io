/* The Interactive Classroom — habitats: the 3D explanation page turns into the world of whatever the
   narrator is talking about. A polar bear stands in an Arctic blizzard, a beaver beside its river dam,
   a frog on a lily pond, a bus on a city street. Each habitat is a paper diorama with its own weather,
   light and small moving details; the thing being explained is the big hero in the middle.
   Load after sketch.js and props3d.js. Local units: x -2.1..2.1, z -4.6..0.7 (a full page). */
(function(){
"use strict";
const P=window.PM;if(!P||P.failed||!P.THREE||!P.SET||!P.PROP3)return;
const {THREE,V,G,tween}=P;const S=P.SET;
const pp=(c,o)=>P.paper(c,o);
const at=(o,x,y,z,s,ry)=>{o.position.set(x,y||0,z);if(s)o.scale.multiplyScalar(s);if(ry!=null)o.rotation.y=ry;return o;};
const P3=(n,o)=>{const f=P.PROP3[n];return f?f(o||{}):new THREE.Group();};
const disc=(r,c,y,op)=>{const m=P.mk(G('hbd'+r,()=>new THREE.CylinderGeometry(r,r,.02,36)),op?P.glow(c,op,.2):pp(c,{mix:.3}));m.position.y=y||.012;return m;};
const box=(w,h,d,c,o)=>P.mk(G('hbb'+w+'_'+h+'_'+d,()=>new THREE.BoxGeometry(w,h,d)),pp(c,o));
let SEED=1;const R=()=>{SEED=(SEED*9301+49297)%233280;return SEED/233280;};
const W=4.2,DZ=5.3,CZ=-1.95;
const ground=(g,c)=>{const b=S.base(W,DZ,c);b.position.z=CZ;b.traverse(m=>{if(m.isMesh)m.castShadow=false;});g.add(b);return b;};/* page-sized habitat */
/* scatter n things round the edges, keeping the middle clear for the hero */
function edge(g,n,make,o){o=o||{};for(let i=0;i<n;i++){let x,z;for(let k=0;k<12;k++){x=(R()-.5)*W*.92;z=CZ+(R()-.5)*DZ*.9;const dx=Math.abs(x)/1.1,dz=Math.abs(z-CZ)/1.5;if(dx>1||dz>1||o.any)break;}
  const m=make(i);if(!m)continue;m.position.set(x,m.position.y,z);if(o.ry!==false)m.rotation.y=R()*Math.PI*2;g.add(m);}}
function back(g,n,make,z0){for(let i=0;i<n;i++){const m=make(i);m.position.x=-W/2+.3+i*(W-.6)/Math.max(1,n-1)+(R()-.5)*.15;m.position.z=(z0==null?CZ-DZ/2+.35:z0)+(R()-.5)*.25;g.add(m);}}
function fx(g,kind,area){const tick=[];const n={snow:70,rain:70,sparkle:26,bubbles:24,leaves:18,fireflies:20,stars:40,dust:14}[kind]||20;const parts=[];
  for(let i=0;i<n;i++){let m;
    if(kind==='snow')m=P.mk(G('hfs',()=>new THREE.SphereGeometry(.03,6,4)),pp('#ffffff',{mix:0,flat:true}),0);
    else if(kind==='rain')m=P.mk(G('hfr',()=>new THREE.BoxGeometry(.012,.14,.012)),P.glow('#74c0fc',.8,.3),0);
    else if(kind==='bubbles')m=P.mk(G('hfb',()=>new THREE.SphereGeometry(.04,10,8)),P.glow('#d0ebff',.55,.3),0);
    else if(kind==='leaves'){m=P.mk(G('hfl',()=>new THREE.SphereGeometry(.05,8,4)),pp(['#f08c00','#e8590c','#fab005'][i%3],{mix:.05}),0);m.scale.set(1,.2,.6);}
    else if(kind==='fireflies'||kind==='stars')m=P.mk(G('hff',()=>new THREE.SphereGeometry(.025,6,4)),P.glow(kind==='stars'?'#fff3bf':'#ffe066',1,.9),0);
    else m=P.mk(G('hfp',()=>new THREE.OctahedronGeometry(.035)),P.glow(['#ffd43b','#ff8fab','#74c0fc','#8ce99a'][i%4],1,.7),0);
    const p={m,x:(R()-.5)*(area&&area.w||W),z:(area&&area.z||CZ)+(R()-.5)*(area&&area.d||DZ),y:R()*(area&&area.h||2),v:.3+R()*.5,ph:R()*6};m.position.set(p.x,p.y,p.z);g.add(m);parts.push(p);}
  const H=area&&area.h||2;
  return (dt,t)=>parts.forEach(p=>{if(kind==='snow'||kind==='leaves'){p.y-=dt*p.v*(kind==='leaves'?.4:.6);if(p.y<0)p.y=H;p.m.position.set(p.x+Math.sin(t*1.3+p.ph)*.15,p.y,p.z+Math.cos(t+p.ph)*.08);if(kind==='leaves')p.m.rotation.set(t*2+p.ph,t+p.ph,0);}
    else if(kind==='rain'){p.y-=dt*p.v*6;if(p.y<0)p.y=H;p.m.position.set(p.x,p.y,p.z);}
    else if(kind==='bubbles'){p.y+=dt*p.v*.5;if(p.y>H)p.y=0;p.m.position.set(p.x+Math.sin(t*2+p.ph)*.05,p.y,p.z);}
    else if(kind==='stars'){p.m.position.set(p.x,1.4+p.y*.4,p.z-1);p.m.scale.setScalar(.6+Math.sin(t*3+p.ph)*.4);}
    else{p.m.position.set(p.x+Math.sin(t*.7+p.ph)*.25,.3+p.y*.6+Math.sin(t*1.3+p.ph)*.12,p.z+Math.cos(t*.6+p.ph)*.2);p.m.rotation.y=t*2;}});}
const snowPine=s=>{const t=S.pine({s:s||.8,c:'#4f8a5b'});[.3,.52,.72].forEach((y,i)=>{const c=P.mk(G('hsp'+i,()=>new THREE.ConeGeometry([.18,.14,.1][i],.08,10)),pp('#ffffff',{mix:0}));c.position.y=(y+.1)*(s||.8);t.add(c);});return t;};
const reeds=()=>{const g=new THREE.Group();for(let i=0;i<5;i++){const r=P.mk(G('hre',()=>new THREE.CylinderGeometry(.008,.01,.45,4)),pp('#6a994e'));r.position.set((i-2)*.04,.22,(i%2)*.04);r.rotation.z=(i-2)*.1;g.add(r);const c=P.mk(G('hrc',()=>new THREE.CylinderGeometry(.018,.018,.08,6)),pp('#8a5a32'));c.position.set((i-2)*.04+Math.sin((i-2)*.1)*-.2,.42,(i%2)*.04);if(i%2)g.add(c);}return g;};
const lily=()=>{const g=new THREE.Group();const p=P.mk(G('hly',()=>new THREE.CylinderGeometry(.13,.13,.012,16,1,false,0,Math.PI*1.8)),pp('#69db7c',{mix:.15}));g.add(p);if(R()>.5){const f=S.flower('daisy',{c:'#ffc9de',h:.03});f.position.y=-.01;g.add(f);}return g;};
const acacia=s=>{const g=new THREE.Group();const tr=P.mk(G('hac',()=>new THREE.CylinderGeometry(.03,.05,.7,6)),pp('#8a6a4a'));tr.position.y=.35;tr.rotation.z=.15;g.add(tr);const top=P.mk(G('hact',()=>new THREE.SphereGeometry(.45,14,8)),pp('#7a9a3a',{mix:.25}));top.scale.set(1,.22,.8);top.position.set(.08,.72,0);g.add(top);g.scale.setScalar(s||1);return g;};
const dune=s=>{const m=P.mk(G('hdn',()=>new THREE.SphereGeometry(.5,20,10,0,Math.PI*2,0,Math.PI/2)),pp('#f2d06b',{mix:.25}));m.scale.set(1.4*s,.35*s,.8*s);return m;};
const coral=()=>{const g=new THREE.Group();const c=['#ff8787','#f783ac','#ffa94d','#b197fc'][Math.floor(R()*4)];for(let i=0;i<5;i++){const b=P.mk(G('hco',()=>new THREE.CylinderGeometry(.02,.03,.3,6)),pp(c,{mix:.1}));b.position.set((R()-.5)*.15,.15,(R()-.5)*.15);b.rotation.set((R()-.5)*.8,0,(R()-.5)*.8);g.add(b);const k=P.mk(G('hcok',()=>new THREE.SphereGeometry(.035,8,6)),pp(c,{mix:.1}));k.position.set(b.position.x+Math.sin(b.rotation.z)*-.15,.3,b.position.z+Math.sin(b.rotation.x)*.15);g.add(k);}return g;};
const weed=()=>{const pts=[];for(let i=0;i<6;i++)pts.push([Math.sin(i)*.05,i*.1,0]);const r=P.ribbon(pts,'#40c057',{w:.06,up:V(0,0,1)});r.userData.full();return r;};
const building=(h,c)=>{const g=new THREE.Group();const b=box(.45,h,.4,c||'#dee2e6');b.position.y=h/2;g.add(b);for(let r=0;r<Math.floor(h/.22);r++)for(let k=0;k<2;k++){const w=box(.1,.1,.01,'#a5d8ff',{mix:.05});w.position.set(-.1+k*.2,.18+r*.22,.205);g.add(w);}return g;};
const lamppost=()=>{const g=new THREE.Group();const p=P.mk(G('hlp',()=>new THREE.CylinderGeometry(.015,.02,.8,6)),pp('#495057'));p.position.y=.4;g.add(p);const b=P.mk(G('hlb',()=>new THREE.SphereGeometry(.06,10,8)),P.glow('#fff3bf',1,.9));b.position.y=.82;g.add(b);return g;};
const planet=(r,c,ring)=>{const g=new THREE.Group();const s=P.mk(G('hpl'+r,()=>new THREE.SphereGeometry(r,20,14)),pp(c,{mix:.1}));g.add(s);if(ring){const t=P.mk(G('hplr'+r,()=>new THREE.TorusGeometry(r*1.6,r*.12,6,30)),pp('#ffe8a8',{mix:.1}));t.rotation.x=1.2;g.add(t);}return g;};
const desk=()=>{const g=new THREE.Group();g.add(at(S.table({w:.5,d:.35,h:.3}),0,0,0));g.add(at(S.chair({c:'#74c0fc'}),0,0,.25,.9,Math.PI));return g;};
/* ---------------- the habitats ---------------- */
const ENV={
 arctic(g,T){ground(g,'#f1f6fb');const sea=P.mk(G('hasea',()=>new THREE.BoxGeometry(2.3,.014,3.2)),P.glow('#3d8fd6',.88,.2));sea.position.set(-.95,.015,CZ+.6);g.add(sea);g.userData.water=[-.95,CZ+.7];
   for(let i=0;i<6;i++){const f=P.mk(G('hafl'+i,()=>new THREE.CylinderGeometry(.14+i*.03,.16+i*.03,.06,7)),pp('#ffffff',{mix:0}));f.position.set(-1.8+(i%3)*.7,.03,CZ-.6+Math.floor(i/3)*2.2+(i%2)*.3);g.add(f);T.push((dt,t)=>{f.position.y=.03+Math.sin(t+i)*.012;f.rotation.y=t*.05+i;});}
   for(let i=0;i<4;i++){const r=P.ribbon([[-2.05,.04,CZ-.3+i*.6],[-1.2,.04,CZ-.35+i*.6],[-.2,.04,CZ-.3+i*.6]],'#d0ebff',{w:.02,up:V(0,1,0)});r.userData.full();g.add(r);T.push((dt,t)=>{r.position.x=Math.sin(t*.6+i)*.1;});}
   back(g,6,i=>{const m=S.mountain({s:.6+R()*.4,c:'#dfe7ef'});return m;},CZ-DZ/2+.15);edge(g,6,()=>snowPine(.6+R()*.5));edge(g,6,()=>{const r=S.rock({s:1+R()});r.material=pp('#e9eef3');return r;});
   for(let i=0;i<3;i++){const d=P.mk(G('hadr',()=>new THREE.SphereGeometry(.3,14,8,0,Math.PI*2,0,Math.PI/2)),pp('#ffffff',{mix:0}));d.scale.set(1.5,.35,1);d.position.set(-1.6+i*1.6,0,CZ+1.8);g.add(d);}
   T.push(fx(g,'snow',{h:2.4}));for(let i=0;i<3;i++)P.DIO&&g.add((()=>{const r=P.ribbon([[-2,.6+i*.3,CZ+1-i*.8],[-.6,.8+i*.3,CZ+.8-i*.8],[.8,.6+i*.3,CZ+1-i*.8],[2,.8+i*.3,CZ+.9-i*.8]],'#e7f5ff',{w:.04});r.userData.full();T.push((dt,t)=>{r.position.x=Math.sin(t*.8+i)*.3;});return r;})());return 'Arctic: ice and snow';},
 river(g,T){ground(g,'#a7d08c');g.userData.water=[-.75,CZ-.95];const rv=P.ribbon([[-2.2,.02,CZ-1.6],[-1,.02,CZ-.9],[.2,.02,CZ-.2],[1.2,.02,CZ+.6],[2.2,.02,CZ+1.4]],'#4dabf7',{w:.9,up:V(0,1,0),op:.92});rv.userData.full();g.add(rv);
   for(let i=0;i<5;i++){const r=P.ribbon([[-2.1+i*.1,.035,CZ-1.6+i*.05],[-.9,.035,CZ-.9],[.3,.035,CZ-.2],[2.1,.035,CZ+1.3]],'#d0ebff',{w:.02,up:V(0,1,0)});r.userData.full();g.add(r);T.push((dt,t)=>{r.position.x=((t*.15+i*.2)%.4)-.2;});}
   const dam=new THREE.Group();for(let i=0;i<9;i++){const l=P.mk(G('hdl',()=>new THREE.CylinderGeometry(.04,.045,1.0,7)),pp('#8a5a32'));l.rotation.z=Math.PI/2;l.rotation.y=-.6+(R()-.5)*.3;l.position.set((R()-.5)*.2,.04+Math.floor(i/3)*.06,(i%3-1)*.07);dam.add(l);}dam.position.set(.2,0,CZ-.2);g.add(dam);
   edge(g,10,()=>S.tree({s:.6+R()*.4}));edge(g,8,()=>reeds());edge(g,6,()=>S.rock({s:.8+R()}));T.push(fx(g,'leaves',{h:1.6}));return 'River with a beaver dam';},
 pond(g,T){ground(g,'#a7d08c');const p=P.mk(G('hpond',()=>new THREE.CylinderGeometry(1.5,1.5,.02,40)),P.glow('#5ab0f0',.85,.22));p.scale.set(1,1,1.2);p.position.set(0,.012,CZ);g.add(p);g.userData.water=[0,CZ];
   for(let i=0;i<9;i++){const l=lily();const a=i/9*Math.PI*2;l.position.set(Math.cos(a)*1.1,.025,CZ+Math.sin(a)*1.3);l.rotation.y=a;g.add(l);T.push((dt,t)=>{l.position.y=.025+Math.sin(t*1.5+i)*.005;});}
   for(let i=0;i<14;i++){const a=i/14*Math.PI*2;const r=S.rock({s:.6+R()*.5});r.position.set(Math.cos(a)*1.55,.03,CZ+Math.sin(a)*1.85);g.add(r);}edge(g,8,()=>reeds());edge(g,4,()=>S.tree({s:.6+R()*.3}));
   const df=P3('butterfly',{c:'#4dabf7'});df.scale.setScalar(.6);g.add(df);T.push((dt,t)=>{df.position.set(Math.sin(t*.7)*1.2,.7+Math.sin(t*3)*.1,CZ+Math.cos(t*.5)*1.2);df.rotation.y=-t*.7;});return 'A lily pond';},
 forest(g,T){ground(g,'#8fbf72');edge(g,22,()=>R()>.5?S.tree({s:.7+R()*.5,c:R()>.5?'#5a9a4a':'#76b85f'}):S.pine({s:.7+R()*.5}));edge(g,8,()=>{const m=P3('mushroom');m.scale.setScalar(.6);return m;});
   edge(g,5,()=>S.bush({s:.7+R()*.4}));const log=P.mk(G('hlog',()=>new THREE.CylinderGeometry(.09,.1,1.0,10)),pp('#8a6a4a'));log.rotation.z=Math.PI/2;log.position.set(1.1,.09,CZ+1.6);g.add(log);T.push(fx(g,'leaves',{h:1.8}));T.push(fx(g,'fireflies',{h:1.2}));return 'The forest';},
 farm(g,T){ground(g,'#b5d68c');const b=P3('barn');b.position.set(-1.3,0,CZ-2.0);b.scale.setScalar(1.2);g.add(b);const s=P3('tractor');s.position.set(1.4,0,CZ-1.9);s.scale.setScalar(1.3);g.add(s);
   for(let r=0;r<4;r++){const row=P.mk(G('hfrow',()=>new THREE.BoxGeometry(1.4,.05,.12)),pp('#8a6a4a',{mix:.2}));row.position.set(1.2,.025,CZ+.9+r*.3);g.add(row);for(let k=0;k<6;k++){const c=P.mk(G('hcrop',()=>new THREE.ConeGeometry(.04,.14,5)),pp('#69db7c'));c.position.set(.6+k*.24,.1,CZ+.9+r*.3);g.add(c);}}
   const f1=S.fence(3.8);f1.position.set(0,0,CZ-2.5);g.add(f1);edge(g,4,()=>{const h=P3('hay');h.scale.setScalar(.8);return h;});const sun=S.sun();sun.position.set(1.7,1.6,CZ-2.4);sun.scale.setScalar(.6);g.add(sun);T.push((dt,t)=>{sun.rotation.z=t*.2;});return 'The farm';},
 ocean(g,T){ground(g,'#4c9fe0');g.userData.water=[0,CZ+.4];const w=P.mk(G('hoc',()=>new THREE.BoxGeometry(W*.97,.03,DZ*.95)),P.glow('#4c9fe0',.88,.22));w.position.set(0,.02,CZ);g.add(w);
   for(let i=0;i<6;i++){const r=P.ribbon([[-2,.05,CZ-2+i*.8],[-.7,.08,CZ-2.1+i*.8],[.7,.05,CZ-2+i*.8],[2,.08,CZ-2.1+i*.8]],'#e7f5ff',{w:.04,up:V(0,1,0)});r.userData.full();g.add(r);T.push((dt,t)=>{r.position.y=Math.sin(t*1.5+i)*.03;r.position.x=Math.sin(t*.5+i)*.2;});}
   edge(g,5,()=>{const r=S.rock({s:1.2+R()});return r;});const isl=P.mk(G('hisl',()=>new THREE.SphereGeometry(.5,16,8,0,Math.PI*2,0,Math.PI/2)),pp('#f2d06b',{mix:.2}));isl.scale.set(1,.3,.8);isl.position.set(1.5,0,CZ-2.0);g.add(isl);const pl=P3('palm');pl.position.set(1.5,.1,CZ-2.0);pl.scale.setScalar(.8);g.add(pl);
   const sh=P3('sailboat');sh.scale.setScalar(.9);g.add(sh);T.push((dt,t)=>{sh.position.set(-1.4+Math.sin(t*.2)*.4,.03,CZ-1.9);sh.rotation.z=Math.sin(t*2)*.05;});return 'The ocean';},
 underwater(g,T){ground(g,'#f2d06b');edge(g,10,()=>coral());edge(g,10,()=>{const w=weed();T.push((dt,t)=>{w.rotation.z=Math.sin(t*1.5+w.position.x)*.15;});return w;},{ry:false});edge(g,6,()=>S.rock({s:.8+R()}));
   const tint=P.mk(G('huw',()=>new THREE.BoxGeometry(W*.97,1.6,DZ*.95)),P.glow('#74c0fc',.12,.05));tint.position.set(0,.8,CZ);g.add(tint);T.push(fx(g,'bubbles',{h:1.8}));
   for(let i=0;i<4;i++){const f=P3('fish',{c:['#ff922b','#fcc419','#ff6b6b','#74c0fc'][i]});f.scale.setScalar(.6);g.add(f);T.push((dt,t)=>{const a=t*.4+i*1.6;f.position.set(Math.cos(a)*1.6,.5+i*.15,CZ+Math.sin(a)*2.0);f.rotation.y=-a-Math.PI/2;});}return 'Under the sea';},
 desert(g,T){ground(g,'#f2d06b');back(g,4,()=>dune(1.2+R()*.6),CZ-2.2);edge(g,6,()=>dune(.5+R()*.5));edge(g,7,()=>{const c=P3('cactus');c.scale.setScalar(.7+R()*.6);return c;});edge(g,5,()=>S.rock({s:.8+R()}));
   const sun=S.sun();sun.position.set(-1.6,1.6,CZ-2.4);sun.scale.setScalar(.7);g.add(sun);T.push((dt,t)=>{sun.rotation.z=t*.3;});T.push(fx(g,'dust',{h:.8}));return 'The hot desert';},
 jungle(g,T){ground(g,'#5aa84f');edge(g,14,()=>R()>.4?S.tree({s:.9+R()*.6,c:R()>.5?'#2f9e44':'#40c057'}):P3('palm'));edge(g,10,()=>{const l=P.mk(G('hjl',()=>new THREE.SphereGeometry(.2,10,6)),pp('#37b24d',{mix:.1}));l.scale.set(1,.15,.5);l.position.y=.05;return l;});
   edge(g,6,()=>S.flower('tulip',{c:['#ff6b6b','#fab005','#e64980'][Math.floor(R()*3)]}));for(let i=0;i<5;i++){const v=P.ribbon([[-1.8+i*.9,2,CZ-2],[-1.7+i*.9,1.4,CZ-1.9],[-1.8+i*.9,.9,CZ-2]],'#2b8a3e',{w:.03});v.userData.full();g.add(v);}T.push(fx(g,'rain',{h:2.2}));return 'The rainforest';},
 savannah(g,T){ground(g,'#d8c66a');edge(g,6,()=>acacia(.8+R()*.5));edge(g,20,()=>{const c=P.mk(G('hsg',()=>new THREE.ConeGeometry(.04,.3,4)),pp('#b5a33a'));c.position.y=.15;return c;});edge(g,4,()=>S.rock({s:1+R()}));
   const sun=S.sun();sun.position.set(1.4,1.2,CZ-2.4);sun.scale.setScalar(.8);g.add(sun);T.push(fx(g,'dust',{h:.6}));return 'The savannah';},
 mountain(g,T){ground(g,'#9cbf7a');back(g,5,()=>S.mountain({s:.9+R()*.6}),CZ-2.1);edge(g,10,()=>S.pine({s:.6+R()*.5}));edge(g,6,()=>S.rock({s:.9+R()}));for(let i=0;i<3;i++){const c=S.cloud();c.position.set(-1.5+i*1.5,1.6,CZ-2);g.add(c);T.push((dt,t)=>{c.position.x=-1.5+i*1.5+Math.sin(t*.2+i)*.3;});}return 'The mountains';},
 meadow(g,T){ground(g,'#a7d08c');edge(g,22,()=>S.flower('daisy',{c:['#ffffff','#ffd1e0','#fff3a0','#d0bfff'][Math.floor(R()*4)],h:.18}));edge(g,5,()=>S.tree({s:.7+R()*.4}));edge(g,5,()=>S.bush({s:.6+R()*.4}));
   for(let i=0;i<3;i++){const c=S.cloud();c.position.set(-1.5+i*1.5,1.7,CZ-2.2);g.add(c);T.push((dt,t)=>{c.position.x=-1.5+i*1.5+Math.sin(t*.2+i)*.3;});}for(let i=0;i<2;i++){const b=P3('butterfly',{c:['#ff922b','#cc5de8'][i]});b.scale.setScalar(.5);g.add(b);T.push((dt,t)=>{b.position.set(Math.sin(t*.6+i*3)*1.6,.6+Math.sin(t*3)*.1,CZ+Math.cos(t*.4+i)*1.8);b.rotation.y=-t*.6;});}return 'A sunny meadow';},
 garden(g,T){ground(g,'#9fcf7c');for(let r=0;r<3;r++)for(let k=0;k<7;k++){const f=S.flower(['tulip','rose','sunflower','daisy'][(r+k)%4],{c:['#ff6f91','#e2384d','#ffcf33','#ffffff'][(r+k)%4],h:.25});f.position.set(-1.8+k*.6,0,CZ+1.4+r*.35-(k===3?0:0));if(!(Math.abs(k-3)<1&&r<1))g.add(f);}
   const fn=S.fence(3.9);fn.position.set(0,0,CZ-2.5);g.add(fn);edge(g,4,()=>S.bush({s:.7}));const bee=P3('bee');bee.scale.setScalar(.5);g.add(bee);T.push((dt,t)=>{bee.position.set(Math.sin(t)*1.4,.4+Math.sin(t*4)*.1,CZ+1.5+Math.cos(t*.7)*.4);bee.rotation.y=-t;});return 'The garden';},
 city(g,T){ground(g,'#ced4da');back(g,7,()=>building(.6+R()*.9,['#dee2e6','#ffe8cc','#d0ebff','#e9ecef','#fff3bf'][Math.floor(R()*5)]),CZ-2.2);const rd=S.road(W*.96);rd.position.set(0,0,CZ+1.4);g.add(rd);
   edge(g,5,()=>lamppost());edge(g,4,()=>S.tree({s:.55}));const c=S.car({c:'#e03131'});g.add(c);T.push((dt,t)=>{c.position.set(((t*.6)%4.6)-2.3,0,CZ+1.4);c.rotation.y=0;});const sign=P3('stop sign')||null;return 'The city';},
 kitchen(g,T){ground(g,'#eadfcf');const ct=S.counter(3.2);ct.position.set(-.3,0,CZ-2.2);g.add(ct);const st=S.stove();st.position.set(1.6,0,CZ-2.2);g.add(st);const fr=S.fridge();fr.position.set(-1.85,0,CZ-2.2);g.add(fr);
   const win=S.window();win.position.set(.2,.55,CZ-2.55);g.add(win);const tb=S.table({w:1.3,d:.8});tb.position.set(0,0,CZ+1.5);g.add(tb);const pot=P.STAGE.prop('pot',{s:.5});pot.position.set(1.6,.37,CZ-2.2);g.add(pot);T.push(fx(g,'dust',{h:.6,w:.3,d:.3,z:CZ-2.2}));return 'The kitchen';},
 bedroom(g,T){ground(g,'#e9d8c4');const bed=S.bed({c:'#91a7ff'});bed.position.set(-1.4,0,CZ-1.6);g.add(bed);g.add(at(S.rug(1.6,1.0,'#ffc9de'),0,0,CZ+.6));const sh=S.shelf();sh.position.set(1.3,0,CZ-2.4);g.add(sh);
   for(let i=0;i<5;i++)g.add(at(P3('book',{c:['#e03131','#1c7ed6','#2b8a3e','#f59f00','#7950f2'][i]}),1.0+i*.14,.52,CZ-2.4,.4,Math.PI/2));const lp=S.lamp();lp.position.set(-.5,0,CZ-2.3);g.add(lp);g.add(at(P3('teddy'),1.5,0,CZ+1.2,.7));return 'A bedroom';},
 classroom(g,T){ground(g,'#e9d8b8');const bd=box(3.0,.8,.05,'#3f6b4f');bd.position.set(0,.5,CZ-2.5);g.add(bd);for(let r=0;r<2;r++)for(let k=0;k<3;k++)g.add(at(desk(),-1.3+k*1.3,0,CZ+.9+r*.9));
   const gl=P3('globe');gl.position.set(1.7,0,CZ-2.2);gl.scale.setScalar(.8);g.add(gl);const sh=S.shelf();sh.position.set(-1.6,0,CZ-2.3);g.add(sh);return 'The classroom';},
 park(g,T){ground(g,'#a7d08c');const path=P.ribbon([[-2.1,.02,CZ+1.6],[-.6,.02,CZ+.8],[.8,.02,CZ+1.2],[2.1,.02,CZ+.5]],'#e3cf9a',{w:.5,up:V(0,1,0)});path.userData.full();g.add(path);
   g.add(at(P3('slide'),-1.5,0,CZ-1.8,1.1));g.add(at(S.swing(),1.4,0,CZ-2.0,1.2));g.add(at(S.bench(),0,0,CZ-2.3));edge(g,6,()=>S.tree({s:.7+R()*.4}));edge(g,6,()=>S.flower('daisy',{c:'#ffffff',h:.15}));return 'The park';},
 beach(g,T){ground(g,'#f2d06b');const sea=P.mk(G('hbsea',()=>new THREE.BoxGeometry(W*.96,.02,1.8)),P.glow('#4dabf7',.88,.2));sea.position.set(0,.015,CZ-1.7);g.add(sea);g.userData.water=[0,CZ-1.7];
   for(let i=0;i<3;i++){const r=P.ribbon([[-2,.04,CZ-.85-i*.25],[0,.04,CZ-.8-i*.25],[2,.04,CZ-.85-i*.25]],'#ffffff',{w:.05,up:V(0,1,0)});r.userData.full();g.add(r);T.push((dt,t)=>{r.position.z=Math.sin(t*1.2+i)*.08;});}
   g.add(at(P3('umbrella',{c:'#e64980'}),1.2,0,CZ+1.0,1.3));g.add(at(P3('blanket',{c:'#ffd43b'}),1.0,0,CZ+1.3,1.3));edge(g,6,()=>{const s=P3('shell');s.scale.setScalar(.5);return s;});g.add(at(P3('palm'),-1.6,0,CZ+.6,1.1));return 'The beach';},
 night(g,T){ground(g,'#3b4a7a');const m=P3('full moon');m.position.set(-1.3,1.2,CZ-2.4);m.scale.setScalar(1.3);g.add(m);back(g,4,()=>{const h=S.house({w:.6,h:.4,d:.4,roof:'#5c7cfa'});h.traverse(o=>{if(o.isMesh&&o.material&&o.material.color&&o.material.color.b>.9&&o.material.color.r<.8)o.material=P.glow('#ffd43b',1,.8);});return h;},CZ-2.0);
   edge(g,5,()=>lamppost());T.push(fx(g,'stars',{h:1}));T.push(fx(g,'fireflies',{h:1}));return 'Night time';},
 winter(g,T){ground(g,'#f1f6fb');back(g,4,()=>{const h=S.house({w:.6,h:.42,d:.45});const sn=P.mk(G('hwsn',()=>new THREE.BoxGeometry(.7,.04,.55)),pp('#ffffff',{mix:0}));sn.position.y=.68;h.add(sn);return h;},CZ-2.1);edge(g,8,()=>snowPine(.6+R()*.4));
   const sm=P.STAGE.prop('snowman',{s:.9});sm.position.set(1.5,0,CZ+1.2);g.add(sm);T.push(fx(g,'snow',{h:2.2}));return 'A snowy winter day';},
 space(g,T){ground(g,'#1b2236');T.push(fx(g,'stars',{h:1.4}));const p1=planet(.35,'#ff922b',true);p1.position.set(-1.4,1.2,CZ-2);g.add(p1);const p2=planet(.2,'#74c0fc');p2.position.set(1.5,1.4,CZ-1.6);g.add(p2);
   const m=P3('moon');m.position.set(1.4,.6,CZ-2.4);g.add(m);const r=P3('rocket');r.scale.setScalar(.8);g.add(r);T.push((dt,t)=>{r.position.set(Math.cos(t*.3)*1.6,1.0+Math.sin(t*.6)*.2,CZ+Math.sin(t*.3)*1.6);r.rotation.z=-Math.PI/2*.5;p1.rotation.y=t*.3;});return 'Outer space';},
 campsite(g,T){ground(g,'#9cbf7a');g.add(at(S.tent({c:'#e8590c'}),-1.2,0,CZ-1.6,1.3,.4));const f=S.campfire();f.position.set(.9,0,CZ+1.2);g.add(f);T.push((dt,t)=>f.userData.tick(t));edge(g,9,()=>S.pine({s:.6+R()*.5}));const lk=S.water(1.4,.8);lk.position.set(1.2,0,CZ-2.0);g.add(lk);g.userData.water=[1.2,CZ-2.0];T.push(fx(g,'fireflies',{h:1}));return 'A campsite';},
 orchard(g,T){ground(g,'#a7d08c');for(let r=0;r<2;r++)for(let k=0;k<4;k++){const t=S.tree({s:.75,c:'#5a9a4a'});for(let a=0;a<6;a++){const ap=P.mk(G('hoa',()=>new THREE.SphereGeometry(.035,8,6)),pp('#e03131',{mix:.05}));ap.position.set(Math.cos(a)*.15,.45+Math.sin(a*2)*.08,Math.sin(a)*.15+.05);t.add(ap);}t.position.set(-1.6+k*1.07,0,CZ-2.1+r*3.6);g.add(t);}
   g.add(at(S.basket({fill:'#e03131'}),1.5,0,CZ+.4,1.3));return 'The apple orchard';},
 store(g,T){ground(g,'#e3e8ee');for(let k=0;k<3;k++){const sh=S.shelf();sh.position.set(-1.4+k*1.4,0,CZ-2.3);g.add(sh);for(let i=0;i<5;i++)g.add(at(P3(['milk','juice','box','bottle','jar'][(i+k)%5]),-1.75+k*1.4+i*.17,.52,CZ-2.3,.3));}g.add(at(P3('cart'),1.5,0,CZ+1.2,1.3,-.6));g.add(at(S.counter(1.2),-1.2,0,CZ+1.4));return 'The store';},
 town(g,T){ground(g,'#b5d68c');back(g,4,()=>S.house({w:.7,h:.5,d:.5,roof:['#c2553a','#5c7cfa','#e8a33a','#2b8a3e'][Math.floor(R()*4)]}),CZ-2.0);const rd=S.road(W*.96);rd.position.set(0,0,CZ+1.5);g.add(rd);edge(g,5,()=>S.tree({s:.6}));
   const b=P3('school bus');b.scale.setScalar(.8);g.add(b);T.push((dt,t)=>{b.position.set(((t*.5)%4.6)-2.3,0,CZ+1.5);});return 'Our town';},
 sky(g,T){ground(g,'#bfe0a0');for(let i=0;i<5;i++){const c=S.cloud();c.scale.setScalar(1.2);c.position.set(-1.8+i*.9,1.2+(i%2)*.4,CZ-1.8+(i%3)*.8);g.add(c);T.push((dt,t)=>{c.position.x=-1.8+i*.9+Math.sin(t*.2+i)*.3;});}
   const sun=S.sun();sun.position.set(1.6,1.7,CZ-2.4);sun.scale.setScalar(.7);g.add(sun);edge(g,6,()=>S.tree({s:.6}));const rb=P.STAGE.prop('rainbow',{s:1});rb.position.set(-.3,0,CZ-2.5);rb.scale.setScalar(1.6);g.add(rb);return 'Up in the sky';},
 home(g,T){ground(g,'#e9d8c4');g.add(at(S.rug(2.0,1.3,'#a5d8ff'),0,0,CZ+.4));const sofa=new THREE.Group();sofa.add(at(box(1.2,.22,.4,'#e8590c'),0,.11,0));sofa.add(at(box(1.2,.3,.1,'#e8590c'),0,.3,-.18));g.add(at(sofa,-.6,0,CZ-2.2));
   const tv=box(.7,.4,.05,'#343a40');tv.position.set(1.3,.6,CZ-2.5);g.add(tv);g.add(at(S.lamp(),1.8,0,CZ-2.1));g.add(at(S.window(),-1.7,.55,CZ-2.55));g.add(at(P3('cat'),1.4,0,CZ+1.2,.6));return 'At home';}
};
/* ---------------- what lives where ---------------- */
const MAP={};const put=(kind,list)=>list.split(',').forEach(n=>MAP[n.trim()]=kind);
put('arctic','polar bear,polar,penguin,seal,walrus,igloo,snowy mountain,ice,arctic fox,narwhal,ptarmigan,caribou,whale,snowflake,glacier,iceberg,sled,skier,mitten,mittens,scarf,coat,parka');
put('river','beaver,dam,river,canoe,kayak,otter,salmon,bridge,log,wood,raft,heron');
put('pond','frog,duck,swan,goose,turtle,tadpole,dragonfly,snail,lake,pond,water lily,fly,mosquito,ducklings,lily');
put('forest','bear,wolf,deer,moose,fox,owl,squirrel,raccoon,rabbit,bunny,hedgehog,mushroom,acorn,evergreen,tree,leaf,fallen leaf,nest,bat,spider,web,stick,pine,bird,woodpecker,cricket,ladybug,ant,worm,caterpillar,chrysalis,bug,log');
put('farm','cow,ox,pig,piglet,sheep,lamb,goat,horse,foal,chicken,hen,rooster,chick,hay,tractor,barn,farmer,corn,pumpkin,egg,milk,hatching,mule,turkey,carrot,potato,onion,turnip,lettuce,broccoli,peas,beans,seed,seedling,sprout,soil,plant,herb,farm');
put('underwater','fish,tropical fish,shark,octopus,crab,shell,dolphin,jellyfish,starfish,coral,seaweed,anchor');
put('ocean','ocean,ship,sailboat,boat,lighthouse,island,wave,water wave,surfboard,swimmer,life jacket,lifering,seagull');
put('desert','camel,cactus,scorpion,snake,lizard,pyramid,sand,dune,oasis');
put('jungle','monkey,parrot,toucan,sloth,tiger,gorilla,crocodile,palm,palm tree,banana,pineapple,coconut,jaguar,frog2');
put('savannah','lion,elephant,giraffe,zebra,rhino,hippo,cheetah,kangaroo,ostrich,baobab');
put('mountain','mountain,goat2,eagle,yak,llama,volcano,rock,hiking,cave');
put('garden','flower,sunflower,tulip,rose,blossom,daisy,bee,butterfly,honeycomb,honey,watering can,strawberry,tomato,cherries,grapes,peach,pear');
put('city','city,building,tower,bus,taxi,police car,police officer,ambulance,fire truck,firefighter,traffic light,stop sign,crossing,parking,factory,office,construction,construction worker,garbage truck,delivery truck,truck,car,train,subway,scooter,cyclist,bicycle,skateboard,post office,bank,cinema,library,museum,hospital,doctor,nurse,church,temple');
put('kitchen','bread,cake,pie,cookie,cupcake,donut,pancakes,pizza,sandwich,soup,pot,pan,plate,bowl,spoon,fork,knife,cup,mug,glass,juice,butter,cheese,meat,chicken leg,rice,spaghetti,sauce,salt,oven,microwave,fridge,chef,baker,hamburger,fries,lemon,orange,apple,kiwi,dumpling,perogies,noodles,jam,jar,kettle,popcorn,ice cream,chocolate,candy,lollipop,salad,egg2');
put('bedroom','bed,pillow,teddy,toy,lamp,sleeping,yawning,zzz,pajamas,book,books,toothbrush,comb,soap,tub,bath,shower,clock,alarm clock,slipper,ghost,robot');
put('classroom','teacher,school,pencil,crayon,marker,paper,glue,scissors,ruler,backpack,computer,globe,map,calendar,letter,writing,paintbrush,palette,artist,cube,puzzle,question,three,tape,paperclip,eraser,compass');
put('park','ball,kite,slide,swing,bench,park,playground,dog,puppy,runner,soccer,football,basketball,baseball,tennis,hockey,frisbee,skates,balloon,ice cream truck,picnic,walker,wheelchair');
put('beach','beach,umbrella,sandal,swimsuit,bucket,sun,sunglasses,sunrise,sunset,crab2,starfish2,pool');
put('night','moon,full moon,stars,star,night,owl2,firefly,candle,lantern,telescope');
put('winter','snowman,snow,skates2,hockey2,rink,mittens2,winter,sled2,hot chocolate');
put('space','rocket,alien,planet,astronaut,comet,satellite,earth');
put('campsite','tent,fire,campfire,marshmallow,flashlight,s’mores,lantern2');
put('orchard','apple tree,orchard,basket');
put('store','store,shopping cart,cart,cashier,coin,money,wallet,price,shopping,gift,present,bag');
put('home','family,people,man,woman,boy,girl,child,baby,grandma,grandpa,mom,dad,home,house,cat,kitten,phone,telephone,tv,radio,chair,table,door,key,lock,vacuum,broom,washing machine,fan,plug,light bulb,sofa,window,piano,guitar,drum,violin,trumpet,music,singer,dancer,party,heart,hug');
put('sky','cloud,rain,rainbow,wind,airplane,helicopter,balloon2,weather,storm,lightning,umbrella2,windmill,kite2');
const ANIM={fly:'bird,parrot,owl,eagle,bee,butterfly,dragonfly,ladybug,bat,airplane,helicopter,rocket,kite,toucan,duck2,fly,mosquito,balloon,alien',
 swim:'fish,tropical fish,shark,whale,dolphin,octopus,seal,turtle,swan,goose,duck,canoe,kayak,sailboat,ship,boat,beaver,salmon,penguin2,raft,surfboard',
 walk:'bear,polar bear,wolf,fox,deer,moose,caribou,raccoon,lion,tiger,elephant,giraffe,zebra,camel,cow,ox,pig,sheep,lamb,goat,horse,foal,mule,dog,puppy,cat,kitten,penguin,chicken,hen,rooster,turkey,monkey,panda,sloth,mouse,squirrel,snail,crab,ant,caterpillar,worm,snake,dinosaur,dragon',
 hop:'frog,rabbit,bunny,kangaroo,chick,cricket,grasshopper',
 float:'moon,full moon,sun,star,stars,cloud,rainbow,balloon,snowflake,planet,comet,light bulb,heart',
 drive:'car,bus,school bus,taxi,truck,fire truck,police car,ambulance,tractor,train,bicycle,scooter,garbage truck,delivery truck,snowmobile,sled,skateboard,wagon,cart'};
const AN={};Object.keys(ANIM).forEach(k=>ANIM[k].split(',').forEach(n=>AN[n]=k));
/* when a lesson is about letters, numbers or ideas (not a thing with a home), pick a habitat from its strand */
const STRAND_ENV={'Sounds and Letters':'garden','Sounds and Spelling':'meadow','Words':'park','Naming Words':'town','Sentences':'classroom','Action Words':'park','Describing and Joining':'meadow','Writing':'classroom',
 'Life Systems':'forest','Matter and Energy':'kitchen','Structures and Mechanisms':'city','Earth and Space Systems':'sky','Heritage and Identity':'home','People and Environments':'town',
 'Number':'store','Algebra':'garden','Data':'park','Spatial Sense':'city','Financial Literacy':'store'};
const ENVS=Object.keys(ENV);
P.HAB={ENV,MAP,AN,
 kindFor(name,fallback){return MAP[name]||fallback||'meadow';},
 /* build a habitat: returns {g, tick, title} */
 make(kind,seed){SEED=seed||7;const g=new THREE.Group();const T=[];let title='';try{title=(ENV[kind]||ENV.meadow)(g,T);}catch(e){console.error('habitat',kind,e);}
   g.traverse(o=>{if(o.isMesh&&!o.userData.ink){o.receiveShadow=true;}});return {g,tick:(dt,t)=>T.forEach(f=>{try{f(dt,t);}catch(e){}}),title,water:g.userData.water};},
 mini(kind,seed){SEED=seed||3;const g=new THREE.Group();const T=[];const tmp=new THREE.Group();try{(ENV[kind]||ENV.meadow)(tmp,T);}catch(e){}
   const gc=tmp.children[0]&&tmp.children[0].children[2]?tmp.children[0].children[2].material.color.getStyle():'#a7d08c';const b=S.base(4.2,2.5,'#'+new THREE.Color(gc).getHexString());b.position.z=-1.95;g.add(b);
   const keep=tmp.children.slice(1).filter(o=>o.position.z<CZ-1.2&&o.position.y<1.2&&!o.isLight).slice(0,9);keep.forEach(o=>{o.position.z=-3.05+(o.position.z-(CZ-DZ/2))*.25;o.scale.multiplyScalar(.75);g.add(o);});return {g,tick:()=>{}};},
 strandEnv(strand,i){return STRAND_ENV[strand]||ENVS[(i||0)%ENVS.length];},
 /* the hero lives in its habitat: walkers stroll a loop, swimmers swim, flyers circle, drivers drive */
 animate(hero,name,base){const how=AN[name]||'idle';const y0=base.y||0,x0=base.x||0,z0=base.z||CZ;let t=Math.random()*3;
   return (dt)=>{t+=dt;const r=.45;
    if(how==='walk'){const a=t*.35;hero.position.set(x0+Math.sin(a)*r*1.4,y0+Math.abs(Math.sin(t*5))*.02,z0+Math.sin(a*2)*r*.5);hero.rotation.y=Math.cos(a)>0?-.4:Math.PI+.4;}
    else if(how==='swim'){const a=t*.5;hero.position.set(x0+Math.sin(a)*r*1.6,y0+.03+Math.sin(t*2)*.03,z0+Math.cos(a)*r*.6);hero.rotation.y=-a+(Math.cos(a)>0?0:0)-Math.PI/2;hero.rotation.z=Math.sin(t*3)*.05;}
    else if(how==='fly'){const a=t*.6;hero.position.set(x0+Math.sin(a)*r*1.8,y0+.7+Math.sin(t*2)*.12,z0+Math.cos(a)*r*.9);hero.rotation.y=-a-Math.PI/2;hero.rotation.z=Math.sin(t*4)*.12;}
    else if(how==='hop'){const k=(t*1.2)%1;hero.position.set(x0+Math.sin(t*.5)*r,y0+Math.sin(k*Math.PI)*.25,z0+Math.cos(t*.5)*r*.4);hero.rotation.y=Math.cos(t*.5)>0?-.5:Math.PI+.5;}
    else if(how==='drive'){const a=t*.4;hero.position.set(x0+Math.sin(a)*r*2,y0+Math.abs(Math.sin(t*14))*.01,z0);hero.rotation.y=Math.cos(a)>0?0:Math.PI;}
    else if(how==='float'){hero.position.y=y0+.9+Math.sin(t*1.2)*.08;hero.rotation.y=(base.ry||-.3)+Math.sin(t*.4)*.3;}
    else{hero.position.y=y0+Math.sin(t*1.6)*.04;hero.rotation.y=(base.ry||-.5)+Math.sin(t*.5)*.25;}};}
};
})();
