/* The Interactive Classroom: Grade 5 Math — Algebra (15–19) and Data (20–23) */
(function(){
"use strict";
const P=window.PM;if(!P||P.failed||!P.THREE)return;
const {THREE,V,W,D,PY,PX,X0,TW,INK,RED,BLUE,GREY,VIBE,FT,ZS,G,M,lam,mk,unitBox,cellMat,label,starGeo,wedgeGeo,clearGroup,disposeObj,rr,T,wrap,para,header,keyWords,predict,box,caption,cxOf,cyOf,tint,moveTo,hop,tween,burst,easeOut,easeIO,A}=P;
const acc=()=>P.ACC;
const rnd=(a,b)=>a+Math.floor(Math.random()*(b-a+1)),pick=a=>a[Math.floor(Math.random()*a.length)],shuffle=a=>a.slice().sort(()=>Math.random()-.5);
const gcd=(a,b)=>b?gcd(b,a%b):a;
function choices(game,list,ans,ok,lab){return list.map(o=>({t:lab?lab(o):String(o),big:true,fn:()=>{if(o===ans){if(game)game.solved(ok);else A.good(ok);}else A.bad('Not quite. Try again!');}}));}
function opts(ans,spread,min){const s=new Set([ans]);let k=0;while(s.size<3&&k<60){k++;const v=Math.round((ans+pick(spread))*100)/100;if(v>=(min==null?0:min))s.add(v);}return shuffle([...s]);}

/* =========================================================
   15. Patterns: growing, shrinking and decimal
   ========================================================= */
P.lesson({id:'patterns5',title:'Growing and shrinking patterns',strand:'Algebra',codes:['C1.1','C1.2','C1.3','C1.4'],
 guide:{goal:'Identify, describe, create and extend repeating, growing and shrinking patterns, show them in tables of values and graphs, find missing terms with a pattern rule, and make patterns with decimal tenths and hundredths.',words:'pattern rule, term, term number, table of values, growing, shrinking, repeating, graph',
  ask:['What is the pattern rule? How can you test it?','How can you predict term 10 without building it?','How is 0.05, 0.10, 0.15 like 5, 10, 15?'],home:'Track a savings jar: start with $20 and add $5 each week. Make a table and a graph for 8 weeks.'},
 learn:[{say:'Patterns grow or shrink by a rule.',speech:'Mateo’s pattern starts at fifteen and goes down by two each time. It is a shrinking pattern. Watch the towers fall: fifteen, thirteen, eleven, nine. The tops still make a straight line.',view:'model',demo:'shrink'},
        {say:'Read about pattern rules.',speech:'A pattern rule tells the start and the change. The table of values pairs each term number with its value. The graph shows the same pattern as points.',view:'read'},
        {say:'Watch: a hundredths pattern.',speech:'Now each cube is worth one hundredth. The towers show zero point zero three, zero point zero five, zero point zero seven. Decimal patterns follow the same rules as whole numbers.',view:'model',demo:'decimal'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: change the rule.',speech:'Your turn. Change the start and the change, and switch what each cube is worth.',view:'model'}],
 fig:'Towers for terms 1 to 6. The tops make a graph of the pattern.',rz:.3,
 explore:['Change the *start* and the *change* (it can be negative).','Switch *each cube = 1, 0.1 or 0.01*.','Read the *table of values* below the model.'],
 howTo:'Find the pattern rule. Build the glowing tower so it shows the missing term. Tap the tower or use the buttons.',
 init:k=>({a:15,b:-2,sc:1,miss:-1,user:0}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'A *growing pattern* increases by a rule, a *shrinking pattern* decreases, and a *repeating pattern* has a core that repeats.')+18;
  for(let n=1;n<=5;n++){const h=11-2*(n-1);for(let k=0;k<h;k++){rr(g,X0+(n-1)*100,y+250-k*22,40,20,4);g.fillStyle=VIBE[n];g.fill();}T(g,'term '+n,X0+(n-1)*100+20,y+284,FT.small,GREY,'center');}
  const tx=X0+520;rr(g,tx,y+40,310,150,14);g.fillStyle=tint(acc(),.1);g.fill();T(g,'Term',tx+18,y+84,FT.smallB);T(g,'Value',tx+18,y+150,FT.smallB);
  [11,9,7,5,3].forEach((v,i)=>{T(g,String(i+1),tx+120+i*44,y+84,ZS(30),INK,'center');T(g,String(v),tx+120+i*44,y+150,ZS(30),'#8b5cf6','center');});T(g,'start 11, subtract 2',tx,y+230,FT.hand,BLUE);y+=314;
  y=para(p,y,'The same rules work for decimals: *0.4, 0.6, 0.8, 1.0* (add 0.2) and *0.05, 0.10, 0.15* (add 0.05). Repeating: *▲ ● ● ▲ ● ●* has the core ▲ ● ●.')+12;
  y=keyWords(p,y,[['pattern rule','the start and the change for each term'],['shrinking pattern','a pattern that decreases each time']]);
  predict(p,y,S,'p15','Rule: start at 50, subtract 6. What is term 5?','*26.* 50, 44, 38, 32, 26.');},
 readout(p,S,y){const g=p.g,st=S.st,f=v=>st.sc===1?String(v):(v*st.sc).toFixed(st.sc===.1?1:2);T(g,'Term',X0,y+36,FT.smallB);T(g,'Value',X0,y+80,FT.smallB);
  for(let n=1;n<=6;n++){const v=st.a+st.b*(n-1);const hide=n-1===st.miss;T(g,String(n),X0+150+(n-1)*110,y+36,ZS(32),INK,'center');T(g,hide?(st.user?f(st.user):'?'):f(v),X0+150+(n-1)*110,y+80,ZS(30),hide?'#e4572e':'#8b5cf6','center');}
  T(g,'Rule: start at '+f(st.a)+', '+(st.b>=0?'add '+f(st.b):'subtract '+f(-st.b)),X0,y+122,FT.bodyB,acc());return y+130;},
 build(S,grp,mode,game){const st=S.st,u=.1,Z=-1.6,xs=n=>-1.9+n*.76;const towers=new THREE.Group();grp.add(towers);
  const base=mk(new THREE.BoxGeometry(4.5,.03,1.1),[lam('#efe9ff'),lam('#efe9ff'),cellMat('#f7f3ff',18,4),lam('#efe9ff'),lam('#efe9ff'),lam('#efe9ff')],20);base.position.set(0,.015,Z);grp.add(base);
  const line=new THREE.Group();grp.add(line);const f=v=>st.sc===1?String(v):(v*st.sc).toFixed(st.sc===.1?1:2);
  const val=n=>st.a+st.b*n;
  function draw(){clearGroup(towers);clearGroup(line);const tops=[];
    for(let n=0;n<6;n++){const isM=n===st.miss;const h=isM?st.user:val(n);const g=new THREE.Group();g.position.set(xs(n),0,Z);towers.add(g);
      for(let k=0;k<h;k++){const c=unitBox(1,1,1,isM?'#ffd24a':VIBE[n%6],u);c.scale.set(1.6,1,1.6);c.position.y=u/2+.03+k*u;g.add(c);}
      if(isM){const ring=mk(new THREE.BoxGeometry(u*1.6+.14,.02,u*1.6+.14),lam('#e4572e'),0);ring.position.y=.04;g.add(ring);A.drag(g,{tap:()=>setU(st.user+1)});const q=label(st.user?f(st.user):'?',{size:.24,bg:'#ffffff',border:'#e4572e'});q.position.y=h*u+.4;g.add(q);}
      else{const l=label(f(h),{size:.2,color:INK});l.position.y=h*u+.25;g.add(l);tops.push(V(xs(n),h*u+.06,Z+.3));}
      const tn=label('term '+(n+1),{size:.15,color:GREY});tn.position.set(0,.2,.6);g.add(tn);}
    for(let i=0;i<tops.length-1;i++){const a=tops[i],b=tops[i+1];const len=a.distanceTo(b);const seg=new THREE.Mesh(new THREE.CylinderGeometry(.02,.02,len,6),lam('#8b5cf6'));seg.position.copy(a).add(b).multiplyScalar(.5);
      seg.quaternion.setFromUnitVectors(V(0,1,0),b.clone().sub(a).normalize());line.add(seg);}
    tops.forEach(t=>{const dt=new THREE.Mesh(G('p5dot',()=>new THREE.SphereGeometry(.05,10,8)),lam('#8b5cf6'));dt.position.copy(t);line.add(dt);});A.redraw();}
  function setU(n){n=Math.max(0,Math.min(20,n));if(n===st.user)return;st.user=n;A.pop();draw();if(mode==='play'&&!st.setup&&n===val(st.miss))game.solved('Yes! Term '+(st.miss+1)+' is '+f(n)+'.');}
  function setRule(a,b){if(a<1||a>18||b<-4||b>4||a+5*b<1||a+5*b>20)return;st.a=a;st.b=b;draw();}
  draw();
  return {info:()=>'Rule: start '+f(st.a)+', change '+f(st.b),
    controls:()=>mode==='play'?[{t:'− cube',fn:()=>setU(st.user-1)},{t:'+ cube',go:true,big:true,fn:()=>setU(st.user+1)}]:
      [{t:'Start −',fn:()=>setRule(st.a-1,st.b)},{t:'Start +',fn:()=>setRule(st.a+1,st.b)},{t:'Change −',fn:()=>setRule(st.a,st.b-1)},{t:'Change +',fn:()=>setRule(st.a,st.b+1)},
       ...[[1,'cube = 1'],[.1,'0.1'],[.01,'0.01']].map(([s,t])=>({t,on:st.sc===s,fn:()=>{st.sc=s;draw();}}))],
    demo(n){st.miss=-1;if(n==='shrink'){st.sc=1;st.a=15;st.b=-2;}else{st.sc=.01;st.a=3;st.b=2;}draw();A.say(n==='shrink'?'15, 13, 11, 9, 7, 5':'0.03, 0.05, 0.07, 0.09, 0.11, 0.13');},
    task(r){st.setup=true;st.sc=1;st.user=0;if(r===0){st.a=rnd(1,4);st.b=rnd(2,3);st.miss=5;}else if(r===1){st.b=-rnd(2,3);st.a=rnd(-5*st.b+2,18);st.miss=rnd(2,4);}
      else if(r===2){st.sc=.1;st.a=rnd(1,4);st.b=2;st.miss=5;}else if(r===3){st.sc=.01;st.a=rnd(2,5);st.b=rnd(2,3);st.miss=rnd(1,4);}else{st.b=-3;st.a=rnd(16,18);st.miss=5;}
      draw();st.setup=false;
      return r===1||r===4?'A *shrinking* pattern. Build the missing *term '+(st.miss+1)+'*.':r===2?'Each cube = 0.1. Build *term 6* of '+[0,1,2].map(n=>f(val(n))).join(', ')+'…':r===3?'Each cube = 0.01. Build the missing *term '+(st.miss+1)+'*.':'Build the missing *term '+(st.miss+1)+'*. Find the rule first!';}};}
});

/* =========================================================
   16. Expressions: translate and evaluate
   ========================================================= */
P.lesson({id:'expr5',title:'Algebraic expressions',strand:'Algebra',codes:['C2.1','C2.2'],
 guide:{goal:'Translate among words, algebraic expressions and models that describe the same relationship, and evaluate expressions by substituting whole numbers for the variable.',words:'variable, expression, coefficient, constant, evaluate, substitute',
  ask:['How would you write “4 more than 3 times a number”?','What does 2n mean?','What is 5n − 3 when n = 6? How do you know?'],home:'A movie costs $8 per person plus $5 for popcorn. Write an expression for p people, then find the cost for your family.'},
 learn:[{say:'An expression is a recipe with a variable.',speech:'The expression three n plus two means three of Keiko’s bags of n, plus two more. Watch: when n is four, each bag holds four cubes. Three fours are twelve, plus two is fourteen.',view:'model',demo:'eval'},
        {say:'Read: words, expressions and models.',speech:'Three times a number, plus two, can be written three n plus two. The three is the coefficient. The two is the constant. To evaluate, put a number in for n.',view:'read'},
        {say:'Watch: change the value of n.',speech:'Now watch n change from one to six. The bags fill up, and the value of the expression grows by three each time.',view:'model',demo:'vary'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: set n and evaluate.',speech:'Your turn. Change n and the number of bags, then read the value of the expression.',view:'model'}],
 fig:'Bags of n cubes plus extra cubes model an expression.',rz:.3,
 explore:['Press *n −* and *n +* to fill the bags.','Change the number of *bags* and *extra* cubes.','The tower shows the *value* of the expression.'],
 howTo:'Set n to the value in the question, then choose the value of the expression. Or choose the expression that matches the words or the model.',
 init:k=>({k:3,c:2,op:'+',n:4,ask:null,needN:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'An *expression* uses numbers, operations and a *variable*. It has no equal sign. *3n + 2* means 3 × n + 2.')+16;
  [['Words','2 more than 3 times a number'],['Expression','3n + 2'],['Model','3 bags of n and 2 cubes']].forEach(([a,b],i)=>{rr(g,X0,y+i*56,TW,48,12);g.fillStyle=tint(acc(),.1);g.fill();T(g,a,X0+18,y+i*56+33,FT.smallB,acc());T(g,b,X0+210,y+i*56+33,FT.bodyB);});y+=180;
  for(let b=0;b<3;b++){g.beginPath();g.ellipse(X0+60+b*110,y+60,40,50,0,0,Math.PI*2);g.fillStyle='#8b5cf6';g.fill();T(g,'n',X0+60+b*110,y+72,ZS(36),'#fff','center');}
  for(let c=0;c<2;c++){rr(g,X0+380+c*50,y+40,40,40,6);g.fillStyle='#16a36f';g.fill();}T(g,'n = 4:  3 × 4 + 2 = 14',X0+520,y+72,FT.bodyB,acc());y+=140;
  y=para(p,y,'*Evaluate* by substituting a number for the variable, then calculate: when n = 5, *4n − 3* = 20 − 3 = *17*.')+12;
  y=keyWords(p,y,[['coefficient','the number that multiplies the variable, like 3 in 3n'],['evaluate','find the value when the variable is given a number']]);
  predict(p,y,S,'p16','Write an expression for “5 less than twice a number”.','*2n − 5.* Twice a number is 2n, and 5 less means subtract 5.');},
 readout(p,S,y){const g=p.g,st=S.st,ex=ext(st);T(g,ex,X0,y+50,ZS(52),acc());T(g,'n = '+st.n+'   →   '+st.k+' × '+st.n+' '+st.op+' '+st.c+' = '+val(st),X0,y+94,FT.bodyB);return y+102;},
 build(S,grp,mode,game){const st=S.st,u=.11,Z=-1.9;const g2=new THREE.Group();grp.add(g2);
  function draw(){clearGroup(g2);const bw=.62;const x0=-2.0;
    for(let b=0;b<st.k;b++){const x=x0+b*bw+.3;const bag=mk(G('ebag',()=>new THREE.CylinderGeometry(.22,.26,.3,18)),new THREE.MeshLambertMaterial({color:'#8b5cf6',transparent:true,opacity:.35}),0);bag.position.set(x,.15,Z);g2.add(bag);
      const t=label('n',{size:.22,color:'#7c3aed'});t.position.set(x,.5,Z+.25);g2.add(t);for(let i=0;i<st.n;i++){const c=unitBox(1,1,1,'#8b5cf6',u);c.position.set(x+((i%2)-.5)*u*1.1,.06+u/2+Math.floor(i/2)*u,Z);g2.add(c);}A.drag(bag,{tap:()=>setN(st.n+1)});}
    const cx=x0+st.k*bw+.25;for(let i=0;i<st.c;i++){const c=unitBox(1,1,1,st.op==='+'?'#16a36f':'#e0453a',u*1.3);c.position.set(cx+(i%3)*u*1.4,.03+u*.65+Math.floor(i/3)*u*1.3,Z);if(st.op==='−')c.traverse(o=>{if(o.isMesh){const f=m=>{const k=m.clone();k.transparent=true;k.opacity=.45;return k;};o.material=Array.isArray(o.material)?o.material.map(f):f(o.material);}});g2.add(c);}
    if(st.c){const l=label(st.op==='+'?'+'+st.c:'−'+st.c,{size:.22,color:st.op==='+'?'#16a36f':'#e0453a'});l.position.set(cx+u*1.4,.75,Z);g2.add(l);}
    const v=val(st),h=Math.max(.02,v*.03);const tw=mk(new THREE.BoxGeometry(.4,h,.4),lam('#ffcf3f'),20);tw.position.set(1.95,h/2,-1.0);g2.add(tw);const tl=label('= '+v,{size:.3,bg:'#ffffff'});tl.position.set(1.95,h+.35,-1.0);g2.add(tl);
    const el=label(ext(st),{size:.36,bg:'#ffffff',border:'#8b5cf6'});el.position.set(-.4,1.55,Z-.6);g2.add(el);A.redraw();}
  function setN(n){n=Math.max(0,Math.min(12,n));if(n===st.n)return;st.n=n;A.pop();draw();}
  function setUp(k,c,op,n){st.k=k;st.c=c;st.op=op;st.n=n;draw();}
  draw();
  return {info:()=>ext(st)+' when n = '+st.n,
    controls:()=>{if(mode==='play'&&st.ask&&(st.needN==null||st.n===st.needN))return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok);
      const c=[{t:'n −',fn:()=>setN(st.n-1)},{t:'n +',go:true,big:true,fn:()=>setN(st.n+1)}];
      if(mode==='learn')c.push({t:'Bags −',fn:()=>{if(st.k>1){st.k--;draw();}}},{t:'Bags +',fn:()=>{if(st.k<5){st.k++;draw();}}},{t:'Extra −',fn:()=>{if(st.c>0){st.c--;draw();}}},{t:'Extra +',fn:()=>{if(st.c<9){st.c++;draw();}}},{t:'+ / −',fn:()=>{st.op=st.op==='+'?'−':'+';draw();}});
      return c;},
    demo(n){st.ask=null;if(n==='eval'){setUp(3,2,'+',0);A.seq([[800,()=>setN(1)],[400,()=>setN(2)],[400,()=>setN(3)],[400,()=>setN(4)],[900,()=>A.say('3 × 4 + 2 = 14')]]);}
      if(n==='vary'){setUp(3,2,'+',1);const l=[];for(let i=2;i<=6;i++)l.push([800,()=>{setN(i);A.say('n = '+i+': '+val(st));}]);A.seq(l);}},
    task(r){st.setup=true;st.ask=null;st.needN=null;let txt;
      if(r===0||r===3){const k=rnd(2,5),c=rnd(1,9),op=r===3?'−':'+',n=rnd(3,9);setUp(k,c,op,0);st.needN=n;const v=val({k,c,op,n});st.ask={ans:v,o:opts(v,[1,-1,k,-k,2*c,-c]),ok:'Yes! '+k+' × '+n+' '+op+' '+c+' = '+v+'.'};txt='Evaluate *'+ext(st)+'* when *n = '+n+'*. Set n first!';}
      else if(r===1){const k=rnd(2,5),c=rnd(2,9);setUp(k,c,'+',2);const a=k+'n + '+c;st.ask={ans:a,o:shuffle([a,c+'n + '+k,k+' + n + '+c]),ok:'Yes! '+a+'.'};txt='Choose the expression for *'+c+' more than '+k+' times a number*.';}
      else if(r===2){const k=rnd(2,5),c=rnd(1,7),op=pick(['+','−']);setUp(k,c,op,3);const a=ext(st);st.ask={ans:a,o:shuffle([a,c+'n '+op+' '+k,k+'n '+(op==='+'?'−':'+')+' '+c]),ok:'Yes! The model shows '+a+'.'};txt='Which expression does the *model* show?';}
      else{const n=rnd(4,9),c=rnd(2,6);setUp(2,c,'−',0);st.needN=n;const v=2*n-c;st.ask={ans:v,o:opts(v,[1,-1,2,c,-2]),ok:'Yes! 2 × '+n+' − '+c+' = '+v+'.'};txt='*'+c+' less than twice a number*. Find its value when *n = '+n+'*.';}
      st.setup=false;return txt;}};}
});
function ext(st){return (st.k===1?'':st.k)+'n'+(st.c?' '+st.op+' '+st.c:'');}
function val(st){return st.op==='+'?st.k*st.n+st.c:st.k*st.n-st.c;}

/* =========================================================
   17. Equations to 100
   ========================================================= */
P.lesson({id:'equations5',title:'Solving equations to 100',strand:'Algebra',codes:['C2.3'],
 guide:{goal:'Solve equations that involve whole numbers up to 100 using a balance model and inverse operations, and verify the solutions.',words:'equation, variable, solve, verify, balance, inverse operation',
  ask:['How can subtraction help solve n + 37 = 82?','What does 4n = 92 mean on a balance?','How do you check that n = 23 is correct?'],home:'Make equations from shopping: “I spent $37 and have $45 left. How much did I start with?”'},
 learn:[{say:'Keep the balance level.',speech:'On Jordan’s balance, n plus thirty-seven equals eighty-two. The balance is level only when both sides are equal. Watch n change until the scale is level.',view:'model',demo:'solve'},
        {say:'Read about inverse operations.',speech:'Use the inverse operation to undo. n plus thirty-seven equals eighty-two, so n equals eighty-two minus thirty-seven, which is forty-five. Then verify: forty-five plus thirty-seven is eighty-two.',view:'read'},
        {say:'Watch: four equal bags.',speech:'Four n equals ninety-two means four bags with the same amount. Ninety-two divided by four is twenty-three, so each bag holds twenty-three.',view:'model',demo:'bags'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: balance the scale.',speech:'Your turn. Change n with the buttons until the scale balances.',view:'model'}],
 fig:'A pan balance. Each purple bag holds n.',rz:.15,
 explore:['Change *n* with *−1*, *+1*, *−10* and *+10*.','Each purple bag holds *n*.','The scale is level when both sides are *equal*.'],
 howTo:'Change n until the scale is level. Then n is the solution.',
 init:k=>({bags:1,c:37,total:82,n:0,txt:'n + 37 = 82'}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'An *equation* is balanced: both sides are equal. To *solve* it, find the value of the variable. Use *inverse operations* to undo.')+18;
  [['n + 37 = 82','n = 82 − 37 = 45'],['n − 19 = 56','n = 56 + 19 = 75'],['4n = 92','n = 92 ÷ 4 = 23'],['3n + 10 = 70','3n = 60, n = 20']].forEach(([a,b],i)=>{rr(g,X0,y+i*62,TW,54,14);g.fillStyle=tint(acc(),.1);g.fill();T(g,a,X0+20,y+i*62+38,ZS(34),acc());T(g,b,X0+380,y+i*62+36,FT.bodyB);});y+=282;
  y=para(p,y,'*Verify* by substituting: 4 × 23 = 92 ✓. If both sides match, the solution is correct.')+12;
  y=keyWords(p,y,[['inverse operation','the operation that undoes another, like − undoes +'],['verify','check a solution by substituting it']]);
  predict(p,y,S,'p17','Solve: 5k = 85','*k = 17.* 85 ÷ 5 = 17, and 5 × 17 = 85.');},
 readout(p,S,y){const g=p.g,st=S.st,L=st.bags*st.n+st.c;T(g,st.txt,X0,y+50,ZS(50),acc());T(g,'n = '+st.n+'   →   '+(st.bags>1?st.bags+' × '+st.n:st.n)+(st.c?' + '+st.c:'')+' = '+L+(L===st.total?'  ✓ balanced':L<st.total?'  (too light)':'  (too heavy)'),X0,y+92,FT.bodyB,L===st.total?'#16a36f':INK);return y+102;},
 build(S,grp,mode,game){const st=S.st,PV=V(0,1.62,-1.45),ARM=1.5;let ang=0,tAng=0;
  const foot=mk(new THREE.BoxGeometry(1.2,.08,.7),lam('#7c3aed'),20);foot.position.set(0,.04,PV.z);grp.add(foot);const post=mk(new THREE.BoxGeometry(.13,PV.y,.13),lam('#c9b8f2'),20);post.position.set(0,PV.y/2,PV.z);grp.add(post);
  const beam=new THREE.Group();beam.position.copy(PV);grp.add(beam);beam.add(mk(new THREE.BoxGeometry(3.2,.09,.14),lam('#7c3aed'),20));
  const pans=[-1,1].map(()=>{const g=new THREE.Group();g.add(mk(new THREE.CylinderGeometry(.7,.62,.06,32),lam('#ffd24a'),30));const rod=new THREE.Mesh(new THREE.CylinderGeometry(.015,.015,.7,6),lam(INK));rod.position.y=.38;g.add(rod);
    const cg=new THREE.Group();g.add(cg);g.userData.cg=cg;grp.add(g);return g;});const u=.075;
  function blocks(cg,v,x0,col){const tens=Math.floor(v/10),ones=v%10;let x=x0;for(let i=0;i<tens;i++){const r=unitBox(1,10,1,col,u);r.position.set(x,.03+5*u,(i%2)*.1-.05);cg.add(r);x+=u*.75;}
    x+=.04;for(let i=0;i<ones;i++){const c=unitBox(1,1,1,col,u);c.position.set(x+Math.floor(i/5)*(u+.01),.03+u/2+(i%5)*u,0);cg.add(c);}}
  const nL=label('',{size:.24,bg:'#ffffff',border:'#7c3aed'});grp.add(nL);
  function fill(){const L=pans[0].userData.cg,R=pans[1].userData.cg;clearGroup(L);clearGroup(R);
    const bw=.3;for(let b=0;b<st.bags;b++){const bag=new THREE.Group();const sk=mk(G('bag5',()=>new THREE.CylinderGeometry(.12,.15,.34,16)),lam('#8b5cf6'),0);sk.position.y=.2;bag.add(sk);
      const tie=mk(G('bag5t',()=>new THREE.SphereGeometry(.065,10,8)),lam('#c9b8f2'),0);tie.position.y=.4;bag.add(tie);const t=label('n',{size:.17,color:'#fff'});t.position.set(0,.22,.16);bag.add(t);bag.position.set(-.5+b*bw,0,-.22);L.add(bag);A.drag(bag,{tap:()=>setN(st.n+1)});}
    if(st.c)blocks(L,st.c,-.55+(st.bags>2?0:0),'#16a36f');blocks(R,st.total,-.55,'#2f7de1');
    const Lv=st.bags*st.n+st.c;tAng=Math.max(-.3,Math.min(.3,(Lv-st.total)*.01));}
  function place(){beam.rotation.z=ang;[-1,1].forEach((s,i)=>pans[i].position.set(PV.x+s*ARM*Math.cos(ang),PV.y+s*ARM*Math.sin(ang)-.76,PV.z));nL.userData.set('n = '+st.n);nL.position.set(pans[0].position.x,pans[0].position.y+1.15,PV.z);}
  function setN(n){n=Math.max(0,Math.min(100,n));if(n===st.n)return;st.n=n;A.pop();fill();if(st.bags*n+st.c===st.total){A.good('Balanced! n = '+n+'.');if(mode==='play'&&!st.setup)game.solved(st.txt.replace(/[a-z]/,st.bags>1?'('+n+')':String(n))+' ✓  so n = '+n);}A.redraw();}
  function setUp(bags,c,total,txt){st.bags=bags;st.c=c;st.total=total;st.txt=txt;st.n=0;fill();A.redraw();}
  fill();ang=tAng;place();
  return {tick(dt){ang+=(tAng-ang)*Math.min(1,dt*4);place();},info:()=>st.txt+'   (n = '+st.n+')',
    controls:()=>[{t:'−10',fn:()=>setN(st.n-10)},{t:'−1',big:true,fn:()=>setN(st.n-1)},{t:'+1',big:true,go:true,fn:()=>setN(st.n+1)},{t:'+10',fn:()=>setN(st.n+10)}].concat(mode==='learn'?[{t:'New puzzle',fn:()=>{const n=rnd(10,60),c=rnd(10,39);setUp(1,c,n+c,'n + '+c+' = '+(n+c));}}]:[]),
    demo(n){if(n==='solve'){setUp(1,37,82,'n + 37 = 82');A.seq([[700,()=>setN(10)],[600,()=>setN(20)],[600,()=>setN(30)],[600,()=>setN(40)],[600,()=>setN(50)],[700,()=>setN(46)],[600,()=>setN(45)]]);}
      if(n==='bags'){setUp(4,0,92,'4n = 92');A.seq([[800,()=>setN(10)],[700,()=>setN(20)],[700,()=>setN(21)],[500,()=>setN(22)],[500,()=>setN(23)]]);}},
    task(r){st.setup=true;let hint='';if(r===0){const n=rnd(15,60),c=rnd(12,39);setUp(1,c,n+c,'n + '+c+' = '+(n+c));}
      else if(r===1){const k=rnd(25,70),c=rnd(11,29);setUp(1,0,k+c,'n − '+c+' = '+k);hint=' (Think: n = '+k+' + '+c+'.)';}
      else if(r===2){const k=rnd(3,5),n=rnd(12,19);setUp(k,0,k*n,k+'n = '+k*n);}
      else if(r===3){const n=rnd(11,30),c=rnd(5,20);setUp(2,c,2*n+c,'2n + '+c+' = '+(2*n+c));}
      else{const n=rnd(15,40),c=rnd(5,30);setUp(1,c,n+c,'A jacket is on sale for $'+c+' off. You pay $'+(n+c-c)+'.');st.txt='n − '+c+' = '+n;st.bags=1;st.c=0;st.total=n+c;fill();hint='';st.setup=false;return 'A price *n* minus a *$'+c+'* discount is *$'+n+'*. Solve *n − '+c+' = '+n+'*.';}
      st.setup=false;return 'Solve *'+st.txt+'*. Balance the scale.'+hint;}};}
});

/* =========================================================
   18. Inequalities to 50
   ========================================================= */
P.lesson({id:'inequal5',title:'Solving and graphing inequalities',strand:'Algebra',codes:['C2.4'],
 guide:{goal:'Solve inequalities that involve one operation and whole numbers up to 50, verify the solutions, and graph them on a number line.',words:'inequality, less than, greater than, solution set, boundary, graph, verify',
  ask:['How is 3x < 24 different from 3x = 24?','Is the boundary number a solution? How do you check?','Why does the graph of x − 9 > 20 point to the right?'],home:'“A ride needs riders taller than 120 cm.” List some heights that work and some that do not. Draw the number line.'},
 learn:[{say:'Find the boundary, then the side.',speech:'Amani needs x plus seven to be less than twenty. If x plus seven were equal to twenty, x would be thirteen. That is the boundary. Less than means the solutions are smaller: zero up to twelve. Watch the graph light up.',view:'model',demo:'solve'},
        {say:'Read how to graph solutions.',speech:'First solve the matching equation to find the boundary. Test it: is the boundary a solution? Then shade every whole number on the correct side.',view:'read'},
        {say:'Watch: a multiplication inequality.',speech:'Three x is greater than twenty-four. Three times eight is twenty-four, so eight is the boundary. Eight is not a solution, because twenty-four is not greater than twenty-four. The solutions start at nine.',view:'model',demo:'mult'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: graph the solutions.',speech:'Your turn. Move the boundary marker, choose the direction, then press Check.',view:'model'}],
 fig:'A number line from 0 to 50. Green beads show the solutions.',rz:-.1,
 explore:['Move the *boundary* with the buttons.','Choose *◀ smaller* or *bigger ▶*.','Press *Check* to verify your graph.'],
 howTo:'Find the boundary, move the marker there, choose the side, and decide if the boundary itself is a solution. Then press Check.',
 init:k=>({op:'+',a:7,rel:'<',b:20,bound:25,dir:'L',incl:true}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'An *inequality* has many solutions. Solve the matching *equation* to find the *boundary*, then decide which side works.')+18;
  T(g,'x + 7 < 20',X0,y+40,ZS(52),acc());T(g,'boundary: x + 7 = 20, so x = 13',X0+330,y+36,FT.bodyB);y+=76;
  const lx=X0+10,lw=TW-20,toX=v=>lx+v/25*lw;g.strokeStyle=INK;g.lineWidth=4;g.beginPath();g.moveTo(lx,y+40);g.lineTo(lx+lw,y+40);g.stroke();
  for(let v=0;v<=25;v++){const x=toX(v);g.lineWidth=2;g.beginPath();g.moveTo(x,y+(v%5?32:26));g.lineTo(x,y+(v%5?48:54));g.stroke();if(v%5===0)T(g,String(v),x,y+84,FT.small,INK,'center');if(v<=12){g.beginPath();g.arc(x,y+40,9,0,Math.PI*2);g.fillStyle='#16a36f';g.fill();}}
  g.beginPath();g.arc(toX(13),y+40,11,0,Math.PI*2);g.fillStyle='#fff';g.fill();g.lineWidth=3;g.strokeStyle=RED;g.stroke();T(g,'13 is not a solution',toX(13)+20,y+12,FT.hand,RED);y+=120;
  y=para(p,y,'*Verify:* 12 + 7 = 19 < 20 ✓.  13 + 7 = 20, and 20 is *not* less than 20 ✗. So the solutions are *0 to 12*.')+12;
  y=keyWords(p,y,[['boundary','where the inequality changes from true to false'],['solution set','all the numbers that make it true']]);
  predict(p,y,S,'p18','Which whole numbers solve 4x < 20?','*0, 1, 2, 3 and 4.* 4 × 5 = 20, which is not less than 20.');},
 readout(p,S,y){const g=p.g,st=S.st;T(g,iq(st),X0,y+50,ZS(52),acc());const v=ev(st,st.bound),ok=st.rel==='<'?v<st.b:v>st.b;
  T(g,'Test '+st.bound+':  '+lhs(st,st.bound)+' = '+v+'  '+(ok?st.rel+' '+st.b+' ✓':'✗'),X0,y+92,FT.bodyB,ok?'#16a36f':RED);return y+100;},
 build(S,grp,mode,game){const st=S.st,Z=-1.5,L=4.3,x0=-2.15,toX=v=>x0+v/50*L;const tr=mk(new THREE.BoxGeometry(L+.2,.05,.12),lam('#cbd5e6'),0);tr.position.set(0,.03,Z);grp.add(tr);
  for(let v=0;v<=50;v++){const big=v%5===0;const t=new THREE.Mesh(G('iq5t'+big,()=>new THREE.BoxGeometry(.014,big?.2:.1,.014)),lam(INK));t.position.set(toX(v),.05+(big?.1:.05),Z);grp.add(t);if(v%10===0){const l=label(String(v),{size:.24});l.position.set(toX(v),.4,Z+.35);grp.add(l);}}
  const beads=new THREE.Group();grp.add(beads);const mkr=new THREE.Group();grp.add(mkr);const flag=mk(new THREE.ConeGeometry(.12,.3,16),lam('#ffd24a'),0);flag.rotation.x=Math.PI;mkr.add(flag);flag.position.y=.55;
  const ring=mk(new THREE.TorusGeometry(.1,.03,8,20),lam(RED),0);ring.rotation.x=Math.PI/2;ring.position.y=.12;mkr.add(ring);const bl=label('',{size:.24,bg:'#ffffff',border:'#ffd24a'});bl.position.y=.95;mkr.add(bl);
  const arrow=mk(new THREE.ConeGeometry(.12,.3,14),lam('#16a36f'),0);grp.add(arrow);const exL=label('',{size:.4,bg:'#ffffff'});exL.position.set(0,1.5,Z-.9);grp.add(exL);
  A.drag(mkr,{h:.2,drop:pos=>{setB(Math.round((pos.x-x0)/L*50));}});
  function shown(){const s=[];for(let v=0;v<=50;v++){if(st.dir==='L'?v<st.bound||(st.incl&&v===st.bound):v>st.bound||(st.incl&&v===st.bound))s.push(v);}return s;}
  function sols(){const s=[];for(let v=0;v<=50;v++){if(st.op==='−'&&v<st.a)continue;const r=ev(st,v);if(st.rel==='<'?r<st.b:r>st.b)s.push(v);}return s;}
  function draw(){clearGroup(beads);shown().forEach(v=>{const b=mk(G('iq5b',()=>new THREE.SphereGeometry(.045,10,8)),lam('#16a36f'),0);b.position.set(toX(v),.12,Z);beads.add(b);});
    mkr.position.set(toX(st.bound),0,Z);ring.material=lam(st.incl?'#16a36f':RED);bl.userData.set(String(st.bound));arrow.rotation.z=st.dir==='L'?Math.PI/2:-Math.PI/2;arrow.position.set(st.dir==='L'?x0-.15:x0+L+.15,.12,Z);
    exL.userData.set(iq(st));A.redraw();}
  function setB(v){st.bound=Math.max(0,Math.min(50,v));A.pop();draw();}
  function check(){const s=sols(),m=shown();const same=s.length===m.length&&s.every((v,i)=>v===m[i]);
    if(same){A.good('Your graph shows every solution!');if(mode==='play'&&!st.setup)game.solved('Solutions: '+(s.length?s[0]+' to '+s[s.length-1]:'none')+'.');return;}
    const wrong=m.find(v=>!s.includes(v)),miss=s.find(v=>!m.includes(v));A.bad(wrong!=null?'Test '+wrong+': '+lhs(st,wrong)+' = '+ev(st,wrong)+'. Is that '+(st.rel==='<'?'less':'greater')+' than '+st.b+'?':'You are missing '+miss+'. Test it!');}
  function setUp(op,a,rel,b){st.op=op;st.a=a;st.rel=rel;st.b=b;st.bound=25;st.dir='L';st.incl=true;draw();}
  draw();
  return {info:()=>iq(st)+'   ·   boundary '+st.bound,
    controls:()=>[{t:'−5',fn:()=>setB(st.bound-5)},{t:'−1',fn:()=>setB(st.bound-1)},{t:'+1',fn:()=>setB(st.bound+1)},{t:'+5',fn:()=>setB(st.bound+5)},
      {t:'◀ smaller',on:st.dir==='L',fn:()=>{st.dir='L';draw();}},{t:'bigger ▶',on:st.dir==='R',fn:()=>{st.dir='R';draw();}},{t:st.incl?'Boundary: in ●':'Boundary: out ○',fn:()=>{st.incl=!st.incl;draw();}},{t:'Check',go:true,big:true,fn:check}]
      .concat(mode==='learn'?[{t:'New inequality',fn:fresh}]:[]),
    demo(n){if(n==='solve'){setUp('+',7,'<',20);A.seq([[700,()=>setB(20)],[600,()=>setB(15)],[600,()=>setB(13)],[900,()=>{st.incl=false;draw();A.say('13 + 7 = 20 is not less than 20.');}],[1200,check]]);}
      if(n==='mult'){setUp('×',3,'>',24);A.seq([[700,()=>setB(10)],[600,()=>setB(8)],[800,()=>{st.dir='R';st.incl=false;draw();A.say('3 × 8 = 24 is not greater than 24.');}],[1300,check]]);}},
    task(r){st.setup=true;[()=>{const a=rnd(5,15);setUp('+',a,'<',rnd(a+8,48));},()=>{const a=rnd(4,12);setUp('−',a,'>',rnd(10,30));},()=>{const a=rnd(2,5);setUp('×',a,'<',a*rnd(4,9));},
      ()=>{const a=rnd(3,6);setUp('×',a,'>',a*rnd(3,7)+rnd(0,a-1));},()=>{const a=rnd(10,20);setUp('+',a,'>',rnd(a+5,45));}][r]();st.setup=false;
      return 'Graph every whole number from 0 to 50 that solves *'+iq(st)+'*, then press Check.';}};
  function fresh(){const t=rnd(0,2);if(t===0){const a=rnd(5,15);setUp('+',a,pick(['<','>']),rnd(a+8,45));}else if(t===1){const a=rnd(4,12);setUp('−',a,'>',rnd(10,30));}else{const a=rnd(2,6);setUp('×',a,pick(['<','>']),a*rnd(3,8));}}}
});
function lhs(st,x){return st.op==='×'?st.a+' × '+x:x+' '+st.op+' '+st.a;}
function ev(st,x){return st.op==='+'?x+st.a:st.op==='−'?x-st.a:st.a*x;}
function iq(st){return (st.op==='×'?st.a+'x':'x '+st.op+' '+st.a)+' '+st.rel+' '+st.b;}

/* =========================================================
   19. Coding with conditional statements
   ========================================================= */
const CONDS=[{k:'gt',t:k=>'n > '+k,f:(n,k)=>n>k},{k:'lt',t:k=>'n < '+k,f:(n,k)=>n<k},{k:'even',t:()=>'n is even',f:n=>n%2===0},{k:'mul',t:k=>'n is a multiple of '+k,f:(n,k)=>n%k===0}];
P.lesson({id:'coding5',title:'Coding with conditional statements',strand:'Algebra',codes:['C3.1','C3.2'],
 guide:{goal:'Write, run, read and alter code that uses conditional statements (if… else…) to sort and make decisions, and describe how changes to the code change the outcome.',words:'code, conditional statement, if, else, condition, true, false, debug, outcome',
  ask:['What does the machine do when the condition is false?','How would the outcome change if you changed n > 20 to n > 30?','How could you sort even and odd numbers?'],home:'Write a conditional for your morning: “If it is raining, take an umbrella; else, take a hat.” Make up three more.'},
 learn:[{say:'If… else… makes a decision.',speech:'Zane’s sorting machine runs a conditional statement. If n is greater than twenty, the ball goes to the red bin. Else, it goes to the blue bin. Watch the machine check each ball.',view:'model',demo:'run'},
        {say:'Read about conditional statements.',speech:'A condition is a question that is either true or false. When it is true, the code does the first action. When it is false, it does the else action.',view:'read'},
        {say:'Watch: change the code.',speech:'Now change the condition to n is even. The same balls sort a different way. Changing the code changes the outcome.',view:'model',demo:'alter'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: write the condition.',speech:'Your turn. Choose the condition and the number so each ball lands in the bin that wants it. Then press Run.',view:'model'}],
 fig:'A sorting machine runs if… else… code on numbered balls.',rz:.4,
 explore:['Choose a *condition*: >, <, even, or multiple of.','Change the *number* with the buttons.','Press *▶ Run* and watch each ball get sorted.'],
 howTo:'Read what each bin wants. Write the condition so true balls go to red and false balls go to blue, then press Run.',
 init:k=>({ci:0,k:20,balls:[7,24,15,31,20,42],goal:null,busy:false}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'A *conditional statement* tells the computer to check a *condition*. If it is *true*, do one thing; *else*, do another.')+16;
  rr(g,X0,y,460,228,16);g.fillStyle='#24203f';g.fill();const MF='700 27px "Atkinson Hyperlegible", monospace';
  T(g,'for each ball n:',X0+24,y+46,MF,'#ffd86b');T(g,'if  n > 20 :',X0+54,y+92,MF,'#9fe6ff');T(g,'send to RED',X0+100,y+130,MF,'#ffc98f');T(g,'else :',X0+54,y+168,MF,'#9fe6ff');T(g,'send to BLUE',X0+100,y+208,MF,'#9fc2ff');
  [[7,'blue'],[24,'red'],[15,'blue'],[31,'red'],[20,'blue']].forEach(([n,c],i)=>{const yy=y+20+i*40;g.beginPath();g.arc(X0+530,yy+12,16,0,Math.PI*2);g.fillStyle=c==='red'?'#e0453a':'#2f7de1';g.fill();T(g,String(n),X0+530,yy+20,FT.cap,'#fff','center');
    T(g,n+' > 20 is '+(c==='red'?'true':'false'),X0+560,yy+20,FT.small,INK);});y+=262;
  y=para(p,y,'*20 > 20* is *false*, so 20 goes to blue. To *debug* code, test the tricky numbers right at the edge.')+12;
  y=keyWords(p,y,[['condition','a test that is true or false'],['else','what happens when the condition is false']]);
  predict(p,y,S,'p19','Code: if n < 10 → red, else → blue. Where does 10 go?','*Blue.* 10 < 10 is false.');},
 readout(p,S,y){const g=p.g,st=S.st,C=CONDS[st.ci];const MF='700 26px "Atkinson Hyperlegible", monospace';rr(g,X0,y,TW,74,12);g.fillStyle='#24203f';g.fill();
  T(g,'if '+C.t(st.k)+' → RED  else → BLUE',X0+20,y+46,MF,'#ffd86b');if(st.goal)T(g,'RED wants: '+st.goal.d,X0,y+108,FT.bodyB,'#e0453a');return y+118;},
 build(S,grp,mode,game){const st=S.st,Zb=-1.7,xs=-2.15,xg=.85;const balls=new THREE.Group();grp.add(balls);
  const belt=mk(new THREE.BoxGeometry(3.2,.08,.6),[lam('#4b5563'),lam('#4b5563'),cellMat('#6b7280',16,1),lam('#4b5563'),lam('#4b5563'),lam('#4b5563')],20);belt.position.set(-.75,.04,Zb);grp.add(belt);
  const gate=new THREE.Group();gate.position.set(xg+.15,0,Zb);grp.add(gate);const gm=mk(new THREE.BoxGeometry(.8,.35,.07),lam('#ffd24a'),0);gm.position.set(.35,.2,0);gate.add(gm);
  const box=mk(new THREE.BoxGeometry(.5,.6,.5),lam('#8b5cf6'),20);box.position.set(xg-.15,.3,Zb);grp.add(box);const lamp=new THREE.Mesh(new THREE.SphereGeometry(.09,12,10),new THREE.MeshLambertMaterial({color:'#ffffff',emissive:'#000000'}));lamp.position.set(xg-.15,.7,Zb);grp.add(lamp);
  const bins=[['#e0453a',-2.75,'RED: true'],['#2f7de1',-.55,'BLUE: false']].map(([c,z,t])=>{const b=new THREE.Group();b.position.set(1.75,0,z);grp.add(b);const w=mk(new THREE.BoxGeometry(.9,.42,.8),new THREE.MeshLambertMaterial({color:c,transparent:true,opacity:.55}),0);w.position.y=.21;b.add(w);
    const l=label(t,{size:.2,bg:'#ffffff',border:c});l.position.set(0,.75,0);b.add(l);b.userData.n=0;return b;});
  const codeL=label('',{size:.26,bg:'#24203f',color:'#ffd86b'});codeL.position.set(-.6,1.35,Zb-.9);grp.add(codeL);
  let meshes=[];
  function lay(){clearGroup(balls);meshes=st.balls.map((n,i)=>{const b=new THREE.Group();const s=mk(G('cb5',()=>new THREE.SphereGeometry(.17,18,12)),lam('#f5f5f5'),0);b.add(s);const l=label(String(n),{size:.2,color:INK});l.position.y=.32;b.add(l);
      b.position.set(xs+i*.42,.24,Zb);balls.add(b);return b;});bins.forEach(b=>b.userData.n=0);codeL.userData.set('if '+CONDS[st.ci].t(st.k)+'  → RED   else → BLUE');A.redraw();}
  function run(){if(st.busy)return;lay();st.busy=true;let i=0,allOk=true;const C=CONDS[st.ci];
    const next=()=>{if(i>=meshes.length){st.busy=false;lamp.material.emissive.set('#000000');if(st.goal){if(allOk){A.good('Every ball landed where it belongs!');if(mode==='play'&&!st.setup)game.solved('Your code sorted every ball!');}else A.bad('Some balls landed in the wrong bin. Debug the condition!');}else A.good('Done!');return;}
      const m=meshes[i],n=st.balls[i];const res=C.f(n,st.k);i++;moveTo(m,{pos:V(xg-.15,.24,Zb),k:9});
      A.later(()=>{lamp.material.emissive.set(res?'#e0453a':'#2f7de1');A.say(n+': '+C.t(st.k).replace(/^n/,String(n))+' is '+(res?'true':'false'));gate.rotation.y=res?.6:-.6;
        const bin=bins[res?0:1];const k=bin.userData.n++;hop(m,V(1.75+((k%3)-1)*.24,.22+Math.floor(k/3)*.3,bin.position.z+(Math.floor(k/3)%2?.12:-.12)),.5,.55);
        if(st.goal&&st.goal.f(n)!==res){allOk=false;A.later(()=>A.bad(n+' should go to '+(st.goal.f(n)?'red':'blue')+'!'),500);}A.later(next,800);},700);};next();}
  function setCode(ci,k){if(st.busy)return;st.ci=ci;st.k=Math.max(1,Math.min(60,k));lay();}
  lay();
  return {tick(dt,t){},info:()=>'if '+CONDS[st.ci].t(st.k)+' → red, else → blue',
    controls:()=>[...CONDS.map((c,i)=>({t:c.k==='gt'?'n > □':c.k==='lt'?'n < □':c.k==='even'?'even?':'multiple of □',on:st.ci===i,fn:()=>setCode(i,c.k==='mul'?(st.k>12?5:st.k):st.k)})),
      {t:'□ −5',fn:()=>setCode(st.ci,st.k-5)},{t:'□ −1',fn:()=>setCode(st.ci,st.k-1)},{t:'□ +1',fn:()=>setCode(st.ci,st.k+1)},{t:'□ +5',fn:()=>setCode(st.ci,st.k+5)},{t:'▶ Run',go:true,big:true,fn:run}]
      .concat(mode==='learn'?[{t:'New balls',fn:()=>{st.balls=Array.from({length:6},()=>rnd(1,50));lay();}}]:[]),
    demo(n){st.busy=false;st.goal=null;st.balls=[7,24,15,31,20,42];if(n==='run'){setCode(0,20);A.seq([[700,run]]);}if(n==='alter'){setCode(2,20);A.seq([[700,run]]);}},
    task(r){st.setup=true;st.busy=false;const G5=[{d:'numbers greater than '+(r===0?25:40),f:n=>n>(r===0?25:40),mk:()=>Array.from({length:6},(_,i)=>i%2?rnd(26+(r?15:0),55):rnd(5,25+(r?15:0)))},
      {d:'even numbers',f:n=>n%2===0},{d:'numbers less than 12',f:n=>n<12},{d:'multiples of 5',f:n=>n%5===0}];
      let gl;if(r===0){gl=G5[0];setCode(1,10);}else if(r===1){gl=G5[1];setCode(0,10);}else if(r===2){gl=G5[2];setCode(0,12);}else if(r===3){gl=G5[3];setCode(3,3);}else{gl={d:'numbers greater than 40',f:n=>n>40};setCode(1,40);}
      st.goal=gl;let b;do{b=Array.from({length:6},()=>rnd(2,55));if(r===2)b=b.map((v,i)=>i%2?rnd(2,11):v);if(r===3)b=b.map((v,i)=>i%2?5*rnd(1,10):v);if(r===0)b=b.map((v,i)=>i===0?25:v);if(r===4)b=b.map((v,i)=>i===0?40:i%2?rnd(41,58):v);}while(!b.some(gl.f)||b.every(gl.f));
      st.balls=b;lay();st.setup=false;
      return r>=3?'*Debug* the code: RED should get *'+gl.d+'*. Change it, then Run.':'Write the code: RED gets *'+gl.d+'*, BLUE gets the rest. Then Run.';}};}
});

/* =========================================================
   20. Sampling and relative frequency
   ========================================================= */
const FAV=[['Soccer','#e0453a'],['Hockey','#2f7de1'],['Swim','#16a36f'],['Dance','#f2a400']];
P.lesson({id:'sampling5',title:'Samples and relative frequency',strand:'Data',codes:['D1.1','D1.2'],
 guide:{goal:'Explain why a sample should represent the whole population, compare sampling techniques, and organize data in relative-frequency tables using fractions, decimals and percents.',words:'population, sample, random sample, representative, biased, frequency, relative frequency',
  ask:['Why might asking only your friends give a biased sample?','What makes a random sample fair?','If 6 of 20 chose hockey, what is the relative frequency as a percent?'],home:'Ask 10 people at random what their favourite fruit is. Write the relative frequency of each answer as a fraction and a percent.'},
 learn:[{say:'A sample stands for the population.',speech:'Layla’s school has one hundred students. She cannot ask everyone, so she asks a sample of twenty. Watch a random sample light up. Every student had the same chance to be picked.',view:'model',demo:'random'},
        {say:'Read about relative frequency.',speech:'Relative frequency is the frequency divided by the total. If six out of twenty chose hockey, the relative frequency is six twentieths, which is zero point three, or thirty percent.',view:'read'},
        {say:'Watch: a biased sample.',speech:'Now we only ask the students in the front corner. They mostly chose soccer, so this sample is biased. It does not represent the whole school.',view:'model',demo:'corner'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: take samples.',speech:'Your turn. Take a random sample or a corner sample, and compare the bars with the whole population.',view:'model'}],
 fig:'A school of 100 students. Raised students are in the sample.',rz:.25,
 explore:['Press *Random sample* or *Corner sample*.','The front bars show the *sample*; the back bars show the *population*.','Compare: is the sample *representative*?'],
 howTo:'Take the sample the question asks for, read the relative-frequency bars, then answer.',
 init:k=>({samp:[],kind:null,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'A *population* is the whole group. A *sample* is part of it. A good sample is *representative*: it looks like the whole group.')+16;
  [['Random','everyone has the same chance','fair'],['Systematic','ask every 5th person on a list','fair'],['Convenience','ask only the people near you','often biased']].forEach(([a,b,c],i)=>{rr(g,X0,y+i*58,TW,50,12);g.fillStyle=tint(acc(),.1);g.fill();
    T(g,a,X0+18,y+i*58+34,FT.smallB,acc());T(g,b,X0+200,y+i*58+34,FT.body);T(g,c,X0+TW-18,y+i*58+34,FT.smallB,i===2?RED:'#16a36f','right');});y+=192;
  T(g,'Relative-frequency table (sample of 20)',X0,y,FT.smallB);y+=14;const hd=['Sport','Tally','Freq.','Rel. freq.'];const cx=[X0,X0+190,X0+380,X0+520];
  rr(g,X0,y,TW,40,10);g.fillStyle=tint(acc(),.16);g.fill();hd.forEach((h,i)=>T(g,h,cx[i]+14,y+28,FT.smallB,acc()));y+=44;
  [[0,7],[1,6],[2,4],[3,3]].forEach(([i,f],j)=>{T(g,FAV[i][0],cx[0]+14,y+j*36+26,FT.body,FAV[i][1]);T(g,'|'.repeat(f),cx[1]+14,y+j*36+26,FT.body);T(g,String(f),cx[2]+14,y+j*36+26,FT.bodyB);T(g,f+'/20 = '+(f/20).toFixed(2)+' = '+f*5+'%',cx[3]+14,y+j*36+26,FT.body);});y+=160;
  y=keyWords(p,y,[['representative','a sample that looks like the population'],['relative frequency','frequency ÷ total, as a fraction, decimal or percent']]);
  predict(p,y,S,'p20','To learn about all Grade 5 students in a city, should you survey one class or students from many schools?','*Students from many schools.* One class could be biased.');},
 readout(p,S,y){const g=p.g,st=S.st;if(!st.samp.length){T(g,'No sample yet.',X0,y+40,FT.bodyB,GREY);return y+50;}const c=counts(st.samp.map(i=>POP[i]));
  T(g,(st.kind==='random'?'Random':'Corner')+' sample of '+st.samp.length+':',X0,y+36,FT.bodyB,acc());FAV.forEach(([n,col],i)=>T(g,n+' '+c[i]+'/'+st.samp.length+' = '+Math.round(c[i]*100/st.samp.length)+'%',X0+(i%2)*TW/2,y+76+Math.floor(i/2)*36,FT.body,col));return y+150;},
 build(S,grp,mode,game){const st=S.st,u=.26,x0=-2.25,z0=-3.0;const ppl=[];
  POP.forEach((c,i)=>{const r=Math.floor(i/10),q=i%10;const g=new THREE.Group();const b=mk(G('sp5b',()=>new THREE.CylinderGeometry(.06,.08,.18,10)),lam(FAV[c][1]),0);b.position.y=.09;g.add(b);
    const h=mk(G('sp5h',()=>new THREE.SphereGeometry(.06,10,8)),lam('#f2c9a0'),0);h.position.y=.23;g.add(h);g.position.set(x0+(q+.5)*u,0,z0+(r+.5)*u);grp.add(g);ppl.push(g);});
  const bars=new THREE.Group();grp.add(bars);const t1=label('back: population   ·   front: sample',{size:.15,color:GREY});t1.position.set(1.65,.15,-.25);grp.add(t1);
  function draw(){ppl.forEach((g,i)=>{const on=st.samp.includes(i);moveTo(g,{pos:V(g.position.x,on?.28:0,g.position.z),k:10});g.scale.setScalar(on?1.25:1);});clearGroup(bars);
    const pc=counts(POP),sc=st.samp.length?counts(st.samp.map(i=>POP[i])):null;
    FAV.forEach(([n,col],i)=>{const x=.85+i*.38;const hp=pc[i]/100*3.2;const b1=mk(new THREE.BoxGeometry(.24,hp,.24),new THREE.MeshLambertMaterial({color:col,transparent:true,opacity:.4}),0);b1.position.set(x,hp/2,-2.0);bars.add(b1);
      const l1=label(pc[i]+'%',{size:.14,color:GREY});l1.position.set(x,hp+.15,-2.0);bars.add(l1);
      if(sc){const v=sc[i]/st.samp.length,h=v*3.2;const b2=mk(new THREE.BoxGeometry(.26,Math.max(.01,h),.26),lam(col),20);b2.position.set(x,h/2,-1.45);bars.add(b2);const l2=label(Math.round(v*100)+'%',{size:.17,bg:'#ffffff',border:col});l2.position.set(x,h+.2,-1.45);bars.add(l2);}
      const nl=label(n,{size:.15,color:col});nl.position.set(x,.12,-.85);bars.add(nl);});A.redraw();}
  function take(kind){st.kind=kind;if(kind==='random')st.samp=shuffle([...Array(100).keys()]).slice(0,20);else{st.samp=[];for(let r=7;r<10;r++)for(let q=0;q<7;q++)if(st.samp.length<20)st.samp.push(r*10+q);}A.pop();draw();A.say(kind==='random'?'Random sample of 20':'Corner sample of 20: the front-left corner');}
  draw();
  return {info:()=>st.samp.length?(st.kind==='random'?'Random':'Corner')+' sample of 20':'Population: 100 students',
    controls:()=>{const c=[{t:'Random sample',go:true,fn:()=>take('random')},{t:'Corner sample',fn:()=>take('corner')},{t:'Clear',fn:()=>{st.samp=[];st.kind=null;draw();}}];
      if(mode==='play'&&st.ask&&(!st.ask.needs||st.kind===st.ask.needs))return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);return c;},
    demo(n){st.ask=null;if(n==='random')A.seq([[700,()=>take('random')],[1800,()=>A.say('The sample bars look a lot like the population bars.')]]);if(n==='corner')A.seq([[700,()=>take('corner')],[1800,()=>A.say('Mostly soccer: this sample is biased.')]]);},
    task(r){st.setup=true;st.samp=[];st.kind=null;draw();let txt;
      if(r===0){st.ask={ans:'Random sample',o:shuffle(['Random sample','Corner sample']),ok:'Yes! A random sample gives everyone the same chance.'};txt='Take both samples. Which one is more *representative* of the school?';}
      else if(r===1||r===2){take('random');const c=counts(st.samp.map(i=>POP[i]));const i=rnd(0,3);const f=c[i];
        if(r===1){const ans=f+'/20';st.ask={ans,o:shuffle([ans,(f+2)+'/20',f+'/100']).filter((x,j,a)=>a.indexOf(x)===j),ok:'Yes! '+f+' of 20 chose '+FAV[i][0]+'.'};txt='In this random sample, what is the *relative frequency* of *'+FAV[i][0]+'* as a fraction?';}
        else{const ans=f*5+'%';st.ask={ans,o:shuffle([ans,f+'%',(f*5+10)+'%']).filter((x,j,a)=>a.indexOf(x)===j),ok:'Yes! '+f+'/20 = '+f*5+'%.'};txt='What percent of the sample chose *'+FAV[i][0]+'*?';}}
      else if(r===3){take('corner');st.ask={ans:'Biased',o:shuffle(['Biased','Representative']),ok:'Yes! The corner sample is mostly soccer fans, so it is biased.'};txt='Look at the corner sample. Is it *biased* or *representative*?';}
      else{st.ask={ans:'Every 5th student on the class list',o:shuffle(['Every 5th student on the class list','Only students on the soccer team','Only your best friends']),ok:'Yes! Systematic sampling spreads the sample across everyone.'};txt='Which way of choosing 20 students is *fair*?';}
      st.setup=false;return txt;}};}
});
const POP=(()=>{const a=[];for(let i=0;i<100;i++){const r=Math.floor(i/10),q=i%10;let c;if(r>=7&&q<7)c=(i*7)%10<8?0:1;else c=[0,1,1,2,2,3,1,2,3,0,3,1][(i*5+r)%12];a.push(c);}return a;})();
function counts(arr){const c=[0,0,0,0];arr.forEach(x=>c[x]++);return c;}

/* =========================================================
   21. Stacked-bar graphs and misleading graphs
   ========================================================= */
const GRADES=['Gr 3','Gr 4','Gr 5','Gr 6'],TRIP=[['Walk','#16a36f'],['Bus','#f2a400'],['Car','#2f7de1']];
P.lesson({id:'stacked5',title:'Stacked-bar graphs and misleading graphs',strand:'Data',codes:['D1.3','D1.4','D1.6'],
 guide:{goal:'Choose and create graphs (including stacked-bar graphs) with titles, labels, sources and appropriate scales, use them in an infographic, and analyse data, including misleading graphs, to draw conclusions.',words:'stacked-bar graph, legend, scale, source, infographic, misleading graph, broken axis',
  ask:['What does the whole height of a stacked bar show?','Why might a graph whose axis starts at 40 be misleading?','What story does this graph tell about how students get to school?'],home:'Look for graphs in a flyer or news site. Check the axis: does it start at 0? Is the source shown?'},
 learn:[{say:'Parts stacked into one bar.',speech:'Mateo’s stacked-bar graph shows how students in four grades get to school. Each bar is split into walk, bus and car. Watch the parts stack up. The whole bar shows the total for each grade.',view:'model',demo:'grow'},
        {say:'Read about good graphs.',speech:'A good graph has a title, labels, a legend, a source, and a scale that starts at zero. An infographic puts graphs, numbers and short facts together to tell a story.',view:'read'},
        {say:'Watch: a misleading graph.',speech:'Now the same totals are drawn with an axis that starts at forty. Grade six looks three times bigger than grade three, but the real difference is small. Always check the scale!',view:'model',demo:'mislead'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: read the graph.',speech:'Your turn. Tap a part of a bar to read it. Switch between the fair graph and the misleading one.',view:'model'}],
 fig:'A stacked-bar graph: walk, bus and car for four grades.',rz:.35,
 explore:['*Tap a part* of a bar to read its value.','Switch *Fair axis* and *Axis from 40*.','Press *New data* to change the survey.'],
 howTo:'Read the stacked bars to answer, or tap the part of the graph the question asks for.',
 init:k=>({d:[[12,18,14],[15,16,17],[20,14,13],[18,22,9]],mis:false,sel:null,ask:null,want:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'A *stacked-bar graph* splits each bar into parts. The parts add up to the whole bar.')+10;
  T(g,'How We Get to School',X0+TW/2-80,y+30,FT.h3,INK,'center');const ox=X0+70,oy=y+290,s=4;g.strokeStyle=INK;g.lineWidth=3;g.beginPath();g.moveTo(ox,y+50);g.lineTo(ox,oy);g.lineTo(X0+TW-180,oy);g.stroke();
  for(let v=0;v<=50;v+=10){T(g,String(v),ox-12,oy-v*s+8,FT.small,GREY,'right');}
  [[12,18,14],[15,16,17],[20,14,13],[18,22,9]].forEach((d,i)=>{let h=0;const x=ox+24+i*112;d.forEach((v,k)=>{g.fillStyle=TRIP[k][1];g.fillRect(x,oy-(h+v)*s,70,v*s-2);h+=v;});T(g,GRADES[i],x+35,oy+28,FT.small,INK,'center');});
  TRIP.forEach(([t,c],i)=>{g.fillStyle=c;g.fillRect(X0+TW-150,y+80+i*40,26,26);T(g,t,X0+TW-114,y+100+i*40,FT.smallB);});T(g,'students',ox+8,y+56,FT.small,GREY);T(g,'Source: school survey, 2026',X0+TW,y+250,FT.cap,GREY,'right');y+=372;
  y=para(p,y,'*Misleading graphs* can start the axis above 0, skip numbers, or use a picture that grows in two directions. *Check the scale* before you trust the picture.')+10;
  y=keyWords(p,y,[['stacked-bar graph','a bar split into parts that add to the whole'],['source','where the data came from']]);
  predict(p,y,S,'p21','In the graph above, which grade has the most students who walk?','*Grade 5: 20 students.*');},
 readout(p,S,y){const g=p.g,st=S.st;if(st.sel){const [i,k]=st.sel;T(g,GRADES[i]+', '+TRIP[k][0]+': '+st.d[i][k]+' students',X0,y+40,FT.bodyB,TRIP[k][1]);T(g,'Total for '+GRADES[i]+': '+st.d[i].reduce((a,b)=>a+b,0),X0,y+80,FT.body);}
  else T(g,st.mis?'Careful! This axis starts at 40.':'Tap a part of a bar.',X0,y+40,FT.bodyB,st.mis?RED:GREY);return y+92;},
 build(S,grp,mode,game){const st=S.st,Z=-1.6,u=.034,B=40;const bars=new THREE.Group();grp.add(bars);
  const back=mk(new THREE.BoxGeometry(4.3,2.3,.04),lam('#ffffff'),20);back.position.set(0,1.15,Z-.62);grp.add(back);const axis=new THREE.Group();grp.add(axis);
  const title=label('How We Get to School',{size:.24});title.position.set(-.3,2.45,Z-.6);grp.add(title);
  TRIP.forEach(([t,c],i)=>{const l=label('■ '+t,{size:.18,color:c});l.position.set(1.65,2.1-i*.22,Z-.5);grp.add(l);});
  function H(v){return st.mis?Math.max(0,v-B)*u*3.2:v*u;}
  function draw(){clearGroup(bars);clearGroup(axis);
    const step=st.mis?2:10,top=st.mis?60:60;for(let v=st.mis?B:0;v<=top;v+=step){const y=.04+H(v);const ln=new THREE.Mesh(new THREE.BoxGeometry(3.6,.008,.008),lam('#d6dbe5'));ln.position.set(-.1,y,Z-.58);axis.add(ln);
      if(v%(st.mis?4:10)===0){const l=label(String(v),{size:.14,color:GREY});l.position.set(-2.05,y,Z-.5);axis.add(l);}}
    if(st.mis){const wl=label('axis starts at 40!',{size:.17,color:RED});wl.position.set(-1.2,2.1,Z-.5);axis.add(wl);}
    st.d.forEach((d,i)=>{const x=-1.45+i*.85;const tot=d.reduce((a,b)=>a+b,0);
      if(st.mis){const h=H(tot);const b=mk(new THREE.BoxGeometry(.48,Math.max(.01,h),.48),lam('#8b5cf6'),20);b.position.set(x,.03+h/2,Z-.2);bars.add(b);A.drag(b,{tap:()=>tapBar(i,-1)});const l=label(String(tot),{size:.18});l.position.set(x,h+.2,Z-.2);bars.add(l);}
      else{let h0=.03;d.forEach((v,k)=>{const h=v*u;const sel=st.sel&&st.sel[0]===i&&st.sel[1]===k;const b=mk(new THREE.BoxGeometry(.48+(sel?.06:0),h-.01,.48+(sel?.06:0)),lam(TRIP[k][1]),20);b.position.set(x,h0+h/2,Z-.2);bars.add(b);A.drag(b,{tap:()=>tapBar(i,k)});
        if(sel){const l=label(String(v),{size:.18,bg:'#ffffff',border:TRIP[k][1]});l.position.set(x+.42,h0+h/2,Z-.1);bars.add(l);}h0+=h;});const l=label(String(tot),{size:.17});l.position.set(x,h0+.15,Z-.2);bars.add(l);}
      const gl=label(GRADES[i],{size:.17});gl.position.set(x,.12,Z+.3);bars.add(gl);});A.redraw();}
  function tapBar(i,k){if(k>=0){st.sel=[i,k];A.pop();draw();}if(mode==='play'&&st.want&&!st.setup){const r=st.want(i,k);if(r===true)game.solved(st.wantOk);else if(r===false)A.bad('Not that one. Read the question again.');}}
  draw();
  return {info:()=>st.mis?'Misleading axis: starts at 40':'Fair axis: starts at 0',
    controls:()=>{const c=[{t:'Fair axis',on:!st.mis,fn:()=>{st.mis=false;draw();}},{t:'Axis from 40',on:st.mis,fn:()=>{st.mis=true;draw();}}];
      if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);return mode==='learn'?c.concat([{t:'New data',fn:()=>{st.d=GRADES.map(()=>TRIP.map(()=>rnd(8,22)));st.sel=null;draw();}}]):c;},
    demo(n){st.ask=null;st.want=null;if(n==='grow'){st.mis=false;st.sel=null;st.d=[[12,18,14],[15,16,17],[20,14,13],[18,22,9]];const full=st.d.map(r=>r.slice());st.d=full.map(()=>[0,0,0]);draw();
        A.seq([[600,()=>{st.d=full.map(r=>[r[0],0,0]);draw();A.say('Walk');}],[1000,()=>{st.d=full.map(r=>[r[0],r[1],0]);draw();A.say('+ Bus');}],[1000,()=>{st.d=full.map(r=>r.slice());draw();A.say('+ Car = the whole bar');}]]);}
      if(n==='mislead'){st.d=[[14,15,13],[15,16,14],[16,15,15],[17,18,14]];st.mis=false;st.sel=null;draw();A.seq([[1400,()=>{st.mis=true;draw();A.say('Axis from 40: the bars look very different!');}],[2200,()=>{st.mis=false;draw();A.say('Fair axis: they are close.');}]]);}},
    task(r){st.setup=true;st.ask=null;st.want=null;st.mis=false;st.sel=null;st.d=GRADES.map(()=>TRIP.map(()=>rnd(8,22)));let txt;
      if(r===0){const k=rnd(0,2);const col=st.d.map(d=>d[k]);const mx=Math.max(...col);const i=col.indexOf(mx);st.d.forEach((d,j)=>{if(j!==i&&d[k]===mx)d[k]--;});st.want=(a,b)=>b===k?a===i:false;const HOW=['walk','take the bus','come by car'][k];st.wantOk='Yes! '+GRADES[i]+' has the most students who '+HOW+'.';txt='Tap the part that shows the grade with the *most students who '+HOW+'*.';}
      else if(r===1){const i=rnd(0,3),tot=st.d[i].reduce((a,b)=>a+b,0);st.ask={ans:tot,o:opts(tot,[-5,5,10,-10],1),ok:'Yes! '+st.d[i].join(' + ')+' = '+tot+'.'};txt='How many students *in all* are in *'+GRADES[i]+'*?';}
      else if(r===2){const i=rnd(0,3),k=rnd(0,2);st.want=(a,b)=>a===i&&b===k;st.wantOk='Yes! That part shows '+GRADES[i]+', '+TRIP[k][0]+'.';txt='Tap the part for *'+GRADES[i]+'* students who *'+['walk','take the bus','come by car'][k]+'*.';}
      else if(r===3){st.d=[[14,15,13],[15,16,14],[16,15,15],[17,18,14]];st.mis=true;st.ask={ans:'No',o:['Yes','No'],ok:'Right! 49 is only a little more than 42. The axis starts at 40, so the picture exaggerates.'};txt='Axis from 40: does *Gr 6* really have about *3 times* as many students as *Gr 3*?';}
      else{const i=rnd(0,3);const w=st.d[i][0],tot=st.d[i].reduce((a,b)=>a+b,0);const ans=w+'/'+tot;st.ask={ans,o:shuffle([ans,st.d[i][1]+'/'+tot,w+'/100']).filter((x,j,a)=>a.indexOf(x)===j),ok:'Yes! '+w+' of '+tot+' walk.'};txt='For an infographic: what *fraction* of *'+GRADES[i]+'* walks to school?';}
      draw();st.setup=false;return txt;}};}
});

/* =========================================================
   22. Mean, median and mode with decimals
   ========================================================= */
P.lesson({id:'mean5',title:'Mean, median and mode',strand:'Data',codes:['D1.5'],
 guide:{goal:'Determine the mean and the median and identify the mode(s) of data sets with whole numbers and decimals, including sets with an even number of values, and explain what each measure tells about the data.',words:'mean, median, mode, data set, even number of values, outlier',
  ask:['How do you find the median when there are 6 values?','Why can the mean be a decimal even when the data are whole numbers?','Which measure best describes a set with one very big value?'],home:'Time how many seconds each family member can stand on one foot. Find the mean, median and mode.'},
 learn:[{say:'Median with an even number of values.',speech:'These six towers show how many goals Keiko and five teammates scored. Sort them. There are two middle towers, five and seven. The median is halfway between them: six.',view:'model',demo:'median'},
        {say:'Read the three measures.',speech:'The mean is the total shared equally. The median is the middle of the sorted data, or halfway between the two middle values. The mode is the value that happens most often.',view:'read'},
        {say:'Watch: a decimal mean.',speech:'Now even out these towers. The total is thirty-three cubes for six towers, so each tower gets five and a half. The mean is five point five.',view:'model',demo:'mean'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: find the measures.',speech:'Your turn. Sort the towers and even them out. Change the data to explore.',view:'model'}],
 fig:'Towers of data. Sort them, or even them out.',rz:.3,
 explore:['Press *Sort* to put the towers in order.','The *median* glows yellow; the *mode* is orange.','Press *Even out* to see the *mean*.'],
 howTo:'Read the question. Use Sort and Even out to help, then choose the answer.',
 init:k=>({v:[7,3,9,5,2,7],orig:[7,3,9,5,2,7],sc:1,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'*Mean*, *median* and *mode* each describe a data set with one number.')+14;
  const vals=[2,3,5,7,7,9];vals.forEach((v,i)=>{for(let k=0;k<v;k++){rr(g,X0+20+i*84,y+240-k*25,50,23,4);g.fillStyle=i===2||i===3?'#ffd24a':v===7?'#ff9f68':'#9cc2f5';g.fill();}T(g,String(v),X0+45+i*84,y+272,FT.bodyB,INK,'center');});
  T(g,'median = (5 + 7) ÷ 2 = 6',X0+540,y+100,FT.bodyB,'#d98a00');T(g,'mode = 7',X0+540,y+150,FT.bodyB,'#e4572e');T(g,'mean = 33 ÷ 6 = 5.5',X0+540,y+200,FT.bodyB,'#2f7de1');y+=310;
  [['Mean','add the values, divide by how many'],['Median','middle value, or halfway between the two middles'],['Mode','the most common value (there can be none, or more than one)']].forEach(([a,b],i)=>{T(g,a,X0,y+i*44,FT.bodyB,acc());T(g,b,X0+140,y+i*44,FT.small);});y+=140;
  y=para(p,y,'Decimals work the same way: the mean of *1.2 m, 1.5 m and 1.8 m* is 4.5 ÷ 3 = *1.5 m*.')+10;
  predict(p,y,S,'p22','Data: 4, 8, 10, 2. What is the median?','*6.* Sorted: 2, 4, 8, 10. Halfway between 4 and 8 is 6.');},
 readout(p,S,y){const g=p.g,st=S.st,f=x=>fx(x,st.sc),s=st.v.slice().sort((a,b)=>a-b),n=s.length,med=n%2?s[(n-1)/2]:(s[n/2-1]+s[n/2])/2,sum=st.v.reduce((a,b)=>a+b,0),m=modes5(st.v);
  T(g,'Data: '+st.v.map(f).join(', '),X0,y+40,FT.bodyB,acc());T(g,'median '+f(med)+'   ·   mode '+(m.length?m.map(f).join(' and '):'none')+'   ·   mean '+f(Math.round(sum/n*100)/100),X0,y+82,FT.bodyB);return y+92;},
 build(S,grp,mode,game){const st=S.st,u=.17,Z=-1.5;const tw=new THREE.Group();grp.add(tw);let anim=false;const f=x=>fx(x,st.sc);
  const xs=i=>-1.9+i*(3.8/Math.max(1,st.v.length-1));
  function draw(fr){clearGroup(tw);const s=st.v.slice().sort((a,b)=>a-b),sorted=st.v.every((x,i)=>x===s[i]),n=st.v.length,md=modes5(st.v);
    st.v.forEach((h,i)=>{const g=new THREE.Group();g.position.set(xs(i),0,Z);tw.add(g);const isMed=sorted&&(n%2?i===(n-1)/2:i===n/2-1||i===n/2),isMode=md.includes(h);
      const hh=fr?fr[i]:h;const full=Math.floor(hh+1e-9);for(let k=0;k<full;k++){const c=unitBox(1,1,1,isMed?'#ffd24a':isMode?'#ff9f68':'#9cc2f5',u);c.scale.set(1.4,1,1.4);c.position.y=u/2+.03+k*u;g.add(c);}
      const part=hh-full;if(part>1e-6){const c=mk(new THREE.BoxGeometry(u*1.4,u*part,u*1.4),lam('#bcd6f8'),20);c.position.y=.03+full*u+u*part/2;g.add(c);}
      const l=label(f(fr?Math.round(hh*100)/100:h),{size:.22});l.position.y=hh*u+.25;g.add(l);});A.redraw();}
  function sortIt(){if(anim)return;st.v.sort((a,b)=>a-b);A.pop();draw();A.say('In order: '+st.v.map(f).join(', '));}
  function evenOut(){if(anim)return;anim=true;const n=st.v.length,mean=st.v.reduce((a,b)=>a+b,0)/n;const v0=st.v.slice();
    tween(1.6,k=>{draw(v0.map(x=>x+(mean-x)*k));},x=>x*x*(3-2*x)).then(()=>{anim=false;A.good('All even! The mean is '+f(Math.round(mean*100)/100)+'.');});}
  draw();
  return {info:()=>st.v.map(f).join(', '),
    controls:()=>{const c=[{t:'Sort',fn:sortIt},{t:'Even out',fn:evenOut},{t:'Start over',fn:()=>{st.v=st.orig.slice();draw();}}];if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok,x=>typeof x==='number'?f(x):x).concat(c);
      return mode==='learn'?c.concat([{t:'New data',go:true,fn:()=>{st.sc=1;st.v=Array.from({length:rnd(5,7)},()=>rnd(1,10));st.orig=st.v.slice();draw();}}]):c;},
    demo(n){st.sc=1;if(n==='median'){st.v=[7,3,9,5,2,7];st.orig=st.v.slice();draw();A.seq([[900,sortIt],[1300,()=>A.say('Two middles: 5 and 7. The median is 6.')]]);}
      if(n==='mean'){st.v=[2,3,5,7,7,9];st.orig=st.v.slice();draw();A.seq([[700,evenOut]]);}},
    task(r){st.setup=true;st.ask=null;st.sc=1;let txt;
      if(r===0){st.v=Array.from({length:6},()=>rnd(1,10));const s=st.v.slice().sort((a,b)=>a-b),med=(s[2]+s[3])/2;st.ask={ans:med,o:opts(med,[.5,-.5,1,-1,2],0),ok:'Yes! Halfway between '+s[2]+' and '+s[3]+' is '+med+'.'};txt='Find the *median* of these 6 values.';}
      else if(r===1){st.v=Array.from({length:4},()=>rnd(2,10));let sum=st.v.reduce((a,b)=>a+b,0);if(sum%2===0){st.v[0]++;sum++;}const mean=sum/4;st.ask={ans:mean,o:opts(mean,[.5,-.5,1,-1,.25]),ok:'Yes! '+sum+' ÷ 4 = '+mean+'.'};txt='Find the *mean*. It might be a decimal! Press Even out to help.';}
      else if(r===2){st.v=Array.from({length:7},()=>rnd(1,10));const m=rnd(1,10);st.v[0]=m;st.v[3]=m;st.v[5]=m;const md=modes5(st.v);if(md.length!==1){st.v[6]=m;}const ans=modes5(st.v)[0];st.ask={ans,o:opts(ans,[1,-1,2,-2],1),ok:'Yes! '+ans+' appears most often.'};txt='Find the *mode*.';}
      else if(r===3){st.sc=.1;st.v=Array.from({length:5},()=>rnd(8,19));const s=st.v.slice().sort((a,b)=>a-b),med=s[2];st.ask={ans:med,o:opts(med,[1,-1,2,-2],1),ok:'Yes! The middle jump is '+fx(med,.1)+' m.'};txt='Long jumps in metres (each cube = 0.1 m). Find the *median*.';}
      else{st.v=[3,4,4,5,20].sort(()=>Math.random()-.5);st.ask={ans:'The median',o:shuffle(['The median','The mean']),ok:'Yes! The 20 pulls the mean up to 7.2, but the median (4) stays in the middle.'};txt='One value is very large. Which describes a *typical* value better: the *mean* or the *median*?';}
      st.orig=st.v.slice();draw();st.setup=false;return txt;}};}
});
function fx(x,sc){if(sc===1)return String(x);const v=Math.round(x*sc*100)/100;return v.toFixed(Math.abs(v*10-Math.round(v*10))<1e-6?1:2);}
function modes5(v){const c={};v.forEach(x=>c[x]=(c[x]||0)+1);const mx=Math.max(...Object.values(c));return mx<2?[]:Object.keys(c).filter(k=>c[k]===mx).map(Number);}

/* =========================================================
   23. Probability: fractions, theoretical and experimental
   ========================================================= */
const SCOL=[['red','#e0453a'],['blue','#2f7de1'],['green','#16a36f'],['yellow','#f2c200']];
P.lesson({id:'prob5',title:'Theoretical and experimental probability',strand:'Data',codes:['D2.1','D2.2'],
 guide:{goal:'Use fractions to express the probability of events, show them on a probability line, make predictions, and compare theoretical probability with experimental results.',words:'probability, outcome, theoretical probability, experimental probability, trial, probability line',
  ask:['Why is the probability of red 3/8 on this spinner?','After 20 spins, red came up 9 times. Is that close to what you expected?','What happens to the experimental results when you do many more trials?'],home:'Flip a coin 20 times and record heads. Compare your result with the theoretical probability of 1/2.'},
 learn:[{say:'Probability as a fraction.',speech:'Jordan’s spinner has eight equal parts. Three are red. The probability of red is three out of eight, or three eighths. Watch it land on the probability line.',view:'model',demo:'place'},
        {say:'Read: theoretical and experimental.',speech:'Theoretical probability is what should happen: favourable outcomes over all outcomes. Experimental probability is what did happen in trials: results over number of trials.',view:'read'},
        {say:'Watch: spin twenty times.',speech:'Let us test it. Watch twenty spins. The tally bars grow. The experimental results are close to the theoretical probability, but not exactly the same.',view:'model',demo:'spin'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: spin and compare.',speech:'Your turn. Spin once or twenty times, and compare the tally with the spinner.',view:'model'}],
 fig:'A spinner with equal parts, a tally, and a probability line from 0 to 1.',rz:.35,
 explore:['Press *Spin* or *Spin 20×*.','Compare the *tally* with the spinner parts.','Tap the *probability line* to place a fraction.'],
 howTo:'Read the spinner. Tap the probability line, or choose the answer.',
 init:k=>({sec:[0,0,0,1,1,2,2,3],col:0,tally:[0,0,0,0],trials:0,ask:null,want:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'*Probability* = favourable outcomes ÷ all possible outcomes. It can be written as a fraction from *0* (impossible) to *1* (certain).')+14;
  const cx=X0+130,cy=y+130,R=110,sec=[0,0,0,1,1,2,2,3];sec.forEach((c,i)=>{g.beginPath();g.moveTo(cx,cy);g.arc(cx,cy,R,i*Math.PI/4-Math.PI/2,(i+1)*Math.PI/4-Math.PI/2);g.closePath();g.fillStyle=SCOL[c][1];g.fill();g.lineWidth=3;g.strokeStyle='#fff';g.stroke();});
  T(g,'P(red) = 3/8',X0+300,y+80,ZS(40),'#e0453a');T(g,'P(blue) = 2/8 = 1/4',X0+300,y+130,FT.bodyB,'#2f7de1');T(g,'P(yellow) = 1/8',X0+300,y+176,FT.bodyB,'#c79a00');y+=270;
  const lx=X0+20,lw=TW-40;g.strokeStyle=INK;g.lineWidth=4;g.beginPath();g.moveTo(lx,y+20);g.lineTo(lx+lw,y+20);g.stroke();for(let k=0;k<=8;k++){const x=lx+k*lw/8;g.lineWidth=2;g.beginPath();g.moveTo(x,y+8);g.lineTo(x,y+32);g.stroke();}
  [['0',0],['1/2',.5],['1',1]].forEach(([t,v])=>T(g,t,lx+v*lw,y+62,FT.small,INK,'center'));g.beginPath();g.arc(lx+3/8*lw,y+20,12,0,Math.PI*2);g.fillStyle='#e0453a';g.fill();T(g,'3/8',lx+3/8*lw,y-6,FT.smallB,'#e0453a','center');y+=86;
  y=para(p,y,'*Experimental probability* comes from trials: red 9 times in 20 spins is *9/20*. More trials usually bring it closer to the *theoretical* 3/8.')+10;
  y=keyWords(p,y,[['theoretical probability','what should happen, from the outcomes'],['experimental probability','what did happen in the trials']]);
  predict(p,y,S,'p23','A bag has 2 green and 8 white marbles. What is P(green)?','*2/10 = 1/5.* 2 favourable out of 10 marbles.');},
 readout(p,S,y){const g=p.g,st=S.st,n=st.sec.length,k=st.sec.filter(c=>c===st.col).length;T(g,'P('+SCOL[st.col][0]+') = '+k+'/'+n,X0,y+46,ZS(44),SCOL[st.col][1]);
  T(g,st.trials?'Experimental: '+st.tally[st.col]+'/'+st.trials+' in '+st.trials+' spins':'No spins yet.',X0+330,y+40,FT.bodyB);T(g,'Tally: '+SCOL.map(([c],i)=>c+' '+st.tally[i]).join(' · '),X0,y+88,FT.body);return y+96;},
 build(S,grp,mode,game){const st=S.st,R=.95,cz=-2.0,cx=-1.1;const disc=new THREE.Group();disc.position.set(cx,.06,cz);grp.add(disc);
  const arrowG=new THREE.Group();arrowG.position.set(cx,.22,cz);grp.add(arrowG);const ar=mk(new THREE.ConeGeometry(.09,.85,4),lam(INK),0);ar.rotation.x=-Math.PI/2;ar.position.z=-.38;arrowG.add(ar);
  const hub=mk(new THREE.CylinderGeometry(.1,.1,.12,16),lam('#ffffff'),0);arrowG.add(hub);let spinA=0,spinning=false;
  const tallyG=new THREE.Group();grp.add(tallyG);const lineG=new THREE.Group();grp.add(lineG);const L=4.0,x0=-2.0,Zl=-.45;
  const pin=mk(new THREE.ConeGeometry(.12,.3,16),lam('#ffd24a'),0);pin.rotation.x=Math.PI;pin.visible=false;grp.add(pin);
  function drawDisc(){clearGroup(disc);const n=st.sec.length;st.sec.forEach((c,i)=>{const a0=i*2*Math.PI/n,a1=(i+1)*2*Math.PI/n;const m=mk(wedgeGeo(R,.1,a0+.015,a1-.015),lam(SCOL[c][1]),30);disc.add(m);A.drag(m,{tap:()=>tapSec(c)});});
    clearGroup(lineG);const tr=mk(new THREE.BoxGeometry(L,.06,.14),lam('#cbd5e6'),0);tr.position.set(0,.03,Zl);lineG.add(tr);
    for(let k=0;k<=n;k++){const pd=mk(G('pr5pad',()=>new THREE.CylinderGeometry(.11,.11,.06,18)),lam(k===0?'#e0453a':k===n?'#16a36f':'#ffffff'),30);pd.position.set(x0+k*L/n,.07,Zl);lineG.add(pd);A.drag(pd,{tap:()=>tapLine(k)});
      const l=label(k===0?'0':k===n?'1':k+'/'+n,{size:.17,color:INK});l.position.set(x0+k*L/n,.32,Zl+(k%2?.38:.28));lineG.add(l);}drawTally();}
  function drawTally(){clearGroup(tallyG);SCOL.forEach(([c,col],i)=>{const h=Math.max(.01,st.tally[i]*.09);const b=mk(new THREE.BoxGeometry(.26,h,.26),lam(col),20);b.position.set(.85+i*.42,h/2,-2.0);tallyG.add(b);
      const l=label(String(st.tally[i]),{size:.18});l.position.set(.85+i*.42,h+.18,-2.0);tallyG.add(l);});const t=label(st.trials+' spins',{size:.18,color:GREY});t.position.set(1.48,.15,-1.55);tallyG.add(t);A.redraw();}
  function spin(times,cb){if(spinning)return;spinning=true;const n=st.sec.length;const res=[];for(let k=0;k<times;k++)res.push(rnd(0,n-1));
    if(times>1){res.forEach(i=>st.tally[st.sec[i]]++);st.trials+=times;}const last=res[res.length-1];const target=(last+.5)*2*Math.PI/n-Math.PI/2;
    const a0=spinA,a1=a0-((a0-target)%(2*Math.PI)+2*Math.PI)%(2*Math.PI)-4*Math.PI;
    tween(times>1?1.4:1.6,k=>{spinA=a0+(a1-a0)*k;arrowG.rotation.y=spinA;},x=>1-Math.pow(1-x,3)).then(()=>{spinning=false;if(times===1){st.tally[st.sec[last]]++;st.trials++;}A.pop();drawTally();if(times===1)A.say('Landed on '+SCOL[st.sec[last]][0]+'!');if(cb)cb();});}
  function tapLine(k){const n=st.sec.length;pin.visible=true;pin.position.set(x0+k*L/n,.5,Zl);A.pop();const want=st.sec.filter(c=>c===st.col).length;
    if(mode==='play'&&st.want==='line'&&!st.setup){if(k===want)game.solved('Yes! P('+SCOL[st.col][0]+') = '+k+'/'+n+'.');else A.bad('Count the '+SCOL[st.col][0]+' parts: '+want+' of '+n+'.');}
    else if(mode!=='play')A.say(k===want?'Yes! P('+SCOL[st.col][0]+') = '+k+'/'+n:'P('+SCOL[st.col][0]+') is '+want+'/'+n);}
  function tapSec(c){if(mode==='play'&&st.want==='sec'&&!st.setup){if(st.wantC(c))game.solved(st.wantOk);else A.bad('Count the parts of each colour.');}}
  drawDisc();
  return {info:()=>'P('+SCOL[st.col][0]+') = '+st.sec.filter(c=>c===st.col).length+'/'+st.sec.length,
    controls:()=>{const c=[{t:'Spin',fn:()=>spin(1)},{t:'Spin 20×',go:true,fn:()=>spin(20)},{t:'Clear tally',fn:()=>{st.tally=[0,0,0,0];st.trials=0;drawTally();}}];
      if(mode==='play'&&st.ask&&(!st.ask.needT||st.trials>=st.ask.needT))return choices(st.setup?null:game,st.ask.o,typeof st.ask.ans==='function'?st.ask.ans():st.ask.ans,st.ask.ok).concat(c);
      return mode==='learn'?c.concat(SCOL.map(([n],i)=>({t:n,on:st.col===i,fn:()=>{st.col=i;A.redraw();}})),[{t:'New spinner',fn:()=>{st.sec=newSpinner(pick([6,8,10]));st.tally=[0,0,0,0];st.trials=0;drawDisc();}}]):c;},
    demo(n){st.sec=[0,0,0,1,1,2,2,3];st.col=0;st.tally=[0,0,0,0];st.trials=0;drawDisc();if(n==='place')A.seq([[900,()=>tapLine(3)]]);if(n==='spin')A.seq([[600,()=>spin(20,()=>A.say('Red: '+st.tally[0]+' out of 20. Theory says about 7.5.'))]]);},
    task(r){st.setup=true;st.ask=null;st.want=null;pin.visible=false;st.tally=[0,0,0,0];st.trials=0;const n=pick([6,8,10]);st.sec=newSpinner(n);st.col=rnd(0,3);while(!st.sec.includes(st.col))st.col=rnd(0,3);drawDisc();let txt;
      const k=st.sec.filter(c=>c===st.col).length;
      if(r===0||r===3){st.want='line';txt='Tap the probability line to show *P('+SCOL[st.col][0]+')*.';}
      else if(r===1){const ans=k+'/'+n;st.ask={ans,o:shuffle([ans,(n-k)+'/'+n,k+'/'+(n-k)]).filter((x,j,a)=>a.indexOf(x)===j),ok:'Yes! '+k+' of '+n+' equal parts.'};txt='What is the *theoretical* probability of *'+SCOL[st.col][0]+'*?';}
      else if(r===2){st.ask={needT:20,ans:()=>st.tally[st.col]+'/'+st.trials,o:[],ok:'Yes! That is the experimental probability.'};const self=st.ask;Object.defineProperty(self,'o',{get:()=>{const a=st.tally[st.col]+'/'+st.trials;return shuffle([a,k+'/'+n,(st.tally[st.col]+2)+'/'+st.trials]).filter((x,j,arr)=>arr.indexOf(x)===j);}});
        txt='Press *Spin 20×*. Then choose the *experimental* probability of *'+SCOL[st.col][0]+'*.';}
      else{const cnt=SCOL.map((_,i)=>st.sec.filter(c=>c===i).length);const mx=Math.max(...cnt);if(cnt.filter(x=>x===mx).length>1){const i=cnt.indexOf(mx);st.sec[st.sec.indexOf(cnt.findIndex((x,j)=>x===mx&&j!==i))]=i;drawDisc();}
        const c2=SCOL.map((_,i)=>st.sec.filter(c=>c===i).length),best=c2.indexOf(Math.max(...c2));st.want='sec';st.wantC=c=>c===best;st.wantOk='Yes! '+SCOL[best][0]+' has the greatest probability: '+c2[best]+'/'+n+'.';txt='You win if the spinner lands on your colour. *Tap the best colour* to choose.';}
      st.setup=false;return txt;}};}
});
function newSpinner(n){const a=[];const k=[rnd(1,Math.floor(n/2)),0,0,0];let left=n-k[0];k[1]=rnd(1,Math.max(1,left-2));left-=k[1];k[2]=Math.max(0,rnd(0,left));k[3]=n-k[0]-k[1]-k[2];k.forEach((c,i)=>{for(let j=0;j<c;j++)a.push(i);});return a;}
})();
