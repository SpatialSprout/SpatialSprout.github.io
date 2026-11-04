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
R.bub=(q,items,o)=>({q,set:g('bubbles',Object.assign({items:shuffle(items)},o||{}))});
R.web=(q,items,o)=>({q,set:g('web',Object.assign({items:shuffle(items)},o||{}))});
R.fishing=(q,items,o)=>({q,set:g('fish',Object.assign({items:shuffle(items)},o||{}))});
R.dig=(q,items,o)=>({q,set:g('dig',Object.assign({items:shuffle(items)},o||{}))});
R.mem=(q,pairs,o)=>({q,set:g('memory',Object.assign({pairs},o||{}))});
R.path=(q,seq,extra,o)=>({q,set:g('path',Object.assign({seq,extra},o||{}))});
R.trace=(q,ch,o)=>({q,set:g('trace',Object.assign({ch},o||{}))});
R.frog=(q,to,o)=>({q,set:g('frog',Object.assign({to,max:Math.max(5,Math.min(10,to+2))},o||{}))});
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
  const targets=words.concat(words).slice(0,3);
  const lettersFor=(t,n)=>[T(t,1,0),T(t,1,1),T(t,1,2)].slice(0,n).concat(shuffle(AZ.filter(x=>x!==L.ch)).slice(0,6-n).map((x,j)=>T(low?x.toLowerCase():x,0,j)));
  const seqStart=Math.max(0,Math.min(i-2,22));const seqL=AZ.slice(seqStart,seqStart+4).map(x=>low?x.toLowerCase():x);const extra=shuffle(AZ.filter(x=>!AZ.slice(seqStart,seqStart+4).includes(x))).slice(0,4).map(x=>low?x.toLowerCase():x);
  const feeder=L.feeder||FEED[i%FEED.length];
  const pool={
    bub:()=>R.bub('Pop the bubbles with *'+ch+'*!',lettersFor(ch,3)),
    feed:()=>R.feed('Feed the '+feeder+' things that '+SW+' *'+L.ch+'*.',feeder,targets.map(w=>'*'+w).concat(others.slice(0,3))),
    trace:()=>R.trace('Trace the letter *'+L.ch+'*. Tap the dots one by one!',L.ch,{item:L.item,say}),
    web:()=>R.web('Help the spider catch things that '+SW+' *'+L.ch+'*.',targets.map(w=>'*'+w).concat(others.slice(3,6)),{spiderSay:L.ch+'!'}),
    fish:()=>R.fishing('Catch the fish with *'+ch+'*!',[ch,ch,ch].map((x,j)=>'*'+x).concat(shuffle(AZ.filter(x=>x!==L.ch)).slice(0,3).map(x=>low?x.toLowerCase():x))),
    mem:()=>low?R.mem('Find the pairs: big letter and little letter.',[[T(L.ch,0,0),T(ch,0,4)],[T(nb.ch,0,0),T(nb.ch.toLowerCase(),0,4)],[T(na.ch,0,0),T(na.ch.toLowerCase(),0,4)]])
      :R.mem('Find the pairs: a letter and its friend.',[[T(L.ch,0,0),L.item],[T(nb.ch,0,0),nb.item],[T(na.ch,0,0),na.item]]),
    path:()=>R.path('Help the duck hop *'+seqL.join(', ')+'* to get home!',seqL,extra,{who:'duck',goal:'house'}),
    dig:()=>R.dig('Dig in the sand! Find things that '+SW+' *'+L.ch+'*.',targets.slice(0,2).map(w=>'*'+w).concat(others.slice(0,4))),
    pick:()=>R.tap('Tap the *'+L.item+'*.',['*'+L.item].concat(others.slice(0,2)),{layout:'row'}),
    build:()=>L.build?R.gap('Build the word *'+L.build+'*.',[L.build].concat(L.build.split('').map((c,j)=>j===0?'?':T(c,0,j))),[T(L.build[0],1,0)].concat(shuffle(AZ.filter(x=>x!==L.build[0].toUpperCase())).slice(0,2).map(x=>T(x.toLowerCase(),0,1))))
      :R.gap('What letter does *'+L.item+'* start with?',[L.item,'?'],[T(ch,1,0)].concat(shuffle(AZ.filter(x=>x!==L.ch)).slice(0,2).map(x=>T(low?x.toLowerCase():x,0,1))))};
  const order=(o.order||[['bub','feed','trace','web','fish','mem','path','dig'],['fish','web','bub','dig','trace','path','feed','mem'],['trace','bub','dig','feed','mem','fish','web','path']][i%3]).slice();
  if(low){const k=order.indexOf('mem');order.splice(i%2?1:5,0,'build');}
  const rounds=order.map(k=>pool[k]());
  U({id:(o.prefix||'l')+L.ch,title:low?('The letter '+ch):('The letter '+L.ch),strand:o.strand||'Letters',codes:o.codes||['Literacy & Math'],
    guide:{goal:low?('Know the little letter '+ch+', its sound “'+(L.sound||ch)+'” and words that start with it: '+words.join(', ')+'.'):('Know the letter '+L.ch+' by name and shape, and link it to '+words.join(', ')+'.'),words:words.join(', '),ask:['What letter is this?','What starts with '+L.ch+'?','Can you trace '+L.ch+' in the air?'],home:'Hunt for '+L.ch+' at home: on cereal boxes, books and signs. Find something that starts with '+L.ch+'!'},
    watch:[L.ch+' for '+L.item+'!',say+'!'],fig:'A big 3D letter '+ch+' and '+art(L.item)+'.',
    kid:{big:low?ch:big,pic:L.item,line:line,trace:low?ch+ch:L.ch+L.ch.toLowerCase(),words:words.slice(0,3).map(w=>[w,w])},
    page:{},
    steps:[{say:'Meet '+ch,speech:(low?'This is little '+ch+'. ':'This is the letter '+L.ch+'. ')+say+'! Tap the letter, then tap the '+L.item+'.',set:g('hello',{big:low?ch:L.ch,item:L.item,word:low?(ch+' · '+L.item):(L.ch+' is for '+L.item),sayBig:L.ch,col:cl(L.ch)})},
      {say:'Trace '+L.ch,speech:'Let’s trace the letter '+L.ch+'. Tap the glowing dot, then the next one, and the next. Slowly!',set:g('trace',{ch:L.ch,item:L.item,say})},
      {say:L.ch+' words',speech:words.join(', ')+'. They all '+SW+' '+(low?(L.sound||ch):L.ch)+'! Tap each one.',set:S.tap(words.slice(0,3),{layout:'row',free:true})}],
    rounds,tries:[['Say it: '+L.ch+' is for '+L.item+'.','Can you think of another '+L.ch+' word?'],['Draw '+art(L.item)+'.','Write a big '+L.ch+' beside it!']]});};

/* ---------- a number lesson ---------- */
P.KNUMBER=function(N,i,o){o=o||{};const n=N.n,item=N.item;const w=WORDS[n];const pl=n===1?item:(N.plural||item+'s');
  const frame=n>10?20:n>5?10:0;
  const pool={
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
  const order=(o.order||[['bub','spots','count','feed','frog','mem','cake','path'],['count','frog','bub','cake','spots','path','feed','pick'],['feed','bub','frog','spots','count','cake','pick','path']][i%3]);
  const ord=n>10?['bub','count','pick','path','count2','bub','pick']:order;const rounds=ord.filter(k=>!(k==='mem'&&n>6)).map(k=>pool[k]());
  U({id:(o.prefix||'n')+n,title:'The number '+n,strand:o.strand||'Numbers',codes:['Literacy & Math'],
    guide:{goal:'Know the number '+n+' ('+w+'): see it, say it, count '+n+' things and trace the numeral.',words:n+', '+w+', count',ask:['How many '+pl+'?','Can you show '+n+' fingers?','What comes after '+n+'?'],home:'Count '+n+' things at home: spoons, socks, steps!'},
    watch:[n+' '+w+'!','Count with me: '+[...Array(n)].map((_,k)=>WORDS[k+1]).join(', ')+'!'],fig:'A big 3D number '+n+' and '+n+' '+pl+'.',
    kid:{big:String(n),pic:item,n:Math.min(n,10),line:'*'+n+'* '+w+': *'+n+' '+pl+'*',trace:String(n)+String(n)},page:{},
    steps:[{say:'Meet '+n,speech:'This is the number '+n+'. '+cap(w)+'! Look: '+n+' '+pl+'. Tap each one and count.',set:g('hello',{big:String(n),item,n,word:n+' '+w,sayBig:w,col:cl(String(n),i)})},
      {say:'Trace '+n,speech:'Let’s trace the number '+n+'. Tap the glowing dots, one by one.',set:g('trace',{ch:String(n),say:w})},
      {say:'Count '+n,speech:'Tap each '+(N.other||'star')+' and count out loud. How many? '+cap(w)+'!',set:S.count(N.other||'star',n,{frame})}],
    rounds,tries:[['Show '+n+' fingers!',n>5?'use two hands':'one hand'],['Jump '+n+' times.','count out loud!']]});};
})();
