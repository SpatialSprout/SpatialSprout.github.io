/* Motion helpers for the lesson animations.
   - spring(): the closed-form damped spring from Remotion (packages/core/src/spring/spring-utils.ts),
     evaluated at any time t, so a spring looks the same at any frame rate and in a recorded film.
   - EASE: timing functions from Motion Canvas (packages/core/src/tweening/timingFunctions.ts).
   - interpolate(): Remotion-style range mapping with clamping. */
(function(){
"use strict";
/* value of a spring that starts at `from` with velocity v0 and settles at `to`, t seconds after release */
function spring(t,o){o=o||{};const from=o.from==null?0:o.from,to=o.to==null?1:o.to;const m=o.mass||1,k=o.stiffness||100,c=o.damping||10;
  if(t<=0)return from;const x0=to-from,v0=-(o.v0||0);const zeta=c/(2*Math.sqrt(k*m)),w0=Math.sqrt(k/m);
  if(zeta<1){const w1=w0*Math.sqrt(1-zeta*zeta);const env=Math.exp(-zeta*w0*t);return to-env*(Math.sin(w1*t)*((v0+zeta*w0*x0)/w1)+x0*Math.cos(w1*t));}
  return to-Math.exp(-w0*t)*(x0+(v0+w0*x0)*t);}
/* how long a spring takes to settle within `eps` of its target */
function springDur(o,eps){eps=eps||.004;const to=o&&o.to!=null?o.to:1,from=o&&o.from!=null?o.from:0,span=Math.abs(to-from)||1;let last=0;
  for(let t=0;t<8;t+=1/120){if(Math.abs(spring(t,o)-to)>eps*span)last=t;}return last+1/120;}
const PI=Math.PI;
const outBounce=(x)=>{const n=7.5625,d=2.75;if(x<1/d)return n*x*x;if(x<2/d)return n*(x-=1.5/d)*x+.75;if(x<2.5/d)return n*(x-=2.25/d)*x+.9375;return n*(x-=2.625/d)*x+.984375;};
const EASE={
  linear:x=>x,
  inSine:x=>1-Math.cos(x*PI/2),outSine:x=>Math.sin(x*PI/2),inOutSine:x=>-(Math.cos(PI*x)-1)/2,
  inQuad:x=>x*x,outQuad:x=>1-(1-x)*(1-x),inOutQuad:x=>x<.5?2*x*x:1-Math.pow(-2*x+2,2)/2,
  inCubic:x=>x*x*x,outCubic:x=>1-Math.pow(1-x,3),inOutCubic:x=>x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2,
  outQuart:x=>1-Math.pow(1-x,4),inOutQuart:x=>x<.5?8*x*x*x*x:1-Math.pow(-2*x+2,4)/2,
  outExpo:x=>x===1?1:1-Math.pow(2,-10*x),inOutExpo:x=>x===0?0:x===1?1:x<.5?Math.pow(2,20*x-10)/2:(2-Math.pow(2,-20*x+10))/2,
  outCirc:x=>Math.sqrt(1-Math.pow(x-1,2)),
  outBack:(x,s)=>{s=s==null?1.70158:s;const c3=s+1;return 1+c3*Math.pow(x-1,3)+s*Math.pow(x-1,2);},
  inBack:(x,s)=>{s=s==null?1.70158:s;return (s+1)*x*x*x-s*x*x;},
  outElastic:x=>{const c4=2.094395;return x===0?0:x===1?1:Math.pow(2,-10*x)*Math.sin((x*10-.75)*c4)+1;},
  outBounce};
function interpolate(x,inR,outR,o){o=o||{};let i=1;while(i<inR.length-1&&x>inR[i])i++;const a=inR[i-1],b=inR[i];let k=(x-a)/((b-a)||1);
  if(o.clamp!==false)k=Math.max(0,Math.min(1,k));if(o.ease)k=o.ease(k);return outR[i-1]+(outR[i]-outR[i-1])*k;}
window.MOTION={spring,springDur,EASE,interpolate};
})();
