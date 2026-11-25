/* Grade 2 Science: cute clay art (made in Gemini) replaces the coded 3D figures.
   Pictures live in art/*.webp (cut from 9 sheets). Everything keeps its own animations:
   props are standees on a hinge, kids and grown-ups are flat clay people that bob, sway and jump with the same modes. */
(function(){
"use strict";
const P=window.PM;if(!P||!P.THREE)return;const THREE=P.THREE;
const M={acorn:[306,402],alarm_clock:[359,393],anchor:[361,420],ant:[360,420],apple:[343,385],apple_tree:[391,400],baby:[309,420],ball:[382,381],balloon:[293,420],bat:[486,383],bat_baseball:[378,420],bear:[376,419],beaver:[395,400],bee:[369,392],bicycle:[409,359],bird:[343,420],block:[417,366],blossom:[412,417],boat:[413,275],book:[415,346],bottle:[227,412],bowl:[397,303],box:[456,348],broom:[238,420],bubbles:[392,377],butterfly:[454,383],button:[381,359],cactus:[368,420],calf:[392,386],camel:[407,420],candy:[431,329],canoe:[421,288],car:[445,340],caribou:[290,420],carousel:[366,420],cart:[424,327],cat:[372,387],caterpillar:[394,414],chair:[301,420],cheese:[385,334],chick:[317,420],chicken:[355,420],cloud:[417,293],coin:[370,367],cone:[377,400],cookie:[415,409],corn:[351,409],cow:[460,414],crocodile:[472,361],cub:[297,392],cup:[336,397],cyclist:[221,420],daisy:[323,402],dam:[444,320],deer:[290,420],dog:[405,392],dolphin:[345,420],door:[351,415],dragonfly:[429,293],drop:[329,393],duck:[319,420],eagle:[328,420],eco_arctic:[435,340],eco_beach:[413,420],eco_dam:[435,340],eco_desert:[432,318],eco_farm:[433,372],eco_forest:[422,420],eco_garden:[434,354],eco_grass:[435,323],eco_meadow:[434,335],eco_mountain:[429,420],eco_ocean:[428,341],eco_pond:[435,362],eco_rainforest:[442,420],eco_river:[434,331],eco_savanna:[435,401],eco_swamp:[430,379],egg:[306,382],elephant:[443,408],f_classroom:[384,384],f_cobble:[384,384],f_desert:[384,384],f_forest:[384,384],f_grass:[384,384],f_hay:[384,384],f_ice:[384,384],f_meadow:[384,384],f_mud:[384,384],f_ocean:[384,384],f_pebbles:[384,384],f_pond:[384,384],f_sand:[384,384],f_snow:[384,384],f_soil:[384,384],f_wood:[384,384],factory:[350,388],farmer:[284,420],fire:[358,414],fish:[414,378],flag:[324,415],flower:[319,415],foal:[334,373],fox:[395,420],frog:[414,394],fuel:[336,383],glass:[330,374],globe:[315,420],grandma:[213,420],grandpa:[253,420],hammer:[362,379],hand:[354,377],hat:[440,299],hay:[413,343],helm:[415,420],horse:[396,420],hummingbird:[423,365],ice:[364,345],juice:[298,415],kangaroo:[305,420],key:[356,403],kid0:[213,420],kid1:[271,420],kid2:[211,420],kid3:[282,420],kid4:[225,420],kid5:[213,420],kite:[235,420],knife:[348,402],ladybug:[357,310],lamb:[356,356],leaf:[312,392],lever:[451,275],life_ring:[420,420],light_bulb:[242,355],lion:[405,420],log:[416,321],lollipop:[314,416],man:[210,420],meat:[398,388],microwave:[410,309],milk:[321,385],monkey:[420,420],moose:[379,420],mouse:[346,384],mug:[396,344],nest:[420,300],nut_bolt:[251,409],octopus:[430,373],owl:[370,420],paper:[311,376],parrot:[346,399],pencil:[256,420],penguin:[390,404],pig:[416,369],piglet:[345,334],pinwheel:[305,406],plant:[355,418],plate:[411,416],plug:[319,407],polar_bear:[391,403],pot:[417,356],ptarmigan:[376,420],pulley:[196,413],rabbit:[310,420],raft:[425,285],rainbow:[427,296],ramp:[424,351],robot:[323,404],rock:[390,312],rose:[319,406],sailboat:[399,411],salmon:[436,343],salt:[250,389],saw:[414,373],scissors:[368,420],seal:[446,329],seedling:[331,336],shark:[443,344],sheep:[416,355],ship:[403,365],shirt:[430,358],skates:[417,417],skier:[233,420],skull:[385,369],slide:[406,375],snake:[408,416],snowflake:[373,417],snowman:[406,412],soap:[400,327],socks:[395,408],spider:[426,302],sponge:[407,346],spoon:[377,420],squirrel:[379,420],stick:[336,394],sun:[420,419],sunflower:[322,419],surfboard:[321,420],swan:[394,420],swimmer:[216,420],tadpole:[427,248],teacher:[195,420],teddy:[311,420],tiger:[414,407],toy_crane:[411,418],trash:[313,418],tree:[383,418],tulip:[257,414],turbine:[337,420],turtle:[464,340],umbrella:[409,394],warning:[354,390],waterwheel:[421,393],wedge:[429,316],whale:[461,365],wheel:[412,412],wheel_axle:[374,367],wheelbarrow:[443,344],windmill:[346,420],wolf:[394,420],woman:[244,420],wood:[425,358],yarn:[392,350]};
delete M.helm;delete M.bat_baseball;      /* helm = ship wheel: not the waterwheel the lessons mean */
const AL={droplet:'drop','polar bear':'polar_bear','life ring':'life_ring','alarm clock':'alarm_clock','toy crane':'toy_crane',herb:'plant',kitten:'cat',puppy:'dog',bunny:'rabbit','tropical fish':'fish',boy:'kid0',girl:'kid1',dad:'man',mom:'woman',aunt:'woman',uncle:'man',doctor:'man',
  baseball:'ball',birds:'bird','wheel and axle':'wheel_axle',construction:'cone',child:'kid0',shopping_cart:'cart','shopping cart':'cart',lollipops:'lollipop',chick:'chick',bug:'ladybug',tool:'hammer',rain:'drop',wind:'pinwheel',arm:'hand',recycle:'trash',thread:'yarn'};
P.ART=M;
const TL=new THREE.TextureLoader(),TC={};
const tex=n=>TC[n]||(TC[n]=(()=>{const t=TL.load('art/'+n+'.webp');t.anisotropy=8;return t;})());
const key=n=>{n=String(n);let k=AL[n]===undefined?n:AL[n];if(!k)return null;if(M[k])return k;k=k.replace(/ /g,'_');return M[k]?k:null;};
P.artKey=key;
let BT=null;const blobTex=()=>BT||(BT=(()=>{const c=document.createElement('canvas');c.width=c.height=128;const x=c.getContext('2d'),g=x.createRadialGradient(64,64,4,64,64,62);g.addColorStop(0,'rgba(40,25,10,.38)');g.addColorStop(1,'rgba(40,25,10,0)');x.fillStyle=g;x.fillRect(0,0,128,128);return new THREE.CanvasTexture(c);})());
function plane(k,H,bb){const m=M[k],W=H*m[0]/m[1];const geo=new THREE.PlaneGeometry(W,H);geo.translate(0,H/2,0);
  const o=new THREE.Mesh(geo,new THREE.MeshBasicMaterial({map:tex(k),transparent:true,depthWrite:false,side:THREE.DoubleSide}));o.renderOrder=6;
  if(!bb){const _q=new THREE.Quaternion(),_p=new THREE.Vector3(),_w=new THREE.Quaternion(),_t=new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1,0,0),-.1),_y=new THREE.Quaternion(),_u=new THREE.Vector3(0,1,0);
    o.onBeforeRender=function(r,sc,cam){if(!o.parent)return;o.getWorldPosition(_p);o.parent.getWorldQuaternion(_w);const ang=Math.atan2(cam.position.x-_p.x,cam.position.z-_p.z);_y.setFromAxisAngle(_u,ang).multiply(_t);o.quaternion.copy(_w.invert()).multiply(_y);};}
  return o;}
function shadow(w,d){const s=new THREE.Mesh(new THREE.PlaneGeometry(1,1),new THREE.MeshBasicMaterial({map:blobTex(),transparent:true,depthWrite:false}));s.rotation.x=-Math.PI/2;s.position.y=.004;s.scale.set(w,d,1);s.renderOrder=2;return s;}
/* a picture prop: fits the same box the old coded props did (o.s scales it) */
P.artProp=function(n,o){const k=key(n);if(!k)return null;o=o||{};const m=M[k],asp=m[0]/m[1];const sc=.8*(o.s||.9)/Math.max(1,.85*asp);
  const g=new THREE.Group(),piv=new THREE.Group();piv.rotation.x=-.2;piv.scale.setScalar(sc);piv.add(plane(k,1));g.add(piv);
  if(!o.bare||o.shadow)g.add(shadow(Math.max(.34,asp*sc*1.05),Math.max(.16,asp*sc*.4)));
  g.userData.piv=piv;g.userData.art=k;const seed=Math.random()*6;g.userData.tick=t=>{piv.scale.y=sc*(1+.012*Math.sin(t*2.2+seed));};return g;};
/* a flat picture that fits the lesson-page standee box */
P.artPlane=function(n,H,W){const k=key(n);if(!k)return null;const m=M[k],asp=m[0]/m[1];const f=Math.min(H,W/asp);const g=new THREE.Group();g.userData.art=k;g.add(plane(k,f,true));return g;};

/* clay water: the pond / water props become a soft-edged patch of the clay water tile */
let EA=null;const edgeTex=()=>EA||(EA=(()=>{const c=document.createElement('canvas');c.width=c.height=128;const x=c.getContext('2d'),g=x.createRadialGradient(64,64,0,64,64,64);g.addColorStop(0,'#fff');g.addColorStop(.72,'#fff');g.addColorStop(.97,'#000');g.addColorStop(1,'#000');x.fillStyle=g;x.fillRect(0,0,128,128);return new THREE.CanvasTexture(c);})());
const WATERS={pond:['f_pond',[1,1]],lake:['f_pond',[1.6,.8]],water:['f_ocean',[1.75,.6]],ocean:['f_ocean',[2,1]],river:['f_ocean',[1.8,.5]]};
const oldArt=P.artProp;
P.artProp=function(n,o){const w=WATERS[n];if(w&&M[w[0]]){const g=new THREE.Group();const mk=(tn,r,y,op)=>{const m=new THREE.Mesh(new THREE.CircleGeometry(r,48),new THREE.MeshBasicMaterial({map:tex(tn),alphaMap:edgeTex(),transparent:true,depthWrite:false,opacity:op||1}));m.rotation.x=-Math.PI/2;m.position.y=y;m.renderOrder=3;return m;};
    const rim=mk('f_sand',.98,.017);const wt=mk(w[0],.9,.02);g.add(rim);g.add(wt);g.scale.set(w[1][0]*(n==='water'?1:1),1,w[1][1]);if(n==='water')g.scale.set(1.75,1,.6);g.userData.art=w[0];
    const t0=Math.random()*5;g.userData.tick=t=>{wt.scale.set(1+.012*Math.sin(t*1.6+t0),1+.012*Math.cos(t*1.3+t0),1);};return g;}
  return oldArt(n,o);};
/* clay trees, sun and clouds replace the coded set pieces */
const SET=P.SET;if(SET){const wrap=(name,key,k)=>{const old=SET[name];if(!old||!M[key])return;SET[name]=function(o){o=o||{};const a=P.artProp(key,{s:(o.s||1)*k,bare:true,shadow:key==='tree'});return a||old.call(SET,o);};};
  wrap('tree','tree',1.25);wrap('sun','sun',.9);wrap('cloud','cloud',1.0);}

/* more coded set pieces become clay art */
if(SET){const pat=(w,d,tn)=>{const g=new THREE.Group();const mk=(t,sx,sz,y)=>{const m=new THREE.Mesh(new THREE.CircleGeometry(.5,48),new THREE.MeshBasicMaterial({map:tex(t),alphaMap:edgeTex(),transparent:true,depthWrite:false}));m.rotation.x=-Math.PI/2;m.scale.set(sx,sz,1);m.position.y=y;m.renderOrder=3;return m;};
    g.add(mk('f_sand',w*1.06,d*1.08,.017));const wt=mk(tn,w,d,.02);g.add(wt);const t0=Math.random()*5;g.userData.tick=t=>{wt.scale.set(w*(1+.012*Math.sin(t*1.6+t0)),d*(1+.012*Math.cos(t*1.3+t0)),1);};return g;};
  const w=SET.water&&M.f_ocean?SET.water:null;
  if(M.f_pond){SET.water=function(a,b){return pat(a||1.6,b||1,'f_ocean');};SET.pond=function(a,b){return pat(a||1.2,b||.8,'f_pond');};}
  if(M.f_pond){SET.river=function(a,b){return pat(a||4,Math.max(.5,b||.8)*1.2,'f_pond');};}
  SET.rug=function(w,d,c){const g=new THREE.Group();const m=new THREE.Mesh(new THREE.CircleGeometry(.5,40),new THREE.MeshBasicMaterial({color:c||'#ffc9c9',transparent:true,opacity:.95}));m.rotation.x=-Math.PI/2;m.scale.set(w||1.6,d||1,1);m.position.y=.034;m.renderOrder=4;g.add(m);const r=new THREE.Mesh(new THREE.RingGeometry(.42,.47,40),new THREE.MeshBasicMaterial({color:'#ffffff',transparent:true,opacity:.7}));r.rotation.x=-Math.PI/2;r.scale.set(w||1.6,d||1,1);r.position.y=.036;r.renderOrder=5;g.add(r);return g;};
  const rep=(name,f)=>{const old=SET[name];if(!old)return;SET[name]=function(){const a=f.apply(null,arguments);return a||old.apply(SET,arguments);};};
  rep('hill',(r,o)=>{const c=String((o&&o.c)||'').toLowerCase();if(c==='#ffffff'&&M.eco_arctic)return P.artProp('eco_arctic',{s:(r||.5)*2.2,bare:true});if((c===''||/^#[a-d]/.test(c))&&M.eco_grass)return P.artProp('eco_grass',{s:(r||.5)*2.2,bare:true});return null;});
  rep('mountain',o=>M.eco_mountain?P.artProp('eco_mountain',{s:((o&&o.s)||1)*1.7,bare:true}):null);
  rep('rock',o=>M.rock?P.artProp('rock',{s:((o&&o.s)||1)*.9,bare:true,shadow:true}):null);
  rep('door',o=>M.door?P.artProp('door',{s:((o&&o.s)||1)*1.3,bare:true}):null);
  rep('spider',o=>M.spider?P.artProp('spider',{s:((o&&o.s)||1)*.8,bare:true,shadow:true}):null);
  rep('pine',o=>M.tree?P.artProp('tree',{s:((o&&o.s)||1)*1.4,bare:true,shadow:true}):null);
  rep('sign',o=>M.warning?P.artProp('warning',{s:1,bare:true,shadow:true}):null);}
/* kids and grown-ups */
const WHO={teacher:'teacher',man:'man',woman:'woman',grandpa:'grandpa',grandma:'grandma',farmer:'farmer',mom:'woman',dad:'man',aunt:'woman',uncle:'man',doctor:'man',boy:'kid0',girl:'kid1'};
P.artKid=function(p){let k=P.__who&&WHO[P.__who];
  if(!k){let i=P.CREW&&P.CREW.indexOf?P.CREW.indexOf(p):-1;if(i<0){const s=String(p&&p.c||'')+String(p&&p.h||'');i=0;for(let q=0;q<s.length;q++)i+=s.charCodeAt(q);}k='kid'+(i%6);}
  if(!M[k])return null;const g=new THREE.Group(),body=new THREE.Group(),pl=plane(k,1.0);body.add(pl);g.add(body);g.add(shadow(.5,.2));
  const head=new THREE.Object3D();head.position.set(0,.94,0);g.add(head);
  const u=g.userData;u.body=body;u.head=head;u.arms=[new THREE.Object3D(),new THREE.Object3D()];u.art=k;u.hands=[new THREE.Object3D(),new THREE.Object3D()];
  u.extra=(kk,dt)=>{const t=u.t,m=u.mode;const s=Math.sin(u.ry),c=Math.cos(u.ry);
    let rz=0,sy=1;if(m==='cheer'||m==='dance')rz=Math.sin(t*8)*.13;else if(m==='wave')rz=Math.sin(t*5)*.07;else if(m==='walk')rz=Math.sin(t*7)*.06;else if(m==='run')rz=Math.sin(t*12)*.09;
    else if(m==='no')rz=Math.sin(t*14)*.1;else if(m==='shiver')rz=Math.sin(t*40)*.03;else if(m==='point')rz=-.1;else if(m==='think'||m==='read')rz=.08;else if(m==='cover'){sy=.93;rz=Math.sin(t*14)*.04;}else if(m==='clap'||m==='sing'||m==='eat')rz=Math.sin(t*6)*.05;
    body.rotation.z+=(rz-body.rotation.z)*.3;body.scale.y+=(sy-body.scale.y)*.3;};
  return g;};
/* wrap the old kid, person and base makers */
const oldKid=P.kid;P.kid=function(p){return (P.artKid&&P.artKid(p))||oldKid(p);};
const D=P.DIO;
if(D){const op=D.person;D.person=function(sc,who,x,z,o){P.__who=typeof who==='string'?who:null;try{return op.call(D,sc,who,x,z,o);}finally{P.__who=null;}};
  const FLOOR={c01:'f_classroom',c02:'f_meadow',c03:'f_forest',c04:'f_snow',c05:'f_grass',c06:'f_grass',c07:'f_meadow',c08:'f_meadow',c09:'f_forest',c10:'f_wood',c11:'f_wood',c12:'f_ice',c13:'f_pond',c14:'f_classroom',c15:'f_meadow',c16:'f_pond',c17:'f_grass',c18:'f_wood',c19:'f_grass',c20:'f_cobble',c21:'f_meadow',c22:'f_grass',c23:'f_grass',c24:'f_wood'};
  const ECO={c02:'eco_meadow',c03:'eco_forest',c04:'eco_arctic',c05:'eco_ocean',c06:'eco_farm',c07:'eco_garden',c13:'eco_pond',c15:'eco_meadow',c16:'eco_river',c17:'eco_grass',c19:'eco_river',c20:'eco_river',c22:'eco_mountain',c23:'eco_beach'};
  const ob=D.base;D.base=function(sc,ground,o){const id=sc.__sid;const f=FLOOR[id];const b=ob.call(D,sc,f?'#e9e2d6':ground,o);
    if(f&&M[f]){const w=(o&&o.w)||4.15,d=(o&&o.d)||2.35;const t=tex(f);t.wrapS=t.wrapT=THREE.MirroredRepeatWrapping;t.repeat.set(2,1);
      const fl=new THREE.Mesh(new THREE.PlaneGeometry(w*.97,d*.95),new THREE.MeshBasicMaterial({map:t}));fl.rotation.x=-Math.PI/2;fl.position.y=.02;b.add(fl);}
    const e=ECO[id];if(e&&M[e]){const s=P.artProp(e,{s:.9,bare:true});if(s){s.position.set(-1.8,.02,-.95);s.scale.setScalar(.75);s.userData.tick=null;b.add(s);}}
    return b;};}
})();
