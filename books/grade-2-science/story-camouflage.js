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
})();
