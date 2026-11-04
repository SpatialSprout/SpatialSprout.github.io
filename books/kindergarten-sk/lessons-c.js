/* The Interactive Classroom: Senior Kindergarten — Words and Stories (opposites, sentences, story elements), My World (living things, life cycles, sink and float, day and night) and Me and My Community (healthy me, my community and Canada, caring for the Earth) */
(function(){
"use strict";
const P=window.PM;if(!P||!P.unit||!P.PK)return;const U=P.unit,R=P.R,S=P.S;const {shuffle}=P.PK;
const FR='Literacy & Math',PS='Problem Solving',BC='Belonging',SR='Well-Being';

/* 20 ─ Opposites */
U({id:'m20',title:'Opposites',strand:'Words and Stories',codes:[FR],
 guide:{goal:'Name opposites (big–small, hot–cold, up–down, open–closed, full–empty, day–night, happy–sad) and use them to describe things.',words:'opposite, big, small, hot, cold, up, down, full, empty',ask:['What is the opposite of hot?','Is the glass full or empty?','Can you show me up and down?'],home:'Play opposites: I say “tall”, you say “short”!'},
 watch:['Totally different!','Hot and cold are opposites. Up and down are opposites.'],
 fig:'Pairs of opposite things side by side.',
 page:{story:{title:'Upside-Down Day',text:'On *Upside-Down Day*, everything was *opposite*! The *big* elephant rode a *small* bike. The *hot* soup was *cold*. Kids walked *backward* instead of *forward*. Owl woke up in the *day* and slept at *night*… no, that’s just Owl! Then Bear came in *sad* and left *happy*. "Upside-Down Day is the best!" everyone giggled.',pics:['elephant','soup','owl','bear'],
   acts:[[null,'town',['elephant:big','bicycle'],'Big elephant, small bike!'],['hot soup','kitchen',['soup','snowflake'],'Cold soup!'],['Owl','night',['owl','moon'],'Hoo!'],['happy','town',['bear','heart'],'Best day!']]},
  boxes:[{title:'Opposites',ex:[['elephant','*big*'],['mouse','*small*'],['fire','*hot*'],['snowflake','*cold*']],cols:4},
   {title:'More opposites',lines:['up ↔ *down*','full ↔ *empty*','open ↔ *closed*','happy ↔ *sad*','day ↔ *night*']}],
  cards:[{q:'Opposite of “up”?',a:'*down*'},{q:'Opposite of “day”?',pics:['sun'],a:'*night*'}],
  words:[['opposite','a word that means something totally different'],['describe','tell what something is like']]},
 steps:[
  {say:'Read the story',speech:'On Upside-Down Day, the big elephant rode a small bike, hot soup was cold and Bear came in sad and left happy.',set:S.row(['elephant','soup','owl','bear'])},
  {say:'Big and small',speech:'Tap the big one, then the small one. Big elephant. Small mouse!',set:S.look(['elephant','mouse'])},
  {say:'Find the opposite',speech:'What is the opposite of hot fire? Tap the cold snowflake.',set:S.tap(['*snowflake','sun','fire'],{layout:'row'})}],
 more:{title:'Opposite game',text:'Do the opposite! When I say *stand*, you *sit*. When I say *loud*, you whisper *quietly*!',pics:['hand']},
 rounds:[R.one('What is the opposite of *hot*?','snowflake',['fire','sun']),R.one('What is the opposite of *day*?','moon',['sun','cloud']),R.one('What is the opposite of *happy*?','sad face',['happy face','heart']),
  R.one('What is the opposite of *big*?','mouse',['elephant','whale']),R.one('Which is *empty*?','cup',['milk','juice']),R.tap('Tap the *tallest*… now that’s the opposite of short!',['*giraffe','duck','frog']),
  R.one('What is the opposite of *slow*?','rabbit',['turtle','snail']),R.one('What is the opposite of *wet*?','sun',['droplet','umbrella'])],
 tries:[['Show me open, then closed, with your hand.','open, closed!'],['Say 3 pairs of opposites.','in/out, on/off, up/down']]});

/* 21 ─ Sentences */
U({id:'m21',title:'Build a sentence',strand:'Words and Stories',codes:[FR],
 guide:{goal:'Know that a sentence tells a whole idea, starts with a capital letter, has spaces between words and ends with a period, and build simple sentences.',words:'sentence, word, capital letter, space, period',ask:['How does a sentence start?','What goes at the end?','How many words are in “I see a cat.”?'],home:'Write a sentence together on the grocery list: I like apples.'},
 watch:['Capital, words, spaces, dot!','I see a cat. It starts with a capital I and ends with a period.'],
 fig:'Word blocks building a sentence.',
 page:{story:{title:'The Sentence Train',text:'The *Sentence Train* had a rule: the *engine* is always a *Capital Letter*, and the *caboose* is always a *period*. In between, each car carried one *word*, with a little *space* between cars. "*I*" hooked on. Then "*like*." Then "*dogs*." Last came the period caboose: "*I like dogs.*" *Toot toot!* The train was a *sentence*!',pics:['train','dog','girl','book'],
   acts:[[null,'town',['train'],'All aboard!'],['like','town',['train','girl'],'I… like…'],['dogs','town',['dog','train'],'…dogs!'],['sentence','town',['train:big','book'],'A sentence!']]},
  boxes:[{title:'Sentence rules',lines:['*C*apital letter at the start','*spaces* between words','a *period* at the end .','tells a *whole idea*']},
   {title:'Example',lines:['*I see a big bus.*','5 words, 1 sentence']}],
  cards:[{q:'Fix it: i like cats',a:'*I like cats.*'},{q:'How many words: The sun is hot.',a:'*4*'}],
  words:[['sentence','words that tell a whole idea'],['period','the dot at the end of a sentence']]},
 steps:[
  {say:'Read the story',speech:'The sentence train starts with a capital letter, has one word in each car with spaces, and ends with a period: I like dogs.',set:S.row(['train','dog','girl','book'])},
  {say:'Build it',speech:'Tap the words in order to build: I like dogs.',set:S.build(['I','like','dogs.'],'dog')},
  {say:'Count the words',speech:'I see a cat. Tap each word block to count. Four words!',set:S.count('block',4,{show:'I see a cat.'})}],
 more:{title:'Silly sentences',text:'Build silly sentences: *The pig can fly.* *My cat is blue.* Read them and laugh!',pics:['pig']},
 rounds:[R.build('Build the sentence: *I see a cat.*',['I','see','a','cat.'],'cat'),R.build('Build the sentence: *I like the sun.*',['I','like','the','sun.'],'sun'),
  R.build('Build the sentence: *The dog is big.*',['The','dog','is','big.'],'dog'),R.build('Build the sentence: *My hat is red.*',['My','hat','is','red.'],'hat'),
  R.look('How many words? *I can hop.*',['frog'],[2,3,4],3),R.look('How many words? *I see the big bus.*',['bus'],[4,5,6],5),
  R.gap('What goes at the end of a sentence?',['block:I','block:run','?'],['*block:.','block:a','block:I']),R.build('Build the sentence: *I can run.*',['I','can','run.'],'runner')],
 tries:[['Write: I like ___. Draw it!','I like pizza.'],['Clap once for each word in your sentence.','I-like-dogs: 3 claps']]});

/* 22 ─ Story elements and retelling */
U({id:'m22',title:'Who, where, what happened?',strand:'Words and Stories',codes:[FR,PS],
 guide:{goal:'Name the characters, setting, problem and solution of a story, and retell it in order using first, next, then and last.',words:'character, setting, problem, solution, retell, beginning, middle, end',ask:['Who is in the story?','Where does it happen?','What was the problem and how was it fixed?'],home:'Retell a favourite story with toys as puppets.'},
 watch:['Who, where, what!','Characters are who. The setting is where. The problem and solution are what happened.'],
 fig:'Three little pigs and a wolf in front of their houses.',
 page:{story:{title:'The Three Little Pigs',text:'*Three little pigs* each built a *house*. The first used *straw*. The second used *sticks*. The third used *bricks*. The *Big Bad Wolf* came and huffed and puffed. *Whoosh!* The straw house blew down! *Whoosh!* The stick house blew down! But the *brick* house stood *strong*. The pigs ran inside, safe and sound. The wolf gave up and went home.',pics:['pig','wolf','house','brick'],
   acts:[[null,'farm',['pig','pig','pig'],'Let’s build!'],['straw','farm',['hay','pig'],'Straw!'],['Big Bad Wolf','forest',['wolf:big'],'I’ll huff and puff!'],['brick','farm',['brick','house','pig'],'Safe and sound!']]},
  boxes:[{title:'Story parts',ex:[['pig','*characters*'],['farm','*setting*'],['wolf','*problem*'],['brick','*solution*']],cols:4},
   {title:'Retell it',lines:['*first*: straw house','*next*: stick house','*then*: brick house','*last*: the wolf gives up']}],
  cards:[{q:'Who are the characters?',a:'three *pigs* and a *wolf*'},{q:'What was the solution?',a:'a strong *brick* house'}],
  words:[['character','a person or animal in a story'],['setting','where and when a story happens']]},
 steps:[
  {say:'Read the story',speech:'Three little pigs built houses of straw, sticks and bricks. The wolf blew down two, but the brick house stood strong.',set:S.row(['pig','wolf','house','brick'])},
  {say:'Who is in it?',speech:'Tap the characters: the pigs and the wolf. Not the house!',set:S.tap(['*pig','*wolf','house'],{layout:'row'})},
  {say:'Retell in order',speech:'Tap in order: straw, then sticks, then bricks.',set:S.order(['hay','tree','brick'])}],
 more:{title:'Puppet show',text:'Make paper-bag puppets of the pigs and the wolf. Put on a show and *retell* the story!',pics:['pig','wolf']},
 rounds:[R.tap('Tap the *characters*.',['*pig','*wolf','brick','hay']),R.order('Tap the houses in order: straw, sticks, bricks.',['hay','tree','brick']),
  R.one('Which house stood *strong*?','brick',['hay','tree']),R.one('Who was the *problem* in the story?','wolf',['pig','duck']),R.one('Where did the pigs go to be safe?','house',['tree','car']),
  R.one('Who is a character in *Goldilocks*?','bear',['wolf','pig']),R.order('Retell: egg, then chick, then hen.',['egg','chick','hen']),R.one('How did the pigs feel at the end?','happy face',['sad face','angry face'])],
 tries:[['Tell a story about your toy: who, where, what happened.','e.g. Teddy at the park'],['Change the ending of the Three Pigs!','the wolf becomes their friend']]});

/* 23 ─ Living and non-living */
U({id:'m23',title:'Living or not living?',strand:'My World',codes:[PS],
 guide:{goal:'Sort things into living (they grow, need food, water and air, and have babies) and non-living, and talk about what living things need.',words:'living, non-living, grow, breathe, food, water, air',ask:['Is a tree living?','Does a rock grow?','What do all living things need?'],home:'Go on a nature walk and sort what you find: living or not living?'},
 watch:['Does it grow? Does it eat?','A dog grows, eats and breathes: living. A rock does not: non-living.'],
 fig:'Living and non-living things in a garden.',
 page:{story:{title:'The Robot in the Garden',text:'*Robo* the robot rolled into the garden. "Am I *alive*?" he asked. Ladybug said, "Living things *grow*. Do you grow?" "No." Flower said, "Living things need *water* and *food*. Do you?" "I need *batteries*!" Worm said, "Living things have *babies*." "No…" "Then you are *non-living*," said Ladybug kindly. "But you can still be our *friend*!"',pics:['robot','ladybug','flower','worm'],
   acts:[[null,'garden',['robot','flower'],'Am I alive?'],['grow','garden',['ladybug','seedling'],'Do you grow?'],['batteries','garden',['robot','light bulb'],'Batteries!'],['friend','garden',['robot','ladybug','worm'],'Friends!']]},
  boxes:[{title:'Living things',lines:['*grow* and change','need *food*, *water* and *air*','have *babies*'],ex:[['dog','dog'],['tree','tree'],['fish','fish']],cols:3},
   {title:'Non-living things',ex:[['rock','rock'],['car','car'],['robot','robot']],cols:3}],
  cards:[{q:'Is a flower living?',pics:['flower'],a:'*yes*: it grows and needs water'},{q:'Is a ball living?',pics:['ball'],a:'*no*'}],
  words:[['living','alive: it grows, eats and breathes'],['non-living','not alive']]},
 steps:[
  {say:'Read the story',speech:'Robo asked if he was alive. Living things grow, need food and water, and have babies. Robo is non-living, but still a friend.',set:S.row(['robot','ladybug','flower','worm'])},
  {say:'Living things',speech:'Tap the living things: the dog, the tree and the fish. They grow and need food and water.',set:S.tap(['*dog','*tree','*fish','rock'],{layout:'row'})},
  {say:'Sort them',speech:'Put the living things in the garden basket. Leave the car and the rock.',set:S.tap(['*flower','*bird','car','rock','*frog'],{mode:'collect',basket:'basket'})}],
 more:{title:'Did you know?',text:'Some trees are *thousands* of years old! A tree is a living thing that keeps growing all its life.',pics:['tree']},
 rounds:[R.tap('Tap the *living* things.',['*dog','*tree','*fish','rock','car']),R.tap('Tap the *non-living* things.',['*rock','*car','*ball','cat','flower']),
  R.feed('Put the *living* things in the basket.','basket',['*frog','*flower','*bird','robot','spoon']),R.one('Which one *grows*?','seedling',['rock','ball']),
  R.one('Which one is *non-living*?','robot',['dog','bird']),R.one('Which one needs *food* and *water*?','cat',['car','chair']),R.one('Which one is *living*?','mushroom',['shoe','cup']),R.one('Which one can have *babies*?','hen',['robot','rock'])],
 tries:[['Find 3 living things outside.','tree, ant, bird'],['Is your teddy bear living? Why not?','it does not grow or eat']]});

/* 24 ─ Life cycles */
U({id:'m24',title:'Life cycles: frog and butterfly',strand:'My World',codes:[PS],
 guide:{goal:'Describe how animals change as they grow, ordering the life cycles of a frog (egg, tadpole, froglet, frog) and a butterfly (egg, caterpillar, chrysalis, butterfly).',words:'life cycle, egg, tadpole, frog, caterpillar, chrysalis, butterfly, change',ask:['What does a tadpole become?','What happens inside a chrysalis?','How did you change since you were a baby?'],home:'Look at your baby photos. How have you changed?'},
 watch:['Round and round!','Egg, caterpillar, chrysalis, butterfly… and the butterfly lays an egg again!'],
 fig:'A frog life cycle in a pond.',
 page:{story:{title:'Tadpole’s Big Surprise',text:'In the pond, a tiny *egg* wiggled. Out came *Tad*, a *tadpole* with a long tail. He swam with the fish. "Am I a fish?" One day, Tad grew *back legs*. Then *front legs*! His tail got shorter and shorter. Then — *hop*! — Tad jumped onto a lily pad. "I’m a *frog*!" he croaked. Soon, Tad’s eggs floated in the pond, and the *life cycle* started again.',pics:['egg','tadpole','frog','pond'],
   acts:[[null,'pond',['egg'],'Wiggle!'],['tadpole','pond',['tadpole','fish'],'Am I a fish?'],['back legs','pond',['tadpole','frog'],'Legs!'],['frog','pond',['frog:big'],'I’m a frog! Ribbit!']]},
  boxes:[{title:'Frog life cycle',ex:[['egg','*egg*'],['tadpole','*tadpole*'],['frog','*frog*']],cols:3},
   {title:'Butterfly life cycle',ex:[['egg','egg'],['caterpillar','*caterpillar*'],['chrysalis','*chrysalis*'],['butterfly','*butterfly*']],cols:4}],
  cards:[{q:'What does a caterpillar become?',pics:['caterpillar'],a:'a *butterfly*'},{q:'What comes after the egg in a frog’s life?',a:'a *tadpole*'}],
  words:[['life cycle','the changes a living thing goes through as it grows'],['tadpole','a baby frog with a tail that lives in water']]},
 steps:[
  {say:'Read the story',speech:'Tad hatched from an egg as a tadpole. He grew legs, his tail shrank, and he became a frog. Then his eggs started the cycle again.',set:S.row(['egg','tadpole','frog','pond'])},
  {say:'Frog cycle',speech:'Tap in order: egg, tadpole, frog.',set:S.order(['egg','tadpole','frog'])},
  {say:'Butterfly cycle',speech:'What comes next? Egg, caterpillar, chrysalis… butterfly!',set:S.gap(['egg','caterpillar','chrysalis','?'],['*butterfly','bee','frog'])}],
 more:{title:'Did you know?',text:'A *monarch butterfly* caterpillar eats only *milkweed* leaves. It grows so fast, it gets *2 000 times* bigger in two weeks!',pics:['caterpillar','leaf']},
 rounds:[R.order('Tap the frog life cycle in order.',['egg','tadpole','frog']),R.order('Tap the butterfly life cycle in order.',['caterpillar','chrysalis','butterfly']),
  R.gap('What comes next?',['egg','tadpole','?'],['*frog','fish','chick']),R.gap('What comes next?',['egg','caterpillar','?','butterfly'],['*chrysalis','frog','seed']),
  R.one('What does a *tadpole* grow into?','frog',['fish','bird']),R.one('What does a *caterpillar* grow into?','butterfly',['bee','bird']),R.gap('What comes next?',['egg','chick','?'],['*hen','duck','frog']),R.one('What do baby birds hatch from?','egg',['seed','leaf'])],
 tries:[['Act out the frog life cycle!','curl up, wiggle, hop!'],['Draw the butterfly life cycle in a circle.','4 pictures']]});

/* 25 ─ Sink or float */
U({id:'m25',title:'Sink or float?',strand:'My World',codes:[PS],
 guide:{goal:'Predict and test whether objects sink or float, and talk about what they noticed; explore pushing and pulling to make things move.',words:'sink, float, predict, test, heavy, light, push, pull',ask:['Do you think the rock will sink or float?','Why did the leaf float?','How can you make a boat move?'],home:'Test bath toys: sink or float? Predict first!'},
 watch:['Predict, then test!','A rock sinks to the bottom. A leaf floats on top.'],
 fig:'A tub of water with floating and sunken things.',
 page:{story:{title:'Splash Lab',text:'Dr. Duck opened her *Splash Lab*. "Let’s *predict*: will it *sink* or *float*?" Leo guessed the *rock* would sink. *Plop!* Down it went. Mia guessed the *leaf* would float. Yes! It bobbed on top. The *rubber duck* floated. The *spoon* sank. The *apple*… floated! "Surprise!" Then they *pushed* a toy boat across the water. *Swoosh!*',pics:['duck','rock','leaf','apple'],
   acts:[[null,'lab',['duck','beaker'],'Welcome to the Splash Lab!'],['rock','beach',['rock','droplet'],'Plop! It sinks!'],['leaf','beach',['leaf','droplet'],'It floats!'],['pushed','beach',['sailboat','boy'],'Swoosh!']]},
  boxes:[{title:'Floats',ex:[['leaf','leaf'],['duck','rubber duck'],['apple','apple'],['feather','feather']],cols:4},
   {title:'Sinks',ex:[['rock','rock'],['spoon','spoon'],['coin','coin'],['key','key']],cols:4}],
  cards:[{q:'Will a feather sink or float?',pics:['feather'],a:'*float*'},{q:'Will a coin sink or float?',pics:['coin'],a:'*sink*'}],
  words:[['predict','make a smart guess before you test'],['float','stay on top of the water']]},
 steps:[
  {say:'Read the story',speech:'In the Splash Lab, the rock and the spoon sank. The leaf, the rubber duck and even the apple floated. Then they pushed a boat.',set:S.row(['duck','rock','leaf','apple'])},
  {say:'What floats?',speech:'Tap the things that float: the leaf, the duck and the apple.',set:S.tap(['*leaf','*duck','*apple','rock'],{layout:'row'})},
  {say:'What sinks?',speech:'Now tap the things that sink to the bottom: the rock, the coin and the key.',set:S.tap(['*rock','*coin','*key','feather'],{layout:'row'})}],
 more:{title:'Boat challenge',text:'Make a boat from foil. How many pennies can it carry before it *sinks*?',pics:['sailboat','coin']},
 rounds:[R.tap('Tap the things that *float*.',['*leaf','*feather','*duck','rock','key']),R.tap('Tap the things that *sink*.',['*rock','*coin','*spoon','leaf','feather']),
  R.one('Will a *rock* sink or float? Tap what it does like…','coin',['leaf','feather']),R.one('Which one *floats*?','sailboat',['rock','key']),R.one('Which one *sinks*?','anvil',['feather','balloon']),
  R.one('What do you do to a swing to make it move? Tap the hand: push!','hand',['eye','ear']),R.one('Which one floats in the sky?','balloon',['rock','car']),R.feed('Put the floating toys in the tub.','bucket',['*duck','*sailboat','rock','key'])],
 tries:[['Predict and test 5 things in the sink.','write sink or float'],['Push a toy car, then pull it with a string.','which way does it go?']]});

/* 26 ─ Day, night and the sky */
U({id:'m26',title:'Day, night and the sky',strand:'My World',codes:[PS],
 guide:{goal:'Describe what we see in the day sky (Sun, clouds) and the night sky (Moon, stars), what people and animals do in day and night, and stay safe in the sun.',words:'day, night, Sun, Moon, stars, sky, nocturnal',ask:['What do you see in the night sky?','Which animals wake up at night?','Why do we wear sunscreen?'],home:'Look at the Moon each night for a week. Does its shape change?'},
 watch:['Sun by day, Moon by night!','In the day, the Sun shines. At night, we see the Moon and stars.'],
 fig:'A sky that turns from day to night.',
 page:{story:{title:'Goodnight, Sun',text:'The big *Sun* was getting sleepy. "I’ve been shining all *day*!" she yawned. The children played outside with *sunscreen* and hats. Then the Sun went down. The sky turned orange, then pink, then *dark blue*. Out came the *Moon* and twinkly *stars*. The *owl* woke up: "*Hoo!* Good morning!" "Good *night*, owl," said the children, and they went to bed.',pics:['sun','moon','star','owl'],
   acts:[[null,'park',['sun','girl'],'Shining all day!'],['sunscreen','beach',['sun','hat'],'Sunscreen on!'],['Moon','night',['full moon','star'],'Twinkle!'],['owl','night',['owl','moon'],'Hoo! Good morning!']]},
  boxes:[{title:'Day sky',ex:[['sun','*Sun*'],['cloud','*clouds*'],['bird','birds']],cols:3},
   {title:'Night sky',ex:[['moon','*Moon*'],['star','*stars*'],['owl','owls']],cols:3}],
  cards:[{q:'When do owls wake up?',pics:['owl'],a:'at *night*'},{q:'What protects your skin from the sun?',a:'*sunscreen* and a hat'}],
  words:[['nocturnal','awake at night, like owls and bats'],['star','a faraway sun that twinkles at night']]},
 steps:[
  {say:'Read the story',speech:'The Sun shone all day, then went down. The Moon and stars came out, and the owl woke up.',set:S.row(['sun','moon','star','owl'])},
  {say:'Day things',speech:'Tap the things you see in the day sky: the Sun, a cloud and a bird.',set:S.tap(['*sun','*cloud','*bird','moon'],{layout:'row'})},
  {say:'Night things',speech:'Now tap the night things: the Moon, the stars and the owl.',set:S.tap(['*moon','*star','*owl','sun'],{layout:'row'})}],
 more:{title:'Did you know?',text:'The Sun is a *star*! It looks bigger than other stars because it is much closer to us.',pics:['sun','star']},
 rounds:[R.tap('Tap the *night* things.',['*moon','*star','*owl','sun']),R.tap('Tap the *day* things.',['*sun','*cloud','*rainbow','moon']),
  R.one('Which animal is awake at *night*?','owl',['chicken','bee']),R.one('Which animal is awake at *night*?','bat',['butterfly','dog']),R.one('What keeps you safe in the sun?','hat',['candle','snowman']),
  R.order('Tap in order: morning, then night.',['sun','moon']),R.one('What twinkles at night?','star',['sun','cloud']),R.one('What do we do at night?','bed',['school','soccer'])],
 tries:[['Draw the day sky and the night sky.','sun, clouds / moon, stars'],['Name 2 night animals.','owl, bat, raccoon']]});

/* 27 ─ Healthy me */
U({id:'m27',title:'Healthy me',strand:'Me and My Community',codes:[SR],
 guide:{goal:'Make healthy choices: eat a variety of foods (vegetables and fruit, whole grains, protein), drink water, wash hands, move every day, sleep well and brush teeth.',words:'healthy, vegetables, fruit, water, exercise, sleep, wash hands, germs',ask:['Which snack helps you grow strong?','When should you wash your hands?','Why do we need sleep?'],home:'Make a rainbow plate: one food of each colour!'},
 watch:['Eat, move, sleep, wash!','Fruits and vegetables, water, exercise, clean hands and good sleep keep us healthy.'],
 fig:'A rainbow plate of healthy food.',
 page:{story:{title:'Super Healthy Sam',text:'*Sam* wanted to be a *superhero*. "What’s your power?" asked Grandma. "Hmm…" So Sam ate a *rainbow plate*: red strawberries, orange carrots, green broccoli. He drank *water*. He *ran* and *jumped* at the park. He *washed his hands* with soap for twenty seconds. He *brushed* his teeth and *slept* all night. "My power is being *healthy*!" said Super Sam.',pics:['boy','broccoli','droplet','toothbrush'],
   acts:[[null,'home',['boy','grandma'],'I want a superpower!'],['rainbow plate','kitchen',['strawberry','carrot','broccoli'],'Rainbow plate!'],['ran','park',['boy','ball'],'Run and jump!'],['slept','bedroom',['bed','moon'],'Super Sam! Zzz…']]},
  boxes:[{title:'Healthy habits',ex:[['broccoli','*eat* veggies'],['droplet','*drink* water'],['runner','*move*'],['soap','*wash* hands'],['bed','*sleep*']],cols:5}],
  cards:[{q:'When do you wash your hands?',pics:['soap'],a:'before eating and after the toilet'},{q:'What is the best drink?',pics:['droplet'],a:'*water*'}],
  words:[['healthy','strong and well'],['germs','tiny things that can make us sick; soap washes them away']]},
 steps:[
  {say:'Read the story',speech:'Sam ate a rainbow plate, drank water, played outside, washed his hands, brushed his teeth and slept. His superpower was being healthy!',set:S.row(['boy','broccoli','droplet','toothbrush'])},
  {say:'Rainbow plate',speech:'Fill the plate with healthy food. Tap the strawberry, carrot and broccoli.',set:S.tap(['*strawberry','*carrot','*broccoli','candy'],{mode:'collect',basket:'plate'})},
  {say:'Wash your hands',speech:'Tap the soap and the water to wash away germs. Scrub for twenty seconds!',set:S.tap(['*soap','*droplet'],{layout:'row'})}],
 more:{title:'Handwashing song',text:'Sing *Happy Birthday* twice while you wash your hands. That’s twenty seconds!',pics:['soap','cake']},
 rounds:[R.feed('Fill the plate with *healthy* food.','plate',['*apple','*carrot','*broccoli','candy','donut']),R.one('Which drink is the *healthiest*?','droplet',['juice','soda']),
  R.one('What do you use to clean your teeth?','toothbrush',['comb','spoon']),R.one('What washes away germs?','soap',['mud','candy']),R.tap('Tap the ways to *move* your body.',['*runner','*ball','*bicycle','tv']),
  R.one('What helps you grow and rest?','bed',['tv','candy']),R.tap('Tap all the *vegetables*.',['*carrot','*broccoli','*corn','cookie']),R.tap('Tap all the *fruits*.',['*apple','*banana','*grapes','pizza'])],
 tries:[['Make a rainbow snack.','5 colours!'],['Count to 20 while washing hands.','scrub, scrub!']]});

/* 28 ─ My community and Canada */
U({id:'m28',title:'My community, my Canada',strand:'Me and My Community',codes:[BC],
 guide:{goal:'Name places in the community (school, library, park, store, hospital, fire station), read a simple map, and talk about Canada’s symbols and the many cultures and celebrations of Canadians.',words:'community, map, library, park, Canada, flag, maple leaf, celebrate',ask:['Where do you go to borrow books?','What is on Canada’s flag?','What do you celebrate with your family?'],home:'Draw a map of your street with your home on it.'},
 watch:['We belong!','My community has a school, a park and a library. Canada has a red maple leaf on its flag.'],
 fig:'A little town with a map and a Canada flag.',
 page:{story:{title:'Maple Town Map',text:'Ali’s class made a *map* of *Maple Town*. They drew the *school*, the *library* (to borrow books), the *park*, the *store*, the *hospital* and the *fire station*. "Every place helps our *community*," said Ms. Leung. On the flagpole, a red and white *Canada flag* waved, with a *maple leaf* in the middle. Then everyone shared how their families *celebrate*: Diwali lights, Lunar New Year dragons, Eid sweets, Christmas trees and powwow dancing. "We all *belong* here," said Ali.',pics:['map','school','library','maple leaf'],
   acts:[[null,'town',['map','boy'],'Let’s map our town!'],['library','town',['library','book'],'Borrow books!'],['Canada flag','town',['flag','maple leaf'],'Our flag!'],['celebrate','town',['diya','dragon','christmas tree'],'We all belong!']]},
  boxes:[{title:'Places',ex:[['school','*school*'],['library','*library*'],['park','*park*'],['hospital','*hospital*'],['store','*store*']],cols:5},
   {title:'Canada',ex:[['flag','*flag*'],['maple leaf','*maple leaf*'],['beaver','*beaver*']],cols:3}],
  cards:[{q:'Where do you go when you are very sick?',pics:['hospital'],a:'the *hospital*'},{q:'What leaf is on Canada’s flag?',pics:['maple leaf'],a:'a *maple leaf*'}],
  words:[['community','the people and places where we live'],['map','a drawing of a place from above']]},
 steps:[
  {say:'Read the story',speech:'The class mapped Maple Town: the school, library, park, store, hospital and fire station. They saw the Canada flag and shared how their families celebrate.',set:S.row(['map','school','library','maple leaf'])},
  {say:'Places in town',speech:'Tap each place: school, library, park, hospital.',set:S.look(['school','library','park','hospital'])},
  {say:'Canada',speech:'Tap the symbols of Canada: the maple leaf, the flag and the beaver.',set:S.tap(['*maple leaf','*flag','*beaver','pizza'],{layout:'row'})}],
 more:{title:'Did you know?',text:'People from every country in the world live in Canada. That’s why Canada is like a big, colourful *quilt*!',pics:['globe','quilt']},
 rounds:[R.one('Where do you *borrow books*?','library',['hospital','store']),R.one('Where do you go to *learn*?','school',['park','fire station']),R.one('Where do you *buy food*?','store',['school','library']),
  R.one('Where do sick people get help?','hospital',['park','store']),R.tap('Tap the symbols of *Canada*.',['*maple leaf','*beaver','*flag','pizza']),R.one('What is on Canada’s flag?','maple leaf',['star','sun']),
  R.one('Where can you play on a slide?','park',['library','hospital']),R.one('What do you use to find your way?','map',['spoon','sock'])],
 tries:[['Draw a map from your bed to the kitchen.','add arrows!'],['Share how your family celebrates.','food, music, lights']]});

/* 29 ─ Caring for the Earth */
U({id:'m29',title:'Caring for our Earth',strand:'Me and My Community',codes:[BC,SR],
 guide:{goal:'Take care of the environment: reduce, reuse and recycle, put garbage in the right bin, save water and energy, and respect plants and animals.',words:'reduce, reuse, recycle, compost, garbage, environment',ask:['Which bin does a bottle go in?','How can you reuse a box?','How can we save water?'],home:'Sort your family’s garbage: recycling, compost, garbage.'},
 watch:['Reduce, reuse, recycle!','Paper and bottles go in recycling. Apple cores go in compost.'],
 fig:'Three bins: recycling, compost and garbage.',
 page:{story:{title:'Earth Day Heroes',text:'On *Earth Day*, Ms. Grant’s class became *Earth Heroes*. They picked up *litter* in the park. They *sorted* it: *bottles* and *paper* into the blue *recycling* bin, *banana peels* into the green *compost* bin, and the rest into *garbage*. They made a *robot* out of old boxes: that’s *reusing*! They turned off the tap while brushing teeth to *save water*. The park sparkled. "Thank you, Earth Heroes!" chirped a robin.',pics:['plastic bottle','compost bin','trash','globe'],
   acts:[[null,'park',['trash','girl','boy'],'Earth Day!'],['recycling','park',['plastic bottle','newspaper'],'Blue bin!'],['compost','garden',['compost bin','banana'],'Green bin!'],['robot','classroom',['robot','box'],'Reuse!'],['sparkled','park',['bird','tree'],'Thank you!']]},
  boxes:[{title:'Which bin?',ex:[['plastic bottle','*recycle*'],['newspaper','*recycle*'],['banana','*compost*'],['apple','*compost*']],cols:4},
   {title:'The 3 Rs',lines:['*reduce*: use less','*reuse*: use again','*recycle*: make into something new']}],
  cards:[{q:'Where does a banana peel go?',pics:['banana'],a:'*compost*'},{q:'How can you reuse a jar?',pics:['jar'],a:'a *pencil holder* or a bug house'}],
  words:[['recycle','turn old things into new things'],['compost','food scraps that turn into soil']]},
 steps:[
  {say:'Read the story',speech:'The Earth Heroes picked up litter, sorted bottles and paper into recycling and banana peels into compost, made a robot from boxes, and saved water.',set:S.row(['plastic bottle','compost bin','trash','globe'])},
  {say:'Recycle',speech:'Tap the things that go in the blue recycling bin: the bottle, the newspaper and the can.',set:S.tap(['*plastic bottle','*newspaper','*can','banana'],{mode:'collect',basket:'trash'})},
  {say:'Compost',speech:'Food scraps go in the compost. Tap the banana and the apple core.',set:S.tap(['*banana','*apple','plastic bottle'],{mode:'collect',basket:'compost bin'})}],
 more:{title:'Did you know?',text:'Recycling one aluminum *can* saves enough energy to run a TV for *three hours*!',pics:['can','tv']},
 rounds:[R.feed('Put the *recycling* in the bin.','trash',['*plastic bottle','*newspaper','*can','banana','apple']),R.feed('Put the *food scraps* in the compost.','compost bin',['*banana','*apple','*carrot','plastic bottle','can']),
  R.one('How can you *save water*?','droplet',['tv','car']),R.one('Which can you *reuse* to make a robot?','box',['banana','apple']),R.tap('Tap the things that help the *Earth*.',['*seedling','*bicycle','*compost bin','trash']),
  R.one('What should you do with litter in the park?','trash',['tree','pond']),R.one('Which uses *less* energy?','bicycle',['car','airplane']),R.one('Who do we protect when we keep parks clean?','bird',['robot','car'])],
 tries:[['Make a toy from recycled things.','box robot, bottle rocket'],['Turn off lights when you leave a room.','save energy!']]});
})();
