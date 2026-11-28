/* Lesson 9 · Camouflage: every 3D page is a clay "pop-up picture" that follows the narration.
   Story page (s0) and the three theory pages (Blend in / Predators hide too / Prey hides). */
(function(){
"use strict";
const P=window.PM;if(!P||!P.DIO||!P.SCN||!P.SCN.c09||!P.PIC)return;
const D=P.DIO,{V,tween,burst,THREE,A,PIC}=P;
const ease=k=>k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2;
const HK={fox:[.5749,.7728,.0602,.3495],camel:[.5749,.7734,.0602,.3495],tiger:[.7031,.8822,.1111,.3021],cater:[.6790,.8809,.0602,.3530],snake:[.7676,.9095,.0440,.3009],hare:[.7415,.8607,.0671,.2674],bear:[.6927,.8112,.0903,.2813],frog:[.7298,.9167,.0440,.2928]};
const AN={fox:[.2409,.4323,.5590,.7361],camel:[.2057,.4570,.5532,.7338]};/* animals that can step out of the picture */
const FOCUS={fox:[.34,.66],camel:[.33,.65],tiger:[.48,.72],cater:[.50,.61],snake:[.45,.66],hare:[.48,.70],bear:[.47,.63],frog:[.47,.68],croc:[.33,.73]};
const LABEL={fox:['Arctic','#1c7ed6'],camel:['Desert','#e8590c'],tiger:['Tall grass','#2b8a3e'],cater:['Leaves','#2b8a3e'],snake:['Grass','#2b8a3e'],hare:['Winter','#1c7ed6'],bear:['Snow','#1c7ed6'],frog:['Pond','#0ca678'],croc:['Swamp','#5c940d']};
const META={};Object.keys(HK).concat(['croc']).forEach(k=>{const m=[];if(HK[k]){const h=HK[k];m.push({kind:'hawk',x0:h[0],x1:h[1],y0:h[2],y1:h[3]});}if(AN[k]){const a=AN[k];m.push({kind:'animal',x0:a[0],x1:a[1],y0:a[2],y1:a[3]});}META[k]=m;});
/* the picture manager shared by every page */
function stage(sc,keys,o){o=o||{};
  sc.__sid='c09pic';D.base(sc,'#e9e2d6');
  const S={};keys.forEach(k=>{S[k]=PIC.make(sc,k,META[k],o);if(S[k].animal)S[k].animal.visible=false;});
  const X={S,cur:null,focus:null,curK:null};
  const pos=(L,k,dx,dy)=>{const f=FOCUS[k];return {x:(f[0]-.5)*PIC.W+(dx||0),y:(1-f[1])*PIC.H+(dy||0)};};
  X.show=k=>{const n=S[k];if(!n||n===X.cur)return;const old=X.cur;X.cur=n;X.curK=k;if(old)PIC.fade(old,0,.7);PIC.fade(n,1,.9);};
  sc.tick((dt,t)=>{Object.keys(S).forEach(k=>{const L=S[k],hk=L.hawk;if(!hk||!L.g.visible)return;const h=hk.userData.home;let tx=h.x+Math.sin(t*.9)*.35,ty=h.y+Math.sin(t*1.7)*.08,rz=Math.sin(t*1.7)*.05,sp=1.3;
    if(X.focus&&X.cur===L){const p=pos(L,k,.35,.55);tx=p.x;ty=p.y;rz=Math.sin(t*6)*.12;sp=2.4;}
    hk.position.x+=(tx-hk.position.x)*Math.min(1,dt*sp);hk.position.y+=(ty-hk.position.y)*Math.min(1,dt*sp);hk.rotation.z=rz;});
    const a=X.cur&&X.cur.animal;if(a&&a.visible&&!a.userData.busy)a.scale.y=1+Math.sin(t*2.2)*.012;});
  X.look=(ms,q)=>{X.focus=true;const hk=X.cur&&X.cur.hawk;if(q&&hk)sc.say(hk,q,Math.min(ms,2200));sc.later(()=>{X.focus=null;},ms);};
  X.ring=(k,col)=>{const L=S[k]||X.cur;if(!L)return;const p=pos(L,X.curK||k);const w=k==='croc'?1.3:.9,h=.6;
    const m=new THREE.Mesh(new THREE.RingGeometry(.5,.56,48),new THREE.MeshBasicMaterial({color:col||'#ffd43b',transparent:true,opacity:.95,depthWrite:false}));m.renderOrder=4;m.position.set(p.x,p.y,.2);L.g.add(m);
    tween(.9,e=>{m.scale.set(w*(1+e*1.1),h*(1+e*1.3),1);m.material.opacity=.95*(1-e);}).then(()=>L.g.remove(m));};
  X.found=(txt)=>{const k=X.curK;X.ring(k);burst(V(0,.7,-2.0));const hk=X.cur&&X.cur.hawk;if(hk)sc.say(hk,txt||'Found you!',1500);};
  X.arrive=(k,fromX,dur)=>{const L=S[k],a=L.animal;if(!a)return Promise.resolve();a.visible=true;a.userData.busy=true;const hx=a.userData.home.x,hy=a.userData.home.y;
    return tween(dur,e=>{const z=ease(e);a.position.x=hx+(fromX-hx)*(1-z);a.position.y=hy+Math.abs(Math.sin(e*Math.PI*5))*.07*(1-e);a.scale.y=1;a.material.opacity=Math.min(1,e*4);}).then(()=>{a.position.copy(a.userData.home);a.userData.busy=false;});};
  X.rise=(k,dur)=>{const L=S[k],a=L.animal;if(!a)return Promise.resolve();a.visible=true;a.userData.busy=true;a.material.opacity=1;
    return tween(dur,e=>{const z=ease(e);a.scale.y=.02+.98*z;a.scale.x=1.12-.12*z;}).then(()=>{a.scale.set(1,1,1);a.userData.busy=false;});};
  X.lab=k=>{const l=LABEL[k];if(!l)return;const c=D.card(sc,l[0],0,o.lz||-1.15,{h:.2,col:l[1]});c.visible=true;D.grow(c);if(X.lastLab)X.lastLab.visible=false;X.lastLab=c;};
  X.punch=()=>{const L=X.cur;if(!L)return;tween(.5,e=>{const s=1+Math.sin(e*Math.PI)*.05;L.g.scale.set(s,s,1);});};
  /* tap the hawk or the picture to play */
  sc.later(()=>{Object.keys(S).forEach(k=>{const L=S[k];if(!A||!A.drag)return;if(L.hawk)A.drag(L.hawk,{tap:()=>{if(X.cur!==L)return;A.pop();X.look(1600,'Where are you?');}});
    if(L.animal)A.drag(L.animal,{tap:()=>{if(X.cur!==L)return;A.pop();X.ring(k);tween(.5,e=>{L.animal.position.y=L.animal.userData.home.y+Math.sin(e*Math.PI)*.15;});}});});},800);
  return X;}
const at=(sc,w,f)=>D.at(sc,w,f);
const TH={tilt:-.95,z:-1.0,lz:-.2};
const P0=P.SCN.c09;
/* ---- story page ---- */
P0.steps[0]={set:{},scene:sc=>{const X=stage(sc,['fox','camel','tiger','cater']);P.CAMO=sc;P.CAMO_X=X;
  at(sc,'hide and seek',()=>{X.show('fox');sc.later(()=>X.look(2400,'I spy…'),900);});
  at(sc,'arctic fox',()=>{X.lab('fox');X.arrive('fox',-2.4,1.9);});
  at(sc,'invisible',()=>X.look(3400,'Where did it go?'));
  at(sc,'camel',()=>{X.show('camel');X.lab('camel');sc.later(()=>X.rise('camel',1.6),700);});
  at(sc,'dunes',()=>X.look(3000,'Just sand…'));
  at(sc,'tiger',()=>{X.show('tiger');X.lab('tiger');});
  at(sc,'tall grass',()=>X.look(3000,'Is that… a tiger?'));
  at(sc,'pounce',()=>{X.punch();sc.later(()=>X.found('Pounce!'),250);});
  at(sc,'caterpillar',()=>{X.show('cater');X.lab('cater');});
  at(sc,'green leaf',()=>X.look(3000,'Just leaves…'));
  at(sc,'birds cannot see',()=>X.look(2600,'I cannot see it!'));
  at(sc,'camouflage',()=>{X.focus=true;sc.later(()=>X.found('Found you!'),500);sc.later(()=>{X.focus=null;const c=D.card(sc,'camouflage',0,-1.15,{h:.3,col:'#5f3dc4'});c.visible=true;D.grow(c);},2200);});
  return {};}};
/* ---- theory pages: Blend in / Predators hide too / Prey hides ---- */
P0.steps[1]={set:{},scene:sc=>{const X=stage(sc,['bear','camel','frog'],TH);P.CAMO=sc;P.CAMO_X=X;
  const go=(k,q)=>{X.show(k);X.lab(k);sc.later(()=>X.look(2200,q),700);sc.later(()=>X.found('Found you!'),3000);};
  at(sc,'snow',()=>go('bear','Where is the bear?'));at(sc,'sand',()=>go('camel','Where is the camel?'));at(sc,'leaves',()=>go('frog','Where is the frog?'));
  sc.later(()=>go('bear','Where is the bear?'),600);return {};}};
P0.steps[2]={set:{},scene:sc=>{const X=stage(sc,['croc','snake'],TH);P.CAMO=sc;P.CAMO_X=X;
  at(sc,'a crocodile',()=>{X.show('croc');X.lab('croc');sc.later(()=>X.found('Is it a log?'),2600);});
  at(sc,'a snake',()=>{X.show('snake');X.lab('snake');sc.later(()=>X.look(2200,'Mouse, beware!'),600);sc.later(()=>X.found('Sneaky!'),3200);});
  sc.later(()=>{X.show('croc');X.lab('croc');},600);return {};}};
P0.steps[3]={set:{},scene:sc=>{const X=stage(sc,['cater','hare'],TH);P.CAMO=sc;P.CAMO_X=X;
  at(sc,'a caterpillar',()=>{X.show('cater');X.lab('cater');sc.later(()=>X.look(2200,'Just leaves…'),600);sc.later(()=>X.found('Found you!'),3200);});
  at(sc,'a snowshoe hare',()=>{X.show('hare');X.lab('hare');sc.later(()=>X.look(2200,'Just snow…'),600);sc.later(()=>X.found('Found you!'),3200);});
  sc.later(()=>{X.show('cater');X.lab('cater');},600);return {};}};

/* ---- practice: every round is a picture scene ---- */
const HAB={snow:['bear','Snow'],desert:['camel','Desert'],pond:['frog','Pond'],grass:['tiger','Tall grass'],leaves:['cater','Leaves']};
/* a round question with a clay picture: the hawk searches, a right answer finds the animal */
const picRound=(k,q)=>(sc,st,set,hk)=>{const X=stage(sc,[k],TH);P.CAMO=sc;P.CAMO_X=X;
  sc.later(()=>{X.show(k);X.lab(k);},150);sc.later(()=>X.look(2600,q||'Where is it?'),1300);
  return {win(){X.focus=true;X.found('Found you!');sc.later(()=>{X.focus=null;},2400);return 3000;},miss(){X.look(1400,'Hmm…');}};};
/* the falcon game: drag the animal to a home. Right home: the falcon flies past without seeing it. */
const hideRound=(animal,right,homes)=>(sc,st,set,hk)=>{
  sc.__sid='c09pic';D.base(sc,'#e9e2d6');P.CAMO=sc;
  const n=homes.length,gap=1.52,px=i=>(i-(n-1)/2)*gap;let busy=false,done=false;
  const pan=homes.map((h,i)=>{const g=new THREE.Group();g.position.set(px(i),.02,-1.45);g.rotation.x=-1.0;sc.g.add(g);
    const m=PIC.plane("pic-"+HAB[h][0]+"-bg",1.46,1.46*864/1536,1,true);m.position.y=.4;g.add(m);D.grow&&0;
    const c=D.card(sc,HAB[h][1],px(i),-.95,{h:.17,col:'#1c4fb8'});c.visible=true;D.grow(c);return {g,m,x:px(i)};});
  const tok=P.artProp(animal,{s:1.15});const home=new THREE.Vector3(0,0,.15);tok.position.copy(home);sc.g.add(tok);
  const mats=[];tok.traverse(o=>{if(o.material){o.material.transparent=true;mats.push(o.material);}});const fade=v=>mats.forEach(m=>{m.opacity=v;});
  const fal=PIC.plane('pic-fox-hawk',1.0,.82,5,false);fal.geometry.translate(0,.41,0);sc.g.add(fal);fal.position.set(-2.4,2.1,-.6);
  let mode='patrol',fx=0,t0=0;const tgt=new THREE.Vector3();
  sc.tick((dt,t)=>{t0=t;if(mode==='patrol'){const tx=Math.sin(t*.55)*2.3,ty=2.15+Math.sin(t*1.4)*.2;const vx=tx-fal.position.x;fal.position.x+=vx*Math.min(1,dt*3);fal.position.y+=(ty-fal.position.y)*Math.min(1,dt*3);fal.position.z=-.6;if(Math.abs(vx)>.02)fal.scale.x=vx>0?-1:1;fal.rotation.z=Math.sin(t*3)*.06;}});
  const sayF=(txt,ms)=>sc.say(fal,txt,ms||1500);
  const goto=(p,dur)=>{const a=fal.position.clone();return tween(dur,e=>{const z=ease(e);fal.position.set(a.x+(p.x-a.x)*z,a.y+(p.y-a.y)*z,a.z+(p.z-a.z)*z);});};
  const idx=i=>homes[i]===right;
  const goHome=()=>{const a=tok.position.clone();return tween(.5,e=>{tok.position.set(a.x+(home.x-a.x)*e,a.y*(1-e),a.z+(home.z-a.z)*e);});};
  const place=i=>{busy=true;const a=tok.position.clone();const p=pan[i];
    tween(.7,e=>{const z=ease(e);tok.position.set(a.x+(p.x-a.x)*z,.08+Math.sin(z*Math.PI)*.5,a.z+(-1.35-a.z)*z);const s=1-.35*z;tok.scale.setScalar(s);});
    return p;};
  const H={drop:pos=>{if(busy||done)return;if(pos.z>-.55){goHome();return;}let b=0,bd=9;pan.forEach((p,i)=>{const d=Math.abs(pos.x-p.x);if(d<bd){bd=d;b=i;}});H.pick(b);},
    pick:i=>{if(busy||done)return;const ok=idx(i);place(i);H.last=i;
      sc.later(()=>{if(ok){hk.win('Yes! The '+animal+' blends into the '+homes[i]+'.');}else{hk.miss('The falcon saw it! The '+animal+' does not blend into the '+homes[i]+'. Try another home.');}},800);}};
  A.drag(tok,{drop:pos=>H.drop(pos),tap:()=>{A.pop();sayF(animal==='camel'?'Where is the camel?':'Where is it?',1400);}});
  P.CAMO_H=H;
  return {
    win(){done=true;mode='pass';const i=H.last;const p=pan[i];
      sc.later(()=>{const a=tok.scale.x;tween(1.8,e=>{fade(1-.85*e);});},300);
      goto({x:-2.6,y:2.0,z:-.6},.01);fal.scale.x=-1;
      sc.later(()=>goto({x:p.x-.3,y:1.5,z:-.6},1.5).then(()=>{sayF('Where did it go?',1700);fal.rotation.z=.25;}),600);
      sc.later(()=>{fal.rotation.z=0;fal.scale.x=-1;goto({x:3.0,y:2.3,z:-.6},1.8).then(()=>{mode='patrol';});},3000);
      return 5000;},
    miss(){if(done)return;mode='dive';const i=H.last;const p=pan[i==null?0:i];const a=tok.position.clone();
      goto({x:p.x,y:.85,z:-1.2},.55).then(()=>{sayF('Gotcha!',900);burst(V(p.x,.5,-1.4));
        tween(.5,e=>{tok.position.x=a.x+Math.sin(e*30)*.04;});});
      sc.later(()=>{goto({x:fal.position.x,y:2.2,z:-.6},.6).then(()=>{mode='patrol';});goHome().then(()=>{tok.scale.setScalar(1);busy=false;});},1500);}};};
P.CAMO_R={pic:picRound,hide:hideRound};
})();
