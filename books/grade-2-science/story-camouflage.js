/* Lesson 9 · Hide and Seek in Nature: picture-scene story.
   Clay illustrations stand up on the page like a pop-up book. Each sentence changes the scene,
   the animal arrives or rises out of its home, a hawk searches overhead, and "camouflage" reveals everyone. */
(function(){
"use strict";
const P=window.PM;if(!P||!P.DIO||!P.SCN||!P.SCN.c09||!P.PIC)return;
const D=P.DIO,{V,tween,burst,THREE,A,PIC}=P;
const ease=k=>k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2;
const HAWK={kind:'hawk',x0:.5749,x1:.7728,y0:.0602,y1:.3495};
const META={fox:[HAWK,{kind:'animal',x0:.2409,x1:.4323,y0:.5590,y1:.7361}],camel:[HAWK,{kind:'animal',x0:.2057,x1:.4570,y0:.5532,y1:.7338}]};
function ring(L,col){const a=L.animal;if(!a)return;const {w,h}=a.userData;const m=new THREE.Mesh(new THREE.RingGeometry(.5,.56,48),new THREE.MeshBasicMaterial({color:col||'#ffd43b',transparent:true,opacity:.95,depthWrite:false}));
  m.renderOrder=4;m.scale.set(w*.9,h*1.1,1);m.position.set(a.position.x,a.position.y+h/2,.16);L.g.add(m);tween(.9,k=>{m.scale.set(w*(.9+k*1.1),h*(1.1+k*1.3),1);m.material.opacity=.95*(1-k);}).then(()=>L.g.remove(m));}
const P0=P.SCN.c09;
P0.steps[0]={scene:sc=>{sc.__sid='c09pic';D.base(sc,'#e9e2d6');
  const S={};Object.keys(META).forEach(k=>{S[k]=PIC.make(sc,k,META[k]);S[k].animal.visible=false;});
  let cur=null,focus=null;
  const show=k=>{const n=S[k];if(n===cur)return;const old=cur;cur=n;if(old)PIC.fade(old,0,.7);PIC.fade(n,1,.9);};
  /* the hawk always drifts and searches; when it "looks" it swoops toward the animal */
  sc.tick((dt,t)=>{Object.values(S).forEach(L=>{const hk=L.hawk;if(!hk||!L.g.visible)return;const h=hk.userData.home;let tx=h.x+Math.sin(t*.9)*.35,ty=h.y+Math.sin(t*1.7)*.08,rz=Math.sin(t*1.7)*.05;
    if(focus&&cur===L&&L.animal){tx=L.animal.position.x+.35;ty=L.animal.position.y+L.animal.userData.h+.45;rz=Math.sin(t*6)*.12;}
    hk.position.x+=(tx-hk.position.x)*Math.min(1,dt*(focus?2.4:1.3));hk.position.y+=(ty-hk.position.y)*Math.min(1,dt*(focus?2.4:1.3));hk.rotation.z=rz;});
    if(cur&&cur.animal&&cur.animal.visible&&!cur.animal.userData.busy){const a=cur.animal,b=1+Math.sin(t*2.2)*.012;a.scale.y=b;}});
  const look=(ms,q)=>{focus=true;if(q&&cur&&cur.hawk)sc.say(cur.hawk,q,Math.min(ms,2200));sc.later(()=>{focus=null;},ms);};
  const arrive=(L,fromX,dur)=>{const a=L.animal;a.visible=true;a.userData.busy=true;const hx=a.userData.home.x;
    return tween(dur,k=>{const e=ease(k);a.position.x=hx+(fromX-hx)*(1-e);a.position.y=a.userData.home.y+Math.abs(Math.sin(k*Math.PI*5))*.07*(1-k);a.scale.y=1;a.material.opacity=Math.min(1,k*4);}).then(()=>{a.position.copy(a.userData.home);a.userData.busy=false;});};
  const rise=(L,dur)=>{const a=L.animal;a.visible=true;a.userData.busy=true;a.material.opacity=1;
    return tween(dur,k=>{const e=ease(k);a.scale.y=.02+.98*e;a.scale.x=1.12-.12*e;}).then(()=>{a.scale.set(1,1,1);a.userData.busy=false;});};
  const lab=(t,col)=>{const c=D.card(sc,t,0,-1.15,{h:.2,col});c.visible=true;D.grow(c);return c;};
  const found=L=>{ring(L,'#ffd43b');burst(V(0,.7,-2.0));sc.say(L.animal,'Found you!',1500);};
  D.at(sc,'hide and seek',()=>{show('fox');sc.later(()=>look(2400,'I spy…'),900);});
  D.at(sc,'arctic fox',()=>{lab('Arctic','#1c7ed6');arrive(S.fox,-2.4,1.9);});
  D.at(sc,'invisible',()=>{look(3400,'Where did it go?');});
  D.at(sc,'camel',()=>{show('camel');lab('Desert','#e8590c');sc.later(()=>rise(S.camel,1.6),700);});
  D.at(sc,'dunes',()=>{look(3000,'Just sand…');});
  D.at(sc,'camouflage',()=>{focus=true;[S.fox,S.camel].forEach(L=>{L.hawk&&sc.say(L.hawk,'Clever!',1800);});
    sc.later(()=>{found(cur);},500);sc.later(()=>{focus=null;const c=D.card(sc,'camouflage',0,-1.15,{h:.3,col:'#5f3dc4'});c.visible=true;D.grow(c);P.CAMO_DONE=true;},2200);
    /* tap an animal to hide it again, tap again to find it */
    sc.later(()=>{Object.values(S).forEach(L=>{if(!A||!A.drag||!L.animal)return;A.drag(L.animal,{tap:()=>{A.pop();ring(L,'#ffd43b');tween(.5,k=>{L.animal.position.y=L.animal.userData.home.y+Math.sin(k*Math.PI)*.15;});}});});},2600);});
  P.CAMO=sc;P.CAMO_S=S;
  return {};}};
})();
