/* The Interactive Classroom: Grade 1 Math — Units 14–16: measuring with units, capacity, mass */
(function(){
"use strict";
const P=window.PM;if(!P||P.failed||!P.THREE||!P.K)return;
const {THREE,V,G,lam,mk,label,clearGroup,rr,T,wrap,header,keyWords,FT,ZS,X0,TW,INK,GREY,tint,A,hop,tween,moveTo,easeOut}=P;
const K=P.K,{rnd,pick,shuffle,choices,nearby,words,toy,lay,tag,mat,icon,icons,tbox,exGrid,bigText,hand,sub,nm,bx,cyl,sph,at}=K;
const acc=()=>P.ACC;const LET='ABCD';
const bar=(g,x,y,w,h,c)=>{rr(g,x,y,w,h,Math.min(8,h/2));g.fillStyle=c;g.fill();g.lineWidth=2;g.strokeStyle='rgba(27,34,54,.45)';g.stroke();};
const clip2d=(g,x,y,w)=>{rr(g,x+2,y,w-4,16,8);g.strokeStyle='#607d8b';g.lineWidth=3;g.stroke();rr(g,x+8,y+4,w-18,8,4);g.stroke();};
const crayon2d=(g,x,y,w,c)=>{rr(g,x,y,w*.82,18,4);g.fillStyle=c||'#2f7de1';g.fill();g.strokeStyle='rgba(27,34,54,.45)';g.lineWidth=2;g.stroke();K.poly(g,[x+w*.82,y,x+w-3,y+9,x+w*.82,y+18],c||'#2f7de1','rgba(27,34,54,.45)');};

/* =========================================================
   Unit 14 · Measuring with non-standard units
   ========================================================= */
function clip3d(){const g=new THREE.Group();const m=mk(G('k_clip',()=>new THREE.TorusGeometry(.1,.016,6,20)),lam('#90a4ae'),0);m.scale.set(1.45,.55,1);m.rotation.x=Math.PI/2;m.position.y=.02;g.add(m);return g;}
function crayon3d(c){const g=toy('crayon',{c,s:1.0});return g;}
const OBJ=[{k:'ribbon',c:'#ec407a'},{k:'snake',c:'#66bb6a'},{k:'rope',c:'#a1887f'},{k:'scarf',c:'#5c6bc0'}];
P.lesson({id:'units1',title:'Measuring with units',strand:'Spatial Sense',codes:['E2.1','E2.2'],
 guide:{goal:'Measure length, height, distance and area by laying same-size units end to end with no gaps, and tell the measure as a number of units, like "about 6 paper clips long".',words:'measure, unit, length, about, a bit more than, a bit less than, end to end, no gaps, cover, area',
  ask:['Why must the paper clips touch with no gaps?','Is a shoe or a crayon a better unit for measuring a rug?','Why do we get more hand spans than footsteps?'],home:'Measure the kitchen table with spoons, then with forks. Which number is bigger? Why?'},
 learn:[{say:'Measure with paper clips.',speech:'Line up the paper clips end to end, with no gaps. Count them. The ribbon is about six paper clips long.',view:'model',demo:'clips'}],
 fig:'Units laid end to end, steps and hand spans, and stickers that cover a card.',rz:.45,
 explore:['Press *Clips* or *Crayons* to measure.','Press *Steps* to compare big and small units.','Press *Cover* to measure area with stickers.'],
 howTo:'Count the units, then tap the answer.',
 init:k=>({view:'len',obj:0,len:6,unit:'clip',shown:99,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=tbox(p,y-10,250,'Measure with units');
  bar(g,X0+40,y,420,24,'#ec407a');for(let i=0;i<6;i++)clip2d(g,X0+40+i*70,y+40,70);for(let i=0;i<6;i++)T(g,String(i+1),X0+75+i*70,y+86,FT.smallB,GREY,'center');
  wrap(g,'Lay units *end to end*. *No gaps*, no overlaps. The ribbon is *6 paper clips* long.',X0+490,y+4,TW-500,34,{font:FT.small,bold:FT.smallB,boldColor:acc()});
  hand(g,'Not exactly? Say "about": a bit more than 4 crayons.',X0+40,y+150,INK);y+=190;
  y=tbox(p,y,230,'Big units, small units');
  for(let i=0;i<4;i++)K.ell(g,X0+70+i*110,y+10,40,18,'#8d6e63');for(let i=0;i<8;i++){K.ell(g,X0+60+i*55,y+56,20,13,'#ffcc80');}
  T(g,'4 steps',X0+520,y+18,FT.bodyB,INK);T(g,'8 hand spans',X0+520,y+64,FT.bodyB,INK);hand(g,'Bigger unit → fewer units!',X0+40,y+130,acc());y+=170;
  y=tbox(p,y,230,'Area: how much a surface covers');
  for(let r=0;r<3;r++)for(let c=0;c<4;c++){rr(g,X0+40+c*46,y+r*46,42,42,6);g.fillStyle='#fff3c4';g.fill();g.strokeStyle='#e09b00';g.lineWidth=2;g.stroke();}
  wrap(g,'Count the stickers that *cover* the card: *12 stickers*. More stickers means a bigger area.',X0+260,y+10,TW-280,34,{font:FT.small,bold:FT.smallB,boldColor:acc()});y+=170;
  y=exGrid(p,y,2,130,(i,x,yy,w,h)=>{
    if(i===0){T(g,'Better unit for a hallway?',x+56,yy+34,FT.smallB);hand(g,'skipping ropes, not erasers',x+40,yy+92,acc());}
    if(i===1){T(g,'A pencil, in crayons:',x+56,yy+34,FT.smallB);bar(g,x+30,yy+56,190,14,'#ffc04d');crayon2d(g,x+30,yy+80,64,'#ef5350');crayon2d(g,x+94,yy+80,64,'#ef5350');crayon2d(g,x+158,yy+80,64,'#ef5350');hand(g,'about 3',x+250,yy+92,INK);}
  });
  y=keyWords(p,y,[['unit','the same thing used again and again to measure'],['about','close to, but not exactly']]);return y;},
 readout(p,S,y){const g=p.g,st=S.st;let s='';if(st.view==='len'&&st.shown>=st.n)s='about '+st.n+' '+(st.unit==='clip'?'paper clips':'crayons')+' long';if(st.view==='steps')s=st.dist+' steps  ·  '+st.dist*2+' hand spans';if(st.view==='area'&&st.shown>=st.w*st.h)s=st.w*st.h+' stickers cover it';
  if(s)T(g,s,X0,y+54,ZS(42),acc());return y+70;},
 build(S,grp,mode,game){const st=S.st;const g2=K.stage(grp);
  function draw(){clearGroup(g2);
    if(st.view==='len'){mat(g2,4.4,1.8,0,-1.9,'#fff7e0');const u=st.unit==='clip'?.36:.62;const L=st.len*.36;const o=OBJ[st.obj];const x0=-2.0;
      const r=mk(new THREE.BoxGeometry(L,.06,.16),lam(o.c),20);r.position.set(x0+L/2,.03,-2.25);g2.add(r);if(o.k==='snake'){const h=sph(.1,o.c);h.position.set(x0+L,.06,-2.25);g2.add(h);}
      st.n=Math.round(L/u);for(let i=0;i<Math.min(st.shown,st.n);i++){const m=st.unit==='clip'?clip3d():crayon3d(K.VC(i+1));if(st.unit==='crayon'){m.position.set(x0+u*i+u/2-.03,0,-1.75);}else m.position.set(x0+u*i+u/2,0,-1.75);g2.add(m);
        const N=tag(String(i+1),{size:.18,bg:'#ffffff'});N.position.set(0,.3,.2);m.add(N);}}
    if(st.view==='steps'){mat(g2,4.4,1.9,0,-1.85,'#e8f5e9');const a=toy('flower',{s:1.6}),b=toy('ball',{s:1.4});a.position.set(-2.0,0,-2.2);b.position.set(2.0,0,-2.2);g2.add(a,b);
      const sw=3.6/st.dist;for(let i=0;i<st.dist;i++){const f=sph(.16,'#8d6e63');f.scale.set(1.3,.25,.65);f.position.set(-1.8+sw*(i+.5),.03,-2.2+(i%2?.12:-.12));g2.add(f);}
      for(let i=0;i<st.dist*2;i++){const h=sph(.09,'#ffcc80');h.scale.set(1.4,.25,1);h.position.set(-1.8+sw/2*(i+.5),.03,-1.45);g2.add(h);}
      [['steps',-2.2],['hand spans',-1.45]].forEach(([t,z])=>{const L=tag(t,{size:.2});L.position.set(0,.45,z-.05);g2.add(L);});}
    if(st.view==='area'){const s=.4;const cw=st.w*s,ch=st.h*s;const card=mk(new THREE.BoxGeometry(cw+.1,.04,ch+.1),lam('#bbdefb'),20);card.position.set(st.cmp?-1.1:0,.02,-1.9);g2.add(card);
      let k=0;for(let r=0;r<st.h;r++)for(let c=0;c<st.w;c++){if(k++>=st.shown)break;const t=bx(s*.92,.03,s*.92,'#ffe082');t.position.set((st.cmp?-1.1:0)-cw/2+s*(c+.5),.055,-1.9-ch/2+s*(r+.5));g2.add(t);}
      if(st.cmp){const s2=.4,w2=st.cmp[0],h2=st.cmp[1];const c2=mk(new THREE.BoxGeometry(w2*s2+.1,.04,h2*s2+.1),lam('#f8bbd0'),20);c2.position.set(1.15,.02,-1.9);g2.add(c2);
        for(let r=0;r<h2;r++)for(let c=0;c<w2;c++){const t=bx(s2*.92,.03,s2*.92,'#ffe082');t.position.set(1.15-w2*s2/2+s2*(c+.5),.055,-1.9-h2*s2/2+s2*(r+.5));g2.add(t);}
        [[-1.1,'A',ch],[1.15,'B',h2*s2]].forEach(([x,l,hh])=>{const L=tag(l,{size:.26});L.position.set(x,.5,-1.9-hh/2-.25);g2.add(L);});
        [[-1.1,0],[1.15,1]].forEach(([x,i])=>{const pad=mk(new THREE.BoxGeometry(1.8,.03,2),new THREE.MeshBasicMaterial({transparent:true,opacity:0,depthWrite:false}),0);pad.position.set(x,.1,-1.9);g2.add(pad);K.tapOn(pad,()=>tapCard(i));});}}
    A.redraw();}
  function tapCard(i){A.pop();A.say('ABCD'[i]);if(mode==='play'&&!st.setup&&st.wantC!=null){if(i===st.wantC)game.solved(st.okC);else A.bad('Count the stickers on each card.');}}
  function measure(unit){st.view='len';st.unit=unit||st.unit;st.shown=0;draw();A.seq([...Array(st.n)].map((_,i)=>[380,()=>{st.shown=i+1;draw();A.say(String(i+1));}]));}
  function cover(){st.view='area';st.cmp=null;st.shown=0;draw();A.seq([...Array(st.w*st.h)].map((_,i)=>[160,()=>{st.shown=i+1;draw();}]));}
  st.w=st.w||4;st.h=st.h||3;st.dist=st.dist||4;draw();
  return {info:()=>st.view+st.shown,
    controls:()=>{const c=[{t:'Clips',fn:()=>measure('clip')},{t:'Crayons',fn:()=>measure('crayon')},{t:'Steps',fn:()=>{st.view='steps';st.dist=rnd(3,5);draw();}},{t:'Cover',fn:()=>{st.w=rnd(3,5);st.h=rnd(2,4);cover();}},{t:'New',go:true,fn:()=>{st.obj=rnd(0,3);st.len=rnd(4,10);st.view='len';st.shown=0;draw();}}];
      if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);return c;},
    demo(n){st.ask=null;st.wantC=null;
      if(n==='clips'){st.obj=0;st.len=6;measure('clip');}if(n==='ribbon'){st.view='len';st.obj=0;st.len=6;st.unit='clip';st.shown=0;draw();}if(n==='clipsdone'){st.view='len';st.obj=0;st.len=6;st.unit='clip';st.shown=99;draw();}
      if(n==='crayons'){st.view='len';st.obj=1;st.len=9;st.unit='crayon';st.shown=99;draw();}
      if(n==='steps'){st.view='steps';st.dist=4;draw();}if(n==='area'){st.w=4;st.h=3;cover();}if(n==='areadone'){st.view='area';st.cmp=null;st.w=4;st.h=3;st.shown=99;draw();}},
    task(r){st.setup=true;st.ask=null;st.wantC=null;st.cmp=null;let txt;
      if(r===0){st.view='len';st.obj=rnd(0,3);st.unit='clip';st.len=rnd(4,10);st.shown=99;draw();st.ask={o:nearby(st.n,2,12),ans:st.n,ok:'Yes! About '+st.n+' paper clips long.'};txt='How many *paper clips* long is the '+OBJ[st.obj].k+'?';}
      else if(r===1){st.view='len';st.obj=rnd(0,3);st.unit='crayon';st.len=rnd(5,11);st.shown=99;draw();st.ask={o:nearby(st.n,1,8),ans:st.n,ok:'Yes! About '+st.n+' crayons long.'};txt='How many *crayons* long is the '+OBJ[st.obj].k+'? (Count, and say "about".)';}
      else if(r===2){const q=pick([['the length of a hallway','skipping ropes','erasers','skipping ropes'],['the height of a door','pencils','paper clips','pencils'],['the length of a bean','paper clips','footsteps','paper clips'],['the width of a playground','footsteps','crayons','footsteps']]);
        st.view='steps';st.dist=4;st.ask={o:shuffle([q[1],q[2]]),ans:q[3],ok:'Yes! '+q[3]+' are a good size for '+q[0]+'.'};txt='Which is the *better unit* to measure '+q[0]+'?';}
      else if(r===3){st.view='steps';st.dist=rnd(3,5);st.ask={o:['footsteps','hand spans'],ans:'hand spans',ok:'Yes! Hand spans are smaller, so we need more of them: '+st.dist*2+'.'};txt='Do we need *more* footsteps or more hand spans to go from the flower to the ball?';}
      else{st.view='area';const a=[rnd(3,4),rnd(2,3)],b=[rnd(2,5),rnd(2,4)];if(a[0]*a[1]===b[0]*b[1])b[1]=b[1]===4?3:b[1]+1;st.w=a[0];st.h=a[1];st.shown=99;st.cmp=b;st.wantC=a[0]*a[1]>b[0]*b[1]?0:1;st.okC='Yes! Card '+'AB'[st.wantC]+' needs more stickers, so it has a greater area.';txt='Which card has the *greater area*? Count the stickers. Tap the card.';}
      draw();st.setup=false;return txt;}};}
});

/* =========================================================
   Unit 15 · Capacity
   ========================================================= */
const CONT={glass:{cap:1,r:.13,h:.32,c:'#b3e5fc'},mug:{cap:2,r:.17,h:.3,c:'#ffcc80',handle:1},bottle:{cap:3,r:.15,h:.6,c:'#c8e6c9',neck:1},jug:{cap:5,r:.24,h:.55,c:'#e1bee7',handle:1},pot:{cap:7,r:.36,h:.42,c:'#b0bec5',handle:2},pail:{cap:9,r:.36,h:.55,c:'#ffab91',bail:1},tub:{cap:12,r:.55,h:.42,c:'#90caf9'}};
function container(k,fill,over){const d=CONT[k],g=new THREE.Group();const wall=new THREE.Mesh(new THREE.CylinderGeometry(d.r,d.r*.88,d.h,28,1,true),new THREE.MeshLambertMaterial({color:d.c,side:THREE.DoubleSide,transparent:true,opacity:.62}));wall.position.y=d.h/2;wall.castShadow=true;g.add(wall);
  const base=cyl(d.r*.88,d.r*.88,.02,d.c,28);base.position.y=.01;g.add(base);
  if(d.neck){const n=new THREE.Mesh(new THREE.CylinderGeometry(d.r*.4,d.r,.16,20,1,true),new THREE.MeshLambertMaterial({color:d.c,side:THREE.DoubleSide,transparent:true,opacity:.62}));n.position.y=d.h+.08;g.add(n);}
  if(d.handle){const h=mk(G('k_hd'+k,()=>new THREE.TorusGeometry(d.h*.28,.022,8,20,Math.PI)),lam(d.c),0);h.rotation.z=-Math.PI/2;h.position.set(d.r+.01,d.h*.55,0);g.add(h);if(d.handle===2){const h2=h.clone();h2.rotation.z=Math.PI/2;h2.position.x=-d.r-.01;g.add(h2);}}
  if(d.bail){const b=mk(G('k_bl'+k,()=>new THREE.TorusGeometry(d.r,.015,6,24,Math.PI)),lam('#78909c'),0);b.position.y=d.h;g.add(b);}
  if(fill>0){const f=Math.min(1,fill);const w=cyl(d.r*.86,d.r*.86*(1-f*.12)+d.r*.86*0,d.h*f*.96,'#42a5f5',24);w.material=new THREE.MeshLambertMaterial({color:'#42a5f5',transparent:true,opacity:.8});w.position.y=d.h*f*.48+.01;g.add(w);}
  if(over){const p=cyl(d.r*1.8,d.r*1.8,.01,'#64b5f6',24);p.position.y=.006;g.add(p);}
  g.userData.top=d.h+(d.neck?.2:0);g.userData.cont=k;return g;}
const CNAME=k=>({glass:'glass',mug:'mug',bottle:'bottle',jug:'jug',pot:'pot',pail:'pail',tub:'tub'})[k];
P.lesson({id:'capacity1',title:'Capacity: how much it holds',strand:'Spatial Sense',codes:['E2.1','E2.2'],
 guide:{goal:'Estimate and compare how much containers hold, and measure capacity by counting how many cups (or other same-size containers) fill it.',words:'capacity, holds more, holds less, the same, full, empty, overflow, cups, fill',
  ask:['Which holds more, a bathtub or a sink?','If water spills over, what does that tell you?','How many cups of water fill a jug at your house?'],home:'At bath time, fill a big cup with small cups of water. Count how many it takes!'},
 learn:[{say:'Pour and see!',speech:'Pour the full jug into the bottle. Oh no, it spills over! So the jug holds more than the bottle.',view:'model',demo:'pour'}],
 fig:'Containers to compare, a pour test, and cups that fill a container.',rz:.45,
 explore:['*Tap* a container to fill it.','Press *Pour* to pour one into another.','Press *Cups* to fill with cups.'],
 howTo:'Tap the container the question asks for, or count the cups and tap the answer.',
 init:k=>({view:'cmp',set:['glass','jug','pail'],fill:[0,0,0],ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=tbox(p,y-10,240,'Capacity is how much a container holds');
  const cont2d=(x,yb,w,h,c,f)=>{rr(g,x,yb-h,w,h,10);g.fillStyle=c;g.fill();if(f){rr(g,x+4,yb-h*f,w-8,h*f-4,8);g.fillStyle='#64b5f6';g.fill();}rr(g,x,yb-h,w,h,10);g.strokeStyle='rgba(27,34,54,.5)';g.lineWidth=2;g.stroke();};
  cont2d(X0+40,y+130,50,70,'#b3e5fc',.8);cont2d(X0+130,y+130,80,110,'#e1bee7',.8);cont2d(X0+250,y+130,120,140,'#ffab91',.8);
  T(g,'holds less',X0+40,y+170,FT.small,GREY);T(g,'holds the most',X0+250,y+170,FT.smallB,acc());
  wrap(g,'A bigger container usually *holds more*. To be sure, test it.',X0+420,y+30,TW-430,34,{font:FT.body,bold:FT.bodyB,boldColor:acc()});y+=200;
  y=tbox(p,y,250,'Two ways to test');
  T(g,'1. Pour',X0+30,y+6,FT.bodyB,INK);cont2d(X0+40,y+150,70,100,'#e1bee7',.9);T(g,'→',X0+130,y+100,ZS(40),GREY);cont2d(X0+180,y+150,50,70,'#c8e6c9',1);K.ell(g,X0+205,y+156,60,10,'#90caf9');hand(g,'It spills: the jug holds more.',X0+260,y+110,INK);
  T(g,'2. Count cups',X0+30,y+190,FT.bodyB,INK);for(let i=0;i<5;i++)cont2d(X0+250+i*56,y+210,40,44,'#b3e5fc',.9);hand(g,'The jug holds 5 cups.',X0+540,y+196,INK);y+=270;
  y=exGrid(p,y,2,150,(i,x,yy,w,h)=>{
    if(i===0){T(g,'Which holds more?',x+56,yy+34,FT.smallB);cont2d(x+60,yy+130,46,60,'#b3e5fc',.6);cont2d(x+180,yy+130,110,90,'#90caf9',.6);K.line(g,[x+300,yy+90,x+320,yy+110,x+350,yy+70],'#16a36f',6);}
    if(i===1){wrap(g,'A pot holds 6 cups. The pail holds 2 more. How many?',x+56,yy+40,w-80,30,{font:FT.small,bold:FT.smallB});hand(g,'6 + 2 = 8 cups',x+56,yy+130,acc());}
  });
  y=keyWords(p,y,[['capacity','how much a container can hold'],['overflow','when there is too much and it spills over']]);return y;},
 readout(p,S,y){const g=p.g,st=S.st;let s='';if(st.view==='cups'&&st.poured>=CONT[st.set[0]].cap)s='The '+CNAME(st.set[0])+' holds '+CONT[st.set[0]].cap+' cups.';if(st.view==='pour'&&st.done)s=st.spill?'It spills over! The '+CNAME(st.set[0])+' holds more.':'Not full! The '+CNAME(st.set[1])+' holds more.';
  if(s)wrap(g,s,X0,y+48,TW,40,{font:FT.bodyB,bold:FT.bodyB,color:acc()});return y+70;},
 build(S,grp,mode,game){const st=S.st;const g2=K.stage(grp);
  function draw(){clearGroup(g2);
    if(st.view==='cmp'){const n=st.set.length;st.set.forEach((k,i)=>{const c=container(k,st.fill[i]||0);c.scale.setScalar(1.5);c.position.set((i-(n-1)/2)*1.4,0,-1.9);g2.add(c);const L=tag(LET[i],{size:.24});L.position.set(0,c.userData.top+.2,0);c.add(L);K.tapOn(c,()=>tap(i));});}
    if(st.view==='pour'){const [a,b]=st.set;const ca=container(a,st.done?0:1),cb=container(b,st.done?Math.min(1,CONT[a].cap/CONT[b].cap):0,st.done&&st.spill);ca.scale.setScalar(1.5);cb.scale.setScalar(1.5);ca.position.set(-1.1,0,-1.9);cb.position.set(1.0,0,-1.9);if(st.tilt){ca.position.set(.35,.9,-1.9);ca.rotation.z=-1.9;}g2.add(ca,cb);
      [[ca,'A'],[cb,'B']].forEach(([c,l],i)=>{if(!(st.tilt&&i===0)){const L=tag(l,{size:.24});L.position.set(0,c.userData.top+.2,0);c.add(L);}K.tapOn(c,()=>tap(i));});}
    if(st.view==='cups'){const k=st.set[0];const c=container(k,st.poured/CONT[k].cap);c.scale.setScalar(1.6);c.position.set(-1.3,0,-2.0);g2.add(c);const cap=CONT[k].cap;
      for(let i=0;i<cap;i++){const cu=container('glass',i<st.poured?0:1);cu.position.set(-.3+(i%6)*.42,0,-2.4+Math.floor(i/6)*.55);g2.add(cu);if(i<st.poured){const N=tag(String(i+1),{size:.17});N.position.y=.48;cu.add(N);}}}
    A.redraw();}
  function tap(i){A.pop();if(st.view==='cmp'){st.fill[i]=1;draw();}A.say(LET[i]);if(mode==='play'&&!st.setup&&st.want){if(st.want(i))game.solved(st.wantOk);else A.bad(st.hint||'Which one could hold more water?');}}
  function pour(){st.view='pour';st.done=false;st.tilt=false;st.spill=CONT[st.set[0]].cap>CONT[st.set[1]].cap;draw();A.seq([[700,()=>{st.tilt=true;draw();}],[900,()=>{st.tilt=false;st.done=true;draw();A.say(st.spill?'It spills over!':'Not full yet!');}]]);}
  function cups(){st.view='cups';st.poured=0;draw();A.seq([...Array(CONT[st.set[0]].cap)].map((_,i)=>[380,()=>{st.poured=i+1;draw();A.say(String(i+1));}]));}
  draw();
  return {info:()=>st.view+st.set.join()+(st.poured||'')+(st.done?'d':''),
    controls:()=>{const c=[{t:'Compare',fn:()=>{st.view='cmp';st.set=shuffle(Object.keys(CONT)).slice(0,3);st.fill=[0,0,0];draw();}},{t:'Pour',fn:()=>{st.set=shuffle(['bottle','jug','mug','pot']).slice(0,2);pour();}},{t:'Cups',go:true,fn:()=>{st.set=[pick(['mug','bottle','jug','pot'])];cups();}}];
      if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);return c;},
    demo(n){st.ask=null;st.want=null;
      if(n==='cmp'){st.view='cmp';st.set=['glass','jug','pail'];st.fill=[1,1,1];draw();}if(n==='pour'){st.set=['jug','bottle'];pour();}
      if(n==='poured'){st.view='pour';st.set=['jug','bottle'];st.spill=true;st.done=true;st.tilt=false;draw();}
      if(n==='cups'){st.set=['jug'];cups();}if(n==='cupsdone'){st.view='cups';st.set=['jug'];st.poured=5;draw();}},
    task(r){st.setup=true;st.ask=null;st.want=null;let txt;const keys=Object.keys(CONT);
      if(r===0){const s=shuffle(keys).slice(0,2);st.view='cmp';st.set=s;st.fill=[0,0];const b=CONT[s[0]].cap>CONT[s[1]].cap?0:1;st.want=i=>i===b;st.wantOk='Yes! The '+CNAME(s[b])+' holds more.';txt='Tap the one with the *greater capacity*.';}
      else if(r===1){const s=shuffle(keys).slice(0,3);st.view='cmp';st.set=s;st.fill=[0,0,0];const caps=s.map(k=>CONT[k].cap);const most=pick([true,false]);const b=caps.indexOf(most?Math.max(...caps):Math.min(...caps));st.want=i=>i===b;st.wantOk='Yes! The '+CNAME(s[b])+' holds the '+(most?'most':'least')+'.';txt='Tap the one that holds the *'+(most?'most':'least')+'*.';}
      else if(r===2){st.set=shuffle(['bottle','jug','mug','pot','glass']).slice(0,2);if(CONT[st.set[0]].cap===CONT[st.set[1]].cap)st.set=['jug','mug'];st.view='pour';st.spill=CONT[st.set[0]].cap>CONT[st.set[1]].cap;st.done=true;st.tilt=false;
        st.ask={o:['A','B'],ans:st.spill?'A':'B',ok:st.spill?'Yes! It spilled, so A holds more.':'Yes! B is not full, so B holds more.'};txt='All the water in A was poured into B. Look! Which holds *more*?';}
      else if(r===3){st.view='cups';st.set=[pick(['mug','bottle','jug','pot','pail'])];st.poured=CONT[st.set[0]].cap;const c=st.poured;st.ask={o:nearby(c,1,12),ans:c,ok:'Yes! The '+CNAME(st.set[0])+' holds '+c+' cups.'};txt='How many *cups* does the '+CNAME(st.set[0])+' hold?';}
      else{const a=rnd(3,7),b=rnd(1,3);st.view='cups';st.set=['pot'];st.poured=CONT.pot.cap;st.ask={o:nearby(a+b,2,12),ans:a+b,ok:'Yes! '+a+' + '+b+' = '+(a+b)+' boxes.'};txt='It takes '+a+' boxes of juice to fill a punch bowl. A bigger bowl holds '+b+' more boxes. How many boxes fill the bigger bowl?';}
      draw();st.setup=false;return txt;}};}
});

/* =========================================================
   Unit 16 · Mass
   ========================================================= */
const W8={acorn:1,cupcake:2,ball:2,apple:3,duck:4,bell:4,turtle:5,car:6,block:1,leaf:.2,balloon:.1};
function panBalance(grp){const b=new THREE.Group();b.position.set(0,0,-1.9);grp.add(b);const base=bx(.9,.06,.4,'#8d6e63');base.position.y=.03;b.add(base);const post=cyl(.04,.05,.9,'#8d6e63',10);post.position.y=.48;b.add(post);
  const beam=new THREE.Group();beam.position.y=.93;b.add(beam);const bar=bx(3.0,.06,.08,'#a1887f');beam.add(bar);const pans=[-1,1].map(s=>{const p=new THREE.Group();b.add(p);const pan=cyl(.5,.42,.06,'#cfd8dc',28);p.add(pan);[-1,1].forEach(q=>{const st=cyl(.008,.008,.5,'#90a4ae',4);st.position.set(q*.35,.27,0);st.rotation.z=-q*.6;p.add(st);});return p;});
  function tilt(a){beam.rotation.z=a;pans.forEach((p,i)=>{const s=i?1:-1;p.position.set(s*1.45*Math.cos(a),.93+s*1.45*Math.sin(a)-.55,0);});}
  tilt(0);return {pans,tilt};}
P.lesson({id:'mass1',title:'Mass: heavier and lighter',strand:'Spatial Sense',codes:['E2.1','E2.2'],
 guide:{goal:'Compare and order objects by mass with a balance, and measure mass by counting how many same-size blocks balance an object.',words:'mass, heavy, heavier, heaviest, light, lighter, lightest, balance, level, about the same',
  ask:['How does a balance show which is heavier?','Is something big always heavy?','How many blocks balance your shoe?'],home:'Hold two things, one in each hand. Guess which is heavier. Then check with a homemade hanger balance.'},
 learn:[{say:'Balance it with blocks.',speech:'Put the duck on the balance. Add blocks until the balance is level: one, two, three, four. The duck has the same mass as four blocks.',view:'model',demo:'blocks'}],
 fig:'A pan balance with toys and blocks.',rz:.45,
 explore:['Press *+ block* and *− block* until it is *level*.','Press *Compare* to weigh two toys.','The *heavier* side goes *down*.'],
 howTo:'Look at the balance. Tap the right toy, put toys in order, or add blocks until it is level.',
 init:k=>({view:'blocks',L:'duck',R:null,nb:0,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=tbox(p,y-10,280,'A balance compares mass');
  const bal=(x,yy,ang,l,r,lb)=>{g.save();g.translate(x,yy);g.fillStyle='#8d6e63';g.fillRect(-4,0,8,70);g.rotate(ang);g.fillStyle='#a1887f';g.fillRect(-110,-4,220,8);g.restore();
    [-1,1].forEach(s=>{const px=x+s*104*Math.cos(ang),py=yy+s*104*Math.sin(ang)+34;K.ell(g,px,py,44,8,'#b0bec5');if(s<0&&l)icon(g,l,px,py-24,44);if(s>0&&r)icon(g,r,px,py-24,44);if(s>0&&lb)for(let i=0;i<lb;i++){rr(g,px-34+(i%4)*18,py-14-Math.floor(i/4)*18,16,16,3);g.fillStyle='#8b5cf6';g.fill();}});};
  bal(X0+150,y+40,.22,'car','apple');T(g,'down = heavier',X0+60,y+180,FT.smallB,INK);bal(X0+520,y+40,0,'duck',null,4);T(g,'level = the same mass',X0+410,y+180,FT.smallB,INK);hand(g,'The duck is as heavy as 4 blocks.',X0+410,y+212,acc());y+=250;
  y=exGrid(p,y,4,150,(i,x,yy,w,h)=>{
    if(i===0){T(g,'Lightest to heaviest',x+56,yy+34,FT.smallB);['acorn','apple','car'].forEach((k,j)=>{icon(g,k,x+60+j*110,yy+90,56);T(g,String(j+1),x+60+j*110,yy+140,FT.bodyB,acc(),'center');});}
    if(i===1){T(g,'Big is not always heavy!',x+56,yy+34,FT.smallB);icon(g,'balloon',x+80,yy+96,80);T(g,'<',x+160,yy+110,ZS(34),GREY);icon(g,'acorn',x+220,yy+104,50);hand(g,'lighter',x+270,yy+110,acc());}
    if(i===2){wrap(g,'Heavier than 4 blocks and lighter than 6 blocks?',x+56,yy+40,w-80,30,{font:FT.small,bold:FT.smallB});hand(g,'5 blocks',x+56,yy+130,acc());}
    if(i===3){T(g,'Blocks to balance:',x+56,yy+34,FT.smallB);hand(g,'apple 3, turtle 5',x+56,yy+92,INK);hand(g,'turtle is heavier',x+56,yy+134,acc());}
  });
  y=keyWords(p,y,[['mass','how heavy something is'],['level','flat, not tipped: both sides have the same mass']]);return y;},
 readout(p,S,y){const g=p.g,st=S.st;let s='';if(st.view==='blocks'){const m=W8[st.L]||1;s=st.nb===m?'Level! The '+st.L+' = '+m+' blocks':st.nb<m?st.nb+' blocks: the '+st.L+' is heavier':st.nb+' blocks: the blocks are heavier';}
  else if(st.view==='pair'){const a=W8[st.L],b=W8[st.R];s=a===b?'Level: the same mass':'The '+(a>b?st.L:st.R)+' is heavier';}
  if(s)wrap(g,s,X0,y+48,TW,40,{font:FT.bodyB,bold:FT.bodyB,color:acc()});return y+70;},
 build(S,grp,mode,game){const st=S.st;const g2=K.stage(grp);
  function draw(){clearGroup(g2);
    if(st.view==='order'){K.mat(g2,4.4,1.9,0,-1.85,'#fff7e0');st.set.forEach((k,i)=>{const t=toy(k,{s:1.8});t.position.set((i-1)*1.35,0,-1.9);g2.add(t);const L=tag(LET[i],{size:.24});L.position.y=.5;t.add(L);K.tapOn(t,()=>tap(i));const oi=st.order.indexOf(i);if(oi>=0){const b=tag(String(oi+1),{size:.2,bg:'#ffd54f',border:'#e09b00'});b.position.set(.2,.35,0);t.add(b);}});A.redraw();return;}
    const pb=panBalance(g2);const mL=W8[st.L]||1,mR=st.view==='blocks'?st.nb*W8.block:(W8[st.R]||1);const d=mL-mR;pb.tilt(Math.max(-.2,Math.min(.2,-d*.05)));
    const tl=toy(st.L,{s:1.5});tl.position.y=.04;pb.pans[0].add(tl);K.tapOn(tl,()=>tap(0));const LL=tag(st.view==='pair'?'A':st.L,{size:.2});LL.position.y=.55;tl.add(LL);
    if(st.view==='blocks'){for(let i=0;i<st.nb;i++){const b=bx(.2,.2,.2,'#8b5cf6');b.position.set(-.24+(i%3)*.24,.13+Math.floor(i/3)*.21,0);pb.pans[1].add(b);}}
    else{const tr=toy(st.R,{s:1.5});tr.position.y=.04;pb.pans[1].add(tr);K.tapOn(tr,()=>tap(1));const LR=tag('B',{size:.2});LR.position.y=.55;tr.add(LR);}
    A.redraw();}
  function tap(i){A.pop();if(st.view==='order'){if(st.order.includes(i))return;st.order.push(i);draw();if(st.order.length===3){const ok=st.order.every((k,j)=>k===st.seq[j]);if(mode==='play'&&!st.setup){if(ok)game.solved('Yes! Lightest to heaviest: '+st.seq.map(k=>st.set[k]).join(', ')+'.');else{A.bad('Hmm. Which one would be lightest? Try again!');st.order=[];A.later(draw,700);}}}return;}
    A.say(i?'B':'A');if(mode==='play'&&!st.setup&&st.want){if(st.want(i))game.solved(st.wantOk);else A.bad('The heavier side goes down.');}}
  function blocks(d){const n=st.nb+d;if(n<0||n>9){A.bad(n<0?'No blocks left.':'That is plenty of blocks!');return;}st.nb=n;A.pop();draw();A.say(String(n));
    if(mode==='play'&&!st.setup&&st.need&&st.nb===(W8[st.L]||1))A.later(()=>game.solved('Yes! Level! The '+st.L+' has the same mass as '+st.nb+' blocks.'),400);}
  draw();
  return {info:()=>st.view+st.L+st.R+st.nb+(st.order||[]).join(),
    controls:()=>{const c=st.view==='blocks'?[{t:'+ block',go:true,fn:()=>blocks(1)},{t:'− block',fn:()=>blocks(-1)},{t:'New toy',fn:()=>{st.L=pick(['apple','duck','bell','turtle','car','ball']);st.nb=0;draw();}},{t:'Compare',fn:()=>{st.view='pair';const p=shuffle(['apple','duck','car','acorn','turtle','balloon','ball']).slice(0,2);st.L=p[0];st.R=p[1];draw();}}]
      :[{t:'Blocks',fn:()=>{st.view='blocks';st.L='duck';st.nb=0;draw();}},{t:'New pair',go:true,fn:()=>{st.view='pair';const p=shuffle(['apple','duck','car','acorn','turtle','balloon','ball']).slice(0,2);st.L=p[0];st.R=p[1];draw();}}];
      if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);return c;},
    demo(n){st.ask=null;st.want=null;st.need=false;
      if(n==='blocks'){st.view='blocks';st.L='duck';st.nb=0;draw();A.seq([1,2,3,4].map(()=>[600,()=>blocks(1)]));}if(n==='duck0'){st.view='blocks';st.L='duck';st.nb=0;draw();}if(n==='duck4'){st.view='blocks';st.L='duck';st.nb=4;draw();}
      if(n==='carapple'){st.view='pair';st.L='car';st.R='apple';draw();}if(n==='balloon'){st.view='pair';st.L='balloon';st.R='acorn';draw();}
      if(n==='order'){st.view='order';st.set=['car','acorn','apple'];st.order=[];st.seq=[1,2,0];draw();}if(n==='ordered'){st.view='order';st.set=['car','acorn','apple'];st.order=[1,2,0];draw();}},
    task(r){st.setup=true;st.ask=null;st.want=null;st.need=false;let txt;
      if(r===0){st.view='pair';let p;do{p=shuffle(['apple','duck','car','acorn','turtle','balloon','cupcake']).slice(0,2);}while(W8[p[0]]===W8[p[1]]);st.L=p[0];st.R=p[1];const lite=pick([true,false]);const h=W8[p[0]]>W8[p[1]]?0:1;const t=lite?1-h:h;st.want=i=>i===t;st.wantOk='Yes! The '+p[t]+' is '+(lite?'lighter':'heavier')+'.';txt='Look at the balance. Tap the *'+(lite?'lighter':'heavier')+'* toy.';}
      else if(r===1){st.view='order';let s;do{s=shuffle(['acorn','apple','turtle','car','balloon','duck']).slice(0,3);}while(new Set(s.map(k=>W8[k])).size<3);st.set=s;st.order=[];st.seq=[0,1,2].sort((a,b)=>W8[s[a]]-W8[s[b]]);txt='Tap the toys in order from *lightest* to *heaviest*.';}
      else if(r===2){st.view='blocks';st.L=pick(['apple','duck','turtle','car','cupcake']);st.nb=W8[st.L];const m=st.nb;st.ask={o:nearby(m,1,8),ans:m,ok:'Yes! The '+st.L+' has the same mass as '+m+' blocks.'};txt='The balance is level. How many blocks is the *'+st.L+'* as heavy as?';}
      else if(r===3){st.view='blocks';st.L=pick(['apple','duck','turtle','car','bell']);st.nb=0;st.need=true;txt='Add blocks until the balance is *level*.';}
      else{const a=rnd(1,5);st.view='blocks';st.L=({2:'ball',3:'apple',4:'duck',5:'turtle',6:'car'})[a+1];st.nb=0;st.ask={o:nearby(a+1,1,9),ans:a+1,ok:'Yes! '+(a+1)+' is between '+a+' and '+(a+2)+'.'};txt='A teddy bear is heavier than *'+a+'* blocks but lighter than *'+(a+2)+'* blocks. How many blocks balance it?';}
      draw();st.setup=false;return txt;}};}
});
})();
