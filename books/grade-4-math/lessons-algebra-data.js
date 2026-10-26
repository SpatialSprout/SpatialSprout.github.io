/* The Interactive Classroom: Grade 4 Math — Algebra (13–16) and Data (17–20) */
(function(){
"use strict";
const P=window.PM;if(!P||P.failed||!P.THREE)return;
const {THREE,V,W,D,PY,PX,X0,TW,INK,RED,BLUE,GREY,VIBE,FT,ZS,G,M,lam,mk,unitBox,cellMat,label,starGeo,wedgeGeo,clearGroup,disposeObj,rr,T,wrap,para,header,keyWords,predict,box,caption,cxOf,cyOf,tint,moveTo,hop,tween,burst,easeOut,easeIO,A}=P;
const acc=()=>P.ACC;
const rnd=(a,b)=>a+Math.floor(Math.random()*(b-a+1)),pick=a=>a[Math.floor(Math.random()*a.length)],shuffle=a=>a.slice().sort(()=>Math.random()-.5);
function choices(game,list,ans,ok,lab){return list.map(o=>({t:lab?lab(o):String(o),big:true,fn:()=>{if(o===ans)game.solved(ok);else A.bad('Not quite. Try again!');}}));}
function opts(ans,spread,min){const s=new Set([ans]);let k=0;while(s.size<3&&k<50){k++;const v=ans+pick(spread);if(v>=(min==null?0:min))s.add(v);}return shuffle([...s]);}
function cardMat(text,bg,fg,w,h){return M('card'+text+bg,()=>{const c=document.createElement('canvas');c.width=w||512;c.height=h||192;const g=c.getContext('2d');g.fillStyle=bg;g.fillRect(0,0,c.width,c.height);
  g.strokeStyle='rgba(27,34,54,.3)';g.lineWidth=8;g.strokeRect(4,4,c.width-8,c.height-8);g.fillStyle=fg||'#1b2236';let fs=64;g.font='700 '+fs+'px "Atkinson Hyperlegible", sans-serif';while(g.measureText(text).width>c.width-40&&fs>26){fs-=4;g.font='700 '+fs+'px "Atkinson Hyperlegible", sans-serif';}
  g.textAlign='center';g.textBaseline='middle';g.fillText(text,c.width/2,c.height/2+4);const t=new THREE.CanvasTexture(c);t.anisotropy=4;return new THREE.MeshLambertMaterial({map:t});});}
function card(text,bg,w,d,fg){const geo=new THREE.BoxGeometry(w,.06,d);const s=lam(bg);return mk(geo,[s,s,cardMat(text,bg,fg),s,s,s],20);}

/* =========================================================
   13. Patterns, tables and graphs
   ========================================================= */
P.lesson({id:'patterns4',title:'Patterns, tables and graphs',strand:'Algebra',codes:['C1.1','C1.2','C1.3','C1.4'],
 guide:{goal:'Identify, describe, create and extend repeating and growing patterns, show them in tables of values and graphs, use pattern rules to predict and find missing terms, and make patterns with decimal tenths.',words:'pattern rule, term, term number, table of values, growing pattern, shrinking pattern, repeating pattern',
  ask:['What is the pattern rule? How do you know?','What will term 10 be? How can you predict it without building it?','How is a pattern of 0.2, 0.4, 0.6 like 2, 4, 6?'],home:'Stack coins in a growing pattern: 1, 3, 5, 7… Record the term number and the number of coins in a table.'},
 learn:[{say:'Growing patterns follow a rule.',speech:'This pattern starts at three and adds two each time. Watch the towers grow: three, five, seven, nine. The tops of the towers make a straight line on the graph.',view:'model',demo:'grow'},
        {say:'Read about tables of values.',speech:'A table of values shows each term number and its value. The pattern rule here is: start at three and add two each time.',view:'read'},
        {say:'Watch: a decimal pattern.',speech:'Now each cube is worth one tenth. The same towers show zero point three, zero point five, zero point seven. Decimal patterns grow the same way.',view:'model',demo:'decimal'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: change the rule.',speech:'Your turn. Change the start and the amount added, and watch the towers, the table and the graph change.',view:'model'}],
 fig:'Towers for terms 1 to 6. The tops make a graph of the pattern.',rz:.3,
 explore:['Change the *start* and the *add* amount.','Switch *each cube = 1* or *each cube = 0.1*.','Read the *table of values* below the model.'],
 tries:[['Rule: start at 4, add 3. What is term 5?','*16.* 4, 7, 10, 13, 16.'],['Find the missing term: 30, 26, ___, 18, 14','*22.* The rule is subtract 4.'],['What comes next: 0.5, 1.0, 1.5, 2.0, ___','*2.5.* Add 0.5 each time.']],
 howTo:'Find the pattern rule. Build the glowing tower so it shows the right term. Tap the tower to add a cube or use the buttons.',
 init:k=>({a:3,b:2,dec:false,miss:-1,user:0}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'A *growing pattern* changes by the same amount each time. The *pattern rule* says where to start and what to add.')+18;
  for(let n=1;n<=4;n++){const h=1+2*(n-1);for(let k=0;k<h;k++){rr(g,X0+(n-1)*120,y+170-k*24,40,22,4);g.fillStyle=VIBE[n];g.fill();}T(g,'term '+n,X0+(n-1)*120+20,y+206,FT.small,GREY,'center');}
  const tx=X0+500;rr(g,tx,y+20,320,150,14);g.fillStyle=tint(acc(),.1);g.fill();T(g,'Term',tx+20,y+64,FT.smallB);T(g,'Value',tx+20,y+130,FT.smallB);
  [1,3,5,7].forEach((v,i)=>{T(g,String(i+1),tx+130+i*50,y+64,ZS(32),INK,'center');T(g,String(v),tx+130+i*50,y+130,ZS(32),'#8b5cf6','center');});y+=240;
  y=para(p,y,'Rule: *start at 1, add 2*. Term 5 = 9. A *repeating pattern* has a core that repeats: ■ ● ■ ● ■ ●. A *shrinking pattern* subtracts each time.')+12;
  y=keyWords(p,y,[['term','one step in a pattern'],['table of values','a table pairing each term number with its value']]);
  predict(p,y,S,'p13','Rule: start at 2, add 5. What is term 6?','*27.* 2, 7, 12, 17, 22, 27.');},
 readout(p,S,y){const g=p.g,st=S.st,f=v=>st.dec?(v/10).toFixed(1):String(v);T(g,'Term',X0,y+36,FT.smallB);T(g,'Value',X0,y+80,FT.smallB);
  for(let n=1;n<=6;n++){const v=st.a+st.b*(n-1);const hide=n-1===st.miss;T(g,String(n),X0+150+(n-1)*110,y+36,ZS(32),INK,'center');T(g,hide?(st.user?f(st.user):'?'):f(v),X0+150+(n-1)*110,y+80,ZS(32),hide?'#e2457a':'#8b5cf6','center');}
  T(g,'Rule: start at '+f(st.a)+', '+(st.b>=0?'add '+f(st.b):'subtract '+f(-st.b)),X0,y+122,FT.bodyB,acc());return y+130;},
 build(S,grp,mode,game){const st=S.st,u=.15,Z=-1.6,xs=n=>-1.9+n*.76;const towers=new THREE.Group();grp.add(towers);
  const base=mk(new THREE.BoxGeometry(4.5,.03,1.1),[lam('#efe9ff'),lam('#efe9ff'),cellMat('#f7f3ff',18,4),lam('#efe9ff'),lam('#efe9ff'),lam('#efe9ff')],20);base.position.set(0,.015,Z);grp.add(base);
  const line=new THREE.Group();grp.add(line);
  function val(n){return st.a+st.b*n;}
  function draw(){clearGroup(towers);clearGroup(line);const tops=[];
    for(let n=0;n<6;n++){const isM=n===st.miss;const h=isM?st.user:val(n);const g=new THREE.Group();g.position.set(xs(n),0,Z);towers.add(g);
      for(let k=0;k<h;k++){const c=unitBox(1,1,1,isM?'#ffd24a':VIBE[n%6],u);c.position.y=u/2+.03+k*u;g.add(c);}
      if(isM){const ring=mk(new THREE.BoxGeometry(u+.14,.02,u+.14),lam('#e2457a'),0);ring.position.y=.04;g.add(ring);A.drag(g,{tap:()=>setU(st.user+1)});const q=label(st.user?String(st.dec?(st.user/10).toFixed(1):st.user):'?',{size:.24,bg:'#ffffff',border:'#e2457a'});q.position.y=h*u+.4;g.add(q);}
      else{const l=label(st.dec?(h/10).toFixed(1):String(h),{size:.2,color:INK});l.position.y=h*u+.25;g.add(l);tops.push(V(xs(n),h*u+.06,Z+.3));}
      const tn=label('term '+(n+1),{size:.15,color:GREY});tn.position.set(0,.2,.6);g.add(tn);}
    for(let i=0;i<tops.length-1;i++){const a=tops[i],b=tops[i+1];const len=a.distanceTo(b);const seg=new THREE.Mesh(new THREE.CylinderGeometry(.02,.02,len,6),lam('#8b5cf6'));seg.position.copy(a).add(b).multiplyScalar(.5);
      seg.quaternion.setFromUnitVectors(V(0,1,0),b.clone().sub(a).normalize());line.add(seg);const dt=new THREE.Mesh(G('pdot',()=>new THREE.SphereGeometry(.05,10,8)),lam('#8b5cf6'));dt.position.copy(a);line.add(dt);}
    if(tops.length){const dt=new THREE.Mesh(G('pdot',()=>new THREE.SphereGeometry(.05,10,8)),lam('#8b5cf6'));dt.position.copy(tops[tops.length-1]);line.add(dt);}A.redraw();}
  function setU(n){n=Math.max(0,Math.min(20,n));if(n===st.user)return;st.user=n;A.pop();draw();if(mode==='play'&&n===val(st.miss))game.solved('Yes! Term '+(st.miss+1)+' is '+(st.dec?(n/10).toFixed(1):n)+'.');}
  function setRule(a,b){if(a<1||a>8||b<-3||b>4||a+5*b<1||a+5*b>20)return;st.a=a;st.b=b;draw();}
  draw();
  return {info:()=>'Rule: start '+st.a+', add '+st.b,
    controls:()=>mode==='play'?[{t:'− cube',fn:()=>setU(st.user-1)},{t:'+ cube',go:true,big:true,fn:()=>setU(st.user+1)}]:
      [{t:'Start −',fn:()=>setRule(st.a-1,st.b)},{t:'Start +',fn:()=>setRule(st.a+1,st.b)},{t:'Add −',fn:()=>setRule(st.a,st.b-1)},{t:'Add +',fn:()=>setRule(st.a,st.b+1)},{t:st.dec?'Each cube = 0.1':'Each cube = 1',on:st.dec,fn:()=>{st.dec=!st.dec;draw();}}],
    demo(n){st.miss=-1;st.dec=n==='decimal';st.a=3;st.b=2;draw();A.say(n==='decimal'?'0.3, 0.5, 0.7, 0.9, 1.1, 1.3':'3, 5, 7, 9, 11, 13');},
    task(r){st.dec=false;st.user=0;if(r===0){st.a=rnd(1,4);st.b=rnd(2,3);st.miss=5;}else if(r===1){st.a=rnd(1,3);st.b=rnd(2,3);st.miss=rnd(1,4);}
      else if(r===2){st.dec=true;st.a=rnd(1,3);st.b=2;st.miss=5;}else if(r===3){st.a=rnd(2,5);st.b=3;st.miss=4;}else{st.b=-rnd(2,3);st.a=6-5*st.b>20?16:rnd(-5*st.b+1,16);st.miss=rnd(2,5);}
      draw();const f=v=>st.dec?(v/10).toFixed(1):String(v);
      return r===4?'A *shrinking* pattern. Build the missing *term '+(st.miss+1)+'*.':r===2?'Each cube = 0.1. Build *term 6* of '+[0,1,2].map(n=>f(val(n))).join(', ')+'…':'Build the missing *term '+(st.miss+1)+'*. Find the rule first!';}};}
});

/* =========================================================
   14. Variables and equations to 50
   ========================================================= */
P.lesson({id:'equations4',title:'Variables and equations',strand:'Algebra',codes:['C2.1','C2.2'],
 guide:{goal:'Use symbols and letters as variables in expressions and equations, and solve equations involving whole numbers up to 50 using a balance model, then verify the solution.',words:'variable, expression, equation, solve, verify, balance, equivalent',
  ask:['What does n stand for in n + 17 = 42?','How can you check that your value of n is correct?','Why can 3 × n be shown as three bags with the same amount?'],home:'Make up a mystery number puzzle: “I am thinking of a number. I add 9 and get 30.” Write it with a letter.'},
 learn:[{say:'A letter can stand for a number.',speech:'In n plus seventeen equals forty-two, the letter n is a variable. Watch the balance. We change n until both sides are equal.',view:'model',demo:'solve'},
        {say:'Read about solving and verifying.',speech:'To solve an equation, find the value that makes both sides equal. To verify, put your answer back in and check that both sides match.',view:'read'},
        {say:'Watch: three bags of n.',speech:'Three times n equals twenty-four means three bags with the same amount in each. Each bag must hold eight.',view:'model',demo:'bags'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: balance the scale.',speech:'Your turn. Change n with the buttons until the scale balances.',view:'model'}],
 fig:'A pan balance. The purple bags each hold n.',rz:.15,
 explore:['Change *n* with *−1*, *+1*, *−10* and *+10*.','Each purple bag holds *n* cubes.','The scale is level when both sides are *equal*.'],
 tries:[['Solve: n + 13 = 31','*n = 18.* Check: 18 + 13 = 31.'],['Solve: 5 × k = 40','*k = 8.* Check: 5 × 8 = 40.'],['Solve: 45 − b = 29','*b = 16.* Check: 45 − 16 = 29.']],
 howTo:'Change n until the scale is level. Then n is the solution.',
 init:k=>({bags:1,c:17,total:42,n:0,txt:'n + 17 = 42'}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'A *variable* is a letter or symbol that stands for an unknown number. An *equation* says two sides are equal.')+18;
  rr(g,X0,y,TW,118,16);g.fillStyle=tint(acc(),.1);g.fill();T(g,'n + 17 = 42',X0+30,y+74,ZS(56),acc());T(g,'Try n = 25:  25 + 17 = 42  ✓',X0+400,y+72,FT.bodyB,'#16a36f');y+=150;
  y=para(p,y,'*Solve:* find the value that balances the equation. *Verify:* put it back in and check. For *4 × m = 36*, think “4 groups of what make 36?” *m = 9*.')+12;
  T(g,'Expression',X0,y+10,FT.smallB,acc());T(g,'n + 17   ·   3 × k',X0+220,y+10,FT.body);T(g,'Equation',X0,y+56,FT.smallB,acc());T(g,'n + 17 = 42',X0+220,y+56,FT.body);y+=92;
  y=keyWords(p,y,[['variable','a letter that stands for a number'],['verify','check a solution by substituting it']]);
  predict(p,y,S,'p14','Solve: 3 × t = 27','*t = 9.* 3 × 9 = 27.');},
 readout(p,S,y){const g=p.g,st=S.st,L=st.bags*st.n+st.c;T(g,st.txt,X0,y+50,ZS(50),acc());T(g,'n = '+st.n+'   →   '+(st.bags>1?st.bags+' × '+st.n:st.n)+(st.c?' + '+st.c:'')+' = '+L+(L===st.total?'  ✓ balanced':L<st.total?'  (too light)':'  (too heavy)'),X0,y+92,FT.bodyB,L===st.total?'#16a36f':INK);return y+102;},
 build(S,grp,mode,game){const st=S.st,PV=V(0,1.62,-1.45),ARM=1.5;let ang=0,tAng=0;
  const foot=mk(new THREE.BoxGeometry(1.2,.08,.7),lam('#8b5cf6'),20);foot.position.set(0,.04,PV.z);grp.add(foot);const post=mk(new THREE.BoxGeometry(.13,PV.y,.13),lam('#c9b8f2'),20);post.position.set(0,PV.y/2,PV.z);grp.add(post);
  const beam=new THREE.Group();beam.position.copy(PV);grp.add(beam);beam.add(mk(new THREE.BoxGeometry(3.2,.09,.14),lam('#8b5cf6'),20));
  const pans=[-1,1].map(()=>{const g=new THREE.Group();g.add(mk(new THREE.CylinderGeometry(.68,.6,.06,32),lam('#ffd24a'),30));const rod=new THREE.Mesh(new THREE.CylinderGeometry(.015,.015,.7,6),lam(INK));rod.position.y=.38;g.add(rod);
    const cg=new THREE.Group();g.add(cg);g.userData.cg=cg;grp.add(g);return g;});const u=.1;
  function blocks(cg,v,x0,col){const tens=Math.floor(v/10),ones=v%10;let x=x0;for(let i=0;i<tens;i++){const r=unitBox(1,10,1,col,u);r.position.set(x,.03+.5,0);r.rotation.x=0;cg.add(r);x+=u+.01;}
    for(let i=0;i<ones;i++){const c=unitBox(1,1,1,col,u);c.position.set(x+Math.floor(i/5)*(u+.01),.03+u/2+(i%5)*u,0);cg.add(c);}return x+Math.ceil(ones/5)*(u+.01);}
  const nL=label('',{size:.24,bg:'#ffffff',border:'#8b5cf6'});grp.add(nL);
  function fill(){const L=pans[0].userData.cg,R=pans[1].userData.cg;clearGroup(L);clearGroup(R);
    const bw=.34;for(let b=0;b<st.bags;b++){const bag=new THREE.Group();const sk=mk(G('bag',()=>new THREE.CylinderGeometry(.13,.16,.36,16)),lam('#8b5cf6'),0);sk.position.y=.21;bag.add(sk);
      const tie=mk(G('bagt',()=>new THREE.SphereGeometry(.07,10,8)),lam('#c9b8f2'),0);tie.position.y=.42;bag.add(tie);const t=label('n',{size:.18,color:'#fff'});t.position.set(0,.24,.17);bag.add(t);bag.position.set(-.45+b*bw,0,-.15);L.add(bag);A.drag(bag,{tap:()=>setN(st.n+1)});}
    if(st.c)blocks(L,st.c,-.5,'#16a36f');blocks(R,st.total,-.45,'#2f7de1');
    const Lv=st.bags*st.n+st.c;tAng=Math.max(-.3,Math.min(.3,(Lv-st.total)*.02));}
  function place(){beam.rotation.z=ang;[-1,1].forEach((s,i)=>pans[i].position.set(PV.x+s*ARM*Math.cos(ang),PV.y+s*ARM*Math.sin(ang)-.76,PV.z));nL.userData.set('n = '+st.n);nL.position.set(pans[0].position.x,pans[0].position.y+1.0,PV.z);}
  function setN(n){n=Math.max(0,Math.min(50,n));if(n===st.n)return;st.n=n;A.pop();fill();const ok=st.bags*n+st.c===st.total;if(ok){A.good('Balanced! n = '+n+'.',V(W/2,PY+2,PV.z));if(mode==='play')game.solved(st.txt.replace(/[a-z]/,String(n))+' ✓  so n = '+n);}A.redraw();}
  function setUp(bags,c,total,txt){st.bags=bags;st.c=c;st.total=total;st.txt=txt;st.n=0;fill();A.redraw();}
  fill();ang=tAng;place();
  return {tick(dt){ang+=(tAng-ang)*Math.min(1,dt*4);place();},info:()=>st.txt+'   (n = '+st.n+')',
    controls:()=>[{t:'−10',fn:()=>setN(st.n-10)},{t:'−1',big:true,fn:()=>setN(st.n-1)},{t:'+1',big:true,go:true,fn:()=>setN(st.n+1)},{t:'+10',fn:()=>setN(st.n+10)}].concat(mode==='learn'?[{t:'New puzzle',fn:()=>{const n=rnd(5,30),c=rnd(3,20);setUp(1,c,n+c,'n + '+c+' = '+(n+c));}}]:[]),
    demo(n){if(n==='solve'){setUp(1,17,42,'n + 17 = 42');A.seq([[700,()=>setN(10)],[800,()=>setN(20)],[800,()=>setN(30)],[900,()=>setN(26)],[700,()=>setN(25)]]);}
      if(n==='bags'){setUp(3,0,24,'3 × n = 24');const l=[];for(let i=1;i<=8;i++)l.push([i===1?800:450,()=>setN(i)]);A.seq(l);}},
    task(r){let hint='';if(r===0){const n=rnd(8,30),c=rnd(6,19);setUp(1,c,n+c,'n + '+c+' = '+(n+c));}
      else if(r===1){const k=rnd(15,35),c=rnd(5,12);setUp(1,0,k+c,'n − '+c+' = '+k);hint=' (Think: n = '+k+' + '+c+'.)';}
      else if(r===2){const k=rnd(3,5),n=rnd(4,9);setUp(k,0,k*n,k+' × n = '+k*n);}
      else if(r===3){const n=rnd(5,12),c=rnd(3,9);setUp(2,c,2*n+c,'2 × n + '+c+' = '+(2*n+c));}
      else{const n=rnd(8,25),T2=rnd(n+10,50);setUp(1,T2-n,T2,T2+' − n = '+(T2-n));hint=' (Think: n + '+(T2-n)+' = '+T2+'.)';}
      return 'Solve *'+st.txt+'*. Balance the scale.'+hint;}};}
});

/* =========================================================
   15. Inequalities
   ========================================================= */
P.lesson({id:'inequal',title:'Inequalities on a number line',strand:'Algebra',codes:['C2.3'],
 guide:{goal:'Solve inequalities involving addition and subtraction of whole numbers up to 20, verify the solutions, and graph them on a number line.',words:'inequality, less than (<), greater than (>), solution, graph, verify',
  ask:['How is x + 6 < 14 different from x + 6 = 14?','Is 8 a solution? How do you check?','Why does the graph of x − 3 > 9 go to the right?'],home:'“You need more than 12 points to win. You have 5. How many more could you get?” List all the answers.'},
 learn:[{say:'An inequality has many answers.',speech:'x plus six is less than fourteen. Which whole numbers work? Watch: zero works, one works, all the way up to seven. Eight does not, because eight plus six is fourteen, not less.',view:'model',demo:'solve'},
        {say:'Read how to graph solutions.',speech:'We graph the solutions by marking each one on a number line. Less than means the solutions are on the small side.',view:'read'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: mark the solutions.',speech:'Your turn. Tap numbers on the number line to test them. Mark every solution, then press Check.',view:'model'}],
 fig:'A number line from 0 to 20. Green beads mark solutions.',rz:-.15,
 explore:['*Tap a number* to test it and mark it.','The sign tells if it works: *✓* or *✗*.','Press *Check* when all solutions are marked.'],
 tries:[['Is 5 a solution of x + 9 > 15?','*No.* 5 + 9 = 14, and 14 is not greater than 15.'],['List the whole-number solutions of x + 3 < 7.','*0, 1, 2, 3.*'],['x − 4 > 10. What is the smallest whole-number solution?','*15.* 15 − 4 = 11 > 10, but 14 − 4 = 10 is not.']],
 howTo:'Tap every whole number from 0 to 20 that makes the inequality true, then press Check.',
 init:k=>({a:6,b:14,op:'+',rel:'<',marks:[],test:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'An *inequality* compares two amounts that are *not equal*: *<* means less than, *>* means greater than. It can have *many* solutions.')+18;
  T(g,'x + 6 < 14',X0,y+40,ZS(52),acc());y+=80;const lx=X0+20,lw=TW-40,toX=v=>lx+v/12*lw;g.strokeStyle=INK;g.lineWidth=4;g.beginPath();g.moveTo(lx,y+40);g.lineTo(lx+lw,y+40);g.stroke();
  for(let v=0;v<=12;v++){const x=toX(v);g.lineWidth=2;g.beginPath();g.moveTo(x,y+28);g.lineTo(x,y+52);g.stroke();T(g,String(v),x,y+84,FT.small,INK,'center');if(v<=7){g.beginPath();g.arc(x,y+40,13,0,Math.PI*2);g.fillStyle='#16a36f';g.fill();}}
  T(g,'solutions: 0, 1, 2, 3, 4, 5, 6, 7',X0,y+128,FT.bodyB,'#16a36f');y+=178;
  y=para(p,y,'*Verify* each one: 7 + 6 = 13 < 14 ✓, but 8 + 6 = 14, and 14 is *not* less than 14 ✗.')+12;
  y=keyWords(p,y,[['inequality','a number sentence with < or >'],['graph','show the solutions on a number line']]);
  predict(p,y,S,'p15','Which whole numbers up to 20 solve x − 2 > 15?','*18, 19 and 20.* 18 − 2 = 16 > 15, but 17 − 2 = 15 is not greater.');},
 readout(p,S,y){const g=p.g,st=S.st,ex='x '+(st.op==='+'?'+':'−')+' '+st.a+' '+st.rel+' '+st.b;T(g,ex,X0,y+52,ZS(54),acc());
  if(st.test!=null&&st.op==='−'&&st.test<st.a){T(g,st.test+' − '+st.a+' would be less than 0: not a whole number  ✗',X0,y+94,FT.bodyB,RED);}else if(st.test!=null){const v=st.op==='+'?st.test+st.a:st.test-st.a,ok=st.rel==='<'?v<st.b:v>st.b;T(g,st.test+' '+(st.op==='+'?'+':'−')+' '+st.a+' = '+v+'   '+(ok?st.rel+' '+st.b+'  ✓':'not '+(st.rel==='<'?'less than':'greater than')+' '+st.b+'  ✗'),X0,y+94,FT.bodyB,ok?'#16a36f':RED);}
  return y+104;},
 build(S,grp,mode,game){const st=S.st,Z=-1.3,L=4.2,x0=-2.1,toX=v=>x0+v/20*L;const tr=mk(new THREE.BoxGeometry(L+.2,.06,.14),lam('#cbd5e6'),0);tr.position.set(0,.03,Z);grp.add(tr);
  const pads=[];for(let v=0;v<=20;v++){const pd=mk(G('ipad',()=>new THREE.CylinderGeometry(.085,.085,.06,16)),lam('#ffffff'),20);pd.position.set(toX(v),.08,Z);grp.add(pd);pads.push(pd);A.drag(pd,{tap:()=>tap(v)});
    const l=label(String(v),{size:.18});l.position.set(toX(v),.3,Z+.28+(v%2?.18:0));grp.add(l);}
  const beads=new THREE.Group();grp.add(beads);const tok=mk(new THREE.ConeGeometry(.1,.25,16),lam('#ffd24a'),0);tok.rotation.x=Math.PI;tok.visible=false;grp.add(tok);
  const exL=label('',{size:.4,bg:'#ffffff'});exL.position.set(0,1.5,Z-.7);grp.add(exL);
  function ok(v){if(st.op==='−'&&v<st.a)return false;const r=st.op==='+'?v+st.a:v-st.a;return st.rel==='<'?r<st.b:r>st.b;}
  function sols(){const s=[];for(let v=0;v<=20;v++)if(ok(v))s.push(v);return s;}
  function draw(){clearGroup(beads);st.marks.forEach(v=>{const b=mk(G('ibead',()=>new THREE.SphereGeometry(.11,14,10)),lam('#16a36f'),0);b.position.set(toX(v),.22,Z);beads.add(b);A.drag(b,{tap:()=>tap(v)});});
    exL.userData.set('x '+(st.op==='+'?'+':'−')+' '+st.a+' '+st.rel+' '+st.b);A.redraw();}
  function tap(v){st.test=v;tok.visible=true;tok.position.set(toX(v),.55,Z);const i=st.marks.indexOf(v);if(i>=0)st.marks.splice(i,1);else st.marks.push(v);A.pop();draw();}
  function check(){const s=sols(),m=st.marks.slice().sort((a,b)=>a-b);const missing=s.filter(v=>!m.includes(v)),wrong=m.filter(v=>!s.includes(v));
    if(!missing.length&&!wrong.length){A.good('All '+s.length+' solutions found!');if(mode==='play')game.solved('Solutions: '+s[0]+' to '+s[s.length-1]+'.');}
    else if(wrong.length)A.bad(wrong[0]+' is not a solution. Test it!');else A.bad('Some solutions are missing. Try '+missing[0]+'.');}
  function setUp(op,a,rel,b){st.op=op;st.a=a;st.rel=rel;st.b=b;st.marks=[];st.test=null;tok.visible=false;draw();}
  draw();
  return {info:()=>'Marked: '+(st.marks.length?st.marks.slice().sort((a,b)=>a-b).join(', '):'none'),
    controls:()=>[{t:'Check',go:true,big:true,fn:check},{t:'Clear marks',fn:()=>{st.marks=[];draw();}}].concat(mode==='learn'?[{t:'Show all',fn:()=>{st.marks=sols();draw();}},{t:'New inequality',fn:()=>{const a=rnd(2,8);Math.random()<.5?setUp('+',a,'<',rnd(a+3,18)):setUp('−',a,'>',rnd(5,20-a-2));}}]:[]),
    demo(){setUp('+',6,'<',14);const l=[];for(let v=0;v<=8;v++)l.push([450,()=>{if(v<8)tap(v);else{st.test=8;tok.position.set(toX(8),.55,Z);A.redraw();A.say('8 + 6 = 14 is not less than 14.');}}]);A.seq(l);},
    task(r){const T5=[()=>{const a=rnd(3,8);setUp('+',a,'<',rnd(a+3,a+8));},()=>{const a=rnd(2,6);setUp('−',a,'>',rnd(10,20-a-2));},()=>{const a=rnd(9,14);setUp('+',a,'>',rnd(a+4,a+10));},
      ()=>{const a=rnd(4,9);setUp('−',a,'<',rnd(3,8));},()=>{const a=rnd(5,10);setUp('+',a,'<',rnd(a+2,a+6));}];T5[r]();
      return 'Mark *every* whole number from 0 to 20 that solves *x '+(st.op==='+'?'+':'−')+' '+st.a+' '+st.rel+' '+st.b+'*, then press Check.';}};}
});

/* =========================================================
   16. Coding with nested loops
   ========================================================= */
const LV4=[{s:[0,5,0],goal:[2,5],rocks:[[1,5],[1,4]],hint:'↑ ↑ ↻ in a loop'},
  {s:[0,5,0],goal:[3,2],rocks:[[0,3],[2,4],[3,3],[1,2]],hint:'stairs'},
  {s:[0,0,1],goal:[4,4],rocks:[[2,0],[3,1],[4,2],[5,3]],hint:'zigzag'},
  {s:[0,5,0],goal:[3,2],rocks:[[1,4],[2,3],[1,3]],hint:'↑ ×3 then ↻'},
  {s:[5,5,0],goal:[3,3],rocks:[[5,3],[4,5],[3,4]],hint:'↑ ↺ ↑ ↻'}];
P.lesson({id:'coding4',title:'Coding with nested loops',strand:'Algebra',codes:['C3.1','C3.2'],
 guide:{goal:'Write, run, read and alter code that uses sequential, repeating and nested events, and describe how changing the code changes the outcome.',words:'program, sequence, loop, nested loop, repeat, debug, outcome',
  ask:['What happens if you change Repeat 3 to Repeat 4?','Why is a nested loop shorter than writing every step?','The robot stopped one square short. Which number is the bug?'],home:'Write “dance code” with a nested loop: Repeat 3 { clap, clap, spin }. Act it out together.'},
 learn:[{say:'A loop inside a loop is nested.',speech:'This program repeats a group of steps. Inside the group, forward runs twice. That is a loop inside a loop, a nested loop. Watch the robot walk the steps.',view:'model',demo:'run'},
        {say:'Read about nested loops.',speech:'Repeat three times: forward, turn right, forward, turn left. The group runs three times, so the robot climbs three stairs.',view:'read'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: write a nested loop.',speech:'Your turn. Build the group of steps, set how many times it repeats, then press Run.',view:'model'}],
 fig:'A robot on a grid. The group of steps repeats.',rz:.8,
 explore:['Add *Forward*, *Left*, *Right* to the group.','Use *× repeat* on a step, and *Repeat ±* for the whole group.','Press *Run* or tap the robot.'],
 tries:[['Repeat 4 { ↑ ×2, ↻ } — what shape does the path make?','*A square.* 4 sides of 2 squares, turning right each time.'],['How many forward steps run in Repeat 3 { ↑ ×2 }?','*6.* 3 × 2 = 6.'],['Repeat 2 { ↑, ↻ } should make the robot face south. Does it?','*Yes.* Two right turns from north is south.']],
 howTo:'Write a group of up to 4 steps and choose how many times the group repeats, so the robot reaches the star.',
 init:k=>({li:k==='play'?0:1,body:k==='play'?[]:[{cmd:'F',n:1},{cmd:'R',n:1},{cmd:'F',n:1},{cmd:'L',n:1}],rep:k==='play'?1:3,active:-1}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'A *loop* repeats steps. A *nested loop* is a loop *inside* another loop. It makes long programs short.')+16;
  rr(g,X0,y,470,250,16);g.fillStyle='#24203f';g.fill();T(g,'Repeat 3 times {',X0+26,y+52,FT.mono,'#ffd86b');['↑  Forward','↻  Turn right','↑  Forward','↺  Turn left'].forEach((l,i)=>T(g,l,X0+70,y+98+i*36,'700 26px "Atkinson Hyperlegible", monospace',['#9fe6ff','#ffb3cf','#9fe6ff','#c9b8ff'][i]));T(g,'}',X0+26,y+238,FT.mono,'#ffd86b');
  const gx=X0+520,gy=y+10,s=46;for(let i=0;i<5;i++)for(let j=0;j<6;j++){g.fillStyle=(i+j)%2?'#efeafe':'#ffffff';g.fillRect(gx+j*s,gy+i*s,s,s);g.strokeStyle='#d8cff8';g.lineWidth=2;g.strokeRect(gx+j*s,gy+i*s,s,s);}
  g.strokeStyle='#e2457a';g.lineWidth=5;g.beginPath();g.moveTo(gx+s/2,gy+4.5*s);[[0,3.5],[1,3.5],[1,2.5],[2,2.5],[2,1.5],[3,1.5]].forEach(([c,r])=>g.lineTo(gx+(c+.5)*s,gy+r*s));g.stroke();T(g,'★',gx+3.5*s,gy+1.5*s+12,'700 34px serif','#f2a400','center');
  y+=284;y=para(p,y,'The group runs *3 times*, so 4 blocks do the work of 12 steps. Changing the repeat number changes the *outcome*.')+14;
  y=keyWords(p,y,[['nested loop','a loop inside another loop'],['outcome','what happens when the code runs']]);
  predict(p,y,S,'p16','Repeat 2 { ↑ ×3, ↻ }. How many squares does the robot move in all?','*6 squares.* 2 × 3 = 6 forward steps.');},
 readout(p,S,y){const g=p.g,st=S.st,NM={F:'↑',L:'↺',R:'↻'};T(g,'Repeat '+st.rep+' × {',X0,y+34,FT.bodyB,acc());let x=X0+210;
  if(!st.body.length)T(g,'add steps',x,y+34,FT.cap,GREY);st.body.forEach((b,i)=>{const lab=NM[b.cmd]+(b.n>1?' ×'+b.n:'');g.font=FT.bodyB;const w=g.measureText(lab).width+26;rr(g,x,y,w,46,10);
    g.fillStyle=st.active===i?'#ffd86b':{F:'#d9f0ff',L:'#efe5ff',R:'#ffe3ee'}[b.cmd];g.fill();g.lineWidth=2;g.strokeStyle=INK;g.stroke();T(g,lab,x+13,y+33,FT.bodyB);x+=w+8;});T(g,'}',x+4,y+34,FT.bodyB,acc());return y+62;},
 build(S,grp,mode,game){const st=S.st,N=6,Tl=.56,cz=-1.35;const cw=(c,r)=>V((c-2.5)*Tl,0,(r-2.5)*Tl+cz);const tg=G('tile4',()=>new THREE.BoxGeometry(Tl-.04,.05,Tl-.04));
  for(let r=0;r<N;r++)for(let c=0;c<N;c++){const t=mk(tg,lam((r+c)%2?'#e6dcff':'#f7f3ff'),20);t.position.copy(cw(c,r));t.position.y=.025;grp.add(t);}
  const nl=label('N',{size:.3,color:'#8b5cf6'});nl.position.set(1.9,.3,cz-1.85);grp.add(nl);const lvl=new THREE.Group();grp.add(lvl);const trail=new THREE.Group();grp.add(trail);
  const robot=new THREE.Group();robot.scale.setScalar(.72);const body=mk(G('rbody',()=>new THREE.BoxGeometry(.46,.36,.4)),lam('#4fb3ff'),20);body.position.y=.18;robot.add(body);
  const head=mk(G('rhead',()=>new THREE.BoxGeometry(.36,.26,.32)),lam('#d8e8ff'),20);head.position.y=.5;robot.add(head);const eg=G('reye',()=>new THREE.BoxGeometry(.07,.07,.02));[-.08,.08].forEach(x=>{const e=new THREE.Mesh(eg,lam(INK));e.position.set(x,.52,-.165);robot.add(e);});
  const lampM=new THREE.MeshLambertMaterial({color:'#ff6b6b',emissive:'#000000'});const bob=new THREE.Mesh(G('rbob',()=>new THREE.SphereGeometry(.06,10,8)),lampM);bob.position.y=.8;robot.add(bob);
  robot.traverse(o=>{if(o.isMesh)o.castShadow=true;});grp.add(robot);A.drag(robot,{tap:()=>run()});
  let rc,rrw,dir,ang,goal,running=false,steps=[],si=0,timer=0;
  function load(){clearGroup(lvl);const L=LV4[st.li];L.rocks.forEach(([c,r],i)=>{const k=mk(G('rock4',()=>new THREE.DodecahedronGeometry(.2,0)),lam('#b9c0cd'),20);k.position.copy(cw(c,r));k.position.y=.22;k.rotation.set(i,i*2,0);lvl.add(k);});
    goal=mk(starGeo,lam('#ffcf3f'),20);goal.position.copy(cw(L.goal[0],L.goal[1]));goal.position.y=.42;lvl.add(goal);reset(true);}
  function reset(quiet){const L=LV4[st.li];rc=L.s[0];rrw=L.s[1];dir=L.s[2];ang=-dir*Math.PI/2;const p=cw(rc,rrw);p.y=.05;robot.position.copy(p);robot.rotation.y=ang;robot.userData.tPos=null;robot.userData.tRotY=null;running=false;st.active=-1;clearGroup(trail);if(!quiet)A.redraw();}
  const add=k=>{if(running)return;if(st.body.length>=4){A.bad('The group holds 4 steps. Use × repeat or the outer Repeat.');return;}st.body.push({cmd:k,n:1});A.redraw();};
  const rep=()=>{if(running||!st.body.length)return;const b=st.body[st.body.length-1];b.n=b.n>=4?1:b.n+1;A.redraw();};
  function run(){if(running)return;if(!st.body.length){A.say('Add some steps first.');return;}reset(true);steps=[];for(let k=0;k<st.rep;k++)st.body.forEach((b,bi)=>{for(let j=0;j<b.n;j++)steps.push({cmd:b.cmd,bi});});si=0;timer=.2;running=true;A.say('Running: Repeat '+st.rep+'…');}
  function finish(ok,msg){running=false;st.active=-1;lampM.emissive.set('#000000');if(ok){A.good(msg,goal.getWorldPosition(V(0,0,0)));if(mode==='play')game.solved('The robot reached the star!');}else A.bad(msg);A.redraw();}
  function step(){if(si>=steps.length){const L=LV4[st.li];if(rc===L.goal[0]&&rrw===L.goal[1])finish(true,'The robot reached the star!');else finish(false,'The robot stopped before the star. Change a number and run again.');return;}
    const s=steps[si++];st.active=s.bi;lampM.emissive.set(si%2?'#ff2a2a':'#000000');A.redraw();
    if(s.cmd==='L'){dir=(dir+3)%4;ang+=Math.PI/2;moveTo(robot,{rotY:ang,k:12});}else if(s.cmd==='R'){dir=(dir+1)%4;ang-=Math.PI/2;moveTo(robot,{rotY:ang,k:12});}
    else{const dc=[0,1,0,-1][dir],dr=[-1,0,1,0][dir],nc=rc+dc,nr=rrw+dr,L=LV4[st.li];const off=nc<0||nr<0||nc>=N||nr>=N,rock=L.rocks.some(([c,r])=>c===nc&&r===nr);
      if(off||rock){const here=cw(rc,rrw);here.y=.05;moveTo(robot,{pos:here.clone().add(V(dc*Tl*.3,0,dr*Tl*.3)),k:18,done:()=>moveTo(robot,{pos:here,k:14})});finish(false,off?'Oops! Off the board. Debug your code.':'Bonk! The robot hit a rock. Find the bug.');return;}
      const d=mk(G('trd',()=>new THREE.CylinderGeometry(.06,.06,.02,10)),lam('#e2457a'),0);const hp=cw(rc,rrw);d.position.set(hp.x,.07,hp.z);trail.add(d);rc=nc;rrw=nr;const p=cw(rc,rrw);p.y=.05;moveTo(robot,{pos:p,k:10});A.pop();}}
  load();
  return {tick(dt,t){if(goal)goal.rotation.y=t*1.5;if(running){timer-=dt;if(timer<=0){timer=.42;step();}}},info:()=>'Level '+(st.li+1)+': get to the star with a nested loop.',
    controls:()=>[{t:'↑ Forward',fn:()=>add('F')},{t:'↺ Left',fn:()=>add('L')},{t:'↻ Right',fn:()=>add('R')},{t:'× repeat step',fn:rep},{t:'Repeat −',fn:()=>{st.rep=Math.max(1,st.rep-1);A.redraw();}},{t:'Repeat +',fn:()=>{st.rep=Math.min(6,st.rep+1);A.redraw();}},
      {t:'▶ Run',go:true,fn:run},{t:'Undo',fn:()=>{if(!running){st.body.pop();A.redraw();}}},{t:'Clear',fn:()=>{if(!running){st.body=[];st.rep=1;reset();}}}].concat(mode==='learn'?[{t:'Next level',fn:()=>{st.li=(st.li+1)%LV4.length;st.body=[];st.rep=1;load();A.redraw();}}]:[]),
    demo(){st.li=1;st.body=[{cmd:'F',n:1},{cmd:'R',n:1},{cmd:'F',n:1},{cmd:'L',n:1}];st.rep=3;load();A.redraw();A.seq([[900,run]]);},
    task(r){st.li=r;st.body=[];st.rep=1;if(r===3){st.body=[{cmd:'F',n:3},{cmd:'R',n:1}];st.rep=1;}load();
      return r===3?'Fix the bug: this code should reach the star. *Change one number*, then Run.':'Level *'+(r+1)+'*: reach the star with a *repeating group* of steps.';}};}
});

/* =========================================================
   17. Qualitative and quantitative data; stem-and-leaf plots
   ========================================================= */
const DCARDS=[['favourite colour','Q'],['height in cm','N'],['type of pet','Q'],['number of siblings','N'],['shoe size','N'],['favourite sport','Q'],['minutes to get to school','N'],['eye colour','Q'],['month of birthday','Q'],['hours of sleep','N'],['favourite fruit','Q'],['number of books read','N']];
P.lesson({id:'datatypes',title:'Kinds of data and stem-and-leaf plots',strand:'Data',codes:['D1.1','D1.2'],
 guide:{goal:'Describe the difference between qualitative and quantitative data, collect data to compare sets, and organize data in frequency tables and stem-and-leaf plots.',words:'qualitative data, quantitative data, primary data, secondary data, frequency table, stem-and-leaf plot, stem, leaf',
  ask:['Is “favourite colour” data counted or described?','Why can we find a mean for heights but not for favourite colours?','In a stem-and-leaf plot, what does 4 | 7 mean?'],home:'Collect quantitative data together: the number of steps from the door to your bed for everyone at home. Make a stem-and-leaf plot.'},
 learn:[{say:'Data can be words or numbers.',speech:'Qualitative data uses words, like favourite colour. Quantitative data uses numbers you can measure or count, like height in centimetres. Watch the cards sort themselves.',view:'model',demo:'sort'},
        {say:'Read about stem-and-leaf plots.',speech:'A stem-and-leaf plot organizes numbers. The tens digit is the stem, and the ones digit is the leaf. Four, seven means forty-seven.',view:'read'},
        {say:'Watch: building a stem-and-leaf plot.',speech:'Watch each number drop its ones digit onto the right stem. The leaves line up in order, so you can see the shape of the data.',view:'model',demo:'stem'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: sort and plot.',speech:'Your turn. Drag each card to the right bin, or switch to the stem-and-leaf plot and add values.',view:'model'}],
 fig:'Sort data cards, or build a stem-and-leaf plot.',rz:.45,
 explore:['*Drag* a card into the *words* or *numbers* bin.','Switch to *Stem-and-leaf* and press *Add value*.','Each leaf is the *ones digit*.'],
 tries:[['Is “number of pets” qualitative or quantitative?','*Quantitative.* It is a number you count.'],['Stems 3 | 1 4 8. What numbers are shown?','*31, 34 and 38.*'],['You read class results on a school website. Is that primary or secondary data?','*Secondary data.* Someone else collected it.']],
 howTo:'Sort each card into the right bin, or read the stem-and-leaf plot to answer the question.',
 init:k=>({mode:'sort',ci:0,placed:[],data:[23,31,34,38,42,45,45,47,51,56],shown:0,ask:null,want:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'*Qualitative* data is described in *words* (colours, sports). *Quantitative* data is *numbers* you count or measure (heights, times).')+16;
  [['QUALITATIVE','words','#f08a24',['red','soccer','cat']],['QUANTITATIVE','numbers','#2f7de1',['132 cm','3 siblings','12 min']]].forEach(([a,b,c,ex],i)=>{const x=X0+i*(TW/2+8);rr(g,x,y,TW/2-8,150,16);g.fillStyle=tint(c,.14);g.fill();
    T(g,a,x+20,y+40,FT.eyebrow,c);T(g,b,x+20,y+76,FT.bodyB);T(g,ex.join(' · '),x+20,y+118,FT.small,GREY);});y+=182;
  T(g,'Stem-and-leaf plot: ages at a party',X0,y,FT.smallB,acc());y+=14;[['2','3'],['3','1 4 8'],['4','2 5 5 7'],['5','1 6']].forEach(([s,l],i)=>{T(g,s,X0+40,y+40+i*42,ZS(36),INK,'center');g.fillStyle=INK;g.fillRect(X0+76,y+12+i*42,3,40);T(g,l,X0+100,y+40+i*42,ZS(36),'#16a36f');});
  T(g,'Key: 4 | 7 means 47',X0+400,y+60,FT.bodyB);T(g,'Data collected yourself is primary;',X0+400,y+110,FT.small,GREY);T(g,'data from others is secondary.',X0+400,y+140,FT.small,GREY);y+=208;
  y=keyWords(p,y,[['frequency table','a table of how often each value appears'],['stem and leaf','the tens digit and the ones digit of each value']]);
  predict(p,y,S,'p17','In the plot above, how many people are in their 40s?','*4 people:* 42, 45, 45 and 47.');},
 readout(p,S,y){const g=p.g,st=S.st;if(st.mode==='sort'){const c=DCARDS[st.ci%DCARDS.length];T(g,'Card: “'+c[0]+'”',X0,y+44,FT.bodyB,acc());T(g,'Sorted: '+st.placed.length,X0,y+84,FT.body,GREY);return y+94;}
  const sh=st.data.slice(0,st.shown);T(g,'Data: '+(sh.length?sh.join(', '):'press Add value'),X0,y+44,FT.bodyB,acc());if(sh.length)T(g,'Least '+Math.min(...sh)+'   ·   Greatest '+Math.max(...sh)+'   ·   '+sh.length+' values',X0,y+84,FT.body);return y+94;},
 build(S,grp,mode,game){const st=S.st,Z=-1.55;const sortG=new THREE.Group(),stemG=new THREE.Group();grp.add(sortG,stemG);
  const bins=[{x:-1.3,c:'#f08a24',t:'Words (qualitative)',k:'Q'},{x:1.3,c:'#2f7de1',t:'Numbers (quantitative)',k:'N'}].map(b=>{const g=new THREE.Group();g.position.set(b.x,0,Z);sortG.add(g);
    const tray=mk(new THREE.BoxGeometry(1.9,.18,1.5),lam(b.c),20);tray.position.y=.09;g.add(tray);const inn=mk(new THREE.BoxGeometry(1.75,.05,1.35),lam('#ffffff'),0);inn.position.y=.2;g.add(inn);
    const l=label(b.t,{size:.19,color:b.c});l.position.set(0,.45,-.95);g.add(l);g.userData=Object.assign(g.userData,b);A.drag(g,{tap:()=>place(b.k)});return g;});
  let cur=null;
  function newCard(){if(cur){A.unclick(cur);sortG.remove(cur);disposeObj(cur);}const c=DCARDS[st.ci%DCARDS.length];cur=card(c[0],'#fffbe8',1.6,.5);cur.position.set(0,.35,Z+1.25);sortG.add(cur);
    A.drag(cur,{h:.4,drop:pos=>{const b=bins.find(q=>Math.abs(pos.x-q.position.x)<1&&Math.abs(pos.z-Z)<.9);if(b)place(b.userData.k);else if(cur)moveTo(cur,{pos:V(0,.35,Z+1.25),k:10});}});A.redraw();}
  function place(k){if(!cur)return;const c=DCARDS[st.ci%DCARDS.length];const b=bins.find(q=>q.userData.k===k);if(c[1]!==k){A.bad('“'+c[0]+'” is '+(c[1]==='Q'?'described with words.':'a number you can count or measure.'));moveTo(cur,{pos:V(0,.35,Z+1.25),k:10});return;}
    const m=cur;cur=null;A.unclick(m);const n=st.placed.filter(x=>x===k).length;moveTo(m,{pos:V(b.position.x,.26+n*.07,Z+.1-n*.02),k:9});st.placed.push(k);A.good('Yes! '+(k==='Q'?'Qualitative: words.':'Quantitative: numbers.'));
    if(mode==='play'&&st.want==='sort')game.solved('“'+c[0]+'” is '+(k==='Q'?'qualitative.':'quantitative.'));else{st.ci++;A.later(()=>{if(st.mode==='sort'&&mode!=='play')newCard();},700);}A.redraw();}
  const stems=[2,3,4,5];
  function drawStem(){clearGroup(stemG);stems.forEach((s,i)=>{const z=Z-1+i*.55;const b=mk(G('stemb',()=>new THREE.BoxGeometry(.5,.3,.45)),lam('#16a36f'),20);b.position.set(-1.8,.15,z);stemG.add(b);
      const l=label(String(s),{size:.3,color:'#fff'});l.position.set(-1.8,.45,z);stemG.add(l);});const bar=mk(new THREE.BoxGeometry(.06,.05,2.3),lam(INK),0);bar.position.set(-1.45,.03,Z-.18);stemG.add(bar);
    const sh=st.data.slice(0,st.shown).slice().sort((a,b)=>a-b);const cnt={};sh.forEach(v=>{const s=Math.floor(v/10),k=cnt[s]||0;cnt[s]=k+1;const z=Z-1+(s-2)*.55;const c=mk(G('leafc',()=>new THREE.BoxGeometry(.36,.3,.36)),lam('#c9f0dd'),20);
      c.position.set(-1.1+k*.45,.15,z);stemG.add(c);const l=label(String(v%10),{size:.26,color:INK});l.position.set(-1.1+k*.45,.48,z);stemG.add(l);});
    const key=label('Key: 4 | 7 = 47',{size:.2,bg:'#ffffff'});key.position.set(1.4,.4,Z+.9);stemG.add(key);A.redraw();}
  function setMode(m){st.mode=m;sortG.visible=m==='sort';stemG.visible=m==='stem';if(m==='sort')newCard();else drawStem();A.redraw();}
  setMode(st.mode);
  return {info:()=>st.mode==='sort'?'Sort the card into the right bin':'Stem-and-leaf plot: '+st.shown+' values',
    controls:()=>{if(mode==='play'&&st.ask)return choices(game,st.ask.opts,st.ask.ans,st.ask.ok);if(st.mode==='sort')return [{t:'Words',big:true,fn:()=>place('Q')},{t:'Numbers',big:true,fn:()=>place('N')}].concat(mode==='learn'?[{t:'Stem-and-leaf',fn:()=>setMode('stem')}]:[]);
      return [{t:'Add value',go:true,fn:()=>{if(st.shown<st.data.length){st.shown++;A.pop();drawStem();}}},{t:'Start over',fn:()=>{st.shown=0;drawStem();}},{t:'Sort cards',fn:()=>setMode('sort')}];},
    demo(n){if(n==='sort'){setMode('sort');A.seq([[900,()=>place(DCARDS[st.ci%DCARDS.length][1])],[1300,()=>place(DCARDS[st.ci%DCARDS.length][1])],[1300,()=>place(DCARDS[st.ci%DCARDS.length][1])]]);}
      if(n==='stem'){st.shown=0;setMode('stem');const l=[];for(let i=0;i<st.data.length;i++)l.push([450,()=>{st.shown++;drawStem();}]);A.seq(l);}},
    task(r){st.ask=null;st.want=null;if(r<3){st.want='sort';st.ci=rnd(0,DCARDS.length-1);setMode('sort');return 'Sort the card: is *“'+DCARDS[st.ci][0]+'”* words or numbers?';}
      const base=rnd(2,3);st.data=Array.from({length:9},()=>rnd(base*10,base*10+29)).sort((a,b)=>a-b);st.shown=9;setMode('stem');
      if(r===3){const mx=Math.max(...st.data);st.ask={ans:mx,opts:opts(mx,[-1,-2,1,-10,10],20),ok:'Yes! The greatest value is '+mx+'.'};return 'What is the *greatest* value in the plot?';}
      const s=base+1,cnt=st.data.filter(v=>Math.floor(v/10)===s).length;st.ask={ans:cnt,opts:opts(cnt,[-1,1,2,-2],0),ok:'Yes! '+cnt+' values are in the '+s+'0s.'};return 'How many values are in the *'+s+'0s*?';}};}
});

/* =========================================================
   18. Multiple-bar graphs
   ========================================================= */
const SPORTS=['Soccer','Hockey','Basketball','Swimming'];
P.lesson({id:'doublebar',title:'Double-bar graphs',strand:'Data',codes:['D1.3','D1.4','D1.6'],
 guide:{goal:'Display two related sets of data in a multiple-bar graph with a title, labels, legend and an appropriate scale; read and analyse the graph; and use graphs in an infographic to tell a story.',words:'multiple-bar graph, double-bar graph, legend, scale, title, axis, infographic, compare',
  ask:['Why does a double-bar graph need a legend?','What changes if each square stands for 2 votes?','What story does this graph tell about the two classes?'],home:'Survey two groups (adults and kids) about their favourite season. Draw a double-bar graph together.'},
 learn:[{say:'Two sets of data side by side.',speech:'Two classes voted for their favourite sport. A double-bar graph puts the two bars for each sport side by side, so we can compare. Watch the bars grow.',view:'model',demo:'grow'},
        {say:'Read about graph parts.',speech:'Every good graph has a title, labels, a legend that shows which colour is which, and a scale. An infographic uses graphs and facts to tell a story.',view:'read'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: change the votes.',speech:'Your turn. Tap a bar to add a vote, or pick a bar and use the buttons. Try changing the scale.',view:'model'}],
 fig:'A double-bar graph of favourite sports in two classes.',rz:.3,
 explore:['*Tap a bar* to add a vote.','Pick a bar with the buttons, then press *− vote*.','Switch the *scale*: each block = 1 or 2 votes.'],
 tries:[['Class A: 6 soccer, Class B: 9 soccer. How many more in B?','*3 more.* 9 − 6 = 3.'],['Why do the bars have two colours?','To show *two sets of data*. The legend tells which colour is which class.'],['Each block = 2 votes. A bar is 4 blocks tall. How many votes?','*8 votes.*']],
 howTo:'Read the graph to answer the question, or change the bars to match it.',
 init:k=>({a:[6,4,5,3],b:[3,6,4,5],scale:1,sel:[0,0],ask:null,want:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'A *double-bar graph* shows two sets of data side by side so you can compare them. The *legend* says which colour is which.')+12;
  T(g,'Favourite Sports',X0+TW/2,y+36,FT.h3,INK,'center');const ox=X0+60,oy=y+300,s=30;g.strokeStyle=INK;g.lineWidth=3;g.beginPath();g.moveTo(ox,y+60);g.lineTo(ox,oy);g.lineTo(X0+TW-180,oy);g.stroke();
  for(let v=0;v<=8;v+=2){T(g,String(v),ox-14,oy-v*s+8,FT.small,GREY,'right');g.strokeStyle='rgba(27,34,54,.12)';g.lineWidth=1;g.beginPath();g.moveTo(ox,oy-v*s);g.lineTo(X0+TW-180,oy-v*s);g.stroke();}
  [[6,3],[4,6],[5,4],[3,5]].forEach(([a,b],i)=>{const x=ox+30+i*130;g.fillStyle='#2f7de1';g.fillRect(x,oy-a*s,44,a*s);g.fillStyle='#f08a24';g.fillRect(x+48,oy-b*s,44,b*s);T(g,SPORTS[i],x+46,oy+30,FT.small,INK,'center');});
  [['Class A','#2f7de1'],['Class B','#f08a24']].forEach(([t,c],i)=>{g.fillStyle=c;g.fillRect(X0+TW-150,y+90+i*40,26,26);T(g,t,X0+TW-116,y+110+i*40,FT.smallB);});T(g,'votes',ox+10,y+64,FT.small,GREY);y+=372;
  y=para(p,y,'*Title*, *axis labels*, *legend* and a *scale* make a graph easy to read. An *infographic* tells a story with graphs, numbers and pictures.')+10;
  y=keyWords(p,y,[['legend','a key that shows what each colour means'],['scale','how many each square or line stands for']]);
  predict(p,y,S,'p18','In the graph above, which sport has the most votes for both classes together?','*Hockey: 4 + 6 = 10.* Soccer and Basketball have 9, Swimming has 8.');},
 readout(p,S,y){const g=p.g,st=S.st;T(g,'Class A: '+st.a.join(', ')+'    Class B: '+st.b.join(', '),X0,y+40,FT.bodyB,acc());
  T(g,'Scale: each block = '+st.scale+' vote'+(st.scale>1?'s':'')+'   ·   Selected: '+SPORTS[st.sel[0]]+', Class '+(st.sel[1]?'B':'A'),X0,y+80,FT.body);return y+90;},
 build(S,grp,mode,game){const st=S.st,Z=-1.2,u=.135;const bars=new THREE.Group();grp.add(bars);
  const back=mk(new THREE.BoxGeometry(4.3,2.05,.04),lam('#ffffff'),20);back.position.set(0,1.02,Z-.62);grp.add(back);
  for(let v=0;v<=12;v+=2){const ln=new THREE.Mesh(new THREE.BoxGeometry(4.0,.01,.01),lam('#d6dbe5'));ln.position.set(.05,.04+v*u,Z-.58);grp.add(ln);}
  const title=label('Favourite Sports',{size:.26});title.position.set(0,2.22,Z-.6);grp.add(title);
  const lg=[label('■ Class A',{size:.2,color:'#2f7de1'}),label('■ Class B',{size:.2,color:'#f08a24'})];lg[0].position.set(1.5,1.9,Z-.5);lg[1].position.set(1.5,1.68,Z-.5);grp.add(lg[0],lg[1]);
  const ax=label('',{size:.16,color:GREY});ax.position.set(-1.55,1.9,Z-.5);grp.add(ax);
  function draw(){clearGroup(bars);SPORTS.forEach((sp,i)=>{[st.a,st.b].forEach((arr,k)=>{const n=Math.round(arr[i]/st.scale*10)/10;const x=-1.55+i*.98+(k?.22:-.22);const g=new THREE.Group();g.position.set(x,0,Z-.2);bars.add(g);
      const full=Math.floor(n),part=n-full;for(let j=0;j<full;j++){const c=unitBox(1,1,1,k?'#f08a24':'#2f7de1',u);c.scale.set(1.15,1,1);c.position.y=.03+u/2+j*u;g.add(c);}
      if(part>0){const c=mk(new THREE.BoxGeometry(u*1.15,u*part,u),lam(k?'#f8c18f':'#9cc2f5'),20);c.position.y=.03+full*u+u*part/2;g.add(c);}
      const sel=st.sel[0]===i&&st.sel[1]===k;if(sel){const r=mk(new THREE.BoxGeometry(u*1.4,.02,u*1.3),lam('#ffd24a'),0);r.position.y=.03;g.add(r);}
      const v=label(String(arr[i]),{size:.17,color:INK});v.position.y=.03+n*u+.18;g.add(v);A.drag(g,{tap:()=>tapBar(i,k)});});
    const l=label(sp,{size:.17});l.position.set(-1.55+i*.98,.15,Z+.25);bars.add(l);});ax.userData.set('votes (1 block = '+st.scale+')');A.redraw();}
  function tapBar(i,k){st.sel=[i,k];if(mode==='play'&&st.want){const ok=st.want(i,k);if(ok===true){game.solved(st.wantOk);return;}if(ok===false){A.bad('Not that bar. Read the question again.');return;}}change(1);}
  function change(d){const arr=st.sel[1]?st.b:st.a,i=st.sel[0];const v=arr[i]+d;if(v<0||v>12)return;arr[i]=v;A.pop();draw();if(mode==='play'&&st.target&&st.b[st.target[0]]===st.target[1]&&st.sel[1]===1)game.solved('Class B '+SPORTS[st.target[0]]+' now shows '+st.target[1]+'.');}
  draw();
  return {info:()=>SPORTS[st.sel[0]]+', Class '+(st.sel[1]?'B':'A')+': '+(st.sel[1]?st.b:st.a)[st.sel[0]]+' votes',
    controls:()=>{if(mode==='play'&&st.ask)return choices(game,st.ask.opts,st.ask.ans,st.ask.ok);
      const c=[{t:'◀ bar',fn:()=>{let q=st.sel[0]*2+st.sel[1]-1;if(q<0)q=7;st.sel=[Math.floor(q/2),q%2];draw();}},{t:'bar ▶',fn:()=>{let q=(st.sel[0]*2+st.sel[1]+1)%8;st.sel=[Math.floor(q/2),q%2];draw();}},{t:'− vote',fn:()=>change(-1)},{t:'+ vote',go:true,fn:()=>change(1)}];
      if(mode==='learn')c.push({t:'Scale: 1 per block',on:st.scale===1,fn:()=>{st.scale=1;draw();}},{t:'2 per block',on:st.scale===2,fn:()=>{st.scale=2;draw();}});return c;},
    demo(){st.a=[0,0,0,0];st.b=[0,0,0,0];draw();const fa=[6,4,5,3],fb=[3,6,4,5];const l=[];for(let s=1;s<=6;s++)l.push([350,()=>{st.a=fa.map(v=>Math.min(v,s));st.b=fb.map(v=>Math.min(v,s));draw();}]);A.seq(l);},
    task(r){st.ask=null;st.want=null;st.target=null;st.scale=1;st.a=SPORTS.map(()=>rnd(2,9));st.b=SPORTS.map(()=>rnd(2,9));
      if(r===0){const mx=Math.max(...st.b);st.b[st.b.indexOf(mx)]=mx+1;const best=st.b.indexOf(Math.max(...st.b));st.want=(i,k)=>k===1?i===best:false;st.wantOk='Yes! '+SPORTS[best]+' had the most votes in Class B.';draw();return 'Tap the bar: which sport got the *most votes in Class B*?';}
      if(r===1){const i=rnd(0,3);st.a[i]=rnd(7,10);st.b[i]=rnd(2,st.a[i]-2);const d=st.a[i]-st.b[i];draw();st.ask={ans:d,opts:opts(d,[-1,1,2,-2],1),ok:'Yes! '+st.a[i]+' − '+st.b[i]+' = '+d+'.'};return 'How many *more* chose *'+SPORTS[i]+'* in Class A than in Class B?';}
      if(r===2){const i=rnd(0,3),t=rnd(3,10);if(st.b[i]===t)st.b[i]=t-2;st.target=[i,t];st.sel=[i,1];draw();return 'Change Class B\'s *'+SPORTS[i]+'* bar to show *'+t+' votes*.';}
      if(r===3){const dif=st.a.map((v,i)=>Math.abs(v-st.b[i]));let m=Math.max(...dif);const i=dif.indexOf(m);if(dif.filter(x=>x===m).length>1){st.a[i]+=2;}const big=st.a.map((v,j)=>Math.abs(v-st.b[j])).reduce((bi,v,j,a)=>v>a[bi]?j:bi,0);
        st.want=(j)=>j===big;st.wantOk='Yes! '+SPORTS[big]+' has the biggest difference.';draw();return 'Tap a bar for the sport with the *biggest difference* between the classes.';}
      const i=rnd(0,3),tot=st.a[i]+st.b[i];draw();st.ask={ans:tot,opts:opts(tot,[-1,1,-2,2],2),ok:'Yes! '+st.a[i]+' + '+st.b[i]+' = '+tot+'.'};return 'How many students *in all* chose *'+SPORTS[i]+'*?';}};}
});

/* =========================================================
   19. Mean, median and mode
   ========================================================= */
P.lesson({id:'median',title:'Mean, median and mode',strand:'Data',codes:['D1.5','D2.2'],
 guide:{goal:'Determine the mean and median and identify the mode of data sets of whole numbers, explain what each tells about the data, and predict whether they will be the same for different groups.',words:'mean, median, mode, data set, middle, most often, even out',
  ask:['Why do we put the data in order before finding the median?','Can a data set have no mode? Two modes?','If you surveyed a different class, would the mean be the same? Why or why not?'],home:'Record how many minutes each family member reads tonight. Find the mean, median and mode.'},
 learn:[{say:'Three ways to find the middle.',speech:'These towers show how many books seven friends read. Watch: sort them from least to greatest. The median is the middle tower.',view:'model',demo:'median'},
        {say:'Read about mean, median and mode.',speech:'The mode is the value that appears most often. The median is the middle value when the data is in order. The mean is the fair share when you even out all the towers.',view:'read'},
        {say:'Watch: evening out for the mean.',speech:'Now even out the towers by moving cubes from tall towers to short towers. When they are all the same height, that height is the mean.',view:'model',demo:'mean'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: find the measures.',speech:'Your turn. Sort the towers, find the middle, and even them out. Press New data to try another set.',view:'model'}],
 fig:'Seven towers of data. Sort them, or even them out.',rz:.3,
 explore:['Press *Sort* to put the towers in order.','The *median* glows in the middle; the *mode* is shown in pink.','Press *Even out* to find the *mean*.'],
 tries:[['Find the median: 4, 9, 2, 7, 5','*5.* In order: 2, 4, 5, 7, 9. The middle is 5.'],['Find the mode: 3, 6, 6, 2, 6, 1','*6.* It appears three times.'],['Find the mean: 2, 4, 6','*4.* 2 + 4 + 6 = 12, and 12 ÷ 3 = 4.']],
 howTo:'Read the question. Use Sort and Even out to help, then tap the right tower or choose the answer.',
 init:k=>({v:[5,2,6,3,6,4,9],orig:[5,2,6,3,6,4,9],ask:null,want:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'*Mean*, *median* and *mode* each describe a data set with one number.')+16;
  const vals=[2,3,4,5,6,6,9];vals.forEach((v,i)=>{for(let k=0;k<v;k++){rr(g,X0+20+i*84,y+260-k*26,50,24,4);g.fillStyle=i===3?'#ffd24a':v===6?'#ff8cb0':'#9cc2f5';g.fill();}T(g,String(v),X0+45+i*84,y+292,FT.bodyB,INK,'center');});
  T(g,'median = 5',X0+620,y+120,FT.bodyB,'#d98a00');T(g,'mode = 6',X0+620,y+170,FT.bodyB,'#e2457a');T(g,'mean = 35 ÷ 7 = 5',X0+620,y+220,FT.bodyB,'#2f7de1');y+=330;
  [['Mode','the value that appears most often'],['Median','the middle value when the data is in order'],['Mean','the total shared equally: add, then divide']].forEach(([a,b],i)=>{T(g,a,X0,y+i*44,FT.bodyB,acc());T(g,b,X0+150,y+i*44,FT.body);});y+=140;
  predict(p,y,S,'p19','Data: 8, 3, 5, 8, 6. Which is greater, the mode or the median?','*The mode.* In order: 3, 5, 6, 8, 8. The median is 6 and the mode is 8.');},
 readout(p,S,y){const g=p.g,st=S.st,v=st.v,sum=v.reduce((a,b)=>a+b,0),s=v.slice().sort((a,b)=>a-b),med=s[Math.floor(s.length/2)];const m=modes(v);
  T(g,'Data: '+v.join(', '),X0,y+40,FT.bodyB,acc());T(g,'median '+med+'   ·   mode '+(m.length?m.join(' and '):'none')+'   ·   mean '+(sum%v.length?(sum/v.length).toFixed(1):sum/v.length),X0,y+82,FT.bodyB);return y+92;},
 build(S,grp,mode,game){const st=S.st,u=.18,Z=-1.5,xs=i=>-1.86+i*.62;const tw=new THREE.Group();grp.add(tw);let anim=false;
  function draw(){clearGroup(tw);const s=st.v.slice().sort((a,b)=>a-b),sorted=st.v.every((x,i)=>x===s[i]),med=s[Math.floor(s.length/2)],md=modes(st.v);
    st.v.forEach((h,i)=>{const g=new THREE.Group();g.position.set(xs(i),0,Z);tw.add(g);const isMed=sorted&&i===Math.floor(st.v.length/2),isMode=md.includes(h);
      for(let k=0;k<h;k++){const c=unitBox(1,1,1,isMed?'#ffd24a':isMode?'#ff8cb0':'#9cc2f5',u);c.position.y=u/2+.03+k*u;g.add(c);}
      const l=label(String(h),{size:.22});l.position.y=h*u+.25;g.add(l);A.drag(g,{tap:()=>tapT(i)});});A.redraw();}
  function tapT(i){if(mode!=='play'||!st.want)return;const r=st.want(i);if(r)game.solved(st.wantOk);else A.bad('Not that one. '+st.wantHint);}
  function sortIt(){if(anim)return;st.v.sort((a,b)=>a-b);A.pop();draw();A.say('In order: '+st.v.join(', '));}
  function evenOut(){if(anim)return;const sum=st.v.reduce((a,b)=>a+b,0);if(sum%st.v.length){A.say('These do not even out to a whole number. The mean is '+(sum/st.v.length).toFixed(1)+'.');return;}anim=true;
    const l=[];let v=st.v.slice();for(let s=0;s<40;s++){const hi=v.indexOf(Math.max(...v)),lo=v.indexOf(Math.min(...v));if(v[hi]-v[lo]<=0)break;v[hi]--;v[lo]++;const snap=v.slice();l.push([300,()=>{st.v=snap;A.pop();draw();}]);}
    l.push([400,()=>{anim=false;A.good('All even! The mean is '+st.v[0]+'.');}]);A.seq(l);}
  draw();
  return {info:()=>st.v.join(', '),
    controls:()=>{const c=[{t:'Sort',fn:sortIt},{t:'Even out',fn:evenOut},{t:'Start over',fn:()=>{st.v=st.orig.slice();draw();}}];if(mode==='play'&&st.ask)return choices(game,st.ask.opts,st.ask.ans,st.ask.ok).concat(c);
      return mode==='learn'?c.concat([{t:'New data',go:true,fn:()=>{st.v=newData();st.orig=st.v.slice();draw();}}]):c;},
    demo(n){st.v=[5,2,6,3,6,4,9];st.orig=st.v.slice();draw();if(n==='median')A.seq([[900,sortIt],[1200,()=>A.say('The middle tower is 5: the median. 6 appears twice: the mode.')]]);if(n==='mean')A.seq([[700,evenOut]]);},
    task(r){st.ask=null;st.want=null;st.v=newData();st.orig=st.v.slice();
      if(r===0||r===3){st.want=i=>{const s=st.v.slice().sort((a,b)=>a-b);return st.v.every((x,j)=>x===s[j])&&i===Math.floor(st.v.length/2);};st.wantOk='Yes! That is the median.';st.wantHint='Sort first, then tap the middle tower.';draw();return 'Find the *median*. Sort the towers, then tap the middle one.';}
      if(r===1){const md=modes(st.v);if(md.length!==1){st.v[0]=st.v[1];st.orig=st.v.slice();}const m=modes(st.v)[0];st.want=i=>st.v[i]===m;st.wantOk='Yes! The mode is '+m+'.';st.wantHint='Look for the height that appears most often.';draw();return 'Find the *mode*. Tap a tower with the value that appears *most often*.';}
      const sum=st.v.reduce((a,b)=>a+b,0),n=st.v.length;const mean=sum/n;draw();st.ask={ans:mean,opts:opts(mean,[-1,1,2,-2],1),ok:'Yes! '+sum+' ÷ '+n+' = '+mean+'.'};return 'Find the *mean*. Press Even out to help.';}};}
});
function modes(v){const c={};v.forEach(x=>c[x]=(c[x]||0)+1);const mx=Math.max(...Object.values(c));return mx<2?[]:Object.keys(c).filter(k=>c[k]===mx).map(Number);}
function newData(){const n=7,mean=rnd(4,7),v=Array(n).fill(mean);for(let k=0;k<8;k++){const a=rnd(0,n-1),b=rnd(0,n-1);if(v[a]>1&&v[b]<11){v[a]--;v[b]++;}}if(v.every(x=>x===v[0])){v[0]--;v[1]++;}return v.sort(()=>Math.random()-.5);}

/* =========================================================
   20. The probability line
   ========================================================= */
const PWORDS=['impossible','unlikely','equally likely','likely','certain'];
const MCOL={red:'#e0453a',blue:'#2f7de1',green:'#16a36f',yellow:'#f2c200'};
P.lesson({id:'probline',title:'The probability line',strand:'Data',codes:['D2.1'],
 guide:{goal:'Use the terms impossible, unlikely, equally likely, likely and certain to describe how likely events are, show the likelihood on a probability line, and use it to make predictions and decisions.',words:'probability, likelihood, impossible, unlikely, equally likely, likely, certain, probability line, outcome',
  ask:['Where would “it will snow in July in Ontario” go on the probability line?','How could you change the bag so that red is certain?','You drew blue 3 times. Does that mean blue is likely?'],home:'Put 8 socks in a bag with different colours. Predict, place each colour on a probability line, then draw 10 times and tally.'},
 learn:[{say:'Likelihood goes from 0 to 1.',speech:'A probability line goes from impossible on the left to certain on the right. Equally likely is in the middle. Watch: in this bag, four of eight marbles are red, so red is equally likely.',view:'model',demo:'place'},
        {say:'Read the likelihood words.',speech:'Impossible means it can never happen. Certain means it will always happen. Likely means it will probably happen, and unlikely means it probably will not.',view:'read'},
        {say:'Watch: draw marbles to test.',speech:'We can test our prediction by drawing marbles and putting them back. Watch the tally grow.',view:'model',demo:'draw'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: place it on the line.',speech:'Your turn. Look at the bowl. Tap the spot on the probability line that shows how likely the colour is.',view:'model'}],
 fig:'A bowl of marbles and a probability line from impossible to certain.',rz:.35,
 explore:['Look at the marbles in the bowl.','*Tap a spot* on the probability line.','Press *Draw* to test: pick a marble, then put it back.'],
 tries:[['A bag has 5 blue marbles only. How likely is blue?','*Certain.*'],['A bag has 1 red and 7 green. How likely is red?','*Unlikely.*'],['A spinner is half yellow, half blue. How likely is yellow?','*Equally likely.*']],
 howTo:'Look at the marbles. Tap the place on the probability line that shows how likely it is to pick the named colour.',
 init:k=>({bag:['red','red','red','red','blue','blue','green','yellow'],col:'red',tally:{},ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'*Probability* tells how likely something is to happen. We can show it on a *probability line*.')+20;
  const lx=X0+20,lw=TW-40;const gr=g.createLinearGradient(lx,0,lx+lw,0);gr.addColorStop(0,'#e0453a');gr.addColorStop(.5,'#f2c200');gr.addColorStop(1,'#16a36f');rr(g,lx,y+40,lw,22,11);g.fillStyle=gr;g.fill();
  PWORDS.forEach((w,i)=>{const x=lx+i*lw/4;g.beginPath();g.arc(x,y+51,16,0,Math.PI*2);g.fillStyle='#fff';g.fill();g.lineWidth=4;g.strokeStyle=INK;g.stroke();T(g,w,x,y+(i%2?120:100),FT.smallB,INK,i===0?'left':i===4?'right':'center');});
  T(g,'0',lx,y+20,FT.small,GREY,'center');T(g,'1',lx+lw,y+20,FT.small,GREY,'center');y+=160;
  [['Snow in July in Toronto','unlikely'],['The sun rises tomorrow','certain'],['A coin lands heads','equally likely'],['Rolling a 7 on a 1–6 die','impossible']].forEach(([a,b],i)=>{T(g,a,X0,y+i*44,FT.body);T(g,b,X0+TW,y+i*44,FT.bodyB,acc(),'right');});y+=190;
  y=keyWords(p,y,[['probability line','a line from impossible (0) to certain (1)'],['outcome','one possible result']]);
  predict(p,y,S,'p20','A bag has 6 red and 2 blue marbles. How likely is red?','*Likely.* Most of the marbles are red, but not all.');},
 readout(p,S,y){const g=p.g,st=S.st,n=st.bag.filter(c=>c===st.col).length;T(g,'Picking '+st.col+': '+n+' of '+st.bag.length+' marbles',X0,y+42,FT.bodyB,acc());
  const t=Object.entries(st.tally);if(t.length)T(g,'Tally: '+t.map(([c,k])=>c+' '+k).join('  ·  '),X0,y+82,FT.body);return y+92;},
 build(S,grp,mode,game){const st=S.st,Zb=-2.2,Zl=-.9;const bowl=mk(new THREE.SphereGeometry(.85,32,16,0,Math.PI*2,Math.PI/2,Math.PI/2),new THREE.MeshLambertMaterial({color:'#cfe8ff',transparent:true,opacity:.45,side:THREE.DoubleSide}),0);
  bowl.position.set(-1.2,.85,Zb);grp.add(bowl);const marbles=new THREE.Group();grp.add(marbles);
  const lineG=new THREE.Group();grp.add(lineG);const L=4.0,x0=-2.0;const bar=mk(new THREE.BoxGeometry(L,.1,.22),lam('#e8e1c8'),0);bar.position.set(0,.05,Zl);lineG.add(bar);
  const segCols=['#e0453a','#f08a24','#f2c200','#8fce5a','#16a36f'];const pads=PWORDS.map((w,i)=>{const pd=mk(new THREE.CylinderGeometry(.2,.2,.08,24),lam(segCols[i]),30);pd.position.set(x0+i*L/4,.1,Zl);lineG.add(pd);
    const l=label(w,{size:.17,color:INK});l.position.set(x0+i*L/4,.45,Zl+(i%2?.42:.32));lineG.add(l);A.drag(pd,{tap:()=>choose(i)});return pd;});
  const pin=mk(new THREE.ConeGeometry(.12,.32,16),lam(INK),0);pin.rotation.x=Math.PI;pin.visible=false;grp.add(pin);
  const askL=label('',{size:.28,bg:'#ffffff'});askL.position.set(1.1,1.0,Zb);grp.add(askL);let drawn=null;
  function fillBowl(){clearGroup(marbles);st.bag.forEach((c,i)=>{const m=mk(G('mrb',()=>new THREE.SphereGeometry(.13,16,12)),lam(MCOL[c]),0);const a=i*2.4,r=.18+(i%3)*.17;m.position.set(-1.2+Math.cos(a)*r,.18+Math.floor(i/6)*.2,Zb+Math.sin(a)*r);marbles.add(m);});
    askL.userData.set('How likely is '+st.col+'?');A.redraw();}
  function truth(){const n=st.bag.filter(c=>c===st.col).length,N=st.bag.length;return n===0?0:n===N?4:n*2===N?2:n*2<N?1:3;}
  function choose(i){pin.visible=true;pin.position.set(x0+i*L/4,.5,Zl);A.pop();const t=truth();if(i===t){A.good(st.col[0].toUpperCase()+st.col.slice(1)+' is '+PWORDS[t]+'.');if(mode==='play')game.solved('Yes! '+PWORDS[t][0].toUpperCase()+PWORDS[t].slice(1)+'.');}
    else A.bad('Count the '+st.col+' marbles: '+st.bag.filter(c=>c===st.col).length+' of '+st.bag.length+'.');}
  function draw1(){const c=pick(st.bag);st.tally[c]=(st.tally[c]||0)+1;if(drawn){grp.remove(drawn);disposeObj(drawn);}drawn=mk(G('mrb',()=>new THREE.SphereGeometry(.13,16,12)),lam(MCOL[c]),0);drawn.position.set(-1.2,.6,Zb);grp.add(drawn);
    hop(drawn,V(.6,.2,Zb+.4),.8,.5);A.pop();A.redraw();}
  fillBowl();
  return {info:()=>'How likely is '+st.col+'?  ('+st.bag.filter(c=>c===st.col).length+' of '+st.bag.length+')',
    controls:()=>[{t:'Draw a marble',fn:draw1},{t:'Clear tally',fn:()=>{st.tally={};A.redraw();}}].concat(mode==='learn'?Object.keys(MCOL).map(c=>({t:c,on:st.col===c,fn:()=>{st.col=c;fillBowl();}})):[]),
    demo(n){st.bag=['red','red','red','red','blue','blue','green','yellow'];st.col='red';st.tally={};fillBowl();if(n==='place')A.seq([[900,()=>choose(2)]]);if(n==='draw'){const l=[];for(let i=0;i<8;i++)l.push([500,draw1]);A.seq(l);}},
    task(r){const kinds=Object.keys(MCOL);const c=pick(kinds),o=kinds.filter(k=>k!==c);let bag;
      if(r===0)bag=Array(8).fill(c);else if(r===1)bag=[c].concat(Array.from({length:7},()=>pick(o)));else if(r===2)bag=Array(4).fill(c).concat(Array.from({length:4},()=>pick(o)));
      else if(r===3)bag=Array.from({length:8},()=>pick(o));else bag=Array(6).fill(c).concat([pick(o),pick(o)]);
      st.bag=shuffle(bag);st.col=c;st.tally={};pin.visible=false;fillBowl();return 'How likely is it to pick *'+c+'*? Tap the spot on the probability line.';}};}
});
})();
