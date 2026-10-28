// node units.js <bookdir> : loads lesson files with a fake PM; prints JSON of units + all picture names used
const fs=require('fs'),vm=require('vm'),path=require('path');const d=process.argv[2];
const bk=fs.readFileSync(path.join(d,'book.js'),'utf8');const ctx={window:{},console};ctx.window.window=ctx.window;vm.createContext(ctx);vm.runInContext(bk,ctx);
const U=[];const P={unit:x=>U.push(x),lesson:x=>U.push(x),K:{},K2:{CUSTOM:{}},SCN:{}};ctx.window.PM=P;
const sk=fs.readFileSync(path.join(d,'subject-kit.js'),'utf8');const sh=sk.slice(sk.indexOf('/* round and scene shorthands'));const shEnd=sh.indexOf('/* custom model');vm.runInContext('var window=this.window;'+sh.slice(0,shEnd),ctx);
for(const f of ctx.window.BOOK.files){if(/^(pics|kit|subject-kit|stage|scenes|math-kit2)\.js$/.test(f))continue;const p=path.join(d,f);if(!fs.existsSync(p))continue;try{vm.runInContext('var window=this.window;'+fs.readFileSync(p,'utf8'),ctx,{filename:f});}catch(e){console.error('ERR',f,e.message);}}
const names=new Set();const add=n=>{if(typeof n==='string'&&n)names.add(n);};
const walkSet=s=>{if(!s)return;(s.row||[]).forEach(add);add(s.pic);(s.items||[]).forEach(it=>add(it[0]));if(s.grid&&s.grid.items)Object.values(s.grid.items).forEach(add);(s.cats||[]).forEach(add);add(s.item);(s.left||[]).forEach(add);(s.right||[]).forEach(add);add(s.who);add(s.unit);};
U.forEach(u=>{const pg=u.page||{};if(pg.story)(pg.story.pics||[]).forEach(add);if(u.more)(u.more.pics||[]).forEach(add);(pg.boxes||[]).forEach(b=>(b.ex||[]).forEach(e=>add(e[0])));(pg.cards||[]).forEach(c=>(c.pics||[]).forEach(add));
  (u.steps||[]).forEach(s=>walkSet(s.set));(u.rounds||[]).forEach(r=>walkSet(r.set));});
const out={units:U.map(u=>({id:u.id,title:u.title,strand:u.strand,codes:u.codes,rounds:(u.rounds||[]).length,steps:(u.steps||[]).length})),names:[...names].sort()};
console.log(JSON.stringify(out));
