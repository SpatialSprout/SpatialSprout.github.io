/* The Interactive Classroom — acted stories (Grade 3 and up).
   A story is told in "acts". Each act has its own little world behind the actors: when the narrator
   reads the act's cue word, the old world folds down, a new habitat unfolds (a pioneer village, a
   river with a beaver dam, a building site, a Great Lake…) and that act's characters pop up and
   come alive: walkers stroll, swimmers swim, birds fly, machines drive. A young reader stands at the
   front, points and says a line. The story text above stays big and is highlighted word by word.

   story:{title, text, pics, acts:[[cueWord|null, habitat, [things…], 'kid line'], …]}
   Load after sketch.js, props3d.js, habitats.js, stage.js and subject-kit.js. */
(function(){
"use strict";
const P=window.PM;if(!P||!P.HAB||!P.DIO)return;
const {tween}=P;const D=P.DIO,H=P.HAB;
const hash=s=>String(s).split('').reduce((a,c)=>(a*31+c.charCodeAt(0))>>>0,7);
const people=n=>!!(P.PEOPLE&&P.PEOPLE[n])||/^(man|woman|boy|girl|child|baby|farmer|nurse|mechanic|artist|runner|swimmer|teacher|doctor|firefighter|grandma|grandpa|settler|pioneer|miner|builder|scientist|blacksmith)$/.test(n);
const BIG=/^(house|house2|home|barn|castle|library|school|schoolhouse|hospital|church|tree|pine|apple tree|log cabin|wigwam|longhouse|tent|igloo|bridge|tower|cn tower|skyscraper|lighthouse|mill|well|tractor|truck|bus|school bus|car|fire truck|train|ship|boat|sailboat|canoe|mountain|volcano|factory|store|shop|parliament|crane|bulldozer|logging truck|windmill|turbine|dam|beaver dam|castle|robot|carousel|dinosaur|elephant|giraffe|whale|moose|bison|horse|cow|bear|polar bear)$/;
const WHO={settler:'man',pioneer:'woman',miner:'man',builder:'man',scientist:'woman',blacksmith:'man'};

function acted(d){const sy=d.page.story;const acts=sy.acts;const seed=hash(d.id);
  return sc=>{let world=null,cast=[];const kid=D.kid(sc,seed%6,-1.8,-1.62,{ry:.7,s:.8});
    const fold=()=>{if(world){const old=world;tween(.45,k=>{old.g.scale.y=Math.max(.01,1-k);}).then(()=>{if(old.g.parent)old.g.parent.remove(old.g);old.dead=true;});}
      cast.forEach(p=>{p.userData.gone=true;D.shrink(p);});cast=[];};
    const show=(a,i)=>{const [,kind,things,line]=a;fold();
      const h=H.strip(kind||'meadow',seed+i*17);world=h;h.g.scale.y=.01;sc.g.add(h.g);h.g.position.y=-.005;tween(.6,k=>{h.g.scale.y=Math.max(.01,P.easeOut?P.easeOut(k):k);});
      sc.tick((dt,t)=>{if(!h.dead)h.tick(dt,t);});
      const list=(things||[]).slice(0,4),m=list.length;
      list.forEach((n1,j)=>{const sp=String(n1).split(':');const n0=sp[0],sz=sp[1]?+sp[1]:null;const n=WHO[n0]||n0;const x=(j-(m-1)/2)*Math.min(1.05,3.0/Math.max(1,m))+.25,z=-2.3+(j%2)*.18;let p;
        if(people(n)){p=D.person(sc,P.PEOPLE[n]?n:'man',x,z,{ry:-.35+(j%2)*.5});}
        else{p=sc.prop(n,x,z,{label:false,bare:true,tap:true,s:sz||(BIG.test(n)?.95:H.AN[n]?.78:.42)});}
        if(H.AN[n]==='swim'&&h.water){p.position.x=h.water[0]+(j-.5)*.3;p.position.z=h.water[1];}
        p.visible=false;cast.push(p);
        sc.later(()=>{if(p.userData.gone)return;D.grow(p);if(!p.userData.actor){const an=H.animate(p,n,{x:p.position.x,z:p.position.z,y:0,ry:-.35});sc.tick(dt=>{if(!p.userData.gone)an(dt);});}},350+j*420);});
      if(line)sc.later(()=>{sc.mode(kid,'point',2200);D.say(sc,kid,line,2800);},500+m*420);};
    acts.forEach((a,i)=>{if(i===0||!a[0])show(a,i);else sc.on(a[0],()=>show(a,i));});};}

/* a story without acts still gets a world: the habitat of its first picture that has one */
const prev=P.autoScene;
P.autoScene=function(d){const sy=d.page&&d.page.story;if(!sy)return prev?prev(d):null;
  if(sy.acts&&sy.acts.length)return {steps:[{scene:acted(d)}]};
  const pics=(sy.pics||[]);const kind=pics.map(n=>H.MAP[n]).find(Boolean)||H.strandEnv(d.strand,hash(d.id)%20);
  sy.acts=[[null,kind,pics.slice(0,3),null]];return {steps:[{scene:acted(d)}]};};
/* practice rounds that are plain questions get a little acted scene too: one of the story's worlds,
   its characters at play, and a young reader who cheers when you are right */
const MOODS=['Hmm…','Let me think…','Which one?','I know this!','Tricky!'];
function roundScene(d,k){const acts=d.page.story.acts;const a=acts[k%acts.length];const seed=hash(d.id)+k*13;
  return sc=>{const grp=new P.THREE.Group();grp.position.z=-.55;sc.g.add(grp);const h=H.strip(a[1]||'meadow',seed);grp.add(h.g);sc.tick((dt,t)=>h.tick(dt,t));
    const list=(a[2]||[]).slice(0,3),m=list.length,cast=[];
    list.forEach((n1,j)=>{const n0=String(n1).split(':')[0],n=WHO[n0]||n0;const x=(j-(m-1)/2)*1.0+.35,z=-2.85+(j%2)*.2;let p;
      if(people(n)){p=D.person(sc,P.PEOPLE[n]?n:'man',x,z,{ry:-.3});}else{p=sc.prop(n,x,z,{label:false,bare:true,tap:true,s:BIG.test(n)?.8:H.AN[n]?.7:.42});const an=H.animate(p,n,{x,z,y:0,ry:-.35});sc.tick(dt=>an(dt));}
      sc.g.remove(p);grp.add(p);cast.push(p);});
    const kid=D.kid(sc,(seed+k)%6,-1.7,-2.2,{ry:.6,s:.8});sc.g.remove(kid);grp.add(kid);sc.later(()=>{sc.mode(kid,'think');D.say(sc,kid,MOODS[(seed+k)%MOODS.length],2200);},300);
    return {win(){sc.mode(kid,'cheer',2200);D.say(sc,kid,['Yes!','Hooray!','We got it!','Woo-hoo!'][k%4],2000);cast.forEach((p,j)=>sc.later(()=>{const y0=p.position.y;P.tween(.45,q=>{p.position.y=y0+Math.sin(q*Math.PI)*.35;});},j*140));return 2400;},
      miss(){D.say(sc,kid,'Try again!',1500);},hold:2400};};}
const prev2=P.autoScene;
P.autoScene=function(d){const r=prev2(d);const sy=d.page&&d.page.story;if(!r||!sy||!sy.acts)return r;r.rounds=r.rounds||{};
  (d.rounds||[]).forEach((q,i)=>{const set=q.set||{};if(!Object.keys(set).length&&!q.scene)r.rounds[i]=roundScene(d,i);});
  return r;};
P.ACTED=acted;
})();
