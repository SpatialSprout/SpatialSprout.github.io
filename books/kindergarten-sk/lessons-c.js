/* The Interactive Classroom: Senior Kindergarten — Section 3: First words (word families and sight words) and Section 4: Shapes, patterns, time and money */
(function(){
"use strict";
const P=window.PM;if(!P||!P.unit||!P.PK)return;const U=P.unit,R=P.R,S=P.S;const {shuffle}=P.PK;
const COL=['#ff6b6b','#4fb3ff','#5cc46a','#ffb347','#b07cff','#ff6bb5','#26c6b0','#f59f00'];
const T=(t,ok,i)=>(ok?'*':'')+'txt:'+t+':'+COL[(i||0)%8];

/* word families */
const FAM=[{f:'at',words:[['cat','c'],['hat','h'],['bat','b']],not:['dog','sun','pig','bus']},
 {f:'ug',words:[['bug','b'],['mug','m'],['rug','r']],pics:{bug:'ladybug',rug:'quilt'},not:['cat','hat','fox','egg']},
 {f:'ig',words:[['pig','p'],['wig','w'],['dig','d']],pics:{wig:'hat',dig:'shovel'},not:['cat','sun','bus','box']},
 {f:'op',words:[['mop','m'],['top','t'],['hop','h']],pics:{mop:'broom',top:'spinner',hop:'rabbit'},not:['cat','pig','sun','bed']},
 {f:'un',words:[['sun','s'],['bun','b'],['run','r']],pics:{bun:'bread',run:'runner'},not:['cat','pig','box','hat']}];
FAM.forEach((F,i)=>{const pic=w=>(F.pics||{})[w]||w;const ws=F.words.map(x=>x[0]);
  U({id:'w'+F.f,title:'The -'+F.f+' family',strand:'Words',codes:['Literacy & Math'],
    guide:{goal:'Read and build words in the -'+F.f+' family ('+ws.join(', ')+') by changing the first letter.',words:ws.join(', '),ask:['What sound do all these words end with?','Change the first letter: what new word?','Can you think of another -'+F.f+' word?'],home:'Make -'+F.f+' words with magnet letters!'},
    watch:['The -'+F.f+' family!',ws.join(', ')+': they all end with '+F.f+'.'],fig:'Words in the -'+F.f+' family.',
    kid:{big:'-'+F.f,pic:pic(ws[0]),line:'*'+ws.join('*, *')+'*',words:ws.map(w=>[pic(w),w])},page:{},
    steps:[{say:'Meet -'+F.f,speech:'Here is the '+F.f+' family. '+ws.map(w=>w).join(', ')+'. Listen: they all end with '+F.f+'!',set:{custom:'hello',big:ws[0],item:pic(ws[0]),word:ws[0],col:COL[i]}},
      {say:'Build '+ws[1],speech:'Change the first letter to make '+ws[1]+'. Tap the letter '+F.words[1][1]+'.',set:S.gap([pic(ws[1]),'?',T(F.f,0,i)],[T(F.words[1][1],1,1),T('z',0,2),T('k',0,3)])},
      {say:'Family words',speech:ws.join(', ')+'. Tap each one!',set:S.tap(ws.map(pic),{layout:'row',free:true})}],
    rounds:[...F.words.map(([w,c],j)=>R.gap('Build the word *'+w+'*.',[pic(w),'?',T(F.f,0,i)],[T(c,1,j)].concat(shuffle('bcdfghjklmnprstvwz'.split('').filter(x=>x!==c)).slice(0,2).map((x,k)=>T(x,0,k+2))))),
      R.bub('Pop the bubbles with *-'+F.f+'* words!',ws.map((w,j)=>T(w,1,j)).concat(F.not.slice(0,3).map((w,j)=>T(w,0,j+3)))),
      R.feed('Feed the '+['bear','monkey','dog','cow','pig'][i]+' the *-'+F.f+'* things.',['bear','monkey','dog','cow','pig'][i],ws.map(w=>'*'+pic(w)).concat(F.not.slice(0,3))),
      R.mem('Match each word to its picture.',ws.map(w=>[T(w,0,i),pic(w)])),
      R.web('Help the spider catch the *-'+F.f+'* words!',ws.map((w,j)=>T(w,1,j)).concat(F.not.slice(0,3).map((w,j)=>T(w,0,j+3)))),
      R.fishing('Catch the fish with *'+F.f+'*!',[F.f,F.f,F.f].map(x=>'*'+x).concat(['og','ed','ix']))],
    tries:[['Say 3 words that rhyme with '+ws[0]+'.',ws.join(', ')],['Write '+ws[0]+' and draw it.','']]});});

/* sight words */
const SIGHT=[{w:['I','see','a'],s:['I','see','a','cat.'],pic:'cat'},{w:['the','can','like'],s:['I','like','the','sun.'],pic:'sun'},{w:['my','is','and'],s:['My','dog','is','big.'],pic:'dog'}];
SIGHT.forEach((G,i)=>{const others=['to','go','we','me','up','it','in','on','yes','no'];
  U({id:'sight'+i,title:'Sight words: '+G.w.join(', '),strand:'Words',codes:['Literacy & Math'],
    guide:{goal:'Read the sight words '+G.w.join(', ')+' at a glance, and find them in a little sentence.',words:G.w.join(', '),ask:['Can you find “'+G.w[0]+'”?','Read the sentence with me.','Where else do you see these words?'],home:'Put these words on sticky notes around the house and read them every day!'},
    watch:['Super sight words!',G.w.join(', ')+': we know them by looking!'],fig:'Sight words floating in bubbles.',
    kid:{big:G.w.join(' '),pic:G.pic,line:'*'+G.s.join(' ')+'*'},page:{},
    steps:[{say:'Meet the words',speech:'These are super sight words: '+G.w.join(', ')+'. Tap each one and read it!',set:S.tap(G.w.map((w,j)=>T(w,0,j)),{layout:'row',free:true})},
      {say:'Read a sentence',speech:G.s.join(' ')+' Tap the words in order to build it!',set:S.build(G.s,G.pic)},
      {say:'Pop the words',speech:'Pop every bubble that says '+G.w[0]+'!',set:{custom:'bubbles',items:[T(G.w[0],1,0),T(G.w[0],1,1),T(G.w[0],1,2),T(others[i],0,3),T(others[i+3],0,4),T(G.w[1],0,5)]}}],
    rounds:[...G.w.map((w,j)=>R.bub('Pop the bubbles that say *'+w+'*!',[T(w,1,j),T(w,1,j+1),T(w,1,j+2)].concat(shuffle(others.concat(G.w.filter(x=>x!==w))).slice(0,3).map((x,k)=>T(x,0,k+3))))),
      R.build('Build the sentence: *'+G.s.join(' ')+'*',G.s,G.pic),
      R.mem('Find the matching words.',G.w.map((w,j)=>[T(w,0,j),T(w,0,j+4)])),
      R.fishing('Catch the fish that say *'+G.w[0]+'*!',['*'+G.w[0],'*'+G.w[0],'*'+G.w[0],others[i],others[i+1],others[i+2]]),
      R.gap('Which word is missing?',G.s.slice(0,2).map((w,j)=>T(w,0,j)).concat(['?',G.pic]),[T(G.s[2],1,2)].concat(shuffle(others).slice(0,2).map((x,k)=>T(x,0,k+3)))),
      R.web('Help the spider catch *'+G.w[1]+'*!',[T(G.w[1],1,0),T(G.w[1],1,1),T(others[i],0,2),T(others[i+4],0,3),T(G.w[2],0,4)])],
    tries:[['Read: '+G.s.join(' '),'point to each word'],['Find “'+G.w[0]+'” in a book.','how many times?']]});});

/* shapes, patterns, time and money */
const SO=(k,c,ok)=>(ok?'*':'')+'solid:'+k+':'+c+':'+k;
U({id:'msolids',title:'Solids: roll and stack',strand:'Shapes and More',codes:['Literacy & Math','Problem Solving'],
  guide:{goal:'Name the sphere, cube, cone and cylinder, find them in real things, and test which ones roll and which stack.',words:'sphere, cube, cone, cylinder, roll, stack',ask:['Which one rolls?','Which one is like a box?','Which can you stack?'],home:'Find a ball, a box, a can and an ice cream cone at home!'},
  watch:['Roll or stack?','A ball is a sphere: it rolls. A box is a cube: it stacks.'],fig:'Shiny solids on a mat.',
  kid:{big:'',pic:'ball',line:'*sphere* · *cube* · *cone* · *cylinder*',words:[['ball','sphere'],['box','cube'],['ice cream','cone']]},page:{},
  steps:[{say:'Meet the solids',speech:'Tap each one. Sphere, cube, cone, cylinder.',set:S.tap([SO('sphere','#ff6b6b'),SO('cube','#4fb3ff'),SO('cone','#ffd43b'),SO('cylinder','#5cc46a')],{layout:'row',free:true})},
    {say:'Real things',speech:'A ball is a sphere. A box is a cube. An ice cream cone is a cone. A can is a cylinder.',set:S.tap(['ball','box','ice cream','can'],{layout:'row',free:true})}],
  rounds:[R.bub('Pop the bubbles with a *sphere*!',[SO('sphere','#ff6b6b',1),SO('sphere','#b07cff',1),SO('sphere','#ffb347',1),SO('cube','#4fb3ff'),SO('cone','#ffd43b'),SO('cylinder','#5cc46a')]),
    R.tap('Tap the solids that *roll*.',[SO('sphere','#ff6b6b',1),SO('cylinder','#5cc46a',1),SO('cube','#4fb3ff')]),R.tap('Tap the *cube*.',[SO('cube','#4fb3ff',1),SO('cone','#ffd43b'),SO('sphere','#ff6b6b')]),
    R.mem('Match the solid to a real thing.',[[SO('sphere','#ff6b6b'),'ball'],[SO('cube','#4fb3ff'),'box'],[SO('cone','#ffd43b'),'ice cream']]),
    R.feed('Put the *spheres* in the basket.','basket',['*ball','*orange','*apple','box','book']),R.web('Help the spider catch the *cubes*!',[SO('cube','#4fb3ff',1),SO('cube','#ff6bb5',1),SO('sphere','#ff6b6b'),SO('cone','#ffd43b'),SO('cylinder','#5cc46a')])],
  tries:[['Build a tower with blocks.','cubes stack!'],['Roll a ball and a box.','which rolls?']]});

U({id:'mpatterns',title:'Patterns',strand:'Shapes and More',codes:['Literacy & Math','Problem Solving'],
  guide:{goal:'Copy, finish and make repeating patterns (AB, ABB, ABC).',words:'pattern, repeat, next',ask:['What comes next?','What part repeats?','Can you make your own pattern?'],home:'Make a pattern with spoons and forks!'},
  watch:['It repeats!','Duck, duck, goose, duck, duck, goose!'],fig:'A pattern with one piece missing.',
  kid:{big:'',pic:'duck',line:'*duck, duck, goose, duck, duck, goose*'},page:{},
  steps:[{say:'Duck, duck, goose',speech:'Duck, duck, goose, duck, duck… what comes next? Goose!',set:S.gap(['duck','duck','goose','duck','duck','?'],['*goose','duck','chick'])},
    {say:'Red, blue, yellow',speech:'Red, blue, yellow, red, blue… what comes next?',set:S.gap(['shape:circle:#ff6b6b','shape:circle:#4fb3ff','shape:circle:#ffd43b','shape:circle:#ff6b6b','shape:circle:#4fb3ff','?'],['*shape:circle:#ffd43b','shape:circle:#ff6b6b','shape:circle:#4fb3ff'],{s:.8})}],
  rounds:[R.gap('What comes next?',['cat','dog','cat','dog','?'],['*cat','dog','fish']),R.gap('What comes next?',['star','heart','heart','star','heart','?'],['*heart','star','moon']),
    R.gap('What is missing?',['apple','banana','?','apple','banana','cherries'],['*cherries','apple','grapes']),R.gap('What comes next?',['dots:1','dots:2','dots:3','?'],['*dots:4','dots:1','dots:6']),
    R.gap('What comes next?',['txt:A:#ff6b6b','txt:B:#4fb3ff','txt:A:#ff6b6b','txt:B:#4fb3ff','?'],['*txt:A:#ff6b6b','txt:C:#5cc46a','txt:B:#4fb3ff']),R.gap('What comes next?',['sun','moon','sun','moon','?'],['*sun','star','cloud'])],
  tries:[['Clap a pattern: clap, clap, stomp.','repeat it!'],['Make an ABC pattern with toys.','car, ball, block…']]});

U({id:'mtime',title:'Clocks and o’clock',strand:'Shapes and More',codes:['Literacy & Math'],
  guide:{goal:'Read a clock to the hour and order morning, afternoon and night.',words:'clock, o’clock, morning, night',ask:['What time is it?','What do you do in the morning?','When do you sleep?'],home:'Look at the clock at breakfast and bedtime.'},
  watch:['Tick tock!','When the long hand points to 12, it is something o’clock.'],fig:'A clock showing 7 o’clock.',
  kid:{big:'7:00',pic:'alarm clock',line:'*7 o’clock*: time to wake up!'},page:{},
  steps:[{say:'Seven o’clock',speech:'The long hand points to twelve. The short hand points to seven. It is seven o’clock!',set:{custom:'clock',h:7,m:0}},
    {say:'My day',speech:'Tap them in order: morning sun, lunch, night moon.',set:S.order(['sun','sandwich','moon'])}],
  rounds:[...[3,7,9,12].map(h=>R.look('What time is it?',[],[h+' o’clock',(h%12+2)+' o’clock',(h===1?5:h-1)+' o’clock'],h+' o’clock',{set:{custom:'clock',h,m:0}})),R.order('Tap in order: morning, noon, night.',['sun','sandwich','moon']),R.one('When do you go to sleep?','moon',['sun','sandwich'])],
  tries:[['What time do you eat lunch?','12 o’clock?'],['Draw a clock at 3 o’clock.','']]});

U({id:'mmoney',title:'Canadian coins',strand:'Shapes and More',codes:['Literacy & Math','Belonging'],
  guide:{goal:'Name Canadian coins: nickel, dime, quarter, loonie and toonie.',words:'coin, loonie, toonie, quarter, dime, nickel',ask:['Which coin has a loon?','Which coin is worth two dollars?','Which is the smallest?'],home:'Sort real coins by size and name them!'},
  watch:['Canadian coins!','A loonie has a loon. A toonie is worth two dollars.'],fig:'Canadian coins in a row.',
  kid:{big:'$1',pic:'coin',line:'*loonie*, *toonie*, *quarter*, *dime*, *nickel*'},page:{},
  steps:[{say:'Meet the coins',speech:'Here are Canada’s coins: a nickel, a dime, a quarter, a loonie and a toonie.',set:{custom:'cash',cash:['nickel','dime','quarter','loonie','toonie'],show:false}},
    {say:'Buy a teddy',speech:'The teddy costs two dollars. A toonie pays for it!',set:{custom:'cash',cash:['toonie'],price:200,item:'teddy',label:'$2'}}],
  rounds:[R.look('Which coin is the *toonie*?',[],['nickel','toonie','dime'],'toonie',{set:{custom:'cash',cash:['toonie'],show:false}}),R.look('Which coin is the *loonie*?',[],['loonie','quarter','dime'],'loonie',{set:{custom:'cash',cash:['loonie'],show:false}}),
    R.look('Which coin is the *quarter*?',[],['quarter','nickel','toonie'],'quarter',{set:{custom:'cash',cash:['quarter'],show:false}}),R.feed('Put *4* coins in the piggy bank.','jar',['*coin','*coin','*coin','*coin','leaf','ball'],{need:4,count:true}),
    R.look('A toy costs $2. How many loonies?',[],[1,2,3],2,{set:{custom:'cash',cash:['loonie','loonie','loonie'],price:200,item:'toy',show:false}})],
  tries:[['Play store with real coins.','price toys at $1 or $2'],['Which coin is the smallest?','the dime!']]});
})();
