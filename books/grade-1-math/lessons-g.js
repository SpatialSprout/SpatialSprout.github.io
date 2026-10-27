/* The Interactive Classroom: Grade 1 Math — Units 24–28: patterns, organizing data, pictographs, concrete graphs, probability */
(function(){
"use strict";
const P=window.PM;if(!P||P.failed||!P.THREE||!P.K||!P.K.chart)return;
const {THREE,V,G,lam,mk,label,clearGroup,rr,T,wrap,header,keyWords,FT,ZS,X0,TW,INK,GREY,tint,A,hop,tween,moveTo,easeOut,wedgeGeo}=P;
const K=P.K,{rnd,pick,shuffle,choices,nearby,words,toy,lay,tag,mat,icon,icons,xMark,tbox,exGrid,bigText,hand,sub,nm,bx,cyl,sph,at}=K;
const acc=()=>P.ACC;

/* =========================================================
   Unit 24 · Patterns
   ========================================================= */
const CORES=['AB','AAB','ABB','ABC','AABB','ABCC'];
const PSETS=[['star','ball','apple'],['duck','fish','turtle'],['cupcake','donut','cookie'],['kite','balloon','car'],['flower','leaf','acorn'],['bell','star','mitten']];
P.lesson({id:'patterns1',title:'Patterns',strand:'Algebra',codes:['C1.1','C1.2'],
 guide:{goal:'Find the core of a repeating pattern, extend it, fix a mistake, make your own patterns, and find patterns on a hundreds chart.',words:'pattern, repeat, core, next, missing, mistake, AB, ABB, ABC, hundreds chart',
  ask:['What part of this pattern repeats?','What comes next? How do you know?','What pattern do you see in the column under 3?'],home:'Make a pattern with spoons and forks, or clap-clap-stomp. Can your family guess what comes next?'},
 learn:[{say:'Find the core.',speech:'Star, ball, ball. Star, ball, ball. The part that repeats is star, ball, ball. That is the core! So what comes next? A star!',view:'model',demo:'abb'}],
 fig:'A row of toys that makes a pattern, and a hundreds chart.',rz:.45,
 explore:['Press *Next* to grow the pattern.','Press *New pattern* for another core.','Press *Chart* to see number patterns.'],
 howTo:'Find the core. Then tap the toy that comes next, the one that is wrong, or the answer.',
 rz:1.2,init:k=>({view:'row',core:'ABB',set:PSETS[0],n:6,bad:null,miss:null,lit:[],ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=tbox(p,y-10,280,'The core repeats');
  const row=(core,set,n,yy,mark)=>{for(let i=0;i<n;i++){const ch=core[i%core.length];const k=set['ABC'.indexOf(ch)];icon(g,k,X0+60+i*76,yy,56);}if(mark){rr(g,X0+28,yy-38,core.length*76,76,14);g.strokeStyle='#e4572e';g.lineWidth=3;g.setLineDash([8,6]);g.stroke();g.setLineDash([]);}};
  row('ABB',PSETS[0],9,y+40,true);T(g,'core: star, ball, ball  (ABB)',X0+30,y+110,FT.bodyB,acc());
  row('ABC',PSETS[1],8,y+170,false);K.hand(g,'… next: turtle',X0+640,y+180,INK);y+=230;
  y=tbox(p,y,330,'Patterns on the hundreds chart');
  K.chart2d(g,X0+30,y-6,26,{hi:i=>i%10===3?'#ffe08a':i<=60&&i%5===0?tint('#5fd38a',.45):null});
  ['Yellow: *3, 13, 23, 33* … the ones digit is always *3*.','Green: *5, 10, 15, 20* … every 5th number.'].forEach((t,i)=>wrap(g,t,X0+320,y+30+i*100,TW-320,34,{font:FT.body,bold:FT.bodyB,boldColor:acc()}));y+=280;
  y=exGrid(p,y,2,150,(i,x,yy,w,h)=>{
    if(i===0){T(g,'Is this a pattern?',x+56,yy+34,FT.smallB);['kite','car','kite','car','car','kite'].forEach((k,j)=>icon(g,k,x+50+j*58,yy+90,44));hand(g,'No! It does not repeat.',x+56,yy+140,'#e4572e');}
    if(i===1){T(g,'Find the mistake',x+56,yy+34,FT.smallB);['flower','leaf','flower','leaf','leaf','leaf'].forEach((k,j)=>icon(g,k,x+50+j*58,yy+90,44));xMark(g,x+50+4*58,yy+90,44);}
  });
  y=keyWords(p,y,[['pattern','things that repeat in the same order'],['core','the part of a pattern that repeats']]);return y;},
 readout(p,S,y){const g=p.g,st=S.st;if(st.view==='row')T(g,'core: '+st.core,X0,y+54,ZS(44),acc());return y+70;},
 build(S,grp,mode,game){const st=S.st;const g2=K.stage(grp,.5);
  const kOf=i=>st.set['ABC'.indexOf(st.core[i%st.core.length])];
  function draw(){clearGroup(g2);
    if(st.view==='row'){const n=st.n,gap=Math.min(.5,4.3/(n+(st.q?1:0)));const x0=-(n-1+(st.q?1:0))*gap/2;
      for(let i=0;i<n;i++){let k=kOf(i);if(st.badShow===i)k=st.badK;const t=toy(st.miss===i?'block':k,{s:gap>.45?1.15:.95,c:st.miss===i?'#fff3c4':null});if(st.miss===i){const L=tag('?',{size:.26});L.position.y=.5;t.add(L);}
        t.position.set(x0+i*gap,0,-2.3);g2.add(t);K.tapOn(t,()=>tapI(i));if(st.cross===i)K.crossOut(t);}
      if(st.q){const q=tag('?',{size:.36,bg:'#fff3c4',border:'#e09b00'});q.position.set(x0+n*gap,.35,-2.3);g2.add(q);}
      if(st.pal){st.pal.forEach((k,i)=>{const t=toy(k,{s:1.3});t.position.set((i-1)*1.1,0,-1.1);g2.add(t);const pad=mk(G('k_pad',()=>new THREE.CylinderGeometry(.38,.38,.03,28)),lam('#e8f5e9'),0);pad.position.set((i-1)*1.1,.01,-1.1);g2.add(pad);K.tapOn(t,()=>tapPal(k));});}}
    else K.chart(g2,{c:.36,z0:-3.0,hi:i=>st.lit.includes(i)?'#ffe08a':null},tapN);
    A.redraw();}
  function tapI(i){A.pop();A.say(st.badShow===i?st.badK:kOf(i));if(mode==='play'&&!st.setup&&st.bad!=null){if(i===st.bad){st.cross=i;draw();game.solved('Yes! That one breaks the pattern.');}else A.bad('Say the core out loud and check each one.');}}
  function tapPal(k){A.pop();A.say(k);if(mode==='play'&&!st.setup&&st.wantK){if(k===st.wantK){if(st.miss!=null){st.miss=null;}else{st.n++;st.q=false;}st.pal=null;draw();game.solved('Yes! The '+k+' fits the pattern.');}else A.bad('Find the core first.');}}
  function tapN(n){A.pop();A.say(String(n));if(mode==='play'&&!st.setup&&st.wantN!=null){if(n===st.wantN){st.lit.push(n);draw();game.solved('Yes! '+n+' continues the pattern.');}else A.bad('Look at the ones digit, or count the jump.');}else{if(!st.lit.includes(n))st.lit.push(n);draw();}}
  draw();
  return {info:()=>st.view+st.core+st.n+(st.bad==null?'':st.bad)+(st.miss==null?'':st.miss)+st.lit.join(),
    controls:()=>{const c=st.view==='row'?[{t:'Next',go:true,fn:()=>{if(st.n<10){st.n++;A.pop();A.say(kOf(st.n-1));draw();}}},{t:'New pattern',fn:()=>{st.core=pick(CORES);st.set=pick(PSETS);st.n=st.core.length*2;st.bad=null;st.badShow=null;st.miss=null;st.q=false;st.pal=null;st.cross=null;draw();}},{t:'Chart',fn:()=>{st.view='chart';st.lit=[];draw();}}]
      :[{t:'Row',fn:()=>{st.view='row';draw();}},{t:'Clear',fn:()=>{st.lit=[];draw();}}];
      if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);return c;},
    demo(n){st.ask=null;st.wantK=null;st.wantN=null;st.pal=null;st.cross=null;st.badShow=null;
      if(n==='abb'){st.view='row';st.core='ABB';st.set=PSETS[0];st.n=6;st.bad=null;st.miss=null;st.q=true;draw();A.seq([[1800,()=>{st.q=false;st.n=7;draw();A.say('star!');}]]);}
      if(n==='abb6'){st.view='row';st.core='ABB';st.set=PSETS[0];st.n=6;st.bad=null;st.miss=null;st.q=true;draw();}if(n==='abb7'){st.view='row';st.core='ABB';st.set=PSETS[0];st.n=7;st.bad=null;st.miss=null;st.q=false;draw();}
      if(n==='abc'){st.view='row';st.core='ABC';st.set=PSETS[1];st.n=8;st.bad=null;st.miss=null;st.q=true;draw();}
      if(n==='col3'){st.view='chart';st.lit=[3,13,23,33,43,53,63,73,83,93];draw();}if(n==='by5'){st.view='chart';st.lit=[5,10,15,20,25,30,35,40,45,50];draw();}},
    task(r){st.setup=true;st.ask=null;st.wantK=null;st.wantN=null;st.bad=null;st.badShow=null;st.miss=null;st.q=false;st.pal=null;st.cross=null;st.lit=[];st.view='row';let txt;
      st.core=pick(CORES);st.set=pick(PSETS);st.n=Math.min(9,st.core.length*2+rnd(0,1));const used=[...new Set(st.core)].map(c=>st.set['ABC'.indexOf(c)]);
      if(r===0){const isP=pick([true,false]);if(!isP){st.badShow=rnd(st.core.length,st.n-1);st.badK=pick(st.set.filter(k=>k!==kOf(st.badShow)));}st.ask={o:['yes','no'],ans:isP?'yes':'no',ok:isP?'Yes! The core repeats: it is a pattern.':'Right! One toy breaks it, so it is not a pattern.'};txt='Is this a *pattern*? Look for a core that repeats.';}
      else if(r===1||r===3){st.q=true;const nxt=kOf(st.n);st.wantK=nxt;st.pal=shuffle(used.length>=3?used:used.concat(st.set.filter(k=>!used.includes(k))).slice(0,3));txt='What comes *next*? Tap it below.';}
      else if(r===2){st.bad=rnd(st.core.length,st.n-1);st.badShow=st.bad;st.badK=pick(st.set.filter(k=>k!==kOf(st.bad)));txt='One toy is a *mistake*. Tap the one that breaks the pattern.';}
      else{st.view='chart';const q=pick([{s:rnd(1,9),d:10},{s:rnd(1,4)*2,d:2},{s:5,d:5},{s:rnd(1,9),d:11}]);st.lit=[0,1,2].map(i=>q.s+i*q.d);st.wantN=q.s+3*q.d;txt='Coloured: *'+st.lit.join(', ')+'*. Tap the number that comes next in this pattern.';}
      draw();st.setup=false;return txt;}};}
});

/* =========================================================
   Unit 25 · Organizing data: sorting and tally marks
   ========================================================= */
function tally3(grp,n,x,z){const g=new THREE.Group();g.position.set(x,0,z);grp.add(g);for(let i=0;i<n;i++){const b=Math.floor(i/5),k=i%5;if(k<4){const s=bx(.03,.03,.36,INK,0);s.position.set(b*.42+k*.08,.03,0);g.add(s);}else{const s=bx(.03,.03,.46,'#e4572e',0);s.position.set(b*.42+.12,.04,0);s.rotation.y=-.9;g.add(s);}}return g;}
function tally2d(g,n,x,y,h){for(let i=0;i<n;i++){const b=Math.floor(i/5),k=i%5;if(k<4)K.line(g,[x+b*h*1.2+k*h*.22,y,x+b*h*1.2+k*h*.22,y+h],INK,3);else K.line(g,[x+b*h*1.2-h*.12,y+h*.85,x+b*h*1.2+h*.78,y+h*.15],'#e4572e',3);}}
P.lesson({id:'data1',title:'Sorting and tally marks',strand:'Data',codes:['D1.1','D1.2','D1.3'],
 guide:{goal:'Sort things into groups in more than one way, record how many with tally marks or numbers, and read the counts to compare groups.',words:'sort, group, data, tally mark, count, record, most, fewest, how many more',
  ask:['How else could we sort these?','Why is the 5th tally mark drawn across the others?','Which group has the most? How many more?'],home:'Sort the fruit bowl by kind, then by colour. Make tally marks for each group.'},
 learn:[{say:'Sort, then tally.',speech:'Sort the balls by colour. Make one tally mark for each ball. Four marks, then the fifth one goes across. That makes a bundle of five!',view:'model',demo:'sortcol'}],
 fig:'Toys sorted in two ways, with tally marks for each group.',rz:.45,
 explore:['Press *By colour* or *By size* to sort.','Tally marks appear for each group.','Press *Mix* to start again.'],
 howTo:'Sort the toys, then read the tally marks or count. Tap the answer.',
 init:k=>({view:'mix',by:null,set:null,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=tbox(p,y-10,240,'Tally marks');
  [1,2,3,4,5,7,10].forEach((n,i)=>{const x=X0+40+i*110;tally2d(g,n,x,y,50);T(g,String(n),x+20,y+90,FT.bodyB,acc());});
  wrap(g,'Make *1 mark* for each thing. The *5th mark* goes *across* the four: a bundle of 5 is easy to count by 5s!',X0+30,y+130,TW-60,34,{font:FT.body,bold:FT.bodyB,boldColor:acc()});y+=190;
  y=tbox(p,y,340,'One set, two ways to sort');
  const set=[['ball','#e53935',1],['ball','#2f7de1',0],['ball','#e53935',0],['ball','#2f7de1',1],['ball','#e53935',1],['ball','#e53935',0],['ball','#2f7de1',1]];
  set.forEach(([k,c,b],i)=>icon(g,k,X0+60+i*70,y+20,b?54:34,c));
  const tb=(x,yy,title,rows)=>{T(g,title,x,yy,FT.bodyB,INK);rows.forEach(([t,n],j)=>{T(g,t,x,yy+44+j*44,FT.body,INK);tally2d(g,n,x+120,yy+16+j*44,32);T(g,String(n),x+260,yy+44+j*44,FT.bodyB,acc());});};
  tb(X0+40,y+100,'By colour',[['red',4],['blue',3]]);tb(X0+430,y+100,'By size',[['big',4],['small',3]]);y+=270;
  y=exGrid(p,y,2,130,(i,x,yy,w,h)=>{
    if(i===0){tally2d(g,8,x+60,yy+40,44);hand(g,'5, 6, 7, 8 → 8',x+220,yy+80,INK);}
    if(i===1){wrap(g,'Red: 4, blue: 3. How many more red?',x+56,yy+40,w-80,30,{font:FT.small,bold:FT.smallB});hand(g,'4 − 3 = 1 more',x+56,yy+110,acc());}
  });
  y=keyWords(p,y,[['data','information we collect, like counts'],['tally mark','a line we draw to count one thing']]);return y;},
 readout(p,S,y){const g=p.g,st=S.st;if(st.by){const G2=groupsOf(st);T(g,G2.map(q=>q.name+': '+q.items.length).join('   ·   '),X0,y+54,ZS(38),acc());}return y+70;},
 build(S,grp,mode,game){const st=S.st;const g2=K.stage(grp);
  function newSet(){const kind=pick(['ball','block','balloon','star']);const n=rnd(8,12);st.kind=kind;st.set=[...Array(n)].map(()=>({c:pick(['#e53935','#2f7de1']),big:pick([true,false])}));if(st.set.every(o=>o.c===st.set[0].c))st.set[0].c=st.set[0].c==='#e53935'?'#2f7de1':'#e53935';}
  function draw(){clearGroup(g2);if(!st.set)newSet();
    if(!st.by){K.mat(g2,4.4,2.2,0,-1.9,'#fff7e0');st.set.forEach((o,i)=>{const t=toy(st.kind,{c:o.c,s:o.big?1.4:.85});const a=i*2.39,r=.25+((i*7)%5)*.2;t.position.set(Math.cos(a)*r*1.9,0,-1.9+Math.sin(a)*r*.9);g2.add(t);});}
    else{const G2=groupsOf(st);G2.forEach((q,j)=>{const x=j?1.15:-1.15;const pad=mk(new THREE.BoxGeometry(2.0,.03,1.5),lam(j?'#e3f2fd':'#ffebee'),20);pad.position.set(x,.015,-2.3);g2.add(pad);
        q.items.forEach((o,i)=>{const t=toy(st.kind,{c:o.c,s:o.big?1.2:.75});t.position.set(x-.7+(i%4)*.46,0,-2.75+Math.floor(i/4)*.46);g2.add(t);});
        const L=tag(q.name,{size:.24});L.position.set(x,.7,-3.15);g2.add(L);if(st.showT!==false)tally3(g2,q.items.length,x-.75,-1.15);});}
    A.redraw();}
  function sortBy(b){st.by=b;draw();A.say('Sorted by '+b);}
  draw();
  return {info:()=>(st.by||'mix')+st.set.length,
    controls:()=>{const c=[{t:'By colour',go:true,fn:()=>sortBy('colour')},{t:'By size',fn:()=>sortBy('size')},{t:'Mix',fn:()=>{st.by=null;newSet();draw();}}];
      if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);return c;},
    demo(n){st.ask=null;st.showT=true;const fixed=()=>{st.kind='ball';st.set=[[1,1],[0,0],[1,0],[0,1],[1,1],[1,0],[0,1]].map(([r,b])=>({c:r?'#e53935':'#2f7de1',big:!!b}));};
      if(n==='mix'){fixed();st.by=null;draw();}if(n==='sortcol'){fixed();st.by=null;draw();A.seq([[900,()=>sortBy('colour')]]);}if(n==='col'){fixed();st.by='colour';draw();}if(n==='size'){fixed();st.by='size';draw();}},
    task(r){st.setup=true;st.ask=null;st.showT=true;let txt;newSet();
      if(r===0){st.by='colour';st.showT=true;const G2=groupsOf(st);const q=pick(G2);st.ask={o:nearby(q.items.length,0,12),ans:q.items.length,ok:'Yes! '+q.items.length+' '+q.name+'.'};txt='Read the tally marks. How many are *'+q.name+'*?';}
      else if(r===1){st.by=null;const big=st.set.filter(o=>o.big).length;st.ask={o:nearby(big,0,12),ans:big,ok:'Yes! '+big+' big ones.'};txt='Sort them in your head *by size*. How many are *big*? (Press By size to check.)';}
      else if(r===2){st.by='size';const G2=groupsOf(st);const a=G2[0].items.length,b=G2[1].items.length;if(a===b){st.set.push({c:'#e53935',big:true});}const H=groupsOf(st);const most=H[0].items.length>H[1].items.length?H[0]:H[1];st.ask={o:H.map(q=>q.name),ans:most.name,ok:'Yes! There are more '+most.name+' ones.'};txt='Sorted by size. Which group has *more*?';}
      else if(r===3){st.by='colour';let G2=groupsOf(st);if(G2[0].items.length===G2[1].items.length){st.set.push({c:'#e53935',big:false});G2=groupsOf(st);}const d=Math.abs(G2[0].items.length-G2[1].items.length);const m=G2[0].items.length>G2[1].items.length?G2[0]:G2[1],l=m===G2[0]?G2[1]:G2[0];st.ask={o:nearby(d,0,8),ans:d,ok:'Yes! '+m.items.length+' − '+l.items.length+' = '+d+' more '+m.name+'.'};txt='How many *more '+m.name+'* than '+l.name+'?';}
      else{st.by='colour';st.showT=false;const n=st.set.length;st.ask={o:nearby(n,4,14),ans:n,ok:'Yes! '+n+' in all.'};txt='How many toys are there *in all*? Add the two groups.';}
      draw();st.setup=false;return txt;}};}
});
function groupsOf(st){if(st.by==='size')return [{name:'big',items:st.set.filter(o=>o.big)},{name:'small',items:st.set.filter(o=>!o.big)}];return [{name:'red',items:st.set.filter(o=>o.c==='#e53935')},{name:'blue',items:st.set.filter(o=>o.c!=='#e53935')}];}

/* =========================================================
   Unit 26 · Pictographs   and   Unit 27 · Concrete graphs
   ========================================================= */
const TOPICS=[{t:'Favourite fruit',cats:['apple','pear','strawberry','carrot'],names:['apples','pears','strawberries','carrots']},{t:'Pets in our class',cats:['fish','turtle','duck','ladybug'],names:['fish','turtles','ducks','ladybugs']},
  {t:'Favourite treat',cats:['cupcake','cookie','donut','apple'],names:['cupcakes','cookies','donuts','apples']},{t:'How we play outside',cats:['ball','kite','car','balloon'],names:['ball games','kites','toy cars','balloons']}];
function graphLesson(cfg){
 return {id:cfg.id,title:cfg.title,strand:'Data',codes:cfg.codes,guide:cfg.guide,learn:cfg.learn,fig:cfg.fig,rz:.5,explore:cfg.explore,howTo:cfg.howTo,
 init:k=>({topic:cfg.t0,v:cfg.v0.slice(),ask:null}),left:cfg.left,
 readout(p,S,y){const g=p.g,st=S.st;const tp=TOPICS[st.topic];T(g,tp.names.map((n,i)=>n+' '+st.v[i]).join(' · '),X0,y+52,FT.bodyB,acc());return y+70;},
 build(S,grp,mode,game){const st=S.st;const g2=K.stage(grp);
  function draw(){clearGroup(g2);const tp=TOPICS[st.topic];const n=tp.cats.length;const base=mk(new THREE.BoxGeometry(4.4,.03,.04),lam(INK),0);base.position.set(0,.02,-1.05);g2.add(base);
    const ttl=tag(tp.t,{size:.26,border:acc()});ttl.position.set(0,1.1,-3.3);g2.add(ttl);
    tp.cats.forEach((k,i)=>{const x=(i-(n-1)/2)*1.05;const ic=toy(k,{s:1.1});ic.position.set(x,0,-.75);g2.add(ic);K.tapOn(ic,()=>tapCol(i));
      for(let j=0;j<st.v[i];j++){let o;if(cfg.kind==='picto'){o=toy(k,{s:.72});o.position.set(x,0,-1.3-j*.27);}else{o=K.bx(.5,.24,.24,K.VC(i+3));o.position.set(x,.12,-1.3-j*.25);}g2.add(o);K.tapOn(o,()=>tapCol(i));}
      if(st.slots&&st.slots[i]!=null){for(let j=st.v[i];j<st.slots[i];j++){const o=mk(G('k_slot',()=>new THREE.BoxGeometry(.5,.02,.22)),new THREE.MeshLambertMaterial({color:'#fff3c4'}),20);o.position.set(x,.01,-1.3-j*(cfg.kind==='picto'?.27:.25));g2.add(o);}}
      if(st.showN!==false){const L=tag(String(st.v[i]),{size:.22,bg:'#ffffff'});L.position.set(x,.5,-1.3-st.v[i]*(cfg.kind==='picto'?.27:.25)-.1);g2.add(L);}});
    A.redraw();}
  function tapCol(i){const tp=TOPICS[st.topic];A.pop();A.say(tp.names[i]+': '+st.v[i]);
    if(mode==='play'&&!st.setup){if(st.build!=null){if(i===st.build){if(st.v[i]>=8){A.bad('That column is full.');return;}st.v[i]++;draw();if(st.v[i]===st.target)A.later(()=>game.solved('Yes! Now the graph shows '+st.target+' '+tp.names[i]+'.'),300);}else A.bad('Add to the '+tp.names[st.build]+' column.');return;}
      if(st.want!=null){if(i===st.want)game.solved(st.wantOk);else A.bad('Compare how tall the columns are.');}}}
  function rnd4(){const s=new Set();while(s.size<4)s.add(rnd(1,8));return [...s];}
  draw();
  return {info:()=>st.topic+':'+st.v.join(),
    controls:()=>{const c=[{t:'New data',go:true,fn:()=>{st.topic=rnd(0,TOPICS.length-1);st.v=rnd4();draw();}},{t:'Hide numbers',fn:()=>{st.showN=st.showN===false;draw();}}];
      if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);return c;},
    demo(n){st.ask=null;st.want=null;st.build=null;st.slots=null;st.showN=true;if(n==='show'){st.topic=cfg.t0;st.v=cfg.v0.slice();draw();}if(n==='grow'){st.topic=cfg.t0;st.v=[0,0,0,0];draw();const tgt=cfg.v0,s=[];tgt.forEach((t,i)=>{for(let j=0;j<t;j++)s.push([180,()=>{st.v[i]++;draw();}]);});A.seq(s);}},
    task(r){st.setup=true;st.ask=null;st.want=null;st.build=null;st.slots=null;st.showN=false;st.topic=rnd(0,TOPICS.length-1);st.v=rnd4();const tp=TOPICS[st.topic];let txt;
      if(r===0){const i=rnd(0,3);st.ask={o:nearby(st.v[i],1,8),ans:st.v[i],ok:'Yes! '+st.v[i]+' chose '+tp.names[i]+'.'};txt='How many chose *'+tp.names[i]+'*?';}
      else if(r===1){const most=pick([true,false]);const t=st.v.indexOf(most?Math.max(...st.v):Math.min(...st.v));st.want=t;st.wantOk='Yes! '+tp.names[t]+' has the '+(most?'most':'fewest')+'.';txt='Tap the column with the *'+(most?'most':'fewest')+'*.';}
      else if(r===2){let a=rnd(0,3),b=(a+rnd(1,3))%4;if(st.v[a]<st.v[b])[a,b]=[b,a];const d=st.v[a]-st.v[b];st.ask={o:nearby(d,0,7),ans:d,ok:'Yes! '+st.v[a]+' − '+st.v[b]+' = '+d+'.'};txt='How many *more* chose '+tp.names[a]+' than '+tp.names[b]+'?';}
      else if(r===3){const a=rnd(0,1),b=a+2;const s=st.v[a]+st.v[b];st.ask={o:nearby(s,2,16),ans:s,ok:'Yes! '+st.v[a]+' + '+st.v[b]+' = '+s+'.'};txt='How many chose *'+tp.names[a]+'* and *'+tp.names[b]+'* altogether?';}
      else{const i=rnd(0,3);const tgt=Math.min(8,st.v[i]+rnd(2,3));st.v[i]=Math.max(0,tgt-rnd(2,3));st.build=i;st.target=tgt;st.slots=[];st.slots[i]=tgt;st.showN=true;txt='The tally says *'+tgt+'* '+tp.names[i]+'. Tap the column to add '+(cfg.kind==='picto'?'pictures':'cubes')+' until it shows '+tgt+'.';}
      draw();st.setup=false;return txt;}};}};}
P.lesson(graphLesson({id:'picto1',title:'Pictographs',kind:'picto',t0:0,v0:[5,3,6,2],codes:['D1.3','D1.4','D1.5'],
 guide:{goal:'Read pictographs, use words like more, fewer, most and fewest to describe the data, and make a pictograph from a count.',words:'pictograph, picture, title, label, more, fewer, most, fewest, in all, how many more',
  ask:['What does each picture stand for?','Which column has the most? How do you know?','How many more chose apples than pears?'],home:'Ask your family their favourite fruit. Draw one small picture for each answer to make a pictograph.'},
 learn:[{say:'Build the pictograph.',speech:'Each picture stands for one child. Watch the pictograph grow: five apples, three pears, six strawberries and two carrots.',view:'model',demo:'grow'}],
 fig:'A 3D pictograph: one picture for each answer.',explore:['*Tap* a column to hear how many.','Press *New data* for another graph.','Press *Hide numbers* and count!'],
 howTo:'Read the pictograph and tap the answer, or tap a column to add pictures.',
 left(p,S){const g=p.g;let y=header(p,S);
  y=tbox(p,y-10,400,'Reading a pictograph');
  T(g,'Favourite fruit',X0+250,y+6,FT.h3,INK);const tp=TOPICS[0],v=[5,3,6,2];tp.cats.forEach((k,i)=>{const x=X0+90+i*150;for(let j=0;j<v[i];j++)icon(g,k,x,y+260-j*36,32);K.line(g,[X0+30,y+290,X0+640,y+290],INK,3);icon(g,k,x,y+320,40);});
  wrap(g,'Each picture = *1* child. *Strawberries* have the *most*: 6. *Carrots* have the *fewest*: 2.',X0+650,y+40,TW-660,32,{font:FT.small,bold:FT.smallB,boldColor:acc()});y+=360;
  y=exGrid(p,y,4,124,(i,x,yy,w,h)=>{
    if(i===0){T(g,'How many apples?',x+56,yy+34,FT.smallB);hand(g,'5',x+56,yy+92,acc());}
    if(i===1){T(g,'Apples or pears: more?',x+56,yy+34,FT.smallB);hand(g,'apples: 5 > 3',x+56,yy+92,acc());}
    if(i===2){T(g,'How many more strawberries than pears?',x+56,yy+34,FT.smallB);hand(g,'6 − 3 = 3',x+56,yy+92,acc());}
    if(i===3){T(g,'How many children in all?',x+56,yy+34,FT.smallB);hand(g,'5 + 3 + 6 + 2 = 16',x+56,yy+92,acc());}
  });
  y=keyWords(p,y,[['pictograph','a graph that uses pictures to show data'],['title','tells what the graph is about']]);return y;}}));
P.lesson(graphLesson({id:'cgraph1',title:'Concrete graphs',kind:'cubes',t0:2,v0:[4,6,3,5],codes:['D1.3','D1.4','D1.5'],
 guide:{goal:'Read and make concrete graphs, where real objects or cubes stand for the data, and compare the columns.',words:'concrete graph, column, cube, tally, compare, most, fewest, how many more, in all',
  ask:['What does each cube stand for?','Which column is tallest? What does that tell you?','How could you make a graph with real shoes?'],home:'Make a concrete graph with real shoes: line them up by colour. Which colour has the most?'},
 learn:[{say:'Stack the cubes.',speech:'One cube for each child. Stack them in columns. The tallest column shows the most!',view:'model',demo:'grow'}],
 fig:'A concrete graph made of stacked cubes.',explore:['*Tap* a column to hear how many.','Press *New data* for another graph.','Press *Hide numbers* and count the cubes!'],
 howTo:'Read the cube graph and tap the answer, or tap a column to add cubes.',
 left(p,S){const g=p.g;let y=header(p,S);
  y=tbox(p,y-10,380,'A graph made of real things');
  T(g,'Favourite treat',X0+30,y+6,FT.h3,INK);const v=[4,6,3,5],tp=TOPICS[2];
  v.forEach((n,i)=>{const x=X0+50+i*120;for(let j=0;j<n;j++){rr(g,x,y+260-j*34,70,32,5);g.fillStyle=K.VC(i+3);g.fill();g.strokeStyle='rgba(27,34,54,.45)';g.lineWidth=2;g.stroke();}icon(g,tp.cats[i],x+35,y+310,46);});
  wrap(g,'*One cube* for each child. *Cookies* have the *tallest* column: most children chose cookies.',X0+540,y+60,TW-550,32,{font:FT.small,bold:FT.smallB,boldColor:acc()});y+=340;
  y=tbox(p,y,170,'From tally marks to a graph');tally2d(g,7,X0+40,y,44);T(g,'→',X0+250,y+34,ZS(34),GREY);for(let j=0;j<7;j++){rr(g,X0+320+j*52,y,46,46,5);g.fillStyle='#ffb74d';g.fill();}T(g,'7 cubes',X0+700,y+34,FT.bodyB,acc());y+=120;
  y=exGrid(p,y,2,120,(i,x,yy,w,h)=>{
    if(i===0){T(g,'Cookies vs donuts?',x+56,yy+34,FT.smallB);hand(g,'6 − 3 = 3 more',x+56,yy+92,acc());}
    if(i===1){T(g,'How many children in all?',x+56,yy+34,FT.smallB);hand(g,'4 + 6 + 3 + 5 = 18',x+56,yy+92,acc());}
  });
  y=keyWords(p,y,[['concrete graph','a graph made with real objects or cubes'],['column','a stack that shows one group']]);return y;}}));
/* (lessons share one graph builder: picto1 uses pictures, cgraph1 uses cubes) */

/* =========================================================
   Unit 28 · Probability
   ========================================================= */
const LIKE=['impossible','unlikely','likely','certain'];
const EVENTS=[['The sun will rise tomorrow.','certain'],['A cat will fly to the moon.','impossible'],['It will snow in Canada in January.','likely'],['You will see a real dinosaur at school.','impossible'],['A baby will be taller than a tree.','impossible'],
  ['You will eat lunch today.','likely'],['It will snow in July in Toronto.','unlikely'],['A dog will say hello in words.','impossible'],['Monday comes after Sunday.','certain'],['You will find a toonie on the sidewalk.','unlikely'],['After a big lunch, you will be hungry one minute later.','unlikely']];
const PC={red:'#e53935',blue:'#2f7de1',yellow:'#ffd54f',green:'#43a047'};
P.lesson({id:'chance1',title:'Probability: how likely?',strand:'Data',codes:['D2.1','D2.2'],
 guide:{goal:'Use the words impossible, unlikely, likely and certain to tell how likely something is, and predict which result is more likely on a spinner or when picking from a bag.',words:'impossible, unlikely, likely, certain, more likely, less likely, chance, spinner, predict',
  ask:['Is it certain that tomorrow will be sunny?','On this spinner, which colour is more likely? Why?','How could we make red certain?'],home:'Put 4 red socks and 1 blue sock in a bag. Predict, then pick one. Do it 10 times!'},
 learn:[{say:'Spin and see.',speech:'Most of this spinner is yellow. Spin it! Yellow is more likely, because it has the bigger part.',view:'model',demo:'spin'}],
 fig:'A spinner and a bag of marbles to test chances.',rz:.45,
 explore:['Press *Spin* and watch where it stops.','Press *Bag* and *Pick* a marble.','*Tap* a part of the spinner to change its colour.'],
 howTo:'Read the question. Tap the word, tap the colour, or tap the spinner parts to colour them.',
 init:k=>({view:'spin',parts:['yellow','yellow','yellow','green'],bag:null,ang:0,res:[],ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=tbox(p,y-10,250,'How likely is it?');
  K.line(g,[X0+40,y+40,X0+TW-40,y+40],INK,4);LIKE.forEach((w,i)=>{const x=X0+40+i*(TW-80)/3;g.beginPath();g.arc(x,y+40,9,0,7);g.fillStyle=acc();g.fill();T(g,w,x,y+86,FT.bodyB,INK,i===0?'left':i===3?'right':'center');});
  [['can never happen',0],['might happen, but probably not',1],['will probably happen',2],['will surely happen',3]].forEach(([t,i])=>{const x=X0+40+i*(TW-80)/3;wrap(g,t,i===3?x-150:i===0?x:x-75,y+122,150,26,{font:FT.small});});y+=200;
  y=tbox(p,y,280,'Spinners and bags');
  const sp=(x,yy,parts)=>{parts.forEach((c,i)=>{g.beginPath();g.moveTo(x,yy);g.arc(x,yy,70,-Math.PI/2+i*Math.PI*2/parts.length,-Math.PI/2+(i+1)*Math.PI*2/parts.length);g.closePath();g.fillStyle=PC[c];g.fill();g.strokeStyle='#fff';g.lineWidth=3;g.stroke();});K.line(g,[x,yy,x+20,yy-50],INK,5);};
  sp(X0+110,y+90,['yellow','yellow','yellow','green']);wrap(g,'*Yellow* is *more likely*: it is a bigger part.',X0+200,y+40,230,32,{font:FT.small,bold:FT.smallB,boldColor:acc()});
  rr(g,X0+460,y+20,140,150,30);g.fillStyle='#eceff1';g.fill();[['red',0],['red',1],['red',2],['red',3],['blue',4]].forEach(([c,i])=>K.ell(g,X0+500+(i%3)*32,y+80+Math.floor(i/3)*36,14,14,PC[c]));
  wrap(g,'Picking *red* is *likely*. Picking *green* is *impossible*!',X0+620,y+40,TW-630,32,{font:FT.small,bold:FT.smallB,boldColor:acc()});y+=220;
  y=exGrid(p,y,2,150,(i,x,yy,w,h)=>{
    if(i===0){wrap(g,'"A fish will ride a bike."',x+56,yy+44,w-80,30,{font:FT.small,bold:FT.smallB});hand(g,'impossible',x+56,yy+120,'#e4572e');}
    if(i===1){wrap(g,'"It will be dark tonight."',x+56,yy+44,w-80,30,{font:FT.small,bold:FT.smallB});hand(g,'certain',x+56,yy+120,'#16a36f');}
  });
  y=keyWords(p,y,[['likely','will probably happen'],['impossible','can never happen']]);return y;},
 readout(p,S,y){const g=p.g,st=S.st;if(st.res.length)T(g,'Results: '+st.res.slice(-6).join(', '),X0,y+52,FT.bodyB,acc());return y+70;},
 build(S,grp,mode,game){const st=S.st;const g2=K.stage(grp);let arrow=null;
  function draw(){clearGroup(g2);arrow=null;
    if(st.view==='spin'){const n=st.parts.length;const sp=new THREE.Group();sp.position.set(-.6,0,-1.9);g2.add(sp);
      st.parts.forEach((c,i)=>{const a0=Math.PI/2-(i+1)*Math.PI*2/n,a1=Math.PI/2-i*Math.PI*2/n;const m=new THREE.Mesh(wedgeGeo(1.05,.08,a0+.01,a1-.01),lam(PC[c]));m.castShadow=true;sp.add(m);K.tapOn(m,()=>tapPart(i));});
      arrow=new THREE.Group();arrow.position.set(0,.14,0);sp.add(arrow);const ab=bx(.08,.04,.85,INK,0);ab.position.z=-.38;arrow.add(ab);const tip=K.cone(.09,.18,INK,8);tip.rotation.x=-Math.PI/2;tip.position.z=-.85;arrow.add(tip);arrow.rotation.y=st.ang;const pin=sph(.07,'#fff');pin.position.y=.16;sp.add(pin);
      Object.keys(PC).forEach((c,i)=>{if(!st.palette)return;const b=toy('ball',{c:PC[c],s:1.2});b.position.set(1.35+(i%2)*.6,0,-2.4+Math.floor(i/2)*.7);g2.add(b);K.tapOn(b,()=>{st.brush=c;A.pop();A.say(c);});});}
    else{const bag=new THREE.Mesh(new THREE.SphereGeometry(.85,24,18,0,Math.PI*2,0,Math.PI*.75),new THREE.MeshLambertMaterial({color:'#cfd8dc',transparent:true,opacity:.45,side:THREE.DoubleSide}));bag.position.set(-.5,.75,-1.9);g2.add(bag);
      st.bag.forEach((c,i)=>{const m=sph(.15,PC[c]);m.position.set(-.5+((i%4)-1.5)*.3,.25+Math.floor(i/4)*.28,-1.9+((i*3)%3-1)*.2);g2.add(m);});
      if(st.picked){const m=sph(.2,PC[st.picked]);m.position.set(1.3,.2,-1.9);g2.add(m);const L=tag(st.picked,{size:.22});L.position.set(1.3,.65,-1.9);g2.add(L);}
      Object.keys(PC).forEach((c,i)=>{if(!st.colourPick)return;const b=toy('ball',{c:PC[c],s:1.1});b.position.set(1.1+(i%2)*.55,0,-2.6+Math.floor(i/2)*.55);g2.add(b);K.tapOn(b,()=>tapColour(c));});}
    A.redraw();}
  function tapPart(i){if(st.brush){st.parts[i]=st.brush;A.pop();draw();chkPaint();return;}A.say(st.parts[i]);if(mode==='play'&&!st.setup&&st.colourPick){tapColour(st.parts[i]);}}
  function tapColour(c){A.pop();A.say(c);if(mode==='play'&&!st.setup&&st.wantC){if(c===st.wantC)game.solved(st.okC);else A.bad('Which colour has the most space, or the most marbles?');}}
  function chkPaint(){if(mode==='play'&&!st.setup&&st.paint){const y=st.parts.filter(c=>c===st.paint[0]).length,gn=st.parts.filter(c=>c===st.paint[1]).length;if(y>gn&&gn>0)A.later(()=>game.solved('Yes! '+st.paint[0]+' has more space, so it is more likely.'),300);}}
  function spin(){if(!arrow)return;const n=st.parts.length;const k=Math.floor(Math.random()*n);const target=-(k+.5)*Math.PI*2/n;const from=st.ang;const to=target-Math.PI*2*3;
    tween(1.4,q=>{st.ang=from+(to-from)*q;if(arrow)arrow.rotation.y=st.ang;},easeOut).then(()=>{st.ang=((to%(Math.PI*2))+Math.PI*2)%(Math.PI*2);st.res.push(st.parts[k]);A.say(st.parts[k]+'!');A.redraw();});}
  function pickM(){st.picked=pick(st.bag);A.pop();st.res.push(st.picked);draw();A.say(st.picked+'!');}
  draw();
  return {info:()=>st.view+st.parts.join()+(st.bag||[]).join()+st.res.length+(st.picked||''),
    controls:()=>{const c=st.view==='spin'?[{t:'Spin',go:true,fn:spin},{t:'Paint',fn:()=>{st.palette=!st.palette;st.brush=st.palette?'red':null;draw();}},{t:'Bag',fn:()=>{st.view='bag';st.bag=shuffle(['red','red','red','red','blue']);st.picked=null;st.res=[];draw();}}]
      :[{t:'Pick',go:true,fn:pickM},{t:'Spinner',fn:()=>{st.view='spin';st.res=[];draw();}},{t:'New bag',fn:()=>{st.bag=shuffle([...Array(rnd(4,8))].map(()=>pick(['red','blue','yellow'])));st.picked=null;st.res=[];draw();}}];
      if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);return c;},
    demo(n){st.ask=null;st.wantC=null;st.paint=null;st.colourPick=false;st.palette=false;st.brush=null;
      if(n==='spin'){st.view='spin';st.parts=['yellow','yellow','yellow','green'];st.res=[];draw();A.seq([[600,spin],[2000,spin]]);}if(n==='spinner'){st.view='spin';st.parts=['yellow','yellow','yellow','green'];st.res=[];draw();}
      if(n==='bag'){st.view='bag';st.bag=['red','red','blue','red','red'];st.picked=null;st.res=[];draw();}if(n==='allred'){st.view='bag';st.bag=['red','red','red','red','red'];st.picked=null;st.res=[];draw();}},
    task(r){st.setup=true;st.ask=null;st.wantC=null;st.paint=null;st.colourPick=false;st.palette=false;st.brush=null;st.res=[];st.picked=null;let txt;
      if(r===0||r===1){const e=pick(EVENTS.filter(q=>r===0?(q[1]==='impossible'||q[1]==='certain'):(q[1]==='likely'||q[1]==='unlikely')));st.view='bag';st.bag=['red','blue','yellow','red'];st.ask={o:LIKE,ans:e[1],ok:'Yes! That is '+e[1]+'.'};txt='"'+e[0]+'" Is it impossible, unlikely, likely or certain?';}
      else if(r===2){st.view='spin';const a=pick(['red','blue','yellow']),b=pick(Object.keys(PC).filter(c=>c!==a));const na=rnd(5,6);st.parts=shuffle([...Array(na)].map(()=>a).concat([...Array(8-na)].map(()=>b)));const more=pick([true,false]);st.wantC=more?a:b;st.colourPick=true;st.okC='Yes! '+st.wantC+' is '+(more?'more':'less')+' likely.';txt='Which colour is the spinner *'+(more?'more':'less')+' likely* to land on? Tap a part with that colour.';}
      else if(r===3){st.view='bag';const a=pick(['red','blue']),b=a==='red'?'yellow':'red';st.bag=shuffle([...Array(rnd(5,7))].map(()=>a).concat([b]));st.wantC=a;st.colourPick=true;st.okC='Yes! There are many more '+a+' marbles.';txt='Which colour marble are you *most likely* to pick? Tap the colour.';}
      else{st.view='spin';st.parts=['green','green','green','green'];st.palette=true;st.brush='yellow';st.paint=['yellow','green'];txt='Make *yellow more likely than green*. Tap parts of the spinner to paint them yellow (keep some green!).';}
      draw();st.setup=false;return txt;}};}
});
})();
