/* The Interactive Classroom: Grade 2 Social Studies — acted scenes.
   Every story comes alive on the model page: the things in the story pop up one by one and act
   (birds fly, fish swim, bears sleep), a young explorer watches and reacts, and some lessons have their own scenes. */
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
/* 4 · festivals of light: diyas glow, menorah candles light one by one */
o04:{steps:[story(sc=>{const f=sc.prop('fire',-1.1,-2.6,{label:'Diwali diyas',s:.7});sc.fx('sparkle',{x:-1.1,z:-2.6,w:.8,h:1.2,y:.3});const cs=[];for(let i=0;i<9;i++){const c=sc.prop('candle',.3+(i-4)*.2,-2.7,{label:i===4?'Hanukkah menorah':false,s:.35,y:i===4?.15:0,tap:false});c.visible=i===4;cs.push(c);if(i===4)c.userData.name='candle';}
   cs.forEach((c,i)=>{if(i!==4)sc.later(()=>{c.visible=true;S().alive(c);},800+(i<4?i:i-1)*500);});sc.kid(2,-1.95,-1.65,{mode:'clap',ry:.5,say:'So many lights!'});})]},
/* 16 · travel: a plane flies over the countries */
o16:{steps:[story(sc=>{const ns=[['panda','China'],['fish','Japan'],['tree','Mali'],['temple','Thailand']];ns.forEach(([n,l],i)=>sc.prop(n,-1.5+i*1.0,-2.8,{label:l,ci:i,s:.8}));const pl=sc.prop('airplane',-2.2,-2.3,{label:false,s:.6,y:1.0});
   sc.tick((dt,t)=>{const k=(t*.18)%1;pl.position.set(-2.3+k*4.6,1.0+Math.sin(k*Math.PI*4)*.1,-2.3);});sc.kid(4,-1.9,-1.6,{mode:'point',ry:.4,say:'Let’s travel!'});})]}
};
})();
