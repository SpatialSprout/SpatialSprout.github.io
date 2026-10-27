/* The Interactive Classroom: Grade 7 Math — Algebra (15–19) and Data (20–23) */
(function(){
"use strict";
const P=window.PM;if(!P||P.failed||!P.THREE)return;
const {THREE,V,W,D,PY,PX,X0,TW,INK,RED,BLUE,GREY,VIBE,FT,ZS,G,M,lam,mk,unitBox,cellMat,label,starGeo,wedgeGeo,clearGroup,disposeObj,rr,T,wrap,para,header,keyWords,predict,box,caption,cxOf,cyOf,tint,moveTo,hop,tween,burst,easeOut,easeIO,A}=P;
const acc=()=>P.ACC;
const rnd=(a,b)=>a+Math.floor(Math.random()*(b-a+1)),pick=a=>a[Math.floor(Math.random()*a.length)],shuffle=a=>a.slice().sort(()=>Math.random()-.5);
const gcd=(a,b)=>b?gcd(b,a%b):Math.abs(a);
const sgn=v=>v<0?'−'+(-v):String(v);
function choices(game,list,ans,ok,lab){return list.map(o=>({t:lab?lab(o):String(o),big:true,fn:()=>{if(o===ans){if(game)game.solved(ok);else A.good(ok);}else A.bad('Not quite. Try again!');}}));}
function opts(ans,spread,min){const s=new Set([ans]);let k=0;while(s.size<3&&k<60){k++;const v=Math.round((ans+pick(spread))*100)/100;if(v>=(min==null?-1e9:min))s.add(v);}return shuffle([...s]);}
function seg(a,b,col,r){const len=a.distanceTo(b);const m=new THREE.Mesh(new THREE.CylinderGeometry(r,r,Math.max(.001,len),8),lam(col));m.position.copy(a).add(b).multiplyScalar(.5);m.quaternion.setFromUnitVectors(V(0,1,0),b.clone().sub(a).normalize());return m;}
const rule=(k,c)=>(k===1?'':k===-1?'−':sgn(k))+'n'+(c?(c>0?' + '+c:' − '+(-c)):'');

/* =========================================================
   15. Comparing linear patterns; integer patterns
   ========================================================= */
P.lesson({id:'patterns7',title:'Comparing linear patterns',strand:'Algebra',codes:['C1.1','C1.2','C1.3','C1.4'],
 guide:{goal:'Compare linear growing patterns by their constant rates and initial values, represent patterns with expressions, tables and graphs, find missing terms, and create patterns with integers.',words:'constant rate, initial value, linear, expression, integer, shrinking pattern',
  ask:['Which pattern grows faster? How can you tell from the expression?','Where do the two lines cross? What does that mean?','What is the rule for −8, −5, −2, 1?'],home:'Compare two phone plans: $10 + $2 per GB, or $4 per GB. Make a table. When do they cost the same?'},
 learn:[{say:'Two patterns, one graph.',speech:'Pattern A is two n plus six. Pattern B is four n. Pattern A starts higher, but B grows faster. Watch the towers: they are equal at term three, and after that B is ahead.',view:'model',demo:'compare'},
        {say:'Read about rate and initial value.',speech:'In an expression like two n plus six, the two is the constant rate: how much it grows each term. The six moves the start. A bigger rate means a steeper line.',view:'read'},
        {say:'Watch: an integer pattern.',speech:'Now a pattern with integers: three n minus eleven. It starts at negative eight, then negative five, negative two, one, four. The towers grow up through zero.',view:'model',demo:'integer'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: change the patterns.',speech:'Your turn. Change the rate and start of each pattern and compare them.',view:'model'}],
 fig:'Two linear patterns as towers, with their graph lines.',rz:.3,
 explore:['Change *A* and *B*: rate (×n) and start (+c).','Blue is A, pink is B. Negative terms go *below* the line.','Find where the two patterns are *equal*.'],
 howTo:'Compare the patterns, find a missing term, or choose the rule.',
 init:k=>({A:[2,6],B:[4,0],one:false,miss:-1,user:0,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'For a linear pattern *kn + c*, *k* is the *constant rate* (the change each term) and the pattern starts at *k + c*.')+14;
  rr(g,X0,y,TW,110,14);g.fillStyle=tint(acc(),.08);g.fill();T(g,'n',X0+20,y+38,FT.smallB);T(g,'2n + 6',X0+20,y+70,FT.smallB,'#2f7de1');T(g,'4n',X0+20,y+100,FT.smallB,'#e2457a');
  [1,2,3,4,5].forEach((n,i)=>{T(g,String(n),X0+170+i*110,y+38,FT.bodyB,INK,'center');T(g,String(2*n+6),X0+170+i*110,y+70,FT.bodyB,'#2f7de1','center');T(g,String(4*n),X0+170+i*110,y+100,FT.bodyB,n===3?'#16a36f':'#e2457a','center');});y+=130;
  T(g,'Equal at term 3: 2(3) + 6 = 12 = 4(3)',X0,y+20,FT.bodyB,'#16a36f');y+=50;
  y=para(p,y,'*Integer patterns:* −8, −5, −2, 1, 4… has rule *3n − 11*. Shrinking patterns have a *negative* rate: 10, 7, 4, 1, −2 is *−3n + 13*.')+10;
  y=keyWords(p,y,[['constant rate','the amount a linear pattern changes each term'],['initial value','the starting amount (the value at n = 0)']]);
  predict(p,y,S,'p15','Which grows faster: 5n + 1 or 3n + 20?','*5n + 1.* It grows by 5 each term; the other grows by 3.');},
 readout(p,S,y){const g=p.g,st=S.st,f=([k,c],n)=>k*n+c;T(g,'A: '+rule(...st.A)+'   →  '+[1,2,3,4,5,6].map(n=>sgn(f(st.A,n))).join(', '),X0,y+40,FT.bodyB,'#2f7de1');
  if(!st.one)T(g,'B: '+rule(...st.B)+'   →  '+[1,2,3,4,5,6].map(n=>sgn(f(st.B,n))).join(', '),X0,y+80,FT.bodyB,'#e2457a');return y+92;},
 build(S,grp,mode,game){const st=S.st,u=.06,y0=.85,xs=n=>-1.95+n*.72;const g2=new THREE.Group();grp.add(g2);
  const base=mk(new THREE.BoxGeometry(4.5,.02,1.4),new THREE.MeshLambertMaterial({color:'#e0e7ff',transparent:true,opacity:.6}),0);base.position.set(0,y0,-1.7);grp.add(base);const zl=label('0',{size:.2});zl.position.set(-2.3,y0,-1.7);grp.add(zl);
  const f=([k,c],n)=>k*n+c;
  function tower(v,x,z,col,miss){const g=new THREE.Group();const h=Math.abs(v)*u;if(h>0){const m=mk(new THREE.BoxGeometry(.24,h,.24),lam(miss?'#ffd24a':v<0?'#ef4444':col),20);m.position.set(x,y0+(v>0?h/2:-h/2),z);g.add(m);}const l=label(miss&&!st.user?'?':sgn(v),{size:.17,bg:miss?'#ffffff':null,color:miss?'#e2457a':INK});l.position.set(x,y0+(v>=0?h+.15:-h-.15),z);g.add(l);return g;}
  function draw(){clearGroup(g2);const pats=st.one?[[st.A,'#2f7de1',-1.7]]:[[st.A,'#2f7de1',-2.0],[st.B,'#e2457a',-1.4]];
    pats.forEach(([pt,col,z],pi)=>{const tops=[];for(let n=1;n<=6;n++){const miss=pi===0&&n-1===st.miss;const v=miss?st.user:f(pt,n);const t=tower(v,xs(n-1),z,col,miss);g2.add(t);if(miss)A.drag(t,{tap:()=>setU(st.user+1)});tops.push(V(xs(n-1),y0+f(pt,n)*u,z));}
      for(let i=0;i<5;i++)g2.add(seg(tops[i],tops[i+1],col,.015));});
    for(let n=1;n<=6;n++){const l=label('n='+n,{size:.13,color:GREY});l.position.set(xs(n-1),.12,-.9);g2.add(l);}A.redraw();}
  function setU(v){v=Math.max(-15,Math.min(25,v));if(v===st.user)return;st.user=v;A.pop();draw();if(mode==='play'&&!st.setup&&st.miss>=0&&v===f(st.A,st.miss+1))game.solved('Yes! Term '+(st.miss+1)+' is '+sgn(v)+'.');}
  const adj=(w,i,d)=>{const pt=st[w].slice();pt[i]+=d;if(Math.abs(pt[0])>4||pt[1]<-12||pt[1]>10)return;if([1,2,3,4,5,6].some(n=>Math.abs(f(pt,n))>24))return;st[w]=pt;draw();};
  draw();
  return {info:()=>'A: '+rule(...st.A)+(st.one?'':'  B: '+rule(...st.B)),
    controls:()=>{if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok);if(mode==='play'&&st.miss>=0)return [{t:'−1',fn:()=>setU(st.user-1)},{t:'+1',go:true,big:true,fn:()=>setU(st.user+1)},{t:'−5',fn:()=>setU(st.user-5)},{t:'+5',fn:()=>setU(st.user+5)}];
      return [{t:'A rate −',fn:()=>adj('A',0,-1)},{t:'A rate +',fn:()=>adj('A',0,1)},{t:'A start −',fn:()=>adj('A',1,-1)},{t:'A start +',fn:()=>adj('A',1,1)},{t:'B rate −',fn:()=>adj('B',0,-1)},{t:'B rate +',fn:()=>adj('B',0,1)},{t:'B start −',fn:()=>adj('B',1,-1)},{t:'B start +',fn:()=>adj('B',1,1)}];},
    demo(n){st.ask=null;st.miss=-1;if(n==='compare'){st.one=false;st.A=[2,6];st.B=[4,0];draw();A.say('Equal at term 3: both are 12');}if(n==='integer'){st.one=true;st.A=[3,-11];draw();A.say('−8, −5, −2, 1, 4, 7');}},
    task(r){st.setup=true;st.ask=null;st.miss=-1;st.user=0;let txt;
      if(r===0){st.one=false;st.A=[rnd(1,2),rnd(5,9)];st.B=[st.A[0]+rnd(2,3),0];const ans='B';st.ask={ans:'Pattern B',o:['Pattern A','Pattern B'],ok:'Yes! B has the bigger rate: '+st.B[0]+' each term.'};txt='Which pattern *grows faster*?';}
      else if(r===1){st.one=false;const k=rnd(1,2),d=rnd(1,3),t=rnd(2,4);st.A=[k,d*t];st.B=[k+d,0];st.ask={ans:t,o:opts(t,[1,-1,2],1),ok:'Yes! At term '+t+' both are '+(k+d)*t+'.'};txt='At which *term* are the two patterns *equal*?';}
      else if(r===2){st.one=true;st.A=[3,-rnd(9,12)];st.miss=rnd(2,4);txt='An *integer* pattern. Build the missing *term '+(st.miss+1)+'*.';}
      else if(r===3){st.one=true;st.A=[-rnd(2,3),rnd(12,16)];st.miss=5;txt='A *shrinking* pattern. Build *term 6* (it may be negative!).';}
      else{st.one=true;st.A=[rnd(2,4),-rnd(3,9)];const a=rule(...st.A);st.ask={ans:a,o:shuffle([a,rule(st.A[0],-st.A[1]),rule(st.A[0]+st.A[1],0)]).filter((x,i,arr)=>arr.indexOf(x)===i),ok:'Yes! The rate is '+st.A[0]+' and term 1 is '+sgn(st.A[0]+st.A[1])+'.'};txt='Which *expression* is the rule for this pattern?';}
      draw();st.setup=false;return txt;}};}
});

/* =========================================================
   16. Adding and subtracting monomials
   ========================================================= */
P.lesson({id:'monomials7',title:'Adding and subtracting monomials',strand:'Algebra',codes:['C2.1','C2.2'],
 guide:{goal:'Add and subtract monomials with a degree of 1 using algebra tiles and zero pairs, and evaluate algebraic expressions with whole numbers and decimals.',words:'monomial, like terms, coefficient, zero pair, opposite, evaluate',
  ask:['What happens when an x tile meets a −x tile?','Why is 5x − 2x = 3x?','How do you subtract −3x?'],home:'Use two colours of paper strips for x and −x. Model 4x − 6x and explain the answer.'},
 learn:[{say:'Opposite tiles cancel.',speech:'Green tiles are x, and red tiles are negative x. Four x plus negative six x: four zero pairs cancel and two red tiles are left. The sum is negative two x.',view:'model',demo:'add'},
        {say:'Read the rules.',speech:'To add like terms, add the coefficients. To subtract, add the opposite: flip the colour of every tile being subtracted, then combine and cancel zero pairs.',view:'read'},
        {say:'Watch: subtract by flipping.',speech:'Three x minus negative two x. Flip the negative two x into positive two x, then add: five x.',view:'model',demo:'sub'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: combine the tiles.',speech:'Your turn. Build both terms, choose plus or minus, and combine.',view:'model'}],
 fig:'Green x tiles and red −x tiles. Zero pairs cancel.',rz:.3,
 explore:['Change the coefficients of the *two terms*.','Choose *+* or *−* (minus flips the second term).','Press *Combine* to cancel zero pairs.'],
 howTo:'Combine the tiles, then choose the simplified monomial or its value.',
 init:k=>({a:4,b:-6,op:'+',done:false,x:20,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'Like terms combine by adding their *coefficients*. A tile and its opposite make a *zero pair*.')+14;
  const xt=(x,yy,c)=>{rr(g,x,yy,24,90,6);g.fillStyle=c;g.fill();};
  for(let i=0;i<4;i++)xt(X0+i*32,y,'#16a36f');for(let i=0;i<6;i++)xt(X0+160+i*32,y,'#ef4444');T(g,'4x + (−6x) = −2x',X0+380,y+56,ZS(38),acc());y+=120;
  [['5x + 3x','8x'],['5x − 3x','2x'],['3x − (−2x)','3x + 2x = 5x'],['−4x − 3x','−7x']].forEach(([a,b],i)=>{rr(g,X0,y+i*54,TW,46,12);g.fillStyle=tint(acc(),.06+i%2*.05);g.fill();T(g,a,X0+20,y+i*54+32,FT.bodyB);T(g,b,X0+TW-20,y+i*54+32,FT.bodyB,acc(),'right');});y+=230;
  y=para(p,y,'*Evaluate* with decimals: if x = 2.5, then −2x = −5.')+10;
  y=keyWords(p,y,[['monomial','a single term, like 3x or −7'],['zero pair','x and −x: together they equal 0']]);
  predict(p,y,S,'p16','Simplify 2x − 7x.','*−5x.*');},
 readout(p,S,y){const g=p.g,st=S.st,b2=st.op==='+'?st.b:-st.b,r=st.a+b2,X=st.x/10;const t=(c)=>(c===1?'':c===-1?'−':sgn(c))+'x';
  T(g,t(st.a)+' '+st.op+' '+(st.b<0?'('+t(st.b)+')':t(st.b))+(st.done?' = '+(r?t(r):'0'):''),X0,y+50,ZS(44),acc());if(st.done)T(g,'when x = '+X+':  '+(Math.round(r*X*100)/100),X0,y+92,FT.bodyB);return y+100;},
 build(S,grp,mode,game){const st=S.st;const g2=new THREE.Group();grp.add(g2);const tile=(pos)=>mk(G('mt7'+pos,()=>new THREE.BoxGeometry(.15,.08,.8)),lam(pos?'#16a36f':'#ef4444'),20);
  function draw(){clearGroup(g2);const b2=st.op==='+'?st.b:-st.b;
    if(!st.done){[[st.a,-2.5,'first'],[st.op==='−'&&st.flipped?b2:st.b,-1.3,st.op==='−'?(st.flipped?'flipped':'subtract this'):'second']].forEach(([c,z,t])=>{for(let i=0;i<Math.abs(c);i++){const m=tile(c>0);m.position.set(-1.8+i*.2,.05,z);g2.add(m);}const l=label(t+': '+(c<0?'−':'')+Math.abs(c)+'x',{size:.18,color:GREY});l.position.set(1.4,.25,z);g2.add(l);});}
    else{const r=st.a+b2;for(let i=0;i<Math.abs(r);i++){const m=tile(r>0);m.position.set(-1.8+i*.2,.05,-1.9);g2.add(m);}const l=label('= '+(r?((r===1?'':r===-1?'−':sgn(r))+'x'):'0'),{size:.34,bg:'#ffffff'});l.position.set(1.2,.6,-1.9);g2.add(l);
      const xl=label('x = '+st.x/10,{size:.22,color:'#16a36f'});xl.position.set(1.2,.2,-1.1);g2.add(xl);}A.redraw();}
  function combine(){if(st.done)return;if(st.op==='−'&&!st.flipped){st.flipped=true;A.pop();A.say('Subtract = add the opposite: flip the tiles.');draw();A.later(combine,900);return;}
    const b2=st.op==='+'?st.b:-st.b,pairs=Math.min(Math.max(st.a,0),Math.max(-b2,0))+Math.min(Math.max(-st.a,0),Math.max(b2,0));const kids=g2.children.filter(o=>o.geometry);
    if(pairs)A.say(pairs+' zero pair'+(pairs>1?'s':'')+' cancel.');kids.forEach((m,i)=>{moveTo(m,{pos:V(m.position.x,.05,-1.9),k:6});});A.later(()=>{st.done=true;A.pop();draw();},800);}
  function setUp(a,b,op){st.a=a;st.b=b;st.op=op;st.done=false;st.flipped=false;draw();}
  draw();
  return {info:()=>st.a+'x '+st.op+' '+st.b+'x',
    controls:()=>{const c=[];if(mode==='play'&&st.ask&&st.done)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok);
      if(!st.done)c.push({t:'Combine',go:true,big:true,fn:combine});else c.push({t:'x − 0.5',fn:()=>{st.x-=5;draw();}},{t:'x + 0.5',fn:()=>{st.x+=5;draw();}},{t:'Start over',fn:()=>setUp(st.a,st.b,st.op)});
      if(mode==='learn'&&!st.done)c.push({t:'1st −',fn:()=>setUp(Math.max(-8,st.a-1),st.b,st.op)},{t:'1st +',fn:()=>setUp(Math.min(8,st.a+1),st.b,st.op)},{t:'2nd −',fn:()=>setUp(st.a,Math.max(-8,st.b-1),st.op)},{t:'2nd +',fn:()=>setUp(st.a,Math.min(8,st.b+1),st.op)},{t:'+ / −',fn:()=>setUp(st.a,st.b,st.op==='+'?'−':'+')});return c;},
    demo(n){st.ask=null;if(n==='add'){setUp(4,-6,'+');A.seq([[900,combine]]);}if(n==='sub'){setUp(3,-2,'−');A.seq([[900,combine]]);}},
    task(r){st.setup=true;const t=c=>(c===1?'':c===-1?'−':sgn(c))+'x';let txt;
      const P5=[[rnd(2,6),rnd(1,5),'+'],[rnd(2,4),-rnd(5,8),'+'],[rnd(5,8),rnd(2,4),'−'],[rnd(2,5),-rnd(2,4),'−'],[-rnd(2,5),rnd(2,4),'−']][r];setUp(...P5);
      const res=st.a+(st.op==='+'?st.b:-st.b);if(r===4){st.x=pick([15,25]);const v=Math.round(res*st.x/10*10)/10;st.ask={ans:v,o:opts(v,[st.x/10,-st.x/10,1]),ok:'Yes! '+t(res)+' = '+v+' when x = '+st.x/10+'.'};txt='Simplify *'+t(st.a)+' − '+t(st.b)+'*, then evaluate when *x = '+st.x/10+'*.';}
      else{const a=res?t(res):'0';st.ask={ans:a,o:shuffle([a,t(st.a+(st.op==='+'?-st.b:st.b))||'0',t(Math.abs(st.a)+Math.abs(st.b))]).filter((x,i,arr)=>arr.indexOf(x)===i),ok:'Yes! '+a+'.'};txt='Simplify *'+t(st.a)+' '+st.op+' '+(st.b<0?'('+t(st.b)+')':t(st.b))+'*. Press Combine, then choose.';}
      st.setup=false;return txt;}};}
});

/* =========================================================
   17. Equations with decimals and multiple terms
   ========================================================= */
P.lesson({id:'equations7',title:'Equations with decimals',strand:'Algebra',codes:['C2.3'],
 guide:{goal:'Solve equations that involve multiple terms, whole numbers and decimal numbers in various contexts, and verify the solutions.',words:'equation, decimal, like terms, inverse operation, verify, solution',
  ask:['How do you solve 2.5n + 4 = 14?','Why do you subtract before you divide?','How do you check that n = 3.5 is correct?'],home:'A taxi charges $3.50 plus $1.50 per km. The ride cost $12.50. Write and solve an equation for the distance.'},
 learn:[{say:'Balance with decimals.',speech:'Two point five n plus four equals fourteen. Change n in steps of one half until the scale is level. At n equals four, both sides weigh fourteen.',view:'model',demo:'solve'},
        {say:'Read the steps.',speech:'Combine like terms. Subtract the constant from both sides. Divide both sides by the coefficient. Then substitute to verify.',view:'read'},
        {say:'Watch: a decimal answer.',speech:'Two n plus three n plus one point five equals nineteen. Five n equals seventeen point five, so n is three point five.',view:'model',demo:'dec'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: level the scale.',speech:'Your turn. Change n in steps of 0.5 or 1 until the scale is level.',view:'model'}],
 fig:'A pan balance with decimal weights.',rz:.15,
 explore:['Change *n* by 0.5 or 1.','Each bag holds *n*.','Level means both sides are equal.'],
 howTo:'Change n until the scale balances.',
 init:k=>({k:2.5,c:4,R:14,n:0,txt:'2.5n + 4 = 14'}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'Decimal equations are solved the same way: *undo* each operation on *both sides*.')+16;
  [['2.5n + 4 = 14','start'],['2.5n = 10','subtract 4 from both sides'],['n = 4','divide both sides by 2.5'],['2.5(4) + 4 = 14 ✓','verify']].forEach(([a,b],i)=>{rr(g,X0,y+i*62,TW,54,12);g.fillStyle=tint(acc(),.06+i*.03);g.fill();T(g,a,X0+20,y+i*62+38,ZS(32),acc());T(g,b,X0+TW-20,y+i*62+36,FT.body,GREY,'right');});y+=268;
  y=para(p,y,'*Multiple terms:* 2n + 3n + 1.5 = 19 → 5n + 1.5 = 19 → 5n = 17.5 → *n = 3.5*.')+10;
  y=keyWords(p,y,[['inverse operation','an operation that undoes another'],['verify','substitute the solution to check']]);
  predict(p,y,S,'p17','Solve 0.5n + 3 = 8.','*n = 10.* 0.5n = 5, so n = 10.');},
 readout(p,S,y){const g=p.g,st=S.st,Lv=Math.round((st.k*st.n+st.c)*100)/100;T(g,st.txt,X0,y+48,ZS(42),acc());T(g,'n = '+st.n+':  left '+Lv+', right '+st.R+(Lv===st.R?'  ✓':''),X0,y+90,FT.bodyB,Lv===st.R?'#16a36f':INK);return y+100;},
 build(S,grp,mode,game){const st=S.st,PV=V(0,1.62,-1.45),ARM=1.5;let ang=0,tAng=0;
  const foot=mk(new THREE.BoxGeometry(1.2,.08,.7),lam('#2563eb'),20);foot.position.set(0,.04,PV.z);grp.add(foot);const post=mk(new THREE.BoxGeometry(.13,PV.y,.13),lam('#bfdbfe'),20);post.position.set(0,PV.y/2,PV.z);grp.add(post);
  const beam=new THREE.Group();beam.position.copy(PV);grp.add(beam);beam.add(mk(new THREE.BoxGeometry(3.2,.09,.14),lam('#2563eb'),20));
  const pans=[-1,1].map(()=>{const g=new THREE.Group();g.add(mk(new THREE.CylinderGeometry(.72,.64,.06,32),lam('#ffd24a'),30));const cg=new THREE.Group();g.add(cg);g.userData.cg=cg;grp.add(g);return g;});
  function weights(cg,v,x0,col){let x=x0;const w=Math.floor(v),fr=Math.round((v-w)*10)/10;for(let i=0;i<w;i++){const c=mk(G('w7',()=>new THREE.CylinderGeometry(.09,.09,.08,14)),lam(col),0);c.position.set(x+(i%5)*.2,.07+Math.floor(i/5)*.085,-.05);cg.add(c);}
    if(fr>0){const c=mk(new THREE.CylinderGeometry(.09,.09,.08*fr,14),lam('#f59e0b'),0);c.position.set(x+(w%5)*.2,.07+Math.floor(w/5)*.085,-.05);cg.add(c);}}
  const nL=label('',{size:.24,bg:'#ffffff',border:'#2563eb'});grp.add(nL);
  function fill(){const L=pans[0].userData.cg,R=pans[1].userData.cg;clearGroup(L);clearGroup(R);const bags=st.bags||1;for(let b=0;b<bags;b++){const bag=mk(G('b7',()=>new THREE.CylinderGeometry(.12,.15,.32,14)),lam('#8b5cf6'),0);bag.position.set(-.5+b*.26,.2,.25);L.add(bag);A.drag(bag,{tap:()=>setN(st.n+.5)});}
    const lab=label((st.kshow||st.k)+'n',{size:.2,color:'#7c3aed'});lab.position.set(-.2,.6,.25);L.add(lab);weights(L,st.c,-.4,'#16a36f');weights(R,st.R,-.45,'#2f7de1');const Lv=st.k*st.n+st.c;tAng=Math.max(-.3,Math.min(.3,(Lv-st.R)*.02));}
  function place(){beam.rotation.z=ang;[-1,1].forEach((s,i)=>pans[i].position.set(PV.x+s*ARM*Math.cos(ang),PV.y+s*ARM*Math.sin(ang)-.76,PV.z));nL.userData.set('n = '+st.n);nL.position.set(0,2.35,PV.z);}
  function setN(n){n=Math.max(0,Math.min(20,Math.round(n*2)/2));if(n===st.n)return;st.n=n;A.pop();fill();if(Math.abs(st.k*n+st.c-st.R)<1e-9){A.good('Balanced! n = '+n+'.');if(mode==='play'&&!st.setup)game.solved('n = '+n+'. Check: '+st.k+' × '+n+' + '+st.c+' = '+st.R+'.');}A.redraw();}
  function setUp(k,c,R,txt,bags,kshow){st.k=k;st.c=c;st.R=R;st.txt=txt;st.n=0;st.bags=bags||1;st.kshow=kshow;fill();A.redraw();}
  fill();ang=tAng;place();
  return {tick(dt){ang+=(tAng-ang)*Math.min(1,dt*4);place();},info:()=>st.txt+'  (n = '+st.n+')',
    controls:()=>[{t:'−1',fn:()=>setN(st.n-1)},{t:'−0.5',fn:()=>setN(st.n-.5)},{t:'+0.5',big:true,go:true,fn:()=>setN(st.n+.5)},{t:'+1',big:true,fn:()=>setN(st.n+1)}],
    demo(n){if(n==='solve'){setUp(2.5,4,14,'2.5n + 4 = 14');A.seq([[700,()=>setN(1)],[600,()=>setN(2)],[600,()=>setN(3)],[600,()=>setN(4)]]);}if(n==='dec'){setUp(5,1.5,19,'2n + 3n + 1.5 = 19',2,'2n + 3');A.seq([[700,()=>setN(2)],[600,()=>setN(3)],[600,()=>setN(3.5)]]);}},
    task(r){st.setup=true;let k,c,n;
      if(r===0){k=pick([1.5,2.5]);n=rnd(2,6);c=rnd(2,6);setUp(k,c,k*n+c,k+'n + '+c+' = '+(k*n+c));}
      else if(r===1){k=rnd(2,4);n=rnd(2,7)+.5;c=rnd(1,5);setUp(k,c,k*n+c,k+'n + '+c+' = '+(k*n+c));}
      else if(r===2){const a=rnd(1,3),b=rnd(1,3);k=a+b;n=rnd(2,6)+.5;c=1.5;setUp(k,c,k*n+c,a+'n + '+b+'n + 1.5 = '+(k*n+c),2,a+'n + '+b);}
      else if(r===3){k=.5;n=rnd(6,16);c=rnd(1,4);setUp(k,c,k*n+c,'0.5n + '+c+' = '+(k*n+c));}
      else{k=1.5;n=rnd(3,8);c=3.5;setUp(k,c,k*n+c,'1.5n + 3.5 = '+(k*n+c));}
      st.setup=false;return r===4?'A taxi costs *$3.50 + $1.50 per km*. The ride cost *$'+st.R.toFixed(2)+'*. Solve *'+st.txt+'* for the kilometres n.':'Solve *'+st.txt+'*.';}};}
});

/* =========================================================
   18. Inequalities with multiple terms
   ========================================================= */
P.lesson({id:'inequal7',title:'Inequalities with several terms',strand:'Algebra',codes:['C2.4'],
 guide:{goal:'Solve inequalities that involve multiple terms and whole numbers, and verify and graph the solutions.',words:'inequality, like terms, boundary, solution set, verify, graph',
  ask:['How do you simplify 2x + 3x + 5 < 60 before solving?','Is the boundary a solution?','How do you check a number from your graph?'],home:'You have $60. Shirts cost $12 and there is a $6 shipping fee. Write an inequality for how many shirts you can buy.'},
 learn:[{say:'Combine first, then solve.',speech:'Two x plus three x plus five is less than sixty. Combine like terms: five x plus five is less than sixty. The boundary is eleven, and eleven is not a solution. Watch the graph fill in from zero to ten.',view:'model',demo:'solve'},
        {say:'Read the steps.',speech:'Combine like terms. Solve the related equation for the boundary. Test the boundary and a number on each side. Graph the solutions and verify one.',view:'read'},
        {say:'Watch: greater than or equal.',speech:'Four x plus x minus three is greater than or equal to twenty-two. Five x minus three equals twenty-two at x equals five, and five is included because of the or-equal sign.',view:'model',demo:'ge'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: graph it.',speech:'Your turn. Move the boundary, choose the side and the dot, then check.',view:'model'}],
 fig:'A number line from 0 to 50 with the solution set.',rz:-.1,
 explore:['Move the *boundary*.','Choose *◀ smaller* or *bigger ▶*.','Choose a *closed* (included) or *open* dot, then *Check*.'],
 howTo:'Combine terms, find the boundary, graph the solutions, then Check.',
 init:k=>({a:2,b:3,c:5,rel:'<',r:60,bound:25,dir:'L',incl:true}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'*Combine like terms first*, then solve like any inequality.')+16;
  [['2x + 3x + 5 < 60','start'],['5x + 5 < 60','combine like terms'],['5x + 5 = 60 → x = 11','boundary'],['solutions: 0, 1, …, 10','11 is not included (<)']].forEach(([a,b],i)=>{rr(g,X0,y+i*58,TW,50,12);g.fillStyle=tint(acc(),.06+i*.03);g.fill();T(g,a,X0+20,y+i*58+34,FT.bodyB,acc());T(g,b,X0+TW-20,y+i*58+34,FT.body,GREY,'right');});y+=250;
  [['<  or  >','open dot: boundary not included'],['≤  or  ≥','closed dot: boundary included']].forEach(([a,b],i)=>{T(g,a,X0,y+i*44+24,ZS(32),acc());T(g,b,X0+180,y+i*44+22,FT.body);});y+=110;
  y=keyWords(p,y,[['≤','less than or equal to'],['≥','greater than or equal to']]);
  predict(p,y,S,'p18','Solve 3x + x ≤ 20 for whole numbers.','*0 to 5.* 4x ≤ 20, so x ≤ 5, and 5 is included.');},
 readout(p,S,y){const g=p.g,st=S.st;T(g,iq7(st)+'  →  '+(st.a+st.b)+'x '+(st.c<0?'− '+(-st.c):'+ '+st.c)+' '+st.rel+' '+st.r,X0,y+50,FT.bodyB,acc());const ok=test7(st,st.bound);T(g,'Test '+st.bound+': '+((st.a+st.b)*st.bound+st.c)+(ok?' ✓':' ✗'),X0,y+90,FT.bodyB,ok?'#16a36f':RED);return y+100;},
 build(S,grp,mode,game){const st=S.st,Z=-1.5,L=4.3,x0=-2.15,toX=v=>x0+v/50*L;grp.add((()=>{const m=mk(new THREE.BoxGeometry(L+.2,.05,.12),lam('#cbd5e6'),0);m.position.set(0,.03,Z);return m;})());
  for(let v=0;v<=50;v++){const big=v%5===0;const t=new THREE.Mesh(G('iq7t'+big,()=>new THREE.BoxGeometry(.014,big?.2:.1,.014)),lam(INK));t.position.set(toX(v),.05+(big?.1:.05),Z);grp.add(t);if(v%10===0){const l=label(String(v),{size:.24});l.position.set(toX(v),.4,Z+.35);grp.add(l);}}
  const beads=new THREE.Group(),mkr=new THREE.Group();grp.add(beads,mkr);const fl=mk(new THREE.ConeGeometry(.12,.3,16),lam('#ffd24a'),0);fl.rotation.x=Math.PI;fl.position.y=.55;mkr.add(fl);const ring=mk(new THREE.TorusGeometry(.1,.03,8,20),lam(RED),0);ring.rotation.x=Math.PI/2;ring.position.y=.12;mkr.add(ring);
  const fillDot=mk(new THREE.SphereGeometry(.08,12,10),lam('#16a36f'),0);fillDot.position.y=.12;mkr.add(fillDot);const bl=label('',{size:.24,bg:'#ffffff'});bl.position.y=.95;mkr.add(bl);
  const arrow=mk(new THREE.ConeGeometry(.12,.3,14),lam('#16a36f'),0);grp.add(arrow);const exL=label('',{size:.34,bg:'#ffffff'});exL.position.set(0,1.5,Z-.9);grp.add(exL);A.drag(mkr,{h:.2,drop:pos=>setB(Math.round((pos.x-x0)/L*50))});
  const shown=()=>{const s=[];for(let v=0;v<=50;v++)if(st.dir==='L'?v<st.bound||(st.incl&&v===st.bound):v>st.bound||(st.incl&&v===st.bound))s.push(v);return s;};const sols=()=>{const s=[];for(let v=0;v<=50;v++)if(test7(st,v))s.push(v);return s;};
  function draw(){clearGroup(beads);shown().forEach(v=>{const b=mk(G('iq7b',()=>new THREE.SphereGeometry(.045,10,8)),lam('#16a36f'),0);b.position.set(toX(v),.12,Z);beads.add(b);});mkr.position.set(toX(st.bound),0,Z);fillDot.visible=st.incl;bl.userData.set(String(st.bound));
    arrow.rotation.z=st.dir==='L'?Math.PI/2:-Math.PI/2;arrow.position.set(st.dir==='L'?x0-.15:x0+L+.15,.12,Z);exL.userData.set(iq7(st));A.redraw();}
  function setB(v){st.bound=Math.max(0,Math.min(50,v));A.pop();draw();}
  function check(){const s=sols(),m=shown();if(s.length===m.length&&s.every((v,i)=>v===m[i])){A.good('Correct graph!');if(mode==='play'&&!st.setup)game.solved('Solutions: '+(s.length?s[0]+' to '+s[s.length-1]:'none')+'.');return;}const w=m.find(v=>!s.includes(v)),mi=s.find(v=>!m.includes(v));A.bad(w!=null?'Test '+w+'.':'You are missing '+mi+'.');}
  function setUp(a,b,c,rel,r){st.a=a;st.b=b;st.c=c;st.rel=rel;st.r=r;st.bound=25;st.dir='L';st.incl=true;draw();}
  draw();
  return {info:()=>iq7(st),
    controls:()=>[{t:'−5',fn:()=>setB(st.bound-5)},{t:'−1',fn:()=>setB(st.bound-1)},{t:'+1',fn:()=>setB(st.bound+1)},{t:'+5',fn:()=>setB(st.bound+5)},{t:'◀ smaller',on:st.dir==='L',fn:()=>{st.dir='L';draw();}},{t:'bigger ▶',on:st.dir==='R',fn:()=>{st.dir='R';draw();}},{t:st.incl?'● closed':'○ open',fn:()=>{st.incl=!st.incl;draw();}},{t:'Check',go:true,big:true,fn:check}],
    demo(n){if(n==='solve'){setUp(2,3,5,'<',60);A.seq([[700,()=>setB(11)],[700,()=>{st.incl=false;draw();}],[1100,check]]);}if(n==='ge'){setUp(4,1,-3,'≥',22);A.seq([[700,()=>setB(5)],[700,()=>{st.dir='R';st.incl=true;draw();}],[1100,check]]);}},
    task(r){st.setup=true;[()=>setUp(rnd(1,3),rnd(1,3),rnd(2,8),'<',rnd(40,90)),()=>setUp(rnd(2,3),rnd(1,2),-rnd(1,6),'>',rnd(20,60)),()=>setUp(rnd(1,2),rnd(1,2),rnd(1,5),'≤',rnd(20,60)),()=>setUp(rnd(2,4),1,-rnd(2,8),'≥',rnd(25,70)),()=>setUp(12,0,6,'≤',60)][r]();st.setup=false;
      return r===4?'Shirts cost *$12* each plus *$6* shipping, and you have *$60*: *12x + 6 ≤ 60*. Graph how many shirts x.':'Graph every whole number from 0 to 50 that solves *'+iq7(st)+'*.';}};}
});
function iq7(st){return (st.b?st.a+'x + '+st.b+'x':st.a+'x')+' '+(st.c<0?'− '+(-st.c):'+ '+st.c)+' '+st.rel+' '+st.r;}
function test7(st,x){const v=(st.a+st.b)*x+st.c;return st.rel==='<'?v<st.r:st.rel==='>'?v>st.r:st.rel==='≤'?v<=st.r:v>=st.r;}

/* =========================================================
   19. Coding with counts and sub-programs
   ========================================================= */
P.lesson({id:'coding7',title:'Coding with sub-programs',strand:'Algebra',codes:['C3.1','C3.2'],
 guide:{goal:'Write, run, read and alter efficient code that uses a defined count and sub-programs, and describe how changes to the code affect the outcome.',words:'sub-program, function, parameter, count, loop, efficient, debug',
  ask:['Why is it useful to define side(n) once and call it many times?','What changes if the count goes from 4 to 2?','How can two sub-programs draw a rectangle?'],home:'Write a “dance sub-program” called step(n): n claps and a spin. Call it with different numbers.'},
 learn:[{say:'Define it once, call it often.',speech:'The sub-program side n moves forward n squares, then turns right. The main program calls side three, four times. Watch the turtle draw a square.',view:'model',demo:'square'},
        {say:'Read about sub-programs and counts.',speech:'A sub-program is a named group of steps. A parameter, like n, changes what it does. A count tells how many times the main program repeats it. This makes code short and easy to change.',view:'read'},
        {say:'Watch: two sub-programs make a rectangle.',speech:'Now the main program calls side four, then side two, and repeats that twice. The turtle draws a four by two rectangle.',view:'model',demo:'rect'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: match the shape.',speech:'Your turn. Set the parameters and the count so the turtle draws the dashed shape.',view:'model'}],
 fig:'A turtle draws with a sub-program called side(n).',rz:.35,
 explore:['Set *n* (and *m*) for the sub-program calls.','Set the *count*: how many times the main program repeats.','Press *▶ Run* and compare with the dashed target.'],
 howTo:'Set the parameters and the count so the turtle traces the dashed shape exactly, then Run.',
 init:k=>({n:3,m:0,k:4,tgt:null,path:[]}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'A *sub-program* is a named piece of code you can *call* again and again. A *parameter* changes how it behaves.')+14;
  rr(g,X0,y,460,250,16);g.fillStyle='#24203f';g.fill();const MF='700 25px "Atkinson Hyperlegible", monospace';
  T(g,'define side(n):',X0+22,y+44,MF,'#ffd86b');T(g,'forward n',X0+60,y+80,MF,'#9fe6ff');T(g,'turn right',X0+60,y+114,MF,'#ffb3cf');T(g,'repeat 2 times:',X0+22,y+164,MF,'#ffd86b');T(g,'side(4)',X0+60,y+198,MF,'#bbf7d0');T(g,'side(2)',X0+60,y+232,MF,'#bbf7d0');
  const s=36,ox=X0+520,oy=y+40;g.strokeStyle='#16a36f';g.lineWidth=5;g.strokeRect(ox,oy,4*s,2*s);T(g,'4 × 2 rectangle',ox,oy+2*s+36,FT.bodyB);y+=280;
  y=para(p,y,'*Efficient code:* 5 lines instead of 12. To draw a bigger rectangle, change only the *parameters*.')+10;
  y=keyWords(p,y,[['sub-program','a named set of instructions you can call'],['parameter','a value you give a sub-program, like n']]);
  predict(p,y,S,'p19','What shape does “repeat 4 times: side(2)” draw?','*A 2 × 2 square.*');},
 readout(p,S,y){const g=p.g,st=S.st;const MF='700 24px "Atkinson Hyperlegible", monospace';rr(g,X0,y,TW,70,12);g.fillStyle='#24203f';g.fill();T(g,'repeat '+st.k+' times:  side('+st.n+')'+(st.m?'  side('+st.m+')':''),X0+20,y+44,MF,'#ffd86b');return y+84;},
 build(S,grp,mode,game){const st=S.st,N=8,s=.45,x0=-1.6,z0=-.35;const X=c=>x0+c*s,Z=r=>z0-r*s;
  const base=mk(new THREE.BoxGeometry(N*s+.1,.03,N*s+.1),[lam('#f0fdf4'),lam('#f0fdf4'),cellMat('#ffffff',N,N),lam('#f0fdf4'),lam('#f0fdf4'),lam('#f0fdf4')],20);base.position.set(X(N/2),.015,Z(N/2));grp.add(base);
  const tg=new THREE.Group(),pg=new THREE.Group();grp.add(tg,pg);const turtle=new THREE.Group();const sh=mk(new THREE.SphereGeometry(.18,16,10,0,Math.PI*2,0,Math.PI/2),lam('#16a36f'),0);turtle.add(sh);const hd=mk(new THREE.SphereGeometry(.07,10,8),lam('#86efac'),0);hd.position.set(0,.05,-.2);turtle.add(hd);grp.add(turtle);
  let running=false,steps=[],si=0,timer=0,pos=[0,0],dir=0;const start=[1,1];
  function prog(n,m,k){const out=[];for(let i=0;i<k;i++){[n,m].forEach(v=>{if(!v)return;for(let j=0;j<v;j++)out.push('F');out.push('R');});}return out;}
  function trace(list){let p=start.slice(),d=0;const segs=[];list.forEach(c=>{if(c==='R')d=(d+1)%4;else{const q=[p[0]+[0,1,0,-1][d],p[1]+[1,0,-1,0][d]];segs.push([p,q]);p=q;}});return segs;}
  const keyS=segs=>segs.map(([a,b])=>[a.join(),b.join()].sort().join('|')).filter((v,i,a)=>a.indexOf(v)===i).sort().join(';');
  function drawT(){clearGroup(tg);if(!st.tgt)return;trace(st.tgt).forEach(([a,b])=>{const A3=V(X(a[0]),.05,Z(a[1])),B3=V(X(b[0]),.05,Z(b[1]));const n=6;for(let k=0;k<n;k+=2)tg.add(seg(A3.clone().lerp(B3,k/n),A3.clone().lerp(B3,(k+1)/n),'#94a3b8',.025));});}
  function reset(){clearGroup(pg);pos=start.slice();dir=0;turtle.position.set(X(pos[0]),.03,Z(pos[1]));turtle.rotation.y=0;running=false;}
  function run(){if(running)return;reset();steps=prog(st.n,st.m,st.k);if(steps.length>80){A.bad('That program is too long for the grid.');return;}si=0;timer=.2;running=true;}
  function step(){if(si>=steps.length){running=false;const ok=st.tgt&&keyS(trace(steps))===keyS(trace(st.tgt));if(st.tgt){if(ok){A.good('Exact match!');if(mode==='play'&&!st.setup)game.solved('Your code drew the shape with '+(st.m?2:1)+' sub-program call'+(st.m?'s':'')+'!');}else A.bad('Not the same shape. Debug a parameter or the count.');}A.redraw();return;}
    const c=steps[si++];if(c==='R'){dir=(dir+1)%4;moveTo(turtle,{rotY:-dir*Math.PI/2,k:14});}else{const q=[pos[0]+[0,1,0,-1][dir],pos[1]+[1,0,-1,0][dir]];if(q[0]<0||q[1]<0||q[0]>N||q[1]>N){running=false;A.bad('The turtle left the grid!');return;}
      pg.add(seg(V(X(pos[0]),.07,Z(pos[1])),V(X(q[0]),.07,Z(q[1])),'#16a36f',.035));pos=q;moveTo(turtle,{pos:V(X(pos[0]),.03,Z(pos[1])),k:12});A.pop();}}
  reset();drawT();
  return {tick(dt){if(running){timer-=dt;if(timer<=0){timer=.22;step();}}},info:()=>'repeat '+st.k+': side('+st.n+')'+(st.m?' side('+st.m+')':''),
    controls:()=>[{t:'n −',fn:()=>{st.n=Math.max(1,st.n-1);A.redraw();}},{t:'n +',fn:()=>{st.n=Math.min(6,st.n+1);A.redraw();}},{t:'m −',fn:()=>{st.m=Math.max(0,st.m-1);A.redraw();}},{t:'m +',fn:()=>{st.m=Math.min(6,st.m+1);A.redraw();}},{t:'count −',fn:()=>{st.k=Math.max(1,st.k-1);A.redraw();}},{t:'count +',fn:()=>{st.k=Math.min(8,st.k+1);A.redraw();}},{t:'▶ Run',go:true,big:true,fn:run},{t:'Clear',fn:()=>{reset();A.redraw();}}],
    demo(n){if(n==='square'){st.n=3;st.m=0;st.k=4;st.tgt=null;drawT();A.seq([[700,run]]);}if(n==='rect'){st.n=4;st.m=2;st.k=2;st.tgt=null;drawT();A.seq([[700,run]]);}},
    task(r){st.setup=true;let txt;const T5=[[[3,0,4],[1,0,1]],[[4,2,2],[2,2,1]],[[2,0,4],[4,0,4]],[[5,3,2],[5,3,1]],[[2,1,4],[1,1,4]]][r];st.tgt=prog(...T5[0]);[st.n,st.m,st.k]=T5[1];reset();drawT();
      txt=r===2?'*Debug*: this code draws a shape that is too big. Fix it to match the dashed square.':r===3?'*Debug*: the count is wrong. Fix the code to draw the full rectangle.':'Set the parameters and count to draw the *dashed shape*.';st.setup=false;return txt;}};}
});

/* =========================================================
   20. Circle graphs and percentages
   ========================================================= */
const CG=[['Soccer','#2f7de1'],['Hockey','#e2457a'],['Basketball','#16a36f'],['Swimming','#f59e0b'],['Other','#8b5cf6']];
P.lesson({id:'circle7',title:'Circle graphs and percentages',strand:'Data',codes:['D1.1','D1.2','D1.3','D1.4'],
 guide:{goal:'Explain why percentages are used for large data sets, collect and organize data using percentages, create circle graphs with titles, labels and sources, and use them in infographics.',words:'circle graph, sector, percent, central angle, 360°, population, sample, infographic',
  ask:['Why do circle graphs use percents instead of counts?','How many degrees is a 25% sector?','When is a circle graph a good choice? When is it not?'],home:'Survey your family about their favourite fruit. Turn the counts into percents and sketch a circle graph.'},
 learn:[{say:'Parts of a whole as percents.',speech:'Two hundred students chose their favourite sport. A circle graph shows each choice as a part of the whole, using percents. Watch the slices grow: soccer is thirty-five percent.',view:'model',demo:'build'},
        {say:'Read how to build one.',speech:'Change each count to a percent of the total. Multiply each percent by three hundred sixty degrees to find the angle of its sector. The percents must add to one hundred.',view:'read'},
        {say:'Watch: why percents?',speech:'Two schools of different sizes can be compared with percents. Forty out of two hundred is twenty percent, and the same as one hundred out of five hundred.',view:'model',demo:'compare'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: read the circle graph.',speech:'Your turn. Tap a sector to read its percent, its angle, and its count.',view:'model'}],
 fig:'A 3D circle graph. Each sector is a percent of 360°.',rz:.3,
 explore:['*Tap a sector* to read it.','Change the *counts* with the buttons.','Each percent × 360° = the sector angle.'],
 howTo:'Read the circle graph, then tap the sector or choose the answer.',
 init:k=>({c:[70,50,40,24,16],sel:-1,ask:null,want:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'A *circle graph* shows parts of a whole. With *large data sets*, percents make it easy to compare.')+14;
  const cx=X0+150,cy=y+140,R=120;let a0=-Math.PI/2;[35,25,20,12,8].forEach((p2,i)=>{const a1=a0+p2/100*Math.PI*2;g.beginPath();g.moveTo(cx,cy);g.arc(cx,cy,R,a0,a1);g.closePath();g.fillStyle=CG[i][1];g.fill();g.strokeStyle='#fff';g.lineWidth=3;g.stroke();a0=a1;});
  T(g,'Favourite Sports',X0+320,y+30,FT.bodyB);[35,25,20,12,8].forEach((p2,i)=>{g.fillStyle=CG[i][1];g.fillRect(X0+320,y+50+i*36,22,22);T(g,CG[i][0]+' '+p2+'%',X0+352,y+68+i*36,FT.small);});T(g,'n = 200 students · source: school survey',X0+320,y+260,FT.cap,GREY);y+=290;
  rr(g,X0,y,TW,96,14);g.fillStyle=tint(acc(),.1);g.fill();T(g,'Soccer: 70 ÷ 200 = 35%',X0+20,y+40,FT.bodyB);T(g,'angle: 35% × 360° = 126°',X0+20,y+80,FT.bodyB,acc());y+=120;
  y=keyWords(p,y,[['sector','one slice of a circle graph'],['central angle','the angle of a sector at the centre: percent × 360°']]);
  predict(p,y,S,'p20','What angle does a 25% sector have?','*90°.* 25% of 360° = 90°.');},
 readout(p,S,y){const g=p.g,st=S.st,t=st.c.reduce((a,b)=>a+b,0);if(st.sel>=0){const pc=st.c[st.sel]/t*100;T(g,CG[st.sel][0]+': '+st.c[st.sel]+' of '+t+' = '+(+pc.toFixed(1))+'%  ·  '+(+(pc*3.6).toFixed(1))+'°',X0,y+46,FT.bodyB,CG[st.sel][1]);}
  else T(g,'Total: '+t+'. Tap a sector.',X0,y+46,FT.bodyB,acc());return y+60;},
 build(S,grp,mode,game){const st=S.st;const pie=new THREE.Group();pie.position.set(-.6,0,-1.8);grp.add(pie);const leg=new THREE.Group();grp.add(leg);
  function draw(){clearGroup(pie);clearGroup(leg);const t=st.c.reduce((a,b)=>a+b,0);let a0=0;st.c.forEach((v,i)=>{const a1=a0+v/t*Math.PI*2;const sel=st.sel===i;const h=.18+(sel?.18:0)+v/t*.4;const m=mk(wedgeGeo(1.2,h,a0+.01,a1-.01),lam(CG[i][1]),20);
      if(sel){const mid=(a0+a1)/2;m.position.set(Math.cos(mid)*.15,0,-Math.sin(mid)*.15);}pie.add(m);A.drag(m,{tap:()=>tap(i)});const mid=(a0+a1)/2;const l=label(Math.round(v/t*100)+'%',{size:.2,color:'#fff'});l.position.set(Math.cos(mid)*.75,h+.12,-Math.sin(mid)*.75);pie.add(l);a0=a1;});
    CG.forEach(([n,c],i)=>{const sw=mk(G('cgs7',()=>new THREE.BoxGeometry(.18,.06,.18)),lam(c),0);sw.position.set(1.3,.04,-2.7+i*.32);leg.add(sw);const l=label(n+' ('+st.c[i]+')',{size:.15,color:INK});l.position.set(1.85,.12,-2.7+i*.32);leg.add(l);});
    const tl=label('Favourite Sports (n = '+t+')',{size:.22});tl.position.set(-.6,1.3,-3.1);leg.add(tl);A.redraw();}
  function tap(i){st.sel=i;A.pop();draw();if(mode==='play'&&!st.setup&&st.want){if(st.want(i))game.solved(st.wantOk);else A.bad('Not that sector. Read the question again.');}}
  draw();
  return {info:()=>'n = '+st.c.reduce((a,b)=>a+b,0),
    controls:()=>{if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok);return mode==='learn'?CG.map(([n],i)=>({t:'+ '+n,fn:()=>{st.c[i]+=10;draw();}})).concat([{t:'Reset',fn:()=>{st.c=[70,50,40,24,16];st.sel=-1;draw();}}]):[];},
    demo(n){st.ask=null;st.want=null;if(n==='build'){const fin=[70,50,40,24,16];st.c=[1,1,1,1,1];draw();const l=[];for(let k=1;k<=5;k++)l.push([400,()=>{st.c=fin.map(v=>Math.max(1,Math.round(v*k/5)));draw();}]);l.push([500,()=>tap(0)]);A.seq(l);}if(n==='compare'){st.c=[40,60,50,30,20];draw();A.seq([[700,()=>tap(0)],[900,()=>A.say('40 of 200 = 20%')]]);}},
    task(r){st.setup=true;st.ask=null;st.want=null;st.sel=-1;const base=[[35,25,20,12,8],[30,30,20,15,5],[40,20,20,10,10],[25,25,25,15,10]];const pc=pick(base);const N=pick([200,400]);st.c=pc.map(p=>p*N/100);let txt;
      if(r===0){const mx=Math.max(...st.c),i=st.c.indexOf(mx);st.want=j=>st.c[j]===mx;st.wantOk='Yes! '+CG[i][0]+' has the biggest sector.';txt='Tap the sector for the *most popular* sport.';}
      else if(r===1){const i=rnd(0,4);const v=pc[i];st.ask={ans:v+'%',o:shuffle([v+'%',st.c[i]+'%',(v*3.6)+'%']).filter((x,j,a)=>a.indexOf(x)===j),ok:'Yes! '+st.c[i]+' ÷ '+N+' = '+v+'%.'};txt='What *percent* chose *'+CG[i][0]+'*?';}
      else if(r===2){const i=rnd(0,3);const ang=pc[i]*3.6;st.ask={ans:ang+'°',o:shuffle([ang+'°',pc[i]+'°',(ang/2)+'°']),ok:'Yes! '+pc[i]+'% × 360° = '+ang+'°.'};txt='What is the *angle* of the *'+CG[i][0]+'* sector?';}
      else if(r===3){st.ask={ans:'Circle graph',o:shuffle(['Circle graph','Broken-line graph','Histogram']),ok:'Yes! Parts of one whole: a circle graph.'};txt='Which graph best shows *how a whole class splits into favourite sports*?';}
      else{const i=rnd(0,4),T2=pick([500,800,1000]);const v=pc[i]*T2/100;st.ask={ans:v,o:opts(v,[10,-10,v]),ok:'Yes! '+pc[i]+'% of '+T2+' = '+v+'.'};txt='If the whole school of *'+T2+'* matches this sample, about how many chose *'+CG[i][0]+'*?';}
      draw();st.setup=false;return txt;}};}
});

/* =========================================================
   21. Adding and removing data
   ========================================================= */
P.lesson({id:'dataimpact7',title:'How new data changes the measures',strand:'Data',codes:['D1.5'],
 guide:{goal:'Determine how adding or removing data changes the mean, median and mode, and describe how these changes alter the shape and distribution of the data.',words:'mean, median, mode, outlier, distribution, shape, cluster',
  ask:['Which measure changes the most when you add an outlier?','What happens to the median when you add one value in the middle?','How does removing the largest value change the shape?'],home:'Record family members’ ages. Add a grandparent’s age. How do the mean and median change?'},
 learn:[{say:'Add an outlier.',speech:'These dots show test scores. The mean is about seventy. Now add one very low score: twenty. Watch the mean slide down a lot, while the median barely moves.',view:'model',demo:'outlier'},
        {say:'Read about the effects.',speech:'The mean uses every value, so outliers pull it strongly. The median depends only on the middle, so it changes a little. The mode may not change at all.',view:'read'},
        {say:'Watch: removing data.',speech:'Remove the two lowest scores. The data clusters more tightly, and the mean and median both move up.',view:'model',demo:'remove'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: add and remove.',speech:'Your turn. Add or remove data points and watch the mean, median and mode markers move.',view:'model'}],
 fig:'A dot plot with markers for the mean, median and mode.',rz:.3,
 explore:['*Tap the number line* to add a value; *tap a dot* to remove it.','Watch the *mean* (gold), *median* (blue) and *mode* (pink).','Try adding an *outlier*.'],
 howTo:'Predict how the measures change, then choose the answer.',
 init:k=>({d:[60,65,70,70,75,80,85],ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'Adding or removing data can change the *centre* and the *shape* of a data set.')+16;
  [['Add an outlier (very high or low)','mean moves a lot; median a little; mode often stays'],['Add a value near the middle','all three change only a little'],['Remove an extreme value','mean moves toward the cluster']].forEach(([a,b],i)=>{rr(g,X0,y+i*84,TW,76,14);g.fillStyle=tint(acc(),.06+i*.03);g.fill();T(g,a,X0+20,y+i*84+32,FT.bodyB,acc());T(g,b,X0+20,y+i*84+62,FT.small);});y+=268;
  T(g,'60, 65, 70, 70, 75, 80, 85: mean ≈ 72',X0,y+20,FT.bodyB);T(g,'+ 20: mean ≈ 66, median 70 → 70',X0,y+60,FT.bodyB,RED);y+=100;
  y=keyWords(p,y,[['outlier','a value far away from the rest'],['distribution','how the data is spread out']]);
  predict(p,y,S,'p21','Data: 4, 5, 5, 6, 30. If you remove 30, what happens to the mean?','*It drops from 10 to 5.* The outlier was pulling it up.');},
 readout(p,S,y){const g=p.g,st=S.st,m=meas(st.d);T(g,'n = '+st.d.length+'  ·  mean '+m.mean+'  ·  median '+m.med+'  ·  mode '+(m.mode.length?m.mode.join(', '):'none')+'  ·  range '+m.range,X0,y+46,FT.bodyB,acc());return y+60;},
 build(S,grp,mode,game){const st=S.st,L=4.2,x0=-2.1,Z=-1.6,toX=v=>x0+v/100*L;const g2=new THREE.Group();grp.add(g2);const tr=mk(new THREE.BoxGeometry(L+.1,.05,.12),lam('#cbd5e6'),0);tr.position.set(0,.03,Z);grp.add(tr);
  for(let v=0;v<=100;v+=5){const pd=mk(G('di7p',()=>new THREE.CylinderGeometry(.05,.05,.04,10)),lam('#ffffff'),0);pd.position.set(toX(v),.07,Z+.25);grp.add(pd);A.drag(pd,{tap:()=>add(v)});if(v%10===0){const l=label(String(v),{size:.16,color:GREY});l.position.set(toX(v),.2,Z+.5);grp.add(l);}}
  function draw(){clearGroup(g2);const cnt={};st.d.slice().sort((a,b)=>a-b).forEach(v=>{cnt[v]=(cnt[v]||0)+1;const d=mk(G('di7d',()=>new THREE.SphereGeometry(.09,14,10)),lam('#2f7de1'),0);d.position.set(toX(v),.1+(cnt[v]-1)*.19,Z-.25);g2.add(d);A.drag(d,{tap:()=>rem(v)});});
    const m=meas(st.d);[[m.mean,'#f59e0b','mean'],[m.med,'#0ea5e9','median']].forEach(([v,c,t],i)=>{const r=mk(new THREE.BoxGeometry(.03,1.3,.03),lam(c),0);r.position.set(toX(v),.65,Z-.6-i*.15);g2.add(r);const l=label(t+' '+v,{size:.17,bg:'#ffffff',border:c});l.position.set(toX(v),1.45+i*.28,Z-.6);g2.add(l);});
    m.mode.forEach(v=>{const r=mk(new THREE.TorusGeometry(.13,.025,8,18),lam('#e2457a'),0);r.rotation.x=Math.PI/2;r.position.set(toX(v),.05,Z-.25);g2.add(r);});A.redraw();}
  function add(v){if(st.d.length>=14){A.bad('That is enough data points.');return;}st.d.push(v);A.pop();draw();}
  function rem(v){if(st.d.length<=2)return;st.d.splice(st.d.indexOf(v),1);A.pop();draw();}
  draw();
  return {info:()=>'mean '+meas(st.d).mean+' · median '+meas(st.d).med,
    controls:()=>{if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok);return [{t:'Add outlier 20',fn:()=>add(20)},{t:'Add 95',fn:()=>add(95)},{t:'Reset',fn:()=>{st.d=[60,65,70,70,75,80,85];draw();}}];},
    demo(n){st.ask=null;st.d=[60,65,70,70,75,80,85];draw();if(n==='outlier')A.seq([[900,()=>add(20)],[900,()=>A.say('The mean fell a lot. The median stayed at 70.')]]);if(n==='remove'){st.d=[20,30,60,65,70,70,75,80,85];draw();A.seq([[900,()=>rem(20)],[900,()=>rem(30)]]);}},
    task(r){st.setup=true;st.d=[60,65,70,70,75,80,85];let txt;
      if(r===0){st.ask={ans:'The mean',o:['The mean','The median','The mode'],ok:'Yes! The mean uses every value, so an outlier pulls it most.'};txt='Add a score of *10*. Which measure will change the *most*?';}
      else if(r===1){st.ask={ans:'It stays 70',o:['It stays 70','It goes up','It goes down'],ok:'Yes! Adding 70 keeps 70 in the middle.'};txt='Add another *70*. What happens to the *median*?';}
      else if(r===2){st.d=[4,5,5,6,30];st.ask={ans:5,o:[5,10,6],ok:'Yes! 4 + 5 + 5 + 6 = 20, and 20 ÷ 4 = 5.'};txt='Data: 4, 5, 5, 6, 30 (on a 0–100 line). If *30* is removed, what is the new *mean*?';}
      else if(r===3){st.ask={ans:'It goes up',o:['It goes up','It goes down','It stays the same'],ok:'Yes! Removing the lowest value moves the mean up.'};txt='Remove the *lowest* score. What happens to the *mean*?';}
      else{st.ask={ans:'More spread out',o:['More spread out','Less spread out','No change'],ok:'Yes! An outlier makes the range much bigger.'};txt='Add a score of *15*. How does the *shape* of the data change?';}
      draw();st.setup=false;return txt;}};}
});
function meas(d){const s=d.slice().sort((a,b)=>a-b),n=s.length,sum=s.reduce((a,b)=>a+b,0);const c={};s.forEach(v=>c[v]=(c[v]||0)+1);const mx=Math.max(...Object.values(c));
  return {mean:Math.round(sum/n*10)/10,med:n%2?s[(n-1)/2]:(s[n/2-1]+s[n/2])/2,mode:mx<2?[]:Object.keys(c).filter(k=>c[k]===mx).map(Number),range:s[n-1]-s[0]};}

/* =========================================================
   22. Misleading graphs
   ========================================================= */
P.lesson({id:'mislead7',title:'Spotting misleading graphs',strand:'Data',codes:['D1.6'],
 guide:{goal:'Analyse data presented in various ways, including circle graphs and misleading graphs, by asking and answering questions, challenging preconceived notions, and drawing conclusions.',words:'misleading, scale, broken axis, perspective, percent total, conclusion, bias',
  ask:['Why can a tilted 3D circle graph mislead?','What should the percents in a circle graph add to?','How does starting an axis at 90 change the picture?'],home:'Find an ad or news graph. Check the axis, the percents and the source. Is it fair?'},
 learn:[{say:'Same data, different pictures.',speech:'Both graphs show the same sales. On the left, the axis starts at zero. On the right, it starts at ninety, so a small difference looks huge. Watch the axis change.',view:'model',demo:'axis'},
        {say:'Read the warning signs.',speech:'Watch out for axes that do not start at zero, uneven scales, 3D tilts that make front slices look bigger, percents that do not add to one hundred, and missing sources.',view:'read'},
        {say:'Watch: a tilted circle graph.',speech:'Tilt a circle graph and the front slice looks bigger than it is. The back slice has the same percent but looks smaller.',view:'model',demo:'tilt'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: be a graph detective.',speech:'Your turn. Switch views and decide what makes each graph fair or misleading.',view:'model'}],
 fig:'Bar and circle graphs drawn fairly and unfairly.',rz:.3,
 explore:['Switch *Fair* and *Misleading*.','Look at the *axis*, the *tilt* and the *percents*.','Decide what conclusion is fair.'],
 howTo:'Find what makes the graph misleading, then choose the answer.',
 init:k=>({kind:'bar',mis:false,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'A graph can be *accurate* but *misleading*. Always check these:')+14;
  [['Axis','Does it start at 0? Are the steps even?'],['3D tilt','Front slices look bigger than they are.'],['Percents','Do the parts of a circle graph add to 100%?'],['Pictures','Doubling a picture’s height and width makes it 4 times as big.'],['Source','Who collected the data, and how many?']].forEach(([a,b],i)=>{rr(g,X0,y+i*62,TW,54,12);g.fillStyle=tint(RED,.06+i%2*.04);g.fill();T(g,a,X0+20,y+i*62+36,FT.bodyB,RED);T(g,b,X0+180,y+i*62+36,FT.small);});y+=330;
  y=para(p,y,'*Challenge* first impressions: a “huge” jump might be only 2%.')+10;
  y=keyWords(p,y,[['misleading','giving a false impression'],['broken axis','an axis that does not start at 0']]);
  predict(p,y,S,'p22','A circle graph shows 40%, 35% and 30%. What is wrong?','*The percents add to 105%,* not 100%.');},
 readout(p,S,y){const g=p.g,st=S.st;T(g,st.kind==='bar'?(st.mis?'Axis starts at 90: differences look huge.':'Axis starts at 0: a fair view.'):(st.mis?'Tilted 3D: the front slice looks bigger.':'Flat view: slices match their percents.'),X0,y+46,FT.bodyB,st.mis?RED:'#16a36f');return y+60;},
 build(S,grp,mode,game){const st=S.st;const g2=new THREE.Group();grp.add(g2);const data=[92,94,96,98];
  function draw(){clearGroup(g2);if(st.kind==='bar'){const base=st.mis?90:0,sc=st.mis?.25:.02;const back=mk(new THREE.BoxGeometry(3.6,2.3,.04),lam('#ffffff'),20);back.position.set(0,1.15,-2.8);g2.add(back);
      data.forEach((v,i)=>{const h=(v-base)*sc;const b=mk(new THREE.BoxGeometry(.5,Math.max(.02,h),.5),lam(['#93c5fd','#60a5fa','#3b82f6','#1d4ed8'][i]),20);b.position.set(-1.2+i*.8,h/2,-2.4);g2.add(b);const l=label(v+'%',{size:.18});l.position.set(-1.2+i*.8,h+.2,-2.4);g2.add(l);const yl=label('Q'+(i+1),{size:.15,color:GREY});yl.position.set(-1.2+i*.8,.1,-2.0);g2.add(yl);});
      const ax=label('axis starts at '+base,{size:.18,color:st.mis?RED:'#16a36f'});ax.position.set(-1.6,2.45,-2.75);g2.add(ax);}
    else{const pie=new THREE.Group();pie.position.set(0,.3,-1.9);g2.add(pie);const vals=[25,25,25,25];let a0=0;vals.forEach((v,i)=>{const a1=a0+v/100*Math.PI*2;const m=mk(wedgeGeo(1.1,.3,a0+.01,a1-.01),lam(CG[i][1]),20);pie.add(m);const mid=(a0+a1)/2;const l=label('25%',{size:.2,color:'#fff'});l.position.set(Math.cos(mid)*.65,.45,-Math.sin(mid)*.65);pie.add(l);a0=a1;});
      pie.rotation.x=st.mis?.95:0;pie.rotation.z=0;if(st.mis){pie.rotation.y=-Math.PI/4;}else pie.rotation.y=0;}A.redraw();}
  draw();
  return {info:()=>st.mis?'Misleading view':'Fair view',
    controls:()=>{const c=[{t:'Bar graph',on:st.kind==='bar',fn:()=>{st.kind='bar';draw();}},{t:'Circle graph',on:st.kind==='pie',fn:()=>{st.kind='pie';draw();}},{t:'Fair',on:!st.mis,fn:()=>{st.mis=false;draw();}},{t:'Misleading',on:st.mis,fn:()=>{st.mis=true;draw();}}];
      if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);return c;},
    demo(n){st.ask=null;if(n==='axis'){st.kind='bar';st.mis=false;draw();A.seq([[1200,()=>{st.mis=true;draw();A.say('Axis from 90: Q4 looks 4 times as big!');}],[2200,()=>{st.mis=false;draw();}]]);}if(n==='tilt'){st.kind='pie';st.mis=false;draw();A.seq([[1000,()=>{st.mis=true;draw();A.say('Every slice is 25%, but the front one looks bigger.');}]]);}},
    task(r){st.setup=true;let txt;
      if(r===0){st.kind='bar';st.mis=true;st.ask={ans:'The axis starts at 90',o:shuffle(['The axis starts at 90','The bars are blue','There are 4 bars']),ok:'Yes! A broken axis exaggerates small differences.'};txt='What makes this bar graph *misleading*?';}
      else if(r===1){st.kind='bar';st.mis=true;st.ask={ans:'About 6% more',o:shuffle(['About 6% more','About 4 times as much','About double']),ok:'Right! 98% − 92% = 6%.'};txt='How much greater is *Q4* than *Q1*, really?';}
      else if(r===2){st.kind='pie';st.mis=true;st.ask={ans:'The 3D tilt',o:shuffle(['The 3D tilt','The colours','The labels']),ok:'Yes! The tilt makes the front slice look bigger.'};txt='Every slice is 25%. What makes one slice *look* bigger?';}
      else if(r===3){st.kind='pie';st.mis=false;st.ask={ans:'105%: too much',o:shuffle(['105%: too much','100%: fine','95%: too little']),ok:'Yes! The parts of a whole must add to 100%.'};txt='A circle graph shows *45%, 35%* and *25%*. What is the total, and is it OK?';}
      else{st.kind='bar';st.mis=false;st.ask={ans:'Who made it and how many were asked',o:shuffle(['Who made it and how many were asked','Its colours','How tall the bars are']),ok:'Yes! A source helps you judge if the data is reliable.'};txt='A graph has *no source*. What important information is missing?';}
      draw();st.setup=false;return txt;}};}
});

/* =========================================================
   23. Independent and dependent events
   ========================================================= */
P.lesson({id:'dependent7',title:'Independent and dependent events',strand:'Data',codes:['D2.1','D2.2'],
 guide:{goal:'Describe the difference between independent and dependent events, explain how their probabilities differ, and determine and compare theoretical and experimental probabilities of two events.',words:'independent, dependent, with replacement, without replacement, tree diagram, theoretical, experimental',
  ask:['Why does putting the marble back make the second draw independent?','How does P(red) change if the first red marble is kept?','Give an example of dependent events in real life.'],home:'Draw two socks from a drawer without looking, without putting the first back. Is the second draw dependent?'},
 learn:[{say:'Put it back, or keep it?',speech:'A bag has three red and two blue marbles. Draw one, put it back, and draw again: the second draw is independent, with the same chances. Keep the first one, and the bag changes: the second draw is dependent.',view:'model',demo:'draw'},
        {say:'Read the probabilities.',speech:'With replacement, P of red then red is three fifths times three fifths, nine twenty-fifths. Without replacement, it is three fifths times two fourths, six twentieths, which is three tenths.',view:'read'},
        {say:'Watch: many trials.',speech:'Run fifty pairs of draws without replacement. The experimental probability of two reds comes close to three tenths.',view:'model',demo:'trials'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: draw and compare.',speech:'Your turn. Choose with or without replacement, draw marbles, and compare the results with the theory.',view:'model'}],
 fig:'A bag of marbles: draw two, with or without replacement.',rz:.35,
 explore:['Toggle *with* or *without* replacement.','Press *Draw 2* or *50 trials*.','Compare the *experimental* result with the *theory*.'],
 howTo:'Decide if the events are independent or dependent, then choose the probability.',
 init:k=>({r:3,b:2,repl:true,drawn:[],cnt:0,rr:0,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'Events are *independent* if one does not change the chances of the other. They are *dependent* if it does.')+14;
  [['With replacement','independent','3/5 × 3/5 = 9/25 = 0.36'],['Without replacement','dependent','3/5 × 2/4 = 6/20 = 0.3']].forEach(([a,b,c],i)=>{rr(g,X0,y+i*96,TW,86,14);g.fillStyle=tint(i?'#e2457a':'#2f7de1',.12);g.fill();T(g,a,X0+20,y+i*96+34,FT.bodyB,i?'#e2457a':'#2f7de1');T(g,b,X0+TW-20,y+i*96+34,FT.smallB,GREY,'right');T(g,'P(red, red) = '+c,X0+20,y+i*96+70,FT.body);});y+=208;
  T(g,'3 red, 2 blue',X0,y+20,FT.bodyB);for(let i=0;i<5;i++){g.beginPath();g.arc(X0+220+i*40,y+14,14,0,Math.PI*2);g.fillStyle=i<3?'#e0453a':'#2f7de1';g.fill();}y+=50;
  y=para(p,y,'*Real life:* drawing names from a hat for prizes (no repeats) is dependent. Rolling two dice is independent.')+10;
  y=keyWords(p,y,[['independent events','the first result does not affect the second'],['dependent events','the first result changes the chances for the second']]);
  predict(p,y,S,'p23','A bag has 2 green and 2 yellow. You draw a green and keep it. What is P(green) on the second draw?','*1/3.* One green is left out of 3 marbles.');},
 readout(p,S,y){const g=p.g,st=S.st,n=st.r+st.b;const th=st.repl?(st.r/n)*(st.r/n):(st.r/n)*((st.r-1)/(n-1));T(g,(st.repl?'With':'Without')+' replacement: P(red, red) = '+(+th.toFixed(3)),X0,y+42,FT.bodyB,acc());
  T(g,st.cnt?'Experimental: '+st.rr+' of '+st.cnt+' = '+(+(st.rr/st.cnt).toFixed(3)):'No trials yet.',X0,y+82,FT.body);return y+92;},
 build(S,grp,mode,game){const st=S.st;const bowl=mk(new THREE.SphereGeometry(.9,32,16,0,Math.PI*2,Math.PI/2,Math.PI/2),new THREE.MeshLambertMaterial({color:'#cfe8ff',transparent:true,opacity:.45,side:THREE.DoubleSide}),0);bowl.position.set(-1.0,.9,-2.0);grp.add(bowl);
  const mar=new THREE.Group(),out=new THREE.Group();grp.add(mar,out);const MB=c=>mk(G('mb7'+c,()=>new THREE.SphereGeometry(.15,16,12)),lam(c==='r'?'#e0453a':'#2f7de1'),0);
  function draw(){clearGroup(mar);clearGroup(out);const bag=[];for(let i=0;i<st.r;i++)bag.push('r');for(let i=0;i<st.b;i++)bag.push('b');st.drawn.forEach(c=>{if(!st.repl)bag.splice(bag.indexOf(c),1);});
    bag.forEach((c,i)=>{const m=MB(c);const a=i*2.4,r=.2+(i%3)*.17;m.position.set(-1.0+Math.cos(a)*r,.2+Math.floor(i/6)*.2,-2.0+Math.sin(a)*r);mar.add(m);});
    st.drawn.forEach((c,i)=>{const m=MB(c);m.position.set(.8+i*.5,.2,-1.6);out.add(m);const l=label(i?'2nd':'1st',{size:.15,color:GREY});l.position.set(.8+i*.5,.5,-1.6);out.add(l);});
    const tr=label(st.repl?'with replacement (independent)':'without replacement (dependent)',{size:.2,bg:'#ffffff',border:st.repl?'#2f7de1':'#e2457a'});tr.position.set(.5,1.4,-2.4);out.add(tr);A.redraw();}
  function pair(){const bag=[];for(let i=0;i<st.r;i++)bag.push('r');for(let i=0;i<st.b;i++)bag.push('b');const a=bag.splice(rnd(0,bag.length-1),1)[0];if(st.repl)bag.push(a);const b=bag[rnd(0,bag.length-1)];return [a,b];}
  function draw2(){const [a,b]=pair();st.drawn=[a];draw();A.pop();A.later(()=>{st.drawn=[a,b];st.cnt++;if(a==='r'&&b==='r')st.rr++;A.pop();draw();A.say(a==='r'&&b==='r'?'Red, red!':'Not two reds');},700);}
  function many(n){for(let i=0;i<n;i++){const [a,b]=pair();st.cnt++;if(a==='r'&&b==='r')st.rr++;}st.drawn=[];A.pop();draw();}
  draw();
  return {info:()=>st.repl?'with replacement':'without replacement',
    controls:()=>{const c=[{t:'With replacement',on:st.repl,fn:()=>{st.repl=true;st.drawn=[];st.cnt=0;st.rr=0;draw();}},{t:'Without',on:!st.repl,fn:()=>{st.repl=false;st.drawn=[];st.cnt=0;st.rr=0;draw();}},{t:'Draw 2',go:true,fn:draw2},{t:'50 trials',fn:()=>many(50)}];
      if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);return c;},
    demo(n){st.ask=null;st.drawn=[];st.cnt=0;st.rr=0;if(n==='draw'){st.repl=true;draw();A.seq([[700,draw2],[1800,()=>{st.repl=false;st.drawn=[];draw();}],[700,draw2]]);}if(n==='trials'){st.repl=false;draw();A.seq([[700,()=>many(50)],[900,()=>A.say('Close to 0.3')]]);}},
    task(r){st.setup=true;st.drawn=[];st.cnt=0;st.rr=0;let txt;st.r=3;st.b=2;
      if(r===0){st.repl=false;st.ask={ans:'Dependent',o:['Independent','Dependent'],ok:'Yes! Keeping the first marble changes the bag.'};txt='You draw a marble and *keep* it, then draw again. Are the draws independent or dependent?';}
      else if(r===1){st.repl=true;st.ask={ans:'9/25',o:shuffle(['9/25','6/20','3/5']),ok:'Yes! 3/5 × 3/5 = 9/25.'};txt='*With replacement*, what is *P(red, then red)*?';}
      else if(r===2){st.repl=false;st.ask={ans:'3/10',o:shuffle(['3/10','9/25','2/5']),ok:'Yes! 3/5 × 2/4 = 6/20 = 3/10.'};txt='*Without replacement*, what is *P(red, then red)*?';}
      else if(r===3){st.repl=false;st.r=2;st.b=2;st.ask={ans:'1/3',o:shuffle(['1/3','1/2','2/3']),ok:'Yes! 1 red left out of 3 marbles.'};txt='2 red and 2 blue. You draw a *red* and keep it. What is *P(red)* on the next draw?';}
      else{st.repl=true;st.ask={ans:'Rolling two dice',o:shuffle(['Rolling two dice','Dealing two cards from one deck','Picking two names from a hat']),ok:'Yes! One die does not change the other.'};txt='Which pair of events is *independent*?';}
      draw();st.setup=false;return txt;}};}
});
})();
