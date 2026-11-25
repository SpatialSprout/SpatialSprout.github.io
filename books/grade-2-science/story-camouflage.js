/* Pilot "living story": Lesson 9, Hide and Seek in Nature.
   Each sentence makes something happen: animals walk in and their colour really changes to match
   their home (a shader mixes the clay colour into snow / sand / grass), a hawk searches overhead,
   and at "camouflage" every animal is found with a ring, a sparkle and a label. Tap to hide again. */
(function(){
"use strict";
const P=window.PM;if(!P||!P.DIO||!P.SCN||!P.SCN.c09)return;
const D=P.DIO,{V,tween,burst,THREE,A}=P;
const TL=new THREE.TextureLoader();const tx=n=>{const t=TL.load('art/'+n+'.webp');t.anisotropy=8;return t;};
const ease=k=>k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2;
/* colour-match shader: mixes the picture toward a tint while keeping its light and dark */
function camo(mat){if(mat.userData.camo)return mat.userData.camo;const u={uMix:{value:0},uTint:{value:new THREE.Color('#ffffff')}};
  mat.onBeforeCompile=sh=>{sh.uniforms.uMix=u.uMix;sh.uniforms.uTint=u.uTint;sh.fragmentShader='uniform float uMix;uniform vec3 uTint;\n'+sh.fragmentShader.replace('#include <map_fragment>','#include <map_fragment>\n float lu=dot(diffuseColor.rgb,vec3(.3,.59,.11));diffuseColor.rgb=mix(diffuseColor.rgb,uTint*(.7+.55*lu),uMix);');};
  mat.needsUpdate=true;mat.userData.camo=u;return u;}
const art=o=>{const a=[];o.traverse(m=>{if(m.isMesh&&m.material&&m.material.map&&!Array.isArray(m.material)&&m.geometry&&m.geometry.type==='PlaneGeometry'&&m.renderOrder===6)a.push(m);});return a;};
function setMix(o,tint,v){art(o).forEach(m=>{const u=camo(m.material);if(tint)u.uTint.value.set(tint);u.uMix.value=v;});}
function blend(o,tint,to,dur){const a=art(o);if(!a.length)return Promise.resolve();const us=a.map(m=>camo(m.material));us.forEach(u=>u.uTint.value.set(tint));const from=us[0].uMix.value;o.userData.hid=to>.3;
  return tween(dur||1.2,k=>{us.forEach(u=>{u.uMix.value=from+(to-from)*ease(k);});});}
function walk(o,x,z,dur,steps){const p0=o.position.clone(),dx=x-p0.x;const piv=o.userData.piv;if(piv&&Math.abs(dx)>.02){const b=Math.abs(piv.scale.x);piv.scale.x=(dx>0?-1:1)*b;}
  return tween(dur,k=>{const e=ease(k);o.position.x=p0.x+(x-p0.x)*e;o.position.z=p0.z+(z-p0.z)*e;const h=Math.abs(Math.sin(k*Math.PI*steps));o.position.y=h*.07;const sq=.05*(1-h);o.scale.set(1+sq,1-sq,1);}).then(()=>{o.position.y=0;o.scale.set(1,1,1);});}
function ring(sc,x,z,col){const m=new THREE.Mesh(new THREE.TorusGeometry(.3,.025,8,36),new THREE.MeshBasicMaterial({color:col||'#ffd43b',transparent:true,opacity:.95,depthWrite:false}));m.rotation.x=Math.PI/2;m.position.set(x,.06,z);m.renderOrder=7;sc.g.add(m);
  tween(.9,k=>{m.scale.setScalar(.7+k*1.6);m.material.opacity=.95*(1-k);}).then(()=>{sc.g.remove(m);});}
function patch(sc,tn,x,z,w,d){const m=new THREE.Mesh(new THREE.PlaneGeometry(w,d),new THREE.MeshBasicMaterial({map:tx(tn)}));m.rotation.x=-Math.PI/2;m.position.set(x,.03,z);sc.g.add(m);return m;}
function deco(sc,n,x,z,s){const m=P.artProp(n,{s,bare:true,shadow:true});if(!m)return null;m.position.set(x,.03,z);sc.g.add(m);if(m.userData.tick)sc.tick((dt,t)=>m.userData.tick(t));return m;}
const P0=P.SCN.c09;
P0.steps[0]={scene:sc=>{sc.__sid='c09';D.base(sc,'#e9e2d6');
  const Z=-2.55;patch(sc,'f_snow',-1.4,Z,1.38,2.3);patch(sc,'f_sand',0,Z,1.38,2.3);patch(sc,'f_meadow',1.4,Z,1.38,2.3);
  /* scenery for each home */
  [['ice',-1.85,-3.3,.5],['snowflake',-.95,-3.35,.35],['ice',-1.0,-1.75,.3],['cactus',.45,-3.3,.65],['rock',-.45,-3.25,.45],['cactus',.5,-1.75,.4],['tree',1.85,-3.25,1.0],['plant',1.0,-3.3,.45],['flower',1.9,-1.7,.4]].forEach(a=>deco(sc,...a));
  sc.fx('sparkle',{x:0,z:-2.6,w:4,d:2,h:1.2,y:.1});
  const mk=(n,x,z,s)=>{const p=sc.prop(n,x,z,{s,label:false,bare:true,tap:false,y:0});p.visible=false;return p;};
  const fox=mk('fox',-2.1,-1.9,.5),camel=mk('camel',-.9,-1.9,.62),tiger=mk('tiger',2.15,-1.9,.52),leaf=mk('leaf',1.15,-1.8,.42),cat=mk('caterpillar',.9,-1.5,.22);
  const eagle=sc.prop('eagle',-1.8,-2.4,{s:.34,label:false,bare:true,tap:false,y:.95});eagle.visible=false;
  const homes={fox:['#f3f8fc',.92],camel:['#dcb878',.55],tiger:['#7fa83e',.6],cat:['#79c142',.85]};
  const all=[['fox',fox,-1.4],['camel',camel,0],['tiger',tiger,1.4],['cat',cat,1.15]];
  const done={};let focus=null,focusT=0;const cur=eagle.position.clone();let dirx=1;
  sc.tick((dt,t)=>{if(!eagle.visible)return;const tgt=focus?V(focus.x,.8,focus.z+.25):V(1.75*Math.sin(t*.38),.95+.1*Math.sin(t*1.5),-2.4+.55*Math.cos(t*.38));cur.lerp(tgt,Math.min(1,dt*(focus?2.2:1.2)));eagle.position.copy(cur);
    const vx=tgt.x-cur.x;if(Math.abs(vx)>.01)dirx=vx>0?-1:1;const pv=eagle.userData.piv;if(pv)pv.scale.x=dirx*Math.abs(pv.scale.x);eagle.rotation.z=focus?Math.sin(t*5)*.12:Math.sin(t*1.2)*.05;});
  const look=(x,z,ms,q)=>{focus={x,z};if(q)sc.say(eagle,q,Math.min(ms,2200));sc.later(()=>{focus=null;},ms);};
  const hide=(k,o,x)=>{const [c,m]=homes[k];done[k]=true;blend(o,c,m,1.4);ring(sc,x,-2.6,'#ffffff');};
  const lab=(t,x,col)=>{const c=D.card(sc,t,x,-3.5,{h:.17,col});c.visible=true;D.grow(c);return c;};
  D.at(sc,'hide and seek',()=>{eagle.visible=true;D.grow(eagle);sc.say(eagle,'I spy…',2200);});
  /* arctic fox */
  D.at(sc,'arctic fox',()=>{lab('Arctic',-1.4,'#1c7ed6');fox.visible=true;D.grow(fox);sc.fx('snow',{x:-1.4,z:-2.5,w:1.3,d:2,h:1.4});walk(fox,-1.4,-2.55,1.8,5);});
  D.at(sc,'invisible',()=>{hide('fox',fox,-1.4);look(-1.4,-2.6,3200,'Where did it go?');});
  /* camel */
  D.at(sc,'camel',()=>{lab('Desert',0,'#e8590c');camel.visible=true;D.grow(camel);walk(camel,0,-2.55,2,6);});
  D.at(sc,'dunes',()=>{hide('camel',camel,0);look(0,-2.6,3000,'Just sand…');});
  /* tiger */
  D.at(sc,'tiger',()=>{lab('Jungle',1.4,'#2b8a3e');tiger.visible=true;D.grow(tiger);walk(tiger,1.4,-2.65,1.8,5);});
  D.at(sc,'tall grass',()=>{hide('tiger',tiger,1.4);for(let i=0;i<6;i++){const g=P.artProp('plant',{s:.42,bare:true,shadow:true});g.position.set(.95+i*.19,.03,-2.2+(i%2)*.18);g.visible=false;sc.g.add(g);sc.later(()=>{D.grow(g);},120*i);sc.tick((dt,t)=>{g.rotation.z=Math.sin(t*1.6+i)*.07;});}});
  D.at(sc,'pounce',()=>{look(1.4,-2.6,2200);sc.later(()=>{setMix(tiger,null,.2);D.arc(tiger,1.4,0,-1.95,.45,.7).then(()=>{burst(V(1.4,.3,-1.9));sc.say(tiger,'Grrr!',1200);sc.later(()=>{walk(tiger,1.4,-2.65,.8,2).then(()=>blend(tiger,homes.tiger[0],homes.tiger[1],.8));},900);});},500);
    sc.say(eagle,'Whoa!',1000);});
  /* caterpillar */
  D.at(sc,'caterpillar',()=>{leaf.visible=true;D.grow(leaf);cat.visible=true;D.grow(cat);sc.later(()=>walk(cat,1.15,-1.82,1.8,7),500);});
  D.at(sc,'green leaf',()=>{hide('cat',cat,1.15);});
  D.at(sc,'birds cannot see',()=>{look(1.15,-1.8,3600,'Nothing here…');});
  /* the reveal */
  D.at(sc,'camouflage',()=>{focus={x:0,z:-2.4};all.forEach(([k,o,x],i)=>{sc.later(()=>{blend(o,homes[k][0],0,.6);ring(sc,x,-2.4+(k==='cat'?.6:0),'#ffd43b');burst(V(x,.4,-2.4));sc.say(o,'Found you!',1500);},i*700);});
    sc.later(()=>{focus=null;const c=D.card(sc,'camouflage',0,-1.7,{h:.3,col:'#5f3dc4'});c.visible=true;D.grow(c);sc.say(eagle,'Clever!',1600);P.CAMO_DONE=true;},3300);
    /* now the child can play: tap an animal to make it hide or show again */
    sc.later(()=>{all.forEach(([k,o,x])=>{if(!A||!A.drag)return;A.drag(o,{tap:()=>{A.pop();const hidden=!!o.userData.hid;if(hidden){blend(o,homes[k][0],0,.5);ring(sc,x,-2.5,'#ffd43b');}else{blend(o,homes[k][0],homes[k][1],.9);ring(sc,x,-2.5,'#ffffff');}}});});},3600);});
  P.CAMO=sc;
  return {};}};
})();
