/* The Interactive Classroom: Grade 6 Math — Number, part B (lessons 8–14) */
(function(){
"use strict";
const P=window.PM;if(!P||P.failed||!P.THREE)return;
const {THREE,V,W,D,PY,PX,X0,TW,INK,RED,BLUE,GREY,VIBE,FT,ZS,G,M,lam,mk,unitBox,cellMat,label,starGeo,wedgeGeo,clearGroup,disposeObj,rr,T,wrap,para,header,keyWords,predict,box,caption,cxOf,cyOf,tint,moveTo,hop,tween,burst,easeOut,easeIO,A}=P;
const acc=()=>P.ACC;
const rnd=(a,b)=>a+Math.floor(Math.random()*(b-a+1)),pick=a=>a[Math.floor(Math.random()*a.length)],shuffle=a=>a.slice().sort(()=>Math.random()-.5);
const fmt=n=>{const neg=n<0;let s=String(Math.abs(n));let [i,f]=s.split('.');if(i.length>=5)i=i.replace(/\B(?=(\d{3})+(?!\d))/g,' ');return (neg?'−':'')+i+(f!=null?'.'+f:'');};
const gcd=(a,b)=>b?gcd(b,a%b):a,lcm=(a,b)=>a*b/gcd(a,b);
const dec=(v,d)=>{if(!d)return fmt(v);const s=(v/Math.pow(10,d)).toFixed(d);return d?s.replace(/0+$/,'').replace(/\.$/,''):s;};
function choices(game,list,ans,ok,lab){return list.map(o=>({t:lab?lab(o):String(o),big:true,fn:()=>{if(o===ans){if(game)game.solved(ok);else A.good(ok);}else A.bad('Not quite. Try again!');}}));}
function opts(ans,spread,min){const s=new Set([ans]);let k=0;while(s.size<3&&k<60){k++;const v=Math.round((ans+pick(spread))*1000)/1000;if(v>=(min==null?0:min))s.add(v);}return shuffle([...s]);}
function digitMat(t,bg,fg){return M('d6g'+t+bg,()=>{const c=document.createElement('canvas');c.width=c.height=128;const g=c.getContext('2d');g.fillStyle=bg;g.fillRect(0,0,128,128);
  g.strokeStyle='rgba(27,34,54,.25)';g.lineWidth=6;g.strokeRect(3,3,122,122);g.fillStyle=fg||'#1b2236';g.font='700 84px "Zilla Slab", Georgia, serif';g.textAlign='center';g.textBaseline='middle';g.fillText(t,64,70);
  const tx=new THREE.CanvasTexture(c);tx.anisotropy=4;return new THREE.MeshLambertMaterial({map:tx});});}
function digitCube(t,bg,s,fg){const geo=G('d6cube'+s,()=>new THREE.BoxGeometry(s,s,s));const side=lam(bg),m=digitMat(t,bg,fg);return mk(geo,[side,side,m,side,m,side],20);}

/* =========================================================
   8. Adding and subtracting whole numbers and decimals
   ========================================================= */
P.lesson({id:'addsub6',title:'Adding and subtracting decimals',strand:'Number',codes:['B2.4'],
 guide:{goal:'Represent and solve problems involving the addition and subtraction of whole numbers and decimal numbers, using estimation and algorithms.',words:'algorithm, place value, regroup, decimal point, estimate, thousandths',
  ask:['Why is 3.5 + 1.25 not 1.60?','How can you add 4.2 and 3.157 when they have a different number of digits?','How does estimating catch mistakes?'],home:'Add the distances of two walks, like 2.75 km and 1.4 km. Estimate first, then add exactly.'},
 learn:[{say:'Line up the decimal points.',speech:'Chloe adds four point two and three point one five seven. Line up the decimal points and write zeros in the empty places: four point two zero zero. Then add from the right. Watch.',view:'model',demo:'add'},
        {say:'Read about estimating first.',speech:'Estimate before you calculate. Four point two plus three point one five seven is about four plus three, which is seven. The answer should be close to seven.',view:'read'},
        {say:'Watch: subtracting with zeros.',speech:'Five minus two point three seven four. Write five as five point zero zero zero. Then regroup across the zeros and subtract.',view:'model',demo:'sub'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: solve each column.',speech:'Your turn. Choose the answer digit for each column. Press Regroup when the top digit is too small.',view:'model'}],
 fig:'A column board: decimals lined up at the decimal point.',rz:.35,
 explore:['Choose the *answer digit* for the glowing column.','Press *Regroup* when you need to.','Press *Show me* to watch a problem solved.'],
 howTo:'Work right to left. Choose each answer digit; regroup when the top digit is too small.',
 init:k=>({a:4200,b:3157,op:'+',dec:3,col:-1}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'Line up the *decimal points*. Fill empty places with *zeros*, then add or subtract like whole numbers.')+16;
  const cw=60,x1=X0+90;const rowS=(t,yy,col)=>{[...t].forEach((d,i)=>T(g,d,x1+i*cw,yy,ZS(48),col||INK,'center'));};
  rowS(' 4.200',y+60);rowS('+3.157',y+120);g.fillStyle=INK;g.fillRect(x1-30,y+138,cw*6,5);rowS(' 7.357',y+194,'#16a36f');T(g,'zeros hold the places',x1+cw*2.5,y+20,FT.hand,BLUE,'center');
  wrap(g,'*Estimate:* 4 + 3 = 7, so 7.357 is reasonable.',X0+500,y+90,TW-500,32,{font:FT.small,bold:FT.smallB});y+=240;
  rowS(' 5.000',y+40);rowS('−2.374',y+100);g.fillStyle=INK;g.fillRect(x1-30,y+118,cw*6,5);rowS(' 2.626',y+174,'#16a36f');wrap(g,'Regroup across the zeros: 5 ones become 4 ones, 9 tenths, 9 hundredths and 10 thousandths.',X0+500,y+60,TW-500,30,{font:FT.small});y+=210;
  y=keyWords(p,y,[['algorithm','a step-by-step method'],['estimate','a close answer found with friendly numbers']]);
  predict(p,y,S,'p8','Estimate 12.89 + 7.3, then find it exactly.','*About 20; exactly 20.19.*');},
 readout(p,S,y){const g=p.g,st=S.st,f=v=>dec(v,st.dec);T(g,f(st.a)+' '+(st.op==='+'?'+':'−')+' '+f(st.b)+' = '+(st.col>=st.n?f(st.op==='+'?st.a+st.b:st.a-st.b):'?'),X0,y+50,ZS(44),acc());
  T(g,st.col>=0&&st.col<st.n?'Solve the '+st.labels[st.col]+' column.':'Solved!',X0,y+90,FT.bodyB);return y+100;},
 build(S,grp,mode,game){const st=S.st,cw=.58,s=.38,Z0=-2.75,rowZ=[0,.62,1.42],xR=1.9;
  const board=mk(new THREE.BoxGeometry(4.5,.03,2.55),lam('#f3f6fb'),20);board.position.set(-.1,.015,Z0+.85);grp.add(board);const bar=mk(new THREE.BoxGeometry(4.0,.04,.06),lam(INK),0);bar.position.set(-.05,.04,Z0+1.03);grp.add(bar);
  const opL=label('+',{size:.5});grp.add(opL);const cubes=new THREE.Group();grp.add(cubes);const glow=mk(new THREE.BoxGeometry(s+.12,.04,s+.12),lam('#ffd24a'),0);grp.add(glow);
  const dps=[0,1,2].map(()=>{const d=mk(new THREE.SphereGeometry(.06,12,10),lam(INK),0);grp.add(d);return d;});let A1,B1,R,carry,busy=false;const xOf=i=>xR-i*cw;
  function setup(a,b,op,d){st.a=a;st.b=b;st.op=op;st.dec=d;const res=op==='+'?a+b:a-b;st.n=Math.max(String(a).length,String(b).length,String(res).length,d+1);
    const NM=['thousandths','hundredths','tenths','ones','tens','hundreds','thousands','ten thousands'];st.labels=Array.from({length:st.n},(_,i)=>NM[i+3-d]);
    A1=String(a).split('').reverse().map(Number);B1=String(b).split('').reverse().map(Number);R=[];carry=0;st.carryTo=null;st.col=0;st.work=A1.slice();opL.userData.set(op==='+'?'+':'−');opL.position.set(xOf(st.n)-.1,.3,Z0+rowZ[1]);draw();}
  function draw(){clearGroup(cubes);const n=st.n,la=Math.max(String(st.a).length,st.dec+1),lb=Math.max(String(st.b).length,st.dec+1);
    for(let i=0;i<n;i++){if(i<la){const c=digitCube(String(st.work[i]||0),'#d7e6fb',s);c.position.set(xOf(i),s/2+.03,Z0+rowZ[0]);if((st.work[i]||0)>9)c.scale.set(1.15,1,1.15);cubes.add(c);}
      if(i<lb){const c=digitCube(String(B1[i]||0),'#fbdde6',s);c.position.set(xOf(i),s/2+.03,Z0+rowZ[1]);cubes.add(c);}
      if(R[i]!=null){const c=digitCube(String(R[i]),'#c9f0dd',s);c.position.set(xOf(i),s/2+.03,Z0+rowZ[2]);cubes.add(c);}}
    if(st.carryTo!=null&&st.op==='+'){const c=digitCube('1','#ffcf3f',s*.55);c.position.set(xOf(st.carryTo),s+.3,Z0+rowZ[0]-.05);cubes.add(c);}
    glow.visible=st.col>=0&&st.col<st.n;if(glow.visible)glow.position.set(xOf(st.col),.03,Z0+rowZ[2]);dps.forEach((d,k)=>{d.visible=!!st.dec;d.position.set(xOf(st.dec)+cw/2,.1,Z0+rowZ[k]+.18);});A.redraw();}
  function colAnswer(){const i=st.col;if(st.op==='+'){const v=(A1[i]||0)+(B1[i]||0)+carry;return {d:v%10,carry:v>=10?1:0};}const top=st.work[i]||0,bot=B1[i]||0;return top<bot?{borrow:true}:{d:top-bot};}
  function doBorrow(){const i=st.col;let j=i+1;while((st.work[j]||0)===0&&j<st.n)j++;for(let k=j;k>i;k--){st.work[k]=(st.work[k]||0)-1;st.work[k-1]=(st.work[k-1]||0)+10;}A.say('Regroup: 1 '+st.labels[i+1]+' becomes 10 '+st.labels[i]+'.');A.pop();draw();}
  const f=v=>dec(v,st.dec);
  function answer(d){if(busy||st.col<0||st.col>=st.n)return;const a=colAnswer();if(a.borrow){A.bad('The top digit is too small. Press Regroup first!');return;}if(d!==a.d){A.bad('Check the '+st.labels[st.col]+' column again.');return;}
    R[st.col]=d;if(st.op==='+'){carry=a.carry;st.carryTo=a.carry?st.col+1:null;}st.col++;A.pop();const res=st.op==='+'?st.a+st.b:st.a-st.b;const need=Math.max(String(res).length,st.dec+1);
    if(st.col>=st.n||(st.col>=need&&!carry)){st.col=st.n;st.carryTo=null;draw();A.good(f(st.a)+(st.op==='+'?' + ':' − ')+f(st.b)+' = '+f(res));if(mode==='play'&&!st.setup)game.solved('Correct: '+f(res)+'!');return;}draw();}
  function showMe(){if(busy)return;busy=true;const run=()=>{if(st.col>=st.n){busy=false;return;}const a=colAnswer();if(a.borrow){doBorrow();A.later(run,900);return;}busy=false;answer(a.d);busy=true;A.later(run,900);};A.later(run,400);}
  setup(st.a,st.b,st.op,st.dec);
  return {info:()=>st.col<st.n?'Answer digit for the '+st.labels[st.col]+' column':'Solved!',
    controls:()=>{const c=[];if(st.col<st.n){const a=colAnswer();if(a.borrow)c.push({t:'Regroup',go:true,big:true,fn:doBorrow});else for(let d=0;d<=9;d++)c.push({t:String(d),big:true,fn:()=>answer(d)});}
      if(mode==='learn')c.push({t:'Show me',fn:showMe},{t:'New +',fn:()=>setup(rnd(1100,8800),rnd(1100,8800),'+',3)},{t:'New −',fn:()=>{const a=rnd(5000,9800);setup(a,rnd(1100,a-400),'−',3);}});return c;},
    demo(n){busy=false;if(n==='add')setup(4200,3157,'+',3);if(n==='sub')setup(5000,2374,'−',3);A.seq([[700,showMe]]);},
    task(r){busy=false;st.setup=true;let txt;
      if(r===0){setup(rnd(120000,480000),rnd(110000,480000),'+',0);}else if(r===1){setup(rnd(1100,4800),rnd(1100,4800),'+',3);}else if(r===2){const a=rnd(5000,9800);setup(a,rnd(1100,a-400),'−',3);}
      else if(r===3){setup(rnd(5,9)*1000,rnd(1100,4900),'−',3);}else setup(rnd(1500,4999),rnd(1200,3999),'+',2);
      st.setup=false;return r===4?'Two runs of *'+f(st.a)+' km* and *'+f(st.b)+' km*. How far in all?':'Solve *'+f(st.a)+(st.op==='+'?' + ':' − ')+f(st.b)+'*.';}};}
});

/* =========================================================
   9. Adding and subtracting fractions with unlike denominators
   ========================================================= */
P.lesson({id:'fracadd6',title:'Adding fractions with unlike denominators',strand:'Number',codes:['B2.5'],
 guide:{goal:'Add and subtract fractions with like and unlike denominators by finding a common denominator, using fraction strips.',words:'common denominator, equivalent fraction, like denominators, unlike denominators, sum, difference',
  ask:['Why can you not add 1/2 and 1/3 by adding the tops and bottoms?','What common denominator works for 3/4 and 1/6?','How do equivalent fractions help you subtract?'],home:'Measure 1/2 cup of flour and 1/3 cup of sugar. How much is that together? Use sixths to check.'},
 learn:[{say:'Pieces must be the same size.',speech:'Malik eats one half and Yuna eats one third. The pieces are different sizes, so we cannot just count them. Cut both bars into sixths: three sixths plus two sixths is five sixths. Watch.',view:'model',demo:'add'},
        {say:'Read about common denominators.',speech:'A common denominator is a multiple of both denominators. Rewrite each fraction as an equivalent fraction with that denominator. Then add or subtract the numerators.',view:'read'},
        {say:'Watch: subtracting.',speech:'Three quarters minus one sixth. Twelfths work for both: nine twelfths minus two twelfths is seven twelfths.',view:'model',demo:'sub'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: find a common cut.',speech:'Your turn. Choose a denominator that cuts both bars into equal pieces, combine them, then choose the answer.',view:'model'}],
 fig:'Two fraction bars and an answer track. Cut both bars into the same size pieces.',rz:-.05,
 explore:['Pick a *common denominator* that works for both bars.','Press *Combine* to put the pieces together.','Then choose the *answer*.'],
 howTo:'Choose a denominator that fits both fractions, combine, then choose the answer.',
 init:k=>({a:1,b:2,c:1,d:3,op:'+',D:null,done:false}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'To add or subtract fractions with *unlike denominators*, first rewrite them with a *common denominator*.')+16;
  const bw=TW-200,bar=(n,d,yy,col,lab)=>{for(let i=0;i<d;i++){rr(g,X0+i*bw/d+1,yy,bw/d-2,40,6);g.fillStyle=i<n?col:'#e9eef7';g.fill();}T(g,lab,X0+bw+24,yy+30,FT.bodyB,col);};
  bar(1,2,y,'#2f7de1','1/2');bar(1,3,y+50,'#e4572e','1/3');T(g,'↓ cut both into sixths',X0,y+124,FT.hand,BLUE);bar(3,6,y+140,'#2f7de1','3/6');bar(2,6,y+190,'#e4572e','2/6');
  for(let i=0;i<6;i++){rr(g,X0+i*bw/6+1,y+250,bw/6-2,40,6);g.fillStyle=i<3?'#2f7de1':i<5?'#e4572e':'#e9eef7';g.fill();}T(g,'5/6',X0+bw+24,y+280,FT.bodyB,'#16a36f');y+=320;
  T(g,'1/2 + 1/3 = 3/6 + 2/6 = 5/6',X0,y+10,ZS(40),acc());y+=40;
  y=para(p,y,'Use a *multiple of both* denominators. For 4 and 6, try *12*: 3/4 − 1/6 = 9/12 − 2/12 = *7/12*.')+10;
  y=keyWords(p,y,[['common denominator','a denominator both fractions can be rewritten with'],['unlike denominators','different denominators, like 4 and 6']]);
  predict(p,y,S,'p9','What is 2/5 + 1/2?','*9/10.* 4/10 + 5/10 = 9/10.');},
 readout(p,S,y){const g=p.g,st=S.st,D2=st.D,ok=D2&&D2%st.b===0&&D2%st.d===0;
  T(g,st.a+'/'+st.b+' '+(st.op==='+'?'+':'−')+' '+st.c+'/'+st.d+(ok?' = '+st.a*D2/st.b+'/'+D2+' '+(st.op==='+'?'+':'−')+' '+st.c*D2/st.d+'/'+D2:'')+(st.shown?' = '+res(st)+'/'+D2:''),X0,y+50,ZS(40),acc());
  T(g,!D2?'Choose a common denominator.':ok?(st.done?'Choose the answer.':'Press Combine.'):D2+' does not work for both. Try a multiple of '+st.b+' and '+st.d+'.',X0,y+92,FT.bodyB);return y+100;},
 build(S,grp,mode,game){const st=S.st,L=1.95,x0=-1.95,Z1=-2.75,Z2=-2.05,Zr=-1.0;const g1=new THREE.Group(),g2=new THREE.Group(),gr=new THREE.Group();grp.add(g1,g2,gr);
  const rt=mk(new THREE.BoxGeometry(2*L+.1,.04,.75),lam('#eef2f8'),20);rt.position.set(0,.02,Zr);grp.add(rt);[0,1,2].forEach(k=>{const t=mk(new THREE.BoxGeometry(.03,.4,.85),lam(INK),0);t.position.set(x0+k*L,.2,Zr);grp.add(t);const l=label(String(k),{size:.24});l.position.set(x0+k*L,.6,Zr+.1);grp.add(l);});
  const l1=label('',{size:.26,bg:'#ffffff',border:'#2f7de1'}),l2=label('',{size:.26,bg:'#ffffff',border:'#e4572e'}),l3=label('answer',{size:.2,color:'#16a36f'});l1.position.set(-2.2,.6,Z1);l2.position.set(-2.2,.6,Z2);l3.position.set(-2.2,.55,Zr-.1);grp.add(l1,l2,l3);
  function bar(g,n,d,z,col){clearGroup(g);const w=L/d;for(let i=0;i<d;i++){const m=mk(G('fa6'+d,()=>new THREE.BoxGeometry(w-.025,.24,.5)),lam(i<n?col:'#f1f4f9'),20);m.position.set(x0+(i+.5)*w,.12+(i<n?.04:0),z);g.add(m);}}
  function draw(){const D2=st.D,ok=D2&&D2%st.b===0&&D2%st.d===0;
    bar(g1,ok?st.a*D2/st.b:st.a,ok?D2:st.b,Z1,'#2f7de1');bar(g2,ok?st.c*D2/st.d:st.c,ok?D2:st.d,Z2,'#e4572e');l1.userData.set(ok?st.a*D2/st.b+'/'+D2:st.a+'/'+st.b);l2.userData.set(ok?st.c*D2/st.d+'/'+D2:st.c+'/'+st.d);
    clearGroup(gr);if(st.done&&ok){const w=L/D2,n1=st.a*D2/st.b,n2=st.c*D2/st.d;if(st.op==='+'){for(let i=0;i<n1+n2;i++){const m=mk(G('fa6'+D2,()=>new THREE.BoxGeometry(w-.025,.24,.5)),lam(i<n1?'#2f7de1':'#e4572e'),20);m.position.set(x0+(i+.5)*w,.16,Zr);gr.add(m);}}
      else{for(let i=0;i<n1;i++){const gone=i>=n1-n2;const m=mk(G('fa6'+D2,()=>new THREE.BoxGeometry(w-.025,.24,.5)),lam(gone?'#fde2e2':'#2f7de1'),20);m.position.set(x0+(i+.5)*w,gone?.05:.16,Zr);if(gone)m.scale.y=.3;gr.add(m);}}}
    A.redraw();}
  function setD(D2){st.D=D2;st.done=false;st.shown=false;const ok=D2%st.b===0&&D2%st.d===0;A.pop();if(ok)A.say('Both fractions fit into '+D2+'ths!');else A.bad(D2+' is not a multiple of both '+st.b+' and '+st.d+'.');draw();}
  function combine(){const D2=st.D;if(!(D2&&D2%st.b===0&&D2%st.d===0)){A.bad('First choose a common denominator.');return;}st.done=true;A.pop();A.say(st.op==='+'?'Put the pieces together.':'Take the orange amount away.');draw();
    const ps=gr.children.slice();ps.forEach((m,i)=>{const p0=m.position.clone();m.position.y+=.6;moveTo(m,{pos:p0,k:6+i*.2});});}
  function setUp(a,b,c,d,op){st.a=a;st.b=b;st.c=c;st.d=d;st.op=op;st.D=null;st.done=false;st.shown=false;draw();}
  draw();
  return {info:()=>st.a+'/'+st.b+' '+st.op+' '+st.c+'/'+st.d,
    controls:()=>{const D2=st.D,ok=D2&&D2%st.b===0&&D2%st.d===0;const c=[];
      if(!st.done){[2,3,4,5,6,8,10,12,15,20,24].filter(x=>x<=24).forEach(x=>c.push({t:'/'+x,on:st.D===x,fn:()=>setD(x)}));c.push({t:'Combine',go:true,big:true,fn:combine,dis:!ok});}
      else{const r=res(st),ans=r+'/'+D2;const o=shuffle([ans,(st.op==='+'?st.a+st.c:Math.abs(st.a-st.c))+'/'+(st.op==='+'?st.b+st.d:Math.abs(st.b-st.d)||st.b),(r+1)+'/'+D2]).filter((x,i,a)=>a.indexOf(x)===i);
        o.forEach(x=>c.push({t:x,big:true,fn:()=>{if(x===ans){st.shown=true;A.redraw();const g2=gcd(r,D2);const m=st.a+'/'+st.b+(st.op==='+'?' + ':' − ')+st.c+'/'+st.d+' = '+ans+(g2>1&&r?' = '+r/g2+'/'+D2/g2:'');if(mode==='play'&&!st.setup)game.solved(m);else A.good(m);}else A.bad('Count the pieces of size 1/'+D2+'.');}}));}
      if(mode==='learn')c.push({t:'New problem',fn:fresh});return c;},
    demo(n){if(n==='add'){setUp(1,2,1,3,'+');A.seq([[900,()=>setD(6)],[1300,combine],[1200,()=>{st.shown=true;A.redraw();A.say('3/6 + 2/6 = 5/6');}]]);}
      if(n==='sub'){setUp(3,4,1,6,'−');A.seq([[900,()=>setD(12)],[1300,combine],[1200,()=>{st.shown=true;A.redraw();A.say('9/12 − 2/12 = 7/12');}]]);}},
    task(r){st.setup=true;const T5=[[1,2,1,4,'+'],[1,3,1,6,'+'],[2,3,1,4,'+'],[5,6,1,4,'−'],[3,4,2,3,'+']][r];const v=pick([T5,[[1,2,2,5,'+'],[1,4,1,3,'+'],[2,5,3,10,'+'],[7,8,1,4,'−'],[5,6,3,4,'+']][r]]);
      setUp(...v);st.setup=false;return (r===3?'Subtract':'Add')+' *'+st.a+'/'+st.b+' '+(st.op==='+'?'+':'−')+' '+st.c+'/'+st.d+'*. Find a common denominator first.';}};
  function fresh(){const ds=[2,3,4,5,6,8];let b=pick(ds),d=pick(ds);if(b===d)d=b===2?3:2;const a=rnd(1,b-1),c=rnd(1,d-1);setUp(a,b,c,d,a/b>c/d&&Math.random()<.4?'−':'+');}}
});
function res(st){const D2=st.D;return st.op==='+'?st.a*D2/st.b+st.c*D2/st.d:st.a*D2/st.b-st.c*D2/st.d;}

/* =========================================================
   10. Multiplying by decimal tenths
   ========================================================= */
P.lesson({id:'multdec6',title:'Multiplying by decimal tenths',strand:'Number',codes:['B2.7'],
 guide:{goal:'Represent and solve problems that multiply three-digit whole numbers by decimal tenths, using an area model and the algorithm, and check by estimating.',words:'decimal tenths, partial product, area model, estimate, algorithm',
  ask:['Why is 245 × 0.3 less than 245?','How does 245 × 3 help you find 245 × 0.3?','Estimate 198 × 2.4 before you multiply.'],home:'Gas costs about $1.6 per litre. What would 125 L cost? Split it into easier parts.'},
 learn:[{say:'Split both factors.',speech:'Yuna multiplies one hundred twenty-eight times two point four. Split one hundred twenty-eight into one hundred, twenty and eight, and two point four into two and zero point four. Watch each part of the area model.',view:'model',demo:'parts'},
        {say:'Read the connection.',speech:'Multiply each part, then add the partial products. Or multiply one hundred twenty-eight times twenty-four, which is three thousand seventy-two, then divide by ten: three hundred seven point two.',view:'read'},
        {say:'Watch: times a tenth.',speech:'Two hundred forty-five times zero point three is three tenths of two hundred forty-five. Two hundred forty-five times three is seven hundred thirty-five, so the answer is seventy-three point five.',view:'model',demo:'tenth'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: reveal and add.',speech:'Your turn. Tap each block to see its partial product, then choose the total.',view:'model'}],
 fig:'An area model for a three-digit number times a decimal.',rz:.35,
 explore:['*Tap a block* to reveal its partial product.','The decimal row is thin: it is only *tenths*.','Choose the *total* when every block is open.'],
 howTo:'Tap every block to find the partial products, then choose the total.',
 init:k=>({n:128,m:24,shown:[]}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'Split the factors into *parts*. Multiply each pair of parts, then add the *partial products*.')+18;
  const ox=X0+60,ws=[300,90,50],hs=[150,40],C=['#2f7de1','#e4572e','#e89a00','#8b5cf6','#16a36f','#0fa5a5'],cols=[100,20,8],rows=[2,.4];let k=0,yy=y;
  rows.forEach((rv,ri)=>{let x=ox;cols.forEach((cv,ci)=>{rr(g,x+2,yy+2,ws[ci]-4,hs[ri]-4,6);g.fillStyle=tint(C[k],.3);g.fill();g.lineWidth=2;g.strokeStyle=C[k];g.stroke();const v=Math.round(rv*cv*10)/10;if(ri===0||ci===0)T(g,String(v),x+ws[ci]/2,yy+hs[ri]/2+10,ri?FT.cap:FT.bodyB,INK,'center');x+=ws[ci];k++;});yy+=hs[ri];});
  ['100','20','8'].forEach((t,i)=>T(g,t,ox+[150,345,415][i],y-8,FT.smallB,INK,'center'));T(g,'2',ox-24,y+80,FT.smallB);T(g,'0.4',ox-46,y+176,FT.smallB);
  T(g,'200 + 40 + 16',X0+520,y+50,FT.bodyB);T(g,'+ 40 + 8 + 3.2',X0+520,y+96,FT.bodyB);T(g,'= 307.2',X0+520,y+150,ZS(44),acc());y+=hs[0]+hs[1]+40;
  y=para(p,y,'*Algorithm:* 128 × 24 = 3072, and 2.4 has one decimal place, so 128 × 2.4 = *307.2*. *Estimate:* 130 × 2 = 260 and 130 × 2.5 = 325, so about 300 makes sense.')+10;
  y=keyWords(p,y,[['partial product','the product of one part of each factor'],['decimal tenths','numbers with one decimal place, like 2.4']]);
  predict(p,y,S,'p10','What is 300 × 0.7?','*210.* 300 × 7 = 2100, and one tenth of that is 210.');},
 readout(p,S,y){const g=p.g,st=S.st,pp=prods(st);T(g,st.n+' × '+dec(st.m,1)+' = '+pp.map((v,i)=>st.shown[i]?dec(v,1):'?').join(' + '),X0,y+46,FT.bodyB,acc());
  if(st.shown.every(x=>x))T(g,'= '+dec(st.n*st.m,1),X0,y+92,ZS(44),acc());return y+100;},
 build(S,grp,mode,game){const st=S.st,C=['#2f7de1','#e4572e','#e89a00','#8b5cf6','#16a36f','#0fa5a5'];const g2=new THREE.Group();grp.add(g2);
  function draw(){clearGroup(g2);const cp=partsN(st.n),rp=partsM(st.m);const WX=3.8,wsum=cp.reduce((a,v)=>a+Math.max(.45,Math.log10(v+1)),0);const ws=cp.map(v=>Math.max(.45,Math.log10(v+1))/wsum*WX);
    const hs=rp.map(v=>v>=10?1.7:.55);let k=0,z=-3.0;
    rp.forEach((rv,ri)=>{let x=-1.85;cp.forEach((cv,ci)=>{const i=k++;const on=st.shown[i];const v=cv*rv;const h=on?.08+Math.min(1.1,v/4000):.08;const b=mk(new THREE.BoxGeometry(ws[ci]-.05,h,hs[ri]-.05),lam(on?C[i%6]:tint(C[i%6],.3)),20);b.position.set(x+ws[ci]/2,h/2,z+hs[ri]/2);g2.add(b);A.drag(b,{tap:()=>reveal(i)});
        const l=label(on?cv+' × '+dec(rv,1)+' = '+dec(v,1):'?',{size:on?.15:.24,bg:'#ffffff',border:C[i%6]});l.position.set(x+ws[ci]/2,h+.25,z+hs[ri]/2);g2.add(l);x+=ws[ci];});
      const rl=label(dec(rv,1),{size:.24});rl.position.set(-2.15,.2,z+hs[ri]/2);g2.add(rl);z+=hs[ri];});
    let x=-1.85;cp.forEach((cv,ci)=>{const l=label(String(cv),{size:.24});l.position.set(x+ws[ci]/2,.2,-3.22);g2.add(l);x+=ws[ci];});A.redraw();}
  function reveal(i){if(st.shown[i])return;st.shown[i]=true;A.pop();A.say(dec(prods(st)[i],1));draw();}
  function setUp(n,m){st.n=n;st.m=m;st.shown=prods({n,m}).map(()=>false);draw();}
  setUp(st.n,st.m);
  return {info:()=>st.n+' × '+dec(st.m,1),
    controls:()=>{const ans=st.n*st.m;if(st.shown.every(x=>x)){return opts(ans,[10,-10,ans*9,-ans*.9,100]).filter(v=>v>0).slice(0,3).map(v=>({t:dec(v,1),big:true,fn:()=>{if(v===ans){const m=st.n+' × '+dec(st.m,1)+' = '+dec(ans,1)+'!';if(mode==='play'&&!st.setup)game.solved(m);else A.good(m);}else A.bad('Add the partial products again. Watch the decimal point!');}}))
        .concat(mode==='learn'?[{t:'New problem',fn:()=>setUp(rnd(112,489),rnd(3,39))}]:[]);}
      return [{t:'Reveal all',fn:()=>st.shown.forEach((_,i)=>reveal(i))}].concat(mode==='learn'?[{t:'New problem',go:true,fn:()=>setUp(rnd(112,489),rnd(3,39))}]:[]);},
    demo(n){if(n==='parts'){setUp(128,24);const l=st.shown.map((_,i)=>[700,()=>reveal(i)]);l.push([900,()=>A.say('Total: 307.2')]);A.seq(l);}if(n==='tenth'){setUp(245,3);const l=st.shown.map((_,i)=>[700,()=>reveal(i)]);l.push([900,()=>A.say('60 + 12 + 1.5 = 73.5')]);A.seq(l);}},
    task(r){st.setup=true;const n=r<2?rnd(112,489):rnd(105,250);const m=r===0?rnd(2,9):r===1?rnd(11,19):rnd(21,39);setUp(n,m);st.setup=false;
      return r===4?'A litre of paint covers *'+dec(m,1)+' m²*. How much do *'+n+' L* cover?':'Find *'+n+' × '+dec(m,1)+'*. Tap each block, then choose.';}};}
});
function partsN(n){const s=String(n);return s.split('').map((d,i)=>+d*Math.pow(10,s.length-1-i)).filter(v=>v>0);}
function partsM(m){const w=Math.floor(m/10),t=m%10;return [w*10,t].filter(v=>v>0);}
function prods(st){const out=[];partsM(st.m).forEach(rv=>partsN(st.n).forEach(cv=>out.push(cv*rv)));return out;}

/* =========================================================
   11. Dividing by decimal tenths
   ========================================================= */
P.lesson({id:'divdec6',title:'Dividing by decimal tenths',strand:'Number',codes:['B2.8'],
 guide:{goal:'Represent and solve problems that divide three-digit whole numbers by decimal tenths, using equivalent divisions, tools and algorithms, and express remainders appropriately.',words:'divisor, dividend, quotient, equivalent division, decimal tenths, remainder',
  ask:['Why is 48 ÷ 0.4 bigger than 48?','Why does multiplying both numbers by 10 keep the answer the same?','How many 0.5 L bottles can you fill from 125 L?'],home:'How many 0.5 L glasses fill from a 2 L jug? From a 12 L cooler? Talk about why the answers are bigger than the litres.'},
 learn:[{say:'How many tenths fit?',speech:'Ezra’s forty-eight divided by zero point four asks: how many zero point fours fit in forty-eight? Multiply both numbers by ten. Watch the digits slide: four hundred eighty divided by four. The answer is one hundred twenty.',view:'model',demo:'shift'},
        {say:'Read about equivalent divisions.',speech:'If you multiply the dividend and the divisor by the same number, the quotient stays the same. Forty-eight divided by zero point four equals four hundred eighty divided by four.',view:'read'},
        {say:'Watch: a remainder.',speech:'One hundred twenty-five litres into one point five litre bottles. Times ten: one thousand two hundred fifty divided by fifteen is eighty-three with five left over. Eighty-three full bottles, with zero point five litres left.',view:'model',demo:'rem'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: slide, then divide.',speech:'Your turn. Press times ten to make the divisor a whole number, then choose the quotient.',view:'model'}],
 fig:'Digit cubes for the dividend and the divisor. Both slide together.',rz:.25,
 explore:['Press *× 10 both* to slide both rows one place left.','When the divisor is a *whole number*, divide.','Then choose the *quotient*.'],
 howTo:'Multiply both numbers by 10 until the divisor is whole, then choose the answer.',
 init:k=>({a:480,b:4,k:0}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'Dividing by a *decimal less than 1* gives a quotient *greater* than the dividend: more small pieces fit.')+16;
  rr(g,X0,y,TW,120,16);g.fillStyle=tint(acc(),.1);g.fill();T(g,'48 ÷ 0.4',X0+30,y+76,ZS(48),INK);T(g,'× 10 →',X0+260,y+70,FT.hand,BLUE);T(g,'480 ÷ 4 = 120',X0+420,y+76,ZS(48),acc());y+=146;
  const L=TW-40;g.strokeStyle=INK;g.lineWidth=3;g.beginPath();g.moveTo(X0+20,y+40);g.lineTo(X0+20+L,y+40);g.stroke();for(let i=0;i<=10;i++){const x=X0+20+i*L/10;g.beginPath();g.moveTo(x,y+30);g.lineTo(x,y+50);g.stroke();if(i<10){g.beginPath();g.arc(x+L/20,y+30,L/20,Math.PI,0);g.strokeStyle='#e4572e';g.stroke();g.strokeStyle=INK;}}
  T(g,'0',X0+20,y+78,FT.small,INK,'center');T(g,'4',X0+20+L,y+78,FT.small,INK,'center');T(g,'4 ÷ 0.4 = 10 jumps',X0+L/2,y-6,FT.smallB,'#e4572e','center');y+=110;
  y=para(p,y,'*Remainders:* 125 ÷ 1.5 = 1250 ÷ 15 = 83 R5. In litres, the 5 is *0.5 L* (we multiplied by 10). Decide what the remainder means for the problem.')+10;
  y=keyWords(p,y,[['equivalent division','a division with the same quotient, like 48 ÷ 0.4 and 480 ÷ 4'],['quotient','the answer to a division']]);
  predict(p,y,S,'p11','How many 0.2 m pieces can be cut from 6 m of ribbon?','*30 pieces.* 6 ÷ 0.2 = 60 ÷ 2 = 30.');},
 readout(p,S,y){const g=p.g,st=S.st,sh=st.k;T(g,dec(st.a0,1)+' ÷ '+dec(st.b0,1)+(sh?'  =  '+fmt(st.a0)+' ÷ '+st.b0:''),X0,y+50,ZS(44),acc());T(g,sh?'The divisor is whole. Divide!':'Make the divisor a whole number.',X0,y+92,FT.bodyB);return y+100;},
 build(S,grp,mode,game){const st=S.st,cw=.6,s=.44,xR=1.6;const rows=new THREE.Group();grp.add(rows);let anim=false;
  ['dividend','divisor'].forEach((t,i)=>{const m=mk(new THREE.BoxGeometry(4.3,.03,.8),lam(i?'#fbdde6':'#d7e6fb'),20);m.position.set(-.05,.015,-2.4+i*1.2);grp.add(m);const l=label(t,{size:.18,color:GREY});l.position.set(-1.8,.3,-2.95+i*1.2);grp.add(l);});
  const sign=label('÷',{size:.5});sign.position.set(-2.0,.35,-1.8);grp.add(sign);const qL=label('',{size:.34,bg:'#ffffff'});qL.position.set(.2,1.3,-.6);grp.add(qL);
  function digits(v,k){const s0=dec(v,1-k>0?1-k:0);return s0;}
  function draw(){clearGroup(rows);[[st.a0,-2.4,'#2f7de1'],[st.b0,-1.2,'#e4572e']].forEach(([v,z,col])=>{const str=st.k?String(v):dec(v,1);const ch=str.split('');let x=xR;const pts=st.k?-1:str.indexOf('.');
      for(let i=ch.length-1;i>=0;i--){if(ch[i]==='.'){const d=mk(new THREE.SphereGeometry(.07,12,10),lam(INK),0);d.position.set(x+cw/2,.1,z+.25);rows.add(d);continue;}const c=digitCube(ch[i],tint(col,.35),s);c.position.set(x,s/2+.03,z);rows.add(c);x-=cw;}});
    qL.userData.set(st.k?fmt(st.a0)+' ÷ '+st.b0+' = ?':'');qL.visible=!!st.k;A.redraw();}
  function shift(){if(anim||st.k)return;anim=true;A.pop();rows.children.forEach(c=>{if(c.geometry&&c.geometry.type==='SphereGeometry')return;moveTo(c,{pos:V(c.position.x-0,c.position.y+.3,c.position.z),k:6});});
    A.later(()=>{st.k=1;anim=false;draw();A.say('× 10: '+fmt(st.a0)+' ÷ '+st.b0);},700);}
  function setUp(a10,b10){st.a0=a10;st.b0=b10;st.k=0;draw();}
  setUp(st.a0||480,st.b0||4);
  return {info:()=>st.k?'Now divide':'Press × 10 both',
    controls:()=>{if(!st.k)return [{t:'× 10 both',go:true,big:true,fn:shift}].concat(mode==='learn'?[{t:'New problem',fn:fresh}]:[]);
      const q=Math.floor(st.a0/st.b0),r=st.a0%st.b0;const ans=r?q+' R'+r:String(q);const o=shuffle([ans,r?(q+1)+' R'+r:String(q*10),r?q+' R'+dec(r,1):String(Math.round(q/10))]).filter((x,i,a)=>a.indexOf(x)===i);
      return o.map(x=>({t:x,big:true,fn:()=>{if(x===ans){const m=dec(st.a0,1)+' ÷ '+dec(st.b0,1)+' = '+(r?q+' R'+r+' (the remainder is '+dec(r,1)+' in the original units)':q);if(mode==='play'&&!st.setup)game.solved(m);else A.good(m);}else A.bad('Divide '+fmt(st.a0)+' by '+st.b0+'.');}})).concat(mode==='learn'?[{t:'New problem',fn:fresh}]:[]);},
    demo(n){if(n==='shift'){setUp(480,4);A.seq([[1000,shift],[1500,()=>A.say('480 ÷ 4 = 120')]]);}if(n==='rem'){setUp(1250,15);A.seq([[1000,shift],[1500,()=>A.say('1250 ÷ 15 = 83 R5 → 83 bottles, 0.5 L left')]]);}},
    task(r){st.setup=true;let a,b,txt;
      if(r===0){b=pick([2,4,5]);a=b*rnd(12,48);setUp(a*10/10*1,b);txt='Divide *'+dec(a,1)+' ÷ '+dec(b,1)+'*.';}
      else if(r===1){b=pick([3,6,8]);const q=rnd(11,60);a=b*q;setUp(a,b);txt='How many *'+dec(b,1)+' m* pieces can you cut from *'+dec(a,1)+' m*?';}
      else if(r===2){b=pick([12,15,25]);const q=rnd(10,40);a=b*q;setUp(a,b);txt='Divide *'+dec(a,1)+' ÷ '+dec(b,1)+'*.';}
      else if(r===3){b=pick([15,25]);const q=rnd(20,60);a=b*q+rnd(1,b-1);setUp(a,b);txt='*'+dec(a,1)+' L* of juice fills *'+dec(b,1)+' L* bottles. How many full bottles, and what is left?';}
      else{b=5;a=10*rnd(15,99);setUp(a,b);txt='How many *0.5 kg* bags can be filled from *'+dec(a,1)+' kg*?';}
      st.setup=false;return txt;}};
  function fresh(){const b=pick([2,3,4,5,6,8,12,15]);setUp(b*rnd(10,60),b);}}
});

/* =========================================================
   12. Dividing decimals by whole numbers
   ========================================================= */
P.lesson({id:'sharedec6',title:'Dividing decimals by whole numbers',strand:'Number',codes:['B2.11'],
 guide:{goal:'Represent and solve problems that divide decimal numbers up to thousandths by whole numbers up to 10, by sharing base-ten pieces and with the algorithm.',words:'share, divide, ones, tenths, hundredths, thousandths, regroup',
  ask:['What do you do when you cannot share the ones equally?','Why does 2.48 ÷ 4 have a 0 in the ones place?','How can multiplication check 7.245 ÷ 5?'],home:'Split a $9.45 lunch bill among 3 people. Share the dollars, then the dimes, then the pennies.'},
 learn:[{say:'Share the biggest pieces first.',speech:'Lucia shares two point four eight by four. There are only two ones, not enough for four plates. Break them into twenty tenths. Now share: each plate gets six tenths and two hundredths. Watch.',view:'model',demo:'deal'},
        {say:'Read about sharing decimals.',speech:'Share ones first, then tenths, hundredths and thousandths. When you cannot share a piece, break it into ten smaller pieces. Keep the decimal point lined up in the answer.',view:'read'},
        {say:'Watch: thousandths.',speech:'Now three point six three six divided by three. Each plate gets one, two tenths, one hundredth and two thousandths: one point two one two.',view:'model',demo:'deal2'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: deal the pieces.',speech:'Your turn. Press Deal to share, and Break when a piece cannot be shared. Then choose the answer.',view:'model'}],
 fig:'Base-ten pieces shared onto plates.',rz:.55,
 explore:['*Deal* gives one of the biggest piece to every plate.','*Break* turns a piece into 10 smaller ones.','Then choose the *quotient*.'],
 howTo:'Deal and break until everything is shared, then choose what one plate has.',
 init:k=>({n:2480,d:4}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'To divide a decimal by a whole number, *share* the pieces, starting with the *largest place*. Break pieces you cannot share.')+18;
  [0,1,2,3].forEach(i=>{const cx=X0+100+i*200,cy=y+80;g.beginPath();g.ellipse(cx,cy,80,50,0,0,Math.PI*2);g.fillStyle='#fff4dc';g.fill();g.lineWidth=3;g.strokeStyle='#e8c98a';g.stroke();
    for(let k=0;k<6;k++){g.fillStyle='#16a36f';g.fillRect(cx-50+k*12,cy-24,9,40);}for(let k=0;k<2;k++){g.fillStyle='#e89a00';g.fillRect(cx+28+k*14,cy-4,11,11);}});
  T(g,'2.48 ÷ 4 = 0.62',X0,y+180,ZS(46),acc());T(g,'each plate: 6 tenths, 2 hundredths',X0+380,y+174,FT.body,GREY);y+=216;
  y=para(p,y,'*Algorithm:* divide as with whole numbers and put the decimal point directly above it. *Check:* 4 × 0.62 = 2.48.')+10;
  y=keyWords(p,y,[['share','give equal amounts to each group'],['regroup','break 1 of a place into 10 of the next smaller place']]);
  predict(p,y,S,'p12','What is 7.5 ÷ 5?','*1.5.* 5 ones give 1 each; 2 ones + 5 tenths = 25 tenths, so 5 tenths each.');},
 readout(p,S,y){const g=p.g,st=S.st;const q=st.n/st.d;T(g,(st.n/1000).toFixed(3).replace(/0+$/,'').replace(/\.$/,'')+' ÷ '+st.d+(st.done?' = '+(q/1000).toFixed(3).replace(/0+$/,'').replace(/\.$/,''):' = ?'),X0,y+52,ZS(46),acc());
  T(g,'To share: '+st.pool.o+' ones, '+st.pool.t+' tenths, '+st.pool.h+' hundredths, '+st.pool.k+' thousandths',X0,y+92,FT.small);return y+100;},
 build(S,grp,mode,game){const st=S.st,u=.075,Zp=-2.55,Zpl=-1.05;const pool=new THREE.Group(),items=new THREE.Group();grp.add(pool,items);const KS=['o','t','h','k'],NM={o:'one',t:'tenth',h:'hundredth',k:'thousandth'};
  const mkB=k=>k==='o'?unitBox(10,1,10,'#2f7de1',u*.55):k==='t'?unitBox(1,1,10,'#16a36f',u*.55):k==='h'?unitBox(1,1,1,'#e89a00',u*1.2):unitBox(1,1,1,'#e4572e',u*.7);
  function setUp(n,d){st.n=n;st.d=d;st.pool={o:Math.floor(n/1000),t:Math.floor(n/100)%10,h:Math.floor(n/10)%10,k:n%10};st.share=Array.from({length:d},()=>({o:0,t:0,h:0,k:0}));st.done=false;draw();}
  function draw(){clearGroup(pool);clearGroup(items);const pm=mk(new THREE.BoxGeometry(4.3,.03,.9),lam('#eef2f8'),20);pm.position.set(0,.015,Zp);pool.add(pm);
    let x=-2.0;KS.forEach(k=>{for(let i=0;i<st.pool[k];i++){const b=mkB(k);const n=st.pool[k];const per=k==='o'?1:k==='t'?2:3;b.position.set(x,.05+(k==='o'?0:Math.floor(i/(per*6))*.06),Zp+((i%per)-(per-1)/2)*.12);pool.add(b);if(k!=='k')A.drag(b,{tap:()=>breakOne(k)});x+=k==='o'?.82:((i%per)===per-1?.1:0);if(x>2.05)x=2.05;}x+=.15;});
    const pw=4.3/st.d;for(let i=0;i<st.d;i++){const cx=-2.15+(i+.5)*pw;const p2=mk(new THREE.CylinderGeometry(Math.min(.4,pw/2-.03),Math.min(.4,pw/2-.03),.04,26),lam('#fff4dc'),30);p2.position.set(cx,.02,Zpl);items.add(p2);
      const s=st.share[i];let yy=.05;for(let j=0;j<s.o;j++){const b=mkB('o');b.scale.setScalar(.5);b.position.set(cx,yy,Zpl);yy+=.05;items.add(b);}
      for(let j=0;j<s.t;j++){const b=mkB('t');b.position.set(cx-.16+(j%5)*.07,.06+Math.floor(j/5)*.05,Zpl-.05);items.add(b);}for(let j=0;j<s.h;j++){const b=mkB('h');b.position.set(cx+.12+(j%3)*.09,.06+Math.floor(j/9)*.09,Zpl+.12-(Math.floor(j/3)%3)*.1);items.add(b);}
      for(let j=0;j<s.k;j++){const b=mkB('k');b.position.set(cx-.15+(j%5)*.06,.04,Zpl+.25+Math.floor(j/5)*.06);items.add(b);}}A.redraw();}
  function deal(){if(st.done)return;const k=KS.find(q=>st.pool[q]>0);if(!k){finish();return;}if(st.pool[k]<st.d){if(k==='k'){finish();return;}A.bad('Only '+st.pool[k]+' '+NM[k]+(st.pool[k]>1?'s':'')+': not enough for every plate. Press Break.');return;}
    st.pool[k]-=st.d;st.share.forEach(s=>s[k]++);A.pop();A.say('Each plate gets 1 '+NM[k]+'.');draw();if(KS.every(q=>st.pool[q]===0))finish();}
  function breakOne(k){if(st.done)return;k=k||KS.find(q=>st.pool[q]>0&&st.pool[q]<st.d&&q!=='k')||KS.find(q=>st.pool[q]>0&&q!=='k');if(!k||k==='k'){A.bad('Nothing to break.');return;}if(st.pool[k]>=st.d){A.bad('You can still share these. Press Deal.');return;}
    const nx=KS[KS.indexOf(k)+1];st.pool[k]--;st.pool[nx]+=10;A.pop();A.say('1 '+NM[k]+' → 10 '+NM[nx]+'s');draw();}
  function finish(){if(st.done)return;st.done=true;A.good('Shared! Each plate: '+(st.n/st.d/1000).toFixed(3).replace(/0+$/,'').replace(/\.$/,''));draw();}
  function auto(){const run=()=>{if(st.done)return;const k=KS.find(q=>st.pool[q]>0);if(!k){finish();return;}if(st.pool[k]<st.d)breakOne(k);else deal();A.later(run,700);};A.later(run,300);}
  setUp(st.n,st.d);
  return {info:()=>(st.n/1000)+' ÷ '+st.d,
    controls:()=>{const base=[{t:'Deal',go:true,big:true,fn:deal,dis:st.done},{t:'Break',fn:()=>breakOne(),dis:st.done}];
      if(st.done){const q=st.n/st.d/1000,f=v=>v.toFixed(3).replace(/0+$/,'').replace(/\.$/,'');const ans=f(q);const o=shuffle([ans,f(q*10),f(q/10)]).filter((x,i,a)=>a.indexOf(x)===i);
        return o.map(x=>({t:x,big:true,fn:()=>{if(x===ans){const m=f(st.n/1000)+' ÷ '+st.d+' = '+ans+'. Check: '+st.d+' × '+ans+' = '+f(st.n/1000)+'.';if(mode==='play'&&!st.setup)game.solved(m);else A.good(m);}else A.bad('Look at one plate: count its ones, tenths, hundredths and thousandths.');}})).concat(mode==='learn'?[{t:'New problem',fn:fresh}]:[]);}
      return mode==='learn'?base.concat([{t:'Show me',fn:auto},{t:'New problem',fn:fresh}]):base;},
    demo(n){if(n==='deal'){setUp(2480,4);auto();}if(n==='deal2'){setUp(3636,3);auto();}},
    task(r){st.setup=true;const d=[2,4,5,3,6][r];const q=[rnd(11,49)*10,rnd(11,99)*10,rnd(101,399),rnd(1001,2999),rnd(101,999)][r];setUp(q*d,d);st.setup=false;
      return r===4?'Share *$'+(st.n/1000).toFixed(2)+'*… careful, it is *'+(st.n/1000)+'* ÷ *'+d+'*. Deal and break, then choose.':'Divide *'+(st.n/1000)+' ÷ '+d+'*. Deal and break, then choose.';}};
  function fresh(){const d=rnd(2,6);setUp(d*rnd(101,999),d);}}
});

/* =========================================================
   13. Fractions of whole numbers; dividing by fractions
   ========================================================= */
P.lesson({id:'fracmul6',title:'Multiplying and dividing by fractions',strand:'Number',codes:['B2.9','B2.10'],
 guide:{goal:'Multiply whole numbers by proper fractions and divide whole numbers by proper fractions, using counters, bars and drawings.',words:'proper fraction, of, groups, multiply, divide, how many fit',
  ask:['How is 3/4 of 12 like sharing into 4 groups?','Why is 3 ÷ 3/4 greater than 3?','How many 2/3-cup scoops are in 4 cups?'],home:'Find 2/3 of 12 grapes by making 3 equal groups. Then ask: how many 3/4-cup scoops fill 3 cups?'},
 learn:[{say:'Fraction of a whole number.',speech:'Arjun takes three quarters of twelve. Split twelve counters into four equal groups of three. Take three of the groups: nine. So three quarters times twelve is nine.',view:'model',demo:'mul'},
        {say:'Read both ideas.',speech:'To multiply by a proper fraction, find equal groups using the denominator, then take the numerator. To divide by a fraction, ask how many of those fraction pieces fit.',view:'read'},
        {say:'Watch: three divided by three quarters.',speech:'How many three-quarter pieces fit in three wholes? Cut the wholes into quarters: twelve quarters. Group them in threes: four groups. So three divided by three quarters is four.',view:'model',demo:'div'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: split and group.',speech:'Your turn. Split the counters or cut the bars, then choose the answer.',view:'model'}],
 fig:'Counters split into equal groups, and bars cut into fraction pieces.',rz:.3,
 explore:['For *×*, split the counters into the right number of *groups*, then *take* some.','For *÷*, *cut* the wholes, then *group* the pieces.','Then choose the *answer*.'],
 howTo:'Split or cut using the denominator, take or group using the numerator, then choose.',
 init:k=>({op:'×',w:12,n:3,d:4,split:0,take:0,cut:0,grp:false}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'*Fraction of a number:* 3/4 × 12 means 3/4 *of* 12. Split into 4 groups, take 3.')+12;
  for(let gi=0;gi<4;gi++){rr(g,X0+gi*200,y,180,70,14);g.fillStyle=gi<3?tint('#2f7de1',.25):'#eef2f8';g.fill();for(let k=0;k<3;k++){g.beginPath();g.arc(X0+gi*200+40+k*50,y+35,16,0,Math.PI*2);g.fillStyle=gi<3?'#2f7de1':'#cbd5e1';g.fill();}}
  T(g,'3/4 × 12 = 9',X0,y+110,ZS(40),acc());y+=140;
  y=para(p,y,'*Dividing by a fraction:* 3 ÷ 3/4 asks *how many 3/4 fit in 3*.')+12;
  for(let b=0;b<3;b++)for(let k=0;k<4;k++){const gi=Math.floor((b*4+k)/3);rr(g,X0+b*270+k*64,y,60,50,6);g.fillStyle=['#2f7de1','#e4572e','#16a36f','#e89a00'][gi];g.fill();}
  T(g,'3 ÷ 3/4 = 4',X0,y+90,ZS(40),acc());T(g,'12 quarters, 4 groups of 3',X0+300,y+86,FT.body,GREY);y+=120;
  y=keyWords(p,y,[['proper fraction','numerator less than denominator, like 3/4'],['÷ 3/4','how many groups of 3/4 fit']]);
  predict(p,y,S,'p13','What is 2/3 of 15?','*10.* 15 ÷ 3 = 5 in each group; 2 groups is 10.');},
 readout(p,S,y){const g=p.g,st=S.st;T(g,st.op==='×'?st.n+'/'+st.d+' × '+st.w+(st.shown?' = '+st.w*st.n/st.d:''):st.w+' ÷ '+st.n+'/'+st.d+(st.shown?' = '+fr(st.w*st.d,st.n):''),X0,y+52,ZS(50),acc());
  T(g,st.op==='×'?(st.split?st.split+' groups of '+st.w/st.split+(st.take?', take '+st.take:''):'Split into equal groups.'):(st.cut?st.w*st.cut+' pieces of 1/'+st.cut+(st.grp?', grouped in '+st.n+'s':''):'Cut the wholes.'),X0,y+94,FT.bodyB);return y+100;},
 build(S,grp,mode,game){const st=S.st;const g2=new THREE.Group();grp.add(g2);const C=['#2f7de1','#e4572e','#16a36f','#e89a00','#8b5cf6','#0fa5a5','#f08a24','#4f9aa0','#c2410c','#64748b','#a855f7','#22c55e'];
  function draw(){clearGroup(g2);
    if(st.op==='×'){const G0=st.split||1,per=st.w/G0;const cols=Math.min(G0,6),rowsN=Math.ceil(G0/cols);const gw=4.2/cols;
      for(let gi=0;gi<G0;gi++){const cx=-2.1+(gi%cols+.5)*gw,cz=-2.5+Math.floor(gi/cols)*1.0;const taken=st.split&&gi<st.take;
        if(st.split){const tray=mk(new THREE.BoxGeometry(gw-.12,.03,.85),lam(taken?tint('#2f7de1',.35):'#eef2f8'),20);tray.position.set(cx,.015,cz);g2.add(tray);A.drag(tray,{tap:()=>takeTo(gi+1)});}
        for(let k=0;k<per;k++){const pc=Math.ceil(Math.sqrt(per));const c=mk(G('fm6c',()=>new THREE.SphereGeometry(.09,14,10)),lam(st.split?(taken?'#2f7de1':'#94a3b8'):'#2f7de1'),0);c.position.set(cx+((k%pc)-(pc-1)/2)*.22,.1+(taken?.06:0),cz+(Math.floor(k/pc)-(Math.ceil(per/pc)-1)/2)*.22);g2.add(c);}}}
    else{const n=st.w,bw=Math.min(1.3,4.2/n-.12),tot=n*bw+(n-1)*.12,x0=-tot/2;let idx=0;
      for(let b=0;b<n;b++){const pcs=st.cut||1,pw=bw/pcs;for(let i=0;i<pcs;i++){const gi=st.grp?Math.floor(idx/st.n):-1;const m=mk(new THREE.BoxGeometry(pw-(pcs>1?.03:0),.34,.9),lam(st.grp?(gi<Math.floor(n*pcs/st.n)?C[gi%12]:'#cbd5e1'):'#2f7de1'),20);m.position.set(x0+b*(bw+.12)+(i+.5)*pw,.17,-2.0);g2.add(m);idx++;}
        const l=label('1 whole',{size:.16,color:GREY});l.position.set(x0+b*(bw+.12)+bw/2,.3,-1.35);g2.add(l);}}
    st.ready=st.op==='×'?st.split===st.d&&st.take===st.n:st.cut===st.d&&st.grp;A.redraw();}
  function splitG(k){if(st.op!=='×')return;if(st.w%k){A.bad(st.w+' does not split into '+k+' equal groups.');return;}st.split=k;st.take=0;A.pop();if(k===st.d)A.say(k+' groups of '+st.w/k+'. Now take '+st.n+'.');draw();}
  function takeTo(k){if(!st.split)return;st.take=Math.min(k,st.split);A.pop();draw();}
  function cut(k){if(st.op!=='÷')return;st.cut=k;st.grp=false;A.pop();draw();}
  function group(){if(st.cut!==st.d){A.bad('First cut the wholes into '+st.d+'ths.');return;}if((st.w*st.d)%st.n){A.say('The pieces do not group evenly. Some are left over!');}st.grp=true;A.pop();draw();}
  function setUp(op,w,n,d){st.op=op;st.w=w;st.n=n;st.d=d;st.split=0;st.take=0;st.cut=0;st.grp=false;st.shown=false;draw();}
  setUp(st.op,st.w,st.n,st.d);
  return {info:()=>st.op==='×'?st.n+'/'+st.d+' of '+st.w:st.w+' ÷ '+st.n+'/'+st.d,
    controls:()=>{const c=[];if(!st.ready){if(st.op==='×'){[2,3,4,5,6].forEach(k=>c.push({t:k+' groups',on:st.split===k,fn:()=>splitG(k)}));if(st.split)c.push({t:'Take 1 more',go:true,fn:()=>takeTo(st.take+1)});}
        else{[2,3,4,5,6,8].forEach(k=>c.push({t:'Cut in '+k+'ths',on:st.cut===k,fn:()=>cut(k)}));c.push({t:'Group by '+st.n,go:true,fn:group});}}
      else{const ans=st.op==='×'?String(st.w*st.n/st.d):fr(st.w*st.d,st.n);const o=shuffle(st.op==='×'?[ans,String(st.w*st.d/st.n),String(st.w/st.d)]:[ans,fr(st.w*st.n,st.d),String(st.w*st.d)]).filter((x,i,a)=>a.indexOf(x)===i);
        o.forEach(x=>c.push({t:x,big:true,fn:()=>{if(x===ans){st.shown=true;A.redraw();const m=(st.op==='×'?st.n+'/'+st.d+' × '+st.w:st.w+' ÷ '+st.n+'/'+st.d)+' = '+ans;if(mode==='play'&&!st.setup)game.solved(m+'!');else A.good(m);}else A.bad(st.op==='×'?'Count the counters in the groups you took.':'Count the groups of '+st.n+' pieces.');}}));}
      if(mode==='learn')c.push({t:'New ×',fn:()=>{const d=pick([2,3,4,5]);setUp('×',d*rnd(2,4),rnd(1,d-1),d);}},{t:'New ÷',fn:()=>{const d=pick([2,3,4]);const n=rnd(1,d-1);setUp('÷',n*rnd(1,3),n,d);}});return c;},
    demo(n){if(n==='mul'){setUp('×',12,3,4);A.seq([[800,()=>splitG(4)],[1100,()=>takeTo(1)],[500,()=>takeTo(2)],[500,()=>takeTo(3)],[900,()=>{st.shown=true;A.redraw();A.say('3/4 of 12 = 9');}]]);}
      if(n==='div'){setUp('÷',3,3,4);A.seq([[800,()=>cut(4)],[1200,group],[1100,()=>{st.shown=true;A.redraw();A.say('4 groups: 3 ÷ 3/4 = 4');}]]);}},
    task(r){st.setup=true;if(r===0)setUp('×',pick([8,12,16]),3,4);else if(r===1)setUp('×',pick([9,12,15]),2,3);else if(r===2){setUp('÷',pick([2,4,6]),2,3);}else if(r===3)setUp('÷',pick([3,6]),3,4);else setUp('×',pick([10,15,20]),pick([2,3,4]),5);st.setup=false;
      return st.op==='×'?'Find *'+st.n+'/'+st.d+' of '+st.w+'*. Split, take, then choose.':'Find *'+st.w+' ÷ '+st.n+'/'+st.d+'*: how many '+st.n+'/'+st.d+' pieces fit?';}};}
});
function fr(a,b){const g=gcd(a,b);a/=g;b/=g;return b===1?String(a):a>b?Math.floor(a/b)+' '+(a%b)+'/'+b:a+'/'+b;}

/* =========================================================
   14. Ratios, rates and percents: multi-step problems
   ========================================================= */
P.lesson({id:'ratio6',title:'Ratio, rate and percent problems',strand:'Number',codes:['B2.12','B2.1'],
 guide:{goal:'Solve multi-step problems involving ratios, rates and percents, using bar models, ratio tables and the properties of operations.',words:'ratio, rate, percent, bar model, unit, part, whole, multi-step',
  ask:['In a 3 : 5 ratio, how many parts are there in all?','If 8 parts are 32, what is one part?','How is 40% like a ratio of 2 : 5?'],home:'A recipe uses 2 cups of rice for 3 cups of water. How much water for 8 cups of rice? Draw a bar model.'},
 learn:[{say:'Bar models show ratios.',speech:'In Chloe’s class, the ratio of boys to girls is three to five, and there are thirty-two students. Draw three boxes for boys and five for girls: eight equal parts. Watch the value of one part grow until the total is thirty-two. Each part is four.',view:'model',demo:'solve'},
        {say:'Read the steps.',speech:'Step one: find the total number of parts. Step two: divide to find one part. Step three: multiply to find what the question asks.',view:'read'},
        {say:'Watch: a percent.',speech:'Forty percent of a class of thirty takes the bus. A percent bar has ten parts, each ten percent. Each part is three students, so four parts are twelve.',view:'model',demo:'pct'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: set one part.',speech:'Your turn. Change the value of one part until the bars match the problem, then answer.',view:'model'}],
 fig:'A bar model: equal parts for each quantity.',rz:.3,
 explore:['Press *part +* and *part −* to change one part.','Watch the *total* change.','When it matches the problem, answer the question.'],
 howTo:'Change the value of one part until the model matches, then choose the answer.',
 init:k=>({a:3,b:5,u:1,pct:false,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'A *bar model* turns a ratio into equal *parts*. Find one part, then everything else.')+16;
  const bx=X0+120,s=70;T(g,'boys',X0,y+38,FT.bodyB,'#2f7de1');T(g,'girls',X0,y+108,FT.bodyB,'#e4572e');
  for(let i=0;i<3;i++){rr(g,bx+i*s,y+8,s-4,48,6);g.fillStyle='#2f7de1';g.fill();T(g,'4',bx+i*s+s/2-2,y+42,FT.bodyB,'#fff','center');}for(let i=0;i<5;i++){rr(g,bx+i*s,y+78,s-4,48,6);g.fillStyle='#e4572e';g.fill();T(g,'4',bx+i*s+s/2-2,y+112,FT.bodyB,'#fff','center');}
  T(g,'} 32 students',bx+5*s+10,y+80,FT.bodyB);y+=150;
  [['1','3 + 5 = 8 parts'],['2','32 ÷ 8 = 4 in one part'],['3','girls: 5 × 4 = 20']].forEach(([n,t],i)=>{T(g,n,X0+12,y+i*46+30,ZS(34),acc());T(g,t,X0+60,y+i*46+28,FT.body);});y+=150;
  y=para(p,y,'*Percent* problems use 10 parts of 10%: 40% of 30 is 4 parts of 3 = *12*. *Rates* work the same way: $12 for 3 kg is $4 per kg.')+10;
  y=keyWords(p,y,[['ratio','a comparison of two quantities, like 3 : 5'],['bar model','equal boxes that show parts of a whole']]);
  predict(p,y,S,'p14','Red and blue beads are in the ratio 2 : 3. There are 25 beads. How many are red?','*10.* 5 parts, 25 ÷ 5 = 5 per part, 2 × 5 = 10.');},
 readout(p,S,y){const g=p.g,st=S.st;if(st.pct){T(g,'10 parts × '+st.u+' = '+st.u*10+' (100%)',X0,y+46,ZS(40),acc());T(g,'each part = 10% = '+st.u,X0,y+90,FT.bodyB);return y+98;}
  T(g,st.a+' : '+st.b+'  →  '+st.a*st.u+' : '+st.b*st.u,X0,y+46,ZS(42),acc());T(g,'one part = '+st.u+'   ·   total = '+(st.a+st.b)*st.u+'   ·   difference = '+Math.abs(st.b-st.a)*st.u,X0,y+90,FT.bodyB);return y+98;},
 build(S,grp,mode,game){const st=S.st;const g2=new THREE.Group();grp.add(g2);
  function draw(){clearGroup(g2);const rows=st.pct?[[10,'#16a36f','100%']]:[[st.a,'#2f7de1',st.la||'A'],[st.b,'#e4572e',st.lb||'B']];const s=Math.min(.42,3.6/Math.max(...rows.map(r=>r[0])));
    rows.forEach(([n,col,lab],ri)=>{const z=-2.5+ri*1.0;const l=label(lab,{size:.2,color:col});l.position.set(-2.1,.3,z);g2.add(l);
      for(let i=0;i<n;i++){const hl=st.pct&&st.hl&&i<st.hl;const h=.12+Math.min(1.4,st.u*.025);const b=mk(new THREE.BoxGeometry(s*.92,h,.6),lam(hl?'#f59e0b':col),20);b.position.set(-1.7+(i+.5)*s,h/2,z);g2.add(b);
        const t=label(String(st.u),{size:.17,color:'#ffffff'});t.position.set(-1.7+(i+.5)*s,h+.18,z);g2.add(t);}
      const tl=label('= '+n*st.u,{size:.22,bg:'#ffffff',border:col});tl.position.set(-1.7+n*s+.45,.4,z);g2.add(tl);});
    const tot=label(st.pct?'whole = '+st.u*10:'total = '+(st.a+st.b)*st.u,{size:.28,bg:'#ffffff'});tot.position.set(.3,1.7,-2.0);g2.add(tot);A.redraw();}
  function setU(u){u=Math.max(1,Math.min(60,u));if(u===st.u)return;st.u=u;A.pop();draw();}
  draw();
  return {info:()=>'one part = '+st.u,
    controls:()=>{const c=[{t:'part −5',fn:()=>setU(st.u-5)},{t:'part −1',fn:()=>setU(st.u-1)},{t:'part +1',big:true,go:true,fn:()=>setU(st.u+1)},{t:'part +5',fn:()=>setU(st.u+5)}];
      if(mode==='play'&&st.ask&&st.ask.ready(st))return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);return c;},
    demo(n){st.ask=null;if(n==='solve'){st.pct=false;st.a=3;st.b=5;st.la='boys';st.lb='girls';st.u=1;draw();A.seq([[600,()=>setU(2)],[600,()=>setU(3)],[600,()=>setU(4)],[900,()=>A.say('8 parts × 4 = 32. Girls: 5 × 4 = 20')]]);}
      if(n==='pct'){st.pct=true;st.u=1;st.hl=0;draw();A.seq([[600,()=>setU(2)],[600,()=>setU(3)],[900,()=>{st.hl=4;draw();A.say('40% = 4 parts × 3 = 12')}]]);}},
    task(r){st.setup=true;st.u=1;st.hl=0;st.pct=false;let txt;
      if(r===0){st.a=rnd(2,4);st.b=rnd(st.a+1,6);st.la='boys';st.lb='girls';const u=rnd(3,8),tot=(st.a+st.b)*u;st.ask={ready:s=>(s.a+s.b)*s.u===tot,ans:st.b*u,o:opts(st.b*u,[u,-u,st.a*u-st.b*u]),ok:'Yes! '+tot+' ÷ '+(st.a+st.b)+' = '+u+' per part, × '+st.b+' = '+st.b*u+'.'};txt='Boys : girls = *'+st.a+' : '+st.b+'*. There are *'+tot+'* students. How many *girls*? Set one part first.';}
      else if(r===1){st.a=2;st.b=3;st.la='red';st.lb='blue';const u=rnd(4,12);st.ask={ready:s=>s.b*s.u===3*u,ans:5*u,o:opts(5*u,[u,-u,2*u]),ok:'Yes! One part is '+u+', so the total is 5 × '+u+' = '+5*u+'.'};txt='Red : blue = *2 : 3*. There are *'+3*u+' blue*. How many beads *in all*?';}
      else if(r===2){st.pct=true;const u=rnd(2,9),p=pick([20,30,40,60,70]);st.ask={ready:s=>s.u===u,ans:p/10*u,o:opts(p/10*u,[u,-u,2]),ok:'Yes! 10% is '+u+', so '+p+'% is '+p/10+' × '+u+' = '+p/10*u+'.'};txt='*'+p+'%* of a class of *'+u*10+'* walk to school. How many walk? Set one 10% part.';st.hl=p/10;}
      else if(r===3){st.a=3;st.b=1;st.la='kg';st.lb='$ per part';const dollars=rnd(4,9)*3;st.ask={ready:s=>true,ans:dollars/3,o:opts(dollars/3,[1,-1,3],1),ok:'Yes! $'+dollars+' ÷ 3 kg = $'+dollars/3+' per kg.'};txt='*3 kg* of apples cost *$'+dollars+'*. What is the *unit rate* in $ per kg?';}
      else{st.a=rnd(2,3);st.b=rnd(4,6);st.la='cats';st.lb='dogs';const u=rnd(3,7),diff=(st.b-st.a)*u;st.ask={ready:s=>(s.b-s.a)*s.u===diff,ans:(st.a+st.b)*u,o:opts((st.a+st.b)*u,[u,-u,diff]),ok:'Yes! The difference is '+(st.b-st.a)+' parts = '+diff+', so one part is '+u+'.'};txt='Cats : dogs = *'+st.a+' : '+st.b+'*. There are *'+diff+' more dogs* than cats. How many pets in all?';}
      draw();st.setup=false;return txt;}};}
});
})();
