/* The Interactive Classroom: Grade 2 English — acted scenes.
   Every lesson's story is acted out in 3D on the model page while the narration lights up each thing it names,
   and some questions open with a little scene that reacts to the answer.
   Coordinates: x from -2.2 (left) to 2.2 (right); z from -3.0 (back of the page) to -0.8 (front). */
(function(){
"use strict";
const P=window.PM;if(!P)return;
const S=()=>P.STAGE;
const story=fn=>({scene:fn});
const seq=(sc,list)=>{let t=0;list.forEach(([ms,f])=>{t+=ms;sc.later(f,t);});};
/* props on a gentle arc at the back of the page */
function arc(sc,names,o){o=o||{};const n=names.length,sp=Math.min(1.1,4.0/n);return names.map((nm,i)=>{const x=(i-(n-1)/2)*sp;const spec=typeof nm==='string'?{n:nm}:nm;
  return sc.prop(spec.n,x,(o.z||-2.75)+Math.abs(x)*.12,Object.assign({label:spec.label||false,ci:i,s:o.s||.9,y:spec.y},spec.o||{}));});}
/* a question scene: a thinking kid; cheers (and the props come alive) on the right answer */
const ask=(kid,say,yes,props)=>(sc)=>{const ps=(props||[]).map((n,i)=>sc.prop(n,.1+i*.95,-2.6,{label:false,ci:i,s:.85}));const k=sc.kid(kid,-1.25,-2.35,{mode:'think',ry:.4,say});
  return {win(){sc.mode(k,'cheer');sc.say(k,yes,2200);ps.forEach((p,i)=>sc.later(()=>S().alive(p,true),i*200));},miss(){sc.mode(k,'no',900);sc.say(k,'Hmm, not that…',1100);}};};

P.SCN={
/* 1 · the talking garden: flowers pop up one by one and each says its message */
f01:{steps:[story(sc=>{const g=sc.prop('grandpa',-1.75,-2.3,{label:'Grandpa Teo',s:.95});const fl=[['sunflower','I am proud of you!'],['tulip','You make me smile!'],['rose','I love you!']].map(([n,m],i)=>{const p=sc.prop(n,-.45+i*1.0,-2.75,{label:n,ci:i,s:.9});p.visible=false;sc.later(()=>{p.visible=true;S().alive(p,true);sc.say(p,m,2400);},1400+i*2600);return p;});
   sc.say(g,'My garden can talk!',2200);fl.forEach((p,i)=>sc.tick((dt,t)=>{p.rotation.z=Math.sin(t*1.6+i)*.06;}));const k=sc.kid(4,1.75,-1.9,{mode:'walk',ry:-.6});sc.later(()=>{sc.mode(k,'cheer');sc.say(k,'For my teacher!',2000);},9200);})],
  rounds:{11:{scene:(sc)=>{const c=sc.prop('crab',.4,-2.5,{label:false,s:1});sc.tick((dt,t)=>{c.position.x=.4+Math.sin(t*1.4)*.6;});const k=sc.kid(1,-1.3,-2.3,{mode:'think',ry:.4,say:'_ab?'});return {win(){sc.mode(k,'cheer');sc.say(k,'Cr-ab!');S().alive(c,true);},miss(){sc.mode(k,'no',900);}};}}}},
/* 2 · tongue twisters: each kid steps up and the thing in the twister pops beside them */
f02:{steps:[story(sc=>{const ns=['chick','shell','thumb','whale'],lines=['Cheerful chicks chew cherries!','She shops for shiny shells!','Three thin thumbs!','Which white whale whistles?'];
   ns.forEach((n,i)=>{const x=-1.65+i*1.1;const k=sc.kid(i,x,-1.75,{mode:'idle',ry:0});const p=sc.prop(n,x,-2.75,{label:n,ci:i,s:.85});
     sc.later(()=>{sc.mode(k,i===3?'dance':'sing',2200);sc.say(k,lines[i],2400);S().alive(p,true);},600+i*2700);});})]},
/* 3 · the tomato festival: tomatoes fly and splat, then the fire truck washes the street */
f03:{steps:[story(sc=>{const ks=[sc.kid(0,-1.4,-2.0,{mode:'cheer',ry:.5}),sc.kid(3,1.4,-2.1,{mode:'cheer',ry:-.5})];const w=sc.prop('whistle',0,-2.85,{label:'whistle',y:.6,s:.7});
   const tom=sc.prop('tomato',-.4,-2.2,{label:'tomatoes',s:.7});const ft=sc.prop('fire truck',2.6,-2.75,{label:'fire truck',s:.9});sc.prop('knee',-2.0,-2.85,{label:'knees',s:.6});
   sc.later(()=>{S().alive(w);sc.say(w,'Tweet!',1200);},700);seq(sc,[[1500,()=>{sc.hop(tom,1.2,-2.1,.9,.7);sc.say(ks[1],'Splat!',1000);}],[1000,()=>{sc.hop(tom,-1.2,-2.0,.9,.7);sc.say(ks[0],'Splat!',1000);}],[1200,()=>{sc.move(ft,1.3,-2.75,1.6);sc.fx('rain',{x:1.0,z:-2.4,w:1.2,d:.6,h:1.2});}]]);})]},
/* 4 · saving water: a dripping tap, a bucket filling with rain */
f04:{steps:[story(sc=>{const w=sc.prop('water',-1.55,-2.8,{label:'water',y:.9,s:.6});sc.tick((dt,t)=>{w.position.y=.9-((t*.8)%1)*.7;});sc.prop('toothbrush',-.6,-2.6,{label:'toothbrush',s:.85});
   sc.prop('shower',.45,-2.75,{label:'short shower',s:.9});sc.prop('bucket',1.55,-2.55,{label:'rain bucket',s:.85});sc.fx('rain',{x:1.55,z:-2.55,w:.6,d:.4,h:1.6});
   const k=sc.kid(2,-1.6,-1.8,{mode:'point',ry:.5,say:'Close the tap!'});sc.later(()=>{sc.mode(k,'cheer');sc.say(k,'Every drop counts!',2400);},5200);})],
  rounds:{3:{scene:(sc)=>{sc.prop('kitten',-.5,-2.6,{label:'kit',s:.9});const kt=sc.prop('kite',1.1,-2.7,{label:false,s:.9,y:.3});kt.visible=false;const kid=sc.kid(4,-1.6,-2.2,{mode:'think',ry:.4,say:'kit + ?'});
    return {win(){kt.visible=true;sc.move(kt,1.1,-2.7,1.2,1.1);sc.mode(kid,'cheer');sc.say(kid,'Kite!');sc.tick((dt,t)=>{kt.rotation.z=Math.sin(t*2)*.2;});},miss(){sc.mode(kid,'no',900);}};}}}},
/* 5 · tooth tales around the world: the tooth hops from pillow to mouse to roof */
f05:{steps:[story(sc=>{sc.prop('house',1.3,-2.8,{label:'roof',s:1.05});const t=sc.prop('tooth',-1.6,-2.3,{label:'tooth',s:.6});const m=sc.prop('mouse',-.4,-2.55,{label:'mouse',s:.75});const c=sc.prop('coin',.3,-2.25,{label:'coin',s:.6});c.visible=false;
   sc.kid(5,-1.75,-1.6,{mode:'cheer',ry:.4,say:'My tooth fell out!'});seq(sc,[[2200,()=>{sc.hop(t,-.5,-2.35,.6,.7);}],[1400,()=>{sc.say(m,'Thank you!',1500);c.visible=true;S().alive(c,true);}],[2200,()=>{sc.hop(t,1.3,-2.8,1.4,.9).then(()=>{t.position.y=1.15;});}]]);})]},
/* 6 · poutine: fries, curds and gravy drop into the bowl */
f06:{steps:[story(sc=>{const gm=sc.prop('grandma',-1.7,-2.4,{label:'Grandma',s:.95});sc.prop('bowl',.2,-2.4,{label:false,s:1});const fr=sc.prop('fries',-.6,-2.8,{label:'fries',s:.75});const ch=sc.prop('cheese',.85,-2.85,{label:'cheese curds',s:.7});sc.prop('spoon',1.7,-2.4,{label:'spoon',s:.75});
   sc.say(gm,'Eat it while it is steamy!',2600);seq(sc,[[1800,()=>sc.hop(fr,.2,-2.4,.8,.7)],[1300,()=>sc.hop(ch,.2,-2.4,.8,.7)],[1300,()=>sc.fx('steam',{x:.2,z:-2.4,w:.4,h:1.0,y:.4})]]);sc.kid(1,1.6,-1.7,{mode:'eat',ry:-.5});})]},
/* 7 · Kelly's scooter: zoom, bump, cast, then safety gear */
f07:{steps:[story(sc=>{const s=sc.prop('scooter',-1.5,-2.3,{label:'scooter',s:.85});const d=sc.prop('doctor',1.65,-2.75,{label:'doctor',s:.9});sc.prop('marker',.55,-2.85,{label:'markers',s:.6});sc.prop('helmet',-.3,-2.85,{label:'helmet',s:.8,y:.1});
   const k=sc.kid(4,-1.5,-2.0,{mode:'walk',ry:Math.PI/2});seq(sc,[[300,()=>{sc.move(s,.2,-2.3,1.4);sc.move(k,.2,-2.0,1.4);}],[1500,()=>{sc.mode(k,'sad');sc.say(k,'Ouch! My wrist!',1800);}],[2200,()=>{sc.say(d,'A bright orange cast!',2000);}],[2400,()=>{sc.wear(k,'helmet','head').then(()=>{sc.mode(k,'cheer');sc.say(k,'Safety first!',2400);});}]]);})]},
/* 8 · the noisiest morning: each thing makes its noise in turn */
f08:{steps:[story(sc=>{const ns=[['clock','Tick, tock!'],['cat','Purr…'],['dog','Woof!'],['bee','Buzz!']];ns.forEach(([n,m],i)=>{const p=sc.prop(n,-1.6+i*1.07,-2.7,{label:n,ci:i,s:.88});sc.later(()=>{sc.say(p,m,1800);S().alive(p);},500+i*1900);});
   sc.fx('rain',{x:0,z:-2.95,w:4.2,d:.2,h:1.8});const k=sc.kid(0,0,-1.6,{mode:'sleep',ry:0});sc.later(()=>{sc.mode(k,'cheer');sc.say(k,'Good morning, everybody!',2600);},8200);})],
  rounds:{0:{scene:ask(1,'What does it say?','Hisssss!',['snake'])}}},
/* 9 · stamps from everywhere: animals from far away pop out of the mail */
f09:{steps:[story(sc=>{sc.prop('letter',-1.6,-2.4,{label:'stamps',s:.8});const pr=sc.prop('parrot',-.35,-2.8,{label:'parrot',s:.9});const bv=sc.prop('beaver',.75,-2.75,{label:'beaver',s:.9});const c=sc.prop('city',1.75,-2.75,{label:'Winnipeg',s:.95});
   pr.visible=bv.visible=false;seq(sc,[[2200,()=>{pr.visible=true;S().alive(pr,true);sc.say(pr,'From Brazil!',1800);}],[2200,()=>{bv.visible=true;S().alive(bv,true);sc.say(bv,'From Canada!',1800);}],[2400,()=>{sc.say(c,'Stamp show!',1600);}]]);sc.kid(3,-1.6,-1.7,{mode:'read',ry:.3});})]},
/* 10 · berry picking: berries hop into the basket; then a pie appears */
f10:{steps:[story(sc=>{sc.prop('basket',.2,-2.35,{label:'baskets',s:.95});const st=sc.prop('strawberry',-1.4,-2.75,{label:'strawberries',s:.75});const bl=sc.prop('grapes',-.4,-2.9,{label:'blueberries',s:.7});const pie=sc.prop('pie',1.5,-2.7,{label:'pie',s:.85});pie.visible=false;
   const k=sc.kid(2,-1.6,-1.8,{mode:'cheer',ry:.5});seq(sc,[[1500,()=>sc.hop(st,.2,-2.35,.8,.7)],[1300,()=>sc.hop(bl,.2,-2.35,.8,.7)],[1300,()=>{sc.say(k,'Yum!',1200);}],[1800,()=>{pie.visible=true;S().alive(pie,true);sc.fx('steam',{x:1.5,z:-2.7,w:.3,h:.9,y:.4});}]]);})]},
/* 11 · the Earl of Sandwich: bread, cheese and egg on the card table, then a sandwich */
f11:{steps:[story(sc=>{sc.prop('table',0,-2.55,{tap:false,s:1.1});const k=sc.kid(5,-1.55,-2.4,{mode:'point',ry:.5,say:'I will not stop playing!'});const ns=['sandwich','bread','cheese','egg'];
   ns.forEach((n,i)=>{const p=sc.prop(n,-.65+i*.62,-2.55,{label:n,ci:i,s:.62,y:.72});if(n==='sandwich'){p.visible=false;sc.later(()=>{p.visible=true;S().alive(p,true);sc.say(k,'A sandwich!',1800);},5200);}});})]},
/* 12 · Sister Sun and Brother Moon chase each other up into the sky */
f12:{steps:[story(sc=>{const g=sc.prop('girl',-1.0,-2.0,{label:'sister',s:.85});const b=sc.prop('boy',-1.8,-2.2,{label:'brother',s:.85});const su=sc.prop('sun',1.3,-2.9,{label:'Sun',y:.2,s:.7});const mo=sc.prop('moon',.3,-2.9,{label:'Moon',y:.1,s:.7});
   seq(sc,[[600,()=>{sc.move(g,.8,-2.2,2.2);sc.move(b,0,-2.3,2.2);}],[2400,()=>{sc.move(g,1.3,-2.9,1.2,1.4).then(()=>{g.visible=false;sc.move(su,1.3,-2.9,1.0,1.4);});sc.move(b,.3,-2.9,1.2,1.2).then(()=>{b.visible=false;sc.move(mo,.3,-2.9,1.0,1.2);});}]]);})]},
/* 13 · the animal year: animals parade round a calendar wheel */
f13:{steps:[story(sc=>{const ns=['tiger','rabbit','monkey','dragon'];const ps=ns.map((n,i)=>sc.prop(n,0,-2.6,{label:n,ci:i,s:.85}));sc.tick((dt,t)=>{ps.forEach((p,i)=>{const a=t*.45+i*Math.PI/2;p.position.set(Math.sin(a)*1.5,0,-2.45-Math.cos(a)*.45);});});
   sc.kid(3,-1.9,-1.55,{mode:'think',ry:.5,say:'What is my animal?'});})]},
/* 14 · Billy's bad dream: dark, a spider… light on: it is a slipper */
f14:{steps:[story(sc=>{const k=sc.kid(1,-1.2,-2.4,{mode:'sleep',ry:.3,name:'boy'});const sp=sc.prop('spider',.2,-2.0,{label:'spider?',s:.8});const d=sc.prop('man',1.6,-2.7,{label:'Dad',s:.9});const lb=sc.prop('light bulb',.8,-2.95,{label:'light',y:.9,s:.6});lb.visible=false;
   seq(sc,[[900,()=>{sc.mode(k,'cover');sc.say(k,'Help! A spider!',1800);}],[2200,()=>{lb.visible=true;S().alive(lb,true);sc.say(d,'It is only your slipper!',2200);}],[1600,()=>{sp.visible=false;const sl=sc.prop('shoe',.2,-2.0,{label:'slipper',s:.7});S().alive(sl);}],[1500,()=>{sc.mode(k,'cheer');sc.say(k,'Phew!',1600);}]]);})],
  rounds:{9:{scene:(sc)=>{const k=sc.kid(4,-1.0,-2.3,{mode:'walk',ry:.3});sc.prop('cake',.7,-2.6,{label:false,s:.9});return {win(){sc.mode(k,'cheer');sc.say(k,'Surprise!');sc.fx('sparkle',{x:0,z:-2.4,w:2.4,h:1.6});},miss(){sc.mode(k,'no',900);}};}}}},
/* 15 · s'mores at the campfire */
f15:{steps:[story(sc=>{sc.prop('fire',0,-2.55,{label:'fire',s:.9});sc.fx('sparkle',{x:0,z:-2.55,w:.5,h:1.2,y:.4});const st=sc.prop('stick',-1.2,-2.2,{label:'stick',y:.5,s:.9});sc.prop('chocolate',1.2,-2.75,{label:'chocolate',s:.7});sc.prop('cookie',1.8,-2.4,{label:'cracker',s:.7});
   const k=sc.kid(0,-1.75,-1.9,{mode:'point',ry:.6,say:'First, the marshmallow!'});seq(sc,[[1500,()=>sc.move(st,-.35,-2.4,1.0,.6)],[2400,()=>sc.say(k,'Golden brown!',1600)],[2000,()=>{sc.mode(k,'eat');sc.say(k,'Gooey!',1600);}]]);})]},
/* 16 · Cartier sails up the river and writes "Canada" on a map */
f16:{steps:[story(sc=>{sc.prop('water',0,-2.45,{name:'river',tap:false});const sb=sc.prop('sailboat',-1.9,-2.45,{label:'ship',s:.9});sc.prop('house',1.5,-2.95,{label:'kanata',s:.9});const m=sc.prop('map',1.7,-1.9,{label:'Canada',s:.75});m.visible=false;
   sc.move(sb,.4,-2.45,4.0);sc.tick((dt,t)=>{sb.rotation.z=Math.sin(t*1.5)*.06;});const k=sc.kid(2,1.0,-1.85,{mode:'wave',ry:-.4});sc.later(()=>sc.say(k,'Kanata!',1800),3200);sc.later(()=>{m.visible=true;S().alive(m,true);},6200);})]},
/* 17 · digging up Scotty: a bone, a tooth, then the whole T. rex rises */
f17:{steps:[story(sc=>{sc.prop('mountain',1.5,-2.85,{label:'hill',s:1});const bn=sc.prop('bone',-1.5,-2.4,{label:'bone',s:.75});const th=sc.prop('tooth',-.5,-2.5,{label:'teeth',s:.6});const d=sc.prop('dinosaur',.4,-2.8,{label:'Scotty',s:.9});d.scale.setScalar(.01);
   const k=sc.kid(4,-1.7,-1.75,{mode:'point',ry:.5,say:'Is it a dinosaur?'});seq(sc,[[2600,()=>{S().alive(bn);S().alive(th);}],[1800,()=>{P.tween(.8,q=>d.scale.setScalar(Math.max(.01,q*.9)));sc.mode(k,'cheer');sc.say(k,'Wow! A T. rex!',2200);}]]);})]},
/* 18 · Lily learns to ride: wobble, then off she goes */
f18:{steps:[story(sc=>{const b=sc.prop('bicycle',-1.0,-2.3,{label:'bike',s:.85});const lily=sc.kid(4,-1.0,-2.3,{mode:'idle',ry:Math.PI/2,name:'girl',s:.65,tap:false});sc.prop('man',-1.9,-2.8,{label:'Dad',s:.85});const me=sc.kid(2,1.7,-1.8,{mode:'clap',ry:-.5,name:'child'});
   let T=0;sc.tick((dt)=>{T+=dt;lily.position.set(b.position.x-.05,.16,b.position.z);b.rotation.x=T<5?Math.sin(T*5)*.1:0;(b.userData.wheels||[]).forEach(w=>{w.rotation.z-=dt*3;});});
   seq(sc,[[600,()=>sc.move(b,0,-2.3,2.2)],[2600,()=>{sc.say(me,'Try again!',1600);}],[1800,()=>{sc.move(b,1.1,-2.3,1.6);sc.say(lily,'I did it!',2000);sc.mode(me,'cheer');}]]);})]},
/* 19 · Polar Bear Swim: the bell rings, everyone splashes in */
f19:{steps:[story(sc=>{sc.prop('water',.4,-2.55,{name:'ocean',tap:false});const bl=sc.prop('bell',-1.9,-2.8,{label:'bell',s:.7,y:.4});sc.prop('polar bear',1.8,-2.85,{label:'Polar Bear Swim',s:.85});const sw=sc.prop('swimmer',-1.2,-2.0,{label:'swimmers',s:.8});
   const k=sc.kid(3,-.8,-1.7,{mode:'shiver',ry:.2});seq(sc,[[800,()=>{S().alive(bl);sc.say(bl,'Ding ding!',1400);}],[1400,()=>{sc.hop(sw,.2,-2.5,.7,.8);sc.hop(k,.9,-2.4,.7,.8).then(()=>{sc.mode(k,'swim');sc.say(k,'Brrr!',1600);});}]]);})]},
/* 20 · the giant's leg bridge, the ants, the salt tumbles into the sea */
f20:{steps:[story(sc=>{sc.prop('water',0,-2.45,{name:'ocean',tap:false});const gi=sc.prop('giant',1.7,-2.75,{label:'giant',s:1.2});const bg=sc.prop('bag',-1.2,-2.3,{label:'salt',s:.7});const an=sc.prop('ant',.9,-2.3,{label:'red ants',s:.5});
   seq(sc,[[1500,()=>sc.say(gi,'Walk across my leg!',2000)],[2300,()=>{S().alive(an);sc.say(gi,'Ouch!',1400);}],[1200,()=>{sc.hop(bg,0,-2.45,.8,.8).then(()=>{sc.move(bg,0,-2.45,.8,-.3);sc.fx('sparkle',{x:0,z:-2.45,w:.8,h:.6});});}]]);})]},
/* 21 · Grandma knits tiny hats for the hospital */
f21:{steps:[story(sc=>{const gm=sc.prop('grandma',-1.5,-2.5,{label:'Grandma',s:1});const w=sc.prop('scarf',-.5,-2.4,{label:'wool hats',s:.8});sc.tick((dt,t)=>{w.rotation.y=t;});const bb=sc.prop('baby',.6,-2.6,{label:'babies',s:.8});sc.prop('hospital',1.7,-2.9,{label:'hospital',s:1});
   seq(sc,[[1400,()=>sc.say(gm,'These babies are fighters!',2400)],[3000,()=>{sc.hop(w,.6,-2.6,.6,.8);S().alive(bb);}]]);sc.kid(5,-.4,-1.6,{mode:'clap',ry:.1});})]},
/* 22 · Fluffy fetches… no paper on Sunday! */
f22:{steps:[story(sc=>{const dg=sc.prop('dog',-1.2,-2.2,{label:'Fluffy',s:.85});const np=sc.prop('newspaper',1.6,-2.3,{label:'newspaper',s:.6});const mr=sc.prop('man',-1.9,-2.85,{label:'Mr. Green',s:.85});const mrs=sc.prop('woman',-.9,-2.9,{label:'Mrs. Green',s:.85});
   seq(sc,[[600,()=>sc.say(mr,'Get the paper!',1500)],[1600,()=>sc.move(dg,1.3,-2.2,1.4)],[1600,()=>{np.position.set(1.3,.3,-2.05);sc.move(dg,-1.2,-2.2,1.4);sc.move(np,-1.2,-2.05,1.4,.3);}],[2000,()=>{sc.say(mrs,'It is Sunday!',2000);S().alive(mrs);}]]);})]},
/* 23 · the new student: jealous, lonely, then skipping together */
f23:{steps:[story(sc=>{const emi=sc.kid(1,.6,-2.4,{mode:'jump',ry:-.4,name:'girl'});sc.prop('rope',.6,-2.0,{label:'pink rope',s:.6});const me=sc.kid(4,-1.5,-2.2,{mode:'sad',ry:.5});const sd=sc.prop('sad',-1.6,-2.9,{label:'sad',s:.6,y:.5});const hp=sc.prop('happy',1.7,-2.9,{label:'happy',s:.6,y:.5});hp.visible=false;
   seq(sc,[[2000,()=>sc.say(me,'I feel jealous…',1800)],[3000,()=>sc.say(emi,'Come and play!',1800)],[2000,()=>{sd.visible=false;hp.visible=true;S().alive(hp,true);sc.move(me,-.3,-2.4,1.0);sc.mode(me,'jump');sc.say(me,'Sorry, Emi!',1800);}]]);})]},
/* 24 · jacks: the ball flies over Grandpa's head while he grabs a jack */
f24:{steps:[story(sc=>{const gp=sc.prop('grandpa',-1.5,-2.6,{label:'Grandpa',s:1});sc.prop('bag',-.5,-2.4,{label:'bag',s:.6});const b=sc.prop('ball',.3,-2.4,{label:'ball',s:.55});const k=sc.kid(2,1.5,-2.0,{mode:'idle',ry:-.5,name:'child'});
   let T=0;sc.tick((dt)=>{T+=dt;const k2=(T*.8)%1;b.position.y=Math.sin(k2*Math.PI)*1.3;});sc.later(()=>sc.say(gp,'Toss, grab, catch!',2000),1200);sc.later(()=>{sc.mode(k,'cheer');sc.say(k,'I got five!',1800);},6500);})]},
/* 25 · what will I be? the family's jobs, then a dream */
f25:{steps:[story(sc=>{arc(sc,[{n:'firefighter',label:'Dad'},{n:'doctor',label:'Mom'},{n:'mechanic',label:'Grandpa'},{n:'artist',label:'me?'}]);const k=sc.kid(3,0,-1.65,{mode:'think',ry:0,say:'What will I be?'});
   sc.later(()=>{sc.mode(k,'cheer');sc.say(k,'A vet, or a cook, or a painter!',2600);},6000);})]},
/* 26 · Grandma's choice: candy or a chick? the chick grows */
f26:{steps:[story(sc=>{const gm=sc.prop('grandma',-1.7,-2.6,{label:'Grandma',s:.95});const c=sc.prop('coin',-.7,-2.3,{label:'one dollar',s:.6});sc.prop('candy',.4,-2.75,{label:'candy',s:.7});const ch=sc.prop('chick',1.5,-2.6,{label:'tiny chick',s:.6});
   seq(sc,[[2000,()=>sc.say(gm,'Candy or a chick?',1800)],[2400,()=>{sc.hop(c,1.5,-2.3,.6,.7);sc.say(gm,'I will buy the chick!',2000);}],[2400,()=>{const s0=ch.scale.x;P.tween(1.2,q=>ch.scale.setScalar(s0*(1+q*.8)));}]]);})]},
/* 27 · the fox and the stork: a flat dish, then a tall jar */
f27:{steps:[story(sc=>{const fx=sc.prop('fox',-1.3,-2.5,{label:'fox',s:.95});const st=sc.prop('bird',1.3,-2.5,{label:'stork',s:.95});const sp=sc.prop('soup',0,-2.3,{label:'flat dish',s:.7});const jr=sc.prop('jar',0,-2.85,{label:'tall jar',s:.8});jr.visible=false;
   seq(sc,[[1400,()=>{sc.say(fx,'Slurp!',1200);S().alive(fx);}],[1500,()=>sc.say(st,'I cannot drink it!',1800)],[2600,()=>{sp.visible=false;jr.visible=true;S().alive(jr,true);sc.say(st,'Now it is my turn.',1800);}],[2200,()=>sc.say(fx,'I cannot reach it!',2000)]]);})]},
/* 28 · Johnny Appleseed: seeds become trees full of apples */
f28:{steps:[story(sc=>{const jm=sc.prop('man',-1.8,-2.4,{label:'Johnny',s:.9});const sd=sc.prop('seed',-.8,-2.4,{label:'seeds',s:.5});const tr=sc.prop('tree',.4,-2.8,{label:'trees',s:1.05});const ap=sc.prop('apple',1.5,-2.4,{label:'apples',s:.8});
   const t0=tr.scale.x,a0=ap.scale.x;tr.scale.setScalar(.01);ap.scale.setScalar(.01);
   seq(sc,[[1500,()=>{sc.move(jm,-1.0,-2.4,1.0);S().alive(sd);}],[1800,()=>P.tween(1.4,q=>tr.scale.setScalar(Math.max(.01,q*t0)))],[2000,()=>{P.tween(.7,q=>ap.scale.setScalar(Math.max(.01,q*a0)));sc.say(jm,'Apples for everyone!',2200);}]]);})]}
};
})();
