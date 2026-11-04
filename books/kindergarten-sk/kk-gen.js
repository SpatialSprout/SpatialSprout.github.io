/* The Interactive Classroom: Kindergarten — lesson makers. One letter or one number per lesson, like a first workbook:
   a big page with the letter and its picture friend, then 3D play. No reading load, lots of games. */
(function(){
"use strict";
const P=window.PM;if(!P||!P.unit||!P.PK)return;const U=P.unit,R=P.R,S=P.S;const {shuffle,pick,rnd}=P.PK;
const COL=['#ff6b6b','#4fb3ff','#5cc46a','#ffb347','#b07cff','#ff6bb5','#26c6b0','#f59f00'];
const cl=(s,i)=>COL[(String(s).charCodeAt(0)+(i||0))%8];
const T=(t,ok,i)=>(ok?'*':'')+'txt:'+t+':'+cl(t,i);
const g=(custom,o)=>Object.assign({custom},o);
/* round makers for the new games */
/* bubbles and sand-digging were too plain: these now become a balloon pop and a hide-and-seek game */
R.bub=(q,items,o)=>R.pop(q.replace(/bubbles/g,'balloons').replace(/bubble/g,'balloon'),items,o);
R.web=(q,items,o)=>({q,set:g('web',Object.assign({items:shuffle(items)},o||{}))});
R.fishing=(q,items,o)=>({q,set:g('fish',Object.assign({items:shuffle(items)},o||{}))});
R.dig=(q,items,o)=>R.peek(q.replace(/Dig in the sand! /,'Hide and seek! ').replace(/Dig to find (\w+)/,'Find $1'),items.slice(0,6),o);
R.mem=(q,pairs,o)=>({q,set:g('memory',Object.assign({pairs},o||{}))});
R.path=(q,seq,extra,o)=>({q,set:g('path',Object.assign({seq,extra},o||{}))});
R.trace=(q,ch,o)=>({q,set:g('trace',Object.assign({ch},o||{}))});
R.frog=(q,to,o)=>({q,set:g('frog',Object.assign({to,max:Math.max(5,Math.min(10,to+2))},o||{}))});
R.dots=(q,seq,item,o)=>({q,set:g('dots',Object.assign({seq,item},o||{}))});
R.cups=(q,target,others,o)=>({q,set:g('cups',Object.assign({target,others},o||{}))});
R.shadow=(q,choices,o)=>({q,set:g('shadow',Object.assign({choices:shuffle(choices)},o||{}))});
R.peek=(q,items,o)=>({q,set:g('peek',Object.assign({items:shuffle(items)},o||{}))});
R.spots=(q,n,o)=>({q,set:g('spots',Object.assign({n},o||{}))});
const AZ='ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const FEED=['bear','monkey','cow','pig','dog','cat','frog','duck'];
const WORDS=['zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen','twenty'];
const cap=s=>s[0].toUpperCase()+s.slice(1);
const art=w=>(/^[aeiou]/.test(w)?'an ':'a ')+w;

/* ---------- a letter lesson ---------- */
/* L = {ch:'A', item:'apple', words:['ant','airplane'], lower:false, sound:'a', build:'ant'} ; others = items of other letters (distractors) */
P.KLETTER=function(L,i,all,o){o=o||{};const low=!!o.lower;const ch=low?L.ch.toLowerCase():L.ch;const big=L.ch+L.ch.toLowerCase();
  const words=[L.item].concat(L.words||[]);const others=shuffle(all.filter(x=>x.ch!==L.ch).map(x=>x.item)).slice(0,6);
  const nb=all[(i+all.length-1)%all.length],na=all[(i+1)%all.length];const show=low?'lower':'upper';
  const SW=L.sw||'start with';const say=L.say?L.say:low?(L.ch.toLowerCase()+' says '+(L.sound||L.ch.toLowerCase())+', like '+L.item):(L.ch+' is for '+L.item);
  const line=L.line?L.line:low?('*'+ch+'* says *'+(L.sound||ch)+'* in *'+L.item+'*'):('*'+L.ch+'* is for *'+L.item+'*');
  const targets=words.concat(words).slice(0,3);const ex=(L.words||[]).slice(0,3);const NM=w=>w==='ufo'?'UFO':w;const LC=x=>low?x.toLowerCase():x;
  const seqLine=i===0?(LC('A')+' is the first letter!'):i===25?('After '+LC('Y')+' comes '+LC('Z')+'. '+LC('Z')+' is the last letter!'):('After '+LC(AZ[i-1])+' comes '+LC(AZ[i])+'!');
  const lettersFor=(t,n)=>[T(t,1,0),T(t,1,1),T(t,1,2)].slice(0,n).concat(shuffle(AZ.filter(x=>x!==L.ch)).slice(0,6-n).map((x,j)=>T(low?x.toLowerCase():x,0,j)));
  const seqStart=Math.max(0,Math.min(i-2,22));const seqL=AZ.slice(seqStart,seqStart+4).map(x=>low?x.toLowerCase():x);const extra=shuffle(AZ.filter(x=>!AZ.slice(seqStart,seqStart+4).includes(x))).slice(0,4).map(x=>low?x.toLowerCase():x);
  const feeder=L.feeder||FEED[i%FEED.length];const hopper=[['duck','pond'],['frog','pond'],['rabbit','carrot'],['chick','nest'],['penguin','igloo'],['puppy','house'],['kitten','basket']][i%7];
  const pool={
    dots:()=>{const st0=Math.max(0,Math.min(i-4,21));const sq=AZ.slice(i<5?0:st0,(i<5?0:st0)+5).map(LC);return R.dots('Join the dots in ABC order: *'+sq.join(', ')+'*. What will appear?',sq,L.item,{seed:i,col:cl(L.ch)});},
    cups:()=>R.cups('Watch the cups! Where is *'+ch+'* hiding?','txt:'+ch+':'+cl(L.ch),shuffle(AZ.filter(x=>x!==L.ch)).slice(0,2).map((x,j)=>'txt:'+LC(x)+':'+COL[(j*3+i+2)%8]),{level:Math.floor(i/9),cupCol:['#ff8787','#74c0fc','#ffa94d','#b197fc'][i%4]}),
    shadow:()=>R.shadow('Which letter fits the shadow?',['*txt:'+ch+':'+cl(L.ch)].concat(shuffle(AZ.filter(x=>x!==L.ch)).slice(0,2).map((x,j)=>'txt:'+LC(x)+':'+COL[(j*5+i)%8]))),
    peek:()=>R.peek('Hide and seek! Find all the *'+ch+'*s.',[0,1,2].map(j=>'*txt:'+ch+':'+COL[(j*3+i)%8]).concat(shuffle(AZ.filter(x=>x!==L.ch)).slice(0,3).map((x,j)=>'txt:'+LC(x)+':'+COL[(j*3+i+1)%8])),{hide:[['tree','house','tent','tree','mushroom','rock'],['house','tree','rock','tent','tree','mushroom'],['tent','tree','house','mushroom','rock','tree']][i%3]}),
    feed:()=>R.feed('Feed the '+feeder+' things that '+SW+' *'+L.ch+'*.',feeder,targets.map(w=>'*'+w).concat(others.slice(0,3))),
    pop:()=>R.pop('Pop the balloons with *'+ch+'*!',[0,1,2].map(j=>'*balloon:'+ch+':'+COL[(j*3+i)%8]).concat(shuffle(AZ.filter(x=>x!==L.ch)).slice(0,3).map((x,j)=>'balloon:'+(low?x.toLowerCase():x)+':'+COL[(j*3+i+1)%8]))),
    web:()=>R.web('Help the spider catch things that '+SW+' *'+L.ch+'*.',targets.map(w=>'*'+w).concat(others.slice(3,6)),{spiderSay:L.ch+'!'}),
    fish:()=>R.fishing('Catch the fish with *'+ch+'*!',[ch,ch,ch].map((x,j)=>'*'+x).concat(shuffle(AZ.filter(x=>x!==L.ch)).slice(0,3).map(x=>low?x.toLowerCase():x))),
    mem:()=>low?R.mem('Find the pairs: big letter and little letter.',[[T(L.ch,0,0),T(ch,0,4)],[T(nb.ch,0,0),T(nb.ch.toLowerCase(),0,4)],[T(na.ch,0,0),T(na.ch.toLowerCase(),0,4)]])
      :R.mem('Find the pairs: a letter and its friend.',[[T(L.ch,0,0),L.item],[T(nb.ch,0,0),nb.item],[T(na.ch,0,0),na.item]]),
    path:()=>R.path('Help the '+hopper[0]+' get to the '+hopper[1]+'! Hop only on *'+ch+'*.',[],shuffle(AZ.filter(x=>x!==L.ch&&x!==L.ch.toUpperCase())).slice(0,10).map(x=>low?x.toLowerCase():x),{only:ch,who:hopper[0],goal:hopper[1],cols:5}),
    pick:()=>R.tap('Tap the *'+L.item+'*.',['*'+L.item].concat(others.slice(0,2)),{layout:'row'}),
    build:()=>L.build?R.gap('Build the word *'+L.build+'*.',[L.build].concat(L.build.split('').map((c,j)=>j===0?'?':T(c,0,j))),[T(L.build[0],1,0)].concat(shuffle(AZ.filter(x=>x!==L.build[0].toUpperCase())).slice(0,2).map(x=>T(x.toLowerCase(),0,1))))
      :R.gap('What letter does *'+L.item+'* start with?',[L.item,'?'],[T(ch,1,0)].concat(shuffle(AZ.filter(x=>x!==L.ch)).slice(0,2).map(x=>T(low?x.toLowerCase():x,0,1))))};
  const order=(o.order||[['path','feed','cups','web','dots','fish','shadow','mem','peek','pop'],['path','shadow','fish','feed','peek','web','cups','pop','dots','mem'],['path','dots','pop','web','cups','feed','peek','fish','mem','shadow']][i%3]).slice();
  if(low){order.splice(order.indexOf('pop'),1,'build');}
  const rounds=order.map(k=>pool[k]());
  U({id:(o.prefix||'l')+L.ch,title:low?('The letter '+ch):('The letter '+L.ch),strand:o.strand||'Letters',codes:o.codes||['Literacy & Math'],
    guide:{goal:low?('Know the little letter '+ch+', its sound “'+(L.sound||ch)+'” and words that start with it: '+words.join(', ')+'.'):('Know the letter '+L.ch+' by name and shape, and link it to '+words.join(', ')+'.'),words:words.join(', '),ask:['What letter is this?','What starts with '+L.ch+'?','Can you trace '+L.ch+' in the air?'],home:'Hunt for '+L.ch+' at home: on cereal boxes, books and signs. Find something that starts with '+L.ch+'!'},
    watch:[L.ch+' for '+L.item+'!',say+'!'],fig:'A big 3D letter '+ch+' and '+art(L.item)+'.',
    kid:{color:true,id:(o.prefix||'l')+L.ch,big:low?ch:big,pic:L.item,line:line,words:ex.map(w=>[w,NM(w)])},
    page:{},
    steps:[{say:'Meet '+ch,speech:(low?'Here comes little '+ch+'! ':'Here comes the letter '+L.ch+'! ')+say+'! And look who else '+SW+' '+(low?(L.sound||ch):L.ch)+': '+ex.map(NM).join(', ')+'.',set:g('show',{i,big:low?ch:L.ch,item:L.item,words:ex,col:cl(L.ch),line:low?(ch+' · '+L.item):(L.ch+' is for '+L.item)})},
      {say:'Where is '+ch+'?',speech:'All the letters are hiding in little boxes! '+(i?('We already know '+AZ.slice(0,i).map(x=>low?x.toLowerCase():x).join(', ')+'. '):'')+'Which one is next? Out comes '+ch+'! '+seqLine.replace(/\*/g,''),set:g('abc',{idx:i,low,col:cl(L.ch),line:seqLine.replace(/\*/g,'')})}],
    rounds,tries:[['Say it: '+L.ch+' is for '+L.item+'.','Can you think of another '+L.ch+' word?'],['Draw '+art(L.item)+'.','Write a big '+L.ch+' beside it!']]});};

/* ---------- a number lesson ---------- */
P.KNUMBER=function(N,i,o){o=o||{};const n=N.n,item=N.item;const w=WORDS[n];const pl=n===1?item:(N.plural||item+'s');
  const frame=n>10?20:n>5?10:0;
  const pool={
    dots:()=>{const m=Math.max(5,Math.min(10,n));const sq=n>10?[...Array(5)].map((_,k)=>String(n-4+k)):[...Array(m)].map((_,k)=>String(k+1));return R.dots('Join the dots: *'+sq.join(', ')+'*!',sq,item,{seed:i+1});},
    cups:()=>R.cups('Watch the cups! Where is the number *'+n+'*?','txt:'+n+':'+COL[i%8],shuffle([...Array(o.max||10)].map((_,k)=>k+1).filter(k=>k!==n)).slice(0,2).map((k,j)=>'txt:'+k+':'+COL[(i+j+3)%8]),{level:Math.floor(i/4)}),
    shadow:()=>R.shadow('Which number fits the shadow?',['*txt:'+n+':'+COL[i%8]].concat(shuffle([...Array(o.max||10)].map((_,k)=>k+1).filter(k=>k!==n)).slice(0,2).map((k,j)=>'txt:'+k+':'+COL[(i+j+2)%8]))),
    bub:()=>R.bub('Pop the bubbles with the number *'+n+'*!',[T(n,1,0),T(n,1,1),T(n,1,2)].concat(shuffle([...Array(o.max||10)].map((_,k)=>k+1).filter(k=>k!==n)).slice(0,3).map((k,j)=>T(k,0,j)))),
    spots:()=>R.spots('Give the ladybug *'+n+'* spots. Tap, tap, tap!',n),
    frog:()=>R.frog('Help the frog hop to *'+n+'*. One pad at a time!',n,{max:Math.max(5,Math.min(o.max||10,n+2))}),
    count:()=>R.count('Tap to count the *'+(N.other||'stars')+'*. How many?',N.other||'star',n,{frame}),
    feed:()=>R.feed('Put *'+n+'* '+pl+' in the basket.','basket',[...Array(n)].map(()=>'*'+item).concat([item,item]),{need:n,count:true}),
    mem:()=>{const ks=[n].concat(shuffle([1,2,3,4,5,6].filter(k=>k!==n)).slice(0,2));return R.mem('Match each number with its dots.',ks.map((k,j)=>[T(k,0,j),'dots:'+k]));},
    cake:()=>R.feed('Put *'+n+'* candles on the birthday cake!','cake',[...Array(n)].map(()=>'*candle').concat(['candle','candle']),{need:n,count:true}),
    path:()=>{const s=[...Array(4)].map((_,k)=>Math.max(1,n-3)+k);return R.path('Hop on the numbers in order: *'+s.join(', ')+'*.',s.map(String),shuffle([...Array(Math.max(12,n+3))].map((_,k)=>k+1).filter(k=>!s.includes(k))).slice(0,4).map(String),{who:'frog',goal:'pond'});},
    count2:()=>R.count('Tap each *'+pl+'* to count. How many?',item,n,{frame}),
    pick:()=>R.tap('Tap the number *'+n+'*.',[T(n,1,0)].concat(shuffle([...Array(o.max||10)].map((_,k)=>k+1).filter(k=>k!==n)).slice(0,2).map((k,j)=>T(k,0,j+1))),{layout:'row'})};
  const order=(o.order||[['spots','dots','count','cups','feed','frog','shadow','cake','path','mem'],['count','frog','shadow','cake','dots','spots','path','cups','feed','mem'],['feed','cups','frog','spots','dots','count','cake','shadow','mem','path']][i%3]);
  const ord=n>10?['count','cups','path','shadow','count2','feed','dots','bub','cake','pick']:order.map(k=>k==='mem'&&n>6?'count2':k);const rounds=ord.map(k=>pool[k]());
  U({id:(o.prefix||'n')+n,title:'The number '+n,strand:o.strand||'Numbers',codes:['Literacy & Math'],
    guide:{goal:'Know the number '+n+' ('+w+'): see it, say it, count '+n+' things and trace the numeral.',words:n+', '+w+', count',ask:['How many '+pl+'?','Can you show '+n+' fingers?','What comes after '+n+'?'],home:'Count '+n+' things at home: spoons, socks, steps!'},
    watch:[n+' '+w+'!','Count with me: '+[...Array(n)].map((_,k)=>WORDS[k+1]).join(', ')+'!'],fig:'A big 3D number '+n+' and '+n+' '+pl+'.',
    kid:{big:String(n),pic:item,n:Math.min(n,10),line:'*'+n+'* '+w+': *'+n+' '+pl+'*',trace:String(n)+String(n)},page:{},
    steps:[{say:'Meet '+n,speech:'This is the number '+n+'. '+cap(w)+'! Look: '+n+' '+pl+'. Tap each one and count.',set:g('hello',{big:String(n),item,n,word:n+' '+w,sayBig:w,col:cl(String(n),i)})},
      {say:'Trace '+n,speech:'Let’s trace the number '+n+'. Tap the glowing dots, one by one.',set:g('trace',{ch:String(n),say:w})},
      {say:'Count '+n,speech:'Tap each '+(N.other||'star')+' and count out loud. How many? '+cap(w)+'!',set:S.count(N.other||'star',n,{frame})}],
    rounds,tries:[['Show '+n+' fingers!',n>5?'use two hands':'one hand'],['Jump '+n+' times.','count out loud!']]});};
})();
