/* The Interactive Classroom: Junior Kindergarten — Numbers (sorting, comparing, counting to 10, more and fewer) and Shapes and Patterns */
(function(){
"use strict";
const P=window.PM;if(!P||!P.unit||!P.PK)return;const U=P.unit,R=P.R,S=P.S;const {rnd,pick,shuffle}=P.PK;
const RED='#ff6b6b',BLUE='#4fb3ff',YEL='#ffd43b',GRN='#5cc46a',PUR='#b07cff',ORA='#ffa94d',PINK='#ff8fc7';
const FR='Literacy & Math',PS='Problem Solving',BC='Belonging',SR='Well-Being';
const bal=(c,n,ok)=>(ok?'*':'')+'balloon::'+c+':'+n;

/* 1 ─ Sorting */
U({id:'k01',title:'Sort it out!',strand:'Numbers',codes:[FR,PS],
 guide:{goal:'Sort toys and objects by one attribute, like colour or kind, and say the sorting rule.',words:'sort, same, different, group, colour',ask:['Which toys go together?','Why did you put these together?','Can you sort them a different way?'],home:'Sort the laundry with your child: socks in one pile, shirts in another. Then sort the socks by colour!'},
 watch:['Same goes with same!','Red with red, blue with blue. That is sorting!'],
 fig:'Teddy’s toys sorted into baskets.',
 page:{story:{title:'Teddy’s Tidy-Up',text:'Teddy’s playroom was a *big mess*! Toys everywhere! "Let’s *sort*," said Teddy. He put all the *red* toys in one basket. He put all the *blue* toys in another. Then he found *fruit* on the floor. "Fruit goes in the *kitchen*!" Teddy smiled. Now everything was *tidy*.',pics:['teddy','basket','apple','ball'],
   acts:[[null,'playroom',['teddy:big','ball','block','car'],'What a mess!'],['red','playroom',['teddy','apple','basket'],'Red with red!'],['blue','playroom',['teddy','ball','basket'],'Blue with blue!'],['tidy','playroom',['teddy:big','basket'],'All tidy!']]},
  boxes:[{title:'Sort by colour',ex:[['apple','*red*'],['ball','*blue*'],['banana','*yellow*']],cols:3},
   {title:'Sort by kind',ex:[['apple','fruit'],['car','toys'],['dog','animals']],cols:3}],
  cards:[{q:'Is an apple a fruit or a toy?',pics:['apple'],a:'a *fruit*'},{q:'Which colour is the sun?',pics:['sun'],a:'*yellow*'}],
  words:[['sort','put things that are the same together'],['group','things that go together']]},
 steps:[
  {say:'Read the story',speech:'Teddy sorted his toys. Red toys in one basket, blue toys in another, and the fruit went to the kitchen.',set:S.row(['teddy','basket','apple','ball'])},
  {say:'Red goes with red',speech:'Tap the red balloons. Pop! They are all the same colour, so they go together.',set:S.tap([bal(RED,'red',1),bal(BLUE,'blue'),bal(RED,'red',1),bal(YEL,'yellow'),bal(RED,'red',1)],{mode:'pop',layout:'float'})},
  {say:'Fruit in the basket',speech:'Tap the fruit. Watch it jump into the basket! The toys stay out.',set:S.tap(['*apple','car','*banana','ball','*strawberry'],{mode:'collect',basket:'basket'})}],
 more:{title:'Sorting game',text:'At snack time, sort the crackers by *shape*: circles and squares. Then eat them!',pics:['cookie']},
 rounds:[R.pop('Pop the *red* balloons!',[bal(RED,'red',1),bal(RED,'red',1),bal(BLUE,'blue'),bal(YEL,'yellow'),bal(GRN,'green'),bal(RED,'red',1)]),
  R.pop('Pop the *blue* balloons!',[bal(BLUE,'blue',1),bal(BLUE,'blue',1),bal(RED,'red'),bal(YEL,'yellow'),bal(BLUE,'blue',1),bal(PUR,'purple')]),
  R.feed('Put the *fruit* in the basket.','basket',['*apple','*banana','*cherries','car','teddy','ball']),
  R.feed('Feed the bunny the *carrots*.','rabbit',['*carrot','*carrot','*carrot','cookie','ball','shoe']),
  R.feed('Put the *animals* in the barn.','barn',['*cow','*pig','*sheep','car','apple','bus']),
  R.pop('Pop the *yellow* balloons!',[bal(YEL,'yellow',1),bal(YEL,'yellow',1),bal(GRN,'green'),bal(RED,'red'),bal(BLUE,'blue')]),
  R.one('Which one does *not* belong?','car',['apple','banana','strawberry']),
  R.one('Which one does *not* belong?','fish',['dog','cat','rabbit']),
  R.feed('Put the *toys* in the toy box.','box',['*ball','*teddy','*car','apple','carrot','banana'])],
 tries:[['Sort your crayons by colour.','Count how many in each group!'],['Find 3 red things in your room.','e.g. a ball, a sock, a book']]});

/* 2 ─ Big and small */
U({id:'k02',title:'Big and small, tall and short',strand:'Numbers',codes:[FR,PS],
 guide:{goal:'Compare two or three things by size, height and length, using words like big, small, tall, short, long and longer.',words:'big, small, tall, short, long, biggest, smallest',ask:['Which one is bigger?','Who is the tallest?','How can you check?'],home:'Line up family shoes from smallest to biggest.'},
 watch:['Big, bigger, biggest!','A mouse is small. An elephant is big!'],
 fig:'Three bears: small, medium and big.',
 page:{story:{title:'The Three Bears’ Bowls',text:'Papa Bear had a *big* bowl. Mama Bear had a *medium* bowl. Baby Bear had a *small* bowl. One morning, Baby Bear wanted the *biggest* bowl. "It’s too big for me!" he giggled. He picked his own *small* bowl. "Just right!" Then the bears stood in a line: Papa was *tallest*, and Baby was *shortest*.',pics:['bear','bowl','spoon','honey'],
   acts:[[null,'forest',['bear:big','bowl'],'Papa’s big bowl!'],['Baby Bear','forest',['bear','bowl'],'Too big for me!'],['Just right','home',['bear','honey'],'Just right!'],['tallest','forest',['bear:big','bear','bear'],'Tall, taller, tallest!']]},
  boxes:[{title:'Size words',ex:[['mouse','*small*'],['dog','medium'],['elephant','*big*']],cols:3},
   {title:'Height words',ex:[['flower','*short*'],['tree','*tall*']],cols:2}],
  cards:[{q:'Which is bigger, a cat or a horse?',pics:['cat','horse'],a:'a *horse*'},{q:'Which is taller, a giraffe or a duck?',pics:['giraffe','duck'],a:'a *giraffe*'}],
  words:[['big','takes up lots of space'],['tall','goes up high']]},
 steps:[
  {say:'Read the story',speech:'Papa Bear had a big bowl, Mama Bear a medium bowl and Baby Bear a small bowl. Baby Bear’s small bowl was just right.',set:S.row(['bear','bowl','spoon','honey'])},
  {say:'Find the biggest',speech:'Three apples. Tap the biggest one!',set:S.tap(['apple','*apple','apple'],{layout:'row',s:1,sizes:[.6,1.4,.9]})},
  {say:'Who is tallest?',speech:'Tap the tallest tree. It reaches way up high!',set:S.tap(['tree','*tree','tree'],{layout:'row',sizes:[.7,1.5,1]})}],
 more:{title:'Did you know?',text:'The *blue whale* is the biggest animal ever. A *bee hummingbird* is so small it can sit on your finger!',pics:['whale','bird']},
 rounds:[R.tap('Tap the *biggest* apple.',['apple','*apple','apple'],{sizes:[.6,1.5,1]}),R.tap('Tap the *smallest* ball.',['*ball','ball','ball'],{sizes:[.5,1.1,1.5]}),
  R.tap('Tap the *tallest* tree.',['tree','tree','*tree'],{sizes:[.8,1.1,1.6]}),R.tap('Tap the *shortest* flower.',['flower','*flower','flower'],{sizes:[1.2,.6,1.5]}),
  R.one('Which animal is *big*?','elephant',['mouse','ladybug']),R.one('Which animal is *small*?','mouse',['elephant','horse']),
  R.tap('Tap the *biggest* bear.',['*bear','bear','bear'],{sizes:[1.5,.6,1]}),R.one('Which one is *tall*?','giraffe',['duck','frog']),
  R.tap('Tap the *smallest* house.',['house','*house','house'],{sizes:[1.2,.6,1.5]})],
 tries:[['Who is taller, you or your chair?','Stand beside it and check!'],['Find something bigger than your hand.','e.g. a book, a pillow']]});

/* 3 ─ Counting 1, 2, 3 */
U({id:'k03',title:'One, two, three!',strand:'Numbers',codes:[FR],
 guide:{goal:'Count 1, 2 and 3 objects by touching each one once, recognize small groups at a glance, and match the numerals 1, 2 and 3.',words:'one, two, three, count, how many',ask:['How many ducks?','Can you see 3 without counting?','What number comes after 2?'],home:'Count stairs, spoons and socks: 1, 2, 3!'},
 watch:['Touch and count!','One duck, two ducks, three ducks!'],
 fig:'Three little ducks on a pond.',
 page:{story:{title:'Three Little Ducks',text:'*One* little duck went for a swim. *Quack!* Then *two* little ducks went for a swim. *Quack, quack!* Then *three* little ducks went for a swim. *Quack, quack, quack!* Mama Duck counted: "*One, two, three.* All my babies are here!" And they all swam home together.',pics:['duck','pond','sun','fish'],
   acts:[[null,'pond',['duck'],'Quack!'],['two','pond',['duck','duck'],'Quack, quack!'],['three','pond',['duck','duck','duck'],'Quack, quack, quack!'],['swam home','pond',['duck:big','duck','duck'],'All here!']]},
  boxes:[{title:'Count with me',ex:[['duck','*1* one'],['duck','*2* two'],['duck','*3* three']],cols:3}],
  cards:[{q:'How many suns in the sky?',pics:['sun'],a:'*1*'},{q:'How many eyes do you have?',a:'*2*'}],
  words:[['count','say a number for each thing'],['how many','the number you get when you count']]},
 steps:[
  {say:'Read the story',speech:'One little duck, two little ducks, three little ducks went swimming. Mama Duck counted one, two, three.',set:S.row(['duck','pond','sun','fish'])},
  {say:'Tap to count',speech:'Tap each duck to count it. One, two, three!',set:S.count('duck',3)},
  {say:'Two',speech:'Tap each cookie. One, two. Two cookies!',set:S.count('cookie',2)}],
 more:{title:'Counting song',text:'Hold up your fingers and sing: *One, two, three, I see a bee!*',pics:['bee']},
 rounds:[R.count('Tap to count. How many *ducks*?','duck',rnd(1,3)),R.count('Tap to count. How many *apples*?','apple',rnd(2,3)),R.count('How many *stars*?','star',rnd(1,3)),
  R.feed('Feed the duck *2* fish.','duck',['*fish','*fish','fish','fish'],{need:2,count:true}),R.feed('Put *3* apples in the basket.','basket',['*apple','*apple','*apple','apple','apple'],{need:3,count:true}),
  R.tap('Tap the dice with *3* dots.',['*dots:3','dots:1','dots:2']),R.tap('Tap the dice with *1* dot.',['dots:3','*dots:1','dots:2']),
  R.tap('Tap the number *2*.',['num:1','*num:2','num:3']),R.count('How many *balls*?','ball',rnd(1,3))],
 tries:[['Clap 3 times!','clap, clap, clap'],['Find 2 shoes and count them.','one, two!']]});

/* 4 ─ Four and five */
U({id:'k04',title:'Four and five',strand:'Numbers',codes:[FR],
 guide:{goal:'Count 4 and 5 objects, see 5 as a full hand, and match quantities to the numerals 4 and 5.',words:'four, five, hand, fingers, count on',ask:['How many fingers on one hand?','Show me 4 fingers.','Is 5 more than 4?'],home:'Count 5 grapes, then eat them: 5, 4, 3, 2, 1!'},
 watch:['Five fingers on a hand!','Four legs on a dog. Five fingers on a hand.'],
 fig:'A hand showing five fingers next to four puppies.',
 page:{story:{title:'Five Little Frogs',text:'*Five* little frogs sat on a log. *Ribbit!* One jumped into the pond. *Splash!* Now there were *four* little frogs. "Come in!" said the first frog. "The water is warm!" *Splash, splash, splash, splash!* Now all *five* frogs were swimming. Hold up your hand: *five* fingers, just like *five* frogs!',pics:['frog','pond','hand','log'],
   acts:[[null,'pond',['frog','frog','frog','frog','frog'],'Ribbit!'],['Splash','pond',['frog','droplet'],'Splash!'],['four','pond',['frog','frog','frog','frog'],'Four on the log!'],['five frogs','pond',['frog:big','frog','frog'],'All five swimming!']]},
  boxes:[{title:'Count to five',ex:[['frog','1'],['frog','2'],['frog','3'],['frog','*4*'],['frog','*5*']],cols:5},
   {title:'Five on a hand',ex:[['hand','*5* fingers']],cols:1}],
  cards:[{q:'How many legs does a dog have?',pics:['dog'],a:'*4*'},{q:'How many fingers on one hand?',pics:['hand'],a:'*5*'}],
  words:[['four','4: one more than three'],['five','5: a whole hand']]},
 steps:[
  {say:'Read the story',speech:'Five little frogs sat on a log. One jumped in, so four were left. Then all five went swimming.',set:S.row(['frog','pond','hand','log'])},
  {say:'Count four',speech:'Tap each puppy. One, two, three, four. Four puppies!',set:S.count('dog',4)},
  {say:'Count five',speech:'Five frogs in the ten frame. One row full! Tap to count them.',set:S.count('frog',5,{frame:10})}],
 more:{title:'Hand game',text:'Wiggle all *5* fingers. Hide your thumb. How many now? *4*!',pics:['hand']},
 rounds:[R.count('How many *frogs*?','frog',5,{frame:10}),R.count('How many *puppies*?','dog',4),R.count('How many *cupcakes*?','cupcake',rnd(3,5)),
  R.feed('Feed the frog *4* flies.','frog',['*fly','*fly','*fly','*fly','fly','fly'],{need:4,count:true}),R.feed('Put *5* eggs in the basket.','basket',['*egg','*egg','*egg','*egg','*egg','egg'],{need:5,count:true}),
  R.tap('Tap the dice with *4* dots.',['*dots:4','dots:5','dots:2']),R.tap('Tap the dice with *5* dots.',['dots:4','*dots:5','dots:3']),
  R.tap('Tap the number *5*.',['num:3','num:4','*num:5']),R.count('How many *ladybugs*?','ladybug',rnd(4,5))],
 tries:[['Jump 5 times!','1, 2, 3, 4, 5'],['Find something with 4 legs.','a chair, a table, a cat']]});

/* 5 ─ Counting to 10 */
U({id:'k05',title:'Count to ten',strand:'Numbers',codes:[FR],
 guide:{goal:'Count up to 10 objects with one number for each object, know the last number says how many, and count backward from 10 for a rocket launch.',words:'six, seven, eight, nine, ten, ten frame',ask:['What comes after 7?','How many in a full ten frame?','Can you count back from 10?'],home:'Count 10 steps to the door, then 10, 9, 8… blast off!'},
 watch:['Ten fingers, ten toes!','Two full hands make ten.'],
 fig:'A ten frame filling up with stars.',
 page:{story:{title:'Rocket to the Moon',text:'Zara built a *rocket* out of boxes. "Let’s count to blast off!" said her brother Ben. They counted the stars on the rocket: *one, two, three, four, five, six, seven, eight, nine, ten*! Then they counted *backward*: "*Ten, nine, eight, seven, six, five, four, three, two, one… BLAST OFF!*" Whoosh! In their pretend game, they flew all the way to the *Moon*.',pics:['rocket','star','girl','moon'],
   acts:[[null,'playroom',['box','girl','boy'],'Let’s build a rocket!'],['stars','space',['star','star','rocket'],'One, two, three…'],['BLAST OFF','space',['rocket:big'],'Whoosh!'],['Moon','space',['full moon','rocket'],'We made it!']]},
  boxes:[{title:'Six to ten',ex:[['dice','*6* six'],['star','*7* seven'],['star','*8* eight'],['star','*9* nine'],['hand','*10* ten']],cols:5},
   {title:'Ten frame',text:'A full ten frame holds *10*. Two rows of *5*.'}],
  cards:[{q:'What comes after 9?',a:'*10*'},{q:'How many fingers on two hands?',pics:['hand','hand'],a:'*10*'}],
  words:[['ten','10: two whole hands'],['backward','counting down: 10, 9, 8…']]},
 steps:[
  {say:'Read the story',speech:'Zara and Ben counted the stars on their rocket from one to ten, then backward, ten to one. Blast off!',set:S.row(['rocket','star','girl','moon'])},
  {say:'Fill the ten frame',speech:'Ten stars fill the ten frame: two rows of five. Tap each one and count to ten!',set:S.count('star',10,{frame:10})},
  {say:'Count seven',speech:'Tap the fish and count them. Seven fish!',set:S.count('fish',7)}],
 more:{title:'Blast-off game',text:'Crouch down low. Count *10, 9, 8, 7, 6, 5, 4, 3, 2, 1* and jump up high: *BLAST OFF!*',pics:['rocket']},
 rounds:[R.count('How many *stars*?','star',rnd(6,10),{frame:10}),R.count('How many *fish*?','fish',rnd(6,8)),R.count('How many *apples*?','apple',rnd(7,10),{frame:10}),
  R.feed('Put *6* cookies in the jar.','jar',['*cookie','*cookie','*cookie','*cookie','*cookie','*cookie','cookie','cookie'],{need:6,count:true}),
  R.gap('What comes next? 6, 7, 8, ?',['num:6','num:7','num:8','?'],['*num:9','num:5','num:10']),R.gap('What comes next? 1, 2, 3, ?',['num:1','num:2','num:3','?'],['*num:4','num:6','num:2']),
  R.tap('Tap the number *10*.',['num:6','*num:10','num:8']),R.tap('Tap the number *7*.',['*num:7','num:1','num:9']),R.count('How many *balloons*?','balloon',rnd(6,9))],
 tries:[['Count your toes!','10 toes'],['Count 10 jumps.','1 to 10, then rest!']]});

/* 6 ─ More and fewer */
U({id:'k06',title:'More, fewer, the same',strand:'Numbers',codes:[FR,PS],
 guide:{goal:'Compare two small groups by matching one-to-one and say which has more, which has fewer, or if they are the same.',words:'more, fewer, less, same, equal, match',ask:['Which plate has more cookies?','How can you check?','How can we make them the same?'],home:'Share snacks: is it fair? Do we both have the same?'},
 watch:['Match them up!','Line them up one-to-one. The extra ones show which group has more.'],
 fig:'Two plates of cookies, one with more.',
 page:{story:{title:'Fair Share Cookies',text:'Leo and Mia baked *cookies*. Leo’s plate had *4* cookies. Mia’s plate had *2*. "That’s not fair!" said Mia. They lined them up, one by one. Leo had *more*. Mia had *fewer*. Leo gave Mia *one* cookie. Now they each had *3*. "The *same*!" they cheered, and they shared a big glass of milk.',pics:['cookie','plate','boy','girl'],
   acts:[[null,'kitchen',['cookie','boy','girl'],'Cookies!'],['not fair','kitchen',['plate','girl'],'Not fair!'],['one cookie','kitchen',['cookie','boy'],'Here, Mia!'],['same','kitchen',['milk','boy','girl'],'The same!']]},
  boxes:[{title:'Compare',ex:[['cookie','4: *more*'],['cookie','2: *fewer*'],['cookie','3 and 3: *same*']],cols:3}],
  cards:[{q:'3 bees or 1 bee: which is more?',pics:['bee'],a:'*3* bees'},{q:'2 and 2: more or the same?',a:'the *same*'}],
  words:[['more','the bigger amount'],['fewer','the smaller amount']]},
 steps:[
  {say:'Read the story',speech:'Leo had four cookies and Mia had two. Leo had more. He gave Mia one, so they each had three. The same!',set:S.row(['cookie','plate','boy','girl'])},
  {say:'Which has more?',speech:'Tap the dice with more dots. Five is more than two!',set:S.tap(['*dots:5','dots:2'],{layout:'row'})},
  {say:'Make it the same',speech:'The bunny has two carrots. Give it one more to make three, the same as the friend beside it.',set:S.tap(['*carrot','ball','cookie'],{mode:'collect',basket:'rabbit',need:1})}],
 more:{title:'Match game',text:'Put out *cups* and *spoons*. Is there a spoon for every cup? If a cup has no spoon, there are *more* cups!',pics:['cup','spoon']},
 rounds:[R.tap('Tap the group with *more*.',['*dots:5','dots:2']),R.tap('Tap the group with *fewer*.',['dots:6','*dots:1']),R.tap('Tap the group with *more*.',['dots:3','*dots:6']),
  R.tap('Tap the group with *fewer*.',['*dots:2','dots:4']),R.tap('Tap the group with *more*.',['*dots:5','dots:3']),
  R.feed('The bunny needs *2* carrots to match its friend.','rabbit',['*carrot','*carrot','ball','shoe'],{need:2,count:true}),R.tap('Tap the dice that are the *same*.',['*dots:4','*dots:4','dots:2']),
  R.tap('Tap the number that is *more*: 3 or 5?',['num:3','*num:5']),R.tap('Tap the number that is *fewer*: 1 or 4?',['*num:1','num:4'])],
 tries:[['Make 2 piles of blocks. Which has more?','line them up to check'],['Share 6 grapes so you both have the same.','3 and 3']]});

/* 7 ─ Shapes */
U({id:'k07',title:'Shapes all around',strand:'Shapes and Patterns',codes:[FR,PS],
 guide:{goal:'Name and find circles, squares, triangles and rectangles, and talk about sides and corners.',words:'circle, square, triangle, rectangle, side, corner',ask:['How many corners does a triangle have?','Where do you see a circle?','How is a square like a rectangle?'],home:'Go on a shape hunt: a clock (circle), a window (square), a pizza slice (triangle)!'},
 watch:['Shapes are everywhere!','A wheel is a circle. A door is a rectangle. A slice of pizza is a triangle.'],
 fig:'Bright shapes standing on a mat.',
 page:{story:{title:'Shape Town',text:'In *Shape Town*, everything is made of shapes! The *sun* is a big yellow *circle*. The *house* has a *square* window and a *triangle* roof. The *door* is a *rectangle*. Even the bus has *circle* wheels! "Beep beep!" said Sammy the bus. "Can you find all the shapes?"',pics:['house','sun','bus','pizza'],
   acts:[[null,'town',['house','sun'],'Welcome to Shape Town!'],['triangle roof','town',['house:big'],'A triangle roof!'],['circle wheels','town',['bus','car'],'Beep beep!']]},
  boxes:[{title:'Four shapes',ex:[['circle','*circle*'],['square','*square*'],['triangle','*triangle*'],['rectangle','*rectangle*']],cols:4},
   {title:'Sides and corners',lines:['circle: *0* corners','triangle: *3* sides, 3 corners','square: *4* same sides']}],
  cards:[{q:'What shape is a pizza slice?',pics:['pizza'],a:'a *triangle*'},{q:'What shape is a clock?',pics:['clock'],a:'a *circle*'}],
  words:[['circle','a round shape with no corners'],['triangle','a shape with 3 sides and 3 corners']]},
 steps:[
  {say:'Read the story',speech:'In Shape Town, the sun is a circle, the window is a square, the roof is a triangle and the door is a rectangle.',set:S.row(['house','sun','bus','pizza'])},
  {say:'Meet the shapes',speech:'Tap each shape to hear its name. Circle, square, triangle, rectangle.',set:S.tap(['shape:circle:'+RED,'shape:square:'+BLUE,'shape:triangle:'+GRN,'shape:rectangle:'+ORA],{layout:'row'})},
  {say:'Find the triangles',speech:'Tap all the triangles. They have three sides and three pointy corners.',set:S.tap(['*shape:triangle:'+GRN,'shape:circle:'+RED,'*shape:triangle:'+PUR,'shape:square:'+BLUE,'*shape:triangle:'+ORA],{mode:'pop'})}],
 more:{title:'Shape snack',text:'Cut a sandwich into *triangles*, a cheese slice into *squares*, and a cucumber into *circles*!',pics:['sandwich','cheese']},
 rounds:[R.tap('Tap all the *circles*.',['*shape:circle:'+RED,'*shape:circle:'+BLUE,'shape:square:'+GRN,'shape:triangle:'+YEL,'*shape:circle:'+PUR]),
  R.tap('Tap all the *squares*.',['*shape:square:'+RED,'shape:circle:'+BLUE,'*shape:square:'+GRN,'shape:triangle:'+YEL]),
  R.tap('Tap all the *triangles*.',['*shape:triangle:'+ORA,'shape:rectangle:'+BLUE,'*shape:triangle:'+PINK,'shape:circle:'+GRN]),
  R.tap('Tap the *rectangle*.',['*shape:rectangle:'+BLUE,'shape:square:'+RED,'shape:circle:'+YEL]),
  R.one('Which one is shaped like a *circle*?','clock',['book','pizza']),R.one('Which one is shaped like a *triangle*?','pizza',['ball','book']),
  R.pop('Pop the *star* balloons!',['*shape:star:'+YEL,'shape:heart:'+RED,'*shape:star:'+ORA,'shape:circle:'+BLUE],{layout:'row'}),
  R.tap('Tap the shape with *3* corners.',['*shape:triangle:'+GRN,'shape:square:'+BLUE,'shape:circle:'+RED]),R.tap('Tap the *heart*.',['shape:star:'+YEL,'*shape:heart:'+RED,'shape:square:'+BLUE])],
 tries:[['Draw a house with 4 shapes.','square, triangle, rectangle, circle'],['Make a triangle with 3 crayons.','3 sides!']]});

/* 8 ─ Patterns */
U({id:'k08',title:'Patterns: what comes next?',strand:'Shapes and Patterns',codes:[FR,PS],
 guide:{goal:'Copy, extend and make simple AB patterns with colours, toys, sounds and actions.',words:'pattern, repeat, next, AB',ask:['What comes next?','What part repeats?','Can you make a pattern with claps and stomps?'],home:'Make a pattern with spoons and forks on the table!'},
 watch:['It repeats!','Red, blue, red, blue… what comes next? Red!'],
 fig:'A row of toys with one missing.',
 page:{story:{title:'Caterpillar’s Coat',text:'Little *Caterpillar* wanted a new coat. "Make it a *pattern*," said Ladybug. Red, *green*, red, *green*, red, *green*! "What comes *next*?" asked Ladybug. "*Red*!" said Caterpillar. Bee added stripes: yellow, black, yellow, black. Soon Caterpillar was the most *patterned* bug in the garden. And one day, he became a beautiful *butterfly*!',pics:['caterpillar','ladybug','bee','butterfly'],
   acts:[[null,'garden',['caterpillar','ladybug'],'I need a coat!'],['What comes next','garden',['caterpillar:big'],'Red!'],['Bee','garden',['bee','caterpillar'],'Yellow, black!'],['butterfly','garden',['butterfly:big','flower'],'Ta-da!']]},
  boxes:[{title:'AB pattern',ex:[['apple','A'],['banana','B'],['apple','A'],['banana','B']],cols:4},
   {title:'Patterns everywhere',lines:['clap, stomp, clap, stomp','big, small, big, small','day, night, day, night']}],
  cards:[{q:'Red, blue, red, blue, __?',a:'*red*'},{q:'Clap, jump, clap, jump, __?',a:'*clap*'}],
  words:[['pattern','something that repeats again and again'],['next','what comes after']]},
 steps:[
  {say:'Read the story',speech:'Caterpillar’s coat was red, green, red, green. Bee added yellow, black, yellow, black. Patterns repeat!',set:S.row(['caterpillar','ladybug','bee','butterfly'])},
  {say:'What comes next?',speech:'Apple, banana, apple, banana, apple… what comes next? Tap it!',set:S.gap(['apple','banana','apple','banana','apple','?'],['*banana','apple','cherries'])},
  {say:'A colour pattern',speech:'Red, blue, red, blue… which balloon comes next?',set:S.gap([bal(RED,'red'),bal(BLUE,'blue'),bal(RED,'red'),bal(BLUE,'blue'),'?'],[bal(RED,'red',1),bal(BLUE,'blue'),bal(YEL,'yellow')],{s:.7})}],
 more:{title:'Body patterns',text:'Make a pattern with your body: *clap, pat, clap, pat*! Can you make up your own?',pics:['hand']},
 rounds:[R.gap('What comes next?',['cat','dog','cat','dog','?'],['*cat','dog','fish']),R.gap('What comes next?',['star','heart','star','heart','?'],['*star','heart','moon']),
  R.gap('What comes next?',['shape:circle:'+RED,'shape:square:'+BLUE,'shape:circle:'+RED,'shape:square:'+BLUE,'?'],['*shape:circle:'+RED,'shape:triangle:'+GRN,'shape:square:'+BLUE]),
  R.gap('What is missing?',['sun','moon','?','moon'],['*sun','star','cloud']),R.gap('What comes next?',['duck','duck','frog','duck','duck','?'],['*frog','duck','fish']),
  R.gap('What comes next?',[bal(YEL,'yellow'),bal(GRN,'green'),bal(YEL,'yellow'),bal(GRN,'green'),'?'],[bal(YEL,'yellow',1),bal(RED,'red'),bal(GRN,'green')],{s:.7}),
  R.gap('What comes next?',['apple','apple','banana','apple','apple','?'],['*banana','apple','carrot']),R.gap('What is missing?',['shape:triangle:'+GRN,'?','shape:triangle:'+GRN,'shape:star:'+YEL],['*shape:star:'+YEL,'shape:heart:'+RED,'shape:circle:'+BLUE])],
 tries:[['Make a pattern with blocks: red, blue, red, blue.','What comes next?'],['Clap a pattern: clap, clap, stomp.','repeat it 3 times!']]});

/* 9 ─ Position words */
U({id:'k09',title:'In, on, under, beside',strand:'Shapes and Patterns',codes:[FR,PS],
 guide:{goal:'Use position words (in, on, under, beside, behind, in front of) to describe where things are.',words:'in, on, under, beside, behind, in front of',ask:['Where is the cat?','Can you put the teddy under the chair?','What is beside you?'],home:'Play “Where is Teddy?”: hide a toy and give clues: under the table, behind the door!'},
 watch:['Where is it?','The cat is in the box. The ball is under the chair.'],
 fig:'A kitten hiding in different places.',
 page:{story:{title:'Where Is Kitten?',text:'Kitten loved to *hide*! Was she *in* the box? Yes! Then she hid *under* the bed. Then she sat *on* the chair. Then she curled up *beside* the dog. "Where are you now?" called Maya. *Meow!* Kitten was *behind* the curtain. Maya found her and gave her a big hug.',pics:['kitten','box','chair','girl'],
   acts:[[null,'home',['kitten','box'],'In the box!'],['under','bedroom',['kitten','bed'],'Under the bed!'],['beside','home',['kitten','dog'],'Beside the dog!'],['hug','home',['girl','kitten'],'Found you!']]},
  boxes:[{title:'Position words',ex:[['box','*in*'],['chair','*on*'],['bed','*under*'],['dog','*beside*']],cols:4}],
  cards:[{q:'Where are your shoes? On your feet or on your head?',pics:['shoe'],a:'on your *feet*!'},{q:'What is under the table?',a:'the floor!'}],
  words:[['under','below something'],['beside','right next to something']]},
 steps:[
  {say:'Read the story',speech:'Kitten hid in the box, under the bed, on the chair, beside the dog and behind the curtain.',set:S.row(['kitten','box','chair','girl'])},
  {say:'Where did she hide?',speech:'Tap each place Kitten hid: the box, the bed and the chair.',set:S.tap(['kitten','box','bed','chair'],{layout:'row'})},
  {say:'Put it in the box',speech:'Tap the toys to put them in the box. In, in, in!',set:S.tap(['*ball','*teddy','*car'],{mode:'collect',basket:'box'})}],
 more:{title:'Simon says',text:'Play *Simon says*: “Put your hands *on* your head. Put your hands *under* your chin. Stand *beside* a friend!”',pics:['hand']},
 rounds:[R.feed('Put the toys *in* the box.','box',['*ball','*teddy','*car','tree'],{}),R.feed('Put the eggs *in* the nest.','nest',['*egg','*egg','*egg','ball']),
  R.feed('Put the fish *in* the bowl.','fishbowl',['*fish','*fish','cat','dog']),R.one('What goes *on* your head?','hat',['shoe','socks']),
  R.one('What goes *on* your feet?','boot',['hat','gloves']),R.one('Where do you sleep? *In* a…','bed',['bathtub','car']),
  R.feed('Put the books *on* the shelf.','library',['*book','*book','apple','ball']),R.one('What lives *in* the water?','fish',['dog','bird']),R.feed('Put the bees *in* the hive.','beehive',['*bee','*bee','*bee','butterfly'])],
 tries:[['Put your teddy on, under and beside your bed.','say each word!'],['Where is the sun? Up in the sky!','look outside']]});
})();
