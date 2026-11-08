/* JK book effects (sample lessons listed in BOOK.upLessons):
   - canvas-confetti: confetti for every right answer, a big burst when the game is won
   - Tone.js: soft marimba notes instead of the plain beep, a rising scale while counting, a happy chord on a win
   - flubber: on the shapes pages a flat pastel shape morphs smoothly into the lesson's shape
   - cannon-es: real physics for the bowling game (see kk-kit C.bowl, used when P.kUpNow) */
(function(){const P=window.PM;if(!P||!P.A)return;const B=window.BOOK||{};const UP=B.upLessons||[];
  P.kUpNow=false;const prev=P.onSpread;P.onSpread=sp=>{P.kDraw=null;const id=sp&&sp.L&&sp.L.id;P.kUpNow=!!(id&&UP.indexOf(id)>=0);P.kUpId=id;if(prev)prev(sp);};
  /* sound: Tone.js starts after the first touch (browsers require it) */
  let tone=null,mar=null,started=false;const NOTES=['C5','D5','E5','G5','A5','C6','D6','E6','G6','A6'];
  const startTone=()=>{if(started||!window.Tone)return;started=true;try{Tone.start();tone=Tone;const rev=new Tone.Reverb({decay:1.6,wet:.18}).toDestination();
    mar=new Tone.PolySynth(Tone.FMSynth,{harmonicity:3.01,modulationIndex:9,oscillator:{type:'sine'},envelope:{attack:.002,decay:.35,sustain:0,release:.4},modulation:{type:'square'},modulationEnvelope:{attack:.002,decay:.2,sustain:0,release:.2}}).connect(rev);mar.volume.value=-10;}catch(e){tone=null;}};
  window.addEventListener('pointerdown',startTone,{capture:true});
  const play=(n,dur)=>{if(!mar||!P.kUpNow)return false;try{mar.triggerAttackRelease(n,dur||'16n');}catch(e){return false;}return true;};
  const op=P.A.pop;P.A.pop=function(){if(play(NOTES[Math.floor(Math.random()*5)]))return;return op&&op.apply(this,arguments);};
  P.kNote=k=>play(NOTES[Math.min(NOTES.length-1,k)],'8n');
  const chord=()=>{if(!mar||!P.kUpNow)return;const t=Tone.now();['C5','E5','G5','C6'].forEach((n,i)=>mar.triggerAttackRelease(n,'8n',t+i*.09));};
  /* confetti */
  const COLS=['#ff8787','#ffd43b','#69db7c','#74c0fc','#b197fc','#ffa8a8'];
  P.kFx=big=>{if(!P.kUpNow)return;if(window.confetti){try{if(big){confetti({particleCount:150,spread:100,startVelocity:45,origin:{y:.65},colors:COLS,scalar:1.1});setTimeout(()=>confetti({particleCount:80,angle:60,spread:70,origin:{x:0,y:.7},colors:COLS}),250);setTimeout(()=>confetti({particleCount:80,angle:120,spread:70,origin:{x:1,y:.7},colors:COLS}),400);}
    else confetti({particleCount:45,spread:60,startVelocity:30,origin:{y:.7},colors:COLS,scalar:.9,ticks:120});}catch(e){}}if(big)chord();else play('G5','8n');};
  /* flubber: a flat pastel shape morphing into the lesson's shape, lying on the page under the 3D shape */
  const SHP={circle:()=>{const p=[];for(let i=0;i<48;i++){const a=i/48*Math.PI*2;p.push([Math.cos(a),Math.sin(a)]);}return p;},square:()=>[[-.9,-.9],[.9,-.9],[.9,.9],[-.9,.9]],
    triangle:()=>[[0,1],[.98,-.75],[-.98,-.75]],rectangle:()=>[[-1.2,-.7],[1.2,-.7],[1.2,.7],[-1.2,.7]],blob:()=>{const p=[];for(let i=0;i<40;i++){const a=i/40*Math.PI*2,r=.8+.18*Math.sin(a*3)+.1*Math.cos(a*5);p.push([Math.cos(a)*r,Math.sin(a)*r]);}return p;}};
  P.kMorph=(g2,shape,col,THREE)=>{if(!window.flubber||!P.kUpNow)return null;const order=['blob','triangle','square','circle','rectangle'].filter(s=>s!==shape).slice(0,2).concat([shape]);
    const m=new THREE.Mesh(new THREE.BufferGeometry(),new THREE.MeshBasicMaterial({color:col||'#ffd8a8',transparent:true,opacity:.85,side:THREE.DoubleSide}));m.rotation.x=-Math.PI/2;m.position.set(0,.07,-2.3);m.userData.noLux=1;g2.add(m);
    const S=.85,inter=[];for(let i=0;i<order.length-1;i++)inter.push(flubber.interpolate(SHP[order[i]]().map(([x,y])=>[x*S,y*S]),SHP[order[i+1]]().map(([x,y])=>[x*S,y*S]),{string:false,maxSegmentLength:.05}));
    let t=0;const set=pts=>{const sh=new THREE.Shape(pts.map(([x,y])=>new THREE.Vector2(x,y)));m.geometry.dispose();m.geometry=new THREE.ShapeGeometry(sh);};set(SHP[order[0]]().map(([x,y])=>[x*S,y*S]));
    return dt=>{if(t>=inter.length)return;t=Math.min(inter.length,t+dt*.55);const i=Math.min(inter.length-1,Math.floor(t)),f=t>=inter.length?1:t-i;const e=f<.5?2*f*f:1-Math.pow(-2*f+2,2)/2;set(inter[i](e));};};

  /* narrator buddy: a little sprout whose mouth follows the voice, using Rhubarb lip-sync cues (window.KMOUTH) */
  const OPEN={X:.12,A:.15,B:.35,C:.6,D:.95,E:.65,F:.3,G:.28,H:.5};
  P.kNarrator=g2=>{if(!P.kUpNow||!window.THREE)return;const T=THREE,ph=(c,sh)=>new T.MeshPhysicalMaterial({color:c,roughness:.45,clearcoat:.4});const g=new T.Group();g.userData.noLux=1;
    const body=new T.Mesh(new T.SphereGeometry(.34,32,24),ph('#8ce99a'));body.scale.set(1,.92,.95);body.position.y=.34;body.castShadow=true;g.add(body);
    const leaf=(sx)=>{const l=new T.Mesh(new T.SphereGeometry(.13,20,12),ph('#51cf66'));l.scale.set(1.5,.35,.8);l.position.set(sx*.13,.72,0);l.rotation.z=-sx*.5;g.add(l);};leaf(1);leaf(-1);
    const stem=new T.Mesh(new T.CylinderGeometry(.025,.03,.12,8),ph('#40c057'));stem.position.y=.66;g.add(stem);
    const eye=x=>{const e=new T.Mesh(new T.SphereGeometry(.055,16,12),new T.MeshBasicMaterial({color:'#1b2236'}));e.position.set(x,.43,.3);g.add(e);const s2=new T.Mesh(new T.SphereGeometry(.018,8,6),new T.MeshBasicMaterial({color:'#ffffff'}));s2.position.set(x+.018,.455,.35);g.add(s2);return e;};const eL=eye(-.11),eR=eye(.11);
    const ck=x=>{const c=new T.Mesh(new T.SphereGeometry(.045,12,8),new T.MeshBasicMaterial({color:'#ffa8a8',transparent:true,opacity:.7}));c.scale.set(1.3,.7,.4);c.position.set(x,.33,.29);g.add(c);};ck(-.2);ck(.2);
    const mouth=new T.Mesh(new T.SphereGeometry(.07,20,12),new T.MeshBasicMaterial({color:'#c92a2a'}));mouth.position.set(0,.27,.31);mouth.scale.set(1,.15,.4);g.add(mouth);
    g.position.set(-2.35,0,-1.2);g.scale.setScalar(.85);g.rotation.y=.45;g2.add(g);let blink=0,cur=.12;
    mouth.onBeforeRender=()=>{const v=P.voiceNow&&P.voiceNow();let tgt=.12;if(v&&window.KMOUTH&&KMOUTH[v.h]){const cs=KMOUTH[v.h];let sh='X';for(let i=0;i<cs.length&&cs[i][0]<=v.t;i++)sh=cs[i][1];tgt=OPEN[sh]||.12;}else if(v){tgt=.15+.5*Math.abs(Math.sin(v.t*11));}
      cur+=(tgt-cur)*.5;mouth.scale.set(1+(tgt>.5?-.15:0),cur,.4);const t=performance.now()/1000;g.position.y=Math.abs(Math.sin(t*2))*.03;
      blink=(Math.sin(t*1.3)>.985)?.1:1;eL.scale.y=eR.scale.y=blink;};};
})();
