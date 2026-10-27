/* The Interactive Classroom: Grade 4 Math — Number, part A (lessons 1–6) */
(function(){
"use strict";
const P=window.PM;if(!P||P.failed||!P.THREE)return;
const {THREE,V,W,D,PY,PX,X0,TW,INK,RED,BLUE,GREY,VIBE,FT,ZS,G,M,lam,mk,unitBox,cellMat,label,starGeo,wedgeGeo,clearGroup,disposeObj,rr,T,wrap,para,header,keyWords,predict,box,caption,cxOf,cyOf,tint,moveTo,hop,tween,burst,easeOut,easeIO,A}=P;
const acc=()=>P.ACC;
const rnd=(a,b)=>a+Math.floor(Math.random()*(b-a+1)),pick=a=>a[Math.floor(Math.random()*a.length)],shuffle=a=>a.slice().sort(()=>Math.random()-.5);
const fmt=n=>{const s=String(n);const [i,f]=s.split('.');const ii=Math.abs(+i)>=10000?i.replace(/\B(?=(\d{3})+(?!\d))/g,' '):i;return f!=null?ii+'.'+f:ii;};
const ONES=['zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'];
const TENS=['','','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety'];
const words=n=>n<20?ONES[n]:n<100?TENS[Math.floor(n/10)]+(n%10?'-'+ONES[n%10]:''):n<1000?ONES[Math.floor(n/100)]+' hundred'+(n%100?' '+words(n%100):''):n<10000?ONES[Math.floor(n/1000)]+' thousand'+(n%1000?' '+words(n%1000):''):'ten thousand';
function choices(game,list,ans,ok,lab){return list.map(o=>({t:lab?lab(o):String(o),big:true,fn:()=>{if(o===ans)game.solved(ok);else A.bad('Not quite. Try again!');}}));}
/* a flat disk with a printed value, like a place-value counter */
function diskMat(text,col){return M('disk'+text+col,()=>{const c=document.createElement('canvas');c.width=c.height=128;const g=c.getContext('2d');g.fillStyle=col;g.fillRect(0,0,128,128);
  g.strokeStyle='rgba(255,255,255,.75)';g.lineWidth=6;g.beginPath();g.arc(64,64,54,0,Math.PI*2);g.stroke();g.fillStyle='#fff';g.font='700 '+(text.length>3?34:text.length>2?42:56)+'px "Atkinson Hyperlegible", sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText(text,64,68);
  const t=new THREE.CanvasTexture(c);t.anisotropy=4;return new THREE.MeshLambertMaterial({map:t});});}
function disk(text,col,r){const geo=G('disk'+r,()=>new THREE.CylinderGeometry(r,r,.07,28));return mk(geo,[lam(col),diskMat(text,col),lam(col)],30);}
function fracTxt(n,d){return n+'/'+d;}
function drawFrac(g,n,d,x,y,size,col){g.font=ZS(size);const w=Math.max(g.measureText(String(n)).width,g.measureText(String(d)).width);T(g,String(n),x+w/2,y-size*.18,ZS(size),col||INK,'center');
  g.fillStyle=col||INK;g.fillRect(x-4,y-size*.02,w+8,Math.max(3,size*.06));T(g,String(d),x+w/2,y+size*.82,ZS(size),col||INK,'center');return w+8;}

/* =========================================================
   1. Place value to 10 000
   ========================================================= */
const PV=[{k:'th',n:'Thousands',v:1000,col:'#16a36f',max:9},{k:'h',n:'Hundreds',v:100,col:'#2f7de1',max:12},{k:'t',n:'Tens',v:10,col:'#e4572e',max:12},{k:'o',n:'Ones',v:1,col:'#e89a00',max:12}];
const pvVal=c=>c.th*1000+c.h*100+c.t*10+c.o;
const pvExp=n=>{const p=[Math.floor(n/1000)*1000,Math.floor(n/100)%10*100,Math.floor(n/10)%10*10,n%10].filter(x=>x);return p.length?p.map(fmt).join(' + '):'0';};
P.lesson({id:'thousands',title:'Place value to 10 000',strand:'Number',codes:['B1.1','B1.2'],
 guide:{goal:'Read, represent, compose and decompose whole numbers up to 10 000 with place-value disks, write them in standard, expanded and word form, and compare and order them.',words:'thousands, hundreds, tens, ones, place value, expanded form, compose, decompose, greater than, less than',
  ask:['Why is the 4 in 4205 worth 4000?','How do 10 hundreds become 1 thousand?','How can you tell which of 6098 and 6908 is greater without building them?'],home:'Look for big numbers around you: the odometer in a car, a price for a bike, the number of seats in an arena. Read them aloud together.'},
 learn:[{say:'Every place is worth 10 times more.',speech:'Each place is worth ten times the place to its right. Watch Ravi build three thousand, four hundred six.',view:'model',demo:'build'},
        {say:'Read the chart and the three forms.',speech:'Three thousands, four hundreds, zero tens and six ones make three thousand four hundred six. The zero holds the tens place.',view:'read'},
        {say:'Watch: 10 hundreds make 1 thousand.',speech:'Watch the hundreds. When there are ten of them, we trade them for one thousand. This is regrouping.',view:'model',demo:'regroup'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the yellow flap to check.',view:'read'},
        {say:'Your turn: build numbers with disks.',speech:'Your turn. Drag disks from the piles onto the mats, or tap a pile. Tap a disk on a mat to take it away.',view:'model'}],
 fig:'Place-value disks on a thousands, hundreds, tens and ones mat.',rz:.55,
 explore:['*Drag* a disk from a pile onto its own mat, or *tap* the pile.','*Tap* a disk on a mat to take it away.','Get 10 disks in one place, then press *Regroup*.'],
 tries:[['What is the value of the 7 in 7350?','*7000.* The 7 is in the thousands place.'],['Write 5000 + 60 + 2 as a number.','*5062.* There are no hundreds, so a 0 holds that place.'],['Order from least to greatest: 4950, 4509, 5049','*4509, 4950, 5049.* Compare thousands first, then hundreds.']],
 howTo:'Read the number. Drag or tap disks onto the thousands, hundreds, tens and ones mats until the mats show that number.',
 init:k=>k==='play'?{c:{th:0,h:0,t:0,o:0},target:0}:{c:{th:3,h:4,t:0,o:6}},
 left(p,S){const g=p.g,c=S.st.c;let y=header(p,S);
  y=para(p,y,'In our number system each place is worth *10 times* the place to its right. A *0* holds a place when it is empty.')+14;
  const cw=TW/4;PV.forEach((q,i)=>{const x=X0+i*cw,v=c[q.k];rr(g,x+4,y,cw-8,170,16);g.fillStyle=tint(q.col,.14);g.fill();T(g,q.n,x+cw/2,y+38,FT.smallB,q.col,'center');T(g,String(v),x+cw/2,y+128,ZS(84),v>9?RED:INK,'center');});
  y+=214;const n=pvVal(c);T(g,'Standard form:',X0,y,FT.smallB,GREY);T(g,fmt(n),X0+220,y+2,ZS(40));y+=44;T(g,'Expanded form:',X0,y,FT.smallB,GREY);T(g,pvExp(n),X0+220,y+2,ZS(34));y+=44;
  T(g,'Word form:',X0,y,FT.smallB,GREY);wrap(g,words(Math.min(n,10000)),X0+220,y,TW-220,32,{font:FT.cap,color:INK});y+=56;
  y=para(p,y,'To *compare*, start at the greatest place. 4*2*05 > 4*1*98 because 2 hundreds is more than 1 hundred.')+12;
  y=keyWords(p,y,[['place value','what a digit is worth because of its place'],['regroup','trade 10 of one place for 1 of the next place']]);
  predict(p,y,S,'p1','You have 9 hundreds and you add 1 more hundred. What happens?','You have 10 hundreds, so you *trade them for 1 thousand*. The hundreds place becomes 0.');},
 readout(p,S,y){const g=p.g,n=pvVal(S.st.c);PV.forEach((q,i)=>T(g,q.n,cxOf([-1.68,-.56,.56,1.68][i]),cyOf(-.12),FT.smallB,q.col,'center'));
  T(g,fmt(n),X0,y+48,ZS(64),acc());T(g,'= '+pvExp(n),X0+230,y+30,FT.bodyB);wrap(g,words(Math.min(n,10000)),X0+230,y+66,TW-230,28,{font:FT.cap,color:GREY});return y+96;},
 build(S,grp,mode,game){const st=S.st,MX={th:-1.68,h:-.56,t:.56,o:1.68},MZ=-1.5,MWd=1.04,R=.14;
  PV.forEach(q=>{const m=mk(new THREE.BoxGeometry(MWd,.03,2.05),lam(['#d7f1e5','#d7e6fb','#fbdde6','#fff0c4'][PV.indexOf(q)]),20);m.position.set(MX[q.k],.015,MZ);grp.add(m);});
  const slot=(k,i)=>V(MX[k]+((i%3)-1)*.33,.05+(i>=12?.08:0),MZ-.82+Math.floor((i%12)/3)*.38);
  const stacks={th:[],h:[],t:[],o:[]};let busyT=false;
  const total=label('0',{size:.42,bg:'#ffffff'});total.position.set(0,1.75,MZ);grp.add(total);
  const onMat=(k,p)=>Math.abs(p.x-MX[k])<MWd/2+.12&&Math.abs(p.z-MZ)<1.15;
  const mkD=k=>{const q=PV.find(z=>z.k===k);return disk(String(q.v),q.col,R);};
  function relayout(k){stacks[k].forEach((m,i)=>moveTo(m,{pos:slot(k,i),k:10}));}
  function spawn(k,drop){const m=mkD(k);const p=slot(k,stacks[k].length);m.position.copy(p);if(drop)m.position.y+=1.1;grp.add(m);moveTo(m,{pos:p,k:9});
    A.drag(m,{tap:()=>remove(k,m),drop:(pos,o)=>{if(onMat(k,pos))relayout(k);else remove(k,o);}});stacks[k].push(m);}
  function render(drop){PV.forEach(({k})=>{const a=stacks[k];while(a.length<st.c[k])spawn(k,drop);while(a.length>st.c[k]){const m=a.pop();A.unclick(m);moveTo(m,{scale:.01,k:16,done:()=>{grp.remove(m);disposeObj(m);}});}});changed();}
  function changed(){total.userData.set(fmt(pvVal(st.c)));if(mode==='play'&&pvVal(st.c)===st.target)game.solved('Yes! That is '+fmt(st.target)+'.');A.redraw();}
  function add(k){if(busyT)return;const q=PV.find(z=>z.k===k);if(st.c[k]>=q.max){A.bad(k==='th'?'This mat holds 9 thousands.':'Too many! Press Regroup to trade 10 for 1 of the next place.');return;}
    st.c[k]++;spawn(k,true);A.pop();if(st.c[k]===10&&k!=='th')A.say('You have 10 '+q.n.toLowerCase()+'. Regroup them!');changed();}
  function remove(k,m){if(busyT||st.c[k]<=0)return;const a=stacks[k];const i=m?a.indexOf(m):a.length-1;if(i<0)return;const o=a.splice(i,1)[0];A.unclick(o);st.c[k]--;moveTo(o,{scale:.01,k:16,done:()=>{grp.remove(o);disposeObj(o);}});relayout(k);changed();}
  function regroup(){if(busyT)return;const order=['o','t','h'],up={o:'t',t:'h',h:'th'};const k=order.find(q=>st.c[q]>=10);if(!k){A.bad('No place has 10 disks yet.');return;}
    if(k==='h'&&st.c.th>=9){A.bad('The thousands mat is full.');return;}busyT=true;const u=up[k];const ten=stacks[k].splice(-10,10);const tgt=slot(u,stacks[u].length);
    ten.forEach((m,i)=>{A.unclick(m);moveTo(m,{pos:tgt.clone().add(V(0,.08*i+.1,0)),k:5+i*.4,done:i===9?()=>{ten.forEach(o=>{grp.remove(o);disposeObj(o);});st.c[k]-=10;st.c[u]++;busyT=false;spawn(u,false);relayout(k);
      A.good('10 '+PV.find(z=>z.k===k).n.toLowerCase()+' became 1 '+PV.find(z=>z.k===u).n.toLowerCase().replace(/s$/,'')+'!');changed();}:null});});}
  PV.forEach(q=>{const pile=new THREE.Group();[[0,0,0],[.1,.07,.05],[-.06,.14,-.04]].forEach(([x,y,z])=>{const d=mkD(q.k);d.position.set(x,.04+y,z);pile.add(d);});pile.position.set(MX[q.k],0,.32);grp.add(pile);
    const tag=label('drag me',{size:.15,color:'#2a62c9',font:'64px "Patrick Hand", cursive'});tag.position.set(MX[q.k],.42,.62);grp.add(tag);let ghost=null;
    A.drag(pile,{tap:()=>add(q.k),start:()=>{ghost=mkD(q.k);ghost.position.copy(pile.position);grp.add(ghost);},move:pt=>{if(ghost)ghost.position.copy(grp.worldToLocal(pt));},
      drop:()=>{if(!ghost)return;const pos=ghost.position.clone();grp.remove(ghost);disposeObj(ghost);ghost=null;const k2=PV.map(z=>z.k).find(z=>onMat(z,pos));if(k2===q.k)add(q.k);else if(k2)A.bad(q.n+' go on the '+q.n.toLowerCase()+' mat.');}});});
  render(false);
  function set(th,h,t,o){st.c={th,h,t,o};render(true);}
  return {info:()=>fmt(pvVal(st.c))+' = '+pvExp(pvVal(st.c)),
    controls:()=>[{t:'+1000',big:true,fn:()=>add('th')},{t:'+100',big:true,fn:()=>add('h')},{t:'+10',big:true,fn:()=>add('t')},{t:'+1',big:true,fn:()=>add('o')},
      {t:'Regroup 10 → 1',go:true,fn:regroup,dis:!['o','t','h'].some(k=>st.c[k]>=10)},{t:'Clear',fn:()=>set(0,0,0,0)}],
    demo(n){if(n==='build'){set(0,0,0,0);A.seq([[600,()=>{for(let i=0;i<3;i++)add('th');A.say('3 thousands');}],[1300,()=>{for(let i=0;i<4;i++)add('h');A.say('4 hundreds');}],[1300,()=>A.say('0 tens: the zero holds the place')],[1300,()=>{for(let i=0;i<6;i++)add('o');A.say('6 ones. That makes 3406!');}]]);}
      if(n==='regroup'){set(1,9,2,0);A.seq([[1000,()=>add('h')],[1200,regroup],[1800,()=>A.say('9 hundreds + 1 hundred = 10 hundreds = 1 thousand. Now it is 2020.')]]);}},
    task(r){st.c={th:0,h:0,t:0,o:0};render(false);let n,txt;
      if(r===0){n=rnd(1,9)*1000+rnd(1,9)*100+rnd(1,9)*10+rnd(1,9);txt='Build the number *'+fmt(n)+'*.';}
      else if(r===1){n=rnd(2,9)*1000+(Math.random()<.5?rnd(1,9)*10+rnd(1,9):rnd(1,9)*100+rnd(1,9));txt='Build *'+fmt(n)+'*. Watch the zero!';}
      else if(r===2){const b=rnd(1,7)*1000+rnd(1,9)*100+rnd(0,9)*10+rnd(1,9);n=b+1000;txt='Build the number that is *1000 more than '+fmt(b)+'*.';}
      else if(r===3){n=rnd(1,9)*1000+rnd(0,9)*100+rnd(1,9)*10+rnd(0,9);txt='Build *'+words(n)+'*.';}
      else{const th=rnd(2,8),a=rnd(1,8),b=rnd(1,8);const x=th*1000+a*100+b*10+rnd(0,9),y=th*1000+b*100+a*10+rnd(0,9);n=Math.max(x,y);if(x===y){n=x+100;}txt='Build the *greater* number: *'+fmt(x)+'* or *'+fmt(y===x?x+100:y)+'*.';}
      st.target=n;return txt;}};}
});

/* =========================================================
   2. Rounding to tens, hundreds and thousands
   ========================================================= */
P.lesson({id:'round4',title:'Rounding to 10, 100 and 1000',strand:'Number',codes:['B1.3'],
 guide:{goal:'Round whole numbers to the nearest ten, hundred or thousand, and explain why rounding is useful in everyday contexts.',words:'round, nearest, halfway, round up, round down, estimate, about',
  ask:['Why does 4500 round up to 5000?','When would rounding to the nearest thousand be more useful than to the nearest ten?','Which two thousands is 6738 between?'],home:'Read the number of kilometres on a car or the attendance at a game, then round it to the nearest hundred and thousand.'},
 learn:[{say:'Rounding finds the nearest landmark.',speech:'To round, find the two landmark numbers on each side. Isla’s ball always rolls down to the nearest valley. Watch three thousand four hundred eighty-two.',view:'model',demo:'roll'},
        {say:'Read the rounding rule.',speech:'Look at the digit to the right of the place you are rounding to. Zero to four rounds down. Five to nine rounds up.',view:'read'},
        {say:'Watch: a number right at halfway.',speech:'Six thousand five hundred is exactly halfway between six thousand and seven thousand. When a number is halfway, we round up.',view:'model',demo:'half'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: round and roll.',speech:'Your turn. Pick tens, hundreds or thousands. Tap the valley where you think the ball will stop, then watch it roll.',view:'model'}],
 fig:'A hill between two landmark numbers. The ball rolls to the nearest one.',rz:-.15,
 explore:['Choose to round to the nearest *10*, *100* or *1000*.','*Tap a valley* to say where the ball will stop.','Press *New number* to try again.'],
 tries:[['Round 7385 to the nearest hundred.','*7400.* 7385 is between 7300 and 7400. The tens digit is 8, so round up.'],['Round 2490 to the nearest thousand.','*2000.* The hundreds digit is 4, so round down.'],['A stadium holds 9563 people. About how many is that to the nearest thousand?','*About 10 000.* The hundreds digit is 5, so round up.']],
 howTo:'Read the number and the place. Tap the valley (or button) for the landmark you think is nearest. The ball rolls to show the answer.',
 init:k=>({n:3482,base:100,picked:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'*Rounding* changes a number to a nearby *landmark* number that is easier to use. Find the landmarks on each side, then see which is closer.')+16;
  const lx=X0+30,lw=TW-60,toX=v=>lx+(v-3400)/100*lw;g.strokeStyle=INK;g.lineWidth=4;g.beginPath();g.moveTo(lx,y+110);g.quadraticCurveTo(lx+lw/2,y-20,lx+lw,y+110);g.stroke();
  [[3400,'3400'],[3450,'halfway 3450'],[3500,'3500']].forEach(([v,t],i)=>{const x=toX(v);T(g,t,x,y+150,i===1?FT.small:FT.bodyB,i===1?GREY:INK,'center');});
  const bx=toX(3482);g.beginPath();g.arc(bx,y+58,18,0,Math.PI*2);g.fillStyle='#e4572e';g.fill();T(g,'3482',bx,y+20,FT.smallB,'#e4572e','center');T(g,'rolls this way →',bx-180,y+92,FT.hand,BLUE);y+=190;
  rr(g,X0,y,TW,120,18);g.fillStyle=tint(acc(),.1);g.fill();T(g,'Look at the digit to the right of the rounding place:',X0+24,y+42,FT.smallB);
  T(g,'0, 1, 2, 3, 4  →  round down',X0+24,y+82,FT.body,BLUE);T(g,'5, 6, 7, 8, 9  →  round up',X0+430,y+82,FT.body,'#e4572e');y+=150;
  y=para(p,y,'3*4*82 to the nearest hundred: the tens digit is 8, so it rounds *up to 3500*. To the nearest thousand: the hundreds digit is 4, so it rounds *down to 3000*.')+12;
  y=keyWords(p,y,[['round','change a number to the nearest landmark'],['estimate','an answer that is close, not exact']]);
  predict(p,y,S,'p2','Round 5650 to the nearest thousand.','*6000.* The hundreds digit is 6, so round up.');},
 readout(p,S,y){const g=p.g,st=S.st,lo=Math.floor(st.n/st.base)*st.base,hi=lo+st.base,ans=st.n-lo>=st.base/2?hi:lo;
  T(g,fmt(st.n)+' → nearest '+st.base,X0,y+42,ZS(44),acc());T(g,'between '+fmt(lo)+' and '+fmt(hi)+(st.picked==null?'':'   ·   rounds to '+fmt(ans)),X0,y+84,FT.bodyB);return y+94;},
 build(S,grp,mode,game){const st=S.st,Z=-1.55,L=4.0,H=1.05;const yOf=u=>H*(1-Math.cos(2*Math.PI*u))/2,xOf=u=>-L/2+L*u;
  const pts=[];for(let i=0;i<=60;i++){const u=i/60;pts.push(V(xOf(u),.12+yOf(u),Z));}
  const curve=new THREE.CatmullRomCurve3(pts);const track=mk(new THREE.TubeGeometry(curve,120,.07,10,false),lam('#8fd9b6'),0);grp.add(track);
  for(let i=0;i<=10;i++){const u=i/10;const post=mk(new THREE.CylinderGeometry(.02,.02,.12+yOf(u),6),lam(i%5?'#bcd':'#16a36f'),0);post.position.set(xOf(u),(.12+yOf(u))/2,Z);grp.add(post);}
  const base=mk(new THREE.BoxGeometry(L+.4,.05,.5),lam('#d7f1e5'),20);base.position.set(0,.025,Z);grp.add(base);
  const ball=mk(new THREE.SphereGeometry(.17,24,16),lam('#e4572e'),0);grp.add(ball);
  const flag=label('',{size:.3,bg:'#ffffff'});grp.add(flag);
  const vl=[label('',{size:.3,bg:'#ffffff',border:'#16a36f'}),label('',{size:.3,bg:'#ffffff',border:'#16a36f'})],mid=label('',{size:.2,color:GREY});vl.forEach(l=>grp.add(l));grp.add(mid);
  const pads=[-1,1].map(s=>{const pd=mk(new THREE.CylinderGeometry(.3,.3,.06,28),lam('#ffd24a'),30);pd.position.set(s*(L/2+.02),.06,Z+.55);grp.add(pd);return pd;});
  let u=0,rolling=false;
  function lohi(){const lo=Math.floor(st.n/st.base)*st.base;return [lo,lo+st.base];}
  function place(){const [lo,hi]=lohi();u=(st.n-lo)/st.base;const p=V(xOf(u),.12+yOf(u)+.24,Z);ball.position.copy(p);flag.userData.set(fmt(st.n));flag.position.set(p.x,p.y+.55,Z);
    vl[0].userData.set(fmt(lo));vl[0].position.set(xOf(0),.55,Z+.55);vl[1].userData.set(fmt(hi));vl[1].position.set(xOf(1),.55,Z+.55);mid.userData.set('halfway '+fmt(lo+st.base/2));mid.position.set(0,1.62,Z);}
  function roll(cb){if(rolling)return;rolling=true;const tgtU=u>=.5?1:0,u0=u;const dur=.7+Math.abs(tgtU-u0)*1.2;
    tween(dur,k=>{u=u0+(tgtU-u0)*k;ball.position.set(xOf(u),.12+yOf(u)+.24,Z);ball.rotation.z-=(tgtU>u0?1:-1)*.12;flag.position.set(ball.position.x,ball.position.y+.55,Z);},x=>x*x*(3-2*x)).then(()=>{rolling=false;if(cb)cb(tgtU===1);});}
  function choose(up){if(rolling)return;st.picked=up;A.redraw();const [lo,hi]=lohi();roll(isUp=>{const ans=isUp?hi:lo;
    if(up===isUp){A.good(fmt(st.n)+' rounds to '+fmt(ans)+'.',V(W/2+xOf(isUp?1:0),PY+.8,Z));if(mode==='play')game.solved(fmt(st.n)+' rounds to '+fmt(ans)+'.');}
    else{A.bad('It rolled the other way. '+fmt(st.n)+' rounds to '+fmt(ans)+'.');A.later(()=>{if(mode==='play'){place();A.redraw();}},1600);}A.redraw();});}
  pads.forEach((pd,i)=>A.drag(pd,{tap:()=>choose(i===1)}));
  function fresh(){const b=st.base,lo=b===1000?rnd(1,9)*1000:b===100?rnd(10,99)*100:rnd(100,999)*10;st.n=lo+rnd(1,b-1);if(b===10)st.n=lo+rnd(1,9);st.picked=null;place();A.redraw();}
  place();
  return {info:()=>'Round '+fmt(st.n)+' to the nearest '+st.base,
    controls:()=>{const [lo,hi]=lohi();const c=[{t:'Round down to '+fmt(lo),big:true,fn:()=>choose(false)},{t:'Round up to '+fmt(hi),big:true,fn:()=>choose(true)}];
      if(mode==='learn')return [10,100,1000].map(b=>({t:'nearest '+b,on:st.base===b,fn:()=>{st.base=b;fresh();}})).concat(c,[{t:'New number',go:true,fn:fresh}]);return c;},
    demo(n){if(n==='roll'){st.base=100;st.n=3482;st.picked=null;place();A.seq([[900,()=>roll(()=>A.say('3482 rounds up to 3500.'))]]);}
      if(n==='half'){st.base=1000;st.n=6500;st.picked=null;place();A.redraw();A.seq([[1100,()=>roll(()=>A.say('Halfway rounds up: 6500 rounds to 7000.'))]]);}},
    task(r){st.base=[10,100,1000,100,1000][r];const lo=st.base===1000?rnd(1,9)*1000:st.base===100?rnd(10,98)*100:rnd(100,998)*10;
      st.n=r===3?lo+50:st.base===10?lo+rnd(1,9):lo+rnd(1,st.base-1);if(st.n%st.base===0)st.n+=1;st.picked=null;place();
      return r===4?'About how many people? Round *'+fmt(st.n)+'* to the nearest *thousand*.':'Round *'+fmt(st.n)+'* to the nearest *'+st.base+'*.';}};}
});

/* =========================================================
   3. Fractions: halves to tenths, and counting by fractions
   ========================================================= */
P.lesson({id:'fractions4',title:'Fractions from halves to tenths',strand:'Number',codes:['B1.4','B1.6'],
 guide:{goal:'Represent fractions from halves to tenths with fraction bars and standard notation, explain the numerator and denominator, and count by fractions past one whole.',words:'fraction, numerator, denominator, unit fraction, whole, mixed number',
  ask:['What does the 5 in 3/5 tell you?','Why is 1/8 smaller than 1/3?','How many fourths make 2 wholes?'],home:'Cut a sandwich or a sheet of paper into equal parts. Name each part, then count the parts: one third, two thirds, three thirds…'},
 learn:[{say:'Equal parts make fractions.',speech:'A fraction names equal parts of a whole. Watch Kofi’s bar split into fifths, and three of the five parts light up. That is three fifths.',view:'model',demo:'fifths'},
        {say:'Read about numerators and denominators.',speech:'The bottom number, the denominator, tells how many equal parts make one whole. The top number, the numerator, tells how many parts we are counting.',view:'read'},
        {say:'Watch: counting by fourths.',speech:'Now count by fourths: one fourth, two fourths, three fourths, four fourths makes one whole, five fourths is one and one fourth.',view:'model',demo:'count'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: split and shade.',speech:'Your turn. Choose how many parts, then tap the bar to shade parts. You can shade past one whole into the second bar.',view:'model'}],
 fig:'Two fraction bars, each one whole, above a number line from 0 to 2.',rz:-.1,
 explore:['Pick the *denominator*: halves up to tenths.','*Tap a part* to shade up to it. Tap the first part again to clear.','Shade past one whole to *count by fractions* into the second bar.'],
 tries:[['What fraction of a bar is shaded if 4 of 6 equal parts are shaded?','*4/6.* 4 is the numerator, 6 is the denominator.'],['Count by thirds: 1/3, 2/3, ___, 4/3','*3/3* (one whole). Then 4/3 is one and one third.'],['Which is bigger: 1/5 or 1/10?','*1/5.* When a whole is cut into fewer parts, each part is bigger.']],
 howTo:'Read the fraction. Choose the right number of parts, then tap the bars to shade that many parts.',
 init:k=>({d:5,n:3,needD:null,target:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'A *fraction* names equal parts of one whole. The bar below is cut into *8 equal parts* and 3 are shaded.')+16;
  const bx=X0,bw=TW-210,bh=70;for(let i=0;i<8;i++){rr(g,bx+i*bw/8+2,y,bw/8-4,bh,8);g.fillStyle=i<3?'#2f7de1':'#e9eef7';g.fill();}
  drawFrac(g,3,8,X0+TW-150,y+40,52,'#2f7de1');y+=bh+40;
  [['numerator','3','how many parts we count'],['denominator','8','how many equal parts make one whole']].forEach(([a,b,c],i)=>{T(g,b,X0+20,y+i*48,ZS(40),'#2f7de1');T(g,a,X0+70,y+i*48-4,FT.bodyB);T(g,c,X0+310,y+i*48-4,FT.small,GREY);});y+=110;
  y=para(p,y,'*Counting by fractions:* 1/4, 2/4, 3/4, 4/4 = 1 whole, 5/4 = *1 and 1/4*. More parts in a whole means *smaller* parts: 1/10 < 1/2.')+12;
  y=keyWords(p,y,[['unit fraction','one equal part, like 1/6'],['mixed number','a whole number and a fraction, like 1 1/4']]);
  predict(p,y,S,'p3','How many tenths make one whole?','*10 tenths.* 10/10 = 1 whole.');},
 readout(p,S,y){const g=p.g,st=S.st,whole=Math.floor(st.n/st.d),r=st.n%st.d;let x=X0;x+=drawFrac(g,st.n,st.d,x,y+50,50,acc())+24;
  T(g,st.n+' '+(st.d===2?'half':['','','half','third','fourth','fifth','sixth','seventh','eighth','ninth','tenth'][st.d])+(st.n===1?'':'s'),x,y+46,FT.bodyB);
  if(whole>0)T(g,'= '+(r?whole+' and '+r+'/'+st.d:whole+' whole'+(whole>1?'s':'')),x,y+86,FT.bodyB,'#16a36f');return y+104;},
 build(S,grp,mode,game){const st=S.st,Zb=-2.05,Zl=-.95,L1=2.0,x0=-2.0;
  const bars=new THREE.Group();grp.add(bars);const line=new THREE.Group();grp.add(line);let pieces=[];
  const tok=mk(new THREE.ConeGeometry(.13,.3,20),lam('#e4572e'),0);tok.rotation.x=Math.PI;grp.add(tok);const tl=label('',{size:.24,bg:'#ffffff'});grp.add(tl);
  function rebuild(){clearGroup(bars);clearGroup(line);pieces=[];const d=st.d,w=L1/d;
    for(let b=0;b<2;b++)for(let i=0;i<d;i++){const k=b*d+i;const m=mk(G('fp'+d,()=>new THREE.BoxGeometry(w-.035,.3,.6)),lam(k<st.n?(b?'#16a36f':'#2f7de1'):'#eef2f8'),20);
      m.position.set(x0+b*L1+(i+.5)*w,.15+(k<st.n?.06:0),Zb);bars.add(m);pieces.push(m);A.drag(m,{tap:()=>setN(st.n===k+1?k:k+1)});}
    const tr=mk(new THREE.BoxGeometry(2*L1+.1,.05,.12),lam('#cbd5e6'),0);tr.position.set(0,.03,Zl);line.add(tr);
    for(let k=0;k<=2*d;k++){const big=k%d===0;const t=new THREE.Mesh(G('ftick'+big,()=>new THREE.BoxGeometry(.02,big?.22:.12,.02)),lam(INK));t.position.set(x0+k*w,.05+(big?.11:.06),Zl);line.add(t);
      if(big){const l=label(String(k/d),{size:.26});l.position.set(x0+k*w,.45,Zl+.3);line.add(l);}}place();}
  function place(){const w=L1/st.d;tok.position.set(x0+st.n*w,.42,Zl);tl.userData.set(st.n+'/'+st.d);tl.position.set(x0+st.n*w,.86,Zl);}
  function setN(n){n=Math.max(0,Math.min(2*st.d,n));st.n=n;pieces.forEach((m,k)=>{const on=k<n;m.material=lam(on?(k>=st.d?'#16a36f':'#2f7de1'):'#eef2f8');moveTo(m,{pos:V(m.position.x,.15+(on?.06:0),Zb),k:14});});
    hop(tok,V(x0+n*L1/st.d,.42,Zl),.25,.3).then(()=>{place();});A.pop();check();A.redraw();}
  function setD(d){st.d=d;st.n=Math.min(st.n,2*d);rebuild();check();A.redraw();}
  function check(){if(mode!=='play'||!st.target)return;const [n,d]=st.target;if(st.d===d&&st.n===n)game.solved('Yes! That shows '+n+'/'+d+(n>=d?' = '+(n%d?Math.floor(n/d)+' and '+(n%d)+'/'+d:n/d):'')+'.');}
  rebuild();
  return {info:()=>st.n+'/'+st.d+'  (tap a part to shade)',
    controls:()=>[2,3,4,5,6,8,10].map(d=>({t:'/'+d,on:st.d===d,fn:()=>setD(d)})).concat([{t:'−1',big:true,fn:()=>setN(st.n-1)},{t:'+1 part',big:true,go:true,fn:()=>setN(st.n+1)}]),
    demo(n){if(n==='fifths'){st.n=0;setD(5);A.seq([[700,()=>setN(1)],[600,()=>setN(2)],[600,()=>setN(3)],[800,()=>A.say('3 out of 5 equal parts: 3/5.')]]);}
      if(n==='count'){st.n=0;setD(4);const l=[];for(let i=1;i<=6;i++)l.push([700,()=>{setN(i);A.say(i===4?'4/4 = 1 whole':i>4?i+'/4 = 1 and '+(i-4)+'/4':i+'/4');}]);A.seq(l);}},
    task(r){const T5=[[3,5,true],[7,10,false],[7,4,true],[12,6,true],null];let t=T5[r];if(!t){const d=pick([3,6,8]);t=[rnd(1,d-1),d,false];}
      st.target=[t[0],t[1]];st.n=0;if(t[2]){st.d=t[1];}else st.d=2;rebuild();A.redraw();
      const [n,d]=st.target;return r===2?'Count by fourths to *1 and 3/4*. Shade that many fourths.':r===3?'Show *2 wholes* using *sixths*.':'Show *'+n+'/'+d+'*'+(t[2]?'.':'. Pick the right number of parts first.');}};}
});

/* =========================================================
   4. Comparing fair shares
   ========================================================= */
const SHR=[2,3,4,5,6,8,10];
P.lesson({id:'fairshare',title:'Comparing fair shares',strand:'Number',codes:['B1.5'],
 guide:{goal:'Use models to represent, compare and order the fair-share portions that result from sharing one whole among different numbers of people (2, 3, 4, 5, 6, 8 and 10).',words:'fair share, portion, unit fraction, compare, greater than, less than',
  ask:['Would you rather share a pizza with 3 friends or with 7? Why?','Why is 1/6 less than 1/4 even though 6 is more than 4?','Put 1/2, 1/10 and 1/5 in order.'],home:'Cut two equal pieces of toast, one into 3 pieces and one into 6. Compare one piece of each.'},
 learn:[{say:'More sharers, smaller shares.',speech:'Hana sets two tables, with two pizzas the same size. Four friends share one, and six friends share the other. Watch: one sixth is smaller than one fourth.',view:'model',demo:'compare'},
        {say:'Read about comparing unit fractions.',speech:'When the same whole is shared by more people, each share is smaller. So one tenth is less than one fifth.',view:'read'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: change the tables.',speech:'Your turn. Change how many people sit at each table, and compare one share from each pizza.',view:'model'}],
 fig:'Two same-size pizzas shared fairly at two tables.',rz:.05,
 explore:['Change the number of people at the *left* and *right* tables.','The lifted slice is *one person\'s share*.','Compare the two shares: which is greater?'],
 tries:[['Which is greater: 1/3 or 1/8?','*1/3.* Sharing with fewer people gives a bigger share.'],['Order from least to greatest: 1/2, 1/10, 1/5','*1/10, 1/5, 1/2.*'],['8 friends share a cake. What fraction does each get?','*1/8* of the cake.']],
 howTo:'Read the question. Tap the pizza (or the button) for the table that answers it.',
 init:k=>({a:4,b:6,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'When one whole is shared *fairly*, everyone gets the same size *portion*. The more people share it, the *smaller* each portion.')+18;
  [[3,X0+170,'#2f7de1'],[6,X0+590,'#e4572e']].forEach(([n,cx,col])=>{const cy=y+120,r=110;for(let i=0;i<n;i++){g.beginPath();g.moveTo(cx,cy);g.arc(cx,cy,r,i*2*Math.PI/n-Math.PI/2,(i+1)*2*Math.PI/n-Math.PI/2);g.closePath();g.fillStyle=i===0?col:'#ffe3a8';g.fill();g.lineWidth=3;g.strokeStyle=INK;g.stroke();}
    T(g,'shared by '+n,cx,cy+r+44,FT.bodyB,INK,'center');T(g,'each gets 1/'+n,cx,cy+r+80,FT.small,col,'center');});
  T(g,'>',X0+380,y+140,ZS(80),INK,'center');y+=362;
  y=para(p,y,'So *1/3 > 1/6*. For unit fractions, a *bigger denominator* means a *smaller* piece.')+12;
  y=keyWords(p,y,[['fair share','equal portions for everyone'],['unit fraction','one part of a whole, like 1/5']]);
  predict(p,y,S,'p4','Who gets more: one of 5 people sharing a pie, or one of 10 people sharing the same size pie?','*One of 5 people.* 1/5 is greater than 1/10.');},
 readout(p,S,y){const g=p.g,st=S.st,sym=st.a<st.b?'>':st.a>st.b?'<':'=';T(g,'1/'+st.a+'  '+sym+'  1/'+st.b,X0,y+54,ZS(56),acc());
  T(g,st.a===st.b?'Same number of people, same share.':(st.a<st.b?'The left share is bigger: fewer people.':'The right share is bigger: fewer people.'),X0,y+96,FT.bodyB);return y+106;},
 build(S,grp,mode,game){const st=S.st,R=.82,Z=-1.45,XS=[-1.18,1.18];const tables=XS.map((x,i)=>{const g=new THREE.Group();g.position.set(x,0,Z);grp.add(g);
    const tb=mk(new THREE.CylinderGeometry(1.05,1.05,.06,40),lam(i?'#fde3ec':'#dbe8fb'),30);tb.position.y=.03;g.add(tb);const pz=new THREE.Group();pz.position.y=.08;g.add(pz);g.userData.pz=pz;
    const ppl=new THREE.Group();g.add(ppl);g.userData.ppl=ppl;const lb=label('',{size:.28,bg:'#ffffff'});lb.position.set(0,1.55,0);g.add(lb);g.userData.lb=lb;A.drag(g,{tap:()=>pickT(i)});return g;});
  function fill(i,n){const t=tables[i],pz=t.userData.pz,ppl=t.userData.ppl;clearGroup(pz);clearGroup(ppl);
    for(let k=0;k<n;k++){const a0=k*2*Math.PI/n,a1=(k+1)*2*Math.PI/n;const m=mk(wedgeGeo(R,.12,a0+.02,a1-.02),lam(k===0?(i?'#e4572e':'#2f7de1'):'#ffd27a'),30);
      if(k===0){const mid=(a0+a1)/2;m.position.set(Math.cos(mid)*.16,.32,-Math.sin(mid)*.16);}pz.add(m);
      const ang=(k+.5)*2*Math.PI/n;const pe=new THREE.Group();const bd=mk(G('pbody',()=>new THREE.CylinderGeometry(.06,.08,.22,12)),lam(VIBE[k%6]),0);bd.position.y=.11;pe.add(bd);
      const hd=mk(G('phead',()=>new THREE.SphereGeometry(.07,12,10)),lam('#f2c9a0'),0);hd.position.y=.29;pe.add(hd);pe.position.set(Math.cos(ang)*.98,.06,-Math.sin(ang)*.98);ppl.add(pe);}
    t.userData.lb.userData.set('1/'+n);}
  function both(){fill(0,st.a);fill(1,st.b);A.redraw();}
  function pickT(i){if(mode!=='play'||!st.ask)return;if(i===st.ask.ans){game.solved(st.ask.ok);}else A.bad('Look again: '+st.ask.why);}
  const cyc=(v,d)=>SHR[(SHR.indexOf(v)+d+SHR.length)%SHR.length];
  both();
  return {tick(dt,t){tables.forEach((g,i)=>{const m=g.userData.pz.children[0];if(m)m.position.y=.32+Math.sin(t*2+i)*.04;});},
    info:()=>'Left: 1/'+st.a+'   ·   Right: 1/'+st.b,
    controls:()=>mode==='play'?[{t:'Left table',big:true,fn:()=>pickT(0)},{t:'Right table',big:true,fn:()=>pickT(1)}]:
      [{t:'Left −',fn:()=>{st.a=cyc(st.a,-1);both();}},{t:'Left +',fn:()=>{st.a=cyc(st.a,1);both();}},{t:'Right −',fn:()=>{st.b=cyc(st.b,-1);both();}},{t:'Right +',fn:()=>{st.b=cyc(st.b,1);both();}}],
    demo(){st.a=2;st.b=2;both();A.seq([[700,()=>{st.a=4;both();A.say('4 people: each gets 1/4')}],[1500,()=>{st.b=6;both();A.say('6 people: each gets 1/6')}],[1700,()=>A.say('1/4 > 1/6: fewer people, bigger share.')]]);},
    task(r){let a=pick(SHR),b=pick(SHR.filter(x=>x!==a));st.a=a;st.b=b;both();
      if(r===3){st.ask={ans:a>b?0:1,ok:'Yes! 1/'+Math.max(a,b)+' is the smaller share.',why:'more people means smaller shares.'};return 'Tap the table where each person gets the *smaller* share.';}
      if(r===4){const t=a;st.ask={ans:0,ok:'Yes! That table shares by '+t+', so each gets 1/'+t+'.',why:'count the people at each table.'};return 'Tap the table where each person gets *1/'+t+'*.';}
      st.ask={ans:a<b?0:1,ok:'Yes! 1/'+Math.min(a,b)+' > 1/'+Math.max(a,b)+'.',why:'fewer people means bigger shares.'};return 'Tap the table where each person gets *more* pizza.';}};}
});

/* =========================================================
   5. Decimal tenths
   ========================================================= */
P.lesson({id:'decimals',title:'Decimal tenths',strand:'Number',codes:['B1.7','B1.8','B1.9'],
 guide:{goal:'Read, represent, compare and order decimal tenths, round decimals to the nearest whole number, and show that tenths can be written as fractions or decimals.',words:'decimal, decimal point, tenth, whole, round, equivalent',
  ask:['Why is 0.7 the same as 7/10?','Which is greater, 2.9 or 3.1? How do you know?','What is 4.5 rounded to the nearest whole number?'],home:'Measure things with a ruler in centimetres and tenths (millimetres). A pencil might be 14.6 cm long.'},
 learn:[{say:'Tenths come after the decimal point.',speech:'A whole bar is made of ten tenths. Watch Finn build two and seven tenths: two whole bars and seven tenth pieces. We write it two point seven.',view:'model',demo:'build'},
        {say:'Read about decimals and fractions.',speech:'Seven tenths can be written as the fraction seven over ten, or as the decimal zero point seven. They mean the same amount.',view:'read'},
        {say:'Watch: rounding to the nearest whole.',speech:'Two point seven is between two and three. It is closer to three, so it rounds up to three.',view:'model',demo:'round'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: build decimals.',speech:'Your turn. Add wholes and tenths. When you have ten tenths, trade them for a whole.',view:'model'}],
 fig:'Whole bars and tenth pieces, with a number line from 0 to 5.',rz:.25,
 explore:['Add *wholes* and *tenths* with the buttons, or tap a pile.','*Tap a piece* to take it away.','Press *Round* to roll the marker to the nearest whole.'],
 tries:[['Write 6/10 as a decimal.','*0.6.*'],['Which is greater: 3.2 or 2.9?','*3.2.* It has 3 wholes; 2.9 has only 2.'],['Round 5.4 to the nearest whole number.','*5.* 5.4 is closer to 5 than to 6.']],
 howTo:'Read the decimal. Build it with whole bars and tenth pieces, or answer the rounding question.',
 init:k=>({w:2,t:7,target:null,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'One whole can be cut into *10 tenths*. The *decimal point* separates the wholes from the tenths.')+16;
  const bw=(TW-40)/3;for(let b=0;b<3;b++){for(let i=0;i<10;i++){const on=b<2||i<7;rr(g,X0+b*(bw+20)+i*bw/10+1,y,bw/10-2,64,4);g.fillStyle=on?(b<2?'#2f7de1':'#16a36f'):'#e9eef7';g.fill();}}
  y+=104;T(g,'2.7',X0,y+20,ZS(72),acc());T(g,'= 2 wholes and 7 tenths = 2 7/10',X0+170,y+6,FT.bodyB);T(g,'two and seven tenths',X0+170,y+44,FT.cap,GREY);y+=96;
  rr(g,X0,y,TW,96,16);g.fillStyle=tint(acc(),.1);g.fill();T(g,'7/10  =  0.7',X0+30,y+62,ZS(48));T(g,'fraction and decimal',X0+380,y+56,FT.body,GREY);y+=128;
  y=para(p,y,'To *compare*, look at the wholes first: *3.1 > 2.9*. To *round*, find the nearest whole: 2.7 rounds to *3*.')+12;
  y=keyWords(p,y,[['decimal point','the dot between the wholes and the tenths'],['tenth','one of 10 equal parts of a whole']]);
  predict(p,y,S,'p5','How many tenths are in 1.5?','*15 tenths.* 1 whole is 10 tenths, plus 5 more tenths.');},
 readout(p,S,y){const g=p.g,st=S.st,v=st.w+st.t/10;T(g,v.toFixed(1),X0,y+56,ZS(64),acc());T(g,'= '+st.w+' and '+st.t+'/10',X0+180,y+36,FT.bodyB);
  T(g,'rounds to '+Math.floor(v+.5),X0+180,y+72,FT.body,GREY);return y+86;},
 build(S,grp,mode,game){const st=S.st,Zw=-2.2,Zt=-1.35,Zl=-.45,u=.2;
  const wholes=new THREE.Group(),tenths=new THREE.Group();grp.add(wholes,tenths);
  const mats=[[-.9,Zw,3.6,.55,'#dbe8fb'],[-.9,Zt,3.6,.75,'#d7f1e5']].forEach(([x,z,w,d,c])=>{const m=mk(new THREE.BoxGeometry(w,.03,d),lam(c),20);m.position.set(x,.015,z);grp.add(m);});
  const tw=label('wholes',{size:.18,color:'#2f7de1'});tw.position.set(1.4,.3,Zw);grp.add(tw);const tt=label('tenths',{size:.18,color:'#16a36f'});tt.position.set(1.4,.3,Zt);grp.add(tt);
  const L=4.2,lx=-2.1,toX=v=>lx+v/5*L;const tr=mk(new THREE.BoxGeometry(L+.1,.05,.12),lam('#cbd5e6'),0);tr.position.set(0,.03,Zl);grp.add(tr);
  for(let k=0;k<=50;k++){const big=k%10===0;const t=new THREE.Mesh(G('dtk'+big,()=>new THREE.BoxGeometry(.015,big?.22:.1,.015)),lam(INK));t.position.set(toX(k/10),.05+(big?.11:.05),Zl);grp.add(t);
    if(big){const l=label(String(k/10),{size:.24});l.position.set(toX(k/10),.42,Zl+.28);grp.add(l);}}
  const mk1=mk(new THREE.ConeGeometry(.12,.28,18),lam('#e4572e'),0);mk1.rotation.x=Math.PI;grp.add(mk1);const ml=label('',{size:.22,bg:'#ffffff'});grp.add(ml);
  function bar(i){const g=new THREE.Group();for(let k=0;k<10;k++){const m=mk(G('tenp',()=>new THREE.BoxGeometry(u*.92,u,u*1.4)),lam('#2f7de1'),20);m.position.x=(k-4.5)*u;g.add(m);}return g;}
  function render(){clearGroup(wholes);clearGroup(tenths);for(let i=0;i<st.w;i++){const b=bar(i);b.position.set(-2.55+u*5+ (i%2)*2.1,u/2+.03+Math.floor(i/2)*u,Zw);wholes.add(b);A.drag(b,{tap:()=>change(-1,0)});}
    for(let k=0;k<st.t;k++){const m=mk(G('tenp',()=>new THREE.BoxGeometry(u*.92,u,u*1.4)),lam('#16a36f'),20);m.position.set(-2.55+u/2+(k%10)*u*1.08,u/2+.03+Math.floor(k/10)*u,Zt);tenths.add(m);A.drag(m,{tap:()=>change(0,-1)});}
    const v=st.w+st.t/10;mk1.position.set(toX(v),.42,Zl);ml.userData.set(v.toFixed(1));ml.position.set(toX(v),.85,Zl);check();A.redraw();}
  function change(dw,dt){const w=st.w+dw,t=st.t+dt;if(w<0||t<0)return;if(w>4&&dw>0){A.bad('The whole mat holds 4 wholes.');return;}if(t>19){A.bad('Trade 10 tenths for a whole first!');return;}if(w+t/10>5){A.bad('The number line stops at 5.');return;}
    st.w=w;st.t=t;A.pop();if(st.t===10&&dt>0)A.say('10 tenths! Press Trade to make a whole.');render();}
  function trade(){if(st.t<10){A.bad('You need 10 tenths to trade.');return;}if(st.w>=4){A.bad('The whole mat is full.');return;}st.t-=10;st.w+=1;A.good('10 tenths = 1 whole!');render();}
  function roundIt(){const v=st.w+st.t/10,r=Math.floor(v+.5);hop(mk1,V(toX(r),.42,Zl),.35,.6).then(()=>{A.say(v.toFixed(1)+' rounds to '+r+'.');A.later(()=>render(),1400);});}
  function check(){if(mode==='play'&&st.target!=null&&Math.abs(st.w+st.t/10-st.target)<1e-9&&st.t<10)game.solved('Yes! That is '+st.target.toFixed(1)+'.');}
  render();
  return {info:()=>(st.w+st.t/10).toFixed(1)+' = '+st.w+' and '+st.t+'/10',
    controls:()=>{if(mode==='play'&&st.ask)return st.ask.opts.map(o=>({t:String(o),big:true,fn:()=>{if(o===st.ask.ans){roundIt();game.solved(st.ask.ok);}else A.bad('Not quite. Which whole number is closer?');}}));
      return [{t:'+1 whole',big:true,fn:()=>change(1,0)},{t:'+0.1',big:true,go:true,fn:()=>change(0,1)},{t:'−0.1',fn:()=>change(0,-1)},{t:'Trade 10 tenths',fn:trade,dis:st.t<10},{t:'Round',fn:roundIt},{t:'Clear',fn:()=>{st.w=0;st.t=0;render();}}];},
    demo(n){if(n==='build'){st.w=0;st.t=0;render();A.seq([[600,()=>{change(1,0);change(1,0);A.say('2 wholes');}],[1200,()=>{for(let i=0;i<7;i++)change(0,1);A.say('7 tenths: 2.7');}]]);}
      if(n==='round'){st.w=2;st.t=7;render();A.seq([[900,roundIt]]);}},
    task(r){st.ask=null;st.target=null;st.w=0;st.t=0;
      if(r===3){const w=rnd(1,4),t=pick([1,2,3,4,6,7,8,9]);st.w=w;st.t=t;render();const ans=t>=5?w+1:w;st.ask={ans,opts:[w,w+1],ok:(w+t/10).toFixed(1)+' rounds to '+ans+'.'};return 'Round *'+(w+t/10).toFixed(1)+'* to the nearest whole number.';}
      let txt;if(r===0){st.target=rnd(1,3)+rnd(1,9)/10;txt='Build *'+st.target.toFixed(1)+'*.';}
      else if(r===1){const w=rnd(1,4),t=rnd(1,9);st.target=w+t/10;txt='Build *'+ONES[w]+' and '+ONES[t]+' tenths*.';}
      else if(r===2){const t=rnd(1,9);st.target=t/10;txt='Show *'+t+'/10* as a decimal.';}
      else{const w=rnd(1,3),t=rnd(1,8);const a=w+(t+1)/10,b=(w+1)+t/10;st.target=b;txt='Build the *greater* number: *'+a.toFixed(1)+'* or *'+b.toFixed(1)+'*.';}
      render();return txt;}};}
});

/* =========================================================
   6. Multiplication facts to 10 × 10
   ========================================================= */
P.lesson({id:'facts',title:'Multiplication facts',strand:'Number',codes:['B2.2','B2.1'],
 guide:{goal:'Recall and demonstrate multiplication facts to 10 × 10 and related division facts, and use properties of operations (commutative and distributive) to find facts.',words:'factor, product, array, row, column, commutative, distributive, related division fact',
  ask:['How can 5 × 8 help you find 7 × 8?','Why is 6 × 4 the same as 4 × 6?','Which division facts go with 9 × 7 = 63?'],home:'Arrange cutlery, coins or LEGO in rows and columns. Name the multiplication and division facts you see.'},
 learn:[{say:'Rows times columns.',speech:'An array has equal rows. Tala sets out seven rows of eight chairs. That is seven times eight. Watch the array grow to fifty-six.',view:'model',demo:'grow'},
        {say:'Read about factors and products.',speech:'The numbers you multiply are factors. The answer is the product. Fifty-six divided by seven is eight: that is the related division fact.',view:'read'},
        {say:'Watch: split a hard fact.',speech:'Seven times eight is hard? Split it into five times eight plus two times eight. Forty plus sixteen is fifty-six. This is the distributive property.',view:'model',demo:'split'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: drag the corner.',speech:'Your turn. Drag the yellow corner to make any array up to ten by ten. Try Turn and Split.',view:'model'}],
 fig:'A 10 by 10 array. The yellow corner sets the rows and columns.',rz:.65,
 explore:['*Drag the yellow corner* or use the buttons to change the array.','*Turn* it: 3 × 7 and 7 × 3 have the same product.','*Split* the rows at 5 to break a hard fact into easy ones.'],
 tries:[['What is 6 × 7?','*42.* 5 × 7 = 35, plus one more 7 is 42.'],['Find □: □ × 9 = 54','*6.* 6 × 9 = 54, so 54 ÷ 9 = 6.'],['Use 10 × 8 to find 9 × 8.','*72.* 10 × 8 = 80, then take away one 8.']],
 howTo:'Make the array the question asks for. Drag the yellow corner or use the row and column buttons.',
 init:k=>({r:7,c:8,split:false,want:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'An *array* has equal rows. The numbers you multiply are *factors*; the answer is the *product*.')+16;
  const s=26,ox=X0+10;for(let r=0;r<4;r++)for(let c=0;c<6;c++){g.beginPath();g.arc(ox+c*s*1.3+s/2,y+r*s*1.3+s/2,s/2-2,0,Math.PI*2);g.fillStyle=r<2?'#2f7de1':'#f08a24';g.fill();}
  T(g,'4 × 6 = 24',X0+250,y+40,ZS(44));T(g,'= 2 × 6 + 2 × 6',X0+250,y+86,FT.bodyB,GREY);T(g,'24 ÷ 4 = 6',X0+560,y+40,ZS(36),'#16a36f');T(g,'24 ÷ 6 = 4',X0+560,y+86,ZS(36),'#16a36f');y+=160;
  [['Commutative','3 × 7 = 7 × 3','turn the array'],['Distributive','7 × 8 = 5 × 8 + 2 × 8','split the array'],['Related facts','56 ÷ 7 = 8','undo multiplying']].forEach(([a,b,c],i)=>{rr(g,X0,y+i*58,TW,50,14);g.fillStyle=tint(acc(),.1);g.fill();
    T(g,a,X0+20,y+i*58+34,FT.smallB,acc());T(g,b,X0+230,y+i*58+34,FT.bodyB);T(g,c,X0+TW-20,y+i*58+34,FT.small,GREY,'right');});
  y+=196;
  y=keyWords(p,y,[['factor','a number you multiply'],['product','the answer to a multiplication']]);
  predict(p,y,S,'p6','If you know 8 × 5 = 40, what is 8 × 6?','*48.* 8 × 6 is one more group of 8: 40 + 8 = 48.');},
 readout(p,S,y){const g=p.g,st=S.st,pr=st.r*st.c;T(g,st.r+' × '+st.c+' = '+pr,X0,y+52,ZS(56),acc());
  T(g,st.split&&st.r>5?'= 5 × '+st.c+' + '+(st.r-5)+' × '+st.c+' = '+5*st.c+' + '+(st.r-5)*st.c:pr+' ÷ '+st.r+' = '+st.c+'   ·   '+pr+' ÷ '+st.c+' = '+st.r,X0,y+94,FT.bodyB);return y+104;},
 build(S,grp,mode,game){const st=S.st,u=.29,N=10,Z0=-2.95,x0=-1.45;
  const base=mk(new THREE.BoxGeometry(u*N+.12,.03,u*N+.12),[lam('#eef2f8'),lam('#eef2f8'),cellMat('#f6f8fc',N,N),lam('#eef2f8'),lam('#eef2f8'),lam('#eef2f8')],20);base.position.set(x0+u*N/2,.015,Z0+u*N/2);grp.add(base);
  const arr=new THREE.Group();grp.add(arr);const cg=G('fcube',()=>new THREE.BoxGeometry(u*.86,u*.86,u*.86));
  const corner=mk(new THREE.SphereGeometry(.13,16,12),lam('#ffd24a'),0);grp.add(corner);
  const lr=label('',{size:.26,color:'#2f7de1'}),lc=label('',{size:.26,color:'#e4572e'});grp.add(lr,lc);
  function rebuild(drop){clearGroup(arr);for(let r=0;r<st.r;r++)for(let c=0;c<st.c;c++){const m=mk(cg,lam(st.split&&r>=5?'#f08a24':'#2f7de1'),20);
      const p=V(x0+(c+.5)*u,.03+u*.43,Z0+(r+.5)*u+(st.split&&r>=5?.18:0));m.position.copy(p);if(drop){m.position.y+=.5+(r*st.c+c)*.004;moveTo(m,{pos:p,k:12});}arr.add(m);}
    corner.position.set(x0+st.c*u,.3,Z0+st.r*u+(st.split&&st.r>5?.18:0));lr.userData.set(st.r+' rows');lr.position.set(x0-.42,.35,Z0+st.r*u/2);lc.userData.set(st.c+' columns');lc.position.set(x0+st.c*u/2,.35,Z0-.25);}
  function set(r,c,quiet){r=Math.max(1,Math.min(N,r));c=Math.max(1,Math.min(N,c));if(r===st.r&&c===st.c&&!quiet)return;st.r=r;st.c=c;rebuild(true);A.pop();
    if(mode==='play'&&st.want&&st.want(r,c))game.solved(r+' × '+c+' = '+r*c+'!');A.redraw();}
  A.drag(corner,{h:.3,drop:pos=>{set(Math.round((pos.z-Z0)/u),Math.round((pos.x-x0)/u));rebuild(false);}});
  function turn(){const r=st.r,c=st.c;st.r=c;st.c=r;rebuild(true);A.say(r+' × '+c+' = '+c+' × '+r+' = '+r*c);if(mode==='play'&&st.want&&st.want(st.r,st.c))game.solved(st.r+' × '+st.c+' = '+st.r*st.c+'!');A.redraw();}
  rebuild(false);
  return {info:()=>st.r+' × '+st.c+' = '+st.r*st.c+'  (drag the yellow corner)',
    controls:()=>[{t:'Rows −',fn:()=>set(st.r-1,st.c)},{t:'Rows +',go:true,fn:()=>set(st.r+1,st.c)},{t:'Cols −',fn:()=>set(st.r,st.c-1)},{t:'Cols +',go:true,fn:()=>set(st.r,st.c+1)},{t:'Turn ↻',fn:turn},{t:st.split?'Split: on':'Split at 5',on:st.split,fn:()=>{st.split=!st.split;rebuild(true);A.redraw();}}],
    demo(n){if(n==='grow'){st.split=false;st.r=1;st.c=8;rebuild(false);const l=[];for(let r=2;r<=7;r++)l.push([500,()=>set(r,8)]);l.push([800,()=>A.say('7 rows of 8 = 56')]);A.seq(l);}
      if(n==='split'){st.r=7;st.c=8;st.split=false;rebuild(false);A.seq([[800,()=>{st.split=true;rebuild(true);A.redraw();}],[1400,()=>A.say('5 × 8 = 40 and 2 × 8 = 16. 40 + 16 = 56.')]]);}},
    task(r){st.split=false;st.r=1;st.c=1;rebuild(false);
      if(r===0){const a=rnd(6,9),b=rnd(6,9);st.want=(x,y)=>(x===a&&y===b)||(x===b&&y===a);return 'Show *'+a+' × '+b+'*. What is the product?';}
      if(r===1){const a=rnd(3,9),b=rnd(4,9);st.want=(x,y)=>(x===b&&y===a)||(x===a&&y===b);return 'Find □:  *□ × '+b+' = '+a*b+'*. Make the array.';}
      if(r===2){const a=pick([9,10]),b=rnd(3,8);st.want=(x,y)=>(x===a&&y===b)||(x===b&&y===a);return 'Show *'+a+' × '+b+'*.';}
      if(r===3){const s=pick([6,7,8,9]);st.want=(x,y)=>x===s&&y===s;return 'Make *'+s*s+'* as a *square* array (rows = columns).';}
      const d=rnd(4,9),q=rnd(4,9);st.want=(x,y)=>x===d&&y===q;return 'Show *'+d*q+' ÷ '+d+'*: make *'+d+' rows*. How many in each row?';}};}
});
})();
