/* Action scenes for lessons 1-5: every cue on a story / theory page plays a little scenario
   (animals walk, hop, swim or fly in, then eat, hide, grow, sleep, migrate ...) on top of the clay picture. */
(function(){
"use strict";
const P=window.PM;if(!P||!P.CLAY||!P.PIC)return;
const {V,tween,burst,THREE,PIC}=P;
const W=PIC.W,H=PIC.H;
const ease=k=>k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2;
/* which way each picture faces: 1 right, -1 left, 0 front (never flipped) */
const FACE={whale:1,dog:1,duck:-1,cow:-1,fish:-1,turtle:-1,horse:-1,elephant:-1,shark:-1,squirrel:1,wolf:-1,ptarmigan:-1,caribou:1,salmon:-1,goose:1,hummingbird:-1,swan:1,parrot:0};
const MV={butterfly:'fly',hummingbird:'fly',bee:'fly',goose:'fly',owl:'fly',eagle:'fly',parrot:'fly',fish:'swim',salmon:'swim',whale:'swim',shark:'swim',duck:'swim',swan:'swim',turtle:'swim',
 frog:'hop',rabbit:'hop',toad:'hop',squirrel:'hop',spider:'walk',bat:'fly',garter:'slither',snake:'slither'};
const SIG={frog:'splash',snake:'sparkle',parrot:'note',whale:'drop',dog:'heart',owl:'sparkle',fish:'bubble',turtle:'dust',cow:'heart',monkey:'sparkle',lion:'dust',horse:'dust',elephant:'drop',
 beaver:'dust',shark:'bubble',rabbit:'dust',spider:'sparkle',bee:'note',fox:'sparkle',bat:'sparkle',eagle:'sparkle',swan:'bubble',robin:'note',toad:'dust',child:'heart',butterfly:'sparkle',
 caribou:'dust',salmon:'bubble',goose:'note',hummingbird:'sparkle',garter:'dust',wolf:'sparkle',bear:'sparkle',ptarmigan:'sparkle',squirrel:'dust'};

/* ---------- small particles that live inside the picture group ---------- */
const TX={};
const glyph=(ch,col)=>{const k=ch+col;if(TX[k])return TX[k];const c=document.createElement('canvas');c.width=c.height=96;const x=c.getContext('2d');
  if(ch==='o'){const g=x.createRadialGradient(48,48,2,48,48,44);g.addColorStop(0,col);g.addColorStop(.6,col);g.addColorStop(1,'rgba(255,255,255,0)');x.fillStyle=g;x.beginPath();x.arc(48,48,44,0,7);x.fill();}
  else if(ch==='\u2726'){x.fillStyle=col;x.strokeStyle='#fff';x.lineWidth=7;x.beginPath();for(let i=0;i<8;i++){const a=i*Math.PI/4-Math.PI/2,r=i%2?12:42;x.lineTo(48+Math.cos(a)*r,48+Math.sin(a)*r);}x.closePath();x.stroke();x.fill();}
  else if(ch==='\u2665'){x.fillStyle=col;x.strokeStyle='#fff';x.lineWidth=7;x.beginPath();x.moveTo(48,82);x.bezierCurveTo(6,52,14,14,48,34);x.bezierCurveTo(82,14,90,52,48,82);x.closePath();x.stroke();x.fill();}
  else if(ch==='\u266A'){x.fillStyle=col;x.strokeStyle='#fff';x.lineWidth=7;x.beginPath();x.ellipse(34,70,17,12,-.4,0,7);x.stroke();x.fill();x.fillRect(46,16,9,54);x.beginPath();x.moveTo(52,16);x.quadraticCurveTo(84,26,72,56);x.quadraticCurveTo(76,34,52,34);x.fill();}
  else{x.font='bold 70px sans-serif';x.textAlign='center';x.textBaseline='middle';x.lineWidth=9;x.strokeStyle='#fff';x.strokeText(ch,48,52);x.fillStyle=col;x.fillText(ch,48,52);}
  return TX[k]=new THREE.CanvasTexture(c);};
const KIND={sparkle:['✦','#ffb703',.20,.7,.1],snow:['o','#ffffff',.09,-1.4,0],bubble:['o','rgba(160,215,255,.85)',.1,.8,0],heart:['♥','#e63946',.2,.7,0],
 z:['Z','#4263eb',.22,.6,0],note:['♪','#7048e8',.2,.7,0],dust:['o','#d9c7a3',.14,.2,0],splash:['o','#74c0fc',.1,.5,.9],drop:['o','#74c0fc',.12,1.3,1.2],fluff:['o','#ffffff',.17,.25,.1],leaf:['o','#74b816',.1,-.4,0]};
function mk(sc,X,n){
  const g=n.g;
  const fx=(kind,x,y,cnt,o)=>{o=o||{};const K=KIND[kind]||KIND.sparkle,T=o.t||1.5,ps=[];
    for(let i=0;i<cnt;i++){const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:glyph(K[0],K[1]),transparent:true,depthTest:false,opacity:0}));sp.renderOrder=12;g.add(sp);
      ps.push({sp,d:Math.random()*(o.spread==null?.6:o.spread)*T,x:x+(Math.random()-.5)*(o.w==null?.35:o.w),y:y+(Math.random()-.5)*(o.hh==null?.12:o.hh),
       vx:(Math.random()-.5)*(o.vx==null?K[4]*2:o.vx),vy:(o.vy==null?K[3]:o.vy)*(.8+Math.random()*.4),gr:kind==='splash'||kind==='drop'?-2.2:0,s:K[2]*(o.sz||1)*(.7+Math.random()*.6)});}
    const tot=T*1.7;
    return tween(tot,e=>{const t=e*tot;ps.forEach(p=>{const k=(t-p.d)/T;if(k<0||k>1){p.sp.material.opacity=0;return;}
      p.sp.position.set(p.x+p.vx*k,p.y+p.vy*k*T*.5+p.gr*k*k*T*.5,.95);p.sp.scale.setScalar(p.s*(kind==='z'?.6+k*.9:kind==='fluff'?.6+k*.6:1));p.sp.material.opacity=Math.min(1,k*8)*(1-k*k);});}).then(()=>ps.forEach(p=>{g.remove(p.sp);p.sp.material.dispose();}));};
  return {fx};}

/* ---------- the actor kit for one picture ---------- */
function kit(sc,X,k,n,alive){
  const h=n.hero,u=h.userData,g=n.g,f=mk(sc,X,n).fx,fc=FACE[k]||0,mv=MV[k]||'walk';
  const st={x:u.hx,y:u.hy,s:1,sx:1,sy:1,rz:0,fl:1,op:1,car:null};const home={x:u.hx,y:u.hy};
  const junk=[];
  const ap=()=>{h.position.set(st.x,st.y,.55);h.scale.set(st.s*st.sx*st.fl,st.s*st.sy,1);h.rotation.z=st.rz;h.material.opacity=st.op;
    if(n.shadow){n.shadow.position.x=st.x;n.shadow.scale.x=u.w*.9*st.s;n.shadow.material.opacity=n.shadow.userData.base*st.op/(1+Math.max(0,st.y-home.y)*1.3);}
    if(st.car){const c=st.car;c.o.position.set(st.x+c.dx*st.fl*st.s,st.y+c.dy*st.s,.62);}};
  const T=async(sec,fn)=>{await tween(sec,fn);if(!alive())throw 0;};
  const A={k,n,h,u,g,W,H,st,home,fx:f,alive,ap,T,hw:u.w,hh:u.h};
  A.wait=sec=>T(sec,()=>{});
  A.face=dx=>{if(fc&&Math.abs(dx)>.02)st.fl=(dx>0?1:-1)*fc;};
  A.put=(x,y)=>{st.x=x;st.y=y;ap();};
  A.go=(tx,ty,sec,o)=>{o=o||{};const x0=st.x,y0=st.y,dx=tx-x0;A.face(dx);
    return T(sec,e=>{const q=o.lin?e:ease(e);st.x=x0+dx*q;st.y=y0+(ty-y0)*q+(o.hops?Math.abs(Math.sin(e*Math.PI*o.hops))*(o.arc||.15):(o.arc?Math.sin(e*Math.PI)*o.arc:0));
      if(o.wob)st.rz=Math.sin(e*Math.PI*2*(o.hops||4))*o.wob;if(o.squash){const b=Math.abs(Math.sin(e*Math.PI*(o.hops||4)));st.sy=1+.05*(1-b);st.sx=1-.03*(1-b);}ap();});};
  /* move in this animal's own style */
  A.move=(tx,ty,sec)=>{const d=Math.abs(tx-st.x);const hp=Math.max(2,Math.round(d*(mv==='hop'?1.5:2.6)));
    if(mv==='hop')return A.go(tx,ty,sec,{hops:hp,arc:.24,lin:1,squash:1});
    if(mv==='fly')return A.go(tx,ty,sec,{hops:Math.max(1,Math.round(d*.8)),arc:.14,wob:.07});
    if(mv==='swim')return A.go(tx,ty,sec,{arc:.08,wob:.03,hops:3});
    if(mv==='slither')return A.go(tx,ty,sec,{wob:.05,hops:Math.max(3,hp)});
    return A.go(tx,ty,sec,{hops:hp,arc:.045,wob:.035,lin:1,squash:1});};
  A.edge=s=>(s||-1)*(W/2-A.hw*.5-.12);
  A.enter=async(s,sec)=>{st.x=A.edge(s);st.op=0;ap();h.userData.busy=1;const x1=home.x;A.face(x1-st.x);
    tween(.35,e=>{st.op=e;ap();});await A.move(x1,home.y,sec||1.6);st.op=1;ap();};
  A.pop=async()=>{await T(.5,e=>{const j=Math.sin(e*Math.PI);st.sy=1+j*.1;st.sx=1-j*.05;st.y=home.y+j*.25;ap();});st.sx=st.sy=1;st.y=home.y;ap();};
  A.wag=(sec,amp,fr)=>T(sec,e=>{st.rz=Math.sin(e*Math.PI*2*(fr||5))*(amp||.06)*(1-e*.3);ap();}).then(()=>{st.rz=0;ap();});
  A.shiver=sec=>T(sec,e=>{st.x=home.x+Math.sin(e*90)*.025;st.rz=Math.sin(e*70)*.03;ap();}).then(()=>{st.x=home.x;st.rz=0;ap();});
  A.tint=(c0,c1,sec)=>{const a=new THREE.Color(c0),b=new THREE.Color(c1);return tween(sec,e=>{h.material.color.copy(a).lerp(b,ease(e));});};
  A.label=t=>X.setLab(t);
  A.say=(t,ms)=>{try{sc.say(h,t,ms||1500);}catch(e){}};
  A.prop=(name,x,y,s,flip)=>{const o=P.artProp(name,{s:s||.4,bare:true});if(!o)return null;o.position.set(x,y,.6);if(flip)o.scale.x=-1;g.add(o);junk.push(o);return o;};
  A.tween=(sec,fn)=>tween(sec,fn);
  A.carry=(o,dx,dy)=>{st.car=o?{o,dx,dy}:null;};
  A.drop=o=>{if(!o)return;g.remove(o);};
  A.flyProp=(o,x,y,sec,arc)=>{const x0=o.position.x,y0=o.position.y;return T(sec,e=>{const q=ease(e);o.position.set(x0+(x-x0)*q,y0+(y-y0)*q+Math.sin(e*Math.PI)*(arc||0),.62);});};
  A.shrink=(o,sec,to)=>{const s0=o.scale.x||1;return T(sec,e=>{o.scale.setScalar(Math.max(.001,(s0)*(1-(1-(to||0))*ease(e))));});};
  A.disc=(x,y,rx,ry,col)=>{const m=new THREE.Mesh(new THREE.CircleGeometry(.5,32),new THREE.MeshBasicMaterial({color:col||'#3b2a1a',transparent:true,opacity:.9,depthWrite:false}));m.scale.set(rx,ry,1);m.position.set(x,y,.12);m.renderOrder=2;g.add(m);junk.push(m);return m;};
  A.snow=(sec,cnt)=>f('snow',0,H+.1,cnt||46,{w:W,vy:-1.9,t:sec,spread:1,vx:.5,hh:.2});
  A.ghost=()=>{const m=new THREE.Mesh(h.geometry,h.material.clone());m.position.copy(h.position);m.scale.copy(h.scale);m.renderOrder=3;g.add(m);junk.push(m);return m;};
  A.tag=(txt,x,y,col)=>{const c=document.createElement('canvas');c.width=256;c.height=80;const x2=c.getContext('2d');x2.font='bold 46px sans-serif';x2.textAlign='center';x2.textBaseline='middle';x2.lineWidth=10;x2.strokeStyle='#fff';x2.strokeText(txt,128,42);x2.fillStyle=col||'#1b2236';x2.fillText(txt,128,42);
    const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:new THREE.CanvasTexture(c),transparent:true,depthTest:false}));sp.scale.set(.8,.25,1);sp.position.set(x,y,.95);sp.renderOrder=13;g.add(sp);junk.push(sp);return sp;};
  A.clean=()=>{junk.forEach(o=>g.remove(o));junk.length=0;st.car=null;};
  /* crossing the page and coming home (for a "this is how it moves" beat) */
  A.cross=async(sec)=>{const s=home.x>0?-1:1;await A.move(A.edge(-s)*.9,home.y+(mv==='fly'?.5:0),sec||2);await A.move(A.edge(s)*.9,home.y+(mv==='fly'?.3:0),(sec||2)*1.2);await A.move(home.x,home.y,sec||2);};
  A.signature=async()=>{const hx=st.x,top=st.y+u.h*.8;const kd=SIG[k]||'sparkle';
    if(kd==='drop')f('drop',hx+(fc>0?u.w*.1:-u.w*.1),top,10,{w:.1,t:1.3,vy:1.8});else if(kd==='splash')f('splash',hx,st.y+.05,12,{w:u.w*.7,t:1.0});else f(kd,hx,top,8,{w:u.w*.8,t:1.6});
    await A.pop();};
  A.done=()=>{u.hx=st.x;u.hy=home.y;u.fl=st.fl;u.sc=st.s;st.rz=0;ap();u.busy=0;h.userData.act=0;};
  return A;}

/* ---------- the scripted scenes ---------- */
const S={};
const GROUND=(A)=>A.home.y;
/* lesson 4: how animals get ready for winter */
S['c04:squirrel']=async A=>{const {W,H}=A,y=A.home.y,px=W*.13;
  const pile=[A.prop('acorn',px,y+.1,.3)].filter(Boolean);
  A.label('Collects nuts');A.st.x=-W*.36;A.st.op=0;A.ap();A.tween(.3,e=>{A.st.op=e;A.ap();});
  await A.go(px-.34,y,1.7,{hops:4,arc:.22,lin:1,squash:1});
  await A.pop();const a=pile[0];if(a){A.carry(a,.05+A.hw*.2,A.hh*.5);}A.say('Yum!',900);
  await A.wait(.3);A.label('Hides it for winter');
  await A.go(-W*.3,y,2.0,{hops:5,arc:.2,lin:1,squash:1});
  for(let i=0;i<3;i++){await A.T(.28,e=>{A.st.y=y-Math.sin(e*Math.PI)*.05;A.st.sy=1-Math.sin(e*Math.PI)*.1;A.ap();});A.fx('dust',A.st.x+.12,y+.05,5,{w:.2,t:.7,vy:.5});}
  A.st.sy=1;if(a){A.carry(null);const ax=A.st.x+.25;a.position.set(ax,y,.62);await A.T(.4,e=>{a.position.y=y-.05*e;a.scale.setScalar(1-e*.95);});A.drop(a);}
  A.disc(A.st.x+.25,y+.02,.35,.1,'#7a5a3a');A.fx('sparkle',A.st.x+.25,y+.2,8,{t:1});A.label('Nut hidden!');A.say('Safe!',1200);await A.wait(1.2);
  await A.go(A.home.x,y,1.4,{hops:3,arc:.2,lin:1,squash:1});};
S['c04:wolf']=async A=>{const {W,H}=A,y=A.home.y;
  A.label('Summer: thin coat');A.st.sx=.7;A.st.sy=.9;A.st.op=0;A.ap();h_col(A,'#aab3c2');A.tween(.4,e=>{A.st.op=e;A.ap();});
  A.snow(3.6,40);A.say('Brrr!',1200);await A.shiver(2.2);
  A.label('Winter: thick fur!');A.fx('fluff',A.st.x,y+A.hh*.4,16,{w:A.hw*.8,hh:A.hh*.4,t:1.2,vy:.3,sz:1.3});A.fx('sparkle',A.st.x,y+A.hh*.6,10,{w:A.hw,t:1.2});
  const t0=A.tint('#aab3c2','#ffffff',.9);await A.T(.9,e=>{const q=ease(e);A.st.sx=.7+.44*q+Math.sin(e*Math.PI)*.1;A.st.sy=.9+.2*q+Math.sin(e*Math.PI)*.1;A.ap();});
  A.st.sx=A.st.sy=1.1;A.ap();A.say('Warm!',1200);await A.wag(1.2,.04,3);
  A.tag('before',-W*.36,y+.62,'#868e96');const g1=A.ghost();g1.material.color.set('#aab3c2');g1.scale.set(-.5*.7,.5*.9,1);g1.position.set(-W*.36,y,.5);A.tag('after',A.st.x,y+A.hh*1.15,'#e8590c');
  await A.wait(1.4);};
S['c04:bear']=async A=>{const {W,H}=A,y=A.home.y,h=A.h;
  A.label('It is cold!');h.material.opacity=0;A.st.op=0;A.ap();A.snow(7,60);
  const b=A.prop('bear',W*.42,y+.15,1.05);
  if(b){A.say;await A.T(2.4,e=>{b.position.set(W*.42-(W*.42-.2)*ease(e),y+.15+Math.abs(Math.sin(e*Math.PI*6))*.05,.62);b.rotation.z=Math.sin(e*Math.PI*6)*.05;});
   A.fx('z',0,y+.9,1,{t:.1});A.label('Goes inside');
   await A.T(1.0,e=>{b.position.x=.2-.15*e;const s=1-.55*ease(e);b.scale.setScalar(s);b.position.y=y+.15+.35*e;b.children.forEach(c=>{});});A.drop(b);}
  A.label('Hibernates');await A.T(.8,e=>{A.st.op=e;A.ap();});
  for(let i=0;i<3;i++){A.fx('z',A.hw*.05+A.home.x*.0,y+A.hh*.55,3,{w:.25,t:2.2,vy:.5});await A.wait(1.0);}
  await A.wait(1.2);};
S['c04:fish']=async A=>{const y=A.home.y,W=A.W;A.label('Swims fast...');A.st.op=0;A.ap();A.tween(.3,e=>{A.st.op=e;A.ap();});A.st.x=A.edge(1);A.ap();
  await A.go(A.edge(-1),y+.15,1.0,{lin:1,wob:.04,hops:6});A.fx('bubble',A.st.x,y,10,{w:.5,t:1});A.label('Cold water: slows down');
  await A.go(A.home.x,y,3.4,{wob:.015,hops:2});A.fx('bubble',A.st.x,y+.3,8,{w:.2,t:2});A.say('So slow...',1500);await A.wait(1.2);};
S['c04:ptarmigan']=async A=>{const y=A.home.y;A.label('Summer feathers');h_col(A,'#a98a63');A.st.op=0;A.ap();A.tween(.4,e=>{A.st.op=e;A.ap();});A.snow(4.5,44);
  await A.wait(1.6);A.label('Winter: white + feathery feet');A.fx('fluff',A.st.x,y+.05,14,{w:A.hw*.6,hh:.08,t:1.2,vy:.2,sz:1.4});A.fx('sparkle',A.st.x,y+A.hh*.5,10,{w:A.hw,t:1.2});
  await A.tint('#a98a63','#ffffff',1.2);A.say('Snow boots!',1400);await A.T(.9,e=>{A.st.sy=1+Math.sin(e*Math.PI)*.1;A.ap();});A.st.sy=1;await A.wait(1.2);};
function h_col(A,c){A.h.material.color.set(c);}

/* lesson 2: how animals eat and move */
const eat=(prop,dx,s)=>async A=>{const y=A.home.y,x=A.home.x+dx;A.st.x=A.edge(dx>0?-1:1);A.st.op=0;A.ap();A.tween(.3,e=>{A.st.op=e;A.ap();});
  const p=A.prop(prop,x+.1*Math.sign(dx),y,s);await A.move(x-Math.sign(dx)*A.hw*.45,y,1.6);
  for(let i=0;i<3;i++){await A.T(.3,e=>{const j=Math.sin(e*Math.PI);A.st.sy=1-j*.07;A.st.x+=Math.sign(dx)*j*.004;A.ap();});A.fx('dust',x,y+.1,4,{w:.15,t:.6,vy:.4});if(p)p.scale.setScalar(1-(i+1)*.3);}
  if(p)A.drop(p);A.fx('sparkle',A.st.x,y+A.hh,8,{t:1});A.say('Yum!',1200);await A.wait(.9);await A.move(A.home.x,y,1.0);};
S['c02:lion']=eat('meat',.9,.4);S['c02:horse']=eat('hay',-.9,.45);S['c02:beaver']=eat('wood',.9,.4);S['c02:shark']=eat('fish',-1,.4);S['c02:elephant']=async A=>{await A.enter(-1,1.6);const y=A.st.y;A.label('Trunk');A.fx('drop',A.st.x-A.hw*.35,y+A.hh*.6,14,{w:.1,t:1.4,vy:1.8});await A.T(.8,e=>{A.st.rz=-Math.sin(e*Math.PI)*.05;A.ap();});await A.wait(.8);};
S['c02:frog']=async A=>{const y=A.home.y;await A.enter(1,1.2);const fl=A.prop('ant',A.home.x-.9,y+.9,.18);
  if(fl){await A.T(1.2,e=>{fl.position.set(A.home.x-.9+.1*Math.sin(e*12),y+.9-.2*Math.sin(e*9),.62);});
   await A.T(.35,e=>{fl.position.x=A.home.x-.9+.8*e;fl.position.y=y+.7-.35*e;A.st.sx=1+.12*Math.sin(e*Math.PI);A.ap();});A.drop(fl);A.fx('sparkle',A.st.x,y+A.hh*.7,8,{t:.9});A.say('Sticky tongue!',1400);}
  A.st.sx=1;await A.wait(.8);};
/* lesson 3: homes */
S['c03:rabbit']=async A=>{const y=A.home.y,hx=W*.17;await A.enter(-1,1.5);
  A.label('Burrow');await A.go(hx-.1,y,1.3,{hops:3,arc:.22,lin:1,squash:1});await A.T(.6,e=>{A.st.s=1-e*.9;A.st.y=y-.15*e;A.st.op=1-e;A.ap();});
  A.fx('dust',hx,y+.1,8,{w:.4,t:.8});await A.wait(.9);A.st.op=0;await A.T(.5,e=>{A.st.op=e;A.st.s=.1+.9*e;A.st.y=y;A.ap();});A.st.s=1;A.ap();A.say('Safe and cosy!',1400);await A.wait(.8);};
S['c03:beaver']=async A=>{const y=A.home.y,bx=A.home.x+1.2;A.label('Builds a lodge');await A.enter(-1,1.4);
  const logs=[0,1,2].map(i=>A.prop('wood',bx+(i-1)*.22,y+(i===1?.16:0),.3)).filter(Boolean);logs.forEach(o=>o.visible=false);
  for(let i=0;i<3;i++){const lg=A.prop('wood',A.home.x-1.0,y,.3);A.st.x<bx&&await A.go(A.home.x-1.0+.2,y,.5,{hops:2,arc:.04,lin:1});if(lg)A.carry(lg,.1,A.hh*.35);await A.go(bx-.5,y,.9,{hops:3,arc:.04,lin:1});
    A.carry(null);if(lg)A.drop(lg);logs[i].visible=true;A.fx('dust',bx+(i-1)*.22,y+.1,5,{w:.2,t:.6});await A.go(A.home.x-.6,y,.6,{hops:2,arc:.04,lin:1});}
  A.say('Lodge!',1200);await A.wait(.8);};
S['c03:spider']=async A=>{const y=A.home.y,top=H;A.label('Spins a web');const hx=A.home.x,cy=y+A.hh*.9;A.st.op=1;A.st.y=top-.2;A.ap();
  const th=new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(hx,top,.5),new THREE.Vector3(hx,top-.2,.5)]),new THREE.LineBasicMaterial({color:'#ffffff'}));A.g.add(th);
  await A.T(1.2,e=>{const yy=top-.2-(top-.2-y)*ease(e);A.st.y=yy;A.ap();th.geometry.setFromPoints([new THREE.Vector3(hx,top,.5),new THREE.Vector3(hx,yy+A.hh,.5)]);});
  A.g.remove(th);const web=new THREE.Group();web.position.set(hx,cy,.45);A.g.add(web);const lm=new THREE.LineBasicMaterial({color:'#ffffff',transparent:true,opacity:.95});
  const R=A.hw*1.3;for(let i=0;i<8;i++){const a=i*Math.PI/4;web.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0,0,0),new THREE.Vector3(Math.cos(a)*R,Math.sin(a)*R,0)]),lm));}
  for(let r=1;r<=3;r++){const pts=[];for(let i=0;i<=8;i++){const a=i*Math.PI/4;pts.push(new THREE.Vector3(Math.cos(a)*R*r/3,Math.sin(a)*R*r/3,0));}web.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts),lm));}
  web.scale.setScalar(.01);await A.T(1.4,e=>{web.scale.setScalar(.01+.99*ease(e));});A.fx('sparkle',hx,cy,10,{w:R,hh:R,t:1});await A.wait(1.2);A.g.remove(web);A.put(A.home.x,A.home.y);};
S['c03:bee']=async A=>{const y=A.home.y,x=A.home.x;A.label('Hive');const bs=[0,1,2].map(i=>A.prop('bee',x+1.2,y+.9,.22)).filter(Boolean);
  await A.T(3.2,e=>{bs.forEach((b,i)=>{const a=e*Math.PI*4+i*2.1,r=.7+.15*i;b.position.set(x+Math.cos(a)*r,y+A.hh*.6+Math.sin(a*1.3)*.35+Math.sin(e*60+i)*.02,.62);});});
  await A.T(.8,e=>{bs.forEach(b=>{b.position.x+=(x-b.position.x)*e*.3;b.position.y+=(y+.2-b.position.y)*e*.3;b.scale.setScalar(1-e*.9);});});bs.forEach(b=>A.drop(b));A.fx('note',x,y+A.hh,5,{t:1});await A.wait(.8);};
S['c03:robin']=async A=>{const y=A.home.y,x=A.home.x;A.label('Builds a nest');A.st.op=0;A.ap();
  for(let i=0;i<4;i++){const sx=i%2?W*.45:-W*.45;const s=A.prop('stick',sx,y+1.4,.3);if(s)await A.flyProp(s,x+(i-1.5)*.15,y+.2,.7,.5),A.drop(s);}
  await A.T(.7,e=>{A.st.op=e;A.st.s=.4+.6*e;A.ap();});A.st.s=1;A.ap();const eg=A.prop('egg',x+A.hw*.25,y+.6,.2);if(eg){await A.T(.5,e=>{eg.position.y=y+.6-.35*e;});}
  A.fx('note',x,y+A.hh,6,{t:1.4});A.say('Tweet!',1200);await A.wait(1);if(eg)A.drop(eg);};
S['c03:fox']=async A=>{const y=A.home.y;A.label('Den');A.st.sy=.05;A.st.op=1;A.ap();await A.T(.9,e=>{A.st.sy=.05+.95*ease(e);A.ap();});A.fx('sparkle',A.st.x,y+A.hh,8,{t:1});await A.wait(.6);
  await A.T(.5,e=>{A.st.sy=1-.1*Math.sin(e*Math.PI);A.ap();});A.st.sy=1;await A.wait(.6);};
S['c03:bat']=async A=>{const y=A.home.y;A.label('Roost');A.st.y=y+1.6;A.st.op=1;A.ap();await A.T(1.1,e=>{A.st.y=y+1.6*(1-ease(e));A.st.rz=Math.sin(e*18)*.1;A.ap();});
  for(let i=0;i<2;i++)await A.T(1.2,e=>{A.st.rz=Math.sin(e*Math.PI*2)*.1;A.ap();});A.st.rz=0;await A.wait(.4);};
/* lesson 5: migration (cross the picture, leaving a trail) */
const trip=(trail,fly)=>async A=>{const y=A.home.y;const yy=y+(fly?.6:0);A.st.x=A.edge(-1);A.st.y=yy;A.st.op=0;A.ap();A.tween(.3,e=>{A.st.op=e;A.ap();});
  const leg=async(x,sec)=>{const t=A.fx(trail,A.st.x,A.st.y+A.hh*.4,1,{t:.1});await A.go(x,fly?yy+.25:y,sec,{hops:Math.max(3,Math.round(sec*2)),arc:fly?.2:.05,wob:.04,lin:1});};
  const iv=setInterval(()=>{if(!A.alive()){clearInterval(iv);return;}A.fx(trail,A.st.x,A.st.y+A.hh*.35,2,{w:.1,t:.9,vy:.1});},260);
  await leg(A.edge(1),4.2);clearInterval(iv);await A.go(A.home.x,y,1.4,{hops:3,arc:.05,wob:.03});};
S['c05:butterfly']=trip('sparkle',true);S['c05:caribou']=trip('dust',false);S['c05:whale']=async A=>{const y=A.home.y;A.st.x=A.edge(-1);A.st.op=0;A.ap();A.tween(.3,e=>{A.st.op=e;A.ap();});
  const iv=setInterval(()=>{if(!A.alive()){clearInterval(iv);return;}A.fx('bubble',A.st.x,A.st.y+A.hh*.3,3,{w:.2,t:.9});},300);const sp=setInterval(()=>{if(!A.alive()){clearInterval(sp);return;}A.fx('drop',A.st.x+A.hw*.1,A.st.y+A.hh*.9,8,{w:.1,t:1.1,vy:1.6});},1700);
  await A.go(A.edge(1),y,4.2,{wob:.03,hops:3,lin:1});clearInterval(iv);clearInterval(sp);await A.go(A.home.x,y,1.4,{wob:.03,hops:2});};
S['c05:salmon']=async A=>{const y=A.home.y;A.st.x=A.edge(1);A.st.op=0;A.ap();A.tween(.3,e=>{A.st.op=e;A.ap();});
  for(let i=0;i<3;i++){await A.go(A.st.x-1.1,y+.05,.9,{hops:1,arc:.6,wob:.12,lin:1});A.fx('splash',A.st.x,y+.05,12,{w:.4,t:.9});}
  await A.go(A.home.x,y,.9,{hops:1,arc:.2,lin:1});A.say('Home to spawn!',1500);await A.wait(.8);};
S['c05:goose']=async A=>{const y=A.home.y;const cl=[0,1,2,3].map(i=>{const m=A.ghost();return m;});cl.forEach(m=>{m.material.opacity=0;});
  A.st.x=A.edge(-1);A.st.y=y+.7;A.st.op=0;A.ap();A.tween(.3,e=>{A.st.op=e;A.ap();});
  await A.T(4.4,e=>{const q=ease(e);A.st.x=A.edge(-1)+(A.edge(1)-A.edge(-1))*q;A.st.y=y+.7+Math.sin(e*Math.PI)*.15+Math.sin(e*40)*.02;A.st.sy=1+Math.sin(e*40)*.05;A.face(1);
    cl.forEach((m,i)=>{const side=i%2?1:-1,r=Math.ceil((i+1)/2);m.position.set(A.st.x-r*.55*A.st.fl*FACE.goose*1,A.st.y+side*r*.22,.5);m.scale.set(A.st.sx*A.st.fl*.65,.65*(1+Math.sin(e*40+i)*.06),1);m.material.opacity=Math.min(1,e*3)*A.st.op*.95;});A.ap();});
  A.st.sy=1;A.st.fl=1;await A.go(A.home.x,y,1.2,{wob:.04,arc:.1});};
S['c05:hummingbird']=async A=>{const y=A.home.y;A.st.x=A.edge(-1);A.st.y=y+.4;A.st.op=0;A.ap();A.tween(.3,e=>{A.st.op=e;A.ap();});
  const iv=setInterval(()=>{if(!A.alive()){clearInterval(iv);return;}A.fx('sparkle',A.st.x,A.st.y+A.hh*.3,2,{w:.1,t:.8,vy:.1});},200);
  await A.go(A.edge(1),y+.6,2.4,{hops:6,arc:.15,wob:.06,lin:1});await A.go(A.home.x,y+.2,1.4,{hops:3,arc:.1,wob:.05});clearInterval(iv);await A.go(A.home.x,y,.6);};
S['c05:garter']=trip('dust',false);S['c05:turtle']=trip('bubble',false);

/* default: walks, hops, swims or flies in, then shows off what it does */
S._dflt=async A=>{await A.enter(A.home.x>0?-1:1,1.5);await A.signature();await A.wait(.6);if(A.k==='monkey'||A.k==='child'||A.k==='dog'||A.k==='cow')await A.wag(1.0,.05,4);};
/* movement lesson */
const CROSS={fish:1,duck:1,rabbit:1,snake:1,child:1,parrot:1};
P.CLAY.act=(sc,X,k,id)=>{const n=X.S[k];if(!n||!n.hero)return;
  const my=(sc.__atok=(sc.__atok||0)+1);const alive=()=>sc.__atok===my&&X.cur===n;
  if(n.__A){try{n.__A.clean();}catch(e){}n.__A=null;}
  const h=n.hero,u=h.userData;h.material.color.set('#ffffff');
  sc.later(async()=>{if(!alive())return;
    const A=kit(sc,X,k,n,alive);n.__A=A;u.busy=1;
    const fn=S[id+':'+k]||(id==='c02'&&CROSS[k]?async A=>{await A.enter(-1,1.3);await A.cross(1.8);}:null)||S._dflt;
    try{await fn(A);}catch(e){if(e!==0)console.error(e);}
    if(alive()){A.clean();h.material.color.set('#ffffff');A.done();}
    else{A.clean();}},1600);};
})();
