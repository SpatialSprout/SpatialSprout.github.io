/* The Interactive Classroom: Grade 1 Math — Units 10–13: numbers to 20 and to 100, skip counting, money */
(function(){
"use strict";
const P=window.PM;if(!P||P.failed||!P.THREE||!P.K||!P.K.groups)return;
const {THREE,V,G,lam,mk,label,clearGroup,rr,T,wrap,header,keyWords,FT,ZS,X0,TW,INK,GREY,tint,A,hop,tween,moveTo,easeOut}=P;
const K=P.K,{rnd,pick,shuffle,choices,nearby,words,toy,lay,crossOut,tag,mat,icon,icons,xMark,tbox,exGrid,bigText,hand,sub,nm,groups,readSent,KS}=K;
const acc=()=>P.ACC;
const evenOdd=n=>n%2?'odd':'even';

/* ---------- hundreds chart: one board texture + invisible tap cells ---------- */
function chartTex(o){const cv=document.createElement('canvas');const cw=100;cv.width=cv.height=cw*10;const g=cv.getContext('2d');
  for(let i=1;i<=100;i++){const x=((i-1)%10)*cw,y=Math.floor((i-1)/10)*cw;g.fillStyle=o.hi&&o.hi(i)||'#ffffff';g.fillRect(x+2,y+2,cw-4,cw-4);
    if(o.blank&&o.blank.includes(i)){g.fillStyle='#fff3c4';g.fillRect(x+2,y+2,cw-4,cw-4);g.strokeStyle='#e09b00';g.setLineDash([8,6]);g.lineWidth=4;g.strokeRect(x+12,y+12,cw-24,cw-24);g.setLineDash([]);continue;}
    g.fillStyle=INK;g.font='700 44px "Zilla Slab", Georgia, serif';g.textAlign='center';g.textBaseline='middle';g.fillText(String(i),x+cw/2,y+cw/2+3);}
  const t=new THREE.CanvasTexture(cv);t.anisotropy=4;return new THREE.MeshLambertMaterial({map:t});}
function chart(grp,o,onTap){const c=o.c||.4,x0=-(4.5*c),z0=o.z0==null?-3.0:o.z0;const side=lam('#e2e8f0');const b=mk(new THREE.BoxGeometry(10*c,.06,10*c),[side,side,chartTex(o),side,side,side],20);b.position.set(0,.03,z0+4.5*c);grp.add(b);
  const cells=[];for(let n=1;n<=100;n++){const h=mk(G('k_hit'+c,()=>new THREE.BoxGeometry(c*.92,.02,c*.92)),new THREE.MeshBasicMaterial({transparent:true,opacity:0,depthWrite:false}),0);h.position.set(x0+((n-1)%10)*c,.07,z0+Math.floor((n-1)/10)*c);h.userData.n=n;grp.add(h);if(onTap)A.drag(h,{tap:()=>onTap(n)});cells[n]=h;}
  return {b,cells,pos:n=>V(x0+((n-1)%10)*c,.07,z0+Math.floor((n-1)/10)*c)};}
function chart2d(g,x,y,cw,o){for(let i=1;i<=100;i++){const cx=x+((i-1)%10)*cw,cy=y+Math.floor((i-1)/10)*cw;g.fillStyle=o.hi&&o.hi(i)||'#ffffff';g.fillRect(cx,cy,cw-2,cw-2);g.strokeStyle='#d6dae6';g.lineWidth=1;g.strokeRect(cx,cy,cw-2,cw-2);
  if(!(o.blank&&o.blank.includes(i)))T(g,String(i),cx+cw/2-1,cy+cw*.68,'700 '+Math.round(cw*.42)+'px "Zilla Slab", Georgia, serif',INK,'center');}}
/* tens rods and ones cubes */
function rods(grp,t,o,x0,z0,s){s=s||.16;for(let k=0;k<t;k++){const r=new THREE.Group();for(let i=0;i<10;i++){const c=K.bx(s*.92,s*.92,s*.92,'#2f7de1');c.position.set(0,0,-i*s);r.add(c);}r.position.set(x0+k*(s*1.6),s/2+.03,z0);r.userData.rod=1;grp.add(r);}
  for(let i=0;i<o;i++){const c=K.bx(s*.92,s*.92,s*.92,'#ffc04d');c.position.set(x0+t*s*1.6+.35+(i%3)*s*1.4,s/2+.03,z0-Math.floor(i/3)*s*1.4);c.userData.one=1;grp.add(c);}}

/* =========================================================
   Unit 10 · Numbers 1 to 20, even and odd
   ========================================================= */
P.lesson({id:'num20',title:'Numbers 1 to 20',strand:'Number',codes:['B1.1','B1.3','B1.5'],
 guide:{goal:'Count, read and order numbers to 20, count forward and backward from any number, and tell whether a number is even or odd.',words:'teen numbers, before, after, least, greatest, even, odd, pair, left over',
  ask:['What number is 1 more than 15?','How can pairing up tell you if 13 is even or odd?','Put 9, 17 and 12 in order from least to greatest.'],home:'Pair up socks! If one sock is left over, the number is odd. If every sock has a partner, it is even.'},
 learn:[{say:'Pair them up!',speech:'Make pairs. If every one has a partner, the number is even. If one is left over, it is odd.',view:'model',demo:'pair9'}],
 fig:'Counting to 20, a number path, and pairs for even and odd.',rz:.45,
 explore:['Press *+ 1* and *− 1* (up to 20).','Press *Pair up* to check even or odd.','Press *Path* to hop.'],
 howTo:'Count and tap the number, tap the right tile on the path, or tell if a number is even or odd.',
 init:k=>Object.assign(K.R0(),{view:'count',kind:'strawberry',a:13,cols:10,max:20,from:10,to:20,pos:13}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=tbox(p,y-10,250,'Teen numbers: 10 and some more');
  icons(g,'strawberry',10,X0+30,y,40);icons(g,'strawberry',3,X0+30,y+48,40,{c:'#ffb300'});bigText(g,'13',X0+520,y+56,60,acc());hand(g,'10 and 3 more is 13',X0+30,y+140,INK);
  for(let v=10;v<=20;v++){const x=X0+30+(v-10)*70;rr(g,x,y+150,62,46,8);g.fillStyle=v===13?'#fff3c4':'#fff';g.fill();g.strokeStyle='#c9cfdc';g.lineWidth=2;g.stroke();T(g,String(v),x+31,y+184,ZS(26),INK,'center');}y+=200;
  y=tbox(p,y,330,'Even or odd? Two ways to tell');
  T(g,'1. Pair them up',X0+30,y+6,FT.bodyB,INK);for(let i=0;i<9;i++){const cx=X0+60+Math.floor(i/2)*60,cy=y+44+(i%2)*44;K.ell(g,cx,cy,16,16,i===8?'#e4572e':'#5fd38a');}
  for(let k=0;k<4;k++){rr(g,X0+38+k*60,y+20,44,92,20);g.strokeStyle='#16a36f';g.lineWidth=3;g.stroke();}hand(g,'9: one left over → odd',X0+330,y+82,'#e4572e');
  T(g,'2. Look at the last digit',X0+30,y+170,FT.bodyB,INK);T(g,'0, 2, 4, 6, 8 → even',X0+60,y+214,FT.body,'#16a36f');T(g,'1, 3, 5, 7, 9 → odd',X0+420,y+214,FT.body,'#e4572e');hand(g,'14 ends in 4 → even',X0+60,y+256,INK);y+=270;
  y=exGrid(p,y,4,124,(i,x,yy,w,h)=>{
    if(i===0){T(g,'after 15:',x+56,yy+50,FT.bodyB);bigText(g,'16',x+220,yy+54,40,acc());T(g,'before 12:',x+56,yy+100,FT.bodyB);bigText(g,'11',x+220,yy+104,40,acc());}
    if(i===1){T(g,'least → greatest',x+56,yy+34,FT.smallB);hand(g,'9, 12, 17',x+56,yy+92,INK);}
    if(i===2){T(g,'3 more than 12',x+56,yy+34,FT.smallB);hand(g,'13, 14, 15 → 15',x+56,yy+92,'#16a36f');}
    if(i===3){T(g,'2 less than 14',x+56,yy+34,FT.smallB);hand(g,'13, 12 → 12',x+56,yy+92,'#e4572e');}
  });
  y=keyWords(p,y,[['even','every one has a partner; ends in 0, 2, 4, 6 or 8'],['odd','one is left over; ends in 1, 3, 5, 7 or 9']]);return y;},
 readout(p,S,y){const st=S.st;if(st.view==='pairs'){const g=p.g;T(g,st.a+' is '+(st.ringed>=Math.floor(st.a/2)?evenOdd(st.a):'…'),X0,y+58,ZS(52),acc());return y+76;}return readSent(p,S,y);},
 build(S,grp,mode,game){const st=S.st;const G1=groups(S,grp,mode,game);
  G1.onChange=()=>{if(mode==='play'&&!st.setup&&st.need&&st.a===st.need)game.solved('Yes! That is '+st.need+'!');};
  G1.onTile=v=>{G1.hopTo(v);if(mode==='play'&&!st.setup&&st.wantT!=null){if(v===st.wantT)A.later(()=>game.solved(st.okT),450);else A.bad(st.hintT||'Count again!');}};
  function pairUp(){st.view='pairs';st.ringed=0;G1.draw();A.seq([...Array(Math.floor(st.a/2))].map((_,k)=>[260,()=>{st.ringed=k+1;G1.draw();}]));}
  G1.draw();
  return {info:()=>st.view+st.a,
    controls:()=>{const c=st.view==='track'?[{t:'Count',fn:()=>{st.view='count';G1.draw();}},{t:'Pair up',go:true,fn:()=>{st.a=st.pos||st.a;pairUp();}}]:[{t:'+ 1',fn:()=>{st.view='count';G1.addOne(1);}},{t:'− 1',fn:()=>{st.view='count';G1.addOne(-1);}},{t:'Pair up',go:true,fn:pairUp},{t:'Path',fn:()=>{st.view='track';st.from=10;st.to=20;st.pos=Math.max(10,st.a);G1.draw();}}];
      if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);return c;},
    demo(n){st.ask=null;st.need=null;st.wantT=null;st.lit=null;st.sent=null;
      if(n==='c13'){st.view='count';st.kind='strawberry';st.a=13;G1.draw();}
      if(n==='path13'){st.view='track';st.from=10;st.to=20;st.pos=13;st.lit=[13];G1.draw();}if(/^go\d+$/.test(n))G1.hopTo(+n.slice(2));
      if(n==='pair9'){st.kind='strawberry';st.a=9;pairUp();}if(n==='pair9done'){st.kind='strawberry';st.a=9;st.view='pairs';st.ringed=4;G1.draw();}
      if(n==='pair14'){st.kind='strawberry';st.a=14;st.view='pairs';st.ringed=7;G1.draw();}},
    task(r){st.setup=true;st.ask=null;st.need=null;st.wantT=null;st.lit=null;st.sent=null;let txt;st.kind=pick(KS);
      if(r===0){st.view='count';st.a=rnd(11,20);st.ask={o:nearby(st.a,10,20),ans:st.a,ok:'Yes! '+st.a+': '+words(st.a)+'.'};txt='How many '+nm(st.kind,2)+'? Count the row of ten, then count on.';}
      else if(r===1){st.view='track';st.from=10;st.to=20;const v=rnd(11,19),after=pick([true,false]);st.pos=v;st.lit=[v];st.wantT=after?v+1:v-1;st.okT='Yes! '+st.wantT+' comes '+(after?'after':'before')+' '+v+'.';txt='Tap the number that comes *'+(after?'after':'before')+' '+v+'*.';}
      else if(r===2){st.view='track';st.from=10;st.to=20;const more=pick([true,false]),k=rnd(2,3),v=more?rnd(10,20-k):rnd(10+k,20);st.pos=v;st.lit=[v];st.wantT=more?v+k:v-k;st.okT='Yes! '+k+(more?' more than ':' less than ')+v+' is '+st.wantT+'.';st.hintT=more?'More than: hop forward.':'Less than: hop back.';txt='What is *'+k+(more?' more than ':' less than ')+v+'*? Tap the tile.';}
      else if(r===3){const v=rnd(7,15);st.a=v;st.view='pairs';st.ringed=Math.floor(v/2);st.ask={o:['even','odd'],ans:evenOdd(v),ok:'Yes! '+v+' is '+evenOdd(v)+'.'};txt='Look at the pairs. Is *'+v+'* even or odd?';}
      else{const ns=shuffle([...Array(11).keys()].map(i=>i+8)).slice(0,3);const sorted=ns.slice().sort((a,b)=>a-b);st.view='count';st.a=sorted[0];const o=[sorted.join(', '),[sorted[1],sorted[0],sorted[2]].join(', '),sorted.slice().reverse().join(', ')];st.ask={o:shuffle(o),ans:sorted.join(', '),ok:'Yes! '+sorted.join(', ')+'.'};st.view='track';st.from=8;st.to=18;st.pos=8;txt='Put *'+ns.join(', ')+'* in order from *least to greatest*.';}
      G1.draw();st.setup=false;return txt;}};}
});

/* =========================================================
   Unit 11 · Numbers 21 to 100: tens and ones, the hundreds chart
   ========================================================= */
P.lesson({id:'num100',title:'Numbers 21 to 100',strand:'Number',codes:['B1.1','B1.2','B1.3'],
 guide:{goal:'Count and read numbers to 100, show 2-digit numbers as tens and ones, use the hundreds chart, compare numbers, and tell even from odd.',words:'tens, ones, place value, digit, hundreds chart, greater, less, even, odd',
  ask:['How many tens are in 47? How many ones?','Where is 60 on the hundreds chart?','Which is greater, 38 or 83? How do you know?'],home:'Bundle straws or popsicle sticks in tens with an elastic. Count the bundles, then the loose ones.'},
 learn:[{say:'Build 47 with tens and ones.',speech:'Four tens and seven ones make forty-seven. Count the tens: ten, twenty, thirty, forty. Then the ones: forty-one, up to forty-seven.',view:'model',demo:'build47'}],
 fig:'Tens rods and ones cubes, and a hundreds chart.',rz:.45,
 explore:['Press *+ ten* or *+ one* to build a number.','Press *Chart* and *tap* any number.','Read the number in tens and ones.'],
 howTo:'Build the number, tap it on the hundreds chart, or tap the answer.',
 init:k=>({view:'tens',t:4,o:7,lit:null,blank:null,ask:null}),rz:1.2,
 left(p,S){const g=p.g;let y=header(p,S);
  y=tbox(p,y-10,250,'Tens and ones');
  for(let k=0;k<4;k++)for(let i=0;i<10;i++){g.fillStyle='#2f7de1';g.fillRect(X0+40+k*34,y+i*16,26,14);}for(let i=0;i<7;i++){g.fillStyle='#ffc04d';g.fillRect(X0+200+(i%4)*30,y+90+Math.floor(i/4)*30,24,24);}
  T(g,'4 tens and 7 ones',X0+380,y+50,FT.bodyB,INK);bigText(g,'= 47',X0+380,y+116,56,acc());hand(g,'47 = 40 + 7',X0+380,y+164,INK);y+=190;
  y=tbox(p,y,420,'The hundreds chart');
  chart2d(g,X0+30,y-6,34,{hi:i=>i%10===0?tint('#2f7de1',.25):i>=41&&i<=50?tint('#ffc04d',.5):null});
  const tx=X0+390;['*10 rows* and *10 columns*','Go *right*: 1 more','Go *down*: 10 more','The *ones digit* tells even or odd: 45 is odd, 96 is even.'].forEach((t,i)=>wrap(g,t,tx,y+16+i*78,TW-tx+X0-20,34,{font:FT.body,bold:FT.bodyB,boldColor:acc()}));y+=360;
  y=exGrid(p,y,4,112,(i,x,yy,w,h)=>{
    if(i===0){hand(g,'65 = 6 tens 5 ones',x+56,yy+70,INK);}
    if(i===1){hand(g,'38 = 30 + 8',x+56,yy+70,INK);}
    if(i===2){T(g,'Greater:',x+56,yy+44,FT.smallB);hand(g,'54 > 36',x+56,yy+92,acc());}
    if(i===3){T(g,'after 89:',x+56,yy+44,FT.smallB);bigText(g,'90',x+56,yy+96,38,acc());T(g,'before 40:',x+180,yy+44,FT.smallB);bigText(g,'39',x+180,yy+96,38,acc());}
  });
  y=keyWords(p,y,[['digit','one of the symbols 0 to 9 that make a number'],['place value','what a digit is worth: tens or ones']]);return y;},
 readout(p,S,y){const g=p.g,st=S.st;if(st.view==='tens'){const n=st.t*10+st.o;T(g,String(n),X0,y+58,ZS(60),acc());T(g,st.t+' ten'+(st.t===1?'':'s')+' and '+st.o+' one'+(st.o===1?'':'s'),X0+140,y+52,FT.bodyB);}
  else if(st.sel){T(g,String(st.sel),X0,y+58,ZS(60),acc());T(g,words(st.sel)+'  ·  '+evenOdd(st.sel),X0+140,y+52,FT.bodyB);}return y+72;},
 build(S,grp,mode,game){const st=S.st;const g2=K.stage(grp,.5);
  function draw(){clearGroup(g2);
    if(st.view==='tens'){mat(g2,4.4,2.3,0,-1.4);rods(g2,st.t,st.o,-2.0,-.45,.17);const L=tag(String(st.t*10+st.o),{size:.4,border:acc()});L.position.set(1.3,.9,-2.2);g2.add(L);}
    else if(st.view==='pair'){st.pair.forEach((n,i)=>{const x=i?1.1:-1.1;rods(g2,Math.floor(n/10),n%10,x-.95,-1.0,.13);const L=tag(String(n),{size:.36,border:acc()});L.position.set(x,1.1,-2.6);g2.add(L);
      const pad=mk(new THREE.BoxGeometry(2.0,.03,2.2),new THREE.MeshBasicMaterial({transparent:true,opacity:0,depthWrite:false}),0);pad.position.set(x,.1,-1.75);g2.add(pad);K.tapOn(pad,()=>tapPair(i));});}
    else{chart(g2,{c:.36,z0:-3.0,hi:i=>st.lit&&st.lit.includes(i)?'#ffe08a':st.sel===i?'#bde3ff':null,blank:st.blank},tapN);}
    A.redraw();}
  function tapN(n){A.pop();st.sel=n;A.say(String(n));if(mode==='play'&&!st.setup&&st.wantN!=null){if(n===st.wantN){st.blank=null;st.lit=[n];draw();game.solved(st.okN);}else{A.bad(st.hintN||'Look at the row and the column.');draw();}return;}draw();}
  function tapPair(i){A.pop();A.say(String(st.pair[i]));if(mode==='play'&&!st.setup&&st.wantP!=null){if(i===st.wantP)game.solved(st.okP);else A.bad('Compare the tens first!');}}
  function add(k,d){if(k==='t'){if(st.t+d<0||(st.t+d)*10+st.o>100){A.bad('Let’s stay at 100 or less.');return;}st.t+=d;}else{if(st.o+d<0||st.o+d>9){if(st.o+d>9&&st.t<10){st.o=0;st.t++;A.say('10 ones make a ten!');draw();chk();return;}A.bad('No ones to take away.');return;}st.o+=d;}A.pop();draw();A.say(String(st.t*10+st.o));chk();}
  function chk(){if(mode==='play'&&!st.setup&&st.need!=null&&st.t*10+st.o===st.need)game.solved('Yes! '+st.t+' tens and '+st.o+' ones make '+st.need+'.');}
  draw();
  return {info:()=>st.view+st.t+st.o+(st.sel||''),
    controls:()=>{const c=st.view==='tens'?[{t:'+ ten',go:true,fn:()=>add('t',1)},{t:'− ten',fn:()=>add('t',-1)},{t:'+ one',fn:()=>add('o',1)},{t:'− one',fn:()=>add('o',-1)},{t:'Chart',fn:()=>{st.view='chart';st.lit=null;st.blank=null;draw();}}]:[{t:'Tens and ones',fn:()=>{st.view='tens';draw();}}];
      if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);return c;},
    demo(n){st.ask=null;st.need=null;st.wantN=null;st.wantP=null;
      if(n==='show47'){st.view='tens';st.t=4;st.o=7;draw();}
      if(n==='build47'){st.view='tens';st.t=0;st.o=0;draw();A.seq([...Array(4)].map(()=>[450,()=>add('t',1)]).concat([...Array(7)].map(()=>[300,()=>add('o',1)])));}
      if(n==='chart'){st.view='chart';st.lit=null;st.blank=null;st.sel=null;draw();}
      if(n==='right'){st.view='chart';st.blank=null;st.sel=null;st.lit=[44,45];draw();}if(n==='down'){st.view='chart';st.blank=null;st.sel=null;st.lit=[45,55];draw();}
      if(n==='tens10'){st.view='chart';st.blank=null;st.sel=null;st.lit=[10,20,30,40,50,60,70,80,90,100];draw();}
      if(n==='odd45'){st.view='chart';st.lit=[45,96];st.sel=null;draw();}},
    task(r){st.setup=true;st.ask=null;st.need=null;st.wantN=null;st.wantP=null;st.lit=null;st.blank=null;st.sel=null;let txt;
      if(r===0){const n=rnd(21,99);st.view='tens';st.t=Math.floor(n/10);st.o=n%10;st.ask={o:shuffle([n,(n%10)*10+Math.floor(n/10),n+10>99?n-10:n+10].filter((v,i,a)=>a.indexOf(v)===i&&v>0)),ans:n,ok:'Yes! '+st.t+' tens and '+st.o+' ones: '+n+'.'};txt='Count the tens, then the ones. What number is it?';}
      else if(r===1){const n=rnd(23,88);st.view='tens';st.t=rnd(0,2);st.o=0;st.need=n;txt='Build *'+n+'* with tens and ones.';}
      else if(r===2){const n=rnd(22,98);st.view='chart';st.blank=[n];st.wantN=n;st.okN='Yes! '+n+' goes there.';txt='A number is missing on the chart. It is *'+n+'*. Tap its box. (Hint: '+Math.floor(n/10)+' tens, '+(n%10)+' ones.)';}
      else if(r===3){let a=rnd(21,98),b=rnd(21,98);while(a===b)b=rnd(21,98);if(pick([true,false])){b=(a%10)*10+Math.floor(a/10);if(b<21||b===a)b=a>50?a-17:a+17;}st.view='pair';st.pair=[a,b];const big=a>b?0:1,want=pick(['greater','less']);st.wantP=want==='greater'?big:1-big;st.okP='Yes! '+st.pair[st.wantP]+' is '+want+'.';txt='Tap the number that is *'+want+'*.';}
      else{const n=rnd(21,99);st.view='chart';st.lit=[n];st.sel=null;const q=pick(['after','before','evenodd']);if(q==='evenodd'){st.ask={o:['even','odd'],ans:evenOdd(n),ok:'Yes! '+n+' ends in '+(n%10)+', so it is '+evenOdd(n)+'.'};txt='Is *'+n+'* even or odd? Look at the ones digit.';}
        else{const w=q==='after'?n+1:n-1;if(w<1||w>100){st.ask={o:['even','odd'],ans:evenOdd(n),ok:'Yes!'};txt='Is *'+n+'* even or odd?';}else{st.wantN=w;st.okN='Yes! '+w+' comes '+q+' '+n+'.';txt='Tap the number that comes *'+q+' '+n+'*.';}}}
      draw();st.setup=false;return txt;}};}
});

/* =========================================================
   Unit 12 · Counting by 1s, 2s, 5s and 10s
   ========================================================= */
P.lesson({id:'skip1',title:'Counting by 2s, 5s and 10s',strand:'Number',codes:['B1.5'],
 guide:{goal:'Count forward by 1s, 2s, 5s and 10s, count backward by 1s, 2s and 5s from 20, and choose the best way to count a group.',words:'skip count, by 2s, by 5s, by 10s, forward, backward, groups of',
  ask:['Count your fingers by 5s. How many?','Why is counting by 10s faster for 60 stickers?','What comes next: 10, 12, 14, ___?'],home:'Count socks by 2s, fingers by 5s, and toes of the whole family by 10s!'},
 learn:[{say:'Skip count by 5s!',speech:'Each hand has five fingers. Count the hands by fives: five, ten, fifteen, twenty.',view:'model',demo:'by5'}],
 fig:'Toys in groups, and a hundreds chart that lights up as we skip count.',rz:.45,
 explore:['Press *by 2s*, *by 5s* or *by 10s*.','Watch the chart light up.','Press *Groups* to see the groups.'],
 howTo:'Skip count and tap the next number on the chart, or count the groups and tap the answer.',
 init:k=>({view:'groups',step:5,ng:4,kind:'star',lit:[],ask:null}),rz:1.2,
 left(p,S){const g=p.g;let y=header(p,S);
  y=tbox(p,y-10,330,'Skip counting');
  [['by 2s','2, 4, 6, 8, 10, 12 …','mitten',2],['by 5s','5, 10, 15, 20, 25 …','star',5],['by 10s','10, 20, 30, 40, 50 …','block',10]].forEach(([a,b,k,n],i)=>{const yy=y+i*84;rr(g,X0+28,yy,120,48,24);g.fillStyle=tint(acc(),.2);g.fill();T(g,a,X0+88,yy+34,FT.bodyB,acc(),'center');T(g,b,X0+170,yy+34,FT.hand,INK);
    rr(g,X0+520,yy-4,Math.min(280,n*28+10),56,14);g.strokeStyle=acc();g.lineWidth=3;g.stroke();icons(g,k,n,X0+526,yy+4,26,{gap:28});});
  y+=270;
  y=tbox(p,y,300,'On the hundreds chart');chart2d(g,X0+30,y-6,24,{hi:i=>i<=50&&i%5===0?'#ffe08a':i<=50&&i%2===0?tint('#5fd38a',.35):null});
  ['Yellow: by 5s.','Green: by 2s.','The 10s go straight *down* the last column.'].forEach((t,i)=>wrap(g,t,X0+300,y+20+i*60,TW-300,34,{font:FT.body,bold:FT.bodyB,boldColor:acc()}));y+=260;
  y=exGrid(p,y,4,120,(i,x,yy,w,h)=>{
    if(i===0){hand(g,'4 twos = 8',x+56,yy+72,INK);}
    if(i===1){hand(g,'3 fives = 15',x+56,yy+72,INK);}
    if(i===2){hand(g,'6 tens = 60',x+56,yy+72,INK);}
    if(i===3){T(g,'Back by 5s:',x+56,yy+44,FT.smallB);hand(g,'20, 15, 10, 5',x+56,yy+92,'#e4572e');}
  });
  y=keyWords(p,y,[['skip count','count by jumps of the same size'],['groups of 10','the fastest way to count big groups']]);return y;},
 readout(p,S,y){const g=p.g,st=S.st;if(st.view==='groups'){T(g,st.ng+' groups of '+st.step+' = '+st.ng*st.step,X0,y+58,ZS(50),acc());}else if(st.lit.length)T(g,st.lit.slice(-5).join(', '),X0,y+58,ZS(44),acc());return y+72;},
 build(S,grp,mode,game){const st=S.st;const g2=K.stage(grp,.5);
  function draw(){clearGroup(g2);
    if(st.view==='groups'){const n=st.ng,s=st.step;const per=s===10?2:s===5?3:5;const gw=s===10?2.0:s===5?1.35:.8;const rows=Math.ceil(n/per);
      for(let k=0;k<n;k++){const cx=((k%per)-(Math.min(n,per)-1)/2)*(gw+.12),cz=-1.6+Math.floor(k/per)*.62+(rows===1?.3:0);
        const pad=mk(new THREE.BoxGeometry(gw,.03,.52),lam(k<st.counted?'#fff3c4':'#ffffff'),20);pad.position.set(cx,.015,cz);g2.add(pad);
        lay(g2,st.kind,s,{cols:s,gap:gw/s*.95,x:cx,z:cz,s:s===10?.55:s===5?.75:.95});
        if(k<st.counted){const L=tag(String((k+1)*s),{size:.24,bg:'#ffd54f',border:'#e09b00'});L.position.set(cx,.62,cz-.15);g2.add(L);}}}
    else chart(g2,{c:.36,z0:-3.0,hi:i=>st.lit.includes(i)?'#ffe08a':null,blank:st.blank},tapN);
    A.redraw();}
  function tapN(n){A.pop();A.say(String(n));if(mode==='play'&&!st.setup&&st.wantN!=null){if(n===st.wantN){st.lit.push(n);st.blank=null;draw();game.solved(st.okN);}else A.bad(st.hintN);return;}}
  function count(step){st.view='chart';st.step=step;st.lit=[];st.blank=null;draw();const s=[];for(let n=step;n<=Math.min(100,step*12);n+=step)s.push([step===2?260:380,()=>{st.lit.push(n);draw();A.say(String(n));}]);A.seq(s);}
  function countGroups(){st.view='groups';st.counted=0;draw();A.seq([...Array(st.ng)].map((_,k)=>[600,()=>{st.counted=k+1;draw();A.say(String((k+1)*st.step));}]));}
  st.counted=st.counted||0;draw();
  return {info:()=>st.view+st.step+st.lit.length,
    controls:()=>{const c=[{t:'by 2s',fn:()=>count(2)},{t:'by 5s',fn:()=>count(5)},{t:'by 10s',fn:()=>count(10)},{t:'Groups',go:true,fn:()=>{st.step=pick([2,5,10]);st.ng=st.step===10?rnd(3,6):st.step===5?rnd(3,6):rnd(4,8);st.kind=pick(KS);countGroups();}}];
      if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);return c;},
    demo(n){st.ask=null;st.wantN=null;
      if(n==='by5'){st.step=5;st.ng=4;st.kind='star';countGroups();}if(n==='g5'){st.view='groups';st.step=5;st.ng=4;st.kind='star';st.counted=4;draw();}
      if(n==='g2'){st.view='groups';st.step=2;st.ng=5;st.kind='mitten';st.counted=0;draw();}if(n==='g2c'){st.view='groups';st.step=2;st.ng=5;st.kind='mitten';st.counted=5;draw();}
      if(n==='g10'){st.view='groups';st.step=10;st.ng=4;st.kind='block';st.counted=4;draw();}
      if(n==='c2'){st.view='chart';st.lit=[2,4,6,8,10,12,14,16,18,20];st.blank=null;draw();}if(n==='c5'){st.view='chart';st.lit=[5,10,15,20,25,30,35,40,45,50];st.blank=null;draw();}
      if(n==='c10'){st.view='chart';st.lit=[10,20,30,40,50,60,70,80,90,100];st.blank=null;draw();}},
    task(r){st.setup=true;st.ask=null;st.wantN=null;st.blank=null;st.counted=0;let txt;
      if(r<=2){const step=[2,5,10][r];const start=step*rnd(1,step===10?5:step===5?10:20);const k=3;st.view='chart';st.lit=[...Array(k)].map((_,i)=>start+i*step).filter(v=>v<=100);const nx=start+k*step>100?start-step:start+k*step;
        if(nx<=100&&nx>0&&!st.lit.includes(nx)){st.wantN=nx;}else{st.lit=[step,step*2,step*3];st.wantN=step*4;}st.okN='Yes! '+st.wantN+'!';st.hintN='Count by '+step+'s: hop '+step+' more.';txt='Count by '+step+'s: *'+st.lit.join(', ')+'*, ___. Tap the next number.';}
      else if(r===3){st.step=pick([2,5,10]);st.ng=st.step===10?rnd(3,6):st.step===5?rnd(3,6):rnd(4,8);st.kind=pick(KS);st.view='groups';draw();const t=st.ng*st.step;st.ask={o:nearby(t,1,100).map(v=>v),ans:t,ok:'Yes! '+st.ng+' groups of '+st.step+' make '+t+'.'};txt='Count by *'+st.step+'s*. How many '+nm(st.kind,2)+' in all?';}
      else{const step=pick([1,2,5]);const st0=20;const seq=[20,20-step,20-2*step];st.view='chart';st.lit=seq;st.wantN=20-3*step;st.okN='Yes! '+st.wantN+'.';st.hintN='Count backward by '+step+'s.';txt='Count *backward* by '+step+'s: '+seq.join(', ')+', ___. Tap the next number.';}
      draw();st.setup=false;return txt;}};}
});

/* =========================================================
   Unit 13 · Money
   ========================================================= */
const COINS=[{k:'nickel',v:5,lab:'5¢',r:.21,c:'#cfd8dc',s:'5'},{k:'dime',v:10,lab:'10¢',r:.18,c:'#e0e0e0',s:'10'},{k:'quarter',v:25,lab:'25¢',r:.24,c:'#d7dde0',s:'25'},{k:'loonie',v:100,lab:'$1',r:.265,c:'#e0b84a',s:'1',sides:11},{k:'toonie',v:200,lab:'$2',r:.28,c:'#cfd8dc',s:'2',ring:'#e0b84a'}];
const CV=k=>COINS.find(c=>c.k===k);
function coinFace(c){const cv=document.createElement('canvas');cv.width=cv.height=256;const g=cv.getContext('2d');g.fillStyle=c.c;g.fillRect(0,0,256,256);if(c.ring){g.beginPath();g.arc(128,128,82,0,7);g.fillStyle=c.ring;g.fill();}
  g.strokeStyle='rgba(0,0,0,.25)';g.lineWidth=6;g.beginPath();g.arc(128,128,110,0,7);g.stroke();g.fillStyle='#37474f';g.font='700 '+(c.v>=100?96:84)+'px "Zilla Slab", Georgia, serif';g.textAlign='center';g.textBaseline='middle';g.fillText(c.v>=100?'$'+c.s:c.s,128,118);
  g.font='700 30px "Atkinson Hyperlegible", sans-serif';g.fillText(c.v>=100?(c.k==='loonie'?'DOLLAR':'DOLLARS'):'CENTS',128,192);const t=new THREE.CanvasTexture(cv);t.anisotropy=4;t.center.set(.5,.5);t.rotation=Math.PI/2;return t;}
function coin(k){const c=CV(k);const side=lam(c.ring?'#bfc5c9':c.c);const top=new THREE.MeshLambertMaterial({map:coinFace(c)});const m=mk(new THREE.CylinderGeometry(c.r,c.r,.05,c.sides||40),[side,top,side],c.sides?20:0);m.userData.coin=k;return m;}
function coin2d(g,k,x,y,s){const c=CV(k);const r=s*c.r/.28;g.beginPath();if(c.sides){for(let i=0;i<11;i++){const a=i*Math.PI*2/11-Math.PI/2;i?g.lineTo(x+Math.cos(a)*r,y+Math.sin(a)*r):g.moveTo(x+Math.cos(a)*r,y+Math.sin(a)*r);}g.closePath();}else g.arc(x,y,r,0,7);g.fillStyle=c.c;g.fill();g.strokeStyle='rgba(27,34,54,.45)';g.lineWidth=2;g.stroke();
  if(c.ring){g.beginPath();g.arc(x,y,r*.66,0,7);g.fillStyle=c.ring;g.fill();}T(g,c.lab,x,y+r*.25,ZS(Math.round(r*.62)),'#37474f','center');}
const PRICE=['ball','duck','kite','car','star','balloon','cupcake','block'];
P.lesson({id:'money1',title:'Money: Canadian coins',strand:'Financial Literacy',codes:['F1.1'],
 guide:{goal:'Name Canadian coins and their values, compare them by size and by value, find the value of a group of coins, and add and subtract small amounts.',words:'nickel, dime, quarter, loonie, toonie, cent, ¢, dollar, $, value, total, change',
  ask:['Which coin is smaller but worth more than a nickel?','How much are 3 nickels?','You pay 10¢ for a 7¢ sticker. What is your change?'],home:'Sort a handful of coins by kind. Count the nickels by 5s and the dimes by 10s.'},
 learn:[{say:'Meet the coins.',speech:'Meet the coins: nickel, dime, quarter, loonie and toonie. The dime is small, but it is worth more than the nickel!',view:'model',demo:'tour'}],
 fig:'Canadian coins, a toy shop and a price tag.',rz:.45,
 explore:['*Tap* a coin to hear its name and value.','Press *Shop* to buy a toy with coins.','Press *Size* and *Value* to put coins in order.'],
 howTo:'Tap the coin the question asks for, or tap coins to pay for a toy. Then tap the answer.',
 init:k=>({view:'all',ord:null,paid:[],price:8,toy:'duck',ask:null,sel:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=tbox(p,y-10,290,'Canadian coins');
  COINS.forEach((c,i)=>{const x=X0+90+i*155;coin2d(g,c.k,x,y+50,60);T(g,c.k,x,y+150,FT.bodyB,INK,'center');T(g,c.v>=100?c.lab:c.v+'¢',x,y+190,FT.bodyB,acc(),'center');});y+=230;
  y=tbox(p,y,190,'Size is not value!');coin2d(g,'dime',X0+70,y+40,60);T(g,'<',X0+120,y+56,ZS(40),GREY);coin2d(g,'nickel',X0+180,y+40,60);
  wrap(g,'The *dime* is *smaller* than the nickel, but it is worth *more*: 10¢ is more than 5¢.',X0+270,y+20,TW-290,34,{font:FT.body,bold:FT.bodyB,boldColor:acc()});y+=140;
  y=tbox(p,y,250,'Add for the total, subtract for the change');
  icon(g,'ball',X0+70,y+40,60);T(g,'5¢',X0+112,y+50,FT.bodyB);icon(g,'kite',X0+210,y+40,60);T(g,'3¢',X0+252,y+50,FT.bodyB);
  K.hand(g,'Buy both: 5¢ + 3¢ = 8¢ total',X0+330,y+40,'#16a36f');K.hand(g,'Pay 10¢ for the kite: 10¢ − 3¢ = 7¢ change',X0+30,y+130,'#e4572e');y+=190;
  y=exGrid(p,y,2,140,(i,x,yy,w,h)=>{
    if(i===0){[0,1,2].forEach(k=>coin2d(g,'nickel',x+80+k*60,yy+70,46));hand(g,'5, 10, 15 → 15¢',x+56,yy+128,INK);}
    if(i===1){coin2d(g,'dime',x+80,yy+70,46);coin2d(g,'nickel',x+140,yy+70,46);coin2d(g,'nickel',x+200,yy+70,46);hand(g,'10, 15, 20 → 20¢',x+56,yy+128,INK);}
  });
  y=keyWords(p,y,[['cent (¢)','a small amount of money; 100 cents make 1 dollar'],['change','the money you get back when you pay too much']]);return y;},
 readout(p,S,y){const g=p.g,st=S.st;let s='';if(st.view==='shop'){const t=st.paid.reduce((a,k)=>a+CV(k).v,0);s='Price '+st.price+'¢   ·   paid '+t+'¢';}else if(st.sel){const c=CV(st.sel);s=c.k+' = '+(c.v>=100?c.lab:c.v+'¢');}else if(st.view==='group'){s=st.grp.map(k=>CV(k).v+'¢').join(' + ');}
  if(s)T(g,s,X0,y+54,ZS(40),acc());return y+70;},
 build(S,grp,mode,game){const st=S.st;const g2=K.stage(grp);
  function draw(){clearGroup(g2);
    if(st.view==='all'||st.view==='pick'){const list=st.view==='pick'?st.pickList:(st.ord?st.ord:COINS.map(c=>c.k));list.forEach((k,i)=>{const m=coin(k);m.scale.setScalar(1.45);m.position.set((i-(list.length-1)/2)*.98,.05,-1.9);g2.add(m);K.tapOn(m,()=>tapCoin(k,i));
      if(st.view==='pick'&&st.letters){const L=tag('ABCDE'[i],{size:.22});L.position.set(0,.4/1.7,-.45);m.add(L);}if(st.sel===k){const L=tag(CV(k).k,{size:.18,bg:'#ffd54f'});L.position.set(0,.3,.5);m.add(L);}});}
    if(st.view==='group'){st.grp.forEach((k,i)=>{const m=coin(k);m.scale.setScalar(1.5);m.position.set((i-(st.grp.length-1)/2)*.75,.05,-1.9);g2.add(m);});}
    if(st.view==='shop'){const t=toy(st.toy,{s:2.2});t.position.set(-1.2,0,-2.4);g2.add(t);const pt=tag(st.price+'¢',{size:.36,bg:'#fff3c4',border:'#e09b00'});pt.position.set(-1.2,1.15,-2.4);g2.add(pt);
      ['nickel','dime'].forEach((k,i)=>{const m=coin(k);m.scale.setScalar(1.7);m.position.set(1.0+i*.9,.05,-2.6);g2.add(m);const L=tag('+ '+CV(k).lab,{size:.2});L.position.set(0,.3,.4);m.add(L);K.tapOn(m,()=>pay(k));});
      const tray=mk(new THREE.BoxGeometry(2.2,.04,.8),lam('#e8f5e9'),20);tray.position.set(1.05,.02,-1.4);g2.add(tray);st.paid.forEach((k,i)=>{const m=coin(k);m.scale.setScalar(1.2);m.position.set(.25+i*.42,.07,-1.4);g2.add(m);K.tapOn(m,()=>{st.paid.splice(i,1);draw();});});}
    A.redraw();}
  function tapCoin(k,i){A.pop();st.sel=k;const c=CV(k);A.say(c.k+'. '+(c.v>=100?(c.v/100)+(c.v>100?' dollars':' dollar'):c.v+' cents'));draw();
    if(mode==='play'&&!st.setup&&st.want){if(st.want(k,i))game.solved(st.wantOk);else A.bad(st.hint||'Look again!');}}
  function pay(k){const t=st.paid.reduce((a,q)=>a+CV(q).v,0)+CV(k).v;if(st.paid.length>=5){A.bad('That is lots of coins!');return;}st.paid.push(k);A.pop();draw();A.say(t+' cents');
    if(mode==='play'&&!st.setup&&st.needPay){if(t===st.price)A.later(()=>game.solved('Yes! '+st.paid.map(q=>CV(q).v+'¢').join(' + ')+' = '+st.price+'¢.'),300);else if(t>st.price){A.bad('Too much! Tap a coin in the tray to take it back.');}}}
  draw();
  return {info:()=>st.view+(st.sel||'')+st.paid.join(),
    controls:()=>{const c=[{t:'Coins',fn:()=>{st.view='all';st.ord=null;st.sel=null;draw();}},{t:'Size',fn:()=>{st.view='all';st.ord=COINS.slice().sort((a,b)=>a.r-b.r).map(c=>c.k);st.sel=null;draw();A.say('Smallest to biggest');}},{t:'Value',fn:()=>{st.view='all';st.ord=COINS.map(c=>c.k);st.sel=null;draw();A.say('Least to greatest value');}},
      {t:'Shop',go:true,fn:()=>{st.view='shop';st.toy=pick(PRICE);st.price=rnd(2,4)*5;st.paid=[];draw();}}];
      if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);return c;},
    demo(n){st.ask=null;st.want=null;st.needPay=false;
      if(n==='tour'){st.view='all';st.ord=null;st.sel=null;draw();A.seq(COINS.map(c=>[800,()=>{st.sel=c.k;draw();}]));}
      if(n==='all'){st.view='all';st.ord=null;st.sel=null;draw();}if(n==='size'){st.view='all';st.ord=['dime','nickel','quarter','loonie','toonie'];st.sel=null;draw();}
      if(n==='dn'){st.view='pick';st.pickList=['dime','nickel'];st.letters=false;st.sel=null;draw();}
      if(n==='g15'){st.view='group';st.grp=['nickel','nickel','nickel'];draw();}if(n==='g20'){st.view='group';st.grp=['dime','nickel','nickel'];draw();}
      if(n==='shop'){st.view='shop';st.toy='ball';st.price=5;st.paid=[];draw();}if(n==='shopkite'){st.view='shop';st.toy='kite';st.price=3;st.paid=['dime'];draw();}},
    task(r){st.setup=true;st.ask=null;st.want=null;st.needPay=false;st.sel=null;st.letters=false;let txt;
      if(r===0){const c=pick(COINS);st.view='pick';st.pickList=shuffle(COINS.map(c=>c.k));st.want=k=>k===c.k;st.wantOk='Yes! That is the '+c.k+'.';txt='Tap the *'+c.k+'*.';}
      else if(r===1){const pr=shuffle(COINS).slice(0,2);st.view='pick';st.pickList=pr.map(c=>c.k);const by=pick(['value','value','size']);const w=by==='value'?(pr[0].v>pr[1].v?pr[0]:pr[1]):(pr[0].r>pr[1].r?pr[0]:pr[1]);
        st.want=k=>k===w.k;st.wantOk='Yes! The '+w.k+' '+(by==='value'?'is worth more.':'is bigger.');st.hint=by==='value'?'Think about how much each coin is worth, not how big it is.':'Look at the size.';txt=by==='value'?'Tap the coin with the *greater value*.':'Tap the *bigger* coin.';}
      else if(r===2){const g=shuffle(['nickel','nickel','dime','dime','nickel']).slice(0,rnd(2,3));st.view='group';st.grp=g.sort((a,b)=>CV(b).v-CV(a).v);const t=g.reduce((a,k)=>a+CV(k).v,0);st.ask={o:nearby(t/5,1,6).map(v=>v*5+'¢'),ans:t+'¢',ok:'Yes! '+st.grp.map(k=>CV(k).v+'¢').join(' + ')+' = '+t+'¢.'};txt='How much money is this? Count the dimes by 10s, then the nickels by 5s.';}
      else if(r===3){st.view='shop';st.toy=pick(PRICE);st.price=pick([10,15,20]);st.paid=[];st.needPay=true;txt='The '+st.toy+' costs *'+st.price+'¢*. Tap the coins to pay exactly '+st.price+'¢.';}
      else{st.view='shop';st.toy=pick(PRICE);st.price=rnd(2,8);st.paid=['dime'];st.ask={o:nearby(10-st.price,1,9).map(v=>v+'¢'),ans:(10-st.price)+'¢',ok:'Yes! 10¢ − '+st.price+'¢ = '+(10-st.price)+'¢ change.'};txt='You pay with a *dime* (10¢) for a '+st.price+'¢ '+st.toy+'. What is your *change*?';}
      draw();st.setup=false;return txt;}};}
});
Object.assign(K,{chart,chart2d,chartTex,rods,coin,coin2d});
})();
