/* Real 3D models (Kenney, CC0) for the JK book: loaded once, sized to match the hand-built model they replace,
   and used only in the lessons listed in BOOK.glbLessons. */
(function(){const P=window.PM;if(!P||!window.THREE||!THREE.GLTFLoader)return;const B=window.BOOK||{};const list=B.glb||{};
  P.GLBM={};const cache={},ref={};const ld=new THREE.GLTFLoader();
  const refDim=k=>{if(ref[k]!=null)return ref[k];let d=1;try{if(P.LUXM&&P.LUXM[k]){const o=P.LUXM[k](1);const b=new THREE.Box3().setFromObject(o);const s=b.getSize(new THREE.Vector3());d=Math.max(s.x,s.y,s.z)||1;}}catch(e){}return ref[k]=d;};
  Object.keys(list).forEach(k=>ld.load('models/'+list[k],g=>{const sc=g.scene;sc.traverse(o=>{if(o.isMesh){o.castShadow=true;o.receiveShadow=true;if(o.material&&o.material.map)o.material.map.anisotropy=4;}});cache[k]=sc;
    P.GLBM[k]=s=>{const o=cache[k].clone(true);const b=new THREE.Box3().setFromObject(o),sz=b.getSize(new THREE.Vector3()),c=b.getCenter(new THREE.Vector3());const m=Math.max(sz.x,sz.y,sz.z)||1;const f=refDim(k)*(s||1)/m;
      o.scale.setScalar(f);o.position.set(-c.x*f,-b.min.y*f,-c.z*f);const w=new THREE.Group();w.add(o);w.userData.glb=k;return w;};},undefined,e=>console.warn('model',k,e)));
  const prev=P.onSpread;P.onSpread=sp=>{P.kGlbNow=!!(sp&&sp.L&&(B.glbLessons||[]).indexOf(sp.L.id)>=0);if(prev)prev(sp);};
})();
