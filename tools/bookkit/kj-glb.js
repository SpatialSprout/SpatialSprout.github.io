/* Real 3D models (Kenney and Quaternius, both CC0) for the JK book.
   Each model is loaded compressed (gltfpack + MeshoptDecoder), its colours are taken from its texture and softened
   toward pastel, it is smoothed with Loop subdivision (three-subdivide) and given the book's soft glossy material,
   so it matches the chubby hand-built models. Used only in the lessons listed in BOOK.glbLessons. */
(function(){const P=window.PM;if(!P||!window.THREE||!THREE.GLTFLoader)return;const B=window.BOOK||{};const list=B.glb||{};
  P.GLBM={};const cache={},ref={};const ld=new THREE.GLTFLoader();if(window.MeshoptDecoder&&ld.setMeshoptDecoder)ld.setMeshoptDecoder(MeshoptDecoder);
  const refDim=k=>{if(ref[k]!=null)return ref[k];let d=1;try{if(P.LUXM&&P.LUXM[k]){const o=P.LUXM[k](1);const b=new THREE.Box3().setFromObject(o);const s=b.getSize(new THREE.Vector3());d=Math.max(s.x,s.y,s.z)||1;}}catch(e){}return ref[k]=d;};
  const PASTEL=.22,white=new THREE.Color(1,1,1);
  const TR=new WeakMap();const texReader=img=>{if(TR.has(img))return TR.get(img);const r=texRead0(img);try{TR.set(img,r);}catch(e){}return r;};
  const texRead0=img=>{try{const c=document.createElement('canvas');c.width=img.width;c.height=img.height;const g=c.getContext('2d',{willReadFrequently:true});g.drawImage(img,0,0);const d=g.getImageData(0,0,c.width,c.height).data;
    return (u,v)=>{const x=Math.min(c.width-1,Math.max(0,Math.floor(((u%1)+1)%1*c.width))),y=Math.min(c.height-1,Math.max(0,Math.floor(((v%1)+1)%1*c.height)));const i=(y*c.width+x)*4;return [d[i]/255,d[i+1]/255,d[i+2]/255];};}catch(e){return null;}};
  function soften(mesh){let g=mesh.geometry;const m=Array.isArray(mesh.material)?mesh.material[0]:mesh.material;if(!g||!g.attributes.position)return;
    g=g.index?g.toNonIndexed():g.clone();
    /* compressed models store points as packed integers; turn every attribute into plain floats before smoothing */
    Object.keys(g.attributes).forEach(k=>{const a=g.attributes[k];if(a.array instanceof Float32Array&&!a.normalized&&!a.isInterleavedBufferAttribute)return;const n2=a.count,sz=a.itemSize,f=new Float32Array(n2*sz);
      for(let i=0;i<n2;i++){f[i*sz]=a.getX(i);if(sz>1)f[i*sz+1]=a.getY(i);if(sz>2)f[i*sz+2]=a.getZ(i);if(sz>3)f[i*sz+3]=a.getW(i);}g.setAttribute(k,new THREE.BufferAttribute(f,sz));});const n=g.attributes.position.count,col=new Float32Array(n*3),uv=g.attributes.uv,base=(m&&m.color)?m.color.clone():new THREE.Color(1,1,1);
    const rd=m&&m.map&&m.map.image?texReader(m.map.image):null;if(m&&m.map&&!rd)console.warn('model texture unreadable');const lin=new THREE.Color();
    for(let i=0;i<n;i++){if(rd&&uv){const [r,gg,b]=rd(uv.getX(i),m.map.flipY===false?uv.getY(i):1-uv.getY(i));lin.setRGB(r,gg,b).convertSRGBToLinear().multiply(base);}else lin.copy(base);
      lin.lerp(white,PASTEL);col[i*3]=lin.r;col[i*3+1]=lin.g;col[i*3+2]=lin.b;}
    g.setAttribute('color',new THREE.BufferAttribute(col,3));g.deleteAttribute('uv');if(g.attributes.uv2)g.deleteAttribute('uv2');
    let sm=g;try{if(window.LoopSubdivision){const it=n<1500?2:(n<9000?1:0);if(it)sm=LoopSubdivision.modify(g,it,{split:false,uvSmooth:false,preserveEdges:false,flatOnly:false,maxTriangles:60000});}}catch(e){sm=g;}
    sm.computeVertexNormals();mesh.geometry=sm;
    /* three-mesh-bvh: fast, exact taps on these detailed meshes */
    if(window.MeshBVHLib){try{MeshBVHLib.computeBoundsTree.call(sm);mesh.raycast=MeshBVHLib.acceleratedRaycast;}catch(e){}}
    mesh.material=new THREE.MeshPhysicalMaterial({vertexColors:true,roughness:.5,metalness:0,clearcoat:.35,clearcoatRoughness:.4});mesh.castShadow=true;mesh.receiveShadow=true;}
  /* animated (rigged) models are frozen in their standing pose, so they can be smoothed like the rest */
  const unskin=sc=>{const sk=[];sc.traverse(o=>{if(o.isSkinnedMesh)sk.push(o);});sk.forEach(o=>{const g=o.geometry.clone();['skinIndex','skinWeight'].forEach(a=>g.deleteAttribute(a));const m=new THREE.Mesh(g,o.material);m.position.copy(o.position);m.quaternion.copy(o.quaternion);m.scale.copy(o.scale);o.parent.add(m);o.parent.remove(o);});};
  /* smooth page turns: heavy model preparation runs in small slices (about 6 ms a frame) */
  const Q=[];let busyQ=false;const pump=()=>{const t0=performance.now();while(Q.length&&performance.now()-t0<6){const one=1;const j=Q[0];if(j.i<j.ms.length){try{soften(j.ms[j.i]);}catch(e){}j.i++;}if(j.i>=j.ms.length){Q.shift();try{j.done();}catch(e){}}if(one)break;}
    if(Q.length)requestAnimationFrame(pump);else busyQ=false;};
  const work=(ms,done)=>{Q.push({ms,i:0,done});if(!busyQ){busyQ=true;requestAnimationFrame(pump);}};
  /* baked models (smoothed once ahead of time, see tools/bookkit/bake-glb.md): no work on the device, taps get their fast BVH on first use */
  const toFloat=g=>{Object.keys(g.attributes).forEach(k=>{const a=g.attributes[k];if(a.array instanceof Float32Array&&!a.normalized&&!a.isInterleavedBufferAttribute)return;const n2=a.count,sz=a.itemSize,f=new Float32Array(n2*sz);
      for(let i=0;i<n2;i++){f[i*sz]=a.getX(i);if(sz>1)f[i*sz+1]=a.getY(i);if(sz>2)f[i*sz+2]=a.getZ(i);if(sz>3)f[i*sz+3]=a.getW(i);}g.setAttribute(k,new THREE.BufferAttribute(f,sz));});};
  const ready=mesh=>{mesh.material=new THREE.MeshPhysicalMaterial({vertexColors:true,roughness:.5,metalness:0,clearcoat:.35,clearcoatRoughness:.4});mesh.castShadow=true;mesh.receiveShadow=true;
    if(window.MeshBVHLib){const base=THREE.Mesh.prototype.raycast;mesh.raycast=function(r,hits){try{if(!this.geometry.boundsTree){toFloat(this.geometry);MeshBVHLib.computeBoundsTree.call(this.geometry);}return MeshBVHLib.acceleratedRaycast.call(this,r,hits);}catch(e){return base.call(this,r,hits);}};}};
  const loading={};const want=k=>{if(cache[k]||loading[k]||!list[k])return;loading[k]=1;
    if(B.glbBaked){ld.load('models-baked/'+list[k],g=>{const sc=g.scene;sc.traverse(o=>{if(o.isMesh)ready(o);});cache[k]=sc;define(k);},undefined,e=>{console.warn('baked model',k,e);B.glbBaked=0;loading[k]=0;want(k);});return;}
    ld.load('models/'+list[k],g=>{const sc=g.scene;unskin(sc);sc.updateMatrixWorld(true);const ms=[];sc.traverse(o=>{if(o.isMesh)ms.push(o);});
    work(ms,()=>{cache[k]=sc;define(k);});},undefined,e=>console.warn('model',k,e));};
  const define=k=>{
    P.GLBM[k]=s=>{const o=cache[k].clone(true);const b=new THREE.Box3().setFromObject(o),sz=b.getSize(new THREE.Vector3()),c=b.getCenter(new THREE.Vector3());const m=Math.max(sz.x,sz.y,sz.z)||1;const f=refDim(k)*(s||1)/m;
      o.scale.multiplyScalar(f);o.position.set(-c.x*f,-b.min.y*f,-c.z*f);const w=new THREE.Group();w.add(o);w.userData.glb=k;w.userData.noLux=1;return w;};};
  /* load a lesson's models when the lesson opens: every model whose name starts with the lesson's letter, plus any listed for it */
  const prev=P.onSpread;P.onSpread=sp=>{const id=sp&&sp.L&&sp.L.id;P.kGlbNow=!!(id&&(B.glbLessons||[]).indexOf(id)>=0);
    if(P.kGlbNow){const ch=/^a[A-Z]$/.test(id)?id[1].toLowerCase():null;Object.keys(list).filter(k=>(ch&&k[0]===ch)||((B.glbFor||{})[id]||[]).indexOf(k)>=0).forEach(want);}if(prev)prev(sp);};
})();
