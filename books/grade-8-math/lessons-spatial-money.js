/* The Interactive Classroom: Grade 8 Math — Spatial Sense (24–31) and Financial Literacy (32–37) */
(function(){
"use strict";
const P=window.PM;if(!P||P.failed||!P.THREE)return;
const {THREE,V,W,D,PY,PX,X0,TW,INK,RED,BLUE,GREY,VIBE,FT,ZS,G,M,lam,mk,unitBox,cellMat,label,starGeo,wedgeGeo,clearGroup,disposeObj,rr,T,wrap,para,header,keyWords,predict,box,caption,cxOf,cyOf,tint,moveTo,hop,tween,burst,easeOut,easeIO,A}=P;
const acc=()=>P.ACC;
const rnd=(a,b)=>a+Math.floor(Math.random()*(b-a+1)),pick=a=>a[Math.floor(Math.random()*a.length)],shuffle=a=>a.slice().sort(()=>Math.random()-.5);
const r2=v=>Math.round(v*100)/100;const sgn=v=>v<0?'−'+(-v):String(v);const money=v=>'$'+(Math.round(v*100)/100).toFixed(2);
function choices(game,list,ans,ok,lab){return list.map(o=>({t:lab?lab(o):String(o),big:true,fn:()=>{if(o===ans){if(game)game.solved(ok);else A.good(ok);}else A.bad('Not quite. Try again!');}}));}
function slab(pts,col,h,op){const s=new THREE.Shape();pts.forEach(([x,z],i)=>i?s.lineTo(x,-z):s.moveTo(x,-z));s.closePath();const geo=new THREE.ExtrudeGeometry(s,{depth:h||.08,bevelEnabled:false});geo.rotateX(-Math.PI/2);
  return mk(geo,op?new THREE.MeshLambertMaterial({color:col,transparent:true,opacity:op,side:THREE.DoubleSide}):lam(col),20);}
function seg(a,b,col,r){const len=a.distanceTo(b);const m=new THREE.Mesh(new THREE.CylinderGeometry(r,r,Math.max(.001,len),8),lam(col));m.position.copy(a).add(b).multiplyScalar(.5);m.quaternion.setFromUnitVectors(V(0,1,0),b.clone().sub(a).normalize());return m;}
const PI=3.14;

/* =========================================================
   25. Tessellations
   ========================================================= */
const TS={tri:{n:'equilateral triangle',a:60,k:6,col:'#f59e0b',ok:true,tr:'rotations (half turns) and translations'},sq:{n:'square',a:90,k:4,col:'#2f7de1',ok:true,tr:'translations'},hex:{n:'regular hexagon',a:120,k:3,col:'#16a36f',ok:true,tr:'translations'},
  pent:{n:'regular pentagon',a:108,k:3,col:'#e4572e',ok:false,tr:'none: there is a gap'},oct:{n:'octagons and squares',a:135,k:3,col:'#8b5cf6',ok:true,tr:'translations'}};
const TK=Object.keys(TS);
P.lesson({id:'tess8',title:'Tessellations',strand:'Spatial Sense',codes:['E1.1'],
 guide:{goal:'Identify geometric properties of tessellating shapes and identify the transformations that occur in tessellations.',words:'tessellation, regular polygon, interior angle, vertex, 360°, translation, rotation, reflection',
  ask:['Why do regular hexagons tessellate but regular pentagons do not?','What must the angles at each vertex add up to?','Which transformations make a tessellation of triangles?'],home:'Look for tessellations in floors, walls and honeycombs. Sketch one and name the transformations you see.'},
 learn:[{say:'Tiles with no gaps.',speech:'A tessellation covers a surface with no gaps and no overlaps. Watch Ana’s regular hexagons tile the floor. At each vertex, three angles of one hundred twenty degrees make three hundred sixty degrees.',view:'model',demo:'hex'},
        {say:'Read about the angle rule.',speech:'A regular polygon tessellates only if its interior angle divides evenly into three hundred sixty. Triangles: six times sixty. Squares: four times ninety. Hexagons: three times one hundred twenty.',view:'read'},
        {say:'Watch: a pentagon gap.',speech:'Regular pentagons have angles of one hundred eight degrees. Three of them make three hundred twenty-four degrees, leaving a thirty-six degree gap. Four would overlap. Pentagons do not tessellate.',view:'model',demo:'pent'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: try each tile.',speech:'Your turn. Choose a tile, tessellate, and count the angles at a vertex.',view:'model'}],
 fig:'Tiles spread across the floor with no gaps.',rz:.35,
 explore:['Choose a *tile shape*.','Press *Tessellate*.','Press *Vertex* to see the angles around one point.'],
 howTo:'Tessellate the right shape, or choose the answer.',
 init:k=>({sh:'hex',vx:false,want:null,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'A *tessellation* is a pattern of shapes that covers a plane with *no gaps* and *no overlaps*. The angles at every vertex add to *360°*.')+14;
  rr(g,X0,y,TW,44,12);g.fillStyle=tint(acc(),.16);g.fill();['Shape','Angle','At a vertex','Tessellates?'].forEach((h,i)=>T(g,h,X0+16+i*TW/4,y+30,FT.smallB,acc()));y+=48;
  [['triangle','60°','6 × 60° = 360°','yes'],['square','90°','4 × 90° = 360°','yes'],['hexagon','120°','3 × 120° = 360°','yes'],['pentagon','108°','3 × 108° = 324°','no'],['octagon','135°','2 × 135° + 90°','with squares']].forEach((r,j)=>r.forEach((v,i)=>T(g,v,X0+16+i*TW/4,y+j*40+28,i===3?FT.bodyB:FT.small,i===3?(v==='no'?RED:'#16a36f'):INK)));y+=214;
  y=para(p,y,'*Transformations:* squares and hexagons repeat by *translations*. Triangles need *rotations* (half turns) too. Many designs also use *reflections*.')+10;
  y=keyWords(p,y,[['tessellation','a tiling with no gaps or overlaps'],['interior angle','an angle inside a polygon at a vertex']]);
  predict(p,y,S,'p25','Can a regular decagon (144°) tessellate by itself?','*No.* 360 ÷ 144 = 2.5, not a whole number.');},
 readout(p,S,y){const g=p.g,st=S.st,t=TS[st.sh];T(g,t.n[0].toUpperCase()+t.n.slice(1)+': '+t.a+'°',X0,y+46,ZS(40),t.col);T(g,st.sh==='pent'?'3 × 108° = 324°: a 36° gap':st.sh==='oct'?'135° + 135° + 90° = 360°':t.k+' × '+t.a+'° = 360°',X0,y+88,FT.bodyB);return y+98;},
 build(S,grp,mode,game){const st=S.st;const g2=new THREE.Group();grp.add(g2);const cz=-1.45;const fl=mk(new THREE.BoxGeometry(4.6,.02,3.5),lam('#f1f5f9'),20);fl.position.set(0,.01,cz);grp.add(fl);
  function tile(sides,r,col,x,z,rot){const m=mk(G('ts8'+sides+r,()=>new THREE.CylinderGeometry(r*.97,r*.97,.08,sides)),lam(col),20);m.position.set(x,.05,z);m.rotation.y=rot||0;return m;}
  function layout(){const out=[],sh=st.sh;const inside=(x,z)=>Math.abs(x)<2.15&&z>cz-1.6&&z<cz+1.6;
    if(sh==='sq'){const a=.5,r=a/Math.SQRT2;for(let i=-5;i<=5;i++)for(let j=-4;j<=4;j++){const x=i*a,z=cz+j*a;if(inside(x,z))out.push([4,r,x,z,Math.PI/4,(i+j)%2?TS.sq.col:'#60a5fa']);}}
    else if(sh==='hex'){const r=.33,w=r*Math.sqrt(3);for(let j=-5;j<=5;j++)for(let i=-6;i<=6;i++){const x=i*w+(j%2?w/2:0),z=cz+j*1.5*r;if(inside(x,z))out.push([6,r,x,z,0,['#16a36f','#4ade80','#22c55e'][((i+2*j)%3+3)%3]]);}}
    else if(sh==='tri'){const r=.3,a=r*Math.sqrt(3);for(let j=-4;j<=4;j++)for(let i=-8;i<=8;i++){const x=i*a/2+j*a/2,up=(i%2+2)%2===0;const z=cz-j*1.5*r+(up?0:r/2);if(inside(x,z))out.push([3,r,x,z,up?0:Math.PI,up?'#f59e0b':'#fcd34d']);}}
    else if(sh==='oct'){const R=.34,w=2*R*Math.cos(Math.PI/8),s=2*R*Math.sin(Math.PI/8);for(let i=-4;i<=4;i++)for(let j=-3;j<=3;j++){const x=i*w,z=cz+j*w;if(inside(x,z))out.push([8,R,x,z,Math.PI/8,'#8b5cf6']);const x2=x+w/2,z2=z+w/2;if(inside(x2,z2))out.push([4,s/Math.SQRT2*1.0,x2,z2,0,'#fbbf24']);}}
    else{const R=.42,ap=R*Math.cos(Math.PI/5);for(let k=0;k<3;k++){const ang=k*108*Math.PI/180;const d=R;out.push([5,R,Math.sin(ang+Math.PI/5*0)*0,0,0,'#e4572e',k]);}}
    return out.sort((a,b)=>Math.hypot(a[2],a[3]-cz)-Math.hypot(b[2],b[3]-cz));}
  function pentagons(){const R=.5;const ap=R*Math.cos(Math.PI/5);const P0=V(0,0,cz);
    for(let k=0;k<3;k++){/* pentagons share vertex P0; each has interior angle 108 at P0 */const mid=(-90+108*k+54)*Math.PI/180;const cen=V(P0.x+Math.cos(mid)*R,0,P0.z-Math.sin(mid)*R);const m=tile(5,R,k%2?'#fb7a4b':'#e4572e',cen.x,cen.z,0);
      /* rotate so a vertex points at P0: CylinderGeometry vertex 0 is at +z (angle 90° in our xz-up convention) */const want=Math.atan2(-(P0.z-cen.z),P0.x-cen.x);m.rotation.y=want+Math.PI/2;g2.add(m);}
    const gap=mk(wedgeGeo(.55,.1,(-90+324)*Math.PI/180,(270)*Math.PI/180+.0001),lam('#ef4444'),0);gap.position.set(P0.x,.02,P0.z);g2.add(gap);const gl=label('36° gap!',{size:.22,bg:'#ffffff',border:'#ef4444'});gl.position.set(P0.x+.35,.5,P0.z+.75);g2.add(gl);}
  function vertexMark(){const t=TS[st.sh];let P0=null;if(st.sh==='hex'){const r=.33;P0=V(0,0,cz-r);}else if(st.sh==='sq')P0=V(.25,0,cz-.25);else if(st.sh==='tri'){const r=.3;P0=V(r*Math.sqrt(3)/2,0,cz-r/2);}else if(st.sh==='oct'){const R=.34,w=2*R*Math.cos(Math.PI/8);const s=2*R*Math.sin(Math.PI/8);P0=V(w/2-s/Math.SQRT2,0,cz-w/2);}
    if(!P0)return;const ring=mk(new THREE.TorusGeometry(.12,.025,8,24),lam('#ef4444'),0);ring.rotation.x=Math.PI/2;ring.position.set(P0.x,.14,P0.z);g2.add(ring);const l=label(st.sh==='oct'?'135° + 135° + 90°':t.k+' × '+t.a+'° = 360°',{size:.2,bg:'#ffffff',border:'#ef4444'});l.position.set(P0.x,.6,P0.z);g2.add(l);}
  function tess(anim){clearGroup(g2);if(st.sh==='pent'){pentagons();A.redraw();return;}const L=layout();L.forEach((d,i)=>{const m=tile(...d.slice(0,5));m.material=lam(d[5]);g2.add(m);if(anim){m.scale.set(.01,.01,.01);A.later(()=>tween(.25,k=>{const q=Math.max(.01,k);m.scale.set(q,q,q);}),i*25);}});if(st.vx)vertexMark();A.redraw();}
  function choose(k){st.sh=k;st.vx=false;A.pop();tess(true);A.say(TS[k].n+': '+TS[k].a+'°');if(mode==='play'&&!st.setup&&st.want){if(st.want(k))game.solved(st.wantOk);}}
  tess(false);
  return {info:()=>st.sh,
    controls:()=>{const c=TK.map(k=>({t:{tri:'Triangle',sq:'Square',hex:'Hexagon',pent:'Pentagon',oct:'Octagon + square'}[k],on:st.sh===k,fn:()=>choose(k)})).concat([{t:'Vertex',go:true,fn:()=>{st.vx=!st.vx;tess(false);}}]);if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);return c;},
    demo(n){st.ask=null;st.want=null;if(n==='hex'){st.sh='hex';st.vx=false;tess(true);A.seq([[1500,()=>{st.vx=true;tess(false);}]]);}if(n==='pent'){st.sh='pent';tess(false);}},
    task(r){st.setup=true;st.ask=null;st.want=null;st.vx=false;st.sh='sq';let txt;
      if(r===0){st.want=k=>k==='tri';st.wantOk='Yes! 6 × 60° = 360°.';txt='Tessellate the shape where *6 tiles* meet at each vertex.';}
      else if(r===1){st.ask={ans:'Regular pentagon',o:shuffle(['Regular pentagon','Regular hexagon','Square']),ok:'Yes! 108° does not divide 360° evenly.'};txt='Which regular polygon does *not* tessellate by itself? Try them!';}
      else if(r===2){st.sh='hex';st.ask={ans:'3',o:shuffle(['3','4','6']),ok:'Yes! 3 × 120° = 360°.'};txt='How many regular hexagons meet at each vertex?';}
      else if(r===3){st.sh='tri';st.ask={ans:'Rotations and translations',o:shuffle(['Rotations and translations','Only reflections','Only dilations']),ok:'Yes! Each triangle is a half-turn of its neighbour.'};txt='Which transformations make this *triangle* tessellation?';}
      else{st.sh='oct';st.ask={ans:'90°',o:shuffle(['90°','45°','135°']),ok:'Yes! 360° − 135° − 135° = 90°: a square fits.'};txt='Two regular octagons (135° each) meet at a vertex. What angle fills the gap?';}
      tess(false);st.setup=false;return txt;}};}
});

/* =========================================================
   26. Building models from views
   ========================================================= */
P.lesson({id:'models8',title:'Building models from views',strand:'Spatial Sense',codes:['E1.2'],
 guide:{goal:'Make objects and models using appropriate scales, given their top, front and side views or their perspective views.',words:'top view, front view, side view, perspective view, model, scale, build',
  ask:['How does a top view with numbers tell you how to build?','Can two different buildings have the same front and side views?','If 1 cube = 2.5 m, how tall is a 3-cube tower?'],home:'Draw the top, front and side views of a stack of books or blocks. Ask someone to build it from your drawings.'},
 learn:[{say:'Read the plan, build the model.',speech:'Rohan’s top view has numbers. Each number tells how many cubes tall the tower is. Watch the model build from the plan: two, one, three, and so on.',view:'model',demo:'build'},
        {say:'Read about views and scale.',speech:'A front view shows the tallest tower in each column. A side view shows the tallest in each row. A scale, like one cube equals two point five metres, turns the model into real sizes.',view:'read'},
        {say:'Watch: check the views.',speech:'Compare the model with the front and side view cards. The green check means each view matches.',view:'model',demo:'check'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: build from views.',speech:'Your turn. Tap the pads to stack cubes until your model matches the views.',view:'model'}],
 fig:'Stacks of cubes built on a 3 by 3 pad from views.',rz:.35,
 explore:['*Tap a pad* to add a cube (after 3, it clears).','The cards show the *target views*.','Green checks show matching views.'],
 howTo:'Build the model to match the views.',
 init:k=>({h:[[0,0,0],[0,0,0],[0,0,0]],tgt:{top:[[2,1,3],[1,0,2],[1,1,1]]},mode2:'top',ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'Builders and designers make *models* from *plans*: top, front and side views.')+14;
  const s=40,H=[[2,1,3],[1,0,2],[1,1,1]];for(let r=0;r<3;r++)for(let c=0;c<3;c++){g.fillStyle=H[r][c]?'#bfdbfe':'#f1f5f9';g.fillRect(X0+20+c*s,y+r*s,s-3,s-3);T(g,String(H[r][c]),X0+20+c*s+18,y+r*s+27,FT.bodyB,INK,'center');}T(g,'top view with heights',X0+20,y+148,FT.smallB,GREY);
  const fv=[0,1,2].map(c=>Math.max(H[0][c],H[1][c],H[2][c])),sv=[2,1,0].map(r=>Math.max(...H[r]));const col=(ox,v,c,t)=>{v.forEach((n,i)=>{for(let k=0;k<n;k++){g.fillStyle=c;g.fillRect(ox+i*s,y+120-(k+1)*s,s-3,s-3);}});T(g,t,ox,y+148,FT.smallB,GREY);};col(X0+230,fv,'#2f7de1','front view');col(X0+420,sv,'#e4572e','side view');y+=180;
  y=para(p,y,'*Front view:* the tallest tower in each column. *Side view:* the tallest tower in each row, seen from the right.')+10;
  y=para(p,y,'*Scale:* if 1 cube = 2.5 m, a tower 3 cubes tall stands for *7.5 m*.')+10;
  y=keyWords(p,y,[['model','a 3D copy of an object, often at a smaller scale'],['plan','a top view used for building']]);
  predict(p,y,S,'p26','A real tower is 30 m tall. At 1 cube = 10 m, how many cubes tall is the model?','*3 cubes.*');},
 readout(p,S,y){const g=p.g,st=S.st;const n=st.h.flat().reduce((a,b)=>a+b,0);const m=matches(st);T(g,n+' cubes',X0,y+44,ZS(40),acc());T(g,(st.tgt.top?'plan: '+(m.top?'✓':'✗')+'  ':'')+'front: '+(m.f?'✓':'✗')+'   side: '+(m.s?'✓':'✗'),X0,y+88,FT.bodyB,m.ok?'#16a36f':INK);return y+98;},
 build(S,grp,mode,game){const st=S.st,c=.42,ox=-1.25,oz=-1.85;const g2=new THREE.Group(),cards=new THREE.Group();grp.add(g2,cards);
  for(let r=0;r<3;r++)for(let q=0;q<3;q++){const pad=mk(new THREE.BoxGeometry(c*.96,.04,c*.96),lam('#e2e8f0'),20);pad.position.set(ox+(q-1)*c,.02,oz+(r-1)*c);grp.add(pad);A.drag(pad,{tap:()=>tap(r,q)});}
  const fr=label('FRONT',{size:.14,color:RED});fr.position.set(ox,.1,oz+.9);grp.add(fr);
  function cardTex(kind,data){const cv=document.createElement('canvas');cv.width=cv.height=192;const g=cv.getContext('2d');g.fillStyle='#fff';g.fillRect(0,0,192,192);g.strokeStyle='#1b2236';g.lineWidth=6;g.strokeRect(3,3,186,186);const s=46,o=27;
    if(kind==='top'){for(let r=0;r<3;r++)for(let q=0;q<3;q++){g.fillStyle=data[r][q]?'#bfdbfe':'#f1f5f9';g.fillRect(o+q*s,o+r*s,s-4,s-4);g.fillStyle=INK;g.font='700 30px sans-serif';g.textAlign='center';g.fillText(String(data[r][q]),o+q*s+21,o+r*s+33);}}
    else data.forEach((n,i)=>{for(let k=0;k<n;k++){g.fillStyle=kind==='front'?'#2f7de1':'#e4572e';g.fillRect(o+i*s,165-(k+1)*s,s-4,s-4);}});return new THREE.MeshLambertMaterial({map:new THREE.CanvasTexture(cv)});}
  function draw(){clearGroup(g2);clearGroup(cards);for(let r=0;r<3;r++)for(let q=0;q<3;q++)for(let k=0;k<st.h[r][q];k++){const m=unitBox(1,1,1,'#60a5fa',c*.94);m.position.set(ox+(q-1)*c,.04+c*.47+k*c*.94,oz+(r-1)*c);g2.add(m);A.drag(m,{tap:()=>tap(r,q)});}
    const T0=targetViews(st),mt=matches(st);const list=(st.tgt.top?[['top',st.tgt.top,mt.top]]:[]).concat([['front',T0.f,mt.f],['side',T0.s,mt.s]]);
    list.forEach(([k,d,ok],i)=>{const side=lam('#ffffff');const m=mk(new THREE.BoxGeometry(.7,.04,.7),[side,side,cardTex(k,d),side,side,side],20);m.position.set(1.55,.05,-2.75+i*.85);cards.add(m);const l=label(k+(ok?' ✓':''),{size:.15,color:ok?'#16a36f':GREY});l.position.set(.95,.1,-2.75+i*.85);cards.add(l);});A.redraw();}
  function tap(r,q){st.h[r][q]=(st.h[r][q]+1)%4;A.pop();draw();if(mode==='play'&&!st.setup&&st.need&&matches(st).ok)game.solved('Your model matches every view!');}
  draw();
  return {info:()=>st.h.flat().join(''),
    controls:()=>{const c=[{t:'Clear',fn:()=>{st.h=[[0,0,0],[0,0,0],[0,0,0]];draw();}}];if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);return c;},
    demo(n){st.ask=null;st.need=false;st.tgt={top:[[2,1,3],[1,0,2],[1,1,1]]};if(n==='build'){st.h=[[0,0,0],[0,0,0],[0,0,0]];draw();const s=[];for(let r=0;r<3;r++)for(let q=0;q<3;q++)for(let k=0;k<st.tgt.top[r][q];k++)s.push([200,()=>{st.h[r][q]++;draw();}]);A.seq(s);}
      if(n==='check'){st.h=st.tgt.top.map(r=>r.slice());draw();A.say('Every view matches.');}},
    task(r){st.setup=true;st.ask=null;st.need=false;st.h=[[0,0,0],[0,0,0],[0,0,0]];let txt;const rh=()=>[0,1,2].map(()=>[0,1,2].map(()=>rnd(0,3)));
      if(r===0){const t=rh();if(t.flat().filter(v=>v).length<5)t[1]=[2,1,2];st.tgt={top:t};st.need=true;txt='Build the model from the *top view with heights*.';}
      else if(r<3){const t=rh();if(t.flat().filter(v=>v).length<4)t[0]=[1,2,3];const f=[0,1,2].map(q=>Math.max(t[0][q],t[1][q],t[2][q])),s=[2,1,0].map(i=>Math.max(...t[i]));st.tgt={f,s};st.need=true;txt='Build any model that matches the *front* and *side* views.';}
      else if(r===3){st.tgt={top:[[3,1,0],[1,0,0],[0,0,0]]};st.h=st.tgt.top.map(x=>x.slice());st.ask={ans:'7.5 m',o:shuffle(['7.5 m','3 m','5.5 m']),ok:'Yes! 3 × 2.5 = 7.5 m.'};txt='Scale: *1 cube = 2.5 m*. How tall is the *tallest tower* in real life?';}
      else{st.tgt={top:[[2,2,0],[0,0,0],[0,0,0]]};st.h=st.tgt.top.map(x=>x.slice());st.ask={ans:'3 cubes',o:shuffle(['3 cubes','30 cubes','10 cubes']),ok:'Yes! 30 ÷ 10 = 3.'};txt='A real tower is *30 m* tall. At *1 cube = 10 m*, how tall is the model?';}
      draw();st.setup=false;return txt;}};}
});
function targetViews(st){if(st.tgt.top){const t=st.tgt.top;return {f:[0,1,2].map(q=>Math.max(t[0][q],t[1][q],t[2][q])),s:[2,1,0].map(r=>Math.max(...t[r]))};}return {f:st.tgt.f,s:st.tgt.s};}
function matches(st){const h=st.h,tv=targetViews(st);const f=[0,1,2].map(q=>Math.max(h[0][q],h[1][q],h[2][q])),s=[2,1,0].map(r=>Math.max(...h[r]));const mf=f.join()===tv.f.join(),ms=s.join()===tv.s.join();const mt=st.tgt.top?JSON.stringify(h)===JSON.stringify(st.tgt.top):true;return {f:mf,s:ms,top:mt,ok:mf&&ms&&mt};}

/* =========================================================
   27. Scale drawings: lengths and areas
   ========================================================= */
const SCALES=[50,100,200,400];
P.lesson({id:'scale8',title:'Scale drawings: lengths and areas',strand:'Spatial Sense',codes:['E1.3'],
 guide:{goal:'Use scale drawings to calculate actual lengths and areas, and reproduce scale drawings at different ratios.',words:'scale, ratio, scale drawing, actual length, area, scale factor, floor plan',
  ask:['On a 1 : 100 plan, what does 1 cm stand for?','If a drawing is twice as long, how many times bigger is its area?','How do you redraw a plan at 1 : 50 instead of 1 : 100?'],home:'Draw your room at 1 : 50 (2 cm for each metre). Measure the drawing and find the real area.'},
 learn:[{say:'Shrink a room onto paper.',speech:'Elena’s classroom is eight metres by six metres. At a scale of one to one hundred, one centimetre on the plan is one hundred centimetres, or one metre, in real life. Her plan is eight centimetres by six centimetres.',view:'model',demo:'plan'},
        {say:'Read about area and scale.',speech:'To find a real area, first find the real lengths, then multiply. The room is eight metres times six metres: forty-eight square metres. If you double the lengths in a drawing, its area becomes four times as big.',view:'read'},
        {say:'Watch: change the ratio.',speech:'Redraw the plan at one to fifty. Each length doubles: sixteen by twelve centimetres. The area on paper is four times as big, but the real room is the same.',view:'model',demo:'redraw'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: change the scale.',speech:'Your turn. Change the scale ratio and read the plan and real measurements.',view:'model'}],
 fig:'A floor plan drawn on grid paper at different scales.',rz:.35,
 explore:['Change the *scale ratio*.','Read the *plan size* and the *real size*.','Area on paper changes by the *square* of the factor.'],
 howTo:'Use the scale to find real lengths and areas.',
 init:k=>({sc:100,L:8,W:6,need:null,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'A *scale* like *1 : 100* means 1 cm on the drawing is 100 cm (1 m) in real life.')+14;
  rr(g,X0+20,y,240,180,6);g.strokeStyle=INK;g.lineWidth=3;g.stroke();T(g,'8 cm',X0+140,y-6,FT.smallB,INK,'center');T(g,'6 cm',X0+272,y+96,FT.smallB,INK);T(g,'1 : 100',X0+140,y+100,FT.bodyB,acc(),'center');
  [['Plan','8 cm × 6 cm'],['Real','8 m × 6 m'],['Real area','48 m²']].forEach(([a,b],i)=>{T(g,a,X0+340,y+40+i*50,FT.bodyB,acc());T(g,b,X0+500,y+40+i*50,FT.body);});y+=214;
  rr(g,X0,y,TW,120,16);g.fillStyle=tint(acc(),.1);g.fill();T(g,'Change the ratio: 1 : 100 → 1 : 50',X0+20,y+36,FT.bodyB,acc());T(g,'lengths × 2 (16 cm × 12 cm)',X0+20,y+72,FT.body);T(g,'area on paper × 4',X0+20,y+104,FT.body);y+=140;
  y=keyWords(p,y,[['scale','the ratio of drawing length to real length'],['actual length','the real-life measurement']]);
  predict(p,y,S,'p27','A map is 1 : 25 000. Two towns are 8 cm apart. How far is that?','*2 km.* 200 000 cm.');},
 readout(p,S,y){const g=p.g,st=S.st;const pl=st.L*100/st.sc,pw=st.W*100/st.sc;T(g,'1 : '+st.sc+'   plan '+r2(pl)+' cm × '+r2(pw)+' cm',X0,y+44,FT.bodyB,acc());T(g,'real '+st.L+' m × '+st.W+' m = '+st.L*st.W+' m²',X0,y+88,ZS(38),acc());return y+98;},
 build(S,grp,mode,game){const st=S.st;const g2=new THREE.Group();grp.add(g2);const u=.24;
  const paper=mk(new THREE.BoxGeometry(4.5,.02,3.3),[lam('#ffffff'),lam('#ffffff'),cellMat('#ffffff',18,13),lam('#ffffff'),lam('#ffffff'),lam('#ffffff')],20);paper.position.set(0,.01,-1.45);grp.add(paper);
  function draw(){clearGroup(g2);const pl=st.L*100/st.sc,pw=st.W*100/st.sc;const w=pl*u,d=pw*u;const x0=-2.1,z0=-3.0;const room=slab([[x0,z0],[x0+w,z0],[x0+w,z0+d],[x0,z0+d]],'#bfdbfe',.04);g2.add(room);
    [[V(x0,.06,z0),V(x0+w,.06,z0)],[V(x0+w,.06,z0),V(x0+w,.06,z0+d)],[V(x0+w,.06,z0+d),V(x0,.06,z0+d)],[V(x0,.06,z0+d),V(x0,.06,z0)]].forEach(([a,b])=>g2.add(seg(a,b,INK,.02)));
    const desk=mk(new THREE.BoxGeometry(w*.15,.12,d*.12),lam('#f59e0b'),0);desk.position.set(x0+w*.3,.1,z0+d*.3);g2.add(desk);const door=mk(new THREE.BoxGeometry(w*.12,.06,.03),lam('#16a36f'),0);door.position.set(x0+w*.8,.06,z0+d);g2.add(door);
    const l1=label(r2(pl)+' cm',{size:.16,bg:'#ffffff'});l1.position.set(x0+w/2,.25,z0-.12);g2.add(l1);const l2=label(r2(pw)+' cm',{size:.16,bg:'#ffffff'});l2.position.set(x0+w+.35,.25,z0+d/2);g2.add(l2);
    const sl=label('1 : '+st.sc,{size:.26,color:acc()});sl.position.set(1.5,.4,.0);g2.add(sl);check();A.redraw();}
  function check(){if(mode==='play'&&!st.setup&&st.need&&st.sc===st.need)game.solved('Yes! At 1 : '+st.sc+' the plan is '+r2(st.L*100/st.sc)+' cm long.');}
  draw();
  return {info:()=>'1:'+st.sc,
    controls:()=>{const c=SCALES.map(s=>({t:'1 : '+s,on:st.sc===s,fn:()=>{st.sc=s;A.pop();draw();}}));if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);return c;},
    demo(n){st.ask=null;st.need=null;if(n==='plan'){st.sc=200;draw();A.seq([[1000,()=>{st.sc=100;draw();A.say('8 cm × 6 cm')}]]);}if(n==='redraw'){st.sc=100;draw();A.seq([[1000,()=>{st.sc=50;draw();A.say('16 cm × 12 cm')}]]);}},
    task(r){st.setup=true;st.ask=null;st.need=null;st.sc=100;st.L=8;st.W=6;let txt;
      if(r===0){st.sc=200;st.ask={ans:'12 m',o:shuffle(['12 m','6 m','3 m']),ok:'Yes! 6 cm × 200 = 1200 cm = 12 m.'};txt='On a *1 : 200* plan, a wall is *6 cm* long. How long is the real wall?';}
      else if(r===1){st.sc=200;st.ask={ans:'48 m²',o:shuffle(['48 m²','12 m²','4800 m²']),ok:'Yes! 8 m × 6 m = 48 m².'};txt='The plan is *4 cm × 3 cm* at *1 : 200*. What is the *real area*?';}
      else if(r===2){st.sc=200;st.need=100;txt='Redraw the plan so every length is *twice as long*. Choose the new scale.';}
      else if(r===3){st.ask={ans:'4 times as big',o:['2 times as big','4 times as big','8 times as big'],ok:'Yes! 2 × 2 = 4.'};txt='If every length on a drawing doubles, its *area* on paper becomes…';}
      else{st.ask={ans:'2 km',o:shuffle(['2 km','20 km','200 m']),ok:'Yes! 8 × 25 000 = 200 000 cm = 2 km.'};txt='A map is *1 : 25 000*. Two towns are *8 cm* apart on it. How far apart are they?';}
      draw();st.setup=false;return txt;}};}
});

/* =========================================================
   28. Transformations and dilations on the Cartesian plane
   ========================================================= */
P.lesson({id:'transform8',title:'Transformations, including dilations',strand:'Spatial Sense',codes:['E1.4'],
 guide:{goal:'Describe and perform translations, reflections, rotations and dilations on a Cartesian plane, and predict the results of these transformations.',words:'translation, reflection, rotation, dilation, scale factor, image, coordinate rule, sequence',
  ask:['What is the image of (−3, 1) after a dilation by 2 about the origin?','Does the order of two transformations matter?','Which transformations keep a shape the same size?'],home:'Plot a small triangle. Predict its image after a dilation by 2, then a reflection in the y-axis. Check by drawing.'},
 learn:[{say:'Dilate from the origin.',speech:'A dilation about the origin multiplies both coordinates by the scale factor. Jalen uses a factor of two, so the point negative three, one goes to negative six, two. The image is similar to the original, twice as large.',view:'model',demo:'dil'},
        {say:'Read the rules.',speech:'Translations, reflections and rotations keep the size and shape. Dilations change the size but keep the shape and angles. You can predict each image with its coordinate rule.',view:'read'},
        {say:'Watch: two in a row.',speech:'Reflect in the x-axis, then translate three to the right. Each vertex follows both rules in order. Predict where A goes before each step.',view:'model',demo:'seq'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: predict and check.',speech:'Your turn. Apply transformations, and predict where each point will go.',view:'model'}],
 fig:'A shape and its images on a four-quadrant grid.',rz:.4,
 explore:['Translate, reflect, rotate or *dilate*.','The gold point is *A*.','Predict, then press to check.'],
 howTo:'Predict the image, then choose the answer.',
 init:k=>({sh:[[-3,1],[-1,1],[-3,2]],ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'Each transformation has a *coordinate rule*:')+12;
  [['Translate (a, b)','(x + a, y + b)'],['Reflect in x-axis','(x, −y)'],['Reflect in y-axis','(−x, y)'],['Rotate 90° ↺ about O','(−y, x)'],['Rotate 180° about O','(−x, −y)'],['Dilate by k about O','(kx, ky)']].forEach(([a,b],i)=>{rr(g,X0,y+i*54,TW,46,12);g.fillStyle=tint(i===5?'#e4572e':acc(),.06+i%2*.05+(i===5?.08:0));g.fill();T(g,a,X0+20,y+i*54+32,FT.bodyB,i===5?'#c2410c':acc());T(g,b,X0+TW-20,y+i*54+32,FT.bodyB,INK,'right');});y+=340;
  y=para(p,y,'*Same size:* translations, reflections, rotations. *Different size, same shape:* dilations (k > 1 enlarges, 0 < k < 1 reduces).')+10;
  y=keyWords(p,y,[['dilation','an enlargement or reduction from a centre'],['image','the result of a transformation']]);
  predict(p,y,S,'p28','Dilate (4, −2) by ½ about the origin.','*(2, −1).*');},
 readout(p,S,y){const g=p.g,st=S.st;T(g,'A = ('+sgn(st.sh[0][0])+', '+sgn(st.sh[0][1])+')',X0,y+46,ZS(44),acc());T(g,st.sh.map(([x,y2])=>'('+sgn(x)+', '+sgn(y2)+')').join('  '),X0,y+86,FT.body);return y+96;},
 build(S,grp,mode,game){const st=S.st,s=.22,cx=-.2,cz=-1.6;const X=x=>cx+x*s,Z=y=>cz-y*s;
  const base=mk(new THREE.BoxGeometry(14*s+.15,.03,14*s+.15),[lam('#f3f6fb'),lam('#f3f6fb'),cellMat('#ffffff',14,14),lam('#f3f6fb'),lam('#f3f6fb'),lam('#f3f6fb')],20);base.position.set(X(0),.015,Z(0));grp.add(base);
  [[X(-7.2),Z(0),X(7.2),Z(0)],[X(0),Z(-7.2),X(0),Z(7.2)]].forEach(([a,b,c,d])=>{const m=new THREE.Mesh(new THREE.BoxGeometry(c!==a?Math.abs(c-a):.03,.04,d!==b?Math.abs(d-b):.03),lam(INK));m.position.set((a+c)/2,.05,(b+d)/2);grp.add(m);});
  [-6,-3,3,6].forEach(i=>{const lx=label(sgn(i),{size:.13,color:GREY});lx.position.set(X(i),.1,Z(0)+.15);grp.add(lx);const ly=label(sgn(i),{size:.13,color:GREY});ly.position.set(X(0)-.18,.1,Z(i));grp.add(ly);});
  const g2=new THREE.Group(),gh=new THREE.Group();grp.add(g2,gh);let prev=null;
  function draw(){clearGroup(g2);clearGroup(gh);g2.add(slab(st.sh.map(([x,y])=>[X(x),Z(y)]),'#2f7de1',.08,.85));const a=mk(new THREE.SphereGeometry(.08,12,10),lam('#ffd24a'),0);a.position.set(X(st.sh[0][0]),.16,Z(st.sh[0][1]));g2.add(a);
    const l=label('A('+sgn(st.sh[0][0])+', '+sgn(st.sh[0][1])+')',{size:.16,bg:'#ffffff'});l.position.set(X(st.sh[0][0]),.42,Z(st.sh[0][1]));g2.add(l);if(prev)gh.add(slab(prev.map(([x,y])=>[X(x),Z(y)]),'#94a3b8',.02,.3));A.redraw();}
  const TR={r:([x,y])=>[x+1,y],l:([x,y])=>[x-1,y],u:([x,y])=>[x,y+1],d:([x,y])=>[x,y-1],rx:([x,y])=>[x,-y],ry:([x,y])=>[-x,y],r90:([x,y])=>[-y,x],r180:([x,y])=>[-x,-y],d2:([x,y])=>[2*x,2*y],dh:([x,y])=>[x/2,y/2]};
  function apply(k,name){const np=st.sh.map(TR[k]);if(np.some(([x,y])=>Math.abs(x)>7||Math.abs(y)>7)){A.bad('That would leave the grid.');return;}prev=st.sh;st.sh=np;A.pop();if(name)A.say(name+': A → ('+sgn(np[0][0])+', '+sgn(np[0][1])+')');draw();}
  draw();
  return {info:()=>'A('+st.sh[0].join(', ')+')',
    controls:()=>{const c=[{t:'←',fn:()=>apply('l')},{t:'→',fn:()=>apply('r')},{t:'↑',fn:()=>apply('u')},{t:'↓',fn:()=>apply('d')},{t:'Reflect x',fn:()=>apply('rx','reflect in x-axis')},{t:'Reflect y',fn:()=>apply('ry','reflect in y-axis')},{t:'Rotate 90° ↺',fn:()=>apply('r90','rotate 90° counterclockwise')},{t:'Rotate 180°',fn:()=>apply('r180','rotate 180°')},{t:'Dilate × 2',go:true,fn:()=>apply('d2','dilate by 2')},{t:'Dilate × ½',fn:()=>apply('dh','dilate by ½')}];
      if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);return c;},
    demo(n){st.ask=null;prev=null;st.sh=[[-3,1],[-1,1],[-3,2]];draw();if(n==='dil')A.seq([[1000,()=>apply('d2','dilate by 2')]]);if(n==='seq'){st.sh=[[1,2],[3,2],[1,3]];draw();A.seq([[1000,()=>apply('rx','reflect in x-axis')],[1200,()=>apply('r')],[400,()=>apply('r')],[400,()=>apply('r','then 3 right')]]);}},
    task(r){st.setup=true;prev=null;let x=pick([-3,-2,2,3]),y=pick([-2,-1,1,2]);st.sh=[[x,y],[x+1,y],[x,y+1]];const f=([a,b])=>'('+sgn(a)+', '+sgn(b)+')';
      const Q=[['dilate by 2 about the origin',[2*x,2*y],[x+2,y+2]],['rotate 90° counterclockwise about the origin',[-y,x],[y,-x]],['reflect in the y-axis, then translate 2 down',[-x,y-2],[x,-y-2]],['dilate by 2, then reflect in the x-axis',[2*x,-2*y],[-2*x,2*y]],['rotate 180°, then translate 1 right',[-x+1,-y],[x+1,-y]]][r];
      const ans=f(Q[1]);const o=[...new Set([ans,f(Q[2]),f([x,y])])];if(o.length<3)o.push(f([Q[1][1],Q[1][0]]));st.ask={ans,o:shuffle(o.slice(0,3)),ok:'Yes! A → '+ans+'.'};draw();st.setup=false;
      return '*Predict*: where is A('+sgn(x)+', '+sgn(y)+') after you *'+Q[0]+'*? Use the buttons to check.';}};}
});

/* =========================================================
   29. Very large and very small metric units
   ========================================================= */
const PF=[['p','pico',-12,'width of an atom ≈ 100 pm'],['n','nano',-9,'DNA strand ≈ 2 nm wide'],['µ','micro',-6,'bacterium ≈ 2 µm'],['m','milli',-3,'grain of sand ≈ 1 mm'],['','(base unit)',0,'a door ≈ 2 m tall'],['k','kilo',3,'a walk ≈ 1 km'],['M','mega',6,'a big file ≈ 5 MB'],['G','giga',9,'a phone ≈ 128 GB'],['T','tera',12,'a hard drive ≈ 2 TB']];
const SUP={'0':'⁰','1':'¹','2':'²','3':'³','4':'⁴','5':'⁵','6':'⁶','7':'⁷','8':'⁸','9':'⁹','-':'⁻'};const tp=n=>'10'+String(n).split('').map(c=>SUP[c]).join('');
P.lesson({id:'prefix8',title:'Mega to pico: metric prefixes',strand:'Spatial Sense',codes:['E2.1'],
 guide:{goal:'Represent very large (mega, giga, tera) and very small (micro, nano, pico) metric units using models, base ten relationships and exponential notation.',words:'prefix, mega, giga, tera, micro, nano, pico, power of ten, exponential notation',
  ask:['How many megabytes are in a gigabyte?','What does the prefix “micro” mean?','How many nanometres are in a micrometre?'],home:'Check how much storage your phone or computer has. Convert it to megabytes and to terabytes.'},
 learn:[{say:'Each step is × 1000.',speech:'Every metric prefix on Sana’s staircase is one thousand times the one below it. Kilo is ten to the third, mega is ten to the sixth, giga is ten to the ninth, and tera is ten to the twelfth. Watch the staircase light up.',view:'model',demo:'up'},
        {say:'Read about tiny units.',speech:'Going down, milli is ten to the negative three, micro is ten to the negative six, nano is ten to the negative nine, and pico is ten to the negative twelve. A bacterium is about two micrometres long.',view:'read'},
        {say:'Watch: convert.',speech:'Three point five gigabytes. Step down one stair to megabytes: multiply by one thousand. Three point five gigabytes is three thousand five hundred megabytes.',view:'model',demo:'conv'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: climb the stairs.',speech:'Your turn. Tap a stair to see its prefix, its power of ten and an example.',view:'model'}],
 fig:'A staircase of metric prefixes, each step × 1000.',rz:.35,
 explore:['*Tap a stair* to select a prefix.','Each stair up is *× 1000*.','Read the *power of ten* and an *example*.'],
 howTo:'Tap the right prefix, or convert and choose the answer.',
 init:k=>({sel:6,want:null,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'Metric *prefixes* name powers of ten. Each prefix below is *1000 times* the next smaller one.')+12;
  PF.slice().reverse().forEach(([s,n,e,ex],i)=>{rr(g,X0,y+i*46,TW,40,10);g.fillStyle=tint(e>0?'#2f7de1':e<0?'#e4572e':'#94a3b8',.08+Math.abs(e)/12*.14);g.fill();T(g,n,X0+16,y+i*46+28,FT.bodyB,INK);T(g,s||'—',X0+190,y+i*46+28,FT.bodyB,acc());T(g,tp(e),X0+260,y+i*46+28,FT.bodyB);T(g,ex,X0+TW-14,y+i*46+28,FT.small,GREY,'right');});y+=440;
  y=para(p,y,'*Convert:* 3.5 GB = 3.5 × 1000 MB = *3500 MB*.  250 nm = 250 ÷ 1000 µm = *0.25 µm*.')+10;
  y=keyWords(p,y,[['prefix','a word part that multiplies a unit, like kilo- (× 1000)'],['exponential notation','writing a power with an exponent, like 10⁹']]);
  predict(p,y,S,'p29','How many gigabytes are in 2 TB?','*2000 GB.*');},
 readout(p,S,y){const g=p.g,st=S.st,f=PF[st.sel];T(g,(f[1]==='(base unit)'?'base unit':f[1]+' ('+f[0]+')')+'  =  '+tp(f[2]),X0,y+50,ZS(44),acc());T(g,'example: '+f[3],X0,y+92,FT.bodyB);return y+100;},
 build(S,grp,mode,game){const st=S.st;const g2=new THREE.Group();grp.add(g2);
  function draw(){clearGroup(g2);PF.forEach((f,i)=>{const x=-2.0+i*.5,h=.12+i*.22;const on=i===st.sel;const m=mk(new THREE.BoxGeometry(.46,h,.7),lam(on?'#f5b301':tint(f[2]>0?'#2f7de1':f[2]<0?'#e4572e':'#94a3b8',.55)),20);m.position.set(x,h/2,-1.9);g2.add(m);A.drag(m,{tap:()=>sel(i)});
      const l=label(f[1]==='(base unit)'?'base':f[1],{size:.13,color:on?'#b45309':INK});l.position.set(x,h+.16,-1.9);g2.add(l);const e=label(tp(f[2]),{size:.12,color:GREY});e.position.set(x,.1,-1.45);g2.add(e);});
    const s=PF[st.sel];const big=label((s[0]||'base')+'  =  '+tp(s[2]),{size:.28,bg:'#ffffff',border:'#f5b301'});big.position.set(-.8,2.5,-2.6);g2.add(big);A.redraw();}
  function sel(i){st.sel=i;A.pop();draw();A.say(PF[i][1]+': '+tp(PF[i][2]));if(mode==='play'&&!st.setup&&st.want!=null){if(i===st.want)game.solved('Yes! '+PF[i][1]+' = '+tp(PF[i][2])+'.');else A.bad('Look at the power of ten.');}}
  draw();
  return {info:()=>PF[st.sel][1],
    controls:()=>{const c=[{t:'Down × ÷1000',fn:()=>sel(Math.max(0,st.sel-1))},{t:'Up × 1000',go:true,fn:()=>sel(Math.min(8,st.sel+1))}];if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);return c;},
    demo(n){st.ask=null;st.want=null;if(n==='up'){st.sel=4;draw();A.seq([5,6,7,8].map(i=>[650,()=>sel(i)]));}if(n==='conv'){st.sel=7;draw();A.seq([[900,()=>{sel(6);A.say('3.5 GB = 3500 MB');}]]);}},
    task(r){st.setup=true;st.ask=null;st.want=null;st.sel=4;let txt;
      if(r===0){st.want=7;txt='Tap the prefix that means *10⁹*.';}
      else if(r===1){st.want=2;txt='Tap the prefix that means *one millionth* (10⁻⁶).';}
      else if(r===2){st.ask={ans:'3500 MB',o:shuffle(['3500 MB','350 MB','0.0035 MB']),ok:'Yes! × 1000.'};txt='Convert *3.5 GB* to megabytes.';}
      else if(r===3){st.ask={ans:'0.25 µm',o:shuffle(['0.25 µm','250 000 µm','2.5 µm']),ok:'Yes! ÷ 1000.'};txt='Convert *250 nm* to micrometres.';}
      else{st.ask={ans:'2000 GB',o:shuffle(['2000 GB','200 GB','2 000 000 GB']),ok:'Yes! 1 TB = 1000 GB.'};txt='How many gigabytes are in *2 TB*?';}
      draw();st.setup=false;return txt;}};}
});

/* =========================================================
   30. Angle properties: lines and polygons
   ========================================================= */
P.lesson({id:'angles8',title:'Angles, parallel lines and polygons',strand:'Spatial Sense',codes:['E2.2'],
 guide:{goal:'Solve problems involving angle properties, including the properties of intersecting and parallel lines and of polygons.',words:'vertically opposite, corresponding, alternate, co-interior, parallel, transversal, interior angle sum',
  ask:['Why are vertically opposite angles equal?','Which angles are equal when a transversal crosses parallel lines?','Why is the angle sum of a hexagon 720°?'],home:'Find parallel lines crossed by another line (a ladder, railway, window frame). Measure the angles. Which are equal?'},
 learn:[{say:'Parallel lines, a crossing line.',speech:'Marcus sees two parallel rails crossed by a transversal. It makes eight angles. Angles with the same colour are equal: corresponding angles, alternate angles and vertically opposite angles. Watch the transversal tilt: the colours stay matched.',view:'model',demo:'tilt'},
        {say:'Read the angle rules.',speech:'Vertically opposite angles are equal. Corresponding and alternate angles are equal. Co-interior angles, on the same side between the rails, add up to one hundred eighty degrees.',view:'read'},
        {say:'Watch: polygon angle sums.',speech:'Split a polygon into triangles from one vertex. A hexagon makes four triangles, so its angles add to four times one hundred eighty: seven hundred twenty degrees. The rule is n minus two, times one hundred eighty.',view:'model',demo:'poly'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: find the angles.',speech:'Your turn. Tilt the transversal, tap angles, or switch to polygons.',view:'model'}],
 fig:'Parallel rails crossed by a transversal, with coloured angles.',rz:.35,
 explore:['*Tilt* the transversal.','*Tap an angle* to read its size.','Switch to *Polygons* and change the number of sides.'],
 howTo:'Use the angle rules, then choose the answer or tap the angle.',
 init:k=>({mode2:'lines',t:65,n:6,sel:null,want:null,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'When a *transversal* crosses two *parallel* lines, it makes pairs of related angles.')+14;
  const ox=X0+40,oy=y+40,w=300,dx=60;g.strokeStyle=INK;g.lineWidth=3;[0,110].forEach(d=>{g.beginPath();g.moveTo(ox,oy+d);g.lineTo(ox+w,oy+d);g.stroke();});g.beginPath();g.moveTo(ox+120-dx,oy+160);g.lineTo(ox+180+dx,oy-50);g.stroke();
  T(g,'a',ox+175,oy-10,FT.bodyB,'#2f7de1');T(g,'b',ox+118,oy+30,FT.bodyB,'#e4572e');T(g,'a',ox+142,oy+100,FT.bodyB,'#2f7de1');T(g,'b',ox+90,oy+140,FT.bodyB,'#e4572e');
  [['Vertically opposite','equal'],['Corresponding','equal'],['Alternate','equal'],['Co-interior','add to 180°']].forEach(([a,b],i)=>{T(g,a,X0+400,y+40+i*40,FT.smallB,acc());T(g,b,X0+TW,y+40+i*40,FT.small,INK,'right');});y+=220;
  rr(g,X0,y,TW,110,16);g.fillStyle=tint(acc(),.1);g.fill();T(g,'Polygon angle sum = (n − 2) × 180°',X0+20,y+40,FT.bodyB,acc());T(g,'hexagon: 4 × 180° = 720°; regular: 720° ÷ 6 = 120° each',X0+20,y+82,FT.small);y+=130;
  y=keyWords(p,y,[['transversal','a line that crosses two or more lines'],['co-interior angles','angles between parallel lines on the same side']]);
  predict(p,y,S,'p30','One angle at a crossing is 65°. What is its co-interior partner?','*115°.* 180 − 65.');},
 readout(p,S,y){const g=p.g,st=S.st;if(st.mode2==='lines'){T(g,'a = '+st.t+'°   b = '+(180-st.t)+'°',X0,y+48,ZS(44),acc());T(g,st.sel!=null?'selected: '+(st.sel%2?180-st.t:st.t)+'°':'Tap an angle.',X0,y+90,FT.bodyB);}else{T(g,st.n+' sides: ('+st.n+' − 2) × 180° = '+(st.n-2)*180+'°',X0,y+48,ZS(38),acc());T(g,'each angle if regular: '+r2((st.n-2)*180/st.n)+'°',X0,y+90,FT.bodyB);}return y+100;},
 build(S,grp,mode,game){const st=S.st;const g2=new THREE.Group();grp.add(g2);const cz=-1.6;
  function lines(){const tr=st.t*Math.PI/180;const ys=[-.6,.6];ys.forEach(dz=>{const r=mk(new THREE.BoxGeometry(4.2,.06,.06),lam(INK),0);r.position.set(0,.05,cz+dz);g2.add(r);const ar=mk(new THREE.ConeGeometry(.06,.14,10),lam(INK),0);ar.rotation.z=-Math.PI/2;ar.position.set(2.1,.05,cz+dz);g2.add(ar);});
    const L=1.5/Math.sin(tr);const dir=V(Math.cos(tr),0,-Math.sin(tr));g2.add(seg(V(0,.05,cz).addScaledVector(dir,-L),V(0,.05,cz).addScaledVector(dir,L),'#475569',.03));
    ys.forEach((dz,j)=>{const cx=(-dz)/Math.tan(tr)*1,P0=V(cx,.06,cz+dz);/* intersection: z-offset dz means up = -dz */const pts=[[0,tr],[tr,Math.PI],[Math.PI,Math.PI+tr],[Math.PI+tr,2*Math.PI]];
      pts.forEach(([a0,a1],k)=>{const idx=j*4+k;const isA=k%2===0;const col=isA?'#2f7de1':'#e4572e';const w=mk(wedgeGeo(.32,.04,a0,a1),new THREE.MeshLambertMaterial({color:col,transparent:true,opacity:st.sel===idx?1:.6}),0);w.position.copy(P0);g2.add(w);A.drag(w,{tap:()=>tapA(idx)});
        const mid=(a0+a1)/2;const l=label((isA?st.t:180-st.t)+'°',{size:.13,color:INK});l.position.set(P0.x+Math.cos(mid)*.48,.15,P0.z-Math.sin(mid)*.48);g2.add(l);});});}
  function poly(){const n=st.n,R=1.25;const c=V(0,.05,cz);const pts=[];for(let i=0;i<n;i++){const a=Math.PI/2+i*2*Math.PI/n;pts.push([c.x+Math.cos(a)*R,c.z-Math.sin(a)*R]);}g2.add(slab(pts,'#c7d2fe',.05));
    for(let i=0;i<n;i++){const a=V(pts[i][0],.1,pts[i][1]),b=V(pts[(i+1)%n][0],.1,pts[(i+1)%n][1]);g2.add(seg(a,b,INK,.02));}for(let i=2;i<n-1;i++)g2.add(seg(V(pts[0][0],.11,pts[0][1]),V(pts[i][0],.11,pts[i][1]),'#e4572e',.015));
    for(let i=1;i<n-1;i++){const cxp=(pts[0][0]+pts[i][0]+pts[i+1][0])/3,czp=(pts[0][1]+pts[i][1]+pts[i+1][1])/3;const l=label('180°',{size:.12,color:'#c2410c'});l.position.set(cxp,.2,czp);g2.add(l);}
    const tot=label((n-2)+' triangles: '+(n-2)*180+'°',{size:.22,bg:'#ffffff',border:acc()});tot.position.set(0,1.0,-3.0);g2.add(tot);}
  function draw(){clearGroup(g2);if(st.mode2==='lines')lines();else poly();A.redraw();}
  function tapA(i){st.sel=i;A.pop();draw();const v=i%2?180-st.t:st.t;A.say(v+'°');if(mode==='play'&&!st.setup&&st.want){if(st.want(i))game.solved(st.wantOk);else A.bad('Not that one. Look at the colours and positions.');}}
  draw();
  return {info:()=>st.mode2+' '+st.t,
    controls:()=>{const c=st.mode2==='lines'?[{t:'tilt −10°',fn:()=>{st.t=Math.max(35,st.t-10);draw();}},{t:'tilt +10°',fn:()=>{st.t=Math.min(85,st.t+10);draw();}},{t:'Polygons',go:true,fn:()=>{st.mode2='poly';draw();}}]:[{t:'sides −',fn:()=>{st.n=Math.max(3,st.n-1);draw();}},{t:'sides +',go:true,fn:()=>{st.n=Math.min(10,st.n+1);draw();}},{t:'Parallel lines',fn:()=>{st.mode2='lines';draw();}}];
      if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);return c;},
    demo(n){st.ask=null;st.want=null;st.sel=null;if(n==='tilt'){st.mode2='lines';st.t=45;draw();A.seq([55,65,75,65].map(t=>[600,()=>{st.t=t;draw();}]));}if(n==='poly'){st.mode2='poly';st.n=3;draw();A.seq([4,5,6].map(k=>[800,()=>{st.n=k;draw();}]));}},
    task(r){st.setup=true;st.ask=null;st.want=null;st.sel=null;st.mode2='lines';st.t=65;let txt;
      if(r===0){st.t=pick([55,65,75]);st.want=i=>i===4;st.wantOk='Yes! Corresponding angles are equal.';txt='The top-right angle at the *upper* crossing is '+st.t+'°. Tap its *corresponding* angle at the lower crossing.';}
      else if(r===1){st.t=pick([55,65,75]);st.ask={ans:(180-st.t)+'°',o:shuffle([(180-st.t)+'°',st.t+'°',(90-st.t+90)+'°'].filter((v,i,a)=>a.indexOf(v)===i).concat([(360-st.t)+'°']).slice(0,3)),ok:'Yes! Co-interior angles add to 180°.'};txt='One angle is *'+st.t+'°*. What is its *co-interior* angle?';}
      else if(r===2){st.t=70;st.ask={ans:'70°',o:shuffle(['70°','110°','20°']),ok:'Yes! Vertically opposite angles are equal.'};txt='An angle is *70°*. What is the angle *vertically opposite* it?';}
      else if(r===3){st.mode2='poly';st.n=6;st.ask={ans:'720°',o:shuffle(['720°','1080°','360°']),ok:'Yes! (6 − 2) × 180° = 720°.'};txt='What is the *sum* of the interior angles of a hexagon?';}
      else{st.mode2='poly';st.n=8;st.ask={ans:'135°',o:shuffle(['135°','120°','150°']),ok:'Yes! 1080° ÷ 8 = 135°.'};txt='What is *each* interior angle of a *regular octagon*?';}
      draw();st.setup=false;return txt;}};}
});

/* =========================================================
   31. Composite shapes and objects
   ========================================================= */
P.lesson({id:'composite8',title:'Composite shapes and objects',strand:'Spatial Sense',codes:['E2.3'],
 guide:{goal:'Solve problems involving the perimeter, circumference, area, volume and surface area of composite two-dimensional shapes and three-dimensional objects, using appropriate formulas.',words:'composite, perimeter, area, volume, surface area, hidden face, half cylinder, triangular prism',
  ask:['How do you find the volume of a house shape?','Why do you leave out hidden faces when finding surface area?','How do you find the perimeter of a rectangle with a semicircle on top?'],home:'Find an object made of simple shapes (a mailbox, a tent, a barn). Measure it and find its volume.'},
 learn:[{say:'Split it into simple parts.',speech:'Ana’s house is a rectangular prism with a triangular prism roof. Pull them apart. The box is six by four by three: seventy-two cubic metres. The roof is a triangle of area four, times a length of six: twenty-four. Together: ninety-six cubic metres.',view:'model',demo:'house'},
        {say:'Read about surface area.',speech:'For surface area, add the areas of the faces you can see. Where two parts touch, those faces are hidden, so you leave them out.',view:'read'},
        {say:'Watch: a mailbox.',speech:'A mailbox is a box with half a cylinder on top. The front face is a rectangle and a semicircle. Its perimeter uses half the circumference: pi times the radius.',view:'model',demo:'mail'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: take it apart.',speech:'Your turn. Separate the parts, change the length, and find the measurements.',view:'model'}],
 fig:'A house and a mailbox made of simple solids.',rz:.35,
 explore:['Switch *House* or *Mailbox*.','Press *Separate* to pull the parts apart.','Change the *length*.'],
 howTo:'Split the object into parts, then choose the answer.',
 init:k=>({obj:'house',sep:0,L:6,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'A *composite* shape or object is made of simpler ones. Find each part, then *add* (or subtract).')+14;
  [['House volume','6 × 4 × 3 + (½ × 4 × 2) × 6','= 72 + 24 = 96 m³'],['Mailbox front area','4 × 3 + ½ × 3.14 × 2²','= 12 + 6.28 = 18.28 m²'],['Mailbox front perimeter','3 + 4 + 3 + 3.14 × 2','= 16.28 m'],['Two cubes stacked (2 cm)','12 faces − 2 hidden = 10','10 × 4 = 40 cm²']].forEach(([a,b,c],i)=>{rr(g,X0,y+i*98,TW,90,14);g.fillStyle=tint(acc(),.06+i%2*.05);g.fill();T(g,a,X0+18,y+i*98+30,FT.bodyB,acc());T(g,b,X0+18,y+i*98+62,FT.small);T(g,c,X0+TW-18,y+i*98+62,FT.bodyB,INK,'right');});y+=406;
  y=keyWords(p,y,[['composite','made of two or more simple shapes'],['hidden face','a face covered where two parts join']]);
  predict(p,y,S,'p31','A box 5 × 4 × 2 has a cube of side 2 on top. What is the total volume?','*48.* 40 + 8.');},
 readout(p,S,y){const g=p.g,st=S.st,L=st.L;if(st.obj==='house'){const v=4*3*L+4*L;T(g,'box 4 × 3 × '+L+' = '+12*L+'  +  roof 4 × '+L+' = '+4*L,X0,y+44,FT.bodyB);T(g,'V = '+v+' m³',X0,y+90,ZS(44),acc());}else{const v=r2(12*L+.5*PI*4*L);T(g,'box 4 × 3 × '+L+' = '+12*L+'  +  half cylinder '+r2(.5*PI*4*L),X0,y+44,FT.bodyB);T(g,'V = '+v+' m³',X0,y+90,ZS(44),acc());}return y+100;},
 build(S,grp,mode,game){const st=S.st;const g2=new THREE.Group();grp.add(g2);const u=.24;
  function draw(){clearGroup(g2);const W2=4*u,H=3*u,L=st.L*u,dy=st.sep*.5;const bx=mk(new THREE.BoxGeometry(W2,H,L),lam(st.obj==='house'?'#fca5a5':'#93c5fd'),20);bx.position.set(-.5,H/2,-1.9);g2.add(bx);
    if(st.obj==='house'){const s=new THREE.Shape();s.moveTo(-W2/2,0);s.lineTo(W2/2,0);s.lineTo(0,2*u);s.closePath();const geo=new THREE.ExtrudeGeometry(s,{depth:L,bevelEnabled:false});geo.translate(0,0,-L/2);const roof=mk(geo,lam('#b45309'),20);roof.position.set(-.5,H+dy,-1.9);g2.add(roof);}
    else{const cyl=mk(new THREE.CylinderGeometry(2*u,2*u,L,32,1,false,0,Math.PI),lam('#2563eb'),20);cyl.rotation.x=Math.PI/2;cyl.rotation.y=Math.PI/2;cyl.position.set(-.5,H+dy,-1.9);g2.add(cyl);}
    [['4 m',-.5,.15,-1.9+L/2+.2],['3 m',-.5-W2/2-.3,H/2,-1.9+L/2],[st.L+' m',-.5+W2/2+.4,.15,-1.9]].forEach(([t,x,y,z])=>{const l=label(t,{size:.16,bg:'#ffffff'});l.position.set(x,y,z);g2.add(l);});
    const vl=label('V = '+(st.obj==='house'?16*st.L:r2(12*st.L+.5*PI*4*st.L))+' m³',{size:.24,bg:'#ffffff',border:acc()});vl.position.set(1.5,1.7,-2.4);g2.add(vl);A.redraw();}
  function sep(){const to=st.sep?0:1,f=st.sep;tween(.6,k=>{st.sep=f+(to-f)*k;draw();});}
  draw();
  return {info:()=>st.obj+' L'+st.L,
    controls:()=>{const c=[{t:'House',on:st.obj==='house',fn:()=>{st.obj='house';draw();}},{t:'Mailbox',on:st.obj==='mail',fn:()=>{st.obj='mail';draw();}},{t:'Separate',go:true,fn:sep},{t:'length −',fn:()=>{st.L=Math.max(2,st.L-1);draw();}},{t:'length +',fn:()=>{st.L=Math.min(8,st.L+1);draw();}}];if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);return c;},
    demo(n){st.ask=null;st.sep=0;st.L=6;if(n==='house'){st.obj='house';draw();A.seq([[800,sep],[1600,sep]]);}if(n==='mail'){st.obj='mail';draw();A.seq([[800,sep],[1600,sep]]);}},
    task(r){st.setup=true;st.sep=0;st.L=6;let txt;
      if(r===0){st.obj='house';st.L=pick([5,6,7]);const v=16*st.L;st.ask={ans:v+' m³',o:shuffle([v+' m³',12*st.L+' m³',20*st.L+' m³']),ok:'Yes! '+12*st.L+' + '+4*st.L+' = '+v+'.'};txt='Find the *volume* of the house (4 m wide, 3 m tall walls, 2 m roof).';}
      else if(r===1){st.obj='mail';st.ask={ans:'18.28 m²',o:shuffle(['18.28 m²','24.56 m²','12 m²']),ok:'Yes! 12 + 6.28 = 18.28.'};txt='Find the *area of the front face* of the mailbox: a 4 × 3 rectangle and a semicircle with r = 2.';}
      else if(r===2){st.obj='mail';st.ask={ans:'16.28 m',o:shuffle(['16.28 m','22.28 m','14 m']),ok:'Yes! 3 + 4 + 3 + 6.28 = 16.28 m.'};txt='Find the *perimeter* of the mailbox front face (the bottom is 4 m).';}
      else if(r===3){st.obj='mail';st.L=5;st.ask={ans:'91.4 m³',o:shuffle(['91.4 m³','60 m³','122.8 m³']),ok:'Yes! 60 + 31.4 = 91.4.'};txt='Find the *volume* of the mailbox with a length of *5 m*.';}
      else{st.obj='house';st.ask={ans:'40 cm²',o:shuffle(['40 cm²','48 cm²','32 cm²']),ok:'Yes! 10 visible faces × 4 cm².'};txt='Two cubes with *2 cm* edges are stacked. Find the *surface area* (leave out hidden faces).';}
      draw();st.setup=false;return txt;}};}
});

/* =========================================================
   32. The Pythagorean theorem
   ========================================================= */
P.lesson({id:'pythag8',title:'The Pythagorean theorem',strand:'Spatial Sense',codes:['E2.4'],
 guide:{goal:'Describe the Pythagorean relationship using various geometric models, and apply the theorem to solve problems involving an unknown side length of a right triangle.',words:'right triangle, leg, hypotenuse, Pythagorean theorem, square, square root',
  ask:['Which side of a right triangle is the hypotenuse?','How do the tiles show that a² + b² = c²?','How long is the hypotenuse of a 6–8 right triangle?'],home:'Use a measuring tape to make a 3–4–5 triangle on the floor with string. Check that the corner is a right angle.'},
 learn:[{say:'Squares on every side.',speech:'Rohan builds a square on each side of a right triangle with legs three and four. The squares have nine and sixteen tiles. Watch every tile move into the big square on the hypotenuse: twenty-five tiles exactly fill it. So the hypotenuse is five.',view:'model',demo:'pour'},
        {say:'Read the theorem.',speech:'In a right triangle, the square of the hypotenuse equals the sum of the squares of the legs: a squared plus b squared equals c squared. To find a leg, subtract: a squared equals c squared minus b squared.',view:'read'},
        {say:'Watch: a ladder problem.',speech:'A five metre ladder leans on a wall, with its foot three metres from the wall. How high does it reach? Five squared minus three squared is sixteen. The square root of sixteen is four metres.',view:'model',demo:'ladder'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: change the legs.',speech:'Your turn. Change the legs, pour the tiles, and find the hypotenuse.',view:'model'}],
 fig:'A right triangle with tile squares on each side.',rz:.35,
 explore:['Change legs *a* and *b*.','Press *Pour* to move the tiles into c².','c = √(a² + b²).'],
 howTo:'Use a² + b² = c² to find the side, then choose or set it.',
 init:k=>({a:3,b:4,need:null,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'In a *right triangle*, the side opposite the right angle is the *hypotenuse* c. The other two are the *legs* a and b.')+14;
  rr(g,X0,y,TW,96,16);g.fillStyle=tint(acc(),.12);g.fill();T(g,'a² + b² = c²',X0+TW/2,y+62,ZS(52),acc(),'center');y+=120;
  const s=18,ox=X0+120,oy=y+150;g.fillStyle='#93c5fd';g.fillRect(ox-3*s,oy-4*s,3*s,4*s);g.fillStyle='#fdba74';g.fillRect(ox,oy,4*s,4*s);
  g.beginPath();g.moveTo(ox,oy);g.lineTo(ox+4*s,oy);g.lineTo(ox,oy-3*s);g.closePath();g.fillStyle='#fde68a';g.fill();T(g,'9',ox-1.5*s,oy-1.5*s,FT.bodyB,INK,'center');T(g,'16',ox+2*s,oy+2.4*s,FT.bodyB,INK,'center');T(g,'9 + 16 = 25 = 5²',ox+150,oy-40,FT.bodyB,acc());y+=240;
  y=para(p,y,'*Find a leg:* c = 13, a = 5 → b² = 169 − 25 = 144 → *b = 12*.')+10;
  y=keyWords(p,y,[['hypotenuse','the longest side, opposite the right angle'],['leg','one of the two sides that form the right angle']]);
  predict(p,y,S,'p32','Is a triangle with sides 7, 24 and 25 a right triangle?','*Yes.* 49 + 576 = 625 = 25².');},
 readout(p,S,y){const g=p.g,st=S.st,c=Math.sqrt(st.a*st.a+st.b*st.b);T(g,st.a+'² + '+st.b+'² = '+(st.a*st.a)+' + '+(st.b*st.b)+' = '+(st.a*st.a+st.b*st.b),X0,y+44,FT.bodyB);T(g,'c = √'+(st.a*st.a+st.b*st.b)+(Number.isInteger(c)?' = '+c:' ≈ '+c.toFixed(2)),X0,y+90,ZS(44),acc());return y+100;},
 build(S,grp,mode,game){const st=S.st;const g2=new THREE.Group();grp.add(g2);let tiles=[];
  function geom(){const a=st.a,b=st.b;const u=Math.min(.32,4.2/(2*a+b),3.3/(2*b+a));const x0=-b/2*u,z0=-1.4+a/2*u;const W2=(px,py,h)=>V(x0+px*u,h||0,z0-py*u);return {u,W2};}
  function draw(){clearGroup(g2);tiles=[];const a=st.a,b=st.b,c=Math.sqrt(a*a+b*b);const {u,W2}=geom();
    g2.add(slab([[W2(0,0).x,W2(0,0).z],[W2(b,0).x,W2(b,0).z],[W2(0,a).x,W2(0,a).z]],'#fde68a',.06));
    const hs=[[b,0],[0,a],[a,a+b],[a+b,b]].map(([x,y])=>{const p=W2(x,y);return [p.x,p.z];});g2.add(slab(hs,'#fdba74',.02,.45));
    for(let i=0;i<a;i++)for(let j=0;j<a;j++){const t=unitBox(1,1,1,'#3b82f6',u*.9);t.scale.y=.4;const p=W2(-i-.5,j+.5,.05);t.position.copy(p);g2.add(t);tiles.push(t);}
    for(let i=0;i<b;i++)for(let j=0;j<b;j++){const t=unitBox(1,1,1,'#e4572e',u*.9);t.scale.y=.4;const p=W2(i+.5,-j-.5,.05);t.position.copy(p);g2.add(t);tiles.push(t);}
    [['a = '+a,W2(-a-.5,a/2,.2)],['b = '+b,W2(b/2,-b-.6,.2)],['c '+(Number.isInteger(c)?'= '+c:'≈ '+c.toFixed(2)),W2(b/2+a/2+.6,a/2+b/2+.6,.3)]].forEach(([t,p])=>{const l=label(t,{size:.2,bg:'#ffffff'});l.position.copy(p);g2.add(l);});check();A.redraw();}
  function pour(){const a=st.a,b=st.b,c=Math.sqrt(a*a+b*b);if(!Number.isInteger(c)){A.bad('c is not a whole number here, but a² + b² still equals c². Try 3–4, 6–8 or 5–12.');return;}const {u,W2}=geom();
    const B=V(b,0,0),Ap=V(0,a,0),e1=Ap.clone().sub(B).divideScalar(c),e2=V(a,b,0).divideScalar(c);const ang=Math.atan2(e1.y,e1.x);
    tiles.forEach((t,k)=>{const i=k%c,j=Math.floor(k/c);const q=B.clone().addScaledVector(e1,i+.5).addScaledVector(e2,j+.5);const to=W2(q.x,q.y,.08);A.later(()=>{hop(t,to,.5,.5);tween(.5,s=>{t.rotation.y=ang*s;});},k*18);});
    A.seq([[600+tiles.length*18,()=>{A.pop();A.say(a*a+' + '+b*b+' = '+c*c+' = '+c+'²');}]]);}
  function check(){if(mode==='play'&&!st.setup&&st.need&&Math.abs(Math.sqrt(st.a*st.a+st.b*st.b)-st.need)<1e-9)game.solved('Yes! '+st.a+'² + '+st.b+'² = '+st.need+'².');}
  const set=(k,d)=>{st[k]=Math.max(1,Math.min(12,st[k]+d));if(st.a+st.b>17){st[k]-=d;A.bad('That triangle will not fit.');return;}A.pop();draw();};
  draw();
  return {info:()=>st.a+','+st.b,
    controls:()=>{const c=[{t:'a −',fn:()=>set('a',-1)},{t:'a +',fn:()=>set('a',1)},{t:'b −',fn:()=>set('b',-1)},{t:'b +',fn:()=>set('b',1)},{t:'Pour',go:true,fn:pour}];if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);return c;},
    demo(n){st.ask=null;st.need=null;if(n==='pour'){st.a=3;st.b=4;draw();A.seq([[900,pour]]);}if(n==='ladder'){st.a=4;st.b=3;draw();A.say('5² − 3² = 16, √16 = 4 m');}},
    task(r){st.setup=true;st.ask=null;st.need=null;st.a=3;st.b=4;let txt;
      if(r===0){st.a=6;st.b=8;st.ask={ans:'10',o:shuffle(['10','14','100']),ok:'Yes! 36 + 64 = 100, √100 = 10.'};txt='The legs are *6* and *8*. How long is the *hypotenuse*?';}
      else if(r===1){st.a=5;st.b=12;st.ask={ans:'12',o:shuffle(['12','8','14']),ok:'Yes! 169 − 25 = 144, √144 = 12.'};txt='The hypotenuse is *13* and one leg is *5*. Find the *other leg*.';}
      else if(r===2){st.a=1;st.b=1;st.need=pick([5,10,13]);txt='Set the legs to make a right triangle with a *hypotenuse of '+st.need+'*.';}
      else if(r===3){st.a=4;st.b=3;st.ask={ans:'4 m',o:shuffle(['4 m','2 m','5.8 m']),ok:'Yes! 25 − 9 = 16, √16 = 4.'};txt='A *5 m* ladder has its foot *3 m* from a wall. How *high* up the wall does it reach?';}
      else{st.a=3;st.b=4;st.ask={ans:'Yes',o:['Yes','No'],ok:'Yes! 7² + 24² = 49 + 576 = 625 = 25².'};txt='Is a triangle with sides *7, 24 and 25* a right triangle?';}
      draw();st.setup=false;return txt;}};}
});

/* =========================================================
   33. Paying in other currencies
   ========================================================= */
const PAY=[{k:'cash',n:'Cash (bought at a kiosk)',rate:1.42,fee:0,pct:0,col:'#16a34a',pro:'accepted almost everywhere',con:'worse rate; can be lost or stolen'},{k:'credit',n:'Credit card',rate:1.37,fee:0,pct:2.5,col:'#2563eb',pro:'safe and easy to track',con:'2.5% foreign transaction fee'},
  {k:'debit',n:'Debit at a foreign ATM',rate:1.37,fee:5,pct:0,col:'#f59e0b',pro:'good rate, cash when you need it',con:'a $5 fee each withdrawal'},{k:'travel',n:'No-fee travel card',rate:1.37,fee:0,pct:0,col:'#8b5cf6',pro:'good rate, no extra fees',con:'must be loaded or applied for before you go'}];
P.lesson({id:'payment8',title:'Paying in other currencies',strand:'Financial Literacy',codes:['F1.1'],
 guide:{goal:'Describe some advantages and disadvantages of various methods of payment that can be used when dealing with multiple currencies and exchange rates.',words:'exchange rate, foreign transaction fee, ATM fee, cash, credit card, debit card, travel card',
  ask:['Why does cash bought at an airport kiosk cost more?','How much is a 2.5% fee on a $137 purchase?','When might cash still be the best choice?'],home:'Ask a family member how they paid on a trip. Compare the fees for cash, credit and debit.'},
 learn:[{say:'Same price, different costs.',speech:'Elena’s souvenir costs one hundred US dollars. How she pays changes the cost in Canadian dollars. Watch the four methods: cash from a kiosk, a credit card with a fee, a debit card at an ATM, and a no-fee travel card.',view:'model',demo:'all'},
        {say:'Read the pros and cons.',speech:'Cash is accepted everywhere but can be lost, and kiosks give worse rates. Credit cards are safe but often charge a foreign transaction fee. ATMs give good rates but charge a fee each time. Rates here are examples.',view:'read'},
        {say:'Watch: the credit card fee.',speech:'At one point three seven Canadian dollars per US dollar, one hundred US dollars is one hundred thirty-seven Canadian dollars. A two point five percent fee adds three dollars and forty-three cents.',view:'model',demo:'credit'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: pick a method.',speech:'Your turn. Change the price and compare the cost of each method.',view:'model'}],
 fig:'Four payment methods, each with a stack showing its cost in CAD.',rz:.35,
 explore:['Change the *price* in US dollars.','*Tap a method* to see its costs.','The shortest stack is the cheapest.'],
 howTo:'Compare the costs, then choose the best method.',
 init:k=>({usd:100,sel:1,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'Example rate: *1 USD = 1.37 CAD*. Each payment method has *advantages* and *disadvantages*.')+12;
  PAY.forEach((m,i)=>{rr(g,X0,y+i*104,TW,96,14);g.fillStyle=tint(m.col,.12);g.fill();T(g,m.n,X0+18,y+i*104+30,FT.bodyB,m.col);T(g,'+ '+m.pro,X0+18,y+i*104+60,FT.small,'#16a36f');T(g,'− '+m.con,X0+18,y+i*104+86,FT.small,RED);});y+=424;
  y=keyWords(p,y,[['foreign transaction fee','a percent added to purchases in another currency'],['exchange rate','the price of one currency in another']]);
  predict(p,y,S,'p33','How much is a 2.5% fee on a $200 CAD purchase?','*$5.00.*');},
 readout(p,S,y){const g=p.g,st=S.st,m=PAY[st.sel];T(g,m.n+': '+money(cost(m,st.usd))+' CAD',X0,y+46,ZS(38),m.col);T(g,st.usd+' × '+m.rate+(m.pct?' + '+m.pct+'%':'')+(m.fee?' + $'+m.fee+' fee':''),X0,y+88,FT.bodyB);return y+98;},
 build(S,grp,mode,game){const st=S.st;const g2=new THREE.Group();grp.add(g2);
  function draw(){clearGroup(g2);const mx=Math.max(...PAY.map(m=>cost(m,st.usd)));PAY.forEach((m,i)=>{const x=-1.65+i*1.1,c=cost(m,st.usd),h=c/mx*1.15;const on=i===st.sel;const pod=mk(new THREE.BoxGeometry(.8,.08,.8),lam(on?'#fde68a':'#e2e8f0'),20);pod.position.set(x,.04,-1.9);g2.add(pod);
      const n=Math.max(3,Math.round(h/.05));for(let k=0;k<n;k++){const coin=mk(G('pay8c',()=>new THREE.CylinderGeometry(.2,.2,.045,22)),lam(m.col),0);coin.position.set(x,.1+k*.05,-1.9);g2.add(coin);A.drag(coin,{tap:()=>sel(i)});}A.drag(pod,{tap:()=>sel(i)});
      const l=label(money(c),{size:.17,bg:'#ffffff',border:m.col});l.position.set(x,.35+n*.05,-1.9);g2.add(l);const t=label(m.k,{size:.15,color:m.col});t.position.set(x,.1,-1.35);g2.add(t);});
    const tag=label('Price: '+st.usd+' USD',{size:.24,bg:'#ffffff'});tag.position.set(0,1.75,-2.6);g2.add(tag);A.redraw();}
  function sel(i){st.sel=i;A.pop();draw();A.say(PAY[i].n+': '+money(cost(PAY[i],st.usd)));}
  draw();
  return {info:()=>st.usd+' USD',
    controls:()=>{const c=[{t:'price −20',fn:()=>{st.usd=Math.max(20,st.usd-20);draw();}},{t:'price +20',go:true,fn:()=>{st.usd=Math.min(400,st.usd+20);draw();}}];if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);return c;},
    demo(n){st.ask=null;st.usd=100;if(n==='all'){draw();A.seq([0,1,2,3].map(i=>[800,()=>sel(i)]));}if(n==='credit'){draw();sel(1);}},
    task(r){st.setup=true;st.usd=100;let txt;
      if(r===0){st.ask={ans:'No-fee travel card',o:shuffle(['No-fee travel card','Cash (bought at a kiosk)','Credit card']),ok:'Yes! $137.00: no fee and a good rate.'};txt='For a *100 USD* purchase, which method costs the *least*?';}
      else if(r===1){st.usd=20;st.ask={ans:'Credit card',o:shuffle(['Credit card','Debit at a foreign ATM']),ok:'Yes! $28.09 vs $32.40: the $5 ATM fee hurts small amounts.'};txt='For a small *20 USD* snack, which costs less: *credit* or *debit at an ATM*?';}
      else if(r===2){st.ask={ans:'$3.43',o:shuffle(['$3.43','$2.50','$34.25']),ok:'Yes! 2.5% of $137 = $3.425 ≈ $3.43.'};txt='100 USD = $137 CAD. What is the *2.5% fee* on it?';}
      else if(r===3){st.ask={ans:'It can be lost or stolen',o:shuffle(['It can be lost or stolen','It is never accepted','It always has a 2.5% fee']),ok:'Yes! That is the main risk of carrying cash.'};txt='What is a *disadvantage* of carrying lots of cash?';}
      else{st.usd=300;st.ask={ans:'Debit at a foreign ATM',o:shuffle(['Debit at a foreign ATM','Cash (bought at a kiosk)']),ok:'Yes! $416 vs $426: one $5 fee matters less on a big amount.'};txt='You need *300 USD* in cash for a market. Which is cheaper: the *ATM* or the *kiosk*?';}
      draw();st.setup=false;return txt;}};}
});
function cost(m,usd){const c=usd*m.rate;return r2(c*(1+m.pct/100)+m.fee);}

/* =========================================================
   34. A financial plan for a long-term goal
   ========================================================= */
P.lesson({id:'plan8',title:'A financial plan with income and tax',strand:'Financial Literacy',codes:['F1.2'],
 guide:{goal:'Create a financial plan to reach a long-term financial goal, accounting for income, expenses and tax implications.',words:'financial plan, gross income, net income, deductions, income tax, expenses, savings, goal',
  ask:['What is the difference between gross pay and net pay?','Why do you plan for taxes and deductions?','How many months will it take to save $2000 at $250 a month?'],home:'Plan for something big you want, like a bike or a trip. List your income, deductions and expenses, and find how long it will take.'},
 learn:[{say:'Money in, money out.',speech:'Jalen works a part-time job: twelve hours a week at sixteen dollars an hour. That is about eight hundred thirty-two dollars a month in gross pay. Deductions such as income tax take about ten percent. Then expenses. What is left goes into the savings jar.',view:'model',demo:'flow'},
        {say:'Read about the plan.',speech:'A financial plan lists the goal, the income, the deductions and taxes, and the expenses. The money left over each month is the savings. Divide the goal by the monthly savings to find how many months it takes.',view:'read'},
        {say:'Watch: adjust the plan.',speech:'Jalen wants two thousand dollars for a trip. Saving about two hundred forty-nine dollars a month takes about nine months. Working two more hours a week gets there sooner.',view:'model',demo:'adjust'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: make the plan.',speech:'Your turn. Change the hours and the expenses, and see how many months the goal takes.',view:'model'}],
 fig:'Income flows through deductions and expenses into a savings jar.',rz:.35,
 explore:['Change *hours per week* and *expenses*.','Watch *gross → net → savings*.','The jar shows months to the *$2000* goal.'],
 howTo:'Adjust the plan to reach the goal, or choose the answer.',
 init:k=>({hrs:12,wage:16,exp:500,goal:2000,need:null,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'A *financial plan* starts with a goal and tracks every dollar each month.')+14;
  [['Gross pay','12 h × $16 × 52 ÷ 12','≈ $832'],['− Deductions (≈ 10%)','income tax, CPP, EI','≈ $83'],['= Net pay','what you take home','≈ $749'],['− Expenses','phone, transit, food','$500'],['= Savings','each month','≈ $249']].forEach(([a,b,c],i)=>{rr(g,X0,y+i*58,TW,50,12);g.fillStyle=tint(i===4?'#16a36f':acc(),.06+i%2*.05);g.fill();T(g,a,X0+18,y+i*58+33,FT.bodyB,i===4?'#16a36f':acc());T(g,b,X0+330,y+i*58+33,FT.small,GREY);T(g,c,X0+TW-18,y+i*58+33,FT.bodyB,INK,'right');});y+=300;
  y=para(p,y,'*Goal:* $2000 ÷ $249 a month ≈ *8.03*, so it takes about *9 months* (8 full months is not quite enough).')+10;
  y=keyWords(p,y,[['gross income','pay before deductions'],['net income','take-home pay after deductions']]);
  predict(p,y,S,'p34','Gross pay is $600 and deductions are 10%. What is net pay?','*$540.*');},
 readout(p,S,y){const g=p.g,st=S.st,f=flow(st);T(g,'gross '+money(f.gross)+' − tax '+money(f.tax)+' − expenses '+money(st.exp)+' = '+money(f.save),X0,y+44,FT.bodyB);T(g,f.save>0?'$'+st.goal+' in '+f.months+' months':'No savings: adjust the plan!',X0,y+90,ZS(40),f.save>0?'#16a36f':RED);return y+100;},
 build(S,grp,mode,game){const st=S.st;const g2=new THREE.Group();grp.add(g2);
  function bar(x,v,col,t,mx){const h=Math.max(.02,v/mx*1.2);const b=mk(new THREE.BoxGeometry(.6,h,.5),lam(col),20);b.position.set(x,h/2,-2.0);g2.add(b);const l=label(money(v),{size:.15,bg:'#ffffff'});l.position.set(x,h+.18,-2.0);g2.add(l);const n=label(t,{size:.14,color:GREY});n.position.set(x,.1,-1.55);g2.add(n);}
  function draw(){clearGroup(g2);const f=flow(st),mx=Math.max(f.gross,1);bar(-2.0,f.gross,'#2f7de1','gross',mx);bar(-1.15,f.tax,'#e4572e','deductions',mx);bar(-.3,st.exp,'#f59e0b','expenses',mx);bar(.55,Math.max(0,f.save),'#16a36f','savings',mx);
    const jar=mk(new THREE.CylinderGeometry(.45,.4,1.15,28,1,true),new THREE.MeshLambertMaterial({color:'#e0f2fe',transparent:true,opacity:.3,side:THREE.DoubleSide,depthWrite:false}),0);jar.position.set(1.7,.6,-1.9);g2.add(jar);
    const fill=Math.max(0,Math.min(1,f.save/st.goal*8));const m=mk(new THREE.CylinderGeometry(.4,.38,Math.max(.01,1.1*fill),28),lam('#16a36f'),0);m.position.set(1.7,.55*fill+.02,-1.9);g2.add(m);
    const jl=label(f.save>0?f.months+' months':'∞',{size:.24,bg:'#ffffff',border:'#16a36f'});jl.position.set(1.7,1.45,-1.9);g2.add(jl);const gl=label('goal $'+st.goal,{size:.14,color:'#16a36f'});gl.position.set(1.7,.1,-1.35);g2.add(gl);check();A.redraw();}
  function check(){if(mode==='play'&&!st.setup&&st.need&&st.need(st))game.solved(st.needOk(st));}
  draw();
  return {info:()=>st.hrs+'h '+st.exp,
    controls:()=>{const c=[{t:'hours −',fn:()=>{st.hrs=Math.max(4,st.hrs-1);draw();}},{t:'hours +',go:true,fn:()=>{st.hrs=Math.min(20,st.hrs+1);draw();}},{t:'expenses −$50',fn:()=>{st.exp=Math.max(100,st.exp-50);draw();}},{t:'expenses +$50',fn:()=>{st.exp=Math.min(900,st.exp+50);draw();}}];if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);return c;},
    demo(n){st.ask=null;st.need=null;st.hrs=12;st.exp=500;if(n==='flow')draw();if(n==='adjust'){draw();A.seq([[900,()=>{st.hrs=14;draw();A.say(flow(st).months+' months');}]]);}},
    task(r){st.setup=true;st.ask=null;st.need=null;st.hrs=12;st.exp=500;let txt;
      if(r===0){st.ask={ans:'$540',o:shuffle(['$540','$590','$60']),ok:'Yes! $600 − $60 = $540.'};txt='Gross pay is *$600* and deductions are *10%*. What is the *net pay*?';}
      else if(r===1){st.ask={ans:'8 months',o:shuffle(['8 months','5 months','12 months']),ok:'Yes! $2000 ÷ $250 = 8.'};txt='Saving *$250 a month*, how long until *$2000*?';}
      else if(r===2){st.hrs=10;st.need=s=>flow(s).save>0&&flow(s).months<=6;st.needOk=s=>'Yes! The goal takes '+flow(s).months+' months.';txt='Adjust the plan so the *$2000* goal takes *6 months or less*.';}
      else if(r===3){st.ask={ans:'Income tax',o:shuffle(['Income tax','A phone bill','A bus pass']),ok:'Yes! Taxes are deducted from gross pay.'};txt='Which is a *deduction* from gross pay, not an expense?';}
      else{st.ask={ans:'$113',o:shuffle(['$113','$100','$130']),ok:'Yes! $100 × 1.13 = $113.'};txt='Your plan includes a *$100* item. With *13% HST*, how much should you budget?';}
      draw();st.setup=false;return txt;}};}
});
function flow(st){const gross=r2(st.hrs*st.wage*52/12),tax=r2(gross*.1),save=r2(gross-tax-st.exp);return {gross,tax,save,months:save>0?Math.ceil(st.goal/save-1e-9):Infinity};}

/* =========================================================
   35. Balancing a budget and tracking spending
   ========================================================= */
const SCN=[{n:'Student',inc:[['allowance',80],['babysitting',120]],exp:[['phone',45],['snacks',60],['games',50],['transit',40],['gifts',30]]},
  {n:'Family',inc:[['pay',4800],['child benefit',600]],exp:[['rent',2200],['food',1100],['car',650],['utilities',400],['fun',700],['savings',500]]},
  {n:'School club',inc:[['bake sale',350],['fees',400]],exp:[['supplies',260],['trip',380],['T-shirts',220]]}];
P.lesson({id:'balance8',title:'Balancing a budget',strand:'Financial Literacy',codes:['F1.3'],
 guide:{goal:'Identify different ways to maintain a balanced budget, and use appropriate tools to track all income and spending, for several different scenarios.',words:'balanced budget, income, expenses, surplus, deficit, track, spreadsheet, needs, wants',
  ask:['What does it mean for a budget to be balanced?','Name two ways to fix a deficit.','Why is a spreadsheet a good tool for tracking spending?'],home:'Track every dollar you spend for two weeks in a spreadsheet or notebook. Is your budget balanced?'},
 learn:[{say:'Income against expenses.',speech:'On the left, the income. On the right, the expenses. Sana earns two hundred dollars a month but spends two hundred twenty-five. The scale tips: that is a deficit of twenty-five dollars.',view:'model',demo:'tip'},
        {say:'Read about balancing.',speech:'A budget is balanced when income is at least as much as expenses. To fix a deficit, cut wants, find cheaper choices, or earn more. A spreadsheet or app helps track every amount.',view:'read'},
        {say:'Watch: cut a want.',speech:'Cut the games budget from fifty dollars to twenty dollars. Now expenses are one hundred ninety-five dollars: a surplus of five dollars. The scale tips the other way.',view:'model',demo:'cut'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: balance it.',speech:'Your turn. Choose a scenario, then tap the expenses to cut them until the budget balances.',view:'model'}],
 fig:'A balance scale of income blocks and expense blocks.',rz:.35,
 explore:['Choose a *scenario*.','*Tap an expense block* to cut it by 10%.','The scale shows a *surplus* or *deficit*.'],
 howTo:'Balance the budget, or choose the answer.',
 init:k=>({sc:0,cut:{},extra:0,need:false,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'A *balanced budget* means income ≥ expenses. Extra money is a *surplus*; a shortfall is a *deficit*.')+14;
  rr(g,X0,y,TW,44,12);g.fillStyle=tint(acc(),.16);g.fill();['Month','Income','Expenses','Balance'].forEach((h,i)=>T(g,h,X0+16+i*TW/4,y+30,FT.smallB,acc()));y+=48;
  [['Jan','$200','$225','−$25'],['Feb','$200','$195','+$5'],['Mar','$230','$200','+$30']].forEach((r,j)=>r.forEach((v,i)=>T(g,v,X0+16+i*TW/4,y+j*40+28,i===3?FT.bodyB:FT.body,i===3?(v[0]==='−'?RED:'#16a36f'):INK)));y+=136;
  [['Cut wants','games, snacks, extras'],['Choose cheaper','a cheaper phone plan, library books'],['Earn more','babysitting, yard work'],['Track it','a spreadsheet or app for every dollar']].forEach(([a,b],i)=>{T(g,a,X0,y+i*44+30,FT.bodyB,acc());T(g,b,X0+220,y+i*44+30,FT.body);});y+=190;
  y=keyWords(p,y,[['deficit','spending more than you earn'],['surplus','money left over after expenses']]);
  predict(p,y,S,'p35','Income is $750 and expenses are $860. What is the deficit?','*$110.*');},
 readout(p,S,y){const g=p.g,st=S.st,b=bud(st);T(g,SCN[st.sc].n+': income '+money(b.inc)+'  ·  expenses '+money(b.exp),X0,y+44,FT.bodyB);T(g,b.bal>=0?'Balanced: surplus '+money(b.bal):'Deficit: '+money(-b.bal),X0,y+90,ZS(40),b.bal>=0?'#16a36f':RED);return y+100;},
 build(S,grp,mode,game){const st=S.st;const g2=new THREE.Group();grp.add(g2);
  const post=mk(new THREE.CylinderGeometry(.05,.07,1.0,12),lam('#64748b'),0);post.position.set(0,.5,-2.3);grp.add(post);
  function draw(){clearGroup(g2);const b=bud(st),sc=SCN[st.sc];const tilt=Math.max(-.25,Math.min(.25,(b.exp-b.inc)/Math.max(b.inc,1)*1.5));const arm=new THREE.Group();arm.position.set(0,1.02,-2.3);arm.rotation.z=-tilt;g2.add(arm);
    const beam=mk(new THREE.BoxGeometry(4.0,.07,.12),lam('#475569'),0);arm.add(beam);const scale=.95/Math.max(b.inc,b.exp);
    [[-1.6,sc.inc.concat(st.extra?[['extra job',st.extra]]:[]),'#16a36f',false],[1.6,sc.exp,'#f59e0b',true]].forEach(([x,list,col,isExp])=>{const pan=new THREE.Group();pan.position.set(x,0,0);arm.add(pan);const plate=mk(new THREE.BoxGeometry(1.2,.04,.8),lam('#cbd5e1'),20);plate.position.y=-.6;pan.add(plate);
      let yy=-.58;list.forEach(([n,v],i)=>{const amt=isExp?expAmt(st,i):v;const h=Math.max(.04,amt*scale);const blk=mk(new THREE.BoxGeometry(1.0,h*.95,.6),lam(tint(col,.25+.15*(i%3))),20);blk.position.set(0,yy+h/2,0);pan.add(blk);
        const l=label(n+' '+money(amt),{size:.12,color:INK});l.position.set(0,yy+h/2,.33);pan.add(l);if(isExp)A.drag(blk,{tap:()=>cut(i)});yy+=h;});
      [[-.5],[.5]].forEach(([dx])=>pan.add(seg(V(dx,-.6,0),V(0,0,0),'#94a3b8',.01)));
      const t=label(isExp?'expenses':'income',{size:.16,color:col});t.position.set(0,-.8,.45);pan.add(t);});A.redraw();}
  function cut(i){const k=st.sc+':'+i;st.cut[k]=(st.cut[k]||0)+1;if(st.cut[k]>8)st.cut[k]=8;A.pop();draw();const b=bud(st);A.say(b.bal>=0?'Balanced! Surplus '+money(b.bal):'Deficit '+money(-b.bal));if(mode==='play'&&!st.setup&&st.need&&b.bal>=0)game.solved('Balanced! Surplus of '+money(b.bal)+'.');}
  draw();
  return {info:()=>SCN[st.sc].n,
    controls:()=>{const c=SCN.map((s,i)=>({t:s.n,on:st.sc===i,fn:()=>{st.sc=i;st.extra=0;draw();}})).concat([{t:'Earn more',fn:()=>{st.extra+=Math.round(bud(st).inc*.05);draw();const b=bud(st);if(mode==='play'&&!st.setup&&st.need&&b.bal>=0)game.solved('Balanced by earning more!');}},{t:'Reset',fn:()=>{st.cut={};st.extra=0;draw();}}]);
      if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c.slice(-1));return c;},
    demo(n){st.ask=null;st.need=false;st.sc=0;st.cut={};st.extra=0;if(n==='tip')draw();if(n==='cut'){draw();A.seq([0,1,2,3,4,5].map(()=>[450,()=>cut(2)]));}},
    task(r){st.setup=true;st.ask=null;st.need=false;st.cut={};st.extra=0;let txt;
      if(r<2){st.sc=r?1:0;st.need=true;txt='The *'+SCN[st.sc].n.toLowerCase()+'* budget has a deficit. *Tap expenses to cut them* (or earn more) until it balances.';}
      else if(r===2){st.sc=2;st.ask={ans:'Deficit of $110',o:shuffle(['Deficit of $110','Surplus of $110','Balanced']),ok:'Yes! $750 − $860 = −$110.'};txt='The club earns *$750* and spends *$860*. What is its balance?';}
      else if(r===3){st.sc=0;st.ask={ans:'A spreadsheet',o:shuffle(['A spreadsheet','Guessing at the end of the month','A shopping list only']),ok:'Yes! A spreadsheet tracks and totals every amount.'};txt='Which is the best *tool* to track all income and spending?';}
      else{st.sc=1;st.ask={ans:'Cut “fun” spending',o:shuffle(['Cut “fun” spending','Stop paying rent','Skip all food']),ok:'Yes! Cut wants before needs.'};txt='The family has a deficit. What is the *best first step*?';}
      draw();st.setup=false;return txt;}};}
});
function expAmt(st,i){const v=SCN[st.sc].exp[i][1];const c=st.cut[st.sc+':'+i]||0;return Math.round(v*(1-.1*c));}
function bud(st){const sc=SCN[st.sc];const inc=sc.inc.reduce((a,b)=>a+b[1],0)+st.extra;const exp=sc.exp.reduce((a,_,i)=>a+expAmt(st,i),0);return {inc,exp,bal:inc-exp};}

/* =========================================================
   36. Simple and compound interest over time
   ========================================================= */
P.lesson({id:'interest8',title:'Simple and compound interest over time',strand:'Financial Literacy',codes:['F1.4'],
 guide:{goal:'Determine the growth of simple and compound interest at various rates using digital tools, and explain the impact interest has on long-term financial planning.',words:'simple interest, compound interest, principal, rate, spreadsheet formula, rule of 72, long-term',
  ask:['How does a spreadsheet formula like =B2*1.06 build compound interest?','Why does starting to save early matter so much?','About how long does money take to double at 6%?'],home:'Make a spreadsheet: $1000 at 5% for 30 years, simple in one column and compound in another. When does compound pull far ahead?'},
 learn:[{say:'A spreadsheet grows the money.',speech:'Each row is one year. The compound column uses the formula: last year times one plus the rate. Watch Marcus’s towers rise: one thousand dollars at six percent for forty years. Compound interest grows faster and faster.',view:'model',demo:'grow'},
        {say:'Read about long-term planning.',speech:'Simple interest adds the same amount every year. Compound interest earns interest on interest, so time matters a lot. The rule of seventy-two: divide seventy-two by the rate to estimate how many years it takes to double.',view:'read'},
        {say:'Watch: start early.',speech:'Elena invests one thousand dollars at age fifteen. Jalen invests the same at age twenty-five. At age fifty-five, Elena has about ten thousand dollars, and Jalen has about five thousand seven hundred. Ten extra years almost doubled Elena’s money.',view:'model',demo:'early'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: change the rate.',speech:'Your turn. Change the rate and the number of years, and compare simple and compound growth.',view:'model'}],
 fig:'Towers for each decade: simple (blue) and compound (gold).',rz:.35,
 explore:['Change the *rate* and the *years*.','Blue = simple, gold = compound.','The formula row shows the *spreadsheet* rule.'],
 howTo:'Use the model or the formula, then choose the answer.',
 init:k=>({P:1000,rate:6,yrs:40,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'*Digital tools* like spreadsheets make interest easy to calculate for many years.')+14;
  rr(g,X0,y,TW,44,10);g.fillStyle=tint(acc(),.16);g.fill();['','A: Year','B: Simple','C: Compound'].forEach((h,i)=>T(g,h,X0+10+i*TW/4,y+30,FT.smallB,acc()));y+=48;
  [['2','0','$1000.00','$1000.00'],['3','1','=B2+60','=C2*1.06'],['4','2','$1120.00','$1123.60'],['…','40','$3400.00','$10 285.72']].forEach((r,j)=>r.forEach((v,i)=>T(g,v,X0+10+i*TW/4,y+j*38+26,i&&v[0]==='='?'600 22px "Atkinson Hyperlegible", monospace':FT.small,v[0]==='='?'#7c3aed':INK)));y+=170;
  rr(g,X0,y,TW,100,16);g.fillStyle=tint(acc(),.1);g.fill();T(g,'Rule of 72',X0+20,y+36,FT.bodyB,acc());T(g,'years to double ≈ 72 ÷ rate:  72 ÷ 6 = 12 years',X0+20,y+74,FT.body);y+=120;
  y=para(p,y,'*Long-term planning:* starting early gives compound interest more time. Debt at high interest grows the same way, against you.')+10;
  y=keyWords(p,y,[['compound interest','interest on the principal and past interest'],['rule of 72','a quick estimate of doubling time']]);
  predict(p,y,S,'p36','At 8%, about how many years does money take to double?','*About 9 years.* 72 ÷ 8 = 9.');},
 readout(p,S,y){const g=p.g,st=S.st,s=st.P*(1+st.rate/100*st.yrs),c=st.P*Math.pow(1+st.rate/100,st.yrs);T(g,'After '+st.yrs+' years at '+st.rate+'%:',X0,y+40,FT.bodyB);T(g,'simple '+money(s)+'   compound '+money(c),X0,y+86,ZS(34),acc());return y+96;},
 build(S,grp,mode,game){const st=S.st;const g2=new THREE.Group();grp.add(g2);
  function draw(){clearGroup(g2);const n=st.yrs/5;const mx=st.P*Math.pow(1+st.rate/100,st.yrs);const sc=2.1/mx;for(let i=0;i<=n;i++){const y=i*5;const x=-2.0+i*(4.0/n);const s=st.P*(1+st.rate/100*y),c=st.P*Math.pow(1+st.rate/100,y);
      const b1=mk(new THREE.BoxGeometry(.12,Math.max(.01,s*sc),.3),lam('#3b82f6'),20);b1.position.set(x-.07,s*sc/2,-2.0);g2.add(b1);const b2=mk(new THREE.BoxGeometry(.12,Math.max(.01,c*sc),.3),lam('#f59e0b'),20);b2.position.set(x+.07,c*sc/2,-2.0);g2.add(b2);
      if(i%2===0){const l=label(y+'y',{size:.12,color:GREY});l.position.set(x,.08,-1.62);g2.add(l);}}
    const f=label('=C'+'2*'+(1+st.rate/100).toFixed(2),{size:.2,bg:'#1e293b',color:'#c4b5fd'});f.position.set(-1.3,2.5,-2.5);g2.add(f);const e=label(money(mx),{size:.2,bg:'#ffffff',border:'#f59e0b'});e.position.set(1.85,2.3,-2.0);g2.add(e);A.redraw();}
  draw();
  return {info:()=>st.rate+'% '+st.yrs,
    controls:()=>{const c=[{t:'rate −',fn:()=>{st.rate=Math.max(1,st.rate-1);draw();}},{t:'rate +',go:true,fn:()=>{st.rate=Math.min(12,st.rate+1);draw();}},{t:'years −10',fn:()=>{st.yrs=Math.max(10,st.yrs-10);draw();}},{t:'years +10',fn:()=>{st.yrs=Math.min(50,st.yrs+10);draw();}}];if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);return c;},
    demo(n){st.ask=null;if(n==='grow'){st.rate=6;st.yrs=10;draw();A.seq([20,30,40].map(y=>[700,()=>{st.yrs=y;draw();}]));}if(n==='early'){st.rate=6;st.yrs=40;draw();A.seq([[900,()=>A.say('Elena (40 years): $10 285.72')],[1300,()=>{st.yrs=30;draw();A.say('Jalen (30 years): $5743.49');}]]);}},
    task(r){st.setup=true;st.rate=6;st.yrs=40;let txt;
      if(r===0){st.yrs=10;st.rate=5;st.ask={ans:'$1628.89',o:shuffle(['$1628.89','$1500.00','$1050.00']),ok:'Yes! 1000 × 1.05¹⁰ ≈ 1628.89.'};txt='*$1000* at *5% compound* interest for *10 years* grows to about…';}
      else if(r===1){st.ask={ans:'12 years',o:shuffle(['12 years','6 years','72 years']),ok:'Yes! 72 ÷ 6 = 12.'};txt='Use the *rule of 72*: about how long to double at *6%*?';}
      else if(r===2){st.ask={ans:'=C2*1.04',o:shuffle(['=C2*1.04','=C2+4','=C2*4']),ok:'Yes! Multiply by 1 + 0.04 each year.'};txt='Which *spreadsheet formula* grows money at *4% compound* interest each year?';}
      else if(r===3){st.ask={ans:'Starting earlier',o:shuffle(['Starting earlier','Checking more often','Using a bigger bank']),ok:'Yes! More years let compound interest work.'};txt='Elena and Jalen invest the same amount at the same rate. What gives Elena more money?';}
      else{st.yrs=10;st.rate=10;st.ask={ans:'$2000.00',o:shuffle(['$2000.00','$2593.74','$1100.00']),ok:'Yes! $100 a year for 10 years = $1000 interest.'};txt='*$1000* at *10% simple* interest for *10 years* grows to…';}
      draw();st.setup=false;return txt;}};}
});

/* =========================================================
   37. Getting more value: sales and loyalty programs
   ========================================================= */
const DEALS=[{n:'30% off everything',f:(q,p)=>q*p*.7},{n:'Buy 2, get 1 free',f:(q,p)=>(q-Math.floor(q/3))*p},{n:'$15 off $50 or more',f:(q,p)=>q*p>=50?q*p-15:q*p},{n:'Loyalty: 10 points per $1 (1000 points = $10)',f:(q,p)=>q*p-q*p*10/1000*10}];
P.lesson({id:'value8',title:'Sales, loyalty programs and best value',strand:'Financial Literacy',codes:['F1.5'],
 guide:{goal:'Compare various ways for consumers to get more value for their money when spending, including sales and customer loyalty and incentive programs, and determine the best choice for different scenarios.',words:'sale, discount, percent off, buy-one-get-one, loyalty program, points, incentive, best value',
  ask:['When is “buy 2, get 1 free” better than “30% off”?','How much are 1000 loyalty points worth?','Is a deal good value if you didn’t need the item?'],home:'Compare flyers from two stores for the same product. Which deal gives the best value for your family?'},
 learn:[{say:'Same cart, different deals.',speech:'Ana wants three T-shirts at twenty dollars each: sixty dollars. Watch each deal. Thirty percent off: forty-two dollars. Buy two, get one free: forty dollars. Fifteen dollars off fifty or more: forty-five dollars. Loyalty points: worth six dollars.',view:'model',demo:'cart'},
        {say:'Read about best value.',speech:'The best deal depends on how many items you buy. A deal is only good value if you need the item. Loyalty points are worth money later, but usually less than an instant discount.',view:'read'},
        {say:'Watch: change the cart.',speech:'With only two T-shirts, buy two get one free gives nothing extra. Thirty percent off is now the best deal.',view:'model',demo:'two'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: find the best deal.',speech:'Your turn. Change the number of items and the price, and find the best deal.',view:'model'}],
 fig:'Four receipts for the same cart under different deals.',rz:.35,
 explore:['Change the *number of items* and the *price*.','Each tower is a *deal*: shorter is cheaper.','The best deal glows gold.'],
 howTo:'Find the best value deal, then choose it.',
 init:k=>({q:3,p:20,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'Stores use *sales* and *incentives* to attract shoppers. Compare the *final cost* of each.')+14;
  rr(g,X0,y,TW,44,12);g.fillStyle=tint(acc(),.16);g.fill();T(g,'3 T-shirts at $20 (= $60)',X0+20,y+30,FT.smallB,acc());y+=48;
  [['30% off','$60 × 0.7','$42.00'],['Buy 2, get 1 free','pay for 2','$40.00 ✓'],['$15 off $50+','$60 − $15','$45.00'],['Loyalty points','600 points = $6 later','$54.00']].forEach(([a,b,c],i)=>{T(g,a,X0+20,y+i*42+30,FT.bodyB);T(g,b,X0+300,y+i*42+30,FT.small,GREY);T(g,c,X0+TW-20,y+i*42+30,FT.bodyB,c.includes('✓')?'#16a36f':INK,'right');});y+=186;
  y=para(p,y,'*Ask:* Do I need it? Will I use the points? Is the “sale” price really lower than other stores?')+10;
  y=para(p,y,'*Unit price* helps too: 12 cans for $9 = $0.75 each.')+10;
  y=keyWords(p,y,[['loyalty program','points or rewards for shopping at one store'],['incentive','something offered to make you buy']]);
  predict(p,y,S,'p37','Which is better for 4 items at $10: 25% off or buy 3 get 1 free?','*The same: $30 each way.*');},
 readout(p,S,y){const g=p.g,st=S.st,c=DEALS.map(d=>r2(d.f(st.q,st.p))),b=c.indexOf(Math.min(...c));T(g,st.q+' × $'+st.p+' = '+money(st.q*st.p),X0,y+40,FT.bodyB);T(g,'Best: '+DEALS[b].n.split(' (')[0]+' → '+money(c[b]),X0,y+86,ZS(32),'#16a36f');return y+96;},
 build(S,grp,mode,game){const st=S.st;const g2=new THREE.Group();grp.add(g2);
  function draw(){clearGroup(g2);const c=DEALS.map(d=>r2(d.f(st.q,st.p))),mn=Math.min(...c),mx=st.q*st.p;DEALS.forEach((d,i)=>{const x=-1.65+i*1.1,h=Math.max(.05,c[i]/mx*1.9);const best=c[i]===mn;const rc=mk(new THREE.BoxGeometry(.7,h,.08),lam(best?'#fde68a':'#ffffff'),20);rc.position.set(x,h/2+.02,-2.0);g2.add(rc);
      const full=mk(new THREE.BoxGeometry(.72,1.9,.04),new THREE.MeshLambertMaterial({color:'#cbd5e1',transparent:true,opacity:.25,depthWrite:false}),0);full.position.set(x,.97,-2.08);g2.add(full);
      const l=label(money(c[i]),{size:.17,bg:'#ffffff',border:best?'#f5b301':'#cbd5e1'});l.position.set(x,h+.22,-1.95);g2.add(l);const n=label(['30% off','2 + 1 free','$15 off $50','points'][i],{size:.13,color:GREY});n.position.set(x,.1,-1.6);g2.add(n);});
    for(let i=0;i<st.q;i++){const sh=mk(G('vl8t',()=>new THREE.BoxGeometry(.3,.04,.3)),lam(['#2f7de1','#e4572e','#16a36f','#8b5cf6','#f59e0b','#0fa5a5'][i%6]),0);sh.position.set(-1.9+i*.36,.04+0,-.9);g2.add(sh);}const cart=label(st.q+' items × $'+st.p,{size:.18,color:INK});cart.position.set(1.2,.15,-.9);g2.add(cart);A.redraw();}
  draw();
  return {info:()=>st.q+'x'+st.p,
    controls:()=>{const c=[{t:'items −',fn:()=>{st.q=Math.max(1,st.q-1);draw();}},{t:'items +',go:true,fn:()=>{st.q=Math.min(6,st.q+1);draw();}},{t:'price −$5',fn:()=>{st.p=Math.max(5,st.p-5);draw();}},{t:'price +$5',fn:()=>{st.p=Math.min(40,st.p+5);draw();}}];if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);return c;},
    demo(n){st.ask=null;if(n==='cart'){st.q=3;st.p=20;draw();}if(n==='two'){st.q=3;st.p=20;draw();A.seq([[900,()=>{st.q=2;draw();A.say('30% off is best now');}]]);}},
    task(r){st.setup=true;let txt;const opt=DEALS.map(d=>d.n);
      const best=(q,p)=>{const c=DEALS.map(d=>r2(d.f(q,p)));return DEALS[c.indexOf(Math.min(...c))].n;};
      if(r===0){st.q=3;st.p=20;st.ask={ans:best(3,20),o:opt,ok:'Yes! You pay for only 2: $40.'};txt='Which deal is *best* for *3 T-shirts at $20*?';}
      else if(r===1){st.q=2;st.p=20;st.ask={ans:best(2,20),o:opt,ok:'Yes! $28 is the lowest.'};txt='Now you only need *2 T-shirts*. Which deal is *best*?';}
      else if(r===2){st.q=2;st.p=30;st.ask={ans:best(2,30),o:opt,ok:'Yes! $42 beats $45 with $15 off.'};txt='*2 hoodies at $30*. Which deal gives the *best value*?';}
      else if(r===3){st.q=3;st.p=20;st.ask={ans:'$10',o:shuffle(['$10','$100','$1']),ok:'Yes! 1000 points = $10 in this program.'};txt='In this loyalty program, what are *1000 points* worth?';}
      else{st.q=1;st.p=40;st.ask={ans:'No: you would spend money you did not plan to',o:['Yes: a sale always saves money','No: you would spend money you did not plan to'],ok:'Right! Value means paying less for what you need.'};txt='A $40 jacket you don’t need is *30% off*. Is buying it good value?';}
      draw();st.setup=false;return txt;}};}
});

/* =========================================================
   38. Credit cards and contracts
   ========================================================= */
const CARDS=[{n:'Rewards card',rate:20.99,fee:120,back:2,col:'#7c3aed'},{n:'Low-rate card',rate:12.99,fee:39,back:0,col:'#2563eb'},{n:'No-fee card',rate:19.99,fee:0,back:.5,col:'#16a34a'}];
P.lesson({id:'credit8',title:'Comparing credit cards and contracts',strand:'Financial Literacy',codes:['F1.6'],
 guide:{goal:'Compare interest rates, annual fees, and rewards and other incentives offered by credit card companies and consumer contracts to determine the best value and best choice for different scenarios.',words:'credit card, interest rate, annual fee, rewards, cash back, balance, contract, total cost',
  ask:['Why does a reward card cost more if you carry a balance?','When is a low-rate card the best choice?','How do you find the total cost of a phone contract?'],home:'Look up two real credit cards or phone plans. Compare rates, fees and rewards for a family that spends $500 a month.'},
 learn:[{say:'Cost = fee + interest − rewards.',speech:'Each card Rohan compares has an annual fee, an interest rate on any balance you carry, and rewards like cash back. If you spend five hundred dollars a month and pay in full, there is no interest. The rewards card pays back one hundred twenty dollars but has a one hundred twenty dollar fee.',view:'model',demo:'full'},
        {say:'Read about carrying a balance.',speech:'If you carry a balance, interest is charged on it. At twenty percent, a two thousand dollar balance costs about four hundred dollars a year. Then a low-rate card is usually the best choice.',view:'read'},
        {say:'Watch: carry a balance.',speech:'Now carry a two thousand dollar balance all year. The interest towers grow. The low-rate card is now the cheapest by far.',view:'model',demo:'carry'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: compare the cards.',speech:'Your turn. Change the monthly spending and the balance you carry, and find the best card.',view:'model'}],
 fig:'Three cards with towers showing their yearly cost.',rz:.35,
 explore:['Change *monthly spending*.','Change the *balance carried*.','The shortest net-cost tower is the best value.'],
 howTo:'Find the card or contract with the best value, then choose it.',
 init:k=>({spend:500,bal:0,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'*Yearly cost of a card* = annual fee + interest on any balance − rewards. (Rates are examples.)')+12;
  rr(g,X0,y,TW,44,12);g.fillStyle=tint(acc(),.16);g.fill();['Card','Rate','Fee','Rewards'].forEach((h,i)=>T(g,h,X0+16+i*TW/4,y+30,FT.smallB,acc()));y+=48;
  CARDS.forEach((c,j)=>{[c.n,c.rate+'%','$'+c.fee,c.back+'% back'].forEach((v,i)=>T(g,v,X0+16+i*TW/4,y+j*40+28,i?FT.body:FT.bodyB,i?INK:c.col));});y+=136;
  y=para(p,y,'*Pay in full every month?* Interest is $0, so compare fees and rewards. *Carry a balance?* The interest rate matters most.')+10;
  rr(g,X0,y,TW,110,16);g.fillStyle=tint(acc(),.1);g.fill();T(g,'Phone contract: $0 phone + $65/month for 24 months',X0+20,y+36,FT.bodyB,acc());T(g,'vs $600 phone + $40/month: $1560 vs $1560: the same!',X0+20,y+76,FT.small);y+=130;
  y=keyWords(p,y,[['annual fee','a yearly charge for having the card'],['cash back','a reward: a percent of spending returned to you']]);
  predict(p,y,S,'p38','A $1000 balance at 19.99% for a year costs about how much interest?','*About $200.*');},
 readout(p,S,y){const g=p.g,st=S.st;const c=CARDS.map(k=>ccost(k,st)),b=c.indexOf(Math.min(...c));T(g,CARDS.map((k,i)=>k.n.split(' ')[0]+' '+money(c[i])).join('  ·  '),X0,y+40,FT.bodyB);T(g,'Best value: '+CARDS[b].n,X0,y+86,ZS(36),CARDS[b].col);return y+96;},
 build(S,grp,mode,game){const st=S.st;const g2=new THREE.Group();grp.add(g2);
  function draw(){clearGroup(g2);const cs=CARDS.map(k=>ccost(k,st));const mx=Math.max(200,...CARDS.map(k=>k.fee+st.bal*k.rate/100));const sc=1.8/mx;const mn=Math.min(...cs);
    CARDS.forEach((k,i)=>{const x=-1.5+i*1.5;const card=mk(new THREE.BoxGeometry(.9,.03,.58),lam(k.col),20);card.position.set(x,.02,-1.2);g2.add(card);const n=label(k.n,{size:.14,color:'#ffffff'});n.position.set(x,.08,-1.2);g2.add(n);
      const fee=k.fee*sc,int=st.bal*k.rate/100*sc,rew=st.spend*12*k.back/100*sc;let yy=0;[[fee,'#94a3b8'],[int,'#e4572e']].forEach(([h,col])=>{if(h<.005)return;const b=mk(new THREE.BoxGeometry(.5,h,.4),lam(col),20);b.position.set(x,yy+h/2,-2.1);g2.add(b);yy+=h;});
      if(rew>.005){const r=mk(new THREE.BoxGeometry(.5,Math.min(rew,yy||rew),.4),new THREE.MeshLambertMaterial({color:'#16a36f',transparent:true,opacity:.55}),0);r.position.set(x+.52,Math.min(rew,yy||rew)/2,-2.1);g2.add(r);}
      const l=label('net '+money(cs[i]),{size:.17,bg:'#ffffff',border:cs[i]===mn?'#f5b301':'#cbd5e1'});l.position.set(x,yy+.3,-2.1);g2.add(l);});
    const k=label('grey = fee   orange = interest   green = rewards',{size:.13,color:GREY});k.position.set(0,2.4,-2.6);g2.add(k);A.redraw();}
  draw();
  return {info:()=>st.spend+'/'+st.bal,
    controls:()=>{const c=[{t:'spend −$100',fn:()=>{st.spend=Math.max(100,st.spend-100);draw();}},{t:'spend +$100',fn:()=>{st.spend=Math.min(2000,st.spend+100);draw();}},{t:'balance −$500',fn:()=>{st.bal=Math.max(0,st.bal-500);draw();}},{t:'balance +$500',go:true,fn:()=>{st.bal=Math.min(4000,st.bal+500);draw();}}];if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);return c;},
    demo(n){st.ask=null;if(n==='full'){st.spend=500;st.bal=0;draw();}if(n==='carry'){st.spend=500;st.bal=0;draw();A.seq([500,1000,1500,2000].map(b=>[600,()=>{st.bal=b;draw();}]));}},
    task(r){st.setup=true;let txt;const best=()=>{const c=CARDS.map(k=>ccost(k,st));return CARDS[c.indexOf(Math.min(...c))].n;};const opt=CARDS.map(k=>k.n);
      if(r===0){st.spend=1500;st.bal=0;st.ask={ans:best(),o:opt,ok:'Yes! 2% of $18 000 = $360 back, minus the $120 fee.'};txt='A family spends *$1500 a month* and *pays in full*. Which card is the best value?';}
      else if(r===1){st.spend=500;st.bal=2000;st.ask={ans:best(),o:opt,ok:'Yes! The low rate saves the most interest.'};txt='You often carry a *$2000 balance*. Which card is the best value?';}
      else if(r===2){st.spend=300;st.bal=0;st.ask={ans:best(),o:opt,ok:'Yes! With low spending, avoid annual fees.'};txt='You spend only *$300 a month* and pay in full. Which card is best?';}
      else if(r===3){st.spend=500;st.bal=1000;st.ask={ans:'About $200',o:shuffle(['About $200','About $20','About $2000']),ok:'Yes! 19.99% of $1000 ≈ $200.'};txt='A *$1000* balance at *19.99%* for a year costs about how much interest?';}
      else{st.spend=500;st.bal=0;st.ask={ans:'Plan B: $1440',o:['Plan A: $1560','Plan B: $1440'],ok:'Yes! $480 + $40 × 24 = $1440.'};txt='Phone contracts for 24 months: *A*: $0 phone + $65/month. *B*: $480 phone + $40/month. Which costs less in total?';}
      draw();st.setup=false;return txt;}};}
});
function ccost(k,st){return r2(k.fee+st.bal*k.rate/100-st.spend*12*k.back/100);}
})();
