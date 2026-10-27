/* The Interactive Classroom: Grade 6 Math — Spatial Sense (24–31) and Financial Literacy (32–33) */
(function(){
"use strict";
const P=window.PM;if(!P||P.failed||!P.THREE)return;
const {THREE,V,W,D,PY,PX,X0,TW,INK,RED,BLUE,GREY,VIBE,FT,ZS,G,M,lam,mk,unitBox,cellMat,label,starGeo,wedgeGeo,clearGroup,disposeObj,rr,T,wrap,para,header,keyWords,predict,box,caption,cxOf,cyOf,tint,moveTo,hop,tween,burst,easeOut,easeIO,A}=P;
const acc=()=>P.ACC;
const rnd=(a,b)=>a+Math.floor(Math.random()*(b-a+1)),pick=a=>a[Math.floor(Math.random()*a.length)],shuffle=a=>a.slice().sort(()=>Math.random()-.5);
function choices(game,list,ans,ok,lab){return list.map(o=>({t:lab?lab(o):String(o),big:true,fn:()=>{if(o===ans){if(game)game.solved(ok);else A.good(ok);}else A.bad('Not quite. Try again!');}}));}
function opts(ans,spread,min){const s=new Set([ans]);let k=0;while(s.size<3&&k<60){k++;const v=Math.round((ans+pick(spread))*100)/100;if(v>=(min==null?0:min))s.add(v);}return shuffle([...s]);}
function slab(pts,col,h,op){const s=new THREE.Shape();pts.forEach(([x,z],i)=>i?s.lineTo(x,-z):s.moveTo(x,-z));s.closePath();const geo=new THREE.ExtrudeGeometry(s,{depth:h||.08,bevelEnabled:false});geo.rotateX(-Math.PI/2);
  return mk(geo,op?new THREE.MeshLambertMaterial({color:col,transparent:true,opacity:op,side:THREE.DoubleSide}):lam(col),20);}
function seg(a,b,col,r){const len=a.distanceTo(b);const m=new THREE.Mesh(new THREE.CylinderGeometry(r,r,Math.max(.001,len),8),lam(col));m.position.copy(a).add(b).multiplyScalar(.5);m.quaternion.setFromUnitVectors(V(0,1,0),b.clone().sub(a).normalize());return m;}
const sgn=v=>v<0?'−'+(-v):String(v);

/* =========================================================
   24. Properties of quadrilaterals
   ========================================================= */
const Q6={square:{v:[[-.9,-.9],[.9,-.9],[.9,.9],[-.9,.9]],sym:[0,45,90,135],rot:4,col:'#16a36f'},rectangle:{v:[[-1.2,-.7],[1.2,-.7],[1.2,.7],[-1.2,.7]],sym:[0,90],rot:2,col:'#2f7de1'},
  rhombus:{v:[[0,-.9],[1.25,0],[0,.9],[-1.25,0]],sym:[0,90],rot:2,col:'#f08a24'},parallelogram:{v:[[-1.2,-.6],[.7,-.6],[1.2,.6],[-.7,.6]],sym:[],rot:2,col:'#e4572e'},
  trapezoid:{v:[[-1.2,.6],[1.2,.6],[.6,-.6],[-.6,-.6]],sym:[90],rot:1,col:'#8b5cf6'},kite:{v:[[0,-1.0],[.75,-.25],[0,.95],[-.75,-.25]],sym:[90],rot:1,col:'#0fa5a5'}};
const QN=Object.keys(Q6);
function diag(k){const v=Q6[k].v;const d1=[v[2][0]-v[0][0],v[2][1]-v[0][1]],d2=[v[3][0]-v[1][0],v[3][1]-v[1][1]];const L1=Math.hypot(...d1),L2=Math.hypot(...d2);
  const m1=[(v[0][0]+v[2][0])/2,(v[0][1]+v[2][1])/2],m2=[(v[1][0]+v[3][0])/2,(v[1][1]+v[3][1])/2];return {equal:Math.abs(L1-L2)<1e-6,perp:Math.abs(d1[0]*d2[0]+d1[1]*d2[1])<1e-6,bisect:Math.hypot(m1[0]-m2[0],m1[1]-m2[1])<1e-6};}
P.lesson({id:'quads6',title:'Properties of quadrilaterals',strand:'Spatial Sense',codes:['E1.1'],
 guide:{goal:'Create lists of the geometric properties of quadrilaterals, including the properties of their diagonals, line symmetry and rotational symmetry.',words:'diagonal, perpendicular, bisect, line symmetry, rotational symmetry, order of rotation, quadrilateral',
  ask:['Which quadrilaterals have diagonals that cross at right angles?','What does “order of rotational symmetry 2” mean?','Why does a kite have line symmetry but no rotational symmetry?'],home:'Cut out a paper rectangle and a paper square. Spin each one on a pencil tip. How many times does it fit in its outline in one full turn?'},
 learn:[{say:'Diagonals tell a shape apart.',speech:'A diagonal joins opposite corners. In Lucia’s square, the diagonals are equal, they cross at a right angle, and they cut each other in half. Watch the diagonals appear on each shape.',view:'model',demo:'diag'},
        {say:'Read about symmetry.',speech:'Line symmetry folds a shape onto itself. Rotational symmetry turns it onto itself. A rectangle fits its outline twice in one full turn, so its order of rotational symmetry is two.',view:'read'},
        {say:'Watch: spin to test rotational symmetry.',speech:'Watch the square spin. It fits its outline after every quarter turn: four times in a full turn. Its order of rotational symmetry is four.',view:'model',demo:'spin'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: inspect the shapes.',speech:'Your turn. Choose a shape and turn on diagonals, lines of symmetry, or spin it.',view:'model'}],
 fig:'A quadrilateral with its diagonals, mirror lines and a spin test.',rz:.55,
 explore:['*Tap a small shape* to inspect it.','Turn on *Diagonals* and *Mirror lines*.','Press *Spin* to count rotational symmetry.'],
 howTo:'Read the property, then tap the shape that has it, or choose the number.',
 init:k=>({k:'square',dg:true,sym:false,ask:null,want:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'Every quadrilateral has *two diagonals*. Their properties, and the shape’s *symmetry*, help classify it.')+14;
  const H=['Shape','Diag. equal','Diag. ⟂','Bisect','Lines','Rot.'],cx=[X0,X0+200,X0+340,X0+470,X0+590,X0+700];rr(g,X0-6,y,TW+12,40,10);g.fillStyle=tint(acc(),.16);g.fill();H.forEach((h,i)=>T(g,h,cx[i]+6,y+28,FT.cap,acc()));y+=44;
  QN.forEach((k,j)=>{const d=diag(k),q=Q6[k];const yy=y+j*40;if(j%2){g.fillStyle='rgba(0,0,0,.03)';g.fillRect(X0-6,yy,TW+12,40);}T(g,k,cx[0]+6,yy+28,FT.smallB,q.col);[d.equal,d.perp,d.bisect].forEach((b,i)=>T(g,b?'✓':'–',cx[i+1]+40,yy+28,FT.bodyB,b?'#16a36f':GREY,'center'));T(g,String(q.sym.length),cx[4]+30,yy+28,FT.bodyB,INK,'center');T(g,String(q.rot),cx[5]+20,yy+28,FT.bodyB,INK,'center');});y+=6*40+20;
  y=para(p,y,'*Order of rotational symmetry* = how many times a shape fits its outline in one full turn. An order of 1 means *no* rotational symmetry.')+10;
  y=keyWords(p,y,[['diagonal','a segment joining two opposite vertices'],['bisect','cut into two equal parts']]);
  predict(p,y,S,'p24','Which quadrilaterals have diagonals that are perpendicular?','*Square, rhombus and kite.*');},
 readout(p,S,y){const g=p.g,st=S.st,d=diag(st.k),q=Q6[st.k];T(g,st.k[0].toUpperCase()+st.k.slice(1),X0,y+44,ZS(42),q.col);
  T(g,'diagonals: '+(d.equal?'equal':'not equal')+', '+(d.perp?'perpendicular':'not perpendicular')+', '+(d.bisect?'bisect':'do not bisect')+'  ·  '+q.sym.length+' mirror lines  ·  rotation order '+q.rot,X0,y+84,FT.small);return y+94;},
 build(S,grp,mode,game){const st=S.st,C=V(0,0,-1.95);const big=new THREE.Group();big.position.copy(C);grp.add(big);const spinG=new THREE.Group();big.add(spinG);let spinning=false;
  function drawBig(){clearGroup(big);const sg=new THREE.Group();big.add(sg);const q=Q6[st.k];const ghost=slab(q.v,'#cbd5e1',.02,.6);big.add(ghost);const sl=slab(q.v,q.col,.12,.9);sg.add(sl);big.userData.sg=sg;
    const P3=q.v.map(([x,z])=>V(x,.15,z));for(let i=0;i<4;i++)sg.add(seg(P3[i],P3[(i+1)%4],INK,.02));
    if(st.dg){const d=diag(st.k);sg.add(seg(P3[0],P3[2],'#ffffff',.03));sg.add(seg(P3[1],P3[3],'#fde047',.03));if(d.perp){const c=V(0,.16,0);const a1=P3[0].clone().sub(P3[2]).normalize().multiplyScalar(.16),a2=P3[1].clone().sub(P3[3]).normalize().multiplyScalar(.16);sg.add(seg(c.clone().add(a1),c.clone().add(a1).add(a2),INK,.012));sg.add(seg(c.clone().add(a2),c.clone().add(a1).add(a2),INK,.012));}}
    if(st.sym)q.sym.forEach(deg=>{const pl=new THREE.Mesh(new THREE.PlaneGeometry(3.0,.7),new THREE.MeshLambertMaterial({color:'#16a36f',transparent:true,opacity:.28,side:THREE.DoubleSide,depthWrite:false}));pl.position.set(0,.4,0);pl.rotation.y=deg*Math.PI/180;big.add(pl);});A.redraw();}
  function spin(){if(spinning)return;spinning=true;const q=Q6[st.k],sg=big.userData.sg;let fits=0;const steps=[];for(let i=1;i<=q.rot;i++)steps.push(i);
    const step=i=>{const a0=sg.rotation.y,a1=-i*2*Math.PI/q.rot;tween(.9,k=>{sg.rotation.y=a0+(a1-a0)*k;sg.position.y=Math.sin(Math.PI*k)*.15;}).then(()=>{fits++;A.pop();A.say('Fits! '+fits+(q.rot>1?' of '+q.rot:''));if(i<q.rot)A.later(()=>step(i+1),300);else{spinning=false;sg.rotation.y=0;A.good('Order of rotational symmetry: '+q.rot);}});};step(1);}
  const row=new THREE.Group();grp.add(row);let rowKeys=QN.slice();
  function drawRow(){clearGroup(row);rowKeys.forEach((k,i)=>{const g=new THREE.Group();g.add(slab(Q6[k].v.map(([x,z])=>[x*.27,z*.27]),Q6[k].col,.06));g.position.set(-1.85+i*.74,0,.05);row.add(g);const l=label(k,{size:.12,color:INK});l.position.set(0,.25,.36);g.add(l);A.drag(g,{tap:()=>tapShape(k)});});}
  function tapShape(k){st.k=k;drawBig();A.pop();if(mode==='play'&&!st.setup&&st.want){if(st.want(k))game.solved(st.wantOk);else A.bad('Look again: '+st.wantHint);}}
  drawBig();drawRow();
  return {info:()=>st.k,
    controls:()=>{const tg=[{t:'Diagonals',on:st.dg,fn:()=>{st.dg=!st.dg;drawBig();}},{t:'Mirror lines',on:st.sym,fn:()=>{st.sym=!st.sym;drawBig();}},{t:'Spin',go:true,fn:spin}];
      if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(tg);return tg;},
    demo(n){st.ask=null;st.want=null;if(n==='diag'){st.dg=true;st.sym=false;const l=QN.map(k=>[900,()=>{st.k=k;drawBig();A.say(k);}]);A.seq(l);}if(n==='spin'){st.k='square';st.dg=false;drawBig();A.seq([[700,spin]]);}},
    task(r){st.setup=true;st.ask=null;st.want=null;st.dg=false;st.sym=false;let txt;
      if(r===0){st.k='rectangle';st.want=k=>diag(k).perp&&!diag(k).equal&&diag(k).bisect;st.wantOk='Yes! A rhombus: its diagonals are perpendicular and bisect each other, but are not equal.';st.wantHint='turn on Diagonals and check each shape.';txt='Tap the shape whose diagonals are *perpendicular* and *bisect* each other but are *not equal*.';}
      else if(r===1){st.k=pick(['square','rectangle','rhombus','kite']);const a=Q6[st.k].sym.length;st.ask={ans:a,o:[0,1,2,4],ok:'Yes! '+a+' lines of symmetry.'};txt='How many *lines of symmetry* does this '+st.k+' have?';}
      else if(r===2){st.k=pick(['square','parallelogram','trapezoid','rhombus']);const a=Q6[st.k].rot;st.ask={ans:a,o:[1,2,4],ok:'Yes! Order '+a+'.'};txt='What is the *order of rotational symmetry* of this '+st.k+'? Use Spin.';}
      else if(r===3){st.k='square';st.want=k=>k==='parallelogram';st.wantOk='Yes! A parallelogram has rotational symmetry of order 2 but no lines of symmetry.';st.wantHint='it turns onto itself, but no fold works.';txt='Tap the shape with *rotational symmetry* but *no line symmetry*.';}
      else{st.k='kite';st.want=k=>diag(k).equal&&!diag(k).perp;st.wantOk='Yes! A rectangle has equal diagonals that are not perpendicular.';st.wantHint='find equal diagonals that do not cross at a right angle.';txt='Tap the shape with *equal* diagonals that are *not perpendicular*.';}
      drawBig();st.setup=false;return txt;}};}
});

/* =========================================================
   25. Building objects from views
   ========================================================= */
P.lesson({id:'build6',title:'Building from top, front and side views',strand:'Spatial Sense',codes:['E1.2'],
 guide:{goal:'Construct three-dimensional objects when given their top, front and side views.',words:'top view, front view, side view, structure, construct, cube',
  ask:['Which view tells you where the cubes stand on the floor?','How do the front and side views tell you how tall each stack is?','Can two different buildings match the same three views?'],home:'Draw three views of a block structure, hand them to someone, and ask them to build it without peeking.'},
 learn:[{say:'Three clues to one building.',speech:'Arjun’s top view shows which squares have cubes. The front view shows the tallest stack in each column. The side view shows the tallest stack in each row. Watch a building grow to match all three.',view:'model',demo:'build'},
        {say:'Read the strategy.',speech:'Start with the top view: put one cube on each shaded square. Then use the front and side views to decide how tall each stack must be. Check all three views at the end.',view:'read'},
        {say:'Watch: checking the views.',speech:'When a view matches, its panel turns green. All three green means the building is correct.',view:'model',demo:'check'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: build from the views.',speech:'Your turn. Tap floor squares to add cubes, and tap cubes to remove them, until all three views match.',view:'model'}],
 fig:'Target views on the walls. Build the structure that matches them.',rz:.4,
 explore:['*Tap a floor square* to add a cube; *tap a cube* to remove one.','Each wall shows a *target view*.','A panel turns *green* when your building matches it.'],
 howTo:'Build cubes so the front, side and top views all match the panels.',
 init:k=>({h:[[0,0,0],[0,0,0],[0,0,0]],tgt:[[1,0,0],[2,1,0],[3,1,1]]}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'To build from views, use the *top view* for the footprint, and the *front* and *side* views for the heights.')+16;
  const s=36,view=(ox,oy,cols,title,col)=>{cols.forEach((n,c)=>{for(let k=0;k<n;k++){g.fillStyle=col;g.fillRect(ox+c*s,oy-(k+1)*s,s-3,s-3);}});g.strokeStyle=INK;g.lineWidth=2;g.beginPath();g.moveTo(ox-6,oy);g.lineTo(ox+3*s+6,oy);g.stroke();T(g,title,ox+s*1.5,oy+28,FT.smallB,INK,'center');};
  const H=[[1,0,0],[2,1,0],[3,1,1]];view(X0+10,y+130,fv(H),'front','#2f7de1');view(X0+200,y+130,sv(H),'side','#e4572e');
  for(let r=0;r<3;r++)for(let c=0;c<3;c++){g.fillStyle=H[r][c]?'#16a36f':'#eef2f8';g.fillRect(X0+390+c*s,y+22+r*s,s-3,s-3);}T(g,'top',X0+390+s*1.5,y+158,FT.smallB,INK,'center');
  [['1','Top view: put 1 cube on each green square.'],['2','Front view: make each column’s tallest stack match.'],['3','Side view: make each row’s tallest stack match.'],['4','Check all three!']].forEach(([n,t],i)=>{T(g,n,X0+12,y+214+i*48,ZS(30),acc());wrap(g,t,X0+50,y+212+i*48,TW-60,28,{font:FT.body});});y+=420;
  y=keyWords(p,y,[['view','a flat drawing of what you see from one side'],['construct','build an object from a plan or drawing']]);
  predict(p,y,S,'p25','The top view has 3 squares in a row. The front view shows 3 cubes in a row, all 1 high. How many cubes?','*3 cubes.* All three stacks are 1 high.');},
 readout(p,S,y){const g=p.g,st=S.st,ok=chk(st);T(g,'front '+(ok.f?'✓':'✗')+'   side '+(ok.s?'✓':'✗')+'   top '+(ok.t?'✓':'✗'),X0,y+48,ZS(40),ok.f&&ok.s&&ok.t?'#16a36f':acc());T(g,st.h.flat().reduce((a,b)=>a+b,0)+' cubes used',X0,y+88,FT.bodyB);return y+96;},
 build(S,grp,mode,game){const st=S.st,c=.44,cx=.25,cz=-1.75;const bx=q=>cx+(q-1)*c,bz=r=>cz+(r-1)*c;const cubes=new THREE.Group();grp.add(cubes);
  for(let r=0;r<3;r++)for(let q=0;q<3;q++){const t=mk(G('b6tile',()=>new THREE.BoxGeometry(c-.04,.04,c-.04)),lam((r+q)%2?'#e6ecf5':'#f3f6fb'),20);t.position.set(bx(q),.02,bz(r));grp.add(t);A.drag(t,{tap:()=>add(r,q)});}
  const pan=(w,h,d)=>mk(new THREE.BoxGeometry(w,h,d),lam('#ffffff'),20);const wB=pan(1.5,1.45,.04);wB.position.set(cx,.72,-3.05);grp.add(wB);const wS=pan(.04,1.45,1.5);wS.position.set(-1.35,.72,cz);grp.add(wS);const tP=pan(1.45,.03,1.45);tP.position.set(1.7,.015,-.55);grp.add(tP);
  const labs=[['FRONT',cx,1.62,-3.0],['SIDE',-1.35,1.62,cz],['TOP',1.7,.3,-1.45]].map(([t,x,y2,z])=>{const l=label(t,{size:.17,bg:'#ffffff'});l.position.set(x,y2,z);grp.add(l);return l;});
  const views=new THREE.Group();grp.add(views);const vs=.42;
  function drawViews(){clearGroup(views);const ok=chk(st);const fc=ok.f?'#16a36f':'#2f7de1',sc=ok.s?'#16a36f':'#e4572e',tc=ok.t?'#16a36f':'#64748b';
    fv(st.tgt).forEach((n,q)=>{for(let k=0;k<n;k++){const m=mk(G('b6fv',()=>new THREE.BoxGeometry(vs*.92,vs*.92,.03)),lam(fc),0);m.position.set(cx+(q-1)*vs,.12+vs/2+k*vs,-3.02);views.add(m);}});
    sv(st.tgt).forEach((n,r)=>{for(let k=0;k<n;k++){const m=mk(G('b6sv',()=>new THREE.BoxGeometry(.03,vs*.92,vs*.92)),lam(sc),0);m.position.set(-1.32,.12+vs/2+k*vs,cz+(r-1)*vs);views.add(m);}});
    for(let r=0;r<3;r++)for(let q=0;q<3;q++)if(st.tgt[r][q]){const m=mk(G('b6tv',()=>new THREE.BoxGeometry(vs*.92,.03,vs*.92)),lam(tc),0);m.position.set(1.7+(q-1)*vs,.04,-.55+(r-1)*vs);views.add(m);}}
  function draw(){clearGroup(cubes);for(let r=0;r<3;r++)for(let q=0;q<3;q++)for(let k=0;k<st.h[r][q];k++){const m=unitBox(1,1,1,'#fbbf24',c*.96);m.position.set(bx(q),.04+c*.48+k*c*.96,bz(r));cubes.add(m);A.drag(m,{tap:()=>rem(r,q)});}
    drawViews();const ok=chk(st);if(ok.f&&ok.s&&ok.t){A.good('All three views match!');if(mode==='play'&&!st.setup)game.solved('Your building matches all three views!');}A.redraw();}
  function add(r,q){if(st.h[r][q]>=3){A.bad('3 cubes is the limit.');return;}st.h[r][q]++;A.pop();draw();}
  function rem(r,q){if(st.h[r][q]<=0)return;st.h[r][q]--;A.pop();draw();}
  draw();
  return {info:()=>{const ok=chk(st);return 'front '+(ok.f?'✓':'✗')+' side '+(ok.s?'✓':'✗')+' top '+(ok.t?'✓':'✗');},
    controls:()=>[{t:'Clear',fn:()=>{st.h=[[0,0,0],[0,0,0],[0,0,0]];draw();}}].concat(mode==='learn'?[{t:'Show a solution',fn:()=>{st.h=st.tgt.map(r=>r.slice());draw();}},{t:'New views',go:true,fn:()=>{st.tgt=randH();st.h=[[0,0,0],[0,0,0],[0,0,0]];draw();}}]:[]),
    demo(n){st.tgt=[[1,0,0],[2,1,0],[3,1,1]];st.h=[[0,0,0],[0,0,0],[0,0,0]];draw();if(n==='build'){const s=[[0,0],[1,0],[1,1],[2,0],[2,1],[2,2],[1,0],[2,0],[2,0]];A.seq(s.map(([r,q])=>[450,()=>add(r,q)]));}
      if(n==='check'){st.h=[[1,0,0],[1,1,0],[3,1,1]];draw();A.seq([[1200,()=>{add(1,0);A.say('Now all three panels are green.');}]]);}},
    task(r){st.setup=true;st.h=[[0,0,0],[0,0,0],[0,0,0]];do{st.tgt=randH();}while(st.tgt.flat().reduce((a,b)=>a+b,0)<3+r);draw();st.setup=false;
      return r===0?'Build a structure that matches the *top, front and side* views.':'Build to match all *three views*. ('+(r+3)+'+ cubes)';}};}
});
function fv(h){return [0,1,2].map(q=>Math.max(h[0][q],h[1][q],h[2][q]));}
function sv(h){return [0,1,2].map(r=>Math.max(...h[r]));}
function randH(){let h;do{h=[0,1,2].map(()=>[0,1,2].map(()=>Math.random()<.4?0:rnd(1,3)));}while(h.flat().filter(v=>v).length<3);return h;}
function chk(st){const fp=h=>h.map(r=>r.map(v=>v?1:0)).flat().join();return {f:fv(st.h).join()===fv(st.tgt).join(),s:sv(st.h).join()===sv(st.tgt).join(),t:fp(st.h)===fp(st.tgt)};}

/* =========================================================
   26. Four quadrants and combined transformations
   ========================================================= */
P.lesson({id:'quadrants6',title:'Four quadrants and transformations',strand:'Spatial Sense',codes:['E1.3','E1.4'],
 guide:{goal:'Plot and read coordinates in all four quadrants, describe translations, and perform and predict combinations of translations, reflections and rotations up to 360°.',words:'quadrant, origin, x-axis, y-axis, negative coordinate, translation, reflection, rotation, combination',
  ask:['In which quadrant is (−3, 2)?','What happens to (4, −1) when it is reflected in the y-axis?','Is a 270° clockwise rotation the same as a 90° counterclockwise rotation?'],home:'Draw axes on graph paper and plot your family’s initials using points in all four quadrants.'},
 learn:[{say:'Four quadrants.',speech:'The axes split Chloe’s map into four quadrants. Points left of the y-axis have negative x. Points below the x-axis have negative y. Watch the pin visit each quadrant.',view:'model',demo:'tour'},
        {say:'Read about transformations.',speech:'A translation slides. A reflection in the x-axis changes the sign of y. A reflection in the y-axis changes the sign of x. A rotation of one hundred eighty degrees about the origin changes both signs.',view:'read'},
        {say:'Watch: two moves in a row.',speech:'Reflect the flag in the y-axis, then rotate it ninety degrees clockwise about the origin. Predict where it lands before it moves.',view:'model',demo:'combo'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: transform the flag.',speech:'Your turn. Drag the pin, slide the flag, reflect it, or rotate it about the origin.',view:'model'}],
 fig:'A coordinate grid with four quadrants, a pin and a flag.',rz:.45,
 explore:['*Drag the pin* to any point.','Use the arrows to *translate* the flag.','*Reflect* in an axis or *rotate* about the origin.'],
 howTo:'Plot the point, or transform the flag until it matches the dashed outline.',
 init:k=>({pin:[-3,2],sh:[[1,1],[1,4],[3,3]],gh:null,ask:null,tgt:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'The *x-axis* and *y-axis* cross at the *origin* (0, 0) and make *four quadrants*.')+16;
  const s=28,ox=X0+170,oy=y+160;g.strokeStyle='#d8dde8';g.lineWidth=1;for(let i=-5;i<=5;i++){g.beginPath();g.moveTo(ox+i*s,oy-5*s);g.lineTo(ox+i*s,oy+5*s);g.stroke();g.beginPath();g.moveTo(ox-5*s,oy+i*s);g.lineTo(ox+5*s,oy+i*s);g.stroke();}
  g.strokeStyle=INK;g.lineWidth=3;g.beginPath();g.moveTo(ox-5*s,oy);g.lineTo(ox+5*s,oy);g.moveTo(ox,oy-5*s);g.lineTo(ox,oy+5*s);g.stroke();
  [['II (−, +)',-3,3],['I (+, +)',3,3],['III (−, −)',-3,-3],['IV (+, −)',3,-3]].forEach(([t,x,yy])=>T(g,t,ox+x*s,oy-yy*s+8,FT.smallB,acc(),'center'));
  g.beginPath();g.arc(ox-4*s,oy-2*s,7,0,Math.PI*2);g.fillStyle='#e4572e';g.fill();T(g,'(−4, 2)',ox-4*s,oy-2*s-14,FT.cap,'#e4572e','center');
  [['Reflect in x-axis','(x, y) → (x, −y)'],['Reflect in y-axis','(x, y) → (−x, y)'],['Rotate 180° about O','(x, y) → (−x, −y)'],['Rotate 90° clockwise','(x, y) → (y, −x)']].forEach(([a,b],i)=>{T(g,a,X0+380,y+40+i*64,FT.smallB,acc());T(g,b,X0+380,y+70+i*64,FT.body);});y+=330;
  y=keyWords(p,y,[['quadrant','one of the four regions made by the axes'],['origin','the point (0, 0) where the axes cross']]);
  predict(p,y,S,'p26','Reflect (2, −3) in the x-axis, then in the y-axis. Where is it?','*(−2, 3).* That is the same as a 180° rotation about the origin.');},
 readout(p,S,y){const g=p.g,st=S.st;T(g,'Pin at ('+sgn(st.pin[0])+', '+sgn(st.pin[1])+')',X0,y+46,ZS(44),acc());const q=quad(st.pin);T(g,q?'quadrant '+q:'on an axis',X0+380,y+40,FT.bodyB);
  T(g,'Flag corner A: ('+sgn(st.sh[0][0])+', '+sgn(st.sh[0][1])+')',X0,y+88,FT.body);return y+96;},
 build(S,grp,mode,game){const st=S.st,s=.27,cx=-.35,cz=-1.75;const X=x=>cx+x*s,Z=y=>cz-y*s;
  const base=mk(new THREE.BoxGeometry(10*s+.2,.03,10*s+.2),[lam('#f3f6fb'),lam('#f3f6fb'),cellMat('#ffffff',10,10),lam('#f3f6fb'),lam('#f3f6fb'),lam('#f3f6fb')],20);base.position.set(X(0),.015,Z(0));grp.add(base);
  [[X(-5.3),Z(0),X(5.3),Z(0)],[X(0),Z(-5.3),X(0),Z(5.3)]].forEach(([a,b,c,d])=>{const m=new THREE.Mesh(new THREE.BoxGeometry(c!==a?Math.abs(c-a):.03,.04,d!==b?Math.abs(d-b):.03),lam(INK));m.position.set((a+c)/2,.05,(b+d)/2);grp.add(m);});
  for(let i=-5;i<=5;i++){if(!i)continue;const lx=label(sgn(i),{size:.13,color:i<0?'#2563eb':GREY});lx.position.set(X(i),.1,Z(0)+.16);grp.add(lx);const ly=label(sgn(i),{size:.13,color:i<0?'#2563eb':GREY});ly.position.set(X(0)-.17,.1,Z(i));grp.add(ly);}
  [['I',3.5,3.5],['II',-3.5,3.5],['III',-3.5,-3.5],['IV',3.5,-3.5]].forEach(([t,x,y])=>{const l=label(t,{size:.22,color:'#cbd5e1'});l.position.set(X(x),.08,Z(y));grp.add(l);});
  const shG=new THREE.Group(),ghG=new THREE.Group();grp.add(shG,ghG);const pin=new THREE.Group();const pm=mk(new THREE.ConeGeometry(.09,.26,16),lam('#e4572e'),0);pm.rotation.x=Math.PI;pm.position.y=.18;pin.add(pm);const ph=mk(new THREE.SphereGeometry(.09,14,10),lam('#e4572e'),0);ph.position.y=.36;pin.add(ph);grp.add(pin);
  const ptag=label('',{size:.2,bg:'#ffffff'});grp.add(ptag);
  function flag(pts,col,op,dash){const g=new THREE.Group();g.add(slab(pts.map(([x,y])=>[X(x),Z(y)]),col,dash?.02:.08,op));if(!dash){const P3=pts.map(([x,y])=>V(X(x),.1,Z(y)));for(let i=0;i<3;i++)g.add(seg(P3[i],P3[(i+1)%3],INK,.012));const d=mk(new THREE.SphereGeometry(.06,12,10),lam('#ffd24a'),0);d.position.copy(P3[0]).setY(.15);g.add(d);}return g;}
  function draw(){clearGroup(shG);clearGroup(ghG);shG.add(flag(st.sh,'#2f7de1',.85));if(st.gh)ghG.add(flag(st.gh,'#16a36f',.4,true));pin.position.set(X(st.pin[0]),0,Z(st.pin[1]));ptag.userData.set('('+sgn(st.pin[0])+', '+sgn(st.pin[1])+')');ptag.position.set(X(st.pin[0]),.7,Z(st.pin[1]));pin.visible=ptag.visible=!st.gh;check();A.redraw();}
  A.drag(pin,{h:.2,drop:pos=>{st.pin=[Math.max(-5,Math.min(5,Math.round((pos.x-cx)/s))),Math.max(-5,Math.min(5,Math.round((cz-pos.z)/s)))];A.pop();draw();}});
  function apply(f,name){const np=st.sh.map(f);if(np.some(([x,y])=>Math.abs(x)>5||Math.abs(y)>5)){A.bad('That would leave the grid.');return;}st.sh=np;A.pop();if(name)A.say(name);draw();}
  function check(){if(mode!=='play'||st.setup)return;if(st.gh&&st.sh.map(q=>q.join()).join(';')===st.gh.map(q=>q.join()).join(';'))game.solved('Exact match!');if(st.tgt&&st.pin[0]===st.tgt[0]&&st.pin[1]===st.tgt[1])game.solved('Yes! ('+sgn(st.tgt[0])+', '+sgn(st.tgt[1])+').');}
  const TR={rx:([x,y])=>[x,-y],ry:([x,y])=>[-x,y],r90:([x,y])=>[y,-x],r180:([x,y])=>[-x,-y],r270:([x,y])=>[-y,x]};
  draw();
  return {info:()=>'Pin ('+sgn(st.pin[0])+', '+sgn(st.pin[1])+')',
    controls:()=>{if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok);if(mode==='play'&&st.tgt)return [];
      return [{t:'←',fn:()=>apply(([x,y])=>[x-1,y])},{t:'→',fn:()=>apply(([x,y])=>[x+1,y])},{t:'↑',fn:()=>apply(([x,y])=>[x,y+1])},{t:'↓',fn:()=>apply(([x,y])=>[x,y-1])},
        {t:'Reflect in x-axis',fn:()=>apply(TR.rx,'reflect in the x-axis')},{t:'Reflect in y-axis',fn:()=>apply(TR.ry,'reflect in the y-axis')},{t:'Rotate 90° ↻',go:true,fn:()=>apply(TR.r90,'rotate 90° clockwise')},{t:'Rotate 180°',fn:()=>apply(TR.r180,'rotate 180°')}];},
    demo(n){st.gh=null;st.ask=null;st.tgt=null;if(n==='tour'){st.pin=[0,0];draw();A.seq([[700,()=>{st.pin=[3,2];draw();A.say('(3, 2): quadrant I');}],[1100,()=>{st.pin=[-3,2];draw();A.say('(−3, 2): quadrant II');}],[1100,()=>{st.pin=[-3,-2];draw();A.say('(−3, −2): quadrant III');}],[1100,()=>{st.pin=[3,-2];draw();A.say('(3, −2): quadrant IV');}]]);}
      if(n==='combo'){st.sh=[[1,1],[1,4],[3,3]];draw();A.seq([[900,()=>apply(TR.ry,'reflect in the y-axis')],[1300,()=>apply(TR.r90,'then rotate 90° clockwise')]]);}},
    task(r){st.setup=true;st.ask=null;st.tgt=null;st.gh=null;let txt;
      if(r===0){st.pin=[0,0];st.tgt=[-rnd(1,5),pick([-1,1])*rnd(1,5)];draw();txt='Drag the pin to *('+sgn(st.tgt[0])+', '+sgn(st.tgt[1])+')*.';}
      else if(r===1){st.pin=[pick([-1,1])*rnd(1,5),pick([-1,1])*rnd(1,5)];draw();const a='('+sgn(st.pin[0])+', '+sgn(st.pin[1])+')';st.ask={ans:a,o:shuffle([a,'('+sgn(st.pin[1])+', '+sgn(st.pin[0])+')','('+sgn(-st.pin[0])+', '+sgn(st.pin[1])+')']).filter((x,i,arr)=>arr.indexOf(x)===i),ok:'Yes! Across first, then up or down.'};txt='What are the *coordinates* of the pin?';}
      else if(r===2){st.sh=[[1,1],[1,4],[3,3]];st.gh=st.sh.map(TR.rx);draw();txt='*Reflect* the flag in the *x-axis*. Make it match.';}
      else if(r===3){st.sh=[[1,1],[1,4],[3,3]];st.gh=st.sh.map(TR.ry).map(([x,y])=>[x,y-3]);draw();txt='Two moves: *reflect in the y-axis*, then *translate 3 down*.';}
      else{st.sh=[[1,1],[1,4],[3,3]];st.gh=st.sh.map(TR.r270);draw();txt='Rotate the flag *270° clockwise* about the origin. (Hint: that is 90° counterclockwise.)';}
      st.setup=false;return txt;}};}
});
function quad([x,y]){return !x||!y?null:x>0?(y>0?'I':'IV'):(y>0?'II':'III');}

/* =========================================================
   27. Converting metric units both ways
   ========================================================= */
const MU6={length:['km','hm','dam','m','dm','cm','mm'],mass:['kg','hg','dag','g','dg','cg','mg'],capacity:['kL','hL','daL','L','dL','cL','mL']};
const mf=(q,i)=>{const d=6-i;let s=String(q);if(d>0){s=s.padStart(d+1,'0');s=s.slice(0,s.length-d)+'.'+s.slice(s.length-d);s=s.replace(/0+$/,'').replace(/\.$/,'');}const [a,b]=s.split('.');return (a.length>=5?a.replace(/\B(?=(\d{3})+(?!\d))/g,' '):a)+(b?'.'+b:'');};
P.lesson({id:'convert6',title:'Converting metric units',strand:'Spatial Sense',codes:['E2.1'],
 guide:{goal:'Measure length, area, mass and capacity with appropriate metric units, and solve problems that convert smaller units to larger ones and larger units to smaller ones.',words:'convert, kilometre, metre, centimetre, millimetre, kilogram, gram, litre, millilitre, base ten',
  ask:['Why do you divide when you change grams to kilograms?','How many metres are in 2.5 km?','Which is longer: 1500 m or 1.2 km?'],home:'Read package labels: 750 mL, 1.5 L, 454 g. Change each to the other unit together.'},
 learn:[{say:'Up the stairs: divide by 10.',speech:'Going up the metric staircase to a bigger unit divides by ten at every step. Watch Malik’s two thousand five hundred metres climb to kilometres: two hundred fifty, twenty-five, two point five.',view:'model',demo:'up'},
        {say:'Read both directions.',speech:'Larger unit to smaller unit: multiply. Smaller unit to larger unit: divide. One kilometre is one thousand metres, so two thousand five hundred metres is two point five kilometres.',view:'read'},
        {say:'Watch: down the stairs.',speech:'Now four point two kilograms walks down to grams: forty-two, four hundred twenty, four thousand two hundred grams.',view:'model',demo:'down'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: walk the stairs.',speech:'Your turn. Move the ball up or down the staircase and watch the number change.',view:'model'}],
 fig:'A metric staircase. Up divides by 10; down multiplies by 10.',rz:.35,
 explore:['*▲ bigger unit* divides by 10.','*▼ smaller unit* multiplies by 10.','Switch *length*, *mass* and *capacity*.'],
 howTo:'Walk the ball to the unit in the question, then choose the converted amount.',
 init:k=>({kind:'length',q:2500000,i:3,start:3,hide:false,ask:null,need:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'To convert, count the *steps* between units. Each step is a factor of *10*.')+14;
  ['km','hm','dam','m','dm','cm','mm'].forEach((u,i)=>{const x=X0+i*118,h=200-i*24;rr(g,x,y+220-h,110,h,8);g.fillStyle=tint(['#c2410c','#ea580c','#f97316','#2f7de1','#16a36f','#e4572e','#8b5cf6'][i],.35);g.fill();T(g,u,x+55,y+220-h+36,FT.bodyB,INK,'center');});
  T(g,'÷10 going up',X0+600,y+40,FT.hand,'#c2410c');T(g,'×10 going down',X0+600,y+80,FT.hand,BLUE);y+=250;
  [['2500 m → km','÷ 1000 = 2.5 km'],['450 cm → m','÷ 100 = 4.5 m'],['3200 g → kg','÷ 1000 = 3.2 kg'],['4.2 km → m','× 1000 = 4200 m']].forEach(([a,b],i)=>{rr(g,X0,y+i*54,TW,46,12);g.fillStyle=tint(acc(),.08+i%2*.04);g.fill();T(g,a,X0+20,y+i*54+32,FT.bodyB);T(g,b,X0+TW-20,y+i*54+32,FT.bodyB,acc(),'right');});y+=230;
  y=keyWords(p,y,[['convert','change a measurement to another unit'],['base ten','each unit is 10 times the next smaller one']]);
  predict(p,y,S,'p27','Which is more: 1500 mL or 1.2 L?','*1500 mL.* 1.2 L = 1200 mL.');},
 readout(p,S,y){const g=p.g,st=S.st,U=MU6[st.kind];T(g,mf(st.q,st.start)+' '+U[st.start]+' = '+(st.hide&&st.i!==st.start?'?':mf(st.q,st.i))+' '+U[st.i],X0,y+52,ZS(46),acc());
  const d=st.i-st.start;T(g,d>0?'× '+Math.pow(10,d):d<0?'÷ '+Math.pow(10,-d):'Move the ball to convert.',X0,y+94,FT.bodyB);return y+100;},
 build(S,grp,mode,game){const st=S.st,cols=['#c2410c','#ea580c','#f97316','#2f7de1','#16a36f','#e4572e','#8b5cf6'];const stairs=new THREE.Group();grp.add(stairs);
  const ball=mk(new THREE.SphereGeometry(.2,22,16),lam('#ffd24a'),0);grp.add(ball);const tag=label('',{size:.26,bg:'#ffffff'});grp.add(tag);const xs=i=>-2.0+i*.66,hs=i=>1.5-i*.2;
  function drawS(){clearGroup(stairs);MU6[st.kind].forEach((u,i)=>{const b=mk(new THREE.BoxGeometry(.62,hs(i),1.0),lam(cols[i]),20);b.position.set(xs(i),hs(i)/2,-1.7);stairs.add(b);const l=label(u,{size:.24,color:'#fff'});l.position.set(xs(i),hs(i)-.2,-1.17);stairs.add(l);A.drag(b,{tap:()=>go(i)});});place(false);}
  function place(anim){const p=V(xs(st.i),hs(st.i)+.2,-1.7);if(anim)hop(ball,p,.35,.35);else ball.position.copy(p);tag.userData.set(st.hide&&st.i!==st.start?'? '+MU6[st.kind][st.i]:mf(st.q,st.i)+' '+MU6[st.kind][st.i]);tag.position.set(p.x,p.y+.6,-1.7);A.redraw();}
  function step(d){const ni=st.i+d;if(ni<0||ni>6)return;st.i=ni;A.pop();A.say(d>0?'× 10':'÷ 10');place(true);}
  function go(i){if(i===st.i)return;step(i>st.i?1:-1);if(Math.abs(i-st.i)>0)A.later(()=>go(i),420);}
  drawS();
  return {info:()=>mf(st.q,st.i)+' '+MU6[st.kind][st.i],
    controls:()=>{if(mode==='play'&&st.ask&&(st.need==null||st.i===st.need))return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok);
      const c=[{t:'▲ bigger unit (÷10)',big:true,fn:()=>step(-1)},{t:'▼ smaller unit (×10)',big:true,go:true,fn:()=>step(1)}];
      return mode==='learn'?c.concat(Object.keys(MU6).map(k=>({t:k,on:st.kind===k,fn:()=>{st.kind=k;drawS();}}))):c;},
    demo(n){st.hide=false;st.ask=null;st.need=null;if(n==='up'){st.kind='length';st.q=2500000;st.i=st.start=3;drawS();A.seq([[800,()=>step(-1)],[700,()=>step(-1)],[700,()=>step(-1)],[900,()=>A.say('2500 m = 2.5 km')]]);}
      if(n==='down'){st.kind='mass';st.q=4200000;st.i=st.start=0;drawS();A.seq([[800,()=>step(1)],[700,()=>step(1)],[700,()=>step(1)],[900,()=>A.say('4.2 kg = 4200 g')]]);}},
    task(r){st.setup=true;st.hide=true;const conv=(kind,from,to,val)=>{st.kind=kind;st.start=st.i=from;st.q=Math.round(val*Math.pow(10,6-from));st.need=to;drawS();const U=MU6[kind],a=mf(st.q,to);
        st.ask={ans:a,o:shuffle([a,mf(st.q,Math.max(0,to-1)),mf(st.q,Math.min(6,to+1))]).filter((x,i,arr)=>arr.indexOf(x)===i),ok:'Yes! '+mf(st.q,from)+' '+U[from]+' = '+a+' '+U[to]+'.'};return 'Convert *'+mf(st.q,from)+' '+U[from]+'* to *'+U[to]+'*. Move the ball, then choose.';};
      const txt=[()=>conv('length',3,0,rnd(12,95)*100),()=>conv('length',5,3,rnd(105,880)),()=>conv('mass',3,0,rnd(11,95)*100),()=>conv('capacity',6,3,rnd(125,950)),()=>conv('length',0,3,rnd(12,95)/10)][r]();st.setup=false;return txt;}};}
});

/* =========================================================
   28. Angles up to 360°
   ========================================================= */
P.lesson({id:'angles360',title:'Measuring angles up to 360°',strand:'Spatial Sense',codes:['E2.2'],
 guide:{goal:'Use a protractor to measure and construct angles up to 360°, and explain how an angle measured clockwise relates to the same angle measured counterclockwise.',words:'reflex angle, full turn, 360°, clockwise, counterclockwise, protractor',
  ask:['Why do clockwise and counterclockwise measures add to 360°?','How can a 180° protractor measure a 250° angle?','What kind of angle is 300°?'],home:'Stand facing the door, then turn 90°, 180°, 270° and 360° clockwise. Where are you facing each time?'},
 learn:[{say:'A full turn is 360°.',speech:'A full circle is three hundred sixty degrees. Angles bigger than one hundred eighty degrees are reflex angles. Watch Yuna’s arm sweep all the way around.',view:'model',demo:'sweep'},
        {say:'Read about clockwise and counterclockwise.',speech:'The same opening can be measured two ways. If it is one hundred ten degrees counterclockwise, it is two hundred fifty degrees clockwise, because together they make a full turn of three hundred sixty degrees.',view:'read'},
        {say:'Watch: measure a reflex angle.',speech:'To measure a reflex angle with a half-circle protractor, measure the smaller angle and subtract from three hundred sixty. Three hundred sixty minus one hundred ten is two hundred fifty.',view:'model',demo:'reflex'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: turn the arm.',speech:'Your turn. Drag the yellow tip all the way around. Read both measures.',view:'model'}],
 fig:'A full-circle protractor with a turning arm.',rz:.05,
 explore:['*Drag the yellow tip* around the circle.','Read the *counterclockwise* and *clockwise* measures.','They always add to *360°*.'],
 howTo:'Construct the angle, or read it and choose the answer.',
 init:k=>({a:250,ask:null,want:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'A full turn is *360°*. An angle between 180° and 360° is a *reflex* angle.')+16;
  const cx=X0+200,cy=y+170,R=150;g.beginPath();g.arc(cx,cy,R,0,Math.PI*2);g.fillStyle='#eef4ff';g.fill();g.strokeStyle='#2f7de1';g.lineWidth=3;g.stroke();
  for(let a=0;a<360;a+=30){const r=a*Math.PI/180;g.beginPath();g.moveTo(cx+Math.cos(r)*R,cy-Math.sin(r)*R);g.lineTo(cx+Math.cos(r)*(R-18),cy-Math.sin(r)*(R-18));g.stroke();T(g,String(a),cx+Math.cos(r)*(R+24),cy-Math.sin(r)*(R+24)+7,FT.cap,'#2f7de1','center');}
  g.beginPath();g.moveTo(cx,cy);g.arc(cx,cy,60,0,-250*Math.PI/180,true);g.closePath();g.fillStyle='rgba(228,87,46,.3)';g.fill();g.strokeStyle=INK;g.lineWidth=5;g.beginPath();g.moveTo(cx+R,cy);g.lineTo(cx,cy);g.lineTo(cx+Math.cos(250*Math.PI/180)*R,cy-Math.sin(250*Math.PI/180)*R);g.stroke();
  T(g,'250° counterclockwise',X0+410,y+120,FT.bodyB,'#e4572e');T(g,'= 110° clockwise',X0+410,y+160,FT.bodyB,'#2f7de1');T(g,'250 + 110 = 360',X0+410,y+210,ZS(34),acc());y+=360;
  y=keyWords(p,y,[['reflex angle','an angle greater than 180° and less than 360°'],['clockwise','turning the same way as the hands of a clock']]);
  predict(p,y,S,'p28','An angle is 75° clockwise. What is it counterclockwise?','*285°.* 360 − 75 = 285.');},
 readout(p,S,y){const g=p.g,st=S.st;T(g,st.a+'° counterclockwise',X0,y+50,ZS(44),'#e4572e');T(g,'= '+(360-st.a)%360+'° clockwise   ·   '+kind(st.a),X0,y+92,FT.bodyB,'#2f7de1');return y+100;},
 build(S,grp,mode,game){const st=S.st,Vx=V(0,.12,-1.75),L=1.3;
  const ring=new THREE.Mesh((()=>{const gg=new THREE.RingGeometry(1.0,1.4,96);gg.rotateX(-Math.PI/2);return gg;})(),new THREE.MeshLambertMaterial({color:'#bcd6ff',transparent:true,opacity:.55,side:THREE.DoubleSide}));ring.position.set(Vx.x,.06,Vx.z);grp.add(ring);
  for(let a=0;a<360;a+=10){const r=a*Math.PI/180,len=a%30===0?.22:.12;const t=new THREE.Mesh(G('a3t'+len,()=>new THREE.BoxGeometry(len,.015,.012)),lam('#2f7de1'));t.position.set(Vx.x+Math.cos(r)*(1.4-len/2),.08,Vx.z-Math.sin(r)*(1.4-len/2));t.rotation.y=r;grp.add(t);
    if(a%30===0){const l=label(String(a),{size:.14,color:'#2f7de1'});l.position.set(Vx.x+Math.cos(r)*1.58,.14,Vx.z-Math.sin(r)*1.58);grp.add(l);}}
  const arm=col=>{const m=mk(new THREE.BoxGeometry(L,.07,.08),lam(col),20);m.geometry.translate(L/2,0,0);return m;};const a1=arm(INK);a1.position.copy(Vx);grp.add(a1);const a2=arm(INK);a2.position.copy(Vx);grp.add(a2);
  const tip=mk(new THREE.SphereGeometry(.14,18,14),lam('#ffd24a'),0);grp.add(tip);let arcC=null,arcW=null;const lab=label('',{size:.28,bg:'#ffffff'});grp.add(lab);
  function draw(){const r=st.a*Math.PI/180;a2.rotation.y=r;tip.position.set(Vx.x+Math.cos(r)*L,.15,Vx.z-Math.sin(r)*L);[arcC,arcW].forEach(o=>{if(o){grp.remove(o);disposeObj(o);}});
    const g1=new THREE.RingGeometry(.35,.48,64,1,0,Math.max(.01,r));g1.rotateX(-Math.PI/2);arcC=new THREE.Mesh(g1,new THREE.MeshLambertMaterial({color:'#e4572e',side:THREE.DoubleSide}));arcC.position.set(Vx.x,.11,Vx.z);grp.add(arcC);
    const g2=new THREE.RingGeometry(.55,.62,64,1,r,Math.max(.01,2*Math.PI-r));g2.rotateX(-Math.PI/2);arcW=new THREE.Mesh(g2,new THREE.MeshLambertMaterial({color:'#2f7de1',side:THREE.DoubleSide,transparent:true,opacity:.7}));arcW.position.set(Vx.x,.1,Vx.z);grp.add(arcW);
    lab.userData.set(st.a+'° ↺   ·   '+(360-st.a)%360+'° ↻');lab.position.set(Vx.x,1.0,Vx.z-1.6);check();A.redraw();}
  function setA(a){a=((Math.round(a/5)*5)%360+360)%360;if(a===0)a=360;if(a===st.a)return;st.a=a;A.pop();draw();}
  A.drag(tip,{h:.15,move:pt=>{const lp=grp.worldToLocal(pt.clone());let a=Math.atan2(-(lp.z-Vx.z),lp.x-Vx.x)*180/Math.PI;if(a<0)a+=360;setA(a);},drop:()=>draw()});
  function check(){if(mode==='play'&&!st.setup&&st.want!=null&&st.a===st.want)game.solved('Yes! '+st.want+'° counterclockwise = '+(360-st.want)+'° clockwise.');}
  draw();
  return {info:()=>st.a+'°',
    controls:()=>{if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok,x=>x+'°');return [{t:'−10°',fn:()=>setA(st.a-10)},{t:'−5°',fn:()=>setA(st.a-5)},{t:'+5°',fn:()=>setA(st.a+5)},{t:'+10°',go:true,fn:()=>setA(st.a+10)},{t:'90°',fn:()=>setA(90)},{t:'180°',fn:()=>setA(180)},{t:'270°',fn:()=>setA(270)}];},
    demo(n){st.ask=null;st.want=null;if(n==='sweep'){st.a=10;draw();const l=[];for(let a=30;a<=360;a+=30)l.push([300,()=>setA(a)]);l.push([600,()=>A.say('360°: a full turn')]);A.seq(l);}if(n==='reflex'){st.a=110;draw();A.seq([[900,()=>{setA(250);A.say('360 − 110 = 250')}]]);}},
    task(r){st.setup=true;st.ask=null;st.want=null;
      if(r===0){st.a=30;st.want=pick([200,225,240,260]);}else if(r===1){st.a=60;st.want=pick([290,300,315,330]);}
      else if(r===2){st.a=pick([200,230,255,285,310]);st.ask={ans:st.a,o:shuffle([st.a,360-st.a,st.a-180]),ok:'Yes! It is a reflex angle of '+st.a+'°.'};}
      else if(r===3){st.a=pick([70,110,135,160]);const cw=360-st.a;st.ask={ans:cw,o:shuffle([cw,180-st.a,st.a]),ok:'Yes! 360 − '+st.a+' = '+cw+'.'};}
      else{st.a=30;const cw=pick([45,90,120]);st.want=360-cw;st.cw=cw;}
      draw();st.setup=false;
      return r<2?'Construct an angle of *'+st.want+'°* counterclockwise.':r===2?'This angle is measured counterclockwise. *How big is it?*':r===3?'This angle is *'+st.a+'°* counterclockwise. What is it *clockwise*?':'Make an angle of *'+st.cw+'° clockwise*. (What is that counterclockwise?)';}};}
});
function kind(a){return a<90?'acute':a===90?'right':a<180?'obtuse':a===180?'straight':a<360?'reflex':'full turn';}

/* =========================================================
   29. Angle relationships
   ========================================================= */
P.lesson({id:'anglerel6',title:'Supplementary, complementary and opposite angles',strand:'Spatial Sense',codes:['E2.3'],
 guide:{goal:'Use the properties of supplementary, complementary and opposite angles, and of the interior and exterior angles of triangles, to find unknown angle measures.',words:'supplementary, complementary, opposite angles, interior angle, exterior angle, straight angle',
  ask:['Why do supplementary angles add to 180°?','If one angle of a right-angle split is 35°, what is the other?','Why are opposite angles equal?'],home:'Look at scissors opening and closing. As one angle gets bigger, what happens to the opposite one? And the one beside it?'},
 learn:[{say:'Angles on a straight line.',speech:'Two angles that make a straight line are supplementary: they add to one hundred eighty degrees. Watch Ezra turn the ray. As one angle grows, the other shrinks.',view:'model',demo:'supp'},
        {say:'Read the four relationships.',speech:'Supplementary angles add to one hundred eighty. Complementary angles add to ninety. Opposite angles, where two lines cross, are equal. A triangle’s exterior angle equals the sum of the two opposite interior angles.',view:'read'},
        {say:'Watch: crossing lines.',speech:'When two lines cross, the opposite angles are always equal. Watch them change together.',view:'model',demo:'cross'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: find the unknown.',speech:'Your turn. Choose a diagram, drag the yellow tip, and see how the angles are related.',view:'model'}],
 fig:'Rays and lines with their angles shown as arcs.',rz:.15,
 explore:['Choose *Straight line*, *Right angle*, *Crossing lines* or *Triangle*.','*Drag the yellow tip* to turn the ray.','Watch the related angles change together.'],
 howTo:'Use the relationship to find the unknown angle, then choose the answer.',
 init:k=>({kind:'line',a:60,tri:[50,60],ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'Angles that share a vertex or a line are *related*. Use the relationships to find unknown angles.')+16;
  const cell=(i,title,rule,drawFn)=>{const x=X0+(i%2)*(TW/2+8),yy=y+Math.floor(i/2)*190;rr(g,x,yy,TW/2-8,180,14);g.fillStyle=tint(acc(),.07);g.fill();T(g,title,x+16,yy+32,FT.bodyB,acc());T(g,rule,x+16,yy+170,FT.small);drawFn(x+TW/4-4,yy+122);};
  const ln=(x1,y1,x2,y2)=>{g.strokeStyle=INK;g.lineWidth=4;g.beginPath();g.moveTo(x1,y1);g.lineTo(x2,y2);g.stroke();};
  cell(0,'Supplementary','a + b = 180°',(cx,cy)=>{ln(cx-120,cy,cx+120,cy);ln(cx,cy,cx+60,cy-80);T(g,'120°',cx-60,cy-18,FT.cap,'#e4572e');T(g,'60°',cx+70,cy-14,FT.cap,'#2f7de1');});
  cell(1,'Complementary','a + b = 90°',(cx,cy)=>{ln(cx-60,cy,cx+80,cy);ln(cx-60,cy,cx-60,cy-100);ln(cx-60,cy,cx+30,cy-70);T(g,'35°',cx+20,cy-14,FT.cap,'#2f7de1');T(g,'55°',cx-50,cy-70,FT.cap,'#e4572e');});
  cell(2,'Opposite','a = c, b = d',(cx,cy)=>{ln(cx-110,cy+40,cx+110,cy-40);ln(cx-110,cy-40,cx+110,cy+40);T(g,'40°',cx-80,cy+6,FT.cap,'#2f7de1');T(g,'40°',cx+60,cy+6,FT.cap,'#2f7de1');T(g,'140°',cx-18,cy-30,FT.cap,'#e4572e');});
  cell(3,'Exterior angle','ext = a + b',(cx,cy)=>{ln(cx-100,cy,cx+120,cy);ln(cx-100,cy,cx+10,cy-90);ln(cx+10,cy-90,cx+50,cy);T(g,'50°',cx-80,cy-10,FT.cap);T(g,'70°',cx,cy-60,FT.cap);T(g,'120°',cx+66,cy-12,FT.cap,'#e4572e');});y+=390;
  y=keyWords(p,y,[['supplementary','two angles that add to 180°'],['complementary','two angles that add to 90°']]);
  predict(p,y,S,'p29','Two lines cross. One angle is 115°. What are the other three?','*65°, 115° and 65°.* Neighbours are supplementary; opposites are equal.');},
 readout(p,S,y){const g=p.g,st=S.st,a=st.a;let t;if(st.kind==='line')t=a+'° + '+(180-a)+'° = 180°';else if(st.kind==='right')t=a+'° + '+(90-a)+'° = 90°';else if(st.kind==='cross')t=a+'°, '+(180-a)+'°, '+a+'°, '+(180-a)+'°';else{const [x,yv]=st.tri;t='interior '+x+'°, '+yv+'°, '+(180-x-yv)+'°  ·  exterior '+(x+yv)+'°';}
  T(g,t,X0,y+52,ZS(38),acc());return y+70;},
 build(S,grp,mode,game){const st=S.st,Vx=V(0,.12,-1.4),L=1.7;const g2=new THREE.Group();grp.add(g2);const tip=mk(new THREE.SphereGeometry(.14,18,14),lam('#ffd24a'),0);grp.add(tip);
  function line(a,b,col){g2.add(seg(a,b,col||INK,.035));}
  function arc(c,r,a0,a1,col,txt){if(a1-a0<.01)return;const gg=new THREE.RingGeometry(r,r+.1,48,1,a0,a1-a0);gg.rotateX(-Math.PI/2);const m=new THREE.Mesh(gg,new THREE.MeshLambertMaterial({color:col,side:THREE.DoubleSide}));m.position.set(c.x,.11,c.z);g2.add(m);
    const mid=(a0+a1)/2;const l=label(txt,{size:.22,bg:'#ffffff',border:col});l.position.set(c.x+Math.cos(mid)*(r+.38),.4,c.z-Math.sin(mid)*(r+.38));g2.add(l);}
  const P2=(c,ang,len)=>V(c.x+Math.cos(ang)*len,.12,c.z-Math.sin(ang)*len);
  function draw(){clearGroup(g2);const a=st.a*Math.PI/180;tip.visible=st.kind!=='tri';
    if(st.kind==='line'){line(P2(Vx,0,L),P2(Vx,Math.PI,L));line(Vx,P2(Vx,a,L*.9),'#334155');tip.position.copy(P2(Vx,a,L*.9));arc(Vx,.4,0,a,'#2f7de1',st.a+'°');arc(Vx,.55,a,Math.PI,'#e4572e',(180-st.a)+'°');}
    else if(st.kind==='right'){const C=V(-1.0,.12,-.7);line(C,P2(C,0,2.6));line(C,P2(C,Math.PI/2,2.2));line(C,P2(C,a,2.2),'#334155');tip.position.copy(P2(C,a,2.2));arc(C,.5,0,a,'#2f7de1',st.a+'°');arc(C,.7,a,Math.PI/2,'#e4572e',(90-st.a)+'°');
      [[.25,0,.25,.25],[0,.25,.25,.25]].forEach(([x1,z1,x2,z2])=>line(V(C.x+x1,.12,C.z-z1),V(C.x+x2,.12,C.z-z2),INK));}
    else if(st.kind==='cross'){line(P2(Vx,0,L),P2(Vx,Math.PI,L));line(P2(Vx,a,L),P2(Vx,a+Math.PI,L),'#334155');tip.position.copy(P2(Vx,a,L));arc(Vx,.4,0,a,'#2f7de1',st.a+'°');arc(Vx,.55,a,Math.PI,'#e4572e',(180-st.a)+'°');arc(Vx,.4,Math.PI,Math.PI+a,'#2f7de1',st.a+'°');arc(Vx,.55,Math.PI+a,2*Math.PI,'#e4572e',(180-st.a)+'°');}
    else{const [A1,B1]=st.tri.map(d=>d*Math.PI/180);const base=2.6,Ap=V(-1.6,.12,-.8),Bp=V(-1.6+base,.12,-.8);const C1=Math.PI-A1-B1;const ac=base*Math.sin(B1)/Math.sin(C1);const Cp=V(Ap.x+Math.cos(A1)*ac,.12,Ap.z-Math.sin(A1)*ac);
      line(Ap,Bp);line(Bp,Cp);line(Cp,Ap);line(Bp,V(Bp.x+1.0,.12,Bp.z),'#94a3b8');arc(Ap,.35,0,A1,'#2f7de1',st.tri[0]+'°');arc(Bp,.35,Math.PI-B1,Math.PI,'#16a36f',st.tri[1]+'°');
      const ang=Math.atan2(-(Ap.z-Cp.z),Ap.x-Cp.x),ang2=Math.atan2(-(Bp.z-Cp.z),Bp.x-Cp.x);arc(Cp,.3,Math.min(ang,ang2),Math.max(ang,ang2),'#f59e0b',(180-st.tri[0]-st.tri[1])+'°');arc(Bp,.5,0,Math.PI-B1,'#e4572e','ext '+(st.tri[0]+st.tri[1])+'°');}
    A.redraw();}
  function setA(a){const max=st.kind==='right'?85:175;a=Math.max(5,Math.min(max,Math.round(a/5)*5));if(a===st.a)return;st.a=a;A.pop();draw();}
  A.drag(tip,{h:.15,move:pt=>{const lp=grp.worldToLocal(pt.clone());const c=st.kind==='right'?V(-1.0,0,-.7):Vx;let a=Math.atan2(-(lp.z-c.z),lp.x-c.x)*180/Math.PI;if(a<0)a=a<-90?175:5;setA(a);},drop:()=>draw()});
  function setK(k){st.kind=k;if(k==='right'&&st.a>85)st.a=35;draw();}
  draw();
  return {info:()=>st.kind,
    controls:()=>{if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok,x=>x+'°');
      return [['line','Straight line'],['right','Right angle'],['cross','Crossing lines'],['tri','Triangle']].map(([k,t])=>({t,on:st.kind===k,fn:()=>setK(k)})).concat(st.kind==='tri'?[{t:'New triangle',fn:()=>{st.tri=[rnd(30,70),rnd(30,70)];draw();}}]:[{t:'−5°',fn:()=>setA(st.a-5)},{t:'+5°',go:true,fn:()=>setA(st.a+5)}]);},
    demo(n){st.ask=null;if(n==='supp'){setK('line');st.a=30;draw();const l=[];[45,60,90,120,150].forEach(a=>l.push([550,()=>setA(a)]));l.push([600,()=>A.say('Always 180° together')]);A.seq(l);}
      if(n==='cross'){setK('cross');st.a=40;draw();const l=[];[55,70,90,110,130].forEach(a=>l.push([550,()=>setA(a)]));A.seq(l);}},
    task(r){st.setup=true;let txt;
      if(r===0){st.kind='line';st.a=pick([35,50,65,110,125,140]);const ans=180-st.a;st.ask={ans,o:shuffle([ans,90-Math.min(st.a,89),st.a]).filter((x,i,a)=>a.indexOf(x)===i),ok:'Yes! 180 − '+st.a+' = '+ans+'.'};txt='The angles make a straight line. One is *'+st.a+'°*. Find the *supplementary* angle.';}
      else if(r===1){st.kind='right';st.a=pick([20,25,35,40,55,65]);const ans=90-st.a;st.ask={ans,o:shuffle([ans,180-st.a,st.a+10]),ok:'Yes! 90 − '+st.a+' = '+ans+'.'};txt='One part of a right angle is *'+st.a+'°*. Find the *complementary* angle.';}
      else if(r===2){st.kind='cross';st.a=pick([35,50,65,80]);st.ask={ans:st.a,o:shuffle([st.a,180-st.a,90-st.a]),ok:'Yes! Opposite angles are equal.'};txt='Two lines cross. One angle is *'+st.a+'°*. What is the *opposite* angle?';}
      else if(r===3){st.kind='tri';st.tri=[rnd(35,70),rnd(35,70)];const ans=180-st.tri[0]-st.tri[1];st.ask={ans,o:opts(ans,[10,-10,20],1),ok:'Yes! 180 − '+st.tri[0]+' − '+st.tri[1]+' = '+ans+'.'};txt='Find the *third interior angle* of the triangle.';}
      else{st.kind='tri';st.tri=[rnd(35,65),rnd(35,65)];const ans=st.tri[0]+st.tri[1];st.ask={ans,o:opts(ans,[10,-10,180-2*ans]).filter(v=>v>0),ok:'Yes! The exterior angle = '+st.tri[0]+' + '+st.tri[1]+' = '+ans+'.'};txt='Find the *exterior angle* at the right corner.';}
      draw();st.setup=false;return txt;}};}
});

/* =========================================================
   30. Area of trapezoids, rhombuses, kites and composites
   ========================================================= */
P.lesson({id:'area6',title:'Areas by decomposing shapes',strand:'Spatial Sense',codes:['E2.4'],
 guide:{goal:'Determine the areas of trapezoids, rhombuses, kites and composite polygons by decomposing them into shapes with known areas.',words:'decompose, trapezoid, rhombus, kite, composite polygon, diagonal, area',
  ask:['How can a trapezoid be split into a rectangle and two triangles?','Why is the area of a rhombus half of diagonal × diagonal?','How would you find the area of an L-shaped room?'],home:'Measure an L-shaped room or garden. Split it into two rectangles and add their areas.'},
 learn:[{say:'Split into shapes you know.',speech:'Lucia’s trapezoid splits into a rectangle and two triangles. Watch the pieces lift apart. Add their areas to get the area of the trapezoid.',view:'model',demo:'trap'},
        {say:'Read the shortcuts.',speech:'Trapezoid: add the parallel sides, multiply by the height, and divide by two. Rhombus and kite: multiply the diagonals and divide by two. Composite shapes: split, find each area, then add.',view:'read'},
        {say:'Watch: a kite.',speech:'A kite splits along a diagonal into two triangles. Each triangle has the other diagonal as its base.',view:'model',demo:'kite'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: decompose.',speech:'Your turn. Choose a shape and press Decompose to split it into pieces with known areas.',view:'model'}],
 fig:'Shapes on a centimetre grid that split into rectangles and triangles.',rz:.3,
 explore:['Choose *trapezoid*, *rhombus*, *kite* or *composite*.','Press *Decompose* to lift the pieces apart.','Each piece shows its own *area*.'],
 howTo:'Decompose the shape, add the piece areas, and choose the total.',
 init:k=>({kind:'trap',p:{b:8,a:4,o:2,h:4},split:false,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'*Decompose* a shape into rectangles and triangles, find each area, then *add*.')+14;
  const s=28,ox=X0+20,oy=y+150;g.fillStyle=tint('#2f7de1',.35);g.fillRect(ox+2*s,oy-4*s,4*s,4*s);g.fillStyle=tint('#e4572e',.35);g.beginPath();g.moveTo(ox,oy);g.lineTo(ox+2*s,oy);g.lineTo(ox+2*s,oy-4*s);g.closePath();g.fill();g.beginPath();g.moveTo(ox+6*s,oy);g.lineTo(ox+8*s,oy);g.lineTo(ox+6*s,oy-4*s);g.closePath();g.fill();
  g.strokeStyle=INK;g.lineWidth=3;g.beginPath();g.moveTo(ox,oy);g.lineTo(ox+8*s,oy);g.lineTo(ox+6*s,oy-4*s);g.lineTo(ox+2*s,oy-4*s);g.closePath();g.stroke();T(g,'4 + 16 + 4 = 24',ox+250,oy-60,FT.bodyB);T(g,'(8 + 4) × 4 ÷ 2 = 24 cm²',ox+250,oy-20,FT.bodyB,acc());y+=180;
  [['Trapezoid','A = (a + b) × h ÷ 2'],['Rhombus / kite','A = d₁ × d₂ ÷ 2'],['Composite','split, find each area, add']].forEach(([a,b],i)=>{rr(g,X0,y+i*56,TW,48,12);g.fillStyle=tint(acc(),.1);g.fill();T(g,a,X0+20,y+i*56+33,FT.bodyB,acc());T(g,b,X0+280,y+i*56+33,FT.body);});y+=190;
  y=keyWords(p,y,[['decompose','break a shape into simpler shapes'],['composite polygon','a shape made of two or more simpler polygons']]);
  predict(p,y,S,'p30','A rhombus has diagonals of 6 cm and 8 cm. What is its area?','*24 cm².* 6 × 8 ÷ 2 = 24.');},
 readout(p,S,y){const g=p.g,st=S.st,pc=pieces(st);T(g,pc.map(q=>q.a).join(' + ')+' = '+pc.reduce((s,q)=>s+q.a,0)+' cm²',X0,y+50,ZS(42),acc());T(g,form(st),X0,y+92,FT.bodyB);return y+100;},
 build(S,grp,mode,game){const st=S.st,c=.32,x0=-1.95,zb=-.55,NX=12,NY=8;const X=x=>x0+x*c,Z=y=>zb-y*c;
  const base=mk(new THREE.BoxGeometry(NX*c+.1,.03,NY*c+.1),[lam('#f3f6fb'),lam('#f3f6fb'),cellMat('#ffffff',NX,NY),lam('#f3f6fb'),lam('#f3f6fb'),lam('#f3f6fb')],20);base.position.set(X(NX/2),.015,Z(NY/2));grp.add(base);
  const sh=new THREE.Group();grp.add(sh);const COL=['#2f7de1','#e4572e','#16a36f','#f59e0b'];
  function draw(){clearGroup(sh);const pc=pieces(st);pc.forEach((q,i)=>{const g=new THREE.Group();const m=slab(q.pts.map(([x,y])=>[X(x),Z(y)]),COL[i%4],.1,.9);g.add(m);sh.add(g);
      const cxp=q.pts.reduce((s,p)=>s+p[0],0)/q.pts.length,cyp=q.pts.reduce((s,p)=>s+p[1],0)/q.pts.length;const l=label(q.a+' cm²',{size:.18,bg:'#ffffff',border:COL[i%4]});l.position.set(X(cxp),.35,Z(cyp));l.visible=st.split;g.add(l);
      if(st.split){const off=V(X(cxp)-X(cent(pc)[0]),0,Z(cyp)-Z(cent(pc)[1])).multiplyScalar(.18);g.position.copy(off);g.position.y=.12;}});
    const out=outline(st);const P3=out.map(([x,y])=>V(X(x),.14,Z(y)));for(let i=0;i<P3.length;i++)sh.add(seg(P3[i],P3[(i+1)%P3.length],INK,.018));A.redraw();}
  function decomp(){st.split=!st.split;A.pop();draw();if(st.split)A.say(pieces(st).map(q=>q.a).join(' + ')+' = '+pieces(st).reduce((s,q)=>s+q.a,0)+' cm²');}
  function setK(k){st.kind=k;st.split=false;st.p=k==='trap'?{b:8,a:4,o:2,h:4}:k==='rhom'?{d1:8,d2:6}:k==='kite'?{d1:6,d2:7,p:2}:{w1:8,h1:3,w2:3,h2:4};draw();}
  draw();
  return {info:()=>pieces(st).reduce((s,q)=>s+q.a,0)+' cm²',
    controls:()=>{const c2=[{t:st.split?'Put together':'Decompose',go:true,fn:decomp}];if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok,x=>x+' cm²').concat(c2);
      return [['trap','Trapezoid'],['rhom','Rhombus'],['kite','Kite'],['comp','Composite']].map(([k,t])=>({t,on:st.kind===k,fn:()=>setK(k)})).concat(c2);},
    demo(n){st.ask=null;if(n==='trap'){setK('trap');A.seq([[900,decomp]]);}if(n==='kite'){setK('kite');A.seq([[900,decomp]]);}},
    task(r){st.setup=true;st.split=false;let txt;
      if(r===0){st.kind='trap';const a=rnd(2,4)*1,o=rnd(1,3),h=rnd(2,6),b=a+o+rnd(1,3);st.p={b,a,o,h};txt='Find the area of the *trapezoid*.';}
      else if(r===1){st.kind='rhom';st.p={d1:pick([6,8,10]),d2:pick([4,6])};txt='Find the area of the *rhombus*.';}
      else if(r===2){st.kind='kite';st.p={d1:pick([4,6,8]),d2:pick([6,7]),p:2};txt='Find the area of the *kite*.';}
      else if(r===3){st.kind='comp';st.p={w1:rnd(6,10),h1:rnd(2,3),w2:rnd(2,4),h2:rnd(2,4)};txt='Find the area of the *composite* (L-shaped) polygon.';}
      else{st.kind='house';st.p={w:pick([6,8]),h:3,r:2};txt='A house shape: a rectangle with a triangle roof. Find the *total area*.';}
      const tot=pieces(st).reduce((s,q)=>s+q.a,0);st.ask={ans:tot,o:opts(tot,[4,-4,tot,-2],1).filter(v=>v>0),ok:'Yes! '+pieces(st).map(q=>q.a).join(' + ')+' = '+tot+' cm².'};draw();st.setup=false;return txt;}};}
});
function pieces(st){const p=st.p;const tri=(pts)=>({pts,a:Math.abs((pts[1][0]-pts[0][0])*(pts[2][1]-pts[0][1])-(pts[2][0]-pts[0][0])*(pts[1][1]-pts[0][1]))/2});const rect=(x,y,w,h)=>({pts:[[x,y],[x+w,y],[x+w,y+h],[x,y+h]],a:w*h});
  if(st.kind==='trap'){const x0=1;const L=[[x0,0],[x0+p.o,0],[x0+p.o,p.h]],R=[[x0+p.o+p.a,0],[x0+p.b,0],[x0+p.o+p.a,p.h]];return [tri(L),rect(x0+p.o,0,p.a,p.h),tri(R)];}
  if(st.kind==='rhom'){const cx=6,cy=4,h1=p.d1/2,h2=p.d2/2;return [tri([[cx-h1,cy],[cx+h1,cy],[cx,cy+h2]]),tri([[cx-h1,cy],[cx+h1,cy],[cx,cy-h2]])];}
  if(st.kind==='kite'){const cx=6,cy=1+p.p,h1=p.d1/2;return [tri([[cx-h1,cy],[cx+h1,cy],[cx,cy+p.d2-p.p]]),tri([[cx-h1,cy],[cx+h1,cy],[cx,cy-p.p]])];}
  if(st.kind==='comp')return [rect(1,0,p.w1,p.h1),rect(1,p.h1,p.w2,p.h2)];
  return [rect(2,0,p.w,p.h),tri([[2,p.h],[2+p.w,p.h],[2+p.w/2,p.h+p.r]])];}
function outline(st){const p=st.p;if(st.kind==='trap')return [[1,0],[1+p.b,0],[1+p.o+p.a,p.h],[1+p.o,p.h]];if(st.kind==='rhom')return [[6-p.d1/2,4],[6,4-p.d2/2],[6+p.d1/2,4],[6,4+p.d2/2]];
  if(st.kind==='kite'){const cy=1+p.p;return [[6-p.d1/2,cy],[6,cy-p.p],[6+p.d1/2,cy],[6,cy+p.d2-p.p]];}if(st.kind==='comp')return [[1,0],[1+p.w1,0],[1+p.w1,p.h1],[1+p.w2,p.h1],[1+p.w2,p.h1+p.h2],[1,p.h1+p.h2]];
  return [[2,0],[2+p.w,0],[2+p.w,p.h],[2+p.w/2,p.h+p.r],[2,p.h]];}
function cent(pc){const all=pc.flatMap(q=>q.pts);return [all.reduce((s,p)=>s+p[0],0)/all.length,all.reduce((s,p)=>s+p[1],0)/all.length];}
function form(st){const p=st.p;if(st.kind==='trap')return '('+p.a+' + '+p.b+') × '+p.h+' ÷ 2 = '+(p.a+p.b)*p.h/2;if(st.kind==='rhom'||st.kind==='kite')return p.d1+' × '+p.d2+' ÷ 2 = '+p.d1*p.d2/2;if(st.kind==='comp')return p.w1+' × '+p.h1+' + '+p.w2+' × '+p.h2;return p.w+' × '+p.h+' + '+p.w+' × '+p.r+' ÷ 2';}

/* =========================================================
   31. Nets and surface area
   ========================================================= */
const NETS={cube:{n:'cube',root:{w:4,d:4,ch:[['E',{o:4,a:4,ch:[]}],['W',{o:4,a:4,ch:[]}],['N',{o:4,a:4,ch:[['E',{o:4,a:4,ch:[]}]]}],['S',{o:4,a:4,ch:[]}]]},ang:90},
  prism:{n:'rectangular prism',root:{w:6,d:3,ch:[['E',{o:2,a:3,ch:[]}],['W',{o:2,a:3,ch:[]}],['N',{o:2,a:6,ch:[['E',{o:3,a:6,ch:[]}]]}],['S',{o:2,a:6,ch:[]}]]},ang:90},
  tri:{n:'triangular prism',root:{w:6,d:6,ch:[['E',{o:5,a:6,ch:[]},126.87],['W',{o:5,a:6,ch:[]},126.87],['N',{o:4,a:6,tri:true,ch:[]},90],['S',{o:4,a:6,tri:true,ch:[]},90]]},ang:90},
  pyr:{n:'square pyramid',root:{w:6,d:6,ch:[['E',{o:5,a:6,tri:true,ch:[]}],['W',{o:5,a:6,tri:true,ch:[]}],['N',{o:5,a:6,tri:true,ch:[]}],['S',{o:5,a:6,tri:true,ch:[]}]]},ang:126.87}};
P.lesson({id:'nets6',title:'Nets and surface area',strand:'Spatial Sense',codes:['E2.5','E2.6'],
 guide:{goal:'Create and use nets to show the relationship between the faces of prisms and pyramids and their surface areas, and determine surface area by adding the areas of the faces.',words:'net, face, prism, pyramid, surface area, fold, square units',
  ask:['How does a net help you find surface area?','How many faces does a triangular prism have? What shapes are they?','Why do opposite faces of a rectangular prism have the same area?'],home:'Unfold a cereal box. Measure each face, find its area, and add them all to get the surface area.'},
 learn:[{say:'A net folds into a solid.',speech:'A net is a flat pattern that folds into a three-dimensional object. Watch Arjun’s net fold up into a rectangular prism.',view:'model',demo:'fold'},
        {say:'Read about surface area.',speech:'Surface area is the total area of all the faces. Unfold the object into its net, find the area of each face, and add them together.',view:'read'},
        {say:'Watch: a pyramid.',speech:'A square pyramid has a square base and four triangle faces. Six times six is thirty-six, and each triangle is six times five divided by two, which is fifteen. Thirty-six plus sixty is ninety-six square centimetres.',view:'model',demo:'pyr'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: fold and measure.',speech:'Your turn. Choose a solid, fold and unfold its net, and read the area of each face.',view:'model'}],
 fig:'A net folding into a prism or pyramid. Each face shows its area.',rz:.3,
 explore:['Choose *cube*, *rectangular prism*, *triangular prism* or *pyramid*.','Press *Fold* and *Unfold*.','Add the *face areas* for the surface area.'],
 howTo:'Fold the net, read the faces, then choose the surface area or answer.',
 init:k=>({k:'prism',f:0,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'A *net* is a flat pattern of faces. *Surface area* = the sum of the areas of all the faces.')+14;
  const s=34,ox=X0+40,oy=y+20;const R=(x,yy,w,h,col,t)=>{rr(g,ox+x*s,oy+yy*s,w*s-3,h*s-3,4);g.fillStyle=tint(col,.4);g.fill();g.strokeStyle=col;g.lineWidth=2;g.stroke();T(g,t,ox+(x+w/2)*s,oy+(yy+h/2)*s+8,FT.cap,INK,'center');};
  R(2,0,6,2,'#16a36f','12');R(2,2,6,3,'#2f7de1','18');R(0,2,2,3,'#e4572e','6');R(8,2,2,3,'#e4572e','6');R(2,5,6,2,'#16a36f','12');R(2,7,6,3,'#2f7de1','18');
  T(g,'6 × 3 × 2 prism',X0+430,y+60,FT.bodyB);T(g,'2 × 18 + 2 × 12 + 2 × 6',X0+430,y+110,FT.body);T(g,'= 72 cm²',X0+430,y+160,ZS(44),acc());y+=370;
  [['Cube','6 equal squares'],['Rectangular prism','3 pairs of equal rectangles'],['Triangular prism','2 triangles + 3 rectangles'],['Square pyramid','1 square + 4 triangles']].forEach(([a,b],i)=>{T(g,a,X0,y+i*40,FT.bodyB,acc());T(g,b,X0+300,y+i*40,FT.body);});y+=170;
  y=keyWords(p,y,[['net','a flat pattern that folds into a 3D object'],['surface area','the total area of all the faces']]);
  predict(p,y,S,'p31','What is the surface area of a cube with 4 cm edges?','*96 cm².* 6 faces × 16 cm² = 96 cm².');},
 readout(p,S,y){const g=p.g,st=S.st,f=faces(NETS[st.k].root);T(g,NETS[st.k].n+': '+f.length+' faces',X0,y+44,FT.bodyB,acc());T(g,'SA = '+f.join(' + ')+' = '+f.reduce((a,b)=>a+b,0)+' cm²',X0,y+86,FT.bodyB);return y+96;},
 build(S,grp,mode,game){const st=S.st,u=.2;const root=new THREE.Group();root.position.set(0,.02,-1.7);grp.add(root);let folds=[];const COL=['#2f7de1','#e4572e','#16a36f','#f59e0b','#8b5cf6','#0fa5a5'];let ci=0;
  function face(w,d,tri,col,area){const g=new THREE.Group();let m;if(tri){const s=new THREE.Shape();s.moveTo(0,-d/2);s.lineTo(0,d/2);s.lineTo(w,0);s.closePath();const geo=new THREE.ExtrudeGeometry(s,{depth:.03,bevelEnabled:false});geo.rotateX(-Math.PI/2);m=mk(geo,new THREE.MeshLambertMaterial({color:col,side:THREE.DoubleSide}),20);}
    else{m=mk(new THREE.BoxGeometry(w,.03,d),lam(col),20);m.position.x=w/2;}g.add(m);const l=label(area+' cm²',{size:.15,color:INK,bg:'#ffffff'});l.position.set(tri?w/3:w/2,.12,0);g.add(l);return g;}
  function build(){clearGroup(root);folds=[];ci=0;const N=NETS[st.k],r=N.root;const base=new THREE.Group();const bm=mk(new THREE.BoxGeometry(r.w*u,.03,r.d*u),lam(COL[ci++%6]),20);base.add(bm);const bl=label(r.w*r.d+' cm²',{size:.15,bg:'#ffffff'});bl.position.y=.12;base.add(bl);root.add(base);
    const attach=(parent,w,d,ch,offX)=>{ch.forEach(([e,node,ang])=>{const hinge=new THREE.Group();const dirA={E:0,N:Math.PI/2,W:Math.PI,S:-Math.PI/2}[e];hinge.rotation.y=dirA;
        const ext=(e==='E'||e==='W')?w/2:d/2;hinge.position.set(offX+Math.cos(dirA)*ext,0,-Math.sin(dirA)*ext);parent.add(hinge);const fold=new THREE.Group();hinge.add(fold);
        const area=node.tri?node.o*node.a/2:node.o*node.a;const f=face(node.o*u,node.a*u,node.tri,COL[ci++%6],area);fold.add(f);folds.push({g:fold,ang:(ang||N.ang)*Math.PI/180});
        if(node.ch.length){const sub=new THREE.Group();fold.add(sub);attach(sub,node.o*u,node.a*u,node.ch.map(c=>c),node.o*u/2);sub.position.x=0;}});};
    attach(root,r.w*u,r.d*u,r.ch,0);setFold(st.f);}
  function setFold(k){st.f=k;folds.forEach(f=>f.g.rotation.z=f.ang*k);root.position.y=.02;A.redraw();}
  function animFold(to){const k0=st.f;tween(1.6,k=>setFold(k0+(to-k0)*k)).then(()=>{A.pop();A.say(to?'Folded into a '+NETS[st.k].n+'!':'Unfolded: the net');});}
  build();
  return {tick(dt,t){root.rotation.y=st.f>.5?Math.sin(t*.5)*.4:0;},info:()=>NETS[st.k].n,
    controls:()=>{const c=[{t:'Fold',go:true,fn:()=>animFold(1)},{t:'Unfold',fn:()=>animFold(0)}];if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);
      return Object.keys(NETS).map(k=>({t:NETS[k].n,on:st.k===k,fn:()=>{st.k=k;st.f=0;build();}})).concat(c);},
    demo(n){st.ask=null;st.k=n==='pyr'?'pyr':'prism';st.f=0;build();A.seq([[900,()=>animFold(1)],[2600,()=>animFold(0)]]);},
    task(r){st.setup=true;st.f=0;let txt;const k=['cube','prism','tri','pyr','tri'][r];st.k=k;build();const f=faces(NETS[k].root),sa=f.reduce((a,b)=>a+b,0);
      if(r<4){st.ask={ans:sa+' cm²',o:shuffle([sa+' cm²',(sa-f[0])+' cm²',(sa+f[0])+' cm²']),ok:'Yes! '+f.join(' + ')+' = '+sa+' cm².'};txt='Find the *surface area* of the '+NETS[k].n+'. Fold it to check the faces.';}
      else{st.ask={ans:'5',o:['5','6','4'],ok:'Yes! 2 triangles and 3 rectangles.'};txt='How many *faces* does a triangular prism have?';}
      st.setup=false;return txt;}};}
});
function faces(r){const out=[r.w*r.d];const walk=ch=>ch.forEach(([e,n])=>{out.push(n.tri?n.o*n.a/2:n.o*n.a);walk(n.ch);});walk(r.ch);return out;}

/* =========================================================
   32. Payment methods and sharing resources
   ========================================================= */
const PAY6=[['Cash','accepted almost everywhere; easy to track','can be lost or stolen; no record'],['Debit card','money comes straight from your account; safe','can spend money you need; possible fees'],['Credit card','buy now, pay later; builds credit history','interest if not paid in full; easy to overspend'],['Mobile pay / e-transfer','fast and contactless','needs a phone and internet; scams'],['Cheque','safe for large amounts; has a record','slow; not accepted everywhere']];
const FLOW=[['Trading','swap one thing for another','Chloe trades her book for Malik’s ball.'],['Lending','give something to be returned later','Chloe lends Malik $10; he pays it back.'],['Borrowing','take something you will return','Malik borrows $10 from the bank and repays it with interest.'],['Donating','give something with nothing back','Chloe donates $5 to a food bank.']];
P.lesson({id:'pay6',title:'Paying, trading, lending and donating',strand:'Financial Literacy',codes:['F1.1','F1.5'],
 guide:{goal:'Describe the advantages and disadvantages of different methods of payment, and describe trading, lending, borrowing and donating as ways to distribute financial and other resources.',words:'cash, debit, credit, mobile payment, cheque, trade, lend, borrow, donate, interest',
  ask:['Why might someone choose debit instead of credit?','What is the difference between lending and donating?','When you borrow from a bank, why do you pay back more?'],home:'Talk about the payment methods your family uses. What is one advantage and one disadvantage of each?'},
 learn:[{say:'Four ways resources move.',speech:'Resources move between people in different ways. Watch Chloe and Malik trade, lend, borrow and donate.',view:'model',demo:'flow'},
        {say:'Read about payment methods.',speech:'Each payment method has advantages and disadvantages. Cash is accepted almost everywhere but can be lost. Credit lets you buy now and pay later, but you may pay interest.',view:'read'},
        {say:'Watch: borrowing with interest.',speech:'Malik borrows ten dollars from the bank. When he pays it back, he adds one dollar of interest. Borrowing costs money.',view:'model',demo:'borrow'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: try each action.',speech:'Your turn. Press Trade, Lend, Borrow or Donate, and watch where things go.',view:'model'}],
 fig:'Chloe, Malik, a bank and a food bank. Things move between them.',rz:.35,
 explore:['Press *Trade*, *Lend*, *Borrow* or *Donate*.','Watch who ends up with what.','Read the payment methods on the left page.'],
 howTo:'Read the situation, then choose the right word or payment method.',
 init:k=>({ask:null,last:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'Every *payment method* has pros and cons.')+10;
  PAY6.forEach(([a,b,c],i)=>{rr(g,X0,y,TW,82,12);g.fillStyle=tint(acc(),.06+i%2*.05);g.fill();T(g,a,X0+16,y+30,FT.bodyB,acc());wrap(g,'+ '+b,X0+16,y+56,TW/2-20,24,{font:FT.cap,color:'#15803d'});wrap(g,'− '+c,X0+TW/2,y+56,TW/2-16,24,{font:FT.cap,color:RED});y+=88;});y+=8;
  FLOW.forEach(([a,b])=>{T(g,a,X0,y+24,FT.bodyB,acc());T(g,b,X0+170,y+24,FT.small);y+=34;});y+=10;
  predict(p,y,S,'p32','Chloe gives her old bike to a family who needs one. Is that trading, lending or donating?','*Donating.* She gives it and gets nothing back.');},
 readout(p,S,y){const g=p.g,st=S.st;const f=FLOW.find(q=>q[0]===st.last);T(g,f?f[0]+': '+f[2]:'Choose an action.',X0,y+46,FT.bodyB,acc());return y+60;},
 build(S,grp,mode,game){const st=S.st;const person=(col,x,z,name)=>{const g=new THREE.Group();const b=mk(new THREE.CylinderGeometry(.22,.28,.7,18),lam(col),20);b.position.y=.35;g.add(b);const h=mk(new THREE.SphereGeometry(.2,18,14),lam('#f2c9a0'),20);h.position.y=.88;g.add(h);
    const l=label(name,{size:.22,color:col});l.position.y=1.3;g.add(l);g.position.set(x,0,z);grp.add(g);return g;};
  const ava=person('#e4572e',-1.1,-1.3,'Chloe'),ben=person('#2f7de1',1.1,-1.3,'Malik');
  const bank=new THREE.Group();bank.position.set(-1.8,0,-2.8);grp.add(bank);const bb=mk(new THREE.BoxGeometry(.9,.6,.6),lam('#e5e7eb'),20);bb.position.y=.3;bank.add(bb);const roof=mk(new THREE.ConeGeometry(.6,.3,4),lam('#64748b'),20);roof.rotation.y=Math.PI/4;roof.position.y=.75;bank.add(roof);const bl=label('Bank',{size:.18});bl.position.y=1.05;bank.add(bl);
  const fb=new THREE.Group();fb.position.set(1.8,0,-2.8);grp.add(fb);const fbb=mk(new THREE.BoxGeometry(.7,.5,.5),lam('#fde68a'),20);fbb.position.y=.25;fb.add(fbb);const fl=label('Food bank',{size:.16});fl.position.y=.75;fb.add(fl);
  const coin=()=>mk(G('pc6c',()=>new THREE.CylinderGeometry(.12,.12,.04,18)),lam('#e6c15a'),0);
  const book=mk(new THREE.BoxGeometry(.3,.08,.22),lam('#16a36f'),20),ball=mk(new THREE.SphereGeometry(.14,16,12),lam('#f59e0b'),0);book.position.set(-1.1,.5,-.9);ball.position.set(1.1,.5,-.9);grp.add(book,ball);
  const fly=(o,to,h)=>hop(o,to,h||.8,.6);let busy=false;
  function act(k){if(busy)return;busy=true;st.last=k;A.pop();
    if(k==='Trading'){const pa=book.position.clone(),pb=ball.position.clone();fly(book,pb);fly(ball,pa);A.later(()=>{busy=false;},900);}
    else if(k==='Lending'){const c=coin();c.position.set(-1.1,.6,-.9);grp.add(c);fly(c,V(1.1,.6,-.9)).then(()=>A.later(()=>fly(c,V(-1.1,.6,-.9)).then(()=>{grp.remove(c);busy=false;}),500));}
    else if(k==='Borrowing'){const c=coin();c.position.set(-1.8,.7,-2.8);grp.add(c);fly(c,V(1.1,.6,-.9)).then(()=>A.later(()=>{const c2=coin();c2.position.set(1.15,.66,-.9);grp.add(c2);c2.material=lam('#f59e0b');fly(c,V(-1.8,.7,-2.8));fly(c2,V(-1.75,.75,-2.8)).then(()=>{grp.remove(c);grp.remove(c2);busy=false;A.say('Paid back with interest!');});},500));}
    else{const c=coin();c.position.set(-1.1,.6,-.9);grp.add(c);fly(c,V(1.8,.6,-2.8)).then(()=>{grp.remove(c);busy=false;});}A.redraw();}
  return {info:()=>st.last||'Choose an action',
    controls:()=>{const c=FLOW.map(([k])=>({t:k.replace('ing',''),fn:()=>act(k)}));if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);return c;},
    demo(n){st.ask=null;if(n==='flow')A.seq([[600,()=>act('Trading')],[1400,()=>act('Lending')],[2200,()=>act('Donating')]]);if(n==='borrow')A.seq([[600,()=>act('Borrowing')]]);},
    task(r){st.setup=true;let txt;
      if(r===0){const f=pick(FLOW);st.ask={ans:f[0],o:FLOW.map(q=>q[0]),ok:'Yes! '+f[0]+': '+f[1]+'.'};txt=f[2].replace('Chloe','Yuna').replace('Malik','Arjun')+' *Which is it?*';}
      else if(r===1){st.ask={ans:'Credit card',o:shuffle(['Credit card','Debit card','Cash']),ok:'Yes! Credit can charge interest if you do not pay in full.'};txt='Which payment method can charge *interest* if you do not pay the bill in full?';}
      else if(r===2){st.ask={ans:'Cash',o:shuffle(['Cash','Cheque','Credit card']),ok:'Yes! Cash leaves no record and can be lost.'};txt='Which method is accepted almost everywhere but leaves *no record* and can be *lost*?';}
      else if(r===3){st.ask={ans:'Debit card',o:shuffle(['Debit card','Credit card','Cheque']),ok:'Yes! Debit takes money straight from your account.'};txt='Which method takes money *straight from your bank account*?';}
      else{st.ask={ans:'$22',o:shuffle(['$22','$20','$2']),ok:'Yes! $20 + 10% ($2) = $22.'};txt='You *borrow $20* and pay *10% interest*. How much do you pay back?';}
      st.setup=false;return txt;}};}
});

/* =========================================================
   33. Financial goals and interest
   ========================================================= */
P.lesson({id:'goals6',title:'Financial goals and interest',strand:'Financial Literacy',codes:['F1.2','F1.3','F1.4'],
 guide:{goal:'Identify types of financial goals and the steps to reach them, describe factors that help or interfere with reaching them, and explain interest rates and fees on accounts and loans.',words:'financial goal, short-term, long-term, saving, earning, interest rate, fee, account, loan',
  ask:['What is the difference between a short-term and a long-term goal?','How does interest help a savings goal? How does a fee hurt it?','Why do loans charge interest?'],home:'Choose a savings goal together. Plan how much to save each week, and list what could help or get in the way.'},
 learn:[{say:'Interest helps savings grow.',speech:'Malik saves fifty dollars a year in an account that pays four percent interest. Watch the bars grow. The gold part is interest: money the bank pays him for saving.',view:'model',demo:'grow'},
        {say:'Read about goals and interest.',speech:'Set a goal, make a plan, and track your progress. Interest on savings helps you. Fees and borrowing at high interest work against you.',view:'read'},
        {say:'Watch: a fee.',speech:'Now the account charges a monthly fee of one dollar. Twelve dollars a year comes out. The goal takes longer to reach.',view:'model',demo:'fee'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: plan your savings.',speech:'Your turn. Change the yearly deposit, the interest rate and the fee, and see when you reach your goal.',view:'model'}],
 fig:'Savings growing over 5 years: deposits, interest and fees.',rz:.3,
 explore:['Change the *deposit*, the *interest rate* and the *fee*.','Gold blocks are *interest*; red marks are *fees*.','The flag shows your *goal*.'],
 howTo:'Use the savings model to answer the question about goals, interest or fees.',
 init:k=>({dep:50,rate:4,fee:0,goal:250,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'A *financial goal* is something you plan to save or earn money for. Goals can be *short-term* (weeks or months) or *long-term* (years).')+14;
  [['1','Set a goal','a $250 bike in 4 years'],['2','Make a plan','save $60 a year'],['3','Track it','check your balance often'],['4','Adjust','spend less or earn more if needed']].forEach(([n,a,b],i)=>{T(g,n,X0+12,y+30+i*48,ZS(30),acc());T(g,a,X0+50,y+28+i*48,FT.bodyB);T(g,b,X0+300,y+28+i*48,FT.body,GREY);});y+=210;
  rr(g,X0,y,TW/2-8,150,14);g.fillStyle=tint('#16a36f',.14);g.fill();T(g,'Helps',X0+20,y+36,FT.bodyB,'#16a36f');wrap(g,'a plan, a part-time job, interest on savings, comparing prices',X0+20,y+66,TW/2-40,28,{font:FT.small});
  rr(g,X0+TW/2+8,y,TW/2-8,150,14);g.fillStyle=tint('#e0453a',.12);g.fill();T(g,'Gets in the way',X0+TW/2+28,y+36,FT.bodyB,RED);wrap(g,'impulse buys, account fees, high-interest debt, unexpected costs',X0+TW/2+28,y+66,TW/2-40,28,{font:FT.small});y+=172;
  y=para(p,y,'*Interest rate:* $200 at *5%* per year earns *$10* in a year. Loans charge interest; savings accounts pay interest.')+8;
  y=keyWords(p,y,[['interest rate','the percent paid for saving, or charged for borrowing'],['fee','a charge for a service, like a monthly account fee']]);
  predict(p,y,S,'p33','You have $300 in an account paying 2% per year. How much interest in one year?','*$6.* 1% of $300 is $3, so 2% is $6.');},
 readout(p,S,y){const g=p.g,st=S.st,yrs=sim(st);const last=yrs[4];T(g,'After 5 years: $'+last.bal.toFixed(2),X0,y+44,ZS(40),acc());const hit=yrs.findIndex(v=>v.bal>=st.goal);
  T(g,'deposit $'+st.dep+'/yr · interest '+st.rate+'% · fee $'+st.fee+'/month · goal $'+st.goal+(hit>=0?' reached in year '+(hit+1):' not reached'),X0,y+86,FT.small);return y+96;},
 build(S,grp,mode,game){const st=S.st;const g2=new THREE.Group();grp.add(g2);
  function draw(){clearGroup(g2);const yrs=sim(st),sc=.0055;yrs.forEach((v,i)=>{const x=-1.7+i*.8;const hd=v.dep*sc,hi=v.int*sc;const b1=mk(new THREE.BoxGeometry(.5,Math.max(.01,hd),.5),lam('#2f7de1'),20);b1.position.set(x,hd/2,-1.7);g2.add(b1);
      const b2=mk(new THREE.BoxGeometry(.5,Math.max(.005,hi),.5),lam('#f2c14e'),20);b2.position.set(x,hd+hi/2,-1.7);g2.add(b2);if(v.fee>0){const f=mk(new THREE.BoxGeometry(.55,.03,.55),lam('#e0453a'),0);f.position.set(x,hd+hi+.02,-1.7);g2.add(f);}
      const l=label('$'+Math.round(v.bal),{size:.18,bg:'#ffffff'});l.position.set(x,hd+hi+.25,-1.7);g2.add(l);const yl=label('year '+(i+1),{size:.14,color:GREY});yl.position.set(x,.1,-1.25);g2.add(yl);});
    const gy=st.goal*sc;const gl=mk(new THREE.BoxGeometry(4.2,.015,.02),lam('#16a36f'),0);gl.position.set(-.1,gy,-1.95);g2.add(gl);const fl=label('goal $'+st.goal,{size:.18,color:'#16a36f'});fl.position.set(1.9,gy+.15,-1.95);g2.add(fl);A.redraw();}
  draw();
  return {info:()=>'$'+sim(st)[4].bal.toFixed(2)+' after 5 years',
    controls:()=>{const c=[{t:'deposit −',fn:()=>{st.dep=Math.max(10,st.dep-10);draw();}},{t:'deposit +',fn:()=>{st.dep=Math.min(150,st.dep+10);draw();}},{t:'rate −',fn:()=>{st.rate=Math.max(0,st.rate-1);draw();}},{t:'rate +',go:true,fn:()=>{st.rate=Math.min(10,st.rate+1);draw();}},{t:'fee −',fn:()=>{st.fee=Math.max(0,st.fee-1);draw();}},{t:'fee +',fn:()=>{st.fee=Math.min(5,st.fee+1);draw();}}];
      if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);return c;},
    demo(n){st.ask=null;if(n==='grow'){st.dep=50;st.rate=0;st.fee=0;draw();A.seq([[800,()=>{st.rate=4;draw();A.say('4% interest adds gold blocks');}]]);}if(n==='fee'){st.dep=50;st.rate=4;st.fee=0;draw();A.seq([[800,()=>{st.fee=1;draw();A.say('$1 a month fee: $12 a year comes out');}]]);}},
    task(r){st.setup=true;let txt;st.dep=50;st.rate=4;st.fee=0;
      if(r===0){const a=pick([200,300,400]),p2=pick([2,3,5]);const v=a*p2/100;st.ask={ans:'$'+v,o:shuffle(['$'+v,'$'+(v*10),'$'+p2]),ok:'Yes! '+p2+'% of $'+a+' = $'+v+'.'};txt='An account pays *'+p2+'%* interest per year. How much interest does *$'+a+'* earn in one year?';}
      else if(r===1){st.ask={ans:'Long-term',o:['Short-term','Long-term'],ok:'Yes! Saving for 4 years is a long-term goal.'};txt='Saving for a *bike in 4 years* is a ___ goal.';}
      else if(r===2){st.ask={ans:'A $2 monthly account fee',o:shuffle(['A $2 monthly account fee','A part-time job','Higher interest on savings']),ok:'Yes! Fees take money away from your savings.'};txt='Which factor *interferes* with a savings goal?';}
      else if(r===3){st.dep=60;st.rate=0;st.fee=0;st.goal=240;st.ask={ans:'4 years',o:['3 years','4 years','5 years'],ok:'Yes! 4 × $60 = $240.'};txt='You save *$60 a year*, no interest. When do you reach a *$240* goal?';}
      else{st.ask={ans:'The loan',o:['The loan','The savings account'],ok:'Yes! Banks charge interest on loans; they pay interest on savings.'};txt='Which one *charges* you interest: a loan or a savings account?';}
      draw();st.setup=false;return txt;}};}
});
function sim(st){const out=[];let bal=0;for(let y=0;y<5;y++){bal+=st.dep;const it=bal*st.rate/100,fee=st.fee*12;bal+=it-fee;const depTot=st.dep*(y+1);out.push({bal,dep:Math.max(0,depTot-st.fee*12*(y+1)),int:Math.max(0,bal-Math.max(0,depTot-st.fee*12*(y+1))),fee});}return out;}
})();
