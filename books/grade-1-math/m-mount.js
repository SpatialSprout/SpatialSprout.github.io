/* Grade 1 Math: each lesson's Learn spread plays its staged 3D theory (clay films); the Practice spread is unchanged. ASCII only. */
(function(){
"use strict";
const P=window.PM;if(!P||!P.unit||!P.lessons)return;
const M0=P._m0||{};Object.keys(M0).forEach(k=>{if(M0[k]===undefined)delete P[k];else P[k]=M0[k];});
const MU=P.MU||{};
/* no habitat diorama behind a staged Learn spread (the clay stage is the whole picture) */
if(P.HAB&&P.HAB.mini){const mini=P.HAB.mini;P.HAB.mini=function(kind,seed){const L=seed%5===0&&P.lessons[seed/5-1];if(L&&MU[L.id])return {g:new P.THREE.Group(),tick(){}};return mini.apply(this,arguments);};}
Object.keys(MU).forEach(id=>{const L=P.lessons.find(x=>x.id===id);if(!L)return;
  let D=null;const cap=P.lesson;P.lesson=d=>{D=d;};
  try{P.unit({id,title:L.title,strand:L.strand,codes:L.codes,guide:L.guide,steps:MU[id].map(s=>({say:s.say,speech:s.speech,cues:[],set:{}})),rounds:[]});}catch(e){console.error(e);}
  P.lesson=cap;if(!D)return;
  const mb=L.build,mi=L.init;
  L.build=function(S,grp,mode,game){return mode==='learn'?D.build(S,grp,mode,game):mb.call(L,S,grp,mode,game);};
  L.init=k=>k==='learn'?D.init(k):(mi?mi(k):{});
});
})();
