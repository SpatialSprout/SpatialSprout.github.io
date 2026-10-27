/* The Interactive Classroom: Grade 1 Math — Units 1–4: comparing, ordering, sorting, sequencing */
(function(){
"use strict";
const P=window.PM;if(!P||P.failed||!P.THREE||!P.K)return;
const {THREE,V,G,lam,mk,label,clearGroup,rr,T,wrap,para,header,keyWords,FT,ZS,X0,TW,INK,GREY,tint,A,hop,tween,moveTo,easeOut}=P;
const K=P.K,{rnd,pick,shuffle,choices,toy,lay,crossOut,tag,card,mat,icon,icons,xMark,tbox,exGrid,bigText,hand,sub,bx,sph,cyl,at,ORD,ORDW}=K;
const acc=()=>P.ACC;
const LET='ABCD';const COLS=['#ff6b35','#2f7de1','#5fd38a','#8b5cf6','#ffc04d','#ec407a'];
const check=(g,x,y,s,c)=>{K.line(g,[x-s*.4,y,x-s*.1,y+s*.32,x+s*.45,y-s*.38],c||'#16a36f',s*.14);};
const ring=(g,x,y,rx,ry)=>{g.beginPath();g.ellipse(x,y,rx,ry,0,0,Math.PI*2);g.strokeStyle='#e4572e';g.lineWidth=4;g.stroke();};
const bar=(g,x,y,w,h,c)=>{rr(g,x,y,w,h,Math.min(8,h/2));g.fillStyle=c;g.fill();g.lineWidth=2;g.strokeStyle='rgba(27,34,54,.45)';g.stroke();};
const tower2d=(g,x,yb,n,s,c)=>{for(let i=0;i<n;i++)bar(g,x,yb-(i+1)*s,s,s-2,c);};

/* ---------- a line-up of things to compare: size, height, length, width, thickness ---------- */
function lineup(grp,attr,vals,o){o=o||{};const n=vals.length,items=[];const gap=attr==='length'||attr==='width'?0:(o.gap||(n>3?1.0:1.25));
  vals.forEach((v,i)=>{const it=new THREE.Group();const col=(o.cols||COLS)[i%COLS.length];let top=.5;
    if(attr==='size'){const t=toy(o.kind||'ball',{c:col,s:v*1.6});it.add(t);top=.36*v*1.6+.1;}
    else if(attr==='height'){for(let k=0;k<v;k++){const c=K.bx(.34,.3,.34,col);c.position.y=.15+k*.31;it.add(c);}top=v*.31+.12;}
    else if(attr==='length'){const r=mk(new THREE.BoxGeometry(v*.4,.06,.22),lam(col),20);r.position.set(v*.2,.03,0);it.add(r);top=.25;}
    else if(attr==='width'){const r=mk(new THREE.BoxGeometry(2.4,.05,v*.12),lam(col),20);r.position.set(1.2,.025,0);it.add(r);top=.2;}
    else if(attr==='thick'){for(let k=0;k<v;k++){const b=K.bx(.9,.07,.6,k%2?'#ffffff':col);b.position.y=.035+k*.07;it.add(b);}top=v*.07+.15;}
    if(attr==='length'||attr==='width'){it.position.set(-1.7,0,(o.z0==null?-2.7:o.z0)+i*(attr==='width'?.7:.5));}
    else it.position.set((i-(n-1)/2)*gap,0,o.z==null?-1.8:o.z);
    const L=tag(LET[i],{size:.26,border:col});L.position.set(attr==='length'||attr==='width'?-.25:0,attr==='length'||attr==='width'?.2:top+.2,attr==='length'||attr==='width'?0:0);it.add(L);
    it.userData.i=i;it.userData.v=v;it.userData.top=top;grp.add(it);items.push(it);});
  return items;}
function numBadge(it,n){if(it.userData.nb){it.remove(it.userData.nb);it.userData.nb=null;}if(n==null)return;const b=tag(String(n),{size:.3,bg:'#ffd54f',border:'#e09b00'});
  b.position.set(it.userData.L?0:.32,it.userData.top+.25,0);it.add(b);it.userData.nb=b;}

/* =========================================================
   Unit 1 · Comparison
   ========================================================= */
P.lesson({id:'compare1',title:'Comparing: bigger, taller, longer',strand:'Spatial Sense',codes:['E2.1','E2.2'],
 guide:{goal:'Compare and order objects by size, height and length, using words like bigger, biggest, taller, tallest, longer and longest.',words:'big, bigger, biggest, small, smaller, smallest, tall, taller, tallest, short, shorter, shortest, long, longer, longest, same',
  ask:['Which is taller, you or the door?','How can you tell which ribbon is longer?','When do we say "taller" and when do we say "tallest"?'],home:'Line up three shoes from shortest to longest. Then line up three spoons from smallest to biggest.'},
 learn:[{say:'Watch: line them up!',speech:'Watch the model. To compare length, we line up the ends first. Then we can see which one is longest.',view:'model',demo:'lineup'}],
 fig:'Things to compare: balls, towers and ribbons.',rz:.45,
 explore:['Press *Size*, *Height* or *Length*.','*Tap* a thing to hear its letter.','Press *New* for different things.'],
 howTo:'Read the question. Tap the right thing on the model. To put things in order, tap them one by one.',
 init:k=>({attr:'height',vals:[3,5,2],order:[],want:null,seq:null,ask:null,msg:''}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=tbox(p,y-10,420,'Compare two or more things');
  const rows=[['bigger','biggest',(x,yy)=>{[22,32,44].forEach((r,i)=>icon(g,'ball',x+40+i*92,yy-r+10,r*1.9,'#2f7de1'));}],
              ['taller','tallest',(x,yy)=>{[2,3,4].forEach((n,i)=>tower2d(g,x+20+i*92,yy+12,n,26,'#5fd38a'));}],
              ['longer','longest',(x,yy)=>{[90,140,190].forEach((w,i)=>bar(g,x+10,yy-56+i*28,w,18,'#ff6b35'));}]];
  rows.forEach(([a,b,draw],i)=>{const yy=y+40+i*110;draw(X0+24,yy);T(g,['big','tall','long'][i],X0+330,yy-24,FT.small,GREY);
    T(g,a,X0+330,yy+14,FT.bodyB,INK);T(g,b,X0+560,yy+14,FT.bodyB,acc());});
  T(g,'2 things: use -er',X0+330,y+340,FT.smallB,INK);T(g,'3 or more: use -est',X0+560,y+340,FT.smallB,acc());y+=370;
  y=exGrid(p,y,4,190,(i,x,yy,w,h)=>{
    if(i===0){T(g,'Which is bigger?',x+56,yy+34,FT.smallB);icon(g,'apple',x+100,yy+110,60);icon(g,'apple',x+230,yy+104,100);ring(g,x+230,yy+104,58,58);}
    if(i===1){T(g,'Which is taller?',x+56,yy+34,FT.smallB);tower2d(g,x+80,yy+170,3,32,'#8b5cf6');tower2d(g,x+220,yy+170,4,32,'#ffc04d');check(g,x+330,yy+90,40);}
    if(i===2){T(g,'Which is longer?',x+56,yy+34,FT.smallB);bar(g,x+30,yy+70,180,22,'#2f7de1');bar(g,x+30,yy+120,300,22,'#ec407a');check(g,x+360,yy+130,36);T(g,'line up the ends!',x+30,yy+176,FT.cap,GREY);}
    if(i===3){T(g,'Shortest to longest',x+56,yy+34,FT.smallB);[[180,'A'],[80,'B'],[130,'C']].forEach(([w,l],k)=>{T(g,l,x+24,yy+80+k*36,FT.smallB,INK);bar(g,x+56,yy+64+k*36,w,20,COLS[k]);});hand(g,'B, C, A',x+270,yy+120,acc());}
  });
  y=keyWords(p,y,[['same','not longer and not shorter: just as long'],['compare','look at two or more things to see how they are different']]);return y;},
 readout(p,S,y){const g=p.g,st=S.st;if(st.msg)wrap(g,st.msg,X0,y+44,TW,40,{font:FT.bodyB,bold:FT.bodyB,boldColor:acc()});return y+70;},
 build(S,grp,mode,game){const st=S.st;const g2=K.stage(grp);let items=[];
  function draw(){clearGroup(g2);mat(g2,4.4,2.2,0,-1.85,'#fff7e0');items=lineup(g2,st.attr,st.vals,{kind:st.kind});items.forEach(it=>K.tapOn(it,()=>tap(it.userData.i)));st.order.forEach((k,j)=>numBadge(items[k],j+1));A.redraw();}
  const WD={size:['bigger','biggest','smallest'],height:['taller','tallest','shortest'],length:['longer','longest','shortest']};
  function tap(i){A.pop();if(st.seq){if(st.order.includes(i))return;st.order.push(i);numBadge(items[i],st.order.length);A.say(String(st.order.length));
      if(st.order.length===st.seq.length){const ok=st.order.every((k,j)=>k===st.seq[j]);if(mode==='play'&&!st.setup){if(ok)game.solved('Yes! '+st.seq.map(k=>LET[k]).join(', ')+'!');else{A.bad('Not in order. Look again, and try once more!');st.order=[];A.later(draw,700);}}else{st.msg=st.order.map(k=>LET[k]).join(', ');A.redraw();}}return;}
    A.say(LET[i]);if(mode==='play'&&!st.setup&&st.want){if(st.want(i))game.solved(st.wantOk);else A.bad(st.hint||'Look again!');}}
  function rndVals(attr,n){const pool=attr==='size'?[.55,.8,1.05,1.3,1.55]:attr==='height'?[1,2,3,4,5,6]:[2,3,4,5,6,7,8];return shuffle(pool).slice(0,n);}
  function setA(a,vals){st.attr=a;st.vals=vals||rndVals(a,3);st.order=[];st.seq=null;st.msg='';draw();}
  function lineupDemo(){setA('length',[6,3,8]);const it=items;it.forEach((o,k)=>{o.position.x=-1.7+[.6,-.2,.3][k];});A.seq([[900,()=>{it.forEach(o=>moveTo(o,{pos:V(-1.7,0,o.position.z)}));A.say('Line up the ends!');}],[900,()=>{st.msg='*C* is the longest. *B* is the shortest.';A.redraw();}]]);}
  draw();
  return {info:()=>st.attr,
    controls:()=>{const c=[{t:'Size',fn:()=>setA('size')},{t:'Height',fn:()=>setA('height')},{t:'Length',fn:()=>setA('length')},{t:'New',go:true,fn:()=>setA(st.attr)}];if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);return c;},
    demo(n){st.ask=null;st.want=null;st.seq=null;st.order=[];st.msg='';
      if(n==='size')setA('size',[.7,1.05,1.5]);if(n==='height')setA('height',[2,3,5]);if(n==='length')setA('length',[3,5,8]);if(n==='lineup')lineupDemo();
      if(n==='two')setA('height',[3,5]);if(n==='order'){setA('length',[8,3,5]);}if(n==='ordered'){setA('length',[8,3,5]);st.order=[1,2,0];draw();st.msg='Shortest to longest: *B, C, A*';A.redraw();}},
    task(r){st.setup=true;st.ask=null;st.want=null;st.seq=null;st.order=[];st.msg='';let txt;
      if(r===0){const a=pick(['size','height']);setA(a,rndVals(a,2));const big=st.vals[0]>st.vals[1]?0:1;st.want=i=>i===big;st.wantOk='Yes! '+LET[big]+' is '+WD[a][0]+'!';txt='Tap the one that is *'+WD[a][0]+'*.';}
      else if(r===1){setA('height',rndVals('height',3));const t=st.vals.indexOf(Math.max(...st.vals));st.want=i=>i===t;st.wantOk='Yes! '+LET[t]+' is the tallest!';txt='Tap the *tallest* tower.';}
      else if(r===2){setA('length',rndVals('length',3));const t=st.vals.indexOf(Math.min(...st.vals));st.want=i=>i===t;st.wantOk='Yes! '+LET[t]+' is the shortest!';st.hint='Look at the right ends. Which one stops first?';txt='Tap the *shortest* ribbon.';}
      else if(r===3){const a=pick(['length','size','height']);setA(a,rndVals(a,3));st.seq=[0,1,2].sort((p,q)=>st.vals[q]-st.vals[p]);const w=a==='length'?['longest','shortest']:a==='size'?['biggest','smallest']:['tallest','shortest'];txt='Tap them in order from *'+w[0]+'* to *'+w[1]+'*.';}
      else{const v=rndVals('length',3);const same=v[1];setA('length',[same,v[0],same,v[2]].slice(0,4));st.want=i=>i===2;st.wantOk='Yes! A and C are the same length.';txt='Which ribbon is the *same length* as ribbon A? Tap it.';}
      draw();st.setup=false;return txt;}};}
});

/* =========================================================
   Unit 2 · More about Comparison
   ========================================================= */
const MASS={car:6,block:5,turtle:5,bell:4,apple:2,duck:3,ball:2,cupcake:2,acorn:1,leaf:.2,balloon:.1,star:.5};
function seesaw(grp){const s=new THREE.Group();s.position.set(0,0,-1.9);grp.add(s);const base=K.cone(.22,.4,'#8d6e63',4);base.position.y=.2;s.add(base);
  const arm=new THREE.Group();arm.position.y=.42;s.add(arm);const plank=K.bx(3.2,.06,.4,'#ffcc80');arm.add(plank);
  const pads=[-1,1].map(x=>{const p=new THREE.Group();p.position.set(x*1.35,.03,0);arm.add(p);return p;});return {s,arm,pads};}
function pond(grp,x,z,n,kind){const g=new THREE.Group();g.position.set(x,0,z);grp.add(g);const w=mk(G('k_pond',()=>new THREE.CylinderGeometry(.62,.62,.04,40)),lam('#90caf9'),0);w.position.y=.02;g.add(w);
  for(let i=0;i<n;i++){const a=i*2.4+.3,r=n>1?.18+.26*((i*7)%5)/4:0;const t=toy(kind||'duck',{s:.85});t.position.set(Math.cos(a)*r,.04,Math.sin(a)*r);t.rotation.y=-a;g.add(t);}return g;}
P.lesson({id:'compare2',title:'Wider, thicker, heavier, more',strand:'Spatial Sense',codes:['E2.1','B1.3'],
 guide:{goal:'Compare objects by width, thickness and mass, and compare groups to find which has more, most or fewest.',words:'wide, wider, narrow, narrower, thick, thicker, thin, thinner, heavy, heavier, light, lighter, more, most, fewer, fewest',
  ask:['Which is wider, a door or a window?','How does a seesaw show which is heavier?','Which group has more? How do you know?'],home:'Hold a book in one hand and an apple in the other. Which is heavier? Check on a homemade hanger scale!'},
 learn:[{say:'Watch the seesaw.',speech:'Watch the seesaw. The heavier side goes down. The lighter side goes up.',view:'model',demo:'weigh'}],
 fig:'Paths, mattresses, a seesaw and ponds of ducks.',rz:.45,
 explore:['Try *Width*, *Thickness*, *Seesaw* and *Groups*.','On the seesaw, the *heavier* side goes *down*.','Press *New* to try other things.'],
 howTo:'Read the question, then tap the right thing on the model.',
 init:k=>({view:'weigh',vals:[3,6],pair:['balloon','block'],ponds:[3,6,4],want:null,ask:null,msg:''}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=tbox(p,y-10,330,'More ways to compare');
  const cw=TW/3;
  [['wider','narrower'],['thicker','thinner'],['heavier','lighter']].forEach(([a,b],i)=>{const x=X0+i*cw+20,yy=y+10;
    if(i===0){bar(g,x+10,yy,220,46,'#90caf9');bar(g,x+10,yy+70,220,16,'#90caf9');}
    if(i===1){for(let k=0;k<5;k++)bar(g,x+20,yy+(4-k)*16,110,15,k%2?'#fff':'#f48fb1');bar(g,x+150,yy+64,90,15,'#f48fb1');}
    if(i===2){K.line(g,[x+20,yy+80,x+240,yy+20],'#c58b4a',10);poly(g,[x+120,yy+52,x+100,yy+110,x+140,yy+110],'#8d6e63');icon(g,'block',x+38,yy+50,56,'#8b5cf6');icon(g,'balloon',x+222,yy-6,56);}
    T(g,a,x+10,yy+150,FT.bodyB,acc());T(g,'↔ '+b,x+10,yy+190,FT.body,INK);});
  y+=250;
  y=exGrid(p,y,4,196,(i,x,yy,w,h)=>{
    if(i===0){T(g,'Which path is wider?',x+56,yy+34,FT.smallB);bar(g,x+30,yy+64,330,18,'#a5d6a7');bar(g,x+30,yy+104,330,54,'#ffcc80');check(g,x+380,yy+132,34);}
    if(i===1){T(g,'Which book is thinnest?',x+56,yy+34,FT.smallB);[40,14,26].forEach((t,k)=>{bar(g,x+40+k*120,yy+170-t*2.2,90,t*2.2,COLS[k]);});ring(g,x+205,yy+154,70,30);}
    if(i===2){T(g,'Which is heavier?',x+56,yy+34,FT.smallB);K.line(g,[x+40,yy+150,x+360,yy+80],'#c58b4a',10);K.poly(g,[x+200,yy+118,x+180,yy+176,x+220,yy+176],'#8d6e63');icon(g,'car',x+70,yy+122,70);icon(g,'leaf',x+330,yy+56,60);
      T(g,'down = heavier',x+250,yy+172,FT.cap,GREY);}
    if(i===3){T(g,'Which pond has the most?',x+56,yy+34,FT.smallB);[2,5,3].forEach((n,k)=>{K.ell(g,x+70+k*130,yy+120,56,40,'#bbdefb');icons(g,'duck',n,x+30+k*130,yy+92,26,{cols:3,gap:26});});ring(g,x+200,yy+120,62,46);}
  });
  y=keyWords(p,y,[['heavier','has more mass; it pulls its side down'],['fewest','the smallest number in a group']]);return y;},
 readout(p,S,y){const g=p.g,st=S.st;if(st.msg)wrap(g,st.msg,X0,y+44,TW,40,{font:FT.bodyB,bold:FT.bodyB,boldColor:acc()});return y+70;},
 build(S,grp,mode,game){const st=S.st;const g2=K.stage(grp);let items=[],ss=null;
  function draw(){clearGroup(g2);ss=null;items=[];
    if(st.view==='width'||st.view==='thick'){mat(g2,4.4,2.2,0,-1.85,'#fff7e0');items=lineup(g2,st.view,st.vals,{z0:-2.6});}
    else if(st.view==='weigh'){ss=seesaw(g2);const [a,b]=st.pair;items=[0,1].map(k=>{const t=toy(st.pair[k],{s:1.7});ss.pads[k].add(t);const L=tag(LET[k],{size:.24});L.position.y=.55;t.add(L);t.userData.i=k;return t;});
      const d=(MASS[a]||1)-(MASS[b]||1);ss.arm.rotation.z=d>0?.16:d<0?-.16:0;}
    else{items=st.ponds.map((n,k)=>{const pd=pond(g2,(k-(st.ponds.length-1)/2)*1.45,-1.8,n);const L=tag(LET[k],{size:.26});L.position.set(0,.6,-.55);pd.add(L);pd.userData.i=k;return pd;});}
    items.forEach((it,k)=>{it.userData.i=k;K.tapOn(it,()=>tap(k));});A.redraw();}
  function tap(i){A.pop();A.say(LET[i]);if(mode==='play'&&!st.setup&&st.want){if(st.want(i))game.solved(st.wantOk);else A.bad(st.hint||'Look again!');}}
  const pairs=[['car','balloon'],['block','leaf'],['turtle','acorn'],['bell','star'],['apple','balloon'],['duck','leaf'],['car','apple']];
  function setV(v){st.view=v;st.msg='';if(v==='width'||v==='thick')st.vals=shuffle(v==='width'?[2,4,7]:[2,4,7]).slice(0,3);if(v==='weigh')st.pair=shuffle(pick(pairs));if(v==='groups')st.ponds=shuffle([2,4,5,7,8]).slice(0,3);draw();}
  draw();
  return {info:()=>st.view,
    controls:()=>{const c=[{t:'Width',fn:()=>setV('width')},{t:'Thickness',fn:()=>setV('thick')},{t:'Seesaw',fn:()=>setV('weigh')},{t:'Groups',fn:()=>setV('groups')},{t:'New',go:true,fn:()=>setV(st.view)}];if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);return c;},
    demo(n){st.ask=null;st.want=null;st.msg='';if(n==='width'){st.view='width';st.vals=[2,7,4];draw();}if(n==='thick'){st.view='thick';st.vals=[6,2,4];draw();}
      if(n==='weigh'){st.view='weigh';st.pair=['block','balloon'];draw();}if(n==='weigh2'){st.view='weigh';st.pair=['leaf','car'];draw();}if(n==='groups'){st.view='groups';st.ponds=[3,7,5];draw();}},
    task(r){st.setup=true;st.ask=null;st.want=null;st.msg='';let txt;
      if(r===0){setV('width');const t=st.vals.indexOf(Math.max(...st.vals));st.want=i=>i===t;st.wantOk='Yes! Path '+LET[t]+' is the widest.';txt='Tap the *widest* path.';}
      else if(r===1){setV('thick');const t=st.vals.indexOf(Math.min(...st.vals));st.want=i=>i===t;st.wantOk='Yes! '+LET[t]+' is the thinnest mattress.';txt='Tap the *thinnest* mattress.';}
      else if(r===2){setV('weigh');const h=(MASS[st.pair[0]]||1)>(MASS[st.pair[1]]||1)?0:1;const lite=pick([true,false]);const t=lite?1-h:h;st.want=i=>i===t;st.wantOk='Yes! The '+st.pair[t]+' is '+(lite?'lighter':'heavier')+'.';st.hint='The heavier side goes down.';txt='Look at the seesaw. Tap the *'+(lite?'lighter':'heavier')+'* thing.';}
      else if(r===3){setV('groups');const t=st.ponds.indexOf(Math.max(...st.ponds));st.want=i=>i===t;st.wantOk='Yes! Pond '+LET[t]+' has the most ducks.';txt='Tap the pond with the *most* ducks.';}
      else{setV('groups');const t=st.ponds.indexOf(Math.min(...st.ponds));st.want=i=>i===t;st.wantOk='Yes! Pond '+LET[t]+' has the fewest ducks.';txt='Tap the pond with the *fewest* ducks.';}
      st.setup=false;return txt;}};}
});
function poly(g,pts,c){K.poly(g,pts,c);}

/* =========================================================
   Unit 3 · Ordering and Sorting
   ========================================================= */
const GROUPS={fruit:['apple','pear','strawberry'],toys:['ball','kite','block','car'],animals:['duck','fish','turtle','ladybug'],treats:['cupcake','cookie','donut']};
const GNAME={fruit:'fruit',toys:'toys',animals:'animals',treats:'treats'};
function hoop(grp,x,c,txt){const h=mk(G('k_hoop',()=>new THREE.TorusGeometry(.95,.05,10,48)),lam(c),0);h.rotation.x=Math.PI/2;h.position.set(x,.05,-1.75);grp.add(h);const L=tag(txt,{size:.26,border:c});L.position.set(x,.35,-2.85);grp.add(L);return h;}
P.lesson({id:'order1',title:'Ordering and sorting',strand:'Data',codes:['D1.1','E2.2'],
 guide:{goal:'Order objects by size, height or number, and sort objects by a rule, explaining the rule and finding more than one way to sort.',words:'order, sort, rule, group, belong, the same, different, colour, kind',
  ask:['What is the same about these things?','Which one does not belong? Why?','Can you sort them another way?'],home:'Sort the laundry! First by who it belongs to, then by colour. Two rules, same clothes!'},
 learn:[{say:'Watch: sort two ways.',speech:'Watch. First we sort by kind: fruit and toys. Then we sort the same things by colour.',view:'model',demo:'sortkind'}],
 fig:'Things to put in order and to sort into hoops.',rz:.45,
 explore:['*Drag* things into a hoop, or *tap* to move them.','Press *Sort by kind* or *Sort by colour*.','Press *Odd one out* for a puzzle.'],
 howTo:'Read the question. Tap things in order, tap the one that does not belong, or drag each thing into the right hoop.',
 init:k=>({view:'sort',rule:'kind',set:[],place:[],want:null,seq:null,order:[],vals:[],ask:null,msg:''}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=tbox(p,y-10,380,'How to sort');
  y=wrap(g,'To *sort*, find what is *the same* about some things. That is the *rule*.',X0+28,y+6,TW-56,38,{font:FT.body,bold:FT.bodyB,boldColor:acc()})+6;
  const hx=[X0+40,X0+TW/2+20];[['fruit',['apple','pear','strawberry']],['toys',['ball','kite','block']]].forEach(([t,k],i)=>{rr(g,hx[i],y,TW/2-60,150,70);g.fillStyle='rgba(255,255,255,.7)';g.fill();g.strokeStyle=i?'#2f7de1':'#e4572e';g.lineWidth=4;g.stroke();
    T(g,t,hx[i]+30,y+40,FT.smallB,i?'#2f7de1':'#e4572e');k.forEach((kk,j)=>icon(g,kk,hx[i]+70+j*100,y+96,64));});y+=170;
  y=wrap(g,'You can often sort the *same things* in *another way*, like by *colour*.',X0+28,y+20,TW-56,36,{font:FT.small,bold:FT.smallB});y+=40;
  y=exGrid(p,y,4,186,(i,x,yy,w,h)=>{
    if(i===0){T(g,'Order: fewest to most',x+56,yy+34,FT.smallB);[4,1,3].forEach((n,k)=>{icons(g,'acorn',n,x+20+k*130,yy+64,30,{cols:2});T(g,LET[k],x+40+k*130,yy+170,FT.smallB);});hand(g,'B, C, A',x+300,yy+110,acc());}
    if(i===1){T(g,'Which does not belong?',x+56,yy+34,FT.smallB);['duck','fish','car','turtle'].forEach((k,j)=>icon(g,k,x+60+j*90,yy+110,70));xMark(g,x+240,yy+110,70);T(g,'not an animal',x+150,yy+170,FT.cap,GREY);}
    if(i===2){T(g,'Rule: things that are red',x+56,yy+34,FT.smallB);[['apple','#e53935'],['car','#e53935'],['balloon','#ef5350']].forEach(([k,c],j)=>icon(g,k,x+70+j*120,yy+110,74,c));}
    if(i===3){T(g,'Order: shortest to tallest',x+56,yy+34,FT.smallB);[4,2,5,3].forEach((n,k)=>{tower2d(g,x+40+k*90,yy+160,n,22,COLS[k]);});hand(g,'B, D, A, C',x+40,yy+182,acc());}
  });
  y=keyWords(p,y,[['sort','put things that are the same into groups'],['rule','what is the same about every thing in a group']]);return y;},
 readout(p,S,y){const g=p.g,st=S.st;if(st.msg)wrap(g,st.msg,X0,y+44,TW,40,{font:FT.bodyB,bold:FT.bodyB,boldColor:acc()});return y+70;},
 build(S,grp,mode,game){const st=S.st;const g2=K.stage(grp);let items=[];const HX=[-1.15,1.15];
  function rules(){return st.rule==='kind'?{a:st.ga,b:st.gb,test:t=>GROUPS[st.ga].includes(t.k)?0:1}:{a:'red',b:'blue',test:t=>t.c==='#e53935'?0:1};}
  function draw(){clearGroup(g2);items=[];
    if(st.view==='sort'){const R=rules();hoop(g2,HX[0],'#e4572e',R.a==='red'?'red':GNAME[R.a]);hoop(g2,HX[1],'#2f7de1',R.b==='blue'?'blue':GNAME[R.b]);
      st.set.forEach((t,i)=>{const o=toy(t.k,{c:t.c,s:1.25});const pl=st.place[i];const slot=st.set.slice(0,i).filter((u,j)=>st.place[j]===pl).length;
        if(pl==null)o.position.set(-1.9+i*(3.8/(st.set.length-1||1)),0,-.55);else o.position.set(HX[pl]+((slot%3)-1)*.5,0,-2.05+Math.floor(slot/3)*.55);g2.add(o);o.userData.i=i;items.push(o);
        A.drag(o,{tap:()=>{st.place[i]=st.place[i]==null?0:st.place[i]===0?1:null;A.pop();draw();checkSort();},drop:pos=>{st.place[i]=pos.z<-1&&Math.abs(pos.x)>.15?(pos.x<0?0:1):null;draw();checkSort();}});});}
    else{mat(g2,4.4,2.2,0,-1.85,'#fff7e0');
      if(st.view==='odd')st.set.forEach((t,i)=>{const o=toy(t.k,{c:t.c,s:1.6});o.position.set((i-1.5)*1.0,0,-1.8);const L=tag(LET[i],{size:.24});L.position.y=.5;o.add(L);g2.add(o);if(st.crossed===i)crossOut(o);items.push(o);K.tapOn(o,()=>tap(i));});
      else{items=st.attr==='count'?st.vals.map((n,i)=>{const it=new THREE.Group();it.position.set((i-1.5)*1.05,0,-1.8);g2.add(it);lay(it,'acorn',n,{cols:2,gap:.36,z:0,x:0,s:1.2});const L=tag(LET[i],{size:.24});L.position.set(0,.6,-.6);it.add(L);it.userData.top=.5;return it;}):lineup(g2,st.attr,st.vals,{gap:1.0});
        items.forEach((it,i)=>K.tapOn(it,()=>tap(i)));st.order.forEach((k,j)=>numBadge(items[k],j+1));}}
    A.redraw();}
  function checkSort(){const R=rules();const done=st.place.every(v=>v!=null);if(!done)return;const ok=st.set.every((t,i)=>R.test(t)===st.place[i]);
    if(mode==='play'&&!st.setup&&st.need){if(ok)game.solved('Yes! Every thing is in the right hoop.');else A.bad('Something is in the wrong hoop. Check the rule!');}else if(ok){st.msg='Sorted! Rule: *'+(st.rule==='kind'?'what kind of thing':'what colour')+'*';A.good();A.redraw();}}
  function tap(i){A.pop();if(st.view==='odd'){A.say(LET[i]);if(mode==='play'&&!st.setup&&st.want){if(st.want(i)){st.crossed=i;draw();game.solved(st.wantOk);}else A.bad('Those three are alike. Look again!');}return;}
    if(st.seq){if(st.order.includes(i))return;st.order.push(i);numBadge(items[i],st.order.length);if(st.order.length===st.seq.length){const ok=st.order.every((k,j)=>k===st.seq[j]);
      if(mode==='play'&&!st.setup){if(ok)game.solved('Yes! '+st.seq.map(k=>LET[k]).join(', ')+'!');else{A.bad('Not in order. Try again!');st.order=[];A.later(draw,700);}}else{st.msg=st.order.map(k=>LET[k]).join(', ');A.redraw();}}}}
  function newSort(rule){st.view='sort';st.rule=rule||st.rule;const ks=shuffle(Object.keys(GROUPS)).slice(0,2);st.ga=ks[0];st.gb=ks[1];
    if(st.rule==='kind')st.set=shuffle(shuffle(GROUPS[st.ga]).slice(0,3).concat(shuffle(GROUPS[st.gb]).slice(0,3)).map(k=>({k,c:pick(['#e53935','#2f7de1'])})));
    else st.set=shuffle(['ball','block','car','balloon','kite','crayon'].map((k,i)=>({k,c:i%2?'#2f7de1':'#e53935'})));st.place=st.set.map(()=>null);st.msg='';draw();}
  function newOdd(){st.view='odd';st.crossed=null;const ks=shuffle(Object.keys(GROUPS));const three=shuffle(GROUPS[ks[0]]).slice(0,3),odd=pick(GROUPS[ks[1]]);const pos=rnd(0,3);const s=three.slice();s.splice(pos,0,odd);st.set=s.map(k=>({k}));st.oddI=pos;st.oddG=ks[0];draw();}
  function newOrder(attr){st.view='order';st.attr=attr||pick(['size','height','count']);st.vals=attr==='size'?shuffle([.55,.8,1.05,1.35]):attr==='count'?shuffle([1,3,5,7]):shuffle([1,2,4,6]);st.order=[];draw();}
  newSort('kind');
  return {info:()=>st.view,
    controls:()=>{const c=[{t:'Sort by kind',fn:()=>newSort('kind')},{t:'Sort by colour',fn:()=>newSort('colour')},{t:'Odd one out',fn:newOdd},{t:'Put in order',go:true,fn:()=>{newOrder();st.seq=[0,1,2,3].sort((p,q)=>st.vals[p]-st.vals[q]);}}];if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);return c;},
    demo(n){st.ask=null;st.want=null;st.seq=null;st.need=false;st.msg='';
      if(n==='sortkind'){st.view='sort';st.rule='kind';st.ga='fruit';st.gb='toys';st.set=[{k:'apple',c:'#e53935'},{k:'ball',c:'#2f7de1'},{k:'pear'},{k:'block',c:'#e53935'},{k:'strawberry',c:'#e53935'},{k:'kite',c:'#2f7de1'}];st.place=st.set.map(()=>null);draw();
        A.seq(st.set.map((t,i)=>[450,()=>{st.place[i]=GROUPS.fruit.includes(t.k)?0:1;A.pop();draw();}]));}
      if(n==='kindsorted'){st.view='sort';st.rule='kind';st.ga='fruit';st.gb='toys';st.set=[{k:'apple',c:'#e53935'},{k:'ball',c:'#2f7de1'},{k:'pear'},{k:'block',c:'#e53935'},{k:'strawberry',c:'#e53935'},{k:'kite',c:'#2f7de1'}];st.place=[0,1,0,1,0,1];draw();}
      if(n==='colsorted'){st.view='sort';st.rule='colour';st.set=['ball','block','car','balloon','kite','crayon'].map((k,i)=>({k,c:i%2?'#2f7de1':'#e53935'}));st.place=st.set.map((t,i)=>i%2);draw();}
      if(n==='odd'){st.view='odd';st.crossed=null;st.set=['duck','fish','car','turtle'].map(k=>({k}));draw();}if(n==='oddx'){st.view='odd';st.set=['duck','fish','car','turtle'].map(k=>({k}));st.crossed=2;draw();}
      if(n==='order'){st.view='order';st.attr='height';st.vals=[4,2,5,3];st.order=[];draw();}if(n==='ordered'){st.view='order';st.attr='height';st.vals=[4,2,5,3];st.order=[1,3,0,2];draw();}},
    task(r){st.setup=true;st.ask=null;st.want=null;st.seq=null;st.need=false;st.msg='';let txt;
      if(r===0||r===3){const a=r===0?pick(['size','height']):'count';newOrder(a);const up=pick([true,false]);st.seq=[0,1,2,3].sort((p,q)=>up?st.vals[p]-st.vals[q]:st.vals[q]-st.vals[p]);
        const w=a==='size'?['smallest','biggest']:a==='height'?['shortest','tallest']:['fewest','most'];txt='Tap them in order from *'+(up?w[0]:w[1])+'* to *'+(up?w[1]:w[0])+'*.';}
      else if(r===1||r===4){newOdd();st.want=i=>i===st.oddI;st.wantOk='Yes! The others are all '+GNAME[st.oddG]+'.';txt='Tap the one that *does not belong*.';}
      else{newSort(pick(['kind','colour']));st.need=true;txt='Sort by '+(st.rule==='kind'?'*kind*':'*colour*')+'. Drag (or tap) each thing into the right hoop.';}
      st.setup=false;return txt;}};}
});

/* =========================================================
   Unit 4 · Sequencing and ordinal numbers
   ========================================================= */
/* little story cards drawn in code: each story has 3 or 4 steps */
const STORIES=[
 {name:'Planting a seed',steps:['A seed goes in the soil','A little sprout grows','A flower opens'],draw:(g,k,s)=>{K.ell(g,s/2,s*.8,s*.42,s*.1,'#8d6e63');if(k===0)K.ell(g,s/2,s*.72,s*.05,s*.04,'#6d4c41');if(k>=1){K.line(g,[s/2,s*.78,s/2,s*(k===1?.55:.36)],'#43a047',6);K.ell(g,s/2+12,s*(k===1?.58:.5),14,6,'#66bb6a',-.4);}if(k===2)icon(g,'flower',s/2,s*.36,s*.38);}},
 {name:'Building a snowman',steps:['Roll one big snowball','Put a middle ball on top','Add the head and a hat'],draw:(g,k,s)=>{const W='#ffffff';K.ell(g,s/2,s*.72,s*.2,s*.18,W);g.strokeStyle='#b0bec5';g.lineWidth=2;g.stroke();if(k>=1){K.ell(g,s/2,s*.48,s*.14,s*.13,W);}if(k>=2){K.ell(g,s/2,s*.3,s*.1,s*.1,W);rr(g,s/2-18,s*.13,36,22,3);g.fillStyle=INK;g.fill();K.ell(g,s/2-6,s*.29,3,3,INK);K.ell(g,s/2+6,s*.29,3,3,INK);}}},
 {name:'Blowing up a balloon',steps:['The balloon is flat','It gets bigger','It is big and round','It floats away!'],draw:(g,k,s)=>{const r=[.12,.22,.32,.3][k];const yy=k===3?s*.32:s*.55;icon(g,'balloon',s/2+(k===3?20:0),yy,s*r*2.2,'#ef5350');}},
 {name:'Eating a cookie',steps:['A whole cookie','One bite is gone','Only a little is left'],draw:(g,k,s)=>{icon(g,'cookie',s/2,s/2,s*.7);g.fillStyle='#ffffff';if(k>=1){g.beginPath();g.arc(s*.78,s*.32,s*.17,0,7);g.fill();}if(k>=2){g.beginPath();g.arc(s*.5,s*.4,s*.32,0,7);g.fill();g.beginPath();g.arc(s*.7,s*.65,s*.22,0,7);g.fill();}}}];
function storyCard(st,k,s){const c=document.createElement('canvas');c.width=c.height=256;const g=c.getContext('2d');g.fillStyle='#ffffff';g.fillRect(0,0,256,256);g.strokeStyle='#c9cfdc';g.lineWidth=8;g.strokeRect(4,4,248,248);
  if(st.name==='Building a snowman'){g.fillStyle='#e3f2fd';g.fillRect(8,8,240,240);}st.draw(g,k,256);const t=new THREE.CanvasTexture(c);t.anisotropy=4;
  const side=lam('#e2e8f0');const m=mk(new THREE.BoxGeometry(.95,.95,.04),[side,side,side,side,new THREE.MeshLambertMaterial({map:t}),side],20);return m;}
const RACERS=['duck','turtle','ladybug','car','ball','fish','balloon','kite','acorn','star'];
P.lesson({id:'seq1',title:'First, next, last: sequencing',strand:'Number',codes:['B1.1','E2.3'],
 guide:{goal:'Put events in the order they happen, and use ordinal numbers (1st to 10th) to tell position.',words:'first, next, then, last, before, after, 1st, 2nd, 3rd, 4th, 5th, 6th, 7th, 8th, 9th, 10th',
  ask:['What do you do first in the morning? What comes next?','Who is 1st in the line? Who is last?','What comes after 3rd?'],home:'Tell the story of your morning in order: first, next, then, last. Line up toys and name the 1st, 2nd and 3rd.'},
 learn:[{say:'Watch the race!',speech:'Watch the race to the flag. The duck is first. Can you find who is third?',view:'model',demo:'race'}],
 fig:'Story cards to put in order, and a race to the flag.',rz:.45,
 explore:['Press *Story* and tap the cards in order.','Press *Race* to line up the racers.','*Tap* a racer to hear its place.'],
 howTo:'Tap the story cards in the order they happen, or tap the racer the question asks for.',
 init:k=>({view:'race',story:0,cards:[2,0,1],order:[],line:RACERS.slice(),n:6,want:null,ask:null,msg:''}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=tbox(p,y-10,330,'Ordinal numbers tell position');
  const cw=TW/10;for(let i=1;i<=10;i++){const x=X0+(i-1)*cw+cw/2;icon(g,RACERS[i-1],x,y+40,54);T(g,K.ORD[i],x,y+108,FT.bodyB,i<=3?acc():INK,'center');T(g,K.ORDW[i],x,y+142,'400 17px "Atkinson Hyperlegible", sans-serif',GREY,'center');}
  K.line(g,[X0+10,y+170,X0+TW-10,y+170],GREY,2);T(g,'◀ the flag is this way: 1st is closest',X0+12,y+204,FT.small,GREY);y+=250;
  y=sub(p,y,'Things happen in order');
  const cs=150;[0,1,2].forEach(k=>{const x=X0+k*(cs+90);const c=document.createElement('canvas');c.width=c.height=cs;const cg=c.getContext('2d');cg.fillStyle='#fff';cg.fillRect(0,0,cs,cs);STORIES[0].draw(cg,k,cs);
    rr(g,x-4,y-4,cs+8,cs+8,10);g.fillStyle='#c9cfdc';g.fill();g.drawImage(c,x,y);T(g,['1 first','2 next','3 last'][k],x+cs/2,y+cs+34,FT.smallB,acc(),'center');if(k<2)T(g,'→',x+cs+46,y+cs/2+10,ZS(40),GREY,'center');});y+=cs+56;
  y=exGrid(p,y,2,160,(i,x,yy,w,h)=>{
    if(i===0){T(g,'Which is 3rd?',x+56,yy+34,FT.smallB);['kite','duck','ball','car','fish'].forEach((k,j)=>icon(g,k,x+40+j*72,yy+100,52));ring(g,x+184,yy+100,34,34);T(g,'1st',x+40,yy+148,FT.small,GREY,'center');}
    if(i===1){T(g,'What comes after 5th?',x+56,yy+34,FT.smallB);hand(g,'4th, 5th, 6th',x+40,yy+106,INK);T(g,'6th!',x+300,yy+106,ZS(36),acc());}
  });
  y=keyWords(p,y,[['first, 1st','the one at the front, or what happens at the start'],['last','the one at the end']]);return y;},
 readout(p,S,y){const g=p.g,st=S.st;if(st.msg)wrap(g,st.msg,X0,y+44,TW,40,{font:FT.bodyB,bold:FT.bodyB,boldColor:acc()});return y+70;},
 build(S,grp,mode,game){const st=S.st;const g2=K.stage(grp);let items=[];
  function draw(){clearGroup(g2);items=[];
    if(st.view==='story'){const SS=STORIES[st.story];const n=st.cards.length;st.cards.forEach((k,i)=>{const c=storyCard(SS,k,256);c.position.set((i-(n-1)/2)*1.1,.55,-2.0);c.rotation.x=-.25;g2.add(c);c.userData.i=i;items.push(c);K.tapOn(c,()=>tap(i));
        const L=tag(LET[i],{size:.22});L.position.set(0,.6,0);c.add(L);const oi=st.order.indexOf(i);if(oi>=0){const b=tag(String(oi+1),{size:.3,bg:'#ffd54f',border:'#e09b00'});b.position.set(.4,.45,.05);c.add(b);}});
      const tl=tag(SS.name,{size:.26});tl.position.set(0,1.45,-2.3);g2.add(tl);}
    else{const fl=new THREE.Group();fl.position.set(-2.05,0,-1.9);g2.add(fl);fl.add(at(cyl(.02,.02,.9,'#8d6e63',6),0,.45,0));const fg=K.bx(.32,.2,.02,'#e53935',0);fg.position.set(.17,.78,0);fl.add(fg);
      const pathm=mk(new THREE.BoxGeometry(4.2,.02,.5),lam('#e0f2f1'),20);pathm.position.set(0,.01,-1.9);g2.add(pathm);
      for(let i=0;i<st.n;i++){const k=st.line[i];const t=toy(k,{s:1.0});t.position.set(-1.6+i*Math.min(.6,3.6/(st.n-1)),0,-1.9);t.rotation.y=k==='car'||k==='fish'||k==='duck'?Math.PI:0;g2.add(t);t.userData.i=i;items.push(t);K.tapOn(t,()=>tap(i));
        if(st.showOrd){const L=tag(K.ORD[i+1],{size:.2});L.position.y=.7;t.add(L);}}}
    A.redraw();}
  function tap(i){A.pop();if(st.view==='story'){if(st.order.includes(i))return;st.order.push(i);draw();A.say(String(st.order.length));if(st.order.length===st.cards.length){const ok=st.order.every((ci,j)=>st.cards[ci]===j);
        if(mode==='play'&&!st.setup){if(ok)game.solved('Yes! That is the right order!');else{A.bad('Hmm, what happens first? Try again!');st.order=[];A.later(draw,700);}}else{st.msg=ok?'Right order!':'Try again!';A.redraw();}}return;}
    A.say(K.ORD[i+1]+'! '+K.ORDW[i+1]);if(mode==='play'&&!st.setup&&st.want){if(st.want(i))game.solved(st.wantOk);else A.bad('Count from the flag: 1st, 2nd, 3rd…');}}
  function newStory(k){st.view='story';st.story=k==null?rnd(0,STORIES.length-1):k;const n=STORIES[st.story].steps.length;let c;do{c=shuffle([...Array(n).keys()]);}while(c.every((v,i)=>v===i));st.cards=c;st.order=[];st.msg='';draw();}
  function newRace(n){st.view='race';st.n=n||rnd(5,8);st.line=shuffle(RACERS).slice(0,st.n);st.showOrd=false;st.msg='';draw();}
  newRace(6);
  return {info:()=>st.view,
    controls:()=>{const c=[{t:'Story',fn:()=>newStory()},{t:'Race',fn:()=>newRace()},{t:'Show places',go:true,fn:()=>{st.showOrd=!st.showOrd;draw();}}];if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);return c;},
    demo(n){st.ask=null;st.want=null;st.msg='';if(n==='race'){st.view='race';st.n=6;st.line=['duck','turtle','ladybug','car','ball','fish'];st.showOrd=false;draw();}
      if(n==='places'){st.view='race';st.n=6;st.line=['duck','turtle','ladybug','car','ball','fish'];st.showOrd=true;draw();}
      if(n==='story'){st.view='story';st.story=0;st.cards=[2,0,1];st.order=[];draw();}if(n==='storydone'){st.view='story';st.story=0;st.cards=[0,1,2];st.order=[0,1,2];draw();}},
    task(r){st.setup=true;st.ask=null;st.want=null;st.msg='';let txt;
      if(r===0||r===3){newStory(r===0?pick([0,1,3]):2);txt='Tap the cards in order: what happens *first*, *next*, then *last*?';}
      else if(r===1){newRace(rnd(6,8));const k=rnd(2,st.n);st.want=i=>i===k-1;st.wantOk='Yes! That is '+K.ORD[k]+'!';txt='Tap the racer who is *'+K.ORD[k]+'* ('+K.ORDW[k]+'). The flag is at the front.';}
      else if(r===2){newRace(rnd(6,8));const k=rnd(1,st.n);const who=st.line[k-1];st.ask={o:K.shuffle([K.ORD[k],K.ORD[Math.max(1,k-1)===k?k+1:k-1],K.ORD[Math.min(st.n,k+1)===k?k-1:k+1]].filter((v,j,a)=>a.indexOf(v)===j)),ans:K.ORD[k],ok:'Yes! The '+who+' is '+K.ORD[k]+'.'};txt='What place is the *'+who+'* in? Count from the flag.';}
      else{newRace(rnd(6,8));st.want=i=>i===st.n-1;st.wantOk='Yes! That racer is last: '+K.ORD[st.n]+'.';txt='Tap the racer who is *last*.';}
      st.setup=false;return txt;}};}
});
})();
