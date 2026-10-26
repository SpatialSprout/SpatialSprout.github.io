/* The Interactive Classroom: Grade 3 Math — Spatial Sense (17–21) and Financial Literacy (22) */
(function(){
"use strict";
const P=window.PM;if(!P||P.failed||!P.THREE)return;
const {THREE,V,W,D,PY,PX,X0,TW,INK,RED,BLUE,GREY,VIBE,FT,ZS,G,M,lam,mk,unitBox,cellMat,label,starGeo,wedgeGeo,clearGroup,disposeObj,rr,T,wrap,para,header,keyWords,predict,box,caption,cxOf,cyOf,tint,moveTo,hop,tween,burst,easeOut,A}=P;
const acc=()=>P.ACC;
const rnd=(a,b)=>a+Math.floor(Math.random()*(b-a+1)),pick=a=>a[Math.floor(Math.random()*a.length)],shuffle=a=>a.slice().sort(()=>Math.random()-.5);
function choices(game,list,ans,ok){return list.map(o=>({t:String(o),big:true,fn:()=>{if(o===ans)game.solved(ok);else A.bad('Not quite. Try again!');}}));}

/* =========================================================
   17. 3D objects
   ========================================================= */
const SHAPES=[{id:'cube',name:'Cube',col:'#6ea8f5',f:'6',e:12,v:8,roll:false},{id:'rect',name:'Rectangular prism',col:'#ffcf3f',f:'6',e:12,v:8,roll:false},{id:'tri',name:'Triangular prism',col:'#5cc49a',f:'5',e:9,v:6,roll:false},
  {id:'pyr',name:'Square pyramid',col:'#ff8cb0',f:'5',e:8,v:5,roll:false},{id:'cyl',name:'Cylinder',col:'#b39dff',f:'2 flat + 1 curved',e:2,v:0,roll:true},{id:'cone',name:'Cone',col:'#ffa66b',f:'1 flat + 1 curved',e:1,v:1,roll:true}];
const RIDDLES=[{a:'tri',t:'I have 5 faces, 9 edges and 6 vertices.'},{a:'cyl',t:'I have 0 vertices. I can roll and I can stack.'},{a:'pyr',t:'I have 5 faces. One is a square and 4 are triangles.'},{a:'cube',t:'All 6 of my faces are the same size square. They are congruent.'},{a:'cone',t:'I have 1 vertex and 1 flat face. I roll in a circle.'}];
P.lesson({id:'shapes',title:'Faces, edges and vertices',strand:'Spatial Sense',codes:['E1.1','E1.2','E1.3'],
 guide:{goal:'Sort, construct and identify cubes, prisms, pyramids, cylinders and cones by their faces, edges and vertices; find 2D faces in 3D objects; and identify congruent faces.',words:'3D object, face, edge, vertex, prism, pyramid, cylinder, cone, congruent',
  ask:['How are a cube and a rectangular prism alike? Different?','Which shapes can roll? Which can stack?','What 2D shapes are the faces of a triangular prism?'],home:'Go on a shape hunt: cereal box, soup can, party hat, dice. Count the faces of each one.'},
 learn:[{say:'3D objects have faces, edges and vertices.',speech:'Three D objects are solid shapes. Watch the model show each shape and count its corners, called vertices.',view:'model',demo:'tour'},
        {say:'Read the shape table.',speech:'A face is a flat or curved surface. An edge is where two faces meet. A vertex is a corner.',view:'read'},
        {say:'Watch: which shapes roll?',speech:'Shapes with a curved surface can roll. Watch the cylinder and the cone.',view:'model',demo:'roll'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: pick up shapes.',speech:'Your turn. Tap a shape to pick it up. Turn on vertices to count the corners.',view:'model'}],
 fig:'Six 3D objects on a shelf.',rz:.72,
 explore:['*Tap* a shape to lift it and spin it.','Turn on *Vertices* to see the corners.','Press *Roll test* to see which shapes can roll.'],
 tries:[['How many faces does a rectangular prism have?','*6 faces.*'],['Which 3D object has 0 vertices and 2 flat faces?','*A cylinder.*'],['A house shape is made of a cube and which other 3D object on top?','*A triangular prism* makes the roof.']],
 howTo:'Read the riddle. Tap the shape that matches it. Use Vertices and Spin to look closely.',
 init:k=>({sel:3,showV:false,spin:true,want:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'*3D objects* are solid shapes you can hold. We describe them by their *faces*, *edges* and *vertices*.')+14;
  const ox=X0+150,oy=y+40,s=130,k=.5;const Pq=(a,b,c)=>[ox+a*s-c*s*k*.9,oy+(1-b)*s+c*s*k*.55];
  const f=(pts,c)=>{g.beginPath();pts.forEach((q,i)=>{const a=Pq(...q);i?g.lineTo(a[0],a[1]):g.moveTo(a[0],a[1]);});g.closePath();g.fillStyle=c;g.fill();g.lineWidth=3;g.strokeStyle=INK;g.stroke();};
  f([[0,1,1],[1,1,1],[1,1,0],[0,1,0]],'#c9f0dd');f([[0,0,1],[1,0,1],[1,1,1],[0,1,1]],'#5cc49a');f([[1,0,1],[1,0,0],[1,1,0],[1,1,1]],'#8fd9b6');
  const a=Pq(1,0,1),b=Pq(1,1,1);g.strokeStyle='#e2457a';g.lineWidth=8;g.beginPath();g.moveTo(a[0],a[1]);g.lineTo(b[0],b[1]);g.stroke();const v=Pq(0,1,0);g.beginPath();g.arc(v[0],v[1],11,0,Math.PI*2);g.fillStyle='#f08a24';g.fill();
  const fc=Pq(.5,.5,1);T(g,'face',fc[0],fc[1]+10,FT.hand,INK,'center');T(g,'← edge',b[0]+14,(a[1]+b[1])/2+12,FT.hand,'#e2457a');T(g,'vertex',v[0]-100,v[1]-14,FT.hand,'#f08a24');
  wrap(g,'Faces that match exactly are *congruent*: all 6 faces of a cube are congruent squares. Shapes can be joined: a *cube + a triangular prism* makes a house.',X0+420,y+30,TW-420,34,{font:FT.small,bold:FT.smallB});
  y+=250;const rows=[['Shape','Faces','Edges','Vertices'],...SHAPES.map(s=>[s.name,s.f.replace(' + ',', '),String(s.e),String(s.v)])];
  const cx=[X0+12,X0+320,X0+600,X0+720];rows.forEach((r,i)=>{const yy=y+i*44;if(i===0){g.fillStyle=tint(acc(),.16);g.fillRect(X0,yy-30,TW,42);}else if(i%2===0){g.fillStyle=tint(acc(),.05);g.fillRect(X0,yy-30,TW,44);}r.forEach((c,j)=>T(g,c,cx[j],yy,(i===0||j===0)?FT.smallB:FT.small,INK));});
  y+=rows.length*44+26;predict(p,y,S,'p17','How many vertices does a square pyramid have?','*5 vertices:* four corners around the square bottom and one at the very top.');},
 readout(p,S,y){const g=p.g,st=S.st,s=SHAPES[st.sel];T(g,s.name,X0,y+36,FT.h3,acc());T(g,s.f+' faces  ·  '+s.e+' edge'+(s.e===1?'':'s')+'  ·  '+s.v+(s.v===1?' vertex':' vertices'),X0,y+78,FT.body);T(g,s.roll?'It can roll.':'It cannot roll. It stacks well.',X0,y+116,FT.small,GREY);return y+124;},
 build(S,grp,mode,game){const st=S.st,X=V(1,0,0),Y=V(0,1,0);const box=(w,h,d)=>{const o=[];for(const a of[-1,1])for(const b of[-1,1])for(const c of[-1,1])o.push(V(a*w/2,b*h/2,c*d/2));return o;};
  const GEO={cube:[()=>new THREE.BoxGeometry(1.1,1.1,1.1),()=>box(1.1,1.1,1.1)],rect:[()=>new THREE.BoxGeometry(1.5,.8,.8),()=>box(1.5,.8,.8)],
   tri:[()=>{const q=new THREE.CylinderGeometry(.7,.7,1.4,3,1);q.rotateX(-Math.PI/2);q.rotateY(Math.PI/2);return q;},()=>{const o=[];for(const yy of[-.7,.7])for(let i=0;i<3;i++){const a=i*Math.PI*2/3;o.push(V(.7*Math.sin(a),yy,.7*Math.cos(a)).applyAxisAngle(X,-Math.PI/2).applyAxisAngle(Y,Math.PI/2));}return o;}],
   pyr:[()=>{const q=new THREE.ConeGeometry(.8,1.2,4,1);q.rotateY(Math.PI/4);return q;},()=>{const r=.8/Math.SQRT2;return[V(0,.6,0),V(r,-.6,r),V(-r,-.6,r),V(r,-.6,-r),V(-r,-.6,-r)];}],
   cyl:[()=>new THREE.CylinderGeometry(.55,.55,1.1,32),()=>[]],cone:[()=>new THREE.ConeGeometry(.65,1.2,32),()=>[V(0,.6,0)]]};
  const dg=G('vdot',()=>new THREE.SphereGeometry(.07,12,8));const LIFT=V(0,1.05,-1.55);
  const grs=SHAPES.map((s,i)=>{const gr=new THREE.Group();const geo=GEO[s.id][0]();geo.computeBoundingBox();s.half=-geo.boundingBox.min.y;const m=mk(geo,lam(s.col),30);gr.add(m);gr.userData.m=m;
    GEO[s.id][1]().forEach(q=>{const d=new THREE.Mesh(dg,lam('#e4572e'));d.position.copy(q);d.visible=st.showV;d.userData.dot=1;m.add(d);});
    s.home=V(-1.95+i*.78,s.half*.5,.25);gr.position.copy(s.home);gr.scale.setScalar(.5);A.drag(gr,{tap:()=>pickS(i,true)});grp.add(gr);return gr;});
  function pickS(i,tap){if(st.sel!==i){const o=SHAPES[st.sel];moveTo(grs[st.sel],{pos:o.home,scale:.5,rotY:0,k:8});}st.sel=i;moveTo(grs[i],{pos:LIFT,scale:1.15,k:7});A.pop();
    if(tap&&mode==='play'&&st.want){if(SHAPES[i].id===st.want)game.solved('You found it: the '+SHAPES[i].name.toLowerCase()+'!');else A.bad('That is a '+SHAPES[i].name.toLowerCase()+'. Read the riddle again.');}A.redraw();}
  function tv(on){st.showV=on==null?!st.showV:on;grs.forEach(g=>g.traverse(o=>{if(o.userData.dot)o.visible=st.showV;}));A.redraw();}
  function rollTest(){SHAPES.forEach((s,i)=>{if(i===st.sel)return;const gr=grs[i];if(s.roll){const from=gr.position.clone();tween(1.2,k=>{gr.position.x=from.x+Math.sin(k*Math.PI)*.25;gr.rotation.z=-Math.sin(k*Math.PI*2)*.5;}).then(()=>{gr.position.copy(from);gr.rotation.z=0;});}
    else{tween(.6,k=>{gr.rotation.z=Math.sin(k*Math.PI*4)*.06;}).then(()=>{gr.rotation.z=0;});}});A.say('The cylinder and cone have curved surfaces, so they roll. The others slide or stack.');}
  grs[st.sel].position.copy(LIFT);grs[st.sel].scale.setScalar(1.15);
  return {tick(dt){if(st.spin)grs[st.sel].rotation.y+=dt*.7;},info:()=>SHAPES[st.sel].name+': '+SHAPES[st.sel].v+(SHAPES[st.sel].v===1?' vertex':' vertices'),
    controls:()=>[{t:st.showV?'Vertices: on':'Vertices: off',on:st.showV,fn:()=>tv()},{t:st.spin?'Spin: on':'Spin: off',on:st.spin,fn:()=>{st.spin=!st.spin;A.redraw();}},{t:'Roll test',fn:rollTest}].concat(mode==='learn'?[{t:'Next shape',go:true,fn:()=>pickS((st.sel+1)%6,false)}]:[]),
    demo(n){if(n==='tour'){tv(true);const l=[];for(let i=0;i<6;i++)l.push([i?1700:400,()=>{pickS(i,false);A.say(SHAPES[i].name+': '+SHAPES[i].v+(SHAPES[i].v===1?' vertex':' vertices'));}]);A.seq(l);}if(n==='roll')A.seq([[300,rollTest]]);},
    task(r){st.want=RIDDLES[r].a;return 'Riddle: *'+RIDDLES[r].t+'* Tap the shape.';}};}
});

/* =========================================================
   18. Length
   ========================================================= */
const OBJ=[{id:'pencil',name:'pencil',cm:14,col:'#ffcf57'},{id:'crayon',name:'crayon',cm:8,col:'#ff6b6b'},{id:'eraser',name:'eraser',cm:6,col:'#ff9fb5'},{id:'brush',name:'paintbrush',cm:18,col:'#4fb3ff'}];
P.lesson({id:'length',title:'Measuring length',strand:'Spatial Sense',codes:['E2.2','E2.5'],
 guide:{goal:'Explain the relationships between millimetres, centimetres, metres and kilometres, use benchmarks to estimate, and show that different-sized units give different counts for the same length.',words:'length, millimetre (mm), centimetre (cm), metre (m), kilometre (km), benchmark, non-standard unit',
  ask:['Why does the pencil measure 14 cm but 7 paper clips?','What would you measure in kilometres?','What is about 1 cm wide on your hand?'],home:'Find things about 1 cm (a fingernail), 1 m (a big step) and 1 km (a 15-minute walk).'},
 learn:[{say:'Measure from zero.',speech:'To measure length, line up one end with zero on the ruler. Watch the pencil: fourteen centimetres.',view:'model',demo:'measure'},
        {say:'Read about metric units.',speech:'Ten millimetres make one centimetre. One hundred centimetres make one metre. One thousand metres make one kilometre.',view:'read'},
        {say:'Watch: paper clip units.',speech:'Now measure the same pencil with paper clips. The pencil is seven paper clips long. Bigger units give a smaller count.',view:'model',demo:'clips'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: drag objects onto the ruler.',speech:'Your turn. Drag an object onto the ruler to measure it. Switch units to see centimetres, millimetres or paper clips.',view:'model'}],
 fig:'A 30 cm ruler and things to measure.',rz:.25,
 explore:['*Drag* an object onto the ruler, or tap it.','Switch between *cm*, *mm* and *paper clips*.','Notice: bigger units give smaller counts.'],
 tries:[['How many millimetres are in 3 cm?','*30 mm.* Each centimetre is 10 mm.'],['Which unit would you use for the length of a soccer field?','*Metres.*'],['A book is 20 cm long. A paper clip is 2 cm. How many paper clips long?','*10 paper clips.*']],
 howTo:'Drag the right object onto the ruler, or read the measurement and pick the answer.',
 init:k=>({on:null,unit:'cm',want:null,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'*Length* is how long something is. Line up one end with *0* on the ruler, then read the number at the other end.')+16;
  const rx=X0+16,rw=TW-40,cm=rw/16;rr(g,rx,y,rw,70,8);g.fillStyle='#ffe9a8';g.fill();g.lineWidth=2;g.strokeStyle=INK;g.stroke();
  for(let i=0;i<=160;i++){const x=rx+i*cm/10,big=i%10===0;g.lineWidth=big?2.5:1;g.beginPath();g.moveTo(x,y);g.lineTo(x,y+(big?30:i%5===0?20:12));g.stroke();if(big)T(g,String(i/10),x,y+58,FT.small,INK,'center');}
  g.fillStyle='#ffcf57';g.fillRect(rx,y-46,cm*14,30);g.beginPath();g.moveTo(rx+cm*14,y-46);g.lineTo(rx+cm*14+30,y-31);g.lineTo(rx+cm*14,y-16);g.fill();T(g,'14 cm',rx+cm*7,y-24,FT.smallB,INK,'center');y+=110;
  [['10 mm','=','1 cm','fingernail'],['100 cm','=','1 m','a big step'],['1000 m','=','1 km','a 15-minute walk']].forEach((r,i)=>{const yy=y+i*52;rr(g,X0,yy,TW,44,22);g.fillStyle=tint(acc(),.1+i*.04);g.fill();
    T(g,r[0],X0+40,yy+31,FT.bodyB);T(g,r[1],X0+210,yy+31,FT.bodyB);T(g,r[2],X0+260,yy+31,FT.bodyB,acc());T(g,'about '+r[3],X0+460,yy+31,FT.small,GREY);});y+=190;
  y=para(p,y,'You can also measure with *non-standard units* like paper clips. A bigger unit gives a *smaller count*, but the length stays the same.')+12;
  y=keyWords(p,y,[['benchmark','a known length you use to estimate'],['unit','the size of the piece you measure with']]);
  predict(p,y,S,'p18','A crayon is 8 cm long. How many millimetres is that?','*80 mm.* Each centimetre is 10 millimetres: 8 × 10 = 80.');},
 readout(p,S,y){const g=p.g,st=S.st,o=st.on!=null?OBJ[st.on]:null;if(!o){T(g,'Drag an object onto the ruler.',X0,y+40,FT.bodyB,GREY);return y+50;}
  const val=st.unit==='cm'?o.cm+' cm':st.unit==='mm'?o.cm*10+' mm':o.cm/2+' paper clips';T(g,'The '+o.name+' is '+val+' long',X0,y+46,ZS(44),acc());T(g,o.cm+' cm = '+o.cm*10+' mm = '+o.cm/2+' paper clips',X0,y+90,FT.small,GREY);return y+100;},
 build(S,grp,mode,game){const st=S.st,CM=.13,RX=-1.95,RZ=-.95;
  const c=document.createElement('canvas');c.width=1024;c.height=96;const x=c.getContext('2d');x.fillStyle='#ffe9a8';x.fillRect(0,0,1024,96);x.strokeStyle=INK;
  for(let i=0;i<=300;i++){const px=8+i*(1008/300),big=i%10===0;x.lineWidth=big?3:1.2;x.beginPath();x.moveTo(px,0);x.lineTo(px,big?40:i%5===0?28:16);x.stroke();if(big){x.fillStyle=INK;x.font='700 26px sans-serif';x.textAlign='center';x.fillText(String(i/10),px,76);}}
  const rt=new THREE.CanvasTexture(c);const ruler=mk(new THREE.BoxGeometry(30*CM+.1,.04,.42),[lam('#ffe9a8'),lam('#ffe9a8'),new THREE.MeshLambertMaterial({map:rt}),lam('#ffe9a8'),lam('#ffe9a8'),lam('#ffe9a8')],20);
  ruler.position.set(RX+15*CM,.02,RZ);grp.add(ruler);const zero=RX+.05*0;
  const objs=OBJ.map((o,i)=>{const gr=new THREE.Group();const L=o.cm*CM;
    if(o.id==='pencil'||o.id==='crayon'){const b=mk(new THREE.CylinderGeometry(.06,.06,L*.85,6),lam(o.col),30);b.rotation.z=Math.PI/2;b.position.set(L*.425,.07,0);gr.add(b);const t=mk(new THREE.ConeGeometry(.06,L*.15,6),lam('#f2d1a0'),30);t.rotation.z=-Math.PI/2;t.position.set(L*.925,.07,0);gr.add(t);}
    else if(o.id==='eraser'){const b=mk(new THREE.BoxGeometry(L,.12,.22),lam(o.col),20);b.position.set(L/2,.06,0);gr.add(b);}
    else{const b=mk(new THREE.CylinderGeometry(.035,.035,L*.75,8),lam(o.col),30);b.rotation.z=Math.PI/2;b.position.set(L*.375,.05,0);gr.add(b);const h=mk(new THREE.ConeGeometry(.07,L*.25,10),lam('#7a4a2a'),30);h.rotation.z=-Math.PI/2;h.position.set(L*.875,.05,0);gr.add(h);}
    gr.userData.home=V(-2.05+(i%2)*1.9,0,-2.35+Math.floor(i/2)*.62);gr.position.copy(gr.userData.home);grp.add(gr);
    A.drag(gr,{tap:()=>measure(i),drop:(pos)=>{if(Math.abs(pos.z-RZ)<.6&&pos.x>RX-.6&&pos.x<RX+30*CM)measure(i);else moveTo(gr,{pos:gr.userData.home,k:10});}});return gr;});
  const clips=new THREE.Group();grp.add(clips);const tag=label('',{size:.3,bg:'#ffffff'});tag.visible=false;grp.add(tag);
  function showClips(){clearGroup(clips);if(st.unit!=='clip'||st.on==null)return;const n=OBJ[st.on].cm/2;for(let k=0;k<n;k++){const cp=mk(G('clip',()=>new THREE.TorusGeometry(.1,.018,6,16)),lam('#9aa8c4'),0);cp.scale.set(1.3,.5,1);cp.rotation.x=Math.PI/2;cp.position.set(RX+(k+.5)*2*CM,.06,RZ+.42);clips.add(cp);}}
  function label2(){if(st.on==null){tag.visible=false;return;}const o=OBJ[st.on];tag.visible=true;tag.userData.set(st.unit==='cm'?o.cm+' cm':st.unit==='mm'?o.cm*10+' mm':o.cm/2+' clips');tag.position.set(RX+o.cm*CM/2,.55,RZ);}
  function measure(i){if(st.on!=null&&st.on!==i)moveTo(objs[st.on],{pos:objs[st.on].userData.home,k:10});st.on=i;moveTo(objs[i],{pos:V(RX,.04,RZ),k:10});A.pop();label2();showClips();
    if(mode==='play'&&st.want===OBJ[i].id)game.solved('Yes! The '+OBJ[i].name+' is '+OBJ[i].cm+' cm long.');A.redraw();}
  function unit(u){st.unit=u;label2();showClips();A.redraw();}
  return {info:()=>st.on==null?'Drag something onto the ruler.':'The '+OBJ[st.on].name+': '+OBJ[st.on].cm+' cm',
    controls:()=>{const u=[{t:'cm',on:st.unit==='cm',fn:()=>unit('cm')},{t:'mm',on:st.unit==='mm',fn:()=>unit('mm')},{t:'paper clips',on:st.unit==='clip',fn:()=>unit('clip')}];
      if(mode==='play'&&st.ask)return choices(game,st.ask.opts,st.ask.ans,st.ask.ok).concat(u);return OBJ.map((o,i)=>({t:'Measure '+o.name,fn:()=>measure(i)})).concat(u);},
    demo(n){if(n==='measure'){unit('cm');A.seq([[700,()=>measure(0)],[1600,()=>{unit('mm');A.say('14 cm is 140 mm.');}]]);}if(n==='clips'){measure(0);A.seq([[600,()=>unit('clip')],[1500,()=>A.say('7 paper clips long.')]]);}},
    task(r){st.ask=null;st.want=null;if(st.on!=null){moveTo(objs[st.on],{pos:objs[st.on].userData.home,k:10});st.on=null;label2();showClips();}unit('cm');
      if(r===0){const o=pick(OBJ);st.want=o.id;return 'Find the object that is *'+o.cm+' cm* long. Drag it onto the ruler.';}
      if(r===1){st.ask={ans:60,opts:[6,60,600],ok:'Yes! 6 cm = 60 mm.'};return 'Measure the *eraser*. How long is it in *millimetres*?';}
      if(r===2){st.ask={ans:'metres',opts:['millimetres','centimetres','metres','kilometres'],ok:'Yes! Use metres for a hallway.'};return 'Which unit would you use to measure a *school hallway*?';}
      if(r===3){st.ask={ans:7,opts:[5,7,14],ok:'Yes! 14 cm is 7 paper clips of 2 cm.'};return 'How many *paper clips* long is the pencil? Each clip is 2 cm.';}
      st.ask={ans:'1 m',opts:['1 m','10 m','1 km'],ok:'Yes! 100 cm = 1 m.'};return 'How long is *100 cm*?';}};}
});

/* =========================================================
   19. Mass and capacity
   ========================================================= */
const THINGS=[{id:'apple',name:'apple',m:6,col:'#ff5a5a'},{id:'book',name:'book',m:9,col:'#4f8df7'},{id:'car',name:'toy car',m:4,col:'#ffcf3f'},{id:'pencil',name:'pencil',m:1,col:'#5cc46a'}];
const POTS=[{id:'vase',name:'vase',cups:5,r:.42,h:1.2},{id:'bowl',name:'bowl',cups:3,r:.62,h:.45},{id:'bottle',name:'bottle',cups:4,r:.32,h:1.35}];
P.lesson({id:'mass',title:'Mass and capacity',strand:'Spatial Sense',codes:['E2.3','E2.4'],
 guide:{goal:'Compare and measure mass with a pan balance and non-standard units, and measure capacity with non-standard units, explaining how overfilling, underfilling and gaps affect accuracy.',words:'mass, heavier, lighter, balance, capacity, holds more, holds less, overfill',
  ask:['How do you know which object is heavier?','Why should each cup be filled to the top?','Can a tall thin container hold less than a short wide one?'],home:'Use cups of water to find which container in your kitchen holds the most. Fill each cup to the line.'},
 learn:[{say:'Measure mass with a balance.',speech:'Mass is how heavy something is. Put the apple on the balance, then add cubes until it is level. The apple has a mass of six cubes.',view:'model',demo:'mass'},
        {say:'Read about mass and capacity.',speech:'Capacity is how much a container holds. We can count cups of water to measure it.',view:'read'},
        {say:'Watch: filling the vase.',speech:'Pour cups of water into the vase until it is full. It holds five cups. One more and it overflows.',view:'model',demo:'pour'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: weigh and pour.',speech:'Your turn. Tap an object to weigh it, then add cubes to balance. Or switch to capacity and pour cups.',view:'model'}],
 fig:'A pan balance with cubes, and containers to fill with cups of water.',rz:.25,
 explore:['*Mass:* tap an object, then add cubes until level.','*Capacity:* pick a container and pour cups.','Watch out: one cup too many overflows!'],
 tries:[['The apple balances 6 cubes. The car balances 4. Which is heavier?','*The apple.* It needs more cubes to balance.'],['A jug holds 8 cups. You pour 5. How many more fit?','*3 cups.*'],['Why must each cup be full when you measure capacity?','Because *half-full cups* would give the wrong count. The unit must be the same every time.']],
 howTo:'Weigh objects by adding cubes until the balance is level, or pour cups until the container is full. Then answer the question.',
 init:k=>({mode:'mass',obj:null,cubes:0,pot:0,cups:0,ask:null,want:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'*Mass* is how heavy something is. A *pan balance* tips down on the heavier side. When it is level, both sides have the same mass.')+12;
  const cx=X0+220,cy=y+60;g.fillStyle=INK;g.beginPath();g.moveTo(cx,cy);g.lineTo(cx-26,cy+90);g.lineTo(cx+26,cy+90);g.closePath();g.fill();g.save();g.translate(cx,cy);g.rotate(-.2);g.fillStyle=acc();g.fillRect(-170,-8,340,12);g.restore();
  g.beginPath();g.arc(cx-160,cy+40,30,0,Math.PI*2);g.fillStyle='#ff5a5a';g.fill();for(let i=0;i<3;i++){g.fillStyle='#ffcf3f';g.fillRect(cx+130+i*0,cy-60-i*22,36,20);}
  T(g,'apple is heavier than 3 cubes',cx+200,cy+30,FT.hand,BLUE);y+=190;
  y=para(p,y,'*Capacity* is how much a container holds. Count how many full cups of water fill it. Overfilling or half-full cups make the count wrong.')+12;
  for(let i=0;i<5;i++){rr(g,X0+i*70,y+20,50,64,8);g.fillStyle='#bfe9ff';g.fill();g.strokeStyle=INK;g.lineWidth=2;g.stroke();}T(g,'→',X0+370,y+70,ZS(56),acc());
  rr(g,X0+450,y-10,120,130,20);g.fillStyle='#e6f6ff';g.fill();g.stroke();g.fillStyle='#7cc8ff';g.fillRect(X0+452,y+12,116,106);T(g,'5 cups fill the vase',X0+600,y+70,FT.hand,BLUE);y+=150;
  y=keyWords(p,y,[['mass','how heavy an object is'],['capacity','how much a container can hold']]);
  predict(p,y,S,'p19','A book balances 9 cubes. Is it heavier or lighter than an apple that balances 6?','*Heavier.* 9 cubes is more than 6 cubes.');},
 readout(p,S,y){const g=p.g,st=S.st;if(st.mode==='mass'){const o=st.obj!=null?THINGS[st.obj]:null;T(g,o?'The '+o.name+' vs '+st.cubes+' cubes':'Tap an object to weigh it.',X0,y+40,FT.bodyB,acc());
    if(o)T(g,st.cubes===o.m?'Balanced! Mass = '+o.m+' cubes':st.cubes<o.m?'The '+o.name+' is heavier. Add cubes.':'The cubes are heavier. Take some away.',X0,y+86,ZS(36),st.cubes===o.m?'#16a36f':INK);return y+96;}
  const pt=POTS[st.pot];T(g,'The '+pt.name+': '+st.cups+' cup'+(st.cups===1?'':'s')+' poured',X0,y+40,FT.bodyB,acc());T(g,st.cups>pt.cups?'Overfilled! It holds '+pt.cups+' cups.':st.cups===pt.cups?'Full! It holds '+pt.cups+' cups.':'Keep pouring…',X0,y+86,ZS(36),st.cups===pt.cups?'#16a36f':st.cups>pt.cups?RED:INK);return y+96;},
 build(S,grp,mode,game){const st=S.st,PV=V(-.35,1.45,-1.6),ARM=1.3;let ang=0,tAng=0;
  const massG=new THREE.Group(),capG=new THREE.Group();grp.add(massG,capG);
  const foot=mk(new THREE.BoxGeometry(1.1,.08,.6),lam('#16a36f'),20);foot.position.set(PV.x,.04,PV.z);massG.add(foot);const post=mk(new THREE.BoxGeometry(.12,PV.y,.12),lam('#8fd9b6'),20);post.position.set(PV.x,PV.y/2,PV.z);massG.add(post);
  const beam=new THREE.Group();beam.position.copy(PV);massG.add(beam);beam.add(mk(new THREE.BoxGeometry(2.8,.08,.12),lam('#16a36f'),20));
  const pans=[-1,1].map(()=>{const g=new THREE.Group();g.add(mk(new THREE.CylinderGeometry(.52,.46,.05,32),lam('#ffd24a'),30));const rod=new THREE.Mesh(new THREE.CylinderGeometry(.013,.013,.62,6),lam(INK));rod.position.y=.33;g.add(rod);const cg=new THREE.Group();g.add(cg);g.userData.cg=cg;massG.add(g);return g;});
  A.drag(pans[1],{tap:()=>setCubes(st.cubes+1)});
  function thing(t){const g=new THREE.Group();if(t.id==='apple'){const a=mk(new THREE.SphereGeometry(.2,20,14),lam(t.col),0);a.position.y=.2;g.add(a);const s=mk(new THREE.CylinderGeometry(.015,.015,.1,6),lam('#6b4a2a'),0);s.position.y=.43;g.add(s);}
    else if(t.id==='book'){const b=mk(new THREE.BoxGeometry(.5,.12,.38),lam(t.col),20);b.position.y=.06;g.add(b);}else if(t.id==='car'){const b=mk(new THREE.BoxGeometry(.42,.14,.22),lam(t.col),20);b.position.y=.12;g.add(b);const c=mk(new THREE.BoxGeometry(.22,.1,.2),lam('#ffe9a8'),20);c.position.set(-.02,.24,0);g.add(c);
      [-1,1].forEach(sx=>[-1,1].forEach(sz=>{const w=mk(G('cw',()=>new THREE.CylinderGeometry(.05,.05,.04,12)),lam(INK),0);w.rotation.x=Math.PI/2;w.position.set(sx*.13,.05,sz*.11);g.add(w);}));}
    else{const b=mk(new THREE.CylinderGeometry(.03,.03,.5,6),lam(t.col),30);b.rotation.z=Math.PI/2;b.position.y=.04;g.add(b);}return g;}
  const shelf=THINGS.map((t,i)=>{const m=thing(t);m.position.set(1.15+(i%2)*.7,0,-2.3+Math.floor(i/2)*.75);massG.add(m);A.drag(m,{tap:()=>setObj(i)});return m;});
  function fillR(){const cg=pans[1].userData.cg;cg.children.forEach(o=>A.unclick(o));clearGroup(cg);for(let k=0;k<st.cubes;k++){const m=unitBox(1,1,1,'#ffcf3f',.11);m.position.set(((k%3)-1)*.12,.03+.055+Math.floor(k/3)*.11,0);cg.add(m);A.drag(m,{tap:()=>setCubes(st.cubes-1)});}}
  function fillL(){const cg=pans[0].userData.cg;clearGroup(cg);if(st.obj!=null){cg.add(thing(THINGS[st.obj]));}}
  function tilt(){const d=(st.obj!=null?THINGS[st.obj].m:0)-st.cubes;tAng=Math.max(-.3,Math.min(.3,d*.05));}
  function setObj(i){st.obj=i;st.cubes=0;fillL();fillR();tilt();A.pop();A.redraw();}
  function setCubes(n){if(st.obj==null){A.say('Tap an object to put it on the balance first.');return;}n=Math.max(0,Math.min(12,n));if(n===st.cubes)return;st.cubes=n;fillR();tilt();A.pop();
    const o=THINGS[st.obj];if(n===o.m){A.good('Balanced! The '+o.name+' has a mass of '+o.m+' cubes.',V(W/2+PV.x,PY+2,PV.z));if(mode==='play'&&st.want===o.id)game.solved('The '+o.name+' balances '+o.m+' cubes!');}A.redraw();}
  function placeP(){beam.rotation.z=ang;[-1,1].forEach((s,i)=>pans[i].position.set(PV.x+s*ARM*Math.cos(ang),PV.y+s*ARM*Math.sin(ang)-.68,PV.z));}
  /* capacity */
  const potG=new THREE.Group();capG.add(potG);let water=null,potMesh=null;const cup=mk(new THREE.CylinderGeometry(.17,.13,.3,20,1,true),new THREE.MeshLambertMaterial({color:'#ffffff',side:THREE.DoubleSide}),25);cup.position.set(1.6,.15,-1.2);capG.add(cup);
  const cupW=new THREE.Mesh(new THREE.CylinderGeometry(.15,.12,.24,20),new THREE.MeshLambertMaterial({color:'#4fb3ff',transparent:true,opacity:.75}));cupW.position.set(1.6,.13,-1.2);capG.add(cupW);A.drag(cup,{tap:()=>pour()});
  function buildPot(){clearGroup(potG);const pt=POTS[st.pot];potMesh=mk(new THREE.CylinderGeometry(pt.r,pt.r*.85,pt.h,32,1,true),new THREE.MeshLambertMaterial({color:'#e6f6ff',transparent:true,opacity:.5,side:THREE.DoubleSide}),25);potMesh.position.set(-.6,pt.h/2,-1.5);potG.add(potMesh);
    const base=mk(new THREE.CylinderGeometry(pt.r*.85,pt.r*.85,.03,32),lam('#cfe9f7'),0);base.position.set(-.6,.015,-1.5);potG.add(base);
    water=new THREE.Mesh(new THREE.CylinderGeometry(pt.r*.95,pt.r*.82,1,32),new THREE.MeshLambertMaterial({color:'#4fb3ff',transparent:true,opacity:.75}));water.position.set(-.6,.01,-1.5);water.scale.y=.001;potG.add(water);
    for(let i=1;i<=pt.cups;i++){const ln=new THREE.Mesh(new THREE.TorusGeometry(pt.r*.98,.008,4,40),lam('#2a62c9'));ln.rotation.x=Math.PI/2;ln.position.set(-.6,pt.h*i/pt.cups*.92,-1.5);potG.add(ln);}level(false);}
  function level(anim){const pt=POTS[st.pot],h=Math.min(st.cups,pt.cups)/pt.cups*pt.h*.92;const from=water.scale.y,to=Math.max(.001,h);if(anim)tween(.5,k=>{water.scale.y=from+(to-from)*k;water.position.y=water.scale.y/2+.01;});else{water.scale.y=to;water.position.y=to/2+.01;}}
  function pour(){if(st.mode!=='cap')return;const pt=POTS[st.pot];if(st.cups>pt.cups)return;st.cups++;hop(cup,V(-.6+pt.r+.2,pt.h+.35,-1.5),.5,.45).then(()=>{cup.rotation.z=1.6;cupW.visible=false;level(true);
      A.later(()=>{cup.rotation.z=0;cupW.visible=true;moveTo(cup,{pos:V(1.6,.15,-1.2),k:8});},500);
      if(st.cups>pt.cups){A.bad('Overfilled! The '+pt.name+' only holds '+pt.cups+' cups.');burst(V(W/2-.6,PY+pt.h,-1.5));}
      else if(st.cups===pt.cups){A.good('Full! The '+pt.name+' holds '+pt.cups+' cups.',V(W/2-.6,PY+pt.h+.4,-1.5));if(mode==='play'&&st.want===pt.id)game.solved('The '+pt.name+' holds '+pt.cups+' cups!');}else A.pop();A.redraw();});}
  function setPot(i){st.pot=i;st.cups=0;buildPot();A.redraw();}
  function setMode(m){st.mode=m;massG.visible=m==='mass';capG.visible=m==='cap';A.redraw();}
  fillL();fillR();tilt();ang=tAng;placeP();buildPot();setMode(st.mode);
  return {tick(dt){ang+=(tAng-ang)*Math.min(1,dt*4);placeP();},info:()=>st.mode==='mass'?(st.obj!=null?THINGS[st.obj].name+' vs '+st.cubes+' cubes':'Tap an object to weigh it'):POTS[st.pot].name+': '+st.cups+' cups',
    controls:()=>{if(mode==='play'&&st.ask)return choices(game,st.ask.opts,st.ask.ans,st.ask.ok);const o=[{t:'Mass',on:st.mode==='mass',fn:()=>setMode('mass')},{t:'Capacity',on:st.mode==='cap',fn:()=>setMode('cap')}];
      if(st.mode==='mass')return o.concat(THINGS.map((t,i)=>({t:t.name,on:st.obj===i,fn:()=>setObj(i)})),[{t:'Cube −',fn:()=>setCubes(st.cubes-1)},{t:'Cube +',go:true,fn:()=>setCubes(st.cubes+1)}]);
      return o.concat(POTS.map((t,i)=>({t:t.name,on:st.pot===i,fn:()=>setPot(i)})),[{t:'Pour a cup',go:true,fn:pour},{t:'Empty',fn:()=>setPot(st.pot)}]);},
    demo(n){if(n==='mass'){setMode('mass');setObj(0);const l=[];for(let i=1;i<=6;i++)l.push([i===1?900:450,()=>setCubes(i)]);A.seq(l);}if(n==='pour'){setMode('cap');setPot(0);const l=[];for(let i=0;i<6;i++)l.push([i?1100:600,pour]);A.seq(l);}},
    task(r){st.ask=null;st.want=null;
      if(r===0){setMode('mass');setObj(1);st.want='book';return 'Put cubes on the balance until it is level. How many cubes is the *book*?';}
      if(r===1){setMode('mass');st.obj=null;fillL();fillR();tilt();st.ask={ans:'apple',opts:['apple','toy car'],ok:'Yes! The apple (6 cubes) is heavier than the car (4 cubes).'};return 'Weigh them if you like. Which is *heavier*: the apple or the toy car?';}
      if(r===2){setMode('cap');setPot(0);st.want='vase';return 'Pour cups until the *vase* is full. How many cups does it hold?';}
      if(r===3){setMode('mass');setObj(2);st.want='car';return 'Balance the *toy car* with cubes.';}
      setMode('cap');setPot(1);st.ask={ans:'bottle',opts:['bowl','bottle'],ok:'Yes! The bottle holds 4 cups, the bowl holds 3.'};return 'The *bowl* holds 3 cups and the *bottle* holds 4. Which holds *more*? Pour to check.';}};}
});

/* =========================================================
   20. Perimeter and area
   ========================================================= */
P.lesson({id:'area',title:'Perimeter and area',strand:'Spatial Sense',codes:['E2.1','E2.7','E2.8','E2.9'],
 guide:{goal:'Measure perimeter, measure area by covering with square units (including cm² and m²), and show that different shapes can have the same area.',words:'perimeter, area, square unit, square centimetre (cm²), square metre (m²), length, width',
  ask:['Can two gardens have the same area but different perimeters?','Why do gaps between tiles make the area wrong?','How can multiplying help you find area?'],home:'Cover a placemat with sticky notes to find its area. Wrap string around it to find its perimeter.'},
 learn:[{say:'Inside is area, around is perimeter.',speech:'Area is how many squares cover a shape. Perimeter is the distance around it. Watch the garden fill up with square tiles.',view:'model',demo:'tile'},
        {say:'Read about square units.',speech:'We measure area in square units like square centimetres and square metres.',view:'read'},
        {say:'Watch: same area, different shapes.',speech:'Three by four and two by six both have an area of twelve, but their perimeters are different.',view:'model',demo:'same'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: design a garden.',speech:'Your turn. Make the garden longer or wider. Count squares for area and the fence for perimeter.',view:'model'}],
 fig:'A garden of square tiles with a fence around it.',rz:.72,
 explore:['Make the garden *longer* or *wider*.','Count the tiles for *area* and the fence for *perimeter*.','Find two gardens with the *same area*.'],
 tries:[['A rug is 4 m by 2 m. What is its area?','*8 square metres (8 m²).*'],['What is the perimeter of a 5 cm by 3 cm rectangle?','*16 cm.* 5 + 3 + 5 + 3 = 16.'],['Can a 1 × 12 and a 3 × 4 rectangle have the same area?','*Yes.* Both are 12 square units.']],
 howTo:'Change the length and width of the garden until it matches the area and perimeter in the question.',
 init:k=>({w:4,h:3,want:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'The *perimeter* is the distance all the way around a shape. The *area* is how many squares it takes to cover the shape.')+20;
  const s=52,ox=X0+30,oy=y+20;let n=1;for(let r=0;r<3;r++)for(let c=0;c<4;c++){g.fillStyle=(r+c)%2?'#bfe9cf':'#8fdcb0';g.fillRect(ox+c*s,oy+r*s,s,s);g.strokeStyle='#fff';g.lineWidth=2;g.strokeRect(ox+c*s,oy+r*s,s,s);T(g,String(n++),ox+c*s+s/2,oy+r*s+s/2+9,FT.small,INK,'center');}
  g.strokeStyle='#e2457a';g.lineWidth=7;g.strokeRect(ox,oy,4*s,3*s);T(g,'4',ox+2*s,oy-12,FT.bodyB,'#e2457a','center');T(g,'3',ox-26,oy+1.5*s+10,FT.bodyB,'#e2457a','center');
  T(g,'Area = 4 × 3 = 12 square units',X0+300,oy+50,FT.bodyB,'#16a36f');T(g,'Perimeter = 4 + 3 + 4 + 3',X0+300,oy+100,FT.bodyB,'#e2457a');T(g,'= 14 units',X0+300,oy+140,FT.bodyB,'#e2457a');y+=214;
  y=para(p,y,'Small areas use *square centimetres (cm²)*; big ones like a classroom use *square metres (m²)*. Gaps or overlaps between squares make the area wrong.')+14;
  y=keyWords(p,y,[['perimeter','the distance around a shape'],['area','the number of squares that cover a shape']]);
  predict(p,y,S,'p20','A garden is 5 squares long and 2 squares wide. What is its area?','*10 square units.* 2 rows of 5 squares is 10.');},
 readout(p,S,y){const g=p.g,st=S.st;T(g,'Area = '+st.w+' × '+st.h+' = '+st.w*st.h+' square units',X0,y+36,FT.bodyB,'#16a36f');T(g,'Perimeter = '+st.w+' + '+st.h+' + '+st.w+' + '+st.h+' = '+2*(st.w+st.h)+' units',X0,y+78,FT.bodyB,'#e2457a');return y+88;},
 build(S,grp,mode,game){const st=S.st,c=.42,N=8,Z0=-1.35,x0=-c*N/2,z0=Z0-c*N/2;
  const base=mk(new THREE.BoxGeometry(c*N+.1,.04,c*N+.1),[lam('#d9efc9'),lam('#d9efc9'),cellMat('#eef8e6',N,N),lam('#d9efc9'),lam('#d9efc9'),lam('#d9efc9')],20);base.position.set(0,.02,Z0);grp.add(base);
  const plot=new THREE.Group();grp.add(plot);const tg=G('tileA',()=>new THREE.BoxGeometry(c-.04,.07,c-.04));const pg=G('postA',()=>new THREE.CylinderGeometry(.025,.025,.3,8));
  const lw=label('',{size:.26,color:'#e2457a'}),lh=label('',{size:.26,color:'#e2457a'});grp.add(lw,lh);
  const corner=mk(new THREE.SphereGeometry(.12,16,12),lam('#ffd24a'),0);grp.add(corner);
  function rebuild(drop){clearGroup(plot);for(let r=0;r<st.h;r++)for(let q=0;q<st.w;q++){const m=mk(tg,lam((r+q)%2?'#4cc38a':'#16a36f'),20);const p=V(x0+(q+.5)*c,.075,z0+(r+.5)*c);m.position.copy(p);if(drop)m.position.y+=.6+(r*st.w+q)*.012;plot.add(m);moveTo(m,{pos:p,k:10});
      if((r+q)%3===0){const f=new THREE.Mesh(G('flw',()=>new THREE.SphereGeometry(.05,8,6)),lam(VIBE[(r*3+q)%6]));f.position.set(p.x,.14,p.z);plot.add(f);}}
    const rail=lam('#e2457a');const pts=[];for(let q=0;q<=st.w;q++)pts.push([q,0],[q,st.h]);for(let r=1;r<st.h;r++)pts.push([0,r],[st.w,r]);
    pts.forEach(([q,r])=>{const m=new THREE.Mesh(pg,rail);m.position.set(x0+q*c,.17,z0+r*c);m.castShadow=true;plot.add(m);});
    const seg=(ax,az,bx,bz)=>{[.12,.24].forEach(h=>{const m=new THREE.Mesh(G('railA',()=>new THREE.BoxGeometry(c,.025,.025)),rail);m.position.set((ax+bx)/2,h,(az+bz)/2);if(Math.abs(bz-az)>1e-6)m.rotation.y=Math.PI/2;plot.add(m);});};
    for(let q=0;q<st.w;q++){seg(x0+q*c,z0,x0+(q+1)*c,z0);seg(x0+q*c,z0+st.h*c,x0+(q+1)*c,z0+st.h*c);}for(let r=0;r<st.h;r++){seg(x0,z0+r*c,x0,z0+(r+1)*c);seg(x0+st.w*c,z0+r*c,x0+st.w*c,z0+(r+1)*c);}
    lw.userData.set(String(st.w));lw.position.set(x0+st.w*c/2,.5,z0-.12);lh.userData.set(String(st.h));lh.position.set(x0-.18,.5,z0+st.h*c/2);corner.position.set(x0+st.w*c,.2,z0+st.h*c);}
  function set(w,h){w=Math.max(1,Math.min(8,w));h=Math.max(1,Math.min(8,h));if(w===st.w&&h===st.h)return;st.w=w;st.h=h;rebuild(true);A.pop();A.say('Area '+w*h+', perimeter '+2*(w+h)+'.');
    if(mode==='play'&&st.want&&st.want(w,h))game.solved('Area '+w*h+', perimeter '+2*(w+h)+'. You did it!');A.redraw();}
  A.drag(corner,{h:.2,drop:(pos)=>{set(Math.round((pos.x-x0)/c),Math.round((pos.z-z0)/c));rebuild(false);}});
  rebuild(false);
  return {info:()=>'Area '+st.w*st.h+' · Perimeter '+2*(st.w+st.h)+'  (drag the yellow corner!)',
    controls:()=>[{t:'Longer',go:true,fn:()=>set(st.w+1,st.h)},{t:'Shorter',fn:()=>set(st.w-1,st.h)},{t:'Wider',go:true,fn:()=>set(st.w,st.h+1)},{t:'Narrower',fn:()=>set(st.w,st.h-1)}],
    demo(n){if(n==='tile'){st.w=1;st.h=1;rebuild(false);A.seq([[500,()=>set(4,1)],[900,()=>set(4,2)],[900,()=>set(4,3)],[900,()=>A.say('4 × 3 = 12 squares inside. 14 units of fence around.')]]);}
      if(n==='same')A.seq([[400,()=>set(3,4)],[1800,()=>set(2,6)],[1600,()=>A.say('Both have area 12. The perimeters are 14 and 16.')]]);},
    task(r){st.w=1;st.h=1;rebuild(false);const L=[[(w,h)=>w*h===12&&2*(w+h)===14,'Make a garden with *area 12* and *perimeter 14*.'],[(w,h)=>w*h===12&&2*(w+h)===16,'Make a garden with *area 12* and *perimeter 16*.'],
      [(w,h)=>2*(w+h)===10,'Make a garden with a *perimeter of 10*.'],[(w,h)=>w===4&&h===4,'Make a *square* garden with an *area of 16*.'],[(w,h)=>w*h===18&&(w===6||h===6),'Make *area 18* with one side *6* long.']][r];st.want=L[0];return L[1];}};}
});

/* =========================================================
   21. Telling time
   ========================================================= */
const fmt=(tm,pm)=>{const t=((tm%720)+720)%720;let h=Math.floor(t/60);const m=t%60;if(h===0)h=12;return h+':'+String(m).padStart(2,'0')+(pm?' p.m.':' a.m.');};
P.lesson({id:'time',title:'Telling time',strand:'Spatial Sense',codes:['E2.6'],
 guide:{goal:'Use analog and digital clocks and timers to tell time in hours, minutes and seconds.',words:'analog, digital, hour hand, minute hand, second, minute, hour, a.m., p.m., quarter past, half past',
  ask:['Why does the hour hand move a little when the minute hand moves?','What time is it when both hands point to 12?','How long is one minute? Count 60 seconds!'],home:'Ask your child to read the kitchen clock at breakfast and dinner, and say a.m. or p.m.'},
 learn:[{say:'The minute hand counts by 5s.',speech:'Each number on the clock is five minutes for the minute hand. Watch it count: five, ten, fifteen… all the way to sixty minutes, one hour.',view:'model',demo:'count5'},
        {say:'Read about hours, minutes and seconds.',speech:'Sixty seconds make one minute. Sixty minutes make one hour. A.m. is before noon and p.m. is after noon.',view:'read'},
        {say:'Watch: quarter past and half past.',speech:'Quarter past seven is seven fifteen. Half past seven is seven thirty.',view:'model',demo:'quarter'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: drag the hands.',speech:'Your turn. Drag the long pink minute hand around the clock, or use the buttons.',view:'model'}],
 fig:'A classroom clock and a digital clock showing the same time.',rz:-.25,
 explore:['*Drag the pink minute hand* around the clock.','Use *+5 min* and *+1 hour* to step the time.','Watch the digital clock match.'],
 tries:[['The minute hand points to 6. How many minutes after the hour?','*30 minutes.* That is half past.'],['What time is 20 minutes after 2:50?','*3:10.*'],['How many seconds are in 2 minutes?','*120 seconds.* 60 + 60 = 120.']],
 howTo:'Set the clock to the time in the question. Drag the minute hand or use the buttons.',
 init:k=>({tm:9*60,pm:false,want:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'An *analog clock* has hands. The short *hour hand* points to the hour. The long *minute hand* counts the minutes.')+16;
  const cx=X0+150,cy=y+150,R=140;g.beginPath();g.arc(cx,cy,R,0,Math.PI*2);g.fillStyle='#fff';g.fill();g.lineWidth=10;g.strokeStyle=acc();g.stroke();
  for(let i=1;i<=12;i++){const a=i*Math.PI/6;T(g,String(i),cx+Math.sin(a)*(R-34),cy-Math.cos(a)*(R-34)+11,ZS(30),['#e2457a','#f08a24','#16a36f','#2f7de1','#8b5cf6'][i%5],'center');}
  const hand=(a,len,w,c)=>{g.strokeStyle=c;g.lineWidth=w;g.lineCap='round';g.beginPath();g.moveTo(cx,cy);g.lineTo(cx+Math.sin(a)*len,cy-Math.cos(a)*len);g.stroke();};
  hand((10+10/60)*Math.PI/6,70,11,INK);hand(Math.PI/3,110,7,'#e2457a');g.beginPath();g.arc(cx,cy,9,0,Math.PI*2);g.fillStyle=INK;g.fill();
  T(g,'hour hand',cx-150,cy+R+40,FT.hand,INK);T(g,'minute hand',cx+40,cy+R+40,FT.hand,'#e2457a');const tx=X0+340;
  wrap(g,'Each number is *5 minutes* for the minute hand. Count by 5s!',tx,y+40,TW-340,38,{font:FT.body,bold:FT.bodyB});rr(g,tx,y+130,210,80,14);g.fillStyle='#1b2236';g.fill();T(g,'10:10',tx+105,y+188,'700 50px "Atkinson Hyperlegible", monospace','#7dffb0','center');
  wrap(g,'*60 seconds = 1 minute.* *60 minutes = 1 hour.* a.m. is before noon, p.m. is after noon.',tx,y+260,TW-340,34,{font:FT.small,bold:FT.smallB});y+=385;
  y=keyWords(p,y,[['quarter past','15 minutes after the hour'],['half past','30 minutes after the hour']]);
  predict(p,y,S,'p21','The minute hand points to the 9. How many minutes after the hour is it?','*45 minutes.* Count by 5s nine times: 5, 10, 15 … 45. It is also called quarter to.');},
 readout(p,S,y){const g=p.g,st=S.st;T(g,fmt(st.tm,st.pm),X0,y+64,'700 62px "Atkinson Hyperlegible", monospace',acc());const m=((st.tm%60)+60)%60;T(g,m===15?'quarter past':m===30?'half past':m===45?'quarter to':m===0?"o'clock":m+' minutes after the hour',X0,y+108,FT.small,GREY);return y+116;},
 build(S,grp,mode,game){const st=S.st,C=V(-.35,1.5,-1.65);
  const fc=document.createElement('canvas');fc.width=fc.height=512;const g=fc.getContext('2d');g.fillStyle='#fffdf7';g.fillRect(0,0,512,512);
  for(let i=0;i<60;i++){const a=i*Math.PI/30,r1=i%5?236:224;g.strokeStyle=i%5?'#9aa1b3':INK;g.lineWidth=i%5?2:5;g.beginPath();g.moveTo(256+Math.sin(a)*r1,256-Math.cos(a)*r1);g.lineTo(256+Math.sin(a)*248,256-Math.cos(a)*248);g.stroke();}
  for(let i=1;i<=12;i++){const a=i*Math.PI/6;g.fillStyle=['#e2457a','#f08a24','#16a36f','#2f7de1','#8b5cf6'][i%5];g.font=ZS(62);g.textAlign='center';g.textBaseline='middle';g.fillText(String(i),256+Math.sin(a)*176,256-Math.cos(a)*176+4);
    g.fillStyle='#2f7de1';g.font='700 20px "Atkinson Hyperlegible", sans-serif';g.fillText(String(i*5%60).padStart(2,'0'),256+Math.sin(a)*212,256-Math.cos(a)*212);}
  const rimG=new THREE.CylinderGeometry(1.22,1.22,.24,64);rimG.rotateX(Math.PI/2);const rim=mk(rimG,lam('#16a36f'),30);rim.position.copy(C);grp.add(rim);
  const face=new THREE.Mesh(new THREE.CircleGeometry(1.08,64),new THREE.MeshLambertMaterial({map:new THREE.CanvasTexture(fc)}));face.position.copy(C);face.position.z+=.125;grp.add(face);
  [-.6,.6].forEach(x=>{const f=mk(new THREE.BoxGeometry(.25,.32,.3),lam('#0f7a52'),20);f.position.set(C.x+x,.16,C.z);grp.add(f);});
  const hp=new THREE.Group(),mp=new THREE.Group();hp.position.copy(C);hp.position.z+=.14;mp.position.copy(C);mp.position.z+=.17;grp.add(hp,mp);
  const hh=mk(new THREE.BoxGeometry(.1,.6,.03),lam(INK),0);hh.position.y=.24;hp.add(hh);const mh=mk(new THREE.BoxGeometry(.09,.92,.04),lam('#e2457a'),0);mh.position.y=.38;mp.add(mh);
  const knob=mk(new THREE.SphereGeometry(.09,14,10),lam('#e2457a'),0);knob.position.y=.82;mp.add(knob);
  const capG=new THREE.CylinderGeometry(.07,.07,.08,16);capG.rotateX(Math.PI/2);const cap=mk(capG,lam('#ffd24a'),0);cap.position.copy(C);cap.position.z+=.2;grp.add(cap);
  const dig=mk(new THREE.BoxGeometry(1.1,.5,.36),lam('#1b2236'),20);dig.position.set(1.55,.25,-.75);grp.add(dig);const dl=label('',{size:.26,color:'#7dffb0',font:'700 96px "Atkinson Hyperlegible", monospace'});dl.position.set(1.55,.3,-.5);grp.add(dl);
  let ha=-st.tm*.5*Math.PI/180,ma=-st.tm*6*Math.PI/180;const disp=()=>dl.userData.set(fmt(st.tm,st.pm));
  function check(){if(mode!=='play'||!st.want)return;const t=((st.tm%720)+720)%720;if(t===st.want%720)game.solved('Yes! The clock shows '+fmt(st.tm,st.pm).replace(/ [ap]\.m\./,'')+'.');}
  function add(d){st.tm+=d;disp();A.pop();check();A.redraw();}
  const hPlane=new THREE.Plane(V(0,0,1),0);let wC=V();
  A.drag(mp,{plane:hPlane,start:()=>{wC=grp.localToWorld(C.clone());hPlane.constant=-(wC.z+.17);},move:(pt)=>{const a=Math.atan2(pt.x-wC.x,pt.y-wC.y);const mins=Math.round((((a/(Math.PI*2))*60)+60)%60/5)*5%60;
      const curM=((st.tm%60)+60)%60;let diff=mins-curM;if(diff>30)diff-=60;if(diff<-30)diff+=60;if(diff){st.tm+=diff;disp();A.refresh();}},drop:()=>{A.pop();check();A.redraw();}});
  disp();hp.rotation.z=ha;mp.rotation.z=ma;
  return {tick(dt){const th=-st.tm*.5*Math.PI/180,tmn=-st.tm*6*Math.PI/180,k=Math.min(1,dt*8);ha+=(th-ha)*k;ma+=(tmn-ma)*k;hp.rotation.z=ha;mp.rotation.z=ma;},info:()=>fmt(st.tm,st.pm),
    controls:()=>[{t:'−1 hour',fn:()=>add(-60)},{t:'+1 hour',fn:()=>add(60)},{t:'−5 min',fn:()=>add(-5)},{t:'+5 min',go:true,fn:()=>add(5)},{t:st.pm?'p.m.':'a.m.',on:true,fn:()=>{st.pm=!st.pm;disp();A.redraw();}}],
    demo(n){if(n==='count5'){st.tm=3*60;disp();const l=[];for(let i=1;i<=12;i++)l.push([i===1?600:480,()=>{add(5);A.say(String(i*5)+(i===12?' minutes: one hour!':''));}]);A.seq(l);}
      if(n==='quarter'){st.tm=7*60;disp();A.seq([[700,()=>{add(15);A.say('Quarter past 7: 7:15');}],[1800,()=>{add(15);A.say('Half past 7: 7:30');}]]);}},
    task(r){const L=[[3*60+45,'Set the clock to *3:45*.'],[7*60+15,'Show *quarter past 7*.'],[11*60+30,'Show *half past 11*.'],[3*60+10,'What time is it *20 minutes after 2:50*? Set the clock.'],[8*60+55,'Show *5 minutes to 9*.']][r];
      st.want=L[0];st.tm=r===3?2*60+50:12*60;disp();return L[1];}};}
});

/* =========================================================
   22. Money and change
   ========================================================= */
const COINS=[{v:5,label:'5¢',r:.22,h:.05,col:'#cfd5de',sides:36,name:'nickel'},{v:10,label:'10¢',r:.19,h:.045,col:'#dadfe7',sides:36,name:'dime'},{v:25,label:'25¢',r:.25,h:.05,col:'#c7ced9',sides:36,name:'quarter'},
  {v:100,label:'$1',r:.27,h:.06,col:'#e6c15a',sides:11,name:'loonie'},{v:200,label:'$2',r:.29,h:.06,col:'#cfd5de',inner:'#e6c15a',sides:36,name:'toonie'},{v:500,label:'$5',bill:true,col:'#8db3ef',name:'$5 bill'},{v:1000,label:'$10',bill:true,col:'#c9a0e8',name:'$10 bill'}];
const money=c=>c<100?c+'¢':'$'+(c/100).toFixed(2);
const STORE=[{name:'Eraser',price:65},{name:'Pencil',price:45},{name:'Ruler',price:90},{name:'Juice box',price:200},{name:'Sticker book',price:400},{name:'Paint set',price:700},{name:'Notebook',price:300},{name:'Marker',price:85}];
P.lesson({id:'money',title:'Coins, bills and change',strand:'Financial Literacy',codes:['F1.1'],
 guide:{goal:'Estimate and calculate the change required for simple cash transactions involving whole-dollar amounts and amounts less than one dollar.',words:'coin, bill, nickel, dime, quarter, loonie, toonie, price, change, count up',
  ask:['Why is there no 1¢ coin?','How many quarters make a loonie?','Count up from 65¢ to $1. What jumps did you use?'],home:'Play store with real coins. Take turns being the cashier and count up to give change.'},
 learn:[{say:'Count up to find change.',speech:'To find your change, count up from the price to the money you paid. Watch: the eraser costs sixty-five cents and we pay with a loonie.',view:'model',demo:'buy'},
        {say:'Read about Canadian money.',speech:'Canada has nickels, dimes, quarters, loonies and toonies, and bills. There is no penny, so cash totals round to the nearest five cents.',view:'read'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: drag money to the tray.',speech:'Your turn. Drag coins and bills into the tray, or tap them. Then press pay.',view:'model'}],
 fig:'The class store. Drag money into the tray to pay.',rz:.85,
 explore:['*Drag* a coin or bill into the tray, or tap it.','Press *Pay*, then work out your change.','Tap a coin in the tray to take it back.'],
 tries:[['A marker costs 85¢. You pay $1. What is your change?','*15¢.* Count up: 85¢ → 90¢ → $1.00.'],['A notebook costs $3. You pay with a $5 bill. What is your change?','*$2.*'],['How many quarters make $2?','*8 quarters.* 4 quarters make $1.']],
 howTo:'Pay for the item by putting enough money in the tray, press Pay, then choose the right change.',
 init:k=>({item:0,paid:[],phase:'pay',opts:[],ch:0}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'Canada uses these coins and bills. There is no penny any more, so cash totals round to the nearest 5¢.')+16;
  const items=[['5¢','nickel','#cfd5de'],['10¢','dime','#dadfe7'],['25¢','quarter','#c7ced9'],['$1','loonie','#e6c15a'],['$2','toonie','#cfd5de'],['$5','bill','#8db3ef']];
  items.forEach(([v,n,c],i)=>{const x=X0+70+(i%3)*270,yy=y+70+Math.floor(i/3)*150;
    if(n==='bill'){rr(g,x-62,yy-36,124,72,8);g.fillStyle=c;g.fill();g.lineWidth=3;g.strokeStyle=INK;g.stroke();}
    else{g.beginPath();if(n==='loonie'){for(let k=0;k<11;k++){const a=k/11*Math.PI*2-Math.PI/2;k?g.lineTo(x+Math.cos(a)*52,yy+Math.sin(a)*52):g.moveTo(x+Math.cos(a)*52,yy+Math.sin(a)*52);}g.closePath();}else g.arc(x,yy,{nickel:46,dime:40,quarter:52,toonie:56}[n],0,Math.PI*2);
      g.fillStyle=c;g.fill();g.lineWidth=3;g.strokeStyle=INK;g.stroke();if(n==='toonie'){g.beginPath();g.arc(x,yy,31,0,Math.PI*2);g.fillStyle='#e6c15a';g.fill();g.stroke();}}
    T(g,v,x,yy+10,ZS(30),INK,'center');T(g,n,x+76,yy+10,FT.small,GREY);});y+=320;
  y=para(p,y,'To find *change*, count up from the price to the money you paid.')+20;
  const lx=X0+30,lw=TW-60,toX=v=>lx+(v-60)/40*lw;g.strokeStyle=INK;g.lineWidth=3;g.beginPath();g.moveTo(lx,y+70);g.lineTo(lx+lw,y+70);g.stroke();
  [[65,'65¢'],[75,'75¢'],[100,'$1.00']].forEach(([v,l])=>{const x=toX(v);g.strokeStyle=INK;g.beginPath();g.moveTo(x,y+58);g.lineTo(x,y+82);g.stroke();T(g,l,x,y+116,FT.smallB,INK,'center');});
  [[65,75,'+10¢','#16a36f'],[75,100,'+25¢','#e2457a']].forEach(([a,b,l,c])=>{const x1=toX(a),x2=toX(b);g.strokeStyle=c;g.lineWidth=4;g.beginPath();g.moveTo(x1,y+56);g.quadraticCurveTo((x1+x2)/2,y-8,x2,y+56);g.stroke();T(g,l,(x1+x2)/2,y+14,FT.hand,c,'center');});
  y+=154;T(g,'Price 65¢, you pay $1.00: change is 10¢ + 25¢ = 35¢',X0,y,FT.bodyB,acc());y+=44;
  predict(p,y,S,'p22','A pencil costs 45¢. You pay with a loonie. What is your change?','*55¢.* Count up: 45¢ → 50¢ → 75¢ → $1.00. That is 5¢ + 25¢ + 25¢.');},
 readout(p,S,y){const g=p.g,st=S.st,it=STORE[st.item],sum=st.paid.reduce((a,b)=>a+b,0);T(g,it.name+': '+money(it.price),X0,y+42,ZS(44),acc());
  T(g,'In the tray: '+money(sum)+(st.phase==='done'?'   ·   Change: '+money(st.ch):sum<it.price?'   ·   Need '+money(it.price-sum)+' more':'   ·   Enough! Press Pay.'),X0,y+86,FT.bodyB);return y+96;},
 build(S,grp,mode,game){const st=S.st;
  function capTex(bg,text){const c=document.createElement('canvas');c.width=c.height=128;const x=c.getContext('2d');x.fillStyle=bg;x.fillRect(0,0,128,128);x.strokeStyle='rgba(27,34,54,.35)';x.lineWidth=4;x.beginPath();x.arc(64,64,52,0,Math.PI*2);x.stroke();
    x.fillStyle=INK;x.font=ZS(50);x.textAlign='center';x.textBaseline='middle';x.fillText(text,64,68);return new THREE.CanvasTexture(c);}
  function coin(c){if(c.bill){const top=M('bill'+c.v,()=>{const cv=document.createElement('canvas');cv.width=128;cv.height=256;const x=cv.getContext('2d');x.fillStyle=c.col;x.fillRect(0,0,128,256);x.strokeStyle='rgba(27,34,54,.4)';x.lineWidth=5;x.strokeRect(10,10,108,236);x.fillStyle=INK;x.font=ZS(50);x.textAlign='center';x.textBaseline='middle';x.fillText(c.label,64,128);return new THREE.MeshLambertMaterial({map:new THREE.CanvasTexture(cv)});});
      const sd=lam(c.col);const m=mk(G('billg',()=>new THREE.BoxGeometry(.36,.02,.75)),[sd,sd,top,sd,sd,sd],20);m.userData.h=.02;return m;}
    const geo=G('coin2'+c.v,()=>new THREE.CylinderGeometry(c.r,c.r,c.h,c.sides));const top=c.inner?lam(c.col):M('ct2'+c.v,()=>new THREE.MeshLambertMaterial({map:capTex(c.col,c.label)}));
    const m=mk(geo,[lam(c.col),top,lam(c.col)],30);m.userData.h=c.h;if(c.inner){const it=M('ct2'+c.v,()=>new THREE.MeshLambertMaterial({map:capTex(c.inner,c.label)}));m.add(mk(G('cin2'+c.v,()=>new THREE.CylinderGeometry(c.r*.56,c.r*.56,c.h+.01,36)),[lam(c.inner),it,lam(c.inner)],30));}return m;}
  const TX=.75,TZ=-1.35;const tray=mk(new THREE.BoxGeometry(3.1,.06,1.5),lam('#ffe3ee'),20);tray.position.set(TX,.03,TZ);grp.add(tray);const tl=label('Tray',{size:.2});tl.position.set(TX,.25,TZ-.85);grp.add(tl);
  const colX=i=>TX-1.3+i*.43;const stacks=COINS.map(()=>[]);const inTray=p=>Math.abs(p.x-TX)<1.6&&Math.abs(p.z-TZ)<.8;
  COINS.forEach((c,i)=>{const m=coin(c);const hp=V(-2+i*.66,m.userData.h/2,.3);m.position.copy(hp);grp.add(m);let ghost=null;
    A.drag(m,{tap:()=>add(i),start:()=>{ghost=coin(c);ghost.position.copy(hp);grp.add(ghost);},move:pt=>{if(ghost)ghost.position.copy(grp.worldToLocal(pt));},drop:()=>{if(!ghost)return;const pos=ghost.position.clone();grp.remove(ghost);disposeObj(ghost);ghost=null;if(inTray(pos))add(i);}});});
  let item=null,tag=null,change=[];
  function model(name){const g=new THREE.Group();const col=VIBE[STORE.findIndex(s=>s.name===name)%6];
    if(name==='Pencil'||name==='Marker'){const b=mk(new THREE.CylinderGeometry(.08,.08,1.1,6),lam(col),30);b.rotation.z=Math.PI/2;b.position.y=.08;g.add(b);}
    else if(name==='Juice box'){const b=mk(new THREE.BoxGeometry(.5,.85,.36),lam(col),20);b.position.y=.42;g.add(b);const s=mk(new THREE.CylinderGeometry(.03,.03,.4,8),lam('#ff7a9c'),30);s.position.set(.12,.98,0);s.rotation.z=-.3;g.add(s);}
    else if(name==='Ruler'){const b=mk(new THREE.BoxGeometry(1.3,.05,.28),cellMat('#ffe07a',20,1),20);b.position.y=.03;g.add(b);}
    else if(name==='Eraser'){const b=mk(new THREE.BoxGeometry(.7,.28,.42),lam('#ff9fb5'),20);b.position.y=.14;g.add(b);}
    else{const b=mk(new THREE.BoxGeometry(.8,.12,.6),lam(col),20);b.position.y=.06;g.add(b);const s=mk(starGeo,lam('#ffcf3f'),20);s.rotation.x=-Math.PI/2;s.position.y=.17;g.add(s);}return g;}
  const sum=()=>st.paid.reduce((a,b)=>a+b,0);
  function place(i,drop){const c=COINS[i],m=coin(c),s=stacks[i];const y=.06+m.userData.h/2+s.reduce((a,o)=>a+o.userData.h,0);const p=V(colX(i),y,TZ);m.position.copy(p);if(drop)m.position.y+=1.2;m.rotation.y=Math.random()*.5;
    grp.add(m);moveTo(m,{pos:p,k:12});A.drag(m,{tap:()=>remove(i),drop:(pos)=>{if(inTray(pos))moveTo(m,{pos:p,k:10});else remove(i);}});s.push(m);st.paid.push(c.v);}
  function rebuildTray(){stacks.forEach(s=>{s.forEach(m=>{A.unclick(m);grp.remove(m);disposeObj(m);});s.length=0;});const saved=st.paid.slice();st.paid=[];saved.forEach(v=>place(COINS.findIndex(c=>c.v===v),false));}
  function add(i){if(st.phase!=='pay')return;if(st.paid.length>=16){A.bad('The tray is full.');return;}place(i,true);A.pop();A.redraw();}
  function remove(i){if(st.phase!=='pay')return;const s=stacks[i],m=s.pop();if(!m)return;A.unclick(m);st.paid.splice(st.paid.indexOf(COINS[i].v),1);moveTo(m,{scale:.01,k:16,done:()=>{grp.remove(m);disposeObj(m);}});A.redraw();}
  function loadItem(){if(item){grp.remove(item);disposeObj(item);}if(tag){grp.remove(tag);disposeObj(tag);}change.forEach(o=>{grp.remove(o);disposeObj(o);});change=[];const it=STORE[st.item];
    item=model(it.name);item.position.set(-1.45,0,-1.75);grp.add(item);tag=label(it.name+'  '+money(it.price),{size:.26,bg:'#ffffff'});tag.position.set(-1.45,1.3,-1.75);grp.add(tag);}
  function greedy(c){const o=[];[1000,500,200,100,25,10,5].forEach(v=>{while(c>=v){o.push(v);c-=v;}});return o;}
  function showChange(ch){greedy(ch).forEach((v,k)=>{const c=COINS.find(x=>x.v===v),m=coin(c);const p=V(-2.05+(k%5)*.5,m.userData.h/2,-.6+Math.floor(k/5)*.4);m.position.copy(p);m.position.y+=1.2+k*.15;grp.add(m);moveTo(m,{pos:p,k:9});change.push(m);});}
  function pay(){const it=STORE[st.item],s=sum();if(s<it.price){A.bad('Not enough yet. You need '+money(it.price-s)+' more.');return;}const ch=s-it.price;st.ch=ch;
    if(ch===0){st.phase='done';A.good('Exact amount! No change needed.');if(mode==='play')game.solved('You paid exactly '+money(it.price)+'!');A.redraw();return;}
    const step=ch>=100?100:5;const wrong=[];[ch+step,ch-step,ch+2*step,ch+25].forEach(w=>{if(w>0&&w!==ch&&wrong.length<2&&!wrong.includes(w))wrong.push(w);});st.opts=shuffle([ch].concat(wrong));st.phase='change';
    A.say('You paid '+money(s)+'. Count up from '+money(it.price)+'. What is your change?');A.redraw();}
  function pickCh(o){if(o===st.ch){st.phase='done';showChange(o);A.good('Correct! Your change is '+money(o)+'.');if(mode==='play')game.solved('Your change is '+money(o)+'!');}else A.bad('Not quite. Count up from the price to '+money(sum())+'.');A.redraw();}
  function newItem(i){st.item=i;st.paid=[];st.phase='pay';st.ch=0;rebuildTray();loadItem();A.redraw();}
  loadItem();rebuildTray();if(st.phase==='done'&&st.ch)showChange(st.ch);
  return {info:()=>STORE[st.item].name+' costs '+money(STORE[st.item].price)+' · tray '+money(sum()),
    controls:()=>{if(st.phase==='change')return st.opts.map(o=>({t:'Change: '+money(o),big:true,fn:()=>pickCh(o)}));if(st.phase==='done')return mode==='learn'?[{t:'Next item →',go:true,fn:()=>newItem((st.item+1)%STORE.length)}]:[];
      return [{t:'Pay',go:true,big:true,fn:pay},{t:'Empty tray',fn:()=>{st.paid=[];rebuildTray();A.redraw();}}].concat(mode==='learn'?[{t:'Next item →',fn:()=>newItem((st.item+1)%STORE.length)}]:[]);},
    demo(){newItem(0);A.seq([[800,()=>add(3)],[1000,pay],[1600,()=>A.say('Count up: 65 to 75 is 10 cents, 75 to 100 is 25 cents. Change: 35 cents.')],[2600,()=>pickCh(35)]]);},
    task(r){const order=[0,3,7,5,6];newItem(order[r]);return 'Buy the *'+STORE[st.item].name.toLowerCase()+'* for *'+money(STORE[st.item].price)+'*. Pay, then choose your change.';}};}
});
})();
