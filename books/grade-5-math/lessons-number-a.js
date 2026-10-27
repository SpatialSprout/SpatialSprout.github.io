/* The Interactive Classroom: Grade 5 Math — Number, part A (lessons 1–7) */
(function(){
"use strict";
const P=window.PM;if(!P||P.failed||!P.THREE)return;
const {THREE,V,W,D,PY,PX,X0,TW,INK,RED,BLUE,GREY,VIBE,FT,ZS,G,M,lam,mk,unitBox,cellMat,label,starGeo,wedgeGeo,clearGroup,disposeObj,rr,T,wrap,para,header,keyWords,predict,box,caption,cxOf,cyOf,tint,moveTo,hop,tween,burst,easeOut,easeIO,A}=P;
const acc=()=>P.ACC;
const rnd=(a,b)=>a+Math.floor(Math.random()*(b-a+1)),pick=a=>a[Math.floor(Math.random()*a.length)],shuffle=a=>a.slice().sort(()=>Math.random()-.5);
const fmt=n=>{const s=String(n);const [i,f]=s.split('.');const ii=Math.abs(+i)>=10000?i.replace(/\B(?=(\d{3})+(?!\d))/g,' '):i;return f!=null?ii+'.'+f:ii;};
const ONES=['zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'];
const TENS=['','','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety'];
const words=n=>n<20?ONES[n]:n<100?TENS[Math.floor(n/10)]+(n%10?'-'+ONES[n%10]:''):n<1000?ONES[Math.floor(n/100)]+' hundred'+(n%100?' '+words(n%100):''):n<1000000?words(Math.floor(n/1000))+' thousand'+(n%1000?' '+words(n%1000):''):String(n);
const gcd=(a,b)=>b?gcd(b,a%b):a;
const mixed=(n,d)=>{const w=Math.floor(n/d),r=n%d;return w&&r?w+' '+r+'/'+d:w?String(w):r+'/'+d;};
function choices(game,list,ans,ok,lab){return list.map(o=>({t:lab?lab(o):String(o),big:true,fn:()=>{if(o===ans)game.solved(ok);else A.bad('Not quite. Try again!');}}));}
function diskMat(text,col){return M('d5'+text+col,()=>{const c=document.createElement('canvas');c.width=c.height=128;const g=c.getContext('2d');g.fillStyle=col;g.fillRect(0,0,128,128);
  g.strokeStyle='rgba(255,255,255,.75)';g.lineWidth=6;g.beginPath();g.arc(64,64,54,0,Math.PI*2);g.stroke();g.fillStyle='#fff';g.font='700 '+(text.length>4?27:text.length>3?34:text.length>2?42:56)+'px "Atkinson Hyperlegible", sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText(text,64,68);
  const t=new THREE.CanvasTexture(c);t.anisotropy=4;return new THREE.MeshLambertMaterial({map:t});});}
function disk(text,col,r){const geo=G('d5disk'+r,()=>new THREE.CylinderGeometry(r,r,.07,28));return mk(geo,[lam(col),diskMat(text,col),lam(col)],30);}
function drawFrac(g,n,d,x,y,size,col){g.font=ZS(size);const w=Math.max(g.measureText(String(n)).width,g.measureText(String(d)).width);T(g,String(n),x+w/2,y-size*.18,ZS(size),col||INK,'center');
  g.fillStyle=col||INK;g.fillRect(x-4,y-size*.02,w+8,Math.max(3,size*.06));T(g,String(d),x+w/2,y+size*.82,ZS(size),col||INK,'center');return w+8;}
/* number line helper: a track with ticks and whole-number labels */
function numLine(grp,x0,L,z,wholes,sub){const tr=mk(new THREE.BoxGeometry(L*wholes+.1,.05,.12),lam('#cbd5e6'),0);tr.position.set(x0+L*wholes/2,.03,z);grp.add(tr);
  for(let k=0;k<=wholes*sub;k++){const big=k%sub===0;const t=new THREE.Mesh(G('nl5'+big,()=>new THREE.BoxGeometry(.016,big?.22:.1,.016)),lam(INK));t.position.set(x0+k*L/sub,.05+(big?.11:.05),z);grp.add(t);
    if(big){const l=label(String(k/sub),{size:.26});l.position.set(x0+k*L/sub,.42,z+.28);grp.add(l);}}}

/* =========================================================
   1. Place value to 100 000
   ========================================================= */
const PV=[{k:'tt',n:'Ten thousands',s:'10 000s',v:10000,txt:'10 000',col:'#8b5cf6',max:10},{k:'th',n:'Thousands',s:'1000s',v:1000,txt:'1000',col:'#16a36f',max:12},{k:'h',n:'Hundreds',s:'100s',v:100,txt:'100',col:'#2f7de1',max:12},{k:'t',n:'Tens',s:'10s',v:10,txt:'10',col:'#e4572e',max:12},{k:'o',n:'Ones',s:'1s',v:1,txt:'1',col:'#e89a00',max:12}];
const pvVal=c=>c.tt*10000+c.th*1000+c.h*100+c.t*10+c.o;
const pvExp=n=>{const p=[10000,1000,100,10,1].map(b=>Math.floor(n/b)%10*b).filter(x=>x);if(n>=100000)return '100 000';return p.length?p.map(fmt).join(' + '):'0';};
P.lesson({id:'pv5',title:'Place value to 100 000',strand:'Number',codes:['B1.1','B1.2'],
 guide:{goal:'Read, represent, compose and decompose whole numbers up to 100 000 with place-value disks, write them in standard, expanded and word form, compare and order them, and describe how big numbers are used in everyday life.',words:'ten thousands, thousands, place value, expanded form, compose, decompose, compare, order',
  ask:['Why is the 6 in 64 017 worth 60 000?','How do 10 thousands become 1 ten thousand?','Which is greater, 48 905 or 49 058? Which place tells you?'],home:'Find big numbers together: the population of your town, the seats in a stadium, the kilometres on a car. Read them aloud and put them in order.'},
 learn:[{say:'A new place: ten thousands.',speech:'Ten thousands is the place to the left of thousands. Zane’s town has fifty-two thousand, three hundred six people. Watch the model build it.',view:'model',demo:'build'},
        {say:'Read the chart and the three forms.',speech:'Five ten thousands, two thousands, three hundreds, zero tens and six ones make fifty-two thousand three hundred six. We leave a small space between the thousands and the hundreds.',view:'read'},
        {say:'Watch: 10 thousands make 1 ten thousand.',speech:'Watch the thousands mat. When it has ten disks, we trade them for one ten thousand. Every place is worth ten of the place to its right.',view:'model',demo:'regroup'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the yellow flap to check.',view:'read'},
        {say:'Your turn: build big numbers.',speech:'Your turn. Drag disks from the piles onto the mats, or tap a pile. Tap a disk on a mat to take it away.',view:'model'}],
 fig:'Place-value disks on a five-place mat, from ten thousands to ones.',rz:.55,
 explore:['*Drag* a disk onto its mat, or *tap* a pile to add one.','*Tap* a disk on a mat to take it away.','Get 10 disks in one place, then press *Regroup*.'],
 howTo:'Read the number. Drag or tap disks onto the mats until the model shows that number.',
 init:k=>k==='play'?{c:{tt:0,th:0,h:0,t:0,o:0},target:0}:{c:{tt:5,th:2,h:3,t:0,o:6}},
 left(p,S){const g=p.g,c=S.st.c;let y=header(p,S);
  y=para(p,y,'Each place is worth *10 times* the place to its right. Big numbers count people in a city, seats in an arena, or kilometres on a car.')+14;
  const cw=TW/5;PV.forEach((q,i)=>{const x=X0+i*cw,v=c[q.k];rr(g,x+4,y,cw-8,160,16);g.fillStyle=tint(q.col,.14);g.fill();T(g,q.s,x+cw/2,y+38,FT.smallB,q.col,'center');T(g,String(v),x+cw/2,y+124,ZS(76),v>9?RED:INK,'center');});
  y+=200;const n=pvVal(c);T(g,'Standard:',X0,y,FT.smallB,GREY);T(g,fmt(n),X0+180,y+2,ZS(40));y+=44;T(g,'Expanded:',X0,y,FT.smallB,GREY);wrap(g,pvExp(n),X0+180,y+2,TW-180,34,{font:ZS(30)});y+=44;
  T(g,'Words:',X0,y,FT.smallB,GREY);y=wrap(g,words(Math.min(n,100000)),X0+180,y,TW-180,32,{font:FT.cap,color:INK})+26;
  y=para(p,y,'To *compare*, start at the greatest place: 4*8* 905 < 4*9* 058 because 8 thousands is less than 9 thousands.')+12;
  y=keyWords(p,y,[['place value','what a digit is worth because of its place'],['decompose','break a number into parts, like 50 000 + 2000 + 306']]);
  predict(p,y,S,'p1','You have 9 ten thousands, 9 thousands, 9 hundreds, 9 tens and 9 ones. Add 1 more one. What number do you get?','*100 000.* Every place regroups, one after another: one hundred thousand.');},
 readout(p,S,y){const g=p.g,n=pvVal(S.st.c);T(g,fmt(n),X0,y+48,ZS(60),acc());wrap(g,'= '+pvExp(n),X0+250,y+30,TW-250,30,{font:FT.bodyB});wrap(g,words(Math.min(n,100000)),X0+250,y+70,TW-250,28,{font:FT.cap,color:GREY});return y+100;},
 build(S,grp,mode,game){const st=S.st,MX={tt:-1.84,th:-.92,h:0,t:.92,o:1.84},MZ=-1.5,MWd=.84,R=.12;
  PV.forEach((q,i)=>{const m=mk(new THREE.BoxGeometry(MWd,.03,2.05),lam(['#ede6ff','#d7f1e5','#d7e6fb','#fbdde6','#fff0c4'][i]),20);m.position.set(MX[q.k],.015,MZ);grp.add(m);
    const l=label(q.s,{size:.17,color:q.col});l.position.set(MX[q.k],.25,MZ-1.22);grp.add(l);});
  const slot=(k,i)=>V(MX[k]+((i%3)-1)*.26,.05+(i>=12?.08:0),MZ-.82+Math.floor((i%12)/3)*.38);
  const stacks={tt:[],th:[],h:[],t:[],o:[]};let busyT=false;
  const total=label('0',{size:.42,bg:'#ffffff'});total.position.set(0,1.8,MZ);grp.add(total);
  const onMat=(k,p)=>Math.abs(p.x-MX[k])<MWd/2+.06&&Math.abs(p.z-MZ)<1.15;
  const mkD=k=>{const q=PV.find(z=>z.k===k);return disk(q.txt,q.col,R);};
  function relayout(k){stacks[k].forEach((m,i)=>moveTo(m,{pos:slot(k,i),k:10}));}
  function spawn(k,drop){const m=mkD(k);const p=slot(k,stacks[k].length);m.position.copy(p);if(drop)m.position.y+=1.1;grp.add(m);moveTo(m,{pos:p,k:9});
    A.drag(m,{tap:()=>remove(k,m),drop:(pos,o)=>{if(onMat(k,pos))relayout(k);else remove(k,o);}});stacks[k].push(m);}
  function render(drop){PV.forEach(({k})=>{const a=stacks[k];while(a.length<st.c[k])spawn(k,drop);while(a.length>st.c[k]){const m=a.pop();A.unclick(m);moveTo(m,{scale:.01,k:16,done:()=>{grp.remove(m);disposeObj(m);}});}});changed();}
  function changed(){total.userData.set(fmt(pvVal(st.c)));if(mode==='play'&&!st.setup&&pvVal(st.c)===st.target&&PV.every(q=>st.c[q.k]<10||q.k==='tt'))game.solved('Yes! That is '+fmt(st.target)+'.');A.redraw();}
  function add(k){if(busyT)return;const q=PV.find(z=>z.k===k);if(st.c[k]>=q.max){A.bad(k==='tt'?'This mat is full.':'Too many! Press Regroup to trade 10 for 1 of the next place.');return;}
    st.c[k]++;spawn(k,true);A.pop();if(st.c[k]===10&&k!=='tt')A.say('You have 10 '+q.n.toLowerCase()+'. Regroup them!');changed();}
  function remove(k,m){if(busyT||st.c[k]<=0)return;const a=stacks[k];const i=m?a.indexOf(m):a.length-1;if(i<0)return;const o=a.splice(i,1)[0];A.unclick(o);st.c[k]--;moveTo(o,{scale:.01,k:16,done:()=>{grp.remove(o);disposeObj(o);}});relayout(k);changed();}
  function regroup(){if(busyT)return;const order=['o','t','h','th'],up={o:'t',t:'h',h:'th',th:'tt'};const k=order.find(q=>st.c[q]>=10);if(!k){A.bad('No place has 10 disks yet.');return;}
    const u=up[k];if(st.c[u]>=PV.find(z=>z.k===u).max){A.bad('The next mat is full.');return;}busyT=true;const ten=stacks[k].splice(-10,10);const tgt=slot(u,stacks[u].length);
    ten.forEach((m,i)=>{A.unclick(m);moveTo(m,{pos:tgt.clone().add(V(0,.08*i+.1,0)),k:5+i*.4,done:i===9?()=>{ten.forEach(o=>{grp.remove(o);disposeObj(o);});st.c[k]-=10;st.c[u]++;busyT=false;spawn(u,false);relayout(k);
      A.good('10 '+PV.find(z=>z.k===k).n.toLowerCase()+' became 1 '+PV.find(z=>z.k===u).n.toLowerCase().replace(/s$/,'')+'!');changed();}:null});});}
  PV.forEach(q=>{const pile=new THREE.Group();[[0,0,0],[.08,.07,.05],[-.05,.14,-.04]].forEach(([x,y,z])=>{const d=mkD(q.k);d.position.set(x,.04+y,z);pile.add(d);});pile.position.set(MX[q.k],0,.3);grp.add(pile);
    let ghost=null;
    A.drag(pile,{tap:()=>add(q.k),start:()=>{ghost=mkD(q.k);ghost.position.copy(pile.position);grp.add(ghost);},move:pt=>{if(ghost)ghost.position.copy(grp.worldToLocal(pt));},
      drop:()=>{if(!ghost)return;const pos=ghost.position.clone();grp.remove(ghost);disposeObj(ghost);ghost=null;const k2=PV.map(z=>z.k).find(z=>onMat(z,pos));if(k2===q.k)add(q.k);else if(k2)A.bad(q.n+' go on the '+q.s+' mat.');}});});
  render(false);
  function set(tt,th,h,t,o){st.c={tt,th,h,t,o};render(true);}
  return {info:()=>fmt(pvVal(st.c))+' = '+pvExp(pvVal(st.c)),
    controls:()=>[{t:'+10 000',big:true,fn:()=>add('tt')},{t:'+1000',big:true,fn:()=>add('th')},{t:'+100',big:true,fn:()=>add('h')},{t:'+10',big:true,fn:()=>add('t')},{t:'+1',big:true,fn:()=>add('o')},
      {t:'Regroup 10 → 1',go:true,fn:regroup,dis:!['o','t','h','th'].some(k=>st.c[k]>=10)},{t:'Clear',fn:()=>set(0,0,0,0,0)}],
    demo(n){if(n==='show'){set(5,2,3,0,6);return;}if(n==='build'){set(0,0,0,0,0);A.seq([[600,()=>{for(let i=0;i<5;i++)add('tt');A.say('5 ten thousands');}],[1300,()=>{add('th');add('th');A.say('2 thousands');}],[1200,()=>{for(let i=0;i<3;i++)add('h');A.say('3 hundreds');}],[1200,()=>A.say('0 tens: the zero holds the place')],[1200,()=>{for(let i=0;i<6;i++)add('o');A.say('6 ones. That makes 52 306!');}]]);}
      if(n==='regroup'){set(3,9,4,0,0);A.seq([[1000,()=>add('th')],[1200,regroup],[1800,()=>A.say('10 thousands = 1 ten thousand. Now it is 40 400.')]]);}},
    task(r){st.setup=true;st.c={tt:0,th:0,h:0,t:0,o:0};render(false);let n,txt;
      if(r===0){n=rnd(1,9)*10000+rnd(1,9)*1000+rnd(1,9)*100+rnd(1,9)*10+rnd(1,9);txt='Build the number *'+fmt(n)+'*.';}
      else if(r===1){n=rnd(2,9)*10000+rnd(0,9)*100+rnd(1,9);txt='Build *'+fmt(n)+'*. Watch the zeros!';}
      else if(r===2){const b=rnd(1,7)*10000+rnd(1,9)*1000+rnd(0,9)*100+rnd(1,9);n=b+10000;txt='Build the number that is *10 000 more than '+fmt(b)+'*.';}
      else if(r===3){n=rnd(1,9)*10000+rnd(0,9)*1000+rnd(1,9)*100+rnd(0,9)*10+rnd(1,9);txt='Build *'+words(n)+'*.';}
      else{const tt=rnd(2,8),a=rnd(1,8);let b=rnd(1,8);if(b===a)b=a+1;const x=tt*10000+a*1000+rnd(0,9)*100+rnd(0,9),y=tt*10000+b*1000+rnd(0,9)*100+rnd(0,9);n=Math.max(x,y);txt='Build the *greater* number: *'+fmt(x)+'* or *'+fmt(y)+'*.';}
      st.target=n;st.setup=false;return txt;}};}
});

/* =========================================================
   2. Equivalent fractions, improper fractions and mixed numbers
   ========================================================= */
const DENS=[2,3,4,5,6,8,10,12];
P.lesson({id:'equiv5',title:'Equivalent fractions to twelfths',strand:'Number',codes:['B1.3'],
 guide:{goal:'Represent equivalent fractions from halves to twelfths, including improper fractions and mixed numbers, with fraction bars.',words:'equivalent, numerator, denominator, improper fraction, mixed number, whole',
  ask:['Why is 2/4 the same amount as 1/2?','How can 7/4 be written as a mixed number?','Which fractions in twelfths are equal to 2/3?'],home:'Fold a strip of paper in half, then in half again, then again. Name the equal fractions you see on each fold.'},
 learn:[{say:'Same length, different names.',speech:'The top bar shows Layla’s one half. Watch the bottom bar split into fourths, then sixths. Two fourths and three sixths are the same length as one half. They are equivalent.',view:'model',demo:'equiv'},
        {say:'Read about equivalent fractions.',speech:'To make an equivalent fraction, multiply the numerator and the denominator by the same number. One half times three over three is three sixths.',view:'read'},
        {say:'Watch: more than one whole.',speech:'Now the top bar shows seven fourths. That is one whole and three fourths more. Seven fourths is an improper fraction. One and three fourths is a mixed number.',view:'model',demo:'mixed'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: match the top bar.',speech:'Your turn. Choose how many parts for the bottom bar, then tap parts until both bars line up.',view:'model'}],
 fig:'Two bars, each two wholes long. The bottom bar matches the top bar.',rz:-.15,
 explore:['Pick a *denominator* for the bottom bar.','*Tap a part* to shade up to it.','When both bars end at the *red line*, the fractions are *equivalent*.'],
 howTo:'Read the fraction. Choose the right number of parts for the bottom bar, then shade until it lines up with the top bar.',
 init:k=>({tn:1,td:2,n:2,d:4,need:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'*Equivalent fractions* name the same amount. These bars are the same length:')+16;
  const bw=TW-220;[[2,1,'#2f7de1'],[4,2,'#16a36f'],[6,3,'#e4572e'],[12,6,'#e89a00']].forEach(([d,n,c],j)=>{for(let i=0;i<d;i++){rr(g,X0+i*bw/d+1,y+j*58,bw/d-2,46,6);g.fillStyle=i<n?c:'#e9eef7';g.fill();}drawFrac(g,n,d,X0+bw+40,y+j*58+20,30,c);});
  y+=4*58+20;g.strokeStyle=RED;g.lineWidth=4;g.setLineDash([10,8]);g.beginPath();g.moveTo(X0+bw/2,y-4*58-30);g.lineTo(X0+bw/2,y-10);g.stroke();g.setLineDash([]);
  T(g,'1/2 = 2/4 = 3/6 = 6/12',X0,y+30,ZS(40),acc());T(g,'× 3 on top and bottom',X0+470,y+28,FT.hand,BLUE);y+=66;
  y=para(p,y,'An *improper fraction* has a numerator greater than its denominator: *7/4*. It equals the *mixed number* 1 3/4 (one whole and 3 fourths).')+12;
  y=keyWords(p,y,[['equivalent','equal in value'],['mixed number','a whole number and a fraction, like 2 1/3']]);
  predict(p,y,S,'p2','Write 11/4 as a mixed number.','*2 3/4.* 8 fourths make 2 wholes, and 3 fourths are left.');},
 readout(p,S,y){const g=p.g,st=S.st;const eq=st.n*st.td===st.tn*st.d;let x=X0;x+=drawFrac(g,st.tn,st.td,x,y+46,46,'#2f7de1')+18;T(g,eq?'=':'≠',x,y+62,ZS(52),eq?'#16a36f':RED);x+=48;
  x+=drawFrac(g,st.n,st.d,x,y+46,46,'#16a36f')+24;T(g,st.tn>st.td?'= '+mixed(st.tn,st.td):'',x,y+60,FT.bodyB);T(g,eq?'Equivalent! Same length.':'Make the bottom bar end at the red line.',X0,y+118,FT.bodyB,eq?'#16a36f':GREY);return y+126;},
 build(S,grp,mode,game){const st=S.st,L1=1.95,x0=-1.95,Zt=-2.45,Zb=-1.55;const top=new THREE.Group(),bot=new THREE.Group();grp.add(top,bot);
  const line=mk(new THREE.BoxGeometry(.035,.9,1.75),new THREE.MeshLambertMaterial({color:'#e0453a',transparent:true,opacity:.55}),0);grp.add(line);
  [0,1,2].forEach(k=>{const l=label(String(k),{size:.28});l.position.set(x0+k*L1,.25,Zb+.62);grp.add(l);});
  const tl=label('',{size:.3,bg:'#ffffff',border:'#2f7de1'}),bl=label('',{size:.3,bg:'#ffffff',border:'#16a36f'});grp.add(tl,bl);let pieces=[];
  function bars(g,n,d,z,col,tap){clearGroup(g);const w=L1/d,out=[];for(let i=0;i<2*d;i++){const on=i<n;const m=mk(G('eq5'+d,()=>new THREE.BoxGeometry(w-.03,.28,.62)),lam(on?(i>=d?col[1]:col[0]):'#eef2f8'),20);
      m.position.set(x0+(i+.5)*w,.14+(on?.05:0),z);g.add(m);out.push(m);if(tap)A.drag(m,{tap:()=>setN(st.n===i+1?i:i+1)});}return out;}
  function draw(){bars(top,st.tn,st.td,Zt,['#2f7de1','#7aa8f0'],false);pieces=bars(bot,st.n,st.d,Zb,['#16a36f','#6fd3a4'],true);
    line.position.set(x0+L1*st.tn/st.td,.45,(Zt+Zb)/2);tl.userData.set(st.tn+'/'+st.td);tl.position.set(-2.25,.75,Zt);bl.userData.set(st.n+'/'+st.d);bl.position.set(-2.25,.75,Zb);check();A.redraw();}
  function setN(n){st.n=Math.max(0,Math.min(2*st.d,n));A.pop();draw();}
  function setD(d){const v=st.n/st.d;st.d=d;st.n=Math.min(2*d,Math.round(v*d));draw();}
  function check(){const eq=st.n*st.td===st.tn*st.d&&st.n>0;if(mode!=='play'||!st.need||st.setup)return;
    if(eq&&(st.need.d?st.d===st.need.d:st.d!==st.td))game.solved('Yes! '+st.tn+'/'+st.td+' = '+st.n+'/'+st.d+(st.n>st.d?' = '+mixed(st.n,st.d):'')+'.');}
  draw();
  return {info:()=>st.tn+'/'+st.td+(st.n*st.td===st.tn*st.d?' = ':' ≠ ')+st.n+'/'+st.d,
    controls:()=>DENS.map(d=>({t:'/'+d,on:st.d===d,fn:()=>setD(d)})).concat([{t:'−1',big:true,fn:()=>setN(st.n-1)},{t:'+1 part',big:true,go:true,fn:()=>setN(st.n+1)}],
      mode==='learn'?[{t:'New top bar',fn:()=>{const d=pick([2,3,4,6]);st.td=d;st.tn=rnd(1,2*d-1);draw();}}]:[]),
    demo(n){if(n==='half'){st.tn=1;st.td=2;st.d=2;st.n=1;draw();return;}if(/^d\d+$/.test(n)){setD(+n.slice(1));return;}if(n==='equiv'){st.tn=1;st.td=2;st.d=2;st.n=1;draw();A.seq([[900,()=>{setD(4);A.say('1/2 = 2/4');}],[1500,()=>{setD(6);A.say('1/2 = 3/6');}],[1500,()=>{setD(12);A.say('1/2 = 6/12');}]]);}
      if(n==='mixed'){st.tn=7;st.td=4;st.d=4;st.n=0;draw();const l=[];for(let i=1;i<=7;i++)l.push([450,()=>setN(i)]);l.push([900,()=>A.say('7/4 = 1 whole and 3/4 = 1 3/4')],[1600,()=>{setD(8);A.say('and 14/8 too!');}]);A.seq(l);}},
    task(r){st.setup=true;const T5=[[[1,2,null],[1,3,null],[3,4,null]],[[2,3,12],[1,4,12],[5,6,12]],[[3,4,8],[2,5,10],[1,3,6]],[[5,4,8],[7,6,12],[5,3,6]],[[3,2,6],[7,4,8],[5,2,4]]][r];const t=pick(T5);
      st.tn=t[0];st.td=t[1];st.need={d:t[2]};st.d=2;st.n=0;draw();st.setup=false;
      const top=st.tn>st.td&&r===3?'*'+mixed(st.tn,st.td)+'*':'*'+st.tn+'/'+st.td+'*';
      return t[2]==null?'Find a fraction *equal to '+st.tn+'/'+st.td+'* with a different denominator.':r>=3?'Show '+top+' using *'+['','','halves','thirds','fourths','fifths','sixths','','eighths','','tenths','','twelfths'][t[2]]+'*.':'Show *'+st.tn+'/'+st.td+'* in *'+['','','halves','thirds','fourths','fifths','sixths','','eighths','','tenths','','twelfths'][t[2]]+'*.';}};}
});

/* =========================================================
   3. Comparing and ordering fractions
   ========================================================= */
P.lesson({id:'order5',title:'Comparing and ordering fractions',strand:'Number',codes:['B1.4'],
 guide:{goal:'Compare and order fractions from halves to twelfths, including improper fractions and mixed numbers, using benchmarks, equivalent fractions and a number line.',words:'compare, order, benchmark, greater than, less than, improper fraction, mixed number',
  ask:['Is 5/8 more or less than 1/2? How do you know?','Which is greater, 7/4 or 1 1/2?','How does a number line help you order fractions?'],home:'Share recipes: which is more, 3/4 cup or 2/3 cup? Draw both on a number line to check.'},
 learn:[{say:'Fractions live on the number line.',speech:'Every fraction has a place on the number line. Watch Mateo’s three fractions move to their places: five twelfths, three fourths, and one and one half. Now it is easy to put them in order.',view:'model',demo:'order'},
        {say:'Read about benchmarks.',speech:'Use benchmarks like zero, one half and one. Five twelfths is a bit less than one half. Three fourths is between one half and one. One and one half is more than one.',view:'read'},
        {say:'Watch: same denominator, same numerator.',speech:'With the same denominator, the bigger numerator is greater. With the same numerator, the smaller denominator is greater, because the parts are bigger.',view:'model',demo:'rules'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: tap in order.',speech:'Your turn. Tap the fraction cards from least to greatest. Each one jumps to its place on the number line.',view:'model'}],
 fig:'Fraction cards jump to the number line, and bars show how big each one is.',rz:.35,
 explore:['*Tap the cards* from least to greatest.','Each card jumps onto the *number line* and grows a bar.','Press *New set* for new fractions.'],
 howTo:'Read the question. Tap the fraction cards in order. The bars show if you are right.',
 init:k=>({items:[{n:5,d:12},{n:3,d:4},{n:3,d:2}],placed:[],mode:'asc'}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'To compare fractions, use *benchmarks* (0, 1/2, 1), *equivalent fractions*, or a *number line*.')+16;
  const lx=X0+20,lw=TW-40,toX=v=>lx+v/2*lw;g.strokeStyle=INK;g.lineWidth=4;g.beginPath();g.moveTo(lx,y+70);g.lineTo(lx+lw,y+70);g.stroke();
  [0,.5,1,1.5,2].forEach(v=>{g.beginPath();g.moveTo(toX(v),y+56);g.lineTo(toX(v),y+84);g.stroke();T(g,v===.5?'1/2':v===1.5?'1 1/2':String(v),toX(v),y+118,v%1?FT.small:FT.bodyB,v%1?GREY:INK,'center');});
  [[5/12,'5/12','#2f7de1'],[3/4,'3/4','#e4572e'],[1.5,'3/2','#16a36f']].forEach(([v,t,c])=>{g.beginPath();g.arc(toX(v),y+70,12,0,Math.PI*2);g.fillStyle=c;g.fill();T(g,t,toX(v),y+36,FT.bodyB,c,'center');});y+=150;
  [['Same denominator','5/8 > 3/8','more parts of the same size'],['Same numerator','2/3 > 2/5','thirds are bigger than fifths'],['Improper vs mixed','7/4 > 1 1/2','7/4 = 1 3/4, and 3/4 > 1/2']].forEach(([a,b,c],i)=>{rr(g,X0,y+i*60,TW,52,14);g.fillStyle=tint(acc(),.1);g.fill();
    T(g,a,X0+18,y+i*60+35,FT.smallB,acc());T(g,b,X0+300,y+i*60+35,FT.bodyB);T(g,c,X0+TW-18,y+i*60+35,FT.small,GREY,'right');});y+=196;
  y=keyWords(p,y,[['benchmark','a friendly number to compare with, like 1/2'],['order','arrange from least to greatest']]);
  predict(p,y,S,'p3','Which is greater: 5/6 or 7/12?','*5/6.* 5/6 = 10/12, and 10/12 > 7/12.');},
 readout(p,S,y){const g=p.g,st=S.st;const srt=st.items.slice().sort((a,b)=>a.n/a.d-b.n/b.d);T(g,st.placed.length===st.items.length?srt.map(q=>q.t||q.n+'/'+q.d).join('  <  '):'Placed: '+st.placed.length+' of '+st.items.length,X0,y+50,ZS(44),acc());
  T(g,st.mode==='great'?'Tap the greater fraction.':'Tap from least to greatest.',X0,y+92,FT.bodyB);return y+100;},
 build(S,grp,mode,game){const st=S.st,x0=-2.1,L=1.4,Zl=-.55,ROWS=[-2.6,-2.0,-1.4],COLS=['#2f7de1','#e4572e','#16a36f'];
  numLine(grp,x0,L,Zl,3,4);const cards=new THREE.Group(),barsG=new THREE.Group();grp.add(cards,barsG);let busy=false;
  function draw(){clearGroup(cards);clearGroup(barsG);const k=st.items.length;st.items.forEach((q,i)=>{q.col=COLS[i];const c=new THREE.Group();const b=mk(G('ocard',()=>new THREE.BoxGeometry(1.05,.1,.55)),lam('#ffffff'),20);b.position.y=.05;c.add(b);
      const e=mk(G('ocardE',()=>new THREE.BoxGeometry(1.1,.06,.6)),lam(COLS[i]),0);e.position.y=.02;c.add(e);const l=label(q.t||q.n+'/'+q.d,{size:.32,color:COLS[i]});l.position.y=.38;c.add(l);
      const j=st.placed.indexOf(i);if(j>=0){const v=q.n/q.d;c.position.set(x0+v*L,.0,Zl-.05);c.scale.setScalar(.7);
        const bar=mk(new THREE.BoxGeometry(Math.max(.02,v*L),.22,.42),lam(COLS[i]),20);bar.position.set(x0+v*L/2,.11,ROWS[j]);barsG.add(bar);const bt=label(q.t||q.n+'/'+q.d,{size:.24,bg:'#ffffff',border:COLS[i]});bt.position.set(x0+v*L+.32,.3,ROWS[j]);barsG.add(bt);}
      else c.position.set((i-(k-1)/2)*1.35,0,.12);cards.add(c);A.drag(c,{tap:()=>tapCard(i)});});A.redraw();}
  function order(){return st.items.map((q,i)=>i).sort((a,b)=>st.items[a].n/st.items[a].d-st.items[b].n/st.items[b].d);}
  function tapCard(i){if(busy||st.placed.indexOf(i)>=0)return;const ord=order();
    if(st.mode==='great'){const g2=ord[ord.length-1];if(i===g2){st.placed=ord.slice();draw();A.good('Yes! '+(st.items[i].t||st.items[i].n+'/'+st.items[i].d)+' is greater.');if(mode==='play'&&!st.setup)game.solved('Yes! That one is greater.');}else A.bad('Look again: which is closer to the right end of the line?');return;}
    const want=ord[st.placed.length];if(i!==want){A.bad('Not that one yet. Find the least fraction left.');return;}st.placed.push(i);A.pop();draw();
    if(st.placed.length===st.items.length){A.good(ord.map(k=>st.items[k].t||st.items[k].n+'/'+st.items[k].d).join(' < '));if(mode==='play'&&!st.setup)game.solved('Great ordering!');}}
  function fresh(k,needImp){const pool=[];for(const d of DENS)for(let n=1;n<=Math.min(3*d-1,2.5*d);n++)if(gcd(n,d)===1)pool.push({n,d});let set;
    for(let tries=0;tries<200;tries++){set=shuffle(pool).slice(0,k);const vs=set.map(q=>q.n/q.d);if(new Set(vs.map(v=>v.toFixed(4))).size<k)continue;if(Math.max(...vs)-Math.min(...vs)<.25)continue;if(needImp&&!set.some(q=>q.n>q.d))continue;if(!needImp&&set.some(q=>q.n>q.d*1.2))continue;break;}
    return set.map(q=>({n:q.n,d:q.d,t:needImp&&q.n>q.d&&Math.random()<.5?mixed(q.n,q.d):null}));}
  draw();
  return {info:()=>st.mode==='great'?'Tap the greater fraction':'Tap the cards from least to greatest',
    controls:()=>mode==='learn'?[{t:'New set',go:true,fn:()=>{st.items=fresh(3,Math.random()<.5);st.placed=[];st.mode='asc';draw();}},{t:'Show me',fn:showMe},{t:'Start over',fn:()=>{st.placed=[];draw();}}]:[{t:'Start over',fn:()=>{if(st.mode!=='great'){st.placed=[];draw();}}}],
    demo(n){if(n==='show'){st.items=[{n:3,d:4},{n:5,d:12},{n:3,d:2,t:'1 1/2'}];st.placed=[];st.mode='asc';draw();return;}if(n==='sm'){showMe();return;}if(n==='order'){st.items=[{n:3,d:4},{n:5,d:12},{n:3,d:2,t:'1 1/2'}];st.placed=[];st.mode='asc';draw();showMe();}
      if(n==='rules'){st.items=[{n:5,d:8},{n:3,d:8}];st.placed=[];st.mode='asc';draw();A.seq([[700,()=>tapCard(1)],[900,()=>tapCard(0)],[1500,()=>{st.items=[{n:2,d:3},{n:2,d:5}];st.placed=[];draw();}],[700,()=>tapCard(1)],[900,()=>tapCard(0)]]);}},
    task(r){st.setup=true;st.placed=[];if(r===3){st.mode='great';st.items=fresh(2,true);}else{st.mode='asc';st.items=r===1?(()=>{const n=pick([2,3,5]);return shuffle([3,4,6,8,10,12].filter(d=>d>n)).slice(0,3).map(d=>({n,d}));})():fresh(3,r>=2);}
      draw();st.setup=false;return r===3?'Tap the *greater* fraction.':r===1?'Same numerators! Tap from *least to greatest*.':r>=2?'Order these, with *improper fractions and mixed numbers*: least to greatest.':'Tap the cards from *least to greatest*.';}};
  function showMe(){const ord=order();st.placed=[];draw();busy=true;const l=ord.map(i=>[900,()=>{busy=false;tapCard(i);busy=true;}]);l.push([400,()=>{busy=false;}]);A.seq(l);}}
});

/* =========================================================
   4. Decimals to hundredths
   ========================================================= */
P.lesson({id:'hundredths',title:'Decimal hundredths',strand:'Number',codes:['B1.5'],
 guide:{goal:'Read, represent, compare and order decimal numbers up to hundredths using base-ten models and a number line.',words:'decimal point, tenths, hundredths, flat, rod, compare, order',
  ask:['Why is 0.7 greater than 0.65?','How many hundredths are in 0.3?','How do you read 2.06 aloud?'],home:'Look at prices like $3.49 and race times like 12.68 seconds. Which digit shows tenths? Which shows hundredths?'},
 learn:[{say:'One whole is 100 hundredths.',speech:'A flat is one whole. A rod is one tenth of it. A small cube is one hundredth. Watch Keiko build one and forty-seven hundredths.',view:'model',demo:'build'},
        {say:'Read the place-value chart.',speech:'In one point four seven, the one is one whole, the four is four tenths, and the seven is seven hundredths. We read it: one and forty-seven hundredths.',view:'read'},
        {say:'Watch: 0.7 versus 0.65.',speech:'Which is greater, zero point seven or zero point six five? Watch the number line. Seven tenths is seventy hundredths, which is more than sixty-five hundredths.',view:'model',demo:'compare'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: build decimals.',speech:'Your turn. Add wholes, tenths and hundredths. Trade ten small pieces for one bigger piece.',view:'model'}],
 fig:'Flats, rods and small cubes, with a number line from 0 to 3.',rz:.1,
 explore:['Add *wholes*, *tenths* and *hundredths* with the buttons.','*Tap a piece* to take it away.','Press *Trade* when you have 10 of one piece.'],
 howTo:'Read the decimal. Build it with flats (wholes), rods (tenths) and small cubes (hundredths).',
 init:k=>({w:1,t:4,h:7,target:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'Cut a whole into 10 *tenths*, and each tenth into 10 *hundredths*. So 1 whole = *100 hundredths*.')+16;
  const s=12,ox=X0;for(let r=0;r<10;r++)for(let c=0;c<10;c++){g.fillStyle='#2f7de1';g.fillRect(ox+c*s,y+r*s,s-1,s-1);}
  for(let k=0;k<4;k++)for(let r=0;r<10;r++){g.fillStyle='#16a36f';g.fillRect(ox+140+k*(s+6),y+r*s,s-1,s-1);}
  for(let k=0;k<7;k++){g.fillStyle='#e89a00';g.fillRect(ox+240+(k%4)*(s+4),y+Math.floor(k/4)*(s+4),s,s);}
  T(g,'1.47',X0+340,y+56,ZS(72),acc());T(g,'one and forty-seven hundredths',X0+340,y+104,FT.cap,GREY);y+=150;
  const cw=TW/4;[['Ones','1','#2f7de1'],['.','',INK],['Tenths','4','#16a36f'],['Hundredths','7','#e89a00']].forEach(([a,b,c],i)=>{if(a==='.'){T(g,'.',X0+i*cw+cw/2,y+96,ZS(80),INK,'center');return;}rr(g,X0+i*cw+6,y,cw-12,120,14);g.fillStyle=tint(c,.14);g.fill();T(g,a,X0+i*cw+cw/2,y+34,FT.smallB,c,'center');T(g,b,X0+i*cw+cw/2,y+100,ZS(56),INK,'center');});y+=150;
  y=para(p,y,'To *compare*, line up the decimal points and compare place by place: *0.70 > 0.65* because 7 tenths > 6 tenths.')+12;
  y=keyWords(p,y,[['hundredth','one of 100 equal parts of a whole'],['decimal point','separates the wholes from the parts']]);
  predict(p,y,S,'p4','Order from least to greatest: 0.5, 0.45, 0.54','*0.45, 0.5, 0.54.* Think of them as 45, 50 and 54 hundredths.');},
 readout(p,S,y){const g=p.g,st=S.st,v=st.w*100+st.t*10+st.h;T(g,(v/100).toFixed(2),X0,y+56,ZS(64),acc());T(g,'= '+st.w+' + '+st.t+'/10 + '+st.h+'/100',X0+200,y+36,FT.bodyB);
  T(g,'= '+v+' hundredths',X0+200,y+72,FT.body,GREY);return y+86;},
 build(S,grp,mode,game){const st=S.st,u=.09;const fl=new THREE.Group(),rods=new THREE.Group(),cubes=new THREE.Group();grp.add(fl,rods,cubes);
  [['wholes',-1.75,'#2f7de1'],['tenths',-.25,'#16a36f'],['hundredths',1.45,'#e89a00']].forEach(([t,x,c])=>{const l=label(t,{size:.18,color:c});l.position.set(x,.3,-3.05);grp.add(l);});
  const x0=-2.1,L=1.4,Zl=-.3;numLine(grp,x0,L,Zl,3,10);
  const mkr=mk(new THREE.ConeGeometry(.11,.26,18),lam('#e4572e'),0);mkr.rotation.x=Math.PI;grp.add(mkr);const ml=label('',{size:.22,bg:'#ffffff'});grp.add(ml);
  const flatGeo=G('flat5',()=>new THREE.BoxGeometry(u*10,u,u*10)),rodGeo=G('rod5',()=>new THREE.BoxGeometry(u,u,u*10)),cubeGeo=G('cub5',()=>new THREE.BoxGeometry(u*.95,u*.95,u*.95));
  const flatMat=[lam('#2f7de1'),lam('#2f7de1'),cellMat('#2f7de1',10,10),lam('#2f7de1'),lam('#2f7de1'),lam('#2f7de1')],rodMat=[lam('#16a36f'),lam('#16a36f'),cellMat('#16a36f',1,10),lam('#16a36f'),lam('#16a36f'),lam('#16a36f')];
  function render(){clearGroup(fl);clearGroup(rods);clearGroup(cubes);
    for(let i=0;i<st.w;i++){const m=mk(flatGeo,flatMat,20);m.position.set(-1.75,u/2+.02,-2.45+i*.95);fl.add(m);A.drag(m,{tap:()=>change(-1,0,0)});}
    for(let i=0;i<st.t;i++){const m=mk(rodGeo,rodMat,20);m.position.set(-.75+(i%10)*u*1.12,u/2+.02,i<10?-2.45:-1.45);rods.add(m);A.drag(m,{tap:()=>change(0,-1,0)});}
    for(let i=0;i<st.h;i++){const m=mk(cubeGeo,lam('#e89a00'),20);m.position.set(1.05+(i%5)*u*1.35,u/2+.02,-2.85+Math.floor(i/5)*u*1.35);cubes.add(m);A.drag(m,{tap:()=>change(0,0,-1)});}
    const v=(st.w*100+st.t*10+st.h)/100;mkr.position.set(x0+v*L,.4,Zl);ml.userData.set(v.toFixed(2));ml.position.set(x0+v*L,.82,Zl);check();A.redraw();}
  function change(dw,dt,dh){const w=st.w+dw,t=st.t+dt,h=st.h+dh;if(w<0||t<0||h<0)return;if(w>3){A.bad('The mat holds 3 wholes.');return;}if(t>19||h>19){A.bad('Trade 10 for 1 bigger piece first!');return;}
    if(w*100+t*10+h>300){A.bad('The number line stops at 3.');return;}st.w=w;st.t=t;st.h=h;A.pop();if((dh>0&&h===10)||(dt>0&&t===10))A.say('10 pieces! Press Trade.');render();}
  function trade(){if(st.h>=10){st.h-=10;st.t++;A.good('10 hundredths = 1 tenth!');}else if(st.t>=10){if(st.w>=3){A.bad('The whole mat is full.');return;}st.t-=10;st.w++;A.good('10 tenths = 1 whole!');}else{A.bad('You need 10 of a piece to trade.');return;}render();}
  function check(){if(mode==='play'&&!st.setup&&st.target!=null&&st.w*100+st.t*10+st.h===st.target&&st.t<10&&st.h<10)game.solved('Yes! That is '+(st.target/100).toFixed(2)+'.');}
  render();
  return {info:()=>((st.w*100+st.t*10+st.h)/100).toFixed(2),
    controls:()=>[{t:'+1',big:true,fn:()=>change(1,0,0)},{t:'+0.1',big:true,fn:()=>change(0,1,0)},{t:'+0.01',big:true,go:true,fn:()=>change(0,0,1)},{t:'Trade 10 → 1',fn:trade,dis:st.h<10&&st.t<10},{t:'Clear',fn:()=>{st.w=0;st.t=0;st.h=0;render();}}],
    demo(n){if(n==='show'){st.w=1;st.t=4;st.h=7;render();return;}if(n==='build'){st.w=0;st.t=0;st.h=0;render();A.seq([[600,()=>{change(1,0,0);A.say('1 whole');}],[1100,()=>{for(let i=0;i<4;i++)change(0,1,0);A.say('4 tenths');}],[1200,()=>{for(let i=0;i<7;i++)change(0,0,1);A.say('7 hundredths: 1.47');}]]);}
      if(n==='compare'){st.w=0;st.t=6;st.h=5;render();A.seq([[600,()=>A.say('0.65')],[1600,()=>{st.t=7;st.h=0;render();A.say('0.7 = 0.70. It is further right, so 0.7 > 0.65.');}]]);}},
    task(r){st.setup=true;st.w=0;st.t=0;st.h=0;let txt,v;
      if(r===0){v=rnd(1,2)*100+rnd(1,9)*10+rnd(1,9);txt='Build *'+(v/100).toFixed(2)+'*.';}
      else if(r===1){const w=rnd(1,2),h=rnd(1,9);v=w*100+h;txt='Build *'+ONES[w]+' and '+ONES[h]+' hundredths*.';}
      else if(r===2){v=rnd(11,99);if(v%10===0)v++;txt='Show *'+v+'/100* as a decimal.';}
      else if(r===3){const t=rnd(3,8),h=rnd(1,9);v=t*10;txt='Build the *greater* number: *0.'+(t-1)+h+'* or *0.'+t+'*.';}
      else{const a=rnd(11,28);v=a*10+5;txt='Build the number *halfway* between *'+(a/10).toFixed(1)+'* and *'+((a+1)/10).toFixed(1)+'*.';}
      st.target=v;render();st.setup=false;return txt;}};}
});

/* =========================================================
   5. Rounding decimals to the nearest tenth
   ========================================================= */
P.lesson({id:'round5',title:'Rounding to the nearest tenth',strand:'Number',codes:['B1.6'],
 guide:{goal:'Round decimal numbers with hundredths to the nearest tenth, and explain when rounding is useful.',words:'round, nearest tenth, halfway, hundredths, estimate',
  ask:['Why does 4.25 round up to 4.3?','Which two tenths is 7.83 between?','When would a coach round a race time to the nearest tenth?'],home:'Look at gas prices or race times. Round them to the nearest tenth together.'},
 learn:[{say:'Find the two tenths on each side.',speech:'Jordan’s plant is three point four seven centimetres. That is between three point four and three point five. The ball rolls to the nearer valley. Watch.',view:'model',demo:'roll'},
        {say:'Read the rounding rule.',speech:'To round to the nearest tenth, look at the hundredths digit. Zero to four, round down. Five to nine, round up.',view:'read'},
        {say:'Watch: exactly halfway.',speech:'Six point two five is exactly halfway between six point two and six point three. When it is halfway, we round up.',view:'model',demo:'half'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: tap a valley.',speech:'Your turn. Tap the valley where you think the ball will stop, then watch it roll.',view:'model'}],
 fig:'A hill between two tenths. The ball rolls to the nearest one.',rz:-.15,
 explore:['*Tap a yellow pad* to say where the ball will stop.','Press *New number* to try again.','The hundredths digit tells which way it rolls.'],
 howTo:'Read the number. Tap the pad (or button) for the tenth you think is nearest. The ball rolls to show the answer.',
 init:k=>({n:347,picked:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'To round to the *nearest tenth*, find the two tenths on each side, then see which one is closer.')+16;
  const lx=X0+30,lw=TW-60,toX=v=>lx+(v-340)/10*lw;g.strokeStyle=INK;g.lineWidth=4;g.beginPath();g.moveTo(lx,y+110);g.quadraticCurveTo(lx+lw/2,y-20,lx+lw,y+110);g.stroke();
  for(let k=0;k<=10;k++){const x=toX(340+k);g.beginPath();g.moveTo(x,y+150);g.lineTo(x,y+(k%5?160:170));g.stroke();}
  [[340,'3.4'],[345,'halfway 3.45'],[350,'3.5']].forEach(([v,t],i)=>T(g,t,toX(v),y+200,i===1?FT.small:FT.bodyB,i===1?GREY:INK,'center'));
  const bx=toX(347);g.beginPath();g.arc(bx,y+50,18,0,Math.PI*2);g.fillStyle='#e4572e';g.fill();T(g,'3.47',bx,y+14,FT.smallB,'#e4572e','center');T(g,'rolls this way →',bx-200,y+82,FT.hand,BLUE);y+=236;
  rr(g,X0,y,TW,120,18);g.fillStyle=tint(acc(),.1);g.fill();T(g,'Look at the hundredths digit:',X0+24,y+42,FT.smallB);
  T(g,'0, 1, 2, 3, 4  →  round down',X0+24,y+82,FT.body,BLUE);T(g,'5, 6, 7, 8, 9  →  round up',X0+430,y+82,FT.body,'#e4572e');y+=150;
  y=keyWords(p,y,[['nearest tenth','the closest number with one decimal place'],['halfway','exactly in the middle, like 3.45: round up']]);
  predict(p,y,S,'p5','A runner finished in 12.96 seconds. Round to the nearest tenth.','*13.0 seconds.* 12.96 is between 12.9 and 13.0, and the hundredths digit is 6.');},
 readout(p,S,y){const g=p.g,st=S.st,lo=Math.floor(st.n/10)*10,hi=lo+10,ans=st.n-lo>=5?hi:lo;
  T(g,(st.n/100).toFixed(2)+' → nearest tenth',X0,y+42,ZS(44),acc());T(g,'between '+(lo/100).toFixed(1)+' and '+(hi/100).toFixed(1)+(st.picked==null?'':'   ·   rounds to '+(ans/100).toFixed(1)),X0,y+84,FT.bodyB);return y+94;},
 build(S,grp,mode,game){const st=S.st,Z=-1.55,L=4.0,H=1.05;const yOf=u=>H*(1-Math.cos(2*Math.PI*u))/2,xOf=u=>-L/2+L*u;
  const pts=[];for(let i=0;i<=60;i++){const u=i/60;pts.push(V(xOf(u),.12+yOf(u),Z));}
  const track=mk(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts),120,.07,10,false),lam('#b9a7f5'),0);grp.add(track);
  for(let i=0;i<=10;i++){const u=i/10;const post=mk(new THREE.CylinderGeometry(.02,.02,.12+yOf(u),6),lam(i%5?'#cbd':'#7c3aed'),0);post.position.set(xOf(u),(.12+yOf(u))/2,Z);grp.add(post);}
  const base=mk(new THREE.BoxGeometry(L+.4,.05,.5),lam('#ede6ff'),20);base.position.set(0,.025,Z);grp.add(base);
  const ball=mk(new THREE.SphereGeometry(.17,24,16),lam('#e4572e'),0);grp.add(ball);const flag=label('',{size:.3,bg:'#ffffff'});grp.add(flag);
  const vl=[label('',{size:.3,bg:'#ffffff',border:'#7c3aed'}),label('',{size:.3,bg:'#ffffff',border:'#7c3aed'})],mid=label('',{size:.2,color:GREY});vl.forEach(l=>grp.add(l));grp.add(mid);
  const pads=[-1,1].map(s=>{const pd=mk(new THREE.CylinderGeometry(.3,.3,.06,28),lam('#ffd24a'),30);pd.position.set(s*(L/2+.02),.06,Z+.55);grp.add(pd);return pd;});
  let u=0,rolling=false;const lohi=()=>{const lo=Math.floor(st.n/10)*10;return [lo,lo+10];};
  function place(){const [lo,hi]=lohi();u=(st.n-lo)/10;const p=V(xOf(u),.12+yOf(u)+.24,Z);ball.position.copy(p);flag.userData.set((st.n/100).toFixed(2));flag.position.set(p.x,p.y+.55,Z);
    vl[0].userData.set((lo/100).toFixed(1));vl[0].position.set(xOf(0),.55,Z+.55);vl[1].userData.set((hi/100).toFixed(1));vl[1].position.set(xOf(1),.55,Z+.55);mid.userData.set('halfway '+((lo+5)/100).toFixed(2));mid.position.set(0,1.62,Z);}
  function roll(cb){if(rolling)return;rolling=true;const tgtU=u>=.5?1:0,u0=u;const dur=.7+Math.abs(tgtU-u0)*1.2;
    tween(dur,k=>{u=u0+(tgtU-u0)*k;ball.position.set(xOf(u),.12+yOf(u)+.24,Z);ball.rotation.z-=(tgtU>u0?1:-1)*.12;flag.position.set(ball.position.x,ball.position.y+.55,Z);},x=>x*x*(3-2*x)).then(()=>{rolling=false;if(cb)cb(tgtU===1);});}
  function choose(up){if(rolling)return;st.picked=up;A.redraw();const [lo,hi]=lohi();roll(isUp=>{const ans=((isUp?hi:lo)/100).toFixed(1);
    if(up===isUp){A.good((st.n/100).toFixed(2)+' rounds to '+ans+'.');if(mode==='play')game.solved((st.n/100).toFixed(2)+' rounds to '+ans+'.');}
    else{A.bad('It rolled the other way. '+(st.n/100).toFixed(2)+' rounds to '+ans+'.');A.later(()=>{if(mode==='play'){place();A.redraw();}},1600);}A.redraw();});}
  pads.forEach((pd,i)=>A.drag(pd,{tap:()=>choose(i===1)}));
  function fresh(){st.n=rnd(10,99)*10+rnd(1,9);st.picked=null;place();A.redraw();}
  place();
  return {info:()=>'Round '+(st.n/100).toFixed(2)+' to the nearest tenth',
    controls:()=>{const [lo,hi]=lohi();const c=[{t:'Round down to '+(lo/100).toFixed(1),big:true,fn:()=>choose(false)},{t:'Round up to '+(hi/100).toFixed(1),big:true,fn:()=>choose(true)}];return mode==='learn'?c.concat([{t:'New number',go:true,fn:fresh}]):c;},
    demo(n){if(n==='r347'){st.n=347;st.picked=null;place();A.redraw();return;}if(n==='rollnow'){roll();return;}if(n==='roll'){st.n=347;st.picked=null;place();A.seq([[900,()=>roll(()=>A.say('3.47 rounds up to 3.5.'))]]);}
      if(n==='half'){st.n=625;st.picked=null;place();A.redraw();A.seq([[1100,()=>roll(()=>A.say('Halfway rounds up: 6.25 rounds to 6.3.'))]]);}},
    task(r){st.n=r===3?rnd(10,99)*10+5:rnd(10,199)*10+pick([1,2,3,4,6,7,8,9]);st.picked=null;place();const v=(st.n/100).toFixed(2);
      return r===1?'A runner took *'+v+' s*. Round the time to the nearest *tenth*.':r===4?'A bottle holds *'+v+' L*. About how many litres, to the nearest *tenth*?':'Round *'+v+'* to the nearest *tenth*.';}};}
});

/* =========================================================
   6. Fractions, decimals and percents
   ========================================================= */
const PCT=[[1,2],[1,4],[3,4],[1,5],[2,5],[3,5],[4,5],[1,10],[3,10],[7,10],[9,10],[1,20],[3,20],[7,20],[1,25],[3,25],[1,50]];
P.lesson({id:'percent5',title:'Fractions, decimals and percents',strand:'Number',codes:['B1.7'],
 guide:{goal:'Describe relationships and show equivalences among fractions, decimal numbers up to hundredths, and whole-number percents, using a hundred grid.',words:'percent, per cent, hundredths, equivalent, fraction, decimal',
  ask:['Why does 1/4 equal 25%?','How can you write 0.6 as a percent?','What does 100% of the grid mean?'],home:'Find percents in a store or on a phone battery. Shade a hundred grid on paper to show 50%, 25% and 10%.'},
 learn:[{say:'Percent means out of 100.',speech:'Percent means out of one hundred. Watch Amani’s grid fill twenty-five squares out of one hundred. That is twenty-five hundredths, zero point two five, or twenty-five percent.',view:'model',demo:'quarter'},
        {say:'Read the equivalents.',speech:'One quarter of the grid is twenty-five squares. So one quarter equals zero point two five equals twenty-five percent. One half is fifty percent.',view:'read'},
        {say:'Watch: tenths become percents.',speech:'Watch three tenths. Three full rows of ten are thirty squares, so three tenths is zero point three, which is thirty percent.',view:'model',demo:'tenths'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: shade the grid.',speech:'Your turn. Tap a square to shade up to it, or use the buttons. Watch the fraction, decimal and percent change.',view:'model'}],
 fig:'A hundred grid. Each square is 1 hundredth, or 1 percent.',rz:.15,
 explore:['*Tap a square* to shade up to it.','Use *+10* and *+1* to shade rows and squares.','Read the *fraction, decimal and percent* above the grid.'],
 howTo:'Read the amount. Shade that many squares out of 100.',
 init:k=>({n:25,target:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'*Percent* means *out of 100*. The symbol is *%*. A hundred grid shows fractions, decimals and percents together.')+16;
  const s=20;for(let r=0;r<10;r++)for(let c=0;c<10;c++){g.fillStyle=r*10+c<25?'#2f7de1':'#e9eef7';g.fillRect(X0+c*s,y+r*s,s-2,s-2);}
  T(g,'1/4 = 25/100',X0+240,y+60,ZS(40));T(g,'= 0.25 = 25%',X0+240,y+120,ZS(40),acc());T(g,'25 squares out of 100',X0+240,y+170,FT.small,GREY);y+=230;
  const rows=[['1/2','0.5','50%'],['1/4','0.25','25%'],['3/4','0.75','75%'],['1/5','0.2','20%'],['1/10','0.1','10%']];
  rr(g,X0,y,TW,44,12);g.fillStyle=tint(acc(),.16);g.fill();['Fraction','Decimal','Percent'].forEach((h,i)=>T(g,h,X0+TW/6+i*TW/3,y+31,FT.smallB,acc(),'center'));y+=50;
  rows.forEach((r,j)=>{r.forEach((v,i)=>T(g,v,X0+TW/6+i*TW/3,y+j*40+28,FT.bodyB,INK,'center'));});y+=rows.length*40+18;
  y=keyWords(p,y,[['percent','a part out of 100'],['equivalent','the same amount written a different way']]);
  predict(p,y,S,'p6','Write 0.6 as a fraction and as a percent.','*6/10 (or 60/100) and 60%.* 6 tenths is 60 hundredths.');},
 readout(p,S,y){const g=p.g,st=S.st,k=gcd(st.n,100)||1;T(g,st.n+'/100 = '+(st.n/100).toFixed(2)+' = '+st.n+'%',X0,y+52,ZS(48),acc());
  T(g,st.n&&k>1&&st.n<100?'In lowest terms: '+(st.n/k)+'/'+(100/k):st.n===100?'The whole grid: 100%':' ',X0,y+92,FT.bodyB);return y+100;},
 build(S,grp,mode,game){const st=S.st,u=.28,x0=-1.4,z0=-3.0;const tiles=[];const big=label('',{size:.34,bg:'#ffffff'});big.position.set(0,1.55,-3.1);grp.add(big);
  const base=mk(new THREE.BoxGeometry(u*10+.12,.04,u*10+.12),lam('#dfe5ef'),20);base.position.set(0,.02,z0+u*5);grp.add(base);
  const RC=['#2f7de1','#3b8be6','#16a36f','#22b07c','#e4572e','#e8603c','#e89a00','#f0a91c','#8b5cf6','#9a6cf8'];
  for(let k=0;k<100;k++){const r=Math.floor(k/10),c=k%10;const m=mk(G('pc5',()=>new THREE.BoxGeometry(u*.9,.08,u*.9)),lam('#f4f6fa'),20);m.position.set(x0+(c+.5)*u,.08,z0+(r+.5)*u);grp.add(m);tiles.push(m);A.drag(m,{tap:()=>setN(st.n===k+1?k:k+1)});}
  function draw(anim){tiles.forEach((m,k)=>{const on=k<st.n;m.material=lam(on?RC[Math.floor(k/10)]:'#f4f6fa');const y=on?.14:.08;if(anim)moveTo(m,{pos:V(m.position.x,y,m.position.z),k:12});else m.position.y=y;});
    big.userData.set(st.n+'/100 = '+(st.n/100).toFixed(2)+' = '+st.n+'%');check();A.redraw();}
  function setN(n){st.n=Math.max(0,Math.min(100,n));A.pop();draw(true);}
  function check(){if(mode==='play'&&!st.setup&&st.target!=null&&st.n===st.target)game.solved('Yes! '+st.n+'/100 = '+(st.n/100).toFixed(2)+' = '+st.n+'%.');}
  draw(false);
  return {info:()=>st.n+'% shaded',
    controls:()=>[{t:'−10',fn:()=>setN(st.n-10)},{t:'−1',fn:()=>setN(st.n-1)},{t:'+1',big:true,fn:()=>setN(st.n+1)},{t:'+10',big:true,go:true,fn:()=>setN(st.n+10)},{t:'Clear',fn:()=>setN(0)}],
    demo(n){if(n==='clear'){st.n=0;draw(false);return;}if(/^n\d+$/.test(n)){setN(+n.slice(1));return;}if(n==='quarter'){st.n=0;draw(false);A.seq([[600,()=>setN(10)],[500,()=>setN(20)],[500,()=>setN(25)],[900,()=>A.say('25 out of 100 = 0.25 = 25% = 1/4')]]);}
      if(n==='tenths'){st.n=0;draw(false);A.seq([[600,()=>setN(10)],[600,()=>setN(20)],[600,()=>setN(30)],[900,()=>A.say('3/10 = 0.3 = 30%')]]);}},
    task(r){st.setup=true;st.n=0;draw(false);let txt;const f=pick(PCT);const v=f[0]*100/f[1];
      if(r===0){st.target=v;txt='Shade *'+f[0]+'/'+f[1]+'* of the grid.';}
      else if(r===1){const t=rnd(1,9);st.target=t*10;txt='Show *0.'+t+'*.';}
      else if(r===2){st.target=rnd(11,89);if(st.target%10===0)st.target++;txt='Show *'+st.target+'%*.';}
      else if(r===3){st.target=rnd(1,9);txt='Show *0.0'+st.target+'*. Careful!';}
      else{st.target=pick([50,25,75,20,40]);const fr={50:'1/2',25:'1/4',75:'3/4',20:'1/5',40:'2/5'}[st.target];txt='What percent is *'+fr+'*? Shade it.';}
      st.setup=false;return txt;}};}
});

/* =========================================================
   7. Properties and facts to 12 × 12
   ========================================================= */
P.lesson({id:'facts12',title:'Facts to 12 × 12 and properties',strand:'Number',codes:['B2.2','B2.1'],
 guide:{goal:'Recall and demonstrate multiplication facts to 12 × 12 and related division facts, and use the commutative, associative and distributive properties to solve problems and check calculations.',words:'factor, product, array, commutative, associative, distributive, inverse operation',
  ask:['How can 10 × 7 help you find 12 × 7?','Why is 4 × 9 the same as 9 × 4?','How does multiplying check 132 ÷ 11 = 12?'],home:'Make arrays with egg cartons (2 × 6) or muffin tins (3 × 4). Find the related division facts.'},
 learn:[{say:'Arrays up to 12 by 12.',speech:'An array has equal rows. Zane’s band has twelve rows of seven. That is twelve times seven. Watch the array grow.',view:'model',demo:'grow'},
        {say:'Read the properties.',speech:'You can turn an array around: that is the commutative property. You can split it into easier parts: that is the distributive property. And you can group factors any way: that is the associative property.',view:'read'},
        {say:'Watch: split twelve into ten and two.',speech:'Twelve times seven is ten times seven plus two times seven. Seventy plus fourteen is eighty-four.',view:'model',demo:'split'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: drag the corner.',speech:'Your turn. Drag the yellow corner to make any array up to twelve by twelve. Try Turn and Split.',view:'model'}],
 fig:'A 12 by 12 array. The yellow corner sets the rows and columns.',rz:.45,
 explore:['*Drag the yellow corner* or use the buttons.','*Turn* it: 8 × 11 = 11 × 8.','*Split* the rows to break a hard fact into easy ones.'],
 howTo:'Make the array the question asks for. Drag the yellow corner or use the row and column buttons.',
 init:k=>({r:12,c:7,split:false,want:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'Facts to *12 × 12* come from arrays. Use the *properties* to turn hard facts into easy ones, and use the *inverse* operation to check.')+16;
  [['Commutative','8 × 11 = 11 × 8','turn the array'],['Associative','(2 × 6) × 5 = 2 × (6 × 5)','group any way'],['Distributive','12 × 7 = 10 × 7 + 2 × 7','split a factor'],['Inverse','132 ÷ 11 = 12, so 11 × 12 = 132','check']].forEach(([a,b,c],i)=>{rr(g,X0,y+i*62,TW,54,14);g.fillStyle=tint(acc(),.1);g.fill();
    T(g,a,X0+18,y+i*62+36,FT.smallB,acc());T(g,b,X0+210,y+i*62+36,FT.bodyB);T(g,c,X0+TW-18,y+i*62+36,FT.small,GREY,'right');});y+=268;
  const s=18;for(let r=0;r<6;r++)for(let c=0;c<12;c++){g.fillStyle=c<10?'#2f7de1':'#f08a24';g.fillRect(X0+c*(s+3)+(c>=10?10:0),y+r*(s+3),s,s);}
  T(g,'6 × 12 = 6 × 10 + 6 × 2 = 60 + 12 = 72',X0+290,y+70,FT.bodyB);y+=150;
  y=para(p,y,'*More than one operation?* Do the operations in brackets first: (3 + 4) × 5 = 35, but 3 + 4 × 5 = 23.')+10;
  y=keyWords(p,y,[['distributive property','split a factor and multiply each part'],['inverse operations','operations that undo each other, like × and ÷']]);
  predict(p,y,S,'p7','If 11 × 9 = 99, what is 12 × 9?','*108.* One more group of 9: 99 + 9 = 108.');},
 readout(p,S,y){const g=p.g,st=S.st,pr=st.r*st.c,sp=st.r>10?10:5;T(g,st.r+' × '+st.c+' = '+pr,X0,y+52,ZS(56),acc());
  T(g,st.split&&st.r>sp?'= '+sp+' × '+st.c+' + '+(st.r-sp)+' × '+st.c+' = '+sp*st.c+' + '+(st.r-sp)*st.c:pr+' ÷ '+st.r+' = '+st.c+'   ·   '+pr+' ÷ '+st.c+' = '+st.r,X0,y+94,FT.bodyB);return y+104;},
 build(S,grp,mode,game){const st=S.st,u=.24,N=12,Z0=-3.0,x0=-1.3;
  const base=mk(new THREE.BoxGeometry(u*N+.12,.03,u*N+.12),[lam('#eef2f8'),lam('#eef2f8'),cellMat('#f6f8fc',N,N),lam('#eef2f8'),lam('#eef2f8'),lam('#eef2f8')],20);base.position.set(x0+u*N/2,.015,Z0+u*N/2);grp.add(base);
  const arr=new THREE.Group();grp.add(arr);const cg=G('f12cube',()=>new THREE.BoxGeometry(u*.86,u*.86,u*.86));
  const corner=mk(new THREE.SphereGeometry(.13,16,12),lam('#ffd24a'),0);grp.add(corner);
  const lr=label('',{size:.24,color:'#2f7de1'}),lc=label('',{size:.24,color:'#e4572e'});grp.add(lr,lc);
  const sp=()=>st.r>10?10:5;
  function rebuild(drop){clearGroup(arr);const s=sp();for(let r=0;r<st.r;r++)for(let c=0;c<st.c;c++){const lo=st.split&&r>=s;const m=mk(cg,lam(lo?'#f08a24':'#2f7de1'),20);
      const p=V(x0+(c+.5)*u,.03+u*.43,Z0+(r+.5)*u+(lo?.14:0));m.position.copy(p);if(drop){m.position.y+=.5+(r*st.c+c)*.003;moveTo(m,{pos:p,k:12});}arr.add(m);}
    corner.position.set(x0+st.c*u,.3,Z0+st.r*u+(st.split&&st.r>s?.14:0));lr.userData.set(st.r+' rows');lr.position.set(x0-.5,.35,Z0+st.r*u/2);lc.userData.set(st.c+' columns');lc.position.set(x0+st.c*u/2,.35,Z0-.22);}
  function chk(){if(mode==='play'&&!st.setup&&st.want&&st.want(st.r,st.c))game.solved(st.r+' × '+st.c+' = '+st.r*st.c+'!');}
  function set(r,c,quiet){r=Math.max(1,Math.min(N,r));c=Math.max(1,Math.min(N,c));if(r===st.r&&c===st.c&&!quiet)return;st.r=r;st.c=c;rebuild(true);A.pop();chk();A.redraw();}
  A.drag(corner,{h:.3,drop:pos=>{set(Math.round((pos.z-Z0)/u),Math.round((pos.x-x0)/u));rebuild(false);}});
  function turn(){const r=st.r,c=st.c;st.r=c;st.c=r;rebuild(true);A.say(r+' × '+c+' = '+c+' × '+r+' = '+r*c);chk();A.redraw();}
  rebuild(false);
  return {info:()=>st.r+' × '+st.c+' = '+st.r*st.c+'  (drag the yellow corner)',
    controls:()=>[{t:'Rows −',fn:()=>set(st.r-1,st.c)},{t:'Rows +',go:true,fn:()=>set(st.r+1,st.c)},{t:'Cols −',fn:()=>set(st.r,st.c-1)},{t:'Cols +',go:true,fn:()=>set(st.r,st.c+1)},{t:'Turn ↻',fn:turn},{t:st.split?'Split: on':'Split',on:st.split,fn:()=>{st.split=!st.split;rebuild(true);A.redraw();}}],
    demo(n){if(n==='show'){st.split=false;set(12,7,true);return;}if(n==='splitnow'){st.split=true;rebuild(true);A.redraw();return;}if(n==='grow'){st.split=false;st.r=1;st.c=7;rebuild(false);const l=[];for(let r=2;r<=12;r++)l.push([350,()=>set(r,7)]);l.push([800,()=>A.say('12 rows of 7 = 84')]);A.seq(l);}
      if(n==='split'){st.r=12;st.c=7;st.split=false;rebuild(false);A.seq([[800,()=>{st.split=true;rebuild(true);A.redraw();}],[1400,()=>A.say('10 × 7 = 70 and 2 × 7 = 14. 70 + 14 = 84.')]]);}},
    task(r){st.setup=true;st.split=false;st.r=1;st.c=1;rebuild(false);let txt;
      if(r===0){const a=rnd(11,12),b=rnd(6,12);st.want=(x,y)=>(x===a&&y===b)||(x===b&&y===a);txt='Show *'+a+' × '+b+'*. What is the product?';}
      else if(r===1){const a=rnd(6,12),b=pick([11,12]);st.want=(x,y)=>(x===b&&y===a)||(x===a&&y===b);txt='Find □:  *□ × '+b+' = '+a*b+'*. Make the array.';}
      else if(r===2){const s=pick([11,12]);st.want=(x,y)=>x===s&&y===s;txt='Make *'+s*s+'* as a *square* array.';}
      else if(r===3){const d=pick([11,12]),q=rnd(5,12);st.want=(x,y)=>x===d&&y===q;txt='Show *'+d*q+' ÷ '+d+'*: make *'+d+' rows*. How many in each row?';}
      else{const a=rnd(6,9);st.want=(x,y)=>(x===12&&y===a)||(x===a&&y===12);txt='*10 × '+a+' + 2 × '+a+'* is the same as which array? Make it.';}
      st.setup=false;return txt;}};}
});
})();
