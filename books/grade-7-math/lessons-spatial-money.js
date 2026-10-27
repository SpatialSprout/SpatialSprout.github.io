/* The Interactive Classroom: Grade 7 Math — Spatial Sense (24–31) and Financial Literacy (32–34) */
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
const sgn=v=>v<0?'−'+(-v):String(v);const PI=3.14;

/* =========================================================
   24. Prisms, pyramids and cylinders
   ========================================================= */
const SOL={cube:{n:'cube (square prism)',f:6,e:12,v:6+2,pl:9,rot:4,col:'#2f7de1'},rect:{n:'rectangular prism',f:6,e:12,v:8,pl:3,rot:2,col:'#16a36f'},tri:{n:'triangular prism',f:5,e:9,v:6,pl:4,rot:3,col:'#f59e0b'},
  hex:{n:'hexagonal prism',f:8,e:18,v:12,pl:7,rot:6,col:'#8b5cf6'},sqpyr:{n:'square pyramid',f:5,e:8,v:5,pl:4,rot:4,col:'#e4572e'},cyl:{n:'cylinder',f:3,e:2,v:0,pl:'infinitely many',rot:'infinite',col:'#0fa5a5'}};
SOL.cube.v=8;const SK=Object.keys(SOL);
P.lesson({id:'solids7',title:'Prisms, pyramids and cylinders',strand:'Spatial Sense',codes:['E1.1'],
 guide:{goal:'Describe and classify cylinders, pyramids and prisms by their geometric properties, including faces, edges, vertices, plane symmetry and rotational symmetry.',words:'prism, pyramid, cylinder, base, face, edge, vertex, plane of symmetry, rotational symmetry',
  ask:['How is a prism different from a pyramid?','How many planes of symmetry does a cube have?','Why does a cylinder have infinitely many planes of symmetry?'],home:'Find a box, a can and a pyramid-shaped package. Count faces, edges and vertices.'},
 learn:[{say:'Prisms, pyramids, cylinders.',speech:'A prism has two matching bases joined by rectangles. A pyramid has one base and triangles that meet at a point. A cylinder has two circular bases and a curved surface. Watch each of Zuri’s solids turn.',view:'model',demo:'tour'},
        {say:'Read about symmetry in 3D.',speech:'A plane of symmetry cuts a solid into two mirror halves. Rotational symmetry means the solid fits onto itself as it turns around an axis. A square pyramid fits four times in one turn.',view:'read'},
        {say:'Watch: planes of symmetry.',speech:'Watch the glass planes slice through the rectangular prism. Each plane makes two mirror halves. A rectangular prism has three.',view:'model',demo:'planes'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: inspect the solids.',speech:'Your turn. Choose a solid, show its planes of symmetry, and spin it.',view:'model'}],
 fig:'A rotating solid with its planes of symmetry.',rz:.4,
 explore:['*Tap a small solid* to inspect it.','Show *planes of symmetry*.','*Spin* to test rotational symmetry.'],
 howTo:'Inspect the solids, then tap the right solid or choose the answer.',
 init:k=>({k:'rect',pl:false,ask:null,want:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'Solids are classified by their *bases* and *faces*.')+12;
  const H=['Solid','Faces','Edges','Vertices','Planes','Rot.'],cx=[X0,X0+290,X0+390,X0+490,X0+600,X0+710];rr(g,X0-6,y,TW+12,40,10);g.fillStyle=tint(acc(),.16);g.fill();H.forEach((h,i)=>T(g,h,cx[i]+6,y+28,FT.cap,acc()));y+=44;
  SK.forEach((k,j)=>{const s=SOL[k];const yy=y+j*40;T(g,s.n,cx[0]+6,yy+28,FT.small,s.col);[s.f,s.e,s.v,typeof s.pl==='number'?s.pl:'∞',typeof s.rot==='number'?s.rot:'∞'].forEach((v,i)=>T(g,String(v),cx[i+1]+30,yy+28,FT.bodyB,INK,'center'));});y+=6*40+16;
  y=para(p,y,'*Prism:* 2 congruent bases, rectangular sides. *Pyramid:* 1 base, triangular sides meeting at an apex. *Cylinder:* 2 circular bases and a curved surface.')+10;
  y=keyWords(p,y,[['plane of symmetry','a flat cut that makes two mirror-image halves'],['apex','the point where a pyramid’s triangles meet']]);
  predict(p,y,S,'p24','How many faces, edges and vertices does a pentagonal pyramid have?','*6 faces, 10 edges, 6 vertices.*');},
 readout(p,S,y){const g=p.g,st=S.st,s=SOL[st.k];T(g,s.n[0].toUpperCase()+s.n.slice(1),X0,y+44,ZS(40),s.col);T(g,s.f+' faces · '+s.e+' edges · '+s.v+' vertices · '+s.pl+' planes of symmetry',X0,y+84,FT.small);return y+94;},
 build(S,grp,mode,game){const st=S.st;const big=new THREE.Group();big.position.set(0,.05,-2.0);grp.add(big);const row=new THREE.Group();grp.add(row);let spin=0;
  function solid(k,s){const c=SOL[k].col,m=new THREE.MeshLambertMaterial({color:c});let geo;
    if(k==='cube')geo=new THREE.BoxGeometry(1.1*s,1.1*s,1.1*s);else if(k==='rect')geo=new THREE.BoxGeometry(1.6*s,.8*s,.9*s);else if(k==='tri')geo=new THREE.CylinderGeometry(.75*s,.75*s,1.3*s,3);else if(k==='hex')geo=new THREE.CylinderGeometry(.75*s,.75*s,1.1*s,6);
    else if(k==='sqpyr'){geo=new THREE.ConeGeometry(.9*s,1.2*s,4);}else geo=new THREE.CylinderGeometry(.6*s,.6*s,1.2*s,40);if(k==='tri'){geo.rotateZ(Math.PI/2);}if(k==='sqpyr')geo.rotateY(Math.PI/4);
    const me=mk(geo,m,0);geo.computeBoundingBox();me.position.y=-geo.boundingBox.min.y;const g=new THREE.Group();g.add(me);const ed=new THREE.LineSegments(new THREE.EdgesGeometry(geo,20),new THREE.LineBasicMaterial({color:'#1b2236'}));ed.position.copy(me.position);g.add(ed);return g;}
  function planes(k){const out=[];const mat=new THREE.MeshLambertMaterial({color:'#ffffff',transparent:true,opacity:.35,side:THREE.DoubleSide,depthWrite:false});const add=(rx,ry,rz)=>{const p=new THREE.Mesh(new THREE.PlaneGeometry(2.2,2.0),mat);p.rotation.set(rx,ry,rz);p.position.y=.7;out.push(p);};
    if(k==='rect'){add(0,0,0);add(0,Math.PI/2,0);add(Math.PI/2,0,0);}else if(k==='cube'){add(0,0,0);add(0,Math.PI/2,0);add(Math.PI/2,0,0);add(0,Math.PI/4,0);add(0,-Math.PI/4,0);}
    else if(k==='sqpyr'){[0,Math.PI/4,Math.PI/2,3*Math.PI/4].forEach(a=>add(0,a,0));}else if(k==='hex'){for(let i=0;i<6;i++)add(0,i*Math.PI/6,0);add(Math.PI/2,0,0);}else if(k==='tri'){add(Math.PI/2,0,0);add(0,Math.PI/2,0);}else{for(let i=0;i<6;i++)add(0,i*Math.PI/6,0);add(Math.PI/2,0,0);}return out;}
  function drawBig(){clearGroup(big);big.add(solid(st.k,1));if(st.pl)planes(st.k).forEach(p=>big.add(p));A.redraw();}
  function drawRow(){clearGroup(row);SK.forEach((k,i)=>{const g=solid(k,.33);g.position.set(-1.9+i*.76,0,.05);row.add(g);const l=label(k==='sqpyr'?'pyramid':k==='rect'?'rect. prism':k==='tri'?'tri. prism':k==='hex'?'hex. prism':k,{size:.12,color:INK});l.position.set(-1.9+i*.76,.55,.05);row.add(l);A.drag(g,{tap:()=>tapS(k)});});}
  function tapS(k){st.k=k;A.pop();drawBig();if(mode==='play'&&!st.setup&&st.want){if(st.want(k))game.solved(st.wantOk);else A.bad('Look again: '+st.wantHint);}}
  drawBig();drawRow();
  return {tick(dt){spin+=dt*.5;big.rotation.y=spin;},info:()=>SOL[st.k].n,
    controls:()=>{const c=[{t:'Planes of symmetry',on:st.pl,fn:()=>{st.pl=!st.pl;drawBig();}}];if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);return c;},
    demo(n){st.ask=null;st.want=null;if(n==='tour'){st.pl=false;A.seq(SK.map(k=>[900,()=>{st.k=k;drawBig();A.say(SOL[k].n);}]));}if(n==='planes'){st.k='rect';st.pl=true;drawBig();A.say('3 planes of symmetry');}},
    task(r){st.setup=true;st.ask=null;st.want=null;st.pl=false;let txt;
      if(r===0){st.k='cube';st.want=k=>k==='sqpyr';st.wantOk='Yes! A pyramid has one base and triangles meeting at an apex.';st.wantHint='find one base and triangles that meet at a point.';txt='Tap the *pyramid*.';}
      else if(r===1){st.k='hex';st.ask={ans:8,o:[6,8,12],ok:'Yes! 2 hexagons + 6 rectangles = 8 faces.'};txt='How many *faces* does a hexagonal prism have?';}
      else if(r===2){st.k='tri';st.ask={ans:9,o:[6,9,12],ok:'Yes! 3 + 3 + 3 = 9 edges.'};txt='How many *edges* does a triangular prism have?';}
      else if(r===3){st.k='rect';st.ask={ans:3,o:[2,3,4],ok:'Yes! A rectangular prism has 3 planes of symmetry.'};txt='How many *planes of symmetry* does this rectangular prism have?';}
      else{st.k='rect';st.want=k=>k==='cyl';st.wantOk='Yes! A cylinder has curved surfaces and circular bases.';st.wantHint='find the solid with circles for bases.';txt='Tap the solid with *infinitely many* planes of symmetry.';}
      drawBig();st.setup=false;return txt;}};}
});

/* =========================================================
   25. Views and perspective drawings with scale
   ========================================================= */
P.lesson({id:'views7',title:'Views and perspective with scale',strand:'Spatial Sense',codes:['E1.2'],
 guide:{goal:'Draw top, front and side views, as well as perspective views, of objects and spaces using appropriate scales.',words:'perspective view, isometric, top view, front view, side view, scale, scale drawing',
  ask:['What does a perspective view show that a front view does not?','If 1 cube = 2 m, how tall is a 3-cube tower?','Why do architects use scale drawings?'],home:'Draw your bedroom from the top using a scale like 1 square = 50 cm. Then draw a front view.'},
 learn:[{say:'Turn the building.',speech:'Tariq’s building turns to show each view. First the front. Then the side. Then from the top. A perspective view shows three sides at once, like a photo.',view:'model',demo:'turn'},
        {say:'Read about scale.',speech:'A scale tells what each unit in a drawing stands for. If one cube equals two metres, a tower three cubes tall is six metres tall.',view:'read'},
        {say:'Watch: match a view.',speech:'Which card is the front view? Look at the tallest stack in each column, from left to right.',view:'model',demo:'match'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: turn and match.',speech:'Your turn. Turn the building to each view and match the cards.',view:'model'}],
 fig:'A cube building on a turntable, with view cards.',rz:.4,
 explore:['Press *Front*, *Side*, *Top* or *Perspective* to turn the building.','The *scale* says what one cube stands for.','Tap a card to match a view.'],
 howTo:'Turn the building, then tap the matching card or choose the measurement.',
 init:k=>({h:[[1,0,2],[2,1,3],[3,1,1]],sc:2,cards:null,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'*Orthographic views* (top, front, side) show one face at a time. A *perspective view* shows depth, like a photo. A *scale* links the drawing to real size.')+14;
  const s=34;const view=(ox,oy,cols,t,c)=>{cols.forEach((n,k)=>{for(let i=0;i<n;i++){g.fillStyle=c;g.fillRect(ox+k*s,oy-(i+1)*s,s-3,s-3);}});T(g,t,ox+s*1.5,oy+26,FT.smallB,INK,'center');};
  view(X0+20,y+130,[3,2,3],'front','#2f7de1');view(X0+190,y+130,[2,3,3],'side','#e4572e');
  const H=[[1,0,2],[2,1,3],[3,1,1]];for(let r=0;r<3;r++)for(let c=0;c<3;c++){g.fillStyle=H[r][c]?'#16a36f':'#eef2f8';g.fillRect(X0+360+c*s,y+28+r*s,s-3,s-3);if(H[r][c])T(g,String(H[r][c]),X0+360+c*s+15,y+52+r*s,FT.cap,'#fff','center');}T(g,'top',X0+360+s*1.5,y+156,FT.smallB,INK,'center');
  rr(g,X0+520,y+10,TW-520,140,14);g.fillStyle=tint(acc(),.1);g.fill();T(g,'Scale',X0+540,y+44,FT.bodyB,acc());T(g,'1 cube = 2 m',X0+540,y+84,FT.body);T(g,'3 cubes = 6 m',X0+540,y+120,FT.body);y+=200;
  y=para(p,y,'Architects and designers use *scale drawings* so a whole building fits on one page and every length can be measured.')+10;
  y=keyWords(p,y,[['perspective view','a drawing that shows depth: three faces at once'],['scale','the ratio of drawing size to real size']]);
  predict(p,y,S,'p25','On a plan, 1 cm = 3 m. A wall is 5 cm long on the plan. How long is the real wall?','*15 m.* 5 × 3 = 15.');},
 readout(p,S,y){const g=p.g,st=S.st;const mx=Math.max(...st.h.flat());T(g,'Tallest tower: '+mx+' cubes = '+mx*st.sc+' m (1 cube = '+st.sc+' m)',X0,y+46,FT.bodyB,acc());return y+60;},
 build(S,grp,mode,game){const st=S.st,c=.4;const turn=new THREE.Group();turn.position.set(-.3,0,-1.9);grp.add(turn);const plate=mk(new THREE.CylinderGeometry(1.0,1.0,.05,40),lam('#e2e8f0'),20);plate.position.y=.025;turn.add(plate);
  const bld=new THREE.Group();turn.add(bld);const cardsG=new THREE.Group();grp.add(cardsG);let tgtY=0,tgtX=0;
  function draw(){clearGroup(bld);for(let r=0;r<3;r++)for(let q=0;q<3;q++)for(let k=0;k<st.h[r][q];k++){const m=unitBox(1,1,1,'#60a5fa',c*.96);m.position.set((q-1)*c,.05+c*.48+k*c*.96,(r-1)*c);bld.add(m);}
    const fr=label('FRONT',{size:.14,color:RED});fr.position.set(0,.1,.8);bld.add(fr);drawCards();A.redraw();}
  function fv(h){return [0,1,2].map(q=>Math.max(h[0][q],h[1][q],h[2][q]));}function sv(h){return [2,1,0].map(r=>Math.max(...h[r]));}
  function cardTex(kind,data){const cv=document.createElement('canvas');cv.width=cv.height=192;const g=cv.getContext('2d');g.fillStyle='#fff';g.fillRect(0,0,192,192);g.strokeStyle='#1b2236';g.lineWidth=6;g.strokeRect(3,3,186,186);const s=46,ox=27;
    if(kind==='top'){for(let r=0;r<3;r++)for(let q=0;q<3;q++){g.fillStyle=data[r][q]?'#16a36f':'#eef2f8';g.fillRect(ox+q*s,ox+r*s,s-4,s-4);}}else data.forEach((n,i)=>{for(let k=0;k<n;k++){g.fillStyle=kind==='front'?'#2f7de1':'#e4572e';g.fillRect(ox+i*s,165-(k+1)*s,s-4,s-4);}});
    return new THREE.MeshLambertMaterial({map:new THREE.CanvasTexture(cv)});}
  function drawCards(){clearGroup(cardsG);if(!st.cards)return;st.cards.list.forEach((d,i)=>{const side=lam('#ffffff');const m=mk(new THREE.BoxGeometry(.66,.04,.66),[side,side,cardTex(st.cards.kind,d),side,side,side],20);m.position.set(1.65,.05,-2.75+i*.8);cardsG.add(m);
      A.drag(m,{tap:()=>{if(i===st.cards.ans){A.good('Yes! The '+st.cards.kind+' view.');if(mode==='play'&&!st.setup)game.solved('Yes! That is the '+st.cards.kind+' view.');}else A.bad('Turn the building and look again.');}});});}
  function view(v){tgtY=v==='side'?-Math.PI/2:v==='persp'?-Math.PI/4:0;tgtX=v==='top'?Math.PI/2.2:v==='persp'?.35:0;A.pop();A.say(v==='persp'?'perspective view':v+' view');}
  draw();
  return {tick(dt){turn.rotation.y+=(tgtY-turn.rotation.y)*Math.min(1,dt*3);turn.rotation.x+=(tgtX-turn.rotation.x)*Math.min(1,dt*3);},info:()=>'1 cube = '+st.sc+' m',
    controls:()=>{const c=[{t:'Front',fn:()=>view('front')},{t:'Side',fn:()=>view('side')},{t:'Top',fn:()=>view('top')},{t:'Perspective',go:true,fn:()=>view('persp')}];if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);return c;},
    demo(n){st.ask=null;if(n==='turn'){st.cards=null;draw();A.seq([[600,()=>view('front')],[1300,()=>view('side')],[1300,()=>view('top')],[1300,()=>view('persp')]]);}
      if(n==='match'){const r=fv(st.h);st.cards={kind:'front',list:[[1,2,3],r,[3,3,1]],ans:1};draw();view('front');}},
    task(r){st.setup=true;st.ask=null;st.cards=null;st.h=[0,1,2].map(()=>[0,1,2].map(()=>rnd(0,3)));if(st.h.flat().filter(v=>v).length<4)st.h[1]=[1,2,1];let txt;
      if(r<2){const kind=r?'side':'front';const right=kind==='front'?fv(st.h):sv(st.h);const list=[right];while(list.length<3){const o=[rnd(0,3),rnd(1,3),rnd(0,3)];if(!list.some(x=>x.join()===o.join()))list.push(o);}const sh=shuffle([0,1,2]);st.cards={kind,list:sh.map(i=>list[i]),ans:sh.indexOf(0)};txt='Tap the card that shows the *'+kind+' view*. Turn the building to check.';}
      else if(r===2){const right=st.h.map(row=>row.map(v=>v?1:0));const list=[right];while(list.length<3){const o=[0,1,2].map(()=>[0,1,2].map(()=>rnd(0,1)));if(!list.some(x=>JSON.stringify(x)===JSON.stringify(o)))list.push(o);}const sh=shuffle([0,1,2]);st.cards={kind:'top',list:sh.map(i=>list[i]),ans:sh.indexOf(0)};txt='Tap the card that shows the *top view*.';}
      else if(r===3){st.sc=pick([2,3,5]);const mx=Math.max(...st.h.flat());st.ask={ans:mx*st.sc+' m',o:shuffle([mx*st.sc+' m',mx+' m',(mx+1)*st.sc+' m']),ok:'Yes! '+mx+' cubes × '+st.sc+' m = '+mx*st.sc+' m.'};txt='Scale: *1 cube = '+st.sc+' m*. How tall is the *tallest tower*?';}
      else{st.ask={ans:'Perspective view',o:shuffle(['Perspective view','Front view','Top view']),ok:'Yes! A perspective view shows depth.'};txt='Which view shows the building *with depth*, like a photo?';}
      draw();st.setup=false;return txt;}};}
});

/* =========================================================
   26. Dilations and similarity
   ========================================================= */
P.lesson({id:'dilation7',title:'Dilations and similar shapes',strand:'Spatial Sense',codes:['E1.3'],
 guide:{goal:'Perform dilations on a grid and describe the similarity between the image and the original shape.',words:'dilation, scale factor, enlargement, reduction, similar, corresponding sides, centre of dilation',
  ask:['What does a scale factor of 2 do to each side?','How can you tell a dilation from a stretch?','Are similar shapes the same size?'],home:'Take a photo and zoom in by 200%. What happens to the shape? What stays the same?'},
 learn:[{say:'Grow from a centre point.',speech:'A dilation enlarges or reduces a shape from a centre point. Maya uses a scale factor of two, so every distance from the centre doubles. Watch the triangle grow into a similar triangle.',view:'model',demo:'grow'},
        {say:'Read about similar shapes.',speech:'The image of a dilation is similar to the original: the angles stay the same, and every side is multiplied by the scale factor. A scale factor less than one makes a reduction.',view:'read'},
        {say:'Watch: a reduction.',speech:'Now the scale factor is one half. Every side becomes half as long. The shape is still similar.',view:'model',demo:'shrink'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: change the scale factor.',speech:'Your turn. Change the scale factor and compare the side lengths.',view:'model'}],
 fig:'A shape and its dilation from the origin.',rz:.4,
 explore:['Change the *scale factor*.','Rays from the *centre* pass through matching vertices.','Compare the *side lengths*.'],
 howTo:'Set the scale factor so the image matches, or choose the answer.',
 init:k=>({sh:[[1,1],[3,1],[1,3]],k:2,ghost:null,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'A *dilation* multiplies every distance from the *centre of dilation* by the *scale factor*. The image is *similar* to the original.')+14;
  const s=26,ox=X0+30,oy=y+260;g.strokeStyle='#e5e7eb';for(let i=0;i<=9;i++){g.beginPath();g.moveTo(ox+i*s,oy);g.lineTo(ox+i*s,oy-9*s);g.stroke();g.beginPath();g.moveTo(ox,oy-i*s);g.lineTo(ox+9*s,oy-i*s);g.stroke();}
  const tri=(k,col)=>{g.beginPath();[[1,1],[3,1],[1,3]].forEach(([x,yy],i)=>{const X=ox+x*k*s,Y=oy-yy*k*s;i?g.lineTo(X,Y):g.moveTo(X,Y);});g.closePath();g.fillStyle=tint(col,.4);g.fill();g.strokeStyle=col;g.lineWidth=3;g.stroke();};tri(3,'#e4572e');tri(1,'#2f7de1');
  g.setLineDash([5,5]);g.strokeStyle='#94a3b8';g.lineWidth=2;[[3,1],[1,3]].forEach(([x,yy])=>{g.beginPath();g.moveTo(ox,oy);g.lineTo(ox+x*3*s,oy-yy*3*s);g.stroke();});g.setLineDash([]);
  T(g,'scale factor 3',X0+320,y+60,FT.bodyB,'#e4572e');T(g,'side 2 → 6',X0+320,y+100,FT.body);T(g,'side 2 → 6',X0+320,y+136,FT.body);T(g,'angles stay the same',X0+320,y+172,FT.body);y+=290;
  y=keyWords(p,y,[['scale factor','what each length is multiplied by'],['similar','same shape and angles, possibly a different size']]);
  predict(p,y,S,'p26','A 4 cm by 6 cm rectangle is dilated by 1.5. What are the new sides?','*6 cm by 9 cm.*');},
 readout(p,S,y){const g=p.g,st=S.st;T(g,'scale factor '+st.k,X0,y+46,ZS(42),acc());T(g,'vertex (1, 1) → ('+st.sh[0][0]*st.k+', '+st.sh[0][1]*st.k+')  ·  sides × '+st.k,X0,y+86,FT.bodyB);return y+96;},
 build(S,grp,mode,game){const st=S.st,s=.34,x0=-2.0,zb=-.4,N=10;const X=x=>x0+x*s,Z=y=>zb-y*s;
  const base=mk(new THREE.BoxGeometry(N*s+.1,.03,8*s+.1),[lam('#f8fafc'),lam('#f8fafc'),cellMat('#ffffff',N,8),lam('#f8fafc'),lam('#f8fafc'),lam('#f8fafc')],20);base.position.set(X(N/2),.015,Z(4));grp.add(base);
  const o=mk(new THREE.SphereGeometry(.08,12,10),lam(INK),0);o.position.set(X(0),.06,Z(0));grp.add(o);const g2=new THREE.Group();grp.add(g2);
  function draw(){clearGroup(g2);const P2=pts=>pts.map(([x,y])=>[X(x),Z(y)]);g2.add(slab(P2(st.sh),'#2f7de1',.1,.85));const im=st.sh.map(([x,y])=>[x*st.k,y*st.k]);g2.add(slab(P2(im),'#e4572e',.05,.45));
    if(st.ghost)g2.add(slab(P2(st.ghost),'#16a36f',.02,.35));im.forEach(([x,y])=>g2.add(seg(V(X(0),.12,Z(0)),V(X(x),.12,Z(y)),'#94a3b8',.008)));
    const l=label('× '+st.k,{size:.3,bg:'#ffffff',border:'#e4572e'});l.position.set(X(im[1][0]),.5,Z(im[1][1]));g2.add(l);check();A.redraw();}
  function setK(k){st.k=k;A.pop();draw();}
  function check(){if(mode==='play'&&!st.setup&&st.ghost&&st.sh.every(([x,y],i)=>Math.abs(x*st.k-st.ghost[i][0])<1e-9&&Math.abs(y*st.k-st.ghost[i][1])<1e-9))game.solved('Scale factor '+st.k+': the image matches!');}
  draw();
  return {info:()=>'scale factor '+st.k,
    controls:()=>{const c=[.5,1,1.5,2,2.5,3].map(k=>({t:'× '+k,on:st.k===k,fn:()=>setK(k)}));if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);return c;},
    demo(n){st.ask=null;st.ghost=null;st.sh=[[1,1],[3,1],[1,3]];if(n==='grow'){st.k=1;draw();A.seq([[700,()=>setK(1.5)],[700,()=>setK(2)],[700,()=>setK(3)]]);}if(n==='shrink'){st.sh=[[2,2],[6,2],[2,6]];st.k=1;draw();A.seq([[900,()=>setK(.5)]]);}},
    task(r){st.setup=true;st.ask=null;st.ghost=null;st.k=1;st.sh=[[1,1],[3,1],[1,3]];let txt;
      if(r===0){const k=pick([2,3]);st.ghost=st.sh.map(([x,y])=>[x*k,y*k]);txt='Choose the *scale factor* that makes the green image.';}
      else if(r===1){st.sh=[[2,2],[6,2],[2,4]];st.ghost=st.sh.map(([x,y])=>[x/2,y/2]);txt='This image is a *reduction*. Choose the scale factor.';}
      else if(r===2){const k=pick([1.5,2.5]);st.sh=[[2,1],[4,1],[2,3]];st.ghost=st.sh.map(([x,y])=>[x*k,y*k]);txt='Find the scale factor for the green image. (It may be a decimal!)';}
      else if(r===3){const k=pick([2,3]);const a=4*k;st.ask={ans:a+' cm',o:shuffle([a+' cm',(4+k)+' cm',(4*k*k)+' cm']),ok:'Yes! 4 × '+k+' = '+a+'.'};txt='A side is *4 cm*. After a dilation with scale factor *'+k+'*, how long is it?';}
      else{st.ask={ans:'Their angles are equal',o:shuffle(['Their angles are equal','Their sides are equal','Their areas are equal']),ok:'Yes! Similar shapes have equal angles and proportional sides.'};txt='What is always true about a shape and its dilation?';}
      draw();st.setup=false;return txt;}};}
});

/* =========================================================
   27. Transformations on the Cartesian plane
   ========================================================= */
P.lesson({id:'transform7',title:'Transformations on the Cartesian plane',strand:'Spatial Sense',codes:['E1.4'],
 guide:{goal:'Describe and perform translations, reflections and rotations on the Cartesian plane, and predict the coordinates of the results.',words:'translation, reflection, rotation, image, coordinate rule, x-axis, y-axis, origin',
  ask:['What happens to the coordinates when you reflect in the y-axis?','How can you predict the image of (3, −2) after a 90° clockwise rotation?','What rule describes “4 left and 2 up”?'],home:'Plot a small shape on graph paper. Predict its image after a reflection, then check by folding.'},
 learn:[{say:'Rules move every point.',speech:'Liam moves his shape four left and two up. That translation adds negative four to x and two to y. Watch every vertex of the shape follow the same rule.',view:'model',demo:'trans'},
        {say:'Read the coordinate rules.',speech:'Reflect in the x-axis: change the sign of y. Reflect in the y-axis: change the sign of x. Rotate one hundred eighty degrees: change both signs. Rotate ninety degrees clockwise: x, y becomes y, negative x.',view:'read'},
        {say:'Watch: predict, then rotate.',speech:'Predict where the point three, one goes after a ninety degree clockwise rotation about the origin: one, negative three. Watch it turn.',view:'model',demo:'rot'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: transform and predict.',speech:'Your turn. Apply transformations and read the new coordinates.',view:'model'}],
 fig:'A shape on a four-quadrant grid, with its image.',rz:.45,
 explore:['Use the buttons to *translate*, *reflect* and *rotate*.','Point *A* is yellow: watch its coordinates.','Predict before you press!'],
 howTo:'Predict the coordinates of the image, then choose the answer.',
 init:k=>({sh:[[1,1],[3,1],[1,3]],ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'Every transformation has a *coordinate rule*. Apply it to each vertex to find the image.')+16;
  [['Translate (a, b)','(x, y) → (x + a, y + b)'],['Reflect in x-axis','(x, y) → (x, −y)'],['Reflect in y-axis','(x, y) → (−x, y)'],['Rotate 90° ↻ about O','(x, y) → (y, −x)'],['Rotate 180° about O','(x, y) → (−x, −y)'],['Rotate 90° ↺ about O','(x, y) → (−y, x)']].forEach(([a,b],i)=>{rr(g,X0,y+i*56,TW,48,12);g.fillStyle=tint(acc(),.06+i%2*.05);g.fill();T(g,a,X0+20,y+i*56+33,FT.bodyB,acc());T(g,b,X0+TW-20,y+i*56+33,FT.bodyB,INK,'right');});y+=350;
  y=keyWords(p,y,[['image','the shape after a transformation'],['coordinate rule','a pattern that says where each point moves']]);
  predict(p,y,S,'p27','Where does (−2, 5) go after a reflection in the x-axis?','*(−2, −5).* Only the sign of y changes.');},
 readout(p,S,y){const g=p.g,st=S.st;T(g,'A = ('+sgn(st.sh[0][0])+', '+sgn(st.sh[0][1])+')',X0,y+46,ZS(44),acc());T(g,'vertices: '+st.sh.map(([x,y2])=>'('+sgn(x)+', '+sgn(y2)+')').join('  '),X0,y+86,FT.body);return y+96;},
 build(S,grp,mode,game){const st=S.st,s=.27,cx=-.35,cz=-1.75;const X=x=>cx+x*s,Z=y=>cz-y*s;
  const base=mk(new THREE.BoxGeometry(10*s+.2,.03,10*s+.2),[lam('#f3f6fb'),lam('#f3f6fb'),cellMat('#ffffff',10,10),lam('#f3f6fb'),lam('#f3f6fb'),lam('#f3f6fb')],20);base.position.set(X(0),.015,Z(0));grp.add(base);
  [[X(-5.3),Z(0),X(5.3),Z(0)],[X(0),Z(-5.3),X(0),Z(5.3)]].forEach(([a,b,c,d])=>{const m=new THREE.Mesh(new THREE.BoxGeometry(c!==a?Math.abs(c-a):.03,.04,d!==b?Math.abs(d-b):.03),lam(INK));m.position.set((a+c)/2,.05,(b+d)/2);grp.add(m);});
  for(let i=-5;i<=5;i+=5){if(!i)continue;const lx=label(sgn(i),{size:.14,color:GREY});lx.position.set(X(i),.1,Z(0)+.16);grp.add(lx);const ly=label(sgn(i),{size:.14,color:GREY});ly.position.set(X(0)-.2,.1,Z(i));grp.add(ly);}
  const g2=new THREE.Group(),ghost=new THREE.Group();grp.add(g2,ghost);let prev=null;
  function draw(){clearGroup(g2);g2.add(slab(st.sh.map(([x,y])=>[X(x),Z(y)]),'#2f7de1',.08,.85));const a=mk(new THREE.SphereGeometry(.08,12,10),lam('#ffd24a'),0);a.position.set(X(st.sh[0][0]),.16,Z(st.sh[0][1]));g2.add(a);
    const l=label('A('+sgn(st.sh[0][0])+', '+sgn(st.sh[0][1])+')',{size:.17,bg:'#ffffff'});l.position.set(X(st.sh[0][0]),.45,Z(st.sh[0][1]));g2.add(l);
    clearGroup(ghost);if(prev)ghost.add(slab(prev.map(([x,y])=>[X(x),Z(y)]),'#94a3b8',.02,.3));A.redraw();}
  const TR={tl:([x,y])=>[x-1,y],tr:([x,y])=>[x+1,y],tu:([x,y])=>[x,y+1],td:([x,y])=>[x,y-1],rx:([x,y])=>[x,-y],ry:([x,y])=>[-x,y],r90:([x,y])=>[y,-x],r180:([x,y])=>[-x,-y],r270:([x,y])=>[-y,x]};
  function apply(k,name){const np=st.sh.map(TR[k]);if(np.some(([x,y])=>Math.abs(x)>5||Math.abs(y)>5)){A.bad('That would leave the grid.');return;}prev=st.sh;st.sh=np;A.pop();if(name)A.say(name+': A → ('+sgn(np[0][0])+', '+sgn(np[0][1])+')');draw();}
  draw();
  return {info:()=>'A('+st.sh[0].join(', ')+')',
    controls:()=>{const c=[{t:'←',fn:()=>apply('tl')},{t:'→',fn:()=>apply('tr')},{t:'↑',fn:()=>apply('tu')},{t:'↓',fn:()=>apply('td')},{t:'Reflect x-axis',fn:()=>apply('rx','reflect in x-axis')},{t:'Reflect y-axis',fn:()=>apply('ry','reflect in y-axis')},{t:'Rotate 90° ↻',go:true,fn:()=>apply('r90','rotate 90° clockwise')},{t:'Rotate 180°',fn:()=>apply('r180','rotate 180°')}];
      if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);return c;},
    demo(n){st.ask=null;prev=null;st.sh=[[1,1],[3,1],[1,3]];draw();if(n==='trans')A.seq([[600,()=>apply('tl')],[400,()=>apply('tl')],[400,()=>apply('tl')],[400,()=>apply('tl')],[500,()=>apply('tu')],[400,()=>apply('tu','4 left, 2 up')]]);
      if(n==='rot'){st.sh=[[3,1],[4,1],[3,3]];draw();A.seq([[1200,()=>apply('r90','rotate 90° clockwise')]]);}},
    task(r){st.setup=true;prev=null;const p0=[pick([-1,1])*rnd(1,4),pick([-1,1])*rnd(1,4)];st.sh=[p0,[p0[0]+1,p0[1]],[p0[0],p0[1]+1]];if(st.sh.some(([x,y])=>Math.abs(x)>5||Math.abs(y)>5))st.sh=[[1,1],[2,1],[1,2]];
      const [x,y]=st.sh[0];const f=([a,b])=>'('+sgn(a)+', '+sgn(b)+')';const T5=[['reflect in the x-axis',[x,-y]],['reflect in the y-axis',[-x,y]],['rotate 180° about the origin',[-x,-y]],['rotate 90° clockwise about the origin',[y,-x]],['translate 3 right and 2 down',[x+3,y-2]]][r];
      const ans=f(T5[1]);st.ask={ans,o:shuffle([ans,f([-T5[1][0],T5[1][1]]),f([T5[1][1],T5[1][0]])]).filter((v,i,a)=>a.indexOf(v)===i),ok:'Yes! A → '+ans+'.'};if(st.ask.o.length<3)st.ask.o.push(f([x,y]));draw();st.setup=false;
      return '*Predict*: where is A('+sgn(x)+', '+sgn(y)+') after you *'+T5[0]+'*? Try it to check.';}};}
});

/* =========================================================
   28. Volume and capacity
   ========================================================= */
P.lesson({id:'volcap7',title:'Volume, capacity and unit conversions',strand:'Spatial Sense',codes:['E2.1','E2.2'],
 guide:{goal:'Describe the differences and similarities between volume and capacity, use 1 mL = 1 cm³ to solve problems, and convert metric units of perimeter, area and volume.',words:'volume, capacity, cubic centimetre, millilitre, litre, square metre, convert',
  ask:['How are volume and capacity different?','How many millilitres fit in a 10 cm × 10 cm × 10 cm box?','Why is 1 m² equal to 10 000 cm², not 100 cm²?'],home:'Fill a measuring cup with water and pour it into a box. Measure the box in centimetres. Do the cm³ match the mL?'},
 learn:[{say:'Fill the box.',speech:'Ines has a box ten by ten by ten centimetres. Its volume is one thousand cubic centimetres. Watch water fill it: one thousand millilitres, which is one litre. One cubic centimetre holds one millilitre.',view:'model',demo:'fill'},
        {say:'Read the difference.',speech:'Volume is the space an object takes up. Capacity is how much a container can hold. For containers, one cubic centimetre of space holds one millilitre.',view:'read'},
        {say:'Watch: area units.',speech:'One square metre is one hundred centimetres by one hundred centimetres. That is ten thousand square centimetres, not one hundred. Area conversions use the conversion twice.',view:'model',demo:'area'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: size the box.',speech:'Your turn. Change the length, width and height, then fill the box with water.',view:'model'}],
 fig:'A box measured in centimetres, filling with water.',rz:.3,
 explore:['Change the box’s *length*, *width* and *height*.','Press *Fill* to pour in water.','Volume in cm³ = capacity in mL.'],
 howTo:'Find the volume or capacity, or convert the units, then choose the answer.',
 init:k=>({l:10,w:10,h:10,fill:0,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'*Volume* is the space something takes up. *Capacity* is how much a container holds. They are linked:')+16;
  rr(g,X0,y,TW,96,16);g.fillStyle=tint(acc(),.12);g.fill();T(g,'1 cm³ = 1 mL      1000 cm³ = 1 L',X0+TW/2,y+60,ZS(38),acc(),'center');y+=124;
  [['Length','1 m = 100 cm'],['Area','1 m² = 100 cm × 100 cm = 10 000 cm²'],['Volume','1 m³ = 1 000 000 cm³'],['Capacity','1 L = 1000 mL']].forEach(([a,b],i)=>{T(g,a,X0,y+i*46+26,FT.bodyB,acc());T(g,b,X0+180,y+i*46+26,FT.body);});y+=200;
  y=para(p,y,'A box 20 cm × 10 cm × 5 cm has volume *1000 cm³*, so it holds *1000 mL = 1 L*.')+10;
  y=keyWords(p,y,[['volume','the amount of space an object occupies'],['capacity','the amount a container can hold']]);
  predict(p,y,S,'p28','A fish tank is 50 cm × 30 cm × 20 cm. How many litres does it hold?','*30 L.* 30 000 cm³ = 30 000 mL = 30 L.');},
 readout(p,S,y){const g=p.g,st=S.st,v=st.l*st.w*st.h;T(g,st.l+' × '+st.w+' × '+st.h+' = '+v.toLocaleString('en-CA').replace(/,/g,' ')+' cm³',X0,y+48,ZS(42),acc());T(g,'holds '+v.toLocaleString('en-CA').replace(/,/g,' ')+' mL = '+v/1000+' L',X0,y+90,FT.bodyB,'#0ea5e9');return y+98;},
 build(S,grp,mode,game){const st=S.st;const g2=new THREE.Group();grp.add(g2);const sc=.06;let water=null;
  function draw(){clearGroup(g2);const L=st.l*sc,Wd=st.w*sc,H=st.h*sc;const glass=mk(new THREE.BoxGeometry(L,H,Wd),new THREE.MeshLambertMaterial({color:'#e0f2fe',transparent:true,opacity:.3,side:THREE.DoubleSide,depthWrite:false}),0);glass.position.set(-.5,H/2+.02,-1.9);g2.add(glass);
    const ed=new THREE.LineSegments(new THREE.EdgesGeometry(glass.geometry),new THREE.LineBasicMaterial({color:'#0369a1'}));ed.position.copy(glass.position);g2.add(ed);
    const wh=Math.max(.001,H*st.fill);water=mk(new THREE.BoxGeometry(L*.98,wh,Wd*.98),new THREE.MeshLambertMaterial({color:'#38bdf8',transparent:true,opacity:.75}),0);water.position.set(-.5,wh/2+.02,-1.9);g2.add(water);
    [[st.l+' cm',-.5,.1,-1.9+Wd/2+.25],[st.w+' cm',-.5+L/2+.35,.1,-1.9],[st.h+' cm',-.5-L/2-.35,H/2,-1.9]].forEach(([t,x,y,z])=>{const l=label(t,{size:.18,bg:'#ffffff'});l.position.set(x,y,z);g2.add(l);});
    const cube=mk(new THREE.BoxGeometry(sc,sc,sc),lam('#f59e0b'),0);cube.position.set(1.5,sc/2+.02,-1.0);g2.add(cube);const cl=label('1 cm³ = 1 mL',{size:.16,color:'#b45309'});cl.position.set(1.5,.3,-1.0);g2.add(cl);A.redraw();}
  function fillUp(){st.fill=0;draw();tween(1.8,k=>{st.fill=k;const H=st.h*sc,L=st.l*sc,Wd=st.w*sc;const wh=Math.max(.001,H*k);water.scale.y=1;water.geometry.dispose();water.geometry=new THREE.BoxGeometry(L*.98,wh,Wd*.98);water.position.y=wh/2+.02;}).then(()=>{A.pop();A.say(st.l*st.w*st.h+' mL');A.redraw();});}
  const set=(k,v)=>{st[k]=Math.max(1,Math.min(30,v));st.fill=0;A.pop();draw();};
  draw();
  return {info:()=>st.l*st.w*st.h+' cm³',
    controls:()=>{const c=[{t:'Fill',go:true,fn:fillUp},{t:'length −',fn:()=>set('l',st.l-5)},{t:'length +',fn:()=>set('l',st.l+5)},{t:'width −',fn:()=>set('w',st.w-5)},{t:'width +',fn:()=>set('w',st.w+5)},{t:'height −',fn:()=>set('h',st.h-5)},{t:'height +',fn:()=>set('h',st.h+5)}];
      if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);return c;},
    demo(n){st.ask=null;st.l=10;st.w=10;st.h=10;draw();if(n==='fill')A.seq([[700,fillUp]]);if(n==='area')A.seq([[600,()=>A.say('1 m² = 100 cm × 100 cm = 10 000 cm²')]]);},
    task(r){st.setup=true;st.fill=0;let txt;
      if(r===0){st.l=pick([10,20]);st.w=10;st.h=pick([5,10]);const v=st.l*st.w*st.h;st.ask={ans:v+' mL',o:shuffle([v+' mL',v/10+' mL',(st.l+st.w+st.h)+' mL']),ok:'Yes! '+v+' cm³ = '+v+' mL.'};txt='How many *mL* does this box hold?';}
      else if(r===1){st.l=20;st.w=10;st.h=10;st.ask={ans:'2 L',o:['2 L','20 L','0.2 L'],ok:'Yes! 2000 cm³ = 2000 mL = 2 L.'};txt='How many *litres* does this box hold?';}
      else if(r===2){st.l=10;st.w=10;st.h=10;st.ask={ans:'10 000 cm²',o:shuffle(['10 000 cm²','100 cm²','1000 cm²']),ok:'Yes! 100 cm × 100 cm.'};txt='How many *cm²* are in *1 m²*?';}
      else if(r===3){st.l=25;st.w=10;st.h=10;st.ask={ans:'Capacity',o:['Volume','Capacity'],ok:'Yes! How much a container holds is its capacity.'};txt='“How much juice fits in the jug?” asks about *volume* or *capacity*?';}
      else{st.l=30;st.w=20;st.h=10;st.ask={ans:'6 L',o:['6 L','60 L','0.6 L'],ok:'Yes! 6000 cm³ = 6 L.'};txt='A tank is *30 cm × 20 cm × 10 cm*. How many *litres* does it hold?';}
      draw();st.setup=false;return txt;}};}
});

/* =========================================================
   29. Circumference
   ========================================================= */
P.lesson({id:'circum7',title:'Circumference and constructing circles',strand:'Spatial Sense',codes:['E2.3','E2.4'],
 guide:{goal:'Use the relationships between radius, diameter and circumference to explain the formula C = π × d, solve problems, and construct circles given the radius, diameter or circumference.',words:'radius, diameter, circumference, pi (π), compass, construct',
  ask:['How many diameters fit around a circle?','If the radius is 5 cm, what is the diameter? The circumference?','How do you construct a circle with a circumference of 31.4 cm?'],home:'Wrap a string around a can, then measure it and the can’s width. Divide. You should get about 3.14.'},
 learn:[{say:'Unroll the circle.',speech:'Kenji rolls this wheel one full turn along the ground. The distance it travels is its circumference. It is a bit more than three diameters long: about three point one four times the diameter. That number is pi.',view:'model',demo:'roll'},
        {say:'Read the formulas.',speech:'The diameter is two times the radius. The circumference is pi times the diameter, or two times pi times the radius. Pi is about three point one four.',view:'read'},
        {say:'Watch: construct a circle.',speech:'To construct a circle with a radius of three centimetres, set the compass to three centimetres, hold the point still, and turn. Watch the circle appear.',view:'model',demo:'draw'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: roll and construct.',speech:'Your turn. Change the radius, roll the wheel, or construct a circle with the compass.',view:'model'}],
 fig:'A wheel rolls out its circumference next to three diameters.',rz:.3,
 explore:['Change the *radius*.','Press *Roll* to unroll the circumference.','Press *Construct* to draw with the compass.'],
 howTo:'Use C = π × d to find a measurement, or set the radius to construct the circle asked for.',
 init:k=>({r:5,ask:null,want:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'The *circumference* is the distance around a circle. Every circle’s circumference is about *3.14 times* its diameter: that number is *π (pi)*.')+16;
  const cx=X0+110,cy=y+100,R=80;g.beginPath();g.arc(cx,cy,R,0,Math.PI*2);g.strokeStyle='#2f7de1';g.lineWidth=5;g.stroke();g.strokeStyle='#e4572e';g.lineWidth=4;g.beginPath();g.moveTo(cx-R,cy);g.lineTo(cx+R,cy);g.stroke();g.strokeStyle='#16a36f';g.beginPath();g.moveTo(cx,cy);g.lineTo(cx,cy-R);g.stroke();
  T(g,'d',cx+20,cy+30,FT.bodyB,'#e4572e');T(g,'r',cx+10,cy-40,FT.bodyB,'#16a36f');
  [['d = 2 × r',''],['C = π × d','≈ 3.14 × d'],['C = 2 × π × r','']].forEach(([a,b],i)=>{T(g,a,X0+260,y+50+i*56,ZS(36),acc());T(g,b,X0+560,y+50+i*56,FT.body,GREY);});y+=210;
  y=para(p,y,'*Constructing a circle:* given C = 31.4 cm, find d = 31.4 ÷ 3.14 = 10 cm, so r = 5 cm. Open the compass to 5 cm.')+10;
  y=keyWords(p,y,[['circumference','the distance around a circle'],['π (pi)','about 3.14: circumference ÷ diameter for every circle']]);
  predict(p,y,S,'p29','A bike wheel has a diameter of 60 cm. How far does it roll in one turn?','*About 188.4 cm.* 3.14 × 60.');},
 readout(p,S,y){const g=p.g,st=S.st,d=2*st.r,c=Math.round(PI*d*100)/100;T(g,'r = '+st.r+' cm   d = '+d+' cm',X0,y+42,FT.bodyB,acc());T(g,'C = 3.14 × '+d+' ≈ '+c+' cm',X0,y+84,ZS(40),acc());return y+96;},
 build(S,grp,mode,game){const st=S.st,sc=.06;const g2=new THREE.Group();grp.add(g2);let wheel=null,trail=null;
  function draw(){clearGroup(g2);const R=st.r*sc;wheel=new THREE.Group();const tor=mk(new THREE.TorusGeometry(R,.04,10,48),lam('#2f7de1'),0);wheel.add(tor);const sp=mk(new THREE.BoxGeometry(2*R,.03,.03),lam('#e4572e'),0);wheel.add(sp);const dot=mk(new THREE.SphereGeometry(.06,10,8),lam('#f59e0b'),0);dot.position.y=-R;wheel.add(dot);
    wheel.position.set(-2.0,R+.05,-2.4);g2.add(wheel);const gr=mk(new THREE.BoxGeometry(4.4,.02,.2),lam('#cbd5e1'),0);gr.position.set(0,.01,-2.4);g2.add(gr);
    for(let i=0;i<3;i++){const b=mk(new THREE.BoxGeometry(2*R-.02,.04,.12),lam(['#fdba74','#a5d8ff','#d6ecff'][i]),0);b.position.set(-2.0+R*(2*i+1),.03,-2.05);g2.add(b);}const dl=label('3 diameters',{size:.15,color:'#e4572e'});dl.position.set(-2.0+3*R,.2,-1.85);g2.add(dl);
    trail=new THREE.Group();g2.add(trail);
    const cmp=new THREE.Group();cmp.position.set(1.2,0,-.9);g2.add(cmp);const paper=mk(new THREE.CylinderGeometry(1.0,1.0,.02,40),lam('#ffffff'),20);paper.position.y=.01;cmp.add(paper);cmp.userData.R=Math.min(.9,R*1.1);st.cmp=cmp;A.redraw();}
  function roll(){const R=st.r*sc,C=2*Math.PI*R;clearGroup(trail);tween(2.2,k=>{wheel.position.x=-2.0+C*k;wheel.rotation.z=-2*Math.PI*k;}).then(()=>{const l=mk(new THREE.BoxGeometry(C,.05,.12),lam('#2f7de1'),0);l.position.set(-2.0+C/2,.04,-2.75);trail.add(l);const t=label('C ≈ '+Math.round(PI*2*st.r*100)/100+' cm',{size:.22,bg:'#ffffff'});t.position.set(-2.0+C/2,.4,-2.75);trail.add(t);A.pop();A.say('About 3.14 diameters');});}
  function construct(){const cmp=st.cmp,R=cmp.userData.R;const pts=[];let line=null;tween(1.6,k=>{if(line){cmp.remove(line);line.geometry.dispose();}const n=Math.max(2,Math.floor(48*k));const ps=[];for(let i=0;i<=n;i++){const a=i/48*Math.PI*2;ps.push(V(Math.cos(a)*R,.03,-Math.sin(a)*R));}
      line=new THREE.Line(new THREE.BufferGeometry().setFromPoints(ps),new THREE.LineBasicMaterial({color:'#16a36f'}));cmp.add(line);}).then(()=>{A.pop();A.say('r = '+st.r+' cm');});
    const leg=mk(new THREE.BoxGeometry(R,.03,.03),lam(INK),0);leg.position.set(R/2,.08,0);cmp.add(leg);}
  function setR(r){st.r=Math.max(1,Math.min(10,r));A.pop();draw();if(mode==='play'&&!st.setup&&st.want!=null&&st.r===st.want)game.solved('Yes! r = '+st.r+' cm, d = '+2*st.r+' cm, C ≈ '+Math.round(PI*2*st.r*100)/100+' cm.');}
  draw();
  return {info:()=>'r = '+st.r+' cm',
    controls:()=>{const c=[{t:'radius −',fn:()=>setR(st.r-1)},{t:'radius +',fn:()=>setR(st.r+1)},{t:'Roll',go:true,fn:roll},{t:'Construct',fn:construct}];if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);return c;},
    demo(n){st.ask=null;st.want=null;st.r=5;draw();if(n==='roll')A.seq([[700,roll]]);if(n==='draw'){st.r=3;draw();A.seq([[700,construct]]);}},
    task(r){st.setup=true;st.ask=null;st.want=null;let txt;st.r=rnd(2,6);
      if(r===0){const d=2*st.r,C=Math.round(PI*d*100)/100;st.ask={ans:C+' cm',o:shuffle([C+' cm',Math.round(PI*st.r*100)/100+' cm',(d*3)+' cm']),ok:'Yes! 3.14 × '+d+' = '+C+'.'};txt='The radius is *'+st.r+' cm*. Find the *circumference*.';}
      else if(r===1){st.want=pick([3,4,7]);st.r=1;txt='Construct a circle with a *diameter* of *'+2*st.want+' cm*. Set the radius.';}
      else if(r===2){st.want=pick([5,10]);st.r=1;txt='Construct a circle with a *circumference* of *'+Math.round(PI*2*st.want*100)/100+' cm*. (d = C ÷ 3.14)';}
      else if(r===3){const d=pick([50,60,70]);const C=Math.round(PI*d*10)/10;st.ask={ans:C+' cm',o:shuffle([C+' cm',d*2+' cm',Math.round(PI*d*2*10)/10+' cm']),ok:'Yes! 3.14 × '+d+' = '+C+' cm.'};txt='A bike wheel has a *diameter* of *'+d+' cm*. How far does it roll in *one turn*?';}
      else{st.ask={ans:'About 3.14',o:['About 2','About 3.14','About 4'],ok:'Yes! That ratio is π.'};txt='For any circle, *circumference ÷ diameter* is…';}
      draw();st.setup=false;return txt;}};}
});

/* =========================================================
   30. Area of a circle
   ========================================================= */
P.lesson({id:'circarea7',title:'Area of a circle',strand:'Spatial Sense',codes:['E2.5'],
 guide:{goal:'Show the relationships between the radius, diameter and area of a circle, and use them to explain the formula A = π × r × r and to solve problems.',words:'area, radius, sector, pi (π), r², parallelogram',
  ask:['Why does cutting a circle into many sectors make a shape like a parallelogram?','Why is the area π × r × r and not π × d?','What happens to the area if the radius doubles?'],home:'Cut a paper plate into 8 or 16 wedges and arrange them in a row, alternating up and down. What shape do you see?'},
 learn:[{say:'Cut and rearrange.',speech:'Zuri cuts the circle into sixteen sectors and arranges them in a row, alternating up and down. The shape is almost a parallelogram. Its base is half the circumference, pi times r, and its height is r.',view:'model',demo:'cut'},
        {say:'Read the formula.',speech:'The area of the parallelogram is base times height: pi times r, times r. So the area of a circle is pi times r times r, or pi r squared.',view:'read'},
        {say:'Watch: double the radius.',speech:'Double the radius from three to six. The area is not doubled: it is four times as big, because r is multiplied twice.',view:'model',demo:'double'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: cut and measure.',speech:'Your turn. Change the radius, cut the circle, and read the area.',view:'model'}],
 fig:'A circle cut into sectors, rearranged into a near-parallelogram.',rz:.3,
 explore:['Press *Cut & arrange* and *Put back*.','Change the *radius*.','Area = 3.14 × r × r.'],
 howTo:'Use A = π × r × r, then choose the answer.',
 init:k=>({r:3,cut:0,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'Cut a circle into many equal *sectors* and arrange them: they form a shape close to a *parallelogram*.')+16;
  const n=12,R=60,ox=X0+40,oy=y+80;for(let i=0;i<n;i++){const up=i%2===0;const x=ox+i*R*Math.PI/n*1.0;g.beginPath();if(up){g.moveTo(x,oy+R/2);g.arc(x+R*Math.PI/n,oy+R/2,R,-Math.PI/2-Math.PI/n,-Math.PI/2+Math.PI/n);}else{g.moveTo(x+R*Math.PI/n,oy-R/2);g.arc(x,oy-R/2,R,Math.PI/2-Math.PI/n,Math.PI/2+Math.PI/n);}g.closePath();g.fillStyle=up?'#93c5fd':'#3b82f6';g.fill();}
  T(g,'base ≈ π × r',ox+180,oy+70,FT.smallB,'#2563eb','center');T(g,'height = r',ox+420,oy,FT.smallB,'#2563eb');y+=170;
  rr(g,X0,y,TW,96,16);g.fillStyle=tint(acc(),.12);g.fill();T(g,'A = π × r × r  (π r²)',X0+TW/2,y+60,ZS(42),acc(),'center');y+=124;
  y=para(p,y,'r = 3 cm: A ≈ 3.14 × 3 × 3 = *28.26 cm²*. Double r to 6: A ≈ 113.04 cm², *4 times* as big.')+10;
  y=keyWords(p,y,[['sector','a pie-shaped part of a circle'],['r²','r × r, “r squared”']]);
  predict(p,y,S,'p30','A circle has a diameter of 10 cm. What is its area?','*About 78.5 cm².* r = 5, so 3.14 × 25.');},
 readout(p,S,y){const g=p.g,st=S.st;T(g,'A = 3.14 × '+st.r+' × '+st.r+' ≈ '+Math.round(PI*st.r*st.r*100)/100+' cm²',X0,y+52,ZS(42),acc());return y+70;},
 build(S,grp,mode,game){const st=S.st,sc=.18,n=16;const g2=new THREE.Group();grp.add(g2);let secs=[];
  function draw(){clearGroup(g2);secs=[];const R=st.r*sc;for(let i=0;i<n;i++){const a0=i*2*Math.PI/n,a1=(i+1)*2*Math.PI/n;const pivot=new THREE.Group();const m=mk(wedgeGeo(R,.08,a0+.005,a1-.005),lam(i%2?'#3b82f6':'#93c5fd'),20);pivot.add(m);g2.add(pivot);secs.push({p:pivot,a0,a1});}place(st.cut);
    const l=label('A ≈ '+Math.round(PI*st.r*st.r*100)/100+' cm²',{size:.26,bg:'#ffffff'});l.position.set(0,1.4,-2.0);g2.add(l);A.redraw();}
  function place(k){const R=st.r*sc,w=Math.PI*R/(n/2);secs.forEach((s,i)=>{const mid=(s.a0+s.a1)/2;const cx0=-.2,cz0=-2.1;const up=i%2===0;const tx=-Math.PI*R/2+Math.floor(i/2)*w+(up?w/2:w),tz=up?-1.15:-1.15-R;
      let targetRot=up?Math.PI/2-mid:-Math.PI/2-mid;targetRot=Math.atan2(Math.sin(targetRot),Math.cos(targetRot));s.p.position.set(cx0+(tx-cx0)*k,0,cz0+(tz-cz0)*k+(up?0:0)*k);s.p.rotation.y=targetRot*k;});}
  function anim(to){const k0=st.cut;tween(1.6,k=>{st.cut=k0+(to-k0)*k;place(st.cut);}).then(()=>{A.pop();A.say(to?'base ≈ π × r, height r':'back to a circle');});}
  draw();
  return {info:()=>'r = '+st.r,
    controls:()=>{const c=[{t:'Cut & arrange',go:true,fn:()=>anim(1)},{t:'Put back',fn:()=>anim(0)},{t:'radius −',fn:()=>{st.r=Math.max(1,st.r-1);draw();}},{t:'radius +',fn:()=>{st.r=Math.min(6,st.r+1);draw();}}];if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);return c;},
    demo(n){st.ask=null;st.cut=0;st.r=4;draw();if(n==='cut')A.seq([[700,()=>anim(1)],[2600,()=>anim(0)]]);if(n==='double'){st.r=3;draw();A.seq([[900,()=>{st.r=6;draw();A.say('r doubles, area × 4');}]]);}},
    task(r){st.setup=true;st.cut=0;let txt;st.r=rnd(2,6);const A2=Math.round(PI*st.r*st.r*100)/100;
      if(r===0){st.ask={ans:A2+' cm²',o:shuffle([A2+' cm²',Math.round(PI*2*st.r*100)/100+' cm²',Math.round(PI*st.r*100)/100+' cm²']),ok:'Yes! 3.14 × '+st.r+' × '+st.r+' = '+A2+'.'};txt='The radius is *'+st.r+' cm*. Find the *area*.';}
      else if(r===1){const d=2*st.r;st.ask={ans:A2+' cm²',o:shuffle([A2+' cm²',Math.round(PI*d*d*100)/100+' cm²',Math.round(PI*d*100)/100+' cm²']),ok:'Yes! r = '+st.r+', so A = '+A2+' cm².'};txt='The *diameter* is *'+d+' cm*. Find the *area*. (Find r first!)';}
      else if(r===2){st.ask={ans:'4 times as big',o:['2 times as big','4 times as big','The same'],ok:'Yes! r is used twice, so 2 × 2 = 4.'};txt='If the radius *doubles*, the area becomes…';}
      else if(r===3){st.ask={ans:'r',o:['r','d','π'],ok:'Yes! The height of the rearranged shape is the radius.'};txt='When the sectors are arranged, what is the *height* of the parallelogram?';}
      else{const rr2=pick([2,3,5]);const a=Math.round(PI*rr2*rr2*100)/100;st.ask={ans:a+' m²',o:shuffle([a+' m²',Math.round(PI*2*rr2*100)/100+' m²',rr2*rr2+' m²']),ok:'Yes! 3.14 × '+rr2*rr2+' = '+a+' m².'};txt='A sprinkler waters a circle with a radius of *'+rr2+' m*. What area does it water?';}
      draw();st.setup=false;return txt;}};}
});

/* =========================================================
   31. Cylinders: nets, surface area and volume
   ========================================================= */
P.lesson({id:'cylinder7',title:'Cylinders: surface area and volume',strand:'Spatial Sense',codes:['E2.6','E2.7'],
 guide:{goal:'Represent cylinders as nets and find their surface area, and show that the volume of a prism or cylinder is the area of its base times its height.',words:'cylinder, net, surface area, circumference, base area, volume, height',
  ask:['Why is the rectangle in a cylinder’s net as long as the circumference?','How does stacking layers explain V = base area × height?','How can you find the height if you know the volume and the base area?'],home:'Peel the label off a can. Measure it: its length is the can’s circumference. Find the can’s surface area.'},
 learn:[{say:'Unroll the can.',speech:'A cylinder’s net is two circles and a rectangle. Watch Tariq’s can label unroll: its length is the circumference, two pi r, and its width is the height of the can.',view:'model',demo:'net'},
        {say:'Read the formulas.',speech:'Surface area equals two circles plus the rectangle: two times pi r squared, plus two pi r times h. Volume equals the area of the base times the height, for any prism or cylinder.',view:'read'},
        {say:'Watch: stacking layers.',speech:'Stack layers that are each one centimetre thick. Each layer is the base area. Ten layers make a volume of ten times the base area.',view:'model',demo:'stack'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: change the can.',speech:'Your turn. Change the radius and the height, unroll the net, and stack the layers.',view:'model'}],
 fig:'A cylinder that unrolls into its net, and stacks as layers.',rz:.3,
 explore:['Change the *radius* and *height*.','Press *Unroll* to see the net.','Press *Stack* to build the volume layer by layer.'],
 howTo:'Find the surface area or volume (or a missing measure), then choose the answer.',
 init:k=>({r:3,h:8,mode:'solid',layers:0,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'A *cylinder* has two circular bases and a curved side. Unrolled, the side is a *rectangle* as long as the circumference.')+14;
  g.beginPath();g.arc(X0+70,y+50,40,0,Math.PI*2);g.fillStyle='#93c5fd';g.fill();g.beginPath();g.arc(X0+70,y+230,40,0,Math.PI*2);g.fill();rr(g,X0+20,y+95,350,95,4);g.fillStyle='#60a5fa';g.fill();
  T(g,'2πr',X0+200,y+150,FT.bodyB,'#fff','center');T(g,'h',X0+380,y+150,FT.bodyB,'#2563eb');y+=262;
  [['Surface area','2 × π r²  +  2π r × h'],['Volume','base area × height'],['Cylinder','V = π r² × h'],['Prism','V = (area of base) × h']].forEach(([a,b],i)=>{rr(g,X0,y+i*54,TW,46,12);g.fillStyle=tint(acc(),.06+i%2*.05);g.fill();T(g,a,X0+20,y+i*54+32,FT.bodyB,acc());T(g,b,X0+TW-20,y+i*54+32,FT.bodyB,INK,'right');});y+=230;
  y=keyWords(p,y,[['surface area','total area of all surfaces'],['base area','the area of the base face']]);
  predict(p,y,S,'p31','A prism has a base area of 12 cm² and a volume of 96 cm³. How tall is it?','*8 cm.* 96 ÷ 12 = 8.');},
 readout(p,S,y){const g=p.g,st=S.st,B=Math.round(PI*st.r*st.r*100)/100,SA=Math.round((2*PI*st.r*st.r+2*PI*st.r*st.h)*100)/100,Vv=Math.round(B*st.h*100)/100;T(g,'base area '+B+' cm²   ·   SA '+SA+' cm²',X0,y+42,FT.bodyB,acc());T(g,'V = '+B+' × '+st.h+' = '+Vv+' cm³',X0,y+84,ZS(36),acc());return y+96;},
 build(S,grp,mode,game){const st=S.st,sc=.1;const g2=new THREE.Group();grp.add(g2);
  function draw(){clearGroup(g2);const R=st.r*sc,H=st.h*sc;
    if(st.mode==='solid'){const c=mk(new THREE.CylinderGeometry(R,R,H,40),new THREE.MeshLambertMaterial({color:'#60a5fa',transparent:true,opacity:st.layers?.25:.9}),0);c.position.set(-.5,H/2+.02,-1.8);g2.add(c);
      for(let i=0;i<st.layers;i++){const l=mk(new THREE.CylinderGeometry(R*.98,R*.98,sc*.9,40),lam(i%2?'#f59e0b':'#fbbf24'),0);l.position.set(-.5,sc/2+.02+i*sc,-1.8);g2.add(l);}
      const rl=label('r = '+st.r+' cm',{size:.18,bg:'#ffffff'});rl.position.set(-.5+R+.4,H+.1,-1.8);g2.add(rl);const hl=label('h = '+st.h+' cm',{size:.18,bg:'#ffffff'});hl.position.set(-.5-R-.45,H/2,-1.8);g2.add(hl);}
    else{const C=2*Math.PI*R;const rect=mk(new THREE.BoxGeometry(C,.03,H),lam('#60a5fa'),20);rect.position.set(-2.0+C/2+.1,.02,-1.8);g2.add(rect);[-1,1].forEach(s=>{const d=mk(new THREE.CylinderGeometry(R,R,.03,40),lam('#93c5fd'),20);d.position.set(-2.0+R+.3,.02,-1.8+s*(H/2+R+.02));g2.add(d);});
      const cl=label('2πr ≈ '+Math.round(PI*2*st.r*100)/100+' cm',{size:.17,bg:'#ffffff'});cl.position.set(-2.0+C/2,.3,-1.8);g2.add(cl);}A.redraw();}
  function stack(){st.mode='solid';st.layers=0;draw();const l=[];for(let i=1;i<=st.h;i++)l.push([180,()=>{st.layers=i;draw();}]);l.push([400,()=>A.say(st.h+' layers × base area')]);A.seq(l);}
  draw();
  return {info:()=>'r '+st.r+', h '+st.h,
    controls:()=>{const c=[{t:'Unroll',fn:()=>{st.mode='net';draw();}},{t:'Roll up',fn:()=>{st.mode='solid';st.layers=0;draw();}},{t:'Stack layers',go:true,fn:stack},{t:'r −',fn:()=>{st.r=Math.max(1,st.r-1);draw();}},{t:'r +',fn:()=>{st.r=Math.min(6,st.r+1);draw();}},{t:'h −',fn:()=>{st.h=Math.max(2,st.h-1);draw();}},{t:'h +',fn:()=>{st.h=Math.min(14,st.h+1);draw();}}];
      if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);return c;},
    demo(n){st.ask=null;st.r=3;st.h=8;st.layers=0;if(n==='net'){st.mode='solid';draw();A.seq([[900,()=>{st.mode='net';draw();A.say('The side unrolls into a rectangle 2πr long.');}]]);}if(n==='stack')stack();},
    task(r){st.setup=true;st.mode='solid';st.layers=0;st.r=rnd(2,5);st.h=rnd(4,10);let txt;const B=Math.round(PI*st.r*st.r*100)/100,Vv=Math.round(B*st.h*100)/100,SA=Math.round((2*PI*st.r*st.r+2*PI*st.r*st.h)*100)/100;
      if(r===0){st.ask={ans:Vv+' cm³',o:shuffle([Vv+' cm³',Math.round(PI*2*st.r*st.h*100)/100+' cm³',SA+' cm³']),ok:'Yes! '+B+' × '+st.h+' = '+Vv+'.'};txt='Find the *volume* of the cylinder.';}
      else if(r===1){st.ask={ans:SA+' cm²',o:shuffle([SA+' cm²',Vv+' cm²',Math.round(PI*2*st.r*st.h*100)/100+' cm²']),ok:'Yes! 2 circles + the rectangle = '+SA+' cm².'};txt='Find the *surface area* of the cylinder. Unroll it to help.';}
      else if(r===2){const C=Math.round(PI*2*st.r*100)/100;st.ask={ans:C+' cm',o:shuffle([C+' cm',st.h+' cm',Math.round(PI*st.r*100)/100+' cm']),ok:'Yes! The rectangle is as long as the circumference.'};txt='How *long* is the rectangle in this cylinder’s net?';}
      else if(r===3){const b=pick([12,15,20]),h=rnd(4,9);st.ask={ans:h+' cm',o:shuffle([h+' cm',(b*h)+' cm',(h+2)+' cm']),ok:'Yes! '+b*h+' ÷ '+b+' = '+h+'.'};txt='A prism has a *base area* of *'+b+' cm²* and a *volume* of *'+b*h+' cm³*. Find its *height*.';}
      else{const b=pick([6,8,10]),h=rnd(3,8);st.ask={ans:b*h+' cm³',o:shuffle([b*h+' cm³',(b+h)+' cm³',(2*b*h)+' cm³']),ok:'Yes! base area × height = '+b*h+'.'};txt='A triangular prism has a base area of *'+b+' cm²* and height *'+h+' cm*. Find its *volume*.';}
      draw();st.setup=false;return txt;}};}
});

/* =========================================================
   32. Currency exchange
   ========================================================= */
const CUR=[{c:'USD',n:'US dollar',r:.73,col:'#16a34a',sym:'US$'},{c:'EUR',n:'euro',r:.67,col:'#2563eb',sym:'€'},{c:'MXN',n:'Mexican peso',r:13.5,col:'#dc2626',sym:'MX$'},{c:'GBP',n:'British pound',r:.57,col:'#7c3aed',sym:'£'}];
P.lesson({id:'exchange7',title:'Exchange rates and foreign currency',strand:'Financial Literacy',codes:['F1.1'],
 guide:{goal:'Identify and compare exchange rates, and convert foreign currencies to Canadian dollars and Canadian dollars to foreign currencies.',words:'exchange rate, currency, convert, Canadian dollar (CAD), foreign currency',
  ask:['If 1 CAD = 0.73 USD, how many US dollars do you get for $100 CAD?','How do you convert 50 USD back to Canadian dollars?','Why do exchange rates change?'],home:'Look up today’s exchange rate for a country you would like to visit. How much would a $20 meal cost there?'},
 learn:[{say:'Exchange rates convert money.',speech:'An exchange rate tells how much of another currency you get for one Canadian dollar. If one Canadian dollar is worth zero point seven three US dollars, then Maya’s one hundred Canadian dollars is worth seventy-three US dollars. Watch the coins change.',view:'model',demo:'convert'},
        {say:'Read both directions.',speech:'To go from Canadian dollars to the foreign currency, multiply by the rate. To go back to Canadian dollars, divide by the rate. Rates are illustrative here and change every day.',view:'read'},
        {say:'Watch: back to Canadian.',speech:'You have fifty euros left after a trip. At zero point six seven euros per Canadian dollar, fifty divided by zero point six seven is about seventy-four Canadian dollars and sixty-three cents.',view:'model',demo:'back'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: exchange money.',speech:'Your turn. Choose a currency and an amount, then convert both ways.',view:'model'}],
 fig:'Stacks of Canadian dollars converting into another currency.',rz:.3,
 explore:['Choose a *currency*.','Change the *amount* in CAD.','Press *Convert* or *Convert back*.'],
 howTo:'Convert using the exchange rate, then choose the answer.',
 init:k=>({ci:0,cad:100,dir:1,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'An *exchange rate* compares two currencies. (Rates below are examples; real rates change daily.)')+14;
  rr(g,X0,y,TW,44,12);g.fillStyle=tint(acc(),.16);g.fill();['Currency','1 CAD =','100 CAD ='].forEach((h,i)=>T(g,h,X0+20+i*TW/3,y+30,FT.smallB,acc()));y+=48;
  CUR.forEach((c,j)=>{T(g,c.n+' ('+c.c+')',X0+20,y+j*40+28,FT.small,c.col);T(g,c.r+' '+c.c,X0+20+TW/3,y+j*40+28,FT.bodyB);T(g,(Math.round(c.r*100*100)/100)+' '+c.c,X0+20+2*TW/3,y+j*40+28,FT.bodyB);});y+=180;
  [['CAD → foreign','× rate','100 × 0.73 = 73 USD'],['foreign → CAD','÷ rate','73 ÷ 0.73 = 100 CAD']].forEach(([a,b,c],i)=>{rr(g,X0,y+i*66,TW,58,14);g.fillStyle=tint(acc(),.08);g.fill();T(g,a,X0+20,y+i*66+38,FT.bodyB,acc());T(g,b,X0+260,y+i*66+38,FT.bodyB);T(g,c,X0+TW-20,y+i*66+38,FT.body,INK,'right');});y+=150;
  y=keyWords(p,y,[['exchange rate','how much of one currency equals one unit of another'],['currency','the money used in a country']]);
  predict(p,y,S,'p32','1 CAD = 13.5 MXN. A taco costs 54 MXN. How much is that in CAD?','*$4.00.* 54 ÷ 13.5 = 4.');},
 readout(p,S,y){const g=p.g,st=S.st,c=CUR[st.ci];T(g,'$'+st.cad.toFixed(2)+' CAD = '+(st.cad*c.r).toFixed(2)+' '+c.c,X0,y+50,ZS(40),acc());T(g,'rate: 1 CAD = '+c.r+' '+c.c,X0,y+90,FT.bodyB);return y+98;},
 build(S,grp,mode,game){const st=S.st;const g2=new THREE.Group();grp.add(g2);
  function coins(n,col,x,z){const g=new THREE.Group();const k=Math.min(60,Math.round(n));for(let i=0;i<k;i++){const c=mk(G('ex7c'+col,()=>new THREE.CylinderGeometry(.12,.12,.035,18)),lam(col),0);c.position.set(x+((Math.floor(i/15))%4)*.28,.02+(i%15)*.037,z);g.add(c);}return g;}
  function draw(){clearGroup(g2);const c=CUR[st.ci];const left=coins(st.cad/5,'#dc2626',-1.9,-2.2);g2.add(left);const right=coins(st.cad*c.r/(c.r>5?60:5),c.col,.7,-2.2);g2.add(right);
    const l1=label('$'+st.cad.toFixed(2)+' CAD',{size:.24,bg:'#ffffff',border:'#dc2626'});l1.position.set(-1.5,1.0,-2.2);g2.add(l1);const l2=label((st.cad*c.r).toFixed(2)+' '+c.c,{size:.24,bg:'#ffffff',border:c.col});l2.position.set(1.1,1.0,-2.2);g2.add(l2);
    const ar=label(st.dir>0?'× '+c.r+'  →':'←  ÷ '+c.r,{size:.26,color:BLUE});ar.position.set(-.2,.5,-2.2);g2.add(ar);A.redraw();}
  draw();
  return {info:()=>CUR[st.ci].c,
    controls:()=>{const c=CUR.map((q,i)=>({t:q.c,on:st.ci===i,fn:()=>{st.ci=i;draw();}})).concat([{t:'CAD −10',fn:()=>{st.cad=Math.max(10,st.cad-10);draw();}},{t:'CAD +10',fn:()=>{st.cad=Math.min(300,st.cad+10);draw();}},{t:'Convert →',go:true,fn:()=>{st.dir=1;A.pop();draw();}},{t:'← Convert back',fn:()=>{st.dir=-1;A.pop();draw();}}]);
      if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c.slice(4,6));return c;},
    demo(n){st.ask=null;if(n==='convert'){st.ci=0;st.cad=100;st.dir=1;draw();A.say('$100 CAD × 0.73 = 73 USD');}if(n==='back'){st.ci=1;st.cad=74.63;st.dir=-1;draw();A.say('50 EUR ÷ 0.67 ≈ $74.63 CAD');}},
    task(r){st.setup=true;let txt;st.ci=r%4;const c=CUR[st.ci];
      if(r===0||r===2){st.cad=pick([50,100,200]);st.dir=1;const v=(st.cad*c.r).toFixed(2);st.ask={ans:v+' '+c.c,o:shuffle([v+' '+c.c,(st.cad/c.r).toFixed(2)+' '+c.c,(st.cad*c.r*10).toFixed(2)+' '+c.c]),ok:'Yes! '+st.cad+' × '+c.r+' = '+v+'.'};txt='Convert *$'+st.cad+' CAD* to *'+c.n+'s*.';}
      else if(r===1){const f=pick([20,50,80]);st.cad=Math.round(f/c.r*100)/100;st.dir=-1;const v=(f/c.r).toFixed(2);st.ask={ans:'$'+v,o:shuffle(['$'+v,'$'+(f*c.r).toFixed(2),'$'+f.toFixed(2)]),ok:'Yes! '+f+' ÷ '+c.r+' = '+v+'.'};txt='Convert *'+f+' '+c.c+'* back to *Canadian dollars*.';}
      else if(r===3){st.cad=100;st.dir=1;st.ask={ans:'Divide by the rate',o:['Multiply by the rate','Divide by the rate'],ok:'Yes! Going back to CAD, divide.'};txt='To change *pounds* back to *Canadian dollars*, do you multiply or divide by the rate?';}
      else{st.ci=2;st.cad=4;st.dir=-1;st.ask={ans:'$4.00',o:shuffle(['$4.00','$729.00','$40.00']),ok:'Yes! 54 ÷ 13.5 = 4.'};txt='A taco costs *54 MXN* (1 CAD = 13.5 MXN). How much in *CAD*?';}
      draw();st.setup=false;return txt;}};}
});

/* =========================================================
   33. Long-term budgets and financial decisions
   ========================================================= */
P.lesson({id:'budget7',title:'Long-term budgets and decisions',strand:'Financial Literacy',codes:['F1.2','F1.3','F1.4'],
 guide:{goal:'Identify reliable sources of financial information, create, track and adjust budgets for longer-term goals, and describe societal and personal factors that influence financial decisions.',words:'long-term goal, budget, track, adjust, reliable source, influence, advertising, peer pressure',
  ask:['How do you know if a money tip online is reliable?','What can you adjust if you are behind on a savings goal?','How might ads or friends affect what you buy?'],home:'Pick a goal that takes a year, like a $600 laptop. Plan a monthly budget, then track it for 3 months.'},
 learn:[{say:'Track a goal month by month.',speech:'Maya wants a six hundred dollar laptop in one year. She saves fifty dollars a month. Watch her savings grow toward the goal line. If she spends extra one month, the bar dips, and she must adjust.',view:'model',demo:'track'},
        {say:'Read about reliable sources and influences.',speech:'Reliable information comes from banks, government websites, and financial educators, not from random social media posts. Ads, friends, family values and events can all influence money decisions.',view:'read'},
        {say:'Watch: adjust the plan.',speech:'Maya fell behind. She adjusts: she saves seventy dollars a month for the rest of the year and still reaches her goal.',view:'model',demo:'adjust'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: plan and adjust.',speech:'Your turn. Set the monthly saving, add surprise expenses, and adjust to reach the goal.',view:'model'}],
 fig:'Twelve months of savings bars climbing toward a goal line.',rz:.3,
 explore:['Set the *monthly saving*.','Add a *surprise expense* in a month.','*Adjust* the plan to reach the goal.'],
 howTo:'Use the budget model to answer the question, or adjust the plan to reach the goal.',
 init:k=>({save:50,goal:600,hit:[],extra:0,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'A *long-term* goal needs a plan you *track* and *adjust*.')+12;
  [['1','Set the goal','$600 laptop in 12 months'],['2','Budget','save $50 a month'],['3','Track','check the total every month'],['4','Adjust','save more, spend less, or move the date']].forEach(([n,a,b],i)=>{T(g,n,X0+12,y+30+i*48,ZS(30),acc());T(g,a,X0+50,y+28+i*48,FT.bodyB);T(g,b,X0+260,y+28+i*48,FT.body,GREY);});y+=210;
  rr(g,X0,y,TW/2-8,150,14);g.fillStyle=tint('#16a36f',.14);g.fill();T(g,'Reliable sources',X0+16,y+34,FT.bodyB,'#16a36f');wrap(g,'banks and credit unions, government websites, school or library programs, trusted adults',X0+16,y+64,TW/2-40,26,{font:FT.small});
  rr(g,X0+TW/2+8,y,TW/2-8,150,14);g.fillStyle=tint('#f59e0b',.16);g.fill();T(g,'Influences',X0+TW/2+24,y+34,FT.bodyB,'#b45309');wrap(g,'ads and influencers, friends, family values, culture, prices going up',X0+TW/2+24,y+64,TW/2-40,26,{font:FT.small});y+=172;
  y=keyWords(p,y,[['long-term goal','a goal that takes many months or years'],['reliable source','information you can trust: accurate and unbiased']]);
  predict(p,y,S,'p33','You need $600 in 12 months but have only $200 after 6 months. How much a month for the rest?','*About $66.67 a month.* $400 ÷ 6.');},
 readout(p,S,y){const g=p.g,st=S.st,tot=tl(st)[11];T(g,'Total after 12 months: $'+tot,X0,y+44,ZS(40),tot>=st.goal?'#16a36f':acc());T(g,'saving $'+st.save+'/month · goal $'+st.goal+(st.hit.length?' · surprises: '+st.hit.length:''),X0,y+84,FT.body);return y+94;},
 build(S,grp,mode,game){const st=S.st;const g2=new THREE.Group();grp.add(g2);
  function draw(){clearGroup(g2);const t=tl(st),sc=2.2/800;t.forEach((v,i)=>{const h=Math.max(.01,v*sc);const b=mk(new THREE.BoxGeometry(.26,h,.4),lam(st.hit.includes(i)?'#f59e0b':v>=st.goal?'#16a36f':'#3b82f6'),20);b.position.set(-2.0+i*.34,h/2,-1.8);g2.add(b);
      const l=label(['J','F','M','A','M','J','J','A','S','O','N','D'][i],{size:.13,color:GREY});l.position.set(-2.0+i*.34,.1,-1.45);g2.add(l);});
    const gl=mk(new THREE.BoxGeometry(4.2,.02,.02),lam('#16a36f'),0);gl.position.set(-.1,st.goal*sc,-2.05);g2.add(gl);const fl=label('goal $'+st.goal,{size:.18,color:'#16a36f'});fl.position.set(1.9,st.goal*sc+.15,-2.05);g2.add(fl);
    const tl2=label('$'+t[11],{size:.22,bg:'#ffffff'});tl2.position.set(1.75,t[11]*sc+.3,-1.8);g2.add(tl2);A.redraw();}
  function check(){if(mode==='play'&&!st.setup&&st.need&&tl(st)[11]>=st.goal)game.solved('Goal reached: $'+tl(st)[11]+'!');}
  draw();
  return {info:()=>'$'+st.save+'/month',
    controls:()=>{const c=[{t:'save −10',fn:()=>{st.save=Math.max(10,st.save-10);draw();check();}},{t:'save +10',go:true,fn:()=>{st.save=Math.min(120,st.save+10);draw();check();}},{t:'Surprise expense',fn:()=>{const i=rnd(1,10);if(!st.hit.includes(i))st.hit.push(i);draw();A.say('A surprise cost of $80 in month '+(i+1)+'!');}},{t:'Clear surprises',fn:()=>{st.hit=[];draw();}}];
      if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);return c;},
    demo(n){st.ask=null;st.need=false;if(n==='track'){st.save=50;st.hit=[];draw();A.seq([[1000,()=>{st.hit=[4];draw();A.say('An $80 surprise in May: behind!');}]]);}if(n==='adjust'){st.save=50;st.hit=[4];draw();A.seq([[900,()=>{st.save=60;draw();}],[700,()=>{st.save=70;draw();A.say('Saving more gets back on track.');}]]);}},
    task(r){st.setup=true;st.ask=null;st.need=false;st.hit=[];st.save=50;st.goal=600;let txt;
      if(r===0){st.save=30;st.need=true;txt='Adjust the monthly saving so you reach the *$600* goal in 12 months.';}
      else if(r===1){st.hit=[3,7];st.save=50;st.need=true;txt='Two surprise expenses hit. *Adjust* the saving to still reach $600.';}
      else if(r===2){st.ask={ans:'A government financial website',o:shuffle(['A government financial website','A random video comment','An ad for a credit card']),ok:'Yes! Government and bank sources are reliable.'};txt='Which is the most *reliable* source of money advice?';}
      else if(r===3){st.ask={ans:'Advertising',o:shuffle(['Advertising','Interest rates','A savings account']),ok:'Yes! Ads are a societal influence on spending.'};txt='Which is a *societal* factor that can influence what you buy?';}
      else{st.ask={ans:'$50',o:['$40','$50','$60'],ok:'Yes! $600 ÷ 12 = $50 a month.'};txt='How much must you save *each month* to reach *$600* in *12 months*?';}
      draw();st.setup=false;return txt;}};}
});
function tl(st){let s=0;return Array.from({length:12},(_,i)=>{s+=st.save;if(st.hit.includes(i))s-=80;return Math.max(0,s);});}

/* =========================================================
   34. Interest: savings, investments and borrowing
   ========================================================= */
P.lesson({id:'interest7',title:'Interest rates, accounts and loans',strand:'Financial Literacy',codes:['F1.5','F1.6'],
 guide:{goal:'Explain how interest rates affect savings, investments and the cost of borrowing over time, and compare interest rates and fees for accounts and loans to find the best option.',words:'simple interest, compound interest, interest rate, fee, principal, loan, account',
  ask:['Why does compound interest grow faster than simple interest?','How can a monthly fee cancel out interest?','Why does borrowing at a high rate cost so much over time?'],home:'Compare two real bank accounts online: their interest rates and monthly fees. Which is better for $500?'},
 learn:[{say:'Interest on interest.',speech:'Ines puts one thousand dollars in an account at five percent. With simple interest she earns fifty dollars every year. With compound interest, she also earns interest on her interest, so the bars grow faster each year. Watch ten years.',view:'model',demo:'grow'},
        {say:'Read about rates and fees.',speech:'Savings and investments earn interest. Loans and credit cards charge interest. Accounts can also charge fees. To compare options, look at the interest rate and the fees together.',view:'read'},
        {say:'Watch: borrowing costs.',speech:'Now borrow one thousand dollars at twenty percent and pay nothing back for three years. The debt grows to over one thousand seven hundred dollars. High interest makes borrowing expensive.',view:'model',demo:'loan'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: compare growth.',speech:'Your turn. Change the rate and the fee, and compare simple and compound interest.',view:'model'}],
 fig:'Ten years of growth: simple (blue) and compound (gold).',rz:.3,
 explore:['Change the *interest rate* and the *yearly fee*.','Blue = simple interest; gold = compound interest.','Switch to *Loan* to see a debt grow.'],
 howTo:'Use the model to compare options and choose the answer.',
 init:k=>({P:1000,rate:5,fee:0,loan:false,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'*Simple interest* is paid on the starting amount (the *principal*) only. *Compound interest* is paid on the principal *and* the interest already earned.')+14;
  rr(g,X0,y,TW,44,12);g.fillStyle=tint(acc(),.16);g.fill();['Year','Simple 5%','Compound 5%'].forEach((h,i)=>T(g,h,X0+20+i*TW/3,y+30,FT.smallB,acc()));y+=48;
  [1,2,3,5,10].forEach((n,j)=>{T(g,String(n),X0+20,y+j*36+26,FT.body);T(g,'$'+(1000+50*n).toFixed(2),X0+20+TW/3,y+j*36+26,FT.bodyB,'#2563eb');T(g,'$'+(1000*Math.pow(1.05,n)).toFixed(2),X0+20+2*TW/3,y+j*36+26,FT.bodyB,'#b45309');});y+=222;
  y=para(p,y,'*Compare options:* Account A pays 3% with a $5 monthly fee; Account B pays 1% with no fee. On $500, A earns $15 but costs $60 a year: *B is better*.')+10;
  y=keyWords(p,y,[['principal','the amount you save or borrow at the start'],['compound interest','interest earned on the principal and past interest']]);
  predict(p,y,S,'p34','$200 at 10% compound interest for 2 years. How much?','*$242.* $220 after year 1, then $220 + $22.');},
 readout(p,S,y){const g=p.g,st=S.st,s=st.P+st.P*st.rate/100*10-st.fee*10,c=comp(st,10);T(g,(st.loan?'Loan':'Savings')+' after 10 years: simple $'+s.toFixed(2)+' · compound $'+c.toFixed(2),X0,y+46,FT.bodyB,acc());T(g,'rate '+st.rate+'%  ·  fee $'+st.fee+'/year',X0,y+86,FT.body);return y+96;},
 build(S,grp,mode,game){const st=S.st;const g2=new THREE.Group();grp.add(g2);
  function draw(){clearGroup(g2);const yrs=st.loan?5:10;const mx=Math.max(comp(st,yrs),st.P*2.2),sc=2.2/mx;for(let n=0;n<=yrs;n++){const x=-2.0+n*(4.0/yrs);const s=Math.max(0,st.P+st.P*st.rate/100*n-st.fee*n),c=comp(st,n);
      const b1=mk(new THREE.BoxGeometry(.14,Math.max(.01,s*sc),.3),lam(st.loan?'#fca5a5':'#3b82f6'),20);b1.position.set(x-.08,s*sc/2,-1.8);g2.add(b1);const b2=mk(new THREE.BoxGeometry(.14,Math.max(.01,c*sc),.3),lam(st.loan?'#dc2626':'#f59e0b'),20);b2.position.set(x+.08,c*sc/2,-1.8);g2.add(b2);
      if(n%(st.loan?1:2)===0){const l=label('yr '+n,{size:.12,color:GREY});l.position.set(x,.1,-1.45);g2.add(l);}}
    const end=label('$'+comp(st,yrs).toFixed(0),{size:.22,bg:'#ffffff'});end.position.set(2.0,comp(st,yrs)*sc+.25,-1.8);g2.add(end);A.redraw();}
  draw();
  return {info:()=>st.rate+'%',
    controls:()=>{const c=[{t:'rate −',fn:()=>{st.rate=Math.max(0,st.rate-1);draw();}},{t:'rate +',go:true,fn:()=>{st.rate=Math.min(25,st.rate+1);draw();}},{t:'fee −',fn:()=>{st.fee=Math.max(0,st.fee-12);draw();}},{t:'fee +',fn:()=>{st.fee=Math.min(120,st.fee+12);draw();}},{t:st.loan?'Savings':'Loan',fn:()=>{st.loan=!st.loan;st.rate=st.loan?20:5;st.fee=0;draw();}}];
      if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);return c;},
    demo(n){st.ask=null;if(n==='grow'){st.loan=false;st.rate=0;st.fee=0;draw();A.seq([[700,()=>{st.rate=5;draw();A.say('Compound pulls ahead each year.');}]]);}if(n==='loan'){st.loan=true;st.rate=20;st.fee=0;draw();A.say('$1000 at 20% for 3 years ≈ $1728');}},
    task(r){st.setup=true;st.loan=false;st.fee=0;st.rate=5;let txt;
      if(r===0){const p2=pick([200,500]),rt=pick([2,4,10]);st.ask={ans:'$'+(p2*rt/100),o:shuffle(['$'+(p2*rt/100),'$'+rt,'$'+(p2*rt/10)]),ok:'Yes! '+rt+'% of $'+p2+' = $'+p2*rt/100+'.'};txt='*Simple interest*: how much does *$'+p2+'* earn in *one year* at *'+rt+'%*?';}
      else if(r===1){st.ask={ans:'$242',o:shuffle(['$242','$240','$220']),ok:'Yes! $220, then $220 + $22 = $242.'};txt='*$200* at *10% compound* interest for *2 years* grows to…';}
      else if(r===2){st.ask={ans:'Account B',o:['Account A','Account B'],ok:'Yes! A earns $15 but pays $60 in fees.'};txt='For *$500*: Account A pays *3%* with a *$5/month* fee. Account B pays *1%*, no fee. Which is better?';}
      else if(r===3){st.loan=true;st.rate=20;st.ask={ans:'It grows faster',o:shuffle(['It grows faster','It stays the same','It shrinks']),ok:'Yes! High interest makes a debt grow quickly.'};txt='Compared with a 5% loan, what happens to a debt at *20%* if you don’t pay it?';}
      else{st.ask={ans:'Compound interest',o:['Simple interest','Compound interest'],ok:'Yes! Interest on interest grows faster.'};txt='Over 10 years at the same rate, which grows *more*?';}
      draw();st.setup=false;return txt;}};}
});
function comp(st,n){let v=st.P;for(let i=0;i<n;i++){v=v*(1+st.rate/100)-st.fee;}return Math.max(0,v);}
})();
