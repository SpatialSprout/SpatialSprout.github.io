/* The Interactive Classroom: Kindergarten — round and scene shorthands for the play kit.
   Every question is read aloud, and almost every answer is a tap on a 3D toy, so children who cannot read yet can play. */
(function(){
"use strict";
const P=window.PM;if(!P||!P.R)return;const R=P.R,S=P.S;
const rnd=(a,b)=>a+Math.floor(Math.random()*(b-a+1)),pick=a=>a[Math.floor(Math.random()*a.length)],shuffle=a=>{const b=a.slice();for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]];}return b;};
const near=(n,lo,hi)=>{const s=new Set([n]);let g=0;while(s.size<3&&g++<40){const v=n+pick([-2,-1,1,2]);if(v>=(lo||1)&&v<=(hi||20))s.add(v);}return shuffle([...s]).map(String);};
/* tap the right toys: items marked with * are right */
const sized=(items,o)=>o&&o.sizes?items.map((it,i)=>it+'@'+o.sizes[i]):items;
R.tap=(q,items,o)=>({q,set:Object.assign({custom:'tap'},o||{},{items:shuffle(sized(items,o))})});
S.tap=(items,o)=>Object.assign({custom:'tap'},o||{},{items:sized(items,o)});
/* pop the balloons that show the target */
R.pop=(q,items,o)=>R.tap(q,items,Object.assign({mode:'pop',layout:'float'},o||{}));
/* feed an animal or fill a basket: tap the right things and they jump in */
R.feed=(q,who,items,o)=>R.tap(q,items,Object.assign({mode:'collect',basket:who},o||{}));
/* tap to count, then press the number */
R.count=(q,item,n,o)=>{o=o||{};const keep=n-(o.away||0);return Object.assign({q,set:{custom:'count',item,n,frame:o.frame,away:o.away,show:o.show},o:near(keep,0,30),ans:String(keep)},o);};
S.count=(item,n,o)=>Object.assign({custom:'count',item,n},o||{});
/* a row with a missing piece */
R.gap=(q,seq,choices,o)=>({q,set:Object.assign({custom:'gap',seq,choices:shuffle(choices)},o||{})});
S.gap=(seq,choices,o)=>Object.assign({custom:'gap',seq,choices},o||{});
S.mix=(a,an,b,bn,res,label,o)=>Object.assign({custom:'mix',a,an,b,bn,res,label},o||{});
/* picture choice: tap the one picture that answers */
R.one=(q,right,wrong,o)=>R.tap(q,['*'+right].concat(wrong),o);
R.yes=(q,yes,o)=>Object.assign({q,set:{},o:['👍 yes','👎 no'],ans:yes?'👍 yes':'👎 no'},o||{});
/* look at a picture (tap it to hear its name) and press a number: claps, sounds, counting */
R.look=(q,pics,opts,ans,o)=>Object.assign({q,set:{custom:'tap',items:[].concat(pics),layout:'row',free:true},o:opts.map(String),ans:String(ans)},o||{});
S.look=(pics,o)=>Object.assign({custom:'tap',items:[].concat(pics),layout:'row',free:true},o||{});
P.PK={rnd,pick,shuffle,near};
})();
