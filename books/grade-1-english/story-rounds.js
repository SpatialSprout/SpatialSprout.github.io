/* Practice rounds for lessons 6-24: every picture question gets a little clay scene with real action.
   The lesson's characters stand in a backdrop, the thing the question is about is tossed in, and a right or wrong answer makes them cheer or shiver. */
(function(){
"use strict";
const P=window.PM;if(!P||!P.DIR)return;
const W=P.PIC.W;
const all=ps=>Promise.all(ps);
/* per lesson: backdrops to rotate through, characters (picture, height, face), ambient effect, a cheer word list */
const CFG={
 e01:{bgs:['classroom','sunhill1','schoolyard1','forest1','lunchtable1'],cast:[['pa-leowave',1.5],['pa-leocheer',1.5],['pa-leosay',1.5],['pa-leotummy',1.5],['pa-leobox',1.5]],amb:'sparkle',noprop:1,keep:1},
 e03:{bgs:['farm23','playroom1','forest1','schoolyard1','sunhill1'],cast:[['pa-timwave',1.5],['pa-timcheer',1.5],['pa-timlook',1.5],['pa-timpoint',1.5],['pa-timwow',1.5]],amb:'sparkle',noprop:1,keep:1},
 c06:{bgs:['meadow','pond-spring','pond-summer'],cast:[['pa-calf',1.15],['pa-lamb',1.0],['pa-cubnew',.8],['pa-ducklings',.7],['pa-chicks',.6],['pa-whalecalf',.8],['pa-cowcalf',1.0]],amb:'leaves'},
 c07:{bgs:['savanna','grass','sunset','den'],cast:[['pa-lion7eyes',1.3],['pa-lion7pounce',1.2],['pa-lion7young',1.6],['pa-lion7roar',1.6],['pa-lion7mom',1.4]],amb:'leaves'},
 c08:{bgs:['classroom','garden8','leaf8'],cast:[['pa-jar8egg',1.5],['pa-jar8cat',1.5],['pa-chrys8',1.4],['pa-mon8open',1.2],['pa-kids8',1.4]],amb:'leaves'},
 c10:{bgs:['store','street','kitchen-day'],cast:[['pa-shaw10bag',1.6],['pa-shaw10soap',1.6],['pa-milk10',.9],['pa-oil10',.8],['pa-items10',.9]],amb:'bubble'},
 c11:{bgs:['stage','classroom','kitchen-day'],cast:[['pa-soup11brag',1.7],['pa-soup11bow',1.6],['pa-mia11',1.5],['pa-soup11trip',1.6],['pa-sponge11',.8]],amb:'sparkle'},
 c12:{bgs:['pondice','spring12','hot12'],cast:[['pa-water12ice',1.2],['pa-water12splash',1.1],['pa-water12vapor',1.2],['pa-water12drop',1.1],['pa-don12run',1.7]],amb:'bubble'},
 c13:{bgs:['isle','shallow','river'],cast:[['pa-s13worry',1.4],['pa-s13wade',1.3],['pa-samcheer',1.2],['pa-samlook',1.4],['pa-samlog',1.1]],amb:'bubble'},
 c14:{bgs:['garage','garage-night','kitchen-night'],cast:[['pa-m14cap',1.2],['pa-catpoint',1.3],['pa-mousescared',1.1],['pa-mc14walk',1.2],['pa-m14cheese',1.2]],amb:'sparkle'},
 c15:{bgs:['park-wind','park','park-wind'],cast:[['pa-l15shout',1.7],['pa-b15kite',1.3],['pa-a15bub',1.4],['pa-leorun',1.3],['pa-kidsbench',1.15]],amb:'leaves'},
 c16:{bgs:['ocean','lake','fog','dew'],cast:[['pa-d16float',.9],['pa-d16ice',1.1],['pa-d16snow',1.1],['pa-d16fog',.9],['pa-d16dew',1.1],['pa-w16well',1.4]],amb:'bubble'},
 c17:{bgs:['creek-dirty','bathroom','park-bin','creek-clean'],cast:[['pa-k17plant',1.2],['pa-k17tap',1.5],['pa-k17bin',1.4],['pa-k17beach',1.2],['pa-d17happy',.7]],amb:'leaves'},
 c18:{bgs:['kitchen-day','hall','gas'],cast:[['pa-k18switch',1.6],['pa-e18open',1.6],['pa-b18blend',1.4],['pa-c18pump',.9],['pa-k18apple',1.6]],amb:'sparkle'},
 c19:{bgs:['lake19','hill19'],cast:[['pa-gran19',1.4],['pa-ella19',1.4],['pa-ben19',1.6],['pa-turb19',1.8]],amb:'leaves'},
 c20:{bgs:['mill20in','river20'],cast:[['pa-maya20',1.6],['pa-guide20',1.7],['pa-wheel20',1.4],['pa-wind20',1.7]],amb:'leaves'},
 c21:{bgs:['playgr21','park21'],cast:[['pa-reb21',1.7],['pa-amy21',1.6],['pa-janet21',1.6],['pa-linda21',1.6],['pa-squir21',1.2]],amb:'leaves'},
 c22:{bgs:['fair22','fairdusk22'],cast:[['pa-max22brave',1.7],['pa-max22dizzy',1.5],['pa-carou22',1.6],['pa-castle22',1.6]],amb:'sparkle'},
 c23:{bgs:['forest23','trail23'],cast:[['pa-mouse23',1.2],['pa-bear23',1.9],['pa-boulder23',1.1],['pa-mhouse23',1.5]],amb:'leaves'},
 c24:{bgs:['bedroom24','kitchen24'],cast:[['pa-matt24',1.8],['pa-sis24',1.6],['pa-rdog24',1.3],['pa-crane24',1.4]],amb:'sparkle'}
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
  const [img,h]=cfg.cast[idx%cfg.cast.length];const bg=cfg.bgs[idx%cfg.bgs.length];const pk=cfg.noprop?null:propFor(r);
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
P.DIR.rounds=function(d){const cfg=CFG[d.id];if(!cfg)return;let n=0;if(cfg.keep){(d.rounds||[]).forEach((r,k)=>{r.scene=scene(cfg,k,r);});return;}(d.rounds||[]).forEach(r=>{if(!simple(r))return;const k=n++;r.set={};r.scene=scene(cfg,k,r);});};
})();
