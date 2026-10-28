/* The Interactive Classroom: Grade 2 English — story dioramas.
   Each story is a paper diorama under the story text on the right page. As the narrator reads,
   each word lights up and the diorama acts out the sentence that is being read: sc.on(word, fn).
   Scene coordinates: x -2.05 (left) to 2.05 (right); z -3.65 (back) to -1.35 (front); y up. */
(function(){
"use strict";
const P=window.PM;if(!P||!P.DIO||!P.SCN)return;
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

/* 1 · A Garden That Talks — the flowers grow as they are named, and each one holds up its message */
story('f01',sc=>{D.base(sc,'#a7d08c');
  put(sc,S.fence(3.9),0,-3.55);put(sc,S.house({w:.9,h:.6,d:.66,roof:'#c2553a'}),-1.5,-3.1,{ry:.25});put(sc,S.tree({s:1.05}),1.62,-3.2);
  put(sc,S.bush({s:.9}),-.55,-3.35);put(sc,S.bush({s:.7}),.75,-3.42);
  for(let i=0;i<6;i++)put(sc,S.flower('daisy',{c:['#ffffff','#ffd1e0','#fff3a0'][i%3],h:.2}),-1.95+i*.17,-1.55-(i%2)*.12);
  const g=person(sc,'grandpa',-1.15,-2.35,{ry:.5});const me=kid(sc,4,-.62,-1.85,{ry:.3});
  at(sc,'garden',()=>mode(sc,g,'point',2400),2);
  at(sc,'message',()=>say(sc,g,'Every flower sends a message!',2600));
  const shown=[];
  const fl=[['sunflower',-.1,'#ffcf33','I am proud of you.','#b86e00'],['tulip',.6,'#ff6f91','You make me smile.','#d6336c'],['rose',1.25,'#e2384d','I love you.','#c92a2a']].map(([k,x,c,m,tc])=>{
    const f=put(sc,S.flower(k,{c}),x,-2.7,{hide:true,s:1.25});const cd=card(sc,m,x,-2.25,{hide:true,h:.2,col:tc});
    at(sc,k==='rose'?'red rose':k,()=>{shown.forEach(c=>{if(c.visible)D.shrink(c);});shown.push(cd);D.grow(f,.9);D.sway(sc,f,.05);boom(f);sc.later(()=>D.grow(cd),800);});return {f,cd};});
  at(sc,'picked',()=>{D.walk(sc,me,.45,-2.2,1.1,'pull');fl.forEach(o=>sc.later(()=>{if(o.cd.visible)D.shrink(o.cd);},200));});
  const bunch=new THREE.Group();[['sunflower','#ffcf33'],['tulip','#ff6f91'],['rose','#e2384d']].forEach(([k,c],i)=>{const f=S.flower(k,{c,h:.3});f.rotation.z=(i-1)*.3;bunch.add(f);});
  put(sc,bunch,.5,-1.95,{hide:true,y:.25});
  at(sc,'bunch',()=>{fl.forEach(o=>D.shrink(o.f));D.grow(bunch);});
  D.ribbon(sc,[[.4,.42,-1.9],[.5,.34,-1.84],[.6,.42,-1.9],[.5,.3,-1.98]],'#3cb04a',{w:.04,on:'green string'});
  const t=person(sc,'teacher',1.65,-2.0,{ry:-1.2,on:'teacher'});
  at(sc,'she read',()=>{fly(bunch,1.35,.45,-2.0,.6,1);mode(sc,me,'idle');mode(sc,t,'read');});
  at(sc,'grin',()=>{mode(sc,t,'cheer');mode(sc,me,'cheer');say(sc,t,'Thank you!',2400);boom(t);
    D.ribbon(sc,[[.8,.5,-2.1],[1.0,1.15,-2.4],[1.45,1.35,-2.2],[1.8,1.0,-2.05]],'#ff6f91',{dur:1});});
});

/* 2 · Tongue Twister Tuesday — each kid steps up, and the twister comes true beside them */
story('f02',sc=>{D.base(sc,'#e9d6b4');
  const board=put(sc,S.wall(2.6,.5,'#3f6b4f'),0,-3.6);card(sc,'Tongue Twister Tuesday',0,-3.45,{h:.24,tilt:-.25});
  row(4,-1.65,1.65,(x,i)=>{put(sc,S.chair({c:'#f0c27a'}),x,-1.55,{ry:Math.PI});});
  const ks=[person(sc,{c:'#2f7de1',h:'#141414',st:'short',s:.84},-1.65,-1.75,{ry:Math.PI}),person(sc,{c:'#e64980',h:'#c8823c',st:'pony',s:.84,skirt:1},-.55,-1.75,{ry:Math.PI}),kid(sc,4,.55,-1.75,{ry:Math.PI}),kid(sc,3,1.65,-1.75,{ry:Math.PI})];
  const t=person(sc,'teacher',1.75,-3.1,{ry:-.6});
  const spot=[0,-2.75];
  const go=(k,w,lines,make)=>{at(sc,w,()=>{D.walk(sc,k,spot[0],spot[1],.9,'sing');const it=make();sc.later(()=>{say(sc,k,lines,3000);it.forEach((o,j)=>sc.later(()=>{D.grow(o);ST().alive(o,true);},j*250));},900);
    sc.later(()=>{it.forEach(o=>D.shrink(o));D.walk(sc,k,k.userData.home[0],k.userData.home[1],.9,'idle');sc.later(()=>{k.userData.ry=Math.PI;},950);},4200);});};
  ks.forEach(k=>k.userData.home=[k.position.x,k.position.z]);
  go(ks[0],'Chen','Cheerful chicks chew cherries!',()=>[prop(sc,'chick',-.75,-2.7,{s:.6,hide:true}),prop(sc,'chick',-1.1,-2.55,{s:.5,hide:true}),prop(sc,'cherries',.75,-2.7,{s:.6,hide:true})]);
  go(ks[1],'Sasha','She shops for shiny shells!',()=>[prop(sc,'shell',-.8,-2.6,{s:.55,hide:true}),prop(sc,'shell',.8,-2.6,{s:.55,hide:true}),prop(sc,'bag',.95,-2.95,{s:.6,hide:true})]);
  at(sc,'giggled',()=>mode(sc,ks[1],'cheer',1500));
  go(ks[2],'Theo said','Three thin thumbs!',()=>[prop(sc,'thumb',-.8,-2.65,{s:.5,hide:true}),prop(sc,'thumb',.75,-2.65,{s:.5,hide:true}),prop(sc,'thumb',1.1,-2.85,{s:.5,hide:true})]);
  at(sc,'my turn',()=>{D.walk(sc,ks[3],spot[0],spot[1],.9,'sing');});
  const wh=prop(sc,'whale',1.0,-2.9,{s:1.1,on:'whale'});
  at(sc,'whale',()=>{say(sc,ks[3],'Which white whale whistles?',2600);D.bob(sc,wh,.08,3);});
  at(sc,'twisted',()=>{mode(sc,ks[3],'dance');const pts=[];for(let i=0;i<=24;i++){const a=i*.7;pts.push([Math.cos(a)*.35*(1-i/30),1.0+i*.03,-2.75+Math.sin(a)*.35*(1-i/30)]);}D.ribbon(sc,pts,'#ff922b',{w:.05,dur:1.4});});
  at(sc,'laughed',()=>{ks.forEach((k,i)=>sc.later(()=>mode(sc,k,'cheer'),i*120));mode(sc,t,'clap');});
  at(sc,'even me',()=>{say(sc,ks[3],'Ha ha!',2000);boom(ks[3]);});
});

/* 3 · The Festival of Silly Splats — a street of houses, flying tomatoes, then the fire truck washes it all */
story('f03',sc=>{D.base(sc,'#e3dccd');
  row(4,-1.6,1.6,(x,i)=>{put(sc,S.house({w:.72,h:.38+(i%2)*.1,d:.5,roof:['#c2553a','#5c7cfa','#e8a33a','#2b8a3e'][i],chimney:i%2===0}),x,-3.35);});
  put(sc,S.road(4.0),0,-2.55);const road=put(sc,P.mk(new THREE.BoxGeometry(3.9,.014,.34),P.glow('#e03131',.85,.2)),0,-2.55,{y:.012,hide:true});
  put(sc,S.river(4.0,.32),0,-1.55);
  const ppl=[kid(sc,0,-1.5,-2.15,{ry:.6}),kid(sc,1,-.5,-2.95,{ry:-2.6}),kid(sc,5,.6,-2.15,{ry:-.4}),person(sc,'man',1.5,-2.95,{ry:-2.4})];
  const wh=prop(sc,'whistle',-.2,-2.1,{s:.5,on:'whistle'});
  const clock=card(sc,'10:00',-1.75,-3.0,{on:"o’clock",h:.22});
  const tom=[];const splats=[];
  at(sc,'tomatoes',()=>{row(5,-1.6,1.6,(x,i)=>{const t=prop(sc,'tomato',x,-2.55,{s:.36});tom.push(t);});});
  at(sc,'splat',()=>{ppl.forEach((k,i)=>{mode(sc,k,'kick',1600);});tom.forEach((t,i)=>{const x=-1.8+Math.random()*3.6,z=-2.3-Math.random()*.6;sc.later(()=>{fly(t,x,0,z,1.1,.7).then(()=>{splats.push(disc(sc,x,z,.12+Math.random()*.08,'#e03131'));D.shrink(t);});},i*160);});});
  at(sc,'throws',()=>{row(6,-1.7,1.7,(x,i)=>sc.later(()=>{const t=prop(sc,'tomato',x,-2.95+(i%2)*.8,{s:.32});fly(t,-x*.6,0,-2.55,1,.7).then(()=>{splats.push(disc(sc,-x*.6,-2.55+(i%3-1)*.12,.15,'#e03131'));D.shrink(t);});},i*150));});
  at(sc,'turns red',()=>{road.visible=true;D.grow(road,.8);});
  at(sc,'slip',()=>{const k=ppl[2];k.userData.mode='jump';tween(.6,q=>{k.rotation.z=q*1.2;}).then(()=>sc.later(()=>tween(.5,q=>{k.rotation.z=1.2*(1-q);}),900));mode(sc,ppl[0],'cheer',2000);});
  const ft=put(sc,S.firetruck(),-2.6,-2.55,{hide:true});
  at(sc,'fire trucks',()=>{ft.visible=true;sc.move(ft,-1.0,-2.55,1.4).then(()=>{D.ribbon(sc,[[-.7,.45,-2.55],[-.2,.7,-2.5],[.5,.5,-2.55],[1.2,.05,-2.55]],'#4dabf7',{w:.09,dur:1.2});sc.later(()=>{road.visible=false;splats.forEach(s=>D.shrink(s));},1200);});});
  card(sc,'ketchup!',.9,-3.0,{on:'ketchup',col:'#c92a2a'});
  at(sc,'river',()=>{ppl.forEach((k,i)=>sc.later(()=>D.walk(sc,k,-1.4+i*.95,-1.75,1.2,'swim'),i*200));});
});

/* 4 · Every Drop Counts — four little rooms, each one saving water */
story('f04',sc=>{D.base(sc,'#dfe9ef');
  const wl=put(sc,P.mk(new THREE.BoxGeometry(.04,.36,2.2),P.paper('#e9eef3')),0,-2.5,{y:.18});const wl2=put(sc,P.mk(new THREE.BoxGeometry(4,.36,.04),P.paper('#e9eef3')),0,-2.5,{y:.18});
  /* Jake at the bathroom sink */
  const sink=put(sc,S.counter(.6),-1.45,-3.35);const tapW=D.ribbon(sc,[[-1.45,.62,-3.3],[-1.45,.5,-3.28],[-1.45,.38,-3.27]],'#4dabf7',{w:.04});
  const jake=person(sc,'boy',-1.45,-2.9,{ry:Math.PI,p:{c:'#1c7ed6'}});
  at(sc,'Jake',()=>{mode(sc,jake,'eat');});at(sc,'turns off',()=>{D.shrink(tapW);card(sc,'tap off!',-.9,-3.1,{h:.18,col:'#1971c2'}).visible=true;});
  /* Mina's short shower */
  const sh=put(sc,P.mk(new THREE.BoxGeometry(.6,.03,.6),P.paper('#cfe8f7')),1.2,-3.1,{y:.015});const head=put(sc,S.lamp(),1.2,-3.35);
  const mina=person(sc,'girl',1.2,-3.0,{ry:0,hide:true});const drops=[];
  at(sc,'Mina',()=>{D.grow(mina);drops.push(sc.fx('rain',{x:1.2,z:-3.05,w:.4,d:.3,h:.8}));});
  card(sc,'short shower',.55,-2.75,{on:'short shower',h:.18,col:'#0b7285'});
  /* Dad fixes the drip under the sink */
  put(sc,S.counter(.7),-1.35,-1.75);const dad=person(sc,'dad',-.75,-1.75,{ry:-1.6,on:'Dad'});const drip=prop(sc,'droplet',-1.3,-1.55,{s:.3,y:.05});D.bob(sc,drip,.05,6);
  const wr=prop(sc,'wrench',-1.0,-1.6,{s:.35,on:'fixed'});at(sc,'fixed',()=>{mode(sc,dad,'pull',1800);sc.later(()=>D.shrink(drip),1500);});
  /* rain bucket for the plants */
  const bk=prop(sc,'bucket',.7,-1.8,{s:.55,on:'bucket'});const pl=[prop(sc,'seedling',1.3,-1.7,{s:.45}),prop(sc,'seedling',1.7,-1.9,{s:.45})];
  at(sc,'rain',()=>sc.fx('rain',{x:.7,z:-1.8,w:.4,d:.3,h:1.1}),1);
  at(sc,'plants',()=>{fly(bk,1.25,.4,-1.95,.3,.9).then(()=>{D.ribbon(sc,[[1.3,.5,-1.95],[1.45,.45,-1.9],[1.55,.2,-1.88]],'#4dabf7',{w:.05});pl.forEach(p=>ST().alive(p,true));});});
  /* teacher and the gem */
  const t=person(sc,'teacher',.2,-2.1,{ry:0,on:'teacher'});const gem=prop(sc,'gem',.2,-2.1,{s:.4,y:1.25,on:'gem'});at(sc,'gem',()=>{D.spin(sc,gem,1.5);boom(gem);});
  const sign=card(sc,'Close the tap!',-1.45,-3.0,{on:'sign',h:.24,col:'#c92a2a'});at(sc,'Close the tap',()=>{boom(sign);mode(sc,jake,'cheer');});
});

/* 5 · Tooth Tales — one tooth, four ways around the world */
story('f05',sc=>{D.base(sc,'#efe3f3');
  const tooth=prop(sc,'tooth',0,-2.45,{s:.5,y:.15});D.bob(sc,tooth,.06,2);
  /* under the pillow */
  const bed=put(sc,S.bed({c:'#b197fc'}),-1.5,-3.05,{ry:Math.PI/2});const me=kid(sc,3,-1.45,-2.95,{hide:true});
  const fairy=prop(sc,'fairy',-1.2,-3.3,{s:.55,y:.6,on:'tooth fairy'});at(sc,'tooth fairy',()=>{D.bob(sc,fairy,.1,3);sc.fx('sparkle',{x:-1.3,z:-3.1,w:.6,h:1,y:.3});});
  at(sc,'pillow',()=>{fly(tooth,-1.6,.32,-3.35,.6,.9);});
  /* Ana's mouse with a coin */
  const ana=person(sc,'girl',1.2,-3.15,{ry:-.5,on:'Ana',p:{c:'#f08c00',h:'#141414',st:'braid'}});
  const mouse=prop(sc,'mouse',.55,-3.0,{s:.5,on:'little mouse'});const coin=prop(sc,'coin',.55,-2.7,{s:.35,on:'coin'});
  at(sc,'takes',()=>{sc.move(mouse,.9,-2.75,1);ST().alive(mouse,true);});card(sc,'Mexico',1.6,-2.85,{on:'Mexico',h:.18});
  /* toss it on the roof */
  const h=put(sc,S.house({w:.7,h:.45,d:.5,roof:'#e8590c'}),-1.3,-1.75,{ry:.2});const tosser=kid(sc,0,-.55,-1.75,{ry:-1.4,on:'toss'});
  const t2=prop(sc,'tooth',-.6,-1.75,{s:.35,y:.8,hide:true});
  at(sc,'roof',()=>{t2.visible=true;mode(sc,tosser,'cheer');fly(t2,-1.3,.85,-1.85,1,1);});at(sc,'shout',()=>say(sc,tosser,'A strong new one!',2400));
  /* cousin buries it near a flower */
  const cz=kid(sc,2,1.05,-1.75,{ry:.6,on:'cousin'});const soil=put(sc,P.mk(new THREE.SphereGeometry(.18,16,8,0,Math.PI*2,0,Math.PI/2),P.paper('#8a6a4a')),1.55,-1.7,{on:'soil'});
  const fl=put(sc,S.flower('tulip',{c:'#ff8787'}),1.75,-1.9,{on:'flower',s:1.2});
  at(sc,'buried',()=>mode(sc,cz,'pull',1800));
  at(sc,'every way is fun',()=>{[me,tosser,cz].forEach(k=>{k.visible=true;mode(sc,k,'cheer');});ana&&mode(sc,ana,'cheer');boom(tooth);});
});

/* 6 · Poutine Party — fries, squeaky curds and gravy, layer by layer, in Grandma's kitchen */
story('f06',sc=>{D.base(sc,'#eadfcf');
  put(sc,S.counter(2.4),-.6,-3.4);put(sc,S.stove(),1.25,-3.4);put(sc,S.fridge(),1.85,-3.4);put(sc,S.window(),-.9,-3.6,{y:.45});
  const gm=person(sc,'grandma',.0,-2.9,{ry:0,p:{c:'#d6336c'}});const me=kid(sc,3,-1.4,-2.0,{ry:.6});
  card(sc,'Québec',-1.6,-3.0,{on:'Quebec',h:.2,col:'#1c4fb8'});
  const table=put(sc,S.table({w:1.2,d:.7}),.3,-2.05);const tray=put(sc,S.tray({w:.62,d:.42,c:'#d4d8de'}),.3,-2.05,{y:.39,hide:true});
  const fries=new THREE.Group();for(let i=0;i<26;i++){const f=P.mk(new THREE.BoxGeometry(.03,.03,.24),P.paper('#f5c84c',{mix:.08}));f.position.set((Math.random()-.5)*.5,.03+Math.random()*.05,(Math.random()-.5)*.3);f.rotation.set(0,Math.random()*3,Math.random()*.3);fries.add(f);}put(sc,fries,.3,-2.05,{y:.4,hide:true});
  at(sc,'crispy fries',()=>{D.grow(tray);sc.later(()=>D.grow(fries),300);sc.fx('steam',{x:.3,z:-2.05,w:.4,h:1.0,y:.5});});
  const curds=new THREE.Group();for(let i=0;i<14;i++){const c=P.mk(new THREE.BoxGeometry(.06,.05,.06),P.paper('#fffbe6',{mix:0}));c.position.set((Math.random()-.5)*.45,.12,(Math.random()-.5)*.28);curds.add(c);}put(sc,curds,.3,-2.05,{y:1.2,hide:true});
  at(sc,'cheese curds',()=>{curds.visible=true;tween(.8,k=>{curds.position.y=1.2-(1.2-.42)*k;});});
  card(sc,'squeak! squeak!',1.2,-2.2,{on:'squeak',h:.18,col:'#e67700'});
  at(sc,'gravy',()=>{mode(sc,gm,'pull',2000);D.ribbon(sc,[[0,1.0,-2.6],[.1,.95,-2.3],[.25,.7,-2.1],[.3,.5,-2.05]],'#8b5a2b',{w:.07,dur:1});
    const gv=put(sc,P.mk(new THREE.CylinderGeometry(.24,.24,.02,20),P.paper('#8b5a2b',{mix:.05})),.3,-2.05,{y:.5});gv.scale.set(1,1,.6);D.grow(gv,1.2);});
  at(sc,'steamy',()=>{say(sc,gm,'Eat it while it is steamy!',2600);sc.fx('steam',{x:.3,z:-2.05,w:.5,h:1.2,y:.55});});
  prop(sc,'peas',1.05,-1.75,{s:.35,on:'peas'});prop(sc,'beans',1.4,-1.75,{s:.35,on:'beans'});prop(sc,'meat',1.75,-1.8,{s:.4,on:'roast beef'});
  const sp=prop(sc,'spoon',-.9,-1.95,{s:.4,y:.3,on:'spoon'});
  at(sc,'plain',()=>{D.walk(sc,me,-.4,-1.9,.9,'eat');});
  at(sc,'fall day',()=>{sc.fx('snow',{x:0,z:-2.5,w:4,d:2,h:1.6});mode(sc,me,'cheer');});
});

/* 7 · Kelly's Broken Wrist — down the hill, a bump, a bright cast, and safety gear */
story('f07',sc=>{D.base(sc,'#b9dc9c');
  const hill=put(sc,S.hill(.8,{c:'#a7d08c'}),-1.15,-3.0);put(sc,S.tree({s:.9}),1.7,-3.35);put(sc,S.pine({s:.9}),-1.95,-1.7);put(sc,S.bench(),1.4,-1.7,{ry:-.3});
  const path=D.ribbon(sc,[[-1.1,.54,-3.0],[-.6,.3,-2.75],[0,.08,-2.5],[.6,.02,-2.3]],'#c9a27a',{w:.18,op:.95});
  const kelly=person(sc,{c:'#9c36b5',h:'#e2b04a',st:'pony',s:.84},-1.15,-3.0,{ry:.9});kelly.position.y=.53;
  const sco=put(sc,S.scooter({c:'#9c36b5'}),-1.15,-2.95,{y:.53,ry:-.8});
  at(sc,'purple scooter',()=>{boom(sco);ST().alive(sco,true);});
  const P0=[[-1.15,.53,-3.0],[-.6,.3,-2.75],[0,.08,-2.5],[.35,.03,-2.4]];
  const curve=new THREE.CatmullRomCurve3(P0.map(p=>V(...p)));
  at(sc,'zoomed',()=>{kelly.userData.mode='kick';tween(1.6,k=>{const p=curve.getPoint(k);kelly.position.copy(p);sco.position.copy(p).add(V(0,-.02,.05));},x=>x*x);});
  const bump=put(sc,S.rock({s:.8}),.45,-2.4,{on:'bump'});
  at(sc,'flew off',()=>{fly(kelly,.95,0,-2.2,.7,.7).then(()=>{tween(.3,k=>{kelly.rotation.z=-1.3*k;});});tween(.6,k=>{sco.rotation.z=k*1.4;});});
  at(sc,'Ouch',()=>{say(sc,kelly,'Ouch!',2000);boom(kelly);});
  const doc=person(sc,'doctor',1.7,-2.4,{ry:-1.2,on:'doctor'});
  const cast=P.mk(new THREE.CylinderGeometry(.06,.06,.18,12),P.paper('#ff8a2a',{mix:.05}));cast.visible=false;
  at(sc,'cast',()=>{kelly.rotation.z=0;kelly.userData.mode='idle';const arm=kelly.userData.arms[1].userData.el;arm.add(cast);cast.position.set(0,-.12,0);D.grow(cast);mode(sc,doc,'point',1500);});
  at(sc,'signed',()=>{const fr=[kid(sc,0,.2,-1.85,{ry:.8}),kid(sc,5,1.4,-1.95,{ry:-.8})];fr.forEach(k=>mode(sc,k,'wave',2000));['Ali','Jo','Sam'].forEach((n,i)=>sc.later(()=>card(sc,n+' ♥',.6+i*.35,-1.75,{h:.14,col:['#1c7ed6','#2b8a3e','#e8590c'][i]}),i*300));});
  at(sc,'helmet',()=>{sc.wear(kelly,'helmet');});
  at(sc,'Safety first',()=>{mode(sc,kelly,'cheer');say(sc,kelly,'Safety first!',2600);});
});
/* 8 · The Noisiest Morning — every sound pops up as a word card right where it is made */
story('f08',sc=>{D.base(sc,'#efe4d2');
  const wl=put(sc,P.mk(new THREE.BoxGeometry(.04,.4,2.2),P.paper('#e9e1d2')),-.55,-2.5,{y:.2});
  put(sc,S.bed({c:'#74c0fc'}),-1.5,-3.05);const me=kid(sc,2,-1.5,-3.0,{mode:'sleep'});me.position.y=.25;
  const clk=put(sc,S.clock(),-.95,-3.4,{s:.9});sc.tick((dt,t)=>{const h=clk.userData.hands;h[1].rotation.z=-t*2;h[0].rotation.z=-t*.2;});
  const snd=(w,txt,x,z,col,f,n)=>at(sc,w,()=>{const c=card(sc,txt,x,z,{h:.2,col:col||'#c92a2a'});c.visible=true;D.grow(c);if(f)f();sc.later(()=>D.shrink(c),3200);},n);
  snd('Tick','Tick, tock!',-1.0,-2.95,'#1c4fb8',()=>ST().alive(clk,true));
  snd('Brrring','BRRRING!',-1.1,-2.5,'#e03131',()=>{ST().alive(clk,true);me.userData.mode='jump';me.position.y=0;D.walk(sc,me,-1.0,-2.0,.9,'idle');});
  const cat=prop(sc,'cat',-1.85,-1.8,{s:.55});const dog=prop(sc,'dog',-1.15,-1.65,{s:.6});
  snd('purr','purr…',-1.85,-2.25,'#862e9c',()=>ST().alive(cat,true));snd('woof','WOOF!',-.95,-2.15,'#e8590c',()=>ST().alive(dog,true));
  put(sc,S.counter(1.4),.55,-3.4);const st=put(sc,S.stove(),1.65,-3.4);const pan=put(sc,S.pan(),1.5,-3.4,{y:.37});const ket=put(sc,S.kettle(),1.82,-3.4,{y:.37});
  const dad=person(sc,'dad',1.3,-2.8,{ry:Math.PI*.9});
  snd('sizzle','sizzle!',1.1,-2.55,'#d9480f',()=>{mode(sc,dad,'pull',1600);sc.fx('steam',{x:1.5,z:-3.4,w:.2,h:.7,y:.4});});
  snd('whistle','wheeee!',1.8,-2.9,'#1971c2',()=>{sc.fx('steam',{x:1.9,z:-3.4,w:.15,h:.9,y:.6});ST().alive(ket,true);});
  put(sc,S.window(),.35,-3.62,{y:.45});const bee=prop(sc,'bee',.0,-3.2,{s:.35,y:.8,on:'bee'});
  snd('buzz','bzzz!',.2,-2.9,'#e67700',()=>tween(2,k=>{bee.position.x=-.2+k*1.0;bee.position.y=.8+Math.sin(k*20)*.08;}));
  snd('drip','drip, drop',.4,-2.45,'#1c7ed6',()=>sc.fx('rain',{x:.35,z:-3.75,w:.9,d:.15,h:1.2}));
  const bro=person(sc,'baby',.6,-1.8,{ry:-.4,on:'baby brother'});put(sc,S.chair({c:'#ffd43b'}),.6,-1.95).scale.setScalar(.8);
  const sp=prop(sc,'spoon',.75,-1.8,{s:.3,y:.55,on:'spoon'});
  snd('Clang','CLANG!',1.2,-1.75,'#5f3dc4',()=>{fly(sp,1.0,.02,-1.6,.2,.4);boom(sp);});
  at(sc,'Good morning',()=>{[me,dad].forEach(k=>mode(sc,k,'cheer'));ST().alive(dog,true);ST().alive(cat,true);});
});

/* 9 · Stamps from Everywhere — the album opens and stamps fly in from around the world */
story('f09',sc=>{D.base(sc,'#e6dccb');
  const tb=put(sc,S.table({w:1.7,d:.95,h:.34}),0,-2.8);const alb=put(sc,S.album({c:'#3b6fd8'}),-.2,-2.8,{y:.37,s:1.2});
  const me=kid(sc,1,-.2,-2.1,{ry:Math.PI});
  at(sc,'stamps',()=>{mode(sc,me,'read');});at(sc,'blue album',()=>{boom(alb);ST().alive(alb,true);});
  const slot=[[-.55,-2.65],[-.2,-2.65],[.15,-2.65],[.5,-2.65]];let k0=0;
  const stamp=(w,pic,from,lab,col)=>{const s=S.stamp({pic});put(sc,s,from[0],from[1],{y:from[2]||1.2,hide:true,s:1.5});
    at(sc,w,()=>{s.visible=true;const sl=slot[k0++%slot.length];fly(s,sl[0],.4,sl[1],.6,1.1).then(()=>boom(s));if(lab)sc.later(()=>{const c=card(sc,lab,sl[0],-3.15,{h:.16,col});c.visible=true;D.grow(c);},600);});return s;};
  stamp('Japan','bird',[-2,-3.5,1.4],'Japan','#c92a2a');at(sc,'red crane',()=>ST().alive(me,true));
  const nora=person(sc,'aunt',1.6,-3.2,{ry:-.8,on:'Nora'});const env=prop(sc,'envelope',1.4,-3.0,{s:.4,y:.9,on:'mailed'});
  at(sc,'Brazil',()=>{fly(env,.6,.45,-2.75,.7,1).then(()=>D.shrink(env));});stamp('parrot','parrot',[.6,-2.75,.5],'Brazil','#2b8a3e');
  const gp=person(sc,'grandpa',-1.65,-2.4,{ry:.9,on:'Grandpa'});stamp('beaver','beaver',[-1.4,-2.5,.8],'Canada','#c92a2a');
  at(sc,'Saturday',()=>{put(sc,S.sign('Stamp Show · Winnipeg',{h:.2}),1.3,-1.75);});
  const om=kid(sc,2,.9,-1.85,{ry:-1.2,on:'Omar'});at(sc,'Omar',()=>mode(sc,om,'wave',1800));
  const wh=prop(sc,'whale',.35,-1.85,{s:.7,y:.9,on:'whale'});at(sc,'whale',()=>{D.bob(sc,wh,.08,2);mode(sc,me,'cheer');sc.fx('sparkle',{x:.35,z:-1.85,w:.6,h:1,y:.6});});
});

/* 10 · Berry Picking Day — berry rows, a full box, a picnic under the oak, and a pie */
story('f10',sc=>{D.base(sc,'#bfe0a0');
  row(3,-1.8,-.2,(x,i)=>{put(sc,S.bush({s:.8,berry:'#e03131'}),x,-3.35);put(sc,S.bush({s:.7,berry:'#e03131'}),x+.2,-2.95);});
  row(3,.35,1.0,(x,i)=>put(sc,S.bush({s:.55,c:'#6aa05a',berry:'#4263eb'}),x,-3.4+(i%2)*.25));
  put(sc,S.fence(3.9),0,-3.65);const tree=put(sc,S.tree({s:1.35,c:'#5f9e4f'}),1.55,-2.3);
  const sun=put(sc,S.sun(),-1.7,-3.5,{y:1.3,s:.7});D.spin(sc,sun,.3);card(sc,'July',-1.2,-3.0,{on:'July',h:.18,col:'#e8590c'});
  const me=kid(sc,3,-1.25,-2.55,{ry:Math.PI*.8});const b1=put(sc,S.box({c:'#e9c46a'}),-.95,-2.4,{on:'two boxes'});const b2=put(sc,S.box({c:'#e9c46a'}),-.65,-2.4,{on:'two boxes'});
  at(sc,'strawberries',()=>{mode(sc,me,'pull',2000);[b1,b2].forEach(b=>{for(let i=0;i<6;i++){const s=P.mk(new THREE.SphereGeometry(.035,8,6),P.paper('#e03131',{mix:.05}));s.position.set((i%3-1)*.07,.2,(Math.floor(i/3)-.5)*.07);b.add(s);}});});
  const bro=kid(sc,0,.55,-2.85,{ry:Math.PI,on:'brother'});
  at(sc,'ate more',()=>{mode(sc,bro,'eat',2500);say(sc,bro,'Yum!',1800);});
  const mom=person(sc,'mom',-.2,-2.05,{ry:.3,on:'Mom'});at(sc,'sunhat',()=>sc.wear(mom,'hat'));
  const dad=person(sc,'dad',.45,-1.95,{ry:-.3,on:'Dad'});const bs=put(sc,S.basket({fill:'#e03131'}),.75,-1.95,{on:'baskets',y:.35});
  at(sc,'oak tree',()=>{boom(tree);[me,mom,dad,bro].forEach((k,i)=>sc.later(()=>D.walk(sc,k,1.05+(i%2)*.65,-2.0-(i>1?.5:0)+.0,1.1,'eat'),i*150));});
  const blank=put(sc,P.mk(new THREE.BoxGeometry(1.1,.01,.7),P.paper('#ff8787',{mix:.25})),1.35,-1.95,{on:'lunch',y:.006});
  prop(sc,'sandwich',1.35,-1.9,{s:.35,on:'sandwiches'});
  const pie=prop(sc,'pie',1.4,-2.1,{s:.5,on:'strawberry pie'});at(sc,'strawberry pie',()=>boom(pie));
  at(sc,'best day',()=>{[me,mom,dad,bro].forEach(k=>mode(sc,k,'cheer'));});
});

/* 11 · Who Invented the Sandwich? — a card game, two slices of bread, and a big idea */
story('f11',sc=>{D.base(sc,'#e9dcc4');
  put(sc,S.rug(3.2,1.7,'#a8c7fa'),0,-2.5);put(sc,S.window(),-1.2,-3.62,{y:.45});put(sc,S.window(),1.2,-3.62,{y:.45});card(sc,'England',0,-3.5,{on:'England',h:.2,col:'#1c4fb8'});
  const tb=put(sc,S.table({w:1.5,d:.8,c:'#c99a6a'}),0,-2.6);
  const earl=person(sc,{c:'#5f3dc4',h:'#e9ecef',st:'curly',s:1.1,gl:0},0,-3.2,{ry:0,on:'Earl'});
  at(sc,'Earl',()=>{say(sc,earl,'The Earl of Sandwich',2400);sc.wear(earl,'hat');});
  const fr=[person(sc,'man',-1.05,-2.6,{ry:Math.PI/2,on:'cards'}),person(sc,'woman',1.05,-2.6,{ry:-Math.PI/2,on:'cards'})];
  at(sc,'cards',()=>{for(let i=0;i<6;i++){const c=P.mk(new THREE.BoxGeometry(.12,.005,.17),P.paper('#ffffff',{mix:0}));c.position.set(-.4+i*.16,.38,-2.45+(i%2)*.1);c.rotation.y=(Math.random()-.5)*.6;sc.g.add(c);D.grow(c);}});
  at(sc,'dinner',()=>{mode(sc,earl,'no',1500);say(sc,earl,'No time for dinner!',2200);});
  const sw=new THREE.Group();const br=y=>{const b=P.mk(new THREE.BoxGeometry(.3,.04,.3),P.paper('#e9c08a',{mix:.1}));b.position.y=y;return b;};
  const b1=br(0),mt=P.mk(new THREE.BoxGeometry(.28,.04,.28),P.paper('#c0504d',{mix:.1})),b2=br(.08);mt.position.y=.04;sw.add(b1,mt,b2);[b1,mt,b2].forEach(m=>m.visible=false);put(sc,sw,.0,-2.5,{y:.4});
  at(sc,'meat',()=>{mt.visible=true;D.grow(mt);});at(sc,'two slices',()=>{b1.visible=true;b2.visible=true;D.grow(b1);D.grow(b2);boom(sw);});
  at(sc,'one hand',()=>{fly(sw,.1,1.0,-3.1,.3,.8);mode(sc,earl,'eat');});
  at(sc,'liked the idea',()=>fr.forEach(k=>mode(sc,k,'cheer',1800)));
  at(sc,'the same as Sandwich',()=>{say(sc,fr[0],'The same as Sandwich!',2400);say(sc,fr[1],'Me too!',2400);});
  at(sc,'Today',()=>{tb.visible=true;});
  ['cheese','egg','sandwich','bread'].forEach((n,i)=>prop(sc,n,-1.6+i*1.05,-1.65,{s:.42,on:i===0?'cheese':i===1?'eggs':i===2?'jam':'and more'}));
  at(sc,'all over the world',()=>{prop(sc,'globe',-1.6,-2.2,{s:.6});});
});

/* 12 · Sister Sun and Brother Moon — torches in the dark, a chase, and two lights rise into the sky */
story('f12',sc=>{const b=D.base(sc,'#e6ecf6');
  const sky=put(sc,P.mk(new THREE.BoxGeometry(4.0,.012,2.2),P.paper('#2c3e70',{mix:.1,amt:.3})),0,-2.5,{y:.012});
  for(let i=0;i<3;i++)put(sc,P.mk(new THREE.SphereGeometry(.35,18,10,0,Math.PI*2,0,Math.PI/2),P.paper('#ffffff',{mix:0})),-1.6+i*.55,-3.25+(i%2)*.25,{s:.8});
  card(sc,'the Far North',1.5,-3.3,{on:'Far North',h:.18,col:'#1c4fb8'});
  const sis=person(sc,'girl',-.6,-2.5,{ry:1.2,on:'sister',p:{c:'#f59f00',h:'#141414',st:'braid'}}),bro=person(sc,'boy',.6,-2.5,{ry:-1.2,on:'brother',p:{c:'#748ffc',h:'#141414',st:'short'}});
  const t1=S.flame(),t2=S.flame();t1.scale.setScalar(.9);t2.scale.setScalar(.9);
  at(sc,'bright torch',()=>{sis.userData.arms[1].add(t1);t1.position.set(0,-.3,.08);sc.tick((dt,t)=>t1.userData.tick(t));});
  at(sc,'torch too',()=>{bro.userData.arms[1].add(t2);t2.position.set(0,-.3,.08);sc.tick((dt,t)=>t2.userData.tick(t));});
  at(sc,'went out',()=>{tween(.6,k=>t2.scale.setScalar(.9*(1-k*.7)));const gl=P.mk(new THREE.SphereGeometry(.07,12,8),P.glow('#dbe4ff',.9,.8));bro.userData.arms[1].add(gl);gl.position.set(0,-.3,.08);});
  let chase=false;at(sc,'chased',()=>{chase=true;sis.userData.mode='run';bro.userData.mode='run';});
  let a=0,h=0;sc.tick((dt)=>{if(!chase)return;a+=dt*1.6;const r=.9;sis.position.set(Math.cos(a)*r,h,-2.5+Math.sin(a)*r*.55);bro.position.set(Math.cos(a-1.1)*r,h,-2.5+Math.sin(a-1.1)*r*.55);
    sis.userData.ry=-a+Math.PI;bro.userData.ry=-a+1.1+Math.PI;});
  at(sc,'rose into the sky',()=>tween(2,k=>{h=k*1.2;}));
  const sun=put(sc,S.sun(),-.9,-2.6,{y:1.5,hide:true,s:.9}),moon=prop(sc,'moon',.9,-2.6,{s:.8,y:1.3,hide:true});
  at(sc,'became the Sun',()=>{sis.visible=false;D.grow(sun);D.spin(sc,sun,.4);boom(sun);});
  at(sc,'became the Moon',()=>{bro.visible=false;D.grow(moon);boom(moon);});
  at(sc,'still chases',()=>{chase=false;let q=0;sc.tick(dt=>{q+=dt*.6;sun.position.set(Math.cos(q)*1.3,1.4+Math.sin(q*2)*.1,-2.7+Math.sin(q)*.4);moon.position.set(Math.cos(q-1.3)*1.3,1.3,-2.7+Math.sin(q-1.3)*.4);});
    D.ribbon(sc,[[-1.8,1.2,-2.8],[-.9,1.6,-2.9],[0,1.7,-2.9],[.9,1.6,-2.9],[1.8,1.2,-2.8]],'#ffd43b',{w:.05,dur:2});});
});

/* 13 · What Is Your Animal Year? — twelve animals march onto the calendar wheel as they are named */
story('f13',sc=>{D.base(sc,'#f3e3c3');
  const wheel=new THREE.Group();put(sc,wheel,0,-2.5);const disk=P.mk(new THREE.CylinderGeometry(1.05,1.05,.08,48),P.paper('#e03131',{mix:.25}));disk.position.y=.04;wheel.add(disk);
  const inner=P.mk(new THREE.CylinderGeometry(.45,.45,.1,36),P.paper('#ffd43b',{mix:.2}));inner.position.y=.06;wheel.add(inner);
  const lab=P.card('Chinese calendar',{h:.2,tilt:-.6});lab.position.set(0,.1,0);wheel.add(lab);
  const A=[['rat','mouse'],['ox','ox'],['tiger','tiger'],['rabbit','rabbit'],['dragon','dragon'],['snake','snake'],['horse','horse'],['goat','goat'],['monkey','monkey'],['rooster','rooster'],['dog','dog'],['pig','pig']];
  const ps=A.map(([w,n],i)=>{const a=i/12*Math.PI*2-Math.PI/2;const p=sc.prop(n,0,0,{label:false,bare:true,tap:false,s:.42});wheel.remove(p);p.parent&&p.parent.remove(p);p.position.set(Math.cos(a)*.78,.08,Math.sin(a)*.78);wheel.add(p);p.visible=false;
    at(sc,w,()=>{D.grow(p);});return p;});
  at(sc,'twelve animals',()=>{});
  at(sc,'born',()=>{tween(3,k=>{wheel.rotation.y=k*Math.PI*2;});});
  const hi=(w,i)=>at(sc,w,()=>{tween(.6,k=>{ps[i].position.y=.08+Math.sin(k*Math.PI)*.6;});boom(ps[i]);},2);
  hi('monkey',8);hi('tiger',2);hi('rabbit',3);
  const me=kid(sc,5,1.6,-1.75,{ry:-.6,on:'Ask your family'});const fam=[person(sc,'mom',1.95,-2.2,{ry:-1,on:'family'}),person(sc,'grandpa',1.3,-2.25,{ry:-.4,on:'family'})];
  at(sc,'find out',()=>{mode(sc,me,'cheer');say(sc,me,'What is my animal?',2400);});
});

/* 14 · Billy's Bad Dream — a giant spider under the bed… or is it a fuzzy slipper? */
story('f14',sc=>{D.base(sc,'#2f3a5c');
  const fl=put(sc,P.mk(new THREE.BoxGeometry(4.0,.012,2.2),P.paper('#4c5a86',{mix:.15,amt:.35})),0,-2.5,{y:.012});
  put(sc,S.window(),-1.0,-3.62,{y:.5});prop(sc,'moon',-1.0,-3.5,{s:.35,y:.75});put(sc,S.rug(1.2,.8,'#9775fa'),-.2,-2.2);
  const bed=put(sc,S.bed({c:'#91a7ff'}),.3,-2.85,{ry:Math.PI/2});const billy=kid(sc,0,.3,-2.95,{mode:'sleep'});billy.position.y=.25;billy.rotation.y=-Math.PI/2;
  sc.fx('zzz',{x:.5,z:-2.95,w:.2,h:.9,y:.5});
  const spider=put(sc,S.spider(),.3,-2.0,{hide:true,s:.6});const sl=put(sc,S.slipper(),.3,-2.0,{hide:true,s:1.3});
  at(sc,'woke up',()=>{billy.userData.mode='cover';billy.position.y=.3;billy.rotation.y=0;});
  at(sc,'Help',()=>{say(sc,billy,'Help!',1800);});
  at(sc,'giant spider',()=>{D.grow(spider,1);tween(1.5,k=>spider.scale.setScalar(.6+k*.8));});
  const dad=person(sc,'dad',-2.2,-2.0,{ry:1.4,hide:true});const lamp=put(sc,S.lamp(),-1.4,-3.25);const bulb=lamp.userData.bulb;bulb.visible=false;
  at(sc,'Dad ran',()=>{dad.visible=true;D.walk(sc,dad,-.85,-2.1,.8,'point');});
  at(sc,'light',()=>{bulb.visible=true;fl.material=P.paper('#e6dcc8',{mix:.1});const pl=new THREE.PointLight(0xffe2a0,.8,4);pl.position.set(-1.4,.9,-3.1);sc.g.add(pl);boom(bulb);});
  at(sc,'fuzzy slipper',()=>{D.shrink(spider,.5).then(()=>{D.grow(sl);boom(sl);});});
  at(sc,'laughed',()=>{mode(sc,billy,'cheer');});
  at(sc,'Phew',()=>say(sc,billy,'Phew!',1800));
  at(sc,'hug',()=>{D.walk(sc,dad,-.15,-2.6,.8,'clap');mode(sc,billy,'clap',2400);});
  prop(sc,'glass',.95,-2.4,{s:.35,y:.36,on:'glass of water'});
  at(sc,'Sweet dreams',()=>say(sc,dad,'Sweet dreams…',2400));
  at(sc,'closed his eyes',()=>{billy.userData.mode='sleep';billy.rotation.y=-Math.PI/2;billy.position.y=.25;bulb.visible=false;});
  at(sc,'Goodnight',()=>{say(sc,billy,'Goodnight, slipper!',2800);ST().alive(sl,true);});
});
/* 15 · How to Make S'mores — campfire steps: stick, golden marshmallow, chocolate, squeeze, bite */
story('f15',sc=>{D.base(sc,'#cdbd9c');
  put(sc,S.pine({s:1.1}),-1.85,-3.35);put(sc,S.pine({s:.9}),1.85,-3.4);put(sc,S.tent({c:'#2b8a3e'}),1.45,-3.1,{ry:-.4});put(sc,S.mountain({s:.7}),-.9,-3.55);
  const fire=put(sc,S.campfire(),0,-2.75,{s:1.2});
  const me=kid(sc,5,-.75,-2.3,{ry:2.3});const fr=kid(sc,2,.8,-2.3,{ry:-2.3});put(sc,S.rock({s:1.3}),-.75,-2.15);put(sc,S.rock({s:1.3}),.8,-2.15);
  const tb=put(sc,S.table({w:1.2,d:.5,h:.25}),-.1,-1.65);
  const cr=()=>P.mk(new THREE.BoxGeometry(.2,.02,.2),P.paper('#c8894a',{mix:.1}));
  const c1=put(sc,cr(),-.5,-1.65,{y:.28,on:'graham crackers'});const c2=put(sc,cr(),-.2,-1.65,{y:.28,on:'graham crackers'});
  const ch=put(sc,P.mk(new THREE.BoxGeometry(.22,.03,.12),P.paper('#6b3e26',{mix:.05})),.1,-1.65,{y:.28,on:'chocolate bar'});
  const mm=()=>P.mk(new THREE.CylinderGeometry(.06,.06,.09,14),P.paper('#ffffff',{mix:0}));const m1=put(sc,mm(),.35,-1.65,{y:.32,on:'marshmallows'});put(sc,mm(),.5,-1.6,{y:.32,on:'marshmallows'});
  const stick=put(sc,P.mk(new THREE.CylinderGeometry(.01,.01,.9,6),P.paper('#8a6a4a')),-.45,-2.45,{y:.45,hide:true});stick.rotation.z=-1.1;stick.rotation.y=.6;
  at(sc,'long stick',()=>{D.grow(stick);fly(m1,-.1,.62,-2.65,.4,.8);mode(sc,me,'point');});
  at(sc,'over the fire',()=>{tween(.6,k=>{m1.position.set(-.1+k*.05,.62-k*.05,-2.68);});});
  at(sc,'golden brown',()=>{tween(1.5,k=>{m1.material=P.paper(k<.5?'#ffe8a8':'#d9a35a',{mix:.05});});boom(m1);});
  at(sc,'burn',()=>{say(sc,fr,'Do not let it burn!',2200);mode(sc,fr,'no',1200);});
  at(sc,'piece of chocolate',()=>{fly(ch,-.5,.31,-1.65,.3,.6);ch.scale.set(.6,1,1);});
  at(sc,'Slide',()=>{fly(m1,-.5,.34,-1.65,.6,.9);D.shrink(stick);});
  at(sc,'second cracker',()=>{fly(c2,-.5,.4,-1.65,.4,.6);});
  at(sc,'squeeze',()=>{tween(.5,k=>{m1.scale.y=1-k*.6;m1.scale.x=m1.scale.z=1+k*.35;});const g=D.ribbon(sc,[[-.62,.36,-1.62],[-.5,.33,-1.5],[-.38,.36,-1.62]],'#ffffff',{w:.03});});
  at(sc,'gooey bite',()=>{const s=new THREE.Group();[c1,ch,m1,c2].forEach(o=>{});fly(c2,-.75,.9,-2.2,.3,.6);fly(m1,-.75,.86,-2.2,.3,.6);fly(c1,-.75,.84,-2.2,.3,.6);fly(ch,-.75,.85,-2.2,.3,.6);mode(sc,me,'eat');say(sc,me,'Mmm, gooey!',2400);mode(sc,fr,'cheer');});
});

/* 16 · How Canada Got Its Name — a ship sails up the river to a village; "kanata" becomes a name on a map */
story('f16',sc=>{D.base(sc,'#b8d89a');
  const riv=put(sc,P.mk(new THREE.BoxGeometry(4.0,.02,.55),P.glow('#4c9fe0',.85,.22)),0,-2.15,{y:.012});
  put(sc,S.pine({s:.9}),-1.8,-3.3);put(sc,S.pine({s:.8}),-1.45,-3.5);put(sc,S.pine({s:.85}),1.9,-1.6);put(sc,S.pine({s:.7}),-1.9,-1.55);
  const vil=[];row(3,.0,1.5,(x,i)=>{const h=put(sc,S.house({w:.55,h:.32,d:.75,c:'#d9c29c',roof:'#a0805a',chimney:false}),x,-3.2+(i%2)*.15,{ry:.2,hide:true});vil.push(h);});
  at(sc,'village',()=>vil.forEach((h,i)=>sc.later(()=>D.grow(h),i*200)));
  const ship=put(sc,S.ship({c:'#8a5a3a',s:1.1}),-2.4,-2.15,{hide:true});
  const jc=person(sc,'explorer',0,0,{});jc.parent.remove(jc);ship.add(jc);jc.position.set(-.15,.08,0);jc.scale.setScalar(.6);jc.visible=true;
  at(sc,'Jacques Cartier',()=>{ship.visible=true;D.grow(ship);});
  at(sc,'sailed',()=>{sc.move(ship,-.4,-2.15,2.6);sc.tick((dt,t)=>{ship.rotation.z=Math.sin(t*2)*.04;});});
  const men=[person(sc,'man',.1,-2.65,{ry:-2,on:'two young men',p:{c:'#c2703d',h:'#141414',st:'long'}}),person(sc,'man',.45,-2.75,{ry:-2.2,on:'two young men',p:{c:'#8c5a2b',h:'#141414',st:'short'}})];
  at(sc,'pointed',()=>men.forEach(k=>mode(sc,k,'point',2600)));
  const kan=card(sc,'"Kanata"',.3,-2.45,{on:'Kanata',h:.26,col:'#5f3dc4'});
  card(sc,'kanata = village',1.25,-2.6,{on:'language',h:.18,col:'#2b8a3e'});
  at(sc,'Cartier thought',()=>{mode(sc,jc,'think',2400);});
  const map=put(sc,P.mk(new THREE.BoxGeometry(.9,.01,.6),P.paper('#f3e5c0',{mix:0})),-1.2,-1.65,{y:.01,on:'map'});
  const cn=card(sc,'Canada',-1.2,-1.75,{on:'wrote',h:.3,col:'#c92a2a'});
  at(sc,'everyone used',()=>{men.forEach(k=>mode(sc,k,'cheer',2000));mode(sc,jc,'cheer',2000);});
  at(sc,'ocean to ocean',()=>{const leaf=prop(sc,'maple leaf',-1.2,-1.75,{s:.7,y:.6});D.spin(sc,leaf,1);boom(leaf);D.ribbon(sc,[[-2,.3,-2.6],[-1,.7,-2.9],[0,.8,-3],[1,.7,-2.9],[2,.3,-2.6]],'#e03131',{w:.05,dur:1.6});});
});

/* 17 · Scotty the T. rex — a hike, a bone in the hill, and a skeleton that builds itself as it is dug out */
story('f17',sc=>{D.base(sc,'#e3cfa5');
  const hill=put(sc,S.hill(.7,{c:'#cfb486'}),-.2,-3.05);row(5,-1.8,1.8,(x,i)=>put(sc,S.rock({s:.8+(i%2)*.5}),x,-3.55+(i%3)*.15));
  card(sc,'1991',-1.65,-3.0,{on:'1991',h:.2,col:'#c92a2a'});put(sc,S.sign('Eastend, Sask.',{h:.18}),1.6,-3.1,{on:'Eastend'});
  const hk=[person(sc,'teacher',-1.9,-2.0,{ry:1.4,on:'teacher'}),person(sc,'man',-2.0,-2.3,{ry:1.4,on:'scientists',p:{cap:'#e8590c'}}),person(sc,'woman',-2.1,-1.7,{ry:1.4,on:'scientists'})];
  at(sc,'hiking',()=>hk.forEach((k,i)=>D.walk(sc,k,-1.3+i*.45,-2.1+(i%2)*.25,1.8,'point')));
  const bone=prop(sc,'bone',-.2,-2.85,{s:.5,y:.45,on:'old bone'});at(sc,'old bone',()=>{bone.rotation.z=.6;sc.fx('sparkle',{x:-.2,z:-2.85,w:.5,h:.8,y:.4});});
  at(sc,'dinosaur',()=>{say(sc,hk[0],'Was it a dinosaur?',2200);mode(sc,hk[0],'think',2000);},1);
  at(sc,'dig',()=>{hk.forEach(k=>mode(sc,k,'pull',3000));tween(1.5,k=>{hill.scale.y=1-k*.55;});D.shrink(bone);});
  const sk=S.skeleton();put(sc,sk,.4,-2.35,{s:1.1});const parts=sk.children.slice();parts.forEach(p=>p.visible=false);
  const show=(a,b)=>{for(let i=a;i<b&&i<parts.length;i++){const p=parts[i];sc.later(()=>{p.visible=true;D.grow(p,.4);},(i-a)*90);}};
  at(sc,'ribs',()=>show(0,13));at(sc,'teeth',()=>show(15,17));at(sc,'jaw',()=>show(16,17));at(sc,'huge tail',()=>show(13,15));
  at(sc,'Tyrannosaurus',()=>{show(17,parts.length);boom(sk);});
  put(sc,S.sign('SCOTTY',{h:.26,col:'#c92a2a'}),1.6,-1.7,{on:'named it Scotty'});
  at(sc,'biggest',()=>{tween(1,k=>sk.scale.setScalar(1.1+Math.sin(k*Math.PI)*.15));});
  at(sc,'Wow',()=>{hk.forEach(k=>mode(sc,k,'cheer'));boom(sk);});
});

/* 18 · My Little Sister's Challenge — wobble, wobble, into the bush… then all by herself! */
story('f18',sc=>{D.base(sc,'#b9dc9c');
  const path=D.ribbon(sc,[[-1.9,.02,-2.0],[-1.0,.02,-2.6],[.0,.02,-2.85],[1.0,.02,-2.55],[1.9,.02,-2.1]],'#d9c4a0',{w:.38,op:1,up:V(0,1,0)});path.userData.full();
  put(sc,S.tree({s:1}),-1.7,-3.3);put(sc,S.tree({s:.85}),1.75,-3.35);const bush=put(sc,S.bush({s:1.2}),.15,-3.3);put(sc,S.bench(),1.5,-1.65,{ry:-.4});
  const lily=person(sc,{c:'#f783ac',h:'#c8823c',st:'puffs',s:.64,skirt:1},-1.6,-2.15,{ry:1.2});const bike=put(sc,S.bike({c:'#e64980',training:true}),-1.6,-2.15,{ry:-.4,s:1.1});
  const me=kid(sc,3,-1.0,-1.7,{ry:.4});
  at(sc,'brave',()=>{mode(sc,lily,'cheer',1600);});
  at(sc,'training wheels',()=>{bike.children.slice(-2).forEach(w=>D.shrink(w));card(sc,'no training wheels!',-1.0,-2.75,{h:.16,col:'#c92a2a'}).visible=true;});
  const dad=person(sc,'dad',-1.85,-2.45,{ry:1.2,on:'Dad'});
  const curve=new THREE.CatmullRomCurve3([V(-1.6,0,-2.15),V(-1.0,0,-2.6),V(-.2,0,-2.85),V(.1,0,-3.1)]);
  const ride=(k)=>{const p=curve.getPoint(k),t=curve.getTangent(k);bike.position.copy(p);lily.position.copy(p).add(V(0,.12,0));const a=Math.atan2(t.x,t.z);lily.userData.ry=a;bike.rotation.y=a-Math.PI/2;};
  at(sc,'held the seat',()=>{dad.userData.mode='run';tween(2.4,k=>{ride(k*.55);const p=curve.getPoint(k*.55);dad.position.set(p.x-.2,0,p.z+.2);dad.userData.ry=Math.PI/2;});});
  at(sc,'wobbled',()=>{sc.tick((dt,t)=>{if(lily.userData.fell)return;lily.rotation.z=Math.sin(t*6)*.18;bike.rotation.x=Math.sin(t*6)*.12;});});
  at(sc,'fell',()=>{tween(1,k=>ride(.55+k*.45)).then(()=>{lily.userData.fell=1;tween(.4,k=>{lily.rotation.z=1.2*k;});});dad.userData.mode='idle';});
  at(sc,'helped her up',()=>{D.walk(sc,me,-.05,-2.85,1,'pull');sc.later(()=>{lily.rotation.z=0;},900);});
  at(sc,'Try again',()=>say(sc,me,'Try again!',2200));
  const curve2=new THREE.CatmullRomCurve3([V(-.2,0,-2.75),V(.6,0,-2.75),V(1.2,0,-2.4),V(1.6,0,-1.95)]);
  at(sc,'let go',()=>{lily.userData.fell=1;lily.rotation.z=0;bike.rotation.x=0;tween(2.6,k=>{const p=curve2.getPoint(k),t=curve2.getTangent(k);bike.position.copy(p);lily.position.copy(p).add(V(0,.12,0));const a=Math.atan2(t.x,t.z);lily.userData.ry=a;bike.rotation.y=a-Math.PI/2;});
    D.ribbon(sc,[[-.2,.3,-2.75],[.6,.35,-2.75],[1.2,.3,-2.4],[1.6,.3,-1.95]],'#ffd43b',{w:.05,dur:2.6});});
  at(sc,'cheered',()=>{[me,dad].forEach(k=>mode(sc,k,'cheer'));boom(lily);});
  at(sc,'every day',()=>{mode(sc,lily,'cheer');});
});

/* 19 · The Polar Bear Swim — silly hats, a bell, a giant splash, and a race back to the towels */
story('f19',sc=>{D.base(sc,'#efe1bf');
  const sea=put(sc,P.mk(new THREE.BoxGeometry(4.0,.03,1.05),P.glow('#4c9fe0',.82,.22)),0,-3.1,{y:.015});sc.tick((dt,t)=>{sea.position.y=.015+Math.sin(t*2)*.008;});
  for(let i=0;i<4;i++)D.ribbon(sc,[[-1.9,.04,-2.62-i*.05],[-.6,.04,-2.58-i*.05],[.6,.04,-2.62-i*.05],[1.9,.04,-2.6-i*.05]],'#ffffff',{w:.03,up:V(0,1,0)}).userData.full();
  put(sc,S.mountain({s:.75}),-1.6,-3.6);put(sc,S.mountain({s:.6}),-1.0,-3.65);card(sc,'English Bay, Vancouver',1.1,-3.45,{on:'Vancouver',h:.18,col:'#1c4fb8'});card(sc,'January 1',-1.5,-2.0,{on:'Day',h:.2,col:'#c92a2a'});
  const tw=[];row(4,-1.4,1.4,(x,i)=>{tw.push(put(sc,P.mk(new THREE.BoxGeometry(.4,.012,.24),P.paper(['#ff8787','#74c0fc','#ffd43b','#8ce99a'][i],{mix:.2})),x,-1.65,{y:.007,on:'towels'}));});
  const sw=[];[[0,'#e03131'],[2,'#ffd43b'],[4,'#7950f2'],[5,'#12b886']].forEach(([c,cap],i)=>{const k=kid(sc,c,-1.4+i*.95,-2.0,{ry:Math.PI,on:'Swimmers'});sw.push(k);});
  const raj=person(sc,'uncle',.0,-1.85,{ry:Math.PI,on:'Raj'});
  at(sc,'silly hats',()=>{sw.forEach((k,i)=>sc.later(()=>sc.wear(k,i%2?'hat':'helmet'),i*200));});
  const bell=prop(sc,'bell',1.75,-2.05,{s:.5,y:.3,on:'bell'});at(sc,'bell',()=>{ST().alive(bell,true);card(sc,'DING!',1.75,-2.4,{h:.18,col:'#e67700'});});
  at(sc,'splashes',()=>{sw.concat([raj]).forEach((k,i)=>sc.later(()=>{k.userData.mode='run';sc.move(k,k.position.x,-2.85,.8).then(()=>{k.userData.mode='swim';k.position.y=-.05;sc.fx('steam',{x:k.position.x,z:-2.85,w:.3,h:.5});});},i*120));boom(sea);});
  at(sc,'Brrr',()=>{sw.forEach(k=>k.userData.mode='shiver');card(sc,'Brrr!',0,-3.2,{h:.26,col:'#1971c2'}).visible=true;});
  at(sc,'like ice',()=>{for(let i=0;i<6;i++){const c=P.mk(new THREE.BoxGeometry(.1,.1,.1),P.glow('#d0ebff',.8,.3));c.position.set(-1.6+i*.6,.06,-3.3);sc.g.add(c);D.grow(c);}});
  at(sc,'race back',()=>{sw.concat([raj]).forEach((k,i)=>{k.position.y=0;D.walk(sc,k,tw[i%4].position.x,-1.7,.8,'shiver');});});
  at(sc,'wakes him up',()=>{mode(sc,raj,'cheer');say(sc,raj,'Happy New Year!',2600);});
});

/* 20 · Why the Sea Is Salty — a kind giant, a leg-bridge, biting ants, and a salty sea */
story('f20',sc=>{D.base(sc,'#d8c9a5');
  const sea=put(sc,P.mk(new THREE.BoxGeometry(1.8,.03,2.2),P.glow('#4c9fe0',.82,.22)),0,-2.5,{y:.015});card(sc,'Philippines',-1.45,-1.6,{on:'Philippines',h:.18,col:'#2b8a3e'});
  const cave=put(sc,S.cave(),1.55,-3.0,{s:1.2});const salt=[];for(let i=0;i<5;i++)salt.push(put(sc,P.mk(new THREE.BoxGeometry(.1,.1,.1),P.paper('#ffffff',{mix:0})),1.3+(i%3)*.15,-2.4-(i>2?.15:0),{y:.05,on:'salt'}));
  const giant=person(sc,{c:'#2f9e44',h:'#5b3a1e',st:'curly',s:1.5},1.55,-2.3,{ry:-1.4,on:'giant'});
  row(3,-1.9,-1.2,(x,i)=>put(sc,S.house({w:.45,h:.3,d:.45,roof:'#c99a5b',chimney:false}),x,-3.3+i*.1,{s:1}));put(sc,S.tree({s:.7,c:'#69db7c'}),-1.8,-2.6);
  const ppl=[kid(sc,0,-1.4,-2.3,{ry:1.5}),kid(sc,3,-1.6,-2.0,{ry:1.5}),person(sc,'woman',-1.2,-1.85,{ry:1.5})];
  at(sc,'stormy',()=>{sc.fx('rain',{x:0,z:-2.5,w:4,d:2,h:2});put(sc,S.cloud(),-.3,-2.8,{y:1.4});put(sc,S.cloud(),.5,-2.5,{y:1.5,s:.8});});
  at(sc,'ran out',()=>ppl.forEach(k=>mode(sc,k,'sad',2500)));
  const leg=P.mk(new THREE.CylinderGeometry(.09,.09,1,12),P.paper('#e8d5b0',{mix:0}));leg.rotation.z=Math.PI/2;put(sc,leg,.0,-2.45,{y:.2,hide:true});
  at(sc,'stretched',()=>{leg.visible=true;leg.scale.y=.01;tween(1.4,k=>{leg.scale.y=Math.max(.01,k*2.5);leg.position.x=1.3-k*1.25;});mode(sc,giant,'point');});
  at(sc,'walked over',()=>ppl.forEach((k,i)=>sc.later(()=>{k.userData.mode='walk';sc.move(k,1.0+i*.15,-2.45+(i-1)*.15,2.2,.28).then(()=>k.userData.mode='pull');},i*300)));
  at(sc,'filled their bags',()=>ppl.forEach(k=>{const b=S.bag({c:'#d7c49e'});b.scale.setScalar(.6);k.userData.arms[1].add(b);b.position.set(0,-.4,0);}));
  const ants=[];at(sc,'red ants',()=>{for(let i=0;i<6;i++){const a=prop(sc,'ant',.2+i*.12,-2.45,{s:.18,y:.3});ants.push(a);}});
  at(sc,'jumped',()=>{giant.userData.mode='jump';tween(.5,k=>{leg.position.y=.2+Math.sin(k*Math.PI)*.3;});ppl.forEach((k,i)=>sc.later(()=>{k.userData.mode='swim';tween(.6,q=>{k.position.y=.28-q*.3;k.position.x=.2+i*.3;});},i*120));salt.forEach((s,i)=>fly(s,-.5+i*.25,0,-2.5+(i%2)*.3,.6,.8));});
  at(sc,'saved the people',()=>{ppl.forEach((k,i)=>fly(k,-1.4+i*.2,0,-2.2+i*.12,.8,1).then(()=>k.userData.mode='cheer'));D.shrink(leg);});
  at(sc,'salt melted',()=>{salt.forEach(s=>D.shrink(s,1.2));sc.fx('sparkle',{x:0,z:-2.5,w:1.6,h:.6});});
  at(sc,'salty',()=>{card(sc,'salty!',0,-2.5,{h:.26,col:'#1971c2'}).visible=true;},2);
});

/* 21 · My Grandma's Special Hobby — yarn balls, clicking needles, and tiny hats for tiny babies */
story('f21',sc=>{D.base(sc,'#eadbc8');
  put(sc,S.rug(1.6,1.0,'#ffa8a8'),-1.0,-2.5);const ch=put(sc,S.chair({c:'#c0eb75'}),-1.1,-2.75,{s:1.4});
  const gm=person(sc,'grandma',-1.1,-2.68,{ry:0});gm.position.y=.06;
  const yarn=[];['#ff6b6b','#ffd43b','#74c0fc','#b197fc'].forEach((c,i)=>{const y=put(sc,P.mk(new THREE.SphereGeometry(.09,14,10),P.paper(c,{mix:.1})),-1.7+i*.2,-2.15,{y:.09,on:'knits'});yarn.push(y);});
  at(sc,'knits',()=>{mode(sc,gm,'clap');D.ribbon(sc,[[-1.7,.1,-2.15],[-1.5,.4,-2.3],[-1.2,.55,-2.5],[-1.1,.62,-2.6]],'#ff6b6b',{w:.025});});
  const baby=person(sc,'baby',-.4,-2.0,{ry:-.6,on:'baby'});at(sc,'tiny clothes',()=>{tint(baby,'#ffd8a8');boom(baby);});
  const hosp=put(sc,S.house({w:1.1,h:.7,d:.7,c:'#f8f9fa',roof:'#74c0fc',chimney:false}),1.25,-3.2,{on:'hospital'});const sign=card(sc,'Hospital',1.25,-2.75,{on:'hospital',h:.18,col:'#e03131'});
  const cribs=[];row(3,.6,1.8,(x,i)=>{const c=put(sc,S.bed({c:['#ffc9c9','#d0ebff','#fff3bf'][i]}),x,-2.1,{s:.45,on:'very small'});cribs.push(c);});
  const hats=[];['#ff6b6b','#ffd43b','#74c0fc'].forEach((c,i)=>{const h=put(sc,P.mk(new THREE.ConeGeometry(.07,.1,12),P.paper(c,{mix:.05})),-1.1,-2.4,{y:.65,hide:true});hats.push(h);});
  at(sc,'little hats',()=>hats.forEach((h,i)=>sc.later(()=>{D.grow(h);fly(h,.6+i*.6,.25,-2.15,.8,1.1);},i*500)));
  at(sc,'bright colours',()=>sc.fx('sparkle',{x:1.2,z:-2.1,w:1.4,h:.8}));
  at(sc,'fighters',()=>{say(sc,gm,'These babies are fighters!',2600);});
  at(sc,'stronger',()=>cribs.forEach((c,i)=>sc.later(()=>ST().alive(c,true),i*200)));
  const me=kid(sc,1,-.35,-2.7,{ry:-1.2,on:'proud'});at(sc,'proud',()=>mode(sc,me,'cheer',1800));
  at(sc,'learning to knit',()=>{D.walk(sc,me,-.6,-2.6,.8,'clap');D.ribbon(sc,[[-1.5,.1,-2.15],[-1.0,.35,-2.35],[-.6,.5,-2.55]],'#b197fc',{w:.025});});
});
/* 22 · Fluffy the Wonder Dog — out the gate, back with nothing, out again… with the neighbour's paper! */
story('f22',sc=>{D.base(sc,'#bfe0a0');
  put(sc,S.house({w:1.0,h:.62,d:.7,roof:'#2b8a3e'}),-1.4,-3.15,{ry:.15});put(sc,S.house({w:.85,h:.55,d:.65,roof:'#c2553a'}),1.45,-3.2,{ry:-.15});
  put(sc,S.fence(1.3),-1.35,-2.5);put(sc,S.fence(1.3),1.4,-2.55);put(sc,S.road(4.0),0,-1.75);const mb=prop(sc,'mailbox',1.0,-2.3,{s:.45});
  const mr=person(sc,{c:'#2f9e44',h:'#adb5bd',st:'short',s:1.08,gl:1},-1.0,-2.75,{ry:.6,on:'Mr. Green'});const mrs=person(sc,{c:'#e64980',h:'#adb5bd',st:'bun',s:1.04,skirt:1},-1.7,-2.6,{ry:.5,on:'Mrs. Green'});
  const fl=prop(sc,'dog',-.7,-2.4,{s:.5});at(sc,'clever',()=>ST().alive(fl,true));
  const paper=prop(sc,'newspaper',1.1,-2.05,{s:.35,y:.05,hide:true});
  at(sc,'fetch the newspaper',()=>{mode(sc,mr,'point',2000);sc.move(fl,.0,-2.0,1).then(()=>sc.move(fl,-.6,-2.4,1));});
  at(sc,'nothing',()=>{say(sc,fl,'?',1800);});
  at(sc,'Go and get',()=>{say(sc,mr,'Go and get the paper!',2400);mode(sc,mr,'point',2000);});
  at(sc,'looked sad',()=>{tween(.5,k=>{fl.rotation.x=k*.3;}).then(()=>sc.later(()=>tween(.3,k=>{fl.rotation.x=.3*(1-k);}),800));});
  at(sc,'went out again',()=>{sc.move(fl,1.1,-2.15,1.4).then(()=>{paper.visible=true;D.grow(paper);});});
  at(sc,'in his mouth',()=>{sc.move(fl,-.6,-2.35,1.4);tween(1.4,k=>{paper.position.set(1.1-1.7*k,.32,-2.15+(-.2)*k);});});
  at(sc,'Mrs. Green laughed',()=>{mode(sc,mrs,'cheer',2400);});
  const cal=card(sc,'SUNDAY',-.1,-3.1,{on:'Sunday',h:.26,col:'#c92a2a'});
  at(sc,'no paper',()=>{say(sc,mrs,'There is no paper on Sunday!',2800);});
  at(sc,'neighbour',()=>{mode(sc,mr,'point',1600);boom(paper);});
  at(sc,'sit down',()=>{[mr,mrs].forEach(k=>{k.userData.mode='cheer';tween(.5,q=>{k.position.y=-.18*q;});});ST().alive(fl,true);});
});

/* 23 · Dear Diary: A New Student — a pink skipping rope, a swing, and feelings that change */
story('f23',sc=>{D.base(sc,'#d7e9c4');
  put(sc,S.house({w:1.6,h:.6,d:.5,c:'#f1e3c6',roof:'#e8590c',chimney:false}),-1.0,-3.45);card(sc,'Dear Diary',1.4,-3.5,{h:.22,col:'#5f3dc4'});
  const sw=put(sc,S.swing(),1.35,-2.6,{s:1.2});
  const emi=person(sc,{c:'#f783ac',h:'#141414',st:'bob',s:.84,skirt:1},-.6,-2.55,{ry:.3,on:'Emi'});
  const me=kid(sc,3,-1.6,-2.0,{ry:.8});const bf=kid(sc,5,-1.6,-2.6,{ry:.8});
  let rope=null,rt=0,skip=false;
  at(sc,'skipping rope',()=>{rope=D.ribbon(sc,[[-.85,.45,-2.55],[-.6,.05,-2.45],[-.35,.45,-2.55]],'#f06595',{w:.035});rope.userData.full();skip=true;});
  sc.tick((dt)=>{if(!skip||!rope)return;rt+=dt*6;rope.rotation.x=0;rope.position.y=Math.sin(rt)*.0;const a=rt;rope.scale.y=Math.cos(a);rope.position.y=.45*(1-Math.cos(a))*.5;emi.position.y=Math.max(0,Math.sin(a))*.12;});
  const feel=(w,t,col)=>at(sc,w,()=>{const c=card(sc,t,me.position.x,me.position.z-.15,{h:.2,col,y:1.05});c.visible=true;D.grow(c);sc.later(()=>D.shrink(c),2600);});
  feel('jealous','jealous','#2b8a3e');at(sc,'old and grey',()=>prop(sc,'rope',-1.25,-1.75,{s:.4}));
  at(sc,'I said no',()=>{mode(sc,me,'no',1500);say(sc,me,'No.',1500);});
  at(sc,'skipped with Emi',()=>{D.walk(sc,bf,-.3,-2.35,1,'jump');});
  feel('angry','angry','#e03131');
  at(sc,'swing',()=>{D.walk(sc,me,1.35,-2.45,1.2,'sad');let q=0;sc.tick(dt=>{q+=dt;sw.userData.seat.rotation.x=Math.sin(q*2)*.3;});});
  feel('lonely','sad and lonely','#1c7ed6');
  at(sc,'came over',()=>{skip=false;D.walk(sc,bf,1.0,-2.2,1.2,'wave');});
  at(sc,'Come and play',()=>say(sc,bf,'Come and play with us!',2600));
  feel('ashamed','ashamed','#862e9c');
  at(sc,'sorry',()=>{D.walk(sc,me,-.25,-2.3,1.2,'idle');sc.later(()=>say(sc,me,'Sorry, Emi.',2200),1200);});
  at(sc,'friends',()=>{skip=true;[me,bf,emi].forEach(k=>mode(sc,k,'cheer'));},1);
  feel('happy','happy!','#f08c00');
});

/* 24 · A New Old Game — a bag of jacks, a bouncing ball, and five jacks by Monday */
story('f24',sc=>{D.base(sc,'#e9dcc4');
  put(sc,S.rug(2.6,1.5,'#e599f7'),0,-2.5);put(sc,S.shelf(),-1.4,-3.5);put(sc,S.window(),1.2,-3.62,{y:.45});
  const gp=person(sc,'grandpa',-.5,-3.0,{ry:.3});gp.position.y=-.25;gp.userData.mode='read';const me=kid(sc,4,.7,-2.0,{ry:-2.4});me.position.y=-.2;
  const bag=put(sc,S.bag({c:'#a5d8ff'}),0,-2.5,{on:'little bag',s:.8});
  const ball=put(sc,P.mk(new THREE.SphereGeometry(.07,14,10),P.paper('#e03131',{mix:.05})),0,-2.5,{y:.08,on:'red rubber ball'});
  const jacks=[];const jk=()=>{const g=new THREE.Group();for(let a=0;a<3;a++){const b=P.mk(new THREE.CylinderGeometry(.008,.008,.12,5),P.paper('#adb5bd',{mix:0}));b.rotation.set(a===0?Math.PI/2:0,0,a===2?Math.PI/2:0);g.add(b);}return g;};
  at(sc,'fifteen metal jacks',()=>{for(let i=0;i<15;i++){const j=jk();put(sc,j,0,-2.5,{y:.1});jacks.push(j);D.grow(j);}card(sc,'15 jacks',.9,-2.9,{h:.18,col:'#495057'}).visible=true;});
  at(sc,'your age',()=>say(sc,gp,'We played this when I was your age!',2800));
  at(sc,'scattered',()=>{D.shrink(bag);jacks.forEach((j,i)=>{const a=i*2.4,r=.25+(i%5)*.12;fly(j,Math.cos(a)*r,.06,-2.4+Math.sin(a)*r*.6,.3,.6);j.rotation.y=a;});});
  const toss=(n)=>{fly(ball,0,1.2,-2.5,0,.6).then(()=>fly(ball,0,.08,-2.4,0,.6)).then(()=>fly(ball,0,.4,-2.45,0,.3)).then(()=>fly(ball,-.1,.4,-2.7,.1,.3));};
  at(sc,'tossed',()=>{mode(sc,gp,'point',1200);fly(ball,0,1.3,-2.5,0,.8);});
  at(sc,'grabbed one',()=>{const j=jacks.pop();fly(j,-.4,.5,-2.85,.2,.5).then(()=>D.shrink(j));});
  at(sc,'caught the ball',()=>{fly(ball,0,.08,-2.45,0,.4).then(()=>fly(ball,-.4,.45,-2.85,.25,.5));});
  at(sc,'two jacks',()=>{[jacks.pop(),jacks.pop()].forEach(j=>fly(j,-.4,.5,-2.85,.3,.5).then(()=>D.shrink(j)));card(sc,'2',-.2,-2.15,{h:.22}).visible=true;});
  at(sc,'then three',()=>{[jacks.pop(),jacks.pop(),jacks.pop()].forEach(j=>fly(j,-.4,.5,-2.85,.3,.5).then(()=>D.shrink(j)));card(sc,'3!',.2,-2.15,{h:.22,col:'#c92a2a'}).visible=true;});
  const day=(w,x)=>at(sc,w,()=>{const c=card(sc,w,x,-1.7,{h:.18,col:'#1c4fb8'});c.visible=true;D.grow(c);mode(sc,me,'pull',1600);});
  day('Saturday',-1.3);day('Sunday',-.4);day('Monday',.5);
  at(sc,'pick up five',()=>{mode(sc,me,'cheer');const c=card(sc,'5!',1.4,-1.75,{h:.3,col:'#2b8a3e'});c.visible=true;boom(c);});
});

/* 25 · What Will I Be? — dreams pop up around the kid, each one joined by a colour ribbon */
story('f25',sc=>{D.base(sc,'#e7e0f5');
  const me=kid(sc,0,0,-2.45,{ry:0,mode:'think'});
  const spot=(w,x,z,make,col,lab)=>{const g=new THREE.Group();put(sc,g,x,z,{hide:true});make(g);
    at(sc,w,()=>{D.grow(g);D.ribbon(sc,[[0,.9,-2.45],[(x)*.5,1.2,(z-2.45)/2],[x,.7,z]],col,{w:.04,dur:.8});if(lab){const c=card(sc,lab,x,z+.3,{h:.15,col});c.visible=true;D.grow(c);}});return g;};
  spot('firefighter',-1.55,-3.25,g=>{const t=S.firetruck();t.scale.multiplyScalar(.7);g.add(t);const d=P.mannequin(P.PEOPLE.firefighter);d.scale.setScalar(.8);d.position.set(.45,0,.1);g.add(d);},'#e03131','firefighter');
  spot('doctor',-.5,-3.4,g=>{const d=P.mannequin(P.PEOPLE.doctor);d.scale.setScalar(.85);g.add(d);const s=ST().prop('stethoscope',{label:false,s:.35,bare:true});s.position.set(.3,.1,0);g.add(s);},'#1c7ed6','doctor');
  spot('fixes cars',.55,-3.4,g=>{const c=S.car({c:'#74c0fc'});c.scale.setScalar(1.1);g.add(c);const w=ST().prop('wrench',{label:false,s:.35,bare:true});w.position.set(.35,.15,.1);g.add(w);},'#495057','mechanic');
  spot('piano',1.55,-3.2,g=>{g.add(S.piano());},'#5f3dc4','piano teacher');
  spot('vet',-1.6,-2.0,g=>{const a=ST().prop('dog',{label:false,s:.45,bare:true});g.add(a);const b=ST().prop('cat',{label:false,s:.4,bare:true});b.position.x=.35;g.add(b);},'#2b8a3e','vet');
  spot('zookeeper',-1.0,-1.6,g=>{const a=ST().prop('lion',{label:false,s:.5,bare:true});g.add(a);},'#f08c00','zookeeper');
  spot('cook',.9,-1.65,g=>{g.add(ST().prop('pot',{s:.6}));},'#e8590c','cook');
  spot('paint',1.6,-2.05,g=>{const p=ST().prop('palette',{label:false,s:.5,bare:true});g.add(p);},'#d6336c','painter');
  at(sc,'What will I be',()=>{say(sc,me,'What will I be?',2200);mode(sc,me,'think');});
  at(sc,'love animals',()=>mode(sc,me,'cheer',1600));
  const gm=person(sc,'grandma',.6,-2.1,{ry:-.6,on:'Grandma says'});
  at(sc,'choose now',()=>say(sc,gm,'You do not have to choose now.',2800));
  const bulb=prop(sc,'light bulb',0,-2.45,{s:.4,y:1.35,on:'great idea'});at(sc,'great idea',()=>{boom(bulb);mode(sc,me,'cheer');D.bob(sc,bulb,.06,3);});
});

/* 26 · When Grandma Was a Girl — a piggy bank today; long ago, candy or a chick? */
story('f26',sc=>{D.base(sc,'#efe2c6');
  const div=put(sc,P.mk(new THREE.BoxGeometry(.04,.3,2.2),P.paper('#d8c9ad')),-.6,-2.5,{y:.15});
  card(sc,'today',-1.35,-3.45,{h:.18,col:'#1c4fb8'});card(sc,'long ago',.7,-3.5,{h:.18,col:'#8a5a2b',on:'young'});
  const gm=person(sc,'grandma',-1.6,-2.8,{ry:.6});const me=kid(sc,1,-1.0,-2.3,{ry:-.8});
  const pig=prop(sc,'pig',-1.3,-2.0,{s:.45,on:'piggy bank'});const toonie=prop(sc,'coin',-1.6,-2.4,{s:.3,y:.5,on:'toonie'});
  at(sc,'shiny toonie',()=>{fly(toonie,-1.3,.5,-2.0,.4,.8).then(()=>{D.shrink(toonie);ST().alive(pig,true);});});
  at(sc,'told me a story',()=>{mode(sc,gm,'read');mode(sc,me,'sit');});
  /* the country fair, long ago */
  const fair=new THREE.Group();put(sc,fair,.65,-2.6,{hide:true});const ferris=ST().prop('ferris wheel',{label:false,s:.9,bare:true});ferris.position.set(.9,0,-.6);fair.add(ferris);
  const tent=S.tent({c:'#e64980'});tent.scale.setScalar(.8);tent.position.set(-.5,0,-.6);fair.add(tent);
  at(sc,'country fair',()=>{D.grow(fair);sc.fx('sparkle',{x:.8,z:-3.0,w:1.6,h:.8});});
  const girl=person(sc,{c:'#ff8787',h:'#e2b04a',st:'puffs',s:.72,skirt:1},.2,-2.2,{ry:.4,on:'father'});const fa=person(sc,'man',.0,-2.6,{ry:.6,on:'father',p:{c:'#5c940d'}});
  const dol=card(sc,'$1',.1,-2.1,{h:.18,col:'#2b8a3e',on:'one dollar'});
  const candy=prop(sc,'lollipop',.95,-2.2,{s:.45,on:'candy'});const chick=prop(sc,'chick',1.45,-2.2,{s:.45,on:'tiny chick'});
  at(sc,'grow big',()=>{tween(1.2,k=>chick.scale.setScalar(.45*(1+k*.8)));});
  const eggs=[];at(sc,'lay eggs',()=>{for(let i=0;i<3;i++){const e=prop(sc,'egg',1.3+i*.2,-1.75,{s:.25});eggs.push(e);}});
  at(sc,'more money',()=>{eggs.forEach((e,i)=>{D.shrink(e);const c=prop(sc,'coin',1.3+i*.2,-1.75,{s:.25,y:.2});D.bob(sc,c,.05,3);});});
  at(sc,'looked at the candy',()=>{D.walk(sc,girl,.8,-2.0,.8,'think');});
  at(sc,'I will buy the chick',()=>{D.walk(sc,girl,1.3,-2.0,.6,'cheer');say(sc,girl,'I will buy the chick!',2600);D.shrink(candy);boom(chick);});
  at(sc,'proud',()=>{mode(sc,fa,'clap');boom(fa);mode(sc,gm,'cheer');});
});

/* 27 · The Fox and the Stork — flat dishes one night, tall jars the next */
story('f27',sc=>{D.base(sc,'#e6dcc0');
  const night=card(sc,'Night 1',-1.5,-3.4,{h:.2,col:'#1c4fb8'});
  const tb=put(sc,S.table({w:1.5,d:.7,h:.3,c:'#c99a6a'}),0,-2.6);
  const fox=prop(sc,'fox',-1.05,-2.6,{s:.7});fox.rotation.y=1.2;const stork=prop(sc,'flamingo',1.05,-2.6,{s:.95});stork.rotation.y=-1.2;
  at(sc,'invited',()=>{ST().alive(fox,true);},1);
  const d1=put(sc,S.dish({soup:'#f59f00'}),-.4,-2.6,{y:.33,on:'flat dishes'}),d2=put(sc,S.dish({soup:'#f59f00'}),.4,-2.6,{y:.33,on:'flat dishes'});
  at(sc,'licked his soup',()=>{tween(.8,k=>{fox.position.x=-1.05+k*.4;});ST().alive(fox);sc.later(()=>{d1.children[1]&&D.shrink(d1.children[1]);},700);});
  at(sc,'could not drink',()=>{tween(.6,k=>{stork.rotation.z=k*.4;}).then(()=>tween(.6,k=>{stork.rotation.z=.4*(1-k);}));const c=card(sc,'?',.75,-2.6,{h:.3,y:.95});c.visible=true;});
  at(sc,'did not fit',()=>{const c=card(sc,'too flat!',.6,-2.2,{h:.16,col:'#c92a2a'});c.visible=true;});
  at(sc,'her dish too',()=>{tween(.8,k=>{fox.position.x=-.65+k*.7;});sc.later(()=>{d2.children[1]&&D.shrink(d2.children[1]);},700);});
  at(sc,'next night',()=>{night.visible=false;card(sc,'Night 2',-1.5,-3.4,{h:.2,col:'#5f3dc4'}).visible=true;D.shrink(d1);D.shrink(d2);fox.position.x=-1.05;});
  const j1=put(sc,S.jar({h:.45,c:'#a5d8ff'}),-.4,-2.6,{y:.32,on:'tall jars'}),j2=put(sc,S.jar({h:.45,c:'#a5d8ff'}),.4,-2.6,{y:.32,on:'tall jars'});
  at(sc,'dipped her beak',()=>{tween(.8,k=>{stork.position.x=1.05-k*.45;stork.rotation.z=k*.5;}).then(()=>sc.later(()=>tween(.6,k=>{stork.rotation.z=.5*(1-k);}),900));});
  at(sc,'could not reach',()=>{tween(.8,k=>{fox.position.x=-1.05+k*.45;fox.position.y=Math.abs(Math.sin(k*Math.PI*3))*.15;});const c=card(sc,'too tall!',-.6,-2.2,{h:.16,col:'#c92a2a'});c.visible=true;});
  at(sc,'went home hungry',()=>{fox.rotation.y=-1.6;sc.move(fox,-2.0,-1.8,2);});
  at(sc,'wiser',()=>{const c=card(sc,'Treat others the way you want to be treated.',0,-1.65,{h:.14,col:'#2b8a3e'});c.visible=true;D.grow(c);});
});

/* 28 · Johnny Appleseed — seeds from the mill, a long walk west, and rows of apple trees growing behind him */
story('f28',sc=>{D.base(sc,'#cfe3b0');
  const mill=put(sc,S.house({w:.75,h:.55,d:.6,c:'#e9d8b8',roof:'#8a5a3a'}),-1.6,-3.25);const wm=ST().prop('windmill',{s:.55});put(sc,wm,-1.05,-3.4);sc.tick(dt=>{wm.userData.spin.rotation.z+=dt*1.5;});
  card(sc,'cider mill',-1.6,-2.8,{on:'cider mills',h:.16,col:'#8a5a3a'});
  const path=D.ribbon(sc,[[-1.5,.02,-2.6],[-.5,.02,-2.3],[.5,.02,-2.5],[1.7,.02,-2.2]],'#d9c4a0',{w:.3,op:1,up:V(0,1,0)});path.userData.full();
  const jo=person(sc,{c:'#8a6a4a',h:'#6b4423',st:'long',s:1.06},-1.5,-2.6,{ry:1.2,on:'John Chapman'});
  at(sc,'apple trees',()=>{const t=put(sc,S.tree({s:.6,c:'#69db7c'}),-.9,-3.0);D.grow(t);},1);
  const sack=S.sack({c:'#c9a16a'});sack.scale.setScalar(.7);
  at(sc,'collected apple seeds',()=>{prop(sc,'seed',-1.3,-2.9,{s:.3});mode(sc,jo,'pull',1800);});
  at(sc,'sack of seeds',()=>{jo.userData.body.add(sack);sack.position.set(0,.55,-.15);D.grow(sack);});
  const curve=new THREE.CatmullRomCurve3([V(-1.5,0,-2.6),V(-.5,0,-2.3),V(.5,0,-2.5),V(1.7,0,-2.2)]);
  const trees=[];[[-.8,-2.0],[-.3,-1.75],[.2,-2.0],[.8,-1.8],[1.3,-2.0],[-.1,-2.9],[.6,-3.05],[1.25,-2.85]].forEach(([x,z],i)=>{const t=S.tree({s:.55,c:'#74b85f'});put(sc,t,x,z,{hide:true});trees.push(t);});
  at(sc,'walked west',()=>{jo.userData.mode='walk';tween(5,k=>{const p=curve.getPoint(k*.75),t=curve.getTangent(k*.75);jo.position.copy(p);jo.userData.ry=Math.atan2(t.x,t.z);},x=>x).then(()=>jo.userData.mode='idle');card(sc,'WEST →',1.6,-1.7,{h:.18,col:'#1c4fb8'}).visible=true;});
  at(sc,'planted rows',()=>{mode(sc,jo,'pull',2000);trees.slice(0,5).forEach((t,i)=>sc.later(()=>{const sp=S.flower('daisy',{h:.15,c:'#8ce99a'});put(sc,sp,t.position.x,t.position.z);D.grow(sp);t.userData.sp=sp;},i*250));});
  const kids=[kid(sc,1,.9,-1.6,{ry:Math.PI,on:'children'}),kid(sc,5,1.35,-1.65,{ry:Math.PI,on:'children'})];
  at(sc,'kind to everyone',()=>mode(sc,jo,'wave',2000));at(sc,'stories',()=>{kids.forEach(k=>mode(sc,k,'clap',2400));say(sc,jo,'Once upon a time…',2200);});
  const nm=card(sc,'Johnny Appleseed',0,-3.45,{h:.26,col:'#c92a2a',on:'Johnny Appleseed',nth:2});
  at(sc,'grew tall',()=>{trees.forEach((t,i)=>sc.later(()=>{if(t.userData.sp)D.shrink(t.userData.sp);D.grow(t,.9);for(let a=0;a<5;a++){const ap=P.mk(new THREE.SphereGeometry(.04,8,6),P.paper('#e03131',{mix:.05}));ap.position.set(Math.cos(a*1.3)*.13,.4+Math.sin(a*2)*.08,Math.sin(a*1.3)*.13+.05);t.add(ap);}},i*150));});
  at(sc,'still standing',()=>{kids.concat([jo]).forEach(k=>mode(sc,k,'cheer'));boom(trees[3]);});
});

/* practice questions: no repeated character standing in every question — just the things it is about */
Object.keys(P.SCN).forEach(id=>{const R=P.SCN[id].rounds||{};Object.keys(R).forEach(k=>{const f=R[k];const src=String(typeof f==='function'?f:f&&f.scene);if(!/sc\.kid\(/.test(src))return;
  if(typeof f==='function')delete R[k];else delete f.scene;});});
})();
