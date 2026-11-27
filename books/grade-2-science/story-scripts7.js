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
const mk=L=>Object.keys(L).map(k=>[k,lite(L[k])]);
const OLD=id=>(P.DIR_PAGES[id]&&P.DIR_PAGES[id][0]&&P.DIR_PAGES[id][0].old)||null;
const bob=(R,a,amp)=>{if(!a)return;let on=true,ph=0;R.actors.push({kill:()=>{on=false;},tick:dt=>{if(!on)return;ph+=dt*2;a.st.lift=Math.sin(ph)*(amp||.04);}});};
/* ---------- the new narration (switches on once its voice files exist) ---------- */
Object.assign(P.DIR_NEW,{
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
 nothing:async(R,S)=>{R.word('Nothing…',.5,2.1,'#868e96',1.3);await R.wait(.4);},
 whispered:async(R,S)=>{S.l=await pop(R,'pa-leo8whisper',{x:-1.0,y:.18,h:1.80,face:1});R.word('Is it broken?',-.6,2.1,'#1c7ed6',1.2);await S.l?.wag(.8,.03,3);},
 crack:async(R,S)=>{await sw(S.j,'pa-chrys8crack',.4,{h:1.80,face:1});R.word('CRACK!',.5,2.1,'#e03131',1.9);R.fx('sparkle',.4,1.0,22,{w:.7,t:1.2});if(S.j)S.j.idle='none';await S.j?.shiver(.5);},
 split:async(R,S)=>{R.fx('chip',.4,1.0,10,{w:.4,t:1.1});await S.j?.jump(.06);},
 climbed:async(R,S)=>{R.label('Out climbed…','#e8590c');await R.wait(.8);},
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
 hated:async(R,S)=>{await R.bg('store');R.label('Mrs. Shaw','#7048e8');S.s=await pop(R,'pa-shaw10bag',{x:-1.2,y:.18,h:1.92,face:1});R.word('No more carts!',-.6,2.1,'#e03131',1.3);},
 stuffed:async(R,S)=>{await S.s?.grow(1.07,1.07,.5);R.fx('crumb',-1.2,1.1,8,{w:.5,t:1});},
 backpack:async(R,S)=>{R.label('One giant backpack','#1c7ed6');const r=R.ring(-1.2,1.0,.5,'#1c7ed6');await r.show();await r.pulse(2,1);await r.hide();},
 cookies:async(R,S)=>{R.label('Cookies','#8b5a2b');const p=pr(R,'cookie',1.4,1.9,.5);if(p){await R.toss(p,-1.2,1.0,1,.5);R.shrink(p,.4);}},
 socks:async(R,S)=>{R.label('Socks','#e8590c');const p=pr(R,'socks',1.4,1.9,.5);if(p){await R.toss(p,-1.2,1.0,1,.5);R.shrink(p,.4);}},
 lollipop:async(R,S)=>{R.label('Lollipop','#c2255c');const p=pr(R,'lollipop',1.4,1.9,.5);if(p){await R.toss(p,-1.2,1.0,1,.5);R.shrink(p,.4);}},
 milk:async(R,S)=>{R.label('Milk','#1c7ed6');const p=pr(R,'milk',1.4,1.9,.5);if(p){await R.toss(p,-1.2,1.0,1,.5);R.shrink(p,.4);}},
 oil:async(R,S)=>{R.label('Cooking oil','#e8a900');R.fx('drop',-1.2,1.2,8,{w:.3,t:1,vy:-.4});await S.s?.shiver(.6);},
 walk:async(R,S)=>{await R.bg('street');R.label('The walk home','#2b8a3e');S.s=await pop(R,'pa-shaw10bag',{x:-2.4,y:.18,h:1.92,face:1},.3);await S.s.go(-1.6,.18,2.4);},
 ripped:async(R,S)=>{await sw(S.s,'pa-shaw10shock',.3,{h:1.92,face:1});R.word('RIP!',-1.0,2.2,'#e03131',1.7);await S.s?.shiver(.5);},
 crash:async(R,S)=>{R.word('CRASH!',.2,2.2,'#e03131',2.0);S.t=await pop(R,'pa-bag10torn',{x:-.7,y:.18,h:0.78,face:1},.3);S.i=await pop(R,'pa-items10',{x:2.0,y:.18,h:1.02,face:-1},.3);R.fx('dust',2.0,.2,14,{w:.8,t:1.1});},
 bounced:async(R,S)=>{for(let i=0;i<3;i++)await S.i?.jump(.3);},
 solids:async(R,S)=>{R.label('Solids keep their shape','#2b8a3e');const r=R.ring(2.0,.5,.7,'#2b8a3e');await r.show();R.fx('sparkle',2.0,.5,12,{w:.9,t:1.2});await r.pulse(2,1);await r.hide();},
 meanwhile:async(R,S)=>{R.label('Meanwhile…','#1c7ed6');await R.wait(.5);},
 burst:async(R,S)=>{S.m=await pop(R,'pa-milk10',{x:.2,y:.18,h:0.90,face:1},.3);S.o=await pop(R,'pa-oil10',{x:1.15,y:.18,h:0.72,face:1},.3);R.word('Splash!',.6,1.8,'#1c7ed6',1.6);R.fx('splash',.2,.3,16,{w:.5,t:1.3});R.fx('splash',1.15,.3,16,{w:.5,t:1.3});},
 oozed:async(R,S)=>{await all([S.m?.grow(1.25,1.25,1),S.o?.grow(1.25,1.25,1)]);},
 shoes:async(R,S)=>{R.word('Shoe-shaped puddles!',.6,2.0,'#e8590c',1.4);const r=R.ring(.7,.3,.9,'#e8590c');await r.show();await r.pulse(2,1);await r.hide();},
 liquids:async(R,S)=>{R.label('Liquids flow','#1c7ed6');R.fx('drop',.7,.5,10,{w:1,t:1.2,vy:-.2});await R.wait(.4);},
 grabbed:async(R,S)=>{await sw(S.s,'pa-shaw10soap',.6,{h:1.92,face:1});R.fx('sparkle',-1.5,1.2,10,{w:.5,t:1.2});await S.s?.jump(.1);},
 soap:async(R,S)=>{R.label('Dish soap','#2b8a3e');R.fx('bubble',-1.3,1.3,14,{w:.6,t:2.2,vy:.6});await R.wait(.5);},
 solid:async(R,S)=>{R.word('Solid or liquid?',-.2,2.2,'#7048e8',1.6);await S.s?.wag(.8,.04,3);},
 definitely:async(R,S)=>{S.d=await pop(R,'pa-soap10',{x:1.9,y:.18,h:1.02,face:-1},.4);R.word('A liquid!',.4,2.0,'#2b8a3e',1.9);R.fx('sparkle',1.9,.7,18,{w:1,t:1.5});await all([S.s?.jump(.15),S.d?.jump(.15)]);}
};
const B10=mk(L10);
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
 red:async(R,S)=>{await sw(S.m,'pa-soup11trip',.4,{h:1.92,face:1});await S.m?.shiver(.6);},
 tripped:async(R,S)=>{R.word('Whoops!',-.5,2.2,'#e03131',1.7);await all([S.m?.jump(.25),R.T(.7,e=>{if(S.m)S.m.st.rz=Math.sin(e*Math.PI)*.35;S.m?.ap();})]);if(S.m)S.m.st.rz=0;},
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
const B11=mk(L11);
page('c11',0,{old:OLD('c11'),neu:B11});

/* ===== 12: Officer Donut chases Mr. Water ===== */
const L12={
 job:async(R,S)=>{await R.bg('pondice');R.label('Officer Donut','#1c7ed6');S.d=await pop(R,'pa-don12run',{x:-2.3,y:.18,h:1.92,face:1});await S.d?.go(-1.6,.18,.9);},
 arrest:async(R,S)=>{R.word('Arrest Mr. Water!',-.6,2.1,'#1c7ed6',1.5);await S.d?.jump(.12);},
 winter:async(R,S)=>{R.label('Winter','#74c0fc');R.snow(5,40);S.w=await pop(R,'pa-water12ice',{x:1.1,y:.18,h:1.14,face:-1});},
 lunged:async(R,S)=>{await S.d?.go(.1,.18,.7);await sw(S.d,'pa-don12slip',.3,{h:1.44,face:1});},
 slipped:async(R,S)=>{R.word('Whoa!',-.2,2.0,'#e03131',1.8);R.fx('sparkle',-.2,.8,12,{w:.6,t:1.2});await S.d?.jump(.18);await S.d?.jump(.08);},
 disguised:async(R,S)=>{await S.w?.wag(1,.04,6);R.fx('sparkle',1.1,1.0,8,{w:.5,t:1.2});},
 solid:async(R,S)=>{R.label('Solid: hard, cold ice','#74c0fc');const r=R.ring(1.1,.5,.6,'#74c0fc');await r.show();await r.pulse(2,1);await r.hide();},
 spring:async(R,S)=>{await R.bg('spring12');R.label('Spring','#2b8a3e');S.d=await pop(R,'pa-don12grab',{x:-1.0,y:.18,h:1.92,face:1},.4);S.w=await pop(R,'pa-water12ice',{x:1.1,y:.18,h:1.14,face:-1},.3);},
 grabbed:async(R,S)=>{await S.d?.go(.2,.18,.6);},
 melted:async(R,S)=>{await sw(S.w,'pa-water12splash',.6,{h:1.08,face:-1});R.fx('splash',1.1,.4,14,{w:.5,t:1.2});},
 liquid:async(R,S)=>{R.label('Liquid: water','#1c7ed6');R.fx('drop',1.1,.8,10,{w:.5,t:1.2,vy:-.4});await R.wait(.3);},
 splashed:async(R,S)=>{R.word('Splash!',1.2,1.8,'#1c7ed6',1.7);await all([S.w?.go(2.0,.18,.5),S.d?.shiver(.6)]);R.fx('splash',2.0,.3,18,{w:.7,t:1.3});},
 scorching:async(R,S)=>{await R.bg('hot12');R.label('Summer','#e8590c');S.d=await pop(R,'pa-don12run',{x:-1.6,y:.18,h:1.92,face:1},.3);S.w=await pop(R,'pa-water12splash',{x:1.2,y:.18,h:1.08,face:-1},.3);R.fx('sparkle',0,2.0,8,{w:2.4,t:1.4});},
 cornered:async(R,S)=>{await S.d?.go(-.2,.18,1.1);await S.w?.shiver(.6);},
 poof:async(R,S)=>{R.word('POOF!',.5,2.1,'#e03131',2.0);R.fx('dust',1.2,.5,18,{w:.6,t:1.3});await sw(S.w,'pa-water12vapor',.4,{h:1.32,face:-1});},
 evaporated:async(R,S)=>{R.label('Gas: invisible water vapor','#868e96');await all([S.w?.go(1.2,1.7,2.2),R.T(2.2,e=>{if(S.w)S.w.st.op=1-e*.7;S.w?.ap();})]);},
 gas:async(R,S)=>{const r=R.ring(1.2,1.8,.5,'#868e96');await r.show();await r.pulse(2,1);await r.hide();},
 clouds:async(R,S)=>{R.fx('fluff',1.2,2.0,12,{w:1.2,t:1.6});await fade(S.w,0,1);S.w?.hide(.1);},
 returned:async(R,S)=>{await R.bg('pondice');R.label('Winter again','#74c0fc');R.snow(5,40);S.d=await pop(R,'pa-don12ice',{x:-.4,y:.18,h:1.92,face:1},.4);S.w=await pop(R,'pa-water12drop',{x:1.5,y:.18,h:1.02,face:-1});},
 froze:async(R,S)=>{R.fx('sparkle',-.4,.3,16,{w:.7,t:1.3});await all([S.d?.shiver(1),S.w?.wag(.8,.18,5)]);},
 pond:async(R,S)=>{R.word('Brrr!',-.3,2.1,'#1c7ed6',1.8);await S.w?.jump(.15);R.fx('heart',1.5,1.4,6,{w:.6,t:1.4});await S.d?.shiver(.8);}
};
const B12=mk(L12);
page('c12',0,{old:OLD('c12'),neu:B12});

/* ===== 19: The town that lost its plug ===== */
const L19={
 storm:async(R,S)=>{await R.bg('hill19');R.label('A summer storm','#495057');S.s=await pop(R,'pa-storm19',{x:-.4,y:1.4,h:1.08,face:1},.4);R.fx('drop',-.4,1.7,24,{w:1.8,t:3,vy:-1.6});await S.s?.shiver(.8);},
 knocked:async(R,S)=>{R.word('Zzzt!',.8,2.0,'#e03131',1.7);S.t=await pop(R,'pa-town19lit',{x:1.5,y:.18,h:1.08,face:1},.3);await R.wait(.4);await sw(S.t,'pa-town19dark',.3,{h:1.02,face:1});R.fx('sparkle',2.1,.5,14,{w:.5,t:1.2});},
 panicked:async(R,S)=>{R.word('Panic!',1.2,1.9,'#e03131',1.5);await S.t?.shiver(.9);},
 except:async(R,S)=>{S.s?.hide(.4);R.label('Except Grandma!','#2b8a3e');await R.bg('lake19');S.t?.hide(.2);S.g=await pop(R,'pa-gran19',{x:-1.2,y:.35,h:1.4,face:1});bob(R,S.g,.04);R.fx('heart',-1.8,1.9,6,{w:.5,t:1.4});},
 waves:async(R,S)=>{R.label('Waves','#1c7ed6');S.e=await pop(R,'pa-ella19',{x:-.3,y:.4,h:1.50,face:1});bob(R,S.e,.05);R.fx('splash',-.7,.5,12,{w:.6,t:1.2});await S.e?.go(.8,.4,2.4);},
 breeze:async(R,S)=>{R.label('Breeze','#74c0fc');S.b=await pop(R,'pa-ben19',{x:1.8,y:.1,h:1.80,face:-1});R.fx('leaf',1.8,1.6,8,{w:1.2,t:2,vx:-.5});await S.b?.wag(.9,.03,3);},
 rocketed:async(R,S)=>{R.word('Whoosh!',.2,2.1,'#1c7ed6',1.7);await all([S.g?.go(1.0,.35,1.5),R.T(1.5,e=>{})]);R.fx('splash',.8,.4,14,{w:.8,t:1.2});},
 ridge:async(R,S)=>{await R.bg('hill19');R.label('Up on the ridge','#2b8a3e');for(const a of [S.g,S.e,S.b])if(a)a.hide(.3);S.r=await pop(R,'pa-ridge19',{x:0,y:.18,h:2.00,face:1});if(S.r)S.r.idle='sway';R.fx('leaf',-1,1.4,8,{w:3,t:2,vx:.8});},
 turbines:async(R,S)=>{R.label('Giant wind turbines','#2b8a3e');R.fx('leaf',-1.6,1.4,12,{w:3.2,t:2.4,vx:.9});await S.r?.wag(1,.01,4);},
 electricity:async(R,S)=>{R.word('Electricity!',0,2.1,'#e8a900',1.7);for(let i=0;i<5;i++){R.fx('sparkle',-1+i*.5,.5,5,{w:.2,t:.9});await R.wait(.25);}},
 town:async(R,S)=>{if(S.r)S.r.st.x=-1.2;S.r?.ap();S.t=await pop(R,'pa-town19lit',{x:1.7,y:.18,h:1.20,face:1});R.fx('sparkle',1.7,.6,16,{w:.9,t:1.4});await S.t?.jump(.08);},
 fossil:async(R,S)=>{R.label('Fossil fuels run out','#868e96');R.fx('dust',0,.6,10,{w:2,t:1.5});await R.wait(.4);},
 renewable:async(R,S)=>{if(S.g)S.g.st.x=0;if(S.g)S.g.st.y=.35;R.label('Renewable','#2b8a3e');await pop(R,'pa-gran19',{x:-.1,y:.35,h:1.44,face:1},.3);R.word('Renewable!',.2,2.2,'#2b8a3e',1.8);R.fx('sparkle',0,1.0,20,{w:2,t:1.6});},
 unplugs:async(R,S)=>{R.fx('heart',0,1.6,10,{w:2.6,t:1.8});const r=R.ring(1.7,.6,.9,'#e8a900');await r.show();await r.pulse(2,1);await r.hide();}
};
const B19=mk(L19);
page('c19',0,{old:null,neu:B19});

P.DIR.mount();
})();
