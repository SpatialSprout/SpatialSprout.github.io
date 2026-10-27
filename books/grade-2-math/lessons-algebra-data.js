/* The Interactive Classroom: Grade 2 Math — Algebra (12–16) and Data (17–20) */
(function(){
"use strict";
const P=window.PM;if(!P||P.failed||!P.THREE)return;
const {THREE,V,W,D,PY,PX,X0,TW,INK,RED,BLUE,GREY,VIBE,FT,ZS,G,M,lam,mk,unitBox,cellMat,label,starGeo,wedgeGeo,clearGroup,disposeObj,rr,T,wrap,para,header,keyWords,predict,box,caption,cxOf,cyOf,tint,moveTo,hop,tween,burst,easeOut,easeIO,A}=P;
const acc=()=>P.ACC;
const rnd=(a,b)=>a+Math.floor(Math.random()*(b-a+1)),pick=a=>a[Math.floor(Math.random()*a.length)],shuffle=a=>a.slice().sort(()=>Math.random()-.5);
function choices(game,list,ans,ok,lab){return list.map(o=>({t:lab?lab(o):String(o),big:true,fn:()=>{if(o===ans){if(game)game.solved(ok);else A.good(ok);}else A.bad('Not quite. Try again!');}}));}
const COL=['#ff6b35','#ff8a3d','#ffc04d','#5fd38a','#2f7de1','#8b5cf6'];const HAND=()=>FT.hand||FT.body;
function seg(a,b,col,r){const len=a.distanceTo(b);const m=new THREE.Mesh(new THREE.CylinderGeometry(r,r,Math.max(.001,len),8),lam(col));m.position.copy(a).add(b).multiplyScalar(.5);m.quaternion.setFromUnitVectors(V(0,1,0),b.clone().sub(a).normalize());return m;}
function poly(n,r,col,h){return mk(G('g2poly'+n+r+(h||.08),()=>new THREE.CylinderGeometry(r,r,h||.08,n)),lam(col),20);}

/* =========================================================
   12. Geometric patterns
   ========================================================= */
const GP={turn:{n:'turning triangle',core:4,make:i=>({s:3,rot:i%4*Math.PI/2,c:'#ff8a3d'})},col:{n:'shape and colour',core:3,make:i=>({s:[4,3,6][i%3],rot:0,c:['#2f7de1','#ff6b35','#5fd38a'][i%3]})},grow:{n:'growing stairs',core:0,make:i=>({s:4,rot:0,c:'#8b5cf6',h:i+1})}};
P.lesson({id:'geopat2',title:'Patterns in designs',strand:'Algebra',codes:['C1.1','C1.2'],
 guide:{goal:'Identify and describe patterns involving geometric designs, including real-life patterns, and create and translate patterns using shapes and numbers.',words:'pattern, design, repeat, turn, rotate, core, translate',
  ask:['How does the triangle change each time?','How can you show this pattern with numbers?','Where do you see patterns in buildings or quilts?'],home:'Look for patterns on quilts, tiles or fences. Draw one and describe how it repeats.'},
 learn:[{say:'Watch the triangle turn.',speech:'Ayo’s triangle turns a quarter turn each time. Point up, point right, point down, point left, then up again! The core has four tiles.',view:'model',demo:'turn'},
        {say:'Read about translating.',speech:'We can show a pattern in a new way. A square, triangle, hexagon pattern can be written with numbers of sides: four, three, six, four, three, six.',view:'read'},
        {say:'Watch: a growing pattern.',speech:'This design grows! One block, then two, then three, then four. Each step adds one block. It looks like stairs.',view:'model',demo:'grow'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: what comes next?',speech:'Your turn! Look closely and tap the tile that comes next.',view:'model'}],
 fig:'A row of tiles making a design pattern.',rz:.35,
 explore:['Choose a *pattern*.','Press *Next* to grow it.','Show it as *numbers*.'],
 howTo:'Tap the tile that comes next, or choose the answer.',
 init:k=>({kind:'turn',n:5,nums:false,want:false,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'*Design patterns* repeat or grow using shapes, colours and turns.')+16;
  for(let i=0;i<8;i++){g.save();g.translate(X0+50+i*95,y+50);g.rotate(i%4*Math.PI/2);g.beginPath();g.moveTo(0,-34);g.lineTo(30,26);g.lineTo(-30,26);g.closePath();g.fillStyle='#ff8a3d';g.fill();g.restore();}T(g,'turns a quarter turn each time',X0,y+120,FT.bodyB,acc());y+=150;
  const sh=(x,n,c)=>{g.beginPath();for(let k=0;k<n;k++){const a=-Math.PI/2+k*2*Math.PI/n;g.lineTo(x+Math.cos(a)*30,y+40+Math.sin(a)*30);}g.closePath();g.fillStyle=c;g.fill();};
  for(let i=0;i<6;i++){sh(X0+50+i*95,[4,3,6][i%3],['#2f7de1','#ff6b35','#5fd38a'][i%3]);T(g,String([4,3,6][i%3]),X0+50+i*95,y+100,FT.bodyB,INK,'center');}T(g,'as numbers of sides',X0+620,y+46,FT.small,GREY);y+=140;
  y=keyWords(p,y,[['design','a picture made with shapes'],['translate','show the same pattern a new way']]);
  predict(p,y,S,'p12','Up, right, down, left, up, right, ___?','*Down!* The core is 4 turns.');},
 readout(p,S,y){const g=p.g,st=S.st,K=GP[st.kind];const seq=Array.from({length:st.n},(_,i)=>K.make(i));T(g,K.n,X0,y+40,FT.bodyB,acc());T(g,st.kind==='grow'?seq.map(o=>o.h).join(', '):st.kind==='col'?seq.map(o=>o.s).join(', '):seq.map(o=>['up','right','down','left'][Math.round(o.rot/(Math.PI/2))%4]).join(', '),X0,y+84,FT.bodyB);return y+94;},
 build(S,grp,mode,game){const st=S.st;const g2=new THREE.Group(),tray=new THREE.Group();grp.add(g2,tray);
  function tile(o,x,z){const g=new THREE.Group();const base=mk(G('g2gpb',()=>new THREE.BoxGeometry(.4,.04,.4)),lam('#ffffff'),20);g.add(base);if(o.h){for(let k=0;k<o.h;k++){const c=mk(G('g2gpc',()=>new THREE.BoxGeometry(.2,.16,.2)),lam(o.c),20);c.position.set(0,.1+k*.16,0);g.add(c);}}else{const p=poly(o.s,.16,o.c);p.position.y=.07;p.rotation.y=(o.s===4?Math.PI/4:0)-o.rot+(o.s===3?Math.PI:0);g.add(p);}g.position.set(x,.02,z);return g;}
  function draw(){clearGroup(g2);clearGroup(tray);const K=GP[st.kind];for(let i=0;i<st.n;i++){const t=tile(K.make(i),-2.0+i*.46,-2.2);g2.add(t);if(st.nums){const o=K.make(i);const l=label(String(o.h||o.s),{size:.18,color:INK});l.position.set(-2.0+i*.46,o.h?o.h*.16+.3:.35,-2.2);g2.add(l);}}
    if(st.n<10){const q=label('?',{size:.34,color:acc()});q.position.set(-2.0+st.n*.46,.35,-2.2);g2.add(q);}
    if(st.want){const right=K.make(st.n);const opts=st.kind==='turn'?[0,1,2,3].map(k=>({s:3,rot:k*Math.PI/2,c:'#ff8a3d'})):st.kind==='col'?[0,1,2].map(k=>K.make(k)):[st.n,st.n+1,st.n+2].map(h=>({s:4,rot:0,c:'#8b5cf6',h}));
      if(!st.perm||st.perm.length!==opts.length)st.perm=shuffle(opts.map((_,i)=>i));const po=st.perm.map(i=>opts[i]);po.forEach((o,i)=>{const t=tile(o,-1.2+i*.8,-1.0);tray.add(t);const ok=JSON.stringify(o)===JSON.stringify(right);t.traverse(m=>{if(m.isMesh)A.drag(m,{tap:()=>pickT(ok)});});});}A.redraw();}
  function pickT(ok){A.pop();if(mode==='play'&&!st.setup&&st.want){if(ok){st.n++;st.want=false;draw();game.solved('Yes! That comes next!');}else A.bad('Look at how each tile changes.');}}
  function next(){st.n=st.n>=10?3:st.n+1;A.pop();draw();}
  draw();
  return {info:()=>st.kind+st.n,
    controls:()=>{const c=Object.keys(GP).map(k=>({t:GP[k].n,on:st.kind===k,fn:()=>{st.kind=k;st.n=5;draw();}})).concat([{t:'Next',go:true,fn:next},{t:st.nums?'Hide numbers':'Show numbers',fn:()=>{st.nums=!st.nums;draw();}}]);if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c.slice(-1));if(mode==='play'&&st.want)return c.slice(-1);return c;},
    demo(n){if(n==='show'){st.want=false;st.nums=false;st.kind='turn';st.n=5;draw();return;}if(n==='grow4'){st.want=false;st.nums=false;st.kind='grow';st.n=4;draw();return;}st.ask=null;st.want=false;st.nums=false;if(n==='turn'){st.kind='turn';st.n=1;draw();A.seq([2,3,4,5,6].map(k=>[550,()=>{st.n=k;draw();}]));}if(n==='grow'){st.kind='grow';st.n=1;draw();A.seq([2,3,4].map(k=>[650,()=>{st.n=k;draw();}]));}},
    task(r){st.setup=true;st.ask=null;st.want=false;st.nums=false;st.perm=null;let txt;
      if(r<3){st.kind=['turn','col','grow'][r];st.n=r===2?4:6;st.want=true;txt='What comes *next*? Tap it!';}
      else if(r===3){st.kind='col';st.n=6;st.nums=false;st.ask={ans:'4, 3, 6, 4, 3, 6',o:shuffle(['4, 3, 6, 4, 3, 6','3, 4, 6, 3, 4, 6','4, 4, 3, 3, 6, 6']),ok:'Yes! Square 4, triangle 3, hexagon 6.'};txt='Show this pattern with *numbers of sides*.';}
      else{st.kind='turn';st.n=6;st.ask={ans:'4',o:shuffle(['4','2','6']),ok:'Yes! Up, right, down, left.'};txt='How many tiles are in the *core*?';}
      draw();st.setup=false;return txt;}};}
});

/* =========================================================
   13. Pattern rules on the hundred chart
   ========================================================= */
P.lesson({id:'chart2',title:'Number patterns to 100',strand:'Algebra',codes:['C1.3','C1.4'],
 guide:{goal:'Determine pattern rules and use them to extend patterns, make predictions and find missing elements, and create patterns that show relationships among numbers up to 100.',words:'hundred chart, rule, add, subtract, column, row, missing, predict',
  ask:['What happens when you add 10 on a hundred chart?','What is the rule for 5, 10, 15, 20?','What number is missing: 34, 44, ___, 64?'],home:'Colour every 5th number on a hundred chart. What shape does the pattern make?'},
 learn:[{say:'Patterns light up!',speech:'Jayden starts at five and adds five again and again. Five, ten, fifteen, twenty… The numbers make two columns on the hundred chart! The rule is add five.',view:'model',demo:'by5'},
        {say:'Read about rules.',speech:'Adding ten moves straight down one row. Adding one moves one step right. Patterns help us predict: start at four and add ten. The numbers are four, fourteen, twenty-four, thirty-four…',view:'read'},
        {say:'Watch: add 10.',speech:'Start at three and add ten. Three, thirteen, twenty-three, thirty-three… straight down the column!',view:'model',demo:'by10'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: follow the rule!',speech:'Your turn! Choose a start and a rule, and watch the pattern.',view:'model'}],
 fig:'A hundred chart with a lit-up number pattern.',rz:.35,
 explore:['Choose the *start* and the *rule*.','Press *Show pattern*.','*Tap a number* to answer.'],
 howTo:'Tap the next or missing number.',
 init:k=>({start:5,d:5,lit:20,want:null,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'On a *hundred chart*, +1 moves right and +10 moves down.')+12;
  const cw=TW/10,ch=36;for(let i=0;i<100;i++){const n=i+1,x=X0+(i%10)*cw,yy=y+Math.floor(i/10)*ch;const on=n%5===0;g.fillStyle=on?'#ffe08a':'#ffffff';g.fillRect(x+1,yy+1,cw-2,ch-2);T(g,String(n),x+cw/2,yy+25,FT.small,INK,'center');}y+=ch*10+16;
  y=para(p,y,'*Rule: add 5.* 5, 10, 15, 20 … makes two columns.')+8;
  y=keyWords(p,y,[['rule','what you do each time'],['predict','use the rule to find a later number']]);
  predict(p,y,S,'p13','34, 44, ___, 64: what is missing?','*54.* Add 10.');},
 readout(p,S,y){const g=p.g,st=S.st;const v=[];for(let n=st.start;n<=100&&v.length<9;n+=st.d)v.push(n);T(g,'Start '+st.start+', add '+st.d,X0,y+36,FT.bodyB,acc());T(g,v.join(', ')+' …',X0,y+80,FT.bodyB);return y+92;},
 build(S,grp,mode,game){const st=S.st,c=.4,x0=-1.8,z0=-3.0;const g2=new THREE.Group();grp.add(g2);
  function texFor(){const cv=document.createElement('canvas');cv.width=cv.height=800;const g=cv.getContext('2d');for(let i=0;i<100;i++){const n=i+1,x=(i%10)*80,y=Math.floor(i/10)*80;const on=n>=st.start&&n<=st.lit&&(n-st.start)%st.d===0;g.fillStyle=on?'#ffc04d':'#ffffff';g.fillRect(x+2,y+2,76,76);g.fillStyle=INK;g.font='700 36px "Zilla Slab", Georgia, serif';g.textAlign='center';g.textBaseline='middle';g.fillText(String(n),x+40,y+42);}
    const t=new THREE.CanvasTexture(cv);t.anisotropy=4;return new THREE.MeshLambertMaterial({map:t});}
  function draw(){clearGroup(g2);const b=mk(new THREE.BoxGeometry(10*c,.06,10*c*.82),[lam('#e2e8f0'),lam('#e2e8f0'),texFor(),lam('#e2e8f0'),lam('#e2e8f0'),lam('#e2e8f0')],20);b.position.set(x0+4.5*c,.03,z0+4.5*c*.82);g2.add(b);
    for(let n=1;n<=100;n++){const h=mk(G('g2ch',()=>new THREE.BoxGeometry(c*.9,.02,c*.74)),new THREE.MeshBasicMaterial({transparent:true,opacity:0,depthWrite:false}),0);h.position.set(x0+((n-1)%10)*c,.08,z0+Math.floor((n-1)/10)*c*.82);g2.add(h);A.drag(h,{tap:()=>tap(n)});}A.redraw();}
  function tap(n){A.pop();A.say(String(n));if(mode==='play'&&!st.setup&&st.want!=null){if(n===st.want){st.lit=Math.max(st.lit,n);draw();game.solved('Yes! '+n+' follows the rule!');}else A.bad('Use the rule: add '+st.d+'.');}}
  function show(){st.lit=st.start;draw();const s=[];for(let n=st.start+st.d;n<=100;n+=st.d)s.push([260,()=>{st.lit=n;draw();}]);A.seq(s);}
  draw();
  return {info:()=>st.start+'+'+st.d,
    controls:()=>{const c=[{t:'Show pattern',go:true,fn:show},{t:'start +',fn:()=>{st.start=Math.min(10,st.start+1);st.lit=st.start;draw();}},{t:'start −',fn:()=>{st.start=Math.max(1,st.start-1);st.lit=st.start;draw();}}].concat([2,5,10].map(d=>({t:'add '+d,on:st.d===d,fn:()=>{st.d=d;st.lit=st.start;draw();}})));if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok);return c;},
    demo(n){if(n==='blank'){st.start=3;st.d=10;st.lit=0;draw();return;}if(n==='by10now'){st.start=3;st.d=10;show();return;}if(n==='by5now'){st.start=5;st.d=5;show();return;}st.ask=null;st.want=null;if(n==='by5'){st.start=5;st.d=5;show();}if(n==='by10'){st.start=3;st.d=10;show();}},
    task(r){st.setup=true;st.ask=null;st.want=null;let txt;
      if(r===0){st.start=pick([2,4,6]);st.d=10;st.lit=st.start+30;st.want=st.start+40;txt='Rule: *add 10*. Tap the *next* number.';}
      else if(r===1){st.start=5;st.d=5;st.lit=35;st.want=40;txt='Rule: *add 5*. Tap the *next* number after 35.';}
      else if(r===2){st.start=1;st.d=2;st.lit=15;st.want=17;txt='1, 3, 5 … 15. Tap the *next* number.';}
      else if(r===3){st.start=34;st.d=10;st.lit=44;st.ask={ans:'54',o:shuffle(['54','45','55']),ok:'Yes! Add 10: 54.'};txt='34, 44, ___, 64. What is *missing*?';}
      else{st.start=10;st.d=10;st.lit=40;st.ask={ans:'100',o:shuffle(['100','90','110']),ok:'Yes! The 10th number is 100.'};txt='10, 20, 30, 40 … *Predict* the 10th number.';}
      draw();st.setup=false;return txt;}};}
});

/* =========================================================
   14. Symbols as variables
   ========================================================= */
P.lesson({id:'symbol2',title:'Mystery numbers',strand:'Algebra',codes:['C2.1'],
 guide:{goal:'Identify when symbols are being used as variables, and describe how they are being used.',words:'symbol, variable, mystery number, box, equation, unknown',
  ask:['What does the box stand for in □ + 4 = 9?','Can a star stand for a number?','How do you find the mystery number?'],home:'Hide some buttons in your hand. Show the rest and say: “I have 10 in all. How many are hiding?”'},
 learn:[{say:'What is in the box?',speech:'Box plus four equals nine. Priya’s box is a mystery number. Four counters are outside, and nine in all. Open the box: there are five! The box stands for five.',view:'model',demo:'open'},
        {say:'Read about symbols.',speech:'A symbol like a box, a star or a letter can stand for a number we do not know yet. It is called a variable. In star plus star equals eight, both stars are the same number: four.',view:'read'},
        {say:'Watch: a star.',speech:'Twelve minus star equals seven. How many were taken away? Count up from seven to twelve: five! The star is five.',view:'model',demo:'star'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: find the mystery!',speech:'Your turn! Guess the mystery number, then open the box to check.',view:'model'}],
 fig:'A mystery box hiding counters, beside counters you can see.',rz:.35,
 explore:['Read the *equation*.','Press *Open the box* to check.','Press *New mystery*.'],
 howTo:'Find the mystery number, then choose it.',
 init:k=>({hid:5,see:4,sym:'□',op:'+',open:false,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'A *symbol* can stand for a *mystery number*. It is called a *variable*.')+16;
  [['□ + 4 = 9','□ = 5'],['★ + ★ = 8','★ = 4'],['12 − ▲ = 7','▲ = 5'],['n + 10 = 30','n = 20']].forEach(([a,b],i)=>{rr(g,X0,y+i*70,TW,62,14);g.fillStyle=tint(COL[i+1],.16);g.fill();T(g,a,X0+30,y+i*70+42,ZS(36),INK);T(g,b,X0+TW-30,y+i*70+42,ZS(36),acc(),'right');});y+=300;
  y=para(p,y,'The *same symbol* in one equation always stands for the *same number*.')+10;
  y=keyWords(p,y,[['variable','a symbol for a number we do not know yet'],['equation','a number sentence with an equal sign']]);
  predict(p,y,S,'p14','■ + 6 = 10. What is ■?','*4!*');},
 readout(p,S,y){const g=p.g,st=S.st;const eq=st.op==='+'?st.sym+' + '+st.see+' = '+(st.hid+st.see):(st.hid+st.see)+' − '+st.sym+' = '+st.see;T(g,eq,X0,y+52,ZS(50),acc());T(g,st.open?st.sym+' = '+st.hid:'What is '+st.sym+'?',X0,y+96,FT.bodyB);return y+104;},
 build(S,grp,mode,game){const st=S.st;const g2=new THREE.Group();grp.add(g2);let lid=null;
  function draw(){clearGroup(g2);const bx=mk(new THREE.BoxGeometry(1.4,.5,1.0),lam('#8b5cf6'),20);bx.position.set(-1.1,.25,-2.0);g2.add(bx);
    for(let i=0;i<st.hid;i++){const c=mk(G('g2sc',()=>new THREE.CylinderGeometry(.11,.11,.06,18)),lam('#ffc04d'),0);c.position.set(-1.5+(i%4)*.26,.53,-2.25+Math.floor(i/4)*.26);c.visible=st.open;g2.add(c);}
    lid=mk(new THREE.BoxGeometry(1.46,.08,1.06),lam('#a78bfa'),20);lid.position.set(-1.1,.54,-2.0);if(st.open){lid.position.set(-1.1,.9,-2.6);lid.rotation.x=-1.1;}g2.add(lid);const sl=label(st.sym,{size:.4,color:'#ffffff'});sl.position.set(-1.1,.3,-1.48);g2.add(sl);
    const n=st.op==='+'?st.see:st.see;for(let i=0;i<n;i++){const c=mk(G('g2sc',()=>new THREE.CylinderGeometry(.11,.11,.06,18)),lam('#2f7de1'),0);c.position.set(.5+(i%4)*.3,.04,-2.3+Math.floor(i/4)*.3);g2.add(c);}
    const eq=label(st.op==='+'?st.sym+' + '+st.see+' = '+(st.hid+st.see):(st.hid+st.see)+' − '+st.sym+' = '+st.see,{size:.32,bg:'#ffffff'});eq.position.set(0,1.4,-2.8);g2.add(eq);const lab=label(st.op==='+'?'outside':'left',{size:.15,color:GREY});lab.position.set(.95,.1,-1.3);g2.add(lab);A.redraw();}
  function open(){st.open=!st.open;A.pop();draw();if(st.open)A.say(st.sym+' is '+st.hid+'!');}
  draw();
  return {info:()=>st.sym+st.hid,
    controls:()=>{const c=[{t:st.open?'Close the box':'Open the box',go:true,fn:open},{t:'New mystery',fn:()=>{st.hid=rnd(2,8);st.see=rnd(2,8);st.sym=pick(['□','★','▲','n']);st.op=pick(['+','-']);st.open=false;draw();}}];if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);return c;},
    demo(n){if(n==='show'){st.open=false;st.hid=5;st.see=4;st.sym='□';st.op='+';draw();return;}if(n==='opennow'){st.open=false;open();return;}st.ask=null;st.open=false;if(n==='open'){st.hid=5;st.see=4;st.sym='□';st.op='+';draw();A.seq([[1200,open]]);}if(n==='star'){st.hid=5;st.see=7;st.sym='★';st.op='-';draw();A.seq([[1400,open]]);}},
    task(r){st.setup=true;st.open=false;let txt;
      if(r<3){st.op=r===2?'-':'+';st.hid=rnd(3,8);st.see=rnd(2,7);st.sym=['□','★','▲'][r];const a=String(st.hid);st.ask={ans:a,o:shuffle([a,String(st.hid+st.see),String(st.hid+1)]),ok:'Yes! '+st.sym+' = '+st.hid+'.'};txt='What number is *'+st.sym+'*?';}
      else if(r===3){st.op='+';st.hid=4;st.see=4;st.sym='★';st.ask={ans:'4',o:shuffle(['4','8','2']),ok:'Yes! 4 + 4 = 8, so ★ = 4.'};txt='*★ + ★ = 8*. Both stars are the same number. What is ★?';}
      else{st.op='+';st.hid=20;st.see=10;st.sym='n';st.ask={ans:'A mystery number',o:shuffle(['A mystery number','A letter to read','A plus sign']),ok:'Yes! Symbols can be variables.'};txt='In *n + 10 = 30*, what is *n*?';}
      draw();st.setup=false;return txt;}};}
});

/* =========================================================
   15. Equal expressions
   ========================================================= */
P.lesson({id:'equal2',title:'Making both sides equal',strand:'Algebra',codes:['C2.2','C2.3'],
 guide:{goal:'Determine what needs to be added to or subtracted from addition and subtraction expressions to make them equivalent, and use equivalent relationships for numbers up to 100.',words:'equal, balance, both sides, equivalent, make equal, =',
  ask:['What do you add to make 7 + 5 equal 10 + □?','How does a balance show equal?','Is 30 + 20 equal to 40 + 10?'],home:'Use coins to show two ways to make 50¢. Are they equal?'},
 learn:[{say:'Balance both sides.',speech:'Omar puts seven plus five on the left. Ten plus box on the right. Seven plus five is twelve. Ten plus two is twelve. The box is two, and the balance is level!',view:'model',demo:'fix'},
        {say:'Read about equivalent.',speech:'Expressions are equivalent when they have the same value. Thirty plus twenty and forty plus ten are both fifty, so they are equivalent.',view:'read'},
        {say:'Watch: take some away.',speech:'Fifteen on the left and nineteen on the right. To make them equal, take four away from the right side. Now both are fifteen!',view:'model',demo:'sub'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: level it!',speech:'Your turn! Add or take away on the right side until the balance is level.',view:'model'}],
 fig:'A balance with number blocks on each side.',rz:.35,
 explore:['Change the *right side*.','Level means *equal*.','Read the equation.'],
 howTo:'Make the balance level.',
 init:k=>({L:[7,5],R:[10,0],need:false,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'Two expressions are *equivalent* when they have the *same value*.')+16;
  [['7 + 5 = 10 + □','□ = 2'],['30 + 20 = 40 + □','□ = 10'],['15 = 19 − □','□ = 4'],['25 + 25 = 50','equal!']].forEach(([a,b],i)=>{rr(g,X0,y+i*70,TW,62,14);g.fillStyle=tint(COL[i+2],.18);g.fill();T(g,a,X0+30,y+i*70+42,ZS(34),INK);T(g,b,X0+TW-30,y+i*70+42,ZS(34),acc(),'right');});y+=300;
  y=keyWords(p,y,[['equivalent','the same value'],['balance','level when both sides are equal']]);
  predict(p,y,S,'p15','8 + 6 = 10 + □. What is □?','*4!* Both are 14.');},
 readout(p,S,y){const g=p.g,st=S.st;const a=st.L[0]+st.L[1],b=st.R[0]+st.R[1];T(g,st.L.join(' + ')+(a===b?' = ':' ≠ ')+st.R[0]+(st.R[1]>=0?' + '+st.R[1]:' − '+(-st.R[1])),X0,y+54,ZS(46),a===b?'#16a36f':RED);T(g,a+(a===b?' = ':a>b?' > ':' < ')+b,X0,y+96,FT.bodyB);return y+104;},
 build(S,grp,mode,game){const st=S.st;const g2=new THREE.Group();grp.add(g2);const post=mk(new THREE.CylinderGeometry(.06,.08,1.2,12),lam('#64748b'),0);post.position.set(0,.6,-2.2);grp.add(post);let tilt=0,cur=0,arm=null;
  function draw(){clearGroup(g2);const a=st.L[0]+st.L[1],b=st.R[0]+st.R[1];tilt=Math.max(-.22,Math.min(.22,(b-a)*.03));arm=new THREE.Group();arm.position.set(0,1.22,-2.2);arm.rotation.z=-cur;g2.add(arm);arm.add(mk(new THREE.BoxGeometry(3.8,.07,.12),lam('#475569'),0));
    [[-1.5,st.L,'#2f7de1'],[1.5,st.R,'#ff6b35']].forEach(([x,v,c])=>{const pan=new THREE.Group();pan.position.set(x,-.7,0);arm.add(pan);pan.add(mk(new THREE.CylinderGeometry(.7,.7,.04,28),lam('#cbd5e1'),20));
      v.forEach((n,j)=>{if(!n)return;const h=Math.min(.7,.08+Math.abs(n)*.012);const blk=mk(new THREE.BoxGeometry(.5,h,.4),lam(n<0?'#f87171':j?tint(c,.4):c),20);blk.position.set(j?.27:-.27,.02+h/2,0);pan.add(blk);const l=label((n<0?'−':'')+Math.abs(n),{size:.2,bg:'#ffffff'});l.position.set(j?.27:-.27,h+.2,0);pan.add(l);});
      [[-.6],[.6]].forEach(([dx])=>pan.add(seg(V(dx,0,0),V(0,.7,0),'#94a3b8',.01)));});
    const eq=label(st.L.join(' + ')+(a===b?' = ':' ≠ ')+st.R[0]+(st.R[1]>=0?' + '+st.R[1]:' − '+(-st.R[1])),{size:.3,bg:'#ffffff',border:a===b?'#16a36f':RED});eq.position.set(0,2.2,-2.6);g2.add(eq);
    if(mode==='play'&&!st.setup&&st.need&&a===b)game.solved('Level! Both sides are '+a+'.');A.redraw();}
  const set=d=>{const v=st.R[1]+d;if(v<-20||v>40)return;st.R[1]=v;A.pop();draw();};
  draw();
  return {tick(dt){if(arm){cur+=(tilt-cur)*Math.min(1,dt*4);arm.rotation.z=-cur;}},info:()=>st.L.join('+')+'|'+st.R.join(','),
    controls:()=>{const c=[{t:'right + 1',go:true,fn:()=>set(1)},{t:'right − 1',fn:()=>set(-1)},{t:'right + 10',fn:()=>set(10)},{t:'right − 10',fn:()=>set(-10)}];if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok);return c;},
    demo(n){if(n==='show'){st.L=[7,5];st.R=[10,0];draw();return;}if(n==='plus2'){st.L=[7,5];st.R=[10,2];A.pop();draw();return;}st.ask=null;st.need=false;if(n==='fix'){st.L=[7,5];st.R=[10,0];draw();A.seq([[800,()=>set(1)],[600,()=>set(1)]]);}if(n==='sub'){st.L=[15,0];st.R=[19,0];draw();A.seq([0,1,2,3].map(()=>[500,()=>set(-1)]));}},
    task(r){st.setup=true;st.ask=null;st.need=false;let txt;
      if(r===0){st.L=[rnd(6,9),rnd(5,9)];st.R=[10,0];st.need=true;txt='Make *'+st.L.join(' + ')+' = 10 + □*. Change the right side.';}
      else if(r===1){st.L=[30,20];st.R=[40,0];st.need=true;txt='Make *30 + 20 = 40 + □*.';}
      else if(r===2){st.L=[15,0];st.R=[19,0];st.need=true;txt='Make *15 = 19 − □*. Take some away on the right!';}
      else if(r===3){st.L=[35,15];st.R=[25,25];st.ask={ans:'Yes',o:['Yes','No'],ok:'Yes! Both are 50.'};txt='Is *35 + 15* equivalent to *25 + 25*?';}
      else{st.L=[60,0];st.R=[50,10];st.ask={ans:'50 + 10',o:shuffle(['50 + 10','50 + 1','6 + 0']),ok:'Yes! 50 + 10 = 60.'};txt='Which is *equal to 60*?';}
      draw();st.setup=false;return txt;}};}
});

/* =========================================================
   16. Coding: sequential and concurrent
   ========================================================= */
P.lesson({id:'coding2',title:'Two robots at once',strand:'Algebra',codes:['C3.1','C3.2'],
 guide:{goal:'Solve problems by writing and executing code involving sequential and concurrent events, and read and alter existing code, describing how changes affect the outcomes.',words:'code, sequence, step, concurrent, at the same time, bug, run',
  ask:['What does “at the same time” mean in code?','Why do the steps need to be in order?','How can you stop the robots from bumping?'],home:'Clap and stomp at the same time with a partner. Then take turns. Which is concurrent?'},
 learn:[{say:'Two robots, one Run button.',speech:'Luna’s blue robot and orange robot each have code. When we press Run, they move at the same time! That is called concurrent. Each robot does its own steps in order.',view:'model',demo:'run'},
        {say:'Read about sequence and concurrent.',speech:'Sequential means one step after another. Concurrent means two things happen at the same time. Both robots move together, one step at a time.',view:'read'},
        {say:'Watch: fix a bump.',speech:'Uh oh! The robots bump into each other in the middle. Change the orange robot’s code so it goes around. Now both reach their stars!',view:'model',demo:'fix'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: code the orange robot!',speech:'Your turn! Write code for the orange robot, then press Run.',view:'model'}],
 fig:'Two robots on a grid moving at the same time.',rz:.35,
 explore:['Add arrows to the *orange* robot’s code.','Press *Run*: both robots move together.','*Undo* removes a step.'],
 howTo:'Write the orange robot’s code so both reach their stars without bumping.',
 init:k=>({A:['→','→','→','↑'],B:['←','←','←','↑'],need:false,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'*Sequential:* one step after another. *Concurrent:* two things at the *same time*.')+16;
  const s=60;for(let r=0;r<4;r++)for(let c=0;c<5;c++){g.fillStyle=(r+c)%2?'#e0e7ff':'#eef2ff';g.fillRect(X0+c*s,y+r*s,s,s);}g.fillStyle='#2f7de1';g.beginPath();g.arc(X0+.5*s,y+3.5*s,18,0,Math.PI*2);g.fill();g.fillStyle='#ff6b35';g.beginPath();g.arc(X0+4.5*s,y+3.5*s,18,0,Math.PI*2);g.fill();
  rr(g,X0+340,y,220,200,14);g.fillStyle='#1e293b';g.fill();T(g,'blue: → → ↑',X0+356,y+50,ZS(30),'#93c5fd');T(g,'orange: ← ← ↑',X0+356,y+110,ZS(30),'#a5d8ff');T(g,'Run: together!',X0+356,y+170,FT.bodyB,'#86efac');y+=270;
  y=para(p,y,'If two robots try to go to the same square at the same time, they *bump*. Change the code to fix it!')+10;
  y=keyWords(p,y,[['concurrent','at the same time'],['sequence','steps in order']]);
  predict(p,y,S,'p16','Blue goes right, right. Orange goes left, left. They start 4 squares apart. Do they bump?','*Yes!* They meet in the middle.');},
 readout(p,S,y){const g=p.g,st=S.st;rr(g,X0,y+6,TW,104,14);g.fillStyle='#1e293b';g.fill();T(g,'blue: '+st.A.join(' '),X0+18,y+44,ZS(32),'#93c5fd');T(g,'orange: '+(st.B.join(' ')||'(empty)'),X0+18,y+88,ZS(32),'#a5d8ff');return y+120;},
 build(S,grp,mode,game){const st=S.st,c=.5,N=6,R=4,ox=-1.25,oz=-.9;const X=i=>ox+i*c,Z=j=>oz-j*c;
  for(let i=0;i<N;i++)for(let j=0;j<R;j++){const t=mk(G('g2gt',()=>new THREE.BoxGeometry(c*.96,.05,c*.96)),lam((i+j)%2?'#e0e7ff':'#eef2ff'),20);t.position.set(X(i),.025,Z(j));grp.add(t);}
  const g2=new THREE.Group();grp.add(g2);const SA=[0,0],SB=[5,0],GA=[3,1],GB=[2,1];
  function robot(col){const g=new THREE.Group();const b=mk(new THREE.BoxGeometry(.26,.24,.26),lam(col),0);b.position.y=.16;g.add(b);const h=mk(new THREE.BoxGeometry(.2,.14,.2),lam(tint(col,.4)),0);h.position.y=.35;g.add(h);[-1,1].forEach(s=>{const e=mk(G('g2re',()=>new THREE.SphereGeometry(.025,8,6)),lam(INK),0);e.position.set(s*.05,.37,.1);g.add(e);});return g;}
  const ra=robot('#2f7de1'),rb=robot('#ff6b35');grp.add(ra,rb);let running=false;
  function stars(){clearGroup(g2);[[GA,'#2f7de1'],[GB,'#ff6b35']].forEach(([p0,c2])=>{const s=mk(new THREE.ExtrudeGeometry(starShape(),{depth:.05,bevelEnabled:false}),lam(c2),0);s.rotation.x=-Math.PI/2;s.position.set(X(p0[0]),.06,Z(p0[1]));g2.add(s);});A.redraw();}
  function starShape(){const s=new THREE.Shape();for(let i=0;i<10;i++){const r=i%2?.07:.16,a=Math.PI/2+i*Math.PI/5;i?s.lineTo(Math.cos(a)*r,Math.sin(a)*r):s.moveTo(Math.cos(a)*r,Math.sin(a)*r);}return s;}
  function reset(){ra.position.set(X(SA[0]),.05,Z(SA[1]));rb.position.set(X(SB[0]),.05,Z(SB[1]));}
  const MV={'→':[1,0],'←':[-1,0],'↑':[0,1],'↓':[0,-1]};
  function run(){if(running)return;running=true;reset();let pa=SA.slice(),pb=SB.slice();const n=Math.max(st.A.length,st.B.length);let pr=Promise.resolve(),fail=null;
    for(let k=0;k<n;k++){pr=pr.then(()=>{if(fail)return;const na=st.A[k]?[pa[0]+MV[st.A[k]][0],pa[1]+MV[st.A[k]][1]]:pa,nb=st.B[k]?[pb[0]+MV[st.B[k]][0],pb[1]+MV[st.B[k]][1]]:pb;
        if(nb[0]<0||nb[0]>=N||nb[1]<0||nb[1]>=R){fail='The orange robot fell off the grid!';return;}if(na[0]===nb[0]&&na[1]===nb[1]){fail='Bump! Both robots tried to go to the same square.';}
        pa=na;pb=nb;A.pop();return Promise.all([hop(ra,V(X(na[0]),.05,Z(na[1])),.2,.35),hop(rb,V(X(nb[0]),.05,Z(nb[1])),.2,.35)]);});}
    pr.then(()=>{running=false;if(fail){A.bad(fail);return;}const ok=pa[0]===GA[0]&&pa[1]===GA[1]&&pb[0]===GB[0]&&pb[1]===GB[1];if(ok){A.say('Both robots reached their stars!');if(mode==='play'&&!st.setup&&st.need)game.solved('Your code works! Both robots made it.');}else A.bad('Not at the stars yet. Check the orange code.');});}
  reset();stars();
  return {info:()=>st.B.join(''),
    controls:()=>{const c=['↑','↓','←','→'].map(a=>({t:'orange '+a,fn:()=>{if(st.B.length>=8)return;st.B.push(a);A.pop();reset();A.redraw();}})).concat([{t:'Undo',fn:()=>{st.B.pop();A.redraw();}},{t:'Clear',fn:()=>{st.B=[];reset();A.redraw();}},{t:'Run',go:true,fn:run}]);if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok);return c;},
    demo(n){if(n==='show'){st.A=['→','→','→','↑'];st.B=['↑','←','←','←'];reset();A.redraw();return;}if(n==='runok'){st.A=['→','→','→','↑'];st.B=['↑','←','←','←'];run();return;}st.ask=null;st.need=false;st.A=['→','→','→','↑'];if(n==='run'){st.B=['↑','←','←','←'];reset();A.seq([[700,run]]);}if(n==='fix'){st.B=['←','←','←','↑'];reset();A.seq([[400,run],[2400,()=>{st.B=['↑','←','←','←'];reset();A.redraw();}],[600,run]]);}},
    task(r){st.setup=true;st.ask=null;st.need=true;st.A=['→','→','→','↑'];let txt;
      if(r===0){st.B=[];txt='Write code for the *orange* robot to reach the *orange star*. The blue code is done. Then *Run*!';}
      else if(r===1){st.B=['←','←','←','↑'];txt='This orange code makes the robots *bump*. Fix it so both reach their stars!';}
      else if(r===2){st.B=['↑','←','←'];txt='The orange code is *one step short*. Fix it, then Run.';}
      else if(r===3){st.need=false;st.B=['↑','←','←','←'];st.ask={ans:'At the same time',o:['At the same time','One after the other'],ok:'Yes! That is concurrent.'};txt='When you press Run, do the robots move *at the same time* or *one after the other*?';}
      else{st.need=false;st.B=['↑','←','←','←'];st.ask={ans:'It would end 1 square too far left',o:shuffle(['It would end 1 square too far left','Nothing would change','It would go up']),ok:'Yes! One more step changes where it ends.'};txt='What happens if we add one more *←* to the orange code?';}
      reset();st.setup=false;return txt;}};}
});

/* =========================================================
   17. Venn and Carroll diagrams
   ========================================================= */
const ITEMS=[];['#ef4444','#2f7de1'].forEach((c,ci)=>[3,4,0].forEach((s,si)=>[true,false].forEach(big=>ITEMS.push({c,ci,s,si,big}))));
const NAME=o=>(o.big?'big ':'small ')+(o.ci?'blue ':'red ')+['triangle','square','circle'][o.si];
P.lesson({id:'sort2',title:'Venn and Carroll diagrams',strand:'Data',codes:['D1.1'],
 guide:{goal:'Sort sets of data about people or things according to two attributes, using tables and logic diagrams, including Venn and Carroll diagrams.',words:'sort, attribute, Venn diagram, Carroll diagram, overlap, both, neither, table',
  ask:['What goes in the middle of a Venn diagram?','Where does a blue square go if the circles are “red” and “square”?','How is a Carroll diagram like a table?'],home:'Sort your family’s shoes in a Venn diagram: “has laces” and “is black”. Who goes in the middle?'},
 learn:[{say:'Two circles, one overlap.',speech:'Theo makes one circle for red shapes. The other is for squares. A red square is both, so it goes in the middle where the circles overlap. A blue triangle is neither, so it goes outside!',view:'model',demo:'venn'},
        {say:'Read about Carroll diagrams.',speech:'A Carroll diagram is a table. The rows say red or not red. The columns say square or not square. Each shape goes in exactly one box.',view:'read'},
        {say:'Watch: the Carroll diagram.',speech:'Now the same shapes move into a Carroll diagram. Red squares, red not-squares, not-red squares, and not-red not-squares.',view:'model',demo:'carroll'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: sort the shapes!',speech:'Your turn! Switch between Venn and Carroll and tap the shapes.',view:'model'}],
 fig:'Shapes sorted in a Venn diagram and a Carroll diagram.',rz:.35,
 explore:['Switch *Venn* or *Carroll*.','Press *Sort*.','*Tap a shape* to hear where it goes.'],
 howTo:'Tap the right shape or region, or choose the answer.',
 init:k=>({view:'venn',sorted:true,want:null,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'Sort by *two attributes*: here, *red* and *square*.')+16;
  g.globalAlpha=.25;g.beginPath();g.arc(X0+150,y+110,100,0,Math.PI*2);g.fillStyle='#ef4444';g.fill();g.beginPath();g.arc(X0+270,y+110,100,0,Math.PI*2);g.fillStyle='#2f7de1';g.fill();g.globalAlpha=1;T(g,'red',X0+90,y+20,FT.bodyB,'#ef4444');T(g,'square',X0+300,y+20,FT.bodyB,'#2563eb');
  g.fillStyle='#ef4444';g.fillRect(X0+192,y+92,36,36);T(g,'both!',X0+210,y+160,FT.smallB,INK,'center');
  const cw=110;['','square','not square'].forEach((h,i)=>T(g,h,X0+480+i*cw,y+30,FT.smallB,acc(),'center'));['red','not red'].forEach((h,j)=>{T(g,h,X0+480,y+90+j*70,FT.smallB,acc(),'center');for(let i=1;i<3;i++){g.strokeStyle='#94a3b8';g.strokeRect(X0+480+i*cw-cw/2,y+50+j*70,cw,70);}});
  T(g,'Venn',X0+180,y+250,FT.bodyB,INK,'center');T(g,'Carroll',X0+620,y+250,FT.bodyB,INK,'center');y+=280;
  y=keyWords(p,y,[['Venn diagram','overlapping circles for sorting'],['Carroll diagram','a table for sorting by yes and no']]);
  predict(p,y,S,'p17','Where does a blue circle go: red, square, both or neither?','*Neither!* Outside both circles.');},
 readout(p,S,y){const g=p.g,st=S.st;const red=ITEMS.filter(o=>!o.ci).length,sq=ITEMS.filter(o=>o.s===4).length,both=ITEMS.filter(o=>!o.ci&&o.s===4).length;T(g,(st.view==='venn'?'Venn':'Carroll')+' diagram',X0,y+38,FT.bodyB,acc());T(g,'red '+red+'  ·  squares '+sq+'  ·  both '+both+'  ·  neither '+(ITEMS.length-red-sq+both),X0,y+80,FT.bodyB);return y+90;},
 build(S,grp,mode,game){const st=S.st;const g2=new THREE.Group(),bg=new THREE.Group();grp.add(bg,g2);
  const reg=o=>(o.ci===0?1:0)+(o.s===4?2:0);
  function draw(){clearGroup(g2);clearGroup(bg);if(st.view==='venn'){[[-.55,'#ef4444','red'],[.55,'#2f7de1','square']].forEach(([x,c,t])=>{const ring=mk(new THREE.TorusGeometry(.95,.035,8,48),lam(c),0);ring.rotation.x=Math.PI/2;ring.position.set(x,.04,-2.0);bg.add(ring);const l=label(t,{size:.2,color:c});l.position.set(x*2.4,.1,-3.0);bg.add(l);});}
    else{const lab=[['red',-1.1,-2.75],['not red',-1.1,-1.65]];['square','not square'].forEach((t,i)=>{const l=label(t,{size:.17,color:acc()});l.position.set(.1+i*1.4,.1,-3.0);bg.add(l);});lab.forEach(([t,x,z])=>{const l=label(t,{size:.17,color:acc()});l.position.set(-1.9,.1,z);bg.add(l);});
      for(let i=0;i<2;i++)for(let j=0;j<2;j++){const b=mk(new THREE.BoxGeometry(1.36,.03,1.06),lam(j?'#f1f5f9':'#fee2e2'),20);b.position.set(.1+i*1.4,.015,-2.75+j*1.1);bg.add(b);}}
    const cnt={};ITEMS.forEach((o,idx)=>{let x,z;if(!st.sorted){x=-2.0+(idx%6)*.8;z=-2.9+Math.floor(idx/6)*.6;}else{const rg=reg(o);const k=cnt[rg]=(cnt[rg]||0)+1;if(st.view==='venn'){const C={1:[-.95,-2.0],2:[.95,-2.0],3:[0,-2.0],0:[1.95,-.95]}[rg];x=C[0]+((k-1)%2-.5)*.3;z=C[1]+(Math.floor((k-1)/2)-.8)*.32;}else{const i=o.s===4?0:1,j=o.ci===0?0:1;x=.1+i*1.4+((k-1)%3-1)*.4;z=-2.75+j*1.1+(Math.floor((k-1)/3)-.5)*.42;}}
      const sh=o.s?poly(o.s,o.big?.15:.1,o.c,.1):mk(G('g2cir'+o.big,()=>new THREE.CylinderGeometry(o.big?.15:.1,o.big?.15:.1,.1,24)),lam(o.c),20);if(o.s===4)sh.rotation.y=Math.PI/4;sh.position.set(x,.07,z);g2.add(sh);A.drag(sh,{tap:()=>tap(o)});});A.redraw();}
  function where(o){const red=o.ci===0,sq=o.s===4;return st.view==='venn'?(red&&sq?'in the overlap':red?'in the red circle only':sq?'in the square circle only':'outside both circles'):((red?'red':'not red')+', '+(sq?'square':'not square'));}
  function tap(o){A.pop();A.say(NAME(o)+': '+where(o));if(mode==='play'&&!st.setup&&st.want){if(st.want(o))game.solved(st.wantOk);else A.bad('Check both attributes!');}}
  draw();
  return {info:()=>st.view,
    controls:()=>{const c=[{t:'Venn',on:st.view==='venn',fn:()=>{st.view='venn';draw();}},{t:'Carroll',on:st.view==='carroll',fn:()=>{st.view='carroll';draw();}},{t:st.sorted?'Mix':'Sort',go:true,fn:()=>{st.sorted=!st.sorted;A.pop();draw();}}];if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c.slice(0,2));return c;},
    demo(n){if(n==='venn'){st.view='venn';st.sorted=true;draw();return;}st.ask=null;st.want=null;st.view=n==='carroll'?'carroll':'venn';st.sorted=false;draw();A.seq([[900,()=>{st.sorted=true;draw();A.pop();}]]);},
    task(r){st.setup=true;st.ask=null;st.want=null;st.sorted=false;st.view='venn';let txt;
      if(r===0){st.want=o=>o.ci===0&&o.s===4;st.wantOk='Yes! A red square goes in the overlap.';txt='Tap a shape that belongs in the *overlap* (red *and* square).';}
      else if(r===1){st.want=o=>o.ci!==0&&o.s!==4;st.wantOk='Yes! It is not red and not a square.';txt='Tap a shape that goes *outside both circles*.';}
      else if(r===2){st.view='carroll';st.sorted=true;st.want=o=>o.ci===0&&o.s!==4;st.wantOk='Yes! Red, but not a square.';txt='Tap a shape in the *red, not square* box.';}
      else if(r===3){st.sorted=true;st.ask={ans:'4',o:shuffle(['4','2','6']),ok:'Yes! 2 big and 2 small red squares.'};txt='How many shapes are in the *overlap*?';}
      else{st.sorted=true;st.ask={ans:'Outside both',o:shuffle(['Outside both','In the overlap','In the red circle']),ok:'Yes! A blue circle is neither red nor a square.'};txt='Where does a *blue circle* go?';}
      draw();st.setup=false;return txt;}};}
});

/* =========================================================
   18. Two-way tally tables
   ========================================================= */
const TT={rows:['Grade 1','Grade 2'],cols:['walk','bus','car']};
P.lesson({id:'tally2',title:'Two-way tally tables',strand:'Data',codes:['D1.2'],
 guide:{goal:'Collect data through observations, experiments and interviews to answer questions about two pieces of information, and organize the data in two-way tally tables.',words:'survey, tally, two-way table, row, column, total',
  ask:['What two things does this table show?','How many Grade 2 students take the bus?','How do tally marks show 5?'],home:'Ask family and friends two questions: “Cat or dog?” and “Kid or grown-up?” Make a two-way tally table.'},
 learn:[{say:'Ask two questions!',speech:'Ayo asked students two things: what grade they are in, and how they get to school. Each student gets one tally mark in the right box. Watch the table fill!',view:'model',demo:'fill'},
        {say:'Read about two-way tables.',speech:'A two-way table has rows and columns. The rows show one piece of information, like grade. The columns show another, like walk, bus or car. Tally marks are grouped in fives.',view:'read'},
        {say:'Watch: read a box.',speech:'Find the row for Grade two and the column for bus. There are six tallies. Six Grade two students take the bus.',view:'model',demo:'read'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: tally!',speech:'Your turn! Tap a box to add a tally, and read the table.',view:'model'}],
 fig:'A 3D two-way table filling with tally sticks.',rz:.35,
 explore:['*Tap a box* to add a tally.','Each group of 5 is tied together.','Read across a row and down a column.'],
 howTo:'Read or fill the table, then answer.',
 init:k=>({t:[[4,2,3],[5,6,2]],need:null,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'A *two-way tally table* shows *two pieces of information* about each person.')+16;
  const cw=TW/4;['','walk','bus','car'].forEach((h,i)=>{rr(g,X0+i*cw+4,y,cw-8,44,10);g.fillStyle=tint(acc(),i?.2:.06);g.fill();T(g,h,X0+i*cw+cw/2,y+30,FT.bodyB,acc(),'center');});
  [['Grade 1',[4,2,3]],['Grade 2',[5,6,2]]].forEach(([r,v],j)=>{T(g,r,X0+cw/2,y+90+j*64,FT.bodyB,INK,'center');v.forEach((n,i)=>{const tl=('|||| '.repeat(Math.floor(n/5))+'|'.repeat(n%5)).trim();T(g,tl,X0+(i+1)*cw+cw/2,y+92+j*64,ZS(32),INK,'center');});});y+=200;
  y=para(p,y,'*6* Grade 2 students take the bus. *9* Grade 1 students were asked in all.')+10;
  y=keyWords(p,y,[['tally','a mark for each answer; |||| with a line across is 5'],['row','goes across']]);
  predict(p,y,S,'p18','How many students walk in all?','*9.* 4 + 5.');},
 readout(p,S,y){const g=p.g,st=S.st;T(g,'Grade 1: '+st.t[0].reduce((a,b)=>a+b,0)+'   Grade 2: '+st.t[1].reduce((a,b)=>a+b,0),X0,y+40,FT.bodyB,acc());T(g,TT.cols.map((c,i)=>c+' '+(st.t[0][i]+st.t[1][i])).join('  ·  '),X0,y+84,FT.bodyB);return y+94;},
 build(S,grp,mode,game){const st=S.st;const g2=new THREE.Group();grp.add(g2);const cw=1.1,ch=.95,x0=-1.1,z0=-2.55;
  ['walk','bus','car'].forEach((t,i)=>{const l=label(t,{size:.2,color:acc()});l.position.set(x0+i*cw,.1,z0-.65);grp.add(l);});TT.rows.forEach((t,j)=>{const l=label(t,{size:.17,color:acc()});l.position.set(x0-1.0,.1,z0+j*ch);grp.add(l);});
  function draw(){clearGroup(g2);for(let j=0;j<2;j++)for(let i=0;i<3;i++){const b=mk(G('g2tb',()=>new THREE.BoxGeometry(cw*.95,.04,ch*.92)),lam(j?'#eef2ff':'#fef3c7'),20);b.position.set(x0+i*cw,.02,z0+j*ch);g2.add(b);A.drag(b,{tap:()=>tap(j,i)});
      const n=st.t[j][i];for(let k=0;k<n;k++){const grpI=Math.floor(k/5),kk=k%5;if(kk===4){const st2=mk(G('g2ts2',()=>new THREE.BoxGeometry(.3,.025,.025)),lam('#c2410c'),0);st2.position.set(x0+i*cw-.33+grpI*.38+.06,.08,z0+j*ch);st2.rotation.y=.5;g2.add(st2);}
        else{const s=mk(G('g2ts',()=>new THREE.BoxGeometry(.025,.025,.34)),lam(INK),0);s.position.set(x0+i*cw-.4+grpI*.38+kk*.06,.06,z0+j*ch);g2.add(s);}}
      const l=label(String(n),{size:.15,bg:'#ffffff'});l.position.set(x0+i*cw+.38,.2,z0+j*ch-.3);g2.add(l);}A.redraw();}
  function tap(j,i){if(st.t[j][i]>=10){A.bad('That box is full!');return;}st.t[j][i]++;A.pop();draw();A.say(TT.rows[j]+', '+TT.cols[i]+': '+st.t[j][i]);if(mode==='play'&&!st.setup&&st.need&&st.need(st))game.solved(st.needOk);}
  draw();
  return {info:()=>JSON.stringify(st.t),
    controls:()=>{const c=[{t:'Clear',fn:()=>{st.t=[[0,0,0],[0,0,0]];draw();}}];if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok);return c;},
    demo(n){if(n==='show'){st.t=[[4,2,3],[5,6,2]];draw();return;}st.ask=null;st.need=null;if(n==='fill'){st.t=[[0,0,0],[0,0,0]];draw();const seq=[[0,0],[1,1],[1,0],[0,2],[1,1],[0,0],[1,1],[0,1],[1,0],[1,2],[0,0],[1,1]];A.seq(seq.map(([j,i])=>[260,()=>tap(j,i)]));}if(n==='read'){st.t=[[4,2,3],[5,6,2]];draw();A.say('Grade 2, bus: 6');}},
    task(r){st.setup=true;st.ask=null;st.need=null;st.t=[[4,2,3],[5,6,2]];let txt;
      if(r===0){st.ask={ans:'6',o:shuffle(['6','2','8']),ok:'Yes! Row Grade 2, column bus: 6.'};txt='How many *Grade 2* students take the *bus*?';}
      else if(r===1){st.ask={ans:'9',o:shuffle(['9','5','4']),ok:'Yes! 4 + 5 = 9.'};txt='How many students *walk* in all?';}
      else if(r===2){st.need=s=>s.t[0][2]>=5;st.needOk='Yes! 5 Grade 1 students come by car. That makes a group of 5!';txt='*2 more Grade 1* students come by *car*. Add their tallies.';}
      else if(r===3){st.ask={ans:'Grade 2',o:['Grade 1','Grade 2'],ok:'Yes! 13 Grade 2 students and 9 Grade 1 students.'};txt='Which grade had *more* students answer?';}
      else{st.ask={ans:'Bus',o:shuffle(['Bus','Walk','Car']),ok:'Yes! Bus has 8 in all; it is the most.'};txt='Which way do the *most* students come? (Add both rows!)';st.t=[[4,2,3],[3,6,2]];}
      draw();st.setup=false;return txt;}};}
});

/* =========================================================
   19. Line plots, bar graphs and the mode
   ========================================================= */
const PETS=[0,1,1,2,1,3,0,1,2,1,4,2,1,0,2];
P.lesson({id:'graph2',title:'Line plots, bar graphs and mode',strand:'Data',codes:['D1.3','D1.4','D1.5'],
 guide:{goal:'Display data in concrete graphs, pictographs, line plots and bar graphs with sources, titles and labels; identify the mode; and analyse data to draw conclusions.',words:'line plot, bar graph, title, label, scale, mode, most common',
  ask:['What is the mode of this data?','How is a line plot different from a bar graph?','What can you conclude from the graph?'],home:'Ask friends how many pets they have. Make a line plot with an X for each answer. Find the mode!'},
 learn:[{say:'An X for each answer.',speech:'Jayden asked fifteen students: how many pets do you have? Each answer gets an X above its number on the line plot. Watch the Xs stack up!',view:'model',demo:'plot'},
        {say:'Read about the mode.',speech:'The mode is the answer that happens most often. The tallest stack shows it. Here, the mode is one pet. A data set can have one mode, more than one, or none.',view:'read'},
        {say:'Watch: a bar graph.',speech:'The same data can be a bar graph. Each bar shows how many students gave each answer. The tallest bar is still one pet: the mode!',view:'model',demo:'bar'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: read the graph!',speech:'Your turn! Switch the graph and tap the mode.',view:'model'}],
 fig:'A line plot and a bar graph of the same data.',rz:.35,
 explore:['Switch *Line plot* and *Bar graph*.','*Tap a stack or bar* to read it.','Find the *mode*: the tallest!'],
 howTo:'Read the graph, then tap or choose the answer.',
 init:k=>({view:'plot',data:PETS.slice(),shown:15,want:null,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'*How many pets do you have?* (Source: our class.) Each X is one student.')+16;
  const cnt=[0,0,0,0,0];PETS.forEach(v=>cnt[v]++);const ox=X0+40,w=110;g.strokeStyle=INK;g.lineWidth=3;g.beginPath();g.moveTo(ox,y+220);g.lineTo(ox+4*w+40,y+220);g.stroke();
  cnt.forEach((c,i)=>{T(g,String(i),ox+20+i*w,y+252,FT.bodyB,INK,'center');for(let k=0;k<c;k++)T(g,'X',ox+20+i*w,y+205-k*30,FT.bodyB,i===1?RED:'#2563eb','center');});T(g,'Line plot',ox+220,y+290,FT.smallB,GREY,'center');
  T(g,'Mode = 1 pet',X0+600,y+120,ZS(40),acc());T(g,'(6 students)',X0+600,y+160,FT.body,GREY);y+=320;
  y=keyWords(p,y,[['mode','the most common answer'],['line plot','a number line with an X for each answer']]);
  predict(p,y,S,'p19','Data: 2, 3, 3, 4, 3, 2. What is the mode?','*3!* It appears 3 times.');},
 readout(p,S,y){const g=p.g,st=S.st;const c=counts(st);const mx=Math.max(...c);const modes=c.map((v,i)=>v===mx?i:-1).filter(v=>v>=0);T(g,'How many pets? ('+st.data.length+' students)',X0,y+38,FT.bodyB);T(g,'Mode: '+modes.join(' and ')+' pet'+(modes.length===1&&modes[0]===1?'':'s'),X0,y+84,ZS(40),acc());return y+94;},
 build(S,grp,mode,game){const st=S.st;const g2=new THREE.Group();grp.add(g2);const t=label('How many pets do you have?',{size:.22,bg:'#ffffff'});t.position.set(0,2.5,-2.9);grp.add(t);
  function draw(){clearGroup(g2);const c=counts(st);const ax=mk(new THREE.BoxGeometry(4.2,.04,.05),lam(INK),0);ax.position.set(0,.03,-1.4);g2.add(ax);
    c.forEach((n,i)=>{const x=-1.6+i*.8;const l=label(String(i),{size:.2,color:INK});l.position.set(x,.1,-1.1);g2.add(l);
      if(st.view==='plot'){for(let k=0;k<n;k++){const xm=new THREE.Group();[1,-1].forEach(s=>{const b=mk(G('g2x',()=>new THREE.BoxGeometry(.3,.06,.06)),lam('#2f7de1'),0);b.rotation.y=s*Math.PI/4;xm.add(b);});xm.position.set(x,.08+k*.02,-1.7-k*.28);g2.add(xm);xm.traverse(o=>{if(o.isMesh)A.drag(o,{tap:()=>tap(i)});});}}
      else{const h=Math.max(.01,n*.3);const b=mk(new THREE.BoxGeometry(.5,h,.4),lam(COL[i]),20);b.position.set(x,h/2,-1.9);g2.add(b);A.drag(b,{tap:()=>tap(i)});const v=label(String(n),{size:.17,bg:'#ffffff'});v.position.set(x,h+.2,-1.9);g2.add(v);}});
    const xl=label('number of pets',{size:.15,color:GREY});xl.position.set(0,.1,-.8);g2.add(xl);A.redraw();}
  function tap(i){A.pop();A.say(counts(st)[i]+' students have '+i+' pet'+(i===1?'':'s'));if(mode==='play'&&!st.setup&&st.want){if(st.want(i))game.solved(st.wantOk);else A.bad('Find the tallest!');}}
  draw();
  return {info:()=>st.view,
    controls:()=>{const c=[{t:'Line plot',on:st.view==='plot',fn:()=>{st.view='plot';draw();}},{t:'Bar graph',on:st.view==='bar',go:true,fn:()=>{st.view='bar';draw();}}];if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);return c;},
    demo(n){if(n==='plotall'){st.view='plot';st.data=PETS.slice();draw();return;}st.ask=null;st.want=null;st.data=PETS.slice();if(n==='plot'){st.view='plot';st.data=[];draw();A.seq(PETS.map(v=>[200,()=>{st.data.push(v);draw();}]));}if(n==='bar'){st.view='bar';draw();}},
    task(r){st.setup=true;st.ask=null;st.want=null;st.data=PETS.slice();st.view='plot';let txt;
      if(r===0){st.want=i=>i===1;st.wantOk='Yes! The mode is 1 pet.';txt='Tap the *mode*: the most common number of pets.';}
      else if(r===1){st.view='bar';st.ask={ans:'4',o:shuffle(['4','2','3']),ok:'Yes! The bar for 2 pets is 4 tall.'};txt='How many students have *2 pets*?';}
      else if(r===2){st.data=[2,3,3,4,3,2,4,4,0];st.view='bar';st.ask={ans:'3 and 4',o:shuffle(['3 and 4','3','2 and 4']),ok:'Yes! 3 and 4 both appear 3 times: two modes!'};txt='What is the *mode* of this data?';}
      else if(r===3){st.ask={ans:'Most students have 1 pet or none',o:shuffle(['Most students have 1 pet or none','Everyone has 4 pets','No one has pets']),ok:'Yes! 9 of 15 students have 0 or 1 pet.'};txt='Which *conclusion* fits the graph?';}
      else{st.ask={ans:'A title',o:shuffle(['A title','More colours','A bigger X']),ok:'Yes! A title tells what the graph shows.'};txt='Every graph needs labels and…';}
      draw();st.setup=false;return txt;}};}
});
function counts(st){const c=[0,0,0,0,0];st.data.forEach(v=>c[v]++);return c;}

/* =========================================================
   20. Chance: complementary events
   ========================================================= */
P.lesson({id:'chance2',title:'Likely or unlikely?',strand:'Data',codes:['D2.1','D2.2'],
 guide:{goal:'Use the words impossible, possible and certain to describe the likelihood of complementary events, make predictions, and test whether the mode of data from another population will be the same.',words:'impossible, possible, certain, likely, unlikely, complementary, predict, mode',
  ask:['If you can pick red or not red, what are the two events?','Is picking red likely or unlikely with 1 red and 9 blue?','Will another class have the same favourite colour?'],home:'Put 3 red and 1 blue sock in a bag. Predict which colour you will pull. Try it 10 times!'},
 learn:[{say:'Red or not red?',speech:'Priya’s bag has eight red marbles and two blue ones. When she picks one, it is either red or not red. Those are complementary events: one of them must happen! Red is likely. Not red is unlikely.',view:'model',demo:'pick'},
        {say:'Read about likelihood.',speech:'Certain means it will happen. Impossible means it cannot. If red is certain, then not red is impossible. Likely and unlikely are in between.',view:'read'},
        {say:'Watch: many picks.',speech:'Let’s pick twenty times, putting the marble back each time. Most picks are red, just as we predicted!',view:'model',demo:'many'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: change the bag!',speech:'Your turn! Change the marbles, predict, and pick.',view:'model'}],
 fig:'A bag of red and blue marbles and the picks so far.',rz:.35,
 explore:['Add or remove *red* and *blue*.','Press *Pick* or *Pick 20*.','Is red certain, likely, unlikely or impossible?'],
 howTo:'Describe the chance, then choose the answer.',
 init:k=>({r:8,b:2,res:[],ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'*Complementary events:* one or the other *must* happen, like *red* or *not red*.')+16;
  const bag=(x,r,b,t)=>{rr(g,x,y,180,150,30);g.fillStyle='#fde68a';g.fill();for(let i=0;i<r+b;i++){g.beginPath();g.arc(x+30+(i%5)*30,y+40+Math.floor(i/5)*34,12,0,Math.PI*2);g.fillStyle=i<r?'#ef4444':'#2f7de1';g.fill();}T(g,t,x+90,y+180,FT.smallB,INK,'center');};
  bag(X0,10,0,'red: certain');bag(X0+215,8,2,'red: likely');bag(X0+430,2,8,'red: unlikely');bag(X0+645,0,10,'red: impossible');y+=210;
  y=para(p,y,'If red is *certain*, not red is *impossible*. If red is *likely*, not red is *unlikely*.')+10;
  y=para(p,y,'*Predict:* our class’s favourite colour is blue. Another class’s mode *might* be different!')+10;
  y=keyWords(p,y,[['likely','will probably happen'],['complementary','two events where one must happen']]);
  predict(p,y,S,'p20','9 red, 1 blue. Is picking blue likely or unlikely?','*Unlikely!*');},
 readout(p,S,y){const g=p.g,st=S.st;const w=st.r===0?'impossible':st.b===0?'certain':st.r>st.b?'likely':st.r<st.b?'unlikely':'equally likely';T(g,'Red is '+w,X0,y+48,ZS(42),acc());const rc=st.res.filter(x=>x).length;T(g,st.res.length?'Picks: '+rc+' red, '+(st.res.length-rc)+' not red':'',X0,y+90,FT.bodyB);return y+98;},
 build(S,grp,mode,game){const st=S.st;const g2=new THREE.Group();grp.add(g2);
  function draw(){clearGroup(g2);const bag=mk(new THREE.CylinderGeometry(.7,.85,1.0,24,1,true),new THREE.MeshLambertMaterial({color:'#fcd34d',transparent:true,opacity:.45,side:THREE.DoubleSide,depthWrite:false}),0);bag.position.set(-1.2,.52,-2.0);g2.add(bag);
    for(let i=0;i<st.r+st.b;i++){const m=mk(G('g2mb',()=>new THREE.SphereGeometry(.1,14,10)),lam(i<st.r?'#ef4444':'#2f7de1'),0);const a=i*2.4,rad=.15+(i%3)*.17;m.position.set(-1.2+Math.cos(a)*rad,.12+Math.floor(i/6)*.18,-2.0+Math.sin(a)*rad);g2.add(m);}
    st.res.slice(-20).forEach((v,i)=>{const m=mk(G('g2mr',()=>new THREE.SphereGeometry(.09,12,8)),lam(v?'#ef4444':'#2f7de1'),0);m.position.set(.4+(i%5)*.3,.1,-2.6+Math.floor(i/5)*.3);g2.add(m);});A.redraw();}
  function pick1(){const n=st.r+st.b;if(!n){A.bad('The bag is empty!');return;}const v=Math.random()<st.r/n;st.res.push(v);A.pop();draw();A.say(v?'red!':'not red!');}
  function many(){st.res=[];draw();A.seq(Array.from({length:20},()=>[150,()=>{const n=st.r+st.b;if(!n)return;st.res.push(Math.random()<st.r/n);draw();}]).concat([[200,()=>{const rc=st.res.filter(x=>x).length;A.say(rc+' red out of 20');}]]));}
  draw();
  return {info:()=>st.r+'/'+st.b,
    controls:()=>{const c=[{t:'red +',fn:()=>{st.r=Math.min(10,st.r+1);st.res=[];draw();}},{t:'red −',fn:()=>{st.r=Math.max(0,st.r-1);st.res=[];draw();}},{t:'blue +',fn:()=>{st.b=Math.min(10,st.b+1);st.res=[];draw();}},{t:'blue −',fn:()=>{st.b=Math.max(0,st.b-1);st.res=[];draw();}},{t:'Pick',fn:pick1},{t:'Pick 20',go:true,fn:many}];if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c.slice(4));return c;},
    demo(n){if(n==='picknow'){pick1();return;}st.ask=null;st.r=8;st.b=2;st.res=[];draw();if(n==='pick')A.seq([[700,pick1]]);if(n==='many')A.seq([[500,many]]);},
    task(r){st.setup=true;st.res=[];let txt;const O=['Certain','Likely','Unlikely','Impossible'];
      if(r===0){st.r=8;st.b=2;st.ask={ans:'Likely',o:O,ok:'Yes! 8 of 10 are red.'};txt='Picking *red* from this bag is…';}
      else if(r===1){st.r=8;st.b=2;st.ask={ans:'Unlikely',o:O,ok:'Yes! Only 2 of 10 are not red.'};txt='Picking *not red* from this bag is…';}
      else if(r===2){st.r=10;st.b=0;st.ask={ans:'Impossible',o:O,ok:'Yes! Red is certain, so not red is impossible.'};txt='All red! Picking *not red* is…';}
      else if(r===3){st.r=0;st.b=6;st.ask={ans:'Certain',o:O,ok:'Yes! Every marble is not red.'};txt='Picking *not red* from this bag is…';}
      else{st.r=5;st.b=5;st.ask={ans:'It might be different',o:['It will be exactly the same','It might be different'],ok:'Yes! Another group can have a different mode.'};txt='Our class’s favourite fruit (the *mode*) is apple. Will another class’s mode be the same?';}
      draw();st.setup=false;return txt;}};}
});
})();
