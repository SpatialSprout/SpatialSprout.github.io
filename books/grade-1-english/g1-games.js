/* Grade 1 English: practice round shorthands. Grade 2 Science style questions (R.q, R.tf, R.word)
   plus the Kindergarten 3D games (basket, spider web, cups, hide and seek, shadow, memory, fishing, bubbles).
   Load after subject-kit.js, pk-kit.js, kk-kit.js and pk.js. ASCII only. */
(function(){
"use strict";
const P=window.PM;if(!P||!P.R)return;const R=P.R,S=P.S;
const shuffle=a=>{const b=a.slice();for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]];}return b;};
const g=(custom,o)=>Object.assign({custom},o);
/* a question answered with the big dock buttons */
R.q=(q,opts,ans,o)=>Object.assign({q,set:{},o:opts,ans},o||{});
/* the same, with pictures standing on the page */
R.qp=(q,pics,opts,ans,o)=>Object.assign({q,set:{row:[].concat(pics),keep:true},o:opts,ans},o||{});
R.tf=(q,yes,o)=>Object.assign({q:q+' *True or false?*',set:{},o:['True','False'],ans:yes?'True':'False'},o||{});
/* choose the word that fits the sentence (blocks on the page) */
R.word=(q,before,after,opts,ans,o)=>{const parts=[].concat(before?before.split(' '):[],['_'],after?after.split(' '):[]).filter(x=>x!=='');return R.fillw(q,parts,opts,ans,o);};
/* Kindergarten games: items are 'name' (a 3D prop or picture) or 'txt:word:#colour' (a 3D word); '*' marks a right one */
R.web=(q,items,o)=>({q,set:g('web',Object.assign({items:shuffle(items),corner:true},o||{}))});
R.cups=(q,target,others,o)=>({q,set:g('cups',Object.assign({target,others},o||{}))});
R.peek=(q,items,o)=>({q,set:g('peek',Object.assign({items:shuffle(items)},o||{}))});
R.shadow=(q,choices,o)=>({q,set:g('shadow',Object.assign({choices:shuffle(choices)},o||{}))});
R.mem=(q,pairs,o)=>({q,set:g('memory',Object.assign({pairs},o||{}))});
const plain=it=>{it=String(it);const ok=it[0]==='*';if(ok)it=it.slice(1);const p=it.split(':');const w=(p[0]==='txt'||p[0]==='block')?p[1]:it;return (ok?'*':'')+w;};
R.fishing=(q,items,o)=>({q,set:g('fish',Object.assign({items:shuffle(items.map(plain))},o||{}))});
R.bub=(q,items,o)=>R.pop?R.pop(q,items,o):R.tap(q,items,o);
/* a wide clay word card for the games (fits a word or a short sentence, wraps to two lines) */
const WCACHE={};
P.G1WORD=(str,col)=>{const T=P.THREE||window.THREE;str=String(str);col=col||'#4c6ef5';
  const words=str.split(' ');const lines=[];let cur='';for(const w of words){if(cur&&(cur+' '+w).length>8){lines.push(cur);cur=w;}else cur=cur?cur+' '+w:w;}if(cur)lines.push(cur);
  const c=document.createElement('canvas');const g=c.getContext('2d');let fs=str.length<=2?140:str.length<=4?96:72;const font=f=>'bold '+f+'px "Atkinson Hyperlegible", sans-serif';g.font=font(fs);
  let mw=Math.max(...lines.map(l=>g.measureText(l).width));const MAXPX=300;if(mw>MAXPX){fs=Math.floor(fs*MAXPX/mw);g.font=font(fs);mw=Math.max(...lines.map(l=>g.measureText(l).width));}
  const padX=30,lh=fs*1.15,W=Math.ceil(mw+padX*2),H=Math.ceil(lines.length*lh+fs*.7);c.width=W;c.height=H;
  g.fillStyle=col;const r=Math.min(40,H/3);g.beginPath();if(g.roundRect)g.roundRect(0,0,W,H,r);else g.rect(0,0,W,H);g.fill();
  const gr=g.createLinearGradient(0,0,0,H);gr.addColorStop(0,'rgba(255,255,255,.35)');gr.addColorStop(.4,'rgba(255,255,255,0)');gr.addColorStop(1,'rgba(0,0,0,.15)');g.fillStyle=gr;g.beginPath();if(g.roundRect)g.roundRect(0,0,W,H,r);else g.rect(0,0,W,H);g.fill();
  g.font=font(fs);g.textAlign='center';g.textBaseline='middle';lines.forEach((l,i)=>{const y=fs*.35+lh*(i+.5);g.fillStyle='rgba(0,0,0,.25)';g.fillText(l,W/2+3,y+4);g.fillStyle='#ffffff';g.fillText(l,W/2,y);});
  const k=1/360;const w=W*k,h=H*k,d=.12;const tex=new T.CanvasTexture(c);tex.anisotropy=4;
  const side=new T.MeshPhongMaterial({color:new T.Color(col).lerp(new T.Color('#1b2236'),.25),shininess:30});const front=new T.MeshPhongMaterial({map:tex,transparent:true,shininess:40});
  const geo=new T.BoxGeometry(w,h,d);geo.translate(0,h/2,0);const m=new T.Mesh(geo,[side,side,side,side,front,side]);m.castShadow=true;
  const grp=new T.Group();grp.add(m);grp.rotation.x=-.12;grp.userData.face=m;grp.userData.txt=str;return grp;};
/* card colour comes from the text itself, never from whether it is a right answer */
const HUES=['#e8505b','#2f7de1','#16a36f','#f08a24','#8b5cf6','#c2255c','#0c8599','#e8a900'];
P.G1HUE=t=>{t=String(t);if(t.length===1&&/[.?!,]/.test(t))return {'.':'#1c7ed6','?':'#7048e8','!':'#e03131',',':'#868e96'}[t];let h=0;for(let i=0;i<t.length;i++)h=(h*31+t.charCodeAt(i))>>>0;return HUES[h%HUES.length];};
/* the spoken name of a picture (clay art keys like pa-sunface say 'sun') */
const NICE={sunface:'sun',bluebook:'book',goldfish:'goldfish',alarm_clock:'clock',polar_bear:'polar bear',apple_tree:'apple tree',momwave:'mom',mombook:'mom',boycoat:'boy',windcloud:'wind',puppysleep:'puppy',teddy2:'teddy bear',tooth2:'tooth',oneband:'Mister Music',penfence:'pen',chickegg:'egg',kitecloud:'cloud',whalecloud:'cloud',shootstar:'shooting star',fishrod:'fishing rod',table21:'table',lbclosed:'lunchbox',lbopen:'lunchbox',snowfort:'snow fort',picnicbasket:'basket',laundry:'laundry basket',sled:'sled',kid0:'Kofi',kid1:'Anna',kid2:'friend',kid3:'Sara'};
P.G1LAB=k=>{let n=String(k).replace(/^pa-/,'');if(NICE[n])return NICE[n];n=n.replace(/^(leo|mia|tim|nora|milo|dad|mom|ava|sam)(wave|cheer|say|tummy|box|eat|point|think|pear|bike|look|wow|tele|wonder|sing|dance|bow|spoon|pan|book|dish|stir)$/,'$1');return n.replace(/_/g,' ').replace(/\d+$/,'');};
/* a word as a 3D block for the games */
const COL=['#e8505b','#2f7de1','#16a36f','#f08a24','#8b5cf6','#c2255c','#0c8599'];
P.G1W=(w,ok,i)=>(ok?'*':'')+'txt:'+w+':'+COL[(i==null?w.length:i)%COL.length];
})();
