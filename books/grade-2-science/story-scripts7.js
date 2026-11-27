/* Lessons 7-12 and 19: story pages for the NEW stories (new clay art, real action). Old beats stay for the old audio. */
(function(){
"use strict";
const P=window.PM;if(!P||!P.DIR||!P.DIR_NEW)return;
const page=P.DIR.page;
const all=ps=>Promise.all(ps);
const pr=(R,n,x,y,s)=>R.prop(n,x,y,s);
const pop=async(R,k,o,t)=>{const a=R.act(k,o);a.st.op=0;a.ap();await a.show(t||.5,'pop');return a;};
const fade=(a,to,sec)=>{if(!a)return Promise.resolve();const f=a.st.op;return a.R_T?0:new Promise(r=>{const t0=performance.now();const k=()=>{const e=Math.min(1,(performance.now()-t0)/(sec*1000));a.st.op=f+(to-f)*e;a.ap();e<1?requestAnimationFrame(k):r();};k();});};
const sw=async(a,k,sec,o)=>{if(a)await a.swap(k,sec||.6,o);};
/* beats are chained, so a beat returns after ~.65s and its longer motion keeps running (keeps the cues in time with the voice) */
const lite=f=>(R,S)=>{const p=Promise.resolve().then(()=>f(R,S));p.catch(e=>{if(e)console.error(e);});return Promise.race([p.catch(()=>0),R.wait(.7)]);};
const liteq=f=>(R,S)=>{const prev=S._q||Promise.resolve();const p=prev.then(()=>f(R,S));S._q=p.catch(()=>0);p.catch(e=>{if(e)console.error(e);});return Promise.race([p.catch(()=>0),R.wait(.7)]);};
const mkq=L=>Object.keys(L).map(k=>[k,liteq(L[k])]);
const mk=L=>Object.keys(L).map(k=>[k,lite(L[k])]);
const OLD=id=>(P.DIR_PAGES[id]&&P.DIR_PAGES[id][0]&&P.DIR_PAGES[id][0].old)||null;
const wt=async(S,k)=>{for(let i=0;i<50&&!S[k];i++)await new Promise(r=>setTimeout(r,100));return S[k];};
const hearts=(R,x,y,n)=>R.fx('heart',x,y,n||10,{w:.8,t:1.6});
const bob=(R,a,amp)=>{if(!a)return;let on=true,ph=0;R.actors.push({kill:()=>{on=false;},tick:dt=>{if(!on)return;ph+=dt*2;a.st.lift=Math.sin(ph)*(amp||.04);}});};
/* ---------- the new narration (switches on once its voice files exist) ---------- */
Object.assign(P.DIR_NEW,{
 c10:{story:"Mrs. Shaw hated pushing grocery carts, because the wobbly wheel always got stuck! So she moved her whole shopping trip into one giant backpack: a box of cookies, a pack of socks, a lollipop, a carton of milk, and a bottle of cooking oil. On the walk home, the bottom ripped! CRASH! The cookies, socks, and lollipop hit the ground with a thud, and kept their exact shapes because they are *solids*. Meanwhile, the milk and oil burst open and splashed everywhere, spreading out flat because they are *liquids*. Mrs. Shaw grabbed a bottle of floor wash and mopped up the mess. \"Solid or liquid?\" Definitely a liquid!"},
 c09:{story:"Barnaby the bright pink flamingo wanted to be the world's greatest hide-and-seek champion, and he failed everywhere! In the snowy Arctic, a white arctic fox vanished while Barnaby stood out like a neon sign. In the desert, a sandy camel blended into the dunes while Barnaby glowed pink. In the jungle, a striped tiger melted into tall grass, and a green caterpillar disappeared on a leaf. Barnaby finally flew home to a flock of pink flamingos, and vanished at last! In nature, *camouflage* keeps animals alive."},
 c19:{story:"A summer storm knocked out the power lines at Windy Point Lake, and everyone panicked, except Grandma! Out on the lake, ocean waves still launched Ella's surfboard, the breeze still lifted Ben's kite, and wind still rocketed Grandma's sailboat across the water. Up on the ridge, giant *wind turbines* spun smoothly in the gale, sending fresh electricity straight back to town! \"Fossil fuels run out,\" Grandma smiled, \"but wind and water are *renewable*. Nature never unplugs!\""},
 c20:{story:"Maya bit into her lunch and wondered how wheat turned into bread. Inside the creaking old mill, a colossal *water wheel* roared in the river, shaking the floor beneath her sneakers! \"Humans have borrowed power from wind and water for ages,\" the guide shouted over the rumble. \"Ancient Egyptians used wind to sail the Nile. Fourteen hundred years ago in Persia, inventors built the first *windmills* to grind corn. Later, water wheels powered saws and crushed grain!\" Outside, a giant modern *dam* turned that same river into electricity."},
 c21:{story:"YOINK! A cheeky squirrel snatched Rebecca's lucky red hat right off her head! Her friends became human walkie-talkies: \"Sprint *around* the swings!\" yelled Amy. \"Climb *up* the ladder and crawl *through* the tunnel!\" shouted Janet. \"Zoom *down* the slide!\" cheered Linda. \"Leap *over* the rocking horse!\" Rebecca skidded to a stop and peeked *under* the park bench. There sat her hat right *beside* the garbage can, while the squirrel traded it for a dropped french fry!"},
 c22:{story:"Max bragged that no ride at the Mega-Fair could ever make him dizzy. He survived the *round-and-round* merry-go-round. He laughed through the *back-and-forth* pirate ship. He cheered as bumper cars *zigzagged* across the floor, *bounced* in the inflatable castle, and *slid* down the mega-waterslide. Then Max stepped onto the *spinning* teacups. Three seconds later, Max wobbled off with a bright green face: \"Okay... the ground is moving now!\""},
 c23:{story:"THUD! A boulder rolled down the hill and jammed Mouse's front door shut, right while his pancakes were smoking inside! Mouse pushed until his ears turned purple, but the rock didn't budge. Bear ran up with a long branch and a small stone. He jammed the branch under the boulder, slid the stone underneath as a pivot, and leaned all his weight down. POP! Up flew the rock! \"That's a *lever*,\" grinned Bear. \"*Simple machines* give you super-strength!\" They rolled it away in a *wheelbarrow*, and saved breakfast."},
 c24:{story:"Matt built a top-secret shelf to keep his little sister out, guarded by *mechanisms*: two or more simple machines teaming up! First stood nail clippers: a *lever* snapping two tiny *wedges* shut. Next hung a toy crane with a *pulley* and *hook*, beside sharp scissors made of two levers and two *wedge* blades. Finally came Matt's ultimate guard: a robot dog with a spinning head and vibrating tail! His sister snuck in, pressed the button, and laughed so hard she forgot to touch anything."}
});

/* ===== 7: Nala, the polka-dot potato ===== */
const L7={
 born:async(R,S)=>{await R.bg('den');R.label('Newborn','#c2255c');S.n=await pop(R,'pa-lion7newborn',{x:-.4,y:.18,h:0.72,face:1,idle:'sleep'});R.fx('z',-.1,.8,5,{w:.3,t:1.8});},
 loaf:async(R,S)=>{R.label('Smaller than a loaf of bread','#e8590c');await sw(S.n,'pa-lion7bread',.7,{h:1.26,face:1});R.word('Tiny!',.5,1.8,'#e8590c',1.4);},
 eyes:async(R,S)=>{await sw(S.n,'pa-lion7newborn',.6,{h:0.78,face:1});R.fx('z',-.1,.9,5,{w:.3,t:1.8});R.word('Eyes shut',.2,1.7,'#868e96',1.2);},
 spots:async(R,S)=>{const r=R.ring(-.4,.4,.5,'#e8590c');await r.show();R.fx('sparkle',-.4,.4,12,{w:.5,t:1.2});await r.pulse(2,1);await r.hide();},
 teased:async(R,S)=>{await R.bg('savanna');R.label('The older cubs','#7048e8');S.n=await pop(R,'pa-lion7newborn',{x:-1.0,y:.18,h:.9,face:1,idle:'sleep'},.3);S.c=await pop(R,'pa-lion7cubs',{x:1.4,y:.18,h:1.20,face:-1});await S.c?.wag(.9,.18,6);},
 potato:async(R,S)=>{R.word('Polka-dot potato!',.9,2.0,'#e8590c',1.7);await S.c?.jump(.1);await S.c?.jump(.1);},
 later:async(R,S)=>{S.c?.hide(.5);R.label('Two weeks later','#1c7ed6');R.fx('sparkle',-.4,1.2,10,{w:.8,t:1.4});await R.wait(.5);},
 popped:async(R,S)=>{await sw(S.n,'pa-lion7eyes',.5,{h:1.26,face:1});R.word('Pop!',-.2,1.9,'#e8a900',1.6);R.fx('sparkle',-.4,.8,18,{w:.8,t:1.4});await S.n?.jump(.12);},
 months:async(R,S)=>{await R.bg('grass');R.label('Three months','#2b8a3e');if(S.n)S.n.idle='none';S.n=await pop(R,'pa-lion7pounce',{x:-1.0,y:.18,h:1.2,face:1},.4);S.m=await pop(R,'pa-lion7mom',{x:1.7,y:.18,h:1.38,face:-1});await S.m?.wag(.8,.03,4);},
 ambushed:async(R,S)=>{await S.n?.go(.5,.18,2.4);R.fx('dust',.3,.2,6,{w:.3,t:.8});},
 missile:async(R,S)=>{R.word('Pounce!',.7,2.0,'#e8590c',1.5);await all([S.n?.go(1.45,.18,.5),S.n?.jump(.2)]);R.fx('dust',1.2,.2,12,{w:.6,t:1});await S.m?.jump(.12);},
 year:async(R,S)=>{await R.bg('savanna');R.label('One year old','#7048e8');S.n=await pop(R,'pa-lion7young',{x:-.4,y:.18,h:1.62,face:1},.5);R.fx('sparkle',-.2,1.1,10,{w:.9,t:1.3});},
 vanished:async(R,S)=>{const r=R.ring(-.3,.8,.5,'#e8590c');await r.show();R.fx('fluff',-.3,.8,14,{w:.6,t:1.4});await r.pulse(2,1.1);await r.hide();R.word('No spots!',.7,1.9,'#2b8a3e',1.4);},
 today:async(R,S)=>{await R.bg('sunset');R.label('Today','#c2255c');S.n=await pop(R,'pa-lion7roar',{x:-.3,y:.18,h:1.74,face:1},.6);R.fx('sparkle',-.2,1.3,14,{w:1.2,t:1.4});},
 massive:async(R,S)=>{await S.n?.grow(1.1,1.1,.7);},
 roaring:async(R,S)=>{R.word('ROAR!',.9,2.0,'#e03131',2.0);R.fx('note',-.2,1.4,8,{w:.8,t:1.4});await S.n?.jump(.1);await S.n?.shiver(.7);},
 pride:async(R,S)=>{S.m=await pop(R,'pa-lion7mom',{x:1.8,y:.18,h:1.44,face:-1});S.c=await pop(R,'pa-lion7cubs',{x:-2.0,y:.18,h:1.08,face:1});R.fx('heart',.8,1.7,8,{w:2.4,t:1.6});},
 nobody:async(R,S)=>{await all([S.c?.shiver(.9),R.T(.9,e=>{if(S.c)S.c.st.x=-2.0-e*.4;S.c?.ap();})]);S.c?.hide(.4);},
 change:async(R,S)=>{R.label('Animals change as they grow','#2b8a3e');R.fx('sparkle',-.2,1.0,14,{w:2,t:1.6});await R.wait(.4);},
 do:async(R,S)=>{const b=R.act('pa-boywalk',{x:-2.7,y:.18,h:1.20,face:1});await b.show(.2);await b.walk(-1.6,.18,2);R.fx('heart',-1.6,1.3,8,{w:.6,t:1.4});await b.jump(.2);}
};
const B7=mk(L7);
page('c07',0,{old:OLD('c07'),neu:B7});

/* ===== 8: The Monster in Jar #4 ===== */
const L8={
 found:async(R,S)=>{await R.bg('classroom');R.label('Our class','#1c7ed6');S.k=await pop(R,'pa-kids8',{x:-1.7,y:.18,h:1.62,face:1});await S.k?.wag(.8,.03,3);},
 egg:async(R,S)=>{R.label('A dot-sized egg','#e8590c');const r=R.ring(.5,1.0,.3,'#e8590c');await r.show();R.fx('sparkle',.5,1.0,10,{w:.4,t:1.2});await r.pulse(2,1);await r.hide();},
 jar:async(R,S)=>{R.label('Jar number 4','#7048e8');S.j=await pop(R,'pa-jar8egg',{x:.4,y:.18,h:1.86,face:1});R.fx('sparkle',.4,1.2,10,{w:.5,t:1.2});await S.k?.jump(.1);},
 days:async(R,S)=>{R.label('Days later','#1c7ed6');R.fx('sparkle',.4,1.5,8,{w:.8,t:1.4});await R.wait(.7);},
 hatched:async(R,S)=>{await sw(S.j,'pa-jar8cat',.6,{h:1.86,face:1});R.word('Hatched!',.4,2.1,'#e8590c',1.5);await S.j?.jump(.08);},
 devoured:async(R,S)=>{R.word('Munch! Munch!',.5,2.1,'#2b8a3e',1.5);for(let i=0;i<3;i++){R.fx('leaf',.4,1.2,4,{w:.3,t:1});await S.j?.shiver(.5);}},
 hung:async(R,S)=>{await sw(S.j,'pa-chrys8',.7,{h:1.80,face:1});if(S.j)S.j.idle='sway';R.label('Hanging upside down','#2b8a3e');},
 zipped:async(R,S)=>{R.word('Zip!',.5,2.1,'#7048e8',1.4);R.fx('sparkle',.4,1.0,16,{w:.4,t:1.2});await S.j?.shiver(.6);},
 jewel:async(R,S)=>{R.label('A jade-green jewel box','#2b8a3e');R.fx('sparkle',.4,.9,18,{w:.5,t:1.4});await R.wait(.5);},
 gold:async(R,S)=>{const r=R.ring(.4,.9,.3,'#e8a900');await r.show();await r.pulse(2,1);await r.hide();},
 weeks:async(R,S)=>{R.label('Two whole weeks','#868e96');R.fx('z',.4,1.5,5,{w:.3,t:2});await R.wait(.8);},
 nothing:async(R,S)=>{R.word('Nothing\u2026',.5,2.1,'#868e96',1.3);await R.wait(.4);},
 whispered:async(R,S)=>{S.l=await pop(R,'pa-leo8whisper',{x:-1.0,y:.18,h:1.80,face:1});R.word('Is it broken?',-.6,2.1,'#1c7ed6',1.2);await S.l?.wag(.8,.03,3);},
 crack:async(R,S)=>{await sw(S.j,'pa-chrys8crack',.4,{h:1.80,face:1});R.word('CRACK!',.5,2.1,'#e03131',1.9);R.fx('sparkle',.4,1.0,22,{w:.7,t:1.2});if(S.j)S.j.idle='none';await S.j?.shiver(.5);},
 split:async(R,S)=>{R.fx('chip',.4,1.0,10,{w:.4,t:1.1});await S.j?.jump(.06);},
 climbed:async(R,S)=>{R.label('Out climbed\u2026','#e8590c');await R.wait(.8);},
 dazzling:async(R,S)=>{await sw(S.j,'pa-mon8open',.8,{h:1.45,face:1});if(S.j)S.j.idle='flutter';R.fx('sparkle',.4,1.2,26,{w:1,t:1.6});await all([S.k?.jump(.15),S.l?.jump(.15)]);},
 soar:async(R,S)=>{await R.bg('garden8');S.k?.hide(.4);S.l?.hide(.4);S.j=await pop(R,'pa-mon8fly',{x:-1.6,y:.7,h:.85,face:1},.4);S.j.idle='flutter';await S.j.go(1.9,1.6,3.2);},
 garden:async(R,S)=>{R.label('Into the garden','#2b8a3e');R.fx('leaf',0,1.8,8,{w:3,t:2});await R.wait(.5);},
 transformation:async(R,S)=>{R.label('A wild transformation','#7048e8');const a=await pop(R,'pa-cat9leaf',{x:-1.6,y:.6,h:0.48,face:1},.3);const b=await pop(R,'pa-chrys8',{x:-.7,y:.5,h:0.84},.3);const c=await pop(R,'pa-mon8open',{x:.3,y:.5,h:0.78},.3);R.fx('sparkle',-.7,.9,10,{w:2,t:1.2});S.row=[a,b,c];},
 metamorphosis:async(R,S)=>{R.word('Metamorphosis!',0,2.0,'#2b8a3e',1.9);const r=R.ring(-.7,.9,1.2,'#69db7c');await r.show();R.fx('sparkle',-.7,.9,24,{w:2.4,t:1.8});await r.pulse(2,1);await r.hide();}
};
const B8=mk(L8);
page('c08',0,{old:OLD('c08'),neu:B8});

/* ===== 9: Barnaby, the worst hide-and-seek player ===== */
const L9={
 barnaby:async(R,S)=>{await R.bg('lagoon');R.label('Barnaby','#e64980');S.b=await pop(R,'pa-flam9proud',{x:-.9,y:.18,h:2.00,face:1});R.fx('sparkle',-.9,1.8,12,{w:.7,t:1.4});},
 champion:async(R,S)=>{R.word('Champion!',.5,2.0,'#e64980',1.7);await S.b?.jump(.15);},
 failed:async(R,S)=>{await sw(S.b,'pa-flam9sad',.6,{h:1.92,face:1});R.word('Oops!',.6,2.0,'#e03131',1.5);await S.b?.shiver(.8);},
 arctic:async(R,S)=>{await R.bg('arctic');R.label('The snowy Arctic','#74c0fc');R.snow(5,40);S.b=await pop(R,'pa-flam9sad',{x:-1.7,y:.18,h:1.9,face:1});S.f=await pop(R,'pa-fox9',{x:.9,y:.18,h:1.08,face:-1});},
 vanished:async(R,S)=>{R.word('Where did it go?',.7,1.9,'#1c7ed6',1.3);await fade(S.f,.1,1.4);},
 neon:async(R,S)=>{R.word('Neon sign!',-.8,2.1,'#e64980',1.5);R.fx('sparkle',-1.7,1.2,18,{w:.8,t:1.5});await S.b?.jump(.1);},
 desert:async(R,S)=>{await R.bg('dunes');R.label('The desert','#e8a900');S.b=await pop(R,'pa-flam9sad',{x:-1.7,y:.18,h:1.9,face:1});S.c=await pop(R,'pa-camel9',{x:.9,y:.18,h:1.62,face:-1});},
 blended:async(R,S)=>{await fade(S.c,.1,1.4);R.fx('dust',.9,.4,10,{w:1,t:1.4});},
 glowed:async(R,S)=>{const r=R.ring(-1.7,.9,.7,'#e64980');await r.show();R.fx('sparkle',-1.7,.9,16,{w:.7,t:1.4});await r.pulse(3,1.1);await r.hide();},
 jungle:async(R,S)=>{await R.bg('jungle9');R.label('The jungle','#2b8a3e');S.b=await pop(R,'pa-flam9sad',{x:-1.7,y:.18,h:1.9,face:1});S.t=await pop(R,'pa-tiger9',{x:.9,y:.18,h:1.20,face:-1});},
 melted:async(R,S)=>{await fade(S.t,.1,1.5);R.fx('leaf',.9,.8,8,{w:.8,t:1.4});},
 disappeared:async(R,S)=>{S.l=await pop(R,'pa-cat9leaf',{x:1.9,y:.1,h:0.48,face:-1},.3);await R.wait(.5);await fade(S.l,.1,1.2);},
 flew:async(R,S)=>{await R.bg('lagoon');R.label('Home','#e64980');S.b=await pop(R,'pa-flam9fly',{x:-2.4,y:1.2,h:1.5,face:1},.3);await S.b.go(.2,.9,2.6);},
 flock:async(R,S)=>{S.k=await pop(R,'pa-flock9',{x:1.4,y:.18,h:1.68,face:-1});await sw(S.b,'pa-flam9proud',.5,{h:2.00,face:1});await S.b?.go(.7,.18,.9);},
 last:async(R,S)=>{R.word('Vanished!',-.2,2.1,'#e64980',1.7);await S.b?.go(1.2,.18,.8);await fade(S.b,0,.7);R.fx('sparkle',1.2,1.0,16,{w:1,t:1.4});},
 camouflage:async(R,S)=>{R.label('Camouflage keeps animals alive','#2b8a3e');R.word('Camouflage!',-.4,2.0,'#2b8a3e',1.8);const r=R.ring(1.3,.9,1.2,'#69db7c');await r.show();await r.pulse(2,1);await r.hide();}
};
const B9=mk(L9);
page('c09',0,{old:null,neu:B9});

/* ===== 10: Mrs. Shaw's terrible backpack ===== */
const L10={
 hated:async(R,S)=>{await R.bg('store');R.label('Mrs. Shaw','#7048e8');S.s=R.act('pa-shawstruggle10',{x:-2.4,y:.18,h:1.9,face:1});S.s.st.op=0;S.s.ap();await S.s.show(.2);
  await S.s.go(-1.2,.18,.7,{hops:2});for(let i=0;i<2;i++){await S.s.go(-1.0,.18,.15);await S.s.go(-1.25,.18,.15);}R.word('Stuck!',-.7,2.3,'#e03131',1.6);R.fx('dust',-.6,.3,10,{w:.4,t:.8});S.s.shiver(.6);},
 moved:async(R,S)=>{await sw(S.s,'pa-shaw10bag',.3,{h:1.92,face:1});R.fx('crumb',-1.2,1.1,8,{w:.5,t:1});S.cw=await pop(R,'pa-cart10',{x:1.7,y:.18,h:1.2,face:-1},.3);},
 giant:async(R,S)=>{R.label('One giant backpack','#1c7ed6');S.cw?.hide(.3);await S.s.grow(1.06,1.06,.4);},
 cookies:async(R,S)=>{R.label('Cookies','#8b5a2b');const p=pr(R,'cookie',1.4,1.9,.5);if(p){await R.toss(p,-1.2,1.1,.8,.6);R.shrink(p,.3);await S.s.grow(1.04,1.04,.25);}},
 socks:async(R,S)=>{R.label('Socks','#e8590c');const p=pr(R,'socks',1.4,1.9,.5);if(p){await R.toss(p,-1.2,1.1,.8,.6);R.shrink(p,.3);await S.s.grow(1.04,1.04,.25);}},
 lollipop:async(R,S)=>{R.label('Lollipop','#c2255c');const p=pr(R,'lollipop',1.4,1.9,.5);if(p){await R.toss(p,-1.2,1.1,.8,.6);R.shrink(p,.3);await S.s.grow(1.04,1.04,.25);}},
 milk:async(R,S)=>{R.label('Milk','#1c7ed6');const p=pr(R,'milk',1.4,1.9,.5);if(p){await R.toss(p,-1.2,1.1,.8,.6);R.shrink(p,.3);await S.s.grow(1.04,1.04,.25);}},
 oil:async(R,S)=>{R.label('Cooking oil','#e8a900');const p=pr(R,'oil',1.4,1.9,.5)||pr(R,'bottle',1.4,1.9,.5);if(p){await R.toss(p,-1.2,1.1,.8,.6);R.shrink(p,.3);}R.fx('drop',-1.2,1.2,8,{w:.3,t:1,vy:-.4});await S.s.shiver(.5);},
 walk:async(R,S)=>{await R.bg('street');R.label('The walk home','#2b8a3e');S.s=await pop(R,'pa-shaw10bag',{x:-2.4,y:.18,h:1.92,face:1},.3);await S.s.go(-.6,.18,2.0,{hops:5,lin:true});},
 ripped:async(R,S)=>{await sw(S.s,'pa-shaw10shock',.25,{h:1.92,face:1});R.word('RIP!',-.2,2.3,'#e03131',1.7);R.fx('crumb',-.6,1.2,16,{w:.4,t:1});S.t=await pop(R,'pa-bag10torn',{x:-1.6,y:.18,h:.78,face:1},.3);await S.s.shiver(.5);},
 crash:async(R,S)=>{R.word('CRASH!',.4,2.4,'#e03131',2.0);S.sol=[];
  for(const [n,x] of [['cookie',.2],['socks',.9],['lollipop',1.6]]){const p=pr(R,n,-.6,1.3,.5);if(p){S.sol.push([p,x]);R.toss(p,x,.3,.6,.5);}await R.wait(.15);}
  await R.wait(.5);for(const [p,x] of S.sol){R.fx('dust',x,.25,10,{w:.3,t:.8});R.fx('chip',x,.35,6,{w:.2,t:.6});}},
 thud:async(R,S)=>{R.word('THUD!',.9,1.7,'#8b5a2b',1.5);for(const [p,x] of S.sol||[]){R.toss(p,x+.15,.3,.35,.35);await R.wait(.15);}await R.wait(.4);for(const [p,x] of S.sol||[]){R.toss(p,x+.15,.3,.25,.12);}await R.wait(.3);},
 solids:async(R,S)=>{R.label('Solids keep their shape','#2b8a3e');const r=R.ring(.9,.5,1.0,'#2b8a3e');await r.show();R.fx('sparkle',.9,.5,12,{w:1.2,t:1.2});await r.pulse(2,1);await r.hide();},
 meanwhile:async(R,S)=>{R.label('Meanwhile\u2026','#1c7ed6');await R.wait(.4);},
 burst:async(R,S)=>{for(const [p] of S.sol||[])R.drop(p);S.m=R.act('pa-milk10',{x:.2,y:1.6,h:.9,face:1});S.o=R.act('pa-oil10',{x:1.4,y:1.6,h:.72,face:1});for(const a of [S.m,S.o]){a.st.op=0;a.ap();a.show(.1);}
  await all([S.m.go(.2,.18,.5,{arc:.2}),S.o.go(1.4,.18,.5,{arc:.2})]);R.word('Splash!',.8,1.9,'#1c7ed6',1.7);R.fx('splash',.2,.3,30,{w:.9,t:1.3});R.fx('splash',1.4,.3,30,{w:.9,t:1.3});},
 splashed:async(R,S)=>{await all([S.m.grow(1.7,.8,1.2),S.o.grow(1.7,.8,1.2)]);},
 spreading:async(R,S)=>{R.word('Spreading out flat!',.8,2.1,'#e8590c',1.4);R.fx('drop',.2,.5,12,{w:1.2,t:1.2,vy:-.2});await R.wait(.4);},
 liquids:async(R,S)=>{R.label('Liquids flow','#1c7ed6');R.fx('drop',.8,.5,14,{w:1.6,t:1.2,vy:-.2});await R.wait(.4);},
 grabbed:async(R,S)=>{S.t?.hide(.2);await S.s.go(-1.1,.18,.4);S.fw=await pop(R,'pa-floorwash10',{x:-1.9,y:.18,h:1.0,face:1},.3);R.fx('bubble',-1.9,1.0,10,{w:.4,t:1.4,vy:.6});await sw(S.s,'pa-shawmop10',.3,{h:1.7,face:1});},
 mopped:async(R,S)=>{R.label('Floor wash','#2b8a3e');R.fx('bubble',-1.3,1.3,16,{w:.6,t:2.2,vy:.6});await S.s.go(-.2,.18,.6,{hops:2});for(let i=0;i<2;i++){await S.s.go(.4,.18,.4,{lin:true});await S.s.go(-.1,.18,.4,{lin:true});}
  await all([S.m.scaleTo(.2,1.2),S.o.scaleTo(.2,1.2)]);},
 solid:async(R,S)=>{S.m?.hide(.3);S.o?.hide(.3);R.fx('sparkle',.8,.4,22,{w:1.6,t:1.5});R.word('Solid or liquid?',-.2,2.3,'#7048e8',1.6);await S.s.wag(.8,.04,3);}
};
const B10=mkq(L10);
page('c10',0,{old:OLD('c10'),neu:B10});

/* ===== 11: Mr. Soup's ruined trick ===== */
const L11={
 watch:async(R,S)=>{await R.bg('stage');R.label('Mr. Soup','#7048e8');S.m=await pop(R,'pa-soup11brag',{x:-1.1,y:.18,h:2.00,face:1});R.word('Watch me!',-.5,2.2,'#7048e8',1.5);},
 sugar:async(R,S)=>{S.g=await pop(R,'pa-glass11sugar',{x:.7,y:.18,h:1.20,face:-1});R.label('Sugar','#e8590c');R.fx('crumb',.7,1.2,12,{w:.2,t:1.4,vy:-1});},
 boasted:async(R,S)=>{await S.m?.wag(.8,.18,4);R.fx('sparkle',-1.1,1.9,10,{w:.8,t:1.3});},
 stirring:async(R,S)=>{for(let i=0;i<3;i++){R.fx('sparkle',.7,.6,6,{w:.3,t:1});await S.g?.wag(.5,.18,6);}},
 water:async(R,S)=>{R.label('Water','#1c7ed6');const r=R.ring(.7,.5,.5,'#1c7ed6');await r.show();await r.pulse(2,1);await r.hide();},
 magic:async(R,S)=>{S.i=await pop(R,'pa-mia11',{x:1.95,y:.18,h:1.80,face:-1});R.word('Not magic!',1.6,2.1,'#2b8a3e',1.5);},
 row:async(R,S)=>{await S.i?.jump(.12);R.label('Mia, front row','#2b8a3e');},
 dissolved:async(R,S)=>{R.label('Dissolved','#1c7ed6');R.word('It dissolved!',1.5,2.1,'#1c7ed6',1.6);R.fx('sparkle',.7,.6,22,{w:.5,t:1.5});await S.i?.jump(.12);},
 red:async(R,S)=>{await S.m?.go(-.3,.18,.7,{hops:3});await sw(S.m,'pa-soup11trip',.3,{h:1.92,face:1});await S.m?.shiver(.5);},
 tripped:async(R,S)=>{R.word('Whoops!',-.3,2.2,'#e03131',1.7);await all([S.m?.go(.1,.18,.6,{arc:.3}),R.T(.7,e=>{if(S.m)S.m.st.rz=Math.sin(e*Math.PI)*.35;S.m?.ap();})]);if(S.m)S.m.st.rz=0;},
 knocked:async(R,S)=>{S.g?.hide(.2);S.p=await pop(R,'pa-puddle11',{x:.7,y:.18,h:0.48,face:1},.3);R.fx('splash',.7,.3,18,{w:.8,t:1.3});await S.m?.shiver(.5);},
 panicking:async(R,S)=>{R.word('Help!',-.4,2.2,'#e03131',1.5);await S.m?.shiver(.9);},
 scooping:async(R,S)=>{R.label('A metal spoon','#868e96');S.sp=pr(R,'spoon',-.2,1.8,.55);if(S.sp){await R.toss(S.sp,.6,.45,.9,.4);await R.toss(S.sp,1.4,1.0,.7,.5);}},
 nothing:async(R,S)=>{R.word('Nothing!',.8,1.9,'#868e96',1.5);await S.m?.shiver(.6);},
 sponge:async(R,S)=>{R.label('A fat sponge','#e8a900');S.s=await pop(R,'pa-sponge11',{x:1.9,y:1.7,h:0.66,face:-1},.2);if(S.s)S.s.st.y=1.7;S.s?.ap();await S.s?.go(1.35,.18,.6);},
 towel:async(R,S)=>{R.label('A paper towel','#1c7ed6');S.t=pr(R,'paper',-.3,1.9,.6);if(S.t)await R.toss(S.t,.2,.2,.9,.5);},
 slurp:async(R,S)=>{R.word('SLURP!',.7,1.9,'#1c7ed6',2.0);R.fx('drop',.7,.4,14,{w:.8,t:1.3,vy:-1});await all([S.p?.shiver(.8),S.s?.grow(1.25,1.25,.8)]);S.p?.hide(.8);},
 vanished:async(R,S)=>{const r=R.ring(.7,.4,.8,'#2b8a3e');await r.show();R.fx('sparkle',.7,.4,16,{w:.9,t:1.3});await r.pulse(2,1);await r.hide();},
 bowed:async(R,S)=>{await sw(S.m,'pa-soup11bow',.7,{h:2.00,face:1});R.fx('heart',-1.1,1.9,10,{w:1.4,t:1.8});await all([S.m?.jump(.1),S.i?.jump(.15)]);},
 absorb:async(R,S)=>{R.label('Some solids absorb liquids','#2b8a3e');R.word('Absorb!',.4,2.1,'#2b8a3e',1.8);R.fx('sparkle',.8,.5,14,{w:1.4,t:1.4});await R.wait(.4);}
};
const B11=mkq(L11);
page('c11',0,{old:OLD('c11'),neu:B11});

/* ===== 12: Officer Donut chases Mr. Water ===== */
const L12={
 job:async(R,S)=>{await R.bg('pondice');R.label('Officer Donut','#1c7ed6');S.d=await pop(R,'pa-don12run',{x:-2.3,y:.18,h:1.92,face:1});await S.d?.go(-1.4,.18,.9,{hops:3,lin:true});},
 arrest:async(R,S)=>{R.word('Arrest Mr. Water!',-.6,2.1,'#1c7ed6',1.5);await S.d?.jump(.12);},
 winter:async(R,S)=>{R.label('Winter','#74c0fc');R.snow(5,40);S.w=await pop(R,'pa-water12ice',{x:1.1,y:.18,h:1.14,face:-1});},
 lunged:async(R,S)=>{await S.d?.go(-.2,.18,.6,{hops:3,lin:true});await sw(S.d,'pa-don12slip',.2,{h:1.44,face:1});await S.d?.go(.7,.18,.6,{lin:true,squash:.1});R.fx('sparkle',.3,.2,12,{w:.6,t:1});},
 slipped:async(R,S)=>{R.word('Whoa!',-.2,2.0,'#e03131',1.8);R.fx('sparkle',-.2,.8,12,{w:.6,t:1.2});await S.d?.jump(.25);await S.d?.jump(.1);},
 disguised:async(R,S)=>{await S.w?.wag(1,.04,6);R.fx('sparkle',1.1,1.0,8,{w:.5,t:1.2});},
 solid:async(R,S)=>{R.label('Solid: hard, cold ice','#74c0fc');const r=R.ring(1.1,.5,.6,'#74c0fc');await r.show();await r.pulse(2,1);await r.hide();},
 spring:async(R,S)=>{await R.bg('spring12');R.label('Spring','#2b8a3e');S.d=await pop(R,'pa-don12grab',{x:-1.0,y:.18,h:1.92,face:1},.4);S.w=await pop(R,'pa-water12ice',{x:1.1,y:.18,h:1.14,face:-1},.3);},
 grabbed:async(R,S)=>{await S.d?.go(.4,.18,.6,{hops:2});S.w?.shiver(.5);},
 melted:async(R,S)=>{await sw(S.w,'pa-water12splash',.6,{h:1.08,face:-1});R.fx('splash',1.1,.4,14,{w:.5,t:1.2});},
 liquid:async(R,S)=>{R.label('Liquid: water','#1c7ed6');R.fx('drop',1.1,.8,10,{w:.5,t:1.2,vy:-.4});await R.wait(.3);},
 splashed:async(R,S)=>{R.word('Splash!',1.2,1.8,'#1c7ed6',1.7);await all([S.w?.go(2.0,.18,.5),S.d?.shiver(.6)]);R.fx('splash',2.0,.3,18,{w:.7,t:1.3});},
 scorching:async(R,S)=>{await R.bg('hot12');R.label('Summer','#e8590c');S.d=await pop(R,'pa-don12run',{x:-1.6,y:.18,h:1.92,face:1},.3);S.w=await pop(R,'pa-water12splash',{x:1.2,y:.18,h:1.08,face:-1},.3);R.fx('sparkle',0,2.0,8,{w:2.4,t:1.4});},
 cornered:async(R,S)=>{await S.d?.go(.2,.18,1.1,{hops:4,lin:true});await S.w?.shiver(.6);},
 poof:async(R,S)=>{R.word('POOF!',.5,2.1,'#e03131',2.0);R.fx('dust',1.2,.5,18,{w:.6,t:1.3});await sw(S.w,'pa-water12vapor',.4,{h:1.32,face:-1});},
 evaporated:async(R,S)=>{R.label('Gas: invisible water vapor','#868e96');await all([S.w?.go(1.2,1.7,2.2),R.T(2.2,e=>{if(S.w)S.w.st.op=1-e*.7;S.w?.ap();})]);},
 gas:async(R,S)=>{const r=R.ring(1.2,1.8,.5,'#868e96');await r.show();await r.pulse(2,1);await r.hide();},
 clouds:async(R,S)=>{R.fx('fluff',1.2,2.0,12,{w:1.2,t:1.6});await fade(S.w,0,1);S.w?.hide(.1);},
 returned:async(R,S)=>{await R.bg('pondice');R.label('Winter again','#74c0fc');R.snow(5,40);S.d=await pop(R,'pa-don12ice',{x:-.4,y:.18,h:1.92,face:1},.4);S.w=await pop(R,'pa-water12drop',{x:1.5,y:.18,h:1.02,face:-1});},
 froze:async(R,S)=>{R.fx('sparkle',-.4,.3,16,{w:.7,t:1.3});await all([S.d?.shiver(1),S.w?.wag(.8,.18,5)]);},
 pond:async(R,S)=>{R.word('Brrr!',-.3,2.1,'#1c7ed6',1.8);await S.w?.jump(.15);R.fx('heart',1.5,1.4,6,{w:.6,t:1.4});await S.d?.shiver(.8);}
};
const B12=mkq(L12);
page('c12',0,{old:OLD('c12'),neu:B12});

/* ===== 19: The town that lost its plug ===== */
const L19={
 storm:async(R,S)=>{await R.bg('hill19');R.label('A summer storm','#495057');S.s=await pop(R,'pa-storm19',{x:-.4,y:1.4,h:1.08,face:1},.4);R.fx('drop',-.4,1.7,24,{w:1.8,t:3,vy:-1.6});await S.s?.shiver(.8);},
 knocked:async(R,S)=>{R.word('Zzzt!',.8,2.0,'#e03131',1.7);S.t=await pop(R,'pa-town19lit',{x:1.5,y:.18,h:1.08,face:1},.3);await R.wait(.4);await sw(S.t,'pa-town19dark',.3,{h:1.02,face:1});R.fx('sparkle',2.1,.5,14,{w:.5,t:1.2});},
 panicked:async(R,S)=>{R.word('Panic!',1.2,1.9,'#e03131',1.5);await S.t?.shiver(.9);},
 except:async(R,S)=>{S.s?.hide(.4);R.label('Except Grandma!','#2b8a3e');await R.bg('lake19');S.t?.hide(.2);S.g=await pop(R,'pa-gran19',{x:-1.2,y:.35,h:1.4,face:1});bob(R,S.g,.04);R.fx('heart',-1.8,1.9,6,{w:.5,t:1.4});},
 waves:async(R,S)=>{R.label('Waves','#1c7ed6');S.e=await pop(R,'pa-ella19',{x:-.3,y:.4,h:1.50,face:1});bob(R,S.e,.05);R.fx('splash',-.7,.5,12,{w:.6,t:1.2});await S.e?.go(.8,.4,2.4);},
 breeze:async(R,S)=>{R.label('Breeze','#74c0fc');S.b=await pop(R,'pa-ben19',{x:1.8,y:.1,h:1.80,face:-1});R.fx('leaf',1.8,1.6,8,{w:1.2,t:2,vx:-.5});await S.b?.wag(.9,.03,3);},
 rocketed:async(R,S)=>{R.word('Whoosh!',.2,2.1,'#1c7ed6',1.7);R.fx('leaf',-1,1.2,14,{w:1.2,t:1.6,vx:1.4});await S.g?.go(1.9,.35,1.3,{wob:.05,lin:true});R.fx('splash',.8,.4,14,{w:.8,t:1.2});},
 ridge:async(R,S)=>{await R.bg('hill19');R.label('Up on the ridge','#2b8a3e');for(const a of [S.g,S.e,S.b])if(a)a.hide(.3);S.r=await pop(R,'pa-ridge19',{x:0,y:.18,h:2.00,face:1});if(S.r)S.r.idle='sway';R.fx('leaf',-1,1.4,8,{w:3,t:2,vx:.8});},
 turbines:async(R,S)=>{R.label('Giant wind turbines','#2b8a3e');R.fx('leaf',-1.6,1.4,12,{w:3.2,t:2.4,vx:.9});await S.r?.wag(1,.01,4);},
 electricity:async(R,S)=>{R.word('Electricity!',0,2.1,'#e8a900',1.7);for(let i=0;i<5;i++){R.fx('sparkle',-1+i*.5,.5,5,{w:.2,t:.9});await R.wait(.25);}},
 town:async(R,S)=>{if(S.r)S.r.st.x=-1.2;S.r?.ap();S.t=await pop(R,'pa-town19lit',{x:1.7,y:.18,h:1.20,face:1});R.fx('sparkle',1.7,.6,16,{w:.9,t:1.4});await S.t?.jump(.08);},
 fossil:async(R,S)=>{R.label('Fossil fuels run out','#868e96');R.fx('dust',0,.6,10,{w:2,t:1.5});await R.wait(.4);},
 renewable:async(R,S)=>{if(S.g)S.g.st.x=0;if(S.g)S.g.st.y=.35;R.label('Renewable','#2b8a3e');await pop(R,'pa-gran19',{x:-.1,y:.35,h:1.44,face:1},.3);R.word('Renewable!',.2,2.2,'#2b8a3e',1.8);R.fx('sparkle',0,1.0,20,{w:2,t:1.6});},
 unplugs:async(R,S)=>{R.fx('heart',0,1.6,10,{w:2.6,t:1.8});const r=R.ring(1.7,.6,.9,'#e8a900');await r.show();await r.pulse(2,1);await r.hide();}
};
const B19=mkq(L19);
page('c19',0,{old:null,neu:B19});

/* ===== 20: Maya at the old mill ===== */
const spin=(R,a,sp)=>{if(!a)return;let on=true;R.actors.push({kill:()=>{on=false;},tick:dt=>{if(!on)return;a.st.rz=(a.st.rz||0)+dt*sp;a.ap();}});};
const L20={
 maya:async(R,S)=>{await R.bg('mill20in');S.m=await pop(R,'pa-maya20',{x:-1.6,y:.18,h:2.0,face:1},.3);await S.m.chew(3,1.0);S.m.faceTo(1);S.br=await pop(R,'pa-bread20',{x:-.7,y:1.7,h:.6,face:1},.3);R.fx('sparkle',-.7,1.9,8,{w:.4,t:1});},
 bread:async(R,S)=>{R.word('Bread?',-.5,2.5,'#e8590c',1.5);await S.br.go(-.2,1.9,.5,{arc:.2});S.br.wag?.(.6,.1,6);},
 colossal:async(R,S)=>{S.br?.hide(.3);R.label('A colossal water wheel','#1c7ed6');S.w=await pop(R,'pa-wheel20',{x:1.4,y:.18,h:1.7,face:-1},.4);spin(R,S.w,2.2);R.fx('splash',1.1,1.4,14,{w:.6,t:1.5});await R.wait(.5);},
 roared:async(R,S)=>{R.word('ROAR!',.9,2.5,'#1c7ed6',1.8);R.fx('splash',1.5,.5,26,{w:1,t:1.6});await sw(S.m,'pa-mayaamaze20',.2,{h:2.0,face:1});await all([S.m.shiver(1.2),S.w.wag(1.2,.05,9)]);},
 guide:async(R,S)=>{S.g=R.act('pa-guide20',{x:-2.4,y:.18,h:2.0,face:1});S.g.st.op=0;S.g.ap();await S.g.show(.2);await S.g.go(-.4,.18,1.0,{hops:3});R.fx('note',-.4,2.3,5,{w:.5,t:1.2});await sw(S.m,'pa-maya20',.3,{h:2.0,face:1});},
 borrowed:async(R,S)=>{R.label('Power from wind and water','#2b8a3e');R.fx('leaf',.4,1.8,12,{w:1.4,t:1.6,vx:.9});R.fx('splash',1.3,1.2,14,{w:.8,t:1.2});await S.g?.jump(.15);},
 egyptians:async(R,S)=>{S.w?.hide(.2);await R.bg('egypt20');R.label('Ancient Egypt: wind sails the Nile','#e8590c');S.g=await pop(R,'pa-guidepoint20',{x:1.7,y:.2,h:1.8,face:-1},.3);S.gu=R.act('pa-gust20',{x:-2.6,y:1.6,h:.7,face:1,idle:'sway'});S.gu.st.op=0;S.gu.ap();await S.gu.show(.3);S.s=R.act('pa-sail20',{x:-2.3,y:.5,h:1.3,face:1});S.s.st.op=0;S.s.ap();await S.s.show(.2);bob(R,S.s,.03);R.fx('leaf',-2.2,1.5,16,{w:1.2,t:2.4,vx:1.8});S.s2=R.act('pa-sail20',{x:-2.8,y:.4,h:.8,face:1});S.s2.st.op=0;S.s2.ap();S.s2.show(.2);S.s2.go(-.2,.4,3.4,{wob:.03,lin:true});R.fx('splash',-1.2,.5,12,{w:1.2,t:2,vx:1.2});await S.s.go(.4,.5,2.6,{wob:.04,lin:true});await S.g.jump(.12);},
 persia:async(R,S)=>{S.s?.hide(.3);S.s2?.hide(.3);S.gu?.hide(.3);await R.bg('persia20');R.label('Persia: the first windmills','#7048e8');S.g=await pop(R,'pa-guidepoint20',{x:-1.9,y:.2,h:1.8,face:1},.3);R.fx('dust',-2.4,.5,18,{w:.8,t:2,vx:3.4,vy:.2});R.fx('leaf',-2.4,1.6,16,{w:1.2,t:2.4,vx:2.4});await windmill(R,S,0);S.b.st.x=1.5;S.b.ap();await R.wait(.2);S.s.st.x=1.5;S.cw.v=1;await ramp(R,S.cw,3,1.4);await S.g?.jump(.12);},
 grind:async(R,S)=>{await S.b.shiver(.6);S.cs={v:3};S.st=await spinner(R,'pa-stone20',-.2,.7,.8,S.cs);await cobs(R,-.2,.8,3);S.sk=R.act('pa-flour20',{x:.5,y:1.6,h:.6,face:-1});S.sk.st.op=0;S.sk.ap();await S.sk.show(.15);await S.sk.go(.5,.2,.5,{squash:.12});R.fx('crumb',-.2,.6,22,{w:.6,t:1.4});await S.sk.jump(.1);},
 later:async(R,S)=>{S.wm?.hide(.3);S.sk?.hide(.3);await R.bg('mill20in');R.label('Water wheels: saws and grain','#1c7ed6');S.w=await pop(R,'pa-wheel20',{x:1.5,y:.18,h:1.7,face:-1},.3);spin(R,S.w,2.4);S.sk=await pop(R,'pa-sacks20',{x:.3,y:.18,h:.7,face:1},.3);R.fx('chip',.4,.9,18,{w:.7,t:1.6});S.m=await pop(R,'pa-mayabread20',{x:-1.7,y:.18,h:2.0,face:1},.3);S.g?.hide(.2);S.m.jump(.2);R.fx('heart',-1.7,2.4,8,{w:.6,t:1.3});},
 outside:async(R,S)=>{S.w?.hide(.2);S.sk?.hide(.2);await R.bg('dam20bg');R.label('A giant modern dam','#1c7ed6');S.m=await pop(R,'pa-mayaamaze20',{x:-1.7,y:.2,h:2.0,face:1},.3);R.fx('splash',.7,.5,30,{w:1.2,t:2.4,vy:.8});await R.wait(.3);R.fx('splash',.9,.4,24,{w:1.2,t:2,vy:.7});await S.m.jump(.15);},
 electricity:async(R,S)=>{S.bu=await pop(R,'pa-bulb20',{x:.6,y:2.0,h:.8,face:1},.3);R.word('Electricity!',.4,2.8,'#e8a900',1.8);for(let i=0;i<5;i++){R.fx('sparkle',-1.9+i*.25,1.4+i*.1,6,{w:.3,t:.9});await R.wait(.15);}for(let i=0;i<3;i++){R.fx('sparkle',.6,2.3,10,{w:.5,t:.8});await S.bu.scaleTo(1.25,.2);await S.bu.scaleTo(1,.2);}S.m.jump(.25);}
};
const B20=mkq(L20);
page('c20',0,{old:null,neu:B20});

/* ===== 21: Rebecca's lucky red hat ===== */
const L21={
 yoink:async(R,S)=>{await R.bg('playgr21');
  S.r=await pop(R,'pa-rebhat21',{x:-1.9,y:.18,h:2.0,face:1},.3);S.r.idle='sway';
  S.q=R.act('pa-squir21',{x:2.4,y:.18,h:1.2,face:-1});S.q.st.op=0;S.q.ap();await S.q.show(.15);
  await S.q.go(-1.1,.18,.7,{hops:5,lin:true});
  R.word('YOINK!',-1.2,2.4,'#e03131',1.9);R.fx('fluff',-1.5,1.7,10,{w:.4,t:.8});
  await sw(S.r,'pa-reb21',.15,{h:2.0,face:1});S.r.shiver(.9);},
 cheeky:async(R,S)=>{await S.q?.swap('pa-squirrun21',.15,{h:1.2,face:-1});S.q?.jump(.25);await S.q?.go(2.3,.18,1.0,{hops:6,lin:true});R.fx('dust',1.2,.3,10,{w:.8,t:.8});},
 friends:async(R,S)=>{S.a=R.act('pa-amy21',{x:-2.3,y:.18,h:1.8,face:1});S.j=R.act('pa-janet21',{x:-2.3,y:.18,h:1.8,face:1});S.l=R.act('pa-linda21',{x:-2.3,y:.18,h:1.8,face:1});
  for(const a of [S.a,S.j,S.l]){a.st.op=0;a.ap();a.show(.15);}
  await all([S.a.go(-1.0,.18,.8,{hops:3}),S.j.go(-.4,.18,1.0,{hops:3}),S.l.go(.2,.18,1.2,{hops:3})]);R.fx('heart',-.3,2.2,6,{w:1.2,t:1.2});},
 sprint:async(R,S)=>{R.label('Around the swings','#1c7ed6');S.sw=await pop(R,'pa-swing21',{x:1.7,y:.2,h:1.6,face:1},.3);R.word('Around!',.2,2.4,'#1c7ed6',1.5);
  await S.a.go(1.0,.18,.5,{hops:3});S.a.faceTo(1);await S.a.go(1.7,.5,.4,{arc:.3});await S.a.go(2.2,.18,.35);S.a.faceTo(-1);await S.a.go(1.7,.18,.35,{lift:.1});await S.a.go(1.0,.18,.35,{hops:2});R.fx('dust',1.4,.3,8,{w:.8,t:.8});},
 climb:async(R,S)=>{R.label('Up the ladder','#2b8a3e');S.sw?.hide(.25);S.c=await pop(R,'pa-climb21',{x:1.6,y:.18,h:1.9,face:1},.3);R.word('Up!',1.0,2.5,'#2b8a3e',1.5);
  await S.j.go(1.2,.18,.5,{hops:2});await S.j.go(1.2,1.1,1.0,{wob:.08,lin:true});},
 through:async(R,S)=>{R.label('Through the tunnel','#7048e8');R.word('Through!',1.7,2.4,'#7048e8',1.5);
  await S.j.go(1.7,.5,.4,{arc:.2});await fade(S.j,.15,.2);await S.j.go(2.15,.2,.5,{lin:true});await fade(S.j,1,.2);R.fx('dust',2.1,.4,10,{w:.4,t:.8});S.j.jump(.2);},
 zoom:async(R,S)=>{S.c?.hide(.25);S.j?.go(.9,.18,.5);S.s=await pop(R,'pa-slide21',{x:1.6,y:.18,h:1.8,face:-1},.3);
  await S.l.go(1.3,.18,.6,{hops:2});await S.l.go(1.45,1.05,.7,{lin:true});},
 down:async(R,S)=>{R.label('Down the slide','#e8590c');R.word('Down!',1.4,2.5,'#e8590c',1.5);
  await S.l.go(2.0,.2,.6,{lin:true,squash:.12});R.fx('dust',2.0,.3,14,{w:.5,t:.9});await S.l.go(1.0,.18,.5);},
 over:async(R,S)=>{S.s?.hide(.25);S.h=await pop(R,'pa-horse21',{x:1.2,y:.18,h:1.3,face:1},.3);R.label('Over the rocking horse','#e03131');
  await S.a.go(.4,.18,.3);await S.a.go(1.2,.9,.4,{arc:.5});await S.a.go(2.0,.18,.4);S.h?.wag(.6,.08,5);R.fx('dust',2.0,.3,8,{w:.5,t:.7});},
 skidded:async(R,S)=>{for(const a of [S.h,S.a,S.j,S.l])a?.hide(.25);
  await S.r.go(-.4,.18,.7,{lin:true,hops:3});R.fx('dust',-.6,.3,16,{w:.7,t:1.1});R.word('Skid!',-.8,2.4,'#e8590c',1.5);S.r.squash?.(.15);},
 peeked:async(R,S)=>{S.b=await pop(R,'pa-bench21',{x:1.1,y:.18,h:1.4,face:1},.3);await sw(S.r,'pa-peek21',.25,{h:1.7,face:1});await S.r.go(.2,.18,.7);S.r.scaleTo(.85,.3);},
 under:async(R,S)=>{R.label('Under the park bench','#2b8a3e');await S.r.go(.45,.18,.4);S.r.shiver(.5);R.fx('leaf',1.0,.6,8,{w:.8,t:1});},
 beside:async(R,S)=>{R.label('Beside the garbage can','#7048e8');S.n=await pop(R,'pa-bin21',{x:2.0,y:.18,h:1.4,face:-1},.3);S.hat=await pop(R,'pa-hat21',{x:1.55,y:.18,h:.45,face:1},.3);R.fx('sparkle',1.55,.45,12,{w:.4,t:1.2});await sw(S.r,'pa-reb21',.2,{h:2.0,face:1});S.r.jump(.3);},
 traded:async(R,S)=>{S.q=R.act('pa-squirnib21',{x:2.5,y:.18,h:1.2,face:-1});S.q.st.op=0;S.q.ap();await S.q.show(.2);await S.q.go(1.9,.18,.5,{hops:2});S.q.chew?.(3,.8);R.word('Trade!',1.2,2.3,'#e8590c',1.5);
  await S.r.go(1.15,.18,.7,{hops:2});S.hat?.hide(.2);await sw(S.r,'pa-rebhat21',.3,{h:2.0,face:1});S.r.jump(.3);R.fx('heart',1.0,2.4,12,{w:1,t:1.4});}
};
const B21=mkq(L21);
page('c21',0,{old:null,neu:B21});

/* ===== 22: Max at the Mega-Fair ===== */
const L22={
 bragged:async(R,S)=>{await R.bg('fair22');R.label('The Mega-Fair','#e8590c');S.x=await pop(R,'pa-max22brave',{x:-1.7,y:.18,h:1.9,face:1},.3);R.word('Not me!',-1.4,2.4,'#e8590c',1.6);S.x.jump(.2);await S.x.wag(.8,.05,4);},
 survived:async(R,S)=>{R.label('Round and round','#1c7ed6');S.r=await pop(R,'pa-carou22',{x:1.4,y:.18,h:1.9,face:-1},.3);await S.x.go(.5,.18,.6,{hops:2});await sw(S.x,'pa-maxhorse22',.2,{h:1.5,face:1});
  for(const [x,f] of [[1.0,1],[1.8,-1],[1.0,-1],[.5,1]]){S.x.faceTo(f);await S.x.go(x,.3,.45,{arc:.12,lin:true});}R.fx('note',1.2,2.1,6,{w:1,t:1.2});},
 laughed:async(R,S)=>{S.r?.hide(.25);R.label('Back and forth','#e03131');S.p=await pop(R,'pa-pirate22',{x:1.4,y:.18,h:1.9,face:-1},.3);await sw(S.x,'pa-max22brave',.2,{h:1.8,face:-1});await S.x.go(1.0,.18,.4);
  R.word('Ha ha!',.2,2.4,'#e03131',1.5);await all([S.p.wag(1.6,.1,3),S.x.wag(1.6,.12,3)]);},
 bumper:async(R,S)=>{S.p?.hide(.25);R.label('Zigzag','#7048e8');await sw(S.x,'pa-maxbump22',.2,{h:1.2,face:1});
  for(const [x,f] of [[1.8,1],[-.3,-1],[1.9,1],[.4,-1]]){S.x.faceTo(f);await S.x.go(x,.18,.4,{lin:true});R.fx('sparkle',x,.5,8,{w:.3,t:.6});}},
 bounced:async(R,S)=>{R.label('Bounce!','#e64980');S.c=await pop(R,'pa-castle22',{x:1.5,y:.18,h:1.9,face:-1},.3);await sw(S.x,'pa-maxcheer22',.2,{h:1.7,face:1});await S.x.go(1.5,.18,.5);
  for(const h of [.5,.8,1.1]){await S.x.jump(h);}},
 slid:async(R,S)=>{S.c?.hide(.25);R.label('Slide!','#1c7ed6');S.w=await pop(R,'pa-wslide22',{x:1.5,y:.18,h:1.9,face:-1},.3);await S.x.go(1.2,1.3,.5,{lin:true});await sw(S.x,'pa-maxslide22',.15,{h:1.2,face:1});
  await S.x.go(2.0,.2,.7,{lin:true,squash:.1});R.fx('splash',2.0,.4,24,{w:.9,t:1.3});R.word('Splash!',1.2,2.4,'#1c7ed6',1.6);},
 spinning:async(R,S)=>{S.w?.hide(.25);R.label('The spinning teacups','#e8590c');S.t=await pop(R,'pa-cups22',{x:1.4,y:.18,h:1.6,face:-1},.3);await sw(S.x,'pa-maxcheer22',.2,{h:1.7,face:1});await S.x.go(1.2,.18,.5);S.t.wag(2.6,.1,9);},
 seconds:async(R,S)=>{R.word('3',.3,2.5,'#e8590c',1.1);await all([S.t?.wag(1.4,.14,12),S.x.wag(1.4,.1,11)]);R.fx('sparkle',1.2,1.8,14,{w:.6,t:1.2});},
 wobbled:async(R,S)=>{await sw(S.x,'pa-max22dizzy',.3,{h:1.7,face:-1});S.t?.hide(.3);await S.x.go(-.2,.18,1.2,{wob:.12});R.fx('sparkle',S.x.st.x,2.0,10,{w:.5,t:1.2});},
 green:async(R,S)=>{R.label('Bright green face','#2b8a3e');await S.x.go(-.9,.18,.9,{wob:.15});},
 moving:async(R,S)=>{R.word('Whoa!',-.9,2.4,'#2b8a3e',1.8);S.x.wag(1.5,.08,4);R.fx('z',-.9,2.2,5,{w:.5,t:1.5});await R.wait(.5);}
};
const B22=mkq(L22);
page('c22',0,{old:null,neu:B22});

/* ===== 23: Mouse, Bear and the lever ===== */
const L23={
 thud:async(R,S)=>{await R.bg('forest23');S.h=await pop(R,'pa-mhouse23',{x:-1.5,y:.18,h:1.8,face:1},.3);
  S.b=R.act('pa-boulder23',{x:2.4,y:1.6,h:1.05,face:1});S.b.st.op=0;S.b.ap();await S.b.show(.1);await all([S.b.go(-.5,.18,.8,{lin:true,wob:.05})]);
  R.word('THUD!',-.2,2.4,'#e03131',1.9);R.fx('dust',-.5,.4,22,{w:.7,t:1.3});S.h.shiver(.6);},
 jammed:async(R,S)=>{R.word('Stuck!',-.9,2.3,'#e03131',1.6);R.fx('dust',-1.0,.4,10,{w:.4,t:.8});},
 pancakes:async(R,S)=>{R.label('Pancakes are smoking!','#e8590c');R.fx('dust',-1.5,1.8,20,{w:.4,t:2.2,vy:.5});R.fx('dust',-1.7,1.7,14,{w:.4,t:2.2,vy:.5});},
 pushed:async(R,S)=>{S.m=R.act('pa-mouse23',{x:2.4,y:.18,h:1.2,face:-1});S.m.st.op=0;S.m.ap();await S.m.show(.15);await S.m.go(.4,.18,.8,{hops:3});
  for(let i=0;i<3;i++){await S.m.go(.15,.18,.2);await S.m.go(.4,.18,.2);}R.word('Push!',.4,2.0,'#7048e8',1.5);},
 purple:async(R,S)=>{R.fx('sparkle',.3,1.1,12,{w:.4,t:1});await S.m.shiver(.9);},
 budge:async(R,S)=>{R.word("Won't budge!",.2,2.3,'#e03131',1.7);S.b.shiver(.4);await S.m.go(1.0,.18,.5);S.m.shiver(.6);},
 ran:async(R,S)=>{S.r=R.act('pa-bearhang23',{x:2.5,y:.18,h:1.9,face:-1});S.r.st.op=0;S.r.ap();await S.r.show(.15);await S.r.go(1.5,.18,.9,{hops:3,lin:true});R.fx('dust',1.9,.3,14,{w:.6,t:1.1});},
 branch:async(R,S)=>{R.label('A long branch and a small stone','#2b8a3e');await S.r.jump(.2);R.fx('leaf',1.5,1.7,10,{w:.6,t:1.5});},
 pivot:async(R,S)=>{R.label('The stone is the pivot','#e8590c');await S.r.go(.5,.18,.6,{hops:2});R.fx('chip',-.2,.3,10,{w:.4,t:.9});},
 leaned:async(R,S)=>{await sw(S.r,'pa-bear23',.3,{h:1.9,face:-1});R.word('Lean!',1.0,2.4,'#e8590c',1.6);await S.r.go(.55,.12,.5,{squash:.12});S.b.go(-.5,.6,.5,{lin:true});},
 pop:async(R,S)=>{R.word('POP!',.2,2.5,'#e03131',2.1);R.fx('sparkle',-.4,1.0,24,{w:.9,t:1.4});await S.b.go(-.5,1.9,.35,{arc:.2});},
 flew:async(R,S)=>{await S.b.go(.2,.18,.55,{arc:.3});R.fx('dust',.2,.4,18,{w:.6,t:1.2});S.m.jump(.3);},
 lever:async(R,S)=>{R.label('That is a lever','#7048e8');await sw(S.r,'pa-bear23',.3,{h:1.9,face:-1});S.r.jump(.2);},
 simple:async(R,S)=>{R.word('Super-strength!',.5,2.4,'#2b8a3e',1.8);R.fx('heart',.5,1.8,10,{w:1.4,t:1.6});await sw(S.m,'pa-mousecheer23',.2,{h:1.3,face:-1});S.m.jump(.25);},
 wheelbarrow:async(R,S)=>{R.label('A wheelbarrow','#2b8a3e');S.b.hide(.15);S.w=await pop(R,'pa-barrowrock23',{x:.2,y:.18,h:1.1,face:-1},.2);await all([S.w.go(2.2,.18,1.4,{wob:.04,lin:true}),S.r.go(1.4,.18,1.4,{hops:3})]);S.w.hide(.3);},
 breakfast:async(R,S)=>{S.m.go(-.6,.18,.6,{hops:2});await sw(S.m,'pa-mouseeat23',.3,{h:1.1,face:1});S.h.go?.(-1.9,.18,.4);R.word('Breakfast!',-.4,2.3,'#e8590c',1.8);R.fx('heart',-.6,1.6,12,{w:1,t:1.6});S.m.chew?.(4,1);}
};
const B23=mkq(L23);
page('c23',0,{old:null,neu:B23});

/* ===== 24: Matt's top-secret shelf ===== */
const L24={
 matt:async(R,S)=>{await R.bg('bedroom24');S.m=await pop(R,'pa-mattsmug24',{x:-1.8,y:.18,h:1.9,face:1},.3);S.m.idle='sway';R.word('Top secret!',-.6,2.5,'#e03131',1.6);},
 shelf:async(R,S)=>{S.v=await pop(R,'pa-vault24',{x:2.0,y:.18,h:1.0,face:-1},.3);R.fx('sparkle',2.0,.8,14,{w:.6,t:1.2});const m=await wt(S,'m');await m.go(1.0,.18,.9,{hops:2});m.faceTo(-1);},
 sister:async(R,S)=>{S.s=R.act('pa-sistip24',{x:-2.4,y:.18,h:1.6,face:1});S.s.st.op=0;S.s.ap();await S.s.show(.2);await S.s.go(-1.7,.18,.7,{hops:3});R.word('Keep out!',-.2,2.3,'#e8590c',1.5);await sw(S.m,'pa-mattshock24',.2,{h:1.9,face:-1});S.m.jump(.2);await sw(S.m,'pa-mattsmug24',.2,{h:1.9,face:-1});},
 mechanisms:async(R,S)=>{R.label('Mechanisms: simple machines teaming up','#7048e8');await S.m.go(2.2,.18,.5);R.fx('sparkle',2.0,.9,16,{w:.8,t:1.3});},
 clippers:async(R,S)=>{S.c=await pop(R,'pa-clip24',{x:-.9,y:.18,h:.7,face:1},.3);R.label('Nail clippers','#e03131');await S.s.go(-1.2,.18,.5);},
 lever:async(R,S)=>{R.word('Lever!',-.9,1.4,'#e03131',1.5);S.c?.jump(.15);await S.c?.wag(.5,.12,10);R.fx('chip',-.9,.7,10,{w:.3,t:.7});},
 wedges:async(R,S)=>{R.word('Wedges!',-.7,1.8,'#e8590c',1.5);R.fx('crumb',-.9,.6,10,{w:.3,t:.8});await S.s.go(-.7,.18,.6,{hops:2});},
 crane:async(R,S)=>{S.k=await pop(R,'pa-crane24',{x:-.1,y:.18,h:1.5,face:1},.3);R.label('A toy crane','#1c7ed6');await S.k.go(-.1,.3,.3);await S.k.go(-.1,.18,.3);},
 pulley:async(R,S)=>{R.word('Pulley!',-.1,2.4,'#1c7ed6',1.5);await S.k.go(-.1,.4,.4);await S.k.go(-.1,.18,.4);await S.s.go(-.4,.18,.5,{hops:2});},
 scissors:async(R,S)=>{S.z=await pop(R,'pa-scis24',{x:.9,y:.18,h:1.0,face:1},.3);R.label('Scissors: two levers, two wedge blades','#2b8a3e');await S.z.wag(.8,.14,9);R.fx('chip',.9,.8,8,{w:.3,t:.6});},
 robot:async(R,S)=>{S.d=await pop(R,'pa-rdog24',{x:1.5,y:.18,h:1.3,face:-1},.3);R.label('Robot dog guard!','#7048e8');R.fx('note',1.5,1.9,8,{w:.6,t:1.4});S.d.jump(.2);},
 spinning:async(R,S)=>{await S.d.wag(1.3,.14,10);},
 snuck:async(R,S)=>{S.s.faceTo(1);await S.s.go(.2,.18,1.1,{hops:5});},
 button:async(R,S)=>{S.b=await pop(R,'pa-button24',{x:.5,y:.1,h:.5,face:1},.3);await S.s.go(.5,.18,.5,{hops:2});R.word('Click!',.5,1.5,'#e03131',1.6);S.b.go(.5,.05,.12);S.d?.hide(.3);S.z?.hide(.3);S.k?.hide(.3);},
 laughed:async(R,S)=>{await sw(S.s,'pa-sislaugh24',.2,{h:1.6,face:1});await sw(S.m,'pa-mattshock24',.2,{h:1.9,face:-1});R.fx('heart',.2,2.0,12,{w:1.4,t:1.8});R.word('Ha ha ha!',.2,2.4,'#e8590c',1.8);await S.s.jump(.2);await S.s.jump(.15);}
};
const B24=mkq(L24);
page('c24',0,{old:null,neu:B24});

/* ===== 19 theory pages: moving water / moving air / renewable (existing art + new rotor, tower, Mr. Earth, wind puff) ===== */
const spinC=(R,a,sp,hx,hy,rh)=>{let on=true;const d=rh/2;R.actors.push({kill:()=>{on=false;},tick:dt=>{if(!on)return;const z=(a.st.rz||0)+dt*sp;a.st.rz=z;a.st.x=hx+d*Math.sin(z);a.st.y=hy-d*Math.cos(z);a.ap();}});};
const TURB=async(R,S,key,tx,H,sp)=>{const t=await pop(R,'pa-tower19',{x:tx,y:.2,h:H,face:1},.35);const hx=tx-.158*H,hy=.2+H*.92,rh=H*.62;const r=R.act('pa-rotor19',{x:hx,y:hy-rh/2,h:rh,face:1,idle:'none'});r.st.op=0;r.ap();await r.show(.25);spinC(R,r,sp,hx,hy,rh);S[key]=[t,r];return r;};
const L19a={
 energy:async(R,S)=>{await R.bg('lake19');R.label('Moving water has energy','#1c7ed6');S.e=await pop(R,'pa-ella19',{x:-1.5,y:.4,h:1.5,face:1},.4);bob(R,S.e,.05);for(let i=0;i<3;i++){R.fx('splash',-1.5+i*.35,.5,10,{w:.7,t:1.1});await R.wait(.25);}},
 waves:async(R,S)=>{R.word('Whoosh!',-.2,2.2,'#1c7ed6',1.6);R.fx('splash',-1.2,.45,16,{w:.8,t:1.4});await S.e.go(1.5,.4,2.8,{wob:.04,lin:true});R.fx('splash',1.5,.5,16,{w:.8,t:1.2});await S.e.jump(.2);hearts(R,1.5,2.2,8);},
 rivers:async(R,S)=>{S.e?.hide(.3);await R.bg('river20');R.label('Rivers push rafts','#1c7ed6');S.r=await pop(R,'pa-samraft',{x:-1.9,y:.3,h:1.15,face:1},.4);bob(R,S.r,.03);R.fx('leaf',-1.9,.7,10,{w:1.2,t:2.4,vx:1.2});await S.r.go(-.4,.3,2.0,{wob:.03,lin:true});},
 downstream:async(R,S)=>{R.word('Downstream!',.5,2.2,'#1c7ed6',1.7);R.fx('leaf',0,.6,12,{w:3,t:2.2,vx:1.6});R.fx('splash',.4,.4,14,{w:1.2,t:1.4});await S.r.go(2.0,.3,2.2,{wob:.03,lin:true});await S.r.jump(.2);hearts(R,2.0,1.6,8);}
};
page('c19',1,{old:mkq(L19a),neu:mkq(L19a)});
const L19b={
 energy:async(R,S)=>{await R.bg('park-wind');R.label('Moving air has energy too','#74c0fc');S.w=await pop(R,'pa-puff19',{x:-1.7,y:1.4,h:1.0,face:1},.4);S.w.idle='sway';R.fx('leaf',-1.0,1.5,16,{w:.8,t:1.8,vx:2.2});await S.w.wag(.9,.05,5);R.word('Whoosh!',.5,2.4,'#1c7ed6',1.5);},
 sails:async(R,S)=>{await R.bg('lake19');S.w?.hide(.2);R.label('Wind fills sails','#1c7ed6');S.w=await pop(R,'pa-puff19',{x:-2.0,y:1.5,h:.8,face:1},.3);S.s=await pop(R,'pa-t15sail',{x:-.9,y:.4,h:1.4,face:1},.4);bob(R,S.s,.03);R.fx('leaf',-1.3,1.4,14,{w:.7,t:1.8,vx:2.4});await S.s.wag(.5,.04,3);await S.s.go(1.8,.4,2.8,{wob:.02,lin:true});R.fx('splash',1.5,.5,12,{w:.7,t:1.2});},
 kites:async(R,S)=>{S.s?.hide(.3);S.w?.hide(.2);await R.bg('park-wind');R.label('Wind lifts kites','#e8590c');S.w=await pop(R,'pa-puff19',{x:-2.0,y:1.3,h:.8,face:1},.3);S.b=await pop(R,'pa-ben19',{x:-1.3,y:.1,h:1.8,face:1},.4);R.fx('leaf',-1.2,1.6,12,{w:.7,t:1.6,vx:2.2});await S.b.go(.9,.1,1.8,{hops:5,wob:.03});R.word('Up, up!',.9,2.5,'#e8590c',1.5);await S.b.jump(.25);},
 turbines:async(R,S)=>{S.b?.hide(.3);S.w?.hide(.2);await R.bg('hill19');R.label('Wind spins turbines','#2b8a3e');await TURB(R,S,'t1',-1.5,1.75,3.0);await TURB(R,S,'t2',.3,2.1,3.6);await TURB(R,S,'t3',1.75,1.5,2.6);R.fx('leaf',-2,1.6,18,{w:.8,t:2.4,vx:3});await R.wait(.8);S.h=await pop(R,'pa-town19lit',{x:-.6,y:.15,h:.75,face:1},.3);R.word('Electricity!',.2,2.9,'#e8a900',1.5);for(let i=0;i<4;i++){R.fx('sparkle',-.5+i*.5,.9,6,{w:.3,t:.9});await R.wait(.25);}}
};
page('c19',2,{old:mkq(L19b),neu:mkq(L19b)});
const L19c={
 wind:async(R,S)=>{await R.bg('hill19');R.label('Wind and water','#2b8a3e');await TURB(R,S,'t1',1.4,1.9,3.2);S.w=await pop(R,'pa-puff19',{x:-1.6,y:1.3,h:.9,face:1},.4);R.fx('leaf',-1.2,1.5,16,{w:.8,t:1.8,vx:2.4});await S.w.wag(.8,.05,5);},
 run:async(R,S)=>{R.word('Never runs out!',0,2.7,'#2b8a3e',1.8);for(let i=0;i<3;i++){R.fx('leaf',-1.2,1.5,10,{w:.8,t:1.4,vx:2.4});await S.w.wag(.6,.06,6);}},
 renewable:async(R,S)=>{R.label('Renewable: use it again and again','#2b8a3e');const r=R.ring(0,1.2,.9,'#2b8a3e');await r.show();R.fx('sparkle',0,1.2,24,{w:2.4,t:1.6});await r.pulse(3,1.1);await r.hide();},
 smoke:async(R,S)=>{R.label('No smoke!','#868e96');R.fx('dust',-.2,1.2,16,{w:.6,t:1.6,vy:.5});await R.wait(.5);R.fx('leaf',-.9,1.2,14,{w:.8,t:1.4,vx:3});R.word('No smoke!',-.2,2.6,'#e03131',1.6);},
 clean:async(R,S)=>{R.label('Clean air','#2f7de1');const s=pr(R,'sun',-1.7,2.3,.5);R.fx('sparkle',0,1.6,30,{w:3,t:1.8});await R.wait(.6);},
 earth:async(R,S)=>{S.w?.hide(.3);S.m=await pop(R,'pa-earth19',{x:-.6,y:.3,h:1.5,face:1},.5);R.fx('sparkle',-.6,1.2,16,{w:1,t:1.4});await S.m.jump(.2);},
 thank:async(R,S)=>{R.word('Thank you!',-.4,2.6,'#c2255c',1.8);hearts(R,-.6,1.9,14);await S.m.jump(.25);await S.m.jump(.2);await S.m.wag(.8,.06,5);}
};
page('c19',3,{old:mkq(L19c),neu:mkq(L19c)});

/* ===== 20 theory pages: windmill (grind grain, pump water) / water wheel (saw, grindstone) / when it stops. Objects only. ===== */
const spinV=(R,a,hx,hy,rh,ctl)=>{let on=true;const d=rh/2;R.actors.push({kill:()=>{on=false;},tick:dt=>{if(!on)return;const z=(a.st.rz||0)+dt*ctl.v;a.st.rz=z;a.st.x=hx+d*Math.sin(z);a.st.y=hy-d*Math.cos(z);a.ap();}});};
const ramp=(R,ctl,to,sec)=>{const v0=ctl.v;return R.T(sec,e=>{ctl.v=v0+(to-v0)*e;});};
const spinner=async(R,img,x,cy,h,ctl)=>{const a=R.act(img,{x,y:cy-h/2,h,face:1,idle:'none'});a.st.op=0;a.ap();await a.show(.4,'pop');spinV(R,a,x,cy,h,ctl);return a;};
const WMX=-1.3,WMH=1.9,WMHUB=.2+WMH*.64;
const windmill=async(R,S,on)=>{S.b=await pop(R,'pa-wmbody20',{x:WMX,y:.2,h:WMH,face:1},.4);S.cw={v:on||0};S.s=await spinner(R,'pa-wmsails20',WMX,WMHUB,WMH*.95,S.cw);return S.s;};
const cobs=async(R,x,y,n)=>{for(let i=0;i<n;i++){const c=await pop(R,'pa-corn20',{x:x+(i-1)*.12,y:y+.9,h:.4,face:1},.15);await c.go(x,y,.4,{squash:.1});R.fx('crumb',x,y,10,{w:.3,t:.9});c.hide(.2);}};
const L20a={
 wind:async(R,S)=>{await R.bg('hill19');R.label('Wind','#1c7ed6');await windmill(R,S,0);S.g=R.act('pa-gust20',{x:-2.7,y:1.5,h:.7,face:1,idle:'sway'});S.g.st.op=0;S.g.ap();await S.g.show(.3);R.fx('leaf',-2.0,1.4,14,{w:.8,t:1.8,vx:2.6});await S.g.go(-1.9,1.55,1.0,{arc:.1});R.word('Whoooo!',-.6,2.7,'#1c7ed6',1.6);},
 sails:async(R,S)=>{R.label('Wind pushes the sails','#e8590c');R.fx('leaf',-2.0,1.6,12,{w:.8,t:1.4,vx:2.6});await S.s.wag(.7,.12,6);R.word('Push!',-1.0,2.8,'#e8590c',1.4);S.s.st.rz=0;},
 turn:async(R,S)=>{R.label('The sails turn','#2b8a3e');R.word('Turning!',-.5,2.8,'#2b8a3e',1.6);await ramp(R,S.cw,1.4,1.0);R.fx('leaf',-2.0,1.5,16,{w:.8,t:1.6,vx:2.8});await ramp(R,S.cw,3.4,1.2);await S.b.shiver(.6);},
 grind:async(R,S)=>{R.label('Grind grain: corn into flour','#e8a900');S.cs={v:3.4};S.st=await spinner(R,'pa-stone20',1.45,.8,.9,S.cs);await cobs(R,1.45,.95,3);S.f=await pop(R,'pa-flour20',{x:2.2,y:.2,h:.7,face:1},.3);R.fx('crumb',1.9,.7,16,{w:.5,t:1.2,vx:.6});R.word('Flour!',1.8,2.4,'#c2a24d',1.5);await S.f.jump(.12);},
 pump:async(R,S)=>{R.label('Pump water','#1c7ed6');S.st?.hide(.3);S.f?.hide(.3);S.cs.v=0;S.p=await pop(R,'pa-pump20',{x:1.1,y:.2,h:1.2,face:1},.4);S.k=await pop(R,'pa-bucket20',{x:1.95,y:.2,h:.5,face:1},.3);for(let i=0;i<3;i++){await S.p.wag(.5,.07,3);R.fx('drop',1.55,.95,10,{w:.15,t:.9,vy:-1.4});}R.word('Water!',1.5,2.4,'#1c7ed6',1.5);await S.k.jump(.12);hearts(R,1.9,1.1,6);}
};
page('c20',1,{old:mkq(L20a),neu:mkq(L20a)});
const WHX=-1.3,WHH=1.7,WHC=.2+WHH/2;
const L20b={
 moving:async(R,S)=>{await R.bg('river20');R.label('Moving water','#1c7ed6');R.fx('splash',-2.2,.6,18,{w:.5,t:1.6,vx:3,vy:.5});R.fx('leaf',-2.2,.9,10,{w:.6,t:2,vx:2.4});S.w=R.act('pa-wheel20',{x:WHX,y:WHC-WHH/2,h:WHH,face:1,idle:'none'});S.w.st.op=0;S.w.ap();await S.w.show(.5,'pop');},
 pushes:async(R,S)=>{R.label('Water pushes the paddles','#e8590c');R.fx('splash',WHX+.4,1.7,22,{w:.7,t:1.4,vx:.8,vy:-.6});await S.w.wag(.8,.1,5);S.w.st.rz=0;},
 turn:async(R,S)=>{R.label('The wheel turns','#2b8a3e');R.word('Turning!',-.4,2.8,'#2b8a3e',1.6);S.cw={v:0};spinV(R,S.w,WHX,WHC,WHH,S.cw);await ramp(R,S.cw,1.2,1.2);R.fx('splash',WHX+.4,1.7,22,{w:.7,t:1.4,vx:.8,vy:-.6});await ramp(R,S.cw,2.2,1.2);},
 saw:async(R,S)=>{R.label('Run a saw','#868e96');S.sw=await spinner(R,'pa-sawblade20',1.5,1.05,.9,{v:9});const lg=await pop(R,'pa-log20',{x:2.5,y:.2,h:.45,face:1},.3);await lg.go(1.5,.2,1.2,{lin:true});R.fx('chip',1.5,.7,26,{w:.4,t:1.1});R.word('Zzzzt!',1.5,2.6,'#868e96',1.6);lg.hide(.3);S.pl=await pop(R,'pa-planks20',{x:.6,y:.2,h:.6,face:1},.35);R.fx('chip',.6,.7,16,{w:.5,t:1});await S.pl.jump(.1);},
 grinding:async(R,S)=>{R.label('Grind with a stone','#e8a900');S.sw?.hide(.3);S.pl?.hide(.3);S.cs={v:2.4};S.st=await spinner(R,'pa-stone20',1.5,.85,.95,S.cs);await cobs(R,1.5,1.0,3);S.f=await pop(R,'pa-flour20',{x:.8,y:.2,h:.7,face:1},.3);R.fx('crumb',1.2,.7,16,{w:.5,t:1.2,vx:-.6});R.word('Flour!',.9,2.4,'#c2a24d',1.5);await S.f.jump(.12);}
};
page('c20',2,{old:mkq(L20b),neu:mkq(L20b)});
const L20c={
 wind:async(R,S)=>{await R.bg('hill19');R.label('The wind dies down','#868e96');await windmill(R,S,3.2);S.g=R.act('pa-gust20',{x:-2.4,y:1.5,h:.7,face:1,idle:'sway'});S.g.st.op=0;S.g.ap();await S.g.show(.3);R.fx('leaf',-2.0,1.5,14,{w:.8,t:1.6,vx:2.6});await R.wait(.8);},
 dies:async(R,S)=>{S.g.hide(1.2);R.word('Calm\u2026',-.5,2.8,'#868e96',1.8);await ramp(R,S.cw,.7,1.6);R.fx('leaf',-2.0,1.0,6,{w:.8,t:1.4,vx:.3,vy:-.6});},
 windmill:async(R,S)=>{await ramp(R,S.cw,.15,1.4);},
 stops:async(R,S)=>{await ramp(R,S.cw,0,.8);S.x=await pop(R,'pa-stop20',{x:.5,y:.2,h:1.3,face:1},.4);await S.x.jump(.15);R.word('Stops!',.5,2.7,'#e03131',1.7);},
 river:async(R,S)=>{await R.bg('river20');R.label('The river dries up','#868e96');S.cw={v:2.2};S.w=await spinner(R,'pa-wheel20',WHX,WHC,WHH,S.cw);R.fx('splash',-2.2,.6,16,{w:.5,t:1.6,vx:3,vy:.5});await R.wait(.8);},
 dries:async(R,S)=>{await R.bg('dryriver20');R.label('The river dries up: no water','#c2a24d');R.word('Dry\u2026',-.8,2.7,'#c2a24d',1.7);R.fx('dust',-1.5,.4,14,{w:1.4,t:2,vx:1.2,vy:.2});S.cw.v=0;await R.wait(1.2);},
 wheel:async(R,S)=>{S.x=await pop(R,'pa-stop20',{x:.6,y:.2,h:1.3,face:1},.4);await S.x.jump(.15);R.word('Stops!',.6,2.7,'#e03131',1.7);},
 work:async(R,S)=>{R.label('Works only when moving','#2b8a3e');await R.wait(.6);},
 moving:async(R,S)=>{S.x?.hide(.3);await R.bg('river20');R.label('Water moving = the wheel works','#2b8a3e');S.cw={v:0};S.w=await spinner(R,'pa-wheel20',WHX,WHC,WHH,S.cw);R.fx('splash',-2.2,.6,24,{w:.5,t:1.8,vx:3,vy:.5});R.word('Moving = work!',0,2.7,'#2b8a3e',1.8);await ramp(R,S.cw,2.4,1.4);hearts(R,-.6,2.2,8);}
};
page('c20',3,{old:mkq(L20c),neu:mkq(L20c)});

/* ===== 21 theory pages: position words / direction words (a ball goes around, up, through, down, over) / on the map. Objects only. ===== */
const L21a={
 position:async(R,S)=>{await R.bg('street21');R.label('Position words','#7048e8');R.word('Where is it?',0,2.3,'#7048e8',1.6);S.cr=await act22(R,'pa-car21',{x:-1.7,y:.2,h:.65,face:1});await S.cr.jump(.08);R.fx('sparkle',-1.7,.5,10,{w:.6,t:1});},
 above:async(R,S)=>{R.label('Above','#e8590c');S.k=R.act('pa-kite21',{x:-2.3,y:1.5,h:.8,face:1,idle:'sway'});S.k._R=R;S.k.st.op=0;S.k.ap();await S.k.show(.25);await S.k.go(-1.7,1.15,.9,{arc:.2});const r=R.ring(-1.7,1.5,.45,'#e8590c');r.show();R.word('Above!',-1.7,2.3,'#e8590c',1.6);await all([S.cr.go(.4,.2,2.4,{lin:true,wob:.02}),S.k.go(.4,1.15,2.4,{lin:true,wob:.03})]);await r.hide();},
 between:async(R,S)=>{await R.bg('livingroom21');R.label('Between','#2b8a3e');S.b1=await act22(R,'pa-box21',{x:-1.0,y:.25,h:.8,face:1,idle:'none'});S.b2=await act22(R,'pa-box21',{x:.5,y:.25,h:.8,face:1,idle:'none'});S.bl=await act22(R,'pa-ball21',{x:-2.1,y:.25,h:.4,face:1,idle:'none'});await S.bl.go(-.25,.25,1.3,{arc:.6,hops:2});await S.bl.jump(.15);for(const x of [-1.0,.5]){const r=R.ring(x,.7,.55,'#2b8a3e');await r.show();await r.pulse(1,1.1);await r.hide();}R.word('Between!',-.25,2.2,'#2b8a3e',1.6);hearts(R,-.25,1.2,8);},
 under:async(R,S)=>{S.b1.hide(.25);S.b2.hide(.25);S.bl.hide(.25);R.label('Under','#1c7ed6');S.dg=await act22(R,'pa-dog21',{x:-2.1,y:.25,h:.65,face:1});S.tb=R.act('pa-table21',{x:.5,y:.25,h:1.0,face:1,idle:'none',z:.05});S.tb._R=R;S.tb.st.op=0;S.tb.ap();await S.tb.show(.3,'pop');await S.dg.go(.5,.25,1.6,{hops:4,wob:.03});R.word('Under!',.5,2.2,'#1c7ed6',1.6);await S.dg.wag(.8,.08,6);hearts(R,.5,1.3,8);}
};
page('c21',1,{old:mkq(L21a),neu:mkq(L21a)});
const circ=(a,R,cx,cy,rx,ry,sec,turns)=>R.T(sec,e=>{const t=Math.PI+e*Math.PI*2*(turns||1);a.st.x=cx+Math.cos(t)*rx;a.st.y=cy+(Math.sin(t)+1)*ry;a.st.fl=-Math.sin(t)>0?1:-1;a.ap();});
const L21b={
 direction:async(R,S)=>{await R.bg('playgr21');R.label('Direction words','#7048e8');R.word('Which way?',0,2.3,'#7048e8',1.6);S.dg=await act22(R,'pa-dog21',{x:-2.0,y:.25,h:.7,face:1});await S.dg.jump(.15);},
 around:async(R,S)=>{R.label('Around','#e8590c');S.cn=R.act('pa-cone21',{x:-.7,y:.25,h:.7,face:1,idle:'none',z:.0});S.cn._R=R;S.cn.st.op=0;S.cn.ap();await S.cn.show(.3,'pop');R.word('Around!',-.7,2.0,'#e8590c',1.6);await S.dg.go(-1.5,.25,.6,{});await circ(S.dg,R,-.7,.25,.8,.22,2.6,1);await S.dg.go(-2.0,.25,.5,{});S.dg.st.fl=1;S.dg.ap();},
 up:async(R,S)=>{S.cn.hide(.2);R.label('Up','#2b8a3e');S.sl=R.act('pa-slidee21',{x:-.2,y:.2,h:1.5,face:1,idle:'none',z:.05});S.sl._R=R;S.sl.st.op=0;S.sl.ap();await S.sl.show(.3,'pop');R.word('Up!',-.6,2.2,'#2b8a3e',1.6);await S.dg.go(.4,.25,1.0,{hops:3});await S.dg.go(.15,1.3,1.1,{lin:true,hops:4});hearts(R,.15,1.9,6);},
 through:async(R,S)=>{S.sl.hide(.2);await S.dg.hide(.2);S.dg.st.x=-2.0;S.dg.st.y=.25;S.dg.ap();R.label('Through','#1c7ed6');S.tu=R.act('pa-tunnel21',{x:-.1,y:.25,h:.75,face:1,idle:'none',z:.08});S.tu._R=R;S.tu.st.op=0;S.tu.ap();await S.tu.show(.3,'pop');await S.dg.show(.2);R.word('Through!',-.1,2.0,'#1c7ed6',1.6);await S.dg.go(-.65,.25,.9,{hops:3});S.dg.st.op=0;S.dg.ap();await R.wait(.5);S.dg.st.x=.55;S.dg.ap();await S.dg.show(.2);R.fx('sparkle',.55,.6,12,{w:.5,t:1});await S.dg.go(1.2,.25,.5,{hops:2});},
 down:async(R,S)=>{S.tu.hide(.2);S.dg.hide(.2);R.label('Down','#c2255c');S.sl=R.act('pa-slidee21',{x:-.2,y:.2,h:1.5,face:1,idle:'none',z:.05});S.sl._R=R;S.sl.st.op=0;S.sl.ap();await S.sl.show(.3,'pop');S.dg.st.x=.15;S.dg.st.y=1.3;S.dg.ap();await S.dg.show(.2);R.word('Down!',.4,2.2,'#c2255c',1.6);await S.dg.go(-.95,.25,1.0,{lin:true});R.fx('dust',-.95,.3,10,{w:.4,t:.9});hearts(R,-.95,1.0,6);},
 over:async(R,S)=>{S.sl.hide(.2);S.dg.hide(.2);R.label('Over','#e8a900');S.hu=R.act('pa-hurdle21',{x:.2,y:.25,h:.65,face:1,idle:'none',z:.05});S.hu._R=R;S.hu.st.op=0;S.hu.ap();await S.hu.show(.3,'pop');S.dg.st.x=-2.0;S.dg.st.y=.25;S.dg.ap();await S.dg.show(.2);R.word('Over!',.2,2.1,'#e8a900',1.6);await S.dg.go(-.7,.25,.8,{hops:2});await S.dg.go(.2,1.15,.45,{lin:true});await S.dg.go(1.2,.25,.45,{lin:true});hearts(R,1.2,1.0,10);}
};
page('c21',2,{old:mkq(L21b),neu:mkq(L21b)});
const gridPlane=(R)=>{const T=window.THREE,cw=.9,rh=.8,x0=-1.8,yb=.05,cols=4,rows=3;const c=document.createElement('canvas');const W=Math.round((cols*cw+.4)*128),H=Math.round((rows*rh+.4)*128);c.width=W;c.height=H;const g=c.getContext('2d');
 const gx=Math.round(.4*128),gy=Math.round(.4*128);g.fillStyle='rgba(255,255,255,.55)';g.fillRect(gx,gy,W-gx,H-gy);g.strokeStyle='#5b4a8a';g.lineWidth=5;
 for(let i=0;i<=cols;i++){g.beginPath();g.moveTo(gx+i*cw*128,gy);g.lineTo(gx+i*cw*128,H);g.stroke();}
 for(let j=0;j<=rows;j++){g.beginPath();g.moveTo(gx,gy+j*rh*128);g.lineTo(W,gy+j*rh*128);g.stroke();}
 g.fillStyle='#5b4a8a';g.font='bold 48px sans-serif';g.textAlign='center';g.textBaseline='middle';
 for(let j=0;j<rows;j++)g.fillText('ABC'[j],gx/2,gy+(j+.5)*rh*128);for(let i=0;i<cols;i++)g.fillText(String(i+1),gx+(i+.5)*cw*128,gy/2);
 const wP=W/128,hP=H/128;const m=new T.Mesh(new T.PlaneGeometry(wP,hP),new T.MeshBasicMaterial({map:new T.CanvasTexture(c),transparent:true,depthTest:false,opacity:0}));
 m.position.set(x0-.4+wP/2,yb+rows*rh+.4-hP/2+ (hP-(rows*rh+.4))/2*0+0,.04);m.position.y=yb+(rows*rh)-(rows*rh+.4)/2+(rows*rh+.4)/2-0+(.4)/2-.0;m.position.y=yb+hP/2;m.renderOrder=3;R.root.add(m);R.own(m);
 const cell=(r,cc)=>[x0+(cc+.5)*cw,yb+rows*rh-(r+.5)*rh];
 const bar=(x,y,w,h,col)=>{const b=new T.Mesh(new T.PlaneGeometry(w,h),new T.MeshBasicMaterial({color:col,transparent:true,depthTest:false,opacity:0}));b.position.set(x,y,.045);b.renderOrder=3;R.root.add(b);R.own(b);return b;};
 const hl=async(b,peak)=>{const mm=b.material;await R.T(.4,e=>{mm.opacity=peak*e;});await R.wait(.8);await R.T(.5,e=>{mm.opacity=peak*(1-e);});};
 return {m,cell,fade:sec=>R.T(sec,e=>{m.material.opacity=e;}),row:(r,col)=>hl(bar(x0+cols*cw/2,yb+rows*rh-(r+.5)*rh,cols*cw,rh,col||'#ffd43b'),.55),col:(cc,col)=>hl(bar(x0+(cc+.5)*cw,yb+rows*rh/2,cw,rows*rh,col||'#74c0fc'),.55)};};
const L21c={
 map:async(R,S)=>{await R.bg('townmap21');R.label('On a map','#7048e8');S.gp=gridPlane(R);await S.gp.fade(.8);R.fx('sparkle',0,1.4,16,{w:3,t:1.4});},
 tree:async(R,S)=>{const [x,y]=S.gp.cell(1,2);S.tr=await pop(R,'pa-tree21',{x,y:y-.3,h:.75,face:1},.4);await S.tr.jump(.12);R.word('B3',x,2.9,'#7048e8',1.8);},
 row:async(R,S)=>{R.label('Row B (across)','#e8a900');await S.gp.row(1,'#ffd43b');},
 column:async(R,S)=>{R.label('Column 3 (down)','#1c7ed6');await S.gp.col(2,'#74c0fc');const r=R.ring(...S.gp.cell(1,2),.4,'#e03131');await r.show();await r.pulse(2,1.1);await r.hide();},
 house:async(R,S)=>{const [x,y]=S.gp.cell(1,1);R.label('The house is beside it','#e8590c');S.hs=R.act('pa-house21',{x:x-1.6,y:y-.3,h:.7,face:1});S.hs.st.op=0;S.hs.ap();await S.hs.show(.2);await S.hs.go(x,y-.3,.9,{hops:3});R.word('Beside!',x,2.9,'#e8590c',1.8);R.fx('sparkle',x,y,12,{w:.5,t:1.2});},
 beside:async(R,S)=>{S.dg=R.act('pa-dog21',{x:-2.4,y:.1,h:.6,face:1});S.dg.st.op=0;S.dg.ap();await S.dg.show(.2);const [x,y]=S.gp.cell(2,0);await S.dg.go(x,y-.3,1.2,{hops:3});await S.dg.wag(.7,.08,6);hearts(R,x,y+.5,8);}
};
page('c21',3,{old:mkq(L21c),neu:mkq(L21c)});

/* ===== 22 theory pages: sports / playground / kitchen. Objects only. ===== */
const roll=(a,x0,x1,y,sec,turns)=>R_T(a,x0,x1,y,sec,turns);
const R_T=(a,x0,x1,y,sec,turns)=>new Promise(res=>{a._R.T(sec,e=>{a.st.x=x0+(x1-x0)*e;a.st.y=y;a.st.rz=-e*turns*Math.PI*2;a.ap();}).then(res);});
const act22=async(R,k,o,t)=>{const a=await pop(R,k,o,t||.35);a._R=R;return a;};
const L22a={
 wheels:async(R,S)=>{await R.bg('meadow');R.label('Turning wheels','#2b8a3e');S.bk=await act22(R,'pa-bike22',{x:-2.1,y:.2,h:1.0,face:1});R.word('Turn!',-.5,2.4,'#2b8a3e',1.5);R.fx('dust',-2.1,.3,10,{w:.5,t:1.2,vx:-1.5,vy:.3});await S.bk.go(1.4,.2,2.4,{wob:.03,lin:true});},
 skater:async(R,S)=>{await R.bg('rink22');R.label('Skating on ice','#1c7ed6');S.sk=await act22(R,'pa-skates22',{x:-2.0,y:.3,h:.7,face:1});R.fx('sparkle',-2.0,.8,10,{w:.6,t:1.2});},
 slides:async(R,S)=>{R.word('Slide!',0,2.6,'#1c7ed6',1.6);for(let i=0;i<5;i++)R.fx('snow',-1.6+i*.7,.35,6,{w:.3,t:1.0});await S.sk.go(1.6,.3,1.9,{lin:true});hearts(R,1.6,1.2,6);},
 trampoline:async(R,S)=>{await R.bg('playgr21');R.label('Trampoline','#e8590c');S.tr=await act22(R,'pa-tramp22',{x:-.2,y:.2,h:1.0,face:1});S.bl=await act22(R,'pa-ball21',{x:-.2,y:1.2,h:.45,face:1,idle:'none'});await S.bl.jump(.2);},
 bounces:async(R,S)=>{R.word('Bounce!',-.2,3.0,'#e8590c',1.6);for(let i=0;i<3;i++){await S.bl.go(-.2,2.4,.45,{});await S.bl.go(-.2,1.1,.4,{squash:.18});S.tr.st.sy=.88;S.tr.ap();await R.wait(.08);S.tr.st.sy=1;S.tr.ap();}R.fx('sparkle',-.2,1.2,12,{w:.7,t:1});},
 bowling:async(R,S)=>{await R.bg('park21');R.label('Bowling','#7048e8');S.pn=await act22(R,'pa-pins22',{x:1.5,y:.2,h:.85,face:1});S.bw=await act22(R,'pa-bowl22',{x:-2.1,y:.2,h:.55,face:1,idle:'none'});await S.bw.jump(.1);},
 rolls:async(R,S)=>{R.word('Roll!',-.3,2.4,'#7048e8',1.6);await roll(S.bw,-2.1,1.1,.2,1.3,4);R.word('Strike!',1.4,2.7,'#e03131',1.8);R.fx('chip',1.5,.6,26,{w:.9,t:1.3,vy:1.2});await all([R.T(.6,e=>{S.pn.st.rz=-e*1.25;S.pn.st.x=1.5+e*.6;S.pn.st.op=1-e*.7;S.pn.ap();}),S.bw.go(1.8,.2,.6,{})]);},
 skier:async(R,S)=>{await R.bg('ski22');R.label('Skiing downhill','#1c7ed6');S.sj=await act22(R,'pa-skis22',{x:-1.9,y:2.0,h:.7,face:1,idle:'none'});R.fx('snow',-1.9,2.2,10,{w:.6,t:1.2});},
 zigzags:async(R,S)=>{S.g1=await act22(R,'pa-gates22',{x:-.8,y:1.35,h:.75,face:1});S.g2=await act22(R,'pa-gates22',{x:.7,y:.85,h:.75,face:-1});R.word('Zig-zag!',0,2.9,'#e03131',1.7);await R.T(3.0,e=>{const z=Math.sin(e*Math.PI*4);S.sj.st.x=-1.9+e*3.6+z*.4;S.sj.st.y=2.0-e*1.65;S.sj.st.rz=z*.5;S.sj.ap();if(Math.random()<.4)R.fx('snow',S.sj.st.x,S.sj.st.y,2,{w:.2,t:.8});});hearts(R,1.6,.5,8);}
};
page('c22',1,{old:mkq(L22a),neu:mkq(L22a)});
const swingRig=async(R,S,x,h,sc)=>{const s=h/346;S.sf=await act22(R,'pa-swingf22',{x,y:.2,h,face:1,idle:'none'});const hx=x+(183-188.5)*s,hy=.2+(346-46)*s,Hp=217*s;S.sp=await act22(R,'pa-swingp22',{x:hx,y:hy-Hp,h:Hp,face:1,idle:'none'});let ph=0;R.actors.push({kill:()=>{},tick:dt=>{ph+=dt*sc.f*6.283;const th=sc.a*Math.sin(ph);S.sp.st.rz=th;S.sp.st.x=hx+Hp*Math.sin(th);S.sp.st.y=hy-Hp*Math.cos(th);S.sp.ap();}});};
const topSpin=async(R,S,x,sc)=>{S.tp=await act22(R,'pa-top22',{x,y:.2,h:1.0,face:1,idle:'none'});let ph=0;R.actors.push({kill:()=>{},tick:dt=>{ph+=dt*sc.v;S.tp.st.sx=Math.cos(ph);S.tp.st.rz=Math.sin(ph*.5)*.07*Math.min(1,sc.v/4);S.tp.ap();}});};
const L22b={
 swing:async(R,S)=>{await R.bg('playgr21');R.label('A swing','#e8590c');S.sc={a:0,f:.55};await swingRig(R,S,-.9,1.55,S.sc);await R.T(1.0,e=>{S.sc.a=.55*e;});},
 back:async(R,S)=>{R.word('Back\u2026',-1.8,2.8,'#e8590c',1.4);await R.wait(1.0);R.word('\u2026and forth!',-.2,2.8,'#e8590c',1.4);},
 swinging:async(R,S)=>{R.label('Swinging','#2b8a3e');R.word('Swinging!',-.9,3.0,'#2b8a3e',1.8);hearts(R,-.9,2.0,8);},
 spinning:async(R,S)=>{R.label('A spinning top','#7048e8');S.tc={v:0};await topSpin(R,S,1.2,S.tc);await ramp(R,S.tc,9,1.2);R.fx('sparkle',1.2,.9,12,{w:.5,t:1});},
 turns:async(R,S)=>{R.word('Round and round!',1.2,2.3,'#7048e8',1.6);await ramp(R,S.tc,14,1.2);},
 place:async(R,S)=>{R.label('Turns in one place','#c2255c');const r=R.ring(1.2,.7,.7,'#c2255c');await r.show();await r.pulse(2,1.1);await r.hide();}
};
page('c22',2,{old:mkq(L22b),neu:mkq(L22b)});

const L22c={
 microwave:async(R,S)=>{await R.bg('kitchen22');R.label('In the kitchen','#e8590c');S.mw=await act22(R,'pa-micro22',{x:-1.5,y:.75,h:1.0,face:1});R.fx('sparkle',-1.5,1.5,10,{w:.7,t:1.1});},
 turns:async(R,S)=>{S.pc={v:0};S.pl=await spinner(R,'pa-plate23',-.2,1.2,.75,S.pc);await ramp(R,S.pc,2.6,1.2);R.word('Turns!',-.6,2.7,'#7048e8',1.6);},
 rolling:async(R,S)=>{S.mw.hide(.3);S.pl.hide(.3);S.pc.v=0;S.rp=await act22(R,'pa-roller22',{x:-1.4,y:.8,h:.8,face:1});R.fx('sparkle',-1.4,1.4,8,{w:.6,t:1});},
 rolls:async(R,S)=>{R.word('Rolls!',-.1,2.5,'#2b8a3e',1.6);await S.rp.go(1.2,.8,1.1,{lin:true,wob:.02});await S.rp.go(-1.2,.8,1.1,{lin:true,wob:.02});hearts(R,0,1.8,6);},
 cheese:async(R,S)=>{S.rp.hide(.3);S.gr=await act22(R,'pa-grater22',{x:.9,y:.75,h:1.2,face:1});S.ch=await act22(R,'pa-cheese22',{x:-1.3,y:.8,h:.6,face:1});},
 slides:async(R,S)=>{R.word('Slide!',-.2,2.6,'#e8a900',1.6);for(let i=0;i<3;i++){await S.ch.go(.4,.8,.5,{lin:true});R.fx('crumb',.7,.9,10,{w:.3,t:.8});await S.ch.go(-.6,.8,.5,{lin:true});}hearts(R,0,1.6,6);}
};
page('c22',3,{old:mkq(L22c),neu:mkq(L22c)});
/* ===== 23 theory pages (rebuilt): every machine shown doing its job with cause and effect. Objects only. ===== */
const sxSpin=(R,a,ctl)=>{let ph=0;R.actors.push({kill:()=>{},tick:dt=>{ph+=dt*ctl.v;a.st.sx=Math.cos(ph);a.ap();}});};
const piv=(a,hx,hy,hh,th)=>{a.st.rz=th;a.st.x=hx+hh/2*Math.sin(th);a.st.y=hy-hh/2*Math.cos(th);a.ap();};
const PK=3.828;
const mini=async(R,k,i)=>{const a=await act22(R,k,{x:-1.85+i*.72,y:1.55,h:.42,face:1,idle:'none'},.3);R.fx('sparkle',-1.85+i*.72,1.8,8,{w:.3,t:.8});return a;};
const rampUp=async(R,S,x0,y0,x1,y1)=>{const len=Math.hypot(x1-x0,y1-y0),th=Math.atan2(y1-y0,x1-x0),hh=len/PK;S.rmp=R.act('pa-plankh23',{x:0,y:0,h:hh,face:1,idle:'none',z:.02});S.rmp._R=R;S.rmp.st.op=0;S.rmp.ap();piv(S.rmp,(x0+x1)/2,(y0+y1)/2+.04,hh,th);await S.rmp.show(.3,'pop');return th;};
const rollUp=(a,R,x0,y0,x1,y1,sec)=>R.T(sec,e=>{a.st.x=x0+(x1-x0)*e;a.st.y=y0+(y1-y0)*e;a.st.rz=-e*7;a.ap();});
const L23a={
 six:async(R,S)=>{await R.bg('farm23');R.label('Six simple machines','#7048e8');R.word('Six!',0,2.2,'#7048e8',1.6);R.fx('sparkle',0,1.6,22,{w:3.4,t:1.4});},
 lever:async(R,S)=>{R.label('Lever','#e8590c');const hx=-.2,L=2.0,hh=L/PK,hy=.5+hh/2;S.st=await act22(R,'pa-stone23',{x:hx,y:.2,h:.3,face:1,idle:'none'});S.pk=R.act('pa-plankh23',{x:0,y:0,h:hh,face:1,idle:'none',z:.02});S.pk._R=R;S.pk.st.op=0;S.pk.ap();S.th=.22;piv(S.pk,hx,hy,hh,S.th);await S.pk.show(.3,'pop');S.rk=await act22(R,'pa-rock23',{x:hx-.65,y:.4,h:.5,face:1,idle:'none'});const place=()=>{S.rk.st.x=hx-.65*Math.cos(S.th);S.rk.st.y=hy-.65*Math.sin(S.th)+hh*.2;S.rk.st.rz=S.th;S.rk.ap();};R.actors.push({kill:()=>{},tick:()=>{piv(S.pk,hx,hy,hh,S.th);place();}});S.bl=await act22(R,'pa-ball21',{x:.6,y:2.0,h:.34,face:1,idle:'none'});await S.bl.go(.6,.95,.5,{});await all([R.T(.6,e=>{S.th=.22-.44*e;}),S.bl.go(1.3,.2,.6,{arc:.4})]);R.word('Small push, big lift!',-.2,2.2,'#e8590c',1.5);await S.rk.jump(.12);hearts(R,-.8,1.4,6);await mini(R,'pa-seesaw23',0);},
 wheel:async(R,S)=>{S.pk.hide(.2);S.rk.hide(.2);S.st.hide(.2);S.bl.hide(.2);S.th=0;R.label('Wheel and axle','#2b8a3e');S.cr=await act22(R,'pa-crate23',{x:-1.6,y:.2,h:.6,face:1,idle:'none'});R.word('Hard to drag\u2026',-1.2,2.0,'#868e96',1.4);await R.T(1.8,e=>{S.cr.st.x=-1.6+e*.5+Math.sin(e*40)*.02;S.cr.st.rz=Math.sin(e*30)*.03;S.cr.ap();if(Math.random()<.5)R.fx('dust',S.cr.st.x-.2,.25,2,{w:.2,t:.7,vx:-.8});});S.cr.st.rz=0;S.wg=await act22(R,'pa-wagon23',{x:.4,y:.2,h:.55,face:1});await S.cr.go(.4,.52,.5,{arc:.4});R.word('Wheels: easy!',.4,2.0,'#2b8a3e',1.5);await all([S.wg.go(1.5,.2,1.3,{lin:true}),S.cr.go(1.5,.52,1.3,{lin:true})]);hearts(R,1.5,1.3,6);await mini(R,'pa-wagon23',1);},
 inclined:async(R,S)=>{S.wg.hide(.2);S.cr.hide(.2);R.label('Inclined plane (ramp)','#1c7ed6');S.sp=await act22(R,'pa-step23',{x:1.0,y:.2,h:.7,face:1,idle:'none'});S.rk2=await act22(R,'pa-rock23',{x:-1.3,y:.2,h:.5,face:1,idle:'none'});R.word('Too heavy to lift!',-1.0,2.0,'#c2255c',1.4);for(let i=0;i<2;i++){await S.rk2.jump(.12);await S.rk2.shiver(.25);}await rampUp(R,S,-.6,.2,.4,.9);R.word('Ramp: roll it up!',-.3,2.0,'#1c7ed6',1.4);await rollUp(S.rk2,R,-.6,.25,.4,.95,1.5);S.rk2.st.rz=0;S.rk2.ap();await S.rk2.go(1.0,.9,.5,{});hearts(R,1.0,1.8,6);await mini(R,'pa-ramp23',2);},
 wedge:async(R,S)=>{S.rmp.hide(.2);S.sp.hide(.2);S.rk2.hide(.2);R.label('Wedge','#c2255c');S.ax=await act22(R,'pa-axe23',{x:-.3,y:.2,h:1.0,face:1,idle:'none'});for(let i=0;i<2;i++){await S.ax.T(.25,e=>{S.ax.st.rz=-.2*Math.sin(e*Math.PI);S.ax.ap();});R.fx('chip',-.3,.7,14,{w:.4,t:.8,vy:1.0});}R.word('A wedge splits!',-.3,2.2,'#c2255c',1.5);await mini(R,'pa-wedge23',3);},
 screw:async(R,S)=>{S.ax.hide(.2);R.label('Screw','#868e96');S.jr=await act22(R,'pa-jar23',{x:-.3,y:.2,h:.95,face:1,idle:'none'});S.ld=R.act('pa-lid23',{x:-.3,y:1.7,h:.34,face:1,idle:'none',z:.05});S.ld._R=R;S.ld.st.op=0;S.ld.ap();await S.ld.show(.2);S.sv={v:10};sxSpin(R,S.ld,S.sv);R.word('Twist it on!',-.3,2.2,'#868e96',1.5);await S.ld.go(-.3,1.12,1.6,{lin:true});S.sv.v=0;S.ld.st.sx=1;S.ld.ap();R.fx('sparkle',-.3,1.2,12,{w:.5,t:1});await mini(R,'pa-screw23',4);},
 pulley:async(R,S)=>{S.jr.hide(.2);S.ld.hide(.2);R.label('Pulley','#e8a900');S.po=await act22(R,'pa-pole23',{x:-.2,y:.2,h:1.6,face:1,idle:'none'});S.pc={v:0};S.pw=await spinner(R,'pa-pulleyw23',-.2,1.72,.3,S.pc);S.fg=await act22(R,'pa-flag23',{x:-.08,y:.35,h:.4,face:1,idle:'none'});R.word('Pull down, flag goes up!',-.2,2.2,'#e8a900',1.4);S.pc.v=-4;await S.fg.go(-.08,1.2,1.7,{lin:true});S.pc.v=0;hearts(R,-.2,1.9,8);await mini(R,'pa-pulley23',5);R.word('Work made easy!',-.2,1.0,'#2b8a3e',1.6);}
};
page('c23',1,{old:mkq(L23a),neu:mkq(L23a)});
const L23b={
 ramp:async(R,S)=>{await R.bg('egypt20');R.label('A ramp is an inclined plane','#1c7ed6');S.sp=await act22(R,'pa-step23',{x:1.0,y:.2,h:.7,face:1,idle:'none'});S.rk=await act22(R,'pa-rock23',{x:-1.4,y:.2,h:.55,face:1,idle:'none'});await rampUp(R,S,-.7,.2,.4,.9);},
 lifting:async(R,S)=>{R.word('Not straight up\u2026',-1.2,2.0,'#c2255c',1.4);await S.rk.go(-1.4,.2,.1,{});for(let i=0;i<2;i++){await S.rk.go(-1.4,.55,.35,{});await S.rk.go(-1.4,.2,.3,{squash:.12});}R.word('\u2026roll it up the ramp!',-.2,2.0,'#1c7ed6',1.5);await S.rk.go(-.8,.2,.5,{});await rollUp(S.rk,R,-.8,.25,.4,.95,1.6);S.rk.st.rz=0;S.rk.ap();await S.rk.go(1.0,.9,.5,{});hearts(R,1.0,1.8,8);},
 wedge:async(R,S)=>{await R.bg('farm23');R.label('A wedge','#c2255c');S.w=await act22(R,'pa-wedge23',{x:-1.0,y:.2,h:.7,face:1,idle:'none'});R.fx('sparkle',-1.0,.8,10,{w:.6,t:1});},
 two:async(R,S)=>{S.w.hide(.25);R.word('2 ramps back to back',-.5,2.1,'#c2255c',1.4);const mk=async(cx,cy,th)=>{const a=R.act('pa-plankh23',{x:0,y:0,h:.9/PK,face:1,idle:'none',z:.02});a._R=R;a.st.op=0;a.ap();piv(a,cx,cy,.9/PK,th);await a.show(.3,'pop');return a;};S.r1=await mk(-1.69,.52,.55);S.r2=await mk(-.91,.52,-.55);await R.wait(.6);},
 splits:async(R,S)=>{S.r1.hide(.2);S.r2.hide(.2);R.label('Splits things','#e03131');S.lg=await act22(R,'pa-log23',{x:.4,y:.2,h:.75,face:1,idle:'none'});S.wd=await act22(R,'pa-wedge23',{x:.4,y:.95,h:.28,face:1,idle:'none'});S.hm=await act22(R,'pa-hammer23',{x:1.3,y:.45,h:.9,face:1,idle:'none'});for(let i=0;i<2;i++){await S.hm.T(.35,e=>{S.hm.st.rz=.9*Math.sin(e*Math.PI/2);S.hm.ap();});R.fx('chip',.4,1.0,8,{w:.2,t:.6});await S.hm.T(.3,e=>{S.hm.st.rz=.9*(1-e);S.hm.ap();});}await S.hm.T(.35,e=>{S.hm.st.rz=.9*Math.sin(e*Math.PI/2);S.hm.ap();});S.wd.hide(.1);await S.lg.swap('pa-logsplit23',.2,{h:.55});R.fx('chip',.4,.6,30,{w:.6,t:1.2,vy:1.2});R.word('Split!',.4,2.1,'#e03131',1.7);await S.hm.T(.4,e=>{S.hm.st.rz=.9*(1-e);S.hm.ap();});},
 axe:async(R,S)=>{S.lg.hide(.2);S.hm.hide(.2);R.word('An axe is a wedge too',-.3,2.1,'#e03131',1.4);S.ax=await act22(R,'pa-axe23',{x:-.6,y:.2,h:1.1,face:1,idle:'none'});await S.ax.T(.3,e=>{S.ax.st.rz=-.2*Math.sin(e*Math.PI);S.ax.ap();});R.fx('chip',-.6,.7,16,{w:.4,t:.8,vy:1.0});const r=R.ring(-.7,.9,.7,'#e03131');await r.show();await r.pulse(2,1.1);await r.hide();},
 doorstop:async(R,S)=>{S.ax.hide(.2);R.label('A doorstop holds things','#2b8a3e');S.dr=await act22(R,'pa-door23',{x:-.7,y:.2,h:1.3,face:1,idle:'none'});R.fx('leaf',-1.8,1.2,16,{w:1.2,t:1.8,vx:3});R.word('Wind pushes the door\u2026',-.3,2.1,'#868e96',1.3);await S.dr.go(.1,.2,.7,{lin:true});await S.dr.go(-.7,.2,.6,{});S.dw=await act22(R,'pa-wedge23',{x:.35,y:.2,h:.28,face:-1,idle:'none'});R.fx('leaf',-1.8,1.2,16,{w:1.2,t:1.8,vx:3});await S.dr.go(.0,.2,.5,{lin:true});await S.dr.shiver(.3);R.word('\u2026the wedge holds it!',.1,1.9,'#2b8a3e',1.5);hearts(R,.2,1.7,8);}
};
page('c23',2,{old:mkq(L23b),neu:mkq(L23b)});
const toBin=async(R,S,i,k,h,x0,name,col,x)=>{const a=await act22(R,k,{x:x0,y:1.25,h,face:1,idle:'none'},.3);await a.go(x,1.25,.7,{arc:.4});R.word(name,x,2.05,col,1.3);await a.go(x,.5,.35,{});await all([a.scaleTo(.6,.2),S.bn[i].T(.25,e=>{S.bn[i].st.sy=1-.12*Math.sin(e*Math.PI);S.bn[i].ap();})]);a.hide(.2);R.fx('sparkle',x,.8,12,{w:.4,t:.8});return a;};
const L23c={
 levers:async(R,S)=>{await R.bg('farm23');R.label('Sort the machines','#7048e8');S.bn=[];for(const x of [-1.5,.1,1.5]){S.bn.push(await act22(R,'pa-crate23',{x,y:.2,h:.55,face:1,idle:'none'},.3));}await toBin(R,S,0,'pa-seesaw23',.7,-2.0,'Lever','#e8590c',-1.5);await toBin(R,S,0,'pa-hammer23',.8,-2.0,'Lever','#e8590c',-1.5);hearts(R,-1.5,1.3,6);},
 wagons:async(R,S)=>{await toBin(R,S,1,'pa-wagon23',.6,-1.0,'Wheel & axle','#2b8a3e',.1);await toBin(R,S,1,'pa-wheels23',.6,-1.0,'Wheel & axle','#2b8a3e',.1);hearts(R,.1,1.3,6);},
 knives:async(R,S)=>{await toBin(R,S,2,'pa-axe23',.8,.3,'Wedge','#c2255c',1.5);await toBin(R,S,2,'pa-wedge23',.5,.3,'Wedge','#c2255c',1.5);},
 wedges:async(R,S)=>{hearts(R,1.5,1.3,8);R.fx('sparkle',0,1.4,26,{w:3.4,t:1.4});R.word('All sorted!',0,1.6,'#2b8a3e',1.6);}
};
page('c23',3,{old:mkq(L23c),neu:mkq(L23c)});

/* ===== 24 theory pages: joined machines / movements / easier work. Objects only. ===== */
const snip=async(a,n)=>{for(let i=0;i<n;i++){await a.swap('pa-scisC24',.12);await a.swap('pa-scisO24',.12);}};
const L24a={
 scissors:async(R,S)=>{await R.bg('kitchen22');R.label('Scissors: a mechanism','#e03131');S.sc=await act22(R,'pa-scisO24',{x:-.5,y:.6,h:1.0,face:1});await snip(S.sc,2);R.fx('sparkle',-.5,1.2,10,{w:.7,t:1});},
 levers:async(R,S)=>{R.word('2 levers',-.5,2.1,'#e8590c',1.4);for(const [x,y] of [[-.1,1.45],[-.1,.8]]){const r=R.ring(x,y,.3,'#e8590c');await r.show();await r.pulse(1,1.1);await r.hide();}},
 pin:async(R,S)=>{R.word('joined at a pin',-.5,2.1,'#7048e8',1.3);const r=R.ring(-.5,1.1,.2,'#7048e8');await r.show();await r.pulse(2,1.2);await r.hide();},
 wedges:async(R,S)=>{R.word('2 sharp wedges',-.5,2.1,'#c2255c',1.3);for(const [x,y] of [[-.9,1.3],[-.9,.9]]){const r=R.ring(x,y,.28,'#c2255c');await r.show();await r.pulse(1,1.1);await r.hide();}},
 together:async(R,S)=>{R.word('Together!',-.5,2.1,'#2b8a3e',1.6);S.pp=await act22(R,'pa-paper24',{x:1.1,y:.6,h:.7,face:1});await S.sc.go(.1,.6,.9,{lin:true});},
 cuts:async(R,S)=>{await snip(S.sc,2);await S.pp.swap('pa-paper2x24',.15);R.fx('crumb',.8,1.0,16,{w:.4,t:1});R.word('Snip!',.4,2.1,'#e03131',1.7);hearts(R,.6,1.6,8);}
};
page('c24',1,{old:mkq(L24a),neu:mkq(L24a)});
const L24b={
 ferris:async(R,S)=>{await R.bg('meadow');R.label('A ferris wheel','#7048e8');S.fs=await act22(R,'pa-fstand24',{x:-.4,y:.2,h:1.25,face:1,idle:'none'});S.fc={v:0};S.fw=await spinner(R,'pa-ferris24',-.4,1.36,1.15,S.fc);R.fx('sparkle',-.4,1.4,12,{w:.8,t:1.1});},
 turns:async(R,S)=>{await ramp(R,S.fc,1.1,1.6);R.word('Turns!',-.4,2.1,'#7048e8',1.6);},
 chairs:async(R,S)=>{R.word('Chairs swing!',-.4,2.1,'#e8590c',1.4);R.fx('sparkle',-.4,1.4,20,{w:1.2,t:1.6});await R.wait(.8);},
 alarm:async(R,S)=>{await R.bg('kitchen22');R.label('An alarm clock','#e03131');S.ck=await act22(R,'pa-clock24',{x:-.3,y:.7,h:.9,face:1,idle:'none'});},
 vibrates:async(R,S)=>{R.word('Brrring!',-.3,2.1,'#e03131',1.6);R.fx('note',-.3,1.7,10,{w:.8,t:1.6});const x0=-.3;await R.T(2.0,e=>{S.ck.st.x=x0+Math.sin(e*120)*.03*(1-e*.3);S.ck.st.rz=Math.sin(e*95)*.05;S.ck.ap();});S.ck.st.x=x0;S.ck.st.rz=0;S.ck.ap();},
 push:async(R,S)=>{await R.bg('playgr21');R.label('A push toy','#2b8a3e');S.pt=await act22(R,'pa-pushtoy24',{x:-1.6,y:.2,h:1.4,face:1,idle:'none'});},
 bounce:async(R,S)=>{R.word('Bounce!',0,2.1,'#2b8a3e',1.6);await S.pt.go(.4,.2,2.2,{hops:5,wob:.02,lin:true});},
 spins:async(R,S)=>{R.word('Spins!',.4,2.1,'#7048e8',1.6);await S.pt.T(1.4,e=>{S.pt.st.rz=e*Math.PI*4;S.pt.ap();});S.pt.st.rz=0;S.pt.ap();R.fx('sparkle',.4,.8,14,{w:.6,t:1.2});}
};
page('c24',2,{old:mkq(L24b),neu:mkq(L24b)});
const L24c={
 clippers:async(R,S)=>{await R.bg('kitchen22');R.label('Nail clippers','#e8590c');S.nc=await act22(R,'pa-nailcl24',{x:-.4,y:.7,h:.8,face:1,idle:'none'});},
 pushing:async(R,S)=>{R.word('Push!',-.4,2.0,'#e8590c',1.6);for(let i=0;i<3;i++){await S.nc.T(.3,e=>{S.nc.st.sy=1-.14*Math.sin(e*Math.PI);S.nc.ap();});R.fx('crumb',-.2,.9,6,{w:.2,t:.6});}hearts(R,-.4,1.6,6);},
 pliers:async(R,S)=>{S.nc.hide(.3);await R.bg('meadow');R.label('Pliers','#1c7ed6');S.pl=await act22(R,'pa-plierO24',{x:-.5,y:.2,h:1.3,face:1,idle:'none'});},
 pulling:async(R,S)=>{await S.pl.swap('pa-plierC24',.25);R.word('Pull!',-.5,2.0,'#1c7ed6',1.6);for(let i=0;i<3;i++){await S.pl.go(-.2,.35,.35,{});await S.pl.go(-.5,.2,.3,{});}hearts(R,-.4,1.6,6);},
 corkscrew:async(R,S)=>{S.pl.hide(.3);await R.bg('kitchen22');R.label('A corkscrew','#7048e8');S.bt=await act22(R,'pa-bottle24',{x:-.3,y:.3,h:.9,face:1,idle:'none'});S.ck=await act22(R,'pa-cork24',{x:-.3,y:1.05,h:.45,face:1,idle:'none'});S.sv={v:0};sxSpin(R,S.ck,S.sv);},
 turning:async(R,S)=>{R.word('Turn!',-.3,2.0,'#7048e8',1.6);S.sv.v=10;await S.ck.go(-.3,1.3,1.6,{lin:true});S.sv.v=0;S.ck.st.sx=1;S.ck.ap();R.word('Pop!',.4,1.5,'#e03131',1.5);R.fx('sparkle',-.3,1.5,16,{w:.5,t:1});hearts(R,-.3,1.9,8);}
};
page('c24',3,{old:mkq(L24c),neu:mkq(L24c)});
P.DIR.mount();

})();
