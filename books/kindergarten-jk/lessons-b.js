/* The Interactive Classroom: Junior Kindergarten — Letters and Sounds (the alphabet, letter names, first sounds, rhymes, syllables) and Words and Stories (big and little letters, story order) */
(function(){
"use strict";
const P=window.PM;if(!P||!P.unit||!P.PK)return;const U=P.unit,R=P.R,S=P.S;const {shuffle}=P.PK;
const FR='Literacy & Math',PS='Problem Solving';
const C8=['#ff6b6b','#4fb3ff','#5cc46a','#ffb347','#b07cff','#ff6bb5','#26c6b0','#ffd43b'];
const B=(l,ok)=>(ok?'*':'')+'balloon:'+l+':'+C8[(l.charCodeAt(0))%8];
const K=(l,ok)=>(ok?'*':'')+'block:'+l;
const AZ='ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const others=(l,n,lower)=>shuffle(AZ.filter(x=>x!==l.toUpperCase())).slice(0,n).map(x=>lower?x.toLowerCase():x);

/* 10 ─ The ABC song */
U({id:'k10',title:'Sing the ABCs',strand:'Letters and Sounds',codes:[FR],
 guide:{goal:'Say and sing the alphabet in order, and know that letters have names and make up words.',words:'alphabet, letter, ABC, order',ask:['What letter comes after A?','Which letter starts your name?','How many letters can you sing?'],home:'Sing the ABC song in the bath, in the car, at bedtime!'},
 watch:['A, B, C, D…','26 letters make the alphabet. Each letter has a name.'],
 fig:'Letter blocks in a long train.',
 page:{story:{title:'The Alphabet Train',text:'*Choo choo!* The *Alphabet Train* rolled into town. Car *A* carried an *apple*. Car *B* carried a *ball*. Car *C* carried a *cat*! "All aboard!" called the conductor. The children sang the *ABC song* as the train went by: "*A, B, C, D, E, F, G…*" All the way to *Z*! *Toot toot!*',pics:['train','apple','ball','cat'],
   acts:[[null,'town',['train:big'],'Choo choo!'],['Car A','town',['train','apple'],'A for apple!'],['Car B','town',['train','ball'],'B for ball!'],['ABC song','town',['girl','boy','train'],'A, B, C!']]},
  boxes:[{title:'A B C',ex:[['apple','*A*'],['ball','*B*'],['cat','*C*'],['dog','*D*'],['egg','*E*']],cols:5},
   {title:'26 letters',lines:['A B C D E F G','H I J K L M N O P','Q R S T U V','W X Y and Z!']}],
  cards:[{q:'What letter comes after A?',a:'*B*'},{q:'What is the last letter?',a:'*Z*'}],
  words:[['alphabet','all the letters, from A to Z'],['letter','a sign we use to write words']]},
 steps:[
  {say:'Read the story',speech:'The Alphabet Train had a car for every letter. A for apple, B for ball, C for cat. The children sang the A B C song all the way to Z.',set:S.row(['train','apple','ball','cat'])},
  {say:'Tap the letters',speech:'Tap each block to hear its name: A, B, C, D, E.',set:S.tap(['block:A','block:B','block:C','block:D','block:E'],{layout:'row',free:true})},
  {say:'What comes next?',speech:'A, B, C… which letter comes next? Tap it!',set:S.gap([K('A'),K('B'),K('C'),'?'],[K('D',1),K('M'),K('Z')])}],
 more:{title:'Letter hunt',text:'Find letters on cereal boxes, signs and books. Can you find an *A*?',pics:['book']},
 rounds:[R.gap('What comes next?',[K('A'),K('B'),'?'],[K('C',1),K('F'),K('X')]),R.gap('What is missing?',[K('D'),'?',K('F')],[K('E',1),K('B'),K('S')]),
  R.gap('What comes next?',[K('W'),K('X'),K('Y'),'?'],[K('Z',1),K('A'),K('M')]),R.pop('Pop the *A* balloons!',[B('A',1),B('A',1),...others('A',3).map(l=>B(l))]),
  R.pop('Pop the *B* balloons!',[B('B',1),B('B',1),...others('B',3).map(l=>B(l))]),R.tap('Tap the letter *C*.',[K('C',1),...others('C',2).map(l=>K(l))]),
  R.gap('What is missing?',[K('G'),K('H'),'?',K('J')],[K('I',1),K('L'),K('O')]),R.tap('Tap the *first* letter of the alphabet.',[K('A',1),K('M'),K('Z')]),R.tap('Tap the *last* letter of the alphabet.',[K('Z',1),K('A'),K('E')])],
 tries:[['Sing the ABC song slowly.','point to each letter'],['Find the first letter of your name.','e.g. M for Maya']]});

/* 11 ─ Letters A to M */
U({id:'k11',title:'Letters A to M',strand:'Letters and Sounds',codes:[FR],
 guide:{goal:'Name and find the capital letters A to M, and link each letter to a word that starts with it.',words:'capital letter, name, A to M',ask:['Which letter is this?','What word starts with M?','Which letters are in your name?'],home:'Make letters with playdough: a big A and a big M!'},
 watch:['A is for apple!','Every letter has a name and a word friend.'],
 fig:'Big letter blocks A to M with pictures.',
 page:{story:{title:'Letter Zoo',text:'At the *Letter Zoo*, every animal had a letter! *A* for *alligator*. *B* for *bear*. *C* for *camel*. *D* for *dog*. *E* for *elephant*. *F* for *fox*. *G* for *giraffe*. *H* for *horse*. Ike the zookeeper waved: "*I* for *Ike*!" *J* for *jellyfish*, *K* for *kangaroo*, *L* for *lion* and *M* for *monkey*. What a noisy zoo!',pics:['bear','elephant','giraffe','monkey'],
   acts:[[null,'savannah',['crocodile','bear'],'A for alligator!'],['elephant','savannah',['elephant','fox'],'E for elephant!'],['giraffe','savannah',['giraffe','horse'],'G for giraffe!'],['monkey','jungle',['monkey','lion'],'M for monkey!']]},
  boxes:[{title:'A to G',ex:[['apple','*A*'],['bear','*B*'],['cat','*C*'],['dog','*D*'],['elephant','*E*'],['fish','*F*'],['giraffe','*G*']],cols:7},
   {title:'H to M',ex:[['horse','*H*'],['ice cream','*I*'],['juice','*J*'],['kite','*K*'],['lion','*L*'],['monkey','*M*']],cols:6}],
  cards:[{q:'What letter starts “dog”?',pics:['dog'],a:'*D*'},{q:'What letter starts “monkey”?',pics:['monkey'],a:'*M*'}],
  words:[['capital letter','a big letter, like A, B, C'],['word','letters together that mean something']]},
 steps:[
  {say:'Read the story',speech:'At the Letter Zoo, A was for alligator, B for bear, E for elephant, G for giraffe and M for monkey.',set:S.row(['bear','elephant','giraffe','monkey'])},
  {say:'Letters and friends',speech:'Tap each block. B for bear. D for dog. G for giraffe. K for kite.',set:S.tap(['block:B','block:D','block:G','block:K'],{layout:'row',free:true})},
  {say:'Pop the M',speech:'M for monkey! Pop every M balloon.',set:S.tap([B('M',1),B('A'),B('M',1),B('E'),B('M',1)],{mode:'pop',layout:'float'})}],
 more:{title:'Letter of the day',text:'Choose a *letter of the day*. Find 3 things at home that start with it!',pics:['house']},
 rounds:[...['B','D','F','H','K','M'].map(l=>R.tap('Tap the letter *'+l+'*.',[K(l,1),...others(l,2).map(x=>K(x))])),
  R.pop('Pop the *G* balloons!',[B('G',1),B('G',1),B('C'),B('O'),B('Q')]),R.pop('Pop the *E* balloons!',[B('E',1),B('E',1),B('F'),B('L'),B('H')]),
  R.gap('What is missing?',[K('J'),'?',K('L'),K('M')],[K('K',1),K('Q'),K('W')])],
 tries:[['Draw a big letter A and an apple.','A for apple!'],['Find a letter from A to M in your name.','say its name']]});

/* 12 ─ Letters N to Z */
U({id:'k12',title:'Letters N to Z',strand:'Letters and Sounds',codes:[FR],
 guide:{goal:'Name and find the capital letters N to Z, and link each letter to a word that starts with it.',words:'N to Z, letter name, the end of the alphabet',ask:['Which letter is this?','What starts with S?','Which letter makes a zigzag?'],home:'Look for N to Z letters on a walk: S on a STOP sign!'},
 watch:['S is for sun!','From N to Z: nest, owl, pig, queen, rabbit, sun, turtle, umbrella, van, whale, box, yo-yo, zebra.'],
 fig:'Letter blocks N to Z on a parade.',
 page:{story:{title:'The Letter Parade',text:'The *Letter Parade* marched down the street! *N* carried a *nest*. *O* waved at an *owl*. *P* pushed a *pig* in a wagon. *Q* wore a *queen’s* crown. *R* rode a *rabbit*. *S* held up the *sun*. *T* rolled a *turtle*. *U* twirled an *umbrella*. *V* drove a *van*. *W* splashed with a *whale*. *X* played the *xylophone*. *Y* spun a *yo-yo*. And *Z*? A *zebra* zoomed by last!',pics:['owl','pig','sun','zebra'],
   acts:[[null,'town',['nest','owl'],'N and O!'],['pig','town',['pig','wagon'],'P for pig!'],['sun','town',['sun','turtle'],'S and T!'],['zebra','town',['zebra:big'],'Z for zebra!']]},
  boxes:[{title:'N to T',ex:[['nest','*N*'],['owl','*O*'],['pig','*P*'],['crown','*Q*'],['rabbit','*R*'],['sun','*S*'],['turtle','*T*']],cols:7},
   {title:'U to Z',ex:[['umbrella','*U*'],['bus','*V*'],['whale','*W*'],['box','*X*'],['ball','*Y*'],['zebra','*Z*']],cols:6}],
  cards:[{q:'What letter starts “sun”?',pics:['sun'],a:'*S*'},{q:'What letter starts “zebra”?',pics:['zebra'],a:'*Z*'}],
  words:[['zigzag','Z goes zig, zag, zig!'],['parade','a march down the street']]},
 steps:[
  {say:'Read the story',speech:'In the Letter Parade, N had a nest, P a pig, S the sun, T a turtle, W a whale and Z a zebra.',set:S.row(['owl','pig','sun','zebra'])},
  {say:'Tap and say',speech:'Tap each block. P for pig. S for sun. T for turtle. Z for zebra.',set:S.tap(['block:P','block:S','block:T','block:Z'],{layout:'row',free:true})},
  {say:'Find the S',speech:'S for sun and snake! Pop every S balloon.',set:S.tap([B('S',1),B('R'),B('S',1),B('Z'),B('S',1)],{mode:'pop',layout:'float'})}],
 more:{title:'Body letters',text:'Make letters with your body! Stand tall for *T* with arms out. Make an *O* with your arms. Make a *Y* with arms up high!',pics:['runner']},
 rounds:[...['N','P','R','S','T','W'].map(l=>R.tap('Tap the letter *'+l+'*.',[K(l,1),...others(l,2).map(x=>K(x))])),
  R.pop('Pop the *O* balloons!',[B('O',1),B('O',1),B('Q'),B('C'),B('D')]),R.pop('Pop the *Z* balloons!',[B('Z',1),B('Z',1),B('N'),B('S'),B('M')]),
  R.gap('What comes next?',[K('W'),K('X'),K('Y'),'?'],[K('Z',1),K('V'),K('N')])],
 tries:[['Make an O with your fingers.','a circle!'],['Find an S on a sign.','STOP!']]});

/* 13 ─ First sounds */
U({id:'k13',title:'First sounds',strand:'Letters and Sounds',codes:[FR],
 guide:{goal:'Hear the first sound in a word and match it to a letter, starting with b, m, s and t.',words:'sound, first sound, beginning, b, m, s, t',ask:['What sound does ball start with?','Can you think of another word that starts like moon?','Which picture starts with s?'],home:'Play “I spy something that starts with b-b-b…”'},
 watch:['Listen to the beginning!','B-b-ball, b-b-banana, b-b-bus: they all start with the B sound.'],
 fig:'A monkey with things that start with M.',
 page:{story:{title:'Monkey’s M Lunch',text:'*Monkey* was hungry. "I only eat things that start like *mmm-monkey*!" he said. "*Mmm*… *muffins*! *Mmm*… *milk*! *Mmm*… *melon*!" Then Bunny offered him a *banana*. "*B-b-banana*? That starts like *b-b-bunny*!" laughed Monkey. "You eat it!" So Bunny ate the banana, and Monkey had a *mmm*arvellous lunch.',pics:['monkey','muffin','milk','banana'],
   acts:[[null,'jungle',['monkey'],'I am hungry!'],['muffins','jungle',['muffin','milk'],'Mmm!'],['banana','jungle',['rabbit','banana'],'B-b-banana!'],['lunch','jungle',['monkey:big','muffin'],'Mmm-arvellous!']]},
  boxes:[{title:'B and M',ex:[['ball','*b* ball'],['bus','*b* bus'],['moon','*m* moon'],['milk','*m* milk']],cols:4},
   {title:'S and T',ex:[['sun','*s* sun'],['socks','*s* socks'],['tiger','*t* tiger'],['tree','*t* tree']],cols:4}],
  cards:[{q:'What sound starts “sun”?',pics:['sun'],a:'*s* sss'},{q:'What sound starts “tiger”?',pics:['tiger'],a:'*t* t-t'}],
  words:[['sound','what you hear when you say a letter in a word'],['first','at the very start']]},
 steps:[
  {say:'Read the story',speech:'Monkey only ate things that start like monkey: muffins, milk and melon. The banana started like bunny, so Bunny ate it.',set:S.row(['monkey','muffin','milk','banana'])},
  {say:'Feed the monkey',speech:'Tap the foods that start with M, like monkey. Muffin! Milk! Not the banana.',set:S.tap(['*muffin','*milk','banana','*melon'],{mode:'collect',basket:'monkey'})},
  {say:'Listen for B',speech:'Ball, bus, bear, sun. Tap the ones that start with B.',set:S.tap(['*ball','*bus','*bear','sun'],{layout:'row'})}],
 more:{title:'Silly sentence',text:'Say it fast: *Silly snakes sip soup on Sunday!* What sound do you hear again and again?',pics:['snake','soup']},
 rounds:[R.feed('Feed the monkey things that start like *monkey*.','monkey',['*muffin','*milk','banana','apple','*melon']),
  R.feed('Feed the bunny things that start like *bunny*.','rabbit',['*banana','*bread','apple','milk']),
  R.tap('Tap the things that start like *sun*.',['*socks','*snake','ball','*star','dog']),R.tap('Tap the things that start like *tiger*.',['*tree','*turtle','moon','*tent']),
  R.one('Which one starts like *ball*?','bus',['sun','moon']),R.one('Which one starts like *moon*?','mouse',['tree','ball']),
  R.one('Which one starts like *sun*?','socks',['tiger','ball']),R.one('Which one starts like *tiger*?','tent',['moon','socks']),R.tap('Tap the letter that starts *ball*.',['*block:B','block:S','block:M'])],
 tries:[['Say 3 words that start like your name.','e.g. Maya: moon, milk, mouse'],['Play I spy with sounds.','I spy something that starts with sss…']]});

/* 14 ─ Rhymes */
U({id:'k14',title:'Rhyme time',strand:'Letters and Sounds',codes:[FR],
 guide:{goal:'Hear and say words that rhyme (sound the same at the end), and finish rhymes in songs and poems.',words:'rhyme, sounds the same, end',ask:['Does cat rhyme with hat?','What rhymes with bee?','Can you make up a silly rhyme?'],home:'Read a rhyming book and stop before the rhyme: let your child say it!'},
 watch:['Cat, hat, bat!','Rhyming words sound the same at the end.'],
 fig:'A cat in a hat beside a bat.',
 page:{story:{title:'The Cat in the Hat Shop',text:'A *cat* went to the *hat* shop. She tried on a *red* hat. "Too big!" she *said*. She tried on a *green* hat. "Too small," she said with a *frown*. Then she tried a *pink* hat with a *crown*. "*Perfect*!" She looked at a *bat* on the shelf. "You need a *hat* too, *bat*!" And they danced all the way *home*, singing a happy *rhyme*.',pics:['cat','hat','bat','crown'],
   acts:[[null,'store',['cat','hat'],'A cat in a hat shop!'],['crown','store',['cat','crown'],'Perfect!'],['bat','store',['bat','hat'],'You need a hat, bat!']]},
  boxes:[{title:'They rhyme!',ex:[['cat','cat'],['hat','hat'],['bat','bat']],cols:3},
   {title:'More rhymes',lines:['bee, tree, *three*','frog, log, *dog*','moon, spoon, *June*']}],
  cards:[{q:'What rhymes with “dog”?',pics:['dog'],a:'*frog*, log'},{q:'What rhymes with “cake”?',pics:['cake'],a:'*snake*, lake'}],
  words:[['rhyme','words that sound the same at the end'],['poem','words that often rhyme, like a song']]},
 steps:[
  {say:'Read the story',speech:'A cat went to the hat shop. She found a pink hat with a crown, and told the bat, you need a hat too!',set:S.row(['cat','hat','bat','crown'])},
  {say:'Cat, hat, bat',speech:'Tap them and listen. Cat. Hat. Bat. They sound the same at the end. They rhyme!',set:S.tap(['cat','hat','bat'],{layout:'row',free:true})},
  {say:'Find the rhyme',speech:'Which one rhymes with frog? Log! Tap the log. Not the sun.',set:S.tap(['*log','sun','apple'],{layout:'row'})}],
 more:{title:'Rhyme song',text:'Sing: *Twinkle, twinkle, little star, how I wonder what you are!* Star and are rhyme!',pics:['star']},
 rounds:[R.one('Which one rhymes with *cat*?','hat',['dog','sun']),R.one('Which one rhymes with *frog*?','log',['cow','pig']),R.one('Which one rhymes with *bee*?','tree',['cat','car']),
  R.one('Which one rhymes with *cake*?','snake',['ball','fish']),R.one('Which one rhymes with *moon*?','spoon',['star','bed']),R.one('Which one rhymes with *mouse*?','house',['cheese','cat']),
  R.one('Which one rhymes with *goat*?','boat',['sheep','duck']),R.one('Which one rhymes with *fish*?','dish',['bird','fox']),R.tap('Tap the *two* that rhyme.',['*cat','*hat','ball'])],
 tries:[['Say 3 words that rhyme with “ball”.','tall, wall, fall'],['Make up a silly rhyme about your pet.','My dog is a frog on a log!']]});

/* 15 ─ Clap the syllables */
U({id:'k15',title:'Clap the parts',strand:'Letters and Sounds',codes:[FR],
 guide:{goal:'Clap the parts (syllables) of spoken words and names, from one clap (dog) to three (but-ter-fly).',words:'syllable, clap, beat, word parts',ask:['How many claps in your name?','Which word has more claps: cat or caterpillar?','Can you clap ba-na-na?'],home:'Clap everyone’s name in the family. Who has the most claps?'},
 watch:['Clap the beats!','Dog: 1 clap. Pan-da: 2 claps. But-ter-fly: 3 claps!'],
 fig:'Animals with claps above their names.',
 page:{story:{title:'Drum Circle',text:'Ms. Jo’s class sat in a *drum circle*. "Let’s drum our names!" she said. "*Sam*": *boom*! One beat. "*Ma-ya*": *boom, boom*! Two beats. "*Ol-i-ver*": *boom, boom, boom*! Three beats! Then they drummed animals: *cat* (1), *mon-key* (2), *el-e-phant* (3)! "Every word has *parts*," said Ms. Jo. "We can *clap* them or *drum* them!"',pics:['drum','girl','boy','teacher'],
   acts:[[null,'classroom',['drum','teacher'],'Drum circle!'],['Ma-ya','classroom',['drum','girl'],'Boom, boom!'],['el-e-phant','classroom',['elephant','drum'],'Boom, boom, boom!']]},
  boxes:[{title:'Clap them',ex:[['dog','dog: *1*'],['panda','pan-da: *2*'],['butterfly','but-ter-fly: *3*']],cols:3}],
  cards:[{q:'How many claps in “banana”?',pics:['banana'],a:'*3* ba-na-na'},{q:'How many claps in “sun”?',pics:['sun'],a:'*1*'}],
  words:[['syllable','one beat in a word'],['beat','a clap or a drum hit']]},
 steps:[
  {say:'Read the story',speech:'The class drummed their names. Sam, one beat. Ma ya, two beats. Ol i ver, three beats.',set:S.row(['drum','girl','boy','teacher'])},
  {say:'Clap with me',speech:'Tap each picture and clap its parts. Dog, one. Pan da, two. But ter fly, three.',set:S.look(['dog','panda','butterfly'])},
  {say:'Drum it',speech:'Tap the drum for each part of banana. Ba, na, na. Three beats!',set:S.count('drum',3)}],
 more:{title:'Robot talk',text:'Talk like a robot: *el-e-phant*, *wa-ter-mel-on*! Each robot beep is one part.',pics:['robot']},
 rounds:[R.look('How many claps in *dog*?',['dog'],[1,2,3],1),R.look('How many claps in *panda*?',['panda'],[1,2,3],2),R.look('How many claps in *butterfly*?',['butterfly'],[1,2,3],3),
  R.look('How many claps in *banana*?',['banana'],[1,2,3],3),R.look('How many claps in *sun*?',['sun'],[1,2,3],1),R.look('How many claps in *monkey*?',['monkey'],[1,2,3],2),
  R.look('How many claps in *elephant*?',['elephant'],[1,2,3],3),R.look('How many claps in *rabbit*?',['rabbit'],[1,2,3],2),R.one('Which word has *one* clap?','cat',['butterfly','banana'])],
 tries:[['Clap your full name.','count the claps!'],['Find a word with 4 claps.','wa-ter-mel-on!']]});

/* 16 ─ Big and little letters */
U({id:'k16',title:'Big and little letters',strand:'Words and Stories',codes:[FR],
 guide:{goal:'Match capital (big) letters with lowercase (little) letters, and find letters from their own name.',words:'capital, lowercase, big letter, little letter, match',ask:['Which little letter goes with big A?','Which letters look almost the same big and little?','How do you start your name?'],home:'Write your child’s name with a big first letter and little letters after.'},
 watch:['Big A, little a!','Every letter has a big one and a little one. They are partners.'],
 fig:'Big and little letter blocks side by side.',
 page:{story:{title:'Lost Little Letters',text:'Big *A* was looking for little *a*. "Where is my partner?" Big *B* found little *b* hiding behind a *ball*. Big *S* and little *s* looked almost the *same*! "We are twins," they giggled. Big *A* looked under an *apple* tree, and there was little *a*, eating an apple! "Found you!" They held hands, and all the *partners* danced.',pics:['apple','ball','tree','heart'],
   acts:[[null,'garden',['block','tree'],'Where is little a?'],['little b','garden',['ball','block'],'Found little b!'],['apple tree','orchard',['tree','apple'],'Found you, little a!']]},
  boxes:[{title:'Partners',ex:[['apple','*A a*'],['ball','*B b*'],['cat','*C c*'],['dog','*D d*']],cols:4},
   {title:'Look-alikes',lines:['*C c*, *O o*, *S s*, *W w*','they look the same, just big and small']}],
  cards:[{q:'Big D, little ?',a:'*d*'},{q:'Which letter starts your name?',a:'a *big* letter!'}],
  words:[['capital letter','a big letter, like A'],['lowercase letter','a little letter, like a']]},
 steps:[
  {say:'Read the story',speech:'Big A looked for little a. Big B found little b. Big S and little s looked like twins.',set:S.row(['apple','ball','tree','heart'])},
  {say:'Find the partner',speech:'Here is big A. Which little letter is its partner? Tap little a.',set:S.gap(['block:A','?'],['*block:a','block:b','block:d'])},
  {say:'Look-alikes',speech:'Big S and little s. Big O and little o. Tap them and see.',set:S.tap(['block:S','block:s','block:O','block:o'],{layout:'row',free:true})}],
 more:{title:'Name game',text:'Write your name with a *big* first letter and *little* letters after: *Maya*, *Leo*, *Sam*.',pics:['pencil']},
 rounds:[...['A','B','D','E','G','M','R','T'].map(L=>R.gap('Find little *'+L.toLowerCase()+'*, the partner of big '+L+'.',['block:'+L,'?'],['*block:'+L.toLowerCase(),...others(L,2,true).map(x=>'block:'+x)])),
  R.pop('Pop the little *s* balloons!',['*balloon:s:#ff6b6b','*balloon:s:#4fb3ff','balloon:a:#5cc46a','balloon:m:#ffb347'])],
 tries:[['Match big and little letters on magnet letters.','A–a, B–b…'],['Write your name.','big first letter!']]});

/* 17 ─ Story order */
U({id:'k17',title:'First, next, last',strand:'Words and Stories',codes:[FR,PS],
 guide:{goal:'Retell a simple story in order using first, next and last, and talk about the characters and what happened.',words:'first, next, last, story, beginning, end',ask:['What happened first?','What happened next?','How did it end?'],home:'After reading a bedtime story, ask: What happened first? Next? Last?'},
 watch:['Stories have an order!','First an egg, next a chick, last a hen.'],
 fig:'An egg, a chick and a hen in order.',
 page:{story:{title:'Little Chick Hatches',text:'*First*, Mother Hen sat on a smooth white *egg*. She kept it warm for many days. *Next*, the egg went *tap, tap, crack*! Out came a fluffy yellow *chick*. "Peep peep!" *Last*, the little chick grew and grew into a big *hen*, with her very own egg. And the story started all over again!',pics:['egg','chick','hen','nest'],
   acts:[[null,'farm',['hen','egg','nest'],'First: an egg!'],['crack','farm',['chick','egg'],'Next: a chick! Peep!'],['big hen','farm',['hen:big','egg'],'Last: a hen!']]},
  boxes:[{title:'In order',ex:[['egg','*first*'],['chick','*next*'],['hen','*last*']],cols:3},
   {title:'Every story has',lines:['a *beginning* (first)','a *middle* (next)','an *end* (last)']}],
  cards:[{q:'What comes first, a seed or a flower?',pics:['seed','flower'],a:'a *seed*'},{q:'What do you do last at bedtime?',a:'go to *sleep*'}],
  words:[['first','at the beginning'],['last','at the end']]},
 steps:[
  {say:'Read the story',speech:'First, there was an egg. Next, a chick hatched. Last, the chick grew into a hen.',set:S.row(['egg','chick','hen','nest'])},
  {say:'Put it in order',speech:'Tap the pictures in order: first the egg, next the chick, last the hen.',set:S.order(['egg','chick','hen'])},
  {say:'What comes next?',speech:'Seed, then seedling… what comes next? The flower!',set:S.gap(['seed','seedling','?'],['*flower','egg','sun'])}],
 more:{title:'Story time',text:'Act out *The Three Little Pigs*: first a straw house, next a stick house, last a brick house!',pics:['pig','house']},
 rounds:[R.order('Tap them in order: *first*, *next*, *last*.',['egg','chick','hen']),R.order('Tap them in order.',['seed','seedling','flower']),
  R.order('Tap them in order.',['caterpillar','chrysalis','butterfly']),R.gap('What happened next?',['egg','?','hen'],['*chick','apple','frog']),
  R.gap('What comes last?',['seed','seedling','?'],['*tree','egg','fish']),R.order('Tap them in order.',['tadpole','frog']),
  R.gap('What comes next?',['caterpillar','chrysalis','?'],['*butterfly','bee','egg']),R.gap('What comes next?',['egg','chick','?'],['*hen','seed','bee'])],
 tries:[['Tell your day: first, next, last.','first breakfast, next school, last bed'],['Draw a story in 3 boxes.','beginning, middle, end']]});
})();
