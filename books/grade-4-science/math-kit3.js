/* The Interactive Classroom — extra math models for Grade 3: a Venn diagram, a coding robot on a grid,
   Canadian coins and bills, and towers that level out to show the mean.
   Load after math-kit2.js. A lesson asks for one with set.custom = 'venn' | 'robot' | 'cash' | 'level'. */
(function(){
"use strict";
const P=window.PM;if(!P||P.failed||!P.K2||!P.K2.CUSTOM)return;
const {THREE,V,G,mk,lam,label,A,tween,unitBox}=P;const K=P.K,K2=P.K2,C=K2.CUSTOM;
const COL=['#ff8a5b','#4fb3ff','#5cc46a','#ffb347','#b07cff','#ff6b9a','#26a69a','#f2c12e'];
const box=(w,h,d,c,th)=>mk(G('m3_b'+w+'_'+h+'_'+d,()=>new THREE.BoxGeometry(w,h,d)),lam(c),th===0?0:20);
const cyl=(a,b,h,c,n)=>mk(G('m3_c'+a+'_'+b+'_'+h+'_'+(n||32),()=>new THREE.CylinderGeometry(a,b,h,n||32)),lam(c),0);
const at=(o,x,y,z)=>{o.position.set(x,y,z);return o;};
const tag=(t,o)=>label(String(t),Object.assign({size:.22,bg:'#ffffff',border:'#1b2236'},o||{}));
const name=(o,n,part)=>{o.userData.name=n;if(part!=null)o.userData.part=String(part);return o;};
const thing=(n,s)=>{if(P.STAGE&&P.PROP3&&P.PROP3[n])return P.STAGE.prop(n,{s:(s||1)*.62,label:false,bare:true,tap:false});if(P.PROP3&&P.PROP3[n]){const g=P.PROP3[n]({});g.scale.multiplyScalar((s||1)*.75);return g;}if(K.TOYS&&K.TOYS[n])return K.toy(n,{s:(s||1)*1.6});return K2.standee(n,{label:false,s:(s||1)*.7});};
const hop=(o,x,z,h,d)=>{const p0=o.position.clone();return tween(d||.5,k=>{o.position.set(p0.x+(x-p0.x)*k,p0.y+Math.sin(Math.PI*k)*(h==null?.25:h),p0.z+(z-p0.z)*k);});};

/* ---------- Venn diagram: two hoops, things sorted inside, outside or in both ---------- */
C.venn=function(g2,st,h,set){const z=-2.35,r=set.r||.95,dx=r*.62;const hoops=[[-dx,'#ff6b9a'],[dx,'#4fb3ff']];
  hoops.forEach(([x,c],i)=>{const d=cyl(r,r,.012,c,48);d.material=P.glow?P.glow(c,.28,.2):d.material;at(d,x,.008,z);g2.add(d);
    const ring=mk(G('m3_ring'+r,()=>new THREE.TorusGeometry(r,.025,8,64)),lam(c),0);ring.rotation.x=Math.PI/2;at(ring,x,.02,z);name(ring,(set.labels||[])[i]||('set'+i));g2.add(ring);
    const L=tag((set.labels||['A','B'])[i],{size:.2,bg:c,color:'#ffffff',border:c});L.position.set(x+(i?.35:-.35),.5,z-r-.05);g2.add(L);});
  const slots={a:[],b:[],ab:[],o:[]};(set.items||[]).forEach(([n,where])=>slots[where||'o'].push(n));const items=[];
  const place=(list,xs,zs)=>list.forEach((n,i)=>{const t=thing(n,.62);const x=xs(i,list.length),zz=zs(i,list.length);at(t,x,0,zz);name(t,n,'item');g2.add(t);items.push(t);});
  place(slots.a,(i,n)=>-dx-.35+(i%2)*.3,(i,n)=>z-.35+Math.floor(i/2)*.42);
  place(slots.b,(i,n)=>dx+.35-(i%2)*.3,(i,n)=>z-.35+Math.floor(i/2)*.42);
  place(slots.ab,(i,n)=>0,(i,n)=>z-.3+i*.42);
  place(slots.o,(i,n)=>(i%2?1:-1)*(1.85),(i,n)=>z-.5+Math.floor(i/2)*.6);
  if(set.title){const T=tag(set.title,{size:.22,bg:'#fff3c4'});T.position.set(0,.85,z-r-.35);name(T,'title');g2.add(T);}
  return {play(){items.forEach((o,i)=>A.later(()=>{const y0=o.position.y;tween(.4,k=>{o.position.y=y0+Math.sin(k*Math.PI)*.25;});},i*160));}};};

/* ---------- coding robot: a grid, a code strip of arrow cards, and a robot that runs the code ---------- */
const DIR={'↑':[0,-1],'↓':[0,1],'→':[1,0],'←':[-1,0]};
C.robot=function(g2,st,h,set){const cols=set.cols||5,rows=set.rows||4,c=Math.min(.5,3.6/cols,2.1/rows),x0=-(cols-1)*c/2,z0=-3.35+c/2;const X=i=>x0+i*c,Z=j=>z0+j*c;
  for(let i=0;i<cols;i++)for(let j=0;j<rows;j++){const t=box(c*.94,.05,c*.94,(i+j)%2?'#ffe8cc':'#a5d8ff',0);at(t,X(i),.02,Z(j));g2.add(t);}
  (set.walls||[]).forEach(([i,j])=>{const w=thing('rock',.7);at(w,X(i),.04,Z(j));g2.add(w);});
  const goal=set.goal;if(goal){const s=thing(set.prize||'star',.7);at(s,X(goal[0]),.05,Z(goal[1]));name(s,'goal');g2.add(s);s.userData.tick=t=>{s.rotation.y=t;};}
  const bot=thing('robot',1.1);const st0=set.start||[0,rows-1];at(bot,X(st0[0]),.04,Z(st0[1]));name(bot,'robot');g2.add(bot);
  const code=[];const rep=set.repeat||1;for(let k=0;k<rep;k++)(set.code||[]).forEach(s=>code.push(s));
  const cards=(set.code||[]).map((s,i)=>{const L=tag(s,{size:.26,bg:'#fff3c4'});L.position.set(-1.0+i*.42+(set.repeat>1?.75:0),.06,-1.15);L.rotation.x=-Math.PI/2.6;name(L,'code','c'+i);g2.add(L);return L;});
  if(set.repeat>1){const R=tag('repeat '+set.repeat+' ×',{size:.2,bg:'#e8f8ee',border:'#16a36f'});R.position.set(-.75,.06,-1.15);R.rotation.x=-Math.PI/2.6;name(R,'loop');g2.add(R);}
  let running=false;
  const run=()=>{if(running)return;running=true;let p=[st0[0],st0[1]];at(bot,X(p[0]),.04,Z(p[1]));let k=0;const step=()=>{if(k>=code.length){running=false;return;}const d=DIR[code[k]]||[0,0];
      const card=cards[k%cards.length];if(card){const y0=.06;tween(.35,q=>{card.position.y=y0+Math.sin(q*Math.PI)*.12;});}
      p=[Math.max(0,Math.min(cols-1,p[0]+d[0])),Math.max(0,Math.min(rows-1,p[1]+d[1]))];bot.rotation.y=Math.atan2(d[0],d[1]);k++;hop(bot,X(p[0]),Z(p[1]),.18,.45).then(()=>A.later(step,120));};step();};
  return {play:run,controls:()=>st.round?[]:[{t:'Run the code!',go:true,fn:run}]};};

/* ---------- Canadian coins and bills ---------- */
const CASH={toonie:{d:.72,c:'#cfd6dc',in:'#e0b84a',v:200,t:'$2'},loonie:{d:.68,c:'#e0b84a',v:100,t:'$1',n:11},quarter:{d:.6,c:'#cfd6dc',v:25,t:'25¢'},dime:{d:.46,c:'#cfd6dc',v:10,t:'10¢'},nickel:{d:.54,c:'#cfd6dc',v:5,t:'5¢'},
  '$5':{bill:'#4dabf7',v:500,t:'$5'},'$10':{bill:'#b197fc',v:1000,t:'$10'},'$20':{bill:'#69db7c',v:2000,t:'$20'},'$50':{bill:'#ff8787',v:5000,t:'$50'}};
const money=c=>c>=100?(c%100===0?'$'+c/100:'$'+(c/100).toFixed(2)):c+'¢';
C.cash=function(g2,st,h,set){const list=set.cash||[];const n=list.length,sp=Math.min(.95,4.2/Math.max(1,n));let tot=0;const items=[];
  list.forEach((k,i)=>{const c=CASH[k];if(!c)return;tot+=c.v;const g=new THREE.Group();name(g,k);
    if(c.bill){const b=box(.9,.03,.46,c.bill);b.position.y=.016;g.add(b);const f=box(.72,.032,.3,'#ffffff');f.material=lam('#f8f9fa');f.position.y=.014;f.scale.set(1,1,1);g.add(f);const L=tag(c.t,{size:.24,bg:c.bill,color:'#ffffff',border:c.bill});L.position.set(0,.07,0);L.rotation.x=-Math.PI/2;g.add(L);g.rotation.y=(i%2?.12:-.12);}
    else{const d=cyl(c.d/2,c.d/2,.045,c.c,c.n||40);d.position.y=.023;g.add(d);if(c.in){const q=cyl(c.d*.3,c.d*.3,.047,c.in,40);q.position.y=.024;g.add(q);}const L=tag(c.t,{size:.2,bg:'#ffffff'});L.position.set(0,.07,0);L.rotation.x=-Math.PI/2;g.add(L);}
    at(g,(i-(n-1)/2)*sp,0,-2.2+(i%2)*.3);g.scale.setScalar(Math.min(1,sp/.8));g2.add(g);items.push(g);});
  if(set.price!=null){const p=thing(set.item||'toy',1);at(p,1.7,0,-3.0);g2.add(p);const L=tag(money(set.price),{size:.22,bg:'#fff3c4'});L.position.set(1.7,.75,-3.0);name(L,'price');g2.add(L);}
  if(set.show!==false){const T=tag(set.label||('Total: '+money(tot)),{size:.26,bg:'#e8f8ee',border:'#16a36f'});T.position.set(-.2,.85,-3.05);name(T,'total');g2.add(T);}
  return {play(){items.forEach((o,i)=>A.later(()=>{const y0=o.position.y;tween(.35,k=>{o.position.y=y0+Math.sin(k*Math.PI)*.2;o.rotation.z=Math.sin(k*Math.PI*2)*.2;});},i*170));}};};

/* ---------- towers that level out: the mean ---------- */
C.level=function(g2,st,h,set){const v=set.v,n=v.length,sp=Math.min(.85,4.0/n),u=set.u||Math.min(.2,1.6/Math.max(...v));const cubes=[];
  v.forEach((k,i)=>{const x=(i-(n-1)/2)*sp;cubes[i]=[];for(let j=0;j<k;j++){const b=unitBox(1,1,1,COL[i%COL.length],u);at(b,x,u/2+j*u,-2.55);name(b,(set.cats||[])[i]||('t'+i),'c');g2.add(b);cubes[i].push(b);}
    if(set.cats){const s=K2.standee(set.cats[i],{label:set.labels?set.labels[i]:set.cats[i],col:COL[i%COL.length],s:.5});at(s,x,0,-1.8);g2.add(s);}});
  const tot=v.reduce((a,b)=>a+b,0),mean=tot/n;
  const line=box(n*sp,.015,.02,'#e4572e',0);line.visible=false;at(line,0,mean*u,-2.45);g2.add(line);
  const T=tag(set.label||('mean = '+tot+' ÷ '+n+' = '+(Number.isInteger(mean)?mean:mean.toFixed(1))),{size:.22,bg:'#fff3c4'});T.position.set(0,Math.max(...v)*u+.5,-2.9);T.visible=!!set.showMean;name(T,'mean');g2.add(T);
  let done=false;
  const play=()=>{if(done||!Number.isInteger(mean))return;done=true;const H=v.slice();let t=0;
    for(let guard=0;guard<60;guard++){const hi=H.indexOf(Math.max(...H)),lo=H.indexOf(Math.min(...H));if(H[hi]-H[lo]<=0||H[hi]===mean&&H[lo]===mean)break;if(H[hi]<=mean||H[lo]>=mean)break;
      const b=cubes[hi].pop();cubes[lo].push(b);H[hi]--;H[lo]++;const x=(lo-(n-1)/2)*sp,y=u/2+(H[lo]-1)*u;A.later(()=>{const p0=b.position.clone();tween(.5,k=>{b.position.set(p0.x+(x-p0.x)*k,p0.y+(y-p0.y)*k+Math.sin(k*Math.PI)*.3,p0.z);});},t);t+=420;}
    A.later(()=>{line.visible=true;T.visible=true;},t+300);};
  return {play,controls:()=>st.round?[]:[{t:'Level them out!',go:true,fn:play}]};};
})();
