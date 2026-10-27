/* The Interactive Classroom: Grade 7 Math — Number, part B (lessons 8–14) */
(function(){
"use strict";
const P=window.PM;if(!P||P.failed||!P.THREE)return;
const {THREE,V,W,D,PY,PX,X0,TW,INK,RED,BLUE,GREY,VIBE,FT,ZS,G,M,lam,mk,unitBox,cellMat,label,starGeo,wedgeGeo,clearGroup,disposeObj,rr,T,wrap,para,header,keyWords,predict,box,caption,cxOf,cyOf,tint,moveTo,hop,tween,burst,easeOut,easeIO,A}=P;
const acc=()=>P.ACC;
const rnd=(a,b)=>a+Math.floor(Math.random()*(b-a+1)),pick=a=>a[Math.floor(Math.random()*a.length)],shuffle=a=>a.slice().sort(()=>Math.random()-.5);
const gcd=(a,b)=>b?gcd(b,a%b):Math.abs(a),lcm=(a,b)=>a*b/gcd(a,b);
const fr=(n,d)=>{const g=gcd(n,d)||1;n/=g;d/=g;if(d===1)return String(n);const w=Math.floor(Math.abs(n)/d),r=Math.abs(n)%d;return (n<0?'−':'')+(w?w+' '+r+'/'+d:r+'/'+d);};
function choices(game,list,ans,ok,lab){return list.map(o=>({t:lab?lab(o):String(o),big:true,fn:()=>{if(o===ans){if(game)game.solved(ok);else A.good(ok);}else A.bad('Not quite. Try again!');}}));}
function opts(ans,spread,min){const s=new Set([ans]);let k=0;while(s.size<3&&k<60){k++;const v=Math.round((ans+pick(spread))*1000)/1000;if(v>=(min==null?-1e9:min))s.add(v);}return shuffle([...s]);}
function seg(a,b,col,r){const len=a.distanceTo(b);const m=new THREE.Mesh(new THREE.CylinderGeometry(r,r,Math.max(.001,len),8),lam(col));m.position.copy(a).add(b).multiplyScalar(.5);m.quaternion.setFromUnitVectors(V(0,1,0),b.clone().sub(a).normalize());return m;}
const SUP=['⁰','¹','²','³','⁴','⁵','⁶','⁷','⁸','⁹'];

/* =========================================================
   8. Adding and subtracting fractions and mixed numbers
   ========================================================= */
P.lesson({id:'fracops7',title:'Adding and subtracting mixed numbers',strand:'Number',codes:['B2.5'],
 guide:{goal:'Add and subtract fractions and mixed numbers by creating equivalent fractions with common denominators, in various contexts.',words:'mixed number, improper fraction, common denominator, equivalent fraction, regroup',
  ask:['How can you write 1 1/2 as an improper fraction?','What common denominator works for 2/3 and 3/4?','When subtracting 2 1/4 − 3/4, why do you need to regroup?'],home:'Combine two recipes: 1 1/2 cups of flour and 2/3 cup more. How much in all? Use sixths.'},
 learn:[{say:'Line up the pieces.',speech:'Maya’s recipe needs one and a half cups plus two thirds of a cup. Cut every whole into sixths. One and a half is nine sixths, and two thirds is four sixths. Together: thirteen sixths, which is two and one sixth.',view:'model',demo:'add'},
        {say:'Read the steps.',speech:'Find a common denominator. Rewrite each fraction or mixed number. Add or subtract the numerators. Then write the answer as a mixed number in lowest terms.',view:'read'},
        {say:'Watch: subtract with regrouping.',speech:'Two and a quarter minus three quarters. Nine quarters minus three quarters is six quarters, or one and a half.',view:'model',demo:'sub'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: combine the bars.',speech:'Your turn. Choose a common denominator, combine, then choose the answer.',view:'model'}],
 fig:'Fraction bars up to 3 wholes, cut into equal pieces.',rz:-.05,
 explore:['Choose a *common denominator*.','Press *Combine*.','Choose the answer as a *mixed number*.'],
 howTo:'Pick a common denominator, combine the bars, then choose the answer.',
 init:k=>({a:3,b:2,c:2,d:3,op:'+',D:null,done:false}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'Write mixed numbers as *improper fractions* (or work with the wholes and parts), using a *common denominator*.')+14;
  [['1 1/2 + 2/3','= 9/6 + 4/6','= 13/6 = 2 1/6'],['2 1/4 − 3/4','= 9/4 − 3/4','= 6/4 = 1 1/2'],['3/4 + 5/6','= 9/12 + 10/12','= 19/12 = 1 7/12']].forEach(([a,b,c],i)=>{rr(g,X0,y+i*70,TW,62,14);g.fillStyle=tint(acc(),.08+i*.03);g.fill();T(g,a,X0+20,y+i*70+42,ZS(32),acc());T(g,b,X0+290,y+i*70+42,FT.bodyB);T(g,c,X0+TW-20,y+i*70+42,FT.bodyB,INK,'right');});y+=226;
  const bw=TW-40;for(let i=0;i<18;i++){rr(g,X0+i*bw/18+1,y,bw/18-2,40,4);g.fillStyle=i<9?'#2f7de1':i<13?'#e4572e':'#e9eef7';g.fill();}[0,6,12,18].forEach(k=>{g.fillStyle=INK;g.fillRect(X0+k*bw/18-2,y-8,4,56);});T(g,'1 whole',X0+bw/6,y+70,FT.cap,GREY,'center');y+=100;
  y=keyWords(p,y,[['mixed number','a whole number and a fraction, like 2 1/6'],['improper fraction','numerator greater than denominator, like 13/6']]);
  predict(p,y,S,'p8','What is 3 1/3 − 1 5/6?','*1 1/2.* 20/6 − 11/6 = 9/6 = 1 1/2.');},
 readout(p,S,y){const g=p.g,st=S.st,D2=st.D,ok=D2&&D2%st.b===0&&D2%st.d===0;T(g,fr(st.a,st.b)+' '+st.op+' '+fr(st.c,st.d)+(ok?'  =  '+st.a*D2/st.b+'/'+D2+' '+st.op+' '+st.c*D2/st.d+'/'+D2:''),X0,y+50,ZS(38),acc());
  T(g,!D2?'Choose a common denominator.':ok?(st.done?'Choose the answer.':'Press Combine.'):'That does not fit both denominators.',X0,y+92,FT.bodyB);return y+100;},
 build(S,grp,mode,game){const st=S.st,L=1.3,x0=-1.95,Z1=-2.75,Z2=-2.05,Zr=-1.0;const g1=new THREE.Group(),g2=new THREE.Group(),gr=new THREE.Group();grp.add(g1,g2,gr);
  const rt=mk(new THREE.BoxGeometry(3*L+.1,.04,.75),lam('#eef2f8'),20);rt.position.set(x0+1.5*L,.02,Zr);grp.add(rt);[0,1,2,3].forEach(k=>{const t=mk(new THREE.BoxGeometry(.03,.4,2.6),lam(INK),0);t.position.set(x0+k*L,.2,-1.9);grp.add(t);const l=label(String(k),{size:.22});l.position.set(x0+k*L,.6,Zr+.5);grp.add(l);});
  const ls=[label('',{size:.24,bg:'#ffffff',border:'#2f7de1'}),label('',{size:.24,bg:'#ffffff',border:'#e4572e'})];ls[0].position.set(2.15,.5,Z1);ls[1].position.set(2.15,.5,Z2);grp.add(...ls);
  function bar(g,n,d,z,col){clearGroup(g);const w=L/d,tot=Math.ceil(n/d)*d||d;for(let i=0;i<tot;i++){const m=mk(G('fo7'+d,()=>new THREE.BoxGeometry(w-.02,.24,.5)),lam(i<n?col:'#f1f4f9'),20);m.position.set(x0+(i+.5)*w,.12+(i<n?.04:0),z);g.add(m);}}
  function draw(){const D2=st.D,ok=D2&&D2%st.b===0&&D2%st.d===0;const n1=ok?st.a*D2/st.b:st.a,d1=ok?D2:st.b,n2=ok?st.c*D2/st.d:st.c,d2=ok?D2:st.d;bar(g1,n1,d1,Z1,'#2f7de1');bar(g2,n2,d2,Z2,'#e4572e');ls[0].userData.set(fr(st.a,st.b));ls[1].userData.set(fr(st.c,st.d));
    clearGroup(gr);if(st.done&&ok){const w=L/D2;if(st.op==='+'){for(let i=0;i<n1+n2;i++){const m=mk(G('fo7'+D2,()=>new THREE.BoxGeometry(w-.02,.24,.5)),lam(i<n1?'#2f7de1':'#e4572e'),20);m.position.set(x0+(i+.5)*w,.16,Zr);gr.add(m);}}
      else for(let i=0;i<n1;i++){const gone=i>=n1-n2;const m=mk(G('fo7'+D2,()=>new THREE.BoxGeometry(w-.02,.24,.5)),lam(gone?'#fde2e2':'#2f7de1'),20);m.position.set(x0+(i+.5)*w,gone?.05:.16,Zr);if(gone)m.scale.y=.3;gr.add(m);}}A.redraw();}
  function setD(D2){st.D=D2;st.done=false;st.shown=false;A.pop();draw();}
  function combine(){const D2=st.D;if(!(D2&&D2%st.b===0&&D2%st.d===0)){A.bad('Choose a common denominator first.');return;}st.done=true;A.pop();draw();}
  function setUp(a,b,c,d,op){st.a=a;st.b=b;st.c=c;st.d=d;st.op=op;st.D=null;st.done=false;draw();}
  draw();
  return {info:()=>fr(st.a,st.b)+' '+st.op+' '+fr(st.c,st.d),
    controls:()=>{const D2=st.D,ok=D2&&D2%st.b===0&&D2%st.d===0;const c=[];
      if(!st.done){[2,3,4,5,6,8,10,12].forEach(x=>c.push({t:'/'+x,on:st.D===x,fn:()=>setD(x)}));c.push({t:'Combine',go:true,big:true,fn:combine,dis:!ok});}
      else{const r=st.op==='+'?st.a*D2/st.b+st.c*D2/st.d:st.a*D2/st.b-st.c*D2/st.d;const ans=fr(r,D2);const o=shuffle([ans,fr(r+1,D2),fr(st.op==='+'?st.a+st.c:st.a-st.c,st.op==='+'?st.b+st.d:Math.max(1,Math.abs(st.b-st.d)))]).filter((x,i,a)=>a.indexOf(x)===i);
        o.forEach(x=>c.push({t:x,big:true,fn:()=>{if(x===ans){const m=fr(st.a,st.b)+' '+st.op+' '+fr(st.c,st.d)+' = '+ans;if(mode==='play'&&!st.setup)game.solved(m+'!');else A.good(m);}else A.bad('Count the pieces of size 1/'+D2+', then make a mixed number.');}}));}
      if(mode==='learn')c.push({t:'New problem',fn:()=>{const b=pick([2,3,4]),d=pick([3,4,6]);setUp(rnd(b+1,2*b),b,rnd(1,d-1),d,pick(['+','−']));}});return c;},
    demo(n){if(n==='add'){setUp(3,2,2,3,'+');A.seq([[800,()=>setD(6)],[1100,combine],[1000,()=>A.say('9/6 + 4/6 = 13/6 = 2 1/6')]]);}if(n==='sub'){setUp(9,4,3,4,'−');A.seq([[800,()=>setD(4)],[1100,combine],[1000,()=>A.say('9/4 − 3/4 = 6/4 = 1 1/2')]]);}},
    task(r){st.setup=true;[()=>setUp(3,2,1,3,'+'),()=>setUp(5,4,2,3,'+'),()=>setUp(7,3,1,2,'−'),()=>setUp(9,4,5,6,'−'),()=>setUp(4,3,3,4,'+')][r]();st.setup=false;return (st.op==='+'?'Add':'Subtract')+' *'+fr(st.a,st.b)+' '+st.op+' '+fr(st.c,st.d)+'*.';}};}
});

/* =========================================================
   9. GCF and LCM
   ========================================================= */
const pf=n=>{const o=[];let k=2;while(n>1){while(n%k===0){o.push(k);n/=k;}k++;}return o;};
P.lesson({id:'gcf7',title:'Greatest common factor and least common multiple',strand:'Number',codes:['B2.6'],
 guide:{goal:'Determine the greatest common factor of whole numbers up to 144, and the lowest common multiple of two and three whole numbers.',words:'factor, multiple, prime factor, greatest common factor (GCF), lowest common multiple (LCM), Venn diagram',
  ask:['How do shared prime factors give the GCF?','Why is the LCM of 4 and 6 not 24?','Two buses leave every 12 and 18 minutes. When do they leave together again?'],home:'Find the GCF to split 24 apples and 36 oranges into equal bags with nothing left over.'},
 learn:[{say:'Shared primes make the GCF.',speech:'Liam has twelve apples: two times two times three. And eighteen bars: two times three times three. Put the shared primes in the middle of the Venn diagram: two and three. Two times three is six, the greatest common factor.',view:'model',demo:'venn'},
        {say:'Read about GCF and LCM.',speech:'The greatest common factor is the product of the shared primes. The lowest common multiple is the product of all the primes in the diagram, shared ones counted once.',view:'read'},
        {say:'Watch: frogs find the LCM.',speech:'A four-frog and a six-frog jump along a number line. The smaller one always jumps next. They first land together at twelve: the lowest common multiple.',view:'model',demo:'frogs'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: Venn or frogs.',speech:'Your turn. Sort the primes into the Venn diagram, or make the frogs jump.',view:'model'}],
 fig:'A Venn diagram of prime factors, and frogs jumping in multiples.',rz:.35,
 explore:['*Venn*: the middle holds shared primes.','*Frogs*: press *Jump* until they land together.','GCF = product of the middle; LCM = product of everything.'],
 howTo:'Use the Venn diagram or the frogs, then choose the GCF or LCM.',
 init:k=>({mode:'venn',a:12,b:18,c:0,pos:[0,0,0],sorted:false,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'Write each number as a product of *primes*. Put shared primes in the middle of a *Venn diagram*.')+16;
  g.globalAlpha=.35;g.beginPath();g.arc(X0+250,y+110,110,0,Math.PI*2);g.fillStyle='#2f7de1';g.fill();g.beginPath();g.arc(X0+400,y+110,110,0,Math.PI*2);g.fillStyle='#e4572e';g.fill();g.globalAlpha=1;
  T(g,'12',X0+200,y+20,FT.bodyB,'#2f7de1','center');T(g,'18',X0+450,y+20,FT.bodyB,'#e4572e','center');T(g,'2',X0+190,y+120,ZS(36),INK,'center');T(g,'2   3',X0+325,y+120,ZS(36),INK,'center');T(g,'3',X0+460,y+120,ZS(36),INK,'center');
  T(g,'GCF = 2 × 3 = 6',X0+560,y+80,FT.bodyB,acc());T(g,'LCM = 2 × 2 × 3 × 3 = 36',X0+560,y+130,FT.bodyB,acc());y+=240;
  y=para(p,y,'*LCM by jumping:* list multiples until they match. 4: 4, 8, *12*. 6: 6, *12*. LCM(4, 6) = 12. For three numbers, keep going until all three match: LCM(4, 6, 9) = 36.')+10;
  y=keyWords(p,y,[['GCF','the greatest number that divides into each number'],['LCM','the least number that each number divides into']]);
  predict(p,y,S,'p9','What is the GCF of 24 and 36?','*12.* 24 = 2·2·2·3 and 36 = 2·2·3·3 share 2·2·3 = 12.');},
 readout(p,S,y){const g=p.g,st=S.st;if(st.mode==='venn'){T(g,st.a+' = '+pf(st.a).join(' × ')+'    '+st.b+' = '+pf(st.b).join(' × '),X0,y+40,FT.bodyB,acc());T(g,st.sorted?'GCF '+gcd(st.a,st.b)+'   ·   LCM '+lcm(st.a,st.b):'Press Sort primes.',X0,y+82,FT.bodyB);return y+92;}
  const ns=[st.a,st.b,st.c].filter(Boolean);T(g,'Frogs: '+ns.map((n,i)=>n+'s at '+st.pos[i]).join(',  '),X0,y+40,FT.bodyB,acc());const same=st.pos.slice(0,ns.length).every(v=>v===st.pos[0])&&st.pos[0]>0;T(g,same?'Together at '+st.pos[0]+': LCM!':'Jump until they land together.',X0,y+82,FT.bodyB,same?'#16a36f':INK);return y+92;},
 build(S,grp,mode,game){const st=S.st;const g2=new THREE.Group();grp.add(g2);const FC=['#2f7de1','#e4572e','#16a36f'];
  function ball(v,col){const g=new THREE.Group();const m=mk(G('gp7',()=>new THREE.SphereGeometry(.17,16,12)),lam(col),0);g.add(m);const l=label(String(v),{size:.2,color:INK});l.position.y=.33;g.add(l);return g;}
  function draw(){clearGroup(g2);if(st.mode==='venn'){[[-.55,'#2f7de1',st.a],[.55,'#e4572e',st.b]].forEach(([x,c,n])=>{const d=mk(new THREE.CylinderGeometry(1.15,1.15,.03,48),new THREE.MeshLambertMaterial({color:c,transparent:true,opacity:.28}),0);d.position.set(x,.02,-1.9);g2.add(d);const l=label(String(n),{size:.3,color:c});l.position.set(x*2,.3,-3.0);g2.add(l);});
      const A1=pf(st.a),B1=pf(st.b);const shared=[];const b2=B1.slice();A1.forEach(p=>{const i=b2.indexOf(p);if(i>=0){shared.push(p);b2.splice(i,1);}});const onlyA=A1.slice();shared.forEach(p=>onlyA.splice(onlyA.indexOf(p),1));
      if(!st.sorted){A1.forEach((p,i)=>{const b=ball(p,'#93c5fd');b.position.set(-2.0+i*.4,.2,-.5);g2.add(b);});B1.forEach((p,i)=>{const b=ball(p,'#a5d8ff');b.position.set(.4+i*.4,.2,-.5);g2.add(b);});}
      else{onlyA.forEach((p,i)=>{const b=ball(p,'#93c5fd');b.position.set(-1.25,.2,-2.4+i*.45);g2.add(b);});b2.forEach((p,i)=>{const b=ball(p,'#a5d8ff');b.position.set(1.25,.2,-2.4+i*.45);g2.add(b);});shared.forEach((p,i)=>{const b=ball(p,'#c4b5fd');b.position.set(0,.2,-2.4+i*.45);g2.add(b);});
        const l=label('GCF '+gcd(st.a,st.b)+'  ·  LCM '+lcm(st.a,st.b),{size:.26,bg:'#ffffff'});l.position.set(0,1.3,-1.9);g2.add(l);}}
    else{const ns=[st.a,st.b,st.c].filter(Boolean),mx=ns.reduce(lcm)*1.15,L=4.2,x0=-2.1,toX=v=>x0+v/mx*L;const tr=mk(new THREE.BoxGeometry(L+.1,.05,.1),lam('#cbd5e6'),0);tr.position.set(0,.03,-1.0);g2.add(tr);
      ns.forEach((n,i)=>{const z=-2.7+i*.6;for(let v=n;v<=mx;v+=n){const pd=mk(G('lp7',()=>new THREE.CylinderGeometry(.07,.07,.03,12)),lam(tint(FC[i],.5)),0);pd.position.set(toX(v),.02,z);g2.add(pd);}
        const fg=new THREE.Group();const body=mk(G('frog7',()=>new THREE.SphereGeometry(.15,14,10)),lam(FC[i]),0);body.scale.set(1,.7,1.2);fg.add(body);[-.07,.07].forEach(x=>{const e=mk(G('feye7',()=>new THREE.SphereGeometry(.04,8,6)),lam('#ffffff'),0);e.position.set(x,.1,-.1);fg.add(e);});
        fg.position.set(toX(st.pos[i]),.12,z);g2.add(fg);const l=label(n+'s: '+st.pos[i],{size:.17,color:FC[i]});l.position.set(-2.0,.3,z-.25);g2.add(l);});
      for(let v=0;v<=mx;v+=Math.max(1,Math.round(mx/12))){const l=label(String(v),{size:.13,color:GREY});l.position.set(toX(v),.2,-.75);g2.add(l);}}A.redraw();}
  function jump(){const ns=[st.a,st.b,st.c].filter(Boolean);const same=ns.every((n,i)=>st.pos[i]===st.pos[0])&&st.pos[0]>0;if(same){A.good('Together at '+st.pos[0]+'!');return;}
    let i=0;ns.forEach((n,k)=>{if(st.pos[k]<st.pos[i])i=k;});st.pos[i]+=ns[i];A.pop();draw();const s2=ns.every((n,k)=>st.pos[k]===st.pos[0]);if(s2)A.good('They meet at '+st.pos[0]+': the LCM!');}
  function setUp(m,a,b,c){st.mode=m;st.a=a;st.b=b;st.c=c||0;st.pos=[0,0,0];st.sorted=false;draw();}
  draw();
  return {info:()=>st.mode==='venn'?'Venn of prime factors':'Frogs: multiples',
    controls:()=>{const c=st.mode==='venn'?[{t:'Sort primes',go:true,fn:()=>{st.sorted=true;A.pop();draw();}}]:[{t:'Jump',go:true,big:true,fn:jump},{t:'Jump ×5',fn:()=>{for(let i=0;i<5;i++)jump();}},{t:'Reset',fn:()=>{st.pos=[0,0,0];draw();}}];
      if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);return mode==='learn'?c.concat([{t:'Venn 24 & 36',fn:()=>setUp('venn',24,36)},{t:'Frogs 4 & 6',fn:()=>setUp('jump',4,6)},{t:'Frogs 4, 6 & 9',fn:()=>setUp('jump',4,6,9)}]):c;},
    demo(n){st.ask=null;if(n==='venn'){setUp('venn',12,18);A.seq([[900,()=>{st.sorted=true;A.pop();draw();A.say('Shared: 2 and 3. GCF = 6');}]]);}if(n==='frogs'){setUp('jump',4,6);const l=[];for(let i=0;i<5;i++)l.push([600,jump]);A.seq(l);}},
    task(r){st.setup=true;let txt;
      if(r===0){const [a,b]=pick([[12,18],[16,24],[20,30],[18,27]]);setUp('venn',a,b);const v=gcd(a,b);st.ask={ans:v,o:opts(v,[v,-v/2,2],1),ok:'Yes! GCF('+a+', '+b+') = '+v+'.'};txt='Find the *GCF* of *'+a+'* and *'+b+'*.';}
      else if(r===1){const [a,b]=pick([[36,48],[48,72],[60,90],[84,126],[96,144]]);setUp('venn',a,b);const v=gcd(a,b);st.ask={ans:v,o:opts(v,[v,-v/2,6],1),ok:'Yes! GCF = '+v+'.'};txt='Find the *GCF* of *'+a+'* and *'+b+'*.';}
      else if(r===2){const [a,b]=pick([[4,6],[6,8],[6,9],[8,12]]);setUp('jump',a,b);const v=lcm(a,b);st.ask={ans:v,o:opts(v,[v,a*b-v,a]).filter(x=>x>0),ok:'Yes! LCM = '+v+'.'};txt='Find the *LCM* of *'+a+'* and *'+b+'*. Make the frogs jump.';}
      else if(r===3){const [a,b,c]=pick([[4,6,9],[2,3,5],[3,4,6],[4,5,10]]);setUp('jump',a,b,c);const v=lcm(lcm(a,b),c);st.ask={ans:v,o:opts(v,[v,a*b*c-v,6]).filter(x=>x>0),ok:'Yes! LCM = '+v+'.'};txt='Find the *LCM* of *'+a+', '+b+'* and *'+c+'*.';}
      else{setUp('jump',12,18);st.ask={ans:36,o:[36,6,216],ok:'Yes! LCM(12, 18) = 36 minutes.'};txt='Buses leave every *12* and every *18* minutes. After how many minutes do they leave *together* again?';}
      st.setup=false;return txt;}};}
});

/* =========================================================
   10. Exponents
   ========================================================= */
P.lesson({id:'exponents7',title:'Exponents and repeated multiplication',strand:'Number',codes:['B2.7'],
 guide:{goal:'Evaluate and express repeated multiplication of whole numbers using exponential notation, in various contexts.',words:'exponent, base, power, squared, cubed, exponential notation',
  ask:['What do the base and the exponent in 2⁵ tell you?','Why is 3² called “3 squared”?','Which is greater, 2⁵ or 5²?'],home:'Fold a sheet of paper in half again and again. Count the layers: 2, 4, 8… Write each as a power of 2.'},
 learn:[{say:'Repeated multiplication.',speech:'Ines writes two to the power of three. It means two times two times two. The base is two, and the exponent three tells how many twos to multiply. Watch the cubes build: a line of two, a square of four, a cube of eight.',view:'model',demo:'cube'},
        {say:'Read about squares and cubes.',speech:'A number to the power of two is squared, like the area of a square. A number to the power of three is cubed, like the volume of a cube. Higher powers keep multiplying.',view:'read'},
        {say:'Watch: doubling.',speech:'A bacterium splits in two every hour. After one hour: two. After two: four. After six hours: two to the sixth, sixty-four. Watch the towers double.',view:'model',demo:'double'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: change the base and exponent.',speech:'Your turn. Change the base and the exponent, and read the repeated multiplication.',view:'model'}],
 fig:'Cubes arranged to show a base to a power.',rz:.3,
 explore:['Change the *base* and the *exponent*.','Exponent 1: a line; 2: a square; 3: a cube; higher: stacks of cubes.','Read the *repeated multiplication*.'],
 howTo:'Set the base and exponent, or choose the value or the exponential form.',
 init:k=>({b:2,e:3,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'*Exponential notation* is a short way to write repeated multiplication. In *2⁵*, 2 is the *base* and 5 is the *exponent*.')+16;
  rr(g,X0,y,TW,96,14);g.fillStyle=tint(acc(),.1);g.fill();T(g,'2⁵ = 2 × 2 × 2 × 2 × 2 = 32',X0+20,y+60,ZS(40),acc());y+=120;
  [['3²','3 squared','9'],['4³','4 cubed','64'],['10⁴','ten to the fourth','10 000'],['5²','5 squared','25'],['2⁵','2 to the fifth','32']].forEach(([a,b,c],i)=>{T(g,a,X0+20,y+i*44+26,ZS(32),acc());T(g,b,X0+140,y+i*44+24,FT.body);T(g,c,X0+TW-20,y+i*44+24,FT.bodyB,INK,'right');});y+=236;
  y=para(p,y,'Careful: *2⁵ ≠ 2 × 5*. And *2⁵ = 32* is greater than *5² = 25*.')+10;
  y=keyWords(p,y,[['base','the number being multiplied'],['exponent','how many times the base is used as a factor']]);
  predict(p,y,S,'p10','Write 7 × 7 × 7 × 7 in exponential form and evaluate.','*7⁴ = 2401.*');},
 readout(p,S,y){const g=p.g,st=S.st,v=Math.pow(st.b,st.e);T(g,st.b+SUP[st.e]+' = '+Array(st.e).fill(st.b).join(' × ')+' = '+v.toLocaleString('en-CA').replace(/,/g,' '),X0,y+52,ZS(st.e>5?32:42),acc());return y+70;},
 build(S,grp,mode,game){const st=S.st;const g2=new THREE.Group();grp.add(g2);const C=['#2f7de1','#e4572e','#16a36f','#f59e0b','#8b5cf6','#0fa5a5'];
  function draw(drop){clearGroup(g2);const b=st.b,e=st.e,v=Math.pow(b,e);const u=Math.min(.26,2.6/Math.max(b*(e>3?Math.ceil(v/(b*b*b)):1),b*1.2,1));let i=0;
    const blocks=e<=3?1:Math.pow(b,e-3);const per=Math.min(b,3);const s=Math.min(.26,(4.0/(Math.min(blocks,6)*(Math.min(b,5)+1)))||.26);
    if(v>400){const l=label(v.toLocaleString('en-CA').replace(/,/g,' '),{size:.5,bg:'#ffffff'});l.position.set(0,1.0,-1.8);g2.add(l);const t=label('too many cubes to show!',{size:.2,color:GREY});t.position.set(0,.5,-1.8);g2.add(t);A.redraw();return;}
    for(let k=0;k<blocks;k++){const ox=-2.0+(k%6)*(b*s+.15)+b*s/2,oz=-2.6+Math.floor(k/6)*(b*s+.2);const dz=e>=2?b:1,dy=e>=3?b:1;
      for(let x=0;x<b;x++)for(let z=0;z<dz;z++)for(let yy=0;yy<dy;yy++){const m=mk(G('ex7'+s,()=>new THREE.BoxGeometry(s*.9,s*.9,s*.9)),lam(C[k%6]),20);const p=V(ox+(x-(b-1)/2)*s,s/2+yy*s,oz+z*s);m.position.copy(p);if(drop){m.position.y+=.6+i*.004;moveTo(m,{pos:p,k:12});}g2.add(m);i++;}}
    const l=label(st.b+SUP[st.e]+' = '+v,{size:.36,bg:'#ffffff'});l.position.set(0,1.7,-1.6);g2.add(l);A.redraw();}
  function set(b,e){b=Math.max(2,Math.min(10,b));e=Math.max(1,Math.min(9,e));if(b===st.b&&e===st.e)return;st.b=b;st.e=e;A.pop();draw(true);}
  draw(false);
  return {info:()=>st.b+SUP[st.e],
    controls:()=>{const c=[{t:'base −',fn:()=>set(st.b-1,st.e)},{t:'base +',fn:()=>set(st.b+1,st.e)},{t:'exponent −',fn:()=>set(st.b,st.e-1)},{t:'exponent +',go:true,fn:()=>set(st.b,st.e+1)}];if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);return c;},
    demo(n){st.ask=null;if(n==='cube'){st.b=2;st.e=1;draw(false);A.seq([[800,()=>set(2,2)],[900,()=>set(2,3)],[900,()=>A.say('2 × 2 × 2 = 8')]]);}if(n==='double'){st.b=2;st.e=1;draw(false);const l=[];for(let e=2;e<=6;e++)l.push([800,()=>{set(2,e);A.say('hour '+e+': '+Math.pow(2,e));}]);A.seq(l);}},
    task(r){st.setup=true;let txt;
      if(r===0){const b=rnd(3,5);st.b=b;st.e=3;const v=b*b*b;st.ask={ans:v,o:shuffle([v,b*3,b*b]),ok:'Yes! '+b+' × '+b+' × '+b+' = '+v+'.'};txt='Evaluate *'+b+'³*.';}
      else if(r===1){const b=rnd(2,7),e=rnd(4,5);st.b=b;st.e=1;const a=b+SUP[e];st.ask={ans:a,o:shuffle([a,e+SUP[b],b+' × '+e]),ok:'Yes! '+b+' is used '+e+' times.'};txt='Write *'+Array(e).fill(b).join(' × ')+'* in exponential form.';}
      else if(r===2){st.b=10;st.e=1;const e=rnd(5,9);const a=String(Math.pow(10,e)).replace(/\B(?=(\d{3})+(?!\d))/g,' ');st.ask={ans:a,o:shuffle([a,String(10*e),String(Math.pow(10,e-1)).replace(/\B(?=(\d{3})+(?!\d))/g,' ')]),ok:'Yes! 10'+SUP[e]+' has '+e+' zeros.'};txt='Evaluate *10'+SUP[e]+'*.';}
      else if(r===3){st.b=2;st.e=5;st.ask={ans:'2⁵',o:['2⁵','5²','They are equal'],ok:'Yes! 2⁵ = 32 and 5² = 25.'};txt='Which is greater: *2⁵* or *5²*?';}
      else{st.b=2;st.e=1;const h=rnd(5,8);st.ask={ans:Math.pow(2,h),o:shuffle([Math.pow(2,h),2*h,Math.pow(2,h-1)]),ok:'Yes! 2'+SUP[h]+' = '+Math.pow(2,h)+'.'};txt='Bacteria double every hour, starting with 1. How many after *'+h+' hours*?';}
      draw(false);st.setup=false;return txt;}};}
});

/* =========================================================
   11. Multiplying and dividing fractions by fractions
   ========================================================= */
P.lesson({id:'fracmult7',title:'Multiplying and dividing fractions',strand:'Number',codes:['B2.8'],
 guide:{goal:'Multiply and divide fractions by fractions, using area models, bars and other tools, in various contexts.',words:'fraction of a fraction, area model, product, quotient, common denominator, reciprocal',
  ask:['Why is 2/3 × 3/4 less than both fractions?','How does the area model show the denominator of the product?','How many 1/8 pieces fit in 3/4?'],home:'Take 3/4 of a chocolate bar, then give away 2/3 of that piece. What fraction of the whole bar did you give?'},
 learn:[{say:'Overlap the shading.',speech:'Kenji multiplies two thirds times three quarters. Shade two of three columns blue, and three of four rows yellow. The overlap is green: six of twelve squares. Two thirds of three quarters is six twelfths, or one half.',view:'model',demo:'mul'},
        {say:'Read the rules.',speech:'To multiply fractions, multiply the numerators and multiply the denominators. To divide, ask how many of the second fraction fit into the first. With a common denominator, divide the numerators.',view:'read'},
        {say:'Watch: dividing.',speech:'Three quarters divided by one eighth. Write three quarters as six eighths. How many one-eighth pieces fit? Six.',view:'model',demo:'div'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: shade and count.',speech:'Your turn. Change the fractions and watch the overlap, or switch to divide.',view:'model'}],
 fig:'An area model: columns and rows overlap to show a product.',rz:.35,
 explore:['Change the *first* and *second* fractions.','*Green* squares are the product.','Switch to *÷* to count how many pieces fit.'],
 howTo:'Read the model, then choose the product or quotient.',
 init:k=>({op:'×',a:[2,3],b:[3,4],ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'*Multiplying* a fraction by a fraction finds a *part of a part*. The *area model* shows it.')+14;
  const s=200,ox=X0+20;for(let c=0;c<3;c++)for(let r=0;r<4;r++){const b=c<2,yl=r<3;g.fillStyle=b&&yl?'#16a36f':b?'#93c5fd':yl?'#fde68a':'#f1f5f9';g.fillRect(ox+c*s/3+1,y+r*s/4+1,s/3-2,s/4-2);}
  T(g,'2/3 × 3/4 = 6/12 = 1/2',X0+260,y+70,ZS(38),acc());T(g,'(2 × 3)/(3 × 4)',X0+260,y+120,FT.bodyB,GREY);y+=230;
  y=para(p,y,'*Dividing:* 3/4 ÷ 1/8 asks “how many eighths fit in 3/4?” 3/4 = 6/8, so the answer is *6*. You can also multiply by the *reciprocal*: 3/4 × 8/1 = 6.')+10;
  const bw=TW-60;for(let i=0;i<8;i++){rr(g,X0+i*bw/8+1,y,bw/8-2,40,4);g.fillStyle=i<6?VIBE[i]:'#e9eef7';g.fill();}T(g,'6 eighths',X0+bw+10,y+28,FT.smallB);y+=70;
  y=keyWords(p,y,[['product','the result of multiplying'],['reciprocal','the fraction flipped: the reciprocal of 1/8 is 8']]);
  predict(p,y,S,'p11','What is 1/2 × 4/5?','*4/10 = 2/5.*');},
 readout(p,S,y){const g=p.g,st=S.st,[a,b]=st.a,[c,d]=st.b;if(st.op==='×')T(g,a+'/'+b+' × '+c+'/'+d+' = '+a*c+'/'+b*d+(gcd(a*c,b*d)>1?' = '+fr(a*c,b*d):''),X0,y+52,ZS(44),acc());else{const D2=lcm(b,d);T(g,a+'/'+b+' ÷ '+c+'/'+d+' = '+a*D2/b+'/'+D2+' ÷ '+c*D2/d+'/'+D2+' = '+fr(a*D2/b,c*D2/d),X0,y+52,ZS(38),acc());}return y+70;},
 build(S,grp,mode,game){const st=S.st;const g2=new THREE.Group();grp.add(g2);
  function draw(){clearGroup(g2);const [a,b]=st.a,[c,d]=st.b;
    if(st.op==='×'){const SZ=2.4,x0=-1.6,z0=-3.0;for(let i=0;i<b;i++)for(let j=0;j<d;j++){const bl=i<a,ye=j<c;const h=bl&&ye?.22:bl||ye?.12:.05;const m=mk(new THREE.BoxGeometry(SZ/b-.03,h,SZ/d-.03),lam(bl&&ye?'#16a36f':bl?'#93c5fd':ye?'#fde68a':'#f1f5f9'),20);m.position.set(x0+(i+.5)*SZ/b,h/2,z0+(j+.5)*SZ/d);g2.add(m);}
      const l1=label(a+'/'+b,{size:.26,color:'#2563eb'});l1.position.set(x0+SZ*a/b/2,.4,z0-.2);g2.add(l1);const l2=label(c+'/'+d,{size:.26,color:'#ca8a04'});l2.position.set(x0-.35,.4,z0+SZ*c/d/2);g2.add(l2);
      const l3=label(a*c+' of '+b*d+' squares',{size:.24,bg:'#ffffff',border:'#16a36f'});l3.position.set(1.5,.6,-1.8);g2.add(l3);}
    else{const D2=lcm(b,d),L=3.6,x0=-1.8,n1=a*D2/b,n2=c*D2/d,w=L/D2;for(let i=0;i<D2;i++){const grpI=Math.floor(i/n2);const on=i<n1;const m=mk(G('fd7'+D2,()=>new THREE.BoxGeometry(w-.025,.3,.7)),lam(on?(grpI<Math.floor(n1/n2)?['#2f7de1','#e4572e','#16a36f','#f59e0b','#8b5cf6','#0fa5a5'][grpI%6]:'#cbd5e1'):'#f1f5f9'),20);m.position.set(x0+(i+.5)*w,.15,-2.0);g2.add(m);}
      const l=label(Math.floor(n1/n2)+(n1%n2?' and '+(n1%n2)+'/'+n2:'')+' groups of '+c+'/'+d,{size:.26,bg:'#ffffff'});l.position.set(0,.9,-2.0);g2.add(l);}A.redraw();}
  draw();
  return {info:()=>st.a.join('/')+' '+st.op+' '+st.b.join('/'),
    controls:()=>{const c=[{t:'×',on:st.op==='×',fn:()=>{st.op='×';draw();}},{t:'÷',on:st.op==='÷',fn:()=>{st.op='÷';draw();}}];if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);
      return c.concat([{t:'1st: numerator +',fn:()=>{st.a[0]=st.a[0]%st.a[1]+1;draw();}},{t:'1st: denominator +',fn:()=>{st.a[1]=st.a[1]%6+2;st.a[0]=Math.min(st.a[0],st.a[1]);draw();}},{t:'2nd: numerator +',fn:()=>{st.b[0]=st.b[0]%st.b[1]+1;draw();}},{t:'2nd: denominator +',fn:()=>{st.b[1]=st.b[1]%8+2;st.b[0]=Math.min(st.b[0],st.b[1]);draw();}}]);},
    demo(n){st.ask=null;if(n==='mul'){st.op='×';st.a=[2,3];st.b=[0,4];draw();A.seq([[700,()=>{st.b=[1,4];draw();}],[500,()=>{st.b=[2,4];draw();}],[500,()=>{st.b=[3,4];draw();A.say('6 of 12 = 1/2');}]]);}
      if(n==='div'){st.op='÷';st.a=[3,4];st.b=[1,8];draw();A.say('6 groups of 1/8');}},
    task(r){st.setup=true;let txt;const T5=[['×',[2,3],[3,4]],['×',[1,2],[3,5]],['÷',[3,4],[1,8]],['÷',[2,3],[1,6]],['×',[3,4],[2,3]]][r];st.op=T5[0];st.a=T5[1].slice();st.b=T5[2].slice();draw();
      const [a,b]=st.a,[c,d]=st.b;const ans=st.op==='×'?fr(a*c,b*d):fr(a*lcm(b,d)/b,c*lcm(b,d)/d);const wrong=st.op==='×'?[fr(a+c,b+d),fr(a*d,b*c)]:[fr(a*c,b*d),fr(b*c,a*d)];
      st.ask={ans,o:shuffle([ans,...wrong]).filter((x,i,arr)=>arr.indexOf(x)===i),ok:'Yes! '+a+'/'+b+' '+st.op+' '+c+'/'+d+' = '+ans+'.'};st.setup=false;
      return r===4?'You have *3/4* of a pizza and eat *2/3* of it. What fraction of the whole pizza did you eat?':'Find *'+a+'/'+b+' '+st.op+' '+c+'/'+d+'*.';}};}
});

/* =========================================================
   12. Multiplying and dividing decimals
   ========================================================= */
P.lesson({id:'decmult7',title:'Multiplying and dividing decimals',strand:'Number',codes:['B2.9'],
 guide:{goal:'Multiply and divide decimal numbers by decimal numbers using area models, place-value reasoning and estimation.',words:'decimal, hundredths, area model, product, quotient, estimate, place value',
  ask:['Why is 0.6 × 0.4 less than both numbers?','How many decimal places does 1.2 × 0.5 have? Why?','Why does 4.8 ÷ 0.6 give the same answer as 48 ÷ 6?'],home:'Gas costs $1.59 per litre. About how much for 0.5 L of oil at $8.40 per litre? Estimate first.'},
 learn:[{say:'Tenths times tenths make hundredths.',speech:'Zuri multiplies zero point six times zero point four. On a hundred grid, shade six tenths across and four tenths down. The overlap is twenty-four squares: twenty-four hundredths.',view:'model',demo:'mul'},
        {say:'Read the place-value rules.',speech:'Multiply as whole numbers, then count the decimal places in the factors. To divide by a decimal, multiply both numbers by ten or one hundred until the divisor is a whole number.',view:'read'},
        {say:'Watch: dividing by a decimal.',speech:'Four point eight divided by zero point six. Multiply both by ten: forty-eight divided by six is eight.',view:'model',demo:'div'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: grid and divide.',speech:'Your turn. Change the decimals on the grid, or switch to divide.',view:'model'}],
 fig:'Hundred grids: the overlap shows a decimal product.',rz:.35,
 explore:['Change the *two factors* in tenths.','Green squares show the *product* in hundredths.','Switch to *÷* to see the ×10 trick.'],
 howTo:'Read the model, then choose the product or quotient.',
 init:k=>({op:'×',a:6,b:4,dv:[48,6],ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'Tenths × tenths = *hundredths*. Count the decimal places in the factors to place the decimal point in the product.')+14;
  const s=200,ox=X0+20;for(let i=0;i<10;i++)for(let j=0;j<10;j++){const a=i<6,b=j<4;g.fillStyle=a&&b?'#16a36f':a?'#93c5fd':b?'#fde68a':'#f8fafc';g.fillRect(ox+i*s/10+1,y+j*s/10+1,s/10-2,s/10-2);}
  T(g,'0.6 × 0.4 = 0.24',X0+260,y+60,ZS(40),acc());T(g,'6 × 4 = 24, 2 decimal places',X0+260,y+110,FT.body,GREY);y+=230;
  rr(g,X0,y,TW,96,14);g.fillStyle=tint(acc(),.1);g.fill();T(g,'4.8 ÷ 0.6 = 48 ÷ 6 = 8',X0+20,y+60,ZS(38),acc());y+=120;
  y=para(p,y,'*Estimate* to check: 3.9 × 2.1 ≈ 4 × 2 = 8, so 8.19 is reasonable.')+10;
  y=keyWords(p,y,[['decimal places','digits after the decimal point'],['equivalent division','multiply both numbers by 10 to keep the quotient the same']]);
  predict(p,y,S,'p12','What is 1.2 × 0.5?','*0.6.* 12 × 5 = 60, with 2 decimal places: 0.60.');},
 readout(p,S,y){const g=p.g,st=S.st;if(st.op==='×')T(g,(st.a/10).toFixed(1)+' × '+(st.b/10).toFixed(1)+' = '+(st.a*st.b/100).toFixed(2).replace(/0$/,''),X0,y+52,ZS(46),acc());
  else T(g,(st.dv[0]/10)+' ÷ '+(st.dv[1]/10)+' = '+st.dv[0]+' ÷ '+st.dv[1]+' = '+st.dv[0]/st.dv[1],X0,y+52,ZS(42),acc());return y+70;},
 build(S,grp,mode,game){const st=S.st;const g2=new THREE.Group();grp.add(g2);
  function draw(){clearGroup(g2);if(st.op==='×'){const W2=Math.ceil(st.a/10),H2=Math.ceil(st.b/10);const s=.2,x0=-1.9,z0=-3.0;
      for(let gx=0;gx<W2;gx++)for(let gz=0;gz<H2;gz++)for(let i=0;i<10;i++)for(let j=0;j<10;j++){const X=gx*10+i,Z=gz*10+j;const a=X<st.a,b=Z<st.b;const h=a&&b?.14:a||b?.07:.03;const m=mk(G('dm7'+h,()=>new THREE.BoxGeometry(s*.9,h,s*.9)),lam(a&&b?'#16a36f':a?'#93c5fd':b?'#fde68a':'#f8fafc'),0);m.position.set(x0+gx*2.15+(i+.5)*s,h/2,z0+gz*2.15+(j+.5)*s);g2.add(m);}
      const l=label(st.a*st.b+' hundredths = '+(st.a*st.b/100).toFixed(2),{size:.24,bg:'#ffffff',border:'#16a36f'});l.position.set(1.4,1.1,-1.6);g2.add(l);}
    else{const rows=[[st.dv[0]/10,'÷',st.dv[1]/10,-2.6],[st.dv[0],'÷',st.dv[1],-1.3]];rows.forEach(([x,o,y2,z],i)=>{const l=label(x+'  '+o+'  '+y2+(i?'  =  '+st.dv[0]/st.dv[1]:''),{size:.42,bg:i?'#dcfce7':'#ffffff'});l.position.set(0,.5,z);g2.add(l);});
      const ar=label('× 10 both',{size:.24,color:BLUE});ar.position.set(0,.45,-1.95);g2.add(ar);}A.redraw();}
  draw();
  return {info:()=>st.op==='×'?(st.a/10)+' × '+(st.b/10):(st.dv[0]/10)+' ÷ '+(st.dv[1]/10),
    controls:()=>{const c=[{t:'×',on:st.op==='×',fn:()=>{st.op='×';draw();}},{t:'÷',on:st.op==='÷',fn:()=>{st.op='÷';draw();}}];if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);
      return c.concat(st.op==='×'?[{t:'1st −0.1',fn:()=>{st.a=Math.max(1,st.a-1);draw();}},{t:'1st +0.1',fn:()=>{st.a=Math.min(20,st.a+1);draw();}},{t:'2nd −0.1',fn:()=>{st.b=Math.max(1,st.b-1);draw();}},{t:'2nd +0.1',go:true,fn:()=>{st.b=Math.min(10,st.b+1);draw();}}]:[{t:'New',fn:()=>{const d=rnd(2,9),q=rnd(2,9);st.dv=[d*q,d];draw();}}]);},
    demo(n){st.ask=null;if(n==='mul'){st.op='×';st.a=6;st.b=1;draw();A.seq([[600,()=>{st.b=2;draw();}],[500,()=>{st.b=3;draw();}],[500,()=>{st.b=4;draw();A.say('24 hundredths = 0.24');}]]);}if(n==='div'){st.op='÷';st.dv=[48,6];draw();A.say('4.8 ÷ 0.6 = 48 ÷ 6 = 8');}},
    task(r){st.setup=true;let txt;
      if(r===0){st.op='×';st.a=rnd(2,9);st.b=rnd(2,9);const v=+(st.a*st.b/100).toFixed(2);st.ask={ans:v,o:shuffle([v,+(st.a*st.b/10).toFixed(1),st.a*st.b]),ok:'Yes! '+st.a*st.b+' hundredths.'};txt='Find *'+(st.a/10)+' × '+(st.b/10)+'*.';}
      else if(r===1){st.op='×';st.a=rnd(11,19);st.b=5;const v=+(st.a*5/100).toFixed(2);st.ask={ans:v,o:shuffle([v,v*10,+(v/10).toFixed(3)]),ok:'Yes! '+st.a*5+' hundredths = '+v+'.'};txt='Find *'+(st.a/10)+' × 0.5*.';}
      else if(r===2){st.op='÷';const d=rnd(3,9),q=rnd(3,9);st.dv=[d*q,d];st.ask={ans:q,o:shuffle([q,q/10,q*10]),ok:'Yes! '+d*q+' ÷ '+d+' = '+q+'.'};txt='Find *'+(d*q/10)+' ÷ '+(d/10)+'*.';}
      else if(r===3){st.op='÷';const d=pick([2,4,5]),q=rnd(11,30);st.dv=[d*q,d];st.ask={ans:q,o:shuffle([q,q/10,q+d]),ok:'Yes! '+d*q+' ÷ '+d+' = '+q+'.'};txt='How many *'+(d/10)+' L* bottles can you fill from *'+(d*q/10)+' L*?';}
      else{st.op='×';st.a=rnd(31,39);st.b=rnd(2,3)*10;const v=+(st.a*st.b/100).toFixed(2);st.ask={ans:'about '+Math.round(st.a/10)*st.b/10,o:shuffle(['about '+Math.round(st.a/10)*st.b/10,'about '+Math.round(st.a/10)*st.b,'about '+Math.round(st.a/10)]),ok:'Yes! '+(st.a/10)+' × '+(st.b/10)+' = '+v+'.'};txt='*Estimate* '+(st.a/10)+' × '+(st.b/10)+'.';}
      draw();st.setup=false;return txt;}};}
});

/* =========================================================
   13. Proportional reasoning
   ========================================================= */
const SIT=[{n:'apples at $0.50 each',f:x=>.5*x,prop:true,u:'apples',v:'$'},{n:'taxi: $3 plus $2 per km',f:x=>3+2*x,prop:false,u:'km',v:'$'},{n:'walking 4 km each hour',f:x=>4*x,prop:true,u:'hours',v:'km'},{n:'gym: $20 plus $5 per visit',f:x=>20+5*x,prop:false,u:'visits',v:'$'},{n:'paint: 3 L for each room',f:x=>3*x,prop:true,u:'rooms',v:'L'}];
P.lesson({id:'proportion7',title:'Proportional reasoning',strand:'Number',codes:['B2.10'],
 guide:{goal:'Identify proportional and non-proportional situations and apply proportional reasoning to solve problems.',words:'proportional, constant of proportionality, unit rate, ratio table, origin, non-proportional',
  ask:['How can a graph show that a situation is proportional?','Why is a taxi with a starting fee not proportional?','If 4 tickets cost $30, what do 10 cost?'],home:'Compare phone plans or bus fares. Which ones are proportional (no starting fee)?'},
 learn:[{say:'Proportional: a straight line from zero.',speech:'Tariq’s apples cost fifty cents each. Zero apples cost zero dollars, and every apple adds the same amount. The points make a straight line through the origin. That is proportional.',view:'model',demo:'prop'},
        {say:'Read the test.',speech:'A situation is proportional when the ratio of the two quantities is always the same, and the graph is a straight line through the origin. If there is a starting fee, it is not proportional.',view:'read'},
        {say:'Watch: a taxi.',speech:'A taxi costs three dollars plus two dollars per kilometre. The line is straight but starts at three, not at zero. The ratios are not equal: five for one kilometre, but seven for two. Not proportional.',view:'model',demo:'taxi'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: test each situation.',speech:'Your turn. Choose a situation and look at the graph and the ratios.',view:'model'}],
 fig:'A 3D graph of a situation: does the line pass through the origin?',rz:.35,
 explore:['Switch between *situations*.','Check the *ratio* for each point.','Proportional lines pass through *(0, 0)*.'],
 howTo:'Decide if the situation is proportional, or use the unit rate to find a missing value.',
 init:k=>({si:0,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'In a *proportional* situation, y ÷ x is always the same (the *unit rate*), and the graph is a straight line through the *origin*.')+14;
  const ox=X0+40,oy=y+220,sx=60,sy=12;g.strokeStyle=INK;g.lineWidth=3;g.beginPath();g.moveTo(ox,y+10);g.lineTo(ox,oy);g.lineTo(ox+320,oy);g.stroke();
  g.strokeStyle='#16a36f';g.lineWidth=4;g.beginPath();g.moveTo(ox,oy);g.lineTo(ox+5*sx,oy-5*4*sy*.8);g.stroke();g.strokeStyle='#e4572e';g.beginPath();g.moveTo(ox,oy-3*sy*2);g.lineTo(ox+5*sx,oy-(3+10)*sy*1.2);g.stroke();
  T(g,'proportional',X0+380,y+60,FT.bodyB,'#16a36f');T(g,'4 km per hour: 4/1 = 8/2 = 12/3',X0+380,y+94,FT.small);T(g,'not proportional',X0+380,y+150,FT.bodyB,'#e4572e');T(g,'$3 + $2 per km: 5/1 ≠ 7/2',X0+380,y+184,FT.small);y+=250;
  y=para(p,y,'*Solve with a unit rate:* 4 tickets cost $30, so 1 costs $7.50, and 10 cost *$75*.')+10;
  y=keyWords(p,y,[['proportional','y ÷ x is constant; graph through (0, 0)'],['unit rate','the amount for 1 unit']]);
  predict(p,y,S,'p13','A recipe uses 2 eggs for 12 cookies. How many eggs for 30 cookies?','*5 eggs.* 1 egg per 6 cookies, 30 ÷ 6 = 5.');},
 readout(p,S,y){const g=p.g,st=S.st,s=SIT[st.si];T(g,s.n,X0,y+40,FT.bodyB,acc());const r=[1,2,3].map(x=>+(s.f(x)/x).toFixed(2));T(g,'y ÷ x: '+r.join(', ')+'  →  '+(s.prop?'always the same: proportional':'not the same: NOT proportional'),X0,y+80,FT.body,s.prop?'#16a36f':RED);return y+92;},
 build(S,grp,mode,game){const st=S.st;const g2=new THREE.Group();grp.add(g2);const ox=-1.8,oz=-.6;
  function draw(){clearGroup(g2);const s=SIT[st.si];const xs=[0,1,2,3,4,5],ys=xs.map(s.f),my=Math.max(...ys),sx=.62,sy=2.2/my;
    const back=mk(new THREE.BoxGeometry(3.8,2.6,.04),lam('#ffffff'),20);back.position.set(ox+1.8,1.3,-2.6);g2.add(back);
    g2.add(seg(V(ox,.05,-2.55),V(ox+3.4,.05,-2.55),INK,.02));g2.add(seg(V(ox,.05,-2.55),V(ox,2.5,-2.55),INK,.02));
    const pts=xs.map((x,i)=>V(ox+x*sx,.05+ys[i]*sy,-2.5));for(let i=0;i<pts.length-1;i++)g2.add(seg(pts[i],pts[i+1],s.prop?'#16a36f':'#e4572e',.025));
    pts.forEach((p,i)=>{const d=mk(G('pp7',()=>new THREE.SphereGeometry(.07,12,10)),lam(s.prop?'#16a36f':'#e4572e'),0);d.position.copy(p);g2.add(d);const l=label(String(+ys[i].toFixed(2)),{size:.14});l.position.set(p.x,p.y+.2,p.z);g2.add(l);
      const xl=label(String(xs[i]),{size:.14,color:GREY});xl.position.set(p.x,.12,-2.3);g2.add(xl);});
    const o=mk(new THREE.TorusGeometry(.12,.02,8,20),lam(s.f(0)===0?'#16a36f':'#e4572e'),0);o.position.set(ox,.05,-2.45);g2.add(o);
    const t=label(s.u+' → '+s.v,{size:.17,color:GREY});t.position.set(ox+1.7,.12,-2.05);g2.add(t);const res=label(s.prop?'proportional ✓':'not proportional ✗',{size:.28,bg:'#ffffff',border:s.prop?'#16a36f':'#e4572e'});res.position.set(ox+1.8,2.85,-2.6);g2.add(res);A.redraw();}
  draw();
  return {info:()=>SIT[st.si].n,
    controls:()=>{if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok);return SIT.map((s,i)=>({t:s.n.split(':')[0].split(' at')[0],on:st.si===i,fn:()=>{st.si=i;draw();}}));},
    demo(n){st.ask=null;st.si=n==='taxi'?1:0;draw();},
    task(r){st.setup=true;let txt;
      if(r<2){st.si=r===0?pick([0,2,4]):pick([1,3]);const s=SIT[st.si];st.ask={ans:s.prop?'Proportional':'Not proportional',o:['Proportional','Not proportional'],ok:s.prop?'Yes! The ratio is constant and the line starts at 0.':'Right! There is a starting amount, so the line does not start at 0.'};txt='Is *'+s.n+'* proportional?';}
      else if(r===2){st.si=2;const h=rnd(3,9);st.ask={ans:4*h,o:opts(4*h,[4,-4,h]),ok:'Yes! 4 km per hour × '+h+' = '+4*h+' km.'};txt='Walking at *4 km per hour*: how far in *'+h+' hours*?';}
      else if(r===3){st.si=0;const n=rnd(4,6),c=n*7.5;st.ask={ans:'$75',o:shuffle(['$75','$70','$60']),ok:'Yes! $'+c+' ÷ '+n+' = $7.50 each, × 10 = $75.'};txt='*'+n+' tickets* cost *$'+c.toFixed(2)+'*. What do *10 tickets* cost?';}
      else{st.si=4;st.ask={ans:'5 eggs',o:shuffle(['5 eggs','6 eggs','4 eggs']),ok:'Yes! 2 eggs per 12 cookies = 1 per 6; 30 ÷ 6 = 5.'};txt='*2 eggs* make *12 cookies*. How many eggs for *30 cookies*?';}
      draw();st.setup=false;return txt;}};}
});

/* =========================================================
   14. Order of operations
   ========================================================= */
const EXPRS=[['3 + 4 × 5'],['(3 + 4) × 5'],['20 − 6 ÷ 2'],['2 × 3² + 1'],['(8 − 2) ÷ 3 + 4'],['18 ÷ (2 + 4) × 5'],['5 + 2³ − 4 × 2'],['(1.5 + 2.5) × 3']];
P.lesson({id:'orderops7',title:'Order of operations',strand:'Number',codes:['B2.1'],
 guide:{goal:'Use the properties and order of operations, and the relationships between operations, to solve multi-step problems with whole numbers, decimals, fractions, ratios, rates and percents.',words:'order of operations, brackets, exponents, BEDMAS, multi-step, evaluate',
  ask:['Why is 3 + 4 × 5 not 35?','What changes when you add brackets?','In what order do you do × and ÷ when both appear?'],home:'Write a multi-step price problem: 3 shirts at $12 and a $5 hat, with a $10 coupon. Write one expression with brackets.'},
 learn:[{say:'Follow the order.',speech:'Maya solves three plus four times five. Multiply first: four times five is twenty. Then add: twenty-three. Watch the blocks collapse in the right order.',view:'model',demo:'run'},
        {say:'Read BEDMAS.',speech:'Brackets first. Then exponents. Then division and multiplication, from left to right. Then addition and subtraction, from left to right.',view:'read'},
        {say:'Watch: brackets change the answer.',speech:'Now with brackets: three plus four, in brackets, times five. The brackets go first: seven times five is thirty-five.',view:'model',demo:'brackets'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: tap the next step.',speech:'Your turn. Tap the operation that comes next. The blocks collapse when you are right.',view:'model'}],
 fig:'An expression made of blocks. Tap the operation that comes next.',rz:.3,
 explore:['*Tap the operator block* that should be done next.','Brackets glow first, then exponents, then × ÷, then + −.','Keep going until one number is left.'],
 howTo:'Tap the operations in the correct order until only the answer is left.',
 init:k=>({src:'3 + 4 × 5',tok:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'When an expression has more than one operation, follow the *order of operations*:')+16;
  [['B','Brackets','( )'],['E','Exponents','3²'],['DM','Division and Multiplication','left to right'],['AS','Addition and Subtraction','left to right']].forEach(([a,b,c],i)=>{rr(g,X0,y+i*62,TW,54,14);g.fillStyle=tint(VIBE[i],.18);g.fill();T(g,a,X0+20,y+i*62+38,ZS(36),VIBE[i]);T(g,b,X0+120,y+i*62+36,FT.bodyB);T(g,c,X0+TW-20,y+i*62+36,FT.body,GREY,'right');});y+=268;
  T(g,'3 + 4 × 5 = 3 + 20 = 23',X0,y+20,ZS(38),acc());T(g,'(3 + 4) × 5 = 7 × 5 = 35',X0,y+70,ZS(38),'#e4572e');y+=110;
  y=keyWords(p,y,[['order of operations','the agreed order for doing operations'],['evaluate','find the value of an expression']]);
  predict(p,y,S,'p14','Evaluate 2 × 3² + 1.','*19.* 3² = 9, 2 × 9 = 18, 18 + 1 = 19.');},
 readout(p,S,y){const g=p.g,st=S.st;T(g,st.src,X0,y+40,ZS(40),GREY);T(g,'now: '+st.tok.map(t=>t.v).join(' '),X0,y+86,ZS(40),acc());return y+100;},
 build(S,grp,mode,game){const st=S.st;const g2=new THREE.Group();grp.add(g2);
  function parse(s){return s.replace(/²/g,' ^ 2 ').replace(/³/g,' ^ 3 ').replace(/\(/g,' ( ').replace(/\)/g,' ) ').split(/\s+/).filter(Boolean).map(v=>({v,op:/^[+−×÷^]$/.test(v)}));}
  function nextIdx(tok){let lo=0,hi=tok.length;let depth=0,best=-1;for(let i=0;i<tok.length;i++){if(tok[i].v==='('){depth++;if(depth===1){}}}
    // find innermost bracket range
    let start=0,end=tok.length;for(let i=0;i<tok.length;i++){if(tok[i].v==='(')start=i+1;if(tok[i].v===')'){end=i;break;}}if(end===tok.length)start=0;
    const rng=[];for(let i=start;i<end;i++)rng.push(i);for(const ops of [['^'],['×','÷'],['+','−']]){const i=rng.find(k=>tok[k].op&&ops.includes(tok[k].v));if(i!=null)return i;}return -1;}
  function apply(tok,i){const a=+tok[i-1].v,b=+tok[i+1].v,o=tok[i].v;const r=o==='+'?a+b:o==='−'?a-b:o==='×'?a*b:o==='÷'?a/b:Math.pow(a,b);const out=tok.slice(0,i-1).concat([{v:String(Math.round(r*1000)/1000),op:false}],tok.slice(i+2));
    for(let k=0;k<out.length-2;k++){if(out[k].v==='('&&out[k+2].v===')'){out.splice(k+2,1);out.splice(k,1);}}return out;}
  function draw(hi){clearGroup(g2);const n=st.tok.length,w=Math.min(.6,4.3/n);st.tok.forEach((t,i)=>{const isOp=t.op,br=t.v==='('||t.v===')';const col=br?'#94a3b8':isOp?{'+':'#16a36f','−':'#16a36f','×':'#2f7de1','÷':'#2f7de1','^':'#e4572e'}[t.v]:'#ffffff';
      const h=isOp?.35:.28;const m=mk(new THREE.BoxGeometry(w*.9,h,.6),lam(col),20);m.position.set(-2.15+(i+.5)*w,h/2,-1.8);if(i===hi)m.position.y+=.25;g2.add(m);const l=label(t.v==='^'?'^':t.v,{size:Math.min(.3,w*.6),color:isOp||br?'#ffffff':INK});l.position.set(m.position.x,h+.1+(i===hi?.25:0),-1.8);g2.add(l);
      if(isOp)A.drag(m,{tap:()=>tap(i)});});const res=n===1?label('= '+st.tok[0].v,{size:.4,bg:'#ffffff',border:'#16a36f'}):null;if(res){res.position.set(0,1.2,-1.8);g2.add(res);}A.redraw();}
  function tap(i){const k=nextIdx(st.tok);if(k<0){A.say('All done!');return;}if(i!==k){const o=st.tok[k];A.bad('Not yet! First: '+(st.tok.slice(0,k).some(t=>t.v==='(')?'inside the brackets, ':'')+(o.v==='^'?'the exponent':o.v==='×'||o.v==='÷'?'× and ÷ from the left':'+ and − from the left')+'.');return;}
    const before=st.tok.slice(i-1,i+2).map(t=>t.v==='^'?'^':t.v).join(' ');draw(i);A.later(()=>{st.tok=apply(st.tok,i);A.pop();A.say(before+' = '+st.tok.find((t,j)=>j>=i-1&&!t.op&&t.v!=='('&&t.v!==')').v);draw();
      if(st.tok.length===1&&mode==='play'&&!st.setup)game.solved(st.src+' = '+st.tok[0].v+'!');},350);}
  function setE(s){st.src=s;st.tok=parse(s);draw();}
  function auto(){const run=()=>{if(st.tok.length<=1)return;tap(nextIdx(st.tok));A.later(run,1300);};A.later(run,500);}
  setE(st.src);
  return {info:()=>st.tok.map(t=>t.v).join(' '),
    controls:()=>[{t:'Start over',fn:()=>setE(st.src)}].concat(mode==='learn'?[{t:'Show me',go:true,fn:auto},{t:'New expression',fn:()=>setE(pick(EXPRS)[0])}]:[]),
    demo(n){setE(n==='brackets'?'(3 + 4) × 5':'3 + 4 × 5');auto();},
    task(r){st.setup=true;setE([pick(['3 + 4 × 5','20 − 6 ÷ 2','12 − 2 × 4']),pick(['(3 + 4) × 5','(8 − 2) ÷ 3 + 4']),pick(['2 × 3² + 1','5 + 2³ − 4 × 2']),pick(['18 ÷ (2 + 4) × 5','(10 − 4) × 2²']),'(1.5 + 2.5) × 3'][r]);st.setup=false;
      return 'Evaluate *'+st.src+'*. Tap the operations in the right order.';}};}
});
})();
