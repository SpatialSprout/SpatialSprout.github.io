/* The Interactive Classroom: Grade 3 Math — Number strand (lessons 1–9) */
(function(){
"use strict";
const P=window.PM;if(!P||P.failed||!P.THREE)return;
const {THREE,V,W,D,PY,PX,X0,TW,INK,RED,BLUE,GREY,VIBE,FT,ZS,G,M,lam,mk,unitBox,label,starGeo,wedgeGeo,clearGroup,disposeObj,rr,T,wrap,para,header,keyWords,predict,box,caption,cxOf,cyOf,tint,moveTo,hop,tween,burst,easeOut,A}=P;
const acc=()=>P.ACC;
const rnd=(a,b)=>a+Math.floor(Math.random()*(b-a+1)),pick=a=>a[Math.floor(Math.random()*a.length)],shuffle=a=>a.slice().sort(()=>Math.random()-.5);
const ONES=['zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'];
const TENS=['','','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety'];
const words=n=>n<20?ONES[n]:n<100?TENS[Math.floor(n/10)]+(n%10?'-'+ONES[n%10]:''):n<1000?ONES[Math.floor(n/100)]+' hundred'+(n%100?' '+words(n%100):''):'one thousand';
const expand=n=>{const h=Math.floor(n/100)*100,t=Math.floor(n/10)%10*10,o=n%10;return [h,t,o].filter(x=>x).join(' + ')||'0';};
function choices(game,list,ans,ok){return list.map(o=>({t:String(o),big:true,fn:()=>{if(o===ans)game.solved(ok);else A.bad('Not quite. Try again!');}}));}
function opts3(ans,step){return shuffle([ans,ans+step,Math.max(0,ans-step)===ans?ans+2*step:ans-step]);}

/* base-ten block helpers shared by lessons 1 and 4 */
const BCOL={h:'#6ea8f5',t:'#f79a5c',o:'#ffcf3f'};
function makeBlock(k,u){return k==='h'?unitBox(10,1,10,BCOL.h,u):k==='t'?unitBox(1,1,10,BCOL.t,u):unitBox(1,1,1,BCOL.o,u);}

/* =========================================================
   1. Hundreds, tens and ones
   ========================================================= */
P.lesson({id:'place',title:'Hundreds, tens and ones',strand:'Number',codes:['B1.1','B1.5','C2.3'],
 guide:{goal:'Read, represent, compose and decompose whole numbers up to 1000 using base ten blocks, and connect standard, expanded and word forms.',words:'digit, place value, hundreds, tens, ones, regroup, expanded form',
  ask:['Why is the 3 in 365 worth 300?','What happens when you have 10 ones? 10 tens?','How do you build 508 when there are no tens?'],home:'Build numbers with LEGO: big plates for hundreds, long bricks for tens, small bricks for ones.'},
 learn:[{say:'Every digit has a place.',speech:'Every number is made of digits. Where a digit sits tells you what it is worth. Watch Max build two hundred forty-seven.',view:'model',demo:'build'},
        {say:'Read the page and the chart.',speech:'Two hundreds, four tens and seven ones make two hundred forty-seven. That is 200 plus 40 plus 7.',view:'read'},
        {say:'Watch: 10 ones make 1 ten.',speech:'Watch what happens when we have nine ones and add one more. Ten ones are traded for one ten. This is regrouping.',view:'model',demo:'regroup'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the yellow flap to check.',view:'read'},
        {say:'Your turn: drag blocks onto the mats.',speech:'Your turn. Drag a block from a pile onto its mat, or tap a pile. Drag a block off the mat to take it away.',view:'model'}],
 fig:'Base-ten blocks on a place-value mat.',rz:.62,
 explore:['*Drag* a block from a pile onto its own mat, or *tap* a pile.','*Drag* a block off the mat to take it away.','Get 10 ones, then press *Trade* to regroup.'],
 tries:[['What is the value of the 6 in 562?','*60.* The 6 is in the tens place: 6 tens = 60.'],['Write 400 + 30 + 9 as a number.','*439.*'],['How many tens are in 250?','*25 tens.* 250 = 25 × 10. (Or 2 hundreds and 5 tens.)']],
 howTo:'Read the number. Drag blocks from the piles onto the hundreds, tens and ones mats until the mats show that number. Trade 10 ones for a ten when you need to.',
 init:k=>k==='play'?{c:{h:0,t:0,o:0},target:0}:{c:{h:2,t:4,o:7}},
 left(p,S){const g=p.g,c=S.st.c;let y=header(p,S);
  y=para(p,y,'Every number is made of *digits*. Where a digit sits tells you what it is worth. This is called *place value*.')+12;
  const cols=[['Hundreds',c.h,'#d7e6fb','#2f7de1'],['Tens',c.t,'#fbdde6','#e4572e'],['Ones',c.o,'#fff0c4','#d99400']],cw=TW/3;
  cols.forEach(([n,v,bg,fc],i)=>{const x=X0+i*cw;rr(g,x+4,y,cw-8,180,16);g.fillStyle=bg;g.fill();T(g,n,x+cw/2,y+40,FT.smallB,fc,'center');T(g,String(v),x+cw/2,y+136,ZS(90),v>9?RED:INK,'center');if(v>9)T(g,'trade!',x+cw/2,y+170,FT.small,RED,'center');});
  y+=232;const n=c.h*100+c.t*10+c.o;T(g,n+' = '+expand(n),X0,y,ZS(44));y+=38;T(g,words(Math.min(n,1000)),X0,y,FT.cap,GREY);y+=46;
  y=para(p,y,'*10 ones = 1 ten*  and  *10 tens = 1 hundred*. Trading 10 for 1 of the next place is called *regrouping*.')+14;
  y=keyWords(p,y,[['digit','one of the symbols 0 to 9'],['place value','what a digit is worth because of its place'],['expanded form','a number written as a sum of its places: 200 + 40 + 7']]);
  predict(p,y,S,'p1','You have 9 ones. You add 1 more. What do you have to do?','You have 10 ones, so trade them for *1 ten*. The ones place goes back to 0.');},
 readout(p,S,y){const g=p.g,c=S.st.c,n=c.h*100+c.t*10+c.o;[['Hundreds',-1.5,'#2f7de1'],['Tens',.15,'#e4572e'],['Ones',1.62,'#d99400']].forEach(([t,x,col])=>T(g,t,cxOf(x),cyOf(-.15),FT.smallB,col,'center'));
  T(g,String(n),X0,y+40,ZS(64),acc());T(g,'= '+expand(n),X0+190,y+30,FT.bodyB);T(g,words(Math.min(n,1000)),X0+190,y+64,FT.cap,GREY);return y+84;},
 build(S,grp,mode,game){const st=S.st,U1=.13,MX={h:-1.5,t:.15,o:1.62},MZ=-1.3,MW={h:1.55,t:1.6,o:1.1};
  Object.keys(MX).forEach(k=>{const m=mk(new THREE.BoxGeometry(MW[k],.03,1.8),lam({h:'#d7e6fb',t:'#fbdde6',o:'#fff0c4'}[k]),20);m.position.set(MX[k],.015,MZ);grp.add(m);});
  const slot=(k,i)=>k==='h'?V(MX.h,.03+U1/2+i*(U1+.012),MZ):k==='t'?V(MX.t+((i%10)-4.5)*.15,.03+U1/2+Math.floor(i/10)*U1,MZ):V(MX.o+((i%4)-1.5)*.19,.03+U1/2,MZ+(Math.floor(i/4)-2)*.21);
  const stacks={h:[],t:[],o:[]};let busyT=false;
  const total=label('0',{size:.42,bg:'#ffffff'});total.position.set(0,1.9,MZ);grp.add(total);
  const onMat=(k,p)=>Math.abs(p.x-MX[k])<MW[k]/2+.15&&Math.abs(p.z-MZ)<1.05;
  function relayout(k){stacks[k].forEach((m,i)=>moveTo(m,{pos:slot(k,i),k:10}));}
  function spawn(k,drop){const m=makeBlock(k,U1);const p=slot(k,stacks[k].length);m.position.copy(p);if(drop)m.position.y+=1.2;grp.add(m);moveTo(m,{pos:p,k:9});
    A.drag(m,{tap:()=>remove(k,m),drop:(pos,o)=>{if(onMat(k,pos))relayout(k);else remove(k,o);}});stacks[k].push(m);}
  function render(drop){['h','t','o'].forEach(k=>{const a=stacks[k];while(a.length<st.c[k])spawn(k,drop);while(a.length>st.c[k]){const m=a.pop();A.unclick(m);moveTo(m,{scale:.01,k:16,done:()=>{grp.remove(m);disposeObj(m);}});}});changed();}
  function value(){return st.c.h*100+st.c.t*10+st.c.o;}
  function changed(){total.userData.set(String(value()));if(mode==='play'&&value()===st.target)game.solved('Yes! That is '+st.target+'.');A.redraw();}
  function add(k){if(busyT)return;const lim={h:9,t:19,o:19}[k];if(st.c[k]>=lim){A.bad(k==='o'?'Too many ones! Trade 10 ones for a ten.':k==='t'?'Too many tens! Trade 10 tens for a hundred.':'The mat holds 9 hundreds.');return;}
    st.c[k]++;spawn(k,true);A.pop();if(k==='o'&&st.c.o===10)A.say('You have 10 ones. Trade them for 1 ten!');if(k==='t'&&st.c.t===10)A.say('You have 10 tens. Trade them for 1 hundred!');changed();}
  function remove(k,m){if(busyT||st.c[k]<=0)return;const a=stacks[k];const i=m?a.indexOf(m):a.length-1;if(i<0)return;const o=a.splice(i,1)[0];A.unclick(o);st.c[k]--;moveTo(o,{scale:.01,k:16,done:()=>{grp.remove(o);disposeObj(o);}});relayout(k);changed();}
  function trade(k){if(busyT)return;const up=k==='o'?'t':'h';if(st.c[k]<10){A.bad('You need 10 '+(k==='o'?'ones':'tens')+' to trade.');return;}if(up==='h'&&st.c.h>=9)return;busyT=true;
    const ten=stacks[k].splice(-10,10);const tgt=slot(up,stacks[up].length);
    ten.forEach((m,i)=>{A.unclick(m);const p=up==='t'?V(tgt.x,tgt.y,tgt.z+(i-4.5)*U1):V(tgt.x+(i-4.5)*U1,tgt.y,tgt.z);p.y+=.4;
      moveTo(m,{pos:p,k:6+i*.15,done:i===9?()=>{ten.forEach(o=>{grp.remove(o);disposeObj(o);});st.c[k]-=10;st.c[up]+=1;busyT=false;spawn(up,false);A.good(k==='o'?'10 ones became 1 ten!':'10 tens became 1 hundred!');changed();}:null});});}
  const piles={h:()=>{const g=new THREE.Group();for(let i=0;i<2;i++){const b=makeBlock('h',U1);b.position.y=U1/2+i*U1;g.add(b);}return g;},
    t:()=>{const g=new THREE.Group();for(let i=0;i<4;i++){const b=makeBlock('t',U1);b.position.set((i-1.5)*.16,U1/2,0);g.add(b);}g.rotation.y=Math.PI/2;return g;},
    o:()=>{const g=new THREE.Group();[[0,0,0],[.15,0,.05],[-.12,0,.12],[.05,0,-.15],[.02,1,0]].forEach(([x,l,z])=>{const b=makeBlock('o',U1);b.position.set(x,U1/2+l*U1,z);g.add(b);});return g;}};
  ['h','t','o'].forEach(k=>{const pile=new THREE.Group();pile.add(piles[k]());pile.scale.setScalar(.62);pile.position.set(MX[k],0,.42);grp.add(pile);
    const tag=label('drag me',{size:.16,color:'#2a62c9',font:'64px "Patrick Hand", cursive'});tag.position.set(MX[k],.38,.95);grp.add(tag);let ghost=null;
    A.drag(pile,{tap:()=>add(k),start:()=>{ghost=makeBlock(k,U1);ghost.position.copy(pile.position);grp.add(ghost);},move:pt=>{if(ghost)ghost.position.copy(grp.worldToLocal(pt));},
      drop:()=>{if(!ghost)return;const pos=ghost.position.clone();grp.remove(ghost);disposeObj(ghost);ghost=null;const k2=['h','t','o'].find(q=>onMat(q,pos));
        if(k2===k)add(k);else if(k2)A.bad((k==='h'?'Hundreds':k==='t'?'Tens':'Ones')+' go on the '+(k==='h'?'hundreds':k==='t'?'tens':'ones')+' mat.');}});});
  render(false);
  function set(h,t,o){st.c={h,t,o};render(true);}
  return {
    info:()=>value()+' = '+expand(value()),
    controls:()=>[{t:'+100',fn:()=>add('h'),big:true},{t:'+10',fn:()=>add('t'),big:true},{t:'+1',fn:()=>add('o'),big:true},{t:'Trade 10 ones → 1 ten',fn:()=>trade('o'),dis:st.c.o<10},{t:'Trade 10 tens → 1 hundred',fn:()=>trade('t'),dis:st.c.t<10},{t:'Clear',fn:()=>set(0,0,0)}],
    demo(n){if(n==='show'){set(2,4,7);return;}if(n==='build'){set(0,0,0);A.seq([[600,()=>{add('h');add('h');A.say('2 hundreds');}],[1300,()=>{for(let i=0;i<4;i++)add('t');A.say('4 tens');}],[1300,()=>{for(let i=0;i<7;i++)add('o');A.say('7 ones. That makes 247!');}]]);}
      if(n==='regroup'){set(1,2,9);A.seq([[1200,()=>{add('o');}],[1200,()=>trade('o')],[1600,()=>A.say('9 ones + 1 one = 10 ones = 1 ten. Now it is 130.')]]);}},
    task(r){st.c={h:0,t:0,o:0};render(false);let n,txt;
      if(r===0){n=rnd(1,9)*100+rnd(1,9)*10+rnd(1,9);txt='Build the number *'+n+'*.';}
      else if(r===1){n=rnd(2,9)*100+rnd(0,9)*10;txt='Build *'+n+'*. Watch the zero!';}
      else if(r===2){n=rnd(1,9)*100+rnd(1,9);txt='Build *'+n+'*. How many tens does it have?';}
      else if(r===3){const b=rnd(1,8)*100+rnd(1,9)*10+rnd(1,9);n=b+100;txt='Build the number that is *100 more than '+b+'*.';}
      else{n=rnd(1,9)*100+rnd(1,9)*10+rnd(1,9);txt='Build *'+words(n)+'*.';}
      st.target=n;return txt;}};}
});

/* =========================================================
   2. Skip counting on a number line
   ========================================================= */
P.lesson({id:'skip',title:'Skip counting to 1000',strand:'Number',codes:['B1.4','B1.2'],
 guide:{goal:'Count to 1000 by 10s, 50s, 100s and 200s forward and backward, and compare and order numbers on a number line.',words:'skip count, number line, forward, backward, greater than, less than',
  ask:['What pattern do you see when you count by 50s?','How is counting by 200s like counting by 2s?','Which is greater, 485 or 458? How do you know?'],home:'Count by 100s while climbing stairs: 100, 200, 300… Then count back down.'},
 learn:[{say:'Skip counting adds the same jump.',speech:'Skip counting means counting by the same amount each time. Watch Aisha and the frog count by hundreds all the way to one thousand.',view:'model',demo:'by100'},
        {say:'Read about number lines.',speech:'On a number line, numbers get greater as you move to the right. The jumps can be 10, 50, 100 or 200.',view:'read'},
        {say:'Watch: counting by 50s.',speech:'Now the frog counts by fifties: 50, 100, 150, 200, 250, 300.',view:'model',demo:'by50'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: pick a jump and hop!',speech:'Your turn. Choose a jump size, then press hop. You can also tap the frog to hop.',view:'model'}],
 fig:'A frog skip counting along a number line from 0 to 1000.',rz:-.05,
 explore:['Choose a jump: *10, 50, 100 or 200*.','Tap the *frog* or press *Hop* to jump forward. Press *Hop back* to count backward.','Listen for the pattern in the numbers.'],
 tries:[['Count by 50s: 50, 100, 150, ___, ___','*200, 250.* Each jump adds 50.'],['Count back by 100s: 900, 800, 700, ___','*600.* Each jump takes away 100.'],['Which is greater: 485 or 458?','*485.* Both have 4 hundreds, but 485 has 8 tens and 458 has only 5 tens.']],
 howTo:'Read where the frog must go and the jump size. Pick the jump, then hop forward or back until the frog lands on the target number.',
 init:k=>({pos:0,step:100,start:0,trail:[0],need:null,target:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'*Skip counting* means counting by the same amount each time. On a *number line*, numbers get greater as you move right.')+20;
  const lx=X0+20,lw=TW-40,toX=v=>lx+v/400*lw;g.strokeStyle=INK;g.lineWidth=4;g.beginPath();g.moveTo(lx,y+90);g.lineTo(lx+lw,y+90);g.stroke();
  for(let v=0;v<=400;v+=50){const x=toX(v);g.lineWidth=v%100?2:4;g.beginPath();g.moveTo(x,y+(v%100?78:72));g.lineTo(x,y+(v%100?102:108));g.stroke();T(g,String(v),x,y+138,v%100?FT.small:FT.smallB,v%100?GREY:INK,'center');}
  for(let v=0;v<300;v+=50){const x1=toX(v),x2=toX(v+50);g.strokeStyle=VIBE[v/50%6];g.lineWidth=4;g.beginPath();g.moveTo(x1,y+86);g.quadraticCurveTo((x1+x2)/2,y+20,x2,y+86);g.stroke();}
  T(g,'+50 each jump',toX(150),y+14,FT.hand,BLUE,'center');y+=176;
  [['by 100s','100, 200, 300, 400, 500 …'],['by 200s','200, 400, 600, 800, 1000'],['back by 50s','300, 250, 200, 150 …']].forEach(([a,b],i)=>{rr(g,X0,y+i*52,190,42,21);g.fillStyle=tint(acc(),.16);g.fill();T(g,a,X0+95,y+30+i*52,FT.smallB,acc(),'center');T(g,b,X0+210,y+30+i*52,FT.body);});
  y+=176;y=para(p,y,'To *compare* 485 and 458, look at the hundreds first, then the tens. 8 tens is more than 5 tens, so *485 > 458*.')+12;
  y=keyWords(p,y,[['skip count','count by jumps of the same size'],['>  and  <','greater than and less than; the open side faces the greater number']]);
  predict(p,y,S,'p2','Count by 200s from 0. What are the first five numbers?','*200, 400, 600, 800, 1000.* It is like counting by 2s with two zeros on the end.');},
 readout(p,S,y){const g=p.g,st=S.st;const seq=st.trail.slice(-8).join(', ');T(g,'Counting by '+st.step+'s',X0,y+30,FT.bodyB,acc());
  wrap(g,seq,X0,y+76,TW,40,{font:ZS(38)});return y+116;},
 build(S,grp,mode,game){const st=S.st,L=4.2,x0=-L/2,Z=-1.3,sc=L/1000;const xOf=v=>x0+v*sc;
  const track=mk(new THREE.BoxGeometry(L+.2,.06,.36),lam('#bfe9ff'),20);track.position.set(0,.03,Z);grp.add(track);
  for(let v=0;v<=1000;v+=50){const big=v%100===0;const post=mk(new THREE.BoxGeometry(.025,big?.18:.1,.02),lam(INK),0);post.position.set(xOf(v),.06+(big?.09:.05),Z+.19);grp.add(post);
    if(big&&v%200===0){const l=label(String(v),{size:.2});l.position.set(xOf(v),.38,Z+.24);grp.add(l);}}
  const frog=new THREE.Group();const bd=mk(new THREE.SphereGeometry(.16,20,14),lam('#5cc46a'),0);bd.scale.set(1.1,.8,1);bd.position.y=.13;frog.add(bd);
  [-1,1].forEach(s=>{const e=mk(new THREE.SphereGeometry(.055,12,10),lam('#ffffff'),0);e.position.set(s*.07,.27,.07);frog.add(e);const pu=new THREE.Mesh(new THREE.SphereGeometry(.025,8,6),lam(INK));pu.position.set(s*.07,.28,.12);frog.add(pu);});
  frog.position.set(xOf(st.pos),.06,Z);grp.add(frog);const tag=label(String(st.pos),{size:.24,bg:'#ffffff'});grp.add(tag);
  const pads=new THREE.Group();grp.add(pads);let hopping=false;
  function place(){frog.position.set(xOf(st.pos),.06,Z);tag.userData.set(String(st.pos));tag.position.set(xOf(st.pos),.72,Z);}
  function drawPads(){clearGroup(pads);st.trail.slice(-25).forEach(v=>{const pd=mk(G('pad',()=>new THREE.CylinderGeometry(.07,.07,.02,16)),lam('#2f9e5a'),0);pd.position.set(xOf(v),.07,Z-.12);pads.add(pd);});}
  function jump(dir){if(hopping)return;const n=st.pos+dir*st.step;if(n<0||n>1000){A.bad(n<0?'The frog cannot go below 0.':'The number line stops at 1000.');return;}hopping=true;A.pop();
    hop(frog,V(xOf(n),.06,Z),.25+st.step/600,.42).then(()=>{hopping=false;st.pos=n;st.trail.push(n);place();drawPads();A.say(String(n));check();A.redraw();});}
  function check(){if(mode!=='play')return;if(st.pos===st.target){if(st.step===st.need)game.solved('Yes! You counted by '+st.need+'s to '+st.target+'.');else A.bad('You landed on '+st.target+', but use jumps of '+st.need+'. Press Start over.');}
    else if(st.need&&((st.target>st.start&&st.pos>st.target)||(st.target<st.start&&st.pos<st.target)))A.bad('Too far! Hop back.');}
  function reset(at){st.pos=at;st.start=at;st.trail=[at];place();drawPads();A.redraw();}
  A.drag(frog,{tap:()=>jump(1)});
  place();drawPads();
  return {tick(dt,t){if(!hopping)frog.rotation.y=Math.sin(t*2)*.15;},
    info:()=>'At '+st.pos+'. Counting by '+st.step+'s.',
    controls:()=>[10,50,100,200].map(s=>({t:'by '+s+'s',on:st.step===s,fn:()=>{st.step=s;A.redraw();}})).concat([{t:'Hop →',go:true,big:true,fn:()=>jump(1)},{t:'← Hop back',fn:()=>jump(-1)},{t:'Start over',fn:()=>reset(st.start)}]),
    demo(n){if(n==='reset'){A.stopSeq();hopping=false;st.step=100;reset(0);return;}if(n==='j100'){st.step=100;hopping=false;jump(1);return;}const s=n==='by100'?100:50,k=n==='by100'?10:6;st.step=s;reset(0);const list=[];for(let i=0;i<k;i++)list.push([i?650:500,()=>jump(1)]);A.seq(list);A.redraw();},
    task(r){const T5=[[0,100,700],[0,50,350],[0,200,1000],[300,50,150],[470,10,520]],q=T5[r];const [s,need,tg]=[q[0]+(r===0?0:0),q[1],q[2]];st.need=need;st.target=tg;st.step=need===10?50:100;reset(s);
      return (tg>s?'Count by ':'Count back by ')+'*'+need+'s* from '+s+' to *'+tg+'*.';}};}
});

/* =========================================================
   3. Rounding and estimating
   ========================================================= */
P.lesson({id:'round',title:'Rounding and estimating',strand:'Number',codes:['B1.3','B2.3'],
 guide:{goal:'Round whole numbers to the nearest ten or hundred, and use rounding to estimate sums and differences.',words:'round, nearest ten, nearest hundred, halfway, estimate, about',
  ask:['Why does 45 round up to 50?','When is an estimate good enough?','Is 296 + 412 more or less than 700? How do you know quickly?'],home:'At the store, round prices to the nearest dollar and estimate the total before you pay.'},
 learn:[{say:'Rounding finds the nearest ten.',speech:'To round, find the two tens around the number. Diego’s ball on the hill always rolls to the nearest valley. Watch forty-seven.',view:'model',demo:'roll'},
        {say:'Read the rounding rule.',speech:'Look at the ones. Zero to four rounds down. Five to nine rounds up.',view:'read'},
        {say:'Watch: rounding to the nearest hundred.',speech:'Now three hundred sixty-five on the hundreds hill. It is past three hundred fifty, so it rolls to four hundred.',view:'model',demo:'hundred'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: tap a valley flag to predict.',speech:'Your turn. Set a number, then tap the valley flag where you think the ball will roll.',view:'model'}],
 fig:'The rounding hill: the ball rolls to the nearest valley.',rz:-.45,
 explore:['Change the number with the *+ and −* buttons.','*Tap a flag* to predict where the ball will roll, or press *Roll*.','Switch between *nearest 10* and *nearest 100*.'],
 tries:[['Round 73 to the nearest ten.','*70.* 73 has 3 ones, so it rounds down.'],['Round 650 to the nearest hundred.','*700.* 650 is exactly halfway, and halfway rounds up.'],['Estimate 49 + 38 by rounding to tens.','*About 90:* 50 + 40 = 90. (The exact sum is 87.)']],
 howTo:'Read the number on the hill. Tap the flag in the valley where the ball will roll, or tap the answer button. Then watch the ball roll to check.',
 init:k=>({n:47,mode:10,res:null,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'To *round* to the nearest ten, find the two tens around the number. *0 to 4* ones round down. *5 to 9* ones round up.')+10;
  const hx=X0+60,hw=420,hy=y+150;g.strokeStyle=acc();g.lineWidth=6;g.beginPath();g.moveTo(hx,hy);g.quadraticCurveTo(hx+hw/2,hy-200,hx+hw,hy);g.stroke();
  T(g,'40',hx,hy+40,FT.bodyB,INK,'center');T(g,'45',hx+hw/2,hy-108,FT.small,GREY,'center');T(g,'50',hx+hw,hy+40,FT.bodyB,INK,'center');
  const bx=hx+hw*.7,byy=hy-200*2*.7*(1-.7)-14;g.beginPath();g.arc(bx,byy,16,0,Math.PI*2);g.fillStyle='#ff6a3d';g.fill();T(g,'47',bx,byy-26,FT.smallB,'#ff6a3d','center');
  T(g,'47 rolls to 50',hx+hw+40,hy-40,FT.hand,BLUE);y+=210;
  rr(g,X0,y,TW,170,18);g.fillStyle=tint(acc(),.1);g.fill();T(g,'Estimating',X0+28,y+44,FT.h3,acc());
  wrap(g,'To estimate *48 + 31*, round each number first: *50 + 30 = 80*. The exact answer, 79, is close to 80. Estimates help you check your work.',X0+28,y+86,TW-56,36,{font:FT.small,bold:FT.smallB});y+=196;
  y=keyWords(p,y,[['round','change a number to the nearest ten or hundred'],['estimate','an answer that is close, found quickly']]);
  predict(p,y,S,'p3','Round 365 to the nearest hundred.','*400.* 365 is past the halfway point, 350, so it rolls up to 400.');},
 readout(p,S,y){const g=p.g,st=S.st,L=3.8,lo=Math.floor(st.n/st.mode)*st.mode,zl=cyOf(-.55);g.strokeStyle=INK;g.lineWidth=4;g.beginPath();g.moveTo(cxOf(-L/2),zl);g.lineTo(cxOf(L/2),zl);g.stroke();
  for(let i=0;i<=10;i++){const x=cxOf(-L/2+i*L/10),v=lo+i*st.mode/10;g.lineWidth=i%5?2:4;g.beginPath();g.moveTo(x,zl-(i%5?10:18));g.lineTo(x,zl+(i%5?10:18));g.stroke();T(g,String(v),x,zl+44,i%5?FT.small:FT.smallB,i%5?GREY:INK,'center');}
  const nx=cxOf(-L/2+(st.n-lo)/st.mode*L);g.beginPath();g.moveTo(nx,zl-22);g.lineTo(nx-12,zl-44);g.lineTo(nx+12,zl-44);g.closePath();g.fillStyle='#ff6a3d';g.fill();
  const yy=zl+100;T(g,st.res==null?String(st.n):st.n+' rounds to '+st.res,X0,yy,ZS(52),st.res==null?INK:acc());T(g,'Nearest '+(st.mode===10?'ten':'hundred')+' · halfway is '+(lo+st.mode/2),X0,yy+36,FT.small,GREY);return yy+50;},
 build(S,grp,mode,game){const st=S.st,L=3.8,H=1.05,ZC=-1.05,R=.17;let track=null,curLo=null,curMode=null,rolling=false;
  const ball=mk(G('rball',()=>new THREE.SphereGeometry(R,24,16)),lam('#ff6a3d'),0);grp.add(ball);
  const flags=[-1,1].map(s=>{const f=new THREE.Group();const pole=mk(new THREE.CylinderGeometry(.02,.02,.7,8),lam(INK),0);pole.position.y=.35;f.add(pole);
    const cl=mk(new THREE.BoxGeometry(.42,.24,.02),lam(s<0?'#4fb3ff':'#ffb347'),20);cl.position.set(.22,.58,0);f.add(cl);const l=label('',{size:.2});l.position.set(.22,.92,0);f.add(l);f.userData.l=l;
    f.position.set(s*L/2+(s<0?.08:-.5),.12,ZC+.42);grp.add(f);A.drag(f,{tap:()=>guess(s<0?0:1)});return f;});
  const lo=()=>Math.floor(st.n/st.mode)*st.mode;
  function buildTrack(){if(track){grp.remove(track);disposeObj(track);}const s=new THREE.Shape();s.moveTo(-L/2,0);for(let i=0;i<=48;i++){const t=i/48;s.lineTo(-L/2+t*L,.12+H*Math.sin(Math.PI*t));}s.lineTo(L/2,0);s.closePath();
    const geo=new THREE.ExtrudeGeometry(s,{depth:.7,bevelEnabled:false});geo.translate(0,0,-.35);track=mk(geo,[lam('#bfe0ff'),lam('#7fd1c7')],25);track.position.z=ZC;grp.add(track);
    const l0=lo();flags[0].userData.l.userData.set(String(l0));flags[1].userData.l.userData.set(String(l0+st.mode));curLo=l0;curMode=st.mode;}
  function placeBall(t){const x=-L/2+t*L,y=.12+H*Math.sin(Math.PI*t),d=H*Math.PI/L*Math.cos(Math.PI*t),n=Math.hypot(d,1);ball.position.set(x-d/n*R,y+R/n,ZC);}
  function refresh(){if(lo()!==curLo||st.mode!==curMode)buildTrack();placeBall((st.n-lo())/st.mode);}
  function set(n){if(rolling)return;st.n=Math.max(0,Math.min(999,n));st.res=null;refresh();A.redraw();}
  function setMode(m){if(rolling||m===st.mode)return;st.mode=m;st.res=null;refresh();A.redraw();}
  function roll(cb){if(rolling)return;const l0=lo(),t0=(st.n-l0)/st.mode,t1=t0<.5?0:1;rolling=true;
    tween(.9,k=>placeBall(t0+(t1-t0)*k),x=>x*x).then(()=>{rolling=false;st.res=l0+t1*st.mode;A.pop();A.say(st.n+' rounds to '+st.res+'.');if(cb)cb(t1);A.redraw();});}
  function guess(side){if(rolling)return;if(st.ask&&st.ask.est)return;const v=lo()+side*st.mode;A.say('You predicted '+v+'. Let’s roll!');roll(t1=>{if(t1===side){if(mode==='play')game.solved('Yes! '+st.n+' rounds to '+v+'.');else A.good('Your prediction was right!');}else{A.bad('It rolled to '+st.res+'. Look at the '+(st.mode===10?'ones':'tens')+' digit.');if(mode==='play')A.later(()=>set(st.n),1600);}});}
  buildTrack();placeBall((st.n-lo())/st.mode);
  return {info:()=>st.ask&&st.ask.est?st.ask.q:(st.n+(st.res!=null?' rounds to '+st.res:'  →  nearest '+st.mode)),
    controls:()=>{if(mode==='play'){if(st.ask&&st.ask.est)return choices(game,st.ask.opts,st.ask.ans,'Good estimate!');return [{t:'Rolls to '+lo(),big:true,fn:()=>guess(0)},{t:'Rolls to '+(lo()+st.mode),big:true,fn:()=>guess(1)}];}
      return [-100,-10,-1,1,10,100].map(d=>({t:(d>0?'+':'−')+Math.abs(d),fn:()=>set(st.n+d)})).concat([{t:'Roll ↓',go:true,fn:()=>roll()},{t:'Nearest 10',on:st.mode===10,fn:()=>setMode(10)},{t:'Nearest 100',on:st.mode===100,fn:()=>setMode(100)}]);},
    demo(n){if(n==='r47'){st.mode=10;set(47);return;}if(n==='rollnow'){roll();return;}if(n==='roll'){st.mode=10;set(47);A.seq([[1200,()=>roll()]]);}if(n==='hundred'){st.mode=100;set(365);A.seq([[1400,()=>roll()]]);}},
    task(r){st.ask=null;if(r<3){const m=r===1?100:10;st.mode=m;const n=m===10?rnd(11,98):rnd(110,980);set(n===Math.floor(n/m)*m?n+3:n);return 'Where will *'+st.n+'* roll? Round it to the nearest *'+(m===10?'ten':'hundred')+'*.';}
      if(r===3){const a=rnd(21,68),b=rnd(21,48),ra=Math.round(a/10)*10,rb=Math.round(b/10)*10,ans=ra+rb;st.mode=10;set(a);st.ask={est:true,ans,opts:shuffle([ans,ans+10,ans-10]),q:'Estimate '+a+' + '+b};return 'Estimate *'+a+' + '+b+'* by rounding each number to the nearest ten.';}
      const a=rnd(2,6)*100+rnd(55,95),b=rnd(1,3)*100+rnd(5,40),ans=Math.round(a/100)*100-Math.round(b/100)*100;st.mode=100;set(a);st.ask={est:true,ans,opts:shuffle([ans,ans+100,ans+200]),q:'Estimate '+a+' − '+b};return 'Estimate *'+a+' − '+b+'* by rounding to the nearest hundred.';}};}
});

/* =========================================================
   4. Adding and subtracting to 1000
   ========================================================= */
P.lesson({id:'addsub',title:'Adding and subtracting to 1000',strand:'Number',codes:['B2.4','B2.5','C1.4'],
 guide:{goal:'Add and subtract whole numbers to 1000 with base ten blocks and the standard algorithm, regrouping when needed, and see patterns across place values.',words:'add, subtract, sum, difference, regroup, trade, borrow, column',
  ask:['When do you need to trade 10 ones for a ten?','What does the little 1 above the tens column mean?','How can 7 + 5 = 12 help you add 70 + 50?'],home:'Use coins as blocks: pennies-style counters for ones, dimes for tens, loonies for hundreds. Add two piles and trade.'},
 learn:[{say:'Add one place at a time.',speech:'To add big numbers, add the ones first, then the tens, then the hundreds. Mei has two hundred forty-seven books in one cart and one hundred thirty-five in the other. Watch.',view:'model',demo:'add'},
        {say:'Read how the columns work.',speech:'When the ones make ten or more, trade ten ones for one ten. The little one above the tens column shows the trade.',view:'read'},
        {say:'Watch: subtracting with a trade.',speech:'Now three hundred fifty-two take away one hundred twenty-seven. There are not enough ones, so we break a ten into ten ones.',view:'model',demo:'sub'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: choose a problem and solve it.',speech:'Your turn. Choose a new problem, then press the buttons in the right order. The page shows the written method.',view:'model'}],
 fig:'Base-ten blocks: the top row is the answer, the bottom row is the number being added.',rz:.2,
 explore:['Press *New + problem* or *New − problem*.','Work from the *ones* to the *hundreds*. Trade when a place has 10 or more.','Watch the written method on the page fill in as you go.'],
 tries:[['356 + 278 = ?','*634.* Ones: 6 + 8 = 14, write 4, trade 1 ten. Tens: 1 + 5 + 7 = 13, write 3, trade 1 hundred. Hundreds: 1 + 3 + 2 = 6.'],['503 − 128 = ?','*375.* Break a hundred into tens and a ten into ones, then subtract each place.'],['7 + 5 = 12. What is 70 + 50? What is 700 + 500?','*120 and 1200.* The same fact, with tens and hundreds.']],
 howTo:'Read the problem. Press the buttons in the right order: add or take away the ones, trade or break when you need to, then the tens, then the hundreds.',
 init:k=>({a:247,b:135,op:'+',top:{h:2,t:4,o:7},bot:{h:1,t:3,o:5},phase:0,carry:{},done:false}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'Add or subtract *one place at a time*: ones, then tens, then hundreds. If a place gets *10 or more*, trade 10 for 1 of the next place.')+16;
  const cx=X0+80,dw=56;const col=(s,row,c)=>{for(let i=0;i<s.length;i++)T(g,s[i],cx+i*dw,y+row*62,ZS(52),c||INK,'center');};
  T(g,'1   1',cx+dw*.3,y+4,FT.smallB,RED);col(' 356',1);col('+278',2);g.fillStyle=INK;g.fillRect(cx-30,y+142,dw*4+20,5);col(' 634',3,acc());
  wrap(g,'*Ones:* 6 + 8 = 14. Write 4, trade 1 ten. *Tens:* 1 + 5 + 7 = 13. Write 3, trade 1 hundred. *Hundreds:* 1 + 3 + 2 = 6.',X0+330,y+40,TW-330,34,{font:FT.small,bold:FT.smallB});y+=230;
  rr(g,X0,y,TW,120,18);g.fillStyle=tint(acc(),.1);g.fill();T(g,'Patterns across places',X0+28,y+42,FT.smallB,acc());T(g,'3 + 4 = 7    30 + 40 = 70    300 + 400 = 700',X0+28,y+92,ZS(34));y+=150;
  y=para(p,y,'To subtract, take away one place at a time. If there are not enough ones, *break a ten* into 10 ones first.')+12;
  y=keyWords(p,y,[['sum','the answer to an addition'],['difference','the answer to a subtraction'],['regroup','trade 10 of one place for 1 of the next, or break 1 into 10']]);
  predict(p,y,S,'p4','Do you need to trade to add 245 + 132?','*No.* 5 + 2 = 7 ones, 4 + 3 = 7 tens, 2 + 1 = 3 hundreds. No place reaches 10. The sum is 377.');},
 readout(p,S,y){const g=p.g,st=S.st,cx=X0+120,dw=64;const dig=(n)=>String(n).padStart(3,' ');
  const drawRow=(s,row,c)=>{for(let i=0;i<3;i++)T(g,s[i]===' '?'':s[i],cx+(i+1)*dw,y+row*58+40,ZS(50),c||INK,'center');};
  ['h','t','o'].forEach((k,i)=>{if(st.carry[k])T(g,st.op==='+'?'1':String(st.carry[k]),cx+(i+1)*dw+(st.op==='+'?0:22),y+6,FT.smallB,RED,'center');});
  drawRow(dig(st.a),1);T(g,st.op,cx,y+98,ZS(50));drawRow(dig(st.b),2);g.fillStyle=INK;g.fillRect(cx-20,y+128,dw*4,5);
  const res=st.op==='+'?st.a+st.b:st.a-st.b;const shown=['h','t','o'].map((k,i)=>st.phase>2-i||st.done?dig(res)[i]:' ').join('');drawRow(shown,3,acc());
  const msg=st.done?(st.op==='+'?'Sum: ':'Difference: ')+res:['Ones','Tens','Hundreds'][Math.min(st.phase,2)]+' next';T(g,msg,X0+440,y+70,FT.bodyB,acc());
  T(g,'Top row: '+(st.top.h*100+st.top.t*10+st.top.o),X0+440,y+116,FT.small,GREY);return y+210;},
 build(S,grp,mode,game){const st=S.st,u=.09,MX={h:-1.5,t:.1,o:1.55},ZT=-2.05,ZB=-.95;
  [['h',1.3],['t',1.4],['o',1.05]].forEach(([k,w])=>{[ZT,ZB].forEach((z,j)=>{const m=mk(new THREE.BoxGeometry(w,.03,1.0),lam(j?'#f1f3f8':{h:'#d7e6fb',t:'#fbdde6',o:'#fff0c4'}[k]),20);m.position.set(MX[k],.015,z);grp.add(m);});});
  const rowL=label('',{size:.26,bg:'#ffffff'});rowL.position.set(-2.05,.6,ZB);grp.add(rowL);
  const slot=(k,i,z)=>k==='h'?V(MX.h,.03+u/2+i*(u+.01),z):k==='t'?V(MX.t+((i%10)-4.5)*.12,.03+u/2+Math.floor(i/10)*u,z):V(MX.o+((i%5)-2)*.16,.03+u/2,z+(Math.floor(i/5)-1.5)*.16);
  const rows={top:{h:[],t:[],o:[]},bot:{h:[],t:[],o:[]}};let anim=false;
  function sync(which,z,drop){const a=rows[which],c=st[which];['h','t','o'].forEach(k=>{while(a[k].length<c[k]){const m=makeBlock(k,u);const p=slot(k,a[k].length,z);m.position.copy(p);if(drop)m.position.y+=1;grp.add(m);moveTo(m,{pos:p,k:9});a[k].push(m);}
      while(a[k].length>c[k]){const m=a[k].pop();moveTo(m,{scale:.01,k:14,done:()=>{grp.remove(m);disposeObj(m);}});}a[k].forEach((m,i)=>moveTo(m,{pos:slot(k,i,z),k:9}));});}
  function all(drop){sync('top',ZT,drop);sync('bot',ZB,drop);rowL.userData.set(st.op==='+'?'+ '+st.b:'− '+st.b);A.redraw();}
  function setProblem(a,b,op){st.a=a;st.b=b;st.op=op;st.top={h:Math.floor(a/100),t:Math.floor(a/10)%10,o:a%10};st.bot=op==='+'?{h:Math.floor(b/100),t:Math.floor(b/10)%10,o:b%10}:{h:0,t:0,o:0};st.phase=0;st.carry={};st.done=false;all(true);}
  const PL=['o','t','h'],UP={o:'t',t:'h'},NM={o:'ones',t:'tens',h:'hundreds'};
  const bd=k=>Math.floor(st.b/({o:1,t:10,h:100}[k]))%10;
  function combine(k){if(anim||st.done)return;if(PL[st.phase]!==k){A.bad('Work on the '+NM[PL[st.phase]]+' first.');return;}
    if(st.op==='+'){const mv=rows.bot[k].splice(0);st.top[k]+=st.bot[k];st.bot[k]=0;mv.forEach(m=>{rows.top[k].push(m);});rows.top[k].forEach((m,i)=>moveTo(m,{pos:slot(k,i,ZT),k:7}));A.pop();
      A.say('The '+NM[k]+' make '+st.top[k]+'.'+(st.top[k]>=10&&k!=='h'?' That is 10 or more: trade!':''));if(st.top[k]<10||k==='h')advance();A.redraw();}
    else{const need=bd(k);if(st.top[k]<need){A.bad('Not enough '+NM[k]+'. Break a '+(k==='o'?'ten':'hundred')+' first.');return;}
      st.top[k]-=need;const gone=rows.top[k].splice(rows.top[k].length-need,need);gone.forEach((m,i)=>{moveTo(m,{pos:m.position.clone().add(V(0,1.2,.6)),scale:.01,k:5+i*.2,done:()=>{grp.remove(m);disposeObj(m);}});});A.pop();A.say('Took away '+need+' '+NM[k]+'.');advance();A.redraw();}}
  function trade(k){if(anim||st.done)return;if(st.op==='+'){if(st.top[k]<10||PL[st.phase]!==k){A.bad('Trade only when this place has 10 or more.');return;}anim=true;const up=UP[k];
      const ten=rows.top[k].splice(-10,10);const tgt=slot(up,rows.top[up].length,ZT);ten.forEach((m,i)=>{const p=up==='t'?V(tgt.x,tgt.y+.3,tgt.z+(i-4.5)*u):V(tgt.x+(i-4.5)*u,tgt.y+.3,tgt.z);
        moveTo(m,{pos:p,k:6,done:i===9?()=>{ten.forEach(o=>{grp.remove(o);disposeObj(o);});st.top[k]-=10;st.top[up]+=1;st.carry[up]=1;anim=false;sync('top',ZT,false);A.good('Traded 10 '+NM[k]+' for 1 '+NM[up].slice(0,-1)+'!');advance();A.redraw();}:null});});}
    else{const up=UP[k];if(!up||st.top[up]<1){A.bad('There is nothing to break.');return;}if(st.top[k]>=bd(k)){A.bad('You have enough '+NM[k]+'. No need to break.');return;}
      anim=true;st.top[up]-=1;st.top[k]+=10;st.carry[up]=st.top[up];st.carry[k]=st.top[k];sync('top',ZT,true);A.pop();A.say('Broke 1 '+NM[up].slice(0,-1)+' into 10 '+NM[k]+'.');setTimeout(()=>{anim=false;},500);A.redraw();}}
  function advance(){st.phase++;if(st.phase>2){st.done=true;const r=st.op==='+'?st.a+st.b:st.a-st.b;A.good((st.op==='+'?'The sum is ':'The difference is ')+r+'!');if(mode==='play')game.solved(st.a+' '+st.op+' '+st.b+' = '+r);}}
  all(false);
  const ctl=()=>{if(st.done)return mode==='learn'?[{t:'New + problem',go:true,fn:()=>newP('+')},{t:'New − problem',go:true,fn:()=>newP('-')}]:[];const k=PL[st.phase];const out=[];
    if(st.op==='+'){PL.forEach(q=>out.push({t:'Add the '+NM[q],on:q===k,fn:()=>combine(q)}));out.push({t:'Trade 10 ones → 1 ten',fn:()=>trade('o')},{t:'Trade 10 tens → 1 hundred',fn:()=>trade('t')});}
    else{PL.forEach(q=>out.push({t:'Take away '+bd(q)+' '+NM[q],on:q===k,fn:()=>combine(q)}));out.push({t:'Break 1 ten → 10 ones',fn:()=>trade('o')},{t:'Break 1 hundred → 10 tens',fn:()=>trade('t')});}
    if(mode==='learn')out.push({t:'New + problem',fn:()=>newP('+')},{t:'New − problem',fn:()=>newP('-')});return out;};
  function newP(op){if(op==='+'){const a=rnd(1,5)*100+rnd(1,8)*10+rnd(3,9),b=rnd(1,3)*100+rnd(1,8)*10+rnd(4,9);setProblem(a,b,'+');}else{const a=rnd(3,9)*100+rnd(0,4)*10+rnd(0,4),b=rnd(1,2)*100+rnd(1,8)*10+rnd(5,9);setProblem(a,b,'-');}}
  return {info:()=>st.a+' '+(st.op==='+'?'+':'−')+' '+st.b+(st.done?' = '+(st.op==='+'?st.a+st.b:st.a-st.b):''),controls:ctl,
    demo(n){if(n==='show'){setProblem(247,135,'+');return;}if(n==='co'){combine('o');return;}if(n==='tro'){trade('o');return;}if(n==='ct'){combine('t');return;}if(n==='ch'){combine('h');return;}if(n==='add'){setProblem(247,135,'+');A.seq([[1200,()=>combine('o')],[1500,()=>trade('o')],[1800,()=>combine('t')],[1500,()=>combine('h')]]);}
      if(n==='sub'){setProblem(352,127,'-');A.seq([[1400,()=>trade('o')],[1500,()=>combine('o')],[1500,()=>combine('t')],[1500,()=>combine('h')]]);}},
    task(r){newP(r===2||r===4?'-':'+');return (st.op==='+'?'Add':'Subtract')+' *'+st.a+' '+(st.op==='+'?'+':'−')+' '+st.b+'*. Do each place in order.';}};}
});

/* =========================================================
   5. Multiplication: arrays and facts
   ========================================================= */
P.lesson({id:'arrays',title:'Multiplying with arrays',strand:'Number',codes:['B2.1','B2.2','B2.6'],
 guide:{goal:'Represent multiplication up to 10 × 10 with equal groups and arrays, connect it to repeated addition and skip counting, and recall facts of 2, 5 and 10.',words:'equal groups, array, row, column, multiply, factor, product',
  ask:['How is 4 + 4 + 4 the same as 3 × 4?','Why does turning an array not change the total?','How can skip counting by 5s help with 5 × 7?'],home:'Find arrays at home: egg cartons, muffin tins, windows. Say the multiplication sentence for each.'},
 learn:[{say:'Equal rows make an array.',speech:'An array shows equal groups in rows. Eli plants three rows of four seeds. Watch the model skip count: four, eight, twelve.',view:'model',demo:'skip'},
        {say:'Read about multiplying.',speech:'Three times four means three groups of four. It is the same as four plus four plus four.',view:'read'},
        {say:'Watch: turn the array.',speech:'Watch the array turn. Three rows of four becomes four rows of three. The total stays twelve.',view:'model',demo:'turn'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: build arrays.',speech:'Your turn. Add rows and columns with the buttons. Tap the array to skip count it.',view:'model'}],
 fig:'A garden of tulips planted in an array.',rz:.55,
 explore:['Use *Rows* and *In each row* to build an array.','*Tap* the array to skip count the rows out loud.','Press *Turn* to see that order does not change the product.'],
 tries:[['5 × 6 = ?','*30.* Skip count by 5s six times: 5, 10, 15, 20, 25, 30.'],['There are 4 rows of 7 chairs. How many chairs?','*28 chairs.* 4 × 7 = 28.'],['If 2 × 9 = 18, what is 9 × 2?','*18.* Turning an array does not change the product.']],
 howTo:'Read the array to build. Change the rows and how many are in each row until the garden matches. Tap the garden to skip count and check.',
 init:k=>k==='play'?{r:1,c:1,turned:false,want:null}:{r:3,c:4,turned:false},
 left(p,S){const g=p.g,st=S.st,a=st.turned?st.c:st.r,b=st.turned?st.r:st.c;let y=header(p,S);
  y=para(p,y,'When groups are *equal*, you can multiply instead of counting one by one. An *array* puts equal groups in rows.')+16;
  const s=Math.min(40,240/Math.max(a,b,1));for(let i=0;i<a;i++)for(let j=0;j<b;j++){g.beginPath();g.arc(X0+20+j*s+s/2,y+i*s+s/2,s*.36,0,Math.PI*2);g.fillStyle=VIBE[i%6];g.fill();}
  T(g,a+(a===1?' row':' rows')+' of '+b,X0+20,y+a*s+34,FT.hand,BLUE);const ex=X0+340;T(g,a+' × '+b+' = '+(a*b),ex,y+60,ZS(56),acc());
  T(g,(a<=5?Array(a).fill(b).join(' + '):b+' + '+b+' + … ('+a+' times)')+' = '+(a*b),ex,y+112,FT.body);T(g,(a*b)+' ÷ '+a+' = '+b,ex,y+158,FT.body);T(g,'× means "groups of"',ex,y+214,FT.hand,BLUE);
  y+=Math.max(272,a*s+60);[['× 2','2, 4, 6, 8, 10, 12 …'],['× 5','5, 10, 15, 20, 25 …'],['× 10','10, 20, 30, 40, 50 …']].forEach(([f,l],i)=>{rr(g,X0,y+i*50,100,40,20);g.fillStyle=tint(acc(),.16);g.fill();T(g,f,X0+50,y+29+i*50,FT.smallB,acc(),'center');T(g,l,X0+120,y+29+i*50,FT.body);});
  y+=170;y=keyWords(p,y,[['array','objects set out in equal rows'],['product','the answer when you multiply']]);
  predict(p,y,S,'p5','Is 4 rows of 3 more, fewer or the same as 3 rows of 4?','*The same: 12.* Turning an array around does not change how many there are.');},
 readout(p,S,y){const g=p.g,st=S.st,a=st.turned?st.c:st.r,b=st.turned?st.r:st.c;T(g,a+' × '+b+' = '+(a*b),cxOf(0),y+56,ZS(62),acc(),'center');
  T(g,a+' rows of '+b+'  ·  '+(a<=6?Array(a).fill(b).join(' + '):'…')+' = '+(a*b),cxOf(0),y+100,FT.body,INK,'center');return y+112;},
 build(S,grp,mode,game){const st=S.st;const arr=new THREE.Group();arr.position.set(0,0,-1.25);grp.add(arr);
  const bulb=G('bulb',()=>new THREE.SphereGeometry(.075,12,8)),stem=G('stem',()=>new THREE.CylinderGeometry(.012,.012,.12,5));let cells=[];
  function rebuild(drop){clearGroup(arr);cells=[];const s=.33,u=.22;for(let i=0;i<st.r;i++){cells.push([]);for(let j=0;j<st.c;j++){const cell=new THREE.Group();const pot=unitBox(1,1,1,i%2?'#a7dcc0':'#bcd5f7',u);pot.position.y=u/2;cell.add(pot);
      const sm=new THREE.Mesh(stem,lam('#4f9a5f'));sm.position.y=u+.06;cell.add(sm);const b=new THREE.Mesh(bulb,lam(VIBE[i%6]));b.position.y=u+.14;b.castShadow=true;cell.add(b);
      const p=V((j-(st.c-1)/2)*s,0,(i-(st.r-1)/2)*s);cell.position.copy(p);if(drop)cell.position.y=1+(i*st.c+j)*.01;arr.add(cell);moveTo(cell,{pos:p,k:9});cells[i].push(cell);}}}
  function set(r,c){r=Math.max(1,Math.min(10,r));c=Math.max(1,Math.min(10,c));if(r===st.r&&c===st.c)return;st.r=r;st.c=c;st.turned=false;arr.rotation.y=0;arr.userData.tRotY=null;rebuild(true);A.pop();check();A.redraw();}
  function turn(){st.turned=!st.turned;moveTo(arr,{rotY:st.turned?Math.PI/2:0,k:5});A.say(st.turned?'Turned! Still '+(st.r*st.c)+'.':'Back again: '+st.r+' × '+st.c+'.');A.redraw();}
  function skip(){const list=[];for(let i=0;i<st.r;i++)list.push([i?700:200,()=>{if(!cells[i])return;cells[i].forEach(c=>{c.position.y=.3;moveTo(c,{pos:V(c.position.x,0,c.position.z),k:4});});A.pop();A.say(String((i+1)*st.c));}]);list.push([700,()=>A.say(st.r+' × '+st.c+' = '+st.r*st.c)]);A.seq(list);}
  function check(){if(mode!=='play'||!st.want)return;const w=st.want;const ok=w.rows?(st.r===w.rows&&st.c===w.cols):((st.r===w.a&&st.c===w.b)||(st.r===w.b&&st.c===w.a));if(ok)game.solved(st.r+' × '+st.c+' = '+st.r*st.c+'!');}
  const tap=new THREE.Mesh(new THREE.BoxGeometry(3.6,.4,3.6),new THREE.MeshBasicMaterial({visible:false}));tap.position.set(0,.2,-1.25);grp.add(tap);A.drag(tap,{tap:skip});
  rebuild(false);if(st.turned)arr.rotation.y=Math.PI/2;
  return {info:()=>st.r+' rows of '+st.c+' = '+st.r*st.c,
    controls:()=>[{t:'Rows −',fn:()=>set(st.r-1,st.c)},{t:'Rows +',fn:()=>set(st.r+1,st.c)},{t:'In each row −',fn:()=>set(st.r,st.c-1)},{t:'In each row +',fn:()=>set(st.r,st.c+1)},{t:'Skip count',go:true,fn:skip},{t:'Turn ↻',on:st.turned,fn:turn}],
    demo(n){if(n==='show'){if(st.turned)turn();if(st.r!==3||st.c!==4)set(3,4);return;}if(n==='turnnow'){turn();return;}if(n==='skip'){set(3,4);A.seq([[900,skip]]);}if(n==='turn'){set(3,4);A.seq([[800,turn],[2400,turn]]);}},
    task(r){st.r=1;st.c=1;st.turned=false;arr.rotation.y=0;rebuild(false);const L5=[[3,5],[2,7],null,[5,6],[10,3]];let w;
      if(r===2){const c=rnd(3,6);w={rows:4,cols:c};st.want=w;return 'Make an array with *4 rows* that shows *'+(4*c)+'* tulips.';}
      const [a,b]=r===1?[2,rnd(6,9)]:r===4?[10,rnd(2,6)]:L5[r];w={a,b};st.want=w;return 'Build an array for *'+a+' × '+b+'*.';}};}
});

/* =========================================================
   6. Division and fair shares
   ========================================================= */
P.lesson({id:'share',title:'Fair shares and dividing',strand:'Number',codes:['B1.6','B2.7','B2.6'],
 guide:{goal:'Solve fair-share problems that share up to 20 items among 2 to 10 sharers, including answers with leftovers cut into fractions, and connect sharing to division.',words:'share, equal, divide, ÷, leftover, remainder, fair share, mixed number',
  ask:['How do you know the shares are fair?','What can we do with a leftover cookie?','How is 12 ÷ 3 related to 3 × 4?'],home:'Share snacks fairly between family members. If one is left, cut it into equal pieces.'},
 learn:[{say:'Sharing equally is dividing.',speech:'Dividing means sharing equally. Watch Nova share twelve cookies among three friends, one at a time.',view:'model',demo:'deal'},
        {say:'Read about division.',speech:'Twelve divided by three equals four. Each friend gets four cookies.',view:'read'},
        {say:'Watch: cutting the leftover.',speech:'Seven cookies for two friends. Each gets three, and one is left over. Cut it in half. Each friend gets three and one half.',view:'model',demo:'cut'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: drag cookies onto plates.',speech:'Your turn. Drag cookies onto the plates, or press deal. Cut any leftovers so the shares are fair.',view:'model'}],
 fig:'Cookies shared among plates.',rz:.45,
 explore:['*Drag* a cookie from the jar onto a plate.','Press *Deal one each* to share fast.','If some are left over, press *Cut the leftovers*.'],
 tries:[['Share 15 stickers among 3 friends. How many each?','*5 each.* 15 ÷ 3 = 5.'],['Share 9 muffins between 2 friends.','*4 and 1/2 each.* Each gets 4, then the leftover muffin is cut in half.'],['20 ÷ 4 = ?','*5.* 4 groups of 5 make 20.']],
 howTo:'Share all the cookies so every plate gets the same amount. Drag cookies or press Deal. If cookies are left over, cut them so the shares stay fair.',
 init:k=>({n:12,f:3,plates:[],jar:12,cut:false}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'*Dividing* means sharing into *equal* groups. *12 ÷ 3 = 4* means 12 shared among 3 is 4 each.')+16;
  [0,1,2].forEach(i=>{const cx=X0+130+i*280,cy=y+80;g.beginPath();g.ellipse(cx,cy,110,48,0,0,Math.PI*2);g.fillStyle='#fff';g.fill();g.lineWidth=3;g.strokeStyle=INK;g.stroke();
    for(let k=0;k<4;k++){g.beginPath();g.arc(cx-54+k*36,cy-4,16,0,Math.PI*2);g.fillStyle='#c98a4b';g.fill();g.strokeStyle=INK;g.lineWidth=2;g.stroke();}});
  T(g,'12 ÷ 3 = 4    because    3 × 4 = 12',X0,y+178,ZS(38),acc());y+=220;
  y=para(p,y,'Sometimes there are *leftovers*. 7 cookies for 2 friends: each gets 3, and 1 is left. Cut it in half: each friend gets *3 and 1/2*.')+12;
  const cx=X0+120,cy=y+70;[0,1,2].forEach(k=>{g.beginPath();g.arc(cx+k*50,cy,20,0,Math.PI*2);g.fillStyle='#c98a4b';g.fill();g.stroke();});g.beginPath();g.arc(cx+160,cy,20,Math.PI/2,Math.PI*1.5);g.closePath();g.fillStyle='#e0a868';g.fill();g.stroke();
  T(g,'= 3 1/2 cookies each',cx+210,cy+12,FT.bodyB,acc());y+=128;
  y=keyWords(p,y,[['divide (÷)','share into equal groups'],['leftover','what is left after sharing equally']]);
  predict(p,y,S,'p6','Share 10 cookies among 4 friends. How many each?','*2 and 1/2 each.* Each gets 2 and 2 are left. Cut each leftover into 4 pieces: everyone gets 2 pieces, which is 2/4 = 1/2.');},
 readout(p,S,y){const g=p.g,st=S.st,each=Math.floor(st.n/st.f),left=st.n%st.f;T(g,st.n+' cookies ÷ '+st.f+' friends',X0,y+40,FT.bodyB,acc());
  const counts=st.plates.map(a=>a.length);const fair=st.jar===0&&counts.every(c=>c===counts[0])&&(left===0||st.cut);
  T(g,fair?('Each friend gets '+(left?each+' and '+left+'/'+st.f:each)+'!'):(st.jar+' left in the jar'),X0,y+88,ZS(44),fair?'#16a36f':INK);return y+100;},
 build(S,grp,mode,game){const st=S.st,ZJ=-2.25;let busyD=false;
  const jar=mk(new THREE.CylinderGeometry(.5,.45,.5,32,1,true),new THREE.MeshLambertMaterial({color:'#bfe9ff',transparent:true,opacity:.45,side:THREE.DoubleSide}),25);jar.position.set(0,.25,ZJ);grp.add(jar);
  const cookieG=G('cookie',()=>new THREE.CylinderGeometry(.15,.15,.06,24)),cMat=lam('#c98a4b');const plates=new THREE.Group();grp.add(plates);let pl=[],jarC=[],pieces=[];
  function platePos(i){const n=st.f,rowN=n>5?Math.ceil(n/2):n,row=n>5&&i>=rowN?1:0,idx=row?i-rowN:i,cnt=row?n-rowN:rowN;return V((idx-(cnt-1)/2)*(4/Math.max(cnt,1))*.95,0,-1.0+row*.95);}
  function cookieMesh(){const m=mk(cookieG,cMat,30);return m;}
  function layout(){st.plates.forEach((a,i)=>{const pp=platePos(i);a.forEach((m,k)=>moveTo(m,{pos:V(pp.x+((k%3)-1)*.08,.06+k*.065,pp.z+((k%2)-.5)*.06),k:10}));});jarC.forEach((m,k)=>moveTo(m,{pos:V(((k%4)-1.5)*.18,.08+Math.floor(k/4)*.07,ZJ+((k%2)-.5)*.1),k:10}));}
  function setup(n,f){st.n=n;st.f=f;st.cut=false;clearGroup(plates);pl=[];pieces.forEach(m=>{grp.remove(m);disposeObj(m);});pieces=[];[...jarC,...st.plates.flat()].forEach(m=>{A.unclick(m);grp.remove(m);disposeObj(m);});
    st.plates=[];jarC=[];for(let i=0;i<f;i++){const p=mk(G('plate',()=>new THREE.CylinderGeometry(.34,.3,.04,32)),lam(VIBE[i%6]),30);p.position.copy(platePos(i));p.position.y=.02;plates.add(p);pl.push(p);st.plates.push([]);}
    for(let k=0;k<n;k++){const m=cookieMesh();m.position.set(0,1.2+k*.05,ZJ);grp.add(m);jarC.push(m);makeDrag(m);}st.jar=n;layout();A.redraw();}
  function nearest(pos){let b=-1,bd=.45;pl.forEach((p,i)=>{const d=Math.hypot(pos.x-p.position.x,pos.z-p.position.z);if(d<bd){bd=d;b=i;}});return b;}
  function makeDrag(m){A.drag(m,{tap:()=>{if(jarC.includes(m))give(m,nextPlate());},drop:(pos)=>{const i=nearest(pos);if(i<0){layout();return;}give(m,i);}});}
  function nextPlate(){const c=st.plates.map(a=>a.length);return c.indexOf(Math.min(...c));}
  function give(m,i){if(st.cut)return;const ji=jarC.indexOf(m);if(ji>=0)jarC.splice(ji,1);st.plates.forEach(a=>{const k=a.indexOf(m);if(k>=0)a.splice(k,1);});st.plates[i].push(m);st.jar=jarC.length;A.pop();layout();check();A.redraw();}
  function deal(){if(busyD||st.cut)return;if(jarC.length<st.f){A.say(jarC.length?'Not enough for everyone. Cut the leftovers!':'The jar is empty.');return;}busyD=true;const list=[];
    for(let i=0;i<st.f;i++)list.push([i?180:0,()=>{const m=jarC[jarC.length-1];if(m)give(m,i);}]);list.push([200,()=>{busyD=false;}]);A.seq(list);}
  function cut(){if(st.cut)return;const left=jarC.length;if(!left){A.say('There are no leftovers to cut.');return;}if(left>=st.f){A.bad('Deal more first. You can still give everyone a whole cookie.');return;}
    st.cut=true;jarC.forEach(m=>{A.unclick(m);grp.remove(m);disposeObj(m);});jarC=[];st.jar=0;
    for(let c=0;c<left;c++)for(let i=0;i<st.f;i++){const w=mk(wedgeGeo(.15,.06,i*Math.PI*2/st.f,(i+1)*Math.PI*2/st.f),[lam('#e0a868'),lam('#c98a4b')],25);w.position.set(0,.6,ZJ);grp.add(w);pieces.push(w);
      const pp=platePos(i);moveTo(w,{pos:V(pp.x+.18,.06+c*.07,pp.z+.12),k:6});}A.good('Each leftover cookie is cut into '+st.f+' equal pieces.');check();A.redraw();}
  function check(){const c=st.plates.map(a=>a.length);const fair=jarC.length===0&&c.every(v=>v===c[0])&&(st.n%st.f===0||st.cut);
    if(fair){const e=Math.floor(st.n/st.f),l=st.n%st.f;const msg='Fair shares: '+(l?e+' and '+l+'/'+st.f:e)+' each!';if(mode==='play')game.solved(msg);else A.good(msg);}}
  setup(st.n,st.f);
  return {info:()=>st.n+' cookies, '+st.f+' friends',
    controls:()=>{const o=[{t:'Deal one each',go:true,fn:deal},{t:'Cut the leftovers',fn:cut,dis:st.cut},{t:'Start over',fn:()=>setup(st.n,st.f)}];
      if(mode==='learn')o.push({t:'Cookies −',fn:()=>setup(Math.max(1,st.n-1),st.f)},{t:'Cookies +',fn:()=>setup(Math.min(20,st.n+1),st.f)},{t:'Friends −',fn:()=>setup(st.n,Math.max(2,st.f-1))},{t:'Friends +',fn:()=>setup(st.n,Math.min(10,st.f+1))});return o;},
    demo(n){if(n==='show'){setup(12,3);return;}if(n==='dealall'){deal();A.later(deal,900);A.later(deal,1800);A.later(deal,2700);return;}if(n==='deal'){setup(12,3);const l=[];for(let i=0;i<4;i++)l.push([900,deal]);A.seq(l);}if(n==='cut'){setup(7,2);A.seq([[800,deal],[900,deal],[900,deal],[1200,cut]]);}},
    task(r){const T5=[[12,3],[15,5],[7,2],[20,10],[10,4]][r];setup(T5[0],T5[1]);return 'Share *'+T5[0]+' cookies* among *'+T5[1]+' friends* fairly.'+(T5[0]%T5[1]?' Cut the leftovers!':'');}};}
});

/* =========================================================
   7. Fractions of a whole
   ========================================================= */
P.lesson({id:'fractions',title:'Fractions of a whole',strand:'Number',codes:['B1.6','B2.8'],
 guide:{goal:'Represent fractions as equal parts of a whole (halves to tenths), name unit fractions, and connect a fraction to repeated addition of its unit fraction.',words:'fraction, whole, equal parts, numerator, denominator, unit fraction',
  ask:['Why must the pieces be the same size?','Which is bigger, 1/3 or 1/8? Why?','How is 3/4 the same as 1/4 + 1/4 + 1/4?'],home:'Cut a sandwich or a paper strip into equal parts. Name each part and count them: 1/4, 2/4, 3/4, 4/4.'},
 learn:[{say:'A fraction names equal parts.',speech:'A fraction names equal parts of one whole. Watch Max’s cake: one fourth, two fourths, three fourths, four fourths is one whole.',view:'model',demo:'unit'},
        {say:'Read the parts of a fraction.',speech:'The bottom number is the denominator: how many equal parts. The top number is the numerator: how many parts we mean.',view:'read'},
        {say:'Watch: more pieces, smaller pieces.',speech:'The same cake cut into eighths has smaller pieces than the cake cut into thirds.',view:'model',demo:'compare'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: cut and lift pieces.',speech:'Your turn. Choose how many pieces to cut, then tap or drag pieces off the cake.',view:'model'}],
 fig:'A cake cut into equal parts.',rz:.55,
 explore:['Choose *Cut into* 2, 3, 4, 5, 6, 8 or 10 pieces.','*Tap* a piece, or *drag* it off the cake, to lift it out.','Watch the fraction and the addition sentence change.'],
 tries:[['A pizza is cut into 8 equal slices. You eat 3. What fraction did you eat?','*3/8.*'],['Write 4/5 as an addition of unit fractions.','*1/5 + 1/5 + 1/5 + 1/5.*'],['How many sixths make one whole?','*6 sixths.* 6/6 = 1.']],
 howTo:'Read the fraction. Cut the cake into the right number of equal pieces, then lift out the right number of pieces.',
 init:k=>k==='play'?{den:2,sh:[],want:null}:{den:4,sh:[]},
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'A *fraction* names equal parts of one *whole*. The parts must all be the same size.')+20;
  const cx=X0+130,cy=y+125,R=115;for(let i=0;i<4;i++){g.beginPath();g.moveTo(cx,cy);g.arc(cx,cy,R,-Math.PI/2+i*Math.PI/2,-Math.PI/2+(i+1)*Math.PI/2);g.closePath();g.fillStyle=i<3?'#ffb37a':'#fff4e0';g.fill();g.lineWidth=3;g.strokeStyle=INK;g.stroke();}
  const fx=X0+350;T(g,'3',fx,y+105,ZS(84),'#e4572e','center');g.fillStyle=INK;g.fillRect(fx-42,y+124,84,6);T(g,'4',fx,y+212,ZS(84),acc(),'center');
  T(g,'← numerator: the parts we mean',fx+56,y+90,FT.hand,'#e4572e');T(g,'← denominator: how many',fx+56,y+190,FT.hand,acc());T(g,'    equal parts in the whole',fx+56,y+226,FT.hand,acc());
  y+=280;y=para(p,y,'*3/4 = 1/4 + 1/4 + 1/4.* More pieces in the same whole means *smaller* pieces.')+6;
  const bw=TW-140;[[3,'1/3','#ffb37a'],[8,'1/8','#94b7ff']].forEach(([n,l,c],k)=>{const by=y+k*62;T(g,l,X0,by+38,FT.h3);for(let i=0;i<n;i++){g.fillStyle=i===0?c:'#f6f7f9';g.fillRect(X0+90+i*bw/n,by,bw/n,46);g.strokeStyle=INK;g.lineWidth=2.5;g.strokeRect(X0+90+i*bw/n,by,bw/n,46);}});
  y+=140;T(g,'halves · thirds · fourths · fifths · sixths · eighths · tenths',X0,y,FT.cap,GREY);y+=56;
  predict(p,y,S,'p7','Which is more cake: 1/3 or 1/8 of the same cake?','*1/3 is more.* The more pieces you cut the cake into, the smaller each piece is.');},
 readout(p,S,y){const g=p.g,st=S.st,n=st.sh.length,d=st.den;const fx=X0+50;T(g,String(n),fx,y+50,ZS(60),'#e4572e','center');g.fillStyle=INK;g.fillRect(fx-36,y+62,72,5);T(g,String(d),fx,y+120,ZS(60),acc(),'center');
  const sum=n===0?'Tap a piece to lift it out.':n===d?'*'+d+'/'+d+' = one whole cake!*':n+'/'+d+' = '+(n<=4?Array(n).fill('1/'+d).join(' + '):'1/'+d+' + … ('+n+' times)');wrap(g,sum,X0+130,y+70,TW-130,38,{font:FT.body,bold:FT.bodyB});return y+130;},
 build(S,grp,mode,game){const st=S.st;const plate=mk(G('plate2',()=>new THREE.CylinderGeometry(1.75,1.65,.06,48)),lam('#ffffff'),30);plate.position.set(0,.03,-1.2);grp.add(plate);
  const cake=new THREE.Group();cake.position.set(0,.06,-1.2);grp.add(cake);let sl=[];const tO=lam('#fff4e0'),sO=lam('#efcf9c'),tN=lam('#ff8c5a'),sN=lam('#ffd4b0');
  function place(m){const on=st.sh.includes(m.userData.i),d=m.userData.dir;moveTo(m,{pos:on?V(d.x*.45,.35,d.z*.45):V(d.x*.04,0,d.z*.04),k:10});m.material=on?[tN,sN]:[tO,sO];}
  function toggle(m,force){const i=m.userData.i,k=st.sh.indexOf(i);if(force===true&&k>=0){place(m);return;}if(force===false&&k<0){place(m);return;}k>=0?st.sh.splice(k,1):st.sh.push(i);A.pop();place(m);check();A.redraw();}
  function build(drop){sl.forEach(m=>{A.unclick(m);cake.remove(m);disposeObj(m);});sl=[];for(let i=0;i<st.den;i++){const a0=i*Math.PI*2/st.den,a1=(i+1)*Math.PI*2/st.den,mid=(a0+a1)/2;const m=mk(wedgeGeo(1.5,.6,a0,a1),[tO,sO],25);
      m.userData.i=i;m.userData.dir=V(Math.cos(mid),0,-Math.sin(mid));if(drop)m.position.y=1+i*.05;cake.add(m);sl.push(m);A.drag(m,{tap:()=>toggle(m),drop:(pos)=>{const out=Math.hypot(pos.x,pos.z)>.9;toggle(m,out);}});place(m);}}
  function cut(d){if(d===st.den)return;st.den=d;st.sh=[];build(true);A.pop();A.redraw();}
  function check(){if(mode==='play'&&st.want&&st.den===st.want[1]&&st.sh.length===st.want[0])game.solved('Yes! That is '+st.want[0]+'/'+st.want[1]+'.');}
  build(false);
  return {info:()=>st.sh.length+'/'+st.den+' of the cake',controls:()=>[2,3,4,5,6,8,10].map(v=>({t:'Cut into '+v,on:v===st.den,fn:()=>cut(v)})).concat([{t:'Put back',fn:()=>{st.sh=[];sl.forEach(place);A.redraw();}}]),
    demo(n){if(n==='four'||n==='f1'||n==='f3'){if(st.den!==4)cut(4);st.sh=n==='four'?[]:n==='f1'?[0]:[0,1,2];sl.forEach(place);A.pop();A.redraw();return;}if(n==='unit'){cut(4);st.sh=[];sl.forEach(place);const l=[];for(let i=0;i<4;i++)l.push([900,()=>{toggle(sl[i]);A.say((i+1)+'/4'+(i===3?' = one whole':''));}]);A.seq(l);}
      if(n==='compare'){A.seq([[300,()=>{cut(3);toggle(sl[0]);A.say('One third');}],[2200,()=>{cut(8);toggle(sl[0]);A.say('One eighth is smaller');}]]);}},
    task(r){const L=[[2,3],[3,5],[5,8],[6,6],[7,10]][r];st.want=L;st.den=2;st.sh=[];build(false);return r===3?'Show *one whole* cut into *sixths*.':'Show *'+L[0]+'/'+L[1]+'* of the cake.';}};}
});

/* =========================================================
   8. Equivalent fractions
   ========================================================= */
P.lesson({id:'equiv',title:'Equivalent fractions',strand:'Number',codes:['B1.7'],
 guide:{goal:'Use a fraction wall to find equivalent fractions for halves, fourths and eighths; thirds and sixths; and fifths and tenths.',words:'equivalent, equal, fraction wall, half, fourth, eighth, third, sixth, fifth, tenth',
  ask:['How many fourths are the same as one half?','Why are 2/6 and 1/3 the same amount?','Can you find another fraction equal to 1/2?'],home:'Fold a strip of paper in half, then in half again. Open it: two of the fourths cover the same space as one half.'},
 learn:[{say:'Different fractions, same amount.',speech:'Equivalent fractions name the same amount. Watch Aisha’s fraction wall: one half, two fourths and four eighths are all the same length.',view:'model',demo:'half'},
        {say:'Read about equivalent fractions.',speech:'One half equals two fourths equals four eighths. One third equals two sixths. One fifth equals two tenths.',view:'read'},
        {say:'Watch: thirds and sixths.',speech:'One third lines up with two sixths.',view:'model',demo:'third'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: tap bricks on the wall.',speech:'Your turn. Tap bricks to light them up. When two rows light up the same length, you found equivalent fractions.',view:'model'}],
 fig:'A fraction wall. Each row is one whole cut into equal bricks.',rz:-.2,
 explore:['*Tap* bricks to light them up.','Light two rows to the *same length* to find equivalent fractions.','Press *Clear* to start again.'],
 tries:[['How many eighths equal one half?','*4 eighths.* 4/8 = 1/2.'],['Fill in: 1/3 = ?/6','*2/6.*'],['Is 2/10 equal to 1/5?','*Yes.* Two tenths cover the same length as one fifth.']],
 howTo:'Read the fraction to make. Tap bricks in the row named in the question until that row is the same length as the fraction.',
 init:k=>({lit:{}}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'*Equivalent fractions* are different names for the *same amount*. A *fraction wall* shows them lining up.')+16;
  const rows=[[1,'#9aa8c4'],[2,'#ff8a8a'],[4,'#ffb347'],[8,'#ffd24a']],bw=TW-80;rows.forEach(([d,c],ri)=>{for(let i=0;i<d;i++){const x=X0+80+i*bw/d,yy=y+ri*56;g.fillStyle=i<d/2?c:'#f3f4f7';g.fillRect(x,yy,bw/d,48);g.strokeStyle=INK;g.lineWidth=2.5;g.strokeRect(x,yy,bw/d,48);
    if(d<=4||i<4)T(g,d===1?'1':'1/'+d,x+bw/d/2,yy+33,FT.smallB,INK,'center');}T(g,d===1?'whole':'1/'+d,X0,y+ri*56+33,FT.smallB,GREY);});
  g.strokeStyle=RED;g.lineWidth=4;g.setLineDash([10,8]);g.beginPath();g.moveTo(X0+80+bw/2,y-12);g.lineTo(X0+80+bw/2,y+230);g.stroke();g.setLineDash([]);
  y+=250;T(g,'1/2 = 2/4 = 4/8',X0,y+30,ZS(52),acc());y+=70;
  [['1/3 = 2/6','thirds and sixths'],['1/5 = 2/10','fifths and tenths']].forEach(([a,b],i)=>{T(g,a,X0+i*420,y+30,ZS(40));T(g,b,X0+i*420,y+64,FT.small,GREY);});y+=100;
  y=keyWords(p,y,[['equivalent','equal in value, even if the numbers are different']]);
  predict(p,y,S,'p8','How many sixths make the same amount as 2/3?','*4 sixths.* 2/3 = 4/6. Each third is the same as two sixths.');},
 readout(p,S,y){const g=p.g,st=S.st;const ROWS=[1,2,4,8,3,6,5,10];const lit=ROWS.filter(d=>(st.lit[d]||[]).length).map(d=>(st.lit[d]||[]).length+'/'+d);
  T(g,lit.length?'Lit: '+lit.join('   '):'Tap bricks to light them up.',X0,y+40,FT.bodyB,acc());const m=matches(st);T(g,m?m+'  are equivalent!':'',X0,y+92,ZS(42),'#16a36f');return y+100;},
 build(S,grp,mode,game){const st=S.st,ROWS=[1,2,4,8,3,6,5,10],COL={1:'#9aa8c4',2:'#ff8a8a',4:'#ffb347',8:'#ffd24a',3:'#5cc46a',6:'#7fd1c7',5:'#4fb3ff',10:'#b39dff'},Wd=4.0,h=.27,Z=-1.7;
  const wall=new THREE.Group();wall.position.set(0,0,Z);grp.add(wall);const bricks={};
  ROWS.forEach((d,ri)=>{bricks[d]=[];const y=.2+(ROWS.length-1-ri)*(h+.04);const l=label(d===1?'1':'1/'+d,{size:.18});l.position.set(-Wd/2-.18,y+h/2,0);wall.add(l);
    for(let i=0;i<d;i++){const w=Wd/d-.02;const b=mk(new THREE.BoxGeometry(w,h,.16),lam('#f1f3f8'),20);b.position.set(-Wd/2+(i+.5)*Wd/d,y+h/2,0);b.userData={d,i};wall.add(b);bricks[d].push(b);A.drag(b,{tap:()=>tog(d,i)});}});
  function paint(){ROWS.forEach(d=>bricks[d].forEach((b,i)=>{const on=(st.lit[d]||[]).includes(i);b.material=lam(on?COL[d]:'#f1f3f8');b.position.z=on?.08:0;}));}
  function tog(d,i){const a=st.lit[d]||(st.lit[d]=[]);const k=a.indexOf(i);k>=0?a.splice(k,1):a.push(i);A.pop();paint();const m=matches(st);if(m)A.good(m+' are equivalent!',V(W/2,PY+1.6,Z));if(mode==='play'&&st.want&&(st.lit[st.want.d]||[]).length===st.want.n)game.solved('Yes! '+st.want.q+' = '+st.want.n+'/'+st.want.d);A.redraw();}
  function lightL(d,n){st.lit[d]=[];for(let i=0;i<n;i++)st.lit[d].push(i);paint();A.pop();A.redraw();}
  paint();
  return {info:()=>matches(st)||'Tap bricks to light them up.',controls:()=>[{t:'Clear',fn:()=>{st.lit={};paint();A.redraw();}},{t:'Show 1/2',fn:()=>lightL(2,1)},{t:'Show 1/3',fn:()=>lightL(3,1)},{t:'Show 1/5',fn:()=>lightL(5,1)}],
    demo(n){if(n==='clear'){st.lit={};paint();A.redraw();return;}const LL={l2:[2,1],l4:[4,2],l8:[8,4],l3:[3,1],l6:[6,2]};if(LL[n]){lightL(LL[n][0],LL[n][1]);return;}st.lit={};paint();if(n==='half')A.seq([[600,()=>{lightL(2,1);A.say('1/2');}],[1400,()=>{lightL(4,2);A.say('2/4');}],[1400,()=>{lightL(8,4);A.say('4/8. All the same length!');}]]);
      if(n==='third')A.seq([[600,()=>{lightL(3,1);A.say('1/3');}],[1400,()=>{lightL(6,2);A.say('2/6 is the same length');}]]);},
    task(r){st.lit={};paint();const L=[{q:'1/2',d:4,n:2},{q:'1/3',d:6,n:2},{q:'1/5',d:10,n:2},{q:'3/4',d:8,n:6},{q:'2/3',d:6,n:4}][r];st.want=L;return 'Show *'+L.q+'* using *'+(L.d===4?'fourths':L.d===6?'sixths':L.d===8?'eighths':'tenths')+'*.';}};}
});
function matches(st){const ROWS=[1,2,4,8,3,6,5,10];const vals=ROWS.filter(d=>(st.lit[d]||[]).length).map(d=>({d,n:st.lit[d].length,v:st.lit[d].length/d}));
  for(let i=0;i<vals.length;i++)for(let j=i+1;j<vals.length;j++)if(Math.abs(vals[i].v-vals[j].v)<1e-9){const same=vals.filter(x=>Math.abs(x.v-vals[i].v)<1e-9);return same.map(x=>x.n+'/'+x.d).join(' = ');}return '';}

/* =========================================================
   9. Ratios: scaling up
   ========================================================= */
P.lesson({id:'ratio',title:'Ratios: scaling up',strand:'Number',codes:['B2.9'],
 guide:{goal:'Use the ratios 1 to 2, 1 to 5 and 1 to 10 to scale up numbers and solve problems.',words:'ratio, for every, scale up, table, group',
  ask:['For every bike there are 2 wheels. How many wheels for 6 bikes?','How is 1 to 10 like counting by 10s?','How many hands have 35 fingers?'],home:'Count socks: 1 pair to 2 socks. Count the socks in 5 pairs. Try fingers on hands too!'},
 learn:[{say:'For every 1, there are 2.',speech:'A ratio compares two amounts. In Diego’s bike shop, for every one bike, there are two wheels. Watch the bikes scale up.',view:'model',demo:'bikes'},
        {say:'Read the ratio table.',speech:'One bike has two wheels. Two bikes have four. Three bikes have six. Each time we add one bike, we add two wheels.',view:'read'},
        {say:'Watch: 1 to 10.',speech:'For every ten-frame there are ten counters. One, two, three ten-frames make ten, twenty, thirty.',view:'model',demo:'tens'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: build groups.',speech:'Your turn. Pick a ratio, then add or take away groups. Watch the table grow.',view:'model'}],
 fig:'Groups that scale up: bikes and wheels, hands and fingers, ten-frames and counters.',rz:.35,
 explore:['Pick *Bikes 1:2*, *Hands 1:5* or *Ten-frames 1:10*.','Add or take away *groups* and watch the total.','Read the ratio table on the page.'],
 tries:[['For every 1 bike there are 2 wheels. How many wheels on 8 bikes?','*16 wheels.*'],['Each hand has 5 fingers. How many hands have 30 fingers?','*6 hands.* 6 × 5 = 30.'],['1 ten-frame holds 10 counters. How many counters fill 7 ten-frames?','*70 counters.*']],
 howTo:'Read the problem. Add or take away groups until the model shows the answer.',
 init:k=>({kind:'bike',n:1,want:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'A *ratio* compares two amounts. *1 to 2* means for every 1 of something there are 2 of something else.')+16;
  const tbl=(x,head,k)=>{rr(g,x,y,250,330,16);g.fillStyle=tint(acc(),.08);g.fill();T(g,head[0],x+70,y+42,FT.smallB,acc(),'center');T(g,head[1],x+180,y+42,FT.smallB,acc(),'center');
    for(let i=1;i<=6;i++){T(g,String(i),x+70,y+42+i*46,FT.body,INK,'center');T(g,String(i*k),x+180,y+42+i*46,FT.bodyB,INK,'center');}};
  tbl(X0,['bikes','wheels'],2);tbl(X0+290,['hands','fingers'],5);tbl(X0+580,['frames','counters'],10);y+=360;
  y=para(p,y,'To *scale up*, add the same group again and again: 1 to 5 is like counting by 5s, and 1 to 10 is like counting by 10s.')+12;
  y=keyWords(p,y,[['ratio','a comparison, like 1 bike to 2 wheels'],['scale up','make every amount bigger by the same groups']]);
  predict(p,y,S,'p9','For every 1 dime there are 10 cents. How many cents in 6 dimes?','*60 cents.* 1 to 10 scales up to 6 to 60.');},
 readout(p,S,y){const g=p.g,st=S.st,K={bike:[2,'bike','wheels'],hand:[5,'hand','fingers'],frame:[10,'ten-frame','counters']}[st.kind];
  T(g,st.n+' '+K[1]+(st.n>1?'s':'')+'  →  '+st.n*K[0]+' '+K[2],X0,y+46,ZS(46),acc());T(g,'Ratio 1 to '+K[0]+':  '+[1,2,3,4,5].map(i=>i+':'+i*K[0]).join('   '),X0,y+90,FT.small,GREY);return y+100;},
 build(S,grp,mode,game){const st=S.st,area=new THREE.Group();grp.add(area);
  function model(kind){const g=new THREE.Group();
    if(kind==='bike'){const wg=G('wheel',()=>new THREE.TorusGeometry(.13,.03,8,20));[-1,1].forEach(s=>{const w=mk(wg,lam(INK),0);w.position.set(s*.17,.15,0);g.add(w);const hub=mk(G('hub',()=>new THREE.CylinderGeometry(.11,.11,.02,16)),lam('#ffd24a'),0);hub.rotation.x=Math.PI/2;hub.position.set(s*.17,.15,0);g.add(hub);});
      const fr=mk(new THREE.BoxGeometry(.34,.04,.04),lam('#e4572e'),0);fr.position.y=.26;g.add(fr);const seat=mk(new THREE.BoxGeometry(.1,.03,.06),lam(INK),0);seat.position.set(-.08,.34,0);g.add(seat);}
    else if(kind==='hand'){const palm=mk(new THREE.BoxGeometry(.3,.06,.26),lam('#f2c9a0'),20);palm.position.y=.04;g.add(palm);for(let i=0;i<5;i++){const f=mk(G('fing',()=>new THREE.CylinderGeometry(.03,.03,.16,8)),lam('#f2c9a0'),0);f.rotation.x=Math.PI/2;f.position.set(-.12+i*.06,.05,-.2+(i===0?.1:0));g.add(f);}}
    else{const fb=mk(new THREE.BoxGeometry(.6,.04,.25),lam('#ffffff'),20);fb.position.y=.02;g.add(fb);for(let i=0;i<10;i++){const c=mk(G('ctr',()=>new THREE.CylinderGeometry(.04,.04,.03,14)),lam('#e4572e'),0);c.position.set(-.24+(i%5)*.12,.06,(Math.floor(i/5)-.5)*.11);g.add(c);}}
    return g;}
  function layout(drop){clearGroup(area);const per=5;for(let i=0;i<st.n;i++){const m=model(st.kind);const row=Math.floor(i/per),col=i%per;const p=V((col-(Math.min(st.n,per)-1)/2)*.8,0,-2.1+row*.75);m.position.copy(p);if(drop&&i===st.n-1)m.position.y=1;area.add(m);moveTo(m,{pos:p,k:9});}
    const K={bike:2,hand:5,frame:10}[st.kind];tot.userData.set(st.n+' → '+st.n*K);}
  const tot=label('',{size:.36,bg:'#ffffff'});tot.position.set(0,1.4,-1.7);grp.add(tot);
  function set(n){n=Math.max(1,Math.min(10,n));if(n===st.n)return;const up=n>st.n;st.n=n;layout(up);A.pop();check();A.redraw();}
  function kind(k){st.kind=k;st.n=1;layout(true);A.redraw();}
  function check(){if(mode==='play'&&st.want&&st.n===st.want.n&&st.kind===st.want.kind)game.solved(st.want.ok);}
  layout(false);
  return {info:()=>{const K={bike:[2,'wheels'],hand:[5,'fingers'],frame:[10,'counters']}[st.kind];return st.n+' groups → '+st.n*K[0]+' '+K[1];},
    controls:()=>{const o=[{t:'− group',big:true,fn:()=>set(st.n-1)},{t:'+ group',big:true,go:true,fn:()=>set(st.n+1)}];if(mode==='learn')o.unshift({t:'Bikes 1:2',on:st.kind==='bike',fn:()=>kind('bike')},{t:'Hands 1:5',on:st.kind==='hand',fn:()=>kind('hand')},{t:'Ten-frames 1:10',on:st.kind==='frame',fn:()=>kind('frame')});return o;},
    demo(n){if(n==='b1'){kind('bike');return;}if(/^n\d$/.test(n)){set(+n[1]);return;}const k=n==='bikes'?'bike':'frame';kind(k);const l=[];for(let i=2;i<=4;i++)l.push([1300,()=>{set(i);const K=k==='bike'?2:10;A.say(i+(k==='bike'?' bikes, ':' ten-frames, ')+i*K+(k==='bike'?' wheels':' counters'));}]);A.seq(l);},
    task(r){const L=[{kind:'bike',n:4,q:'Build enough *bikes* for *8 wheels*.',ok:'4 bikes have 8 wheels!'},{kind:'hand',n:6,q:'How many fingers on *6 hands*? Build 6 hands.',ok:'6 hands have 30 fingers!'},{kind:'frame',n:4,q:'Show *40 counters* with ten-frames.',ok:'4 ten-frames hold 40 counters!'},
      {kind:'bike',n:7,q:'Build *7 bikes*. How many wheels is that?',ok:'7 bikes have 14 wheels!'},{kind:'hand',n:7,q:'You need *35 fingers*. Build the right number of hands.',ok:'7 hands have 35 fingers!'}][r];st.want=L;st.kind=L.kind;st.n=1;layout(false);return L.q;}};}
});
})();
