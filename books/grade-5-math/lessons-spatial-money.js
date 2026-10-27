/* The Interactive Classroom: Grade 5 Math — Spatial Sense (24–30) and Financial Literacy (31–33) */
(function(){
"use strict";
const P=window.PM;if(!P||P.failed||!P.THREE)return;
const {THREE,V,W,D,PY,PX,X0,TW,INK,RED,BLUE,GREY,VIBE,FT,ZS,G,M,lam,mk,unitBox,cellMat,label,starGeo,wedgeGeo,clearGroup,disposeObj,rr,T,wrap,para,header,keyWords,predict,box,caption,cxOf,cyOf,tint,moveTo,hop,tween,burst,easeOut,easeIO,A}=P;
const acc=()=>P.ACC;
const rnd=(a,b)=>a+Math.floor(Math.random()*(b-a+1)),pick=a=>a[Math.floor(Math.random()*a.length)],shuffle=a=>a.slice().sort(()=>Math.random()-.5);
function choices(game,list,ans,ok,lab){return list.map(o=>({t:lab?lab(o):String(o),big:true,fn:()=>{if(o===ans){if(game)game.solved(ok);else A.good(ok);}else A.bad('Not quite. Try again!');}}));}
function opts(ans,spread,min){const s=new Set([ans]);let k=0;while(s.size<3&&k<60){k++;const v=Math.round((ans+pick(spread))*100)/100;if(v>=(min==null?0:min))s.add(v);}return shuffle([...s]);}
/* flat polygon slab from points already in local (x,z) */
function slab(pts,col,h,op){const s=new THREE.Shape();pts.forEach(([x,z],i)=>i?s.lineTo(x,-z):s.moveTo(x,-z));s.closePath();const geo=new THREE.ExtrudeGeometry(s,{depth:h||.08,bevelEnabled:false});geo.rotateX(-Math.PI/2);
  return mk(geo,op?new THREE.MeshLambertMaterial({color:col,transparent:true,opacity:op}):lam(col),20);}
function seg(a,b,col,r){const len=a.distanceTo(b);const m=new THREE.Mesh(new THREE.CylinderGeometry(r,r,len,8),lam(col));m.position.copy(a).add(b).multiplyScalar(.5);m.quaternion.setFromUnitVectors(V(0,1,0),b.clone().sub(a).normalize());return m;}
const money=v=>'$'+v.toFixed(2);

/* =========================================================
   24. Triangles
   ========================================================= */
const TCOL={acute:'#16a36f',right:'#2f7de1',obtuse:'#f08a24'};
function triInfo(p){const d2=(a,b)=>(a[0]-b[0])**2+(a[1]-b[1])**2;const s=[d2(p[1],p[2]),d2(p[0],p[2]),d2(p[0],p[1])];
  const ang=[0,1,2].map(i=>{const a=p[i],b=p[(i+1)%3],c=p[(i+2)%3];const u=[b[0]-a[0],b[1]-a[1]],v=[c[0]-a[0],c[1]-a[1]];const dot=u[0]*v[0]+u[1]*v[1];return {dot,deg:Math.round(Math.acos(Math.max(-1,Math.min(1,dot/Math.sqrt(d2(a,b)*d2(a,c)))))*180/Math.PI)};});
  const byA=ang.some(a=>a.dot===0)?'right':ang.some(a=>a.dot<0)?'obtuse':'acute';const eq=(s[0]===s[1])+(s[1]===s[2])+(s[0]===s[2]);const byS=eq===3?'equilateral':eq>=1?'isosceles':'scalene';
  const area2=Math.abs((p[1][0]-p[0][0])*(p[2][1]-p[0][1])-(p[2][0]-p[0][0])*(p[1][1]-p[0][1]));return {s,len:s.map(Math.sqrt),ang,byA,byS,area2};}
P.lesson({id:'triangles5',title:'Classifying and constructing triangles',strand:'Spatial Sense',codes:['E1.1'],
 guide:{goal:'Identify the geometric properties of triangles, classify them by side lengths and by angles, and construct triangles when given side or angle measurements.',words:'equilateral, isosceles, scalene, acute, right, obtuse, vertex, side, angle',
  ask:['Can a triangle have two right angles? Why not?','What do you notice about the angles in an isosceles triangle?','How would you construct a triangle with sides of 3, 4 and 5 cm?'],home:'Make triangles from straws or pipe cleaners cut to different lengths. Name each one by its sides and its angles.'},
 learn:[{say:'Triangles have two names.',speech:'Every triangle gets a name from its sides and a name from its angles. Watch Amani move the vertex. The triangle changes from acute, to right, to obtuse.',view:'model',demo:'reshape'},
        {say:'Read the six names.',speech:'By sides: equilateral has three equal sides, isosceles has two, and scalene has none. By angles: acute has three angles smaller than ninety degrees, right has one right angle, and obtuse has one angle bigger than ninety degrees.',view:'read'},
        {say:'Watch: construct a 3, 4, 5 triangle.',speech:'Construct a triangle with sides three, four and five centimetres. Draw a base of four, then a side of three at a right angle. The third side measures five. It is a right scalene triangle.',view:'model',demo:'build'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: drag the corners.',speech:'Your turn. Drag the yellow corners to make different triangles. Read the side lengths and the angles.',view:'model'}],
 fig:'A triangle on a centimetre grid. Drag the corners.',rz:.35,
 explore:['*Drag a yellow corner*: it snaps to the grid.','Read the *side lengths* (1 square = 1 cm) and *angles*.','The colour shows *acute*, *right* or *obtuse*.'],
 howTo:'Drag the corners to make the triangle the question describes.',
 init:k=>({p:[[1,1],[6,1],[3,5]],want:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'Name a triangle by its *sides* and by its *angles*. Equal sides are marked with matching ticks.')+16;
  const tri=(pts,col,ox,oy,name1,name2)=>{g.beginPath();pts.forEach(([x,yy],i)=>i?g.lineTo(ox+x*.8,oy+yy*.8):g.moveTo(ox+x*.8,oy+yy*.8));g.closePath();g.fillStyle=tint(col,.3);g.fill();g.lineWidth=4;g.strokeStyle=col;g.stroke();T(g,name1,ox+56,oy+126,FT.smallB,col,'center');T(g,name2,ox+56,oy+150,FT.cap,GREY,'center');};
  tri([[70,10],[130,120],[10,120]],'#16a36f',X0,y,'equilateral','3 equal sides');tri([[70,0],[120,120],[20,120]],'#8b5cf6',X0+290,y,'isosceles','2 equal sides');tri([[10,30],[140,120],[0,120]],'#e4572e',X0+580,y,'scalene','no equal sides');y+=172;
  tri([[40,10],[140,120],[0,120]],TCOL.acute,X0,y,'acute','all angles < 90°');tri([[10,10],[130,120],[10,120]],TCOL.right,X0+290,y,'right','one 90° angle');g.strokeStyle=INK;g.lineWidth=2;g.strokeRect(X0+290+8,y+80,16,16);
  tri([[150,40],[110,120],[0,120]],TCOL.obtuse,X0+580,y,'obtuse','one angle > 90°');y+=176;
  y=para(p,y,'The three angles of any triangle add to *180°*, so a triangle can never have two right angles.')+10;
  y=keyWords(p,y,[['isosceles','a triangle with at least two equal sides'],['obtuse angle','an angle greater than 90° and less than 180°']]);
  predict(p,y,S,'p24','A triangle has angles of 90°, 45° and 45°. Name it two ways.','*Right isosceles.* It has a right angle, and its two 45° angles sit across from two equal sides.');},
 readout(p,S,y){const g=p.g,st=S.st,t=triInfo(st.p);T(g,(t.byA+' '+t.byS).replace(/^./,c=>c.toUpperCase())+' triangle',X0,y+46,ZS(44),TCOL[t.byA]);
  T(g,'sides '+t.len.map(v=>v.toFixed(1)).join(', ')+' cm   ·   angles '+t.ang.map(a=>a.deg+'°').join(', '),X0,y+88,FT.bodyB);return y+98;},
 build(S,grp,mode,game){const st=S.st,s=.42,x0=-1.68,zb=-.45;const X=x=>x0+x*s,Z=y=>zb-y*s;
  const base=mk(new THREE.BoxGeometry(8*s+.2,.03,6*s+.2),[lam('#f3f6fb'),lam('#f3f6fb'),cellMat('#ffffff',8,6),lam('#f3f6fb'),lam('#f3f6fb'),lam('#f3f6fb')],20);base.position.set(X(4),.015,Z(3));grp.add(base);
  const shape=new THREE.Group();grp.add(shape);const corners=[0,1,2].map(i=>{const c=mk(new THREE.SphereGeometry(.13,16,12),lam('#ffd24a'),0);grp.add(c);return c;});
  function draw(){clearGroup(shape);const t=triInfo(st.p);const pts=st.p.map(([x,y])=>[X(x),Z(y)]);shape.add(slab(pts,TCOL[t.byA],.06,.75));
    const P3=st.p.map(([x,y])=>V(X(x),.1,Z(y)));for(let i=0;i<3;i++)shape.add(seg(P3[i],P3[(i+1)%3],INK,.022));
    const cen=P3[0].clone().add(P3[1]).add(P3[2]).multiplyScalar(1/3);
    for(let i=0;i<3;i++){const a=P3[(i+1)%3],b=P3[(i+2)%3];const mid=a.clone().add(b).multiplyScalar(.5);const out=mid.clone().sub(cen).setY(0).normalize().multiplyScalar(.28);const l=label(t.len[i].toFixed(1)+' cm',{size:.17,bg:'#ffffff'});l.position.copy(mid).add(out).setY(.3);shape.add(l);
      const toC=cen.clone().sub(P3[i]).setY(0).normalize().multiplyScalar(.42);const al=label(t.ang[i].deg+'°',{size:.18,color:t.ang[i].dot===0?TCOL.right:t.ang[i].dot<0?TCOL.obtuse:INK});al.position.copy(P3[i]).add(toC).setY(.32);shape.add(al);
      corners[i].position.set(P3[i].x,.15,P3[i].z);}
    const tl=label(t.byA+' '+t.byS,{size:.28,bg:'#ffffff',border:TCOL[t.byA]});tl.position.set(X(4),1.4,Z(6.4));shape.add(tl);check();A.redraw();}
  function setP(i,x,y){x=Math.max(0,Math.min(8,x));y=Math.max(0,Math.min(6,y));const np=st.p.map(q=>q.slice());np[i]=[x,y];if(triInfo(np).area2===0)return false;if(np[i][0]===st.p[i][0]&&np[i][1]===st.p[i][1])return false;st.p=np;draw();return true;}
  corners.forEach((c,i)=>A.drag(c,{h:.15,move:pt=>{const lp=grp.worldToLocal(pt.clone());setP(i,Math.round((lp.x-x0)/s),Math.round((zb-lp.z)/s));},drop:()=>{A.pop();draw();}}));
  function check(){if(mode==='play'&&!st.setup&&st.want&&st.want(triInfo(st.p),st.p))game.solved('Yes! A '+triInfo(st.p).byA+' '+triInfo(st.p).byS+' triangle.');}
  function anim(list){A.seq(list.map(([ms,i,x,y])=>[ms,()=>{setP(i,x,y);A.pop();}]));}
  draw();
  return {info:()=>{const t=triInfo(st.p);return t.byA+' '+t.byS+' triangle';},
    controls:()=>mode==='learn'?[{t:'Right triangle',fn:()=>{st.p=[[1,1],[6,1],[1,5]];draw();}},{t:'Isosceles',fn:()=>{st.p=[[1,1],[7,1],[4,5]];draw();}},{t:'Obtuse',fn:()=>{st.p=[[1,1],[5,1],[7,4]];draw();}},{t:'Scalene acute',go:true,fn:()=>{st.p=[[1,1],[6,1],[4,5]];draw();}}]:
      [{t:'Start over',fn:()=>{st.p=[[1,1],[5,1],[3,3]];draw();}}],
    demo(n){if(n==='reshape'){st.p=[[1,1],[7,1],[3,5]];draw();anim([[700,2,2,5],[700,2,1,5],[900,2,0,5],[900,2,-1,5]].filter(q=>q[2]>=0).concat([[800,0,2,1],[800,2,0,4]]));A.later(()=>A.say('acute → right → obtuse'),3000);}
      if(n==='build'){st.p=[[1,1],[2,1],[1,2]];draw();anim([[700,1,3,1],[600,1,5,1],[700,2,1,3],[600,2,1,4],[900,0,1,1]]);A.later(()=>A.say('Sides 3, 4 and 5 cm: a right scalene triangle.'),3600);}},
    task(r){st.setup=true;st.p=[[1,1],[5,1],[3,3]];const W5=[[t=>t.byA==='right','Make a *right* triangle.'],[t=>t.byS==='isosceles','Make an *isosceles* triangle (two equal sides).'],[t=>t.byA==='obtuse'&&t.byS==='scalene','Make an *obtuse scalene* triangle.'],
      [t=>t.s.slice().sort((a,b)=>a-b).join()==='9,16,25','Construct a triangle with sides *3 cm, 4 cm and 5 cm*.'],[t=>t.byA==='right'&&t.s.filter(v=>v===16).length===2,'Construct a *right* triangle with *two 4 cm sides*.']][r];
      st.want=W5[0];draw();st.setup=false;return W5[1];}};}
});

/* =========================================================
   25. Congruent shapes
   ========================================================= */
const CSH={tri:{p:[[0,0],[3,0],[0,2]],col:'#2f7de1'},para:{p:[[0,0],[3,0],[4,2],[1,2]],col:'#e4572e'},rect:{p:[[0,0],[4,0],[4,2],[0,2]],col:'#16a36f'},scal:{p:[[0,0],[4,0],[1,3]],col:'#8b5cf6'}};
const key=pts=>pts.map(q=>q.join(',')).sort().join(';');
P.lesson({id:'congruent5',title:'Congruent shapes',strand:'Spatial Sense',codes:['E1.2'],
 guide:{goal:'Identify and construct congruent triangles, rectangles and parallelograms, and show that two shapes are congruent by sliding, turning or flipping one onto the other.',words:'congruent, corresponding sides, corresponding angles, slide, turn, flip, match',
  ask:['How can you prove two shapes are congruent?','Are two rectangles with the same area always congruent?','Does turning a shape change its size?'],home:'Trace a cookie cutter twice on paper, then cut out the shapes. Turn and flip one to show they match exactly.'},
 learn:[{say:'Congruent means an exact match.',speech:'Two shapes are congruent if they are exactly the same size and shape. Watch Zane’s blue triangle slide, turn and land exactly on the outline. They are congruent.',view:'model',demo:'match'},
        {say:'Read about congruence.',speech:'Congruent shapes have matching sides and matching angles. Sliding, turning or flipping a shape does not change its size or shape, so the copy is still congruent.',view:'read'},
        {say:'Watch: a flip.',speech:'This parallelogram only matches after a flip. A flipped shape is still congruent, because every side and angle is the same.',view:'model',demo:'flip'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: match the outline.',speech:'Your turn. Drag the shape, or use slide, turn and flip, to fit it exactly on the outline.',view:'model'}],
 fig:'A shape and a dashed outline on a grid. Make them match.',rz:.35,
 explore:['*Drag* the coloured shape, or use the *arrows* to slide it.','Press *Turn 90°* or *Flip* to change its direction.','When it matches the outline, the shapes are *congruent*.'],
 howTo:'Slide, turn and flip the shape until it fits exactly on the outline. Or tap the shape that is congruent.',
 init:k=>({k:'tri',p:[[1,1],[4,1],[1,3]],g:[[5,2],[7,2],[7,5]],pick:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'*Congruent* shapes are the same *size* and the same *shape*. Their matching sides and angles are equal.')+16;
  const s=34,poly=(pts,ox,oy,col,dash)=>{g.beginPath();pts.forEach(([x,yy],i)=>i?g.lineTo(ox+x*s,oy-yy*s):g.moveTo(ox+x*s,oy-yy*s));g.closePath();if(dash){g.setLineDash([8,6]);g.lineWidth=3;g.strokeStyle=col;g.stroke();g.setLineDash([]);}else{g.fillStyle=tint(col,.45);g.fill();g.lineWidth=3;g.strokeStyle=col;g.stroke();}};
  poly([[0,0],[3,0],[0,2]],X0+10,y+120,'#2f7de1');T(g,'→ turn →',X0+150,y+80,FT.hand,BLUE);poly([[0,0],[2,0],[2,3]],X0+290,y+120,'#2f7de1');T(g,'congruent ✓',X0+400,y+90,FT.bodyB,'#16a36f');y+=150;
  poly([[0,0],[4,0],[4,2],[0,2]],X0+10,y+150,'#16a36f');poly([[0,0],[8,0],[8,1],[0,1]],X0+200,y+150,'#f08a24');T(g,'4 × 2 and 8 × 1: same area (8), not congruent ✗',X0+200,y+60,FT.small,RED);y+=180;
  y=para(p,y,'A *slide* (translation), a *turn* (rotation) and a *flip* (reflection) never change size or shape. Same *area* is not enough: a 4 × 2 and an 8 × 1 rectangle are *not* congruent.')+12;
  y=keyWords(p,y,[['congruent','exactly the same size and shape'],['corresponding sides','sides that match up when the shapes are placed on top of each other']]);
  predict(p,y,S,'p25','Is a 3 cm by 5 cm rectangle congruent to a 5 cm by 3 cm rectangle?','*Yes.* Turn one a quarter turn and it fits exactly on the other.');},
 readout(p,S,y){const g=p.g,st=S.st;if(st.pick){T(g,'Tap the shape that is congruent to the green one.',X0,y+44,FT.bodyB,acc());return y+60;}const ok=key(st.p)===key(st.g);
  T(g,ok?'Exact match: congruent!':'Not matched yet',X0,y+48,ZS(44),ok?'#16a36f':acc());T(g,'Slide with the arrows or drag · Turn 90° · Flip',X0,y+88,FT.body,GREY);return y+96;},
 build(S,grp,mode,game){const st=S.st,s=.38,x0=-1.9,zb=-.45,NX=10,NY=7;const X=x=>x0+x*s,Z=y=>zb-y*s;
  const base=mk(new THREE.BoxGeometry(NX*s+.2,.03,NY*s+.2),[lam('#f3f6fb'),lam('#f3f6fb'),cellMat('#ffffff',NX,NY),lam('#f3f6fb'),lam('#f3f6fb'),lam('#f3f6fb')],20);base.position.set(X(NX/2),.015,Z(NY/2));grp.add(base);
  const ghost=new THREE.Group(),mov=new THREE.Group(),pk=new THREE.Group();grp.add(ghost,mov,pk);let dragFrom=null,dragTo=null;
  function outline(pts,col){const g=new THREE.Group();const P3=pts.map(([x,y])=>V(X(x),.06,Z(y)));for(let i=0;i<P3.length;i++){const a=P3[i],b=P3[(i+1)%P3.length];const n=Math.max(2,Math.round(a.distanceTo(b)/.12));for(let k=0;k<n;k+=2){const q1=a.clone().lerp(b,k/n),q2=a.clone().lerp(b,Math.min(1,(k+1)/n));g.add(seg(q1,q2,col,.025));}}return g;}
  function draw(){clearGroup(ghost);clearGroup(mov);clearGroup(pk);if(st.pick){drawPick();return;}const col=CSH[st.k].col;ghost.add(outline(st.g,INK));ghost.add(slab(st.g.map(([x,y])=>[X(x),Z(y)]),'#cbd5e6',.02,.5));
    const sl=slab(st.p.map(([x,y])=>[X(x),Z(y)]),col,.12,.88);mov.add(sl);const P3=st.p.map(([x,y])=>V(X(x),.14,Z(y)));for(let i=0;i<P3.length;i++)mov.add(seg(P3[i],P3[(i+1)%P3.length],INK,.018));
    const dot=mk(new THREE.SphereGeometry(.07,10,8),lam('#ffd24a'),0);dot.position.copy(P3[0]).setY(.18);mov.add(dot);
    A.drag(sl,{h:.12,start:()=>{dragFrom=null;dragTo=null;},move:pt=>{const lp=grp.worldToLocal(pt.clone());if(!dragFrom)dragFrom=[lp.x,lp.z];dragTo=[lp.x,lp.z];/* the shape follows the finger, snapping to the grid */mov.position.set(Math.round((lp.x-dragFrom[0])/s)*s,.04,Math.round((lp.z-dragFrom[1])/s)*s);},drop:()=>{mov.position.set(0,0,0);if(!dragFrom||!dragTo)return;const dx=Math.round((dragTo[0]-dragFrom[0])/s),dy=Math.round((dragFrom[1]-dragTo[1])/s);dragFrom=null;dragTo=null;if(dx||dy)apply(q=>[q[0]+dx,q[1]+dy]);}});
    if(key(st.p)===key(st.g)){const ok=label('congruent ✓',{size:.3,bg:'#ffffff',border:'#16a36f'});ok.position.set(X(st.g[0][0]),.9,Z(st.g[0][1]));mov.add(ok);}A.redraw();}
  function apply(f){const np=st.p.map(f);if(np.some(([x,y])=>x<0||y<0||x>NX||y>NY)){A.bad('That would leave the grid.');draw();return;}st.p=np;A.pop();draw();
    if(key(st.p)===key(st.g)){A.good('A perfect match: the shapes are congruent!');if(mode==='play'&&!st.setup)game.solved('The shapes are congruent!');}}
  const turn=()=>{const [px,py]=st.p[0];apply(([x,y])=>[px-(y-py),py+(x-px)]);};const flip=()=>{const px=st.p[0][0];apply(([x,y])=>[2*px-x,y]);};
  function drawPick(){const ref=st.pick.ref;pk.add(slab(ref.map(([x,y])=>[X(x+.5),Z(y+3.5)]),'#16a36f',.1,.9));const rl=label('this one',{size:.18,color:'#16a36f'});rl.position.set(X(1.5),.35,Z(6.7));pk.add(rl);
    st.pick.c.forEach((c,i)=>{const ox=[4.3,7.3,4.3][i]+0,oy=[3.6,3.6,.4][i];const m=slab(c.map(([x,y])=>[X(x+ox),Z(y+oy)]),['#2f7de1','#e4572e','#f08a24'][i],.1,.9);pk.add(m);A.drag(m,{tap:()=>{if(i===st.pick.ans){A.good('Yes! Same size and shape.');if(mode==='play'&&!st.setup)game.solved('Yes! That one is congruent: it is just turned.');}else A.bad('Count the side lengths. Is it exactly the same size?');}});});A.redraw();}
  function setUp(k,start,goal){st.pick=null;st.k=k;st.p=start;st.g=goal;draw();}
  const put=(pts,dx,dy)=>pts.map(([x,y])=>[x+dx,y+dy]);
  draw();
  return {info:()=>st.pick?'Tap the congruent shape':key(st.p)===key(st.g)?'Congruent!':'Match the outline',
    controls:()=>st.pick?[]:[{t:'←',fn:()=>apply(([x,y])=>[x-1,y])},{t:'→',fn:()=>apply(([x,y])=>[x+1,y])},{t:'↑',fn:()=>apply(([x,y])=>[x,y+1])},{t:'↓',fn:()=>apply(([x,y])=>[x,y-1])},{t:'Turn 90°',go:true,fn:turn},{t:'Flip ↔',fn:flip}]
      .concat(mode==='learn'?[{t:'New puzzle',fn:()=>{const k=pick(Object.keys(CSH));let g=put(CSH[k].p,5,2);const t=rnd(0,3);for(let i=0;i<t;i++){const [px,py]=g[0];g=g.map(([x,y])=>[px-(y-py),py+(x-px)]);}if(g.some(([x,y])=>x<0||y<0||x>NX||y>NY))g=put(CSH[k].p,5,2);setUp(k,put(CSH[k].p,1,1),g);}}]:[]),
    demo(n){if(n==='match'){setUp('tri',put(CSH.tri.p,1,1),[[7,2],[7,5],[5,2]]);A.seq([[800,()=>apply(([x,y])=>[x+1,y])],[600,()=>apply(([x,y])=>[x+1,y])],[600,()=>apply(([x,y])=>[x+1,y])],[600,()=>apply(([x,y])=>[x+1,y])],[600,()=>apply(([x,y])=>[x+1,y])],[600,()=>apply(([x,y])=>[x+1,y])],[600,()=>apply(([x,y])=>[x,y+1])],[800,turn]]);}
      if(n==='flip'){setUp('para',put(CSH.para.p,1,1),[[9,4],[6,4],[5,6],[8,6]]);A.seq([[800,flip],[900,()=>apply(([x,y])=>[x+4,y])],[600,()=>apply(([x,y])=>[x+4,y])],[600,()=>apply(([x,y])=>[x,y+3])]]);}},
    task(r){st.setup=true;let txt;
      if(r===0){const k=pick(['rect','tri']);setUp(k,put(CSH[k].p,0,0),put(CSH[k].p,rnd(4,6),rnd(2,4)));txt='Slide the shape onto the outline to show they are *congruent*.';}
      else if(r===1){let g=put(CSH.tri.p,6,2);const [px,py]=g[0];g=g.map(([x,y])=>[px-(y-py),py+(x-px)]);setUp('tri',put(CSH.tri.p,1,1),g);txt='This copy is *turned*. Slide and turn to prove they are congruent.';}
      else if(r===2){const g=put(CSH.para.p,5,3).map(([x,y])=>[2*5-x+4,y]);setUp('para',put(CSH.para.p,0,0),g);txt='This parallelogram is *flipped*. Make it match exactly.';}
      else if(r===3){const ref=[[0,0],[3,0],[3,2],[0,2]];st.pick={ref,c:shuffle([0,1,2]).map(j=>[[[0,0],[2,0],[2,3],[0,3]],[[0,0],[4,0],[4,2],[0,2]],[[0,0],[3,0],[3,3],[0,3]]][j]),ans:-1};st.pick.ans=st.pick.c.findIndex(c=>c[2][0]===2&&c[2][1]===3);draw();txt='Tap the shape that is *congruent* to the green rectangle.';}
      else{let g=put(CSH.scal.p,5,2);const [px,py]=g[0];for(let i=0;i<2;i++)g=g.map(([x,y])=>[px-(y-py),py+(x-px)]);g=put(g,3,3);setUp('scal',put(CSH.scal.p,0,0),g);txt='Turn and slide the triangle onto its *congruent* outline.';}
      st.setup=false;return txt;}};}
});

/* =========================================================
   26. Top, front and side views
   ========================================================= */
P.lesson({id:'views5',title:'Top, front and side views',strand:'Spatial Sense',codes:['E1.3'],
 guide:{goal:'Draw and identify the top, front and side views of objects built from cubes, and match drawings with objects.',words:'top view, front view, side view, perspective, structure, cube',
  ask:['Why can two different buildings have the same front view?','How does the top view show which squares have cubes?','Which view hides the cubes at the back?'],home:'Build a small tower of blocks or boxes. Each person stands on a different side and draws what they see.'},
 learn:[{say:'Three ways to look.',speech:'Layla’s structure is made of cubes. Its front view appears on the back wall, its side view on the left wall, and its top view on the floor panel. Watch the views change as we add cubes.',view:'model',demo:'build'},
        {say:'Read about views.',speech:'The front view shows what you see from the front: the tallest cube in each column. The side view shows the tallest cube in each row, seen from the side. The top view shows which squares are covered.',view:'read'},
        {say:'Watch: different buildings, same view.',speech:'Two different buildings can have the same front view. Watch: moving a cube to the back does not change the front view, but the side view changes.',view:'model',demo:'move'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: build and look.',speech:'Your turn. Tap a floor square to add a cube, or tap a cube to remove one. Watch all three views.',view:'model'}],
 fig:'A cube structure with its front, side and top views shown on the walls and panel.',rz:.4,
 explore:['*Tap a floor square* to add a cube (up to 3 high).','*Tap a cube* to take the top one away.','Read the *front*, *side* and *top* views.'],
 howTo:'Read the question. Tap the card that shows the right view, or build to match a view.',
 init:k=>({h:[[1,0,0],[2,1,0],[3,2,1]],cards:null,want:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'Builders and designers draw an object from different *views*. Each view is a flat drawing of what one side shows.')+16;
  const s=34,cube=(x,yy,c)=>{g.fillStyle=c;g.fillRect(x,yy,s-3,s-3);};const H=[[1,0,0],[2,1,0],[3,2,1]];
  // a simple isometric sketch
  const iso=(cx,cy)=>{for(let r=0;r<3;r++)for(let c=0;c<3;c++)for(let k=0;k<H[r][c];k++){const x=cx+(c-r)*28,yy=cy+(c+r)*16-k*32;g.fillStyle='#9cc2f5';g.beginPath();g.moveTo(x,yy);g.lineTo(x+28,yy+16);g.lineTo(x,yy+32);g.lineTo(x-28,yy+16);g.closePath();g.fill();g.strokeStyle='#2f7de1';g.lineWidth=2;g.stroke();
    g.fillStyle='#6ea8f5';g.beginPath();g.moveTo(x-28,yy+16);g.lineTo(x,yy+32);g.lineTo(x,yy+64);g.lineTo(x-28,yy+48);g.closePath();g.fill();g.stroke();g.fillStyle='#3d7fd9';g.beginPath();g.moveTo(x+28,yy+16);g.lineTo(x,yy+32);g.lineTo(x,yy+64);g.lineTo(x+28,yy+48);g.closePath();g.fill();g.stroke();}};
  iso(X0+110,y+70);
  const view=(ox,oy,cols,title)=>{cols.forEach((n,c)=>{for(let k=0;k<n;k++)cube(ox+c*s,oy-(k+1)*s,'#2f7de1');});g.strokeStyle=INK;g.lineWidth=2;g.beginPath();g.moveTo(ox-6,oy);g.lineTo(ox+3*s+6,oy);g.stroke();T(g,title,ox+s*1.5,oy+30,FT.smallB,INK,'center');};
  view(X0+280,y+210,[3,2,1],'front');view(X0+440,y+210,[1,2,3],'side (left)');
  const tp=(ox,oy)=>{for(let r=0;r<3;r++)for(let c=0;c<3;c++){if(H[r][c]){cube(ox+c*s,oy+r*s,'#16a36f');T(g,String(H[r][c]),ox+c*s+15,oy+r*s+24,FT.cap,'#fff','center');}else{g.strokeStyle='#cbd5e6';g.strokeRect(ox+c*s,oy+r*s,s-3,s-3);}}T(g,'top',ox+s*1.5,oy+3*s+24,FT.smallB,INK,'center');};tp(X0+620,y+90);y+=300;
  y=para(p,y,'The *top view* can show the number of cubes in each stack. The *front* and *side* views show the tallest stack in each column or row.')+12;
  y=keyWords(p,y,[['front view','what you see looking straight at the front'],['top view','what you see looking straight down']]);
  predict(p,y,S,'p26','A tower is 3 cubes tall and 1 cube wide. What does its top view look like?','*One square.* From above you only see the top of the tower.');},
 readout(p,S,y){const g=p.g,st=S.st;const n=st.h.flat().reduce((a,b)=>a+b,0);T(g,n+' cubes',X0,y+46,ZS(44),acc());T(g,'front '+fv(st.h).join('-')+'   ·   side '+sv(st.h).join('-')+'   ·   tallest '+Math.max(...st.h.flat()),X0,y+88,FT.bodyB);return y+96;},
 build(S,grp,mode,game){const st=S.st,c=.44,cx=.25,cz=-1.75;const bx=col=>cx+(col-1)*c,bz=row=>cz+(row-1)*c;
  const floor=new THREE.Group();grp.add(floor);const cubes=new THREE.Group(),views=new THREE.Group(),cardsG=new THREE.Group();grp.add(cubes,views,cardsG);
  for(let r=0;r<3;r++)for(let q=0;q<3;q++){const t=mk(G('vtile',()=>new THREE.BoxGeometry(c-.04,.04,c-.04)),lam((r+q)%2?'#e6ecf5':'#f3f6fb'),20);t.position.set(bx(q),.02,bz(r));floor.add(t);A.drag(t,{tap:()=>add(r,q)});}
  const wallB=mk(new THREE.BoxGeometry(1.5,1.45,.04),lam('#ffffff'),20);wallB.position.set(cx,.72,-3.05);grp.add(wallB);const lb=label('FRONT view',{size:.17,color:'#2f7de1'});lb.position.set(cx,1.6,-3.0);grp.add(lb);
  const wallS=mk(new THREE.BoxGeometry(.04,1.45,1.5),lam('#ffffff'),20);wallS.position.set(-1.35,.72,cz);grp.add(wallS);const ls=label('SIDE view',{size:.17,color:'#e4572e'});ls.position.set(-1.35,1.6,cz);grp.add(ls);
  const tpan=mk(new THREE.BoxGeometry(1.45,.03,1.45),lam('#ffffff'),20);tpan.position.set(1.65,.015,-.55);grp.add(tpan);const lt=label('TOP view',{size:.17,color:'#16a36f'});lt.position.set(1.65,.3,-1.45);grp.add(lt);
  const vs=.42;
  function draw(){clearGroup(cubes);clearGroup(views);for(let r=0;r<3;r++)for(let q=0;q<3;q++)for(let k=0;k<st.h[r][q];k++){const m=unitBox(1,1,1,'#6ea8f5',c*.96);m.position.set(bx(q),.04+c*.48+k*c*.96,bz(r));cubes.add(m);A.drag(m,{tap:()=>rem(r,q)});}
    fv(st.h).forEach((n,q)=>{for(let k=0;k<n;k++){const m=mk(G('vfv',()=>new THREE.BoxGeometry(vs*.94,vs*.94,.03)),lam('#2f7de1'),0);m.position.set(cx+(q-1)*vs,.12+vs/2+k*vs,-3.02);views.add(m);}});
    sv(st.h).forEach((n,r)=>{for(let k=0;k<n;k++){const m=mk(G('vsv',()=>new THREE.BoxGeometry(.03,vs*.94,vs*.94)),lam('#e4572e'),0);m.position.set(-1.32,.12+vs/2+k*vs,cz+(r-1)*vs);views.add(m);}});
    for(let r=0;r<3;r++)for(let q=0;q<3;q++)if(st.h[r][q]){const m=mk(G('vtv',()=>new THREE.BoxGeometry(vs*.94,.03,vs*.94)),lam('#16a36f'),0);m.position.set(1.65+(q-1)*vs,.04,-.55+(r-1)*vs);views.add(m);const l=label(String(st.h[r][q]),{size:.16,color:'#fff'});l.position.set(1.65+(q-1)*vs,.12,-.55+(r-1)*vs);views.add(l);}
    check();A.redraw();}
  function add(r,q){if(st.cards&&!st.build)return;if(st.h[r][q]>=3){A.bad('That stack is 3 cubes tall already.');return;}st.h[r][q]++;A.pop();draw();}
  function rem(r,q){if(st.cards&&!st.build)return;if(st.h[r][q]<=0)return;st.h[r][q]--;A.pop();draw();}
  function check(){if(mode==='play'&&!st.setup&&st.build&&st.build(st.h))game.solved('Your building has exactly that view!');}
  function cardTex(kind,data){const cv=document.createElement('canvas');cv.width=cv.height=192;const g=cv.getContext('2d');g.fillStyle='#ffffff';g.fillRect(0,0,192,192);g.strokeStyle='#1b2236';g.lineWidth=6;g.strokeRect(3,3,186,186);const s=46,ox=27;
    if(kind==='top'){for(let r=0;r<3;r++)for(let q=0;q<3;q++){g.fillStyle=data[r][q]?'#16a36f':'#eef2f8';g.fillRect(ox+q*s,ox+r*s,s-4,s-4);}}
    else data.forEach((n,i)=>{for(let k=0;k<n;k++){g.fillStyle=kind==='front'?'#2f7de1':'#e4572e';g.fillRect(ox+i*s,165-(k+1)*s,s-4,s-4);}});
    const t=new THREE.CanvasTexture(cv);t.anisotropy=4;return new THREE.MeshLambertMaterial({map:t});}
  function drawCards(){clearGroup(cardsG);if(!st.cards)return;st.cards.list.forEach((d,i)=>{const side=lam('#ffffff');const m=mk(new THREE.BoxGeometry(.72,.04,.72),[side,side,cardTex(st.cards.kind,d),side,side,side],20);m.position.set(-1.75+i*.0,.06,-2.55+i*.82);
      m.rotation.y=0;cardsG.add(m);const l=label(String.fromCharCode(65+i),{size:.18,color:INK});l.position.set(-2.2,.2,-2.55+i*.82);cardsG.add(l);A.drag(m,{tap:()=>{if(i===st.cards.ans){A.good('Yes! That is the '+st.cards.kind+' view.');if(mode==='play'&&!st.setup)game.solved('Yes! Card '+String.fromCharCode(65+i)+' is the '+st.cards.kind+' view.');}else A.bad('Look again from the '+st.cards.kind+'.');}});});
    wallS.visible=ls.visible=false;A.redraw();}
  draw();
  return {info:()=>'front '+fv(st.h).join('-')+' · side '+sv(st.h).join('-'),
    controls:()=>mode==='learn'?[{t:'Clear',fn:()=>{st.h=[[0,0,0],[0,0,0],[0,0,0]];draw();}},{t:'New building',go:true,fn:()=>{st.h=randH();draw();}}]:[{t:'Clear',fn:()=>{if(st.build){st.h=[[0,0,0],[0,0,0],[0,0,0]];draw();}}}],
    demo(n){st.cards=null;st.build=null;clearGroup(cardsG);wallS.visible=ls.visible=true;if(n==='build'){st.h=[[0,0,0],[0,0,0],[0,0,0]];draw();const seq=[[2,0],[2,0],[2,0],[2,1],[2,1],[1,0],[1,0],[2,2],[1,1],[0,0]];A.seq(seq.map(([r,q])=>[450,()=>add(r,q)]));}
      if(n==='move'){st.h=[[0,0,0],[0,2,0],[1,1,1]];draw();A.seq([[1200,()=>{st.h=[[0,2,0],[0,0,0],[1,1,1]];A.pop();draw();A.say('Front view: the same. Side view: changed!');}]]);}},
    task(r){st.setup=true;st.build=null;st.cards=null;clearGroup(cardsG);wallS.visible=ls.visible=true;st.h=randH();draw();let txt;
      if(r<3||r===4){const kind=['front','side','top','front','side'][r];const right=kind==='top'?st.h.map(row=>row.map(v=>v?1:0)):kind==='front'?fv(st.h):sv(st.h);const list=[right];let k=0;
        while(list.length<3&&k<80){k++;const o=kind==='top'?randH().map(row=>row.map(v=>v?1:0)):(kind==='front'?fv(randH()):sv(randH()));if(!list.some(x=>JSON.stringify(x)===JSON.stringify(o)))list.push(o);}
        const sh=shuffle([0,1,2]);st.cards={kind,list:sh.map(i=>list[i]),ans:sh.indexOf(0)};
        if(kind!=='side'){views.children.filter(m=>Math.abs(m.position.z+3.02)<.01||Math.abs(m.position.y-.04)<.01).forEach(m=>m.visible=false);}views.visible=false;wallB.visible=lb.visible=tpan.visible=lt.visible=false;drawCards();
        txt='Tap the card that shows the *'+kind+' view* of the building.';}
      else{const tgt=fv(randH());st.h=[[0,0,0],[0,0,0],[0,0,0]];views.visible=true;wallB.visible=lb.visible=tpan.visible=lt.visible=true;draw();st.build=h=>JSON.stringify(fv(h))===JSON.stringify(tgt);txt='Build any structure with the front view *'+tgt.join(', ')+'* (heights left to right).';}
      st.setup=false;return txt;}};}
});
function fv(h){return [0,1,2].map(q=>Math.max(h[0][q],h[1][q],h[2][q]));}
function sv(h){return [0,1,2].map(r=>Math.max(...h[r]));}
function randH(){let h;do{h=[0,1,2].map(()=>[0,1,2].map(()=>Math.random()<.35?0:rnd(1,3)));}while(h.flat().filter(v=>v).length<3);return h;}

/* =========================================================
   27. Coordinates with scales, and transformations
   ========================================================= */
P.lesson({id:'coords5',title:'Coordinates and transformations',strand:'Spatial Sense',codes:['E1.4','E1.5'],
 guide:{goal:'Plot and read coordinates in the first quadrant using different scales, describe translations between points, and perform and predict translations, reflections and rotations up to 180° on a grid.',words:'coordinates, scale, ordered pair, translation, reflection, rotation, clockwise, counterclockwise, centre of rotation',
  ask:['If each grid line is worth 5, where is the point two lines across and three lines up?','How is a rotation different from a reflection?','Which point of a shape stays still in a rotation?'],home:'Draw a grid where each line counts by 2. Hide a “treasure” at a point and give clues with coordinates.'},
 learn:[{say:'Grids can count by 2s or 5s.',speech:'On Mateo’s grid each line is worth two. To plot six, ten, go three lines across, which is six, and five lines up, which is ten. Watch the pin.',view:'model',demo:'plot'},
        {say:'Read about transformations.',speech:'A translation slides a shape. A reflection flips it over a line. A rotation turns it around a point, clockwise or counterclockwise, by ninety or one hundred eighty degrees.',view:'read'},
        {say:'Watch: a rotation.',speech:'The flag turns ninety degrees clockwise around the yellow point. That point stays still while the rest of the shape turns. Then another ninety degrees makes one hundred eighty.',view:'model',demo:'rotate'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: transform the flag.',speech:'Your turn. Slide, flip and turn the flag. Change the scale, and drag the pin to plot points.',view:'model'}],
 fig:'A first-quadrant grid with a scale. A flag shape and a pin.',rz:.45,
 explore:['*Drag the pin* to plot a point. Change the *scale*.','Use the *arrows* to translate the flag.','*Flip* over the red line, or *turn* around the yellow point.'],
 howTo:'Plot the point, or transform the flag until it matches the dashed outline.',
 init:k=>({sc:2,pin:[3,5],sh:[[1,1],[1,4],[3,3]],gh:null,mir:false,ask:null,tgt:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'A *scale* tells what each grid line is worth. With a scale of 2, the lines are 0, 2, 4, 6… Always read *across (x) first*, then *up (y)*.')+16;
  const s=36,ox=X0+40,oy=y+290;g.strokeStyle='#d8dde8';g.lineWidth=2;for(let i=0;i<=7;i++){g.beginPath();g.moveTo(ox+i*s,oy);g.lineTo(ox+i*s,oy-7*s);g.stroke();g.beginPath();g.moveTo(ox,oy-i*s);g.lineTo(ox+7*s,oy-i*s);g.stroke();T(g,String(i*2),ox+i*s,oy+26,FT.cap,GREY,'center');T(g,String(i*2),ox-16,oy-i*s+7,FT.cap,GREY,'center');}
  g.strokeStyle=INK;g.lineWidth=3;g.beginPath();g.moveTo(ox,oy-7*s);g.lineTo(ox,oy);g.lineTo(ox+7*s,oy);g.stroke();g.beginPath();g.arc(ox+3*s,oy-5*s,9,0,Math.PI*2);g.fillStyle='#e4572e';g.fill();T(g,'(6, 10)',ox+3*s+14,oy-5*s-8,FT.smallB,'#e4572e');
  const tri=(pts,col,dash)=>{g.beginPath();pts.forEach(([a,b],i)=>i?g.lineTo(ox+a*s,oy-b*s):g.moveTo(ox+a*s,oy-b*s));g.closePath();if(dash){g.setLineDash([6,5]);g.strokeStyle=col;g.lineWidth=3;g.stroke();g.setLineDash([]);}else{g.fillStyle=tint(col,.5);g.fill();g.strokeStyle=col;g.lineWidth=3;g.stroke();}};
  tri([[1,1],[1,3],[2,2]],'#2f7de1');tri([[1,1],[3,1],[2,0]].map(([a,b])=>[a,b+0]),'#16a36f',true);
  [['Translation','slide: 3 right, 2 up'],['Reflection','flip over a line'],['Rotation','turn around a point: 90° or 180°, clockwise or counterclockwise']].forEach(([a,b],i)=>{T(g,a,X0+340,y+60+i*86,FT.bodyB,acc());wrap(g,b,X0+340,y+94+i*86,TW-340,28,{font:FT.small});});y+=330;
  y=keyWords(p,y,[['scale','the amount each grid line stands for'],['centre of rotation','the point a shape turns around']]);
  predict(p,y,S,'p27','Each grid line is 5. A point is 4 lines across and 2 lines up. What are its coordinates?','*(20, 10).* 4 × 5 = 20 across and 2 × 5 = 10 up.');},
 readout(p,S,y){const g=p.g,st=S.st;T(g,'Pin at ('+st.pin[0]*st.sc+', '+st.pin[1]*st.sc+')',X0,y+46,ZS(44),acc());T(g,'Scale: each line = '+st.sc+'   ·   flag corner A at ('+st.sh[0][0]*st.sc+', '+st.sh[0][1]*st.sc+')',X0,y+88,FT.bodyB);return y+96;},
 build(S,grp,mode,game){const st=S.st,s=.34,x0=-1.65,zb=-.4,N=8;const X=x=>x0+x*s,Z=y=>zb-y*s;
  const base=mk(new THREE.BoxGeometry(N*s+.2,.03,N*s+.2),[lam('#f3f6fb'),lam('#f3f6fb'),cellMat('#ffffff',N,N),lam('#f3f6fb'),lam('#f3f6fb'),lam('#f3f6fb')],20);base.position.set(X(N/2),.015,Z(N/2));grp.add(base);
  [[X(0),Z(0),X(N+.4),Z(0)],[X(0),Z(0),X(0),Z(N+.4)]].forEach(([a,b,c,d])=>{const len=Math.hypot(c-a,d-b);const m=new THREE.Mesh(new THREE.BoxGeometry(c!==a?len:.03,.04,d!==b?len:.03),lam(INK));m.position.set((a+c)/2,.05,(b+d)/2);grp.add(m);});
  const labs=new THREE.Group();grp.add(labs);const shG=new THREE.Group(),ghG=new THREE.Group();grp.add(shG,ghG);
  const mirror=new THREE.Mesh(new THREE.BoxGeometry(.05,.45,N*s+.2),new THREE.MeshLambertMaterial({color:'#e0453a',transparent:true,opacity:.5}));mirror.position.set(X(4),.22,Z(N/2));grp.add(mirror);
  const pin=new THREE.Group();const pm=mk(new THREE.ConeGeometry(.1,.3,16),lam('#e4572e'),0);pm.rotation.x=Math.PI;pm.position.y=.2;pin.add(pm);const ph=mk(new THREE.SphereGeometry(.1,14,10),lam('#e4572e'),0);ph.position.y=.4;pin.add(ph);grp.add(pin);
  const ptag=label('',{size:.2,bg:'#ffffff'});grp.add(ptag);const scl=label('',{size:.2,color:GREY});scl.position.set(X(N)+.15,.2,Z(N)-.15);grp.add(scl);
  function axes(){clearGroup(labs);for(let i=0;i<=N;i++){const lx=label(String(i*st.sc),{size:.16,color:GREY});lx.position.set(X(i),.1,Z(0)+.22);labs.add(lx);const ly=label(String(i*st.sc),{size:.16,color:GREY});ly.position.set(X(0)-.24,.1,Z(i));labs.add(ly);}scl.userData.set('1 line = '+st.sc);}
  function flag(pts,col,op,dash){const g=new THREE.Group();g.add(slab(pts.map(([x,y])=>[X(x),Z(y)]),col,dash?.02:.08,op));const P3=pts.map(([x,y])=>V(X(x),.1,Z(y)));if(!dash)for(let i=0;i<3;i++)g.add(seg(P3[i],P3[(i+1)%3],INK,.015));
    if(!dash){const d=mk(new THREE.SphereGeometry(.08,12,10),lam('#ffd24a'),0);d.position.copy(P3[0]).setY(.16);g.add(d);const a=label('A',{size:.15,color:INK});a.position.copy(P3[0]).add(V(-.14,.25,.12));g.add(a);}return g;}
  function draw(){axes();clearGroup(shG);clearGroup(ghG);shG.add(flag(st.sh,'#2f7de1',.85));if(st.gh)ghG.add(flag(st.gh,'#16a36f',.4,true));mirror.visible=st.mir;
    pin.visible=!st.gh;pin.position.set(X(st.pin[0]),0,Z(st.pin[1]));ptag.visible=pin.visible;ptag.userData.set('('+st.pin[0]*st.sc+', '+st.pin[1]*st.sc+')');ptag.position.set(X(st.pin[0]),.75,Z(st.pin[1]));check();A.redraw();}
  A.drag(pin,{h:.2,drop:pos=>{st.pin=[Math.max(0,Math.min(N,Math.round((pos.x-x0)/s))),Math.max(0,Math.min(N,Math.round((zb-pos.z)/s)))];A.pop();draw();}});
  function apply(f,name){const np=st.sh.map(f);if(np.some(([x,y])=>x<0||y<0||x>N||y>N)){A.bad('That would leave the grid.');return;}st.sh=np;A.pop();if(name)A.say(name);draw();}
  const rot=cw=>{const [px,py]=st.sh[0];apply(([x,y])=>cw?[px+(y-py),py-(x-px)]:[px-(y-py),py+(x-px)],cw?'90° clockwise':'90° counterclockwise');};
  const refl=()=>{st.mir=true;apply(([x,y])=>[8-x,y],'flip over the red line');};
  function check(){if(mode!=='play'||st.setup)return;if(st.gh&&st.sh.map(q=>q.join()).join(';')===st.gh.map(q=>q.join()).join(';'))game.solved('Exact match!');if(st.tgt&&st.pin[0]===st.tgt[0]&&st.pin[1]===st.tgt[1])game.solved('Yes! ('+st.tgt[0]*st.sc+', '+st.tgt[1]*st.sc+').');}
  draw();
  return {info:()=>'Scale '+st.sc+' · pin ('+st.pin[0]*st.sc+', '+st.pin[1]*st.sc+')',
    controls:()=>{if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok);
      const tr=[{t:'←',fn:()=>apply(([x,y])=>[x-1,y])},{t:'→',fn:()=>apply(([x,y])=>[x+1,y])},{t:'↑',fn:()=>apply(([x,y])=>[x,y+1])},{t:'↓',fn:()=>apply(([x,y])=>[x,y-1])},{t:'Turn 90° ↻',go:true,fn:()=>rot(true)},{t:'Turn 90° ↺',fn:()=>rot(false)},{t:'Flip over red line',fn:refl}];
      if(mode==='play'&&st.tgt)return [];return tr.concat(mode==='learn'?[1,2,5].map(k=>({t:'scale '+k,on:st.sc===k,fn:()=>{st.sc=k;draw();}})):[]);},
    demo(n){st.gh=null;st.ask=null;st.tgt=null;if(n==='plot'){st.sc=2;st.pin=[0,0];draw();A.seq([[700,()=>{st.pin=[3,0];A.pop();draw();A.say('3 lines across = 6');}],[1100,()=>{st.pin=[3,5];A.pop();draw();A.say('5 lines up = 10: (6, 10)');}]]);}
      if(n==='rotate'){st.sc=1;st.mir=false;st.sh=[[4,4],[4,7],[6,6]];draw();A.seq([[900,()=>rot(true)],[1300,()=>rot(true)],[1200,()=>A.say('Two quarter turns make 180°.')]]);}},
    task(r){st.setup=true;st.ask=null;st.tgt=null;st.gh=null;st.mir=false;let txt;
      if(r===0){st.sc=2;st.pin=[0,0];st.tgt=[rnd(1,8),rnd(1,8)];draw();txt='Each line = 2. Drag the pin to *('+st.tgt[0]*2+', '+st.tgt[1]*2+')*.';}
      else if(r===1){st.sc=5;st.pin=[rnd(1,8),rnd(1,8)];draw();const a='('+st.pin[0]*5+', '+st.pin[1]*5+')';st.ask={ans:a,o:shuffle([a,'('+st.pin[0]+', '+st.pin[1]+')','('+st.pin[1]*5+', '+st.pin[0]*5+')']).filter((x,i,arr)=>arr.indexOf(x)===i),ok:'Yes! Each line is 5.'};txt='Each line = 5. What are the *coordinates* of the pin?';}
      else if(r===2){st.sc=1;st.sh=[[1,1],[1,4],[3,3]];const dx=rnd(2,4),dy=rnd(1,3);st.gh=st.sh.map(([x,y])=>[x+dx,y+dy]);draw();txt='Translate the flag onto the outline. (It moves *'+dx+' right, '+dy+' up*.)';}
      else if(r===3){st.sc=1;st.sh=[[1,2],[1,5],[3,4]];st.gh=st.sh.map(([x,y])=>[8-x,y]);st.mir=true;draw();txt='Predict where the flag lands when it is *reflected* in the red line. Make it match.';}
      else{st.sc=1;st.sh=[[3,3],[3,6],[5,5]];const [px,py]=st.sh[0];st.gh=st.sh.map(([x,y])=>[px+(y-py),py-(x-px)]);if(Math.random()<.5)st.gh=st.gh.map(([x,y])=>[px+(y-py),py-(x-px)]);draw();
        txt='*Rotate* the flag around point A to match the outline. 90° or 180°?';}
      st.setup=false;return txt;}};}
});

/* =========================================================
   28. Metric units and converting
   ========================================================= */
const MU={length:['km','hm','dam','m','dm','cm','mm'],mass:['kg','hg','dag','g','dg','cg','mg'],capacity:['kL','hL','daL','L','dL','cL','mL']};
const mfmt=(q,i)=>{const d=6-i;let s=String(q);if(d>0){s=s.padStart(d+1,'0');s=s.slice(0,s.length-d)+'.'+s.slice(s.length-d);s=s.replace(/0+$/,'').replace(/\.$/,'');}const [a,b]=s.split('.');return (a.length>=5?a.replace(/\B(?=(\d{3})+(?!\d))/g,' '):a)+(b?'.'+b:'');};
P.lesson({id:'metric5',title:'Metric units and converting',strand:'Spatial Sense',codes:['E2.1','E2.2'],
 guide:{goal:'Use appropriate metric units to estimate and measure length, area, mass and capacity, and convert larger metric units into smaller ones using the base-ten relationships among units.',words:'kilometre, metre, centimetre, millimetre, kilogram, gram, litre, millilitre, convert, prefix',
  ask:['Why do you multiply by 1000 to change kilometres to metres?','Which unit would you use for the mass of a paper clip? Of a dog?','How many millilitres are in 2.5 L?'],home:'Read labels in the kitchen: 750 mL, 1.5 kg, 355 mL. Convert each one to the other unit together.'},
 learn:[{say:'Each step down is × 10.',speech:'Metric units are like a staircase. Each step down to a smaller unit multiplies the number by ten. Watch Keiko’s three kilometres walk down the stairs to metres: thirty, three hundred, three thousand.',view:'model',demo:'down'},
        {say:'Read the base-ten relationships.',speech:'One kilometre is one thousand metres. One metre is one hundred centimetres. One centimetre is ten millimetres. Kilograms, grams, litres and millilitres work the same way.',view:'read'},
        {say:'Watch: decimals convert too.',speech:'One point seven five metres walks down two steps to centimetres. Times ten, times ten: one hundred seventy-five centimetres.',view:'model',demo:'decimal'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: walk the stairs.',speech:'Your turn. Move the ball down or up the unit staircase and watch the number change.',view:'model'}],
 fig:'A metric staircase. Each step down multiplies by 10.',rz:.35,
 explore:['Press *▼ smaller unit* to step down (× 10).','Press *▲ bigger unit* to step up (÷ 10).','Switch between *length*, *mass* and *capacity*.'],
 howTo:'Step the ball down to the unit in the question, then choose the converted amount. Or choose the best unit.',
 init:k=>({kind:'length',q:3000000,i:0,start:0,hide:false,ask:null,need:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'Metric units are *base ten*. Each prefix is 10 times the next smaller one. To change a larger unit to a smaller one, *multiply*.')+16;
  const st=['km','hm','dam','m','dm','cm','mm'];st.forEach((u,i)=>{const x=X0+i*118,h=200-i*24;rr(g,x,y+220-h,110,h,8);g.fillStyle=tint(['#7c3aed','#8b5cf6','#a78bfa','#2f7de1','#16a36f','#e4572e','#f08a24'][i],.35);g.fill();T(g,u,x+55,y+220-h+36,FT.bodyB,INK,'center');if(i<6)T(g,'×10',x+110,y+240-h+26,FT.hand,BLUE,'center');});y+=250;
  [['1 km = 1000 m','1 kg = 1000 g'],['1 m = 100 cm','1 L = 1000 mL'],['1 cm = 10 mm','1 m² = 10 000 cm²']].forEach(([a,b],i)=>{T(g,a,X0,y+i*44,FT.bodyB,acc());T(g,b,X0+TW/2,y+i*44,FT.bodyB,acc());});y+=130;
  y=para(p,y,'*Estimate first:* a door is about 2 m tall, a paper clip has a mass of about 1 g, a juice box holds about 200 mL, a classroom floor is about 80 m².')+10;
  y=keyWords(p,y,[['kilo-','1000 times the base unit'],['milli-','one thousandth of the base unit']]);
  predict(p,y,S,'p28','How many grams are in 2.4 kg?','*2400 g.* 2.4 × 1000 = 2400.');},
 readout(p,S,y){const g=p.g,st=S.st,U=MU[st.kind];T(g,mfmt(st.q,st.start)+' '+U[st.start]+' = '+(st.hide&&st.i!==st.start?'?':mfmt(st.q,st.i))+' '+U[st.i],X0,y+52,ZS(48),acc());
  T(g,st.i>st.start?'× '+Math.pow(10,st.i-st.start)+' ('+(st.i-st.start)+' step'+(st.i-st.start>1?'s':'')+' down)':st.i<st.start?'÷ '+Math.pow(10,st.start-st.i):'Move the ball to convert.',X0,y+94,FT.bodyB);return y+100;},
 build(S,grp,mode,game){const st=S.st,cols=['#7c3aed','#8b5cf6','#a78bfa','#2f7de1','#16a36f','#e4572e','#f08a24'];const stairs=new THREE.Group();grp.add(stairs);
  const ball=mk(new THREE.SphereGeometry(.2,22,16),lam('#ffd24a'),0);grp.add(ball);const tag=label('',{size:.26,bg:'#ffffff'});grp.add(tag);const xs=i=>-2.0+i*.66,hs=i=>1.5-i*.2;
  function drawStairs(){clearGroup(stairs);const U=MU[st.kind];U.forEach((u,i)=>{const b=mk(new THREE.BoxGeometry(.62,hs(i),1.0),lam(cols[i]),20);b.position.set(xs(i),hs(i)/2,-1.7);stairs.add(b);const l=label(u,{size:.24,color:'#fff'});l.position.set(xs(i),hs(i)-.2,-1.17);stairs.add(l);
      A.drag(b,{tap:()=>moveTo2(i)});if(i<6){const a=label('×10',{size:.15,color:BLUE});a.position.set(xs(i)+.33,hs(i)+.12,-1.05);stairs.add(a);}});place(false);}
  function place(anim){const p=V(xs(st.i),hs(st.i)+.2,-1.7);if(anim)hop(ball,p,.35,.35);else ball.position.copy(p);tag.userData.set(st.hide&&st.i!==st.start?'? '+MU[st.kind][st.i]:mfmt(st.q,st.i)+' '+MU[st.kind][st.i]);tag.position.set(p.x,p.y+.6,-1.7);A.redraw();}
  function moveTo2(i){if(i===st.i)return;if(Math.abs(i-st.i)>1){const d=i>st.i?1:-1;step(d);A.later(()=>moveTo2(i),420);return;}step(i-st.i);}
  function step(d){const ni=st.i+d;if(ni<0||ni>6)return;if(ni<st.start&&mode==='play'){A.bad('Go down to smaller units.');return;}st.i=ni;A.pop();A.say(d>0?'× 10':'÷ 10');place(true);if(mode==='play'&&st.need!=null&&st.i===st.need)A.say('Now choose the amount.');A.redraw();}
  drawStairs();
  return {info:()=>mfmt(st.q,st.i)+' '+MU[st.kind][st.i],
    controls:()=>{if(mode==='play'&&st.ask&&(st.need==null||st.i===st.need))return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok);
      const c=[{t:'▲ bigger unit (÷10)',fn:()=>step(-1)},{t:'▼ smaller unit (×10)',go:true,big:true,fn:()=>step(1)}];
      return mode==='learn'?c.concat(Object.keys(MU).map(k=>({t:k,on:st.kind===k,fn:()=>{st.kind=k;drawStairs();}})),[{t:'New amount',fn:()=>{st.start=st.i=rnd(0,3);st.q=rnd(11,95)*Math.pow(10,6-st.i-1);drawStairs();}}]):c;},
    demo(n){if(n==='show'){st.hide=false;st.kind='length';st.q=3000000;st.i=st.start=0;drawStairs();return;}if(n==='st'){step(1);return;}st.hide=false;st.ask=null;st.need=null;st.kind='length';if(n==='down'){st.q=3000000;st.i=st.start=0;drawStairs();A.seq([[800,()=>step(1)],[700,()=>step(1)],[700,()=>step(1)],[900,()=>A.say('3 km = 3000 m')]]);}
      if(n==='decimal'){st.q=1750000;st.i=st.start=3;drawStairs();A.seq([[800,()=>step(1)],[700,()=>step(1)],[900,()=>A.say('1.75 m = 175 cm')]]);}},
    task(r){st.setup=true;st.ask=null;st.need=null;st.hide=true;let txt;const conv=(kind,from,to,val)=>{st.kind=kind;st.start=st.i=from;st.q=Math.round(val*Math.pow(10,6-from));st.need=to;drawStairs();
        const a=mfmt(st.q,to),U=MU[kind];const alt=[mfmt(st.q,to-1),mfmt(st.q,Math.min(6,to+1))];st.ask={ans:a,o:shuffle([a,...alt]).filter((x,i,arr)=>arr.indexOf(x)===i),ok:'Yes! '+mfmt(st.q,from)+' '+U[from]+' = '+a+' '+U[to]+'.'};
        return 'Convert *'+mfmt(st.q,from)+' '+U[from]+'* to *'+U[to]+'*. Walk the ball down, then choose.';};
      if(r===0)txt=conv('length',0,3,rnd(2,9));else if(r===1)txt=conv('length',3,5,rnd(105,195)/100);else if(r===2)txt=conv('mass',0,3,rnd(12,48)/10);else if(r===3)txt=conv('capacity',3,6,rnd(11,39)/10);
      else{st.hide=false;st.kind='length';st.i=st.start=3;st.q=1000000;drawStairs();const Q=pick([['the mass of a paper clip','g',['g','kg','mg']],['the length of a soccer field','m',['m','km','cm']],['the water in a bathtub','L',['L','mL','kL']],['the area of a page','cm²',['cm²','m²','km²']],['the distance from Toronto to Ottawa','km',['km','m','cm']]]);
        st.ask={ans:Q[1],o:shuffle(Q[2]),ok:'Yes! '+Q[1]+' is the best unit for '+Q[0]+'.'};txt='Which unit is best to measure *'+Q[0]+'*?';}
      st.setup=false;return txt;}};}
});

/* =========================================================
   29. Measuring and constructing angles
   ========================================================= */
P.lesson({id:'protractor5',title:'Measuring angles with a protractor',strand:'Spatial Sense',codes:['E2.3','E2.4'],
 guide:{goal:'Compare angles by matching and by measuring with non-standard units, explain how protractors work, use them to measure and construct angles up to 180°, and use benchmark angles to estimate.',words:'angle, degree (°), protractor, vertex, arm, benchmark angle, estimate',
  ask:['Why does a protractor have two rows of numbers?','How can 45°, 90° and 180° help you estimate an angle?','How many 15° wedges fit in a right angle?'],home:'Fold a paper circle in half, then quarters, then eighths. Use the folds as benchmarks of 180°, 90° and 45°.'},
 learn:[{say:'Count the wedges first.',speech:'Before protractors, Jordan measures with small wedges. This angle holds six wedges. If each wedge is fifteen degrees, the angle is ninety degrees. Watch them fill in.',view:'model',demo:'wedges'},
        {say:'Read how a protractor works.',speech:'A protractor is a half circle split into one hundred eighty degrees. Put its centre on the vertex. Line up zero with one arm. Read where the other arm crosses, on the scale that starts at zero.',view:'read'},
        {say:'Watch: construct 130°.',speech:'To construct a one hundred thirty degree angle, start with one arm on zero, then open the other arm until it reaches one hundred thirty. It is a bit less than one hundred thirty-five, our benchmark.',view:'model',demo:'build'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: open the angle.',speech:'Your turn. Drag the yellow tip to open the angle. Read the protractor, and try the wedges.',view:'model'}],
 fig:'A 3D protractor with a movable arm.',rz:.1,
 explore:['*Drag the yellow tip* to open the angle.','Use *+5°* and *−5°* for exact angles.','Turn on *wedges* to measure with 15° units.'],
 howTo:'Make the angle the question asks for, or read the protractor and choose the answer.',
 init:k=>({a:60,wedges:false,want:null,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'Angles are measured in *degrees (°)*. A *protractor* has 180 small steps around a half circle.')+16;
  const cx=X0+260,cy=y+240,R=220;g.beginPath();g.arc(cx,cy,R,Math.PI,0);g.closePath();g.fillStyle='#eef4ff';g.fill();g.strokeStyle='#2f7de1';g.lineWidth=3;g.stroke();
  for(let a=0;a<=180;a+=10){const r=a*Math.PI/180;g.beginPath();g.moveTo(cx+Math.cos(r)*R,cy-Math.sin(r)*R);g.lineTo(cx+Math.cos(r)*(R-(a%30?14:26)),cy-Math.sin(r)*(R-(a%30?14:26)));g.stroke();
    if(a%30===0){T(g,String(a),cx+Math.cos(r)*(R-48),cy-Math.sin(r)*(R-48)+8,FT.cap,'#2f7de1','center');T(g,String(180-a),cx+Math.cos(r)*(R+20),cy-Math.sin(r)*(R+20)+8,FT.cap,GREY,'center');}}
  g.strokeStyle=INK;g.lineWidth=5;g.beginPath();g.moveTo(cx+R,cy);g.lineTo(cx,cy);const ra=130*Math.PI/180;g.lineTo(cx+Math.cos(ra)*R,cy-Math.sin(ra)*R);g.stroke();g.beginPath();g.arc(cx,cy,8,0,Math.PI*2);g.fillStyle=RED;g.fill();T(g,'130°',cx-30,cy-60,FT.bodyB,RED);
  [['1','centre on the vertex'],['2','zero line on one arm'],['3','read the scale that starts at 0']].forEach(([n,t],i)=>{T(g,n,X0+530,y+50+i*56,ZS(34),acc());T(g,t,X0+566,y+46+i*56,FT.small);});y+=274;
  y=para(p,y,'*Benchmarks* help you estimate and catch mistakes: 45° (half a right angle), 90°, 135° and 180°. If an angle looks acute, its measure must be less than 90°!')+10;
  y=keyWords(p,y,[['degree','a unit for measuring angles; a full turn is 360°'],['protractor','a tool for measuring and drawing angles']]);
  predict(p,y,S,'p29','An angle is a little more than a right angle. Is it 80°, 100° or 160°?','*100°.* It is just over 90°, so it is not 80° (acute) and not as wide as 160°.');},
 readout(p,S,y){const g=p.g,st=S.st;T(g,st.a+'°',X0,y+56,ZS(64),acc());const b=[0,45,90,135,180].reduce((x,v)=>Math.abs(v-st.a)<Math.abs(x-st.a)?v:x,0);
  T(g,(st.a<90?'acute':st.a===90?'right':st.a<180?'obtuse':'straight')+'   ·   nearest benchmark '+b+'°'+(st.wedges?'   ·   '+(st.a/15).toFixed(st.a%15?1:0)+' wedges':''),X0+170,y+46,FT.bodyB);return y+80;},
 build(S,grp,mode,game){const st=S.st,Vx=V(0,.12,-1.05),L=1.95;
  const pr=new THREE.Mesh((()=>{const gg=new THREE.RingGeometry(1.42,1.85,72,1,0,Math.PI);gg.rotateX(-Math.PI/2);return gg;})(),new THREE.MeshLambertMaterial({color:'#bcd6ff',transparent:true,opacity:.55,side:THREE.DoubleSide}));pr.position.set(Vx.x,.06,Vx.z);grp.add(pr);
  for(let a=0;a<=180;a+=5){const r=a*Math.PI/180,len=a%30===0?.26:a%10===0?.17:.09;const t=new THREE.Mesh(G('ptk'+len,()=>new THREE.BoxGeometry(len,.015,.012)),lam('#2f7de1'));t.position.set(Vx.x+Math.cos(r)*(1.85-len/2),.08,Vx.z-Math.sin(r)*(1.85-len/2));t.rotation.y=r;grp.add(t);
    if(a%30===0){const l=label(String(a),{size:.17,color:'#2f7de1'});l.position.set(Vx.x+Math.cos(r)*1.25,.14,Vx.z-Math.sin(r)*1.25);grp.add(l);const o=label(String(180-a),{size:.13,color:GREY});o.position.set(Vx.x+Math.cos(r)*2.03,.14,Vx.z-Math.sin(r)*2.03);grp.add(o);}}
  const arm=col=>{const m=mk(new THREE.BoxGeometry(L,.07,.08),lam(col),20);m.geometry.translate(L/2,0,0);return m;};const a1=arm(INK);a1.position.copy(Vx);grp.add(a1);const a2=arm(INK);a2.position.copy(Vx);grp.add(a2);
  const vtx=mk(new THREE.SphereGeometry(.09,16,12),lam('#e4572e'),0);vtx.position.copy(Vx);grp.add(vtx);const tip=mk(new THREE.SphereGeometry(.15,18,14),lam('#ffd24a'),0);grp.add(tip);
  const wedG=new THREE.Group();wedG.position.set(Vx.x,.09,Vx.z);grp.add(wedG);let arc=null;const deg=label('',{size:.34,bg:'#ffffff'});grp.add(deg);
  function draw(){const r=st.a*Math.PI/180;a2.rotation.y=r;tip.position.set(Vx.x+Math.cos(r)*L,.15,Vx.z-Math.sin(r)*L);if(arc){grp.remove(arc);disposeObj(arc);arc=null;}clearGroup(wedG);
    if(st.wedges){const n=Math.floor(st.a/15+1e-9);for(let k=0;k<n;k++){const m=mk(wedgeGeo(1.3,.04,k*15*Math.PI/180+.01,(k+1)*15*Math.PI/180-.01),lam(k%2?'#ffc98f':'#ffd86b'),0);wedG.add(m);}
      const rem=st.a-n*15;if(rem>0){const m=mk(wedgeGeo(1.3,.04,n*15*Math.PI/180+.01,st.a*Math.PI/180),lam('#e5e7eb'),0);wedG.add(m);}}
    else{const ring=new THREE.RingGeometry(.4,.52,40,1,0,r);ring.rotateX(-Math.PI/2);arc=new THREE.Mesh(ring,new THREE.MeshLambertMaterial({color:'#e4572e',side:THREE.DoubleSide}));arc.position.set(Vx.x,.12,Vx.z);grp.add(arc);}
    deg.userData.set(st.a+'°'+(st.wedges?'  = '+(st.a/15).toFixed(st.a%15?1:0)+' wedges':''));const mr=r/2;deg.position.set(Vx.x+Math.cos(mr)*.9,.55,Vx.z-Math.sin(mr)*.9);check();A.redraw();}
  function setA(a){a=Math.max(5,Math.min(180,Math.round(a/5)*5));if(a===st.a)return;st.a=a;A.pop();draw();}
  A.drag(tip,{h:.15,move:pt=>{const lp=grp.worldToLocal(pt.clone());let a=Math.atan2(-(lp.z-Vx.z),lp.x-Vx.x)*180/Math.PI;if(a<0)a=a<-90?180:5;setA(a);},drop:()=>draw()});
  function check(){if(mode==='play'&&!st.setup&&st.want!=null&&st.a===st.want)game.solved('Yes! You constructed '+st.want+'°.');}
  draw();
  return {info:()=>st.a+'°',
    controls:()=>{if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok,x=>typeof x==='number'?x+'°':String(x)).concat([{t:st.wedges?'Wedges: on':'Wedges',on:st.wedges,fn:()=>{st.wedges=!st.wedges;draw();}}]);
      return [{t:'−5°',fn:()=>setA(st.a-5)},{t:'+5°',go:true,fn:()=>setA(st.a+5)},{t:'45°',fn:()=>setA(45)},{t:'90°',fn:()=>setA(90)},{t:'135°',fn:()=>setA(135)},{t:st.wedges?'Wedges: on':'Wedges',on:st.wedges,fn:()=>{st.wedges=!st.wedges;draw();}}];},
    demo(n){if(/^a\d+$/.test(n)){setA(+n.slice(1));return;}st.ask=null;st.want=null;if(n==='wedges'){st.wedges=true;st.a=5;draw();const l=[];[15,30,45,60,75,90].forEach(a=>l.push([450,()=>setA(a)]));l.push([700,()=>A.say('6 wedges × 15° = 90°')]);A.seq(l);}
      if(n==='build'){st.wedges=false;st.a=5;draw();const l=[];for(let a=20;a<=130;a+=15)l.push([280,()=>setA(Math.min(a,130))]);l.push([300,()=>setA(130)],[700,()=>A.say('130°: a little less than the 135° benchmark.')]);A.seq(l);}},
    task(r){st.setup=true;st.ask=null;st.want=null;st.wedges=false;
      if(r===0){st.a=30;st.want=pick([110,120,140,150]);}else if(r===1){st.a=170;st.want=pick([35,40,55,65]);}
      else if(r===2){st.a=pick([25,35,65,70,115,145]);st.ask={ans:st.a,o:shuffle([st.a,180-st.a,st.a+10]),ok:'Yes! Read the scale that starts at 0 on the arm.'};}
      else if(r===3){st.a=pick([40,50,85,95,130,140,175]);const b=[45,90,135,180].reduce((x,v)=>Math.abs(v-st.a)<Math.abs(x-st.a)?v:x,45);st.ask={ans:b,o:[45,90,135,180],ok:'Yes! It is closest to '+b+'°.'};}
      else{st.a=pick([45,60,75,105,120]);st.wedges=true;const n=st.a/15;st.ask={ans:n,o:opts(n,[1,-1,2]),ok:'Yes! '+n+' wedges × 15° = '+st.a+'°.'};}
      draw();st.setup=false;
      return r<2?'Construct an angle of *'+st.want+'°*. Drag the tip or use the buttons.':r===2?'*Measure* this angle. Which reading is correct?':r===3?'*Estimate*: which benchmark angle is this closest to?':'How many *15° wedges* fit in this angle?';}};}
});

/* =========================================================
   30. Area of parallelograms and triangles; area vs perimeter
   ========================================================= */
P.lesson({id:'area5',title:'Area of parallelograms and triangles',strand:'Spatial Sense',codes:['E2.5','E2.6'],
 guide:{goal:'Use the area relationships among rectangles, parallelograms and triangles to develop the formulas A = b × h and A = b × h ÷ 2, solve problems with them, and show that shapes with the same area can have different perimeters.',words:'base, height, area, perimeter, parallelogram, triangle, formula, square units',
  ask:['Why is the height of a parallelogram not the slanted side?','Why is a triangle exactly half of a parallelogram?','Can two rectangles with an area of 24 m² have different perimeters?'],home:'Cut a parallelogram from paper. Cut off a triangle and slide it to make a rectangle. Measure both!'},
 learn:[{say:'Cut and slide: a parallelogram becomes a rectangle.',speech:'Amani cuts the triangle off one end of the parallelogram and slides it to the other end. Now it is a rectangle with the same base and the same height. So the area of a parallelogram is base times height.',view:'model',demo:'cut'},
        {say:'Read the two formulas.',speech:'For a parallelogram, area equals base times height. Two copies of a triangle make a parallelogram, so the area of a triangle is base times height divided by two.',view:'read'},
        {say:'Watch: two triangles make a parallelogram.',speech:'Copy the triangle, turn the copy halfway around, and fit it against the first one. Together they make a parallelogram. One triangle is half of it.',view:'model',demo:'tri'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: explore the shapes.',speech:'Your turn. Change the base and height, cut and slide, or build rectangles and compare their perimeters.',view:'model'}],
 fig:'Shapes on a centimetre grid. Cut, slide and turn to compare areas.',rz:.3,
 explore:['Switch between *parallelogram*, *triangle* and *rectangle*.','Change the *base* and *height*.','Press *Cut & slide* or *Copy & turn*.'],
 howTo:'Find the area with the formula and choose the answer, or build the rectangle the question asks for.',
 init:k=>({kind:'para',b:6,h:4,o:2,done:false,w:6,rh:4,want:null,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'Area relationships give us formulas. The *height* is always measured straight up from the base, at a right angle.')+16;
  const s=30,ox=X0+20,oy=y+140;g.fillStyle=tint('#e4572e',.4);g.beginPath();g.moveTo(ox,oy);g.lineTo(ox+6*s,oy);g.lineTo(ox+8*s,oy-4*s);g.lineTo(ox+2*s,oy-4*s);g.closePath();g.fill();g.strokeStyle='#e4572e';g.lineWidth=3;g.stroke();
  g.setLineDash([6,5]);g.strokeStyle=INK;g.beginPath();g.moveTo(ox+2*s,oy);g.lineTo(ox+2*s,oy-4*s);g.stroke();g.setLineDash([]);T(g,'h = 4',ox+2*s+8,oy-2*s,FT.cap);T(g,'b = 6',ox+3*s,oy+24,FT.cap,INK,'center');
  T(g,'→',ox+8*s+30,oy-2*s,ZS(40),BLUE);g.fillStyle=tint('#2f7de1',.4);g.fillRect(ox+10*s,oy-4*s,6*s,4*s);g.strokeStyle='#2f7de1';g.strokeRect(ox+10*s,oy-4*s,6*s,4*s);T(g,'6 × 4 = 24 cm²',ox+10*s,oy+24,FT.smallB);y+=180;
  rr(g,X0,y,TW,110,16);g.fillStyle=tint(acc(),.1);g.fill();T(g,'Parallelogram:  A = b × h',X0+24,y+46,ZS(36),acc());T(g,'Triangle:  A = b × h ÷ 2',X0+24,y+94,ZS(36),acc());y+=136;
  T(g,'Same area, different perimeter:',X0,y+10,FT.smallB);const r2=(w,h,x)=>{g.strokeStyle='#16a36f';g.lineWidth=3;g.strokeRect(x,y+30,w*14,h*14);T(g,w+' × '+h+': P = '+2*(w+h),x,y+30+h*14+26,FT.cap);};r2(6,4,X0);r2(8,3,X0+150);r2(12,2,X0+330);y+=130;
  y=keyWords(p,y,[['height','the perpendicular distance from the base to the opposite side'],['perimeter','the distance around a shape']]);
  predict(p,y,S,'p30','A triangle has a base of 10 cm and a height of 6 cm. What is its area?','*30 cm².* 10 × 6 = 60, and half of 60 is 30.');},
 readout(p,S,y){const g=p.g,st=S.st;if(st.kind==='rect'){T(g,'A = '+st.w+' × '+st.rh+' = '+st.w*st.rh+' cm²',X0,y+48,ZS(44),acc());T(g,'P = 2 × ('+st.w+' + '+st.rh+') = '+2*(st.w+st.rh)+' cm',X0,y+90,FT.bodyB);return y+98;}
  const A2=st.b*st.h;T(g,st.kind==='para'?'A = b × h = '+st.b+' × '+st.h+' = '+A2+' cm²':'A = b × h ÷ 2 = '+st.b+' × '+st.h+' ÷ 2 = '+A2/2+' cm²',X0,y+48,ZS(40),acc());
  T(g,'base '+st.b+' cm   ·   height '+st.h+' cm',X0,y+90,FT.bodyB);return y+98;},
 build(S,grp,mode,game){const st=S.st,c=.34,x0=-1.95,zb=-.55,NX=11,NY=7;const X=x=>x0+x*c,Z=y=>zb-y*c;
  const base=mk(new THREE.BoxGeometry(NX*c+.1,.03,NY*c+.1),[lam('#f3f6fb'),lam('#f3f6fb'),cellMat('#ffffff',NX,NY),lam('#f3f6fb'),lam('#f3f6fb'),lam('#f3f6fb')],20);base.position.set(X(NX/2),.015,Z(NY/2));grp.add(base);
  const sh=new THREE.Group();grp.add(sh);const corner=mk(new THREE.SphereGeometry(.13,16,12),lam('#ffd24a'),0);grp.add(corner);let piece=null,copy=null;
  const poly=(pts,col,h,op)=>slab(pts.map(([x,y])=>[X(x),Z(y)]),col,h,op);
  function draw(){clearGroup(sh);piece=null;copy=null;corner.visible=st.kind==='rect';
    if(st.kind==='rect'){for(let r=0;r<st.rh;r++)for(let q=0;q<st.w;q++){const t=mk(G('ar5t',()=>new THREE.BoxGeometry(c-.03,.06,c-.03)),lam((r+q)%2?'#4cc38a':'#16a36f'),20);t.position.set(X(q+.5),.05,Z(r+.5));sh.add(t);}
      const P4=[[0,0],[st.w,0],[st.w,st.rh],[0,st.rh]].map(([x,y])=>V(X(x),.1,Z(y)));for(let i=0;i<4;i++)sh.add(seg(P4[i],P4[(i+1)%4],'#e4572e',.025));
      corner.position.set(X(st.w),.2,Z(st.rh));const l=label('A '+st.w*st.rh+' cm²  ·  P '+2*(st.w+st.rh)+' cm',{size:.24,bg:'#ffffff'});l.position.set(X(st.w/2),.75,Z(st.rh)-.2);sh.add(l);check();A.redraw();return;}
    const b=st.b,h=st.h,o=st.o;
    if(st.kind==='para'){sh.add(poly([[o,0],[b,0],[b+o,h],[o,h]],'#e4572e',.1,.85));piece=new THREE.Group();piece.add(poly([[0,0],[o,0],[o,h]],'#f7a96b',.1,.95));sh.add(piece);if(st.done)piece.position.x=b*c;}
    else{sh.add(poly([[0,0],[b,0],[o,h]],'#2f7de1',.1,.85));copy=new THREE.Group();const M=V(X((b+o)/2),0,Z(h/2));copy.position.copy(M);const inner=poly([[0,0],[b,0],[o,h]],'#9cc2f5',.1,.6);inner.position.set(-M.x,.02,-M.z);copy.add(inner);sh.add(copy);copy.visible=st.done;if(st.done)copy.rotation.y=Math.PI;}
    const hl=[V(X(o),.14,Z(0)),V(X(o),.14,Z(h))];const n=8;for(let k=0;k<n;k+=2)sh.add(seg(hl[0].clone().lerp(hl[1],k/n),hl[0].clone().lerp(hl[1],(k+1)/n),INK,.018));
    const lb=label('b = '+b+' cm',{size:.2,color:INK});lb.position.set(X(b/2),.2,Z(0)+.25);sh.add(lb);const lh=label('h = '+h+' cm',{size:.2,color:INK});lh.position.set(X(o)+.38,.35,Z(h/2));sh.add(lh);check();A.redraw();}
  function cut(){if(st.kind!=='para'||st.done||!piece)return;st.done=true;A.pop();const pc=piece,p0=pc.position.x,bb=st.b;tween(1.1,k=>{pc.position.x=p0+bb*c*k;pc.position.y=Math.sin(Math.PI*k)*.35;},x=>x*x*(3-2*x)).then(()=>{A.good('A rectangle: '+st.b+' × '+st.h+' = '+st.b*st.h+' cm²');});}
  function turnCopy(){if(st.kind!=='tri'||st.done||!copy)return;st.done=true;const cp=copy;cp.visible=true;A.pop();tween(1.2,k=>{cp.rotation.y=Math.PI*k;cp.position.y=Math.sin(Math.PI*k)*.4;},x=>x*x*(3-2*x)).then(()=>{A.good('Two triangles make a parallelogram: each is half of '+st.b*st.h+' = '+st.b*st.h/2+' cm²');});}
  function setR(w,h){w=Math.max(1,Math.min(NX,w));h=Math.max(1,Math.min(NY,h));if(w===st.w&&h===st.rh)return;st.w=w;st.rh=h;A.pop();draw();}
  A.drag(corner,{h:.2,drop:pos=>{setR(Math.round((pos.x-x0)/c),Math.round((zb-pos.z)/c));draw();}});
  function check(){if(mode==='play'&&!st.setup&&st.want&&st.kind==='rect'&&st.want(st.w,st.rh))game.solved(st.w+' × '+st.rh+': area '+st.w*st.rh+' cm², perimeter '+2*(st.w+st.rh)+' cm!');}
  function setShape(kind,b,h,o){st.kind=kind;st.b=b;st.h=h;st.o=o;st.done=false;draw();}
  draw();
  return {info:()=>st.kind==='rect'?'A '+st.w*st.rh+' cm², P '+2*(st.w+st.rh)+' cm':st.kind==='para'?'Parallelogram '+st.b+' × '+st.h:'Triangle '+st.b+' × '+st.h+' ÷ 2',
    controls:()=>{if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok,x=>x+' cm²').concat(st.kind==='para'?[{t:'Cut & slide',fn:cut}]:st.kind==='tri'?[{t:'Copy & turn',fn:turnCopy}]:[]);
      if(st.kind==='rect')return [{t:'Longer',go:true,fn:()=>setR(st.w+1,st.rh)},{t:'Shorter',fn:()=>setR(st.w-1,st.rh)},{t:'Taller',go:true,fn:()=>setR(st.w,st.rh+1)},{t:'Lower',fn:()=>setR(st.w,st.rh-1)}].concat(mode==='learn'?[{t:'Parallelogram',fn:()=>setShape('para',6,4,2)},{t:'Triangle',fn:()=>setShape('tri',6,4,2)}]:[]);
      return [st.kind==='para'?{t:'Cut & slide',go:true,big:true,fn:cut}:{t:'Copy & turn',go:true,big:true,fn:turnCopy},{t:'Base −',fn:()=>{if(st.b>st.o+1)setShape(st.kind,st.b-1,st.h,st.o);}},{t:'Base +',fn:()=>{if(st.b+st.o<NX)setShape(st.kind,st.b+1,st.h,st.o);}},{t:'Height −',fn:()=>{if(st.h>1)setShape(st.kind,st.b,st.h-1,st.o);}},{t:'Height +',fn:()=>{if(st.h<NY)setShape(st.kind,st.b,st.h+1,st.o);}},{t:'Reset',fn:()=>setShape(st.kind,st.b,st.h,st.o)}]
        .concat(mode==='learn'?[{t:st.kind==='para'?'Triangle':'Parallelogram',fn:()=>setShape(st.kind==='para'?'tri':'para',st.b,st.h,st.o)},{t:'Rectangles',fn:()=>{st.kind='rect';draw();}}]:[]);},
    demo(n){if(n==='cutnow'){cut();return;}st.ask=null;st.want=null;if(n==='cut'){setShape('para',6,4,2);A.seq([[1000,cut]]);}if(n==='tri'){setShape('tri',6,4,2);A.seq([[1000,turnCopy]]);}},
    task(r){st.setup=true;st.ask=null;st.want=null;let txt;
      if(r===0){const b=rnd(4,8),h=rnd(2,6),o=rnd(1,Math.min(3,NX-b));setShape('para',b,h,o);const a=b*h;st.ask={ans:a,o:shuffle([a,a/2,(b+o)*h]).filter((x,i,arr)=>arr.indexOf(x)===i),ok:'Yes! '+b+' × '+h+' = '+a+' cm².'};txt='Find the *area* of the parallelogram. (Cut & slide can help.)';}
      else if(r===1){let b=rnd(4,9),h=rnd(2,6);if(b*h%2)b++;const o=rnd(1,Math.max(1,b-1));setShape('tri',b,h,Math.min(o,NX-b));const a=b*h/2;st.ask={ans:a,o:shuffle([a,b*h,a+b]).filter((x,i,arr)=>arr.indexOf(x)===i),ok:'Yes! '+b+' × '+h+' ÷ 2 = '+a+' cm².'};txt='Find the *area* of the triangle.';}
      else if(r===2){st.kind='rect';st.w=2;st.rh=2;draw();st.want=(w,h)=>w*h===24&&2*(w+h)===20;txt='Build a rectangle with *area 24 cm²* and *perimeter 20 cm*.';}
      else if(r===3){st.kind='rect';st.w=2;st.rh=2;draw();st.want=(w,h)=>w*h===24&&2*(w+h)===22;txt='Same area, new perimeter! Build *area 24 cm²* with *perimeter 22 cm*.';}
      else{st.kind='rect';st.w=2;st.rh=2;draw();st.want=(w,h)=>w*h===18&&2*(w+h)===22;txt='Build a rectangle with *area 18 cm²* and the *longest perimeter* that fits on the grid.';}
      st.setup=false;return txt;}};}
});

/* =========================================================
   31. Sales tax and Canadian taxes
   ========================================================= */
const GOODS5=[{n:'Notebook',p:3.49,col:'#2f7de1',s:[.34,.06,.44]},{n:'Pencils',p:2.75,col:'#f2c200',s:[.4,.08,.18]},{n:'Calculator',p:8.25,col:'#475569',s:[.26,.06,.4]},{n:'Bottle',p:12.50,col:'#16a36f',cyl:true},{n:'Headphones',p:19.95,col:'#e4572e',torus:true},{n:'Backpack',p:24.99,col:'#8b5cf6',s:[.42,.46,.24]}];
const TAXES=[['Federal','income tax, GST','national defence, health transfers, Canada Pension'],['Provincial','income tax, provincial part of HST','schools, hospitals, highways'],['Municipal','property tax','local roads, parks, libraries, garbage pickup, fire service']];
const r2=v=>Math.round(v*100)/100;
P.lesson({id:'tax5',title:'Sales tax and where taxes go',strand:'Financial Literacy',codes:['F1.2','F1.6'],
 guide:{goal:'Estimate and calculate the cost of several items priced in dollars and cents, including sales tax, and describe the taxes collected by each level of government in Canada and the services they pay for.',words:'subtotal, sales tax, HST, total, estimate, federal, provincial, municipal, income tax, property tax',
  ask:['Why is the total at the register more than the price on the shelf?','How can 10% help you estimate 13% tax?','Which level of government pays for your local library? How?'],home:'Look at a receipt together. Find the subtotal, the HST and the total. Estimate the tax first, then check.'},
 learn:[{say:'Add the prices: the subtotal.',speech:'Zane puts a notebook for three dollars forty-nine and a bottle for twelve dollars fifty in the cart. Line up the decimal points and add: the subtotal is fifteen dollars ninety-nine.',view:'model',demo:'cart'},
        {say:'Read about taxes in Canada.',speech:'In Ontario, most things we buy have thirteen percent harmonized sales tax, called HST. Governments collect taxes to pay for services: the federal government, the province, and your city or town.',view:'read'},
        {say:'Watch: add the HST.',speech:'Thirteen percent of fifteen dollars ninety-nine is about two dollars eight cents. To estimate, find ten percent, one dollar sixty, and add a bit more. The total is eighteen dollars seven cents.',view:'model',demo:'tax'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: go shopping.',speech:'Your turn. Tap items into the cart and read the register: subtotal, tax and total.',view:'model'}],
 fig:'A school-supply shelf, a cart and a register with HST.',rz:.35,
 explore:['*Tap an item* to put it in the cart; tap the cart to empty it.','The *register* shows subtotal, HST (13%) and total.','Estimate before you look!'],
 howTo:'Put the items in the cart, then choose the amount the question asks for.',
 init:k=>({cart:[],ask:null,need:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'At the store, add the prices to get the *subtotal*. Then the *HST* (13% in Ontario) is added to get the *total*.')+14;
  rr(g,X0,y,TW,140,16);g.fillStyle='#1f2937';g.fill();const MF='700 28px "Atkinson Hyperlegible", monospace';[['Subtotal','$15.99'],['HST 13%','$2.08'],['TOTAL','$18.07']].forEach(([a,b],i)=>{T(g,a,X0+30,y+42+i*38,MF,i===2?'#7ef0b0':'#cbd5e1');T(g,b,X0+TW-30,y+42+i*38,MF,i===2?'#7ef0b0':'#cbd5e1','right');});y+=164;
  y=para(p,y,'*Estimate 13%:* 10% of $15.99 is about $1.60; 3% more is about $0.48. So the tax is about *$2.08*.')+14;
  TAXES.forEach(([a,b,c],i)=>{rr(g,X0,y,TW,84,14);g.fillStyle=tint(['#2f7de1','#16a36f','#e4572e'][i],.12);g.fill();T(g,a,X0+20,y+34,FT.bodyB,['#2f7de1','#16a36f','#e4572e'][i]);T(g,'collects '+b,X0+200,y+34,FT.small);wrap(g,'pays for '+c,X0+200,y+64,TW-220,24,{font:FT.cap,color:GREY});y+=90;});
  y=keyWords(p,y,[['HST','harmonized sales tax: 13% in Ontario'],['property tax','a tax on homes and land that pays for city services']]);
  predict(p,y,S,'p31','Estimate the HST on a $40 jacket.','*About $5.* 10% is $4, and 13% is a bit more: $5.20.');},
 readout(p,S,y){const g=p.g,st=S.st,sub=r2(st.cart.reduce((a,i)=>a+GOODS5[i].p,0)),tax=r2(sub*.13);T(g,'Subtotal '+money(sub)+'   +   HST '+money(tax)+'   =   '+money(r2(sub+tax)),X0,y+46,FT.bodyB,acc());
  T(g,st.cart.length?st.cart.map(i=>GOODS5[i].n).join(', '):'The cart is empty.',X0,y+86,FT.body,GREY);return y+96;},
 build(S,grp,mode,game){const st=S.st;const shelf=mk(new THREE.BoxGeometry(4.4,.08,1.1),lam('#d9c3a0'),20);shelf.position.set(0,.04,-2.5);grp.add(shelf);
  function goodMesh(gd){const g=new THREE.Group();let m;if(gd.cyl){m=mk(G('g5cyl',()=>new THREE.CylinderGeometry(.11,.11,.42,18)),lam(gd.col),20);m.position.y=.21;}else if(gd.torus){m=mk(G('g5tor',()=>new THREE.TorusGeometry(.16,.04,10,24,Math.PI)),lam(gd.col),0);m.position.y=.04;m.rotation.x=0;}
    else{m=mk(new THREE.BoxGeometry(...gd.s),lam(gd.col),20);m.position.y=gd.s[1]/2;}g.add(m);return g;}
  GOODS5.forEach((gd,i)=>{const g=goodMesh(gd);g.position.set(-1.85+i*.74,.08,-2.5);grp.add(g);const l=label(gd.n+' '+money(gd.p),{size:.13,bg:'#ffffff'});l.position.set(0,.72,0);g.add(l);A.drag(g,{tap:()=>addC(i)});});
  const cart=new THREE.Group();cart.position.set(-.9,0,-1.05);grp.add(cart);const bk=mk(new THREE.BoxGeometry(1.6,.5,.85),new THREE.MeshLambertMaterial({color:'#9fb4d1',transparent:true,opacity:.5}),25);bk.position.y=.4;cart.add(bk);
  [[-.65,-.36],[.65,-.36],[-.65,.36],[.65,.36]].forEach(([x,z])=>{const w=mk(G('cw5',()=>new THREE.CylinderGeometry(.07,.07,.05,14)),lam(INK),0);w.rotation.x=Math.PI/2;w.position.set(x,.08,z);cart.add(w);});
  const inC=new THREE.Group();cart.add(inC);A.drag(cart,{tap:()=>{st.cart=[];fill();}});
  const reg=new THREE.Group();reg.position.set(1.45,0,-1.05);grp.add(reg);const rb=mk(new THREE.BoxGeometry(1.2,.6,.7),lam('#334155'),20);rb.position.y=.3;reg.add(rb);const scr=mk(new THREE.BoxGeometry(1.0,.5,.05),lam('#111827'),0);scr.position.set(0,.85,-.2);scr.rotation.x=-.3;reg.add(scr);
  const rl=label('',{size:.2,bg:'#111827',color:'#7ef0b0'});rl.position.set(0,1.45,-.2);reg.add(rl);
  function fill(){clearGroup(inC);st.cart.forEach((i,k)=>{const g=goodMesh(GOODS5[i]);g.scale.setScalar(.7);g.position.set(-.55+(k%4)*.36,.25+Math.floor(k/4)*.22,(k%2)*.2-.1);inC.add(g);});
    const sub=r2(st.cart.reduce((a,i)=>a+GOODS5[i].p,0)),tax=r2(sub*.13);rl.userData.set(st.hide?'Sub '+money(sub)+'  ·  HST ?  ·  Total ?':'Sub '+money(sub)+'  ·  HST '+money(tax)+'  ·  Total '+money(r2(sub+tax)));check();A.redraw();}
  function addC(i){if(st.cart.length>=8){A.bad('The cart is full.');return;}st.cart.push(i);A.pop();fill();}
  function check(){if(mode==='play'&&st.need&&st.cart.slice().sort().join()===st.need.slice().sort().join()){st.need=null;if(st.after)st.after();A.redraw();}}
  fill();
  return {info:()=>'Cart: '+money(r2(st.cart.reduce((a,i)=>a+GOODS5[i].p,0)))+' before tax',
    controls:()=>{if(mode==='play'&&st.ask&&!st.need)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok);return [{t:'Empty cart',fn:()=>{st.cart=[];fill();}}];},
    demo(n){if(n==='show'){st.cart=[0,3];fill();return;}st.hide=false;st.ask=null;st.need=null;if(n==='cart'){st.cart=[];fill();A.seq([[700,()=>addC(0)],[900,()=>addC(3)],[900,()=>A.say('$3.49 + $12.50 = $15.99')]]);}if(n==='tax'){st.cart=[0,3];fill();A.say('HST: 13% of $15.99 ≈ $2.08. Total $18.07');}},
    task(r){st.setup=true;st.ask=null;st.need=null;st.after=null;st.hide=true;st.cart=[];fill();let txt;
      if(r===0){const it=shuffle([0,1,2,3,4,5]).slice(0,2);st.need=it;st.after=()=>{const s=r2(it.reduce((a,i)=>a+GOODS5[i].p,0));st.ask={ans:money(s),o:shuffle([money(s),money(r2(s+1)),money(r2(s+.1))]),ok:'Yes! The subtotal is '+money(s)+'.'};};txt='Put the *'+it.map(i=>GOODS5[i].n.toLowerCase()).join('* and the *')+'* in the cart. Then choose the *subtotal*.';}
      else if(r===1){st.cart=shuffle([0,1,2,3,4,5]).slice(0,3);fill();const s=st.cart.reduce((a,i)=>a+GOODS5[i].p,0);const e=Math.round(s);st.ask={ans:'about $'+e,o:shuffle(['about $'+e,'about $'+(e+10),'about $'+Math.max(1,e-8)]),ok:'Yes! Round each price to the nearest dollar and add.'};txt='*Estimate* the subtotal of the cart.';}
      else if(r===2){st.cart=shuffle([0,1,2,3,4,5]).slice(0,2);fill();const s=r2(st.cart.reduce((a,i)=>a+GOODS5[i].p,0)),t=r2(s*.13);st.ask={ans:money(t),o:shuffle([money(t),money(r2(s*.1)),money(r2(t*2))]).filter((x,i,a)=>a.indexOf(x)===i),ok:'Yes! 13% of '+money(s)+' is '+money(t)+'.'};txt='The subtotal is *'+money(s)+'*. What is the *HST (13%)*?';}
      else if(r===3){st.cart=shuffle([0,1,2,3,4,5]).slice(0,2);fill();const s=r2(st.cart.reduce((a,i)=>a+GOODS5[i].p,0)),t=r2(s*.13),tot=r2(s+t);st.ask={ans:money(tot),o:shuffle([money(tot),money(s),money(r2(s+s*.05))]),ok:'Yes! '+money(s)+' + '+money(t)+' = '+money(tot)+'.'};txt='What is the *total with HST*?';}
      else{const Q=pick([['your town\'s library and parks','Municipal'],['hospitals and schools in Ontario','Provincial'],['Canada\'s national defence','Federal']]);st.ask={ans:Q[1],o:['Federal','Provincial','Municipal'],ok:'Yes! The '+Q[1].toLowerCase()+' government pays for '+Q[0]+'.'};txt='Which level of government pays for *'+Q[0]+'*?';}
      st.setup=false;return txt;}};}
});

/* =========================================================
   32. Budgets, credit and debt
   ========================================================= */
const CATS=[{k:'needs',n:'Needs',col:'#2f7de1'},{k:'wants',n:'Wants',col:'#e4572e'},{k:'save',n:'Savings',col:'#16a36f'},{k:'give',n:'Giving',col:'#f08a24'}];
P.lesson({id:'budget5',title:'Budgets, credit and debt',strand:'Financial Literacy',codes:['F1.1','F1.3','F1.4'],
 guide:{goal:'Describe ways money is transferred, design basic budgets for earning and spending scenarios, and explain credit and debt and how they affect financial decisions.',words:'budget, income, expense, balanced, credit, debt, interest, borrow, e-transfer, direct deposit',
  ask:['What makes a budget balanced?','Why can buying on credit cost more than paying cash?','What are three ways money can move from one person to another?'],home:'Plan a budget for a family pizza night: income $40. List needs, wants and savings. Is it balanced?'},
 learn:[{say:'A budget plans every dollar.',speech:'Layla earns forty dollars a month. A budget splits it into needs, wants, savings and giving. Watch the blocks stack up. When the expenses match the income, the budget is balanced.',view:'model',demo:'budget'},
        {say:'Read about credit and debt.',speech:'Credit lets you buy now and pay later. The money you owe is debt. Lenders usually charge interest, so you pay back more than you borrowed.',view:'read'},
        {say:'Watch: paying off a debt.',speech:'You borrow sixty dollars for a game, with ten percent interest. You now owe sixty-six dollars. Watch the debt shrink as you pay twenty-two dollars each month.',view:'model',demo:'credit'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: plan a budget.',speech:'Your turn. Add five-dollar blocks to each part of the budget until it balances with the income.',view:'model'}],
 fig:'An income tower and four budget stacks, made of $5 blocks.',rz:.35,
 explore:['Tap *+* or a stack to add a $5 block; tap *−* to remove one.','The budget is *balanced* when it equals the income.','Switch to *Credit* to see a debt being paid off.'],
 howTo:'Add $5 blocks to the budget stacks to match the plan, or answer the money question.',
 init:k=>({inc:40,b:{needs:0,wants:0,save:0,give:0},view:'budget',debt:0,month:0,plan:null,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'A *budget* is a plan for your money. *Income* comes in; *expenses* go out. A budget is *balanced* when they are equal.')+14;
  const s=24;[['Income',8,'#8b5cf6'],['Needs',3,'#2f7de1'],['Wants',2,'#e4572e'],['Savings',2,'#16a36f'],['Giving',1,'#f08a24']].forEach(([n,k,c],i)=>{const x=X0+20+i*150;for(let j=0;j<k;j++){rr(g,x,y+220-(j+1)*s,90,s-3,4);g.fillStyle=c;g.fill();}T(g,n,x+45,y+250,FT.smallB,c,'center');T(g,'$'+k*5,x+45,y+214-k*s,FT.small,INK,'center');});y+=300;
  [['Credit','borrowing to buy now and pay later'],['Debt','money you owe'],['Interest','the extra cost of borrowing']].forEach(([a,b],i)=>{T(g,a,X0,y+i*40,FT.bodyB,acc());T(g,b,X0+160,y+i*40,FT.body);});y+=126;
  y=para(p,y,'*Moving money:* cash, cheque, debit, e-transfer, direct deposit (a pay cheque into a bank account), and online payments.')+10;
  y=keyWords(p,y,[['balanced budget','income equals expenses plus savings'],['interest','money paid for borrowing money']]);
  predict(p,y,S,'p32','You borrow $50 at 10% interest. How much do you pay back?','*$55.* 10% of $50 is $5.');},
 readout(p,S,y){const g=p.g,st=S.st;if(st.view==='credit'){T(g,'Debt: $'+st.debt,X0,y+48,ZS(48),RED);T(g,'Month '+st.month,X0+300,y+44,FT.bodyB);return y+70;}
  const tot=Object.values(st.b).reduce((a,b)=>a+b,0)*5;T(g,'Planned $'+tot+' of $'+st.inc,X0,y+48,ZS(44),tot===st.inc?'#16a36f':acc());T(g,tot===st.inc?'Balanced!':tot<st.inc?'$'+(st.inc-tot)+' not planned yet':'Over budget by $'+(tot-st.inc),X0,y+90,FT.bodyB,tot>st.inc?RED:INK);return y+98;},
 build(S,grp,mode,game){const st=S.st,u=.2;const bG=new THREE.Group(),cG=new THREE.Group();grp.add(bG,cG);const xs=i=>-1.95+i*.95;
  function draw(){clearGroup(bG);clearGroup(cG);bG.visible=st.view==='budget';cG.visible=st.view==='credit';
    if(st.view==='budget'){const ni=st.inc/5;for(let k=0;k<ni;k++){const m=mk(G('bud5',()=>new THREE.BoxGeometry(.6,u*.92,.6)),lam('#8b5cf6'),20);m.position.set(xs(0),u/2+k*u,-1.6);bG.add(m);}
      const il=label('Income $'+st.inc,{size:.18,color:'#8b5cf6'});il.position.set(xs(0),ni*u+.25,-1.6);bG.add(il);
      CATS.forEach((c,i)=>{const n=st.b[c.k];const g=new THREE.Group();g.position.set(xs(i+1),0,-1.6);bG.add(g);const pad=mk(G('budpad',()=>new THREE.BoxGeometry(.7,.03,.7)),lam(tint(c.col,.25)),20);pad.position.y=.015;g.add(pad);
        for(let k=0;k<n;k++){const m=mk(G('bud5',()=>new THREE.BoxGeometry(.6,u*.92,.6)),lam(c.col),20);m.position.y=u/2+.03+k*u;g.add(m);}const l=label(c.n+' $'+n*5,{size:.17,color:c.col});l.position.y=n*u+.3;g.add(l);A.drag(g,{tap:()=>chg(c.k,1)});});
      const tot=Object.values(st.b).reduce((a,b)=>a+b,0)*5;const line=mk(new THREE.BoxGeometry(4.3,.02,.02),lam(tot===st.inc?'#16a36f':'#94a3b8'),0);line.position.set(0,ni*u,-2.0);bG.add(line);}
    else{const n=Math.ceil(st.debt/2);for(let k=0;k<n;k++){const m=mk(G('debt5',()=>new THREE.BoxGeometry(.7,.06,.7)),lam(k>=30?'#f59e0b':'#e0453a'),20);m.position.set(-1.0,.03+k*.065,-1.6);cG.add(m);}
      const l=label('Debt $'+st.debt,{size:.26,bg:'#ffffff',border:'#e0453a'});l.position.set(-1.0,n*.065+.4,-1.6);cG.add(l);const ml=label('Month '+st.month,{size:.24,color:GREY});ml.position.set(1.0,.8,-1.6);cG.add(ml);
      for(let k=0;k<st.month;k++){const c=mk(G('pay5',()=>new THREE.CylinderGeometry(.2,.2,.05,20)),lam('#16a36f'),0);c.position.set(.6+(k%3)*.45,.03,-1.0+Math.floor(k/3)*.45);cG.add(c);}}
    check();A.redraw();}
  function chg(k,d){if(st.view!=='budget')return;const n=st.b[k]+d;if(n<0)return;const tot=(Object.values(st.b).reduce((a,b)=>a+b,0)+d)*5;if(d>0&&tot>st.inc){A.bad('Over budget! You only have $'+st.inc+'.');return;}st.b[k]=n;A.pop();draw();}
  function check(){if(mode!=='play'||st.setup||!st.plan)return;if(st.plan(st.b,Object.values(st.b).reduce((a,b)=>a+b,0)*5))game.solved('Balanced budget!');}
  function payMonth(){if(st.debt<=0){A.good('Debt paid off!');return;}st.debt=Math.max(0,st.debt-22);st.month++;A.pop();A.say('Paid $22. Debt: $'+st.debt);draw();}
  draw();
  return {info:()=>st.view==='budget'?'Budget: $'+Object.values(st.b).reduce((a,b)=>a+b,0)*5+' of $'+st.inc:'Debt $'+st.debt,
    controls:()=>{if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok);
      if(st.view==='credit')return [{t:'Pay a month',go:true,fn:payMonth},{t:'Budget',fn:()=>{st.view='budget';draw();}}];
      return CATS.map(c=>({t:'+ '+c.n,fn:()=>chg(c.k,1)})).concat(CATS.map(c=>({t:'− '+c.n,fn:()=>chg(c.k,-1)})),mode==='learn'?[{t:'Credit',fn:()=>{st.view='credit';st.debt=66;st.month=0;draw();}}]:[]);},
    demo(n){st.ask=null;st.plan=null;if(n==='budget'){st.view='budget';st.inc=40;st.b={needs:0,wants:0,save:0,give:0};draw();const s=['needs','needs','needs','wants','wants','save','save','give'];A.seq(s.map(k=>[380,()=>chg(k,1)]).concat([[700,()=>A.say('$40 planned of $40: balanced!')]]));}
      if(n==='credit'){st.view='credit';st.debt=66;st.month=0;draw();A.seq([[900,payMonth],[900,payMonth],[900,payMonth],[700,()=>A.say('3 months to pay $66 for a $60 game.')]]);}},
    task(r){st.setup=true;st.ask=null;st.plan=null;st.view='budget';st.b={needs:0,wants:0,save:0,give:0};let txt;
      if(r===0){st.inc=40;const pl={needs:3,wants:2,save:2,give:1};st.plan=b=>CATS.every(c=>b[c.k]===pl[c.k]);draw();txt='Income $40. Plan: *needs $15, wants $10, savings $10, giving $5*. Build it.';}
      else if(r===1){st.inc=50;st.plan=(b,t)=>t===50&&b.save>=2&&b.needs>=4;draw();txt='Income $50. Make a *balanced* budget with *at least $20 for needs* and *at least $10 savings*.';}
      else if(r===2){st.view='credit';st.debt=0;st.month=0;draw();const a=pick([40,50,80]);st.ask={ans:'$'+Math.round(a*1.1),o:shuffle(['$'+Math.round(a*1.1),'$'+a,'$'+(a+1)]),ok:'Yes! 10% of $'+a+' is $'+a/10+'.'};txt='You borrow *$'+a+'* on credit with *10% interest*. How much do you owe?';}
      else if(r===3){st.view='credit';st.debt=0;st.month=0;draw();const m=pick([4,5,6]),p=pick([15,20,25]);st.ask={ans:m,o:opts(m,[-1,1,2],1),ok:'Yes! '+m+' × $'+p+' = $'+m*p+'.'};txt='You owe *$'+m*p+'* and pay *$'+p+' a month* (no interest). How many months?';}
      else{const Q=pick([['Your aunt in Vancouver wants to send you $20 today.','E-transfer'],['Your parent\'s pay goes into the bank automatically.','Direct deposit'],['You buy a snack at the corner store with coins.','Cash']]);st.ask={ans:Q[1],o:shuffle(['E-transfer','Direct deposit','Cash']),ok:'Yes! '+Q[1]+'.'};draw();txt=Q[0]+' *Which way does the money move?*';}
      st.setup=false;return txt;}};}
});

/* =========================================================
   33. Unit rates and best value
   ========================================================= */
const DEALS=[[{n:3,p:4.50,u:'L',it:'juice',c:'#f59e0b'},{n:2,p:3.20,u:'L',it:'juice',c:'#fb923c'}],[{n:5,p:2.00,u:'apple',it:'apples',c:'#e0453a'},{n:8,p:3.60,u:'apple',it:'apples',c:'#dc2626'}],
  [{n:4,p:12,u:'hour',it:'bike rental',c:'#2f7de1'},{n:3,p:10.50,u:'hour',it:'bike rental',c:'#0ea5e9'}],[{n:6,p:4.20,u:'roll',it:'paper towels',c:'#e5e7eb'},{n:12,p:7.80,u:'roll',it:'paper towels',c:'#cbd5e1'},{n:4,p:3.00,u:'roll',it:'paper towels',c:'#f1f5f9'}],
  [{n:10,p:5.00,u:'pencil',it:'pencils',c:'#f2c200'},{n:24,p:10.80,u:'pencil',it:'pencils',c:'#eab308'},{n:6,p:3.30,u:'pencil',it:'pencils',c:'#facc15'}]];
P.lesson({id:'value5',title:'Unit rates and best value',strand:'Financial Literacy',codes:['F1.5'],
 guide:{goal:'Calculate unit rates for goods and services and decide which offers the best value, considering more than price.',words:'unit rate, unit price, per, best value, compare, quantity',
  ask:['How does the price for one help you compare packages?','Is the biggest package always the best value? When is it not?','How much is 5 apples for $2.00 per apple?'],home:'At the grocery store, look at the unit price on the shelf tag. Compare two sizes of the same product.'},
 learn:[{say:'Find the price for one.',speech:'Mateo sees three litres of juice for four dollars fifty, and two litres for three dollars twenty. Split each package into one-litre parts. The first is one dollar fifty per litre; the second is one dollar sixty. The three-litre jug is the better value.',view:'model',demo:'split'},
        {say:'Read about unit rates.',speech:'A unit rate is the cost for one unit: per litre, per apple, per hour. Divide the price by the number of units. The lowest unit rate is the best price.',view:'read'},
        {say:'Watch: three packages.',speech:'Now compare three packs of paper towels. Find each price per roll. The lowest price per roll is the best value, if you will use them all.',view:'model',demo:'three'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: compare the deals.',speech:'Your turn. Press Unit price to split each package, then tap the best value.',view:'model'}],
 fig:'Packages split into single units, each with its own price tag.',rz:.35,
 explore:['Press *Unit price* to split each package into units.','Each small tag shows the *price per unit*.','*Tap* the best value.'],
 howTo:'Find the price per unit for each package, then tap the best value or choose the unit rate.',
 init:k=>({di:0,split:false,ask:null,want:false}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'A *unit rate* is the price for *one* unit. Divide the price by the number of units. The *lowest* unit rate is the best price.')+16;
  [['3 L for $4.50','$4.50 ÷ 3 = $1.50 per L','#f59e0b',true],['2 L for $3.20','$3.20 ÷ 2 = $1.60 per L','#fb923c',false]].forEach(([a,b,c,best],i)=>{rr(g,X0,y+i*96,TW,84,16);g.fillStyle=tint(c,.2);g.fill();T(g,a,X0+24,y+i*96+36,FT.bodyB);T(g,b,X0+24,y+i*96+70,FT.body);if(best)T(g,'best value ✓',X0+TW-24,y+i*96+52,FT.bodyB,'#16a36f','right');});y+=210;
  y=para(p,y,'Services have unit rates too: *$12 for 4 hours* of bike rental is *$3 per hour*.')+10;
  y=para(p,y,'*Think beyond price:* a big pack is only a good deal if you will use it before it spoils, and if you can afford it now.')+12;
  y=keyWords(p,y,[['unit rate','the cost or amount for one unit'],['best value','the lowest price per unit for what you need']]);
  predict(p,y,S,'p33','Which is the better buy: 4 muffins for $6 or 6 muffins for $8.40?','*6 for $8.40.* $1.40 per muffin is less than $1.50.');},
 readout(p,S,y){const g=p.g,st=S.st,d=DEALS[st.di];d.forEach((q,i)=>T(g,q.n+' '+(q.n>1?q.u+'s':q.u).replace('Ls','L')+' for '+money(q.p)+(st.split?'  →  '+money(r2(q.p/q.n))+' per '+q.u:''),X0,y+38+i*36,FT.bodyB,i===0?acc():INK));return y+40+d.length*36;},
 build(S,grp,mode,game){const st=S.st;const g2=new THREE.Group();grp.add(g2);
  function draw(){clearGroup(g2);const d=DEALS[st.di],nd=d.length,best=bestIdx(d);
    d.forEach((q,i)=>{const z=-2.7+i*(nd===3?.95:1.3);const g=new THREE.Group();g.position.set(0,0,z);g2.add(g);const shelf=mk(G('vshelf',()=>new THREE.BoxGeometry(4.3,.05,.75)),lam('#e7dcc8'),20);shelf.position.y=.025;g.add(shelf);
      const tag=label(q.n+' for '+money(q.p),{size:.2,bg:'#ffffff',border:q.c==='#e5e7eb'||q.c==='#f1f5f9'||q.c==='#cbd5e1'?'#64748b':q.c});tag.position.set(-1.55,.45,.1);g.add(tag);
      const n=q.n,uw=Math.min(.24,3.0/n),x0=-.9;
      if(!st.split){const w=uw*n;const b=mk(new THREE.BoxGeometry(w,.36,.5),lam(q.c),20);b.position.set(x0+w/2,.21,0);g.add(b);A.drag(b,{tap:()=>tap(i)});}
      else{for(let k=0;k<n;k++){const m=mk(G('vu'+uw,()=>new THREE.BoxGeometry(uw*.86,.3,.4)),lam(q.c),20);m.position.set(x0+(k+.5)*uw,.18+(k%2)*.02,0);g.add(m);A.drag(m,{tap:()=>tap(i)});}
        const ul=label(money(r2(q.p/q.n))+' per '+q.u,{size:.2,bg:'#ffffff',border:i===best&&st.reveal?'#16a36f':'#94a3b8'});ul.position.set(x0+uw*n+.6,.4,0);g.add(ul);}});
    const tl=label(d[0].it,{size:.24,color:GREY});tl.position.set(1.6,.3,-3.1);g2.add(tl);A.redraw();}
  function tap(i){const b=bestIdx(DEALS[st.di]);if(mode==='play'&&st.want&&!st.setup){if(i===b){st.reveal=true;draw();game.solved('Yes! '+money(r2(DEALS[st.di][b].p/DEALS[st.di][b].n))+' per '+DEALS[st.di][b].u+' is the lowest.');}else A.bad('Compare the price per '+DEALS[st.di][0].u+'.');}}
  function splitIt(){if(st.split)return;st.split=true;A.pop();draw();A.say('Price ÷ number of units = unit price');}
  draw();
  return {info:()=>DEALS[st.di][0].it+': which is the best value?',
    controls:()=>{const c=[{t:'Unit price',go:true,fn:splitIt},{t:'Whole packs',fn:()=>{st.split=false;draw();}}];if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);
      return mode==='learn'?c.concat([{t:'Next deal',fn:()=>{st.di=(st.di+1)%DEALS.length;st.split=false;st.reveal=false;draw();}}]):c;},
    demo(n){if(n==='show'){st.reveal=true;st.split=false;st.di=0;draw();return;}if(n==='splitnow'){splitIt();return;}st.ask=null;st.want=false;st.reveal=true;st.split=false;st.di=n==='three'?3:0;draw();A.seq([[1000,splitIt]]);},
    task(r){st.setup=true;st.ask=null;st.want=false;st.split=false;st.reveal=false;st.di=r;
      if(r===2){const q=DEALS[2][0];const a=money(q.p/q.n);st.ask={ans:a,o:shuffle([a,money(q.p*q.n>99?9:q.p/2),money(q.p)]).filter((x,i,arr)=>arr.indexOf(x)===i),ok:'Yes! '+money(q.p)+' ÷ '+q.n+' = '+a+' per hour.'};draw();st.setup=false;return 'Bike rental: *'+money(q.p)+' for '+q.n+' hours*. What is the *unit rate* per hour?';}
      st.want=true;draw();st.setup=false;return 'Tap the *best value* for '+DEALS[r][0].it+'. Use Unit price to help.';}};}
});
function bestIdx(d){let b=0;d.forEach((q,i)=>{if(q.p/q.n<d[b].p/d[b].n)b=i;});return b;}
})();
