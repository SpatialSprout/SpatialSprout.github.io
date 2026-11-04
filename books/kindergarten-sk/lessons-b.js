/* The Interactive Classroom: Senior Kindergarten — Shapes and Patterns (2-D shapes, 3-D solids, patterns) and Letters and Sounds (letter sounds, ending sounds, short vowels, blending, word families, sight words) */
(function(){
"use strict";
const P=window.PM;if(!P||!P.unit||!P.PK)return;const U=P.unit,R=P.R,S=P.S;const {rnd,pick,shuffle}=P.PK;
const FR='Literacy & Math',PS='Problem Solving';
const C8=['#ff6b6b','#4fb3ff','#5cc46a','#ffb347','#b07cff','#ff6bb5','#26c6b0','#ffd43b'];
const B=(w,ok,i)=>(ok?'*':'')+'balloon:'+w+':'+C8[((i==null?w.length*3+w.charCodeAt(0):i))%8];
const K=(l,ok)=>(ok?'*':'')+'block:'+l;
const SH=(k,c,ok)=>(ok?'*':'')+'shape:'+k+':'+c;const SO=(k,c,ok)=>(ok?'*':'')+'solid:'+k+':'+c;

/* 11 ─ 2-D shapes */
U({id:'m11',title:'Shapes: sides and corners',strand:'Shapes and Patterns',codes:[FR,PS],
 guide:{goal:'Name and describe 2-D shapes (circle, oval, triangle, square, rectangle, hexagon, star, heart) by their sides and corners, and make pictures with shapes.',words:'side, corner, circle, oval, triangle, square, rectangle, hexagon',ask:['How many sides does a hexagon have?','How is a square different from a rectangle?','What picture can you make with shapes?'],home:'Make a shape robot with cut-out paper shapes!'},
 watch:['Count the sides!','A triangle has 3 sides. A square has 4 equal sides. A hexagon has 6 sides, like a honeycomb.'],
 fig:'A robot built from shapes.',
 page:{story:{title:'Robo the Shape Robot',text:'Zoe built a robot out of *shapes*. Its head was a *square*. Its eyes were two *circles*. Its nose was a *triangle*. Its body was a long *rectangle*. Its buttons were *hexagons*, like a bee’s honeycomb. And right in the middle, Zoe put a red *heart*. "Hello, *Robo*!" Robo beeped and waved his rectangle arms. *Beep boop!*',pics:['robot','girl','bee','heart'],
   acts:[[null,'playroom',['robot','girl'],'Let’s build!'],['triangle','playroom',['robot:big'],'Square head, triangle nose!'],['honeycomb','garden',['beehive','bee'],'Hexagons!'],['heart','playroom',['robot','heart'],'Beep boop!']]},
  boxes:[{title:'Count sides',ex:[['triangle','*3* sides'],['square','*4* sides'],['rectangle','*4* sides'],['circle','*0* corners']],cols:4},
   {title:'Square or rectangle?',lines:['square: *4 equal* sides','rectangle: 2 long + 2 short sides','both have *4 corners*']}],
  cards:[{q:'How many sides on a triangle?',pics:['triangle'],a:'*3*'},{q:'Which shape has no corners?',pics:['circle'],a:'a *circle*'}],
  words:[['side','a straight edge of a shape'],['corner','where two sides meet']]},
 steps:[
  {say:'Read the story',speech:'Robo had a square head, circle eyes, a triangle nose, a rectangle body, hexagon buttons and a heart.',set:S.row(['robot','girl','bee','heart'])},
  {say:'Meet the shapes',speech:'Tap each shape. Circle, triangle, square, rectangle, hexagon.',set:S.tap([SH('circle','#ff6b6b'),SH('triangle','#5cc46a'),SH('square','#4fb3ff'),SH('rectangle','#ffb347'),SH('hexagon','#ffd43b')],{layout:'row',free:true})},
  {say:'Find four sides',speech:'Tap the shapes with four sides: the square and the rectangle.',set:S.tap([SH('square','#4fb3ff',1),SH('rectangle','#ffb347',1),SH('triangle','#5cc46a'),SH('circle','#ff6b6b')],{layout:'row'})}],
 more:{title:'Did you know?',text:'Bees build their honeycomb out of *hexagons*: six-sided shapes that fit together with no gaps!',pics:['bee','honey']},
 rounds:[R.tap('Tap the shapes with *3* sides.',[SH('triangle','#5cc46a',1),SH('triangle','#ff8fc7',1),SH('square','#4fb3ff'),SH('hexagon','#ffd43b')]),
  R.tap('Tap the *hexagon*.',[SH('hexagon','#ffd43b',1),SH('square','#4fb3ff'),SH('circle','#ff6b6b')]),R.tap('Tap the shapes with *no corners*.',[SH('circle','#ff6b6b',1),SH('oval','#b07cff',1),SH('triangle','#5cc46a'),SH('square','#4fb3ff')]),
  R.tap('Tap the *rectangle*.',[SH('rectangle','#ffb347',1),SH('square','#4fb3ff'),SH('diamond','#26c6b0')]),R.tap('Tap the *oval*.',[SH('oval','#b07cff',1),SH('circle','#ff6b6b'),SH('heart','#ff6bb5')]),
  R.look('How many *sides* does a square have?',[SH('square','#4fb3ff')],[3,4,5],4),R.look('How many *sides* does a hexagon have?',[SH('hexagon','#ffd43b')],[4,5,6],6),
  R.one('Which thing is shaped like a *rectangle*?','book',['ball','pizza']),R.one('Which thing is shaped like a *circle*?','clock',['book','door'])],
 tries:[['Make a picture with 5 shapes.','a house, a car, a cat…'],['Count corners on a book.','*4*']]});

/* 12 ─ 3-D solids */
U({id:'m12',title:'Solids: roll, stack, slide',strand:'Shapes and Patterns',codes:[FR,PS],
 guide:{goal:'Name 3-D solids (sphere, cube, cone, cylinder, pyramid), find them in real life, and test which ones roll, stack or slide.',words:'sphere, cube, cone, cylinder, pyramid, roll, stack, slide, flat face',ask:['Which solid rolls?','Which one is like a can?','Why can a cube stack?'],home:'Find solids in the kitchen: a can (cylinder), an orange (sphere), a box (cube)!'},
 watch:['Roll, stack, slide!','A ball is a sphere: it rolls. A box is a cube: it stacks.'],
 fig:'Colourful solids on a ramp.',
 page:{story:{title:'The Solid Olympics',text:'Welcome to the *Solid Olympics*! First, the *rolling race*. *Sphere* zoomed down the ramp. *Cylinder* rolled too, on its side. *Cube* just sat there. "I don’t roll!" Next, the *stacking contest*. Cube stacked high: one, two, three! *Cone* wore a party hat… because it *is* one! *Pyramid* stood tall like in *Egypt*. Everyone got a medal!',pics:['ball','box','ice cream','pyramid'],
   acts:[[null,'park',['ramp','ball'],'Rolling race!'],['stacking contest','playroom',['block','block','block'],'Stack it up!'],['party hat','playroom',['ice cream','gift'],'Party hat!'],['medal','park',['medal','trophy'],'Medals for everyone!']]},
  boxes:[{title:'Solids',ex:[['ball','*sphere*'],['box','*cube*'],['ice cream','*cone*'],['can','*cylinder*'],['pyramid','*pyramid*']],cols:5},
   {title:'What can it do?',lines:['*roll*: sphere, cylinder, cone','*stack*: cube, cylinder','*slide*: cube, pyramid']}],
  cards:[{q:'What solid is a ball?',pics:['ball'],a:'a *sphere*'},{q:'What solid is an ice cream cone?',pics:['ice cream'],a:'a *cone*'}],
  words:[['sphere','a round solid, like a ball'],['cube','a solid with 6 square faces, like a box']]},
 steps:[
  {say:'Read the story',speech:'Sphere and cylinder rolled down the ramp. Cube stacked high. Cone was a party hat, and pyramid stood tall.',set:S.row(['ball','box','ice cream','pyramid'])},
  {say:'Meet the solids',speech:'Tap each solid. Sphere, cube, cone, cylinder, pyramid.',set:S.tap([SO('sphere','#ff6b6b'),SO('cube','#4fb3ff'),SO('cone','#ffd43b'),SO('cylinder','#5cc46a'),SO('pyramid','#ffb347')],{layout:'row',free:true})},
  {say:'Which ones roll?',speech:'Tap the solids that can roll: the sphere, the cylinder and the cone.',set:S.tap([SO('sphere','#ff6b6b',1),SO('cube','#4fb3ff'),SO('cylinder','#5cc46a',1),SO('cone','#ffd43b',1)],{layout:'row'})}],
 more:{title:'Did you know?',text:'The *pyramids* in Egypt are giant stone solids more than *4 000* years old!',pics:['pyramid']},
 rounds:[R.tap('Tap the *sphere*.',[SO('sphere','#ff6b6b',1),SO('cube','#4fb3ff'),SO('cone','#ffd43b')]),R.tap('Tap the *cube*.',[SO('cube','#4fb3ff',1),SO('cylinder','#5cc46a'),SO('pyramid','#ffb347')]),
  R.tap('Tap the *cylinder*.',[SO('cylinder','#5cc46a',1),SO('cone','#ffd43b'),SO('sphere','#b07cff')]),R.tap('Tap the *cone*.',[SO('cone','#ffd43b',1),SO('pyramid','#ffb347'),SO('cube','#ff6bb5')]),
  R.tap('Tap the solids that *stack*.',[SO('cube','#4fb3ff',1),SO('cube','#ff6bb5',1),SO('sphere','#ff6b6b'),SO('cone','#ffd43b')]),R.one('Which is shaped like a *sphere*?','ball',['box','book']),
  R.one('Which is shaped like a *cylinder*?','can',['ball','pyramid']),R.one('Which is shaped like a *cone*?','ice cream',['box','ball'])],
 tries:[['Build a tower with 3 different solids.','which one goes on top?'],['Roll a ball and a box. What happens?','the box slides!']]});

/* 13 ─ Patterns */
U({id:'m13',title:'Patterns: ABB, ABC and growing',strand:'Shapes and Patterns',codes:[FR,PS],
 guide:{goal:'Find the core of a repeating pattern (AB, ABB, ABC), extend and fix patterns, and notice simple growing patterns.',words:'pattern, core, repeat, ABB, ABC, growing',ask:['What is the part that repeats?','What is missing?','How does this pattern grow?'],home:'Make a bead necklace with an ABC pattern: red, blue, yellow!'},
 watch:['Find the core!','Duck, duck, goose, duck, duck, goose: the core is duck, duck, goose.'],
 fig:'A pattern with a missing piece.',
 page:{story:{title:'Duck, Duck, Goose!',text:'The class played *Duck, Duck, Goose*. Tap, tap: "*Duck, duck, GOOSE!*" Run! Ms. Bell said, "That is a *pattern*! The *core* is *duck, duck, goose*, and it *repeats*." Then they made patterns with blocks: *red, blue, yellow, red, blue, yellow*. That’s *ABC*! Finally, they built *stairs*: 1 block, 2 blocks, 3 blocks… a *growing* pattern!',pics:['duck','goose','block','teacher'],
   acts:[[null,'park',['duck','goose','girl'],'Duck, duck, GOOSE!'],['core','classroom',['teacher','block'],'It repeats!'],['ABC','classroom',['block','block','block'],'Red, blue, yellow!'],['growing','playroom',['block:big','boy'],'1, 2, 3!']]},
  boxes:[{title:'Kinds of patterns',lines:['*AB*: ⭐ ❤ ⭐ ❤','*ABB*: 🦆 🦆 🪿 → duck, duck, goose','*ABC*: 🔴 🔵 🟡 🔴 🔵 🟡','*growing*: 1, 2, 3, 4…']}],
  cards:[{q:'Clap, stomp, stomp, clap, stomp, ?',a:'*stomp*'},{q:'What is the core of AB AB AB?',a:'*A B*'}],
  words:[['core','the part of a pattern that repeats'],['growing pattern','a pattern that gets bigger each time']]},
 steps:[
  {say:'Read the story',speech:'Duck, duck, goose is a pattern with the core duck, duck, goose. Red, blue, yellow is an A B C pattern. Stairs make a growing pattern.',set:S.row(['duck','goose','block','teacher'])},
  {say:'Duck, duck, goose',speech:'Duck, duck, goose, duck, duck… what comes next? Goose!',set:S.gap(['duck','duck','goose','duck','duck','?'],['*goose','duck','chick'])},
  {say:'A B C',speech:'Red, blue, yellow, red, blue… what comes next?',set:S.gap([SH('circle','#ff6b6b'),SH('circle','#4fb3ff'),SH('circle','#ffd43b'),SH('circle','#ff6b6b'),SH('circle','#4fb3ff'),'?'],[SH('circle','#ffd43b',1),SH('circle','#ff6b6b'),SH('circle','#4fb3ff')],{s:.8})}],
 more:{title:'Music patterns',text:'Play a pattern on a drum: *boom, tap, tap, boom, tap, tap*. Your friend copies it!',pics:['drum']},
 rounds:[R.gap('What comes next?',['cat','dog','dog','cat','dog','?'],['*dog','cat','fish']),R.gap('What comes next?',['apple','banana','cherries','apple','banana','?'],['*cherries','apple','banana']),
  R.gap('What is missing?',['star','moon','sun','star','?','sun'],['*moon','star','cloud']),R.gap('What comes next?',[SH('triangle','#5cc46a'),SH('triangle','#5cc46a'),SH('square','#4fb3ff'),SH('triangle','#5cc46a'),SH('triangle','#5cc46a'),'?'],[SH('square','#4fb3ff',1),SH('triangle','#5cc46a'),SH('circle','#ff6b6b')],{s:.8}),
  R.gap('What comes next?',['dots:1','dots:2','dots:3','?'],['*dots:4','dots:1','dots:6']),R.gap('What comes next?',['dots:2','dots:4','?'],['*dots:6','dots:3','dots:1']),
  R.gap('What is missing?',['frog','?','fish','frog','duck','fish'],['*duck','frog','cat']),R.gap('What comes next?',['sun','sun','moon','sun','sun','?'],['*moon','sun','star'])],
 tries:[['Make an ABB pattern with toys.','car, ball, ball…'],['Draw a growing pattern of dots.','1, 2, 3, 4']]});

/* 14 ─ Letter sounds */
U({id:'m14',title:'Every letter has a sound',strand:'Letters and Sounds',codes:[FR],
 guide:{goal:'Say the most common sound for each letter, and match beginning sounds to letters.',words:'letter, sound, beginning sound, alphabet',ask:['What sound does F make?','What letter makes the sss sound?','What starts with the same sound as your name?'],home:'Sing the alphabet with sounds: a says /a/, b says /b/…'},
 watch:['Letters say sounds!','F says fff, like fish. S says sss, like snake.'],
 fig:'Letter blocks with pictures that start with their sounds.',
 page:{story:{title:'The Sound Zoo Train',text:'At the *Sound Zoo*, each animal could only say its *first sound*! *Fish* said "*fff*." *Snake* said "*sss*." *Lion* said "*lll*." *Monkey* said "*mmm*." *Dog* said "*d-d-d*." The zookeeper laughed. "You’re all saying your *letter sounds*!" She held up blocks: *F*, *S*, *L*, *M*, *D*. "Now let’s ride the *Sound Train*!" *Ch-ch-ch*!',pics:['fish','snake','lion','monkey'],
   acts:[[null,'underwater',['fish'],'Fff!'],['Snake','jungle',['snake'],'Sss!'],['Lion','savannah',['lion'],'Lll!'],['Sound Train','town',['train','monkey'],'Ch-ch-ch!']]},
  boxes:[{title:'Letter sounds',ex:[['fish','*f* fff'],['snake','*s* sss'],['lion','*l* lll'],['monkey','*m* mmm'],['dog','*d* d-d']],cols:5}],
  cards:[{q:'What sound does “fish” start with?',pics:['fish'],a:'*f*, fff'},{q:'Which letter starts “rabbit”?',pics:['rabbit'],a:'*R*'}],
  words:[['sound','what a letter says'],['beginning','the very start of a word']]},
 steps:[
  {say:'Read the story',speech:'Fish said fff, snake said sss, lion said lll and monkey said mmm. Each letter has a sound.',set:S.row(['fish','snake','lion','monkey'])},
  {say:'Match the sound',speech:'Fish starts with fff. Which letter makes fff? Tap the F!',set:S.gap(['fish','?'],[K('F',1),K('S'),K('M')])},
  {say:'Sound hunt',speech:'Tap all the things that start with sss, like snake.',set:S.tap(['*sun','*socks','*star','fish'],{layout:'row'})}],
 more:{title:'Sound jar',text:'Make a *sound jar* for one letter. Fill it with small things that start with that sound!',pics:['jar']},
 rounds:[...[['fish','F'],['snake','S'],['lion','L'],['monkey','M'],['dog','D'],['rabbit','R'],['penguin','P'],['tiger','T']].map(([p,l])=>R.gap('Which letter does *'+p+'* start with?',[p,'?'],shuffle([K(l,1),...shuffle('BCGHJKNVWZ'.split('')).slice(0,2).map(x=>K(x))]))),
  R.feed('Feed the fish things that start with *f*.','fish',['*fork','*flower','*feather','ball','apple'])],
 tries:[['Say the sound of each letter in your name.','M-a-y-a'],['Find something that starts with b-b-b.','ball, book, bed']]});

/* 15 ─ Ending sounds */
U({id:'m15',title:'Listen to the end',strand:'Letters and Sounds',codes:[FR],
 guide:{goal:'Hear the last sound in short words (cat, bus, pig) and match it to a letter.',words:'ending sound, last sound, end',ask:['What sound do you hear at the end of bus?','Does dog end with g?','Which word ends like cat?'],home:'Say a word and stretch it out: c-a-t. What is the last sound?'},
 watch:['Listen to the end!','Ca-T: t is the last sound. Bu-S: s is the last sound.'],
 fig:'A cat, a bus and a pig with their last letters glowing.',
 page:{story:{title:'Pig’s Last Sound Game',text:'*Pig* loved riddles. "I’m thinking of something that ends with *t*. It says meow." "*Cat*!" said Duck. "Now something that ends with *s*. It takes you to school." "*Bus*!" "Something that ends with *g*. That’s… *me*!" laughed *Pig*. Duck flapped. "Now me: ends with *k*… *duck*!" They played *ending sounds* all afternoon.',pics:['pig','duck','cat','bus'],
   acts:[[null,'farm',['pig','duck'],'Riddle time!'],['Cat','farm',['cat'],'Meow! Ends with t!'],['Bus','town',['bus'],'Ends with s!'],['me','farm',['pig:big'],'Pig ends with g!']]},
  boxes:[{title:'Last sounds',ex:[['cat','ca*t*'],['bus','bu*s*'],['pig','pi*g*'],['sun','su*n*'],['cup','cu*p*']],cols:5}],
  cards:[{q:'What is the last sound in “dog”?',pics:['dog'],a:'*g*'},{q:'What is the last sound in “sun”?',pics:['sun'],a:'*n*'}],
  words:[['ending sound','the last sound in a word'],['riddle','a fun guessing question']]},
 steps:[
  {say:'Read the story',speech:'Pig played riddles. Cat ends with t. Bus ends with s. Pig ends with g. Duck ends with k.',set:S.row(['pig','duck','cat','bus'])},
  {say:'C-a-t',speech:'Cat. C, a, t. The last sound is t. Tap the letter t.',set:S.gap(['cat','block:c','block:a','?'],[K('t',1),K('s'),K('g')])},
  {say:'Ends with g',speech:'Pig and dog end with g. Tap them!',set:S.tap(['*pig','*dog','cat','bus'],{layout:'row'})}],
 more:{title:'Stretch it',text:'Stretch words like gum: *ssssuuuunnnn*. Now say the very last sound: *n*!',pics:['sun']},
 rounds:[...[['cat','t'],['bus','s'],['pig','g'],['sun','n'],['cup','p'],['dog','g'],['fox','x'],['bed','d']].map(([p,l])=>R.gap('What is the *last* sound in '+p+'?',[p,'?'],shuffle([K(l,1),...shuffle('bmrkfl'.split('').filter(x=>x!==l)).slice(0,2).map(x=>K(x))]))),
  R.tap('Tap the words that end with *t*.',['*cat','*hat','dog','*bat'])],
 tries:[['Find 3 things that end with t.','cat, hat, coat'],['What sound ends your name?','e.g. Sam ends with m']]});

/* 16 ─ Short vowels */
U({id:'m16',title:'Short vowels: a, e, i, o, u',strand:'Letters and Sounds',codes:[FR],
 guide:{goal:'Know the five vowels and their short sounds (a in apple, e in egg, i in igloo, o in octopus, u in umbrella), and hear them in the middle of short words.',words:'vowel, a, e, i, o, u, short sound, middle',ask:['What are the five vowels?','What vowel do you hear in “pig”?','What sound does o make in “octopus”?'],home:'Sing: a, a, apple; e, e, egg; i, i, igloo; o, o, octopus; u, u, umbrella!'},
 watch:['A, E, I, O, U!','Every word needs a vowel. Cat has a, bed has e, pig has i.'],
 fig:'Five vowel friends: an apple, an egg, an igloo, an octopus and an umbrella.',
 page:{story:{title:'The Vowel Friends',text:'Five friends lived on *Vowel Street*. *Apple Annie* said "*a, a, a*." *Eggy Ed* said "*e, e, e*." *Igloo Izzy* said "*i, i, i*." *Octopus Ollie* said "*o, o, o*." And *Umbrella Ulu* said "*u, u, u*." Every word in town needed one of them to *work*! "Without me, *cat* is just *c-t*!" said Annie. So the friends helped every word on the street.',pics:['apple','egg','igloo','octopus'],
   acts:[[null,'town',['apple','egg'],'A and E!'],['Igloo','arctic',['igloo'],'I, i, i!'],['Octopus','underwater',['octopus'],'O, o, o!'],['Umbrella','town',['umbrella'],'U, u, u!']]},
  boxes:[{title:'Short vowels',ex:[['apple','*a*'],['egg','*e*'],['igloo','*i*'],['octopus','*o*'],['umbrella','*u*']],cols:5},
   {title:'In the middle',lines:['c*a*t · b*e*d · p*i*g','d*o*g · s*u*n']}],
  cards:[{q:'What vowel is in “sun”?',pics:['sun'],a:'*u*'},{q:'What vowel is in “bed”?',pics:['bed'],a:'*e*'}],
  words:[['vowel','a, e, i, o, u: letters every word needs'],['short sound','a quick vowel sound, like a in apple']]},
 steps:[
  {say:'Read the story',speech:'Apple Annie, Eggy Ed, Igloo Izzy, Octopus Ollie and Umbrella Ulu are the vowel friends. Every word needs one.',set:S.row(['apple','egg','igloo','octopus'])},
  {say:'Meet the vowels',speech:'Tap each vowel balloon and say its sound: a, e, i, o, u.',set:S.tap([B('a',0,0),B('e',0,1),B('i',0,2),B('o',0,3),B('u',0,4)],{layout:'row',free:true})},
  {say:'In the middle',speech:'P, i, g. Pig! The middle sound is i. Tap the i.',set:S.gap(['pig','block:p','?','block:g'],[K('i',1),K('a'),K('o')])}],
 more:{title:'Vowel song',text:'Sing to *Old MacDonald*: “A, E, I, O, U… A, E, I, O, U!”',pics:['musical note']},
 rounds:[...[['cat','c','a','t'],['bed','b','e','d'],['pig','p','i','g'],['dog','d','o','g'],['sun','s','u','n'],['hat','h','a','t'],['fox','f','o','x'],['cup','c','u','p']].map(([w,a,v,c])=>R.gap('What is the middle sound in *'+w+'*?',[w,'block:'+a,'?','block:'+c],shuffle([K(v,1),...shuffle('aeiou'.split('').filter(x=>x!==v)).slice(0,2).map(x=>K(x))]))),
  R.pop('Pop the *vowels*!',[B('a',1,0),B('e',1,1),B('b',0,2),B('o',1,3),B('t',0,4),B('m',0,5)])],
 tries:[['Find a vowel in your name.','Maya has a!'],['Say: apple, egg, igloo, octopus, umbrella.','a, e, i, o, u']]});

/* 17 ─ Blending CVC words */
U({id:'m17',title:'Blend it: c-a-t, cat!',strand:'Letters and Sounds',codes:[FR],
 guide:{goal:'Blend three sounds together to read short words (consonant-vowel-consonant) like cat, sun and pig, and build words with letter blocks.',words:'blend, sound out, word, c-a-t',ask:['What word do s-u-n make?','Can you build “map” with blocks?','How do you sound out a new word?'],home:'Use magnet letters: make cat, then change c to h. What word now?'},
 watch:['Say each sound, then push them together!','c… a… t… cat!'],
 fig:'Three letter blocks sliding together into a word.',
 page:{story:{title:'Robot Talk',text:'*Robo* the robot talked in *sounds*. "*D… o… g*," he beeped. Mia thought hard. "*Dog*!" "*C… a… t*." "*Cat*!" Mia laughed. "You talk in *pieces*, Robo!" "*S… u… n*." "*Sun*!" Then Mia tried. "*P… i… g*." Robo’s lights flashed. "*PIG*! Blending is *fun*!" Now Mia can read lots of little words all by herself.',pics:['robot','girl','dog','cat'],
   acts:[[null,'playroom',['robot','girl'],'D… o… g!'],['Dog','playroom',['dog','girl'],'Dog!'],['Sun','park',['sun','robot'],'S… u… n!'],['PIG','farm',['pig:big','robot'],'Blending is fun!']]},
  boxes:[{title:'Blend the sounds',lines:['*c* + *a* + *t* = *cat*','*s* + *u* + *n* = *sun*','*p* + *i* + *g* = *pig*']}],
  cards:[{q:'b-e-d makes…',pics:['bed'],a:'*bed*'},{q:'h-a-t makes…',pics:['hat'],a:'*hat*'}],
  words:[['blend','push sounds together to make a word'],['sound out','say each sound in a word slowly']]},
 steps:[
  {say:'Read the story',speech:'Robo talked in sounds: d, o, g. Mia blended them: dog! Then cat, sun and pig.',set:S.row(['robot','girl','dog','cat'])},
  {say:'Blend cat',speech:'Tap each block and say its sound: c, a, t. Now say them fast: cat!',set:S.tap(['block:c','block:a','block:t','cat'],{layout:'row',free:true})},
  {say:'Which word?',speech:'S, u, n. What did you make? Tap the picture!',set:S.tap(['*sun','sock','bus'],{layout:'row'})}],
 more:{title:'Word slide',text:'Make a slide with your arm: put a sound on your shoulder, one on your elbow, one on your hand. Then *slide* down and say the word!',pics:['hand']},
 rounds:[...[['c-a-t','cat',['dog','hat']],['s-u-n','sun',['star','bus']],['p-i-g','pig',['cow','pan']],['d-o-g','dog',['cat','duck']],['b-e-d','bed',['bus','box']],['b-u-s','bus',['bed','ball']],['h-a-t','hat',['cat','hen']],['f-o-x','fox',['fish','box']]].map(([s,w,o])=>R.one('Blend it: *'+s+'*. Tap the picture!',w,o)),
  R.gap('Build *pig*: p, i, ?',['pig','block:p','block:i','?'],[K('g',1),K('t'),K('n')])],
 tries:[['Sound out your toys’ names.','b-a-l-l'],['Build 3 words with letter magnets.','cat, sun, pig']]});

/* 18 ─ Word families */
U({id:'m18',title:'Word families',strand:'Letters and Sounds',codes:[FR],
 guide:{goal:'Read and make words in the same family (-at, -an, -ig, -op, -ug) by changing the first letter.',words:'word family, -at, -an, -ig, -op, -ug, rhyme',ask:['What words are in the -at family?','Change c in cat to h. What word?','How are word families like rhymes?'],home:'Make a word family house: -at on the roof, cat, hat, bat in the windows!'},
 watch:['Same end, new start!','c-at, h-at, b-at, m-at: the at family!'],
 fig:'A family of -at words living in a house.',
 page:{story:{title:'The At Family',text:'The *At family* lived in a little house. *Cat* sat on a *mat*. *Bat* hung by the window. *Rat* wore a *hat*. "We all end with *-at*!" said Mama At. Down the street lived the *Ig* family: *pig*, *wig* and *big*. "Let’s have a *party*!" said Pig. So the At family and the Ig family danced, *chat*ting and *jig*ging all night.',pics:['cat','bat','hat','pig'],
   acts:[[null,'home',['cat','house'],'The At family!'],['Rat','home',['mouse','hat'],'Rat in a hat!'],['Ig','farm',['pig'],'The Ig family!'],['party','home',['cat','pig','bat'],'Party!']]},
  boxes:[{title:'-at family',ex:[['cat','c*at*'],['hat','h*at*'],['bat','b*at*'],['mouse','r*at*']],cols:4},
   {title:'More families',lines:['*-ig*: pig, wig, big, dig','*-op*: mop, top, hop','*-ug*: bug, rug, hug, mug']}],
  cards:[{q:'Change c in cat to m. What word?',a:'*mat*'},{q:'Which family has “bug”?',pics:['bug'],a:'*-ug*'}],
  words:[['word family','words with the same ending, like cat, hat, bat'],['change','swap one letter for another']]},
 steps:[
  {say:'Read the story',speech:'Cat, bat, rat and hat were the At family. Pig, wig and big were the Ig family. They had a party.',set:S.row(['cat','bat','hat','pig'])},
  {say:'Change the start',speech:'Cat. Change the c to h. Now it says hat! Tap the h.',set:S.gap(['hat','?','block:at'],[K('h',1),K('c'),K('b')])},
  {say:'The ig family',speech:'Pig and wig and big. Tap the pig!',set:S.tap(['*pig','cat','bus'],{layout:'row'})}],
 more:{title:'Flip book',text:'Make a flip book: write *-at* on the right, and flip letters on the left: c, h, b, m, s, r!',pics:['book']},
 rounds:[R.gap('Make *hat*: ?-at',['hat','?','block:at'],[K('h',1),K('p'),K('d')]),R.gap('Make *bat*: ?-at',['bat','?','block:at'],[K('b',1),K('s'),K('t')]),
  R.gap('Make *pig*: ?-ig',['pig','?','block:ig'],[K('p',1),K('h'),K('c')]),R.gap('Make *mop*: ?-op',['mop','?','block:op'],[K('m',1),K('d'),K('g')]),
  R.gap('Make *bug*: ?-ug',['ladybug','?','block:ug'],[K('b',1),K('f'),K('p')]),R.tap('Tap the *-at* family.',['*cat','*hat','*bat','pig','sun']),
  R.tap('Tap the *-ig* family.',['*pig','cat','sun','dog']),R.gap('What is the family? cat, hat, b…',['cat','hat','?'],['*bat','dog','sun'])],
 tries:[['How many -an words can you make?','can, fan, man, pan, van'],['Make a silly sentence with -at words.','The cat in a hat sat on a mat!']]});

/* 19 ─ Sight words */
U({id:'m19',title:'Super sight words',strand:'Letters and Sounds',codes:[FR],
 guide:{goal:'Read high-frequency sight words by sight (I, a, the, see, like, can, is, my, to, and) and find them in simple sentences.',words:'sight word, I, a, the, see, like, can, is, my, and',ask:['Can you find “the” on this page?','What does “I like” mean?','Which word is “can”?'],home:'Put sight words on sticky notes around the house. Read one each time you pass!'},
 watch:['Know it at a glance!','Some words we see so often, we just know them: I, the, see, like.'],
 fig:'Balloons with sight words floating up.',
 page:{story:{title:'I Can See',text:'*I* *can* *see* *a* *dog*. *I* *can* *see* *the* *cat*. *I* *like* *my* *red* *ball*. *The* *dog* *is* *big*. *The* *cat* *is* *little*. *I* *like* *the* *dog* *and* *the* *cat*! Look: you just *read* a whole story with *super sight words*!',pics:['dog','cat','ball','eye'],
   acts:[[null,'park',['dog','eye'],'I can see a dog!'],['cat','park',['cat'],'I can see the cat!'],['ball','park',['ball','girl'],'I like my red ball!'],['read','park',['book','girl'],'I read it!']]},
  boxes:[{title:'Super sight words',lines:['*I* · *a* · *the* · *see* · *like*','*can* · *is* · *my* · *and* · *to*']},
   {title:'Read it!',lines:['I *see* a cat.','I *like* the dog.','My ball *is* red.']}],
  cards:[{q:'Read: I like the sun.',pics:['sun'],a:'*I like the sun.*'},{q:'Find “can”: I can hop.',a:'*can*'}],
  words:[['sight word','a word you know by seeing it, without sounding it out'],['read','look at words and know what they say']]},
 steps:[
  {say:'Read the story',speech:'I can see a dog. I can see the cat. I like my red ball. You read a whole story with sight words!',set:S.row(['dog','cat','ball','eye'])},
  {say:'Pop the words',speech:'Tap each balloon and read it: I, the, see, like, can.',set:S.tap([B('I',0,0),B('the',0,1),B('see',0,2),B('like',0,3),B('can',0,4)],{layout:'row',free:true})},
  {say:'Find “the”',speech:'Pop every balloon that says the.',set:S.tap([B('the',1,1),B('see',0,2),B('the',1,1),B('can',0,4),B('the',1,1)],{mode:'pop'})}],
 more:{title:'Word hunt',text:'Look in a picture book. How many times can you find *the*?',pics:['book']},
 rounds:[...['the','see','like','can','is','my','and','I'].map((w,i)=>R.pop('Pop the balloons that say *'+w+'*.',[B(w,1,i),B(w,1,i),...shuffle(['the','see','like','can','is','my','and','to','I','a'].filter(x=>x!==w)).slice(0,3).map((x,j)=>B(x,0,j+i+2))])),
  R.gap('I can ___ a cat.',['block:I','block:can','?','cat'],['*block:see','block:the','block:my'])],
 tries:[['Read: I see my mom.','point to each word'],['Write “I like” and draw what you like.','I like pizza!']]});
})();
