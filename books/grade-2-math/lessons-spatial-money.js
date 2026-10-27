/* The Interactive Classroom: Grade 2 Math — Spatial Sense (21–27) and Financial Literacy (28) */
(function(){
"use strict";
const P=window.PM;if(!P||P.failed||!P.THREE)return;
const {THREE,V,W,D,PY,PX,X0,TW,INK,RED,BLUE,GREY,VIBE,FT,ZS,G,M,lam,mk,unitBox,cellMat,label,starGeo,wedgeGeo,clearGroup,disposeObj,rr,T,wrap,para,header,keyWords,predict,box,caption,cxOf,cyOf,tint,moveTo,hop,tween,burst,easeOut,easeIO,A}=P;
const acc=()=>P.ACC;
const rnd=(a,b)=>a+Math.floor(Math.random()*(b-a+1)),pick=a=>a[Math.floor(Math.random()*a.length)],shuffle=a=>a.slice().sort(()=>Math.random()-.5);
function choices(game,list,ans,ok,lab){return list.map(o=>({t:lab?lab(o):String(o),big:true,fn:()=>{if(o===ans){if(game)game.solved(ok);else A.good(ok);}else A.bad('Not quite. Try again!');}}));}
const COL=['#ff4f8b','#ff8a3d','#ffc04d','#5fd38a','#2f7de1','#8b5cf6'];const HAND=()=>FT.hand||FT.body;
function slab(pts,col,h,op){const s=new THREE.Shape();pts.forEach(([x,z],i)=>i?s.lineTo(x,-z):s.moveTo(x,-z));s.closePath();const geo=new THREE.ExtrudeGeometry(s,{depth:h||.08,bevelEnabled:false});geo.rotateX(-Math.PI/2);
  return mk(geo,op?new THREE.MeshLambertMaterial({color:col,transparent:true,opacity:op,side:THREE.DoubleSide}):lam(col),20);}
function seg(a,b,col,r){const len=a.distanceTo(b);const m=new THREE.Mesh(new THREE.CylinderGeometry(r,r,Math.max(.001,len),8),lam(col));m.position.copy(a).add(b).multiplyScalar(.5);m.quaternion.setFromUnitVectors(V(0,1,0),b.clone().sub(a).normalize());return m;}
const regPts=(n,r,rot)=>Array.from({length:n},(_,i)=>{const a=(rot||0)+Math.PI/2+i*2*Math.PI/n;return [Math.cos(a)*r,-Math.sin(a)*r];});

/* =========================================================
   21. Sorting 2D shapes
   ========================================================= */
const SH2=[{n:'triangle',pts:()=>regPts(3,.42),sides:3,right:0,sym:3,col:'#ff8a3d'},{n:'square',pts:()=>[[-.3,-.3],[.3,-.3],[.3,.3],[-.3,.3]],sides:4,right:4,sym:4,col:'#2f7de1'},{n:'rectangle',pts:()=>[[-.42,-.24],[.42,-.24],[.42,.24],[-.42,.24]],sides:4,right:4,sym:2,col:'#5fd38a'},
  {n:'pentagon',pts:()=>regPts(5,.38),sides:5,right:0,sym:5,col:'#ff4f8b'},{n:'hexagon',pts:()=>regPts(6,.38),sides:6,right:0,sym:6,col:'#8b5cf6'},{n:'trapezoid',pts:()=>[[-.42,.22],[.42,.22],[.22,-.22],[-.22,-.22]],sides:4,right:0,sym:1,col:'#ffc04d'}];
P.lesson({id:'shapes2',title:'Sides, corners and symmetry',strand:'Spatial Sense',codes:['E1.1'],
 guide:{goal:'Sort and identify two-dimensional shapes by comparing number of sides, side lengths, angles and number of lines of symmetry.',words:'side, vertex, corner, right angle, line of symmetry, triangle, pentagon, hexagon, trapezoid',
  ask:['How many sides does a hexagon have?','Which shapes have right angles?','How many lines of symmetry does a square have?'],home:'Find shapes on signs and windows. Count their sides and corners. Fold paper shapes to find lines of symmetry.'},
 learn:[{say:'Count the sides!',speech:'Tap each shape and count its sides. A triangle has three sides. A square has four sides that are all the same length, and four square corners called right angles. A hexagon has six sides!',view:'model',demo:'tour'},
        {say:'Read about symmetry.',speech:'A line of symmetry folds a shape into two matching halves. A rectangle has two lines of symmetry. A square has four! A trapezoid like this one has just one.',view:'read'},
        {say:'Watch: lines of symmetry.',speech:'Watch the fold lines appear on the square: one, two, three, four lines of symmetry.',view:'model',demo:'sym'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: sort the shapes!',speech:'Your turn! Tap the shape that matches the clue.',view:'model'}],
 fig:'Six flat shapes, with their lines of symmetry.',rz:.35,
 explore:['*Tap a shape* to count its sides.','Turn on *Symmetry lines*.','Look for *right angles*.'],
 howTo:'Tap the shape that matches the clue.',
 init:k=>({sel:1,sym:false,want:null,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'Sort shapes by *sides*, *corners* (angles) and *lines of symmetry*.')+12;
  rr(g,X0,y,TW,44,12);g.fillStyle=tint(acc(),.16);g.fill();['Shape','Sides','Right angles','Symmetry lines'].forEach((h,i)=>T(g,h,X0+16+i*TW/4,y+30,FT.smallB,acc()));y+=48;
  SH2.forEach((s,j)=>[s.n,s.sides,s.right,s.sym].forEach((v,i)=>T(g,String(v),X0+16+i*TW/4+(i?40:0),y+j*42+30,i?FT.bodyB:FT.bodyB,i?INK:s.col)));y+=264;
  g.strokeStyle=INK;g.lineWidth=3;g.strokeRect(X0+60,y,120,120);g.setLineDash([8,6]);g.strokeStyle=RED;[[X0+120,y-10,X0+120,y+130],[X0+50,y+60,X0+190,y+60],[X0+50,y-10,X0+190,y+130],[X0+190,y-10,X0+50,y+130]].forEach(([a,b,c,d])=>{g.beginPath();g.moveTo(a,b);g.lineTo(c,d);g.stroke();});g.setLineDash([]);T(g,'a square has 4 lines of symmetry',X0+240,y+66,FT.bodyB,acc());y+=150;
  y=keyWords(p,y,[['right angle','a square corner'],['line of symmetry','a fold line that makes matching halves']]);
  predict(p,y,S,'p21','How many sides and corners does a pentagon have?','*5 sides and 5 corners.*');},
 readout(p,S,y){const g=p.g,st=S.st,s=SH2[st.sel];T(g,s.n[0].toUpperCase()+s.n.slice(1),X0,y+50,ZS(46),s.col);T(g,s.sides+' sides · '+s.right+' right angles · '+s.sym+' line'+(s.sym===1?'':'s')+' of symmetry',X0,y+92,FT.bodyB);return y+100;},
 build(S,grp,mode,game){const st=S.st;const g2=new THREE.Group();grp.add(g2);
  const pos=i=>[-1.5+(i%3)*1.5,-2.5+Math.floor(i/3)*1.2];
  function draw(){clearGroup(g2);SH2.forEach((s,i)=>{const [cx,cz]=pos(i);const on=i===st.sel;const m=slab(s.pts().map(([x,z])=>[cx+x,cz+z]),s.col,on?.16:.08);g2.add(m);A.drag(m,{tap:()=>tap(i)});
      if(on){s.pts().forEach(([x,z])=>{const d=mk(G('g2vx',()=>new THREE.SphereGeometry(.04,8,6)),lam(INK),0);d.position.set(cx+x,.18,cz+z);g2.add(d);});if(st.sym)symLines(s,cx,cz);}
      const l=label(s.n,{size:.14,color:GREY});l.position.set(cx,.1,cz+.55);g2.add(l);});A.redraw();}
  function symLines(s,cx,cz){const L=.6;let angs=[];if(s.n==='square')angs=[0,Math.PI/2,Math.PI/4,-Math.PI/4];else if(s.n==='rectangle')angs=[0,Math.PI/2];else if(s.n==='trapezoid')angs=[Math.PI/2];else{const n=s.sides;for(let k=0;k<n;k++)angs.push(Math.PI/2+k*Math.PI/n);}
    angs.forEach(a=>{g2.add(seg(V(cx-Math.cos(a)*L,.2,cz+Math.sin(a)*L),V(cx+Math.cos(a)*L,.2,cz-Math.sin(a)*L),'#ef4444',.012));});}
  function tap(i){st.sel=i;A.pop();draw();const s=SH2[i];A.say(s.n+': '+s.sides+' sides');if(mode==='play'&&!st.setup&&st.want){if(st.want(i))game.solved(st.wantOk);else A.bad('Count the sides and corners again!');}}
  draw();
  return {info:()=>SH2[st.sel].n,
    controls:()=>{const c=[{t:'Symmetry lines',on:st.sym,go:true,fn:()=>{st.sym=!st.sym;draw();}}];if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);return c;},
    demo(n){st.ask=null;st.want=null;if(n==='tour'){st.sym=false;A.seq(SH2.map((s,i)=>[800,()=>tap(i)]));}if(n==='sym'){st.sel=1;st.sym=true;draw();}},
    task(r){st.setup=true;st.ask=null;st.want=null;st.sym=false;st.sel=0;let txt;
      if(r===0){st.want=i=>SH2[i].sides===5;st.wantOk='Yes! A pentagon has 5 sides.';txt='Tap the shape with *5 sides*.';}
      else if(r===1){st.want=i=>SH2[i].sides===6;st.wantOk='Yes! A hexagon has 6 sides.';txt='Tap the *hexagon*.';}
      else if(r===2){st.want=i=>SH2[i].n==='rectangle';st.wantOk='Yes! 4 right angles, but only 2 lines of symmetry.';txt='Tap the shape with *4 right angles* but only *2 lines of symmetry*.';}
      else if(r===3){st.sel=5;st.sym=true;st.ask={ans:'1',o:shuffle(['1','2','4']),ok:'Yes! This trapezoid folds only one way.'};txt='How many *lines of symmetry* does this trapezoid have?';}
      else{st.want=i=>SH2[i].n==='square';st.wantOk='Yes! All 4 sides of a square are the same length.';txt='Tap the 4-sided shape with *all sides the same length*.';}
      draw();st.setup=false;return txt;}};}
});

/* =========================================================
   22. Composing shapes: area stays the same
   ========================================================= */
const CFG={square:[[[0,0],[2,0],[0,2]],[[2,0],[2,2],[0,2]]],tri:[[[2,0],[4,0],[2,2]],[[2,0],[0,0],[2,2]]],para:[[[0,2],[2,2],[0,4]],[[2,2],[0,2],[2,0]]]};
P.lesson({id:'compose2',title:'Building shapes from shapes',strand:'Spatial Sense',codes:['E1.2'],
 guide:{goal:'Compose and decompose two-dimensional shapes, and show that the area of a shape stays the same when its parts are rearranged.',words:'compose, decompose, rearrange, area, square units, triangle, tangram',
  ask:['How many triangles make this square?','Does the area change when you move the pieces?','How many small triangles make a hexagon?'],home:'Cut a paper square into two triangles. Make a big triangle, then a different shape. Is it the same amount of paper?'},
 learn:[{say:'Two triangles, one square.',speech:'Two triangles fit together to make a square. The square covers four square units. Now slide one triangle over: it makes a big triangle! It still covers four square units.',view:'model',demo:'move'},
        {say:'Read about area.',speech:'Area is how much space a shape covers. When you rearrange the same pieces, the shape changes, but the area stays the same.',view:'read'},
        {say:'Watch: a hexagon.',speech:'Six small triangles fit together to make a hexagon. Decompose it, and you see the six pieces again.',view:'model',demo:'hex'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: rearrange!',speech:'Your turn! Rearrange the pieces and count the square units.',view:'model'}],
 fig:'Two triangles rearranged into new shapes on a grid.',rz:.35,
 explore:['Press *Square*, *Triangle* or *Parallelogram*.','Count the *square units*.','Press *Hexagon* to see six triangles.'],
 howTo:'Rearrange the pieces, then answer the question.',
 init:k=>({cfg:'square',hex:false,apart:false,need:null,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'*Compose:* put shapes together. *Decompose:* break a shape apart.')+16;
  const s=50,ox=X0+20;const tri=(pts,c)=>{g.beginPath();pts.forEach(([x,z],i)=>{const X=ox+x*s,Y=y+170-z*s;i?g.lineTo(X,Y):g.moveTo(X,Y);});g.closePath();g.fillStyle=c;g.fill();g.strokeStyle=INK;g.lineWidth=2;g.stroke();};
  for(let i=0;i<=14;i++){g.strokeStyle='#e5e7eb';g.beginPath();g.moveTo(ox+i*s,y);g.lineTo(ox+i*s,y+170);g.stroke();}
  CFG.square.forEach((t,i)=>tri(t,i?'#ff4f8b':'#2f7de1'));CFG.tri.forEach((t,i)=>tri(t.map(([x,z])=>[x+4,z]),i?'#ff4f8b':'#2f7de1'));T(g,'4 square units',ox+50,y+200,FT.smallB,INK,'center');T(g,'still 4 square units!',ox+300,y+200,FT.smallB,INK,'center');y+=230;
  const hx=X0+620,hy=y-130;for(let k=0;k<6;k++){g.beginPath();g.moveTo(hx,hy);g.lineTo(hx+Math.cos(k*Math.PI/3)*70,hy+Math.sin(k*Math.PI/3)*70);g.lineTo(hx+Math.cos((k+1)*Math.PI/3)*70,hy+Math.sin((k+1)*Math.PI/3)*70);g.closePath();g.fillStyle=COL[k];g.fill();g.strokeStyle='#fff';g.stroke();}
  y=para(p,y,'Moving the pieces changes the *shape*, but not the *area*.')+10;
  y=keyWords(p,y,[['area','how much space a shape covers'],['compose','put shapes together to make a new shape']]);
  predict(p,y,S,'p22','A shape covers 6 squares. You rearrange its pieces. What is the new area?','*Still 6 squares!*');},
 readout(p,S,y){const g=p.g,st=S.st;T(g,st.hex?'6 triangles make a hexagon':(st.cfg==='square'?'A square':st.cfg==='tri'?'A big triangle':'A parallelogram')+': 4 square units',X0,y+52,ZS(38),acc());return y+66;},
 build(S,grp,mode,game){const st=S.st,u=.5,ox=-1.0,oz=-1.0;const g2=new THREE.Group();grp.add(g2);
  const grid=mk(new THREE.BoxGeometry(8*u,.02,4.5*u),[lam('#f8fafc'),lam('#f8fafc'),cellMat('#ffffff',8,4.5),lam('#f8fafc'),lam('#f8fafc'),lam('#f8fafc')],20);grid.position.set(ox+2*u-.5,.01,oz-2.25*u+.25);grp.add(grid);
  let tris=[];
  function draw(){clearGroup(g2);tris=[];if(st.hex){const cx=0,cz=-1.9,R=.9;for(let k=0;k<6;k++){const a0=k*Math.PI/3,a1=(k+1)*Math.PI/3;const off=st.apart?.18:0;const mx=Math.cos((a0+a1)/2)*off,mz=-Math.sin((a0+a1)/2)*off;const t=slab([[cx+mx,cz+mz],[cx+mx+Math.cos(a0)*R,cz+mz-Math.sin(a0)*R],[cx+mx+Math.cos(a1)*R,cz+mz-Math.sin(a1)*R]],COL[k],.1);g2.add(t);}A.redraw();return;}
    CFG[st.cfg].forEach((tr,i)=>{const t=slab(tr.map(([x,z])=>[ox+x*u-1,oz-z*u]),i?'#ff4f8b':'#2f7de1',.1);g2.add(t);tris.push(t);});const l=label('4 square units',{size:.22,bg:'#ffffff'});l.position.set(1.2,.6,-2.6);g2.add(l);A.redraw();}
  function setCfg(c){if(st.hex){st.hex=false;}const from=st.cfg;st.cfg=c;A.pop();draw();if(tris[1]&&from!==c){const t=tris[1];const f=CFG[from][1][0],to=CFG[c][1][0];t.position.set((f[0]-to[0])*u,0,-(f[1]-to[1])*u);tween(.6,k=>{t.position.set((f[0]-to[0])*u*(1-k),0,-(f[1]-to[1])*u*(1-k));});}A.say((c==='square'?'square':c==='tri'?'triangle':'parallelogram')+': still 4 square units');
    if(mode==='play'&&!st.setup&&st.need===c)game.solved('Yes! The area is still 4 square units.');}
  draw();
  return {info:()=>st.hex?'hex':st.cfg,
    controls:()=>{const c=[{t:'Square',on:!st.hex&&st.cfg==='square',fn:()=>setCfg('square')},{t:'Triangle',on:!st.hex&&st.cfg==='tri',go:true,fn:()=>setCfg('tri')},{t:'Parallelogram',on:!st.hex&&st.cfg==='para',fn:()=>setCfg('para')},{t:'Hexagon',on:st.hex,fn:()=>{st.hex=true;st.apart=false;draw();}},{t:'Decompose',fn:()=>{st.hex=true;st.apart=!st.apart;A.pop();draw();}}];if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);return c;},
    demo(n){st.ask=null;st.need=null;if(n==='move'){st.hex=false;st.cfg='square';draw();A.seq([[1000,()=>setCfg('tri')]]);}if(n==='hex'){st.hex=true;st.apart=false;draw();A.seq([[1000,()=>{st.apart=true;draw();A.say('6 triangles!');}]]);}},
    task(r){st.setup=true;st.ask=null;st.need=null;st.hex=false;st.cfg='square';let txt;
      if(r===0){st.need='tri';txt='Rearrange the two triangles into *one big triangle*.';}
      else if(r===1){st.need='para';txt='Rearrange them into a *parallelogram* (a slanted shape).';}
      else if(r===2){st.cfg='tri';st.ask={ans:'4 square units',o:shuffle(['4 square units','8 square units','2 square units']),ok:'Yes! Same pieces, same area.'};txt='The square covered 4 square units. What is the area of the *big triangle*?';}
      else if(r===3){st.hex=true;st.ask={ans:'6',o:shuffle(['6','4','8']),ok:'Yes! Six triangles make a hexagon.'};txt='How many triangles make this *hexagon*?';}
      else{st.ask={ans:'No, it stays the same',o:['Yes, it gets bigger','No, it stays the same'],ok:'Right! Rearranging does not change area.'};txt='Does the *area* change when you rearrange the pieces?';}
      draw();st.setup=false;return txt;}};}
});

/* =========================================================
   23. Congruent shapes
   ========================================================= */
const CG=[{n:'A',pts:[[0,0],[1.2,0],[1.2,.6],[0,.6]]},{n:'B',pts:[[0,0],[.6,0],[.6,1.2],[0,1.2]]},{n:'C',pts:[[0,0],[1.2,0],[1.2,.8],[0,.8]]},{n:'D',pts:[[0,0],[1.0,0],[.5,.9]]},{n:'E',pts:[[0,0],[1.0,0],[.5,1.2]]},{n:'F',pts:[[0,0],[.9,0],[0,.9]]}];
P.lesson({id:'congruent2',title:'Same size, same shape',strand:'Spatial Sense',codes:['E1.3'],
 guide:{goal:'Identify congruent lengths and angles in two-dimensional shapes by mentally and physically matching them, and determine if shapes are congruent.',words:'congruent, match, same size, same shape, side length, angle, turn, flip, slide',
  ask:['How can you check if two shapes are congruent?','Is a turned rectangle still congruent?','Do congruent shapes have matching angles?'],home:'Find two things that look the same, like two crackers. Place one on top of the other. Are they congruent?'},
 learn:[{say:'Slide, turn, and match!',speech:'Are these two rectangles the same size and shape? Slide the pink one onto the blue one and turn it. It fits exactly! They are congruent.',view:'model',demo:'match'},
        {say:'Read about congruent shapes.',speech:'Congruent shapes have the same size and the same shape. All their matching sides are the same length, and their matching angles are the same. Turning or flipping a shape does not change it.',view:'read'},
        {say:'Watch: not congruent.',speech:'Now try this taller triangle. Slide it on top. It does not fit: one side is longer. These triangles are not congruent.',view:'model',demo:'nomatch'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: find the match!',speech:'Your turn! Pick a shape and press Try it to see if it fits.',view:'model'}],
 fig:'A pink shape sliding and turning onto a blue shape.',rz:.35,
 explore:['*Tap a pink shape* to choose it.','Press *Try it*: it slides and turns to check.','A perfect fit means *congruent*.'],
 howTo:'Find the shape that is congruent to the blue one.',
 init:k=>({tgt:0,sel:1,fit:0,want:null,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'*Congruent* shapes are the *same size* and *same shape*, even if one is turned or flipped.')+16;
  g.fillStyle='#2f7de1';g.fillRect(X0+20,y+40,180,90);g.save();g.translate(X0+330,y+85);g.rotate(Math.PI/2);g.fillStyle='#ff4f8b';g.fillRect(-90,-45,180,90);g.restore();T(g,'congruent (turned)',X0+200,y+190,FT.bodyB,'#16a36f','center');
  g.fillStyle='#2f7de1';g.beginPath();g.moveTo(X0+480,y+150);g.lineTo(X0+600,y+150);g.lineTo(X0+540,y+50);g.closePath();g.fill();g.fillStyle='#ff4f8b';g.beginPath();g.moveTo(X0+640,y+150);g.lineTo(X0+760,y+150);g.lineTo(X0+700,y+10);g.closePath();g.fill();T(g,'not congruent',X0+620,y+190,FT.bodyB,RED,'center');y+=220;
  y=para(p,y,'Check: do the *sides* match in length? Do the *angles* (corners) match?')+10;
  y=keyWords(p,y,[['congruent','exactly the same size and shape'],['angle','the corner where two sides meet']]);
  predict(p,y,S,'p23','Two squares have sides of 3 cm. Are they congruent?','*Yes!* Same size, same shape.');},
 readout(p,S,y){const g=p.g,st=S.st;const ok=cong(st.tgt,st.sel);T(g,'Blue '+CG[st.tgt].n+' and pink '+CG[st.sel].n,X0,y+40,FT.bodyB);T(g,st.fit?(ok?'Congruent: a perfect fit!':'Not congruent'):'Press Try it!',X0,y+86,ZS(40),st.fit?(ok?'#16a36f':RED):acc());return y+96;},
 build(S,grp,mode,game){const st=S.st;const g2=new THREE.Group();grp.add(g2);let mover=null;
  const opts=()=>[0,1,2,3,4,5].filter(i=>i!==st.tgt);
  function draw(){clearGroup(g2);const t=CG[st.tgt];g2.add(slab(t.pts.map(([x,z])=>[-1.4+x,-2.0-z]),'#2f7de1',.06));const tl=label('blue '+t.n,{size:.15,color:'#2563eb'});tl.position.set(-.9,.1,-1.75);g2.add(tl);
    opts().forEach((i,k)=>{const c=CG[i];const x=.3+(k%3)*.65,z=-2.4+Math.floor(k/3)*1.15;const sc=.5;const m=slab(c.pts.map(([a,b])=>[x+a*sc,z+.3-b*sc]),i===st.sel?'#ff4f8b':'#fbcfe8',.07);g2.add(m);A.drag(m,{tap:()=>{st.sel=i;st.fit=0;A.pop();draw();A.say('pink '+c.n);}});const l=label(c.n,{size:.15,color:'#be185d'});l.position.set(x+.3,.12,z+.45);g2.add(l);});
    if(st.fit){const c=CG[st.sel];mover=new THREE.Group();mover.add(slab(c.pts.map(([x,z])=>[x,-z]),'#ff4f8b',.04,.75));mover.position.set(-1.4,.08,-2.0);if(st.rot)mover.rotation.y=st.rot;g2.add(mover);}A.redraw();}
  function tryIt(){const a=CG[st.tgt],b=CG[st.sel];st.fit=1;st.rot=0;const turn=!same(a.pts,b.pts)&&same(a.pts,rot90(b.pts));draw();const m=mover;m.position.set(.6,.6,-1.2);m.rotation.y=0;const fx=turn?-1.4+Math.max(...b.pts.map(q=>q[1])):-1.4;
    tween(.9,k=>{m.position.set(.6+(fx-.6)*k,.6-.52*k,-1.2+(-2.0+1.2)*k);if(turn)m.rotation.y=Math.PI/2*k;}).then(()=>{const ok=cong(st.tgt,st.sel);A.pop();A.say(ok?'A perfect fit: congruent!':'It does not fit: not congruent.');
      A.redraw();if(mode==='play'&&!st.setup&&st.want){if(ok)game.solved('Yes! Pink '+b.n+' is congruent to blue '+a.n+'.');else A.bad('Not a match. Try another shape!');}});}
  draw();
  return {info:()=>st.tgt+'/'+st.sel,
    controls:()=>{const c=[{t:'Try it',go:true,fn:tryIt},{t:'New blue shape',fn:()=>{st.tgt=pick([0,3]);st.sel=opts()[0];st.fit=0;draw();}}];if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);return c;},
    demo(n){st.ask=null;st.want=null;st.fit=0;if(n==='match'){st.tgt=0;st.sel=1;draw();A.seq([[700,tryIt]]);}if(n==='nomatch'){st.tgt=3;st.sel=4;draw();A.seq([[700,tryIt]]);}},
    task(r){st.setup=true;st.ask=null;st.want=null;st.fit=0;let txt;
      if(r===0){st.tgt=0;st.sel=2;st.want=true;txt='Find the pink shape that is *congruent* to blue A. Tap it, then *Try it*.';}
      else if(r===1){st.tgt=1;st.sel=2;st.want=true;txt='Find the shape *congruent* to blue B. (It may be turned!)';}
      else if(r===2){st.tgt=0;st.sel=1;st.ask={ans:'Yes',o:['Yes','No'],ok:'Yes! A turned shape is still congruent.'};txt='Pink B is blue A *turned*. Are they congruent? Try it!';}
      else if(r===3){st.tgt=3;st.sel=4;st.ask={ans:'No',o:['Yes','No'],ok:'Right! One side is longer.'};txt='Are blue D and pink E congruent? Try it!';}
      else{st.tgt=0;st.sel=1;st.ask={ans:'They are the same',o:shuffle(['They are the same','They are different','You cannot tell']),ok:'Yes! Congruent shapes have matching angles.'};txt='Two shapes are congruent. What about their *angles*?';}
      draw();st.setup=false;return txt;}};}
});
function same(a,b){if(a.length!==b.length)return false;const bb=s=>{const xs=s.map(p=>p[0]),zs=s.map(p=>p[1]);return [Math.max(...xs)-Math.min(...xs),Math.max(...zs)-Math.min(...zs)].map(v=>Math.round(v*100));};const A1=bb(a),B1=bb(b);return A1[0]===B1[0]&&A1[1]===B1[1];}
function rot90(p){return p.map(([x,z])=>[z,x]);}
function cong(i,j){const a=CG[i].pts,b=CG[j].pts;return a.length===b.length&&(same(a,b)||same(a,rot90(b)));}

/* =========================================================
   24. Maps and moving around
   ========================================================= */
const LM=[{n:'slide',x:0,z:0,col:'#ef4444'},{n:'swings',x:4,z:0,col:'#2f7de1'},{n:'sandbox',x:1,z:3,col:'#ffc04d'},{n:'tree',x:5,z:3,col:'#16a34a'},{n:'school door',x:2,z:5,col:'#8b5cf6'}];
P.lesson({id:'map2',title:'Maps of familiar places',strand:'Spatial Sense',codes:['E1.4','E1.5'],
 guide:{goal:'Create and interpret simple maps of familiar places, and describe the relative positions of objects and the movements needed to get from one object to another.',words:'map, grid, left, right, forward, back, near, far, between, path, steps',
  ask:['What is beside the slide on the map?','How do you get from the swings to the tree?','Which place is farthest from the school door?'],home:'Draw a map of your bedroom. Give someone directions from the door to your bed.'},
 learn:[{say:'A map from above.',speech:'This is a map of the playground, seen from above, like a bird. Each square is one big step. The kid walks from the slide to the swings: four steps right!',view:'model',demo:'walk'},
        {say:'Read about directions.',speech:'Directions tell how to move: forward, back, left and right, and how many steps. Position words tell where things are: the sandbox is between the slide and the school door.',view:'read'},
        {say:'Watch: a longer path.',speech:'From the swings to the tree: three steps forward, then one step right. There can be more than one path!',view:'model',demo:'path'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: follow the map!',speech:'Your turn! Move the kid with the arrows to the place the question asks.',view:'model'}],
 fig:'A playground map on a grid.',rz:.35,
 explore:['Move the kid: *forward*, *back*, *left*, *right*.','Count the *steps*.','*Tap a place* to hear its name.'],
 howTo:'Walk the kid to the right place on the map.',
 init:k=>({pos:[0,0],steps:0,goal:null,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'A *map* shows a place from above. A *grid* helps us count steps.')+16;
  const s=56;for(let i=0;i<6;i++)for(let j=0;j<6;j++){g.fillStyle=(i+j)%2?'#dcfce7':'#f0fdf4';g.fillRect(X0+i*s,y+(5-j)*s,s,s);}LM.forEach(l=>{g.fillStyle=l.col;g.fillRect(X0+l.x*s+10,y+(5-l.z)*s+10,s-20,s-20);T(g,l.n,X0+l.x*s+s/2,y+(5-l.z)*s+s+12,FT.cap,INK,'center');});y+=6*s+30;
  y=para(p,y,'From the *slide* to the *swings*: *4 steps right*. From the swings to the tree: *3 forward, 1 right*.')+10;
  y=keyWords(p,y,[['map','a picture of a place from above'],['path','the way you move from one place to another']]);
  predict(p,y,S,'p24','From the slide, go 3 forward and 1 right. Where are you?','*At the sandbox!*');},
 readout(p,S,y){const g=p.g,st=S.st;const at=LM.find(l=>l.x===st.pos[0]&&l.z===st.pos[1]);T(g,at?'At the '+at.n+'!':'Square ('+st.pos[0]+', '+st.pos[1]+')',X0,y+50,ZS(42),acc());T(g,st.steps+' steps',X0,y+90,FT.bodyB);return y+98;},
 build(S,grp,mode,game){const st=S.st,c=.5,ox=-1.3,oz=-.6;const X=i=>ox+i*c,Z=j=>oz-j*c;
  for(let i=0;i<6;i++)for(let j=0;j<6;j++){const t=mk(G('g2maptile',()=>new THREE.BoxGeometry(c*.96,.04,c*.96)),lam((i+j)%2?'#bbf7d0':'#dcfce7'),20);t.position.set(X(i),.02,Z(j));grp.add(t);}
  LM.forEach(l=>{let o;if(l.n==='tree'){o=new THREE.Group();const tr=mk(new THREE.CylinderGeometry(.04,.05,.3,8),lam('#78350f'),0);tr.position.y=.15;o.add(tr);const cr=mk(new THREE.SphereGeometry(.2,14,10),lam(l.col),0);cr.position.y=.4;o.add(cr);}
    else if(l.n==='swings'){o=new THREE.Group();o.add(seg(V(-.18,0,0),V(-.18,.45,0),'#1d4ed8',.02));o.add(seg(V(.18,0,0),V(.18,.45,0),'#1d4ed8',.02));o.add(seg(V(-.18,.45,0),V(.18,.45,0),'#1d4ed8',.02));const st2=mk(new THREE.BoxGeometry(.14,.02,.08),lam(l.col),0);st2.position.y=.18;o.add(st2);}
    else if(l.n==='slide'){o=new THREE.Group();const r=mk(new THREE.BoxGeometry(.12,.04,.5),lam(l.col),0);r.position.set(0,.2,0);r.rotation.x=.6;o.add(r);o.add(seg(V(0,0,-.2),V(0,.38,-.2),'#991b1b',.02));}
    else if(l.n==='sandbox'){o=mk(new THREE.BoxGeometry(.4,.08,.4),lam(l.col),20);o.position.y=.04;}else{o=mk(new THREE.BoxGeometry(.4,.5,.06),lam(l.col),20);o.position.y=.25;}
    const g=new THREE.Group();g.add(o);g.position.set(X(l.x),.04,Z(l.z));grp.add(g);g.traverse(m=>{if(m.isMesh)A.drag(m,{tap:()=>{A.pop();A.say(l.n);}});});const lb=label(l.n,{size:.12,color:INK});lb.position.set(X(l.x),.6,Z(l.z));grp.add(lb);});
  const kid=new THREE.Group();const b=mk(new THREE.CylinderGeometry(.08,.1,.24,12),lam('#f97316'),0);b.position.y=.16;kid.add(b);const h=mk(new THREE.SphereGeometry(.08,12,10),lam('#fcd34d'),0);h.position.y=.34;kid.add(h);grp.add(kid);
  function place(){kid.position.set(X(st.pos[0])+.12,.04,Z(st.pos[1])+.12);}
  function step(d,name){const n=[st.pos[0]+d[0],st.pos[1]+d[1]];if(n[0]<0||n[0]>5||n[1]<0||n[1]>5){A.bad('That is off the map!');return;}st.pos=n;st.steps++;A.pop();hop(kid,V(X(n[0])+.12,.04,Z(n[1])+.12),.2,.28).then(()=>{A.redraw();const at=LM.find(l=>l.x===n[0]&&l.z===n[1]);if(at)A.say('the '+at.n+'!');else A.say(name);
      if(mode==='play'&&!st.setup&&st.goal&&at&&at.n===st.goal)game.solved('You made it to the '+at.n+' in '+st.steps+' steps!');});}
  place();
  return {info:()=>st.pos.join(','),
    controls:()=>{const c=[{t:'forward ↑',go:true,fn:()=>step([0,1],'forward')},{t:'back ↓',fn:()=>step([0,-1],'back')},{t:'left ←',fn:()=>step([-1,0],'left')},{t:'right →',fn:()=>step([1,0],'right')},{t:'Back to slide',fn:()=>{st.pos=[0,0];st.steps=0;place();A.redraw();}}];if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok);return c;},
    demo(n){st.ask=null;st.goal=null;st.steps=0;if(n==='walk'){st.pos=[0,0];place();A.seq([0,1,2,3].map(()=>[500,()=>step([1,0],'right')]));}if(n==='path'){st.pos=[4,0];place();A.seq([[500,()=>step([0,1],'forward')],[450,()=>step([0,1],'forward')],[450,()=>step([0,1],'forward')],[500,()=>step([1,0],'right')]]);}},
    task(r){st.setup=true;st.ask=null;st.goal=null;st.steps=0;let txt;
      if(r===0){st.pos=[0,0];st.goal='swings';txt='Walk from the slide to the *swings*.';}
      else if(r===1){st.pos=[4,0];st.goal='tree';txt='Walk from the swings to the *tree*.';}
      else if(r===2){st.pos=[0,0];st.goal='school door';txt='Walk from the slide to the *school door*.';}
      else if(r===3){st.pos=[0,0];st.ask={ans:'Sandbox',o:shuffle(['Sandbox','Tree','Swings']),ok:'Yes! 3 forward and 1 right reaches the sandbox.'};txt='From the slide, go *3 forward* and *1 right*. Where are you?';}
      else{st.pos=[0,0];st.ask={ans:'The tree',o:shuffle(['The tree','The sandbox','The school door']),ok:'Yes! The tree is farthest from the slide.'};txt='Which place is *farthest* from the slide?';}
      place();st.setup=false;return txt;}};}
});

/* =========================================================
   25. Measuring with non-standard units
   ========================================================= */
const UN=[{n:'paper clips',len:.3,col:'#94a3b8'},{n:'cubes',len:.2,col:'#ff8a3d'},{n:'erasers',len:.6,col:'#ff4f8b'}];
P.lesson({id:'units2',title:'Measuring with units',strand:'Spatial Sense',codes:['E2.1'],
 guide:{goal:'Choose and use non-standard units to measure lengths, and describe the inverse relationship between the size of a unit and the number of units needed.',words:'unit, measure, length, paper clip, end to end, no gaps, more, fewer',
  ask:['How do you measure with paper clips?','Why do you need more cubes than erasers?','Why must units have no gaps or overlaps?'],home:'Measure a table with spoons, then with forks. Which unit did you need more of? Why?'},
 learn:[{say:'Line up the units.',speech:'Let’s measure the crayon box with paper clips. Put them end to end, with no gaps and no overlaps. Six paper clips long!',view:'model',demo:'clips'},
        {say:'Read about unit size.',speech:'Smaller units need more of them. Bigger units need fewer of them. The box is nine cubes long, but only three erasers long!',view:'read'},
        {say:'Watch: three units.',speech:'Watch the same box measured with cubes, then with erasers. Small units: many. Big units: few.',view:'model',demo:'all'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: measure!',speech:'Your turn! Pick a unit and measure the object.',view:'model'}],
 fig:'Paper clips, cubes and erasers lined up beside a box.',rz:.35,
 explore:['Pick a *unit*.','Press *Measure* to line them up.','Compare the *counts*.'],
 howTo:'Measure, then choose the answer.',
 init:k=>({u:0,L:1.8,done:true,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'Measure with units placed *end to end*, with *no gaps* and *no overlaps*.')+16;
  g.fillStyle='#2f7de1';g.fillRect(X0+20,y,540,60);T(g,'crayon box',X0+290,y+40,FT.bodyB,'#fff','center');
  [['#94a3b8',90,6,'6 paper clips'],['#ff8a3d',60,9,'9 cubes'],['#ff4f8b',180,3,'3 erasers']].forEach(([c,w,n,t],j)=>{for(let i=0;i<n;i++){rr(g,X0+20+i*w,y+80+j*60,w-4,40,8);g.fillStyle=c;g.fill();}T(g,t,X0+600,y+108+j*60,FT.bodyB,INK);});y+=270;
  y=para(p,y,'*Smaller unit → more units. Bigger unit → fewer units.*')+10;
  y=keyWords(p,y,[['unit','the thing you measure with'],['end to end','touching, with no gaps']]);
  predict(p,y,S,'p25','A desk is 8 pencils long. Would it be more or fewer crayons long?','*More crayons*: crayons are shorter.');},
 readout(p,S,y){const g=p.g,st=S.st,u=UN[st.u];T(g,'about '+Math.round(st.L/u.len)+' '+u.n,X0,y+54,ZS(48),acc());return y+70;},
 build(S,grp,mode,game){const st=S.st;const g2=new THREE.Group();grp.add(g2);
  function unitMesh(u){if(u.n==='paper clips'){const m=mk(G('g2pc',()=>new THREE.TorusGeometry(.06,.012,6,16)),lam(u.col),0);m.scale.set(2.2,1,1);m.rotation.x=Math.PI/2;return m;}if(u.n==='cubes')return mk(G('g2uc',()=>new THREE.BoxGeometry(.19,.19,.19)),lam(u.col),20);return mk(G('g2er',()=>new THREE.BoxGeometry(.58,.12,.22)),lam(u.col),20);}
  function draw(anim){clearGroup(g2);const x0=-1.6;const bx=mk(new THREE.BoxGeometry(st.L,.3,.5),lam('#2f7de1'),20);bx.position.set(x0+st.L/2,.15,-2.3);g2.add(bx);const st2=mk(new THREE.BoxGeometry(.03,.4,1.6),lam(RED),0);st2.position.set(x0,.2,-1.9);g2.add(st2);
    const u=UN[st.u],n=Math.round(st.L/u.len);if(st.done)for(let i=0;i<n;i++){const m=unitMesh(u);m.position.set(x0+(i+.5)*u.len,u.n==='cubes'?.1:.07,-1.6);g2.add(m);if(anim){const y0=m.position.y;m.position.y=1.5;A.later(()=>tween(.3,k=>{m.position.y=1.5-(1.5-y0)*k;}),i*120);}}
    const l=label(st.done?n+' '+u.n:'?',{size:.26,bg:'#ffffff'});l.position.set(1.4,.8,-1.6);g2.add(l);A.redraw();}
  function measure(){st.done=true;A.pop();draw(true);A.later(()=>A.say(Math.round(st.L/UN[st.u].len)+' '+UN[st.u].n),Math.round(st.L/UN[st.u].len)*120+300);}
  draw();
  return {info:()=>UN[st.u].n,
    controls:()=>{const c=UN.map((u,i)=>({t:u.n,on:st.u===i,fn:()=>{st.u=i;st.done=false;draw();}})).concat([{t:'Measure',go:true,fn:measure}]);if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);return c;},
    demo(n){st.ask=null;st.L=1.8;if(n==='clips'){st.u=0;st.done=false;draw();A.seq([[500,measure]]);}if(n==='all'){st.u=1;st.done=false;draw();A.seq([[400,measure],[2000,()=>{st.u=2;st.done=false;draw();}],[300,measure]]);}},
    task(r){st.setup=true;st.done=false;st.L=1.8;let txt;
      if(r===0){st.u=0;st.ask={ans:'6',o:shuffle(['6','9','3']),ok:'Yes! 6 paper clips.'};txt='Measure the box with *paper clips*. How many?';}
      else if(r===1){st.u=1;st.ask={ans:'9',o:shuffle(['9','6','3']),ok:'Yes! 9 cubes.'};txt='Measure the box with *cubes*. How many?';}
      else if(r===2){st.u=2;st.ask={ans:'Cubes',o:shuffle(['Cubes','Erasers','Paper clips']),ok:'Yes! The smallest unit needs the most.'};txt='Which unit needs the *most* to measure the box?';}
      else if(r===3){st.u=0;st.L=1.2;st.ask={ans:'4',o:shuffle(['4','6','2']),ok:'Yes! 4 paper clips.'};txt='A shorter box. How many *paper clips* long is it?';}
      else{st.u=2;st.ask={ans:'Bigger units, fewer needed',o:['Bigger units, fewer needed','Bigger units, more needed'],ok:'Right! Big units: few. Small units: many.'};txt='Which sentence is true?';}
      draw();st.setup=false;return txt;}};}
});

/* =========================================================
   26. Centimetres and metres
   ========================================================= */
P.lesson({id:'cm2',title:'Centimetres and metres',strand:'Spatial Sense',codes:['E2.2','E2.3'],
 guide:{goal:'Explain the relationship between centimetres and metres, use benchmarks to estimate lengths, and measure and draw lengths with a ruler, including when starting at a point other than zero.',words:'centimetre (cm), metre (m), ruler, benchmark, estimate, start at zero',
  ask:['How many centimetres are in a metre?','What is about 1 cm long? About 1 m?','How do you measure if the object does not start at 0?'],home:'Find something about 1 cm wide (a fingertip) and something about 1 m long (a big step). Measure your shoe in cm.'},
 learn:[{say:'Measure with a ruler.',speech:'Line up the end of the crayon with the zero on the ruler. Read where it ends: nine centimetres. The crayon is nine centimetres long.',view:'model',demo:'zero'},
        {say:'Read about cm and m.',speech:'One hundred centimetres make one metre. Your fingertip is about one centimetre wide. A big step or a door’s width is about one metre. Use centimetres for small things and metres for big things.',view:'read'},
        {say:'Watch: not starting at zero.',speech:'Now the crayon starts at three and ends at twelve. Count the spaces from three to twelve: nine centimetres. Same crayon, same length!',view:'model',demo:'start'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: measure!',speech:'Your turn! Slide the crayon and measure it.',view:'model'}],
 fig:'A crayon on a centimetre ruler.',rz:.35,
 explore:['Slide the crayon *left* or *right*.','Change the *crayon length*.','Read the start and end.'],
 howTo:'Measure the crayon, then choose the answer.',
 init:k=>({start:0,len:9,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'*100 centimetres (cm) = 1 metre (m).*')+16;
  const ox=X0+20,w=TW-40,X=v=>ox+v/15*w;g.fillStyle='#fde68a';g.fillRect(ox-10,y+60,w+20,60);for(let v=0;v<=15;v++){g.strokeStyle=INK;g.lineWidth=2;g.beginPath();g.moveTo(X(v),y+60);g.lineTo(X(v),y+80);g.stroke();T(g,String(v),X(v),y+102,FT.small,INK,'center');}
  g.fillStyle='#ef4444';g.fillRect(X(3),y+20,X(12)-X(3),30);T(g,'starts at 3, ends at 12: 9 cm',X(7.5),y+12,FT.smallB,RED,'center');y+=150;
  [['about 1 cm','width of a fingertip'],['about 1 m','a big step, a doorway width'],['cm for','crayons, books, shoes'],['m for','rooms, hallways, a field']].forEach(([a,b],i)=>{T(g,a,X0+20,y+i*46+30,FT.bodyB,acc());T(g,b,X0+240,y+i*46+30,FT.body);});y+=200;
  y=keyWords(p,y,[['centimetre (cm)','a small unit of length'],['metre (m)','100 cm']]);
  predict(p,y,S,'p26','A pencil starts at 2 and ends at 10 on a ruler. How long is it?','*8 cm.*');},
 readout(p,S,y){const g=p.g,st=S.st;T(g,'from '+st.start+' to '+(st.start+st.len)+': '+st.len+' cm',X0,y+54,ZS(46),acc());return y+70;},
 build(S,grp,mode,game){const st=S.st,u=.26,x0=-1.95;const X=v=>x0+v*u;const rul=mk(new THREE.BoxGeometry(15*u+.2,.05,.6),lam('#fde68a'),20);rul.position.set(X(7.5),.025,-1.6);grp.add(rul);
  for(let v=0;v<=15;v++){const t=mk(G('g2rt',()=>new THREE.BoxGeometry(.015,.03,.18)),lam(INK),0);t.position.set(X(v),.06,-1.83);grp.add(t);const l=label(String(v),{size:.14,color:INK});l.position.set(X(v),.08,-1.55);grp.add(l);for(let k=1;k<10&&v<15;k++){const m=mk(G('g2rm',()=>new THREE.BoxGeometry(.006,.03,.07)),lam(INK),0);m.position.set(X(v+k/10),.06,-1.87);grp.add(m);}}
  const cm=label('cm',{size:.14,color:GREY});cm.position.set(X(15)+.15,.08,-1.35);grp.add(cm);const cr=new THREE.Group();grp.add(cr);
  function draw(){clearGroup(cr);const L=st.len*u;const b=mk(new THREE.CylinderGeometry(.07,.07,L-.12,10),lam('#ef4444'),0);b.rotation.z=Math.PI/2;b.position.set((L-.12)/2,0,0);cr.add(b);const tip=mk(new THREE.ConeGeometry(.07,.12,10),lam('#b91c1c'),0);tip.rotation.z=-Math.PI/2;tip.position.set(L-.06,0,0);cr.add(tip);cr.position.set(X(st.start),.12,-2.15);A.redraw();}
  draw();
  return {info:()=>st.start+'+'+st.len,
    controls:()=>{const c=[{t:'slide ←',fn:()=>{st.start=Math.max(0,st.start-1);A.pop();draw();}},{t:'slide →',go:true,fn:()=>{st.start=Math.min(15-st.len,st.start+1);A.pop();draw();}},{t:'longer',fn:()=>{st.len=Math.min(15-st.start,st.len+1);draw();}},{t:'shorter',fn:()=>{st.len=Math.max(2,st.len-1);draw();}}];if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);return c;},
    demo(n){st.ask=null;st.len=9;if(n==='zero'){st.start=0;draw();A.say('9 cm');}if(n==='start'){st.start=0;draw();A.seq([1,2,3].map(s=>[500,()=>{st.start=s;draw();}]).concat([[500,()=>A.say('from 3 to 12: still 9 cm')]]));}},
    task(r){st.setup=true;let txt;
      if(r===0){st.start=0;st.len=rnd(6,12);st.ask={ans:st.len+' cm',o:shuffle([st.len+' cm',(st.len+1)+' cm',(st.len-1)+' cm']),ok:'Yes! '+st.len+' cm.'};txt='How long is the crayon?';}
      else if(r===1){st.start=3;st.len=7;st.ask={ans:'7 cm',o:shuffle(['7 cm','10 cm','3 cm']),ok:'Yes! From 3 to 10 is 7 cm.'};txt='The crayon starts at *3*. How long is it?';}
      else if(r===2){st.start=4;st.len=8;st.ask={ans:'8 cm',o:shuffle(['8 cm','12 cm','4 cm']),ok:'Yes! 12 − 4 = 8 cm.'};txt='This crayon starts at *4*. How long is it?';}
      else if(r===3){st.start=0;st.len=9;st.ask={ans:'100',o:shuffle(['100','10','1000']),ok:'Yes! 100 cm = 1 m.'};txt='How many *centimetres* are in *1 metre*?';}
      else{st.start=0;st.len=9;st.ask={ans:'Metres',o:['Centimetres','Metres'],ok:'Yes! A classroom is big: use metres.'};txt='Which unit would you use to measure a *classroom*?';}
      draw();st.setup=false;return txt;}};}
});

/* =========================================================
   27. How long does it take?
   ========================================================= */
P.lesson({id:'time2',title:'Seconds, minutes and hours',strand:'Spatial Sense',codes:['E2.4'],
 guide:{goal:'Use units of time, including seconds, minutes, hours and non-standard units, to describe the duration of events.',words:'second, minute, hour, duration, start, end, clock, how long',
  ask:['What takes about one second?','How many minutes are in one hour?','How long is it from 3:00 to 3:30?'],home:'Time how long it takes to brush your teeth, eat dinner and read a story. Seconds, minutes or hours?'},
 learn:[{say:'Watch the clock move.',speech:'The movie starts at three o’clock. The minute hand goes all the way around, and the hour hand moves to four. One hour has passed! One hour is sixty minutes.',view:'model',demo:'hour'},
        {say:'Read about units of time.',speech:'A clap takes about one second. Brushing your teeth takes about two minutes. A movie takes about two hours. Sixty seconds make a minute, and sixty minutes make an hour.',view:'read'},
        {say:'Watch: half an hour.',speech:'From three o’clock to three thirty, the minute hand goes halfway around. That is thirty minutes: half an hour.',view:'model',demo:'half'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: how long?',speech:'Your turn! Move the clock and find how long it took.',view:'model'}],
 fig:'A clock showing the start and end of an event.',rz:.35,
 explore:['Press *+5 minutes* or *+1 hour*.','The *gold* hand shows the start.','Read *how long* it has been.'],
 howTo:'Find the duration, then choose the answer.',
 init:k=>({start:180,now:180,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'*Duration* is how long something takes.')+16;
  [['about 1 second','a clap, a blink','#ff4f8b'],['about 1 minute','washing hands','#ff8a3d'],['a few minutes','brushing teeth','#ffc04d'],['about 1 hour','a soccer practice','#5fd38a'],['a few hours','a movie, a long drive','#2f7de1']].forEach(([a,b,c],i)=>{rr(g,X0,y+i*56,TW,48,12);g.fillStyle=tint(c,.2);g.fill();T(g,a,X0+18,y+i*56+32,FT.bodyB,INK);T(g,b,X0+300,y+i*56+32,FT.body);});y+=290;
  rr(g,X0,y,TW,70,16);g.fillStyle=tint(acc(),.12);g.fill();T(g,'60 seconds = 1 minute      60 minutes = 1 hour',X0+TW/2,y+44,FT.bodyB,acc(),'center');y+=92;
  y=keyWords(p,y,[['duration','how long something lasts'],['minute','60 seconds']]);
  predict(p,y,S,'p27','Recess is from 10:15 to 10:30. How long is it?','*15 minutes.*');},
 readout(p,S,y){const g=p.g,st=S.st;const f=m=>Math.floor(m/60)%12===0?12:Math.floor(m/60)%12;const t=m=>f(m)+':'+String(m%60).padStart(2,'0');const d=st.now-st.start;T(g,t(st.start)+' to '+t(st.now),X0,y+44,FT.bodyB);T(g,'Duration: '+(d>=60?Math.floor(d/60)+' h ':'')+(d%60||d<60?d%60+' min':''),X0,y+90,ZS(42),acc());return y+100;},
 build(S,grp,mode,game){const st=S.st;const g2=new THREE.Group();grp.add(g2);const face=mk(new THREE.CylinderGeometry(1.2,1.2,.08,48),lam('#ffffff'),20);face.position.set(-.6,.04,-1.9);grp.add(face);const rim=mk(new THREE.TorusGeometry(1.2,.05,8,48),lam('#2f7de1'),0);rim.rotation.x=Math.PI/2;rim.position.set(-.6,.09,-1.9);grp.add(rim);
  for(let h=1;h<=12;h++){const a=Math.PI/2-h*Math.PI/6;const l=label(String(h),{size:.18,color:INK});l.position.set(-.6+Math.cos(a)*.98,.12,-1.9-Math.sin(a)*.98);grp.add(l);}
  function hand(m,len,w,col,y){const a=Math.PI/2-m;const h=mk(new THREE.BoxGeometry(len,.03,w),lam(col),0);h.position.set(-.6+Math.cos(a)*len/2,y,-1.9-Math.sin(a)*len/2);h.rotation.y=a;return h;}
  function draw(){clearGroup(g2);const mm=st.now%60,hh=(st.now/60)%12;g2.add(hand(mm/60*Math.PI*2,1.0,.05,INK,.12));g2.add(hand(hh/12*Math.PI*2,.65,.08,INK,.14));const sm=st.start%60;g2.add(hand(sm/60*Math.PI*2,1.0,.03,'#f5b301',.11));
    const d=st.now-st.start;if(d>0&&d<60){const a0=Math.PI/2-st.start%60/60*Math.PI*2,a1=Math.PI/2-st.now%60/60*Math.PI*2;const w=mk(wedgeGeo(.9,.02,a1,a0),new THREE.MeshLambertMaterial({color:'#fde68a',transparent:true,opacity:.6}),0);w.position.set(-.6,.09,-1.9);g2.add(w);}
    const l=label((d>=60?Math.floor(d/60)+' h ':'')+(d%60||d<60?d%60+' min':''),{size:.3,bg:'#ffffff'});l.position.set(1.5,.8,-2.0);g2.add(l);A.redraw();}
  function adv(m){const from=st.now;const to=Math.min(st.start+180,st.now+m);if(to===from){A.bad('That is long enough!');return;}tween(.6,k=>{st.now=Math.round(from+(to-from)*k);draw();}).then(()=>{st.now=to;draw();A.pop();A.say((st.now-st.start)+' minutes');});}
  draw();
  return {info:()=>st.start+'/'+st.now,
    controls:()=>{const c=[{t:'+5 minutes',go:true,fn:()=>adv(5)},{t:'+15 minutes',fn:()=>adv(15)},{t:'+1 hour',fn:()=>adv(60)},{t:'Reset',fn:()=>{st.now=st.start;draw();}}];if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);return c;},
    demo(n){st.ask=null;st.start=180;st.now=180;draw();if(n==='hour')A.seq([[600,()=>adv(60)]]);if(n==='half')A.seq([[600,()=>adv(15)],[900,()=>adv(15)]]);},
    task(r){st.setup=true;st.start=180;st.now=180;let txt;
      if(r===0){st.now=210;st.ask={ans:'30 minutes',o:shuffle(['30 minutes','3 hours','30 seconds']),ok:'Yes! Half an hour.'};txt='The game started at *3:00* and ended at *3:30*. How long did it last?';}
      else if(r===1){st.start=600+15;st.now=630;st.ask={ans:'15 minutes',o:shuffle(['15 minutes','30 minutes','1 hour']),ok:'Yes! 10:15 to 10:30 is 15 minutes.'};txt='Recess is from *10:15* to *10:30*. How long is it?';}
      else if(r===2){st.ask={ans:'About 1 second',o:shuffle(['About 1 second','About 1 minute','About 1 hour']),ok:'Yes! A clap is very quick.'};txt='How long does *one clap* take?';}
      else if(r===3){st.ask={ans:'About 2 hours',o:shuffle(['About 2 hours','About 2 minutes','About 2 seconds']),ok:'Yes! Movies are long.'};txt='How long does a *movie* usually last?';}
      else{st.ask={ans:'60',o:shuffle(['60','100','12']),ok:'Yes! 60 minutes = 1 hour.'};txt='How many *minutes* are in *one hour*?';}
      draw();st.setup=false;return txt;}};}
});

/* =========================================================
   28. Many ways to show money
   ========================================================= */
const CN=[{t:'5¢',v:5,k:'c',r:.21,c:'#cbd5e1'},{t:'10¢',v:10,k:'c',r:.18,c:'#e2e8f0'},{t:'25¢',v:25,k:'c',r:.24,c:'#cbd5e1'},{t:'$1',v:100,k:'c',r:.26,c:'#eab308',sides:11},{t:'$2',v:200,k:'c',r:.28,c:'#cbd5e1',ring:'#eab308'},{t:'$5',v:500,k:'b',c:'#60a5fa'},{t:'$10',v:1000,k:'b',c:'#a78bfa'},{t:'$20',v:2000,k:'b',c:'#4ade80'},{t:'$50',v:5000,k:'b',c:'#f87171'},{t:'$100',v:10000,k:'b',c:'#d4a373'}];
const fmtM=c=>c<200&&c%100?c+'¢':'$'+(c/100).toFixed(c%100?2:0);
P.lesson({id:'money2',title:'Many ways to make money amounts',strand:'Financial Literacy',codes:['F1.1'],
 guide:{goal:'Identify different ways of representing the same amount of money up to 200¢ using coins, and up to $200 using $1 and $2 coins and $5, $10, $20, $50 and $100 bills.',words:'coin, bill, cents, dollars, value, total, same amount, different ways',
  ask:['How many quarters make one dollar?','Show 75¢ in two different ways.','What bills could make $35?'],home:'Play store with real or paper money. Pay for a $25 toy in two different ways.'},
 learn:[{say:'Count it up!',speech:'Let’s make seventy-five cents. Three quarters: twenty-five, fifty, seventy-five. Or use other coins: two quarters, two dimes and one nickel. That is also seventy-five cents. Same amount, different ways!',view:'model',demo:'cents'},
        {say:'Read about dollars.',speech:'One hundred cents is one dollar. Four quarters make one dollar, and a loonie is one dollar too. For bigger amounts, use bills: a twenty, a ten and a five make thirty-five dollars.',view:'read'},
        {say:'Watch: build $35.',speech:'Thirty-five dollars: a twenty-dollar bill, a ten-dollar bill and a five-dollar bill. Or seven five-dollar bills!',view:'model',demo:'dollars'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: make the amount!',speech:'Your turn! Tap coins and bills to make the amount.',view:'model'}],
 fig:'Coins and bills counted onto a tray.',rz:.35,
 explore:['*Tap a coin or bill* in the bank to add it.','Watch the *total*.','*Clear* to start again.'],
 howTo:'Make the exact amount.',
 init:k=>({tray:[2,2,2],need:null,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'The *same amount* of money can be shown in *different ways*.')+16;
  const coin=(x,yy,t,c)=>{g.beginPath();g.arc(x,yy,26,0,Math.PI*2);g.fillStyle=c;g.fill();g.strokeStyle='#94a3b8';g.lineWidth=2;g.stroke();T(g,t,x,yy+7,FT.smallB,INK,'center');};
  T(g,'75¢',X0,y+36,ZS(40),acc());[0,1,2].forEach(i=>coin(X0+150+i*62,y+26,'25¢','#cbd5e1'));T(g,'or',X0+360,y+34,FT.bodyB,GREY);['25¢','25¢','10¢','10¢','5¢'].forEach((t,i)=>coin(X0+420+i*62,y+26,t,'#e2e8f0'));y+=80;
  T(g,'$1',X0,y+36,ZS(40),acc());[0,1,2,3].forEach(i=>coin(X0+150+i*62,y+26,'25¢','#cbd5e1'));T(g,'or',X0+420,y+34,FT.bodyB,GREY);coin(X0+490,y+26,'$1','#eab308');y+=80;
  T(g,'$35',X0,y+40,ZS(40),acc());[['$20','#4ade80'],['$10','#a78bfa'],['$5','#60a5fa']].forEach(([t,c],i)=>{rr(g,X0+150+i*130,y,120,60,8);g.fillStyle=c;g.fill();T(g,t,X0+210+i*130,y+40,FT.bodyB,'#fff','center');});y+=90;
  y=keyWords(p,y,[['cent (¢)','100¢ = $1'],['total','the amount all together']]);
  predict(p,y,S,'p28','How many toonies make $10?','*5 toonies!*');},
 readout(p,S,y){const g=p.g,st=S.st;T(g,'Total: '+fmtM(total(st)),X0,y+58,ZS(56),acc());return y+72;},
 build(S,grp,mode,game){const st=S.st;const g2=new THREE.Group(),bank=new THREE.Group();grp.add(bank,g2);
  function piece(c){const g=new THREE.Group();if(c.k==='c'){const m=mk(new THREE.CylinderGeometry(c.r*.8,c.r*.8,.05,c.sides||28),lam(c.ring||c.c),20);g.add(m);if(c.ring){const i=mk(new THREE.CylinderGeometry(c.r*.5,c.r*.5,.055,24),lam('#cbd5e1'),0);g.add(i);}const l=label(c.t,{size:.13,color:INK});l.position.y=.06;g.add(l);}
    else{const b=mk(new THREE.BoxGeometry(.66,.02,.32),lam(c.c),20);g.add(b);const l=label(c.t,{size:.16,color:'#ffffff'});l.position.y=.04;g.add(l);}return g;}
  CN.forEach((c,i)=>{const p=piece(c);p.position.set(-2.0+(i%5)*.95,.04,-.65-Math.floor(i/5)*.48);p.traverse(o=>{if(o.isMesh)A.drag(o,{tap:()=>add(i)});});bank.add(p);});const bl=label('bank: tap to add',{size:.14,color:GREY});bl.position.set(1.9,.1,-.3);bank.add(bl);
  function draw(){clearGroup(g2);const tr=mk(new THREE.BoxGeometry(4.3,.03,1.6),lam('#fef3c7'),20);tr.position.set(0,.015,-2.4);g2.add(tr);st.tray.forEach((ci,k)=>{const p=piece(CN[ci]);p.position.set(-1.9+(k%8)*.52,.05+Math.floor(k/16)*.06,-2.9+Math.floor((k%16)/8)*.55);g2.add(p);p.traverse(o=>{if(o.isMesh)A.drag(o,{tap:()=>rem(k)});});});
    const l=label('Total: '+fmtM(total(st)),{size:.3,bg:'#ffffff'});l.position.set(0,.9,-2.9);g2.add(l);A.redraw();}
  function add(i){if(st.tray.length>=24){A.bad('The tray is full!');return;}st.tray.push(i);A.pop();draw();A.say(fmtM(total(st)));check();}
  function rem(k){st.tray.splice(k,1);A.pop();draw();check();}
  function check(){if(mode==='play'&&!st.setup&&st.need&&st.need(st))game.solved(st.needOk(st));}
  draw();
  return {info:()=>fmtM(total(st)),
    controls:()=>{const c=[{t:'Undo',fn:()=>{st.tray.pop();draw();}},{t:'Clear',go:true,fn:()=>{st.tray=[];draw();}}];if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);return c;},
    demo(n){st.ask=null;st.need=null;st.tray=[];draw();if(n==='cents')A.seq([[500,()=>add(2)],[400,()=>add(2)],[400,()=>add(2)],[900,()=>{st.tray=[];draw();}],[400,()=>add(2)],[300,()=>add(2)],[300,()=>add(1)],[300,()=>add(1)],[300,()=>add(0)]]);
      if(n==='dollars')A.seq([[500,()=>add(7)],[400,()=>add(6)],[400,()=>add(5)]]);},
    task(r){st.setup=true;st.ask=null;st.need=null;st.tray=[];let txt;
      if(r===0){st.need=s=>total(s)===75;st.needOk=s=>'Yes! '+s.tray.length+' coins make 75¢.';txt='Make *75¢* with coins.';}
      else if(r===1){st.need=s=>total(s)===100&&s.tray.every(i=>i<3);st.needOk=()=>'Yes! Small coins can make $1 too.';txt='Make *$1* using only *5¢, 10¢ and 25¢* coins.';}
      else if(r===2){st.need=s=>total(s)===3500;st.needOk=()=>'Yes! $35!';txt='Make *$35* with bills.';}
      else if(r===3){st.need=s=>total(s)===18000;st.needOk=()=>'Yes! $180!';txt='Make *$180*. (Try the big bills!)';}
      else{st.ask={ans:'4',o:shuffle(['4','10','2']),ok:'Yes! 25 + 25 + 25 + 25 = 100¢.'};txt='How many *quarters* make *$1*?';}
      draw();st.setup=false;return txt;}};}
});
function total(st){return st.tray.reduce((a,i)=>a+CN[i].v,0);}
})();
