/* The Interactive Classroom: Grade 4 Math — Number, part B (lessons 7–12) */
(function(){
"use strict";
const P=window.PM;if(!P||P.failed||!P.THREE)return;
const {THREE,V,W,D,PY,PX,X0,TW,INK,RED,BLUE,GREY,VIBE,FT,ZS,G,M,lam,mk,unitBox,cellMat,label,starGeo,wedgeGeo,clearGroup,disposeObj,rr,T,wrap,para,header,keyWords,predict,box,caption,cxOf,cyOf,tint,moveTo,hop,tween,burst,easeOut,easeIO,A}=P;
const acc=()=>P.ACC;
const rnd=(a,b)=>a+Math.floor(Math.random()*(b-a+1)),pick=a=>a[Math.floor(Math.random()*a.length)],shuffle=a=>a.slice().sort(()=>Math.random()-.5);
const fmt=n=>{const neg=n<0;let s=String(Math.abs(n));let [i,f]=s.split('.');if(i.length>=5)i=i.replace(/\B(?=(\d{3})+(?!\d))/g,' ');return (neg?'−':'')+i+(f!=null?'.'+f:'');};
const r1=x=>Math.round(x*10)/10;
function choices(game,list,ans,ok,lab){return list.map(o=>({t:lab?lab(o):String(o),big:true,fn:()=>{if(o===ans)game.solved(ok);else A.bad('Not quite. Try again!');}}));}
function opts(ans,spread){const s=new Set([ans]);let k=0;while(s.size<3&&k<40){k++;const d=pick(spread);const v=ans+d;if(v>0)s.add(v);}return shuffle([...s]);}
/* a cube with a digit printed on top and front */
function digitMat(t,bg,fg){return M('dig'+t+bg,()=>{const c=document.createElement('canvas');c.width=c.height=128;const g=c.getContext('2d');g.fillStyle=bg;g.fillRect(0,0,128,128);
  g.strokeStyle='rgba(27,34,54,.25)';g.lineWidth=6;g.strokeRect(3,3,122,122);g.fillStyle=fg||'#1b2236';g.font='700 84px "Zilla Slab", Georgia, serif';g.textAlign='center';g.textBaseline='middle';g.fillText(t,64,70);
  const tx=new THREE.CanvasTexture(c);tx.anisotropy=4;return new THREE.MeshLambertMaterial({map:tx});});}
function digitCube(t,bg,s,fg){const geo=G('dcube'+s,()=>new THREE.BoxGeometry(s,s,s));const side=lam(bg),m=digitMat(t,bg,fg);return mk(geo,[side,side,m,side,m,side],20);}

/* =========================================================
   7. Multiplying by 10, 100 and 1000; dividing by 10
   ========================================================= */
const PL=['Ten thousands','Thousands','Hundreds','Tens','Ones','Tenths'],PLC=['#8b5cf6','#16a36f','#2f7de1','#e4572e','#e89a00','#0fa5a5'];
P.lesson({id:'times10',title:'Multiplying by 10, 100 and 1000',strand:'Number',codes:['B2.3'],
 guide:{goal:'Use mental math to multiply whole numbers by 10, 100 and 1000 and divide whole numbers by 10, by seeing how digits shift on a place-value chart.',words:'place-value chart, shift, multiply, divide, mental math, tenths',
  ask:['What happens to each digit when you multiply by 10?','Why is it wrong to say “just add a zero” for 4.5 × 10?','What is 360 ÷ 10? How did the digits move?'],home:'Price check: if 1 pack costs $3, what do 10, 100 or 1000 packs cost? Say the answers without paper.'},
 learn:[{say:'×10 moves every digit one place left.',speech:'When you multiply by ten, every digit moves one place to the left, and each one is worth ten times as much. Watch Ravi’s thirty-four become three hundred forty.',view:'model',demo:'x10'},
        {say:'Read the place-value shifts.',speech:'Times ten moves the digits one place left. Times one hundred moves them two places. Times one thousand moves them three places. Divide by ten moves them one place right.',view:'read'},
        {say:'Watch: dividing by 10.',speech:'Now divide forty-five by ten. The digits move one place to the right. The five lands in the tenths place: four point five.',view:'model',demo:'d10'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: slide the digits.',speech:'Your turn. Press times ten, times one hundred, times one thousand, or divide by ten, and watch the digit cubes slide.',view:'model'}],
 fig:'Digit cubes on a place-value chart from ten thousands to tenths.',rz:.1,
 explore:['Press *×10*, *×100*, *×1000* or *÷10*.','Watch the digits *slide* to new places.','Empty places fill with *0*.'],
 tries:[['What is 27 × 100?','*2700.* Each digit moves two places left.'],['What is 650 ÷ 10?','*65.* Each digit moves one place right.'],['What is 8 × 1000?','*8000.*']],
 howTo:'Read the start number and the target. Press the right operation so the digits slide to make the target.',
 init:k=>({v:34,start:34,target:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'Each place is worth *10 times* the place to its right. So multiplying by 10 makes every digit *move one place left*.')+18;
  const cw=TW/6;['Th','H','T','O','.','t'].forEach((h,i)=>{if(h==='.'){T(g,'.',X0+i*cw+cw/2,y+150,ZS(80),INK,'center');return;}rr(g,X0+i*cw+6,y,cw-12,44,10);g.fillStyle=tint(PLC[i+1>4?5:i+1],.18);g.fill();T(g,h,X0+i*cw+cw/2,y+32,FT.smallB,PLC[i+1>4?5:i+1],'center');});
  const row=(dig,yy,lab,col)=>{dig.forEach((d,i)=>{if(d==null)return;rr(g,X0+i*cw+16,yy,cw-32,64,10);g.fillStyle=col;g.fill();T(g,d,X0+i*cw+cw/2,yy+50,ZS(46),'#fff','center');});T(g,lab,X0+TW,yy+44,FT.bodyB,INK,'right');};
  row([null,null,'3','4',null,null],y+60,'34',BLUE);row([null,'3','4','0',null,null],y+136,'× 10 = 340','#e4572e');
  g.strokeStyle='#e4572e';g.lineWidth=4;[2,3].forEach(i=>{const x=X0+i*cw+cw/2;g.beginPath();g.moveTo(x,y+126);g.lineTo(x-cw+20,y+136);g.stroke();});y+=232;
  [['× 10','1 place left'],['× 100','2 places left'],['× 1000','3 places left'],['÷ 10','1 place right']].forEach(([a,b],i)=>{const x=X0+(i%2)*TW/2,yy=y+Math.floor(i/2)*54;rr(g,x,yy,TW/2-12,46,14);g.fillStyle=tint(acc(),.1);g.fill();T(g,a,x+20,yy+33,FT.bodyB,acc());T(g,b,x+150,yy+33,FT.body);});y+=128;
  y=keyWords(p,y,[['shift','move each digit to a new place'],['tenths','the place right of the decimal point']]);
  predict(p,y,S,'p7','What is 52 × 1000?','*52 000.* Each digit moves three places left, and three zeros fill the empty places.');},
 readout(p,S,y){const g=p.g,st=S.st;T(g,fmt(st.v),X0,y+56,ZS(62),acc());if(st.target!=null)T(g,'Target: '+fmt(st.target),X0+330,y+48,FT.bodyB);
  T(g,'Started at '+fmt(st.start),X0,y+94,FT.small,GREY);return y+100;},
 build(S,grp,mode,game){const st=S.st,cw=.72,Z=-1.55,x0=-2.16,s=.46;
  for(let i=0;i<6;i++){const m=mk(new THREE.BoxGeometry(cw-.06,.03,1.5),lam(['#ede6ff','#d7f1e5','#d7e6fb','#fbdde6','#fff0c4','#d4f4f4'][i]),20);m.position.set(x0+(i+.5)*cw,.015,Z);grp.add(m);
    const l=label(['10 000s','1000s','100s','10s','1s','tenths'][i],{size:.17,color:PLC[i]});l.position.set(x0+(i+.5)*cw,.25,Z-.95);grp.add(l);}
  const dot=mk(new THREE.SphereGeometry(.07,12,10),lam(INK),0);dot.position.set(x0+5*cw,.12,Z+.45);grp.add(dot);
  const cubes=new THREE.Group();grp.add(cubes);let anim=false;
  function digits(v){const t=Math.round(v*10);const out=[];let s2=String(t).padStart(6,'0');for(let i=0;i<6;i++)out.push(+s2[i]);return out;}
  function lead(v){const ds=digits(v);let first=ds.findIndex(d=>d>0);if(first<0)first=4;return ds.map((d,i)=>i>=Math.min(first,4)||i===5&&d>0?d:null).map((d,i)=>i===5&&d===0?null:d);}
  function render(){clearGroup(cubes);lead(st.v).forEach((d,i)=>{if(d==null)return;const c=digitCube(String(d),PLC[i],s);c.position.set(x0+(i+.5)*cw,s/2+.03,Z);c.userData.i=i;cubes.add(c);});A.redraw();}
  function apply(f,name,shift){if(anim)return;const nv=r1(st.v*f);if(nv>=100000){A.bad('Too big for the chart.');return;}if(Math.round(nv*10)!==nv*10||nv<.1&&nv>0){A.bad('That would need hundredths.');return;}
    if(Math.abs(nv*10-Math.round(nv*10))>1e-6){A.bad('That would need hundredths.');return;}anim=true;A.pop();
    cubes.children.forEach(c=>{moveTo(c,{pos:V(c.position.x-shift*cw,s/2+.03+.25,Z),k:5});});
    A.later(()=>{st.v=nv;render();anim=false;A.say(name+' = '+fmt(nv));check();},900);}
  function check(){if(mode==='play'&&st.target!=null&&Math.abs(st.v-st.target)<1e-9)game.solved('Yes! '+fmt(st.start)+' became '+fmt(st.target)+'.');}
  render();
  return {info:()=>'Value: '+fmt(st.v),
    controls:()=>[{t:'× 10',big:true,fn:()=>apply(10,'× 10',1)},{t:'× 100',big:true,fn:()=>apply(100,'× 100',2)},{t:'× 1000',big:true,fn:()=>apply(1000,'× 1000',3)},{t:'÷ 10',big:true,go:true,fn:()=>apply(.1,'÷ 10',-1)},
      {t:'Start over',fn:()=>{st.v=st.start;render();}}].concat(mode==='learn'?[{t:'New number',fn:()=>{st.v=st.start=rnd(2,99);render();}}]:[]),
    demo(n){if(n==='x10'){st.v=st.start=34;render();A.seq([[900,()=>apply(10,'34 × 10',1)]]);}if(n==='d10'){st.v=st.start=45;render();A.seq([[900,()=>apply(.1,'45 ÷ 10',-1)]]);}},
    task(r){let a,t,txt;if(r===0){a=rnd(12,98);t=a*10;txt='Make *'+fmt(t)+'* from *'+a+'*.';}else if(r===1){a=rnd(3,95);t=a*100;txt='Multiply *'+a+' × 100*.';}
      else if(r===2){a=rnd(2,9);t=a*1000;txt='What is *'+a+' × 1000*? Make it.';}else if(r===3){a=rnd(2,9)*10*rnd(1,9);a=a>990?560:a;t=a/10;txt='Divide *'+fmt(a)+' ÷ 10*.';}
      else{a=rnd(11,99);if(a%10===0)a++;t=a/10;txt='Make *'+t.toFixed(1)+'* from *'+a+'*.';}
      st.v=st.start=a;st.target=t;render();return txt;}};}
});

/* =========================================================
   8. Adding and subtracting to 10 000 and tenths
   ========================================================= */
P.lesson({id:'addsub4',title:'Adding and subtracting to 10 000',strand:'Number',codes:['B2.4'],
 guide:{goal:'Represent and solve addition and subtraction problems with whole numbers up to 10 000 and with decimal tenths, using the standard algorithm with regrouping, and check answers by estimating.',words:'algorithm, column, regroup, carry, borrow, decimal point, estimate',
  ask:['Why do we line up the decimal points?','What does the little 1 above a column mean?','How can rounding help you check 4985 + 2017?'],home:'Plan a road trip on a map: add the kilometres between towns, then subtract to see how far is left.'},
 learn:[{say:'Add column by column, from the right.',speech:'Line up the places, just like Isla. Start with the ones. Eight plus seven is fifteen: write five, and carry one ten to the next column. Watch the model.',view:'model',demo:'add'},
        {say:'Read about regrouping.',speech:'When a column adds to ten or more, regroup ten into one of the next place. When subtracting, if the top digit is too small, regroup one from the next place into ten.',view:'read'},
        {say:'Watch: subtracting with regrouping.',speech:'Now subtract. Two minus six does not work, so we regroup one ten into ten ones. Twelve minus six is six.',view:'model',demo:'sub'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: solve each column.',speech:'Your turn. For each column, choose the digit that goes in the answer. The model carries and regroups for you.',view:'model'}],
 fig:'A column board: the digits carry and regroup as you solve.',rz:.35,
 explore:['Choose the *answer digit* for the glowing column.','Carries and regroups *fly* to the next column.','Press *Show me* to watch a whole problem solved.'],
 tries:[['3468 + 2754 = ?','*6222.* 8+4=12 (carry 1), 6+5+1=12 (carry 1), 4+7+1=12 (carry 1), 3+2+1=6.'],['5003 − 1248 = ?','*3755.* Regroup across the zeros.'],['36.4 + 12.9 = ?','*49.3.* Line up the decimal points. 4 + 9 = 13 tenths = 1 whole and 3 tenths.']],
 howTo:'Work from right to left. Choose the digit for the glowing answer box. A wrong digit wiggles; the right one drops in.',
 init:k=>({a:4378,b:2517,op:'+',dec:0,col:-1,ans:[],learn:k!=='play'}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'Line up the *places* (and the decimal points). Work from *right to left*, one column at a time.')+16;
  const cw=74,x1=X0+150;const rowS=(t,yy,col)=>{[...t].forEach((d,i)=>T(g,d,x1+i*cw,yy,ZS(54),col||INK,'center'));};
  T(g,'1',x1+cw*3,y+20,FT.smallB,RED,'center');T(g,'1',x1+cw*2,y+20,FT.smallB,RED,'center');rowS(' 2468',y+80);rowS('+1357',y+146);g.fillStyle=INK;g.fillRect(x1-40,y+166,cw*5,5);rowS(' 3825',y+226,'#16a36f');
  wrap(g,'8 + 7 = 15: write *5*, carry *1 ten*. Then 6 + 5 + 1 = 12: write *2*, carry *1 hundred*.',X0+520,y+60,TW-520,34,{font:FT.small,bold:FT.smallB});y+=290;
  y=para(p,y,'Subtracting: if the top digit is too small, *regroup*: trade 1 from the next place for 10. *Estimate* first to check: 2468 + 1357 is about 2500 + 1400 = *3900*.')+12;
  y=keyWords(p,y,[['algorithm','a step-by-step method that always works'],['regroup','trade 10 of a place for 1 of the next, or 1 for 10']]);
  predict(p,y,S,'p8','Estimate 4985 + 2017 to the nearest thousand.','*About 7000.* 4985 is about 5000 and 2017 is about 2000.');},
 readout(p,S,y){const g=p.g,st=S.st,f=v=>st.dec?(v/10).toFixed(1):fmt(v);T(g,f(st.a)+' '+(st.op==='+'?'+':'−')+' '+f(st.b)+' = '+(st.col<0?'?':(st.col>=st.n?f(st.op==='+'?st.a+st.b:st.a-st.b):'…')),X0,y+50,ZS(48),acc());
  T(g,st.col>=0&&st.col<st.n?'Solve the '+(st.labels[st.col])+' column.':'Choose a problem or press Show me.',X0,y+90,FT.bodyB);return y+100;},
 build(S,grp,mode,game){const st=S.st,cw=.62,s=.42,Z0=-2.75,rowZ=[0,.62,1.42],xR=1.75;
  const board=mk(new THREE.BoxGeometry(4.3,.03,2.55),lam('#f3f6fb'),20);board.position.set(-.05,.015,Z0+.85);grp.add(board);const bar=mk(new THREE.BoxGeometry(3.6,.04,.06),lam(INK),0);bar.position.set(.1,.04,Z0+1.03);grp.add(bar);
  const opL=label('+',{size:.5});opL.position.set(xR-5.3*cw,.3,Z0+rowZ[1]);grp.add(opL);
  const cubes=new THREE.Group();grp.add(cubes);const glow=mk(new THREE.BoxGeometry(s+.12,.04,s+.12),lam('#ffd24a'),0);grp.add(glow);
  const dp=mk(new THREE.SphereGeometry(.06,12,10),lam(INK),0);grp.add(dp);let A1,B1,R,carry,busy=false;
  function setup(a,b,op,dec){st.a=a;st.b=b;st.op=op;st.dec=dec;st.n=Math.max(String(a).length,String(b).length,String(op==='+'?a+b:a-b).length);if(dec&&st.n<2)st.n=2;
    st.labels=Array.from({length:st.n},(_,i)=>dec?['tenths','ones','tens','hundreds','thousands'][i]:['ones','tens','hundreds','thousands','ten thousands'][i]);
    A1=String(a).split('').reverse().map(Number);B1=String(b).split('').reverse().map(Number);R=[];carry=0;st.col=0;st.work=A1.slice();opL.userData.set(op==='+'?'+':'−');draw();}
  const xOf=i=>xR-i*cw;
  function draw(){clearGroup(cubes);const n=st.n;
    for(let i=0;i<n;i++){const ta=st.work[i],tb=B1[i];if(i<String(st.a).length){const c=digitCube(String(ta),'#d7e6fb',s);c.position.set(xOf(i),s/2+.03,Z0+rowZ[0]);cubes.add(c);}
      if(i<String(st.b).length){const c=digitCube(String(tb),'#fbdde6',s);c.position.set(xOf(i),s/2+.03,Z0+rowZ[1]);cubes.add(c);}
      if(R[i]!=null){const c=digitCube(String(R[i]),'#c9f0dd',s);c.position.set(xOf(i),s/2+.03,Z0+rowZ[2]);cubes.add(c);}}
    if(st.carryTo!=null&&st.op==='+'){const c=digitCube('1','#ffcf3f',s*.55);c.position.set(xOf(st.carryTo),s+.3,Z0+rowZ[0]-.05);cubes.add(c);}
    glow.visible=st.col>=0&&st.col<st.n;if(glow.visible)glow.position.set(xOf(st.col),.03,Z0+rowZ[2]);dp.visible=!!st.dec;dp.position.set(xR-.5*cw,.12,Z0+rowZ[2]+.2);A.redraw();}
  function colAnswer(){const i=st.col;if(st.op==='+'){const v=(A1[i]||0)+(B1[i]||0)+carry;return {d:v%10,carry:v>=10?1:0};}
    let top=st.work[i]||0;const bot=B1[i]||0;if(top<bot){return {borrow:true};}return {d:top-bot};}
  function doBorrow(){const i=st.col;let j=i+1;while((st.work[j]||0)===0&&j<st.n)j++;for(let k=j;k>i;k--){st.work[k]=(st.work[k]||0)-1;st.work[k-1]=(st.work[k-1]||0)+10;if(k-1>i)st.work[k-1]-=0;}
    A.say('Regroup: 1 '+st.labels[i+1]+' becomes 10 '+st.labels[i]+'.');A.pop();draw();}
  function answer(d){if(busy||st.col<0||st.col>=st.n)return;const a=colAnswer();
    if(a.borrow){A.bad('The top digit is too small. Press Regroup first!');return;}
    if(d!==a.d){A.bad('Not quite. Check the '+st.labels[st.col]+' column again.');return;}
    R[st.col]=d;if(st.op==='+'){carry=a.carry;st.carryTo=a.carry?st.col+1:null;}st.col++;A.pop();
    const last=st.col>=st.n||(st.col>=String(st.op==='+'?st.a+st.b:st.a-st.b).length&&!carry);if(last){st.col=st.n;st.carryTo=null;draw();
      const f=v=>st.dec?(v/10).toFixed(1):fmt(v);const res=st.op==='+'?st.a+st.b:st.a-st.b;A.good(f(st.a)+(st.op==='+'?' + ':' − ')+f(st.b)+' = '+f(res));if(mode==='play')game.solved('Correct: '+f(res)+'!');return;}
    if(a.carry)A.say('Carry 1 to the '+st.labels[st.col]+'.');draw();}
  function showMe(){if(busy)return;busy=true;const steps=[];const runStep=()=>{if(st.col>=st.n){busy=false;return;}const a=colAnswer();if(a.borrow){doBorrow();A.later(runStep,1100);return;}busy=false;answer(a.d);busy=true;A.later(runStep,1100);};A.later(runStep,400);}
  setup(st.a,st.b,st.op,st.dec);
  return {info:()=>st.col<st.n?'Answer digit for the '+st.labels[st.col]+' column':'Solved!',
    controls:()=>{const c=[];if(st.col<st.n){const a=colAnswer();if(a.borrow)c.push({t:'Regroup',go:true,big:true,fn:doBorrow});else for(let d=0;d<=9;d++)c.push({t:String(d),big:true,fn:()=>answer(d)});}
      if(mode==='learn')c.push({t:'Show me',fn:showMe},{t:'New + problem',fn:()=>setup(rnd(1200,4800),rnd(1100,4800),'+',0)},{t:'New − problem',fn:()=>{const a=rnd(4000,9000);setup(a,rnd(1100,a-500),'−',0);}});return c;},
    demo(n){if(n==='add')setup(2468,1357,'+',0);if(n==='sub')setup(842,367,'−',0);A.seq([[700,showMe]]);},
    task(r){busy=false;if(r===0)setup(rnd(1200,4800),rnd(1200,4800),'+',0);else if(r===1){const a=rnd(5000,9500);setup(a,rnd(1200,a-800),'−',0);}
      else if(r===2)setup(rnd(150,480),rnd(150,480),'+',1);else if(r===3){const a=rnd(400,900);setup(a,rnd(120,a-60),'−',1);}else setup(rnd(2000,5999),rnd(2000,3999),'+',0);
      const f=v=>st.dec?(v/10).toFixed(1):fmt(v);return 'Solve *'+f(st.a)+(st.op==='+'?' + ':' − ')+f(st.b)+'*, one column at a time.';}};}
});

/* =========================================================
   9. Multiplying by a one-digit number (area model)
   ========================================================= */
P.lesson({id:'multiply4',title:'Multiplying bigger numbers',strand:'Number',codes:['B2.5'],
 guide:{goal:'Represent and solve problems that multiply two- and three-digit numbers by one-digit numbers using an area model (partial products), and multiply by 10, 100 and 1000.',words:'area model, partial product, expanded form, factor, product, estimate',
  ask:['How does splitting 236 into 200 + 30 + 6 make 4 × 236 easier?','What are the three partial products for 3 × 152?','Estimate 6 × 398 before you calculate.'],home:'A box holds 125 crackers. How many are in 4 boxes? Split 125 into 100 + 20 + 5 to find out.'},
 learn:[{say:'Split the big number into places.',speech:'Kofi needs four times two hundred thirty-six. Split two hundred thirty-six into two hundred, thirty, and six. Watch each part of the area model fill in.',view:'model',demo:'parts'},
        {say:'Read about partial products.',speech:'Multiply each part: four times two hundred is eight hundred, four times thirty is one hundred twenty, four times six is twenty-four. Add the partial products.',view:'read'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: reveal and add.',speech:'Your turn. Tap each part of the model to see its product, then choose the total.',view:'model'}],
 fig:'An area model: each block is one partial product.',rz:.3,
 explore:['*Tap a block* to see its partial product.','Change the numbers with the buttons.','The three products add up to the total.'],
 tries:[['3 × 142 = ?','*426.* 300 + 120 + 6.'],['5 × 68 = ?','*340.* 5 × 60 = 300, 5 × 8 = 40.'],['Estimate 7 × 298.','*About 2100.* 298 is about 300, and 7 × 300 = 2100.']],
 howTo:'Tap each block to find the partial products, then choose the total product.',
 init:k=>({m:4,n:236,shown:[false,false,false]}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'Split the bigger factor into its *places*. Multiply each part, then add the *partial products*.')+18;
  const parts=[[200,'#2f7de1'],[30,'#e4572e'],[6,'#e89a00']],ws=[360,180,90],h=150;let x=X0+60;T(g,'4',X0+20,y+h/2+16,ZS(48),INK,'center');
  parts.forEach(([v,c],i)=>{rr(g,x,y,ws[i]-8,h,10);g.fillStyle=tint(c,.25);g.fill();g.lineWidth=3;g.strokeStyle=c;g.stroke();T(g,String(v),x+ws[i]/2-4,y-12,FT.bodyB,c,'center');T(g,'4 × '+v,x+ws[i]/2-4,y+h/2-4,FT.small,INK,'center');T(g,String(4*v),x+ws[i]/2-4,y+h/2+38,ZS(38),INK,'center');x+=ws[i];});
  y+=h+50;T(g,'800 + 120 + 24 = 944',X0,y,ZS(48),acc());T(g,'so 4 × 236 = 944',X0+520,y,FT.bodyB);y+=46;
  y=para(p,y,'*Check with an estimate:* 236 is about 240, and 4 × 240 = 960. 944 is close, so the answer is reasonable.')+12;
  y=keyWords(p,y,[['partial product','the product of one part of a factor'],['area model','a rectangle split to show multiplying']]);
  predict(p,y,S,'p9','What are the partial products for 3 × 125?','*300, 60 and 15.* 3 × 100, 3 × 20 and 3 × 5. Total: 375.');},
 readout(p,S,y){const g=p.g,st=S.st,parts=split(st.n);T(g,st.m+' × '+st.n+' = '+parts.map((v,i)=>st.shown[i]?String(st.m*v):'?').join(' + '),X0,y+50,ZS(44),acc());
  if(st.shown.slice(0,parts.length).every(x=>x))T(g,'= '+st.m*st.n,X0,y+94,ZS(40));return y+104;},
 build(S,grp,mode,game){const st=S.st,Z=-1.8,H=1.6,cols=['#2f7de1','#e4572e','#e89a00'];const blocks=new THREE.Group();grp.add(blocks);const tags=new THREE.Group();grp.add(tags);
  function draw(){clearGroup(blocks);clearGroup(tags);const parts=split(st.n);const wts=parts.map(v=>Math.max(.5,Math.log10(v)+.3));const tot=wts.reduce((a,b)=>a+b,0);const sc=3.9/tot;let x=-1.85;
    const ml=label(String(st.m),{size:.4,color:INK});ml.position.set(-2.12,.4,Z);tags.add(ml);
    parts.forEach((v,i)=>{const w=wts[i]*sc-.08;const ht=st.shown[i]?.12+Math.min(.9,st.m*v/1500):.12;const b=mk(new THREE.BoxGeometry(w,ht,H),[lam(cols[i]),lam(cols[i]),cellMat(st.shown[i]?cols[i]:'#ffffff',Math.max(1,Math.round(w*4)),st.m),lam(cols[i]),lam(cols[i]),lam(cols[i])],20);
      b.position.set(x+w/2,ht/2,Z);blocks.add(b);A.drag(b,{tap:()=>reveal(i)});const t=label(String(v),{size:.3,color:cols[i]});t.position.set(x+w/2,.3,Z-H/2-.25);tags.add(t);
      if(st.shown[i]){const pl=label(st.m+' × '+v+' = '+st.m*v,{size:.24,bg:'#ffffff',border:cols[i]});pl.position.set(x+w/2,ht+.4,Z);tags.add(pl);}x+=w+.08;});A.redraw();}
  function reveal(i){const parts=split(st.n);if(i>=parts.length||st.shown[i])return;st.shown[i]=true;A.pop();A.say(st.m+' × '+parts[i]+' = '+st.m*parts[i]);draw();}
  function setUp(m,n){st.m=m;st.n=n;st.shown=[false,false,false];draw();}
  draw();
  return {info:()=>st.m+' × '+st.n+'  (tap each block)',
    controls:()=>{const ans=st.m*st.n,parts=split(st.n);const ready=st.shown.slice(0,parts.length).every(x=>x);
      if(mode==='play')return ready?choices(game,opts(ans,[10,-10,100,-100,st.m,-st.m]),ans,st.m+' × '+st.n+' = '+ans+'!'):[{t:'Reveal all',fn:()=>parts.forEach((_,i)=>reveal(i))}];
      return [{t:'Factor −',fn:()=>setUp(Math.max(2,st.m-1),st.n)},{t:'Factor +',fn:()=>setUp(Math.min(9,st.m+1),st.n)},{t:'New number',go:true,fn:()=>setUp(st.m,rnd(112,489))},{t:'Reveal all',fn:()=>parts.forEach((_,i)=>reveal(i))}];},
    demo(){setUp(4,236);A.seq([[800,()=>reveal(0)],[1300,()=>reveal(1)],[1300,()=>reveal(2)],[1300,()=>A.say('800 + 120 + 24 = 944')]]);},
    task(r){const m=rnd(3,9),n=r===0?rnd(21,98):r===4?pick([10,100,1000])*rnd(2,9)/ (1) :rnd(112,489);setUp(m,r===4?rnd(2,9)*100+rnd(1,9)*10:n);return 'Find *'+st.m+' × '+st.n+'*. Tap each block, then choose the product.';}};}
});
function split(n){const s=String(n);return s.split('').map((d,i)=>+d*Math.pow(10,s.length-1-i)).filter(v=>v>0);}

/* =========================================================
   10. Dividing and remainders
   ========================================================= */
P.lesson({id:'divide4',title:'Dividing and remainders',strand:'Number',codes:['B2.6'],
 guide:{goal:'Represent and solve problems that divide two- and three-digit numbers by one-digit numbers by sharing base-ten blocks, regrouping when needed, and express a remainder as a fraction when it makes sense.',words:'divide, dividend, divisor, quotient, remainder, share, regroup',
  ask:['Why do we break a ten into ten ones when we cannot share it?','When does a remainder become a fraction? When does it not?','How can multiplication check 75 ÷ 4?'],home:'Share a bag of crackers among family members. What do you do with the leftovers?'},
 learn:[{say:'Share the biggest blocks first.',speech:'To divide Hana’s fifty-seven beads by four, share the tens first: one ten to each plate. One ten is left, so break it into ten ones. Then share the ones.',view:'model',demo:'deal'},
        {say:'Read about remainders.',speech:'Fifty-seven divided by four is fourteen with one left over. The leftover can be cut into four equal parts, so each plate gets fourteen and one fourth.',view:'read'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: deal the blocks.',speech:'Your turn. Press Deal to share blocks, Break to trade a block for ten smaller ones, then choose the answer.',view:'model'}],
 fig:'Base-ten blocks shared fairly onto plates.',rz:.62,
 explore:['*Deal* shares one block of the biggest kind to every plate.','*Break* a block into 10 smaller blocks when you cannot share it.','Leftovers are the *remainder*.'],
 tries:[['68 ÷ 4 = ?','*17.* 4 × 17 = 68.'],['29 ÷ 3 = ?','*9 remainder 2*, or *9 and 2/3* if the leftovers can be cut.'],['Check 75 ÷ 5 = 15 with multiplication.','*5 × 15 = 75*, so it is correct.']],
 howTo:'Deal the blocks until no more can be shared fairly. Break blocks when you need to. Then choose the quotient.',
 init:k=>({n:57,d:4}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'*Dividing* shares a number into equal groups. Share the *biggest blocks first*. If you cannot share a block, *break* it into 10 smaller ones.')+18;
  const pl=[0,1,2,3];pl.forEach(i=>{const cx=X0+100+i*200,cy=y+90;g.beginPath();g.ellipse(cx,cy,86,56,0,0,Math.PI*2);g.fillStyle='#fff4dc';g.fill();g.lineWidth=3;g.strokeStyle='#e8c98a';g.stroke();
    g.fillStyle='#e4572e';g.fillRect(cx-50,cy-30,14,60);for(let k=0;k<4;k++){g.fillStyle='#e89a00';g.fillRect(cx-22+k*18,cy-6,14,14);}});
  T(g,'57 ÷ 4 = 14 R1',X0,y+200,ZS(46),acc());T(g,'each plate: 1 ten and 4 ones',X0+370,y+194,FT.body,GREY);y+=240;
  y=para(p,y,'The *remainder* is what is left. If it can be cut, share it too: 57 ÷ 4 = *14 and 1/4*. Check: 4 × 14 + 1 = 57.')+12;
  y=keyWords(p,y,[['quotient','the answer to a division'],['remainder','the amount left over after sharing equally']]);
  predict(p,y,S,'p10','Share 38 among 3 friends. How many each, and how many left?','*12 each, 2 left over.* 3 × 12 = 36, and 38 − 36 = 2.');},
 readout(p,S,y){const g=p.g,st=S.st;const q=Math.floor(st.n/st.d),r=st.n%st.d;T(g,st.n+' ÷ '+st.d+(st.done?' = '+q+(r?' R'+r+'  or  '+q+' '+r+'/'+st.d:''):' = ?'),X0,y+52,ZS(48),acc());
  T(g,st.done?'Check: '+st.d+' × '+q+(r?' + '+r:'')+' = '+st.n:'Pool: '+st.pool.h+' hundreds, '+st.pool.t+' tens, '+st.pool.o+' ones',X0,y+92,FT.bodyB);return y+102;},
 build(S,grp,mode,game){const st=S.st,u=.1,Zp=-2.5,Zpl=-.95;const pool=new THREE.Group(),plates=new THREE.Group(),items=new THREE.Group();grp.add(pool,plates,items);
  const mkB=k=>k==='h'?unitBox(10,1,10,'#6ea8f5',u):k==='t'?unitBox(1,1,10,'#f79a5c',u):unitBox(1,1,1,'#ffcf3f',u);
  function setUp(n,d){st.n=n;st.d=d;st.pool={h:Math.floor(n/100),t:Math.floor(n/10)%10,o:n%10};st.share=[];for(let i=0;i<d;i++)st.share.push({h:0,t:0,o:0});st.done=false;draw();}
  const px=i=>-1.95+(i+.5)*(3.9/st.d);
  function draw(){clearGroup(pool);clearGroup(plates);clearGroup(items);
    const pm=mk(new THREE.BoxGeometry(3.9,.03,.9),lam('#eef2f8'),20);pm.position.set(0,.015,Zp);pool.add(pm);const pl=label('to share',{size:.18,color:GREY});pl.position.set(-1.6,.25,Zp-.55);pool.add(pl);
    let x=-1.7;['h','t','o'].forEach(k=>{for(let i=0;i<st.pool[k];i++){const b=mkB(k);b.position.set(x,u/2+.03,Zp+(k==='h'?0:k==='t'?0:((i%3)-1)*.15));if(k==='t')b.rotation.y=Math.PI/2;
      x+=k==='h'?1.08:k==='t'?.16:(i%3===2?.14:0);pool.add(b);if(k!=='o')A.drag(b,{tap:()=>breakOne(k)});}x+=.15;});
    for(let i=0;i<st.d;i++){const w=3.9/st.d-.1;const p2=mk(new THREE.CylinderGeometry(Math.min(.42,w/2),Math.min(.42,w/2),.04,28),lam('#fff4dc'),30);p2.position.set(px(i),.02,Zpl);plates.add(p2);
      const s=st.share[i];let yy=.06;const g2=new THREE.Group();g2.position.set(px(i),0,Zpl);items.add(g2);let k2=0;
      for(let j=0;j<s.h;j++){const b=mkB('h');b.scale.setScalar(.6);b.position.set(0,yy,0);yy+=u*.6;g2.add(b);}
      for(let j=0;j<s.t;j++){const b=mkB('t');b.position.set(-.18+(j%4)*.12,u/2+.04+Math.floor(j/4)*u,0);g2.add(b);}
      for(let j=0;j<s.o;j++){const b=mkB('o');b.position.set(.12+(j%3)*.12,u/2+.04+Math.floor(j/9)*u,-.15+(Math.floor(j/3)%3)*.13);g2.add(b);}}
    A.redraw();}
  function deal(){if(st.done)return;const k=['h','t','o'].find(q=>st.pool[q]>0);if(!k){finish();return;}
    if(st.pool[k]<st.d){if(k==='o'){finish();return;}A.bad('Only '+st.pool[k]+' '+(k==='h'?'hundred':'ten')+(st.pool[k]>1?'s':'')+' left: not enough for every plate. Press Break.');return;}
    st.pool[k]-=st.d;st.share.forEach(s=>s[k]++);A.pop();A.say('Each plate gets 1 '+(k==='h'?'hundred':k==='t'?'ten':'one')+'.');draw();
    if(!['h','t','o'].some(q=>st.pool[q]>=st.d)&&st.pool.h===0&&st.pool.t===0)finish();}
  function breakOne(k){if(st.done)return;k=k||(st.pool.h>0&&st.pool.h<st.d?'h':st.pool.t>0?'t':st.pool.h>0?'h':null);if(!k||st.pool[k]<=0){A.bad('Nothing to break.');return;}
    if(st.pool[k]>=st.d){A.bad('You can still share these. Press Deal first.');return;}st.pool[k]--;st.pool[k==='h'?'t':'o']+=10;A.pop();A.say('Broke 1 '+(k==='h'?'hundred into 10 tens':'ten into 10 ones')+'.');draw();}
  function finish(){if(st.done)return;st.done=true;const q=Math.floor(st.n/st.d),r=st.n%st.d;A.good(st.n+' ÷ '+st.d+' = '+q+(r?' with '+r+' left over':''));draw();}
  setUp(st.n,st.d);
  return {info:()=>st.n+' ÷ '+st.d+(st.done?' shared!':'  (Deal, Break)'),
    controls:()=>{const q=Math.floor(st.n/st.d),r=st.n%st.d;const ans=r?q+' R'+r:String(q);
      const base=[{t:'Deal',go:true,big:true,fn:deal,dis:st.done},{t:'Break',fn:()=>breakOne(),dis:st.done}];
      if(mode==='play'&&st.done){const o=shuffle([ans,r?(q+1)+' R'+r:(q+1)+'',r?q+' R'+(r+1>=st.d?0:r+1):(q-1)+'']);return o.map(x=>({t:x,big:true,fn:()=>{if(x===ans)game.solved(st.n+' ÷ '+st.d+' = '+ans+'!');else A.bad('Count what is on one plate, and what is left.');}}));}
      return mode==='learn'?base.concat([{t:'New problem',fn:()=>setUp(rnd(25,99),rnd(2,6))}]):base;},
    demo(){setUp(57,4);A.seq([[800,deal],[1100,()=>breakOne('t')],[1100,deal],[900,deal],[900,deal],[900,deal],[900,deal],[900,()=>{finish();A.say('14 each, 1 left: 57 ÷ 4 = 14 R1, or 14 and 1/4.');}]]);},
    task(r){const T5=[[rnd(3,4)*rnd(11,19),0],[rnd(25,59),0],[rnd(121,199),0],[rnd(61,97),0],[rnd(31,79),0]];let n=T5[r][0];const d=[3,4,5,2,6][r];if(r===0)n=d*rnd(11,24);if(n>199)n=199;setUp(n,d);
      return 'Share *'+n+'* among *'+d+'* plates. Deal, break, then choose the answer.';}};}
});

/* =========================================================
   11. Fractions times whole numbers
   ========================================================= */
P.lesson({id:'unitfrac',title:'Adding unit fractions',strand:'Number',codes:['B2.7'],
 guide:{goal:'Show that adding a unit fraction several times is the same as multiplying the unit fraction by a whole number, using fraction strips and standard notation.',words:'unit fraction, repeated addition, multiply, numerator, denominator, improper fraction',
  ask:['Why is 1/4 + 1/4 + 1/4 the same as 3 × 1/4?','How many fifths make 2 wholes?','Is 7 × 1/8 more or less than 1? How do you know?'],home:'Measure with a 1/4 cup. How many scoops make 2 cups? Write it as a multiplication.'},
 learn:[{say:'Repeated addition is multiplication.',speech:'Finn takes one fourth plus one fourth plus one fourth. That is three times one fourth, which is three fourths. Watch the pieces line up.',view:'model',demo:'add'},
        {say:'Read the rule.',speech:'When you multiply a unit fraction by a whole number, the whole number tells how many pieces. Five times one third is five thirds, which is one and two thirds.',view:'read'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: add pieces.',speech:'Your turn. Choose a unit fraction and add pieces to the track. Watch the multiplication sentence grow.',view:'model'}],
 fig:'Unit fraction pieces lined up on a track marked in wholes.',rz:-.2,
 explore:['Choose the *unit fraction*: 1/2 to 1/10.','Press *Add a piece* or tap the track.','Read the repeated addition and the multiplication.'],
 tries:[['4 × 1/5 = ?','*4/5.* Four pieces that are each one fifth.'],['How many 1/3 pieces make 2 wholes?','*6.* 6 × 1/3 = 6/3 = 2.'],['Write 1/8 + 1/8 + 1/8 + 1/8 + 1/8 as a multiplication.','*5 × 1/8 = 5/8.*']],
 howTo:'Read the question. Pick the unit fraction and add pieces until the track shows the answer.',
 init:k=>({d:4,n:3,target:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'A *unit fraction* is one piece, like 1/4. Adding the same unit fraction again and again is the same as *multiplying*.')+18;
  for(let i=0;i<3;i++){rr(g,X0+i*150,y,140,64,10);g.fillStyle=['#2f7de1','#16a36f','#e4572e'][i];g.fill();T(g,'1/4',X0+i*150+70,y+44,ZS(36),'#fff','center');}
  g.strokeStyle=INK;g.lineWidth=3;g.strokeRect(X0,y-6,600,76);T(g,'1 whole',X0+640,y+42,FT.small,GREY);y+=110;
  T(g,'1/4 + 1/4 + 1/4  =  3 × 1/4  =  3/4',X0,y,ZS(42),acc());y+=56;
  y=para(p,y,'The *whole number* tells how many pieces. *5 × 1/3 = 5/3 = 1 and 2/3*. When the numerator is bigger than the denominator, the amount is more than 1.')+12;
  y=keyWords(p,y,[['repeated addition','adding the same number again and again'],['unit fraction','a fraction with 1 as the numerator']]);
  predict(p,y,S,'p11','What is 6 × 1/6?','*6/6 = 1 whole.* Six sixths fill one whole.');},
 readout(p,S,y){const g=p.g,st=S.st;const add=st.n?Array(Math.min(st.n,5)).fill('1/'+st.d).join(' + ')+(st.n>5?' + …':''):'0';T(g,add,X0,y+40,FT.bodyB);
  const w=Math.floor(st.n/st.d),r=st.n%st.d;T(g,st.n+' × 1/'+st.d+' = '+st.n+'/'+st.d+(w?' = '+(r?w+' and '+r+'/'+st.d:String(w)):''),X0,y+88,ZS(42),acc());return y+100;},
 build(S,grp,mode,game){const st=S.st,Z=-1.4,L=1.95,x0=-1.95;const track=mk(new THREE.BoxGeometry(2*L+.1,.04,.8),lam('#eef2f8'),20);track.position.set(0,.02,Z);grp.add(track);
  [0,1,2].forEach(k=>{const t=mk(new THREE.BoxGeometry(.03,.5,.9),lam(INK),0);t.position.set(x0+k*L,.25,Z);grp.add(t);const l=label(String(k),{size:.3});l.position.set(x0+k*L,.75,Z);grp.add(l);});
  A.drag(track,{tap:()=>addP(1)});const pcs=new THREE.Group();grp.add(pcs);
  function draw(){clearGroup(pcs);const w=L/st.d;for(let i=0;i<st.n;i++){const m=mk(G('uf'+st.d,()=>new THREE.BoxGeometry(w-.03,.28,.6)),lam(VIBE[i%6]),20);m.position.set(x0+(i+.5)*w,.18,Z);pcs.add(m);
      if(st.d<=8){const l=label('1/'+st.d,{size:.17,color:'#fff'});l.position.set(x0+(i+.5)*w,.42,Z);pcs.add(l);}}check();A.redraw();}
  function addP(k){const n=st.n+k;if(n<0)return;if(n>2*st.d){A.bad('The track holds 2 wholes.');return;}st.n=n;A.pop();draw();}
  function check(){if(mode==='play'&&st.target&&st.d===st.target[1]&&st.n===st.target[0])game.solved(st.n+' × 1/'+st.d+' = '+st.n+'/'+st.d+'!');}
  draw();
  return {info:()=>st.n+' × 1/'+st.d+' = '+st.n+'/'+st.d,
    controls:()=>[2,3,4,5,6,8,10].map(d=>({t:'1/'+d,on:st.d===d,fn:()=>{st.d=d;st.n=Math.min(st.n,2*d);draw();}})).concat([{t:'Add a piece',go:true,big:true,fn:()=>addP(1)},{t:'Remove',fn:()=>addP(-1)}]),
    demo(){st.d=4;st.n=0;draw();A.seq([[700,()=>addP(1)],[700,()=>addP(1)],[700,()=>addP(1)],[900,()=>A.say('1/4 + 1/4 + 1/4 = 3 × 1/4 = 3/4')]]);},
    task(r){st.n=0;st.d=2;let n,d,txt;if(r===0){d=5;n=4;txt='Show *4 × 1/5*.';}else if(r===1){d=3;n=6;txt='How many *1/3* pieces make *2 wholes*? Show it.';}
      else if(r===2){d=8;n=rnd(3,7);txt='Show *'+Array(n).fill('1/8').join(' + ')+'*.';}else if(r===3){d=pick([3,4,5]);n=d+rnd(1,d-1);txt='Show *'+n+' × 1/'+d+'*. Is it more than 1?';}
      else{d=pick([6,10]);n=rnd(2,d-1);txt='Show *'+n+'/'+d+'* as unit fractions.';}st.target=[n,d];draw();return txt;}};}
});

/* =========================================================
   12. Rates
   ========================================================= */
const RATES=[{it:'egg carton',each:'eggs',per:6,col:'#f3e3c3',dot:'#fffaf0'},{it:'tricycle',each:'wheels',per:3,col:'#e4572e',dot:'#1b2236'},{it:'bag',each:'apples',per:4,col:'#c9e7a3',dot:'#e0453a'},{it:'pack',each:'juice boxes',per:5,col:'#bfe2ff',dot:'#f08a24'},{it:'spider',each:'legs',per:8,col:'#8b5cf6',dot:'#1b2236'}];
P.lesson({id:'rates',title:'Rates: for every one',strand:'Number',codes:['B2.8'],
 guide:{goal:'Show simple multiplicative relationships involving whole-number rates (such as 6 eggs per carton) using models, tables and drawings.',words:'rate, per, for every, table of values, multiply, relationship',
  ask:['If one carton has 6 eggs, how can you find the eggs in 7 cartons without counting?','What stays the same in a rate table? What changes?','How many cartons do you need for 30 eggs?'],home:'Find rates at home: wheels per car, legs per chair, slices per pizza. Make a table for 1 to 5 of each.'},
 learn:[{say:'A rate compares two amounts.',speech:'A rate tells how much of one thing for every one of another. One of Tala’s cartons holds six eggs. Watch: two cartons, twelve eggs. Three cartons, eighteen eggs.',view:'model',demo:'grow'},
        {say:'Read the rate table.',speech:'In a rate table, the number of cartons goes up by one, and the number of eggs goes up by six each time. Multiply by six to get the eggs.',view:'read'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: add groups.',speech:'Your turn. Add or remove groups and watch the total change. Try a different rate.',view:'model'}],
 fig:'Groups of items: the total grows by the same amount each time.',rz:.15,
 explore:['*Add* or *remove* a group.','Switch the *rate*: eggs, wheels, apples, juice boxes, legs.','Watch the *total* grow by the same amount.'],
 tries:[['1 tricycle has 3 wheels. How many wheels on 7 tricycles?','*21.* 7 × 3 = 21.'],['A spider has 8 legs. How many spiders have 40 legs?','*5.* 5 × 8 = 40.'],['1 bag holds 4 apples. Fill in: 1 → 4, 2 → 8, 3 → ___','*12.* Add 4 each time.']],
 howTo:'Read the rate and the question. Add groups until the total matches.',
 init:k=>({ri:0,n:2,target:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'A *rate* compares two amounts: *6 eggs for every 1 carton*. We say *6 eggs per carton*.')+18;
  const cw=110;rr(g,X0,y,cw*6+140,120,14);g.fillStyle=tint(acc(),.08);g.fill();T(g,'cartons',X0+20,y+48,FT.smallB);T(g,'eggs',X0+20,y+98,FT.smallB);
  for(let i=1;i<=5;i++){T(g,String(i),X0+140+(i-.5)*cw,y+48,ZS(36),INK,'center');T(g,String(6*i),X0+140+(i-.5)*cw,y+98,ZS(36),'#e4572e','center');}
  T(g,'+6',X0+140+1.0*cw,y+150,FT.hand,BLUE,'center');T(g,'+6',X0+140+2*cw,y+150,FT.hand,BLUE,'center');T(g,'× 6',X0+cw*6+80,y+80,FT.hand,BLUE,'center');y+=190;
  y=para(p,y,'To find the total, *multiply* the number of groups by the rate: 7 cartons × 6 eggs = *42 eggs*. To find the groups, ask *how many 6s* make the total.')+12;
  y=keyWords(p,y,[['rate','how much of one thing for every one of another'],['per','for each one']]);
  predict(p,y,S,'p12','A pack has 5 juice boxes. How many packs hold 35 juice boxes?','*7 packs.* 7 × 5 = 35.');},
 readout(p,S,y){const g=p.g,st=S.st,R=RATES[st.ri];T(g,st.n+' '+R.it+(st.n===1?'':'s')+' × '+R.per+' '+R.each+' = '+st.n*R.per+' '+R.each,X0,y+48,ZS(40),acc());
  T(g,'Rate: '+R.per+' '+R.each+' per '+R.it,X0,y+88,FT.bodyB);return y+98;},
 build(S,grp,mode,game){const st=S.st,Z=-1.6;const groups=new THREE.Group();grp.add(groups);const tot=label('',{size:.36,bg:'#ffffff'});tot.position.set(0,1.75,Z);grp.add(tot);
  function one(R){const g=new THREE.Group();if(R.it==='tricycle'){const fr=mk(G('trif',()=>new THREE.BoxGeometry(.5,.05,.08)),lam(R.col),0);fr.position.y=.22;g.add(fr);
      [[-.22,0],[.22,-.12],[.22,.12]].forEach(([x,z])=>{const w=mk(G('triw',()=>new THREE.TorusGeometry(.09,.03,8,18)),lam(R.dot),0);w.position.set(x,.11,z);g.add(w);});return g;}
    if(R.it==='spider'){const bd=mk(G('spb',()=>new THREE.SphereGeometry(.14,14,10)),lam(R.col),0);bd.position.y=.16;g.add(bd);for(let i=0;i<8;i++){const s=i<4?-1:1,k=i%4;const lg=mk(G('spl',()=>new THREE.CylinderGeometry(.012,.012,.28,5)),lam(R.dot),0);lg.position.set(s*.16,.1,-.15+k*.1);lg.rotation.z=s*1.1;g.add(lg);}return g;}
    const bx=mk(G('rbox'+R.it,()=>new THREE.BoxGeometry(R.it==='egg carton'?.62:.5,.12,R.it==='egg carton'?.24:.36)),lam(R.col),20);bx.position.y=.06;g.add(bx);
    for(let i=0;i<R.per;i++){const it=mk(G('rit'+R.it,()=>R.it==='pack'?new THREE.BoxGeometry(.08,.16,.08):new THREE.SphereGeometry(R.it==='bag'?.075:.07,12,9)),lam(R.dot),0);
      const cols=R.it==='egg carton'?3:R.per>4?3:2;it.position.set(((i%cols)-(cols-1)/2)*.17,.17,(Math.floor(i/cols)-.5)*.12);if(R.it==='egg carton')it.scale.set(.85,1.15,.85);g.add(it);}return g;}
  function draw(){clearGroup(groups);const R=RATES[st.ri];for(let i=0;i<st.n;i++){const g=one(R);const c=i%5,r=Math.floor(i/5);g.position.set(-1.8+c*.9,0,Z-.9+r*.85);groups.add(g);A.drag(g,{tap:()=>setN(st.n-1)});}
    tot.userData.set(st.n*R.per+' '+R.each);check();A.redraw();}
  function setN(n){n=Math.max(0,Math.min(10,n));if(n===st.n)return;st.n=n;A.pop();draw();}
  function check(){if(mode==='play'&&st.target!=null&&st.n*RATES[st.ri].per===st.target)game.solved(st.n+' × '+RATES[st.ri].per+' = '+st.target+'!');}
  draw();
  return {info:()=>st.n+' groups × '+RATES[st.ri].per+' = '+st.n*RATES[st.ri].per,
    controls:()=>{const c=[{t:'− group',fn:()=>setN(st.n-1)},{t:'+ group',go:true,big:true,fn:()=>setN(st.n+1)}];
      if(mode==='learn')c.push(...RATES.map((R,i)=>({t:R.each,on:st.ri===i,fn:()=>{st.ri=i;draw();}})));return c;},
    demo(){st.ri=0;st.n=1;draw();A.seq([[800,()=>setN(2)],[800,()=>setN(3)],[800,()=>setN(4)],[900,()=>A.say('4 cartons × 6 eggs = 24 eggs')]]);},
    task(r){st.ri=r;st.n=0;const R=RATES[r],k=rnd(3,9);st.target=k*R.per;draw();
      return r%2===0?'1 '+R.it+' has *'+R.per+' '+R.each+'*. Show *'+st.target+' '+R.each+'*. How many '+R.it+'s?':'Show the '+R.each+' on *'+k+' '+R.it+'s* ('+R.per+' per '+R.it+').';}};}
});
})();
