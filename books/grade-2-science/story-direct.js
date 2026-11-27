/* The director: story and theory pages for lessons 1-5 are staged like short films.
   Each narration sentence has a beat (a little piece of action) on a clay pop-up set; the voice waits
   at the end of the sentence until the beat is finished, so every moment is shown fully and calmly. */
(function(){
"use strict";
const P=window.PM;if(!P||!P.CLAY||!P.PIC||!P.DIO)return;
const D0=P.DIO,{tween,THREE,PIC}=P;const W=PIC.W,H=PIC.H;
const ease=k=>k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2,out=k=>1-(1-k)*(1-k);
const HERO=P.CLAY.HERO||{};const ASP={"kid0":.507,"kid1":.645,"kid2":.502,"kid3":.671,"kid4":.536,"kid5":.507,"pa-c5hungry":1.009,"pa-c5full":0.904,"pa-g5cold":1.750,"pa-g5nest":1.109,"pa-g5smoke":1.600,"pa-hunter5":0.507,"pa-g5storm":1.279,"pa-fox5":2.333,"pa-a15bub":0.696,"pa-b15kite":1.228,"pa-c14drop":0.943,"pa-d16cloud":1.302,"pa-d16float":1.595,"pa-d16sky":1.113,"pa-d16vapor":1.037,"pa-g18laugh":0.814,"pa-k17bags":1.489,"pa-k17bike":1.346,"pa-k18btn":0.596,"pa-k18wind":0.821,"pa-l15cap":1.384,"pa-l15shout":0.468,"pa-m14cap":0.843,"pa-m14cheese":0.925,"pa-mc14walk":1.212,"pa-q17case":0.728,"pa-q17ducks":0.6,"pa-r18march":0.914,"pa-s13isle":1.938,"pa-s13paddle":1.931,"pa-s13wade":1.124,"pa-s13worry":0.736,"pa-t11sugar":0.648,"pa-t11jars":2.456,"pa-t11sponge":1.357,"pa-t11tools":1.609,"pa-t12snowman":1.079,"pa-t12puddle":2.814,"pa-t12pops":1.573,"pa-t12line":2.014,"pa-t13tank":1.172,"pa-t13anchor":0.625,"pa-t13clay":1.164,"pa-t13boat":1.61,"pa-t14jug":0.798,"pa-t14fuel":1.217,"pa-t14can":0.604,"pa-t14shelf":1.429,"pa-t15balloon":1.111,"pa-t15ball":1.657,"pa-t15bike":2.029,"pa-t15sail":0.912,"pa-soupglass":0.766,"pa-soupstir":0.732,"pa-soupspill":0.979,"pa-soupbow":1.120,"pa-waterdrop":0.789,"pa-waterice":1.002,"pa-watergas":1.094,"pa-watermelt":1.404,"pa-samlook":0.518,"pa-samraft":1.033,"pa-samcheer":0.729,"pa-samlog":0.923,"pa-mousebottle":0.932,"pa-catstop":0.918,"pa-catpoint":0.950,"pa-mousescared":0.796,"pa-leogust":0.589,"pa-amybubbles":0.809,"pa-leorun":0.800,"pa-kidsbench":1.109,"pa-ducklings":2.171,"pa-chicks":1.614,"pa-calf":1.189,"pa-lamb":1.029,"pa-haybale":1.287,"pa-lambstuck":0.918,"pa-lambjump":0.922,"pa-calflamb":1.911,"pa-cubnew":1.735,"pa-cubpounce":2.051,"pa-lionyoung":1.324,"pa-lionadult":1.944,"pa-eggleaf":2.629,"pa-caterbite":1.934,"pa-chrysalis":0.802,"pa-emerging":0.789,"pa-shawcart":0.891,"pa-shawsoap":0.636,"pa-milkpour":0.843,"pa-oilpour":0.916,"pa-keeper":0.511,"pa-whalecalf":2.205,"pa-frogmud":2.363,"pa-squirreldig":1.376,"pa-turtlesleep":1.944,"pa-tadpole":2.593,"pa-elephanthay":1.346,"pa-bearwalk":1.595,"pa-wolfthin":1.455,"pa-beareat":0.877,"pa-parrotfly":1.031,"pa-boywalk":0.596,"pa-ptarbrown":0.984,"pa-foxup":0.82,"pa-frogtongue":1.965,"pa-cowcalf":1.376,"pic-toad-h":1.063,"pic-whale-h":1.901,"pic-fox-h":1.361,"pic-salmon-h":1.039,"pic-lion-h":1.139,"pic-garter-h":3.089,"pic-shark-h":1.625,"pic-goose-h":1.565,"pic-bear-h":1.451,"pic-eagle-h":1.341,"pic-elephant-h":1.247,"pic-bee-h":0.905,"pic-ptarmigan-h":0.95,"pic-dog-h":0.979,"pic-bat-h":1.361,"pic-hummingbird-h":1.233,"pic-beaver-h":0.795,"pic-frog-h":1.0,"pic-spider-h":1.532,"pic-duck-h":1.066,"pic-horse-h":1.081,"pic-child-h":0.509,"pic-snake-h":1.474,"pic-cow-h":1.131,"pic-owl-h":0.757,"pic-fish-h":1.217,"pic-turtle-h":1.599,"pic-squirrel-h":0.872,"pic-parrot-h":1.814,"pic-swan-h":1.045,"pic-caribou-h":1.074,"pic-rabbit-h":0.657,"pic-monkey-h":1.876,"pic-butterfly-h":0.719,"pic-robin-h":1.251,"pic-wolf-h":1.118};
const TH={tilt:-.95,z:-1.0,lz:-.2},ST={tilt:-.2,z:-1.95,lz:-1.15};
const COLS=['#2b8a3e','#1c7ed6','#e8590c','#7048e8','#c2255c','#0b7285'];

/* ---------- particles ---------- */
const TX={};
function glyph(ch,col){const k=ch+col;if(TX[k])return TX[k];const c=document.createElement('canvas');c.width=c.height=96;const x=c.getContext('2d');
  x.fillStyle=col;x.strokeStyle='#fff';x.lineWidth=7;
  if(ch==='o'){const g=x.createRadialGradient(48,48,2,48,48,44);g.addColorStop(0,col);g.addColorStop(.6,col);g.addColorStop(1,'rgba(255,255,255,0)');x.fillStyle=g;x.beginPath();x.arc(48,48,44,0,7);x.fill();}
  else if(ch==='*'){x.beginPath();for(let i=0;i<8;i++){const a=i*Math.PI/4-Math.PI/2,r=i%2?12:42;x.lineTo(48+Math.cos(a)*r,48+Math.sin(a)*r);}x.closePath();x.stroke();x.fill();}
  else if(ch==='h'){x.beginPath();x.moveTo(48,84);x.bezierCurveTo(4,52,14,12,48,32);x.bezierCurveTo(82,12,92,52,48,84);x.closePath();x.stroke();x.fill();}
  else if(ch==='n'){x.beginPath();x.ellipse(34,70,17,12,-.4,0,7);x.stroke();x.fill();x.fillRect(46,16,9,54);x.beginPath();x.moveTo(52,16);x.quadraticCurveTo(84,26,72,56);x.quadraticCurveTo(76,34,52,34);x.fill();}
  else if(ch==='f'){x.fillStyle='rgba(255,255,255,.85)';x.strokeStyle='#555';x.lineWidth=3;x.beginPath();x.ellipse(34,30,20,12,-.5,0,7);x.fill();x.stroke();x.beginPath();x.ellipse(62,30,20,12,.5,0,7);x.fill();x.stroke();x.fillStyle='#222';x.beginPath();x.ellipse(48,54,15,20,0,0,7);x.fill();}
  else if(ch==='l'){x.beginPath();x.ellipse(48,48,38,18,-.6,0,7);x.stroke();x.fill();x.strokeStyle='rgba(0,0,0,.25)';x.lineWidth=3;x.beginPath();x.moveTo(20,70);x.lineTo(76,26);x.stroke();}
  else{x.font='bold 72px sans-serif';x.textAlign='center';x.textBaseline='middle';x.lineWidth=10;x.strokeText(ch,48,52);x.fillText(ch,48,52);}
  return TX[k]=new THREE.CanvasTexture(c);}
const KIND={sparkle:['*','#ffc038',.2,.7,.1],snow:['o','#ffffff',.09,-1.4,0],bubble:['o','rgba(170,220,255,.9)',.11,.8,0],heart:['h','#e63946',.2,.7,0],
 z:['Z','#4263eb',.24,.6,0],note:['n','#7048e8',.2,.7,0],dust:['o','#cdb48a',.15,.25,0],splash:['o','#74c0fc',.11,.6,.9],drop:['o','#4dabf7',.12,1.4,1.2],
 fluff:['o','#ffffff',.18,.25,.1],leaf:['l','#e8590c',.16,-.5,.4],leaf2:['l','#f08c00',.16,-.5,.4],chip:['o','#a0703c',.08,.5,.9],crumb:['o','#d9480f',.07,.4,.8]};

let SOFT=null;const softEdge=()=>SOFT||(SOFT=(()=>{const w=256,h=144,c=document.createElement('canvas');c.width=w;c.height=h;const x=c.getContext('2d'),im=x.createImageData(w,h);
  for(let j=0;j<h;j++)for(let i=0;i<w;i++){const dx=Math.min(i,w-1-i),dy=Math.min(j,h-1-j);let a=Math.min(1,Math.min(dx/22,dy/14));a=a*a*(3-2*a);const k=(j*w+i)*4;im.data[k]=im.data[k+1]=im.data[k+2]=Math.round(a*255);im.data[k+3]=255;}
  x.putImageData(im,0,0);return new THREE.CanvasTexture(c);})());
/* ---------- the director for one page ---------- */
function director(sc,o){
  sc.__sid='c09pic';D0.base(sc,'#e9e2d6');P.CAMO=sc;
  const root=new THREE.Group();root.position.set(0,.02,o.z);root.rotation.x=o.tilt;sc.g.add(root);root.visible=false;
  const R={sc,root,o,cur:null,bgs:{},actors:[],q:Promise.resolve(),lab:null,t:0};P.DIR_LAST=R;
  const alive=()=>P.CAMO===sc;R.alive=alive;
  const T=(sec,fn)=>tween(sec,fn);R.T=T;
  R.wait=sec=>T(sec,()=>{});
  sc.tick((dt,t)=>{R.t=t;root.rotation.y=Math.sin(t*.45)*.07;root.rotation.z=Math.sin(t*.6)*.006;R.actors.forEach(a=>a.tick(dt,t));});
  /* backdrops */
  const bgPlane=k=>{if(R.bgs[k])return R.bgs[k];const m=PIC.plane('pic-'+k,W,H,1,true);if(k==='map'||k==='burrow')m.material.alphaMap=softEdge();m.geometry.translate(0,H/2,0);m.material.opacity=0;m.visible=false;root.add(m);return R.bgs[k]=m;};
  R.junk=[];R.own=o=>{if(o)R.junk.push(o);return o;};
  R.clear=sec=>{R.actors.slice().forEach(a=>{if(a.mesh){a.idle='none';a.hide(sec||.4).then(()=>a.remove());}else if(a.kill)a.kill();});
    const j=R.junk;R.junk=[];j.forEach(o=>{const ms=[];o.traverse&&o.traverse(x=>{if(x.material)ms.push(x.material);});ms.forEach(m=>{m.transparent=true;m._o=m.opacity;});
      T(sec||.4,e=>ms.forEach(m=>{m.opacity=m._o*(1-e);})).then(()=>root.remove(o));});if(R.lab){R.lab.visible=false;R.lab=null;}};
  R.bg=(k,sec)=>{const m=bgPlane(k);const old=R.cur;if(old===m)return R.wait(.01);if(old)R.clear(.45);R.cur=m;m.visible=true;
    if(!root.visible){root.visible=true;root.scale.set(1,.04,1);T(.85,e=>{const z=ease(e);root.scale.y=.04+.96*z+Math.sin(e*Math.PI)*.07;root.scale.x=1.05-.05*z;}).then(()=>root.scale.set(1,1,1));
      if(P.A&&P.A.pop)try{P.A.pop();}catch(e){}}
    return T(sec||.8,e=>{m.material.opacity=Math.min(1,e*1.4);if(old)old.material.opacity=1-e;}).then(()=>{if(old&&R.cur!==old)old.visible=false;});};
  /* labels (only on story / theory pages) */
  R.label=(txt,col)=>{if(!txt||o.noLab)return;const c=D0.card(sc,txt,0,o.lz,{h:.2,col:col||COLS[R.actors.length%COLS.length]});c.visible=true;D0.grow(c);if(R.lab)R.lab.visible=false;R.lab=c;};
  /* particles live inside the set */
  R.fx=(kind,x,y,cnt,q)=>{q=q||{};const K=KIND[kind]||KIND.sparkle,Tm=q.t||1.5,ps=[];
    for(let i=0;i<cnt;i++){const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:glyph(K[0],K[1]),transparent:true,depthTest:false,opacity:0}));sp.renderOrder=12;root.add(sp);
      ps.push({sp,d:Math.random()*(q.spread==null?.6:q.spread)*Tm,x:x+(Math.random()-.5)*(q.w==null?.35:q.w),y:y+(Math.random()-.5)*(q.h==null?.12:q.h),
        vx:(Math.random()-.5)*(q.vx==null?K[4]*2:q.vx),vy:(q.vy==null?K[3]:q.vy)*(.8+Math.random()*.4),gr:/splash|drop|chip|crumb/.test(kind)?-2.2:0,s:K[2]*(q.sz||1)*(.7+Math.random()*.6),r:Math.random()*6});}
    const tot=Tm*(1+(q.spread==null?.6:q.spread));
    return T(tot,e=>{const t=e*tot;ps.forEach(p=>{const k=(t-p.d)/Tm;if(k<0||k>1){p.sp.material.opacity=0;return;}
      p.sp.position.set(p.x+p.vx*k+(kind.startsWith('leaf')?Math.sin(k*9+p.r)*.15:0),p.y+p.vy*k*Tm*.5+p.gr*k*k*Tm*.5,.1);
      p.sp.material.rotation=kind.startsWith('leaf')?p.r+k*4:0;p.sp.scale.setScalar(p.s*(kind==='z'?.6+k*.9:kind==='fluff'?.6+k*.6:1));p.sp.material.opacity=Math.min(1,k*8)*(1-k*k);});})
      .then(()=>ps.forEach(p=>{root.remove(p.sp);p.sp.material.dispose();}));};
  R.snow=(sec,n)=>R.fx('snow',0,H+.1,n||50,{w:W,h:.2,vy:-2.0,vx:.5,t:sec||4,spread:1});
  R.leaves=(sec,n)=>Promise.all([R.fx('leaf',0,H,Math.ceil((n||16)/2),{w:W*.9,vy:-1.6,t:sec||4,spread:1,vx:.6}),R.fx('leaf2',0,H,Math.floor((n||16)/2),{w:W*.9,vy:-1.6,t:sec||4,spread:1,vx:.6})]);
  /* clay props from the book's sprite set */
  R.prop=(name,x,y,s)=>{const p=P.artProp(name,{s:s||.4,bare:true});if(!p)return null;p.position.set(x,y,.08);p.renderOrder=4;root.add(p);return R.own(p);};
  R.toss=(p,x,y,sec,arc)=>{if(!p)return R.wait(sec);const x0=p.position.x,y0=p.position.y;return T(sec,e=>{const q=ease(e);p.position.set(x0+(x-x0)*q,y0+(y-y0)*q+Math.sin(e*Math.PI)*(arc||0),.08);});};
  R.drop=p=>{if(p)root.remove(p);};
  R.shrink=(p,sec)=>{if(!p)return R.wait(sec);const s0=p.scale.x;return T(sec,e=>p.scale.setScalar(Math.max(.001,s0*(1-ease(e)))));};
  /* a soft dark patch (the dark inside of a den or hole) that can fade away to reveal what is inside */
  R.dark=(x,y,rx,ry,op)=>{const c=document.createElement('canvas');c.width=c.height=128;const g=c.getContext('2d'),gr=g.createRadialGradient(64,64,4,64,64,62);gr.addColorStop(0,'rgba(20,12,6,1)');gr.addColorStop(.7,'rgba(20,12,6,.95)');gr.addColorStop(1,'rgba(20,12,6,0)');g.fillStyle=gr;g.fillRect(0,0,128,128);
    const m=new THREE.Mesh(new THREE.PlaneGeometry(1,1),new THREE.MeshBasicMaterial({map:new THREE.CanvasTexture(c),transparent:true,depthWrite:false,opacity:op==null?1:op}));m.scale.set(rx*2,ry*2,1);m.position.set(x,y,.06);m.renderOrder=5;root.add(m);
    m.fadeTo=(v,sec)=>{const a=m.material.opacity;return T(sec,e=>{m.material.opacity=a+(v-a)*ease(e);});};return R.own(m);};
  /* a glowing ring that points at a body part */
  R.ring=(x,y,r,col)=>{const m=new THREE.Mesh(new THREE.RingGeometry(r*.86,r,48),new THREE.MeshBasicMaterial({color:col||'#ffd43b',transparent:true,depthTest:false,opacity:0}));m.position.set(x,y,.07);m.renderOrder=14;root.add(m);R.own(m);
    const g=new THREE.Mesh(new THREE.CircleGeometry(r*.86,48),new THREE.MeshBasicMaterial({color:'#fff8d6',transparent:true,depthTest:false,opacity:0}));g.position.set(x,y,.065);R.own(g);g.renderOrder=13;root.add(g);
    m.show=sec=>T(sec||.5,e=>{m.material.opacity=e;g.material.opacity=e*.18;const s=.6+.4*out(e)+Math.sin(e*Math.PI)*.12;m.scale.setScalar(s);g.scale.setScalar(s);});
    m.hide=sec=>T(sec||.4,e=>{m.material.opacity=1-e;g.material.opacity=.18*(1-e);}).then(()=>{root.remove(m);root.remove(g);});
    m.pulse=(n,sec)=>T(sec||1.2,e=>{const s=1+Math.sin(e*Math.PI*2*(n||2))*.06;m.scale.setScalar(s);g.scale.setScalar(s);});return m;};
  /* a beating heart; rate in beats per second */
  R.heart=(x,y,s)=>{const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:glyph('h','#e03131'),transparent:true,depthTest:false,opacity:0}));sp.position.set(x,y,.1);sp.renderOrder=15;root.add(sp);
    const hb={sp,rate:1.6,s:s||.4,ph:0,on:true};hb.kill=()=>{hb.on=false;root.remove(sp);};R.actors.push({kill:hb.kill,tick:(dt)=>{if(!hb.on)return;hb.ph+=dt*hb.rate;const b=hb.ph%1;const k=b<.12?b/.12:b<.3?1-(b-.12)/.18:0;sp.scale.setScalar(hb.s*(1+k*.28));}});
    hb.show=()=>T(.4,e=>{sp.material.opacity=e;});hb.hide=()=>T(.4,e=>{sp.material.opacity=1-e;}).then(()=>{hb.on=false;root.remove(sp);});
    hb.slow=(to,sec)=>{const a=hb.rate;return T(sec,e=>{hb.rate=a+(to-a)*ease(e);});};return hb;};
  /* a clay-looking hazard diamond sign, drawn on canvas: kind = skull | flame | burst | corrosive */
  R.sign=(kind,x,y,s)=>{const c=document.createElement('canvas');c.width=c.height=256;const g=c.getContext('2d');
    g.translate(128,128);g.rotate(Math.PI/4);g.fillStyle='#fffdf5';g.strokeStyle='#d6336c';g.lineWidth=14;const r=g.roundRect?(g.beginPath(),g.roundRect(-76,-76,152,152,16),0):(g.beginPath(),g.rect(-76,-76,152,152));g.fill();g.stroke();g.rotate(-Math.PI/4);
    g.fillStyle='#212529';g.strokeStyle='#212529';g.lineCap='round';
    if(kind==='skull'){g.beginPath();g.arc(0,-14,40,0,7);g.fill();g.fillRect(-22,10,44,28);g.fillStyle='#fffdf5';g.beginPath();g.arc(-16,-12,11,0,7);g.arc(16,-12,11,0,7);g.fill();g.fillRect(-4,6,8,10);g.fillRect(-12,26,4,12);g.fillRect(8,26,4,12);g.strokeStyle='#212529';g.lineWidth=9;g.beginPath();g.moveTo(-50,44);g.lineTo(50,64);g.moveTo(50,44);g.lineTo(-50,64);g.stroke();}
    else if(kind==='flame'){g.fillStyle='#212529';g.beginPath();g.moveTo(0,-62);g.bezierCurveTo(30,-30,52,-4,40,28);g.bezierCurveTo(34,52,-34,52,-40,28);g.bezierCurveTo(-48,6,-26,-14,-14,-30);g.bezierCurveTo(-10,-12,-4,-8,0,-62);g.fill();g.fillStyle='#fffdf5';g.beginPath();g.moveTo(2,-6);g.bezierCurveTo(18,12,22,26,14,36);g.bezierCurveTo(6,44,-12,40,-14,28);g.bezierCurveTo(-14,14,-4,10,2,-6);g.fill();}
    else if(kind==='burst'){g.beginPath();for(let i=0;i<16;i++){const a=i*Math.PI/8,rr=i%2?26:58;g.lineTo(Math.cos(a)*rr,Math.sin(a)*rr);}g.closePath();g.fill();g.fillStyle='#fffdf5';g.beginPath();g.arc(0,0,14,0,7);g.fill();}
    else{g.fillRect(-52,36,104,8);g.beginPath();g.moveTo(-20,-52);g.bezierCurveTo(-4,-30,-6,-14,-20,-14);g.bezierCurveTo(-34,-14,-36,-30,-20,-52);g.fill();g.beginPath();g.moveTo(24,-40);g.bezierCurveTo(38,-22,36,-8,24,-8);g.bezierCurveTo(12,-8,10,-22,24,-40);g.fill();g.lineWidth=10;g.beginPath();g.moveTo(-30,26);g.lineTo(-30,6);g.moveTo(-10,26);g.lineTo(-10,2);g.moveTo(10,26);g.lineTo(10,2);g.moveTo(30,26);g.lineTo(30,10);g.stroke();g.beginPath();g.arc(0,26,32,0,Math.PI);g.stroke();}
    const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:new THREE.CanvasTexture(c),transparent:true,depthTest:false,opacity:0}));sp.position.set(x,y,.12);sp.renderOrder=13;const S=s||.7;sp.scale.setScalar(.01);root.add(sp);R.own(sp);
    const o={sp,show:()=>T(.5,e=>{const q=out(e);sp.material.opacity=Math.min(1,e*3);sp.scale.setScalar(S*(.2+.8*q+Math.sin(e*Math.PI)*.18));}),hide:()=>T(.4,e=>{sp.material.opacity=1-e;}),shake:(sec)=>T(sec||.7,e=>{sp.material.rotation=Math.sin(e*28)*.14*(1-e);sp.material.opacity=1;})};return o;};
  /* a dotted trail drawn along a path, bit by bit */
  R.trail=(pts,sec,col)=>{const dots=[];const seg=[];let L=0;for(let i=1;i<pts.length;i++){const d=Math.hypot(pts[i][0]-pts[i-1][0],pts[i][1]-pts[i-1][1]);seg.push(d);L+=d;}
    const n=Math.max(6,Math.round(L/.11));const at=f=>{let d=f*L;for(let i=0;i<seg.length;i++){if(d<=seg[i]||i===seg.length-1){const k=seg[i]?Math.min(1,d/seg[i]):0;return [pts[i][0]+(pts[i+1][0]-pts[i][0])*k,pts[i][1]+(pts[i+1][1]-pts[i][1])*k];}d-=seg[i];}};
    for(let i=0;i<n;i++){const p=at(i/(n-1));const m=new THREE.Mesh(new THREE.CircleGeometry(.028,16),new THREE.MeshBasicMaterial({color:col||'#ffffff',transparent:true,depthTest:false,opacity:0}));m.position.set(p[0],p[1],.06);m.renderOrder=11;root.add(m);dots.push(R.own(m));}
    const tr={dots,at};tr.draw=()=>T(sec,e=>{dots.forEach((m,i)=>{m.material.opacity=e*(n-1)>=i?.95:0;});});tr.clear=()=>T(.5,e=>dots.forEach(m=>m.material.opacity=.95*(1-e))).then(()=>dots.forEach(m=>root.remove(m)));return tr;};
  R.fly=(x,y)=>{const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:glyph('f','#222'),transparent:true,depthTest:false}));sp.position.set(x,y,.1);sp.scale.setScalar(.16);sp.renderOrder=14;root.add(sp);
    const f={sp,x,y,on:true};R.actors.push({kill:()=>{f.on=false;root.remove(sp);},tick:(dt,t)=>{if(!f.on)return;sp.position.set(f.x+Math.sin(t*5.3)*.12,f.y+Math.sin(t*7.1)*.07,.1);sp.scale.set(.16*(1+Math.sin(t*60)*.15),.16,1);}});
    f.go=(x2,y2,sec)=>{const a=f.x,b=f.y;return T(sec,e=>{f.x=a+(x2-a)*ease(e);f.y=b+(y2-b)*ease(e);});};f.kill=()=>{f.on=false;root.remove(sp);};return f;};
  /* a big word that pops up on the set (for "Zap!", "Brrr!") */
  R.word=(txt,x,y,col,sz)=>{const c=document.createElement('canvas');c.width=512;c.height=160;const g=c.getContext('2d');let fs=104;g.font='900 '+fs+'px "Baloo 2", "Arial Rounded MT Bold", sans-serif';while(g.measureText(txt).width>470&&fs>34){fs-=4;g.font='900 '+fs+'px "Baloo 2", "Arial Rounded MT Bold", sans-serif';}g.textAlign='center';g.textBaseline='middle';
    g.lineWidth=18;g.strokeStyle='#fff';g.strokeText(txt,256,84);g.fillStyle=col||'#e8590c';g.fillText(txt,256,84);
    const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:new THREE.CanvasTexture(c),transparent:true,depthTest:false,opacity:0}));sp.position.set(x,y,.1);sp.renderOrder=16;root.add(sp);const s=sz||.95;
    return T(.35,e=>{sp.material.opacity=e;sp.scale.set(s*(.4+.6*out(e)+Math.sin(e*Math.PI)*.15),s*.31*(.4+.6*out(e)+Math.sin(e*Math.PI)*.15),1);})
      .then(()=>R.wait(.9)).then(()=>T(.35,e=>{sp.material.opacity=1-e;sp.position.y=y+e*.15;})).then(()=>root.remove(sp));};
  /* ---- actors ---- */
  R.act=(img,q)=>{q=q||{};let name=img,hb=null;if(img.slice(0,2)==='h:'){const k=img.slice(2);name='pic-'+k+'-h';hb=HERO[k];}
    let h=q.h,x=q.x,y=q.y;if(hb){const hh=(hb[3]-hb[2])*H;if(h==null)h=hh;if(x==null)x=((hb[0]+hb[1])/2-.5)*W;if(y==null)y=(1-hb[3])*H;}
    h=h||1;x=x||0;y=y||0;
    const mk=(nm,hh)=>{const w=hh*(ASP[nm]||1);const m=PIC.plane(nm,w,hh,3+(q.ro||0),false);m.geometry.translate(0,hh/2,0);m.material.opacity=0;root.add(m);return {m,w,h:hh};};
    let cur=mk(name,h);
    const sh=new THREE.Mesh(new THREE.CircleGeometry(.5,32),new THREE.MeshBasicMaterial({color:'#000',transparent:true,opacity:0,depthWrite:false}));sh.renderOrder=2;root.add(sh);
    const a={name,st:{x,y,s:1,sx:1,sy:1,rz:0,fl:1,op:0,lift:0},home:{x,y},face:q.face||0,busy:0,idle:q.idle||'breathe',ph:Math.random()*6,shadow:q.shadow!==false&&o.tilt>-.5};
    a.w=()=>cur.w;a.h=()=>cur.h;a.mesh=()=>cur.m;
    const ap=()=>{const s=a.st;const m=cur.m;m.position.set(s.x+(s._dx||0),s.y+(s._dy||0)+s.lift,.2+(q.z||0));m.scale.set(s.s*s.sx*s.fl*(s._sx||1),s.s*s.sy*(s._sy||1),1);m.rotation.z=s.rz+(s._rz||0);m.material.opacity=s.op;
      sh.position.set(s.x+(s._dx||0),s.y+.01,.1);sh.scale.set(cur.w*.85*s.s,Math.min(.2,cur.h*.15)*s.s,1);sh.material.opacity=a.shadow?.2*s.op/(1+Math.max(0,s.lift+(s._dy||0))*1.5):0;};
    a.ap=ap;
    a.tick=(dt,t)=>{const s=a.st;const tt=t+a.ph;s._dx=s._dy=s._rz=0;s._sx=s._sy=1;if(!a.busy&&s.op>0){switch(a.idle){
      case 'flutter':s._dy=Math.sin(tt*2.6)*.06;s._dx=Math.sin(tt*1.3)*.06;s._sx=1+Math.sin(tt*18)*.06;s._rz=Math.sin(tt*1.6)*.04;break;
      case 'swim':s._dx=Math.sin(tt*.9)*.07;s._dy=Math.sin(tt*1.7)*.04;s._rz=Math.sin(tt*.9)*.03;break;
      case 'sleep':s._sy=1+Math.sin(tt*1.2)*.025;break;
      case 'sway':s._rz=Math.sin(tt*1.1)*.06;break;
      case 'none':break;
      default:s._sy=1+Math.sin(tt*2.2)*.018;s._rz=Math.sin(tt*1.15)*.012;}}ap();};
    a.T=(sec,fn)=>{a.busy++;return T(sec,fn).then(()=>{a.busy--;ap();});};
    a.faceTo=dx=>{if(a.face&&Math.abs(dx)>.02)a.st.fl=(dx>0?1:-1)*a.face;};
    a.at=(x,y)=>{a.st.x=x;a.st.y=y;ap();return a;};
    a.show=(sec,how)=>{const s=a.st;if(how==='pop'){s.s=.2;return a.T(sec||.6,e=>{s.op=Math.min(1,e*2.2);s.s=.2+.8*ease(e)+Math.sin(e*Math.PI)*.15;s.lift=Math.sin(e*Math.PI)*.25;}).then(()=>{s.s=1;s.lift=0;});}
      return a.T(sec||.5,e=>{s.op=e;});};
    a.hide=sec=>a.T(sec||.5,e=>{a.st.op=1-e;});
    a.go=(tx,ty,sec,g)=>{g=g||{};const s=a.st,x0=s.x,y0=s.y;a.faceTo(tx-x0);
      return a.T(sec,e=>{const k=g.lin?e:ease(e);s.x=x0+(tx-x0)*k;s.y=y0+(ty-y0)*k;
        s.lift=g.hops?Math.abs(Math.sin(e*Math.PI*g.hops))*(g.arc||.15):(g.arc?Math.sin(e*Math.PI)*g.arc:0);
        s.rz=g.wob?Math.sin(e*Math.PI*2*(g.hops||g.waves||4))*g.wob:0;
        if(g.squash){const b=Math.abs(Math.sin(e*Math.PI*(g.hops||4)));s.sy=1+.06*(1-b)-.0;s.sx=1-.03*(1-b);}
        if(g.flap){s.sy=1+Math.sin(e*Math.PI*2*g.flap)*.07;}}).then(()=>{s.rz=0;s.sx=s.sy=1;s.lift=0;});};
    const dist=tx=>Math.abs(tx-a.st.x);
    a.walk=(tx,ty,sec)=>a.go(tx,ty==null?a.st.y:ty,sec,{hops:Math.max(2,Math.round(dist(tx)*3)),arc:.04,wob:.03,lin:1,squash:1});
    a.hop=(tx,ty,sec,arc)=>a.go(tx,ty==null?a.st.y:ty,sec,{hops:Math.max(1,Math.round(dist(tx)*1.6)),arc:arc||.26,lin:1,squash:1});
    a.fly=(tx,ty,sec)=>a.go(tx,ty,sec,{arc:.12,waves:Math.max(2,Math.round(dist(tx)*1.2)),wob:.06,flap:Math.max(3,Math.round(sec*4))});
    a.swim=(tx,ty,sec)=>a.go(tx,ty==null?a.st.y:ty,sec,{waves:3,wob:.035,arc:.05});
    a.slither=(tx,ty,sec)=>a.go(tx,ty==null?a.st.y:ty,sec,{waves:Math.max(3,Math.round(dist(tx)*3)),wob:.05,lin:1});
    a.jump=(hgt)=>{const s=a.st;return a.T(.55,e=>{const j=Math.sin(e*Math.PI);s.lift=j*(hgt||.28);s.sy=1+j*.1;s.sx=1-j*.05;}).then(()=>{s.lift=0;s.sx=s.sy=1;});};
    a.wag=(sec,amp,fr)=>a.T(sec,e=>{a.st.rz=Math.sin(e*Math.PI*2*(fr||4))*(amp||.05);}).then(()=>{a.st.rz=0;});
    a.shiver=sec=>{const s=a.st,x0=s.x;return a.T(sec,e=>{s.x=x0+Math.sin(e*sec*80)*.018;s.rz=Math.sin(e*sec*63)*.02;}).then(()=>{s.x=x0;s.rz=0;});};
    a.chew=(n,sec)=>a.T(sec||1.4,e=>{const j=Math.abs(Math.sin(e*Math.PI*(n||5)));a.st.sy=1-j*.035;a.st.sx=1+j*.015;}).then(()=>{a.st.sx=a.st.sy=1;});
    a.scaleTo=(v,sec)=>{const s=a.st,v0=s.s;return a.T(sec,e=>{s.s=v0+(v-v0)*ease(e);});};
    a.grow=(sx,sy,sec)=>{const s=a.st,a0=s.sx,b0=s.sy;return a.T(sec,e=>{const k=ease(e),b=Math.sin(e*Math.PI)*.08;s.sx=a0+(sx-a0)*k+b;s.sy=b0+(sy-b0)*k+b;});};
    a.tint=(c0,c1,sec)=>{const A=new THREE.Color(c0),B=new THREE.Color(c1);return T(sec,e=>{cur.m.material.color.copy(A).lerp(B,ease(e));});};
    /* swap to another picture of the same animal (a new pose) with a soft cross-fade, keeping the feet in place */
    a.swap=(img,sec,qq)=>{qq=qq||{};let nm=img,hh=qq.h;if(img.slice(0,2)==='h:'){const hb2=HERO[img.slice(2)];nm='pic-'+img.slice(2)+'-h';if(hh==null&&hb2)hh=(hb2[3]-hb2[2])*H;}
      const old=cur;const nx=mk(nm,hh||old.h);if(qq.col)nx.m.material.color.set(qq.col);if(qq.face!=null){a.face=qq.face;}cur=nx;const s=a.st;if(qq.fl!=null)s.fl=qq.fl;
      const op=s.op;nx.m.material.opacity=0;a.name=nm;
      return a.T(sec||.6,e=>{const k=ease(e);old.m.material.opacity=op*(1-k);s.op=op;cur=nx;ap();nx.m.material.opacity=op*k;
        old.m.position.copy(nx.m.position);old.m.scale.copy(nx.m.scale);old.m.rotation.z=nx.m.rotation.z;}).then(()=>{root.remove(old.m);});};
    a.say=(t,ms)=>{const c=document.createElement('canvas');const g=c.getContext('2d');g.font='700 56px "Atkinson Hyperlegible", sans-serif';const tw=g.measureText(t).width;c.width=Math.ceil(tw+64);c.height=110;
      g.font='700 56px "Atkinson Hyperlegible", sans-serif';g.fillStyle='#fff';g.strokeStyle='#1b2236';g.lineWidth=5;const r=34;g.beginPath();g.moveTo(r,4);g.arcTo(c.width-4,4,c.width-4,96,r);g.arcTo(c.width-4,96,4,96,r);g.arcTo(4,96,4,4,r);g.arcTo(4,4,c.width-4,4,r);g.closePath();g.fill();g.stroke();
      g.fillStyle='#1b2236';g.textAlign='center';g.textBaseline='middle';g.fillText(t,c.width/2,52);
      const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:new THREE.CanvasTexture(c),transparent:true,depthTest:false,opacity:0}));sp.renderOrder=18;root.add(sp);R.own(sp);const hgt=.26,wd=hgt*c.width/c.height;
      let bx=a.st.x;bx=Math.max(-W/2+wd/2+.05,Math.min(W/2-wd/2-.05,bx));const by=Math.min(H-.1,a.st.y+cur.h*a.st.s+.2);sp.position.set(bx,by,.22);
      const D=(ms||1600)/1000;T(.25,e=>{sp.material.opacity=e;sp.scale.set(wd*(.6+.4*out(e)),hgt*(.6+.4*out(e)),1);}).then(()=>R.wait(D)).then(()=>T(.3,e=>{sp.material.opacity=1-e;})).then(()=>root.remove(sp));
      return R.wait(D*.75);};
    a.remove=()=>{root.remove(cur.m);root.remove(sh);R.actors=R.actors.filter(x=>x!==a);};
    R.actors.push(a);ap();return a;};
  R.hero=(k,q)=>R.act('h:'+k,q);
  /* queue the beats: one after another, never two at once */
  R.beat=fn=>{R.q=R.q.then(()=>alive()?fn():null).catch(e=>{if(e)console.error(e);});return R.q;};
  R.at=(w,fn,n)=>sc.on(w,()=>R.beat(fn),n);
  R.open=fn=>sc.later(()=>R.beat(fn),650);
  /* tap any actor: a little jump */
  sc.later(()=>{if(!P.A||!P.A.drag)return;R.actors.forEach(a=>{if(!a.mesh)return;P.A.drag(a.mesh(),{tap:()=>{if(a.busy||a.st.op<.5)return;try{P.A.pop();}catch(e){}a.jump();}});});},4000);
  return R;}
P.DIR={director,TH,ST};

/* ---------- scripts ---------- */
/* each page: open(R) sets up; beats: [[cue word(s), fn(R)], ...] in narration order.
   'old' = beats for the current recorded narration, 'neu' = beats for the new longer narration (used once it is voiced). */
const PAGES=P.DIR_PAGES={};
const page=(id,step,def)=>{(PAGES[id]=PAGES[id]||{})[step]=def;};
P.DIR.page=page;
P.DIR.mount=function(){Object.keys(PAGES).forEach(id=>{const X=P.SCN[id]=P.SCN[id]||{};X.steps=X.steps||[];
  Object.keys(PAGES[id]).forEach(i=>{const def=PAGES[id][i];const fr=+i===0?ST:TH;
    const pv=X.steps[+i];if(pv&&!pv.dir)def._prev=pv;
    X.steps[+i]={dir:1,set:{},scene:sc=>{const neu=P.DIR.voiced&&P.DIR.voiced(id,+i);if(def.old===null&&!neu&&def._prev&&def._prev.scene)return def._prev.scene(sc);const R=director(sc,Object.assign({},fr));const S={};
      const beats=(neu&&def.neu)||def.old||def.neu||[];
      try{def.cast&&def.cast(R,S);}catch(e){console.error(e);}
      if(def.open)R.open(()=>def.open(R,S));
      beats.forEach(b=>R.at(b[0],()=>b[1](R,S),b[2]));return {};}};});});};
})();
