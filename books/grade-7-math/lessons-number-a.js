/* The Interactive Classroom: Grade 7 Math — Number, part A (lessons 1–7) */
(function(){
"use strict";
const P=window.PM;if(!P||P.failed||!P.THREE)return;
const {THREE,V,W,D,PY,PX,X0,TW,INK,RED,BLUE,GREY,VIBE,FT,ZS,G,M,lam,mk,unitBox,cellMat,label,starGeo,wedgeGeo,clearGroup,disposeObj,rr,T,wrap,para,header,keyWords,predict,box,caption,cxOf,cyOf,tint,moveTo,hop,tween,burst,easeOut,easeIO,A}=P;
const acc=()=>P.ACC;
const rnd=(a,b)=>a+Math.floor(Math.random()*(b-a+1)),pick=a=>a[Math.floor(Math.random()*a.length)],shuffle=a=>a.slice().sort(()=>Math.random()-.5);
const sp=s=>s.replace(/\B(?=(\d{3})+(?!\d))/g,' ');
const fmt=n=>{const neg=n<0;const s=String(Math.abs(n));const [i,f]=s.split('.');return (neg?'−':'')+(i.length>=5?sp(i):i)+(f!=null?'.'+f:'');};
const gcd=(a,b)=>b?gcd(b,a%b):Math.abs(a);
const sgn=v=>v<0?'−'+fmt(-v):fmt(v);
function choices(game,list,ans,ok,lab){return list.map(o=>({t:lab?lab(o):String(o),big:true,fn:()=>{if(o===ans){if(game)game.solved(ok);else A.good(ok);}else A.bad('Not quite. Try again!');}}));}
function opts(ans,spread,min){const s=new Set([ans]);let k=0;while(s.size<3&&k<60){k++;const v=Math.round((ans+pick(spread))*1000)/1000;if(v>=(min==null?-1e9:min))s.add(v);}return shuffle([...s]);}
function digitMat(t,bg,fg){return M('d7g'+t+bg,()=>{const c=document.createElement('canvas');c.width=c.height=128;const g=c.getContext('2d');g.fillStyle=bg;g.fillRect(0,0,128,128);
  g.strokeStyle='rgba(27,34,54,.25)';g.lineWidth=6;g.strokeRect(3,3,122,122);g.fillStyle=fg||'#1b2236';g.font='700 84px "Zilla Slab", Georgia, serif';g.textAlign='center';g.textBaseline='middle';g.fillText(t,64,70);
  const tx=new THREE.CanvasTexture(c);tx.anisotropy=4;return new THREE.MeshLambertMaterial({map:tx});});}
function digitCube(t,bg,s,fg){const geo=G('d7cube'+s,()=>new THREE.BoxGeometry(s,s,s));const side=lam(bg),m=digitMat(t,bg,fg);return mk(geo,[side,side,m,side,m,side],20);}
const SUP=['⁰','¹','²','³','⁴','⁵','⁶','⁷','⁸','⁹'];const pw=k=>'10'+SUP[k];

/* =========================================================
   1. Numbers to one billion and powers of ten
   ========================================================= */
const PCOL=['#e89a00','#e4572e','#2f7de1','#16a36f','#8b5cf6','#c2410c','#0fa5a5','#ea580c','#4f46e5','#1b2236'];
P.lesson({id:'billion7',title:'Numbers to one billion',strand:'Number',codes:['B1.1'],
 guide:{goal:'Represent and compare whole numbers up to one billion, including in expanded form using powers of ten, and describe how such numbers are used in everyday life.',words:'billion, million, power of ten, exponent, expanded form, period',
  ask:['How many millions make one billion?','What does 4 × 10⁶ mean?','How do you compare 45 600 000 and 456 000 000?'],home:'Look up big numbers in the news: Canada’s population, a city budget, the distance to the Sun. Write one in expanded form with powers of ten.'},
 learn:[{say:'Each place is a power of ten.',speech:'Every place value is a power of ten. Ten to the zero is one, ten to the third is one thousand, ten to the sixth is one million, and ten to the ninth is one billion. Tariq’s country has forty-five million, three hundred thousand people. Watch the towers build it.',view:'model',demo:'build'},
        {say:'Read about expanded form with powers.',speech:'Forty-five million, three hundred thousand is four times ten to the seventh, plus five times ten to the sixth, plus three times ten to the fifth.',view:'read'},
        {say:'Watch: one billion.',speech:'One thousand millions make one billion: a one followed by nine zeros. Watch the billions tower light up.',view:'model',demo:'billion'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: build with powers.',speech:'Your turn. Tap a tower to add one to that digit. Watch the standard and expanded forms.',view:'model'}],
 fig:'Digit towers for each power of ten, from 10⁰ to 10⁹.',rz:.35,
 explore:['*Tap a tower* to raise its digit (9 goes back to 0).','Read the *standard form* and the *powers of ten*.','Press *Clear* to start again.'],
 howTo:'Read the number, then tap the towers until the digits match.',
 init:k=>({d:[0,0,0,0,0,3,5,4,0,0]}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'Each place value is a *power of ten*. The *exponent* tells how many tens are multiplied: 10³ = 10 × 10 × 10 = 1000.')+14;
  [['10⁹','1 000 000 000','one billion'],['10⁶','1 000 000','one million'],['10³','1000','one thousand'],['10⁰','1','one']].forEach(([a,b,c],i)=>{rr(g,X0,y+i*52,TW,46,12);g.fillStyle=tint(acc(),.06+i*.03);g.fill();T(g,a,X0+20,y+i*52+33,ZS(30),acc());T(g,b,X0+150,y+i*52+33,FT.bodyB);T(g,c,X0+TW-20,y+i*52+33,FT.body,GREY,'right');});y+=226;
  T(g,'45 300 000',X0,y+20,ZS(48),acc());y+=40;T(g,'= 4 × 10⁷ + 5 × 10⁶ + 3 × 10⁵',X0,y+20,FT.bodyB);y+=56;
  y=para(p,y,'To *compare*, count the digits first, then compare place by place: *456 000 000 > 45 600 000*.')+10;
  y=keyWords(p,y,[['power of ten','10 multiplied by itself, like 10⁴'],['exponent','the small raised number: how many times to multiply']]);
  predict(p,y,S,'p1','Write 2 × 10⁹ + 7 × 10⁶ in standard form.','*2 007 000 000.* Two billion seven million.');},
 readout(p,S,y){const g=p.g,st=S.st,n=val(st.d);T(g,fmt(n),X0,y+50,ZS(50),acc());wrap(g,exp(st.d)||'0',X0,y+92,TW,30,{font:FT.bodyB});return y+130;},
 build(S,grp,mode,game){const st=S.st,u=.13,xs=k=>2.0-k*.44;const tw=new THREE.Group();grp.add(tw);
  for(let k=0;k<10;k++){const pad=mk(new THREE.BoxGeometry(.38,.03,.38),lam(tint(PCOL[k],.3)),20);pad.position.set(xs(k),.015,-1.7);grp.add(pad);A.drag(pad,{tap:()=>inc(k)});const l=label(pw(k),{size:.17,color:PCOL[k]});l.position.set(xs(k),.15,-1.3);grp.add(l);}
  [[1,'ones'],[4,'thousands'],[7,'millions'],[9,'billion']].forEach(([k,t])=>{const l=label(t,{size:.14,color:GREY});l.position.set(xs(k),.15,-1.08);grp.add(l);});
  const tot=label('',{size:.32,bg:'#ffffff'});tot.position.set(0,1.95,-2.2);grp.add(tot);
  function draw(){clearGroup(tw);st.d.forEach((dg,k)=>{for(let i=0;i<dg;i++){const c=unitBox(1,1,1,PCOL[k],u*2.2);c.position.set(xs(k),.03+u*1.1+i*u*2.2*.62,-1.7);c.scale.y=.6;tw.add(c);A.drag(c,{tap:()=>inc(k)});}
      const top=digitCube(String(dg),'#ffffff',.3);top.position.set(xs(k),.25+dg*u*2.2*.62,-1.7);tw.add(top);A.drag(top,{tap:()=>inc(k)});});tot.userData.set(fmt(val(st.d)));check();A.redraw();}
  function inc(k){if(k===9){st.d=st.d[9]?[0,0,0,0,0,0,0,0,0,0]:[0,0,0,0,0,0,0,0,0,1];A.pop();draw();return;}if(st.d[9]){A.bad('One billion is the biggest number here.');return;}st.d[k]=(st.d[k]+1)%10;A.pop();draw();}
  function check(){if(mode==='play'&&!st.setup&&st.target!=null&&val(st.d)===st.target)game.solved('Yes! '+fmt(st.target)+'.');}
  draw();
  return {info:()=>fmt(val(st.d)),
    controls:()=>{if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok);return [{t:'Clear',fn:()=>{st.d=[0,0,0,0,0,0,0,0,0,0];draw();}}];},
    demo(n){st.ask=null;st.target=null;if(n==='build'){st.d=[0,0,0,0,0,0,0,0,0,0];draw();const seq=[];for(let i=0;i<4;i++)seq.push([300,()=>inc(7)]);for(let i=0;i<5;i++)seq.push([300,()=>inc(6)]);for(let i=0;i<3;i++)seq.push([300,()=>inc(5)]);seq.push([700,()=>A.say('45 300 000')]);A.seq(seq);}
      if(n==='billion'){st.d=[0,0,0,0,0,0,9,9,9,0];draw();A.seq([[900,()=>inc(9)],[800,()=>A.say('1 000 000 000 = 10⁹')]]);}},
    task(r){st.setup=true;st.ask=null;st.target=null;st.d=[0,0,0,0,0,0,0,0,0,0];let txt;
      if(r===0){const a=rnd(1,9),b=rnd(1,9),c=rnd(1,9);st.target=a*1e8+b*1e6+c*1e3;txt='Build *'+a+' × 10⁸ + '+b+' × 10⁶ + '+c+' × 10³*.';}
      else if(r===1){const m=rnd(12,98);st.target=m*1e6;txt='Build *'+m+' million*.';}
      else if(r===2){const m=rnd(2,9),h=rnd(1,9);st.target=m*1e6+h*1e5;txt='Build *'+m+'.'+h+' million*.';}
      else if(r===3){st.target=1e9;txt='Build *one billion*.';}
      else{const a=rnd(12,98)*1e6,b=a*10+rnd(1,9)*1e5;st.ask={ans:fmt(b),o:shuffle([fmt(a),fmt(b)]),ok:'Yes! '+fmt(b)+' has more digits.'};txt='Which is *greater*?';}
      draw();st.setup=false;return txt;}};}
});
function val(d){return d.reduce((a,v,k)=>a+v*Math.pow(10,k),0);}
function exp(d){return d.map((v,k)=>v?v+' × '+pw(k):null).filter(Boolean).reverse().join(' + ');}

/* =========================================================
   2. Perfect squares and square roots
   ========================================================= */
P.lesson({id:'squares7',title:'Perfect squares and square roots',strand:'Number',codes:['B1.2'],
 guide:{goal:'Identify and represent perfect squares, and determine their square roots, in various contexts.',words:'perfect square, square root, √, side length, area, squared',
  ask:['Why is 36 called a perfect square?','What is √64? How do you know?','Can 50 tiles make a square with no tiles left over?'],home:'Arrange coins or LEGO into squares: 4, 9, 16, 25… What do you notice about the side lengths?'},
 learn:[{say:'Squares from tiles.',speech:'A perfect square is a number of tiles that makes a square. Watch Maya’s squares grow: one, four, nine, sixteen, twenty-five. Each is a side length times itself.',view:'model',demo:'grow'},
        {say:'Read about square roots.',speech:'The square root of a perfect square is its side length. The square root of forty-nine is seven, because seven times seven is forty-nine.',view:'read'},
        {say:'Watch: not a perfect square.',speech:'Can forty tiles make a square? Six by six uses thirty-six, with four left over. Seven by seven needs forty-nine. So forty is not a perfect square.',view:'model',demo:'not'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: make squares.',speech:'Your turn. Change the side length and see if the tiles make a perfect square.',view:'model'}],
 fig:'Tiles arranged in a square. The side length is the square root.',rz:.35,
 explore:['Change the *side length* with the buttons.','Gold tiles are needed; grey are left over.','A perfect square uses *every* tile.'],
 howTo:'Change the side length until the tiles make a perfect square, or choose the answer.',
 init:k=>({N:36,s:6,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'A *perfect square* is a number that is a whole number times itself. Its *square root* (√) is that whole number.')+16;
  [1,2,3,4,5].forEach((s,i)=>{const t=20,ox=X0+[0,40,110,210,340][i];for(let r=0;r<s;r++)for(let c=0;c<s;c++){g.fillStyle=VIBE[i];g.fillRect(ox+c*t,y+(5-s)*t+r*t,t-2,t-2);}T(g,String(s*s),ox+s*t/2,y+5*t+30,FT.bodyB,INK,'center');});y+=150;
  T(g,'7 × 7 = 49, so √49 = 7',X0,y+20,ZS(40),acc());y+=60;
  rr(g,X0,y,TW,96,14);g.fillStyle=tint(acc(),.1);g.fill();T(g,'1  4  9  16  25  36  49  64  81  100  121  144',X0+20,y+40,FT.bodyB);T(g,'the perfect squares to 144',X0+20,y+76,FT.small,GREY);y+=124;
  y=keyWords(p,y,[['perfect square','a number made by multiplying a whole number by itself'],['square root','the number that was squared: √81 = 9']]);
  predict(p,y,S,'p2','A square garden has an area of 64 m². How long is each side?','*8 m.* √64 = 8.');},
 readout(p,S,y){const g=p.g,st=S.st,s2=st.s*st.s;T(g,st.s+' × '+st.s+' = '+s2,X0,y+50,ZS(50),acc());T(g,s2===st.N?'√'+st.N+' = '+st.s+': a perfect square!':s2<st.N?(st.N-s2)+' tiles left over':'need '+(s2-st.N)+' more tiles',X0,y+92,FT.bodyB,s2===st.N?'#16a36f':INK);return y+100;},
 build(S,grp,mode,game){const st=S.st,u=.21;const tiles=new THREE.Group();grp.add(tiles);const tl=label('',{size:.3,bg:'#ffffff'});tl.position.set(1.7,1.0,-2.4);grp.add(tl);
  function draw(drop){clearGroup(tiles);const s=st.s,s2=s*s;let k=0;for(let r=0;r<s;r++)for(let c=0;c<s;c++){const has=k<st.N;const m=mk(G('sq7',()=>new THREE.BoxGeometry(u*.9,.07,u*.9)),lam(has?'#f2c14e':'#ffffff'),20);
      if(!has){m.material=new THREE.MeshLambertMaterial({color:'#cbd5e1',transparent:true,opacity:.4});}const p=V(-2.15+(c+.5)*u,.04,-3.0+(r+.5)*u);m.position.copy(p);if(drop&&has){m.position.y+=.4+k*.004;moveTo(m,{pos:p,k:12});}tiles.add(m);k++;}
    for(;k<st.N;k++){const i=k-s2;const m=mk(G('sq7',()=>new THREE.BoxGeometry(u*.9,.07,u*.9)),lam('#94a3b8'),20);m.position.set(.9+(i%5)*u,.04,-.9+Math.floor(i/5)*u*-1);tiles.add(m);}
    tl.userData.set(st.N+' tiles');check();A.redraw();}
  function setS(s){s=Math.max(1,Math.min(12,s));if(s===st.s)return;st.s=s;A.pop();draw(true);}
  function check(){if(mode==='play'&&!st.setup&&st.needRoot&&st.s*st.s===st.N)game.solved('√'+st.N+' = '+st.s+'!');}
  draw(false);
  return {info:()=>st.s+' × '+st.s,
    controls:()=>{const c=[{t:'side −',fn:()=>setS(st.s-1)},{t:'side +',big:true,go:true,fn:()=>setS(st.s+1)}];if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);
      return mode==='learn'?c.concat([{t:'tiles −',fn:()=>{st.N=Math.max(1,st.N-1);draw(false);}},{t:'tiles +',fn:()=>{st.N=Math.min(144,st.N+1);draw(false);}}]):c;},
    demo(n){st.ask=null;st.needRoot=false;if(n==='grow'){st.N=25;st.s=1;draw(false);st.N=1;draw(false);const l=[];for(let s=2;s<=5;s++)l.push([700,()=>{st.N=s*s;setS(s);A.say(s+' × '+s+' = '+s*s);}]);A.seq(l);}
      if(n==='not'){st.N=40;st.s=5;draw(false);A.seq([[800,()=>setS(6)],[1200,()=>setS(7)],[900,()=>A.say('40 is not a perfect square.')]]);}},
    task(r){st.setup=true;st.ask=null;st.needRoot=false;st.s=1;let txt;
      if(r===0||r===2){const s=r===0?rnd(6,9):rnd(10,12);st.N=s*s;st.needRoot=true;txt='Find *√'+st.N+'*: make a square with all '+st.N+' tiles.';}
      else if(r===1){const s=rnd(5,9),N=pick([s*s,s*s+rnd(1,s)]);st.N=N;const ans=Math.sqrt(N)%1===0?'Yes':'No';st.ask={ans,o:['Yes','No'],ok:ans==='Yes'?'Yes! '+N+' = '+Math.sqrt(N)+' × '+Math.sqrt(N)+'.':'Right! '+N+' tiles leave some over.'};txt='Is *'+N+'* a perfect square? Try side lengths.';}
      else if(r===3){st.N=1;const s=rnd(4,9);const a=s*s;st.ask={ans:a,o:shuffle([a,a+2,a-3]),ok:'Yes! '+s+' × '+s+' = '+a+'.'};txt='Which number is a *perfect square*?';}
      else{const s=rnd(6,11);st.N=s*s;st.needRoot=true;txt='A square patio has an area of *'+s*s+' m²*. Find the side length.';}
      draw(false);st.setup=false;return txt;}};}
});

/* =========================================================
   3. Rational numbers: compare, order, between, round
   ========================================================= */
P.lesson({id:'rational7',title:'Rational numbers on the number line',strand:'Number',codes:['B1.3','B1.5','B1.6'],
 guide:{goal:'Read, represent, compare and order rational numbers, including negative fractions and decimals to thousandths; generate numbers between any two quantities; and round decimals as needed.',words:'rational number, negative fraction, opposite, between, density, round',
  ask:['Which is greater, −3/4 or −0.7?','Name a number between 0.25 and 0.26.','Is there always another number between two numbers?'],home:'Name a temperature between −2.5 °C and −2.4 °C. Then find one between those two!'},
 learn:[{say:'Every rational number has a place.',speech:'A rational number can be written as a fraction. It can be positive or negative. Watch Liam’s cards find their places: negative one point two five, negative three quarters, two fifths and one point five.',view:'model',demo:'order'},
        {say:'Read about numbers between.',speech:'Between any two rational numbers, there is always another one. Between zero point two five and zero point two six is zero point two five five. Zoom in and there are always more.',view:'read'},
        {say:'Watch: zoom in between.',speech:'Zoom in between zero point two and zero point three. Ten new tick marks appear: zero point two one, zero point two two, and so on. We can keep zooming forever.',view:'model',demo:'zoom'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: order and find between.',speech:'Your turn. Tap the cards from least to greatest, or zoom in and tap a number between two others.',view:'model'}],
 fig:'Rational numbers on a number line, with a zoom lens.',rz:.35,
 explore:['*Tap the cards* from least to greatest.','Press *Zoom* to see numbers between.','Tap a tick to choose a number between.'],
 howTo:'Order the cards, or zoom in and tap a number between the two given numbers.',
 init:k=>({items:[{v:-1.25,t:'−1.25'},{v:-.75,t:'−3/4'},{v:.4,t:'2/5'},{v:1.5,t:'1.5'}],placed:[],zoom:null,pick:null,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'*Rational numbers* include integers, fractions and decimals, both positive and negative. On a number line, *left is less*.')+16;
  const lx=X0+20,lw=TW-40,toX=v=>lx+(v+2)/4*lw;g.strokeStyle=INK;g.lineWidth=4;g.beginPath();g.moveTo(lx,y+60);g.lineTo(lx+lw,y+60);g.stroke();
  for(let v=-2;v<=2;v++){g.beginPath();g.moveTo(toX(v),y+46);g.lineTo(toX(v),y+74);g.stroke();T(g,sgn(v),toX(v),y+104,FT.bodyB,v<0?'#2563eb':INK,'center');}
  [[-1.25,'−1.25'],[-.75,'−3/4'],[.4,'2/5'],[1.5,'1.5']].forEach(([v,t],i)=>{g.beginPath();g.arc(toX(v),y+60,10,0,Math.PI*2);g.fillStyle=VIBE[i];g.fill();T(g,t,toX(v),y+30,FT.smallB,VIBE[i],'center');});y+=130;
  rr(g,X0,y,TW,120,14);g.fillStyle=tint(acc(),.1);g.fill();T(g,'Between 0.25 and 0.26?',X0+20,y+40,FT.smallB);T(g,'0.251, 0.255, 0.2599…',X0+20,y+84,ZS(34),acc());y+=146;
  y=para(p,y,'*Round* to the place that fits the situation: −2.468 °C ≈ −2.5 °C to the nearest tenth.')+10;
  y=keyWords(p,y,[['rational number','a number that can be written as a fraction of integers'],['density','there is always another number between any two']]);
  predict(p,y,S,'p3','Which is greater: −2/3 or −0.6?','*−0.6.* −2/3 ≈ −0.667 is further left.');},
 readout(p,S,y){const g=p.g,st=S.st;if(st.zoom){T(g,'Between '+st.zoom[0]+' and '+st.zoom[1]+(st.pick!=null?':  '+st.pick:''),X0,y+46,ZS(36),acc());return y+70;}
  const srt=st.items.slice().sort((a,b)=>a.v-b.v);T(g,st.placed.length===st.items.length?srt.map(q=>q.t).join(' < '):'Placed '+st.placed.length+' of '+st.items.length,X0,y+46,ZS(38),acc());return y+70;},
 build(S,grp,mode,game){const st=S.st,x0=-2.1,L=1.05,Zl=-.7;const lineG=new THREE.Group(),cards=new THREE.Group(),zg=new THREE.Group();grp.add(lineG,cards,zg);
  function main(){clearGroup(lineG);const tr=mk(new THREE.BoxGeometry(4.3,.05,.12),lam('#cbd5e6'),0);tr.position.set(0,.03,Zl);lineG.add(tr);for(let k=-8;k<=8;k++){const big=k%4===0;const t=new THREE.Mesh(G('r7t'+big,()=>new THREE.BoxGeometry(.016,big?.22:.1,.016)),lam(INK));t.position.set(k/4*L,.05+(big?.11:.05),Zl);lineG.add(t);if(big){const l=label(sgn(k/4),{size:.24,color:k<0?'#2563eb':INK});l.position.set(k/4*L,.42,Zl+.28);lineG.add(l);}}}
  function draw(){clearGroup(cards);clearGroup(zg);if(st.zoom){drawZoom();return;}const n=st.items.length;st.items.forEach((q,i)=>{const c=new THREE.Group();const b=mk(G('rc7',()=>new THREE.BoxGeometry(.9,.1,.48)),lam('#ffffff'),20);b.position.y=.05;c.add(b);const e=mk(G('rc7e',()=>new THREE.BoxGeometry(.95,.06,.53)),lam(VIBE[i%6]),0);e.position.y=.02;c.add(e);
      const l=label(q.t,{size:.28,color:VIBE[i%6]});l.position.y=.36;c.add(l);if(st.placed.includes(i)){c.position.set(q.v*L,0,Zl-.05);c.scale.setScalar(.58);}else c.position.set((i-(n-1)/2)*1.05,0,.1);cards.add(c);A.drag(c,{tap:()=>tapC(i)});});A.redraw();}
  function drawZoom(){const [a,b]=st.zoom;const av=+a,bv=+b;const lx=-1.9,lw=3.8,z=-2.3;const tr=mk(new THREE.BoxGeometry(lw+.1,.05,.12),lam('#fde68a'),0);tr.position.set(0,.03,z);zg.add(tr);
    const lens=mk(new THREE.TorusGeometry(.35,.04,8,24),lam('#f59e0b'),0);lens.rotation.x=Math.PI/2;lens.position.set(((av+bv)/2)*L,.1,Zl);zg.add(lens);[[av,lx],[bv,lx+lw]].forEach(([v,x])=>{zg.add(seg(V(v*L,.1,Zl),V(x,.1,z),'#f59e0b'));});
    for(let k=0;k<=10;k++){const v=Math.round((av+(bv-av)*k/10)*100000)/100000;const big=k===0||k===10;const t=mk(G('z7t'+big,()=>new THREE.CylinderGeometry(big?.05:.07,big?.05:.07,.06,14)),lam(big?INK:(st.pick===String(v)?'#16a36f':'#ffffff')),20);t.position.set(lx+lw*k/10,.08,z);zg.add(t);
      if(!big)A.drag(t,{tap:()=>{st.pick=String(v);A.pop();draw();if(mode==='play'&&!st.setup&&st.wantZ)game.solved(v+' is between '+a+' and '+b+'!');}});const l=label(String(v),{size:big?.2:.13,color:big?INK:GREY});l.position.set(lx+lw*k/10,.3,z+(k%2?.32:.22));zg.add(l);}A.redraw();}
  function seg(a,b,col){const len=a.distanceTo(b);const m=new THREE.Mesh(new THREE.CylinderGeometry(.01,.01,len,6),lam(col));m.position.copy(a).add(b).multiplyScalar(.5);m.quaternion.setFromUnitVectors(V(0,1,0),b.clone().sub(a).normalize());return m;}
  const order=()=>st.items.map((q,i)=>i).sort((a,b)=>st.items[a].v-st.items[b].v);
  function tapC(i){if(st.zoom||st.placed.includes(i))return;const ord=order();if(i!==ord[st.placed.length]){A.bad('Not yet. Find the least number left.');return;}st.placed.push(i);A.pop();draw();if(st.placed.length===st.items.length){A.good(ord.map(k=>st.items[k].t).join(' < '));if(mode==='play'&&!st.setup&&!st.ask)game.solved('Great ordering!');}}
  const POOL=[[-1.75,'−1 3/4'],[-1.5,'−1.5'],[-1.25,'−1.25'],[-1,'−1'],[-.75,'−3/4'],[-.6,'−0.6'],[-.5,'−1/2'],[-.125,'−0.125'],[.2,'1/5'],[.375,'0.375'],[.4,'2/5'],[.5,'0.5'],[.75,'3/4'],[.8,'0.8'],[1.25,'1 1/4'],[1.5,'1.5'],[1.875,'1.875'],[-1.6,'−8/5']];
  function fresh(k){let s;for(let t=0;t<200;t++){s=shuffle(POOL).slice(0,k);const v=s.map(q=>q[0]).sort((a,b)=>a-b);if(v.some((x,i)=>i&&x-v[i-1]<.1))continue;break;}return s.map(([v,t])=>({v,t}));}
  main();draw();
  return {info:()=>st.zoom?'Tap a number between':'Tap least to greatest',
    controls:()=>{if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok);
      return mode==='learn'?[{t:'New cards',fn:()=>{st.zoom=null;st.items=fresh(4);st.placed=[];draw();}},{t:'Zoom 0.2 – 0.3',fn:()=>{st.zoom=['0.2','0.3'];st.pick=null;draw();}},{t:'Zoom 0.25 – 0.26',fn:()=>{st.zoom=['0.25','0.26'];st.pick=null;draw();}},{t:'Back',fn:()=>{st.zoom=null;draw();}}]:[{t:'Start over',fn:()=>{st.placed=[];draw();}}];},
    demo(n){st.ask=null;if(n==='order'){st.zoom=null;st.items=[{v:.4,t:'2/5'},{v:-1.25,t:'−1.25'},{v:1.5,t:'1.5'},{v:-.75,t:'−3/4'}];st.placed=[];draw();const ord=order();A.seq(ord.map(i=>[800,()=>tapC(i)]));}
      if(n==='zoom'){st.zoom=['0.2','0.3'];st.pick=null;draw();A.seq([[1200,()=>{st.pick='0.25';draw();A.say('0.25 is between 0.2 and 0.3');}],[1500,()=>{st.zoom=['0.25','0.26'];st.pick=null;draw();A.say('Zoom again: 0.251, 0.252…');}]]);}},
    task(r){st.setup=true;st.ask=null;st.wantZ=false;st.placed=[];st.zoom=null;let txt;
      if(r===0){st.items=fresh(4);txt='Order these rational numbers from *least to greatest*.';}
      else if(r===1){st.items=fresh(3).map(q=>q.v>0?{v:-q.v,t:'−'+q.t}:q);txt='Order these *negative* numbers from least to greatest.';}
      else if(r===2){const a=rnd(1,8)/10;st.zoom=[a.toFixed(1),(a+.1).toFixed(1)];st.pick=null;st.wantZ=true;txt='Tap a number *between '+st.zoom[0]+' and '+st.zoom[1]+'*.';}
      else if(r===3){const a=rnd(11,89)/100;st.zoom=[a.toFixed(2),(a+.01).toFixed(2)];st.pick=null;st.wantZ=true;txt='Tap a number *between '+st.zoom[0]+' and '+st.zoom[1]+'*.';}
      else{st.items=fresh(2);const v=-(rnd(1100,2900)/1000);const ans=(Math.round(v*10)/10).toFixed(1);st.ask={ans:'−'+ans.replace('-',''),o:shuffle(['−'+ans.replace('-',''),'−'+(Math.abs(+ans)+.1).toFixed(1),'−'+Math.abs(v).toFixed(2)]).filter((x,i,a)=>a.indexOf(x)===i),ok:'Yes! '+sgn(v)+' ≈ '+'−'+ans.replace('-','')+'.'};txt='Round *'+sgn(v)+' °C* to the nearest *tenth*.';}
      draw();st.setup=false;return txt;}};}
});

/* =========================================================
   4. Simplifying fractions
   ========================================================= */
P.lesson({id:'simplify7',title:'Simplifying fractions',strand:'Number',codes:['B1.4'],
 guide:{goal:'Use equivalent fractions and common factors to simplify fractions when appropriate.',words:'simplify, lowest terms, common factor, greatest common factor, equivalent fraction',
  ask:['How does grouping pieces show that 6/8 = 3/4?','How do you know 9/16 is already in lowest terms?','When is it NOT helpful to simplify?'],home:'Cut a pizza into 8 slices and eat 4. Talk about why 4/8 and 1/2 mean the same amount.'},
 learn:[{say:'Group the pieces.',speech:'Ines has six eighths. Group the pieces in twos: the eight pieces become four groups, and the six shaded pieces become three groups. Six eighths equals three quarters.',view:'model',demo:'group'},
        {say:'Read about lowest terms.',speech:'To simplify, divide the numerator and the denominator by a common factor. Use the greatest common factor to get to lowest terms in one step.',view:'read'},
        {say:'Watch: twelve sixteenths.',speech:'Twelve sixteenths. Group by two: six eighths. Group by two again: three quarters. Or group by four at once.',view:'model',demo:'twice'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: group and simplify.',speech:'Your turn. Choose a group size that fits both the shaded and the total pieces.',view:'model'}],
 fig:'A fraction bar whose pieces join into bigger groups.',rz:-.1,
 explore:['Choose a *group size* that divides both numbers.','Groups that do not fit both will not work.','Lowest terms: no group size bigger than 1 fits.'],
 howTo:'Group the pieces until the fraction is in lowest terms.',
 init:k=>({n:6,d:8,k:1}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'A fraction is in *lowest terms* when the numerator and denominator have no common factor except 1.')+16;
  const bw=TW-200,bar=(n,d,yy,lab)=>{for(let i=0;i<d;i++){rr(g,X0+i*bw/d+1,yy,bw/d-2,44,6);g.fillStyle=i<n?'#2f7de1':'#e9eef7';g.fill();}T(g,lab,X0+bw+24,yy+32,FT.bodyB,acc());};
  bar(6,8,y,'6/8');T(g,'÷ 2',X0+bw/2,y+70,FT.hand,BLUE,'center');bar(3,4,y+84,'3/4');y+=160;
  T(g,'12/16 = (12 ÷ 4)/(16 ÷ 4) = 3/4',X0,y+20,ZS(38),acc());y+=60;
  y=para(p,y,'The *greatest common factor* (GCF) of 12 and 16 is 4, so dividing by 4 simplifies in one step. *9/16* is already in lowest terms: 9 and 16 share no factor but 1.')+12;
  y=keyWords(p,y,[['simplify','write an equivalent fraction with smaller numbers'],['lowest terms','numerator and denominator share no common factor but 1']]);
  predict(p,y,S,'p4','Simplify 15/20.','*3/4.* Divide both by 5.');},
 readout(p,S,y){const g=p.g,st=S.st,n=st.n/st.k,d=st.d/st.k;T(g,st.n+'/'+st.d+(st.k>1?' = '+n+'/'+d:''),X0,y+50,ZS(50),acc());T(g,gcd(n,d)===1?'Lowest terms!':'Can still simplify: try a group of '+[2,3,5,7].find(f=>n%f===0&&d%f===0),X0,y+92,FT.bodyB,gcd(n,d)===1?'#16a36f':INK);return y+100;},
 build(S,grp,mode,game){const st=S.st,L=4.0,x0=-2.0,Z=-1.9;const bar=new THREE.Group();grp.add(bar);
  function draw(anim){clearGroup(bar);const w=L/st.d;for(let i=0;i<st.d;i++){const grpI=Math.floor(i/st.k);const m=mk(G('s7p'+st.d,()=>new THREE.BoxGeometry(w-.02,.3,.7)),lam(i<st.n?(grpI%2?'#2f7de1':'#5b9df0'):(grpI%2?'#e2e8f0':'#f1f5f9')),20);m.position.set(x0+(i+.5)*w,.15,Z);bar.add(m);}
    const gw=L/(st.d/st.k);for(let j=0;j<=st.d/st.k;j++){const t=mk(G('s7g',()=>new THREE.BoxGeometry(.035,.5,.85)),lam(INK),0);t.position.set(x0+j*gw,.25,Z);bar.add(t);}
    const l=label(st.n/st.k+'/'+st.d/st.k,{size:.4,bg:'#ffffff'});l.position.set(0,1.2,Z);bar.add(l);if(anim){bar.children.forEach((m,i)=>{const p=m.position.clone();m.position.y+=.3;moveTo(m,{pos:p,k:8+i*.1});});}check();A.redraw();}
  function group(k){if(st.n%k||st.d%k){A.bad('Groups of '+k+' do not fit both '+st.n+' and '+st.d+'.');return;}if(k===st.k)return;st.k=k;A.pop();A.say(st.n+'/'+st.d+' = '+st.n/k+'/'+st.d/k);draw(true);}
  function check(){if(mode==='play'&&!st.setup&&gcd(st.n/st.k,st.d/st.k)===1)game.solved(st.n+'/'+st.d+' = '+st.n/st.k+'/'+st.d/st.k+' in lowest terms!');}
  draw(false);
  return {info:()=>st.n/st.k+'/'+st.d/st.k,
    controls:()=>[1,2,3,4,5,6,8].map(k=>({t:k===1?'ungroup':'groups of '+k,on:st.k===k,fn:()=>k===1?(st.k=1,draw(false)):group(k)})).concat(mode==='learn'?[{t:'New fraction',fn:()=>{const b=pick([[2,3],[3,4],[2,5],[3,5],[1,2],[5,6]]),m=pick([2,3,4]);st.n=b[0]*m;st.d=b[1]*m;st.k=1;draw(false);}}]:[]),
    demo(n){if(n==='group'){st.n=6;st.d=8;st.k=1;draw(false);A.seq([[900,()=>group(2)]]);}if(n==='twice'){st.n=12;st.d=16;st.k=1;draw(false);A.seq([[900,()=>group(2)],[1400,()=>group(4)]]);}},
    task(r){st.setup=true;const T5=[[6,8],[9,12],[12,16],[10,15],[16,24]][r];const sc=r===4?1:1;st.n=T5[0]*sc;st.d=T5[1];st.k=1;draw(false);st.setup=false;return 'Simplify *'+st.n+'/'+st.d+'* to lowest terms.';}};}
});

/* =========================================================
   5. Fractions, decimals and percents
   ========================================================= */
const FDP=[[1,2],[1,3],[2,3],[1,4],[3,4],[1,5],[2,5],[3,5],[4,5],[1,8],[3,8],[5,8],[7,8],[1,10],[3,10],[7,10],[9,10],[1,20],[1,25],[1,100]];
const fdps=(n,d)=>{const v=n/d;const rep=[3,6,7,9].some(x=>d%x===0)&&d!==25&&d!==20;return {dec:rep?(v.toFixed(3)+'…'):String(+v.toFixed(3)),pct:rep?(v*100).toFixed(1)+'…%':String(+(v*100).toFixed(1))+'%'};};
P.lesson({id:'fdp7',title:'Fractions, decimals and percents',strand:'Number',codes:['B1.7','B2.2'],
 guide:{goal:'Convert between fractions, decimals and percents, and recall commonly used equivalents.',words:'percent, decimal, fraction, equivalent, repeating decimal, benchmark',
  ask:['How do you change 3/8 into a percent?','Why is 1/3 written as 33.3…%?','Which is greater: 0.45, 4/9 or 44%?'],home:'Find a sale sign like “25% off”. Say it as a fraction and as a decimal.'},
 learn:[{say:'Three scales, one amount.',speech:'Kenji’s slider has three scales: fractions, decimals and percents. Watch the marker move to three eighths. It is zero point three seven five, and thirty-seven point five percent, all at once.',view:'model',demo:'slide'},
        {say:'Read the conversions.',speech:'To change a fraction to a decimal, divide the numerator by the denominator. To change a decimal to a percent, multiply by one hundred. Some fractions, like one third, make repeating decimals.',view:'read'},
        {say:'Watch: common equivalents.',speech:'Learn the common ones by heart: one half is fifty percent, one quarter is twenty-five percent, one fifth is twenty percent, one eighth is twelve point five percent, and one third is about thirty-three point three percent.',view:'model',demo:'tour'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: slide and match.',speech:'Your turn. Choose a fraction, or move the marker, and read all three forms.',view:'model'}],
 fig:'A triple number line: fractions, decimals and percents.',rz:.25,
 explore:['Tap a *fraction* button to jump there.','Use *±1%* and *±10%* to slide.','Read the *fraction*, *decimal* and *percent* together.'],
 howTo:'Move the marker to the amount, then choose the matching form.',
 init:k=>({n:3,d:8,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'Fractions, decimals and percents are three ways to write the *same amount*.')+16;
  rr(g,X0,y,TW,44,12);g.fillStyle=tint(acc(),.16);g.fill();['Fraction','Decimal','Percent'].forEach((h,i)=>T(g,h,X0+TW/6+i*TW/3,y+31,FT.smallB,acc(),'center'));y+=48;
  [[1,2],[1,4],[3,4],[1,5],[1,8],[3,8],[1,3],[2,3],[1,10]].forEach(([n,d],j)=>{const f=fdps(n,d);[n+'/'+d,f.dec,f.pct].forEach((t,i)=>T(g,t,X0+TW/6+i*TW/3,y+j*36+26,FT.body,INK,'center'));});y+=9*36+16;
  y=para(p,y,'*Fraction → decimal:* divide (3 ÷ 8 = 0.375). *Decimal → percent:* × 100 (37.5%). *Percent → fraction:* write over 100 and simplify (40% = 40/100 = 2/5).')+8;
  y=keyWords(p,y,[['repeating decimal','a decimal with digits that repeat forever, like 0.333…'],['percent','per hundred']]);
  predict(p,y,S,'p5','Order from least to greatest: 0.45, 4/9, 44%.','*44%, 4/9, 0.45.* 4/9 = 0.444…, and 44% = 0.44.');},
 readout(p,S,y){const g=p.g,st=S.st,f=fdps(st.n,st.d);T(g,st.n+'/'+st.d+'  =  '+f.dec+'  =  '+f.pct,X0,y+56,ZS(46),acc());return y+76;},
 build(S,grp,mode,game){const st=S.st,x0=-2.0,L=4.0;const rows=[[-2.6,'fraction','#2f7de1'],[-1.8,'decimal','#16a36f'],[-1.0,'percent','#e4572e']];
  rows.forEach(([z,t,c])=>{const tr=mk(new THREE.BoxGeometry(L+.1,.05,.12),lam(tint(c,.5)),0);tr.position.set(0,.03,z);grp.add(tr);const l=label(t,{size:.16,color:c});l.position.set(-2.0,.25,z-.28);grp.add(l);
    for(let k=0;k<=10;k++){const tk=new THREE.Mesh(G('f7t',()=>new THREE.BoxGeometry(.015,.16,.015)),lam(INK));tk.position.set(x0+k*L/10,.1,z);grp.add(tk);if(k%5===0||t!=='fraction'){const lab=t==='decimal'?(k/10).toFixed(1):t==='percent'?k*10+'%':['0','','','','','1/2','','','','','1'][k];if(lab){const ll=label(lab,{size:.14,color:GREY});ll.position.set(x0+k*L/10,.28,z+.2);grp.add(ll);}}}});
  const rod=mk(new THREE.BoxGeometry(.04,.5,2.0),new THREE.MeshLambertMaterial({color:'#f59e0b',transparent:true,opacity:.7}),0);grp.add(rod);const tags=[0,1,2].map(i=>{const l=label('',{size:.24,bg:'#ffffff',border:rows[i][2]});grp.add(l);return l;});
  let xv=0;function draw(){const v=st.n/st.d,f=fdps(st.n,st.d);const tx=x0+v*L;rod.position.set(tx,.25,-1.8);tags[0].userData.set(st.n+'/'+st.d);tags[1].userData.set(f.dec);tags[2].userData.set(f.pct);rows.forEach(([z],i)=>tags[i].position.set(tx+.45,.45,z));check();A.redraw();}
  function setF(n,d){const g2=gcd(n,d)||1;st.n=n/g2;st.d=d/g2;A.pop();draw();}
  function nudge(dp){const v=Math.round(st.n/st.d*100)+dp;const c=Math.max(0,Math.min(100,v));setF(c,100);}
  function check(){if(mode==='play'&&!st.setup&&st.tgt&&Math.abs(st.n/st.d-st.tgt)<1e-9)game.solved('Yes! '+st.n+'/'+st.d+' = '+fdps(st.n,st.d).dec+' = '+fdps(st.n,st.d).pct+'.');}
  draw();
  return {info:()=>st.n+'/'+st.d,
    controls:()=>{if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok);
      return [{t:'−10%',fn:()=>nudge(-10)},{t:'−1%',fn:()=>nudge(-1)},{t:'+1%',fn:()=>nudge(1)},{t:'+10%',go:true,fn:()=>nudge(10)}].concat([[1,2],[1,3],[1,4],[3,8],[2,3],[4,5]].map(([n,d])=>({t:n+'/'+d,fn:()=>setF(n,d)})));},
    demo(n){st.ask=null;st.tgt=null;if(n==='slide'){setF(0,1);A.seq([[700,()=>setF(1,4)],[700,()=>setF(3,8)],[900,()=>A.say('3/8 = 0.375 = 37.5%')]]);}if(n==='tour'){const l=[[1,2],[1,4],[1,5],[1,8],[1,3]].map(([a,b])=>[1100,()=>{setF(a,b);const f=fdps(a,b);A.say(a+'/'+b+' = '+f.pct);}]);A.seq(l);}},
    task(r){st.setup=true;st.ask=null;st.tgt=null;setF(0,1);let txt;const fr=pick(FDP);const f=fdps(fr[0],fr[1]);
      if(r===0){st.ask={ans:f.pct,o:shuffle([f.pct,fdps(fr[1]>2?fr[0]+1:1,fr[1]+1).pct,(fr[0]*10)+'%']).filter((x,i,a)=>a.indexOf(x)===i),ok:'Yes! '+fr[0]+'/'+fr[1]+' = '+f.pct+'.'};setF(fr[0],fr[1]);txt='What percent is *'+fr[0]+'/'+fr[1]+'*?';}
      else if(r===1){const p=pick([20,25,40,60,75,80]);const g2=gcd(p,100);const a=p/g2+'/'+100/g2;st.ask={ans:a,o:shuffle([a,p+'/10','1/'+p]),ok:'Yes! '+p+'% = '+p+'/100 = '+a+'.'};txt='Write *'+p+'%* as a fraction in lowest terms.';}
      else if(r===2){st.tgt=.375;txt='Move the marker to *37.5%*. Use the fraction buttons!';}
      else if(r===3){st.ask={ans:'0.333…',o:shuffle(['0.333…','0.3','0.33']),ok:'Yes! 1/3 is a repeating decimal.'};setF(1,3);txt='Which decimal equals *1/3* exactly?';}
      else{const a=[['0.45',.45],['4/9',4/9],['44%',.44]];st.ask={ans:'0.45',o:a.map(x=>x[0]),ok:'Yes! 0.45 > 0.444… > 0.44.'};txt='Which is the *greatest*?';}
      st.setup=false;return txt;}};}
});

/* =========================================================
   6. Increasing and decreasing by a percent
   ========================================================= */
P.lesson({id:'pctchange7',title:'Increasing and decreasing by percents',strand:'Number',codes:['B2.3'],
 guide:{goal:'Use mental math strategies to increase and decrease a whole number by 1%, 5%, 10%, 25%, 50% and 100%, and explain the strategies.',words:'increase, decrease, percent, discount, markup, original amount',
  ask:['How can you increase 80 by 25% in your head?','Is decreasing by 50% the same as halving?','What happens when you increase a number by 100%?'],home:'A $60 jacket is 25% off. Find the sale price together without a calculator.'},
 learn:[{say:'The bar starts at 100%.',speech:'The blue bar is the original price of Zuri’s game, eighty dollars. It is one hundred percent. Increase it by twenty-five percent: add one quarter of eighty, which is twenty. The new price is one hundred.',view:'model',demo:'up'},
        {say:'Read the strategies.',speech:'Find the percent of the number first, then add it for an increase or subtract it for a decrease. Ten percent is divide by ten; five percent is half of that; fifty percent is half; one hundred percent doubles.',view:'read'},
        {say:'Watch: a discount.',speech:'A sixty dollar jacket is ten percent off. Ten percent of sixty is six. Sixty minus six is fifty-four dollars.',view:'model',demo:'down'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: change by percents.',speech:'Your turn. Increase or decrease the bar by different percents and read the new amount.',view:'model'}],
 fig:'A bar of 10 blocks (10% each). Orange is added; red is taken away.',rz:.3,
 explore:['Press *+5%*, *+10%*, *+25%* to increase; *−* to decrease.','Each blue block is *10%* of the original.','Read the *new amount*.'],
 howTo:'Set the percent change, then choose the new amount.',
 init:k=>({N:80,p:0,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'To *increase* by a percent, add that percent of the number. To *decrease*, subtract it.')+16;
  for(let i=0;i<10;i++){rr(g,X0+i*60,y,56,50,6);g.fillStyle='#2f7de1';g.fill();}for(let i=0;i<2;i++){rr(g,X0+600+i*30,y,28,50,6);g.fillStyle='#f59e0b';g.fill();}T(g,'80 + 25% = 80 + 20 = 100',X0,y+90,FT.bodyB,acc());y+=120;
  [['+ 10%','÷ 10, then add','80 → 88'],['− 5%','half of 10%, then subtract','80 → 76'],['+ 50%','half, then add','80 → 120'],['+ 100%','double','80 → 160'],['− 1%','÷ 100, then subtract','300 → 297']].forEach(([a,b,c],i)=>{rr(g,X0,y+i*54,TW,46,12);g.fillStyle=tint(acc(),.06+i%2*.05);g.fill();T(g,a,X0+20,y+i*54+32,FT.bodyB,acc());T(g,b,X0+140,y+i*54+32,FT.body);T(g,c,X0+TW-20,y+i*54+32,FT.bodyB,INK,'right');});y+=290;
  y=keyWords(p,y,[['discount','an amount taken off a price'],['increase by 100%','double the amount']]);
  predict(p,y,S,'p6','A $40 game goes up by 5%. What is the new price?','*$42.* 10% is $4, so 5% is $2.');},
 readout(p,S,y){const g=p.g,st=S.st,ch=st.N*st.p/100;T(g,st.N+(st.p>=0?' + ':' − ')+Math.abs(st.p)+'% = '+st.N+(st.p>=0?' + ':' − ')+Math.abs(ch)+' = '+(st.N+ch),X0,y+52,ZS(44),acc());return y+70;},
 build(S,grp,mode,game){const st=S.st;const g2=new THREE.Group();grp.add(g2);const bw=.34;
  function draw(){clearGroup(g2);const h=.12+st.N*.006;for(let i=0;i<10;i++){const off=st.p<0&&i>=10+st.p/10;const m=mk(G('pc7b'+h,()=>new THREE.BoxGeometry(bw*.94,h,.7)),off?new THREE.MeshLambertMaterial({color:'#e0453a',transparent:true,opacity:.35}):lam('#2f7de1'),20);m.position.set(-2.0+(i+.5)*bw,h/2,-1.9);g2.add(m);}
    if(st.p<0&&(-st.p)%10){const part=(-st.p%10)/10;const i=10+Math.floor(st.p/10);const m=mk(new THREE.BoxGeometry(bw*.94*part,h+.01,.72),new THREE.MeshLambertMaterial({color:'#e0453a',transparent:true,opacity:.5}),0);m.position.set(-2.0+(i+1)*bw-bw*part/2,h/2,-1.9);g2.add(m);}
    if(st.p>0){const w=bw*st.p/10;const m=mk(new THREE.BoxGeometry(Math.max(.01,w*.97),h,.7),lam('#f59e0b'),20);m.position.set(-2.0+10*bw+w/2,h/2,-1.9);g2.add(m);}
    const l1=label('100% = '+st.N,{size:.22,color:'#2f7de1'});l1.position.set(-.3,h+.35,-1.9);g2.add(l1);const nv=st.N+st.N*st.p/100;const l2=label('new: '+nv+(st.p?'  ('+(st.p>0?'+':'')+st.p+'%)':''),{size:.3,bg:'#ffffff'});l2.position.set(0,1.6,-1.9);g2.add(l2);check();A.redraw();}
  function setP(p){st.p=Math.max(-100,Math.min(100,p));A.pop();draw();}
  function check(){}
  draw();
  return {info:()=>(st.p>=0?'+':'')+st.p+'%',
    controls:()=>{const c=[{t:'+1%',fn:()=>setP(st.p+1)},{t:'+5%',fn:()=>setP(st.p+5)},{t:'+10%',go:true,fn:()=>setP(st.p+10)},{t:'+25%',fn:()=>setP(st.p+25)},{t:'−5%',fn:()=>setP(st.p-5)},{t:'−10%',fn:()=>setP(st.p-10)},{t:'−25%',fn:()=>setP(st.p-25)},{t:'Reset',fn:()=>setP(0)}];
      if(mode==='play'&&st.ask&&st.p===st.ask.p)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);return mode==='learn'?c.concat([40,60,80,200].map(n=>({t:'start '+n,on:st.N===n,fn:()=>{st.N=n;draw();}}))):c;},
    demo(n){st.ask=null;if(n==='up'){st.N=80;st.p=0;draw();A.seq([[800,()=>setP(25)],[900,()=>A.say('80 + 20 = 100')]]);}if(n==='down'){st.N=60;st.p=0;draw();A.seq([[800,()=>setP(-10)],[900,()=>A.say('60 − 6 = 54')]]);}},
    task(r){st.setup=true;st.p=0;const T5=[[pick([40,80,120]),25],[pick([60,90,150]),-10],[pick([30,45,70]),100],[pick([60,80,140]),-50],[pick([40,60,200]),5]][r];st.N=T5[0];const p=T5[1],nv=st.N+st.N*p/100;
      st.ask={p,ans:nv,o:opts(nv,[st.N*p/100,-st.N*p/100,5,-5],0),ok:'Yes! '+st.N+(p>0?' + ':' − ')+Math.abs(st.N*p/100)+' = '+nv+'.'};draw();st.setup=false;
      return (p>0?'*Increase* ':'*Decrease* ')+st.N+' by *'+Math.abs(p)+'%*. Set the bar, then choose the new amount.';}};}
});

/* =========================================================
   7. Adding and subtracting integers
   ========================================================= */
P.lesson({id:'integers7',title:'Adding and subtracting integers',strand:'Number',codes:['B2.4'],
 guide:{goal:'Use counters, number lines and equations to represent, describe and solve addition and subtraction of integers.',words:'integer, zero pair, positive, negative, opposite, number line',
  ask:['Why does a zero pair have a value of 0?','How is (+3) + (−5) like a temperature change?','Why does subtracting a negative make a number bigger?'],home:'Play “elevator”: start on floor 2, go down 5, then up 3. Write each move as an integer equation.'},
 learn:[{say:'Zero pairs cancel.',speech:'A yellow counter is plus one. A red counter is minus one. Together they make a zero pair. Tariq goes up three floors, then down five: three plus negative five. Three zero pairs cancel, and two reds are left. The answer is negative two.',view:'model',demo:'add'},
        {say:'Read the rules.',speech:'To add integers, combine the counters and remove zero pairs. To subtract, take counters away. If there are not enough to take away, add zero pairs first.',view:'read'},
        {say:'Watch: subtracting a negative.',speech:'Two minus negative three. There are no red counters to take away, so add three zero pairs. Now take away three reds. Five yellows are left: the answer is five.',view:'model',demo:'sub'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: use the counters.',speech:'Your turn. Add counters, add zero pairs, take counters away, then choose the answer.',view:'model'}],
 fig:'Yellow (+1) and red (−1) counters on a mat. Zero pairs cancel out.',rz:.35,
 explore:['*Combine* puts both groups on the mat.','*Cancel pairs* removes zero pairs.','For subtraction, *add zero pairs* until you can *take away*.'],
 howTo:'Model the expression with counters, cancel or take away, then choose the answer.',
 init:k=>({a:3,b:-5,op:'+',pos:3,neg:0,stage:0}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'Use *counters*: yellow = +1, red = −1. A yellow and a red make a *zero pair* (value 0).')+16;
  const dot=(x,yy,c)=>{g.beginPath();g.arc(x,yy,18,0,Math.PI*2);g.fillStyle=c;g.fill();g.strokeStyle='rgba(0,0,0,.2)';g.lineWidth=2;g.stroke();};
  for(let i=0;i<3;i++)dot(X0+30+i*44,y+30,'#facc15');for(let i=0;i<5;i++)dot(X0+30+i*44,y+80,'#ef4444');g.strokeStyle='#64748b';g.setLineDash([6,5]);for(let i=0;i<3;i++){g.strokeRect(X0+8+i*44,y+6,44,98);}g.setLineDash([]);
  T(g,'3 + (−5) = −2',X0+300,y+60,ZS(44),acc());y+=130;
  [['(+) + (+)','move right','4 + 3 = 7'],['(+) + (−)','cancel zero pairs','4 + (−6) = −2'],['subtract (−)','= add the opposite','2 − (−3) = 5'],['(−) − (+)','move left','−2 − 3 = −5']].forEach(([a,b,c],i)=>{rr(g,X0,y+i*54,TW,46,12);g.fillStyle=tint(acc(),.06+i%2*.05);g.fill();T(g,a,X0+16,y+i*54+32,FT.bodyB,acc());T(g,b,X0+200,y+i*54+32,FT.body);T(g,c,X0+TW-16,y+i*54+32,FT.bodyB,INK,'right');});y+=230;
  y=keyWords(p,y,[['zero pair','a +1 and a −1 together: their sum is 0'],['opposite','the same distance from 0, other side: 5 and −5']]);
  predict(p,y,S,'p7','What is −4 + 7?','*3.* Four zero pairs cancel, three yellows are left.');},
 readout(p,S,y){const g=p.g,st=S.st,ex=sgn(st.a)+' '+st.op+' '+(st.b<0?'('+sgn(st.b)+')':st.b);T(g,ex+(st.stage>=3?' = '+sgn(st.pos-st.neg):''),X0,y+52,ZS(46),acc());T(g,'on the mat: '+st.pos+' yellow, '+st.neg+' red  →  value '+sgn(st.pos-st.neg),X0,y+94,FT.bodyB);return y+100;},
 build(S,grp,mode,game){const st=S.st;const mat=mk(new THREE.BoxGeometry(4.3,.03,2.4),lam('#eef2f8'),20);mat.position.set(0,.015,-1.9);grp.add(mat);const cG=new THREE.Group(),side=new THREE.Group();grp.add(cG,side);
  const coin=(pos)=>mk(G('ic7'+pos,()=>new THREE.CylinderGeometry(.14,.14,.07,22)),lam(pos?'#facc15':'#ef4444'),0);
  function draw(){clearGroup(cG);clearGroup(side);const pairs=Math.min(st.pos,st.neg);let k=0;
    for(let i=0;i<pairs;i++){const x=-1.9+(i%8)*.48,z=-2.8+Math.floor(i/8)*.75;const a=coin(true);a.position.set(x,.06,z);const b=coin(false);b.position.set(x,.06,z+.32);cG.add(a,b);const r=mk(G('zp7',()=>new THREE.TorusGeometry(.32,.015,6,24)),lam('#64748b'),0);r.rotation.x=Math.PI/2;r.scale.set(.75,1.1,1);r.position.set(x,.07,z+.16);cG.add(r);}
    for(let i=0;i<st.pos-pairs;i++){const c=coin(true);c.position.set(-1.9+(i%10)*.36,.06,-1.25+Math.floor(i/10)*-.36+(pairs>8?0:0));cG.add(c);}
    for(let i=0;i<st.neg-pairs;i++){const c=coin(false);c.position.set(-1.9+(i%10)*.36,.06,-1.25+Math.floor(i/10)*-.36);cG.add(c);}
    if(st.stage===0&&st.op==='+'){for(let i=0;i<Math.abs(st.b);i++){const c=coin(st.b>0);c.position.set(-1.9+i*.36,.06,-.25);side.add(c);}const l=label('waiting: '+sgn(st.b),{size:.18,color:GREY});l.position.set(1.6,.2,-.25);side.add(l);}
    A.redraw();}
  function setUp(a,b,op){st.a=a;st.b=b;st.op=op;st.pos=Math.max(0,a);st.neg=Math.max(0,-a);st.stage=0;draw();}
  function combine(){if(st.op!=='+'||st.stage>0)return;if(st.b>0)st.pos+=st.b;else st.neg+=-st.b;st.stage=1;A.pop();if(!Math.min(st.pos,st.neg)){st.stage=3;A.say('Combined! All the counters are the same colour, so there are no zero pairs. Count them.');}else A.say('Combined. Now cancel the zero pairs.');draw();}
  function cancel(){const pr=Math.min(st.pos,st.neg);if(!pr){if(st.op==='+'&&st.stage>=1&&st.stage<3){st.stage=3;A.say('No zero pairs here: every counter is the same colour. Count them!');draw();return;}A.bad('No zero pairs to cancel.');return;}const kids=cG.children.slice(0,pr*3);kids.forEach(o=>moveTo(o,{scale:.01,k:10}));A.later(()=>{st.pos-=pr;st.neg-=pr;if(st.op==='+'&&st.stage>=1)st.stage=3;A.pop();A.say(pr+' zero pairs cancelled.');draw();},500);}
  function addPairs(){st.pos++;st.neg++;A.pop();A.say('Added a zero pair: the value does not change.');draw();}
  function takeAway(){if(st.op!=='−'||st.stage>=3)return;const need=Math.abs(st.b),pos=st.b>0;if((pos?st.pos:st.neg)<need){A.bad('Not enough '+(pos?'yellow':'red')+' counters. Add zero pairs first!');return;}if(pos)st.pos-=need;else st.neg-=need;st.stage=3;A.pop();A.say('Took away '+sgn(st.b)+'.');draw();}
  draw();setUp(st.a,st.b,st.op);
  return {info:()=>'value '+sgn(st.pos-st.neg),
    controls:()=>{const ans=st.op==='+'?st.a+st.b:st.a-st.b;const c=[];
      if(st.op==='+'){if(st.stage===0)c.push({t:'Combine',go:true,big:true,fn:combine});else if(st.stage<3)c.push({t:'Cancel pairs',go:true,big:true,fn:cancel});}
      else if(st.stage<3)c.push({t:'Add zero pair',fn:addPairs},{t:'Take away '+sgn(st.b),go:true,big:true,fn:takeAway});
      if(st.stage>=3){const o=shuffle([ans,-ans||ans+2,ans+(ans>0?-2:2)]).filter((x,i,a)=>a.indexOf(x)===i);o.forEach(x=>c.push({t:sgn(x),big:true,fn:()=>{if(x===ans){const m=sgn(st.a)+' '+st.op+' '+(st.b<0?'('+sgn(st.b)+')':st.b)+' = '+sgn(ans);if(mode==='play'&&!st.setup)game.solved(m+'!');else A.good(m);}else A.bad('Count what is left on the mat.');}}));}
      if(mode==='learn')c.push({t:'New +',fn:()=>setUp(rnd(-6,6),pick([-1,1])*rnd(1,6),'+')},{t:'New −',fn:()=>setUp(rnd(-5,6),pick([-1,1])*rnd(1,5),'−')});return c;},
    demo(n){if(n==='add'){setUp(3,-5,'+');A.seq([[800,combine],[1100,cancel]]);}if(n==='sub'){setUp(2,-3,'−');A.seq([[800,addPairs],[600,addPairs],[600,addPairs],[900,takeAway]]);}},
    task(r){st.setup=true;[()=>setUp(rnd(2,6),-rnd(3,8),'+'),()=>setUp(-rnd(2,6),-rnd(1,4),'+'),()=>setUp(rnd(1,4),-rnd(1,4),'−'),()=>setUp(-rnd(1,4),rnd(1,4),'−'),()=>setUp(rnd(2,5),rnd(4,7),'−')][r]();st.setup=false;
      return 'Find *'+sgn(st.a)+' '+st.op+' '+(st.b<0?'('+sgn(st.b)+')':st.b)+'* with the counters.';}};}
});
})();
