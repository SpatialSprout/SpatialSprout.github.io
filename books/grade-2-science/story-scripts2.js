/* Lessons 6, 7, 8 and 10: story pages shot sentence by sentence on clay sets (same director as lessons 1-5).
   Lesson 6 has a brand new story (the missing lamb). Lessons 7, 8, 10 keep their story but tell it slower and fuller.
   old: beats for the recorded narration; neu: beats for the new narration (used once it is voiced). Many cue words work for both. */
(function(){
"use strict";
const P=window.PM;if(!P||!P.DIR||!P.DIR_NEW)return;
const page=P.DIR.page,W=P.PIC.W,H=P.PIC.H;
const all=ps=>Promise.all(ps);
const seq=(...fs)=>(R,S)=>fs.reduce((p,f)=>p.then(()=>R.alive()?f(R,S):null),Promise.resolve());

/* ================= LESSON 6 : The Missing Lamb ================= */
const L6={
 lamb:async(R,S)=>{await R.bg('cow');R.label('Lamb','#c2255c');S.l=R.act('pa-lamb',{x:-1.7,y:.3,h:.8,face:1});await S.l.show(.5,'pop');await S.l.hop(-.7,.3,1.8);await S.l.wag(.8,.05,3);R.fx('heart',S.l.st.x,1.0,5,{w:.5,t:1.2});},
 missing:async(R,S)=>{if(S.l){await S.l.walk(1.3,.55,2.2);await S.l.hide(.7);}R.word('Lamb?',0,1.9,'#c2255c',1.3);await R.wait(.4);},
 ducklings:async(R,S)=>{R.label('Ducklings','#e0a800');S.d=R.act('pa-ducklings',{x:-2.9,y:.15,h:.5,face:1});await S.d.show(.2);await S.d.walk(-1.65,.15,2.4);},
 chicks:async(R,S)=>{R.label('Chicks','#e8590c');S.c=R.act('pa-chicks',{x:-2.9,y:.12,h:.5,face:1});await S.c.show(.2);await S.c.hop(-1.05,.12,2.2);},
 calf:async(R,S)=>{R.label('Calf','#8b5a2b');S.k=R.act('pa-calf',{x:-2.9,y:.08,h:1.05,face:1});await S.k.show(.2);await S.k.walk(-.3,.08,2.4);},
 searched:async(R,S)=>{await all([S.d&&S.d.walk(-1.7,.15,1.4),S.c&&S.c.hop(-1.0,.12,1.4)]);R.word('Where?',-.2,1.9,'#1c7ed6',1.1);await all([S.k&&S.k.wag(1,.05,3),S.d&&S.d.wag(1,.05,3)]);},
 prints:async(R,S)=>{const tr=R.trail([[-.5,.12],[0,.2],[.5,.12],[.9,.2],[1.2,.14]],3,'#7a4f2a');S.tr=tr;
   await all([tr.draw(),S.k&&S.k.walk(.3,.08,3),S.d&&S.d.walk(-1.4,.15,3),S.c&&S.c.hop(-.75,.12,3)]);},
 baa:async(R,S)=>{R.word('Baa!',1.1,1.95,'#c2255c',1.4);await R.wait(.5);},
 stuck:async(R,S)=>{S.st=R.act('pa-lambstuck',{x:1.5,y:.25,h:1.05,face:1,idle:'sway'});await S.st.show(.5,'pop');R.label('Hay bale','#e8590c');await S.st.shiver(.9);},
 together:async(R,S)=>{await all([S.k&&S.k.walk(.45,.08,2),S.d&&S.d.walk(-1.3,.15,2),S.c&&S.c.hop(-.65,.12,2)]);},
 helped:async(R,S)=>{if(S.k)await S.k.jump(.15);if(S.k)await S.k.wag(.6,.06,3);
   S.j=R.act('pa-lambjump',{x:1.5,y:.9,h:.8,face:1});S.j.st.op=0;S.j.ap();await S.st.swap('pa-haybale',.5,{h:.8,face:0});await S.j.show(.2);await S.j.go(1.05,.0,1.4,{arc:.6});R.fx('heart',1.0,1.0,8,{w:.8,t:1.4});R.fx('sparkle',1.0,.9,10,{w:1,t:1.2});},
 home:async(R,S)=>{R.label('Baby animals','#c2255c');const pk=R.act('pa-calflamb',{x:.65,y:.08,h:1.05,face:1});pk.st.op=0;pk.ap();
   await all([S.k&&S.k.hide(.6),S.j&&S.j.hide(.6),pk.show(.7)]);await all([S.d&&S.d.walk(-.95,.15,1.6),S.c&&S.c.hop(-.3,.12,1.6)]);R.fx('heart',.5,1.4,12,{w:1.8,t:1.8});await R.wait(1);}
};
page('c06',0,{
 old:[['babies',async(R,S)=>{await R.bg('cow');R.label('Spring babies','#2b8a3e');await R.wait(.4);}],['lamb',async(R,S)=>{S.l=R.act('pa-lamb',{x:-1.7,y:.3,h:.8,face:1});await S.l.show(.5,'pop');await S.l.hop(-.9,.3,1.8);R.fx('heart',S.l.st.x,1.0,5,{w:.5,t:1.2});}],
  ['foal',async(R,S)=>{S.k=R.act('pa-calf',{x:-2.7,y:.12,h:1.05,face:1});await S.k.show(.2);await S.k.walk(-.1,.12,2.2);}],
  ['piglets',async(R,S)=>{S.c=R.act('pa-chicks',{x:-2.7,y:.62,h:.5,face:1});await S.c.show(.2);await S.c.hop(.6,.62,2);}],
  ['ducklings',async(R,S)=>{S.d=R.act('pa-ducklings',{x:-2.7,y:.3,h:.5,face:1});await S.d.show(.2);await S.d.walk(1.0,.3,2.4);}],
  ['new',async(R,S)=>{R.fx('heart',0,1.3,12,{w:2.6,t:1.8});await R.wait(1);}]],
 neu:[['lamb',L6.lamb],['missing',L6.missing],['ducklings',L6.ducklings],['chicks',L6.chicks],['calf',L6.calf],['searched',L6.searched],['hoofprints',L6.prints],['baa',L6.baa],['stuck',L6.stuck],['together',L6.together],['helped',L6.helped],['home',L6.home]]});

/* ================= LESSON 7 : Nala Grows Up ================= */
const L7={
 born:async(R,S)=>{await R.bg('lion');R.label('Nala the cub','#e8590c');S.n=R.act('pa-cubnew',{x:0,y:.15,h:.55,face:1,idle:'sleep'});await S.n.show(.6,'pop');R.fx('heart',S.n.st.x,.9,6,{w:.5,t:1.3});},
 tiny:async(R,S)=>{R.word('Tiny!',.9,1.5,'#e8590c',1.2);await R.wait(.3);},
 closed:async(R,S)=>{R.fx('z',S.n?S.n.st.x+.3:0,.8,5,{w:.3,t:1.6});await R.wait(1);},
 opened:async(R,S)=>{R.word('Peek!',S.n?S.n.st.x:0,1.3,'#1c7ed6',1.2);const r=R.ring(S.n?S.n.st.x+.35:.2,.38,.2);await r.show();R.fx('sparkle',S.n?S.n.st.x+.3:0,.45,10,{w:.4,t:1});await r.pulse(2,1);await r.hide();},
 months:async(R,S)=>{R.label('3 months','#2b8a3e');S.n.idle='none';await S.n.swap('pa-cubpounce',1,{h:1.0,face:1});await R.wait(.3);},
 pounced:async(R,S)=>{R.word('Pounce!',-.5,1.9,'#e8590c',1.3);for(let i=0;i<2;i++){await S.n.jump(.14);}R.fx('dust',S.n.st.x-.6,.3,8,{w:.6,t:1});},
 year:async(R,S)=>{R.label('1 year old','#7048e8');await S.n.swap('pa-lionyoung',1,{h:1.2,face:1});R.fx('sparkle',S.n.st.x,.9,10,{w:1,t:1.2});await S.n.grow(1.05,1.05,.6);},
 faded:async(R,S)=>{const r=R.ring(S.n.st.x-.15,.65,.35);await r.show();R.fx('fluff',S.n.st.x-.15,.7,10,{w:.5,t:1.1});await r.pulse(2,1.1);await r.hide();},
 grown:async(R,S)=>{R.label('Grown up','#c2255c');await S.n.swap('pa-lionadult',1,{h:1.15,face:1});R.fx('sparkle',S.n.st.x,1,14,{w:1.4,t:1.4});await S.n.jump(.12);},
 hunt:async(R,S)=>{await S.n.walk(S.n.st.x+.3,S.n.st.y,2.2);R.fx('dust',S.n.st.x-.6,.2,10,{w:.8,t:1.1});},
 grow:async(R,S)=>{R.label('Animals grow','#2b8a3e');await R.wait(.4);},
 you:async(R,S)=>{const b=R.act('pa-boywalk',{x:-2.7,y:.1,h:1.0,face:1});await b.show(.2);await b.walk(-1.65,.1,2.2);R.fx('heart',-1.65,1.3,8,{w:.6,t:1.4});await b.jump(.2);}
};
const B7=[['born',L7.born],['tiny',L7.tiny],['closed',L7.closed],['opened',L7.opened],['months',L7.months],['pounced',L7.pounced],['year',L7.year],['faded',L7.faded],['grown',L7.grown],['hunt',L7.hunt],['grow',L7.grow],['you',L7.you]];
page('c07',0,{old:B7,neu:B7});

/* ================= LESSON 8 : Monarch Magic ================= */
const L8={
 monarchs:async(R,S)=>{await R.bg('butterfly');R.label('Monarch','#e8590c');await R.wait(.6);},
 egg:async(R,S)=>{R.label('Egg','#c2a24d');S.e=R.act('pa-eggleaf',{x:-.2,y:.45,h:.55,face:1});await S.e.show(.6,'pop');const r=R.ring(S.e.st.x+.02,S.e.st.y+.3,.14);await r.show();await r.pulse(2,1);await r.hide();},
 hatched:async(R,S)=>{R.label('Caterpillar','#e0a800');R.fx('sparkle',S.e.st.x,.7,12,{w:.7,t:1.2});await S.e.swap('pa-caterbite',1,{h:.8,face:1});},
 ate:async(R,S)=>{R.fx('crumb',S.e.st.x+.4,.75,10,{w:.3,t:1.3});await S.e.chew(8,2.2);},
 grew:async(R,S)=>{await S.e.grow(1.25,1.25,1.4);R.word('Munch!',S.e.st.x,1.8,'#2b8a3e',1.2);},
 hung:async(R,S)=>{await S.e.hide(.7);S.c=R.act('pa-chrysalis',{x:-.1,y:.35,h:1.5,face:1,idle:'sway'});await S.c.show(.9);R.label('Chrysalis','#2b8a3e');},
 chrys:async(R,S)=>{if(!S.c)await L8.hung(R,S);const r=R.ring(S.c.st.x+.02,S.c.st.y+.85,.3);await r.show();R.fx('sparkle',S.c.st.x,S.c.st.y+.9,10,{w:.4,t:1.1});await r.pulse(2,1);await r.hide();},
 inside:async(R,S)=>{R.word('Changing...',.9,1.8,'#7048e8',1.3);await R.wait(.6);},
 weeks:async(R,S)=>{R.word('2 weeks later',.9,1.9,'#1c7ed6',1.4);await S.c.shiver(1.2);},
 cracked:async(R,S)=>{R.fx('chip',S.c.st.x,S.c.st.y+.8,10,{w:.4,t:1});await S.c.shiver(.8);},
 butterfly:async(R,S)=>{R.label('Butterfly','#e8590c');S.c.idle='none';await S.c.swap('pa-emerging',1.2,{h:1.5,face:1});R.fx('sparkle',S.c.st.x,S.c.st.y+.9,14,{w:.8,t:1.4});},
 spread:async(R,S)=>{await S.c.grow(1.3,1.0,1.4);await S.c.wag(1,.04,4);},
 garden:async(R,S)=>{S.m=R.hero('butterfly',{idle:'flutter'});S.m.at(S.c.st.x+.2,S.c.st.y+.9);S.m.st.op=0;S.m.ap();await all([S.c.hide(.7),S.m.show(.6,'pop')]);await S.m.fly(1.9,2.0,3.2);R.fx('sparkle',1.5,1.9,8,{w:.6,t:1.2});},
 meta:async(R,S)=>{R.label('Metamorphosis','#7048e8');R.word('Metamorphosis!',0,1.9,'#7048e8',1.8);await R.wait(.4);}
};
const B8=[['monarchs',L8.monarchs],['egg',L8.egg],['hatched',L8.hatched],['ate',L8.ate],['grew',L8.grew],['hung',L8.hung],['chrysalis',L8.chrys],['inside',L8.inside],['weeks',L8.weeks],['cracked',L8.cracked],['butterfly',L8.butterfly],['dried',L8.spread],['garden',L8.garden],['metamorphosis',L8.meta]];
page('c08',0,{old:B8,neu:B8});

/* ================= LESSON 10 : Mrs. Shaw Goes Shopping ================= */
const L10={
 pushed:async(R,S)=>{await R.bg('store');R.label('Mrs. Shaw','#c2255c');S.m=R.act('pa-shawcart',{x:-2.6,y:.1,h:1.35,face:1});await S.m.show(.2);await S.m.walk(-.5,.1,3);},
 milk:async(R,S)=>{R.label('Milk','#1c7ed6');S.mk=R.act('pa-milkpour',{x:1.0,y:.12,h:1.0,face:1});await S.mk.show(.6,'pop');R.fx('drop',1.0,.55,10,{w:.1,t:1.2,vy:-1});await R.wait(.4);},
 oil:async(R,S)=>{R.label('Cooking oil','#e0a800');await S.mk.swap('pa-oilpour',.8,{h:1.0,face:1});R.fx('drop',1.0,.4,8,{w:.08,t:1.1,vy:-1});},
 pour:async(R,S)=>{R.word('Pour!',1.1,1.8,'#1c7ed6',1.2);R.fx('splash',1.0,.2,12,{w:.5,t:1.2});await R.wait(.5);},
 liquids:async(R,S)=>{R.label('Liquids','#1c7ed6');R.word('Liquids flow!',0,1.9,'#1c7ed6',1.6);R.fx('splash',1.0,.2,14,{w:.8,t:1.4});await R.wait(.6);},
 cookies:async(R,S)=>{if(S.mk)S.mk.hide(.5);R.label('Solids','#e8590c');const p=R.prop('cookie',1.4,1.5,.5);await R.toss(p,-.3,.95,1.1,.5);await R.shrink(p,.4);},
 socks:async(R,S)=>{const p=R.prop('socks',1.4,1.5,.5);await R.toss(p,-.3,.95,1.1,.5);await R.shrink(p,.4);},
 lolly:async(R,S)=>{const p=R.prop('lollipop',1.4,1.5,.5);await R.toss(p,-.3,.95,1.1,.5);await R.shrink(p,.4);R.fx('sparkle',-.7,1,8,{w:.5,t:1});},
 solids:async(R,S)=>{R.word('Solids keep their shape!',0,1.95,'#e8590c',1.9);await R.wait(.5);},
 soap:async(R,S)=>{R.label('Dish soap','#2b8a3e');S.m.idle='none';await S.m.swap('pa-shawsoap',.9,{h:1.35,face:1});S.m.at(S.m.st.x+.1,S.m.st.y);R.fx('sparkle',S.m.st.x+.2,1.2,8,{w:.5,t:1});},
 squeezed:async(R,S)=>{R.fx('drop',S.m.st.x+.45,1.2,10,{w:.08,t:1.2,vy:-1});await R.wait(.8);},
 liquid:async(R,S)=>{R.word('Liquid!',0,1.9,'#1c7ed6',1.6);R.fx('splash',S.m.st.x+.4,.2,12,{w:.6,t:1.2});await S.m.jump(.12);}
};
const B10=[['pushed',L10.pushed],['milk',L10.milk],['oil',L10.oil],['pour',L10.pour],['liquids',L10.liquids],['cookies',L10.cookies],['socks',L10.socks],['lollipop',L10.lolly],['solids',L10.solids],['soap',L10.soap],['squeezed',L10.squeezed],['liquid',L10.liquid]];
page('c10',0,{old:B10,neu:B10});

/* ---------- the new narration (switches on once its voice files exist) ---------- */
Object.assign(P.DIR_NEW,{
 c06:{story:"A baby *lamb* was missing! *Ducklings*, *chicks*, and a *calf* searched the farm. They followed tiny *hoofprints* through the grass. \"Baa!\" came a cry. The baby lamb was stuck behind a *hay bale*. Together, the animal *babies* helped their friend get home."},
 c07:{story:"When *Nala* the lion cub was born, she was tiny. Her eyes were closed and her fur was covered in spots. After two weeks, her eyes opened! At three months, she was full of fun. She pounced on her mother's tail again and again. At one year, her spots faded away. She was bigger and stronger every day. Now Nala is *grown up*. She is big and strong, and she can hunt with the other lions. Animals change as they *grow*, and so do you!"},
 c08:{story:"Our class raised *monarchs*! First, we found a tiny *egg* on a milkweed leaf. A few days later, it hatched into a stripy *caterpillar*. The caterpillar ate and ate and grew and grew. Then it hung upside down from a twig and made a green *chrysalis* with gold dots. Inside, it was changing. Two weeks later, the chrysalis cracked open, and out came a *butterfly*! Its wings were wet and crumpled, but soon they dried and spread wide. We let it go in the garden, and it flew away. This big change is called *metamorphosis*."},
 c10:{story:"Mrs. Shaw pushed her cart through the store. First, she put in a carton of *milk* and a bottle of *cooking oil*. Look how they pour! Those are *liquids*: they *flow* and take the shape of their container. Then she added a box of *cookies*, a pack of *socks*, and a *lollipop*. Those are *solids*: they keep their own shape. Mrs. Shaw smiled. \"I need *dish soap* too,\" she said. \"Liquid or solid?\" She squeezed the bottle, and the soap flowed out. Liquid!"}});
P.DIR.mount();
})();
