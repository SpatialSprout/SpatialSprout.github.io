/* The Interactive Classroom — little stage: acted 3D scenes for the subject books.
   Kids who act (run, swim, cover their eyes, shiver, cheer…), props that come alive (the bee flies, the
   fish swims, the sun glows), speech bubbles, things that fly onto a kid (a helmet onto a head) and
   simple particles (snow, rain, music notes, steam, sparkles). A lesson attaches a scene to a theory
   step or a game round:  set.scene = function(sc, st, set){ ... return {win(ans), miss()} }  */
(function(){
"use strict";
const P=window.PM;if(!P||P.failed||!P.THREE||!P.K2)return;
const {THREE,V,G,M,lam,mk,label,A,tween,easeOut,burst}=P;const K=P.K,K2=P.K2;
const lerp=(a,b,k)=>a+(b-a)*k;

/* ---------- 3D props made in code (others fall back to the picture standee) ---------- */
const sph=(r,c,o)=>{const m=mk(G('st_s'+r,()=>new THREE.SphereGeometry(r,22,16)),o?new THREE.MeshLambertMaterial(Object.assign({color:c},o)):lam(c),0);return m;};
const cyl=(a,b,h,c,n)=>mk(G('st_c'+a+b+h+(n||18),()=>new THREE.CylinderGeometry(a,b,h,n||18)),lam(c),0);
const box=(x,y,z,c)=>mk(G('st_b'+x+y+z,()=>new THREE.BoxGeometry(x,y,z)),lam(c),20);
const cone=(r,h,c,n)=>mk(G('st_k'+r+h+(n||16),()=>new THREE.ConeGeometry(r,h,n||16)),lam(c),0);
const PROPS={
 sun(){const g=new THREE.Group();const s=sph(.32,'#ffc93c',{emissive:'#ff9d00',emissiveIntensity:.45});g.add(s);const rays=new THREE.Group();g.add(rays);
   for(let i=0;i<10;i++){const c=cone(.07,.24,'#ffb300',8);const a=i*Math.PI/5;c.position.set(Math.cos(a)*.46,Math.sin(a)*.46,0);c.rotation.z=a-Math.PI/2;rays.add(c);}
   const face=new THREE.Group();face.position.z=.3;g.add(face);[-1,1].forEach(x=>{const e=sph(.035,'#5d3a00');e.position.set(x*.1,.06,0);face.add(e);});
   const sm=mk(G('st_sm',()=>new THREE.TorusGeometry(.09,.018,6,14,Math.PI)),lam('#5d3a00'),0);sm.rotation.z=Math.PI;sm.position.y=-.05;face.add(sm);
   g.userData.spin=rays;g.userData.glow=s;return g;},
 bicycle(){const g=new THREE.Group();const red='#e53935';const tube=(a,b,r,c)=>{const A=V(a[0],a[1],a[2]||0),B=V(b[0],b[1],b[2]||0);const d=B.clone().sub(A);const m=cyl(r,r,1,c,10);m.scale.y=d.length();m.position.copy(A).add(B).multiplyScalar(.5);m.quaternion.setFromUnitVectors(V(0,1,0),d.normalize());g.add(m);return m;};
   const wheels=[-.32,.32].map(x=>{const w=new THREE.Group();w.position.set(x,.21,0);g.add(w);const tire=mk(G('st_tire',()=>new THREE.TorusGeometry(.19,.03,8,28)),lam('#263238'),0);w.add(tire);
     for(let i=0;i<4;i++){const s=cyl(.008,.008,.36,'#b0bec5',6);s.rotation.z=i*Math.PI/4;w.add(s);}const hub=cyl(.03,.03,.06,'#90a4ae',10);hub.rotation.x=Math.PI/2;w.add(hub);return w;});
   const BB=[-.02,.22],S=[-.1,.5],H=[.24,.5],R=[-.32,.21],F=[.32,.21];tube(S,BB,.022,red);tube(S,H,.022,red);tube(BB,H,.022,red);tube(BB,R,.016,red);tube(S,R,.016,red);tube(H,F,.018,'#b0bec5');
   tube([.24,.5],[.21,.62],.02,'#b0bec5');tube([.21,.62,-.17],[.21,.62,.17],.018,'#37474f');[-.17,.17].forEach(z=>{const gr=cyl(.028,.028,.07,'#212121',10);gr.rotation.x=Math.PI/2;gr.position.set(.21,.62,z);g.add(gr);});
   const seat=mk(G('st_seat',()=>new THREE.BoxGeometry(.17,.04,.09)),lam('#212121'),0);seat.position.set(-.11,.53,0);g.add(seat);tube([-.1,.5],[-.11,.52],.014,'#b0bec5');
   const bell=sph(.025,'#ffd54f');bell.position.set(.2,.66,.08);g.add(bell);g.userData.wheels=wheels;return g;},
 moon(){const g=new THREE.Group();const s=sph(.3,'#fff3c4',{emissive:'#fff1a8',emissiveIntensity:.5});g.add(s);[[.1,.08],[-.08,-.1],[.05,-.14]].forEach(([x,y])=>{const c=sph(.05,'#efe0a0');c.position.set(x,y,.27);g.add(c);});return g;},
 cloud(){const g=new THREE.Group();[[0,0,.22],[.22,-.03,.17],[-.22,-.04,.16],[.1,.12,.15]].forEach(([x,y,r])=>{const c=sph(r,'#ffffff');c.position.set(x,y,0);g.add(c);});return g;},
 helmet(){const g=new THREE.Group();const d=mk(G('st_helm',()=>new THREE.SphereGeometry(.24,20,12,0,Math.PI*2,0,Math.PI*.5)),lam('#e53935'),12);g.add(d);const s=box(.06,.03,.3,'#ffffff');s.position.y=.2;g.add(s);return g;},
 sunglasses(){const g=new THREE.Group();[-1,1].forEach(x=>{const l=mk(G('st_lens',()=>new THREE.CylinderGeometry(.07,.07,.02,18)),lam('#111827'),0);l.rotation.x=Math.PI/2;l.position.x=x*.085;g.add(l);});const b=box(.08,.015,.015,'#111827');g.add(b);return g;},
 hat(){const g=new THREE.Group();const b=cyl(.26,.26,.03,'#f59e0b',24);g.add(b);const t=cyl(.15,.16,.16,'#f59e0b',20);t.position.y=.09;g.add(t);const r=cyl(.162,.162,.04,'#e53935',20);r.position.y=.04;g.add(r);return g;},
 scarf(){const g=new THREE.Group();const r=mk(G('st_scarf',()=>new THREE.TorusGeometry(.16,.05,8,20)),lam('#2f7de1'),0);r.rotation.x=Math.PI/2;g.add(r);return g;},
 mittens(){const g=new THREE.Group();[-1,1].forEach(x=>{const m=box(.09,.12,.06,'#5c6bc0');m.position.x=x*.3;g.add(m);});return g;},
 coat(){const g=new THREE.Group();const c='#42a5f5';const b=mk(G('st_coatb',()=>new THREE.CylinderGeometry(.15,.21,.42,14)),lam(c));b.position.y=.21;g.add(b);[-1,1].forEach(s=>{const a=mk(G('st_coata',()=>new THREE.CylinderGeometry(.055,.065,.34,10)),lam(c));a.position.set(s*.22,.24,0);a.rotation.z=s*.35;g.add(a);});const z=mk(G('st_coatz',()=>new THREE.BoxGeometry(.02,.4,.02)),lam('#1565c0'));z.position.set(0,.21,.17);g.add(z);[0,1,2].forEach(i=>{const bt=mk(G('st_coatbt',()=>new THREE.SphereGeometry(.022,8,6)),lam('#ffca28'));bt.position.set(.045,.1+i*.11,.175);g.add(bt);});const col=mk(G('st_coatc',()=>new THREE.TorusGeometry(.11,.035,8,16)),lam('#1565c0'));col.rotation.x=Math.PI/2;col.position.y=.42;g.add(col);return g;},
 box(){const g=new THREE.Group();const c=lam('#d7a15e'),w=.8,h=.5,d=.65;const fl=box(w,.03,d,'#c58b4a');fl.position.y=.015;g.add(fl);
   [[0,h/2,-d/2,w,h,.03],[0,h/2,d/2,w,h,.03],[-w/2,h/2,0,.03,h,d],[w/2,h/2,0,.03,h,d]].forEach(([x,y,z,a,b,e])=>{const m=box(a,b,e,'#d7a15e');m.position.set(x,y,z);g.add(m);});g.userData.top=h;return g;},
 table(){const g=new THREE.Group();const t=box(1.2,.06,.7,'#a1887f');t.position.y=.62;g.add(t);[[-.52,-.28],[.52,-.28],[-.52,.28],[.52,.28]].forEach(([x,z])=>{const l=box(.06,.6,.06,'#8d6e63');l.position.set(x,.3,z);g.add(l);});g.userData.top=.65;return g;},
 pond(){const g=new THREE.Group();const w=mk(G('st_pond',()=>new THREE.CylinderGeometry(.9,.9,.03,40)),new THREE.MeshLambertMaterial({color:'#64b5f6',transparent:true,opacity:.85}),0);w.position.y=.015;g.add(w);return g;},
 water(){const g=new THREE.Group();const w=mk(G('st_pond',()=>new THREE.CylinderGeometry(.9,.9,.03,40)),new THREE.MeshLambertMaterial({color:'#64b5f6',transparent:true,opacity:.85}),0);w.scale.set(1.75,1,.6);w.position.y=.015;g.add(w);
   for(let i=0;i<5;i++){const r=mk(G('st_ripple',()=>new THREE.TorusGeometry(.12,.008,4,20)),lam('#e3f2fd'),0);r.rotation.x=Math.PI/2;r.position.set(-1.1+i*.55,.035,(i%2?.18:-.15));g.add(r);}return g;},
 canoe(){const g=new THREE.Group();const hull=mk(G('st_hull',()=>new THREE.SphereGeometry(.5,24,12,0,Math.PI*2,Math.PI/2,Math.PI/2)),new THREE.MeshLambertMaterial({color:'#c1622b',side:THREE.DoubleSide}),0);hull.scale.set(1,.34,.36);hull.position.y=.17;g.add(hull);
   const rim=mk(G('st_rim',()=>new THREE.TorusGeometry(.5,.025,6,28)),lam('#8d3f17'),0);rim.rotation.x=Math.PI/2;rim.scale.set(1,.36,1);rim.position.y=.17;g.add(rim);
   const seat=box(.06,.03,.3,'#8d6e63');seat.position.set(.15,.13,0);g.add(seat);const pad=new THREE.Group();const sh=cyl(.015,.015,.7,'#a1887f',6);pad.add(sh);const bl=box(.09,.2,.02,'#ffb74d');bl.position.y=-.38;pad.add(bl);pad.position.set(-.2,.35,.2);pad.rotation.z=.9;g.add(pad);g.userData.paddle=pad;return g;},
 lifejacket(){const g=new THREE.Group();const c='#ff6f00';const b=mk(G('st_coatb',()=>new THREE.CylinderGeometry(.15,.21,.42,14)),lam(c));b.position.y=.21;g.add(b);
   [.12,.27].forEach(y=>{const s=mk(G('st_ljs',()=>new THREE.CylinderGeometry(.215,.215,.035,16)),lam('#eceff1'));s.position.y=y;s.scale.set(.98,1,.98);g.add(s);});
   const col=mk(G('st_ljc',()=>new THREE.TorusGeometry(.12,.05,8,16)),lam(c));col.rotation.x=Math.PI/2;col.position.y=.43;g.add(col);return g;},
 hill(){const g=new THREE.Group();const h=mk(G('st_hill',()=>new THREE.SphereGeometry(1.2,24,12,0,Math.PI*2,0,Math.PI*.32)),lam('#ffffff'),0);h.scale.y=.7;g.add(h);return g;},
 snowman(){const g=new THREE.Group();[[.26,.26],[.19,.66],[.14,.96]].forEach(([r,y])=>{const b=sph(r,'#ffffff');b.position.y=y;g.add(b);});const n=cone(.04,.16,'#fb8c00',8);n.rotation.x=Math.PI/2;n.position.set(0,.96,.16);g.add(n);
   [-1,1].forEach(x=>{const e=sph(.025,'#1b2236');e.position.set(x*.05,1.0,.12);g.add(e);});const h=cyl(.1,.1,.14,'#1b2236',16);h.position.y=1.15;g.add(h);return g;},
 turnip(){const g=new THREE.Group();const b=sph(.42,'#f3e5f5');b.scale.y=.85;b.position.y=.36;g.add(b);const top=sph(.3,'#ab47bc');top.scale.y=.5;top.position.y=.56;g.add(top);
   for(let i=0;i<4;i++){const l=cone(.06,.5,'#43a047',6);l.position.set(Math.cos(i*1.6)*.08,.95,Math.sin(i*1.6)*.08);l.rotation.z=Math.cos(i*1.6)*.4;l.rotation.x=Math.sin(i*1.6)*.4;g.add(l);}return g;},
 bread(){const g=new THREE.Group();const b=box(.7,.08,.6,'#e6b77e');g.add(b);return g;},
 butter(){const g=new THREE.Group();const b=box(.62,.03,.52,'#fff59d');g.add(b);return g;},
 cheese(){const g=new THREE.Group();const b=box(.66,.05,.56,'#ffca28');g.add(b);return g;},
 lettuce(){const g=new THREE.Group();const b=mk(G('st_lett',()=>new THREE.CylinderGeometry(.4,.4,.04,10)),lam('#7cb342'),0);g.add(b);return g;},
 stick(){const g=new THREE.Group();const s=cyl(.03,.03,.7,'#8d6e63',6);s.rotation.z=Math.PI/2;g.add(s);return g;},
 log(){const g=new THREE.Group();const s=cyl(.12,.12,1.0,'#8d6e63',12);s.rotation.z=Math.PI/2;s.position.y=.12;g.add(s);return g;},
 pot(){const g=new THREE.Group();const p=cyl(.32,.28,.34,'#90a4ae',24);p.position.y=.17;g.add(p);const w=cyl(.29,.29,.02,'#bbdefb',24);w.position.y=.32;g.add(w);return g;},
 rainbow(){const g=new THREE.Group();['#ef5350','#ffa726','#ffee58','#66bb6a','#42a5f5','#7e57c2'].forEach((c,i)=>{const t=mk(G('st_rb'+i,()=>new THREE.TorusGeometry(1.0-i*.07,.035,6,40,Math.PI)),new THREE.MeshLambertMaterial({color:c,emissive:c,emissiveIntensity:.2}),0);g.add(t);});return g;},
 note(){const g=new THREE.Group();const h=sph(.06,'#1b2236');h.scale.set(1.2,.9,.6);g.add(h);const st=box(.015,.22,.015,'#1b2236');st.position.set(.06,.11,0);g.add(st);return g;},
 windmill(){const g=new THREE.Group();const t=cyl(.16,.3,1.1,'#eceff1',8);t.position.y=.55;g.add(t);const r=cone(.24,.3,'#e53935',8);r.position.y=1.25;g.add(r);const hub=new THREE.Group();hub.position.set(0,1.0,.24);g.add(hub);
   for(let i=0;i<4;i++){const b=box(.09,.62,.02,'#8d6e63');b.position.y=.33;const arm=new THREE.Group();arm.rotation.z=i*Math.PI/2;arm.add(b);hub.add(arm);}const d=box(.14,.22,.02,'#5d4037');d.position.set(0,.11,.26);g.add(d);g.userData.spin=hub;return g;},
 heart(){const g=new THREE.Group();const s=new THREE.Shape();s.moveTo(0,-.15);s.bezierCurveTo(-.3,.05,-.12,.25,0,.1);s.bezierCurveTo(.12,.25,.3,.05,0,-.15);const h=mk(new THREE.ExtrudeGeometry(s,{depth:.06,bevelEnabled:false}),lam('#ec407a'),0);g.add(h);return g;}
};
const P3FIRST=['moon','box','bread','cheese','heart'];
function prop3(n,o){const raw=P.PROP3[n](o.p3||{});const w=new THREE.Group();w.add(raw);const b=new THREE.Box3().setFromObject(raw),sz=b.getSize(new THREE.Vector3());const k=.8*(o.s||.9)/Math.max(.05,sz.y,.85*Math.max(sz.x,sz.z));raw.scale.multiplyScalar(k);raw.position.y-=b.min.y*k;if(o.face!==false)raw.rotation.y=-.6;
  if(raw.userData.tick)w.userData.tick=raw.userData.tick;return w;}
function prop(n,o){o=o||{};let g;if(P.PROP3&&P.PROP3[n]&&(!PROPS[n]||P3FIRST.includes(n))&&!o.card){g=prop3(n,o);g.userData.name=o.name||n;g.userData.kind=n;return g;}if(PROPS[n])g=PROPS[n]();else if(K.TOYS[n]&&!o.card)g=K.toy(n,{s:o.toyS||1.6});else g=K2.standee(n,{col:o.col||K2.COLS[(o.ci||0)%K2.COLS.length],label:o.label==null?false:o.label,s:o.s||.9,bare:o.bare});
  g.userData.name=o.name||n;g.userData.kind=n;if(o.s&&(PROPS[n]||K.TOYS[n]))g.scale.multiplyScalar(o.s);return g;}

/* ---------- how each thing comes alive ---------- */
const MOVES={fly:['bee','bird','butterfly','owl','bat','airplane','helicopter','kite','balloon','duck','goose','swan','eagle','dove','parrot','chick','ladybug','mosquito','fly','rocket'],
 swim:['fish','tropical fish','whale','dolphin','shark','octopus','seal','turtle','crab','penguin','swimmer','canoe','sailboat','ship','kayak','motorboat'],
 hop:['frog','rabbit','bunny','kangaroo','cricket','puppy','dog','kitten','cat','monkey','child','girl','boy','baby','dancer','runner'],
 drive:['car','bus','school bus','taxi','truck','fire truck','police car','ambulance','tractor','train','bicycle','scooter','skateboard','sled','delivery truck','garbage truck','cyclist'],
 bounce:['ball','basketball','football','baseball','tennis','balloon2','egg','apple','orange','pumpkin'],
 shine:['sun','star','stars','light bulb','full moon','moon','sparkles','fire','candle','rainbow','gem','trophy'],
 ring:['bell','alarm clock','telephone','phone','drum','trumpet','guitar','music','radio','clock','piano'],
 grow:['seedling','sunflower','tulip','flower','tree','herb','plant','rose','blossom']};
const MOVE={};Object.keys(MOVES).forEach(k=>MOVES[k].forEach(n=>MOVE[n]=k));
function alive(o,big){if(!o||!o.parent)return Promise.resolve();const kind=o.userData.kind||o.userData.name;const how=MOVE[kind]||'jump';const p0=o.position.clone(),r0=o.rotation.clone(),s0=o.scale.clone();const B=big?1.5:1;
  const done=()=>{o.position.copy(p0);o.rotation.copy(r0);o.scale.copy(s0);};
  if(how==='fly')return tween(1.4*B,k=>{const a=k*Math.PI*2;o.position.set(p0.x+Math.sin(a)*.45*B,p0.y+Math.sin(k*Math.PI)*.9*B,p0.z-(1-Math.cos(a))*.25);o.rotation.z=Math.sin(a*3)*.2;}).then(done);
  if(how==='swim')return tween(1.3*B,k=>{o.position.set(p0.x+Math.sin(k*Math.PI*2)*.35*B,p0.y+Math.abs(Math.sin(k*Math.PI*3))*.12,p0.z);o.rotation.y=r0.y+Math.sin(k*Math.PI*6)*.35;}).then(done);
  if(how==='hop')return tween(1.0*B,k=>{const hp=Math.abs(Math.sin(k*Math.PI*3));o.position.set(p0.x+Math.sin(k*Math.PI*2)*.3*B,p0.y+hp*.45,p0.z);o.scale.set(s0.x*(1+(1-hp)*.08),s0.y*(1-(1-hp)*.1+hp*.06),s0.z);}).then(done);
  if(how==='drive')return tween(1.2*B,k=>{o.position.x=p0.x+Math.sin(k*Math.PI*2)*.5*B;o.position.y=p0.y+Math.abs(Math.sin(k*Math.PI*10))*.03;o.rotation.y=r0.y+(Math.cos(k*Math.PI*2)>0?0:.0);}).then(done);
  if(how==='bounce')return tween(1.1*B,k=>{o.position.y=p0.y+Math.abs(Math.sin(k*Math.PI*3))*.55*(1-k*.5);o.rotation.z=k*Math.PI*2;}).then(done);
  if(how==='shine'){burst(o.getWorldPosition(new THREE.Vector3()).add(V(0,.8,0)));return tween(1.2*B,k=>{const f=1+Math.sin(k*Math.PI*3)*.18;o.scale.set(s0.x*f,s0.y*f,s0.z*f);o.rotation.y=r0.y+k*Math.PI*2;}).then(done);}
  if(how==='ring')return tween(1.0*B,k=>{o.rotation.z=Math.sin(k*Math.PI*14)*.25*(1-k);o.position.y=p0.y+Math.sin(k*Math.PI)*.2;}).then(done);
  if(how==='grow')return tween(1.0*B,k=>{const f=k<.4?1-.5*(k/.4):.5+.5*((k-.4)/.6)*1.2;o.scale.set(s0.x*f,s0.y*f,s0.z*f);}).then(done);
  return tween(.8*B,k=>{o.position.y=p0.y+Math.sin(k*Math.PI)*.5;o.rotation.y=r0.y+k*Math.PI*2;}).then(done);}

/* ---------- acting kids ---------- */
function actor(i,o){o=o||{};const k=P.kid(typeof i==='object'?i:P.CREW[i%P.CREW.length]);k.scale.setScalar(o.s||.8);const u=k.userData;u.mode=o.mode||'idle';u.t=Math.random()*3;u.ry=o.ry||0;k.rotation.y=u.ry;
  u.name=o.name||'kid';u.kind='child';u.actor=true;return k;}
function headPos(k){const v=new THREE.Vector3(0,.94,0);k.userData.head.parent.localToWorld(v.copy(k.userData.head.position));return v;}
function animActor(k,dt){const u=k.userData,a=u.arms,h=u.head,b=u.body;u.t+=dt;const t=u.t;let L=-.18,Rr=.18,Lx=0,Rx=0,hx=0,hz=Math.sin(t*1.3)*.05,hy=0,by=0,bx=0,brx=0,ry=u.ry;
  switch(u.mode){
   case 'wave':Rr=2.4+Math.sin(t*9)*.45;by=Math.abs(Math.sin(t*5))*.04;break;
   case 'cheer':L=-2.6-Math.sin(t*10)*.3;Rr=2.6+Math.sin(t*10)*.3;by=Math.abs(Math.sin(t*7))*.3;break;
   case 'jump':by=Math.abs(Math.sin(t*6))*.35;L=-1.2;Rr=1.2;break;
   case 'cover':L=-2.2;Rr=2.2;Lx=-1.2;Rx=-1.2;hx=.35;hz=Math.sin(t*14)*.08;by=-.02;break;
   case 'lookup':hx=-.5;Rr=.3;break;
   case 'shiver':bx=Math.sin(t*50)*.012;L=-.9;Rr=.9;Lx=-1.3;Rx=-1.3;hz=Math.sin(t*40)*.05;break;
   case 'hot':Rr=2.0+Math.sin(t*18)*.4;Rx=-.9;hx=.1;by=Math.abs(Math.sin(t*3))*.02;break;
   case 'run':by=Math.abs(Math.sin(t*12))*.12;L=-.2+Math.sin(t*12)*.0;Lx=Math.sin(t*12)*.9;Rx=-Math.sin(t*12)*.9;brx=.25;break;
   case 'walk':by=Math.abs(Math.sin(t*7))*.05;Lx=Math.sin(t*7)*.5;Rx=-Math.sin(t*7)*.5;break;
   case 'swim':brx=1.35;by=.15+Math.sin(t*4)*.03;Lx=-Math.PI+Math.sin(t*6)*1.2;Rx=-Math.PI-Math.sin(t*6)*1.2;break;
   case 'sing':hz=Math.sin(t*4)*.18;Rr=.9;Rx=-.7;by=Math.abs(Math.sin(t*4))*.03;break;
   case 'dance':ry=u.ry+Math.sin(t*3)*.8;L=-2.2+Math.sin(t*8)*.6;Rr=2.2+Math.cos(t*8)*.6;by=Math.abs(Math.sin(t*8))*.12;break;
   case 'sleep':brx=-1.45;by=.05;hz=0;break;
   case 'read':Lx=-1.1;Rx=-1.1;L=-.4;Rr=.4;hx=.3;break;
   case 'think':Rx=-1.9;Rr=.6;hz=.12;break;
   case 'sad':hx=.4;hz=0;L=-.05;Rr=.05;break;
   case 'no':hy=Math.sin(t*14)*.4;break;
   case 'pull':brx=-.35;Lx=-1.4;Rx=-1.4;by=Math.abs(Math.sin(t*10))*.02;break;
   case 'point':Rr=1.5;Rx=-.6;break;
   case 'eat':Rx=-2.0;Rr=.3+Math.abs(Math.sin(t*6))*.2;break;
   case 'clap':Lx=-1.2;Rx=-1.2;L=-.6+Math.abs(Math.sin(t*10))*.35;Rr=.6-Math.abs(Math.sin(t*10))*.35;break;
   case 'kick':by=.02;Lx=.4;Rx=-.4;brx=Math.sin(t*6)*.15;break;
   default:by=Math.sin(t*2)*.01;}
  a[0].rotation.z=lerp(a[0].rotation.z,L,.25);a[1].rotation.z=lerp(a[1].rotation.z,Rr,.25);a[0].rotation.x=lerp(a[0].rotation.x,Lx,.25);a[1].rotation.x=lerp(a[1].rotation.x,Rx,.25);
  h.rotation.x=lerp(h.rotation.x,hx,.2);h.rotation.z=hz;h.rotation.y=lerp(h.rotation.y,hy,.3);b.position.y=by;b.position.x=bx;b.rotation.x=lerp(b.rotation.x,brx,.2);k.rotation.y=lerp(k.rotation.y,ry,.15);if(u.extra)u.extra(k,dt);}

/* ---------- particles ---------- */
function particles(g,kind,area){const grp=new THREE.Group();g.add(grp);const n=kind==='snow'?36:kind==='rain'?40:kind==='notes'?6:kind==='steam'?10:kind==='zzz'?3:kind==='sparkle'?14:12;const list=[];
  for(let i=0;i<n;i++){let m;if(kind==='snow')m=sph(.035,'#ffffff');else if(kind==='rain'){m=box(.015,.12,.015,'#64b5f6');}else if(kind==='notes')m=PROPS.note();else if(kind==='steam'){m=sph(.08,'#ffffff');m.material=new THREE.MeshLambertMaterial({color:'#ffffff',transparent:true,opacity:.55});}
    else if(kind==='zzz'){m=label('z',{size:.22,color:'#5c6bc0'});}else if(kind==='sparkle'){m=mk(P.starGeo,lam(['#ffd54f','#ff8a65','#4fc3f7','#aed581'][i%4]),0);m.scale.setScalar(.25);}else m=sph(.04,'#ffd54f');
    const s={m,x:area.x+(Math.random()-.5)*area.w,z:area.z+(Math.random()-.5)*(area.d||.6),y:Math.random()*(area.h||1.5),v:.3+Math.random()*.4,ph:Math.random()*6};m.position.set(s.x,s.y,s.z);grp.add(m);list.push(s);}
  grp.userData.tick=dt=>{list.forEach(s=>{if(kind==='snow'||kind==='rain'){s.y-=dt*s.v*(kind==='rain'?5:1);if(s.y<0)s.y=area.h||1.6;s.m.position.set(s.x+(kind==='snow'?Math.sin(s.ph+s.y*3)*.05:0),(area.y||0)+s.y,s.z);}
    else{s.y+=dt*s.v*.6;if(s.y>(area.h||1.2)){s.y=0;}s.m.position.set(s.x+Math.sin(s.ph+s.y*4)*.08,(area.y||0)+s.y,s.z);if(s.m.material&&s.m.material.opacity!=null&&kind==='steam')s.m.material.opacity=.55*(1-s.y/(area.h||1.2));if(kind==='sparkle')s.m.rotation.z+=dt*3;}});};
  return grp;}

/* ---------- the scene object handed to a lesson ---------- */
function makeScene(g0,st,off){const live=[],ticks=[];const g2=new THREE.Group();g2.position.z=off==null?.7:off;g0.add(g2);const timers=[];let clock=0;const ons=[];const sc={
  /* story sync: run f when the narration reaches the nth time a word (or phrase) is read */
  on(w,f,nth){ons.push({w:String(w).toLowerCase(),f,nth:nth||1,done:false});return sc;},
  get ons(){return ons;},
  after(ms,f){timers.push({at:clock+ms/1000,f});},
  later(f,ms){timers.push({at:clock+(ms||0)/1000,f});},
  g:g2,
  kid(i,x,z,o){const k=actor(i,o);k.position.set(x,o&&o.y||0,z);g2.add(k);live.push(k);if(o&&o.say)sc.say(k,o.say);if(o&&o.tap!==false)A.drag(k,{tap:()=>{A.pop();if(o&&o.onTap)o.onTap(k);else{const m=k.userData.mode;k.userData.mode='jump';sc.later(()=>{k.userData.mode=m;},700);}}});return k;},
  prop(n,x,z,o){o=o||{};const p=prop(n,o);p.position.set(x,o.y||0,z);if(o.ry!=null)p.rotation.y=o.ry;g2.add(p);if(p.userData.tick)ticks.push((dt,t)=>p.userData.tick(t));if(PROPS[n]&&p.userData.spin)ticks.push(dt=>{p.userData.spin.rotation.z+=dt*(n==='windmill'?2.2:.8);});
    if(o.bob)ticks.push((dt,t)=>{p.position.y=(o.y||0)+Math.sin(t*2+x)*o.bob;});if(o.spinY)ticks.push(dt=>{p.rotation.y+=dt*o.spinY;});if(o.tap!==false)A.drag(p,{tap:()=>{A.pop();A.say(o.sayTap||(o.label||n));alive(p);}});return p;},
  say(o,text,ms){if(o.userData.bubble){o.remove(o.userData.bubble);o.userData.bubble=null;}if(!text)return;const s=1/(o.scale.x||1);const b=label(text,{size:.24*s,bg:'#ffffff',border:'#1b2236'});b.position.set(0,o.userData.actor?1.35:(o.position.y>.5?-.45:1.25)*s,0);{const wx=o.position.x,lim=1.05;if(Math.abs(wx)>lim)b.position.x=(Math.sign(wx)*lim-wx)*s;}b.renderOrder=20;b.material.depthTest=false;o.add(b);o.userData.bubble=b;if(ms)sc.later(()=>{if(o.userData.bubble===b)sc.say(o,null);},ms);return b;},
  mode(k,m,ms){const old=k.userData.mode;k.userData.mode=m;if(ms)sc.later(()=>{k.userData.mode=old;},ms);},
  move(o,x,z,dur,y){const p0=o.position.clone();const p1=V(x,y==null?p0.y:y,z);return tween(dur||1,k=>{o.position.lerpVectors(p0,p1,k);});},
  hop(o,x,z,h,dur){return P.hop(o,V(x,o.position.y,z),h==null?.6:h,dur||.6);},
  wear(k,n,where){const it=PROPS[n]?PROPS[n]():prop(n,{s:.45});const hp=headPos(k);const local=g2.worldToLocal(hp.clone());const to=V(local.x,local.y+(where==='face'?.02*k.scale.y:where==='neck'?-.2*k.scale.y:.17*k.scale.y),local.z+(where==='face'?.17*k.scale.y:0));
    it.scale.multiplyScalar(k.scale.x);const from=V(to.x+.6,to.y+1.5,to.z-.25);it.position.copy(from);g2.add(it);return P.hop(it,to,.5,.7).then(()=>{g2.remove(it);it.position.set(0,where==='face'?.02:where==='neck'?-.2:.17,where==='face'?.17:0);it.scale.divideScalar(k.scale.x);k.userData.head.add(it);if(where==='neck'){it.position.set(0,-.24,0);}burst(hp);return it;});},
  dress(k,n){const c=prop(n,{});c.userData.name=n;k.children[0].add(c);c.position.set(0,.3,0);c.scale.setScalar(.01);tween(.45,q=>c.scale.setScalar(Math.max(.01,q*1.12)));burst(headPos(k));return c;},
  alive(o,big){return alive(o,big);},
  fx(kind,area){const p=particles(g2,kind,area);ticks.push(dt=>p.userData.tick(dt));return p;},
  tick(f){ticks.push(f);},
  find(n){let r=null;g2.traverse(o=>{if(!r&&o.userData&&o.userData.name===n)r=o;});return r;},
  _tick(dt,t){clock+=dt;for(let i=timers.length-1;i>=0;i--){if(timers[i].at<=clock){const f=timers[i].f;timers.splice(i,1);try{f();}catch(e){console.error(e);}}}live.forEach(k=>{if(k.parent)animActor(k,dt);});ticks.forEach(f=>{try{f(dt,t);}catch(e){}});}};S_cur.sc=sc;return sc;}
const S_cur={};P.STAGE={get cur(){return S_cur.sc;},later:(f,ms)=>S_cur.sc&&S_cur.sc.later(f,ms),makeScene,actor,animActor,alive,prop,PROPS,MOVE,particles};
})();
/* ---------- a sentence comes alive: act out what the words say ---------- */
(function(){const P=window.PM;if(!P||!P.STAGE)return;const S=P.STAGE,{THREE,V,label,A,tween,burst}=P;
const PICS=window.PICS||{};
const ALIAS={birds:'bird',ducks:'duck',apples:'apple',dogs:'dog',cats:'cat',frogs:'frog',fish:'fish',snow:'snowman',snowing:'snowflake',raining:'rain',umbrellas:'umbrella',lake:'lake',pond:'pond',mom:'woman',dad:'man',grandma:'grandma',grandpa:'grandpa',school:'school',park:'park',bus:'bus',sun:'sun',moon:'moon',cake:'cake',pizza:'pizza',soup:'soup',milk:'milk',juice:'juice',bread:'bread',cheese:'cheese',boot:'boot',hat:'hat',kite:'kite',ball:'ball',owl:'owl',egg:'egg',bird:'bird',bed:'bed',lemon:'lemon',ice:'ice',book:'book',clouds:'cloud',house:'house',plane:'airplane',tree:'tree',box:'box',table:'table',kitten:'kitten',puppy:'puppy',baby:'baby',nurse:'nurse',coins:'coin',dime:'coin',bag:'bag',penguins:'penguin',chicken:'chicken',rainbow:'rainbow',game:'trophy',dumplings:'perogies',time:'clock'};
function nounOf(words){for(const w of words){const k=ALIAS[w]||w;if(PICS[k]||S.PROPS[k])return k;}return null;}
S.actOut=function(sc,text,pic){const raw=String(text||'');const ws=raw.toLowerCase().replace(/[^a-z' ]/g,' ').split(/\s+/).filter(Boolean);const has=(...a)=>a.some(x=>ws.includes(x));
  let o=pic;if(!o){const n=nounOf(ws);if(n)o=sc.prop(n,0,-2.75,{label:false,s:1.05});}
  const end=raw.trim().slice(-1);if('?!.'.includes(end)&&end){const m=label(end==='.'?'•':end,{size:.62,color:end==='?'?'#2f7de1':end==='!'?'#e4572e':'#1b2236'});m.position.set(o?o.position.x+.75:0,1.3,o?o.position.z:-2.6);m.scale.multiplyScalar(.01);sc.g.add(m);const s1=m.scale.clone().multiplyScalar(100);tween(.4,k=>m.scale.copy(s1).multiplyScalar(Math.max(.01,k))).then(()=>{if(end==='!')burst(m.getWorldPosition(new THREE.Vector3()));});}
  if(!o)return;const p0=o.position.clone(),s0=o.scale.clone(),r0=o.rotation.clone();
  if(has('sleep','sleeping','nap','sleeps')){tween(.5,k=>{o.rotation.z=r0.z+k*1.3;});sc.fx('zzz',{x:p0.x+.3,z:p0.z,w:.2,h:1.0,y:.5});return;}
  if(has('snow','snowing','snows','cold','winter','january')){sc.fx('snow',{x:0,z:-2.4,w:4.2,d:1.2,h:2});S.alive(o,true);return;}
  if(has('raining','rain')){sc.fx('rain',{x:0,z:-2.4,w:4.2,d:1.2,h:2});sc.prop('umbrella',p0.x+.8,p0.z+.1,{label:false,s:.8});return;}
  if(has('sing','singing','sings','music','band')){sc.fx('notes',{x:p0.x,z:p0.z,w:.6,h:1.3,y:.6});S.alive(o,true);return;}
  if(has('hot','warm','sunny')){sc.fx('steam',{x:p0.x,z:p0.z,w:.4,h:1.2,y:.7});S.alive(o,true);return;}
  if(has('big','huge','tall','giant')){tween(1.2,k=>{const f=1+Math.sin(k*Math.PI)*.6;o.scale.set(s0.x*f,s0.y*f,s0.z*f);}).then(()=>o.scale.copy(s0));return;}
  if(has('small','tiny','little')){tween(1.2,k=>{const f=1-Math.sin(k*Math.PI)*.45;o.scale.set(s0.x*f,s0.y*f,s0.z*f);}).then(()=>o.scale.copy(s0));return;}
  if(has('run','runs','race','fast','go')){tween(1.6,k=>{o.position.x=p0.x+Math.sin(k*Math.PI*2)*1.4;o.position.y=p0.y+Math.abs(Math.sin(k*Math.PI*12))*.1;}).then(()=>o.position.copy(p0));return;}
  if(has('fly','flies','flying','over')){tween(1.6,k=>{const a=k*Math.PI*2;o.position.set(p0.x+Math.sin(a)*1.1,p0.y+Math.sin(k*Math.PI)*1.0,p0.z);}).then(()=>o.position.copy(p0));return;}
  if(has('swim','swims')){tween(1.6,k=>{o.position.x=p0.x+Math.sin(k*Math.PI*2)*1.1;o.rotation.y=r0.y+Math.sin(k*Math.PI*8)*.4;}).then(()=>{o.position.copy(p0);o.rotation.copy(r0);});return;}
  if(has('bark','barks','woof')){const b=label('Woof!',{size:.32,bg:'#ffffff'});b.position.set(p0.x+.5,1.3,p0.z);sc.g.add(b);S.alive(o,true);return;}
  if(has('jump','jumps','hop','play','won','hooray','wow')){tween(1.2,k=>{o.position.y=p0.y+Math.abs(Math.sin(k*Math.PI*3))*.6;}).then(()=>o.position.copy(p0));if(has('won','hooray','wow'))burst(o.getWorldPosition(new THREE.Vector3()).add(V(0,1,0)));return;}
  S.alive(o,true);};
/* a thinking kid with the things the question is about; cheers when you are right */
S.thinker=function(sc,st,set,o){o=o||{};const R=st.round||{};const txt=((R.q||'')+' '+(R.o||[]).join(' ')).toLowerCase().replace(/[^a-z' ]/g,' ').split(/\s+/);
  const names=[...new Set(txt.map(w=>ALIAS[w]||w).filter(w=>PICS[w]&&!['i','a','it','is','an','me','we'].includes(w)))].slice(0,3);
  const k=sc.kid(o.kid||0,-1.3,-2.45,{mode:'think',ry:.35,say:o.say||'Hmm…'});
  names.forEach((n,i)=>sc.prop(n,-.1+i*.95,-2.55,{label:n,ci:i,s:.85}));
  return {hold:1900,win(){sc.mode(k,'cheer');sc.say(k,o.yes||'Yes!');names.forEach((n,i)=>{const p=sc.find(n);if(p)sc.later(()=>S.alive(p,true),i*200);});},miss(){sc.mode(k,'no',900);sc.say(k,'Hmm, not that one…',1200);}};};
})();
/* ---------- ready-made acted scenes any lesson can name: set.scene = 'sun' | 'bike' | 'boat' ---------- */
(function(){const P=window.PM;if(!P||!P.STAGE)return;const S=P.STAGE,{A,tween}=P;
const pop=(o,s)=>{const s0=o.scale.clone();o.scale.setScalar(.01);return tween(.55,k=>{const f=k<.7?k/.7*1.15:1.15-(k-.7)/.3*.15;o.scale.set(s0.x*f,s0.y*f,s0.z*f);});};
P.SCENES=Object.assign(P.SCENES||{},{
 /* the sun pops up, the kid looks up, then shields his eyes: it is too bright! Right answer: sunglasses land on his face */
 sun(sc,st,set){const sun=sc.prop('sun',1.25,-2.85,{y:1.25,tap:false});pop(sun);const k=sc.kid(set.kid||0,-.9,-2.4,{mode:'walk',ry:.35});
   sc.later(()=>{sc.mode(k,'lookup');sc.say(k,'What a sunny day!',1600);},500);sc.later(()=>{if(!k.userData.done){sc.mode(k,'cover');sc.say(k,'Too bright! My eyes!');}},2300);
   return {win(){k.userData.done=true;sc.say(k,null);sc.wear(k,'sunglasses','face').then(()=>{sc.mode(k,'cheer');sc.say(k,'Now I can see!',2600);S.alive(sun,true);});return 3400;},
     miss(){sc.mode(k,'cover',1200);sc.say(k,'Ouch! Still too bright!',1500);}};},
 /* a bike pops up and the kid wants to ride: what keeps his head safe? Right answer: helmet on, and off he rides */
 bike(sc,st,set){const b=sc.prop('bicycle',.55,-2.45,{s:.85,tap:false});pop(b);const k=sc.kid(set.kid||2,-.6,-2.4,{mode:'point',ry:.6});
   sc.later(()=>{if(!k.userData.done)sc.say(k,'Let’s ride! What keeps my head safe?');},600);
   return {win(){k.userData.done=true;sc.say(k,null);sc.wear(k,'helmet','head').then(()=>{sc.mode(k,'cheer');sc.say(k,'Safe! Let’s go!',2200);sc.later(()=>{sc.mode(k,'walk');const x0=b.position.x;
       let px=x0;tween(2.6,t=>{b.position.x=x0+Math.sin(t*Math.PI*2)*.9;const dx=b.position.x-px;px=b.position.x;b.rotation.y=Math.cos(t*Math.PI*2)>=0?0:Math.PI;(b.userData.wheels||[]).forEach(w=>{w.rotation.z-=Math.abs(dx)*5.5;});k.position.set(b.position.x+(b.rotation.y?.08:-.08)*.85,.17,b.position.z);k.userData.ry=b.rotation.y?-Math.PI/2:Math.PI/2;}).then(()=>{k.position.set(-.6,0,-2.4);k.userData.ry=.6;b.position.set(x0,0,b.position.z);b.rotation.y=0;sc.mode(k,'cheer');});},900);});return 4600;},
     miss(){sc.mode(k,'no',900);sc.say(k,'That won’t protect my head!',1600);}};},
 /* a canoe on the water: the kid needs to float safely */
 boat(sc,st,set){sc.prop('water',.35,-2.45,{tap:false});const c=sc.prop('canoe',.55,-2.45,{tap:false});sc.tick((dt,tt)=>{c.position.y=Math.sin(tt*2)*.025;c.rotation.z=Math.sin(tt*1.6)*.04;});
   const k=sc.kid(set.kid||1,-.75,-1.9,{mode:'point',ry:.5});sc.later(()=>{if(!k.userData.done)sc.say(k,'A boat ride! What do I wear?');},400);
   return {win(){k.userData.done=true;sc.say(k,null);sc.dress(k,'lifejacket');sc.mode(k,'cheer');sc.say(k,'Now I can float safely!',2600);
       sc.later(()=>{sc.hop(k,.62,-2.45,.6,.7).then(()=>{k.position.y=.06;k.userData.ry=Math.PI/2;sc.mode(k,'idle');const p=c.userData.paddle;sc.tick((dt,tt)=>{c.position.x=.55+Math.sin(tt*.7)*.35;k.position.x=c.position.x+.07;if(p)p.rotation.x=Math.sin(tt*3)*.5;});});},900);return 3800;},
     miss(){sc.mode(k,'no',900);sc.say(k,'Will that help me float?',1600);}};}
});})();
