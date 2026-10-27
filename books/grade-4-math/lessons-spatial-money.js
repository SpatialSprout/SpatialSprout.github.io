/* The Interactive Classroom: Grade 4 Math — Spatial Sense (21–26) and Financial Literacy (27–28) */
(function(){
"use strict";
const P=window.PM;if(!P||P.failed||!P.THREE)return;
const {THREE,V,W,D,PY,PX,X0,TW,INK,RED,BLUE,GREY,VIBE,FT,ZS,G,M,lam,mk,unitBox,cellMat,label,starGeo,wedgeGeo,clearGroup,disposeObj,rr,T,wrap,para,header,keyWords,predict,box,caption,cxOf,cyOf,tint,moveTo,hop,tween,burst,easeOut,easeIO,A}=P;
const acc=()=>P.ACC;
const rnd=(a,b)=>a+Math.floor(Math.random()*(b-a+1)),pick=a=>a[Math.floor(Math.random()*a.length)],shuffle=a=>a.slice().sort(()=>Math.random()-.5);
function choices(game,list,ans,ok,lab){return list.map(o=>({t:lab?lab(o):String(o),big:true,fn:()=>{if(o===ans)game.solved(ok);else A.bad('Not quite. Try again!');}}));}
function opts(ans,spread,min){const s=new Set([ans]);let k=0;while(s.size<3&&k<50){k++;const v=ans+pick(spread);if(v>=(min==null?0:min))s.add(v);}return shuffle([...s]);}

/* =========================================================
   21. Properties of rectangles
   ========================================================= */
const SHP={rectangle:{v:[[-1.1,-.65],[1.1,-.65],[1.1,.65],[-1.1,.65]],sym:[0,90],col:'#2f7de1'},square:{v:[[-.8,-.8],[.8,-.8],[.8,.8],[-.8,.8]],sym:[0,45,90,135],col:'#16a36f'},
  parallelogram:{v:[[-1.2,-.6],[.8,-.6],[1.2,.6],[-.8,.6]],sym:[],col:'#e4572e'},rhombus:{v:[[0,-.85],[1.1,0],[0,.85],[-1.1,0]],sym:[0,90],col:'#f08a24'},trapezoid:{v:[[-1.15,-.6],[1.15,-.6],[.6,.6],[-.6,.6]],sym:[90],col:'#8b5cf6'}};
const SN=Object.keys(SHP);
function props(k){const v=SHP[k].v,n=v.length;let right=0;const par=[];for(let i=0;i<n;i++){const a=v[(i+n-1)%n],b=v[i],c=v[(i+1)%n];const d1=[a[0]-b[0],a[1]-b[1]],d2=[c[0]-b[0],c[1]-b[1]];if(Math.abs(d1[0]*d2[0]+d1[1]*d2[1])<1e-6)right++;}
  for(let i=0;i<2;i++){const e1=[v[i+1][0]-v[i][0],v[i+1][1]-v[i][1]],e2=[v[(i+3)%4][0]-v[(i+2)%4][0],v[(i+3)%4][1]-v[(i+2)%4][1]];if(Math.abs(e1[0]*e2[1]-e1[1]*e2[0])<1e-6)par.push(i);}return {right,par,sym:SHP[k].sym.length};}
P.lesson({id:'rectangles',title:'Properties of rectangles',strand:'Spatial Sense',codes:['E1.1'],
 guide:{goal:'Identify the geometric properties of rectangles: four right angles, two pairs of parallel sides, perpendicular sides, and lines of symmetry, and compare rectangles with other quadrilaterals.',words:'rectangle, square, right angle, parallel, perpendicular, line of symmetry, quadrilateral',
  ask:['Is a square a rectangle? Why?','How can you check if two sides are parallel?','Why does a parallelogram have no lines of symmetry?'],home:'Hunt for rectangles at home: doors, books, screens. Check the corners with the corner of a sheet of paper.'},
 learn:[{say:'Rectangles have four right angles.',speech:'A rectangle has four right angles. On Kofi’s plan, opposite sides are parallel, and the sides that meet at a corner are perpendicular. Watch the marks appear.',view:'model',demo:'props'},
        {say:'Read the properties.',speech:'Parallel sides never meet. Perpendicular sides meet at a right angle. A line of symmetry folds a shape into two matching halves.',view:'read'},
        {say:'Watch: lines of symmetry.',speech:'A rectangle has two lines of symmetry. A square has four. Watch the mirror lines appear.',view:'model',demo:'sym'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: inspect the shapes.',speech:'Your turn. Tap a small shape to inspect it, then turn on right angles, parallel sides and lines of symmetry.',view:'model'}],
 fig:'A quadrilateral to inspect, and a row of shapes to choose from.',rz:.55,
 explore:['*Tap a small shape* to put it in the middle.','Turn on *right angles*, *parallel sides* and *symmetry*.','Compare a rectangle with the other shapes.'],
 tries:[['How many right angles does a rectangle have?','*4.*'],['How many lines of symmetry does a square have?','*4.*'],['Is a square a rectangle?','*Yes.* It has 4 right angles and 2 pairs of parallel sides. It is a special rectangle with equal sides.']],
 howTo:'Read the question. Tap a shape, or inspect shapes and choose the answer.',
 init:k=>({k:'rectangle',ra:true,par:false,sym:false,ask:null,want:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'A *rectangle* is a quadrilateral with *4 right angles*. Its opposite sides are *parallel* and the sides at each corner are *perpendicular*.')+16;
  const rx=X0+30,ry=y+20,rw=330,rh=200;g.lineWidth=6;[['#2f7de1',rx,ry,rx+rw,ry],['#e4572e',rx+rw,ry,rx+rw,ry+rh],['#2f7de1',rx+rw,ry+rh,rx,ry+rh],['#e4572e',rx,ry+rh,rx,ry]].forEach(([c,a,b,d,e])=>{g.strokeStyle=c;g.beginPath();g.moveTo(a,b);g.lineTo(d,e);g.stroke();});
  [[rx,ry,1,1],[rx+rw,ry,-1,1],[rx+rw,ry+rh,-1,-1],[rx,ry+rh,1,-1]].forEach(([x,yy,sx,sy])=>{g.strokeStyle=INK;g.lineWidth=2;g.strokeRect(Math.min(x,x+sx*22),Math.min(yy,yy+sy*22),22,22);});
  g.setLineDash([10,8]);g.strokeStyle='#16a36f';g.lineWidth=3;g.beginPath();g.moveTo(rx+rw/2,ry-20);g.lineTo(rx+rw/2,ry+rh+20);g.moveTo(rx-20,ry+rh/2);g.lineTo(rx+rw+20,ry+rh/2);g.stroke();g.setLineDash([]);
  [['4 right angles',INK],['blue sides are parallel','#2f7de1'],['orange sides are parallel','#e4572e'],['2 lines of symmetry','#16a36f']].forEach(([t,c],i)=>T(g,t,X0+420,y+50+i*48,FT.bodyB,c));y+=262;
  y=para(p,y,'A *square* is a special rectangle with 4 equal sides; it has *4* lines of symmetry. A *parallelogram* has parallel sides but no right angles.')+12;
  y=keyWords(p,y,[['parallel','lines that stay the same distance apart and never meet'],['perpendicular','lines that meet at a right angle']]);
  predict(p,y,S,'p21','How many lines of symmetry does a rectangle that is not a square have?','*2.* One across the middle and one down the middle. The diagonals are not lines of symmetry.');},
 readout(p,S,y){const g=p.g,st=S.st,pr=props(st.k);T(g,st.k[0].toUpperCase()+st.k.slice(1),X0,y+44,ZS(44),acc());
  T(g,pr.right+' right angles  ·  '+pr.par.length+' pair'+(pr.par.length===1?'':'s')+' of parallel sides  ·  '+pr.sym+' line'+(pr.sym===1?'':'s')+' of symmetry',X0,y+84,FT.bodyB);return y+94;},
 build(S,grp,mode,game){const st=S.st,C=V(0,0,-1.85);const big=new THREE.Group();big.position.copy(C);grp.add(big);
  function slab(k,sc){const s=new THREE.Shape();SHP[k].v.forEach(([x,z],i)=>i?s.lineTo(x*sc,-z*sc):s.moveTo(x*sc,-z*sc));s.closePath();const geo=new THREE.ExtrudeGeometry(s,{depth:.1,bevelEnabled:false});geo.rotateX(-Math.PI/2);return mk(geo,lam(SHP[k].col),20);}
  function seg(a,b,col,r){const len=a.distanceTo(b);const m=new THREE.Mesh(new THREE.CylinderGeometry(r,r,len,8),lam(col));m.position.copy(a).add(b).multiplyScalar(.5);m.quaternion.setFromUnitVectors(V(0,1,0),b.clone().sub(a).normalize());return m;}
  function drawBig(){clearGroup(big);const k=st.k,v=SHP[k].v,pr=props(k);const sl=slab(k,1);big.add(sl);
    const P3=v.map(([x,z])=>V(x,.13,z));
    if(st.par){const pc=['#2f7de1','#e4572e'];pr.par.forEach((i,j)=>{big.add(seg(P3[i],P3[i+1],pc[j],.035));big.add(seg(P3[(i+2)%4],P3[(i+3)%4],pc[j],.035));});}
    if(st.ra){for(let i=0;i<4;i++){const a=v[(i+3)%4],b=v[i],c=v[(i+1)%4];const d1=V(a[0]-b[0],0,a[1]-b[1]).normalize(),d2=V(c[0]-b[0],0,c[1]-b[1]).normalize();
      if(Math.abs(d1.dot(d2))<1e-6){const p0=P3[i].clone(),q1=p0.clone().addScaledVector(d1,.22),q2=p0.clone().addScaledVector(d2,.22),q3=q1.clone().addScaledVector(d2,.22);[seg(q1,q3,INK,.015),seg(q2,q3,INK,.015)].forEach(m=>big.add(m));}}}
    if(st.sym)SHP[k].sym.forEach(deg=>{const a=deg*Math.PI/180;const pl=new THREE.Mesh(new THREE.PlaneGeometry(3.0,.7),new THREE.MeshLambertMaterial({color:'#16a36f',transparent:true,opacity:.28,side:THREE.DoubleSide,depthWrite:false}));
      pl.position.set(0,.4,0);pl.rotation.y=a;big.add(pl);});
    A.redraw();}
  const row=new THREE.Group();grp.add(row);let rowKeys=SN.slice(0,4);
  function drawRow(){clearGroup(row);rowKeys.forEach((k,i)=>{const m=slab(k,.36);const g=new THREE.Group();g.add(m);g.position.set(-1.65+i*1.1,0,-.05);row.add(g);const l=label(k,{size:.15,color:INK});l.position.set(0,.3,.42);g.add(l);
      A.drag(g,{tap:()=>tapShape(k)});});}
  function tapShape(k){st.k=k;drawBig();A.pop();if(mode==='play'&&st.want){if(st.want(k))game.solved(st.wantOk);else A.bad('Look again: '+st.wantHint);}}
  drawBig();drawRow();
  return {tick(dt,t){big.rotation.y=Math.sin(t*.4)*.08;},info:()=>st.k+': '+props(st.k).right+' right angles',
    controls:()=>{const tg=[{t:'Right angles',on:st.ra,fn:()=>{st.ra=!st.ra;drawBig();}},{t:'Parallel sides',on:st.par,fn:()=>{st.par=!st.par;drawBig();}},{t:'Symmetry',on:st.sym,fn:()=>{st.sym=!st.sym;drawBig();}}];
      if(mode==='play'&&st.ask)return choices(game,st.ask.opts,st.ask.ans,st.ask.ok).concat(tg);return tg.concat(mode==='learn'?[{t:'Next shape',go:true,fn:()=>{st.k=SN[(SN.indexOf(st.k)+1)%SN.length];drawBig();}}]:[]);},
    demo(n){if(n==='rect'){st.k='rectangle';st.ra=false;st.par=false;st.sym=false;drawBig();return;}if(n==='ra'){st.ra=true;drawBig();return;}if(n==='par'){st.par=true;drawBig();return;}if(n==='symon'){st.sym=true;drawBig();return;}if(n==='props'){st.k='rectangle';st.ra=false;st.par=false;st.sym=false;drawBig();A.seq([[700,()=>{st.ra=true;drawBig();A.say('4 right angles');}],[1300,()=>{st.par=true;drawBig();A.say('2 pairs of parallel sides');}]]);}
      if(n==='sym'){st.k='rectangle';st.sym=true;st.par=false;drawBig();A.seq([[1500,()=>{st.k='square';drawBig();A.say('A square has 4 lines of symmetry.');}],[1700,()=>{st.k='parallelogram';drawBig();A.say('A parallelogram has none.');}]]);}},
    task(r){st.ask=null;st.want=null;st.ra=false;st.par=false;st.sym=false;
      if(r===0){rowKeys=shuffle(['rectangle','parallelogram','trapezoid','rhombus']);drawRow();st.k='trapezoid';drawBig();st.want=k=>k==='rectangle';st.wantOk='Yes! The rectangle has 4 right angles.';st.wantHint='find 4 right angles.';return 'Tap the shape that is a *rectangle*. Turn on right angles to check.';}
      if(r===1){st.k='rectangle';drawBig();st.ask={ans:4,opts:[2,3,4],ok:'Yes! Every corner of a rectangle is a right angle.'};return 'How many *right angles* does a rectangle have?';}
      if(r===2){st.k='square';drawBig();st.ask={ans:4,opts:[2,4,8],ok:'Yes! A square has 4 lines of symmetry.'};return 'How many *lines of symmetry* does a square have? Use Symmetry to check.';}
      if(r===3){rowKeys=shuffle(['rectangle','square','parallelogram','trapezoid']);drawRow();st.k='square';drawBig();st.want=k=>k==='parallelogram';st.wantOk='Yes! A parallelogram has 2 pairs of parallel sides but no right angles.';st.wantHint='it needs 2 pairs of parallel sides and no right angles.';
        return 'Tap the shape with *2 pairs of parallel sides* but *no right angles*.';}
      st.k='rectangle';drawBig();st.ask={ans:2,opts:[1,2,4],ok:'Yes! Across and down the middle.'};return 'How many *lines of symmetry* does this rectangle have?';}};}
});

/* =========================================================
   22. Coordinates, translations and reflections
   ========================================================= */
P.lesson({id:'grid',title:'Coordinates and transformations',strand:'Spatial Sense',codes:['E1.2','E1.3'],
 guide:{goal:'Plot and read coordinates in the first quadrant of a Cartesian plane, describe translations that move a point, and perform and predict reflections on a grid.',words:'coordinates, ordered pair, x-axis, y-axis, origin, translation, reflection, line of reflection',
  ask:['Why does (2, 5) land in a different spot than (5, 2)?','How would you describe the move from (1, 1) to (4, 3)?','Where is the reflection of (2, 4) in the line x = 3?'],home:'Play “coordinate battleship” on graph paper. Call out ordered pairs like (3, 4).'},
 learn:[{say:'Across first, then up.',speech:'A point on a grid is named by an ordered pair. The first number tells how far across, and the second tells how far up. Watch Hana’s rocket fly to three, two.',view:'model',demo:'plot'},
        {say:'Read about translations and reflections.',speech:'A translation slides a point without turning it: for example, three right and two up. A reflection flips it over a line, like a mirror.',view:'read'},
        {say:'Watch: a reflection.',speech:'The red line is a mirror at x equals three. The rocket at one, four reflects to five, four: the same distance on the other side.',view:'model',demo:'reflect'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: fly the rocket.',speech:'Your turn. Drag the rocket to any point, or use the arrow buttons to translate it.',view:'model'}],
 fig:'The first quadrant of a coordinate grid from 0 to 6.',rz:.5,
 explore:['*Drag the rocket* to a point. It snaps to the grid.','Use the *arrows* to translate it one square.','Turn on the *mirror line* to see reflections.'],
 tries:[['Start at (2, 1). Move 3 right and 4 up. Where are you?','*(5, 5).*'],['Describe the translation from (4, 5) to (1, 2).','*3 left and 3 down.*'],['Reflect (1, 3) in the line x = 3.','*(5, 3).* 1 is 2 left of the line, so the image is 2 right.']],
 howTo:'Read the question. Drag the rocket (or use the arrows) to the right point, or choose the answer.',
 init:k=>({x:1,y:1,mirror:false,ask:null,target:null,ghost:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'*Coordinates* name a point with an *ordered pair* (x, y): *x* is how far *across*, *y* is how far *up* from the *origin* (0, 0).')+16;
  const s=48,ox=X0+40,oy=y+300;g.strokeStyle='#d8dde8';g.lineWidth=2;for(let i=0;i<=6;i++){g.beginPath();g.moveTo(ox+i*s,oy);g.lineTo(ox+i*s,oy-6*s);g.stroke();g.beginPath();g.moveTo(ox,oy-i*s);g.lineTo(ox+6*s,oy-i*s);g.stroke();
    T(g,String(i),ox+i*s,oy+28,FT.small,GREY,'center');T(g,String(i),ox-18,oy-i*s+8,FT.small,GREY,'center');}
  g.strokeStyle=INK;g.lineWidth=4;g.beginPath();g.moveTo(ox,oy-6*s-10);g.lineTo(ox,oy);g.lineTo(ox+6*s+10,oy);g.stroke();
  const pt=(x,yy,c)=>{g.beginPath();g.arc(ox+x*s,oy-yy*s,10,0,Math.PI*2);g.fillStyle=c;g.fill();};pt(1,2,'#2f7de1');pt(4,4,'#e4572e');
  g.strokeStyle='#e4572e';g.lineWidth=3;g.setLineDash([8,6]);g.beginPath();g.moveTo(ox+s,oy-2*s);g.lineTo(ox+4*s,oy-2*s);g.lineTo(ox+4*s,oy-4*s);g.stroke();g.setLineDash([]);
  T(g,'(1, 2)',ox+s-10,oy-2*s+40,FT.smallB,'#2f7de1');T(g,'(4, 4)',ox+4*s+14,oy-4*s-12,FT.smallB,'#e4572e');
  wrap(g,'*Translation:* (1, 2) → 3 right, 2 up → (4, 4). The point slides; it does not turn.',X0+400,y+60,TW-400,34,{font:FT.small,bold:FT.smallB});
  wrap(g,'*Reflection:* a point flips over a line. It ends up the same distance away on the other side.',X0+400,y+190,TW-400,34,{font:FT.small,bold:FT.smallB});y+=350;
  y=keyWords(p,y,[['ordered pair','(x, y): across first, then up'],['translation','a slide: left/right and up/down']]);
  predict(p,y,S,'p22','You are at (5, 2). You move 4 left and 3 up. Where are you?','*(1, 5).* 5 − 4 = 1 across, 2 + 3 = 5 up.');},
 readout(p,S,y){const g=p.g,st=S.st;T(g,'Rocket at ('+st.x+', '+st.y+')',X0,y+48,ZS(48),acc());if(st.mirror)T(g,'Mirror line: x = 3   ·   reflection at ('+(6-st.x)+', '+st.y+')',X0,y+90,FT.bodyB,RED);return y+100;},
 build(S,grp,mode,game){const st=S.st,s=.48,ox=-1.45,oz=-.35;const X=x=>ox+x*s,Z=y=>oz-y*s;
  const base=mk(new THREE.BoxGeometry(6*s+.3,.03,6*s+.3),[lam('#f3f6fb'),lam('#f3f6fb'),cellMat('#ffffff',6,6),lam('#f3f6fb'),lam('#f3f6fb'),lam('#f3f6fb')],20);base.position.set(X(3),.015,Z(3));grp.add(base);
  const ax=[[X(0),Z(0),X(6.4),Z(0)],[X(0),Z(0),X(0),Z(6.4)]];ax.forEach(([a,b,c,d])=>{const len=Math.hypot(c-a,d-b);const m=new THREE.Mesh(new THREE.BoxGeometry(c!==a?len:.035,.04,d!==b?len:.035),lam(INK));m.position.set((a+c)/2,.05,(b+d)/2);grp.add(m);});
  for(let i=0;i<=6;i++){const lx=label(String(i),{size:.2,color:GREY});lx.position.set(X(i),.12,Z(0)+.26);grp.add(lx);const ly=label(String(i),{size:.2,color:GREY});ly.position.set(X(0)-.26,.12,Z(i));grp.add(ly);}
  const xl=label('x',{size:.24,color:INK});xl.position.set(X(6.6),.15,Z(0));grp.add(xl);const yl=label('y',{size:.24,color:INK});yl.position.set(X(0),.15,Z(6.6));grp.add(yl);
  const mirror=new THREE.Mesh(new THREE.BoxGeometry(.05,.5,6*s+.2),new THREE.MeshLambertMaterial({color:'#e0453a',transparent:true,opacity:.55}));mirror.position.set(X(3),.25,Z(3));grp.add(mirror);
  const rocket=new THREE.Group();const bd=mk(new THREE.CylinderGeometry(.09,.11,.36,16),lam('#ffffff'),0);bd.position.y=.25;rocket.add(bd);const nose=mk(new THREE.ConeGeometry(.09,.2,16),lam('#e0453a'),0);nose.position.y=.53;rocket.add(nose);
  [0,1,2].forEach(i=>{const f=mk(G('fin',()=>new THREE.BoxGeometry(.02,.14,.12)),lam('#2f7de1'),0);const a=i*2*Math.PI/3;f.position.set(Math.cos(a)*.1,.12,Math.sin(a)*.1);f.rotation.y=-a;rocket.add(f);});grp.add(rocket);
  const ghost=rocket.clone();ghost.traverse(o=>{if(o.isMesh){o.material=new THREE.MeshLambertMaterial({color:'#e0453a',transparent:true,opacity:.35});}});grp.add(ghost);
  const tag=label('',{size:.22,bg:'#ffffff'});grp.add(tag);const trail=new THREE.Group();grp.add(trail);
  function place(anim){const p=V(X(st.x),0,Z(st.y));if(anim)moveTo(rocket,{pos:p,k:8});else rocket.position.copy(p);tag.userData.set('('+st.x+', '+st.y+')');tag.position.set(p.x,.95,p.z);
    mirror.visible=st.mirror;ghost.visible=st.mirror;ghost.position.set(X(6-st.x),0,Z(st.y));check();A.redraw();}
  A.drag(rocket,{h:.25,drop:pos=>{st.x=Math.max(0,Math.min(6,Math.round((pos.x-ox)/s)));st.y=Math.max(0,Math.min(6,Math.round((oz-pos.z)/s)));A.pop();place(true);}});
  function move(dx,dy){const nx=st.x+dx,ny=st.y+dy;if(nx<0||ny<0||nx>6||ny>6){A.bad('That is off the grid.');return;}const d=mk(G('gtr',()=>new THREE.SphereGeometry(.04,8,6)),lam('#e4572e'),0);d.position.set(X(st.x),.06,Z(st.y));trail.add(d);st.x=nx;st.y=ny;A.pop();place(true);}
  function check(){if(mode==='play'&&st.target&&st.x===st.target[0]&&st.y===st.target[1])game.solved('Yes! ('+st.x+', '+st.y+').');}
  place(false);
  return {info:()=>'('+st.x+', '+st.y+')',
    controls:()=>{const ar=[{t:'← left',fn:()=>move(-1,0)},{t:'→ right',fn:()=>move(1,0)},{t:'↑ up',fn:()=>move(0,1)},{t:'↓ down',fn:()=>move(0,-1)}];
      if(mode==='play'&&st.ask)return choices(game,st.ask.opts,st.ask.ans,st.ask.ok);return ar.concat(mode==='learn'?[{t:'Mirror x = 3',on:st.mirror,fn:()=>{st.mirror=!st.mirror;place(false);}},{t:'Clear trail',fn:()=>clearGroup(trail)}]:[]);},
    demo(n){if(n==='origin'){st.mirror=false;st.x=0;st.y=0;clearGroup(trail);place(false);return;}if(n==='r'){move(1,0);return;}if(n==='u'){move(0,1);return;}clearGroup(trail);if(n==='plot'){st.mirror=false;st.x=0;st.y=0;place(false);A.seq([[700,()=>move(1,0)],[500,()=>move(1,0)],[500,()=>move(1,0)],[600,()=>move(0,1)],[500,()=>move(0,1)],[700,()=>A.say('(3, 2): 3 across, 2 up.')]]);}
      if(n==='reflect'){st.x=1;st.y=4;st.mirror=true;place(false);A.say('(1, 4) reflects to (5, 4).');}},
    task(r){st.ask=null;st.target=null;clearGroup(trail);st.mirror=false;
      if(r===0){st.x=0;st.y=0;st.target=[rnd(1,6),rnd(1,6)];place(false);return 'Move the rocket to *('+st.target[0]+', '+st.target[1]+')*.';}
      if(r===1){st.x=rnd(0,2);st.y=rnd(0,2);const dx=rnd(2,4),dy=rnd(1,4);st.target=[st.x+dx,st.y+dy];place(false);return 'Start at ('+st.x+', '+st.y+'). Translate *'+dx+' right and '+dy+' up*.';}
      if(r===2){st.x=rnd(1,6);st.y=rnd(1,6);place(false);const ans='('+st.x+', '+st.y+')';const o=shuffle([ans,'('+st.y+', '+st.x+')','('+st.x+', '+Math.max(0,st.y-1)+')']).filter((v,i,a)=>a.indexOf(v)===i);st.ask={ans,opts:o.length<3?[ans,'('+(st.x+1)+', '+st.y+')','(0, 0)']:o,ok:'Yes! Across '+st.x+', up '+st.y+'.'};return 'What are the *coordinates* of the rocket?';}
      if(r===3){st.x=rnd(0,2);st.y=rnd(1,5);st.mirror=true;st.target=[6-st.x,st.y];place(false);st.target=[6-st.x,st.y];return 'Reflect the rocket in the *red line x = 3*. Move it to its reflection.';}
      st.x=rnd(3,6);st.y=rnd(3,6);const tx=rnd(0,2),ty=rnd(0,2);place(false);const ans=(st.x-tx)+' left, '+(st.y-ty)+' down';st.ask={ans,opts:shuffle([ans,(st.y-ty)+' left, '+(st.x-tx)+' down',(st.x-tx)+' right, '+(st.y-ty)+' up']).filter((v,i,a)=>a.indexOf(v)===i),ok:'Yes! '+ans+'.'};
      return 'Which translation moves the rocket from ('+st.x+', '+st.y+') to *('+tx+', '+ty+')*?';}};}
});

/* =========================================================
   23. Angles
   ========================================================= */
const ACL=a=>a===90?'right':a===180?'straight':a<90?'acute':'obtuse';
const ACOL={acute:'#16a36f',right:'#2f7de1',obtuse:'#f08a24',straight:'#8b5cf6'};
P.lesson({id:'angles',title:'Right, acute, obtuse and straight angles',strand:'Spatial Sense',codes:['E2.4'],
 guide:{goal:'Identify angles and classify them as right, straight, acute or obtuse by comparing them with a right angle (a square corner).',words:'angle, vertex, arm, right angle, acute, obtuse, straight angle, benchmark',
  ask:['How can the corner of a sheet of paper help you check an angle?','What kind of angle do the hands of a clock make at 3:00? At 6:00?','Can a triangle have two obtuse angles?'],home:'Make angles with your arms or two pencils. Call out “acute!”, “right!”, “obtuse!”, “straight!” and check with a paper corner.'},
 learn:[{say:'Compare with a square corner.',speech:'An angle is made by two arms that meet at a vertex. Finn compares it with a right angle, a square corner. Watch the arm open from acute, to right, to obtuse, to straight.',view:'model',demo:'sweep'},
        {say:'Read the four kinds of angles.',speech:'Acute is smaller than a right angle. Right is exactly a square corner. Obtuse is bigger than a right angle but smaller than a straight angle. A straight angle is a straight line.',view:'read'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: open the arm.',speech:'Your turn. Drag the yellow tip of the arm, or use the buttons. Watch the angle name change.',view:'model'}],
 fig:'Two arms meeting at a vertex. The coloured arc shows the angle.',rz:.15,
 explore:['*Drag the yellow tip* to open or close the angle.','Use *open* and *close* for small steps.','The arc colour shows the kind of angle.'],
 tries:[['What kind of angle is smaller than a right angle?','*Acute.*'],['What angle do clock hands make at 3:00?','*A right angle.*'],['An angle is bigger than a square corner but not a straight line. What is it?','*Obtuse.*']],
 howTo:'Make the angle the question asks for, or name the angle you see.',
 init:k=>({a:60,ask:null,want:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'An *angle* is made by two *arms* that meet at a *vertex*. Compare an angle with a *right angle* (a square corner).')+18;
  [[50,'acute','smaller than a right angle'],[90,'right','a square corner'],[130,'obtuse','bigger than right, less than straight'],[180,'straight','a straight line']].forEach(([a,n,d],i)=>{const cx=X0+130+(i%2)*470,cy=y+120+Math.floor(i/2)*190,L=110,col=ACOL[n];
    g.strokeStyle=INK;g.lineWidth=5;g.beginPath();g.moveTo(cx+L,cy);g.lineTo(cx,cy);g.lineTo(cx+L*Math.cos(-a*Math.PI/180),cy+L*Math.sin(-a*Math.PI/180));g.stroke();
    if(a===90){g.lineWidth=3;g.strokeStyle=col;g.strokeRect(cx,cy-24,24,24);}else{g.strokeStyle=col;g.lineWidth=5;g.beginPath();g.arc(cx,cy,34,-a*Math.PI/180,0);g.stroke();}
    T(g,n,cx+130,cy-40,FT.h3,col);wrap(g,d,cx+130,cy-4,200,30,{font:FT.small,color:GREY});});y+=410;
  y=keyWords(p,y,[['vertex','the point where the two arms meet'],['right angle','a square corner, like the corner of a page']]);
  predict(p,y,S,'p23','What kind of angle do the hands of a clock make at 6:00?','*A straight angle.* The hands point in opposite directions and make a straight line.');},
 readout(p,S,y){const g=p.g,st=S.st,c=ACL(st.a);T(g,c[0].toUpperCase()+c.slice(1)+' angle',X0,y+52,ZS(54),ACOL[c]);
  T(g,st.a<90?'smaller than a right angle':st.a===90?'exactly a square corner':st.a<180?'bigger than a right angle, less than straight':'a straight line',X0,y+94,FT.bodyB);return y+104;},
 build(S,grp,mode,game){const st=S.st,Vx=V(-.4,.12,-1.0),L=1.75;
  const pad=mk(new THREE.CylinderGeometry(2.0,2.0,.03,48,1,false,0,Math.PI),lam('#f3f6fb'),0);pad.rotation.y=Math.PI/2;pad.position.set(Vx.x,.015,Vx.z);grp.add(pad);
  const arm=(col)=>{const m=mk(new THREE.BoxGeometry(L,.08,.1),lam(col),20);m.geometry.translate(L/2,0,0);return m;};const a1=arm('#1b2236');a1.position.copy(Vx);grp.add(a1);
  const a2=arm('#1b2236');a2.position.copy(Vx);grp.add(a2);const vtx=mk(new THREE.SphereGeometry(.1,16,12),lam('#e4572e'),0);vtx.position.copy(Vx);grp.add(vtx);
  const tip=mk(new THREE.SphereGeometry(.15,18,14),lam('#ffd24a'),0);grp.add(tip);let arc=null;const nm=label('',{size:.32,bg:'#ffffff'});nm.position.set(Vx.x,1.4,Vx.z-1.2);grp.add(nm);
  const corner=new THREE.Group();grp.add(corner);
  function draw(){const r=st.a*Math.PI/180;a2.rotation.y=r;tip.position.set(Vx.x+Math.cos(r)*L,.15,Vx.z-Math.sin(r)*L);if(arc){grp.remove(arc);disposeObj(arc);}
    const c=ACL(st.a);clearGroup(corner);if(c==='right'){[[.32,0,0,.32],[0,.32,.32,.32]].forEach(([x1,z1,x2,z2])=>{const s1=V(Vx.x+x1,.14,Vx.z-z1),s2=V(Vx.x+x2,.14,Vx.z-z2);const len=s1.distanceTo(s2);const m=new THREE.Mesh(new THREE.BoxGeometry(len,.03,.03),lam(ACOL.right));m.position.copy(s1).add(s2).multiplyScalar(.5);m.rotation.y=-Math.atan2(s2.z-s1.z,s2.x-s1.x);corner.add(m);});arc=new THREE.Group();}
    else{const ring=new THREE.RingGeometry(.45,.6,40,1,0,r);ring.rotateX(-Math.PI/2);arc=new THREE.Mesh(ring,new THREE.MeshLambertMaterial({color:ACOL[c],side:THREE.DoubleSide}));arc.position.set(Vx.x,.13,Vx.z);}grp.add(arc);
    nm.userData.set(c+' angle');check();A.redraw();}
  function setA(a){a=Math.max(15,Math.min(180,Math.round(a/15)*15));if(a===st.a)return;st.a=a;A.pop();draw();}
  A.drag(tip,{h:.15,move:pt=>{const lp=grp.worldToLocal(pt.clone());let a=Math.atan2(-(lp.z-Vx.z),lp.x-Vx.x)*180/Math.PI;if(a<0)a=a<-90?180:15;setA(a);},drop:()=>draw()});
  function check(){if(mode==='play'&&st.want&&ACL(st.a)===st.want)game.solved('Yes! That is '+(st.want==='acute'||st.want==='obtuse'?'an ':'a ')+st.want+' angle.');}
  draw();
  return {info:()=>ACL(st.a)+' angle',
    controls:()=>{if(mode==='play'&&st.ask)return choices(game,['acute','right','obtuse','straight'],st.ask,'Yes! It is '+(st.ask==='acute'||st.ask==='obtuse'?'an ':'a ')+st.ask+' angle.');
      return [{t:'close',fn:()=>setA(st.a-15)},{t:'open',go:true,fn:()=>setA(st.a+15)},{t:'right angle',fn:()=>setA(90)},{t:'straight',fn:()=>setA(180)}];},
    demo(n){if(/^a\d+$/.test(n)){setA(+n.slice(1));return;}st.a=15;draw();const l=[];[30,45,60,75,90,105,120,135,150,165,180].forEach(a=>l.push([400,()=>{setA(a);if(a===90)A.say('Right angle!');}]));A.seq(l);},
    task(r){st.ask=null;st.want=null;if(r===0){st.a=180;st.want='acute';}else if(r===1){st.a=30;st.want='right';}else if(r===2){st.a=30;st.want='obtuse';}else if(r===3){st.a=60;st.want='straight';}
      else{st.a=pick([30,45,60,105,120,150]);st.ask=ACL(st.a);}draw();return st.want?'Make *'+(st.want==='acute'||st.want==='obtuse'?'an ':'a ')+st.want+' angle*.':'What kind of angle is this?';}};}
});

/* =========================================================
   24. Mass, capacity and metric prefixes
   ========================================================= */
const MITEMS=[{n:'flour',g:1000,col:'#f3e3c3',s:[.34,.42,.24]},{n:'book',g:500,col:'#2f7de1',s:[.42,.1,.32]},{n:'butter',g:250,col:'#ffe27a',s:[.3,.1,.14]},{n:'apple',g:150,col:'#e0453a',r:.12},{n:'eraser',g:50,col:'#ffb37a',s:[.16,.06,.1]}];
P.lesson({id:'metric',title:'Grams, kilograms, millilitres and litres',strand:'Spatial Sense',codes:['E2.1','E2.2'],
 guide:{goal:'Explain the relationships between grams and kilograms and between millilitres and litres, use benchmarks to estimate mass and capacity, and use metric prefixes to choose appropriate units and tools.',words:'gram (g), kilogram (kg), millilitre (mL), litre (L), kilo-, centi-, milli-, benchmark, scale, capacity',
  ask:['Why is 1 kg the same as 1000 g?','What has a mass of about 1 g? About 1 kg?','Which tool and unit would you use to measure the water in a bathtub?'],home:'Read the labels in the kitchen: find something measured in g, kg, mL and L. Sort them from least to greatest.'},
 learn:[{say:'1 kilogram is 1000 grams.',speech:'Kilo means one thousand. A kilogram is one thousand grams. Watch Tala’s scale: a book is five hundred grams, and two butters are two hundred fifty grams each. Together they make one kilogram.',view:'model',demo:'kg'},
        {say:'Read the metric prefixes.',speech:'Kilo means a thousand. Centi means one hundredth. Milli means one thousandth. So one litre is one thousand millilitres.',view:'read'},
        {say:'Watch: filling a litre.',speech:'Pour four cups of two hundred fifty millilitres into the jug. Four times two hundred fifty is one thousand millilitres, one litre.',view:'model',demo:'litre'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: weigh and pour.',speech:'Your turn. Tap things to put them on the scale. Switch to capacity to pour cups into the jug.',view:'model'}],
 fig:'A kitchen scale in grams and a measuring jug in millilitres.',rz:.3,
 explore:['*Mass:* tap items to put them on the scale; tap the scale to clear.','*Capacity:* pour 250 mL or 100 mL cups into the jug.','Read the units: g and kg, mL and L.'],
 tries:[['How many grams are in 3 kg?','*3000 g.*'],['How many millilitres are in 2 L?','*2000 mL.*'],['Which unit for the mass of a paper clip: g or kg?','*Grams.* A paper clip is about 1 g.']],
 howTo:'Put items on the scale or pour cups into the jug to match the amount, or choose the right unit.',
 init:k=>({mode:'mass',on:[],ml:0,ask:null,target:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'Metric units use *prefixes* that tell size. *Kilo* means 1000, *centi* means 1/100, *milli* means 1/1000.')+16;
  [['kilo-','× 1000','1 kg = 1000 g','#16a36f'],['centi-','÷ 100','1 m = 100 cm','#2f7de1'],['milli-','÷ 1000','1 L = 1000 mL','#e4572e']].forEach(([a,b,c,col],i)=>{const x=X0+i*(TW/3);rr(g,x+4,y,TW/3-8,140,16);g.fillStyle=tint(col,.13);g.fill();
    T(g,a,x+TW/6,y+46,ZS(40),col,'center');T(g,b,x+TW/6,y+86,FT.bodyB,INK,'center');T(g,c,x+TW/6,y+122,FT.small,GREY,'center');});y+=172;
  [['1 g','a paper clip'],['1 kg','a bag of flour'],['1 mL','a few drops'],['1 L','a big water bottle']].forEach(([a,b],i)=>{T(g,'about '+a,X0+(i%2)*TW/2,y+Math.floor(i/2)*44,FT.bodyB,acc());T(g,b,X0+(i%2)*TW/2+180,y+Math.floor(i/2)*44,FT.body);});y+=100;
  y=para(p,y,'Use *g* for light things and *kg* for heavy things. Use *mL* for small amounts of liquid and *L* for large amounts.')+12;
  y=keyWords(p,y,[['mass','how much matter is in an object'],['capacity','how much a container holds']]);
  predict(p,y,S,'p24','A recipe needs 1 L of milk. You have cups of 250 mL. How many cups?','*4 cups.* 4 × 250 mL = 1000 mL = 1 L.');},
 readout(p,S,y){const g=p.g,st=S.st;if(st.mode==='mass'){const t=st.on.reduce((a,i)=>a+MITEMS[i].g,0);T(g,t+' g'+(t>=1000?'  =  '+(t/1000)+' kg':''),X0,y+54,ZS(56),acc());T(g,st.on.length?st.on.map(i=>MITEMS[i].n).join(' + '):'The scale is empty.',X0,y+94,FT.body);return y+104;}
  T(g,st.ml+' mL'+(st.ml>=1000?'  =  '+(st.ml/1000)+' L':''),X0,y+54,ZS(56),acc());T(g,'The jug holds 2 L = 2000 mL',X0,y+94,FT.body);return y+104;},
 build(S,grp,mode,game){const st=S.st;const massG=new THREE.Group(),capG=new THREE.Group();grp.add(massG,capG);
  const sc=new THREE.Group();sc.position.set(.9,0,-1.6);massG.add(sc);const sb=mk(new THREE.BoxGeometry(1.5,.22,1.1),lam('#e9edf5'),20);sb.position.y=.11;sc.add(sb);
  const plate=mk(new THREE.CylinderGeometry(.62,.62,.05,32),lam('#cfd6e2'),30);plate.position.y=.26;sc.add(plate);const disp=label('0 g',{size:.3,bg:'#1b2236',color:'#7dffb0',font:'700 96px "Atkinson Hyperlegible", monospace',border:'#1b2236'});disp.position.set(0,.3,.62);sc.add(disp);
  A.drag(sc,{tap:()=>{st.on=[];fillScale();}});const onG=new THREE.Group();sc.add(onG);
  function itemMesh(i){const it=MITEMS[i];return it.r?mk(G('mi'+i,()=>new THREE.SphereGeometry(it.r,16,12)),lam(it.col),0):mk(G('mi'+i,()=>new THREE.BoxGeometry(...it.s)),lam(it.col),20);}
  MITEMS.forEach((it,i)=>{const m=itemMesh(i);const g=new THREE.Group();g.add(m);m.position.y=(it.r||it.s[1]/2)+.02;g.position.set(-1.9+(i%2)*.85,0,-2.4+Math.floor(i/2)*.8);massG.add(g);
    const l=label(it.n+' '+(it.g>=1000?it.g/1000+' kg':it.g+' g'),{size:.15});l.position.set(0,.6,0);g.add(l);A.drag(g,{tap:()=>addItem(i)});});
  function fillScale(){clearGroup(onG);let x=-.35,z=-.2;st.on.forEach((i,k)=>{const m=itemMesh(i);const it=MITEMS[i];m.position.set(-.3+(k%3)*.3,.3+(it.r||it.s[1]/2)+Math.floor(k/3)*.15,-.15+(k%2)*.2);onG.add(m);});
    const t=st.on.reduce((a,i)=>a+MITEMS[i].g,0);disp.userData.set(t>=1000?(t/1000).toFixed(t%1000?2:0).replace(/0+$/,'').replace(/\.$/,'')+' kg':t+' g');check();A.redraw();}
  function addItem(i){if(st.on.length>=8){A.bad('The scale is full.');return;}st.on.push(i);A.pop();fillScale();}
  /* capacity */
  const jug=mk(new THREE.CylinderGeometry(.5,.45,1.6,32,1,true),new THREE.MeshLambertMaterial({color:'#e6f6ff',transparent:true,opacity:.45,side:THREE.DoubleSide}),25);jug.position.set(.6,.8,-1.7);capG.add(jug);
  const jb=mk(new THREE.CylinderGeometry(.45,.45,.03,32),lam('#cfe9f7'),0);jb.position.set(.6,.015,-1.7);capG.add(jb);
  const water=new THREE.Mesh(new THREE.CylinderGeometry(.47,.44,1,32),new THREE.MeshLambertMaterial({color:'#4fb3ff',transparent:true,opacity:.75}));water.position.set(.6,.01,-1.7);water.scale.y=.001;capG.add(water);
  for(let k=1;k<=8;k++){const ln=new THREE.Mesh(new THREE.TorusGeometry(.5,.007,4,40,Math.PI/2),lam(k%4?'#7aa7d9':'#1b2236'));ln.rotation.x=Math.PI/2;ln.rotation.z=Math.PI/4;ln.position.set(.6,k*.19,-1.7);capG.add(ln);
    if(k%2===0){const l=label(k*250+' mL',{size:.13,color:'#2a62c9'});l.position.set(.6+.75,k*.19,-1.55);capG.add(l);}}
  const cups=[[250,'#ffffff',-1.5],[100,'#fff3c4',-.6]].map(([ml,col,x])=>{const c=mk(new THREE.CylinderGeometry(ml===250?.17:.12,ml===250?.13:.1,ml===250?.32:.22,20,1,true),new THREE.MeshLambertMaterial({color:col,side:THREE.DoubleSide}),25);
    const g=new THREE.Group();g.add(c);c.position.y=ml===250?.16:.11;g.position.set(x,0,-1.0);capG.add(g);const l=label(ml+' mL',{size:.16});l.position.set(0,.5,0);g.add(l);g.userData.ml=ml;g.userData.home=g.position.clone();A.drag(g,{tap:()=>pour(ml,g)});return g;});
  let pouring=false;
  function level(){const h=Math.min(st.ml,2000)/2000*1.52;const from=water.scale.y,to=Math.max(.001,h);tween(.45,k=>{water.scale.y=from+(to-from)*k;water.position.y=water.scale.y/2+.01;});}
  function pour(ml,g){if(pouring)return;if(st.ml+ml>2000){A.bad('That would overflow the 2 L jug.');return;}pouring=true;const home=g.userData.home;hop(g,V(.1,1.85,-1.7),.4,.45).then(()=>{g.rotation.z=-1.7;st.ml+=ml;level();A.pop();
    A.later(()=>{g.rotation.z=0;moveTo(g,{pos:home,k:9});pouring=false;check();A.redraw();},450);});}
  function check(){if(mode!=='play'||st.target==null)return;if(st.mode==='mass'&&st.on.reduce((a,i)=>a+MITEMS[i].g,0)===st.target)game.solved('Yes! '+(st.target>=1000?st.target/1000+' kg':st.target+' g')+' on the scale.');
    if(st.mode==='cap'&&st.ml===st.target)game.solved('Yes! '+st.target+' mL'+(st.target>=1000?' = '+st.target/1000+' L':'')+'.');}
  function setMode(m){st.mode=m;massG.visible=m==='mass';capG.visible=m==='cap';A.redraw();}
  fillScale();setMode(st.mode);
  return {info:()=>st.mode==='mass'?'Tap items to weigh them':'Pour cups into the jug',
    controls:()=>{if(mode==='play'&&st.ask)return choices(game,st.ask.opts,st.ask.ans,st.ask.ok);const m=[{t:'Mass',on:st.mode==='mass',fn:()=>setMode('mass')},{t:'Capacity',on:st.mode==='cap',fn:()=>setMode('cap')}];
      if(st.mode==='mass')return (mode==='learn'?m:[]).concat([{t:'Clear scale',fn:()=>{st.on=[];fillScale();}}]);
      return (mode==='learn'?m:[]).concat([{t:'Pour 250 mL',go:true,fn:()=>pour(250,cups[0])},{t:'Pour 100 mL',fn:()=>pour(100,cups[1])},{t:'Empty',fn:()=>{st.ml=0;level();A.redraw();}}]);},
    demo(n){if(n==='empty'){st.mode='mass';st.on=[];fillScale();return;}if(n==='book'){addItem(1);return;}if(n==='butter'){addItem(2);return;}if(n==='kg'){setMode('mass');st.on=[];fillScale();A.seq([[700,()=>addItem(1)],[900,()=>addItem(2)],[900,()=>addItem(2)],[900,()=>A.say('500 g + 250 g + 250 g = 1000 g = 1 kg')]]);}
      if(n==='litre'){setMode('cap');st.ml=0;level();A.seq([[600,()=>pour(250,cups[0])],[1100,()=>pour(250,cups[0])],[1100,()=>pour(250,cups[0])],[1100,()=>pour(250,cups[0])],[1300,()=>A.say('4 × 250 mL = 1000 mL = 1 L')]]);}},
    task(r){st.ask=null;st.target=null;st.on=[];st.ml=0;fillScale();level();
      if(r===0){setMode('mass');st.target=1000;return 'Put exactly *1 kg* on the scale. (Remember: 1 kg = 1000 g.)';}
      if(r===1){setMode('cap');st.target=pick([750,1200,1500]);return 'Pour exactly *'+st.target+' mL* into the jug.';}
      if(r===2){setMode('mass');st.ask={ans:'g',opts:['g','kg'],ok:'Yes! A pencil is light, so use grams.'};return 'Which unit would you use for the mass of a *pencil*?';}
      if(r===3){setMode('cap');const L=pick([2,3,5]);st.ask={ans:L*1000,opts:[L*100,L*1000,L*10],ok:'Yes! '+L+' L = '+L*1000+' mL.'};return 'How many *millilitres* are in *'+L+' L*?';}
      setMode('mass');st.target=pick([800,1150,700]);return 'Put exactly *'+st.target+' g* on the scale.';}};}
});

/* =========================================================
   25. Elapsed time
   ========================================================= */
const tf=m=>{m=((m%720)+720)%720;let h=Math.floor(m/60);if(h===0)h=12;return h+':'+String(m%60).padStart(2,'0');};
const dur=m=>{const h=Math.floor(m/60),mm=m%60;return (h?h+' h ':'')+(mm||!h?mm+' min':'').trim();};
P.lesson({id:'elapsed',title:'Elapsed time',strand:'Spatial Sense',codes:['E2.3'],
 guide:{goal:'Solve problems involving elapsed time by applying the relationships between seconds, minutes, hours, days, weeks, months and years.',words:'elapsed time, start time, end time, duration, hour, minute, second, a.m., p.m.',
  ask:['How did you count on from 9:40 to 11:15?','Why is it easier to jump to the next hour first?','How many minutes are in 2 and a half hours?'],home:'Before a show or a drive, ask: “It starts at 4:35 and takes 1 h 20 min. When will it end?”'},
 learn:[{say:'Count on from the start time.',speech:'Ravi’s movie starts at two fifteen and lasts one hour thirty minutes. Count on: one hour takes us to three fifteen, then thirty more minutes to three forty-five. Watch the clock.',view:'model',demo:'movie'},
        {say:'Read about jumps on a timeline.',speech:'On a timeline, jump to the next hour first, then add the rest. Sixty seconds make a minute, sixty minutes make an hour, and twenty-four hours make a day.',view:'read'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: move the hands.',speech:'Your turn. Drag the orange minute hand or use the buttons. The timeline shows how much time has passed.',view:'model'}],
 fig:'A clock and a timeline from the start time to the end time.',rz:-.2,
 explore:['*Drag the orange minute hand* around the clock.','Use *+5 min* and *+1 hour* to count on.','The *timeline* shows the elapsed time.'],
 tries:[['Swimming starts at 4:20 and ends at 5:05. How long is it?','*45 minutes.* 4:20 to 5:00 is 40 min, plus 5 min.'],['A trip takes 2 h 15 min and starts at 9:30. When does it end?','*11:45.*'],['How many minutes are in 3 hours?','*180 minutes.* 3 × 60 = 180.']],
 howTo:'Set the clock to the time the question asks for, or choose how much time has passed.',
 init:k=>({start:8*60+40,tm:9*60+25,want:null,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'*Elapsed time* is how much time passes between a *start time* and an *end time*. Count on in easy jumps.')+18;
  const lx=X0+20,lw=TW-40;g.strokeStyle=INK;g.lineWidth=4;g.beginPath();g.moveTo(lx,y+90);g.lineTo(lx+lw,y+90);g.stroke();const toX=m=>lx+(m-135)/105*lw;
  [[135,'2:15'],[180,'3:00'],[225,'3:45']].forEach(([m,t])=>{g.beginPath();g.moveTo(toX(m),y+76);g.lineTo(toX(m),y+104);g.stroke();T(g,t,toX(m),y+140,FT.bodyB,INK,'center');});
  [[135,180,'+45 min','#2f7de1'],[180,225,'+45 min','#e4572e']].forEach(([a,b,t,c])=>{g.strokeStyle=c;g.lineWidth=4;g.beginPath();g.moveTo(toX(a),y+84);g.quadraticCurveTo((toX(a)+toX(b))/2,y+20,toX(b),y+84);g.stroke();T(g,t,(toX(a)+toX(b))/2,y+36,FT.hand,c,'center');});
  T(g,'2:15 → 3:45 is 1 h 30 min',X0,y+196,ZS(40),acc());y+=252;
  [['60 seconds','1 minute'],['60 minutes','1 hour'],['24 hours','1 day'],['7 days','1 week'],['12 months','1 year']].forEach(([a,b],i)=>{T(g,a+' = '+b,X0+(i%2)*TW/2,y+Math.floor(i/2)*42,FT.bodyB);});y+=134;
  y=keyWords(p,y,[['elapsed time','the time that passes from start to end'],['duration','how long something lasts']]);
  predict(p,y,S,'p25','Lunch starts at 11:50 and lasts 40 minutes. When does it end?','*12:30.* 11:50 + 10 min = 12:00, then 30 more minutes.');},
 readout(p,S,y){const g=p.g,st=S.st,el=st.tm-st.start;T(g,'Start '+tf(st.start)+'   →   now '+tf(st.tm),X0,y+44,ZS(40),acc());T(g,'Elapsed: '+(el>=0?dur(el):'before the start'),X0,y+88,FT.bodyB);return y+98;},
 build(S,grp,mode,game){const st=S.st,C=V(-.95,1.45,-1.9);
  const fc=document.createElement('canvas');fc.width=fc.height=512;const g=fc.getContext('2d');g.fillStyle='#fffdf7';g.fillRect(0,0,512,512);
  for(let i=0;i<60;i++){const a=i*Math.PI/30,r1=i%5?236:224;g.strokeStyle=i%5?'#9aa1b3':INK;g.lineWidth=i%5?2:5;g.beginPath();g.moveTo(256+Math.sin(a)*r1,256-Math.cos(a)*r1);g.lineTo(256+Math.sin(a)*248,256-Math.cos(a)*248);g.stroke();}
  for(let i=1;i<=12;i++){const a=i*Math.PI/6;g.fillStyle=['#e4572e','#f08a24','#16a36f','#2f7de1','#8b5cf6'][i%5];g.font='700 62px "Zilla Slab", Georgia, serif';g.textAlign='center';g.textBaseline='middle';g.fillText(String(i),256+Math.sin(a)*176,256-Math.cos(a)*176+4);}
  const rimG=new THREE.CylinderGeometry(1.15,1.15,.22,64);rimG.rotateX(Math.PI/2);const rim=mk(rimG,lam('#16a36f'),30);rim.position.copy(C);grp.add(rim);
  const face=new THREE.Mesh(new THREE.CircleGeometry(1.02,64),new THREE.MeshLambertMaterial({map:new THREE.CanvasTexture(fc)}));face.position.copy(C);face.position.z+=.115;grp.add(face);
  [-.55,.55].forEach(x=>{const f=mk(new THREE.BoxGeometry(.25,.32,.3),lam('#0f7a52'),20);f.position.set(C.x+x,.16,C.z);grp.add(f);});
  const hp=new THREE.Group(),mp=new THREE.Group();hp.position.copy(C);hp.position.z+=.13;mp.position.copy(C);mp.position.z+=.16;grp.add(hp,mp);
  const hh=mk(new THREE.BoxGeometry(.1,.56,.03),lam(INK),0);hh.position.y=.22;hp.add(hh);const mh=mk(new THREE.BoxGeometry(.09,.88,.04),lam('#e4572e'),0);mh.position.y=.36;mp.add(mh);
  const knob=mk(new THREE.SphereGeometry(.09,14,10),lam('#e4572e'),0);knob.position.y=.78;mp.add(knob);
  const dl=label('',{size:.26,bg:'#1b2236',color:'#7dffb0',font:'700 96px "Atkinson Hyperlegible", monospace',border:'#1b2236'});dl.position.set(1.35,.5,-1.3);grp.add(dl);
  const tl=new THREE.Group();grp.add(tl);
  function timeline(){clearGroup(tl);const el=Math.max(0,st.tm-st.start);const L=3.8,x0=-1.9,zz=-.35;const span=Math.max(60,Math.ceil((el+15)/60)*60);const toX=m=>x0+m/span*L;
    const bar=mk(new THREE.BoxGeometry(L,.05,.14),lam('#cbd5e6'),0);bar.position.set(0,.03,zz);tl.add(bar);
    if(el>0){const f=mk(new THREE.BoxGeometry(toX(el)-x0,.08,.16),lam('#16a36f'),0);f.position.set((x0+toX(el))/2,.05,zz);tl.add(f);}
    for(let m=0;m<=span;m+=15){const tk=new THREE.Mesh(G('etk'+(m%60===0),()=>new THREE.BoxGeometry(.02,m%60===0?.24:.12,.02)),lam(INK));tk.position.set(toX(m),.08,zz);tl.add(tk);}
    const s=label(tf(st.start),{size:.2});s.position.set(x0,.38,zz+.25);tl.add(s);const e=label(el>0?'+'+dur(el):'',{size:.22,color:'#16a36f'});e.position.set(Math.min(1.6,toX(el)),.42,zz-.3);tl.add(e);}
  let ha=0,ma=0;const target=()=>({h:-st.tm*.5*Math.PI/180,m:-st.tm*6*Math.PI/180});
  function sync(){dl.userData.set(tf(st.tm));timeline();check();A.redraw();}
  function add(d){st.tm+=d;A.pop();sync();}
  const plane=new THREE.Plane(V(0,0,1),0);let wC=V();
  A.drag(mp,{plane,start:()=>{wC=grp.localToWorld(C.clone());plane.constant=-(wC.z+.16);},move:pt=>{const a=Math.atan2(pt.x-wC.x,pt.y-wC.y);const mins=Math.round((((a/(Math.PI*2))*60)+60)%60/5)*5%60;
    const curM=((st.tm%60)+60)%60;let d=mins-curM;if(d>30)d-=60;if(d<-30)d+=60;if(d){st.tm+=d;dl.userData.set(tf(st.tm));A.refresh();}},drop:()=>{A.pop();sync();}});
  function check(){if(mode==='play'&&st.want!=null&&((st.tm-st.want)%720+720)%720===0)game.solved('Yes! The clock shows '+tf(st.want)+'.');}
  const t0=target();ha=t0.h;ma=t0.m;hp.rotation.z=ha;mp.rotation.z=ma;sync();
  return {tick(dt){const t=target(),k=Math.min(1,dt*8);ha+=(t.h-ha)*k;ma+=(t.m-ma)*k;hp.rotation.z=ha;mp.rotation.z=ma;},info:()=>tf(st.tm)+'  ·  elapsed '+dur(Math.max(0,st.tm-st.start)),
    controls:()=>{if(mode==='play'&&st.ask)return choices(game,st.ask.opts,st.ask.ans,st.ask.ok);
      return [{t:'−1 hour',fn:()=>add(-60)},{t:'+1 hour',fn:()=>add(60)},{t:'−5 min',fn:()=>add(-5)},{t:'+5 min',go:true,fn:()=>add(5)}].concat(mode==='learn'?[{t:'Set start = now',fn:()=>{st.start=st.tm;sync();}}]:[]);},
    demo(n){if(n==='movie'){st.start=14*60+15;st.tm=14*60+15;sync();return;}if(n==='p60'){add(60);return;}if(n==='p30'){add(30);return;}st.start=135;st.tm=135;sync();A.seq([[800,()=>{add(60);A.say('+1 hour: 3:15');}],[1300,()=>{add(15);}],[600,()=>{add(15);A.say('+30 min: 3:45. Elapsed: 1 h 30 min.');}]]);},
    task(r){st.ask=null;st.want=null;
      if(r===0){st.start=rnd(1,4)*60+pick([0,15,30]);const d=pick([75,90,105]);st.tm=st.start;st.want=st.start+d;sync();return 'A movie starts at *'+tf(st.start)+'* and lasts *'+dur(d)+'*. Set the clock to the *end time*.';}
      if(r===1){st.start=10*60+40;const d=25;st.tm=st.start;st.want=st.start+d;sync();return 'Recess starts at *10:40* and lasts *25 min*. Set the end time.';}
      if(r===2){st.start=9*60+20;st.tm=11*60+5;sync();const ans='1 h 45 min';st.ask={ans,opts:shuffle([ans,'2 h 15 min','1 h 15 min']),ok:'Yes! 9:20 → 11:00 is 1 h 40 min, plus 5 min.'};return 'How much time passes from *9:20* to *11:05*?';}
      if(r===3){const end=7*60+10,d=110;st.start=end-d-60;st.tm=end;st.want=end-d;sync();st.start=st.want-60;timeline();return 'A movie ends at *7:10*. It lasted *1 h 50 min*. Set the clock to the *start time*.';}
      const h=pick([2,3,4]);st.ask={ans:h*60,opts:[h*60,h*100,h*24],ok:'Yes! '+h+' × 60 = '+h*60+' minutes.'};sync();return 'How many *minutes* are in *'+h+' hours*?';}};}
});

/* =========================================================
   26. Area of rectangles
   ========================================================= */
P.lesson({id:'area4',title:'Area of rectangles',strand:'Spatial Sense',codes:['E2.5','E2.6'],
 guide:{goal:'Use the rows and columns of an array to show that the area of a rectangle is length × width, and use the formula to find an unknown side when the area and one side are known.',words:'area, square unit, cm², m², length, width, formula, array',
  ask:['Why does multiplying length by width give the area?','A rectangle has area 36 m² and width 4 m. How long is it?','Can two different rectangles have the same area?'],home:'Measure a rug or a table in metres or centimetres, then find its area with length × width.'},
 learn:[{say:'Rows times columns gives area.',speech:'Isla’s garden is covered by square tiles. Each row has six tiles, and there are four rows. Four times six is twenty-four square metres. Watch it fill.',view:'model',demo:'tile'},
        {say:'Read the area formula.',speech:'The area of a rectangle is length times width. If you know the area and one side, divide to find the other side.',view:'read'},
        {say:'Watch: find the missing side.',speech:'The area is thirty-six square metres and the width is four metres. Thirty-six divided by four is nine, so the length is nine metres.',view:'model',demo:'missing'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: build gardens.',speech:'Your turn. Drag the yellow corner or use the buttons to change the length and width.',view:'model'}],
 fig:'A garden of 1 m by 1 m tiles. Area = length × width.',rz:.7,
 explore:['*Drag the yellow corner* to change the garden.','Read *Area = length × width*.','Find gardens with the same area but different sides.'],
 tries:[['A rectangle is 7 cm long and 5 cm wide. What is its area?','*35 cm².*'],['Area 48 m², width 6 m. What is the length?','*8 m.* 48 ÷ 6 = 8.'],['Name two rectangles with an area of 24 square units.','*4 × 6 and 3 × 8* (also 2 × 12, 1 × 24).']],
 howTo:'Make the garden that matches the area and side in the question.',
 init:k=>({w:6,h:4,want:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'*Area* is the number of square units that cover a surface. For a rectangle, count rows and columns, or use the *formula*:')+16;
  rr(g,X0,y,TW,82,16);g.fillStyle=tint(acc(),.12);g.fill();T(g,'Area = length × width',X0+TW/2,y+56,ZS(46),acc(),'center');y+=112;
  const s=40,ox=X0+20;for(let r=0;r<4;r++)for(let c=0;c<6;c++){g.fillStyle=(r+c)%2?'#bfe9cf':'#8fdcb0';g.fillRect(ox+c*s,y+r*s,s,s);g.strokeStyle='#fff';g.lineWidth=2;g.strokeRect(ox+c*s,y+r*s,s,s);}
  T(g,'6 m',ox+3*s,y-10,FT.bodyB,'#16a36f','center');T(g,'4 m',ox-4,y+2*s+10,FT.bodyB,'#16a36f','right');
  T(g,'4 × 6 = 24 m²',X0+300,y+60,ZS(44));T(g,'Missing side: 24 ÷ 4 = 6',X0+300,y+120,FT.bodyB,GREY);y+=196;
  y=para(p,y,'Small areas use *square centimetres (cm²)*; bigger ones use *square metres (m²)*.')+12;
  y=keyWords(p,y,[['square unit','a square that is 1 unit on each side'],['formula','a rule written with symbols, like A = l × w']]);
  predict(p,y,S,'p26','A garden has area 30 m² and is 5 m wide. How long is it?','*6 m.* 30 ÷ 5 = 6, because 5 × 6 = 30.');},
 readout(p,S,y){const g=p.g,st=S.st;T(g,'Area = '+st.w+' m × '+st.h+' m = '+st.w*st.h+' m²',X0,y+48,ZS(44),acc());T(g,'length '+st.w+' m   ·   width '+st.h+' m',X0,y+88,FT.bodyB);return y+98;},
 build(S,grp,mode,game){const st=S.st,c=.38,NX=10,NZ=8,x0=-c*NX/2,z0=-1.3-c*NZ/2;
  const base=mk(new THREE.BoxGeometry(c*NX+.1,.04,c*NZ+.1),[lam('#d9efc9'),lam('#d9efc9'),cellMat('#eef8e6',NX,NZ),lam('#d9efc9'),lam('#d9efc9'),lam('#d9efc9')],20);base.position.set(0,.02,-1.3);grp.add(base);
  const plot=new THREE.Group();grp.add(plot);const tg=G('tile4a',()=>new THREE.BoxGeometry(c-.04,.07,c-.04));
  const lw=label('',{size:.26,color:'#16a36f'}),lh=label('',{size:.26,color:'#16a36f'});grp.add(lw,lh);const corner=mk(new THREE.SphereGeometry(.13,16,12),lam('#ffd24a'),0);grp.add(corner);
  function rebuild(drop){clearGroup(plot);for(let r=0;r<st.h;r++)for(let q=0;q<st.w;q++){const m=mk(tg,lam((r+q)%2?'#4cc38a':'#16a36f'),20);const p=V(x0+(q+.5)*c,.075,z0+(r+.5)*c);m.position.copy(p);if(drop){m.position.y+=.5+(r*st.w+q)*.01;moveTo(m,{pos:p,k:10});}plot.add(m);}
    lw.userData.set(st.w+' m');lw.position.set(x0+st.w*c/2,.45,z0-.15);lh.userData.set(st.h+' m');lh.position.set(x0-.3,.45,z0+st.h*c/2);corner.position.set(x0+st.w*c,.2,z0+st.h*c);}
  function set(w,h){w=Math.max(1,Math.min(NX,w));h=Math.max(1,Math.min(NZ,h));if(w===st.w&&h===st.h)return;st.w=w;st.h=h;rebuild(true);A.pop();if(mode==='play'&&st.want&&st.want(w,h))game.solved(w+' m × '+h+' m = '+w*h+' m²!');A.redraw();}
  A.drag(corner,{h:.2,drop:pos=>{set(Math.round((pos.x-x0)/c),Math.round((pos.z-z0)/c));rebuild(false);}});
  rebuild(false);
  return {info:()=>'Area '+st.w*st.h+' m²  (drag the yellow corner)',
    controls:()=>[{t:'Longer',go:true,fn:()=>set(st.w+1,st.h)},{t:'Shorter',fn:()=>set(st.w-1,st.h)},{t:'Wider',go:true,fn:()=>set(st.w,st.h+1)},{t:'Narrower',fn:()=>set(st.w,st.h-1)}],
    demo(n){if(n==='show'){st.w=6;st.h=4;rebuild(false);A.redraw();return;}if(n==='tile'){st.w=6;st.h=1;rebuild(false);A.seq([[600,()=>set(6,2)],[700,()=>set(6,3)],[700,()=>set(6,4)],[900,()=>A.say('4 rows × 6 = 24 m²')]]);}
      if(n==='missing'){st.w=1;st.h=4;rebuild(false);const l=[];for(let w=2;w<=9;w++)l.push([380,()=>set(w,4)]);l.push([700,()=>A.say('9 m × 4 m = 36 m². The missing length is 9 m.')]);A.seq(l);}},
    task(r){st.w=1;st.h=1;rebuild(false);
      if(r===0){const w=rnd(5,9),h=rnd(3,7);st.want=(a,b)=>a===w&&b===h;return 'Build a garden *'+w+' m long* and *'+h+' m wide*. What is its area?';}
      if(r===1){const h=pick([4,5,6]),w=rnd(5,9);st.want=(a,b)=>a===w&&b===h;return 'Area *'+w*h+' m²*, width *'+h+' m*. Build it: how long must it be?';}
      if(r===2){const w=pick([6,8]),h=rnd(3,7);st.want=(a,b)=>b===h&&a===w;return 'Length *'+w+' m*, area *'+w*h+' m²*. Find the width and build it.';}
      if(r===3){st.want=(a,b)=>a*b===24&&a!==b;return 'Build *any* garden with an area of *24 m²*.';}
      st.want=(a,b)=>a===b&&a*b===36;return 'Build a *square* garden with an area of *36 m²*.';}};}
});

/* =========================================================
   27. Shopping: payment methods and change
   ========================================================= */
const GOODS=[{n:'Ball',p:7,col:'#e4572e',sh:'ball'},{n:'Kite',p:9,col:'#2f7de1',sh:'kite'},{n:'Book',p:12,col:'#16a36f',sh:'book'},{n:'Puzzle',p:15,col:'#8b5cf6',sh:'box'},{n:'Paint',p:6,col:'#f08a24',sh:'can'},{n:'Cap',p:8,col:'#0fa5a5',sh:'cap'}];
const PAY=[['Cash','bills and coins handed over'],['Debit card','money comes straight out of your bank account'],['Credit card','you borrow money and pay it back later'],['Gift card','a card already loaded with money'],['E-transfer','money sent from one bank account to another online']];
P.lesson({id:'shopping',title:'Paying and making change',strand:'Financial Literacy',codes:['F1.1','F1.2'],
 guide:{goal:'Identify methods of payment for goods and services, and estimate and calculate the cost of several items priced in whole dollars and the change from a cash payment, using mental math.',words:'cost, total, change, cash, debit, credit, gift card, e-transfer, estimate',
  ask:['How is paying with debit different from paying with credit?','How can you add $7 + $9 + $12 in your head?','You pay $50 for $34 of items. How did you find the change?'],home:'Next time you shop, let your child estimate the total and the change before you pay, and name the payment method you use.'},
 learn:[{say:'Add the prices to find the total.',speech:'Kofi puts a ball for seven dollars and a kite for nine dollars in the cart. Seven plus nine is sixteen dollars. Watch the total.',view:'model',demo:'cart'},
        {say:'Read about ways to pay.',speech:'You can pay with cash, a debit card, a credit card, a gift card, or an e-transfer. With cash, the store gives change when you pay more than the total.',view:'read'},
        {say:'Watch: paying cash and getting change.',speech:'The total is sixteen dollars. We pay with a twenty-dollar bill. Count up from sixteen to twenty: the change is four dollars.',view:'model',demo:'pay'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: go shopping.',speech:'Your turn. Tap items to put them in the cart. Then pay with a bill and find the change.',view:'model'}],
 fig:'A toy store shelf and a shopping cart. Prices are in whole dollars.',rz:.35,
 explore:['*Tap an item* to put it in the cart; tap the cart to empty it.','Press *Pay $20* or *Pay $50* and read the change.','Try each *payment method*.'],
 tries:[['A ball is $7 and a book is $12. What is the total?','*$19.*'],['You pay $20 for a $13 puzzle. What is your change?','*$7.* Count up from 13 to 20.'],['Which payment takes money right out of your bank account?','*Debit card.*']],
 howTo:'Tap items into the cart to match the list, then answer the money question.',
 init:k=>({cart:[],paid:0,method:0,ask:null,need:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'To find the *cost* of several items, add their prices. When you pay *cash*, the *change* is what you paid minus the total.')+16;
  T(g,'$7 + $9 = $16',X0,y+40,ZS(46),acc());T(g,'Pay $20  →  change: 20 − 16 = $4',X0,y+96,FT.bodyB);y+=156;
  T(g,'Ways to pay',X0,y,FT.h3);y+=12;PAY.forEach(([a,b],i)=>{rr(g,X0,y+12+i*54,TW,46,12);g.fillStyle=tint(acc(),.08+i%2*.04);g.fill();T(g,a,X0+20,y+44+i*54,FT.bodyB,acc());wrap(g,b,X0+230,y+44+i*54,TW-250,28,{font:FT.small});});y+=300;
  y=keyWords(p,y,[['change','the money you get back when you pay more than the cost'],['debit','paying with money from your own bank account']]);
  predict(p,y,S,'p27','Items cost $8, $6 and $9. You pay with $50. Estimate: is the change more or less than $25?','*More.* The total is $23, so the change is $27.');},
 readout(p,S,y){const g=p.g,st=S.st,tot=st.cart.reduce((a,i)=>a+GOODS[i].p,0);T(g,'Cart: $'+tot+(st.cart.length?'  ('+st.cart.map(i=>GOODS[i].n).join(', ')+')':''),X0,y+44,ZS(40),acc());
  T(g,st.paid?'Paid $'+st.paid+' cash  →  change $'+(st.paid-tot):'Paying by: '+PAY[st.method][0]+' — '+PAY[st.method][1],X0,y+86,FT.small,INK);return y+96;},
 build(S,grp,mode,game){const st=S.st;const shelf=mk(new THREE.BoxGeometry(4.3,.08,1.2),lam('#d9c3a0'),20);shelf.position.set(0,.04,-2.4);grp.add(shelf);
  function goodMesh(gd){const g=new THREE.Group();let m;if(gd.sh==='ball'){m=mk(G('gball',()=>new THREE.SphereGeometry(.2,18,14)),lam(gd.col),0);m.position.y=.2;}
    else if(gd.sh==='kite'){const s=new THREE.Shape();s.moveTo(0,.3);s.lineTo(.2,0);s.lineTo(0,-.3);s.lineTo(-.2,0);s.closePath();const geo=new THREE.ExtrudeGeometry(s,{depth:.04,bevelEnabled:false});m=mk(geo,lam(gd.col),20);m.position.y=.34;}
    else if(gd.sh==='book'){m=mk(G('gbook',()=>new THREE.BoxGeometry(.4,.1,.3)),lam(gd.col),20);m.position.y=.05;}else if(gd.sh==='box'){m=mk(G('gbox',()=>new THREE.BoxGeometry(.42,.14,.32)),lam(gd.col),20);m.position.y=.07;}
    else if(gd.sh==='can'){m=mk(G('gcan',()=>new THREE.CylinderGeometry(.14,.14,.28,18)),lam(gd.col),20);m.position.y=.14;}else{m=mk(G('gcap',()=>new THREE.SphereGeometry(.18,16,10,0,Math.PI*2,0,Math.PI/2)),lam(gd.col),20);m.position.y=.02;}g.add(m);return g;}
  GOODS.forEach((gd,i)=>{const g=goodMesh(gd);g.position.set(-1.8+i*.72,.08,-2.4);grp.add(g);const l=label(gd.n+' $'+gd.p,{size:.15,bg:'#ffffff'});l.position.set(0,.68,.0);g.add(l);A.drag(g,{tap:()=>addC(i)});});
  const cart=new THREE.Group();cart.position.set(.9,0,-.9);grp.add(cart);const bk=mk(new THREE.BoxGeometry(1.6,.5,.9),new THREE.MeshLambertMaterial({color:'#9fb4d1',transparent:true,opacity:.5}),25);bk.position.y=.4;cart.add(bk);
  [[-.65,-.38],[.65,-.38],[-.65,.38],[.65,.38]].forEach(([x,z])=>{const w=mk(G('cw',()=>new THREE.CylinderGeometry(.07,.07,.05,14)),lam(INK),0);w.rotation.x=Math.PI/2;w.position.set(x,.08,z);cart.add(w);});
  A.drag(cart,{tap:()=>{st.cart=[];st.paid=0;fillCart();}});const inC=new THREE.Group();cart.add(inC);const tot=label('$0',{size:.32,bg:'#ffffff'});tot.position.set(0,1.05,0);cart.add(tot);
  const bills=new THREE.Group();grp.add(bills);
  function fillCart(){clearGroup(inC);st.cart.forEach((i,k)=>{const g=goodMesh(GOODS[i]);g.scale.setScalar(.7);g.position.set(-.55+(k%4)*.36,.25+Math.floor(k/4)*.2,(k%2)*.2-.1);inC.add(g);});
    const t=st.cart.reduce((a,i)=>a+GOODS[i].p,0);tot.userData.set('$'+t);check();A.redraw();}
  function addC(i){if(st.cart.length>=8){A.bad('The cart is full.');return;}st.cart.push(i);st.paid=0;clearGroup(bills);A.pop();fillCart();}
  function payCash(b){const t=st.cart.reduce((a,i)=>a+GOODS[i].p,0);if(!t){A.bad('The cart is empty.');return;}if(b<t){A.bad('$'+b+' is not enough for $'+t+'.');return;}st.paid=b;st.method=0;clearGroup(bills);
    const bill=mk(new THREE.BoxGeometry(.75,.02,.36),lam(b===20?'#7fd0a0':'#e98f8f'),20);bill.position.set(-1.2,.4,-.9);bills.add(bill);const bl=label('$'+b,{size:.2});bl.position.set(-1.2,.6,-.9);bills.add(bl);
    hop(bill,V(.2,.05,-.9),.4,.5);A.say('Change: $'+b+' − $'+t+' = $'+(b-t));A.redraw();}
  function check(){if(mode==='play'&&st.need&&st.cart.length===st.need.length&&st.need.slice().sort().join()===st.cart.slice().sort().join()){st.need=null;const t=st.cart.reduce((a,i)=>a+GOODS[i].p,0);if(st.afterNeed)st.afterNeed(t);}}
  fillCart();
  return {info:()=>'Total $'+st.cart.reduce((a,i)=>a+GOODS[i].p,0),
    controls:()=>{if(mode==='play'&&st.ask)return st.ask.opts.map(o=>({t:String(o),big:true,fn:()=>{if(o===st.ask.ans)game.solved(st.ask.ok);else A.bad('Not quite. Try again!');}}));
      const c=[{t:'Pay $20',fn:()=>payCash(20)},{t:'Pay $50',fn:()=>payCash(50)},{t:'Empty cart',fn:()=>{st.cart=[];st.paid=0;clearGroup(bills);fillCart();}}];
      return mode==='learn'?c.concat(PAY.slice(1).map(([n],i)=>({t:n,on:st.method===i+1,fn:()=>{st.method=i+1;st.paid=0;clearGroup(bills);A.redraw();}}))):c;},
    demo(n){if(n==='empty'){st.cart=[];st.paid=0;clearGroup(bills);fillCart();return;}if(n==='ball'){addC(0);return;}if(n==='kite'){addC(1);return;}if(n==='pay20'){payCash(20);return;}if(n==='cart'){st.cart=[];st.paid=0;clearGroup(bills);fillCart();A.seq([[700,()=>addC(0)],[900,()=>addC(1)],[900,()=>A.say('$7 + $9 = $16')]]);}if(n==='pay'){st.cart=[0,1];fillCart();A.seq([[800,()=>payCash(20)]]);}},
    task(r){st.ask=null;st.need=null;st.afterNeed=null;st.cart=[];st.paid=0;clearGroup(bills);fillCart();
      if(r===0||r===1){const k=r===0?2:3;const items=shuffle([0,1,2,3,4,5]).slice(0,k);st.need=items;st.afterNeed=t=>{st.ask={ans:'$'+t,opts:shuffle(['$'+t,'$'+(t+2),'$'+(t-1)]),ok:'Yes! The total is $'+t+'.'};A.say('Now choose the total.');A.redraw();};
        return 'Put the *'+items.map(i=>GOODS[i].n.toLowerCase()).join('* and the *')+'* in the cart. Then choose the total.';}
      if(r===2){st.cart=shuffle([0,1,2,3,4,5]).slice(0,3);fillCart();const t=st.cart.reduce((a,i)=>a+GOODS[i].p,0);const b=t<=20?20:50;st.ask={ans:'$'+(b-t),opts:shuffle(['$'+(b-t),'$'+(b-t+1),'$'+(b-t+10)]),ok:'Yes! $'+b+' − $'+t+' = $'+(b-t)+'.'};
        return 'The cart costs *$'+t+'*. You pay with a *$'+b+' bill*. What is your change?';}
      if(r===3){st.ask={ans:'Debit card',opts:shuffle(['Debit card','Credit card','Gift card']),ok:'Yes! Debit takes money straight from your bank account.'};return 'Which payment takes money *straight from your bank account*?';}
      st.ask={ans:'Credit card',opts:shuffle(['Cash','Credit card','E-transfer']),ok:'Yes! With credit, you borrow and pay it back later.'};return 'Which payment means you *borrow money* and pay it back later?';}};}
});

/* =========================================================
   28. Spending, saving, investing, donating and good buys
   ========================================================= */
const JARS=[{k:'spend',n:'Spend',col:'#e4572e'},{k:'save',n:'Save',col:'#2f7de1'},{k:'invest',n:'Invest',col:'#16a36f'},{k:'donate',n:'Donate',col:'#f08a24'}];
P.lesson({id:'budget',title:'Earn, spend, save and share',strand:'Financial Literacy',codes:['F1.3','F1.4','F1.5'],
 guide:{goal:'Explain earning, spending, saving, investing and donating, describe how spending and saving are related and how choices differ between people, and decide whether a price is reasonable.',words:'earn, spend, save, invest, donate, budget, goal, reasonable price, better buy',
  ask:['Why might two people split their money differently?','If you spend more now, what happens to your savings goal?','How can you tell which package is the better buy?'],home:'Set up three jars at home: spend, save and share. Choose a savings goal and track it each week.'},
 learn:[{say:'Money in, money out.',speech:'Hana earns ten dollars. She can spend some, save some for a goal, invest some so it can grow, and donate some to help others. Watch the coins go into the jars.',view:'model',demo:'split'},
        {say:'Read about smart money choices.',speech:'When you spend more, you save less. A savings goal helps you decide. Before buying, compare prices to see if something is a good buy.',view:'read'},
        {say:'Watch: which is the better buy?',speech:'Six granola bars cost three dollars. Twelve bars cost five dollars. Twelve bars for five dollars is the better buy, because two packs of six would cost six dollars.',view:'model',demo:'compare'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: plan your money.',speech:'Your turn. Press Earn to get ten dollars, then tap jars to drop loonies in. Try a savings goal.',view:'model'}],
 fig:'Four money jars, a pile of earned loonies, and two packages to compare.',rz:.35,
 explore:['Press *Earn $10* to get ten loonies.','*Tap a jar* to drop one loonie into it.','Switch to *Compare* to find the better buy.'],
 tries:[['You save $3 a week. How many weeks until you have $15?','*5 weeks.* 5 × 3 = 15.'],['What does “invest” mean?','Putting money somewhere it can *grow* over time, like a savings account that pays interest.'],['Pens: 4 for $2, or 8 for $5. Which is the better buy?','*4 for $2.* 8 pens would cost $4 that way, which is less than $5.']],
 howTo:'Drop loonies into the jars to match the plan, or choose the better buy.',
 init:k=>({pile:0,jars:{spend:0,save:0,invest:0,donate:0},mode:'jars',plan:null,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'When you *earn* money, you choose what to do with it. Spending more now means saving less for later.')+16;
  [['Earn','get money for work or chores'],['Spend','buy things you need or want now'],['Save','keep money for a goal later'],['Invest','put money where it can grow'],['Donate','give money to help others']].forEach(([a,b],i)=>{
    rr(g,X0,y+i*52,180,44,22);g.fillStyle=['#8b5cf6','#e4572e','#2f7de1','#16a36f','#f08a24'][i];g.fill();T(g,a,X0+90,y+31+i*52,FT.bodyB,'#fff','center');T(g,b,X0+200,y+31+i*52,FT.body);});y+=276;
  rr(g,X0,y,TW,120,16);g.fillStyle=tint(acc(),.1);g.fill();T(g,'Good buy?',X0+24,y+40,FT.smallB,acc());T(g,'6 bars for $3   vs   12 bars for $5',X0+24,y+82,ZS(36));y+=150;
  y=para(p,y,'12 bars at the first price would cost *$6*, so *12 for $5* is the better buy, if you will use them all.')+10;
  y=keyWords(p,y,[['budget','a plan for how to use your money'],['reasonable price','a fair price compared with other choices']]);
  predict(p,y,S,'p28','You earn $10 and want to save $6. How much is left to spend and donate?','*$4.* 10 − 6 = 4.');},
 readout(p,S,y){const g=p.g,st=S.st;if(st.mode==='jars'){T(g,JARS.map(j=>j.n+' $'+st.jars[j.k]).join('   ·   '),X0,y+44,FT.bodyB,acc());T(g,'Loonies left to place: '+st.pile,X0,y+84,FT.body);return y+94;}
  T(g,'Which package is the better buy?',X0,y+44,FT.bodyB,acc());return y+60;},
 build(S,grp,mode,game){const st=S.st;const jarG=new THREE.Group(),cmpG=new THREE.Group();grp.add(jarG,cmpG);
  const coinGeo=G('loonie',()=>new THREE.CylinderGeometry(.13,.13,.04,11));const coinM=lam('#e6c15a');
  const jars=JARS.map((j,i)=>{const g=new THREE.Group();g.position.set(-1.65+i*1.1,0,-2.2);jarG.add(g);const glass=mk(new THREE.CylinderGeometry(.38,.36,.9,28,1,true),new THREE.MeshLambertMaterial({color:'#e6f6ff',transparent:true,opacity:.4,side:THREE.DoubleSide}),25);glass.position.y=.45;g.add(glass);
    const lid=mk(new THREE.CylinderGeometry(.4,.4,.08,28),lam(j.col),20);lid.position.y=.94;g.add(lid);const l=label(j.n,{size:.2,color:j.col});l.position.set(0,1.2,0);g.add(l);const cg=new THREE.Group();g.add(cg);g.userData.cg=cg;A.drag(g,{tap:()=>drop(j.k)});return g;});
  const pileG=new THREE.Group();pileG.position.set(-1.2,0,-.75);jarG.add(pileG);const pl=label('earned',{size:.17,color:GREY});pl.position.set(-1.2,.6,-.35);jarG.add(pl);
  function drawJars(){JARS.forEach((j,i)=>{const cg=jars[i].userData.cg;clearGroup(cg);for(let k=0;k<st.jars[j.k];k++){const c=new THREE.Mesh(coinGeo,coinM);c.castShadow=true;c.position.set(((k%3)-1)*.12,.05+Math.floor(k/3)*.05,((k%2)-.5)*.1);c.rotation.y=k;cg.add(c);}});
    clearGroup(pileG);for(let k=0;k<st.pile;k++){const c=new THREE.Mesh(coinGeo,coinM);c.castShadow=true;c.position.set((k%5)*.3,.03+Math.floor(k/5)*.045,0);pileG.add(c);}check();A.redraw();}
  function earn(){if(st.pile+Object.values(st.jars).reduce((a,b)=>a+b,0)>=20){A.bad('That is a lot of money! Empty the jars first.');return;}st.pile+=10;A.pop();A.say('You earned $10!');drawJars();}
  function drop(k){if(st.pile<=0){A.bad('Press Earn first, or no loonies are left.');return;}const coin=new THREE.Mesh(coinGeo,coinM);coin.position.set(-1.2+((st.pile-1)%5)*.3,.1,-.75);jarG.add(coin);st.pile--;
    const j=jars[JARS.findIndex(x=>x.k===k)];hop(coin,V(j.position.x,1.0,j.position.z),.5,.4).then(()=>{jarG.remove(coin);st.jars[k]++;A.pop();drawJars();});}
  function check(){if(mode==='play'&&st.plan&&JARS.every(j=>st.jars[j.k]===(st.plan[j.k]||0)))game.solved('Your plan worked: '+JARS.filter(j=>st.jars[j.k]).map(j=>j.n+' $'+st.jars[j.k]).join(', ')+'.');}
  const packs=[{n:6,p:3,x:-1.1},{n:12,p:5,x:1.1}];let cmp=[];
  function drawCmp(a,b){clearGroup(cmpG);cmp=[a,b];[a,b].forEach((pk,i)=>{const g=new THREE.Group();g.position.set(i?1.1:-1.1,0,-1.7);cmpG.add(g);const bx=mk(new THREE.BoxGeometry(1.4,.22,.9),lam(i?'#ffd27a':'#c9e7a3'),20);bx.position.y=.11;g.add(bx);
    for(let k=0;k<pk.n;k++){const bar=mk(G('gbar',()=>new THREE.BoxGeometry(.18,.07,.32)),lam('#b07a3c'),0);bar.position.set(-.55+(k%6)*.22,.27+Math.floor(k/6)*.08,0);g.add(bar);}
    const l=label(pk.n+' '+(pk.it||'bars')+' for $'+pk.p,{size:.24,bg:'#ffffff'});l.position.set(0,.85,0);g.add(l);A.drag(g,{tap:()=>pickPack(i)});});A.redraw();}
  function pickPack(i){if(mode!=='play'||!st.better)return;if(i===st.better.ans)game.solved(st.better.ok);else A.bad('Compare: what would the same amount cost at each price?');}
  function setMode(m){st.mode=m;jarG.visible=m==='jars';cmpG.visible=m==='cmp';if(m==='cmp')drawCmp(packs[0],packs[1]);A.redraw();}
  drawJars();setMode(st.mode);
  return {info:()=>st.mode==='jars'?'Loonies to place: '+st.pile:'Tap the better buy',
    controls:()=>{if(mode==='play'&&st.ask)return choices(game,st.ask.opts,st.ask.ans,st.ask.ok);
      if(st.mode==='cmp')return mode==='learn'?[{t:'Jars',fn:()=>setMode('jars')}]:[];
      return [{t:'Earn $10',go:true,fn:earn,dis:mode==='play'&&!!st.plan}].concat(JARS.map(j=>({t:'+ '+j.n,fn:()=>drop(j.k)})),[{t:'Empty jars',fn:()=>{st.jars={spend:0,save:0,invest:0,donate:0};st.pile=mode==='play'&&st.plan?10:0;drawJars();}}],mode==='learn'?[{t:'Compare',fn:()=>setMode('cmp')}]:[]);},
    demo(n){if(n==='jars'){st.pile=0;st.jars={spend:0,save:0,invest:0,donate:0};setMode('jars');drawJars();return;}if(n==='earn'){earn();return;}const DK={dsp:'spend',dsv:'save',din:'invest',ddo:'donate'};if(DK[n]){drop(DK[n]);return;}if(n==='cmp'){setMode('cmp');return;}if(n==='split'){setMode('jars');st.jars={spend:0,save:0,invest:0,donate:0};st.pile=0;drawJars();A.seq([[600,earn],[700,()=>drop('spend')],[300,()=>drop('spend')],[300,()=>drop('spend')],[500,()=>drop('save')],[300,()=>drop('save')],[300,()=>drop('save')],[300,()=>drop('save')],[500,()=>drop('invest')],[300,()=>drop('invest')],[500,()=>drop('donate')]]);}
      if(n==='compare')setMode('cmp');},
    task(r){st.ask=null;st.plan=null;st.better=null;st.jars={spend:0,save:0,invest:0,donate:0};
      if(r===0||r===4){setMode('jars');st.pile=10;st.plan=r===0?{save:5,spend:3,donate:2}:{spend:4,save:4,invest:2};drawJars();return 'You earned $10. Plan: '+JARS.filter(j=>st.plan[j.k]).map(j=>'*'+j.n.toLowerCase()+' $'+st.plan[j.k]+'*').join(', ')+'. Drop the loonies in.';}
      if(r===1){setMode('jars');st.pile=0;drawJars();const w=pick([3,4,5]),goal=w*rnd(4,6);st.ask={ans:goal/w,opts:opts(goal/w,[-1,1,2],1),ok:'Yes! '+goal/w+' × $'+w+' = $'+goal+'.'};return 'You save *$'+w+' a week* for a *$'+goal+'* game. How many weeks?';}
      if(r===2){setMode('cmp');const a={n:4,p:2,it:'pens'},b={n:8,p:5,it:'pens'};drawCmp(a,b);st.better={ans:0,ok:'Yes! 8 pens at 4 for $2 would cost $4, less than $5.'};return 'Tap the *better buy*: 4 pens for $2, or 8 pens for $5?';}
      setMode('jars');st.pile=0;drawJars();st.ask={ans:'Invest',opts:shuffle(['Invest','Spend','Donate']),ok:'Yes! Investing puts money where it can grow.'};return 'Which word means putting money where it can *grow* over time?';}};}
});
})();
