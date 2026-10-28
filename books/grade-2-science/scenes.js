/* The Interactive Classroom: Grade 2 Science — acted scenes.
   Every story comes alive on the model page: the things in the story pop up one by one and act
   (birds fly, fish swim, bears sleep), a young scientist watches and reacts, and a few lessons have
   their own experiment scenes (sink or float, the water cycle, melting, a lever lifting a rock). */
(function(){
"use strict";
const P=window.PM;if(!P)return;
const S=()=>P.STAGE;const story=fn=>({scene:fn});
const seq=(sc,list)=>{let t=0;list.forEach(([ms,f])=>{t+=ms;sc.later(f,t);});};
const SAY=['Wow!','Look at that!','So cool!','Amazing!','I see it!'];
/* default: the story's things pop up in turn and come alive; a young scientist reacts */
P.autoScene=function(d){const st=(d.steps||[])[0];if(!st||!st.set||!st.set.row||!(d.page&&d.page.story))return null;const names=st.set.row,labels=st.set.labels;
  return {steps:[story(sc=>{const n=names.length,sp=Math.min(1.05,3.6/n);const ps=names.map((nm,i)=>{const x=.35+(i-(n-1)/2)*sp;const p=sc.prop(nm,x,-2.75+Math.abs(x-.35)*.1,{label:labels?labels[i]:nm,ci:i,s:.9});p.visible=false;
      sc.later(()=>{p.visible=true;const s0=p.scale.clone();p.scale.multiplyScalar(.01);P.tween(.5,k=>{const f=k<.75?k/.75*1.1:1.1-(k-.75)/.25*.1;p.scale.set(s0.x*f,s0.y*f,s0.z*f);}).then(()=>S().alive(p,true));},500+i*1700);return p;});
    const k=sc.kid((d.id.charCodeAt(2)+d.id.charCodeAt(1))%6,-1.55,-1.55,{mode:'read',ry:.55});sc.later(()=>{sc.mode(k,'point');sc.say(k,SAY[d.id.charCodeAt(2)%SAY.length],1800);},900+n*1700);sc.later(()=>sc.mode(k,'cheer',2000),2600+n*1700);})]};};

P.SCN={
/* 4 · winter: snow falls, the bear curls up and sleeps, the squirrel hides nuts */
c04:{steps:[story(sc=>{sc.fx('snow',{x:0,z:-2.5,w:4.4,d:1.2,h:2.2});const sq=sc.prop('squirrel',-1.6,-2.4,{label:'squirrel',s:.85});const w=sc.prop('wolf',-.5,-2.8,{label:'wolf',s:.9});const b=sc.prop('bear',.7,-2.7,{label:'bear',s:1});sc.prop('pond',1.6,-2.3,{name:'pond',tap:false}).scale.set(.5,1,.4);const f=sc.prop('fish',1.6,-2.3,{label:'fish',s:.55});
   sc.tick((dt,t)=>{f.position.x=1.6+Math.sin(t*.5)*.25;});seq(sc,[[1000,()=>{S().alive(sq);sc.say(sq,'Nuts for later!',1800);}],[2000,()=>S().alive(w,true)],[2000,()=>{P.tween(.6,k=>{b.rotation.z=k*1.2;});sc.fx('zzz',{x:.9,z:-2.7,w:.2,h:1,y:.5});}]]);})]},
/* 5 · migration: the butterfly flies away south, the whale swims */
c05:{steps:[story(sc=>{const bf=sc.prop('butterfly',-1.6,-2.6,{label:'monarch',s:.7,y:.7});const m=sc.prop('moose',-.4,-2.75,{label:'caribou',s:.9});sc.prop('water',1.0,-2.45,{tap:false}).scale.set(.6,1,1);const wh=sc.prop('whale',1.0,-2.45,{label:'grey whale',s:.8});const fi=sc.prop('fish',1.6,-2.1,{label:'salmon',s:.55});
   sc.tick((dt,t)=>{bf.position.set(-1.6+((t*.25)%1)*3.6,.7+Math.sin(t*6)*.12,-2.6-Math.sin(t*.8)*.2);wh.position.x=1.0+Math.sin(t*.6)*.5;fi.position.x=1.6-Math.sin(t*.9)*.4;m.position.x=-.4+Math.sin(t*.3)*.3;});})]},
/* 9 · camouflage: animals fade in and out against matching patches */
c09:{steps:[story(sc=>{const pats=[['#ffffff',-1.6],['#e9c98a',-.5],['#7cb342',.6],['#9ccc65',1.7]];pats.forEach(([c,x])=>{const m=P.mk(new P.THREE.CylinderGeometry(.5,.5,.02,32),P.lam(c),0);m.position.set(x,.01,-2.6);sc.g.add(m);});
   const ns=[['fox','arctic fox'],['camel','camel'],['tiger','tiger'],['caterpillar','caterpillar']];ns.forEach(([n,l],i)=>{const p=sc.prop(n,pats[i][1],-2.6,{label:l,ci:i,s:.8});sc.tick((dt,t)=>{const v=.5+.5*Math.sin(t*1.2+i*1.6);p.position.y=-.75*(1-v);});});
   sc.kid(3,-1.9,-1.6,{mode:'think',ry:.5,say:'Where did they go?'});})]},
/* 12 · ice melts in the sun, then steam rises from the pot */
c12:{steps:[story(sc=>{const ic=sc.prop('ice',-1.4,-2.6,{label:'solid',s:.8});const su=sc.prop('sun',-.4,-2.9,{label:false,y:1.2,s:.6});const w=sc.prop('water',.5,-2.5,{label:'liquid',tap:false});w.scale.set(.25,1,.5);w.visible=false;const cl=sc.prop('cloud',1.4,-2.8,{label:'gas',y:.9,s:.7});cl.visible=false;
   seq(sc,[[1500,()=>{P.tween(1.6,k=>ic.scale.setScalar(Math.max(.01,.8*(1-k))));w.visible=true;}],[1900,()=>{sc.fx('steam',{x:.5,z:-2.5,w:.5,h:1.2,y:.1});}],[1600,()=>{cl.visible=true;S().alive(cl,true);}]]);})]},
/* 13 · sink or float: things drop into a tank of water */
c13:{steps:[story(sc=>{const tank=P.mk(new P.THREE.BoxGeometry(3.6,.9,1.2),new P.THREE.MeshLambertMaterial({color:'#64b5f6',transparent:true,opacity:.35,depthWrite:false}),0);tank.position.set(.1,.45,-2.5);sc.g.add(tank);
   const items=[['key',-1.2,false],['wood',-.3,true],['scissors',.5,false],['boat',1.3,true]];items.forEach(([n,x,fl],i)=>{const p=sc.prop(n,x,-2.5,{label:n==='wood'?'log':n==='boat'?'raft':n,ci:i,s:.6,y:1.6});
     sc.later(()=>{const y1=fl?.9:.05;P.tween(1.2,k=>{p.position.y=1.6+(y1-1.6)*k;}).then(()=>{if(fl)sc.tick((dt,t)=>{p.position.y=.9+Math.sin(t*2+i)*.04;});});},800+i*1300);});
   const k=sc.kid(2,-1.95,-1.6,{mode:'point',ry:.5,say:'Float or sink?'});sc.later(()=>{sc.mode(k,'cheer');sc.say(k,'Wood floats!',1800);},6500);})]},
/* 16 · the water cycle: a drop rises, a cloud forms, rain falls into the river */
c16:{steps:[story(sc=>{const o=sc.prop('water',-.4,-2.3,{name:'ocean',tap:false});o.scale.set(1.1,1,.7);const su=sc.prop('sun',-1.8,-2.9,{label:false,y:1.3,s:.6});const d=sc.prop('drop',-.6,-2.3,{label:'Drip',s:.5});const cl=sc.prop('cloud',1.0,-2.8,{label:'cloud',y:1.2,s:.9});cl.visible=false;const rn=sc.prop('rain',1.0,-2.8,{label:'rain',y:.9,s:.6});rn.visible=false;
   seq(sc,[[1200,()=>{sc.move(d,.9,-2.8,1.8,1.2);}],[2000,()=>{d.visible=false;cl.visible=true;S().alive(cl,true);}],[1800,()=>{rn.visible=true;cl.visible=false;sc.fx('rain',{x:1.0,z:-2.7,w:.9,d:.4,h:1.1});}]]);})]},
/* 23 · the lever lifts the rock */
c23:{steps:[story(sc=>{const rk=sc.prop('rock',.4,-2.5,{label:'big rock',s:.9});const st=sc.prop('stick',-.5,-2.5,{label:'lever',y:.2,s:1.6});const pv=sc.prop('rock',-.15,-2.5,{name:'pivot',label:false,s:.3});const ms=sc.prop('mouse',1.5,-2.6,{label:'Mouse',s:.7});const br=sc.prop('bear',-1.7,-2.6,{label:'Bear',s:.95});
   seq(sc,[[1200,()=>sc.say(ms,'It will not move!',1600)],[2400,()=>sc.say(br,'Try a lever!',1600)],[1600,()=>{P.tween(1.2,k=>{st.rotation.z=-k*.35;rk.position.y=k*.45;});}],[1600,()=>{sc.say(ms,'Thank you, Bear!',1800);S().alive(ms,true);}]]);})]}
};
})();
