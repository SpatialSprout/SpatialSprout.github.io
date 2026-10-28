/* The Interactive Classroom: Grade 2 Math — question makers.
   Numbers are picked fresh each time the book opens, so "Play again" brings new puzzles. */
(function(){
"use strict";
const P=window.PM;if(!P||!P.R)return;
const rnd=(a,b)=>a+Math.floor(Math.random()*(b-a+1)),pick=a=>a[Math.floor(Math.random()*a.length)],shuffle=a=>{const b=a.slice();for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]];}return b;};
/* three answer choices near the right one */
function near(ans,o){o=o||{};const lo=o.lo==null?0:o.lo,hi=o.hi==null?1e9:o.hi,d=o.d||[1,2,10,-1,-2,-10,3,-3,5,-5];const s=new Set([ans]);let g=0;while(s.size<(o.k||3)&&g++<80){const v=ans+pick(d);if(v>=lo&&v<=hi)s.add(v);}return shuffle([...s]).map(String);}
const M={rnd,pick,shuffle,near,
  /* a question with dock answer buttons and a model */
  q:(q,set,opts,ans,o)=>Object.assign({q,set:set||{},o:opts.map(String),ans:String(ans)},o||{}),
  add:(a,b,o)=>M.q('What is *'+a+' + '+b+'*?',{custom:'col',a,b,op:'+'},near(a+b,{lo:0}),a+b,o),
  sub:(a,b,o)=>M.q('What is *'+a+' − '+b+'*?',{custom:'col',a,b,op:'-'},near(a-b,{lo:0}),a-b,o),
  mul:(a,b,item,o)=>M.q('*'+a+' groups of '+b+'*. How many in all?',{custom:'groups',g:a,n:b,item:item||'apple',label:a+' × '+b+' = ?'},near(a*b,{lo:0,d:[1,-1,2,-2,a,-a,b,-b]}),a*b,o),
  money:c=>c>=100?(c%100===0?'$'+c/100:'$'+(c/100).toFixed(2)):c+'¢'};
P.M2=M;
})();
