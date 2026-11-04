/* The Interactive Classroom: Grade 1 Math — shared kit.
   One small toy box (3D) with a matching picture set (2D page drawings), so every example on the page
   looks like the thing the model shows. All art is original and drawn in code. */
(function(){
"use strict";
const P=window.PM;if(!P||P.failed||!P.THREE)return;
const {THREE,V,G,lam,mk,label,starGeo,clearGroup,rr,T,wrap,FT,ZS,X0,TW,INK,tint,A,hop,tween,easeOut}=P;

const rnd=(a,b)=>a+Math.floor(Math.random()*(b-a+1)),pick=a=>a[Math.floor(Math.random()*a.length)],shuffle=a=>{const b=a.slice();for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]];}return b;};
const ONES=['zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'];
const TENS=['','','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety'];
const words=n=>n===100?'one hundred':n<20?ONES[n]:TENS[Math.floor(n/10)]+(n%10?'-'+ONES[n%10]:'');
const ORD=['','1st','2nd','3rd','4th','5th','6th','7th','8th','9th','10th'];
const ORDW=['','first','second','third','fourth','fifth','sixth','seventh','eighth','ninth','tenth'];
/* answer buttons in the dock: right answer solves the round, wrong answer gives a hint */
function choices(game,list,ans,ok,lab,hint){return list.map(o=>({t:lab?lab(o):String(o),big:true,fn:()=>{if(String(o)===String(ans)){if(game)game.solved(ok);else A.good(ok);}else A.bad(hint||'Not quite. Try again!');}}));}
function nearby(ans,lo,hi,k){const s=new Set([ans]);let guard=0;while(s.size<(k||3)&&guard++<60){const v=ans+pick([-2,-1,1,2,3,-3]);if(v>=lo&&v<=hi)s.add(v);}return shuffle([...s]);}

/* ---------------- 3D toy box ---------------- */
const sph=(r,c)=>mk(G('k_s'+r,()=>new THREE.SphereGeometry(r,20,14)),lam(c),0);
const cyl=(a,b,h,c,n)=>mk(G('k_c'+a+'_'+b+'_'+h+'_'+(n||20),()=>new THREE.CylinderGeometry(a,b,h,n||20)),lam(c),0);
const bx=(x,y,z,c,th)=>mk(G('k_b'+x+'_'+y+'_'+z,()=>new THREE.BoxGeometry(x,y,z)),lam(c),th===0?0:20);
const cone=(r,h,c,n)=>mk(G('k_k'+r+'_'+h+'_'+(n||18),()=>new THREE.ConeGeometry(r,h,n||18)),lam(c),0);
function at(m,x,y,z,sx,sy,sz){m.position.set(x,y,z);if(sx!=null)m.scale.set(sx,sy==null?sx:sy,sz==null?sx:sz);return m;}
const TOYS={
 apple(g,c){g.add(at(sph(.15,c||'#e53935'),0,.15,0,1,.92,1));g.add(at(cyl(.012,.012,.08,'#6d4c41',6),0,.31,0));const l=at(sph(.05,'#43a047'),.05,.32,0,1,.4,.6);l.rotation.z=-.5;g.add(l);},
 pear(g,c){g.add(at(sph(.14,c||'#c0ca33'),0,.14,0));g.add(at(sph(.09,c||'#c0ca33'),0,.3,0));g.add(at(cyl(.01,.01,.07,'#6d4c41',6),0,.42,0));},
 strawberry(g,c){const b=at(cone(.13,.26,c||'#e53935'),0,.15,0);b.rotation.x=Math.PI;g.add(b);g.add(at(cone(.1,.06,'#43a047',6),0,.3,0));
   [[.05,.12,.09],[-.05,.18,.08],[0,.1,.1],[.07,.2,.04]].forEach(([x,y,z])=>g.add(at(sph(.012,'#fff59d'),x,y,z)));},
 carrot(g){const b=at(cone(.07,.34,'#fb8c00'),0,.08,0);b.rotation.z=Math.PI/2;g.add(b);[-.03,0,.03].forEach((z,i)=>{const l=at(cone(.025,.12,'#43a047',6),.21,.1,z);l.rotation.z=-Math.PI/2+(i-1)*.3;g.add(l);});},
 cupcake(g,c){g.add(at(cyl(.13,.1,.14,c||'#f48fb1'),0,.07,0));g.add(at(sph(.14,'#fff3e0'),0,.17,0,1,.7,1));g.add(at(sph(.04,'#e53935'),0,.28,0));},
 cookie(g){g.add(at(cyl(.15,.15,.05,'#d39b5a'),0,.025,0));[[.05,.04],[-.06,-.02],[0,-.07],[-.02,.07]].forEach(([x,z])=>g.add(at(sph(.022,'#5d4037'),x,.05,z)));},
 donut(g,c){const t=mk(G('k_tor',()=>new THREE.TorusGeometry(.11,.055,12,24)),lam('#d7a15e'),0);t.rotation.x=Math.PI/2;t.position.y=.06;g.add(t);const t2=mk(G('k_tor2',()=>new THREE.TorusGeometry(.11,.045,10,24)),lam(c||'#f06292'),0);t2.rotation.x=Math.PI/2;t2.position.y=.085;g.add(t2);},
 star(g,c){const s=mk(starGeo,lam(c||'#ffc107'),20);s.scale.setScalar(.62);s.position.y=.22;g.add(s);},
 ball(g,c){g.add(at(sph(.15,c||'#2f7de1'),0,.15,0));const r=mk(G('k_band',()=>new THREE.TorusGeometry(.151,.022,8,32)),lam('#ffffff'),0);r.position.y=.15;r.rotation.y=.6;g.add(r);},
 duck(g,c){g.add(at(sph(.14,c||'#ffd54f'),0,.13,0,1.2,.9,1));g.add(at(sph(.09,c||'#ffd54f'),.12,.28,0));const b=at(cone(.035,.09,'#fb8c00',8),.23,.27,0);b.rotation.z=-Math.PI/2;g.add(b);
   [-1,1].forEach(s=>g.add(at(sph(.016,INK),.17,.31,s*.05)));},
 fish(g,c){g.add(at(sph(.13,c||'#ff8a3d'),0,.15,0,1.4,.9,.55));const t=at(cone(.09,.13,c||'#ff8a3d',4),-.22,.15,0);t.rotation.z=Math.PI/2;g.add(t);[-1,1].forEach(s=>g.add(at(sph(.02,INK),.12,.18,s*.065)));},
 ladybug(g){g.add(at(sph(.14,'#e53935'),0,.06,0,1,.75,1.15));g.add(at(sph(.065,INK),0,.07,.15));[[.06,.13,.03],[-.06,.13,.03],[.07,.11,-.07],[-.07,.11,-.07],[0,.16,-.02]].forEach(([x,y,z])=>g.add(at(sph(.022,INK),x,y,z)));},
 turtle(g){g.add(at(sph(.15,'#43a047'),0,.05,0,1,.6,1.2));g.add(at(sph(.055,'#9ccc65'),0,.08,.2));[[.1,.12],[-.1,.12],[.1,-.12],[-.1,-.12]].forEach(([x,z])=>g.add(at(sph(.035,'#9ccc65'),x,.03,z)));},
 flower(g,c){g.add(at(cyl(.012,.012,.3,'#43a047',6),0,.15,0));const h=new THREE.Group();h.position.y=.32;h.rotation.x=-.5;g.add(h);
   for(let i=0;i<6;i++){const a=i*Math.PI/3;h.add(at(sph(.055,c||'#f06292'),Math.cos(a)*.07,Math.sin(a)*.07,0,1,1,.45));}h.add(at(sph(.045,'#ffd54f'),0,0,.02,1,1,.6));},
 leaf(g,c){const l=at(sph(.15,c||'#7cb342'),0,.03,0,.6,.15,1.1);l.rotation.y=.5;g.add(l);},
 car(g,c){g.add(at(bx(.36,.1,.2,c||'#e53935'),0,.1,0));g.add(at(bx(.2,.09,.18,c||'#e53935'),-.02,.19,0));
   [[.11,.1],[-.11,.1],[.11,-.1],[-.11,-.1]].forEach(([x,z])=>{const w=at(cyl(.045,.045,.03,INK,14),x,.05,z);w.rotation.x=Math.PI/2;g.add(w);});},
 balloon(g,c){g.add(at(sph(.13,c||'#ef5350'),0,.42,0,1,1.18,1));g.add(at(cyl(.004,.004,.3,'#90a4ae',4),0,.15,0));g.add(at(cone(.025,.03,c||'#ef5350',8),0,.26,0));},
 block(g,c){g.add(at(bx(.24,.24,.24,c||'#8b5cf6'),0,.12,0));},
 acorn(g){g.add(at(sph(.1,'#a1663a'),0,.12,0,1,1.25,1));g.add(at(sph(.105,'#6d4c41'),0,.2,0,1,.55,1));g.add(at(cyl(.012,.012,.05,'#5d4037',6),0,.27,0));},
 kite(g,c){const k=mk(G('k_kite',()=>new THREE.OctahedronGeometry(.17,0)),lam(c||'#26a69a'),20);k.scale.set(1,1.3,.15);k.position.y=.32;g.add(k);g.add(at(cyl(.004,.004,.2,'#90a4ae',4),0,.08,0));},
 shell(g,c){const t=mk(G('k_shell',()=>new THREE.ConeGeometry(.13,.12,10,1,true)),new THREE.MeshLambertMaterial({color:c||'#ffccbc',side:THREE.DoubleSide}),0);t.position.y=.07;g.add(t);g.add(at(sph(.05,c||'#ffccbc'),0,.03,.1));},
 crayon(g,c){const b=at(cyl(.035,.035,.32,c||'#2f7de1',10),0,.04,0);b.rotation.z=Math.PI/2;g.add(b);const t=at(cone(.035,.07,c||'#2f7de1',10),.195,.04,0);t.rotation.z=-Math.PI/2;g.add(t);},
 mitten(g,c){g.add(at(bx(.2,.06,.26,c||'#5c6bc0'),0,.03,0));g.add(at(bx(.08,.06,.1,c||'#5c6bc0'),.13,.03,.04));g.add(at(bx(.22,.07,.05,'#ffffff',0),0,.035,-.13));},
 bell(g,c){g.add(at(cone(.13,.22,c||'#ffb300',20),0,.13,0));g.add(at(sph(.035,'#8d6e63'),0,.02,0));g.add(at(sph(.03,c||'#ffb300'),0,.26,0));}
};
const KINDS=Object.keys(TOYS);
/* name each toy the way a child says it: one / many */
const NAME={apple:['apple','apples'],pear:['pear','pears'],strawberry:['strawberry','strawberries'],carrot:['carrot','carrots'],cupcake:['cupcake','cupcakes'],cookie:['cookie','cookies'],donut:['donut','donuts'],
 star:['star','stars'],ball:['ball','balls'],duck:['duck','ducks'],fish:['fish','fish'],ladybug:['ladybug','ladybugs'],turtle:['turtle','turtles'],flower:['flower','flowers'],leaf:['leaf','leaves'],car:['car','cars'],
 balloon:['balloon','balloons'],block:['block','blocks'],acorn:['acorn','acorns'],kite:['kite','kites'],shell:['shell','shells'],crayon:['crayon','crayons'],mitten:['mitten','mittens'],bell:['bell','bells']};
const nm=(k,n)=>(NAME[k]||[k,k+'s'])[n===1?0:1];
function toy(kind,o){o=o||{};const g=new THREE.Group();(TOYS[kind]||TOYS.block)(g,o.c);g.userData.kind=kind;if(o.s)g.scale.setScalar(o.s);return g;}
/* lay n toys out in tidy rows; returns the toys (left to right, front row last) */
function lay(grp,kind,n,o){o=o||{};const cols=o.cols||5,gap=o.gap||.4,x0=o.x==null?0:o.x,z0=o.z==null?-1.8:o.z,out=[];const rows=Math.ceil(n/cols);
  for(let i=0;i<n;i++){const r=Math.floor(i/cols),k=i%cols,inRow=Math.min(cols,n-r*cols);const t=toy(kind,{c:o.c&&(Array.isArray(o.c)?o.c[i%o.c.length]:o.c),s:o.s});
    t.position.set(x0+(k-(inRow-1)/2)*gap,o.y||0,z0+(r-(rows-1)/2)*gap*(o.zgap||1));if(o.rot)t.rotation.y=o.rot;grp.add(t);out.push(t);}return out;}
/* a red X over a toy (crossed out = taken away) */
function crossOut(t,on){if(on===false){if(t.userData.x){t.remove(t.userData.x);t.userData.x=null;}return;}if(t.userData.x)return;const x=new THREE.Group();
  [1,-1].forEach(s=>{const b=mk(G('k_x',()=>new THREE.BoxGeometry(.4,.05,.06)),lam('#d32f2f'),0);b.rotation.y=s*Math.PI/4;x.add(b);});x.position.y=.42;t.add(x);t.userData.x=x;}
function popIn(o,d){const s=o.scale.x||1;o.scale.setScalar(.01);return tween(d||.3,k=>o.scale.setScalar(.01+(s-.01)*k),easeOut);}
function tapOn(o,fn){A.drag(o,{tap:()=>fn(o)});return o;}
function tag(text,o){return label(text,Object.assign({size:.3,bg:'#ffffff'},o||{}));}
/* a floating sentence card, e.g. "5 + 2 = 7" */
function card(grp,text,x,y,z,o){const l=label(text,Object.assign({size:.42,bg:'#ffffff',border:P.ACC},o||{}));l.position.set(x,y,z);grp.add(l);return l;}
/* a soft mat to stand toys on */
function mat(grp,w,d,x,z,c){const m=mk(new THREE.BoxGeometry(w,.03,d),lam(c||'#fff7e0'),20);m.position.set(x||0,.015,z==null?-1.8:z);grp.add(m);return m;}
/* number tiles in a row (a number path the bunny hops on) */
function tileTex(n,hi){const c=document.createElement('canvas');c.width=c.height=128;const g=c.getContext('2d');g.fillStyle=hi||'#ffffff';g.fillRect(0,0,128,128);g.strokeStyle='#c9cfdc';g.lineWidth=6;g.strokeRect(3,3,122,122);
  g.fillStyle=INK;g.font='700 '+(String(n).length>2?54:68)+'px "Zilla Slab", Georgia, serif';g.textAlign='center';g.textBaseline='middle';g.fillText(String(n),64,70);const t=new THREE.CanvasTexture(c);t.anisotropy=4;return t;}
function tile(n,w,hi,blank){const side=lam('#e2e8f0');const top=new THREE.MeshLambertMaterial({map:tileTex(blank?'?':n,blank?'#fff3c4':hi)});const m=mk(new THREE.BoxGeometry(w,.08,w),[side,side,top,side,side,side],20);m.userData.n=n;return m;}
function bunny(c){const g=new THREE.Group();c=c||'#f5f5f5';g.add(at(sph(.13,c),0,.13,0,1,.95,1.1));g.add(at(sph(.09,c),0,.28,.07));
  [-1,1].forEach(s=>{const e=at(sph(.03,c),s*.04,.42,.05,1,3,.8);e.rotation.z=s*.15;g.add(e);g.add(at(sph(.016,INK),s*.04,.3,.15));});g.add(at(sph(.018,'#f48fb1'),0,.27,.16));g.add(at(sph(.04,'#ffffff'),0,.12,-.14));g.userData.kind='bunny';return g;}

/* ---------------- 2D pictures for the page ---------------- */
function ell(g,x,y,rx,ry,c,rot){g.beginPath();g.ellipse(x,y,rx,ry,rot||0,0,Math.PI*2);g.fillStyle=c;g.fill();}
function line(g,pts,c,w){g.beginPath();g.moveTo(pts[0],pts[1]);for(let i=2;i<pts.length;i+=2)g.lineTo(pts[i],pts[i+1]);g.strokeStyle=c;g.lineWidth=w||3;g.lineCap='round';g.stroke();}
function poly(g,pts,c,stroke){g.beginPath();g.moveTo(pts[0],pts[1]);for(let i=2;i<pts.length;i+=2)g.lineTo(pts[i],pts[i+1]);g.closePath();g.fillStyle=c;g.fill();if(stroke){g.strokeStyle=stroke;g.lineWidth=2;g.stroke();}}
const OUT='rgba(27,34,54,.55)';
function outline(g){g.strokeStyle=OUT;g.lineWidth=2;g.stroke();}
const ICON={
 apple(g,x,y,s,c){ell(g,x,y+s*.06,s*.42,s*.4,c||'#e53935');g.beginPath();g.ellipse(x,y+s*.06,s*.42,s*.4,0,0,7);outline(g);line(g,[x,y-s*.3,x+s*.04,y-s*.46],'#6d4c41',s*.06);ell(g,x+s*.14,y-s*.38,s*.12,s*.06,'#43a047',-.5);},
 pear(g,x,y,s,c){ell(g,x,y+s*.15,s*.36,s*.32,c||'#c0ca33');ell(g,x,y-s*.16,s*.22,s*.24,c||'#c0ca33');line(g,[x,y-s*.38,x+s*.03,y-s*.5],'#6d4c41',s*.05);},
 strawberry(g,x,y,s,c){poly(g,[x-s*.36,y-s*.2,x+s*.36,y-s*.2,x,y+s*.45],c||'#e53935',OUT);ell(g,x,y-s*.24,s*.26,s*.09,'#43a047');[[-.12,0],[.1,.02],[0,.18],[-.04,-.08]].forEach(([a,b])=>ell(g,x+a*s,y+b*s,s*.03,s*.03,'#fff59d'));},
 carrot(g,x,y,s){poly(g,[x-s*.45,y-s*.1,x-s*.45,y+s*.12,x+s*.42,y],'#fb8c00',OUT);[-.12,0,.12].forEach(a=>line(g,[x-s*.45,y,x-s*.62,y+a*s*1.6],'#43a047',s*.07));},
 cupcake(g,x,y,s,c){poly(g,[x-s*.34,y,x+s*.34,y,x+s*.26,y+s*.4,x-s*.26,y+s*.4],c||'#f48fb1',OUT);ell(g,x,y-s*.04,s*.4,s*.24,'#fff3e0');g.beginPath();g.ellipse(x,y-s*.04,s*.4,s*.24,0,Math.PI,0);outline(g);ell(g,x,y-s*.3,s*.08,s*.08,'#e53935');},
 cookie(g,x,y,s){ell(g,x,y,s*.42,s*.42,'#d39b5a');g.beginPath();g.ellipse(x,y,s*.42,s*.42,0,0,7);outline(g);[[-.15,-.1],[.12,-.15],[.05,.15],[-.12,.16],[.2,.06]].forEach(([a,b])=>ell(g,x+a*s,y+b*s,s*.05,s*.05,'#5d4037'));},
 donut(g,x,y,s,c){ell(g,x,y,s*.44,s*.44,'#d7a15e');ell(g,x,y-s*.02,s*.38,s*.36,c||'#f06292');ell(g,x,y,s*.13,s*.13,'#ffffff');},
 star(g,x,y,s,c){g.beginPath();for(let i=0;i<10;i++){const r=(i%2?.2:.46)*s,a=-Math.PI/2+i*Math.PI/5;i?g.lineTo(x+Math.cos(a)*r,y+Math.sin(a)*r):g.moveTo(x+Math.cos(a)*r,y+Math.sin(a)*r);}g.closePath();g.fillStyle=c||'#ffc107';g.fill();outline(g);},
 ball(g,x,y,s,c){ell(g,x,y,s*.42,s*.42,c||'#2f7de1');g.beginPath();g.ellipse(x,y,s*.42,s*.42,0,0,7);outline(g);g.beginPath();g.ellipse(x,y,s*.42,s*.12,.5,0,7);g.strokeStyle='#ffffff';g.lineWidth=s*.07;g.stroke();},
 duck(g,x,y,s,c){ell(g,x-s*.06,y+s*.12,s*.36,s*.26,c||'#ffd54f');ell(g,x+s*.2,y-s*.18,s*.18,s*.18,c||'#ffd54f');poly(g,[x+s*.34,y-s*.2,x+s*.5,y-s*.14,x+s*.34,y-s*.1],'#fb8c00');ell(g,x+s*.24,y-s*.22,s*.03,s*.03,INK);},
 fish(g,x,y,s,c){ell(g,x+s*.06,y,s*.34,s*.22,c||'#ff8a3d');poly(g,[x-s*.24,y,x-s*.46,y-s*.2,x-s*.46,y+s*.2],c||'#ff8a3d',OUT);g.beginPath();g.ellipse(x+s*.06,y,s*.34,s*.22,0,0,7);outline(g);ell(g,x+s*.24,y-s*.05,s*.04,s*.04,INK);},
 ladybug(g,x,y,s){ell(g,x,y-s*.3,s*.16,s*.13,INK);ell(g,x,y+s*.04,s*.36,s*.38,'#e53935');g.beginPath();g.ellipse(x,y+s*.04,s*.36,s*.38,0,0,7);outline(g);line(g,[x,y-s*.3,x,y+s*.42],INK,2);[[-.17,-.06],[.17,-.06],[-.14,.2],[.14,.2]].forEach(([a,b])=>ell(g,x+a*s,y+b*s,s*.06,s*.06,INK));},
 turtle(g,x,y,s){ell(g,x+s*.36,y+s*.02,s*.12,s*.1,'#9ccc65');[[-.22,.22],[.22,.22]].forEach(([a,b])=>ell(g,x+a*s,y+b*s,s*.08,s*.06,'#9ccc65'));ell(g,x,y,s*.34,s*.24,'#43a047');g.beginPath();g.ellipse(x,y,s*.34,s*.24,0,0,7);outline(g);line(g,[x-s*.15,y-s*.1,x+s*.15,y+s*.1],'#2e7d32',2);line(g,[x-s*.15,y+s*.1,x+s*.15,y-s*.1],'#2e7d32',2);},
 flower(g,x,y,s,c){line(g,[x,y,x,y+s*.48],'#43a047',s*.06);for(let i=0;i<6;i++){const a=i*Math.PI/3;ell(g,x+Math.cos(a)*s*.17,y-s*.1+Math.sin(a)*s*.17,s*.13,s*.13,c||'#f06292');}ell(g,x,y-s*.1,s*.11,s*.11,'#ffd54f');},
 leaf(g,x,y,s,c){ell(g,x,y,s*.42,s*.2,c||'#7cb342',-.5);line(g,[x-s*.36,y+s*.2,x+s*.34,y-s*.18],'#558b2f',2);},
 car(g,x,y,s,c){rr(g,x-s*.46,y-s*.06,s*.92,s*.26,s*.06);g.fillStyle=c||'#e53935';g.fill();outline(g);rr(g,x-s*.24,y-s*.28,s*.44,s*.24,s*.06);g.fillStyle=c||'#e53935';g.fill();outline(g);
   rr(g,x-s*.18,y-s*.23,s*.15,s*.14,3);rr(g,x+.02*s,y-s*.23,s*.14,s*.14,3);g.fillStyle='#bbdefb';g.fill();[-.26,.26].forEach(a=>{ell(g,x+a*s,y+s*.22,s*.1,s*.1,INK);});},
 balloon(g,x,y,s,c){line(g,[x,y+s*.18,x+s*.05,y+s*.5],'#90a4ae',2);ell(g,x,y-s*.08,s*.3,s*.36,c||'#ef5350');g.beginPath();g.ellipse(x,y-s*.08,s*.3,s*.36,0,0,7);outline(g);ell(g,x-s*.1,y-s*.2,s*.06,s*.1,'rgba(255,255,255,.6)');},
 block(g,x,y,s,c){rr(g,x-s*.36,y-s*.36,s*.72,s*.72,s*.06);g.fillStyle=c||'#8b5cf6';g.fill();outline(g);},
 acorn(g,x,y,s){ell(g,x,y+s*.1,s*.24,s*.3,'#a1663a');ell(g,x,y-s*.14,s*.3,s*.16,'#6d4c41');line(g,[x,y-s*.28,x+s*.04,y-s*.42],'#5d4037',s*.05);},
 kite(g,x,y,s,c){poly(g,[x,y-s*.46,x+s*.3,y-s*.06,x,y+s*.3,x-s*.3,y-s*.06],c||'#26a69a',OUT);line(g,[x,y+s*.3,x-s*.1,y+s*.42,x+s*.06,y+s*.5],'#90a4ae',2);},
 shell(g,x,y,s,c){g.beginPath();g.moveTo(x,y+s*.36);for(let i=0;i<=8;i++){const a=Math.PI+i*Math.PI/8;g.lineTo(x+Math.cos(a)*s*.42,y+Math.sin(a)*s*.42+s*.1);}g.closePath();g.fillStyle=c||'#ffccbc';g.fill();outline(g);
   for(let i=1;i<8;i+=2){const a=Math.PI+i*Math.PI/8;line(g,[x,y+s*.36,x+Math.cos(a)*s*.4,y+Math.sin(a)*s*.4+s*.1],'rgba(27,34,54,.35)',1.5);}},
 crayon(g,x,y,s,c){rr(g,x-s*.42,y-s*.08,s*.7,s*.16,4);g.fillStyle=c||'#2f7de1';g.fill();outline(g);poly(g,[x+s*.28,y-s*.08,x+s*.46,y,x+s*.28,y+s*.08],c||'#2f7de1',OUT);},
 mitten(g,x,y,s,c){rr(g,x-s*.22,y-s*.32,s*.4,s*.6,s*.18);g.fillStyle=c||'#5c6bc0';g.fill();outline(g);ell(g,x+s*.24,y-s*.02,s*.1,s*.16,c||'#5c6bc0',.4);rr(g,x-s*.24,y+s*.22,s*.44,s*.12,4);g.fillStyle='#ffffff';g.fill();outline(g);},
 bell(g,x,y,s,c){g.beginPath();g.moveTo(x-s*.36,y+s*.26);g.quadraticCurveTo(x-s*.3,y-s*.4,x,y-s*.38);g.quadraticCurveTo(x+s*.3,y-s*.4,x+s*.36,y+s*.26);g.closePath();g.fillStyle=c||'#ffb300';g.fill();outline(g);ell(g,x,y+s*.3,s*.07,s*.07,'#8d6e63');},
 heart(g,x,y,s,c){g.beginPath();g.moveTo(x,y+s*.36);g.bezierCurveTo(x-s*.6,y-s*.05,x-s*.25,y-s*.5,x,y-s*.16);g.bezierCurveTo(x+s*.25,y-s*.5,x+s*.6,y-s*.05,x,y+s*.36);g.fillStyle=c||'#ec407a';g.fill();outline(g);}
};
function icon(g,kind,x,y,s,c){(ICON[kind]||ICON.block)(g,x,y,s,c);}
function xMark(g,x,y,s){line(g,[x-s*.38,y-s*.38,x+s*.38,y+s*.38],'#d32f2f',s*.11);line(g,[x+s*.38,y-s*.38,x-s*.38,y+s*.38],'#d32f2f',s*.11);}
/* a row (or block) of pictures; crossed = how many at the end are crossed out */
function icons(g,kind,n,x,y,s,o){o=o||{};const cols=o.cols||n,gap=o.gap||s*1.12;for(let i=0;i<n;i++){const cx=x+(i%cols)*gap+s/2,cy=y+Math.floor(i/cols)*gap+s/2;icon(g,kind,cx,cy,s,o.c&&(Array.isArray(o.c)?o.c[i%o.c.length]:o.c));if(o.crossed&&i>=n-o.crossed)xMark(g,cx,cy,s);}
  return {w:Math.min(n,cols)*gap,h:Math.ceil(n/cols)*gap};}
/* the theory box: dashed frame like a workbook "remember" box */
function tbox(p,y,h,title){P.box(p,y,h,title);return y+70;}
/* an example card with a number badge */
function exCard(p,x,y,w,h,n,c){const g=p.g;rr(g,x,y,w,h,16);g.fillStyle='#ffffff';g.fill();g.lineWidth=2;g.strokeStyle='rgba(27,34,54,.14)';g.stroke();
  if(n!=null){g.beginPath();g.arc(x+26,y+26,17,0,Math.PI*2);g.fillStyle=c||P.ACC;g.fill();T(g,String(n),x+26,y+33,FT.smallB,'#fff','center');}}
/* two-column grid of example cards: fill(i,x,y,w,h) draws inside */
function exGrid(p,y,n,h,fill,o){o=o||{};const cols=o.cols||2,gap=18,w=(TW-gap*(cols-1))/cols;for(let i=0;i<n;i++){const x=X0+(i%cols)*(w+gap),yy=y+Math.floor(i/cols)*(h+gap);exCard(p,x,yy,w,h,o.num===false?null:i+1);fill(i,x,yy,w,h);}return y+Math.ceil(n/cols)*(h+gap);}
function bigText(g,t,x,y,size,c,al){T(g,t,x,y,ZS(size||40),c||INK,al||'left');}
function hand(g,t,x,y,c,al){T(g,t,x,y,FT.hand,c||INK,al||'left');}
function sub(p,y,t){const g=p.g;T(g,t,X0,y+30,FT.h3,INK);return y+50;}

function tries(p,S,y,list){list.forEach(([q,a],i)=>{if(y+200<1310)y=P.tryIt(p,y+30,S,'try'+i,i+1,q,a);});return y;}
const TRIES={"num10": [["What comes before 10?", "*9*"], ["3 more than 6 is?", "*9*: 7, 8, 9"], ["Count back from 8 to 4.", "*8, 7, 6, 5, 4*"]], "plus1": [["7 and 1 make ___", "*8*"], ["5 take away 1 leaves ___", "*4*"], ["9 birds. 1 flies away. How many are left?", "*8* birds are left."]], "facts6": [["2 + 4 = ___", "*6*"], ["5 − 3 = ___", "*2*"], ["Ana has 3 kites. She gets 3 more. How many in all?", "3 + 3 = *6* kites"]], "facts10": [["Count on: 7 + 3 = ___", "*10*: 8, 9, 10"], ["Count back: 9 − 2 = ___", "*7*: 8, 7"], ["10 crayons. 4 broke. How many are not broken?", "10 − 4 = *6*"]], "zero1": [["6 + 0 = ___", "*6*"], ["8 − 8 = ___", "*0*"], ["\"How many are left?\" Add or subtract?", "*Subtract*: \"left\" means take away."]], "shapes2d": [["How many corners does a hexagon have?", "*6* corners"], ["I have 4 sides and 4 corners. My sides are all the same. What am I?", "A *square*."]], "shapes2": [["Is the letter A symmetrical?", "*Yes*: both halves match."], ["A sandwich is cut into 4 equal parts. Each part is?", "*one fourth*"]], "solids": [["What solid does a ball look like?", "A *sphere*."], ["Which solid can stack and slide, but not roll?", "A *cube* (or a prism)."]], "where1": [["Your teacher is at the front of the line. Is she in front of you or behind you?", "*In front of* you."], ["Which hand do you hold up to make an L?", "Your *left* hand."]], "where2": [["Where are your feet when you sit at a table?", "*Under* the table."], ["Where is a fish in a fish bowl?", "*Inside* the bowl."]], "compare1": [["Which is longer, a pencil or a crayon?", "A *pencil* is usually longer."], ["Put in order, shortest to tallest: giraffe, cat, horse.", "*cat, horse, giraffe*"], ["Kim is taller than Ben. Ben is taller than Ali. Who is tallest?", "*Kim* is the tallest."]], "compare2": [["Which is heavier: a watermelon or a grape?", "The *watermelon* is heavier."], ["Which is thicker: a dictionary or a comic book?", "The *dictionary*."], ["Pond A has 4 frogs, pond B has 7. Which has fewer?", "*Pond A* has fewer."]], "order1": [["Which one does not belong: bus, car, banana, truck?", "*banana*: the others are things that drive."], ["Sort these two ways: big red ball, small blue ball, big blue ball.", "By *size* (big, small) or by *colour* (red, blue)."]], "seq1": [["What comes after 4th?", "*5th* (fifth)."], ["Morning: brush teeth, wake up, eat breakfast. Put them in order.", "*wake up, eat breakfast, brush teeth*"], ["In a line of 6, who is last?", "The *6th* one."]], "temp1": [["Which season comes after summer?", "*Fall*"], ["It is 28 °C. Hot, mild or cold?", "*Hot*"]], "time1": [["What day comes after Wednesday?", "*Thursday*"], ["Where is the long hand at 4 o’clock?", "On the *12*."]], "units1": [["A book is 5 erasers long. Is that its length?", "Yes: *about 5 erasers* long."], ["Why must the units have no gaps?", "*Gaps* would make the count wrong."]], "capacity1": [["Which holds more: a bathtub or a cup?", "The *bathtub*."], ["A jug holds 6 cups. A pot holds 9 cups. Which holds more?", "The *pot*: 9 is more than 6."]], "mass1": [["The left side of the balance is down. Which side is heavier?", "The *left* side."], ["An apple is 3 blocks. A pear is 2 blocks. Which is heavier?", "The *apple*."]], "patterns1": [["What comes next: red, blue, blue, red, blue, blue, ___", "*red*"], ["Find the core: clap, clap, stomp, clap, clap, stomp", "*clap, clap, stomp*"]], "data1": [["How many tally marks for 6?", "*One bundle of 5 and 1 more*"], ["7 dogs, 4 cats. How many more dogs?", "7 − 4 = *3* more"]], "picto1": [["In a pictograph, what does each picture stand for?", "*One* thing (or one person)."], ["Apples 5, pears 3. How many altogether?", "5 + 3 = *8*"]], "cgraph1": [["Which column shows the most?", "The *tallest* column."], ["Walk 4, bus 6. How many more take the bus?", "6 − 4 = *2*"]], "chance1": [["A pig will fly. Impossible, unlikely, likely or certain?", "*Impossible*"], ["Tomorrow will come after today.", "*Certain*"]], "num20": [["What comes after 17?", "*18*"], ["Is 15 even or odd?", "*Odd*: it ends in 5."], ["Order from least: 16, 11, 19", "*11, 16, 19*"]], "num100": [["How many tens and ones in 58?", "*5 tens and 8 ones*"], ["What is 10 more than 34?", "*44*: go down one row."], ["Which is greater, 71 or 17?", "*71*: 7 tens beat 1 ten."]], "skip1": [["Count by 2s: 12, 14, 16, ___", "*18*"], ["Count by 5s: 35, 40, 45, ___", "*50*"], ["How many fingers on 4 hands?", "5, 10, 15, 20: *20*"]], "money1": [["How much are 2 dimes?", "10, 20: *20¢*"], ["Which coin is worth one dollar?", "The *loonie*."], ["A toy costs 6¢. You pay 10¢. Change?", "10¢ − 6¢ = *4¢*"]]};
/* practice page warm-up: workbook-style questions with lift-the-flap answers */
{const reg=P.lesson;P.lesson=function(d){const lf=d.left;if(lf&&TRIES[d.id])d.left=function(p,S){const y=lf(p,S);if(typeof y==='number'&&y<1110)tries(p,S,y,TRIES[d.id].slice(0,1));return y;};return reg.call(P,d);};}
P.practiceMore=function(L,p,S,y){const list=TRIES[L.id];if(!list||y>1080)return;P.T(p.g,'Warm up: try it!',X0,y+34,FT.h3,INK);tries(p,S,y+56,list);};
function stage(grp,dz){const g=new THREE.Group();g.position.z=dz==null?1.0:dz;g.scale.setScalar(1.08);grp.add(g);return g;}
P.K={tries,stage,rnd,pick,shuffle,words,ORD,ORDW,choices,nearby,TOYS,KINDS,NAME,nm,toy,lay,crossOut,popIn,tapOn,tag,card,mat,tile,tileTex,bunny,sph,cyl,bx,cone,at,
  icon,icons,xMark,ICON,ell,line,poly,tbox,exCard,exGrid,bigText,hand,sub};
})();
