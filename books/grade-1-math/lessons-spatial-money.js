/* The Interactive Classroom: Grade 1 Math — Spatial Sense (19–23) and Financial Literacy (24) */
(function(){
"use strict";
const P=window.PM;if(!P||P.failed||!P.THREE)return;
const {THREE,V,W,D,PY,PX,X0,TW,INK,RED,BLUE,GREY,VIBE,FT,ZS,G,M,lam,mk,unitBox,cellMat,label,starGeo,wedgeGeo,clearGroup,disposeObj,rr,T,wrap,para,header,keyWords,predict,box,caption,cxOf,cyOf,tint,moveTo,hop,tween,burst,easeOut,easeIO,A}=P;
const acc=()=>P.ACC;
const rnd=(a,b)=>a+Math.floor(Math.random()*(b-a+1)),pick=a=>a[Math.floor(Math.random()*a.length)],shuffle=a=>a.slice().sort(()=>Math.random()-.5);
function choices(game,list,ans,ok,lab){return list.map(o=>({t:lab?lab(o):String(o),big:true,fn:()=>{if(o===ans){if(game)game.solved(ok);else A.good(ok);}else A.bad('Not quite. Try again!');}}));}
const COL=['#ff6b35','#ff8a3d','#ffc04d','#5fd38a','#2f7de1','#8b5cf6'];

/* =========================================================
   19. Shapes and solids
   ========================================================= */
const SOL=[{k:'sphere',n:'sphere',roll:true,stack:false,face:'none',col:'#ff6b35'},{k:'cube',n:'cube',roll:false,stack:true,face:'square',col:'#2f7de1'},{k:'cylinder',n:'cylinder',roll:true,stack:true,face:'circle',col:'#5fd38a'},{k:'cone',n:'cone',roll:true,stack:false,face:'circle',col:'#ffc04d'},{k:'prism',n:'rectangular prism',roll:false,stack:true,face:'rectangle',col:'#8b5cf6'}];
function solid(k,c,s){s=s||1;let geo;if(k==='sphere')geo=new THREE.SphereGeometry(.24*s,22,16);else if(k==='cube')geo=new THREE.BoxGeometry(.42*s,.42*s,.42*s);else if(k==='cylinder')geo=new THREE.CylinderGeometry(.21*s,.21*s,.46*s,26);else if(k==='cone')geo=new THREE.ConeGeometry(.24*s,.5*s,26);else geo=new THREE.BoxGeometry(.6*s,.32*s,.36*s);
  geo.computeBoundingBox();const m=mk(geo,lam(c),20);m.position.y=-geo.boundingBox.min.y;const g=new THREE.Group();g.add(m);return g;}
P.lesson({id:'shapes1',title:'Shapes and solids',strand:'Spatial Sense',codes:['E1.1','E1.2'],
 guide:{goal:'Sort three-dimensional objects and two-dimensional shapes by one attribute and identify the sorting rule, and construct 3D objects and find 2D shapes in structures.',words:'sphere, cube, cylinder, cone, rectangular prism, circle, square, triangle, rectangle, roll, stack, face',
  ask:['Which solids can roll?','What flat shape is on the end of a cylinder?','What solids did you use to build your castle?'],home:'Find solids at home: a ball (sphere), a can (cylinder), a box (prism). Which ones roll? Which ones stack?'},
 learn:[{say:'Meet the solids!',speech:'Kai has five solids: a sphere, a cube, a cylinder, a cone and a rectangular prism. Watch each one. Some can roll, and some can stack!',view:'model',demo:'tour'},
        {say:'Read about faces.',speech:'A flat side of a solid is called a face. A cube has square faces. A cylinder has circle faces on its ends. A rectangular prism has rectangle faces.',view:'read'},
        {say:'Watch: build a castle.',speech:'Let’s build a castle! Cubes and prisms make the walls. Cylinders make the towers. Cones make the roofs. Can you see the shapes?',view:'model',demo:'castle'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: tap the solids!',speech:'Your turn! Tap a solid to see if it rolls or stacks, and see its face.',view:'model'}],
 fig:'Five solids on a shelf, and a castle built from them.',rz:.35,
 explore:['*Tap a solid* to roll it or stack it.','See its *face* stamp.','Press *Build a castle*.'],
 howTo:'Tap the solid the question asks for, or choose the answer.',
 init:k=>({sel:-1,castle:false,want:null,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'*Solids* are 3D. *Flat shapes* are 2D. Solids have flat shapes on their *faces*.')+16;
  const s2=[['circle',x=>{g.beginPath();g.arc(x,y+50,40,0,Math.PI*2);g.fill();}],['triangle',x=>{g.beginPath();g.moveTo(x,y+8);g.lineTo(x+44,y+90);g.lineTo(x-44,y+90);g.closePath();g.fill();}],['square',x=>g.fillRect(x-40,y+10,80,80)],['rectangle',x=>g.fillRect(x-60,y+22,120,64)]];
  s2.forEach(([n,f],i)=>{g.fillStyle=COL[i+1];f(X0+90+i*210);T(g,n,X0+90+i*210,y+126,FT.bodyB,INK,'center');});y+=160;
  rr(g,X0,y,TW,44,12);g.fillStyle=tint(acc(),.16);g.fill();['Solid','Rolls?','Stacks?','Face'].forEach((h,i)=>T(g,h,X0+16+i*TW/4,y+30,FT.smallB,acc()));y+=48;
  SOL.forEach((s,j)=>{[s.n,s.roll?'yes':'no',s.stack?'yes':'no',s.face].forEach((v,i)=>T(g,v,X0+16+i*TW/4,y+j*38+28,i?FT.body:FT.bodyB,i?INK:s.col));});y+=200;
  y=keyWords(p,y,[['solid','a 3D shape, like a ball or a box'],['face','a flat side of a solid']]);
  predict(p,y,S,'p19','Which solid looks like an ice-cream cone?','*A cone!*');},
 readout(p,S,y){const g=p.g,st=S.st;if(st.sel<0){T(g,st.castle?'A castle of solids!':'Tap a solid!',X0,y+52,ZS(44),acc());return y+66;}const s=SOL[st.sel];T(g,s.n[0].toUpperCase()+s.n.slice(1),X0,y+48,ZS(44),s.col);T(g,(s.roll?'rolls':'does not roll')+' · '+(s.stack?'stacks':'does not stack')+' · face: '+s.face,X0,y+90,FT.bodyB);return y+98;},
 build(S,grp,mode,game){const st=S.st;const g2=new THREE.Group();grp.add(g2);const fx=new THREE.Group();grp.add(fx);g2.position.z=.45;fx.position.z=.45;
  function draw(){clearGroup(g2);clearGroup(fx);if(st.castle){castle();A.redraw();return;}SOL.forEach((s,i)=>{const x=-1.8+i*.9;const o=solid(s.k,s.col);o.position.set(x,.02,-2.3);g2.add(o);o.traverse(m=>{if(m.isMesh)A.drag(m,{tap:()=>tap(i,o)});});const pad=mk(new THREE.CylinderGeometry(.36,.36,.03,24),lam('#f1f5f9'),20);pad.position.set(x,.015,-2.3);g2.add(pad);A.drag(pad,{tap:()=>tap(i,o)});
      const l=label(s.k==='prism'?'prism':s.n,{size:.15,color:GREY});l.position.set(x,.08,-1.82);g2.add(l);});A.redraw();}
  function castle(){const parts=[['cube','#60a5fa',-.6,0,-2.3],['cube','#60a5fa',.6,0,-2.3],['prism','#a78bfa',0,0,-2.3],['cylinder','#4ade80',-1.3,0,-2.3],['cylinder','#4ade80',1.3,0,-2.3],['cone','#fbbf24',-1.3,.46,-2.3],['cone','#fbbf24',1.3,.46,-2.3],['prism','#a78bfa',0,.32,-2.3],['cone','#fbbf24',0,.64,-2.3]];
    parts.forEach(([k,c,x,y,z],i)=>{const o=solid(k,c,1);o.position.set(x,y+.02+2,z);g2.add(o);A.later(()=>tween(.5,t=>{o.position.y=y+.02+2*(1-easeOutF(t));}).then(()=>{if(i===parts.length-1){A.pop();A.say('Ta-da! A castle!');}}),i*220);o.traverse(m=>{if(m.isMesh)A.drag(m,{tap:()=>{const si=SOL.findIndex(s=>s.k===k);st.sel=si;A.say(SOL[si].n);A.redraw();if(mode==='play'&&!st.setup&&st.want){if(st.want(si))game.solved(st.wantOk);else A.bad('Look again!');}}});});});}
  function tap(i,o){st.sel=i;A.pop();clearGroup(fx);const s=SOL[i];const x=o.position.x;
    if(s.roll){tween(.8,t=>{o.position.z=-2.3+Math.sin(t*Math.PI)*.5;o.rotation.x=t*Math.PI*2*(s.k==='sphere'?1:0);if(s.k!=='sphere')o.rotation.z=0;}).then(()=>{o.position.z=-2.3;o.rotation.set(0,0,0);});}
    if(s.stack){const top=solid(s.k,tint(s.col,.35));top.position.set(x,2,-2.3);fx.add(top);const h=s.k==='cube'?.42:s.k==='cylinder'?.46:.32;tween(.5,t=>{top.position.y=2-(2-h-.02)*easeOutF(t);});}
    if(s.face!=='none'){const geo=s.face==='circle'?new THREE.CylinderGeometry(.18,.18,.02,26):s.face==='square'?new THREE.BoxGeometry(.36,.02,.36):new THREE.BoxGeometry(.5,.02,.28);const st2=mk(geo,lam(s.col),0);st2.position.set(x,.03,-1.2);fx.add(st2);const fl=label(s.face,{size:.14,color:INK});fl.position.set(x,.1,-.85);fx.add(fl);}
    A.say(s.n+(s.roll?' rolls':'')+(s.roll&&s.stack?' and':'')+(s.stack?' stacks':''));A.redraw();
    if(mode==='play'&&!st.setup&&st.want){if(st.want(i))game.solved(st.wantOk);else A.bad('Try a different solid!');}}
  draw();
  return {info:()=>st.sel<0?'none':SOL[st.sel].n,
    controls:()=>{const c=[{t:st.castle?'Show solids':'Build a castle',go:true,fn:()=>{st.castle=!st.castle;st.sel=-1;draw();}}];if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);return c;},
    demo(n){st.ask=null;st.want=null;st.sel=-1;if(n==='solids'){st.castle=false;draw();}if(n==='tour'){st.castle=false;draw();A.seq(SOL.map((s,i)=>[800,()=>{st.sel=i;A.say(s.n);A.redraw();}]));}if(n==='castle'){st.castle=true;draw();}},
    task(r){st.setup=true;st.ask=null;st.want=null;st.sel=-1;st.castle=false;let txt;
      if(r===0){st.want=i=>i===1;st.wantOk='Yes! That is a cube.';txt='Tap the *cube*.';}
      else if(r===1){st.want=i=>i===0;st.wantOk='Yes! A sphere rolls every way.';txt='Tap the solid that is *round all over*: it can *only roll*.';}
      else if(r===2){st.want=i=>i===4;st.wantOk='Yes! A rectangular prism has rectangle faces, like a box.';txt='Tap the solid that looks like a *cereal box*.';}
      else if(r===3){st.ask={ans:'Circle',o:shuffle(['Circle','Square','Triangle']),ok:'Yes! The ends of a cylinder are circles.'};txt='What *flat shape* is on the end of a *cylinder*?';}
      else{st.castle=true;st.ask={ans:'Cones',o:shuffle(['Cones','Cubes','Spheres']),ok:'Yes! Cones make pointy roofs.'};txt='What solids are the castle’s *pointy roofs*?';}
      draw();st.setup=false;return txt;}};}
});
const easeOutF=k=>1-Math.pow(1-k,3);

/* =========================================================
   20. Matching halves
   ========================================================= */
const PATS=[[[0,1,1],[1,1,1],[0,1,1],[0,0,1]],[[1,0,0],[1,1,0],[1,1,1],[1,1,0]],[[0,0,1],[0,1,1],[1,1,1],[0,1,0]],[[1,1,1],[0,1,0],[0,1,1],[1,1,1]]];
P.lesson({id:'mirror1',title:'Matching halves',strand:'Spatial Sense',codes:['E1.3'],
 guide:{goal:'Construct and describe two-dimensional shapes and three-dimensional objects that have matching halves.',words:'matching halves, line of symmetry, fold, mirror, same',
  ask:['How do you know the two halves match?','Where is the fold line on a heart?','Can a 3D object have matching halves?'],home:'Fold a paper in half and cut a shape along the fold. Open it: are the halves the same?'},
 learn:[{say:'Make it match!',speech:'Zara’s picture has a fold line in the middle. The left side is done. Let’s fill in the right side so both halves match, like a mirror. Now fold it: the halves fit perfectly!',view:'model',demo:'fill'},
        {say:'Read about matching halves.',speech:'A shape has matching halves if you can fold it so both sides fit on top of each other. A heart, a butterfly and a square all have matching halves.',view:'read'},
        {say:'Watch: fold to check.',speech:'Fold the picture along the line. If every coloured square lands on a coloured square, the halves match!',view:'model',demo:'fold'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: finish the picture!',speech:'Your turn! Tap the squares on the right side to make the halves match.',view:'model'}],
 fig:'A tile picture with a fold line in the middle.',rz:.35,
 explore:['*Tap a square* on the right to colour it.','Press *Fold* to check.','Press *New picture*.'],
 howTo:'Finish the right half so it matches the left half.',
 init:k=>({pi:0,R:[[0,0,0],[0,0,0],[0,0,0],[0,0,0]],fold:0,need:false,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'A shape has *matching halves* when both sides are the *same*, like a mirror.')+16;
  g.fillStyle='#ff6b35';g.beginPath();g.moveTo(X0+150,y+220);g.bezierCurveTo(X0+20,y+130,X0+40,y+20,X0+150,y+70);g.bezierCurveTo(X0+260,y+20,X0+280,y+130,X0+150,y+220);g.fill();g.setLineDash([10,8]);g.strokeStyle=INK;g.lineWidth=4;g.beginPath();g.moveTo(X0+150,y+20);g.lineTo(X0+150,y+240);g.stroke();g.setLineDash([]);
  const s=40;for(let r=0;r<4;r++)for(let c=0;c<6;c++){const on=c<3?PATS[0][r][c]:PATS[0][r][5-c];g.fillStyle=on?'#2f7de1':'#f1f5f9';g.fillRect(X0+380+c*s,y+40+r*s,s-3,s-3);}g.setLineDash([8,6]);g.strokeStyle=INK;g.beginPath();g.moveTo(X0+380+3*s-1.5,y+20);g.lineTo(X0+380+3*s-1.5,y+220);g.stroke();g.setLineDash([]);y+=270;
  y=para(p,y,'The dashed *fold line* splits the shape into two matching halves.')+10;
  y=keyWords(p,y,[['matching halves','two sides that are the same'],['fold line','where you fold to check']]);
  predict(p,y,S,'p20','Does the letter A have matching halves?','*Yes!* Fold it down the middle.');},
 readout(p,S,y){const g=p.g,st=S.st,ok=match(st);T(g,ok?'The halves match!':'Make the right side match.',X0,y+52,ZS(42),ok?'#16a36f':acc());return y+66;},
 build(S,grp,mode,game){const st=S.st,c=.46,z0=-2.85;const g2=new THREE.Group(),flap=new THREE.Group();grp.add(g2);flap.position.set(0,.03,0);grp.add(flap);
  const line=mk(new THREE.BoxGeometry(.04,.06,4*c+.2),lam(INK),0);line.position.set(0,.06,z0+1.5*c);grp.add(line);
  function draw(){clearGroup(g2);clearGroup(flap);const L=PATS[st.pi];for(let r=0;r<4;r++)for(let k=0;k<3;k++){const on=L[r][k];const t=mk(G('g1mt',()=>new THREE.BoxGeometry(c*.94,.06,c*.94)),lam(on?'#2f7de1':'#f8fafc'),20);t.position.set(-(3-k-.5)*c,.03,z0+r*c);flap.add(t);
      const on2=st.R[r][k];const t2=mk(G('g1mt',()=>new THREE.BoxGeometry(c*.94,.06,c*.94)),lam(on2?'#ff6b35':'#f8fafc'),20);t2.position.set((k+.5)*c,.03,z0+r*c);g2.add(t2);A.drag(t2,{tap:()=>tog(r,k)});}
    flap.rotation.z=-st.fold*Math.PI;A.redraw();}
  function tog(r,k){if(st.fold)return;st.R[r][k]=st.R[r][k]?0:1;A.pop();draw();if(mode==='play'&&!st.setup&&st.need&&match(st))game.solved('The halves match! Beautiful!');}
  function fold(){const f0=st.fold,f1=f0?0:1;tween(.9,t=>{st.fold=f0+(f1-f0)*t;flap.rotation.z=-st.fold*Math.PI;}).then(()=>{A.pop();if(f1)A.say(match(st)?'They match!':'Not yet: some squares do not match.');A.redraw();});}
  draw();
  return {info:()=>match(st)?'match':'no',
    controls:()=>{const c=[{t:st.fold?'Unfold':'Fold',go:true,fn:fold},{t:'Clear',fn:()=>{st.R=[[0,0,0],[0,0,0],[0,0,0],[0,0,0]];st.fold=0;draw();}},{t:'New picture',fn:()=>{st.pi=(st.pi+1)%PATS.length;st.R=[[0,0,0],[0,0,0],[0,0,0],[0,0,0]];st.fold=0;draw();}}];if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c.slice(0,1));return c;},
    demo(n){st.ask=null;st.need=false;st.fold=0;st.pi=0;st.R=[[0,0,0],[0,0,0],[0,0,0],[0,0,0]];draw();if(n==='fill'){const L=PATS[0],s=[];for(let r=0;r<4;r++)for(let k=0;k<3;k++)if(L[r][2-k])s.push([250,()=>{st.R[r][k]=1;draw();A.pop();}]);A.seq(s);}
      if(n==='fold'){st.R=PATS[0].map(row=>row.slice().reverse());draw();A.seq([[600,fold]]);}},
    task(r){st.setup=true;st.ask=null;st.need=false;st.fold=0;st.R=[[0,0,0],[0,0,0],[0,0,0],[0,0,0]];let txt;
      if(r<3){st.pi=[1,2,3][r];st.need=true;txt='Tap squares on the *right* so the halves *match*.';}
      else if(r===3){st.pi=0;st.R=PATS[0].map(row=>row.slice().reverse());st.R[0][0]=1-st.R[0][0];st.ask={ans:'No',o:['Yes','No'],ok:'Right! One square does not match. Fold to see.'};txt='Do these halves *match*? Fold to check!';}
      else{st.pi=0;st.ask={ans:'A heart',o:shuffle(['A heart','The letter F','The number 7']),ok:'Yes! A heart folds into matching halves.'};txt='Which one has *matching halves*?';}
      draw();st.setup=false;return txt;}};}
});
function match(st){const L=PATS[st.pi];for(let r=0;r<4;r++)for(let k=0;k<3;k++)if(L[r][2-k]!==st.R[r][k])return false;return true;}

/* =========================================================
   21. Where is it? Positions and directions
   ========================================================= */
const POS={on:[0,.62,0],under:[0,.12,0],beside:[.95,.12,0],front:[0,.12,.75],behind:[0,.12,-.75]};const PN={on:'on',under:'under',beside:'beside',front:'in front of',behind:'behind'};
P.lesson({id:'where1',title:'Where is it?',strand:'Spatial Sense',codes:['E1.4','E1.5'],
 guide:{goal:'Describe the relative locations of objects or people using positional language, and give and follow directions for moving from one location to another.',words:'on, under, beside, in front of, behind, between, left, right, forward, turn',
  ask:['Where is the ball: on or under the table?','What is beside the chair?','How do you get from the door to the table?'],home:'Play “Where is teddy?” Hide a toy and give clues: under, behind, beside…'},
 learn:[{say:'Where is the ball?',speech:'Watch Leo’s ball move around the table. The ball is on the table. Now it is under the table. Now it is beside the table. Now in front of the table, and now behind the table!',view:'model',demo:'tour'},
        {say:'Read the position words.',speech:'Position words tell where things are: on, under, beside, in front of, behind and between. Direction words tell how to move: forward, back, left and right.',view:'read'},
        {say:'Watch: follow the directions.',speech:'The ladybug follows directions: two steps forward, then one step right. It reaches the flower!',view:'model',demo:'bug'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: move the ball!',speech:'Your turn! Put the ball where the question says.',view:'model'}],
 fig:'A table, a chair and a ball in a playroom.',rz:.35,
 explore:['Put the ball *on*, *under*, *beside*, *in front of* or *behind* the table.','Move the *ladybug* to the flower.','Say where things are!'],
 howTo:'Move the ball or the ladybug to the right place.',
 init:k=>({at:'on',bug:[0,0],need:null,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'*Position words* tell where something is.')+16;
  const tb=(x,yy)=>{g.fillStyle='#b45309';g.fillRect(x-60,yy,120,14);g.fillRect(x-54,yy+14,10,60);g.fillRect(x+44,yy+14,10,60);};
  [['on',0,-22],['under',0,52],['beside',100,52]].forEach(([t,dx,dy],i)=>{const x=X0+110+i*270;tb(x,y+60);g.beginPath();g.arc(x+dx,y+60+dy,18,0,Math.PI*2);g.fillStyle='#ff6b35';g.fill();T(g,t,x,y+170,FT.bodyB,acc(),'center');});y+=200;
  [['in front of','closer to you'],['behind','on the far side'],['between','in the middle of two things']].forEach(([a,b],i)=>{T(g,a,X0+20,y+i*46+30,FT.bodyB,acc());T(g,b,X0+260,y+i*46+30,FT.body);});y+=164;
  y=para(p,y,'*Directions:* 2 steps forward, then 1 step right.')+10;
  y=keyWords(p,y,[['position','where something is'],['direction','which way to move']]);
  predict(p,y,S,'p21','You stand between two friends. Where are you?','*In the middle!*');},
 readout(p,S,y){const g=p.g,st=S.st;T(g,'The ball is '+PN[st.at]+' the table.',X0,y+52,ZS(40),acc());return y+66;},
 build(S,grp,mode,game){const st=S.st;const g2=new THREE.Group();grp.add(g2);const tc=V(-.7,0,-2.1);
  const top=mk(new THREE.BoxGeometry(1.2,.08,.8),lam('#d97706'),20);top.position.set(tc.x,.5,tc.z);grp.add(top);[[-1,-1],[1,-1],[-1,1],[1,1]].forEach(([a,b])=>{const l=mk(new THREE.BoxGeometry(.07,.48,.07),lam('#b45309'),0);l.position.set(tc.x+a*.52,.24,tc.z+b*.32);grp.add(l);});
  const chair=new THREE.Group();const seat=mk(new THREE.BoxGeometry(.4,.06,.4),lam('#2f7de1'),20);seat.position.y=.3;chair.add(seat);const back=mk(new THREE.BoxGeometry(.4,.4,.06),lam('#2f7de1'),20);back.position.set(0,.5,-.17);chair.add(back);[[-1,-1],[1,-1],[-1,1],[1,1]].forEach(([a,b])=>{const l=mk(new THREE.BoxGeometry(.05,.3,.05),lam('#1d4ed8'),0);l.position.set(a*.17,.15,b*.17);chair.add(l);});chair.position.set(-2.0,0,-1.4);grp.add(chair);
  const ted=new THREE.Group();const tb2=mk(new THREE.SphereGeometry(.13,14,10),lam('#a16207'),0);tb2.position.y=.13;ted.add(tb2);const th=mk(new THREE.SphereGeometry(.09,12,10),lam('#a16207'),0);th.position.y=.3;ted.add(th);ted.position.set(-2.0,.33,-1.4);grp.add(ted);
  const ball=mk(new THREE.SphereGeometry(.12,18,14),lam('#ff6b35'),0);grp.add(ball);
  const gridO=V(.9,0,-.9),c=.42;for(let i=0;i<3;i++)for(let j=0;j<4;j++){const t=mk(G('g1wt',()=>new THREE.BoxGeometry(c*.94,.03,c*.94)),lam((i+j)%2?'#dcfce7':'#f0fdf4'),20);t.position.set(gridO.x+i*c,.015,gridO.z-j*c);grp.add(t);}
  const fl=new THREE.Group();const fs=mk(new THREE.CylinderGeometry(.015,.015,.3,6),lam('#16a34a'),0);fs.position.y=.15;fl.add(fs);for(let k=0;k<5;k++){const pt=mk(G('g1pt',()=>new THREE.SphereGeometry(.05,8,6)),lam('#fb923c'),0);pt.position.set(Math.cos(k*1.256)*.07,.32,Math.sin(k*1.256)*.07);fl.add(pt);}fl.position.set(gridO.x+1*c,0,gridO.z-3*c);g2.add(fl);
  const bug=new THREE.Group();const bb=mk(new THREE.SphereGeometry(.1,14,10,0,Math.PI*2,0,Math.PI/2),lam('#ef4444'),0);bug.add(bb);[[.04,.04],[-.04,-.03],[.03,-.05]].forEach(([x,z])=>{const d=mk(G('g1dot',()=>new THREE.SphereGeometry(.02,6,5)),lam(INK),0);d.position.set(x,.08,z);bug.add(d);});grp.add(bug);
  function placeBall(){const p0=POS[st.at];ball.position.set(tc.x+p0[0],p0[1],tc.z+p0[2]);}
  function placeBug(){bug.position.set(gridO.x+st.bug[0]*c,.04,gridO.z-st.bug[1]*c);}
  function put(k){st.at=k;const p0=POS[k];A.pop();hop(ball,V(tc.x+p0[0],p0[1],tc.z+p0[2]),.5,.45).then(()=>{A.say('The ball is '+PN[k]+' the table.');A.redraw();if(mode==='play'&&!st.setup&&st.need===k)game.solved('Yes! The ball is '+PN[k]+' the table.');});}
  function step(d,name){const n=[st.bug[0]+d[0],st.bug[1]+d[1]];if(n[0]<0||n[0]>2||n[1]<0||n[1]>3){A.bad('Oops, off the path!');return;}st.bug=n;A.pop();hop(bug,V(gridO.x+n[0]*c,.04,gridO.z-n[1]*c),.2,.3).then(()=>{A.say(name);A.redraw();if(mode==='play'&&!st.setup&&st.need==='flower'&&n[0]===1&&n[1]===3)game.solved('The ladybug reached the flower!');});}
  placeBall();placeBug();
  return {info:()=>st.at+' '+st.bug.join(','),
    controls:()=>{const c=Object.keys(POS).map(k=>({t:PN[k],on:st.at===k,fn:()=>put(k)})).concat([{t:'bug forward',go:true,fn:()=>step([0,1],'forward')},{t:'bug back',fn:()=>step([0,-1],'back')},{t:'bug left',fn:()=>step([-1,0],'left')},{t:'bug right',fn:()=>step([1,0],'right')}]);if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok);return c;},
    demo(n){st.ask=null;st.need=null;if(n==='home'){st.at='on';placeBall();}if(POS[n])put(n);if(n==='tour'){st.at='on';placeBall();A.seq(['under','beside','front','behind','on'].map(k=>[1100,()=>put(k)]));}if(n==='bug'){st.bug=[0,1];placeBug();A.seq([[700,()=>step([0,1],'forward')],[700,()=>step([0,1],'forward')],[700,()=>step([1,0],'right')]]);}},
    task(r){st.setup=true;st.ask=null;st.need=null;st.at='beside';st.bug=[0,0];let txt;
      if(r<3){st.need=['under','behind','front'][r];st.at=r===0?'on':'beside';txt='Put the ball *'+PN[st.need]+'* the table.';}
      else if(r===3){st.need='flower';st.bug=[0,0];txt='Move the *ladybug* to the *flower*.';}
      else{st.ask={ans:'On the chair',o:shuffle(['On the chair','Under the table','Behind the flower']),ok:'Yes! The teddy is on the chair.'};txt='Where is the *teddy bear*?';}
      placeBall();placeBug();st.setup=false;return txt;}};}
});

/* =========================================================
   22. Comparing length, mass, capacity and area
   ========================================================= */
P.lesson({id:'measure1',title:'Longer, heavier, holds more',strand:'Spatial Sense',codes:['E2.1','E2.2'],
 guide:{goal:'Identify measurable attributes such as length, area, mass, capacity and angle, and compare and order everyday objects by length, area, mass and capacity.',words:'long, longer, longest, short, heavy, heavier, light, holds more, covers more, area, capacity, mass',
  ask:['How can you tell which pencil is longer?','What does a balance show?','Which cup holds more water?'],home:'Line up 3 spoons from shortest to longest. Which toy is heavier? Which cup holds more?'},
 learn:[{say:'Compare the lengths.',speech:'Amara lines up the pencils at the same starting line. The green pencil is the longest. The yellow one is the shortest. Now they are in order!',view:'model',demo:'len'},
        {say:'Read about measuring.',speech:'We can measure how long something is: its length. How heavy it is: its mass. How much it holds: its capacity. And how much space it covers: its area.',view:'read'},
        {say:'Watch: the balance.',speech:'Put a toy on each side of the balance. The heavier side goes down. The apple is heavier than the feather!',view:'model',demo:'mass'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: compare!',speech:'Your turn! Choose length, mass, capacity or area, and compare.',view:'model'}],
 fig:'Pencils, a balance, cups and tiles to compare.',rz:.35,
 explore:['Choose *Length*, *Mass*, *Capacity* or *Area*.','*Tap an object* to choose it.','Line up, weigh, pour or cover!'],
 howTo:'Tap the object that the question asks for.',
 init:k=>({m:'len',L:[3,5,2],ord:false,ms:[2,1],want:null,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'We can *compare* things by measuring.')+16;
  [['#2f7de1',500],['#5fd38a',380],['#ffc04d',240]].forEach(([c,w],i)=>{g.fillStyle=c;g.fillRect(X0+40,y+i*40,w,24);g.beginPath();g.moveTo(X0+40+w,y+i*40);g.lineTo(X0+70+w,y+i*40+12);g.lineTo(X0+40+w,y+i*40+24);g.fill();});g.strokeStyle=RED;g.lineWidth=3;g.beginPath();g.moveTo(X0+38,y-10);g.lineTo(X0+38,y+120);g.stroke();T(g,'start line',X0+40,y+146,FT.small,RED);y+=170;
  [['Length','How long?','longer, shorter'],['Mass','How heavy?','heavier, lighter'],['Capacity','How much does it hold?','holds more, holds less'],['Area','How much does it cover?','covers more, covers less']].forEach(([a,b,c],i)=>{rr(g,X0,y+i*62,TW,54,14);g.fillStyle=tint(COL[i+1],.18);g.fill();T(g,a,X0+18,y+i*62+36,FT.bodyB,INK);T(g,b,X0+180,y+i*62+36,FT.body);T(g,c,X0+TW-18,y+i*62+36,FT.small,GREY,'right');});y+=262;
  y=keyWords(p,y,[['length','how long something is'],['capacity','how much something holds']]);
  predict(p,y,S,'p22','A bathtub and a cup: which holds more?','*The bathtub!*');},
 readout(p,S,y){const g=p.g,st=S.st;T(g,{len:'Length: which is longest?',mass:'Mass: which is heavier?',cap:'Capacity: which holds more?',area:'Area: which covers more?'}[st.m],X0,y+52,ZS(38),acc());return y+66;},
 build(S,grp,mode,game){const st=S.st;const g2=new THREE.Group();grp.add(g2);let tilt=0,cur=0,arm=null;
  function tapX(i){A.pop();if(mode==='play'&&!st.setup&&st.want){if(st.want(i))game.solved(st.wantOk);else A.bad('Compare again!');}}
  function pencil(L,col,x,z,i){const g=new THREE.Group();const b=mk(new THREE.CylinderGeometry(.06,.06,L,6),lam(col),0);b.rotation.z=Math.PI/2;b.position.x=L/2;g.add(b);const tip=mk(new THREE.ConeGeometry(.06,.16,6),lam('#f5deb3'),0);tip.rotation.z=-Math.PI/2;tip.position.x=L+.08;g.add(tip);g.position.set(x,.08,z);g.traverse(o=>{if(o.isMesh)A.drag(o,{tap:()=>tapX(i)});});return g;}
  function draw(){clearGroup(g2);arm=null;const cols=['#2f7de1','#5fd38a','#ffc04d'];
    if(st.m==='len'){const sl=mk(new THREE.BoxGeometry(.04,.04,2.2),lam(RED),0);sl.position.set(-1.9,.04,-2.0);g2.add(sl);st.L.forEach((L,i)=>{const z=-2.8+i*.7;const off=st.ord?0:[.4,-.1,.7][i];g2.add(pencil(L*.6,cols[i],-1.9+off,z,i));});}
    else if(st.m==='mass'){const post=mk(new THREE.CylinderGeometry(.05,.07,1.0,12),lam('#64748b'),0);post.position.set(0,.5,-2.1);g2.add(post);const a=st.ms[0],b=st.ms[1];tilt=Math.max(-.25,Math.min(.25,(b-a)*.12));arm=new THREE.Group();arm.position.set(0,1.02,-2.1);arm.rotation.z=-cur;g2.add(arm);arm.add(mk(new THREE.BoxGeometry(3.0,.06,.1),lam('#475569'),0));
      [[-1.2,0],[1.2,1]].forEach(([x,i])=>{const pan=new THREE.Group();pan.position.set(x,-.55,0);arm.add(pan);pan.add(mk(new THREE.CylinderGeometry(.5,.5,.04,24),lam('#cbd5e1'),20));const items=[()=>{const s=mk(new THREE.SphereGeometry(.2,16,12),lam('#ef4444'),0);s.position.y=.2;return s;},()=>{const f=mk(new THREE.BoxGeometry(.4,.02,.12),lam('#e0e7ff'),0);f.position.y=.04;f.rotation.y=.4;return f;},()=>{const r=mk(new THREE.DodecahedronGeometry(.22),lam('#78716c'),0);r.position.y=.22;return r;}];const it=items[st.mi?st.mi[i]:i]();pan.add(it);pan.traverse(o=>{if(o.isMesh)A.drag(o,{tap:()=>tapX(i)});});});}
    else if(st.m==='cap'){const caps=st.cp||[[.35,.8],[.22,.5],[.45,.4]];caps.forEach(([r,h],i)=>{const x=-1.5+i*1.5;const cup=mk(new THREE.CylinderGeometry(r,r*.85,h,24,1,true),new THREE.MeshLambertMaterial({color:'#e0f2fe',transparent:true,opacity:.35,side:THREE.DoubleSide,depthWrite:false}),0);cup.position.set(x,h/2+.02,-2.0);g2.add(cup);const w=mk(new THREE.CylinderGeometry(r*.96,r*.83,h*.9,24),lam('#38bdf8'),0);w.position.set(x,h*.45+.03,-2.0);g2.add(w);[cup,w].forEach(o=>A.drag(o,{tap:()=>tapX(i)}));const l=label(String.fromCharCode(65+i),{size:.2,color:INK});l.position.set(x,h+.25,-2.0);g2.add(l);});}
    else{const ar=st.ar||[[3,2],[2,2],[4,1]];ar.forEach(([w,h],i)=>{const x0=-2.0+i*1.45,s=.3;for(let a=0;a<w;a++)for(let b=0;b<h;b++){const t=mk(G('g1at',()=>new THREE.BoxGeometry(s*.94,.05,s*.94)),lam(COL[i*2%6]),20);t.position.set(x0+a*s,.03,-2.3+b*s);g2.add(t);A.drag(t,{tap:()=>tapX(i)});}const l=label(String.fromCharCode(65+i),{size:.2,color:INK});l.position.set(x0+(w-1)*s/2,.2,-2.3-0.35);g2.add(l);});}
    A.redraw();}
  draw();
  return {tick(dt){if(arm){cur+=(tilt-cur)*Math.min(1,dt*4);arm.rotation.z=-cur;}},info:()=>st.m,
    controls:()=>{const c=[{t:'Length',on:st.m==='len',fn:()=>{st.m='len';draw();}},{t:'Mass',on:st.m==='mass',fn:()=>{st.m='mass';draw();}},{t:'Capacity',on:st.m==='cap',fn:()=>{st.m='cap';draw();}},{t:'Area',on:st.m==='area',fn:()=>{st.m='area';draw();}},{t:'Line up',go:true,fn:()=>{st.m='len';st.ord=true;A.pop();draw();}}];if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);return c;},
    demo(n){st.ask=null;st.want=null;st.mi=null;st.cp=null;st.ar=null;if(n==='lenord'){st.m='len';st.L=[3,5,2];st.ord=true;draw();}if(n==='len'){st.m='len';st.L=[3,5,2];st.ord=false;draw();A.seq([[1000,()=>{st.ord=true;draw();A.say('Green is the longest!');}]]);}if(n==='mass'){st.m='mass';st.ms=[3,1];draw();}},
    task(r){st.setup=true;st.ask=null;st.want=null;st.mi=null;st.cp=null;st.ar=null;st.ord=false;let txt;
      if(r===0){st.m='len';st.L=shuffle([2,3,5]);const mx=Math.max(...st.L);st.want=i=>st.L[i]===mx;st.wantOk='Yes! That is the longest. Lining them up helps!';txt='Tap the *longest* pencil. (Press Line up to help!)';}
      else if(r===1){st.m='mass';st.mi=[1,0];st.ms=[1,3];st.want=i=>i===1;st.wantOk='Yes! The heavier side goes down.';txt='Tap the *heavier* object.';}
      else if(r===2){st.m='cap';st.cp=shuffle([[.35,.8],[.22,.5],[.2,.35]]);const v=st.cp.map(([r2,h])=>r2*r2*h);const mx=Math.max(...v);st.want=i=>v[i]===mx;st.wantOk='Yes! It holds the most water.';txt='Tap the cup that *holds the most*.';}
      else if(r===3){st.m='area';st.ar=shuffle([[3,2],[2,2],[4,1]]);const v=st.ar.map(([a,b])=>a*b);const mx=Math.max(...v);st.want=i=>v[i]===mx;st.wantOk='Yes! It covers '+mx+' squares: the most.';txt='Tap the shape that *covers the most* squares.';}
      else{st.m='len';st.L=[5,3,2];st.ord=true;st.ask={ans:'Yellow, green, blue',o:shuffle(['Yellow, green, blue','Blue, yellow, green','Green, blue, yellow']),ok:'Yes! Shortest to longest.'};txt='Put the pencils in order from *shortest to longest*.';}
      draw();st.setup=false;return txt;}};}
});

/* =========================================================
   23. The calendar
   ========================================================= */
const MON=['January','February','March','April','May','June','July','August','September','October','November','December'];const DAYS=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const SEA=m=>m<2||m===11?['winter','#93c5fd']:m<5?['spring','#86efac']:m<8?['summer','#fde047']:['fall','#fdba74'];
P.lesson({id:'calendar1',title:'Days, weeks and months',strand:'Spatial Sense',codes:['E2.3'],
 guide:{goal:'Read the date on a calendar, and use a calendar to identify days, weeks, months, holidays and seasons.',words:'calendar, date, day, week, month, year, season, yesterday, today, tomorrow',
  ask:['How many days are in a week?','What day comes after Tuesday?','Which season comes after winter?'],home:'Find today’s date on a calendar. Circle your birthday and count the weeks until it comes!'},
 learn:[{say:'Read the calendar!',speech:'A calendar shows the days of a month. Each row is one week: seven days, from Sunday to Saturday. Milo’s party is on the fifteenth. It is a Thursday!',view:'model',demo:'find'},
        {say:'Read about months and seasons.',speech:'There are twelve months in a year. Winter, spring, summer and fall are the four seasons. In Ontario, winter is snowy and summer is hot!',view:'read'},
        {say:'Watch: flip the months.',speech:'Let’s flip through the months. January, February, March… each season has its own colour.',view:'model',demo:'flip'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: find the date!',speech:'Your turn! Tap a date, or flip the months.',view:'model'}],
 fig:'A calendar page with days, weeks and a season colour.',rz:.35,
 explore:['*Tap a date* to hear its day.','Press *Next month* or *Last month*.','Look at the *season* colour.'],
 howTo:'Tap the date or choose the answer.',
 init:k=>({m:9,sel:null,want:null,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'A *calendar* shows *days*, *weeks* and *months*. 1 week = 7 days. 1 year = 12 months.')+14;
  const cw=TW/7;DAYS.forEach((d,i)=>{rr(g,X0+i*cw+2,y,cw-4,40,8);g.fillStyle=tint(acc(),.2);g.fill();T(g,d.slice(0,3),X0+i*cw+cw/2,y+28,FT.smallB,acc(),'center');});y+=46;
  for(let d=1;d<=31;d++){const k=d+3;const x=X0+(k%7)*cw,yy=y+Math.floor(k/7)*46;g.fillStyle=d===15?'#ffe08a':'#ffffff';g.fillRect(x+2,yy,cw-4,42);g.strokeStyle='#e5e7eb';g.strokeRect(x+2,yy,cw-4,42);T(g,String(d),x+cw/2,yy+30,FT.body,INK,'center');}y+=46*5+16;
  [['winter','#93c5fd'],['spring','#86efac'],['summer','#fde047'],['fall','#fdba74']].forEach(([s,c],i)=>{rr(g,X0+i*TW/4+4,y,TW/4-8,48,24);g.fillStyle=c;g.fill();T(g,s,X0+i*TW/4+TW/8,y+33,FT.bodyB,INK,'center');});y+=72;
  y=keyWords(p,y,[['week','7 days in a row'],['season','winter, spring, summer or fall']]);
  predict(p,y,S,'p23','Today is Monday. What day is tomorrow?','*Tuesday!*');},
 readout(p,S,y){const g=p.g,st=S.st,se=SEA(st.m);T(g,MON[st.m]+(st.sel?' '+st.sel+': '+DAYS[(st.sel-1+first(st.m))%7]:''),X0,y+50,ZS(42),acc());T(g,'season: '+se[0],X0,y+92,FT.bodyB);return y+100;},
 build(S,grp,mode,game){const st=S.st;const g2=new THREE.Group();grp.add(g2);const c=.56,x0=-1.68,z0=-2.85;
  function draw(){clearGroup(g2);const se=SEA(st.m);const base=mk(new THREE.BoxGeometry(4.2,.05,3.3),lam(se[1]),20);base.position.set(0,.025,-1.6);g2.add(base);const ml=label(MON[st.m],{size:.3,color:INK});ml.position.set(-.6,.12,z0-.25);g2.add(ml);const sl=label(se[0],{size:.2,bg:'#ffffff'});sl.position.set(1.5,.15,z0-.25);g2.add(sl);
    DAYS.forEach((d,i)=>{const l=label(d.slice(0,2),{size:.15,color:GREY});l.position.set(x0+i*c,.1,z0+.1);g2.add(l);});const f=first(st.m),n=dim(st.m);
    for(let d=1;d<=n;d++){const k=d-1+f;const x=x0+(k%7)*c,z=z0+.5+Math.floor(k/7)*.46;const on=d===st.sel;const t=mk(G('g1cal',()=>new THREE.BoxGeometry(c*.92,.06,.42)),lam(on?'#ffc04d':'#ffffff'),20);t.position.set(x,on?.12:.07,z);g2.add(t);const l=label(String(d),{size:.14,color:INK});l.position.set(x,on?.2:.15,z);g2.add(l);A.drag(t,{tap:()=>tap(d)});}A.redraw();}
  function tap(d){st.sel=d;A.pop();draw();const dn=DAYS[(d-1+first(st.m))%7];A.say(MON[st.m]+' '+d+' is a '+dn);if(mode==='play'&&!st.setup&&st.want){if(st.want(d,dn))game.solved(st.wantOk);else A.bad('Look at the top of the column to see the day.');}}
  draw();
  return {info:()=>MON[st.m],
    controls:()=>{const c=[{t:'Last month',fn:()=>{st.m=(st.m+11)%12;st.sel=null;draw();}},{t:'Next month',go:true,fn:()=>{st.m=(st.m+1)%12;st.sel=null;A.pop();draw();A.say(MON[st.m]);}}];if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);return c;},
    demo(n){st.ask=null;st.want=null;if(n==='oct'){st.m=9;st.sel=null;draw();}if(n==='tap15'){if(st.m!==9){st.m=9;}tap(15);}if(n==='find'){st.m=9;st.sel=null;draw();A.seq([[900,()=>tap(15)]]);}if(n==='flip'){st.m=0;st.sel=null;draw();A.seq([1,2,3,4,5,6].map(m=>[650,()=>{st.m=m;draw();A.say(MON[m]);}]));}},
    task(r){st.setup=true;st.ask=null;st.want=null;st.sel=null;st.m=9;let txt;
      if(r===0){const d=pick([12,18,23]);st.want=x=>x===d;st.wantOk='Yes! That is '+MON[st.m]+' '+d+'.';txt='Tap *'+MON[st.m]+' '+d+'*.';}
      else if(r===1){st.want=(x,dn)=>dn==='Wednesday';st.wantOk='Yes! Wednesday comes after Tuesday.';txt='Tap any day that comes *after Tuesday*.';}
      else if(r===2){st.ask={ans:'7',o:shuffle(['7','5','12']),ok:'Yes! A week has 7 days.'};txt='How many *days* are in a *week*?';}
      else if(r===3){st.ask={ans:'April',o:shuffle(['April','February','May']),ok:'Yes! April comes after March.'};txt='Which month comes *after March*?';}
      else{st.m=0;st.ask={ans:'Winter',o:shuffle(['Winter','Summer','Spring']),ok:'Yes! January is in winter.'};txt='January in Ontario is snowy. Which *season* is it?';}
      draw();st.setup=false;return txt;}};}
});
const first=m=>[4,0,0,3,5,1,3,6,2,4,0,2][m];const dim=m=>[31,28,31,30,31,30,31,31,30,31,30,31][m];

/* =========================================================
   24. Canadian coins and bills
   ========================================================= */
const MONEY=[{n:'nickel',v:5,t:'5¢',r:.212,c:'#cbd5e1',k:'coin'},{n:'dime',v:10,t:'10¢',r:.18,c:'#e2e8f0',k:'coin'},{n:'quarter',v:25,t:'25¢',r:.239,c:'#cbd5e1',k:'coin'},{n:'fifty-cent coin',v:50,t:'50¢',r:.271,c:'#d1d5db',k:'coin'},
  {n:'loonie',v:100,t:'$1',r:.265,c:'#eab308',k:'coin',sides:11},{n:'toonie',v:200,t:'$2',r:.28,c:'#cbd5e1',k:'coin',ring:'#eab308'},{n:'five-dollar bill',v:500,t:'$5',c:'#60a5fa',k:'bill'},{n:'ten-dollar bill',v:1000,t:'$10',c:'#a78bfa',k:'bill'},
  {n:'twenty-dollar bill',v:2000,t:'$20',c:'#4ade80',k:'bill'},{n:'fifty-dollar bill',v:5000,t:'$50',c:'#f87171',k:'bill'}];
P.lesson({id:'money1',title:'Canadian coins and bills',strand:'Financial Literacy',codes:['F1.1'],
 guide:{goal:'Identify the various Canadian coins up to 50¢, and coins and bills up to $50, and compare their values.',words:'coin, bill, nickel, dime, quarter, loonie, toonie, cents, dollars, value',
  ask:['Which coin is worth 10¢?','Is a bigger coin always worth more?','Which bill is worth the most: $5, $10 or $20?'],home:'Look at real coins with a grown-up. Sort them by value. Which is the smallest coin? Is it worth the least?'},
 learn:[{say:'Meet Canada’s money!',speech:'Suki has Canadian coins: the nickel is five cents, the dime is ten cents, the quarter is twenty-five cents, and the fifty-cent coin. The loonie is one dollar, and the toonie is two dollars. The bills are five, ten, twenty and fifty dollars!',view:'model',demo:'tour'},
        {say:'Read about value.',speech:'Value means how much money a coin or bill is worth. A bigger coin is not always worth more! The dime is the smallest coin, but it is worth more than the nickel.',view:'read'},
        {say:'Watch: order by value.',speech:'Let’s line up the money from least to greatest value: five cents, ten cents, twenty-five cents, fifty cents, one dollar, two dollars, then the bills!',view:'model',demo:'order'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: find the money!',speech:'Your turn! Tap a coin or bill to hear its name and value.',view:'model'}],
 fig:'Canadian coins and bills on a table.',rz:.35,
 explore:['*Tap money* to hear its name and value.','Press *Order by value*.','Press *Mix*.'],
 howTo:'Tap the coin or bill the question asks for.',
 init:k=>({ord:false,sel:null,set:null,want:null,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'Canada has *coins* and *bills*. Each one has a *value*.')+14;
  MONEY.slice(0,6).forEach((m,i)=>{const x=X0+70+(i%3)*270,yy=y+70+Math.floor(i/3)*150;g.beginPath();g.arc(x,yy,m.r*170,0,Math.PI*2);g.fillStyle=m.ring?'#eab308':m.c;g.fill();if(m.ring){g.beginPath();g.arc(x,yy,m.r*110,0,Math.PI*2);g.fillStyle='#cbd5e1';g.fill();}g.strokeStyle='#94a3b8';g.lineWidth=2;g.stroke();T(g,m.t,x,yy+10,FT.bodyB,INK,'center');T(g,m.n,x+70,yy+8,FT.small,GREY);});y+=320;
  MONEY.slice(6).forEach((m,i)=>{rr(g,X0+i*TW/4+6,y,TW/4-12,80,8);g.fillStyle=m.c;g.fill();T(g,m.t,X0+i*TW/4+TW/8,y+52,ZS(36),'#ffffff','center');});y+=104;
  y=para(p,y,'The *dime* is the smallest coin, but it is worth *more* than the nickel!')+8;
  y=keyWords(p,y,[['value','how much money it is worth'],['cent (¢)','100 cents make 1 dollar']]);
  predict(p,y,S,'p24','Which is worth more: a loonie or a quarter?','*A loonie!* $1 is 100¢.');},
 readout(p,S,y){const g=p.g,st=S.st;if(st.sel==null){T(g,'Tap a coin or bill!',X0,y+50,ZS(40),acc());return y+64;}const m=MONEY[st.sel];T(g,m.t,X0,y+56,ZS(56),acc());T(g,m.n,X0+160,y+50,FT.bodyB);return y+70;},
 build(S,grp,mode,game){const st=S.st;const g2=new THREE.Group();grp.add(g2);g2.position.z=.5;
  function piece(m){const g=new THREE.Group();if(m.k==='coin'){const geo=new THREE.CylinderGeometry(m.r,m.r,.06,m.sides||32);const c=mk(geo,lam(m.ring||m.c),20);g.add(c);if(m.ring){const inner=mk(new THREE.CylinderGeometry(m.r*.62,m.r*.62,.065,28),lam('#cbd5e1'),0);g.add(inner);}const l=label(m.t,{size:.16,color:INK});l.position.y=.08;g.add(l);}
    else{const b=mk(new THREE.BoxGeometry(.9,.02,.42),lam(m.c),20);g.add(b);const l=label(m.t,{size:.2,color:'#ffffff'});l.position.y=.05;g.add(l);}return g;}
  function draw(){clearGroup(g2);const list=st.set||MONEY.map((_,i)=>i);const order=st.ord?list.slice().sort((a,b)=>MONEY[a].v-MONEY[b].v):list;order.forEach((idx,j)=>{const m=MONEY[idx];const pc=piece(m);let x,z;
      if(st.set){x=-1.6+j*(3.2/Math.max(1,order.length-1));z=-2.0;}else if(m.k==='coin'){const pos=st.ord?j:[2,0,4,1,5,3][idx];x=-1.9+pos*.75;z=-2.6;}else{const pos=st.ord?j-6:[1,3,0,2][idx-6];x=-1.6+pos*1.05;z=-1.5;}
      pc.position.set(x,.05,z);if(st.sel===idx)pc.position.y=.25;g2.add(pc);pc.traverse(o=>{if(o.isMesh)A.drag(o,{tap:()=>tap(idx)});});});A.redraw();}
  function tap(i){st.sel=i;A.pop();draw();A.say(MONEY[i].n+': '+MONEY[i].t);if(mode==='play'&&!st.setup&&st.want){if(st.want(i))game.solved(st.wantOk);else A.bad('Look at the value written on it!');}}
  draw();
  return {info:()=>st.sel==null?'-':MONEY[st.sel].n,
    controls:()=>{const c=[{t:'Order by value',on:st.ord,go:true,fn:()=>{st.ord=true;A.pop();draw();}},{t:'Mix',fn:()=>{st.ord=false;draw();}}];if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);return c;},
    demo(n){st.ask=null;st.want=null;st.set=null;if(n==='show'){st.ord=false;st.sel=null;draw();}if(n==='tour'){st.ord=false;st.sel=null;draw();A.seq(MONEY.map((m,i)=>[700,()=>{st.sel=i;draw();}]));}if(n==='order'){st.ord=false;st.sel=null;draw();A.seq([[900,()=>{st.ord=true;draw();A.say('least to greatest!');}]]);}},
    task(r){st.setup=true;st.ask=null;st.want=null;st.set=null;st.sel=null;st.ord=false;let txt;
      if(r===0){st.want=i=>i===2;st.wantOk='Yes! The quarter is worth 25¢.';txt='Tap the coin worth *25¢*.';}
      else if(r===1){st.set=[0,1];st.want=i=>i===1;st.wantOk='Yes! A dime (10¢) is worth more than a nickel (5¢), even though it is smaller!';txt='Tap the coin worth *more*.';}
      else if(r===2){st.want=i=>i===8;st.wantOk='Yes! That is the $20 bill.';txt='Tap the *twenty-dollar bill*.';}
      else if(r===3){st.want=i=>i===5;st.wantOk='Yes! The toonie is worth $2.';txt='Tap the *toonie*.';}
      else{st.set=[6,7,9];st.ask={ans:'$50',o:shuffle(['$5','$10','$50']),ok:'Yes! $50 is the greatest value.'};txt='Which bill is worth the *most*?';}
      draw();st.setup=false;return txt;}};}
});
})();
