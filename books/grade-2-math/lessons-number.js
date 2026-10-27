/* The Interactive Classroom: Grade 2 Math — Number (lessons 1–11) */
(function(){
"use strict";
const P=window.PM;if(!P||P.failed||!P.THREE)return;
const {THREE,V,W,D,PY,PX,X0,TW,INK,RED,BLUE,GREY,VIBE,FT,ZS,G,M,lam,mk,unitBox,cellMat,label,starGeo,wedgeGeo,clearGroup,disposeObj,rr,T,wrap,para,header,keyWords,predict,box,caption,cxOf,cyOf,tint,moveTo,hop,tween,burst,easeOut,easeIO,A}=P;
const acc=()=>P.ACC;
const rnd=(a,b)=>a+Math.floor(Math.random()*(b-a+1)),pick=a=>a[Math.floor(Math.random()*a.length)],shuffle=a=>a.slice().sort(()=>Math.random()-.5);
function choices(game,list,ans,ok,lab){return list.map(o=>({t:lab?lab(o):String(o),big:true,fn:()=>{if(o===ans){if(game)game.solved(ok);else A.good(ok);}else A.bad('Not quite. Try again!');}}));}
const COL=['#ff6b35','#ff8a3d','#ffc04d','#5fd38a','#2f7de1','#8b5cf6'];
const HAND=()=>FT.hand||FT.body;
function cube(col,s){return mk(G('g2c'+(s||.2)+col,()=>new THREE.BoxGeometry((s||.2)*.92,(s||.2)*.92,(s||.2)*.92)),lam(col),20);}
function bead(col,r){return mk(G('g2b'+(r||.1),()=>new THREE.SphereGeometry(r||.1,16,12)),lam(col),0);}
function frog(){const g=new THREE.Group();const b=mk(new THREE.SphereGeometry(.17,18,14),lam('#5cc46a'),0);b.scale.set(1.1,.8,1);b.position.y=.14;g.add(b);
  [-1,1].forEach(s=>{const e=mk(new THREE.SphereGeometry(.06,12,10),lam('#ffffff'),0);e.position.set(s*.08,.29,.08);g.add(e);const pu=mk(new THREE.SphereGeometry(.028,10,8),lam(INK),0);pu.position.set(s*.08,.3,.13);g.add(pu);});return g;}
function plate(col){return mk(G('g2plate'+(col||''),()=>new THREE.CylinderGeometry(.38,.32,.05,30)),lam(col||'#ffffff'),20);}
function tenFrame(grp,x,z,n1,n2,c1,c2){const fr=mk(new THREE.BoxGeometry(2.0,.05,.85),lam('#ffffff'),20);fr.position.set(x,.025,z);grp.add(fr);for(let i=0;i<10;i++){const cx=x-.8+(i%5)*.4,cz=z-.2+Math.floor(i/5)*.4;const sl=mk(G('g2slot',()=>new THREE.BoxGeometry(.36,.02,.36)),lam('#f1f5f9'),0);sl.position.set(cx,.06,cz);grp.add(sl);
  if(i<n1+n2){const b=mk(G('g2ctr',()=>new THREE.CylinderGeometry(.15,.15,.07,22)),lam(i<n1?c1:c2),0);b.position.set(cx,.1,cz);grp.add(b);}}}
function numLine(grp,a,b,x0,x1,z,minor,major){const X=v=>x0+(v-a)/(b-a)*(x1-x0);const bar=mk(new THREE.BoxGeometry(x1-x0+.15,.05,.06),lam(INK),0);bar.position.set((x0+x1)/2,.05,z);grp.add(bar);
  for(let v=a;v<=b;v+=minor){const big=v%major===0;const t=mk(G('g2tk'+big,()=>new THREE.BoxGeometry(.015,.05,big?.22:.1)),lam(INK),0);t.position.set(X(v),.06,z);grp.add(t);if(big){const l=label(String(v),{size:.15,color:INK});l.position.set(X(v),.12,z+.3);grp.add(l);}}return X;}

/* =========================================================
   1. Numbers to 200
   ========================================================= */
P.lesson({id:'num200',title:'Hundreds, tens and ones',strand:'Number',codes:['B1.1'],
 guide:{goal:'Read, represent, compose and decompose whole numbers up to 200, and describe ways they are used in everyday life.',words:'hundred, ten, one, flat, rod, cube, compose, decompose',
  ask:['How many tens make one hundred?','How can you make 146 with blocks?','Can you show 146 another way?'],home:'Find numbers bigger than 100 at home: page numbers, prices, addresses. Say how many hundreds, tens and ones.'},
 learn:[{say:'Ten tens make a hundred!',speech:'Jayden snaps ten ones into a ten. Ten tens make a big flat: one hundred! Watch: one hundred, four tens and six ones make one hundred forty-six.',view:'model',demo:'build'},
        {say:'Read about place value.',speech:'In one hundred forty-six, the one means one hundred, the four means four tens, and the six means six ones. One hundred plus forty plus six.',view:'read'},
        {say:'Watch: break apart.',speech:'We can break the hundred into ten tens. Now there are fourteen tens and six ones. It is still one hundred forty-six!',view:'model',demo:'break'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: build a number!',speech:'Your turn! Add hundreds, tens and ones to build the number.',view:'model'}],
 fig:'A hundred flat, ten rods and one cubes.',rz:.35,
 explore:['Add *hundreds*, *tens* or *ones*.','*Break* a hundred or a ten apart.','Read the number!'],
 howTo:'Build the number with blocks.',
 init:k=>({h:1,t:4,o:6,need:null,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'*10 ones = 1 ten.  10 tens = 1 hundred.*')+16;
  const s=16;for(let i=0;i<10;i++)for(let j=0;j<10;j++){g.fillStyle='#2f7de1';g.fillRect(X0+20+i*s,y+j*s,s-2,s-2);}for(let k=0;k<4;k++)for(let j=0;j<10;j++){g.fillStyle='#5fd38a';g.fillRect(X0+210+k*24,y+j*s,s+4,s-2);}for(let i=0;i<6;i++){g.fillStyle='#ffc04d';g.fillRect(X0+330+(i%3)*24,y+110+Math.floor(i/3)*24,20,20);}
  T(g,'146',X0+470,y+90,ZS(80),acc());T(g,'= 100 + 40 + 6',X0+470,y+140,FT.bodyB);y+=190;
  [['hundreds','tens','ones'],['1','4','6']].forEach((r,j)=>r.forEach((v,i)=>{rr(g,X0+i*TW/3+6,y+j*60,TW/3-12,52,12);g.fillStyle=tint(['#2f7de1','#5fd38a','#ffc04d'][i],j?.12:.3);g.fill();T(g,v,X0+i*TW/3+TW/6,y+j*60+36,j?ZS(36):FT.bodyB,INK,'center');}));y+=136;
  y=para(p,y,'*Another way:* 146 = 14 tens and 6 ones.')+10;
  y=keyWords(p,y,[['hundred','10 tens'],['decompose','break a number into parts']]);
  predict(p,y,S,'p1','What number is 1 hundred, 2 tens and 9 ones?','*129!*');},
 readout(p,S,y){const g=p.g,st=S.st,n=st.h*100+st.t*10+st.o;T(g,String(n),X0,y+58,ZS(64),acc());T(g,st.h+' hundred'+(st.h===1?'':'s')+', '+st.t+' tens, '+st.o+' ones',X0+160,y+50,FT.bodyB);return y+72;},
 build(S,grp,mode,game){const st=S.st,s=.13;const g2=new THREE.Group();grp.add(g2);const mat=mk(new THREE.BoxGeometry(4.5,.03,2.6),lam('#fff7e0'),20);mat.position.set(0,.015,-1.75);grp.add(mat);
  [['hundreds',-1.45,'#2f7de1'],['tens',.35,'#16a36f'],['ones',1.65,'#d97706']].forEach(([t,x,c])=>{const l=label(t,{size:.16,color:c});l.position.set(x,.1,-.55);grp.add(l);});
  const big=label('',{size:.36,bg:'#ffffff'});big.position.set(.4,.95,-2.3);grp.add(big);
  function draw(){clearGroup(g2);for(let k=0;k<st.h;k++){const fl=mk(G('g2flat',()=>new THREE.BoxGeometry(10*s,s*.9,10*s)),[lam('#1d4ed8'),lam('#1d4ed8'),cellMat('#2f7de1',10,10),lam('#1d4ed8'),lam('#1d4ed8'),lam('#1d4ed8')],20);fl.position.set(-1.45,s/2+.03+k*s,-1.6);g2.add(fl);}
    for(let k=0;k<st.t;k++){const rod=mk(G('g2rod',()=>new THREE.BoxGeometry(s*.92,s*.92,10*s)),[lam('#16a36f'),lam('#16a36f'),cellMat('#5fd38a',1,10),lam('#16a36f'),lam('#16a36f'),lam('#16a36f')],20);rod.position.set(-.35+(k%10)*.16,s/2+.03+Math.floor(k/10)*s,-1.6);g2.add(rod);}
    for(let i=0;i<st.o;i++){const c=cube('#ffc04d',s);c.position.set(1.4+(i%4)*.17,s/2+.03,-2.2+Math.floor(i/4)*.17);g2.add(c);}big.userData.set(String(st.h*100+st.t*10+st.o));check();A.redraw();}
  function check(){if(mode==='play'&&!st.setup&&st.need&&st.need(st))game.solved(st.needOk(st));}
  const tot=()=>st.h*100+st.t*10+st.o;
  const add=(k,d)=>{const lim={h:2,t:20,o:19}[k];const v=st[k]+d;if(v<0||v>lim){A.bad(d>0?'Too many! Try a bigger block.':'There are none to take away.');return;}const old=st[k];st[k]=v;if(tot()>200){st[k]=old;A.bad('Let’s stay at 200 or less.');return;}A.pop();draw();A.say(String(tot()));};
  function brk(k){if(k==='h'){if(!st.h||st.t>10){A.bad('No hundred to break.');return;}st.h--;st.t+=10;}else{if(!st.t||st.o>9){A.bad('No ten to break.');return;}st.t--;st.o+=10;}A.pop();draw();A.say(st.h+' hundreds, '+st.t+' tens, '+st.o+' ones');}
  draw();
  return {info:()=>String(tot()),
    controls:()=>{const c=[{t:'+ hundred',fn:()=>add('h',1)},{t:'+ ten',go:true,fn:()=>add('t',1)},{t:'+ one',fn:()=>add('o',1)},{t:'− hundred',fn:()=>add('h',-1)},{t:'− ten',fn:()=>add('t',-1)},{t:'− one',fn:()=>add('o',-1)},{t:'Break a hundred',fn:()=>brk('h')},{t:'Break a ten',fn:()=>brk('t')}];if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);return c;},
    demo(n){if(n==='show'){st.h=1;st.t=4;st.o=6;draw();return;}st.ask=null;st.need=null;if(n==='build'){st.h=0;st.t=0;st.o=0;draw();const s2=[[500,()=>add('h',1)]];for(let i=0;i<4;i++)s2.push([350,()=>add('t',1)]);for(let i=0;i<6;i++)s2.push([250,()=>add('o',1)]);A.seq(s2);}if(n==='break'){st.h=1;st.t=4;st.o=6;draw();A.seq([[900,()=>brk('h')]]);}},
    task(r){st.setup=true;st.ask=null;st.need=null;st.h=0;st.t=0;st.o=0;let txt;
      if(r<2){const n=r?rnd(150,199):rnd(110,149);st.need=s=>tot()===n;st.needOk=()=>'Yes! You built '+n+'!';txt='Build *'+n+'*.';}
      else if(r===2){const n=rnd(52,98);st.need=s=>tot()===n;st.needOk=()=>'Yes! '+n+'!';txt='Build *'+n+'*.';}
      else if(r===3){const n=rnd(121,149);st.h=1;st.t=Math.floor((n-100)/10);st.o=n%10;st.need=s=>tot()===n&&s.h===0;st.needOk=s=>'Yes! '+s.t+' tens and '+s.o+' ones is also '+n+'!';txt='This is *'+n+'*. Show it *with no hundreds*. (Break the hundred!)';}
      else{st.h=1;st.t=0;st.o=8;st.ask={ans:'108',o:shuffle(['108','180','18']),ok:'Yes! 1 hundred, 0 tens, 8 ones = 108.'};txt='What number is *1 hundred, 0 tens and 8 ones*?';}
      draw();st.setup=false;return txt;}};}
});

/* =========================================================
   2. Comparing and ordering to 200
   ========================================================= */
P.lesson({id:'compare200',title:'Comparing and ordering to 200',strand:'Number',codes:['B1.2'],
 guide:{goal:'Compare and order whole numbers up to 200, in various contexts.',words:'greater than, less than, equal to, >, <, =, order, number line',
  ask:['Which is greater: 148 or 184? How do you know?','Where is 125 on the number line?','How do you order three numbers?'],home:'Compare prices on a flyer. Which is greater? Put three prices in order.'},
 learn:[{say:'Further right is greater.',speech:'On a number line, numbers get greater as you go right. Priya places one hundred forty-eight and one hundred eighty-four. One hundred eighty-four is further right, so it is greater!',view:'model',demo:'place'},
        {say:'Read about comparing.',speech:'Compare the hundreds first, then the tens, then the ones. One hundred forty-eight has four tens. One hundred eighty-four has eight tens. So one hundred eighty-four is greater than one hundred forty-eight.',view:'read'},
        {say:'Watch: put in order.',speech:'Let’s place three numbers: ninety-five, one hundred fifty, and one hundred five. In order from least to greatest: ninety-five, one hundred five, one hundred fifty.',view:'model',demo:'order'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: compare!',speech:'Your turn! Tap a number flag to answer.',view:'model'}],
 fig:'Number flags on a number line from 0 to 200.',rz:.35,
 explore:['*Tap a flag* to choose it.','Further right means *greater*.','Press *New numbers*.'],
 howTo:'Tap the flag the question asks for, or choose the answer.',
 init:k=>({nums:[148,184],want:null,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'Compare *hundreds* first, then *tens*, then *ones*.')+16;
  const ox=X0+20,w=TW-40,X=v=>ox+v/200*w,ly=y+80;g.strokeStyle=INK;g.lineWidth=4;g.beginPath();g.moveTo(ox,ly);g.lineTo(ox+w,ly);g.stroke();for(let v=0;v<=200;v+=25){g.beginPath();g.moveTo(X(v),ly-8);g.lineTo(X(v),ly+8);g.stroke();if(v%50===0)T(g,String(v),X(v),ly+36,FT.smallB,INK,'center');}
  [[148,'#2f7de1'],[184,'#ff6b35']].forEach(([v,c])=>{g.fillStyle=c;g.fillRect(X(v)-2,ly-60,4,60);rr(g,X(v)-34,ly-90,68,34,8);g.fill();T(g,String(v),X(v),ly-66,FT.smallB,'#fff','center');});y+=140;
  T(g,'184 > 148',X0+20,y+20,ZS(48),acc());T(g,'148 < 184',X0+380,y+20,ZS(48),acc());y+=60;
  y=para(p,y,'*>* means greater than. *<* means less than. The open side faces the greater number.')+10;
  y=keyWords(p,y,[['greater than (>)','more'],['less than (<)','fewer']]);
  predict(p,y,S,'p2','Order from least to greatest: 120, 102, 112.','*102, 112, 120.*');},
 readout(p,S,y){const g=p.g,st=S.st;const s=st.nums.slice().sort((a,b)=>a-b);T(g,st.nums.length===2?(s[1]+' > '+s[0]):s.join(' < '),X0,y+56,ZS(50),acc());return y+70;},
 build(S,grp,mode,game){const st=S.st;const X=numLine(grp,0,200,-2.1,2.1,-1.5,10,50);const g2=new THREE.Group();grp.add(g2);const cols=['#2f7de1','#ff6b35','#5fd38a'];
  function draw(){clearGroup(g2);st.nums.forEach((v,i)=>{const f=new THREE.Group();const pole=mk(new THREE.CylinderGeometry(.015,.015,.9+i*.3,8),lam(INK),0);pole.position.y=(.9+i*.3)/2;f.add(pole);const fl=mk(new THREE.BoxGeometry(.5,.25,.03),lam(cols[i]),0);fl.position.set(.25,.78+i*.3,0);f.add(fl);
      const l=label(String(v),{size:.2,color:'#ffffff'});l.position.set(.25,.78+i*.3,.03);f.add(l);f.position.set(X(v),.05,-1.5);g2.add(f);f.traverse(o=>{if(o.isMesh)A.drag(o,{tap:()=>tap(i)});});});A.redraw();}
  function tap(i){A.pop();A.say(String(st.nums[i]));if(mode==='play'&&!st.setup&&st.want){if(st.want(i))game.solved(st.wantOk);else A.bad('Which flag is further right?');}}
  draw();
  return {info:()=>st.nums.join(','),
    controls:()=>{const c=[{t:'New numbers',go:true,fn:()=>{st.nums=[rnd(10,199),rnd(10,199)];draw();}}];if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok);return c;},
    demo(n){st.ask=null;st.want=null;if(n==='place'){st.nums=[148,184];draw();}if(n==='order'){st.nums=[150,95,105];draw();A.say('95 < 105 < 150');}},
    task(r){st.setup=true;st.ask=null;st.want=null;let txt;
      if(r===0){const a=rnd(110,140),b=a+rnd(20,50);st.nums=shuffle([a,b]);const mx=Math.max(a,b);st.want=i=>st.nums[i]===mx;st.wantOk='Yes! '+mx+' is greater.';txt='Tap the *greater* number.';}
      else if(r===1){const a=rnd(160,190),b=rnd(60,99);st.nums=shuffle([a,b]);const mn=Math.min(a,b);st.want=i=>st.nums[i]===mn;st.wantOk='Yes! '+mn+' is less.';txt='Tap the number that is *less*.';}
      else if(r===2){st.nums=[148,184];st.ask={ans:'>',o:['>','<','='],ok:'Yes! 184 > 148.'};txt='*184 ___ 148*. Choose >, < or =.';}
      else if(r===3){st.nums=[120,102,112];st.ask={ans:'102, 112, 120',o:shuffle(['102, 112, 120','120, 112, 102','112, 102, 120']),ok:'Yes! Least to greatest.'};txt='Order from *least to greatest*.';}
      else{st.nums=[175,157,199];const mx=199;st.want=i=>st.nums[i]===mx;st.wantOk='Yes! 199 is the greatest.';txt='Tap the *greatest* of the three.';}
      draw();st.setup=false;return txt;}};}
});

/* =========================================================
   3. Estimating to 200
   ========================================================= */
P.lesson({id:'estimate200',title:'Estimate, then count to 200',strand:'Number',codes:['B1.3'],
 guide:{goal:'Estimate the number of objects in collections of up to 200, and verify estimates by counting.',words:'estimate, about, benchmark, group, count, check',
  ask:['How does a group of 10 help you estimate?','Is the jar closer to 50, 100 or 150?','How can you count fast to check?'],home:'Fill a bowl with dry beans. Count out 10 as a benchmark, then estimate the rest. Count by 10s to check!'},
 learn:[{say:'Use a benchmark!',speech:'Omar’s jar has lots of beads. First look at a benchmark: one small cup of ten beads. The jar looks like about twelve cups. So Omar’s estimate is about one hundred twenty! Now count by tens to check.',view:'model',demo:'count'},
        {say:'Read about benchmarks.',speech:'A benchmark is a group you know, like ten or fifty. Compare the big group to the benchmark to make a smart estimate. Then count in groups of ten to check.',view:'read'},
        {say:'Watch: a smaller jar.',speech:'This jar looks like about five groups of ten: about fifty. Let’s count: forty-seven. Very close!',view:'model',demo:'small'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: estimate!',speech:'Your turn! Estimate, then press Count to check.',view:'model'}],
 fig:'A jar of beads and a benchmark cup of ten.',rz:.35,
 explore:['Compare the jar with the *benchmark of 10*.','Press *Count* to make rows of 10.','Press *New jar*.'],
 howTo:'Choose a good estimate, then count to check.',
 init:k=>({n:118,counted:false,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'Use a *benchmark* you know, like *10*, to estimate a big group.')+16;
  for(let i=0;i<10;i++){g.beginPath();g.arc(X0+40+(i%5)*30,y+30+Math.floor(i/5)*30,12,0,Math.PI*2);g.fillStyle=COL[i%6];g.fill();}T(g,'10 beads',X0+100,y+110,FT.bodyB,INK,'center');
  for(let i=0;i<120;i++){g.beginPath();g.arc(X0+300+(i*41%380),y+16+(i*67%120),8,0,Math.PI*2);g.fillStyle=COL[i%6];g.fill();}T(g,'about 12 groups of 10 → about 120',X0+300,y+170,FT.bodyB,acc());y+=200;
  y=para(p,y,'*Check:* count by 10s: 10, 20, 30 … 110, then the ones: 111 … 118.')+10;
  y=keyWords(p,y,[['benchmark','a known amount to compare with'],['estimate','a smart guess']]);
  predict(p,y,S,'p3','The jar holds about 9 groups of 10. Estimate!','*About 90.*');},
 readout(p,S,y){const g=p.g,st=S.st;T(g,st.counted?'There are '+st.n+'!':'Estimate: about how many?',X0,y+52,ZS(44),acc());return y+66;},
 build(S,grp,mode,game){const st=S.st;const g2=new THREE.Group();grp.add(g2);
  const jar=mk(new THREE.CylinderGeometry(.75,.7,1.7,32,1,true),new THREE.MeshLambertMaterial({color:'#e0f2fe',transparent:true,opacity:.28,side:THREE.DoubleSide,depthWrite:false}),0);
  const cup=mk(new THREE.CylinderGeometry(.22,.18,.25,20,1,true),new THREE.MeshLambertMaterial({color:'#fde68a',transparent:true,opacity:.5,side:THREE.DoubleSide,depthWrite:false}),0);
  function rng(){let s=st.n*97+13;return ()=>{s=(s*16807)%2147483647;return s/2147483647;};}
  function draw(){clearGroup(g2);const R=rng();if(!st.counted){jar.position.set(-1.2,.87,-2.0);g2.add(jar);for(let i=0;i<st.n;i++){const a=R()*Math.PI*2,rad=Math.sqrt(R())*.6;const b=bead(COL[i%6],.07);b.position.set(-1.2+Math.cos(a)*rad,.09+Math.floor(i/30)*.13+R()*.08,-2.0+Math.sin(a)*rad);g2.add(b);}
      cup.position.set(1.5,.15,-1.2);g2.add(cup);for(let i=0;i<10;i++){const b=bead(COL[i%6],.07);b.position.set(1.5+((i%3)-1)*.1,.08+Math.floor(i/3)*.08,-1.2+((i%2)-.5)*.08);g2.add(b);}const cl=label('10',{size:.2,bg:'#ffffff'});cl.position.set(1.5,.55,-1.2);g2.add(cl);}
    else{for(let i=0;i<st.n;i++){const r=Math.floor(i/10),k=i%10;const b=bead(COL[r%6],.07);b.position.set(-2.05+(r%10)*.42+(k%2)*.16,.08,-2.8+Math.floor(k/2)*.17+Math.floor(r/10)*1.0);g2.add(b);}
      for(let r=0;r<Math.ceil(st.n/10);r++){const l=label(String(Math.min(st.n,(r+1)*10)),{size:.13,color:INK});l.position.set(-1.97+(r%10)*.42,.2,-1.95+Math.floor(r/10)*1.0);g2.add(l);}}A.redraw();}
  function count(){if(st.counted)return;st.counted=true;draw();A.pop();A.say('There are '+st.n+'!');}
  draw();
  return {info:()=>st.n+(st.counted?'c':''),
    controls:()=>{const c=[{t:'Count',go:true,fn:count},{t:'New jar',fn:()=>{st.n=rnd(30,195);st.counted=false;draw();}}];if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);return c;},
    demo(n){if(n==='jar'){st.n=118;st.counted=false;draw();return;}if(n==='countnow'){count();return;}st.ask=null;if(n==='count'){st.n=118;st.counted=false;draw();A.seq([[1800,count]]);}if(n==='small'){st.n=47;st.counted=false;draw();A.seq([[1400,count]]);}},
    task(r){st.setup=true;st.counted=false;let txt;
      if(r<3){const tg=[50,100,150][r];st.n=tg+rnd(-6,6);st.ask={ans:'About '+tg,o:['About 50','About 100','About 150'],ok:'Great estimate! There are '+st.n+'.'};txt='About how many beads? Use the *cup of 10* as a benchmark.';}
      else if(r===3){st.n=rnd(121,139);st.counted=true;st.ask={ans:String(st.n),o:shuffle([String(st.n),String(st.n+10),String(st.n-10)]),ok:'Yes! '+st.n+'.'};txt='Count the rows of 10. How many beads?';}
      else{st.n=80;st.counted=true;st.ask={ans:'8',o:shuffle(['8','10','80']),ok:'Yes! 8 groups of 10 = 80.'};txt='*80 beads*. How many *groups of 10*?';}
      draw();st.setup=false;return txt;}};}
});

/* =========================================================
   4. Skip counting to 200
   ========================================================= */
P.lesson({id:'count200',title:'Skip counting to 200',strand:'Number',codes:['B1.4'],
 guide:{goal:'Count to 200, including by 20s, 25s and 50s, using a variety of tools and strategies.',words:'skip count, by 20s, by 25s, by 50s, pattern, number line',
  ask:['What pattern do you see counting by 25s?','How is counting by 20s like counting by 2s?','Count by 50s to 200. How many jumps?'],home:'Count quarters: 25, 50, 75, 100! How many quarters make 200 cents?'},
 learn:[{say:'Big jumps!',speech:'Luna and the frog count by twenty-fives: twenty-five, fifty, seventy-five, one hundred, one hundred twenty-five, one hundred fifty, one hundred seventy-five, two hundred!',view:'model',demo:'by25'},
        {say:'Read about skip counting.',speech:'Counting by twenties is like counting by twos with a zero: twenty, forty, sixty, eighty. Counting by fifties: fifty, one hundred, one hundred fifty, two hundred.',view:'read'},
        {say:'Watch: count by 20s.',speech:'Now by twenties: twenty, forty, sixty, eighty, one hundred… all the way to two hundred.',view:'model',demo:'by20'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: hop and count!',speech:'Your turn! Pick a jump size and hop. Land on the number the question asks for.',view:'model'}],
 fig:'A frog hops by 20s, 25s and 50s to 200.',rz:.35,
 explore:['Pick a *jump*: 10, 20, 25 or 50.','Press *Hop* or *Hop back*.','Listen for the pattern!'],
 howTo:'Hop with the right jump size to land on the number.',
 init:k=>({pos:0,step:25,trail:[0],need:null,target:null,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'*Skip counting* adds the same jump each time.')+16;
  [['by 20s','20, 40, 60, 80, 100, 120 …'],['by 25s','25, 50, 75, 100, 125 …'],['by 50s','50, 100, 150, 200']].forEach(([a,b],i)=>{rr(g,X0,y+i*62,180,50,25);g.fillStyle=tint(acc(),.18);g.fill();T(g,a,X0+90,y+i*62+34,FT.bodyB,acc(),'center');T(g,b,X0+210,y+i*62+34,HAND(),INK);});y+=200;
  const ox=X0+20,w=TW-40,X=v=>ox+v/200*w,ly=y+80;g.strokeStyle=INK;g.lineWidth=4;g.beginPath();g.moveTo(ox,ly);g.lineTo(ox+w,ly);g.stroke();for(let v=0;v<=200;v+=25){g.beginPath();g.moveTo(X(v),ly-8);g.lineTo(X(v),ly+8);g.stroke();T(g,String(v),X(v),ly+34,FT.small,INK,'center');if(v<200){g.strokeStyle=COL[v/25%6];g.beginPath();g.moveTo(X(v),ly-8);g.quadraticCurveTo(X(v+12.5),ly-60,X(v+25),ly-8);g.stroke();g.strokeStyle=INK;}}y+=140;
  y=keyWords(p,y,[['skip count','count by jumps of the same size'],['pattern','what repeats in the numbers']]);
  predict(p,y,S,'p4','Count by 25s: 100, 125, ___, 175','*150!*');},
 readout(p,S,y){const g=p.g,st=S.st;T(g,'By '+st.step+'s',X0,y+30,FT.bodyB,acc());wrap(g,st.trail.slice(-9).join(', '),X0,y+76,TW,40,{font:ZS(36)});return y+110;},
 build(S,grp,mode,game){const st=S.st;const X=numLine(grp,0,200,-2.1,2.1,-1.5,5,25);const fg=frog();grp.add(fg);const tag=label('',{size:.26,bg:'#ffffff'});grp.add(tag);const pads=new THREE.Group();grp.add(pads);let busy=false;
  function place(){fg.position.set(X(st.pos),.06,-1.5);tag.userData.set(String(st.pos));tag.position.set(X(st.pos),.75,-1.5);clearGroup(pads);st.trail.slice(-12).forEach(v=>{const p=mk(G('g2pad',()=>new THREE.CylinderGeometry(.06,.06,.02,14)),lam('#2f9e5a'),0);p.position.set(X(v),.07,-1.62);pads.add(p);});A.redraw();}
  function jump(d){if(busy)return;const n=st.pos+d*st.step;if(n<0||n>200){A.bad(n<0?'Not below 0!':'The line stops at 200.');return;}busy=true;A.pop();hop(fg,V(X(n),.06,-1.5),.3+st.step/150,.4).then(()=>{busy=false;st.pos=n;st.trail.push(n);place();A.say(String(n));
      if(mode==='play'&&!st.setup&&st.target!=null&&st.pos===st.target){if(st.need==null||st.step===st.need)game.solved('Yes! '+st.target+'!');else A.bad('You landed, but hop by '+st.need+'s. Press Start over.');}});}
  function reset(at){st.pos=at;st.trail=[at];place();}
  place();
  return {info:()=>st.pos+'/'+st.step,
    controls:()=>{const c=[10,20,25,50].map(s=>({t:'by '+s,on:st.step===s,fn:()=>{st.step=s;A.redraw();}})).concat([{t:'Hop',go:true,fn:()=>jump(1)},{t:'Hop back',fn:()=>jump(-1)},{t:'Start over',fn:()=>reset(st.start||0)}]);if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok);return c;},
    demo(n){if(n==='reset'){A.stopSeq();busy=false;st.start=0;reset(0);return;}if(n==='j50'||n==='j20'){st.step=n==='j50'?50:20;busy=false;jump(1);return;}st.ask=null;st.target=null;st.need=null;st.start=0;reset(0);st.step=n==='by25'?25:20;const k=200/st.step;A.seq(Array.from({length:k},()=>[520,()=>jump(1)]));},
    task(r){st.setup=true;st.ask=null;st.target=null;st.need=null;st.start=0;let txt;
      if(r===0){st.need=25;st.target=pick([125,150,175]);txt='Count by *25s* from 0 to *'+st.target+'*.';}
      else if(r===1){st.need=20;st.target=pick([120,160,180]);txt='Count by *20s* from 0 to *'+st.target+'*.';}
      else if(r===2){st.need=50;st.target=200;txt='Count by *50s* to *200*.';}
      else if(r===3){st.step=25;st.ask={ans:'150',o:shuffle(['150','130','200']),ok:'Yes! +25 each time.'};txt='By 25s: 100, 125, ___, 175.';}
      else{st.ask={ans:'4',o:shuffle(['4','5','50']),ok:'Yes! 50, 100, 150, 200: 4 jumps.'};txt='How many jumps of *50* to get to *200*?';}
      reset(0);st.setup=false;return txt;}};}
});

/* =========================================================
   5. Even and odd
   ========================================================= */
P.lesson({id:'evenodd2',title:'Even and odd numbers',strand:'Number',codes:['B1.5'],
 guide:{goal:'Describe what makes a number even or odd.',words:'even, odd, pair, partner, left over, ones digit',
  ask:['How can partners show if a number is even?','Is 17 even or odd? How do you know?','What do you notice about the ones digit of even numbers?'],home:'Pair up socks or shoes. Is the number of socks even or odd?'},
 learn:[{say:'Make partners!',speech:'Can every counter have a partner? Theo makes eight counters into four pairs, with none left over. Eight is even! Now try seven: three pairs, and one is left over. Seven is odd.',view:'model',demo:'pair'},
        {say:'Read about even and odd.',speech:'An even number can be split into pairs with none left over. An odd number always has one left over. Even numbers end in zero, two, four, six or eight. Odd numbers end in one, three, five, seven or nine.',view:'read'},
        {say:'Watch: a big number.',speech:'Is twenty-six even? Look at the ones digit: six. Six is even, so twenty-six is even!',view:'model',demo:'big'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: even or odd?',speech:'Your turn! Change the number and press Pair up.',view:'model'}],
 fig:'Counters lined up in pairs.',rz:.35,
 explore:['Change the *number*.','Press *Pair up*.','Is one left over?'],
 howTo:'Pair up the counters, then choose even or odd.',
 init:k=>({n:8,paired:true,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'*Even:* every one has a partner. *Odd:* one is left over.')+16;
  [[8,'8 is even'],[7,'7 is odd']].forEach(([n,t],j)=>{for(let i=0;i<n;i++){g.beginPath();g.arc(X0+40+Math.floor(i/2)*60,y+30+(i%2)*50+j*150,20,0,Math.PI*2);g.fillStyle=n%2&&i===n-1?'#ff6b35':'#2f7de1';g.fill();}T(g,t,X0+340,y+65+j*150,FT.bodyB,acc());});y+=300;
  rr(g,X0,y,TW,110,18);g.fillStyle=tint(acc(),.12);g.fill();T(g,'Even ends in 0, 2, 4, 6, 8',X0+20,y+42,FT.bodyB,'#2563eb');T(g,'Odd ends in 1, 3, 5, 7, 9',X0+20,y+88,FT.bodyB,'#c2410c');y+=130;
  y=keyWords(p,y,[['even','pairs with none left over'],['odd','one is left over']]);
  predict(p,y,S,'p5','Is 15 even or odd?','*Odd!* It ends in 5.');},
 readout(p,S,y){const g=p.g,st=S.st;T(g,st.n+' is '+(st.n%2?'odd':'even'),X0,y+56,ZS(56),st.n%2?'#c2410c':'#2563eb');T(g,Math.floor(st.n/2)+' pairs'+(st.n%2?', 1 left over':''),X0+330,y+50,FT.bodyB);return y+70;},
 build(S,grp,mode,game){const st=S.st;const g2=new THREE.Group();grp.add(g2);const big=label('',{size:.4,bg:'#ffffff'});big.position.set(0,1.3,-2.8);grp.add(big);
  function draw(){clearGroup(g2);for(let i=0;i<st.n;i++){const odd=st.n%2&&i===st.n-1;let x,z;if(st.paired){x=-2.0+Math.floor(i/2)*.36;z=-1.9+(i%2)*.4;if(odd)z=-1.7;}else{x=-2.0+(i%10)*.42;z=-2.4+Math.floor(i/10)*.42;}
      const c=mk(G('g2eo',()=>new THREE.CylinderGeometry(.14,.14,.08,20)),lam(st.paired&&odd?'#ff6b35':'#2f7de1'),0);c.position.set(x,.06,z);g2.add(c);}
    if(st.paired&&st.n%2){const l=label('left over!',{size:.17,color:'#c2410c'});l.position.set(-2.0+Math.floor((st.n-1)/2)*.36,.4,-1.2);g2.add(l);}big.userData.set(st.n+(st.paired?(st.n%2?' odd':' even'):''));A.redraw();}
  draw();
  return {info:()=>String(st.n),
    controls:()=>{const c=[{t:'Pair up',go:true,fn:()=>{st.paired=true;A.pop();draw();A.say(st.n+' is '+(st.n%2?'odd':'even'));}},{t:'number +',fn:()=>{st.n=Math.min(24,st.n+1);st.paired=false;draw();}},{t:'number −',fn:()=>{st.n=Math.max(1,st.n-1);st.paired=false;draw();}}];if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);return c;},
    demo(n){if(n==='show8'){st.n=8;st.paired=true;draw();return;}if(n==='show7'){st.n=7;st.paired=true;draw();return;}st.ask=null;if(n==='pair'){st.n=8;st.paired=false;draw();A.seq([[800,()=>{st.paired=true;draw();A.say('8 is even');}],[1300,()=>{st.n=7;st.paired=false;draw();}],[800,()=>{st.paired=true;draw();A.say('7 is odd');}]]);}if(n==='big'){st.n=24;st.paired=true;draw();A.say('26 ends in 6: even!');}},
    task(r){st.setup=true;st.paired=false;let txt;const O=['Even','Odd'];
      if(r<3){st.n=[rnd(5,9)*2,rnd(4,9)*2+1,rnd(6,11)*2+1][r];const a=st.n%2?'Odd':'Even';st.ask={ans:a,o:O,ok:'Yes! '+st.n+' is '+a.toLowerCase()+'.'};txt='Is *'+st.n+'* even or odd? Press *Pair up* to check.';}
      else if(r===3){st.n=10;st.ask={ans:'Even',o:O,ok:'Yes! 136 ends in 6.'};txt='Is *136* even or odd? (Look at the ones digit!)';}
      else{st.n=9;st.ask={ans:'Odd',o:O,ok:'Yes! 89 ends in 9.'};txt='Is *89* even or odd?';}
      draw();st.setup=false;return txt;}};}
});

/* =========================================================
   6. Fair shares with 2, 3, 4 and 6 sharers
   ========================================================= */
P.lesson({id:'share2',title:'Fair shares and thirds',strand:'Number',codes:['B1.6','B1.7'],
 guide:{goal:'Represent, solve and compare fair-share problems sharing up to 10 items among 2, 3, 4 and 6 sharers, including whole and mixed-number results, and recognize that one third and two sixths are equal.',words:'fair share, equal, left over, half, third, fourth, sixth, mixed number',
  ask:['How do you share 7 muffins among 2 friends?','Is 1 third the same as 2 sixths?','Who gets more: 3 sharers or 6 sharers of the same pizza?'],home:'Share 10 crackers among 3 people. What can you do with the leftover cracker?'},
 learn:[{say:'Share, then cut the leftover.',speech:'Ayo has seven muffins for two friends. Each gets three, and one is left over. Cut it in half! Each friend gets three and one half muffins.',view:'model',demo:'deal'},
        {say:'Read about thirds and sixths.',speech:'Cut a pizza into three equal parts: each is one third. Cut it into six parts: each is one sixth. Two sixths cover the same amount as one third!',view:'read'},
        {say:'Watch: 1 third = 2 sixths.',speech:'Look at the pizzas. One third of the first pizza is the same size as two sixths of the second pizza.',view:'model',demo:'pizza'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: share fairly!',speech:'Your turn! Choose the number of friends, share, then cut the leftovers.',view:'model'}],
 fig:'Muffins shared onto plates; leftovers cut into equal parts.',rz:.35,
 explore:['Choose *2, 3, 4 or 6* friends.','Press *Share*.','Press *Cut leftovers*.'],
 howTo:'Share fairly, then choose the answer.',
 init:k=>({n:7,k:2,dealt:false,cut:false,view:'share',ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'*Share* the whole items first. Then *cut* the leftovers into equal parts.')+16;
  T(g,'7 muffins, 2 friends: 3 and 1 half each',X0,y+20,FT.bodyB,acc());y+=40;
  for(let f=0;f<2;f++){for(let i=0;i<3;i++){g.beginPath();g.arc(X0+50+f*360+i*60,y+50,24,0,Math.PI*2);g.fillStyle='#c2410c';g.fill();}g.beginPath();g.arc(X0+230+f*360,y+50,24,Math.PI/2,Math.PI*1.5);g.closePath();g.fillStyle='#fb923c';g.fill();}y+=110;
  const pz=(cx,n,shade)=>{for(let i=0;i<n;i++){g.beginPath();g.moveTo(cx,y+90);g.arc(cx,y+90,80,i*2*Math.PI/n-Math.PI/2,(i+1)*2*Math.PI/n-Math.PI/2);g.closePath();g.fillStyle=i<shade?'#ffc04d':'#fff3d1';g.fill();g.strokeStyle='#b45309';g.lineWidth=3;g.stroke();}};
  pz(X0+120,3,1);pz(X0+420,6,2);T(g,'1 third',X0+120,y+200,FT.bodyB,INK,'center');T(g,'=',X0+270,y+100,ZS(60),acc(),'center');T(g,'2 sixths',X0+420,y+200,FT.bodyB,INK,'center');y+=230;
  y=keyWords(p,y,[['third','one of 3 equal parts'],['sixth','one of 6 equal parts']]);
  predict(p,y,S,'p6','Share 10 cookies among 4 friends. How much each?','*2 and 1 half each.* 2 left over, cut in halves.');},
 readout(p,S,y){const g=p.g,st=S.st;if(st.view==='pizza'){T(g,'1 third = 2 sixths',X0,y+54,ZS(46),acc());return y+70;}const e=Math.floor(st.n/st.k),l=st.n%st.k;const f=l?(l===st.k/2?'1 half':l+'/'+st.k):'';T(g,st.n+' among '+st.k+':  '+(st.cut&&l?e+' and '+f:e+(l?', '+l+' left':''))+' each',X0,y+54,ZS(38),acc());return y+70;},
 build(S,grp,mode,game){const st=S.st;const g2=new THREE.Group();grp.add(g2);
  function muffin(part,of){const g=new THREE.Group();const geo=part?new THREE.CylinderGeometry(.13,.1,.14,20,1,false,0,Math.PI*2*part/of):G('g2mf',()=>new THREE.CylinderGeometry(.13,.1,.14,20));const b=mk(geo,lam('#c2410c'),0);b.position.y=.07;g.add(b);if(!part){const t=mk(G('g2mt',()=>new THREE.SphereGeometry(.13,14,8,0,Math.PI*2,0,Math.PI/2)),lam('#fb923c'),0);t.position.y=.14;g.add(t);}return g;}
  function spots(){const k=st.k;return Array.from({length:k},(_,i)=>{const a=Math.PI*(1+i/(k-1||1));return [Math.cos(a)*1.6,-1.6+Math.sin(a)*1.1];});}
  function draw(){clearGroup(g2);if(st.view==='pizza'){[[3,1,-1.1],[6,2,1.1]].forEach(([n,sh,x])=>{for(let i=0;i<n;i++){const w=mk(wedgeGeo(.85,i<sh?.12:.06,i*2*Math.PI/n+.02,(i+1)*2*Math.PI/n-.02),lam(i<sh?'#ffc04d':'#fff3d1'),20);w.position.set(x,.02,-1.9);g2.add(w);}const l=label(n===3?'1 third':'2 sixths',{size:.22,bg:'#ffffff'});l.position.set(x,.4,-.85);g2.add(l);});const eq=label('=',{size:.5,color:acc()});eq.position.set(0,.3,-1.9);g2.add(eq);A.redraw();return;}
    const sp=spots(),e=Math.floor(st.n/st.k),l=st.n%st.k;sp.forEach(([x,z])=>{const p=plate();p.position.set(x,.03,z);g2.add(p);});const ctr=plate('#f1f5f9');ctr.position.set(0,.03,-.9);g2.add(ctr);
    if(!st.dealt){for(let i=0;i<st.n;i++){const m=muffin();m.position.set(((i%5)-2)*.28,.06,-.9+(Math.floor(i/5)-.5)*.25);g2.add(m);}}
    else{sp.forEach(([x,z])=>{for(let i=0;i<e;i++){const m=muffin();m.position.set(x+((i%2)-.5)*.26,.06+Math.floor(i/4)*.14,z+(Math.floor(i/2)%2-.5)*.24);g2.add(m);}if(st.cut&&l){for(let j=0;j<l;j++){const piece=muffin(1,st.k);piece.position.set(x+.25,.06+j*.15,z+.2);g2.add(piece);}}});
      if(!st.cut)for(let i=0;i<l;i++){const m=muffin();m.position.set((i-(l-1)/2)*.3,.06,-.9);g2.add(m);}}A.redraw();}
  function share(){st.view='share';st.dealt=true;st.cut=false;A.pop();draw();const l=st.n%st.k;A.say(Math.floor(st.n/st.k)+' each'+(l?', '+l+' left over':'!'));}
  function cut(){if(!st.dealt){share();}const l=st.n%st.k;if(!l){A.bad('Nothing left over to cut!');return;}st.cut=true;A.pop();draw();A.say('Cut each leftover into '+st.k+' equal parts!');}
  draw();
  return {info:()=>st.n+'/'+st.k,
    controls:()=>{const c=[2,3,4,6].map(k=>({t:k+' friends',on:st.k===k,fn:()=>{st.k=k;st.dealt=false;st.cut=false;st.view='share';draw();}})).concat([{t:'Share',go:true,fn:share},{t:'Cut leftovers',fn:cut},{t:'muffins +',fn:()=>{st.n=Math.min(10,st.n+1);st.dealt=false;st.cut=false;draw();}},{t:'muffins −',fn:()=>{st.n=Math.max(2,st.n-1);st.dealt=false;st.cut=false;draw();}},{t:'Pizzas',fn:()=>{st.view=st.view==='pizza'?'share':'pizza';draw();}}]);
      if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c.slice(4,6));return c;},
    demo(n){if(n==='reset7'){st.view='share';st.n=7;st.k=2;st.dealt=false;st.cut=false;draw();return;}if(n==='sharenow'){share();return;}if(n==='cutnow'){cut();return;}st.ask=null;if(n==='deal'){st.view='share';st.n=7;st.k=2;st.dealt=false;st.cut=false;draw();A.seq([[800,share],[1300,cut]]);}if(n==='pizza'){st.view='pizza';draw();}},
    task(r){st.setup=true;st.view='share';st.dealt=false;st.cut=false;let txt;
      if(r===0){st.n=7;st.k=2;st.ask={ans:'3 and 1 half',o:shuffle(['3 and 1 half','3','4 and 1 half']),ok:'Yes! 3 each, and the leftover is cut in half.'};txt='Share *7 muffins* among *2 friends*. How much does each get?';}
      else if(r===1){st.n=9;st.k=3;st.ask={ans:'3',o:shuffle(['3','4','2']),ok:'Yes! 9 shares evenly into 3 groups of 3.'};txt='Share *9 muffins* among *3 friends*.';}
      else if(r===2){st.n=10;st.k=4;st.ask={ans:'2 and 1 half',o:shuffle(['2 and 1 half','2','3']),ok:'Yes! 2 each, then 2 leftovers cut in halves.'};txt='Share *10 muffins* among *4 friends*.';}
      else if(r===3){st.n=6;st.k=6;st.ask={ans:'1',o:shuffle(['1','6','2']),ok:'Yes! 6 muffins, 6 friends: 1 each.'};txt='Share *6 muffins* among *6 friends*.';}
      else{st.view='pizza';st.ask={ans:'The same',o:['The same','1 third is more','2 sixths is more'],ok:'Yes! 1 third = 2 sixths.'};txt='Compare *1 third* and *2 sixths* of the same pizza.';}
      draw();st.setup=false;return txt;}};}
});

/* =========================================================
   7. Addition and subtraction facts to 20
   ========================================================= */
P.lesson({id:'facts20',title:'Facts to 20',strand:'Number',codes:['B2.2'],
 guide:{goal:'Recall and demonstrate addition facts for numbers up to 20, and related subtraction facts.',words:'add, subtract, fact, double, make ten, related fact, fact family',
  ask:['How does 10 help you add 8 + 7?','If 9 + 6 = 15, what is 15 − 6?','Which facts do you know by heart?'],home:'Play a card game: flip two cards and add them. Say the related subtraction fact too!'},
 learn:[{say:'Two ten frames!',speech:'Jayden adds eight plus seven. The first ten frame has eight. Move two over to fill it: ten. Five are left: ten plus five is fifteen!',view:'model',demo:'add'},
        {say:'Read about related facts.',speech:'If eight plus seven is fifteen, then fifteen minus seven is eight, and fifteen minus eight is seven. Related facts use the same three numbers.',view:'read'},
        {say:'Watch: take away.',speech:'Fifteen counters. Take away seven. Eight are left. Fifteen minus seven equals eight.',view:'model',demo:'sub'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: make the fact!',speech:'Your turn! Build the fact on the ten frames.',view:'model'}],
 fig:'Two ten frames with counters.',rz:.35,
 explore:['Add *orange* and *yellow* counters.','Press *Take away yellow*.','Fill the first ten frame first!'],
 howTo:'Build the fact, or choose the answer.',
 init:k=>({a:8,b:7,sub:false,need:null,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'Use *two ten frames* to add and subtract to 20.')+16;
  const s=44;for(let f=0;f<2;f++)for(let i=0;i<10;i++){const x=X0+f*250+(i%5)*s,yy=y+Math.floor(i/5)*s;g.strokeStyle='#94a3b8';g.lineWidth=2;g.strokeRect(x,yy,s,s);const k=f*10+i;if(k<15){g.beginPath();g.arc(x+s/2,yy+s/2,16,0,Math.PI*2);g.fillStyle=k<8?'#ff6b35':'#ffc04d';g.fill();}}
  T(g,'8 + 7 = 15',X0+540,y+56,ZS(44),acc());y+=120;
  rr(g,X0,y,TW,150,18);g.fillStyle=tint(acc(),.12);g.fill();T(g,'Fact family: 8, 7, 15',X0+20,y+36,FT.bodyB,acc());T(g,'8 + 7 = 15      7 + 8 = 15',X0+20,y+80,HAND());T(g,'15 − 7 = 8      15 − 8 = 7',X0+20,y+124,HAND());y+=172;
  y=keyWords(p,y,[['related facts','facts that use the same three numbers'],['make ten','fill a ten frame first']]);
  predict(p,y,S,'p7','If 9 + 5 = 14, what is 14 − 5?','*9!*');},
 readout(p,S,y){const g=p.g,st=S.st;T(g,st.sub?(st.a+st.b)+' − '+st.b+' = '+st.a:st.a+' + '+st.b+' = '+(st.a+st.b),X0,y+58,ZS(60),acc());return y+72;},
 build(S,grp,mode,game){const st=S.st;const g2=new THREE.Group();grp.add(g2);
  function draw(){clearGroup(g2);const tot=st.a+st.b,show=st.sub?st.a:tot;const n1=Math.min(10,show),n2=show-n1;const a1=Math.min(st.a,10);tenFrame(g2,-1.15,-2.0,a1,n1-a1,'#ff6b35','#ffc04d');tenFrame(g2,1.15,-2.0,Math.max(0,st.a-10),n2-Math.max(0,st.a-10),'#ff6b35','#ffc04d');
    const l=label(st.sub?tot+' − '+st.b+' = '+st.a:st.a+' + '+st.b+' = '+tot,{size:.34,bg:'#ffffff'});l.position.set(0,.9,-2.8);g2.add(l);if(mode==='play'&&!st.setup&&st.need&&!st.sub&&st.a===st.need[0]&&st.b===st.need[1])game.solved('Yes! '+st.a+' + '+st.b+' = '+tot+'!');A.redraw();}
  const add=(k,d)=>{st.sub=false;const v=st[k]+d;if(v<0)return;if(d>0&&st.a+st.b>=20){A.bad('Both ten frames are full!');return;}st[k]=v;A.pop();draw();};
  draw();
  return {info:()=>st.a+'+'+st.b,
    controls:()=>{const c=[{t:'+ orange',fn:()=>add('a',1)},{t:'− orange',fn:()=>add('a',-1)},{t:'+ yellow',go:true,fn:()=>add('b',1)},{t:'− yellow',fn:()=>add('b',-1)},{t:'Take away yellow',fn:()=>{st.sub=!st.sub;A.pop();draw();}}];if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);return c;},
    demo(n){if(n==='subnow'){st.a=8;st.b=7;st.sub=true;draw();return;}st.ask=null;st.need=null;st.sub=false;st.a=8;st.b=7;draw();if(n==='sub')A.seq([[1000,()=>{st.sub=true;draw();A.say('15 − 7 = 8');}]]);},
    task(r){st.setup=true;st.ask=null;st.need=null;st.sub=false;st.a=0;st.b=0;let txt;
      if(r===0){st.need=[rnd(7,9),rnd(5,9)];txt='Build *'+st.need[0]+' + '+st.need[1]+'*.';}
      else if(r===1){const a=rnd(6,9),b=rnd(6,9);st.a=a;st.b=b;st.ask={ans:String(a+b),o:shuffle([String(a+b),String(a+b+1),String(a+b-2)]),ok:'Yes! '+a+' + '+b+' = '+(a+b)+'.'};txt='What is *'+a+' + '+b+'*?';}
      else if(r===2){const a=rnd(6,9),b=rnd(5,8);st.a=a;st.b=b;st.sub=true;st.ask={ans:String(a),o:shuffle([String(a),String(b),String(a+b)]),ok:'Yes! '+(a+b)+' − '+b+' = '+a+'.'};txt='What is *'+(a+b)+' − '+b+'*?';}
      else if(r===3){st.a=9;st.b=6;st.ask={ans:'15 − 6 = 9',o:shuffle(['15 − 6 = 9','9 − 6 = 3','15 + 6 = 21']),ok:'Yes! Same three numbers.'};txt='Which fact is *related* to *9 + 6 = 15*?';}
      else{st.a=10;st.b=10;st.ask={ans:'20',o:shuffle(['20','10','100']),ok:'Yes! Double 10 is 20.'};txt='What is *10 + 10*?';}
      draw();st.setup=false;return txt;}};}
});

/* =========================================================
   8. Mental math to 50
   ========================================================= */
P.lesson({id:'mental50',title:'Mental math strategies',strand:'Number',codes:['B2.3'],
 guide:{goal:'Use mental math strategies, including estimation, to add and subtract whole numbers that add up to no more than 50, and explain the strategies used.',words:'jump by tens, add 10 then take 1, split, estimate, strategy',
  ask:['How can adding 10 help you add 9?','How do you add 24 + 13 in your head?','Is 28 + 19 closer to 40 or 50?'],home:'Add prices in your head: 19¢ + 15¢. Explain how you did it!'},
 learn:[{say:'Add 10, then take 1.',speech:'Priya adds twenty-six plus nine. Nine is almost ten! Jump ten to thirty-six, then back one to thirty-five. Twenty-six plus nine is thirty-five.',view:'model',demo:'nine'},
        {say:'Read about strategies.',speech:'To add twenty-four plus thirteen, add the tens: twenty-four plus ten is thirty-four. Then add the ones: thirty-four plus three is thirty-seven. To estimate, round to the nearest ten.',view:'read'},
        {say:'Watch: jump by tens.',speech:'Forty-five minus twenty-two. Jump back two tens: thirty-five, twenty-five. Then back two ones: twenty-three.',view:'model',demo:'sub'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: jump!',speech:'Your turn! Use jumps of ten and one to find the answer.',view:'model'}],
 fig:'Jumps of 10 and 1 on a number line to 50.',rz:.35,
 explore:['Jump *+10*, *+1*, *−10* or *−1*.','*Start* goes back.','Try “add 10, take 1”.'],
 howTo:'Jump to the answer, or choose it.',
 init:k=>({start:26,pos:26,target:null,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'*Mental math* means solving in your head with smart strategies.')+16;
  [['Add 9: add 10, take 1','26 + 9 = 36 − 1 = 35'],['Split the tens and ones','24 + 13 = 34 + 3 = 37'],['Jump back by tens','45 − 22 = 25 − 2 = 23'],['Estimate: round','28 + 19 is about 30 + 20 = 50']].forEach(([a,b],i)=>{rr(g,X0,y+i*84,TW,76,14);g.fillStyle=tint(COL[i+1],.18);g.fill();T(g,a,X0+18,y+i*84+32,FT.bodyB,INK);T(g,b,X0+18,y+i*84+62,HAND(),acc());});y+=352;
  y=keyWords(p,y,[['strategy','a smart way to solve'],['estimate','a close answer from rounding']]);
  predict(p,y,S,'p8','What is 33 + 9?','*42.* 43 − 1.');},
 readout(p,S,y){const g=p.g,st=S.st;const d=st.pos-st.start;T(g,st.start+(d>=0?' + '+d:' − '+(-d))+' = '+st.pos,X0,y+56,ZS(54),acc());return y+70;},
 build(S,grp,mode,game){const st=S.st;const X=numLine(grp,0,50,-2.1,2.1,-1.6,1,10);const fg=frog();grp.add(fg);const big=label('',{size:.32,bg:'#ffffff'});big.position.set(0,1.1,-2.6);grp.add(big);let busy=Promise.resolve();
  function place(){fg.position.set(X(st.pos),.08,-1.6);big.userData.set(String(st.pos));A.redraw();}
  function hopBy(d){busy=busy.then(()=>{const n=st.pos+d;if(n<0||n>50){A.bad('The line stops there!');return;}return hop(fg,V(X(n),.08,-1.6),Math.abs(d)>=10?.6:.25,Math.abs(d)>=10?.5:.25).then(()=>{st.pos=n;big.userData.set(String(n));A.pop();A.say(String(n));A.redraw();if(mode==='play'&&!st.setup&&st.target!=null&&st.pos===st.target)game.solved('Yes! '+n+'!');});});}
  place();
  return {info:()=>String(st.pos),
    controls:()=>{const c=[{t:'+10',go:true,fn:()=>hopBy(10)},{t:'+1',fn:()=>hopBy(1)},{t:'−10',fn:()=>hopBy(-10)},{t:'−1',fn:()=>hopBy(-1)},{t:'Start',fn:()=>{st.pos=st.start;place();}}];if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);return c;},
    demo(n){if(n==='start26'||n==='start24'){A.stopSeq();busy=Promise.resolve();st.start=st.pos=n==='start26'?26:24;place();return;}if(n==='h10'){hopBy(10);return;}if(n==='hm1'){hopBy(-1);return;}if(n==='h3'){hopBy(1);hopBy(1);hopBy(1);return;}st.ask=null;st.target=null;if(n==='nine'){st.start=26;st.pos=26;place();A.seq([[700,()=>hopBy(10)],[800,()=>hopBy(-1)]]);}if(n==='sub'){st.start=45;st.pos=45;place();A.seq([[700,()=>hopBy(-10)],[700,()=>hopBy(-10)],[700,()=>hopBy(-1)],[400,()=>hopBy(-1)]]);}},
    task(r){st.setup=true;st.ask=null;st.target=null;let txt;
      if(r===0){const a=rnd(14,38);st.start=a;st.target=a+9;txt='Find *'+a+' + 9*. Try +10, then −1!';}
      else if(r===1){const a=rnd(12,25),b=rnd(11,19);st.start=a;st.target=a+b;txt='Find *'+a+' + '+b+'*. Jump the ten, then the ones.';}
      else if(r===2){const a=rnd(38,49),b=rnd(21,29);st.start=a;st.target=a-b;txt='Find *'+a+' − '+b+'*.';}
      else if(r===3){st.start=28;st.ask={ans:'About 50',o:['About 30','About 40','About 50'],ok:'Yes! 30 + 20 = 50.'};txt='*Estimate* 28 + 19.';}
      else{st.start=33;st.ask={ans:'42',o:shuffle(['42','43','32']),ok:'Yes! 33 + 10 − 1 = 42.'};txt='What is *33 + 9*?';}
      st.pos=st.start;place();st.setup=false;return txt;}};}
});

/* =========================================================
   9. Adding and subtracting to 100
   ========================================================= */
P.lesson({id:'addsub100',title:'Adding and subtracting to 100',strand:'Number',codes:['B2.4'],
 guide:{goal:'Use objects, diagrams and equations to represent, describe and solve addition and subtraction situations with whole numbers that add up to no more than 100.',words:'add, subtract, regroup, trade, tens, ones, equation, story',
  ask:['When do you need to trade 10 ones for a ten?','How do you subtract 52 − 27 with blocks?','What equation matches the story?'],home:'Make up a story with numbers up to 100, like “47 stickers and 35 more”. Solve it with drawings.'},
 learn:[{say:'Put the blocks together.',speech:'Omar has forty-seven stickers and gets thirty-five more. Push the blocks together: seven tens and twelve ones. Twelve ones is too many! Trade ten ones for one ten. Now eight tens and two ones: eighty-two!',view:'model',demo:'add'},
        {say:'Read about subtracting.',speech:'Fifty-two take away twenty-seven. There are not enough ones to take seven. Trade one ten for ten ones. Now take away two tens and seven ones. Twenty-five are left.',view:'read'},
        {say:'Watch: trade a ten.',speech:'Watch the ten break into ten ones. Then take away. Fifty-two minus twenty-seven is twenty-five.',view:'model',demo:'sub'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: solve the story!',speech:'Your turn! Use the blocks to solve the story.',view:'model'}],
 fig:'Tens rods and ones cubes being combined and traded.',rz:.35,
 explore:['Press *Combine* or *Take away*.','Press *Trade* to swap 10 ones and a ten.','Read the equation!'],
 howTo:'Solve with the blocks, then choose the answer.',
 init:k=>({a:47,b:35,op:'+',stage:0,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'When you have *10 or more ones*, *trade* them for a ten.')+16;
  const rods=(x,n,c)=>{for(let k=0;k<Math.floor(n/10);k++){g.fillStyle=c;g.fillRect(x+k*22,y,18,150);}for(let i=0;i<n%10;i++){g.fillStyle=tint(c,.4);g.fillRect(x+Math.floor(n/10)*22+6+(i%2)*20,y+130-Math.floor(i/2)*20,16,16);}};
  rods(X0,47,'#2f7de1');T(g,'+',X0+190,y+80,ZS(50),INK);rods(X0+230,35,'#ff6b35');T(g,'= 82',X0+420,y+90,ZS(60),acc());y+=180;
  rr(g,X0,y,TW,140,18);g.fillStyle=tint(acc(),.12);g.fill();T(g,'47 + 35:  7 tens + 12 ones',X0+20,y+40,FT.bodyB);T(g,'trade 10 ones → 8 tens + 2 ones = 82',X0+20,y+84,FT.bodyB,acc());T(g,'52 − 27 = 25',X0+20,y+126,FT.bodyB);y+=162;
  y=keyWords(p,y,[['trade (regroup)','swap 10 ones for 1 ten, or 1 ten for 10 ones'],['equation','a number sentence like 47 + 35 = 82']]);
  predict(p,y,S,'p9','36 + 28 = ?','*64.* 5 tens + 14 ones → 6 tens + 4 ones.');},
 readout(p,S,y){const g=p.g,st=S.st;const r=st.op==='+'?st.a+st.b:st.a-st.b;T(g,st.a+' '+st.op.replace('-','−')+' '+st.b+' = '+(st.stage>=2?r:'?'),X0,y+56,ZS(54),acc());return y+70;},
 build(S,grp,mode,game){const st=S.st,s=.13;const g2=new THREE.Group();grp.add(g2);
  function grpBlocks(t,o,x,z,col){for(let k=0;k<t;k++){const rod=mk(G('g2rod2'+col,()=>new THREE.BoxGeometry(s*.92,s*.92,10*s)),lam(col),20);rod.position.set(x+k*.16,s/2+.03,z);g2.add(rod);}for(let i=0;i<o;i++){const c=cube(tint(col,.35),s);c.position.set(x+t*.16+.1+(i%4)*.16,s/2+.03,z-.55+Math.floor(i/4)*.16);g2.add(c);}}
  function draw(){clearGroup(g2);const at=Math.floor(st.a/10),ao=st.a%10,bt=Math.floor(st.b/10),bo=st.b%10;
    if(st.op==='+'){if(st.stage===0){grpBlocks(at,ao,-2.0,-1.9,'#2f7de1');grpBlocks(bt,bo,.3,-1.9,'#ff6b35');}else{const t=at+bt,o=ao+bo;if(st.stage===1)grpBlocks(t,o,-1.6,-1.9,'#8b5cf6');else grpBlocks(t+Math.floor(o/10),o%10,-1.6,-1.9,'#8b5cf6');}}
    else{let t=at,o=ao;if(st.stage>=1&&ao<bo){t--;o+=10;}if(st.stage>=2){t-=bt;o-=bo;}grpBlocks(t,o,-1.6,-1.9,'#2f7de1');if(st.stage===1){const l=label('take away '+st.b,{size:.2,color:'#c2410c'});l.position.set(1.4,.4,-1.0);g2.add(l);}}
    const eq=label(st.a+' '+st.op.replace('-','−')+' '+st.b+(st.stage>=2?' = '+(st.op==='+'?st.a+st.b:st.a-st.b):''),{size:.32,bg:'#ffffff'});eq.position.set(0,1.1,-2.8);g2.add(eq);A.redraw();}
  function go(){if(st.stage>=2){A.say('Done! '+(st.op==='+'?st.a+st.b:st.a-st.b));return;}st.stage++;A.pop();draw();if(st.stage===1)A.say(st.op==='+'?'Push them together. Trade if 10 ones or more!':'Trade a ten if you need more ones.');if(st.stage===2)A.say('= '+(st.op==='+'?st.a+st.b:st.a-st.b));}
  draw();
  return {info:()=>st.a+st.op+st.b+':'+st.stage,
    controls:()=>{const c=[{t:st.stage===0?(st.op==='+'?'Combine':'Trade'):st.stage===1?(st.op==='+'?'Trade':'Take away'):'Done',go:true,fn:go},{t:'Start over',fn:()=>{st.stage=0;draw();}},{t:'New problem',fn:()=>{st.op=pick(['+','-']);if(st.op==='+'){st.a=rnd(25,55);st.b=rnd(15,100-st.a);}else{st.a=rnd(40,99);st.b=rnd(11,st.a-5);}st.stage=0;draw();}}];
      if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c.slice(0,2));return c;},
    demo(n){if(n==='add0'){st.op='+';st.a=47;st.b=35;st.stage=0;draw();return;}if(n==='go'){go();return;}st.ask=null;st.stage=0;if(n==='add'){st.op='+';st.a=47;st.b=35;draw();A.seq([[900,go],[1300,go]]);}if(n==='sub'){st.op='-';st.a=52;st.b=27;draw();A.seq([[900,go],[1300,go]]);}},
    task(r){st.setup=true;st.stage=0;let txt;const Q=[['+',47,35,'You have *47 stickers*. You get *35 more*. How many now?'],['-',52,27,'There are *52 birds*. *27* fly away. How many are left?'],['+',38,46,'*38 red* beads and *46 blue* beads. How many beads?'],['-',90,45,'A book has *90 pages*. You read *45*. How many pages are left?'],['-',63,38,'*63 − 38 = ?*']][r];
      st.op=Q[0];st.a=Q[1];st.b=Q[2];const ans=String(st.op==='+'?st.a+st.b:st.a-st.b);const w=st.op==='+'?String(st.a+st.b-10):String(st.a-st.b+10);st.ask={ans,o:shuffle([ans,w,String(+ans+1)]),ok:'Yes! '+st.a+' '+(st.op==='+'?'+':'−')+' '+st.b+' = '+ans+'.'};txt=Q[3];
      draw();st.setup=false;return txt;}};}
});

/* =========================================================
   10. Multiplying: equal groups
   ========================================================= */
P.lesson({id:'multiply2',title:'Equal groups and multiplying',strand:'Number',codes:['B2.5','B2.1'],
 guide:{goal:'Represent multiplication as repeated equal groups, including groups of one half and one fourth, solve related problems, and use the relationship between addition and multiplication.',words:'equal groups, multiply, times, ×, repeated addition, array, half, fourth',
  ask:['How is 4 groups of 3 like 3 + 3 + 3 + 3?','What is 4 groups of one half?','How many fourths make 2 wholes?'],home:'Put 5 groups of 2 spoons on the table. Say it as an adding sentence and a multiplying sentence.'},
 learn:[{say:'Groups of the same size.',speech:'Luna makes four plates with three strawberries each. Three plus three plus three plus three is twelve. That is four groups of three, or four times three equals twelve!',view:'model',demo:'grow'},
        {say:'Read about multiplying.',speech:'Multiplying is adding equal groups. Four times three means four groups of three. Groups can also be parts: four groups of one half make two wholes.',view:'read'},
        {say:'Watch: groups of a fourth.',speech:'Each plate gets one fourth of a pizza. Eight plates need eight fourths, which is two whole pizzas!',view:'model',demo:'fourth'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: make groups!',speech:'Your turn! Choose the number of groups and how many in each.',view:'model'}],
 fig:'Plates with equal groups of strawberries.',rz:.35,
 explore:['Change the *groups* and *how many in each*.','Try *a half* or *a fourth* in each.','Read the adding and multiplying sentences.'],
 howTo:'Make the equal groups, or choose the answer.',
 init:k=>({g:4,e:3,need:null,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'*Multiplying* means adding *equal groups*.')+16;
  for(let k=0;k<4;k++){g.beginPath();g.arc(X0+80+k*170,y+70,62,0,Math.PI*2);g.fillStyle='#ffffff';g.fill();g.strokeStyle='#d6dae6';g.lineWidth=3;g.stroke();for(let i=0;i<3;i++){g.beginPath();g.arc(X0+55+k*170+i*25,y+70,14,0,Math.PI*2);g.fillStyle='#ef4444';g.fill();}}y+=150;
  T(g,'3 + 3 + 3 + 3 = 12',X0,y+20,ZS(36),INK);T(g,'4 × 3 = 12',X0+460,y+20,ZS(44),acc());y+=60;
  rr(g,X0,y,TW,110,18);g.fillStyle=tint(acc(),.12);g.fill();T(g,'4 groups of 1 half = 2 wholes',X0+20,y+42,FT.bodyB);T(g,'8 groups of 1 fourth = 2 wholes',X0+20,y+88,FT.bodyB);y+=132;
  y=keyWords(p,y,[['multiply (×)','add equal groups'],['repeated addition','adding the same number again and again']]);
  predict(p,y,S,'p10','5 groups of 2 = ?','*10.* 2 + 2 + 2 + 2 + 2.');},
 readout(p,S,y){const g=p.g,st=S.st;const tot=st.g*st.e;const lab=st.e===.5?'1 half':st.e===.25?'1 fourth':String(st.e);T(g,st.g+' groups of '+lab+' = '+(Number.isInteger(tot)?tot:tot),X0,y+50,ZS(42),acc());if(st.e>=1)T(g,Array(st.g).fill(st.e).join(' + ')+' = '+tot+'   ·   '+st.g+' × '+st.e+' = '+tot,X0,y+92,FT.bodyB);return y+100;},
 build(S,grp,mode,game){const st=S.st;const g2=new THREE.Group();grp.add(g2);
  function draw(){clearGroup(g2);for(let k=0;k<st.g;k++){const x=-1.85+(k%5)*.92,z=-2.55+Math.floor(k/5)*.95;const pl=plate();pl.position.set(x,.03,z);g2.add(pl);
      if(st.e<1){const n=st.e===.5?2:4;const w=mk(wedgeGeo(.26,.08,0,2*Math.PI/n-.03),lam('#ffc04d'),0);w.position.set(x,.06,z);g2.add(w);}else for(let i=0;i<st.e;i++){const b=bead('#ef4444',.09);b.position.set(x+((i%3)-1)*.2,.13,z+(Math.floor(i/3)-.4)*.2);g2.add(b);}}
    const tot=st.g*st.e;const l=label('= '+(st.e<1?tot+' whole'+(tot===1?'':'s'):tot),{size:.3,bg:'#ffffff'});l.position.set(0,1.0,-.9);g2.add(l);if(mode==='play'&&!st.setup&&st.need&&st.g===st.need[0]&&st.e===st.need[1])game.solved('Yes! '+st.g+' × '+st.e+' = '+tot+'!');A.redraw();}
  const EA=[.25,.5,1,2,3,4,5];const setE=d=>{const i=EA.indexOf(st.e);st.e=EA[Math.max(0,Math.min(EA.length-1,i+d))];A.pop();draw();};
  draw();
  return {info:()=>st.g+'x'+st.e,
    controls:()=>{const c=[{t:'groups +',go:true,fn:()=>{st.g=Math.min(10,st.g+1);A.pop();draw();}},{t:'groups −',fn:()=>{st.g=Math.max(1,st.g-1);draw();}},{t:'each +',fn:()=>setE(1)},{t:'each −',fn:()=>setE(-1)}];if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);return c;},
    demo(n){if(n==='show'){st.g=4;st.e=3;draw();return;}st.ask=null;st.need=null;if(n==='grow'){st.e=3;st.g=1;draw();A.seq([2,3,4].map(k=>[650,()=>{st.g=k;draw();A.pop();}]).concat([[400,()=>A.say('4 × 3 = 12')]]));}if(n==='fourth'){st.e=.25;st.g=8;draw();A.say('8 fourths = 2 wholes');}},
    task(r){st.setup=true;st.ask=null;st.need=null;st.g=1;st.e=1;let txt;
      if(r===0){st.need=[pick([3,4]),pick([2,5])];txt='Make *'+st.need[0]+' groups of '+st.need[1]+'*.';}
      else if(r===1){st.g=5;st.e=2;st.ask={ans:'5 × 2 = 10',o:shuffle(['5 × 2 = 10','5 + 2 = 7','2 + 5 = 7']),ok:'Yes! 2 + 2 + 2 + 2 + 2 = 5 × 2.'};txt='Which sentence matches *5 groups of 2*?';}
      else if(r===2){st.g=4;st.e=.5;st.ask={ans:'2',o:shuffle(['2','4','1']),ok:'Yes! 4 halves = 2 wholes.'};txt='*4 groups of a half*. How many *wholes*?';}
      else if(r===3){st.g=8;st.e=.25;st.ask={ans:'2',o:shuffle(['2','8','4']),ok:'Yes! 4 fourths make 1 whole, so 8 fourths make 2.'};txt='*8 groups of a fourth*. How many *wholes*?';}
      else{st.g=3;st.e=4;st.ask={ans:'12',o:shuffle(['12','7','34']),ok:'Yes! 4 + 4 + 4 = 12.'};txt='*3 × 4 = ?*';}
      draw();st.setup=false;return txt;}};}
});

/* =========================================================
   11. Sharing: division
   ========================================================= */
P.lesson({id:'divide2',title:'Sharing equally: dividing',strand:'Number',codes:['B2.6'],
 guide:{goal:'Represent division of up to 12 items as the equal sharing of a quantity, and solve related problems, using the relationship between subtraction and division.',words:'divide, share, equal, ÷, groups, each, repeated subtraction',
  ask:['How do you share 12 apples among 3 baskets?','How is taking away 4 again and again like dividing 12 by 4?','What does 12 ÷ 3 = 4 mean?'],home:'Share 12 grapes equally among family members. Write the division sentence!'},
 learn:[{say:'Deal them out fairly.',speech:'Theo has twelve apples and three baskets. He gives one to each basket, again and again. Each basket gets four apples. Twelve divided by three equals four!',view:'model',demo:'deal'},
        {say:'Read about division.',speech:'Dividing means sharing equally. You can also take away the same group again and again: twelve take away four, take away four, take away four. That is three groups of four.',view:'read'},
        {say:'Watch: different baskets.',speech:'Now share the twelve apples among four baskets. Each gets three. Twelve divided by four equals three.',view:'model',demo:'four'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: share!',speech:'Your turn! Choose the apples and baskets, then press Deal.',view:'model'}],
 fig:'Apples dealt into baskets one at a time.',rz:.35,
 explore:['Change the *apples* and *baskets*.','Press *Deal* to share one at a time.','Read the division sentence.'],
 howTo:'Share the apples, then choose the answer.',
 init:k=>({n:12,k:3,dealt:0,need:null,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'*Dividing* means *sharing equally*.')+16;
  for(let b=0;b<3;b++){rr(g,X0+20+b*270,y+20,200,110,20);g.fillStyle='#fde68a';g.fill();for(let i=0;i<4;i++){g.beginPath();g.arc(X0+60+b*270+i*40,y+70,16,0,Math.PI*2);g.fillStyle='#ef4444';g.fill();}}T(g,'12 ÷ 3 = 4',X0+TW/2,y+190,ZS(50),acc(),'center');y+=220;
  rr(g,X0,y,TW,110,18);g.fillStyle=tint(acc(),.12);g.fill();T(g,'Take away 4 again and again:',X0+20,y+40,FT.bodyB);T(g,'12 − 4 = 8,  8 − 4 = 4,  4 − 4 = 0  → 3 groups',X0+20,y+84,HAND(),acc());y+=132;
  y=keyWords(p,y,[['divide (÷)','share into equal groups'],['equal','the same amount']]);
  predict(p,y,S,'p11','10 ÷ 2 = ?','*5.* Share 10 between 2.');},
 readout(p,S,y){const g=p.g,st=S.st;const each=Math.floor(st.dealt/st.k);T(g,st.n+' ÷ '+st.k+' = '+(st.dealt>=st.n-st.n%st.k&&st.dealt?Math.floor(st.n/st.k)+(st.n%st.k?' R '+st.n%st.k:''):'?'),X0,y+56,ZS(54),acc());return y+70;},
 build(S,grp,mode,game){const st=S.st;const g2=new THREE.Group();grp.add(g2);
  function apple(){const g=new THREE.Group();const a=mk(G('g2ap',()=>new THREE.SphereGeometry(.1,14,10)),lam('#ef4444'),0);a.position.y=.1;g.add(a);const s=mk(G('g2as',()=>new THREE.CylinderGeometry(.01,.01,.06,5)),lam('#78350f'),0);s.position.y=.22;g.add(s);return g;}
  function draw(){clearGroup(g2);const k=st.k;const bx=i=>-1.9+i*(3.8/Math.max(1,k-1)),bz=-2.1;for(let i=0;i<k;i++){const b=mk(G('g2bk',()=>new THREE.CylinderGeometry(.36,.28,.22,20,1,true)),new THREE.MeshLambertMaterial({color:'#d97706',side:THREE.DoubleSide}),0);b.position.set(k===1?0:bx(i),.12,bz);g2.add(b);}
    for(let j=0;j<st.n;j++){const ap=apple();if(j<st.dealt){const b=j%k,lv=Math.floor(j/k);ap.position.set((k===1?0:bx(b))+((lv%2)-.5)*.2,.02+Math.floor(lv/2)*.18,bz+(Math.floor(lv/2)%2?.1:-.05));}else{const r=j-st.dealt;ap.position.set(((r%6)-2.5)*.3,.02,-.95+Math.floor(r/6)*.26);}g2.add(ap);}A.redraw();}
  function deal(){st.dealt=0;draw();const s=[];const tot=st.n-st.n%st.k;for(let i=0;i<tot;i++)s.push([180,()=>{st.dealt++;draw();}]);s.push([300,()=>{A.pop();A.say(st.n+' ÷ '+st.k+' = '+Math.floor(st.n/st.k)+(st.n%st.k?', '+st.n%st.k+' left':''));A.redraw();if(mode==='play'&&!st.setup&&st.need&&st.n===st.need[0]&&st.k===st.need[1])game.solved('Yes! '+st.n+' ÷ '+st.k+' = '+st.n/st.k+'!');}]);A.seq(s);}
  draw();
  return {info:()=>st.n+'/'+st.k,
    controls:()=>{const c=[{t:'Deal',go:true,fn:deal},{t:'apples +',fn:()=>{st.n=Math.min(12,st.n+1);st.dealt=0;draw();}},{t:'apples −',fn:()=>{st.n=Math.max(2,st.n-1);st.dealt=0;draw();}},{t:'baskets +',fn:()=>{st.k=Math.min(6,st.k+1);st.dealt=0;draw();}},{t:'baskets −',fn:()=>{st.k=Math.max(2,st.k-1);st.dealt=0;draw();}}];if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c.slice(0,1));return c;},
    demo(n){if(n==='show'){st.n=12;st.k=3;st.dealt=0;draw();return;}if(n==='dealnow'){deal();return;}st.ask=null;st.need=null;st.n=12;st.k=n==='four'?4:3;st.dealt=0;draw();A.seq([[600,deal]]);},
    task(r){st.setup=true;st.ask=null;st.need=null;st.dealt=0;let txt;
      if(r===0){st.n=12;st.k=2;st.need=[12,4];txt='Share *12 apples* into *4 baskets*. Set the baskets, then Deal.';}
      else if(r===1){st.n=10;st.k=2;st.ask={ans:'5',o:shuffle(['5','8','2']),ok:'Yes! 10 ÷ 2 = 5.'};txt='*10 ÷ 2 = ?* Deal to check.';}
      else if(r===2){st.n=12;st.k=6;st.ask={ans:'2',o:shuffle(['2','6','3']),ok:'Yes! 12 ÷ 6 = 2.'};txt='Share *12 apples* among *6 baskets*. How many in each?';}
      else if(r===3){st.n=8;st.k=4;st.ask={ans:'8 − 2 − 2 − 2 − 2 = 0',o:shuffle(['8 − 2 − 2 − 2 − 2 = 0','8 − 4 = 4','8 + 4 = 12']),ok:'Yes! Taking away 2 four times shows 8 ÷ 4 = 2.'};txt='Which shows *8 ÷ 4* as taking away equal groups?';}
      else{st.n=9;st.k=3;st.ask={ans:'3',o:shuffle(['3','6','12']),ok:'Yes! 9 ÷ 3 = 3.'};txt='*9 ÷ 3 = ?*';}
      draw();st.setup=false;return txt;}};}
});
})();
