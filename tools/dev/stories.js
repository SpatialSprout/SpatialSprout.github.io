// node stories.js <bookdir> : story speech strings (same rule as subject-kit storyToks)
const fs=require('fs'),vm=require('vm'),path=require('path');const d=process.argv[2];
const bk=fs.readFileSync(path.join(d,'book.js'),'utf8');const ctx={window:{},console};ctx.window.window=ctx.window;vm.createContext(ctx);vm.runInContext(bk,ctx);
const U=[];const P={unit:x=>U.push(x),lesson:x=>U.push(x),K:{},K2:{CUSTOM:{}},SCN:{}};ctx.window.PM=P;
const sk=fs.readFileSync(path.join(d,'subject-kit.js'),'utf8');const sh=sk.slice(sk.indexOf('/* round and scene shorthands'));vm.runInContext('var window=this.window;'+sh.slice(0,sh.indexOf('/* custom model')),ctx);
for(const f of ctx.window.BOOK.files){if(!/^lessons|^g2|^m2/.test(f))continue;vm.runInContext('var window=this.window;'+fs.readFileSync(path.join(d,f),'utf8'),ctx,{filename:f});}
const out=U.filter(u=>u.page&&u.page.story).map(u=>{const sy=u.page.story;const title=String(sy.title).trim();const plain=String(sy.text).replace(/\*/g,'');
  return {id:u.id,speech:title+(/[.!?]$/.test(title)?' ':'. ')+plain.replace(/\s+/g,' ').trim()};});
console.log(JSON.stringify(out));
