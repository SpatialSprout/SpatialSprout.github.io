/* The Interactive Classroom: Grade 8 Math — Algebra (12–18) and Data (19–24) */
(function(){
"use strict";
const P=window.PM;if(!P||P.failed||!P.THREE)return;
const {THREE,V,W,D,PY,PX,X0,TW,INK,RED,BLUE,GREY,VIBE,FT,ZS,G,M,lam,mk,unitBox,cellMat,label,starGeo,wedgeGeo,clearGroup,disposeObj,rr,T,wrap,para,header,keyWords,predict,box,caption,cxOf,cyOf,tint,moveTo,hop,tween,burst,easeOut,easeIO,A}=P;
const acc=()=>P.ACC;
const rnd=(a,b)=>a+Math.floor(Math.random()*(b-a+1)),pick=a=>a[Math.floor(Math.random()*a.length)],shuffle=a=>a.slice().sort(()=>Math.random()-.5);
const r4=v=>Math.round(v*10000)/10000;
const fmt=n=>{n=r4(n);return (n<0?'−':'')+String(Math.abs(n));};
const sgn=fmt;const par=v=>v<0?'('+fmt(v)+')':fmt(v);
const gcd=(a,b)=>b?gcd(b,a%b):Math.abs(a);const fr=(n,d)=>{const g=gcd(n,d)||1;n/=g;d/=g;return d===1?String(n):n+'/'+d;};
function choices(game,list,ans,ok,lab){return list.map(o=>({t:lab?lab(o):String(o),big:true,fn:()=>{if(o===ans){if(game)game.solved(ok);else A.good(ok);}else A.bad('Not quite. Try again!');}}));}
function seg(a,b,col,r){const len=a.distanceTo(b);const m=new THREE.Mesh(new THREE.CylinderGeometry(r,r,Math.max(.001,len),8),lam(col));m.position.copy(a).add(b).multiplyScalar(.5);m.quaternion.setFromUnitVectors(V(0,1,0),b.clone().sub(a).normalize());return m;}
/* linear expression text: m n + b */
const lin=(m,b,v)=>{v=v||'n';let s=m===1?v:m===-1?'−'+v:fmt(m)+v;if(!m)s='';if(b>0)s+=(s?' + ':'')+fmt(b);else if(b<0)s+=(s?' − ':'−')+fmt(-b);return s||'0';};
const linR=(m,b,v)=>{v=v||'n';if(m<0&&b>0)return fmt(b)+' − '+(m===-1?'':fmt(-m))+v;return lin(m,b,v);};
function seeded(s){return ()=>{s=(s*16807)%2147483647;return (s-1)/2147483646;};}

/* =========================================================
   12. Linear growing and shrinking patterns
   ========================================================= */
P.lesson({id:'linpat8',title:'Linear growing and shrinking patterns',strand:'Algebra',codes:['C1.1','C1.2'],
 guide:{goal:'Identify and compare repeating, growing and shrinking patterns, compare linear patterns by their constant rate and initial value, and represent them with tables, graphs, expressions and equations.',words:'linear pattern, constant rate, initial value, term number, growing, shrinking, equation',
  ask:['What is the constant rate of t = 3n + 2?','How can you tell from a table that a pattern is shrinking?','Which grows faster: t = 2n + 10 or t = 4n + 1?'],home:'A taxi charges $3.50 plus $2 per km. Make a table for 1 to 5 km and write an equation.'},
 learn:[{say:'Each step adds the same amount.',speech:'In a linear pattern, each term changes by the same amount: the constant rate. Ana’s pattern starts with three cubes and adds two each time. Its equation is t equals two n plus three. Watch the towers grow.',view:'model',demo:'grow'},
        {say:'Read about rate and initial value.',speech:'The constant rate is the number multiplied by n. The initial value is the constant added on: it is the value at term zero. A negative rate makes a shrinking pattern.',view:'read'},
        {say:'Watch: a shrinking pattern.',speech:'Now the rate is negative two and the initial value is fifteen. Each tower has two fewer cubes: thirteen, eleven, nine, seven, five. Its equation is t equals fifteen minus two n.',view:'model',demo:'shrink'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: set the rule.',speech:'Your turn. Change the rate and the initial value, and compare with the orange pattern.',view:'model'}],
 fig:'Towers of cubes for terms 1 to 5 of two linear patterns.',rz:.35,
 explore:['Change the *rate* and the *initial value* of the blue pattern.','The *orange* pattern is for comparing.','Read the equation t = rate × n + initial value.'],
 howTo:'Set the blue pattern to the rule, or choose the answer.',
 init:k=>({m:2,b:3,cmp:null,need:null,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'A *linear pattern* changes by a *constant rate* each term. The *initial value* is the term-0 value.')+14;
  rr(g,X0,y,TW,44,12);g.fillStyle=tint(acc(),.16);g.fill();['n',1,2,3,4,5].forEach((h,i)=>T(g,String(h),X0+40+i*(TW-60)/6,y+30,FT.smallB,acc(),'center'));y+=48;
  [['3 + 2n',[5,7,9,11,13],'#2f7de1'],['15 − 2n',[13,11,9,7,5],'#e4572e'],['0.5n + 1',[1.5,2,2.5,3,3.5],'#16a36f']].forEach(([e,vals,c],j)=>{T(g,e,X0+40,y+j*42+30,FT.smallB,c,'center');vals.forEach((v,i)=>T(g,fmt(v),X0+40+(i+1)*(TW-60)/6,y+j*42+30,FT.body,INK,'center'));});y+=146;
  y=para(p,y,'*t = 3 + 2n*: rate 2, initial value 3 (growing). *t = 15 − 2n*: rate −2, initial value 15 (shrinking).')+10;
  y=para(p,y,'*Compare:* t = 4n + 1 grows faster than t = 2n + 10 because its rate is greater, even though it starts lower.')+10;
  y=keyWords(p,y,[['constant rate','the amount added each term (the number times n)'],['initial value','the value when n = 0']]);
  predict(p,y,S,'p12','When does t = 4n + 1 pass t = 2n + 10?','*At n = 5:* 21 vs 20.');},
 readout(p,S,y){const g=p.g,st=S.st;T(g,'t = '+linR(st.m,st.b),X0,y+50,ZS(48),'#2563eb');T(g,'rate '+fmt(st.m)+' · initial value '+fmt(st.b)+(st.cmp?'   |   orange: t = '+linR(st.cmp[0],st.cmp[1]):''),X0,y+92,FT.bodyB);return y+100;},
 build(S,grp,mode,game){const st=S.st,u=.085;const g2=new THREE.Group();grp.add(g2);const cg=G('lp8c',()=>new THREE.BoxGeometry(u*.92,u*.92,u*.92));
  function tower(n,v,x,z,col){for(let i=0;i<Math.max(0,v);i++){const c=mk(cg,lam(col),0);c.position.set(x,u/2+i*u+.02,z);g2.add(c);}const l=label(fmt(v),{size:.15,color:col});l.position.set(x,Math.max(0,v)*u+.18,z);g2.add(l);}
  function draw(){clearGroup(g2);for(let n=1;n<=5;n++){const x=-1.9+(n-1)*.9;tower(n,st.m*n+st.b,x,-2.0,'#2f7de1');if(st.cmp)tower(n,st.cmp[0]*n+st.cmp[1],x+.3,-2.0,'#e4572e');const l=label('n = '+n,{size:.14,color:GREY});l.position.set(x+.15,.1,-1.55);g2.add(l);}
    const e=label('t = '+linR(st.m,st.b),{size:.24,bg:'#ffffff',border:'#2f7de1'});e.position.set(1.65,2.35,-2.5);g2.add(e);check();A.redraw();}
  const set=(k,v)=>{const lo=k==='m'?-3:0,hi=k==='m'?3:15;st[k]=Math.max(lo,Math.min(hi,v));for(let n=1;n<=5;n++)if(st.m*n+st.b>22||st.m*n+st.b<0){st[k]-=Math.sign(v-st[k])||0;}A.pop();draw();};
  function check(){if(mode==='play'&&!st.setup&&st.need&&st.m===st.need[0]&&st.b===st.need[1])game.solved('Yes! t = '+linR(st.m,st.b)+'.');}
  function adj(k,d){const old=st[k];st[k]+=d;const lo=k==='m'?-3:0,hi=k==='m'?3:15;let ok=st[k]>=lo&&st[k]<=hi;for(let n=1;n<=5;n++){const v=st.m*n+st.b;if(v>22||v<0)ok=false;}if(!ok){st[k]=old;A.bad('That pattern will not fit on the page.');return;}A.pop();draw();}
  draw();
  return {info:()=>'t = '+lin(st.m,st.b),
    controls:()=>{const c=[{t:'rate −',fn:()=>adj('m',-1)},{t:'rate +',go:true,fn:()=>adj('m',1)},{t:'initial −',fn:()=>adj('b',-1)},{t:'initial +',fn:()=>adj('b',1)},{t:'Compare',on:!!st.cmp,fn:()=>{st.cmp=st.cmp?null:[4,1];draw();}}];if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);return c;},
    demo(n){st.ask=null;st.need=null;st.cmp=null;if(n==='grow'){st.m=0;st.b=3;draw();A.seq([[800,()=>{st.m=1;draw();}],[800,()=>{st.m=2;draw();A.say('t = 2n + 3');}]]);}if(n==='shrink'){st.m=-2;st.b=15;draw();A.say('t = 15 − 2n');}},
    task(r){st.setup=true;st.ask=null;st.need=null;st.cmp=null;st.m=1;st.b=0;let txt;
      if(r===0){st.need=[pick([2,3]),pick([1,2,4])];txt='Set the blue pattern to *t = '+lin(st.need[0],st.need[1])+'*.';}
      else if(r===1){st.m=0;st.b=10;st.need=[-2,pick([12,14])];txt='Make the *shrinking* pattern *t = '+linR(st.need[0],st.need[1])+'*.';}
      else if(r===2){st.m=2;st.b=10;st.cmp=[4,1];st.ask={ans:'Orange: t = 4n + 1',o:['Blue: t = 2n + 10','Orange: t = 4n + 1'],ok:'Yes! Its constant rate, 4, is greater.'};txt='Which pattern *grows faster*?';}
      else if(r===3){st.m=4;st.b=7;st.ask={ans:'7',o:shuffle(['7','4','11']),ok:'Yes! The initial value is the constant, 7.'};txt='What is the *initial value* of *t = 4n + 7*?';}
      else{st.m=2;st.b=3;st.ask={ans:'c = 2d + 3.5',o:shuffle(['c = 2d + 3.5','c = 3.5d + 2','c = 5.5d']),ok:'Yes! Rate $2 per km, initial value $3.50.'};txt='A taxi costs *$3.50* plus *$2 per km*. Which equation gives the cost c for d km?';}
      draw();st.setup=false;return txt;}};}
});

/* =========================================================
   13. Pattern rules, predictions and missing terms
   ========================================================= */
P.lesson({id:'patrule8',title:'Pattern rules and predictions',strand:'Algebra',codes:['C1.3','C1.4'],
 guide:{goal:'Determine pattern rules and use them to extend patterns, make and justify predictions, and identify missing elements in patterns involving rational numbers, and create patterns that show relationships among rational numbers.',words:'pattern rule, term, extend, predict, missing term, algebraic expression, rational number',
  ask:['How do you find the rule for 5, 8, 11, 14?','How can you predict the 20th term without listing them all?','What pattern do 1/2, 1/4, 1/8 make?'],home:'Fold a sheet of paper in half again and again. Record the fraction of the sheet in one section each time. What is the rule?'},
 learn:[{say:'Find the rule from a graph.',speech:'Rohan’s terms are five, eight, eleven, fourteen. They go up by three, so the rule has three n. Term one is five, so add two. The rule is t equals three n plus two. Watch the points line up.',view:'model',demo:'rule'},
        {say:'Read about predictions.',speech:'With the rule, you can predict any term. The twentieth term is three times twenty plus two: sixty-two. To find a missing term, use the rule or the constant change.',view:'read'},
        {say:'Watch: a rational pattern.',speech:'Some patterns use fractions or decimals. One half, one quarter, one eighth: each term is half the term before. The next term is one sixteenth.',view:'model',demo:'half'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: extend the pattern.',speech:'Your turn. Extend the pattern and use the rule to predict.',view:'model'}],
 fig:'Pattern terms plotted as pegs on a graph.',rz:.35,
 explore:['Press *Extend* to add the next term.','Press *Show rule* to see it.','Hollow pegs are *missing terms*.'],
 howTo:'Find the rule, predict, or fill in the missing term.',
 init:k=>({kind:'lin',m:3,b:2,shown:4,miss:-1,rule:false,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'A *pattern rule* tells how to get any term. For a linear pattern, use *t = rate × n + initial value*.')+14;
  [['5, 8, 11, 14, …','+3 each time','t = 3n + 2'],['40, 34, ?, 22','−6 each time','missing: 28'],['0.5, 1.25, 2, 2.75','+0.75','next: 3.5'],['1/2, 1/4, 1/8, …','× 1/2','next: 1/16']].forEach(([a,b,c],i)=>{rr(g,X0,y+i*62,TW,54,12);g.fillStyle=tint(acc(),.06+i%2*.05);g.fill();T(g,a,X0+18,y+i*62+36,FT.bodyB,acc());T(g,b,X0+350,y+i*62+36,FT.body);T(g,c,X0+TW-18,y+i*62+36,FT.bodyB,INK,'right');});y+=266;
  y=para(p,y,'*Predict and justify:* term 20 of t = 3n + 2 is 3 × 20 + 2 = *62*: the rule works for every term.')+10;
  y=keyWords(p,y,[['pattern rule','a description or equation that gives every term'],['term number','the position n of a term']]);
  predict(p,y,S,'p13','Rule t = 7 − 0.5n. What is term 10?','*2.* 7 − 5 = 2.');},
 readout(p,S,y){const g=p.g,st=S.st;const vals=terms(st).slice(0,st.shown).map((v,i)=>i===st.miss?'?':st.kind==='half'?'1/'+Math.pow(2,i+1):fmt(v));T(g,vals.join(',  ')+', …',X0,y+46,ZS(38),acc());T(g,st.rule?'Rule: '+(st.kind==='half'?'each term × 1/2':'t = '+lin(st.m,st.b)):'Rule: ?',X0,y+88,FT.bodyB);return y+96;},
 build(S,grp,mode,game){const st=S.st;const g2=new THREE.Group();grp.add(g2);
  const board=mk(new THREE.BoxGeometry(4.4,.03,2.4),[lam('#f3f6fb'),lam('#f3f6fb'),cellMat('#ffffff',8,4),lam('#f3f6fb'),lam('#f3f6fb'),lam('#f3f6fb')],20);board.position.set(0,.015,-1.9);grp.add(board);
  function draw(){clearGroup(g2);const t=terms(st);const mx=Math.max(...t.slice(0,8).map(Math.abs),1);const sc=1.9/mx;t.slice(0,st.shown).forEach((v,i)=>{const x=-1.95+i*.55,h=Math.max(.02,v*sc);const hol=i===st.miss;
      const pole=mk(new THREE.CylinderGeometry(.025,.025,h,8),lam(hol?'#cbd5e1':'#94a3b8'),0);pole.position.set(x,h/2,-1.9);g2.add(pole);const b=mk(new THREE.SphereGeometry(.09,14,10),hol?new THREE.MeshLambertMaterial({color:'#ffffff',transparent:true,opacity:.6}):lam(acc()),0);b.position.set(x,h,-1.9);g2.add(b);
      const l=label(hol?'?':st.kind==='half'?'1/'+Math.pow(2,i+1):fmt(v),{size:.15,bg:'#ffffff'});l.position.set(x,h+.25,-1.9);g2.add(l);const nl=label(String(i+1),{size:.13,color:GREY});nl.position.set(x,.08,-.6);g2.add(nl);});
    if(st.rule){const e=label(st.kind==='half'?'× 1/2 each term':'t = '+lin(st.m,st.b),{size:.24,bg:'#ffffff',border:acc()});e.position.set(1.2,2.3,-2.6);g2.add(e);}A.redraw();}
  draw();
  return {info:()=>st.shown+' terms',
    controls:()=>{const c=[{t:'Extend',go:true,fn:()=>{if(st.shown>=8){A.bad('The board is full.');return;}st.shown++;A.pop();draw();}},{t:'Show rule',on:st.rule,fn:()=>{st.rule=!st.rule;draw();}}];if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);return c;},
    demo(n){st.ask=null;st.miss=-1;if(n==='rule'){st.kind='lin';st.m=3;st.b=2;st.shown=1;st.rule=false;draw();A.seq([[600,()=>{st.shown=2;draw();}],[600,()=>{st.shown=3;draw();}],[600,()=>{st.shown=4;draw();}],[800,()=>{st.rule=true;draw();}]]);}
      if(n==='half'){st.kind='half';st.shown=3;st.rule=false;draw();A.seq([[1000,()=>{st.shown=4;st.rule=true;draw();A.say('1/16');}]]);}},
    task(r){st.setup=true;st.ask=null;st.miss=-1;st.rule=false;st.kind='lin';st.shown=4;let txt;
      if(r===0){st.m=pick([3,4]);st.b=pick([1,2]);const a='t = '+lin(st.m,st.b);st.ask={ans:a,o:shuffle([a,'t = '+lin(st.b,st.m),'t = '+lin(st.m,st.m+st.b)]),ok:'Yes! Rate '+st.m+', initial value '+st.b+'.'};txt='Find the *pattern rule*.';}
      else if(r===1){st.m=3;st.b=2;st.rule=true;st.ask={ans:'62',o:shuffle(['62','60','23']),ok:'Yes! 3 × 20 + 2 = 62.'};txt='*Predict* term 20 of t = 3n + 2.';}
      else if(r===2){st.m=-6;st.b=46;st.miss=2;st.ask={ans:'28',o:shuffle(['28','30','26']),ok:'Yes! 34 − 6 = 28.'};txt='Find the *missing term*.';}
      else if(r===3){st.m=.75;st.b=-.25;st.ask={ans:'3.5',o:shuffle(['3.5','3.25','4']),ok:'Yes! + 0.75 each time.'};txt='Find the *next term* of this decimal pattern.';}
      else{st.kind='half';st.shown=3;st.ask={ans:'1/16',o:shuffle(['1/16','1/10','1/12']),ok:'Yes! Each term is half the last: 1/8 × 1/2 = 1/16.'};txt='What is the *next term* after 1/2, 1/4, 1/8?';}
      draw();st.setup=false;return txt;}};}
});
function terms(st){return Array.from({length:8},(_,i)=>st.kind==='half'?Math.pow(.5,i+1):r4(st.m*(i+1)+st.b));}

/* =========================================================
   14. Adding and subtracting monomials and binomials
   ========================================================= */
function tileSet(e,x0,z0,grp,dim){const out=[];const xs=Math.abs(e.x),cs=Math.abs(e.c);for(let i=0;i<xs;i++){const m=mk(G('bt8x',()=>new THREE.BoxGeometry(.13,.06,.62)),lam(e.x>0?'#16a36f':'#e4572e'),20);m.position.set(x0+i*.17,.04,z0);grp.add(m);out.push({m,kind:'x',pos:e.x>0});}
  for(let i=0;i<cs;i++){const m=mk(G('bt8u',()=>new THREE.BoxGeometry(.13,.06,.13)),lam(e.c>0?'#f5b301':'#e4572e'),20);m.position.set(x0+xs*.17+.08+(i%4)*.17,.04,z0-.24+Math.floor(i/4)*.17);grp.add(m);out.push({m,kind:'u',pos:e.c>0});if(dim)m.material=lam('#cbd5e1');}return out;}
P.lesson({id:'binom8',title:'Adding binomials with algebra tiles',strand:'Algebra',codes:['C2.1'],
 guide:{goal:'Add and subtract monomials with a degree of 1, and add binomials with a degree of 1 that involve integers, using tools.',words:'monomial, binomial, like terms, coefficient, zero pair, algebra tile, simplify',
  ask:['Why can you combine 2x and 3x but not 2x and 3?','What is a zero pair of x-tiles?','How do you find the perimeter of a rectangle with sides x + 2 and 2x?'],home:'Make algebra tiles from paper: long strips for x, small squares for 1. Show (2x + 3) + (x − 5).'},
 learn:[{say:'Combine like terms.',speech:'Elena adds two x plus three, plus x minus five. Green bars are x tiles. Yellow squares are plus one. Red is negative. Push the tiles together: three x tiles, three yellows and five reds. Three zero pairs vanish, leaving three x minus two.',view:'model',demo:'add'},
        {say:'Read about like terms.',speech:'Like terms have the same variable part. You can combine x terms with x terms and numbers with numbers. A positive tile and a negative tile of the same kind make a zero pair.',view:'read'},
        {say:'Watch: negative x tiles.',speech:'Four x minus one, plus negative two x minus three. Two zero pairs of x tiles vanish, and the numbers make negative four. The answer is two x minus four.',view:'model',demo:'neg'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: build and combine.',speech:'Your turn. Build both binomials, then combine them and remove the zero pairs.',view:'model'}],
 fig:'Algebra tiles for two binomials combine and zero pairs vanish.',rz:.35,
 explore:['Change each binomial’s *x* and *number* parts.','Press *Combine*, then *Remove zero pairs*.','Green/yellow = positive, red = negative.'],
 howTo:'Combine the tiles, then choose the simplified expression.',
 init:k=>({e1:{x:2,c:3},e2:{x:1,c:-5},stage:0,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'A *monomial* is one term, like 3x or −5. A *binomial* has two terms, like 2x + 3. To add, *combine like terms*.')+14;
  const tile=(x,yy,w,h,c)=>{g.fillStyle=c;g.fillRect(x,yy,w,h);};tile(X0,y,22,80,'#16a36f');T(g,'x',X0+40,y+50,FT.bodyB);tile(X0+90,y+30,22,22,'#f5b301');T(g,'+1',X0+126,y+50,FT.bodyB);tile(X0+190,y,22,80,'#e4572e');T(g,'−x',X0+226,y+50,FT.bodyB);tile(X0+290,y+30,22,22,'#e4572e');T(g,'−1',X0+326,y+50,FT.bodyB);
  T(g,'zero pair: x + (−x) = 0',X0+420,y+50,FT.smallB,acc());y+=110;
  [['(2x + 3) + (x − 5)','= 3x − 2'],['(4x − 1) + (−2x − 3)','= 2x − 4'],['5x − 2x','= 3x'],['3x − (−2x)','= 5x']].forEach(([a,b],i)=>{T(g,a,X0,y+i*48+30,FT.bodyB,acc());T(g,b,X0+430,y+i*48+30,FT.bodyB);});y+=208;
  y=para(p,y,'*Perimeter* of a rectangle with sides x + 2 and 2x: (x + 2) + 2x + (x + 2) + 2x = *6x + 4*.')+10;
  y=keyWords(p,y,[['like terms','terms with the same variable part, like 4x and −x'],['binomial','an expression with two terms']]);
  predict(p,y,S,'p14','Simplify (−x + 6) + (3x − 2).','*2x + 4.*');},
 readout(p,S,y){const g=p.g,st=S.st;const e=(o)=>'('+lin(o.x,o.c,'x')+')';T(g,e(st.e1)+' + '+e(st.e2),X0,y+44,FT.bodyB,INK);if(st.stage)T(g,'= '+lin(st.e1.x+st.e2.x,st.e1.c+st.e2.c,'x'),X0,y+92,ZS(46),acc());return y+100;},
 build(S,grp,mode,game){const st=S.st;const g2=new THREE.Group();grp.add(g2);
  function draw(){clearGroup(g2);const [t1,t2]=[0,1].map(i=>new THREE.Group());if(st.stage===0){[[st.e1,-2.1],[st.e2,.25]].forEach(([e,x0],i)=>{const tray=mk(new THREE.BoxGeometry(2.1,.02,.9),lam(i?'#fdf2f8':'#ecfdf5'),20);tray.position.set(x0+.95,.01,-2.3);g2.add(tray);tileSet(e,x0,-2.3,g2);const l=label('('+lin(e.x,e.c,'x')+')',{size:.2,bg:'#ffffff'});l.position.set(x0+.95,.4,-1.75);g2.add(l);});}
    else{const tray=mk(new THREE.BoxGeometry(4.3,.02,1.2),lam('#f8fafc'),20);tray.position.set(0,.01,-2.1);g2.add(tray);const X=st.e1.x+st.e2.x,C=st.e1.c+st.e2.c;
      if(st.stage===1){const posX=Math.max(st.e1.x,0)+Math.max(st.e2.x,0),negX=Math.max(-st.e1.x,0)+Math.max(-st.e2.x,0),posC=Math.max(st.e1.c,0)+Math.max(st.e2.c,0),negC=Math.max(-st.e1.c,0)+Math.max(-st.e2.c,0);
        tileSet({x:posX,c:0},-2.0,-2.3,g2);tileSet({x:-negX,c:0},-2.0,-1.7,g2);tileSet({x:0,c:posC},.4,-2.3,g2);tileSet({x:0,c:-negC},.4,-1.75,g2);
        const zp=Math.min(posX,negX)+Math.min(posC,negC);const l=label(zp+' zero pair'+(zp===1?'':'s'),{size:.2,color:'#c2410c'});l.position.set(0,.5,-1.2);g2.add(l);}
      else{tileSet({x:X,c:0},-2.0,-2.1,g2);tileSet({x:0,c:C},.4,-2.1,g2);const l=label('= '+lin(X,C,'x'),{size:.3,bg:'#ffffff',border:acc()});l.position.set(0,.6,-1.3);g2.add(l);}}A.redraw();}
  const adj=(e,k,d)=>{st[e][k]=Math.max(-4,Math.min(4,st[e][k]+d));st.stage=0;A.pop();draw();};
  function go(){if(st.stage===0){st.stage=1;A.pop();draw();}else if(st.stage===1){st.stage=2;A.pop();draw();A.say(lin(st.e1.x+st.e2.x,st.e1.c+st.e2.c,'x'));}}
  draw();
  return {info:()=>'stage '+st.stage,
    controls:()=>{const c=[{t:st.stage===0?'Combine':'Remove zero pairs',go:true,fn:go},{t:'Reset',fn:()=>{st.stage=0;draw();}},{t:'1st x −',fn:()=>adj('e1','x',-1)},{t:'1st x +',fn:()=>adj('e1','x',1)},{t:'1st # −',fn:()=>adj('e1','c',-1)},{t:'1st # +',fn:()=>adj('e1','c',1)},{t:'2nd x −',fn:()=>adj('e2','x',-1)},{t:'2nd x +',fn:()=>adj('e2','x',1)},{t:'2nd # −',fn:()=>adj('e2','c',-1)},{t:'2nd # +',fn:()=>adj('e2','c',1)}];
      if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c.slice(0,2));return c;},
    demo(n){st.ask=null;st.stage=0;if(n==='add'){st.e1={x:2,c:3};st.e2={x:1,c:-5};}else{st.e1={x:4,c:-1};st.e2={x:-2,c:-3};}draw();A.seq([[1100,go],[1500,go]]);},
    task(r){st.setup=true;st.stage=0;const Q=[[{x:2,c:3},{x:1,c:-5}],[{x:4,c:-1},{x:-2,c:-3}],[{x:-1,c:4},{x:3,c:-2}],[{x:3,c:2},{x:-3,c:1}],[{x:1,c:2},{x:2,c:0}]][r];st.e1=Q[0];st.e2=Q[1];const X=Q[0].x+Q[1].x,C=Q[0].c+Q[1].c;const ans=lin(X,C,'x');
      const o=new Set([ans,lin(X,Q[0].c-Q[1].c,'x'),lin(Q[0].x-Q[1].x||X+2,C,'x'),lin(X+C,0,'x')]);st.ask={ans,o:shuffle([...o].slice(0,3)),ok:'Yes! '+ans+'.'};let txt='Simplify *('+lin(Q[0].x,Q[0].c,'x')+') + ('+lin(Q[1].x,Q[1].c,'x')+')*. Combine the tiles to check.';
      if(r===4){st.ask={ans:'6x + 4',o:shuffle(['6x + 4','3x + 2','2x² + 4x']),ok:'Yes! 2(x + 2) + 2(2x) = 6x + 4.'};txt='A rectangle has sides *x + 2* and *2x*. What is its *perimeter*? (Add all four sides.)';}
      draw();st.setup=false;return txt;}};}
});

/* =========================================================
   15. Evaluating expressions with rational numbers
   ========================================================= */
const EXS=[{e:'3x − 2',f:x=>3*x-2,s:x=>'3'+par(x)+' − 2'},{e:'x ÷ 4 + 5',f:x=>x/4+5,s:x=>par(x)+' ÷ 4 + 5'},{e:'−2x + 1.5',f:x=>-2*x+1.5,s:x=>'−2'+par(x)+' + 1.5'},{e:'x² − 1',f:x=>x*x-1,s:x=>par(x)+'² − 1'}];
P.lesson({id:'eval8',title:'Evaluating algebraic expressions',strand:'Algebra',codes:['C2.2'],
 guide:{goal:'Evaluate algebraic expressions that involve rational numbers.',words:'evaluate, substitute, variable, expression, rational number, formula',
  ask:['What does it mean to substitute −1.5 for x?','Why do brackets help when you substitute a negative number?','How is a formula an expression you evaluate?'],home:'Use the formula C = 2.5h + 4 for a bike rental (h hours). Evaluate it for 0.5, 2 and 3.5 hours.'},
 learn:[{say:'Feed the machine.',speech:'Jalen’s expression machine follows its rule. Put in x equals negative one point five. The machine computes three times negative one point five, minus two. Out comes negative six point five.',view:'model',demo:'run'},
        {say:'Read about substituting.',speech:'To evaluate, replace each variable with its value, then follow the order of operations. Put negative numbers and fractions in brackets so the signs stay clear.',view:'read'},
        {say:'Watch: a different rule.',speech:'Change the rule to x divided by four, plus five. Put in negative eight. Negative eight divided by four is negative two, plus five is three.',view:'model',demo:'run2'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: run the machine.',speech:'Your turn. Choose a rule and an input, then run the machine.',view:'model'}],
 fig:'An expression machine turns an input into an output.',rz:.35,
 explore:['Choose a *rule*.','Change the *input* x.','Press *Run* to evaluate.'],
 howTo:'Evaluate the expression, or set the input that gives the output.',
 init:k=>({ri:0,x:-1.5,out:null,need:null,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'To *evaluate* an expression, *substitute* the value for the variable, then use the order of operations.')+14;
  [['3x − 2, x = −1.5','3(−1.5) − 2 = −4.5 − 2 = −6.5'],['x ÷ 4 + 5, x = −8','(−8) ÷ 4 + 5 = −2 + 5 = 3'],['2a − b, a = 1/2, b = −3','2(1/2) − (−3) = 1 + 3 = 4'],['A = lw ÷ 2, l = 6.4, w = 2.5','6.4 × 2.5 ÷ 2 = 8']].forEach(([a,b],i)=>{rr(g,X0,y+i*84,TW,76,14);g.fillStyle=tint(acc(),.06+i%2*.05);g.fill();T(g,a,X0+18,y+i*84+32,FT.bodyB,acc());T(g,b,X0+18,y+i*84+62,FT.body);});y+=350;
  y=para(p,y,'*Tip:* use brackets for negative values: 3(−1.5), not 3 − 1.5.')+10;
  y=keyWords(p,y,[['substitute','replace a variable with a number'],['evaluate','find the value of an expression']]);
  predict(p,y,S,'p15','Evaluate x² − 1 for x = −3.','*8.* (−3)² = 9, then 9 − 1.');},
 readout(p,S,y){const g=p.g,st=S.st,E=EXS[st.ri];T(g,E.e+',  x = '+fmt(st.x),X0,y+44,FT.bodyB,INK);T(g,st.out==null?'Press Run.':'= '+E.s(st.x)+' = '+fmt(E.f(st.x)),X0,y+90,ZS(38),acc());return y+100;},
 build(S,grp,mode,game){const st=S.st;const g2=new THREE.Group();grp.add(g2);
  const body=mk(new THREE.BoxGeometry(1.5,1.0,1.0),lam('#8b5cf6'),0);body.position.set(0,.55,-2.1);grp.add(body);const hopper=mk(new THREE.CylinderGeometry(.35,.15,.4,4,1,true),new THREE.MeshLambertMaterial({color:'#a78bfa',side:THREE.DoubleSide}),0);hopper.position.set(-.45,1.25,-2.1);hopper.rotation.y=Math.PI/4;grp.add(hopper);
  const chute=mk(new THREE.BoxGeometry(.6,.08,.5),lam('#c4b5fd'),0);chute.position.set(1.05,.25,-2.1);chute.rotation.z=-.3;grp.add(chute);const gear=mk(new THREE.TorusGeometry(.22,.06,8,16),lam('#f5b301'),0);gear.position.set(.25,.6,-1.59);grp.add(gear);
  const tag=label('',{size:.22,bg:'#ffffff',border:'#8b5cf6'});tag.position.set(0,.6,-1.5);grp.add(tag);let cin=null,cout=null,spin=0;
  function cube(t,col){const c=new THREE.Group();const m=mk(new THREE.BoxGeometry(.32,.32,.32),lam(col),0);c.add(m);const l=label(t,{size:.18,bg:'#ffffff'});l.position.y=.36;c.add(l);return c;}
  function draw(){clearGroup(g2);tag.userData.set(EXS[st.ri].e);cin=cube(fmt(st.x),'#38bdf8');cin.position.set(-1.7,.18,-2.1);g2.add(cin);if(st.out!=null){cout=cube(fmt(st.out),'#16a36f');cout.position.set(1.65,.18,-1.6);g2.add(cout);}A.redraw();}
  function run(){st.out=null;draw();const v=EXS[st.ri].f(st.x);hop(cin,V(-.45,1.3,-2.1),.6,.6).then(()=>{cin.visible=false;spin=1.2;return tween(.9,k=>{});}).then(()=>{st.out=r4(v);draw();cout.position.set(.9,.5,-2.1);return hop(cout,V(1.65,.18,-1.6),.3,.45);}).then(()=>{A.pop();A.say(EXS[st.ri].s(st.x)+' = '+fmt(v));A.redraw();
      if(mode==='play'&&!st.setup&&st.need!=null&&Math.abs(v-st.need)<1e-9)game.solved('Yes! x = '+fmt(st.x)+' gives '+fmt(v)+'.');});}
  const setX=d=>{st.x=Math.max(-10,Math.min(10,r4(st.x+d)));st.out=null;A.pop();draw();};
  draw();
  return {tick(dt){if(spin>0){spin-=dt;gear.rotation.z+=dt*8;}},info:()=>EXS[st.ri].e+' x='+st.x,
    controls:()=>{const c=[{t:'Run',go:true,fn:run},{t:'x −1',fn:()=>setX(-1)},{t:'x −0.5',fn:()=>setX(-.5)},{t:'x +0.5',fn:()=>setX(.5)},{t:'x +1',fn:()=>setX(1)},{t:'Next rule',fn:()=>{st.ri=(st.ri+1)%EXS.length;st.out=null;draw();}}];if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);return c;},
    demo(n){st.ask=null;st.need=null;st.out=null;if(n==='run'){st.ri=0;st.x=-1.5;draw();A.seq([[700,run]]);}if(n==='run2'){st.ri=1;st.x=-8;draw();A.seq([[700,run]]);}},
    task(r){st.setup=true;st.ask=null;st.need=null;st.out=null;let txt;
      if(r===0){st.ri=0;st.x=pick([-1.5,-2.5,0.5]);const v=fmt(3*st.x-2);st.ask={ans:v,o:shuffle([v,fmt(3*st.x+2),fmt(-3*st.x-2)]),ok:'Yes! '+EXS[0].s(st.x)+' = '+v+'.'};txt='Evaluate *3x − 2* for *x = '+fmt(st.x)+'*.';}
      else if(r===1){st.ri=1;st.x=-8;st.ask={ans:'3',o:shuffle(['3','−7','7']),ok:'Yes! −2 + 5 = 3.'};txt='Evaluate *x ÷ 4 + 5* for *x = −8*.';}
      else if(r===2){st.ri=0;st.x=0;st.need=10;txt='Find the input x that makes *3x − 2* output *10*. Change x and Run.';}
      else if(r===3){st.ri=2;st.x=0;st.ask={ans:'4',o:shuffle(['4','−2','−4']),ok:'Yes! 2(1/2) − (−3) = 1 + 3 = 4.'};txt='Evaluate *2a − b* for *a = 1/2* and *b = −3*.';}
      else{st.ri=3;st.x=0;st.ask={ans:'8 cm²',o:shuffle(['8 cm²','16 cm²','4.45 cm²']),ok:'Yes! 6.4 × 2.5 ÷ 2 = 8.'};txt='Use *A = lw ÷ 2* for a triangle-shaped sail with *l = 6.4 cm*, *w = 2.5 cm*.';}
      draw();st.setup=false;return txt;}};}
});

/* =========================================================
   16. Solving multi-term equations
   ========================================================= */
P.lesson({id:'equations8',title:'Solving multi-term equations',strand:'Algebra',codes:['C2.3'],
 guide:{goal:'Solve equations that involve multiple terms, integers and decimal numbers in various contexts, and verify solutions.',words:'equation, variable, balance, inverse operation, both sides, verify, solution',
  ask:['Why must you do the same thing to both sides?','How do you get rid of x on the right side of 3x + 5 = x − 7?','How do you verify a solution?'],home:'A phone plan costs $25 a month plus $0.10 per text. Your bill is $32.50. Write and solve an equation for the number of texts.'},
 learn:[{say:'Keep the balance level.',speech:'Sana’s equation is three x plus five equals x minus seven. Take one x off both sides: two x plus five equals negative seven. Take five off both sides: two x equals negative twelve. Divide both sides by two: x equals negative six.',view:'model',demo:'solve'},
        {say:'Read about verifying.',speech:'To verify, substitute the solution into the original equation. Three times negative six plus five is negative thirteen, and negative six minus seven is also negative thirteen. Both sides match, so x equals negative six is correct.',view:'read'},
        {say:'Watch: decimals.',speech:'Four x minus two point five equals two x plus four point five. Subtract two x, add two point five, then divide by two. x equals three point five.',view:'model',demo:'dec'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: solve on the balance.',speech:'Your turn. Do the same thing to both sides until x is alone.',view:'model'}],
 fig:'A balance with x-boxes and number weights on each side.',rz:.35,
 explore:['*− x both sides* removes an x from each pan.','*Move the number* removes the left number from both sides.','*÷ both sides* when only x-boxes are left.'],
 howTo:'Get x alone on the balance, then check.',
 init:k=>({a:3,b:5,c:1,d:-7,hist:[],ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'An equation is a *balance*. Do the *same thing to both sides* to keep it level.')+14;
  [['3x + 5 = x − 7',''],['2x + 5 = −7','− x both sides'],['2x = −12','− 5 both sides'],['x = −6','÷ 2 both sides']].forEach(([a,b],i)=>{T(g,a,X0+20,y+i*50+32,ZS(32),i===3?'#16a36f':acc());T(g,b,X0+TW-20,y+i*50+32,FT.small,GREY,'right');});y+=216;
  rr(g,X0,y,TW,110,16);g.fillStyle=tint('#16a36f',.12);g.fill();T(g,'Verify: x = −6',X0+20,y+36,FT.bodyB,'#16a36f');T(g,'3(−6) + 5 = −13   and   −6 − 7 = −13  ✓',X0+20,y+78,FT.body);y+=130;
  y=para(p,y,'*In context:* 25 + 0.10t = 32.50 → 0.10t = 7.50 → *t = 75 texts*.')+10;
  y=keyWords(p,y,[['inverse operation','an operation that undoes another, like − and +'],['verify','substitute to check that both sides are equal']]);
  predict(p,y,S,'p16','Solve 5x + 3 = 2x + 18.','*x = 5.* 3x = 15.');},
 readout(p,S,y){const g=p.g,st=S.st;T(g,eq(st),X0,y+50,ZS(46),acc());if(st.hist.length)T(g,'steps: '+st.hist.join(' → '),X0,y+90,FT.small,GREY);return y+100;},
 build(S,grp,mode,game){const st=S.st;const g2=new THREE.Group();grp.add(g2);
  const post=mk(new THREE.CylinderGeometry(.05,.07,1.2,12),lam('#64748b'),0);post.position.set(0,.6,-2.3);grp.add(post);const beam=mk(new THREE.BoxGeometry(4.0,.07,.12),lam('#475569'),0);beam.position.set(0,1.22,-2.3);grp.add(beam);
  function pan(x,a,b){const pg=new THREE.Group();pg.position.set(x,0,-2.3);const plate=mk(new THREE.CylinderGeometry(.85,.85,.05,32),lam('#cbd5e1'),20);plate.position.y=.5;pg.add(plate);[-1,1].forEach(s=>{const r=seg(V(s*.6,.52,0),V(0,1.2,0),'#94a3b8',.01);pg.add(r);});
    for(let i=0;i<a;i++){const bx=mk(G('eq8x',()=>new THREE.BoxGeometry(.24,.24,.24)),lam('#16a36f'),0);bx.position.set(-.55+(i%4)*.28,.65+Math.floor(i/4)*.26,-.15);pg.add(bx);const l=label('x',{size:.13,color:'#fff'});l.position.copy(bx.position).add(V(0,0,.14));pg.add(l);}
    if(b){const w=mk(new THREE.CylinderGeometry(.2,.24,.28,20),lam(b>0?'#f5b301':'#e4572e'),0);w.position.set(.45,.67,.2);pg.add(w);const l=label(fmt(b),{size:.18,bg:'#ffffff'});l.position.set(.45,1.0,.2);pg.add(l);}g2.add(pg);}
  function draw(){clearGroup(g2);pan(-1.5,st.a,st.b);pan(1.5,st.c,st.d);const e=label(eq(st),{size:.26,bg:'#ffffff',border:acc()});e.position.set(0,1.85,-2.3);g2.add(e);A.redraw();
    if(st.a===1&&st.b===0&&st.c===0){A.say('x = '+fmt(st.d));if(mode==='play'&&!st.setup&&st.solve)game.solved('Yes! x = '+fmt(st.d)+'. Verify it!');}}
  function op(k){if(k==='x'){if(st.c<=0){A.bad('There is no x on the right to remove.');return;}st.a--;st.c--;st.hist.push('− x');}
    else if(k==='n'){if(!st.b){A.bad('There is no number on the left.');return;}const b=st.b;st.b=0;st.d=r4(st.d-b);st.hist.push((b>0?'− ':'+ ')+fmt(Math.abs(b)));}
    else if(k==='div'){if(st.b||st.c){A.bad('First get only x-boxes on the left and a number on the right.');return;}if(st.a<=1){A.bad('x is already alone.');return;}const a=st.a;st.a=1;st.d=r4(st.d/a);st.hist.push('÷ '+a);}
    A.pop();draw();}
  draw();
  return {info:()=>eq(st),
    controls:()=>{const c=[{t:'− x both sides',fn:()=>op('x')},{t:'Move the number',fn:()=>op('n')},{t:'÷ both sides',go:true,fn:()=>op('div')}];if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);return c;},
    demo(n){st.ask=null;st.solve=false;st.hist=[];if(n==='solve'){Object.assign(st,{a:3,b:5,c:1,d:-7});draw();A.seq([[1000,()=>op('x')],[1100,()=>op('n')],[1100,()=>op('div')]]);}
      if(n==='dec'){Object.assign(st,{a:4,b:-2.5,c:2,d:4.5});draw();A.seq([[900,()=>op('x')],[900,()=>op('x')],[1000,()=>op('n')],[1000,()=>op('div')]]);}},
    task(r){st.setup=true;st.ask=null;st.solve=false;st.hist=[];let txt;
      if(r<3){Object.assign(st,[{a:3,b:5,c:1,d:-7},{a:4,b:-2.5,c:2,d:4.5},{a:5,b:3,c:2,d:18}][r]);st.solve=true;txt='Solve *'+eq(st)+'* on the balance.';}
      else if(r===3){Object.assign(st,{a:2,b:7,c:0,d:3});st.ask={ans:'Yes',o:['Yes','No'],ok:'Yes! 2(−2) + 7 = 3. Both sides match.'};txt='*Verify:* is x = −2 a solution of *2x + 7 = 3*?';}
      else{Object.assign(st,{a:1,b:25,c:0,d:32.5});st.ask={ans:'75 texts',o:shuffle(['75 texts','325 texts','7.5 texts']),ok:'Yes! 0.10t = 7.50, so t = 75.'};txt='A phone plan is *$25* plus *$0.10 per text*. The bill is *$32.50*. How many texts?';}
      draw();st.setup=false;return txt;}};}
});
function eq(st){const L=lin(st.a,st.b,'x'),R=lin(st.c,st.d,'x');return L+' = '+R;}

/* =========================================================
   17. Inequalities
   ========================================================= */
P.lesson({id:'inequal8',title:'Solving and graphing inequalities',strand:'Algebra',codes:['C2.4'],
 guide:{goal:'Solve inequalities that involve integers, and verify and graph the solutions.',words:'inequality, solution set, open dot, closed dot, greater than, less than or equal to, verify',
  ask:['What is the difference between x > −3 and x ≥ −3 on a graph?','How do you solve x + 4 > 1?','How can you verify that −2 is in the solution?'],home:'A ride needs riders at least 120 cm tall. Write an inequality and graph it. Test some heights.'},
 learn:[{say:'A whole set of answers.',speech:'Marcus needs x plus four to be greater than one. Subtract four from both sides: x is greater than negative three. Every number to the right of negative three works. The dot is open because negative three itself does not work.',view:'model',demo:'solve'},
        {say:'Read about open and closed dots.',speech:'An open dot means the boundary number is not included: greater than or less than. A closed dot means it is included: greater than or equal to, or less than or equal to.',view:'read'},
        {say:'Watch: verify with test points.',speech:'Test numbers to verify. Tap each point: the green ones make the inequality true and the red ones make it false. All the green points are on the arrow.',view:'model',demo:'test'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: graph the solution.',speech:'Your turn. Move the boundary, choose open or closed, and point the arrow the right way.',view:'model'}],
 fig:'A solution ray on a number line, with test points.',rz:.4,
 explore:['Move the *boundary* left or right.','Toggle *open/closed* and the *direction*.','*Tap a point* to test it.'],
 howTo:'Graph the solution set, then press Check.',
 init:k=>({b:-3,dir:1,closed:false,ineq:{a:1,c:4,r:1,s:'>'},tested:{},ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'Solve an inequality like an equation: do the same thing to both sides. The answer is a *set* of numbers.')+14;
  const ln=(yy,b,dir,closed,t)=>{const ox=X0+20,w=TW-260,X=v=>ox+(v+6)/12*w;g.strokeStyle=INK;g.lineWidth=3;g.beginPath();g.moveTo(ox,yy);g.lineTo(ox+w,yy);g.stroke();for(let v=-6;v<=6;v+=2){T(g,String(v).replace('-','−'),X(v),yy+28,FT.cap,GREY,'center');}
    g.strokeStyle='#16a36f';g.lineWidth=7;g.beginPath();g.moveTo(X(b),yy);g.lineTo(dir>0?ox+w:ox,yy);g.stroke();g.beginPath();g.arc(X(b),yy,9,0,Math.PI*2);g.fillStyle=closed?'#16a36f':'#fff';g.fill();g.lineWidth=3;g.stroke();T(g,t,ox+w+30,yy+8,FT.bodyB,acc());};
  ln(y+30,-3,1,false,'x > −3');ln(y+100,-4,-1,true,'x ≤ −4');y+=150;
  [['x + 4 > 1','x > −3'],['2x ≤ −8','x ≤ −4'],['x − 3 ≥ −5','x ≥ −2']].forEach(([a,b],i)=>{T(g,a,X0+20,y+i*44+30,FT.bodyB);T(g,'→  '+b,X0+300,y+i*44+30,FT.bodyB,acc());});y+=150;
  y=para(p,y,'*Verify:* test a number. For x > −3, try x = 0: 0 + 4 > 1 ✓. Try x = −5: −1 > 1 ✗.')+10;
  y=keyWords(p,y,[['inequality','a statement using <, >, ≤ or ≥'],['solution set','all the numbers that make it true']]);
  predict(p,y,S,'p17','You have 5 points and need at least 12 to win. Write and solve an inequality.','*x + 5 ≥ 12, so x ≥ 7.*');},
 readout(p,S,y){const g=p.g,st=S.st;T(g,'Solve: '+iq(st.ineq),X0,y+44,FT.bodyB,INK);T(g,'Graph: x '+(st.dir>0?(st.closed?'≥':'>'):(st.closed?'≤':'<'))+' '+fmt(st.b),X0,y+90,ZS(40),acc());return y+100;},
 build(S,grp,mode,game){const st=S.st;const z=-1.7;const g2=new THREE.Group(),pts=new THREE.Group();grp.add(g2,pts);const X=v=>v*.2;
  const bar=mk(new THREE.BoxGeometry(4.3,.04,.05),lam(INK),0);bar.position.set(0,.04,z);grp.add(bar);
  for(let v=-10;v<=10;v++){const t=mk(new THREE.BoxGeometry(.02,.05,v%5?.1:.2),lam(INK),0);t.position.set(X(v),.05,z);grp.add(t);if(v%2===0){const l=label(fmt(v),{size:.12,color:v<0?RED:v>0?BLUE:INK});l.position.set(X(v),.1,z+.26);grp.add(l);}}
  function draw(){clearGroup(g2);clearGroup(pts);const x0=X(st.b),x1=st.dir>0?X(10.6):X(-10.6);const ray=mk(new THREE.BoxGeometry(Math.abs(x1-x0),.07,.1),lam('#16a36f'),0);ray.position.set((x0+x1)/2,.12,z);g2.add(ray);
    const hd=mk(new THREE.ConeGeometry(.08,.2,12),lam('#16a36f'),0);hd.position.set(x1,.12,z);hd.rotation.z=st.dir>0?-Math.PI/2:Math.PI/2;g2.add(hd);
    const dot=mk(new THREE.TorusGeometry(.08,.03,10,20),lam('#16a36f'),0);dot.rotation.x=Math.PI/2;dot.position.set(x0,.14,z);g2.add(dot);if(st.closed){const f=mk(new THREE.CylinderGeometry(.08,.08,.05,18),lam('#16a36f'),0);f.position.set(x0,.14,z);g2.add(f);}
    for(let v=-10;v<=10;v+=1){const ok=st.tested[v];const s=mk(G('in8p',()=>new THREE.SphereGeometry(.055,10,8)),lam(ok==null?'#e2e8f0':ok?'#16a36f':'#e4572e'),0);s.position.set(X(v),.35,z-.4);pts.add(s);A.drag(s,{tap:()=>test(v)});}
    const e=label(iq(st.ineq),{size:.26,bg:'#ffffff',border:acc()});e.position.set(0,1.1,-2.5);g2.add(e);A.redraw();}
  function holds(v){const q=st.ineq,L=q.a*v+q.c;return q.s==='>'?L>q.r:q.s==='<'?L<q.r:q.s==='≥'?L>=q.r:L<=q.r;}
  function test(v){st.tested[v]=holds(v);A.pop();A.say('x = '+fmt(v)+': '+iq(st.ineq).replace(/x/g,par(v))+(holds(v)?'  ✓':'  ✗'));draw();}
  function sol(){const q=st.ineq;const bnd=r4((q.r-q.c)/q.a);return {b:bnd,dir:q.s==='>'||q.s==='≥'?1:-1,closed:q.s==='≥'||q.s==='≤'};}
  function check(){const s=sol();const ok=s.b===st.b&&s.dir===st.dir&&s.closed===st.closed;if(ok){if(mode==='play'&&!st.setup)game.solved('Yes! x '+(s.dir>0?(s.closed?'≥':'>'):(s.closed?'≤':'<'))+' '+fmt(s.b)+'.');else A.good('That graph is correct!');}else A.bad('Not yet: test a few points to see which side works.');}
  draw();
  return {info:()=>'b '+st.b,
    controls:()=>{const c=[{t:'◀ boundary',fn:()=>{st.b=Math.max(-9,st.b-1);draw();}},{t:'boundary ▶',fn:()=>{st.b=Math.min(9,st.b+1);draw();}},{t:st.closed?'Closed dot':'Open dot',fn:()=>{st.closed=!st.closed;draw();}},{t:'Flip arrow',fn:()=>{st.dir*=-1;draw();}},{t:'Check',go:true,fn:check}];if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c.slice(4)) ;return c;},
    demo(n){st.ask=null;st.ineq={a:1,c:4,r:1,s:'>'};st.tested={};if(n==='solve'){st.b=0;st.dir=1;st.closed=false;draw();A.seq([[700,()=>{st.b=-1;draw();}],[400,()=>{st.b=-2;draw();}],[400,()=>{st.b=-3;draw();A.say('x > −3');}]]);}
      if(n==='test'){st.b=-3;st.dir=1;st.closed=false;draw();A.seq([-6,-3,0,4].map(v=>[700,()=>test(v)]));}},
    task(r){st.setup=true;st.ask=null;st.tested={};st.b=0;st.dir=1;st.closed=false;let txt;
      if(r<3){st.ineq=[{a:1,c:4,r:1,s:'>'},{a:2,c:0,r:-8,s:'≤'},{a:1,c:-3,r:-5,s:'≥'}][r];txt='Graph the solution of *'+iq(st.ineq)+'*, then press *Check*.';}
      else if(r===3){st.ineq={a:1,c:4,r:1,s:'>'};st.ask={ans:'No',o:['Yes','No'],ok:'Right! −4 + 4 = 0, and 0 > 1 is false.'};txt='Is *x = −4* a solution of *x + 4 > 1*? Tap −4 to test.';}
      else{st.ineq={a:1,c:5,r:12,s:'≥'};st.ask={ans:'x ≥ 7',o:shuffle(['x ≥ 7','x > 7','x ≤ 7']),ok:'Yes! x + 5 ≥ 12 means x ≥ 7.'};txt='You have *5 points* and need *at least 12* to win. Solve *x + 5 ≥ 12*.';}
      draw();st.setup=false;return txt;}};}
});
function iq(q){return lin(q.a,q.c,'x')+' '+q.s+' '+fmt(q.r);}

/* =========================================================
   18. Coding with data
   ========================================================= */
const TEMPS=[18,22,25,19,27,21,16,24,23,20];
P.lesson({id:'coding8',title:'Coding to analyse data',strand:'Algebra',codes:['C3.1','C3.2'],
 guide:{goal:'Solve problems by writing and executing code that analyses data to inform decisions, and read and alter existing code, describing how changes affect the outcomes and the efficiency of the code.',words:'loop, condition, variable, count, sum, maximum, efficiency, data set',
  ask:['What does the loop do with each temperature?','How does changing 20 to 23 change the count?','Why is a loop more efficient than ten separate lines?'],home:'Record the time you go to sleep for a week. Write steps a program would use to find your average bedtime.'},
 learn:[{say:'Loop through the data.',speech:'Ana’s code loops through ten daily temperatures. For each day, if the temperature is greater than twenty, it adds one to the count. Watch each bar light up as the loop checks it. Six days were warmer than twenty degrees.',view:'model',demo:'run'},
        {say:'Read the code.',speech:'A loop repeats the same steps for every item in the data. A condition, like if t is greater than twenty, decides what happens. A variable, like count or total, keeps track of the result.',view:'read'},
        {say:'Watch: alter the code.',speech:'Change the code from counting to finding the total. Then divide by ten to find the mean temperature: twenty-one point five degrees. Small changes to code change the outcome.',view:'model',demo:'mean'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: alter and run.',speech:'Your turn. Change the job and the threshold, then run the code.',view:'model'}],
 fig:'A loop checks each bar of temperature data.',rz:.35,
 explore:['Choose the *job*: count, mean, or max.','Change the *threshold* in the condition.','Press *Run* to watch the loop.'],
 howTo:'Alter the code and run it to answer the question.',
 init:k=>({job:'count',th:20,i:-1,out:null,need:null,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'Code can *analyse data* to help make decisions: here, which days were warm enough for an outdoor event.')+14;
  rr(g,X0,y,TW,250,16);g.fillStyle='#1e293b';g.fill();['temps = [18, 22, 25, 19, 27, 21, 16, 24, 23, 20]','count = 0','for t in temps:','    if t > 20:','        count = count + 1','print(count)    # 6'].forEach((l,i)=>T(g,l,X0+20,y+40+i*38,'600 25px "Atkinson Hyperlegible", monospace',i===5?'#86efac':'#e2e8f0'));y+=272;
  y=para(p,y,'*Alter the code:* change 20 to 23 and the count becomes 3. Change *count + 1* to *total + t* and divide by 10 to find the *mean*.')+10;
  y=para(p,y,'*Efficiency:* a loop uses 4 lines for 10 days, or 10 000 days. Writing one line per day would take thousands of lines.')+10;
  y=keyWords(p,y,[['loop','code that repeats for each item'],['condition','a test like t > 20 that is true or false']]);
  predict(p,y,S,'p18','What does the code print if the condition is t > 24?','*2.* Only 25 and 27.');},
 readout(p,S,y){const g=p.g,st=S.st;const lines=st.job==='count'?['count = 0','for t in temps:','  if t > '+st.th+': count = count + 1','print(count)']:st.job==='mean'?['total = 0','for t in temps:','  total = total + t','print(total / 10)']:['big = temps[0]','for t in temps:','  if t > big: big = t','print(big)'];
  rr(g,X0,y+10,TW,lines.length*34+56,14);g.fillStyle='#1e293b';g.fill();lines.forEach((l,i)=>T(g,l,X0+18,y+42+i*34,'600 24px "Atkinson Hyperlegible", monospace','#e2e8f0'));T(g,'output: '+(st.out==null?'…':fmt(st.out)),X0+18,y+46+lines.length*34,'700 26px "Atkinson Hyperlegible", monospace','#86efac');return y+lines.length*34+76;},
 build(S,grp,mode,game){const st=S.st;const g2=new THREE.Group();grp.add(g2);const sc=.055;
  function draw(){clearGroup(g2);TEMPS.forEach((t,i)=>{const x=-2.0+i*.42,h=t*sc;const hit=st.job==='count'?t>st.th:st.job==='max'?false:true;const lit=i<=st.i;const col=!lit?'#cbd5e1':st.job==='count'?(hit?'#f97316':'#93c5fd'):'#f97316';
      const b=mk(new THREE.BoxGeometry(.3,h,.4),lam(i===st.i?'#f5b301':col),20);b.position.set(x,h/2,-2.0);g2.add(b);const l=label(String(t),{size:.14,color:INK});l.position.set(x,h+.15,-2.0);g2.add(l);});
    if(st.job==='count'){const th=mk(new THREE.BoxGeometry(4.3,.02,.5),new THREE.MeshLambertMaterial({color:'#e4572e',transparent:true,opacity:.35}),0);th.position.set(-.1,st.th*sc,-2.0);g2.add(th);const tl=label('t > '+st.th,{size:.16,color:'#c2410c'});tl.position.set(2.0,st.th*sc+.15,-1.65);g2.add(tl);}
    const o=label(st.out==null?'run the code':'output: '+fmt(st.out),{size:.24,bg:'#1e293b',color:'#86efac'});o.position.set(0,1.95,-2.4);g2.add(o);A.redraw();}
  function result(){return st.job==='count'?TEMPS.filter(t=>t>st.th).length:st.job==='mean'?r4(TEMPS.reduce((a,b)=>a+b,0)/10):Math.max(...TEMPS);}
  function run(){st.out=null;st.i=-1;draw();const s=TEMPS.map((_,i)=>[260,()=>{st.i=i;draw();}]);s.push([300,()=>{st.out=result();st.i=99;draw();A.pop();A.say('output: '+fmt(st.out));
      if(mode==='play'&&!st.setup&&st.need&&st.need(st))game.solved(st.needOk(st));}]);A.seq(s);}
  draw();
  return {info:()=>st.job+' '+st.th,
    controls:()=>{const c=[{t:'Run',go:true,fn:run},{t:'Job: '+st.job,fn:()=>{st.job={count:'mean',mean:'max',max:'count'}[st.job];st.out=null;st.i=-1;draw();}},{t:'threshold −1',fn:()=>{st.th=Math.max(15,st.th-1);st.out=null;draw();}},{t:'threshold +1',fn:()=>{st.th=Math.min(28,st.th+1);st.out=null;draw();}}];if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);return c;},
    demo(n){st.ask=null;st.need=null;st.i=-1;st.out=null;if(n==='run'){st.job='count';st.th=20;draw();A.seq([[600,run]]);}if(n==='mean'){st.job='mean';draw();A.seq([[600,run]]);}},
    task(r){st.setup=true;st.ask=null;st.need=null;st.i=-1;st.out=null;st.job='count';st.th=20;let txt;
      if(r===0){st.ask={ans:'6',o:shuffle(['6','5','7']),ok:'Yes! 22, 25, 27, 21, 24 and 23 are greater than 20.'};txt='Run the code. How many days were *warmer than 20°C*?';}
      else if(r===1){st.need=s=>s.job==='count'&&s.out===3;st.needOk=s=>'Yes! With t > '+s.th+', the count is 3.';txt='Alter the *threshold* so the code prints *3*, then Run.';}
      else if(r===2){st.need=s=>s.job==='mean'&&s.out!=null;st.needOk=s=>'Yes! The mean is '+fmt(s.out)+'°C.';txt='Change the *job* to find the *mean* temperature, then Run.';}
      else if(r===3){st.ask={ans:'A loop',o:['A loop','One line per day'],ok:'Yes! The loop stays short however much data there is.'};txt='Which code is *more efficient* for 1000 days of data?';}
      else{st.need=s=>s.job==='max'&&s.out===27;st.needOk=()=>'Yes! The hottest day was 27°C.';txt='Alter the code to find the *hottest* day, then Run.';}
      draw();st.setup=false;return txt;}};}
});

/* =========================================================
   19. One-variable and two-variable data
   ========================================================= */
P.lesson({id:'twovar8',title:'Two-variable data and collecting it',strand:'Data',codes:['D1.1','D1.2'],
 guide:{goal:'Identify situations involving one-variable and two-variable data and explain when each is needed, and collect continuous data on two variables and organize it in a table of values.',words:'one-variable data, two-variable data, continuous data, independent variable, dependent variable, table of values, trial',
  ask:['Why does “ramp height and distance rolled” need two variables?','Is “time to run 100 m” continuous or discrete?','Which variable do you change on purpose?'],home:'Measure the height and arm span of 5 family members. Record them in a table of values. Is there a relationship?'},
 learn:[{say:'Change one, measure the other.',speech:'Does a higher ramp make Rohan’s car roll farther? Set the ramp height, release the car, and measure the distance. Each trial gives two numbers: height and distance. That is two-variable data.',view:'model',demo:'roll'},
        {say:'Read about one and two variables.',speech:'One-variable data describes one thing, like everyone’s height. Two-variable data pairs two measurements, to look for a relationship. Continuous data, like distance or time, can be any value in a range.',view:'read'},
        {say:'Watch: build a table.',speech:'Try several heights. Each result goes into the table of values. The ramp height is the independent variable, and the distance is the dependent variable.',view:'model',demo:'table'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: run trials.',speech:'Your turn. Run trials at different heights and fill the table.',view:'model'}],
 fig:'A toy car rolls down a ramp; each trial is recorded.',rz:.35,
 explore:['Change the *ramp height*.','Press *Release* to roll the car.','Each trial is added to the *table of values*.'],
 howTo:'Run trials, or choose the answer.',
 init:k=>({h:10,rows:[],need:false,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'*One-variable data* describes one attribute. *Two-variable data* pairs two attributes to look for a relationship.')+14;
  [['One variable','heights of students in a class','#2f7de1'],['Two variables','ramp height and distance rolled','#e4572e'],['Two variables','hours of study and test score','#e4572e']].forEach(([a,b,c],i)=>{rr(g,X0,y+i*58,TW,50,12);g.fillStyle=tint(c,.12);g.fill();T(g,a,X0+18,y+i*58+34,FT.bodyB,c);T(g,b,X0+240,y+i*58+34,FT.body);});y+=190;
  y=para(p,y,'*Continuous data* can take any value in a range (length, mass, time). *Discrete data* is counted (number of pets).')+10;
  y=para(p,y,'The *independent variable* is the one you change (ramp height). The *dependent variable* is what you measure (distance).')+10;
  y=keyWords(p,y,[['two-variable data','pairs of measurements for each trial'],['table of values','a table that lists the pairs']]);
  predict(p,y,S,'p19','To see if older trees are taller, which variables do you collect?','*Age and height* of each tree: two-variable data.');},
 readout(p,S,y){const g=p.g,st=S.st;rr(g,X0,y+10,TW,40,10);g.fillStyle=tint(acc(),.16);g.fill();T(g,'Trial',X0+20,y+38,FT.smallB,acc());T(g,'Height (cm)',X0+180,y+38,FT.smallB,acc());T(g,'Distance (cm)',X0+440,y+38,FT.smallB,acc());
  const rows=st.rows.slice(-5);rows.forEach((r,i)=>{T(g,String(st.rows.length-rows.length+i+1),X0+20,y+80+i*34,FT.body);T(g,String(r[0]),X0+180,y+80+i*34,FT.body);T(g,r[1].toFixed(1),X0+440,y+80+i*34,FT.body);});if(!rows.length)T(g,'Release the car to record a trial.',X0+20,y+84,FT.small,GREY);return y+70+Math.max(1,rows.length)*34;},
 build(S,grp,mode,game){const st=S.st;const g2=new THREE.Group();grp.add(g2);let car=null;const tape=mk(new THREE.BoxGeometry(3.4,.02,.18),[lam('#fde68a'),lam('#fde68a'),cellMat('#fde68a',17,1),lam('#fde68a'),lam('#fde68a'),lam('#fde68a')],20);tape.position.set(.55,.01,-1.5);grp.add(tape);
  for(let i=0;i<=4;i++){const l=label(String(i*50),{size:.12,color:GREY});l.position.set(-1.15+i*.85,.08,-1.25);grp.add(l);}
  function draw(){clearGroup(g2);const H=st.h*.035;const len=1.0;const ramp=mk(new THREE.BoxGeometry(Math.hypot(len,H),.05,.5),lam('#94a3b8'),20);ramp.position.set(-1.65,H/2+.02,-1.9);ramp.rotation.z=-Math.atan2(H,len);g2.add(ramp);
    const sup=mk(new THREE.BoxGeometry(.08,H,.4),lam('#64748b'),0);sup.position.set(-2.15,H/2,-1.9);g2.add(sup);const hl=label(st.h+' cm',{size:.16,bg:'#ffffff'});hl.position.set(-2.15,H+.25,-1.9);g2.add(hl);
    car=new THREE.Group();const b=mk(new THREE.BoxGeometry(.28,.1,.18),lam('#e4572e'),0);b.position.y=.1;car.add(b);[-1,1].forEach(a=>[-1,1].forEach(c=>{const w=mk(new THREE.CylinderGeometry(.04,.04,.03,12),lam(INK),0);w.rotation.x=Math.PI/2;w.position.set(a*.09,.045,c*.1);car.add(w);}));car.position.set(-2.1,H+.03,-1.9);car.rotation.z=-Math.atan2(H,len);g2.add(car);
    st.rows.forEach((r,i)=>{const m=mk(G('tv8m',()=>new THREE.SphereGeometry(.04,8,6)),lam('#2f7de1'),0);m.position.set(-1.15+r[1]/200*3.4,.05,-1.5);g2.add(m);});A.redraw();}
  function release(){const H=st.h*.035;const d=Math.max(5,st.h*6.2+(Math.random()-.5)*8);const xEnd=-1.15+Math.min(200,d)/200*3.4;
    tween(.5,k=>{car.position.set(-2.1+(-1.15+.0+2.1)*k,H+.03-H*k,-1.9);}).then(()=>{car.rotation.z=0;return tween(1.0,k=>{car.position.set(-1.15+(xEnd+1.15)*easeOutF(k),.03,-1.9);});}).then(()=>{st.rows.push([st.h,Math.round(d*10)/10]);A.pop();A.say(st.h+' cm → '+(Math.round(d*10)/10)+' cm');draw();
      if(mode==='play'&&!st.setup&&st.need&&new Set(st.rows.map(r=>r[0])).size>=4)game.solved('Great data! '+st.rows.length+' trials at 4 different heights.');});}
  draw();
  return {info:()=>st.h+' cm',
    controls:()=>{const c=[{t:'height −',fn:()=>{st.h=Math.max(4,st.h-2);draw();}},{t:'height +',fn:()=>{st.h=Math.min(26,st.h+2);draw();}},{t:'Release',go:true,fn:release},{t:'Clear table',fn:()=>{st.rows=[];draw();}}];if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);return c;},
    demo(n){st.ask=null;st.need=false;if(n==='roll'){st.rows=[];st.h=10;draw();A.seq([[600,release]]);}if(n==='table'){st.rows=[];st.h=6;draw();A.seq([[400,release],[1900,()=>{st.h=14;draw();}],[300,release],[1900,()=>{st.h=22;draw();}],[300,release]]);}},
    task(r){st.setup=true;st.ask=null;st.need=false;st.rows=[];st.h=10;let txt;
      if(r===0){st.need=true;txt='Collect data: run trials at *4 different heights*.';}
      else if(r===1){st.ask={ans:'One-variable',o:['One-variable','Two-variable'],ok:'Yes! Only one attribute: height.'};txt='“The heights of all students in a class” is…';}
      else if(r===2){st.ask={ans:'Two-variable',o:['One-variable','Two-variable'],ok:'Yes! It pairs arm span with height to compare.'};txt='“Do people with longer arm spans tend to be taller?” needs…';}
      else if(r===3){st.ask={ans:'Continuous',o:['Continuous','Discrete'],ok:'Yes! Time can be any value, like 14.37 s.'};txt='“Time to run 100 m” is…';}
      else{st.ask={ans:'Ramp height',o:['Ramp height','Distance rolled'],ok:'Yes! You change it on purpose.'};txt='In the ramp experiment, which is the *independent* variable?';}
      draw();st.setup=false;return txt;}};}
});
const easeOutF=k=>1-Math.pow(1-k,3);

/* =========================================================
   20. Scatter plots and correlation
   ========================================================= */
function dataset(kind){const R=seeded({sp:11,wn:23,none:37,arm:5}[kind]||7);const out=[];for(let i=0;i<14;i++){const x=1+R()*9;let y;if(kind==='sp')y=x*.9+.5+(R()-.5)*1.2;else if(kind==='wn')y=9-x*.6+(R()-.5)*4;else if(kind==='none')y=1+R()*8;else y=x*.8+1+(R()-.5)*.8;out.push([x,Math.max(.3,Math.min(9.7,y))]);}return out;}
const DS={sp:{n:'Hours studied vs test score',x:'hours studied',y:'score',d:'strong positive'},wn:{n:'Screen time vs sleep',x:'screen time',y:'sleep',d:'weak negative'},none:{n:'Shoe size vs test score',x:'shoe size',y:'score',d:'none'}};
P.lesson({id:'scatter8',title:'Scatter plots and relationships',strand:'Data',codes:['D1.3','D1.4','D1.5'],
 guide:{goal:'Select the best type of graph, including scatter plots, display data with proper sources, titles, labels and scales, create infographics, and describe relationships as strong, weak, none, positive or negative, with and without outliers.',words:'scatter plot, correlation, positive, negative, strong, weak, outlier, line of best fit, infographic',
  ask:['How can you tell a strong relationship from a weak one?','What does an outlier do to a line of best fit?','When is a scatter plot better than a bar graph?'],home:'Make an infographic about your own data: a title, a scatter plot or table, a source, and a short story about what it shows.'},
 learn:[{say:'Points tell a story.',speech:'Each ball is one student in Elena’s survey: hours studied across, test score up. The points rise from left to right in a tight band: a strong positive relationship. Watch the line of best fit appear.',view:'model',demo:'sp'},
        {say:'Read about describing relationships.',speech:'Positive means both values rise together. Negative means one rises as the other falls. Strong means the points are close to a line; weak means they are spread out. None means there is no pattern.',view:'read'},
        {say:'Watch: an outlier.',speech:'Now add an outlier: one point far from the others. It pulls the line of best fit and can make a relationship look weaker. Always check outliers.',view:'model',demo:'out'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: describe the data.',speech:'Your turn. Switch data sets, show the line, and describe each relationship.',view:'model'}],
 fig:'A 3D scatter plot with a line of best fit.',rz:.35,
 explore:['Switch the *data set*.','Show the *line of best fit*.','Add an *outlier* to see its effect.'],
 howTo:'Describe the relationship or choose the best graph.',
 init:k=>({ds:'sp',line:false,out:false,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'A *scatter plot* shows two-variable data. Describe the relationship by its *direction* and *strength*.')+14;
  const mini=(x,yy,kind,t)=>{rr(g,x,yy,TW/3-12,150,12);g.fillStyle='#f8fafc';g.fill();const d=dataset(kind);d.forEach(([a,b])=>{g.beginPath();g.arc(x+12+a/10*(TW/3-36),yy+140-b/10*120,5,0,Math.PI*2);g.fillStyle=acc();g.fill();});T(g,t,x+(TW/3-12)/2,yy+176,FT.smallB,INK,'center');};
  mini(X0,y,'sp','strong positive');mini(X0+TW/3+6,y,'wn','weak negative');mini(X0+2*TW/3+12,y,'none','none');y+=200;
  y=para(p,y,'An *outlier* is far from the other points. It can change the line of best fit.')+10;
  rr(g,X0,y,TW,150,16);g.fillStyle=tint(acc(),.1);g.fill();T(g,'Choose the best graph',X0+20,y+34,FT.bodyB,acc());wrap(g,'two variables → scatter plot  ·  categories → bar graph  ·  parts of a whole → circle graph  ·  change over time → line graph',X0+20,y+66,TW-40,28,{font:FT.small});y+=170;
  y=keyWords(p,y,[['correlation','how two variables are related'],['infographic','a poster that tells a data story with graphs, numbers and words']]);
  predict(p,y,S,'p20','Describe “age of a car” vs “its value”.','*Negative:* older cars are usually worth less.');},
 readout(p,S,y){const g=p.g,st=S.st;T(g,DS[st.ds].n,X0,y+40,FT.bodyB,INK);T(g,'Relationship: '+DS[st.ds].d+(st.out?' (with an outlier)':''),X0,y+84,ZS(34),acc());return y+96;},
 build(S,grp,mode,game){const st=S.st;const g2=new THREE.Group();grp.add(g2);const ox=-1.9,oy=.05,z=-2.1,sx=.38,sy=.23;
  const back=mk(new THREE.BoxGeometry(4.0,2.5,.04),[lam('#f8fafc'),lam('#f8fafc'),lam('#f8fafc'),lam('#f8fafc'),cellMat('#ffffff',10,10),lam('#f8fafc')],20);back.position.set(ox+1.9,1.3,z-.1);grp.add(back);
  function draw(){clearGroup(g2);const d=dataset(st.ds).slice();if(st.out)d.push(st.ds==='sp'?[8.5,1.2]:[2,9.3]);d.forEach(([a,b],i)=>{const isO=st.out&&i===d.length-1;const s=mk(G('sc8b',()=>new THREE.SphereGeometry(.07,14,10)),lam(isO?'#e4572e':'#2f7de1'),0);s.position.set(ox+a*sx,oy+b*sy,z);g2.add(s);});
    const xl=label(DS[st.ds].x+' →',{size:.15,color:GREY});xl.position.set(0,.1,z+.25);g2.add(xl);const yl=label(DS[st.ds].y+' ↑',{size:.15,color:GREY});yl.position.set(ox-.05,2.75,z);g2.add(yl);const tl=label(DS[st.ds].n,{size:.17,bg:'#ffffff'});tl.position.set(0,2.85,z);g2.add(tl);
    if(st.line){const n=d.length,mx=d.reduce((a,p)=>a+p[0],0)/n,my=d.reduce((a,p)=>a+p[1],0)/n;const m=d.reduce((a,p)=>a+(p[0]-mx)*(p[1]-my),0)/d.reduce((a,p)=>a+(p[0]-mx)**2,0);const yA=Math.max(0,Math.min(10,my+m*(0-mx))),yB=Math.max(0,Math.min(10,my+m*(10-mx)));
      g2.add(seg(V(ox,oy+yA*sy,z+.05),V(ox+10*sx,oy+yB*sy,z+.05),'#f5b301',.02));}A.redraw();}
  draw();
  return {info:()=>st.ds,
    controls:()=>{const c=[{t:'Data set',go:true,fn:()=>{st.ds={sp:'wn',wn:'none',none:'sp'}[st.ds];st.out=false;draw();A.say(DS[st.ds].n);}},{t:'Line of best fit',on:st.line,fn:()=>{st.line=!st.line;draw();}},{t:'Outlier',on:st.out,fn:()=>{st.out=!st.out;draw();}}];if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c.slice(1));return c;},
    demo(n){st.ask=null;if(n==='sp'){st.ds='sp';st.out=false;st.line=false;draw();A.seq([[1200,()=>{st.line=true;draw();}]]);}if(n==='out'){st.ds='sp';st.line=true;st.out=false;draw();A.seq([[1000,()=>{st.out=true;draw();A.say('The outlier pulls the line.');}]]);}},
    task(r){st.setup=true;st.out=false;st.line=false;let txt;const O=['strong positive','weak negative','none','strong negative','weak positive'];
      if(r<3){st.ds=['sp','wn','none'][r];const a=DS[st.ds].d;st.ask={ans:a,o:shuffle([a].concat(shuffle(O.filter(x=>x!==a)).slice(0,2))),ok:'Yes! '+a+'.'};txt='Describe the relationship in *'+DS[st.ds].n+'*.';}
      else if(r===3){st.ds='sp';st.ask={ans:'Bar graph',o:shuffle(['Bar graph','Scatter plot','Line graph']),ok:'Yes! Categories with counts suit a bar graph.'};txt='Which graph is best for *the number of students who chose each favourite sport*?';}
      else{st.ds='sp';st.line=true;st.out=true;st.ask={ans:'It pulls the line toward it',o:shuffle(['It pulls the line toward it','It has no effect','It makes the relationship stronger']),ok:'Yes! One far-away point can change the line.'};txt='What does the red *outlier* do to the line of best fit?';}
      draw();st.setup=false;return txt;}};}
});

/* =========================================================
   21. Misleading graphs and drawing conclusions
   ========================================================= */
P.lesson({id:'mislead8',title:'Misleading graphs and fair conclusions',strand:'Data',codes:['D1.6'],
 guide:{goal:'Analyse data presented in various ways, including scatter plots and misleading graphs, by asking and answering questions, challenging preconceived notions, and drawing conclusions, then make convincing arguments and informed decisions.',words:'misleading, scale, pictograph, volume, correlation, causation, conclusion, argument',
  ask:['Why does doubling every side of a picture make it look 8 times bigger?','Do ice-cream sales cause sunburns?','What questions should you ask about any graph?'],home:'Find a graph in an ad. Ask: What is the scale? Who made it? What is not shown? Write a fair conclusion.'},
 learn:[{say:'Bigger than it looks.',speech:'In Jalen’s ad, sales doubled, from one thousand to two thousand. The fair picture doubles only the height. The misleading picture doubles the height, width and depth, so the box holds eight times as much. It looks like sales grew eight times!',view:'model',demo:'cube'},
        {say:'Read about correlation and causation.',speech:'Two things can rise together without one causing the other. Ice-cream sales and sunburns both rise in summer, because of hot, sunny weather. Correlation is not causation.',view:'read'},
        {say:'Watch: the summer effect.',speech:'Watch the months go by. As the temperature rises, both ice-cream sales and sunburns rise. The hidden variable is the weather.',view:'model',demo:'summer'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: question the graph.',speech:'Your turn. Switch between the fair and misleading pictures and decide what is true.',view:'model'}],
 fig:'Two pictographs of the same data: one fair, one misleading.',rz:.35,
 explore:['Toggle *Fair* and *Misleading*.','Change the *growth*.','Show the *summer* data.'],
 howTo:'Question the graph, then choose the fair conclusion.',
 init:k=>({fair:true,k:2,view:'cube',m:0,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'Graphs can mislead by the *way* they are drawn. Always ask questions before drawing a conclusion.')+14;
  g.fillStyle='#93c5fd';g.fillRect(X0+20,y+120,60,40);g.fillRect(X0+110,y+80,60,80);T(g,'fair: ×2 height',X0+20,y+190,FT.smallB,'#2563eb');
  g.fillStyle='#fdba74';g.fillRect(X0+330,y+120,40,40);g.fillRect(X0+400,y+80,80,80);T(g,'misleading: ×2 sides = ×4 area',X0+330,y+190,FT.smallB,'#c2410c');y+=214;
  [['What is the scale? Does it start at 0?'],['Are pictures scaled fairly?'],['Who made the graph, and why?'],['Is a relationship really cause and effect?']].forEach(([q],i)=>{T(g,'?',X0+12,y+i*40+26,ZS(30),acc());T(g,q,X0+50,y+i*40+26,FT.body);});y+=196;
  y=para(p,y,'*Correlation is not causation:* ice-cream sales and sunburns rise together because of a third factor, *sunny weather*.')+10;
  y=keyWords(p,y,[['causation','one thing directly makes another happen'],['hidden variable','a third factor that affects both']]);
  predict(p,y,S,'p21','A cube icon doubles every edge. How many times bigger is its volume?','*8 times.* 2 × 2 × 2.');},
 readout(p,S,y){const g=p.g,st=S.st;if(st.view==='cube'){T(g,'Real growth: × '+st.k,X0,y+44,FT.bodyB,INK);T(g,st.fair?'Fair picture: looks × '+st.k:'Misleading picture: looks × '+st.k**3,X0,y+90,ZS(38),st.fair?'#16a36f':'#e4572e');}else{T(g,'Ice-cream sales and sunburns rise together.',X0,y+44,FT.bodyB);T(g,'Cause: hot, sunny weather',X0,y+90,ZS(36),acc());}return y+100;},
 build(S,grp,mode,game){const st=S.st;const g2=new THREE.Group();grp.add(g2);
  function draw(){clearGroup(g2);if(st.view==='cube'){const s0=.5;const a=mk(new THREE.BoxGeometry(s0,s0,s0),lam('#3b82f6'),0);a.position.set(-1.4,s0/2,-2.0);g2.add(a);const la=label('1000',{size:.2,bg:'#ffffff'});la.position.set(-1.4,s0+.25,-2.0);g2.add(la);
      const f=st.fair?[1,st.k,1]:[st.k,st.k,st.k];const b=mk(new THREE.BoxGeometry(s0*f[0],s0*f[1],s0*f[2]),lam(st.fair?'#16a36f':'#e4572e'),0);b.position.set(.6,s0*f[1]/2,-2.0);g2.add(b);const lb=label(1000*st.k+'',{size:.2,bg:'#ffffff'});lb.position.set(.6,s0*f[1]+.25,-2.0);g2.add(lb);
      const t=label(st.fair?'FAIR':'MISLEADING',{size:.24,color:st.fair?'#16a36f':'#e4572e'});t.position.set(0,2.2,-2.4);g2.add(t);}
    else{const temps=[2,5,11,17,22,26,28,27,21,14,7,3];for(let i=0;i<12;i++){const x=-2.0+i*.36,on=i<=st.m;const t=temps[i];const ic=mk(new THREE.BoxGeometry(.13,Math.max(.02,t*.05),.3),lam(on?'#f59e0b':'#e5e7eb'),20);ic.position.set(x-.07,t*.025,-2.2);g2.add(ic);
        const sb=mk(new THREE.BoxGeometry(.13,Math.max(.02,t*.04),.3),lam(on?'#e4572e':'#e5e7eb'),20);sb.position.set(x+.07,t*.02,-2.2);g2.add(sb);const l=label('JFMAMJJASOND'[i],{size:.12,color:GREY});l.position.set(x,.08,-1.85);g2.add(l);}
      const sun=mk(new THREE.SphereGeometry(.12+temps[Math.min(11,st.m)]*.008,18,14),new THREE.MeshBasicMaterial({color:'#facc15'}),0);sun.position.set(1.9,2.1,-2.6);g2.add(sun);const k=label('ice cream   sunburns',{size:.15,color:INK});k.position.set(0,1.9,-2.4);g2.add(k);}A.redraw();}
  draw();
  return {info:()=>st.view+(st.fair?' fair':' misleading'),
    controls:()=>{const c=[{t:st.fair?'Fair':'Misleading',go:true,fn:()=>{st.view='cube';st.fair=!st.fair;A.pop();draw();}},{t:'growth ×2',on:st.k===2,fn:()=>{st.view='cube';st.k=2;draw();}},{t:'growth ×3',on:st.k===3,fn:()=>{st.view='cube';st.k=3;draw();}},{t:'Summer data',fn:()=>{st.view='summer';st.m=0;draw();A.seq(Array.from({length:11},(_,i)=>[260,()=>{st.m=i+1;draw();}]));}}];
      if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);return c;},
    demo(n){st.ask=null;if(n==='cube'){st.view='cube';st.k=2;st.fair=true;draw();A.seq([[1500,()=>{st.fair=false;draw();A.say('Looks 8 times bigger!');}]]);}if(n==='summer'){st.view='summer';st.m=0;draw();A.seq(Array.from({length:11},(_,i)=>[300,()=>{st.m=i+1;draw();}]));}},
    task(r){st.setup=true;st.view='cube';st.fair=false;st.k=2;st.m=11;let txt;
      if(r===0){st.ask={ans:'8 times',o:shuffle(['8 times','2 times','4 times']),ok:'Yes! 2 × 2 × 2 = 8: the picture exaggerates.'};txt='Every edge of the red box doubled. How many times *bigger* does it *look*?';}
      else if(r===1){st.fair=true;st.ask={ans:'Sales doubled',o:shuffle(['Sales doubled','Sales grew 8 times','Sales stayed the same']),ok:'Yes! 1000 → 2000 is × 2.'};txt='What is the *fair conclusion* about sales?';}
      else if(r===2){st.view='summer';st.ask={ans:'Hot, sunny weather',o:shuffle(['Hot, sunny weather','Eating ice cream','Sunscreen']),ok:'Yes! Weather is the hidden variable.'};txt='Ice-cream sales and sunburns rise together. What *causes* both?';}
      else if(r===3){st.view='summer';st.ask={ans:'Correlation is not causation',o:shuffle(['Correlation is not causation','Ice cream causes sunburns','The data is wrong']),ok:'Yes! Rising together does not prove one causes the other.'};txt='Which statement is *true*?';}
      else{st.ask={ans:'Who made it and why',o:shuffle(['Who made it and why','Its colours','How big the title is']),ok:'Yes! Always check the source and its purpose.'};txt='Which is the *most important* question to ask about an ad’s graph?';}
      draw();st.setup=false;return txt;}};}
});

/* =========================================================
   22. Venn diagrams and probability
   ========================================================= */
P.lesson({id:'venn8',title:'Venn diagrams and probability',strand:'Data',codes:['D2.1'],
 guide:{goal:'Solve probability problems using appropriate tools and strategies, including Venn and tree diagrams.',words:'Venn diagram, overlap, both, neither, event, probability, outcome',
  ask:['What does the overlap of a Venn diagram show?','How do you find how many students play neither sport?','How can a Venn diagram help find a probability?'],home:'Ask 10 people if they have a cat and if they have a dog. Sort them in a Venn diagram. What is P(both)?'},
 learn:[{say:'Sort into circles.',speech:'In Sana’s class of twenty, twelve play soccer and eight play hockey. Three play both: they go in the overlap. Watch each student drop into the right region.',view:'model',demo:'fill'},
        {say:'Read about regions.',speech:'Soccer only is twelve minus three: nine. Hockey only is eight minus three: five. Nine plus three plus five is seventeen, so three students play neither, outside both circles.',view:'read'},
        {say:'Watch: a probability.',speech:'Pick a student at random. The probability that they play both sports is three out of twenty. The probability that they play neither is also three out of twenty.',view:'model',demo:'prob'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: sort and find P.',speech:'Your turn. Change the numbers, sort the students and find the probabilities.',view:'model'}],
 fig:'Two overlapping rings with student tokens.',rz:.35,
 explore:['Change *soccer*, *hockey* and *both*.','Press *Sort* to drop the tokens.','Tap a *region* to see its probability.'],
 howTo:'Use the Venn diagram to find the number or the probability.',
 init:k=>({tot:20,a:12,b:8,both:3,sorted:true,sel:null,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'A *Venn diagram* sorts outcomes into groups. The *overlap* shows outcomes in *both* groups.')+14;
  const cx=X0+TW/2,cy=y+130;g.globalAlpha=.35;g.beginPath();g.arc(cx-70,cy,110,0,Math.PI*2);g.fillStyle='#2f7de1';g.fill();g.beginPath();g.arc(cx+70,cy,110,0,Math.PI*2);g.fillStyle='#e4572e';g.fill();g.globalAlpha=1;g.strokeStyle=INK;g.strokeRect(X0+20,y,TW-40,260);
  T(g,'soccer only 9',cx-130,cy+8,FT.smallB,INK,'center');T(g,'both 3',cx,cy+8,FT.smallB,INK,'center');T(g,'hockey only 5',cx+130,cy+8,FT.smallB,INK,'center');T(g,'neither 3',X0+90,y+240,FT.smallB,INK,'center');T(g,'20 students',X0+TW-110,y+36,FT.smallB,GREY);y+=280;
  y=para(p,y,'*Neither* = total − (soccer + hockey − both) = 20 − (12 + 8 − 3) = *3*.')+10;
  y=para(p,y,'P(both) = 3/20.  P(soccer or hockey) = 17/20.')+10;
  y=keyWords(p,y,[['Venn diagram','overlapping circles that sort items into groups'],['overlap','the part in both circles']]);
  predict(p,y,S,'p22','In 30 students, 18 have a cat, 10 a dog, 4 both. How many have neither?','*6.* 30 − (18 + 10 − 4) = 6.');},
 readout(p,S,y){const g=p.g,st=S.st,n=st.tot-(st.a+st.b-st.both);const LB=st.lab||['soccer','hockey'];T(g,LB[0]+' only '+(st.a-st.both)+' · both '+st.both+' · '+LB[1]+' only '+(st.b-st.both)+' · neither '+n,X0,y+44,FT.bodyB);T(g,st.sel?'P('+st.sel[0]+') = '+st.sel[1]+'/'+st.tot+(fr(st.sel[1],st.tot)!==st.sel[1]+'/'+st.tot?' = '+fr(st.sel[1],st.tot):''):'Tap a region for its probability.',X0,y+90,ZS(36),acc());return y+100;},
 build(S,grp,mode,game){const st=S.st;const g2=new THREE.Group();grp.add(g2);const z=-1.9;
  const mat=new THREE.MeshLambertMaterial({color:'#ffffff'});const base=mk(new THREE.BoxGeometry(4.4,.03,2.6),lam('#f1f5f9'),20);base.position.set(0,.015,z);grp.add(base);
  [[-.55,'#2f7de1','soccer'],[.55,'#e4572e','hockey']].forEach(([x,c,t])=>{const ring=mk(new THREE.TorusGeometry(.95,.035,10,60),lam(c),0);ring.rotation.x=Math.PI/2;ring.position.set(x,.06,z);grp.add(ring);const disk=mk(new THREE.CylinderGeometry(.95,.95,.01,60),new THREE.MeshLambertMaterial({color:c,transparent:true,opacity:.15,depthWrite:false}),0);disk.position.set(x,.04,z);grp.add(disk);});
  const regs=[['soccer only',-1.05,0],['both',0,0],['hockey only',1.05,0],['neither',-1.85,1.0]];regs.forEach(([n,x,dz])=>{const hit=mk(new THREE.CylinderGeometry(.35,.35,.02,20),new THREE.MeshBasicMaterial({transparent:true,opacity:0,depthWrite:false}),0);hit.position.set(x,.08,z+dz*.95);grp.add(hit);A.drag(hit,{tap:()=>sel(n)});});
  function counts(){return {'soccer only':st.a-st.both,'both':st.both,'hockey only':st.b-st.both,'neither':st.tot-(st.a+st.b-st.both)};}
  function draw(){clearGroup(g2);const c=counts();const LB=st.lab||['soccer','hockey'];[[-1.25,'#2f7de1',LB[0]],[1.25,'#e4572e',LB[1]]].forEach(([x,cl,t])=>{const l=label(t,{size:.17,color:cl});l.position.set(x,.1,z-1.05);g2.add(l);});if(st.sorted){regs.forEach(([n,x,dz])=>{for(let i=0;i<c[n];i++){const col=n==='both'?'#8b5cf6':n==='neither'?'#94a3b8':n==='soccer only'?'#2f7de1':'#e4572e';const t=mk(G('vn8t',()=>new THREE.CylinderGeometry(.06,.06,.06,12)),lam(col),0);
        const cols=n==='both'?2:n==='neither'?6:3;t.position.set(x+((i%cols)-(cols-1)/2)*.15+(n==='neither'?.6:0),.07,z+dz*1.05+(Math.floor(i/cols)-1)*.15);g2.add(t);A.drag(t,{tap:()=>sel(n)});}const l=label(String(c[n]),{size:.2,bg:'#ffffff'});l.position.set(x+(n==='neither'?.6:0),.5,z+dz*1.05-.35);g2.add(l);});}A.redraw();}
  function sel(n){st.sel=[n,counts()[n]];A.pop();A.say('P('+n+') = '+st.sel[1]+'/'+st.tot);A.redraw();if(mode==='play'&&!st.setup&&st.want&&st.want===n)game.solved('Yes! P('+n+') = '+fr(st.sel[1],st.tot)+'.');}
  draw();
  return {info:()=>st.a+'/'+st.b+'/'+st.both,
    controls:()=>{const lim=()=>{st.both=Math.max(0,Math.min(st.both,st.a,st.b));if(st.a+st.b-st.both>st.tot)st.both=st.a+st.b-st.tot;st.sel=null;draw();};
      const c=[{t:'Sort',go:true,fn:()=>{st.sorted=true;draw();A.pop();}},{t:'soccer +',fn:()=>{st.a=Math.min(15,st.a+1);lim();}},{t:'soccer −',fn:()=>{st.a=Math.max(1,st.a-1);lim();}},{t:'hockey +',fn:()=>{st.b=Math.min(15,st.b+1);lim();}},{t:'hockey −',fn:()=>{st.b=Math.max(1,st.b-1);lim();}},{t:'both +',fn:()=>{st.both++;lim();}},{t:'both −',fn:()=>{st.both--;lim();}}];
      if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c.slice(0,1));return c;},
    demo(n){st.ask=null;st.want=null;st.sel=null;Object.assign(st,{tot:20,a:12,b:8,both:3});if(n==='fill'){st.sorted=false;draw();A.seq([[700,()=>{st.sorted=true;draw();A.pop();}]]);}if(n==='prob'){st.sorted=true;draw();A.seq([[800,()=>sel('both')],[1400,()=>sel('neither')]]);}},
    task(r){st.setup=true;st.ask=null;st.want=null;st.sel=null;st.sorted=true;st.lab=null;let txt;
      if(r===0){Object.assign(st,{tot:20,a:12,b:8,both:3});st.ask={ans:'3',o:shuffle(['3','0','5']),ok:'Yes! 20 − 17 = 3.'};txt='How many students play *neither* sport?';}
      else if(r===1){Object.assign(st,{tot:30,a:18,b:10,both:4});st.lab=['cat','dog'];st.ask={ans:'14',o:shuffle(['14','18','22']),ok:'Yes! 18 − 4 = 14.'};txt='30 students: 18 have a cat, 10 have a dog, 4 have both. How many have *only a cat*?';}
      else if(r===2){Object.assign(st,{tot:20,a:12,b:8,both:3});st.want='both';txt='Tap the region with probability *3/20* of being picked: plays *both*.';}
      else if(r===3){Object.assign(st,{tot:25,a:10,b:9,both:4});st.ask={ans:'2/5',o:shuffle(['2/5','4/25','3/5']),ok:'Yes! Neither = 25 − (10 + 9 − 4) = 10, and 10/25 = 2/5.'};txt='25 students: 10 play soccer, 9 hockey, 4 both. Find *P(neither)*.';}
      else{Object.assign(st,{tot:20,a:12,b:8,both:3});st.ask={ans:'17/20',o:shuffle(['17/20','20/20','3/20']),ok:'Yes! 9 + 3 + 5 = 17 students.'};txt='Find *P(soccer or hockey or both)*.';}
      draw();st.setup=false;return txt;}};}
});

/* =========================================================
   23. Tree diagrams: multiple events
   ========================================================= */
P.lesson({id:'tree8',title:'Tree diagrams and multiple events',strand:'Data',codes:['D2.1','D2.2'],
 guide:{goal:'Determine and compare the theoretical and experimental probabilities of multiple independent events and of multiple dependent events, using tree diagrams.',words:'tree diagram, independent events, dependent events, theoretical probability, experimental probability, trial, outcome',
  ask:['How many outcomes are there when you flip a coin and spin a 4-colour spinner?','Why do you multiply probabilities along a branch?','Why does drawing without replacement change the second branch?'],home:'Flip a coin and roll a die 36 times. Count how often you get heads and a 6. Compare with 1/12.'},
 learn:[{say:'Branches multiply.',speech:'Marcus flips a coin, then spins a spinner with four equal colours. The tree has two branches, then four on each: eight outcomes. The chance of heads and red is one half times one quarter: one eighth.',view:'model',demo:'ind'},
        {say:'Read about dependent events.',speech:'If the first event changes the second, the events are dependent. Draw two tickets from five without putting the first back: the second branch has only four tickets left. Multiply along the branches using the new chances.',view:'read'},
        {say:'Watch: run the experiment.',speech:'Now run two hundred trials. The experimental probability of heads and red gets close to the theoretical one eighth, which is zero point one two five.',view:'model',demo:'run'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: build the tree.',speech:'Your turn. Switch between independent and dependent events, choose a path, and run trials.',view:'model'}],
 fig:'A 3D tree diagram whose branches light up.',rz:.35,
 explore:['Switch *Coin + spinner* or *Two tickets*.','*Tap a leaf* to pick an outcome.','Run *trials* to compare with theory.'],
 howTo:'Use the tree to find the probability, then choose the answer.',
 init:k=>({kind:'ind',leaf:0,runs:0,hits:0,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'A *tree diagram* shows every outcome of two or more events. *Multiply* along a path to find its probability.')+14;
  const ox=X0+30,oy=y+120;g.strokeStyle=INK;g.lineWidth=2;[['H',-60],['T',60]].forEach(([t,dy])=>{g.beginPath();g.moveTo(ox,oy);g.lineTo(ox+140,oy+dy);g.stroke();T(g,t+' (1/2)',ox+150,oy+dy+6,FT.smallB,acc());['R','B','G','Y'].forEach((c,j)=>{const yy=oy+dy+(j-1.5)*26;g.beginPath();g.moveTo(ox+230,oy+dy);g.lineTo(ox+360,yy);g.stroke();T(g,t+c+'  1/8',ox+370,yy+6,FT.cap,INK);});});y+=250;
  rr(g,X0,y,TW,150,16);g.fillStyle=tint(acc(),.1);g.fill();T(g,'Dependent: 3 red and 2 blue tickets, no replacement',X0+20,y+36,FT.bodyB,acc());T(g,'P(red, red) = 3/5 × 2/4 = 6/20 = 3/10',X0+20,y+80,FT.body);T(g,'With replacement: 3/5 × 3/5 = 9/25',X0+20,y+120,FT.body,GREY);y+=170;
  y=para(p,y,'More trials make the *experimental* probability closer to the *theoretical* one.')+10;
  y=keyWords(p,y,[['independent events','one does not change the other’s chances'],['dependent events','the first changes the chances of the second']]);
  predict(p,y,S,'p23','Flip a coin and roll a die. What is P(heads and 6)?','*1/12.* 1/2 × 1/6.');},
 readout(p,S,y){const g=p.g,st=S.st,L=leaves(st.kind)[st.leaf];T(g,'P('+L.n+') = '+L.p+' = '+(L.v).toFixed(3),X0,y+46,ZS(40),acc());T(g,st.runs?'Experiment: '+st.hits+'/'+st.runs+' = '+(st.hits/st.runs).toFixed(3):'Run trials to compare.',X0,y+88,FT.bodyB);return y+98;},
 build(S,grp,mode,game){const st=S.st;const g2=new THREE.Group();grp.add(g2);
  function draw(){clearGroup(g2);const L=leaves(st.kind);const root=V(-2.1,.6,-2.0);const firsts=st.kind==='ind'?[['H','1/2'],['T','1/2']]:[['R','3/5'],['B','2/5']];const per=L.length/2;
    firsts.forEach(([t,pp],i)=>{const m=V(-.9,.6,-2.0+(i?.75:-.75));const on=Math.floor(st.leaf/per)===i;g2.add(seg(root,m,on?'#f5b301':'#94a3b8',on?.03:.015));const nd=mk(new THREE.SphereGeometry(.12,14,10),lam(on?'#f5b301':'#cbd5e1'),0);nd.position.copy(m);g2.add(nd);const l=label(t+' '+pp,{size:.15,bg:'#ffffff'});l.position.copy(m).add(V(-.35,.25,0));g2.add(l);
      for(let j=0;j<per;j++){const idx=i*per+j,lf=L[idx];const e=V(.7,.6,m.z+(j-(per-1)/2)*(per>2?.36:.5));const lon=idx===st.leaf;g2.add(seg(m,e,lon?'#f5b301':'#cbd5e1',lon?.03:.012));const s=mk(new THREE.SphereGeometry(.1,14,10),lam(lon?'#f5b301':lf.col),0);s.position.copy(e);g2.add(s);A.drag(s,{tap:()=>{st.leaf=idx;st.runs=0;st.hits=0;A.pop();draw();A.say(lf.n+': '+lf.p);if(mode==='play'&&!st.setup&&st.want!=null&&st.want===idx)game.solved('Yes! P('+lf.n+') = '+lf.p+'.');}});
        const l2=label(lf.n+'  '+lf.p,{size:.13,color:INK});l2.position.copy(e).add(V(.55,.05,0));g2.add(l2);}});
    const rl=label(st.kind==='ind'?'coin, then spinner':'2 tickets, no replacement',{size:.17,color:GREY});rl.position.set(-1.5,1.3,-2.6);g2.add(rl);
    if(st.runs){const th=leaves(st.kind)[st.leaf].v,ex=st.hits/st.runs;[[th,'#2f7de1','theory'],[ex,'#f5b301','experiment']].forEach(([v,c,t],k)=>{const b=mk(new THREE.BoxGeometry(.22,Math.max(.01,v*4),.22),lam(c),0);b.position.set(1.85+k*.3,v*2,-1.0);g2.add(b);});}A.redraw();}
  function trial(){const L=leaves(st.kind);let r=Math.random(),acc2=0,k=0;for(;k<L.length;k++){acc2+=L[k].v;if(r<acc2)break;}return Math.min(k,L.length-1);}
  function run(n){const s=[];for(let b=0;b<10;b++)s.push([120,()=>{for(let i=0;i<n/10;i++){st.runs++;if(trial()===st.leaf)st.hits++;}draw();}]);s.push([200,()=>{A.pop();A.say(st.hits+'/'+st.runs+' ≈ '+(st.hits/st.runs).toFixed(3));}]);A.seq(s);}
  draw();
  return {info:()=>st.kind+' '+st.leaf,
    controls:()=>{const c=[{t:st.kind==='ind'?'Coin + spinner':'Two tickets',fn:()=>{st.kind=st.kind==='ind'?'dep':'ind';st.leaf=0;st.runs=0;st.hits=0;draw();}},{t:'Run 200 trials',go:true,fn:()=>run(200)},{t:'Clear',fn:()=>{st.runs=0;st.hits=0;draw();}}];if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);return c;},
    demo(n){st.ask=null;st.want=null;st.runs=0;st.hits=0;if(n==='ind'){st.kind='ind';st.leaf=0;draw();}if(n==='run'){st.kind='ind';st.leaf=0;draw();A.seq([[500,()=>run(200)]]);}},
    task(r){st.setup=true;st.ask=null;st.want=null;st.runs=0;st.hits=0;st.leaf=0;let txt;
      if(r===0){st.kind='ind';st.ask={ans:'8',o:shuffle(['8','6','4']),ok:'Yes! 2 × 4 = 8 outcomes.'};txt='How many outcomes does a *coin + 4-colour spinner* have?';}
      else if(r===1){st.kind='ind';st.want=6;txt='Tap the leaf for *tails and green*. What is its probability?';}
      else if(r===2){st.kind='dep';st.ask={ans:'3/10',o:shuffle(['3/10','9/25','6/25']),ok:'Yes! 3/5 × 2/4 = 6/20 = 3/10.'};txt='3 red and 2 blue tickets, *no replacement*. Find *P(red, red)*.';}
      else if(r===3){st.kind='ind';st.ask={ans:'1/12',o:shuffle(['1/12','1/8','2/8']),ok:'Yes! 1/2 × 1/6 = 1/12.'};txt='Flip a coin and roll a die. Find *P(heads and 6)*.';}
      else{st.kind='ind';st.ask={ans:'It gets closer to 1/8',o:shuffle(['It gets closer to 1/8','It moves away from 1/8','It is always exactly 1/8']),ok:'Yes! More trials, closer to theory.'};txt='As you run *more trials*, what happens to the experimental P(heads, red)?';}
      draw();st.setup=false;return txt;}};}
});
function leaves(kind){if(kind==='ind'){const C=[['R','#e4572e'],['B','#2f7de1'],['G','#16a36f'],['Y','#f5b301']];return ['H','T'].flatMap(c=>C.map(([s,col])=>({n:c+', '+s,p:'1/8',v:.125,col})));}
  return [{n:'R, R',p:'3/10',v:.3,col:'#e4572e'},{n:'R, B',p:'3/10',v:.3,col:'#8b5cf6'},{n:'B, R',p:'3/10',v:.3,col:'#8b5cf6'},{n:'B, B',p:'1/10',v:.1,col:'#2f7de1'}];}
})();
