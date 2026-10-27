/* The Interactive Classroom: Grade 1 Math — Number (lessons 1–10) */
(function(){
"use strict";
const P=window.PM;if(!P||P.failed||!P.THREE)return;
const {THREE,V,W,D,PY,PX,X0,TW,INK,RED,BLUE,GREY,VIBE,FT,ZS,G,M,lam,mk,unitBox,cellMat,label,starGeo,wedgeGeo,clearGroup,disposeObj,rr,T,wrap,para,header,keyWords,predict,box,caption,cxOf,cyOf,tint,moveTo,hop,tween,burst,easeOut,easeIO,A}=P;
const acc=()=>P.ACC;
const rnd=(a,b)=>a+Math.floor(Math.random()*(b-a+1)),pick=a=>a[Math.floor(Math.random()*a.length)],shuffle=a=>a.slice().sort(()=>Math.random()-.5);
const ONES=['zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'];
const TENS=['','','twenty','thirty','forty','fifty'];const words=n=>n<20?ONES[n]:TENS[Math.floor(n/10)]+(n%10?'-'+ONES[n%10]:'');
function choices(game,list,ans,ok,lab){return list.map(o=>({t:lab?lab(o):String(o),big:true,fn:()=>{if(o===ans){if(game)game.solved(ok);else A.good(ok);}else A.bad('Not quite. Try again!');}}));}
const COL=['#ff6b35','#ff8a3d','#ffc04d','#5fd38a','#2f7de1','#8b5cf6'];
function bead(col,r){return mk(G('g1b'+(r||.12),()=>new THREE.SphereGeometry(r||.12,18,14)),lam(col),0);}
function cube(col,s){return mk(G('g1c'+(s||.2),()=>new THREE.BoxGeometry((s||.2)*.92,(s||.2)*.92,(s||.2)*.92)),lam(col),20);}
function frog(){const g=new THREE.Group();const b=mk(new THREE.SphereGeometry(.17,18,14),lam('#5cc46a'),0);b.scale.set(1.1,.8,1);b.position.y=.14;g.add(b);
  [-1,1].forEach(s=>{const e=mk(new THREE.SphereGeometry(.06,12,10),lam('#ffffff'),0);e.position.set(s*.08,.29,.08);g.add(e);const pu=mk(new THREE.SphereGeometry(.028,10,8),lam(INK),0);pu.position.set(s*.08,.3,.13);g.add(pu);});
  const sm=mk(new THREE.TorusGeometry(.06,.012,6,12,Math.PI),lam('#1b5e20'),0);sm.position.set(0,.18,.17);sm.rotation.z=Math.PI;g.add(sm);return g;}
function boardTex(n,cols,hi){const cv=document.createElement('canvas');const cw=96;cv.width=cols*cw;cv.height=Math.ceil(n/cols)*cw;const g=cv.getContext('2d');for(let i=0;i<n;i++){const x=(i%cols)*cw,y=Math.floor(i/cols)*cw;g.fillStyle=hi&&hi(i+1)?'#ffe08a':'#ffffff';g.fillRect(x+2,y+2,cw-4,cw-4);
  g.fillStyle=INK;g.font='700 46px "Zilla Slab", Georgia, serif';g.textAlign='center';g.textBaseline='middle';g.fillText(String(i+1),x+cw/2,y+cw/2+3);}const t=new THREE.CanvasTexture(cv);t.anisotropy=4;return new THREE.MeshLambertMaterial({map:t});}

/* =========================================================
   1. Counting to 50
   ========================================================= */
P.lesson({id:'count50',title:'Counting to 50',strand:'Number',codes:['B1.1','B1.5'],
 guide:{goal:'Read and represent whole numbers up to 50, describe how numbers are used in everyday life, and count to 50 by 1s, 2s, 5s and 10s.',words:'count, number, skip count, by 2s, by 5s, by 10s, chart',
  ask:['Where do you see numbers at home?','What comes after 29?','What pattern do you see when you count by 10s?'],home:'Count the stairs, the spoons, or the steps to the door. Try counting by 2s with socks and by 5s with fingers!'},
 learn:[{say:'Count with the frog!',speech:'Let’s count with Kai! The frog hops on every number: one, two, three, four, five… all the way to fifty. Numbers are everywhere: on clocks, doors and sports shirts!',view:'model',demo:'ones'},
        {say:'Read about skip counting.',speech:'Skip counting is a fast way to count. Count by twos: two, four, six. Count by fives: five, ten, fifteen. Count by tens: ten, twenty, thirty, forty, fifty!',view:'read'},
        {say:'Watch: count by 10s.',speech:'Watch the frog jump by tens. Ten, twenty, thirty, forty, fifty! Each jump goes down one row.',view:'model',demo:'tens'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: count and tap!',speech:'Your turn! Pick a way to count, and tap the numbers.',view:'model'}],
 fig:'A frog hops along a 50 chart.',rz:.35,
 explore:['Press *Count by 1s, 2s, 5s or 10s*.','*Tap a number* to hop the frog there.','Listen to the numbers!'],
 howTo:'Tap the number that comes next.',
 init:k=>({step:0,lit:0,pos:1,want:null,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'We use *numbers* every day: to count, to tell time, and on doors and shirts.')+18;
  const cw=TW/10;for(let i=0;i<50;i++){const x=X0+(i%10)*cw,yy=y+Math.floor(i/10)*cw*.8;rr(g,x+3,yy+3,cw-6,cw*.8-6,8);g.fillStyle=(i+1)%10===0?tint('#2f7de1',.3):(i+1)%5===0?tint('#ffc04d',.5):'#ffffff';g.fill();g.strokeStyle='#d6dae6';g.lineWidth=2;g.stroke();T(g,String(i+1),x+cw/2,yy+cw*.5,FT.bodyB,INK,'center');}y+=cw*.8*5+16;
  [['by 2s','2, 4, 6, 8, 10 …'],['by 5s','5, 10, 15, 20, 25 …'],['by 10s','10, 20, 30, 40, 50']].forEach(([a,b],i)=>{rr(g,X0,y+i*54,170,44,22);g.fillStyle=tint(acc(),.18);g.fill();T(g,a,X0+85,y+i*54+31,FT.bodyB,acc(),'center');T(g,b,X0+196,y+i*54+31,FT.hand||FT.body,INK);});y+=176;
  y=keyWords(p,y,[['count','say numbers in order, one for each thing'],['skip count','count by jumps, like 5, 10, 15']]);
  predict(p,y,S,'p1','Count by 10s: 10, 20, 30, ___','*40!* Then 50.');},
 readout(p,S,y){const g=p.g,st=S.st;T(g,String(st.pos),X0,y+56,ZS(64),acc());T(g,words(st.pos),X0+130,y+50,FT.hand||FT.bodyB,INK);return y+70;},
 build(S,grp,mode,game){const st=S.st,c=.42,x0=-1.89,z0=-2.85;const Xc=n=>x0+((n-1)%10)*c,Zc=n=>z0+Math.floor((n-1)/10)*c;
  const board=new THREE.Group();grp.add(board);const fg=frog();grp.add(fg);let busy=false;
  function drawBoard(){clearGroup(board);const hi=st.step?n=>n%st.step===0&&n<=st.lit:n=>n<=st.lit;const b=mk(new THREE.BoxGeometry(10*c,.06,5*c),[lam('#e2e8f0'),lam('#e2e8f0'),boardTex(50,10,hi),lam('#e2e8f0'),lam('#e2e8f0'),lam('#e2e8f0')],20);b.position.set(x0+4.5*c,.03,z0+2*c);board.add(b);
    for(let n=1;n<=50;n++){const hit=mk(G('g1hit',()=>new THREE.BoxGeometry(c*.9,.02,c*.9)),new THREE.MeshBasicMaterial({transparent:true,opacity:0,depthWrite:false}),0);hit.position.set(Xc(n),.07,Zc(n));board.add(hit);A.drag(hit,{tap:()=>tapN(n)});}A.redraw();}
  function place(){fg.position.set(Xc(st.pos),.06,Zc(st.pos));}
  function go(n){busy=true;return hop(fg,V(Xc(n),.06,Zc(n)),.3,.3).then(()=>{st.pos=n;busy=false;A.say(String(n));});}
  function tapN(n){if(busy)return;A.pop();go(n).then(()=>{if(mode==='play'&&!st.setup&&st.want!=null){if(n===st.want)game.solved('Yes! '+n+'!');else A.bad('Count again! Which number comes next?');}});}
  function count(step){st.step=step;st.lit=0;st.pos=1;place();drawBoard();const s=[];for(let n=step;n<=50;n+=step)s.push([step===1?150:380,()=>{st.lit=n;drawBoard();fg.position.set(Xc(n),.06,Zc(n));st.pos=n;A.pop();if(step>1)A.say(String(n));}]);A.seq(s);}
  place();drawBoard();
  return {info:()=>String(st.pos),
    controls:()=>{const c=[{t:'Count by 1s',fn:()=>count(1)},{t:'by 2s',fn:()=>count(2)},{t:'by 5s',fn:()=>count(5)},{t:'by 10s',go:true,fn:()=>count(10)}];if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);return c;},
    demo(n){st.ask=null;st.want=null;if(n==='ones')count(1);if(n==='tens')count(10);},
    task(r){st.setup=true;st.ask=null;st.want=null;st.step=0;st.lit=0;let txt;
      if(r===0){const s=5,k=rnd(2,6);st.step=5;st.lit=k*5;st.pos=k*5;st.want=k*5+5;txt='Count by 5s: '+[1,2,3].map(i=>(k-3+i)*5).filter(v=>v>0).join(', ')+', ___. *Tap the next number!*';}
      else if(r===1){const k=rnd(3,15);st.step=2;st.lit=k*2;st.pos=k*2;st.want=k*2+2;txt='Count by 2s: '+(k*2-4)+', '+(k*2-2)+', '+k*2+', ___. *Tap the next number!*';}
      else if(r===2){const k=rnd(1,3);st.step=10;st.lit=k*10;st.pos=k*10;st.want=k*10+10;txt='Count by 10s: '+Array.from({length:k},(_,i)=>(i+1)*10).join(', ')+', ___. *Tap the next number!*';}
      else if(r===3){const n=pick([19,29,39]);st.pos=n;st.lit=n;st.want=n+1;txt='What comes *after '+n+'*? Tap it!';}
      else{const n=rnd(31,49);st.pos=1;st.want=n;txt='Find *'+n+'* on the chart. Tap it!';}
      place();drawBoard();st.setup=false;return txt;}};}
});

/* =========================================================
   2. Tens and ones to 50
   ========================================================= */
P.lesson({id:'tens50',title:'Tens and ones',strand:'Number',codes:['B1.2'],
 guide:{goal:'Compose and decompose whole numbers up to 50, using a variety of tools and strategies.',words:'ten, one, rod, group, make, break apart',
  ask:['How many ones make a ten?','How can you make 34 with tens and ones?','Can you make 34 another way?'],home:'Group spoons or crayons in bundles of 10. How many tens? How many ones left?'},
 learn:[{say:'Ten ones make one ten.',speech:'Zara snaps ten little cubes together to make one rod. That is one ten! Watch: three tens and four ones make thirty-four.',view:'model',demo:'make'},
        {say:'Read about tens and ones.',speech:'A number like thirty-four has three tens and four ones. You can count the tens: ten, twenty, thirty. Then count on the ones: thirty-one, thirty-two, thirty-three, thirty-four.',view:'read'},
        {say:'Watch: break a ten.',speech:'You can break a ten into ten ones. Now there are two tens and fourteen ones. It is still thirty-four!',view:'model',demo:'break'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: build a number!',speech:'Your turn! Add tens and ones to build the number.',view:'model'}],
 fig:'Ten rods and single cubes on a mat.',rz:.35,
 explore:['Add a *ten* or a *one*.','Press *Break a ten* to make 10 ones.','Read the number!'],
 howTo:'Build the number with tens and ones.',
 init:k=>({t:3,o:4,need:null,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'*10 ones* make *1 ten*.')+16;
  const s=22;for(let k=0;k<3;k++)for(let i=0;i<10;i++){g.fillStyle='#2f7de1';g.fillRect(X0+30+k*40,y+i*s,s+6,s-2);}for(let i=0;i<4;i++){g.fillStyle='#ffc04d';g.fillRect(X0+170+(i%2)*32,y+150+Math.floor(i/2)*32,s+6,s+6);}
  T(g,'3 tens',X0+70,y+250,FT.bodyB,'#2f7de1','center');T(g,'4 ones',X0+200,y+250,FT.bodyB,'#d97706','center');T(g,'= 34',X0+320,y+140,ZS(70),acc());y+=280;
  rr(g,X0,y,TW,110,18);g.fillStyle=tint(acc(),.12);g.fill();T(g,'Another way:',X0+20,y+40,FT.bodyB,acc());T(g,'2 tens and 14 ones = 34',X0+20,y+84,FT.hand||FT.body,INK);y+=134;
  y=keyWords(p,y,[['ten','a group of 10 ones'],['ones','single cubes']]);
  predict(p,y,S,'p2','What number is 4 tens and 2 ones?','*42!*');},
 readout(p,S,y){const g=p.g,st=S.st;T(g,String(st.t*10+st.o),X0,y+58,ZS(64),acc());T(g,st.t+' ten'+(st.t===1?'':'s')+' and '+st.o+' one'+(st.o===1?'':'s'),X0+140,y+50,FT.bodyB);return y+72;},
 build(S,grp,mode,game){const st=S.st,s=.17;const g2=new THREE.Group();grp.add(g2);const mat=mk(new THREE.BoxGeometry(4.4,.03,2.4),lam('#fff7e0'),20);mat.position.set(0,.015,-1.9);grp.add(mat);
  const tl=label('tens',{size:.18,color:'#2f7de1'});tl.position.set(-1.1,.1,-.6);grp.add(tl);const ol=label('ones',{size:.18,color:'#d97706'});ol.position.set(1.3,.1,-.6);grp.add(ol);
  const big=label('',{size:.4,bg:'#ffffff'});big.position.set(0,1.4,-2.6);grp.add(big);
  function draw(){clearGroup(g2);for(let k=0;k<st.t;k++){const rod=new THREE.Group();for(let i=0;i<10;i++){const c=cube('#2f7de1',s);c.position.set(0,0,-i*s);rod.add(c);}rod.position.set(-2.0+k*.3,s/2+.03,-1.05);g2.add(rod);}
    for(let i=0;i<st.o;i++){const c=cube('#ffc04d',s);c.position.set(.4+(i%5)*.3,s/2+.03,-1.2-Math.floor(i/5)*.3);g2.add(c);}big.userData.set(String(st.t*10+st.o));check();A.redraw();}
  function check(){if(mode==='play'&&!st.setup&&st.need&&st.need(st))game.solved(st.needOk(st));}
  const add=(k,d)=>{if(k==='t'){if(st.t+d<0||st.t+d>5||(st.t+d)*10+st.o>50&&d>0){A.bad('Let’s stay at 50 or less.');return;}st.t+=d;}else{if(st.o+d<0||st.o+d>19||st.t*10+st.o+d>50&&d>0){A.bad(st.o+d>19?'Too many ones! Try a ten.':'Let’s stay at 50 or less.');return;}st.o+=d;}A.pop();draw();A.say(String(st.t*10+st.o));};
  function brk(){if(!st.t){A.bad('There is no ten to break.');return;}if(st.o>9){A.bad('That is a lot of ones already!');return;}st.t--;st.o+=10;A.pop();draw();A.say(st.t+' tens and '+st.o+' ones');}
  function snap(){if(st.o<10){A.bad('You need 10 ones to make a ten.');return;}st.o-=10;st.t++;A.pop();draw();}
  draw();
  return {info:()=>st.t+'t'+st.o+'o',
    controls:()=>{const c=[{t:'+ ten',go:true,fn:()=>add('t',1)},{t:'− ten',fn:()=>add('t',-1)},{t:'+ one',fn:()=>add('o',1)},{t:'− one',fn:()=>add('o',-1)},{t:'Break a ten',fn:brk},{t:'Make a ten',fn:snap}];if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);return c;},
    demo(n){st.ask=null;st.need=null;if(n==='make'){st.t=0;st.o=0;draw();const s=[];for(let i=0;i<3;i++)s.push([500,()=>add('t',1)]);for(let i=0;i<4;i++)s.push([350,()=>add('o',1)]);A.seq(s);}if(n==='break'){st.t=3;st.o=4;draw();A.seq([[900,brk]]);}},
    task(r){st.setup=true;st.ask=null;st.need=null;st.t=0;st.o=0;let txt;
      if(r<3){const n=r===0?rnd(21,29):r===1?rnd(31,39):rnd(41,48);st.need=s=>s.t*10+s.o===n;st.needOk=s=>'Yes! '+s.t+' tens and '+s.o+' ones make '+n+'!';txt='Build *'+n+'* with tens and ones.';}
      else if(r===3){const n=rnd(23,38);st.t=Math.floor(n/10);st.o=n%10;st.need=s=>s.t*10+s.o===n&&s.o>=10;st.needOk=s=>'Yes! '+s.t+' tens and '+s.o+' ones is also '+n+'!';txt='This is *'+n+'*. Show '+n+' *another way*. (Try Break a ten!)';}
      else{st.t=4;st.o=6;st.ask={ans:'46',o:shuffle(['46','64','10']),ok:'Yes! 4 tens and 6 ones is 46.'};txt='What number is *4 tens and 6 ones*?';}
      draw();st.setup=false;return txt;}};}
});

/* =========================================================
   3. Comparing and ordering to 50
   ========================================================= */
function tower(n,x,z,grp,col){const s=.12;const g=new THREE.Group();const t=Math.floor(n/10),o=n%10;for(let k=0;k<t;k++)for(let i=0;i<10;i++){const c=cube(col,s);c.position.set(k*.15,s/2+i*s,0);g.add(c);}for(let i=0;i<o;i++){const c=cube(tint(col,.45),s);c.position.set(t*.15+.04,s/2+i*s,0);g.add(c);}g.position.set(x-(t*.15)/2,.03,z);grp.add(g);return g;}
P.lesson({id:'compare50',title:'More, fewer and the same',strand:'Number',codes:['B1.3'],
 guide:{goal:'Compare and order whole numbers up to 50, in various contexts.',words:'more, fewer, greater, less, same, equal, order, first, last',
  ask:['Which is more, 32 or 23? How do you know?','How can tens help you compare?','Put 15, 41 and 28 in order.'],home:'Compare two piles of buttons or blocks. Which has more? Count to check!'},
 learn:[{say:'Which tower is taller?',speech:'Leo has thirty-two cubes. Amara has twenty-three cubes. Look at the tens first. Three tens is more than two tens. So thirty-two is more than twenty-three. Leo has more!',view:'model',demo:'cmp'},
        {say:'Read about comparing.',speech:'To compare two numbers, look at the tens first. If the tens are the same, look at the ones. The bigger number is greater. The smaller number is less.',view:'read'},
        {say:'Watch: put them in order.',speech:'Let’s put three towers in order, from least to greatest: fifteen, twenty-eight, forty-one. They line up like stairs!',view:'model',demo:'order'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: compare!',speech:'Your turn! Tap the tower that the question asks for.',view:'model'}],
 fig:'Towers of cubes to compare.',rz:.35,
 explore:['*Tap a tower* to choose it.','Look at the *tens* first.','Change the numbers with the buttons.'],
 howTo:'Tap the right tower, or choose the answer.',
 init:k=>({nums:[32,23],want:null,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'To *compare*, look at the *tens* first. Then look at the *ones*.')+16;
  [[32,'#2f7de1'],[23,'#ff6b35']].forEach(([n,c],j)=>{const t=Math.floor(n/10),o=n%10;for(let k=0;k<t;k++){g.fillStyle=c;g.fillRect(X0+30+j*300+k*30,y+20,24,200);}for(let i=0;i<o;i++){g.fillStyle=tint(c,.45);g.fillRect(X0+30+j*300+t*30+6,y+200-i*20,22,18);}T(g,String(n),X0+80+j*300,y+260,ZS(48),c,'center');});
  T(g,'32 is more than 23',X0+640,y+120,FT.hand||FT.bodyB,INK,'center');T(g,'32 > 23',X0+640,y+180,ZS(50),acc(),'center');y+=290;
  rr(g,X0,y,TW,100,18);g.fillStyle=tint(acc(),.12);g.fill();T(g,'In order, least to greatest:',X0+20,y+38,FT.bodyB,acc());T(g,'15,  28,  41',X0+20,y+80,ZS(36),INK);y+=124;
  y=keyWords(p,y,[['greater','more'],['less','fewer']]);
  predict(p,y,S,'p3','Which is greater: 18 or 21?','*21!* 2 tens beat 1 ten.');},
 readout(p,S,y){const g=p.g,st=S.st;const [a,b]=st.nums;T(g,st.nums.length===2?(a>b?a+' > '+b+'  ('+a+' is more)':a<b?a+' < '+b+'  ('+b+' is more)':a+' = '+b):st.nums.slice().sort((x,y)=>x-y).join(', '),X0,y+54,ZS(46),acc());return y+70;},
 build(S,grp,mode,game){const st=S.st;const g2=new THREE.Group();grp.add(g2);const cols=['#2f7de1','#ff6b35','#5fd38a'];
  function draw(){clearGroup(g2);const n=st.nums.length;st.nums.forEach((v,i)=>{const x=n===2?(i?1.0:-1.0):-1.5+i*1.5;const tw=tower(v,x,-2.0,g2,cols[i]);const pad=mk(new THREE.BoxGeometry(1.1,.04,.6),lam(tint(cols[i],.2)),20);pad.position.set(x,.02,-2.0);g2.add(pad);A.drag(pad,{tap:()=>tap(i)});tw.children.forEach(c=>A.drag(c,{tap:()=>tap(i)}));
      const l=label(String(v),{size:.34,bg:'#ffffff',border:cols[i]});l.position.set(x,Math.min(10,v)*.12+.4,-2.0);g2.add(l);});A.redraw();}
  function tap(i){A.pop();A.say(String(st.nums[i]));if(mode==='play'&&!st.setup&&st.want){if(st.want(i))game.solved(st.wantOk);else A.bad('Look at the tens first!');}}
  draw();
  return {info:()=>st.nums.join(','),
    controls:()=>{const c=st.nums.length===2?[{t:'1st + 1',fn:()=>{st.nums[0]=Math.min(50,st.nums[0]+1);draw();}},{t:'1st − 1',fn:()=>{st.nums[0]=Math.max(1,st.nums[0]-1);draw();}},{t:'2nd + 1',fn:()=>{st.nums[1]=Math.min(50,st.nums[1]+1);draw();}},{t:'2nd − 1',fn:()=>{st.nums[1]=Math.max(1,st.nums[1]-1);draw();}}]:[];
      if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);return c;},
    demo(n){st.ask=null;st.want=null;if(n==='cmp'){st.nums=[32,23];draw();}if(n==='order'){st.nums=[41,15,28];draw();A.seq([[1400,()=>{st.nums=[15,28,41];draw();A.say('15, 28, 41');}]]);}},
    task(r){st.setup=true;st.ask=null;st.want=null;let txt;
      if(r===0){const a=rnd(30,45),b=rnd(12,28);st.nums=shuffle([a,b]);const big=Math.max(...st.nums);st.want=i=>st.nums[i]===big;st.wantOk='Yes! '+big+' is more!';txt='Tap the tower with *more* cubes.';}
      else if(r===1){const a=rnd(21,29),b=a+10*pick([1,2]);st.nums=shuffle([a,b]);const sm=Math.min(...st.nums);st.want=i=>st.nums[i]===sm;st.wantOk='Yes! '+sm+' is less!';txt='Tap the tower with *fewer* cubes.';}
      else if(r===2){const t=rnd(2,4)*10;const a=t+rnd(1,4),b=t+rnd(5,9);st.nums=shuffle([a,b]);const big=Math.max(a,b);st.want=i=>st.nums[i]===big;st.wantOk='Yes! Same tens, so look at the ones: '+big+' is greater.';txt='Same tens! Tap the *greater* number.';}
      else if(r===3){st.nums=[41,15,28];st.ask={ans:'15, 28, 41',o:shuffle(['15, 28, 41','41, 28, 15','28, 15, 41']),ok:'Yes! From least to greatest.'};txt='Put the numbers in order from *least to greatest*.';}
      else{st.nums=[27,27];st.ask={ans:'They are the same',o:shuffle(['They are the same','27 is more','Neither has cubes']),ok:'Yes! 27 = 27.'};txt='Compare the two towers.';}
      draw();st.setup=false;return txt;}};}
});

/* =========================================================
   4. Estimating and counting
   ========================================================= */
P.lesson({id:'estimate50',title:'Estimate, then count',strand:'Number',codes:['B1.4'],
 guide:{goal:'Estimate the number of objects in collections of up to 50, and verify estimates by counting.',words:'estimate, about, guess, count, group, check',
  ask:['What is a good estimate?','Why is it faster to count in groups of 10?','Was your estimate close?'],home:'Fill a cup with pasta or buttons. Estimate how many, then count in groups of 10 to check.'},
 learn:[{say:'Estimate first!',speech:'How many marbles are in Amara’s jar? An estimate is a smart guess. It looks like about thirty. Now let’s count to check! We put them in groups of ten: ten, twenty, thirty, and two more. Thirty-two! Amara’s estimate was close.',view:'model',demo:'count'},
        {say:'Read about estimating.',speech:'To estimate, look at the group and think: is it closer to ten, twenty, thirty, forty or fifty? Then count to check. Counting in groups of ten makes it easy.',view:'read'},
        {say:'Watch: a small group.',speech:'This jar has fewer marbles. It looks like about ten. Let’s count: nine! Very close!',view:'model',demo:'small'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: estimate!',speech:'Your turn! Make an estimate, then press Count to check.',view:'model'}],
 fig:'A jar of marbles, then rows of ten.',rz:.35,
 explore:['Look at the jar and *estimate*.','Press *Count* to put the marbles in rows of 10.','Press *New jar* to try again.'],
 howTo:'Choose a good estimate, then count to check.',
 init:k=>({n:32,counted:false,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'An *estimate* is a smart guess about *how many*. Then we *count* to check.')+16;
  for(let i=0;i<32;i++){g.beginPath();g.arc(X0+60+(i*37%180),y+40+(i*53%160),13,0,Math.PI*2);g.fillStyle=COL[i%6];g.fill();}T(g,'About 30?',X0+300,y+110,FT.hand||FT.bodyB,INK);y+=220;
  for(let r=0;r<3;r++)for(let i=0;i<10;i++){g.beginPath();g.arc(X0+30+i*34,y+20+r*36,13,0,Math.PI*2);g.fillStyle=COL[r];g.fill();}for(let i=0;i<2;i++){g.beginPath();g.arc(X0+30+i*34,y+128,13,0,Math.PI*2);g.fillStyle=COL[3];g.fill();}
  T(g,'10, 20, 30, 31, 32!',X0+400,y+70,FT.bodyB,acc());y+=170;
  y=keyWords(p,y,[['estimate','a smart guess'],['check','count to see if you were close']]);
  predict(p,y,S,'p4','Is 31 a good estimate for 32 marbles?','*Yes!* It is very close.');},
 readout(p,S,y){const g=p.g,st=S.st;T(g,st.counted?'There are '+st.n+'!':'How many? Estimate!',X0,y+50,ZS(44),acc());return y+66;},
 build(S,grp,mode,game){const st=S.st;const g2=new THREE.Group();grp.add(g2);
  const jar=mk(new THREE.CylinderGeometry(.75,.7,1.6,32,1,true),new THREE.MeshLambertMaterial({color:'#e0f2fe',transparent:true,opacity:.28,side:THREE.DoubleSide,depthWrite:false}),0);jar.position.set(-1.3,.82,-2.1);grp.add(jar);
  const R=()=>{let s=st.n*97+13;return ()=>{s=(s*16807)%2147483647;return s/2147483647;};};let ms=[];
  function draw(){clearGroup(g2);ms=[];const rr2=R();for(let i=0;i<st.n;i++){const m=bead(COL[i%6],.1);let x,z,yv;if(st.counted){x=-.15+(i%10)*.22;z=-2.6+Math.floor(i/10)*.3;yv=.1;}else{const a=rr2()*Math.PI*2,rad=Math.sqrt(rr2())*.58;x=-1.3+Math.cos(a)*rad;z=-2.1+Math.sin(a)*rad;yv=.12+Math.floor(i/14)*.17+rr2()*.08;}m.position.set(x,yv,z);g2.add(m);ms.push(m);}
    if(st.counted)for(let r=0;r<Math.ceil(st.n/10);r++){const c=Math.min(10,st.n-r*10);const l=label(String(r*10+c),{size:.17,color:INK});l.position.set(2.15,.15,-2.6+r*.3);g2.add(l);}A.redraw();}
  function count(){if(st.counted)return;st.counted=true;const rr2=R();const from=ms.map(m=>m.position.clone());st.counted=true;
    ms.forEach((m,i)=>{const to=V(-.15+(i%10)*.22,.1,-2.6+Math.floor(i/10)*.3);A.later(()=>{hop(m,to,.4,.35);if(i%10===9||i===st.n-1)A.say(String(i+1));},i*60);});A.later(()=>{draw();A.pop();A.say('There are '+st.n+'!');},st.n*60+500);}
  draw();
  return {info:()=>st.n+(st.counted?' counted':''),
    controls:()=>{const c=[{t:'Count',go:true,fn:count},{t:'New jar',fn:()=>{st.n=rnd(8,48);st.counted=false;draw();}}];if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);return c;},
    demo(n){st.ask=null;if(n==='count'){st.n=32;st.counted=false;draw();A.seq([[1500,count]]);}if(n==='small'){st.n=9;st.counted=false;draw();A.seq([[1200,count]]);}},
    task(r){st.setup=true;st.counted=false;let txt;
      const near=n=>Math.round(n/10)*10;
      if(r<3){st.n=[rnd(8,12),rnd(28,33),rnd(46,50)][r];const a='About '+near(st.n);st.ask={ans:a,o:['About 10','About 30','About 50'],ok:'Great estimate! Press Count to check: there are '+st.n+'.'};txt='About how many marbles are in the jar? *Estimate!*';}
      else if(r===3){st.n=rnd(21,29);st.ask={ans:String(st.n),o:shuffle([String(st.n),String(st.n+10),String(st.n-10)]),ok:'Yes! There are '+st.n+'.'};txt='Press *Count*. How many marbles are there?';}
      else{st.n=40;st.counted=true;st.ask={ans:'4 groups',o:shuffle(['4 groups','10 groups','40 groups']),ok:'Yes! 4 groups of 10 make 40.'};txt='40 marbles. How many *groups of 10*?';}
      draw();st.setup=false;return txt;}};}
});

/* =========================================================
   5. Fair shares and halves
   ========================================================= */
function plate(col){return mk(G('g1plate',()=>new THREE.CylinderGeometry(.42,.36,.05,32)),lam(col||'#ffffff'),20);}
function cookie(){const g=new THREE.Group();const c=mk(G('g1ck',()=>new THREE.CylinderGeometry(.13,.13,.05,20)),lam('#d39b5a'),0);g.add(c);[[.04,.03],[-.05,-.02],[.0,-.06]].forEach(([x,z])=>{const ch=mk(G('g1chip',()=>new THREE.SphereGeometry(.022,8,6)),lam('#5b3a1e'),0);ch.position.set(x,.03,z);g.add(ch);});return g;}
P.lesson({id:'share1',title:'Fair shares',strand:'Number',codes:['B1.6','B1.7'],
 guide:{goal:'Use drawings to represent and solve fair-share problems with 2 and 4 sharers and remainders of 1 or 2, and recognize that one half and two fourths of the same whole are equal.',words:'share, fair, equal, left over, half, halves, fourths, quarter',
  ask:['What does a fair share mean?','What can we do with a cookie that is left over?','Is one half the same as two fourths?'],home:'Share grapes or crackers between 2 people, then 4 people. Are there any left over?'},
 learn:[{say:'Share it fairly!',speech:'Milo has nine cookies for two friends. He gives one to each friend, again and again. Each friend gets four cookies, and one is left over. To be fair, Milo cuts the last cookie in half!',view:'model',demo:'deal'},
        {say:'Read about halves and fourths.',speech:'When we cut something into two equal parts, each part is one half. When we cut it into four equal parts, each part is one fourth. Two fourths are the same as one half!',view:'read'},
        {say:'Watch: half and two fourths.',speech:'Look at two pizzas. One is cut in half. One is cut into fourths. One half covers the same amount as two fourths!',view:'model',demo:'pizza'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: share the cookies!',speech:'Your turn! Choose two or four friends, and share the cookies fairly.',view:'model'}],
 fig:'Cookies shared onto plates for friends.',rz:.35,
 explore:['Choose *2 friends* or *4 friends*.','Press *Share* to give one to each friend at a time.','Change how many *cookies*.'],
 howTo:'Share fairly, then answer the question.',
 init:k=>({n:9,k:2,dealt:0,view:'share',ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'A *fair share* means everyone gets the *same* amount.')+16;
  for(let f=0;f<2;f++){g.beginPath();g.arc(X0+110+f*240,y+90,80,0,Math.PI*2);g.fillStyle='#fff';g.fill();g.strokeStyle='#d6dae6';g.lineWidth=3;g.stroke();for(let i=0;i<4;i++){g.beginPath();g.arc(X0+80+f*240+(i%2)*60,y+60+Math.floor(i/2)*60,22,0,Math.PI*2);g.fillStyle='#d39b5a';g.fill();}}
  g.beginPath();g.arc(X0+640,y+90,24,0,Math.PI*2);g.fillStyle='#d39b5a';g.fill();T(g,'1 left over',X0+640,y+150,FT.smallB,RED,'center');T(g,'9 cookies, 2 friends: 4 each',X0,y+210,FT.bodyB);y+=240;
  const pz=(cx,n,shade)=>{for(let i=0;i<n;i++){g.beginPath();g.moveTo(cx,y+90);g.arc(cx,y+90,80,i*2*Math.PI/n-Math.PI/2,(i+1)*2*Math.PI/n-Math.PI/2);g.closePath();g.fillStyle=i<shade?'#ffc04d':'#fff3d1';g.fill();g.strokeStyle='#b45309';g.lineWidth=3;g.stroke();}};
  pz(X0+110,2,1);pz(X0+400,4,2);T(g,'1 half',X0+110,y+200,FT.bodyB,INK,'center');T(g,'=',X0+255,y+100,ZS(60),acc(),'center');T(g,'2 fourths',X0+400,y+200,FT.bodyB,INK,'center');y+=230;
  y=keyWords(p,y,[['fair share','everyone gets the same'],['half','one of 2 equal parts']]);
  predict(p,y,S,'p5','Share 10 cookies with 4 friends. How many each? How many left?','*2 each, 2 left over.*');},
 readout(p,S,y){const g=p.g,st=S.st;if(st.view==='pizza'){T(g,'1 half = 2 fourths',X0,y+54,ZS(46),acc());return y+70;}const each=Math.floor(st.dealt/st.k),left=st.n-each*st.k;T(g,st.n+' cookies, '+st.k+' friends',X0,y+40,FT.bodyB);T(g,st.dealt>=st.n-((st.n%st.k))?each+' each, '+(st.n%st.k)+' left over':'Press Share!',X0,y+88,ZS(40),acc());return y+98;},
 build(S,grp,mode,game){const st=S.st;const g2=new THREE.Group();grp.add(g2);let cks=[];
  const spots=()=>st.k===2?[[-1.2,-1.8],[1.2,-1.8]]:[[-1.7,-1.4],[-.6,-2.6],[.6,-2.6],[1.7,-1.4]];
  function friendAt(x,z,i){const f=new THREE.Group();const b=mk(new THREE.SphereGeometry(.2,16,12),lam(COL[i%6]),0);b.position.set(0,.35,0);f.add(b);[-1,1].forEach(s=>{const e=mk(G('g1eye',()=>new THREE.SphereGeometry(.035,8,6)),lam(INK),0);e.position.set(s*.07,.4,.17);f.add(e);});f.position.set(x,0,z-.55);return f;}
  function draw(){clearGroup(g2);cks=[];if(st.view==='pizza'){[[2,-1.1],[4,1.1]].forEach(([n,x])=>{for(let i=0;i<n;i++){const a0=i*2*Math.PI/n,a1=(i+1)*2*Math.PI/n;const on=n===2?i<1:i<2;const w=mk(wedgeGeo(.85,on?.12:.06,a0+.02,a1-.02),lam(on?'#ffc04d':'#fff3d1'),20);w.position.set(x,.02,-1.9);g2.add(w);}
      const l=label(n===2?'1 half':'2 fourths',{size:.24,bg:'#ffffff'});l.position.set(x,.4,-.85);g2.add(l);});const eq=label('=',{size:.5,color:acc()});eq.position.set(0,.3,-1.9);g2.add(eq);A.redraw();return;}
    const sp=spots();sp.forEach(([x,z],i)=>{const pl=plate();pl.position.set(x,.03,z);g2.add(pl);g2.add(friendAt(x,z,i));});const ctr=plate('#f1f5f9');ctr.position.set(0,.03,-.75);g2.add(ctr);
    for(let i=0;i<st.n;i++){const c=cookie();let x,z,yy=.08;if(i<st.dealt){const f=i%st.k,k=Math.floor(i/st.k);x=sp[f][0]+((k%2)-.5)*.26;z=sp[f][1]+(Math.floor(k/2)-.5)*.26;yy=.08+Math.floor(k/4)*.06;}else{const j=i-st.dealt;x=(j%5-2)*.28;z=-.75+Math.floor(j/5)*.0-(Math.floor(j/5))*.0;yy=.08+Math.floor(j/5)*.06;}c.position.set(x,yy,z);g2.add(c);cks.push(c);}
    const left=st.n-st.dealt;if(st.dealt>0&&left<st.k&&left>0){const l=label(left+' left over',{size:.2,bg:'#ffffff',border:RED});l.position.set(0,.45,-.75);g2.add(l);}A.redraw();}
  function share(){st.view='share';if(st.n-st.dealt<st.k){A.bad(st.n-st.dealt?'Not enough for everyone! That is left over.':'All shared!');return;}const s=[];for(let f=0;f<st.k;f++)s.push([260,()=>{st.dealt++;draw();A.pop();}]);s.push([200,()=>{const left=st.n-st.dealt;if(left<st.k)A.say(Math.floor(st.dealt/st.k)+' each'+(left?', '+left+' left over':'!'));}]);A.seq(s);}
  function shareAll(){st.dealt=0;draw();const s=[];const tot=st.n-st.n%st.k;for(let i=0;i<tot;i++)s.push([200,()=>{st.dealt++;draw();}]);s.push([300,()=>A.say(Math.floor(st.n/st.k)+' each'+(st.n%st.k?', '+st.n%st.k+' left over':'!'))]);A.seq(s);}
  draw();
  return {info:()=>st.n+'/'+st.k,
    controls:()=>{const c=[{t:'2 friends',on:st.k===2,fn:()=>{st.k=2;st.dealt=0;st.view='share';draw();}},{t:'4 friends',on:st.k===4,fn:()=>{st.k=4;st.dealt=0;st.view='share';draw();}},{t:'Share',go:true,fn:share},{t:'cookies +',fn:()=>{st.n=Math.min(10,st.n+1);st.dealt=0;draw();}},{t:'cookies −',fn:()=>{st.n=Math.max(2,st.n-1);st.dealt=0;draw();}},{t:'Pizza',fn:()=>{st.view=st.view==='pizza'?'share':'pizza';draw();}}];
      if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c.slice(0,3));return c;},
    demo(n){st.ask=null;st.view='share';if(n==='deal'){st.n=9;st.k=2;st.dealt=0;draw();A.seq([[600,shareAll]]);}if(n==='pizza'){st.view='pizza';draw();}},
    task(r){st.setup=true;st.view='share';st.dealt=0;let txt;
      if(r===0){st.n=9;st.k=2;st.ask={ans:'4 each, 1 left',o:shuffle(['4 each, 1 left','5 each, 0 left','3 each, 3 left']),ok:'Yes! 4 each and 1 left over.'};txt='Share *9 cookies* with *2 friends*. Press Share to help!';}
      else if(r===1){st.n=10;st.k=4;st.ask={ans:'2 each, 2 left',o:shuffle(['2 each, 2 left','3 each, 0 left','1 each, 6 left']),ok:'Yes! 2 each and 2 left over.'};txt='Share *10 cookies* with *4 friends*.';}
      else if(r===2){st.n=6;st.k=4;st.ask={ans:'1 each, 2 left',o:shuffle(['1 each, 2 left','2 each, 0 left','6 each']),ok:'Yes! 1 each and 2 left over.'};txt='Share *6 cookies* with *4 friends*.';}
      else if(r===3){st.n=7;st.k=2;st.ask={ans:'Cut it in half',o:shuffle(['Cut it in half','Throw it away','Give it to one friend']),ok:'Yes! Then each friend gets 3 and a half.'};txt='*7 cookies*, *2 friends*: 1 is left over. What is *fair*?';}
      else{st.view='pizza';st.ask={ans:'The same',o:['The same','1 half is more','2 fourths is more'],ok:'Yes! 1 half = 2 fourths.'};txt='Look at the pizzas. Is *1 half* more, less, or *the same* as *2 fourths*?';}
      draw();st.setup=false;return txt;}};}
});

/* =========================================================
   6. Smaller and smaller pieces
   ========================================================= */
P.lesson({id:'pieces1',title:'More sharers, smaller pieces',strand:'Number',codes:['B1.8'],
 guide:{goal:'Use drawings to compare and order unit fractions that result when a whole is shared by different numbers of sharers, up to 10.',words:'whole, equal parts, piece, bigger, smaller, half, third, fourth',
  ask:['If more friends share a sandwich, are the pieces bigger or smaller?','Which is bigger: 1 of 3 pieces or 1 of 6 pieces?','Why?'],home:'Fold a paper in 2, then a new paper in 4. Which piece is bigger?'},
 learn:[{say:'Share one sandwich.',speech:'Suki and Kai share one sandwich. Each gets a big piece: one half. Now four friends share the same sandwich. Each piece is smaller! The more friends, the smaller the pieces.',view:'model',demo:'more'},
        {say:'Read about pieces.',speech:'When a whole is shared by more people, each piece gets smaller. One half is bigger than one third. One third is bigger than one fourth.',view:'read'},
        {say:'Watch: compare two sandwiches.',speech:'This sandwich is shared by three. That one is shared by six. A piece of the first one is bigger!',view:'model',demo:'cmp'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: compare pieces!',speech:'Your turn! Change the number of friends and compare the pieces.',view:'model'}],
 fig:'Two sandwiches cut into equal pieces.',rz:.35,
 explore:['Change the friends for each sandwich.','Each *gold piece* is one share.','*Tap a sandwich* to choose it.'],
 howTo:'Tap the sandwich with the bigger (or smaller) piece.',
 init:k=>({a:2,b:4,want:null,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'Share *one whole* with more friends, and each piece gets *smaller*.')+16;
  [2,3,4,6].forEach((n,j)=>{const w=TW-160;for(let i=0;i<n;i++){g.fillStyle=i===0?'#ffc04d':'#fff3d1';g.fillRect(X0+i*w/n,y+j*70,w/n-4,52);}g.strokeStyle='#b45309';g.lineWidth=2;g.strokeRect(X0,y+j*70,w-4,52);T(g,'1 of '+n,X0+w+20,y+j*70+36,FT.bodyB,acc());});y+=290;
  y=para(p,y,'*1 of 2* is bigger than *1 of 3*, which is bigger than *1 of 4*.')+10;
  y=keyWords(p,y,[['whole','the full thing'],['equal parts','pieces that are the same size']]);
  predict(p,y,S,'p6','Would you rather have 1 of 2 pieces or 1 of 10 pieces of a pie?','*1 of 2!* It is much bigger.');},
 readout(p,S,y){const g=p.g,st=S.st;T(g,'1 of '+st.a+(st.a<st.b?'  is bigger than  ':st.a>st.b?'  is smaller than  ':'  is the same as  ')+'1 of '+st.b,X0,y+54,ZS(40),acc());return y+70;},
 build(S,grp,mode,game){const st=S.st;const g2=new THREE.Group();grp.add(g2);
  function sand(n,z,i){const L=3.6,w=L/n;for(let k=0;k<n;k++){const on=k===0;const sl=new THREE.Group();const br=mk(G('g1br'+n,()=>new THREE.BoxGeometry(w-.04,.08,.7)),lam('#f3d09a'),20);sl.add(br);const ch=mk(G('g1ch'+n,()=>new THREE.BoxGeometry(w-.06,.05,.66)),lam(on?'#ffc04d':'#86efac'),0);ch.position.y=.06;sl.add(ch);const tp=mk(G('g1br'+n,()=>new THREE.BoxGeometry(w-.04,.08,.7)),lam('#f3d09a'),20);tp.position.y=.12;sl.add(tp);
      sl.position.set(-L/2+(k+.5)*w,on?.3:.06,z);g2.add(sl);sl.children.forEach(c=>A.drag(c,{tap:()=>tap(i)}));}const l=label('1 of '+n,{size:.22,bg:'#ffffff'});l.position.set(2.15,.4,z);g2.add(l);}
  function draw(){clearGroup(g2);sand(st.a,-2.5,0);sand(st.b,-1.3,1);A.redraw();}
  function tap(i){A.pop();if(mode==='play'&&!st.setup&&st.want){if(st.want(i))game.solved(st.wantOk);else A.bad('Look at the gold pieces. Which is bigger?');}}
  draw();
  return {info:()=>st.a+'/'+st.b,
    controls:()=>{const c=[{t:'top friends −',fn:()=>{st.a=Math.max(2,st.a-1);draw();}},{t:'top friends +',fn:()=>{st.a=Math.min(10,st.a+1);draw();}},{t:'bottom friends −',fn:()=>{st.b=Math.max(2,st.b-1);draw();}},{t:'bottom friends +',go:true,fn:()=>{st.b=Math.min(10,st.b+1);draw();}}];if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);return c;},
    demo(n){st.ask=null;st.want=null;if(n==='more'){st.a=2;st.b=2;draw();A.seq([[900,()=>{st.b=3;draw();}],[800,()=>{st.b=4;draw();A.say('Smaller pieces!');}]]);}if(n==='cmp'){st.a=3;st.b=6;draw();}},
    task(r){st.setup=true;st.ask=null;st.want=null;let txt;
      if(r<3){const pr=[[2,4],[5,3],[8,6]][r];st.a=pr[0];st.b=pr[1];const big=st.a<st.b?0:1;st.want=i=>i===big;st.wantOk='Yes! Fewer friends, bigger pieces!';txt='Tap the sandwich with the *bigger* gold piece.';}
      else if(r===3){st.a=4;st.b=10;st.want=i=>i===1;st.wantOk='Yes! 10 friends means small pieces.';txt='Tap the sandwich with the *smaller* gold piece.';}
      else{st.a=2;st.b=3;st.ask={ans:'1 of 2',o:['1 of 2','1 of 3','1 of 10'],ok:'Yes! 1 of 2 is the biggest piece.'};txt='Which piece is the *biggest*?';}
      draw();st.setup=false;return txt;}};}
});

/* =========================================================
   7. Addition facts to 10
   ========================================================= */
function tenFrame(grp,x,z,n1,n2,c1,c2,hide){const fr=mk(new THREE.BoxGeometry(2.3,.05,.98),lam('#ffffff'),20);fr.position.set(x,.025,z);grp.add(fr);for(let i=0;i<10;i++){const cx=x-.92+(i%5)*.46,cz=z-.23+Math.floor(i/5)*.46;const sl=mk(G('g1slot',()=>new THREE.BoxGeometry(.42,.02,.42)),lam('#f1f5f9'),0);sl.position.set(cx,.06,cz);grp.add(sl);
  if(i<n1+n2&&!(hide&&i>=n1)){const b=mk(G('g1ctr',()=>new THREE.CylinderGeometry(.17,.17,.08,22)),lam(i<n1?c1:c2),0);b.position.set(cx,.11,cz);grp.add(b);}}}
P.lesson({id:'facts10',title:'Adding and subtracting to 10',strand:'Number',codes:['B2.1','B2.2'],
 guide:{goal:'Recall and demonstrate addition facts for numbers up to 10 and related subtraction facts, and use the properties of addition and subtraction to solve problems and check calculations.',words:'add, plus, subtract, minus, equals, turn-around fact, fact family',
  ask:['If 6 + 3 = 9, what is 3 + 6?','If 6 + 3 = 9, what is 9 − 3?','How can adding check a subtraction?'],home:'Use 10 small toys. Hide some under a cup. How many are hiding? Make up adding and subtracting stories.'},
 learn:[{say:'Fill the ten frame.',speech:'Kai puts six orange counters and three yellow counters in the ten frame. Count them all: nine! Six plus three equals nine. Now turn it around: three plus six is also nine. That is a turn-around fact!',view:'model',demo:'add'},
        {say:'Read about fact families.',speech:'Six plus three equals nine, so nine minus three equals six, and nine minus six equals three. These facts are a family! Adding can check subtracting.',view:'read'},
        {say:'Watch: take away.',speech:'Nine counters. Take away three yellow counters. Six are left. Nine minus three equals six.',view:'model',demo:'sub'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: make a fact!',speech:'Your turn! Add orange and yellow counters to make a fact.',view:'model'}],
 fig:'A ten frame with two colours of counters.',rz:.35,
 explore:['Add *orange* or *yellow* counters.','Press *Turn around* to swap the colours.','Press *Take away yellow* to subtract.'],
 howTo:'Make the fact on the ten frame, or choose the answer.',
 init:k=>({a:6,b:3,hide:false,need:null,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'A *ten frame* has 10 spaces. It helps us add and subtract.')+16;
  const s=64;for(let i=0;i<10;i++){const x=X0+(i%5)*s,yy=y+Math.floor(i/5)*s;g.strokeStyle='#94a3b8';g.lineWidth=3;g.strokeRect(x,yy,s,s);if(i<9){g.beginPath();g.arc(x+s/2,yy+s/2,24,0,Math.PI*2);g.fillStyle=i<6?'#ff6b35':'#ffc04d';g.fill();}}
  T(g,'6 + 3 = 9',X0+380,y+50,ZS(44),acc());T(g,'3 + 6 = 9',X0+380,y+110,ZS(44),acc());y+=160;
  rr(g,X0,y,TW,150,18);g.fillStyle=tint(acc(),.12);g.fill();T(g,'Fact family',X0+20,y+36,FT.bodyB,acc());T(g,'6 + 3 = 9     3 + 6 = 9',X0+20,y+80,FT.hand||FT.body);T(g,'9 − 3 = 6     9 − 6 = 3',X0+20,y+124,FT.hand||FT.body);y+=172;
  y=keyWords(p,y,[['turn-around fact','3 + 6 and 6 + 3 give the same answer'],['fact family','add and subtract facts with the same 3 numbers']]);
  predict(p,y,S,'p7','If 7 + 2 = 9, what is 9 − 2?','*7!*');},
 readout(p,S,y){const g=p.g,st=S.st;T(g,st.hide?(st.a+st.b)+' − '+st.b+' = '+st.a:st.a+' + '+st.b+' = '+(st.a+st.b),X0,y+58,ZS(60),acc());return y+72;},
 build(S,grp,mode,game){const st=S.st;const g2=new THREE.Group();grp.add(g2);
  function draw(){clearGroup(g2);tenFrame(g2,0,-2.0,st.a,st.b,'#ff6b35','#ffc04d',st.hide);const l=label(st.hide?(st.a+st.b)+' − '+st.b+' = '+st.a:st.a+' + '+st.b+' = '+(st.a+st.b),{size:.36,bg:'#ffffff'});l.position.set(0,.9,-2.8);g2.add(l);check();A.redraw();}
  function check(){if(mode==='play'&&!st.setup&&st.need&&st.a===st.need[0]&&st.b===st.need[1]&&!st.hide)game.solved('Yes! '+st.a+' + '+st.b+' = '+(st.a+st.b)+'!');}
  const add=(k,d)=>{st.hide=false;if(d>0&&st.a+st.b>=10){A.bad('The ten frame is full!');return;}if(st[k]+d<0)return;st[k]+=d;A.pop();draw();};
  draw();
  return {info:()=>st.a+'+'+st.b,
    controls:()=>{const c=[{t:'+ orange',fn:()=>add('a',1)},{t:'− orange',fn:()=>add('a',-1)},{t:'+ yellow',go:true,fn:()=>add('b',1)},{t:'− yellow',fn:()=>add('b',-1)},{t:'Turn around',fn:()=>{st.hide=false;[st.a,st.b]=[st.b,st.a];A.pop();draw();}},{t:'Take away yellow',fn:()=>{st.hide=!st.hide;A.pop();draw();}}];if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);return c;},
    demo(n){st.ask=null;st.need=null;st.hide=false;if(n==='add'){st.a=6;st.b=0;draw();A.seq([0,1,2].map(()=>[450,()=>add('b',1)]).concat([[900,()=>{[st.a,st.b]=[st.b,st.a];draw();A.say('3 + 6 = 9');}]]));}if(n==='sub'){st.a=6;st.b=3;draw();A.seq([[1000,()=>{st.hide=true;draw();A.say('9 − 3 = 6');}]]);}},
    task(r){st.setup=true;st.ask=null;st.need=null;st.hide=false;st.a=0;st.b=0;let txt;
      if(r===0){st.need=[rnd(3,6),rnd(2,4)];txt='Make *'+st.need[0]+' + '+st.need[1]+'* on the ten frame.';}
      else if(r===1){const a=rnd(4,7),b=rnd(1,10-a);st.a=a;st.b=b;st.ask={ans:String(a+b),o:shuffle([String(a+b),String(a+b+1),String(a+b-1)]),ok:'Yes! '+a+' + '+b+' = '+(a+b)+'.'};txt='What is *'+a+' + '+b+'*?';}
      else if(r===2){const a=rnd(4,7),b=rnd(2,10-a);st.a=a;st.b=b;st.hide=true;st.ask={ans:String(a),o:shuffle([String(a),String(a+b),String(b)]),ok:'Yes! '+(a+b)+' − '+b+' = '+a+'.'};txt='What is *'+(a+b)+' − '+b+'*?';}
      else if(r===3){st.a=3;st.b=5;st.ask={ans:'3',o:shuffle(['3','5','8']),ok:'Yes! 3 + 5 = 5 + 3.'};txt='*3 + 5 = 5 + ___*. Try Turn around!';}
      else{st.a=5;st.b=3;st.ask={ans:'5 + 3 = 8',o:shuffle(['5 + 3 = 8','8 + 3 = 11','5 − 3 = 2']),ok:'Yes! Adding checks subtracting.'};txt='Which fact *checks* that *8 − 3 = 5*?';}
      draw();st.setup=false;return txt;}};}
});

/* =========================================================
   8. Mental math to 20
   ========================================================= */
P.lesson({id:'make10',title:'Make 10 and doubles',strand:'Number',codes:['B2.3'],
 guide:{goal:'Use mental math strategies, including estimation, to add and subtract whole numbers that add up to no more than 20, and explain the strategies used.',words:'make ten, double, near double, count on, estimate, strategy',
  ask:['How does making 10 help you add 8 + 5?','What is double 6?','How can 6 + 6 help you find 6 + 7?'],home:'Roll two dice. Add the dots using make 10 or doubles. Explain your strategy!'},
 learn:[{say:'Make a ten first!',speech:'Zara wants to add eight plus five. She fills the first ten frame: move two counters over to make ten. Now there are ten and three more. Ten plus three is thirteen! So eight plus five is thirteen.',view:'model',demo:'make'},
        {say:'Read about doubles.',speech:'Doubles are facts like six plus six, which is twelve. Near doubles are one more: six plus seven is twelve plus one, thirteen. Doubles are easy to remember!',view:'read'},
        {say:'Watch: a double.',speech:'Seven plus seven. Both ten frames have seven. Double seven is fourteen!',view:'model',demo:'double'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: make 10!',speech:'Your turn! Change the numbers and press Make ten.',view:'model'}],
 fig:'Two ten frames: counters slide to make 10.',rz:.35,
 explore:['Change the two numbers.','Press *Make ten* to slide counters over.','Look for *doubles*!'],
 howTo:'Use a strategy, then choose the answer.',
 init:k=>({a:8,b:5,made:false,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'*Make 10:* move some counters to fill a ten frame first.')+16;
  const f=(ox,n,c)=>{const s=40;for(let i=0;i<10;i++){const x=ox+(i%5)*s,yy=y+Math.floor(i/5)*s;g.strokeStyle='#94a3b8';g.lineWidth=2;g.strokeRect(x,yy,s,s);if(i<n){g.beginPath();g.arc(x+s/2,yy+s/2,15,0,Math.PI*2);g.fillStyle=c(i);g.fill();}}};
  f(X0,10,i=>i<8?'#ff6b35':'#ffc04d');f(X0+230,3,()=>'#ffc04d');T(g,'8 + 5 = 10 + 3 = 13',X0+470,y+50,FT.bodyB,acc());y+=110;
  rr(g,X0,y,TW,150,18);g.fillStyle=tint(acc(),.12);g.fill();T(g,'Doubles and near doubles',X0+20,y+38,FT.bodyB,acc());T(g,'6 + 6 = 12      7 + 7 = 14',X0+20,y+82,FT.hand||FT.body);T(g,'6 + 7 = 12 + 1 = 13',X0+20,y+124,FT.hand||FT.body);y+=172;
  y=para(p,y,'*Estimate:* 9 + 9 is a bit less than 10 + 10, so it is less than 20.')+10;
  y=keyWords(p,y,[['make ten','fill a ten first, then add the rest'],['double','a number plus itself']]);
  predict(p,y,S,'p8','What is 9 + 4? (Hint: make 10!)','*13.* 10 + 3.');},
 readout(p,S,y){const g=p.g,st=S.st,s=st.a+st.b;T(g,st.a+' + '+st.b+' = '+s,X0,y+52,ZS(54),acc());T(g,st.a===st.b?'double '+st.a+'!':Math.abs(st.a-st.b)===1?'near double!':st.made?'10 + '+(s-10)+' = '+s:'',X0,y+96,FT.bodyB);return y+104;},
 build(S,grp,mode,game){const st=S.st;const g2=new THREE.Group();grp.add(g2);
  function draw(){clearGroup(g2);let a=st.a,b=st.b;if(st.made&&a+b>=10){const mv=10-a;tenFrame(g2,-1.2,-2.0,a,mv,'#ff6b35','#ffc04d');tenFrame(g2,1.2,-2.0,0,b-mv,'#ff6b35','#ffc04d');}else{tenFrame(g2,-1.2,-2.0,a,0,'#ff6b35','#ffc04d');tenFrame(g2,1.2,-2.0,0,b,'#ff6b35','#ffc04d');}
    const l=label(st.a+' + '+st.b+(st.made&&st.a+st.b>=10?' = 10 + '+(st.a+st.b-10):'')+' = '+(st.a+st.b),{size:.3,bg:'#ffffff'});l.position.set(0,.85,-2.8);g2.add(l);A.redraw();}
  function make(){if(st.a+st.b<10){A.bad('Not enough to make 10. Just count on!');return;}st.made=true;A.pop();draw();A.say('10 + '+(st.a+st.b-10)+' = '+(st.a+st.b));}
  const set=(k,d)=>{st[k]=Math.max(0,Math.min(10,st[k]+d));st.made=false;draw();};
  draw();
  return {info:()=>st.a+'+'+st.b,
    controls:()=>{const c=[{t:'Make ten',go:true,fn:make},{t:'1st +',fn:()=>set('a',1)},{t:'1st −',fn:()=>set('a',-1)},{t:'2nd +',fn:()=>set('b',1)},{t:'2nd −',fn:()=>set('b',-1)}];if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);return c;},
    demo(n){st.ask=null;st.made=false;if(n==='make'){st.a=8;st.b=5;draw();A.seq([[1000,make]]);}if(n==='double'){st.a=7;st.b=7;draw();A.say('Double 7 is 14!');}},
    task(r){st.setup=true;st.made=false;let txt;
      if(r===0){st.a=9;st.b=pick([3,4,5]);const s=st.a+st.b;st.ask={ans:String(s),o:shuffle([String(s),String(s+1),String(s-2)]),ok:'Yes! 10 + '+(s-10)+' = '+s+'.'};txt='Make 10 to find *'+st.a+' + '+st.b+'*.';}
      else if(r===1){const d=pick([6,7,8]);st.a=d;st.b=d;st.ask={ans:String(2*d),o:shuffle([String(2*d),String(2*d+1),String(d+1)]),ok:'Yes! Double '+d+' is '+2*d+'.'};txt='What is *double '+d+'*?';}
      else if(r===2){st.a=6;st.b=7;st.ask={ans:'13',o:shuffle(['13','12','14']),ok:'Yes! 6 + 6 = 12, and 1 more is 13.'};txt='Use a near double: *6 + 7*.';}
      else if(r===3){st.a=9;st.b=9;st.ask={ans:'Less than 20',o:['Less than 20','More than 20'],ok:'Yes! 9 + 9 = 18.'};txt='*Estimate*: is 9 + 9 *more* or *less* than 20?';}
      else{st.a=10;st.b=5;st.ask={ans:'10',o:shuffle(['10','5','15']),ok:'Yes! 15 − 5 = 10.'};txt='What is *15 − 5*?';}
      draw();st.setup=false;return txt;}};}
});

/* =========================================================
   9. Story problems to 50
   ========================================================= */
P.lesson({id:'story50',title:'Story problems to 50',strand:'Number',codes:['B2.4'],
 guide:{goal:'Use objects, diagrams and equations to represent, describe and solve addition and subtraction situations with whole numbers that add up to no more than 50.',words:'join, take away, compare, how many more, number line, equation',
  ask:['Do you join or take away in this story?','How can jumps of 10 help on a number line?','How many more is 30 than 25?'],home:'Make a story: “I had 15 stickers and got 12 more.” Act it out with toys and write the equation.'},
 learn:[{say:'Hop to solve stories!',speech:'Leo sees twenty-three fish. Twelve more swim in. How many now? Start at twenty-three. Jump ten to thirty-three, then two more to thirty-five. Twenty-three plus twelve equals thirty-five!',view:'model',demo:'add'},
        {say:'Read about story problems.',speech:'Some stories join groups: add. Some stories take away: subtract. You can use a number line, cubes, or a drawing to solve them.',view:'read'},
        {say:'Watch: take away.',speech:'There are forty birds. Fifteen fly away. Start at forty. Jump back ten to thirty, then five to twenty-five. Twenty-five birds are left.',view:'model',demo:'sub'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: hop and solve!',speech:'Your turn! Hop the frog to solve the story.',view:'model'}],
 fig:'A frog hops by tens and ones on a number line to 50.',rz:.35,
 explore:['Hop *+10*, *+1*, *−10* or *−1*.','*Start* takes the frog back.','Say the equation!'],
 howTo:'Hop the frog to the answer, or choose it.',
 init:k=>({start:23,pos:23,target:null,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'*Join* stories add. *Take away* stories subtract.')+16;
  const ox=X0+20,w=TW-40,X=v=>ox+v/50*w,ly=y+90;g.strokeStyle=INK;g.lineWidth=4;g.beginPath();g.moveTo(ox,ly);g.lineTo(ox+w,ly);g.stroke();for(let v=0;v<=50;v+=5){g.lineWidth=v%10?2:4;g.beginPath();g.moveTo(X(v),ly-10);g.lineTo(X(v),ly+10);g.stroke();if(v%10===0)T(g,String(v),X(v),ly+38,FT.smallB,INK,'center');}
  [[23,33,'+10'],[33,34,''],[34,35,'+1 +1']].forEach(([a,b,t],i)=>{g.strokeStyle=COL[i];g.lineWidth=4;g.beginPath();g.moveTo(X(a),ly-8);g.quadraticCurveTo((X(a)+X(b))/2,ly-70,X(b),ly-8);g.stroke();if(t)T(g,t,(X(a)+X(b))/2,ly-60,FT.smallB,COL[i],'center');});y+=150;
  rr(g,X0,y,TW,110,18);g.fillStyle=tint(acc(),.12);g.fill();T(g,'23 fish, 12 more swim in.',X0+20,y+40,FT.bodyB);T(g,'23 + 12 = 35',X0+20,y+86,ZS(40),acc());y+=130;
  y=keyWords(p,y,[['join','put groups together: add'],['take away','some leave: subtract']]);
  predict(p,y,S,'p9','You have 20 stickers and get 14 more. How many now?','*34!* 20 + 10 + 4.');},
 readout(p,S,y){const g=p.g,st=S.st;const d=st.pos-st.start;T(g,st.start+(d>=0?' + '+d:' − '+(-d))+' = '+st.pos,X0,y+56,ZS(54),acc());return y+70;},
 build(S,grp,mode,game){const st=S.st;const x0=-2.1,x1=2.1,z=-1.6;const X=v=>x0+v/50*(x1-x0);const bar=mk(new THREE.BoxGeometry(4.4,.05,.06),lam(INK),0);bar.position.set(0,.05,z);grp.add(bar);
  for(let v=0;v<=50;v++){const t=mk(G('g1tk'+(v%10?v%5?1:2:3),()=>new THREE.BoxGeometry(.015,.05,v%10?v%5?.08:.14:.22)),lam(INK),0);t.position.set(X(v),.06,z);grp.add(t);if(v%10===0){const l=label(String(v),{size:.17,color:INK});l.position.set(X(v),.12,z+.3);grp.add(l);}}
  const fg=frog();grp.add(fg);const marks=new THREE.Group();grp.add(marks);const big=label('',{size:.32,bg:'#ffffff'});big.position.set(0,1.1,-2.6);grp.add(big);let busy=Promise.resolve();
  function place(){fg.position.set(X(st.pos),.08,z);big.userData.set(String(st.pos));clearGroup(marks);const s=mk(new THREE.CylinderGeometry(.07,.07,.04,16),lam('#f5b301'),0);s.position.set(X(st.start),.06,z);marks.add(s);A.redraw();}
  function hopBy(d){busy=busy.then(()=>{const n=st.pos+d;if(n<0||n>50){A.bad('The line stops there!');return;}return hop(fg,V(X(n),.08,z),Math.abs(d)>=10?.6:.25,Math.abs(d)>=10?.5:.25).then(()=>{st.pos=n;big.userData.set(String(n));A.pop();A.say(String(n));A.redraw();
      if(mode==='play'&&!st.setup&&st.target!=null&&st.pos===st.target)game.solved('Yes! The answer is '+n+'!');});});}
  place();
  return {info:()=>String(st.pos),
    controls:()=>{const c=[{t:'+10',go:true,fn:()=>hopBy(10)},{t:'+1',fn:()=>hopBy(1)},{t:'−10',fn:()=>hopBy(-10)},{t:'−1',fn:()=>hopBy(-1)},{t:'Start',fn:()=>{st.pos=st.start;place();}}];if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);return c;},
    demo(n){st.ask=null;st.target=null;if(n==='add'){st.start=23;st.pos=23;place();A.seq([[700,()=>hopBy(10)],[800,()=>hopBy(1)],[400,()=>hopBy(1)]]);}if(n==='sub'){st.start=40;st.pos=40;place();A.seq([[700,()=>hopBy(-10)],[800,()=>hopBy(-1)],[350,()=>hopBy(-1)],[350,()=>hopBy(-1)],[350,()=>hopBy(-1)],[350,()=>hopBy(-1)]]);}},
    task(r){st.setup=true;st.ask=null;st.target=null;let txt;
      if(r===0){const a=rnd(11,25),b=rnd(11,20);st.start=a;st.target=a+b;txt='There are *'+a+' fish*. *'+b+' more* swim in. Hop to find how many now!';}
      else if(r===1){const a=rnd(35,48),b=rnd(11,19);st.start=a;st.target=a-b;txt='There are *'+a+' birds*. *'+b+'* fly away. Hop to find how many are left!';}
      else if(r===2){st.start=20;st.ask={ans:'15',o:shuffle(['15','55','10']),ok:'Yes! 20 + 15 = 35.'};txt='*20 + ___ = 35*. How many more jumps?';}
      else if(r===3){st.start=25;st.ask={ans:'5 more',o:shuffle(['5 more','55 more','10 more']),ok:'Yes! From 25 to 30 is 5.'};txt='Milo has *30* cards. Suki has *25*. How many *more* does Milo have?';}
      else{st.start=30;st.ask={ans:'Add',o:['Add','Subtract'],ok:'Yes! More children join: add.'};txt='*30 children* are at the park. *12 more* come. Do we *add* or *subtract*?';}
      st.pos=st.start;place();st.setup=false;return txt;}};}
});

/* =========================================================
   10. Equal groups and halves
   ========================================================= */
P.lesson({id:'groups1',title:'Equal groups',strand:'Number',codes:['B2.5'],
 guide:{goal:'Represent and solve equal-group problems where the total is no more than 10, including problems in which each group is a half, using tools and drawings.',words:'equal groups, group of, each, in all, half, halves, whole',
  ask:['What makes groups equal?','How many in all: 3 groups of 2?','4 children each get half an apple. How many apples?'],home:'Put 2 grapes on each of 4 plates. How many grapes in all? Then try halves of a sandwich!'},
 learn:[{say:'Same number in each group.',speech:'Equal groups have the same number in each group. Amara has three plates with two strawberries each. Two, four, six! Three groups of two make six.',view:'model',demo:'grow'},
        {say:'Read about halves.',speech:'A group can be half of something. Two halves make one whole. If four children each get half an apple, we need two whole apples.',view:'read'},
        {say:'Watch: halves.',speech:'Each plate gets half an apple. Two halves make one apple. Four plates need two apples!',view:'model',demo:'half'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: make groups!',speech:'Your turn! Change the plates and how many on each.',view:'model'}],
 fig:'Plates with the same number of strawberries.',rz:.35,
 explore:['Change the number of *plates*.','Change *how many on each* (try a half!).','Count *in all*.'],
 howTo:'Make the equal groups, or choose the answer.',
 init:k=>({g:3,e:2,need:null,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'*Equal groups* have the *same number* in each group.')+16;
  for(let k=0;k<3;k++){g.beginPath();g.arc(X0+90+k*180,y+80,70,0,Math.PI*2);g.fillStyle='#ffffff';g.fill();g.strokeStyle='#d6dae6';g.lineWidth=3;g.stroke();for(let i=0;i<2;i++){g.beginPath();g.arc(X0+70+k*180+i*40,y+80,18,0,Math.PI*2);g.fillStyle='#ef4444';g.fill();}}
  T(g,'3 groups of 2 = 6',X0+600,y+90,FT.bodyB,acc());y+=180;
  for(let k=0;k<4;k++){g.beginPath();g.arc(X0+70+k*130,y+60,50,0,Math.PI*2);g.fillStyle='#ffffff';g.fill();g.strokeStyle='#d6dae6';g.stroke();g.beginPath();g.arc(X0+70+k*130,y+60,26,Math.PI/2,Math.PI*1.5);g.closePath();g.fillStyle='#84cc16';g.fill();}
  T(g,'4 halves = 2 apples',X0+600,y+70,FT.bodyB,acc());y+=140;
  y=keyWords(p,y,[['equal groups','groups with the same number'],['half','one of 2 equal parts']]);
  predict(p,y,S,'p10','5 groups of 2. How many in all?','*10!* 2, 4, 6, 8, 10.');},
 readout(p,S,y){const g=p.g,st=S.st;const tot=st.g*st.e;T(g,st.g+' groups of '+(st.e===.5?'a half':st.e)+' = '+(st.e===.5?(tot%1?Math.floor(tot)+' and a half':String(tot)):tot),X0,y+54,ZS(44),acc());return y+70;},
 build(S,grp,mode,game){const st=S.st;const g2=new THREE.Group();grp.add(g2);
  function berry(){const g=new THREE.Group();const b=mk(G('g1ber',()=>new THREE.SphereGeometry(.1,14,10)),lam('#ef4444'),0);b.scale.set(1,1.15,1);g.add(b);const l=mk(G('g1leaf',()=>new THREE.ConeGeometry(.06,.06,6)),lam('#22c55e'),0);l.position.y=.12;l.rotation.x=Math.PI;g.add(l);return g;}
  function halfApple(){const m=mk(G('g1ha',()=>new THREE.SphereGeometry(.16,18,12,0,Math.PI)),lam('#84cc16'),0);m.rotation.y=Math.PI/2;return m;}
  function draw(){clearGroup(g2);for(let k=0;k<st.g;k++){const x=-1.8+(k%5)*.9,z=-2.5+Math.floor(k/5)*1.0;const pl=plate();pl.position.set(x,.03,z);g2.add(pl);
      if(st.e===.5){const h=halfApple();h.position.set(x,.1,z);g2.add(h);}else for(let i=0;i<st.e;i++){const b=berry();b.position.set(x+((i%3)-1)*.2,.15,z+(Math.floor(i/3)-.3)*.22);g2.add(b);}}
    const tot=st.g*st.e;const l=label('in all: '+(st.e===.5?(tot%1?Math.floor(tot)+' ½ apples':tot+' apples'):tot),{size:.3,bg:'#ffffff'});l.position.set(0,1.0,-1.0);g2.add(l);check();A.redraw();}
  function check(){if(mode==='play'&&!st.setup&&st.need&&st.g===st.need[0]&&st.e===st.need[1])game.solved('Yes! '+st.g+' groups of '+st.e+' make '+st.g*st.e+'!');}
  const EA=[.5,1,2,3,4,5];const setE=d=>{const i=EA.indexOf(st.e);const n=EA[Math.max(0,Math.min(EA.length-1,i+d))];if(st.g*n>10){A.bad('Let’s keep it to 10 or less.');return;}st.e=n;A.pop();draw();};
  const setG=d=>{const n=Math.max(1,Math.min(10,st.g+d));if(n*st.e>10){A.bad('Let’s keep it to 10 or less.');return;}st.g=n;A.pop();draw();};
  draw();
  return {info:()=>st.g+'x'+st.e,
    controls:()=>{const c=[{t:'plates +',go:true,fn:()=>setG(1)},{t:'plates −',fn:()=>setG(-1)},{t:'each +',fn:()=>setE(1)},{t:'each −',fn:()=>setE(-1)}];if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);return c;},
    demo(n){st.ask=null;st.need=null;if(n==='grow'){st.e=2;st.g=1;draw();A.seq([[600,()=>setG(1)],[600,()=>setG(1)],[500,()=>A.say('2, 4, 6!')]]);}if(n==='half'){st.e=.5;st.g=4;draw();A.say('4 halves = 2 apples');}},
    task(r){st.setup=true;st.ask=null;st.need=null;st.g=1;st.e=1;let txt;
      if(r===0){st.need=[pick([3,4]),2];txt='Make *'+st.need[0]+' groups of 2*.';}
      else if(r===1){st.need=[2,pick([4,5])];txt='Make *2 groups of '+st.need[1]+'*.';}
      else if(r===2){st.g=5;st.e=2;st.ask={ans:'10',o:shuffle(['10','7','12']),ok:'Yes! 2, 4, 6, 8, 10.'};txt='*5 groups of 2*. How many *in all*?';}
      else if(r===3){st.g=4;st.e=.5;st.ask={ans:'2 apples',o:shuffle(['2 apples','4 apples','1 apple']),ok:'Yes! 4 halves = 2 wholes.'};txt='*4 children* each get *half an apple*. How many apples do we need?';}
      else{st.g=6;st.e=.5;st.ask={ans:'3',o:shuffle(['3','6','2']),ok:'Yes! 6 halves make 3 wholes.'};txt='*6 friends* each get *half a sandwich*. How many sandwiches?';}
      draw();st.setup=false;return txt;}};}
});
})();
