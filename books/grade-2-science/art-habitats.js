/* Clay habitats: practice-round worlds built from the Gemini clay art instead of coded shapes.
   Middle of the page stays clear (labels, crates, answers); scenery lives on the rim and the back row. */
(function(){
"use strict";
const P=window.PM;if(!P||P.failed||!P.HAB||!P.artProp)return;
const {THREE,V}=P;const H=P.HAB;const S=P.SET;
const W=4.2,DZ=5.3,CZ=-1.95;
const tl=new THREE.TextureLoader();const TC={};
const tex=n=>TC[n]||(TC[n]=(()=>{const t=tl.load('art/'+n+'.webp');t.anisotropy=8;t.wrapS=t.wrapT=THREE.ClampToEdgeWrapping;return t;})());
let SEED=5;const R=()=>{SEED=(SEED*9301+49297)%233280;return SEED/233280;};
const A=(n,s,o)=>{const a=P.artProp(n,Object.assign({s:s||.8,bare:true,shadow:true},o||{}));return a;};
/* each habitat: floor texture, base colour, rim scenery (left/right), back row, fx, optional water patch, sky bits */
const D={
 arctic:{f:'f_snow',c:'#e8f1fa',rim:['snowflake','ice','polar_bear','penguin','seal','ptarmigan'],back:['eco_arctic','eco_mountain','ice','eco_arctic','eco_mountain'],fx:'snow',water:['water',-.9,.5,1.5,.8]},
 river:{f:'f_grass',c:'#a7d08c',rim:['tree','log','rock','dam','flower','plant'],back:['eco_river','tree','eco_forest','tree','eco_river'],fx:'leaves',water:['river',0,-.3,2.2,.55]},
 pond:{f:'f_meadow',c:'#a7d08c',rim:['flower','daisy','plant','rock','tadpole','dragonfly'],back:['eco_pond','tree','eco_swamp','tree','eco_pond'],fx:'sparkle',water:['pond',0,0,1.5,1.2]},
 forest:{f:'f_forest',c:'#8fbf7a',rim:['tree','acorn','mushroom','log','fox','squirrel','plant'],back:['eco_forest','tree','eco_forest','tree','eco_forest'],fx:'fireflies'},
 farm:{f:'f_meadow',c:'#b5d68c',rim:['hay','corn','sunflower','cow','sheep','apple_tree'],back:['eco_farm','windmill','eco_farm','tree','eco_farm'],fx:'sparkle'},
 ocean:{f:'f_ocean',c:'#4aa3e0',rim:['sailboat','whale','seal','surfboard','life_ring','ship'],back:['eco_ocean','cloud','eco_ocean','cloud','eco_ocean'],fx:'bubbles',sea:true},
 underwater:{f:'f_ocean',c:'#3d8fd6',rim:['fish','octopus','shark','dolphin','turtle','anchor'],back:['eco_ocean','fish','eco_ocean','fish','eco_ocean'],fx:'bubbles',sea:true},
 desert:{f:'f_desert',c:'#f0d58a',rim:['cactus','rock','camel','snake','cactus'],back:['eco_desert','sun','eco_desert','eco_desert'],fx:'dust'},
 jungle:{f:'f_forest',c:'#7fbf6a',rim:['tree','parrot','monkey','crocodile','plant','flower'],back:['eco_rainforest','tree','eco_rainforest','tree','eco_rainforest'],fx:'leaves'},
 savannah:{f:'f_sand',c:'#e3c777',rim:['tree','rock','lion','elephant','plant'],back:['eco_savanna','sun','eco_savanna','eco_savanna'],fx:'dust'},
 mountain:{f:'f_pebbles',c:'#b9c2b0',rim:['rock','eagle','tree','plant','rock'],back:['eco_mountain','eco_mountain','cloud','eco_mountain'],fx:'dust'},
 meadow:{f:'f_meadow',c:'#a7d08c',rim:['flower','daisy','butterfly','bee','plant','tulip'],back:['eco_meadow','tree','eco_meadow','tree','eco_meadow'],fx:'sparkle'},
 garden:{f:'f_soil',c:'#9bc77c',rim:['sunflower','rose','tulip','blossom','bee','seedling','plant'],back:['eco_garden','apple_tree','eco_garden','tree','eco_garden'],fx:'sparkle'},
 city:{f:'f_cobble',c:'#c9ced4',rim:['car','cone','bicycle','warning','flag','cyclist'],back:['factory','eco_grass','factory','eco_grass'],fx:'dust'},
 kitchen:{f:'f_wood',c:'#e8d3b0',rim:['bowl','cup','pot','plate','spoon','cookie'],back:['microwave','pot','microwave'],fx:'sparkle'},
 bedroom:{f:'f_wood',c:'#e3d0b8',rim:['teddy','toy_crane','book','alarm_clock','block','ball'],back:['teddy','block','book'],fx:'sparkle'},
 classroom:{f:'f_classroom',c:'#e9e2d6',rim:['book','pencil','globe','scissors','paper','ball'],back:['globe','book','teacher'],fx:'sparkle'},
 park:{f:'f_grass',c:'#a7d08c',rim:['tree','kite','ball','dog','flower','slide'],back:['eco_grass','tree','eco_meadow','tree','eco_grass'],fx:'leaves'},
 beach:{f:'f_sand',c:'#f2dca0',rim:['umbrella','sailboat','surfboard','rock','swimmer'],back:['eco_beach','cloud','eco_beach','sun'],fx:'sparkle',water:['ocean',0,-1.4,3,.9]},
 night:{f:'f_grass',c:'#5c7a8c',rim:['tree','owl','bat','rock','plant'],back:['eco_forest','eco_forest','eco_forest'],fx:'stars',dark:true},
 winter:{f:'f_snow',c:'#eef5fb',rim:['snowman','snowflake','skates','tree','ice'],back:['eco_arctic','tree','eco_arctic','tree'],fx:'snow'},
 space:{f:'f_pebbles',c:'#6a5f8a',rim:['rock','robot','flag','rock'],back:['sun','rock','sun'],fx:'stars',dark:true},
 campsite:{f:'f_forest',c:'#9bbf78',rim:['tree','log','fire','rock','plant'],back:['eco_forest','tree','eco_forest','tree'],fx:'fireflies'},
 orchard:{f:'f_grass',c:'#a7d08c',rim:['apple_tree','apple','leaf','plant','flower'],back:['apple_tree','eco_meadow','apple_tree','eco_meadow'],fx:'leaves'},
 store:{f:'f_classroom',c:'#e6dccb',rim:['cart','box','coin','bottle','juice'],back:['box','cart','box'],fx:'sparkle'},
 town:{f:'f_cobble',c:'#cfd3d7',rim:['car','tree','flag','bicycle','cone'],back:['factory','eco_grass','factory'],fx:'dust'},
 sky:{f:'f_meadow',c:'#bfe3f7',rim:['cloud','kite','pinwheel','rainbow','bird'],back:['cloud','rainbow','cloud','cloud'],fx:'sparkle'},
 home:{f:'f_wood',c:'#e7d4b4',rim:['chair','cat','dog','plant','teddy','door'],back:['door','chair','plant'],fx:'sparkle'}
};
function place(g,m,x,z,s){if(!m)return;m.position.set(x,0,z);g.add(m);}
function build(kind,g,T){
  const d=D[kind];SEED=7+kind.length*3;
  const base=P.HAB.__ground?P.HAB.__ground(g,d.c):(()=>{const b=S.base(W,DZ,'#e9e2d6');b.position.z=CZ;b.traverse(m=>{if(m.isMesh)m.castShadow=false;});g.add(b);return b;})();
  const fl=new THREE.Mesh(new THREE.PlaneGeometry(W*.97,DZ*.97),new THREE.MeshBasicMaterial({map:tex(d.f)}));
  fl.rotation.x=-Math.PI/2;fl.position.set(0,.07,CZ);g.add(fl);
  if(d.dark){const sh=new THREE.Mesh(new THREE.PlaneGeometry(W*.97,DZ*.97),new THREE.MeshBasicMaterial({color:'#1b2a4a',transparent:true,opacity:.35,depthWrite:false}));sh.rotation.x=-Math.PI/2;sh.position.set(0,.074,CZ);g.add(sh);}
  if(d.water){const [n,x,z,sx,sz]=d.water;const w=P.artProp(n,{s:1});if(w){w.position.set(x,.075,CZ+z);if(n==='river'){w.scale.set(2.4,1,.5);w.rotation.y=-.35;}else if(n==='ocean'){w.scale.set(3.2,1,.9);}else w.scale.set(sx,1,sz);w.userData.tick&&T.push(w.userData.tick);g.add(w);g.userData.water=[x,CZ+z];}}
  /* back row */
  const nb=d.back.length;d.back.forEach((n,i)=>{const s=n.startsWith('eco_')?1.15:.8+R()*.25;const m=A(n,s);place(g,m,-W/2+.45+i*(W-.9)/Math.max(1,nb-1),CZ-DZ/2+.3+(R()-.5)*.15,1);});
  /* rim: left and right edges, never the middle */
  d.rim.forEach((n,i)=>{const side=i%2?1:-1;const row=Math.floor(i/2);const x=side*(1.65+R()*.3);const z=CZ-DZ/2+1.1+row*1.15+R()*.3;
    const big=/tree|windmill|factory|umbrella|lion|elephant|whale|ship|sailboat|slide|cow|camel/.test(n);const m=A(n,big?.8:.55+R()*.15);if(m){m.rotation.y=side>0?-.25:.25;place(g,m,x,z,1);}});
  /* a few tiny ground details in the corners */
  ['flower','plant','rock','leaf'].slice(0,2).forEach((n,i)=>{const m=A(n,.32);place(g,m,(i?1:-1)*(1.8+R()*.15),CZ+DZ/2-.5-R()*.5,1);});
  /* animated life: the rim things breathe, sway, bob */
  g.children.forEach((c,i)=>{if(c.userData&&c.userData.art&&!/^f_/.test(c.userData.art)){const ph=R()*6;const y0=c.scale.y;T.push((dt,t)=>{c.scale.y=y0*(1+Math.sin(t*1.6+ph)*.025);});}});
  if(d.fx){const n0=g.children.length;const f=H.fx;if(f)T.push(f(g,d.fx,{h:d.fx==='dust'?.6:2.2}));g.children.slice(n0).forEach(o=>{o.castShadow=false;});}
  return {water:kind==='river'?'River with a beaver dam':''};
}
const TITLES={river:'River with a beaver dam'};
Object.keys(D).forEach(k=>{const old=H.ENV[k];H.ENV[k]=function(g,T){
  let title='';try{const sc=new THREE.Group();title=old(sc,[])||'';}catch(e){}
  try{build(k,g,T);}catch(e){console.error('clay habitat',k,e);return old(g,T);}
  return title;};});

/* mini habitat: the clay floor and rim for practice rounds (page is shorter, middle stays empty for the activity) */
const oldMini=H.mini;
H.mini=function(kind,seed){const d=D[kind]||D.meadow;SEED=(seed||3)*7+kind.length;const g=new THREE.Group();const T=[];
  try{const b=S.base(4.2,2.5,'#e9e2d6');b.position.z=-1.95;b.traverse(m=>{if(m.isMesh)m.castShadow=false;});g.add(b);
    const fl=new THREE.Mesh(new THREE.PlaneGeometry(4.2*.97,2.5*.95),new THREE.MeshBasicMaterial({map:tex(d.f)}));fl.rotation.x=-Math.PI/2;fl.position.set(0,.07,-1.95);g.add(fl);
    if(d.dark){const sh=new THREE.Mesh(new THREE.PlaneGeometry(4.2*.97,2.5*.95),new THREE.MeshBasicMaterial({color:'#1b2a4a',transparent:true,opacity:.35,depthWrite:false}));sh.rotation.x=-Math.PI/2;sh.position.set(0,.074,-1.95);g.add(sh);}
    const put=(n,s,x,z,ry)=>{const m=A(n,s);if(!m)return;m.position.set(x,.07,z);if(ry)m.rotation.y=ry;g.add(m);const ph=R()*6,y0=m.scale.y;T.push((dt,t)=>{m.scale.y=y0*(1+Math.sin(t*1.6+ph)*.03);});};
    /* back row, small and tucked behind the activity */
    d.back.slice(0,4).forEach((n,i,arr)=>put(n,n.startsWith('eco_')?.8:.55,-1.7+i*(3.4/Math.max(1,arr.length-1)),-3.0));
    /* the two side rims, outside the middle */
    d.rim.slice(0,6).forEach((n,i)=>{const side=i%2?1:-1;put(n,.42+R()*.1,side*(1.85+R()*.1),-2.55+Math.floor(i/2)*.55,side>0?-.3:.3);});
    if(d.fx&&H.fx){const n0=g.children.length;T.push(H.fx(g,d.fx,{h:d.fx==='dust'?.5:1.6,w:4,d:2.5,z:-1.95}));g.children.slice(n0).forEach(o=>{o.castShadow=false;});}
  }catch(e){console.error('clay mini',kind,e);return oldMini(kind,seed);}
  return {g,tick:(dt,t)=>T.forEach(f=>{try{f(dt,t);}catch(e){}})};};
})();
