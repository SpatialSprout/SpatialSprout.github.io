/* The Interactive Classroom: Grade 1 Math — Units 5–9: numbers to 10, adding and subtracting */
(function(){
"use strict";
const P=window.PM;if(!P||P.failed||!P.THREE||!P.K)return;
const {THREE,V,G,lam,mk,label,clearGroup,rr,T,wrap,header,keyWords,FT,ZS,X0,TW,INK,GREY,tint,A,hop,tween,moveTo,easeOut}=P;
const K=P.K,{rnd,pick,shuffle,choices,nearby,words,toy,lay,crossOut,tag,mat,icon,icons,xMark,tbox,exGrid,bigText,hand,sub,nm}=K;
const acc=()=>P.ACC;
const KS=['apple','duck','star','ball','fish','cupcake','ladybug','flower','car','balloon','acorn','turtle','shell','kite','strawberry','mitten','bell','donut'];

/* a standing card with a vertical sum, e.g.   6 / + 4 / ---- / 10   (digits lined up on the right) */
function vCard(a,op,b,ans,blank){const c=document.createElement('canvas');c.width=220;c.height=300;const g=c.getContext('2d');g.fillStyle='#ffffff';rr(g,4,4,212,292,22);g.fill();g.strokeStyle='#c9cfdc';g.lineWidth=6;g.stroke();
  g.fillStyle=INK;g.font='700 74px "Zilla Slab", Georgia, serif';g.textAlign='right';g.fillText(String(a),170,90);g.fillText(String(b),170,170);g.textAlign='left';g.fillText(op==='-'?'−':'+',22,170);
  g.fillRect(20,192,170,7);g.textAlign='right';if(blank){g.strokeStyle='#e09b00';g.setLineDash([10,8]);g.lineWidth=5;g.strokeRect(92,208,92,78);g.setLineDash([]);}else{g.fillStyle=P.ACC;g.fillText(String(ans),170,272);}
  g.strokeStyle='rgba(228,87,46,.5)';g.setLineDash([6,8]);g.lineWidth=3;g.beginPath();g.moveTo(186,30);g.lineTo(186,280);g.stroke();
  const t=new THREE.CanvasTexture(c);const m=new THREE.Mesh(new THREE.PlaneGeometry(.72,.98),new THREE.MeshLambertMaterial({map:t,transparent:true}));m.userData.vcard=1;return m;}
function vText(g,a,op,b,ans,x,y,s){s=s||46;const f=ZS(s);T(g,String(a),x,y,f,INK,'right');T(g,String(b),x,y+s*1.05,f,INK,'right');T(g,op==='-'?'−':'+',x-s*1.9,y+s*1.05,f,INK);g.fillStyle=INK;g.fillRect(x-s*2,y+s*1.3,s*2.1,4);if(ans!=null)T(g,String(ans),x,y+s*2.45,f,acc(),'right');}

/* ---------- one shared scene: groups of toys on mats, joining, crossing out, and a number path ---------- */
function groups(S,grp,mode,game){const st=S.st;const g2=K.stage(grp);let toys=[],tiles=[],bun=null;
  const api={};
  function sentence(){if(st.view==='add')return st.joined?(st.a+' and '+st.b+' make '+(st.a+st.b)):(st.a+' and '+st.b);if(st.view==='take')return st.n+' take away '+st.x+' leaves '+(st.n-st.x);return '';}
  function draw(){clearGroup(g2);toys=[];tiles=[];bun=null;
    if(st.view==='pairs'){mat(g2,4.3,1.9,0,-1.85);const n=st.a,cols=Math.ceil(n/2),gp=Math.min(.6,4/cols);toys=[];for(let i=0;i<n;i++){const t=toy(st.kind,{s:gp>.5?1.1:.85});t.position.set((Math.floor(i/2)-(cols-1)/2)*gp,0,-2.1+(i%2)*.5);g2.add(t);toys.push(t);}
      if(st.ringed)for(let k=0;k<Math.floor(n/2)*(st.ringed>=1?1:0);k++){if(k>=st.ringed)break;const r=mk(G('k_pr'+gp,()=>new THREE.TorusGeometry(gp*.42,.025,8,30)),lam('#16a36f'),0);r.scale.set(1,1,1.9);r.rotation.x=Math.PI/2;r.position.set((k-(cols-1)/2)*gp,.06,-1.85);g2.add(r);}
      if(st.ringed>=Math.floor(n/2)&&n%2){const L=tag('left over!',{size:.24,border:'#e4572e',color:'#e4572e'});L.position.set(((cols-1)-(cols-1)/2)*gp,.75,-2.1);g2.add(L);}}
    if(st.view==='count'||st.view==='take'){mat(g2,st.cols===10?4.4:3.6,1.9,0,-1.85);const n=st.view==='take'?st.n:st.a;toys=lay(g2,st.kind,n,st.cols===10?{cols:10,gap:.42,z:-1.85,s:.92,zgap:1.3}:{cols:5,gap:.66,z:-1.85,s:1.3});
      toys.forEach((t,i)=>{if(st.view==='take'&&i>=n-st.x)crossOut(t);K.tapOn(t,()=>tapToy(i));});}
    if(st.view==='add'){if(st.joined){mat(g2,4.2,1.9,0,-1.85);toys=lay(g2,st.kind,st.a+st.b,{cols:5,gap:.66,z:-1.85,s:1.3});toys.forEach((t,i)=>{if(i>=st.a)t.children.forEach(c=>{});});}
      else{mat(g2,1.9,1.9,-1.15,-1.85,'#fff7e0');mat(g2,1.9,1.9,1.15,-1.85,'#e8f5e9');const A1=lay(g2,st.kind,st.a,{cols:3,gap:.56,x:-1.15,z:-1.85,s:1.05}),B1=lay(g2,st.kind2||st.kind,st.b,{cols:3,gap:.56,x:1.15,z:-1.85,s:1.05});toys=A1.concat(B1);
        const pl=tag('+',{size:.5,bg:null,color:acc()});pl.position.set(0,.35,-1.85);g2.add(pl);
        [[-1.15,st.a],[1.15,st.b]].forEach(([x,n])=>{const L=tag(String(n),{size:.32,bg:'#ffffff',border:acc()});L.position.set(x,.95,-2.9);g2.add(L);});}}
    if(st.view==='track'){const n0=st.from||0,n1=st.to||10,cnt=n1-n0+1,w=Math.min(.38,4.3/cnt),gap=w*1.06;for(let v=n0;v<=n1;v++){const tl=K.tile(v,w*.94,st.lit&&st.lit.includes(v)?'#ffe08a':null,st.blank&&st.blank.includes(v));tl.position.set((v-n0-(cnt-1)/2)*gap,.04,-1.5);g2.add(tl);tiles[v]=tl;K.tapOn(tl,()=>tapTile(v));}
      bun=K.bunny();bun.scale.setScalar(.8);const t=tiles[st.pos]||tiles[n0];bun.position.set(t.position.x,.08,-1.5);g2.add(bun);
      if(st.show)lay(g2,st.kind,st.show,{cols:10,gap:.4,z:-2.55,s:.7});}
    if(st.vc){const c=vCard(st.vc[0],st.vc[1],st.vc[2],st.vc[3],st.vc[4]);c.position.set(1.7,.5,-2.3);c.rotation.x=-.75;g2.add(c);}
    if(st.big!==false){const s=st.sent||sentence();if(s){const L=tag(s,{size:.34,bg:'#ffffff',border:acc()});L.position.set(st.vc?-.35:0,.62,-3.0);g2.add(L);}}
    A.redraw();}
  function tapToy(i){A.pop();if(st.view==='take'&&st.tapX){const n=st.n;const k=n-1-st.x;if(st.x>=n)return;st.x++;draw();A.say(st.n+' take away '+st.x+' leaves '+(st.n-st.x));if(api.onX)api.onX();return;}
    if(st.view==='count'){A.say(String(i+1));}if(api.onToy)api.onToy(i);}
  function tapTile(v){A.pop();if(api.onTile)api.onTile(v);else hopTo(v);}
  function hopTo(v){if(!bun||!tiles[v])return Promise.resolve();const path=[];const s=v>st.pos?1:-1;for(let k=st.pos+s;s>0?k<=v:k>=v;k+=s)path.push(k);let pr=Promise.resolve();
    const b=bun;path.forEach(k=>{const t=tiles[k];if(!t)return;const x=t.position.x;pr=pr.then(()=>{if(b!==bun||!b.parent)return;return hop(b,V(x,.08,-1.5),.25,.22).then(()=>{st.pos=k;A.say(String(k));});});});return pr;}
  function addOne(d,key){key=key||'a';const max=st.max||10;if(st[key]+d<0||st[key]+d>max){A.bad(d>0?'That is as many as fit!':'There are none left.');return;}st[key]+=d;A.pop();draw();A.say(String(st[key]));if(api.onChange)api.onChange();}
  function join(){if(st.view!=='add'||st.joined)return;const tA=toys.slice();st.joined=true;tA.forEach(t=>moveTo(t,{pos:V(t.position.x*.5,0,t.position.z)}));A.later(()=>{draw();A.say(st.a+' and '+st.b+' make '+(st.a+st.b));},380);}
  Object.assign(api,{draw,hopTo,addOne,join,sentence,get toys(){return toys;},get tiles(){return tiles;}});return api;}
const R=(n,k)=>({view:'count',kind:'apple',a:5,b:0,n:5,x:0,pos:0,joined:false,vc:null,sent:null,ask:null,need:null});
function readSent(p,S,y){const g=p.g,st=S.st;let s='';if(st.view==='add')s=st.joined?st.a+' + '+st.b+' = '+(st.a+st.b):st.a+' + '+st.b+' = ?';else if(st.view==='take')s=st.n+' − '+st.x+' = '+(st.n-st.x);else if(st.view==='count')s=st.a+'  '+words(st.a);else if(st.view==='track')s=String(st.pos);
  if(st.pageNote)s=st.pageNote;if(s)T(g,s,X0,y+58,ZS(56),acc());return y+76;}

/* =========================================================
   Unit 5 · Numbers 1 to 10
   ========================================================= */
P.lesson({id:'num10',title:'Numbers 1 to 10',strand:'Number',codes:['B1.1','B1.4'],
 guide:{goal:'Read, write and show numbers from 1 to 10 in numerals and words, and count forward and backward from any number.',words:'count, one to ten, number word, before, after, more than, less than',
  ask:['How many fingers are on one hand? On two hands?','What number comes after 7? Before 7?','What is 2 more than 5?'],home:'Count stairs going up (1, 2, 3…) and going down (10, 9, 8…). Find the numbers 1 to 10 on a calendar.'},
 learn:[{say:'Hop along the path!',speech:'The bunny hops forward to count up, and backward to count down.',view:'model',demo:'hop'}],
 fig:'Toys to count and a number path from 0 to 10.',rz:.45,
 explore:['Press *+ 1* and *− 1* to change how many.','Press *Path* and *tap a number* to hop there.','Listen for the number word!'],
 howTo:'Count the toys and tap the number, build a number with + 1 and − 1, or tap the right tile on the number path.',
 init:k=>Object.assign(R(),{kind:'ladybug',a:6}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=tbox(p,y-10,350,'Numbers and their words');
  for(let n=1;n<=10;n++){const c=(n-1)%5,r=Math.floor((n-1)/5),x=X0+20+c*(TW-40)/5,yy=y+r*140;bigText(g,String(n),x+12,yy+44,46,acc());T(g,words(n),x+60,yy+40,FT.smallB,INK);
    for(let k=0;k<n;k++){g.beginPath();g.arc(x+16+(k%5)*24,yy+70+Math.floor(k/5)*24,9,0,7);g.fillStyle=VC(n);g.fill();}}
  y+=290;
  y=tbox(p,y,190,'More than and less than');
  T(g,'more than → count forward',X0+28,y+6,FT.bodyB,'#16a36f');T(g,'less than → count back',X0+TW/2+20,y+6,FT.bodyB,'#e4572e');
  [[5,6,7,'2 more than 5 is 7',X0+28],[6,5,null,'1 less than 6 is 5',X0+TW/2+20]].forEach(([a,b,c,t,x])=>{[a,b,c].filter(v=>v!=null).forEach((v,i)=>{rr(g,x+i*62,y+30,56,48,8);g.fillStyle=i===0?'#ffffff':'#fff3c4';g.fill();g.strokeStyle='#c9cfdc';g.lineWidth=2;g.stroke();T(g,String(v),x+28+i*62,y+64,ZS(30),INK,'center');});hand(g,t,x+200,y+66,INK);});
  y+=150;
  y=exGrid(p,y,4,150,(i,x,yy,w,h)=>{
    if(i===0){icons(g,'acorn',7,x+56,yy+18,40,{cols:4});bigText(g,'7',x+300,yy+80,54,acc());hand(g,'seven',x+290,yy+124);}
    if(i===1){T(g,'after 8 →',x+56,yy+50,FT.bodyB);bigText(g,'9',x+230,yy+56,48,acc());T(g,'before 4 →',x+56,yy+112,FT.bodyB);bigText(g,'3',x+230,yy+118,48,acc());}
    if(i===2){T(g,'Show 4',x+56,yy+34,FT.smallB);icons(g,'balloon',6,x+40,yy+52,56,{crossed:2});hand(g,'cross out 2',x+250,yy+136,'#d32f2f');}
    if(i===3){T(g,'Count back',x+56,yy+34,FT.smallB);hand(g,'10, 9, 8, 7, 6',x+40,yy+100,INK);}
  });
  y=keyWords(p,y,[['count forward','say the numbers going up: 3, 4, 5'],['count backward','say the numbers going down: 5, 4, 3']]);return y;},
 readout:readSent,
 build(S,grp,mode,game){const st=S.st;const G1=groups(S,grp,mode,game);
  G1.onChange=()=>{if(mode==='play'&&!st.setup&&st.need&&st.a===st.need)game.solved('Yes! That is '+st.need+' '+nm(st.kind,st.need)+'!');};
  G1.onTile=v=>{G1.hopTo(v);if(mode==='play'&&!st.setup&&st.wantT!=null){if(v===st.wantT)A.later(()=>game.solved(st.okT),400);else A.bad(st.hintT||'Count again!');}};
  G1.draw();
  return {info:()=>st.view+st.a,
    controls:()=>{const c=st.view==='track'?[{t:'Count',fn:()=>{st.view='count';st.pageNote=null;G1.draw();}}]:[{t:'+ 1',go:true,fn:()=>G1.addOne(1)},{t:'− 1',fn:()=>G1.addOne(-1)},{t:'Path',fn:()=>{st.view='track';st.pos=st.a;st.from=0;st.to=10;G1.draw();}},{t:'New toy',fn:()=>{st.kind=pick(KS);G1.draw();}}];
      if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);return c;},
    demo(n){st.ask=null;st.need=null;st.wantT=null;st.pageNote=null;st.lit=null;
      if(/^c\d+$/.test(n)){st.view='count';st.kind=st.kind||'ladybug';st.a=+n.slice(1);G1.draw();}
      if(n==='count'){st.view='count';st.kind='ladybug';st.a=0;G1.draw();A.seq([...Array(7)].map(()=>[420,()=>G1.addOne(1)]));}
      if(n==='path'){st.view='track';st.from=0;st.to=10;st.pos=5;G1.draw();}
      if(n==='hop'){st.view='track';st.from=0;st.to=10;st.pos=0;G1.draw();A.seq([[500,()=>G1.hopTo(10)],[3600,()=>G1.hopTo(6)]]);}
      if(n==='more2'){st.view='track';st.from=0;st.to=10;st.pos=5;st.lit=[5];G1.draw();A.seq([[400,()=>G1.hopTo(7)]]);}
      if(n==='less1'){st.view='track';st.from=0;st.to=10;st.pos=6;st.lit=[6];G1.draw();A.seq([[400,()=>G1.hopTo(5)]]);}},
    task(r){st.setup=true;st.ask=null;st.need=null;st.wantT=null;st.pageNote=null;st.lit=null;st.blank=null;let txt;st.kind=pick(KS);
      if(r===0){st.view='count';st.a=rnd(4,10);st.ask={o:nearby(st.a,1,10),ans:st.a,ok:'Yes! '+st.a+' '+nm(st.kind,st.a)+'.'};txt='How many *'+nm(st.kind,2)+'*? Count, then tap the number.';}
      else if(r===1){st.view='count';st.a=rnd(1,4);st.need=rnd(6,10);txt='Show *'+words(st.need)+'* '+nm(st.kind,2)+'. Use + 1 and − 1.';}
      else if(r===2){st.view='count';st.a=rnd(3,10);st.ask={o:shuffle([...new Set([st.a,st.a===10?9:st.a+1,st.a-1])]).map(words),ans:words(st.a),ok:'Yes! '+words(st.a)+'.'};txt='How many? Tap the *number word*.';}
      else if(r===3){st.view='track';st.from=0;st.to=10;const v=rnd(2,8);const after=pick([true,false]);st.pos=v;st.lit=[v];st.wantT=after?v+1:v-1;st.okT='Yes! '+st.wantT+' comes '+(after?'after':'before')+' '+v+'.';txt='Tap the number that comes *'+(after?'after':'before')+' '+v+'*.';}
      else{st.view='track';st.from=0;st.to=10;const more=pick([true,false]);const k=rnd(1,3);const v=more?rnd(1,10-k):rnd(k,10);st.pos=v;st.lit=[v];st.wantT=more?v+k:v-k;st.okT='Yes! '+k+(more?' more than ':' less than ')+v+' is '+st.wantT+'.';st.hintT=more?'More than: hop forward.':'Less than: hop backward.';txt='What is *'+k+(more?' more than ':' less than ')+v+'*? Tap it on the path.';}
      G1.draw();st.setup=false;return txt;}};}
});
function VC(n){return ['#ff6b35','#ff8a3d','#ffc04d','#5fd38a','#2f7de1','#8b5cf6','#ec407a','#26a69a','#ff7043','#7e57c2'][(n-1)%10];}

/* =========================================================
   Unit 6 · Addition and Subtraction of 1
   ========================================================= */
P.lesson({id:'plus1',title:'One more, one less',strand:'Number',codes:['B2.1','B2.2'],
 guide:{goal:'Add one more to a group and take one away from a group, and use words like "and … make" and "take away … leaves" to tell about it.',words:'one more, one less, and, make, in all, take away, leaves, left',
  ask:['You have 4 grapes. You get 1 more. How many now?','You have 6 crackers. You eat 1. How many are left?','What does "in all" mean?'],home:'Add one spoon to the table, then take one away. Say: "5 and 1 make 6. 6 take away 1 leaves 5."'},
 learn:[{say:'One more joins in!',speech:'Five ducks are swimming. One more duck joins them. Five and one make six!',view:'model',demo:'join'}],
 fig:'One more joins a group, then one is crossed out.',rz:.45,
 explore:['Press *1 more* or *Cross out 1*.','*Tap* a toy to cross it out.','Read the sentence at the top.'],
 howTo:'Watch what happens, then tap the answer. Sometimes you will tap a toy to cross it out first.',
 init:k=>Object.assign(R(),{view:'add',kind:'duck',a:5,b:1}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=tbox(p,y-10,250,'1 more: add');icons(g,'duck',4,X0+30,y,60);T(g,'and',X0+300,y+42,FT.bodyB);icons(g,'duck',1,X0+370,y,60,{c:'#ffb300'});T(g,'make',X0+450,y+42,FT.bodyB);icons(g,'duck',5,X0+550,y+6,48);
  hand(g,'4 and 1 make 5.  There are 5 in all.',X0+30,y+120,acc());y+=180;
  y=tbox(p,y,250,'1 less: take away');icons(g,'cupcake',6,X0+30,y,60,{crossed:1});hand(g,'6 take away 1 leaves 5.  5 are left.',X0+30,y+120,'#e4572e');y+=180;
  y=exGrid(p,y,4,150,(i,x,yy,w,h)=>{
    if(i===0){icons(g,'star',7,x+50,yy+20,40,{cols:4});T(g,'+ 1',x+230,yy+60,FT.bodyB,'#16a36f');hand(g,'8 in all',x+230,yy+110,acc());}
    if(i===1){icons(g,'car',3,x+50,yy+40,56,{crossed:1});hand(g,'2 left',x+260,yy+120,'#e4572e');}
    if(i===2){hand(g,'9 and 1 make 10',x+56,yy+80,INK);}
    if(i===3){hand(g,'2 take away 1 leaves 1',x+56,yy+80,INK);}
  });
  y=keyWords(p,y,[['in all','how many there are together'],['left','how many are still there after some go away']]);return y;},
 readout:readSent,
 build(S,grp,mode,game){const st=S.st;const G1=groups(S,grp,mode,game);
  G1.onX=()=>{if(mode==='play'&&!st.setup&&st.needX!=null&&st.x===st.needX){st.tapX=false;st.ask=st.afterX;st.needX=null;A.say('Now, how many are left?');A.redraw();}};
  G1.draw();
  return {info:()=>st.view+st.a+st.b+st.x,
    controls:()=>{const c=[{t:'1 more',go:true,fn:()=>{st.view='add';st.a=st.view==='add'?st.a:st.n;st.b=1;st.joined=false;G1.draw();A.later(G1.join,500);}},{t:'Cross out 1',fn:()=>{if(st.view!=='take'){st.view='take';st.n=st.joined?st.a+st.b:st.a;st.x=0;}st.tapX=true;if(st.x<st.n){st.x++;}G1.draw();}},{t:'New',fn:()=>{st.kind=pick(KS);st.view='add';st.a=rnd(2,8);st.b=1;st.joined=false;G1.draw();}}];
      if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);return c;},
    demo(n){st.ask=null;st.needX=null;
      if(n==='join'){st.view='add';st.kind='duck';st.a=5;st.b=1;st.joined=false;G1.draw();A.seq([[1200,G1.join]]);}
      if(n==='two'){st.view='add';st.kind='duck';st.a=5;st.b=1;st.joined=false;G1.draw();}if(n==='joined'){st.view='add';st.kind='duck';st.a=5;st.b=1;st.joined=true;G1.draw();}
      if(n==='take'){st.view='take';st.kind='cupcake';st.n=6;st.x=0;st.tapX=true;G1.draw();}if(n==='takeone'){st.view='take';st.kind='cupcake';st.n=6;st.x=1;G1.draw();}},
    task(r){st.setup=true;st.ask=null;st.needX=null;st.tapX=false;st.joined=false;let txt;st.kind=pick(KS);const n=rnd(2,9);
      if(r===0){st.view='add';st.a=n;st.b=1;st.joined=true;st.ask={o:nearby(n+1,1,10),ans:n+1,ok:'Yes! '+n+' and 1 make '+(n+1)+'.'};txt=n+' '+nm(st.kind,n)+' and *1 more*. How many *in all*?';}
      else if(r===1){st.view='take';st.n=n+1;st.x=0;st.tapX=true;st.needX=1;st.afterX={o:nearby(n,0,10),ans:n,ok:'Yes! '+(n+1)+' take away 1 leaves '+n+'.'};txt='*Tap one* '+nm(st.kind,1)+' to cross it out. Then tell how many are *left*.';}
      else if(r===2){st.view='add';st.a=n;st.b=1;st.joined=false;st.ask={o:nearby(n+1,1,10).map(v=>n+' and 1 make '+v),ans:n+' and 1 make '+(n+1),ok:'Yes!'};txt='Which sentence matches?';}
      else if(r===3){st.view='take';st.n=n+1;st.x=1;st.ask={o:nearby(n,0,10).map(v=>(n+1)+' take away 1 leaves '+v),ans:(n+1)+' take away 1 leaves '+n,ok:'Yes!'};txt='Which sentence matches?';}
      else{const more=pick([true,false]);if(more){st.view='add';st.a=n;st.b=1;st.joined=false;st.ask={o:nearby(n+1,1,10),ans:n+1,ok:'Yes! '+(n+1)+' in all.'};txt='There are '+n+' '+nm(st.kind,n)+'. *One more* comes. How many now?';}
        else{st.view='take';st.n=n;st.x=0;st.ask={o:nearby(n-1,0,10),ans:n-1,ok:'Yes! '+(n-1)+' left.'};txt='There are '+n+' '+nm(st.kind,n)+'. *One* goes away. How many are *left*?';}}
      G1.draw();st.setup=false;return txt;}};}
});

/* =========================================================
   Unit 7 · Addition and Subtraction Facts to 6
   ========================================================= */
P.lesson({id:'facts6',title:'Adding and subtracting to 6',strand:'Number',codes:['B2.1','B2.2','B2.4'],
 guide:{goal:'Add and subtract numbers up to 6 with pictures, and use the signs +, − and = to write number sentences. Solve simple word problems.',words:'add, plus, +, subtract, minus, −, equals, =, number sentence, in all, left',
  ask:['What does the + sign tell you to do?','How can you show 4 − 1 with your fingers?','Which words in a story tell you to add?'],home:'Make up a snack story: "I had 3 crackers and got 2 more." Write the number sentence together: 3 + 2 = 5.'},
 learn:[{say:'Watch: 3 + 2 = 5',speech:'Three turtles are on the left. Two turtles are on the right. Join them: three plus two equals five.',view:'model',demo:'add'}],
 fig:'Two groups to join, and a group with some crossed out.',rz:.45,
 explore:['Press *+ left*, *+ right*, then *Join*.','Press *Take away* and tap toys to cross them out.','Read the number sentence.'],
 howTo:'Count the pictures. Tap the answer, or tap toys to cross them out first.',
 init:k=>Object.assign(R(),{view:'add',kind:'turtle',a:3,b:2,max:6}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=tbox(p,y-10,230,'Number sentences');
  icons(g,'turtle',3,X0+30,y,58);T(g,'+',X0+218,y+40,ZS(44),acc());icons(g,'turtle',2,X0+262,y,58);T(g,'=',X0+400,y+40,ZS(44),acc());bigText(g,'5',X0+450,y+44,52,INK);
  T(g,'+ plus     − minus     = equals',X0+30,y+118,FT.bodyB,INK);y+=162;
  y=tbox(p,y,280,'Steps for a word problem');
  ['Read the problem.','Find the key words: *in all* (add), *left* (take away).','Write a number sentence.','Find the answer.'].forEach((t,i)=>{g.beginPath();g.arc(X0+46,y+6+i*46,17,0,7);g.fillStyle=acc();g.fill();T(g,String(i+1),X0+46,y+14+i*46,FT.smallB,'#fff','center');wrap(g,t,X0+78,y+16+i*46,TW-110,34,{font:FT.body,bold:FT.bodyB,boldColor:acc()});});y+=212;
  y=exGrid(p,y,4,150,(i,x,yy,w,h)=>{
    if(i===0){icons(g,'kite',2,x+50,yy+30,48);T(g,'+',x+170,yy+64,ZS(34),acc());icons(g,'kite',3,x+200,yy+30,48);hand(g,'2 + 3 = 5',x+50,yy+130,INK);}
    if(i===1){icons(g,'strawberry',6,x+50,yy+30,46,{crossed:2});hand(g,'6 − 2 = 4',x+50,yy+130,INK);}
    if(i===2){wrap(g,'Mia has 4 shells. She finds 1 more. How many *in all*?',x+56,yy+40,w-80,30,{font:FT.small,bold:FT.smallB,boldColor:acc()});hand(g,'4 + 1 = 5',x+56,yy+132,INK);}
    if(i===3){wrap(g,'5 bees. 3 fly away. How many are *left*?',x+56,yy+40,w-80,30,{font:FT.small,bold:FT.smallB,boldColor:'#e4572e'});hand(g,'5 − 3 = 2',x+56,yy+132,INK);}
  });
  y=keyWords(p,y,[['number sentence','a math sentence like 3 + 2 = 5'],['equals (=)','is the same amount as']]);return y;},
 readout:readSent,
 build(S,grp,mode,game){const st=S.st;const G1=groups(S,grp,mode,game);
  G1.onX=()=>{if(mode==='play'&&!st.setup&&st.needX!=null&&st.x===st.needX){st.tapX=false;st.ask=st.afterX;st.needX=null;A.say('Now finish the number sentence.');A.redraw();}};
  G1.onChange=()=>{if(mode==='play'&&!st.setup&&st.needB!=null&&st.b===st.needB){st.ask=st.afterB;st.needB=null;A.say('Now tap the total.');A.redraw();}};
  G1.draw();
  return {info:()=>st.view+st.a+st.b+st.x,
    controls:()=>{let c;if(st.view==='take')c=[{t:'Add',fn:()=>{st.view='add';st.joined=false;st.a=Math.min(3,st.n);st.b=2;G1.draw();}},{t:'New',fn:()=>{st.kind=pick(KS);st.n=rnd(3,6);st.x=0;st.tapX=true;G1.draw();}}];
      else c=[{t:'+ left',fn:()=>{st.joined=false;G1.addOne(1,'a');}},{t:'+ right',fn:()=>{st.joined=false;G1.addOne(1,'b');}},{t:'− right',fn:()=>{st.joined=false;G1.addOne(-1,'b');}},{t:'Join',go:true,fn:G1.join},{t:'Take away',fn:()=>{st.view='take';st.n=Math.max(2,Math.min(6,st.a+st.b));st.x=0;st.tapX=true;G1.draw();}}];
      if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);return c;},
    demo(n){st.ask=null;st.needX=null;st.needB=null;
      if(n==='add'){st.view='add';st.kind='turtle';st.a=3;st.b=2;st.joined=false;G1.draw();A.seq([[1400,G1.join]]);}
      if(n==='two'){st.view='add';st.kind='turtle';st.a=3;st.b=2;st.joined=false;G1.draw();}if(n==='joined'){st.view='add';st.kind='turtle';st.a=3;st.b=2;st.joined=true;G1.draw();}
      if(n==='take'){st.view='take';st.kind='strawberry';st.n=6;st.x=0;G1.draw();}if(n==='took2'){st.view='take';st.kind='strawberry';st.n=6;st.x=2;G1.draw();}
      if(n==='bees'){st.view='take';st.kind='ladybug';st.n=5;st.x=3;G1.draw();}},
    task(r){st.setup=true;st.ask=null;st.needX=null;st.needB=null;st.tapX=false;st.joined=false;let txt;st.kind=pick(KS);
      if(r===0){st.view='add';st.a=rnd(1,4);st.needB=rnd(1,6-st.a);st.b=0;const t=st.a+st.needB;st.afterB={o:nearby(t,1,6),ans:t,ok:'Yes! '+st.a+' and '+st.needB+' make '+t+'.'};txt='Show *'+st.needB+' more* on the right with *+ right*. Then tap how many in all.';}
      else if(r===1){st.view='add';st.a=rnd(1,4);st.b=rnd(1,6-st.a);const t=st.a+st.b;st.ask={o:nearby(t,1,6).map(v=>st.a+' + '+st.b+' = '+v),ans:st.a+' + '+st.b+' = '+t,ok:'Yes! '+st.a+' plus '+st.b+' equals '+t+'.'};txt='Count both groups. Tap the right *number sentence*.';}
      else if(r===2){st.view='take';st.n=rnd(3,6);st.x=0;st.tapX=true;st.needX=rnd(1,st.n-1);const l=st.n-st.needX;st.afterX={o:nearby(l,0,6).map(v=>st.n+' − '+st.needX+' = '+v),ans:st.n+' − '+st.needX+' = '+l,ok:'Yes! '+st.n+' minus '+st.needX+' equals '+l+'.'};txt='*Tap '+st.needX+'* '+nm(st.kind,st.needX)+' to cross '+(st.needX>1?'them':'it')+' out. Then pick the number sentence.';}
      else if(r===3){const a=rnd(1,4),b=rnd(1,6-a);st.view='add';st.a=a;st.b=b;st.ask={o:nearby(a+b,1,6),ans:a+b,ok:'Yes! '+a+' + '+b+' = '+(a+b)+'.'};txt='Zoe has '+a+' '+nm(st.kind,a)+'. She gets '+b+' more. How many does she have *in all*?';}
      else{const n=rnd(3,6),x=rnd(1,n-1);st.view='take';st.n=n;st.x=x;st.ask={o:nearby(n-x,0,6),ans:n-x,ok:'Yes! '+n+' − '+x+' = '+(n-x)+'.'};txt='There were '+n+' '+nm(st.kind,n)+'. '+x+' rolled away. How many are *left*?';}
      G1.draw();st.setup=false;return txt;}};}
});

/* =========================================================
   Unit 8 · Addition and Subtraction Facts to 10
   ========================================================= */
P.lesson({id:'facts10',title:'Adding and subtracting to 10',strand:'Number',codes:['B2.1','B2.2'],
 guide:{goal:'Add and subtract numbers up to 10, with and without pictures, and write sums going across and going down (vertical), lining up the ones on the right.',words:'add, subtract, count on, count back, across, down, line up',
  ask:['How can a row of 10 help you add 6 + 3?','Why do we line up numbers on the right side?','What is 10 − 4? How do you know?'],home:'Put 10 coins in a row. Cover some with your hand. How many are hiding? Write it as a subtraction.'},
 learn:[{say:'Count on with the bunny.',speech:'To add six plus three, start at six and hop forward three: seven, eight, nine. Six plus three equals nine!',view:'model',demo:'counton'}],
 fig:'A number path to count on and count back, and a sum written going down.',rz:.45,
 explore:['Press *Path* to count on and count back.','Press *Groups* to join or cross out.','The card shows the sum *going down*.'],
 howTo:'Use the pictures or the number path to find the answer. Tap it.',
 init:k=>Object.assign(R(),{view:'track',kind:'shell',a:6,b:3,pos:6,from:0,to:10,max:10,vc:[6,'+',3,9]}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=tbox(p,y-10,270,'Count on, count back');
  for(let v=0;v<=10;v++){const x=X0+30+v*70;rr(g,x,y+4,62,52,8);g.fillStyle=v>=6&&v<=9?'#fff3c4':'#fff';g.fill();g.strokeStyle='#c9cfdc';g.lineWidth=2;g.stroke();T(g,String(v),x+31,y+42,ZS(28),INK,'center');}
  for(let v=6;v<9;v++){const x=X0+30+v*70+31;g.beginPath();g.moveTo(x,y);g.quadraticCurveTo(x+35,y-40,x+70,y);g.strokeStyle='#16a36f';g.lineWidth=3;g.stroke();}
  hand(g,'6 + 3: start at 6, count on 3 → 9',X0+30,y+104,'#16a36f');hand(g,'9 − 4: start at 9, count back 4 → 5',X0+30,y+150,'#e4572e');y+=200;
  y=tbox(p,y,260,'Going down: line up on the right');
  vText(g,6,'+',4,10,X0+150,y+30,42);vText(g,10,'-',3,7,X0+420,y+30,42);g.save();g.setLineDash([6,6]);g.strokeStyle='#e4572e';g.lineWidth=2;[X0+156,X0+426].forEach(x=>{g.beginPath();g.moveTo(x,y-6);g.lineTo(x,y+150);g.stroke();});g.restore();
  wrap(g,'Ones go under ones. The answer goes under the line.',X0+520,y+50,TW-520,34,{font:FT.small,bold:FT.smallB});y+=190;
  y=exGrid(p,y,4,150,(i,x,yy,w,h)=>{
    if(i===0){icons(g,'mitten',4,x+50,yy+30,46);icons(g,'mitten',5,x+50,yy+82,46,{c:'#ec407a'});hand(g,'4 + 5 = 9',x+290,yy+90,INK);}
    if(i===1){icons(g,'bell',8,x+50,yy+30,44,{cols:4,crossed:3});hand(g,'8 − 3 = 5',x+290,yy+90,INK);}
    if(i===2){vText(g,7,'+',2,9,x+150,yy+46,30);vText(g,5,'+',5,10,x+300,yy+46,30);}
    if(i===3){vText(g,9,'-',6,3,x+150,yy+46,30);vText(g,10,'-',8,2,x+300,yy+46,30);}
  });
  y=keyWords(p,y,[['count on','start at the bigger number and count up'],['vertical','written going down']]);return y;},
 readout:readSent,
 build(S,grp,mode,game){const st=S.st;const G1=groups(S,grp,mode,game);
  G1.onTile=v=>{G1.hopTo(v);if(mode==='play'&&!st.setup&&st.wantT!=null){if(v===st.wantT)A.later(()=>game.solved(st.okT),500);else A.bad(st.hintT||'Start at the first number, then hop.');}};
  G1.onX=()=>{if(mode==='play'&&!st.setup&&st.needX!=null&&st.x===st.needX){st.tapX=false;st.ask=st.afterX;st.needX=null;A.redraw();}};
  G1.draw();
  return {info:()=>st.view+st.pos,
    controls:()=>{const c=[{t:'Path',fn:()=>{st.view='track';st.from=0;st.to=10;st.pos=st.a;st.sent=null;G1.draw();}},{t:'Groups',fn:()=>{st.view='add';st.joined=false;st.sent=null;G1.draw();}},{t:'Join',go:true,fn:G1.join},{t:'New',fn:()=>{st.a=rnd(2,7);st.b=rnd(1,10-st.a);st.pos=st.a;st.joined=false;st.vc=[st.a,'+',st.b,st.a+st.b];st.kind=pick(KS);G1.draw();}}];
      if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);return c;},
    demo(n){st.ask=null;st.wantT=null;st.needX=null;st.sent=null;
      if(n==='counton'){st.view='track';st.from=0;st.to=10;st.pos=6;st.lit=[6];st.vc=[6,'+',3,9];st.sent='6 + 3 = ?';G1.draw();A.seq([[900,()=>G1.hopTo(9)],[1300,()=>{st.sent='6 + 3 = 9';G1.draw();}]]);}
      if(n==='at6'){st.view='track';st.from=0;st.to=10;st.pos=6;st.lit=[6];st.vc=[6,'+',3,9];st.sent='6 + 3 = ?';G1.draw();}
      if(/^go\d+$/.test(n))G1.hopTo(+n.slice(2));
      if(n==='back'){st.view='track';st.from=0;st.to=10;st.pos=9;st.lit=[9];st.vc=[9,'-',4,5];st.sent='9 − 4 = ?';G1.draw();A.seq([[900,()=>G1.hopTo(5)]]);}
      if(n==='at9'){st.view='track';st.from=0;st.to=10;st.pos=9;st.lit=[9];st.vc=[9,'-',4,5];st.sent='9 − 4 = ?';G1.draw();}
      if(n==='vert'){st.view='add';st.kind='shell';st.a=6;st.b=4;st.joined=true;st.vc=[6,'+',4,10];G1.draw();}
      if(n==='vsub'){st.view='take';st.kind='shell';st.n=10;st.x=3;st.vc=[10,'-',3,7];G1.draw();}},
    task(r){st.setup=true;st.ask=null;st.wantT=null;st.needX=null;st.tapX=false;st.joined=false;st.sent=null;st.lit=null;st.vc=null;let txt;st.kind=pick(KS);
      if(r===0){const a=rnd(2,7),b=rnd(1,10-a);st.view='add';st.a=a;st.b=b;st.ask={o:nearby(a+b,2,10),ans:a+b,ok:'Yes! '+a+' + '+b+' = '+(a+b)+'.'};txt='What is *'+a+' + '+b+'*? Use the pictures.';}
      else if(r===1){const a=rnd(3,8),b=rnd(1,Math.min(3,10-a));st.view='track';st.from=0;st.to=10;st.pos=a;st.lit=[a];st.sent=a+' + '+b+' = ?';st.wantT=a+b;st.okT='Yes! '+a+' + '+b+' = '+(a+b)+'.';st.hintT='Start at '+a+'. Count on '+b+'.';txt='The bunny is on *'+a+'*. Count on to find *'+a+' + '+b+'*. Tap the answer tile.';}
      else if(r===2){const n=rnd(6,10),x=rnd(2,n-2);st.view='take';st.n=n;st.x=0;st.tapX=true;st.needX=x;st.afterX={o:nearby(n-x,0,10),ans:n-x,ok:'Yes! '+n+' − '+x+' = '+(n-x)+'.'};txt='Find *'+n+' − '+x+'*. Tap '+x+' '+nm(st.kind,x)+' to cross them out, then tap the answer.';}
      else if(r===3){const sub=pick([true,false]);const a=sub?rnd(5,10):rnd(2,8),b=sub?rnd(1,a-1):rnd(1,10-a);const ans=sub?a-b:a+b;st.view=sub?'take':'add';if(sub){st.n=a;st.x=b;}else{st.a=a;st.b=b;st.joined=true;}st.vc=[a,sub?'-':'+',b,ans,true];st.big=false;
        st.ask={o:nearby(ans,0,10),ans,ok:'Yes! '+a+(sub?' − ':' + ')+b+' = '+ans+'.'};txt='Find the answer to the sum *going down* on the card.';}
      else{const left=rnd(3,7);st.view='take';st.n=10;st.x=10-left;st.ask={o:nearby(10-left,1,9),ans:10-left,ok:'Yes! 10 − '+(10-left)+' = '+left+'. '+(10-left)+' were lost.'};txt='Ben had *10* '+nm(st.kind,2)+'. Now only *'+left+'* are left. How many did he lose?';}
      G1.draw();st.big=true;st.setup=false;return txt;}};}
});

/* =========================================================
   Unit 9 · More about Addition and Subtraction (zero, key words)
   ========================================================= */
P.lesson({id:'zero1',title:'Zero, and add or subtract?',strand:'Number',codes:['B2.1','B2.4'],
 guide:{goal:'Add and subtract with zero, find that a number minus itself is zero, and choose addition or subtraction from the key words in a story.',words:'zero, 0, none, nothing, in all, total, left, fewer, more than',
  ask:['What is 7 + 0? Why?','What is 5 − 5? Why?','Which words in a story tell you to subtract?'],home:'Hide all the blocks in a box: "6 take away 6 leaves 0!" Add nothing: "6 and 0 make 6!"'},
 learn:[{say:'All gone: 4 − 4 = 0',speech:'There are four cupcakes. All four get eaten. Four take away four leaves zero. None are left!',view:'model',demo:'allgone'}],
 fig:'Adding nothing, taking away everything, and choosing + or −.',rz:.45,
 explore:['Press *Add 0* and *Take all*.','Tap toys to cross them out.','Zero means *none*.'],
 howTo:'Read the story or the sum. Tap the answer, or tap the sign that fits the story.',
 init:k=>Object.assign(R(),{view:'take',kind:'cupcake',n:4,x:0,max:10}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=tbox(p,y-10,250,'Zero means none');
  icons(g,'block',5,X0+30,y,52);T(g,'+ 0 =',X0+330,y+40,ZS(40),acc());icons(g,'block',5,X0+470,y,52);hand(g,'Add zero: the number stays the same.',X0+30,y+102,INK);
  icons(g,'cupcake',4,X0+30,y+120,46,{crossed:4});hand(g,'4 − 4 = 0.  Take away all: zero left.',X0+260,y+156,'#e4572e');y+=190;
  y=tbox(p,y,240,'Which sign? Look for key words');
  T(g,'+  add',X0+30,y+10,ZS(34),'#16a36f');wrap(g,'*in all*, *total*, *altogether*, *more come*',X0+190,y+6,TW-220,34,{font:FT.body,bold:FT.bodyB,boldColor:'#16a36f'});
  T(g,'−  subtract',X0+30,y+70,ZS(34),'#e4572e');wrap(g,'*left*, *fewer*, *more than*, *go away*',X0+250,y+66,TW-280,34,{font:FT.body,bold:FT.bodyB,boldColor:'#e4572e'});
  T(g,'=  equals',X0+30,y+130,ZS(34),acc());T(g,'is the same as',X0+250,y+124,FT.body,INK);y+=180;
  y=exGrid(p,y,4,150,(i,x,yy,w,h)=>{
    if(i===0){hand(g,'8 + 0 = 8',x+56,yy+60,INK);hand(g,'0 + 3 = 3',x+56,yy+112,INK);}
    if(i===1){hand(g,'6 − 0 = 6',x+56,yy+60,INK);hand(g,'9 − 9 = 0',x+56,yy+112,INK);}
    if(i===2){wrap(g,'7 red cars and 2 blue cars. How many cars *in all*?',x+56,yy+40,w-80,30,{font:FT.small,bold:FT.smallB,boldColor:'#16a36f'});hand(g,'7 + 2 = 9',x+56,yy+132,INK);}
    if(i===3){wrap(g,'8 big pears, 3 small pears. How many *more* big pears?',x+56,yy+40,w-80,30,{font:FT.small,bold:FT.smallB,boldColor:'#e4572e'});hand(g,'8 − 3 = 5',x+56,yy+132,INK);}
  });
  y=keyWords(p,y,[['zero (0)','none, nothing at all'],['total','how many altogether']]);return y;},
 readout:readSent,
 build(S,grp,mode,game){const st=S.st;const G1=groups(S,grp,mode,game);
  G1.onX=()=>{if(mode==='play'&&!st.setup&&st.needX!=null&&st.x===st.needX){st.tapX=false;st.ask=st.afterX;st.needX=null;A.redraw();}};
  G1.draw();
  return {info:()=>st.view+st.n+st.x+st.a+st.b,
    controls:()=>{const c=[{t:'Add 0',fn:()=>{st.view='add';st.a=rnd(2,8);st.b=0;st.joined=false;G1.draw();A.later(G1.join,600);}},{t:'Take all',go:true,fn:()=>{st.view='take';st.n=st.n||5;st.tapX=true;A.seq([...Array(st.n)].map((_,i)=>[300,()=>{st.x=i+1;G1.draw();}]));}},{t:'New',fn:()=>{st.kind=pick(KS);st.view='take';st.n=rnd(3,8);st.x=0;st.tapX=true;G1.draw();}}];
      if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);return c;},
    demo(n){st.ask=null;st.needX=null;
      if(n==='allgone'){st.view='take';st.kind='cupcake';st.n=4;st.x=0;G1.draw();A.seq([1,2,3,4].map(k=>[500,()=>{st.x=k;G1.draw();}]));}
      if(n==='four'){st.view='take';st.kind='cupcake';st.n=4;st.x=0;G1.draw();}if(n==='none'){st.view='take';st.kind='cupcake';st.n=4;st.x=4;G1.draw();}
      if(n==='add0'){st.view='add';st.kind='block';st.a=5;st.b=0;st.joined=false;G1.draw();}if(n==='add0j'){st.view='add';st.kind='block';st.a=5;st.b=0;st.joined=true;G1.draw();}
      if(n==='cars'){st.view='add';st.kind='car';st.kind2='car';st.a=7;st.b=2;st.joined=false;G1.draw();}if(n==='carsj'){st.view='add';st.kind='car';st.a=7;st.b=2;st.joined=true;G1.draw();}},
    task(r){st.setup=true;st.ask=null;st.needX=null;st.tapX=false;st.joined=false;st.kind2=null;let txt;st.kind=pick(KS);
      if(r===0){const a=rnd(1,9);const zf=pick([true,false]);st.view='add';st.a=zf?0:a;st.b=zf?a:0;st.joined=true;st.ask={o:nearby(a,0,10),ans:a,ok:'Yes! Adding zero changes nothing: '+a+'.'};txt='What is *'+st.a+' + '+st.b+'*?';}
      else if(r===1){const a=rnd(2,9);st.view='take';st.n=a;st.x=0;st.tapX=true;st.needX=a;st.afterX={o:[0,1,a],ans:0,ok:'Yes! '+a+' − '+a+' = 0. None are left.'};txt='Cross out *all* the '+nm(st.kind,2)+' (tap each one). How many are left?';}
      else if(r===2){const a=rnd(2,9);st.view='take';st.n=a;st.x=0;st.ask={o:[0,a,a-1].filter((v,i,s)=>s.indexOf(v)===i),ans:a,ok:'Yes! Taking away zero leaves '+a+'.'};txt='What is *'+a+' − 0*?';}
      else if(r===3){const add=pick([true,false]);const a=rnd(3,7),b=rnd(1,add?10-a:a-1);const nm2=nm(st.kind,2);
        const story=add?pick(['Ava has '+a+' '+nm2+'. Leo gives her '+b+' more. How many '+nm2+' are there *in all*?','There are '+a+' big '+nm2+' and '+b+' small '+nm2+'. How many '+nm2+' in *total*?']):pick(['Sam had '+a+' '+nm2+'. '+b+' rolled away. How many are *left*?','There are '+a+' red '+nm2+' and '+b+' blue '+nm2+'. How many *more* red than blue?']);
        st.view=add?'add':'take';if(add){st.a=a;st.b=b;}else{st.n=a;st.x=0;}st.ask={o:['+','−'],ans:add?'+':'−',ok:add?'Yes! "In all" and "total" mean add.':'Yes! "Left" and "more than" mean subtract.'};txt=story+' Tap the sign: *+* or *−*?';}
      else{const sub=pick([true,false]);const a=rnd(4,9),b=rnd(1,sub?a-1:10-a);const ans=sub?a-b:a+b;st.view=sub?'take':'add';if(sub){st.n=a;st.x=b;}else{st.a=a;st.b=b;st.joined=true;}
        st.ask={o:nearby(ans,0,10),ans,ok:'Yes! '+a+(sub?' − ':' + ')+b+' = '+ans+'.'};txt=sub?'Kim made '+a+' snow balls. '+b+' melted. How many are *left*?':'Kim made '+a+' snow balls. Then she made '+b+' more. How many *in all*?';}
      G1.draw();st.setup=false;return txt;}};}
});
Object.assign(K,{groups,vCard,vText,readSent,R0:R,VC,KS});
})();
