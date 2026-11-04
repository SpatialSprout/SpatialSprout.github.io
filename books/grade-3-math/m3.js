/* The Interactive Classroom: Grade 3 Math — question makers.
   Numbers are picked fresh each time the book opens, so "Play again" brings new puzzles. */
(function(){
"use strict";
const P=window.PM;if(!P||!P.R)return;
const rnd=(a,b)=>a+Math.floor(Math.random()*(b-a+1)),pick=a=>a[Math.floor(Math.random()*a.length)],shuffle=a=>{const b=a.slice();for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]];}return b;};
function near(ans,o){o=o||{};const lo=o.lo==null?0:o.lo,hi=o.hi==null?1e9:o.hi,d=o.d||[1,2,10,-1,-2,-10,100,-100,5,-5];const s=new Set([ans]);let g=0;while(s.size<(o.k||3)&&g++<80){const v=ans+pick(d);if(v>=lo&&v<=hi)s.add(v);}return shuffle([...s]).map(String);}
const ONES=['zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'];
const TENS=['','','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety'];
const words=n=>n<20?ONES[n]:n<100?TENS[Math.floor(n/10)]+(n%10?'-'+ONES[n%10]:''):n<1000?ONES[Math.floor(n/100)]+' hundred'+(n%100?' '+words(n%100):''):'one thousand';
const money=c=>c>=100?(c%100===0?'$'+c/100:'$'+(c/100).toFixed(2)):c+'¢';
const M={rnd,pick,shuffle,near,words,money,
  q:(q,set,opts,ans,o)=>Object.assign({q,set:set||{},o:opts.map(String),ans:String(ans)},o||{}),
  add:(a,b,o)=>M.q('What is *'+a+' + '+b+'*?',{custom:'col',a,b,op:'+'},near(a+b,{lo:0}),a+b,o),
  sub:(a,b,o)=>M.q('What is *'+a+' − '+b+'*?',{custom:'col',a,b,op:'-'},near(a-b,{lo:0}),a-b,o),
  mul:(a,b,item,o)=>M.q('*'+a+' groups of '+b+'*. How many in all?',{custom:'groups',g:a,n:b,item:item||'apple',label:a+' × '+b+' = ?'},near(a*b,{lo:0,d:[1,-1,2,-2,a,-a,b,-b]}),a*b,o),
  arr:(r,c,item,o)=>M.q('An array with *'+r+' rows of '+c+'*. What is *'+r+' × '+c+'*?',{custom:'array',r,c,item:item||'star'},near(r*c,{lo:0,d:[1,-1,r,-r,c,-c]}),r*c,o),
  div:(t,n,item,o)=>M.q('Share *'+t+'* '+(item||'cookie')+'s equally among *'+n+'*. How many each?',{custom:'groups',g:n,n:t/n,item:item||'cookie',label:t+' ÷ '+n+' = ?'},near(t/n,{lo:0,d:[1,-1,2,-2]}),t/n,o),
  place:(n,o)=>{const s=String(n),k=rnd(0,s.length-1),d=+s[k],v=d*Math.pow(10,s.length-1-k);const H=Math.floor(n/100),T=Math.floor(n/10)%10,O=n%10;
    return M.q('What is the *'+d+'* worth in *'+n+'*?',{custom:'blocks',h:H,t:T,o:O,show:true},shuffle([...new Set([v,d,d*10===v?d*100:d*10])].slice(0,3)).map(String),v,o);},
  build:(n,o)=>{const H=Math.floor(n/100),T=Math.floor(n/10)%10,O=n%10;return M.q('What number do the blocks show?',{custom:'blocks',h:H,t:T,o:O,show:false},near(n,{lo:0,d:[10,-10,100,-100,1,-1,9,-9]}),n,o);},
  round:(n,to,o)=>{const r=Math.round(n/to)*to,lo=Math.floor(n/to)*to;return M.q('Round *'+n+'* to the nearest *'+to+'*.',{custom:'line',min:lo,max:lo+to,step:to/10,every:to/10,hops:[],mark:[n]},shuffle([...new Set([r,lo===r?lo+to:lo,n])]).map(String),r,o);}};
P.M3=M;
})();
