/* The Interactive Classroom: Grade 2 Social Studies — story dioramas. */
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
const lights=(sc,on)=>{};

/* o01 · Amira's Family Tree */
story('o01',sc=>{D.base(sc,'#e9e2d6');const tr=put(sc,S.tree({s:1.25,c:'#8ce99a'}),0,-3.1);const amira=kid(sc,1,-1.7,-1.9,{ry:.5,name:'Amira'});
  const fr=(t,x,y,z,col)=>{const c=P.card(t,{h:.14,stand:false,tilt:-.3,col});c.position.set(x,y*.75,z+.25);c.visible=false;sc.g.add(c);return c;};
  const rows=[[['Grandpa',-.35],['Grandma',.35]],[['Dad',-.7],['Aunt Sara',0],['Uncle Ali',.7]],[['Mom',-.85],['baby brother',-.25],['Amira',.35],['cousins',.95]]];
  rows.forEach((r,ri)=>r.forEach(([n,x])=>{const c=fr(n,x,1.45-ri*.42,-3.2+ri*.1,['#c92a2a','#1c7ed6','#2b8a3e'][ri]);at(sc,n==='Amira'?'herself':n,()=>{c.visible=true;D.grow(c);});}));
  at(sc,'got married',()=>{const h=prop(sc,'heart',0,-3.1,{s:.18,y:1.5});D.bob(sc,h,.05,3);});
  const fam=[person(sc,'grandpa',-1.3,-2.3,{ry:.5,on:'Grandpa'}),person(sc,'grandma',-.9,-2.3,{ry:.4,on:'Grandma'}),person(sc,'dad',-.4,-2.2,{ry:.3,on:'Dad'}),person(sc,'mom',.1,-2.2,{ry:0,on:'Mom'}),person(sc,'baby',.45,-2.0,{on:'baby brother'}),kid(sc,3,1.0,-2.0,{ry:-.4,on:'cousins'}),kid(sc,4,1.4,-2.1,{ry:-.6,on:'cousins'})];
  const t=person(sc,'teacher',1.75,-2.6,{ry:-1,on:'her teacher'});at(sc,'shapes and sizes',()=>say(sc,t,'Every family is special!',2600));
  at(sc,'every one is special',()=>fam.concat([amira]).forEach(k=>mode(sc,k,'cheer')));
});
/* o02 · The Class Celebration Calendar */
story('o02',sc=>{D.base(sc,'#e9e2d6');put(sc,P.mk(new THREE.BoxGeometry(3.4,.7,.04),P.paper('#fff9db',{mix:0})),0,-3.6,{y:.35});card(sc,'Celebration Calendar',0,-3.45,{h:.18,col:'#5f3dc4',on:'celebration calendar'});
  const Q=[['Hamza',-1.5,0,'Eid al-Fitr','#2b8a3e'],['Ruth',-.5,2,'Hanukkah','#1c7ed6'],['Kai',.5,4,'Powwow','#e8590c'],['Lin',1.5,1,'Lunar New Year','#c92a2a']];
  Q.forEach(([n,x,ci,f,col])=>{const k=kid(sc,ci,x,-2.0,{ry:Math.PI,on:n});at(sc,n,()=>label(sc,f,x,-3.15,col));});
  at(sc,'sweets',()=>{for(let i=0;i<3;i++)prop(sc,'cookie',-1.7+i*.2,-2.6,{s:.15});const m=prop(sc,'moon',-1.5,-2.9,{s:.25,y:.5});});
  const men=prop(sc,'menorah',-.5,-2.7,{s:.45,on:'lights a candle',p3:{unlit:true}});at(sc,'eight nights',()=>{const r=men.children[0];for(let i=0;i<9;i++)sc.later(()=>{const f=r.userData['f'+i];if(f)f.visible=true;},i*200);});
  const dr=prop(sc,'drum',.5,-2.7,{s:.35,on:'drums'});at(sc,'singing',()=>sc.fx('notes',{x:.5,z:-2.7,w:.5,h:1,y:.4}));at(sc,'regalia',()=>D.ribbon(sc,[[.2,.6,-2.5],[.5,.9,-2.6],[.8,.6,-2.5]],'#fab005',{w:.06}));
  const dp=prop(sc,'dumpling',1.3,-2.6,{s:.2,on:'dumplings'});const dg=prop(sc,'dragon',1.6,-2.7,{s:.5,on:'dragon dance'});at(sc,'dragon dance',()=>sc.tick((dt,t)=>{dg.position.y=Math.abs(Math.sin(t*4))*.1;dg.rotation.y=-.6+Math.sin(t*2)*.3;}));
});
/* o03 · The Recipe Box */
story('o03',sc=>{D.base(sc,'#eadfcf');put(sc,S.counter(2.6),-.4,-3.4);const leo=kid(sc,0,-1.5,-2.2,{ry:.6});const gm=person(sc,'grandma',-1.0,-2.9,{ry:.4});
  const box=prop(sc,'box',-1.2,-3.4,{s:.25,y:.37,on:'recipe box',p3:{c:'#c99a6a'}});
  const rc=(t,x,col)=>{const c=card(sc,t,x,-3.0,{h:.13,col,y:.0});c.visible=true;D.grow(c);return c;};
  at(sc,'gnocchi',()=>{rc('gnocchi · Italy',-.5,'#2b8a3e');for(let i=0;i<5;i++)prop(sc,'dumpling',-.7+i*.1,-2.6,{s:.08});});
  at(sc,'nonna taught her',()=>{say(sc,gm,'My nonna taught me!',2400);D.ribbon(sc,[[-1.0,1.2,-2.9],[-.5,1.4,-3.0],[0,1.2,-3.1]],'#e64980',{w:.03});});
  const mei=kid(sc,1,.4,-2.2,{ry:-.3,on:'Mei'});at(sc,'turnip cake',()=>{rc('turnip cake · China',.5,'#c92a2a');sc.prop('turnip',.5,-2.6,{s:.3});});
  const ava=kid(sc,3,1.4,-2.2,{ry:-.6,on:'Ava'});at(sc,'oliebollen',()=>{rc('oliebollen · Netherlands',1.4,'#e8590c');for(let i=0;i<4;i++)prop(sc,'cookie',1.2+i*.12,-2.6,{s:.1});sc.fx('steam',{x:1.4,z:-2.6,w:.3,h:.5,y:.2});});
  at(sc,'heritage',()=>label(sc,'heritage',0,-1.65,'#5f3dc4',{h:.2}));
});
/* o04 · Two Festivals, Lots of Light */
story('o04',sc=>{D.base(sc,'#2f3a5c');put(sc,P.mk(new THREE.BoxGeometry(4,.012,2.2),P.paper('#5c4b7d',{mix:.2})),0,-2.5,{y:.012});const div=put(sc,P.mk(new THREE.BoxGeometry(.04,.3,2.2),P.paper('#d8c9ad')),0,-2.5,{y:.15});
  put(sc,S.house({w:.6,h:.38,d:.45,roof:'#e8590c'}),-1.4,-3.0);const pr=kid(sc,1,-1.0,-2.3,{ry:.3,on:'Priya'});label(sc,'Diwali',-1.0,-1.65,'#e8590c',{hide:true}).visible=false;
  const diyas=[];at(sc,'diyas',()=>{for(let i=0;i<8;i++){const d=prop(sc,'diya',-1.8+i*.22,-2.75+(i%2)*.1,{s:.13});diyas.push(d);}const l=new THREE.PointLight(0xffb040,.8,2.5);l.position.set(-1,.5,-2.6);sc.g.add(l);label(sc,'Diwali',-1.0,-1.65,'#e8590c');});
  at(sc,'light wins',()=>sc.fx('sparkle',{x:-1,z:-2.6,w:1.6,h:.8}));
  at(sc,'kheer',()=>prop(sc,'bowl',-.4,-2.2,{s:.18}));
  const no=kid(sc,0,1.0,-2.3,{ry:-.3,on:'Noah'});const men=prop(sc,'menorah',1.0,-3.0,{s:.6,p3:{unlit:true},on:'Hanukkah'});
  at(sc,'one more candle',()=>{label(sc,'Hanukkah',1.0,-1.65,'#1c7ed6');const r=men.children[0];for(let i=0;i<9;i++)sc.later(()=>{const f=r.userData['f'+i];if(f)f.visible=true;},i*250);const l=new THREE.PointLight(0xffd080,.7,2.5);l.position.set(1,.6,-2.9);sc.g.add(l);});
  at(sc,'latkes',()=>prop(sc,'pancakes',.6,-2.2,{s:.18}));at(sc,'jelly doughnuts',()=>prop(sc,'cookie',1.4,-2.2,{s:.15}));
});
/* o05 · A Day in the City */
story('o05',sc=>{D.base(sc,'#e3e3e3');const road=put(sc,S.road(4),0,-2.4);
  const Q=[['Chinatown',-1.5,'#c92a2a',['bowl','noodles']],['Little Italy',-.5,'#2b8a3e',['pizza']],['Greektown',.5,'#1c7ed6',['stick']],['Little India',1.5,'#e8590c',[]]];
  const so=kid(sc,1,-1.9,-2.3,{ry:1.5});const dad=person(sc,'dad',-2.0,-2.5,{ry:1.5});
  Q.forEach(([n,x,c,items],i)=>{const sh=put(sc,P.PROP3.shop(),x,-3.3);sh.scale.setScalar(.8);sh.traverse(m=>{if(m.isMesh&&m.geometry&&m.geometry.parameters&&m.geometry.parameters.width===.15)m.material=P.paper(i%2?c:'#ffffff');});card(sc,n,x,-2.85,{h:.13,col:c,on:n});
    at(sc,n,()=>{D.walk(sc,so,x-.15,-2.3,1.1,'point');D.walk(sc,dad,x-.4,-2.45,1.1,'idle');items.forEach((it,k)=>prop(sc,it,x+.2+k*.15,-2.0,{s:.18}));});});
  at(sc,'saris',()=>{['#e64980','#fab005','#7950f2','#12b886'].forEach((c,i)=>{const s=P.mk(new THREE.BoxGeometry(.12,.4,.02),P.paper(c,{mix:.05}));s.position.set(1.3+i*.13,.25,-2.0);sc.g.add(s);D.grow(s);sc.tick((dt,t)=>s.rotation.y=Math.sin(t*2+i)*.2);});});
  at(sc,'own traditions',()=>say(sc,dad,'We can keep our traditions and share!',2800));at(sc,'interesting',()=>mode(sc,so,'cheer'));
});
/* o06 · A Year of Special Days */
story('o06',sc=>{D.base(sc,'#cfe3b0');const Q=[['July 1','Canada Day',-1.5,'#c92a2a'],['November 11','Remembrance Day',-.5,'#495057'],['Nowruz','Nowruz',.5,'#2b8a3e'],['Lunar New Year','Lunar New Year',1.5,'#e8590c']];
  Q.forEach(([w,t,x,c])=>at(sc,w,()=>label(sc,t,x,-3.45,c)));
  const fl=prop(sc,'flag',-1.5,-3.0,{s:.55,on:'wave the flag'});at(sc,'fireworks',()=>['#f06595','#fcc419','#4dabf7'].forEach((c,i)=>sc.later(()=>{const f=prop(sc,'firework',-1.8+i*.3,-3.2,{s:.5,y:.5,p3:{c}});D.grow(f,.5);},i*300)));
  at(sc,'red poppies',()=>{for(let i=0;i<5;i++)prop(sc,'poppy',-.8+i*.15,-2.6,{s:.12,face:false});});
  at(sc,'two minutes',()=>{const k=kid(sc,2,-.5,-2.1,{ry:Math.PI,mode:'sad'});label(sc,'2 minutes of silence',-.5,-1.65,'#495057');});
  const da=kid(sc,1,.5,-2.2,{ry:Math.PI,on:'Darya'});at(sc,'first day of spring',()=>{for(let i=0;i<3;i++)put(sc,S.flower('tulip',{c:['#ff8787','#fcc419','#e599f7'][i]}),.3+i*.2,-2.8);});
  const wei=kid(sc,0,1.5,-2.2,{ry:Math.PI,on:'Wei'});at(sc,'dumplings',()=>{prop(sc,'dumpling',1.3,-2.7,{s:.15});prop(sc,'noodles',1.55,-2.75,{s:.25});prop(sc,'fish',1.8,-2.7,{s:.2});});
});
/* o07 · Pancake Day, Then and Now */
story('o07',sc=>{D.base(sc,'#eadfcf');const div=put(sc,P.mk(new THREE.BoxGeometry(.04,.3,2.2),P.paper('#d8c9ad')),0,-2.5,{y:.15});card(sc,'long ago',-1.0,-3.45,{h:.16,col:'#8a5a32'});card(sc,'today',1.0,-3.45,{h:.16,col:'#1c7ed6',on:'Today'});
  const fire=put(sc,S.campfire(),-1.3,-3.0);const old=person(sc,'woman',-.8,-3.0,{ry:-.5,p:{c:'#8a6a4a',h:'#3b2314',st:'bun',skirt:1}});
  prop(sc,'milk',-1.6,-2.3,{s:.2,on:'milk'});prop(sc,'cheese',-1.3,-2.3,{s:.18,on:'butter'});prop(sc,'egg',-1.0,-2.3,{s:.15,on:'eggs'});
  at(sc,'making pancakes',()=>{const p=prop(sc,'pancakes',-.6,-2.4,{s:.3});boom(p);mode(sc,old,'pull',1800);});
  at(sc,'Pancake Day',()=>label(sc,'Pancake Day',-1.0,-1.65,'#e8590c'));
  put(sc,S.stove(),1.0,-3.35);const nw=person(sc,'dad',1.5,-2.9,{ry:-.6});
  at(sc,'chocolate spread',()=>{const p=prop(sc,'pancakes',.6,-2.4,{s:.3});prop(sc,'chocolate'in P.PROP3?'chocolate':'cookie',.9,-2.3,{s:.12});});
  at(sc,'berries',()=>prop(sc,'cherries',1.2,-2.3,{s:.15}));at(sc,'salmon',()=>prop(sc,'salmon',1.5,-2.3,{s:.2}));
  at(sc,'electric lights',()=>{const m=prop(sc,'menorah',.9,-1.85,{s:.35});const l=new THREE.PointLight(0xfff0c0,.6,2);l.position.set(.9,.5,-1.85);sc.g.add(l);});
  at(sc,'e-cards',()=>{const t=P.mk(new THREE.BoxGeometry(.25,.17,.015),P.paper('#343a40'));t.position.set(1.6,.12,-1.85);t.rotation.x=-.4;sc.g.add(t);D.grow(t);label(sc,'e-card ♥',1.6,-1.6,'#e64980');});
});
/* o08 · Seven Candles */
story('o08',sc=>{D.base(sc,'#e9d8b8');put(sc,S.rug(2.2,1.2,'#2b8a3e'),0,-2.6);const tb=put(sc,S.table({w:1.2,d:.6}),0,-3.0);
  const jam=kid(sc,0,-1.2,-2.2,{ry:.5,on:'Jamal'});card(sc,'Dec 26 – Jan 1',1.5,-3.45,{h:.15,col:'#c92a2a',on:'December 26'});
  const kin=prop(sc,'kinara',0,-3.0,{s:.6,y:.38,on:'kinara',p3:{unlit:true}});
  at(sc,'seven candles',()=>{const r=kin.children[0];for(let i=0;i<7;i++)sc.later(()=>{const f=r.userData['f'+i];if(f)f.visible=true;},i*300);});
  at(sc,'black, red and green',()=>label(sc,'black · red · green',0,-2.55,'#2b8a3e'));
  at(sc,'unity',()=>label(sc,'unity',-.9,-2.6,'#c92a2a'));at(sc,'creativity',()=>label(sc,'creativity',.9,-2.6,'#2b8a3e'));
  const fam=[person(sc,'mom',.9,-2.2,{ry:-.5,on:'big feast'}),person(sc,'dad',1.4,-2.4,{ry:-.7,on:'big feast'})];at(sc,'big feast',()=>{['bread','pie','corn'].forEach((n,i)=>prop(sc,n,-.3+i*.3,-2.85,{s:.15,y:.38}));});
  at(sc,'handmade',()=>{prop(sc,'gift',-.6,-1.85,{s:.25});prop(sc,'book',-.2,-1.85,{s:.22});mode(sc,jam,'cheer');});
  at(sc,'telling family stories',()=>{say(sc,jam,'I love our family stories!',2600);fam.forEach(k=>mode(sc,k,'clap'));});
});
/* o09 · The Map in Our Classroom */
story('o09',sc=>{D.base(sc,'#cfe3b0');const sup=put(sc,P.mk(new THREE.CylinderGeometry(.6,.6,.02,24),P.glow('#4dabf7',.85,.2)),-1.0,-3.2,{y:.012});sup.scale.set(1.3,1,.6);label(sc,'Lake Superior',-1.0,-2.9,'#1c7ed6',{hide:true}).visible=false;
  put(sc,P.mk(new THREE.CylinderGeometry(.35,.35,.02,20),P.glow('#4dabf7',.85,.2)),1.2,-2.0,{y:.012});
  const city=(n,x,z)=>{const g=new THREE.Group();for(let i=0;i<3;i++){const b=P.mk(new THREE.BoxGeometry(.08,.12+i*.06,.08),P.paper('#adb5bd'));b.position.set(i*.09,(.12+i*.06)/2,0);g.add(b);}put(sc,g,x,z,{on:n});card(sc,n,x,z+.25,{h:.12,on:n});return g;};
  city('Toronto',1.0,-2.5);city('Thunder Bay',-.9,-2.7);
  at(sc,'First Nations',()=>{put(sc,P.PROP3.longhouse(),.2,-2.0,{s:.6});for(let i=0;i<4;i++)put(sc,S.pine({s:.5}),-1.8+i*.25,-1.7);});
  at(sc,'Huron-Wendat',()=>{label(sc,'Huron-Wendat · near Barrie',.5,-1.65,'#e8590c');});
  at(sc,'Ojibway',()=>{label(sc,'Anishinaabe · Lake Superior',-1.0,-2.95,'#2b8a3e');const tp=P.mk(new THREE.ConeGeometry(.15,.35,8),P.paper('#e9d8b8'));tp.position.set(-1.6,.17,-2.7);sc.g.add(tp);D.grow(tp);});
  const dancers=[];at(sc,'powwow',()=>{const d=prop(sc,'drum',-.3,-3.2,{s:.3});for(let i=0;i<5;i++){const a=i/5*Math.PI*2;const k=kid(sc,i,-.3+Math.cos(a)*.5,-3.2+Math.sin(a)*.3,{s:.5,mode:'dance'});dancers.push(k);}sc.fx('notes',{x:-.3,z:-3.2,w:.6,h:1,y:.4});});
  at(sc,'Mother Earth',()=>{sc.fx('sparkle',{x:0,z:-2.5,w:3.6,h:.6});});
});
/* o10 · Alexandra's Diary, Long Ago */
story('o10',sc=>{D.base(sc,'#e3cf9a');const cabin=put(sc,S.house({w:.9,h:.55,d:.6,c:'#a0785a',roof:'#6b4f33'}),-1.3,-3.2);put(sc,S.pine({s:.9}),1.8,-3.4);put(sc,S.tree({s:.9,c:'#e8590c'}),1.2,-3.5);
  card(sc,'Dear Diary',-1.6,-1.65,{h:.16,col:'#8a5a32',on:'Dear Diary'});const fa=person(sc,'man',-.4,-2.9,{ry:.4,on:'My father',p:{c:'#6b4f33',h:'#3b2314',st:'short'}});
  const tk=prop(sc,'turkey',.1,-2.8,{s:.45,on:'biggest turkey'});
  const mo=person(sc,'woman',-.8,-2.3,{ry:.4,on:'Mother',p:{c:'#8a6a4a',skirt:1,st:'bun'}});at(sc,'maple syrup',()=>{prop(sc,'jar',-.5,-2.0,{s:.18,p3:{}});prop(sc,'cherries',-.3,-2.0,{s:.14});});
  const al=kid(sc,1,.7,-2.2,{ry:-.4});const br=kid(sc,0,1.1,-2.1,{ry:-.6,on:'My brother'});
  at(sc,'squash and corn',()=>{prop(sc,'squash',.8,-1.8,{s:.2});prop(sc,'corn',1.05,-1.8,{s:.2});prop(sc,'squash',1.3,-1.8,{s:.18});});
  at(sc,'no flour or sugar',()=>say(sc,al,'No pies this year!',2000));
  at(sc,'roasting',()=>{D.shrink(tk);const f=put(sc,S.campfire(),.1,-2.8);const r=prop(sc,'roast turkey',.1,-2.8,{s:.3,y:.25});sc.fx('steam',{x:.1,z:-2.8,w:.3,h:.7,y:.4});});
  at(sc,'growling',()=>{card(sc,'grrr…',.7,-2.6,{h:.14,col:'#e8590c'}).visible=true;});
  at(sc,'give thanks',()=>{const t=put(sc,S.table({w:1.4,d:.6}),.0,-1.9);[fa,mo,al,br].forEach(k=>mode(sc,k,'cheer'));label(sc,'a good harvest',0,-1.55,'#2b8a3e');});
});
/* o11 · Around the World in a Day */
story('o11',sc=>{D.base(sc,'#e9e2d6');const ocean=put(sc,P.mk(new THREE.BoxGeometry(3.9,.012,2.1),P.glow('#74c0fc',.85,.15)),0,-2.5,{y:.012});
  const C=[['North America',-1.3,-3.1,.42,'#69db7c'],['South America',-1.0,-2.2,.3,'#94d82d'],['Europe',.2,-3.2,.2,'#ffa94d'],['Africa',.3,-2.4,.38,'#fcc419'],['Asia',1.2,-3.0,.55,'#ff8787'],['Australia',1.5,-1.9,.22,'#e599f7'],['Antarctica',0,-1.55,.3,'#ffffff']];
  const conts=C.map(([n,x,z,r,c])=>{const m=P.mk(new THREE.CylinderGeometry(r,r*.9,.05,9),P.paper(c,{mix:.15}));m.scale.set(1,1,n==='Antarctica'?.35:.85);put(sc,m,x,z,{y:.03,hide:true});at(sc,n,()=>{m.visible=true;D.grow(m);label(sc,n,x,z,'#495057',{h:.11});});return m;});
  at(sc,'seven continents',()=>label(sc,'7 continents',-1.6,-1.6,'#5f3dc4'));
  at(sc,'Asia is the biggest',()=>tween(1,k=>conts[4].position.y=.03+Math.sin(k*Math.PI)*.15));
  at(sc,'We live in North America',()=>{const k=kid(sc,3,-1.3,-3.1,{s:.4});boom(k);});
  const cr=prop(sc,'compass',1.75,-3.4,{s:.4,face:false,on:'compass rose'});
  at(sc,'Atlantic Ocean',()=>{D.ribbon(sc,[[-1.2,.3,-3.1],[-.5,.6,-3.2],[.2,.3,-3.2]],'#e03131',{w:.04});label(sc,'Atlantic Ocean',-.5,-2.7,'#1c7ed6');});
});
/* o12 · Mina Spins the Globe */
story('o12',sc=>{D.base(sc,'#e9e2d6');const tb=put(sc,S.table({w:1.4,d:.8}),0,-2.9);const gl=prop(sc,'globe',0,-2.9,{s:1.3,y:.38,face:false});const sph=gl.children[0].userData.sphere;
  const mina=kid(sc,1,-1.1,-2.3,{ry:.6,name:'Mina'});let spin=0;sc.tick(dt=>{sph.rotation.y+=dt*spin;spin=Math.max(0,spin-dt*.5);});
  at(sc,'spun',()=>{spin=6;mode(sc,mina,'point',1500);});
  at(sc,'model of the Earth',()=>label(sc,'a model of the Earth',1.2,-3.3,'#1c7ed6'));
  at(sc,'Equator',()=>{label(sc,'Equator',1.2,-2.95,'#c92a2a');boom(gl);});
  at(sc,'North Pole',()=>{const c=card(sc,'North Pole',0,-3.0,{h:.13,y:1.55});c.visible=true;});at(sc,'South Pole',()=>{label(sc,'South Pole',-.9,-3.35,'#495057');});
  at(sc,'Northern Hemisphere',()=>{label(sc,'Northern Hemisphere · Canada',1.2,-2.6,'#2b8a3e');});
  at(sc,'Southern Hemisphere',()=>label(sc,'Southern Hemisphere · Chile, Australia',1.0,-2.2,'#e8590c'));
  at(sc,'rainforests',()=>{for(let i=0;i<3;i++)put(sc,S.tree({s:.5,c:'#2f9e44'}),-1.6+i*.3,-1.75);sc.fx('rain',{x:-1.3,z:-1.75,w:.9,d:.3,h:.9});});
  at(sc,'icy cold',()=>{const ice=prop(sc,'glacier',1.5,-1.75,{s:.4});sc.fx('snow',{x:1.5,z:-1.75,w:.6,d:.3,h:.9});});
});

/* o13 · Three Pen Pals */
story('o13',sc=>{D.base(sc,'#e9e2d6');const zone=[['#ffffff',-1.35],['#d3f9d8',0],['#ffe8a8',1.35]];zone.forEach(([c,x])=>put(sc,P.mk(new THREE.BoxGeometry(1.3,.014,2.1),P.paper(c,{mix:.15})),x,-2.5,{y:.012}));
  const leo=kid(sc,0,-1.35,-2.2,{on:'Leo'}),jade=kid(sc,1,0,-2.2,{on:'Jade'}),di=kid(sc,2,1.35,-2.2,{on:'Diego'});
  at(sc,'Canada',()=>label(sc,'Canada',-1.35,-3.45,'#c92a2a'),1);at(sc,'United States',()=>label(sc,'United States',0,-3.45,'#1c7ed6'));at(sc,'Mexico',()=>label(sc,'Mexico',1.35,-3.45,'#2b8a3e'));
  at(sc,'snow fort',()=>{sc.fx('snow',{x:-1.35,z:-2.5,w:1.2,d:2,h:1.3});for(let i=0;i<5;i++){const b=P.mk(new THREE.BoxGeometry(.16,.1,.12),P.paper('#ffffff',{mix:0}));const a=i/4*Math.PI;b.position.set(-1.35+Math.cos(a)*.3,.05,-2.8-Math.sin(a)*.2);sc.g.add(b);D.grow(b);}label(sc,'−15 °C',-1.35,-1.65,'#1c7ed6');});
  at(sc,'warm and humid',()=>{put(sc,P.PROP3.palm(),.4,-3.0,{s:.6});label(sc,'warm, humid',0,-1.65,'#e8590c');});
  at(sc,'hot and dry',()=>{prop(sc,'cactus',1.6,-3.0,{s:.4});put(sc,S.sun(),1.35,-3.4,{y:1.0,s:.4});label(sc,'hot, dry',1.35,-1.65,'#c92a2a');});
  at(sc,'closer a place is to the Equator',()=>D.ribbon(sc,[[-1.8,.5,-1.9],[0,.6,-1.9],[1.8,.9,-1.9]],'#e8590c',{w:.06}));
});
/* o14 · Postcards from Two Countries */
story('o14',sc=>{D.base(sc,'#e9e2d6');const div=put(sc,P.mk(new THREE.BoxGeometry(.04,.3,2.2),P.paper('#d8c9ad')),0,-2.5,{y:.15});
  put(sc,P.mk(new THREE.BoxGeometry(1.95,.014,2.1),P.paper('#8ce99a',{mix:.2})),-1.0,-2.5,{y:.012,on:'Brazil'});put(sc,P.mk(new THREE.BoxGeometry(1.95,.014,2.1),P.paper('#e7f5ff',{mix:.1})),1.0,-2.5,{y:.012,on:'Iceland'});
  at(sc,'Brazil',()=>label(sc,'Brazil',-1.0,-3.45,'#2b8a3e'));at(sc,'rainforest',()=>{for(let i=0;i<4;i++)put(sc,S.tree({s:.7,c:'#2f9e44'}),-1.8+i*.35,-3.1+(i%2)*.2);sc.fx('rain',{x:-1,z:-2.6,w:1.8,d:1.5,h:1.4});});
  at(sc,'toucans',()=>prop(sc,'toucan',-1.5,-2.5,{s:.3,y:.3}));at(sc,'monkeys',()=>prop(sc,'monkey',-1.0,-2.4,{s:.35}));at(sc,'sloth',()=>prop(sc,'sloth',-.5,-2.5,{s:.4}));
  at(sc,'Amazon River',()=>{const r=D.ribbon(sc,[[-1.9,.03,-1.8],[-1.2,.03,-1.95],[-.5,.03,-1.75],[-.1,.03,-1.9]],'#4dabf7',{w:.25,up:V(0,1,0)});});
  at(sc,'Iceland',()=>label(sc,'Iceland',1.0,-3.45,'#1c7ed6'));
  at(sc,'hot spring',()=>{put(sc,S.pond(.3,{c:'#63e6be'}),.5,-2.0);sc.fx('steam',{x:.5,z:-2,w:.4,h:.6});const k=person(sc,'uncle',.5,-2.0,{s:.6,mode:'swim'});});
  at(sc,'geyser',()=>{const g=prop(sc,'geyser',1.0,-2.6,{s:.5});tween(1,k=>g.scale.y=g.scale.y*(1+k*.01));});
  at(sc,'volcano',()=>prop(sc,'volcano',1.6,-3.1,{s:.6}));at(sc,'glacier',()=>prop(sc,'glacier',.4,-3.2,{s:.5}));
  at(sc,'different places',()=>label(sc,'so different!',0,-1.6,'#5f3dc4',{h:.2}));
});
/* o15 · Pen Pals across Canada */
story('o15',sc=>{D.base(sc,'#e9e2d6');const div=put(sc,P.mk(new THREE.BoxGeometry(.04,.3,2.2),P.paper('#d8c9ad')),0,-2.5,{y:.15});
  put(sc,P.mk(new THREE.BoxGeometry(1.95,.014,2.1),P.paper('#ffffff',{mix:0})),-1.0,-2.5,{y:.012});put(sc,P.mk(new THREE.BoxGeometry(1.95,.014,2.1),P.paper('#a7d08c',{mix:.2})),1.0,-2.5,{y:.012});
  const ap=kid(sc,1,-1.3,-2.1,{ry:.4,on:'Aputi'});at(sc,'Iqaluit',()=>{label(sc,'Iqaluit, Nunavut',-1.0,-3.45,'#1c7ed6');prop(sc,'igloo',-1.6,-3.0,{s:.5});});
  const sam=kid(sc,0,1.3,-2.1,{ry:-.4,on:'Sam lives'});at(sc,'Vancouver',()=>{label(sc,'Vancouver, BC',1.0,-3.45,'#2b8a3e');put(sc,S.mountain({s:.7}),1.6,-3.3);},1);
  at(sc,'small planes',()=>{const p=prop(sc,'airplane',-1.9,-2.9,{s:.4,y:.6});tween(2.5,k=>p.position.x=-1.9+k*1.6);});
  at(sc,'sealift ship',()=>{put(sc,S.water(1.0,.4),-1.2,-1.75);const s=prop(sc,'ship',-1.6,-1.75,{s:.4});tween(2,k=>s.position.x=-1.6+k*.6);});
  at(sc,'dog sledding',()=>{const d=prop(sc,'sled',-.7,-2.5,{s:.3});const dg=prop(sc,'dog',-.4,-2.5,{s:.25});});
  at(sc,'hockey',()=>{mode(sc,ap,'cheer');},1);
  at(sc,'bus and the ferry',()=>{prop(sc,'bus',.6,-2.6,{s:.4});put(sc,S.water(.8,.4),1.5,-1.75);prop(sc,'boat',1.5,-1.75,{s:.35});});
  at(sc,'hiking',()=>mode(sc,sam,'walk'));at(sc,'skiing',()=>{sc.fx('snow',{x:1.6,z:-3.2,w:.6,d:.4,h:.8});mode(sc,sam,'cheer');});
});
/* o16 · The Travel Club Photos */
story('o16',sc=>{D.base(sc,'#e9e2d6');const Q=[['China',-1.5,'panda','#c92a2a'],['Japan',-.5,'fish','#e64980'],['Mali',.5,'baobab','#e8590c'],['Thailand',1.5,'temple','#fab005']];
  Q.forEach(([n,x,p,c],i)=>{const fr=put(sc,P.mk(new THREE.BoxGeometry(.85,.02,.9),P.paper('#ffffff',{mix:0})),x,-3.0,{y:.01,on:n});card(sc,n,x,-2.45,{h:.14,col:c,on:n});
    at(sc,n,()=>{const o=prop(sc,p,x,-3.0,{s:p==='baobab'||p==='temple'?.75:.45});boom(o);if(p==='panda')prop(sc,'bamboo',x+.25,-3.2,{s:.35});if(p==='fish')put(sc,S.water(.7,.6),x,-3.0);},1);});
  const kids2=[1,0,5,2].map((c,i)=>kid(sc,c,-1.5+i,-2.1,{s:.6,ry:Math.PI,on:['Lily','Ken','Awa','Tom'][i]}));
  at(sc,'savannah',()=>{put(sc,P.mk(new THREE.BoxGeometry(.9,.01,.4),P.paper('#e9c46a')),-1.1,-1.65,{y:.01});prop(sc,'lion',-1.1,-1.65,{s:.25});});
  at(sc,'a rainforest',()=>{put(sc,P.mk(new THREE.BoxGeometry(.9,.01,.4),P.paper('#2f9e44')),0,-1.65,{y:.01});prop(sc,'toucan',0,-1.65,{s:.22});});
  at(sc,'a desert',()=>{put(sc,P.mk(new THREE.BoxGeometry(.9,.01,.4),P.paper('#f2d06b')),1.1,-1.65,{y:.01});prop(sc,'camel',1.1,-1.65,{s:.25});});
});
/* o17 · How Do You Get Around? */
story('o17',sc=>{D.base(sc,'#e9e2d6');const Q=[['Nuka',-1.5,'#ffffff','snowmobile',1],['Marc',-.5,'#ced4da','train',0],['Mei',.5,'#dee2e6','scooter',3],['Carlos',1.5,'#e3c79a','mule',2]];
  Q.forEach(([n,x,g,v,ci])=>{put(sc,P.mk(new THREE.BoxGeometry(.95,.014,2.1),P.paper(g,{mix:.15})),x,-2.5,{y:.012});const k=kid(sc,ci,x-.2,-1.9,{s:.6,ry:Math.PI,on:n});
    at(sc,n,()=>{const o=prop(sc,v,x+.1,-2.9,{s:v==='mule'?.5:.4});boom(o);});});
  at(sc,'hunting and fishing',()=>{prop(sc,'fish',-1.3,-2.3,{s:.2});put(sc,S.pond(.15,{c:'#4dabf7'}),-1.7,-2.4);});
  at(sc,'Paris',()=>label(sc,'Paris, France',-.5,-3.45,'#1c7ed6'));at(sc,'subway',()=>{const t=P.mk(new THREE.BoxGeometry(.7,.012,.12),P.paper('#495057'));t.position.set(-.5,.015,-2.9);sc.g.add(t);});
  at(sc,'Taipei',()=>label(sc,'Taipei, Taiwan',.5,-3.45,'#c92a2a'));at(sc,'Colorado',()=>{label(sc,'Colorado',1.5,-3.45,'#e8590c');for(let i=0;i<3;i++)put(sc,S.rock({s:1.2}),1.3+i*.2,-3.3+i*.1);});
  at(sc,'narrow paths',()=>D.ribbon(sc,[[1.2,.03,-2.0],[1.6,.03,-2.5],[1.3,.03,-3.0]],'#c9a27a',{w:.12,up:V(0,1,0)}));
});
/* o18 · Bataar's Moving Home */
story('o18',sc=>{D.base(sc,'#e9e2d6');const zone=[['#c9d99a',-1.35],['#a5d8ff',0],['#d3f9d8',1.35]];zone.forEach(([c,x])=>put(sc,P.mk(new THREE.BoxGeometry(1.3,.014,2.1),P.paper(c,{mix:.15})),x,-2.5,{y:.012}));
  at(sc,'Mongolia',()=>label(sc,'Mongolia',-1.35,-3.45,'#c92a2a'));const ger=prop(sc,'ger',-1.35,-3.0,{s:.7,on:'ger'});const bat=kid(sc,0,-1.6,-2.2,{s:.6,on:'Bataar'});
  at(sc,'white felt',()=>label(sc,'felt + wool',-1.35,-2.55,'#495057'));const an=[prop(sc,'sheep',-.9,-2.0,{s:.3,on:'animals'}),prop(sc,'horse',-1.0,-2.5,{s:.35,on:'animals'})];
  at(sc,'pack up our ger',()=>{tween(1.2,k=>{ger.scale.y=Math.max(.05,ger.scale.y*(1-k*.05));});sc.later(()=>{sc.move(ger,-1.35,-2.1,.1);ger.scale.setScalar(.01);D.grow(ger,.6);},1400);});
  at(sc,'Malaysia',()=>label(sc,'Malaysia',0,-3.45,'#2b8a3e'));const st=prop(sc,'stilt house',0,-2.9,{s:.7,on:'stilt houses'});at(sc,'mangrove wood',()=>label(sc,'mangrove wood',0,-2.1,'#8a5a32'));
  at(sc,'Germany',()=>label(sc,'Germany',1.35,-3.45,'#495057'));const th=prop(sc,'timber house',1.35,-2.9,{s:.75,on:'Klaus'});at(sc,'wooden frames',()=>label(sc,'bricks + wood frames',1.35,-2.1,'#c92a2a'));
});
/* o19 · The Costume Parade */
story('o19',sc=>{D.base(sc,'#e7e0f5');const path=D.ribbon(sc,[[-1.9,.02,-2.4],[1.9,.02,-2.4]],'#ffe8cc',{w:.6,up:V(0,1,0)});path.userData.full();card(sc,'Heritage Day',0,-3.45,{h:.18,col:'#5f3dc4',on:'Heritage Day'});
  const Q=[['Riya',{c:'#f76707',h:'#141414',st:'braid',skirt:1,s:.84,scarf:'#fab005'},'Delhi, India','sari',-1.5],['Mateo',{c:'#c92a2a',h:'#141414',st:'short',s:.84,scarf:'#fab005'},'Lima, Peru','poncho',-.5],['Nia',{c:'#2b8a3e',h:'#141414',st:'puffs',skirt:1,s:.84},'Nairobi, Kenya','robe',.5],['Ivan',{c:'#1c7ed6',h:'#5b3a1e',st:'short',s:.9,cap:'#ffffff',scarf:'#ffffff'},'Nunavut','parka',1.5]];
  Q.forEach(([n,p,place,cl,x])=>{const k=person(sc,p,-2.3,-2.4,{ry:Math.PI/2,on:n});at(sc,n,()=>{D.walk(sc,k,x,-2.4,1.2,'cheer');sc.later(()=>{k.userData.ry=0;label(sc,place,x,-2.95,'#495057',{h:.12});label(sc,cl,x,-1.8,p.c,{h:.14});},1300);});});
  at(sc,'cool in the heat',()=>put(sc,S.sun(),-1.5,-3.3,{y:.9,s:.35}));at(sc,'cold in the mountains',()=>put(sc,S.mountain({s:.45}),-.5,-3.35));
  at(sc,'protects me from the sun',()=>put(sc,S.sun(),.5,-3.3,{y:.9,s:.35}));at(sc,'freezing temperatures',()=>sc.fx('snow',{x:1.5,z:-2.4,w:.9,d:1.2,h:1.2}));
});
/* o20 · Summer Camp Choices */
story('o20',sc=>{D.base(sc,'#cfe3b0');const cn=person(sc,'teacher',-1.85,-2.2,{ry:1,on:'counsellors'});
  const Q=[['British Columbia',-1.1,()=>{put(sc,S.mountain({s:.7}),-1.1,-3.2);const k=kid(sc,0,-1.0,-2.9,{s:.45,mode:'walk'});}],['Quebec',-.1,()=>{put(sc,S.hill(.45,{c:'#ffffff'}),-.1,-3.1);sc.fx('snow',{x:-.1,z:-3,w:.8,d:.6,h:1});}],['Alberta',.9,()=>{prop(sc,'bicycle',.9,-3.0,{s:.4});}],['Lake Ontario',1.7,()=>{put(sc,S.water(.6,.6),1.7,-3.0);prop(sc,'kayak',1.7,-3.0,{s:.35});}]];
  Q.forEach(([n,x,f])=>at(sc,n,()=>{label(sc,n,x,-2.45,'#1c7ed6',{h:.12});f();}));
  const W=[['skiing','#ffffff',-1.0,'snowy Canada'],['surfing','#4dabf7',0,'sunny Hawaii'],['soccer','#69db7c',1.0,'grassy Britain']];
  W.forEach(([w,c,x,lab])=>at(sc,w,()=>{put(sc,P.mk(new THREE.BoxGeometry(.8,.012,.4),P.paper(c,{mix:.2})),x,-1.75,{y:.01});label(sc,lab,x,-1.55,'#495057',{h:.11});
    if(w==='surfing')prop(sc,'surfboard',x,-1.75,{s:.3,face:false});else if(w==='soccer')prop(sc,'ball',x,-1.75,{s:.15});else prop(sc,'skates',x,-1.75,{s:.2});}));
});
/* o21 · The Grocery Detectives */
story('o21',sc=>{D.base(sc,'#e3e8ee');put(sc,S.counter(3.2),0,-3.4);const mia=kid(sc,1,-1.0,-2.2,{ry:.4});const dad=person(sc,'dad',-1.5,-2.5,{ry:.6});
  const Q=[['bananas','banana','Ecuador',-1.2],['grapes','grapes','Chile',-.4],['kiwis','kiwi','New Zealand',.4],['oranges','orange','Florida',1.2]];
  Q.forEach(([w,p,from,x])=>{const o=prop(sc,p,x,-3.4,{s:.3,y:.37,on:w});at(sc,from,()=>{const c=card(sc,from,x,-3.0,{h:.13,col:'#c92a2a'});c.visible=true;D.grow(c);D.ribbon(sc,[[x,.6,-3.3],[x*.5,1.2,-2.6],[0,.8,-1.8]],'#fab005',{w:.025,dur:1});});});
  at(sc,'stickers',()=>mode(sc,mia,'read'));at(sc,'so far away',()=>{say(sc,mia,'Why so far away?',2200);mode(sc,mia,'think');});
  at(sc,'warm climate',()=>{put(sc,S.sun(),1.6,-1.9,{y:.6,s:.4});put(sc,P.PROP3.palm(),1.2,-1.8,{s:.4});});
  at(sc,'too cold',()=>{sc.fx('snow',{x:-1.3,z:-1.9,w:1,d:.5,h:1});label(sc,'Canada winter',-1.3,-1.6,'#1c7ed6');});
});
/* o22 · Counting Canadians */
story('o22',sc=>{D.base(sc,'#e9e2d6');const Q=[['Toronto',6.2,-1.5],['Montreal',4.3,-.8],['Vancouver',2.6,-.1]];
  Q.forEach(([n,v,x],i)=>{const bar=put(sc,P.mk(new THREE.BoxGeometry(.4,1,.3),P.paper(['#c92a2a','#1c7ed6','#2b8a3e'][i],{mix:.25})),x,-3.2);bar.scale.y=.001;card(sc,n,x,-2.85,{h:.12,on:n});
    at(sc,n,()=>tween(1,k=>{bar.scale.y=Math.max(.001,v*.15*k);bar.position.y=v*.15*k/2;}),1);});
  const map=put(sc,P.mk(new THREE.BoxGeometry(1.6,.02,1.0),P.paper('#d3f9d8',{mix:.1})),1.1,-2.3,{y:.01,on:'on a map'});const border=put(sc,P.mk(new THREE.BoxGeometry(1.6,.01,.02),P.paper('#c92a2a',{mix:0})),1.1,-1.85,{y:.03,on:'border'});
  at(sc,'in Ontario',()=>['Toronto','Ottawa','Mississauga','Brampton','Hamilton'].forEach((n,i)=>sc.later(()=>{const d=put(sc,P.mk(new THREE.CylinderGeometry(.03,.03,.06,10),P.paper('#e03131',{mix:0})),.7+i*.2,-1.95-(i%2)*.1,{y:.04});D.grow(d);},i*200)));
  const om=kid(sc,0,-1.5,-1.85,{ry:.6,on:'said Omar'});at(sc,'in the south',()=>say(sc,om,'Most are in the south!',2400));
  at(sc,'good land for farming',()=>{prop(sc,'tractor',.4,-1.75,{s:.3});put(sc,S.sun(),1.8,-2.8,{y:.5,s:.3});});
});
/* o23 · How We Adapt */
story('o23',sc=>{D.base(sc,'#e9e2d6');const zone=[['#c3fae8',-1.35],['#ffe8a8',0],['#ffffff',1.35]];zone.forEach(([c,x])=>put(sc,P.mk(new THREE.BoxGeometry(1.3,.014,2.1),P.paper(c,{mix:.15})),x,-2.5,{y:.012}));
  const lu=kid(sc,0,-1.35,-2.0,{s:.6,on:'Lucas'});at(sc,'Florida',()=>label(sc,'Florida',-1.35,-3.45,'#2b8a3e'));at(sc,'rainy',()=>sc.fx('rain',{x:-1.35,z:-2.6,w:1.1,d:1.4,h:1.2}),1);
  at(sc,'coconut palms',()=>{put(sc,P.PROP3.palm(),-1.5,-3.0,{s:.7});put(sc,P.PROP3.palm(),-1.0,-2.8,{s:.5});});
  const so=kid(sc,1,0,-2.0,{s:.6,on:'Sofia'});at(sc,'Managua',()=>label(sc,'Managua, Nicaragua',0,-3.45,'#c92a2a'));
  at(sc,'very hot',()=>{put(sc,S.sun(),0,-3.2,{y:.9,s:.4});so.userData.mode='hot';});at(sc,'early in the morning',()=>{put(sc,S.clock(),.4,-2.9,{s:.7});so.userData.mode='pull';label(sc,'work early',0,-1.6,'#e8590c');});
  const at2=kid(sc,2,1.35,-2.0,{s:.6,on:'Ataata'});at(sc,'Arctic',()=>label(sc,'Arctic',1.35,-3.45,'#1c7ed6'));
  at(sc,'cut through the ice',()=>{const h=put(sc,P.mk(new THREE.CylinderGeometry(.12,.12,.02,16),P.glow('#1971c2',.9,.2)),1.35,-2.7,{y:.02});D.grow(h);at2.userData.mode='pull';sc.later(()=>{const f=prop(sc,'fish',1.35,-2.7,{s:.2});fly(f,1.6,0,-2.3,.4,.8);},1200);});
  at(sc,'Every family adapts',()=>[lu,so,at2].forEach(k=>mode(sc,k,'cheer')));
});
/* o24 · The Resource Savers */
story('o24',sc=>{D.base(sc,'#e9e2d6');const kahn=person(sc,'teacher',-1.85,-2.3,{ry:1});
  const map=put(sc,P.mk(new THREE.BoxGeometry(1.2,.02,.8),P.paper('#f1e3c6',{mix:.1})),-.9,-3.0,{y:.01,on:'map of fresh water'});
  at(sc,'like Canada',()=>{for(let i=0;i<5;i++){const w=put(sc,P.mk(new THREE.CylinderGeometry(.07,.07,.02,12),P.glow('#4dabf7',.9,.2)),-1.3+i*.12,-3.2+(i%2)*.1,{y:.025});D.grow(w);}label(sc,'lots of fresh water',-.9,-2.55,'#1c7ed6');});
  at(sc,'very little',()=>{put(sc,P.mk(new THREE.CylinderGeometry(.04,.04,.02,10),P.glow('#4dabf7',.9,.2)),-.4,-2.9,{y:.025});});
  const ben=kid(sc,0,.3,-3.0,{s:.6,on:'Ben'});at(sc,'plants a garden',()=>{for(let i=0;i<5;i++){const s=prop(sc,'seedling',.0+i*.15,-3.3,{s:.15});}mode(sc,ben,'pull');label(sc,'✓ grows food',.3,-2.6,'#2b8a3e');});
  const kiki=kid(sc,1,1.3,-3.0,{s:.6,on:'Kiki'});const lamp=put(sc,S.lamp(),1.6,-3.3);at(sc,'turn off the lights',()=>{lamp.userData.bulb.visible=false;label(sc,'✓ saves electricity',1.3,-2.6,'#2b8a3e');});
  at(sc,'clearing a forest',()=>{const trees=[];for(let i=0;i<4;i++)trees.push(put(sc,S.pine({s:.55}),-.6+i*.35,-1.8));const bd=prop(sc,'bulldozer',-1.3,-1.8,{s:.4});tween(3,k=>bd.position.x=-1.3+k*1.6);trees.forEach((t,i)=>sc.later(()=>tween(.5,k=>t.rotation.z=k*1.4),800+i*500));});
  at(sc,'does not save',()=>{label(sc,'✗ does not save resources',.2,-1.55,'#c92a2a');say(sc,kahn,'Which one does not save?',2400);});
});
/* practice questions: no repeated character standing in every question — just the things it is about */
Object.keys(P.SCN).forEach(id=>{const R=P.SCN[id].rounds||{};Object.keys(R).forEach(k=>{const f=R[k];const src=String(typeof f==='function'?f:f&&f.scene);if(!/sc\.kid\(/.test(src))return;
  if(typeof f==='function')delete R[k];else delete f.scene;});});
})();
