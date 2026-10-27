/* The Interactive Classroom: Grade 1 Math — Units 22–23: seasons and temperature, calendar and clocks */
(function(){
"use strict";
const P=window.PM;if(!P||P.failed||!P.THREE||!P.K)return;
const {THREE,V,G,lam,mk,label,clearGroup,rr,T,wrap,header,keyWords,FT,ZS,X0,TW,INK,GREY,tint,A,hop,tween,moveTo,easeOut}=P;
const K=P.K,{rnd,pick,shuffle,choices,nearby,words,toy,lay,tag,mat,icon,icons,tbox,exGrid,bigText,hand,sub,nm,bx,cyl,sph,at,cone}=K;
const acc=()=>P.ACC;

/* =========================================================
   Unit 22 · Seasons and temperature
   ========================================================= */
const SEASONS=['spring','summer','fall','winter'];
const SINFO={spring:{leaf:'#f8bbd0',ground:'#a5d6a7',sky:'cool to warm',tool:'seeds',t:12},summer:{leaf:'#43a047',ground:'#9ccc65',sky:'hot and sunny',tool:'pail and shovel',t:28},fall:{leaf:'#fb8c00',ground:'#d7ccc8',sky:'cool to cold',tool:'rake',t:9},winter:{leaf:null,ground:'#ffffff',sky:'cold and snowy',tool:'snow shovel',t:-2}};
function tree(season){const g=new THREE.Group();const trunk=cyl(.07,.1,.7,'#8d6e63',10);trunk.position.y=.35;g.add(trunk);const L=SINFO[season].leaf;
  if(L){[[0,.95,0,.38],[.22,.8,.1,.26],[-.22,.82,-.05,.27]].forEach(([x,y,z,r])=>{const s=sph(r,L);s.position.set(x,y,z);g.add(s);});}
  else{[[.18,.75,.6],[-.16,.7,-.7]].forEach(([x,y,r])=>{const b=cyl(.025,.03,.4,'#8d6e63',6);b.position.set(x,y,0);b.rotation.z=r;g.add(b);});const sn=sph(.12,'#ffffff');sn.scale.y=.4;sn.position.y=.72;g.add(sn);}
  if(season==='spring')[[.2,1.1,.25],[-.25,.95,.2],[.05,1.25,.1]].forEach(([x,y,z])=>{const f=sph(.05,'#ffffff');f.position.set(x,y,z);g.add(f);});
  if(season==='fall')[[.35,.1,.2],[-.3,.05,.3],[.1,.04,.4]].forEach(([x,y,z])=>{const f=sph(.05,'#fb8c00');f.scale.y=.3;f.position.set(x,y,z);g.add(f);});return g;}
function diorama(season,extra){const g=new THREE.Group();const base=cyl(.62,.62,.06,SINFO[season].ground,32);base.position.y=.03;g.add(base);const t=tree(season);t.position.set(-.15,.06,-.1);g.add(t);
  if(season==='summer'){const s=sph(.13,'#ffeb3b');s.position.set(.42,1.3,0);g.add(s);}if(season==='winter'){const a=sph(.16,'#fff'),b=sph(.11,'#fff');a.position.set(.33,.2,.2);b.position.set(.33,.44,.2);g.add(a,b);const h=cyl(.07,.07,.08,INK,12);h.position.set(.33,.58,.2);g.add(h);}
  if(season==='spring'){const f=toy('flower',{s:.8});f.position.set(.35,.06,.25);g.add(f);}if(season==='fall'){const a=toy('acorn',{s:.9});a.position.set(.35,.06,.25);g.add(a);}g.userData.season=season;return g;}
function thermo(grp,temp){const g=new THREE.Group();grp.add(g);const tube=new THREE.Mesh(new THREE.CylinderGeometry(.09,.09,2.0,20),new THREE.MeshLambertMaterial({color:'#ffffff',transparent:true,opacity:.55}));tube.position.y=1.1;g.add(tube);
  const bulb=sph(.17,'#e53935');bulb.position.y=.12;g.add(bulb);const lv=Math.max(0,Math.min(30,temp));const hgt=.1+lv/30*1.75;const liq=cyl(.055,.055,hgt,'#e53935',14);liq.position.y=.2+hgt/2;g.add(liq);
  for(let v=0;v<=30;v+=5){const tk=bx(.14,.015,.02,INK,0);tk.position.set(.16,.25+v/30*1.75,0);g.add(tk);const L=tag(String(v),{size:.13,bg:null});L.position.set(.38,.25+v/30*1.75,0);g.add(L);}
  for(let v=0;v<=30;v++){if(v%5){const tk=bx(.07,.01,.02,'#90a4ae',0);tk.position.set(.13,.25+v/30*1.75,0);g.add(tk);}}const c=tag('°C',{size:.18,bg:null});c.position.set(0,2.3,0);g.add(c);return g;}
const tWord=t=>t<=10?'cold':t<=20?'mild':'hot';
P.lesson({id:'temp1',title:'Seasons and temperature',strand:'Spatial Sense',codes:['E2.1','D1.1'],
 guide:{goal:'Name the four seasons in order and what they are like, use words to describe the weather, and read temperatures in degrees Celsius on a thermometer.',words:'spring, summer, fall, winter, season, weather, temperature, thermometer, degrees Celsius, °C, hot, mild, cold, warmer, colder',
  ask:['Which season comes after winter?','What do you wear when it is 5 °C?','When the red line goes up, is it getting warmer or colder?'],home:'Look at the weather on a phone or the news each morning for a week. Was it hot, mild or cold?'},
 learn:[{say:'Four seasons in a year.',speech:'Watch the tree through the year. Spring, summer, fall and winter. Then spring comes again!',view:'model',demo:'year'}],
 fig:'The same tree in four seasons, and a thermometer.',rz:.45,
 explore:['Press *Seasons* to see the year.','Press *Thermometer*, then *warmer* or *colder*.','*Tap* a season to hear about it.'],
 howTo:'Tap the right season, read the thermometer, or set the temperature.',
 init:k=>({view:'seasons',order:SEASONS.slice(),temp:20,ask:null}),
 left(p,S){const g=p.g;let y=header(p,S);
  y=tbox(p,y-10,300,'The four seasons');
  const tr=(x,yy,s)=>{g.fillStyle='#8d6e63';g.fillRect(x-5,yy,10,50);const L=SINFO[s].leaf;if(L){K.ell(g,x,yy-10,34,30,L);}else{K.line(g,[x,yy+10,x+20,yy-14],'#8d6e63',4);K.line(g,[x,yy+10,x-20,yy-12],'#8d6e63',4);}};
  SEASONS.forEach((s,i)=>{const x=X0+100+i*205;K.ell(g,x,y+120,70,12,SINFO[s].ground);g.strokeStyle='#c9cfdc';g.lineWidth=1;g.stroke();tr(x,y+70,s);if(s==='summer')K.ell(g,x+50,y+20,16,16,'#ffd600');
    T(g,(i+1)+'. '+s,x,y+170,FT.bodyB,acc(),'center');T(g,SINFO[s].sky,x,y+204,FT.small,INK,'center');if(i<3)T(g,'→',x+102,y+100,ZS(30),GREY,'center');});y+=250;
  y=tbox(p,y,300,'Temperature: degrees Celsius (°C)');
  const th=(x,yy,v)=>{rr(g,x,yy,22,180,11);g.fillStyle='#fff';g.fill();g.strokeStyle=INK;g.lineWidth=2;g.stroke();K.ell(g,x+11,yy+190,20,20,'#e53935');const h=v/30*160;g.fillStyle='#e53935';g.fillRect(x+6,yy+176-h,10,h+10);
    for(let t=0;t<=30;t+=5){g.fillStyle=INK;g.fillRect(x+24,yy+176-t/30*160,10,2);T(g,String(t),x+40,yy+182-t/30*160,'400 16px "Atkinson Hyperlegible", sans-serif',INK);}};
  th(X0+50,y-20,25);T(g,'25 °C: hot',X0+40,y+226,FT.bodyB,'#e53935');th(X0+230,y-20,5);T(g,'5 °C: cold',X0+222,y+226,FT.bodyB,'#2f7de1');
  wrap(g,'When the red line goes *up*, it is getting *warmer*. When it goes *down*, it is getting *colder*.',X0+420,y+10,TW-430,34,{font:FT.body,bold:FT.bodyB,boldColor:acc()});
  T(g,'0–10 cold · 11–20 mild · 21–30 hot',X0+420,y+180,FT.smallB,INK);y+=250;
  y=exGrid(p,y,2,140,(i,x,yy,w,h)=>{
    if(i===0){T(g,'Snow day? Wear a…',x+56,yy+34,FT.smallB);icon(g,'mitten',x+90,yy+96,64,'#5c6bc0');hand(g,'warm coat and mittens',x+140,yy+108,acc());}
    if(i===1){wrap(g,'It was 18 °C. Today it is 4 degrees warmer.',x+56,yy+40,w-80,30,{font:FT.small,bold:FT.smallB});hand(g,'18 + 4 = 22 °C',x+56,yy+120,acc());}
  });
  y=keyWords(p,y,[['temperature','how hot or cold something is'],['°C','degrees Celsius, the unit we use for temperature in Canada']]);return y;},
 readout(p,S,y){const g=p.g,st=S.st;if(st.view==='thermo'){T(g,st.temp+' °C  ·  '+tWord(st.temp),X0,y+56,ZS(52),acc());}else if(st.sel)T(g,st.sel+': '+SINFO[st.sel].sky,X0,y+52,ZS(40),acc());return y+70;},
 build(S,grp,mode,game){const st=S.st;const g2=K.stage(grp);
  function draw(){clearGroup(g2);
    if(st.view==='seasons'){st.order.forEach((s,i)=>{const d=diorama(s);d.scale.setScalar(.95);d.position.set((i-1.5)*1.1,0,-1.9);g2.add(d);K.tapOn(d,()=>tap(s,i));const L=tag(st.hideNames?'ABCD'[i]:s,{size:.2});L.position.set(0,1.5,0);d.add(L);
      if(st.ord&&st.ord.includes(i)){const b=tag(String(st.ord.indexOf(i)+1),{size:.24,bg:'#ffd54f',border:'#e09b00'});b.position.set(.45,1.35,0);d.add(b);}});}
    else{const th=thermo(g2,st.temp);th.position.set(-.3,0,-2.2);th.scale.setScalar(1.05);const big=tag(st.temp+' °C',{size:.34,border:acc()});big.position.set(1.3,1.6,-2.2);g2.add(big);
      const cl=st.temp<=10?['mitten','#5c6bc0']:st.temp<=20?['kite','#26a69a']:['ball','#ef5350'];const t=toy(cl[0],{s:1.6,c:cl[1]});t.position.set(1.3,0,-1.7);g2.add(t);}
    A.redraw();}
  function tap(s,i){A.pop();st.sel=s;A.say(s);A.redraw();if(mode==='play'&&!st.setup){if(st.ord){if(st.ord.includes(i))return;st.ord.push(i);draw();if(st.ord.length===4){const ok=st.ord.every((k,j)=>st.order[k]===SEASONS[j]);if(ok)game.solved('Yes! Spring, summer, fall, winter.');else{A.bad('Start with spring. Then what comes next?');st.ord=[];A.later(draw,700);}}return;}
    if(st.want){if(st.want(s))game.solved(st.wantOk);else A.bad('Think about the weather in each season.');}}}
  function setT(d){const v=st.temp+d;if(v<0||v>30){A.bad('This thermometer shows 0 to 30 °C.');return;}st.temp=v;A.pop();draw();A.say(v+' degrees');if(mode==='play'&&!st.setup&&st.needT!=null&&st.temp===st.needT)A.later(()=>game.solved('Yes! '+st.needT+' degrees Celsius.'),400);}
  draw();
  return {info:()=>st.view+st.temp+st.order.join()+(st.ord||[]).join(),
    controls:()=>{const c=st.view==='thermo'?[{t:'warmer +1',fn:()=>setT(1)},{t:'colder −1',fn:()=>setT(-1)},{t:'+5',fn:()=>setT(5)},{t:'−5',fn:()=>setT(-5)},{t:'Seasons',fn:()=>{st.view='seasons';st.order=SEASONS.slice();st.hideNames=false;draw();}}]
      :[{t:'Thermometer',go:true,fn:()=>{st.view='thermo';draw();}},{t:'Mix up',fn:()=>{st.order=shuffle(SEASONS);draw();}}];
      if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);return c;},
    demo(n){st.ask=null;st.want=null;st.needT=null;st.ord=null;st.hideNames=false;
      if(n==='year'){st.view='seasons';st.order=SEASONS.slice();draw();A.seq(SEASONS.map(s=>[900,()=>{st.sel=s;A.say(s);A.redraw();}]));}
      if(n==='seasons'){st.view='seasons';st.order=SEASONS.slice();st.sel=null;draw();}
      if(/^t\d+$/.test(n)){st.view='thermo';st.temp=+n.slice(1);draw();}
      if(n==='up'){st.view='thermo';st.temp=10;draw();A.seq([...Array(15)].map(()=>[120,()=>setT(1)]));}},
    task(r){st.setup=true;st.ask=null;st.want=null;st.needT=null;st.ord=null;st.hideNames=false;st.sel=null;let txt;
      if(r===0){st.view='seasons';st.order=shuffle(SEASONS);st.hideNames=true;st.ord=[];txt='Tap the seasons in order, starting with *spring*.';}
      else if(r===1){st.view='seasons';st.order=shuffle(SEASONS);const q=pick([['rake the leaves','fall'],['build a snowman','winter'],['plant seeds','spring'],['swim at the beach','summer'],['wear a warm coat and mittens','winter'],['see the leaves change colour','fall']]);st.want=s=>s===q[1];st.wantOk='Yes! We '+q[0]+' in '+q[1]+'.';txt='In which season do we *'+q[0]+'*? Tap it.';}
      else if(r===2){st.view='thermo';st.temp=pick([5,10,15,20,25,30]);st.ask={o:shuffle([st.temp,st.temp>=10?st.temp-5:st.temp+10,st.temp<=25?st.temp+5:st.temp-10]).map(v=>v+' °C'),ans:st.temp+' °C',ok:'Yes! It shows '+st.temp+' degrees Celsius.'};const keep=st.temp;st.temp=keep;txt='Read the thermometer. What is the temperature?';}
      else if(r===3){st.view='thermo';st.temp=pick([2,6,14,18,24,29]);st.ask={o:['cold','mild','hot'],ans:tWord(st.temp),ok:'Yes! '+st.temp+' °C is '+tWord(st.temp)+'.'};txt='Is *'+st.temp+' °C* cold, mild or hot?';}
      else{const a=rnd(12,22),d=rnd(2,5),up=pick([true,false]);st.view='thermo';st.temp=a;st.needT=up?a+d:a-d;txt='Yesterday it was *'+a+' °C*. Today it is *'+d+' degrees '+(up?'warmer':'colder')+'*. Set the thermometer to today.';}
      draw();st.setup=false;return txt;}};}
});

/* =========================================================
   Unit 23 · Days, weeks, months and time
   ========================================================= */
const DAYS=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const MONTHS=['January','February','March','April','May','June','July','August','September','October','November','December'];
/* our month: 30 days that start on a Wednesday, with two special days */
const CAL={name:'June',start:3,days:30,ev:{12:'Sports Day',20:'Gran’s birthday',27:'Picnic'}};
function calTex(sel,blank){const cv=document.createElement('canvas');cv.width=840;cv.height=720;const g=cv.getContext('2d');g.fillStyle='#ffffff';g.fillRect(0,0,840,720);g.fillStyle=P.ACC;g.fillRect(0,0,840,90);
  g.fillStyle='#fff';g.font='700 56px "Zilla Slab", Georgia, serif';g.textAlign='center';g.textBaseline='middle';g.fillText(CAL.name,420,48);
  DAYS.forEach((d,i)=>{g.fillStyle=INK;g.font='700 30px "Atkinson Hyperlegible", sans-serif';g.fillText(d.slice(0,3),60+i*120,120);});
  for(let d=1;d<=CAL.days;d++){const k=CAL.start+d-1,c=k%7,r=Math.floor(k/7),x=c*120,y=145+r*112;g.fillStyle=sel===d?'#ffe08a':CAL.ev[d]?'#e8f5e9':'#fafafa';g.fillRect(x+4,y+4,112,104);g.strokeStyle='#d6dae6';g.lineWidth=2;g.strokeRect(x+4,y+4,112,104);
    if(blank&&blank.includes(d)){g.strokeStyle='#e09b00';g.setLineDash([8,6]);g.strokeRect(x+20,y+20,80,72);g.setLineDash([]);continue;}g.fillStyle=INK;g.font='700 40px "Zilla Slab", Georgia, serif';g.fillText(String(d),x+60,y+44);
    if(CAL.ev[d]){g.fillStyle='#2e7d32';g.font='700 17px "Atkinson Hyperlegible", sans-serif';g.fillText(CAL.ev[d].split(' ')[0],x+60,y+86);}}
  const t=new THREE.CanvasTexture(cv);t.anisotropy=4;return t;}
function clock(grp,h,m){const g=new THREE.Group();grp.add(g);const face=cyl(1.0,1.0,.08,'#ffffff',48);face.rotation.x=Math.PI/2;g.add(face);const rim=mk(G('k_rim',()=>new THREE.TorusGeometry(1.0,.06,10,48)),lam(P.ACC),0);g.add(rim);
  for(let i=1;i<=12;i++){const a=Math.PI/2-i*Math.PI/6;const L=tag(String(i),{size:.2,bg:null});L.position.set(Math.cos(a)*.78,Math.sin(a)*.78,.07);g.add(L);}
  for(let i=0;i<60;i++){if(i%5)continue;const a=Math.PI/2-i*Math.PI/30;const tk=bx(.03,.09,.02,INK,0);tk.position.set(Math.cos(a)*.93,Math.sin(a)*.93,.05);tk.rotation.z=a-Math.PI/2;g.add(tk);}
  const ha=-(((h%12)+m/60)*Math.PI/6),ma=-(m*Math.PI/30);const hh=new THREE.Group();hh.rotation.z=ha;hh.position.z=.07;g.add(hh);const hb=bx(.08,.5,.03,'#e53935',0);hb.position.y=.25;hh.add(hb);
  const mh=new THREE.Group();mh.rotation.z=ma;mh.position.z=.09;g.add(mh);const mb=bx(.05,.78,.03,'#1e88e5',0);mb.position.y=.39;mh.add(mb);const pin=sph(.06,INK);pin.position.z=.1;g.add(pin);return g;}
const tStr=(h,m)=>h+':'+(m<10?'0':'')+m,tSay=(h,m)=>m===0?h+' o’clock':m===30?'half past '+h:tStr(h,m);
function clock2d(g,x,y,r,h,m){g.beginPath();g.arc(x,y,r,0,7);g.fillStyle='#fff';g.fill();g.strokeStyle=P.ACC;g.lineWidth=5;g.stroke();for(let i=1;i<=12;i++){const a=-Math.PI/2+i*Math.PI/6;T(g,String(i),x+Math.cos(a)*r*.78,y+Math.sin(a)*r*.78+6,'700 '+Math.round(r*.22)+'px "Zilla Slab", serif',INK,'center');}
  const ha=-Math.PI/2+((h%12)+m/60)*Math.PI/6,ma=-Math.PI/2+m*Math.PI/30;K.line(g,[x,y,x+Math.cos(ha)*r*.5,y+Math.sin(ha)*r*.5],'#e53935',6);K.line(g,[x,y,x+Math.cos(ma)*r*.8,y+Math.sin(ma)*r*.8],'#1e88e5',4);}
P.lesson({id:'time1',title:'Days, months and clocks',strand:'Spatial Sense',codes:['E2.3','E2.4'],
 guide:{goal:'Name the days of the week and the months of the year in order, read a calendar, and read and show time to the hour and half-hour on a clock.',words:'day, week, month, year, calendar, date, yesterday, today, tomorrow, clock, hour hand, minute hand, o’clock, half past, nearly, a little after',
  ask:['What day comes after Friday?','How many days are in a week?','Where is the long hand at half past 3?'],home:'Find your birthday on a calendar. Look at a clock at bedtime: is it about 8 o’clock?'},
 learn:[{say:'Half past 8',speech:'The long hand is the minute hand. The short hand is the hour hand. At half past eight, the long hand points to six, and the short hand is halfway between eight and nine.',view:'model',demo:'half8'}],
 fig:'A calendar for June and a clock with an hour hand and a minute hand.',rz:.45,
 explore:['Press *+ half hour* or *+ 1 hour* to move the clock.','Press *Calendar* and *tap* a date.','Listen for the day of the week!'],
 howTo:'Read the clock or the calendar and tap the answer, or move the clock hands to the time.',
 init:k=>({view:'clock',h:8,m:30,sel:null,ask:null}),rz:.8,
 left(p,S){const g=p.g;let y=header(p,S);
  y=tbox(p,y-10,220,'Days and months');
  DAYS.forEach((d,i)=>{rr(g,X0+28+i*112,y,104,40,10);g.fillStyle=i===0||i===6?tint('#ffc04d',.4):'#ffffff';g.fill();T(g,d.slice(0,3),X0+80+i*112,y+28,FT.smallB,INK,'center');});T(g,'7 days in a week',X0+28,y+76,FT.bodyB,acc());
  MONTHS.forEach((mo,i)=>T(g,(i+1)+' '+mo.slice(0,3),X0+28+(i%6)*136,y+112+Math.floor(i/6)*34,FT.small,INK));y+=200;
  y=tbox(p,y,280,'Reading a clock');
  clock2d(g,X0+120,y+90,90,8,30);wrap(g,'The *long* hand is the *minute hand*. The *short* hand is the *hour hand*.',X0+250,y+10,TW-260,34,{font:FT.body,bold:FT.bodyB,boldColor:acc()});
  hand(g,'Half past 8 = 8:30',X0+250,y+120,'#1e88e5');wrap(g,'The long hand points to *6*; the short hand is between *8 and 9*.',X0+250,y+150,TW-260,30,{font:FT.small,bold:FT.smallB});y+=230;
  y=exGrid(p,y,4,150,(i,x,yy,w,h)=>{
    if(i===0){clock2d(g,x+90,yy+80,58,3,0);hand(g,'3 o’clock',x+170,yy+70,INK);hand(g,'3:00',x+170,yy+112,acc());}
    if(i===1){clock2d(g,x+90,yy+80,58,6,30);hand(g,'half past 6',x+170,yy+70,INK);hand(g,'6:30',x+170,yy+112,acc());}
    if(i===2){clock2d(g,x+90,yy+80,58,4,55);hand(g,'nearly 5 o’clock',x+170,yy+90,INK);}
    if(i===3){wrap(g,'June 1 is a Wednesday. What day is June 3?',x+56,yy+40,w-80,30,{font:FT.small,bold:FT.smallB});hand(g,'Friday',x+56,yy+126,acc());}
  });
  y=keyWords(p,y,[['calendar','a chart of the days, weeks and months'],['half past','30 minutes after the hour']]);return y;},
 readout(p,S,y){const g=p.g,st=S.st;let s='';if(st.view==='clock')s=tSay(st.h,st.m)+'  ·  '+tStr(st.h,st.m);if(st.view==='cal'&&st.sel){const k=CAL.start+st.sel-1;s=DAYS[k%7]+', '+CAL.name+' '+st.sel+(CAL.ev[st.sel]?': '+CAL.ev[st.sel]:'');}
  if(s)T(g,s,X0,y+54,ZS(40),acc());return y+70;},
 build(S,grp,mode,game){const st=S.st;const g2=K.stage(grp,.8);
  function draw(){clearGroup(g2);
    if(st.view==='clock'){const c=clock(g2,st.h,st.m);c.position.set(0,.5,-1.9);c.rotation.x=-1.15;const L=tag(tStr(st.h,st.m),{size:.32,border:acc()});L.position.set(1.65,.5,-1.9);if(!st.hideDigits)g2.add(L);}
    else if(st.view==='cal'){const side=lam('#e2e8f0');const b=mk(new THREE.BoxGeometry(3.6,.05,3.08),[side,side,new THREE.MeshLambertMaterial({map:calTex(st.sel,st.blank)}),side,side,side],20);b.position.set(0,.03,-1.75);g2.add(b);
      for(let d=1;d<=CAL.days;d++){const k=CAL.start+d-1,c=k%7,r=Math.floor(k/7);const h=mk(G('k_calhit',()=>new THREE.BoxGeometry(.48,.02,.44)),new THREE.MeshBasicMaterial({transparent:true,opacity:0,depthWrite:false}),0);h.position.set(-1.8+(c+.5)*(3.6/7),.07,-1.75-1.54+(145+r*112+56)/720*3.08);g2.add(h);K.tapOn(h,()=>tapD(d));}}
    else{const list=st.list;list.forEach((t,i)=>{const L=tag(t,{size:.24,bg:st.lit&&st.lit.includes(i)?'#ffe08a':'#ffffff',border:acc()});L.position.set(((i%4)-1.5)*1.1,.3+Math.floor(i/4)*0,-2.6+Math.floor(i/4)*.6);g2.add(L);});}
    A.redraw();}
  function tapD(d){A.pop();st.sel=d;const k=CAL.start+d-1;A.say(DAYS[k%7]+', June '+d);draw();if(mode==='play'&&!st.setup&&st.wantD!=null){if(d===st.wantD)game.solved(st.okD);else A.bad(st.hintD||'Look at the calendar again.');}}
  function step(dm){let t=st.h*60+st.m+dm;t=((t-60)%720+720)%720+60;st.h=Math.floor(t/60);st.m=t%60;if(st.h>12)st.h-=12;A.pop();draw();A.say(tSay(st.h,st.m));if(mode==='play'&&!st.setup&&st.needT&&st.h===st.needT[0]&&st.m===st.needT[1])A.later(()=>game.solved('Yes! '+tSay(st.h,st.m)+'.'),400);}
  draw();
  return {info:()=>st.view+st.h+':'+st.m+(st.sel||''),
    controls:()=>{const c=st.view==='clock'?[{t:'+ half hour',go:true,fn:()=>step(30)},{t:'+ 1 hour',fn:()=>step(60)},{t:'− 1 hour',fn:()=>step(-60)},{t:'Calendar',fn:()=>{st.view='cal';st.sel=null;st.blank=null;draw();}}]:[{t:'Clock',fn:()=>{st.view='clock';draw();}}];
      if(mode==='play'&&st.ask)return choices(st.setup?null:game,st.ask.o,st.ask.ans,st.ask.ok).concat(c);return c;},
    demo(n){st.ask=null;st.wantD=null;st.needT=null;st.hideDigits=false;
      if(n==='half8'){st.view='clock';st.h=8;st.m=0;draw();A.seq([[900,()=>step(30)]]);}if(n==='h830'){st.view='clock';st.h=8;st.m=30;draw();}
      if(n==='h3'){st.view='clock';st.h=3;st.m=0;draw();}if(n==='h630'){st.view='clock';st.h=6;st.m=30;draw();}
      if(n==='cal'){st.view='cal';st.sel=null;st.blank=null;draw();}if(n==='cal1'){st.view='cal';st.sel=1;st.blank=null;draw();}if(n==='cal3'){st.view='cal';st.sel=3;st.blank=null;draw();}
      if(n==='days'){st.view='list';st.list=DAYS.slice();st.lit=null;draw();}},
    task(r){st.setup=true;st.ask=null;st.wantD=null;st.needT=null;st.hideDigits=false;st.sel=null;st.blank=null;let txt;
      if(r===0){const i=rnd(0,6),after=pick([true,false]);const ans=DAYS[(i+(after?1:6))%7];st.view='list';st.list=DAYS.slice();st.lit=[i];st.ask={o:shuffle([ans,DAYS[(i+(after?6:1))%7],DAYS[(i+3)%7]]),ans,ok:'Yes! '+ans+' comes '+(after?'after':'before')+' '+DAYS[i]+'.'};txt='What day comes *'+(after?'after':'before')+' '+DAYS[i]+'*?';}
      else if(r===1){const i=rnd(0,10);st.view='list';st.list=MONTHS.slice(i,i+2).concat(['?']);st.lit=null;const ans=MONTHS[i+2>11?(i+2)%12:i+2];st.ask={o:shuffle([ans,MONTHS[(i+3)%12],MONTHS[(i+5)%12]]),ans,ok:'Yes! '+ans+'.'};txt='Which month comes next: *'+MONTHS[i]+', '+MONTHS[(i+1)%12]+', ___*?';}
      else if(r===2){st.view='cal';const q=pick(['first','event','before','week']);
        if(q==='first'){const ans=DAYS[CAL.start];st.ask={o:shuffle([ans,DAYS[(CAL.start+1)%7],DAYS[(CAL.start+6)%7]]),ans,ok:'Yes! June 1 is a '+ans+'.'};txt='What *day of the week* is June 1?';}
        else if(q==='event'){const d=pick(Object.keys(CAL.ev)).valueOf();st.wantD=+d;st.okD='Yes! '+CAL.ev[d]+' is on June '+d+'.';txt='Tap the date of *'+CAL.ev[d]+'*.';}
        else if(q==='before'){const d=20;st.wantD=d-2;st.okD='Yes! June '+(d-2)+' is 2 days before Gran’s birthday.';st.hintD='Find Gran’s birthday, then count back 2 days.';txt='We will make a card *2 days before* Gran’s birthday. Tap that date.';}
        else{const d=rnd(2,20);st.sel=d;st.wantD=d+7;st.okD='Yes! One week later is June '+(d+7)+'.';st.hintD='A week is 7 days. Count on 7.';txt='Tap the date that is *one week after* June '+d+'.';}}
      else if(r===3){st.view='clock';st.h=rnd(1,12);st.m=pick([0,30]);st.hideDigits=true;const right=tSay(st.h,st.m);const wrong1=st.m?st.h+' o’clock':'half past '+st.h,wrong2=st.m?'half past '+(st.h%12+1):(st.h%12+1)+' o’clock';st.ask={o:shuffle([right,wrong1,wrong2]),ans:right,ok:'Yes! It is '+right+': '+tStr(st.h,st.m)+'.'};txt='What time is it?';}
      else{st.view='clock';st.h=rnd(1,12);st.m=0;let h=rnd(1,12),m=pick([0,30]);if(h===st.h&&m===0)h=h%12+1;st.needT=[h,m];txt='Move the hands to *'+tSay(h,m)+'* ('+tStr(h,m)+').';}
      draw();st.setup=false;return txt;}};}
});
})();
