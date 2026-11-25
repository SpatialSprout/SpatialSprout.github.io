/* Picture scenes: a clay illustration stands up on the book like a pop-up page.
   Layers (backdrop / animal / flyer) sit at slightly different depths so the page parallaxes and pops out,
   the edges melt into the paper, and each layer can be animated by the story. */
(function(){
"use strict";
const P=window.PM;if(!P||!P.DIO)return;
const {tween,THREE,V}=P;const TL=new THREE.TextureLoader();
const cache={};const tex=n=>cache[n]||(cache[n]=(()=>{const t=TL.load('art/'+n+'.webp');t.anisotropy=8;return t;})());
/* soft rounded-edge alpha so the picture melts into the page */
let EDGE=null;
function edge(){if(EDGE)return EDGE;const w=256,h=144,c=document.createElement('canvas');c.width=w;c.height=h;const x=c.getContext('2d'),im=x.createImageData(w,h);
  for(let j=0;j<h;j++)for(let i=0;i<w;i++){const u=i/(w-1),v=j/(h-1);const dx=Math.min(u,1-u)*w,dy=Math.min(v,1-v)*h;
    const r=26,fx=Math.min(1,dx/r),fy=Math.min(1,dy/r);let a=Math.min(fx,fy);const cx=Math.max(0,r-dx),cy=Math.max(0,r-dy);a=Math.min(a,1-Math.min(1,Math.hypot(cx,cy)/r*.8));
    const bf=Math.min(1,(1-v)*h/34);a=Math.min(a,bf);a=a*a*(3-2*a);const k=(j*w+i)*4;im.data[k]=im.data[k+1]=im.data[k+2]=Math.round(a*255);im.data[k+3]=255;}
  x.putImageData(im,0,0);EDGE=new THREE.CanvasTexture(c);return EDGE;}
const W=4.3,H=W*864/1536;
const plane=(n,w,h,ro,alpha)=>{const g=new THREE.PlaneGeometry(w,h);const m=new THREE.MeshBasicMaterial({map:tex(n),transparent:true,depthWrite:false,alphaMap:alpha?edge():null,opacity:1});
  const o=new THREE.Mesh(g,m);o.renderOrder=ro;return o;};
/* make(sc,name,meta) -> {g,bg,animal,hawk,show(),hide()} ; meta from pic-<name>.json (loaded inline below) */
function make(sc,name,meta,o){o=o||{};
  const g=new THREE.Group();g.position.set(0,.02,o.z||-1.95);g.rotation.x=o.tilt!=null?o.tilt:-.2;sc.g.add(g);
  const bg=plane('pic-'+name+'-bg',W,H,1,true);bg.position.y=H/2;g.add(bg);
  const L={g,bg};
  meta.forEach(l=>{const w=(l.x1-l.x0)*W,h=(l.y1-l.y0)*H;const m=plane('pic-'+name+'-'+l.kind,w,h,l.kind==='hawk'?3:2,false);
    m.geometry.translate(0,h/2,0);/* origin at the bottom so it can rise and squash */
    const cx=((l.x0+l.x1)/2-.5)*W,by=(1-l.y1)*H;m.position.set(cx,by,l.kind==='hawk'?.32:.1);m.userData={home:m.position.clone(),w,h};g.add(m);L[l.kind]=m;});
  L.set=v=>{[bg,L.animal,L.hawk].forEach(m=>{if(m)m.material.opacity=v;});};
  L.set(0);g.visible=false;return L;}
function fade(L,to,dur){L.g.visible=true;const from=L.bg.material.opacity;return tween(dur||.8,k=>{const e=k*k*(3-2*k);L.set(from+(to-from)*e);}).then(()=>{if(to<=0)L.g.visible=false;});}
P.PIC={make,fade,W,H};
})();
