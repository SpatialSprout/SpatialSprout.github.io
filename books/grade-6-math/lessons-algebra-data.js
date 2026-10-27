/* The Interactive Classroom: Grade 6 Math — Algebra (15–19) and Data (20–23) */
(function(){
"use strict";
const P=window.PM;if(!P||P.failed||!P.THREE)return;
const {THREE,V,W,D,PY,PX,X0,TW,INK,RED,BLUE,GREY,VIBE,FT,ZS,G,M,lam,mk,unitBox,cellMat,label,starGeo,wedgeGeo,clearGroup,disposeObj,rr,T,wrap,para,header,keyWords,predict,box,caption,cxOf,cyOf,tint,moveTo,hop,tween,burst,easeOut,easeIO,A}=P;
const acc=()=>P.ACC;
const rnd=(a,b)=>a+Math.floor(Math.random()*(b-a+1)),pick=a=>a[Math.floor(Math.random()*a.length)],shuffle=a=>a.slice().sort(()=>Math.random()-.5);
const gcd=(a,b)=>b?gcd(b,a%b):a;
function choices(game,list,ans,ok,lab){return list.map(o=>({t:lab?lab(o):String(o),big:true,fn:()=>{if(o===ans){if(game)game.solved(ok);else A.good(ok);}else A.bad('Not quite. Try again!');}}));}
function opts(ans,spread,min){const s=new Set([ans]);let k=0;while(s.size<3&&k<60){k++;const v=Math.round((ans+pick(spread))*100)/100;if(v>=(min==null?0:min))s.add(v);}return shuffle([...s]);}
const ex=(k,c)=>(k===1?'':k)+'n'+(c?(c>0?' + '+c:' − '+(-c)):'');

/* =========================================================
   15. Linear patterns and pattern rules
   ========================================================= */
P.lesson({id:'patterns6',title:'Linear growing patterns',strand:'Algebra',codes:['C1.1','C1.2','C1.3','C1.4'],
 guide:{goal:'Identify linear and non-linear growing patterns, represent them with tables, graphs and algebraic expressions, use the rule to predict any term, and create patterns with whole numbers and decimals.',words:'linear, term number, expression, pattern rule, table of values, graph, constant difference',
  ask:['How can you tell from a table that a pattern is linear?','What is the 20th term of 3n + 2? How do you know without building it?','Why is 1, 4, 9, 16 not linear?'],home:'Make a pattern with toothpicks: 1 square uses 4, 2 squares in a row use 7, 3 use 10. Write the rule as an expression.'},
 learn:[{say:'Same change every time: linear.',speech:'Malik’s pattern starts at five and grows by three each time. The difference is always three, so the points on the graph form a straight line. It is linear. Its rule is three n plus two.',view:'model',demo:'linear'},
        {say:'Read about expressions for patterns.',speech:'The term number is n. If each term grows by three, the expression starts with three n. Then adjust: term one is five, and three times one is three, so add two. The rule is three n plus two.',view:'read'},
        {say:'Watch: a pattern that is not linear.',speech:'Now the towers are square numbers: one, four, nine, sixteen. The differences grow: three, five, seven. The graph curves, so this pattern is not linear.',view:'model',demo:'square'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: change the rule.',speech:'Your turn. Change the multiplier and the constant, and watch the towers, the table and the graph.',view:'model'}],
 fig:'Towers for terms 1 to 6, with the graph of the pattern.',rz:.3,
 explore:['Change the *multiplier* (× n) and the *constant* (+ c).','Switch to *squares* to see a non-linear pattern.','Read the *expression* and the table.'],
 howTo:'Find the rule, then build the missing term or choose the expression.',
 init:k=>({k:3,c:2,sq:false,sc:1,miss:-1,user:0,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'A pattern is *linear* if it changes by the *same amount* every time. Its graph is a straight line, and its rule can be written as an *expression*.')+16;
  const tx=X0;rr(g,tx,y,TW,108,14);g.fillStyle=tint(acc(),.1);g.fill();T(g,'n',tx+20,y+40,FT.smallB);T(g,'3n + 2',tx+20,y+88,FT.smallB);
  [5,8,11,14,17].forEach((v,i)=>{T(g,String(i+1),tx+200+i*110,y+40,ZS(30),INK,'center');T(g,String(v),tx+200+i*110,y+88,ZS(30),'#7c3aed','center');if(i)T(g,'+3',tx+145+i*110,y+120,FT.hand,BLUE,'center');});y+=150;
  const ox=X0+40,oy=y+190,s=10;g.strokeStyle=INK;g.lineWidth=3;g.beginPath();g.moveTo(ox,y);g.lineTo(ox,oy);g.lineTo(ox+340,oy);g.stroke();
  for(let n=1;n<=5;n++){const a=3*n+2,b=n*n;g.beginPath();g.arc(ox+n*60,oy-a*s,8,0,Math.PI*2);g.fillStyle='#7c3aed';g.fill();g.beginPath();g.arc(ox+n*60,oy-b*s*.7,7,0,Math.PI*2);g.fillStyle='#f08a24';g.fill();}
  g.strokeStyle='#7c3aed';g.beginPath();g.moveTo(ox+60,oy-5*s);g.lineTo(ox+300,oy-17*s);g.stroke();T(g,'linear: 3n + 2',X0+420,y+60,FT.bodyB,'#7c3aed');T(g,'not linear: n × n',X0+420,y+110,FT.bodyB,'#f08a24');y+=220;
  y=para(p,y,'Use the rule to predict: term 20 of 3n + 2 is 3 × 20 + 2 = *62*. Decimal patterns work too: 0.5, 0.8, 1.1 has the rule *0.3n + 0.2*.')+10;
  y=keyWords(p,y,[['linear pattern','a pattern with a constant difference; its graph is a straight line'],['expression','a rule like 3n + 2, where n is the term number']]);
  predict(p,y,S,'p15','What is the 10th term of 4n − 1?','*39.* 4 × 10 − 1 = 39.');},
 readout(p,S,y){const g=p.g,st=S.st,f=v=>st.sc===1?String(v):(v*st.sc).toFixed(1);T(g,'n',X0,y+36,FT.smallB);T(g,'term',X0,y+80,FT.smallB);
  for(let n=1;n<=6;n++){const v=val(st,n-1);const hide=n-1===st.miss;T(g,String(n),X0+120+(n-1)*110,y+36,ZS(30),INK,'center');T(g,hide?(st.user?f(st.user):'?'):f(v),X0+120+(n-1)*110,y+80,ZS(30),hide?'#e4572e':'#7c3aed','center');}
  T(g,st.sq?'Rule: n × n (not linear)':'Rule: '+(st.sc===1?ex(st.k,st.c):ex(st.k/10,st.c/10).replace(/(\d)\.(\d)/g,'$1.$2'))+'  (linear)',X0,y+122,FT.bodyB,acc());return y+130;},
 build(S,grp,mode,game){const st=S.st,u=.075,Z=-1.6,xs=n=>-1.9+n*.76;const towers=new THREE.Group(),line=new THREE.Group();grp.add(towers,line);
  const base=mk(new THREE.BoxGeometry(4.5,.03,1.1),[lam('#efe9ff'),lam('#efe9ff'),cellMat('#f7f3ff',18,4),lam('#efe9ff'),lam('#efe9ff'),lam('#efe9ff')],20);base.position.set(0,.015,Z);grp.add(base);
  const exL=label('',{size:.32,bg:'#ffffff',border:'#7c3aed'});exL.position.set(0,2.55,Z-.7);grp.add(exL);const f=v=>st.sc===1?String(v):(v*st.sc).toFixed(1);
  function draw(){clearGroup(towers);clearGroup(line);const tops=[];
    for(let n=0;n<6;n++){const isM=n===st.miss;const h=isM?st.user:val(st,n);const g=new THREE.Group();g.position.set(xs(n),0,Z);towers.add(g);
      const col=isM?'#ffd24a':VIBE[n%6];const H=Math.max(.01,h*u);const m=mk(new THREE.BoxGeometry(.32,H,.32),[lam(col),lam(col),lam(col),lam(col),cellMat(col,1,Math.max(1,h)),cellMat(col,1,Math.max(1,h))],20);m.position.y=H/2+.03;g.add(m);
      if(isM){A.drag(g,{tap:()=>setU(st.user+1)});const q=label(st.user?f(st.user):'?',{size:.24,bg:'#ffffff',border:'#e4572e'});q.position.y=H+.35;g.add(q);}
      else{const l=label(f(h),{size:.2});l.position.y=H+.22;g.add(l);tops.push(V(xs(n),H+.06,Z+.3));}
      const tn=label('n = '+(n+1),{size:.14,color:GREY});tn.position.set(0,.2,.6);g.add(tn);}
    for(let i=0;i<tops.length-1;i++){const a=tops[i],b=tops[i+1];const s=new THREE.Mesh(new THREE.CylinderGeometry(.02,.02,a.distanceTo(b),6),lam(st.sq?'#f08a24':'#7c3aed'));s.position.copy(a).add(b).multiplyScalar(.5);s.quaternion.setFromUnitVectors(V(0,1,0),b.clone().sub(a).normalize());line.add(s);}
    exL.userData.set(st.sq?'n × n':(st.sc===1?ex(st.k,st.c):(st.k/10)+'n + '+(st.c/10)));A.redraw();}
  function setU(n){n=Math.max(0,Math.min(40,n));if(n===st.user)return;st.user=n;A.pop();draw();if(mode==='play'&&!st.setup&&st.miss>=0&&n===val(st,st.miss))game.solved('Yes! Term '+(st.miss+1)+' is '+f(n)+'.');}
  function setR(k,c){if(k<1||k>5||c<-2||c>6||val({k,c,sq:false},5)>32)return;st.k=k;st.c=c;st.sq=false;draw();}
  draw();
  return {info:()=>st.sq?'n × n':ex(st.k,st.c),
    controls:()=>{if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok);
      if(mode==='play')return [{t:'− 1',fn:()=>setU(st.user-1)},{t:'+ 1',go:true,big:true,fn:()=>setU(st.user+1)},{t:'+ 5',fn:()=>setU(st.user+5)}];
      return [{t:'× n −',fn:()=>setR(st.k-1,st.c)},{t:'× n +',fn:()=>setR(st.k+1,st.c)},{t:'constant −',fn:()=>setR(st.k,st.c-1)},{t:'constant +',fn:()=>setR(st.k,st.c+1)},{t:'Squares',on:st.sq,fn:()=>{st.sq=!st.sq;draw();}},{t:st.sc===1?'Decimals':'Whole numbers',fn:()=>{st.sc=st.sc===1?.1:1;draw();}}];},
    demo(n){st.miss=-1;st.ask=null;st.sc=1;if(n==='linear'){st.sq=false;st.k=3;st.c=2;}else st.sq=true;draw();A.say(n==='linear'?'5, 8, 11, 14, 17, 20: +3 each time':'1, 4, 9, 16, 25, 36: the jumps grow');},
    task(r){st.setup=true;st.ask=null;st.user=0;st.sq=false;st.sc=1;st.miss=-1;let txt;
      if(r===0){st.k=rnd(2,4);st.c=rnd(0,4);st.miss=5;txt='Build the missing *term 6*. Find the rule!';}
      else if(r===1){st.k=rnd(2,4);st.c=rnd(-1,4);const a=ex(st.k,st.c);st.ask={ans:a,o:shuffle([a,ex(st.k+1,st.c-1-(st.c-1===st.c?1:0)),(st.k+st.c)+'n']).filter((x,i,arr)=>arr.indexOf(x)===i),ok:'Yes! Each term grows by '+st.k+', and term 1 is '+(st.k+st.c)+'.'};txt='Which *expression* gives this pattern?';}
      else if(r===2){st.k=rnd(2,5);st.c=rnd(1,5);const v=20*st.k+st.c;st.ask={ans:v,o:opts(v,[st.k,-st.k,10]),ok:'Yes! '+st.k+' × 20 + '+st.c+' = '+v+'.'};txt='The rule is *'+ex(st.k,st.c)+'*. What is *term 20*?';}
      else if(r===3){st.sq=Math.random()<.5;st.k=3;st.c=1;const ans=st.sq?'Not linear':'Linear';st.ask={ans,o:['Linear','Not linear'],ok:st.sq?'Right! The differences grow, so the graph curves.':'Right! The difference is always 3.'};txt='Is this pattern *linear*? Look at the graph and the differences.';}
      else{st.sc=.1;st.k=3;st.c=rnd(1,4);st.miss=5;txt='Each step adds *0.3*. Build the missing *term 6*.';}
      draw();st.setup=false;return txt;}};}
});
function val(st,n){return st.sq?(n+1)*(n+1):st.k*(n+1)+st.c;}

/* =========================================================
   16. Adding monomials and evaluating expressions
   ========================================================= */
P.lesson({id:'monomials6',title:'Like terms and evaluating expressions',strand:'Algebra',codes:['C2.1','C2.2'],
 guide:{goal:'Add monomials with a degree of 1 using algebra tiles, and evaluate algebraic expressions with whole numbers and decimal tenths.',words:'monomial, like terms, coefficient, variable, algebra tile, evaluate, substitute',
  ask:['Why can 2x and 3x be added, but not 2x and 3?','What is 4x when x = 2.5?','How do algebra tiles show 3x + 2?'],home:'Use long pasta for x and beads for 1. Show 2x + 3 and 4x + 1, then combine them.'},
 learn:[{say:'Long tiles are x, small tiles are 1.',speech:'An x tile stands for the variable x. A small square stands for one. Yuna has two x plus three, plus three x plus one. Watch the like terms slide together: five x plus four.',view:'model',demo:'combine'},
        {say:'Read about like terms.',speech:'Like terms have the same variable. To add them, add the coefficients: two x plus three x is five x. Constants combine with constants.',view:'read'},
        {say:'Watch: evaluate with a decimal.',speech:'Evaluate five x plus four when x is two point five. Each x tile stretches to two point five. Five times two point five is twelve point five, plus four is sixteen point five.',view:'model',demo:'eval'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: build and combine.',speech:'Your turn. Add tiles to each mat, combine them, and set a value for x.',view:'model'}],
 fig:'Algebra tiles on two mats, combined into one expression.',rz:.3,
 explore:['Add *x tiles* and *1 tiles* to mat A or mat B.','Press *Combine* to collect like terms.','Change *x* to evaluate the result.'],
 howTo:'Build the expressions with tiles, combine like terms, then evaluate or choose the answer.',
 init:k=>({a:[2,3],b:[3,1],x:10,comb:false,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'A *monomial* like *3x* is a number times a variable. *Like terms* have the same variable, so they can be added.')+16;
  const xt=(x,yy)=>{rr(g,x,yy,26,110,6);g.fillStyle='#16a36f';g.fill();},ut=(x,yy)=>{rr(g,x,yy,26,26,5);g.fillStyle='#f2a400';g.fill();};
  xt(X0,y);xt(X0+34,y);ut(X0+80,y);ut(X0+80,y+34);ut(X0+80,y+68);T(g,'2x + 3',X0+20,y+150,FT.bodyB,INK);T(g,'+',X0+150,y+60,ZS(40));
  [0,1,2].forEach(i=>xt(X0+190+i*34,y));ut(X0+300,y);T(g,'3x + 1',X0+200,y+150,FT.bodyB,INK);T(g,'=',X0+360,y+60,ZS(40));
  [0,1,2,3,4].forEach(i=>xt(X0+400+i*34,y));[0,1,2,3].forEach(i=>ut(X0+580+(i%2)*34,y+Math.floor(i/2)*34));T(g,'5x + 4',X0+450,y+150,FT.bodyB,acc());y+=190;
  rr(g,X0,y,TW,96,14);g.fillStyle=tint(acc(),.1);g.fill();T(g,'Evaluate 5x + 4 when x = 2.5',X0+20,y+38,FT.smallB);T(g,'5 × 2.5 + 4 = 12.5 + 4 = 16.5',X0+20,y+80,ZS(32),acc());y+=122;
  y=para(p,y,'*2x + 3* cannot be simplified: 2x and 3 are *not* like terms.')+10;
  y=keyWords(p,y,[['like terms','terms with the same variable, like 2x and 5x'],['evaluate','find the value by substituting a number for the variable']]);
  predict(p,y,S,'p16','Simplify 4x + 2 + x + 5.','*5x + 7.* 4x + x = 5x and 2 + 5 = 7.');},
 readout(p,S,y){const g=p.g,st=S.st,X=st.x/10,s=[st.a[0]+st.b[0],st.a[1]+st.b[1]];T(g,'('+ex2(st.a)+') + ('+ex2(st.b)+')'+(st.comb?' = '+ex2(s):''),X0,y+46,ZS(36),acc());
  if(st.comb)T(g,'x = '+X+':  '+s[0]+' × '+X+' + '+s[1]+' = '+(Math.round((s[0]*X+s[1])*10)/10),X0,y+90,FT.bodyB);return y+100;},
 build(S,grp,mode,game){const st=S.st;const gA=new THREE.Group(),gB=new THREE.Group(),gR=new THREE.Group();grp.add(gA,gB,gR);const xl=()=>.18*st.x/10+.05;
  [['A',-2.75],['B',-1.85],['sum',-.8]].forEach(([t,z])=>{const m=mk(new THREE.BoxGeometry(4.3,.02,.75),lam(t==='sum'?'#e7f7ee':'#eef2f8'),20);m.position.set(0,.01,z);grp.add(m);const l=label(t==='sum'?'sum':'mat '+t,{size:.17,color:GREY});l.position.set(-1.95,.25,z-.25);grp.add(l);});
  const xL=label('',{size:.26,bg:'#ffffff'});xL.position.set(1.5,1.2,-.8);grp.add(xL);
  function tiles(g,e,z,glow){clearGroup(g);let x=-1.55;for(let i=0;i<e[0];i++){const w=.13,L=Math.max(.15,xl());const t=mk(new THREE.BoxGeometry(w,.08,L),lam('#16a36f'),20);t.position.set(x,.05,z);g.add(t);const l=label('x',{size:.13,color:'#fff'});l.position.set(x,.15,z);g.add(l);x+=.17;}
    x+=.12;for(let i=0;i<e[1];i++){const t=mk(G('ut6',()=>new THREE.BoxGeometry(.13,.08,.13)),lam('#f2a400'),20);t.position.set(x+(i%5)*.16,.05,z-.15+Math.floor(i/5)*.17);g.add(t);}
    const lab=label(ex2(e),{size:.22,color:INK});lab.position.set(1.6,.3,z);g.add(lab);}
  function draw(){tiles(gA,st.a,-2.75);tiles(gB,st.b,-1.85);if(st.comb)tiles(gR,[st.a[0]+st.b[0],st.a[1]+st.b[1]],-.8);else clearGroup(gR);xL.userData.set('x = '+st.x/10);xL.visible=st.comb;A.redraw();}
  function addT(m,k,d){if(st.comb){st.comb=false;}const e=st[m];const v=e[k]+d;if(v<0||v>(k?9:6))return;e[k]=v;A.pop();draw();}
  function combine(){if(st.comb)return;st.comb=true;draw();const kids=gR.children.slice();kids.forEach((c,i)=>{const p=c.position.clone();c.position.z-=1.0;c.position.y+=.4;moveTo(c,{pos:p,k:6+i*.15});});A.say(ex2(st.a)+' + '+ex2(st.b)+' = '+ex2([st.a[0]+st.b[0],st.a[1]+st.b[1]]));
    if(mode==='play'&&!st.setup&&st.ask&&st.ask.after)A.say('Now set x and choose.');}
  function setX(x){x=Math.max(1,Math.min(50,x));if(x===st.x)return;st.x=x;A.pop();draw();}
  draw();
  return {info:()=>ex2(st.a)+' + '+ex2(st.b),
    controls:()=>{const c=[];if(mode==='play'&&st.ask&&st.ask.ready(st))return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok);
      if(!st.comb||mode==='learn')c.push({t:'A: +x',fn:()=>addT('a',0,1)},{t:'A: +1',fn:()=>addT('a',1,1)},{t:'B: +x',fn:()=>addT('b',0,1)},{t:'B: +1',fn:()=>addT('b',1,1)},{t:'A: −x',fn:()=>addT('a',0,-1)},{t:'B: −x',fn:()=>addT('b',0,-1)});
      c.push({t:'Combine',go:true,big:true,fn:combine,dis:st.comb});if(st.comb)c.push({t:'x − 0.5',fn:()=>setX(st.x-5)},{t:'x − 0.1',fn:()=>setX(st.x-1)},{t:'x + 0.1',fn:()=>setX(st.x+1)},{t:'x + 0.5',fn:()=>setX(st.x+5)});return c;},
    demo(n){st.ask=null;if(n==='combine'){st.a=[2,3];st.b=[3,1];st.comb=false;st.x=10;draw();A.seq([[1000,combine]]);}if(n==='eval'){st.a=[2,3];st.b=[3,1];st.comb=true;st.x=10;draw();const l=[];for(let x=12;x<=25;x+=3)l.push([350,()=>setX(Math.min(25,x))]);l.push([300,()=>setX(25)],[800,()=>A.say('5 × 2.5 + 4 = 16.5')]);A.seq(l);}},
    task(r){st.setup=true;st.comb=false;st.x=10;let txt;
      if(r===0){st.a=[rnd(1,3),rnd(1,4)];st.b=[rnd(1,3),rnd(1,4)];const s=[st.a[0]+st.b[0],st.a[1]+st.b[1]];const a=ex2(s);st.ask={ready:s2=>s2.comb,ans:a,o:shuffle([a,(s[0]+s[1])+'x',ex2([s[0],s[1]+1])]),ok:'Yes! '+a+'.'};txt='Combine *'+ex2(st.a)+'* and *'+ex2(st.b)+'*. Press Combine, then choose.';}
      else if(r===1){st.a=[0,0];st.b=[0,0];const tA=[rnd(2,4),rnd(1,5)],tB=[rnd(1,3),rnd(1,4)];st.ask={ready:s2=>s2.comb&&s2.a.join()===tA.join()&&s2.b.join()===tB.join(),ans:ex2([tA[0]+tB[0],tA[1]+tB[1]]),o:shuffle([ex2([tA[0]+tB[0],tA[1]+tB[1]]),ex2([tA[0]+tB[1],tA[1]+tB[0]]),(tA[0]+tA[1]+tB[0]+tB[1])+'x'])
        ,ok:'Yes! Like terms combine.'};txt='Build *'+ex2(tA)+'* on mat A and *'+ex2(tB)+'* on mat B, then combine.';}
      else if(r===2){st.a=[rnd(2,4),rnd(1,5)];st.b=[0,0];const X=rnd(2,9);const v=st.a[0]*X+st.a[1];st.ask={ready:s2=>s2.comb&&s2.x===X*10,ans:v,o:opts(v,[1,-1,st.a[0],X],1),ok:'Yes! '+st.a[0]+' × '+X+' + '+st.a[1]+' = '+v+'.'};txt='Evaluate *'+ex2(st.a)+'* when *x = '+X+'*. Combine, set x, then choose.';}
      else if(r===3){st.a=[rnd(2,4),rnd(1,4)];st.b=[1,0];const X=pick([15,25,35]);const s=st.a[0]+1;const v=Math.round((s*X/10+st.a[1])*10)/10;st.ask={ready:s2=>s2.comb&&s2.x===X,ans:v,o:opts(v,[.5,-.5,1,s]),ok:'Yes! '+s+' × '+X/10+' + '+st.a[1]+' = '+v+'.'};txt='Combine, then evaluate when *x = '+X/10+'*.';}
      else{st.a=[3,2];st.b=[2,0];st.ask={ready:s2=>s2.comb,ans:'5x + 2',o:shuffle(['5x + 2','7x','5x + 2x']),ok:'Yes! 3x + 2x = 5x; the 2 stays.'};txt='Simplify *(3x + 2) + 2x*. Press Combine.';}
      draw();st.setup=false;return txt;}};}
});
function ex2(e){const [k,c]=e;if(!k&&!c)return '0';return (k?(k===1?'':k)+'x':'')+(c?(k?' + ':'')+c:'');}

/* =========================================================
   17. Equations with multiple terms
   ========================================================= */
P.lesson({id:'equations6',title:'Equations with several terms',strand:'Algebra',codes:['C2.3'],
 guide:{goal:'Solve equations that involve multiple terms and whole numbers by combining like terms and using a balance model, and verify the solutions.',words:'equation, like terms, combine, balance, solve, verify',
  ask:['How does 2n + 3n + 5 = 40 become 5n + 5 = 40?','What do you do to both sides to keep the balance?','How do you check that n = 7 is correct?'],home:'Make a balance puzzle with a ruler on a pencil and coins: 2 bags + 3 bags + 5 coins balance 40 coins.'},
 learn:[{say:'Combine like terms first.',speech:'On Ezra’s balance, two n plus three n plus five equals forty. Combine like terms: five n plus five equals forty. Watch the balance as n changes. When n is seven, it is level.',view:'model',demo:'solve'},
        {say:'Read the steps.',speech:'Combine like terms. Undo the addition by subtracting five from both sides: five n equals thirty-five. Undo the multiplication: n equals seven. Verify: fourteen plus twenty-one plus five is forty.',view:'read'},
        {say:'Watch: terms on both sides.',speech:'Four n plus six equals two n plus twenty. Take two n from both sides: two n plus six equals twenty. So n is seven.',view:'model',demo:'both'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: balance the scale.',speech:'Your turn. Change n until the scale is level.',view:'model'}],
 fig:'A pan balance with bags of n on both sides.',rz:.15,
 explore:['Change *n* with the buttons.','Each bag holds *n* cubes.','Level = both sides equal.'],
 howTo:'Change n until the scale balances. That value of n is the solution.',
 init:k=>({L:[2,3],Lc:5,R:0,Rc:40,n:0,txt:'2n + 3n + 5 = 40'}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'Equations can have *several terms*. First *combine like terms*, then use *inverse operations* on both sides.')+16;
  [['2n + 3n + 5 = 40','combine like terms'],['5n + 5 = 40','subtract 5 from both sides'],['5n = 35','divide both sides by 5'],['n = 7','verify: 14 + 21 + 5 = 40 ✓']].forEach(([a,b],i)=>{rr(g,X0,y+i*62,TW,54,12);g.fillStyle=tint(acc(),.06+i*.03);g.fill();T(g,a,X0+20,y+i*62+38,ZS(34),acc());T(g,b,X0+TW-20,y+i*62+36,FT.body,GREY,'right');});y+=270;
  y=para(p,y,'*Variables on both sides:* 4n + 6 = 2n + 20. Remove 2n from both sides: 2n + 6 = 20, so *n = 7*.')+10;
  y=keyWords(p,y,[['like terms','terms with the same variable'],['verify','substitute to check that both sides are equal']]);
  predict(p,y,S,'p17','Solve 3n + n + 4 = 28.','*n = 6.* 4n + 4 = 28, so 4n = 24.');},
 readout(p,S,y){const g=p.g,st=S.st,Lv=(st.L[0]+st.L[1])*st.n+st.Lc,Rv=st.R*st.n+st.Rc;T(g,st.txt,X0,y+48,ZS(44),acc());
  T(g,'n = '+st.n+':  left '+Lv+',  right '+Rv+(Lv===Rv?'  ✓ balanced':''),X0,y+90,FT.bodyB,Lv===Rv?'#16a36f':INK);return y+100;},
 build(S,grp,mode,game){const st=S.st,PV=V(0,1.62,-1.45),ARM=1.5;let ang=0,tAng=0;
  const foot=mk(new THREE.BoxGeometry(1.2,.08,.7),lam('#7c3aed'),20);foot.position.set(0,.04,PV.z);grp.add(foot);const post=mk(new THREE.BoxGeometry(.13,PV.y,.13),lam('#c9b8f2'),20);post.position.set(0,PV.y/2,PV.z);grp.add(post);
  const beam=new THREE.Group();beam.position.copy(PV);grp.add(beam);beam.add(mk(new THREE.BoxGeometry(3.2,.09,.14),lam('#7c3aed'),20));
  const pans=[-1,1].map(()=>{const g=new THREE.Group();g.add(mk(new THREE.CylinderGeometry(.72,.64,.06,32),lam('#ffd24a'),30));const rod=new THREE.Mesh(new THREE.CylinderGeometry(.015,.015,.7,6),lam(INK));rod.position.y=.38;g.add(rod);const cg=new THREE.Group();g.add(cg);g.userData.cg=cg;grp.add(g);return g;});
  const u=.07;function blocks(cg,v,x0,col){const tens=Math.floor(v/10),ones=v%10;let x=x0;for(let i=0;i<tens;i++){const r=unitBox(1,10,1,col,u);r.position.set(x,.03+5*u,(i%2)*.09-.05);cg.add(r);x+=u*.75;}x+=.04;for(let i=0;i<ones;i++){const c=unitBox(1,1,1,col,u);c.position.set(x+Math.floor(i/5)*(u+.01),.03+u/2+(i%5)*u,0);cg.add(c);}}
  function bags(cg,n,col,x0,z){for(let b=0;b<n;b++){const bag=new THREE.Group();const sk=mk(G('b6'+col,()=>new THREE.CylinderGeometry(.1,.13,.3,14)),lam(col),0);sk.position.y=.18;bag.add(sk);const t=label('n',{size:.15,color:'#fff'});t.position.set(0,.2,.14);bag.add(t);bag.position.set(x0+b*.24,0,z);cg.add(bag);A.drag(bag,{tap:()=>setN(st.n+1)});}}
  const nL=label('',{size:.24,bg:'#ffffff',border:'#7c3aed'});grp.add(nL);
  function fill(){const L=pans[0].userData.cg,R=pans[1].userData.cg;clearGroup(L);clearGroup(R);bags(L,st.L[0],'#8b5cf6',-.55,-.3);bags(L,st.L[1],'#e4572e',-.55+st.L[0]*.24,-.3);if(st.Lc)blocks(L,st.Lc,-.55,'#16a36f');
    if(st.R)bags(R,st.R,'#8b5cf6',-.45,-.3);blocks(R,st.Rc,-.55,'#2f7de1');const Lv=(st.L[0]+st.L[1])*st.n+st.Lc,Rv=st.R*st.n+st.Rc;tAng=Math.max(-.3,Math.min(.3,(Lv-Rv)*.01));}
  function place(){beam.rotation.z=ang;[-1,1].forEach((s,i)=>pans[i].position.set(PV.x+s*ARM*Math.cos(ang),PV.y+s*ARM*Math.sin(ang)-.76,PV.z));nL.userData.set('n = '+st.n);nL.position.set(0,2.35,PV.z);}
  function setN(n){n=Math.max(0,Math.min(60,n));if(n===st.n)return;st.n=n;A.pop();fill();const Lv=(st.L[0]+st.L[1])*n+st.Lc,Rv=st.R*n+st.Rc;if(Lv===Rv){A.good('Balanced! n = '+n+'.');if(mode==='play'&&!st.setup)game.solved('n = '+n+'. Check: both sides are '+Lv+'.');}A.redraw();}
  function setUp(L,Lc,R,Rc,txt){st.L=L;st.Lc=Lc;st.R=R;st.Rc=Rc;st.txt=txt;st.n=0;fill();A.redraw();}
  fill();ang=tAng;place();
  return {tick(dt){ang+=(tAng-ang)*Math.min(1,dt*4);place();},info:()=>st.txt+'  (n = '+st.n+')',
    controls:()=>[{t:'−5',fn:()=>setN(st.n-5)},{t:'−1',big:true,fn:()=>setN(st.n-1)},{t:'+1',big:true,go:true,fn:()=>setN(st.n+1)},{t:'+5',fn:()=>setN(st.n+5)}].concat(mode==='learn'?[{t:'New puzzle',fn:()=>{const a=rnd(1,3),b=rnd(1,3),n=rnd(3,9),c=rnd(2,9);setUp([a,b],c,0,(a+b)*n+c,a+'n + '+b+'n + '+c+' = '+((a+b)*n+c));}}]:[]),
    demo(n){if(n==='solve'){setUp([2,3],5,0,40,'2n + 3n + 5 = 40');A.seq([[700,()=>setN(3)],[700,()=>setN(5)],[700,()=>setN(6)],[700,()=>setN(7)]]);}
      if(n==='both'){setUp([4,0],6,2,20,'4n + 6 = 2n + 20');A.seq([[700,()=>setN(3)],[700,()=>setN(5)],[700,()=>setN(7)]]);}},
    task(r){st.setup=true;let a,b,n,c;
      if(r===0){a=rnd(1,3);b=rnd(1,3);n=rnd(3,9);c=rnd(2,9);setUp([a,b],c,0,(a+b)*n+c,a+'n + '+b+'n + '+c+' = '+((a+b)*n+c));}
      else if(r===1){a=rnd(2,4);n=rnd(4,12);setUp([a,1],0,0,(a+1)*n,a+'n + n = '+(a+1)*n);}
      else if(r===2){a=rnd(2,3);b=rnd(2,3);n=rnd(4,9);c=rnd(5,15);setUp([a,b],c,0,(a+b)*n+c,'A wall has '+a+'n + '+b+'n + '+c+' = '+((a+b)*n+c)+' bricks');st.txt=a+'n + '+b+'n + '+c+' = '+((a+b)*n+c);}
      else if(r===3){a=4;b=2;n=rnd(4,9);c=rnd(3,8);setUp([a,0],c,b,(a-b)*n+c,a+'n + '+c+' = '+b+'n + '+((a-b)*n+c));}
      else{a=5;b=2;n=rnd(3,8);c=rnd(2,6);setUp([a,0],c,b,(a-b)*n+c,a+'n + '+c+' = '+b+'n + '+((a-b)*n+c));}
      st.setup=false;return 'Solve *'+st.txt+'*. Balance the scale.';}};}
});

/* =========================================================
   18. Inequalities with two operations
   ========================================================= */
P.lesson({id:'inequal6',title:'Inequalities with two operations',strand:'Algebra',codes:['C2.4'],
 guide:{goal:'Solve inequalities that involve two operations and whole numbers up to 100, verify the solutions, and graph them on a number line.',words:'inequality, two operations, boundary, solution set, verify, graph',
  ask:['How do you find the boundary of 3x + 4 < 40?','Is the boundary itself a solution of 2x − 5 ≥ 15?','Why do the solutions of 4x + 2 > 30 continue to the right?'],home:'“Tickets cost $7 each plus a $5 fee. You have $50.” Write an inequality and find how many tickets you can buy.'},
 learn:[{say:'Solve the equation to find the boundary.',speech:'Lucia needs three x plus four to be less than forty. First solve three x plus four equals forty: three x is thirty-six, so x is twelve. Twelve is the boundary, but it is not a solution. The solutions are less than twelve. Watch the graph.',view:'model',demo:'solve'},
        {say:'Read the steps.',speech:'Step one: solve the related equation to find the boundary. Step two: test the boundary and a number on each side. Step three: graph all the whole numbers that work.',view:'read'},
        {say:'Watch: greater than.',speech:'Two x minus five is greater than fifteen. The equation two x minus five equals fifteen gives x equals ten. Ten is not a solution; eleven is. The solutions go up from eleven.',view:'model',demo:'greater'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: graph it.',speech:'Your turn. Move the boundary, choose the direction and whether the boundary is included, then check.',view:'model'}],
 fig:'A number line from 0 to 50. Green beads show the solutions.',rz:-.1,
 explore:['Move the *boundary* with the buttons.','Choose *◀ smaller* or *bigger ▶*.','Decide if the boundary is *in* or *out*, then press *Check*.'],
 howTo:'Find the boundary, set the direction and the boundary dot, then press Check.',
 init:k=>({k:3,c:4,rel:'<',b:40,bound:25,dir:'L',incl:true}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'To solve an inequality with *two operations*, solve the related equation to find the *boundary*, then test which side works.')+16;
  [['3x + 4 < 40','the inequality'],['3x + 4 = 40 → x = 12','boundary'],['test 11: 37 < 40 ✓','test 12: 40 < 40 ✗'],['solutions: 0 to 11','graph them']].forEach(([a,b],i)=>{rr(g,X0,y+i*58,TW,50,12);g.fillStyle=tint(acc(),.06+i*.03);g.fill();T(g,a,X0+20,y+i*58+34,FT.bodyB,acc());T(g,b,X0+TW-20,y+i*58+34,FT.body,GREY,'right');});y+=250;
  const lx=X0+10,lw=TW-20,toX=v=>lx+v/20*lw,yy=y+30;g.strokeStyle=INK;g.lineWidth=4;g.beginPath();g.moveTo(lx,yy);g.lineTo(lx+lw,yy);g.stroke();for(let v=0;v<=20;v++){g.lineWidth=2;g.beginPath();g.moveTo(toX(v),yy-8);g.lineTo(toX(v),yy+8);g.stroke();if(v%5===0)T(g,String(v),toX(v),yy+36,FT.small,INK,'center');if(v<12){g.beginPath();g.arc(toX(v),yy,9,0,Math.PI*2);g.fillStyle='#16a36f';g.fill();}}
  g.beginPath();g.arc(toX(12),yy,11,0,Math.PI*2);g.fillStyle='#fff';g.fill();g.lineWidth=3;g.strokeStyle=RED;g.stroke();y+=80;
  y=keyWords(p,y,[['boundary','where the inequality changes from true to false'],['open dot','shows the boundary is not a solution']]);
  predict(p,y,S,'p18','Which whole numbers solve 2x + 3 < 13?','*0, 1, 2, 3 and 4.* 2 × 5 + 3 = 13 is not less than 13.');},
 readout(p,S,y){const g=p.g,st=S.st;T(g,iq(st),X0,y+50,ZS(50),acc());const v=st.k*st.bound+st.c,ok=test(st,st.bound);T(g,'Test '+st.bound+': '+st.k+' × '+st.bound+(st.c<0?' − '+(-st.c):' + '+st.c)+' = '+v+(ok?' ✓':' ✗'),X0,y+92,FT.bodyB,ok?'#16a36f':RED);return y+100;},
 build(S,grp,mode,game){const st=S.st,Z=-1.5,L=4.3,x0=-2.15,toX=v=>x0+v/50*L;grp.add((()=>{const m=mk(new THREE.BoxGeometry(L+.2,.05,.12),lam('#cbd5e6'),0);m.position.set(0,.03,Z);return m;})());
  for(let v=0;v<=50;v++){const big=v%5===0;const t=new THREE.Mesh(G('iq6t'+big,()=>new THREE.BoxGeometry(.014,big?.2:.1,.014)),lam(INK));t.position.set(toX(v),.05+(big?.1:.05),Z);grp.add(t);if(v%10===0){const l=label(String(v),{size:.24});l.position.set(toX(v),.4,Z+.35);grp.add(l);}}
  const beads=new THREE.Group();grp.add(beads);const mkr=new THREE.Group();grp.add(mkr);const fl=mk(new THREE.ConeGeometry(.12,.3,16),lam('#ffd24a'),0);fl.rotation.x=Math.PI;fl.position.y=.55;mkr.add(fl);
  const ring=mk(new THREE.TorusGeometry(.1,.03,8,20),lam(RED),0);ring.rotation.x=Math.PI/2;ring.position.y=.12;mkr.add(ring);const bl=label('',{size:.24,bg:'#ffffff',border:'#ffd24a'});bl.position.y=.95;mkr.add(bl);
  const arrow=mk(new THREE.ConeGeometry(.12,.3,14),lam('#16a36f'),0);grp.add(arrow);const exL=label('',{size:.4,bg:'#ffffff'});exL.position.set(0,1.5,Z-.9);grp.add(exL);
  A.drag(mkr,{h:.2,drop:pos=>setB(Math.round((pos.x-x0)/L*50))});
  const shown=()=>{const s=[];for(let v=0;v<=50;v++)if(st.dir==='L'?v<st.bound||(st.incl&&v===st.bound):v>st.bound||(st.incl&&v===st.bound))s.push(v);return s;};
  const sols=()=>{const s=[];for(let v=0;v<=50;v++)if(test(st,v))s.push(v);return s;};
  function draw(){clearGroup(beads);shown().forEach(v=>{const b=mk(G('iq6b',()=>new THREE.SphereGeometry(.045,10,8)),lam('#16a36f'),0);b.position.set(toX(v),.12,Z);beads.add(b);});mkr.position.set(toX(st.bound),0,Z);ring.material=lam(st.incl?'#16a36f':RED);bl.userData.set(String(st.bound));
    arrow.rotation.z=st.dir==='L'?Math.PI/2:-Math.PI/2;arrow.position.set(st.dir==='L'?x0-.15:x0+L+.15,.12,Z);exL.userData.set(iq(st));A.redraw();}
  function setB(v){st.bound=Math.max(0,Math.min(50,v));A.pop();draw();}
  function check(){const s=sols(),m=shown();if(s.length===m.length&&s.every((v,i)=>v===m[i])){A.good('Every solution is graphed!');if(mode==='play'&&!st.setup)game.solved('Solutions: '+(s.length?s[0]+' to '+s[s.length-1]:'none')+'.');return;}
    const w=m.find(v=>!s.includes(v)),mi=s.find(v=>!m.includes(v));A.bad(w!=null?'Test '+w+': is it a solution?':'You are missing '+mi+'.');}
  function setUp(k,c,rel,b){st.k=k;st.c=c;st.rel=rel;st.b=b;st.bound=25;st.dir='L';st.incl=true;draw();}
  draw();
  return {info:()=>iq(st),
    controls:()=>[{t:'−5',fn:()=>setB(st.bound-5)},{t:'−1',fn:()=>setB(st.bound-1)},{t:'+1',fn:()=>setB(st.bound+1)},{t:'+5',fn:()=>setB(st.bound+5)},{t:'◀ smaller',on:st.dir==='L',fn:()=>{st.dir='L';draw();}},{t:'bigger ▶',on:st.dir==='R',fn:()=>{st.dir='R';draw();}},
      {t:st.incl?'Boundary: in ●':'Boundary: out ○',fn:()=>{st.incl=!st.incl;draw();}},{t:'Check',go:true,big:true,fn:check}].concat(mode==='learn'?[{t:'New',fn:()=>setUp(rnd(2,5),rnd(-6,9),pick(['<','>']),rnd(30,95))}]:[]),
    demo(n){if(n==='solve'){setUp(3,4,'<',40);A.seq([[700,()=>setB(15)],[600,()=>setB(12)],[800,()=>{st.incl=false;draw();A.say('3 × 12 + 4 = 40: not less than 40');}],[1200,check]]);}
      if(n==='greater'){setUp(2,-5,'>',15);A.seq([[700,()=>setB(10)],[700,()=>{st.dir='R';st.incl=false;draw();A.say('2 × 10 − 5 = 15: not greater');}],[1200,check]]);}},
    task(r){st.setup=true;[()=>setUp(rnd(2,4),rnd(2,9),'<',rnd(40,90)),()=>setUp(rnd(2,3),-rnd(2,9),'>',rnd(20,60)),()=>setUp(rnd(3,5),rnd(1,8),'>',rnd(30,90)),()=>setUp(rnd(2,5),-rnd(1,6),'<',rnd(25,80)),()=>setUp(7,5,'<',rnd(40,60))][r]();st.setup=false;
      return r===4?'Tickets cost *$7* each plus a *$5* fee: *7x + 5 < '+st.b+'*. Graph how many tickets x you could buy.':'Graph every whole number from 0 to 50 that solves *'+iq(st)+'*, then Check.';}};}
});
function iq(st){return st.k+'x '+(st.c<0?'− '+(-st.c):'+ '+st.c)+' '+st.rel+' '+st.b;}
function test(st,x){const v=st.k*x+st.c;return st.rel==='<'?v<st.b:v>st.b;}

/* =========================================================
   19. Efficient code with loops and conditionals
   ========================================================= */
const LV6=[{s:[0,5,0],goal:[5,0],rocks:[],best:1,hint:'Repeat { if blocked: turn right, else: forward }'},
  {s:[0,5,0],goal:[3,2],rocks:[[0,3],[2,4],[3,3],[1,2]],best:4,hint:'stairs: a repeating group of 4'},
  {s:[0,0,1],goal:[0,5],rocks:[[3,0]],best:1,hint:'follow the walls with the conditional'},
  {s:[5,5,0],goal:[0,5],rocks:[[5,1]],best:1,hint:'conditional that turns left'},
  {s:[0,5,0],goal:[2,3],rocks:[[1,4],[3,1]],best:3,hint:'fix the repeat number'}];
P.lesson({id:'coding6',title:'Efficient code with conditionals',strand:'Algebra',codes:['C3.1','C3.2'],
 guide:{goal:'Write, run, read and alter code with loops and conditional statements, describe how changes affect the outcome, and make code more efficient by using fewer blocks.',words:'efficient, loop, conditional, if… else…, debug, outcome, sensor',
  ask:['Why is Repeat 11 { if blocked: turn right, else: forward } more efficient than writing every step?','What happens if you change “turn right” to “turn left”?','How do you find a bug in code that almost works?'],home:'Write directions to walk around your home using “if there is a wall, turn right; else, walk forward”. Does it work?'},
 learn:[{say:'A conditional with a sensor.',speech:'Arjun’s robot has a sensor. The code says: if the way ahead is blocked, turn right; else, go forward. Put it in a loop and the robot follows the walls on its own. Watch: just two blocks of code.',view:'model',demo:'run'},
        {say:'Read about efficient code.',speech:'Efficient code does the job with fewer blocks. Loops repeat steps, and conditionals let the code decide what to do. Changing one block can change the whole outcome.',view:'read'},
        {say:'Watch: change one word.',speech:'Change turn right to turn left. The same loop now sends the robot a different way. Small changes in code can have big effects.',view:'model',demo:'alter'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: write efficient code.',speech:'Your turn. Build a short program with loops and conditionals to reach the star. Fewer blocks earn the efficiency badge.',view:'model'}],
 fig:'A robot with a sensor on a grid. The code repeats.',rz:.8,
 explore:['Add *↑*, *↺*, *↻* or a *conditional* block.','Set how many times the group *repeats*.','Press *Run*. Use as few blocks as you can!'],
 howTo:'Write a short repeating program to reach the star. Conditional blocks check the way ahead.',
 init:k=>({li:k==='play'?0:0,body:k==='play'?[]:[{cmd:'IR'}],rep:k==='play'?1:11,active:-1}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'A *conditional* lets code make decisions. With a *sensor*, the robot checks if the square ahead is *blocked*.')+16;
  rr(g,X0,y,480,200,16);g.fillStyle='#24203f';g.fill();const MF='700 26px "Atkinson Hyperlegible", monospace';
  T(g,'Repeat 11 times {',X0+24,y+46,MF,'#ffd86b');T(g,'if blocked ahead:',X0+60,y+86,MF,'#9fe6ff');T(g,'turn right ↻',X0+100,y+120,MF,'#ffc98f');T(g,'else: forward ↑',X0+60,y+156,MF,'#9fe6ff');T(g,'}',X0+24,y+190,MF,'#ffd86b');
  T(g,'2 blocks',X0+520,y+60,ZS(40),'#16a36f');T(g,'instead of 11',X0+520,y+100,FT.body,GREY);T(g,'= efficient!',X0+520,y+140,FT.bodyB,'#16a36f');y+=232;
  y=para(p,y,'*Debugging:* if the robot stops early, check the *repeat number*. If it goes the wrong way, check the *condition* or the *turn*.')+12;
  y=keyWords(p,y,[['efficient','does the job with fewer steps or blocks'],['conditional','code that runs only when a condition is true']]);
  predict(p,y,S,'p19','A robot runs Repeat 4 { forward, forward, turn right }. What shape is its path?','*A square* with sides of 2 squares.');},
 readout(p,S,y){const g=p.g,st=S.st,NM={F:'↑',L:'↺',R:'↻',IR:'if blocked ↻ else ↑',IL:'if blocked ↺ else ↑'};T(g,'Repeat '+st.rep+' × {',X0,y+34,FT.bodyB,acc());let x=X0+210;
  if(!st.body.length)T(g,'add blocks',x,y+34,FT.cap,GREY);st.body.forEach((b,i)=>{const lab=NM[b.cmd];g.font=FT.smallB;const w=g.measureText(lab).width+24;if(x+w>X0+TW-20){x=X0+210;y+=52;}rr(g,x,y,w,44,10);
    g.fillStyle=st.active===i?'#ffd86b':{F:'#d9f0ff',L:'#efe5ff',R:'#ffe3ee',IR:'#dcfce7',IL:'#fef3c7'}[b.cmd];g.fill();g.lineWidth=2;g.strokeStyle=INK;g.stroke();T(g,lab,x+12,y+30,FT.smallB);x+=w+8;});
  T(g,'}   blocks used: '+st.body.length,x+4,y+34,FT.bodyB,acc());return y+60;},
 build(S,grp,mode,game){const st=S.st,N=6,Tl=.56,cz=-1.35;const cw=(c,r)=>V((c-2.5)*Tl,0,(r-2.5)*Tl+cz);const tg=G('tile6',()=>new THREE.BoxGeometry(Tl-.04,.05,Tl-.04));
  for(let r=0;r<N;r++)for(let c=0;c<N;c++){const t=mk(tg,lam((r+c)%2?'#d9f99d':'#f7fee7'),20);t.position.copy(cw(c,r));t.position.y=.025;grp.add(t);}
  const lvl=new THREE.Group(),trail=new THREE.Group();grp.add(lvl,trail);
  const robot=new THREE.Group();robot.scale.setScalar(.72);const body=mk(G('r6b',()=>new THREE.BoxGeometry(.46,.36,.4)),lam('#4fb3ff'),20);body.position.y=.18;robot.add(body);
  const head=mk(G('r6h',()=>new THREE.BoxGeometry(.36,.26,.32)),lam('#d8e8ff'),20);head.position.y=.5;robot.add(head);const eg=G('r6e',()=>new THREE.BoxGeometry(.07,.07,.02));[-.08,.08].forEach(x=>{const e=new THREE.Mesh(eg,lam(INK));e.position.set(x,.52,-.165);robot.add(e);});
  const sensor=new THREE.Mesh(new THREE.ConeGeometry(.12,.3,12,1,true),new THREE.MeshLambertMaterial({color:'#facc15',transparent:true,opacity:.6,side:THREE.DoubleSide}));sensor.rotation.x=-Math.PI/2;sensor.position.set(0,.3,-.38);robot.add(sensor);
  grp.add(robot);A.drag(robot,{tap:()=>run()});let rc,rrw,dir,ang,goal,running=false,steps=[],si=0,timer=0,stepsRun=0;
  function load(){clearGroup(lvl);const L=LV6[st.li];L.rocks.forEach(([c,r],i)=>{const k=mk(G('rock6',()=>new THREE.DodecahedronGeometry(.22,0)),lam('#a8a29e'),20);k.position.copy(cw(c,r));k.position.y=.22;k.rotation.set(i,i*2,0);lvl.add(k);});
    goal=mk(starGeo,lam('#ffcf3f'),20);goal.position.copy(cw(L.goal[0],L.goal[1]));goal.position.y=.42;lvl.add(goal);reset(true);}
  function reset(q){const L=LV6[st.li];rc=L.s[0];rrw=L.s[1];dir=L.s[2];ang=-dir*Math.PI/2;const p=cw(rc,rrw);p.y=.05;robot.position.copy(p);robot.rotation.y=ang;robot.userData.tPos=null;robot.userData.tRotY=null;running=false;st.active=-1;clearGroup(trail);if(!q)A.redraw();}
  const blocked=()=>{const dc=[0,1,0,-1][dir],dr=[-1,0,1,0][dir],nc=rc+dc,nr=rrw+dr;return nc<0||nr<0||nc>=N||nr>=N||LV6[st.li].rocks.some(([c,r])=>c===nc&&r===nr);};
  const add=k=>{if(running)return;if(st.body.length>=5){A.bad('The group holds 5 blocks.');return;}st.body.push({cmd:k});A.redraw();};
  function run(){if(running)return;if(!st.body.length){A.say('Add some blocks first.');return;}reset(true);steps=[];for(let k=0;k<st.rep;k++)st.body.forEach((b,bi)=>steps.push({cmd:b.cmd,bi}));si=0;timer=.2;running=true;A.say('Running…');}
  function finish(ok,msg){running=false;st.active=-1;if(ok){const L=LV6[st.li];const eff=st.body.length<=L.best;A.good(msg+(eff?' Efficiency badge: '+st.body.length+' block'+(st.body.length>1?'s':'')+'!':' It works! Can you use fewer than '+st.body.length+' blocks?'));if(mode==='play'&&!st.setup)game.solved('Reached the star with '+st.body.length+' block'+(st.body.length>1?'s':'')+'!');}else A.bad(msg);A.redraw();}
  function step(){const L=LV6[st.li];if(rc===L.goal[0]&&rrw===L.goal[1]){finish(true,'Reached the star!');return;}if(si>=steps.length){finish(false,'The program ended before the star. Change the repeat number or a block.');return;}
    const s=steps[si++];st.active=s.bi;A.redraw();let cmd=s.cmd;if(cmd==='IR')cmd=blocked()?'R':'F';if(cmd==='IL')cmd=blocked()?'L':'F';
    if(cmd==='L'){dir=(dir+3)%4;ang+=Math.PI/2;moveTo(robot,{rotY:ang,k:12});}else if(cmd==='R'){dir=(dir+1)%4;ang-=Math.PI/2;moveTo(robot,{rotY:ang,k:12});}
    else{if(blocked()){const here=cw(rc,rrw);here.y=.05;const dc=[0,1,0,-1][dir],dr=[-1,0,1,0][dir];moveTo(robot,{pos:here.clone().add(V(dc*Tl*.3,0,dr*Tl*.3)),k:18,done:()=>moveTo(robot,{pos:here,k:14})});finish(false,'Bonk! Blocked. Debug your code.');return;}
      const dc=[0,1,0,-1][dir],dr=[-1,0,1,0][dir];const d=mk(G('tr6',()=>new THREE.CylinderGeometry(.06,.06,.02,10)),lam('#16a36f'),0);const hp=cw(rc,rrw);d.position.set(hp.x,.07,hp.z);trail.add(d);rc+=dc;rrw+=dr;const p=cw(rc,rrw);p.y=.05;moveTo(robot,{pos:p,k:10});A.pop();}
    if(rc===L.goal[0]&&rrw===L.goal[1]){timer=.3;}}
  load();
  return {tick(dt,t){if(goal)goal.rotation.y=t*1.5;sensor.material.opacity=.4+.3*Math.sin(t*6);if(running){timer-=dt;if(timer<=0){timer=.36;step();}}},info:()=>'Level '+(st.li+1)+' · blocks: '+st.body.length,
    controls:()=>[{t:'↑',fn:()=>add('F')},{t:'↺',fn:()=>add('L')},{t:'↻',fn:()=>add('R')},{t:'if blocked ↻ else ↑',fn:()=>add('IR')},{t:'if blocked ↺ else ↑',fn:()=>add('IL')},{t:'Repeat −',fn:()=>{st.rep=Math.max(1,st.rep-1);A.redraw();}},{t:'Repeat +',fn:()=>{st.rep=Math.min(15,st.rep+1);A.redraw();}},
      {t:'▶ Run',go:true,fn:run},{t:'Undo',fn:()=>{if(!running){st.body.pop();A.redraw();}}},{t:'Clear',fn:()=>{if(!running){st.body=[];st.rep=1;reset();}}}].concat(mode==='learn'?[{t:'Next level',fn:()=>{st.li=(st.li+1)%LV6.length;st.body=[];st.rep=1;load();A.redraw();}}]:[]),
    demo(n){if(n==='run'){st.li=0;st.body=[{cmd:'IR'}];st.rep=11;load();A.redraw();A.seq([[900,run]]);}if(n==='alter'){st.li=3;st.body=[{cmd:'IL'}];st.rep=13;load();A.redraw();A.seq([[900,run]]);}},
    task(r){st.setup=true;st.li=r;st.body=[];st.rep=1;if(r===4){st.body=[{cmd:'F'},{cmd:'F'},{cmd:'R'}];st.rep=1;}load();st.setup=false;
      return r===4?'*Debug*: the robot should reach the star. *Change the code*, then Run.':r===1?'Level 2: climb the stairs with a *repeating group*. Aim for *4 blocks* or fewer.':'Level '+(r+1)+': reach the star. Try *1 conditional block* in a loop!';}};}
});

/* =========================================================
   20. Discrete and continuous data; intervals
   ========================================================= */
const DC=[['number of pets','discrete'],['height of a plant','continuous'],['goals in a game','discrete'],['time to run 100 m','continuous'],['students on a bus','discrete'],['mass of an apple','continuous'],['books on a shelf','discrete'],['temperature at noon','continuous'],['siblings','discrete'],['length of a snake','continuous']];
P.lesson({id:'data6',title:'Discrete and continuous data',strand:'Data',codes:['D1.1','D1.2'],
 guide:{goal:'Describe the difference between discrete and continuous data, give examples, collect qualitative and quantitative data, and organize data using intervals.',words:'discrete data, continuous data, qualitative, quantitative, interval, frequency table',
  ask:['Can you have 2.5 pets? What kind of data is “number of pets”?','Why is height continuous?','How do intervals help organize 30 different heights?'],home:'Measure the heights of family members to the nearest centimetre. Is the data discrete or continuous? Group it into intervals of 10 cm.'},
 learn:[{say:'Counted or measured?',speech:'Discrete data is counted: it can only be certain values, like Chloe’s three pets. Continuous data is measured: it can be any value in a range, like a height of one hundred forty-two point five centimetres. Watch the cards sort.',view:'model',demo:'sort'},
        {say:'Read about intervals.',speech:'When data has many different values, group it into equal intervals, like one hundred thirty to one hundred thirty-nine. Count how many values fall in each interval to make a frequency table.',view:'read'},
        {say:'Watch: data falls into intervals.',speech:'These heights drop into bins of ten centimetres each. The bins show where most of the data is.',view:'model',demo:'bins'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: sort and group.',speech:'Your turn. Tap a card, then tap the bin where it belongs. Or drop data into intervals.',view:'model'}],
 fig:'Data cards sorted into discrete and continuous bins, and interval bins.',rz:.35,
 explore:['*Tap a card*, then tap a *bin*.','Switch to *Intervals* to group heights.','Each bin counts its *frequency*.'],
 howTo:'Tap the card, then the bin it belongs in. Or drop the data into the right interval.',
 init:k=>({mode:'sort',cards:shuffle(DC.slice()).slice(0,6),done:[],sel:-1,data:[],bins:[0,0,0,0,0]}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'*Quantitative* data are numbers. They can be *discrete* (counted) or *continuous* (measured). *Qualitative* data are words, like favourite colour.')+16;
  [['Discrete','counted: 0, 1, 2, 3…','pets, goals, students','#2f7de1'],['Continuous','measured: any value','height, time, mass','#16a36f']].forEach(([a,b,c,col],i)=>{rr(g,X0+i*(TW/2+8),y,TW/2-8,150,16);g.fillStyle=tint(col,.14);g.fill();T(g,a,X0+i*(TW/2+8)+20,y+44,FT.h3,col);T(g,b,X0+i*(TW/2+8)+20,y+86,FT.body);T(g,c,X0+i*(TW/2+8)+20,y+124,FT.small,GREY);});y+=180;
  T(g,'Heights (cm) in intervals',X0,y+10,FT.smallB);y+=20;rr(g,X0,y,TW,40,10);g.fillStyle=tint(acc(),.16);g.fill();['Interval','Tally','Frequency'].forEach((h,i)=>T(g,h,X0+20+i*TW/3,y+28,FT.smallB,acc()));y+=44;
  [['130–139','||',2],['140–149','||||',5],['150–159','|||',3],['160–169','|',1]].forEach(([a,b,c],i)=>{T(g,a,X0+20,y+i*36+26,FT.body);T(g,b,X0+20+TW/3,y+i*36+26,FT.body);T(g,String(c),X0+20+2*TW/3,y+i*36+26,FT.bodyB);});y+=160;
  y=keyWords(p,y,[['discrete data','data you count; only certain values are possible'],['continuous data','data you measure; any value in a range is possible']]);
  predict(p,y,S,'p20','Is “the time it takes to walk to school” discrete or continuous?','*Continuous.* Time is measured and can be any value, like 12.5 minutes.');},
 readout(p,S,y){const g=p.g,st=S.st;if(st.mode==='sort'){T(g,'Sorted: '+st.done.length+' of '+st.cards.length,X0,y+44,FT.bodyB,acc());if(st.sel>=0)T(g,'Selected: '+st.cards[st.sel][0],X0,y+84,FT.body);return y+94;}
  T(g,BINS.map((b,i)=>b+': '+st.bins[i]).join('   '),X0,y+44,FT.small,acc());T(g,st.data.length?'Next value: '+st.data[0]+' cm':'All values placed.',X0,y+84,FT.bodyB);return y+94;},
 build(S,grp,mode,game){const st=S.st;const cardsG=new THREE.Group(),binsG=new THREE.Group();grp.add(cardsG,binsG);
  function cardMesh(t,col){const c=document.createElement('canvas');c.width=512;c.height=160;const g=c.getContext('2d');g.fillStyle='#fff';g.fillRect(0,0,512,160);g.strokeStyle=col;g.lineWidth=10;g.strokeRect(5,5,502,150);g.fillStyle='#1b2236';let fs=46;g.font='700 '+fs+'px "Atkinson Hyperlegible", sans-serif';while(g.measureText(t).width>470&&fs>24){fs-=3;g.font='700 '+fs+'px "Atkinson Hyperlegible", sans-serif';}g.textAlign='center';g.textBaseline='middle';g.fillText(t,256,84);
    const tx=new THREE.CanvasTexture(c);const side=lam('#ffffff');return mk(new THREE.BoxGeometry(1.25,.05,.4),[side,side,new THREE.MeshLambertMaterial({map:tx}),side,side,side],20);}
  function draw(){clearGroup(cardsG);clearGroup(binsG);
    if(st.mode==='sort'){[['discrete','#2f7de1',-1.1],['continuous','#16a36f',1.1]].forEach(([n,col,x])=>{const b=new THREE.Group();b.position.set(x,0,-.55);binsG.add(b);const w=mk(new THREE.BoxGeometry(1.9,.35,1.0),new THREE.MeshLambertMaterial({color:col,transparent:true,opacity:.35}),0);w.position.y=.18;b.add(w);
        const l=label(n,{size:.24,bg:'#ffffff',border:col});l.position.y=.65;b.add(l);A.drag(w,{tap:()=>drop(n)});
        st.done.filter(i=>st.cards[i][1]===n).forEach((i,k)=>{const c=cardMesh(st.cards[i][0],col);c.scale.setScalar(.6);c.position.set(0,.4+k*.05,.2-k*.12);b.add(c);});});
      st.cards.forEach((c,i)=>{if(st.done.includes(i))return;const m=cardMesh(c[0],i===st.sel?'#ffd24a':'#94a3b8');m.position.set(-1.45+(i%3)*1.45,i===st.sel?.2:.05,-2.75+Math.floor(i/3)*.6);cardsG.add(m);A.drag(m,{tap:()=>{st.sel=i;A.pop();draw();}});});}
    else{BINS.forEach((b,i)=>{const x=-1.8+i*.9;const h=Math.max(.02,st.bins[i]*.22);const bar=mk(new THREE.BoxGeometry(.8,h,.6),lam(['#93c5fd','#60a5fa','#3b82f6','#2563eb','#1d4ed8'][i]),20);bar.position.set(x,h/2,-1.6);binsG.add(bar);A.drag(bar,{tap:()=>dropI(i)});
        const pad=mk(new THREE.BoxGeometry(.84,.02,.64),lam('#e0e7ff'),20);pad.position.set(x,.01,-1.6);binsG.add(pad);A.drag(pad,{tap:()=>dropI(i)});const l=label(b,{size:.16});l.position.set(x,.2,-1.1);binsG.add(l);const f=label(String(st.bins[i]),{size:.2});f.position.set(x,h+.2,-1.6);binsG.add(f);});
      st.data.slice(0,6).forEach((v,k)=>{const b=mk(G('dball6',()=>new THREE.SphereGeometry(.15,16,12)),lam(k?'#cbd5e1':'#f59e0b'),0);b.position.set(-1.5+k*.45,.16,-2.8);cardsG.add(b);const l=label(String(v),{size:.16,color:INK});l.position.set(-1.5+k*.45,.42,-2.8);cardsG.add(l);});}A.redraw();}
  function drop(n){if(st.sel<0){A.bad('Tap a card first.');return;}const c=st.cards[st.sel];if(c[1]!==n){A.bad('“'+c[0]+'” is '+(c[1]==='discrete'?'counted':'measured')+'.');return;}st.done.push(st.sel);st.sel=-1;A.pop();draw();
    if(st.done.length===st.cards.length){A.good('All sorted!');if(mode==='play'&&!st.setup&&st.goal==='sort')game.solved('Every card is in the right bin!');}else if(mode==='play'&&!st.setup&&st.goal==='one'&&st.done.length>=1)game.solved('Yes! That is '+c[1]+' data.');}
  function dropI(i){if(!st.data.length)return;const v=st.data[0],k=Math.min(4,Math.max(0,Math.floor((v-130)/10)));if(k!==i){A.bad(v+' belongs in '+BINS[k]+'.');return;}st.data.shift();st.bins[i]++;A.pop();draw();
    if(!st.data.length){A.good('All grouped!');if(mode==='play'&&!st.setup&&st.goal==='bins')game.solved('Frequency table done: '+st.bins.join(', ')+'.');}}
  function setMode(m){st.mode=m;if(m==='int'){st.data=Array.from({length:8},()=>rnd(130,179));st.bins=[0,0,0,0,0];}draw();}
  draw();
  return {info:()=>st.mode==='sort'?'Tap a card, then a bin':'Drop each value into its interval',
    controls:()=>{if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok);return mode==='learn'?[{t:'Sort cards',on:st.mode==='sort',fn:()=>{st.cards=shuffle(DC.slice()).slice(0,6);st.done=[];st.sel=-1;setMode('sort');}},{t:'Intervals',on:st.mode==='int',fn:()=>setMode('int')}]:[];},
    demo(n){st.ask=null;if(n==='sort'){st.cards=DC.slice(0,6);st.done=[];st.sel=-1;setMode('sort');const l=[];for(let i=0;i<6;i++)l.push([350,()=>{st.sel=i;draw();}],[450,()=>drop(st.cards[i][1])]);A.seq(l);}
      if(n==='bins'){setMode('int');const l=[];for(let i=0;i<8;i++)l.push([550,()=>{const v=st.data[0];dropI(Math.min(4,Math.floor((v-130)/10)));}]);A.seq(l);}},
    task(r){st.setup=true;st.ask=null;st.goal=null;let txt;
      if(r===0){st.cards=shuffle(DC.slice()).slice(0,4);st.done=[];st.sel=-1;st.goal='sort';setMode('sort');txt='Sort every card: *discrete* or *continuous*?';}
      else if(r===1){setMode('int');st.goal='bins';txt='Drop each height into its *interval* to make a frequency table.';}
      else if(r===2){st.cards=shuffle(DC.slice()).slice(0,6);st.done=[];setMode('sort');const c=pick(DC);st.ask={ans:c[1]==='discrete'?'Discrete':'Continuous',o:['Discrete','Continuous'],ok:'Yes! “'+c[0]+'” is '+(c[1]==='discrete'?'counted':'measured')+'.'};txt='Is *'+c[0]+'* discrete or continuous data?';}
      else if(r===3){setMode('sort');st.ask={ans:'Favourite season',o:shuffle(['Favourite season','Number of cousins','Arm span']),ok:'Yes! It is described with words: qualitative.'};txt='Which question gives *qualitative* data?';}
      else{setMode('int');st.data=[];st.bins=[2,5,3,1,0];draw();st.ask={ans:'140–149',o:shuffle(['140–149','130–139','150–159']),ok:'Yes! 140–149 has the greatest frequency: 5.'};txt='Which interval has the *most* heights?';}
      st.setup=false;return txt;}};}
});
const BINS=['130–139','140–149','150–159','160–169','170–179'];

/* =========================================================
   21. Histograms and broken-line graphs
   ========================================================= */
P.lesson({id:'histogram6',title:'Histograms and broken-line graphs',strand:'Data',codes:['D1.3','D1.4'],
 guide:{goal:'Choose and create histograms and broken-line graphs with titles, labels, sources and appropriate scales, and use them in an infographic.',words:'histogram, interval, frequency, broken-line graph, trend, scale, source, infographic',
  ask:['Why are there no gaps between the bars of a histogram?','Why is a broken-line graph good for data over time?','Which graph would you use for the temperature every hour?'],home:'Record the outdoor temperature every hour on a weekend day. Draw a broken-line graph and describe the trend.'},
 learn:[{say:'Histograms show intervals.',speech:'A histogram is a bar graph for intervals of continuous data. The bars touch because the intervals are next to each other. Watch Malik’s jump distances fill their intervals.',view:'model',demo:'hist'},
        {say:'Read about choosing a graph.',speech:'Use a histogram for data grouped in intervals. Use a broken-line graph to show how something changes over time. Every graph needs a title, labels, a scale and a source.',view:'read'},
        {say:'Watch: a broken-line graph.',speech:'This broken-line graph shows the temperature every two hours. The line goes up in the morning and down in the evening. That is the trend.',view:'model',demo:'line'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: read and build.',speech:'Your turn. Switch between the two graphs, and tap bars or points to read them.',view:'model'}],
 fig:'A 3D histogram and a broken-line graph.',rz:.3,
 explore:['Switch *Histogram* and *Broken-line graph*.','*Tap* a bar or a point to read it.','Press *New data* for another set.'],
 howTo:'Read the graph to answer, or tap the bar or point the question asks for.',
 init:k=>({kind:'hist',f:[2,5,8,6,3],temps:[8,10,15,19,21,18,12],sel:null,ask:null,want:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'Choose the graph that fits the data.')+10;
  const ox=X0+50,oy=y+230,bw=60;T(g,'Long Jump Distances',ox+150,y+24,FT.smallB,INK,'center');g.strokeStyle=INK;g.lineWidth=3;g.beginPath();g.moveTo(ox,y+40);g.lineTo(ox,oy);g.lineTo(ox+bw*5+10,oy);g.stroke();
  [2,5,8,6,3].forEach((f,i)=>{g.fillStyle=['#93c5fd','#60a5fa','#3b82f6','#2563eb','#1d4ed8'][i];g.fillRect(ox+i*bw,oy-f*20,bw,f*20);g.strokeStyle='#fff';g.strokeRect(ox+i*bw,oy-f*20,bw,f*20);});
  ['2.0','2.5','3.0','3.5','4.0','4.5'].forEach((t,i)=>T(g,t,ox+i*bw,oy+22,FT.cap,GREY,'center'));T(g,'distance (m)',ox+150,oy+48,FT.cap,GREY,'center');
  const lx=X0+440,ly=oy;T(g,'Temperature Today',lx+170,y+24,FT.smallB,INK,'center');g.strokeStyle=INK;g.lineWidth=3;g.beginPath();g.moveTo(lx,y+40);g.lineTo(lx,ly);g.lineTo(lx+350,ly);g.stroke();
  g.strokeStyle='#e4572e';g.lineWidth=4;g.beginPath();[8,10,15,19,21,18,12].forEach((t,i)=>{const x=lx+20+i*52,yy=ly-t*8;i?g.lineTo(x,yy):g.moveTo(x,yy);});g.stroke();[8,10,15,19,21,18,12].forEach((t,i)=>{g.beginPath();g.arc(lx+20+i*52,ly-t*8,6,0,Math.PI*2);g.fillStyle='#e4572e';g.fill();});
  T(g,'time of day',lx+170,ly+48,FT.cap,GREY,'center');y+=300;
  [['Histogram','continuous data in equal intervals; bars touch'],['Broken-line graph','change over time; points joined by lines']].forEach(([a,b],i)=>{T(g,a,X0,y+i*40,FT.bodyB,acc());T(g,b,X0+250,y+i*40,FT.small);});y+=90;
  y=para(p,y,'An *infographic* combines graphs, numbers and short facts to tell a clear story. Always include the *source*.')+8;
  y=keyWords(p,y,[['histogram','a bar graph of intervals with no gaps'],['trend','the general direction the data moves']]);
  predict(p,y,S,'p21','Which graph fits “the height of a bean plant every day for 3 weeks”?','*A broken-line graph.* It shows change over time.');},
 readout(p,S,y){const g=p.g,st=S.st;if(st.kind==='hist')T(g,st.sel!=null?HI[st.sel]+' m: '+st.f[st.sel]+' jumps':'Frequencies: '+st.f.join(', '),X0,y+44,FT.bodyB,acc());
  else T(g,st.sel!=null?HR[st.sel]+': '+st.temps[st.sel]+' °C':'Temperatures: '+st.temps.join(', ')+' °C',X0,y+44,FT.bodyB,acc());return y+60;},
 build(S,grp,mode,game){const st=S.st,Z=-1.8;const g2=new THREE.Group();grp.add(g2);const back=mk(new THREE.BoxGeometry(4.3,2.3,.04),lam('#ffffff'),20);back.position.set(0,1.15,Z-.62);grp.add(back);
  const title=label('',{size:.24});title.position.set(0,2.45,Z-.6);grp.add(title);
  function draw(){clearGroup(g2);
    if(st.kind==='hist'){title.userData.set('Long Jump Distances (m) — source: Grade 6 track day');const bw=.72,x0=-1.8;st.f.forEach((f,i)=>{const h=f*.2;const sel=st.sel===i;const b=mk(new THREE.BoxGeometry(bw,Math.max(.01,h),.6),lam(sel?'#f59e0b':['#93c5fd','#60a5fa','#3b82f6','#2563eb','#1d4ed8'][i]),20);b.position.set(x0+(i+.5)*bw,h/2+.02,Z-.2);g2.add(b);A.drag(b,{tap:()=>tap(i)});
        const l=label(String(f),{size:.2});l.position.set(x0+(i+.5)*bw,h+.2,Z-.2);g2.add(l);});
      HI.forEach((t,i)=>{const l=label(t.split('–')[0],{size:.15,color:GREY});l.position.set(x0+i*bw,.12,Z+.25);g2.add(l);});const l=label('4.5',{size:.15,color:GREY});l.position.set(x0+5*bw,.12,Z+.25);g2.add(l);}
    else{title.userData.set('Temperature Today (°C) — source: school weather station');const x0=-1.8,dx=.6;const pts=st.temps.map((t,i)=>V(x0+i*dx,.1+t*.085,Z-.2));
      for(let i=0;i<pts.length-1;i++){const a=pts[i],b=pts[i+1];const s=new THREE.Mesh(new THREE.CylinderGeometry(.025,.025,a.distanceTo(b),8),lam('#e4572e'));s.position.copy(a).add(b).multiplyScalar(.5);s.quaternion.setFromUnitVectors(V(0,1,0),b.clone().sub(a).normalize());g2.add(s);}
      pts.forEach((p,i)=>{const sel=st.sel===i;const d=mk(G('hp6',()=>new THREE.SphereGeometry(.09,14,10)),lam(sel?'#f59e0b':'#e4572e'),0);d.position.copy(p);g2.add(d);A.drag(d,{tap:()=>tap(i)});const l=label(HR[i],{size:.13,color:GREY});l.position.set(p.x,.12,Z+.25);g2.add(l);
        if(sel){const v=label(st.temps[i]+' °C',{size:.2,bg:'#ffffff'});v.position.set(p.x,p.y+.3,p.z);g2.add(v);}});}
    A.redraw();}
  function tap(i){st.sel=i;A.pop();draw();if(mode==='play'&&!st.setup&&st.want){if(st.want(i))game.solved(st.wantOk);else A.bad('Not that one. Read the question again.');}}
  draw();
  return {info:()=>st.kind==='hist'?'Histogram':'Broken-line graph',
    controls:()=>{const c=[{t:'Histogram',on:st.kind==='hist',fn:()=>{st.kind='hist';st.sel=null;draw();}},{t:'Broken-line',on:st.kind==='line',fn:()=>{st.kind='line';st.sel=null;draw();}}];
      if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);return mode==='learn'?c.concat([{t:'New data',fn:()=>{st.f=st.f.map(()=>rnd(1,9));st.temps=st.temps.map((t,i)=>rnd(5,10)+Math.round(10*Math.sin(i/6*Math.PI)));draw();}}]):c;},
    demo(n){st.ask=null;st.want=null;st.sel=null;if(n==='hist'){st.kind='hist';const fin=[2,5,8,6,3];st.f=[0,0,0,0,0];draw();const l=[];for(let k=1;k<=8;k++)l.push([300,()=>{st.f=fin.map(v=>Math.min(v,k));draw();}]);A.seq(l);}
      if(n==='line'){st.kind='line';st.temps=[8,10,15,19,21,18,12];draw();const l=[];for(let i=0;i<7;i++)l.push([450,()=>{st.sel=i;draw();}]);A.seq(l);}},
    task(r){st.setup=true;st.ask=null;st.want=null;st.sel=null;let txt;
      if(r===0){st.kind='hist';st.f=[rnd(1,4),rnd(3,7),rnd(6,9),rnd(3,7),rnd(1,4)];const mx=Math.max(...st.f);const i=st.f.indexOf(mx);st.f=st.f.map((v,j)=>j!==i&&v===mx?v-1:v);st.want=j=>j===i;st.wantOk='Yes! '+HI[i]+' m has the most jumps.';txt='Tap the bar for the interval with the *most* jumps.';}
      else if(r===1){st.kind='hist';st.f=st.f.map(()=>rnd(1,8));const i=rnd(0,4);st.ask={ans:st.f[i],o:opts(st.f[i],[1,-1,2],0),ok:'Yes! '+st.f[i]+' jumps.'};txt='How many jumps were *'+HI[i]+' m*?';}
      else if(r===2){st.kind='line';st.temps=[rnd(5,9),rnd(9,12),rnd(13,16),rnd(17,20),rnd(21,24),rnd(16,19),rnd(10,13)];st.want=j=>j===4;st.wantOk='Yes! The warmest time was '+HR[4]+'.';txt='Tap the point for the *warmest* time of day.';}
      else if(r===3){st.kind='line';const Q=pick([['Temperature every hour','Broken-line graph'],['Heights of 30 students','Histogram'],['Growth of a puppy each month','Broken-line graph'],['Times to run 100 m for a class','Histogram']]);st.ask={ans:Q[1],o:['Histogram','Broken-line graph'],ok:'Yes! A '+Q[1].toLowerCase()+' fits that data.'};txt='Which graph fits *'+Q[0].toLowerCase()+'*?';}
      else{st.kind='line';st.temps=[8,10,15,19,21,18,12];st.ask={ans:'It rises, then falls',o:shuffle(['It rises, then falls','It falls all day','It stays the same']),ok:'Yes! Up to 2 p.m., then down.'};txt='What is the *trend* of the temperature?';}
      draw();st.setup=false;return txt;}};}
});
const HI=['2.0–2.5','2.5–3.0','3.0–3.5','3.5–4.0','4.0–4.5'],HR=['6 a.m.','8 a.m.','10 a.m.','12 p.m.','2 p.m.','4 p.m.','6 p.m.'];

/* =========================================================
   22. Range and measures of central tendency
   ========================================================= */
P.lesson({id:'range6',title:'Range, mean, median and mode',strand:'Data',codes:['D1.5','D1.6'],
 guide:{goal:'Determine the range as a measure of spread and the mean, median and mode, use them to compare data sets, and analyse data, including misleading graphs, to draw conclusions.',words:'range, spread, mean, median, mode, compare, consistent, misleading',
  ask:['Two players have the same mean score. How can the range tell them apart?','Which measure changes most when one very large value is added?','How can a graph mislead you?'],home:'Record your bedtime for a week. Find the range and the median. Is your bedtime consistent?'},
 learn:[{say:'Range shows the spread.',speech:'Yuna compares two basketball players. Both have a mean of ten points. Player A scores between eight and twelve. Player B scores between two and eighteen. Watch the range bars: A is more consistent.',view:'model',demo:'range'},
        {say:'Read the measures.',speech:'Range is the greatest value minus the least value. The mean, median and mode describe the centre. Together they help compare data sets.',view:'read'},
        {say:'Watch: an outlier.',speech:'Add a score of forty to player A. The mean jumps up, but the median hardly moves. The range grows a lot.',view:'model',demo:'outlier'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: compare the sets.',speech:'Your turn. Compare the two data sets with the measures, and answer the questions.',view:'model'}],
 fig:'Two data sets as towers, with their range bars.',rz:.3,
 explore:['Compare *set A* (blue) and *set B* (orange).','The bars on the right show each *range*.','Press *Sort* to find medians.'],
 howTo:'Use the towers and the measures to answer the question.',
 init:k=>({A:[8,10,12,9,11],B:[2,18,10,6,14],ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'The *range* tells how *spread out* data is: range = greatest − least. A small range means the data is *consistent*.')+16;
  [['Player A','8, 9, 10, 11, 12','mean 10','range 4','#2f7de1'],['Player B','2, 6, 10, 14, 18','mean 10','range 16','#e4572e']].forEach(([a,b,c,d,col],i)=>{rr(g,X0,y+i*80,TW,70,14);g.fillStyle=tint(col,.14);g.fill();T(g,a,X0+20,y+i*80+44,FT.bodyB,col);T(g,b,X0+180,y+i*80+44,FT.body);T(g,c,X0+500,y+i*80+44,FT.small);T(g,d,X0+TW-20,y+i*80+44,FT.bodyB,col,'right');});y+=180;
  y=para(p,y,'Same mean, different spread: *Player A is more consistent*.')+14;
  [['Range','greatest − least'],['Mean','total ÷ number of values'],['Median','middle value when sorted'],['Mode','most common value']].forEach(([a,b],i)=>{T(g,a,X0,y+i*40,FT.bodyB,acc());T(g,b,X0+150,y+i*40,FT.body);});y+=170;
  y=para(p,y,'*Misleading graphs* can hide the spread or start an axis above zero. Check the numbers before drawing a conclusion.')+8;
  predict(p,y,S,'p22','Data: 3, 7, 7, 9, 24. Which describes the centre better, the mean or the median?','*The median (7).* The 24 pulls the mean up to 10.');},
 readout(p,S,y){const g=p.g,st=S.st,m=s=>{const v=s.slice().sort((a,b)=>a-b),n=v.length,sum=v.reduce((a,b)=>a+b,0);return {r:v[n-1]-v[0],mean:Math.round(sum/n*10)/10,med:n%2?v[(n-1)/2]:(v[n/2-1]+v[n/2])/2};};
  const a=m(st.A),b=m(st.B);T(g,'A: range '+a.r+' · mean '+a.mean+' · median '+a.med,X0,y+40,FT.bodyB,'#2f7de1');T(g,'B: range '+b.r+' · mean '+b.mean+' · median '+b.med,X0,y+82,FT.bodyB,'#e4572e');return y+94;},
 build(S,grp,mode,game){const st=S.st,u=.08;const g2=new THREE.Group();grp.add(g2);
  function draw(){clearGroup(g2);[[st.A,'#2f7de1',-2.6],[st.B,'#e4572e',-1.5]].forEach(([arr,col,z])=>{arr.forEach((v,i)=>{const h=v*u;const b=mk(new THREE.BoxGeometry(.3,Math.max(.01,h),.3),[lam(col),lam(col),lam(col),lam(col),cellMat(col,1,v),cellMat(col,1,v)],20);b.position.set(-2.0+i*.42,h/2+.02,z);g2.add(b);const l=label(String(v),{size:.16});l.position.set(-2.0+i*.42,h+.18,z);g2.add(l);});
      const mn=Math.min(...arr),mx=Math.max(...arr);const rb=mk(new THREE.BoxGeometry(.18,(mx-mn)*u,.18),new THREE.MeshLambertMaterial({color:col,transparent:true,opacity:.55}),0);rb.position.set(1.4,(mn+mx)/2*u+.02,z);g2.add(rb);
      [mn,mx].forEach(v=>{const t=mk(G('rgt6',()=>new THREE.BoxGeometry(.4,.025,.25)),lam(col),0);t.position.set(1.4,v*u+.02,z);g2.add(t);});const rl=label('range '+(mx-mn),{size:.18,bg:'#ffffff',border:col});rl.position.set(1.9,(mn+mx)/2*u+.1,z);g2.add(rl);
      const sum=arr.reduce((a,b)=>a+b,0),mean=sum/arr.length;const ml=mk(new THREE.BoxGeometry(arr.length*.42+.1,.015,.38),lam('#f59e0b'),0);ml.position.set(-2.0+(arr.length-1)*.21,mean*u+.02,z);g2.add(ml);});A.redraw();}
  draw();
  return {info:()=>'A vs B',
    controls:()=>{const c=[{t:'Sort',fn:()=>{st.A.sort((a,b)=>a-b);st.B.sort((a,b)=>a-b);A.pop();draw();}}];if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);
      return mode==='learn'?c.concat([{t:'Add 40 to A',fn:()=>{if(st.A.length<7){st.A.push(40);draw();}}},{t:'New data',fn:()=>{st.A=Array.from({length:5},()=>rnd(6,14));st.B=Array.from({length:5},()=>rnd(1,20));draw();}}]):c;},
    demo(n){st.ask=null;st.A=[8,10,12,9,11];st.B=[2,18,10,6,14];draw();if(n==='range')A.seq([[900,()=>A.say('Both means are 10. A: range 4. B: range 16.')]]);if(n==='outlier')A.seq([[800,()=>{st.A.push(40);draw();A.say('Mean 15, median 10.5: the outlier pulls the mean.')}]]);},
    task(r){st.setup=true;st.ask=null;let txt;st.A=Array.from({length:5},()=>rnd(6,14));st.B=Array.from({length:5},()=>rnd(1,20));const R=s=>Math.max(...s)-Math.min(...s);
      if(R(st.A)===R(st.B))st.B[0]=st.B[0]>10?1:20;
      if(r===0){const v=R(st.B);st.ask={ans:v,o:opts(v,[1,-1,2,-2],0),ok:'Yes! '+Math.max(...st.B)+' − '+Math.min(...st.B)+' = '+v+'.'};txt='What is the *range* of set *B* (orange)?';}
      else if(r===1){const ans=R(st.A)<R(st.B)?'Set A':'Set B';st.ask={ans,o:['Set A','Set B'],ok:'Yes! A smaller range means more consistent.'};txt='Which set is *more consistent*?';}
      else if(r===2){st.A=[rnd(4,8),rnd(4,8),rnd(4,8),rnd(4,8),rnd(4,8)];const s=st.A.reduce((a,b)=>a+b,0);st.A[4]+=(5-s%5)%5;const mean=st.A.reduce((a,b)=>a+b,0)/5;st.ask={ans:mean,o:opts(mean,[1,-1,2],0),ok:'Yes! The total ÷ 5 = '+mean+'.'};txt='What is the *mean* of set *A* (blue)?';}
      else if(r===3){st.A=[5,6,6,8,30];st.ask={ans:'Median',o:['Mean','Median'],ok:'Yes! The median (6) is not pulled by the 30.'};txt='Set A has an outlier (30). Which measure best shows a *typical* value?';}
      else{st.A=[10,11,9,10,10];st.B=[3,17,10,5,15];st.ask={ans:'Same mean, different range',o:shuffle(['Same mean, different range','Same range, different mean','Same mean and range']),ok:'Yes! Both means are 10, but the ranges are 2 and 14.'};txt='How do the two sets compare?';}
      draw();st.setup=false;return txt;}};}
});

/* =========================================================
   23. Probability of two independent events
   ========================================================= */
const SP4=[['red','#e0453a'],['blue','#2f7de1'],['green','#16a36f'],['yellow','#f2c200']];
P.lesson({id:'prob6',title:'Probability of two independent events',strand:'Data',codes:['D2.1','D2.2'],
 guide:{goal:'Express probabilities as fractions, decimals and percents, show them on a probability line, and determine and compare the theoretical and experimental probabilities of two independent events.',words:'independent events, outcome, sample space, table, theoretical probability, experimental probability, percent',
  ask:['Does the coin landing heads change the spinner?','How many outcomes are there for a coin and a 4-part spinner?','Why might 40 trials give a different answer from the theory?'],home:'Flip a coin and roll a die together 30 times. Count how often you get heads and a 6. Compare with 1/12.'},
 learn:[{say:'Two events, one table.',speech:'Ezra flips a coin and spins a four-colour spinner. The coin does not change the spinner: they are independent. The table shows all eight outcomes. Heads and red is one of eight: one eighth, zero point one two five, or twelve point five percent.',view:'model',demo:'table'},
        {say:'Read about independent events.',speech:'For two independent events, list every pair of outcomes in a table or tree. The theoretical probability is the number of favourable outcomes over the total number of outcomes.',view:'read'},
        {say:'Watch: forty trials.',speech:'Now flip and spin forty times. Each trial lights up a cell in the table. The experimental results are close to five each, but not exactly.',view:'model',demo:'trials'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: experiment.',speech:'Your turn. Run trials and compare the counts with the theoretical probability.',view:'model'}],
 fig:'A coin, a spinner and a table of all 8 outcomes.',rz:.35,
 explore:['Press *Flip & spin* or *40 trials*.','Each outcome lights a cell in the *table*.','Compare *experimental* counts with the *theoretical* 1/8.'],
 howTo:'Use the table of outcomes and the trials to answer.',
 init:k=>({cnt:[0,0,0,0,0,0,0,0],n:0,last:null,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'Two events are *independent* if one does not change the other. A table shows every *outcome*.')+16;
  const cw=150,ch=56;T(g,'coin \\ spinner',X0,y+36,FT.cap,GREY);SP4.forEach(([n,c],j)=>{T(g,n,X0+140+j*cw+cw/2,y+36,FT.smallB,c,'center');});
  ['H','T'].forEach((h,i)=>{T(g,h==='H'?'heads':'tails',X0+10,y+90+i*ch,FT.smallB);SP4.forEach(([n,c],j)=>{rr(g,X0+140+j*cw+4,y+56+i*ch,cw-8,ch-8,8);g.fillStyle=i===0&&j===0?c:tint(c,.2);g.fill();T(g,h+', '+n[0].toUpperCase(),X0+140+j*cw+cw/2,y+90+i*ch,FT.small,i===0&&j===0?'#fff':INK,'center');});});y+=190;
  T(g,'P(heads and red) = 1/8 = 0.125 = 12.5%',X0,y+10,ZS(34),acc());y+=40;
  y=para(p,y,'*Theoretical:* what should happen. *Experimental:* what did happen. With more trials, the experimental probability usually gets closer to the theoretical one.')+10;
  y=keyWords(p,y,[['independent events','events where one does not affect the other'],['sample space','the list of all possible outcomes']]);
  predict(p,y,S,'p23','What is P(tails and not red) for this coin and spinner?','*3/8 = 0.375 = 37.5%.* Tails with blue, green or yellow.');},
 readout(p,S,y){const g=p.g,st=S.st;T(g,st.n?st.n+' trials: H,R = '+st.cnt[0]+' ('+Math.round(st.cnt[0]/st.n*1000)/10+'%)':'No trials yet.',X0,y+42,FT.bodyB,acc());T(g,'Theory: each outcome 1/8 = 12.5%'+(st.last?'   ·   last: '+st.last:''),X0,y+82,FT.body);return y+92;},
 build(S,grp,mode,game){const st=S.st;const coin=new THREE.Group();coin.position.set(-1.6,.5,-2.5);grp.add(coin);
  const cm=(t,col)=>{const c=document.createElement('canvas');c.width=c.height=128;const g=c.getContext('2d');g.fillStyle=col;g.fillRect(0,0,128,128);g.fillStyle='#7a5b00';g.font='700 70px "Zilla Slab", serif';g.textAlign='center';g.textBaseline='middle';g.fillText(t,64,68);return new THREE.MeshLambertMaterial({map:new THREE.CanvasTexture(c)});};
  const cd=mk(new THREE.CylinderGeometry(.35,.35,.06,32),[lam('#e6c15a'),cm('H','#f2d27a'),cm('T','#e6c15a')],0);cd.rotation.x=Math.PI/2;coin.add(cd);
  const disc=new THREE.Group();disc.position.set(.1,.06,-2.45);grp.add(disc);for(let i=0;i<4;i++){const m=mk(wedgeGeo(.6,.08,i*Math.PI/2+.02,(i+1)*Math.PI/2-.02),lam(SP4[i][1]),20);disc.add(m);}
  const arr=new THREE.Group();arr.position.set(.1,.2,-2.45);grp.add(arr);const a=mk(new THREE.ConeGeometry(.06,.55,4),lam(INK),0);a.rotation.x=-Math.PI/2;a.position.z=-.24;arr.add(a);let spinA=0;
  const tbl=new THREE.Group();grp.add(tbl);const cellX=j=>-1.3+j*.85,cellZ=i=>-1.25+i*.6;
  ['H','T'].forEach((h,i)=>{const l=label(h==='H'?'heads':'tails',{size:.17});l.position.set(-2.05,.2,cellZ(i));grp.add(l);});SP4.forEach(([n,c],j)=>{const l=label(n,{size:.17,color:c});l.position.set(cellX(j),.2,-1.68);grp.add(l);});
  function draw(hi){clearGroup(tbl);for(let i=0;i<2;i++)for(let j=0;j<4;j++){const k=i*4+j;const h=.05+st.cnt[k]*.05;const on=hi===k;const m=mk(new THREE.BoxGeometry(.76,h,.5),lam(on?'#ffd24a':tint(SP4[j][1],.35+Math.min(.5,st.cnt[k]*.05))),20);m.position.set(cellX(j),h/2,cellZ(i));tbl.add(m);
      const l=label(String(st.cnt[k]),{size:.18});l.position.set(cellX(j),h+.18,cellZ(i));tbl.add(l);}A.redraw();}
  function trial(){const c=rnd(0,1),s=rnd(0,3);st.cnt[c*4+s]++;st.n++;st.last=(c?'tails':'heads')+', '+SP4[s][0];return [c,s];}
  function once(){const [c,s]=trial();const r0=coin.rotation.x;tween(.8,k=>{coin.rotation.x=r0+k*Math.PI*4+(c?Math.PI:0)*k;coin.position.y=.5+Math.sin(Math.PI*k)*.6;}).then(()=>{coin.rotation.x=c?Math.PI:0;});
    const tgt=(s+.5)*Math.PI/2-Math.PI/2;const a0=spinA,a1=a0-((a0-tgt)%(2*Math.PI)+2*Math.PI)%(2*Math.PI)-4*Math.PI;tween(1.0,k=>{spinA=a0+(a1-a0)*k;arr.rotation.y=spinA;},x=>1-Math.pow(1-x,3)).then(()=>{A.pop();draw(c*4+s);});}
  function many(n){for(let i=0;i<n;i++)trial();A.pop();draw();A.say(n+' more trials: H,R = '+st.cnt[0]+' of '+st.n);}
  draw();
  return {info:()=>st.n+' trials',
    controls:()=>{const c=[{t:'Flip & spin',go:true,fn:once},{t:'40 trials',fn:()=>many(40)},{t:'Clear',fn:()=>{st.cnt=[0,0,0,0,0,0,0,0];st.n=0;st.last=null;draw();}}];
      if(mode==='play'&&st.ask&&(!st.ask.need||st.n>=st.ask.need))return choices(st.setup?null:game,typeof st.ask.o==='function'?st.ask.o():st.ask.o,typeof st.ask.ans==='function'?st.ask.ans():st.ask.ans,st.ask.ok).concat(c);return c;},
    demo(n){st.ask=null;st.cnt=[0,0,0,0,0,0,0,0];st.n=0;draw();if(n==='table')A.seq([[700,once],[1500,once]]);if(n==='trials')A.seq([[700,()=>many(40)]]);},
    task(r){st.setup=true;st.ask=null;st.cnt=[0,0,0,0,0,0,0,0];st.n=0;draw();let txt;
      if(r===0){st.ask={ans:'8',o:['4','6','8'],ok:'Yes! 2 coin outcomes × 4 colours = 8.'};txt='How many *outcomes* are there for one flip and one spin?';}
      else if(r===1){const s=rnd(0,3);st.ask={ans:'1/8',o:shuffle(['1/8','1/4','1/2']),ok:'Yes! 1 favourable outcome of 8.'};txt='What is *P(heads and '+SP4[s][0]+')*?';}
      else if(r===2){st.ask={ans:'50%',o:shuffle(['50%','25%','12.5%']),ok:'Yes! 4 of 8 outcomes have tails: 4/8 = 50%.'};txt='What is *P(tails)* as a *percent*?';}
      else if(r===3){st.ask={need:40,ans:()=>st.cnt[0]+'/'+st.n,o:()=>shuffle([st.cnt[0]+'/'+st.n,'1/8',(st.cnt[0]+3)+'/'+st.n]).filter((x,i,a)=>a.indexOf(x)===i),ok:'Yes! That is the experimental probability.'};txt='Press *40 trials*. What is the *experimental* probability of heads and red?';}
      else{st.ask={ans:'0.25',o:shuffle(['0.25','0.125','0.5']),ok:'Yes! Red with heads or tails: 2/8 = 0.25.'};txt='What is *P(red)* with any coin result, as a *decimal*?';}
      st.setup=false;return txt;}};}
});
})();
