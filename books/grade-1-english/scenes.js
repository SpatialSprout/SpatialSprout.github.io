/* The Interactive Classroom: Grade 1 English — acted scenes.
   Every lesson's story is acted out in 3D on the model page (the narration still lights up each thing as it
   is named), and many questions open with a little scene that reacts when the child answers.
   Coordinates: x from -2.2 (left) to 2.2 (right); z from -3.0 (back of the page) to -0.8 (front). */
(function(){
"use strict";
const P=window.PM;if(!P)return;
const L=(f,ms)=>P.STAGE.later(f,ms);const seq=(list)=>{const sc=P.STAGE.cur;let t=0;list.forEach(([ms,f])=>{t+=ms;P.STAGE.later(f,t);});};
const S=()=>P.STAGE;
/* the story scene only (no row of cards): the props carry the names the narration cues look for */
const story=fn=>({scene:fn});
P.SCN={
/* 1 · pumpkin patch: Kai walks to the patch, the goat bleats, a pumpkin hops into his arms */
e01:{steps:[story(sc=>{sc.prop('hay',-1.7,-2.7,{label:'hay',ci:3});sc.prop('goat',-.7,-2.85,{label:'goat',ci:2});const pk=sc.prop('pumpkin',.6,-2.55,{label:'pumpkin',ci:0});sc.prop('apple',1.7,-2.8,{label:'apple',ci:1});
   const k=sc.kid(0,-1.6,-1.6,{mode:'walk',ry:.6});sc.move(k,.0,-1.75,2.2).then(()=>{sc.mode(k,'cheer');sc.say(k,'A big pumpkin!',2200);S().alive(pk,true);});
   L(()=>{const g=sc.find('goat');if(g){S().alive(g);sc.say(g,'Maa!',1500);}},2600);})],
  rounds:{0:{scene:(sc,st)=>{const k=sc.kid(0,-1.6,-2.5,{mode:'think',ry:.4,say:'b… b… b?'});return {win(){sc.mode(k,'cheer');sc.say(k,'Bee starts with b!');},miss(){sc.mode(k,'no',900);}};}},
   2:{scene:(sc)=>{const k=sc.kid(3,-1.6,-2.5,{mode:'think',ry:.4,say:'m… m… m?'});return {win(){sc.mode(k,'cheer');sc.say(k,'Mouse!');},miss(){sc.mode(k,'no',900);}};}}}},
/* 2 · boats: water, a canoe paddling, a sailboat in the wind, a big ship tooting */
e02:{steps:[story(sc=>{sc.prop('water',0,-2.45);const c=sc.prop('canoe',-1.5,-2.4,{label:'canoe',ci:0,bob:.04});const sb=sc.prop('sailboat',0,-2.6,{label:'sailboat',ci:1,bob:.05});const sh=sc.prop('ship',1.5,-2.5,{label:'ship',ci:4,bob:.03});
   sc.tick((dt,t)=>{c.position.x=-1.5+Math.sin(t*.6)*.3;sb.rotation.z=Math.sin(t*1.5)*.08;});L(()=>{sc.say(sh,'Toot toot!',1800);S().alive(sh);},2500);})]},
/* 3 · the greedy dog: barks at his reflection and the stick drops into the pond */
e03:{steps:[story(sc=>{sc.prop('pond',.9,-2.4,{name:'water'});const d=sc.prop('dog',-.5,-2.4,{label:'big dog',ci:0,s:1.05});const st=sc.prop('stick',-.5,-2.0,{name:'wood',y:.5});
   const pp=sc.prop('puppy',-1.8,-2.6,{label:'small dog',ci:2,s:.75});   sc.say(pp,'Can I play?',2000);seq([[2400,()=>sc.say(d,'No! Mine!',1600)],[1800,()=>{sc.move(d,.35,-2.4,1.0);sc.move(st,.35,-2.0,1.0);}],[1300,()=>sc.say(d,'Woof!',1200)],[700,()=>{sc.move(st,.9,-2.3,.8,0).then(()=>{st.visible=false;S().alive(d);});sc.say(pp,'Sharing is fun!',2500);}]]);})]},
/* 4 · the sky: the moon glows, stars twinkle, a cloud drifts, a kite flies */
e04:{steps:[story(sc=>{const m=sc.prop('moon',-1.3,-2.8,{y:1.0,name:'full moon'});m.userData.name='full moon';[[-.3,1.05],[.4,1.25],[1.0,.95],[1.6,1.15]].forEach(([x,y],i)=>{const s=sc.prop('star',x,-2.9,{y,toyS:.9});s.userData.name='star';sc.tick((dt,t)=>{s.scale.setScalar(.9+Math.sin(t*3+i)*.15);});});
   const c=sc.prop('cloud',1.2,-2.6,{y:.85});c.userData.name='cloud';sc.tick((dt,t)=>{c.position.x=1.2+Math.sin(t*.4)*.5;});const kt=sc.prop('kite',.2,-2.3,{y:.9,bob:.15});kt.userData.name='kite';
   sc.kid(1,-1.0,-1.6,{mode:'lookup',ry:.2,say:'So many stars!'});})]},
/* 5 · the food song: dishes bounce to the beat while Milo dances */
e05:{steps:[story(sc=>{['rice','soup','pie'].forEach((n,i)=>{const p=sc.prop(n,-.4+i*.95,-2.6,{label:n,ci:i});sc.tick((dt,t)=>{p.position.y=Math.abs(Math.sin(t*4+i))*.15;});});const k=sc.kid(4,-1.6,-2.0,{mode:'dance',ry:.4});sc.fx('notes',{x:-1.5,z:-2.1,w:.6,h:1.3,y:.9});})],
  rounds:{0:{scene:(sc)=>{const c=sc.prop('cat',-1.6,-2.6,{label:'cat',s:1.0});sc.say(c,'What rhymes with me?');return {win(){const h=sc.prop('hat',.6,-2.4,{});sc.hop(h,-1.6,-2.6,.9,.8).then(()=>{h.position.y=.95;});sc.say(c,'A hat for a cat!');}};}},
   1:{scene:(sc)=>{const m=sc.prop('moon',-1.6,-2.7,{y:.9});sc.say(m,'Moon… ?');return {win(){sc.say(m,'Moon and spoon!');S().alive(m,true);}};}}}},
/* 6 · pen pals: Sam rides his bike around the lake with his dog */
e06:{steps:[story(sc=>{const lk=sc.prop('pond',0,-2.35,{name:'lake'});lk.scale.set(.75,1,.45);const k=sc.kid(2,-1.4,-1.9,{mode:'walk',name:'boy',say:'Hi, Aiko!'});k.userData.name='boy';const b=sc.prop('bicycle',-1.0,-1.8,{s:.75});
   const d=sc.prop('dog',1.6,-2.1,{label:'dog',ci:2,s:.8});sc.tick((dt,t)=>{const a=t*.5;b.position.set(Math.cos(a)*1.25,0,-2.35+Math.sin(a)*.62);b.rotation.y=Math.atan2(-Math.cos(a)*.62,-Math.sin(a)*1.25);(b.userData.wheels||[]).forEach(w=>{w.rotation.z-=dt*3;});k.position.set(b.position.x,.14,b.position.z);k.userData.ry=b.rotation.y+Math.PI/2;d.position.set(Math.cos(a-.7)*1.25,Math.abs(Math.sin(t*6))*.08,-2.35+Math.sin(a-.7)*.62);});})],
  rounds:{2:{scene:(sc)=>{const k=sc.kid(2,-.3,-2.4,{mode:'jump',ry:0,say:'I can jump!'});return {win(){sc.say(k,'Jump is an action!');sc.mode(k,'cheer');}};}}}},
/* 7 · pancakes: a pancake flips in the air, the cat watches */
e07:{steps:[story(sc=>{const k=sc.kid(0,-.6,-2.3,{mode:'idle',ry:.2});const pc=sc.prop('pancakes',-.3,-2.0,{label:'pancakes',ci:0,s:.7});sc.prop('egg',.7,-2.6,{label:'eggs',ci:1,s:.75});sc.prop('milk',1.5,-2.7,{label:'milk',ci:4,s:.75});
   const c=sc.prop('cat',-1.8,-2.7,{label:'cat',ci:2,s:.8});sc.tick((dt,t)=>{const k2=(t%2.5)/2.5;pc.position.y=Math.sin(Math.min(1,k2*1.6)*Math.PI)*.9;pc.rotation.x=Math.min(1,k2*1.6)*Math.PI*2;c.rotation.y=Math.sin(t*1.5)*.3;});})],
  rounds:{3:{scene:(sc)=>{sc.prop('city',-.4,-2.6,{label:'city',ci:1});const k=sc.kid(0,-1.6,-2.4,{mode:'think',ry:.4,say:'Any city?'});return {win(){sc.mode(k,'cheer');sc.say(k,'city: a common noun!');}};}}}},
/* 8 · a letter from Vancouver: Nora waves from her new city, Biscuit sits in the window */
e08:{steps:[story(sc=>{const c=sc.prop('city',.2,-2.75,{label:'Vancouver',ci:1,s:1.1});c.userData.name='city';sc.prop('park',1.6,-2.6,{label:'Stanley Park',ci:3});sc.prop('cat',-.7,-2.2,{label:'Biscuit',ci:2,s:.8});
   const k=sc.kid(2,-1.7,-2.0,{mode:'wave',ry:.5,say:'Hi, Leo!'});k.userData.name='boy';})],
  rounds:{0:{scene:(sc)=>{sc.prop('city',-.5,-2.7,{label:'?',ci:1});const k=sc.kid(1,-1.6,-2.4,{mode:'think',ry:.4,say:'Which is a special name?'});return {win(){sc.mode(k,'cheer');sc.say(k,'Toronto: a capital T!');}};}},
   1:{scene:(sc)=>{const d=sc.prop('dog',-.5,-2.6,{label:'?',ci:2});const k=sc.kid(1,-1.6,-2.4,{mode:'think',ry:.4,say:'My dog’s name?'});return {win(){sc.say(d,'I am Max!');S().alive(d,true);sc.mode(k,'cheer');}};}}}},
/* 9 · the new baby: stars and hearts float over the crib */
e09:{steps:[story(sc=>{const b=sc.prop('baby',-.2,-2.5,{label:'brother',ci:0});sc.prop('gift',.8,-2.6,{label:'blankets',ci:3,s:.8});sc.prop('cake',1.7,-2.7,{label:'cake',ci:1,s:.8});
   ['star','star','star'].forEach((n,i)=>{const s=sc.prop('star',-.9+i*.6,-2.9,{y:1.0,toyS:.7});s.userData.name='star';sc.tick((dt,t)=>{s.position.y=.95+Math.sin(t*2+i)*.15;});});const k=sc.kid(1,-1.6,-2.0,{mode:'wave',ry:.5,say:'Hi, baby!'});})],
 },
/* 10 · chores: Mom washes dishes, the dog gets fed, Amara makes her bed */
e10:{steps:[story(sc=>{const k=sc.kid(3,-1.5,-2.0,{mode:'clap',ry:.4,say:'We all help!'});sc.prop('plate',-.5,-2.7,{label:'dishes',ci:0,s:.85});const g=sc.prop('garbage',.4,-2.7,{label:'garbage',ci:1,s:.85});
   const d=sc.prop('dog',1.2,-2.4,{label:'dog',ci:2,s:.85});sc.prop('bed',1.9,-2.8,{label:'bed',ci:3,s:.85});sc.fx('sparkle',{x:-.5,z:-2.7,w:.6,h:1});sc.tick((dt,t)=>{d.position.y=Math.abs(Math.sin(t*5))*.08;});})],
  rounds:{1:{scene:(sc)=>{const k=sc.kid(3,-1.4,-2.4,{mode:'think',ry:.4,say:'the tall green… what?'});sc.prop('question',.3,-2.6,{label:false});return {win(){sc.mode(k,'cheer');sc.say(k,'Not a complete thought!');}};}}}},
/* 11 · dumplings with Grandma: steam rises from the pot, dumplings hop in */
e11:{steps:[story(sc=>{const gm=sc.prop('grandma',-1.5,-2.5,{label:'Grandma',ci:0});const pt=sc.prop('pot',.5,-2.4,{});pt.userData.name='pot';sc.fx('steam',{x:.5,z:-2.4,w:.5,h:1.3,y:.4});
   const dm=sc.prop('perogies',-.5,-2.0,{label:'dumplings',ci:1,s:.75});sc.prop('cheese',1.6,-2.7,{label:'cheese',ci:2,s:.8});seq([[2500,()=>sc.hop(dm,.5,-2.4,.8,.8).then(()=>{dm.visible=false;})]]);})]},
/* 12 · the Sun and the Wind: the wind blows, the boy hugs his coat; the sun shines, off comes the coat */
e12:{steps:[story(sc=>{const w=sc.prop('cloud',-1.6,-2.8,{y:1.2});w.userData.name='wind';const sun=sc.prop('sun',1.5,-2.9,{y:1.4});const k=sc.kid(2,0,-2.2,{mode:'shiver',ry:0});k.userData.name='boy';
   const c=sc.prop('coat',0,0,{tap:false});c.userData.name='coat';k.children[0].add(c);c.position.set(0,.3,0);c.scale.setScalar(1.12);sc.fx('snow',{x:-.6,z:-2.4,w:1.6,h:1.6});
   sc.say(w,'I am stronger!',2500);seq([[3800,()=>{sc.say(sun,'Let me try.',2000);}],[2400,()=>{sc.mode(k,'hot');S().alive(sun,true);}],[1800,()=>{sc.g.attach(c);sc.hop(c,1.0,-2.0,.6,.8).then(()=>{c.position.y=0;});sc.mode(k,'cheer');sc.say(k,'So warm!',2000);}]]);})],
  rounds:{2:{scene:(sc)=>{const k=sc.kid(1,-1.2,-2.4,{mode:'swim',ry:.6});sc.prop('water',0,-2.45);return {win(){sc.say(k,'Can you swim? Yes!',2000);}};}},
   4:{scene:(sc)=>{const k=sc.kid(5,-1.5,-2.4,{mode:'think',ry:.4,say:'Where…? Who…? What…?'});return {win(){sc.mode(k,'cheer');sc.say(k,'Where is a question word!');}};}}}},
/* 13 · duck pond surprise: ducks swim round, splash! a duckling runs to Ben */
e13:{steps:[story(sc=>{sc.prop('pond',.6,-2.5);const d=sc.prop('duck',.6,-2.5,{label:'duck',ci:0});const ch=sc.prop('chick',1.5,-2.2,{label:'duckling',ci:3,s:.7});
   const b=sc.kid(4,-1.6,-2.1,{mode:'idle',ry:.5});b.userData.name='boy';const a=sc.kid(5,-.9,-2.6,{mode:'idle',ry:.3});a.userData.name='girl';
   sc.tick((dt,t)=>{d.position.set(.6+Math.cos(t*.8)*.5,0,-2.5+Math.sin(t*.8)*.3);d.rotation.y=-t*.8;});
   seq([[2200,()=>{sc.say(d,'Splash!',1500);S().alive(d,true);}],[1800,()=>{sc.mode(a,'cheer');sc.say(a,'Wow!',2000);}],[2000,()=>{sc.move(ch,-1.15,-2.0,1.4);}],[1600,()=>{sc.mode(b,'jump');sc.say(b,'It likes me!',2500);}]]);})],
  rounds:{1:{scene:(sc)=>{const k=sc.kid(4,-1.5,-2.2,{mode:'idle',ry:.3});return {win(){const r=sc.prop('rainbow',.6,-2.9,{y:.2});S().alive(r,true);sc.mode(k,'cheer');sc.say(k,'Wow, a rainbow!');}};}},
   4:{scene:(sc)=>{const k=sc.kid(4,-.6,-2.4,{mode:'idle'});return {win(){sc.mode(k,'cheer');sc.say(k,'Hooray!');}};}}}},
/* 14 · winter fun: snow falls, the sled zooms down a hill, Pepper chases */
e14:{steps:[story(sc=>{sc.fx('snow',{x:0,z:-2.4,w:4.4,d:1.4,h:2});const h=sc.prop('hill',1.75,-2.85);h.scale.multiplyScalar(.5);h.position.y=-.21;const sm=sc.prop('snowman',-1.6,-2.6,{});sm.userData.name='snowman';
   const sl=sc.prop('sled',1.6,-2.6,{label:'sled',ci:1,s:.8});const k=sc.kid(0,-.6,-2.2,{mode:'cheer',ry:.2});k.userData.name='boy';const d=sc.prop('dog',-.1,-1.9,{label:'Pepper',ci:2,s:.75});
   sc.tick((dt,t)=>{const k2=(t%3)/3;sl.position.set(1.5-k2*1.3,Math.max(0,.3-k2*.4),-2.6+k2*.4);d.position.x=-.1+Math.sin(t*2)*.4;d.position.y=Math.abs(Math.sin(t*6))*.08;});})]},
/* 15 · book club: a calendar flips, the polar bear waves, hearts float up */
e15:{steps:[story(sc=>{sc.prop('books',-1.5,-2.6,{label:'book club',ci:0});const c=sc.prop('calendar',-.5,-2.7,{label:'Friday',ci:1});sc.prop('polar bear',.6,-2.6,{label:'December',ci:4});sc.prop('heart',1.6,-2.6,{label:'Valentine’s Day',ci:5});
   sc.tick((dt,t)=>{c.rotation.y=Math.sin(t*1.2)*.25;});const k=sc.kid(2,-1.1,-1.8,{mode:'read',ry:.3});})]},
/* 16 · snow day: snow falls, the radio speaks, a snowman builds itself */
e16:{steps:[story(sc=>{sc.fx('snow',{x:0,z:-2.4,w:4.4,d:1.4,h:2});const r=sc.prop('radio',-1.5,-2.6,{label:'radio',ci:1});const sf=sc.prop('snowflake',-.5,-2.8,{label:'snow',ci:4,y:.6});sf.userData.name='snowflake';
   const sm=sc.prop('snowman',.7,-2.6,{});sm.userData.name='snowman';sm.scale.set(.01,.01,.01);sc.prop('carrot',1.6,-2.6,{label:'carrot',ci:0,s:.75});const k=sc.kid(3,-.4,-1.9,{mode:'idle',ry:.3});
   seq([[1800,()=>{sc.say(r,'All schools are closed!',2200);S().alive(r,true);}],[1500,()=>{sc.mode(k,'cheer');sc.say(k,'Hooray!',1800);}],[1500,()=>{P.tween(1,k2=>sm.scale.setScalar(Math.max(.01,k2)));}]]);})]},
/* 17 · Mom is a student: she reads big books, the plant grows, the teacher claps */
e17:{steps:[story(sc=>{const m=sc.prop('woman',-1.4,-2.5,{label:'Mom',ci:0});sc.prop('books',-.4,-2.6,{label:'books',ci:1});const pl=sc.prop('plant',.6,-2.6,{label:'plants',ci:3});sc.prop('teacher',1.6,-2.5,{label:'teacher',ci:4});
   const k=sc.kid(1,-.9,-1.8,{mode:'read',ry:.3});seq([[3000,()=>S().alive(pl,true)],[1500,()=>sc.say(sc.find('teacher'),'Great work!',2000)]]);})],
  rounds:{4:{scene:(sc)=>{const k=sc.kid(2,-.4,-2.4,{mode:'kick',ry:.2});sc.prop('hockey',.6,-2.2,{label:false,s:.8});return {win(){sc.mode(k,'cheer');sc.say(k,'My brother is the subject!');}};}}}},
/* 18 · the giant turnip: everyone pulls together, and pop! */
e18:{steps:[story(sc=>{const tp=sc.prop('turnip',1.4,-2.6);tp.userData.name='onion';tp.position.y=-.35;const gp=sc.prop('grandpa',.5,-2.5,{label:'he',ci:0,s:.85});const gm=sc.prop('grandma',-.3,-2.5,{label:'she',ci:1,s:.85});
   const k=sc.kid(5,-1.0,-2.45,{mode:'pull',ry:Math.PI/2});const fam=sc.prop('family',-1.8,-2.5,{label:'they',ci:3,s:.85});
   sc.tick((dt,t)=>{if(tp.userData.out)return;const w=Math.sin(t*10)*.03;[gp,gm,fam].forEach(o=>o.position.x+=0);gp.rotation.z=.15+w;gm.rotation.z=.15+w;fam.rotation.z=.15+w;});
   seq([[5200,()=>{tp.userData.out=true;sc.say(tp,'POP!',1800);P.tween(.6,k2=>{tp.position.y=-.35+k2*.9;tp.position.x=1.4+k2*.2;}).then(()=>P.tween(.4,k2=>{tp.position.y=.55-k2*.55;}));[gp,gm,fam].forEach(o=>P.tween(.4,k2=>{o.rotation.z=.15+k2*.5;}).then(()=>P.tween(.4,k2=>{o.rotation.z=.65*(1-k2);})));sc.mode(k,'cheer');}]]);})]},
/* 19 · Mr. Music's one-man band: the drum bangs, the guitar strums, notes fly, a dancer spins */
e19:{steps:[story(sc=>{['drum','guitar','trumpet'].forEach((n,i)=>{const p=sc.prop(n,-1.5+i*.9,-2.6,{label:n,ci:i});sc.tick((dt,t)=>{p.rotation.z=Math.sin(t*8+i*2)*.08;p.position.y=Math.abs(Math.sin(t*4+i))*.08;});});
   const d=sc.kid(3,1.4,-2.3,{mode:'dance',ry:-.3});d.userData.name='dancer';sc.fx('notes',{x:-.6,z:-2.6,w:2,h:1.5,y:.8});})],
  rounds:{0:{scene:(sc)=>{sc.prop('water',0,-2.5);const k=sc.kid(1,-1.2,-2.5,{mode:'idle',ry:.4,say:'What am I doing?'});return {win(){sc.mode(k,'swim');sc.say(k,'Swim!',2000);sc.move(k,1.2,-2.5,1.4);}};}},
   1:{scene:(sc)=>{const k=sc.kid(0,-.3,-2.4,{mode:'idle',say:'Show me a verb!'});return {win(){sc.mode(k,'jump');sc.say(k,'Jump!');}};}},
   2:{scene:(sc)=>{const d=sc.prop('dog',-.4,-2.6,{label:'dog'});return {win(){sc.say(d,'Woof! Woof!');S().alive(d,true);}};}},
   5:{scene:(sc)=>{const k=sc.kid(5,-1.3,-2.5,{mode:'idle',ry:.4,say:'What am I doing?'});return {win(){sc.mode(k,'sing');sc.fx('notes',{x:-1.3,z:-2.5,w:.5,h:1.3,y:.9});sc.say(k,'La la la!');}};}}}},
/* 20 · my new puppy: Toby fetches the ball */
e20:{steps:[story(sc=>{const p=sc.prop('puppy',-.4,-2.4,{label:'puppy',ci:0,s:.85});const b=sc.prop('ball',1.4,-2.5,{toyS:1.2});b.userData.name='ball';sc.prop('basket',1.8,-2.9,{label:'basket',ci:3,s:.75});
   const k=sc.kid(4,-1.6,-2.1,{mode:'idle',ry:.5});k.userData.name='boy';sc.tick((dt,t)=>{const k2=(t%3.2)/3.2;b.position.set(-1.2+k2*2.6,Math.sin(k2*Math.PI)*.9,-2.5);p.position.set(-.4+Math.sin(k2*Math.PI)*1.6,Math.abs(Math.sin(t*8))*.1,-2.3);});})],
  rounds:{5:{scene:(sc)=>{const a=sc.prop('dog',-.3,-2.6,{label:false,s:1.1});const b=sc.prop('dog',.6,-2.6,{label:false,s:1.1});return {win(){S().alive(a,true);S().alive(b,true);sc.say(a,'We are big!');}};}}}},
/* 21 · a starry night: the fire flickers, stars twinkle, the moon glows */
e21:{steps:[story(sc=>{sc.prop('tent',-1.5,-2.7,{label:'quiet lake',ci:3});const f=sc.prop('fire',.2,-2.3,{label:'warm fire',ci:0,s:.85});sc.fx('steam',{x:.2,z:-2.3,w:.3,h:1,y:.6});
   const m=sc.prop('moon',1.3,-2.9,{y:1.0});m.userData.name='full moon';for(let i=0;i<4;i++){const s=sc.prop('star',-.9+i*.55,-2.95,{y:1.05+(i%2)*.2,toyS:.6});s.userData.name='star';sc.tick((dt,t)=>s.scale.setScalar(.6+Math.sin(t*3+i)*.12));}
   sc.tick((dt,t)=>{f.scale.setScalar(.85*(1+Math.sin(t*14)*.05));});sc.kid(2,-.8,-1.8,{mode:'idle',ry:.3,say:'What a perfect night!'});})],
  rounds:{5:{scene:(sc)=>{const k=sc.kid(2,-.4,-2.4,{mode:'idle',say:'How do I feel?'});return {win(){sc.mode(k,'cheer');sc.say(k,'Happy describes me!');}};}}}},
/* 22 · hide and seek: Amara counts with her eyes covered, then everyone pops out */
e22:{steps:[story(sc=>{const tr=sc.prop('tree',-1.6,-2.7,{label:'behind',ci:3});sc.prop('bed',-.4,-2.7,{label:'under',ci:1});sc.prop('basket',.7,-2.6,{label:'in',ci:2});const c=sc.prop('cat',1.7,-2.6,{label:'on',ci:0,y:.6});
   const k=sc.kid(3,.2,-1.8,{mode:'cover',ry:Math.PI,say:'1, 2, 3…'});seq([[3500,()=>{sc.mode(k,'idle');P.tween(.5,q=>{k.userData.ry=Math.PI*(1-q);});sc.say(k,'Ready or not!',2000);}],[1500,()=>{S().alive(c,true);}]]);})],
  rounds:{2:{scene:(sc)=>{const b=sc.prop('box',-.4,-2.6,{});const ball=sc.prop('ball',.8,-2.6,{toyS:1.1});return {win(){sc.hop(ball,-.4,-2.6,.8,.7);sc.say(b,'The ball is in!',1500);}};}},
   4:{scene:(sc)=>{const b=sc.prop('box',-.6,-2.6,{});const c=sc.prop('cat',-.6,-2.6,{label:false,s:.7});return {win(){sc.hop(c,.8,-2.5,.9,.8);sc.say(c,'In… now out!',1800);}};}}}},
/* 23 · the wobbly tooth: it wiggles, falls out, and a coin appears under the pillow */
e23:{steps:[story(sc=>{const t=sc.prop('tooth',-1.2,-2.5,{label:'a tooth',ci:0,y:.3});sc.prop('apple',-.2,-2.6,{label:'an apple',ci:1,s:.85});sc.prop('bed',.9,-2.7,{label:'the pillow',ci:3});const c=sc.prop('coin',1.0,-2.3,{label:'a coin',ci:4,s:.6});c.visible=false;
   sc.tick((dt,tt)=>{if(!t.userData.fell)t.rotation.z=Math.sin(tt*10)*.15;});seq([[2500,()=>{t.userData.fell=true;sc.hop(t,.9,-2.6,.7,.8).then(()=>{t.visible=false;c.visible=true;S().alive(c,true);});}]]);})]},
/* 24 · a day with Grandpa: birds hop, the squirrel runs, a fish jumps */
e24:{steps:[story(sc=>{sc.prop('water',.9,-2.5);sc.prop('bird',-1.7,-2.6,{label:'birds',ci:0});const sq=sc.prop('squirrel',-.8,-2.6,{label:'squirrels',ci:1});sc.prop('cookie',-.1,-2.2,{label:'cookies',ci:3,s:.7});const f=sc.prop('fish',1.3,-2.5,{label:'fishing',ci:4});
   sc.tick((dt,t)=>{const k2=(t%2.2)/2.2;f.position.y=Math.max(0,Math.sin(k2*Math.PI))*.7;f.rotation.z=(k2-.5)*1.2;sq.position.x=-.8+Math.sin(t*1.5)*.3;});sc.kid(2,.3,-2.0,{mode:'idle',ry:.3,say:'Fishing or cookies?'});})],
  rounds:{4:{scene:(sc)=>{sc.prop('apple',-.4,-2.6,{label:'apple'});sc.prop('pear',.6,-2.6,{label:'pear'});const k=sc.kid(1,-1.6,-2.4,{mode:'think',ry:.4,say:'Apple or pear?'});return {win(){sc.mode(k,'cheer');sc.say(k,'Or means choose!');}};}}}},
/* 25 · riddles: the clock ticks, the piano plays */
e25:{steps:[story(sc=>{const c=sc.prop('clock',-.8,-2.6,{label:'clock',ci:0,s:1.1});const p=sc.prop('piano',.9,-2.6,{label:'piano',ci:1,s:1.1});sc.tick((dt,t)=>{c.rotation.z=Math.sin(t*6)*.06;});sc.fx('notes',{x:.9,z:-2.6,w:.6,h:1.2,y:.9});
   sc.kid(5,-1.5,-2.1,{mode:'think',ry:.5,say:'What am I?'});})],
  rounds:{2:{scene:(sc)=>{sc.prop('water',.3,-2.6);const f=sc.prop('fish',.3,-2.6,{label:false});return {win(){S().alive(f,true);sc.say(f,'I swim, but I can’t walk!');}};}},
   4:{scene:(sc)=>{sc.prop('chicken',-.5,-2.6,{label:'wings…'});sc.prop('penguin',.6,-2.6,{label:'…but no flying'});return {};}}}},
/* 26 · the lion king: he roars, helps the elephant lift a log, shares water with the zebra */
e26:{steps:[story(sc=>{const ln=sc.prop('lion',-1.5,-2.5,{label:'lion',ci:0,s:1.05});const mk=sc.prop('monkey',-.6,-2.7,{label:'monkey',ci:1});const el=sc.prop('elephant',.5,-2.6,{label:'elephant',ci:2});const lg=sc.prop('log',.5,-2.1,{});sc.prop('zebra',1.6,-2.6,{label:'zebra',ci:3});
   seq([[500,()=>{sc.say(ln,'ROAR!',1500);S().alive(ln,true);}],[2000,()=>{sc.say(mk,'Be kind!',1800);S().alive(mk);}],[2200,()=>{P.tween(.8,k=>{lg.position.y=k*.5;});S().alive(el);}]]);})],
  rounds:{3:{scene:(sc)=>{const k=sc.kid(0,-.9,-2.4,{mode:'idle',ry:.4});const b=sc.prop('ball',0,-2.3,{toyS:1.1});return {win(){sc.mode(k,'kick',900);P.tween(.9,t=>{b.position.set(t*1.8,Math.sin(t*Math.PI)*.9,-2.3-t*.4);});sc.say(k,'I kick the ball!',1800);},miss(){sc.say(b,'Balls can’t kick!',1500);}};}}}},
/* 27 · the dentist: the tooth sparkles, the brush scrubs in little circles */
e27:{steps:[story(sc=>{const t=sc.prop('tooth',-.6,-2.6,{label:'dentist',ci:0});sc.prop('chair',-1.7,-2.7,{label:'chair',ci:1});const b=sc.prop('toothbrush',.4,-2.4,{label:'brush',ci:2,s:.8});sc.prop('happy',1.6,-2.6,{label:'smile',ci:3});
   sc.tick((dt,tt)=>{b.position.set(-.1+Math.cos(tt*6)*.2,.4+Math.sin(tt*6)*.15,-2.4);});sc.fx('sparkle',{x:-.6,z:-2.6,w:.6,h:1.2});})],
  rounds:{3:{scene:(sc)=>{const c=sc.prop('cat',-.5,-2.6,{label:'my cat'});const b=sc.prop('bus',.8,-2.6,{label:'?'});return {win(){P.tween(1,k=>{b.position.x=.8+k*2;});S().alive(c,true);}};}}}},
/* 28 · making a sandwich: real layers stack up in order */
e28:{steps:[{scene:(sc,st)=>{const L=['bread','butter','cheese','lettuce','bread'];const items=[];const plate=sc.prop('plate',.9,-2.5,{label:false,s:.7});
   ['bread','butter','cheese'].forEach((n,i)=>{const p=sc.prop(n,-1.7+i*.75,-2.7,{label:n,ci:i,s:.7});});const sw=sc.prop('sandwich',1.9,-2.8,{label:'sandwich',ci:3,s:.8});
   seq(L.map((n,i)=>[1200,()=>{const p=sc.prop(n,.9,-2.5,{y:1.2});p.scale.setScalar(.8);P.tween(.5,k=>{p.position.y=1.2-k*(1.2-(.1+i*.07));});}]));}}],
  rounds:{1:{scene:(sc,st)=>({win(){const L=['bread','butter','cheese','bread'];L.forEach((n,i)=>L&&P.STAGE.later(()=>{const p=sc.prop(n,1.6,-2.9,{y:1});p.scale.setScalar(.6);P.tween(.4,k=>{p.position.y=1-k*(1-(.05+i*.05));});},i*250));}})}}}
};
})();
