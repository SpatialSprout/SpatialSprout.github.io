/* The Interactive Classroom: Grade 3 Math — Algebra (10–12) and Data (13–16) */
(function(){
"use strict";
const P=window.PM;if(!P||P.failed||!P.THREE)return;
const {THREE,V,W,D,PY,PX,X0,TW,INK,RED,BLUE,GREY,VIBE,FT,ZS,G,M,lam,mk,unitBox,cellMat,label,starGeo,wedgeGeo,clearGroup,disposeObj,rr,T,wrap,para,header,keyWords,predict,box,caption,cxOf,cyOf,tint,moveTo,hop,tween,burst,easeOut,A}=P;
const acc=()=>P.ACC;
const rnd=(a,b)=>a+Math.floor(Math.random()*(b-a+1)),pick=a=>a[Math.floor(Math.random()*a.length)],shuffle=a=>a.slice().sort(()=>Math.random()-.5);
function choices(game,list,ans,ok){return list.map(o=>({t:String(o),big:true,fn:()=>{if(o===ans)game.solved(ok);else A.bad('Not quite. Try again!');}}));}

/* =========================================================
   10. Patterns
   ========================================================= */
P.lesson({id:'patterns',title:'Repeating and growing patterns',strand:'Algebra',codes:['C1.1','C1.2','C1.3','C1.4'],
 guide:{goal:'Identify, create and extend repeating and growing patterns, find pattern rules, make predictions, and find missing terms.',words:'pattern, repeating, growing, core, term, pattern rule, table of values',
  ask:['What stays the same and what changes?','How can you find term 10 without building it?','Where do you see patterns in real life?'],home:'Look for patterns on clothes, floors and fences. Build a staircase of blocks: 1, 3, 5, 7…'},
 learn:[{say:'Patterns repeat or grow.',speech:'A pattern repeats or grows by a rule. Watch the towers grow: start at one and add two each time.',view:'model',demo:'grow'},
        {say:'Read about pattern rules.',speech:'A repeating pattern has a core that repeats. A growing pattern changes by the same amount each time.',view:'read'},
        {say:'Watch: predicting term 6.',speech:'If the rule is add two, term six is two more than term five.',view:'model',demo:'next'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: change the rule.',speech:'Your turn. Change where the pattern starts and how much it grows. Tap the question mark to reveal the next term.',view:'model'}],
 fig:'Cube towers that grow by the same amount each time.',rz:-.55,
 explore:['Change *Start* and *Add* to make a new rule.','*Tap the ?* to reveal the next tower.','Read the table of values on the page.'],
 tries:[['What comes next? 5, 10, 15, 20, ___','*25.* The rule is add 5.'],['Find the missing term: 3, 7, ___, 15','*11.* The rule is add 4.'],['The core of a pattern is red, blue, blue. What is the 7th bead?','*Red.* The core repeats every 3 beads, so beads 1, 4 and 7 are red.']],
 howTo:'Build the pattern by changing Start and Add, or read the towers and choose the answer. Tap the ? tower to check what comes next.',
 init:k=>({start:1,add:2,show6:false,ask:null,want:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'A *pattern* repeats or grows by a *rule*. Each item in a pattern is called a *term*. Patterns are everywhere: tiles, fences, music.')+12;
  T(g,'Repeating',X0,y+30,FT.smallB,acc());for(let i=0;i<9;i++){const x=X0+170+i*72,k=i%3;g.fillStyle=k===0?'#ff7a7a':'#4fb3ff';if(k===0){g.beginPath();g.arc(x+24,y+20,24,0,Math.PI*2);g.fill();}else g.fillRect(x,y-4,48,48);}
  T(g,'the core repeats: ● ■ ■',X0+170,y+82,FT.hand,BLUE);y+=118;
  T(g,'Growing',X0,y+30,FT.smallB,acc());const sq=24;[1,3,5,7].forEach((n,i)=>{const x=X0+170+i*96;for(let k=0;k<n;k++){g.fillStyle=VIBE[i];g.fillRect(x,y+170-k*sq-sq,sq*2-4,sq-3);}T(g,String(n),x+22,y+200,FT.bodyB,INK,'center');});
  const tx=X0+580;['Term','1','2','3','4'].forEach((v,i)=>T(g,v,tx+(i?108+(i-1)*44:0),y+60,i?FT.body:FT.smallB));['Squares','1','3','5','7'].forEach((v,i)=>T(g,v,tx+(i?108+(i-1)*44:0),y+110,i?FT.bodyB:FT.smallB,i?acc():INK));
  g.strokeStyle='#d6d9e0';g.lineWidth=2;g.strokeRect(tx-10,y+26,TW-(tx-X0)+10,104);T(g,'table of values',tx,y+170,FT.hand,BLUE);y+=236;
  y=para(p,y,'Rule: *start at 1 and add 2 each time.* Place-value patterns grow too: *5, 50, 500* or *20, 40, 60, 80*.')+12;
  y=keyWords(p,y,[['term','one item or step in a pattern'],['pattern rule','tells how the pattern starts and changes']]);
  predict(p,y,S,'p10','The pattern is 2, 5, 8, 11. What comes next?','*14.* The rule is: start at 2 and add 3 each time.');},
 readout(p,S,y){const g=p.g,st=S.st,xs=i=>cxOf(-1.95+i*.78);T(g,'Table of values',X0,y,FT.cap,GREY);
  for(let i=0;i<6;i++){T(g,String(i+1),xs(i),y+40,FT.body,GREY,'center');T(g,i<5||st.show6?String(st.start+st.add*i):'?',xs(i),y+84,ZS(40),acc(),'center');}
  T(g,'Rule: start at '+st.start+', add '+st.add+' each time',X0,y+144,ZS(38));return y+156;},
 build(S,grp,mode,game){const st=S.st,u=.15,tw=new THREE.Group();grp.add(tw);
  function rebuild(drop){clearGroup(tw);for(let i=0;i<6;i++){const x=-1.95+i*.78,z=-1.4;
      if(i===5&&!st.show6){const q=label('?',{size:.55,color:'#8b5cf6',bg:'#ffffff'});q.position.set(x,.45,z);tw.add(q);const hit=new THREE.Mesh(new THREE.BoxGeometry(.5,.9,.5),new THREE.MeshBasicMaterial({visible:false}));hit.position.set(x,.45,z);tw.add(hit);A.drag(hit,{tap:reveal});continue;}
      const h=st.start+st.add*i;for(let k=0;k<h;k++){const m=unitBox(2,1,2,VIBE[i],u);const p=V(x,u/2+k*u,z);m.position.copy(p);if(drop)m.position.y+=1+k*.03;tw.add(m);moveTo(m,{pos:p,k:10});}
      const l=label(String(h),{size:.26});l.position.set(x,h*u+.25,z);tw.add(l);}}
  function reveal(){if(st.show6)return;if(mode==='play'&&st.ask){A.say('Answer first, then check!');return;}st.show6=true;A.pop();rebuild(true);A.say('Term 6 is '+(st.start+5*st.add)+'.');A.redraw();}
  function set(s,a){s=Math.max(1,Math.min(4,s));a=Math.max(1,Math.min(3,a));if(s===st.start&&a===st.add)return;st.start=s;st.add=a;st.show6=false;rebuild(true);A.pop();
    if(mode==='play'&&st.want&&s===st.want[0]&&a===st.want[1])game.solved('Yes! '+[0,1,2,3,4].map(i=>s+a*i).join(', '));A.redraw();}
  rebuild(false);
  return {info:()=>'Start at '+st.start+', add '+st.add+': '+[0,1,2,3,4].map(i=>st.start+st.add*i).join(', ')+', …',
    controls:()=>{if(mode==='play'&&st.ask)return choices(game,st.ask.opts,st.ask.ans,st.ask.ok);
      return [{t:'Start −',fn:()=>set(st.start-1,st.add)},{t:'Start +',fn:()=>set(st.start+1,st.add)},{t:'Add −',fn:()=>set(st.start,st.add-1)},{t:'Add +',fn:()=>set(st.start,st.add+1)},{t:'Show term 6',go:true,fn:reveal}];},
    demo(n){if(n==='grow'){st.start=1;st.add=2;st.show6=false;rebuild(true);A.redraw();}if(n==='next')A.seq([[1200,reveal]]);},
    task(r){st.ask=null;st.want=null;st.show6=false;
      if(r===0||r===3){const s=rnd(1,4),a=rnd(1,3);st.want=[s,a];st.start=s===1?2:1;st.add=a===1?2:1;rebuild(false);return 'Build the pattern *'+[0,1,2,3].map(i=>s+a*i).join(', ')+'*.';}
      const s=rnd(1,4),a=rnd(1,3);st.start=s;st.add=a;rebuild(false);
      if(r===1){const ans=s+5*a;st.ask={ans,opts:shuffle([ans,ans+a,ans-1]),ok:'Yes! Term 6 is '+ans+'.'};return 'Look at the towers. What is *term 6*?';}
      if(r===2){const ans='add '+a;st.ask={ans,opts:shuffle(['add 1','add 2','add 3']),ok:'Yes! The rule is start at '+s+', '+ans+'.'};return 'What is the *rule* for these towers?';}
      const seq=[0,1,2,3].map(i=>s+a*i);const ans=seq[2];st.ask={ans,opts:shuffle([ans,ans+1,ans-1]),ok:'Yes! The missing term is '+ans+'.'};return 'Find the missing term: *'+seq[0]+', '+seq[1]+', ___, '+seq[3]+'*.';}};}
});

/* =========================================================
   11. Balance and equations
   ========================================================= */
P.lesson({id:'balance',title:'Balance and equations',strand:'Algebra',codes:['C2.1','C2.2'],
 guide:{goal:'Determine whether expressions are equivalent, and use a variable (a box or letter) to stand for a missing number in an equation.',words:'equation, equal, not equal, balance, variable, expression',
  ask:['What does the = sign really mean?','How did you know how many cubes to add?','Can you write another equation that balances 7 + 5?'],home:'Use a coat hanger with two cups as a balance. Put coins in each cup and make both sides equal.'},
 learn:[{say:'= means both sides are the same.',speech:'An equation says two amounts are equal. Watch the scale: seven plus five on one side, four plus the mystery box on the other.',view:'model',demo:'solve'},
        {say:'Read about variables.',speech:'A box or a letter can stand for a missing number. It is called a variable.',view:'read'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: balance the scale.',speech:'Your turn. Tap the yellow pan to add a cube to the mystery box. Tap the mystery cubes to take one away.',view:'model'}],
 fig:'A pan balance. The yellow cubes are the mystery box.',rz:.15,
 explore:['*Tap the right pan* to add a mystery cube. *Tap a yellow cube* to take one away.','The scale tips toward the heavier side.','When it is level, both sides are equal.'],
 tries:[['Is 6 + 3 equal to 4 + 5?','*Yes.* Both sides are 9.'],['Find the box: 8 + 4 = □ + 6','*□ = 6.* 8 + 4 = 12, and 6 + 6 = 12.'],['True or false: 3 × 4 = 10 + 2','*True.* Both sides are 12.']],
 howTo:'Add or take away mystery cubes until the scale is level. Then the box shows the missing number.',
 init:k=>({L:[7,5],Ltxt:'7 + 5',Rb:4,x:0,solved:false}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'An *equation* says two amounts are equal. The *=* sign means both sides have the *same value*, like a balanced scale.')+12;
  const drawBal=(cx,cy,tilt,lt,rt,ok)=>{g.save();g.translate(cx,cy);g.fillStyle=INK;g.beginPath();g.moveTo(0,0);g.lineTo(-26,70);g.lineTo(26,70);g.closePath();g.fill();g.rotate(tilt);g.fillStyle=acc();g.fillRect(-160,-8,320,12);g.restore();
    [-1,1].forEach(s=>{const px=cx+s*150*Math.cos(tilt),py=cy+s*150*Math.sin(tilt)+20;rr(g,px-70,py,140,22,10);g.fillStyle='#ffd24a';g.fill();T(g,s<0?lt:rt,px,py+60,FT.bodyB,INK,'center');});
    T(g,ok,cx,cy+140,FT.bodyB,ok.includes('≠')?RED:'#16a36f','center');};
  drawBal(X0+200,y+60,0,'3 + 4','5 + 2','3 + 4 = 5 + 2');drawBal(X0+620,y+60,-.18,'6 + 3','2 + 4','6 + 3 ≠ 2 + 4');y+=250;
  y=para(p,y,'A box or letter can stand for a missing number. In *7 + 5 = □ + 4*, the box must be *8* to balance. The box is a *variable*.')+14;
  y=keyWords(p,y,[['equation','a number sentence with an = sign'],['variable','a symbol that stands for a missing number']]);
  predict(p,y,S,'p11','Is 2 × 5 equal to 4 + 6?','*Yes!* 2 × 5 = 10 and 4 + 6 = 10, so the scale balances.');},
 readout(p,S,y){const g=p.g,st=S.st,Ls=st.L.reduce((a,b)=>a+b,0),Rs=st.Rb+st.x;g.font=ZS(54);const left=st.Ltxt+' = ';T(g,left,X0,y+56,ZS(54));let x=X0+g.measureText(left).width;
  rr(g,x,y,74,70,10);g.fillStyle='#fff3c4';g.fill();g.lineWidth=4;g.strokeStyle='#f2a400';g.stroke();T(g,String(st.x),x+37,y+54,ZS(50),'#d98a00','center');T(g,' + '+st.Rb,x+74,y+56,ZS(54));
  T(g,Ls===Rs?Ls+' = '+Rs+'   Balanced!':Ls+' ≠ '+Rs+'   '+(Ls>Rs?'The left side is heavier.':'The right side is heavier.'),X0,y+104,FT.bodyB,Ls===Rs?'#16a36f':RED);return y+116;},
 build(S,grp,mode,game){const st=S.st,PV=V(0,1.62,-1.35),ARM=1.55;let ang=0,tAng=0;
  const foot=mk(new THREE.BoxGeometry(1.3,.08,.7),lam('#8b5cf6'),20);foot.position.set(0,.04,PV.z);grp.add(foot);
  const post=mk(new THREE.BoxGeometry(.13,PV.y,.13),lam('#c9b8f2'),20);post.position.set(0,PV.y/2,PV.z);grp.add(post);
  const beam=new THREE.Group();beam.position.copy(PV);grp.add(beam);beam.add(mk(new THREE.BoxGeometry(3.3,.09,.14),lam('#8b5cf6'),20));
  const pans=[-1,1].map(()=>{const g=new THREE.Group();const plate=mk(new THREE.CylinderGeometry(.62,.55,.06,32),lam('#ffd24a'),30);g.add(plate);
    const rod=new THREE.Mesh(new THREE.CylinderGeometry(.015,.015,.68,6),lam(INK));rod.position.y=.37;g.add(rod);const cg=new THREE.Group();g.add(cg);g.userData.cg=cg;grp.add(g);return g;});
  A.drag(pans[1],{tap:()=>set(st.x+1)});const u=.12;
  function fill(cg,terms){clearGroup(cg);const widths=terms.map(t=>Math.ceil(t.v/5)*(u+.01));const tot=widths.reduce((a,b)=>a+b,0)+(terms.length-1)*.1;let x=-tot/2;
    terms.forEach((t,ti)=>{for(let k=0;k<t.v;k++){const col=Math.floor(k/5),lvl=k%5;const m=unitBox(1,1,1,t.c,u);m.position.set(x+col*(u+.01)+u/2,.03+u/2+lvl*u,0);cg.add(m);if(t.mys)A.drag(m,{tap:()=>set(st.x-1)});}x+=widths[ti]+.1;});}
  const lbl=[label('',{size:.24,bg:'#ffffff'}),label('',{size:.24,bg:'#ffffff'})];lbl.forEach(l=>grp.add(l));
  function rebuild(){fill(pans[0].userData.cg,st.L.map((v,i)=>({v,c:i?'#16a36f':'#2f7de1'})));fill(pans[1].userData.cg,[{v:st.Rb,c:'#f08a24'},{v:st.x,c:'#ffd24a',mys:true}]);
    const d=st.L.reduce((a,b)=>a+b,0)-(st.Rb+st.x);tAng=Math.max(-.32,Math.min(.32,d*.035));lbl[0].userData.set(st.Ltxt);lbl[1].userData.set(st.Rb+' + □');}
  function place(){beam.rotation.z=ang;[-1,1].forEach((s,i)=>{pans[i].position.set(PV.x+s*ARM*Math.cos(ang),PV.y+s*ARM*Math.sin(ang)-.74,PV.z);lbl[i].position.set(pans[i].position.x,pans[i].position.y+1.05,PV.z);});}
  function set(x){x=Math.max(0,Math.min(15,x));if(x===st.x)return;st.x=x;rebuild();A.pop();const Ls=st.L.reduce((a,b)=>a+b,0);
    if(Ls===st.Rb+x){A.good('Balanced! □ = '+x+'.',V(W/2,PY+2,PV.z));if(mode==='play')game.solved(st.Ltxt+' = '+x+' + '+st.Rb);}A.redraw();}
  function puzzle(L,Ltxt,Rb){st.L=L;st.Ltxt=Ltxt;st.Rb=Rb;st.x=0;rebuild();A.redraw();}
  rebuild();ang=tAng;place();
  return {tick(dt){ang+=(tAng-ang)*Math.min(1,dt*4);place();},info:()=>st.Ltxt+' = □ + '+st.Rb+'   (□ = '+st.x+')',
    controls:()=>{const o=[{t:'□ −1',big:true,fn:()=>set(st.x-1)},{t:'□ +1',big:true,go:true,fn:()=>set(st.x+1)}];if(mode==='learn')o.push({t:'New puzzle',fn:()=>{const a=rnd(3,9),b=rnd(2,8),c=rnd(1,a+b-1);puzzle([a,b],a+' + '+b,c);}});return o;},
    demo(n){puzzle([7,5],'7 + 5',4);const l=[];for(let i=1;i<=8;i++)l.push([i===1?900:350,()=>set(i)]);A.seq(l);},
    task(r){if(r===3){const a=rnd(2,4),b=rnd(3,4),c=rnd(2,a*b-2);puzzle([a*b],a+' × '+b,c);}else if(r===4){const a=rnd(14,20),b=rnd(2,6),c=rnd(2,a-b-2);puzzle([a-b],a+' − '+b,c);}
      else{const a=rnd(4,9),b=rnd(3,8),c=rnd(2,a+b-2);puzzle([a,b],a+' + '+b,c);}return 'Balance the scale: *'+st.Ltxt+' = □ + '+st.Rb+'*. What is □?';}};}
});

/* =========================================================
   12. Coding
   ========================================================= */
const LEVELS=[{s:[0,5,0],goal:[0,1],rocks:[[1,3],[2,2]]},{s:[0,5,0],goal:[3,2],rocks:[[0,1],[2,4],[4,3],[5,0]]},{s:[0,0,1],goal:[5,5],rocks:[[2,0],[3,2],[0,3],[4,4],[3,4]]},
  {s:[5,5,3],goal:[0,0],rocks:[[2,5],[5,2],[1,1]]},{s:[2,5,0],goal:[2,0],rocks:[[2,2],[1,1],[4,4]]}];
P.lesson({id:'coding',title:'Code a robot',strand:'Algebra',codes:['C3.1','C3.2','E1.4'],
 guide:{goal:'Write and execute code with sequential and repeating events, read and change existing code, and give and follow movement instructions with quarter turns.',words:'program, code, sequence, loop, repeat, debug, quarter turn',
  ask:['What would happen if two blocks swapped places?','How does ×5 make the program shorter?','Your robot bumped a rock. Which block is the bug?'],home:'Play "human robot". Give forward and quarter-turn instructions to reach the fridge. Use repeats to make it shorter.'},
 learn:[{say:'A program is steps in order.',speech:'A program is a list of steps a computer follows in order. Watch the robot run this program.',view:'model',demo:'run'},
        {say:'Read about loops and debugging.',speech:'A loop repeats a step. Times three means do it three times. A turn right is a quarter turn.',view:'read'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: write a program.',speech:'Your turn. Add blocks, use repeat, then press run. Tap the robot to run too.',view:'model'}],
 fig:'A robot on a grid. Each turn is a quarter turn.',rz:.8,
 explore:['Add *Forward*, *Left* and *Right* blocks.','Press *× repeat* to loop the last block.','Press *Run*, or tap the robot.'],
 tries:[['The robot faces north and turns right twice. Which way does it face?','*South.* Two quarter turns make a half turn.'],['Make this shorter: ↑ ↑ ↑ ↑','*↑ ×4.* A loop repeats the step 4 times.'],['A program is ↑ ×3, ↻, ↑. The robot should end 2 squares right. What is the bug?','*The last block.* It should be ↑ ×2, not ↑.']],
 howTo:'Write a program to move the robot to the star without bumping rocks. Use repeat blocks to make it short. Press Run to test it, then fix any bugs.',
 init:k=>({li:k==='play'?0:1,prog:k==='play'?[]:[{cmd:'F',n:3},{cmd:'R',n:1},{cmd:'F',n:3}],active:-1}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'A *program* is a list of steps that a computer follows in order. Coders say the steps run in *sequence*.')+16;
  rr(g,X0,y,470,214,16);g.fillStyle='#24203f';g.fill();['1   ↑  Forward ×3','2   ↻  Turn right','3   ↑  Forward ×2'].forEach((l,i)=>T(g,l,X0+30,y+62+i*56,FT.mono,['#9fe6ff','#ffd86b','#ffb3cf'][i]));
  const gx=X0+520,gy=y+4,s=50;for(let i=0;i<4;i++)for(let j=0;j<6;j++){g.fillStyle=(i+j)%2?'#efeafe':'#ffffff';g.fillRect(gx+j*s,gy+i*s,s,s);g.strokeStyle='#d8cff8';g.lineWidth=2;g.strokeRect(gx+j*s,gy+i*s,s,s);}
  g.strokeStyle='#e2457a';g.lineWidth=5;g.beginPath();g.moveTo(gx+s/2,gy+3.5*s);g.lineTo(gx+s/2,gy+.5*s);g.lineTo(gx+2.5*s,gy+.5*s);g.stroke();g.beginPath();g.arc(gx+s/2,gy+3.5*s,10,0,Math.PI*2);g.fillStyle=BLUE;g.fill();T(g,'★',gx+2.5*s,gy+.5*s+12,'700 34px serif','#f2a400','center');
  y+=272;y=para(p,y,'A *loop* repeats a step: ×3 means do it 3 times. *↻* is a quarter turn right, *↺* a quarter turn left. Fixing mistakes is *debugging*.')+14;
  y=keyWords(p,y,[['sequence','steps that run one after another, in order'],['loop','code that repeats a step'],['debug','find and fix a mistake in code']]);
  predict(p,y,S,'p12','The robot faces north. It runs  ↑  ↑  ↻  ↑ . Which way is it facing at the end?','*East.* ↻ is a quarter turn right, and right of north is east.');},
 readout(p,S,y){const g=p.g,st=S.st,NM={F:'↑ Forward',L:'↺ Left',R:'↻ Right'};T(g,'Program',X0,y+33,FT.smallB,acc());let x=X0+116,row=0;
  if(!st.prog.length)T(g,'empty: add blocks with the buttons',x,y+33,FT.cap,GREY);
  st.prog.forEach((b,i)=>{const lab=NM[b.cmd]+(b.n>1?' ×'+b.n:'');g.font=FT.smallB;const w=g.measureText(lab).width+30;if(x+w>X0+TW){x=X0+116;row++;}const yy=y+row*52;rr(g,x,yy,w,44,10);
    g.fillStyle=st.active===i?'#ffd86b':{F:'#d9f0ff',L:'#efe5ff',R:'#ffe3ee'}[b.cmd];g.fill();g.lineWidth=2;g.strokeStyle=INK;g.stroke();T(g,lab,x+15,yy+30,FT.smallB);x+=w+8;});return y+60+row*52;},
 build(S,grp,mode,game){const st=S.st,N=6,Tl=.56,cz=-1.35;const cw=(c,r)=>V((c-2.5)*Tl,0,(r-2.5)*Tl+cz);const tg=G('tile2',()=>new THREE.BoxGeometry(Tl-.04,.05,Tl-.04));
  for(let r=0;r<N;r++)for(let c=0;c<N;c++){const t=mk(tg,lam((r+c)%2?'#e6dcff':'#f7f3ff'),20);t.position.copy(cw(c,r));t.position.y=.025;grp.add(t);}
  const nl=label('N',{size:.3,color:'#8b5cf6'});nl.position.set(1.9,.3,cz-1.85);grp.add(nl);
  const lvl=new THREE.Group();grp.add(lvl);const robot=new THREE.Group();robot.scale.setScalar(.72);
  const body=mk(G('rbody',()=>new THREE.BoxGeometry(.46,.36,.4)),lam('#4fb3ff'),20);body.position.y=.18;robot.add(body);const head=mk(G('rhead',()=>new THREE.BoxGeometry(.36,.26,.32)),lam('#d8e8ff'),20);head.position.y=.5;robot.add(head);
  const eg=G('reye',()=>new THREE.BoxGeometry(.07,.07,.02));[-.08,.08].forEach(x=>{const e=new THREE.Mesh(eg,lam(INK));e.position.set(x,.52,-.165);robot.add(e);});
  const an=new THREE.Mesh(G('rant',()=>new THREE.CylinderGeometry(.015,.015,.18,6)),lam(INK));an.position.y=.72;robot.add(an);const bob=new THREE.Mesh(G('rbob',()=>new THREE.SphereGeometry(.05,10,8)),lam('#ff6b6b'));bob.position.y=.83;robot.add(bob);
  robot.traverse(o=>{if(o.isMesh)o.castShadow=true;});grp.add(robot);A.drag(robot,{tap:()=>run()});
  let rc,rrw,dir,ang,goal,running=false,steps=[],si=0,timer=0;
  function load(){clearGroup(lvl);const L=LEVELS[st.li];L.rocks.forEach(([c,r],i)=>{const k=mk(G('rock2',()=>new THREE.DodecahedronGeometry(.2,0)),lam('#b9c0cd'),20);k.position.copy(cw(c,r));k.position.y=.22;k.rotation.set(i,i*2,0);lvl.add(k);});
    goal=mk(starGeo,lam('#ffcf3f'),20);goal.position.copy(cw(L.goal[0],L.goal[1]));goal.position.y=.42;lvl.add(goal);reset(true);}
  function reset(quiet){const L=LEVELS[st.li];rc=L.s[0];rrw=L.s[1];dir=L.s[2];ang=-dir*Math.PI/2;const p=cw(rc,rrw);p.y=.05;robot.position.copy(p);robot.rotation.y=ang;robot.userData.tPos=null;robot.userData.tRotY=null;running=false;st.active=-1;if(!quiet)A.redraw();}
  const add=k=>{if(running)return;if(st.prog.length>=8){A.bad('That is a long program! Try a loop (×).');return;}st.prog.push({cmd:k,n:1});A.redraw();};
  const rep=()=>{if(running||!st.prog.length)return;const b=st.prog[st.prog.length-1];b.n=b.n>=6?1:b.n+1;A.redraw();};
  function run(){if(running)return;if(!st.prog.length){A.say('Add some blocks first.');return;}reset(true);steps=[];st.prog.forEach((b,bi)=>{for(let k=0;k<b.n;k++)steps.push({cmd:b.cmd,bi});});si=0;timer=.2;running=true;A.say('Running the program…');}
  function finish(ok,msg){running=false;st.active=-1;if(ok){A.good(msg,goal.getWorldPosition(V(0,0,0)));if(mode==='play')game.solved('The robot reached the star!');}else A.bad(msg);A.redraw();}
  function step(){if(si>=steps.length){const L=LEVELS[st.li];if(rc===L.goal[0]&&rrw===L.goal[1])finish(true,'The robot reached the star!');else finish(false,'The robot stopped before the star. Debug: change a block and run again.');return;}
    const s=steps[si++];st.active=s.bi;A.redraw();
    if(s.cmd==='L'){dir=(dir+3)%4;ang+=Math.PI/2;moveTo(robot,{rotY:ang,k:12});}else if(s.cmd==='R'){dir=(dir+1)%4;ang-=Math.PI/2;moveTo(robot,{rotY:ang,k:12});}
    else{const dc=[0,1,0,-1][dir],dr=[-1,0,1,0][dir],nc=rc+dc,nr=rrw+dr,L=LEVELS[st.li];const off=nc<0||nr<0||nc>=N||nr>=N,rock=L.rocks.some(([c,r])=>c===nc&&r===nr);
      if(off||rock){const here=cw(rc,rrw);here.y=.05;moveTo(robot,{pos:here.clone().add(V(dc*Tl*.3,0,dr*Tl*.3)),k:18,done:()=>moveTo(robot,{pos:here,k:14})});finish(false,off?'Oops! That goes off the board. Debug your code.':'Bonk! The robot hit a rock. Find the bug and fix it.');return;}
      rc=nc;rrw=nr;const p=cw(rc,rrw);p.y=.05;moveTo(robot,{pos:p,k:10});A.pop();}}
  load();
  return {tick(dt,t){if(goal)goal.rotation.y=t*1.5;if(running){timer-=dt;if(timer<=0){timer=.5;step();}}},info:()=>'Level '+(st.li+1)+': get the robot to the star.',
    controls:()=>[{t:'↑ Forward',fn:()=>add('F')},{t:'↺ Left',fn:()=>add('L')},{t:'↻ Right',fn:()=>add('R')},{t:'× repeat',fn:rep},{t:'▶ Run',go:true,fn:run},{t:'Undo',fn:()=>{if(!running){st.prog.pop();A.redraw();}}},{t:'Clear',fn:()=>{if(!running){st.prog=[];reset();}}}]
      .concat(mode==='learn'?[{t:'Next level',fn:()=>{st.li=(st.li+1)%LEVELS.length;st.prog=[];load();A.redraw();}}]:[]),
    demo(n){st.li=1;st.prog=[{cmd:'F',n:3},{cmd:'R',n:1},{cmd:'F',n:3}];load();A.redraw();A.seq([[900,run]]);},
    task(r){st.li=r;st.prog=[];load();return 'Level *'+(r+1)+'*: write a program that takes the robot to the star.'+(r>=2?' Use repeat blocks!':'');}};}
});

/* =========================================================
   13. Sorting with Venn and Carroll diagrams
   ========================================================= */
const ITEMS=[{s:'cube',c:'red'},{s:'sphere',c:'blue'},{s:'cone',c:'red'},{s:'cylinder',c:'yellow'},{s:'pyramid',c:'blue'},{s:'sphere',c:'red'},{s:'cube',c:'yellow'},{s:'cylinder',c:'blue'}];
const CURVED={sphere:1,cone:1,cylinder:1};const COLR={red:'#ff6b6b',blue:'#4f8df7',yellow:'#ffd24a'};
const RULES=[{a:['Red',i=>i.c==='red'],b:['Curved',i=>!!CURVED[i.s]]},{a:['Blue',i=>i.c==='blue'],b:['Has corners',i=>!CURVED[i.s]||i.s==='cone']},{a:['Yellow',i=>i.c==='yellow'],b:['Can roll',i=>!!CURVED[i.s]]},
  {a:['Cube or pyramid',i=>i.s==='cube'||i.s==='pyramid'],b:['Red',i=>i.c==='red']},{a:['Curved',i=>!!CURVED[i.s]],b:['Not red',i=>i.c!=='red']}];
P.lesson({id:'sorting',title:'Sorting with Venn diagrams',strand:'Data',codes:['D1.1'],
 guide:{goal:'Sort sets of data according to two attributes using Venn and Carroll diagrams.',words:'sort, attribute, Venn diagram, Carroll diagram, both, neither',
  ask:['Why does this shape go in the middle?','What goes outside both circles?','How is a Carroll diagram like a Venn diagram?'],home:'Sort laundry: socks and not socks, white and not white. Use two hula hoops or two loops of string.'},
 learn:[{say:'Sort by two rules at once.',speech:'A Venn diagram sorts things using two rules. Things that fit both rules go in the middle. Watch the shapes sort themselves.',view:'model',demo:'sort'},
        {say:'Read about Venn and Carroll diagrams.',speech:'A Carroll diagram uses a table instead of circles. Each box is one combination of the two rules.',view:'read'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: drag shapes into the hoops.',speech:'Your turn. Drag each shape into the right part of the Venn diagram. Shapes that fit neither rule go in the neither box.',view:'model'}],
 fig:'Two overlapping hoops make a Venn diagram.',rz:.82,
 explore:['*Drag* a shape into a hoop, the middle, or the *Neither* box.','A wrong guess bounces back with a hint.','Press *New rules* to sort a different way.'],
 tries:[['Rules: "red" and "can roll". Where does a red ball go?','*In the middle.* It is red and it can roll.'],['Where does a blue cube go with the rules "red" and "can roll"?','*Outside both circles (neither).* It is not red and it cannot roll.'],['In a Carroll diagram, how many boxes are there for 2 rules?','*4 boxes:* both, only the first, only the second, and neither.']],
 howTo:'Read the two rules on the hoops. Drag each shape to the part of the diagram where it belongs. Sort every shape to win the round.',
 init:k=>({ri:0,placed:{}}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'We can *sort* things by their *attributes*, like colour or shape. A *Venn diagram* uses overlapping circles for two rules.')+12;
  const cx=X0+240,cy=y+140;g.globalAlpha=.25;g.fillStyle='#ff6b6b';g.beginPath();g.arc(cx-70,cy,120,0,Math.PI*2);g.fill();g.fillStyle='#4f8df7';g.beginPath();g.arc(cx+70,cy,120,0,Math.PI*2);g.fill();g.globalAlpha=1;
  g.lineWidth=4;g.strokeStyle='#e2457a';g.beginPath();g.arc(cx-70,cy,120,0,Math.PI*2);g.stroke();g.strokeStyle=BLUE;g.beginPath();g.arc(cx+70,cy,120,0,Math.PI*2);g.stroke();
  T(g,'Red',cx-130,cy-130,FT.bodyB,'#e2457a','center');T(g,'Curved',cx+130,cy-130,FT.bodyB,BLUE,'center');T(g,'red cube',cx-110,cy+8,FT.small,INK,'center');T(g,'red ball',cx,cy+8,FT.smallB,INK,'center');T(g,'blue can',cx+110,cy+8,FT.small,INK,'center');
  T(g,'both!',cx,cy+46,FT.hand,acc(),'center');const tx=X0+540,ty=y+30,cw2=140,ch2=70;
  [['','Curved','Not curved'],['Red','red ball','red cube'],['Not red','blue can','blue cube']].forEach((r,i)=>r.forEach((c,j)=>{const x=tx+j*cw2*.8-(j?0:20),yy=ty+i*ch2;if(i&&j){g.strokeStyle=INK;g.lineWidth=2;g.strokeRect(x-8,yy-44,cw2*.8,ch2);}T(g,c,x,yy,i===0||j===0?FT.smallB:FT.small,i===0||j===0?acc():INK);}));
  T(g,'Carroll diagram',tx,ty+3*ch2+10,FT.hand,BLUE);y+=300;
  y=keyWords(p,y,[['attribute','a feature, like colour, shape or size'],['Venn diagram','overlapping circles; the overlap means both'],['Carroll diagram','a table that sorts by yes and no for two rules']]);
  predict(p,y,S,'p13','Rules: "blue" and "has corners". Where does a red sphere go?','*Neither.* It is not blue and it has no corners, so it goes outside both circles.');},
 readout(p,S,y){const g=p.g,st=S.st,R=RULES[st.ri],n=Object.keys(st.placed).length;T(g,'Rules: '+R.a[0]+'  and  '+R.b[0],X0,y+40,FT.bodyB,acc());T(g,n+' of '+ITEMS.length+' shapes sorted',X0,y+82,ZS(40));return y+92;},
 build(S,grp,mode,game){const st=S.st,ZC=-1.55,RA=.95,AX=-.58,BX=.58;
  const mat=mk(new THREE.BoxGeometry(3.8,.03,2.5),lam('#f7f3ea'),20);mat.position.set(-.2,.015,ZC);grp.add(mat);
  const ringG=G('ring',()=>new THREE.TorusGeometry(RA,.04,8,64));const rA=mk(ringG,lam('#ff6b6b'),0),rB=mk(ringG,lam('#4f8df7'),0);[rA,rB].forEach((r,i)=>{r.rotation.x=Math.PI/2;r.position.set(i?BX:AX,.05,ZC);grp.add(r);});
  const nb=mk(new THREE.BoxGeometry(.62,.04,1.1),lam('#e6e8ee'),20);nb.position.set(1.95,.02,ZC+.3);grp.add(nb);const nl=label('Neither',{size:.2});nl.position.set(1.95,.25,ZC-.4);grp.add(nl);
  const la=label('',{size:.26,bg:'#ffe3e3'}),lb=label('',{size:.26,bg:'#e3ecff'});la.position.set(AX-.45,.5,ZC-1.05);lb.position.set(BX+.45,.5,ZC-1.05);grp.add(la,lb);
  const items=new THREE.Group();grp.add(items);let meshes=[];
  const geo={cube:()=>new THREE.BoxGeometry(.28,.28,.28),sphere:()=>new THREE.SphereGeometry(.17,20,14),cone:()=>new THREE.ConeGeometry(.17,.34,20),cylinder:()=>new THREE.CylinderGeometry(.14,.14,.3,20),pyramid:()=>{const q=new THREE.ConeGeometry(.2,.32,4);q.rotateY(Math.PI/4);return q;}};
  const home=i=>V(-2+i*.5,.17,.45);
  function region(p){const a=Math.hypot(p.x-AX,p.z-ZC)<RA,b=Math.hypot(p.x-BX,p.z-ZC)<RA,nbx=Math.abs(p.x-1.95)<.36&&Math.abs(p.z-(ZC+.3))<.6;return nbx?'none':a&&b?'both':a?'a':b?'b':null;}
  function correct(it){const R=RULES[st.ri],a=R.a[1](it),b=R.b[1](it);return a&&b?'both':a?'a':b?'b':'none';}
  function hint(it,reg){const R=RULES[st.ri];const a=R.a[1](it),b=R.b[1](it);return 'This '+it.c+' '+it.s+(a?' is ':' is not ')+R.a[0].toLowerCase()+(a===b?' and':' but')+(b?' is ':' is not ')+R.b[0].toLowerCase()+'.';}
  function spot(reg,i){const j=(i%3)-1,k=Math.floor(i/3)%2;return reg==='both'?V(0,.17,ZC+(i%2?.25:-.25)):reg==='a'?V(AX-.45+k*.1,.17,ZC+j*.35):reg==='b'?V(BX+.45-k*.1,.17,ZC+j*.35):V(1.95,.17,ZC+j*.32+.3);}
  function setup(){clearGroup(items);meshes=[];st.placed={};const R=RULES[st.ri];la.userData.set(R.a[0]);lb.userData.set(R.b[0]);
    ITEMS.forEach((it,i)=>{const m=mk(geo[it.s](),lam(COLR[it.c]),25);m.position.copy(home(i));items.add(m);meshes.push(m);
      A.drag(m,{h:.4,drop:(pos)=>{const reg=region(pos);if(!reg){moveTo(m,{pos:st.placed[i]?m.userData.spot:home(i),k:10});return;}
        if(reg===correct(it)){st.placed[i]=reg;const n=Object.values(st.placed).filter(r=>r===reg).length;m.userData.spot=spot(reg,n);moveTo(m,{pos:m.userData.spot,k:10});A.pop();done();}
        else{A.bad(hint(it,reg));delete st.placed[i];moveTo(m,{pos:home(i),k:8});}A.redraw();}});});A.redraw();}
  function done(){if(Object.keys(st.placed).length===ITEMS.length){if(mode==='play')game.solved('Every shape is sorted!');else A.good('Every shape is sorted!');}}
  function autoSort(){const l=[];ITEMS.forEach((it,i)=>l.push([550,()=>{const reg=correct(it);st.placed[i]=reg;const n=Object.values(st.placed).filter(r=>r===reg).length;meshes[i].userData.spot=spot(reg,n);hop(meshes[i],meshes[i].userData.spot,.6,.5);A.say(it.c+' '+it.s+': '+(reg==='both'?'both':reg==='none'?'neither':reg==='a'?RULES[st.ri].a[0]:RULES[st.ri].b[0]));A.redraw();}]));A.seq(l);}
  setup();
  return {info:()=>'Rules: '+RULES[st.ri].a[0]+' and '+RULES[st.ri].b[0],controls:()=>mode==='learn'?[{t:'New rules',fn:()=>{st.ri=(st.ri+1)%RULES.length;setup();}},{t:'Start over',fn:setup},{t:'Show me',go:true,fn:autoSort}]:[{t:'Start over',fn:setup}],
    demo(){st.ri=0;setup();A.seq([[700,autoSort]]);},task(r){st.ri=r;setup();return 'Sort every shape. The rules are *'+RULES[r].a[0]+'* and *'+RULES[r].b[0]+'*.';}};}
});

/* =========================================================
   14. Pictographs and bar graphs
   ========================================================= */
const FRUIT=['Apples','Blueberries','Bananas','Strawberries'],FCOL=['#ff8a8a','#6ea0ff','#ffd84a','#ff8cc4'];
P.lesson({id:'graphs',title:'Pictographs and bar graphs',strand:'Data',codes:['D1.2','D1.3','D1.5'],
 guide:{goal:'Collect and organize data in frequency tables and display it in pictographs and bar graphs using many-to-one correspondence, with titles, labels and scales; then ask and answer questions about the data.',words:'data, tally, frequency table, pictograph, bar graph, title, key, scale',
  ask:['Why do we bundle tallies in groups of five?','What does the key tell you?','What question could this graph answer?'],home:'Survey the family about favourite snacks. Make tallies, then stack blocks to build the bar graph.'},
 learn:[{say:'Graphs show data.',speech:'Data is information we collect. A class voted for their favourite fruit. Watch the votes stack up into a bar graph.',view:'model',demo:'build'},
        {say:'Read about tallies and keys.',speech:'A tally chart bundles marks in fives. The key tells what each cube or picture is worth.',view:'read'},
        {say:'Watch: a pictograph with a key.',speech:'Now each picture stands for two votes. Half a picture is one vote.',view:'model',demo:'pict'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: change the votes.',speech:'Your turn. Tap a bar to add a vote, or use the buttons. Switch between bar graph and pictograph.',view:'model'}],
 fig:'Our favourite fruit, as a bar graph or a pictograph.',rz:-.5,
 explore:['*Tap a bar* to add one vote.','Switch between *Bar graph* and *Pictograph*.','Change the *key* so one cube or picture stands for 2 votes.'],
 tries:[['Apples 8, Bananas 5. How many more people chose apples?','*3 more.* 8 − 5 = 3.'],['The key is ● = 2 votes. A row has 4 pictures. How many votes?','*8 votes.* 4 × 2 = 8.'],['Votes: 6, 9, 9, 4. What is the mode?','*9.* It appears most often.']],
 howTo:'Read the question. Tap bars or use the buttons to change the votes, the key or the type of graph until the graph matches.',
 init:k=>({v:[8,12,5,10],scale:1,pict:false,want:null}),
 left(p,S){const g=p.g,st=S.st;let y=header(p,S);
  y=para(p,y,'*Data* is information we collect. Our class voted for a favourite fruit and kept a *tally*. A graph needs a *title*, *labels* and a *key*.')+16;
  const cx=[X0,X0+290,X0+690];g.fillStyle=tint(acc(),.14);g.fillRect(X0,y,TW,48);T(g,'Fruit',cx[0]+14,y+34,FT.smallB);T(g,'Tally',cx[1],y+34,FT.smallB);T(g,'Votes',cx[2],y+34,FT.smallB);
  FRUIT.forEach((n,i)=>{const yy=y+48+i*56;g.fillStyle=FCOL[i];g.beginPath();g.arc(cx[0]+24,yy+30,9,0,Math.PI*2);g.fill();T(g,n,cx[0]+42,yy+38,FT.small);const v=st.v[i];g.strokeStyle=INK;g.lineWidth=3;
    for(let k=0;k<v;k++){const g5=Math.floor(k/5),m=k%5,bx=cx[1]+g5*72;if(m<4){g.beginPath();g.moveTo(bx+m*13,yy+14);g.lineTo(bx+m*13,yy+46);g.stroke();}else{g.beginPath();g.moveTo(bx-6,yy+40);g.lineTo(bx+46,yy+18);g.stroke();}}
    T(g,String(v),cx[2]+20,yy+38,FT.bodyB);});y+=48+4*56+40;
  y=para(p,y,'In a *pictograph*, each picture stands for some votes. With the key *● = 2 votes*, half a picture means 1 vote.')+14;
  y=keyWords(p,y,[['tally','a mark for each vote, bundled in fives'],['key','tells what one picture or cube stands for']]);
  predict(p,y,S,'p14','If 1 cube = 2 votes, how many cubes show 12 votes?','*6 cubes,* because 6 groups of 2 make 12.');},
 readout(p,S,y){const g=p.g,st=S.st;const mx=Math.max(...st.v),md=FRUIT.filter((n,i)=>st.v[i]===mx),tot=st.v.reduce((a,b)=>a+b,0);
  [-1.5,-.5,.5,1.5].forEach((x,i)=>{T(g,FRUIT[i],cxOf(x),y+10,FT.smallB,INK,'center');T(g,String(st.v[i]),cxOf(x),y+50,ZS(36),acc(),'center');});
  T(g,'Total: '+tot+'   ·   Most: '+(md.length>1?md.join(' & '):md[0])+'   ·   Key: 1 = '+st.scale+(st.scale>1?' votes':' vote'),X0,y+100,FT.bodyB);return y+110;},
 build(S,grp,mode,game){const st=S.st,u=.2,xs=[-1.5,-.5,.5,1.5],z=-1.0;
  const back=lam('#fff3e6');const board=mk(new THREE.BoxGeometry(21*u,16*u,.04),[back,back,back,back,cellMat('#ffffff',21,16),back],20);board.position.set(0,8*u,-1.45);grp.add(board);
  const title=label('Our favourite fruit',{size:.3,bg:'#ffffff'});title.position.set(0,16*u+.3,-1.4);grp.add(title);const key=label('',{size:.22});key.position.set(1.35,16*u-.15,-1.38);grp.add(key);
  let axis=[];const stacks=[[],[],[],[]];const tops=xs.map(()=>{const l=label('',{size:.28});grp.add(l);return l;});
  const hits=xs.map((x,i)=>{const h=new THREE.Mesh(new THREE.BoxGeometry(.6,3.4,.6),new THREE.MeshBasicMaterial({visible:false}));h.position.set(x,1.7,z);grp.add(h);A.drag(h,{tap:()=>ch(i,1)});return h;});
  function drawAxis(){axis.forEach(a=>{grp.remove(a);disposeObj(a);});axis=[];for(let v=0;v<=16;v+=4){const l=label(String(v),{size:.22});l.position.set(-2.22,v/st.scale*u+.02,-1.38);grp.add(l);axis.push(l);}key.userData.set('Key: 1 '+(st.pict?'●':'cube')+' = '+st.scale+(st.scale>1?' votes':' vote'));}
  function bar(i,anim){stacks[i].forEach(m=>{grp.remove(m);disposeObj(m);});stacks[i]=[];const v=st.v[i],full=Math.floor(v/st.scale),half=v%st.scale;let y=0;const n=full+(half?1:0);
    for(let k=0;k<n;k++){const hf=k===full;let m;if(st.pict){m=mk(hf?G('hemi',()=>new THREE.SphereGeometry(.09,16,10,0,Math.PI)):G('sph9',()=>new THREE.SphereGeometry(.09,16,12)),lam(FCOL[i]),0);if(hf)m.rotation.y=-Math.PI/2;}
      else m=unitBox(2,hf?.5:1,2,FCOL[i],u);const h=st.pict?u:(hf?.5:1)*u;const p=V(xs[i],y+h/2,z);m.position.copy(p);if(anim&&k===n-1){m.position.y+=1;moveTo(m,{pos:p,k:10});}grp.add(m);stacks[i].push(m);y+=h;}
    tops[i].userData.set(String(v));tops[i].position.set(xs[i],y+.22,z);}
  function all(){for(let i=0;i<4;i++)bar(i,false);drawAxis();}
  function ch(i,d){const nv=Math.max(0,Math.min(16,st.v[i]+d));if(nv===st.v[i])return;st.v[i]=nv;bar(i,d>0);A.pop();check();A.redraw();}
  function check(){if(mode!=='play'||!st.want)return;if(st.want(st))game.solved('Yes! The graph shows it.');}
  all();
  return {info:()=>FRUIT.map((f,i)=>f+' '+st.v[i]).join(' · '),
    controls:()=>{const o=[];FRUIT.forEach((f,i)=>{o.push({t:f.slice(0,5)+' −',fn:()=>ch(i,-1)},{t:f.slice(0,5)+' +',fn:()=>ch(i,1)});});
      o.push({t:'Bar graph',on:!st.pict,fn:()=>{st.pict=false;all();check();A.redraw();}},{t:'Pictograph',on:st.pict,fn:()=>{st.pict=true;all();check();A.redraw();}},{t:'Key: 1',on:st.scale===1,fn:()=>{st.scale=1;all();check();A.redraw();}},{t:'Key: 2',on:st.scale===2,fn:()=>{st.scale=2;all();check();A.redraw();}});return o;},
    demo(n){if(n==='build'){st.pict=false;st.scale=1;st.v=[0,0,0,0];all();const tgt=[8,12,5,10],l=[];for(let k=0;k<12;k++)l.push([140,()=>{for(let i=0;i<4;i++)if(st.v[i]<tgt[i])ch(i,1);}]);A.seq(l);}
      if(n==='pict'){st.pict=true;st.scale=2;st.v=[8,12,5,10];all();A.redraw();}},
    task(r){st.v=[rnd(3,9),rnd(3,9),rnd(3,9),rnd(3,9)];st.pict=false;st.scale=1;all();
      const L=[[s=>{const m=Math.max(...s.v);return s.v[2]===m&&s.v.filter(v=>v===m).length===1;},'Make *Bananas* the mode (the most votes).'],
        [s=>s.v.reduce((a,b)=>a+b,0)===30,'Change the votes so the *total is 30*.'],[s=>s.v[0]===s.v[2]+4,'Make *Apples* exactly *4 more* than Bananas.'],
        [s=>s.pict&&s.scale===2&&s.v[1]===12,'Show *Blueberries = 12* on a *pictograph* where each ● = 2 votes.'],[s=>{const m=Math.min(...s.v);return s.v[3]===m&&s.v.filter(v=>v===m).length===1;},'Make *Strawberries* the *least* popular fruit.']][r];
      st.want=L[0];if(L[0](st)){st.v[2]=Math.max(0,st.v[2]-1);all();}return L[1];}};}
});

/* =========================================================
   15. Mean and mode
   ========================================================= */
const KIDS=['Ana','Ben','Cai','Dev','Eli'];
P.lesson({id:'mean',title:'Mean and mode',strand:'Data',codes:['D1.4','D2.2'],
 guide:{goal:'Find the mean of a data set by evening it out, identify the mode, and explain what each tells about the data.',words:'mean, average, mode, data set, even out, fair share',
  ask:['What does it mean to "even out" the towers?','Can a data set have more than one mode?','Would the mean be the same for a different class? Why might it change?'],home:'Stack coins in 5 piles of different heights. Move coins until all piles match. That height is the mean.'},
 learn:[{say:'The mean evens things out.',speech:'Five friends read some books. The mean is the number each friend would have if we evened out the towers. Watch.',view:'model',demo:'even'},
        {say:'Read about mean and mode.',speech:'To find the mean, add all the numbers, then share the total equally. The mode is the number that appears most often.',view:'read'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: drag cubes to even out.',speech:'Your turn. Drag a cube from a tall tower onto a short tower until every tower is the same height.',view:'model'}],
 fig:'Books read by five friends, one cube per book.',rz:-.45,
 explore:['*Drag* a cube from a tall tower to a short one.','When every tower matches, that height is the *mean*.','Look for the *mode*: the height that appears most.'],
 tries:[['Find the mean of 2, 4 and 6.','*4.* 2 + 4 + 6 = 12, and 12 shared by 3 is 4.'],['Find the mode of 3, 5, 5, 7, 5, 2.','*5.* It appears three times.'],['Towers of 1, 5 and 3 cubes. Even them out. How tall is each?','*3 cubes.* 1 + 5 + 3 = 9, and 9 ÷ 3 = 3.']],
 howTo:'Drag cubes from taller towers to shorter towers until all five towers are the same height. That height is the mean.',
 init:k=>({v:[2,6,4,7,1],orig:[2,6,4,7,1]}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'The *mean* is what each would get if everything were *shared out evenly*. The *mode* is the value that appears *most often*.')+16;
  const a=[2,6,4],b=[4,4,4],sq=34;[a,b].forEach((arr,k)=>{arr.forEach((v,i)=>{for(let j=0;j<v;j++){g.fillStyle=k?'#5cc46a':VIBE[i];g.fillRect(X0+k*440+i*90,y+240-(j+1)*sq,70,sq-4);}});});
  T(g,'→',X0+330,y+150,ZS(70),acc());T(g,'2, 6, 4',X0+70,y+280,FT.bodyB,INK);T(g,'mean = 4',X0+500,y+280,FT.bodyB,acc());y+=320;
  rr(g,X0,y,TW,110,18);g.fillStyle=tint(acc(),.1);g.fill();T(g,'Add, then share:  2 + 6 + 4 = 12,   12 ÷ 3 = 4',X0+28,y+66,FT.bodyB);y+=136;
  y=keyWords(p,y,[['mean','the even share: add the values, then divide by how many'],['mode','the value that appears most often']]);
  predict(p,y,S,'p15','Data: 3, 3, 9. What is the mean? What is the mode?','*Mean 5, mode 3.* 3 + 3 + 9 = 15, and 15 ÷ 3 = 5. The value 3 appears most.');},
 readout(p,S,y){const g=p.g,st=S.st;const xs=[-1.8,-.9,0,.9,1.8];KIDS.forEach((k,i)=>{T(g,k,cxOf(xs[i]),y+12,FT.smallB,INK,'center');T(g,String(st.v[i]),cxOf(xs[i]),y+52,ZS(36),acc(),'center');});
  const tot=st.v.reduce((a,b)=>a+b,0),even=st.v.every(v=>v===st.v[0]);const f={};st.orig.forEach(v=>f[v]=(f[v]||0)+1);const mx=Math.max(...Object.values(f));const md=Object.keys(f).filter(k=>f[k]===mx);
  T(g,'Total '+tot+' ÷ 5 = '+(tot/5)+(even?'   Evened out!':''),X0,y+102,FT.bodyB,even?'#16a36f':INK);T(g,'Mode of the starting data: '+(mx===1?'none':md.join(' and ')),X0,y+142,FT.small,GREY);return y+150;},
 build(S,grp,mode,game){const st=S.st,u=.24,xs=[-1.8,-.9,0,.9,1.8],Z=-1.45;const tw=new THREE.Group();grp.add(tw);let cubes=[[],[],[],[],[]];
  const names=KIDS.map((k,i)=>{const l=label(k,{size:.22});l.position.set(xs[i],.2,Z+.45);grp.add(l);return l;});
  function rebuild(){clearGroup(tw);cubes=[[],[],[],[],[]];st.v.forEach((v,i)=>{for(let k=0;k<v;k++){const m=unitBox(1,1,1,VIBE[i],u);m.position.set(xs[i],u/2+k*u,Z);tw.add(m);cubes[i].push(m);
      A.drag(m,{h:1.2,drop:(pos)=>{const j=xs.reduce((b,x,q)=>Math.abs(pos.x-x)<Math.abs(pos.x-xs[b])?q:b,0);move(i,j);}});}});}
  function move(i,j){if(i===j||st.v[i]<=0){rebuild();return;}st.v[i]--;st.v[j]++;A.pop();rebuild();check();A.redraw();}
  function check(){if(st.v.every(v=>v===st.v[0])){const m=st.v[0];if(mode==='play')game.solved('All towers are '+m+'. The mean is '+m+'!');else A.good('Evened out! The mean is '+m+'.');}}
  function setData(v){st.v=v.slice();st.orig=v.slice();rebuild();A.redraw();}
  function evenOut(){const l=[];let v=st.v.slice();for(let s=0;s<20;s++){const hi=v.indexOf(Math.max(...v)),lo=v.indexOf(Math.min(...v));if(v[hi]-v[lo]<=0)break;v[hi]--;v[lo]++;const a=hi,b=lo;l.push([500,()=>move(a,b)]);}A.seq(l);}
  function newData(){const mean=rnd(2,6);const v=[mean,mean,mean,mean,mean];for(let k=0;k<6;k++){const a=rnd(0,4),b=rnd(0,4);if(v[a]>1&&v[b]<9){v[a]--;v[b]++;}}if(v.every(x=>x===v[0])){v[0]--;v[1]++;}return v;}
  rebuild();
  return {info:()=>'Total '+st.v.reduce((a,b)=>a+b,0)+' books, 5 friends',controls:()=>mode==='learn'?[{t:'Even it out for me',go:true,fn:evenOut},{t:'Start over',fn:()=>setData(st.orig)},{t:'New data',fn:()=>setData(newData())}]:[{t:'Start over',fn:()=>setData(st.orig)}],
    demo(){setData([2,6,4,7,1]);A.seq([[800,evenOut]]);},task(r){setData(newData());return 'Even out the towers to find the *mean* of '+st.v.join(', ')+'.';}};}
});

/* =========================================================
   16. Probability
   ========================================================= */
const CHANCE=['certain','likely','equally likely','unlikely','impossible'];
P.lesson({id:'chance',title:'How likely is it?',strand:'Data',codes:['D2.1'],
 guide:{goal:'Use the words impossible, unlikely, equally likely, likely and certain to describe the likelihood of events, and use likelihood to make predictions.',words:'probability, impossible, unlikely, equally likely, likely, certain, outcome',
  ask:['Which spinner makes blue certain? Why?','Did your tally match what you predicted?','Name something at school that is unlikely to happen.'],home:'Put 3 red and 1 blue sock in a bag. Predict, then pull one out 10 times and tally.'},
 learn:[{say:'Some things are more likely.',speech:'Some things are sure to happen and some can never happen. Watch the spinner. Blue covers three fourths, so blue is likely.',view:'model',demo:'spin'},
        {say:'Read the chance words.',speech:'Impossible, unlikely, equally likely, likely and certain describe how likely something is.',view:'read'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: spin and tally.',speech:'Your turn. Pick a spinner and tap it to spin. Count how often it lands on blue.',view:'model'}],
 fig:'A spinner with four equal parts.',rz:.35,
 explore:['Pick spinner *A, B, C, D or E*.','*Tap the spinner* or press *Spin*. Try *Spin 10 times*.','Compare the tally with your prediction.'],
 tries:[['A bag has 5 red marbles and no blue ones. How likely is picking blue?','*Impossible.* There are no blue marbles.'],['A coin can land heads or tails. How likely is heads?','*Equally likely.* Heads and tails have the same chance.'],['A spinner is 3/4 green. Is landing on green likely or unlikely?','*Likely.* Green covers most of the spinner.']],
 howTo:'Look at the spinner and pick the word that says how likely blue is. Some rounds ask you to choose the spinner that matches the word.',
 init:k=>({si:1,tally:[0,0],want:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'Some things are sure to happen and some can never happen. We use special words to describe how *likely* something is.')+16;
  const segC=['#e2457a','#ff9a5c','#ffd24a','#7fd17a','#16a36f'],lab=['impossible','unlikely','equally likely','likely','certain'],sw=TW/5;
  lab.forEach((l,i)=>{rr(g,X0+i*sw+3,y,sw-6,46,12);g.fillStyle=segC[i];g.fill();T(g,l,X0+i*sw+sw/2,y+80,FT.smallB,INK,'center');});y+=126;
  [['Rolling a 7 on a number cube','impossible',0],['Flipping heads on a coin','equally likely',2],['The sun will rise tomorrow','certain',4]].forEach(([t,w,i],k)=>{g.beginPath();g.arc(X0+12,y-8+k*40,8,0,Math.PI*2);g.fillStyle=segC[i];g.fill();T(g,t+': ',X0+30,y+k*40,FT.small);g.font=FT.small;T(g,w,X0+30+g.measureText(t+': ').width,y+k*40,FT.smallB,i===2?'#b38a00':segC[i]);});
  y+=136;const cx=X0+110,cy=y+90;for(let i=0;i<4;i++){g.beginPath();g.moveTo(cx,cy);g.arc(cx,cy,90,-Math.PI/2+i*Math.PI/2,-Math.PI/2+(i+1)*Math.PI/2);g.closePath();g.fillStyle=i<3?'#4f8df7':'#ffd24a';g.fill();g.lineWidth=3;g.strokeStyle=INK;g.stroke();}
  wrap(g,'Blue covers *3/4* of this spinner, so landing on blue is *likely*. Yellow covers only 1/4, so yellow is *unlikely*.',X0+240,y+50,TW-240,38,{font:FT.body,bold:FT.bodyB});y+=206;
  y=keyWords(p,y,[['outcome','one possible result, like landing on blue'],['equally likely','two outcomes that have the same chance']]);
  predict(p,y,S,'p16','A spinner is 3/4 blue and 1/4 yellow. Which colour will it land on more often?','Probably *blue.* Blue covers more of the spinner, so it is more likely.');},
 readout(p,S,y){const g=p.g,st=S.st,blue=4-st.si;T(g,'Spinner '+'ABCDE'[st.si]+': '+blue+' of 4 parts are blue',X0,y+36,FT.bodyB,acc());T(g,'Blue: '+st.tally[0]+'   ·   Yellow: '+st.tally[1],X0,y+84,ZS(40));return y+94;},
 build(S,grp,mode,game){const st=S.st,R=1.32,Z=-1.3;let spinning=false,phi=0;
  const stand=mk(new THREE.CylinderGeometry(R+.08,R+.14,.1,48),lam('#ffffff'),30);stand.position.set(0,.05,Z);grp.add(stand);
  const disk=new THREE.Group();disk.position.set(0,.1,Z);grp.add(disk);const wed=[];for(let i=0;i<4;i++){const m=mk(wedgeGeo(R,.07,i*Math.PI/2,(i+1)*Math.PI/2),[lam('#4f8df7'),lam('#3a6fd0')],25);disk.add(m);wed.push(m);}
  function paint(){const blue=4-st.si;wed.forEach((m,i)=>{m.material=i<blue?[lam('#4f8df7'),lam('#3a6fd0')]:[lam('#ffd24a'),lam('#e0b62e')];});}
  const arrow=new THREE.Group();arrow.position.set(0,.22,Z);grp.add(arrow);const sh=new THREE.Shape();sh.moveTo(-.25,-.07);sh.lineTo(R*.72,-.05);sh.lineTo(R*.72,-.13);sh.lineTo(R*.92,0);sh.lineTo(R*.72,.13);sh.lineTo(R*.72,.05);sh.lineTo(-.25,.07);sh.closePath();
  const ag=new THREE.ExtrudeGeometry(sh,{depth:.05,bevelEnabled:false});ag.rotateX(-Math.PI/2);arrow.add(mk(ag,lam('#e2457a'),25));
  const pin=mk(new THREE.CylinderGeometry(.09,.09,.16,20),lam('#ffffff'),30);pin.position.set(0,.22,Z);grp.add(pin);
  const tapper=new THREE.Mesh(new THREE.CylinderGeometry(R,R,.4,24),new THREE.MeshBasicMaterial({visible:false}));tapper.position.set(0,.2,Z);grp.add(tapper);A.drag(tapper,{tap:()=>spin(1)});
  const isBlue=a=>{const t=((a%(Math.PI*2))+Math.PI*2)%(Math.PI*2);return Math.floor(t/(Math.PI/2))<4-st.si;};
  function setup(i){if(spinning)return;st.si=i;st.tally=[0,0];paint();A.pop();if(mode==='play'&&st.want&&st.want.pickSpinner!=null){if(i===st.want.pickSpinner)game.solved(st.want.ok);else A.bad('Look at how much of the spinner is blue.');}A.redraw();}
  function spin(n){if(spinning)return;spinning=true;const extra=[];for(let k=0;k<n-1;k++)extra.push(isBlue(Math.random()*Math.PI*2));const fin=Math.random()*Math.PI*2,p0=phi;const target=p0+Math.PI*6+(((fin-p0)%(Math.PI*2))+Math.PI*2)%(Math.PI*2);
    tween(n>1?1.4:2,k=>{phi=p0+(target-p0)*k;arrow.rotation.y=phi;},easeOut).then(()=>{spinning=false;const res=[...extra,isBlue(phi)];res.forEach(b=>st.tally[b?0:1]++);A.pop();
      A.say(n>1?n+' spins: '+res.filter(Boolean).length+' blue, '+res.filter(b=>!b).length+' yellow.':'It landed on '+(res[0]?'blue':'yellow')+'!');A.redraw();});}
  paint();
  return {info:()=>'Spinner '+'ABCDE'[st.si]+' · blue '+st.tally[0]+', yellow '+st.tally[1],
    controls:()=>{const sp=[0,1,2,3,4].map(i=>({t:'Spinner '+'ABCDE'[i],on:i===st.si,fn:()=>setup(i)}));const go=[{t:'Spin',go:true,fn:()=>spin(1)},{t:'Spin 10 times',fn:()=>spin(10)}];
      if(mode==='play'&&st.want&&st.want.word)return CHANCE.slice().reverse().map(w=>({t:w,fn:()=>{if(w===CHANCE[st.si])game.solved('Yes! Blue is '+w+' on this spinner.');else A.bad('Not quite. Look at how much of the spinner is blue.');}})).concat(go);
      return sp.concat(go);},
    demo(){setup(1);A.seq([[900,()=>spin(10)]]);},
    task(r){st.tally=[0,0];if(r===3){st.want={pickSpinner:0,ok:'Spinner A is all blue: yellow is impossible!'};st.si=2;paint();return 'Pick the spinner where landing on *yellow* is *impossible*.';}
      if(r===4){st.want={pickSpinner:2,ok:'Spinner C: blue and yellow are equally likely!'};st.si=0;paint();return 'Pick the spinner where blue and yellow are *equally likely*.';}
      st.si=[1,3,4][r];st.want={word:true};paint();return 'How likely is it that this spinner lands on *blue*? Spin it to test, then pick the word.';}};}
});
})();
