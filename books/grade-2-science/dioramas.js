/* The Interactive Classroom: Grade 2 Science — story dioramas. */
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
const label=(sc,t,x,z,col,o)=>{const c=card(sc,t,x,z,Object.assign({h:.15,col:col||'#1c4fb8'},o||{}));c.visible=true;D.grow(c);return c;};
const swap=(sc,a,b)=>{D.shrink(a);b.visible=true;D.grow(b);};

/* c01 · The Animal Club */
story('c01',sc=>{D.base(sc,'#e9d8b8');put(sc,P.mk(new THREE.BoxGeometry(2.8,.6,.04),P.paper('#3f6b4f')),0,-3.6,{y:.3});card(sc,'Animal Club',0,-3.45,{h:.2,tilt:-.3,on:'Animal Club'});
  const t=person(sc,'teacher',-1.8,-3.1,{ry:.6});const S4=[['frog','Raj',-1.2,'amphibian','#2b8a3e',2],['snake','Mei',-.4,'reptile','#5c940d',1],['parrot','Liam',.4,'bird','#1c7ed6',3],['whale','Zara',1.2,'mammal','#5f3dc4',5]];
  S4.forEach(([a,who,x,cls,col,ki])=>{const k=kid(sc,ki,x,-2.0,{ry:Math.PI,on:who});const p=prop(sc,a,x,-2.6,{s:.5,on:a==='whale'?'Zara brought':who});
    at(sc,cls==='bird'?'a bird':cls==='mammal'?'mammals':cls==='reptile'?'a reptile':'amphibian',()=>{label(sc,cls,x,-3.05,col);ST().alive(p,true);});});
  at(sc,'water when young',()=>{const w=put(sc,S.water(.5,.3),-1.2,-2.6);});
  at(sc,'A fish',()=>{const q=card(sc,'fish?',1.2,-3.05,{h:.15,col:'#c92a2a'});q.visible=true;sc.later(()=>D.shrink(q),1500);});
  at(sc,'drink milk',()=>prop(sc,'milk',1.55,-2.5,{s:.25}));
});
/* c02 · Lunchtime at the Zoo */
story('c02',sc=>{D.base(sc,'#c9d99a');put(sc,S.fence(3.9),0,-3.6);const zk=person(sc,{c:'#5c940d',h:'#3d2a1a',st:'short',s:1.05,cap:'#2b8a3e'},-1.9,-2.4,{ry:1,on:'zookeeper'});
  const L=prop(sc,'lion',-1.2,-3.1,{s:.55});const H=prop(sc,'horse',-.2,-3.1,{s:.6});const E2=prop(sc,'elephant',1.0,-3.1,{s:.7});const pond=put(sc,S.pond(.45),-1.0,-2.0);const F=prop(sc,'frog',-1.0,-2.0,{s:.25});
  at(sc,'tore meat',()=>{const m=prop(sc,'meat',-1.0,-2.75,{s:.2});ST().alive(L,true);label(sc,'sharp teeth',-1.2,-2.55,'#c92a2a');});
  at(sc,'munched grass',()=>{for(let i=0;i<5;i++)prop(sc,'leaf',-.3+i*.08,-2.75,{s:.08,p3:{c:'#82c91e'}});label(sc,'flat teeth',-.2,-2.55,'#2b8a3e');});
  const hay=prop(sc,'hay',.6,-2.6,{s:.3,on:'bundle of hay'});at(sc,'long trunk',()=>{fly(hay,1.0,.8,-2.9,.4,1);label(sc,'long trunk',1.0,-2.5,'#5f3dc4');});
  const fly2=prop(sc,'bee',-.6,-2.1,{s:.15,y:.4,on:'zapped a fly'});at(sc,'sticky tongue',()=>{D.ribbon(sc,[[-.95,.12,-2.0],[-.8,.25,-2.05],[-.6,.4,-2.1]],'#ff8fab',{w:.02,dur:.3});sc.later(()=>D.shrink(fly2),400);});
  const duck=prop(sc,'duck',.0,-1.8,{s:.3,on:'the duck waddled'});at(sc,'waddled',()=>tween(2,k=>{duck.position.x=k*.6;duck.rotation.z=Math.sin(k*30)*.15;}));
  const sn=prop(sc,'snake',.8,-1.75,{s:.3,on:'slithered'});at(sc,'slithered',()=>tween(2,k=>{sn.position.x=.8+k*.5;sn.position.z=-1.75+Math.sin(k*12)*.05;}));
  const tree=put(sc,S.tree({s:.9}),1.8,-2.2);const bd=prop(sc,'bird',1.3,-1.8,{s:.25,on:'the bird flew'});at(sc,'branch',()=>fly(bd,1.75,.75,-2.15,.5,1));
});
/* c03 · The Busy Pond */
story('c03',sc=>{D.base(sc,'#bfe0a0');const pond=put(sc,S.water(1.6,1.0),-.8,-2.8);for(let i=0;i<6;i++)put(sc,P.mk(new THREE.CylinderGeometry(.008,.008,.4,4),P.paper('#5c940d')),.15+i*.05,-2.5-(i%2)*.1,{y:.2});
  const bv=prop(sc,'beaver',-1.6,-2.2,{s:.4,on:'beaver'});const lodge=new THREE.Group();for(let i=0;i<14;i++){const s=P.mk(new THREE.CylinderGeometry(.015,.015,.4,5),P.paper('#8a6a4a'));s.position.set(Math.cos(i)*.1,.1+(i%4)*.05,Math.sin(i)*.1);s.rotation.set(i,0,1.2);lodge.add(s);}put(sc,lodge,-1.0,-3.0,{on:'lodge'});
  at(sc,'stacks sticks',()=>mode(sc,bv,'pull'));
  const web=new THREE.Group();for(let r=1;r<=3;r++){const t=P.mk(new THREE.TorusGeometry(r*.06,.003,4,16),P.paper('#ffffff',{mix:0}));web.add(t);}for(let i=0;i<6;i++){const b=P.mk(new THREE.BoxGeometry(.004,.36,.004),P.paper('#ffffff',{mix:0}));b.rotation.z=i*Math.PI/6;web.add(b);}put(sc,web,.3,-2.55,{y:.25,on:'sticky web'});
  const spd=put(sc,S.spider(),.3,-2.5,{y:.22,s:.18,on:'spider'});
  const tree=put(sc,S.tree({s:1.25}),1.35,-3.1);const nest=prop(sc,'nest',1.35,-3.0,{s:.25,y:.75,on:'nest of twigs'});const bd=prop(sc,'bird',1.35,-3.0,{s:.2,y:.82,on:'a bird sits'});
  const fx=prop(sc,'fox',1.0,-2.2,{s:.45,on:'sneaky fox'});at(sc,'sneaky fox',()=>tween(2,k=>{fx.position.x=1.0+Math.sin(k*3)*.2;}));
  const bur=put(sc,P.mk(new THREE.SphereGeometry(.3,18,10,0,Math.PI*2,0,Math.PI/2),P.paper('#8a6a4a')),-.1,-1.7,{on:'burrow'});bur.scale.y=.4;
  at(sc,'rabbit family',()=>{for(let i=0;i<3;i++){const r=prop(sc,'rabbit',-.25+i*.15,-1.65,{s:.18});r.rotation.z=1.4;}sc.fx('zzz',{x:-.1,z:-1.7,w:.2,h:.6,y:.2});});
  at(sc,'safe',()=>{[bv,fx].forEach(o=>ST().alive(o));label(sc,'Homes keep animals safe',0,-3.45,'#2b8a3e');});
});
/* c04 · Getting Ready for Winter */
story('c04',sc=>{D.base(sc,'#e3c79a');for(let i=0;i<3;i++)put(sc,S.tree({s:.85,c:['#e8590c','#fab005','#d9480f'][i]}),-1.8+i*.7,-3.35);sc.fx('snow',{x:0,z:-2.5,w:4,d:2,h:1.5});
  const sq=prop(sc,'squirrel',-1.4,-2.4,{s:.35,on:'squirrel'});at(sc,'acorns',()=>{for(let i=0;i<4;i++){const a=prop(sc,'acorn',-1.0+i*.1,-2.2,{s:.1});fly(a,-1.6,0,-2.9,.4,.8+i*.1);}});
  const wf=prop(sc,'wolf',-.4,-2.2,{s:.5,on:'wolf'});at(sc,'coat of fur',()=>{tween(1,k=>wf.scale.setScalar(wf.scale.x*(1+.004)));label(sc,'thick fur',-.4,-1.75,'#495057');});
  const den=put(sc,S.cave(),.7,-3.0,{s:.8});const br=prop(sc,'bear',.4,-2.3,{s:.55,on:'A bear'});
  at(sc,'eats and eats',()=>{prop(sc,'fish',.2,-2.0,{s:.15});ST().alive(br,true);});at(sc,'hibernate',()=>{sc.move(br,.7,-2.75,1.2).then(()=>{br.rotation.z=1.3;sc.fx('zzz',{x:.7,z:-2.8,w:.2,h:.6,y:.4});});label(sc,'hibernate',.7,-2.1,'#5f3dc4');});
  const pond=put(sc,S.water(1.0,.6),1.5,-1.9);const fs=prop(sc,'fish',1.5,-1.9,{s:.2,on:'fish swim deep'});at(sc,'slow down',()=>{fs.position.y=-.02;tween(2,k=>fs.position.x=1.3+k*.4);});
  const pt=prop(sc,'ptarmigan',-1.5,-1.75,{s:.35,on:'ptarmigan'});at(sc,'snowshoes',()=>{tint(pt,'#ffffff');label(sc,'feathery snowshoes',-1.0,-1.6,'#1c7ed6');});
});
/* c05 · The Long Trip South */
story('c05',sc=>{D.base(sc,'#cfe3b0');const sea=put(sc,S.water(1.6,2.1),1.25,-2.5);card(sc,'NORTH',-1.6,-3.5,{h:.14,col:'#1c7ed6'});card(sc,'SOUTH',-1.6,-1.55,{h:.14,col:'#e8590c'});
  const bs=[];at(sc,'monarch butterflies',()=>{for(let i=0;i<5;i++){const b=prop(sc,'butterfly',-1.2+i*.12,-3.3,{s:.18,y:.5,p3:{c:'#fd7e14'}});bs.push(b);}});
  at(sc,'fly south',()=>bs.forEach((b,i)=>tween(3,k=>{b.position.z=-3.3+k*1.5;b.position.y=.5+Math.sin(k*20+i)*.08;})));
  at(sc,'Mexico',()=>label(sc,'Mexico',-1.0,-1.6,'#e8590c'));
  const car=[];at(sc,'Caribou',()=>{for(let i=0;i<4;i++){const c=prop(sc,'caribou',-.6+(i%2)*.25,-3.4+Math.floor(i/2)*.2,{s:.35});car.push(c);}});
  at(sc,'huge herds',()=>car.forEach(c=>{c.userData.mode='walk';sc.move(c,c.position.x+.1,c.position.z+.6,3);}));
  const wh=prop(sc,'whale',1.2,-3.3,{s:.5,on:'Grey whales',p3:{c:'#868e96'}});at(sc,'warm water',()=>{tween(3,k=>wh.position.z=-3.3+k*1.6);label(sc,'California',1.25,-1.6,'#e8590c');});
  const sal=[];at(sc,'Salmon',()=>{for(let i=0;i<3;i++)sal.push(prop(sc,'salmon',.4,-2.4+i*.15,{s:.2}));});
  at(sc,'come back years later',()=>sal.forEach((s,i)=>tween(2,k=>{s.position.x=.4+Math.sin(k*Math.PI)*.8;})));
  at(sc,'migrate',()=>label(sc,'migrate',0,-1.6,'#2b8a3e'));
});
/* c06 · Spring at the Farm */
story('c06',sc=>{D.base(sc,'#c9e3a0');put(sc,P.PROP3.barn(),-1.6,-3.3);put(sc,S.fence(2.4),.8,-3.55);put(sc,S.tree({s:.85,c:'#ffc9de'}),1.85,-3.2);sc.fx('sparkle',{x:0,z:-2.5,w:3,h:.8});
  const sh=prop(sc,'sheep',-.9,-2.7,{s:.5});const lb=prop(sc,'lamb',-.6,-2.5,{s:.3,on:'A lamb'});at(sc,'wobbles',()=>sc.tick((dt,t)=>{lb.rotation.z=Math.sin(t*6)*.1;}));
  const hs=prop(sc,'horse',.2,-3.0,{s:.6});const fo=prop(sc,'foal',.5,-2.7,{s:.4,on:'A foal'});at(sc,'shaky legs',()=>sc.tick((dt,t)=>{fo.position.y=Math.abs(Math.sin(t*5))*.02;}));
  const pg=prop(sc,'pig',1.2,-2.2,{s:.45});const pl=[];at(sc,'Piglets',()=>{for(let i=0;i<3;i++)pl.push(prop(sc,'piglet',1.0+i*.17,-2.0,{s:.2}));card(sc,'squeal!',1.4,-2.55,{h:.15,col:'#e64980'}).visible=true;});
  const md=prop(sc,'duck',-1.3,-1.9,{s:.35,on:'ducklings'});const dl=[];at(sc,'ducklings',()=>{for(let i=0;i<4;i++)dl.push(prop(sc,'chick',-1.1+i*.15,-1.9,{s:.15}));});
  at(sc,'in a line',()=>{[md].concat(dl).forEach((d,i)=>tween(3,k=>{d.position.x=-1.3+i*.15+k*1.0;}));});
  const jo=person(sc,'farmer',-.4,-1.8,{ry:Math.PI,on:'Farmer Joe'});at(sc,'favourite season',()=>{say(sc,jo,'Everyone is new!',2400);mode(sc,jo,'cheer');});
});
/* c07 · Nala Grows Up */
story('c07',sc=>{D.base(sc,'#e3cf9a');put(sc,S.tree({s:1.0,c:'#94b85a'}),-1.7,-3.3);for(let i=0;i<5;i++)put(sc,P.mk(new THREE.ConeGeometry(.04,.2,4),P.paper('#c9a85a')),-1+i*.5,-3.5,{y:.1});
  const mom=prop(sc,'lion',1.2,-3.0,{s:.65});const steps=[[-1.3,.2,'born'],[-.6,.3,'two weeks'],[.1,.42,'three months'],[.8,.55,'one year']];
  const cubs=steps.map(([x,s,w])=>prop(sc,'cub',x,-2.2,{s,on:w==='born'?'born':w}));
  at(sc,'closed eyes',()=>label(sc,'tiny, eyes closed',-1.3,-1.75,'#e8590c'));at(sc,'eyes opened',()=>label(sc,'2 weeks',-.6,-1.75));
  at(sc,'pounced',()=>{tween(.6,k=>{cubs[2].position.y=Math.sin(k*Math.PI)*.3;cubs[2].position.x=.1+k*.5;});label(sc,'3 months',.1,-1.75);});
  at(sc,'spots faded',()=>label(sc,'1 year',.8,-1.75));
  at(sc,'grown up',()=>{const g=prop(sc,'lion',1.5,-2.2,{s:.65});boom(g);label(sc,'grown up!',1.5,-1.75,'#2b8a3e');});
  at(sc,'so do you',()=>{const k=kid(sc,5,-1.8,-1.75,{s:.6,ry:.6});mode(sc,k,'cheer');});
});
/* c08 · Monarch Magic */
story('c08',sc=>{D.base(sc,'#e9e2d6');const tb=put(sc,S.table({w:2.8,d:.9}),0,-2.8);const tank=put(sc,P.mk(new THREE.BoxGeometry(2.4,.6,.6),P.paper('#e7f5ff',{op:.35,mix:0})),0,-2.8,{y:.68});
  const leaf=prop(sc,'leaf',-1.0,-2.8,{s:.35,y:.39});const stg=[['egg','tiny egg',-1.0,.08],['caterpillar','caterpillar',-.4,.3],['chrysalis','chrysalis',.3,.35],['butterfly','butterfly',1.0,.4]];
  const o=stg.map(([n,w,x,s])=>prop(sc,n,x,-2.8,{s,y:n==='butterfly'?.6:.39,on:w,p3:n==='butterfly'?{c:'#fd7e14'}:{}}));
  at(sc,'ate and ate',()=>tween(2,k=>o[1].scale.setScalar(o[1].scale.x*(1+.006))));
  at(sc,'hung upside down',()=>{o[1].rotation.z=Math.PI/2;});at(sc,'gold dots',()=>sc.fx('sparkle',{x:.3,z:-2.8,w:.3,h:.4,y:.5}));
  ['egg','caterpillar','chrysalis','butterfly'].forEach((n,i)=>at(sc,i===0?'tiny egg':n,()=>{label(sc,['1. egg','2. larva','3. pupa','4. adult'][i],stg[i][2],-2.25,'#e8590c');if(i>0)D.ribbon(sc,[[stg[i-1][2]+.15,.75,-2.8],[stg[i][2]-.3,.9,-2.8],[stg[i][2]-.15,.75,-2.8]],'#fab005',{w:.03});}));
  at(sc,'let it go',()=>{fly(o[3],1.6,1.3,-3.5,.6,2);D.bob(sc,o[3],.1,4);});
  at(sc,'metamorphosis',()=>label(sc,'metamorphosis',0,-1.65,'#5f3dc4',{h:.2}));
});
/* c09 · Hide and Seek in Nature */
story('c09',sc=>{D.base(sc,'#e9e2d6');const zones=[['#ffffff',-1.4,'Arctic'],['#f2d06b',0,'desert'],['#82c91e',1.4,'jungle']];zones.forEach(([c,x])=>put(sc,P.mk(new THREE.BoxGeometry(1.36,.014,2.1),P.paper(c,{mix:.2})),x,-2.5,{y:.012}));
  const fx=prop(sc,'fox',-1.4,-2.6,{s:.45,on:'arctic fox'});at(sc,'arctic fox',()=>{tint(fx,'#ffffff');sc.fx('snow',{x:-1.4,z:-2.5,w:1.3,d:2,h:1.2});label(sc,'Arctic',-1.4,-3.35,'#1c7ed6');});
  for(let i=0;i<3;i++)put(sc,P.mk(new THREE.SphereGeometry(.25,14,8,0,Math.PI*2,0,Math.PI/2),P.paper('#f2d06b',{mix:.2})),-.3+i*.3,-3.2+(i%2)*.3,{s:1});
  const cm=prop(sc,'camel',0,-2.5,{s:.6,on:'camel'});at(sc,'dunes',()=>label(sc,'desert',0,-3.4,'#e8590c'));
  for(let i=0;i<10;i++)put(sc,P.mk(new THREE.ConeGeometry(.04,.45,4),P.paper('#5c940d')),1.0+(i%5)*.2,-2.8+Math.floor(i/5)*.3,{y:.22});
  const tg=prop(sc,'tiger',1.4,-2.6,{s:.5,on:'striped tiger'});at(sc,'pounce',()=>tween(.6,k=>{tg.position.y=Math.sin(k*Math.PI)*.3;tg.position.z=-2.6+k*.4;}));
  const lf=prop(sc,'leaf',1.2,-1.8,{s:.4,on:'green leaf'});const cp=prop(sc,'caterpillar',1.2,-1.8,{s:.2,y:.03,on:'green caterpillar'});
  at(sc,'birds cannot see',()=>{const b=prop(sc,'bird',.6,-1.8,{s:.25,y:.8});tween(2,k=>{b.position.x=.6+k*1.2;});});
  at(sc,'camouflage',()=>label(sc,'camouflage',0,-1.6,'#2b8a3e',{h:.2}));
});
/* c10 · Mrs. Shaw Goes Shopping */
story('c10',sc=>{D.base(sc,'#e3e8ee');put(sc,S.shelf(),-1.3,-3.5);put(sc,S.shelf(),.1,-3.5);put(sc,S.counter(1.0),1.5,-3.4);
  const shaw=person(sc,'woman',-1.6,-2.3,{ry:1.2,p:{c:'#ae3ec9',h:'#e9ecef',st:'bun'}});const cart=prop(sc,'cart',-1.1,-2.3,{s:.55});
  at(sc,'pushed her cart',()=>{sc.move(cart,-.4,-2.3,1.5);D.walk(sc,shaw,-.95,-2.3,1.5,'pull');});
  const bins=[put(sc,P.mk(new THREE.BoxGeometry(.8,.03,.5),P.paper('#a5d8ff',{mix:.2})),-.5,-1.65,{on:'liquids'}),put(sc,P.mk(new THREE.BoxGeometry(.8,.03,.5),P.paper('#ffd8a8',{mix:.2})),.8,-1.65,{on:'solids'})];
  at(sc,'liquids',()=>label(sc,'LIQUIDS',-.5,-1.95,'#1c7ed6'),1);at(sc,'solids',()=>label(sc,'SOLIDS',.8,-1.95,'#e8590c'));
  const it=(n,w,s,x)=>{const p=prop(sc,n,-.4,-2.3,{s,on:w});at(sc,w,()=>fly(p,-.4,.35,-2.3,.5,.6));return p;};
  const milk=it('milk','carton of milk',.3),oil=it('bottle','cooking oil',.3);
  at(sc,'flow',()=>{[milk,oil].forEach((p,i)=>fly(p,-.65+i*.4,.03,-1.65,.5,.8));D.ribbon(sc,[[-.7,.1,-1.6],[-.5,.04,-1.55],[-.3,.02,-1.6]],'#a5d8ff',{w:.06});});
  const ck=it('cookie','box of cookies',.25),sk=it('sock'in P.PROP3?'sock':'shoe','socks',.25),lo=it('lollipop','lollipop',.3);
  at(sc,'keep their own shape',()=>[ck,sk,lo].forEach((p,i)=>fly(p,.55+i*.25,.03,-1.65,.5,.8)));
  const soap=prop(sc,'bottle',.0,-2.6,{s:.35,on:'dish soap',p3:{}});at(sc,'Liquid',()=>{fly(soap,-.3,.03,-1.6,.5,.8);mode(sc,shaw,'cheer');},2);
});
/* c11 · Mr. Soup's Magic Show */
story('c11',sc=>{D.base(sc,'#2f3a5c');put(sc,P.mk(new THREE.BoxGeometry(2.4,.1,1.1),P.paper('#c92a2a')),0,-3.0,{y:.05});const tb=put(sc,S.table({w:1.3,d:.6,c:'#5f3dc4'}),0,-2.9);
  const ms=person(sc,{c:'#343a40',h:'#141414',st:'short',s:1.1,cap:'#141414'},-.7,-3.3,{ry:.3});
  const gl=prop(sc,'glass',.0,-2.9,{s:.4,y:.38,on:'glass of water'});const sugar=put(sc,P.mk(new THREE.BoxGeometry(.05,.05,.05),P.paper('#ffffff',{mix:0})),.0,-2.9,{y:.9,on:'sugar'});
  at(sc,'stirred',()=>{fly(sugar,0,.5,-2.9,.1,.5);sc.tick((dt,t)=>{gl.rotation.y=t*3;});});
  at(sc,'Abracadabra',()=>{D.shrink(sugar,1.2);sc.fx('sparkle',{x:0,z:-2.9,w:.4,h:.8,y:.4});say(sc,ms,'Abracadabra!',2000);});
  const mia=kid(sc,1,1.2,-2.0,{ry:-.8,on:'whispered Mia'});at(sc,'dissolved',()=>label(sc,'dissolved',1.2,-1.6,'#1c7ed6'));
  const juice=prop(sc,'cup',.4,-2.9,{s:.3,y:.38,p3:{c:'#ff922b'}});at(sc,'knocked over',()=>{tween(.4,k=>{juice.rotation.z=-k*1.5;});const sp=put(sc,P.mk(new THREE.CylinderGeometry(.3,.3,.01,20),P.glow('#ff922b',.85,.2)),.6,-2.6,{y:.39});D.grow(sp);});
  const sp1=prop(sc,'sponge',-.5,-2.2,{s:.25,on:'sponge'}),tw=put(sc,P.mk(new THREE.BoxGeometry(.2,.02,.2),P.paper('#ffffff',{mix:0})),-.1,-2.2,{y:.01,on:'paper towel'}),spn=prop(sc,'spoon',.3,-2.2,{s:.25,on:'metal spoon'});
  at(sc,'soaked up',()=>{tint(sp1,'#ff922b');tw.material=P.paper('#ffc078');label(sc,'absorbs',-.3,-1.75,'#2b8a3e');});
  at(sc,'The spoon did not',()=>label(sc,'does not absorb',.4,-1.75,'#c92a2a'));
  at(sc,'bowed',()=>{ms.rotation.x=.4;sc.later(()=>ms.rotation.x=0,800);});
});
/* c12 · Mr. Water's Disguises */
story('c12',sc=>{D.base(sc,'#e3e8ee');
  const seg=[[-1.4,'#e7f5ff','winter'],[-.45,'#d3f9d8','spring'],[.5,'#fff3bf','hot day'],[1.45,'#e7f5ff','cold again']];
  seg.forEach(([x,c])=>put(sc,P.mk(new THREE.BoxGeometry(.9,.014,2.1),P.paper(c,{mix:.2})),x,-2.5,{y:.012}));
  const ice=put(sc,P.mk(new THREE.BoxGeometry(.4,.25,.4),P.glow('#d0ebff',.85,.35)),-1.4,-2.6,{y:.13,on:'solid'});const sn=put(sc,S.hill(.35,{c:'#ffffff'}),-1.4,-3.2,{on:'snow on the hill'});
  at(sc,'solid',()=>label(sc,'SOLID',-1.4,-1.75,'#1c7ed6'));
  const pud=put(sc,P.mk(new THREE.CylinderGeometry(.35,.35,.02,24),P.glow('#4dabf7',.8,.2)),-.45,-2.6,{y:.012,hide:true});
  at(sc,'melts',()=>{const i2=ice.clone();sc.g.add(i2);i2.position.x=-.45;tween(1.2,k=>{i2.scale.y=Math.max(.01,1-k);});pud.visible=true;D.grow(pud);label(sc,'LIQUID',-.45,-1.75,'#2b8a3e');});
  at(sc,'splashes',()=>D.ribbon(sc,[[-.7,.05,-2.6],[-.45,.3,-2.6],[-.2,.05,-2.6]],'#a5d8ff',{w:.05}));
  const sun=put(sc,S.sun(),.5,-3.3,{y:1.0,s:.5,on:'hot day'});
  at(sc,'evaporates',()=>{sc.fx('steam',{x:.5,z:-2.6,w:.5,h:1.4,y:.1});label(sc,'GAS',.5,-1.75,'#e8590c');});
  at(sc,'freezes',()=>{const i3=put(sc,P.mk(new THREE.BoxGeometry(.35,.22,.35),P.glow('#d0ebff',.85,.35)),1.45,-2.6,{y:.11});D.grow(i3);sc.fx('snow',{x:1.45,z:-2.5,w:.8,d:2,h:1.2});});
  at(sc,'Guess which state',()=>{const c=card(sc,'?',0,-3.3,{h:.3,col:'#7950f2'});c.visible=true;});
});

/* c13 · Sam Crosses the River */
story('c13',sc=>{D.base(sc,'#bfe0a0');const riv=put(sc,S.river(4.0,1.0),0,-2.65);put(sc,S.tree({s:.9}),-1.8,-3.4);put(sc,S.pine({s:.8}),1.85,-1.6);
  const sam=kid(sc,0,-1.5,-1.75,{ry:Math.PI});const test=(n,w,s,x,sink)=>{const p=prop(sc,n,-1.2,-1.8,{s,on:w});at(sc,w,()=>{fly(p,x,.0,-2.5,.5,.8).then(()=>{if(sink){tween(.8,k=>{p.position.y=-.2*k;}).then(()=>D.shrink(p));card(sc,'plop! sank',x,-2.2,{h:.13,col:'#c92a2a'}).visible=true;}else{sc.tick((dt,t)=>{p.position.y=.02+Math.sin(t*2+x)*.02;});}});});return p;};
  at(sc,'float',()=>say(sc,sam,'I need things that float!',2400),1);
  test('key','a key',.2,-1.0,true);test('scissors','scissors',.25,-.5,true);
  const lg=sc.prop('log',-.1,-2.5,{s:.6});lg.visible=false;at(sc,'a log',()=>{lg.visible=true;D.grow(lg);sc.tick((dt,t)=>lg.position.y=Math.sin(t*2)*.02);});
  const ring=prop(sc,'life ring',.5,-2.5,{s:.3,on:'life ring',face:false});const raft=prop(sc,'raft',1.0,-2.6,{s:.6,on:'wooden raft',face:false});
  at(sc,'all floated',()=>label(sc,'floats!',.5,-3.2,'#2b8a3e'));
  at(sc,'paddled across',()=>{sc.move(raft,-1.3,-2.6,.1);sam.position.set(-1.3,.08,-2.6);tween(3,k=>{raft.position.z=-2.6-k*.0;raft.position.x=-1.3+k*2.4;sam.position.x=-1.3+k*2.4;});sam.userData.mode='pull';});
  at(sc,'buoyant',()=>label(sc,'buoyant',0,-1.6,'#1c7ed6',{h:.2}));at(sc,'Wood is great',()=>{mode(sc,sam,'cheer');});
});
/* c14 · Mouse and Cat Read the Labels */
story('c14',sc=>{D.base(sc,'#e3e8ee');put(sc,S.shelf(),0,-3.5,{s:1.4});const mouse=prop(sc,'mouse',-1.3,-2.2,{s:.35});const cat=prop(sc,'cat',-1.6,-2.5,{s:.45});
  const sym=(t,c)=>{const g=new THREE.Group();const b=P.mk(new THREE.CylinderGeometry(.08,.08,.24,14),P.paper(c,{mix:.15}));b.position.y=.12;g.add(b);const L=P.card(t,{h:.1,stand:false,tilt:0,col:'#c92a2a'});L.position.set(0,.06,.085);g.add(L);return g;};
  const it=[['☠','#40c057','green bottle',-.9,'poisonous'],['🔥','#adb5bd','a can with a flame',-.3,'flammable'],['💥','#ced4da','spray can',.3,'exploding'],['✋','#ffd43b','A cleaner',.9,'corrosive']];
  it.forEach(([t,c,w,x,lab])=>{const g=sym(t,c);put(sc,g,x,-3.45,{y:.04,on:w,s:1.2});at(sc,lab,()=>{label(sc,lab,x,-2.95,'#c92a2a');boom(g);});});
  at(sc,'Juice',()=>{say(sc,mouse,'Juice!',1600);sc.move(mouse,-.9,-2.9,.8);});
  at(sc,'Cat stopped him',()=>{sc.move(cat,-1.0,-2.6,.6);say(sc,cat,'Stop!',1500);});
  at(sc,'very sick',()=>{sc.move(mouse,-1.3,-2.2,.6);});
  at(sc,'keep us safe',()=>{say(sc,cat,'Labels keep us safe!',2600);ST().alive(mouse,true);});
});
/* c15 · A Windy Day at the Park */
story('c15',sc=>{D.base(sc,'#bfe0a0');put(sc,S.tree({s:1}),-1.8,-3.3);const bench=put(sc,S.bench(),1.4,-1.8,{ry:-.3});
  const winds=()=>{for(let i=0;i<3;i++)D.ribbon(sc,[[-2,.6+i*.2,-3.0+i*.3],[-.6,.8+i*.15,-2.8+i*.3],[.8,.6+i*.2,-2.9+i*.3],[2,.8+i*.1,-3+i*.3]],'#d0ebff',{w:.04,dur:1.2});};
  const leo=kid(sc,2,-.9,-2.2,{ry:.4});sc.wear(leo,'hat');
  at(sc,'windy day',()=>winds(),1);
  at(sc,'blew',()=>{const h=leo.userData.head.children[leo.userData.head.children.length-1];if(h){leo.userData.head.remove(h);sc.g.add(h);h.position.set(-.9,1.0,-2.2);fly(h,.8,.0,-3.0,1.0,1.5);}mode(sc,leo,'cover',1600);say(sc,leo,'My hat!',1600);});
  const pole=put(sc,P.mk(new THREE.CylinderGeometry(.012,.012,1.1,6),P.paper('#adb5bd')),-.2,-3.3,{y:.55});const flag=put(sc,P.mk(new THREE.PlaneGeometry(.35,.22,8,1),P.paper('#e03131',{mix:.1})),-.02,-3.3,{y:.98});flag.material.side=THREE.DoubleSide;
  at(sc,'flag flapped',()=>sc.tick((dt,t)=>{const p=flag.geometry.attributes.position;for(let i=0;i<p.count;i++){const x=p.getX(i);p.setZ(i,Math.sin(t*8+x*12)*.04*(x+.18));}p.needsUpdate=true;}));
  const kite=prop(sc,'kite',.6,-3.0,{s:.5,y:.6,on:'kite soared'});at(sc,'kite soared',()=>D.bob(sc,kite,.15,2));
  const pw=prop(sc,'pinwheel',1.1,-2.6,{s:.5,on:'pinwheel'});
  const amy=kid(sc,1,.2,-1.9,{ry:-.3,on:'Amy'});at(sc,'bubbles',()=>{for(let i=0;i<8;i++){const b=put(sc,P.mk(new THREE.SphereGeometry(.04+Math.random()*.03,12,8),P.glow('#e7f5ff',.5,.3)),.2,-1.9,{y:.8});tween(3,k=>{b.position.set(.2+k*(1+i*.1),.8+k*.5+Math.sin(k*8+i)*.05,-1.9-k*.6);});}});
  at(sc,'cannot see air',()=>say(sc,amy,'We cannot see air!',2400));
  at(sc,'warm cocoa',()=>{[leo,amy].forEach((k,i)=>D.walk(sc,k,1.25+i*.3,-1.75,1,'eat'));sc.fx('steam',{x:1.4,z:-1.7,w:.4,h:.6,y:.6});});
});
/* c16 · Drip's Big Journey */
story('c16',sc=>{D.base(sc,'#cfe3b0');const sea=put(sc,S.water(1.6,2.1),-1.2,-2.5);put(sc,S.mountain({s:.9}),1.4,-3.3);const riv=D.ribbon(sc,[[1.3,.03,-2.9],[.8,.03,-2.4],[.2,.03,-2.2],[-.4,.03,-2.4]],'#4dabf7',{w:.18,up:V(0,1,0)});riv.userData.full();
  const drip=prop(sc,'droplet',-1.2,-2.5,{s:.25,y:.05});
  const sun=put(sc,S.sun(),-1.7,-3.4,{y:1.2,s:.5,on:'sunny day'});
  at(sc,'floated up',()=>{tween(2.2,k=>{drip.position.y=.05+k*1.2;drip.position.x=-1.2+k*.8;});sc.fx('steam',{x:-1.2,z:-2.5,w:1,h:1.2});label(sc,'evaporation',-1.2,-1.65,'#e8590c');});
  const cl=put(sc,S.cloud(),-.3,-2.9,{y:1.3,s:1.4,on:'made a cloud'});at(sc,'condensation',()=>{D.shrink(drip);label(sc,'condensation',-.2,-1.65,'#5f3dc4');});
  at(sc,'got heavy',()=>{tint(cl,'#868e96');});
  at(sc,'precipitation',()=>{sc.fx('rain',{x:.4,z:-2.7,w:1.2,d:.6,h:1.3});drip.visible=true;drip.position.set(.6,1.2,-2.7);tween(1.2,k=>drip.position.y=1.2-k*1.15);label(sc,'precipitation',.8,-1.65,'#1c7ed6');});
  at(sc,'rolled back to the sea',()=>tween(2.5,k=>{drip.position.x=.6-k*1.8;drip.position.z=-2.7+k*.3;}));
  at(sc,'go again',()=>{D.ribbon(sc,[[-1.2,.2,-2.5],[-.6,1.4,-2.9],[.6,1.2,-2.7],[-.4,.1,-2.4]],'#fab005',{w:.04,dur:2});ST().alive(drip,true);});
});
/* c17 · The Clean Team */
story('c17',sc=>{D.base(sc,'#bfe0a0');const creek=D.ribbon(sc,[[-2,.03,-3.0],[-.6,.03,-2.8],[.6,.03,-3.1],[2,.03,-2.9]],'#868e96',{w:.4,up:V(0,1,0)});creek.userData.full();
  const team=[0,1,3,5].map((c,i)=>kid(sc,c,-1.4+i*.5,-2.2,{s:.7}));const lop=person(sc,'teacher',1.6,-2.2,{ry:-1,on:'Ms. Lopez'});
  const litter=[];for(let i=0;i<6;i++){const l=prop(sc,i%2?'bottle':'can'in P.PROP3?'bottle':'bottle',-1.6+i*.6,-2.6,{s:.15});l.rotation.z=1.4;litter.push(l);}
  at(sc,'picked up litter',()=>{team.forEach(k=>mode(sc,k,'pull',1600));litter.forEach((l,i)=>sc.later(()=>D.shrink(l),i*200));sc.later(()=>{creek.material=P.glow('#4dabf7',.9,.25);},1400);});
  at(sc,'biked',()=>{const b=prop(sc,'bicycle',-2.2,-1.75,{s:.45});tween(2,k=>b.position.x=-2.2+k*3.5);const c=prop(sc,'car',1.7,-1.7,{s:.4});sc.later(()=>D.shrink(c),800);label(sc,'less exhaust',.6,-1.6,'#2b8a3e');});
  at(sc,'planted trees',()=>[-1.4,-.3,.9].forEach((x,i)=>{const t=put(sc,S.tree({s:.6}),x,-3.45);D.grow(t);}));
  at(sc,'made signs',()=>['Care about Air!','Don’t Waste Water!','No More Litter!','Save Our Ocean!'].forEach((t,i)=>sc.later(()=>{const s=put(sc,S.sign(t,{h:.12,col:'#2b8a3e'}),-1.5+i*1.0,-1.55);D.grow(s);},i*400)));
  at(sc,'family of ducks',()=>{for(let i=0;i<4;i++){const d=prop(sc,i?'chick':'duck',-1+i*.25,-2.9,{s:i?.18:.3});tween(3,k=>d.position.x=-1+i*.25+k*1.2);}});
});
/* c18 · The Wind-Up Robot */
story('c18',sc=>{D.base(sc,'#e9d8b8');put(sc,S.rug(2,1.2,'#a5d8ff'),-.2,-2.5);const gp=person(sc,'grandpa',-1.7,-2.8,{ry:.8});const kai=kid(sc,0,-1.0,-2.2,{ry:.5,on:'Kai'});
  const rb=prop(sc,'robot',-.5,-2.6,{s:.4,on:'wind-up robot'});const key=prop(sc,'key',-.65,-2.6,{s:.1,y:.25,on:'turned the key',face:false});
  at(sc,'click, click, click',()=>{sc.tick((dt,t)=>{key.rotation.x=t*4;});card(sc,'click!',-.5,-2.95,{h:.14,col:'#495057'}).visible=true;});
  at(sc,'input',()=>label(sc,'INPUT: winding',-1.0,-1.65,'#1c7ed6'));
  at(sc,'marched',()=>{tween(3,k=>{rb.position.x=-.5+k*1.4;rb.rotation.z=Math.sin(k*30)*.08;});});at(sc,'output',()=>label(sc,'OUTPUT: moving',.6,-1.65,'#e8590c'));
  const lamp=put(sc,S.lamp(),1.5,-3.3);lamp.userData.bulb.visible=false;at(sc,'lamp turned on',()=>{lamp.userData.bulb.visible=true;boom(lamp.userData.bulb);});
  const el=new THREE.Group();const fr=P.mk(new THREE.BoxGeometry(.5,.7,.06),P.paper('#adb5bd'));fr.position.y=.35;el.add(fr);const dl=P.mk(new THREE.BoxGeometry(.2,.6,.02),P.paper('#dee2e6'));dl.position.set(-.1,.32,.04);const dr=dl.clone();dr.position.x=.1;el.add(dl,dr);put(sc,el,.6,-3.5);
  at(sc,'elevator door opened',()=>tween(1,k=>{dl.position.x=-.1-k*.12;dr.position.x=.1+k*.12;}));
  at(sc,'needs energy',()=>say(sc,gp,'Everything that moves needs energy!',2800));
  at(sc,'from food',()=>{const a=prop(sc,'apple',-1.0,-1.9,{s:.2});mode(sc,kai,'eat');});
});

/* c19 · Lake Day */
story('c19',sc=>{D.base(sc,'#cfe3b0');const lake=put(sc,S.water(2.8,1.4),-.5,-2.4);const hill=put(sc,S.hill(.7,{c:'#a7d08c'}),1.5,-3.1);
  const wave=D.ribbon(sc,[[-1.8,.05,-1.85],[-1.2,.15,-1.9],[-.6,.05,-1.85]],'#ffffff',{w:.08,on:'caught a wave'});
  const ella=kid(sc,1,-1.6,-1.85,{s:.6,on:'Ella'});const sb=prop(sc,'surfboard',-1.6,-1.85,{s:.4,on:'surfboard',face:false});
  at(sc,'surfboard',()=>{ella.position.y=.05;tween(3,k=>{ella.position.x=-1.6+k*1.2;sb.position.x=-1.6+k*1.2;});});
  const ben=kid(sc,0,1.1,-1.75,{ry:-.4,on:'Ben'});const kite=prop(sc,'kite',.8,-2.2,{s:.5,y:.8,on:'kite high'});at(sc,'breeze',()=>D.bob(sc,kite,.12,2));
  const gm=person(sc,'grandma',-.4,-2.8,{s:.6,on:'Grandma’s sailboat'});const boat=prop(sc,'sailboat',-.4,-2.8,{s:.6,on:'sailboat'});
  at(sc,'zoomed',()=>{tween(2.5,k=>{boat.position.x=-.4+k*-1.0;gm.position.x=boat.position.x;});D.ribbon(sc,[[.4,.5,-2.8],[0,.6,-2.85],[-.4,.5,-2.8]],'#d0ebff',{w:.05});});
  const tb=[1.2,1.6,1.95].map((x,i)=>prop(sc,'turbine',x,-3.3+i*.1,{s:.9,on:'wind turbines'}));
  at(sc,'electricity',()=>{const h=put(sc,S.house({w:.4,h:.3,d:.35}),1.85,-2.2);D.grow(h);D.ribbon(sc,[[1.6,.8,-3.2],[1.8,.5,-2.7],[1.85,.4,-2.2]],'#ffd43b',{w:.04});});
  at(sc,'renewable',()=>label(sc,'renewable!',0,-1.6,'#2b8a3e',{h:.2}));
});
/* c20 · The Old Mill */
story('c20',sc=>{D.base(sc,'#cfe3b0');const riv=put(sc,S.river(4,.6),0,-2.0);const mill=put(sc,S.house({w:.9,h:.65,d:.6,c:'#d9c29c',roof:'#8a5a32'}),-1.2,-3.0,{on:'old mill'});
  const ww=prop(sc,'waterwheel',-.6,-2.5,{s:.6,on:'water wheel'});const kids=[0,2,3].map((c,i)=>kid(sc,c,.3+i*.35,-2.9,{s:.6,ry:-.6,on:'our class'}));const g=person(sc,'man',1.5,-2.8,{ry:-.8,on:'The guide'});
  const nile=put(sc,P.mk(new THREE.BoxGeometry(1.2,.012,.5),P.glow('#4dabf7',.8,.2)),.6,-3.45,{y:.02,on:'Egypt'});const sb=prop(sc,'sailboat',.4,-3.45,{s:.35,on:'sail their boats'});at(sc,'Nile River',()=>{label(sc,'Egypt · Nile',.6,-3.15,'#e8590c');tween(3,k=>sb.position.x=.2+k*.6);});
  const wm=sc.prop('windmill',1.6,-3.4,{s:.5});wm.visible=false;at(sc,'Persia',()=>{D.grow(wm);label(sc,'Persia · 1400 years ago',1.4,-3.05,'#5f3dc4');});
  at(sc,'grind corn',()=>prop(sc,'corn',1.9,-3.0,{s:.2}));
  at(sc,'run saws',()=>{label(sc,'water power',-.6,-1.6,'#1c7ed6');});
  const dam=prop(sc,'dam',.9,-1.9,{s:.9,on:'modern dam'});at(sc,'electricity',()=>D.ribbon(sc,[[.9,.4,-1.9],[1.4,.6,-2.2],[1.9,.4,-2.5]],'#ffd43b',{w:.04}));
});
/* c21 · Rebecca's Lost Hat */
story('c21',sc=>{D.base(sc,'#e3cf9a');const sw=put(sc,S.swing(),-1.4,-3.2,{s:1.1});const slide=prop(sc,'slide',.6,-3.1,{s:.8});
  const tun=put(sc,P.mk(new THREE.CylinderGeometry(.22,.22,.7,16,1,true),P.paper('#4dabf7',{mix:.2})),-.4,-3.1,{y:.22});tun.rotation.z=Math.PI/2;tun.material.side=THREE.DoubleSide;
  const rh=prop(sc,'horse',1.5,-2.4,{s:.4,p3:{c:'#ff8787'}});const bench=put(sc,S.bench(),-.3,-1.85);const bin=put(sc,P.mk(new THREE.CylinderGeometry(.12,.1,.28,14),P.paper('#495057')),.35,-1.8,{y:.14});
  const hat=prop(sc,'hat',.1,-1.75,{s:.18,hide:true});const reb=person(sc,'girl',-1.8,-2.2,{ry:1.5,p:{c:'#f76707',h:'#c8823c',st:'pony'}});
  at(sc,'lost her hat',()=>{say(sc,reb,'Where is my hat?',2000);mode(sc,reb,'think',1800);});
  const path=[];const go=(w,x,z,y,who)=>at(sc,w,()=>{D.walk(sc,reb,x,z,1.1,'idle');if(y)sc.later(()=>tween(.6,k=>reb.position.y=y*k),1100);path.push([x,.05,z]);});
  go('around the swings',-1.4,-2.6);go('Climb up the ladder',.3,-3.3,.4);go('through the tunnel',-.4,-3.1,.2);go('Slide down',.6,-2.6,0);go('Jump over',1.5,-2.0,0);
  at(sc,'Jump over',()=>sc.later(()=>tween(.6,k=>reb.position.y=Math.sin(k*Math.PI)*.4),1100));
  at(sc,'under the bench',()=>{D.walk(sc,reb,-.3,-1.6,1.1,'lookup');});
  at(sc,'There was her hat',()=>{hat.visible=true;D.grow(hat);boom(hat);mode(sc,reb,'cheer');});
  at(sc,'beside the garbage can',()=>label(sc,'beside the garbage can',.4,-2.2,'#2b8a3e'));
});
/* c22 · Fun Fair Day */
story('c22',sc=>{D.base(sc,'#e7e0f5');const car=prop(sc,'carousel',-1.3,-2.9,{s:.85,on:'merry-go-round'});
  const ship=new THREE.Group();const hull=P.mk(new THREE.SphereGeometry(.3,16,8,0,Math.PI*2,Math.PI/2,Math.PI/2),P.paper('#8a5a32'));hull.scale.set(1.4,.6,.6);ship.add(hull);const mast=P.mk(new THREE.CylinderGeometry(.01,.01,.4,5),P.paper('#5c3d2e'));mast.position.y=.2;ship.add(mast);
  const frame=new THREE.Group();[-1,1].forEach(s=>{const l=P.mk(new THREE.CylinderGeometry(.015,.015,.9,6),P.paper('#495057'));l.position.set(s*.3,.45,0);l.rotation.z=s*.3;frame.add(l);});put(sc,frame,.0,-3.2,{on:'pirate ship'});const piv=new THREE.Group();piv.position.set(0,.8,-3.2);sc.g.add(piv);ship.position.y=-.5;piv.add(ship);piv.visible=false;
  at(sc,'pirate ship',()=>{piv.visible=true;sc.tick((dt,t)=>piv.rotation.z=Math.sin(t*1.6)*.6);});
  const bc=[];at(sc,'bumper cars',()=>{for(let i=0;i<3;i++){const c=prop(sc,'car',1.0+i*.3,-3.0,{s:.25,p3:{c:['#e03131','#fcc419','#4dabf7'][i]}});bc.push(c);sc.tick((dt,t)=>{c.position.x=1.3+Math.sin(t*1.5+i*2)*.45;c.position.z=-3.0+Math.sin(t*3+i)*.25;c.rotation.y=t*2+i;});}});
  const castle=new THREE.Group();const base0=P.mk(new THREE.BoxGeometry(.6,.2,.5),P.paper('#ff8787'));base0.position.y=.1;castle.add(base0);[-1,1].forEach(s=>{const t=P.mk(new THREE.CylinderGeometry(.06,.06,.4,10),P.paper('#fcc419'));t.position.set(s*.3,.2,.25);castle.add(t);});put(sc,castle,-.9,-1.9,{on:'bouncy castle'});
  at(sc,'bounced',()=>{for(let i=0;i<2;i++){const k=kid(sc,i,-1.0+i*.2,-1.9,{s:.45});sc.tick((dt,t)=>k.position.y=.2+Math.abs(Math.sin(t*5+i))*.25);}});
  at(sc,'waterslide',()=>{const sl=D.ribbon(sc,[[.4,.9,-2.2],[.8,.6,-2.0],[.6,.3,-1.8],[1.0,.05,-1.65]],'#4dabf7',{w:.18,up:V(0,1,0)});});
  const max=kid(sc,4,1.6,-1.9,{ry:-.6,on:'laughed Max'});at(sc,'dizzy',()=>{mode(sc,max,'dance');say(sc,max,'I’m dizzy!',2000);});
  at(sc,'teacups',()=>{const cup=prop(sc,'cup',1.6,-2.3,{s:.35,p3:{c:'#f783ac'}});D.spin(sc,cup,3);});
});
/* c23 · Moving the Big Rock */
story('c23',sc=>{D.base(sc,'#bfe0a0');const hole=put(sc,S.hill(.6,{c:'#8a6a4a'}),-1.4,-3.1);put(sc,S.door({c:'#c92a2a'}),-1.4,-2.6,{s:.5});const rock=put(sc,S.rock({s:2.5}),-1.1,-2.5);
  const mouse=prop(sc,'mouse',-.6,-2.2,{s:.3});at(sc,'pushed and pushed',()=>{sc.tick((dt,t)=>{if(!mouse.userData.stop)mouse.position.x=-.7+Math.sin(t*10)*.02;});say(sc,mouse,'Ugh!',1600);});
  const bear=prop(sc,'bear',1.4,-2.3,{s:.6,on:'Bear came'});const stick=put(sc,P.mk(new THREE.CylinderGeometry(.02,.02,1.4,6),P.paper('#8a6a4a')),.6,-2.5,{y:.05,on:'long stick'});stick.rotation.z=Math.PI/2;
  const stone=put(sc,S.rock({s:.6}),-.5,-2.5,{on:'small stone'});
  at(sc,'under the rock',()=>{mouse.userData.stop=1;sc.move(mouse,-.4,-1.9,.6);sc.move(bear,.3,-2.4,1);tween(1,k=>{stick.position.x=.6-k*.85;stick.position.y=.05+k*.06;stick.rotation.z=Math.PI/2+k*.08;});});
  at(sc,'up went the rock',()=>{tween(.8,k=>{stick.rotation.z=Math.PI/2+.08-k*.35;rock.position.y=k*.2;rock.rotation.z=k*.3;});card(sc,'push down',.5,-2.1,{h:.14,col:'#c92a2a'}).visible=true;});
  at(sc,'That is a lever',()=>label(sc,'lever',-.3,-2.95,'#5f3dc4',{h:.2}));
  at(sc,'easier',()=>{say(sc,bear,'Simple machines make work easier!',2800);});
  const wb=prop(sc,'wheelbarrow',.2,-1.7,{s:.5,on:'wheelbarrow'});at(sc,'rolled the rock away',()=>{fly(rock,.2,.25,-1.7,.4,.8).then(()=>{tween(2,k=>{rock.position.x=.2+k*1.5;wb.position.x=.2+k*1.5;});});});
});
/* c24 · Matt's Mechanism Museum */
story('c24',sc=>{D.base(sc,'#e9d8b8');const sh=put(sc,P.mk(new THREE.BoxGeometry(3.6,.06,.7),P.paper('#c99a6a')),0,-3.0,{y:.4});[-1.7,0,1.7].forEach(x=>put(sc,P.mk(new THREE.BoxGeometry(.06,.4,.7),P.paper('#a0785a')),x,-3.0,{y:.2}));card(sc,'Mechanism Museum',0,-3.45,{h:.18,col:'#8a5a32',on:'Mechanism Museum'});
  const matt=kid(sc,2,-1.5,-2.0,{ry:.5});
  const nc=new THREE.Group();const a=P.mk(new THREE.BoxGeometry(.3,.02,.06),P.paper('#ced4da'));a.position.y=.06;const b=a.clone();b.position.y=.02;nc.add(a,b);put(sc,nc,-1.2,-3.0,{y:.43,on:'nail clippers'});
  at(sc,'pushes two little wedges',()=>{tween(1,k=>{a.rotation.z=-Math.sin(k*Math.PI)*.2;});label(sc,'lever + wedges',-1.2,-2.55,'#5f3dc4');});
  const cr=prop(sc,'toy crane',-.3,-3.0,{s:.6,y:.43,on:'toy crane'});at(sc,'pulley',()=>label(sc,'pulley',-.3,-2.55,'#1c7ed6'));
  const sc2=prop(sc,'scissors',.6,-3.0,{s:.4,y:.43,on:'pair of scissors'});at(sc,'two levers',()=>label(sc,'2 levers + wedges',.6,-2.55,'#c92a2a'));
  const rd=prop(sc,'dog',1.4,-3.0,{s:.5,y:.43,on:'robot dog',p3:{c:'#adb5bd',d:'#868e96'}});at(sc,'turning head',()=>sc.tick((dt,t)=>{rd.rotation.y=-.6+Math.sin(t*2)*.4;}));at(sc,'vibrating tail',()=>sc.tick((dt,t)=>{rd.position.x=1.4+Math.sin(t*40)*.01;}));
  at(sc,'Matt explains',()=>{say(sc,matt,'Simple machines working together!',2800);mode(sc,matt,'point');label(sc,'mechanism',0,-1.65,'#2b8a3e',{h:.2});});
});
/* practice questions: no repeated character standing in every question — just the things it is about */
Object.keys(P.SCN).forEach(id=>{const R=P.SCN[id].rounds||{};Object.keys(R).forEach(k=>{const f=R[k];const src=String(typeof f==='function'?f:f&&f.scene);if(!/sc\.kid\(/.test(src))return;
  if(typeof f==='function')delete R[k];else delete f.scene;});});
})();
