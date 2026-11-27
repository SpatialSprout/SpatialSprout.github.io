/* Practice rounds for lessons 6-24: every picture question gets a little clay scene with real action.
   The lesson's characters stand in a backdrop, the thing the question is about is tossed in, and a right or wrong answer makes them cheer or shiver. */
(function(){
"use strict";
const P=window.PM;if(!P||!P.DIR)return;
const W=P.PIC.W;
const all=ps=>Promise.all(ps);
/* per lesson: backdrops to rotate through, characters (picture, height, face), ambient effect, a cheer word list */
const CFG={
 c06:{bgs:['meadow','pond-spring','pond-summer'],cast:[['pa-calf',1.15],['pa-lamb',1.0],['pa-cubnew',.8],['pa-ducklings',.7],['pa-chicks',.6],['pa-whalecalf',.8],['pa-cowcalf',1.0]],amb:'leaves'},
 c07:{bgs:['meadow','pond-spring','pond-summer'],cast:[['pa-tadpole',.5],['pa-lionyoung',1.1],['pa-caterbite',.7],['pa-ducklings',.7],['pa-lamb',1.0]],amb:'leaves'},
 c08:{bgs:['meadow','pond-summer','pond-spring'],cast:[['pa-eggleaf',.6],['pa-caterbite',.8],['pa-chrysalis',1.1],['pa-emerging',1.1],['pa-tadpole',.5],['pa-chicks',.6]],amb:'leaves'},
 c10:{bgs:['store','pond-summer','meadow'],cast:[['pa-milkpour',1.3],['pa-oilpour',1.3],['pa-shawsoap',1.4],['pa-shawcart',1.4]],amb:'bubble'},
 c11:{bgs:['magic','pond-spring','store'],cast:[['pa-soupglass',1.5],['pa-soupstir',1.5],['pa-soupbow',1.5],['pa-soupspill',1.4]],amb:'sparkle'},
 c12:{bgs:['pond-winter','pond-spring','pond-summer'],cast:[['pa-waterice',1.1],['pa-watermelt',1.0],['pa-waterdrop',1.1],['pa-watergas',1.0]],amb:'bubble'},
 c13:{bgs:['isle','shallow','river'],cast:[['pa-s13worry',1.4],['pa-s13wade',1.3],['pa-samcheer',1.2],['pa-samlook',1.4],['pa-samlog',1.1]],amb:'bubble'},
 c14:{bgs:['garage','garage-night','kitchen-night'],cast:[['pa-m14cap',1.2],['pa-catpoint',1.3],['pa-mousescared',1.1],['pa-mc14walk',1.2],['pa-m14cheese',1.2]],amb:'sparkle'},
 c15:{bgs:['park-wind','park','park-wind'],cast:[['pa-l15shout',1.7],['pa-b15kite',1.3],['pa-a15bub',1.4],['pa-leorun',1.3],['pa-kidsbench',1.15]],amb:'leaves'},
 c16:{bgs:['ocean','storm','rapids','pond-summer'],cast:[['pa-d16float',.8],['pa-d16vapor',1.0],['pa-d16cloud',1.0],['pa-d16sky',.9]],amb:'bubble'},
 c17:{bgs:['creek-dirty','street','creek-clean','park'],cast:[['pa-q17case',1.3],['pa-k17bags',1.3],['pa-k17bike',1.1],['pa-q17ducks',1.2]],amb:'leaves'},
 c18:{bgs:['livingroom','hall','livingroom'],cast:[['pa-k18wind',1.4],['pa-r18march',.9],['pa-k18btn',1.5],['pa-g18laugh',1.5]],amb:'sparkle'},
 c19:{bgs:['river','park-wind','shallow','meadow'],cast:[['kid0',1.2],['kid1',1.2],['kid2',1.2],['kid3',1.2]],amb:'bubble'},
 c20:{bgs:['park-wind','river','meadow','shallow'],cast:[['kid1',1.2],['kid4',1.2],['kid0',1.2],['kid5',1.2]],amb:'leaves'},
 c21:{bgs:['park','livingroom','meadow','hall'],cast:[['kid2',1.2],['kid3',1.2],['kid5',1.2],['kid1',1.2]],amb:'sparkle'},
 c22:{bgs:['park','street','meadow','pond-summer'],cast:[['kid4',1.2],['kid0',1.2],['kid2',1.2],['kid5',1.2]],amb:'sparkle'},
 c23:{bgs:['park','livingroom','street','store'],cast:[['kid3',1.2],['kid1',1.2],['kid4',1.2],['kid0',1.2]],amb:'sparkle'},
 c24:{bgs:['livingroom','store','park','hall'],cast:[['kid5',1.2],['kid2',1.2],['kid3',1.2],['kid1',1.2]],amb:'sparkle'}
};
const CHEER=['Yes!','Great!','You got it!','Brilliant!','Super!','Nice one!'];
const OOPS=['Hmm…','Try again!','Not quite!','Oh!'];
const STOP=new Set('the a an of to in on is are it its and or for with what which who how why does do did can will be as at by from that this these those you your they them their we our his her he she not no yes if so than then into out up down over under about'.split(' '));
const words=r=>{const t=[r.q,r.ans].concat(r.o||[]).join(' ').toLowerCase().replace(/\*/g,'').replace(/[^a-z\s]/g,' ').split(/\s+/).filter(w=>w&&!STOP.has(w));return t;};
const propFor=r=>{if(!P.artKey)return null;const ws=words(r);const ans=String(r.ans||'').toLowerCase();
  for(const w of ws){for(const k of [w,w.replace(/ies$/,'y'),w.replace(/es$/,''),w.replace(/s$/,'')]){const a=P.artKey(k);if(a&&!/^(kid|eco_|f_)/.test(a))return a;}}return null;};
const simple=r=>{const s=r.set||{};if(r.scene)return false;if(s.bins||s.grid||s.fill||s.build||s.items||s.custom)return false;if(s.row&&!(s.row.length===1||s.keep))return false;return true;};
const rnd=(a,b)=>a+Math.random()*(b-a);
const scene=(cfg,idx,r)=>(sc,st,set,hk)=>{
  const R=P.DIR.director(sc,P.DIR.TH);const S={};let busy=false,done=false;
  const [img,h]=cfg.cast[idx%cfg.cast.length];const bg=cfg.bgs[idx%cfg.bgs.length];const pk=propFor(r);
  const alive=()=>R.alive()&&!done;
  const amb=()=>{try{if(cfg.amb==='leaves')R.leaves(3,14);else if(cfg.amb==='bubble')R.fx('bubble',rnd(-1.4,1.4),.3,6,{w:.4,t:3,vy:.5});else R.fx('sparkle',rnd(-1.4,1.4),rnd(.8,1.8),6,{w:.5,t:1.4});}catch(e){}};
  R.open(async()=>{await R.bg(bg);
    S.a=R.act(img,{x:-.7,y:.3,h:h*.92,face:1});S.a.st.op=0;S.a.ap();await S.a.show(.5,'pop');
    if(pk){S.p=R.prop(pk,1.9,1.9,.75);if(S.p){await R.toss(S.p,1.0,.3,1.0,.5);}}
    amb();await S.a.wag(.7,.04,4);
    /* the scene keeps living while the child thinks */
    (async()=>{let k=0;while(R.alive()&&!done){await R.wait(rnd(1.8,3));if(!R.alive()||done)break;if(busy)continue;k++;
      const m=k%4;if(m===1)await S.a.wag(.8,.05,4);else if(m===2){await S.a.jump(.1);}else if(m===3){amb();if(S.p){const y0=S.p.position.y;await R.T(.6,e=>{S.p.position.y=y0+Math.sin(e*Math.PI)*.12;});}}else{await S.a.shiver(.5);}}})();});
  const hold=fn=>{busy=true;R.beat(async()=>{try{await fn();}finally{busy=false;}});};
  const API={
    win(){hold(async()=>{R.word(CHEER[Math.floor(Math.random()*CHEER.length)],-.2,2.0,'#2b8a3e',1.6);R.fx('sparkle',0,1.2,24,{w:2.4,t:1.6});R.fx('heart',-.7,1.7,8,{w:.8,t:1.5});
        const j=[S.a.jump(.28)];if(S.p){const y0=S.p.position.y;j.push(R.T(.9,e=>{S.p.position.y=y0+Math.sin(e*Math.PI)*.35;S.p.rotation.z=e*Math.PI*2;}));}
        await all(j);await S.a.jump(.2);await S.a.go(S.a.st.x+.5,S.a.st.y,.9);await S.a.go(S.a.st.x-.5,S.a.st.y,.9);});return 2800;},
    miss(){hold(async()=>{R.word(OOPS[Math.floor(Math.random()*OOPS.length)],-.5,1.9,'#e03131',1.3);const j=[S.a.shiver(.9)];if(S.p){const x0=S.p.position.x;j.push(R.T(.6,e=>{S.p.position.x=x0+Math.sin(e*Math.PI*8)*.07*(1-e);}));}await all(j);});}
  };P.DIR_ROUND=API;return API;};
P.DIR.rounds=function(d){const cfg=CFG[d.id];if(!cfg)return;let n=0;(d.rounds||[]).forEach(r=>{if(!simple(r))return;const k=n++;r.set={};r.scene=scene(cfg,k,r);});};
})();
