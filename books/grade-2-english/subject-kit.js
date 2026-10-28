/* The Interactive Classroom — subject kit (English, Science, Social Studies).
   Pop-up picture standees, letter and word blocks, sorting crates and grids: one small 3D toolkit
   that every lesson of the non-math books is built from. A lesson is written as data with P.unit({...}).
   Pictures: Twemoji (c) Twitter, Inc. and other contributors, CC-BY 4.0, loaded from e/<code>.svg. */
(function(){
"use strict";
const P=window.PM;if(!P||P.failed||!P.THREE||!P.K)return;
const {THREE,V,G,M,lam,mk,label,clearGroup,rr,T,wrap,header,keyWords,FT,ZS,X0,TW,INK,GREY,tint,A,tween,moveTo,easeOut,burst}=P;
const K=P.K,{rnd,pick,shuffle,choices,tag,tbox,exGrid,hand,xMark}=K;
const acc=()=>P.ACC;
const PICS=window.PICS||{};
const COLS=['#ff8a5b','#4fb3ff','#5cc46a','#ffb347','#b07cff','#ff6b9a','#26a69a','#f2c12e'];
const mixHex=(a,b,t)=>{const p=h=>[1,3,5].map(i=>parseInt(h.slice(i,i+2),16));const x=p(a),y=p(b);return '#'+x.map((v,i)=>Math.round(v+(y[i]-v)*t).toString(16).padStart(2,'0')).join('');};

/* ---------------- pictures ---------------- */
const IMG={};let rq=null;
function img(n){const cp=PICS[n];if(!cp)return null;let o=IMG[cp];if(!o){o=IMG[cp]={im:new Image(),ok:false,cbs:[]};
  o.im.onload=()=>{o.ok=true;const cb=o.cbs;o.cbs=[];cb.forEach(f=>{try{f();}catch(e){}});if(!rq)rq=setTimeout(()=>{rq=null;try{A.redraw();}catch(e){}},150);};o.im.src='e/'+cp+'.svg';}return o;}
function pic(g,n,x,y,s){const o=img(n);if(o&&o.ok)g.drawImage(o.im,x-s/2,y-s/2,s,s);else if(!o){g.save();rr(g,x-s/2,y-s/2,s,s,s*.2);g.fillStyle='#eef1f6';g.fill();g.restore();T(g,n,x,y+6,FT.small,GREY,'center');}}
/* picture inside a soft round tile, for the page */
function picTile(g,n,x,y,s,col){g.save();g.beginPath();g.arc(x,y,s*.62,0,Math.PI*2);g.fillStyle=col?tint(col,.16):'rgba(255,255,255,.9)';g.fill();g.restore();pic(g,n,x,y,s);}

/* ---------------- 3D pieces ---------------- */
function cardMat(n,col){return M('sd'+n+col,()=>{const c=document.createElement('canvas');c.width=c.height=256;const t=new THREE.CanvasTexture(c);t.anisotropy=4;
  const draw=()=>{const g=c.getContext('2d');g.clearRect(0,0,256,256);g.fillStyle=col;g.fillRect(0,0,256,256);rr(g,14,14,228,228,34);g.fillStyle='#ffffff';g.fill();
    const o=img(n);if(o&&o.ok)g.drawImage(o.im,40,40,176,176);else{g.fillStyle=INK;g.font='700 34px sans-serif';g.textAlign='center';g.fillText(n,128,140);}t.needsUpdate=true;};
  draw();const o=img(n);if(o&&!o.ok)o.cbs.push(draw);return new THREE.MeshLambertMaterial({map:t});});}
/* the real thing in 3D: a code-built toy when there is one, otherwise the picture's own vector art
   extruded into a chunky 3D figure (each colour is its own raised layer). No card, no badge. */
const FIG={};const FIGQ={};
function figGeo(cp,done){if(FIG[cp])return done(FIG[cp]);(FIGQ[cp]=FIGQ[cp]||[]).push(done);if(FIGQ[cp].length>1)return;
  const fin=r=>{FIG[cp]=r;const q=FIGQ[cp];FIGQ[cp]=null;q.forEach(f=>{try{f(r);}catch(e){console.error(e);}});};
  if(!THREE.SVGLoader||!window.fetch)return fin(null);
  fetch('e/'+cp+'.svg').then(r=>r.text()).then(txt=>{const data=new THREE.SVGLoader().parse(txt);const paths=data.paths.filter(p=>{const f=p.userData&&p.userData.style&&p.userData.style.fill;return f&&f!=='none'&&f!=='transparent';});
    const n=paths.length,step=Math.min(.16,2.2/Math.max(1,n)),parts=[];
    paths.forEach((p,i)=>{const shapes=THREE.SVGLoader.createShapes(p);if(!shapes.length)return;const st=p.userData.style;
      const geo=new THREE.ExtrudeGeometry(shapes,{depth:i===0?4.2:2.6,curveSegments:7,bevelEnabled:true,bevelThickness:.35,bevelSize:.22,bevelSegments:2});geo.translate(0,0,i===0?-1.6:i*step);
      const op=st.fillOpacity==null?1:+st.fillOpacity;parts.push({geo,col:st.fill,op});});fin(parts);}).catch(e=>{console.warn('fig',cp,e);fin(null);});}
function figMat(col,op){return M('fg'+col+op,()=>new THREE.MeshLambertMaterial(op<1?{color:col,transparent:true,opacity:op}:{color:col}));}
function standee(n,o){o=o||{};const col=o.col||COLS[0];const g=new THREE.Group();g.userData.name=n;g.userData.label=o.label==null?n:o.label;
  const ring=mk(G('fg_ring',()=>new THREE.RingGeometry(.25,.32,40)),new THREE.MeshBasicMaterial({color:col,transparent:true,opacity:.45,depthWrite:false}),0);ring.rotation.x=-Math.PI/2;ring.position.y=.006;g.add(ring);
  const sh=mk(G('fg_sh',()=>new THREE.CircleGeometry(.25,32)),new THREE.MeshBasicMaterial({color:'#1b2236',transparent:true,opacity:.12,depthWrite:false}),0);sh.rotation.x=-Math.PI/2;sh.position.y=.004;g.add(sh);
  const piv=new THREE.Group();piv.rotation.x=-.28;g.add(piv);g.userData.piv=piv;
  const K0=P.K||{};const TOY=K0.TOYS&&K0.TOYS[n]&&K0.toy;
  const SP=P.STAGE&&P.STAGE.PROPS,REAL=['sun','moon','cloud','rainbow','snowman','bicycle','canoe','coat','helmet','sunglasses','hat','lifejacket','turnip','pot','windmill'];
  const fit=o=>{const b=new THREE.Box3().setFromObject(o),sz=b.getSize(new THREE.Vector3());const k=Math.min(.82/Math.max(.01,sz.y),.95/Math.max(.01,sz.x,sz.z));o.scale.multiplyScalar(k);const b2=new THREE.Box3().setFromObject(o);o.position.y-=b2.min.y;return o;};
  if(SP&&SP[n]&&REAL.includes(n)){const w=new THREE.Group();w.add(SP[n]());piv.add(fit(w));}
  else if(TOY){const w=new THREE.Group();w.add(K0.toy(n,{s:2.1}));piv.add(fit(w));}
  else{const cp=PICS[n];if(cp)figGeo(cp,parts=>{if(!parts){/* no vector art: a simple word block */return;}const fg=new THREE.Group();const s=.0215;fg.scale.set(s,-s,s);fg.position.set(-18*s,36*s+.02,0);
      parts.forEach(pt=>{const m=new THREE.Mesh(pt.geo,figMat(pt.col,pt.op));m.castShadow=true;fg.add(m);});const f0=new THREE.Group();f0.add(fg);f0.scale.setScalar(.01);piv.add(f0);
      tween(.45,k=>f0.scale.setScalar(Math.max(.01,k<.8?k/.8*1.1:1.1-(k-.8)/.2*.1)));});}
  if(o.label!==false&&g.userData.label){const L=label(g.userData.label,{size:.17,bg:'#ffffff',border:col});L.position.set(0,.98,0);g.add(L);}
  if(o.s)g.scale.setScalar(o.s);return g;}
function glyphMat(txt,col,bg,w){return M('gl'+txt+col+bg+w,()=>{const c=document.createElement('canvas');const cw=Math.min(1024,Math.round(256*w/.46));c.width=cw;c.height=256;const g=c.getContext('2d');
  g.fillStyle=bg;g.fillRect(0,0,cw,256);g.strokeStyle='rgba(27,34,54,.22)';g.lineWidth=12;g.strokeRect(6,6,cw-12,244);g.fillStyle=col;
  const fs=txt.length<=2?176:Math.min(150,Math.floor(cw*1.5/Math.max(1,txt.length)));g.font='700 '+fs+'px "Zilla Slab", Georgia, serif';g.textAlign='center';g.textBaseline='middle';g.fillText(txt,cw/2,140);
  const t=new THREE.CanvasTexture(c);t.anisotropy=4;return new THREE.MeshLambertMaterial({map:t});});}
const bw=txt=>txt.length<=1?.46:Math.max(.46,.15*txt.length+.22),BW=bw;
/* a letter or word block: the text is on the top and the front */
function block(txt,o){o=o||{};const w=bw(txt),h=.42;const bg=o.bg||'#ffffff',col=o.col||INK;const side=lam(o.side||'#ffd24a');const m=glyphMat(txt,col,bg,w);
  const b=mk(new THREE.BoxGeometry(w,h,.46),[side,side,m,side,m,side],20);b.position.y=h/2;const g=new THREE.Group();g.add(b);g.userData.text=txt;g.userData.w=w;return g;}
const BLOCK=(t,o)=>block(t,o);
function ghost(w){const g=new THREE.Group();const b=new THREE.Mesh(new THREE.BoxGeometry(w,.42,.46),new THREE.MeshLambertMaterial({color:'#ffe066',transparent:true,opacity:.42,depthWrite:false}));b.position.y=.21;g.add(b);
  const e=new THREE.LineSegments(new THREE.EdgesGeometry(b.geometry),new THREE.LineBasicMaterial({color:'#e09b00'}));e.position.y=.21;g.add(e);const q=label('?',{size:.3,color:'#c27c00'});q.position.y=.7;g.add(q);g.userData.gap=1;g.userData.w=w;return g;}
/* an open crate with a sign, for sorting */
function crate(lab,col,x,z,w){const g=new THREE.Group();g.position.set(x,0,z);const d=1.15,h=.3,c=lam(col),lt=lam(mixHex(col,'#ffffff',.72));
  const fl=mk(new THREE.BoxGeometry(w,.04,d),lt,20);fl.position.y=.02;g.add(fl);
  [[0,-d/2,w,.06],[0,d/2,w,.06]].forEach(([xx,zz,ww,dd])=>{const m=mk(new THREE.BoxGeometry(ww,h,dd),c,20);m.position.set(xx,h/2,zz);g.add(m);});
  [[-w/2,0],[w/2,0]].forEach(([xx])=>{const m=mk(new THREE.BoxGeometry(.06,h,d),c,20);m.position.set(xx,h/2,0);g.add(m);});
  const L=label(lab,{size:.24,bg:'#ffffff',border:col});L.position.set(0,.62,-d/2);g.add(L);g.userData.bin=lab;return g;}
function find(root,spec){if(!root||!spec)return [];const out=[];const ws=String(spec).split('|');
  root.traverse(o=>{const u=o.userData||{};for(const w of ws){if(w==='*'&&(u.name||u.text)&&!(o.parent&&o.parent.userData&&o.parent.userData.name))out.push(o);else if(w[0]==='#'&&u.text===w.slice(1))out.push(o);else if(w==='gap'&&u.gap)out.push(o);
    else if(w.slice(0,4)==='bin:'&&u.bin===w.slice(4))out.push(o);else if(w.slice(0,5)==='cell:'&&u.cell===w.slice(5))out.push(o);else if(w[0]==='@'&&u.part===w.slice(1))out.push(o);else if(u.name===w&&!u.inBin)out.push(o);else if(u.name===w&&u.inBin)out.push(o);}});
  return [...new Set(out)];}
const CUSTOM={};

/* ---------------- the page (left) ---------------- */
function bold(t){return t;}
function drawStory(p,y,sty){const g=p.g;const lines=wrap(g,sty.text,0,0,TW-60,36,{font:FT.body,bold:FT.bodyB,dry:true});const ph=sty.pics&&CMP<3?86:0;const h=lines+ph+84;
  rr(g,X0,y,TW,h,20);g.fillStyle='#ffffff';g.fill();g.lineWidth=3;g.strokeStyle=tint(acc(),.5);g.stroke();
  rr(g,X0,y,TW,52,20);g.fillStyle=tint(acc(),.14);g.fill();pic(g,'book',X0+34,y+26,34);T(g,sty.title,X0+62,y+37,FT.h3,INK);
  let yy=wrap(g,sty.text,X0+30,y+92,TW-60,36,{font:FT.body,bold:FT.bodyB,boldColor:acc()});
  if(sty.pics&&CMP<3){const n=sty.pics.length,sp=Math.min(110,(TW-60)/n);sty.pics.forEach((k,i)=>picTile(g,k,X0+TW/2-(n-1)*sp/2+i*sp,yy+30,60,COLS[i%COLS.length]));}
  return y+h+22;}
function drawBox(p,y,b){const g=p.g;const tl=b.text?wrap(g,b.text,0,0,TW-56,36,{font:FT.body,bold:FT.bodyB,dry:true}):0;
  if(b.lines){/* worked examples: each line in its own soft card, one or two columns; cards grow to fit wrapped text */const L=b.lines,cols=b.cols||(L.some(t=>t.replace(/\*/g,'').length>22)?1:2),rows=Math.ceil(L.length/cols);
    const FNT=CMP>=4?FT.smallB:FT.bodyB,LH=CMP>=4?26:30,pad=CMP>=4?5:CMP>=1?9:18,GP=CMP>=3?6:10,cw=(TW-56-(cols-1)*14)/cols;
    const nl=L.map(t=>Math.max(1,Math.round(wrap(g,t,0,0,cw-30,LH,{font:FNT,bold:FNT,dry:true})/LH)));const rh=[];for(let r=0;r<rows;r++){let m=1;for(let c=0;c<cols;c++){const k=r*cols+c;if(k<L.length)m=Math.max(m,nl[k]);}rh.push(m*LH+pad*2);}
    const tot=rh.reduce((a,b)=>a+b+GP,0);const h=70+(tl?tl+10:0)+tot+(b.note?44:0)+18;P.box(p,y,h,b.title);let yy=y+70;if(b.text)yy=wrap(g,b.text,X0+28,yy+26,TW-56,36,{font:FT.body,bold:FT.bodyB,boldColor:acc()})+2;
    let ry=yy;for(let r=0;r<rows;r++){for(let c=0;c<cols;c++){const k=r*cols+c;if(k>=L.length)continue;const cx=X0+28+c*(cw+14);rr(g,cx,ry,cw,rh[r],14);g.fillStyle=tint(acc(),.1);g.fill();
      wrap(g,L[k],cx+18,ry+pad+LH*.78,cw-30,LH,{font:FNT,bold:FNT,boldColor:'#e4572e'});}ry+=rh[r]+GP;}yy=ry;
    if(b.note)T(g,b.note,X0+28,yy+28,FT.hand,acc());return y+h+20;}
const exn=(b.ex||[]).length,cols=Math.min(exn,b.cols||((b.ex||[]).some(e=>(e[1]||'').replace(/\*/g,'').length>9)?3:4)),rows=Math.ceil(exn/Math.max(1,cols));
  const cw0=(TW-40)/Math.max(1,cols),PS0=CMP>=4?40:CMP>=1?48:(b.big?84:64),LO=CMP?34:b.big?52:40;const mxl=Math.max(1,...(b.ex||[]).map(e=>Math.round(wrap(g,e[1]||'',0,0,cw0-12,30,{font:FT.bodyB,bold:FT.bodyB,dry:true})/30)));
  const RH=Math.max(CMP>=5?76:CMP>=4?84:CMP>=1?100:(b.big?150:122),PS0+LO+(mxl-1)*30+14);const exh=rows*RH;const h=70+tl+exh+(b.note?44:0)+18;P.box(p,y,h,b.title);let yy=y+70;
  if(b.text)yy=wrap(g,b.text,X0+28,yy+26,TW-56,36,{font:FT.body,bold:FT.bodyB,boldColor:acc()})-4;
  if(exn){const cw=(TW-40)/cols;b.ex.forEach((e,i)=>{const cx=X0+20+cw*(i%cols)+cw/2,cy=yy+Math.floor(i/cols)*RH;const ps=CMP>=4?40:CMP>=1?48:(b.big?84:64);
    if(e[0])picTile(g,e[0],cx,cy+ps/2+6,ps,COLS[i%COLS.length]);wrap(g,e[1]||'',cx-cw/2+6,cy+ps+(CMP?34:b.big?52:40),cw-12,30,{font:FT.bodyB,bold:FT.bodyB,boldColor:'#e4572e',center:true});});yy+=exh;}
  if(b.note)T(g,b.note,X0+28,yy+28,FT.hand,acc());return y+h+20;}
function drawCards(p,y,cards){const g=p.g;const hh=cards.some(c=>(c.q||'').replace(/\*/g,'').length>32||(c.a||'').replace(/\*/g,'').length>34)?182:150;return exGrid(p,y,cards.length,cards[0].h||hh,(i,x,yy,w,h)=>{const c=cards[i];let ty=yy+34;
  if(c.q)ty=wrap(g,c.q,x+56,yy+34,w-70,28,{font:FT.smallB,bold:FT.smallB,boldColor:acc()})+2;
  const ps=c.pics||[];const n=ps.length,sp=Math.min(76,(w-40)/Math.max(1,n));const py=ty+30;ps.forEach((k,j)=>{const cx=x+30+sp/2+j*sp;pic(g,k,cx,py,Math.min(58,sp-6));
    if(c.o&&c.o.includes(j)){g.beginPath();g.arc(cx,py,Math.min(36,sp/2),0,Math.PI*2);g.strokeStyle='#e4572e';g.lineWidth=4;g.stroke();}if(c.x&&c.x.includes(j))xMark(g,cx,py,Math.min(50,sp-10));});
  if(c.a)wrap(g,c.a,x+30,(n?py+60:ty+24),w-50,30,{font:FT.hand,bold:FT.hand,color:acc(),boldColor:'#e4572e'});});}
let CMP=0;/* compact level while fitting a page: 1 tighter example rows, 2 no cards, 3 no key words or story pictures, 4 smallest */
function drawPage(p,S,d){let y=0;for(let lv=0;lv<=5;lv++){if(lv>0&&P.paperBase){P.paperBase(p);p.hot=[];p.flaps=[];}CMP=lv;y=drawPage1(p,S,d);if(y<=1300)break;}CMP=0;return y;}
function drawPage1(p,S,d){let y=header(p,S);const pg=d.page||{};
  if(pg.intro)y=P.para(p,y+6,pg.intro)+16;
  if(pg.story)y=drawStory(p,y-6,pg.story);
  (pg.boxes||[]).forEach(b=>{y=drawBox(p,y-4,b);});
  if(CMP<2&&pg.cards&&pg.cards.length&&y<1150)y=drawCards(p,y,pg.cards);
  if(CMP<3&&pg.words&&y<1220)y=keyWords(p,y,pg.words);return y;}

/* ---------------- the model (right) ---------------- */
const Z0=-1.85,ZF=-.8;
function layoutRow(n,z){const out=[];if(n<=5){const sp=Math.min(1.02,4.3/n);for(let i=0;i<n;i++)out.push([(i-(n-1)/2)*sp,z,1]);}
  else{const a=Math.ceil(n/2),b=n-a,sp=Math.min(.95,4.3/a);for(let i=0;i<a;i++)out.push([(i-(a-1)/2)*sp,z-.55,.86]);for(let i=0;i<b;i++)out.push([(i-(b-1)/2)*sp,z+.55,.86]);}return out;}
function partsLayout(parts,x0,x1){const ws=parts.map(t=>t==='_'?null:bw(t));return ws;}
function render(g2,st,h){const set=st.set||{};const reg={items:[],opts:[],built:[]};
  if(set.scene&&P.STAGE){reg.sc=P.STAGE.makeScene(g2,st,set.row||set.fill||set.build||set.bins||set.grid?.3:.7);const fn=typeof set.scene==='function'?set.scene:(P.SCENES||{})[set.scene];try{reg.scene=fn?fn(reg.sc,st,set)||{}:{};}catch(e){console.error(e);reg.scene={};}}
  if(set.custom&&CUSTOM[set.custom]){reg.custom=CUSTOM[set.custom](g2,st,h,set)||{};}
  /* a row of standees (also used for order and pick rounds) */
  if(set.row){const names=set.row,pos=layoutRow(names.length,set.z||(set.scene?-.95:set.fill||set.build?-2.6:Z0));names.forEach((n,i)=>{const lb=set.labels===false?false:(set.labels&&set.labels[i]!=null?set.labels[i]:(set.letters?'ABCDEFGH'[i]:n));
    const s=standee(n,{col:COLS[(set.colOff||0)+i%COLS.length],label:lb,s:pos[i][2]*(set.s||(set.scene?.86:1.12))});s.position.set(pos[i][0],0,pos[i][1]);s.userData.i=i;g2.add(s);reg.items.push(s);
    if(st.lit&&st.lit.includes(i)){const r=mk(G('k2ring',()=>new THREE.TorusGeometry(.42,.035,8,32)),lam('#16a36f'),0);r.rotation.x=Math.PI/2;r.position.set(pos[i][0],.05,pos[i][1]);g2.add(r);}
    const oi=(st.ord||[]).indexOf(i);if(oi>=0){const b=tag(String(oi+1),{size:.26,bg:'#ffd54f',border:'#e09b00'});b.position.set(.34,1.05,-.3);s.add(b);}
    if(st.crossed===i)K.crossOut(s);
    A.drag(s,{tap:()=>h.item(i,n)});});}
  /* sorting crates */
  if(set.bins){const nb=set.bins.length,w=nb===2?1.95:1.38,gap=nb===2?2.2:1.45;const bins=set.bins.map((b,j)=>{const c=crate(b,COLS[(j*2+1)%COLS.length],(j-(nb-1)/2)*gap,-2.2,w);g2.add(c);A.drag(c.children[0],{tap:()=>h.bin(j)});return c;});reg.bins=bins;
    const items=set.items;const loose=items.map((it,i)=>i).filter(i=>st.place[i]==null);const sp=Math.min(.7,4.4/Math.max(1,loose.length));const cnt=set.bins.map(()=>0);
    items.forEach((it,i)=>{const s=standee(it[0],{col:COLS[i%COLS.length],label:it[2]||it[0],s:st.place[i]==null?.72:.62});let x,z;
      if(st.place[i]==null){const k=loose.indexOf(i);x=(k-(loose.length-1)/2)*sp;z=-.75;}else{const j=st.place[i],k=cnt[j]++;const cols=2;x=bins[j].position.x+((k%cols)-(cols-1)/2)*(w/cols)*.92;z=-2.5+Math.floor(k/cols)*.55;s.userData.inBin=1;}
      s.position.set(x,0,z);s.userData.i=i;if(st.sel===i){const r=mk(G('k2sel',()=>new THREE.TorusGeometry(.4,.04,8,32)),lam('#e4572e'),0);r.rotation.x=Math.PI/2;r.position.y=.05;s.add(r);}
      g2.add(s);reg.items.push(s);
      A.drag(s,{tap:()=>h.sortTap(i),drop:pos=>{let best=null,bd=9;bins.forEach((b,j)=>{const d=Math.abs(pos.x-b.position.x)+Math.max(0,pos.z-(-1.45))*1.5;if(d<bd){bd=d;best=j;}});if(pos.z>-1.3)best=null;h.sortDrop(i,best);}});});}
  /* letters or words with one gap, and answer blocks to choose from */
  if(set.fill){const parts=set.fill,ws0=parts.map(t=>t==='_'?bw(st.filled||set.ans||'a'):bw(t)),tot0=ws0.reduce((a,b)=>a+b,0)+.07*(parts.length-1),fsc=Math.min(1,(set.pic&&!set.row?3.2:4.4)/tot0),ws=ws0.map(w=>w*fsc),gap=.07*fsc,tot=tot0*fsc;
    const hasPic=!!set.pic&&!set.row;let x=-tot/2+(hasPic?.55:0);if(hasPic){const s=standee(set.pic,{col:COLS[1],label:set.picLabel||false,s:.95});s.userData.kind=set.pic;s.position.set(Math.max(-2.05,x-.75),0,-1.95);g2.add(s);reg.items.push(s);reg.pic=s;x=Math.max(x,-1.4);}
    const z=set.row?-1.55:-1.9;parts.forEach((t,i)=>{const w=ws[i];let b;if(t==='_'){b=st.filled?block(st.filled,{side:'#5fd38a'}):ghost(w/fsc);b.userData.gap=1;}else b=block(t,{side:set.side||'#ffd24a'});b.scale.setScalar(fsc);b.position.set(x+w/2,0,z);b.userData.part=String(i);g2.add(b);x+=w+gap;});
    const opts=set.opts||[];const sp=Math.min(1.0,4.2/Math.max(1,opts.length));opts.forEach((t,i)=>{if(st.filled&&t===st.filled&&st.filledOk)return;const b=block(t,{side:'#8fd3ff'});b.position.set((i-(opts.length-1)/2)*sp,0,set.row?-.62:-.78);b.userData.opt=t;g2.add(b);reg.opts.push(b);A.drag(b,{tap:()=>h.opt(t,b)});});}
  /* build a sentence: tap the word blocks in order */
  if(set.build){const words=set.build,perm=st.perm||words.map((w,i)=>i);const built=st.built||[];const full=words.reduce((a,w)=>a+BW(w)+.06,0),sc=Math.min(1,4.4/full);const bw=t=>BW(t)*sc;const block=(t,o)=>{const b=BLOCK(t,o);b.scale.setScalar(sc);return b;};let x=-full*sc/2;
    const line=mk(G('k2line',()=>new THREE.BoxGeometry(4.5,.02,.06)),lam('#c9cfdc'),0);line.position.set(0,.01,-1.6);g2.add(line);
    built.forEach(i=>{const w=bw(words[i]);const b=block(words[i],{side:'#5fd38a'});b.position.set(x+w/2,0,-1.88);g2.add(b);reg.built.push(b);x+=w+.06*sc;});
    const rest=perm.filter(i=>!built.includes(i));const rw=rest.reduce((a,i)=>a+bw(words[i])+.12*sc,0);let rx=-rw/2;
    rest.forEach(i=>{const w=bw(words[i]);const b=block(words[i],{side:'#8fd3ff'});b.position.set(rx+w/2,0,-.78);b.userData.opt=words[i];g2.add(b);reg.opts.push(b);A.drag(b,{tap:()=>h.word(i)});rx+=w+.12*sc;});
    if(set.pic){const s=standee(set.pic,{col:COLS[2],label:false,s:.8});s.userData.kind=set.pic;s.position.set(0,0,-2.75);g2.add(s);reg.pic=s;}}
  /* answer blocks on the page for dock questions (short answers only): tap one to answer */
  if(set.choices&&st.round&&st.round.o){const L=set.choices,n=L.length,ws=L.map(t=>BW(t)),tot=ws.reduce((a,b)=>a+b,0)+.25*(n-1),sc=Math.min(1,4.3/tot);let x=-tot*sc/2;
    L.forEach((t,i)=>{const ok=st.chosen===t;const b=block(t,{side:ok?'#5fd38a':COLS[(i*2+1)%COLS.length]});b.scale.setScalar(sc);b.position.set(x+ws[i]*sc/2,0,set.row?-.72:-1.05);x+=ws[i]*sc+.25*sc;b.userData.opt=t;g2.add(b);reg.opts.push(b);A.drag(b,{tap:()=>h.choice(t,b)});});}
  /* a map grid: rows A, B, C… and columns 1, 2, 3… */
  if(set.grid){const gd=set.grid,cs=Math.min(.78,4.2/gd.cols,2.4/gd.rows),x0=-(gd.cols-1)*cs/2,z0=-2.75+cs/2;
    for(let r=0;r<gd.rows;r++)for(let c=0;c<gd.cols;c++){const id='ABCDEF'[r]+(c+1);const lit=st.cellLit===id;const t=mk(G('k2cell'+cs,()=>new THREE.BoxGeometry(cs*.96,.05,cs*.96)),lam(lit?'#ffe08a':((r+c)%2?'#e8f5e9':'#f1f8e9')),20);
      t.position.set(x0+c*cs,.025,z0+r*cs);t.userData.cell=id;g2.add(t);A.drag(t,{tap:()=>h.cell(id)});const it=(gd.items||{})[id];if(it){const s=standee(it,{col:COLS[(r*3+c)%COLS.length],label:false,s:cs*1.05});s.position.set(x0+c*cs,.05,z0+r*cs+.05);s.userData.cellOf=id;g2.add(s);A.drag(s,{tap:()=>h.cell(id)});}}
    for(let r=0;r<gd.rows;r++){const L=label('ABCDEF'[r],{size:.26,color:acc()});L.position.set(x0-cs*.85,.2,z0+r*cs);g2.add(L);}
    for(let c=0;c<gd.cols;c++){const L=label(String(c+1),{size:.26,color:acc()});L.position.set(x0+c*cs,.12,z0-cs*.78);g2.add(L);}}
  return reg;}

/* ---------------- lesson factory ---------------- */
const TRIES={},MORE={};
/* Grade 2+: a bonus story on the practice page (some questions are about it) */
P.practiceStory=function(L,p,S,y){const m=MORE[L.id];if(!m)return 0;y=P.para(p,y,m.lead||'Read the story. Then answer the questions on the model page.')+10;return drawStory(p,y,m)+4;};
P.practiceMore=function(L,p,S,y){const list=TRIES[L.id];if(!list||y>1080)return;T(p.g,'Warm up: try it!',X0,y+34,FT.h3,INK);let yy=y+56;list.forEach(([q,a],i)=>{if(yy+200<1310)yy=P.tryIt(p,yy+30,S,'try'+i,i+1,q,a);});};
function live(o,big){if(P.STAGE)return P.STAGE.alive(o,big);jump(o);}
function jump(o){if(!o)return;const y0=o.position.y,r0=o.rotation.y;tween(.6,k=>{o.position.y=y0+Math.sin(Math.PI*k)*.45;o.rotation.y=r0+k*Math.PI*2;}).then(()=>{o.position.y=y0;o.rotation.y=r0;});}
function shake(o){if(!o)return;const x0=o.position.x;tween(.4,k=>{o.position.x=x0+Math.sin(k*Math.PI*6)*.08*(1-k);}).then(()=>{o.position.x=x0;});}
function solvedSet(set){const s=JSON.parse(JSON.stringify(set));return s;}
P.unit=function(d){(window.__UNITS=window.__UNITS||[]).push(d);
  {const X=(P.SCN||{})[d.id]||(P.autoScene&&P.autoScene(d))||{};(X.steps||[]).forEach((f,i)=>{if(!f||!d.steps[i])return;if(typeof f==='function')d.steps[i].set=Object.assign({},d.steps[i].set,{scene:f});else{d.steps[i].set=Object.assign({},f.set||{},{scene:f.scene});}});
   Object.keys(X.rounds||{}).forEach(k=>{const r=d.rounds[+k];if(!r)return;const f=X.rounds[k];if(typeof f==='function')r.scene=f;else{r.scene=f.scene;if(f.set)r.set=f.set;if(f.o)r.o=f.o;if(f.ans!=null)r.ans=f.ans;if(f.q)r.q=f.q;}});}
  const sets=d.steps.map(s=>s.set);
  P.theory=P.theory||{};
  P.theory[d.id]=d.steps.map((s,i)=>({say:s.say,speech:s.speech,demo:'s'+i,story3d:i===0&&!!(d.page&&d.page.story),cues:(s.cues||[]).map(c=>{const q={w:c[0]};if(c[1])q.p=r=>find(r,c[1]);if(c[2])q.l=c[2];if(c[3])q.demo='s'+i+c[3];if(c[4])q.keep=true;if(!q.p&&!q.l&&!q.demo)q.hl=c[0];return q;})}));
  if(d.tries)TRIES[d.id]=d.tries;if(d.more)MORE[d.id]=d.more;
  const W=d.watch||[];
  P.lesson({id:d.id,title:d.title,strand:d.strand,codes:d.codes,guide:d.guide,
    learn:[{say:W[0]||'Watch!',speech:W[1]||W[0]||'Watch!',view:'model',demo:'play'}],
    fig:d.fig||'',rz:.5,explore:d.explore||['*Tap* a picture to hear its name.','Press *Next* for another example.','Try it before you play!'],
    howTo:d.howTo||'Read the question. Tap, drag or build on the model to answer.',
    init:k=>({set:sets[0],place:[],ord:[],lit:[],built:[],filled:null,msg:'',ask:null,ex:0}),
    left(p,S){return drawPage(p,S,d);},
    readout(p,S,y){const g=p.g,st=S.st;if(st.msg)wrap(g,st.msg,X0,y+44,TW,40,{font:FT.bodyB,bold:FT.bodyB,boldColor:acc()});return y+70;},
    build(S,grp,mode,game0){const game={solved:m=>{reg.hold=0;try{if(reg.scene&&reg.scene.win){const h=reg.scene.win(st.round);reg.hold=typeof h==='number'?h:(reg.scene.hold||2800);}else if(st.round&&st.round.o)reg.items.forEach((o,j)=>A.later(()=>live(o,true),j*150));}catch(e){console.error(e);}game0.solved(m);},get round(){return game0.round;}};
      const bad=m=>{try{if(reg.scene&&reg.scene.miss)reg.scene.miss();}catch(e){}A.bad(m);};const st=S.st;const g2=K.stage(grp);let reg={items:[],opts:[]};const play=()=>mode==='play'&&!st.setup&&st.round;
      function draw(){clearGroup(g2);reg=render(g2,st,H);A.redraw();}
      function useSet(set,state){st.set=set;st.colDone=st.lineDone=st.shareDone=st.unitsDone=st.balDone=false;st.place=set.bins?set.items.map(()=>null):[];st.ord=[];st.lit=[];st.built=[];st.filled=null;st.filledOk=false;st.sel=null;st.crossed=null;st.cellLit=null;
        st.ang=null;st.perm=set.build?(set.keep?set.build.map((w,i)=>i):shuffle(set.build.map((w,i)=>i))):null;if(state==='done')finish();draw();}
      function finish(){const set=st.set;if(set.bins)st.place=set.items.map(it=>it[1]);if(set.fill){st.filled=set.ans;st.filledOk=true;}if(set.build)st.built=set.build.map((w,i)=>i);if(set.order)st.ord=set.order.map(n=>set.row.indexOf(n));if(set.ans&&set.row&&!set.fill){[].concat(set.ans).forEach(a=>{const i=set.row.indexOf(a);if(i>=0)st.lit.push(i);});}if(set.cell)st.cellLit=set.cell;if(set.cross!=null)st.crossed=set.cross;st.msg=set.doneMsg||st.msg;}
      const say=(t)=>{if(t)A.say(t);};
      const act=(text)=>{if(!P.STAGE)return;if(!reg.sc){const s0=st.set||{};reg.sc=P.STAGE.makeScene(g2,st,s0.row||s0.fill||s0.build||s0.bins||s0.grid?.3:.7);}try{P.STAGE.actOut(reg.sc,text,reg.pic);}catch(e){console.error(e);}};
      const H={
        item(i,n){A.pop();const set=st.set;const it=reg.items[i];
          if(set.order){if(st.ord.includes(i))return;st.ord.push(i);draw();say(String(st.ord.length));if(st.ord.length===set.order.length){const ok=st.ord.every((k,j)=>set.row[k]===set.order[j]);
              if(ok&&P.STAGE)st.ord.forEach((k,j)=>A.later(()=>live(reg.items[k],true),j*220));if(play()){if(ok)game.solved(st.round.ok||'Yes! That is the right order.');else{bad(st.round.hint||'Not quite. Try again!');st.ord=[];A.later(draw,700);}}else{st.msg=ok?'Right order!':'Try again!';if(!ok){st.ord=[];A.later(draw,700);}A.redraw();}}return;}
          const lab=(set.say&&set.say[n])||(set.labels&&set.labels[i])||n;
          if(play()&&st.round.ans!=null&&!st.round.o){const ans=[].concat(st.round.ans);if(ans.includes(n)){live(it);if(ans.length>1){if(!st.lit.includes(i)){st.lit.push(i);draw();}const need=ans.length;if(st.lit.length>=need)game.solved(st.round.ok||'Yes! You found them all.');else say(lab);}else{st.lit=[i];draw();game.solved(st.round.ok||'Yes!');}}
            else{shake(it);bad(st.round.hint||'Look again!');}return;}
          if(set.cross!=null&&!play()){st.crossed=i;draw();}
          live(it);say(lab);st.msg=(set.say&&set.say[n])||'';A.redraw();},
        sortTap(i){A.pop();const set=st.set,nb=set.bins.length;const cur=st.place[i];st.place[i]=cur==null?0:cur+1<nb?cur+1:null;draw();check();},
        sortDrop(i,j){st.place[i]=j;draw();check();},
        bin(j){},
        opt(t,b){A.pop();const set=st.set;const ok=t===(set.ans);if(ok){st.filled=t;st.filledOk=true;draw();act(set.doneMsg||t);A.good();say(set.doneMsg||t);if(play())game.solved(st.round.ok||'Yes!');else{st.msg=set.doneMsg||'';A.redraw();}}
          else{shake(b);if(play())bad(st.round.hint||'Not that one. Try again!');else say('Try another one!');}},
        word(i){A.pop();const set=st.set;st.built.push(i);draw();if(st.built.length===set.build.length){const ok=st.built.every((k,j)=>set.build[k]===set.build[j]);
          if(ok){act(set.build.join(' '));A.good();st.msg=set.build.join(' ');A.redraw();if(play())game.solved(st.round.ok||'Yes! That sentence makes sense.');}else{if(play())bad(st.round.hint||'Hmm, that does not make sense. Try again!');else say('Try again!');st.built=[];A.later(draw,800);}}},
        redrawCustom(){draw();},
        choice(t,b){A.pop();if(!play())return;if(String(t)===String(st.round.ans)){st.chosen=t;draw();const o=reg.opts.find(x=>x.userData.opt===t);if(o)live(o,true);game.solved(st.round.ok||'Yes!');}else{shake(b);bad(st.round.hint||'Not that one. Try again!');}},
        cell(id){A.pop();st.cellLit=id;draw();const it=((st.set.grid||{}).items||{})[id];say(id+(it?': '+it:''));if(play()&&st.round.cell){if(id===st.round.cell)game.solved(st.round.ok||'Yes! '+id+'.');else bad(st.round.hint||'Find the row letter first, then the column number.');}}
      };
      function check(){const set=st.set;if(st.place.some(v=>v==null))return;const ok=set.items.every((it,i)=>it[1]===st.place[i]);if(ok&&P.STAGE)reg.items.forEach((o,j)=>A.later(()=>live(o),j*120));
        if(play()){if(ok)game.solved(st.round.ok||'Yes! Everything is in the right group.');else bad(st.round.hint||'Something is in the wrong group. Tap it to move it.');}else{st.msg=ok?'Sorted!':'Something is in the wrong group.';if(ok)A.good();A.redraw();}}
      useSet(sets[0]);
      function demoPlay(){const set=st.set;
        if(set.bins){A.seq(set.items.map((it,i)=>[420,()=>{st.place[i]=it[1];A.pop();draw();}]));return;}
        if(set.fill){A.seq([[900,()=>{st.filled=set.ans;st.filledOk=true;draw();act(set.doneMsg||set.ans);A.good();say(set.doneMsg||set.ans);}]]);return;}
        if(set.build){A.seq(set.build.map((w,i)=>[500,()=>{st.built.push(i);A.pop();draw();if(st.built.length===set.build.length)act(set.build.join(' '));}]));return;}
        if(set.order){A.seq(set.order.map(n=>[550,()=>{st.ord.push(set.row.indexOf(n));A.pop();draw();}]));return;}
        if(set.row){A.seq(set.row.map((n,i)=>[700,()=>{live(reg.items[i]);say((set.labels&&set.labels[i])||n);}]));}
        if(reg.custom&&reg.custom.play)reg.custom.play();if(reg.scene&&reg.scene.play)reg.scene.play();}
      let rOff=0;
      return {hold:()=>reg.hold||0,_win:()=>game.solved('Yes!'),_miss:()=>bad(''),taskAt(i){rOff=(i-1+d.rounds.length)%d.rounds.length;return this.task(1);},info:()=>(st.msg||'').replace(/\*/g,''),tick:(dt,t)=>{if(reg.sc)reg.sc._tick(dt,t);},
        controls:()=>{const c=[{t:'Next',go:true,fn:()=>{st.ex=(st.ex+1)%sets.length;st.round=null;st.msg='';useSet(sets[st.ex]);}},{t:'Again',fn:()=>{useSet(st.set);}}];
          if(reg.custom&&reg.custom.controls)c.unshift(...reg.custom.controls());
          if(mode!=='play')return c;const cc=reg.custom&&reg.custom.controls?reg.custom.controls():[];
          if(st.round&&st.round.o)return choices(st.setup?null:game,st.round.o,st.round.ans,st.round.ok||'Yes!',null,st.round.hint).concat(cc);return cc;},
        demo(n){st.round=null;st.msg='';if(n==='play'){useSet(st.set);demoPlay();return;}const m=/^s(\d+)(.*)$/.exec(n);if(!m)return;const set=sets[+m[1]];if(!set)return;
          if(m[2]==='done'){if(st.set!==set)useSet(set);finish();draw();}else if(m[2]==='play'){if(st.set!==set)useSet(set);demoPlay();}else if(m[2]==='x'){if(st.set!==set)useSet(set);st.crossed=set.cross;draw();}else useSet(set);},
        task(r){st.setup=true;if(r===0)rOff=rnd(0,d.rounds.length-1);const R=d.rounds[(r+rOff)%d.rounds.length];st.round=R;st.msg='';
          let set=R.set||{};if(set.row&&R.shuffle!==false&&!set.order&&!set.keep){const idx=shuffle(set.row.map((x,i)=>i));set=Object.assign({},set,{row:idx.map(i=>set.row[i]),labels:set.labels?idx.map(i=>set.labels[i]):set.labels});}
          if(set.order){const idx=shuffle(set.row.map((x,i)=>i));set=Object.assign({},set,{row:idx.map(i=>set.row[i]),labels:set.labels?idx.map(i=>set.labels[i]):undefined});}
          if(set.opts)set=Object.assign({},set,{opts:shuffle(set.opts)});
          if(set.bins)set=Object.assign({},set,{items:shuffle(set.items)});
          if(R.scene)set=Object.assign({},set,{scene:R.scene});else if(P.STAGE&&!set.row&&!set.fill&&!set.build&&!set.bins&&!set.grid&&!set.custom)set=Object.assign({},set,{scene:(sc,st2,s2)=>P.STAGE.thinker(sc,st2,s2,{kid:r%6})});
          if(R.o&&!set.fill&&!set.build&&!set.bins&&!set.grid&&!set.custom&&R.o.length<=4&&R.o.every(t=>String(t).length<=16))set=Object.assign({},set,{choices:shuffle(R.o.map(String))});
          st.chosen=null;useSet(set);st.setup=false;return R.q;}};}});
};
P.K2={standee,block,crate,find,pic,picTile,img,CUSTOM,COLS,render,jump,shake,mixHex};
})();
/* round and scene shorthands for lesson files */
(function(){const P=window.PM;if(!P||!P.K2)return;
const letters=(w,gap)=>w.split('').map((c,i)=>[].concat(gap).includes(i)?'_':c);
P.R={
  pick:(q,row,ans,o)=>Object.assign({q,set:{row},ans},o||{}),
  fill:(q,pic,word,gap,opts,o)=>Object.assign({q,set:{fill:letters(word,gap),pic,opts,ans:word[gap],doneMsg:word}},o||{}),
  fillw:(q,parts,opts,ans,o)=>{o=Object.assign({},o||{});const set={fill:parts,opts,ans,doneMsg:parts.map(p=>p==='_'?ans:p).join(' ').replace(/ ([.?!,])/g,'$1')};if(o.pic){set.pic=o.pic;delete o.pic;}return Object.assign({q,set},o);},
  sort:(q,bins,items,o)=>Object.assign({q,set:{bins,items}},o||{}),
  build:(q,words,pic,o)=>Object.assign({q,set:{build:words,pic}},o||{}),
  order:(q,row,o)=>Object.assign({q,set:{row,order:row.slice()}},o||{}),
  ask:(q,row,opts,ans,o)=>Object.assign({q,set:row?{row,keep:true}:{},o:opts,ans},o||{}),
  grid:(q,grid,cell,o)=>Object.assign({q,set:{grid},cell},o||{})};
P.S={row:(row,o)=>Object.assign({row},o||{}),fill:(pic,word,gap,opts)=>({fill:letters(word,gap),pic,opts,ans:word[gap],doneMsg:word}),
  fillw:(parts,opts,ans,o)=>Object.assign({fill:parts,opts,ans,doneMsg:parts.map(p=>p==='_'?ans:p).join(' ').replace(/ ([.?!,])/g,'$1')},o||{}),
  sort:(bins,items)=>({bins,items}),build:(words,pic,o)=>Object.assign({build:words,pic,keep:true},o||{}),order:(row)=>({row,order:row.slice()})};
})();
/* custom model: the Earth spins by the Sun, day and night */
(function(){const P=window.PM;if(!P||!P.K2)return;const {THREE,G,lam,mk,label,A,tween}=P;const K2=P.K2;
function earthTex(){const c=document.createElement('canvas');c.width=512;c.height=256;const g=c.getContext('2d');g.fillStyle='#3a8fe0';g.fillRect(0,0,512,256);g.fillStyle='#5cc46a';
  [[90,90,60,40],[150,170,40,50],[300,80,70,45],[330,170,50,35],[440,110,45,60],[220,40,30,18]].forEach(([x,y,rx,ry])=>{g.beginPath();g.ellipse(x,y,rx,ry,.3,0,Math.PI*2);g.fill();});
  g.fillStyle='#ffffff';g.fillRect(0,0,512,14);g.fillRect(0,242,512,14);return new THREE.CanvasTexture(c);}
K2.CUSTOM.globe=function(g2,st,h,set){if(st.ang==null)st.ang=set.time==='night'?Math.PI*.55:-Math.PI*.45;
  const sun=K2.standee('sun',{col:'#f2c12e',label:'Sun',s:1.25});sun.position.set(-1.85,0,-1.9);g2.add(sun);
  const rays=mk(G('k2rays',()=>new THREE.ConeGeometry(.5,1.6,24,1,true)),new THREE.MeshBasicMaterial({color:'#fff3b0',transparent:true,opacity:.28,side:THREE.DoubleSide,depthWrite:false}),0);rays.rotation.z=Math.PI/2;rays.position.set(-.8,.62,-1.9);g2.add(rays);
  const E=new THREE.Group();E.position.set(.7,.62,-1.9);g2.add(E);const earth=new THREE.Mesh(G('k2earth',()=>new THREE.SphereGeometry(.55,40,28)),P.M('k2earthm',()=>new THREE.MeshLambertMaterial({map:earthTex()})));earth.castShadow=true;E.add(earth);
  const shade=new THREE.Mesh(G('k2shade',()=>new THREE.SphereGeometry(.565,40,28,0,Math.PI)),new THREE.MeshBasicMaterial({color:'#0b1640',transparent:true,opacity:.55,depthWrite:false}));shade.rotation.y=Math.PI;E.add(shade);
  const spin=new THREE.Group();E.add(spin);spin.rotation.y=st.ang;const kid=K2.standee('child',{col:'#ff6b9a',label:false,s:.55});kid.position.set(0,0,.55);kid.rotation.x=Math.PI/2*0;spin.add(kid);kid.position.y=-.02;
  const pin=mk(G('k2pin',()=>new THREE.CylinderGeometry(.02,.02,1.5,6)),lam('#8d6e63'),0);E.add(pin);
  const isDay=()=>Math.sin(st.ang)<0;const tagL=label(isDay()?'day ☀':'night ☾',{size:.24,bg:'#ffffff',border:isDay()?'#f2c12e':'#3b4aa0'});tagL.position.set(.7,1.55,-1.9);g2.add(tagL);
  st.msg=isDay()?'The child faces the Sun: it is *day*.':'The child faces away from the Sun: it is *night*.';
  function turn(by){const a0=st.ang;tween(1.2,k=>{spin.rotation.y=a0+by*k;}).then(()=>{st.ang=a0+by;h.redrawCustom();});}
  return {controls:()=>st.round?[]:[{t:'Spin the Earth',go:true,fn:()=>turn(Math.PI)}],play:()=>turn(Math.PI)};};
})();
/* custom model: a picture graph of stacked discs */
(function(){const P=window.PM;if(!P||!P.K2)return;const {THREE,G,lam,mk,label}=P;const K2=P.K2;
K2.CUSTOM.graph=function(g2,st,h,set){const n=set.cats.length,sp=Math.min(1.05,4.2/n);const cols=K2.COLS;
  set.cats.forEach((c,i)=>{const x=(i-(n-1)/2)*sp;const s=K2.standee(c,{col:cols[i%cols.length],label:set.labels?set.labels[i]:c,s:.62});s.position.set(x,0,-.85);s.userData.i=i;g2.add(s);P.A.drag(s,{tap:()=>{P.A.say((set.labels?set.labels[i]:c)+': '+set.v[i]);K2.jump(s);}});
    for(let k=0;k<set.v[i];k++){const d=mk(G('k2disc',()=>new THREE.CylinderGeometry(.17,.17,.06,24)),lam(cols[i%cols.length]),0);d.rotation.x=Math.PI/2;d.position.set(x,.2,-1.45-k*.21);g2.add(d);}
    const L=label(String(set.v[i]),{size:.22,bg:'#ffffff'});L.position.set(x,.45,-1.45-set.v[i]*.21-.05);g2.add(L);});
  return {};};
})();
