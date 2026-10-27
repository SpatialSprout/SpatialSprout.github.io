/* The Interactive Classroom: Grade 5 Math — Number, part B (lessons 8–14) */
(function(){
"use strict";
const P=window.PM;if(!P||P.failed||!P.THREE)return;
const {THREE,V,W,D,PY,PX,X0,TW,INK,RED,BLUE,GREY,VIBE,FT,ZS,G,M,lam,mk,unitBox,cellMat,label,starGeo,wedgeGeo,clearGroup,disposeObj,rr,T,wrap,para,header,keyWords,predict,box,caption,cxOf,cyOf,tint,moveTo,hop,tween,burst,easeOut,easeIO,A}=P;
const acc=()=>P.ACC;
const rnd=(a,b)=>a+Math.floor(Math.random()*(b-a+1)),pick=a=>a[Math.floor(Math.random()*a.length)],shuffle=a=>a.slice().sort(()=>Math.random()-.5);
const fmt=n=>{const neg=n<0;let s=String(Math.abs(n));let [i,f]=s.split('.');if(i.length>=5)i=i.replace(/\B(?=(\d{3})+(?!\d))/g,' ');return (neg?'−':'')+i+(f!=null?'.'+f:'');};
const hs=v=>{const s=(v/100).toFixed(2).replace(/0+$/,'').replace(/\.$/,'');return fmt(s.indexOf('.')>=0?s:+s);};
const mixed=(n,d)=>{const w=Math.floor(n/d),r=n%d;return w&&r?w+' '+r+'/'+d:w?String(w):r+'/'+d;};
function choices(game,list,ans,ok,lab){return list.map(o=>({t:lab?lab(o):String(o),big:true,fn:()=>{if(o===ans){if(game)game.solved(ok);else A.good(ok);}else A.bad('Not quite. Try again!');}}));}
function opts(ans,spread){const s=new Set([ans]);let k=0;while(s.size<3&&k<60){k++;const v=ans+pick(spread);if(v>0)s.add(v);}return shuffle([...s]);}
function digitMat(t,bg,fg){return M('d5g'+t+bg,()=>{const c=document.createElement('canvas');c.width=c.height=128;const g=c.getContext('2d');g.fillStyle=bg;g.fillRect(0,0,128,128);
  g.strokeStyle='rgba(27,34,54,.25)';g.lineWidth=6;g.strokeRect(3,3,122,122);g.fillStyle=fg||'#1b2236';g.font='700 84px "Zilla Slab", Georgia, serif';g.textAlign='center';g.textBaseline='middle';g.fillText(t,64,70);
  const tx=new THREE.CanvasTexture(c);tx.anisotropy=4;return new THREE.MeshLambertMaterial({map:tx});});}
function digitCube(t,bg,s,fg){const geo=G('d5cube'+s,()=>new THREE.BoxGeometry(s,s,s));const side=lam(bg),m=digitMat(t,bg,fg);return mk(geo,[side,side,m,side,m,side],20);}

/* =========================================================
   8. Multiplying by 0.1 and 0.01; estimating with decimals
   ========================================================= */
const PLC=['#16a36f','#2f7de1','#e4572e','#e89a00','#0fa5a5','#8b5cf6'];
P.lesson({id:'times01',title:'Multiplying by 0.1 and 0.01',strand:'Number',codes:['B2.3'],
 guide:{goal:'Use mental math to multiply whole numbers by 0.1 and 0.01 by seeing how digits shift on a place-value chart, and estimate sums and differences of decimal numbers.',words:'tenth, hundredth, shift, place-value chart, mental math, estimate',
  ask:['Why does × 0.1 make a number smaller?','Where does the 7 go when you find 47 × 0.01?','About how much is 3.48 + 5.61?'],home:'Shopping math: a 10% discount is like × 0.1. What is 10% of $40? Of $25?'},
 learn:[{say:'× 0.1 moves digits one place right.',speech:'Multiplying by zero point one is the same as finding one tenth. Every digit moves one place to the right. Watch Layla’s thirty-four become three point four.',view:'model',demo:'x01'},
        {say:'Read the place-value shifts.',speech:'Times zero point one moves the digits one place right. Times zero point zero one moves them two places right. The number gets smaller.',view:'read'},
        {say:'Watch: × 0.01.',speech:'Now multiply five hundred twenty by zero point zero one. That is one hundredth of it. The digits move two places right: five point two.',view:'model',demo:'x001'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: slide the digits.',speech:'Your turn. Press times zero point one or times zero point zero one, and watch the digit cubes slide right.',view:'model'}],
 fig:'Digit cubes on a place-value chart from thousands to hundredths.',rz:.1,
 explore:['Press *× 0.1* or *× 0.01* to slide the digits right.','Press *× 10* or *× 100* to slide them back.','Empty places before the decimal fill with *0*.'],
 howTo:'Read the start number and the question. Press the operation that makes the digits slide to the answer.',
 init:k=>({v:3400,start:3400,target:null,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'*× 0.1* means *one tenth of*. *× 0.01* means *one hundredth of*. Each digit slides to the *right*, so the number gets smaller.')+18;
  const cw=(TW-210)/6;['H','T','O','.','t','h'].forEach((h,i)=>{const x=X0+i*cw+cw/2;if(h==='.'){T(g,'.',x,y+150,ZS(80),INK,'center');return;}rr(g,X0+i*cw+6,y,cw-12,44,10);g.fillStyle=tint(PLC[i<3?i+1:i],.18);g.fill();T(g,h,x,y+32,FT.smallB,PLC[i<3?i+1:i],'center');});
  const row=(dig,yy,lab,col)=>{dig.forEach((d,i)=>{if(d==null)return;rr(g,X0+i*cw+14,yy,cw-28,60,10);g.fillStyle=col;g.fill();T(g,d,X0+i*cw+cw/2,yy+46,ZS(42),'#fff','center');});T(g,lab,X0+TW,yy+42,FT.bodyB,INK,'right');};
  row([null,'3','4',null,null,null],y+60,'34',BLUE);row([null,null,'3',null,'4',null],y+130,'× 0.1 = 3.4','#e4572e');row([null,null,'0',null,'3','4'],y+200,'× 0.01 = 0.34','#8b5cf6');y+=286;
  y=para(p,y,'*Estimating* with decimals: round to friendly numbers first. 3.48 + 5.61 is about *3.5 + 5.6 = 9.1*, or about *3 + 6 = 9*.')+12;
  y=keyWords(p,y,[['× 0.1','the same as dividing by 10'],['× 0.01','the same as dividing by 100']]);
  predict(p,y,S,'p8','What is 250 × 0.01?','*2.5.* Each digit moves two places right.');},
 readout(p,S,y){const g=p.g,st=S.st;T(g,hs(st.v),X0,y+56,ZS(62),acc());if(st.target!=null)T(g,'Target: '+hs(st.target),X0+330,y+48,FT.bodyB);
  T(g,'Started at '+hs(st.start),X0,y+94,FT.small,GREY);return y+100;},
 build(S,grp,mode,game){const st=S.st,cw=.72,Z=-1.55,x0=-2.16,s=.46;
  ['1000s','100s','10s','1s','tenths','hundredths'].forEach((t,i)=>{const m=mk(new THREE.BoxGeometry(cw-.06,.03,1.5),lam(['#d7f1e5','#d7e6fb','#fbdde6','#fff0c4','#d4f4f4','#ede6ff'][i]),20);m.position.set(x0+(i+.5)*cw,.015,Z);grp.add(m);
    const l=label(t,{size:i>3?.13:.17,color:PLC[i]});l.position.set(x0+(i+.5)*cw,.25,Z-.95);grp.add(l);});
  const dot=mk(new THREE.SphereGeometry(.08,12,10),lam(INK),0);dot.position.set(x0+4*cw,.12,Z+.45);grp.add(dot);
  const cubes=new THREE.Group();grp.add(cubes);let anim=false;
  function lead(v){const ds=String(v).padStart(6,'0').split('').map(Number);let f=ds.findIndex(d=>d>0);if(f<0||f>3)f=3;return ds.map((d,i)=>i<f?null:i<=3?d:i===4?(ds[4]||ds[5]?d:null):(ds[5]?d:null));}
  function render(){clearGroup(cubes);lead(st.v).forEach((d,i)=>{if(d==null)return;const c=digitCube(String(d),PLC[i],s);c.position.set(x0+(i+.5)*cw,s/2+.03,Z);cubes.add(c);});A.redraw();}
  function apply(num,den,name,shift){if(anim)return;const nv=st.v*num/den;if(nv>=1000000){A.bad('Too big for the chart.');return;}if(Math.abs(nv-Math.round(nv))>1e-9){A.bad('That would need thousandths. Not on this chart!');return;}
    anim=true;A.pop();cubes.children.forEach(c=>moveTo(c,{pos:V(c.position.x+shift*cw,s/2+.28,Z),k:5}));A.later(()=>{st.v=Math.round(nv);render();anim=false;A.say(name+' → '+hs(st.v));check();},900);}
  function check(){if(mode==='play'&&!st.setup&&st.target!=null&&st.v===st.target)game.solved('Yes! '+hs(st.start)+' became '+hs(st.target)+'.');}
  render();
  return {info:()=>'Value: '+hs(st.v),
    controls:()=>{if(mode==='play'&&st.ask)return choices(game,st.ask.o,st.ask.ans,st.ask.ok);
      return [{t:'× 0.1',big:true,go:true,fn:()=>apply(1,10,'× 0.1',1)},{t:'× 0.01',big:true,go:true,fn:()=>apply(1,100,'× 0.01',2)},{t:'× 10',fn:()=>apply(10,1,'× 10',-1)},{t:'× 100',fn:()=>apply(100,1,'× 100',-2)},
        {t:'Start over',fn:()=>{st.v=st.start;render();}}].concat(mode==='learn'?[{t:'New number',fn:()=>{st.v=st.start=rnd(2,99)*100;render();}}]:[]);},
    demo(n){if(n==='v3400'){st.v=st.start=3400;render();return;}if(n==='ax01'){apply(1,10,'34 × 0.1',1);return;}st.ask=null;if(n==='x01'){st.v=st.start=3400;render();A.seq([[900,()=>apply(1,10,'34 × 0.1',1)]]);}if(n==='x001'){st.v=st.start=52000;render();A.seq([[900,()=>apply(1,100,'520 × 0.01',2)]]);}},
    task(r){st.setup=true;st.ask=null;let a,t,txt;
      if(r===0){a=rnd(12,98);t=a*10;txt='What is *'+a+' × 0.1*? Make it.';}
      else if(r===1){a=rnd(2,9)*10*rnd(1,9);a=Math.min(a,980);t=a;txt='Make *'+fmt(a)+' × 0.01*.';}
      else if(r===2){a=rnd(2,9);t=a*10;txt='Find *one tenth of '+a+'*.';}
      else if(r===3){a=rnd(11,99);t=a;txt='What is *'+a+' × 0.01*? Make it.';}
      else{const x=rnd(110,890),y=rnd(110,890);st.v=st.start=0;st.target=null;render();const ans=Math.round((x+y)/100);st.ask={ans,o:opts(ans,[1,-1,2,-2,10]),ok:'Yes! '+(x/100).toFixed(2)+' + '+(y/100).toFixed(2)+' is about '+ans+'.'};st.setup=false;
        return 'Estimate: *'+(x/100).toFixed(2)+' + '+(y/100).toFixed(2)+'* is about…';}
      st.v=st.start=a*100;st.target=t;render();st.setup=false;return txt;}};}
});

/* =========================================================
   9. Adding and subtracting to 100 000 and hundredths
   ========================================================= */
P.lesson({id:'addsub5',title:'Adding and subtracting to 100 000',strand:'Number',codes:['B2.4'],
 guide:{goal:'Represent and solve addition and subtraction problems with whole numbers up to 100 000 and decimal numbers to hundredths, using the standard algorithm with regrouping, and check by estimating.',words:'algorithm, column, regroup, carry, decimal point, hundredths, estimate',
  ask:['Why must the decimal points line up?','How do you regroup across a zero, like 40 003 − 1256?','How can estimating check 47.85 + 23.69?'],home:'Add up a grocery bill with prices like $3.49 and $12.75. Estimate first, then add exactly.'},
 learn:[{say:'Line up the places and add from the right.',speech:'Line up the places, like Mateo. Start with the ones. When a column adds to ten or more, write the ones digit and carry one to the next column. Watch.',view:'model',demo:'add'},
        {say:'Read about decimals in columns.',speech:'With decimals, line up the decimal points so tenths add to tenths and hundredths add to hundredths. Then add just like whole numbers.',view:'read'},
        {say:'Watch: subtracting hundredths.',speech:'Now subtract decimals. When the top digit is too small, regroup one from the next place into ten.',view:'model',demo:'sub'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: solve each column.',speech:'Your turn. For each column, choose the digit that goes in the answer. The model carries and regroups for you.',view:'model'}],
 fig:'A column board: the digits carry and regroup as you solve.',rz:.35,
 explore:['Choose the *answer digit* for the glowing column.','Press *Regroup* when the top digit is too small.','Press *Show me* to watch a whole problem solved.'],
 howTo:'Work from right to left. Choose the digit for the glowing answer box. Press Regroup when you need to.',
 init:k=>({a:46875,b:28349,op:'+',dec:0,col:-1}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'Line up the *places* and the *decimal points*. Work from *right to left*, one column at a time.')+16;
  const cw=64,x1=X0+90;const rowS=(t,yy,col)=>{[...t].forEach((d,i)=>T(g,d,x1+i*cw,yy,ZS(50),col||INK,'center'));};
  T(g,'1',x1+cw*4,y+20,FT.smallB,RED,'center');T(g,'1',x1+cw*2,y+20,FT.smallB,RED,'center');rowS(' 47.85',y+76);rowS('+23.69',y+138);g.fillStyle=INK;g.fillRect(x1-36,y+158,cw*6,5);rowS(' 71.54',y+216,'#16a36f');
  wrap(g,'5 + 9 = 14 hundredths: write *4*, carry *1 tenth*. 8 + 6 + 1 = 15 tenths: write *5*, carry *1 one*.',X0+500,y+60,TW-500,34,{font:FT.small,bold:FT.smallB});y+=272;
  y=para(p,y,'*Estimate* to check: 47.85 + 23.69 is about 48 + 24 = *72*. The answer 71.54 is close, so it is reasonable. Big numbers work the same way: 46 875 + 28 349 = *75 224*.')+12;
  y=keyWords(p,y,[['algorithm','a step-by-step method that always works'],['regroup','trade 1 of a place for 10 of the next smaller place, or 10 for 1']]);
  predict(p,y,S,'p9','Estimate 62 480 − 19 875 to the nearest thousand.','*About 42 000.* 62 000 − 20 000 = 42 000.');},
 readout(p,S,y){const g=p.g,st=S.st,f=v=>st.dec?(v/100).toFixed(2):fmt(v);T(g,f(st.a)+' '+(st.op==='+'?'+':'−')+' '+f(st.b)+' = '+(st.col>=st.n?f(st.op==='+'?st.a+st.b:st.a-st.b):'?'),X0,y+50,ZS(44),acc());
  T(g,st.col>=0&&st.col<st.n?'Solve the '+st.labels[st.col]+' column.':'Solved! Try another.',X0,y+90,FT.bodyB);return y+100;},
 build(S,grp,mode,game){const st=S.st,cw=.6,s=.4,Z0=-2.75,rowZ=[0,.62,1.42],xR=1.85;
  const board=mk(new THREE.BoxGeometry(4.5,.03,2.55),lam('#f3f6fb'),20);board.position.set(-.1,.015,Z0+.85);grp.add(board);const bar=mk(new THREE.BoxGeometry(4.0,.04,.06),lam(INK),0);bar.position.set(-.05,.04,Z0+1.03);grp.add(bar);
  const opL=label('+',{size:.5});grp.add(opL);
  const cubes=new THREE.Group();grp.add(cubes);const glow=mk(new THREE.BoxGeometry(s+.12,.04,s+.12),lam('#ffd24a'),0);grp.add(glow);
  const dps=[0,1,2].map(()=>{const d=mk(new THREE.SphereGeometry(.06,12,10),lam(INK),0);grp.add(d);return d;});let A1,B1,R,carry,busy=false;
  const xOf=i=>xR-i*cw;
  function setup(a,b,op,dec){st.a=a;st.b=b;st.op=op;st.dec=dec;const res=op==='+'?a+b:a-b;st.n=Math.max(String(a).length,String(b).length,String(res).length,dec?dec+1:1);
    st.labels=Array.from({length:st.n},(_,i)=>(dec?['hundredths','tenths','ones','tens','hundreds','thousands','ten thousands']:['ones','tens','hundreds','thousands','ten thousands','hundred thousands'])[i]);
    A1=String(a).split('').reverse().map(Number);B1=String(b).split('').reverse().map(Number);R=[];carry=0;st.carryTo=null;st.col=0;st.work=A1.slice();opL.userData.set(op==='+'?'+':'−');opL.position.set(xOf(st.n)-.1,.3,Z0+rowZ[1]);draw();}
  function draw(){clearGroup(cubes);const n=st.n;const la=Math.max(String(st.a).length,st.dec+1),lb=Math.max(String(st.b).length,st.dec+1);
    for(let i=0;i<n;i++){if(i<la){const c=digitCube(String(st.work[i]||0),'#d7e6fb',s);c.position.set(xOf(i),s/2+.03,Z0+rowZ[0]);cubes.add(c);if((st.work[i]||0)>9)c.scale.set(1.12,1,1.12);}
      if(i<lb){const c=digitCube(String(B1[i]||0),'#fbdde6',s);c.position.set(xOf(i),s/2+.03,Z0+rowZ[1]);cubes.add(c);}
      if(R[i]!=null){const c=digitCube(String(R[i]),'#c9f0dd',s);c.position.set(xOf(i),s/2+.03,Z0+rowZ[2]);cubes.add(c);}}
    if(st.carryTo!=null&&st.op==='+'){const c=digitCube('1','#ffcf3f',s*.55);c.position.set(xOf(st.carryTo),s+.3,Z0+rowZ[0]-.05);cubes.add(c);}
    glow.visible=st.col>=0&&st.col<st.n;if(glow.visible)glow.position.set(xOf(st.col),.03,Z0+rowZ[2]);
    dps.forEach((d,k)=>{d.visible=!!st.dec;d.position.set(xOf(st.dec)+cw/2,.1,Z0+rowZ[k]+.18);});A.redraw();}
  function colAnswer(){const i=st.col;if(st.op==='+'){const v=(A1[i]||0)+(B1[i]||0)+carry;return {d:v%10,carry:v>=10?1:0};}
    const top=st.work[i]||0,bot=B1[i]||0;if(top<bot)return {borrow:true};return {d:top-bot};}
  function doBorrow(){const i=st.col;let j=i+1;while((st.work[j]||0)===0&&j<st.n)j++;for(let k=j;k>i;k--){st.work[k]=(st.work[k]||0)-1;st.work[k-1]=(st.work[k-1]||0)+10;}
    A.say('Regroup: 1 '+st.labels[i+1]+' becomes 10 '+st.labels[i]+'.');A.pop();draw();}
  const f=v=>st.dec?(v/100).toFixed(2):fmt(v);
  function answer(d){if(busy||st.col<0||st.col>=st.n)return;const a=colAnswer();
    if(a.borrow){A.bad('The top digit is too small. Press Regroup first!');return;}
    if(d!==a.d){A.bad('Not quite. Check the '+st.labels[st.col]+' column again.');return;}
    R[st.col]=d;if(st.op==='+'){carry=a.carry;st.carryTo=a.carry?st.col+1:null;}st.col++;A.pop();
    const res=st.op==='+'?st.a+st.b:st.a-st.b;const need=Math.max(String(res).length,st.dec+1);
    if(st.col>=st.n||(st.col>=need&&!carry)){st.col=st.n;st.carryTo=null;draw();A.good(f(st.a)+(st.op==='+'?' + ':' − ')+f(st.b)+' = '+f(res));if(mode==='play'&&!st.setup)game.solved('Correct: '+f(res)+'!');return;}
    if(a.carry)A.say('Carry 1 to the '+st.labels[st.col]+'.');draw();}
  function showMe(){if(busy)return;busy=true;const runStep=()=>{if(st.col>=st.n){busy=false;return;}const a=colAnswer();if(a.borrow){doBorrow();A.later(runStep,1000);return;}busy=false;answer(a.d);busy=true;A.later(runStep,1000);};A.later(runStep,400);}
  setup(st.a,st.b,st.op,st.dec);
  return {info:()=>st.col<st.n?'Answer digit for the '+st.labels[st.col]+' column':'Solved!',
    controls:()=>{const c=[];if(st.col<st.n){const a=colAnswer();if(a.borrow)c.push({t:'Regroup',go:true,big:true,fn:doBorrow});else for(let d=0;d<=9;d++)c.push({t:String(d),big:true,fn:()=>answer(d)});}
      if(mode==='learn')c.push({t:'Show me',fn:showMe},{t:'New + problem',fn:()=>setup(rnd(12000,48000),rnd(11000,48000),'+',0)},{t:'New decimal −',fn:()=>{const a=rnd(2000,9800);setup(a,rnd(1100,a-300),'−',2);}});return c;},
    demo(n){if(n==='show'){setup(46875,28349,'+',0);return;}if(n==='showme'){showMe();return;}busy=false;if(n==='add')setup(46875,28349,'+',0);if(n==='sub')setup(8240,3675,'−',2);A.seq([[700,showMe]]);},
    task(r){busy=false;st.setup=true;if(r===0)setup(rnd(12000,48000),rnd(12000,48000),'+',0);else if(r===1){const a=rnd(50000,95000);setup(a,rnd(12000,a-8000),'−',0);}
      else if(r===2)setup(rnd(1200,4800),rnd(1200,4800),'+',2);else if(r===3){const a=rnd(4000,9800);setup(a,rnd(1200,a-500),'−',2);}else setup(rnd(1500,6999),rnd(1500,2999),'+',2);
      st.setup=false;return r===4?'You buy items for *$'+f(st.a)+'* and *$'+f(st.b)+'*. Find the total.':'Solve *'+f(st.a)+(st.op==='+'?' + ':' − ')+f(st.b)+'*, one column at a time.';}};}
});

/* =========================================================
   10. Adding and subtracting fractions with like denominators
   ========================================================= */
P.lesson({id:'fracadd5',title:'Adding and subtracting fractions',strand:'Number',codes:['B2.5'],
 guide:{goal:'Add and subtract fractions with like denominators, using fraction strips and a number line, in everyday contexts.',words:'like denominators, numerator, denominator, sum, difference, improper fraction, mixed number',
  ask:['Why do we add the numerators but keep the denominator?','Why is 3/8 + 2/8 not 5/16?','What is 7/6 − 4/6?'],home:'Share a pizza cut into 8 slices. If you eat 3/8 and a friend eats 2/8, how much is gone? How much is left?'},
 learn:[{say:'Add pieces of the same size.',speech:'Keiko eats three eighths and Jordan eats two eighths. The pieces are all eighths, so we just count them: three pieces plus two pieces is five pieces. Five eighths.',view:'model',demo:'add'},
        {say:'Read the rule.',speech:'When the denominators are the same, add or subtract the numerators. The denominator stays the same, because the size of the pieces does not change.',view:'read'},
        {say:'Watch: take pieces away.',speech:'Now seven sixths minus four sixths. Start with seven sixth-pieces. Take away four of them. Three sixths are left, which is one half.',view:'model',demo:'sub'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: add or take pieces.',speech:'Your turn. Add the orange pieces, or tap blue pieces to take them away. Then choose the answer.',view:'model'}],
 fig:'Fraction pieces on a two-whole track.',rz:-.1,
 explore:['For *+*, press *Add a piece* to place the orange pieces.','For *−*, *tap blue pieces* to take them away.','Then choose the *answer*.'],
 howTo:'Read the problem. Add the orange pieces or tap pieces away, then choose the answer.',
 init:k=>({d:8,a:3,b:2,op:'+',k:0}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'Fractions with *like denominators* are made of the *same size* pieces, so you can count them.')+16;
  const bw=TW-40,w=bw/8;for(let i=0;i<8;i++){rr(g,X0+i*w+2,y,w-4,60,8);g.fillStyle=i<3?'#2f7de1':i<5?'#e4572e':'#e9eef7';g.fill();}T(g,'3/8',X0+1.5*w,y+40,ZS(32),'#fff','center');T(g,'2/8',X0+4*w,y+40,ZS(32),'#fff','center');y+=100;
  T(g,'3/8 + 2/8 = 5/8',X0,y,ZS(46),acc());T(g,'not 5/16!',X0+430,y-4,FT.hand,RED);y+=60;
  for(let i=0;i<7;i++){rr(g,X0+i*w+2,y,w-4,60,8);g.fillStyle=i<3?'#16a36f':'#dfe5ef';g.fill();if(i>=3){g.strokeStyle=RED;g.lineWidth=4;g.beginPath();g.moveTo(X0+i*w+10,y+8);g.lineTo(X0+(i+1)*w-10,y+52);g.stroke();}}
  T(g,'(sixths)',X0+7*w+10,y+40,FT.small,GREY);y+=100;T(g,'7/6 − 4/6 = 3/6 = 1/2',X0,y,ZS(46),acc());y+=50;
  y=para(p,y,'Add or subtract the *numerators*. Keep the *denominator*: it names the size of the pieces.')+12;
  y=keyWords(p,y,[['like denominators','the same denominator, like 3/8 and 2/8'],['difference','the answer to a subtraction']]);
  predict(p,y,S,'p10','A ribbon is 9/10 m long. You cut off 4/10 m. How much is left?','*5/10 m (1/2 m).* 9 − 4 = 5 tenths.');},
 readout(p,S,y){const g=p.g,st=S.st,res=st.op==='+'?st.a+st.b:st.a-st.b;const done=st.k===st.b;
  T(g,st.a+'/'+st.d+' '+(st.op==='+'?'+':'−')+' '+st.b+'/'+st.d+' = '+(done&&st.shown?res+'/'+st.d+(res>st.d?' = '+mixed(res,st.d):''):'?'),X0,y+52,ZS(46),acc());
  T(g,done?'Choose the answer.':st.op==='+'?'Add '+(st.b-st.k)+' more orange piece'+(st.b-st.k===1?'':'s')+'.':'Tap '+(st.b-st.k)+' more blue piece'+(st.b-st.k===1?'':'s')+' to take away.',X0,y+92,FT.bodyB);return y+100;},
 build(S,grp,mode,game){const st=S.st,Z=-1.75,L=1.95,x0=-1.95;const track=mk(new THREE.BoxGeometry(2*L+.1,.04,.9),lam('#eef2f8'),20);track.position.set(0,.02,Z);grp.add(track);
  [0,1,2].forEach(k=>{const t=mk(new THREE.BoxGeometry(.03,.5,1.0),lam(INK),0);t.position.set(x0+k*L,.25,Z);grp.add(t);const l=label(String(k),{size:.3});l.position.set(x0+k*L,.75,Z+.1);grp.add(l);});
  const pcs=new THREE.Group();grp.add(pcs);const sum=label('',{size:.34,bg:'#ffffff'});sum.position.set(0,1.5,Z);grp.add(sum);let gone=[];
  function draw(){clearGroup(pcs);const w=L/st.d;const n=st.op==='+'?st.a+st.k:st.a;
    for(let i=0;i<n;i++){const orange=st.op==='+'&&i>=st.a,off=st.op==='−'&&gone.indexOf(i)>=0;const m=mk(G('fa5'+st.d,()=>new THREE.BoxGeometry(w-.03,.3,.66)),lam(off?'#dfe5ef':orange?'#e4572e':'#2f7de1'),20);
      m.position.set(x0+(i+.5)*w,off?.04:.18,Z);if(off)m.scale.set(1,.25,1);pcs.add(m);if(st.d<=10&&!off){const l=label('1/'+st.d,{size:.15,color:'#fff'});l.position.set(x0+(i+.5)*w,.42,Z);pcs.add(l);}
      if(st.op==='−'&&!off)A.drag(m,{tap:()=>takeAway(i)});}
    const res=st.op==='+'?st.a+st.k:st.a-st.k;sum.userData.set(res+'/'+st.d);A.redraw();}
  function addOne(){if(st.op!=='+'||st.k>=st.b){A.bad(st.op==='+'?'That is enough pieces. Choose the answer!':'For subtraction, tap blue pieces to take them away.');return;}st.k++;A.pop();if(st.k===st.b)A.say('Now choose the answer.');draw();}
  function takeAway(i){if(st.op!=='−'||st.k>=st.b||gone.indexOf(i)>=0)return;gone.push(i);st.k++;A.pop();if(st.k===st.b)A.say('Now choose the answer.');draw();}
  function setUp(d,a,b,op){st.d=d;st.a=a;st.b=b;st.op=op;st.k=0;st.shown=false;gone=[];draw();}
  function fresh(){const d=pick([3,4,5,6,8,10,12]);if(Math.random()<.5){const a=rnd(1,d),b=rnd(1,d);setUp(d,a,b,'+');}else{const a=rnd(3,2*d-1),b=rnd(1,a-1);setUp(d,a,b,'−');}}
  setUp(st.d,st.a,st.b,st.op);
  return {info:()=>st.a+'/'+st.d+' '+st.op+' '+st.b+'/'+st.d,
    controls:()=>{const res=st.op==='+'?st.a+st.b:st.a-st.b;const c=[];if(st.k<st.b){if(st.op==='+')c.push({t:'Add a piece',go:true,big:true,fn:addOne});}
      else{const o=shuffle([res+'/'+st.d,st.op==='+'?res+'/'+2*st.d:(st.a+st.b)+'/'+st.d,(res+1)+'/'+st.d].filter((x,i,a)=>a.indexOf(x)===i));
        o.forEach(x=>c.push({t:x,big:true,fn:()=>{if(x===res+'/'+st.d){st.shown=true;A.redraw();const msg=st.a+'/'+st.d+(st.op==='+'?' + ':' − ')+st.b+'/'+st.d+' = '+res+'/'+st.d+(res>st.d?' = '+mixed(res,st.d):'');if(mode==='play'&&!st.setup)game.solved(msg+'!');else A.good(msg);}else A.bad(/\/\d+$/.test(x)&&+x.split('/')[1]!==st.d?'Keep the denominator: the pieces are still '+st.d+'ths.':'Count the pieces again.');}}));}
      if(mode==='learn')c.push({t:'New problem',fn:fresh});return c;},
    demo(n){if(n==='show'){setUp(8,3,2,'+');return;}if(n==='add1'){addOne();return;}if(n==='add'){setUp(8,3,2,'+');A.seq([[900,addOne],[800,addOne],[900,()=>{st.shown=true;A.redraw();A.say('3/8 + 2/8 = 5/8');}]]);}
      if(n==='sub'){setUp(6,7,4,'−');A.seq([[900,()=>takeAway(6)],[600,()=>takeAway(5)],[600,()=>takeAway(4)],[600,()=>takeAway(3)],[900,()=>{st.shown=true;A.redraw();A.say('7/6 − 4/6 = 3/6');}]]);}},
    task(r){st.setup=true;let d,a,b,op,ctx;
      if(r===0){d=pick([5,6,8]);a=rnd(1,d-2);b=rnd(1,d-a-1);op='+';ctx='Add *'+a+'/'+d+' + '+b+'/'+d+'*.';}
      else if(r===1){d=8;a=rnd(5,7);b=rnd(1,a-1);op='−';ctx='A pizza had *'+a+'/8* left. You ate *'+b+'/8*. How much is left now?';}
      else if(r===2){d=pick([3,4,6]);a=rnd(2,d);b=rnd(d-a+1,d);op='+';ctx='Add *'+a+'/'+d+' + '+b+'/'+d+'*. Is it more than 1?';}
      else if(r===3){d=pick([10,12]);a=rnd(d+1,2*d-1);b=rnd(2,d);op='−';ctx='Subtract *'+a+'/'+d+' − '+b+'/'+d+'*.';}
      else{d=4;a=rnd(1,3);b=rnd(2,4);op='+';ctx='You run *'+a+'/4 km*, then *'+b+'/4 km*. How far in all?';}
      setUp(d,a,b,op);st.setup=false;return ctx;}};}
});

/* =========================================================
   11. Two-digit × two-digit: area model and algorithm
   ========================================================= */
P.lesson({id:'mult5',title:'Multiplying two-digit numbers',strand:'Number',codes:['B2.6'],
 guide:{goal:'Represent and solve problems that multiply a two-digit number by a two-digit number with an area model and with the standard algorithm, and connect the two methods.',words:'area model, partial product, algorithm, tens, ones, estimate',
  ask:['What are the four partial products for 23 × 47?','Where are those partial products in the algorithm?','Estimate 38 × 52 before you calculate.'],home:'A theatre has 24 rows of 36 seats. How many seats in all? Draw the area model together.'},
 learn:[{say:'Split both numbers into tens and ones.',speech:'Jordan needs twenty-three times forty-seven. Split twenty-three into twenty and three, and forty-seven into forty and seven. The area model has four parts. Watch them fill in.',view:'model',demo:'parts'},
        {say:'Read the connection.',speech:'The four partial products are eight hundred, one hundred forty, one hundred twenty, and twenty-one. Their sum is one thousand eighty-one. The algorithm adds the same parts in two rows.',view:'read'},
        {say:'Watch: the two rows of the algorithm.',speech:'Three times forty-seven is one hundred forty-one: that is the bottom strip. Twenty times forty-seven is nine hundred forty: that is the top strip. One hundred forty-one plus nine hundred forty is one thousand eighty-one.',view:'model',demo:'rows'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: reveal and add.',speech:'Your turn. Tap each part of the area model to see its product, then choose the total.',view:'model'}],
 fig:'A two-by-two area model. Each block is a partial product.',rz:.35,
 explore:['*Tap a block* to see its partial product.','The block heights grow with the product.','Press *New problem* for new numbers.'],
 howTo:'Tap all four blocks to find the partial products, then choose the total.',
 init:k=>({a:23,b:47,shown:[false,false,false,false]}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'Split each factor into *tens and ones*. The area model makes *four partial products*.')+20;
  const ox=X0+60,wT=360,wO=110,hT=170,hO=70,C=['#2f7de1','#e4572e','#16a36f','#e89a00'];
  [[0,0,wT,hT,'20 × 40','800'],[wT,0,wO,hT,'20 × 7','140'],[0,hT,wT,hO,'3 × 40','120'],[wT,hT,wO,hO,'3 × 7','21']].forEach(([x,yy,w,h,a,b],i)=>{rr(g,ox+x+3,y+yy+3,w-6,h-6,8);g.fillStyle=tint(C[i],.25);g.fill();g.lineWidth=3;g.strokeStyle=C[i];g.stroke();
    T(g,a,ox+x+w/2,y+yy+h/2-(h>100?8:-2),h>100?FT.small:FT.cap,INK,'center');if(h>100)T(g,b,ox+x+w/2,y+yy+h/2+32,ZS(34),INK,'center');else T(g,b,ox+x+w-12,y+yy+h-12,FT.smallB,INK,'right');});
  T(g,'40',ox+wT/2,y-8,FT.bodyB,INK,'center');T(g,'7',ox+wT+wO/2,y-8,FT.bodyB,INK,'center');T(g,'20',ox-30,y+hT/2+8,FT.bodyB,INK,'center');T(g,'3',ox-30,y+hT+hO/2+8,FT.bodyB,INK,'center');
  const ax=X0+600;[['   47',0],['×  23',44],['  141',100],['+ 940',144],[' 1081',200]].forEach(([t,dy],i)=>T(g,t,ax,y+30+dy,ZS(36),i===4?'#16a36f':INK));g.fillStyle=INK;g.fillRect(ax-6,y+86,140,4);g.fillRect(ax-6,y+186,140,4);
  T(g,'3 × 47',ax+150,y+126,FT.cap,GREY);T(g,'20 × 47',ax+150,y+170,FT.cap,GREY);y+=hT+hO+40;
  y=para(p,y,'800 + 140 + 120 + 21 = *1081*. The algorithm adds the bottom strip (141) and the top strip (940): the *same* partial products, grouped by rows.')+12;
  y=keyWords(p,y,[['partial product','the product of one part of each factor'],['algorithm','a short written method for the same work']]);
  predict(p,y,S,'p11','Estimate 38 × 52.','*About 2000.* 38 is about 40 and 52 is about 50: 40 × 50 = 2000.');},
 readout(p,S,y){const g=p.g,st=S.st,pp=parts(st.a,st.b);T(g,st.a+' × '+st.b+' = '+pp.map((v,i)=>st.shown[i]?String(v):'?').join(' + '),X0,y+50,ZS(40),acc());
  if(st.shown.every(x=>x))T(g,'= '+st.a*st.b,X0,y+92,ZS(40));return y+100;},
 build(S,grp,mode,game){const st=S.st,cols=['#2f7de1','#e4572e','#16a36f','#e89a00'];const blocks=new THREE.Group();grp.add(blocks);
  function draw(){clearGroup(blocks);const aT=Math.floor(st.a/10)*10,aO=st.a%10,bT=Math.floor(st.b/10)*10,bO=st.b%10;
    const WX=3.7,WZ=2.7,wbT=Math.max(1.6,WX*bT/st.b),wbO=Math.max(.55,WX-wbT),dzT=Math.max(1.4,WZ*aT/st.a),dzO=Math.max(.55,WZ-dzT);const sx=WX/(wbT+wbO),sz=WZ/(dzT+dzO);
    const xs=[-1.85,-1.85+wbT*sx],ws=[wbT*sx,wbO*sx],zs=[-3.0,-3.0+dzT*sz],ds=[dzT*sz,dzO*sz];const pp=parts(st.a,st.b);
    [[0,0],[0,1],[1,0],[1,1]].forEach(([r,c],i)=>{if(pp[i]===0)return;const on=st.shown[i];const h=on?.1+Math.min(1.1,pp[i]/1500*1.1+.05):.1;
      const b=mk(new THREE.BoxGeometry(ws[c]-.06,h,ds[r]-.06),lam(on?cols[i]:tint(cols[i],.3)),20);b.position.set(xs[c]+ws[c]/2,h/2,zs[r]+ds[r]/2);blocks.add(b);A.drag(b,{tap:()=>reveal(i)});
      const t=label(on?[aT,aT,aO,aO][i]+' × '+[bT,bO,bT,bO][i]+' = '+pp[i]:'?',{size:on?.2:.3,bg:'#ffffff',border:cols[i]});t.position.set(xs[c]+ws[c]/2,h+.3,zs[r]+ds[r]/2);blocks.add(t);});
    [[bT,xs[0]+ws[0]/2],[bO,xs[1]+ws[1]/2]].forEach(([v,x])=>{const l=label(String(v),{size:.3,color:INK});l.position.set(x,.2,-3.25);blocks.add(l);});
    [[aT,zs[0]+ds[0]/2],[aO,zs[1]+ds[1]/2]].forEach(([v,z])=>{const l=label(String(v),{size:.3,color:INK});l.position.set(-2.15,.2,z);blocks.add(l);});A.redraw();}
  function reveal(i){const pp=parts(st.a,st.b);if(st.shown[i])return;st.shown[i]=true;A.pop();A.say(pp[i]===0?'0':String(pp[i]));draw();if(st.shown.every(x=>x))A.say('Now add: '+pp.join(' + '));}
  function setUp(a,b){st.a=a;st.b=b;st.shown=parts(a,b).map(v=>v===0);draw();}
  setUp(st.a,st.b);
  return {info:()=>st.a+' × '+st.b+'  (tap each block)',
    controls:()=>{const ans=st.a*st.b;const ready=st.shown.every(x=>x);
      if(ready)return choices(mode==='play'&&!st.setup?game:null,opts(ans,[10,-10,100,-100,20,-20]),ans,st.a+' × '+st.b+' = '+ans+'!').concat(mode==='learn'?[{t:'New problem',fn:()=>setUp(rnd(12,49),rnd(12,79))}]:[]);
      return [{t:'Reveal all',fn:()=>[0,1,2,3].forEach(reveal)}].concat(mode==='learn'?[{t:'New problem',go:true,fn:()=>setUp(rnd(12,49),rnd(12,79))}]:[]);},
    demo(n){if(n==='show'){setUp(23,47);return;}if(/^r\d$/.test(n)){reveal(+n[1]);return;}setUp(23,47);if(n==='parts')A.seq([[800,()=>reveal(0)],[1100,()=>reveal(1)],[1100,()=>reveal(2)],[1100,()=>reveal(3)],[1200,()=>A.say('800 + 140 + 120 + 21 = 1081')]]);
      if(n==='rows')A.seq([[800,()=>{reveal(2);reveal(3);A.say('3 × 47 = 120 + 21 = 141');}],[1800,()=>{reveal(0);reveal(1);A.say('20 × 47 = 800 + 140 = 940');}],[1800,()=>A.say('141 + 940 = 1081')]]);},
    task(r){st.setup=true;const a=r===0?rnd(11,19):rnd(21,49),b=r<2?rnd(21,59):rnd(31,89);setUp(a,b===a?b+1:b);st.setup=false;
      return r===4?'A theatre has *'+st.a+' rows* of *'+st.b+' seats*. How many seats? Tap each block.':'Find *'+st.a+' × '+st.b+'*. Tap each block, then choose the product.';}};}
});
function parts(a,b){const aT=Math.floor(a/10)*10,aO=a%10,bT=Math.floor(b/10)*10,bO=b%10;return [aT*bT,aT*bO,aO*bT,aO*bO];}

/* =========================================================
   12. Three-digit ÷ two-digit: area model
   ========================================================= */
P.lesson({id:'divide5',title:'Dividing by two-digit numbers',strand:'Number',codes:['B2.7'],
 guide:{goal:'Represent and solve problems that divide a three-digit number by a two-digit number with an area model and with the algorithm, and express any remainder in a way that fits the problem.',words:'divisor, dividend, quotient, remainder, area model, partial quotient',
  ask:['How does knowing 10 × 16 = 160 help with 384 ÷ 16?','What does the remainder mean if you are packing books into boxes?','How can multiplication check your answer?'],home:'Share 250 stickers among 12 friends. How many each, and how many left? Should the leftovers be shared, kept, or need another sheet?'},
 learn:[{say:'Build a rectangle with a known side.',speech:'Amani divides three hundred eighty-four by sixteen. Think of a rectangle with an area of three hundred eighty-four and a side of sixteen. How long is the other side? Watch us build it in friendly chunks.',view:'model',demo:'build'},
        {say:'Read about partial quotients.',speech:'Ten times sixteen is one hundred sixty. Take it away twice: three hundred twenty. Sixty-four is left, which is four times sixteen. Ten plus ten plus four is twenty-four.',view:'read'},
        {say:'Watch: a remainder.',speech:'Now two hundred fifty divided by twelve. After twenty groups, ten is left over. Ten is less than twelve, so ten is the remainder.',view:'model',demo:'rem'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: add chunks.',speech:'Your turn. Add chunks of ten, five or one groups until nothing more fits. Then choose the answer.',view:'model'}],
 fig:'An area model: chunks of the divisor fill the dividend.',rz:.35,
 explore:['Press *10 groups*, *5 groups* or *1 group* to add a chunk.','The *tower* shows how much is left to share.','When less than one group is left, choose the *answer*.'],
 howTo:'Add chunks of groups until less than one group is left. Then choose the quotient and remainder.',
 init:k=>({n:384,d:16,chunks:[]}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'To divide, find the *missing side* of a rectangle. Use friendly chunks: 10 groups, 5 groups, 1 group.')+20;
  const ox=X0+60,h=110,ws=[260,260,104],C=['#2f7de1','#16a36f','#e89a00'],lab=[['10 × 16','160'],['10 × 16','160'],['4 × 16','64']];let x=ox;T(g,'16',X0+20,y+h/2+12,ZS(38),INK,'center');
  ws.forEach((w,i)=>{rr(g,x+2,y,w-4,h,8);g.fillStyle=tint(C[i],.25);g.fill();g.lineWidth=3;g.strokeStyle=C[i];g.stroke();T(g,lab[i][0],x+w/2,y+44,FT.small,INK,'center');T(g,lab[i][1],x+w/2,y+86,ZS(32),INK,'center');T(g,i<2?'10':'4',x+w/2,y-10,FT.bodyB,C[i],'center');x+=w;});
  y+=h+44;T(g,'384 ÷ 16 = 10 + 10 + 4 = 24',X0,y,ZS(42),acc());y+=48;
  y=para(p,y,'*Remainders:* 250 ÷ 12 = 20 R10. Decide what the remainder means: *share it* (20 10/12), *drop it* (20 full boxes), or *round up* (21 boxes to hold everything).')+12;
  y=para(p,y,'*Check:* 16 × 24 = 384.')+8;
  y=keyWords(p,y,[['partial quotient','a chunk of the answer, like 10 groups'],['remainder','what is left when no full group fits']]);
  predict(p,y,S,'p12','175 students ride buses that hold 40 each. How many buses are needed?','*5 buses.* 175 ÷ 40 = 4 R15, and the 15 students still need a bus.');},
 readout(p,S,y){const g=p.g,st=S.st,used=st.chunks.reduce((a,b)=>a+b,0),left=st.n-used*st.d;
  T(g,st.n+' ÷ '+st.d+' = '+(st.chunks.length?st.chunks.join(' + '):'?')+(left<st.d?' = '+used+(left?' R'+left:''):''),X0,y+48,ZS(42),acc());T(g,'Left to share: '+left,X0,y+90,FT.bodyB);return y+100;},
 build(S,grp,mode,game){const st=S.st,Z0=-2.9,DZ=1.5,x0=-2.2,C=['#2f7de1','#16a36f','#e89a00','#e4572e','#8b5cf6','#0fa5a5'];const g2=new THREE.Group();grp.add(g2);let done=false;
  const used=()=>st.chunks.reduce((a,b)=>a+b,0),left=()=>st.n-used()*st.d;
  function draw(){clearGroup(g2);const q=Math.floor(st.n/st.d)+1,ux=3.3/Math.max(q,10);let x=x0;
    const outline=mk(new THREE.BoxGeometry(Math.min(3.3,ux*st.n/st.d),.02,DZ),lam('#eef2f8'),20);outline.position.set(x0+Math.min(3.3,ux*st.n/st.d)/2,.01,Z0+DZ/2);g2.add(outline);
    const dl=label(String(st.d),{size:.3});dl.position.set(x0-.14,.25,Z0+DZ/2);g2.add(dl);
    st.chunks.forEach((c,i)=>{const w=c*ux;const b=mk(new THREE.BoxGeometry(w-.04,.3,DZ-.04),lam(C[i%C.length]),20);b.position.set(x+w/2,.15,Z0+DZ/2);g2.add(b);
      const l=label(c+' × '+st.d,{size:.17,bg:'#ffffff',border:C[i%C.length]});l.position.set(x+w/2,.6,Z0+DZ/2+(i%2?.35:-.35));g2.add(l);const t=label(String(c),{size:.22,color:C[i%C.length]});t.position.set(x+w/2,.2,Z0-.22);g2.add(t);x+=w;});
    const lf=left(),h=Math.max(.02,lf/st.n*1.6);const tw=mk(new THREE.CylinderGeometry(.32,.32,h,28),lam('#ffcf3f'),30);tw.position.set(1.85,h/2,-.7);g2.add(tw);
    const tl=label('left: '+lf,{size:.24,bg:'#ffffff'});tl.position.set(1.85,h+.35,-.7);g2.add(tl);A.redraw();}
  function add(c){if(done)return;if(c*st.d>left()){A.bad(c+' × '+st.d+' = '+c*st.d+'. That is more than the '+left()+' left!');return;}st.chunks.push(c);A.pop();A.say(c+' × '+st.d+' = '+c*st.d+'. '+left()+' left.');draw();
    if(left()<st.d){done=true;A.good('Less than '+st.d+' left. Choose the answer!');A.redraw();}}
  function setUp(n,d){st.n=n;st.d=d;st.chunks=[];done=false;draw();}
  setUp(st.n,st.d);
  return {info:()=>st.n+' ÷ '+st.d+'   ·   left: '+left(),
    controls:()=>{const q=used(),r=left();if(done){const ans=q+(r?' R'+r:'');const o=shuffle([ans,(q+1)+(r?' R'+r:''),q+(r?' R'+(r+1<st.d?r+1:Math.max(0,r-1)):' R1')].filter((x,i,a)=>a.indexOf(x)===i));
        return o.map(x=>({t:x,big:true,fn:()=>{if(x===ans){const m=st.n+' ÷ '+st.d+' = '+ans+'. Check: '+st.d+' × '+q+(r?' + '+r:'')+' = '+st.n+'.';if(mode==='play'&&!st.setup)game.solved(m);else A.good(m);}else A.bad('Count the groups in your chunks, and what is left.');}})).concat(mode==='learn'?[{t:'New problem',fn:fresh}]:[]);}
      return [{t:'10 groups',big:true,go:true,fn:()=>add(10)},{t:'5 groups',big:true,fn:()=>add(5)},{t:'1 group',big:true,fn:()=>add(1)},{t:'Undo',fn:()=>{st.chunks.pop();done=false;draw();}}].concat(mode==='learn'?[{t:'New problem',fn:fresh}]:[]);},
    demo(n){if(n==='show'){setUp(384,16);return;}if(n==='a10'){add(10);return;}if(n==='a1'){add(1);return;}if(n==='a4'){add(1);add(1);add(1);add(1);return;}if(n==='build'){setUp(384,16);A.seq([[900,()=>add(10)],[1300,()=>add(10)],[1300,()=>add(1)],[900,()=>add(1)],[900,()=>add(1)],[900,()=>add(1)],[1000,()=>A.say('10 + 10 + 4 = 24. 384 ÷ 16 = 24')]]);}
      if(n==='rem'){setUp(250,12);A.seq([[900,()=>add(10)],[1300,()=>add(10)],[1300,()=>A.say('10 left, less than 12: 250 ÷ 12 = 20 R10')]]);}},
    task(r){st.setup=true;const d=[12,15,21,24,32][r]+rnd(0,3),q=rnd(11,29),rem=r%2?rnd(1,d-1):0;let n=d*q+rem;if(n>999)n=999;setUp(n,d);st.setup=false;
      return r===4?'*'+n+'* books go into boxes of *'+d+'*. How many full boxes, and how many books left?':'Divide *'+n+' ÷ '+d+'*. Add chunks, then choose the answer.';}};
  function fresh(){const d=rnd(11,25),q=rnd(11,30);setUp(Math.min(999,d*q+rnd(0,d-1)),d);}}
});

/* =========================================================
   13. Multiplying and dividing by unit fractions
   ========================================================= */
P.lesson({id:'unitfrac5',title:'Multiplying and dividing by unit fractions',strand:'Number',codes:['B2.8'],
 guide:{goal:'Multiply and divide one-digit whole numbers by unit fractions, using fraction pieces and drawings.',words:'unit fraction, multiply, divide, how many groups, whole',
  ask:['Why is 3 ÷ 1/4 bigger than 3?','What does 4 × 1/3 mean?','How many 1/2-cup scoops are in 5 cups?'],home:'Use a 1/4 cup to measure 2 cups of rice. How many scoops? Write it as 2 ÷ 1/4 = 8.'},
 learn:[{say:'× 1/4 means groups of a fourth.',speech:'Zane adds three times one fourth. That means three groups of one fourth. Watch three fourth-pieces line up. Three times one fourth is three fourths.',view:'model',demo:'mul'},
        {say:'Read about dividing by a unit fraction.',speech:'Three divided by one fourth asks: how many fourths fit in three wholes? Each whole has four fourths, so three wholes have twelve fourths.',view:'read'},
        {say:'Watch: cut the wholes.',speech:'Watch three whole bars get cut into fourths. Now count the pieces: twelve. So three divided by one fourth is twelve.',view:'model',demo:'div'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: build or cut.',speech:'Your turn. For times, add pieces. For divide, choose how to cut the wholes. Then choose the answer.',view:'model'}],
 fig:'Whole bars cut into unit fractions.',rz:.05,
 explore:['For *×*, press *Add a piece* until you have the right number of groups.','For *÷*, choose the *cut* that matches the unit fraction.','Then choose the *answer*.'],
 howTo:'Read the problem. Add pieces (for ×) or cut the wholes (for ÷), then choose the answer.',
 init:k=>({op:'×',w:3,d:4,k:0,cut:1}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'*Multiplying* a whole number by a unit fraction makes *groups* of that piece:')+14;
  for(let i=0;i<3;i++){rr(g,X0+i*130,y,124,56,8);g.fillStyle='#e4572e';g.fill();T(g,'1/4',X0+i*130+62,y+38,ZS(30),'#fff','center');}g.strokeStyle=INK;g.lineWidth=3;g.strokeRect(X0-4,y-6,524,68);
  T(g,'3 × 1/4 = 3/4',X0+560,y+40,ZS(36),acc());y+=96;
  y=para(p,y,'*Dividing* a whole number by a unit fraction asks *how many pieces fit*:')+14;
  for(let b=0;b<3;b++)for(let i=0;i<4;i++){rr(g,X0+b*184+i*44,y,40,56,6);g.fillStyle=['#2f7de1','#16a36f','#e89a00'][b];g.fill();}
  T(g,'3 ÷ 1/4 = 12',X0+580,y+40,ZS(36),acc());y+=90;
  y=para(p,y,'Each whole has *4 fourths*, so 3 wholes have *3 × 4 = 12* fourths. Dividing by a unit fraction gives a *bigger* number!')+12;
  y=keyWords(p,y,[['unit fraction','one equal piece, like 1/4'],['÷ 1/4','how many fourths fit']]);
  predict(p,y,S,'p13','How many 1/3-cup scoops are in 2 cups?','*6 scoops.* 2 ÷ 1/3 = 6, because each cup holds 3 thirds.');},
 readout(p,S,y){const g=p.g,st=S.st;const ans=st.op==='×'?st.w+'/'+st.d:String(st.w*st.d);T(g,st.w+' '+st.op+' 1/'+st.d+' = '+(st.ready&&st.shown?ans:'?'),X0,y+52,ZS(50),acc());
  T(g,st.op==='×'?st.w+' groups of 1/'+st.d:'How many 1/'+st.d+' pieces fit in '+st.w+' whole'+(st.w>1?'s':'')+'?',X0,y+94,FT.bodyB);return y+102;},
 build(S,grp,mode,game){const st=S.st;const g2=new THREE.Group();grp.add(g2);const C=['#2f7de1','#16a36f','#e89a00','#e4572e','#8b5cf6','#0fa5a5','#f08a24','#4f9aa0','#c2410c'];
  function draw(){clearGroup(g2);
    if(st.op==='×'){const L=3.6,x0=-1.8,Z=-1.7;const tr=mk(new THREE.BoxGeometry(L+.1,.04,.9),lam('#eef2f8'),20);tr.position.set(0,.02,Z);g2.add(tr);
      [0,1].forEach(k=>{const t=mk(new THREE.BoxGeometry(.03,.5,1),lam(INK),0);t.position.set(x0+k*L,.25,Z);g2.add(t);const l=label(String(k),{size:.3});l.position.set(x0+k*L,.75,Z);g2.add(l);});
      const w=L/st.d;for(let i=0;i<st.k;i++){const m=mk(new THREE.BoxGeometry(w-.03,.3,.66),lam('#e4572e'),20);m.position.set(x0+(i+.5)*w,.18,Z);g2.add(m);const l=label('1/'+st.d,{size:.16,color:'#fff'});l.position.set(x0+(i+.5)*w,.42,Z);g2.add(l);}
      st.ready=st.k===st.w;}
    else{const n=st.w,bw=Math.min(1.3,4.2/n-.12),gap=.12,tot=n*bw+(n-1)*gap,x0=-tot/2;let cnt=0;
      for(let b=0;b<n;b++){const pieces=st.cut;const pw=bw/pieces;for(let i=0;i<pieces;i++){const m=mk(new THREE.BoxGeometry(pw-(pieces>1?.03:0),.34,.9),lam(C[b%C.length]),20);m.position.set(x0+b*(bw+gap)+(i+.5)*pw,.17+(pieces>1?.03*(i%2):0),-1.8);g2.add(m);cnt++;
          if(pieces>1&&pieces<=8){const l=label(String(cnt),{size:.15,color:'#fff'});l.position.set(m.position.x,.45,-1.8);g2.add(l);}}
        const wl=label('1 whole',{size:.17,color:GREY});wl.position.set(x0+b*(bw+gap)+bw/2,.3,-1.05);g2.add(wl);}
      st.ready=st.cut===st.d;}
    A.redraw();}
  function addOne(){if(st.op!=='×')return;if(st.k>=st.w){A.bad('That is '+st.w+' groups already. Choose the answer!');return;}st.k++;A.pop();if(st.k===st.w)A.say('Now choose the answer.');draw();}
  function cut(c){if(st.op!=='÷')return;st.cut=c;A.pop();if(c===st.d){A.say('Each whole is cut into '+c+' pieces. Count them!');}draw();}
  function setUp(op,w,d){st.op=op;st.w=w;st.d=d;st.k=0;st.cut=1;st.shown=false;draw();}
  setUp(st.op,st.w,st.d);
  return {info:()=>st.w+' '+st.op+' 1/'+st.d,
    controls:()=>{const c=[];if(!st.ready){if(st.op==='×')c.push({t:'Add a piece',go:true,big:true,fn:addOne});else[2,3,4,5,6,8,10].forEach(d=>c.push({t:'Cut in '+d,on:st.cut===d,fn:()=>cut(d)}));}
      else{const ans=st.op==='×'?st.w+'/'+st.d:String(st.w*st.d);const o=shuffle(st.op==='×'?[ans,st.w+'/'+(st.d*st.w),String(st.w*st.d)]:[ans,st.w+'/'+st.d,String(st.w+st.d)]).filter((x,i,a)=>a.indexOf(x)===i);
        o.forEach(x=>c.push({t:x,big:true,fn:()=>{if(x===ans){st.shown=true;A.redraw();const m=st.w+' '+st.op+' 1/'+st.d+' = '+ans;if(mode==='play'&&!st.setup)game.solved(m+'!');else A.good(m);}else A.bad(st.op==='×'?'Count the pieces: each one is 1/'+st.d+'.':'Count all the pieces in all the wholes.');}}));}
      if(mode==='learn')c.push({t:'New ×',fn:()=>setUp('×',rnd(2,7),pick([3,4,5,6,8,10]))},{t:'New ÷',fn:()=>setUp('÷',rnd(2,5),pick([2,3,4,5]))});return c;},
    demo(n){if(n==='m0'){setUp('×',3,4);return;}if(n==='add1'){addOne();return;}if(n==='d0'){setUp('÷',3,4);return;}if(n==='cut4'){cut(4);return;}if(n==='mul'){setUp('×',3,4);A.seq([[800,addOne],[700,addOne],[700,addOne],[900,()=>{st.shown=true;A.redraw();A.say('3 × 1/4 = 3/4');}]]);}
      if(n==='div'){setUp('÷',3,4);A.seq([[900,()=>cut(4)],[1500,()=>{st.shown=true;A.redraw();A.say('12 fourths: 3 ÷ 1/4 = 12');}]]);}},
    task(r){st.setup=true;if(r===0)setUp('×',rnd(2,5),pick([6,8,10]));else if(r===1)setUp('÷',rnd(2,4),pick([2,3,4]));else if(r===2)setUp('×',rnd(5,9),pick([3,4,5]));else if(r===3)setUp('÷',rnd(3,5),pick([2,5]));else setUp('÷',rnd(2,3),3);st.setup=false;
      return r===4?'How many *1/3-cup* scoops are in *'+st.w+' cups*? Cut, then count.':st.op==='×'?'Show *'+st.w+' × 1/'+st.d+'*.':'Find *'+st.w+' ÷ 1/'+st.d+'*. How many pieces fit?';}};}
});

/* =========================================================
   14. Equivalent ratios and rates
   ========================================================= */
P.lesson({id:'ratio5',title:'Equivalent ratios and rates',strand:'Number',codes:['B2.9'],
 guide:{goal:'Represent and create equivalent ratios and rates using models, tables and drawings, in everyday contexts.',words:'ratio, rate, equivalent, batch, for every, table of values',
  ask:['Why does 4 : 6 make the same colour as 2 : 3?','If 2 red make 3 white, how much white goes with 8 red?','How is a ratio like a recipe?'],home:'Mix juice or lemonade with a recipe: 1 scoop for every 3 cups of water. Double it, triple it, and write the ratios.'},
 learn:[{say:'A ratio compares amounts.',speech:'Layla’s orange paint recipe uses two cups of red for every three cups of white. The ratio is two to three. Watch: two batches make four to six. Three batches make six to nine. Same orange every time!',view:'model',demo:'grow'},
        {say:'Read the ratio table.',speech:'In a ratio table, multiply both parts by the same number. Two to three, four to six, six to nine, and eight to twelve are all equivalent ratios.',view:'read'},
        {say:'Watch: a rate.',speech:'A rate compares two different kinds of things, like three dollars for two muffins. Six dollars buys four muffins, and nine dollars buys six muffins.',view:'model',demo:'rate'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: add batches.',speech:'Your turn. Add or remove batches and watch both amounts grow together. The colour stays the same.',view:'model'}],
 fig:'Batches of red and white paint cups. Each batch keeps the same ratio.',rz:.3,
 explore:['*Add* or *remove* a batch.','Both amounts grow *together*: that keeps the ratio equivalent.','Press *New recipe* for a different ratio.'],
 howTo:'Read the recipe and the goal. Add batches until the amounts match.',
 init:k=>({a:2,b:3,n:1,kind:'paint',target:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'A *ratio* compares amounts: *2 red for every 3 white*, written *2 : 3*. Multiply *both* parts by the same number to make *equivalent ratios*.')+18;
  const cw=120;rr(g,X0,y,cw*4+170,120,14);g.fillStyle=tint(acc(),.08);g.fill();T(g,'red',X0+20,y+48,FT.smallB,'#e0453a');T(g,'white',X0+20,y+98,FT.smallB,GREY);
  for(let i=1;i<=4;i++){T(g,String(2*i),X0+150+(i-.5)*cw,y+48,ZS(38),'#e0453a','center');T(g,String(3*i),X0+150+(i-.5)*cw,y+98,ZS(38),INK,'center');}
  T(g,'× 2',X0+150+1.5*cw,y+150,FT.hand,BLUE,'center');T(g,'× 3',X0+150+2.5*cw,y+150,FT.hand,BLUE,'center');
  for(let i=1;i<=4;i++){g.beginPath();g.arc(X0+150+(i-.5)*cw,y+200,22,0,Math.PI*2);g.fillStyle='#f7b27a';g.fill();}T(g,'same orange!',X0+620,y+208,FT.hand,'#e4572e');y+=246;
  y=para(p,y,'A *rate* compares different things: *$3 for 2 muffins*. Equivalent rates: $6 for 4, $9 for 6.')+12;
  y=keyWords(p,y,[['ratio','a comparison of two amounts, like 2 : 3'],['equivalent ratios','ratios that show the same relationship']]);
  predict(p,y,S,'p14','A recipe uses 1 cup of rice for every 2 cups of water. How much water for 4 cups of rice?','*8 cups.* 1 : 2 = 4 : 8.');},
 readout(p,S,y){const g=p.g,st=S.st,K=KINDS[st.kind];T(g,st.a+' : '+st.b+'  =  '+st.a*st.n+' : '+st.b*st.n,X0,y+52,ZS(52),acc());
  T(g,st.n+' batch'+(st.n===1?'':'es')+': '+st.a*st.n+' '+K.a+', '+st.b*st.n+' '+K.b,X0,y+94,FT.bodyB);return y+102;},
 build(S,grp,mode,game){const st=S.st;const g2=new THREE.Group();grp.add(g2);const lab=label('',{size:.34,bg:'#ffffff'});lab.position.set(0,1.75,-2.0);grp.add(lab);
  function cup(col,money){if(money){const m=mk(G('coin5',()=>new THREE.CylinderGeometry(.11,.11,.05,20)),lam('#f2c14e'),0);return m;}const m=mk(G('cup5',()=>new THREE.CylinderGeometry(.1,.08,.2,16)),lam(col),0);return m;}
  function draw(){clearGroup(g2);const K=KINDS[st.kind];const bw=4.4/6;
    for(let i=0;i<st.n;i++){const x=-2.2+(i+.5)*bw;const tray=mk(G('tray5',()=>new THREE.BoxGeometry(.62,.03,2.7)),lam(i%2?'#fde3ec':'#fbeef3'),20);tray.position.set(x,.015,-1.5);g2.add(tray);
      for(let k=0;k<st.a;k++){const c=K.a==='dollars'?cup(0,true):cup(K.ca,false);c.position.set(x+((k%2)-.5)*.24,K.a==='dollars'?.04+Math.floor(k/2)*0:.11,-2.7+Math.floor(k/2)*.27);g2.add(c);}
      for(let k=0;k<st.b;k++){const c=K.b==='muffins'?mk(G('muf5',()=>new THREE.SphereGeometry(.11,14,10)),lam('#b8793b'),0):cup(K.cb,false);c.position.set(x+((k%2)-.5)*.24,.11,-1.45+Math.floor(k/2)*.27);g2.add(c);}
      const t=label(String(i+1),{size:.2,color:GREY});t.position.set(x,.25,-.05);g2.add(t);A.drag(tray,{tap:()=>setN(st.n-1)});}
    const mix=st.kind==='paint'?mk(new THREE.SphereGeometry(.22,20,14),lam('#f7b27a'),0):null;if(mix){mix.position.set(1.95,.25,-.1);g2.add(mix);}
    lab.userData.set(st.a*st.n+' '+K.a+' : '+st.b*st.n+' '+K.b);check();A.redraw();}
  function setN(n){n=Math.max(1,Math.min(6,n));if(n===st.n)return;st.n=n;A.pop();draw();}
  function check(){if(mode==='play'&&!st.setup&&st.target&&st.target(st.n))game.solved(st.a+' : '+st.b+' = '+st.a*st.n+' : '+st.b*st.n+'!');}
  draw();
  return {info:()=>st.a*st.n+' : '+st.b*st.n,
    controls:()=>[{t:'− batch',fn:()=>setN(st.n-1)},{t:'+ batch',go:true,big:true,fn:()=>setN(st.n+1)}].concat(mode==='learn'?[{t:'New recipe',fn:()=>{st.kind='paint';st.a=rnd(1,4);st.b=rnd(1,4);if(st.a===st.b)st.b++;st.n=1;draw();}}]:[]),
    demo(n){if(n==='show'){st.kind='paint';st.a=2;st.b=3;st.n=1;draw();return;}if(/^n\d$/.test(n)){setN(+n[1]);return;}if(n==='grow'){st.kind='paint';st.a=2;st.b=3;st.n=1;draw();A.seq([[900,()=>setN(2)],[1000,()=>setN(3)],[1000,()=>setN(4)],[900,()=>A.say('2 : 3 = 4 : 6 = 6 : 9 = 8 : 12')]]);}
      if(n==='rate'){st.kind='muffin';st.a=3;st.b=2;st.n=1;draw();A.seq([[900,()=>setN(2)],[1000,()=>setN(3)],[900,()=>A.say('$3 for 2 = $6 for 4 = $9 for 6')]]);}},
    task(r){st.setup=true;st.n=1;let txt;
      if(r===3){st.kind='muffin';st.a=3;st.b=2;const k=rnd(3,6);st.target=n=>n===k;txt='Muffins cost *$3 for 2*. Show how many muffins *$'+3*k+'* buys.';}
      else{st.kind='paint';st.a=rnd(1,4);st.b=rnd(1,5);if(st.a===st.b)st.b++;const k=rnd(2,6);
        if(r===0){st.target=n=>n===k;txt='Recipe *'+st.a+' red : '+st.b+' white*. Make *'+st.a*k+' : '+st.b*k+'*.';}
        else if(r===1){st.target=n=>n===k;txt='Recipe *'+st.a+' : '+st.b+'*. How much white goes with *'+st.a*k+' red*? Make it.';}
        else if(r===2){st.target=n=>n===k;txt='Recipe *'+st.a+' : '+st.b+'*. Use *'+st.b*k+' cups of white*. Make it.';}
        else{st.target=n=>n>=2;txt='Make any ratio *equivalent to '+st.a+' : '+st.b+'* (2 or more batches).';}}
      draw();st.setup=false;return txt;}};}
});
const KINDS={paint:{a:'red',b:'white',ca:'#e0453a',cb:'#ffffff'},muffin:{a:'dollars',b:'muffins',ca:'#f2c14e',cb:'#b8793b'}};
})();
