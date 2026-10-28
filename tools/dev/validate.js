const fs=require('fs'),vm=require('vm'),path=require('path');const d=process.argv[2];
const bk=fs.readFileSync(path.join(d,'book.js'),'utf8');const ctx={window:{},console};ctx.window.window=ctx.window;vm.createContext(ctx);vm.runInContext(bk,ctx);
const U=[];const P={unit:x=>U.push(x),K:{},K2:{CUSTOM:{}},SCN:{}};ctx.window.PM=P;
const sk=fs.readFileSync(path.join(d,'subject-kit.js'),'utf8');const sh=sk.slice(sk.indexOf('/* round and scene shorthands'));vm.runInContext('var window=this.window;'+sh.slice(0,sh.indexOf('/* custom model')),ctx);
for(const f of ctx.window.BOOK.files){if(/^(pics|kit|subject-kit|stage|scenes|math-kit2)\.js$/.test(f))continue;const p=path.join(d,f);if(fs.existsSync(p))vm.runInContext('var window=this.window;'+fs.readFileSync(p,'utf8'),ctx,{filename:f});}
let bad=0;const chk=(id,k,s,r)=>{const e=m=>{bad++;console.log(id,k,m,JSON.stringify(r||s).slice(0,160));};if(!s)return;
 if(s.fill){if(!s.fill.includes('_'))e('fill no gap');if(!(s.opts||[]).includes(s.ans))e('ans not in opts');}
 if(s.bins){(s.items||[]).forEach(it=>{if(it[1]>=s.bins.length)e('bin idx');});}
 if(s.order&&s.row&&s.order.length!==s.row.length)e('order');
 if(r){if(r.o&&!r.o.map(String).includes(String(r.ans)))e('ans not in o');if(!r.o&&r.ans!=null&&s.row&&![].concat(r.ans).every(a=>s.row.includes(a)))e('pick ans not in row');if(!r.q)e('no q');
   if(!r.o&&!s.fill&&!s.bins&&!s.build&&!s.order&&!(r.ans!=null&&s.row)&&!s.custom&&!r.cell)e('no interaction');}};
U.forEach(u=>{(u.steps||[]).forEach((st,i)=>chk(u.id,'step'+i,st.set));(u.rounds||[]).forEach((r,i)=>chk(u.id,'r'+i,r.set,r));
 (u.steps||[]).forEach((st,i)=>(st.cues||[]).forEach(c=>{if(!(st.set&&(st.set.custom||st.set.grid))&&typeof c[1]==='string'&&c[1]&&!c[1].startsWith('#')&&!c[1].startsWith('bin:')&&c[1]!=='gap'&&!c[1].startsWith('@')&&!c[1].startsWith('cell:')){const s=st.set||{};const names=new Set([...(s.row||[]),s.pic,...(s.items||[]).map(x=>x[0])]);c[1].split('|').forEach(n=>{if(!names.has(n)){bad++;console.log(u.id,'step'+i,'cue target missing',n);}});}
  if(typeof c[1]==='string'&&c[1].startsWith('#')){const s=st.set||{};const txt=new Set([...(s.fill||[]),...(s.build||[]),...(s.opts||[])]);if(!txt.has(c[1].slice(1))){bad++;console.log(u.id,'step'+i,'cue text missing',c[1]);}}}));});
console.log('units',U.length,'problems',bad);
