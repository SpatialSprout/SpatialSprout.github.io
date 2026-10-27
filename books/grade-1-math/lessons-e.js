/* The Interactive Classroom: Grade 1 Math — Units 17–21: 2-D shapes, symmetry and fractions, 3-D solids, directions */
(function(){
"use strict";
const P=window.PM;if(!P||P.failed||!P.THREE||!P.K)return;
const {THREE,V,G,lam,mk,label,clearGroup,rr,T,wrap,header,keyWords,FT,ZS,X0,TW,INK,GREY,tint,A,hop,tween,moveTo,easeOut,wedgeGeo}=P;
const K=P.K,{rnd,pick,shuffle,choices,nearby,words,toy,lay,tag,mat,icon,icons,xMark,tbox,exGrid,bigText,hand,sub,nm,bx,cyl,sph,at}=K;
const acc=()=>P.ACC;const LET='ABCDEF';

/* ---------- flat shapes ---------- */
const SH={circle:{n:0,c:'#ef5350'},triangle:{n:3,c:'#ffb300'},square:{n:4,c:'#42a5f5'},rectangle:{n:4,c:'#66bb6a',rect:1},pentagon:{n:5,c:'#ab47bc'},hexagon:{n:6,c:'#26a69a'}};
const SHN=Object.keys(SH);
function pts(k,r,irr){const d=SH[k];if(d.rect)return [[-r*1.3,-r*.7],[r*1.3,-r*.7],[r*1.3,r*.7],[-r*1.3,r*.7]];if(k==='square')return [[-r*.8,-r*.8],[r*.8,-r*.8],[r*.8,r*.8],[-r*.8,r*.8]];
  const n=d.n,o=[];for(let i=0;i<n;i++){const a=Math.PI/2+i*Math.PI*2/n+(irr?(((i*37)%7)-3)*.08:0),rr2=r*(irr?.75+((i*53)%5)*.09:1);o.push([Math.cos(a)*rr2,Math.sin(a)*rr2]);}return o;}
function shapeGeo(k,r,irr){const s=new THREE.Shape();if(k==='circle')s.absarc(0,0,r,0,Math.PI*2,false);else{const p=pts(k,r,irr);s.moveTo(p[0][0],p[0][1]);p.slice(1).forEach(q=>s.lineTo(q[0],q[1]));s.closePath();}
  const g=new THREE.ExtrudeGeometry(s,{depth:.06,bevelEnabled:false,curveSegments:40});g.rotateX(-Math.PI/2);return g;}
function shape3(k,r,c,irr){const m=mk(shapeGeo(k,r,irr),lam(c||SH[k].c),20);m.userData.shape=k;return m;}
function shape2d(g,k,x,y,r,c,irr,o){o=o||{};g.beginPath();if(k==='circle')g.arc(x,y,r,0,7);else{const p=pts(k,r,irr);g.moveTo(x+p[0][0],y-p[0][1]);p.slice(1).forEach(q=>g.lineTo(x+q[0],y-q[1]));g.closePath();}
  if(!o.nofill){g.fillStyle=c||SH[k].c;g.fill();}g.strokeStyle=o.stroke||'rgba(27,34,54,.6)';g.lineWidth=o.lw||3;if(o.dash)g.setLineDash([8,7]);g.stroke();g.setLineDash([]);
  if(o.corners&&k!=='circle')pts(k,r,irr).forEach(q=>{g.beginPath();g.arc(x+q[0],y-q[1],6,0,7);g.fillStyle='#e4572e';g.fill();});}

/* =========================================================
   Unit 17 · 2-D Shapes
   ========================================================= */
P.lesson({id:'shapes2d',title:'2-D shapes: sides and corners',strand:'Spatial Sense',codes:['E1.1','E1.2'],
 guide:{goal:'Name and describe circles, triangles, squares, rectangles, pentagons and hexagons, and count their sides and corners. Shapes can be any size and turned any way.',words:'circle, triangle, square, rectangle, pentagon, hexagon, side, corner, straight, curved',
  ask:['How many sides does a triangle have? How many corners?','Is a square also a rectangle? Why?','Is it still a hexagon if the sides are not all the same?'],home:'Go on a shape hunt! Find a circle, a rectangle and a triangle in your home.'},
 learn:[{say:'Count sides and corners.',speech:'Count the sides of the pentagon: one, two, three, four, five. It has five sides and five corners.',view:'model',demo:'count5'}],
 fig:'Flat shapes to name, with sides and corners to count.',rz:.45,
 explore:['*Tap* a shape to hear its name.','Press *Sides* to count the sides and corners.','Press *Mix* for shapes of all kinds.'],
 howTo:'Tap the shape the question asks for, or count sides and corners and tap the answer.',
 init:k=>({view:'all',one:'pentagon',hi:0,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=tbox(p,y-10,330,'Flat shapes');
  SHN.forEach((k,i)=>{const x=X0+90+(i%3)*270,yy=y+40+Math.floor(i/3)*140;shape2d(g,k,x,yy,k==='rectangle'?36:44,null,false,{corners:true});T(g,k,x+80,yy-4,FT.bodyB,INK);
    T(g,(k==='circle'?0:SH[k].n)+' sides',x+80,yy+26,FT.small,GREY);T(g,(k==='circle'?0:SH[k].n)+' corners',x+80,yy+52,FT.small,GREY);});y+=280;
  y=tbox(p,y,240,'Same shape, any size, any turn');
  shape2d(g,'triangle',X0+80,y+40,40);shape2d(g,'triangle',X0+190,y+50,26,'#ffd54f');g.save();g.translate(X0+300,y+50);g.rotate(.8);shape2d(g,'triangle',0,0,40,'#ffca28');g.restore();shape2d(g,'hexagon',X0+450,y+40,44,null,true);
  wrap(g,'All three are *triangles*: 3 sides. The last one is a *hexagon*: its 6 sides are not all the same, but it is still a hexagon!',X0+520,y,TW-530,32,{font:FT.small,bold:FT.smallB,boldColor:acc()});y+=180;
  y=exGrid(p,y,2,150,(i,x,yy,w,h)=>{
    if(i===0){shape2d(g,'rectangle',x+90,yy+80,36,null,false,{corners:true});wrap(g,'4 sides, 4 corners. Opposite sides match.',x+180,yy+50,w-200,30,{font:FT.small,bold:FT.smallB});}
    if(i===1){T(g,'Robot made of shapes',x+56,yy+34,FT.smallB);shape2d(g,'rectangle',x+110,yy+100,26);shape2d(g,'circle',x+90,yy+92,7,'#fff');shape2d(g,'circle',x+130,yy+92,7,'#fff');shape2d(g,'triangle',x+110,yy+55,16);hand(g,'rectangle head',x+190,yy+110,INK);}
  });
  y=keyWords(p,y,[['side','a straight edge of a shape'],['corner','where two sides meet']]);return y;},
 readout(p,S,y){const g=p.g,st=S.st;let s='';if(st.view==='one'){const n=SH[st.one].n;s=st.one+': '+(st.one==='circle'?'0 sides, 0 corners':Math.min(st.hi,n)+' side'+(st.hi===1?'':'s')+(st.hi>=n?', '+n+' corners':''));}else if(st.sel)s=st.sel;if(s)T(g,s,X0,y+54,ZS(42),acc());return y+70;},
 build(S,grp,mode,game){const st=S.st;const g2=K.stage(grp);let items=[];
  function draw(){clearGroup(g2);items=[];
    if(st.view==='one'){const m=shape3(st.one,1.0);m.position.set(0,0,-1.9);g2.add(m);if(st.one!=='circle'){const p=pts(st.one,1.0);for(let i=0;i<Math.min(st.hi,p.length);i++){const a=p[i],b=p[(i+1)%p.length];const len=Math.hypot(b[0]-a[0],b[1]-a[1]);
        const e=mk(new THREE.BoxGeometry(len,.06,.06),lam('#e4572e'),0);e.position.set((a[0]+b[0])/2,.09,-1.9-(a[1]+b[1])/2);e.rotation.y=Math.atan2(b[1]-a[1],b[0]-a[0]);g2.add(e);const N=tag(String(i+1),{size:.2});N.position.set((a[0]+b[0])/2*1.25,.3,-1.9-(a[1]+b[1])/2*1.25);g2.add(N);}
        if(st.hi>=p.length)p.forEach(q=>{const d=sph(.07,'#ffd54f');d.position.set(q[0],.1,-1.9-q[1]);g2.add(d);});}}
    else{const list=st.list||SHN.map(k=>({k}));const n=list.length,cols=n>6?4:3;list.forEach((o,i)=>{const m=shape3(o.k,.38,o.c,o.irr);m.rotation.y=o.rot||0;m.position.set(((i%cols)-(cols-1)/2)*1.3,0,-2.5+Math.floor(i/cols)*1.05);g2.add(m);items.push(m);
      if(st.lit&&st.lit.includes(i)){const r=mk(G('k_ring',()=>new THREE.TorusGeometry(.52,.03,8,36)),lam('#16a36f'),0);r.rotation.x=Math.PI/2;r.position.copy(m.position);r.position.y=.05;g2.add(r);}K.tapOn(m,()=>tap(i,o));});}
    A.redraw();}
  function tap(i,o){A.pop();st.sel=o.k;A.say(o.k);if(mode==='play'&&!st.setup){if(st.wantAll){if(o.k===st.wantAll){if(!st.lit.includes(i)){st.lit.push(i);draw();}if(st.lit.length===st.list.filter(q=>q.k===st.wantAll).length)game.solved('Yes! You found every '+st.wantAll+'.');}else A.bad('Count the sides of that one.');return;}
      if(st.want){if(st.want(o))game.solved(st.wantOk);else A.bad('Count the sides and corners.');}}else A.redraw();}
  function countSides(k){st.view='one';st.one=k||st.one;st.hi=0;draw();const n=SH[st.one].n;A.seq([...Array(n+1)].map((_,i)=>[i?500:200,()=>{st.hi=i;draw();if(i)A.say(String(i));}]));}
  function mix(){st.view='all';st.lit=[];st.list=shuffle(SHN.concat(['triangle','pentagon','hexagon'])).slice(0,8).map(k=>({k,irr:k!=='circle'&&k!=='square'&&k!=='rectangle'&&Math.random()<.5,rot:Math.random()*1.5}));draw();}
  draw();
  return {info:()=>st.view+st.hi+(st.sel||''),
    controls:()=>{const c=[{t:'Shapes',fn:()=>{st.view='all';st.list=null;st.lit=null;draw();}},{t:'Sides',go:true,fn:()=>countSides(pick(SHN.slice(1)))},{t:'Mix',fn:mix}];
      if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);return c;},
    demo(n){st.ask=null;st.want=null;st.wantAll=null;
      if(n==='all'){st.view='all';st.list=null;st.lit=null;st.sel=null;draw();}if(n==='count5')countSides('pentagon');if(n==='five'){st.view='one';st.one='pentagon';st.hi=5;draw();}
      if(n==='tri'){st.view='one';st.one='triangle';st.hi=3;draw();}if(n==='rect'){st.view='one';st.one='rectangle';st.hi=4;draw();}
      if(n==='odd'){st.view='all';st.lit=null;st.list=[{k:'triangle'},{k:'triangle',c:'#ffd54f',rot:.9},{k:'hexagon',irr:true},{k:'hexagon'}];draw();}},
    task(r){st.setup=true;st.ask=null;st.want=null;st.wantAll=null;st.lit=[];st.sel=null;let txt;
      if(r===0){const k=pick(SHN);st.view='all';st.list=shuffle(SHN).map(q=>({k:q,rot:Math.random()}));st.want=o=>o.k===k;st.wantOk='Yes! That is the '+k+'.';txt='Tap the *'+k+'*.';}
      else if(r===1||r===2){const k=pick(SHN.slice(1));st.view='one';st.one=k;st.hi=0;const n=SH[k].n;const w=r===1?'sides':'corners';st.ask={o:nearby(n,3,8),ans:n,ok:'Yes! A '+k+' has '+n+' '+w+'.'};txt='How many *'+w+'* does this '+k+' have?';}
      else if(r===3){const k=pick(['pentagon','hexagon','triangle']);st.view='all';const others=SHN.filter(q=>q!==k);st.list=shuffle([{k,irr:true,rot:.5},{k,rot:1.2},{k,irr:true}].concat(shuffle(others).slice(0,5).map(q=>({k:q,rot:Math.random()})))).slice(0,8);
        if(!st.list.some(o=>o.k===k))st.list[0]={k};st.wantAll=k;txt='Find *every '+k+'* ('+SH[k].n+' sides). Some are bent or turned! Tap them all.';}
      else{const q=pick([['4 sides that are all the same length','square'],['3 sides and 3 corners','triangle'],['no sides and no corners','circle'],['6 sides and 6 corners','hexagon'],['4 sides: two long and two short','rectangle'],['5 sides and 5 corners','pentagon']]);
        st.view='all';st.list=shuffle(SHN).map(k=>({k}));st.want=o=>o.k===q[1];st.wantOk='Yes! A '+q[1]+' has '+q[0]+'.';txt='Tap the shape that has *'+q[0]+'*.';}
      draw();st.setup=false;return txt;}};}
});

/* =========================================================
   Unit 18 · More about Shapes: symmetry and fair parts
   ========================================================= */
/* pictures on tiles: some have a matching half on each side of a fold line */
const PICS=[{k:'heart',sym:1},{k:'star',sym:1},{k:'ball',sym:1},{k:'house',sym:1},{k:'A',sym:1},{k:'T',sym:1},{k:'butterfly',sym:1},{k:'R',sym:0},{k:'F',sym:0},{k:'G',sym:0},{k:'flag',sym:0},{k:'shoe',sym:0},{k:'cloud',sym:0},{k:'L',sym:0}];
function picDraw(g,k,s){const c=s/2;if(k.length===1){g.fillStyle='#5c6bc0';g.font='700 '+Math.round(s*.7)+'px "Zilla Slab", Georgia, serif';g.textAlign='center';g.textBaseline='middle';g.fillText(k,c,c+s*.04);return;}
  if(k==='heart')icon(g,'heart',c,c,s*.8);else if(k==='star')icon(g,'star',c,c,s*.8);else if(k==='ball')icon(g,'ball',c,c,s*.7,'#ef5350');
  else if(k==='house'){K.poly(g,[c-s*.3,c,c+s*.3,c,c+s*.3,c+s*.3,c-s*.3,c+s*.3],'#ffcc80','rgba(27,34,54,.5)');K.poly(g,[c-s*.38,c,c,c-s*.3,c+s*.38,c],'#e53935','rgba(27,34,54,.5)');rr(g,c-s*.07,c+s*.1,s*.14,s*.2,3);g.fillStyle='#6d4c41';g.fill();}
  else if(k==='butterfly'){[-1,1].forEach(q=>{K.ell(g,c+q*s*.17,c-s*.1,s*.16,s*.2,'#ab47bc');K.ell(g,c+q*s*.14,c+s*.16,s*.11,s*.13,'#ce93d8');});K.ell(g,c,c,s*.04,s*.26,INK);}
  else if(k==='flag'){g.fillStyle='#6d4c41';g.fillRect(c-s*.3,c-s*.35,s*.05,s*.7);K.poly(g,[c-s*.25,c-s*.35,c+s*.3,c-s*.2,c-s*.25,c-s*.05],'#e53935');}
  else if(k==='shoe'){K.poly(g,[c-s*.35,c-s*.1,c-s*.05,c-s*.1,c+s*.05,c+s*.05,c+s*.35,c+s*.1,c+s*.35,c+s*.2,c-s*.35,c+s*.2],'#42a5f5','rgba(27,34,54,.5)');}
  else if(k==='cloud'){[[-.18,.02,.16],[.02,-.08,.2],[.2,.06,.13],[-.02,.1,.14]].forEach(([a,b,r])=>K.ell(g,c+a*s,c+b*s,r*s,r*s,'#90caf9'));}}
function picTile(k,fold){const cv=document.createElement('canvas');cv.width=cv.height=200;const g=cv.getContext('2d');g.fillStyle='#ffffff';g.fillRect(0,0,200,200);g.strokeStyle='#c9cfdc';g.lineWidth=8;g.strokeRect(4,4,192,192);picDraw(g,k,200);
  if(fold){g.setLineDash([10,8]);g.strokeStyle='#e4572e';g.lineWidth=4;g.beginPath();g.moveTo(100,10);g.lineTo(100,190);g.stroke();}
  const t=new THREE.CanvasTexture(cv);const side=lam('#e2e8f0');const m=mk(new THREE.BoxGeometry(.9,.05,.9),[side,side,new THREE.MeshLambertMaterial({map:t}),side,side,side],20);m.userData.pic=k;return m;}
/* a whole cut into parts: square, circle (pizza) or rectangle */
function partsGeo(kind,n,i,eq){if(kind==='circle'){const a0=i*Math.PI*2/n,a1=(i+1)*Math.PI*2/n;return wedgeGeo(.9,.08,a0,a1-.03);}
  const w=kind==='rect'?2.2:1.6,h=kind==='rect'?1.2:1.6;let x0,x1;if(eq){x0=-w/2+i*w/n;x1=x0+w/n;}else{const cs=n===2?[0,.68,1]:[0,.2,.55,1];x0=-w/2+cs[i]*w;x1=-w/2+cs[i+1]*w;}
  const g=new THREE.BoxGeometry(x1-x0-.03,.08,h);g.translate((x0+x1)/2,0,0);return g;}
P.lesson({id:'shapes2',title:'Symmetry and fair shares',strand:'Spatial Sense',codes:['E1.3','B1.6','B1.7'],
 guide:{goal:'Find shapes in designs, tell whether a picture is symmetrical (both halves match when folded), and name equal parts of a whole: halves, thirds and fourths.',words:'symmetrical, line of symmetry, fold, match, equal parts, half, halves, third, fourth, quarter, whole',
  ask:['If you fold a heart down the middle, do the halves match?','Is it a half if the two parts are not the same size?','How many fourths make a whole?'],home:'Fold a paper napkin in half, then in half again. Unfold it: how many equal parts? Each part is one fourth!'},
 learn:[{say:'Fold and match.',speech:'Fold the heart down the middle. The two halves match. The heart is symmetrical!',view:'model',demo:'fold'}],
 fig:'Pictures to fold, and wholes cut into equal parts.',rz:.45,
 explore:['Press *Fold* to check pictures.','Press *Halves*, *Thirds* or *Fourths*.','*Tap* a part to colour it.'],
 howTo:'Tap the symmetrical pictures, tap a part to colour it, or tap the answer.',
 init:k=>({view:'sym',pics:['heart','R','house','cloud'],fold:false,lit:[],kind:'square',n:2,eq:true,col:[],ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=tbox(p,y-10,250,'Symmetry: halves that match');
  ['heart','butterfly','house','R'].forEach((k,i)=>{const x=X0+40+i*190;g.save();g.translate(x,y);rr(g,0,0,140,140,10);g.fillStyle='#fff';g.fill();picDraw(g,k,140);g.setLineDash([7,6]);g.strokeStyle='#e4572e';g.lineWidth=3;g.beginPath();g.moveTo(70,4);g.lineTo(70,136);g.stroke();g.restore();
    T(g,i<3?'✓ symmetrical':'✗ not',x+70,y+170,FT.smallB,i<3?'#16a36f':'#e4572e','center');});y+=200;
  y=tbox(p,y,280,'Equal parts');
  [['circle',2,'one half'],['square',3,'one third'],['square',4,'one fourth']].forEach(([k,n,t],i)=>{const x=X0+110+i*270,yy=y+60;
    if(k==='circle'){g.beginPath();g.arc(x,yy,56,Math.PI/2,Math.PI*1.5);g.lineTo(x,yy);g.fillStyle='#ffb74d';g.fill();g.beginPath();g.arc(x,yy,56,0,7);g.strokeStyle=INK;g.lineWidth=2;g.stroke();g.beginPath();g.moveTo(x,yy-56);g.lineTo(x,yy+56);g.stroke();}
    else{for(let j=0;j<n;j++){const w=112/n;g.fillStyle=j===0?'#ffb74d':'#fff';g.fillRect(x-56+j*w,yy-56,w,112);g.strokeStyle=INK;g.lineWidth=2;g.strokeRect(x-56+j*w,yy-56,w,112);}}
    T(g,t,x,yy+96,FT.bodyB,acc(),'center');T(g,n+' equal parts',x,yy+130,FT.small,GREY,'center');});y+=220;
  y=exGrid(p,y,2,150,(i,x,yy,w,h)=>{
    if(i===0){T(g,'Not fair!',x+56,yy+34,FT.smallB);g.fillStyle='#ffb74d';g.fillRect(x+40,yy+56,110,80);g.fillStyle='#fff';g.fillRect(x+150,yy+56,50,80);g.strokeStyle=INK;g.lineWidth=2;g.strokeRect(x+40,yy+56,160,80);g.beginPath();g.moveTo(x+150,yy+56);g.lineTo(x+150,yy+136);g.stroke();wrap(g,'Parts are not equal: this is *not* a half.',x+220,yy+80,w-240,30,{font:FT.small,bold:FT.smallB,boldColor:'#e4572e'});}
    if(i===1){T(g,'Shapes in a design',x+56,yy+34,FT.smallB);[0,1,2].forEach(j=>{shape2d(g,'hexagon',x+70+j*90,yy+96,30,'#80cbc4');shape2d(g,'circle',x+70+j*90,yy+96,12,'#fff');});hand(g,'hexagons, circles',x+56,yy+146,INK);}
  });
  y=keyWords(p,y,[['symmetrical','both halves match when you fold it'],['fourth','one of 4 equal parts (also called a quarter)']]);return y;},
 readout(p,S,y){const g=p.g,st=S.st;let s='';if(st.view==='parts'){const nm2={2:'halves',3:'thirds',4:'fourths'}[st.n];s=st.eq?st.n+' equal parts: '+nm2:'parts that are not equal';if(st.col.length)s+='  ·  '+st.col.length+' coloured';}if(s)T(g,s,X0,y+54,ZS(40),acc());return y+70;},
 build(S,grp,mode,game){const st=S.st;const g2=K.stage(grp);
  function draw(){clearGroup(g2);
    if(st.view==='sym'){st.pics.forEach((k,i)=>{const t=picTile(k,st.fold);t.position.set((i%4-(Math.min(4,st.pics.length)-1)/2)*1.05,.03,-2.3+Math.floor(i/4)*1.05);g2.add(t);K.tapOn(t,()=>tapPic(i));
      if(st.lit.includes(i)){const r=mk(new THREE.BoxGeometry(1.0,.02,1.0),lam('#a5d6a7'),0);r.position.copy(t.position);r.position.y=.005;g2.add(r);}
      if(st.fold&&st.showRes){const sym=PICS.find(q=>q.k===k).sym;const L=tag(sym?'✓':'✗',{size:.28,color:sym?'#16a36f':'#e4572e'});L.position.set(t.position.x,.5,t.position.z-.35);g2.add(L);}});}
    else{const z=-1.9;for(let i=0;i<st.n;i++){const m=new THREE.Mesh(partsGeo(st.kind,st.n,i,st.eq),new THREE.MeshLambertMaterial({color:st.col.includes(i)?'#ffb74d':st.kind==='circle'?'#ffe0b2':'#ffffff'}));m.castShadow=true;m.receiveShadow=true;P.ink(m,20);
        m.position.set(0,.04,z);g2.add(m);K.tapOn(m,()=>tapPart(i));if(st.kind==='circle'&&!st.col.includes(i)){[...Array(3)].forEach((_,j)=>{const a=(i+.5)*Math.PI*2/st.n+(j-1)*.3,r=.35+j*.15;const pe=sph(.06,'#e53935');pe.scale.y=.3;pe.position.set(Math.cos(a)*r,.1,z-Math.sin(a)*r);g2.add(pe);});}}}
    A.redraw();}
  function tapPic(i){A.pop();A.say(st.pics[i]);if(mode==='play'&&!st.setup&&st.wantSym){const sym=PICS.find(q=>q.k===st.pics[i]).sym;if(sym){if(!st.lit.includes(i)){st.lit.push(i);draw();}const need=st.pics.filter(k=>PICS.find(q=>q.k===k).sym).length;if(st.lit.length===need)game.solved('Yes! You found every symmetrical picture.');}else A.bad('Fold it in your mind: do both halves match?');}}
  function tapPart(i){A.pop();const k=st.col.indexOf(i);if(k>=0)st.col.splice(k,1);else st.col.push(i);draw();if(mode==='play'&&!st.setup&&st.needCol!=null&&st.col.length===st.needCol)A.later(()=>game.solved(st.okCol),300);}
  function fold(){st.view='sym';st.fold=true;st.showRes=false;draw();A.seq([[700,()=>{st.showRes=true;draw();}]]);}
  draw();
  return {info:()=>st.view+st.n+st.col.join()+(st.fold?'f':''),
    controls:()=>{const c=[{t:'Fold',fn:()=>{st.pics=shuffle(PICS).slice(0,4).map(q=>q.k);st.lit=[];fold();}},{t:'Halves',fn:()=>{st.view='parts';st.n=2;st.eq=true;st.col=[];st.kind=pick(['square','circle','rect']);draw();}},{t:'Thirds',fn:()=>{st.view='parts';st.n=3;st.eq=true;st.col=[];st.kind=pick(['circle','rect']);draw();}},{t:'Fourths',go:true,fn:()=>{st.view='parts';st.n=4;st.eq=true;st.col=[];st.kind=pick(['square','circle','rect']);draw();}}];
      if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);return c;},
    demo(n){st.ask=null;st.wantSym=false;st.needCol=null;
      if(n==='fold'){st.pics=['heart','R','house','cloud'];st.lit=[];fold();}if(n==='folded'){st.view='sym';st.pics=['heart','R','house','cloud'];st.lit=[];st.fold=true;st.showRes=true;draw();}
      if(n==='half'){st.view='parts';st.kind='circle';st.n=2;st.eq=true;st.col=[0];draw();}if(n==='third'){st.view='parts';st.kind='rect';st.n=3;st.eq=true;st.col=[0];draw();}
      if(n==='fourth'){st.view='parts';st.kind='square';st.n=4;st.eq=true;st.col=[0];draw();}if(n==='unfair'){st.view='parts';st.kind='rect';st.n=2;st.eq=false;st.col=[0];draw();}},
    task(r){st.setup=true;st.ask=null;st.wantSym=false;st.needCol=null;st.col=[];st.lit=[];let txt;
      if(r===0){const sy=shuffle(PICS.filter(q=>q.sym)).slice(0,rnd(2,3)),no=shuffle(PICS.filter(q=>!q.sym)).slice(0,6-sy.length);st.view='sym';st.fold=false;st.showRes=false;st.pics=shuffle(sy.concat(no)).map(q=>q.k).slice(0,6);st.wantSym=true;txt='Tap *every symmetrical* picture (both halves match when folded).';}
      else if(r===1){const n=pick([2,3,4]);st.view='parts';st.n=n;st.eq=true;st.kind=n===3?pick(['circle','rect']):pick(['square','circle','rect']);st.needCol=1;st.okCol='Yes! One '+{2:'half',3:'third',4:'fourth'}[n]+' is coloured.';txt='Colour *one '+{2:'half',3:'third',4:'fourth'}[n]+'*: tap one part.';}
      else if(r===2){const n=pick([2,3,4]);st.view='parts';st.n=n;st.eq=true;st.kind=n===3?'circle':pick(['square','circle']);st.col=[0];const W={2:'one half',3:'one third',4:'one fourth'};st.ask={o:shuffle(Object.values(W)),ans:W[n],ok:'Yes! '+W[n]+' is coloured.'};txt='How much is coloured?';}
      else if(r===3){const eq=pick([true,false]);st.view='parts';st.n=2;st.eq=eq;st.kind='rect';st.col=[0];st.ask={o:['yes','no'],ans:eq?'yes':'no',ok:eq?'Yes! The two parts are equal, so each is one half.':'Right! The parts are not equal, so it is not one half.'};txt='Is the coloured part *one half*? (Are the parts equal?)';}
      else{st.view='parts';st.n=4;st.eq=true;st.kind=pick(['circle','square']);st.needCol=2;st.okCol='Yes! Two fourths is the same as one half!';txt='Colour *two fourths*. Tap two parts.';}
      draw();st.setup=false;return txt;}};}
});

/* =========================================================
   Unit 19 · 3-D Solids
   ========================================================= */
const SO={sphere:{c:'#ef5350',roll:1,slide:0,face:null},cube:{c:'#42a5f5',roll:0,slide:1,face:'square'},cylinder:{c:'#66bb6a',roll:1,slide:1,face:'circle'},cone:{c:'#ffb300',roll:1,slide:1,face:'circle'},prism:{c:'#ab47bc',roll:0,slide:1,face:'rectangle'},pyramid:{c:'#ff7043',roll:0,slide:1,face:'square'}};
const SON=['sphere','cube','cylinder','cone','prism'];
function solid(k,s){s=s||1;let geo,y;if(k==='sphere'){geo=G('so_s',()=>new THREE.SphereGeometry(.3,26,18));y=.3;}else if(k==='cube'){geo=G('so_c',()=>new THREE.BoxGeometry(.52,.52,.52));y=.26;}else if(k==='cylinder'){geo=G('so_y',()=>new THREE.CylinderGeometry(.26,.26,.56,30));y=.28;}
  else if(k==='cone'){geo=G('so_k',()=>new THREE.ConeGeometry(.3,.62,30));y=.31;}else if(k==='prism'){geo=G('so_p',()=>new THREE.BoxGeometry(.8,.4,.42));y=.2;}else{geo=G('so_t',()=>new THREE.ConeGeometry(.38,.56,4));y=.28;}
  const m=mk(geo,lam(SO[k].c),k==='sphere'||k==='cylinder'||k==='cone'?0:20);m.position.y=y*s;m.scale.setScalar(s);const g=new THREE.Group();g.add(m);g.userData.solid=k;return g;}
const THINGS=[{t:'ice cream cone',s:'cone',k:'cone'},{t:'globe',s:'sphere',k:'ball'},{t:'drum',s:'cylinder',k:'drum'},{t:'number cube',s:'cube',k:'die'},{t:'cereal box',s:'prism',k:'box'},{t:'party hat',s:'cone',k:'hat'},{t:'can of soup',s:'cylinder',k:'can'},{t:'orange',s:'sphere',k:'orange'},{t:'book',s:'prism',k:'book'},{t:'ice cube',s:'cube',k:'ice'}];
function thing(k){const g=new THREE.Group();if(k==='cone'){const c=K.cone(.2,.5,'#d7a15e',20);c.rotation.x=Math.PI;c.position.y=.25;g.add(c);const s=sph(.21,'#f8bbd0');s.position.y=.55;g.add(s);}
  else if(k==='ball'){const s=sph(.32,'#42a5f5');s.position.y=.42;g.add(s);const b=cyl(.03,.12,.12,'#8d6e63',10);b.position.y=.06;g.add(b);}else if(k==='orange'){const s=sph(.28,'#fb8c00');s.position.y=.28;g.add(s);}
  else if(k==='drum'||k==='can'){const c=cyl(.28,.28,k==='drum'?.4:.5,k==='drum'?'#e53935':'#90a4ae',28);c.position.y=k==='drum'?.2:.25;g.add(c);const t=cyl(.29,.29,.04,k==='drum'?'#fff8e1':'#ef5350',28);t.position.y=k==='drum'?.41:.36;g.add(t);}
  else if(k==='die'||k==='ice'){const c=bx(.46,.46,.46,k==='die'?'#ffffff':'#e1f5fe');c.position.y=.23;g.add(c);if(k==='die')[[0,.47,0],[.1,.47,.1],[-.1,.47,-.1]].forEach(([x,y,z])=>{const d=sph(.035,INK);d.position.set(x,y,z);g.add(d);});}
  else if(k==='box'||k==='book'){const c=bx(k==='box'?.5:.7,k==='box'?.7:.12,k==='box'?.22:.5,k==='box'?'#ffca28':'#5c6bc0');c.position.y=k==='box'?.35:.06;g.add(c);}
  else if(k==='hat'){const c=K.cone(.24,.55,'#ab47bc',20);c.position.y=.28;g.add(c);const p=sph(.06,'#ffeb3b');p.position.y=.58;g.add(p);}return g;}
P.lesson({id:'solids',title:'3-D solids',strand:'Spatial Sense',codes:['E1.1','E1.2'],
 guide:{goal:'Name spheres, cubes, cylinders, cones and prisms, find them in everyday objects, name their flat faces, and tell which solids roll, slide or stack.',words:'solid, sphere, cube, cylinder, cone, prism, face, flat, curved, roll, slide, stack',
  ask:['What shape is the face of a cylinder?','Why can a ball roll but a box cannot?','Which solid can roll and slide?'],home:'Find a can, a box and a ball. Which ones roll? Which ones slide? Which ones stack?'},
 learn:[{say:'Roll or slide?',speech:'Give each solid a push. The sphere rolls. The cube slides. The cylinder can roll on its side, or slide on its flat face!',view:'model',demo:'push'}],
 fig:'Solids, everyday things, and faces traced on paper.',rz:.45,
 explore:['*Tap* a solid to hear its name.','Press *Push* to see which roll and which slide.','Press *Things* to match objects to solids.'],
 howTo:'Tap the solid the question asks for, or tap the answer.',
 init:k=>({view:'all',sel:null,pushed:false,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=tbox(p,y-10,280,'Solids');
  const cx=X0+100;const draw3=(k,x,yy)=>{g.save();g.lineWidth=3;g.strokeStyle='rgba(27,34,54,.6)';g.fillStyle=SO[k].c;
    if(k==='sphere'){g.beginPath();g.arc(x,yy,44,0,7);g.fill();g.stroke();g.fillStyle='rgba(255,255,255,.35)';g.beginPath();g.arc(x-14,yy-14,12,0,7);g.fill();}
    if(k==='cube'){K.poly(g,[x-36,yy-20,x+24,yy-20,x+24,yy+40,x-36,yy+40],SO.cube.c,'rgba(27,34,54,.6)');K.poly(g,[x-36,yy-20,x-20,yy-38,x+40,yy-38,x+24,yy-20],'#90caf9','rgba(27,34,54,.6)');K.poly(g,[x+24,yy-20,x+40,yy-38,x+40,yy+22,x+24,yy+40],'#1e88e5','rgba(27,34,54,.6)');}
    if(k==='cylinder'){g.fillRect(x-34,yy-30,68,64);K.ell(g,x,yy+34,34,12,SO.cylinder.c);K.ell(g,x,yy-30,34,12,'#a5d6a7');g.strokeRect(x-34,yy-30,0,64);g.beginPath();g.moveTo(x+34,yy-30);g.lineTo(x+34,yy+34);g.stroke();}
    if(k==='cone'){K.poly(g,[x,yy-44,x+36,yy+30,x-36,yy+30],SO.cone.c,'rgba(27,34,54,.6)');K.ell(g,x,yy+30,36,11,'#ffd54f');}
    if(k==='prism'){K.poly(g,[x-50,yy-10,x+30,yy-10,x+30,yy+36,x-50,yy+36],SO.prism.c,'rgba(27,34,54,.6)');K.poly(g,[x-50,yy-10,x-34,yy-28,x+46,yy-28,x+30,yy-10],'#ce93d8','rgba(27,34,54,.6)');K.poly(g,[x+30,yy-10,x+46,yy-28,x+46,yy+18,x+30,yy+36],'#8e24aa','rgba(27,34,54,.6)');}
    g.restore();};
  SON.forEach((k,i)=>{const x=cx+i*165;draw3(k,x,y+60);T(g,k,x,y+140,FT.bodyB,INK,'center');T(g,['rolls','stacks, slides','rolls, slides','rolls, slides','stacks, slides'][i],x,y+176,FT.small,GREY,'center');});y+=220;
  y=tbox(p,y,230,'Faces: trace a flat face');
  [['cube','square'],['cylinder','circle'],['prism','rectangle'],['cone','circle']].forEach(([k,f],i)=>{const x=X0+90+i*200;g.save();g.translate(0,0);g.scale(1,1);g.restore();
    shape2d(g,f,x,y+56,f==='rectangle'?28:34,'#ffffff',false,{dash:true,stroke:'#e4572e'});T(g,k+' → '+f,x,y+130,FT.smallB,INK,'center');});y+=170;
  y=exGrid(p,y,2,160,(i,x,yy,w,h)=>{
    if(i===0){T(g,'Looks like a…',x+56,yy+34,FT.smallB);K.poly(g,[x+60,yy+80,x+120,yy+80,x+90,yy+140],'#d7a15e','rgba(27,34,54,.5)');K.ell(g,x+90,yy+70,32,24,'#f8bbd0');hand(g,'cone!',x+160,yy+110,acc());}
    if(i===1){wrap(g,'A bottle looks like a *cylinder*, but it gets thinner at the top.',x+56,yy+44,w-80,30,{font:FT.small,bold:FT.smallB,boldColor:acc()});}
  });
  y=keyWords(p,y,[['face','a flat surface of a solid'],['roll / slide','curved surfaces roll; flat faces slide']]);return y;},
 readout(p,S,y){const g=p.g,st=S.st;let s='';if(st.sel)s=st.sel+(SO[st.sel]&&SO[st.sel].face?'  ·  face: '+SO[st.sel].face:'');if(st.view==='things'&&st.thing!=null)s=THINGS[st.thing].t;if(s)T(g,s,X0,y+54,ZS(40),acc());return y+70;},
 build(S,grp,mode,game){const st=S.st;const g2=K.stage(grp);let items=[];
  function draw(){clearGroup(g2);items=[];
    if(st.view==='all'||st.view==='push'){const list=st.list||SON;const n=list.length;const ramp=st.view==='push';if(ramp){const r=bx(4.4,.04,1.6,'#dcedc8');r.position.set(0,.02,-1.9);g2.add(r);}
      list.forEach((k,i)=>{const o=solid(k,1.2);o.position.set((i-(n-1)/2)*.95,0,ramp?-2.4:-1.9);if(k==='cylinder'&&st.side)o.children[0].rotation.x=Math.PI/2,o.children[0].position.y=.31;g2.add(o);items.push(o);K.tapOn(o,()=>tap(k,i));
        if(st.lit&&st.lit.includes(i)){const r=mk(G('k_ring2',()=>new THREE.TorusGeometry(.48,.03,8,36)),lam('#16a36f'),0);r.rotation.x=Math.PI/2;r.position.copy(o.position);r.position.y=.04;g2.add(r);}
        if(st.pushed){const how=k==='sphere'?'rolls':k==='cube'||k==='prism'?'slides':'rolls + slides';const L=tag(how,{size:.18});L.position.set(0,1.0,0);o.add(L);}});}
    if(st.view==='things'){const t=thing(THINGS[st.thing].k);t.scale.setScalar(1.6);t.position.set(-1.2,0,-1.9);g2.add(t);const L=tag(THINGS[st.thing].t,{size:.24});L.position.set(-1.2,1.5,-1.9);g2.add(L);
      if(st.showS){const o=solid(THINGS[st.thing].s,1.4);o.position.set(1.2,0,-1.9);g2.add(o);const L2=tag(THINGS[st.thing].s,{size:.24});L2.position.set(1.2,1.3,-1.9);g2.add(L2);}}
    if(st.view==='trace'){const paper=bx(2.0,.02,1.6,'#ffffff');paper.position.set(.9,.01,-1.9);g2.add(paper);const k=st.trc;const o=solid(k,1.3);o.position.set(-1.3,0,-1.9);g2.add(o);
      if(st.traced){const f=SO[k].face;const m=shape3(f,.4,'#ffffff');m.scale.y=.1;m.position.set(.9,.02,-1.9);g2.add(m);const e=mk(new THREE.RingGeometry(.0,.01,4),lam('#000'),0);g2.add(e);
        const outline=f==='circle'?new THREE.EdgesGeometry(new THREE.CircleGeometry(.4,40)):new THREE.EdgesGeometry(new THREE.ShapeGeometry((()=>{const s=new THREE.Shape();const p=pts(f,.4);s.moveTo(p[0][0],p[0][1]);p.slice(1).forEach(q=>s.lineTo(q[0],q[1]));return s;})()));
        const l=new THREE.LineSegments(outline,new THREE.LineBasicMaterial({color:'#e4572e'}));l.rotation.x=-Math.PI/2;l.position.set(.9,.04,-1.9);g2.add(l);}}
    A.redraw();}
  function tap(k,i){A.pop();st.sel=k;A.say(k);if(mode==='play'&&!st.setup){if(st.wantAll){const ok=st.wantAll(k);if(ok){if(!st.lit.includes(i)){st.lit.push(i);draw();}if(st.lit.length===st.list.filter(st.wantAll).length)game.solved(st.okAll);}else A.bad(st.hintAll);return;}
      if(st.want){if(st.want(k))game.solved(st.wantOk);else A.bad('Look at its faces: flat or curved?');}}A.redraw();}
  function push(){st.view='push';st.list=SON;st.pushed=false;st.lit=[];draw();A.seq([[400,()=>{items.forEach((o,i)=>{const k=SON[i];const d=k==='sphere'?1.1:k==='cube'||k==='prism'?.45:.8;if(k==='sphere'||k==='cylinder'||k==='cone')tween(.9,q=>{o.position.z=-2.4+d*q;o.rotation.x=d*q*3;});else tween(.9,q=>{o.position.z=-2.4+d*q;});});}],[1100,()=>{st.pushed=true;draw();}]]);}
  draw();
  return {info:()=>st.view+(st.sel||'')+(st.thing||'')+(st.traced?'t':''),
    controls:()=>{const c=[{t:'Solids',fn:()=>{st.view='all';st.list=null;st.lit=null;st.pushed=false;draw();}},{t:'Push',go:true,fn:push},{t:'Things',fn:()=>{st.view='things';st.thing=rnd(0,THINGS.length-1);st.showS=true;draw();}},{t:'Trace',fn:()=>{st.view='trace';st.trc=pick(['cube','cylinder','prism','cone']);st.traced=false;draw();A.later(()=>{st.traced=true;draw();},700);}}];
      if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);return c;},
    demo(n){st.ask=null;st.want=null;st.wantAll=null;st.sel=null;
      if(n==='all'){st.view='all';st.list=null;st.lit=null;st.pushed=false;draw();}if(n==='push')push();if(n==='pushed'){st.view='push';st.list=SON;st.pushed=true;st.lit=[];draw();}
      if(n==='cone'){st.view='things';st.thing=0;st.showS=true;draw();}if(n==='can'){st.view='things';st.thing=6;st.showS=true;draw();}
      if(n==='trace'){st.view='trace';st.trc='cube';st.traced=true;draw();}if(n==='tracecyl'){st.view='trace';st.trc='cylinder';st.traced=true;draw();}},
    task(r){st.setup=true;st.ask=null;st.want=null;st.wantAll=null;st.lit=[];st.pushed=false;st.sel=null;let txt;
      if(r===0){const k=pick(SON);st.view='all';st.list=shuffle(SON);st.want=q=>q===k;st.wantOk='Yes! That is the '+k+'.';txt='Tap the *'+k+'*.';}
      else if(r===1){st.view='things';st.thing=rnd(0,THINGS.length-1);st.showS=false;const s=THINGS[st.thing].s;st.ask={o:shuffle(shuffle(SON.filter(q=>q!==s)).slice(0,2).concat([s])),ans:s,ok:'Yes! A '+THINGS[st.thing].t+' looks like a '+s+'.'};txt='What solid does the *'+THINGS[st.thing].t+'* look like?';}
      else if(r===2){st.view='trace';st.trc=pick(['cube','cylinder','prism','cone']);st.traced=true;const f=SO[st.trc].face;st.ask={o:['circle','square','rectangle','triangle'],ans:f,ok:'Yes! The flat face of a '+st.trc+' is a '+f+'.'};txt='We traced the flat face of the *'+st.trc+'*. What shape did we draw?';}
      else if(r===3){st.view='all';st.list=shuffle(SON);st.wantAll=k=>SO[k].roll&&SO[k].slide;st.okAll='Yes! The cylinder and the cone can roll and slide.';st.hintAll='That one cannot do both.';txt='Tap *every* solid that can *roll and slide*.';}
      else{const q=pick([['roll only, with no flat faces',k=>k==='sphere'],['slide but not roll',k=>!SO[k].roll]]);st.view='all';st.list=shuffle(SON);st.wantAll=q[1];st.okAll='Yes!';st.hintAll='Think: flat faces slide, curved faces roll.';txt='Tap every solid that can *'+q[0]+'*.';}
      draw();st.setup=false;return txt;}};}
});

/* =========================================================
   Unit 20 · Directions (1): in front of, behind, left, right
   ========================================================= */
const KIDS=['duck','turtle','ladybug','ball','car','fish','kite','acorn'];
P.lesson({id:'where1',title:'In front of, behind, left, right',strand:'Spatial Sense',codes:['E1.4','E1.5'],
 guide:{goal:'Use the words in front of, behind, left and right to describe where things are, and follow clues to place things.',words:'in front of, behind, left, right, beside, between, first, last',
  ask:['Who is in front of you in the line?','Which hand do you wave with? Is it your left or your right?','What is on your left right now?'],home:'Play "Where is it?": place a toy in front of, behind, to the left of or to the right of a cup, and describe it.'},
 learn:[{say:'Run to the finish!',speech:'The racers run to the finish line. The duck is in front of the turtle. The turtle is behind the duck.',view:'model',demo:'race'}],
 fig:'A race to the finish line, and things to the left and right.',rz:.45,
 explore:['*Tap* a racer to hear its name.','Press *Left and right* to see sides.','Press *New race* to mix them up.'],
 howTo:'Read the question and tap the right racer or the right answer. The finish line is the front.',
 init:k=>({view:'race',line:KIDS.slice(0,6),ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=tbox(p,y-10,250,'In front of and behind');
  g.fillStyle='#e0e0e0';g.fillRect(X0+40,y+20,10,110);T(g,'FINISH',X0+20,y+10,FT.smallB,'#e4572e');['duck','turtle','ladybug','car'].forEach((k,i)=>icon(g,k,X0+110+i*130,y+76,72));
  hand(g,'The duck is in front of the turtle.',X0+40,y+156,INK);hand(g,'The car is behind the ladybug.',X0+430,y+156,INK);y+=190;
  y=tbox(p,y,250,'Left and right');
  icon(g,'apple',X0+90,y+40,70);icon(g,'mitten',X0+260,y+40,70);icon(g,'ball',X0+430,y+40,70);T(g,'left',X0+70,y+110,FT.bodyB,'#16a36f');T(g,'right',X0+410,y+110,FT.bodyB,'#e4572e');
  wrap(g,'The apple is on the *left* of the mitten. The ball is on the *right* of the mitten.',X0+520,y+10,TW-530,32,{font:FT.small,bold:FT.smallB,boldColor:acc()});
  T(g,'Tip: your left hand makes an L!',X0+40,y+164,FT.hand,INK);y+=190;
  y=exGrid(p,y,2,150,(i,x,yy,w,h)=>{
    if(i===0){T(g,'How many are behind the duck?',x+56,yy+34,FT.smallB);['kite','duck','fish','acorn'].forEach((k,j)=>icon(g,k,x+60+j*80,yy+90,56));hand(g,'2',x+56,yy+140,acc());}
    if(i===1){wrap(g,'Clue: The bell is on the right of the star. Where is the star?',x+56,yy+44,w-80,30,{font:FT.small,bold:FT.smallB});hand(g,'on the left of the bell',x+56,yy+130,acc());}
  });
  y=keyWords(p,y,[['in front of','closer to the front, or the finish'],['behind','at the back of something']]);return y;},
 readout(p,S,y){const g=p.g,st=S.st;if(st.sel!=null)T(g,st.line[st.sel]+' is '+K.ORD[st.sel+1],X0,y+54,ZS(40),acc());return y+70;},
 build(S,grp,mode,game){const st=S.st;const g2=K.stage(grp);let items=[];
  function draw(){clearGroup(g2);items=[];
    if(st.view==='race'){const fl=bx(.06,.6,1.5,'#ffffff');fl.position.set(-2.1,.3,-1.9);g2.add(fl);for(let i=0;i<5;i++){const c=bx(.065,.12,.3,i%2?INK:'#ffffff',0);c.position.set(-2.1,.62,-2.5+i*.3);g2.add(c);}
      const L=tag('FINISH',{size:.2,color:'#e4572e'});L.position.set(-2.1,1.0,-1.9);g2.add(L);const gap=Math.min(.7,3.7/(st.line.length));
      st.line.forEach((k,i)=>{const t=toy(k,{s:1.25});t.position.set(-1.6+i*gap,0,-1.9);t.rotation.y=k==='car'||k==='fish'||k==='duck'?Math.PI:Math.PI/2;g2.add(t);items.push(t);K.tapOn(t,()=>tap(i));const N=tag(k,{size:.16});N.position.y=.62;t.add(N);});}
    if(st.view==='lr'){const mid=toy(st.mid,{s:1.6});mid.position.set(0,0,-1.9);g2.add(mid);[[-1.3,st.L,'left'],[1.3,st.R,'right']].forEach(([x,k,w],i)=>{const t=toy(k,{s:1.5});t.position.set(x,0,-1.9);g2.add(t);items.push(t);K.tapOn(t,()=>tapLR(i));
      if(st.showLR){const L=tag(w,{size:.22,color:i?'#e4572e':'#16a36f'});L.position.set(x,.95,-1.9);g2.add(L);}});const lbl=tag(st.mid,{size:.18});lbl.position.set(0,.85,-1.9);g2.add(lbl);}
    A.redraw();}
  function tap(i){A.pop();st.sel=i;A.say(st.line[i]);A.redraw();if(mode==='play'&&!st.setup&&st.want){if(st.want(i))game.solved(st.wantOk);else A.bad('The finish line is the front. Look again!');}}
  function tapLR(i){A.pop();A.say(i?st.R:st.L);if(mode==='play'&&!st.setup&&st.wantLR!=null){if(i===st.wantLR)game.solved(st.okLR);else A.bad('Left is the side of your left hand.');}}
  draw();
  return {info:()=>st.view+st.line.join()+(st.sel==null?'':st.sel),
    controls:()=>{const c=[{t:'New race',fn:()=>{st.view='race';st.line=shuffle(KIDS).slice(0,rnd(5,7));st.sel=null;draw();}},{t:'Left and right',go:true,fn:()=>{st.view='lr';const s=shuffle(KIDS);st.mid=s[0];st.L=s[1];st.R=s[2];st.showLR=true;draw();}}];
      if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);return c;},
    demo(n){st.ask=null;st.want=null;st.wantLR=null;
      if(n==='race'){st.view='race';st.line=['duck','turtle','ladybug','car','fish'];st.sel=null;draw();}
      if(n==='lr'){st.view='lr';st.mid='mitten';st.L='apple';st.R='ball';st.showLR=true;draw();}if(n==='lr0'){st.view='lr';st.mid='mitten';st.L='apple';st.R='ball';st.showLR=false;draw();}},
    task(r){st.setup=true;st.ask=null;st.want=null;st.wantLR=null;st.sel=null;let txt;
      if(r<=1){st.view='race';st.line=shuffle(KIDS).slice(0,6);const k=rnd(1,4);const who=st.line[k];const front=r===0;const t=front?k-1:k+1;st.want=i=>i===t;st.wantOk='Yes! The '+st.line[t]+' is '+(front?'in front of':'behind')+' the '+who+'.';txt='Tap the racer right *'+(front?'in front of':'behind')+'* the *'+who+'*.';}
      else if(r===2){st.view='race';st.line=shuffle(KIDS).slice(0,6);const k=rnd(1,4);const who=st.line[k];const front=pick([true,false]);const ans=front?k:5-k;st.ask={o:nearby(ans,0,5),ans,ok:'Yes! '+ans+' '+(front?'in front of':'behind')+' the '+who+'.'};txt='How many racers are *'+(front?'in front of':'behind')+'* the *'+who+'*?';}
      else if(r===3){st.view='lr';const s=shuffle(KIDS);st.mid=s[0];st.L=s[1];st.R=s[2];st.showLR=false;const side=rnd(0,1);st.wantLR=side;st.okLR='Yes! The '+(side?st.R:st.L)+' is on the '+(side?'right':'left')+' of the '+st.mid+'.';txt='Tap the toy on the *'+(side?'right':'left')+'* of the *'+st.mid+'*.';}
      else{st.view='lr';const s=shuffle(KIDS);st.mid=s[0];st.L=s[1];st.R=s[2];st.showLR=false;st.ask={o:['left','right'],ans:'left',ok:'Yes! The '+st.L+' is on the left of the '+st.mid+'.'};txt='Is the *'+st.L+'* on the left or the right of the '+st.mid+'?';}
      draw();st.setup=false;return txt;}};}
});

/* =========================================================
   Unit 21 · Directions (2): inside, outside, over, under
   ========================================================= */
const SPOT={inside:V(.65,.06,-1.75),outside:V(1.75,0,-1.2),over:V(-.6,1.55,-1.9),under:V(-.6,0,-1.9),on:V(-.95,.82,-1.9)};
P.lesson({id:'where2',title:'Inside, outside, over, under',strand:'Spatial Sense',codes:['E1.4','E1.5'],
 guide:{goal:'Use the words inside, outside, over, under and on to describe where things are, and place things to match a description.',words:'inside, outside, over, under, on, above, below',
  ask:['What is inside your backpack?','What is over your head right now?','What could hide under a table?'],home:'Play hide-and-seek with a toy. Give clues: "It is under something soft, inside the bedroom."'},
 learn:[{say:'Where is the duck?',speech:'Watch the duck move. Now it is under the table. Now it is over the table. Now it is inside the box!',view:'model',demo:'tour'}],
 fig:'A table and a box: places to go inside, outside, over and under.',rz:.45,
 explore:['Press a place word to move the toy.','*Tap* a thing to hear where it is.','Press *New* for another toy.'],
 howTo:'Read the sentence. Tap the right thing, or press the place word that matches.',
 init:k=>({toy:'duck',at:'under',others:null,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=tbox(p,y-10,300,'Where is it?');
  const table=(x,yy)=>{g.fillStyle='#a1887f';g.fillRect(x,yy,200,14);g.fillRect(x+10,yy+14,10,90);g.fillRect(x+180,yy+14,10,90);};const box=(x,yy)=>{g.fillStyle='#ffcc80';g.fillRect(x,yy,110,70);g.strokeStyle='rgba(27,34,54,.5)';g.lineWidth=2;g.strokeRect(x,yy,110,70);};
  table(X0+40,y+40);icon(g,'ball',X0+140,y+124,46);icon(g,'balloon',X0+140,y-6,50);T(g,'over',X0+200,y+4,FT.bodyB,'#2f7de1');T(g,'under',X0+200,y+138,FT.bodyB,'#e4572e');
  box(X0+380,y+70);icon(g,'kite',X0+435,y+96,48);icon(g,'duck',X0+560,y+110,56);T(g,'inside',X0+400,y+176,FT.bodyB,'#16a36f');T(g,'outside',X0+530,y+176,FT.bodyB,'#ab47bc');y+=240;
  y=exGrid(p,y,4,150,(i,x,yy,w,h)=>{
    if(i===0){T(g,'The cat is under the table.',x+56,yy+34,FT.smallB);g.fillStyle='#a1887f';g.fillRect(x+60,yy+70,160,10);g.fillRect(x+66,yy+80,8,60);g.fillRect(x+206,yy+80,8,60);icon(g,'turtle',x+140,yy+124,46);}
    if(i===1){T(g,'A bird flies over the tree.',x+56,yy+34,FT.smallB);K.ell(g,x+140,yy+110,50,34,'#66bb6a');icon(g,'duck',x+150,yy+58,40);}
    if(i===2){T(g,'The fish is inside the bowl.',x+56,yy+34,FT.smallB);K.ell(g,x+140,yy+100,64,40,'#b3e5fc');icon(g,'fish',x+140,yy+100,46);}
    if(i===3){T(g,'The ball is outside the box.',x+56,yy+34,FT.smallB);rr(g,x+60,yy+70,90,60,6);g.fillStyle='#ffcc80';g.fill();icon(g,'ball',x+220,yy+104,44);}
  });
  y=keyWords(p,y,[['inside','in the space within something'],['under','below something']]);return y;},
 readout(p,S,y){const g=p.g,st=S.st;if(st.view!=='pick')T(g,'The '+st.toy+' is '+(st.at==='on'?'on':st.at)+' the '+(st.at==='inside'||st.at==='outside'?'box':'table')+'.',X0,y+54,ZS(38),acc());return y+70;},
 build(S,grp,mode,game){const st=S.st;const g2=K.stage(grp);let mover=null;
  function scene(){const tb=new THREE.Group();tb.position.set(-.6,0,-1.9);g2.add(tb);const top=bx(1.7,.08,1.0,'#a1887f');top.position.y=.74;tb.add(top);[[-.75,-.42],[.75,-.42],[-.75,.42],[.75,.42]].forEach(([x,z])=>{const l=bx(.08,.72,.08,'#8d6e63');l.position.set(x,.36,z);tb.add(l);});
    const bxg=new THREE.Group();bxg.position.set(1.25,0,-1.75);g2.add(bxg);const bot=bx(.9,.04,.75,'#ffcc80');bot.position.set(-.6+.6,.02,0);bxg.add(bot);[[0,.2,-.36,.9,.4,.04],[0,.2,.36,.9,.4,.04],[-.44,.2,0,.04,.4,.75],[.44,.2,0,.04,.4,.75]].forEach(([x,y,z,a,b,c])=>{const w=bx(a,b,c,'#ffcc80');w.position.set(x,y,z);bxg.add(w);});
    SPOT.inside=V(1.25,.06,-1.75);}
  function draw(){clearGroup(g2);scene();
    if(st.view==='pick'){st.items.forEach((o,i)=>{const t=toy(o.k,{s:1.2});t.position.copy(SPOT[o.at]);g2.add(t);K.tapOn(t,()=>tapItem(i));});}
    else{mover=toy(st.toy,{s:1.3});mover.position.copy(SPOT[st.at]);g2.add(mover);}
    A.redraw();}
  function tapItem(i){A.pop();const o=st.items[i];A.say('The '+o.k+' is '+o.at+'.');if(mode==='play'&&!st.setup&&st.wantI!=null){if(i===st.wantI)game.solved(st.okI);else A.bad('Read the place word again.');}}
  function put(w){st.at=w;if(mover)moveTo(mover,{pos:SPOT[w].clone()});A.pop();A.say(w);A.redraw();if(mode==='play'&&!st.setup&&st.needAt){if(w===st.needAt)A.later(()=>game.solved('Yes! The '+st.toy+' is '+w+' the '+(w==='inside'||w==='outside'?'box':'table')+'.'),500);else A.bad('Not quite. Read the sentence again.');}}
  st.view=st.view||'move';draw();
  return {info:()=>st.view+st.at+st.toy,
    controls:()=>{const c=st.view==='pick'?[{t:'Move a toy',fn:()=>{st.view='move';draw();}}]:['over','under','inside','outside'].map(w=>({t:w,fn:()=>put(w)})).concat([{t:'New',go:true,fn:()=>{st.toy=pick(KIDS);draw();}}]);
      if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);return c;},
    demo(n){st.ask=null;st.wantI=null;st.needAt=null;
      if(n==='tour'){st.view='move';st.toy='duck';st.at='outside';draw();A.seq(['under','over','inside'].map(w=>[1100,()=>put(w)]));}
      if(['over','under','inside','outside'].includes(n)){if(st.view!=='move'){st.view='move';st.toy='duck';draw();}put(n);}
      if(n==='scene'){st.view='pick';st.items=[{k:'ball',at:'under'},{k:'kite',at:'inside'},{k:'balloon',at:'over'},{k:'turtle',at:'outside'}];draw();}},
    task(r){st.setup=true;st.ask=null;st.wantI=null;st.needAt=null;let txt;const W=['over','under','inside','outside'];
      if(r===0||r===3){st.view='pick';const ks=shuffle(KIDS.concat(['balloon','star']));st.items=shuffle(W).map((w,i)=>({k:ks[i],at:w}));const t=rnd(0,3);st.wantI=t;const o=st.items[t];st.okI='Yes! The '+o.k+' is '+o.at+' the '+(o.at==='inside'||o.at==='outside'?'box':'table')+'.';txt='Tap the toy that is *'+o.at+'* the '+(o.at==='inside'||o.at==='outside'?'box':'table')+'.';}
      else if(r===1||r===4){st.view='move';st.toy=pick(KIDS);st.at=pick(W);let w;do{w=pick(W);}while(w===st.at);st.needAt=w;txt='Move the '+st.toy+' so it is *'+w+'* the '+(w==='inside'||w==='outside'?'box':'table')+'. Press the place word.';}
      else{st.view='move';st.toy=pick(KIDS);st.at=pick(W);st.ask={o:W,ans:st.at,ok:'Yes! It is '+st.at+' the '+(st.at==='inside'||st.at==='outside'?'box':'table')+'.'};txt='Where is the '+st.toy+'? The '+st.toy+' is ___ the '+(st.at==='inside'||st.at==='outside'?'box':'table')+'.';}
      draw();st.setup=false;return txt;}};}
});
Object.assign(K,{shape3,shape2d,SH,solid});
})();
