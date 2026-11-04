/* The Interactive Classroom: Senior Kindergarten — Numbers: counting to 20, numerals and quantities, more and less, making 5 and 10, adding, taking away, graphs, measuring, time and money */
(function(){
"use strict";
const P=window.PM;if(!P||!P.unit||!P.PK)return;const U=P.unit,R=P.R,S=P.S;const {rnd,pick,shuffle,near}=P.PK;
const FR='Literacy & Math',PS='Problem Solving',BC='Belonging',SR='Well-Being';
const num=(n,ok)=>(ok?'*':'')+'num:'+n;

/* 1 ─ Count to 20 */
U({id:'m01',title:'Count to twenty',strand:'Numbers',codes:[FR],
 guide:{goal:'Count forward to 20 and beyond, count objects up to 20 by touching each once, and know that the last number counted tells how many.',words:'count, eleven, twelve, teens, twenty, ten and some more',ask:['What comes after 15?','How many in a full ten frame and 3 more?','How can you keep track when you count lots of things?'],home:'Count 20 steps on a walk, or 20 grapes into a bowl.'},
 watch:['Ten and some more!','Eleven is ten and one more. Fifteen is ten and five more. Twenty is two tens!'],
 fig:'Two ten frames filling up to twenty.',
 page:{story:{title:'Twenty Frogs on a Log',text:'Down by the *pond*, frogs liked to sit on the long *log*. *Ten* frogs hopped on: one, two, three… *ten*! Then *more* frogs came: *eleven*, *twelve*, *thirteen*… all the way to *twenty*! The log went *creeeak*. "Too many frogs!" croaked Grandpa Frog. *SPLASH!* All twenty frogs jumped into the water, laughing. "Let’s count again tomorrow!"',pics:['frog','log','pond','droplet'],
   acts:[[null,'pond',['frog','frog','frog'],'Hop on!'],['ten','pond',['frog','frog','frog','frog','frog'],'Ten frogs!'],['twenty','pond',['frog:big','frog','frog','frog'],'Twenty!'],['SPLASH','pond',['droplet','frog'],'SPLASH!']]},
  boxes:[{title:'The teens',lines:['11 eleven · 12 twelve · 13 thirteen','14 fourteen · 15 fifteen · 16 sixteen','17 seventeen · 18 eighteen · 19 nineteen','*20* twenty = 2 tens']},
   {title:'Ten and some more',lines:['13 = *10* and *3*','17 = *10* and *7*','20 = *10* and *10*']}],
  cards:[{q:'What comes after 14?',a:'*15*'},{q:'How many fingers and toes do you have?',a:'*20*'}],
  words:[['twenty','20: two tens'],['teen numbers','11 to 19: ten and some more']]},
 steps:[
  {say:'Read the story',speech:'Ten frogs hopped on the log, then more and more, all the way to twenty. Then splash! They all jumped in.',set:S.row(['frog','log','pond','droplet'])},
  {say:'Ten and more',speech:'One full ten frame is ten. Three more make thirteen. Tap to count them all!',set:S.count('frog',13,{frame:20})},
  {say:'Twenty',speech:'Two full ten frames make twenty. Count with me!',set:S.count('star',20,{frame:20})}],
 more:{title:'Count by tens',text:'Can you count by tens? *10, 20, 30, 40, 50*… all the way to *100*!',pics:['hand']},
 rounds:[R.count('How many *frogs*?','frog',rnd(11,15),{frame:20}),R.count('How many *stars*?','star',rnd(14,20),{frame:20}),R.count('How many *apples*?','apple',rnd(11,16),{frame:20}),
  R.gap('What comes next? 12, 13, 14, ?',[num(12),num(13),num(14),'?'],[num(15,1),num(16),num(41)]),R.gap('What is missing?',[num(16),num(17),'?',num(19)],[num(18,1),num(81),num(15)]),
  R.gap('What comes next? 17, 18, 19, ?',[num(17),num(18),num(19),'?'],[num(20,1),num(10),num(21)]),R.tap('Tap the number *twelve*.',[num(12,1),num(21),num(2)]),
  R.tap('Tap the number *fifteen*.',[num(15,1),num(51),num(5)]),R.tap('Tap the number *twenty*.',[num(20,1),num(12),num(2)])],
 tries:[['Count 20 jumping jacks!','1 to 20'],['Find 15 toys and count them.','line them up']]});

/* 2 ─ Numbers and quantities */
U({id:'m02',title:'See it, say it, show it',strand:'Numbers',codes:[FR],
 guide:{goal:'Recognize small amounts at a glance (subitize) on dice and ten frames, read numerals 0 to 10, and match numerals to amounts.',words:'numeral, dots, dice, ten frame, zero, quick look',ask:['How many dots? Can you tell without counting?','What does zero mean?','Show me 7 on a ten frame.'],home:'Roll a die and shout the number as fast as you can!'},
 watch:['Quick look!','Five dots like a dice. You know it is five without counting!'],
 fig:'Dice and ten frames showing numbers.',
 page:{story:{title:'Dino’s Dice Game',text:'*Dino* and *Turtle* played a dice game. Dino rolled: *four* dots in a square. "Four!" he roared, without counting. Turtle rolled *five*: four corners and one in the middle. Then Dino rolled… *zero*? "There’s no such dice!" laughed Turtle. "*Zero* means *none*," said Dino. "Like the cookies left in the jar!" They counted the jar: *zero* cookies. Time to bake more!',pics:['dinosaur','turtle','dice','cookie'],
   acts:[[null,'playroom',['dinosaur','turtle'],'Let’s play!'],['four','playroom',['dice','dinosaur'],'Four! Roar!'],['five','playroom',['dice','turtle'],'Five!'],['zero','kitchen',['jar','cookie'],'Zero cookies!']]},
  boxes:[{title:'Quick looks',ex:[['dice','*4*'],['dice','*5*'],['dice','*6*']],cols:3},
   {title:'Numerals',lines:['0 1 2 3 4 5 6 7 8 9 10','*0* zero = none']}],
  cards:[{q:'How many dots on the 6 side of a die?',pics:['dice'],a:'*6*'},{q:'What does zero mean?',a:'*none*'}],
  words:[['numeral','the symbol for a number, like 7'],['zero','0: none at all']]},
 steps:[
  {say:'Read the story',speech:'Dino rolled four dots and knew it was four without counting. Turtle rolled five. Zero means none, like the empty cookie jar.',set:S.row(['dinosaur','turtle','dice','cookie'])},
  {say:'Quick look',speech:'Tap each dice and say the number fast. Two, four, five, six!',set:S.tap(['dots:2','dots:4','dots:5','dots:6'],{layout:'row',free:true})},
  {say:'Match the number',speech:'Which dice shows the number five? Tap it!',set:S.tap(['*dots:5','dots:3','dots:6'],{layout:'row'})}],
 more:{title:'Flash game',text:'Hold up fingers for one second. Your partner says how many. Switch!',pics:['hand']},
 rounds:[...[3,4,5,6].map(n=>R.tap('Tap the dice with *'+n+'* dots.',shuffle(['*dots:'+n,...shuffle([1,2,3,4,5,6].filter(x=>x!==n)).slice(0,2).map(x=>'dots:'+x)]))),
  R.count('How many in the ten frame?','apple',rnd(6,9),{frame:10}),R.count('How many in the ten frame?','star',rnd(3,8),{frame:10}),
  ...[7,9].map(n=>R.tap('Tap the number *'+n+'*.',shuffle([num(n,1),num(n===7?1:6),num(n===7?4:3)]))),R.tap('Tap *zero*.',[num(0,1),num(8),num(6)])],
 tries:[['Roll a die 5 times. Say each number fast!','no counting!'],['Show 8 on your fingers.','5 and 3']]});

/* 3 ─ More, less, same */
U({id:'m03',title:'One more, one less',strand:'Numbers',codes:[FR,PS],
 guide:{goal:'Compare amounts to 10 (more, less, the same), and find one more and one less than a number.',words:'more, less, fewer, same, equal, one more, one less',ask:['What is one more than 6?','What is one less than 9?','Which is more, 4 or 7?'],home:'Stack blocks: make a tower of 5, then one more. How many now?'},
 watch:['One more, one less!','5 and one more is 6. 5 and one less is 4.'],
 fig:'Two block towers side by side.',
 page:{story:{title:'Squirrel’s Acorns',text:'*Squirrel* had *5* acorns. Then she found *one more* under the oak. "Now I have *6*!" Her friend Chipmunk had *8*. "You have *more*," said Squirrel. Chipmunk dropped one. "Oops! *One less*: 7." Then the wind blew one of Squirrel’s acorns to Chipmunk. Now Squirrel had *5* and Chipmunk had *8*… no wait! They counted again and shared until they each had the *same*: *6* and *6*!',pics:['squirrel','acorn','tree','leaf'],
   acts:[[null,'forest',['squirrel','acorn'],'5 acorns!'],['one more','forest',['acorn','tree'],'Now 6!'],['Chipmunk','forest',['squirrel','acorn','acorn'],'You have more!'],['same','forest',['squirrel','squirrel'],'6 and 6!']]},
  boxes:[{title:'One more, one less',lines:['one more than *5* is *6*','one less than *5* is *4*','one more: count *up* · one less: count *down*']},
   {title:'Compare',lines:['7 is *more* than 4','3 is *less* than 6','5 and 5 are the *same*']}],
  cards:[{q:'One more than 9?',a:'*10*'},{q:'One less than 3?',a:'*2*'}],
  words:[['more','a bigger amount'],['less','a smaller amount']]},
 steps:[
  {say:'Read the story',speech:'Squirrel had five acorns and found one more: six. Chipmunk had eight, which is more. They shared until they had the same.',set:S.row(['squirrel','acorn','tree','leaf'])},
  {say:'One more',speech:'Five acorns. Give Squirrel one more. Tap an acorn to put it in her basket.',set:S.tap(['*acorn'],{mode:'collect',basket:'squirrel',layout:'row'})},
  {say:'Which is more?',speech:'Six or eight? Tap the dice that shows more.',set:S.tap(['*num:8','num:6'],{layout:'row'})}],
 more:{title:'Number line hop',text:'Stand on a number on a hopscotch line. Hop *forward* for one more, *back* for one less!',pics:['frog']},
 rounds:[...[0,1,2].map(()=>{const n=rnd(2,9);return R.gap('What is *one more* than '+n+'?',[num(n),'?'],shuffle([num(n+1,1),num(n-1),num(n+2)]));}),
  ...[0,1].map(()=>{const n=rnd(3,10);return R.gap('What is *one less* than '+n+'?',['?',num(n)],shuffle([num(n-1,1),num(n+1),num(n-2)]));}),
  R.tap('Tap the number that is *more*.',shuffle([num(7,1),num(4)])),R.tap('Tap the number that is *less*.',shuffle([num(3,1),num(8)])),
  R.tap('Tap the dice that are the *same*.',['*dots:5','*dots:5','dots:3']),R.tap('Tap the group with *fewer*.',shuffle(['*dots:2','dots:6']))],
 tries:[['What is one more than your age?','e.g. 5 → 6'],['Make two towers that are the same.','count both!']]});

/* 4 ─ Making 5 and 10 */
U({id:'m04',title:'Make five, make ten',strand:'Numbers',codes:[FR,PS],
 guide:{goal:'Use ten frames and fingers to show the parts that make 5 and 10 (number partners like 4 and 1, 7 and 3), and say how many more make 10.',words:'ten frame, partners, make ten, how many more, empty',ask:['How many more to fill the ten frame?','What two numbers make 5?','Show 10 with two different colours.'],home:'Play “make ten” with fingers: I show 6, you show the rest!'},
 watch:['Fill the frame!','7 frogs and 3 empty spaces: 7 and 3 make 10.'],
 fig:'A ten frame with two colours of counters.',
 page:{story:{title:'Ten Seats on the Bus',text:'The little school bus had *ten* seats. *Seven* kids climbed on. "How many *empty* seats?" asked Driver Dee. The kids looked: *one, two, three*. "*Three* more friends can come!" Three more friends hopped on. Now the bus was *full*: *7 and 3 make 10*! "Buckle up!" said Driver Dee. *Beep beep!*',pics:['school bus','girl','boy','woman'],
   acts:[[null,'town',['school bus:big'],'Ten seats!'],['Seven kids','town',['school bus','girl','boy'],'Seven!'],['Three more','town',['girl','boy','school bus'],'Three more!'],['full','town',['school bus'],'Beep beep! Full!']]},
  boxes:[{title:'Partners of 5',lines:['5 and 0 · 4 and 1','3 and 2 · 2 and 3','1 and 4 · 0 and 5']},
   {title:'Partners of 10',lines:['9 and 1 · 8 and 2 · 7 and 3','6 and 4 · *5 and 5*']}],
  cards:[{q:'6 and how many make 10?',a:'*4*'},{q:'2 and how many make 5?',a:'*3*'}],
  words:[['ten frame','a box of 10 spaces, 2 rows of 5'],['partners','two numbers that make another number']]},
 steps:[
  {say:'Read the story',speech:'Seven kids sat on a bus with ten seats. Three seats were empty. Three more friends got on. Seven and three make ten!',set:S.row(['school bus','girl','boy','woman'])},
  {say:'Seven in the frame',speech:'Seven counters fill seven spaces. Count them. How many spaces are still empty? Three!',set:S.count('apple',10,{frame:10,away:3,goneSay:'empty!'})},
  {say:'Fill it up',speech:'Tap three more apples to fill the frame. Seven and three make ten!',set:S.tap(['*apple','*apple','*apple'],{mode:'collect',basket:'basket',count:true,layout:'row'})}],
 more:{title:'Hand partners',text:'Hold up *10* fingers. Fold some down. How many are up? How many are down? Together they always make *10*!',pics:['hand']},
 rounds:[...[0,1,2,3].map(()=>{const a=rnd(4,9);return R.count('How many *more* to make 10?','star',10,{frame:10,away:10-a,show:a+' + ? = 10'});}).map(r=>Object.assign(r,{q:r.q})),
  ...[0,1].map(()=>{const a=rnd(1,4);return R.count('How many more to make 5? Count the empty spots.','frog',5,{away:5-a});}),
  R.feed('Fill the bus: it has 6 kids. Put in *4* more.','school bus',['*girl','*boy','*girl','*boy','dog','cat'],{need:4,count:true}),R.tap('Which two make *10*?',['*dots:5','*dots:5','dots:2'])],
 tries:[['Show 8 on a ten frame. How many empty?','2'],['Find 3 ways to make 5 with blocks.','4+1, 3+2, 5+0']]});

/* 5 ─ Adding */
U({id:'m05',title:'Put together: adding',strand:'Numbers',codes:[FR,PS],
 guide:{goal:'Solve joining (adding) story problems to 10 with objects, fingers and drawings, and use the words plus, and, equals and in all.',words:'add, plus, and, equals, in all, join, total',ask:['3 ducks and 2 more ducks. How many in all?','How can you use your fingers to add?','What does plus mean?'],home:'Add at snack time: 4 crackers and 2 more. How many in all?'},
 watch:['Put them together!','3 ducks plus 2 ducks equals 5 ducks in all.'],
 fig:'Two groups of ducks joining together.',
 page:{story:{title:'Pond Party',text:'*Three* ducks were swimming in the pond. *Quack!* Then *two* more ducks flew down. *Splash, splash!* "How many ducks now?" asked Frog. Little Duckling counted them all: "*One, two, three, four, five!* *3 and 2 make 5*!" Then *one* more duck waddled in. "*5 plus 1 equals 6*!" It was the biggest pond party ever!',pics:['duck','pond','frog','droplet'],
   acts:[[null,'pond',['duck','duck','duck'],'Three ducks!'],['two more','pond',['duck','duck'],'Splash, splash!'],['3 and 2','pond',['duck','frog'],'Five in all!'],['party','pond',['duck:big','duck','frog'],'Pond party!']]},
  boxes:[{title:'Adding words',lines:['*3 + 2 = 5*','three *plus* two *equals* five','*and*, *more*, *in all*, *altogether*']},
   {title:'Ways to add',ex:[['hand','fingers'],['block','blocks'],['pencil','drawings']],cols:3}],
  cards:[{q:'4 + 1 = ?',a:'*5*'},{q:'2 cats and 2 more cats?',pics:['cat'],a:'*4* cats'}],
  words:[['add','put groups together to find how many in all'],['plus','the + sign: add']]},
 steps:[
  {say:'Read the story',speech:'Three ducks, and two more flew down. Three and two make five. Then one more: five plus one equals six.',set:S.row(['duck','pond','frog','droplet'])},
  {say:'Three and two',speech:'Here are three ducks and two more. Tap them all to count: three plus two equals five!',set:S.count('duck',5,{show:'3 + 2 = ?'})},
  {say:'Add to the basket',speech:'The basket has four eggs. Add two more. Tap them in!',set:S.tap(['*egg','*egg'],{mode:'collect',basket:'basket',layout:'row'})}],
 more:{title:'Domino adding',text:'A domino has two sides. Count the dots on each side, then count them *all*. That’s adding!',pics:['dice']},
 rounds:[...[0,1,2,3,4].map(()=>{const a=rnd(1,5),b=rnd(1,4);return R.count('*'+a+' + '+b+'* = ? Tap to count them all.',pick(['duck','apple','star','fish']),a+b,{show:a+' + '+b+' = ?'});}),
  R.feed('Put *3* apples in, then *2* more. How many in all? Fill the basket with 5!','basket',['*apple','*apple','*apple','*apple','*apple','banana'],{need:5,count:true}),
  R.tap('*2 + 2* = ? Tap the answer.',shuffle([num(4,1),num(3),num(5)])),R.tap('*5 + 0* = ? Tap the answer.',shuffle([num(5,1),num(0),num(6)])),R.tap('*1 + 3* = ? Tap the answer.',shuffle([num(4,1),num(2),num(13)]))],
 tries:[['Add with fingers: 3 + 4.','*7*'],['Make your own adding story.','e.g. 2 dogs and 3 cats']]});

/* 6 ─ Taking away */
U({id:'m06',title:'Take away: subtracting',strand:'Numbers',codes:[FR,PS],
 guide:{goal:'Solve taking-away (subtracting) story problems within 10 with objects and fingers, and use the words take away, minus, left and equals.',words:'take away, minus, left, equals, subtract',ask:['5 balloons and 2 pop. How many are left?','What does minus mean?','How can you act it out?'],home:'Take away at snack time: 6 grapes, eat 2. How many are left?'},
 watch:['How many are left?','5 cupcakes, take away 2. 3 are left!'],
 fig:'Cupcakes with two being eaten.',
 page:{story:{title:'Five Little Cupcakes',text:'*Five* little cupcakes sat in the bakery window. Along came Bear with a *penny*… and *ate one*! "Yum!" Now there were *four*. Then Mouse came and *took one* away. Now there were *three*. "*5 take away 2 is 3*," said the baker. Then she baked *more*, because everyone loves cupcakes!',pics:['cupcake','bear','mouse','store'],
   acts:[[null,'store',['cupcake','cupcake','cupcake'],'Five cupcakes!'],['Bear','store',['bear','cupcake'],'Yum!'],['Mouse','store',['mouse','cupcake'],'Squeak!'],['5 take away 2','store',['cupcake','woman'],'Three are left!']]},
  boxes:[{title:'Take away',lines:['*5 − 2 = 3*','five *minus* two *equals* three','*take away*, *left*, *fewer*']}],
  cards:[{q:'4 − 1 = ?',a:'*3*'},{q:'6 birds, 2 fly away. How many left?',pics:['bird'],a:'*4*'}],
  words:[['take away','remove some and find how many are left'],['minus','the − sign: take away']]},
 steps:[
  {say:'Read the story',speech:'Five cupcakes. Bear ate one and Mouse took one. Five take away two is three.',set:S.row(['cupcake','bear','mouse','store'])},
  {say:'Count what is left',speech:'Two cupcakes are crossed out: they were eaten. Tap the ones that are left. One, two, three!',set:S.count('cupcake',5,{away:2,show:'5 − 2 = ?',goneSay:'eaten!'})},
  {say:'Pop some balloons',speech:'Six balloons. Pop two. Four are left!',set:S.tap(['*balloon::#ff6b6b','*balloon::#4fb3ff','balloon::#5cc46a','balloon::#ffd43b','balloon::#b07cff','balloon::#ffa94d'],{mode:'pop',need:2})}],
 more:{title:'Hide and count',text:'Put 6 toys under a cup. Take 2 out. How many are still hiding?',pics:['cup']},
 rounds:[...[0,1,2,3,4].map(()=>{const a=rnd(4,9),b=rnd(1,a-1);return R.count('*'+a+' − '+b+'* = ? Count the ones that are left.',pick(['cupcake','apple','fish','duck']),a,{away:b,show:a+' − '+b+' = ?'});}),
  R.tap('*5 − 1* = ? Tap the answer.',shuffle([num(4,1),num(6),num(3)])),R.tap('*3 − 3* = ? Tap the answer.',shuffle([num(0,1),num(3),num(6)])),R.tap('*7 − 2* = ? Tap the answer.',shuffle([num(5,1),num(9),num(4)])),
  R.pop('Pop *3* balloons.',['*balloon::#ff6b6b','*balloon::#4fb3ff','*balloon::#5cc46a','*balloon::#ffd43b','*balloon::#b07cff'],{need:3})],
 tries:[['Act it out: 4 kids, 1 goes home. How many left?','*3*'],['Make a take-away story.','e.g. 5 leaves, 2 blow away']]});

/* 7 ─ Graphs */
U({id:'m07',title:'Sort and graph',strand:'Numbers',codes:[FR,PS],
 guide:{goal:'Sort objects, make simple graphs with real objects or pictures, and read them to tell which has the most, the fewest, or the same.',words:'graph, most, fewest, same, tally, survey',ask:['Which has the most?','How many more apples than bananas?','What question could we ask our class?'],home:'Make a sock graph: line up socks by colour. Which colour has the most?'},
 watch:['Line them up and compare!','The tallest stack has the most.'],
 fig:'A picture graph of favourite fruits.',
 page:{story:{title:'Favourite Fruit Day',text:'Ms. Rose asked the class, "What is your favourite *fruit*?" Each child put a sticker on the *graph*. *Apples* got *5* stickers. *Bananas* got *3*. *Strawberries* got *6*! "Which fruit is the *favourite*?" asked Ms. Rose. "*Strawberries*! They have the *most*!" shouted Kai. "Bananas have the *fewest*," said Zoe. So for snack, they ate… strawberries!',pics:['apple','banana','strawberry','teacher'],
   acts:[[null,'classroom',['teacher','apple'],'What is your favourite?'],['Strawberries','classroom',['strawberry:big','girl'],'The most!'],['snack','kitchen',['strawberry','boy','girl'],'Yum!']]},
  boxes:[{title:'Our fruit graph',ex:[['apple','*5*'],['banana','*3*'],['strawberry','*6*']],cols:3},
   {title:'Graph words',lines:['*most*: the tallest stack','*fewest*: the shortest stack','*same*: equal stacks']}],
  cards:[{q:'Which got the most stickers?',pics:['strawberry'],a:'*strawberries*'},{q:'How many more apples than bananas?',a:'*2*'}],
  words:[['graph','a picture that shows and compares numbers'],['most','the biggest amount']]},
 steps:[
  {say:'Read the story',speech:'Apples got five stickers, bananas three, strawberries six. Strawberries had the most and bananas the fewest.',set:S.row(['apple','banana','strawberry','teacher'])},
  {say:'The graph',speech:'Look at the stacks. Five apples, three bananas, six strawberries. The tallest stack is the favourite.',set:{custom:'bars',cats:['apple','banana','strawberry'],v:[5,3,6],title:'Favourite fruit'}},
  {say:'Count a stack',speech:'Tap each strawberry and count. Six!',set:S.count('strawberry',6)}],
 more:{title:'Did you know?',text:'Grown-ups use graphs too: to show the weather, scores in a hockey game and how tall you’re growing!',pics:['thermometer']},
 rounds:[R.look('Which fruit has the *most*? (apple 1, banana 2, strawberry 3)',['apple','banana','strawberry'],[1,2,3],3,{set:{custom:'bars',cats:['apple','banana','strawberry'],v:[5,3,6]}}),
  R.look('How many *bananas*?',['banana'],[2,3,4],3,{set:{custom:'bars',cats:['apple','banana','strawberry'],v:[5,3,6]}}),
  R.look('How many *apples*?',['apple'],[4,5,6],5,{set:{custom:'bars',cats:['apple','banana','strawberry'],v:[5,3,6]}}),
  R.look('Which pet has the *fewest*? (cat 1, dog 2, fish 3)',['cat','dog','fish'],[1,2,3],3,{set:{custom:'bars',cats:['cat','dog','fish'],v:[4,6,2]}}),
  R.look('How many *dogs*?',['dog'],[5,6,7],6,{set:{custom:'bars',cats:['cat','dog','fish'],v:[4,6,2]}}),
  R.feed('Sort: put the *red* things in the basket.','basket',['*apple','*strawberry','*cherries','banana','leaf']),R.tap('Tap the *tallest* stack.',['*block@1.6','block@.8','block@1.1']),R.tap('Tap the dice with the *most* dots.',['*dots:6','dots:2','dots:4'])],
 tries:[['Ask your family: cats or dogs? Make a graph.','tally marks!'],['Sort toys and stack them.','which has the most?']]});

/* 8 ─ Measuring */
U({id:'m08',title:'Long, heavy and full',strand:'Numbers',codes:[FR,PS],
 guide:{goal:'Compare and order objects by length, height, mass (heavy, light) and capacity (holds more, holds less), and measure with non-standard units like blocks or paper clips.',words:'long, short, heavy, light, full, empty, holds more, measure',ask:['Which is longer?','How many blocks long is the pencil?','Which holds more water?'],home:'Measure a toy with paper clips. How many clips long is it?'},
 watch:['Measure with blocks!','The snake is 6 blocks long. The worm is only 2!'],
 fig:'A snake measured with blocks.',
 page:{story:{title:'Snake and Worm Measure Up',text:'*Snake* and *Worm* argued. "I’m *longer*!" said Worm. "No, I am!" said Snake. Owl brought *blocks*. Snake was *6 blocks* long. Worm was *2 blocks* long. "Snake is longer," hooted Owl. Then they weighed things on a *balance*: a rock was *heavy* and went *down*. A feather was *light* and went *up*. Last, they filled cups: the big cup *held more* water!',pics:['snake','worm','owl','balance'],
   acts:[[null,'garden',['snake','worm'],'I’m longer!'],['blocks','garden',['block','owl'],'Let’s measure!'],['balance','garden',['balance','rock','feather'],'Heavy goes down!'],['held more','garden',['cup','droplet'],'More water!']]},
  boxes:[{title:'Compare',ex:[['snake','*long*'],['worm','*short*'],['rock','*heavy*'],['feather','*light*']],cols:4},
   {title:'Measure with',lines:['blocks, paper clips, hands, feet','line them up with *no gaps*']}],
  cards:[{q:'Which is heavier, an elephant or a mouse?',pics:['elephant','mouse'],a:'an *elephant*'},{q:'Which holds more, a bathtub or a cup?',a:'a *bathtub*'}],
  words:[['measure','find out how long, heavy or full something is'],['heavy','hard to lift']]},
 steps:[
  {say:'Read the story',speech:'Snake was six blocks long and Worm was two. A rock was heavy and a feather was light. The big cup held more water.',set:S.row(['snake','worm','owl','balance'])},
  {say:'Measure with blocks',speech:'Count the blocks along the ribbon. One, two, three, four, five, six. Six blocks long!',set:{custom:'units',n:6,obj:'ribbon'}},
  {say:'Heavy or light',speech:'The heavy side goes down. Tap the heavy thing!',set:S.tap(['*rock@1.3','feather','leaf'],{layout:'row'})}],
 more:{title:'Body measuring',text:'How many of *your feet* long is your bed? How many of a *grown-up’s* feet? Why are they different?',pics:['boot']},
 rounds:[R.one('Which is *heavier*?','elephant',['mouse','feather']),R.one('Which is *lighter*?','feather',['rock','car']),R.tap('Tap the *longest* snake.',['*snake@1.6','snake@.8','snake@1.1']),
  R.tap('Tap the *shortest* pencil.',['*pencil@.6','pencil@1.3','pencil@1']),R.one('Which holds *more* water?','bucket',['cup','spoon']),R.one('Which holds *less*?','spoon',['bucket','bathtub']),
  R.look('How many blocks long?',[],[3,4,5],4,{set:{custom:'units',n:4,obj:'ribbon'}}),R.look('How many blocks long?',[],[5,6,7],6,{set:{custom:'units',n:6,obj:'ribbon'}}),R.tap('Tap the *tallest* tower.',['*block@1.7','block@1','block@.7'])],
 tries:[['Find something longer than your arm.','a broom!'],['Which is heavier: a book or a sock?','hold one in each hand']]});

/* 9 ─ Time */
U({id:'m09',title:'Time: day, night and o’clock',strand:'Numbers',codes:[FR],
 guide:{goal:'Order daily events (morning, afternoon, night), name the days of the week, and read a clock to the hour.',words:'morning, afternoon, night, o’clock, clock, days of the week',ask:['What do you do in the morning?','What time is it when the short hand points to 3 and the long hand to 12?','What day comes after Monday?'],home:'Make a picture schedule of your day.'},
 watch:['Tick tock!','When the long hand points to 12, it is something o’clock.'],
 fig:'A friendly clock showing 7 o’clock.',
 page:{story:{title:'Rooster’s Busy Day',text:'At *7 o’clock* in the *morning*, Rooster crowed: "*Cock-a-doodle-doo!*" Time to wake up! At *12 o’clock*, it was *lunch*. In the *afternoon*, Rooster played tag with the piglets. At *6 o’clock*, it was dinner. When the *Moon* came out at *night*, Rooster yawned. "Same time tomorrow!" And on *Monday*, *Tuesday* and every day after, Rooster woke the farm on time.',pics:['chicken','clock','sun','moon'],
   acts:[[null,'farm',['chicken','sun'],'Cock-a-doodle-doo!'],['lunch','farm',['clock','sandwich'],'12 o’clock: lunch!'],['afternoon','farm',['pig','chicken'],'Tag!'],['night','night',['moon','chicken'],'Good night!']]},
  boxes:[{title:'My day',ex:[['sun','*morning*'],['sandwich','*noon*'],['moon','*night*']],cols:3},
   {title:'Days of the week',lines:['Sunday · Monday · Tuesday','Wednesday · Thursday','Friday · Saturday']}],
  cards:[{q:'When do you eat breakfast?',pics:['sun'],a:'in the *morning*'},{q:'How many days in a week?',a:'*7*'}],
  words:[['o’clock','on the hour, when the long hand points to 12'],['week','7 days in a row']]},
 steps:[
  {say:'Read the story',speech:'Rooster crowed at seven o’clock in the morning. Lunch was at twelve. Dinner was at six. At night he slept.',set:S.row(['chicken','clock','sun','moon'])},
  {say:'Seven o’clock',speech:'The long hand points to twelve. The short hand points to seven. It is seven o’clock!',set:{custom:'clock',h:7,m:0}},
  {say:'Morning, noon, night',speech:'Tap them in order: morning sun, lunch at noon, the night moon.',set:S.order(['sun','sandwich','moon'])}],
 more:{title:'Did you know?',text:'Long ago, before clocks, people told time by watching *shadows* move as the Sun crossed the sky!',pics:['sun']},
 rounds:[...[3,7,9,12].map(h=>R.look('What time is it?',[],[h+' o’clock',(h%12+2)+' o’clock',(h===1?5:h-1)+' o’clock'],h+' o’clock',{set:{custom:'clock',h,m:0}})),
  R.order('Tap in order: morning, noon, night.',['sun','sandwich','moon']),R.one('When do you go to *sleep*?','moon',['sun','sandwich']),R.one('When do you eat *breakfast*?','sun',['moon','star']),
  R.look('How many days in a week?',['calendar'],[5,7,10],7)],
 tries:[['What time do you go to bed?','e.g. 8 o’clock'],['Say the days of the week.','Sunday to Saturday']]});

/* 10 ─ Money */
U({id:'m10',title:'Coins and shopping',strand:'Numbers',codes:[FR,BC],
 guide:{goal:'Name Canadian coins (nickel, dime, quarter, loonie, toonie) and their pictures, and play store with simple prices.',words:'coin, nickel, dime, quarter, loonie, toonie, buy, price',ask:['Which coin has a loon on it?','Which coin is the biggest?','What can you buy for one dollar?'],home:'Play store with real coins: price toys at 1 or 2 dollars.'},
 watch:['Canadian coins!','A loonie has a loon. A toonie is worth two dollars. A quarter has a caribou.'],
 fig:'Canadian coins in a row.',
 page:{story:{title:'Lemonade Stand',text:'Hana and Jack set up a *lemonade stand*. A cup cost *one loonie*. The first customer paid with a *loonie*: the gold coin with a *loon* on it! The next paid with a *toonie*: "That’s *two* dollars, for two cups!" A little boy had *four quarters*. "Four quarters make a loonie!" said Hana. By the end of the day, their jar was jingling with *coins*.',pics:['lemonade','coin','girl','boy'],
   acts:[[null,'park',['lemonade','girl','boy'],'Lemonade!'],['loonie','park',['coin','woman'],'One loonie!'],['toonie','park',['coin','man'],'Two cups!'],['jingling','park',['jar','coin'],'Jingle!']]},
  boxes:[{title:'Canadian coins',ex:[['coin','*nickel* 5¢'],['coin','*dime* 10¢'],['coin','*quarter* 25¢'],['coin','*loonie* $1'],['coin','*toonie* $2']],cols:5}],
  cards:[{q:'Which coin has a loon?',a:'the *loonie*'},{q:'Which coin is worth 2 dollars?',a:'the *toonie*'}],
  words:[['coin','metal money'],['price','how much something costs']]},
 steps:[
  {say:'Read the story',speech:'A cup of lemonade cost one loonie. One customer paid with a toonie for two cups. Four quarters make a loonie.',set:S.row(['lemonade','coin','girl','boy'])},
  {say:'Meet the coins',speech:'Here are Canada’s coins: a nickel, a dime, a quarter, a loonie and a toonie.',set:{custom:'cash',cash:['nickel','dime','quarter','loonie','toonie'],show:false}},
  {say:'Buy it',speech:'The teddy costs two dollars. A toonie pays for it!',set:{custom:'cash',cash:['toonie'],price:200,item:'teddy',label:'$2'}}],
 more:{title:'Did you know?',text:'The *loonie* got its name from the *loon* bird on it. The *toonie* has a *polar bear*!',pics:['bird','polar bear']},
 rounds:[R.look('Which coin is the *toonie*?',[],['nickel','toonie','dime'],'toonie',{set:{custom:'cash',cash:['toonie'],show:false}}),R.look('Which coin is the *loonie*?',[],['loonie','quarter','dime'],'loonie',{set:{custom:'cash',cash:['loonie'],show:false}}),
  R.look('Which coin is the *dime*?',[],['dime','toonie','loonie'],'dime',{set:{custom:'cash',cash:['dime'],show:false}}),R.look('Which coin is the *quarter*?',[],['quarter','nickel','toonie'],'quarter',{set:{custom:'cash',cash:['quarter'],show:false}}),
  R.look('A lemonade costs $1. How many loonies?',[],[1,2,3],1,{set:{custom:'cash',cash:['loonie','loonie','loonie'],price:100,item:'lemonade',show:false}}),
  R.look('A toy costs $2. How many loonies?',[],[1,2,3],2,{set:{custom:'cash',cash:['loonie','loonie','loonie'],price:200,item:'toy',show:false}}),
  R.feed('Put *3* coins in the piggy bank.','jar',['*coin','*coin','*coin','ball','leaf'],{need:3,count:true}),R.look('Which coin has a *loon* on it?',[],['loonie','toonie','dime'],'loonie')],
 tries:[['Sort coins by size.','dime is the smallest!'],['Play store: price 3 toys.','$1 or $2']]});
})();
