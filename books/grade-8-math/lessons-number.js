/* The Interactive Classroom: Grade 8 Math — Number (lessons 1–11) */
(function(){
"use strict";
const P=window.PM;if(!P||P.failed||!P.THREE)return;
const {THREE,V,W,D,PY,PX,X0,TW,INK,RED,BLUE,GREY,VIBE,FT,ZS,G,M,lam,mk,unitBox,cellMat,label,starGeo,wedgeGeo,clearGroup,disposeObj,rr,T,wrap,para,header,keyWords,predict,box,caption,cxOf,cyOf,tint,moveTo,hop,tween,burst,easeOut,easeIO,A}=P;
const acc=()=>P.ACC;
const rnd=(a,b)=>a+Math.floor(Math.random()*(b-a+1)),pick=a=>a[Math.floor(Math.random()*a.length)],shuffle=a=>a.slice().sort(()=>Math.random()-.5);
const sp=s=>s.replace(/\B(?=(\d{3})+(?!\d))/g,' ');
const r4=v=>Math.round(v*10000)/10000;
const fmt=n=>{n=r4(n);const neg=n<0;const s=String(Math.abs(n));const [i,f]=s.split('.');return (neg?'−':'')+(i.length>=5?sp(i):i)+(f!=null?'.'+f:'');};
const gcd=(a,b)=>b?gcd(b,a%b):Math.abs(a);
const sgn=v=>v<0?'−'+fmt(-v):fmt(v);
const par=v=>v<0?'('+sgn(v)+')':fmt(v);
const fr=(n,d)=>{if(d<0){n=-n;d=-d;}const g=gcd(n,d)||1;n/=g;d/=g;return d===1?sgn(n):(n<0?'−':'')+Math.abs(n)+'/'+d;};
const mixed=(n,d)=>{const g=gcd(n,d)||1;n/=g;d/=g;if(d===1)return sgn(n);const w=Math.trunc(n/d),r=Math.abs(n%d);return w?(sgn(w)+' '+r+'/'+d):fr(n,d);};
function choices(game,list,ans,ok,lab){return list.map(o=>({t:lab?lab(o):String(o),big:true,fn:()=>{if(o===ans){if(game)game.solved(ok);else A.good(ok);}else A.bad('Not quite. Try again!');}}));}
function digitMat(t,bg,fg){return M('d8g'+t+bg+(fg||''),()=>{const c=document.createElement('canvas');c.width=c.height=128;const g=c.getContext('2d');g.fillStyle=bg;g.fillRect(0,0,128,128);
  g.strokeStyle='rgba(27,34,54,.25)';g.lineWidth=6;g.strokeRect(3,3,122,122);g.fillStyle=fg||'#1b2236';g.font='700 84px "Zilla Slab", Georgia, serif';g.textAlign='center';g.textBaseline='middle';g.fillText(t,64,70);
  const tx=new THREE.CanvasTexture(c);tx.anisotropy=4;return new THREE.MeshLambertMaterial({map:tx});});}
function digitCube(t,bg,s,fg){const geo=G('d8cube'+s,()=>new THREE.BoxGeometry(s,s,s));const side=lam(bg),m=digitMat(t,bg,fg);return mk(geo,[side,side,m,side,m,side],20);}
const SUPS={'0':'⁰','1':'¹','2':'²','3':'³','4':'⁴','5':'⁵','6':'⁶','7':'⁷','8':'⁸','9':'⁹','-':'⁻'};const sup=n=>String(n).split('').map(c=>SUPS[c]).join('');
const tp=n=>'10'+sup(n);
/* standard form of (digits ds read as d.ddd) × 10^e */
function stdForm(ds,e){const k=e+1;let s;if(k>=ds.length)s=sp(ds+'0'.repeat(k-ds.length));else if(k<=0)s='0.'+'0'.repeat(-k)+ds;else s=ds.slice(0,k)+'.'+ds.slice(k);return s;}
const sci=(ds,e)=>(ds.length>1?ds[0]+'.'+ds.slice(1):ds)+' × '+tp(e);
/* number line helper: ticks from a to b */
function numLine(grp,a,b,x0,x1,z,step,lab){const X=v=>x0+(v-a)/(b-a)*(x1-x0);const bar=mk(new THREE.BoxGeometry(x1-x0+.2,.05,.06),lam(INK),0);bar.position.set((x0+x1)/2,.05,z);grp.add(bar);
  for(let v=a;v<=b+1e-9;v+=step){const big=lab?lab(v):true;const t=mk(new THREE.BoxGeometry(.02,.05,big?.2:.12),lam(INK),0);t.position.set(X(v),.06,z);grp.add(t);if(big){const l=label(sgn(r4(v)),{size:.13,color:v<0?RED:v>0?BLUE:INK});l.position.set(X(v),.12,z+.24);grp.add(l);}}return X;}

/* =========================================================
   1. Scientific notation
   ========================================================= */
P.lesson({id:'sci8',title:'Scientific notation',strand:'Number',codes:['B1.1'],
 guide:{goal:'Represent and compare very large and very small numbers, including through the use of scientific notation, and describe ways they are used in everyday life.',words:'scientific notation, coefficient, power of ten, exponent, negative exponent, standard form',
  ask:['Why is 6.7 × 10⁷ easier to read than 67 000 000?','What does a negative exponent mean?','How do you compare 3 × 10⁻⁴ and 5 × 10⁻⁵?'],home:'Find three very big or very small numbers in science (the distance to the Moon, the size of a cell). Write each in scientific notation.'},
 learn:[{say:'Slide the decimal point.',speech:'Scientific notation writes a number as a coefficient from one up to ten, times a power of ten. Watch four point five become forty-five million: each times ten slides the digits one place to the left. Four point five times ten to the seventh.',view:'model',demo:'big'},
        {say:'Read about large and small numbers.',speech:'For very large numbers, the exponent is positive. For very small numbers, the exponent is negative: ten to the negative three means divide by ten three times, so it is one thousandth.',view:'read'},
        {say:'Watch: a tiny number.',speech:'Now divide by ten again and again. Four point one becomes zero point zero zero zero four one. That is four point one times ten to the negative four.',view:'model',demo:'small'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: build the number.',speech:'Your turn. Press times ten or divide by ten to slide the digits, and read both forms.',view:'model'}],
 fig:'Digit cubes slide past a golden decimal point.',rz:.4,
 explore:['Press *× 10* or *÷ 10*.','The *gold bead* is the decimal point.','Read *standard form* and *scientific notation*.'],
 howTo:'Slide the digits to the target, or choose the answer.',
 init:k=>({ds:'45',e:7,target:null,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'In *scientific notation*, a number is written as *a × 10ⁿ*, where *1 ≤ a < 10* and n is an integer.')+14;
  [['Distance to the Sun','150 000 000 000 m','1.5 × 10¹¹ m','#e89a00'],['People in Canada','41 000 000','4.1 × 10⁷','#e2457a'],['Width of a hair','0.00008 m','8 × 10⁻⁵ m','#2f7de1'],['A virus','0.0000001 m','1 × 10⁻⁷ m','#16a36f']].forEach(([a,b,c,col],i)=>{
    rr(g,X0,y+i*70,TW,62,14);g.fillStyle=tint(col,.13);g.fill();T(g,a,X0+18,y+i*70+26,FT.smallB,col);T(g,b,X0+18,y+i*70+52,FT.small,GREY);T(g,c,X0+TW-18,y+i*70+42,ZS(30),INK,'right');});y+=294;
  y=para(p,y,'*Positive exponent:* a large number. *Negative exponent:* a small number between 0 and 1. 10⁻³ = 1 ÷ 10³ = 0.001.')+10;
  y=para(p,y,'*To compare*, look at the exponents first: 3 × 10⁻⁴ (0.0003) is *greater* than 5 × 10⁻⁵ (0.00005).')+10;
  y=keyWords(p,y,[['scientific notation','a × 10ⁿ with 1 ≤ a < 10'],['negative exponent','how many times to divide by 10']]);
  predict(p,y,S,'p1','Write 0.0062 in scientific notation.','*6.2 × 10⁻³.* The point moves 3 places right.');},
 readout(p,S,y){const g=p.g,st=S.st;T(g,sci(st.ds,st.e),X0,y+48,ZS(48),acc());T(g,'= '+stdForm(st.ds,st.e),X0,y+92,FT.bodyB);return y+102;},
 build(S,grp,mode,game){const st=S.st,step=.26,px=.35,z=-1.9;const row=new THREE.Group();grp.add(row);
  const bead=mk(new THREE.SphereGeometry(.07,16,12),lam('#f5b301'),0);bead.position.set(px,.1,z+.12);grp.add(bead);
  const plate=mk(new THREE.BoxGeometry(4.3,.03,.5),lam('#eef2f8'),20);plate.position.set(-.05,.015,z);grp.add(plate);
  const big=label('',{size:.3,bg:'#ffffff'});big.position.set(0,1.1,-2.5);grp.add(big);
  function draw(){clearGroup(row);const hi=Math.max(st.e,0),lo=Math.min(st.e-st.ds.length+1,0);for(let p=hi;p>=lo;p--){const i=st.e-p;const d=(i>=0&&i<st.ds.length)?st.ds[i]:'0';const c=digitCube(d,(i>=0&&i<st.ds.length)?'#ffffff':'#e5e7eb',.24,(i>=0&&i<st.ds.length)?'#1b2236':'#94a3b8');
      c.position.set(px-(p+.5)*step,.15,z);row.add(c);}big.userData.set(sci(st.ds,st.e));check();A.redraw();}
  function mv(d){const ne=st.e+d;if(ne>8||ne<-5){A.bad(d>0?'That is as big as this shelf goes.':'That is as small as this shelf goes.');return;}st.e=ne;A.pop();draw();row.position.x=d*step;tween(.35,k=>{row.position.x=d*step*(1-k);});}
  function check(){if(mode==='play'&&!st.setup&&st.target!=null&&st.e===st.target)game.solved('Yes! '+sci(st.ds,st.e)+' = '+stdForm(st.ds,st.e)+'.');}
  draw();
  return {info:()=>sci(st.ds,st.e),
    controls:()=>{const c=[{t:'× 10',go:true,fn:()=>mv(1)},{t:'÷ 10',fn:()=>mv(-1)}];if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);return c;},
    demo(n){st.ask=null;st.target=null;if(n==='big'){st.ds='45';st.e=0;draw();A.seq([0,1,2,3,4,5,6].map(()=>[450,()=>mv(1)]).concat([[600,()=>A.say('4.5 × 10⁷ = 45 000 000')]]));}
      if(n==='small'){st.ds='41';st.e=0;draw();A.seq([0,1,2,3].map(()=>[550,()=>mv(-1)]).concat([[600,()=>A.say('4.1 × 10⁻⁴ = 0.00041')]]));}},
    task(r){st.setup=true;st.ask=null;st.target=null;let txt;
      if(r===0){st.ds=pick(['32','27','58']);st.e=0;st.target=rnd(4,6);txt='Slide the digits to show *'+sci(st.ds,st.target)+'*.';}
      else if(r===1){const ds=pick(['67','43','91']),e=7;st.ds=ds;st.e=0;const a=sci(ds,e);st.ask={ans:a,o:shuffle([a,ds+' × '+tp(e-1),sci(ds,e-1)]),ok:'Yes! '+stdForm(ds,e)+' = '+a+'.'};txt='Write *'+stdForm(ds,e)+'* in scientific notation.';}
      else if(r===2){st.ds=pick(['41','26','73']);st.e=0;st.target=pick([-3,-4]);txt='Slide the digits to show *'+stdForm(st.ds,st.target)+'*.';}
      else if(r===3){st.ds='3';st.e=-4;st.ask={ans:'3 × 10⁻⁴',o:['3 × 10⁻⁴','5 × 10⁻⁵'],ok:'Yes! 0.0003 > 0.00005: the exponent −4 is greater than −5.'};txt='Which is *greater*: *3 × 10⁻⁴* or *5 × 10⁻⁵*?';}
      else{st.ds='5';st.e=0;const a='5 × 10⁻⁴ m';st.ask={ans:a,o:shuffle([a,'5 × 10⁴ m','5 × 10⁻³ m']),ok:'Yes! 0.0005 = 5 × 10⁻⁴.'};txt='A grain of sand is about *0.0005 m* wide. Write it in scientific notation.';}
      draw();st.setup=false;return txt;}};}
});

/* =========================================================
   2. The real number system
   ========================================================= */
const RN={sq2:{t:'√2',v:Math.SQRT2,irr:true},pi:{t:'π',v:Math.PI,irr:true},f73:{t:'7/3',v:7/3,irr:false},d25:{t:'2.5',v:2.5,irr:false},sq9:{t:'√9',v:3,irr:false},rep:{t:'0.333…',v:1/3,irr:false},
  sq16:{t:'√16',v:4,irr:false},f34:{t:'3/4',v:.75,irr:false},sq7:{t:'√7',v:Math.sqrt(7),irr:true},d225:{t:'2.25',v:2.25,irr:false},d15:{t:'1.5',v:1.5,irr:false},
  sq10:{t:'√10',v:Math.sqrt(10),irr:true},d31:{t:'3.1',v:3.1,irr:false},f227:{t:'22/7',v:22/7,irr:false},sq8:{t:'√8',v:Math.sqrt(8),irr:true},d29:{t:'2.9',v:2.9,irr:false},neg:{t:'−1.5',v:-1.5,irr:false},sq3:{t:'√3',v:Math.sqrt(3),irr:true}};
P.lesson({id:'real8',title:'Rational and irrational numbers',strand:'Number',codes:['B1.2'],
 guide:{goal:'Describe, compare and order numbers in the real number system (rational and irrational numbers), separately and in combination, in various contexts.',words:'rational number, irrational number, real number, repeating decimal, terminating decimal, square root, π',
  ask:['Why is 0.333… rational but √2 is not?','Between which two whole numbers is √10?','How do you order π, √8 and 2.9?'],home:'Measure around a round lid and across it. Divide. Why does the answer never come out as an exact fraction?'},
 learn:[{say:'Place every real number.',speech:'Every real number has a place on the number line. Rational numbers, in blue, can be written as a fraction: two point five, seven thirds, zero point three repeating. Irrational numbers, in gold, cannot: their decimals never end and never repeat, like the square root of two and pi.',view:'model',demo:'place'},
        {say:'Read about the real number system.',speech:'Rational numbers include integers, fractions, terminating decimals and repeating decimals. Irrational numbers include pi and the square roots of numbers that are not perfect squares. Together they make the real numbers.',view:'read'},
        {say:'Watch: compare and order.',speech:'To compare, write each number as a decimal. The square root of eight is about two point eight three, which is less than two point nine. Pi is about three point one four, the greatest.',view:'model',demo:'order'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: place the numbers.',speech:'Your turn. Tap each number card to place it on the line. Turn on the colours to check rational and irrational.',view:'model'}],
 fig:'Number cards fly to their places on a real number line.',rz:.4,
 explore:['*Tap a card* to place it on the line.','Turn on *Colours*: blue = rational, gold = irrational.','Compare by writing decimals.'],
 howTo:'Tap the right card on the shelf, or choose the answer.',
 init:k=>({set:['sq2','pi','f73','d25','rep','neg'],placed:[],show:true,want:null,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'The *real numbers* are all the numbers on the number line.')+12;
  rr(g,X0,y,TW,250,18);g.fillStyle=tint('#f5b301',.16);g.fill();T(g,'Real numbers',X0+20,y+34,FT.bodyB,INK);
  rr(g,X0+20,y+50,TW*.58,180,14);g.fillStyle=tint('#2f7de1',.16);g.fill();T(g,'Rational',X0+38,y+84,FT.bodyB,'#2563eb');wrap(g,'fractions: 3/4, −7/3  ·  integers: −5, 0, 12  ·  decimals that end: 2.25  ·  decimals that repeat: 0.333…',X0+38,y+116,TW*.58-40,28,{font:FT.small});
  T(g,'Irrational',X0+TW*.58+50,y+84,FT.bodyB,'#b45309');wrap(g,'√2, √7, π  ·  never end, never repeat',X0+TW*.58+50,y+116,TW*.42-80,28,{font:FT.small});y+=274;
  y=para(p,y,'*To compare or order*, write each as a decimal: √8 ≈ 2.83, 2.9, π ≈ 3.14. So *√8 < 2.9 < π*.')+10;
  y=para(p,y,'√30 is between √25 = 5 and √36 = 6.')+10;
  y=keyWords(p,y,[['rational number','can be written as a fraction a/b of integers'],['irrational number','a decimal that never ends or repeats']]);
  predict(p,y,S,'p2','Is √49 rational or irrational?','*Rational.* √49 = 7 = 7/1.');},
 readout(p,S,y){const g=p.g,st=S.st;const pl=st.placed.map(k=>RN[k]).sort((a,b)=>a.v-b.v);wrap(g,pl.length?pl.map(o=>o.t).join('  <  '):'Tap a card to place it.',X0,y+46,TW,40,{font:ZS(34),color:acc()});return y+(pl.length>5?100:60);},
 build(S,grp,mode,game){const st=S.st;const X=numLine(grp,-2,4,-2.0,2.0,-1.55,.5,v=>Math.abs(v-Math.round(v))<1e-9);const shelf=new THREE.Group(),flags=new THREE.Group();grp.add(shelf,flags);
  const col=o=>st.show?(o.irr?'#f5b301':'#3b82f6'):'#94a3b8';
  function draw(){clearGroup(shelf);clearGroup(flags);st.set.forEach((k,i)=>{const o=RN[k];const n=st.set.length,x=-1.9+i*(3.8/(n-1||1));const card=mk(G('rn8card',()=>new THREE.BoxGeometry(.56,.08,.4)),lam(col(o)),20);card.position.set(x,.04,-2.75);shelf.add(card);
      const l=label(o.t,{size:.2,bg:'#ffffff'});l.position.set(x,.32,-2.75);shelf.add(l);A.drag(card,{tap:()=>tap(k)});});
    st.placed.forEach((k,j)=>{const o=RN[k];const pole=mk(new THREE.CylinderGeometry(.015,.015,.6+(j%2)*.35,8),lam(INK),0);pole.position.set(X(o.v),.3+(j%2)*.17,-1.55);flags.add(pole);
      const f=label(o.t,{size:.17,bg:'#ffffff',border:col(o)});f.position.set(X(o.v),.7+(j%2)*.35,-1.55);flags.add(f);const b=mk(new THREE.SphereGeometry(.06,12,10),lam(col(o)),0);b.position.set(X(o.v),.08,-1.55);flags.add(b);});A.redraw();}
  function tap(k){if(!st.placed.includes(k))st.placed.push(k);A.pop();draw();A.say(RN[k].t+' ≈ '+RN[k].v.toFixed(3)+(RN[k].irr?' (irrational)':' (rational)'));
    if(mode==='play'&&!st.setup&&st.want){if(st.want===k)game.solved(st.wantOk);else A.bad('Look again: '+st.wantHint);}}
  draw();
  return {info:()=>st.placed.length+' placed',
    controls:()=>{const c=[{t:'Colours',on:st.show,fn:()=>{st.show=!st.show;draw();}},{t:'Clear line',fn:()=>{st.placed=[];draw();}}];if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);return c;},
    demo(n){st.ask=null;st.want=null;st.show=true;st.placed=[];if(n==='place'){st.set=['sq2','pi','f73','d25','rep','neg'];draw();A.seq(st.set.map(k=>[650,()=>tap(k)]));}
      if(n==='order'){st.set=['sq8','d29','pi'];draw();A.seq(['sq8','d29','pi'].map(k=>[900,()=>tap(k)]));}},
    task(r){st.setup=true;st.ask=null;st.want=null;st.placed=[];let txt;
      if(r===0){st.show=false;st.set=shuffle(['sq16','f34','sq7','d225','d15']);st.want='sq7';st.wantOk='Yes! √7 ≈ 2.6457… never ends or repeats.';st.wantHint='find the square root of a number that is not a perfect square.';txt='Tap the *irrational* number.';}
      else if(r===1){st.show=true;st.set=shuffle(['sq10','d31','f227','pi']);st.want='sq10';st.wantOk='Yes! √10 ≈ 3.162 is the greatest.';st.wantHint='write each one as a decimal.';txt='Tap the *greatest* number. Place cards on the line to compare.';}
      else if(r===2){st.show=true;st.set=['sq8','d29','pi','sq3'];const n=pick([30,50,70]),lo=Math.floor(Math.sqrt(n));const a=lo+' and '+(lo+1);st.ask={ans:a,o:shuffle([a,(lo-1)+' and '+lo,Math.floor(n/2)+' and '+(Math.floor(n/2)+1)]),ok:'Yes! '+lo*lo+' < '+n+' < '+(lo+1)*(lo+1)+'.'};txt='√'+n+' is between which two whole numbers?';}
      else if(r===3){st.show=true;st.set=['sq8','d29','pi'];const a='√8, 2.9, π';st.ask={ans:a,o:shuffle([a,'2.9, √8, π','π, √8, 2.9']),ok:'Yes! 2.83 < 2.9 < 3.14.'};txt='Order from *least to greatest*: π, √8, 2.9.';}
      else{st.show=false;st.set=['rep','sq2','pi'];st.ask={ans:'0.121212…',o:shuffle(['0.121212…','√5','π']),ok:'Yes! A repeating decimal is rational: 0.1212… = 12/99.'};txt='Which number is *rational*?';}
      draw();st.setup=false;return txt;}};}
});

/* =========================================================
   3. Square roots and perfect squares
   ========================================================= */
P.lesson({id:'sqrt8',title:'Square roots and perfect squares',strand:'Number',codes:['B1.3','B2.2'],
 guide:{goal:'Estimate and calculate square roots in various contexts, and understand and recall commonly used square numbers and their square roots.',words:'square number, perfect square, square root, √, estimate, side length, area',
  ask:['Why is the square root of an area the side length of a square?','How can you estimate √50 without a calculator?','Which perfect squares do you know by heart?'],home:'Find a square tile or a square floor. Measure its area and find the side length using a square root.'},
 learn:[{say:'Area to side length.',speech:'A square with an area of forty-nine tiles has sides of seven tiles, because seven times seven is forty-nine. The square root of forty-nine is seven. Watch the squares grow: one, four, nine, sixteen, twenty-five.',view:'model',demo:'grow'},
        {say:'Read about estimating.',speech:'For an area that is not a perfect square, like fifty, the side is between seven and eight, because forty-nine is less than fifty and sixty-four is more. Fifty is very close to forty-nine, so the square root of fifty is about seven point one.',view:'read'},
        {say:'Watch: estimate √50.',speech:'The green square of forty-nine tiles fits inside. The outline of the square with area fifty is just a bit bigger. The large outline is sixty-four. So the square root of fifty is about seven point one.',view:'model',demo:'est'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: change the area.',speech:'Your turn. Change the area and read the side length.',view:'model'}],
 fig:'Square tiles grow into perfect squares.',rz:.35,
 explore:['Change the *area*.','A perfect square fills with *green* tiles.','Other areas show the exact square between two perfect squares.'],
 howTo:'Set the area to make the square, or choose the answer.',
 init:k=>({n:49,target:null,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'If a square has area *A*, its side length is *√A*. Perfect squares to know by heart:')+12;
  for(let i=1;i<=15;i++){const c=(i-1)%5,r=Math.floor((i-1)/5);const x=X0+c*(TW/5),yy=y+r*60;rr(g,x+4,yy,TW/5-8,52,10);g.fillStyle=tint(acc(),.08+r*.04);g.fill();T(g,i+'² = '+i*i,x+TW/10,yy+34,FT.bodyB,INK,'center');}y+=196;
  y=para(p,y,'*Estimate √50:* 49 < 50 < 64, so 7 < √50 < 8. Since 50 is very close to 49, *√50 ≈ 7.1*.')+12;
  const s=12,ox=X0+40,oy=y+120;for(let i=0;i<7;i++)for(let j=0;j<7;j++){g.fillStyle='#16a36f';g.fillRect(ox+i*s,oy-(j+1)*s,s-2,s-2);}g.strokeStyle='#e2457a';g.lineWidth=3;g.strokeRect(ox,oy-8*s,8*s,8*s);g.strokeStyle='#f5b301';g.strokeRect(ox,oy-7.07*s,7.07*s,7.07*s);
  T(g,'49 (side 7)',ox+130,oy-60,FT.smallB,'#16a36f');T(g,'50 (side ≈ 7.1)',ox+130,oy-28,FT.smallB,'#b45309');T(g,'64 (side 8)',ox+130,oy+4,FT.smallB,'#e2457a');y+=150;
  y=keyWords(p,y,[['perfect square','a whole number times itself, like 81 = 9 × 9'],['square root','the number that, multiplied by itself, gives the number']]);
  predict(p,y,S,'p3','Estimate √90 to one decimal place.','*About 9.5.* 81 < 90 < 100 and 90 is about halfway.');},
 readout(p,S,y){const g=p.g,st=S.st,r=Math.sqrt(st.n),perf=Number.isInteger(r);T(g,'√'+st.n+(perf?' = ':' ≈ ')+(perf?r:r.toFixed(2)),X0,y+50,ZS(48),acc());T(g,perf?st.n+' is a perfect square: '+r+' × '+r:'between √'+Math.floor(r)**2+' = '+Math.floor(r)+' and √'+Math.ceil(r)**2+' = '+Math.ceil(r),X0,y+92,FT.bodyB);return y+100;},
 build(S,grp,mode,game){const st=S.st,u=.24,ox=-1.4,oz=-.75;const g2=new THREE.Group();grp.add(g2);
  const base=mk(new THREE.BoxGeometry(10*u+.2,.03,10*u+.2),[lam('#f3f6fb'),lam('#f3f6fb'),cellMat('#ffffff',10,10),lam('#f3f6fb'),lam('#f3f6fb'),lam('#f3f6fb')],20);base.position.set(ox+5*u,.015,oz-5*u);grp.add(base);
  function outline(sd,col){const pts=[[0,0],[sd,0],[sd,sd],[0,sd],[0,0]].map(([a,b])=>V(ox+a*u,.12,oz-b*u));for(let i=0;i<4;i++){const s=new THREE.Mesh(new THREE.CylinderGeometry(.018,.018,pts[i].distanceTo(pts[i+1]),8),lam(col));s.position.copy(pts[i]).add(pts[i+1]).multiplyScalar(.5);s.quaternion.setFromUnitVectors(V(0,1,0),pts[i+1].clone().sub(pts[i]).normalize());g2.add(s);}}
  function draw(){clearGroup(g2);const r=Math.sqrt(st.n),f=Math.floor(r),perf=Number.isInteger(r);for(let i=0;i<f;i++)for(let j=0;j<f;j++){const t=unitBox(1,1,1,perf?'#16a36f':'#86efac',u*.94);t.position.set(ox+(i+.5)*u,.05+u*.2,oz-(j+.5)*u);t.scale.y=.4;g2.add(t);}
    let extra=st.n-f*f;for(let k=0;k<extra;k++){const t=unitBox(1,1,1,'#f5b301',u*.94);const i=k<f?f:k-f,j=k<f?k:f;if(i>9||j>9)continue;t.position.set(ox+(i+.5)*u,.05+u*.2,oz-(j+.5)*u);t.scale.y=.4;g2.add(t);}
    if(!perf){outline(r,'#f5b301');outline(Math.min(10,f+1),'#e2457a');}
    const l=label('√'+st.n+(perf?' = '+r:' ≈ '+r.toFixed(2)),{size:.3,bg:'#ffffff'});l.position.set(1.65,.9,-1.9);g2.add(l);const a=label('area '+st.n,{size:.2,color:GREY});a.position.set(1.65,.45,-1.9);g2.add(a);check();A.redraw();}
  function setN(n){st.n=Math.max(1,Math.min(100,n));A.pop();draw();}
  function check(){if(mode==='play'&&!st.setup&&st.target!=null&&st.n===st.target)game.solved('Yes! √'+st.n+' = '+Math.sqrt(st.n)+'.');}
  draw();
  return {info:()=>'area '+st.n,
    controls:()=>{const c=[{t:'area −10',fn:()=>setN(st.n-10)},{t:'area −1',fn:()=>setN(st.n-1)},{t:'area +1',go:true,fn:()=>setN(st.n+1)},{t:'area +10',fn:()=>setN(st.n+10)}];if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);return c;},
    demo(n){st.ask=null;st.target=null;if(n==='grow'){st.n=1;draw();A.seq([4,9,16,25,36,49].map(v=>[650,()=>setN(v)]));}if(n==='est'){st.n=49;draw();A.seq([[900,()=>{setN(50);A.say('√50 ≈ 7.1')}]]);}},
    task(r){st.setup=true;st.ask=null;st.target=null;let txt;st.n=rnd(10,30);
      if(r===0){const s=pick([6,8,9]);st.target=s*s;txt='Make a square with a *side length of '+s+'*. Set the area.';}
      else if(r===1){const s=pick([11,12,13]);st.ask={ans:String(s),o:shuffle([String(s),String(s*2),String(s+1)]),ok:'Yes! '+s+' × '+s+' = '+s*s+'.'};txt='What is *√'+s*s+'*?';}
      else if(r===2){const n=pick([40,60,85]);st.n=n;const e=Math.sqrt(n).toFixed(1);st.ask={ans:e,o:shuffle([e,(+e+.6).toFixed(1),String(n/2)]),ok:'Yes! √'+n+' ≈ '+Math.sqrt(n).toFixed(3)+'.'};txt='*Estimate* √'+n+' to one decimal place.';}
      else if(r===3){st.ask={ans:'64',o:shuffle(['64','48','60']),ok:'Yes! 64 = 8 × 8.'};txt='Which is a *perfect square*?';}
      else{const s=pick([7,9,10]);st.n=s*s;st.ask={ans:s+' m',o:shuffle([s+' m',s*s/2+' m',s*4+' m']),ok:'Yes! √'+s*s+' = '+s+'.'};txt='A square garden has an area of *'+s*s+' m²*. How long is *one side*?';}
      draw();st.setup=false;return txt;}};}
});

/* =========================================================
   4. Percents greater than 100% and less than 1%
   ========================================================= */
P.lesson({id:'pct8',title:'Percents above 100% and below 1%',strand:'Number',codes:['B1.4'],
 guide:{goal:'Use fractions, decimal numbers and percents, including percents of more than 100% or less than 1%, interchangeably and flexibly to solve problems.',words:'percent, more than 100%, less than 1%, decimal, fraction, equivalent',
  ask:['What does 150% of a number mean?','How can a percent be less than 1%?','How do you write 0.5% as a decimal?'],home:'Look for big growth numbers in the news (“prices up 120% since…”) or tiny ones (“0.5% interest”). Rewrite each as a decimal.'},
 learn:[{say:'More than one whole.',speech:'One hundred percent is one whole grid. One hundred fifty percent is one whole grid and half of another. As a decimal, it is one point five. As a fraction, three halves. Watch the grids fill.',view:'model',demo:'over'},
        {say:'Read about tiny percents.',speech:'A percent less than one percent is a part of one square. Half a percent is half of one small square: zero point zero zero five as a decimal.',view:'read'},
        {say:'Watch: zoom into one square.',speech:'Now zoom into one square. It splits into ten slices. Each slice is one tenth of a percent. Five slices are zero point five percent.',view:'model',demo:'under'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: fill the grids.',speech:'Your turn. Change the percent and read the decimal and fraction.',view:'model'}],
 fig:'Hundred grids fill past 100%, and one square zooms into tenths.',rz:.35,
 explore:['Change the *percent*.','Each grid is *100%*.','Under 1%, the zoom shows *tenths of a percent*.'],
 howTo:'Set the percent, or choose the answer.',
 init:k=>({p:150,of:40,target:null,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'Percent means *per hundred*. Percents can be *greater than 100%* (more than one whole) or *less than 1%* (part of one hundredth).')+14;
  rr(g,X0,y,TW,44,12);g.fillStyle=tint(acc(),.16);g.fill();['Percent','Decimal','Fraction'].forEach((h,i)=>T(g,h,X0+20+i*TW/3,y+30,FT.smallB,acc()));y+=48;
  [['250%','2.5','5/2'],['150%','1.5','3/2'],['100%','1','1'],['0.5%','0.005','1/200'],['0.1%','0.001','1/1000']].forEach((r,j)=>r.forEach((v,i)=>T(g,v,X0+20+i*TW/3,y+j*40+28,i?FT.body:FT.bodyB,i?INK:acc())));y+=226;
  y=para(p,y,'*150% of 40* = 1.5 × 40 = *60*.  *0.5% of 200* = 0.005 × 200 = *1*.')+10;
  y=para(p,y,'A town grew to *120%* of its size: it is 1.2 times as big as before.')+10;
  y=keyWords(p,y,[['percent','a ratio out of 100'],['equivalent','different forms of the same amount']]);
  predict(p,y,S,'p4','What is 0.2% of 5000?','*10.* 0.002 × 5000 = 10.');},
 readout(p,S,y){const g=p.g,st=S.st,d=r4(st.p/100);T(g,fmt(st.p)+'% = '+fmt(d)+' = '+fr(Math.round(st.p*10),1000),X0,y+50,ZS(44),acc());T(g,fmt(st.p)+'% of '+st.of+' = '+fmt(d)+' × '+st.of+' = '+fmt(d*st.of),X0,y+92,FT.bodyB);return y+102;},
 build(S,grp,mode,game){const st=S.st,c=.068;const g2=new THREE.Group();grp.add(g2);const geo=G('pc8cell',()=>new THREE.BoxGeometry(c*.9,.04,c*.9));
  function draw(){clearGroup(g2);const full=Math.floor(st.p+1e-9),part=r4(st.p-full);for(let gI=0;gI<3;gI++){const gx=-2.05+gI*.78;const pl=mk(new THREE.BoxGeometry(10*c+.06,.02,10*c+.06),lam('#cbd5e1'),20);pl.position.set(gx+5*c,.01,-2.0);g2.add(pl);
      for(let k=0;k<100;k++){const idx=gI*100+k,on=idx<full,pp=idx===full&&part>0;const m=mk(geo,lam(on?['#2f7de1','#8b5cf6','#e2457a'][gI]:pp?'#f5b301':'#ffffff'),0);m.position.set(gx+(k%10+.5)*c,.04,-2.0-(4.5-Math.floor(k/10))*c);g2.add(m);}
      const l=label((gI+1)*100+'%',{size:.14,color:GREY});l.position.set(gx+5*c,.1,-1.55);g2.add(l);}
    if(st.p<2){const zx=1.55,zz=-2.0;const fr0=mk(new THREE.BoxGeometry(.72,.03,.72),lam('#ffffff'),20);fr0.position.set(zx,.05,zz);g2.add(fr0);const tenths=Math.round((st.p<1?st.p:part)*10);
      for(let i=0;i<10;i++){const s=mk(new THREE.BoxGeometry(.066,.08,.68),lam(i<tenths?'#f5b301':'#fef3c7'),0);s.position.set(zx-.33+(i+.5)*.068,.1,zz);g2.add(s);}
      const zl=label('zoom: 1 square = 1%',{size:.13,color:'#b45309'});zl.position.set(zx,.2,zz+.52);g2.add(zl);}
    const big=label(fmt(st.p)+'%',{size:.34,bg:'#ffffff'});big.position.set(-.5,.95,-2.0);g2.add(big);check();A.redraw();}
  function setP(v){st.p=Math.max(0,Math.min(300,r4(v)));A.pop();draw();}
  function check(){if(mode==='play'&&!st.setup&&st.target!=null&&Math.abs(st.p-st.target)<1e-9)game.solved('Yes! '+fmt(st.p)+'% = '+fmt(st.p/100)+'.');}
  draw();
  return {info:()=>fmt(st.p)+'%',
    controls:()=>{const c=[{t:'−100',fn:()=>setP(st.p-100)},{t:'−10',fn:()=>setP(st.p-10)},{t:'−1',fn:()=>setP(st.p-1)},{t:'−0.1',fn:()=>setP(st.p-.1)},{t:'+0.1',fn:()=>setP(st.p+.1)},{t:'+1',go:true,fn:()=>setP(st.p+1)},{t:'+10',fn:()=>setP(st.p+10)},{t:'+100',fn:()=>setP(st.p+100)}];
      if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);return c;},
    demo(n){st.ask=null;st.target=null;if(n==='over'){st.p=0;draw();A.seq([[600,()=>setP(50)],[600,()=>setP(100)],[700,()=>setP(150)],[600,()=>A.say('150% = 1.5 = 3/2')]]);}if(n==='under'){st.p=0;draw();A.seq([.1,.2,.3,.4,.5].map(v=>[500,()=>setP(v)]).concat([[600,()=>A.say('0.5% = 0.005')]]));}},
    task(r){st.setup=true;st.ask=null;st.target=null;st.p=100;st.of=40;let txt;
      if(r===0){st.target=pick([125,175,230]);txt='Show *'+st.target+'%*. Then say it as a decimal.';}
      else if(r===1){st.p=0;st.target=pick([.3,.5,.8]);txt='Show *'+fmt(st.target)+'%*: less than one square!';}
      else if(r===2){const n=pick([40,60,80]),q=pick([150,125,250]);st.p=q;st.of=n;const a=fmt(q/100*n);st.ask={ans:a,o:shuffle([a,fmt(q/1000*n),fmt(n+q)]),ok:'Yes! '+fmt(q/100)+' × '+n+' = '+a+'.'};txt='What is *'+q+'% of '+n+'*?';}
      else if(r===3){st.p=.5;st.of=200;st.ask={ans:'1',o:shuffle(['1','10','100']),ok:'Yes! 0.005 × 200 = 1.'};txt='What is *0.5% of 200*?';}
      else{st.p=250;st.ask={ans:'250%',o:shuffle(['250%','25%','2.5%']),ok:'Yes! 2.5 = 250/100.'};txt='Write *2.5* as a percent.';}
      draw();st.setup=false;return txt;}};}
});

/* =========================================================
   5. Multiply and divide by powers of ten
   ========================================================= */
const PV=[['thousands',3],['hundreds',2],['tens',1],['ones',0],['tenths',-1],['hundredths',-2],['thousandths',-3]];
P.lesson({id:'pow10_8',title:'Mental math with powers of ten',strand:'Number',codes:['B2.3'],
 guide:{goal:'Use mental math strategies to multiply and divide whole numbers and decimal numbers up to thousandths by powers of ten, and explain the strategies used.',words:'power of ten, place value, shift, 0.1, 0.01, 0.001, mental math',
  ask:['Why do the digits shift left when you multiply by 100?','Why is × 0.1 the same as ÷ 10?','What is 0.045 × 1000? How do you know?'],home:'Convert prices: what do 1000 items at $0.35 cost? What is one item if 100 cost $42?'},
 learn:[{say:'Digits shift, the point stays.',speech:'Multiplying by ten makes every digit ten times as big, so each digit shifts one place to the left. Multiplying by one hundred shifts two places. Watch three point four five six times one hundred become three hundred forty-five point six.',view:'model',demo:'mul'},
        {say:'Read the strategies.',speech:'Dividing by ten, one hundred or one thousand shifts the digits one, two or three places to the right. Multiplying by zero point one is the same as dividing by ten, and multiplying by zero point zero one is the same as dividing by one hundred.',view:'read'},
        {say:'Watch: divide by 1000.',speech:'Seventy-two divided by one thousand: the digits shift three places to the right. The answer is zero point zero seven two.',view:'model',demo:'div'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: shift the digits.',speech:'Your turn. Multiply and divide by powers of ten and watch the digits move.',view:'model'}],
 fig:'Digits slide across a place-value chart.',rz:.4,
 explore:['Press *× 10*, *× 100*, *× 1000*, or divide.','The *decimal point* stays still: the digits move.','Grey zeros hold empty places.'],
 howTo:'Shift the digits to show the answer, or choose it.',
 init:k=>({N:'3456',s:-3,target:null,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'When you multiply or divide by a *power of ten*, the *digits shift*; the decimal point stays still.')+14;
  [['× 10','1 place left','4.27 → 42.7'],['× 100','2 places left','4.27 → 427'],['× 1000','3 places left','0.045 → 45'],['÷ 10  (× 0.1)','1 place right','63 → 6.3'],['÷ 100  (× 0.01)','2 places right','5.2 → 0.052'],['÷ 1000  (× 0.001)','3 places right','72 → 0.072']].forEach(([a,b,c],i)=>{
    rr(g,X0,y+i*56,TW,48,12);g.fillStyle=tint(i<3?'#2f7de1':'#e2457a',.08+i%3*.03);g.fill();T(g,a,X0+18,y+i*56+33,FT.bodyB,i<3?'#2563eb':'#be185d');T(g,b,X0+300,y+i*56+33,FT.body);T(g,c,X0+TW-18,y+i*56+33,FT.bodyB,INK,'right');});y+=350;
  y=para(p,y,'*Explain it:* 3.456 × 100: each digit becomes 100 times as big, so the 3 ones become 3 hundreds: *345.6*.')+10;
  y=keyWords(p,y,[['power of ten','10, 100, 1000 … or 0.1, 0.01, 0.001'],['place value','the value of a digit’s position']]);
  predict(p,y,S,'p5','What is 6.08 ÷ 100?','*0.0608.* Two places right.');},
 readout(p,S,y){const g=p.g,st=S.st;T(g,val(st),X0,y+52,ZS(52),acc());return y+70;},
 build(S,grp,mode,game){const st=S.st,w=.56,x0=-1.95,z=-1.95;const X=p=>x0+(3-p)*w+w/2;const row=new THREE.Group();grp.add(row);
  PV.forEach(([n,p],i)=>{const pad=mk(new THREE.BoxGeometry(w-.04,.03,.9),lam(tint(p>=0?'#2f7de1':'#e2457a',.18+.04*(i%2))),20);pad.position.set(X(p),.015,z);grp.add(pad);const l=label(n,{size:.11,color:p>=0?'#2563eb':'#be185d'});l.position.set(X(p),.1,z+.6);grp.add(l);});
  const bead=mk(new THREE.SphereGeometry(.07,16,12),lam('#f5b301'),0);bead.position.set(X(0)+w/2,.1,z+.3);grp.add(bead);
  const big=label('',{size:.3,bg:'#ffffff'});big.position.set(0,1.05,-2.7);grp.add(big);
  function draw(){clearGroup(row);const L=st.N.length;const hi=Math.max(st.s+L-1,0),lo=Math.min(st.s,0);for(let p=hi;p>=lo;p--){const i=L-1-(p-st.s);const real=i>=0&&i<L;const c=digitCube(real?st.N[i]:'0',real?'#ffffff':'#e5e7eb',.36,real?'#1b2236':'#94a3b8');c.position.set(X(p),.2,z);row.add(c);}
    big.userData.set(val(st));check();A.redraw();}
  function mv(d,lab){const L=st.N.length;const ns=st.s+d;if(ns+L-1>3||ns<-3){A.bad('The digits would leave the chart.');return;}st.s=ns;A.pop();draw();row.position.x=d*w;tween(.4,k=>{row.position.x=d*w*(1-k);});if(lab)A.say(lab);}
  function check(){if(mode==='play'&&!st.setup&&st.target!=null&&st.s===st.target)game.solved('Yes! '+val(st)+'.');}
  draw();
  return {info:()=>val(st),
    controls:()=>{const c=[{t:'× 10',go:true,fn:()=>mv(1)},{t:'× 100',fn:()=>mv(2)},{t:'× 1000',fn:()=>mv(3)},{t:'÷ 10',fn:()=>mv(-1)},{t:'÷ 100',fn:()=>mv(-2)},{t:'÷ 1000',fn:()=>mv(-3)}];if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);return c;},
    demo(n){st.ask=null;st.target=null;if(n==='mul'){st.N='3456';st.s=-3;draw();A.seq([[900,()=>mv(2,'3.456 × 100 = 345.6')]]);}if(n==='div'){st.N='72';st.s=0;draw();A.seq([[900,()=>mv(-3,'72 ÷ 1000 = 0.072')]]);}},
    task(r){st.setup=true;st.ask=null;st.target=null;let txt;
      if(r===0){st.N=pick(['3456','2718','5094']);st.s=-3;st.target=-1;txt='Show *'+val(st)+' × 100*.';}
      else if(r===1){st.N=pick(['72','45','38']);st.s=0;st.target=-3;txt='Show *'+st.N+' ÷ 1000*.';}
      else if(r===2){st.N='45';st.s=-3;const a='45';st.ask={ans:a,o:shuffle([a,'4.5','450']),ok:'Yes! Three places left: 45.'};txt='What is *0.045 × 1000*? Try it on the chart.';}
      else if(r===3){st.N='52';st.s=-1;const a='0.052';st.ask={ans:a,o:shuffle([a,'0.52','520']),ok:'Yes! × 0.01 is ÷ 100: two places right.'};txt='What is *5.2 × 0.01*?';}
      else{st.N='63';st.s=0;st.ask={ans:'÷ 10',o:shuffle(['÷ 10','× 10','÷ 100']),ok:'Yes! × 0.1 means one tenth of the number.'};txt='Multiplying by *0.1* is the same as…';}
      draw();st.setup=false;return txt;}};}
});
function val(st){const L=st.N.length,s=st.s;let str;if(s>=0)str=st.N+'0'.repeat(s);else{const k=L+s;str=k>0?st.N.slice(0,k)+'.'+st.N.slice(k):'0.'+'0'.repeat(-k)+st.N;}if(str.includes('.')){const [a,b]=str.split('.');return (a.length>=5?sp(a):a)+'.'+b;}return str.length>=5?sp(str):str;}

/* =========================================================
   6. Adding and subtracting integers
   ========================================================= */
function frog(){const g=new THREE.Group();const b=mk(new THREE.SphereGeometry(.17,18,14),lam('#22c55e'),0);b.scale.set(1,.8,1.1);b.position.y=.15;g.add(b);
  [-1,1].forEach(s=>{const e=mk(new THREE.SphereGeometry(.06,12,10),lam('#ffffff'),0);e.position.set(s*.08,.3,.08);g.add(e);const pu=mk(new THREE.SphereGeometry(.03,10,8),lam(INK),0);pu.position.set(s*.08,.31,.13);g.add(pu);});return g;}
P.lesson({id:'intadd8',title:'Adding and subtracting integers',strand:'Number',codes:['B2.4'],
 guide:{goal:'Add and subtract integers, using appropriate strategies, in various contexts.',words:'integer, positive, negative, opposite, number line, zero',
  ask:['Why does adding a negative move left on the number line?','Why is subtracting −6 the same as adding 6?','How can temperatures help you think about integers?'],home:'Track the temperature at 7 a.m. and 3 p.m. for a week. Write each change as an integer equation.'},
 learn:[{say:'Hop along the line.',speech:'Start at negative four. Adding nine means nine hops to the right. The frog lands on five. Negative four plus nine equals five.',view:'model',demo:'add'},
        {say:'Read the rules.',speech:'Adding a positive moves right. Adding a negative moves left. Subtracting is adding the opposite: subtracting a negative six is the same as adding six.',view:'read'},
        {say:'Watch: subtract a negative.',speech:'Negative two minus negative six. Change it to negative two plus six. The frog hops six to the right and lands on four.',view:'model',demo:'subneg'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: hop the frog.',speech:'Your turn. Hop the frog to show each sum or difference.',view:'model'}],
 fig:'A frog hops along an integer number line.',rz:.4,
 explore:['Hop *+1*, *+5*, *−1* or *−5*.','*Start* puts the frog back at the first number.','Subtracting = adding the *opposite*.'],
 howTo:'Hop the frog to the answer, or choose it.',
 init:k=>({start:-4,pos:-4,target:null,expr:'',ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'On a number line, *adding a positive* moves right and *adding a negative* moves left.')+14;
  const ox=X0+30,w=TW-60,X=v=>ox+(v+8)/16*w,ly=y+70;g.strokeStyle=INK;g.lineWidth=3;g.beginPath();g.moveTo(ox,ly);g.lineTo(ox+w,ly);g.stroke();for(let v=-8;v<=8;v+=2){g.beginPath();g.moveTo(X(v),ly-8);g.lineTo(X(v),ly+8);g.stroke();T(g,sgn(v),X(v),ly+34,FT.cap,v<0?RED:v>0?BLUE:INK,'center');}
  g.strokeStyle='#16a36f';g.lineWidth=4;g.beginPath();g.moveTo(X(-4),ly-12);g.quadraticCurveTo((X(-4)+X(5))/2,ly-70,X(5),ly-12);g.stroke();T(g,'−4 + 9 = 5',(X(-4)+X(5))/2,ly-56,FT.smallB,'#16a36f','center');y+=130;
  rr(g,X0,y,TW,100,16);g.fillStyle=tint(acc(),.12);g.fill();T(g,'Subtract = add the opposite',X0+TW/2,y+40,FT.bodyB,acc(),'center');T(g,'−2 − (−6) = −2 + 6 = 4',X0+TW/2,y+80,ZS(32),INK,'center');y+=124;
  y=para(p,y,'*In context:* It is −7°C in the morning and the temperature rises 12°C. −7 + 12 = *5°C*.')+10;
  y=keyWords(p,y,[['integer','a whole number or its opposite: … −2, −1, 0, 1, 2 …'],['opposite','the same distance from 0 on the other side']]);
  predict(p,y,S,'p6','What is −6 + (−5)?','*−11.* Both move left.');},
 readout(p,S,y){const g=p.g,st=S.st;T(g,(st.expr||'start '+sgn(st.start))+'  →  '+sgn(st.pos),X0,y+50,ZS(40),acc());return y+66;},
 build(S,grp,mode,game){const st=S.st;const X=numLine(grp,-10,10,-2.1,2.1,-1.6,1,v=>v%2===0);const fg=frog();grp.add(fg);const marks=new THREE.Group();grp.add(marks);
  const big=label('',{size:.28,bg:'#ffffff'});big.position.set(0,1.1,-2.5);grp.add(big);let busy=Promise.resolve();
  function place(){fg.position.set(X(st.pos),.08,-1.6);big.userData.set(sgn(st.pos));}
  function drawMarks(){clearGroup(marks);const s=mk(new THREE.CylinderGeometry(.08,.08,.04,20),lam('#f5b301'),0);s.position.set(X(st.start),.06,-1.6);marks.add(s);const l=label('start',{size:.12,color:'#b45309'});l.position.set(X(st.start),.1,-1.25);marks.add(l);A.redraw();}
  function hopBy(d){busy=busy.then(()=>{const n=st.pos+d;if(n<-10||n>10){A.bad('Off the line!');return;}const steps=Math.abs(d),dir=Math.sign(d);let pr=Promise.resolve();for(let i=0;i<steps;i++)pr=pr.then(()=>{st.pos+=dir;return hop(fg,V(X(st.pos),.08,-1.6),.3,.22);});
      return pr.then(()=>{big.userData.set(sgn(st.pos));A.pop();A.redraw();check();});});}
  function check(){if(mode==='play'&&!st.setup&&st.target!=null&&st.pos===st.target)game.solved('Yes! '+st.expr+' = '+sgn(st.target)+'.');}
  function reset(){st.pos=st.start;place();A.redraw();}
  place();drawMarks();
  return {info:()=>sgn(st.pos),
    controls:()=>{const c=[{t:'−5',fn:()=>hopBy(-5)},{t:'−1',fn:()=>hopBy(-1)},{t:'+1',go:true,fn:()=>hopBy(1)},{t:'+5',fn:()=>hopBy(5)},{t:'Start',fn:reset}];if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);return c;},
    demo(n){st.ask=null;st.target=null;if(n==='add'){st.start=-4;st.expr='−4 + 9';reset();drawMarks();A.seq([[700,()=>hopBy(9)]]);}if(n==='subneg'){st.start=-2;st.expr='−2 − (−6) = −2 + 6';reset();drawMarks();A.seq([[900,()=>hopBy(6)]]);}},
    task(r){st.setup=true;st.ask=null;st.target=null;let txt;
      if(r===0){const a=-rnd(3,6),b=rnd(7,11);st.start=a;st.expr=sgn(a)+' + '+b;st.target=a+b;txt='Hop the frog to show *'+st.expr+'*.';}
      else if(r===1){const a=rnd(2,4),b=rnd(6,9);st.start=a;st.expr=a+' − '+b;st.target=a-b;txt='Hop the frog to show *'+st.expr+'*.';}
      else if(r===2){const a=-rnd(1,4),b=rnd(5,7);st.start=a;st.expr=sgn(a)+' − (−'+b+')';st.target=a+b;txt='Show *'+st.expr+'*. Subtracting a negative = adding the opposite.';}
      else if(r===3){st.start=-7;st.expr='';st.ask={ans:'5°C',o:shuffle(['5°C','−19°C','−5°C']),ok:'Yes! −7 + 12 = 5.'};txt='It is *−7°C* at dawn. The temperature *rises 12°C*. What is it now?';}
      else{st.start=-6;st.expr='';st.ask={ans:'−11',o:shuffle(['−11','−1','11']),ok:'Yes! Both move left: −11.'};txt='What is *−6 + (−5)*?';}
      reset();drawMarks();st.setup=false;return txt;}};}
});

/* =========================================================
   7. Multiplying and dividing integers
   ========================================================= */
P.lesson({id:'intmul8',title:'Multiplying and dividing integers',strand:'Number',codes:['B2.7'],
 guide:{goal:'Multiply and divide integers, using appropriate strategies, in various contexts.',words:'integer, product, quotient, sign rule, repeated addition, opposite',
  ask:['Why is 3 × (−4) negative?','Why is (−3) × (−4) positive?','How are the sign rules for division like those for multiplication?'],home:'A diver goes down 4 m every minute. Where is she after 5 minutes? Write it as an integer multiplication.'},
 learn:[{say:'Jumps of the same size.',speech:'Three times negative four means three jumps of negative four. The arrows go left: negative four, negative eight, negative twelve. Three times negative four is negative twelve.',view:'model',demo:'pn'},
        {say:'Read the sign rules.',speech:'If the signs are the same, the product or quotient is positive. If the signs are different, it is negative. A negative number of groups means the opposite direction.',view:'read'},
        {say:'Watch: negative times negative.',speech:'Negative two times negative five: the opposite of two jumps of negative five. Instead of going left, the jumps flip and go right. The answer is positive ten.',view:'model',demo:'nn'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: set the jumps.',speech:'Your turn. Set the number of jumps and the jump size, then press Jump.',view:'model'}],
 fig:'Arrows jump from 0 along an integer line.',rz:.4,
 explore:['Set the number of *jumps* (a) and the *size* (b).','Press *Jump!* to see a × b.','A negative number of jumps flips the direction.'],
 howTo:'Set the jumps and size, or choose the answer.',
 init:k=>({a:3,b:-4,shown:0,need:null,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'Multiplication is *repeated jumps*: 3 × (−4) = (−4) + (−4) + (−4) = *−12*.')+14;
  rr(g,X0,y,TW,44,12);g.fillStyle=tint(acc(),.16);g.fill();['Signs','Answer','Example'].forEach((h,i)=>T(g,h,X0+20+i*TW/3,y+30,FT.smallB,acc()));y+=48;
  [['(+) × (+)','positive','3 × 4 = 12'],['(+) × (−)','negative','3 × (−4) = −12'],['(−) × (+)','negative','(−3) × 4 = −12'],['(−) × (−)','positive','(−3) × (−4) = 12']].forEach((r,j)=>r.forEach((v,i)=>T(g,v,X0+20+i*TW/3,y+j*42+28,i===1?FT.bodyB:FT.body,i===1?(v==='positive'?BLUE:RED):INK)));y+=186;
  y=para(p,y,'*Division* follows the same rules: (−24) ÷ (−6) = *4*; 24 ÷ (−6) = *−4*.')+10;
  y=para(p,y,'*In context:* the temperature drops 3°C each hour for 4 hours: 4 × (−3) = *−12°C* change.')+10;
  y=keyWords(p,y,[['product','the answer to a multiplication'],['quotient','the answer to a division']]);
  predict(p,y,S,'p7','What is (−5) × (−6) ÷ 3?','*10.* 30 ÷ 3 = 10.');},
 readout(p,S,y){const g=p.g,st=S.st;T(g,par(st.a)+' × '+par(st.b)+' = '+sgn(st.a*st.b),X0,y+52,ZS(46),acc());return y+68;},
 build(S,grp,mode,game){const st=S.st;const X=numLine(grp,-12,12,-2.15,2.15,-1.5,1,v=>v%4===0);const arr=new THREE.Group();grp.add(arr);
  const big=label('',{size:.28,bg:'#ffffff'});big.position.set(0,1.25,-2.6);grp.add(big);
  function drawArr(n){clearGroup(arr);const dir=st.a<0?-1:1,b=st.b*dir;for(let i=0;i<n;i++){const from=i*b,to=(i+1)*b;const x0=X(from),x1=X(to),h=.25+.05*i;const pts=[];for(let k=0;k<=16;k++){const t=k/16;pts.push(V(x0+(x1-x0)*t,.1+Math.sin(Math.PI*t)*h,-1.5-.0));}
      const cur=new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts),24,.025,6),lam(st.a<0?'#e2457a':'#2f7de1'));arr.add(cur);const head=mk(new THREE.ConeGeometry(.06,.14,10),lam(st.a<0?'#e2457a':'#2f7de1'),0);head.position.set(x1,.12,-1.5);head.rotation.z=b>0?-Math.PI/2:Math.PI/2;arr.add(head);
      const l=label(sgn(to),{size:.13,color:INK});l.position.set(x1,.45+.05*i,-1.5);arr.add(l);}big.userData.set(par(st.a)+' × '+par(st.b)+(n===Math.abs(st.a)?' = '+sgn(st.a*st.b):''));A.redraw();}
  function jump(){const n=Math.abs(st.a);if(Math.abs(st.a*st.b)>12){A.bad('That goes off the line: keep a × b between −12 and 12.');return;}st.shown=0;drawArr(0);const s=[];for(let i=1;i<=n;i++)s.push([480,()=>{st.shown=i;drawArr(i);A.pop();}]);s.push([300,()=>{if(mode==='play'&&!st.setup&&st.need&&st.a===st.need[0]&&st.b===st.need[1])game.solved('Yes! '+par(st.a)+' × '+par(st.b)+' = '+sgn(st.a*st.b)+'.');}]);A.seq(s);}
  const set=(k,v)=>{st[k]=Math.max(-6,Math.min(6,v));if(st[k]===0)st[k]=v>0?1:-1;st.shown=0;drawArr(0);};
  drawArr(0);
  return {info:()=>par(st.a)+' × '+par(st.b),
    controls:()=>{const c=[{t:'jumps −',fn:()=>set('a',st.a-1)},{t:'jumps +',fn:()=>set('a',st.a+1)},{t:'size −',fn:()=>set('b',st.b-1)},{t:'size +',fn:()=>set('b',st.b+1)},{t:'Jump!',go:true,fn:jump}];if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);return c;},
    demo(n){st.ask=null;st.need=null;if(n==='pn'){st.a=3;st.b=-4;drawArr(0);A.seq([[600,jump]]);}if(n==='nn'){st.a=-2;st.b=-5;drawArr(0);A.seq([[700,jump]]);}},
    task(r){st.setup=true;st.ask=null;st.need=null;st.a=1;st.b=1;let txt;
      if(r===0){st.a=3;st.b=-4;st.ask={ans:'−12',o:shuffle(['−12','12','−7']),ok:'Yes! Different signs: negative.'};txt='What is *3 × (−4)*? Press Jump! to check.';}
      else if(r===1){st.ask={ans:'4',o:shuffle(['4','−4','−18']),ok:'Yes! Same signs: positive. 24 ÷ 6 = 4.'};txt='What is *(−24) ÷ (−6)*?';}
      else if(r===2){st.need=pick([[-2,5],[-3,-3],[2,-6]]);txt='Set the jumps and size to show *'+par(st.need[0])+' × '+par(st.need[1])+'*, then press *Jump!*';}
      else if(r===3){st.ask={ans:'−12°C',o:shuffle(['−12°C','12°C','−7°C']),ok:'Yes! 4 × (−3) = −12.'};txt='The temperature drops *3°C each hour* for *4 hours*. What is the total change?';}
      else{st.ask={ans:'positive',o:['positive','negative'],ok:'Yes! Same signs give a positive answer.'};txt='A negative number times a negative number is…';}
      drawArr(0);st.setup=false;return txt;}};}
});

/* =========================================================
   8. Adding and subtracting fractions
   ========================================================= */
P.lesson({id:'fracadd8',title:'Adding and subtracting fractions',strand:'Number',codes:['B2.5'],
 guide:{goal:'Add and subtract fractions, including mixed numbers, using appropriate strategies, in various contexts.',words:'common denominator, equivalent fraction, mixed number, improper fraction, lowest terms',
  ask:['Why do you need a common denominator to add fractions?','How do you subtract 1 3/4 from 2 1/3?','How can you check that your answer is reasonable?'],home:'Find a recipe that uses fractions. If you make one and a half batches, how much of each ingredient do you need?'},
 learn:[{say:'Make the pieces the same size.',speech:'Two thirds plus three quarters. The pieces are different sizes, so split both bars into twelfths. Two thirds is eight twelfths, three quarters is nine twelfths. Together they are seventeen twelfths, or one and five twelfths.',view:'model',demo:'add'},
        {say:'Read about mixed numbers.',speech:'To add or subtract mixed numbers, you can change them to improper fractions with a common denominator. Two and one third minus one and three quarters is twenty-eight twelfths minus twenty-one twelfths: seven twelfths.',view:'read'},
        {say:'Watch: subtract.',speech:'Three quarters minus one sixth. Split both into twelfths: nine twelfths minus two twelfths is seven twelfths.',view:'model',demo:'sub'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: combine the bars.',speech:'Your turn. Choose the fractions, make a common denominator, then add or subtract.',view:'model'}],
 fig:'Two fraction bars split into a common denominator, then combine.',rz:.35,
 explore:['Change the *top* and *bottom* fractions.','Press *Common denominator*.','Press *Add* or *Subtract*.'],
 howTo:'Use common denominators to find the answer, then choose it.',
 init:k=>({a:[2,3],b:[3,4],lcd:false,op:null,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'To add or subtract fractions, first rename them with a *common denominator*.')+14;
  const bar=(yy,n,d,col,lab)=>{const w=TW-180;for(let i=0;i<d;i++){g.fillStyle=i<n?col:'#f1f5f9';g.fillRect(X0+i*w/d,yy,w/d-3,40);}T(g,lab,X0+w+20,yy+30,FT.bodyB,INK);};
  bar(y,8,12,'#2f7de1','2/3 = 8/12');bar(y+52,9,12,'#e2457a','3/4 = 9/12');y+=106;
  T(g,'8/12 + 9/12 = 17/12 = 1 5/12',X0,y+30,ZS(34),acc());y+=66;
  rr(g,X0,y,TW,150,16);g.fillStyle=tint(acc(),.1);g.fill();T(g,'Mixed numbers',X0+20,y+34,FT.bodyB,acc());T(g,'2 1/3 − 1 3/4',X0+20,y+76,FT.body);T(g,'= 28/12 − 21/12 = 7/12',X0+20,y+116,FT.bodyB);y+=172;
  y=para(p,y,'*Check:* 2/3 + 3/4 is more than 1 because both are more than one half.')+10;
  y=keyWords(p,y,[['common denominator','a shared bottom number, like 12 for thirds and quarters'],['mixed number','a whole number and a fraction, like 1 5/12']]);
  predict(p,y,S,'p8','What is 1 1/2 + 2/5?','*1 9/10.* 15/10 + 4/10 = 19/10.');},
 readout(p,S,y){const g=p.g,st=S.st;const [n1,d1]=st.a,[n2,d2]=st.b;const L=d1*d2/gcd(d1,d2);let t=n1+'/'+d1+' and '+n2+'/'+d2;if(st.lcd)t=(n1*L/d1)+'/'+L+' and '+(n2*L/d2)+'/'+L;if(st.op){const r=st.op==='+'?n1*L/d1+n2*L/d2:n1*L/d1-n2*L/d2;t=n1+'/'+d1+' '+st.op.replace('-','−')+' '+n2+'/'+d2+' = '+r+'/'+L+' = '+mixed(r,L);}
  T(g,t,X0,y+50,ZS(38),acc());return y+66;},
 build(S,grp,mode,game){const st=S.st,Lw=1.9;const g2=new THREE.Group();grp.add(g2);
  function bar(n,d,parts,col,z,x0){const g=new THREE.Group();const w=Lw/parts;const per=parts/d;for(let i=0;i<parts;i++){const on=i<n*per;const m=mk(new THREE.BoxGeometry(w-.02,on?.16:.06,.4),lam(on?col:'#e2e8f0'),20);m.position.set(x0+(i+.5)*w,on?.08:.03,z);g.add(m);}
    for(let i=0;i<d;i++){const f=mk(new THREE.BoxGeometry(.02,.22,.44),lam(INK),0);f.position.set(x0+i*Lw/d,.11,z);g.add(f);}const f2=mk(new THREE.BoxGeometry(.02,.22,.44),lam(INK),0);f2.position.set(x0+Lw,.11,z);g.add(f2);return g;}
  function draw(){clearGroup(g2);const [n1,d1]=st.a,[n2,d2]=st.b;const L=d1*d2/gcd(d1,d2);const p1=st.lcd?L:d1,p2=st.lcd?L:d2;
    g2.add(bar(n1,d1,p1,'#2f7de1',-2.65,-2.1));g2.add(bar(n2,d2,p2,'#e2457a',-2.05,-2.1));
    const l1=label(st.lcd?(n1*L/d1)+'/'+L:n1+'/'+d1,{size:.22,bg:'#ffffff',border:'#2f7de1'});l1.position.set(.2,.35,-2.65);g2.add(l1);const l2=label(st.lcd?(n2*L/d2)+'/'+L:n2+'/'+d2,{size:.22,bg:'#ffffff',border:'#e2457a'});l2.position.set(.2,.35,-2.05);g2.add(l2);
    if(st.op){const r=st.op==='+'?n1*L/d1+n2*L/d2:n1*L/d1-n2*L/d2;const w=Lw/L;for(let i=0;i<Math.max(r,0);i++){const blue=st.op==='+'?i<n1*L/d1:true;const m=mk(new THREE.BoxGeometry(w-.02,.16,.4),lam(blue?'#2f7de1':'#e2457a'),20);m.position.set(-2.1+(i+.5)*w,.08,-1.4);g2.add(m);}
      [0,1,2].forEach(k=>{if(k*Lw<=Math.max(r,0)*w+1e-6){const f=mk(new THREE.BoxGeometry(.03,.28,.46),lam(INK),0);f.position.set(-2.1+k*Lw,.13,-1.4);g2.add(f);}});
      const lr=label('= '+r+'/'+L+' = '+mixed(r,L),{size:.24,bg:'#ffffff',border:acc()});lr.position.set(1.4,.45,-1.4);g2.add(lr);}A.redraw();}
  const FR=[[1,2],[2,3],[3,4],[1,6],[5,6],[2,5],[3,8],[1,4]];const cyc=k=>{const i=FR.findIndex(f=>f[0]===st[k][0]&&f[1]===st[k][1]);st[k]=FR[(i+1)%FR.length];st.lcd=false;st.op=null;A.pop();draw();};
  draw();
  return {info:()=>st.a.join('/')+' & '+st.b.join('/'),
    controls:()=>{const c=[{t:'Top fraction',fn:()=>cyc('a')},{t:'Bottom fraction',fn:()=>cyc('b')},{t:'Common denominator',go:true,fn:()=>{st.lcd=true;A.pop();draw();}},{t:'Add',fn:()=>{st.lcd=true;st.op='+';A.pop();draw();}},{t:'Subtract',fn:()=>{st.lcd=true;st.op='-';if(st.a[0]/st.a[1]<st.b[0]/st.b[1]){A.bad('Put the bigger fraction on top to subtract.');st.op=null;}draw();}}];
      if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);return c;},
    demo(n){st.ask=null;st.lcd=false;st.op=null;if(n==='add'){st.a=[2,3];st.b=[3,4];draw();A.seq([[900,()=>{st.lcd=true;draw();A.say('8/12 and 9/12');}],[1300,()=>{st.op='+';draw();A.say('17/12 = 1 5/12');}]]);}
      if(n==='sub'){st.a=[3,4];st.b=[1,6];draw();A.seq([[900,()=>{st.lcd=true;draw();}],[1200,()=>{st.op='-';draw();A.say('7/12');}]]);}},
    task(r){st.setup=true;st.ask=null;st.lcd=false;st.op=null;let txt;const Q=[[[2,3],[1,4],'+'],[[5,6],[3,8],'-'],[[3,4],[2,5],'+']];
      if(r<3){const [a,b,op]=Q[r];st.a=a;st.b=b;const L=a[1]*b[1]/gcd(a[1],b[1]);const res=op==='+'?a[0]*L/a[1]+b[0]*L/b[1]:a[0]*L/a[1]-b[0]*L/b[1];const ans=mixed(res,L);const wrong1=fr(op==='+'?a[0]+b[0]:a[0]-b[0],op==='+'?a[1]+b[1]:Math.abs(a[1]-b[1])||1);const wrong2=mixed(res+1,L);
        st.ask={ans,o:shuffle([...new Set([ans,wrong1,wrong2])]),ok:'Yes! '+a.join('/')+' '+(op==='+'?'+':'−')+' '+b.join('/')+' = '+ans+'.'};txt='Find *'+a.join('/')+' '+(op==='+'?'+':'−')+' '+b.join('/')+'*. Use the bars to help.';}
      else if(r===3){st.a=[1,3];st.b=[3,4];st.ask={ans:'7/12',o:shuffle(['7/12','1 7/12','1 1/12']),ok:'Yes! 28/12 − 21/12 = 7/12.'};txt='Find *2 1/3 − 1 3/4*.';}
      else{st.a=[1,2];st.b=[2,3];st.ask={ans:'1 1/6 cups',o:shuffle(['1 1/6 cups','3/5 cups','1 1/2 cups']),ok:'Yes! 3/6 + 4/6 = 7/6.'};txt='A recipe needs *1/2 cup* of oats and *2/3 cup* of flour. How much in all?';}
      draw();st.setup=false;return txt;}};}
});

/* =========================================================
   9. Multiplying and dividing fractions
   ========================================================= */
P.lesson({id:'fracmul8',title:'Multiplying and dividing fractions',strand:'Number',codes:['B2.6'],
 guide:{goal:'Multiply and divide fractions by fractions, as well as by whole numbers and mixed numbers, in various contexts.',words:'product, area model, reciprocal, quotient, mixed number, of',
  ask:['Why is 2/3 × 3/4 smaller than both fractions?','How many 1/8s fit into 3/4?','How do you multiply by a mixed number?'],home:'You have 2 1/4 pizzas. Each person eats 3/4 of a pizza. How many people can you feed? Draw it.'},
 learn:[{say:'Overlap the fractions.',speech:'Two thirds times three quarters. Shade two thirds of the square in blue, going across. Then shade three quarters in yellow, going down. The overlap, in green, is six twelfths of the square: one half.',view:'model',demo:'mul'},
        {say:'Read about dividing.',speech:'Dividing asks how many groups fit. Three quarters divided by one eighth: six eighths fit, so the answer is six. You can also multiply by the reciprocal: three quarters times eight is six.',view:'read'},
        {say:'Watch: a mixed number.',speech:'One and a half times two thirds. Change one and a half to three halves. Three halves times two thirds is six sixths, which is one.',view:'model',demo:'mix'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: overlap the fractions.',speech:'Your turn. Choose two fractions and see their product as an area.',view:'model'}],
 fig:'An area model: blue rows and yellow columns overlap in green.',rz:.35,
 explore:['Change the *blue* fraction (rows) and the *yellow* fraction (columns).','The *green* overlap is the product.','Count green cells out of all cells.'],
 howTo:'Set the fractions to make the product, or choose the answer.',
 init:k=>({a:[2,3],b:[3,4],need:null,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'*Multiply:* multiply the numerators and the denominators. The area model shows why.')+14;
  const s=180,ox=X0+20,oy=y;for(let i=0;i<3;i++)for(let j=0;j<4;j++){const b=i<2,yl=j<3;g.fillStyle=b&&yl?'#16a36f':b?'#93c5fd':yl?'#fde68a':'#f8fafc';g.fillRect(ox+j*s/4,oy+i*s/3,s/4-3,s/3-3);}
  T(g,'2/3 × 3/4 = 6/12 = 1/2',ox+s+30,oy+70,ZS(32),acc());T(g,'green: 6 of 12 cells',ox+s+30,oy+110,FT.body,GREY);y+=s+24;
  rr(g,X0,y,TW,150,16);g.fillStyle=tint(acc(),.1);g.fill();T(g,'Divide: how many groups fit?',X0+20,y+36,FT.bodyB,acc());T(g,'3/4 ÷ 1/8 = 6/8 ÷ 1/8 = 6',X0+20,y+78,FT.body);T(g,'or multiply by the reciprocal: 3/4 × 8/1 = 6',X0+20,y+118,FT.body);y+=170;
  y=para(p,y,'*Mixed numbers:* change to improper fractions first. 1 1/2 × 2/3 = 3/2 × 2/3 = *1*.')+10;
  y=keyWords(p,y,[['reciprocal','a fraction flipped: the reciprocal of 3/4 is 4/3'],['area model','a square split into rows and columns to show a product']]);
  predict(p,y,S,'p9','What is 2 1/4 ÷ 3/4?','*3.* 9/4 ÷ 3/4 = 3.');},
 readout(p,S,y){const g=p.g,st=S.st;const [a,b]=st.a,[c,d]=st.b;T(g,a+'/'+b+' × '+c+'/'+d+' = '+a*c+'/'+b*d+(fr(a*c,b*d)!==a*c+'/'+b*d?' = '+fr(a*c,b*d):''),X0,y+52,ZS(44),acc());return y+68;},
 build(S,grp,mode,game){const st=S.st,s=2.2,ox=-1.6,oz=-.75;const g2=new THREE.Group();grp.add(g2);
  function draw(){clearGroup(g2);const [a,b]=st.a,[c,d]=st.b;const ch=s/b,cw=s/d;for(let i=0;i<b;i++)for(let j=0;j<d;j++){const bl=i<a,yl=j<c;const h=bl&&yl?.22:bl||yl?.12:.04;const m=mk(new THREE.BoxGeometry(cw-.03,h,ch-.03),lam(bl&&yl?'#16a36f':bl?'#93c5fd':yl?'#fde68a':'#f8fafc'),20);m.position.set(ox+(j+.5)*cw,h/2,oz-s+(i+.5)*ch);g2.add(m);}
    const la=label(a+'/'+b,{size:.24,color:'#2563eb'});la.position.set(ox-.3,.2,oz-s+a*ch/2);g2.add(la);const lb=label(c+'/'+d,{size:.24,color:'#b45309'});lb.position.set(ox+c*cw/2,.2,oz-s-.25);g2.add(lb);
    const r=label(a*c+'/'+b*d+(fr(a*c,b*d)!==a*c+'/'+b*d?' = '+fr(a*c,b*d):''),{size:.3,bg:'#ffffff',border:'#16a36f'});r.position.set(1.65,.7,-1.9);g2.add(r);check();A.redraw();}
  const FR=[[1,2],[2,3],[3,4],[1,3],[3,5],[2,5],[5,6],[1,4],[4,5]];const cyc=k=>{const i=FR.findIndex(f=>f[0]===st[k][0]&&f[1]===st[k][1]);st[k]=FR[(i+1)%FR.length];A.pop();draw();};
  function check(){if(mode==='play'&&!st.setup&&st.need){const [a,b]=st.a,[c,d]=st.b;if(a*c*st.need[1]===b*d*st.need[0]&&((a===st.need[2]&&b===st.need[3])||(c===st.need[2]&&d===st.need[3])))game.solved('Yes! The green area is '+fr(st.need[0],st.need[1])+'.');}}
  draw();
  return {info:()=>st.a.join('/')+' × '+st.b.join('/'),
    controls:()=>{const c=[{t:'Blue fraction',go:true,fn:()=>cyc('a')},{t:'Yellow fraction',fn:()=>cyc('b')}];if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);return c;},
    demo(n){st.ask=null;st.need=null;if(n==='mul'){st.a=[1,1];st.b=[1,1];st.a=[2,3];st.b=[4,4];draw();A.seq([[900,()=>{st.b=[3,4];draw();A.say('6/12 = 1/2');}]]);}if(n==='mix'){st.a=[2,3];st.b=[1,2];draw();A.seq([[900,()=>A.say('3/2 × 2/3 = 6/6 = 1')]]);}},
    task(r){st.setup=true;st.ask=null;st.need=null;st.a=[1,2];st.b=[1,2];let txt;
      if(r===0){st.need=[2,5,3,5];st.a=[1,2];st.b=[1,2];txt='Set the fractions to show *3/5 × 2/3*. What is the product?';}
      else if(r===1){st.ask={ans:'2/5',o:shuffle(['2/5','5/8','6/8']),ok:'Yes! 6/15 = 2/5.'};st.a=[3,5];st.b=[2,3];txt='What is *3/5 × 2/3* in lowest terms?';}
      else if(r===2){st.ask={ans:'6',o:shuffle(['6','3/32','4']),ok:'Yes! Six eighths fit into three quarters.'};txt='What is *3/4 ÷ 1/8*?';}
      else if(r===3){st.ask={ans:'3',o:shuffle(['3','27/16','1 1/2']),ok:'Yes! 9/4 ÷ 3/4 = 3.'};txt='You have *2 1/4 pizzas*. Each person eats *3/4*. How many people can you feed?';}
      else{st.ask={ans:'1 1/2 cups',o:shuffle(['1 1/2 cups','2 2/3 cups','3/8 cups']),ok:'Yes! 3/4 × 2 = 6/4 = 1 1/2.'};txt='A recipe uses *3/4 cup* of milk. You make *2 batches*. How much milk?';}
      draw();st.setup=false;return txt;}};}
});

/* =========================================================
   10. Proportional reasoning
   ========================================================= */
P.lesson({id:'proportion8',title:'Comparing proportional situations',strand:'Number',codes:['B2.8'],
 guide:{goal:'Compare proportional situations and determine unknown values in proportional situations, and apply proportional reasoning to solve problems in various contexts.',words:'ratio, rate, proportion, unit rate, equivalent ratio, scale',
  ask:['How can you tell which juice is stronger?','How do you find x in 3/5 = x/20?','Which is the better buy: 6 for $4.20 or 10 for $6.50?'],home:'Compare two sizes of the same product at the store. Find the unit price of each. Which is the better buy?'},
 learn:[{say:'Which jug is stronger?',speech:'Jug A has two scoops of juice to three scoops of water. Jug B has three scoops to five. Compare the fractions of juice: two fifths is forty percent, three eighths is about thirty-seven point five percent. Jug A is stronger.',view:'model',demo:'compare'},
        {say:'Read about proportions.',speech:'A proportion says two ratios are equal. To find an unknown, scale both parts by the same factor. Three fifths equals x over twenty: five times four is twenty, so x is three times four, which is twelve.',view:'read'},
        {say:'Watch: make them equal.',speech:'To make jug B taste the same as jug A, its ratio must also be two to three. Four scoops of juice need six scoops of water.',view:'model',demo:'equal'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: mix the jugs.',speech:'Your turn. Add juice or water to each jug and compare their strengths.',view:'model'}],
 fig:'Two jugs of juice with stacked scoops.',rz:.35,
 explore:['Add *juice* or *water* to each jug.','The colour shows how strong the mix is.','Compare *juice ÷ total* for each jug.'],
 howTo:'Mix the jugs to match, or choose the answer.',
 init:k=>({A:{c:2,w:3},B:{c:3,w:5},need:false,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'To compare *proportional situations*, write each as a fraction, a decimal or a *unit rate*.')+14;
  [['Jug A','2 juice : 3 water','2/5 = 40%','#c2410c'],['Jug B','3 juice : 5 water','3/8 = 37.5%','#f59e0b']].forEach(([a,b,c,col],i)=>{rr(g,X0,y+i*70,TW,62,14);g.fillStyle=tint(col,.14);g.fill();T(g,a,X0+18,y+i*70+40,FT.bodyB,col);T(g,b,X0+160,y+i*70+40,FT.body);T(g,c,X0+TW-18,y+i*70+40,FT.bodyB,INK,'right');});y+=150;
  y=para(p,y,'*Jug A is stronger.*  *Unknown value:* 3/5 = x/20 → ×4 → *x = 12*.')+12;
  rr(g,X0,y,TW,130,16);g.fillStyle=tint(acc(),.1);g.fill();T(g,'Best buy: compare unit prices',X0+20,y+36,FT.bodyB,acc());T(g,'6 for $4.20 → $0.70 each',X0+20,y+76,FT.body);T(g,'10 for $6.50 → $0.65 each  ✓',X0+20,y+112,FT.bodyB,'#16a36f');y+=150;
  y=keyWords(p,y,[['proportion','an equation that says two ratios are equal'],['unit rate','a rate for one unit, like $0.65 per item']]);
  predict(p,y,S,'p10','A map scale is 1 : 50 000. How far is 4 cm on the map?','*2 km.* 200 000 cm = 2 km.');},
 readout(p,S,y){const g=p.g,st=S.st;const a=st.A.c/(st.A.c+st.A.w),b=st.B.c/(st.B.c+st.B.w);T(g,'A: '+st.A.c+':'+st.A.w+' = '+(a*100).toFixed(1)+'% juice   B: '+st.B.c+':'+st.B.w+' = '+(b*100).toFixed(1)+'%',X0,y+44,FT.bodyB,acc());T(g,Math.abs(a-b)<1e-9?'Same strength!':(a>b?'A':'B')+' is stronger',X0,y+86,ZS(36),acc());return y+96;},
 build(S,grp,mode,game){const st=S.st;const g2=new THREE.Group();grp.add(g2);const u=.1;
  function jug(o,x,name){const tot=o.c+o.w,f=o.c/tot;const col=new THREE.Color('#fff7ed').lerp(new THREE.Color('#c2410c'),Math.min(1,f*1.6));const H=tot*u;
    const glass=mk(new THREE.CylinderGeometry(.5,.45,1.35,32,1,true),new THREE.MeshLambertMaterial({color:'#e0f2fe',transparent:true,opacity:.25,side:THREE.DoubleSide,depthWrite:false}),0);glass.position.set(x,.7,-2.2);g2.add(glass);
    const liq=mk(new THREE.CylinderGeometry(.46,.44,Math.max(.01,H),32),new THREE.MeshLambertMaterial({color:col,transparent:true,opacity:.9}),0);liq.position.set(x,H/2+.03,-2.2);g2.add(liq);
    for(let i=0;i<tot;i++){const s=mk(G('pr8sc',()=>new THREE.CylinderGeometry(.09,.09,u*.85,14)),lam(i<o.c?'#c2410c':'#38bdf8'),0);s.position.set(x+.75,u/2+.03+i*u,-2.2);g2.add(s);}
    const l=label(name+'  '+o.c+' : '+o.w,{size:.2,bg:'#ffffff'});l.position.set(x+.2,1.6,-2.2);g2.add(l);}
  function draw(){clearGroup(g2);jug(st.A,-1.5,'A');jug(st.B,.65,'B');check();A.redraw();}
  const add=(j,k,d)=>{const o=st[j];o[k]=Math.max(k==='c'?1:0,Math.min(12,o[k]+d));if(o.c+o.w>12){o[k]-=d;A.bad('The jug is full!');}A.pop();draw();};
  function check(){if(mode==='play'&&!st.setup&&st.need&&st.A.c*st.B.w===st.B.c*st.A.w)game.solved('Yes! '+st.B.c+':'+st.B.w+' is equivalent to '+st.A.c+':'+st.A.w+'.');}
  draw();
  return {info:()=>'A '+st.A.c+':'+st.A.w+' B '+st.B.c+':'+st.B.w,
    controls:()=>{const c=[{t:'A juice +',fn:()=>add('A','c',1)},{t:'A water +',fn:()=>add('A','w',1)},{t:'B juice +',go:true,fn:()=>add('B','c',1)},{t:'B juice −',fn:()=>add('B','c',-1)},{t:'B water +',fn:()=>add('B','w',1)},{t:'B water −',fn:()=>add('B','w',-1)}];
      if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);return c;},
    demo(n){st.ask=null;st.need=false;if(n==='compare'){st.A={c:2,w:3};st.B={c:3,w:5};draw();A.say('40% vs 37.5%');}if(n==='equal'){st.A={c:2,w:3};st.B={c:4,w:2};draw();A.seq([3,4,5,6].map(w=>[550,()=>{st.B.w=w;draw();}]).concat([[400,()=>A.say('4 : 6 = 2 : 3')]]));}},
    task(r){st.setup=true;st.ask=null;st.need=false;st.A={c:2,w:3};st.B={c:3,w:5};let txt;
      if(r===0){st.A={c:3,w:4};st.B={c:4,w:6};st.ask={ans:'Jug A',o:['Jug A','Jug B','The same'],ok:'Yes! 3/7 ≈ 43% beats 4/10 = 40%.'};txt='Jug A is *3 : 4*, jug B is *4 : 6*. Which is *stronger*?';}
      else if(r===1){st.A={c:2,w:3};st.B={c:4,w:2};st.need=true;txt='Mix jug B so it tastes *exactly like* jug A (2 : 3).';}
      else if(r===2){st.ask={ans:'12',o:shuffle(['12','18','15']),ok:'Yes! × 4: 3 × 4 = 12.'};txt='Solve the proportion: *3/5 = x/20*.';}
      else if(r===3){st.ask={ans:'10 for $6.50',o:['6 for $4.20','10 for $6.50'],ok:'Yes! $0.65 each is less than $0.70.'};txt='Which is the *better buy*: *6 for $4.20* or *10 for $6.50*?';}
      else{st.ask={ans:'2 km',o:shuffle(['2 km','20 km','200 m']),ok:'Yes! 4 × 50 000 = 200 000 cm = 2 km.'};txt='A map scale is *1 : 50 000*. How far is *4 cm* on the map?';}
      draw();st.setup=false;return txt;}};}
});

/* =========================================================
   11. Order of operations with rational numbers
   ========================================================= */
function evalStep(tk){const close=tk.findIndex(t=>t.c);let s=0,e=tk.length-1,grp=false;if(close>=0){let o=close;while(o>=0&&!tk[o].o)o--;s=o+1;e=close-1;grp=true;
    if(e===s){return {tk:tk.slice(0,o).concat([tk[s]]).concat(tk.slice(close+1)),at:o,done:'brackets'};}}
  for(let i=s;i<=e;i++)if(tk[i].sq){const n=tk.slice();n[i]={v:r4(tk[i].v*tk[i].v)};return {tk:n,at:i,done:'square'};}
  let k=-1;for(let i=s;i<=e;i++)if(tk[i].op==='×'||tk[i].op==='÷'){k=i;break;}if(k<0)for(let i=s;i<=e;i++)if(tk[i].op==='+'||tk[i].op==='−'){k=i;break;}if(k<0)return null;
  const a=tk[k-1].v,b=tk[k+1].v,op=tk[k].op;const v=r4(op==='×'?a*b:op==='÷'?a/b:op==='+'?a+b:a-b);const n=tk.slice(0,k-1).concat([{v}]).concat(tk.slice(k+2));return {tk:n,at:k-1,done:op};}
function parse(str){return str.split(' ').map(t=>t==='('?{o:1}:t===')'?{c:1}:'+−×÷'.includes(t)?{op:t}:t.endsWith('²')?{v:+t.slice(0,-1).replace('−','-'),sq:1}:{v:+t.replace('−','-')});}
const tkStr=tk=>tk.map(t=>t.o?'(':t.c?')':t.op?t.op:(t.v<0?'('+sgn(t.v)+')':fmt(t.v))+(t.sq?'²':'')).join(' ').replace(/\( /g,'(').replace(/ \)/g,')');
P.lesson({id:'orderops8',title:'Multi-step problems and order of operations',strand:'Number',codes:['B2.1'],
 guide:{goal:'Use the properties and order of operations, and the relationships between operations, to solve problems involving rational numbers, ratios, rates and percents, including those requiring multiple steps or multiple operations.',words:'order of operations, brackets, exponent, rational number, multi-step, discount, tax',
  ask:['Why must multiplication come before addition in −2 + 3 × (−4)?','How can you find a price after a discount and tax in one step?','What happens if you work from left to right instead?'],home:'At a store, pick an item on sale. Find its final price with the discount and 13% HST, step by step.'},
 learn:[{say:'Brackets, exponents, then × ÷, then + −.',speech:'Negative two plus three times negative four. Multiplication comes before addition. Watch the blocks combine: three times negative four is negative twelve. Then negative two plus negative twelve is negative fourteen.',view:'model',demo:'ex1'},
        {say:'Read about multi-step problems.',speech:'Many real problems take several steps. A jacket costs eighty dollars with twenty-five percent off, then thirteen percent tax. Multiply by zero point seven five, then by one point one three. The final price is sixty-seven dollars and eighty cents.',view:'read'},
        {say:'Watch: brackets and squares.',speech:'Eighteen divided by negative three, plus two squared. First the square: four. Then the division: negative six. Then add: negative two.',view:'model',demo:'ex2'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: step through.',speech:'Your turn. Press Next step to combine the blocks in the right order.',view:'model'}],
 fig:'Expression blocks combine in the order of operations.',rz:.4,
 explore:['Press *Next step*: the gold operation goes first.','Order: *brackets*, *exponents*, *× ÷*, then *+ −*.','Press *Restart* to see it again.'],
 howTo:'Step through the expression, then choose the answer.',
 init:k=>({src:'−2 + 3 × −4',tk:null,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'Use the *order of operations* with integers, fractions and decimals too:')+12;
  [['B','Brackets','#e2457a'],['E','Exponents','#f59e0b'],['D M','Divide and multiply, left to right','#2f7de1'],['A S','Add and subtract, left to right','#16a36f']].forEach(([a,b,c],i)=>{rr(g,X0,y+i*54,TW,46,12);g.fillStyle=tint(c,.15);g.fill();T(g,a,X0+20,y+i*54+33,ZS(30),c);T(g,b,X0+120,y+i*54+33,FT.body);});y+=230;
  [['−2 + 3 × (−4)','= −2 + (−12) = −14'],['0.5 × (6 − 10) + 3','= 0.5 × (−4) + 3 = 1']].forEach(([a,b],i)=>{T(g,a,X0,y+i*76+28,FT.bodyB,acc());T(g,b,X0+40,y+i*76+62,FT.body);});y+=160;
  rr(g,X0,y,TW,96,16);g.fillStyle=tint(acc(),.1);g.fill();T(g,'$80 jacket, 25% off, then 13% tax',X0+20,y+36,FT.bodyB,acc());T(g,'80 × 0.75 × 1.13 = $67.80',X0+20,y+74,FT.body);y+=116;
  y=keyWords(p,y,[['order of operations','the agreed order for doing operations'],['multi-step problem','a problem that needs more than one operation']]);
  predict(p,y,S,'p11','What is (−3)² − 4 × 2?','*1.* 9 − 8 = 1.');},
 readout(p,S,y){const g=p.g,st=S.st;wrap(g,tkStr(st.tk||parse(st.src)),X0,y+46,TW,46,{font:ZS(40),color:acc()});return y+70;},
 build(S,grp,mode,game){const st=S.st;if(!st.tk)st.tk=parse(st.src);const g2=new THREE.Group();grp.add(g2);let pop=-1;
  function nextIdx(tk){const r=evalStep(tk);if(!r)return -1;return r;}
  function draw(){clearGroup(g2);const tk=st.tk;const peek=evalStep(tk);let hiOp=-1;if(peek){const close=tk.findIndex(t=>t.c);let s=0,e=tk.length-1;if(close>=0){let o=close;while(o>=0&&!tk[o].o)o--;s=o+1;e=close-1;}
      for(let i=s;i<=e&&hiOp<0;i++)if(tk[i].sq)hiOp=i;if(hiOp<0)for(let i=s;i<=e;i++)if(tk[i].op==='×'||tk[i].op==='÷'){hiOp=i;break;}if(hiOp<0)for(let i=s;i<=e;i++)if(tk[i].op){hiOp=i;break;}if(hiOp<0&&close>=0)hiOp=close;}
    const ws=tk.map(t=>t.o||t.c?.16:t.op?.34:.16+.13*tkStr([t]).length);const tot=ws.reduce((a,b)=>a+b+.06,0);let x=-tot/2;
    tk.forEach((t,i)=>{const w=ws[i];const cx=x+w/2;x+=w+.06;let m;if(t.op){m=mk(G('oo8disc',()=>new THREE.CylinderGeometry(.16,.16,.1,24)),lam(i===hiOp?'#f5b301':'#e2e8f0'),0);m.position.set(cx,.06,-1.9);}
      else if(t.o||t.c){m=mk(new THREE.BoxGeometry(.06,.5,.36),lam(i===hiOp?'#f5b301':'#e2457a'),0);m.position.set(cx,.25,-1.9);}else{m=mk(new THREE.BoxGeometry(w,.3,.42),lam(t.v<0?'#fecaca':'#bfdbfe'),20);m.position.set(cx,.15,-1.9);if(t.sq&&i===hiOp)m.material=lam('#fde68a');}
      g2.add(m);if(!(t.o||t.c)){const l=label(t.op?t.op:(t.v<0?sgn(t.v):fmt(t.v))+(t.sq?'²':''),{size:.2,color:INK});l.position.set(cx,t.op?.25:.45,-1.9);g2.add(l);}
      if(i===pop){m.scale.set(.3,.3,.3);tween(.35,k=>m.scale.set(.3+.7*k,.3+.7*k,.3+.7*k));}});
    const done=tk.length===1;const big=label(done?'= '+sgn(tk[0].v):'next: '+(hiOp>=0?(tk[hiOp].op||(tk[hiOp].sq?'square':'brackets')):''),{size:.24,bg:'#ffffff',border:done?'#16a36f':'#f5b301'});big.position.set(0,1.0,-2.4);g2.add(big);A.redraw();}
  function step(){const r=evalStep(st.tk);if(!r){A.say('Done: '+sgn(st.tk[0].v));return;}st.tk=r.tk;pop=r.at;A.pop();draw();pop=-1;}
  function restart(){st.tk=parse(st.src);draw();}
  draw();
  return {info:()=>tkStr(st.tk),
    controls:()=>{const c=[{t:'Next step',go:true,fn:step},{t:'Restart',fn:restart}];if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);return c;},
    demo(n){st.ask=null;if(n==='ex1'){st.src='−2 + 3 × −4';restart();A.seq([[1000,step],[1200,step]]);}if(n==='ex2'){st.src='18 ÷ −3 + 2²';restart();A.seq([[1000,step],[1100,step],[1100,step]]);}},
    task(r){st.setup=true;const Q=[['−2 + 3 × −4',['−14','−4','10']],['18 ÷ −3 + 2²',['−2','−10','2']],['0.5 × ( 6 − 10 ) + 3',['1','−5','5']],['80 × 0.75 × 1.13',['67.8','70.2','60']],['3 × −2.5 − −4',['−3.5','−11.5','3.5']]][r];
      st.src=Q[0];st.tk=parse(st.src);const ans=Q[1][0];st.ask={ans,o:shuffle(Q[1]),ok:'Yes! '+tkStr(parse(st.src))+' = '+ans+'.'};draw();st.setup=false;
      return r===3?'A *$80* jacket is *25% off*, then *13% tax* is added. Find the final price: *80 × 0.75 × 1.13*.':'Evaluate *'+tkStr(parse(st.src))+'*. Step through to check.';}};}
});
})();
