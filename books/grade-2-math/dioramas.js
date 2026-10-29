/* The Interactive Classroom: Grade 2 Math — story dioramas: each word problem is acted out with real things that appear and move as the numbers are read. */
(function(){
"use strict";
const P=window.PM;if(!P||!P.DIO)return;P.SCN=P.SCN||{};
const D=P.DIO,S=P.SET,{V,tween,burst,THREE}=P;const ST=()=>P.STAGE;
const story=(id,fn)=>{P.SCN[id]=P.SCN[id]||{steps:[]};P.SCN[id].steps[0]={scene:fn};};
const at=(sc,w,f,n)=>sc.on(w,f,n);
/* a picture prop (paper-tinted 3D figure); o.on = appear when that word is read */
const prop=(sc,n,x,z,o)=>{o=Object.assign({label:false,bare:true,tap:false},o||{});const p=sc.prop(n,x,z,o);if(o.on){p.visible=false;sc.on(o.on,()=>D.grow(p),o.nth);}if(o.hide)p.visible=false;return p;};
const wp=o=>o.getWorldPosition(new THREE.Vector3());
const put=(sc,o,x,z,opt)=>D.put(sc,o,x,z,opt);
const card=(sc,t,x,z,o)=>D.card(sc,t,x,z,Object.assign({h:.22},o||{}));
const pop=(sc,word,o,n)=>{o.visible=false;sc.on(word,()=>D.grow(o),n);return o;};
const boom=o=>burst(wp(o).add(V(0,.5,0)));
const disc=(sc,x,z,r,c,y)=>{const m=P.mk(new THREE.CylinderGeometry(r,r,.012,24),P.glow(c,.92,.25),0);m.position.set(x,y||.012,z);sc.g.add(m);return m;};
const fly=(o,x,y,z,h,dur)=>D.arc(o,x,y,z,h,dur);
const person=(sc,w,x,z,o)=>D.person(sc,w,x,z,o);
const kid=(sc,i,x,z,o)=>D.kid(sc,i,x,z,o);
const mode=(sc,k,m,ms)=>sc.mode(k,m,ms);
const say=(sc,o,t,ms)=>D.say(sc,o,t,ms);
const rise=(o,dy,dur)=>{const y0=o.position.y;return tween(dur||.8,k=>{o.position.y=y0+dy*k;});};
const turn=(o,a,dur)=>{const r0=o.rotation.y;return tween(dur||.5,k=>{o.rotation.y=r0+a*k;});};
const tint=(o,c)=>o.traverse(m=>{if(m.isMesh&&m.material&&!m.userData.ink&&!Array.isArray(m.material))m.material=P.paper(c,{mix:.15});});
const row=(n,x0,x1,f)=>{for(let i=0;i<n;i++)f(n>1?x0+(x1-x0)*i/(n-1):x0,i);};
const G0=(k,f)=>P.G('m2d'+k,f);const INKc=()=>'#26242c';
/* counting helpers: rows of things that pop in one by one, and number cards */
const grid=(sc,n,name,x0,z0,cols,dx,dz,s,o)=>{const a=[];for(let i=0;i<n;i++){const p=prop(sc,name,x0+(i%cols)*dx,z0+Math.floor(i/cols)*dz,Object.assign({s:s||.3},o||{}));a.push(p);}return a;};
const hidden=a=>{a.forEach(p=>p.visible=false);return a;};
const popAll=(sc,a,ms)=>a.forEach((p,i)=>sc.later(()=>{p.visible=true;D.grow(p,.35);},i*(ms||110)));
const num=(sc,t,x,z,o)=>{const c=card(sc,t,x,z,Object.assign({h:.24,col:'#1c4fb8'},o||{}));c.visible=true;D.grow(c);return c;};
const numOn=(sc,w,t,x,z,o,n)=>at(sc,w,()=>num(sc,t,x,z,o),n);

/* m01 · Robot Factory */
story('m01',sc=>{D.base(sc,'#dfe3ea');const belt=put(sc,P.mk(new THREE.BoxGeometry(3.2,.12,.4),P.paper('#495057')),0,-3.2,{y:.06});for(let i=0;i<8;i++)put(sc,P.mk(new THREE.CylinderGeometry(.06,.06,.42,10),P.paper('#adb5bd')),-1.5+i*.43,-3.2,{y:.06}).rotation.x=Math.PI/2;
  const mach=P.STAGE.prop('box',{s:1.0,p3:{c:'#ffd43b'}});put(sc,mach,-1.8,-3.2);
  const red=hidden(grid(sc,7,'robot',-1.6,-2.55,7,.3,0,.42,{p3:{c:'#e03131'}}));const blue=hidden(grid(sc,5,'robot',-1.6,-2.05,5,.3,0,.42,{p3:{c:'#1c7ed6'}}));
  at(sc,'7 red robots',()=>{popAll(sc,red);sc.later(()=>num(sc,'7',.65,-2.55),900);});
  at(sc,'5 blue robots',()=>{popAll(sc,blue);sc.later(()=>num(sc,'5',-.05,-2.05),700);});
  at(sc,'in all',()=>num(sc,'7 + 5 = ?',1.2,-1.7,{col:'#5f3dc4'}));
  at(sc,'makes 12',()=>{num(sc,'12',1.6,-2.3,{h:.34,col:'#2b8a3e'});red.concat(blue).forEach((r,i)=>sc.later(()=>ST().alive(r),i*60));});
  const truck=prop(sc,'truck',2.4,-1.6,{s:.6,hide:true});
  at(sc,'went to the shop',()=>{truck.visible=true;sc.move(truck,1.1,-1.6,1);red.slice(3).forEach((r,i)=>sc.later(()=>fly(r,1.0,.3,-1.6,.5,.7).then(()=>D.shrink(r)),300+i*200));sc.later(()=>sc.move(truck,2.6,-1.6,1.2),1500);});
  at(sc,'leaves 8',()=>num(sc,'12 − 4 = 8',.0,-1.6,{h:.26,col:'#c92a2a'}));
});
/* m02 · The Crayon Count */
story('m02',sc=>{D.base(sc,'#e9e2d6');const tb=put(sc,S.table({w:3.2,d:1.0}),0,-2.6);const box=prop(sc,'crayonbox',-1.6,-3.2,{s:.6,on:'giant box'});
  const packs=[];const pack=(x,z)=>{const g=new THREE.Group();for(let i=0;i<10;i++){const c=P.mk(new THREE.CylinderGeometry(.02,.02,.26,6),P.paper(['#e03131','#1c7ed6','#40c057','#fab005','#7950f2'][i%5],{mix:.1}));c.position.set(-.1+(i%5)*.05,.02+Math.floor(i/5)*.04,0);c.rotation.z=Math.PI/2;g.add(c);}
    const band=P.mk(new THREE.BoxGeometry(.06,.1,.26),P.paper('#495057'));band.position.y=.03;g.add(band);put(sc,g,x,z,{y:.38,hide:true});packs.push(g);return g;};
  for(let i=0;i<5;i++)pack(-1.1+i*.45,-2.7);
  at(sc,'packs of ten',()=>{D.grow(packs[0]);num(sc,'10',-1.1,-2.35,{h:.18});});
  at(sc,'3 full packs',()=>{[1,2].forEach(i=>sc.later(()=>D.grow(packs[i]),i*250));});
  const ones=hidden(grid(sc,7,'pencil',.9,-2.95,4,.16,.18,.22,{y:.38}));at(sc,'7 crayons',()=>popAll(sc,ones));
  at(sc,'3 tens and 7 ones',()=>{num(sc,'3 tens',-.65,-2.1,{h:.2});num(sc,'7 ones',1.15,-2.1,{h:.2});});
  at(sc,'37 crayons',()=>num(sc,'37',.3,-1.7,{h:.34,col:'#2b8a3e'}));
  const lee=person(sc,'teacher',1.75,-2.0,{ry:-1,on:'Ms. Lee'});
  at(sc,'2 more packs',()=>{[3,4].forEach((i,k)=>sc.later(()=>{D.grow(packs[i]);},k*300));mode(sc,lee,'point',2000);});
  at(sc,'57 crayons',()=>num(sc,'5 tens + 7 ones = 57',.0,-1.55,{h:.24,col:'#c92a2a'}));
});
/* m03 · The School Fair */
story('m03',sc=>{D.base(sc,'#cfe3b0');const stand=put(sc,S.table({w:1.5,d:.6,c:'#ffe066'}),-.8,-3.1);put(sc,S.sign('LEMONADE',{h:.2,col:'#e67700'}),-.8,-3.45);const jug=prop(sc,'jug',-.8,-3.1,{s:.35,y:.38});
  const k=[kid(sc,0,-1.2,-3.5,{ry:0}),kid(sc,3,-.4,-3.5,{ry:0})];
  const cupsAM=hidden(grid(sc,10,'lemonade',-1.9,-2.45,10,.13,0,.18));const cupsPM=hidden(grid(sc,10,'lemonade',-1.9,-2.15,10,.13,0,.18));
  at(sc,'28 cups',()=>{popAll(sc,cupsAM,60);num(sc,'28',-1.55,-2.75,{h:.2});});
  at(sc,'35 cups',()=>{popAll(sc,cupsPM,60);num(sc,'35',-1.05,-2.75,{h:.2});});
  const wb=put(sc,P.mk(new THREE.BoxGeometry(1.3,.9,.04),P.paper('#ffffff',{mix:0})),1.25,-2.6,{y:.45});
  at(sc,'lined up',()=>{num(sc,'  28',1.3,-2.55,{h:.2,y:.62,tilt:0,stand:false});num(sc,'+ 35',1.3,-2.55,{h:.2,y:.4,tilt:0,stand:false});});
  at(sc,'carried 1 ten',()=>{num(sc,'1',1.12,-2.55,{h:.14,y:.82,tilt:0,stand:false,col:'#c92a2a'});num(sc,'3',1.42,-2.55,{h:.2,y:.13,tilt:0,stand:false,col:'#2b8a3e'});});
  at(sc,'6 tens',()=>num(sc,'6',1.22,-2.55,{h:.2,y:.13,tilt:0,stand:false,col:'#2b8a3e'}));
  at(sc,'We sold 63 cups',()=>{num(sc,'63 cups!',0,-1.65,{h:.3,col:'#c92a2a'});k.forEach(x=>mode(sc,x,'cheer'));});
});
/* m04 · Gumball Machines */
story('m04',sc=>{D.base(sc,'#f3e3c3');const door=put(sc,S.door(),0,-3.6);
  const ma=prop(sc,'gumball machine',-1.2,-2.9,{s:.8,p3:{c:'#e03131'}}),mb=prop(sc,'gumball machine',.0,-2.9,{s:.8,p3:{c:'#1c7ed6'}}),mc=prop(sc,'gumball machine',1.2,-2.9,{s:.8,p3:{c:'#40c057'}});
  numOn(sc,'Machine A','A: 61',-1.2,-2.4,{h:.2});numOn(sc,'Machine B','B: 43',0,-2.4,{h:.2});
  at(sc,'How many more',()=>num(sc,'61 − 43 = ?',1.2,-2.35,{h:.2,col:'#5f3dc4'}));
  const tens=hidden(grid(sc,6,'block',-1.8,-1.8,6,.2,0,.26,{p3:{c:'#ffd43b'}}));const one=hidden(grid(sc,1,'block',-.4,-1.8,1,.2,0,.14,{p3:{c:'#ff8787'}}));
  at(sc,'We subtract',()=>{popAll(sc,tens);popAll(sc,one);});
  at(sc,'Not enough ones',()=>num(sc,'1 − 3 ?',.4,-1.65,{h:.18,col:'#c92a2a'}));
  const ten10=hidden(grid(sc,10,'block',-.4,-1.6,5,.15,.15,.14,{p3:{c:'#ff8787'}}));
  at(sc,'trade 1 ten',()=>{D.shrink(tens[5]);popAll(sc,ten10,80);});
  at(sc,'11 − 3 = 8',()=>num(sc,'11 − 3 = 8',.95,-1.7,{h:.2}));
  at(sc,'18 more',()=>{num(sc,'18 more!',0,-2.15,{h:.3,col:'#2b8a3e'});ST().alive(ma,true);});
});
/* m05 · The Stamp Club */
story('m05',sc=>{D.base(sc,'#e6dccb');const tb=put(sc,S.table({w:2.6,d:1.0}),0,-2.7);
  const all=[];for(let i=0;i<20;i++){const s=S.stamp();put(sc,s,-1.1+(i%10)*.24,-2.95+Math.floor(i/10)*.28,{y:.38,s:1.1});all.push(s);}
  numOn(sc,'75 stamps','75 stamps',-1.6,-3.4,{h:.2});
  const gl=person(sc,'girl',-1.7,-2.2,{ry:.6,on:'girls'});const by=person(sc,'boy',1.7,-2.2,{ry:-.6,on:'boys'});
  at(sc,'belong to the girls',()=>{all.slice(0,10).forEach((s,i)=>sc.later(()=>sc.move(s,-1.2+(i%5)*.12,-2.5+Math.floor(i/5)*.14,.6),i*60));num(sc,'37',-1.2,-2.1,{h:.2,col:'#e64980'});});
  at(sc,'75 − 37 = 38',()=>{all.slice(10).forEach((s,i)=>sc.later(()=>sc.move(s,.8+(i%5)*.12,-2.5+Math.floor(i/5)*.14,.6),i*60));num(sc,'38',1.2,-2.1,{h:.2,col:'#1c7ed6'});});
  const nad=kid(sc,1,0,-2.0,{ry:Math.PI,on:'Nadia'});at(sc,'38 + 37 = 75',()=>num(sc,'38 + 37 = 75 ✓',0,-1.6,{h:.2,col:'#2b8a3e'}));
  const ld=person(sc,'teacher',0,-3.45,{ry:0,on:'club leader'});at(sc,'fact family',()=>{['37 + 38 = 75','38 + 37 = 75','75 − 37 = 38','75 − 38 = 37'].forEach((t,i)=>sc.later(()=>num(sc,t,-1.5+i*1.0,-1.65,{h:.14,col:'#5f3dc4'}),i*400));});
});
/* m06 · Camp Week */
story('m06',sc=>{D.base(sc,'#bfe0a0');put(sc,S.tent({c:'#2b8a3e'}),-1.6,-3.2);put(sc,S.pine({s:.8}),1.85,-3.4);const pool=put(sc,S.water(1.2,.7),1.0,-2.9);
  const cal=new THREE.Group();for(let i=0;i<5;i++){const c=P.card(String(8+i),{h:.16,stand:false,tilt:-.6,col:'#1c4fb8'});c.position.set(i*.24,.05,0);cal.add(c);c.visible=false;}put(sc,cal,-1.0,-2.0);
  at(sc,'July 8',()=>{cal.children[0].visible=true;num(sc,'July',-1.35,-1.65,{h:.16});});
  at(sc,'July 12',()=>cal.children.forEach((c,i)=>sc.later(()=>{c.visible=true;D.grow(c);},i*150)));
  at(sc,'5 days',()=>num(sc,'5 days',.2,-1.65,{h:.18,col:'#2b8a3e'}));
  const bus=prop(sc,'school bus',-2.4,-2.5,{s:.7,hide:true});const clk=put(sc,S.clock(),-.4,-3.4,{s:1.1});const set=(h,m)=>{const H=clk.userData.hands;H[0].rotation.z=-((h%12)+m/60)/12*Math.PI*2;H[1].rotation.z=-m/60*Math.PI*2;};set(8,0);
  at(sc,'8:15',()=>{set(8,15);bus.visible=true;sc.move(bus,-.9,-2.5,1.2);num(sc,'8:15',-.4,-2.95,{h:.18});});
  at(sc,'10:30',()=>{set(10,30);num(sc,'10:30',.6,-2.4,{h:.18});const k=kid(sc,3,1.0,-2.9,{s:.6,mode:'swim'});});
  at(sc,'11:30',()=>{set(11,30);num(sc,'11:30 · 1 hour',1.3,-2.35,{h:.16,col:'#2b8a3e'});});
  const th=prop(sc,'thermometer',.2,-3.2,{s:.6,on:'thermometer'});at(sc,'28°C',()=>num(sc,'28 °C',.2,-2.8,{h:.2,col:'#e03131'}));
  const cn=person(sc,'teacher',.3,-2.2,{ry:.4,on:'counsellor'});at(sc,'Hats on',()=>{say(sc,cn,'Hats on! Drink water!',2600);sc.wear(cn,'hat');});
});
/* m07 · Worm Race */
story('m07',sc=>{D.base(sc,'#cfd4da');sc.fx('rain',{x:0,z:-2.5,w:4,d:2,h:1.5});
  const ben=person(sc,'boy',-1.6,-2.2,{ry:.8});
  const W=[['pink','#f783ac',.7],['brown','#a0785a',.95],['tiny','#ffa8c5',.4]].map(([n,c,L],i)=>{const w=prop(sc,'worm',-.3,-3.1+i*.5,{s:.5,p3:{c}});w.scale.x*=L/.5;const r=prop(sc,'ruler',.3,-3.0+i*.5,{s:.9,hide:true,p3:{l:1}});return {w,r};});
  at(sc,'three worms',()=>W.forEach(o=>ST().alive(o.w)));
  at(sc,'ruler',()=>W.forEach((o,i)=>sc.later(()=>{o.r.visible=true;D.grow(o.r);},i*200)));
  numOn(sc,'7 cm','7 cm',1.4,-3.1,{h:.18,col:'#d6336c'});numOn(sc,'9 cm','more than 9 cm',1.4,-2.6,{h:.16,col:'#8a5a32'});numOn(sc,'4 cm','4 cm',1.4,-2.1,{h:.18,col:'#e64980'});
  at(sc,'5 cm longer',()=>{num(sc,'9 − 4 = 5 cm longer',0,-1.6,{h:.18,col:'#2b8a3e'});say(sc,ben,'5 cm longer!',2400);});
  at(sc,'back in the garden',()=>{W.forEach(o=>D.shrink(o.r));put(sc,S.bush({s:.8}),-1.6,-3.3);W.forEach((o,i)=>sc.move(o.w,-1.5+i*.15,-3.2,1.2));});
});
/* m08 · The Quilt Patch */
story('m08',sc=>{D.base(sc,'#eadfcf');const gm=person(sc,'grandma',-1.6,-2.8,{ry:.8});const ch=put(sc,S.chair({c:'#c0eb75'}),-1.6,-2.95,{s:1.3});gm.position.y=.05;
  const patches=[];for(let r=0;r<3;r++)for(let c=0;c<4;c++){const p=P.mk(new THREE.BoxGeometry(.3,.025,.3),P.paper(['#ff8787','#74c0fc','#ffd43b','#8ce99a'][(r+c)%4],{mix:.15}));p.position.set(-.3+c*.32,.015,-3.0+r*.32);p.visible=false;sc.g.add(p);patches.push(p);}
  at(sc,'square patches',()=>popAll(sc,patches.slice(0,4),150));
  at(sc,'4 squares long',()=>num(sc,'4 long',.2,-3.45,{h:.16}));at(sc,'3 squares wide',()=>num(sc,'3 wide',-.7,-2.7,{h:.16}));
  at(sc,'12 patches',()=>{popAll(sc,patches.slice(4),110);for(let i=0;i<12;i++)sc.later(()=>{const c=P.card(String(i+1),{h:.1,stand:false,tilt:-1.2});c.position.set(-.3+(i%4)*.32,.03,-3.0+Math.floor(i/4)*.32);sc.g.add(c);},i*110+300);});
  at(sc,'area',()=>num(sc,'Area = 12 squares',1.35,-3.2,{h:.17,col:'#2b8a3e'}));
  at(sc,'red ribbon',()=>D.ribbon(sc,[[-.46,.04,-3.16],[.94,.04,-3.16],[.94,.04,-2.2],[-.46,.04,-2.2],[-.46,.04,-3.16]],'#e03131',{w:.04,up:V(0,0,1),dur:2,seg:120}));
  at(sc,'perimeter',()=>num(sc,'Perimeter = 14 units',1.35,-2.3,{h:.17,col:'#c92a2a'}));
});
/* m09 · The Piggy Bank Count */
story('m09',sc=>{D.base(sc,'#f3e6f2');const tb=put(sc,S.table({w:2.6,d:1.0}),0,-2.7);const pig=prop(sc,'pig',-1.4,-2.9,{s:.5,y:.38});
  const zoe=kid(sc,1,-1.2,-2.0,{ry:.4});const dad=person(sc,'dad',1.6,-2.1,{ry:-.7,on:'Dad'});
  const coin=(r,c,x,lab)=>{const g=new THREE.Group();const m=P.mk(new THREE.CylinderGeometry(r,r,.025,22),P.paper(c,{mix:.05}));g.add(m);const L=P.card(lab,{h:.09,stand:false,tilt:-1.3});L.position.y=.02;g.add(L);put(sc,g,-1.3,-2.8,{y:.4,hide:true});return g;};
  const cs=[coin(.12,'#d0c08a',-.8,'$2'),coin(.11,'#fcc419',0,'$1'),coin(.09,'#ced4da',0,'25¢'),coin(.09,'#ced4da',0,'25¢'),coin(.065,'#ced4da',0,'10¢'),coin(.065,'#ced4da',0,'10¢'),coin(.065,'#ced4da',0,'10¢'),coin(.075,'#ced4da',0,'5¢')];
  at(sc,'spilled out',()=>{ST().alive(pig,true);cs.forEach((c,i)=>{c.visible=true;fly(c,-.9+i*.27,.4,-2.6+(i%2)*.15,.4,.6+i*.05);});});
  at(sc,'Count the big ones',()=>say(sc,dad,'Count the big ones first!',2600));
  const run=['$2','$3','$3.25','$3.50','$3.60','$3.70','$3.80','$3.85'];let k=0;const step=()=>{if(k<cs.length){const i=k++;const c=cs[i];c.position.y=.55;num(sc,run[i],c.position.x,-2.25,{h:.12,col:'#2b8a3e'});}};
  at(sc,'2, $3',()=>{step();sc.later(step,300);});at(sc,'25, 50',()=>{step();sc.later(step,300);});at(sc,'60, 70, 80',()=>{step();sc.later(step,300);sc.later(step,600);});at(sc,'then 85',()=>step());
  at(sc,'Zoe had',()=>num(sc,'$3.85',0,-1.65,{h:.3,col:'#c92a2a'}));
  const kite=prop(sc,'kite',1.2,-3.1,{s:.6,on:'new kite'});at(sc,'Almost',()=>{say(sc,dad,'Almost!',1800);mode(sc,zoe,'think');});
});
/* m10 · The Toy Sale */
story('m10',sc=>{D.base(sc,'#e9e2d6');const tb=put(sc,S.table({w:1.8,d:.8,c:'#ffe066'}),-.5,-3.0);put(sc,S.sign('Toy Sale',{h:.2,col:'#e64980'}),-1.5,-3.5);
  const ball=prop(sc,'ball',-.9,-3.0,{s:.35,y:.38});const car=P.STAGE.prop('car',{s:.4});put(sc,car,-.2,-3.0,{y:.38});
  numOn(sc,'38','38¢',-.9,-2.6,{h:.16});numOn(sc,'27','27¢',-.2,-2.6,{h:.16});
  const sue=person(sc,'girl',-.6,-1.9,{ry:Math.PI,on:'Sue'});at(sc,'both',()=>say(sc,sue,'I want both!',2000));
  at(sc,'65¢',()=>num(sc,'38¢ + 27¢ = 65¢',.9,-2.3,{h:.17,col:'#5f3dc4'}),1);
  const q=[];at(sc,'4 quarters',()=>{for(let i=0;i<4;i++){const c=prop(sc,'coin',-.8+i*.2,-2.2,{s:.18,y:.4});q.push(c);fly(c,-.7+i*.12,.42,-2.7,.3,.7);}num(sc,'$1 = 100¢',.9,-1.9,{h:.16});});
  const cash=person(sc,'woman',.4,-3.4,{ry:0,on:'cashier'});
  at(sc,'100¢ − 65¢ = 35¢',()=>num(sc,'100¢ − 65¢ = 35¢',.9,-1.6,{h:.17,col:'#c92a2a'}));
  at(sc,'a quarter and a dime',()=>{const a=prop(sc,'coin',.3,-3.0,{s:.2,y:.4}),b=prop(sc,'coin',.45,-3.0,{s:.14,y:.4});fly(a,-.6,.9,-1.95,.4,.8);fly(b,-.5,.9,-1.95,.4,.8);});
  at(sc,'treat',()=>{mode(sc,sue,'cheer');fly(ball,-.8,.6,-1.95,.5,.8);fly(car,-.4,.6,-1.95,.5,.8);});
});
/* m11 · The Shape Parade */
story('m11',sc=>{D.base(sc,'#e7e0f5');const path=D.ribbon(sc,[[-1.9,.02,-2.6],[0,.02,-2.6],[1.9,.02,-2.6]],'#ffe8cc',{w:.6,up:V(0,1,0)});path.userData.full();
  const hat=(n,c)=>{const sh=new THREE.Shape();for(let i=0;i<n;i++){const a=Math.PI/2+i/n*Math.PI*2;const x=Math.cos(a)*.13,y=Math.sin(a)*.13;i?sh.lineTo(x,y):sh.moveTo(x,y);}sh.closePath();const m=P.mk(new THREE.ExtrudeGeometry(sh,{depth:.025,bevelEnabled:false}),P.paper(c,{mix:.1}));return m;};
  const P4=[['Omar',3,'#e8590c','triangle · 3 sides',-1.4],['Lin',5,'#2b8a3e','pentagon · 5 sides',-.45],['Priya',6,'#f59f00','hexagon · 6 sides',.5],['Mr. Diaz',8,'#e03131','octagon · 8 sides',1.45]];
  P4.forEach(([who,n,c,lab,x],i)=>{const k=who==='Mr. Diaz'?person(sc,'man',-2.3,-2.6,{ry:Math.PI/2,on:who}):kid(sc,[2,1,1,0][i],-2.3,-2.6,{ry:Math.PI/2,on:who});
    at(sc,who,()=>{D.walk(sc,k,x,-2.6,1.2,'cheer');sc.later(()=>{const h=hat(n,c);k.userData.head.add(h);h.position.set(0,.22,0);D.grow(h);num(sc,lab,x,-2.05,{h:.13,col:c});},1200);});});
  at(sc,'vertices',()=>num(sc,'3 corners = 3 vertices',-1.2,-3.35,{h:.13,col:'#495057'}));
  at(sc,'honeycomb',()=>{for(let i=0;i<3;i++){const h=hat(6,'#ffd43b');h.rotation.x=-Math.PI/2;h.position.set(.25+i*.27,.02,-3.2+(i%2)*.23);sc.g.add(h);D.grow(h);}});
  at(sc,'stop sign',()=>{const s=put(sc,S.sign('STOP',{h:.22,col:'#e03131'}),1.85,-3.2);D.grow(s);});
  at(sc,'snack time',()=>{say(sc,sc.g.children.find(o=>o.userData&&o.userData.actor&&o.position.x>1.3)||sc.g,'Stop! Snack time!',2400);});
});
/* m12 · The Treasure Map */
story('m12',sc=>{D.base(sc,'#bfe0a0');for(let i=0;i<6;i++)put(sc,P.mk(new THREE.BoxGeometry(.005,.005,2.2),P.paper('#5c940d')),-1.75+i*.7,-2.5,{y:.016});for(let i=0;i<4;i++)put(sc,P.mk(new THREE.BoxGeometry(4,.005,.005),P.paper('#5c940d')),0,-3.4+i*.6,{y:.016});
  const slide=prop(sc,'slide',-1.4,-1.8,{s:.7});const tree=put(sc,S.tree({s:1}),1.4,-3.2);const bench=put(sc,S.bench(),1.4,-2.85);
  const ana=kid(sc,1,-.6,-3.2,{ry:.4});const chest=prop(sc,'treasure chest',1.4,-3.1,{s:.45});
  const map=prop(sc,'map',-.3,-3.1,{s:.4,on:'drew a map'});const bro=kid(sc,0,-1.4,-1.6,{ry:Math.PI,on:'her brother'});
  at(sc,'Start at the slide',()=>D.walk(sc,bro,-1.4,-2.0,.6,'point'));
  at(sc,'2 squares forward',()=>{D.walk(sc,bro,-1.4,-3.2,1.4,'idle');D.ribbon(sc,[[-1.4,.05,-2.0],[-1.4,.05,-2.6],[-1.4,.05,-3.2]],'#e03131',{w:.05,up:V(0,1,0),dur:1.4});});
  at(sc,'Turn right',()=>{bro.userData.ry=Math.PI/2;});
  at(sc,'3 squares',()=>{D.walk(sc,bro,.7,-3.2,1.8,'idle');D.ribbon(sc,[[-1.4,.05,-3.2],[-.3,.05,-3.2],[.7,.05,-3.2]],'#e03131',{w:.05,up:V(0,1,0),dur:1.8});});
  at(sc,'found it',()=>{boom(chest);mode(sc,bro,'cheer');});
  const tans=[];at(sc,'tangram',()=>{['#e03131','#1c7ed6','#fab005','#40c057','#7950f2'].forEach((c,i)=>{const sh=new THREE.Shape();sh.moveTo(0,0);sh.lineTo(.2,0);sh.lineTo(0,.2);sh.closePath();const m=P.mk(new THREE.ExtrudeGeometry(sh,{depth:.02,bevelEnabled:false}),P.paper(c,{mix:.1}));m.rotation.x=-Math.PI/2;m.position.set(-.1+i*.2,.02,-2.0);sc.g.add(m);tans.push(m);D.grow(m);});});
  const shape=(k)=>tans.forEach((m,i)=>{const L=[[[0,0,0],[.2,0,1],[.1,.2,2],[.3,.15,3],[.2,-.15,4]],[[0,0,0],[.25,0,.5],[.5,0,1],[.2,.25,2],[.35,-.2,3]],[[0,0,2],[0,.2,2.5],[0,.4,3],[.15,.1,4],[-.15,.1,5]]][k][i];const p0=m.position.clone();tween(.8,q=>{m.position.set(p0.x+(-.1+L[0]-p0.x)*q,.02,p0.z+(-2.0-L[1]-p0.z)*q);m.rotation.z=L[2]*q;});});
  at(sc,'a cat',()=>shape(0));at(sc,'a boat',()=>shape(1));at(sc,'a rocket',()=>shape(2));
});
/* m13 · The Butterfly Painting */
story('m13',sc=>{D.base(sc,'#f3e6f2');const tb=put(sc,S.table({w:2.2,d:1.0}),0,-2.7);const kai=kid(sc,0,-1.4,-2.2,{ry:.7});
  const paper=new THREE.Group();const L=P.mk(new THREE.BoxGeometry(.6,.01,.8),P.paper('#ffffff',{mix:0}));L.position.x=-.3;const Rg=new THREE.Group();const R=P.mk(new THREE.BoxGeometry(.6,.01,.8),P.paper('#ffffff',{mix:0}));R.position.x=.3;Rg.add(R);paper.add(L,Rg);put(sc,paper,.1,-2.7,{y:.39});
  const blob=(par,x,z,c,r)=>{const b=P.mk(new THREE.CylinderGeometry(r,r,.012,18),P.paper(c,{mix:.05}));b.position.set(x,.012,z);par.add(b);return b;};
  const blobs=[];at(sc,'blobs of colour',()=>{[[-.15,-.15,'#e64980',.1],[-.2,.15,'#7950f2',.12],[-.1,0,'#fab005',.06],[-.4,-.25,'#4dabf7',.07]].forEach(([x,z,c,r],i)=>sc.later(()=>{blobs.push(blob(paper,x,z,c,r));},i*250));mode(sc,kai,'pull',2000);});
  at(sc,'folded',()=>tween(1,k=>{Rg.rotation.z=k*Math.PI*.98;}));
  at(sc,'opened',()=>{tween(1,k=>{Rg.rotation.z=Math.PI*.98*(1-k);}).then(()=>{[[.15,-.15,'#e64980',.1],[.2,.15,'#7950f2',.12],[.1,0,'#fab005',.06],[.4,-.25,'#4dabf7',.07]].forEach(([x,z,c,r])=>blob(paper,x,z,c,r));});});
  const line=put(sc,P.mk(new THREE.BoxGeometry(.012,.012,.9),P.paper('#e03131',{mix:0,flat:true})),.1,-2.7,{y:.41,hide:true});
  at(sc,'like a mirror',()=>{line.visible=true;});const sis=kid(sc,5,1.4,-2.2,{ry:-.7,on:'his sister'});
  at(sc,'A butterfly',()=>{say(sc,sis,'A butterfly!',2000);const b=prop(sc,'butterfly',.1,-2.7,{s:.5,y:.6});D.bob(sc,b,.1,3);});
  at(sc,'line of symmetry',()=>{num(sc,'line of symmetry',.1,-3.25,{h:.16,col:'#e03131'});});
  at(sc,'a heart',()=>prop(sc,'heart',-1.2,-3.3,{s:.3}));at(sc,'a robot',()=>prop(sc,'robot',-.5,-3.35,{s:.3}));at(sc,'a fish',()=>prop(sc,'fish',1.3,-3.3,{s:.3}));
});
/* m14 · Marshmallow Builders */
story('m14',sc=>{D.base(sc,'#e9e2d6');const tb=put(sc,S.table({w:3.2,d:1.0}),0,-2.75);
  const skel=(verts,edges,x,col)=>{const g=new THREE.Group();const mm=verts.map(v=>{const m=P.mk(new THREE.CylinderGeometry(.04,.04,.05,12),P.paper('#ffffff',{mix:0}));m.position.set(...v);g.add(m);m.visible=false;return m;});
    const st=edges.map(([a,b])=>{const A=V(...verts[a]),Bv=V(...verts[b]);const d=A.distanceTo(Bv);const s=P.mk(new THREE.CylinderGeometry(.012,.012,d,6),P.paper(col,{mix:.1}));s.position.copy(A).add(Bv).multiplyScalar(.5);s.quaternion.setFromUnitVectors(V(0,1,0),Bv.clone().sub(A).normalize());g.add(s);s.visible=false;return s;});
    put(sc,g,x,-2.75,{y:.4});return {mm,st,g};};
  const c=.3,cube=skel([[-c/2,0,-c/2],[c/2,0,-c/2],[c/2,0,c/2],[-c/2,0,c/2],[-c/2,c,-c/2],[c/2,c,-c/2],[c/2,c,c/2],[-c/2,c,c/2]],[[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]],-1.0,'#e64980');
  const pyr=skel([[-c/2,0,-c/2],[c/2,0,-c/2],[c/2,0,c/2],[-c/2,0,c/2],[0,c*1.1,0]],[[0,1],[1,2],[2,3],[3,0],[0,4],[1,4],[2,4],[3,4]],0,'#4dabf7');
  const pri=skel([[-c/2,0,-c/2],[c/2,0,-c/2],[0,0,c/2],[-c/2,c,-c/2],[c/2,c,-c/2],[0,c,c/2]],[[0,1],[1,2],[2,0],[3,4],[4,5],[5,3],[0,3],[1,4],[2,5]],1.0,'#40c057');
  const build=(o,lab,x)=>{o.mm.forEach((m,i)=>sc.later(()=>{m.visible=true;D.grow(m,.3);},i*100));o.st.forEach((s,i)=>sc.later(()=>{s.visible=true;},o.mm.length*100+i*80));sc.later(()=>num(sc,lab,x,-2.15,{h:.13}),900);};
  const jun=kid(sc,0,-1.0,-3.45,{ry:0,on:'Jun'}),eva=kid(sc,1,0,-3.45,{ry:0,on:'Eva'}),me=kid(sc,3,1.0,-3.45,{ry:0});
  at(sc,'cube',()=>build(cube,'cube · 12 straws, 8 marshmallows',-1.0));at(sc,'square pyramid',()=>build(pyr,'pyramid · 8 straws, 5 marshmallows',0));at(sc,'triangular prism',()=>build(pri,'prism · 9 straws, 6 marshmallows',1.0));
  at(sc,'ate the extra',()=>[jun,eva,me].forEach(k=>{k.visible=true;mode(sc,k,'eat');}));at(sc,'Yum',()=>[jun,eva,me].forEach(k=>mode(sc,k,'cheer')));
});

/* m15 · The Alien Picnic */
story('m15',sc=>{D.base(sc,'#bfe0a0');put(sc,S.tree({s:.9}),-1.85,-3.3);put(sc,P.mk(new THREE.BoxGeometry(1.6,.012,1.0),P.paper('#ff8787',{mix:.25})),0,-2.6,{y:.008});
  const ufo=new THREE.Group();const d=P.mk(new THREE.SphereGeometry(.45,24,10),P.paper('#adb5bd'));d.scale.set(1,.25,1);ufo.add(d);const dm=P.mk(new THREE.SphereGeometry(.2,18,10,0,Math.PI*2,0,Math.PI/2),P.glow('#a5d8ff',.7,.3));dm.position.y=.08;ufo.add(dm);put(sc,ufo,1.5,-3.3,{y:1.5});
  const al=[0,1,2].map(i=>prop(sc,'alien',-.5+i*.5,-2.75,{s:.5,hide:true,p3:{c:['#69db7c','#9775fa','#4dabf7'][i]}}));
  at(sc,'landed',()=>{tween(1.2,k=>ufo.position.y=1.5-k*1.2);al.forEach((a,i)=>sc.later(()=>{a.visible=true;fly(a,a.position.x,0,a.position.z,.6,.7);},1200+i*200));});
  at(sc,'3 eyes',()=>al.forEach(a=>boom(a)));
  at(sc,'3 + 3 + 3 = 9',()=>num(sc,'3 + 3 + 3 = 9',-1.2,-1.8,{h:.17}));at(sc,'3 × 3 = 9',()=>num(sc,'3 × 3 = 9',-1.2,-1.5,{h:.2,col:'#c92a2a'}));
  const ck=[];at(sc,'4 cookies',()=>al.forEach((a,i)=>{for(let j=0;j<4;j++){const c=prop(sc,'cookie',a.position.x-.15+j*.1,-2.35,{s:.12});ck.push(c);}}));
  at(sc,'4, 8, 12',()=>{['4','8','12'].forEach((t,i)=>sc.later(()=>num(sc,t,-.5+i*.5,-2.05,{h:.16,col:'#2b8a3e'}),i*300));});
  at(sc,'Earth food',()=>al.forEach(a=>say(sc,a,'Beep!',1800)));
  at(sc,'zoomed home',()=>{al.forEach(a=>D.shrink(a));sc.later(()=>tween(1.5,k=>{ufo.position.y=.3+k*2;ufo.position.x=1.5+k;}),500);});
});
/* m16 · The Candy Shop Window */
story('m16',sc=>{D.base(sc,'#f3e6f2');put(sc,S.shop?S.shop():P.STAGE.prop('shop',{s:1.2}),-1.5,-3.3);const shelf=put(sc,S.shelf(),.6,-3.45,{s:1.1});
  const lol=hidden(grid(sc,21,'lollipop',-.2,-3.3,7,.16,.0,.2,{y:.0}));lol.forEach((l,i)=>{l.position.z=-3.3+Math.floor(i/7)*.14;l.position.y=.04;});
  at(sc,'3 rows of 7',()=>popAll(sc,lol,70));at(sc,'7, 14, 21',()=>['7','14','21'].forEach((t,i)=>sc.later(()=>num(sc,t,1.0,-3.3+i*.14,{h:.12}),i*350)));
  const jars=hidden(grid(sc,6,'jar',-1.2,-2.4,6,.32,0,.3));at(sc,'6 jars',()=>popAll(sc,jars,150));
  const chen=person(sc,'man',1.5,-2.2,{ry:-1,on:'Mr. Chen'});at(sc,'counts by nines',()=>{['9','18','27','36','45','54'].forEach((t,i)=>sc.later(()=>{num(sc,t,-1.2+i*.32,-2.05,{h:.12,col:'#c92a2a'});ST().alive(jars[i]);},i*300));});
  at(sc,'4 × 7 = 28',()=>{const bx=hidden(grid(sc,4,'gift',-1.0,-1.65,4,.4,0,.25));popAll(sc,bx);num(sc,'4 × 7 = 28 boxes',.9,-1.65,{h:.16,col:'#2b8a3e'});});
});
/* m17 · The Snowman Family */
story('m17',sc=>{D.base(sc,'#eef3f8');put(sc,S.house({w:.9,h:.55,d:.6}),-1.5,-3.35);sc.fx('snow',{x:0,z:-2.5,w:4,d:2,h:1.5});
  const sm=[];for(let i=0;i<6;i++){const s=sc.prop('snowman',-1.1+i*.5,-2.75,{s:.55});s.visible=false;sm.push(s);}
  at(sc,'6 snowmen',()=>popAll(sc,sm,200));
  at(sc,'carrot nose',()=>sm.forEach((s,i)=>sc.later(()=>{const c=prop(sc,'carrot',s.position.x,-2.62,{s:.1,y:.42});},i*120)));
  at(sc,'6 × 1 = 6',()=>num(sc,'6 × 1 = 6',1.3,-3.35,{h:.16}));
  at(sc,'stick arms',()=>sm.forEach((s,i)=>[-1,1].forEach(k=>{const st=P.mk(new THREE.CylinderGeometry(.008,.008,.22,5),P.paper('#8a6a4a'));st.position.set(s.position.x+k*.13,.33,-2.75);st.rotation.z=k*1.0;sc.g.add(st);D.grow(st);})));
  at(sc,'6 × 2 = 12',()=>num(sc,'6 × 2 = 12',1.3,-3.0,{h:.16}));at(sc,'6 × 0 = 0',()=>num(sc,'6 × 0 = 0',1.3,-2.25,{h:.18,col:'#c92a2a'}));
  const balls=[];at(sc,'3 rows of 4',()=>{for(let i=0;i<12;i++){const b=put(sc,P.mk(new THREE.SphereGeometry(.06,12,8),P.paper('#ffffff',{mix:0})),-1.0+(i%4)*.2,-2.05+Math.floor(i/4)*.17,{y:.06});balls.push(b);sc.later(()=>D.grow(b,.3),i*90);}});
  const sis=kid(sc,1,.4,-1.75,{ry:-1.2,on:'My sister'});at(sc,'from the side',()=>{say(sc,sis,'4 rows of 3!',2400);mode(sc,sis,'point');});
  at(sc,'Both ways make 12',()=>num(sc,'3 × 4 = 4 × 3 = 12',.0,-1.6,{h:.18,col:'#2b8a3e'}));
});
/* m18 · The Fish Bowls */
story('m18',sc=>{D.base(sc,'#e3f2f7');const tb=put(sc,S.table({w:2.8,d:.8}),0,-3.0);const rosa=person(sc,'woman',-1.6,-3.45,{ry:.3});
  const tank=put(sc,S.water(.7,.4),-1.0,-2.3,{y:.0});const fish=[];for(let i=0;i<12;i++){const f=prop(sc,'fish',-1.25+(i%4)*.15,-2.4+Math.floor(i/4)*.12,{s:.12,p3:{c:'#ff922b'}});fish.push(f);}
  numOn(sc,'12 goldfish','12',-1.0,-1.95,{h:.18});
  const bowls=[-.2,.4,1.0].map((x,i)=>prop(sc,'fishbowl',x,-3.0,{s:.4,y:.38,on:'3 new bowls'}));
  at(sc,'one in each bowl',()=>{let k=0;for(let r=0;r<4;r++)for(let b=0;b<3;b++){const f=fish[k++],i=k;sc.later(()=>fly(f,bowls[b].position.x+(r-1.5)*.04,.5,-3.0,.4,.5),i*220);}});
  at(sc,'Each bowl gets 4',()=>bowls.forEach((b,i)=>num(sc,'4',b.position.x,-2.6,{h:.16,col:'#2b8a3e'})));
  at(sc,'12 ÷ 3 = 4',()=>num(sc,'12 ÷ 3 = 4',1.4,-2.2,{h:.2,col:'#c92a2a'}),1);
  at(sc,'opposite of multiplication',()=>num(sc,'3 × 4 = 12',1.4,-1.85,{h:.16}));
  const tt=hidden(grid(sc,5,'turtle',-1.2,-1.65,5,.4,0,.22));at(sc,'5 turtles',()=>{popAll(sc,tt);tt.forEach((t,i)=>{for(let j=0;j<4;j++)sc.later(()=>{const fl=put(sc,P.mk(new THREE.BoxGeometry(.03,.006,.03),P.paper('#e8590c')),t.position.x-.06+j*.04,-1.5,{y:.01});},600+i*100);});num(sc,'20 ÷ 5 = 4',.9,-1.55,{h:.16});});
});
/* m19 · Pizza Night */
story('m19',sc=>{D.base(sc,'#eadfcf');const tb=put(sc,S.table({w:1.8,d:1.0}),0,-2.6);
  const pz=new THREE.Group();const slices=[];for(let i=0;i<4;i++){const s=new THREE.Group();const w=P.mk(G0('pzw'+i,()=>{const sh=new THREE.Shape();sh.moveTo(0,0);sh.absarc(0,0,.4,i*Math.PI/2,(i+1)*Math.PI/2,false);sh.lineTo(0,0);return new THREE.ExtrudeGeometry(sh,{depth:.04,bevelEnabled:false});}),P.paper('#ffd43b',{mix:.1}));w.rotation.x=-Math.PI/2;s.add(w);
    [[.15,.12],[.25,.25],[.1,.28]].forEach(([a,b])=>{const pp2=P.mk(new THREE.CylinderGeometry(.035,.035,.01,10),P.paper('#e03131'));const ang=i*Math.PI/2+Math.atan2(b,a);const r=Math.hypot(a,b);pp2.position.set(Math.cos(ang)*r,.045,-Math.sin(ang)*r);s.add(pp2);});pz.add(s);slices.push(s);}
  put(sc,pz,0,-2.6,{y:.4,on:'big round pizza'});
  at(sc,'4 equal parts',()=>{slices.forEach((s,i)=>{const a=i*Math.PI/2+Math.PI/4;tween(.6,k=>s.position.set(Math.cos(a)*.06*k,0,-Math.sin(a)*.06*k));});num(sc,'4 equal parts',1.3,-3.2,{h:.16});});
  at(sc,'one fourth',()=>num(sc,'1/4',1.3,-2.85,{h:.24,col:'#c92a2a'}));
  const fam=[kid(sc,3,-1.2,-2.2,{ry:.8}),kid(sc,1,-1.0,-3.2,{ry:.6}),person(sc,'dad',1.2,-2.2,{ry:-.8})];
  const eat=(k,i)=>{fly(slices[i],k.position.x*.6,.6,k.position.z+.1,.3,.7).then(()=>D.shrink(slices[i]));mode(sc,k,'eat',1600);};
  at(sc,'I ate 1 part',()=>eat(fam[0],0));at(sc,'my sister ate',()=>eat(fam[1],1));at(sc,'Dad ate',()=>eat(fam[2],2));
  at(sc,'three fourths',()=>num(sc,'3/4 eaten',1.3,-2.5,{h:.2,col:'#2b8a3e'}));
  const mom=person(sc,'mom',.9,-3.4,{ry:-.4,on:'Mom'});
  at(sc,'cut it in half',()=>{const s=slices[3];const h2=s.clone();h2.scale.set(.999,1,.999);sc.g.add(h2);h2.position.copy(s.position).add(pz.position);h2.position.y=.4;sc.later(()=>{fly(h2,.4,.0,-1.7,.4,.8);},400);});
  const dog=prop(sc,'dog',.6,-1.75,{s:.45,on:'the dog'});at(sc,'one eighth',()=>{num(sc,'1/8 for the dog!',-.3,-1.65,{h:.18,col:'#e8590c'});ST().alive(dog,true);});
});
/* m20 · The Bakery Count */
story('m20',sc=>{D.base(sc,'#f3e3c3');put(sc,S.counter(3.2),0,-3.4);const baker=person(sc,{c:'#f8f9fa',h:'#3b2314',st:'short',s:1.08,cap:'#ffffff'},-1.7,-2.8,{ry:.6});
  const q=[];for(let i=0;i<9;i++){const w=P.mk(G0('pq',()=>{const sh=new THREE.Shape();sh.moveTo(0,0);sh.absarc(0,0,.18,0,Math.PI/2,false);sh.lineTo(0,0);return new THREE.ExtrudeGeometry(sh,{depth:.05,bevelEnabled:false});}),P.paper('#d9a35a',{mix:.1}));w.rotation.x=-Math.PI/2;const g=new THREE.Group();g.add(w);put(sc,g,-1.1+i*.27,-3.35,{y:.37,hide:true});g.rotation.y=i*.7;q.push(g);}
  at(sc,'9 fourths',()=>popAll(sc,q,120));
  at(sc,'make 1 whole',()=>{q.slice(0,4).forEach((p,i)=>{p.rotation.y=i*Math.PI/2;sc.move(p,-.9,-2.6,.6);});num(sc,'4/4 = 1',-.9,-2.2,{h:.16});});
  at(sc,'make 2 wholes',()=>{q.slice(4,8).forEach((p,i)=>{p.rotation.y=i*Math.PI/2;sc.move(p,-.2,-2.6,.6);});num(sc,'8/4 = 2',-.2,-2.2,{h:.16});});
  at(sc,'2 wholes and 1 fourth',()=>num(sc,'9/4 = 2 and 1/4',.9,-2.6,{h:.18,col:'#c92a2a'}));
  const loaves=hidden(grid(sc,7,'bread',-1.0,-1.75,7,.3,0,.18));at(sc,'7 halves',()=>popAll(sc,loaves,100));
  at(sc,'3 wholes and 1 half',()=>num(sc,'7 halves = 3½',1.4,-1.75,{h:.18,col:'#2b8a3e'}));
  const box=prop(sc,'box',1.6,-2.6,{s:.4,on:'food bank'});at(sc,'food bank',()=>{loaves.forEach((l,i)=>sc.later(()=>fly(l,1.6,.2,-2.6,.4,.6).then(()=>D.shrink(l)),i*80));num(sc,'Food Bank',1.6,-2.2,{h:.14,col:'#e8590c'});});
});
/* m21 · The Lemonade Stand */
story('m21',sc=>{D.base(sc,'#cfe3b0');const st=put(sc,S.table({w:1.6,d:.7,c:'#ffe066'}),0,-3.0);put(sc,S.sign('Lemonade 25¢',{h:.18,col:'#e67700'}),-1.3,-3.4);
  const nico=kid(sc,2,-.9,-2.4,{ry:.6});const jug=prop(sc,'jug',.2,-3.0,{s:.6,y:.38,p3:{fill:.02}});const cup=prop(sc,'cup',-.4,-2.9,{s:.25,y:.38});
  const fills=[];const lv=new THREE.Group();put(sc,lv,0,0);
  let n=0;const pour=()=>{n++;fly(cup,.1,.85,-3.0,.2,.4).then(()=>{D.ribbon(sc,[[.12,.85,-3.0],[.18,.75,-3.0],[.2,.55,-3.0]],'#ffe066',{w:.03,dur:.4});num(sc,String(n),-.6+n*.18,-2.55,{h:.14});fly(cup,-.4,.38,-2.9,.2,.4);});};
  at(sc,'He pours',()=>{for(let i=0;i<5;i++)sc.later(pour,i*900);});
  at(sc,'holds 5 cups',()=>{const j2=prop(sc,'jug',.2,-3.0,{s:.6,y:.38});D.shrink(jug);num(sc,'5 cups',.2,-3.4,{h:.16,col:'#2b8a3e'});});
  const sis=kid(sc,5,1.3,-2.3,{ry:-.6,on:'His sister'});const bot=prop(sc,'bottle',1.0,-2.9,{s:.4,y:.38,on:'bottle'});at(sc,'only 2 cups',()=>num(sc,'2 cups',1.0,-2.5,{h:.16}));
  at(sc,'greater capacity',()=>num(sc,'5 cups > 2 cups',0,-1.7,{h:.18,col:'#c92a2a'}));
  const cus=person(sc,'man',1.8,-1.8,{ry:-1,on:'customer'});const bk=prop(sc,'bucket',1.4,-1.8,{s:.4,on:'bucket'});
  at(sc,'bigger measure',()=>{mode(sc,nico,'cheer');say(sc,nico,'We need a bigger measure!',2600);});
});
/* m22 · The Farm Fair Weigh-In */
story('m22',sc=>{D.base(sc,'#c9d99a');put(sc,P.PROP3.barn(),-1.6,-3.3);put(sc,S.fence(2.2),1.0,-3.6);
  const bal=P.STAGE.prop('balance',{s:1.3,face:false});put(sc,bal,.2,-2.8);const raw=bal.children[0],beam=raw.userData.beam;
  const tilt=(a)=>{const a0=beam.rotation.z;tween(.8,k=>{beam.rotation.z=a0+(a-a0)*k;['panL','panR'].forEach(p=>beam.userData[p].rotation.z=-beam.rotation.z);});};
  const onPan=(o,side)=>{const pan=beam.userData[side];sc.g.remove(o);pan.add(o);o.position.set(0,.02,0);o.scale.multiplyScalar(1/(raw.scale.x*bal.scale.x));};
  const pk=prop(sc,'pumpkin',-.6,-2.0,{s:.35,on:'pumpkin'});const ap=prop(sc,'apple',.9,-2.0,{s:.2,on:'an apple'});
  at(sc,'Thump',()=>{onPan(pk,'panL');onPan(ap,'panR');tilt(.25);card(sc,'Thump!',-.5,-3.2,{h:.2,col:'#e8590c'}).visible=true;});
  at(sc,'heavier',()=>num(sc,'heavier ↓',-.7,-2.0,{h:.16,col:'#c92a2a'}));
  const ali=kid(sc,0,1.5,-2.2,{ry:-.6,on:'Ali'});
  at(sc,'toy dog',()=>{[pk,ap].forEach(o=>o.visible=false);const d=prop(sc,'teddy',0,-2,{s:.18});onPan(d,'panL');tilt(.2);});
  at(sc,'6 blocks',()=>{for(let i=0;i<6;i++)sc.later(()=>{const b=prop(sc,'block',0,-2,{s:.07,p3:{c:'#4dabf7'}});onPan(b,'panR');b.position.set((i%3-1)*.07,.02+Math.floor(i/3)*.07,0);if(i===5)tilt(0);},i*200);});
  at(sc,'mass of 6 blocks',()=>num(sc,'mass = 6 blocks',.2,-2.0,{h:.16,col:'#2b8a3e'}));
  at(sc,'two rabbits',()=>{beam.userData.panL.children.slice(4).forEach(c=>c.visible=false);beam.userData.panR.children.slice(4).forEach(c=>c.visible=false);const r1=prop(sc,'rabbit',0,-2,{s:.12}),r2=prop(sc,'rabbit',0,-2,{s:.12});onPan(r1,'panL');onPan(r2,'panL');r2.position.x=.08;r1.position.x=-.08;tilt(.25);});
  at(sc,'balanced 8 blocks',()=>{for(let i=0;i<8;i++)sc.later(()=>{const b=prop(sc,'block',0,-2,{s:.06,p3:{c:'#ffd43b'}});onPan(b,'panR');b.position.set((i%4-1.5)*.06,.02+Math.floor(i/4)*.06,0);if(i===7)tilt(0);},i*150);});
  at(sc,'each rabbit was 4',()=>num(sc,'8 ÷ 2 = 4 blocks each',.2,-1.65,{h:.16,col:'#c92a2a'}));
});
/* m23 · The Bead Bracelets */
story('m23',sc=>{D.base(sc,'#f3e6f2');const tb=put(sc,S.table({w:3.0,d:1.0}),0,-2.75);const lia=kid(sc,1,-1.2,-3.45,{ry:0}),max=kid(sc,0,1.0,-3.45,{ry:0});
  const strand=(x,z,cols,on)=>{const a=cols.map((c,i)=>prop(sc,'bead',x+i*.1,z,{s:.08,y:.38,hide:true,p3:{c},face:false}));return a;};
  const L=strand(-1.6,-2.9,['#e03131','#1c7ed6','#e03131','#1c7ed6','#e03131','#1c7ed6','#e03131','#1c7ed6']);at(sc,'red, blue, red, blue',()=>popAll(sc,L,200));
  at(sc,'repeating pattern',()=>num(sc,'red, blue, red, blue…',-1.25,-2.5,{h:.14,col:'#c92a2a'}));
  at(sc,'5 more beads',()=>{const M=strand(.3,-2.9,Array(10).fill('#fab005'));popAll(sc,M,90);});
  at(sc,'45, 50, 55',()=>['45','50','55'].forEach((t,i)=>sc.later(()=>num(sc,t,.4+i*.4,-2.5,{h:.14,col:'#2b8a3e'}),i*300)));
  const L2=strand(-1.6,-2.2,['#e03131','#e03131','#e03131','#e03131','#e03131','#e03131','#1c7ed6','#1c7ed6','#1c7ed6','#1c7ed6']);const M2=strand(.3,-2.2,['#e03131','#e03131','#e03131','#1c7ed6','#1c7ed6','#1c7ed6','#1c7ed6','#1c7ed6','#1c7ed6','#1c7ed6']);
  at(sc,'6 red and 4 blue',()=>popAll(sc,L2,80));at(sc,'3 red and 7 blue',()=>popAll(sc,M2,80));
  at(sc,'Same number',()=>{[lia,max].forEach(k=>mode(sc,k,'cheer'));num(sc,'6 + 4 = 3 + 7',0,-1.65,{h:.22,col:'#5f3dc4'});});
});
/* m24 · The Secret Code Chart */
story('m24',sc=>{D.base(sc,'#e9e2d6');const park=person(sc,'teacher',-1.8,-2.6,{ry:.8});
  const tiles=[];for(let r=0;r<10;r++)for(let c=0;c<10;c++){const t=P.mk(G0('hc',()=>new THREE.BoxGeometry(.2,.02,.17)),P.paper('#fffaf0',{mix:0}));t.position.set(-.7+c*.21,.011,-3.55+r*.18);sc.g.add(t);tiles.push(t);}
  const lab=(n)=>{const t=tiles[n-1];return t;};
  const paint=(n,c)=>{const t=lab(n);t.material=P.paper(c,{mix:.1});t.position.y=.03;};
  at(sc,'Colour 61 to 70',()=>{for(let n=61;n<=70;n++)sc.later(()=>paint(n,'#4dabf7'),(n-61)*90);num(sc,'61 → 70: a row',-1.2,-1.75,{h:.14,col:'#1c7ed6'});});
  at(sc,'circle 8, 18, 28',()=>{for(let n=8;n<=98;n+=10)sc.later(()=>paint(n,'#ff8787'),(n-8)*12);});
  at(sc,'column going down',()=>num(sc,'8, 18, 28…98: a column',.7,-1.6,{h:.14,col:'#c92a2a'}));
  at(sc,'88, 83, 78, 73',()=>{[88,83,78,73].forEach((n,i)=>sc.later(()=>{paint(n,'#ffd43b');const t=lab(n);const c=P.card(String(n),{h:.1,tilt:-1});c.position.set(t.position.x,.06,t.position.z);sc.g.add(c);},i*300));});
  const jun=kid(sc,0,1.7,-2.3,{ry:-1,on:'said Jun'});at(sc,'secret code',()=>{say(sc,jun,'8, 3, 8, 3!',2400);mode(sc,jun,'cheer');});
});
/* m25 · The Popcorn Party */
story('m25',sc=>{D.base(sc,'#2f3a5c');put(sc,P.mk(new THREE.BoxGeometry(4,.012,2.2),P.paper('#e6dcc8',{mix:.1})),0,-2.5,{y:.012});put(sc,P.mk(new THREE.BoxGeometry(1.8,.9,.04),P.paper('#f8f9fa',{mix:0})),.0,-3.62,{y:.5,on:'movie night'});
  const bag=(c,s,x,z)=>prop(sc,'popcorn',x,z,{s,p3:{c}});const bags=[];for(let i=0;i<10;i++){const ch=i%2===0,big=i%3!==0;bags.push({o:bag(ch?'#fab005':'#a0522d',big?.38:.24,-1.6+i*.35,-2.95),ch,big});}
  at(sc,'cheese and some were caramel',()=>bags.forEach(b=>ST().alive(b.o)));
  const trays=[['big cheese',-1.35],['small cheese',-.45],['big caramel',.45],['small caramel',1.35]].map(([n,x])=>{put(sc,P.mk(new THREE.BoxGeometry(.75,.03,.45),P.paper('#ced4da')),x,-2.1,{y:.015});card(sc,n,x,-1.75,{h:.12,col:'#495057'}).visible=true;return x;});
  at(sc,'4 trays',()=>bags.forEach((b,i)=>{const t=trays[(b.ch?0:2)+(b.big?0:1)];sc.later(()=>sc.move(b.o,t+((i%3)-1)*.18,-2.15+((i%2)?.1:-.08),.7),i*150);}));
  at(sc,'tally',()=>num(sc,'|||| |  = 6',-1.35,-2.6,{h:.18,col:'#e67700'}));
  at(sc,'most popular',()=>num(sc,'|||| ||||  = 10',1.35,-2.6,{h:.18,col:'#c92a2a'}));
});
/* m26 · Our Favourite Sports */
story('m26',sc=>{D.base(sc,'#bfe0a0');const kids=[];for(let i=0;i<6;i++)kids.push(kid(sc,i,-1.8,-3.5+i*.0,{s:.5}));kids.forEach((k,i)=>{k.position.set(-1.9+(i%2)*.25,0,-3.4+Math.floor(i/2)*.35);});
  const rows=[['soccer','ball',6,'#40c057'],['hockey','skates',5,'#4dabf7'],['basketball','ball',3,'#fd7e14'],['baseball','ball',2,'#e03131']];
  rows.forEach(([n,pic,v,c],r)=>{const z=-3.3+r*.45;prop(sc,pic,-1.15,z,{s:.25});card(sc,n,-.75,z,{h:.12,col:'#495057'}).visible=true;
    at(sc,n,()=>{for(let i=0;i<v;i++)sc.later(()=>{const s=prop(sc,'star',-.3+i*.27,z,{s:.2,face:false});boom(s);},i*150);sc.later(()=>num(sc,String(v),1.6,z,{h:.16,col:c}),v*150);},n==='soccer'?1:1);});
  at(sc,'most popular',()=>num(sc,'most: soccer',1.2,-1.6,{h:.14,col:'#2b8a3e'}));at(sc,'fewest',()=>num(sc,'fewest: baseball',.0,-1.6,{h:.14,col:'#c92a2a'}));
  at(sc,'16 children',()=>{num(sc,'6 + 5 + 3 + 2 = 16',-1.3,-1.6,{h:.14});kids.forEach(k=>mode(sc,k,'cheer'));});
});
/* m27 · Lunch Orders */
story('m27',sc=>{D.base(sc,'#e9e2d6');put(sc,P.mk(new THREE.BoxGeometry(3.6,.012,.02),P.paper(INKc())),0,-1.95,{y:.015});
  const B5=[['French fries','fries',6,'#fab005'],['pizza','pizza',4,'#e03131'],['sandwich','sandwich',4,'#40c057'],['hamburger','bread',3,'#a0522d'],['spaghetti','soup',2,'#e8590c']];
  B5.forEach(([n,pic,v,c],i)=>{const x=-1.6+i*.8;prop(sc,pic,x,-1.65,{s:.22});const bar=put(sc,P.mk(new THREE.BoxGeometry(.4,1,.3),P.paper(c,{mix:.2})),x,-2.2);bar.scale.y=.001;bar.position.y=0;
    at(sc,v+'',()=>{tween(.9,k=>{bar.scale.y=Math.max(.001,v*.13*k);bar.position.y=v*.13*k/2;});sc.later(()=>num(sc,String(v),x,-2.7,{h:.14,col:c}),900);},i===0?1:i===2?2:1);});
  at(sc,'most popular',()=>num(sc,'most: fries',-1.6,-3.4,{h:.14,col:'#2b8a3e'}));at(sc,'the least',()=>num(sc,'least: spaghetti',1.6,-3.4,{h:.14,col:'#c92a2a'}));
  at(sc,'19 children',()=>num(sc,'19 in all',0,-3.45,{h:.18}));at(sc,'salad bar',()=>prop(sc,'bowl',1.8,-1.65,{s:.25}));
});
/* m28 · The Fair Spinner */
story('m28',sc=>{D.base(sc,'#e7e0f5');put(sc,S.tent({c:'#e64980'}),-1.6,-3.2);const leo=kid(sc,2,-.9,-2.6,{ry:.6});
  const sp=P.STAGE.prop('spinner',{s:1.0,face:false});put(sc,sp,.4,-2.8);const ar=sp.children[0].userData.arrow;let spin=0;sc.tick(dt=>{if(spin>0){ar.rotation.y+=dt*spin;spin=Math.max(0,spin-dt*3);}});
  at(sc,'green',()=>{num(sc,'½ green',.4,-3.4,{h:.14,col:'#2b8a3e'});},1);at(sc,'red and blue',()=>num(sc,'¼ red, ¼ blue',1.4,-3.2,{h:.14,col:'#c92a2a'}));
  at(sc,'Spin green',()=>{say(sc,leo,'Spin green to win!',2200);spin=12;});
  const kids=[0,3,4,5].map((c,i)=>kid(sc,c,-1.2+i*.45,-1.8,{s:.55,ry:Math.PI,on:'Most kids won'}));at(sc,'Most kids won',()=>kids.forEach(k=>mode(sc,k,'cheer')));
  const ito=person(sc,'teacher',1.7,-2.1,{ry:-1,on:'Ms. Ito'});at(sc,'too easy',()=>say(sc,ito,'Too easy!',1800));
  at(sc,'3 equal parts',()=>{const sp2=P.STAGE.prop('spinner',{s:1.0,face:false,p3:{cols:['#e03131','#4dabf7','#fcc419']}});put(sc,sp2,.4,-2.8);D.shrink(sp);D.grow(sp2);num(sc,'⅓ ⅓ ⅓',.4,-3.4,{h:.16,col:'#5f3dc4'});});
  at(sc,'fair spinner',()=>{mode(sc,leo,'cheer');boom(leo);});
});
/* practice questions: no repeated character standing in every question — just the things it is about */
Object.keys(P.SCN).forEach(id=>{const R=P.SCN[id].rounds||{};Object.keys(R).forEach(k=>{const f=R[k];const src=String(typeof f==='function'?f:f&&f.scene);if(!/sc\.kid\(/.test(src))return;
  if(typeof f==='function')delete R[k];else delete f.scene;});});
})();
