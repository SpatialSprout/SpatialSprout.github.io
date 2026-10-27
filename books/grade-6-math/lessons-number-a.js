/* The Interactive Classroom: Grade 6 Math — Number, part A (lessons 1–7) */
(function(){
"use strict";
const P=window.PM;if(!P||P.failed||!P.THREE)return;
const {THREE,V,W,D,PY,PX,X0,TW,INK,RED,BLUE,GREY,VIBE,FT,ZS,G,M,lam,mk,unitBox,cellMat,label,starGeo,wedgeGeo,clearGroup,disposeObj,rr,T,wrap,para,header,keyWords,predict,box,caption,cxOf,cyOf,tint,moveTo,hop,tween,burst,easeOut,easeIO,A}=P;
const acc=()=>P.ACC;
const rnd=(a,b)=>a+Math.floor(Math.random()*(b-a+1)),pick=a=>a[Math.floor(Math.random()*a.length)],shuffle=a=>a.slice().sort(()=>Math.random()-.5);
const sp=s=>s.replace(/\B(?=(\d{3})+(?!\d))/g,' ');
const fmt=n=>{const neg=n<0;const s=String(Math.abs(n));const [i,f]=s.split('.');const ii=i.length>=5?sp(i):i;return (neg?'−':'')+ii+(f!=null?'.'+f:'');};
const ONES=['zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'];
const TENS=['','','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety'];
const words=n=>n<20?ONES[n]:n<100?TENS[Math.floor(n/10)]+(n%10?'-'+ONES[n%10]:''):n<1000?ONES[Math.floor(n/100)]+' hundred'+(n%100?' '+words(n%100):''):n<1000000?words(Math.floor(n/1000))+' thousand'+(n%1000?' '+words(n%1000):''):n===1000000?'one million':String(n);
const gcd=(a,b)=>b?gcd(b,a%b):a;
function choices(game,list,ans,ok,lab){return list.map(o=>({t:lab?lab(o):String(o),big:true,fn:()=>{if(o===ans){if(game)game.solved(ok);else A.good(ok);}else A.bad('Not quite. Try again!');}}));}
function opts(ans,spread,min){const s=new Set([ans]);let k=0;while(s.size<3&&k<60){k++;const v=Math.round((ans+pick(spread))*1000)/1000;if(v>=(min==null?0:min))s.add(v);}return shuffle([...s]);}
function diskMat(text,col){return M('d6'+text+col,()=>{const c=document.createElement('canvas');c.width=c.height=128;const g=c.getContext('2d');g.fillStyle=col;g.fillRect(0,0,128,128);
  g.strokeStyle='rgba(255,255,255,.75)';g.lineWidth=6;g.beginPath();g.arc(64,64,54,0,Math.PI*2);g.stroke();g.fillStyle='#fff';g.font='700 '+(text.length>6?22:text.length>4?27:text.length>3?34:text.length>2?42:56)+'px "Atkinson Hyperlegible", sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText(text,64,68);
  const t=new THREE.CanvasTexture(c);t.anisotropy=4;return new THREE.MeshLambertMaterial({map:t});});}
function disk(text,col,r){const geo=G('d6disk'+r,()=>new THREE.CylinderGeometry(r,r,.07,28));return mk(geo,[lam(col),diskMat(text,col),lam(col)],30);}
function drawFrac(g,n,d,x,y,size,col){g.font=ZS(size);const w=Math.max(g.measureText(String(n)).width,g.measureText(String(d)).width);T(g,String(n),x+w/2,y-size*.18,ZS(size),col||INK,'center');
  g.fillStyle=col||INK;g.fillRect(x-4,y-size*.02,w+8,Math.max(3,size*.06));T(g,String(d),x+w/2,y+size*.82,ZS(size),col||INK,'center');return w+8;}
function numLine(grp,x0,L,z,a,b,sub,lab){const tr=mk(new THREE.BoxGeometry(L*(b-a)+.1,.05,.12),lam('#cbd5e6'),0);tr.position.set(x0+L*(b-a)/2,.03,z);grp.add(tr);
  for(let k=a*sub;k<=b*sub;k++){const big=k%sub===0;const t=new THREE.Mesh(G('nl6'+big,()=>new THREE.BoxGeometry(.016,big?.22:.1,.016)),lam(INK));t.position.set(x0+(k/sub-a)*L,.05+(big?.11:.05),z);grp.add(t);
    if(big&&(!lab||lab(k/sub))){const v=k/sub;const l=label(v<0?'−'+(-v):String(v),{size:.24,color:v<0?'#2563eb':v>0?'#dc2626':INK});l.position.set(x0+(v-a)*L,.42,z+.28);grp.add(l);}}}

/* =========================================================
   1. Whole numbers to one million
   ========================================================= */
const PV=[{k:'ht',n:'Hundred thousands',s:'100 000s',v:100000,txt:'100 000',col:'#c2410c',max:10},{k:'tt',n:'Ten thousands',s:'10 000s',v:10000,txt:'10 000',col:'#8b5cf6',max:12},{k:'th',n:'Thousands',s:'1000s',v:1000,txt:'1000',col:'#16a36f',max:12},
  {k:'h',n:'Hundreds',s:'100s',v:100,txt:'100',col:'#2f7de1',max:12},{k:'t',n:'Tens',s:'10s',v:10,txt:'10',col:'#e2457a',max:12},{k:'o',n:'Ones',s:'1s',v:1,txt:'1',col:'#e89a00',max:12}];
const pvVal=c=>PV.reduce((a,q)=>a+c[q.k]*q.v,0);
const pvExp=n=>{if(n>=1000000)return '1 000 000';const p=PV.map(q=>Math.floor(n/q.v)%10*q.v).filter(x=>x);return p.length?p.map(fmt).join(' + '):'0';};
P.lesson({id:'million6',title:'Whole numbers to one million',strand:'Number',codes:['B1.1'],
 guide:{goal:'Read and represent whole numbers up to one million with place-value models and in standard, expanded and word form, and describe how large numbers are used in everyday life.',words:'one million, hundred thousands, period, place value, expanded form, standard form',
  ask:['How many thousands make one million?','Why do we leave a space every three digits?','Where have you seen numbers in the hundreds of thousands?'],home:'Look up the population of your town or city and of Ontario. Read them aloud and write them in expanded form.'},
 learn:[{say:'Six places, then a million.',speech:'Hundred thousands is the sixth place. Watch the model build four hundred seven thousand, two hundred fifty.',view:'model',demo:'build'},
        {say:'Read about periods and forms.',speech:'Digits are grouped in threes called periods: the thousands period and the ones period. Four hundred seven thousand is read first, then two hundred fifty.',view:'read'},
        {say:'Watch: ten hundred thousands make a million.',speech:'Watch the hundred thousands mat fill up to ten. Ten hundred thousands is one million: a one followed by six zeros.',view:'model',demo:'million'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the yellow flap to check.',view:'read'},
        {say:'Your turn: build big numbers.',speech:'Your turn. Drag disks onto the mats, or tap a pile. Tap a disk to take it away.',view:'model'}],
 fig:'Place-value disks on a six-place mat, from hundred thousands to ones.',rz:.55,
 explore:['*Drag* a disk onto its mat, or *tap* a pile.','*Tap* a disk on a mat to take it away.','Press *Regroup* when a mat has 10 disks.'],
 howTo:'Read the number. Drag or tap disks onto the mats until the model shows it.',
 init:k=>k==='play'?{c:{ht:0,tt:0,th:0,h:0,t:0,o:0},target:0}:{c:{ht:4,tt:0,th:7,h:2,t:5,o:0}},
 left(p,S){const g=p.g,c=S.st.c;let y=header(p,S);
  y=para(p,y,'Big numbers count people in a city, kilometres to the Moon, or dollars in a budget. Digits are grouped in *periods* of three.')+14;
  rr(g,X0,y,TW/2-6,40,10);g.fillStyle=tint('#8b5cf6',.18);g.fill();T(g,'thousands period',X0+TW/4,y+28,FT.smallB,'#7c3aed','center');rr(g,X0+TW/2+6,y,TW/2-6,40,10);g.fillStyle=tint('#e89a00',.18);g.fill();T(g,'ones period',X0+TW*3/4,y+28,FT.smallB,'#c27a00','center');y+=50;
  const cw=TW/6;PV.forEach((q,i)=>{const x=X0+i*cw,v=c[q.k];rr(g,x+3,y,cw-6,140,14);g.fillStyle=tint(q.col,.14);g.fill();T(g,q.s,x+cw/2,y+34,FT.cap,q.col,'center');T(g,String(v),x+cw/2,y+110,ZS(64),v>9?RED:INK,'center');});
  y+=176;const n=pvVal(c);T(g,'Standard:',X0,y,FT.smallB,GREY);T(g,fmt(n),X0+170,y+2,ZS(40));y+=44;T(g,'Expanded:',X0,y,FT.smallB,GREY);y=wrap(g,pvExp(n),X0+170,y+2,TW-170,32,{font:ZS(28)})+8;
  T(g,'Words:',X0,y,FT.smallB,GREY);y=wrap(g,words(Math.min(n,1000000)),X0+170,y,TW-170,30,{font:FT.cap,color:INK})+24;
  y=keyWords(p,y,[['period','a group of three places, like the thousands period'],['one million','1 000 000: one thousand thousands']]);
  predict(p,y,S,'p1','What number is 1 more than 999 999?','*1 000 000, one million.* Every place regroups.');},
 readout(p,S,y){const g=p.g,n=pvVal(S.st.c);T(g,fmt(n),X0,y+48,ZS(58),acc());wrap(g,'= '+pvExp(n),X0+290,y+28,TW-290,28,{font:FT.smallB});wrap(g,words(Math.min(n,1000000)),X0,y+90,TW,28,{font:FT.cap,color:GREY});return y+120;},
 build(S,grp,mode,game){const st=S.st,MX={},MZ=-1.5,MWd=.7,R=.1;PV.forEach((q,i)=>MX[q.k]=-2.0+i*.8);
  PV.forEach((q,i)=>{const m=mk(new THREE.BoxGeometry(MWd,.03,2.05),lam(['#fde4d6','#ede6ff','#d7f1e5','#d7e6fb','#fbdde6','#fff0c4'][i]),20);m.position.set(MX[q.k],.015,MZ);grp.add(m);
    const l=label(q.s,{size:.15,color:q.col});l.position.set(MX[q.k],.25,MZ-1.22);grp.add(l);});
  const slot=(k,i)=>V(MX[k]+((i%3)-1)*.22,.05+(i>=12?.08:0),MZ-.82+Math.floor((i%12)/3)*.38);
  const stacks={};PV.forEach(q=>stacks[q.k]=[]);let busyT=false;
  const total=label('0',{size:.42,bg:'#ffffff'});total.position.set(0,1.8,MZ);grp.add(total);
  const onMat=(k,p)=>Math.abs(p.x-MX[k])<MWd/2+.05&&Math.abs(p.z-MZ)<1.15;
  const mkD=k=>{const q=PV.find(z=>z.k===k);return disk(q.txt,q.col,R);};
  function relayout(k){stacks[k].forEach((m,i)=>moveTo(m,{pos:slot(k,i),k:10}));}
  function spawn(k,drop){const m=mkD(k);const p=slot(k,stacks[k].length);m.position.copy(p);if(drop)m.position.y+=1.1;grp.add(m);moveTo(m,{pos:p,k:9});
    A.drag(m,{tap:()=>remove(k,m),drop:(pos,o)=>{if(onMat(k,pos))relayout(k);else remove(k,o);}});stacks[k].push(m);}
  function render(drop){PV.forEach(({k})=>{const a=stacks[k];while(a.length<st.c[k])spawn(k,drop);while(a.length>st.c[k]){const m=a.pop();A.unclick(m);moveTo(m,{scale:.01,k:16,done:()=>{grp.remove(m);disposeObj(m);}});}});changed();}
  function changed(){const n=pvVal(st.c);total.userData.set(n>=1000000?'1 000 000 — one million!':fmt(n));if(mode==='play'&&!st.setup&&n===st.target&&PV.every(q=>st.c[q.k]<10||q.k==='ht'))game.solved('Yes! That is '+fmt(st.target)+'.');A.redraw();}
  function add(k){if(busyT)return;const q=PV.find(z=>z.k===k);if(st.c[k]>=q.max){A.bad(k==='ht'?'This mat is full: that is one million!':'Too many! Press Regroup.');return;}
    st.c[k]++;spawn(k,true);A.pop();if(st.c[k]===10&&k!=='ht')A.say('You have 10 '+q.n.toLowerCase()+'. Regroup them!');if(k==='ht'&&st.c.ht===10)A.good('10 hundred thousands = ONE MILLION!');changed();}
  function remove(k,m){if(busyT||st.c[k]<=0)return;const a=stacks[k];const i=m?a.indexOf(m):a.length-1;if(i<0)return;const o=a.splice(i,1)[0];A.unclick(o);st.c[k]--;moveTo(o,{scale:.01,k:16,done:()=>{grp.remove(o);disposeObj(o);}});relayout(k);changed();}
  function regroup(){if(busyT)return;const order=['o','t','h','th','tt'],up={o:'t',t:'h',h:'th',th:'tt',tt:'ht'};const k=order.find(q=>st.c[q]>=10);if(!k){A.bad('No place has 10 disks yet.');return;}
    const u=up[k];if(st.c[u]>=PV.find(z=>z.k===u).max){A.bad('The next mat is full.');return;}busyT=true;const ten=stacks[k].splice(-10,10);const tgt=slot(u,stacks[u].length);
    ten.forEach((m,i)=>{A.unclick(m);moveTo(m,{pos:tgt.clone().add(V(0,.08*i+.1,0)),k:5+i*.4,done:i===9?()=>{ten.forEach(o=>{grp.remove(o);disposeObj(o);});st.c[k]-=10;st.c[u]++;busyT=false;spawn(u,false);relayout(k);
      A.good('10 '+PV.find(z=>z.k===k).n.toLowerCase()+' → 1 '+PV.find(z=>z.k===u).n.toLowerCase().replace(/s$/,'')+'!');changed();}:null});});}
  PV.forEach(q=>{const pile=new THREE.Group();[[0,0,0],[.07,.07,.05],[-.05,.14,-.04]].forEach(([x,y,z])=>{const d=mkD(q.k);d.position.set(x,.04+y,z);pile.add(d);});pile.position.set(MX[q.k],0,.3);grp.add(pile);
    let ghost=null;A.drag(pile,{tap:()=>add(q.k),start:()=>{ghost=mkD(q.k);ghost.position.copy(pile.position);grp.add(ghost);},move:pt=>{if(ghost)ghost.position.copy(grp.worldToLocal(pt));},
      drop:()=>{if(!ghost)return;const pos=ghost.position.clone();grp.remove(ghost);disposeObj(ghost);ghost=null;const k2=PV.map(z=>z.k).find(z=>onMat(z,pos));if(k2===q.k)add(q.k);else if(k2)A.bad(q.n+' go on the '+q.s+' mat.');}});});
  render(false);
  function set(c){st.c=Object.assign({ht:0,tt:0,th:0,h:0,t:0,o:0},c);render(true);}
  return {info:()=>fmt(pvVal(st.c)),
    controls:()=>PV.map(q=>({t:'+'+q.txt,big:true,fn:()=>add(q.k)})).concat([{t:'Regroup 10 → 1',go:true,fn:regroup,dis:!['o','t','h','th','tt'].some(k=>st.c[k]>=10)},{t:'Clear',fn:()=>set({})}]),
    demo(n){if(n==='build'){set({});A.seq([[600,()=>{for(let i=0;i<4;i++)add('ht');A.say('4 hundred thousands');}],[1200,()=>A.say('0 ten thousands')],[1100,()=>{for(let i=0;i<7;i++)add('th');A.say('7 thousands');}],[1200,()=>{add('h');add('h');A.say('2 hundreds');}],[1100,()=>{for(let i=0;i<5;i++)add('t');A.say('5 tens, 0 ones: 407 250');}]]);}
      if(n==='million'){set({ht:6});const l=[];for(let i=0;i<4;i++)l.push([600,()=>add('ht')]);A.seq(l);}},
    task(r){st.setup=true;st.c={ht:0,tt:0,th:0,h:0,t:0,o:0};render(false);let n,txt;
      if(r===0){n=rnd(1,9)*100000+rnd(1,9)*10000+rnd(1,9)*1000+rnd(1,9)*100+rnd(1,9)*10+rnd(1,9);txt='Build *'+fmt(n)+'*.';}
      else if(r===1){n=rnd(1,9)*100000+rnd(1,9)*1000+rnd(1,9)*10;txt='Build *'+fmt(n)+'*. Watch the zeros!';}
      else if(r===2){n=rnd(1,9)*100000+rnd(0,9)*10000+rnd(1,9)*1000+rnd(0,9)*100+rnd(1,9);txt='Build *'+words(n)+'*.';}
      else if(r===3){const b=rnd(1,8)*100000+rnd(1,9)*10000+rnd(1,9)*100;n=b+100000;txt='Build the number that is *100 000 more than '+fmt(b)+'*.';}
      else{n=1000000;txt='Build *one million*. (Hint: count the hundred thousands!)';}
      st.target=n;st.setup=false;return txt;}};}
});

/* =========================================================
   2. Integers
   ========================================================= */
P.lesson({id:'integers6',title:'Integers on number lines',strand:'Number',codes:['B1.2','B1.3'],
 guide:{goal:'Read and represent integers using horizontal and vertical number lines, and compare and order integers in contexts such as temperature, elevation and money.',words:'integer, positive, negative, zero, opposite, number line, greater than, less than',
  ask:['Which is colder, −4 °C or −9 °C? How do you know?','What is the opposite of 6?','Why is −1 greater than −10?'],home:'Check the weather in winter. Put the temperatures for a week on a number line, from coldest to warmest.'},
 learn:[{say:'Below zero are negative integers.',speech:'Integers are the whole numbers and their opposites. A thermometer is a vertical number line. Watch the temperature drop from five degrees to minus three.',view:'model',demo:'drop'},
        {say:'Read about integers.',speech:'Positive integers are greater than zero. Negative integers are less than zero. On a number line, numbers get greater as you move right or up.',view:'read'},
        {say:'Watch: opposites.',speech:'Six and negative six are opposites. They are the same distance from zero, on opposite sides. Watch the two markers.',view:'model',demo:'opp'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: change the temperature.',speech:'Your turn. Tap the number line or use the buttons to set the temperature. Watch both number lines.',view:'model'}],
 fig:'A thermometer (vertical number line) and a horizontal number line from −10 to 10.',rz:.25,
 explore:['*Tap* a number on the line, or use *+1*, *−1*, *+5*, *−5*.','The *thermometer* shows the same integer.','Blue numbers are negative, red are positive.'],
 howTo:'Read the question. Set the marker to the right integer, or choose the answer.',
 init:k=>({v:5,ask:null,target:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'*Integers* are whole numbers and their *opposites*: … −3, −2, −1, 0, 1, 2, 3 … Negative numbers are *less than 0*.')+18;
  const tx=X0+50,th=320;rr(g,tx,y,40,th,20);g.fillStyle='#eef2f8';g.fill();g.strokeStyle=INK;g.lineWidth=3;g.stroke();for(let v=-10;v<=10;v+=2){const yy=y+th-20-(v+10)/20*(th-40);g.beginPath();g.moveTo(tx+40,yy);g.lineTo(tx+56,yy);g.stroke();T(g,v<0?'−'+(-v):String(v),tx+64,yy+8,FT.cap,v<0?'#2563eb':v>0?'#dc2626':INK);}
  const lv=-3;const ly=y+th-20-(lv+10)/20*(th-40);g.fillStyle='#e0453a';g.fillRect(tx+12,ly,16,y+th-ly-6);T(g,'−3 °C',tx-10,ly+6,FT.bodyB,'#2563eb','right');
  const lx=X0+200,lw=TW-220,toX=v=>lx+(v+10)/20*lw,yy=y+120;g.strokeStyle=INK;g.lineWidth=4;g.beginPath();g.moveTo(lx,yy);g.lineTo(lx+lw,yy);g.stroke();
  for(let v=-10;v<=10;v++){g.lineWidth=2;g.beginPath();g.moveTo(toX(v),yy-(v%5?8:14));g.lineTo(toX(v),yy+(v%5?8:14));g.stroke();if(v%5===0)T(g,v<0?'−'+(-v):String(v),toX(v),yy+42,FT.small,v<0?'#2563eb':v>0?'#dc2626':INK,'center');}
  [[-6,'#2563eb'],[6,'#dc2626']].forEach(([v,c])=>{g.beginPath();g.arc(toX(v),yy,11,0,Math.PI*2);g.fillStyle=c;g.fill();T(g,v<0?'−6':'6',toX(v),yy-24,FT.bodyB,c,'center');});T(g,'opposites',toX(0),yy-50,FT.hand,BLUE,'center');
  wrap(g,'Right is greater. *−1 > −10*, because −1 is closer to zero.',lx,yy+90,lw,32,{font:FT.small,bold:FT.smallB});y+=th+20;
  y=keyWords(p,y,[['integer','a whole number or its opposite, like −4, 0 or 7'],['opposite','the same distance from 0 on the other side']]);
  predict(p,y,S,'p2','It is −2 °C and the temperature drops 5 degrees. What is the new temperature?','*−7 °C.* Move 5 down from −2.');},
 readout(p,S,y){const g=p.g,st=S.st,v=st.v;T(g,(v<0?'−'+(-v):String(v))+' °C',X0,y+56,ZS(62),v<0?'#2563eb':v>0?'#dc2626':INK);T(g,v<0?'negative: '+(-v)+' below zero':v>0?'positive: '+v+' above zero':'zero: neither positive nor negative',X0+220,y+48,FT.bodyB);return y+76;},
 build(S,grp,mode,game){const st=S.st,x0=-1.6,L=.17,Zl=-.55;
  numLine(grp,x0,L,Zl,-10,10,1,v=>v%2===0);const pads=[];for(let v=-10;v<=10;v++){const pd=mk(G('ipd6',()=>new THREE.CylinderGeometry(.07,.07,.05,14)),lam('#ffffff'),20);pd.position.set(x0+(v+10)*L,.08,Zl);grp.add(pd);A.drag(pd,{tap:()=>setV(v)});pads.push(pd);}
  const tx=-2.05,tz=-1.6,H=2.3,yOf=v=>.25+(v+10)/20*H;const tube=mk(new THREE.CylinderGeometry(.12,.12,H+.2,20),new THREE.MeshLambertMaterial({color:'#e6f0ff',transparent:true,opacity:.5}),0);tube.position.set(tx,.25+H/2,tz);grp.add(tube);
  const bulb=mk(new THREE.SphereGeometry(.2,20,14),lam('#e0453a'),0);bulb.position.set(tx,.15,tz);grp.add(bulb);const merc=mk(new THREE.CylinderGeometry(.07,.07,1,14),lam('#e0453a'),0);grp.add(merc);
  for(let v=-10;v<=10;v+=2){const t=new THREE.Mesh(G('tt6',()=>new THREE.BoxGeometry(.12,.015,.02)),lam(INK));t.position.set(tx+.2,yOf(v),tz);grp.add(t);const l=label(v<0?'−'+(-v):String(v),{size:.14,color:v<0?'#2563eb':v>0?'#dc2626':INK});l.position.set(tx+.42,yOf(v),tz);grp.add(l);}
  const mkr=mk(new THREE.ConeGeometry(.11,.26,16),lam('#ffd24a'),0);mkr.rotation.x=Math.PI;grp.add(mkr);const ml=label('',{size:.24,bg:'#ffffff'});grp.add(ml);const opp=mk(new THREE.ConeGeometry(.09,.22,16),new THREE.MeshLambertMaterial({color:'#8b5cf6',transparent:true,opacity:.7}),0);opp.rotation.x=Math.PI;opp.visible=false;grp.add(opp);
  let mh=yOf(5);
  function draw(){const v=st.v;mkr.position.set(x0+(v+10)*L,.45,Zl);ml.userData.set(v<0?'−'+(-v):String(v));ml.position.set(x0+(v+10)*L,.85,Zl);check();A.redraw();}
  function setV(v){v=Math.max(-10,Math.min(10,v));if(v===st.v)return;st.v=v;A.pop();draw();}
  function check(){if(mode==='play'&&!st.setup&&st.target!=null&&st.v===st.target)game.solved('Yes! '+(st.target<0?'−'+(-st.target):st.target)+'.');}
  draw();
  return {tick(dt){const ty=yOf(st.v);mh+=(ty-mh)*Math.min(1,dt*5);const h=Math.max(.02,mh-.15);merc.scale.y=h;merc.position.set(tx,.15+h/2,tz);},info:()=>(st.v<0?'−'+(-st.v):st.v)+' °C',
    controls:()=>{if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok,x=>typeof x==='number'?(x<0?'−'+(-x):String(x)):x);
      return [{t:'−5',fn:()=>setV(st.v-5)},{t:'−1',big:true,fn:()=>setV(st.v-1)},{t:'+1',big:true,go:true,fn:()=>setV(st.v+1)},{t:'+5',fn:()=>setV(st.v+5)}].concat(mode==='learn'?[{t:'Show opposite',fn:()=>{opp.visible=!opp.visible;opp.position.set(x0+(-st.v+10)*L,.45,Zl);A.say('The opposite of '+st.v+' is '+(-st.v));}}]:[]);},
    demo(n){st.ask=null;if(n==='drop'){st.v=5;draw();const l=[];for(let v=4;v>=-3;v--)l.push([380,()=>setV(v)]);l.push([600,()=>A.say('From 5 °C down 8 degrees: −3 °C')]);A.seq(l);}
      if(n==='opp'){st.v=6;draw();A.seq([[800,()=>{opp.visible=true;opp.position.set(x0+4*L,.45,Zl);A.say('6 and −6 are opposites: both 6 away from 0.');}]]);}},
    task(r){st.setup=true;st.ask=null;st.target=null;opp.visible=false;let txt;
      if(r===0){st.v=0;st.target=-rnd(2,9);txt='Set the temperature to *−'+(-st.target)+' °C*.';}
      else if(r===1){const a=rnd(1,5),d=rnd(a+2,a+8);st.v=a;st.target=a-d;txt='It is *'+a+' °C*. The temperature drops *'+d+' degrees*. Show the new temperature.';}
      else if(r===2){st.v=0;const a=rnd(3,9);st.target=-a;txt='Show the *opposite* of *'+a+'*.';}
      else if(r===3){st.v=0;const a=-rnd(2,9);let b=-rnd(2,9);if(b===a)b=a-2;const ans=Math.max(a,b);st.ask={ans,o:[a,b],ok:'Yes! '+(ans<0?'−'+(-ans):ans)+' is closer to zero, so it is greater (warmer).'};txt='Which temperature is *warmer*?';}
      else{st.v=0;const a=rnd(-9,-3),b=rnd(1,8);st.ask={ans:b-a,o:opts(b-a,[-2,2,-a,b],1),ok:'Yes! From '+(a<0?'−'+(-a):a)+' up to 0 is '+(-a)+', then up to '+b+' is '+b+' more.'};st.v=a;txt='How many degrees warmer is *'+b+' °C* than *−'+(-a)+' °C*?';}
      draw();st.setup=false;return txt;}};}
});

/* =========================================================
   3. Decimals to thousandths
   ========================================================= */
P.lesson({id:'thousandths6',title:'Decimals to thousandths',strand:'Number',codes:['B1.4','B1.6'],
 guide:{goal:'Read, represent, compare and order decimal numbers up to thousandths, and show equivalences between fractions and decimals up to thousandths.',words:'thousandth, hundredth, tenth, decimal point, equivalent, terminating decimal',
  ask:['How many thousandths are in one hundredth?','Why is 0.4 greater than 0.389?','How can you write 3/8 as a decimal?'],home:'Look at sports results to the thousandth of a second, like 9.582 s. Read them aloud and put them in order.'},
 learn:[{say:'Cut a whole into 1000 parts.',speech:'A big cube is one whole. A flat is one tenth, a rod is one hundredth, and a tiny cube is one thousandth. Watch the model build one point two four five.',view:'model',demo:'build'},
        {say:'Read the place-value chart.',speech:'In one point two four five, the five is in the thousandths place. We read it: one and two hundred forty-five thousandths.',view:'read'},
        {say:'Watch: three eighths as a decimal.',speech:'Three eighths is three hundred seventy-five thousandths. Watch zero point three seven five appear: three flats, seven rods and five tiny cubes.',view:'model',demo:'frac'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: build decimals.',speech:'Your turn. Add wholes, tenths, hundredths and thousandths, and trade ten small pieces for a bigger one.',view:'model'}],
 fig:'A whole cube, flats, rods and tiny cubes, with a number line from 0 to 2.',rz:.1,
 explore:['Add *1*, *0.1*, *0.01* and *0.001* with the buttons.','*Tap a piece* to take it away.','Press *Trade* when you have 10 of one piece.'],
 howTo:'Read the decimal or fraction, then build it with wholes, flats, rods and tiny cubes.',
 init:k=>({w:1,t:2,h:4,th:5,target:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'1 whole = 10 tenths = 100 hundredths = *1000 thousandths*. The third place after the decimal point is the *thousandths* place.')+16;
  const cw=TW/5;[['Ones','1','#2f7de1'],['.','',INK],['Tenths','2','#16a36f'],['Hundredths','4','#e89a00'],['Thousandths','5','#e2457a']].forEach(([a,b,c],i)=>{if(a==='.'){T(g,'.',X0+i*cw+cw/2,y+96,ZS(80),INK,'center');return;}rr(g,X0+i*cw+5,y,cw-10,120,14);g.fillStyle=tint(c,.14);g.fill();T(g,a,X0+i*cw+cw/2,y+34,FT.cap,c,'center');T(g,b,X0+i*cw+cw/2,y+100,ZS(56),INK,'center');});y+=150;
  T(g,'1.245',X0,y+20,ZS(60),acc());T(g,'one and two hundred forty-five thousandths',X0+200,y+8,FT.small,GREY);y+=60;
  rr(g,X0,y,TW,130,16);g.fillStyle=tint(acc(),.1);g.fill();[['1/8','0.125'],['3/8','0.375'],['1/4','0.25'],['1/2','0.5 = 0.500']].forEach(([a,b],i)=>{const x=X0+20+(i%2)*TW/2,yy=y+48+Math.floor(i/2)*52;T(g,a+' = '+b,x,yy,FT.bodyB);});y+=156;
  y=para(p,y,'To *compare*, line up the places: *0.4 = 0.400 > 0.389*.')+10;
  y=keyWords(p,y,[['thousandth','one of 1000 equal parts of a whole'],['equivalent','equal in value, like 1/4 and 0.250']]);
  predict(p,y,S,'p3','Order from least to greatest: 0.307, 0.37, 0.3','*0.3, 0.307, 0.37.* Think: 300, 307 and 370 thousandths.');},
 readout(p,S,y){const g=p.g,st=S.st,v=st.w*1000+st.t*100+st.h*10+st.th;T(g,(v/1000).toFixed(3),X0,y+56,ZS(62),acc());T(g,'= '+v+' thousandths',X0+240,y+48,FT.bodyB);return y+76;},
 build(S,grp,mode,game){const st=S.st,u=.08;const gW=new THREE.Group(),gT=new THREE.Group(),gH=new THREE.Group(),gK=new THREE.Group();grp.add(gW,gT,gH,gK);
  [['ones',-1.85,'#2f7de1'],['tenths',-.7,'#16a36f'],['hundredths',.35,'#e89a00'],['thousandths',1.6,'#e2457a']].forEach(([t,x,c])=>{const l=label(t,{size:.16,color:c});l.position.set(x,.3,-3.05);grp.add(l);});
  const x0=-2.0,L=2.0,Zl=-.3;numLine(grp,x0,L,Zl,0,2,10);const mkr=mk(new THREE.ConeGeometry(.1,.24,16),lam('#e2457a'),0);mkr.rotation.x=Math.PI;grp.add(mkr);const ml=label('',{size:.22,bg:'#ffffff'});grp.add(ml);
  const cubeM=[lam('#2f7de1'),lam('#2f7de1'),cellMat('#2f7de1',10,10),lam('#2f7de1'),cellMat('#2f7de1',10,10),lam('#2f7de1')],flatM=[lam('#16a36f'),lam('#16a36f'),cellMat('#16a36f',10,10),lam('#16a36f'),lam('#16a36f'),lam('#16a36f')],rodM=[lam('#e89a00'),lam('#e89a00'),cellMat('#e89a00',1,10),lam('#e89a00'),lam('#e89a00'),lam('#e89a00')];
  function render(){[gW,gT,gH,gK].forEach(clearGroup);
    for(let i=0;i<st.w;i++){const m=mk(G('w6',()=>new THREE.BoxGeometry(u*10,u*10,u*10)),cubeM,20);m.position.set(-1.85,u*5+.02,-2.45+i*1.0);gW.add(m);A.drag(m,{tap:()=>change(-1,0,0,0)});}
    for(let i=0;i<st.t;i++){const m=mk(G('f6',()=>new THREE.BoxGeometry(u*10,u*.95,u*10)),flatM,20);m.position.set(-.7,u/2+.02+(i%10)*u,i<10?-2.45:-1.45);gT.add(m);A.drag(m,{tap:()=>change(0,-1,0,0)});}
    for(let i=0;i<st.h;i++){const m=mk(G('r6',()=>new THREE.BoxGeometry(u*.95,u*.95,u*10)),rodM,20);m.position.set(-.05+(i%10)*u*1.05,u/2+.02,i<10?-2.45:-1.45);gH.add(m);A.drag(m,{tap:()=>change(0,0,-1,0)});}
    for(let i=0;i<st.th;i++){const m=mk(G('k6',()=>new THREE.BoxGeometry(u*.9,u*.9,u*.9)),lam('#e2457a'),20);m.position.set(1.2+(i%5)*u*1.4,u/2+.02,-2.8+Math.floor(i/5)*u*1.4);gK.add(m);A.drag(m,{tap:()=>change(0,0,0,-1)});}
    const v=(st.w*1000+st.t*100+st.h*10+st.th)/1000;mkr.position.set(x0+v*L,.4,Zl);ml.userData.set(v.toFixed(3));ml.position.set(x0+v*L,.8,Zl);check();A.redraw();}
  function change(dw,dt,dh,dk){const w=st.w+dw,t=st.t+dt,h=st.h+dh,k=st.th+dk;if(w<0||t<0||h<0||k<0)return;if(w>2){A.bad('The number line stops at 2.');return;}if(t>19||h>19||k>19){A.bad('Trade 10 for 1 bigger piece first!');return;}
    if(w*1000+t*100+h*10+k>2000){A.bad('The number line stops at 2.');return;}st.w=w;st.t=t;st.h=h;st.th=k;A.pop();render();}
  function trade(){if(st.th>=10){st.th-=10;st.h++;A.good('10 thousandths = 1 hundredth!');}else if(st.h>=10){st.h-=10;st.t++;A.good('10 hundredths = 1 tenth!');}else if(st.t>=10){if(st.w>=2){A.bad('Too big.');return;}st.t-=10;st.w++;A.good('10 tenths = 1 whole!');}else{A.bad('You need 10 of a piece.');return;}render();}
  function check(){if(mode==='play'&&!st.setup&&st.target!=null&&st.w*1000+st.t*100+st.h*10+st.th===st.target&&st.t<10&&st.h<10&&st.th<10)game.solved('Yes! That is '+(st.target/1000).toFixed(3)+'.');}
  render();
  return {info:()=>((st.w*1000+st.t*100+st.h*10+st.th)/1000).toFixed(3),
    controls:()=>[{t:'+1',fn:()=>change(1,0,0,0)},{t:'+0.1',big:true,fn:()=>change(0,1,0,0)},{t:'+0.01',big:true,fn:()=>change(0,0,1,0)},{t:'+0.001',big:true,go:true,fn:()=>change(0,0,0,1)},{t:'Trade 10 → 1',fn:trade,dis:st.th<10&&st.h<10&&st.t<10},{t:'Clear',fn:()=>{st.w=st.t=st.h=st.th=0;render();}}],
    demo(n){st.w=st.t=st.h=st.th=0;render();if(n==='build')A.seq([[600,()=>{change(1,0,0,0);A.say('1 whole');}],[1000,()=>{change(0,1,0,0);change(0,1,0,0);A.say('2 tenths');}],[1000,()=>{for(let i=0;i<4;i++)change(0,0,1,0);A.say('4 hundredths');}],[1000,()=>{for(let i=0;i<5;i++)change(0,0,0,1);A.say('5 thousandths: 1.245');}]]);
      if(n==='frac')A.seq([[600,()=>{for(let i=0;i<3;i++)change(0,1,0,0);}],[900,()=>{for(let i=0;i<7;i++)change(0,0,1,0);}],[900,()=>{for(let i=0;i<5;i++)change(0,0,0,1);A.say('3/8 = 0.375');}]]);},
    task(r){st.setup=true;st.w=st.t=st.h=st.th=0;let v,txt;
      if(r===0){v=rnd(1,1)*1000+rnd(1,9)*100+rnd(1,9)*10+rnd(1,9);txt='Build *'+(v/1000).toFixed(3)+'*.';}
      else if(r===1){v=rnd(101,999);if(v%10===0)v++;txt='Build *'+v+' thousandths*.';}
      else if(r===2){const f=pick([[1,8,125],[3,8,375],[5,8,625],[1,4,250],[3,4,750],[1,5,200],[7,8,875]]);v=f[2];txt='Show *'+f[0]+'/'+f[1]+'* as a decimal.';}
      else if(r===3){const t=rnd(3,8),h=rnd(1,9),k=rnd(1,9);v=t*100;txt='Build the *greater* number: *0.'+(t-1)+h+k+'* or *0.'+t+'*.';}
      else{v=rnd(1,1)*1000+rnd(0,9)*10+rnd(1,9);txt='Build *one and '+words(v-1000)+' thousandths*.';}
      st.target=v;render();st.setup=false;return txt;}};}
});

/* =========================================================
   4. Comparing and ordering integers, decimals and fractions
   ========================================================= */
P.lesson({id:'order6',title:'Ordering integers, decimals and fractions',strand:'Number',codes:['B1.3'],
 guide:{goal:'Compare and order integers, decimal numbers and fractions, separately and in combination, using a number line, benchmarks and equivalents.',words:'compare, order, integer, decimal, fraction, benchmark, number line',
  ask:['Which is greater, −1.5 or −1/2?','How can you compare 3/4 and 0.7?','Where does 5/4 go between 1 and 2?'],home:'Write five numbers on sticky notes, like −2, 0.5, 3/4, 1.25 and −1/2. Put them on a hallway “number line”.'},
 learn:[{say:'All numbers share one line.',speech:'Integers, decimals and fractions all have a place on the same number line. Watch these cards jump to their places: negative one and a half, three quarters, and one point two.',view:'model',demo:'order'},
        {say:'Read the strategies.',speech:'Change fractions to decimals, or decimals to fractions, so they are easier to compare. Remember that negative numbers are less than zero, and the further left, the smaller.',view:'read'},
        {say:'Watch: two negatives.',speech:'Which is less, negative one half or negative one point five? Negative one point five is further from zero on the left, so it is less.',view:'model',demo:'neg'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: tap in order.',speech:'Your turn. Tap the cards from least to greatest. Each one jumps to its place on the line.',view:'model'}],
 fig:'Number cards jump to their places on a number line from −3 to 3.',rz:.35,
 explore:['*Tap the cards* from least to greatest.','Each card jumps onto the *number line* and grows a bar from 0.','Press *New set* for new numbers.'],
 howTo:'Tap the cards in order, from least to greatest (or tap the greatest when asked).',
 init:k=>({items:[{v:-1.5,t:'−1.5'},{v:.75,t:'3/4'},{v:1.2,t:'1.2'}],placed:[],mode:'asc'}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'To order mixed kinds of numbers, put them on *one number line*, or write them all in the *same form*.')+16;
  const lx=X0+20,lw=TW-40,toX=v=>lx+(v+3)/6*lw;g.strokeStyle=INK;g.lineWidth=4;g.beginPath();g.moveTo(lx,y+70);g.lineTo(lx+lw,y+70);g.stroke();
  for(let v=-3;v<=3;v++){g.beginPath();g.moveTo(toX(v),y+56);g.lineTo(toX(v),y+84);g.stroke();T(g,v<0?'−'+(-v):String(v),toX(v),y+116,FT.bodyB,v<0?'#2563eb':v>0?'#dc2626':INK,'center');}
  [[-1.5,'−1.5','#2563eb'],[-.5,'−1/2','#8b5cf6'],[.75,'3/4','#16a36f'],[1.2,'1.2','#e2457a'],[2.25,'2 1/4','#f08a24']].forEach(([v,t,c],i)=>{g.beginPath();g.arc(toX(v),y+70,11,0,Math.PI*2);g.fillStyle=c;g.fill();T(g,t,toX(v),y+(i%2?30:40),FT.smallB,c,'center');});y+=150;
  [['Fraction → decimal','3/4 = 0.75, so 3/4 > 0.7'],['Negatives','−1.5 < −0.5: further left is less'],['Mixed numbers','2 1/4 = 2.25']].forEach(([a,b],i)=>{rr(g,X0,y+i*58,TW,50,12);g.fillStyle=tint(acc(),.1);g.fill();T(g,a,X0+18,y+i*58+34,FT.smallB,acc());T(g,b,X0+300,y+i*58+34,FT.body);});y+=190;
  y=keyWords(p,y,[['benchmark','a friendly number to compare with, like 0, 1/2 or 1'],['order','arrange from least to greatest']]);
  predict(p,y,S,'p4','Order from least to greatest: 0.6, −2, 1/2, −0.25','*−2, −0.25, 1/2, 0.6.* Negatives first, then 0.5 before 0.6.');},
 readout(p,S,y){const g=p.g,st=S.st;const srt=st.items.slice().sort((a,b)=>a.v-b.v);T(g,st.placed.length===st.items.length?srt.map(q=>q.t).join('  <  '):'Placed: '+st.placed.length+' of '+st.items.length,X0,y+50,ZS(42),acc());
  T(g,st.mode==='great'?'Tap the greatest number.':'Tap from least to greatest.',X0,y+92,FT.bodyB);return y+100;},
 build(S,grp,mode,game){const st=S.st,x0=-2.1,L=.7,Zl=-.6,ROWS=[-2.8,-2.3,-1.8,-1.3],COLS=['#2f7de1','#e2457a','#16a36f','#f08a24'];
  numLine(grp,x0,L,Zl,-3,3,4,null);const cards=new THREE.Group(),barsG=new THREE.Group();grp.add(cards,barsG);let busy=false;const zeroX=x0+3*L;
  const zl=mk(new THREE.BoxGeometry(.02,.4,2.0),lam('#94a3b8'),0);zl.position.set(zeroX,.2,-2.05);grp.add(zl);
  function draw(){clearGroup(cards);clearGroup(barsG);const k=st.items.length;st.items.forEach((q,i)=>{const c=new THREE.Group();const b=mk(G('oc6',()=>new THREE.BoxGeometry(.95,.1,.5)),lam('#ffffff'),20);b.position.y=.05;c.add(b);
      const e=mk(G('oc6e',()=>new THREE.BoxGeometry(1.0,.06,.55)),lam(COLS[i]),0);e.position.y=.02;c.add(e);const l=label(q.t,{size:.3,color:COLS[i]});l.position.y=.38;c.add(l);
      const j=st.placed.indexOf(i);if(j>=0){c.position.set(x0+(q.v+3)*L,0,Zl-.05);c.scale.setScalar(.62);const w=Math.max(.02,Math.abs(q.v)*L);const bar=mk(new THREE.BoxGeometry(w,.2,.36),lam(COLS[i]),20);bar.position.set(zeroX+(q.v<0?-w/2:w/2),.1,ROWS[j]);barsG.add(bar);
        const bt=label(q.t,{size:.2,bg:'#ffffff',border:COLS[i]});bt.position.set(zeroX+q.v*L+(q.v<0?-.3:.3),.3,ROWS[j]);barsG.add(bt);}
      else c.position.set((i-(k-1)/2)*1.1,0,.12);cards.add(c);A.drag(c,{tap:()=>tapCard(i)});});A.redraw();}
  const order=()=>st.items.map((q,i)=>i).sort((a,b)=>st.items[a].v-st.items[b].v);
  function tapCard(i){if(busy||st.placed.indexOf(i)>=0)return;const ord=order();
    if(st.mode==='great'){if(i===ord[ord.length-1]){st.placed=ord.slice();draw();A.good(st.items[i].t+' is the greatest.');if(mode==='play'&&!st.setup)game.solved('Yes! '+st.items[i].t+' is the greatest.');}else A.bad('Look again: which is furthest right on the line?');return;}
    if(i!==ord[st.placed.length]){A.bad('Not that one yet. Find the least number left.');return;}st.placed.push(i);A.pop();draw();if(st.placed.length===st.items.length){A.good(ord.map(k=>st.items[k].t).join(' < '));if(mode==='play'&&!st.setup)game.solved('Great ordering!');}}
  const POOL=[[-2.5,'−2.5'],[-2,'−2'],[-1.75,'−1 3/4'],[-1.5,'−1.5'],[-1,'−1'],[-.5,'−1/2'],[-.25,'−0.25'],[0,'0'],[.2,'0.2'],[.25,'1/4'],[.4,'2/5'],[.5,'0.5'],[.6,'0.6'],[.625,'5/8'],[.7,'0.7'],[.75,'3/4'],[.8,'0.8'],[1,'1'],[1.2,'1.2'],[1.25,'5/4'],[1.5,'1 1/2'],[1.75,'1.75'],[2,'2'],[2.25,'2 1/4'],[2.4,'2.4'],[-3,'−3'],[3,'3'],[-.8,'−0.8'],[.375,'0.375'],[.125,'1/8']];
  function fresh(k,f){let s;for(let t=0;t<200;t++){s=shuffle(POOL.filter(f||(()=>true))).slice(0,k);const vs=s.map(q=>q[0]);if(new Set(vs).size<k)continue;const sv=vs.slice().sort((a,b)=>a-b);if(sv.some((v,i)=>i&&v-sv[i-1]<.1))continue;break;}return s.map(([v,t])=>({v,t}));}
  function showMe(){const ord=order();st.placed=[];draw();busy=true;const l=ord.map(i=>[900,()=>{busy=false;tapCard(i);busy=true;}]);l.push([300,()=>{busy=false;}]);A.seq(l);}
  draw();
  return {info:()=>st.mode==='great'?'Tap the greatest':'Tap least to greatest',
    controls:()=>mode==='learn'?[{t:'New set',go:true,fn:()=>{st.items=fresh(4);st.placed=[];st.mode='asc';draw();}},{t:'Show me',fn:showMe},{t:'Start over',fn:()=>{st.placed=[];draw();}}]:[{t:'Start over',fn:()=>{if(st.mode!=='great'){st.placed=[];draw();}}}],
    demo(n){st.mode='asc';if(n==='order'){st.items=[{v:.75,t:'3/4'},{v:-1.5,t:'−1.5'},{v:1.2,t:'1.2'}];st.placed=[];draw();showMe();}
      if(n==='neg'){st.items=[{v:-.5,t:'−1/2'},{v:-1.5,t:'−1.5'}];st.placed=[];draw();showMe();}},
    task(r){st.setup=true;st.placed=[];st.mode='asc';let txt;
      if(r===0){st.items=fresh(3,q=>Number.isInteger(q[0]));txt='Order these *integers* from least to greatest.';}
      else if(r===1){st.items=fresh(3,q=>/\./.test(q[1]));txt='Order these *decimals* from least to greatest.';}
      else if(r===2){st.items=fresh(3,q=>/\//.test(q[1]));txt='Order these *fractions* from least to greatest.';}
      else if(r===3){st.mode='great';st.items=fresh(3);txt='Tap the *greatest* number.';}
      else{st.items=fresh(4);txt='Order *integers, decimals and fractions* together, least to greatest.';}
      draw();st.setup=false;return txt;}};}
});

/* =========================================================
   5. Rounding decimals, including repeating decimals
   ========================================================= */
const PLACES=[{n:'whole number',b:1000,d:0},{n:'tenth',b:100,d:1},{n:'hundredth',b:10,d:2}];
P.lesson({id:'round6',title:'Rounding terminating and repeating decimals',strand:'Number',codes:['B1.5'],
 guide:{goal:'Round terminating and repeating decimal numbers to the nearest whole number, tenth or hundredth, as fits the context.',words:'round, nearest, terminating decimal, repeating decimal, ellipsis, halfway',
  ask:['What does the “…” in 0.666… mean?','Round 2.718 to the nearest hundredth. Which digit do you look at?','Why do we round money to the nearest hundredth?'],home:'Divide $10 among 3 people on a calculator. Talk about why the answer repeats, and round it to the nearest cent.'},
 learn:[{say:'Choose the place, find the neighbours.',speech:'Round four point two six eight to the nearest tenth. It is between four point two and four point three. The ball rolls to the nearer one: four point three.',view:'model',demo:'roll'},
        {say:'Read about repeating decimals.',speech:'Some decimals never end. Two thirds is zero point six six six, repeating forever. We round them too: to the nearest hundredth, two thirds is about zero point six seven.',view:'read'},
        {say:'Watch: a repeating decimal.',speech:'One third is zero point three three three, repeating. To the nearest hundredth it rolls down to zero point three three.',view:'model',demo:'rep'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: round and roll.',speech:'Your turn. Pick the place, then tap the side where you think the ball will stop.',view:'model'}],
 fig:'A hill between two neighbours. The ball rolls to the nearest one.',rz:-.15,
 explore:['Pick *whole number*, *tenth* or *hundredth*.','*Tap a pad* to predict where the ball stops.','Repeating decimals end with *…*'],
 howTo:'Read the number and the place. Tap the side the ball will roll to.',
 init:k=>({x:4268,rep:null,pl:1,picked:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'To round, find the two *neighbours* at the place you need, then look at the *next digit to the right*: 0–4 round down, 5–9 round up.')+16;
  [['4.268 → tenth','4.3','the hundredths digit is 6'],['4.268 → hundredth','4.27','the thousandths digit is 8'],['4.268 → whole','4','the tenths digit is 2']].forEach(([a,b,c],i)=>{rr(g,X0,y+i*60,TW,52,12);g.fillStyle=tint(acc(),.1);g.fill();T(g,a,X0+18,y+i*60+35,FT.bodyB);T(g,b,X0+340,y+i*60+35,ZS(34),acc());T(g,c,X0+TW-18,y+i*60+35,FT.small,GREY,'right');});y+=196;
  y=para(p,y,'A *terminating* decimal ends, like 0.75. A *repeating* decimal goes on forever, like *2/3 = 0.666…* or *1/7 = 0.142857…*')+12;
  T(g,'0.666… ≈ 0.67',X0,y+30,ZS(48),acc());T(g,'(nearest hundredth)',X0+380,y+24,FT.body,GREY);y+=70;
  y=keyWords(p,y,[['repeating decimal','a decimal whose digits repeat forever, shown with …'],['terminating decimal','a decimal that ends']]);
  predict(p,y,S,'p5','Round 5.555… to the nearest tenth.','*5.6.* The hundredths digit is 5, so round up.');},
 readout(p,S,y){const g=p.g,st=S.st,P2=PLACES[st.pl],lo=Math.floor(st.x/P2.b)*P2.b,ans=st.x-lo>=P2.b/2?lo+P2.b:lo;
  T(g,shown(st)+' → nearest '+P2.n,X0,y+42,ZS(40),acc());T(g,'between '+(lo/1000).toFixed(P2.d)+' and '+((lo+P2.b)/1000).toFixed(P2.d)+(st.picked==null?'':'   ·   rounds to '+(ans/1000).toFixed(P2.d)),X0,y+84,FT.bodyB);return y+94;},
 build(S,grp,mode,game){const st=S.st,Z=-1.55,L=4.0,H=1.05;const yOf=u=>H*(1-Math.cos(2*Math.PI*u))/2,xOf=u=>-L/2+L*u;
  const pts=[];for(let i=0;i<=60;i++){const u=i/60;pts.push(V(xOf(u),.12+yOf(u),Z));}grp.add(mk(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts),120,.07,10,false),lam('#fdba74'),0));
  for(let i=0;i<=10;i++){const u=i/10;const post=mk(new THREE.CylinderGeometry(.02,.02,.12+yOf(u),6),lam(i%5?'#cbd':'#c2410c'),0);post.position.set(xOf(u),(.12+yOf(u))/2,Z);grp.add(post);}
  const base=mk(new THREE.BoxGeometry(L+.4,.05,.5),lam('#ffedd5'),20);base.position.set(0,.025,Z);grp.add(base);
  const ball=mk(new THREE.SphereGeometry(.17,24,16),lam('#e2457a'),0);grp.add(ball);const flag=label('',{size:.28,bg:'#ffffff'});grp.add(flag);
  const vl=[label('',{size:.28,bg:'#ffffff',border:'#c2410c'}),label('',{size:.28,bg:'#ffffff',border:'#c2410c'})],mid=label('',{size:.18,color:GREY});vl.forEach(l=>grp.add(l));grp.add(mid);
  const pads=[-1,1].map(s=>{const pd=mk(new THREE.CylinderGeometry(.3,.3,.06,28),lam('#ffd24a'),30);pd.position.set(s*(L/2+.02),.06,Z+.55);grp.add(pd);return pd;});
  let u=0,rolling=false;const lohi=()=>{const b=PLACES[st.pl].b,lo=Math.floor(st.x/b)*b;return [lo,lo+b];};
  function place(){const [lo,hi]=lohi(),d=PLACES[st.pl].d;u=(st.x-lo)/(hi-lo);const p=V(xOf(u),.12+yOf(u)+.24,Z);ball.position.copy(p);flag.userData.set(shown(st));flag.position.set(p.x,p.y+.55,Z);
    vl[0].userData.set((lo/1000).toFixed(d));vl[0].position.set(xOf(0),.55,Z+.55);vl[1].userData.set((hi/1000).toFixed(d));vl[1].position.set(xOf(1),.55,Z+.55);mid.userData.set('halfway '+((lo+hi)/2000).toFixed(d+1));mid.position.set(0,1.62,Z);}
  function roll(cb){if(rolling)return;rolling=true;const tgtU=u>=.5?1:0,u0=u;tween(.7+Math.abs(tgtU-u0)*1.2,k=>{u=u0+(tgtU-u0)*k;ball.position.set(xOf(u),.12+yOf(u)+.24,Z);ball.rotation.z-=(tgtU>u0?1:-1)*.12;flag.position.set(ball.position.x,ball.position.y+.55,Z);},x=>x*x*(3-2*x)).then(()=>{rolling=false;if(cb)cb(tgtU===1);});}
  function choose(up){if(rolling)return;st.picked=up;A.redraw();const [lo,hi]=lohi(),d=PLACES[st.pl].d;roll(isUp=>{const ans=((isUp?hi:lo)/1000).toFixed(d);
    if(up===isUp){A.good(shown(st)+' rounds to '+ans+'.');if(mode==='play'&&!st.setup)game.solved(shown(st)+' ≈ '+ans+'.');}else{A.bad('It rolled the other way: '+ans+'.');A.later(()=>{if(mode==='play'){place();A.redraw();}},1600);}A.redraw();});}
  pads.forEach((pd,i)=>A.drag(pd,{tap:()=>choose(i===1)}));
  function fresh(){st.rep=null;st.x=rnd(1000,9999);if(st.x%10===0)st.x++;st.picked=null;place();A.redraw();}
  place();
  return {info:()=>'Round '+shown(st)+' to the nearest '+PLACES[st.pl].n,
    controls:()=>{const [lo,hi]=lohi(),d=PLACES[st.pl].d;const c=[{t:'Down to '+(lo/1000).toFixed(d),big:true,fn:()=>choose(false)},{t:'Up to '+(hi/1000).toFixed(d),big:true,fn:()=>choose(true)}];
      return mode==='learn'?PLACES.map((q,i)=>({t:q.n,on:st.pl===i,fn:()=>{st.pl=i;st.picked=null;place();A.redraw();}})).concat(c,[{t:'New number',go:true,fn:fresh}]):c;},
    demo(n){st.picked=null;if(n==='roll'){st.rep=null;st.x=4268;st.pl=1;place();A.seq([[900,()=>roll(()=>A.say('4.268 rounds up to 4.3'))]]);}
      if(n==='rep'){st.rep='0.333…';st.x=1000/3;st.pl=2;place();A.redraw();A.seq([[1000,()=>roll(()=>A.say('0.333… ≈ 0.33'))]]);}},
    task(r){st.setup=true;st.picked=null;st.rep=null;let txt;
      if(r===0){st.pl=1;st.x=rnd(1000,9999);if(st.x%100===0)st.x+=11;txt='Round *'+shown(st)+'* to the nearest *tenth*.';}
      else if(r===1){st.pl=2;st.x=rnd(1000,9999);if(st.x%10===0)st.x+=3;txt='Round *'+shown(st)+'* to the nearest *hundredth*.';}
      else if(r===2){st.pl=0;st.x=rnd(10,19)*1000+rnd(1,999);txt='About how many kilometres? Round *'+shown(st)+' km* to the nearest *whole number*.';}
      else if(r===3){const f=pick([[2,3],[1,3],[5,6],[1,6],[4,9],[7,9]]);st.x=1000*f[0]/f[1];st.rep=(f[0]/f[1]).toFixed(3)+'…';st.pl=pick([1,2]);txt='*'+f[0]+'/'+f[1]+' = '+st.rep+'*. Round it to the nearest *'+PLACES[st.pl].n+'*.';}
      else{st.pl=2;st.x=rnd(1001,9999);if(st.x%10===0)st.x+=7;txt='A price works out to *$'+(st.x/1000).toFixed(3)+'*. Round to the nearest *cent* (hundredth).';}
      place();st.setup=false;return txt;}};}
});
function shown(st){return st.rep||(st.x/1000).toFixed(3).replace(/(\.\d*?)0+$/,'$1').replace(/\.$/,'.0');}

/* =========================================================
   6. Divisibility rules and prime factor trees
   ========================================================= */
const DIVR=[[2,'last digit is even'],[3,'sum of the digits is divisible by 3'],[4,'last two digits make a number divisible by 4'],[5,'last digit is 0 or 5'],[6,'divisible by 2 and by 3'],[8,'last three digits make a number divisible by 8'],[9,'sum of the digits is divisible by 9'],[10,'last digit is 0']];
P.lesson({id:'factors6',title:'Divisibility rules and prime factors',strand:'Number',codes:['B2.2','B2.6'],
 guide:{goal:'Understand and use divisibility rules for 2, 3, 4, 5, 6, 8, 9 and 10, and write composite numbers as a product of prime factors using factor trees.',words:'divisible, factor, prime number, composite number, prime factorization, factor tree',
  ask:['How can you tell if 4152 is divisible by 3 without dividing?','Why is 1 neither prime nor composite?','Do different factor trees for 60 give the same primes?'],home:'Read licence plates or house numbers. Use the rules to test if each number is divisible by 2, 3, 5, 9 or 10.'},
 learn:[{say:'Break a number into primes.',speech:'Sixty is composite. Split it: two times thirty. Thirty is two times fifteen. Fifteen is three times five. Watch the factor tree grow until every branch ends in a prime.',view:'model',demo:'tree'},
        {say:'Read the divisibility rules.',speech:'Divisibility rules are shortcuts. A number is divisible by two if its last digit is even, by three if its digits add to a multiple of three, by five if it ends in zero or five, and by nine if its digits add to a multiple of nine.',view:'read'},
        {say:'Watch: a different tree, the same primes.',speech:'Start sixty another way: three times twenty. Twenty is two times ten, and ten is two times five. The primes are the same: two, two, three and five.',view:'model',demo:'tree2'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: grow a factor tree.',speech:'Your turn. Choose a divisor to split the blue number. Keep going until every leaf is a green prime.',view:'model'}],
 fig:'A 3D factor tree. Green leaves are primes.',rz:.25,
 explore:['Press a *divisor* to split the blue (composite) number.','*Green* leaves are prime: they cannot split.','Press *New number* to grow another tree.'],
 howTo:'Split the blue number with a divisor that works, until every leaf is prime. Or use the rules to answer.',
 init:k=>({n:60,split:[]}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'A *prime* number has exactly two factors: 1 and itself. A *composite* number has more. Every composite is a product of primes.')+16;
  const node=(x,yy,t,pr)=>{g.beginPath();g.arc(x,yy,26,0,Math.PI*2);g.fillStyle=pr?'#16a36f':'#2f7de1';g.fill();T(g,t,x,yy+9,FT.smallB,'#fff','center');};
  const ln=(a,b,c,d)=>{g.strokeStyle='#94a3b8';g.lineWidth=4;g.beginPath();g.moveTo(a,b);g.lineTo(c,d);g.stroke();};
  const x=X0+170;ln(x,y+30,x-70,y+100);ln(x,y+30,x+70,y+100);ln(x+70,y+100,x,y+170);ln(x+70,y+100,x+140,y+170);ln(x+140,y+170,x+70,y+240);ln(x+140,y+170,x+210,y+240);
  node(x,y+30,'60');node(x-70,y+100,'2',1);node(x+70,y+100,'30');node(x,y+170,'2',1);node(x+140,y+170,'15');node(x+70,y+240,'3',1);node(x+210,y+240,'5',1);
  T(g,'60 = 2 × 2 × 3 × 5',X0+440,y+120,ZS(38),acc());T(g,'= 2² × 3 × 5',X0+440,y+170,FT.bodyB,GREY);y+=290;
  DIVR.forEach(([d,r],i)=>{const xx=X0+(i%2)*TW/2,yy=y+Math.floor(i/2)*44;T(g,'÷'+d,xx,yy+24,FT.bodyB,acc());wrap(g,r,xx+60,yy+22,TW/2-70,22,{font:FT.cap});});y+=184;
  predict(p,y,S,'p6','Is 4152 divisible by 3? By 9?','*By 3: yes. By 9: no.* 4 + 1 + 5 + 2 = 12, which is divisible by 3 but not by 9.');},
 readout(p,S,y){const g=p.g,st=S.st,leaves=leafs(st);const done=!leaves.some(v=>!isPrime(v));T(g,st.n+' = '+leaves.slice().sort((a,b)=>a-b).join(' × '),X0,y+50,ZS(42),done?'#16a36f':acc());
  T(g,done?'Every leaf is prime: this is the prime factorization!':'Split the blue number: '+leaves.find(v=>!isPrime(v)),X0,y+92,FT.bodyB);return y+100;},
 build(S,grp,mode,game){const st=S.st;const tree=new THREE.Group();grp.add(tree);
  function sphere(v,pr){const g=new THREE.Group();const m=mk(G('ft6'+pr,()=>new THREE.SphereGeometry(.24,22,16)),lam(pr?'#16a36f':'#2f7de1'),0);g.add(m);const l2=label(String(v),{size:.24,color:INK});l2.position.set(0,.42,0);g.add(l2);return g;}
  function pos(k){return V(-1.3+k*.6,1.75-k*.33,-2.8+k*.45);}
  function draw(anim){clearGroup(tree);let cur=st.n;let p0=pos(0);const nodes=[];
    st.split.forEach((d,k)=>{const n=sphere(cur,false);n.position.copy(p0);tree.add(n);const q=cur/d;const pl=p0.clone().add(V(-.55,-.35,.45)),pr=pos(k+1);
      [pl,pr].forEach(t=>{const len=p0.distanceTo(t);const c=new THREE.Mesh(new THREE.CylinderGeometry(.03,.03,len,8),lam('#94a3b8'));c.position.copy(p0).add(t).multiplyScalar(.5);c.quaternion.setFromUnitVectors(V(0,1,0),t.clone().sub(p0).normalize());tree.add(c);});
      const leaf=sphere(d,true);leaf.position.copy(pl);tree.add(leaf);if(anim&&k===st.split.length-1){leaf.scale.setScalar(.01);moveTo(leaf,{scale:1,k:8});}cur=q;p0=pr;});
    const last=sphere(cur,isPrime(cur));last.position.copy(p0);tree.add(last);if(anim){last.scale.setScalar(.01);moveTo(last,{scale:1,k:8});}
    if(!isPrime(cur))A.drag(last.children[0],{tap:()=>{const d=[2,3,5,7,11,13].find(x=>cur%x===0&&cur!==x);if(d)splitBy(d);}});check();A.redraw();}
  function curV(){return st.split.reduce((a,d)=>a/d,st.n);}
  function splitBy(d){const c=curV();if(isPrime(c)){A.good('All leaves are prime!');return;}if(c%d!==0){A.bad(c+' is not divisible by '+d+'. '+(DIVR.find(r=>r[0]===d)?'Rule: '+DIVR.find(r=>r[0]===d)[1]+'.':''));return;}if(c===d){A.bad(c+' is already prime.');return;}
    st.split.push(d);A.pop();A.say(c+' = '+d+' × '+c/d);draw(true);if(isPrime(c/d))A.good(st.n+' = '+leafs(st).sort((a,b)=>a-b).join(' × '));}
  function check(){if(mode==='play'&&!st.setup&&st.want==='tree'&&isPrime(curV()))game.solved(st.n+' = '+leafs(st).sort((a,b)=>a-b).join(' × ')+'!');}
  function setN(n){st.n=n;st.split=[];draw(false);}
  draw(false);
  return {info:()=>st.n+' = '+leafs(st).sort((a,b)=>a-b).join(' × '),
    controls:()=>{if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok);
      return [2,3,5,7].map(d=>({t:'÷ '+d,big:true,fn:()=>splitBy(d)})).concat([{t:'Start over',fn:()=>setN(st.n)}],mode==='learn'?[{t:'New number',go:true,fn:()=>setN(pick([24,36,42,48,72,84,90,96,100,120]))}]:[]);},
    demo(n){st.ask=null;st.want=null;setN(60);if(n==='tree')A.seq([[800,()=>splitBy(2)],[1100,()=>splitBy(2)],[1100,()=>splitBy(3)]]);if(n==='tree2')A.seq([[800,()=>splitBy(3)],[1100,()=>splitBy(2)],[1100,()=>splitBy(2)],[1100,()=>A.say('Same primes: 2, 2, 3 and 5.')]]);},
    task(r){st.setup=true;st.ask=null;st.want=null;let txt;
      if(r<3){setN(pick([[36,48,45],[60,84,90],[126,150,108]][r]));st.want='tree';txt='Grow the *prime factor tree* for *'+st.n+'*.';}
      else if(r===3){setN(pick([60,72,90]));const n=pick([4152,2826,7311,5418,6237]);const d=pick([3,9]);const s=String(n).split('').reduce((a,b)=>a+ +b,0);const ok=s%d===0;st.ask={ans:ok?'Yes':'No',o:['Yes','No'],ok:'Right! The digits add to '+s+', which '+(ok?'is':'is not')+' divisible by '+d+'.'};txt='Is *'+fmtN(n)+'* divisible by *'+d+'*? Use the rule.';}
      else{setN(48);const d=pick([4,6,8,10]);const good=d===4?pick([316,1124,2512]):d===6?pick([414,1236,2718]):d===8?pick([1128,2416,5064]):pick([1230,4560,7890]);const bad=[good+2,good+5].map(v=>v%d===0?v+1:v);
        st.ask={ans:fmtN(good),o:shuffle([good,...bad].map(fmtN)),ok:'Yes! '+fmtN(good)+' ÷ '+d+' = '+fmtN(good/d)+'.'};txt='Which number is divisible by *'+d+'*?';}
      st.setup=false;return txt;}};}
});
const fmtN=n=>n>=10000?sp(String(n)):String(n);
function isPrime(n){if(n<2)return false;for(let i=2;i*i<=n;i++)if(n%i===0)return false;return true;}
function leafs(st){const out=st.split.slice();out.push(st.split.reduce((a,d)=>a/d,st.n));return out;}

/* =========================================================
   7. Percents of whole numbers (mental math)
   ========================================================= */
P.lesson({id:'percent6',title:'Percents with mental math',strand:'Number',codes:['B2.3'],
 guide:{goal:'Use mental math strategies to find 1%, 5%, 10%, 15%, 25% and 50% of whole numbers, and explain the strategies.',words:'percent, of, half, quarter, tenth, mental math, strategy',
  ask:['How does 10% help you find 5% and 15%?','Why is 25% the same as dividing by 4?','What is 1% of 600?'],home:'At a restaurant, find a 15% tip together: 10% + half of 10%.'},
 learn:[{say:'Percent of a number.',speech:'Here are eighty coins arranged in a hundred grid. Each square holds zero point eight of a coin, so the whole grid is eighty. Ten percent is one row: eight. Watch it light up.',view:'model',demo:'ten'},
        {say:'Read the mental math strategies.',speech:'Fifty percent is half. Twenty-five percent is a quarter. Ten percent is divide by ten. Five percent is half of ten percent. Fifteen percent is ten percent plus five percent. One percent is divide by one hundred.',view:'read'},
        {say:'Watch: fifteen percent.',speech:'Fifteen percent of eighty. Ten percent is eight, and five percent is half of that, four. Eight plus four is twelve.',view:'model',demo:'fifteen'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: shade and find.',speech:'Your turn. Change the whole, shade a percent, and read how much it is worth.',view:'model'}],
 fig:'A hundred grid standing for a whole amount. Each square is 1%.',rz:.15,
 explore:['Shade with *+1%*, *+5%*, *+10%*, or *tap a square*.','Change the *whole* amount.','Read: *percent of whole = amount*.'],
 howTo:'Shade the percent in the question, then choose the amount.',
 init:k=>({N:80,p:10,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'*Percent* means out of 100. To find a percent *of* a number, use friendly percents.')+16;
  [['50%','÷ 2','50% of 80 = 40'],['25%','÷ 4','25% of 80 = 20'],['10%','÷ 10','10% of 80 = 8'],['5%','half of 10%','5% of 80 = 4'],['15%','10% + 5%','15% of 80 = 12'],['1%','÷ 100','1% of 800 = 8']].forEach(([a,b,c],i)=>{rr(g,X0,y+i*58,TW,50,12);g.fillStyle=tint(acc(),.06+(i%2)*.06);g.fill();
    T(g,a,X0+20,y+i*58+35,ZS(32),acc());T(g,b,X0+150,y+i*58+34,FT.bodyB);T(g,c,X0+TW-20,y+i*58+34,FT.body,GREY,'right');});y+=360;
  y=para(p,y,'Mix strategies: *35%* = 25% + 10%. *75%* = 50% + 25%.')+10;
  y=keyWords(p,y,[['percent','a part out of 100'],['15%','10% plus half of 10%']]);
  predict(p,y,S,'p7','What is 15% of $40?','*$6.* 10% is $4, 5% is $2, and $4 + $2 = $6.');},
 readout(p,S,y){const g=p.g,st=S.st,v=Math.round(st.p*st.N)/100;T(g,st.p+'% of '+st.N+' = '+v,X0,y+56,ZS(58),acc());T(g,'each square = '+st.N/100,X0,y+96,FT.body,GREY);return y+104;},
 build(S,grp,mode,game){const st=S.st,u=.27,x0=-1.95,z0=-3.0;const tiles=[];const RC=['#2f7de1','#3b8be6','#16a36f','#22b07c','#e2457a','#ea5a8c','#e89a00','#f0a91c','#8b5cf6','#9a6cf8'];
  const base=mk(new THREE.BoxGeometry(u*10+.1,.04,u*10+.1),lam('#dfe5ef'),20);base.position.set(x0+u*5,.02,z0+u*5);grp.add(base);
  for(let k=0;k<100;k++){const r=Math.floor(k/10),c=k%10;const m=mk(G('pc6',()=>new THREE.CylinderGeometry(u*.42,u*.42,.06,18)),lam('#f4f6fa'),20);m.position.set(x0+(c+.5)*u,.06,z0+(r+.5)*u);grp.add(m);tiles.push(m);A.drag(m,{tap:()=>setP(st.p===k+1?k:k+1)});}
  const wl=label('',{size:.3,bg:'#ffffff',border:'#8b5cf6'});wl.position.set(1.55,1.1,-2.4);grp.add(wl);const pl=label('',{size:.34,bg:'#ffffff'});pl.position.set(1.55,.55,-1.4);grp.add(pl);
  const pile=new THREE.Group();pile.position.set(1.55,0,-.6);grp.add(pile);
  function draw(anim){tiles.forEach((m,k)=>{const on=k<st.p;m.material=lam(on?RC[Math.floor(k/10)]:'#f4f6fa');const y=on?.12+(Math.floor(k/10)%2)*.0:.06;if(anim)moveTo(m,{pos:V(m.position.x,y,m.position.z),k:12});else m.position.y=y;});
    wl.userData.set('whole = '+st.N);const v=Math.round(st.p*st.N)/100;pl.userData.set(st.p+'% = '+v);clearGroup(pile);const n=Math.min(40,Math.round(v));for(let i=0;i<n;i++){const c=mk(G('coin6',()=>new THREE.CylinderGeometry(.11,.11,.035,16)),lam('#e6c15a'),0);c.position.set(((i%4)-1.5)*.22,.02+Math.floor(i/4)*.036,0);pile.add(c);}A.redraw();}
  function setP(p){st.p=Math.max(0,Math.min(100,p));A.pop();draw(true);}
  draw(false);
  return {info:()=>st.p+'% of '+st.N,
    controls:()=>{const c=[{t:'−10%',fn:()=>setP(st.p-10)},{t:'−1%',fn:()=>setP(st.p-1)},{t:'+1%',fn:()=>setP(st.p+1)},{t:'+5%',big:true,fn:()=>setP(st.p+5)},{t:'+10%',big:true,go:true,fn:()=>setP(st.p+10)}];
      if(mode==='play'&&st.ask&&st.p===st.ask.p)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok);
      return mode==='learn'?c.concat([40,80,120,600].map(n=>({t:'whole '+n,on:st.N===n,fn:()=>{st.N=n;draw(false);}}))):c;},
    demo(n){st.ask=null;st.N=80;st.p=0;draw(false);if(n==='ten')A.seq([[700,()=>setP(10)],[900,()=>A.say('10% of 80 = 8')]]);if(n==='fifteen')A.seq([[700,()=>setP(10)],[900,()=>{setP(15);A.say('10% + 5% = 8 + 4 = 12');}]]);},
    task(r){st.setup=true;st.p=0;const T5=[[10,pick([70,90,130,250])],[25,pick([40,60,80,120])],[15,pick([40,60,80,120])],[1,pick([300,500,700])],[5,pick([60,140,220])]][r];st.N=T5[1];const p=T5[0],v=p*st.N/100;
      st.ask={p,ans:v,o:opts(v,[1,-1,v,-v/2,2],1),ok:'Yes! '+p+'% of '+st.N+' = '+v+'.'};draw(false);st.setup=false;
      return 'Find *'+p+'% of '+st.N+'*. Shade '+p+'% first.';}};}
});
})();
