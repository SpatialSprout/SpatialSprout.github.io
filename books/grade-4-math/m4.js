/* The Interactive Classroom: Grade 4 Math — question makers on top of the Grade 3 ones.
   Numbers are picked fresh each time the book opens, so "Play again" brings new puzzles. */
(function(){
"use strict";
const P=window.PM;if(!P||!P.M3)return;const M=P.M3;const {rnd,pick,shuffle,near}=M;
const f1=n=>{const r=Math.round(n*10)/10;return Number.isInteger(r)?String(r):r.toFixed(1);};
const dnear=(ans,d)=>{const s=new Set([f1(ans)]);let g=0;while(s.size<3&&g++<60){const v=ans+pick(d||[.1,-.1,1,-1,.2,-.2]);if(v>=0)s.add(f1(v));}return shuffle([...s]);};
const comma=n=>n.toLocaleString('en-CA');
const M4=Object.assign({},M,{f1,dnear,comma,
  /* read a 4-digit number from the place-value mat */
  pv:(n,o)=>M.q('What number is on the mat?',{custom:'pv',n,hide:true},shuffle([...new Set([n,n+1000>9999?n-1000:n+1000,+String(n).split('').reverse().join('')||n+10,n+10])]).slice(0,3).map(comma),comma(n),o),
  /* the value of one digit */
  digit:(n,o)=>{const s=String(n),k=rnd(0,s.length-1),d=+s[k];if(!d)return M4.digit(n+1,o);const v=d*Math.pow(10,s.length-1-k);return M.q('What is the *'+d+'* worth in *'+comma(n)+'*?',{custom:'pv',n},shuffle([...new Set([v,d,v*10>99999?v/10:v*10])]).map(comma),comma(v),o);},
  /* column sums and differences with 4 digits */
  add4:(a,b,o)=>M.q('What is *'+comma(a)+' + '+comma(b)+'*?',{custom:'col',a,b,op:'+'},near(a+b,{lo:0,d:[10,-10,100,-100,1000,-1000]}).map(x=>comma(+x)),comma(a+b),o),
  sub4:(a,b,o)=>M.q('What is *'+comma(a)+' − '+comma(b)+'*?',{custom:'col',a,b,op:'-'},near(a-b,{lo:0,d:[10,-10,100,-100,1000,-1000]}).map(x=>comma(+x)),comma(a-b),o),
  /* 2- or 3-digit by 1-digit */
  mul1:(a,b,o)=>M.q('What is *'+a+' × '+b+'*?',{custom:'col',a,b,op:'*'},near(a*b,{lo:0,d:[b,-b,10,-10,a,-a]}),a*b,o),
  /* decimal tenths on a line */
  dec:(n,o)=>M.q('What decimal is marked?',{custom:'dline',min:Math.floor(n),max:Math.floor(n)+1,mark:[n]},dnear(n,[.1,-.1,1,.2]),f1(n),o),
  /* fraction of a bar */
  frac:(sh,parts,o)=>M.q('What fraction is shaded?',{custom:'frac',list:[{parts,shade:sh,shape:'bar',label:'?'}]},shuffle([...new Set([sh+'/'+parts,(parts-sh)+'/'+parts,sh+'/'+(parts+1)])]).slice(0,3),sh+'/'+parts,o),
  /* angles */
  ang:(deg,o)=>M.q('What kind of angle is this?',{custom:'angle',deg,labels:false},['acute','right','obtuse','straight'].filter(k=>k!==({90:'right',180:'straight'}[deg]||(deg<90?'acute':'obtuse'))).slice(0,2).concat([{90:'right',180:'straight'}[deg]||(deg<90?'acute':'obtuse')]).sort(),{90:'right',180:'straight'}[deg]||(deg<90?'acute':'obtuse'),o),
  /* coordinates */
  pt:(x,y,o)=>M.q('What are the coordinates of point *A*?',{custom:'coord',size:8,hide:true,pts:[[x,y,'A']]},shuffle([...new Set(['('+x+', '+y+')','('+y+', '+x+')','('+x+', '+(y+1)+')'])]),'('+x+', '+y+')',o)});
P.M4=M4;
})();
