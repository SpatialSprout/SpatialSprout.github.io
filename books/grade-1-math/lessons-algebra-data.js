/* The Interactive Classroom: Grade 1 Math — Algebra (11–15) and Data (16–18) */
(function(){
"use strict";
const P=window.PM;if(!P||P.failed||!P.THREE)return;
const {THREE,V,W,D,PY,PX,X0,TW,INK,RED,BLUE,GREY,VIBE,FT,ZS,G,M,lam,mk,unitBox,cellMat,label,starGeo,wedgeGeo,clearGroup,disposeObj,rr,T,wrap,para,header,keyWords,predict,box,caption,cxOf,cyOf,tint,moveTo,hop,tween,burst,easeOut,easeIO,A}=P;
const acc=()=>P.ACC;
const rnd=(a,b)=>a+Math.floor(Math.random()*(b-a+1)),pick=a=>a[Math.floor(Math.random()*a.length)],shuffle=a=>a.slice().sort(()=>Math.random()-.5);
function choices(game,list,ans,ok,lab){return list.map(o=>({t:lab?lab(o):String(o),big:true,fn:()=>{if(o===ans){if(game)game.solved(ok);else A.good(ok);}else A.bad('Not quite. Try again!');}}));}
const COL=['#ff6b35','#ff8a3d','#ffc04d','#5fd38a','#2f7de1','#8b5cf6'];
const SH={A:{k:'ball',c:'#ff6b35'},B:{k:'cube',c:'#2f7de1'},C:{k:'cone',c:'#ffc04d'}};
function shape(k,c,s){s=s||1;let geo;if(k==='ball')geo=G('g1s_b'+s,()=>new THREE.SphereGeometry(.17*s,18,14));else if(k==='cube')geo=G('g1s_c'+s,()=>new THREE.BoxGeometry(.3*s,.3*s,.3*s));else geo=G('g1s_k'+s,()=>new THREE.ConeGeometry(.18*s,.36*s,18));const m=mk(geo,lam(c),20);m.position.y=.18*s;const g=new THREE.Group();g.add(m);return g;}
function seg(a,b,col,r){const len=a.distanceTo(b);const m=new THREE.Mesh(new THREE.CylinderGeometry(r,r,Math.max(.001,len),8),lam(col));m.position.copy(a).add(b).multiplyScalar(.5);m.quaternion.setFromUnitVectors(V(0,1,0),b.clone().sub(a).normalize());return m;}

/* =========================================================
   11. Repeating patterns
   ========================================================= */
const CORES={AB:'AB',AAB:'AAB',ABC:'ABC',ABB:'ABB'};const ACT={A:'clap',B:'stomp',C:'snap'};
P.lesson({id:'patterns1',title:'Repeating patterns',strand:'Algebra',codes:['C1.1','C1.2'],
 guide:{goal:'Identify and describe regularities in patterns, including real-life patterns, and create and translate patterns using movements, sounds, objects, shapes, letters and numbers.',words:'pattern, repeat, core, next, letters, translate',
  ask:['What part of the pattern repeats?','What comes next?','How can you show the same pattern with claps and stomps?'],home:'Find patterns at home: stripes on a shirt, tiles on a floor. Make a clap-stomp pattern for your family to copy!'},
 learn:[{say:'Find the part that repeats!',speech:'Look at Milo’s toys: ball, cube, ball, cube, ball, cube. The part that repeats is ball, cube. That is the core of the pattern. What comes next? A ball!',view:'model',demo:'ab'},
        {say:'Read about translating patterns.',speech:'We can show the same pattern in different ways. Ball, cube is A, B. It could also be clap, stomp, clap, stomp! The pattern is the same.',view:'read'},
        {say:'Watch: A A B.',speech:'Here is a new pattern: ball, ball, cube. A, A, B. Clap, clap, stomp! Let’s keep it going.',view:'model',demo:'aab'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: what comes next?',speech:'Your turn! Look at the pattern and tap what comes next.',view:'model'}],
 fig:'A row of shapes making a repeating pattern.',rz:.35,
 explore:['Choose a *pattern core*.','Press *Next* to grow the pattern.','Show the *letters* or *actions*.'],
 howTo:'Tap the shape that comes next, or choose the answer.',
 init:k=>({core:'AB',n:6,show:'shapes',want:null,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'A *repeating pattern* has a *core*: the part that repeats.')+16;
  const dr=(x,yy,L)=>{if(L==='A'){g.beginPath();g.arc(x,yy,24,0,Math.PI*2);g.fillStyle='#ff6b35';g.fill();}else if(L==='B'){g.fillStyle='#2f7de1';g.fillRect(x-22,yy-22,44,44);}else{g.beginPath();g.moveTo(x,yy-26);g.lineTo(x+24,yy+22);g.lineTo(x-24,yy+22);g.closePath();g.fillStyle='#ffc04d';g.fill();}};
  ['AB','AAB','ABC'].forEach((c,j)=>{for(let i=0;i<8;i++){const L=c[i%c.length];dr(X0+40+i*70,y+40+j*110,L);T(g,L,X0+40+i*70,y+92+j*110,FT.smallB,GREY,'center');}T(g,'core: '+c.split('').join(' '),X0+620,y+50+j*110,FT.bodyB,acc());});y+=340;
  y=para(p,y,'*Translate* a pattern: A B A B can be *clap, stomp, clap, stomp*, or *red, blue, red, blue*.')+10;
  y=keyWords(p,y,[['core','the part of a pattern that repeats'],['translate','show the same pattern a new way']]);
  predict(p,y,S,'p11','Red, red, blue, red, red, blue, ___?','*Red!* The core is red, red, blue.');},
 readout(p,S,y){const g=p.g,st=S.st;const L=Array.from({length:st.n},(_,i)=>st.core[i%st.core.length]);T(g,(st.show==='actions'?L.map(x=>ACT[x]):L).join(', ')+', …',X0,y+50,st.show==='actions'?FT.bodyB:ZS(40),acc());T(g,'core: '+st.core.split('').join(' '),X0,y+94,FT.bodyB);return y+102;},
 build(S,grp,mode,game){const st=S.st;const g2=new THREE.Group(),tray=new THREE.Group();grp.add(g2,tray);
  const str=mk(new THREE.BoxGeometry(4.4,.02,.06),lam('#94a3b8'),0);str.position.set(0,.01,-2.2);grp.add(str);
  function draw(){clearGroup(g2);clearGroup(tray);for(let i=0;i<st.n;i++){const L=st.core[i%st.core.length];const s=shape(SH[L].k,SH[L].c);s.position.set(-2.0+i*.44,.02,-2.2);g2.add(s);
      if(st.show!=='shapes'){const l=label(st.show==='letters'?L:ACT[L],{size:st.show==='letters'?.22:.13,color:INK});l.position.set(-2.0+i*.44,.62,-2.2);g2.add(l);}}
    if(st.n<10){const q=label('?',{size:.36,color:acc()});q.position.set(-2.0+st.n*.44,.35,-2.2);g2.add(q);}
    if(st.want){['A','B','C'].forEach((L,i)=>{const s=shape(SH[L].k,SH[L].c,1.3);s.position.set(-.9+i*.9,.02,-1.1);tray.add(s);s.children.forEach(c=>A.drag(c,{tap:()=>pickL(L)}));const pad=mk(new THREE.CylinderGeometry(.34,.34,.03,24),lam('#f1f5f9'),20);pad.position.set(-.9+i*.9,.015,-1.1);tray.add(pad);A.drag(pad,{tap:()=>pickL(L)});});}A.redraw();}
  function pickL(L){A.pop();if(mode==='play'&&!st.setup&&st.want){const nx=st.core[st.n%st.core.length];if(L===nx){st.n++;draw();game.solved('Yes! A '+SH[L].k+' comes next!');}else A.bad('Say the pattern out loud. What comes next?');}}
  function next(){if(st.n>=10){st.n=st.core.length;}else st.n++;A.pop();draw();const L=st.core[(st.n-1)%st.core.length];A.say(st.show==='actions'?ACT[L]:SH[L].k);}
  draw();
  return {info:()=>st.core+' '+st.n,
    controls:()=>{const c=Object.keys(CORES).map(k=>({t:k.split('').join(' '),on:st.core===k,fn:()=>{st.core=k;st.n=6;draw();}})).concat([{t:'Next',go:true,fn:next},{t:st.show==='shapes'?'Show letters':st.show==='letters'?'Show actions':'Show shapes',fn:()=>{st.show={shapes:'letters',letters:'actions',actions:'shapes'}[st.show];draw();}}]);
      if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c.slice(-1));if(mode==='play'&&st.want)return c.slice(-1);return c;},
    demo(n){st.ask=null;st.want=null;st.show='shapes';if(n==='show'){st.core='AB';st.n=6;draw();}if(n==='next'){st.core='AB';if(st.n!==6){st.n=6;}next();}if(n==='ab'){st.core='AB';st.n=4;draw();A.seq([[600,next],[600,next],[800,()=>{st.show='letters';draw();}]]);}if(n==='aab'){st.core='AAB';st.n=3;draw();A.seq([[600,()=>{st.show='actions';draw();}],[600,next],[600,next],[600,next]]);}},
    task(r){st.setup=true;st.ask=null;st.want=null;st.show='shapes';let txt;
      if(r<3){st.core=['AB','AAB','ABC'][r];st.n=st.core.length*2+(r===1?1:0);st.want=true;txt='What comes *next*? Tap it!';}
      else if(r===3){st.core='ABB';st.n=6;st.ask={ans:'A B B',o:shuffle(['A B B','A B','A A B']),ok:'Yes! ball, cube, cube repeats.'};txt='What is the *core* of this pattern?';}
      else{st.core='AB';st.n=6;st.show='letters';st.ask={ans:'clap, stomp, clap, stomp',o:shuffle(['clap, stomp, clap, stomp','clap, clap, stomp','stomp, stomp, stomp']),ok:'Yes! A B A B = clap, stomp, clap, stomp.'};txt='Which *actions* show the same pattern?';}
      draw();st.setup=false;return txt;}};}
});

/* =========================================================
   12. Growing patterns and number patterns
   ========================================================= */
P.lesson({id:'grow1',title:'Growing patterns',strand:'Algebra',codes:['C1.3','C1.4'],
 guide:{goal:'Determine pattern rules and use them to extend patterns, make predictions and identify missing elements, and create patterns that show relationships among whole numbers up to 50.',words:'grow, shrink, rule, add, take away, missing, next',
  ask:['How does the pattern grow each time?','What is the rule?','What number is missing: 10, 15, ___, 25?'],home:'Build towers with blocks: 1, 3, 5… What comes next? Tell someone the rule!'},
 learn:[{say:'Watch the towers grow!',speech:'Suki builds towers: one cube, three cubes, five cubes, seven cubes. Each tower has two more cubes! The rule is add two. So her next tower has nine cubes.',view:'model',demo:'grow'},
        {say:'Read about number patterns.',speech:'Number patterns have rules too. Ten, fifteen, twenty, twenty-five: the rule is add five. Twenty, eighteen, sixteen: the rule is take away two.',view:'read'},
        {say:'Watch: a missing tower.',speech:'One tower is missing! Two, four, blank, eight. The rule is add two, so the missing tower has six cubes.',view:'model',demo:'miss'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: use the rule!',speech:'Your turn! Change the rule and grow the pattern.',view:'model'}],
 fig:'Towers that grow by the same amount.',rz:.35,
 explore:['Change the *start* and the *rule*.','Press *Grow* to add a tower.','A hollow tower is *missing*.'],
 howTo:'Find the next or missing number, then choose it.',
 init:k=>({a:1,d:2,n:4,miss:-1,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'A *growing pattern* changes by the *same amount* each time. That is its *rule*.')+16;
  [1,3,5,7].forEach((v,i)=>{for(let k=0;k<v;k++){g.fillStyle=COL[i];g.fillRect(X0+40+i*110,y+190-(k+1)*24,60,22);}T(g,String(v),X0+70+i*110,y+220,FT.bodyB,INK,'center');});T(g,'rule: add 2',X0+540,y+110,FT.bodyB,acc());y+=250;
  [['10, 15, 20, 25','add 5'],['20, 18, 16, 14','take away 2'],['2, 4, ___, 8','missing: 6']].forEach(([a,b],i)=>{rr(g,X0,y+i*58,TW,50,14);g.fillStyle=tint(acc(),.08+i*.04);g.fill();T(g,a,X0+20,y+i*58+34,FT.bodyB,INK);T(g,b,X0+TW-20,y+i*58+34,FT.bodyB,acc(),'right');});y+=190;
  y=keyWords(p,y,[['rule','what to do to get the next number'],['missing','a number that is not there yet']]);
  predict(p,y,S,'p12','30, 40, 50: what is the rule?','*Add 10!*');},
 readout(p,S,y){const g=p.g,st=S.st;const v=Array.from({length:st.n},(_,i)=>i===st.miss?'___':String(st.a+st.d*i));T(g,v.join(', '),X0,y+50,ZS(40),acc());T(g,'rule: '+(st.d>0?'add '+st.d:'take away '+(-st.d)),X0,y+94,FT.bodyB);return y+102;},
 build(S,grp,mode,game){const st=S.st;const g2=new THREE.Group();grp.add(g2);
  function draw(){clearGroup(g2);const mx=st.a+st.d*(st.n-1),top=Math.max(st.a,mx);const u=Math.min(.16,2.2/Math.max(1,top));for(let i=0;i<st.n;i++){const v=st.a+st.d*i;const x=-2.0+i*.62;const hol=i===st.miss;
      if(v<=12||hol){for(let k=0;k<v;k++){const c=mk(G('g1gc'+u,()=>new THREE.BoxGeometry(.32,u*.92,.32)),hol?new THREE.MeshLambertMaterial({color:'#cbd5e1',transparent:true,opacity:.35}):lam(COL[i%6]),hol?0:20);c.position.set(x,u/2+k*u+.02,-2.0);g2.add(c);}}
      else{const h=v*u;const c=mk(new THREE.BoxGeometry(.32,h,.32),lam(COL[i%6]),20);c.position.set(x,h/2+.02,-2.0);g2.add(c);}
      const l=label(hol?'?':String(v),{size:.2,bg:'#ffffff'});l.position.set(x,v*u+.25,-2.0);g2.add(l);}A.redraw();}
  function grow(){if(st.n>=7){st.n=3;}else{const nx=st.a+st.d*st.n;if(nx<0||nx>50){A.bad('That is as far as this pattern goes!');return;}st.n++;}A.pop();draw();A.say(String(st.a+st.d*(st.n-1)));}
  draw();
  return {info:()=>st.a+'+'+st.d,
    controls:()=>{const c=[{t:'Grow',go:true,fn:grow},{t:'start +',fn:()=>{st.a=Math.min(10,st.a+1);st.n=4;draw();}},{t:'start −',fn:()=>{st.a=Math.max(0,st.a-1);st.n=4;draw();}},{t:'rule: add 1',fn:()=>{st.d=1;st.n=4;draw();}},{t:'add 2',fn:()=>{st.d=2;st.n=4;draw();}},{t:'add 5',fn:()=>{st.d=5;st.n=4;draw();}},{t:'add 10',fn:()=>{st.d=10;st.n=4;draw();}}];if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok);return c;},
    demo(n){st.ask=null;st.miss=-1;if(n==='show'){st.a=1;st.d=2;st.n=4;draw();}if(n==='grownow'){st.a=1;st.d=2;st.n=4;grow();}if(n==='grow'){st.a=1;st.d=2;st.n=1;draw();A.seq([[600,grow],[600,grow],[600,grow],[700,grow]]);}if(n==='miss'){st.a=2;st.d=2;st.n=4;st.miss=2;draw();A.seq([[1400,()=>{st.miss=-1;draw();A.say('6!');}]]);}},
    task(r){st.setup=true;st.ask=null;st.miss=-1;let txt;
      if(r===0){st.a=1;st.d=2;st.n=4;st.ask={ans:'9',o:shuffle(['9','8','10']),ok:'Yes! 7 + 2 = 9.'};txt='How many cubes in the *next* tower?';}
      else if(r===1){st.a=10;st.d=5;st.n=5;st.miss=2;st.ask={ans:'20',o:shuffle(['20','17','25']),ok:'Yes! The rule is add 5.'};txt='Which number is *missing*?';}
      else if(r===2){st.a=20;st.d=-2;st.n=4;st.ask={ans:'12',o:shuffle(['12','13','10']),ok:'Yes! Take away 2: 14 − 2 = 12.'};txt='This pattern *shrinks*. What comes *next*?';}
      else if(r===3){st.a=10;st.d=10;st.n=4;st.ask={ans:'Add 10',o:shuffle(['Add 10','Add 1','Take away 10']),ok:'Yes! 10, 20, 30, 40.'};txt='What is the *rule*?';}
      else{st.a=3;st.d=3;st.n=4;st.ask={ans:'18',o:shuffle(['18','15','21']),ok:'Yes! 3, 6, 9, 12, 15, 18.'};txt='Add 3 each time. *Predict*: what is the 6th number?';}
      draw();st.setup=false;return txt;}};}
});

/* =========================================================
   13. What changes and what stays the same
   ========================================================= */
const CH=[{n:'plant height',ch:true},{n:'puppy size',ch:true},{n:'temperature',ch:true},{n:'wheels on a bike',ch:false},{n:'days in a week',ch:false},{n:'legs on the cat',ch:false}];
P.lesson({id:'change1',title:'Changes or stays the same?',strand:'Algebra',codes:['C2.1'],
 guide:{goal:'Identify quantities that can change and quantities that always remain the same in real-life contexts.',words:'change, stay the same, grow, always, every day',
  ask:['What things change as you get older?','Does a bike always have 2 wheels?','What changes during the day?'],home:'Measure a plant or a family member every week. What changes? What stays the same?'},
 learn:[{say:'Watch the days go by.',speech:'Every day, Kai’s plant gets taller and the puppy grows bigger. Those things change! But the bike always has two wheels, and the cat always has four legs. Those things stay the same.',view:'model',demo:'days'},
        {say:'Read about change.',speech:'Some amounts change, like how tall you are, your age, or the temperature. Some amounts stay the same, like the number of days in a week: always seven!',view:'read'},
        {say:'Watch: hot and cold.',speech:'The temperature changes. It is cool in the morning, warm in the afternoon, and cool again at night.',view:'model',demo:'temp'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: change or same?',speech:'Your turn! Press Next day and watch. Then tap something that changes, or something that stays the same.',view:'model'}],
 fig:'A garden scene that changes day by day.',rz:.35,
 explore:['Press *Next day*.','Watch the plant, the puppy and the thermometer.','*Tap* a thing to hear about it.'],
 howTo:'Tap the thing the question asks for.',
 init:k=>({day:1,want:null,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'Some things *change*. Some things *stay the same*.')+16;
  rr(g,X0,y,TW/2-8,300,18);g.fillStyle=tint('#5fd38a',.2);g.fill();T(g,'Changes',X0+20,y+40,FT.h3||FT.bodyB,'#15803d');['how tall you are','your age','the temperature','a plant'].forEach((t,i)=>T(g,'• '+t,X0+24,y+90+i*48,FT.body));
  rr(g,X0+TW/2+8,y,TW/2-8,300,18);g.fillStyle=tint('#2f7de1',.15);g.fill();T(g,'Stays the same',X0+TW/2+28,y+40,FT.h3||FT.bodyB,'#1d4ed8');['7 days in a week','2 wheels on a bike','4 legs on a cat','10 fingers'].forEach((t,i)=>T(g,'• '+t,X0+TW/2+32,y+90+i*48,FT.body));y+=330;
  y=keyWords(p,y,[['change','becomes different'],['stay the same','is always the same']]);
  predict(p,y,S,'p13','Does the number of months in a year change?','*No!* There are always 12.');},
 readout(p,S,y){const g=p.g,st=S.st;T(g,'Day '+st.day,X0,y+52,ZS(54),acc());T(g,'plant '+(2+st.day*2)+' cm  ·  wheels: 2  ·  legs: 4',X0+200,y+46,FT.bodyB);return y+68;},
 build(S,grp,mode,game){const st=S.st;const g2=new THREE.Group();grp.add(g2);
  const grass=mk(new THREE.BoxGeometry(4.5,.03,3.2),lam('#bbf7d0'),20);grass.position.set(0,.015,-1.5);grp.add(grass);
  function tapI(i){A.pop();A.say(CH[i].n+(CH[i].ch?' changes!':' stays the same!'));if(mode==='play'&&!st.setup&&st.want){if(st.want(i))game.solved(st.wantOk);else A.bad('Watch what happens on the next day!');}}
  function hit(obj,i){obj.traverse(o=>{if(o.isMesh)A.drag(o,{tap:()=>tapI(i)});});}
  function draw(){clearGroup(g2);const d=st.day;
    const pot=mk(new THREE.CylinderGeometry(.22,.17,.3,20),lam('#c2410c'),20);pot.position.set(-1.7,.15,-2.3);const plant=new THREE.Group();plant.add(pot);const h=.15+d*.15;const st2=mk(new THREE.CylinderGeometry(.025,.025,h,8),lam('#16a34a'),0);st2.position.set(-1.7,.3+h/2,-2.3);plant.add(st2);
    for(let k=0;k<Math.min(6,d+1);k++){const lf=mk(G('g1lf',()=>new THREE.SphereGeometry(.08,10,8)),lam('#22c55e'),0);lf.scale.set(1.4,.4,.8);lf.position.set(-1.7+(k%2?.09:-.09),.35+k*h/(Math.min(6,d+1)),-2.3);plant.add(lf);}g2.add(plant);hit(plant,0);
    const pup=new THREE.Group();const s=.6+d*.08;const b=mk(new THREE.SphereGeometry(.2,16,12),lam('#d6a46c'),0);b.scale.set(1.3,1,1);b.position.y=.2;pup.add(b);const hd=mk(new THREE.SphereGeometry(.13,14,10),lam('#d6a46c'),0);hd.position.set(.25,.35,0);pup.add(hd);[-1,1].forEach(z=>{const e=mk(G('g1ear',()=>new THREE.SphereGeometry(.05,8,6)),lam('#8b5a2b'),0);e.position.set(.27,.46,z*.08);pup.add(e);});pup.scale.setScalar(s);pup.position.set(-.4,0,-2.2);g2.add(pup);hit(pup,1);
    const th=new THREE.Group();const tb=mk(new THREE.CylinderGeometry(.06,.06,1.0,12),lam('#ffffff'),0);tb.position.y=.55;th.add(tb);const tmp=[.3,.6,.85,.5,.35,.7,.9][(d-1)%7];const red=mk(new THREE.CylinderGeometry(.04,.04,Math.max(.05,tmp),10),lam('#ef4444'),0);red.position.y=.08+tmp/2;th.add(red);const bl=mk(new THREE.SphereGeometry(.09,12,10),lam('#ef4444'),0);bl.position.y=.08;th.add(bl);th.position.set(.75,0,-2.5);g2.add(th);hit(th,2);
    const bike=new THREE.Group();[-1,1].forEach(s2=>{const w=mk(G('g1wh',()=>new THREE.TorusGeometry(.17,.03,8,20)),lam(INK),0);w.position.set(s2*.24,.2,0);bike.add(w);});bike.add(seg(V(-.24,.2,0),V(.05,.38,0),'#2f7de1',.02));bike.add(seg(V(.24,.2,0),V(.05,.38,0),'#2f7de1',.02));bike.position.set(1.7,0,-2.3);g2.add(bike);hit(bike,3);
    const cal=mk(new THREE.BoxGeometry(.7,.5,.05),lam('#ffffff'),20);cal.position.set(-1.2,.3,-.9);g2.add(cal);const cl=label('7 days',{size:.16,color:'#c2410c'});cl.position.set(-1.2,.35,-.85);g2.add(cl);hit(cal,4);
    const cat=new THREE.Group();const cb=mk(new THREE.SphereGeometry(.18,14,10),lam('#475569'),0);cb.scale.set(1.4,.8,.8);cb.position.y=.24;cat.add(cb);for(let k=0;k<4;k++){const lg=mk(G('g1leg',()=>new THREE.CylinderGeometry(.03,.03,.16,8)),lam('#475569'),0);lg.position.set((k<2?-.12:.12),.08,(k%2?.07:-.07));cat.add(lg);}const ch=mk(new THREE.SphereGeometry(.11,12,10),lam('#475569'),0);ch.position.set(.26,.34,0);cat.add(ch);cat.position.set(.9,0,-1.1);g2.add(cat);hit(cat,5);
    const dl=label('Day '+d,{size:.3,bg:'#ffffff'});dl.position.set(0,1.6,-2.8);g2.add(dl);A.redraw();}
  draw();
  return {info:()=>'day '+st.day,
    controls:()=>{const c=[{t:'Next day',go:true,fn:()=>{st.day=st.day>=7?1:st.day+1;A.pop();draw();}},{t:'Start over',fn:()=>{st.day=1;draw();}}];if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);return c;},
    demo(n){st.ask=null;st.want=null;if(n==='days'){st.day=1;draw();A.seq([2,3,4,5].map(d=>[700,()=>{st.day=d;draw();}]));}if(n==='temp'){st.day=1;draw();A.seq([[700,()=>{st.day=3;draw();A.say('warm!');}],[900,()=>{st.day=5;draw();A.say('cool again');}]]);}},
    task(r){st.setup=true;st.ask=null;st.want=null;st.day=1;let txt;
      if(r===0){st.want=i=>i===0;st.wantOk='Yes! The plant grows taller every day.';txt='Press *Next day*. Then tap the thing that *grows taller*.';}
      else if(r===1){st.want=i=>!CH[i].ch;st.wantOk='Yes! That always stays the same.';txt='Tap something that *always stays the same*.';}
      else if(r===2){st.want=i=>CH[i].ch;st.wantOk='Yes! That changes.';txt='Tap something that *changes*.';}
      else if(r===3){st.ask={ans:'It changes',o:['It changes','It stays the same'],ok:'Yes! You get one year older every birthday.'};txt='Your *age*: does it change or stay the same?';}
      else{st.ask={ans:'It stays the same',o:['It changes','It stays the same'],ok:'Yes! A week always has 7 days.'};txt='The number of *days in a week*: does it change or stay the same?';}
      draw();st.setup=false;return txt;}};}
});

/* =========================================================
   14. Equal and not equal
   ========================================================= */
P.lesson({id:'equal1',title:'Balance: equal or not?',strand:'Algebra',codes:['C2.2','C2.3'],
 guide:{goal:'Determine whether pairs of addition and subtraction expressions are equivalent, and identify and use equivalent relationships for whole numbers up to 50.',words:'equal, not equal, same as, balance, =, ≠',
  ask:['Is 3 + 4 the same as 5 + 2?','What does the = sign mean?','How can you make both sides balance?'],home:'Use a hanger or a ruler on a pencil as a balance. Put the same number of coins on each side.'},
 learn:[{say:'Do the sides balance?',speech:'Zara puts three plus four on this side, and Leo puts five plus two on that side. Both are seven, so the balance is level! Three plus four equals five plus two.',view:'model',demo:'bal'},
        {say:'Read about the equal sign.',speech:'The equal sign means both sides are the same amount. It does not just mean the answer comes next. Ten equals five plus five!',view:'read'},
        {say:'Watch: not equal.',speech:'Six plus two on one side, and four plus one on the other. Eight is more than five. The balance tips! They are not equal.',view:'model',demo:'tip'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: make it balance!',speech:'Your turn! Add or take away cubes until the balance is level.',view:'model'}],
 fig:'A balance with stacks of cubes on each side.',rz:.35,
 explore:['Change each *stack*.','The balance *tips* to the heavier side.','Level means *equal*!'],
 howTo:'Make the sides balance, or choose the answer.',
 init:k=>({L:[3,4],R:[5,2],need:false,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'The *equal sign* (=) means both sides are the *same amount*.')+16;
  g.fillStyle='#64748b';g.fillRect(X0+TW/2-6,y+60,12,160);g.fillRect(X0+100,y+60,TW-200,12);[[X0+200,'3 + 4'],[X0+TW-200,'5 + 2']].forEach(([x,t])=>{g.fillStyle='#cbd5e1';g.fillRect(x-90,y+40,180,16);T(g,t,x,y+26,FT.bodyB,acc(),'center');});T(g,'3 + 4 = 5 + 2',X0+TW/2,y+270,ZS(46),acc(),'center');y+=300;
  [['10 = 5 + 5','equal'],['6 + 2 and 4 + 1','not equal: 8 ≠ 5'],['9 − 1 and 4 + 4','equal: both 8']].forEach(([a,b],i)=>{T(g,a,X0+20,y+i*50+30,FT.bodyB);T(g,b,X0+TW-20,y+i*50+30,FT.body,acc(),'right');});y+=170;
  y=keyWords(p,y,[['equal','the same amount'],['not equal (≠)','different amounts']]);
  predict(p,y,S,'p14','Does 2 + 6 balance 4 + 4?','*Yes!* Both are 8.');},
 readout(p,S,y){const g=p.g,st=S.st;const a=st.L[0]+st.L[1],b=st.R[0]+st.R[1];T(g,st.L.join(' + ')+(a===b?'  =  ':'  ≠  ')+st.R.join(' + '),X0,y+54,ZS(48),a===b?'#16a36f':RED);T(g,a+(a===b?' = ':a>b?' > ':' < ')+b,X0,y+96,FT.bodyB);return y+104;},
 build(S,grp,mode,game){const st=S.st;const g2=new THREE.Group();grp.add(g2);const post=mk(new THREE.CylinderGeometry(.06,.08,1.2,12),lam('#64748b'),0);post.position.set(0,.6,-2.2);grp.add(post);let tilt=0,cur=0;
  function draw(){clearGroup(g2);const a=st.L[0]+st.L[1],b=st.R[0]+st.R[1];tilt=Math.max(-.22,Math.min(.22,(b-a)*.05));const arm=new THREE.Group();arm.position.set(0,1.22,-2.2);arm.rotation.z=-cur;g2.add(arm);arm.userData.arm=true;
    arm.add(mk(new THREE.BoxGeometry(3.8,.07,.12),lam('#475569'),0));[[-1.5,st.L,['#ff6b35','#ffc04d']],[1.5,st.R,['#2f7de1','#5fd38a']]].forEach(([x,v,cs])=>{const pan=new THREE.Group();pan.position.set(x,-.7,0);arm.add(pan);pan.add(mk(new THREE.CylinderGeometry(.7,.7,.04,28),lam('#cbd5e1'),20));
      v.forEach((n,j)=>{for(let k=0;k<n;k++){const c=mk(G('g1eqc',()=>new THREE.BoxGeometry(.2,.18,.2)),lam(cs[j]),20);c.position.set((j?.22:-.22),.11+k*.18,0);pan.add(c);}const l=label(String(n),{size:.17,color:INK});l.position.set(j?.22:-.22,.2+n*.18,.0);pan.add(l);});
      [[-.6],[.6]].forEach(([dx])=>pan.add(seg(V(dx,0,0),V(0,.7,0),'#94a3b8',.01)));});
    const eq=label(st.L.join(' + ')+(a===b?' = ':' ≠ ')+st.R.join(' + '),{size:.3,bg:'#ffffff',border:a===b?'#16a36f':RED});eq.position.set(0,2.2,-2.6);g2.add(eq);check();A.redraw();}
  function check(){const a=st.L[0]+st.L[1],b=st.R[0]+st.R[1];if(mode==='play'&&!st.setup&&st.need&&a===b)game.solved('Level! '+st.L.join(' + ')+' = '+st.R.join(' + ')+'.');}
  const set=(s,i,d)=>{const v=st[s][i]+d;if(v<0||v>9)return;st[s][i]=v;A.pop();draw();};
  draw();
  return {tick(dt){const k=Math.min(1,dt*4);cur+=(tilt-cur)*k;g2.children.forEach(o=>{if(o.userData.arm)o.rotation.z=-cur;});},info:()=>st.L.join('+')+'|'+st.R.join('+'),
    controls:()=>{const c=[{t:'left 1st +',fn:()=>set('L',0,1)},{t:'left 1st −',fn:()=>set('L',0,-1)},{t:'right 2nd +',go:true,fn:()=>set('R',1,1)},{t:'right 2nd −',fn:()=>set('R',1,-1)},{t:'right 1st +',fn:()=>set('R',0,1)},{t:'right 1st −',fn:()=>set('R',0,-1)}];if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok);return c;},
    demo(n){st.ask=null;st.need=false;if(n==='bal'){st.L=[3,4];st.R=[5,2];draw();}if(n==='tip'){st.L=[6,2];st.R=[4,1];draw();}},
    task(r){st.setup=true;st.ask=null;st.need=false;let txt;
      if(r===0){const a=rnd(3,6),b=rnd(2,4),c=rnd(2,5);st.L=[a,b];st.R=[c,0];st.need=true;txt='Change the *right side* so it balances *'+a+' + '+b+'*.';}
      else if(r===1){st.L=[6,2];st.R=[5,0];st.need=true;txt='*6 + 2 = 5 + ___*. Add cubes to the right to make it level.';}
      else if(r===2){st.L=[4,2];st.R=[3,3];st.ask={ans:'Equal',o:['Equal','Not equal'],ok:'Yes! Both are 6.'};txt='Is *4 + 2* equal to *3 + 3*?';}
      else if(r===3){st.L=[5,1];st.R=[2,2];st.ask={ans:'Not equal',o:['Equal','Not equal'],ok:'Right! 6 is not equal to 4.'};txt='Is *5 + 1* equal to *2 + 2*?';}
      else{st.L=[7,1];st.R=[4,4];st.ask={ans:'4 + 4',o:shuffle(['4 + 4','7 + 7','1 + 1']),ok:'Yes! 7 + 1 = 8 = 4 + 4.'};txt='Which is *the same as 7 + 1*?';}
      draw();st.setup=false;return txt;}};}
});

/* =========================================================
   15. Coding: step by step
   ========================================================= */
P.lesson({id:'coding1',title:'Code the bunny',strand:'Algebra',codes:['C3.1','C3.2'],
 guide:{goal:'Solve problems by writing and executing code that involves sequential events, and read and alter existing code, describing how changes affect the outcomes.',words:'code, step, order, arrow, run, fix, bug',
  ask:['Why does the order of the steps matter?','What happens if we add one more step?','How do you fix a bug in the code?'],home:'Play “robot”: give a family member step-by-step directions to walk to the door. Did the order matter?'},
 learn:[{say:'Code is steps in order.',speech:'Code tells Leo’s bunny what to do, one step at a time. Right, right, up, up. Press Run and watch the bunny hop to the carrot! Yum!',view:'model',demo:'run'},
        {say:'Read about steps.',speech:'Each arrow is one step. The bunny does the steps in order, from first to last. If the order changes, the bunny goes somewhere else!',view:'read'},
        {say:'Watch: fix a bug.',speech:'Oops! This code has a bug. The bunny stops one square too soon. Add one more right arrow, and run it again. Now it reaches the carrot!',view:'model',demo:'fix'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: write the code!',speech:'Your turn! Add arrows to the code, then press Run.',view:'model'}],
 fig:'A bunny on a grid, following arrow code to a carrot.',rz:.35,
 explore:['Add steps: *up, down, left, right*.','Press *Run* to watch the bunny.','*Undo* removes the last step.'],
 howTo:'Write or fix the code, then Run it.',
 init:k=>({code:['→','→','↑','↑'],start:[0,0],goal:[2,2],pos:[0,0],need:true,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'*Code* is a list of steps. The bunny does them *in order*.')+16;
  const s=70;for(let r=0;r<4;r++)for(let c=0;c<4;c++){g.fillStyle=(r+c)%2?'#dcfce7':'#f0fdf4';g.fillRect(X0+c*s,y+r*s,s,s);}g.fillStyle='#f59e0b';g.beginPath();g.arc(X0+2.5*s,y+1.5*s,20,0,Math.PI*2);g.fill();g.fillStyle='#e5e7eb';g.beginPath();g.arc(X0+.5*s,y+3.5*s,22,0,Math.PI*2);g.fill();
  g.strokeStyle='#ff6b35';g.lineWidth=6;g.beginPath();g.moveTo(X0+.5*s,y+3.5*s);g.lineTo(X0+2.5*s,y+3.5*s);g.lineTo(X0+2.5*s,y+1.5*s);g.stroke();
  ['1. →','2. →','3. ↑','4. ↑'].forEach((t,i)=>{rr(g,X0+330,y+i*62,180,52,12);g.fillStyle=tint(acc(),.15);g.fill();T(g,t,X0+350,y+i*62+36,ZS(32),acc());});y+=300;
  y=para(p,y,'A *bug* is a mistake in the code. To *fix* it, change, add or remove a step.')+10;
  y=keyWords(p,y,[['code','steps for a computer or robot'],['bug','a mistake in code']]);
  predict(p,y,S,'p15','What happens if the code is up, up, right, right instead?','*The bunny still reaches the carrot*, by a different path.');},
 readout(p,S,y){const g=p.g,st=S.st;rr(g,X0,y+8,TW,64,14);g.fillStyle='#1e293b';g.fill();T(g,st.code.length?st.code.join('  '):'(no steps yet)',X0+20,y+52,ZS(40),'#86efac');return y+84;},
 build(S,grp,mode,game){const st=S.st,c=.5,N=5,ox=-1.8,oz=-.8;const X=i=>ox+i*c,Z=j=>oz-j*c;
  for(let i=0;i<N;i++)for(let j=0;j<N;j++){const t=mk(G('g1gt',()=>new THREE.BoxGeometry(c*.96,.05,c*.96)),lam((i+j)%2?'#bbf7d0':'#dcfce7'),20);t.position.set(X(i),.025,Z(j));grp.add(t);}
  const g2=new THREE.Group();grp.add(g2);const bun=new THREE.Group();const bb=mk(new THREE.SphereGeometry(.15,16,12),lam('#ffffff'),0);bb.position.y=.17;bun.add(bb);const bh=mk(new THREE.SphereGeometry(.1,14,10),lam('#ffffff'),0);bh.position.set(0,.33,.06);bun.add(bh);[-1,1].forEach(s=>{const e=mk(G('g1bear',()=>new THREE.CylinderGeometry(.03,.03,.2,8)),lam('#d6ecff'),0);e.position.set(s*.05,.48,.04);bun.add(e);});grp.add(bun);
  let running=false;
  function drawGoal(){clearGroup(g2);const car=mk(new THREE.ConeGeometry(.08,.34,12),lam('#f97316'),0);car.rotation.z=Math.PI/2;car.position.set(X(st.goal[0]),.12,Z(st.goal[1]));g2.add(car);const lf=mk(new THREE.ConeGeometry(.06,.14,6),lam('#22c55e'),0);lf.rotation.z=-Math.PI/2;lf.position.set(X(st.goal[0])-.22,.12,Z(st.goal[1]));g2.add(lf);
    const st0=mk(new THREE.CylinderGeometry(.2,.2,.02,20),lam('#e5e7eb'),0);st0.position.set(X(st.start[0]),.06,Z(st.start[1]));g2.add(st0);A.redraw();}
  function place(){bun.position.set(X(st.pos[0]),.05,Z(st.pos[1]));}
  const MV={'→':[1,0],'←':[-1,0],'↑':[0,1],'↓':[0,-1]};
  function run(){if(running)return;running=true;st.pos=st.start.slice();place();let pr=Promise.resolve();let ok=true;st.code.forEach((a,k)=>{pr=pr.then(()=>{if(!ok)return;const d=MV[a];const n=[st.pos[0]+d[0],st.pos[1]+d[1]];if(n[0]<0||n[0]>=N||n[1]<0||n[1]>=N){ok=false;A.bad('Bonk! The bunny hit the edge. Fix the code!');return;}
      st.pos=n;A.pop();return hop(bun,V(X(n[0]),.05,Z(n[1])),.3,.35);});});
    pr.then(()=>{running=false;if(!ok)return;if(st.pos[0]===st.goal[0]&&st.pos[1]===st.goal[1]){A.say('Yum! The bunny found the carrot!');if(mode==='play'&&!st.setup&&st.need)game.solved('Your code works! The bunny got the carrot!');}else A.bad('Not there yet! Check the steps.');});}
  function add(a){if(st.code.length>=10){A.bad('That is a lot of steps! Try Run.');return;}st.code.push(a);A.pop();st.pos=st.start.slice();place();A.redraw();}
  place();drawGoal();
  return {info:()=>st.code.join(''),
    controls:()=>{const c=[{t:'↑',fn:()=>add('↑')},{t:'↓',fn:()=>add('↓')},{t:'←',fn:()=>add('←')},{t:'→',fn:()=>add('→')},{t:'Undo',fn:()=>{st.code.pop();A.redraw();}},{t:'Clear',fn:()=>{st.code=[];st.pos=st.start.slice();place();A.redraw();}},{t:'Run',go:true,fn:run}];if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok);return c;},
    demo(n){st.ask=null;st.need=false;st.start=[0,0];st.goal=[2,2];if(n==='show'){st.code=['→','→','↑','↑'];st.pos=[0,0];place();drawGoal();}if(n==='runnow'){st.code=['→','→','↑','↑'];run();}if(n==='run'){st.code=['→','→','↑','↑'];st.pos=[0,0];place();drawGoal();A.seq([[700,run]]);}if(n==='fix'){st.code=['→','↑','↑'];st.pos=[0,0];place();drawGoal();A.seq([[400,run],[2200,()=>add('→')],[700,run]]);}},
    task(r){st.setup=true;st.ask=null;st.need=true;let txt;
      if(r===0){st.start=[0,0];st.goal=[3,1];st.code=[];txt='Write code to take the bunny to the *carrot*, then press *Run*.';}
      else if(r===1){st.start=[0,0];st.goal=[1,4];st.code=[];txt='The carrot moved! Write new code, then *Run*.';}
      else if(r===2){st.start=[4,0];st.goal=[2,3];st.code=['←','↑','↑','↑'];txt='This code has a *bug*. Fix it so the bunny reaches the carrot!';}
      else if(r===3){st.need=false;st.start=[0,0];st.goal=[2,0];st.code=['→','→'];st.ask={ans:'It moves 1 more square right',o:shuffle(['It moves 1 more square right','It moves up','Nothing changes']),ok:'Yes! Every step changes where the bunny ends.'};txt='What happens if we add one more *→* to this code?';}
      else{st.need=false;st.start=[0,0];st.goal=[1,1];st.code=['↑','→'];st.ask={ans:'Yes',o:['Yes','No'],ok:'Yes! → ↑ and ↑ → both reach the carrot.'};txt='Would *→ ↑* also reach the carrot?';}
      st.pos=st.start.slice();place();drawGoal();st.setup=false;return txt;}};}
});

/* =========================================================
   16. Sorting by one attribute
   ========================================================= */
const OBJ=[];['#ef4444','#2f7de1','#ffc04d'].forEach((c,ci)=>['ball','cube','cone'].forEach((k,ki)=>OBJ.push({c,ci,k,ki,big:(ci+ki)%2===0})));
P.lesson({id:'sort1',title:'Sorting things',strand:'Data',codes:['D1.1'],
 guide:{goal:'Sort sets of data about people or things according to one attribute, and describe the rules used for sorting.',words:'sort, group, rule, colour, shape, size, same, different',
  ask:['How did you sort these toys?','Can you sort the same toys a different way?','Which toy does not belong?'],home:'Sort the laundry by colour, then by type. Sort toys by size. Tell the sorting rule!'},
 learn:[{say:'Sort by colour!',speech:'Here is Amara’s mix of toys. Let’s sort them by colour. All the red toys go in one hoop, the blue toys in another, and the yellow toys in the last one. The rule is colour!',view:'model',demo:'col'},
        {say:'Read about sorting rules.',speech:'A sorting rule tells how things are grouped. We can sort by colour, by shape, or by size. The same toys can be sorted in different ways!',view:'read'},
        {say:'Watch: sort by shape.',speech:'Now let’s sort the same toys by shape: balls, cubes and cones.',view:'model',demo:'shape'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: sort them!',speech:'Your turn! Pick a sorting rule and watch the toys move.',view:'model'}],
 fig:'Toys sorted into three hoops.',rz:.35,
 explore:['Sort by *colour*, *shape* or *size*.','Press *Mix* to mix them up.','*Tap a toy* to hear about it.'],
 howTo:'Choose the sorting rule, or tap the toy that does not belong.',
 init:k=>({by:null,odd:null,want:null,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'To *sort*, put things that are the *same* in some way together. The *rule* tells how.')+16;
  [['#ef4444','red'],['#2f7de1','blue'],['#ffc04d','yellow']].forEach(([c,t],j)=>{g.beginPath();g.arc(X0+130+j*260,y+110,100,0,Math.PI*2);g.strokeStyle=c;g.lineWidth=6;g.stroke();for(let i=0;i<3;i++){g.beginPath();if(i===0)g.arc(X0+90+j*260,y+100,18,0,Math.PI*2);else if(i===1)g.rect(X0+120+j*260,y+82,34,34);else{g.moveTo(X0+150+j*260,y+120);g.lineTo(X0+170+j*260,y+160);g.lineTo(X0+130+j*260,y+160);}g.fillStyle=c;g.fill();}T(g,t,X0+130+j*260,y+250,FT.bodyB,c,'center');});y+=280;
  y=para(p,y,'*Rule: colour.* The same toys could also be sorted by *shape* or by *size*.')+10;
  y=keyWords(p,y,[['sort','put into groups'],['rule','how the groups are made']]);
  predict(p,y,S,'p16','Apple, banana, carrot, grape. Which does not belong with the fruits?','*Carrot!* It is a vegetable.');},
 readout(p,S,y){const g=p.g,st=S.st;T(g,st.by?'Sorting rule: '+st.by:'Pick a sorting rule!',X0,y+52,ZS(44),acc());return y+66;},
 build(S,grp,mode,game){const st=S.st;const g2=new THREE.Group();grp.add(g2);const hoops=new THREE.Group();grp.add(hoops);
  const HX=[-1.45,0,1.45],HZ=-2.0;const items=st.odd?OBJ.slice(0,0).concat(st.odd):OBJ;
  function grpOf(o){return st.by==='colour'?o.ci:st.by==='shape'?o.ki:st.by==='size'?(o.big?0:1):-1;}
  function draw(){clearGroup(g2);clearGroup(hoops);const list=st.odd||OBJ;const nG=st.by==='size'?2:3;if(st.by)for(let h=0;h<nG;h++){const x=nG===2?(h?.8:-.8):HX[h];const ring=mk(new THREE.TorusGeometry(.62,.035,8,40),lam(st.by==='colour'?OBJ[h*3].c:'#94a3b8'),0);ring.rotation.x=Math.PI/2;ring.position.set(x,.04,HZ);hoops.add(ring);
      const l=label(st.by==='colour'?['red','blue','yellow'][h]:st.by==='shape'?['balls','cubes','cones'][h]:['big','small'][h],{size:.18,color:INK});l.position.set(x,.1,HZ+.8);hoops.add(l);}
    const cnt={};list.forEach((o,i)=>{const gI=grpOf(o);let x,z;if(gI<0){x=-1.9+(i%5)*.95;z=-2.6+Math.floor(i/5)*.9;}else{const k=cnt[gI]=(cnt[gI]||0)+1;const cx=nG===2?(gI?.8:-.8):HX[gI];x=cx+((k-1)%3-1)*.36;z=HZ+(Math.floor((k-1)/3)-.5)*.42;}
      const s=shape(o.k,o.c,o.big?1:.65);s.position.set(x,.02,z);g2.add(s);s.children.forEach(m=>A.drag(m,{tap:()=>tapO(o)}));});A.redraw();}
  function tapO(o){A.pop();A.say((o.big?'big ':'small ')+['red','blue','yellow'][o.ci]+' '+o.k);if(mode==='play'&&!st.setup&&st.want){if(st.want(o))game.solved(st.wantOk);else A.bad('Look closely. Which one is different?');}}
  function sortBy(b){st.by=b;A.pop();draw();A.say('Sort by '+b+'!');if(mode==='play'&&!st.setup&&st.needBy&&b===st.needBy)game.solved('Yes! Sorted by '+b+'.');}
  draw();
  return {info:()=>st.by||'mixed',
    controls:()=>{const c=[{t:'By colour',on:st.by==='colour',fn:()=>sortBy('colour')},{t:'By shape',on:st.by==='shape',fn:()=>sortBy('shape')},{t:'By size',on:st.by==='size',fn:()=>sortBy('size')},{t:'Mix',go:true,fn:()=>{st.by=null;draw();}}];if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok);return c;},
    demo(n){st.ask=null;st.want=null;st.odd=null;st.needBy=null;if(n==='colnow'){sortBy('colour');return;}st.by=null;draw();if(n==='col')A.seq([[900,()=>sortBy('colour')]]);if(n==='shape')A.seq([[900,()=>sortBy('shape')]]);},
    task(r){st.setup=true;st.ask=null;st.want=null;st.odd=null;st.needBy=null;st.by=null;let txt;
      if(r===0){st.needBy='colour';txt='Sort the toys so each hoop has *one colour*.';}
      else if(r===1){st.needBy='shape';txt='Sort the toys so all the *cubes* are together.';}
      else if(r===2){st.by='size';st.ask={ans:'Size',o:shuffle(['Size','Colour','Shape']),ok:'Yes! Big toys and small toys.'};txt='What *rule* sorted these toys?';}
      else if(r===3){const c=pick([0,1,2]);st.odd=OBJ.filter(o=>o.ci===c).concat([OBJ.find(o=>o.ci!==c)]);const odd=st.odd[st.odd.length-1];st.want=o=>o===odd;st.wantOk='Yes! It is a different colour.';txt='Tap the toy that *does not belong*.';}
      else{const k=pick([0,1,2]);st.odd=OBJ.filter(o=>o.ki===k).concat([OBJ.find(o=>o.ki!==k)]);const odd=st.odd[st.odd.length-1];st.want=o=>o===odd;st.wantOk='Yes! It is a different shape.';txt='Tap the toy with a *different shape*.';}
      draw();st.setup=false;return txt;}};}
});

/* =========================================================
   17. Collecting votes and pictographs
   ========================================================= */
const FR=[{n:'apple',c:'#ef4444'},{n:'banana',c:'#facc15'},{n:'grapes',c:'#8b5cf6'},{n:'orange',c:'#fb923c'}];
P.lesson({id:'graph1',title:'Graphs of our favourites',strand:'Data',codes:['D1.2','D1.3','D1.4','D1.5'],
 guide:{goal:'Collect data to answer questions, record it, display it in concrete graphs and pictographs with titles and labels, order categories by frequency, and analyse the data to draw conclusions.',words:'data, vote, tally, graph, pictograph, title, label, most, least',
  ask:['Which fruit is the class favourite?','How many more votes did apples get than bananas?','What would be a good title for this graph?'],home:'Ask your family “What is your favourite fruit?” Make a tally, then draw a pictograph.'},
 learn:[{say:'Ask a question, collect votes!',speech:'Milo asks: what is your favourite fruit? Each vote adds one cube to that fruit’s tower. Apple, apple, grapes, banana… The towers make a concrete graph!',view:'model',demo:'vote'},
        {say:'Read about graphs.',speech:'A graph needs a title and labels, so everyone knows what it shows. In a pictograph, each picture stands for one vote. We can order the fruits from most votes to least votes.',view:'read'},
        {say:'Watch: most to least.',speech:'Let’s put the towers in order, from the most votes to the least votes. Apple is first. It is the favourite!',view:'model',demo:'order'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: vote and read!',speech:'Your turn! Tap a fruit to vote, and read the graph.',view:'model'}],
 fig:'Cube towers showing votes for favourite fruits.',rz:.35,
 explore:['*Tap a fruit* to add a vote.','Press *Order* to sort most to least.','Read the *title* and *labels*.'],
 howTo:'Read the graph, then tap or choose the answer.',
 init:k=>({v:[6,3,4,2],ord:false,want:null,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'*Data* is information we collect. We can show it in a *graph*.')+12;
  T(g,'Our Favourite Fruits',X0+TW/2,y+30,FT.h3||FT.bodyB,INK,'center');y+=50;
  [['apple',6,'#ef4444'],['banana',3,'#facc15'],['grapes',4,'#8b5cf6'],['orange',2,'#fb923c']].forEach(([n,v,c],j)=>{T(g,n,X0+20,y+j*58+34,FT.bodyB);for(let i=0;i<v;i++){g.beginPath();g.arc(X0+190+i*56,y+j*58+26,22,0,Math.PI*2);g.fillStyle=c;g.fill();}T(g,'|||| '.repeat(Math.floor(v/5))+'|'.repeat(v%5),X0+TW-30,y+j*58+34,FT.bodyB,GREY,'right');});y+=244;
  T(g,'Each circle = 1 vote.  Source: our class.',X0+20,y,FT.small,GREY);y+=26;
  y=para(p,y,'*Most to least:* apple (6), grapes (4), banana (3), orange (2).')+10;
  y=keyWords(p,y,[['pictograph','a graph that uses pictures'],['tally','a mark for each vote; |||| is 5']]);
  predict(p,y,S,'p17','How many more votes for apple than banana?','*3 more.* 6 − 3 = 3.');},
 readout(p,S,y){const g=p.g,st=S.st;const o=FR.map((f,i)=>[f.n,st.v[i]]).sort((a,b)=>b[1]-a[1]);T(g,'Most to least:',X0,y+40,FT.bodyB,acc());T(g,o.map(x=>x[0]+' '+x[1]).join(',  '),X0,y+82,FT.bodyB);return y+92;},
 build(S,grp,mode,game){const st=S.st;const g2=new THREE.Group();grp.add(g2);const t=label('Our Favourite Fruits',{size:.26,bg:'#ffffff'});t.position.set(0,2.4,-2.8);grp.add(t);
  function fruit(i){const f=FR[i];const g=new THREE.Group();if(f.n==='banana'){const b=mk(new THREE.TorusGeometry(.16,.06,8,16,Math.PI),lam(f.c),0);b.rotation.z=Math.PI;b.position.y=.2;g.add(b);}else if(f.n==='grapes'){[[0,0],[.08,0],[-.08,0],[.04,-.08],[-.04,-.08],[0,-.15]].forEach(([x,y])=>{const s=mk(G('g1gr',()=>new THREE.SphereGeometry(.06,10,8)),lam(f.c),0);s.position.set(x,.3+y,0);g.add(s);});}
    else{const s=mk(G('g1fr'+i,()=>new THREE.SphereGeometry(.16,16,12)),lam(f.c),0);s.position.y=.17;g.add(s);}return g;}
  function draw(){clearGroup(g2);let idx=[0,1,2,3];if(st.ord)idx.sort((a,b)=>st.v[b]-st.v[a]);idx.forEach((i,pos)=>{const x=-1.65+pos*1.1;const fr=fruit(i);fr.position.set(x,0,-1.15);g2.add(fr);fr.traverse(o=>{if(o.isMesh)A.drag(o,{tap:()=>vote(i)});});
      const pad=mk(new THREE.CylinderGeometry(.3,.3,.03,22),lam(tint(FR[i].c,.3)),20);pad.position.set(x,.015,-1.15);g2.add(pad);A.drag(pad,{tap:()=>vote(i)});
      for(let k=0;k<st.v[i];k++){const c=mk(G('g1vc',()=>new THREE.BoxGeometry(.4,.18,.4)),lam(FR[i].c),20);c.position.set(x,.1+k*.18,-2.2);g2.add(c);A.drag(c,{tap:()=>tapT(i)});}
      const l=label(String(st.v[i]),{size:.22,bg:'#ffffff'});l.position.set(x,.32+st.v[i]*.18,-2.2);g2.add(l);const n=label(FR[i].n,{size:.15,color:GREY});n.position.set(x,.1,-1.6);g2.add(n);});A.redraw();}
  function vote(i){if(mode==='play'&&!st.setup&&st.want){tapT(i);return;}if(mode==='play'&&!st.setup&&st.ask){A.say('Read the towers to answer the question!');return;}if(st.v[i]>=10){A.bad('That tower is full!');return;}st.v[i]++;A.pop();draw();A.say(FR[i].n+': '+st.v[i]);if(mode==='play'&&!st.setup&&st.need&&st.need(st))game.solved(st.needOk);}
  function tapT(i){A.pop();A.say(FR[i].n+': '+st.v[i]+' votes');if(mode==='play'&&!st.setup&&st.want){if(st.want(i))game.solved(st.wantOk);else A.bad('Compare the towers again.');}}
  draw();
  return {info:()=>st.v.join(','),
    controls:()=>{const c=[{t:'Order',on:st.ord,go:true,fn:()=>{st.ord=!st.ord;A.pop();draw();}},{t:'Clear votes',fn:()=>{st.v=[0,0,0,0];draw();}}];if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c.slice(0,1));return mode==='play'?c.slice(0,1):c;},
    demo(n){st.ask=null;st.want=null;st.need=null;if(n==='vote'){st.v=[0,0,0,0];st.ord=false;draw();A.seq([0,0,2,1,0,2,3,0,1,2,0,1,0,3,2].map(i=>[260,()=>vote(i)]));}if(n==='show'){st.v=[6,3,4,2];st.ord=false;draw();}if(n==='order'){st.v=[6,3,4,2];st.ord=false;draw();A.seq([[900,()=>{st.ord=true;draw();A.say('Apple is the favourite!');}]]);}},
    task(r){st.setup=true;st.ask=null;st.want=null;st.need=null;st.ord=false;let txt;
      if(r===0){st.v=shuffle([7,3,5,2]);const mx=Math.max(...st.v);st.want=i=>st.v[i]===Math.max(...st.v);st.wantOk='Yes! That is the favourite.';txt='Tap the tower with the *most* votes.';}
      else if(r===1){st.v=shuffle([6,1,4,3]);const mn=Math.min(...st.v);st.want=i=>st.v[i]===Math.min(...st.v);st.wantOk='Yes! That has the fewest votes.';txt='Tap the tower with the *fewest* votes.';}
      else if(r===2){st.v=[2,4,1,3];st.need=s=>s.v[2]>=5;st.needOk='Yes! Grapes have 5 votes now.';txt='*4 more friends* vote for *grapes*. Tap grapes to add their votes!';}
      else if(r===3){st.v=[6,3,4,2];st.ask={ans:'3 more',o:shuffle(['3 more','9 more','2 more']),ok:'Yes! 6 − 3 = 3.'};txt='How many *more* votes did *apple* get than *banana*?';}
      else{st.v=[6,3,4,2];st.ask={ans:'Our Favourite Fruits',o:shuffle(['Our Favourite Fruits','Cubes','My Shoes']),ok:'Yes! The title tells what the graph is about.'};txt='Which is the best *title* for this graph?';}
      draw();st.setup=false;return txt;}};}
});

/* =========================================================
   18. Impossible, possible, certain
   ========================================================= */
P.lesson({id:'chance1',title:'Impossible, possible or certain?',strand:'Data',codes:['D2.1','D2.2'],
 guide:{goal:'Use the words impossible, possible and certain to describe the likelihood of events and make predictions, and test predictions about whether data from another group will be the same.',words:'impossible, possible, certain, likely, predict, spinner',
  ask:['Is it possible to spin blue on an all-red spinner?','What is certain to happen tomorrow?','Would another class vote exactly the same way?'],home:'Put 5 red buttons in a cup. Is pulling out red certain, possible or impossible? Add a blue one. Now?'},
 learn:[{say:'Spin the spinner!',speech:'Suki’s spinner is all red. Spinning red is certain: it will always happen. Spinning blue is impossible: it can never happen!',view:'model',demo:'all'},
        {say:'Read the three words.',speech:'Certain means it will happen. Possible means it might happen. Impossible means it cannot happen. We use these words to make predictions.',view:'read'},
        {say:'Watch: half and half.',speech:'Now the spinner is half red and half blue. Red is possible. Blue is possible too. Let’s spin a few times and see!',view:'model',demo:'half'},
        {say:'Predict, then lift the flap.',speech:'Predict, then lift the flap.',view:'read'},
        {say:'Your turn: spin and predict!',speech:'Your turn! Change the spinner, make a prediction, and spin.',view:'model'}],
 fig:'A spinner with coloured parts.',rz:.35,
 explore:['Choose a *spinner*.','Press *Spin*.','Is red *certain*, *possible* or *impossible*?'],
 howTo:'Choose the word that describes the chance.',
 init:k=>({sp:'mix',res:[],ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=para(p,y,'We can describe how likely something is:')+16;
  const spn=(cx,parts,t,c)=>{const n=parts.length;parts.forEach((col,i)=>{g.beginPath();g.moveTo(cx,y+90);g.arc(cx,y+90,80,i*2*Math.PI/n,(i+1)*2*Math.PI/n);g.closePath();g.fillStyle=col;g.fill();});T(g,t,cx,y+210,FT.bodyB,c,'center');};
  spn(X0+120,['#ef4444'],'red: certain','#16a36f');spn(X0+410,['#ef4444','#2f7de1'],'red: possible','#d97706');spn(X0+700,['#2f7de1','#ffc04d'],'red: impossible',RED);y+=240;
  y=para(p,y,'*Predict:* if another class voted for fruits, would the results be *exactly* the same? Probably *not*, but they might be *close*.')+10;
  y=keyWords(p,y,[['certain','will happen'],['impossible','cannot happen']]);
  predict(p,y,S,'p18','Is it certain, possible or impossible that it will snow in July in Ontario?','*Impossible* (or almost!).');},
 readout(p,S,y){const g=p.g,st=S.st,parts=SPN[st.sp];const red=parts.filter(c=>c==='#ef4444').length;T(g,'Red is '+(red===parts.length?'certain':red?'possible':'impossible'),X0,y+50,ZS(44),acc());T(g,st.res.length?'Spins: '+st.res.map(c=>c==='#ef4444'?'red':c==='#2f7de1'?'blue':'yellow').join(', '):'',X0,y+92,FT.small);return y+100;},
 build(S,grp,mode,game){const st=S.st;const g2=new THREE.Group();grp.add(g2);let arrow=null,ang=0,spinning=false;
  function draw(){clearGroup(g2);const parts=SPN[st.sp],n=parts.length;parts.forEach((c,i)=>{const w=mk(wedgeGeo(1.0,.08,i*2*Math.PI/n+.01,(i+1)*2*Math.PI/n-.01),lam(c),20);w.position.set(-.6,.02,-1.9);g2.add(w);});
    arrow=new THREE.Group();const a=mk(new THREE.BoxGeometry(.85,.04,.07),lam(INK),0);a.position.x=.42;arrow.add(a);const hd=mk(new THREE.ConeGeometry(.08,.18,10),lam(INK),0);hd.rotation.z=-Math.PI/2;hd.position.x=.86;arrow.add(hd);const pin=mk(new THREE.CylinderGeometry(.07,.07,.08,14),lam('#ffffff'),0);arrow.add(pin);arrow.position.set(-.6,.16,-1.9);arrow.rotation.y=ang;g2.add(arrow);
    st.res.slice(-8).forEach((c,i)=>{const b=mk(G('g1rs',()=>new THREE.SphereGeometry(.1,12,10)),lam(c),0);b.position.set(1.3+(i%4)*.26,.1,-2.4+Math.floor(i/4)*.3);g2.add(b);});A.redraw();}
  function spin(){if(spinning)return;spinning=true;const parts=SPN[st.sp],n=parts.length;const k=Math.floor(Math.random()*n);const target=(k+.5)*2*Math.PI/n;const turns=Math.PI*2*3;const a0=ang;const a1=a0+turns+((target-(a0+turns))%(Math.PI*2)+Math.PI*2)%(Math.PI*2);
    tween(1.6,t=>{ang=a0+(a1-a0)*(1-Math.pow(1-t,3));if(arrow)arrow.rotation.y=ang;}).then(()=>{spinning=false;st.res.push(parts[k]);A.pop();A.say(parts[k]==='#ef4444'?'red!':parts[k]==='#2f7de1'?'blue!':'yellow!');draw();});}
  draw();
  return {info:()=>st.sp,
    controls:()=>{const c=[{t:'All red',on:st.sp==='red',fn:()=>{st.sp='red';st.res=[];draw();}},{t:'Red and blue',on:st.sp==='mix',fn:()=>{st.sp='mix';st.res=[];draw();}},{t:'No red',on:st.sp==='none',fn:()=>{st.sp='none';st.res=[];draw();}},{t:'Spin',go:true,fn:spin}];if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c.slice(3));return c;},
    demo(n){st.ask=null;st.res=[];if(n==='red'){st.sp='red';draw();}if(n==='mixs'){st.sp='mix';draw();}if(n==='all'){st.sp='red';draw();A.seq([[600,spin]]);}if(n==='half'){st.sp='mix';draw();A.seq([[500,spin],[2000,spin],[2000,spin]]);}},
    task(r){st.setup=true;st.res=[];let txt;const O=['Certain','Possible','Impossible'];
      if(r===0){st.sp='red';st.ask={ans:'Certain',o:O,ok:'Yes! Every part is red.'};txt='Spinning *red* on this spinner is…';}
      else if(r===1){st.sp='mix';st.ask={ans:'Possible',o:O,ok:'Yes! It might land on red.'};txt='Spinning *red* on this spinner is…';}
      else if(r===2){st.sp='none';st.ask={ans:'Impossible',o:O,ok:'Yes! There is no red at all.'};txt='Spinning *red* on this spinner is…';}
      else if(r===3){st.sp='mix';st.ask={ans:'Certain',o:O,ok:'Yes! The sun always rises.'};txt='The sun will rise tomorrow. That is…';}
      else{st.sp='mix';st.ask={ans:'Probably close, but not exactly the same',o:['Exactly the same','Probably close, but not exactly the same'],ok:'Yes! Different groups often give similar but different results.'};txt='Another class of 20 votes for favourite fruits. Will their graph be the *same* as ours?';}
      draw();st.setup=false;return txt;}};}
});
const SPN={red:['#ef4444','#ef4444','#ef4444','#ef4444'],mix:['#ef4444','#2f7de1','#ef4444','#2f7de1'],none:['#2f7de1','#ffc04d','#2f7de1','#ffc04d']};
})();
