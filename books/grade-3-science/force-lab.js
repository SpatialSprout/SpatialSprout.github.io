/* The Interactive Classroom: Grade 3 Science, lesson 9 (Pushes and pulls): the Force Lab.
   An engineering test bench instead of a playground: a test cart on a metal track, a spring launcher,
   a spring bumper, a crank winch and two force meters. No characters.
   Motion is simulated, not keyframed: the launcher is a real spring that pushes the cart while they
   touch, the track slows the cart with a steady friction, the bumper is a stiff damped spring, and the
   wheels turn exactly as far as the cart rolls. Everything runs on the book's sim clock in small fixed
   steps, so it plays the same at any frame rate and in a recorded film.
   Springs and easing come from motion.js (Remotion's spring, Motion Canvas easings).
   Steps and practice scenes are exposed as PM.LAB9; lessons-b.js uses them for lesson q09. */
(function(){
"use strict";
const P=window.PM;if(!P||P.failed||!P.THREE||!P.STAGE||!window.MOTION)return;
const {THREE,G,lam,mk,label,A}=P;const MO=window.MOTION,E=MO.EASE;
const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
const H=1/240;            /* physics step (s) */
const TY=.1,WR=.085;      /* track top, wheel radius */
const HL=.33;             /* half length of the cart, bumper to bumper */
const MU=.9;              /* rolling friction: slows the cart by .9 units/s every second */
const C={ink:'#1b2a41',steel:'#9aa6b5',steelD:'#6b7889',plank:'#dfe6ef',cart:'#ffc233',cartD:'#e0a100',red:'#e8590c',push:'#f76707',pull:'#1c7ed6',green:'#2f9e44',navy:'#22344d',blue:'#2b5d9b'};

/* ---------- textures ---------- */
const TEX={};
function canvasTex(key,w,h,draw){if(TEX[key])return TEX[key];const c=document.createElement('canvas');c.width=w;c.height=h;draw(c.getContext('2d'),w,h);const t=new THREE.CanvasTexture(c);t.anisotropy=4;if(THREE.sRGBEncoding&&P.renderer&&P.renderer.outputEncoding===THREE.sRGBEncoding)t.encoding=THREE.sRGBEncoding;TEX[key]=t;return t;}
const rulerTex=n=>canvasTex('ruler'+n,1024,64,(g,w,h)=>{g.fillStyle='#fffdf6';g.fillRect(0,0,w,h);g.strokeStyle='#1b2a41';g.fillStyle='#1b2a41';
  const pad=18,step=(w-2*pad)/(n*2);for(let i=0;i<=n*2;i++){const x=pad+i*step;const big=i%2===0;g.lineWidth=big?3:2;g.beginPath();g.moveTo(x,0);g.lineTo(x,big?26:15);g.stroke();
    if(big){g.font='bold 30px Atkinson Hyperlegible, Arial, sans-serif';g.textAlign='center';g.fillText(String(i/2),x,56);}}
  g.strokeStyle='#c3cfdd';g.lineWidth=3;g.strokeRect(1.5,1.5,w-3,h-3);});
const gridTex=()=>canvasTex('grid',256,256,(g,w,h)=>{g.fillStyle='#eef4fb';g.fillRect(0,0,w,h);g.strokeStyle='#cfdcec';g.lineWidth=2;for(let i=0;i<=8;i++){const p=i*w/8;g.beginPath();g.moveTo(p,0);g.lineTo(p,h);g.stroke();g.beginPath();g.moveTo(0,p);g.lineTo(w,p);g.stroke();}
  g.strokeStyle='#b3c7df';g.lineWidth=4;g.strokeRect(0,0,w,h);});
function boardTex(title,sub){const key='board'+title+sub;return canvasTex(key,1024,256,(g,w,h)=>{g.fillStyle='#21497e';g.fillRect(0,0,w,h);g.strokeStyle='rgba(255,255,255,.13)';g.lineWidth=2;
  for(let x=0;x<=w;x+=32){g.beginPath();g.moveTo(x,0);g.lineTo(x,h);g.stroke();}for(let y=0;y<=h;y+=32){g.beginPath();g.moveTo(0,y);g.lineTo(w,y);g.stroke();}
  g.strokeStyle='rgba(255,255,255,.75)';g.lineWidth=4;g.strokeRect(14,14,w-28,h-28);
  g.fillStyle='#ffffff';g.font='bold 78px Zilla Slab, Georgia, serif';g.textBaseline='middle';g.fillText(title,52,96);
  g.fillStyle='#ffd43b';g.font='bold 46px Atkinson Hyperlegible, Arial, sans-serif';g.fillText(sub,54,182);
  /* a little blueprint of the cart */
  g.strokeStyle='rgba(255,255,255,.85)';g.lineWidth=4;const x0=730,y0=88;g.strokeRect(x0,y0,190,62);g.beginPath();g.arc(x0+40,y0+80,20,0,7);g.stroke();g.beginPath();g.arc(x0+150,y0+80,20,0,7);g.stroke();
  g.setLineDash([10,8]);g.beginPath();g.moveTo(x0-40,y0+120);g.lineTo(x0+230,y0+120);g.stroke();g.setLineDash([]);
  g.beginPath();g.moveTo(x0+200,y0+31);g.lineTo(x0+262,y0+31);g.lineTo(x0+246,y0+19);g.moveTo(x0+262,y0+31);g.lineTo(x0+246,y0+43);g.stroke();});}

/* ---------- parts ---------- */
const box=(w,h,d,c,sh)=>mk(G('fl_b'+w+'_'+h+'_'+d,()=>new THREE.BoxGeometry(w,h,d)),lam(c),sh==null?20:sh);
const cyl=(r,h,c,n)=>mk(G('fl_c'+r+'_'+h+'_'+(n||24),()=>new THREE.CylinderGeometry(r,r,h,n||24)),lam(c),20);
const sph=(r,c)=>mk(G('fl_s'+r,()=>new THREE.SphereGeometry(r,20,14)),lam(c),20);
/* a coil spring one unit long along +x; scale.x stretches it */
function coil(r,turns,wire,c){const geo=G('fl_coil'+r+turns+wire,()=>{const pts=[];const N=turns*24;for(let i=0;i<=N;i++){const a=i/N*turns*Math.PI*2;pts.push(new THREE.Vector3(i/N,Math.sin(a)*r,Math.cos(a)*r));}
  return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts),N*2,wire,6,false);});return mk(geo,lam(c||'#c9d1db'),0);}
function flatArrow(col){const g=new THREE.Group();const geo=G('fl_head',()=>{const s=new THREE.Shape();s.moveTo(0,-.17);s.lineTo(.3,0);s.lineTo(0,.17);s.lineTo(0,-.17);const e=new THREE.ExtrudeGeometry(s,{depth:.05,bevelEnabled:false});e.rotateX(-Math.PI/2);return e;});
  const wgeo=G('fl_headW',()=>{const s=new THREE.Shape();s.moveTo(-.04,-.23);s.lineTo(.37,0);s.lineTo(-.04,.23);s.lineTo(-.04,-.23);const e=new THREE.ExtrudeGeometry(s,{depth:.04,bevelEnabled:false});e.rotateX(-Math.PI/2);return e;});
  const shaftW=box(1,.04,.18,'#ffffff',0),shaft=box(1,.05,.1,col,0),headW=mk(wgeo,lam('#ffffff'),0),head=mk(geo,lam(col),0);
  shaftW.position.y=-.012;headW.position.y=-.012;[shaftW,shaft,headW,head].forEach(m=>g.add(m));
  let L=0;g.userData.len=v=>{L=Math.max(0,v);const s=Math.max(.001,L-.28);shaft.scale.x=shaftW.scale.x=s;shaft.position.x=shaftW.position.x=s/2;head.position.x=headW.position.x=s;g.visible=L>.02;const k=Math.min(1,L/.35);head.scale.set(k,1,k);headW.scale.set(k,1,k);};
  g.userData.len(0);return g;}

function makeCart(col){const g=new THREE.Group();const body=new THREE.Group();g.add(body);
  const base=box(.62,.15,.38,col);base.position.y=.275;body.add(base);
  const deck=box(.5,.03,.3,C.cartD);deck.position.y=.365;body.add(deck);
  const load=box(.22,.14,.2,'#4dabf7');load.position.set(-.05,.45,0);body.add(load);
  const tagS=label('1',{size:.15,color:'#ffffff',bg:C.navy,border:C.navy});tagS.position.set(-.05,.62,0);body.add(tagS);
  [-1,1].forEach(s=>{const pad=box(.04,.11,.32,C.red);pad.position.set(s*(HL-.02),.27,0);body.add(pad);
    const hook=mk(G('fl_hook',()=>new THREE.TorusGeometry(.035,.012,8,16)),lam(C.steelD),0);hook.position.set(s*(HL+.02),.3,0);body.add(hook);});
  const wheels=[];[-1,1].forEach(sx=>[-1,1].forEach(sz=>{const w=new THREE.Group();w.position.set(sx*.19,TY+WR,sz*.2);
    const tire=cyl(WR,.05,'#2b2f36');tire.rotation.x=Math.PI/2;w.add(tire);const hub=cyl(.045,.056,'#e9ecef',16);hub.rotation.x=Math.PI/2;w.add(hub);
    const sp=box(.016,.13,.06,'#ffffff',0);sp.position.z=sz*.006;w.add(sp);g.add(w);wheels.push(w);}));
  g.userData={body,wheels};return g;}

/* a straight test track along x, from x0 to x1, at depth z */
function track(root,x0,x1,z,o){o=o||{};const L=x1-x0,cx=(x0+x1)/2;const g=new THREE.Group();g.position.z=z;root.add(g);
  const plank=box(L+.3,.06,.56,C.plank);plank.position.set(cx,.03,0);g.add(plank);
  [-1,1].forEach(s=>{const r=box(L+.2,.04,.04,C.steel);r.position.set(cx,.08,s*.2);g.add(r);});
  if(o.ruler!==false){const n=o.marks||10;const pl=mk(G('fl_rul'+L,()=>{const p=new THREE.PlaneGeometry(L,.2);p.rotateX(-Math.PI/2);return p;}),new THREE.MeshLambertMaterial({map:rulerTex(n)}),0);pl.position.set(cx,.062,.41);g.add(pl);
    const strip=box(L+.3,.06,.26,'#ffffff');strip.position.set(cx,.029,.41);g.add(strip);}
  return g;}

/* the spring launcher: a housing, a coil and a push plate; plate x is its face */
function launcher(root,x,z){const g=new THREE.Group();g.position.set(0,0,z);root.add(g);
  const house=box(.26,.26,.34,C.navy);house.position.set(x-.13,.19,0);g.add(house);
  const lip=box(.3,.04,.38,'#30476a');lip.position.set(x-.13,.33,0);g.add(lip);
  const foot=box(.36,.06,.44,'#30476a');foot.position.set(x-.13,.03,0);g.add(foot);
  const sp=coil(.07,7,.012,'#cfd6df');sp.position.set(x,.26,0);g.add(sp);
  const plate=new THREE.Group();g.add(plate);const pl=box(.05,.2,.28,C.red);pl.position.y=.26;plate.add(pl);
  const rod=cyl(.018,.5,C.steelD,10);rod.rotation.z=Math.PI/2;rod.position.set(-.25,.26,0);plate.add(rod);
  const knob=sph(.06,C.red);knob.position.set(-.5,.26,0);plate.add(knob);
  const face=x,rest=x+.45;const L={g,face,rest,p:rest,v:0,mode:'rest',touch:false,
    set(p){L.p=p;plate.position.x=p-.025;sp.scale.x=Math.max(.04,p-.05-face);},
    hit:[house,pl,knob]};L.set(rest);return L;}

/* the spring bumper at the end of a track; its pad face is at x */
function bumper(root,x,z){const g=new THREE.Group();g.position.z=z;root.add(g);
  const post=box(.14,.34,.4,C.navy);post.position.set(x+.27,.17,0);g.add(post);
  const sp=coil(.06,5,.012,'#cfd6df');g.add(sp);const pad=box(.05,.18,.3,'#ffd43b');g.add(pad);
  const B={x,pen:0,set(pen){B.pen=pen;const px=x+pen;pad.position.set(px+.025,.25,0);sp.position.set(px+.05,.25,0);sp.scale.x=Math.max(.03,x+.2-px-.05);}};B.set(0);return B;}

/* a hand winch: drum + crank; the string leaves the drum toward the cart */
function winch(root,x,z,side){const g=new THREE.Group();g.position.set(x,0,z);root.add(g);
  [-1,1].forEach(s=>{const up=box(.06,.34,.06,C.navy);up.position.set(0,.17,s*.17);g.add(up);});const ft=box(.24,.05,.46,'#30476a');ft.position.y=.025;g.add(ft);
  const drum=new THREE.Group();drum.position.y=.3;g.add(drum);const d=cyl(.09,.26,'#ced4da',24);d.rotation.x=Math.PI/2;drum.add(d);
  const band=box(.02,.185,.27,'#495057',0);drum.add(band);
  const arm=box(.04,.22,.03,C.red);arm.position.set(0,.11,.2);drum.add(arm);const hd=cyl(.025,.12,'#ffd43b',12);hd.rotation.x=Math.PI/2;hd.position.set(0,.21,.26);drum.add(hd);
  const W={g,drum,x,side,r:.09,a:0,turn(da){W.a+=da;drum.rotation.z=W.a*side;}};return W;}

/* a thin string between two points (on the xz plane at height y) */
function string(root,col){const m=box(1,.012,.012,col||'#495057',0);root.add(m);m.userData.span=(x0,x1,y,z)=>{const L=Math.abs(x1-x0);m.visible=L>.01;m.scale.x=Math.max(.001,L);m.position.set((x0+x1)/2,y,z);};return m;}

/* a force meter (spring scale): clear tube, inner spring, red marker, big reading */
function meter(root,dir){const g=new THREE.Group();root.add(g);
  const tube=mk(G('fl_tube',()=>{const c=new THREE.CylinderGeometry(.075,.075,.62,20,1,true);c.rotateZ(Math.PI/2);c.translate(.31,0,0);return c;}),new THREE.MeshLambertMaterial({color:'#d0ebff',transparent:true,opacity:.42,side:THREE.DoubleSide,depthWrite:false}),0);tube.position.y=.3;g.add(tube);
  const cap=cyl(.08,.03,C.navy,20);cap.rotation.z=Math.PI/2;cap.position.set(0,.3,0);g.add(cap);const cap2=cap.clone();cap2.position.x=.62;g.add(cap2);
  for(let i=0;i<=5;i++){const t=box(.01,.012,.05,C.ink,0);t.position.set(.12+i*.08,.385,0);g.add(t);}
  const sp=coil(.045,8,.008,'#868e96');sp.position.set(.02,.3,0);g.add(sp);const mark=cyl(.06,.02,'#e03131',18);mark.rotation.z=Math.PI/2;mark.position.y=.3;g.add(mark);
  const rod=box(1,.014,.014,C.steelD,0);rod.position.y=.3;g.add(rod);
  const read=label('0',{size:.2,color:'#ffffff',bg:'#e03131',border:'#c92a2a'});read.position.set(.31,.62,0);g.add(read);
  const M={g,f:0,shown:-1,set(f){M.f=f;const s=.08+f*.08;sp.scale.x=s;mark.position.x=.02+s;rod.scale.x=Math.max(.001,.6-s);rod.position.x=.02+s+(.6-s)/2+.02;const n=Math.round(f);if(n!==M.shown){M.shown=n;read.userData.set(String(n));}}};
  if(dir<0)g.rotation.y=Math.PI;M.set(0);return M;}

/* a pop-in label and a flag pin for "how far" */
function pop(sp,dur){const s0=sp.scale.clone();sp.scale.multiplyScalar(.01);let t=0;return dt=>{if(t>dur)return true;t+=dt;const k=MO.spring(t,{stiffness:260,damping:14});sp.scale.set(s0.x*k,s0.y*k,1);return t>dur;};}
function pin(root,x,z,txt,col){const g=new THREE.Group();g.position.set(x,0,z);root.add(g);const p=cyl(.012,.5,'#495057',8);p.position.y=.25;g.add(p);
  const f=box(.2,.12,.012,col,0);f.position.set(.1,.43,0);g.add(f);const L=label(txt,{size:.2,color:'#ffffff',bg:col,border:col});L.position.set(0,.68,0);g.add(L);return g;}

/* ---------- the rig: one test bench, its clock and the narration sync ---------- */
function rig(sc,o){o=o||{};const root=new THREE.Group();root.position.z=-sc.g.position.z+(o.z||0);if(o.s)root.scale.setScalar(o.s);sc.g.add(root);
  const R={root,T:0,jobs:[],cues:[],sims:[],acc:0,alive:()=>!!root.parent};
  /* narration sync, the same way the engine times its own cues: by how far through the recording we are */
  const speech=String(o.speech||'');const low=speech.toLowerCase();let quiet=0,t0=null;
  const chAt=()=>{const vn=P.voiceNow&&P.voiceNow();if(vn&&window.VOICE){const hx=String(vn.h);const dur=VOICE[hx];if(dur){t0=null;return vn.t/Math.max(.5,dur)*speech.length*1.04+2;}}
    if(t0==null)t0=R.T;return (R.T-t0)>1.8?(R.T-t0-1.2)*13:-1;};
  R.cue=(w,f,nth)=>{let i=-1,at=0;for(let k=0;k<(nth||1);k++){i=low.indexOf(String(w).toLowerCase(),at);if(i<0)break;at=i+1;}R.cues.push({i:i<0?0:i,f});R.cues.sort((a,b)=>a.i-b.i);return R;};
  R.after=(s,f)=>{R.jobs.push({at:R.T+s,f});};
  R.anim=(dur,f,ease)=>new Promise(res=>{const t0=R.T;R.sims.push(dt=>{const k=clamp((R.T-t0)/dur,0,1);f(ease?ease(k):k);if(k>=1){res();return true;}return false;});});
  R.every=f=>R.sims.push(f);
  sc.tick(dt=>{if(!root.parent)return;dt=Math.min(dt,.1);R.T+=dt;
    if(R.cues.length){const ch=chAt();while(R.cues.length&&R.cues[0].i<=ch){const q=R.cues.shift();try{q.f();}catch(e){console.error(e);}}}
    for(let i=R.jobs.length-1;i>=0;i--)if(R.jobs[i].at<=R.T){const j=R.jobs.splice(i,1)[0];try{j.f();}catch(e){console.error(e);}}
    R.acc+=dt;while(R.acc>=H){R.acc-=H;R.phys.forEach(f=>f(H));}
    for(let i=R.sims.length-1;i>=0;i--){let done=false;try{done=R.sims[i](dt);}catch(e){console.error(e);done=true;}if(done)R.sims.splice(i,1);}});
  R.phys=[];
  /* the lab: a grid mat and a blueprint board at the back */
  const mat=mk(G('fl_mat'+(o.matD||3.3),()=>{const s=new THREE.Shape();const w=4.3,d=o.matD||3.3,r=.18,x=-w/2,y=-d/2;s.moveTo(x+r,y);s.lineTo(x+w-r,y);s.quadraticCurveTo(x+w,y,x+w,y+r);s.lineTo(x+w,y+d-r);s.quadraticCurveTo(x+w,y+d,x+w-r,y+d);s.lineTo(x+r,y+d);s.quadraticCurveTo(x,y+d,x,y+d-r);s.lineTo(x,y+r);s.quadraticCurveTo(x,y,x+r,y);
    const g=new THREE.ShapeGeometry(s,6);const uv=g.attributes.uv;for(let i=0;i<uv.count;i++)uv.setXY(i,uv.getX(i)/.5,uv.getY(i)/.5);g.rotateX(-Math.PI/2);return g;}),
    new THREE.MeshLambertMaterial({map:(()=>{const t=gridTex();t.wrapS=t.wrapT=THREE.RepeatWrapping;return t;})()}),0);mat.position.set(0,.014,o.matZ||0);root.add(mat);
  if(o.board){const b=box(3.7,.95,.06,'#1b3a63');b.position.set(0,.56,o.boardZ||-1.5);root.add(b);
    const face=mk(G('fl_bface',()=>new THREE.PlaneGeometry(3.6,.9)),new THREE.MeshBasicMaterial({map:boardTex(o.board[0],o.board[1])}),0);face.position.set(0,.56,(o.boardZ||-1.5)+.032);root.add(face);
    [-1.6,1.6].forEach(x=>{const l=box(.06,.12,.3,'#1b3a63');l.position.set(x,.06,(o.boardZ||-1.5));root.add(l);});}
  return R;}

/* a cart that rolls on its track: friction, a spring bumper, wheels that roll exactly */
function rollCart(R,tr,x,z,col){const cart=makeCart(col||C.cart);cart.position.set(x,0,z);R.root.add(cart);
  const K={g:cart,x,v:0,drive:null,bump:null,minX:-9,maxX:9,lean:0,leanV:0,lastV:0,
    roll(dx){cart.userData.wheels.forEach(w=>{w.rotation.z-=dx/WR;});},
    step(h){const x0=K.x;let a=0;
      if(K.drive){K.x=K.drive(h);}
      else{if(K.v!==0){const dv=MU*h;K.v=Math.abs(K.v)<=dv?0:K.v-Math.sign(K.v)*dv;}
        if(K.push)a+=K.push();
        if(K.bump){const pen=K.x+HL-K.bump.x;if(pen>0){a+=-320*pen-(K.v>0?5:9)*K.v;}K.bump.set(Math.max(0,pen));}
        K.v+=a*h;K.x+=K.v*h;}
      K.x=clamp(K.x,K.minX,K.maxX);const vNow=(K.x-x0)/h;const acc=(vNow-K.lastV)/h;K.lastV=vNow;
      /* the body leans back when it speeds up and forward when it slows (a soft spring) */
      const target=clamp(-acc*.005,-.06,.06);K.leanV+=((target-K.lean)*220-K.leanV*22)*h;K.lean+=K.leanV*h;
      cart.position.x=K.x;cart.userData.body.rotation.z=K.lean;cart.userData.body.position.y=Math.abs(K.lean)*.25;K.roll(K.x-x0);}};
  R.phys.push(K.step);return K;}

/* launcher + cart contact: while the plate touches the cart they move together; they part when the spring stops pushing */
const KP=62,MP=.25;
function link(R,L,K){L.mode='rest';R.phys.push(h=>{if(L.mode==='held')return;
  if(L.mode==='free'){const touching=L.p>=K.x-HL-.001;const f=KP*(L.rest-L.p)-1.4*L.v;
    if(touching&&f>0){const a=(f-MU*1)/(MP+1);L.v=Math.max(L.v,K.v)+a*h;K.v=L.v;L.p+=L.v*h;K.x=L.p+HL;L.touch=true;}
    else{L.v+=(f/MP)*h;L.p+=L.v*h;if(L.p>K.x-HL&&K.drive==null){L.p=K.x-HL;}if(L.touch&&Math.abs(L.p-L.rest)<.002&&Math.abs(L.v)<.02){L.p=L.rest;L.v=0;L.mode='rest';}}
    L.set(L.p);}});}
/* wind the launcher back by c (with ratchet clicks), then hold */
function load(R,L,c,dur){if(L.mode==='held'||L.loading)return Promise.resolve();L.loading=true;L.mode='held';const p0=L.p;let clicks=-1;
  return R.anim(dur||.9,k=>{L.set(p0-c*k);const n=Math.floor(k*5);if(n>clicks){clicks=n;if(n>0&&P.kNote)P.kNote(n-1);}},E.inOutCubic).then(()=>{L.loading=false;L.v=0;});}
function fire(L){if(L.mode!=='held'||L.loading)return false;L.mode='free';L.v=0;L.touch=false;A.pop&&A.pop();return true;}

/* a force arrow that rides above a cart; its length eases to the force with a spring */
function forceArrow(R,col,txt,o){o=o||{};const g=new THREE.Group();R.root.add(g);const ar=flatArrow(col);g.add(ar);const L=label(txt,{size:.2,color:'#ffffff',bg:col,border:col});L.position.set(0,.36,0);g.add(L);L.visible=false;
  const F={g,len:0,to:0,t:0,from:0,dir:1,show(len,dir){F.from=F.len;F.to=len;F.t=0;if(dir)F.dir=dir;if(len>0&&!L.visible){L.visible=true;R.every(pop(L,.8));}if(len<=0)L.visible=false;},
    at(x,y,z){g.position.set(x,y,z);}};
  R.every(dt=>{F.t+=dt;F.len=MO.spring(F.t,{from:F.from,to:F.to,stiffness:170,damping:15});ar.userData.len(Math.max(0,F.len));ar.scale.x=F.dir;L.position.x=F.dir*Math.max(.2,F.len*.4);return !R.alive();});return F;}

/* ===================== Learn steps ===================== */
const SAY={
  lab:'Welcome to the Force Lab! A force is a push or a pull. Watch the test cart. A push makes it start moving. The spring bumper makes it change direction. Then the track slows it down until it stops.',
  push:'A push moves something away from you. Load the spring launcher. Let it go, and the spring pushes the cart away. The orange arrow shows the push.',
  pull:'A pull moves something toward you. Turn the crank. The string winds up and pulls the cart toward the winch. The blue arrow shows the pull.',
  size:'A gentle push moves the cart a little. A strong push sends it far and fast. The bigger the force, the farther the cart goes.',
  bal:'Two motors pull the cart in opposite directions. Equal pulls are balanced, so the cart stays still. Now the right motor pulls harder, and the cart moves to the right.'};

/* tap the launcher (or the cart) to run the test again */
function tapRelaunch(R,L,K,c,before){const go=()=>{if(L.mode!=='rest'||K.v!==0||L.loading)return;if(before)before();load(R,L,c,.6).then(()=>R.after(.15,()=>fire(L)));};
  L.hit.concat([K.g]).forEach(m=>A.drag(m,{tap:go}));return go;}

function stepLab(sc){const R=rig(sc,{speech:SAY.lab,board:['FORCE LAB','Test 1: start, turn, stop'],matD:3.6,matZ:-.15});
  const z=-.1;track(R.root,-1.95,1.95,z);const L=launcher(R.root,-1.7,z);const B=bumper(R.root,1.86,z);const K=rollCart(R,null,L.rest+HL,z);K.bump=B;link(R,L,K);
  const ar=forceArrow(R,C.push,'push');R.every(()=>{ar.at(K.x-HL-.05,.72,z);return !R.alive();});
  const evt=(txt,col)=>{const p=pin(R.root,K.x,z-.42,txt,col);R.every(pop(p.children[2],.8));};
  let phase=0;R.every(()=>{ /* mark the moments: start, change direction, stop */
    if(phase===1&&K.v>.3){phase=2;}
    if(phase===2&&B.pen>.02){phase=3;evt('turn',C.blue);A.pop&&A.pop();}
    if(phase===3&&K.v<0&&B.pen===0){phase=4;}
    if(phase===4&&K.v===0){phase=5;evt('stop','#e03131');if(P.kNote)P.kNote(7);}return !R.alive();});
  R.cue('watch',()=>load(R,L,.35,1.1));
  R.cue('start',()=>{const go=()=>{if(fire(L)){phase=1;ar.show(.75,1);evt('start',C.green);R.after(.7,()=>ar.show(0));}else R.after(.05,go);};go();});
  tapRelaunch(R,L,K,.35,()=>{K.x=L.rest+HL;});
  return {};}

function stepPush(sc){const R=rig(sc,{speech:SAY.push,board:['FORCE LAB','Test 2: a push'],matZ:-.1});
  const z=-.1;track(R.root,-1.95,1.95,z);const L=launcher(R.root,-1.7,z);const B=bumper(R.root,1.86,z);const K=rollCart(R,null,L.rest+HL,z);K.bump=B;link(R,L,K);
  const ar=forceArrow(R,C.push,'push');let follow=false;R.every(()=>{ar.at((follow?K.x:L.rest+HL)-HL-.05,.72,z);return !R.alive();});
  const away=label('away',{size:.2,color:C.push,bg:'#fff4e6',border:C.push});away.visible=false;away.position.set(.25,.95,z);R.root.add(away);
  R.cue('load',()=>load(R,L,.25,1.0));
  R.cue('go,',()=>{const go=()=>{if(fire(L)){follow=true;ar.show(.95,1);R.after(.5,()=>{away.visible=true;R.every(pop(away,.8));});}else R.after(.05,go);};go();});
  R.cue('orange arrow',()=>{ar.show(1.25,1);R.after(1.6,()=>ar.show(.95,1));});
  tapRelaunch(R,L,K,.25,()=>{K.x=L.rest+HL;});return {};}

function stepPull(sc){const R=rig(sc,{speech:SAY.pull,board:['FORCE LAB','Test 3: a pull'],matZ:-.1});
  const z=-.1;track(R.root,-1.95,1.95,z);const W=winch(R.root,1.95,z,1);const K=rollCart(R,null,-1.05,z);const str=string(R.root);
  const ar=forceArrow(R,C.pull,'pull');R.every(()=>{ar.at(K.x+HL+.05,.72,z);str.userData.span(K.x+HL+.03,W.x-W.r,.3,z);return !R.alive();});
  const toward=label('toward the winch',{size:.2,color:C.pull,bg:'#e7f5ff',border:C.pull});toward.visible=false;toward.position.set(.2,.95,z);R.root.add(toward);
  let winding=false;const crank=(dist,dur)=>{if(winding)return;winding=true;const x0=K.x,a0=W.a;let last=0;
    K.drive=()=>K.x;R.anim(dur,k=>{const d=dist*k;K.x=x0+d;W.turn((d-last)/W.r);last=d;},E.inOutSine).then(()=>{K.drive=null;K.v=0;winding=false;ar.show(0);});
    ar.show(.9,1);};
  R.cue('turn',()=>crank(1.6,3.2));
  R.cue('toward the winch',()=>{toward.visible=true;R.every(pop(toward,.8));});
  R.cue('blue arrow',()=>{ar.show(1.2,1);R.after(1.4,()=>ar.show(winding?.9:0,1));});
  [W.drum.children[0],K.g].forEach(m=>A.drag(m,{tap:()=>{if(winding)return;if(K.x>.4){const x0=K.x;K.drive=()=>K.x;R.anim(1.2,k=>{const nx=x0+(-1.05-x0)*k;W.turn((nx-K.x)/W.r);K.x=nx;},E.inOutCubic).then(()=>{K.drive=null;crank(1.6,3.0);});}else crank(1.6,3.0);}}));
  return {};}

function stepSize(sc){const R=rig(sc,{speech:SAY.size,board:['FORCE LAB','Test 4: gentle or strong?'],matD:3.9,matZ:-.25,boardZ:-1.95});
  const lanes=[{z:-1.0,c:.1,col:'#69db7c',name:'gentle',ac:'#2f9e44'},{z:.45,c:.28,col:C.cart,name:'strong',ac:C.push}];
  lanes.forEach(ln=>{track(R.root,-1.95,1.95,ln.z);ln.L=launcher(R.root,-1.7,ln.z);ln.B=bumper(R.root,1.86,ln.z);ln.K=rollCart(R,null,ln.L.rest+HL,ln.z,ln.col);ln.K.bump=ln.B;link(R,ln.L,ln.K);
    ln.ar=forceArrow(R,ln.ac,ln.name);ln.start=ln.K.x;R.every(()=>{ln.ar.at(ln.start-HL-.05,.72,ln.z);return !R.alive();});
    ln.state=0;R.every(()=>{if(ln.state===1&&ln.K.v===0&&ln.L.mode!=='held'&&ln.K.x>ln.start+.05){ln.state=2;const d=ln.K.x-ln.start;const p=pin(R.root,ln.K.x+HL,ln.z-.4,Math.max(1,Math.round(d/.39))+(Math.round(d/.39)>1?' marks':' mark'),ln.ac);R.every(pop(p.children[2],.8));if(P.kNote)P.kNote(ln.name==='strong'?8:3);}return !R.alive();});});
  const [g,s]=lanes;const go=(ln,c)=>{const f=()=>{if(fire(ln.L)){ln.state=1;ln.ar.show(ln.name==='strong'?1.15:.45,1);}else R.after(.05,f);};f();};
  R.after(.2,()=>load(R,g.L,g.c,.8));
  R.cue('gentle',()=>go(g));
  R.cue('strong push',()=>load(R,s.L,s.c,.7).then(()=>go(s)));
  R.cue('bigger the force',()=>{lanes.forEach(ln=>{const to=ln.name==='strong'?1.4:.55;ln.ar.show(to,1);});});
  lanes.forEach(ln=>tapRelaunch(R,ln.L,ln.K,ln.c,()=>{ln.K.x=ln.start;ln.state=1;ln.ar.show(ln.name==='strong'?1.15:.45,1);}));
  return {};}

function stepBalance(sc){const R=rig(sc,{speech:SAY.bal,board:['FORCE LAB','Test 5: balanced forces'],matZ:-.1});
  const z=-.1;track(R.root,-1.95,1.95,z);const WL=winch(R.root,-2.0,z,-1),WR2=winch(R.root,2.0,z,1);
  const K=rollCart(R,null,0,z);const mL=meter(R.root,-1),mR=meter(R.root,1);const sL=string(R.root),sR=string(R.root);
  const aL=forceArrow(R,C.pull,'pull'),aR=forceArrow(R,C.pull,'pull');
  let fL=0,fR=0,tl=0,tr=0,want=[0,0];const lenL=()=>.62,lenR=()=>.62;
  const ease=(cur,to,h)=>cur+(to-cur)*Math.min(1,h*4.5);
  R.phys.push(h=>{fL=ease(fL,want[0],h);fR=ease(fR,want[1],h);const net=(fR-fL);
    /* static friction holds the cart while the pulls are nearly equal */
    if(K.v===0&&Math.abs(net)<.6){K.push=null;}else{K.push=()=>net*.7;}});
  R.every(()=>{mL.set(fL);mR.set(fR);mL.g.position.set(K.x-HL-.03,0,z);mR.g.position.set(K.x+HL+.03,0,z);
    const eL=K.x-HL-.03-.62,eR=K.x+HL+.03+.62;sL.userData.span(WL.x+WL.r,eL,.3,z);sR.userData.span(eR,WR2.x-WR2.r,.3,z);
    if(tl!==eL){if(tl)WL.turn((eL-tl)/WL.r);tl=eL;}if(tr!==eR){if(tr)WR2.turn((tr-eR)/WR2.r);tr=eR;}
    aL.at(K.x-.05,.95,z);aR.at(K.x+.05,.95,z);aL.dir=-1;return !R.alive();});
  const badge=label('balanced',{size:.24,color:'#ffffff',bg:C.green,border:C.green});badge.visible=false;badge.position.set(0,1.35,z);R.root.add(badge);
  R.cue('two motors',()=>{want=[3,3];aL.show(.75,-1);aR.show(.75,1);});
  R.cue('balanced',()=>{badge.visible=true;R.every(pop(badge,.8));if(P.kNote)P.kNote(4);});
  R.cue('harder',()=>{badge.visible=false;want=[3,5.2];aR.show(1.3,1);R.after(1.2,()=>{want=[3,3];aR.show(.75,1);});});
  return {};}

/* ===================== Practice scenes ===================== */
/* a compact bench at the back of the page; the question cards sit in front of it */
function bench(sc,title){return rig(sc,{s:.72,z:-2.35,matD:1.7,board:null});}
const CHEER=(R,K)=>{if(P.kFx)P.kFx(false);};
/* reach the green zone: far (needs a strong push) or near (needs a gentle one) */
function launchRound(far){return sc=>{const R=bench(sc);const z=0;track(R.root,-2.2,2.2,z);const L=launcher(R.root,-1.95,z);const B=bumper(R.root,2.11,z);const K=rollCart(R,null,L.rest+HL,z);K.bump=B;link(R,L,K);
  const zx=far?1.35:-.35;const zone=box(.8,.012,.56,'#8ce99a',0);zone.position.set(zx,.105,z);R.root.add(zone);const fl=pin(R.root,zx,z-.36,'goal',C.green);fl.scale.setScalar(1.15);
  const ok=far?.3:.17,no=far?.17:.38;const test=c=>{if(L.mode!=='rest'||K.v!==0)return 0;K.x=L.rest+HL;load(R,L,c,.7).then(()=>R.after(.15,()=>fire(L)));return 1;};
  return {win(){test(ok);R.after(.6,()=>CHEER(R,K));return 4200;},miss(){test(no);},hold:4200};};}
/* predict the motion of the tug test */
function tugRound(l,r){return sc=>{const R=bench(sc);const z=0;track(R.root,-2.1,2.1,z,{ruler:false});const WL=winch(R.root,-2.2,z,-1),WR2=winch(R.root,2.2,z,1);
  const K=rollCart(R,null,0,z);const mL=meter(R.root,-1),mR=meter(R.root,1);const sL=string(R.root),sR=string(R.root);let fL=0,fR=0,want=[l,r],tl=0,tr=0,go=false;
  R.phys.push(h=>{fL+=(want[0]-fL)*Math.min(1,h*4);fR+=(want[1]-fR)*Math.min(1,h*4);const net=fR-fL;K.push=(go&&Math.abs(net)>.6)?()=>net*.5:null;if(!go&&K.v)K.v=0;});
  R.every(()=>{mL.set(fL);mR.set(fR);mL.g.position.set(K.x-HL-.03,0,z);mR.g.position.set(K.x+HL+.03,0,z);const eL=K.x-HL-.65,eR=K.x+HL+.65;sL.userData.span(WL.x+WL.r,eL,.3,z);sR.userData.span(eR,WR2.x-WR2.r,.3,z);
    if(tl)WL.turn((eL-tl)/WL.r);tl=eL;if(tr)WR2.turn((tr-eR)/WR2.r);tr=eR;return !R.alive();});
  return {win(){go=true;R.after(1.6,()=>{want=[Math.min(l,r),Math.min(l,r)];});R.after(.8,()=>CHEER(R,K));if(l===r){K.g.userData.body.rotation.z=0;}return 3600;},miss(){const s=K.g.position.x;R.anim(.5,k=>{K.g.position.x=s+Math.sin(k*Math.PI*4)*.04*(1-k);});},hold:3600};};}
/* push or pull devices */
function deviceRound(kind){return sc=>{const R=bench(sc);const z=0;track(R.root,-2.2,2.2,z);
  if(kind==='push'){const L=launcher(R.root,-1.95,z);const B=bumper(R.root,2.11,z);const K=rollCart(R,null,L.rest+HL,z);K.bump=B;link(R,L,K);R.after(.4,()=>load(R,L,.28,.9));
    return {win(){fire(L);R.after(.5,()=>CHEER());return 3400;},miss(){},hold:3400};}
  const W=winch(R.root,2.2,z,1);const K=rollCart(R,null,-1.4,z);const str=string(R.root);R.every(()=>{str.userData.span(K.x+HL+.03,W.x-W.r,.3,z);return !R.alive();});
  return {win(){const x0=K.x;let last=0;K.drive=()=>K.x;R.anim(2.4,k=>{const d=2.4*k;K.x=x0+d;W.turn((d-last)/W.r);last=d;},E.inOutSine).then(()=>{K.drive=null;});R.after(.5,()=>CHEER());return 3400;},miss(){},hold:3400};};}
/* the plain lab: the cart does a little test run when you are right */
function labRound(){return sc=>{const R=bench(sc);const z=0;track(R.root,-2.2,2.2,z);const L=launcher(R.root,-1.95,z);const B=bumper(R.root,2.11,z);const K=rollCart(R,null,L.rest+HL,z);K.bump=B;link(R,L,K);
  return {win(){load(R,L,.3,.6).then(()=>R.after(.1,()=>fire(L)));R.after(.6,()=>CHEER());return 3000;},miss(){const s=K.g.position.x;R.anim(.5,k=>{K.g.position.x=s+Math.sin(k*Math.PI*4)*.04*(1-k);});},hold:3000};};}
/* force meter reading */
function meterRound(){return sc=>{const R=bench(sc);const z=0;const W=winch(R.root,1.6,z,1);const post=box(.16,.5,.4,C.navy);post.position.set(-1.6,.25,z);R.root.add(post);
  const m=meter(R.root,1);m.g.position.set(-1.0,0,z);const s1=string(R.root),s2=string(R.root);let f=0,want=0;
  R.every(dt=>{f+=(want-f)*Math.min(1,dt*3);m.set(f);s1.userData.span(-1.52,-1.0,.3,z);s2.userData.span(-1.0+.62,W.x-W.r,.3,z);return !R.alive();});
  R.after(.3,()=>{want=2;});return {win(){want=5;R.anim(1.2,k=>W.turn(.02));R.after(.5,()=>CHEER());return 3000;},miss(){},hold:3000};};}

P.LAB9={SAY,steps:{lab:stepLab,push:stepPush,pull:stepPull,size:stepSize,bal:stepBalance},
  rounds:{far:launchRound(true),near:launchRound(false),tugR:tugRound(3,5),tugEq:tugRound(4,4),push:deviceRound('push'),pull:deviceRound('pull'),lab:labRound(),meter:meterRound()}};
})();
