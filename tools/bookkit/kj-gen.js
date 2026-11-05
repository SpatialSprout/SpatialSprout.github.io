/* Junior Kindergarten only: the magic book. Every lesson takes the reader somewhere new (the whole room
   changes: ground, rug, things around the book), the letter show happens on the left page, the colouring
   page is on the right, and the practice games use both pages as one big 3D stage. */
(function(){
"use strict";
const P=window.PM;if(!P||P.failed||!P.unit||!P.PKX||!P.KABC)return;const BK=window.BOOK||{};if(!BK.kSpread)return;
const {THREE,G,mk,lam}=P;const X=P.PKX;const {make,COL}=X;const R=P.R,U=P.unit;const shuffle=P.PK.shuffle;
const AZ='ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

/* ---------- little scenery builders for the worlds (used around the book) ---------- */
const ph=(c,s)=>new THREE.MeshPhongMaterial({color:c,shininess:s||30});
const B=(geo,key,c)=>mk(G('kjw_'+key,geo),ph(c),0);
const BUILD={
  appletree:r=>{/* a soft, chubby orchard tree with shiny apples */const g=new THREE.Group();const SP=(c,ro)=>new THREE.MeshPhysicalMaterial({color:c,roughness:ro||.55,clearcoat:.35,clearcoatRoughness:.4});
    const t=mk(G('kjw_trunk2',()=>new THREE.CylinderGeometry(.11,.17,.9,20)),SP('#a8734f'),0);t.position.y=.45;g.add(t);
    [[0,1.25,0,.6],[-.32,1.08,.08,.42],[.33,1.1,-.05,.44],[.05,1.48,-.05,.42]].forEach(([x,y,z,rr])=>{const c=mk(G('kjw_cr'+rr,()=>new THREE.SphereGeometry(rr,28,20)),SP('#6fcf63',.6),0);c.position.set(x,y,z);g.add(c);});
    for(let i=0;i<8;i++){const a=i*0.8+(r?r():0),y=.98+((i*37)%5)*.11;const ap=mk(G('kjw_ap2',()=>new THREE.SphereGeometry(.085,20,14)),SP('#ff5c6c',.35),0);ap.position.set(Math.cos(a)*.6,y,Math.sin(a)*.6);g.add(ap);}return g;},
  castle:()=>{const g=new THREE.Group();const w=B(()=>new THREE.BoxGeometry(1.2,.8,.5),'cwall','#dee2e6');w.position.y=.4;g.add(w);[-.6,.6].forEach(x=>{const t=B(()=>new THREE.CylinderGeometry(.22,.24,1.3,12),'ctow','#ced4da');t.position.set(x,.65,0);g.add(t);const r=B(()=>new THREE.ConeGeometry(.28,.45,12),'croof','#845ef7');r.position.set(x,1.52,0);g.add(r);});
    const d=B(()=>new THREE.BoxGeometry(.3,.42,.05),'cdoor','#8d5a3b');d.position.set(0,.21,.26);g.add(d);const f=B(()=>new THREE.BoxGeometry(.2,.13,.01),'cflag','#ff6b6b');f.position.set(.7,1.9,0);g.add(f);return g;},
  barn:()=>{const g=new THREE.Group();const b=B(()=>new THREE.BoxGeometry(1.0,.75,.8),'barn','#c92a2a');b.position.y=.38;g.add(b);const r=B(()=>new THREE.CylinderGeometry(.01,.62,.5,4,1),'barnr','#495057');r.rotation.y=Math.PI/4;r.scale.set(1.15,1,.92);r.position.y=1.0;g.add(r);
    const d=B(()=>new THREE.BoxGeometry(.4,.5,.04),'barnd','#ffffff');d.position.set(0,.25,.41);g.add(d);return g;},
  haystack:()=>{const g=new THREE.Group();const h=B(()=>new THREE.CylinderGeometry(.32,.4,.45,14),'hay','#fcc419');h.position.y=.22;g.add(h);const t=B(()=>new THREE.ConeGeometry(.33,.3,14),'hayt','#fab005');t.position.y=.6;g.add(t);return g;},
  fence:()=>{const g=new THREE.Group();[-.4,0,.4].forEach(x=>{const p=B(()=>new THREE.BoxGeometry(.08,.45,.08),'fp','#f8f9fa');p.position.set(x,.22,0);g.add(p);});[.15,.32].forEach(y=>{const r=B(()=>new THREE.BoxGeometry(.9,.06,.04),'fr','#f8f9fa');r.position.set(0,y,0);g.add(r);});return g;},
  pond:()=>{const g=new THREE.Group();const w=B(()=>new THREE.CylinderGeometry(.8,.8,.03,28),'pond','#74c0fc');w.position.y=.02;g.add(w);const l=B(()=>new THREE.CylinderGeometry(.18,.18,.02,16),'lily','#40c057');l.position.set(.3,.04,.2);g.add(l);return g;},
  hive:()=>{const g=new THREE.Group();[0,1,2,3].forEach(i=>{const s=B(()=>new THREE.CylinderGeometry(.26-0.04*Math.abs(i-1),.26-0.04*Math.abs(i-1.2),.16,16),'hive'+i,'#fcc419');s.position.y=.1+i*.15;g.add(s);});const d=B(()=>new THREE.CylinderGeometry(.06,.06,.02,10),'hived','#5c3d00');d.rotation.x=Math.PI/2;d.position.set(0,.25,.25);g.add(d);return g;},
  sandcastle:()=>{const g=new THREE.Group();const b=B(()=>new THREE.BoxGeometry(.7,.35,.5),'sc','#e9c46a');b.position.y=.17;g.add(b);[-.3,.3].forEach(x=>{const t=B(()=>new THREE.CylinderGeometry(.13,.15,.55,10),'sct','#e9c46a');t.position.set(x,.28,0);g.add(t);});return g;},
  xmark:()=>{const g=new THREE.Group();[1,-1].forEach(s=>{const b=B(()=>new THREE.BoxGeometry(.7,.03,.12),'xm','#e03131');b.rotation.y=s*Math.PI/4;b.position.y=.02;g.add(b);});return g;},
  gumtree:()=>{const g=new THREE.Group();const t=B(()=>new THREE.CylinderGeometry(.1,.14,1.1,8),'gtr','#d6c7b0');t.position.y=.55;g.add(t);[[-.2,1.2],[.25,1.35],[0,1.5]].forEach(([x,y])=>{const c=B(()=>new THREE.SphereGeometry(.35,12,10),'gcr','#8fbc8f');c.position.set(x,y,0);g.add(c);});return g;},
  cloudmound:()=>{const g=new THREE.Group();[[0,.25,.45],[.4,.2,.35],[-.4,.2,.35],[.15,.45,.3]].forEach(([x,y,r])=>{const c=B(()=>new THREE.SphereGeometry(r,14,10),'cm'+r,'#ffffff');c.position.set(x,y,0);g.add(c);});return g;}};
P.worldProp=(k,R)=>{if(BUILD[k])return BUILD[k](R);const o=make(k,1.9);o.rotation.y=0;return o;};

/* ---------- the places. Each letter has its own; numbers, shapes and stories borrow one that fits ---------- */
const mood=(sky,gr,hm)=>[0,1,2,3,4].map(()=>({sky,gr,hm:hm||'#ffffff'}));
const W={
 A:{name:'Apple Orchard',ground:'grass',motif:'flower',far:['appletree','appletree','appletree','bush','fence','flower','appletree','basket'],air:['cloud','cloud','butterfly','bird'],moods:mood('#c5ecff','#9ad86f'),rug:{mat:'#ffc9c9',c:['#ff6b6b','#ffd43b','#69db7c']},mat:'#fff5f5',page:'#ffe3e3',say:'the apple orchard',is:'A is for apple orchard!'},
 B:{name:'Sunny Beach',ground:'sand',motif:'shell',far:['palm','palm','umbrella','beachball','starfish','shell','sandcastle','bucket'],air:['cloud','gull','gull','sun'],moods:mood('#bde9ff','#f3dfb0'),rug:{mat:'#a5d8ff',c:['#4dabf7','#ffd43b','#ff8787']},mat:'#fff9db',page:'#e7f5ff',say:'the beach',is:'B is for beach!'},
 C:{name:'Castle Hill',ground:'grass',motif:'star',far:['castle','tree','castle','bush','flower','tree','fence','castle'],air:['cloud','bird','rainbow'],moods:mood('#d0ebff','#94d82d'),rug:{mat:'#d0bfff',c:['#845ef7','#ffd43b','#ff8787']},mat:'#f3f0ff',page:'#f3f0ff',say:'the castle',is:'C is for castle!'},
 D:{name:'Dino Valley',ground:'jungle',motif:'footprint',far:['dino','fern','volcano','dino','fern','palm','dinoegg','rock'],air:['cloud','ptero','ptero','cloud'],moods:mood('#c9ecff','#8fcf6a'),rug:{mat:'#b2f2bb',c:['#2f9e44','#ffa94d','#74c0fc']},mat:'#ebfbee',page:'#ebfbee',say:'dinosaur land',is:'D is for dinosaurs!'},
 E:{name:'Enchanted Forest',ground:'forest',motif:'star',far:['mushroom','pine','crystal','mushroom','tree','crystal','mushroom','pine'],air:['firefly','firefly','butterfly','firefly'],moods:mood('#e5dbff','#8bc34a','#f3f0ff'),rug:{mat:'#eebefa',c:['#be4bdb','#69db7c','#ffd43b']},mat:'#f8f0fc',page:'#f8f0fc',say:'the enchanted forest',is:'E is for enchanted forest!'},
 F:{name:'Happy Farm',ground:'grass',motif:'flower',far:['barn','haystack','cow','pig','sheep','fence','tree','haystack'],air:['cloud','bird','sun'],moods:mood('#c5ecff','#a9e34b'),rug:{mat:'#ffd8a8',c:['#e8590c','#ffd43b','#69db7c']},mat:'#fff4e6',page:'#fff4e6',say:'the farm',is:'F is for farm!'},
 G:{name:'Flower Garden',ground:'grass',motif:'flower',far:['flower','sunflower','tulip','bush','rose','flower','tulip','sunflower'],air:['butterfly','butterfly','cloud','rainbow'],moods:mood('#d3f9d8','#8ce99a'),rug:{mat:'#c3fae8',c:['#12b886','#ff8787','#ffd43b']},mat:'#e6fcf5',page:'#e6fcf5',say:'the garden',is:'G is for garden!'},
 H:{name:'Hot-Air Hills',ground:'grass',motif:'heart',far:['tree','bush','house','flower','hive','tree','bush','house'],air:['hotair','hotair','hotair','cloud'],moods:mood('#ffe8cc','#b2f2bb'),rug:{mat:'#ffec99',c:['#f59f00','#ff6b6b','#4dabf7']},mat:'#fff9db',page:'#fff9db',say:'the hills',is:'H is for hills!'},
 I:{name:'Treasure Island',ground:'sand',motif:'shell',far:['palm','palm','shell','starfish','rock','palm','sandcastle','shell'],air:['gull','sun','cloud'],moods:mood('#99e9f2','#f3dfb0'),rug:{mat:'#99e9f2',c:['#15aabf','#ffd43b','#ff922b']},mat:'#e3fafc',page:'#e3fafc',say:'the island',is:'I is for island!'},
 J:{name:'Jungle',ground:'jungle',motif:'leaf',far:['palm','fern','monkey','toucan','fern','palm','parrot','fern'],air:['bird','butterfly','cloud'],moods:mood('#c3fae8','#69db7c'),rug:{mat:'#8ce99a',c:['#2b8a3e','#ffd43b','#ff922b']},mat:'#ebfbee',page:'#d3f9d8',say:'the jungle',is:'J is for jungle!'},
 K:{name:'Kangaroo Land',ground:'desert',motif:'sun',far:['kangaroo','gumtree','rock','kangaroo','gumtree','rock','kangaroo','gumtree'],air:['sun','cloud','bird'],moods:mood('#ffe3bf','#f0b27a'),rug:{mat:'#ffc078',c:['#e8590c','#ffd43b','#4dabf7']},mat:'#fff4e6',page:'#fff4e6',say:'kangaroo land',is:'K is for kangaroo land!'},
 L:{name:'Lily Lake',ground:'grass',motif:'leaf',far:['pond','duck','tree','log','pond','bush','frog','tree'],air:['bird','cloud','butterfly'],moods:mood('#c5f6fa','#8ce99a'),rug:{mat:'#a5d8ff',c:['#1c7ed6','#69db7c','#ffd43b']},mat:'#e7f5ff',page:'#e7f5ff',say:'the lake',is:'L is for lake!'},
 M:{name:'The Moon',ground:'space',motif:'star',far:['crystal','rock','rocket','crystal','dish','rock','crystal','antenna'],air:['planet','starf','starf','planet'],moods:mood('#212a5c','#adb5bd','#e9ecef'),dark:true,rug:{mat:'#bac8ff',c:['#4263eb','#ffd43b','#e9ecef']},mat:'#edf2ff',page:'#edf2ff',say:'the moon',is:'M is for moon!'},
 N:{name:'Night Forest',ground:'forest',motif:'star',far:['pine','pine','tent','campfire','pine','log','pine','mushroom'],air:['moon','starf','firefly','starf','firefly'],moods:mood('#1c2b5a','#2f6b4f','#d0d6ff'),dark:true,rug:{mat:'#91a7ff',c:['#364fc7','#ffd43b','#f8f9fa']},mat:'#edf2ff',page:'#dbe4ff',say:'the night',is:'N is for night!'},
 O:{name:'Ocean Reef',ground:'reef',motif:'bubble',far:['coral','coral','seaweed','coralfan','rockr','chest','seaweed','coral'],air:['fish','fish','fish','bubbles','turtle'],moods:mood('#99e9f2','#e8d9b0','#e6fffd'),rug:{mat:'#66d9e8',c:['#1098ad','#ff8787','#ffd43b']},mat:'#e3fafc',page:'#c5f6fa',say:'the ocean',is:'O is for ocean!'},
 P:{name:'Pumpkin Patch',ground:'forest',motif:'leaf',far:['pumpkin','pumpkin','haystack','fence','pumpkin','tree','pumpkin','haystack'],air:['cloud','bird','cloud'],moods:mood('#ffe8cc','#a9c96b'),rug:{mat:'#ffc078',c:['#e8590c','#2f9e44','#ffd43b']},mat:'#fff4e6',page:'#fff4e6',say:'the pumpkin patch',is:'P is for pumpkin patch!'},
 Q:{name:'Queen’s Palace',ground:'grass',motif:'heart',far:['castle','rose','tulip','castle','fence','rose','bush','castle'],air:['rainbow','butterfly','cloud'],moods:mood('#f3d9fa','#b2f2bb','#fff0f6'),rug:{mat:'#fcc2d7',c:['#d6336c','#ffd43b','#845ef7']},mat:'#fff0f6',page:'#fff0f6',say:'the queen’s palace',is:'Q is for queen’s palace!'},
 R:{name:'Rainbow Land',ground:'grass',motif:'heart',far:['lollipop','cupcake','candycane','gumdrop','lollipop','cupcake','gumdrop','candycane'],air:['rainbow','cloud','heartf','rainbow'],moods:mood('#ffdeeb','#b2f2bb','#fff0f6'),rug:{mat:'#ffd8a8',c:['#ff6b6b','#4dabf7','#ffd43b']},mat:'#fff0f6',page:'#fff5f5',say:'rainbow land',is:'R is for rainbow!'},
 S:{name:'Outer Space',ground:'space',motif:'star',far:['rocket','crystal','crystal','antenna','rocket','dish','crystal','antenna'],air:['planet','planet','starf','starf','ufo','moon'],moods:mood('#2b2459','#5a4fa8','#d9d0ff'),dark:true,rug:{mat:'#b197fc',c:['#5f3dc4','#ffd43b','#74c0fc']},mat:'#f3f0ff',page:'#e5dbff',say:'space',is:'S is for space!'},
 T:{name:'Tent Camp',ground:'forest',motif:'leaf',far:['pine','tent','pine','campfire','log','tent','pine','bush'],air:['firefly','cloud','bird','firefly'],moods:mood('#cfeccd','#7fbf6a'),rug:{mat:'#b2f2bb',c:['#2b8a3e','#e8590c','#ffd43b']},mat:'#ebfbee',page:'#ebfbee',say:'tent camp',is:'T is for tent!'},
 U:{name:'Up in the Clouds',ground:'snow',motif:'heart',far:['cloudmound','cloudmound','cloudmound','rainbow','cloudmound','cloudmound','cloudmound','cloudmound'],air:['hotair','bird','cloud','rainbow','hotair'],moods:mood('#a5d8ff','#f1f3f5','#ffffff'),rug:{mat:'#d0ebff',c:['#339af0','#ffffff','#ffd43b']},mat:'#f8f9fa',page:'#e7f5ff',say:'up in the clouds',is:'U is for up, up, up!'},
 V:{name:'Volcano Island',ground:'jungle',motif:'footprint',far:['volcano','palm','fern','rock','palm','fern','rock','palm'],air:['cloud','bird','cloud'],moods:mood('#ffe3e3','#94d82d'),rug:{mat:'#ffa8a8',c:['#e03131','#ffa94d','#2f9e44']},mat:'#fff5f5',page:'#fff5f5',say:'the volcano',is:'V is for volcano!'},
 W:{name:'Winter Wonderland',ground:'snow',motif:'snowflake',far:['snowpine','snowman','snowpine','igloo','snowpine','snowman','snowpine','mountain'],air:['cloud','snowfall','aurora'],moods:mood('#d6ecff','#eef6ff'),rug:{mat:'#d0ebff',c:['#339af0','#ffffff','#ff8787']},mat:'#f8f9fa',page:'#e7f5ff',say:'winter land',is:'W is for winter!'},
 X:{name:'X Marks the Spot',ground:'sand',motif:'shell',far:['chest','palm','xmark','shell','rock','palm','xmark','chest'],air:['gull','cloud','sun'],moods:mood('#bde9ff','#f2d6a6'),rug:{mat:'#ffe066',c:['#e03131','#1c7ed6','#2f9e44']},mat:'#fff9db',page:'#fff9db',say:'treasure beach, where X marks the spot',is:'X marks the spot!'},
 Y:{name:'Our Yard',ground:'grass',motif:'flower',far:['house','tree','fence','flower','bush','seesaw','tree','fence'],air:['cloud','butterfly','bird'],moods:mood('#d0ebff','#9ad86f'),rug:{mat:'#ffec99',c:['#fab005','#4dabf7','#69db7c']},mat:'#fff9db',page:'#fff9db',say:'the yard',is:'Y is for yard!'},
 Z:{name:'The Zoo',ground:'grass',motif:'footprint',far:['lion','giraffe','zebra','elephant','monkey','fence','tree','penguin'],air:['cloud','bird','sun'],moods:mood('#c5ecff','#a9e34b'),rug:{mat:'#d8f5a2',c:['#5c940d','#ffd43b','#ff922b']},mat:'#f4fce3',page:'#f4fce3',say:'the zoo',is:'Z is for zoo!'}};
P.WORLDS=P.WORLDS||{};Object.keys(W).forEach(k=>{P.WORLDS['k'+k]=W[k];});
const WOF={};P.kWorldOf=id=>WOF[id];
const goTo=(id,k)=>{WOF[id]=W[k];P.surprise=P.surprise||{};P.surprise[id]='k'+k;};
/* numbers, shapes, colours and stories each get a matching place (never the same as the lesson before) */
[['n1','G'],['n2','Y'],['n3','L'],['n4','J'],['n5','O'],['n6','A'],['n7','S'],['n8','H'],['n9','E'],['n10','F'],['scircle','M'],['ssquare','C'],['striangle','T'],['srectangle','Y'],['scolours','R'],
 ['t1','R'],['t2','L'],['t3','J'],['t4','S'],['t5','G'],['t6','Y'],['t7','F'],['t8','W']].forEach(([id,k])=>goTo(id,k));

/* ---------- more picture friends: each letter has seven, so no picture is used more than twice in a lesson ---------- */
const EX={A:['avocado','ambulance','alien'],B:['bee','boat','book'],C:['carrot','cookie','crab'],D:['dolphin','dinosaur','door'],E:['ear','eye','earth'],F:['flag','fire','fries'],G:['guitar','gorilla','glasses'],H:['hamburger','hedgehog','helicopter'],
  I:['ice skate','insect','ink'],J:['jeans','joystick','jigsaw'],K:['koala','kettle','knot'],L:['lollipop','lizard','lobster'],M:['milk','magnet','mango'],N:['nut','net','necktie'],O:['otter','olive','ocean'],P:['panda','pear','pencil'],Q:['quarter','quiet','quartz'],
  R:['rose','ring','rhino'],S:['sock','sandwich','sheep'],T:['tomato','teddy','taco'],U:['upside down','underwear','unlock'],V:['vest','volleyball','violet'],W:['watch','wolf','waffle'],X:['mailbox','ax','x-ray'],Y:['yawn','yummy','yes'],Z:['zipper','zap','zucchini']};
const NM=w=>({ufo:'UFO','x-ray':'X-ray'})[w]||w;
const cl=c=>COL[(c.charCodeAt(0)*3)%8];
const g=(custom,o)=>Object.assign({custom},o||{});
const sr=seed=>{let s=seed*9301+49297;return ()=>{s=(s*9301+49297)%233280;return s/233280;};};
const sshuf=(a,rnd)=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(rnd()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
const R2={rocket:(q,items,o)=>({q,set:g('rocket',Object.assign({items:shuffle(items)},o||{}))}),bowl:(q,items,o)=>({q,set:g('bowl',Object.assign({items:shuffle(items)},o||{}))}),train:(q,items,o)=>({q,set:g('train',Object.assign({items:shuffle(items)},o||{}))})};
Object.assign(R,R2);
/* no balloons in this book: balloon and bubble games become bowling */
const unBal=t=>String(t).replace(/^(\*?)balloon::([^:]+):(.*)$/,'$1paint:$2:$3').replace(/^(\*?)balloon:([^:]+):(.*)$/,'$1txt:$2:$3');
R.pop=R.bub=(q,items,o)=>R2.bowl(String(q).replace(/Pop the (bubbles|balloons) (with|that)/,'Bowling! Knock down the pins $2').replace(/Pop the (\*?[\w-]+\*?) (bubbles|balloons)/,'Bowling! Knock down the $1 pins').replace(/bubbles?|balloons?/g,'pins'),items.slice(0,6).map(unBal),o);

const FEED=['bear','monkey','hippo','lion','dog','cat','rabbit','elephant'];
const HOP=[['duck','pond'],['frog','pond'],['rabbit','carrot'],['chick','nest'],['penguin','igloo'],['puppy','house'],['kitten','basket']];
const HIDE=[['tree','house','tent','tree','mushroom','rock'],['house','tree','rock','tent','tree','mushroom'],['tent','tree','house','mushroom','rock','tree']];

P.KLETTERJ=function(L,i){const ch=L.ch,ex=(L.words||[]).slice(0,3),more=EX[ch]||[];const w=W[ch];const id='a'+ch;goTo(id,ch);const rnd=sr(i+7);
  const others=sshuf(AZ.filter(x=>x!==ch),rnd);const oth=(n,k)=>others.slice(k||0,(k||0)+n);
  /* things that do NOT start with the letter: each used once in the lesson */
  const notPool=sshuf(Object.keys(EX).filter(k=>k!==ch).map(k=>EX[k][(i+k.charCodeAt(0))%3]),rnd);let np=0;const nots=n=>notPool.slice(np,np+=n);
  const say=L.say||(ch+' is for '+L.item);const line=L.line||('*'+ch+'* is for *'+L.item+'*');const SW=L.sw||'start with';
  const seqLine=i===0?'A is the first letter!':i===25?'After Y comes Z. Z is the last letter!':'After '+AZ[i-1]+' comes '+ch+'!';
  const feeder=FEED[i%FEED.length],hop=HOP[i%HOP.length];
  const pool={
    path:()=>R.path('Help the '+hop[0]+' get to the '+hop[1]+'! Hop only on *'+ch+'*.',[],oth(10),{only:ch,who:hop[0],goal:hop[1],cols:5}),
    feed:()=>R.feed('Feed the hungry '+feeder+' the things that '+SW+' *'+ch+'*: '+NM(more[0])+' and '+NM(more[1])+'!',feeder,['*'+more[0],'*'+more[1]].concat(nots(3))),
    web:()=>R.web('Help the spider catch the things that '+SW+' *'+ch+'*!',['*'+more[0],'*'+more[2]].concat(nots(3)),{spiderSay:ch+'!'}),
    dots:()=>{const st0=Math.max(0,Math.min(i-4,21));const sq=AZ.slice(i<5?0:st0,(i<5?0:st0)+5);return R.dots('Join the dots in ABC order: *'+sq.join(', ')+'*. What will appear?',sq,more[1],{seed:i,col:cl(ch)});},
    fish:()=>R.fishing('Go fishing! Catch the fish with *'+ch+'*.',[ch,ch,ch].map(x=>'*'+x).concat(oth(3,10))),
    mem:()=>R.mem('Flip the cards. Find the matching letters!',[ch,others[13],others[14]].map((x,j)=>['txt:'+x+':'+COL[(j*3)%8],'txt:'+x+':'+COL[(j*3+4)%8]])),
    cups:()=>R.cups('Watch the cups! Where is *'+ch+'* hiding?','txt:'+ch+':'+cl(ch),oth(2,15).map((x,j)=>'txt:'+x+':'+COL[(j*3+i+2)%8]),{level:Math.floor(i/9),cupCol:['#ff8787','#74c0fc','#ffa94d','#b197fc'][i%4]}),
    shadow:()=>R.shadow('Which letter fits into the shadow?',['*txt:'+ch+':'+cl(ch)].concat(oth(2,17).map((x,j)=>'txt:'+x+':'+COL[(j*5+i)%8])),{big:1.1}),
    peek:()=>R.peek('Hide and seek! Find all three *'+ch+'*s.',[0,1,2].map(j=>'*txt:'+ch+':'+COL[(j*3+i)%8]).concat(oth(3,19).map((x,j)=>'txt:'+x+':'+COL[(j*3+i+1)%8])),{hide:HIDE[i%3]}),
    rocket:()=>R.rocket('Which rocket has *'+ch+'*? Tap it for blast off!',['*txt:'+ch+':'+cl(ch)].concat(oth(2,22).map((x,j)=>'txt:'+x+':'+COL[(j*3+1)%8]))),
    bowl:()=>R.bowl('Bowling! Knock down every pin with *'+ch+'*.',[0,1].map(j=>'*txt:'+ch+':'+COL[(j*4+i)%8]).concat(oth(3,4).map((x,j)=>'txt:'+x+':'+COL[(j*3+2)%8]))),
    train:()=>R.train('All aboard! Load the crates with *'+ch+'* onto the train.',[0,1,2].map(j=>'*txt:'+ch+':'+COL[(j*3+i)%8]).concat(oth(3,7).map((x,j)=>'txt:'+x+':'+COL[(j*3+5)%8])),{col:cl(ch)})};
  /* ten different games, a different mix and order every lesson */
  const all=Object.keys(pool);const pick=sshuf(all.filter(k=>k!=='path'),rnd).slice(0,9);const order=[pick[0],'path'].concat(pick.slice(1));
  const rounds=order.map(k=>pool[k]());
  const intro='Whoosh! '+w.is;
  U({id,title:'The letter '+ch,strand:'Letters',codes:['Literacy & Math'],
    guide:{goal:'Know the letter '+ch+' by name and shape, and link it to '+[L.item].concat(ex).join(', ')+'.',words:[L.item].concat(ex,more).join(', '),ask:['What letter is this?','What starts with '+ch+'?','Where did the magic book take us?'],home:'Hunt for '+ch+' at home: on cereal boxes, books and signs. Find something that starts with '+ch+'!'},
    watch:[ch+' for '+L.item+'!',say+'!'],fig:'A big 3D letter '+ch+' and '+L.item+'.',
    kid:{color:true,id:'c'+id,big:ch+ch.toLowerCase(),pic:L.item,line,words:ex.map(x=>[x,NM(x)])},page:{},
    steps:[{say:'Meet '+ch,hold:17000,speech:'Whoosh! The magic book took us to '+w.say+'! '+w.is+' And here comes the letter '+ch+'! '+say+'! Who else '+SW+' '+ch+'? '+ex.map(NM).join(', ')+'!',
        set:g('show',{i,big:ch,item:L.item,words:ex,col:cl(ch),line:ch+' is for '+L.item,intro,face:true})},
      {say:'Where is '+ch+'?',hold:10000,speech:'All the letters are hiding in little boxes! '+(i?('We already found '+AZ.slice(0,i).join(', ')+'. '):'')+'Which one is next? Out comes '+ch+'! '+seqLine,set:g('abc',{idx:i,col:cl(ch),line:seqLine})},
      {say:'Colour time!',kc:true,speech:'Colour time! Pick a crayon, then tap the letter '+ch+', the '+L.item+' and the pictures to colour them in.',set:g('show',{i,big:ch,item:L.item,words:ex,col:cl(ch),line:ch+' is for '+L.item,still:true})}],
    rounds,tries:[['Say it: '+ch+' is for '+L.item+'.','Can you think of another '+ch+' word?'],['Draw '+L.item+'.','Write a big '+ch+' beside it!']]});};
})();
