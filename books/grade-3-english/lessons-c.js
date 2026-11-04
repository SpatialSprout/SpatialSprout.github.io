/* The Interactive Classroom: Grade 3 English — Sentences: four kinds, subject and predicate, joining words, quotation marks, capitals and commas */
(function(){
"use strict";
const P=window.PM;if(!P||!P.unit)return;const U=P.unit,R=P.R,S=P.S;

/* 16 ─ Four kinds of sentences */
U({id:'g16',title:'Four kinds of sentences',strand:'Sentences',codes:['B3.2','D3.1'],
 guide:{goal:'Write and punctuate four kinds of sentences: telling (.), asking (?), surprising/exclamation (!) and commands (. or !).',words:'telling sentence, asking sentence, exclamation, command, period, question mark, exclamation mark',ask:['What mark ends an asking sentence?','How is a command different from a telling sentence?','When do we use an exclamation mark?'],home:'Write one of each kind of sentence about your pet or a favourite animal.'},
 watch:['Four kinds!','It is snowing. Is it snowing? Wow, it is snowing! Put on your boots.'],
 fig:'Four speech bubbles with different end marks.',
 page:{story:{title:'Snow Day Surprise',text:'Ben looked out the window. *It snowed all night.* "Mom, is school closed today?" he asked. Mom checked the radio. "Yes, it is a *snow day*!" Ben jumped up and down. "Hooray! This is the best day ever!" "*Put on your snowsuit*," said Mom. "*Don’t forget your mittens.*" Outside, Ben and his sister built a *giant snowman*. "Can we give him a carrot nose?" asked Lucy. "*Wow, he looks amazing!*" said Ben.',pics:['snowman','mittens','boy','girl'],
   acts:[[null,'bedroom',['boy','snowflake'],'Is it a snow day?'],['Hooray','winter',['boy','girl','sled'],'Hooray!'],['giant snowman','winter',['snowman','carrot','girl'],'Wow, he looks amazing!']]},
  boxes:[{title:'Four kinds of sentences',lines:['*telling*: It snowed all night*.*','*asking*: Is school closed*?*','*surprising*: Hooray, a snow day*!*','*command*: Put on your snowsuit*.*']},
   {title:'Every sentence…',text:'…starts with a *capital letter* and ends with a *mark*: a period (.), a question mark (?) or an exclamation mark (!).'}],
  cards:[{q:'Which mark ends *Can we play outside*',a:'*?*'},{q:'*Close the door.* is a…',a:'*command*'}],
  words:[['command','a sentence that tells someone to do something'],['exclamation','a sentence that shows strong feeling, ending with !']]},
 steps:[
  {say:'Read the story',speech:'It snowed all night. Is school closed today? Hooray, it is a snow day! Put on your snowsuit. Ben and Lucy built a giant snowman. Wow, he looks amazing!',set:S.row(['snowman','mittens','boy','girl'])},
  {say:'Telling and asking',speech:'A telling sentence tells something and ends with a period. An asking sentence asks something and ends with a question mark.',set:S.row(['snowflake','radio'],{labels:['It snowed.','Is school closed?']}),
   cues:[['telling sentence','snowflake','.'],['asking sentence','radio','?']]},
  {say:'Surprising and commands',speech:'A surprising sentence shows strong feeling and ends with an exclamation mark. A command tells someone what to do.',set:S.row(['boy','mittens'],{labels:['Hooray!','Put them on.']}),
   cues:[['strong feeling','boy','!'],['A command','mittens','command']]},
  {say:'Add the mark',speech:'Can we give him a carrot nose? It asks, so it ends with a question mark.',set:S.word('Can we give him a carrot nose','',['?','.','!'],'?',{pic:'snowman'})}],
 more:{title:'Punctuation Changes Meaning!',text:'Read these aloud: *You ate the cake.* *You ate the cake?* *You ate the cake!* The words are the same, but the end marks change how you say them.',pics:['cake']},
 rounds:[R.q('What kind of sentence is *Is it snowing?*',['asking','telling','command'],'asking'),R.q('What kind is *Put on your boots.*',['command','asking','exclamation'],'command'),R.q('Which mark ends a telling sentence?',['.','?','!'],'.'),
  R.word('Which word fits?','Wow, look at that snowman','',['!','?',','],'!',{pic:'snowman'}),R.word('Which word fits?','Where are my mittens','',['?','.','!'],'?',{pic:'mittens'}),
  R.q('Why was there no school?',['it was a snow day','it was Saturday','the teacher was sick'],'it was a snow day'),R.q('What did Lucy want for the nose?',['a carrot','a button','a stick'],'a carrot'),R.tf('Every sentence starts with a capital letter.',true)],
 tries:[['Write a command for a pet.','e.g. *Sit, Rover!*'],['Turn into a question: *The bus is late.*','*Is the bus late?*']]});

/* 17 ─ Subject and predicate */
U({id:'g17',title:'Subject and predicate',strand:'Sentences',codes:['B3.2','D2.4'],
 guide:{goal:'Find the two parts of a sentence: the subject (who or what) and the predicate (what the subject does or is), and build complete sentences.',words:'subject, predicate, complete sentence, fragment',ask:['Who or what is the sentence about?','What does the subject do?','Is “Ran to the park.” a complete sentence?'],home:'Make silly sentences: write subjects and predicates on cards, then mix and match.'},
 watch:['Who + does what!','The puppy (subject) chased its tail (predicate).'],
 fig:'Two halves of a sentence snapping together.',
 page:{story:{title:'The Robot Chef',text:'*Professor Pita* built a *robot chef* named Zip. On Monday, *Zip* cooked pancakes. *The pancakes* flew across the kitchen! On Tuesday, *Zip* baked a cake. *The cake* was as hard as a rock. On Wednesday, *the professor* taught Zip to read recipes. *Zip* followed the steps carefully. *His spaghetti* tasted perfect! *Everyone in town* came for dinner. Now *Zip’s Diner* is the busiest restaurant on Maple Street.',pics:['robot','pancakes','cake','spaghetti'],
   acts:[[null,'kitchen',['robot','pancakes'],'Pancakes are flying!'],['baked a cake','kitchen',['robot','cake'],'Hard as a rock!'],['spaghetti','kitchen',['spaghetti','robot','woman'],'Perfect!']]},
  boxes:[{title:'Two parts of a sentence',text:'The *subject* tells *who or what* the sentence is about. The *predicate* tells what the subject *does* or *is*.',lines:['*Zip* | cooked pancakes.','*The cake* | was as hard as a rock.','*Everyone in town* | came for dinner.']},
   {title:'Complete or not?',lines:['*Baked a cake.* → no subject','*The robot chef.* → no predicate','*Zip baked a cake.* → complete!']}],
  cards:[{q:'Subject of *The dog barked.*',a:'*The dog*'},{q:'Predicate of *Sam reads books.*',a:'*reads books*'}],
  words:[['subject','who or what a sentence is about'],['predicate','what the subject does or is']]},
 steps:[
  {say:'Read the story',speech:'Professor Pita built a robot chef named Zip. Zip cooked pancakes, and the pancakes flew. The cake was as hard as a rock. Zip followed recipes, and his spaghetti tasted perfect.',set:S.row(['robot','pancakes','cake','spaghetti'])},
  {say:'Find the subject',speech:'Who or what is the sentence about? In “Zip cooked pancakes,” the subject is Zip.',set:S.build(['Zip','cooked','pancakes.'],'robot')},
  {say:'Find the predicate',speech:'What did the subject do? Cooked pancakes. That is the predicate.',set:S.word('Zip','',['cooked pancakes.','the robot','in the kitchen'],'cooked pancakes.',{pic:'robot'})},
  {say:'Make it complete',speech:'Baked a cake has no subject. Add one: Zip baked a cake. Now it is a complete sentence.',set:S.word('','baked a cake.',['Zip','Cake','Baked'],'Zip',{pic:'cake'})}],
 more:{title:'Sentence Mix-Up',text:'Mix subjects and predicates for silly sentences: *The moose* + *danced ballet*. *My teacher* + *flew to the moon*. *A tiny ant* + *lifted a car*!',pics:['moose','ant']},
 rounds:[R.q('Find the subject: *The pancakes flew.*',['The pancakes','flew','The'],'The pancakes'),R.q('Find the predicate: *Zip baked a cake.*',['baked a cake','Zip','a cake'],'baked a cake'),
  R.q('Which is a complete sentence?',['The robot cooks.','The robot','cooks dinner'],'The robot cooks.'),R.build('Build a sentence.',['Everyone','came','for','dinner.'],'spaghetti'),
  R.word('Which word fits?','','was as hard as a rock.',['The cake','Baked','Hard'],'The cake',{pic:'cake'}),R.q('What was the robot’s name?',['Zip','Pita','Chef'],'Zip'),
  R.q('What tasted perfect?',['his spaghetti','the cake','the pancakes'],'his spaghetti'),R.tf('Every complete sentence has a subject and a predicate.',true)],
 tries:[['Write a sentence and underline the subject.','e.g. *__My cat__ sleeps a lot.*'],['Fix: *Ran to the store.*','*Mom ran to the store.*']]});

/* 18 ─ Joining sentences */
U({id:'g18',title:'Joining sentences',strand:'Sentences',codes:['B3.2','D2.4'],
 guide:{goal:'Join two short sentences with joining words (and, but, or, so, because) to make longer, smoother sentences.',words:'joining word, conjunction, and, but, or, so, because, combine',ask:['Which joining word shows a reason?','When do you use but?','Join: I like apples. I like pears.'],home:'Read a short story aloud and find the joining words.'},
 watch:['Glue sentences together!','It was raining. We stayed inside. → It was raining, so we stayed inside.'],
 fig:'Two sentence trains linked with a joining word.',
 page:{story:{title:'Rainy Day Fort',text:'It was raining, *so* Omar and Leila could not play outside. They wanted to play soccer, *but* the field was a giant puddle. "We can read books *or* we can build a fort," said Leila. They chose the fort *because* forts are the best! They used blankets, pillows *and* chairs. Omar brought a flashlight, *and* Leila brought snacks. The fort fell down twice, *but* they fixed it. At bedtime they were tired, *but* they were happy.',pics:['blanket','pillow','flashlight','cloud'],
   acts:[[null,'sky',['cloud','umbrella'],'It’s raining!'],['build a fort','home',['blanket','chair','boy'],'Let’s build a fort!'],['flashlight','night',['flashlight','girl','boy'],'Cozy!']]},
  boxes:[{title:'Joining words',lines:['*and*: adds more','*but*: shows something different','*or*: gives a choice','*so*: tells what happened next','*because*: gives a reason']},
   {title:'Join two sentences',lines:['It rained. We stayed in.','→ It rained, *so* we stayed in.','I like soccer. It was too wet.','→ I like soccer, *but* it was too wet.']}],
  cards:[{q:'Which word gives a reason?',a:'*because*'},{q:'Join: *Do you want milk? Do you want juice?*',a:'Do you want milk *or* juice?'}],
  words:[['conjunction','a joining word like and, but, or'],['combine','put two things together']]},
 steps:[
  {say:'Read the story',speech:'It was raining, so they could not play outside. They wanted soccer, but the field was a puddle. They could read or build a fort. They chose the fort because forts are the best.',set:S.row(['blanket','pillow','flashlight','cloud'])},
  {say:'And, or, but',speech:'And adds more: blankets and pillows. Or gives a choice: read or build. But shows something different: we wanted soccer, but it was wet.',set:S.row(['blanket','book','ball'],{labels:['and','or','but']}),
   cues:[['And adds more','blanket','and'],['Or gives a choice','book','or'],['But shows','ball','but']]},
  {say:'So and because',speech:'So tells what happened next. Because tells why. It rained, so we stayed in. We stayed in because it rained.',set:S.word('They chose the fort','forts are the best.',['because','or','but'],'because',{pic:'blanket'})},
  {say:'Join them',speech:'It was raining. We stayed inside. Join them with so: It was raining, so we stayed inside.',set:S.build(['It','was','raining,','so','we','stayed','inside.'],'umbrella')}],
 more:{title:'Writer’s Tip',text:'Too many *and*s make a sentence a runaway train: *We went and we ate and we played and we slept.* Good writers use *different* joining words and short sentences too.',pics:['train']},
 rounds:[R.word('Which word fits?','I wanted to swim,','the pool was closed.',['but','and','or'],'but',{pic:'swimmer'}),R.word('Which word fits?','Do you want an apple','a pear?',['or','but','because'],'or',{pic:'apple'}),
  R.word('Which word fits?','I wore my coat','it was cold.',['because','or','but'],'because',{pic:'coat'}),R.word('Which word fits?','It was late,','we went to bed.',['so','or','because'],'so',{pic:'bed'}),
  R.q('Why couldn’t they play soccer?',['the field was a puddle','they had no ball','it was dark'],'the field was a puddle'),R.q('What did Leila bring?',['snacks','a flashlight','a ball'],'snacks'),
  R.q('Which joining word adds more?',['and','but','because'],'and'),R.tf('*Because* gives a reason.',true)],
 tries:[['Join: *I like dogs. My sister likes cats.*','*I like dogs, but my sister likes cats.*'],['Finish: *I was hungry, so…*','e.g. *I ate a sandwich.*']]});

/* 19 ─ Quotation marks */
U({id:'g19',title:'Quotation marks',strand:'Sentences',codes:['B3.3','D3.1'],
 guide:{goal:'Use quotation marks to show the exact words someone says, with a comma or end mark inside, and use speaking words like said, asked and shouted.',words:'quotation marks, speaker, dialogue, said, asked',ask:['What do quotation marks show?','Where does the comma go?','Name three words to use instead of said.'],home:'Write a short conversation between you and a pet. Use quotation marks!'},
 watch:['Who said it?','“Look out!” shouted Max. The quotation marks hug the words Max said.'],
 fig:'Speech bubbles turning into quotation marks.',
 page:{story:{title:'The Talking Parrot',text:'Grandpa’s parrot, Rio, could talk. "Good morning!" Rio *squawked* every day. One afternoon, Ella asked, "Rio, do you want a cracker?" Rio tilted his head. "*Cracker, please!*" he said. Ella laughed. Then the doorbell rang. "Who is it?" called Grandpa. "*Pizza!*" shouted Rio. Grandpa opened the door, but nobody was there. "Rio, you silly bird," he chuckled. Rio fluffed his feathers. "*Silly bird!*" he agreed.',pics:['parrot','grandpa','girl','pizza'],
   acts:[[null,'home',['parrot','grandpa'],'Good morning!'],['cracker','home',['parrot','girl'],'Cracker, please!'],['doorbell','town',['house','parrot'],'Pizza!']]},
  boxes:[{title:'Quotation marks',text:'*Quotation marks* go around the *exact words* someone says.',lines:['"Good morning!" Rio squawked.','Ella asked, "Do you want a cracker?"','"Pizza!" shouted Rio.']},
   {title:'Speaking words',ex:[['parrot','*said*, *squawked*'],['girl','*asked*'],['grandpa','*called*, *chuckled*'],['boy','*shouted*, *whispered*']],cols:2}],
  cards:[{q:'Add quotation marks: I am hungry, said Sam.',a:'"I am hungry," said Sam.'},{q:'A word instead of *said*?',a:'*whispered*, shouted, asked…'}],
  words:[['quotation marks','marks " " that show exact spoken words'],['dialogue','a conversation between characters']]},
 steps:[
  {say:'Read the story',speech:'Rio the parrot squawked, good morning! Ella asked, Rio, do you want a cracker? Cracker, please! he said. When the doorbell rang, Rio shouted, pizza!',set:S.row(['parrot','grandpa','girl','pizza'])},
  {say:'Hug the words',speech:'Quotation marks hug the exact words a character says. Good morning, Rio squawked. Only the words Rio said go inside.',set:S.row(['parrot'],{labels:['"Good morning!"']}),
   cues:[['exact words','parrot','" "']]},
  {say:'Who is speaking?',speech:'Speaking words tell who is talking and how: Ella asked. Rio shouted. Grandpa chuckled.',set:S.row(['girl','parrot','grandpa'],{labels:['asked','shouted','chuckled']}),
   cues:[['Ella asked','girl','asked'],['Rio shouted','parrot','shouted'],['Grandpa chuckled','grandpa','chuckled']]},
  {say:'Choose the speaking word',speech:'The bird spoke loudly. Which word fits best? Shouted!',set:S.word('"Pizza!"','Rio.',['shouted','whispered','asked'],'shouted',{pic:'parrot'})}],
 more:{title:'Comic Connection',text:'Comics use *speech bubbles* instead of quotation marks. When you turn a comic into a story, put the words from each bubble inside quotation marks!',pics:['book']},
 rounds:[R.q('Which sentence is written correctly?',['"I like pizza," said Max.','I like pizza, "said Max."','"I like pizza, said Max."'],'"I like pizza," said Max.'),R.q('What do quotation marks show?',['the exact words someone says','a list','a title only'],'the exact words someone says'),
  R.word('Which word fits?','"Can I come too?"','Lily.',['asked','shouted','laughed'],'asked',{pic:'girl'}),R.word('Which word fits?','"Shh, the baby is sleeping,"','Mom.',['whispered','shouted','yelled'],'whispered',{pic:'baby'}),
  R.q('What did Rio shout when the doorbell rang?',['Pizza!','Hello!','Cracker!'],'Pizza!'),R.q('What kind of bird is Rio?',['a parrot','an owl','a duck'],'a parrot'),
  R.q('Where does the comma go in: "Hello," said Ben?',['inside the quotation marks','after said','nowhere'],'inside the quotation marks'),R.tf('Quotation marks go around the speaker’s name.',false)],
 tries:[['Write what your friend said at recess with quotation marks.','e.g. "Let’s play tag!" said Ava.'],['Find dialogue in a book. Who is talking?','look for " "']]});

/* 20 ─ Capitals and commas */
U({id:'g20',title:'Capital letters and commas',strand:'Sentences',codes:['B3.3','D3.1'],
 guide:{goal:'Use capital letters for sentence beginnings, I, names, places, days, months and holidays; use commas in dates, addresses, lists and after greetings and closings in letters.',words:'capital letter, comma, date, address, list, greeting, closing',ask:['Where do commas go in a date?','How do you write a list with commas?','Why does I always get a capital?'],home:'Write a postcard to a relative with a date, a greeting, a list and a closing.'},
 watch:['Pause with a comma!','I packed socks, a hat, mittens and a book. Commas separate things in a list.'],
 fig:'A letter with capitals and commas highlighted.',
 page:{story:{title:'A Letter to Grandpa',text:'*Ottawa, Ontario* *March 3, 2026* *Dear Grandpa,* On *Saturday* we went skating on the *Rideau Canal*! I wore my red hat, my green scarf, my warm mittens and my new skates. *Mom*, *Dad* and *I* skated all the way to the *Parliament* buildings. We ate *BeaverTails*, drank hot chocolate and watched the ice sculptures. I wish you could come in *April* for the tulips. *Love,* *Kai*',pics:['letter','skates','scarf','parliament'],
   acts:[[null,'winter',['skates','boy','woman'],'Skating on the canal!'],['Parliament','city',['parliament','flag'],'The Parliament buildings!'],['tulips','garden',['tulip','flower'],'Tulips in April!']]},
  boxes:[{title:'Capital letters',lines:['the *first word* of a sentence','the word *I*','names: *Kai*, *Grandpa*','places: *Ottawa*, *Rideau Canal*','days, months, holidays: *Saturday*, *April*']},
   {title:'Commas',lines:['dates: March 3*,* 2026','places: Ottawa*,* Ontario','lists: hats*,* scarves*,* mittens and skates','letters: Dear Grandpa*,* … Love*,*']}],
  cards:[{q:'Fix: *on monday i went to toronto.*',a:'*On Monday I went to Toronto.*'},{q:'Add commas: apples pears and plums',a:'apples*,* pears and plums'}],
  words:[['comma','a mark , that shows a small pause or separates things'],['greeting','the hello part of a letter, like Dear Grandpa,']]},
 steps:[
  {say:'Read the story',speech:'Kai wrote from Ottawa on March third. Dear Grandpa, on Saturday we went skating on the Rideau Canal. I wore my red hat, my green scarf, my warm mittens and my new skates. Love, Kai.',set:S.row(['letter','skates','scarf','parliament'])},
  {say:'Capitals',speech:'Capital letters start sentences and names: Kai, Grandpa. Places: Ottawa, Rideau Canal. Days and months: Saturday, April. And always the word I.',set:S.row(['boy','city','calendar'],{labels:['Kai','Ottawa','April']}),
   cues:[['Kai, Grandpa','boy','names'],['Ottawa','city','places'],['Saturday, April','calendar','days, months']]},
  {say:'Commas in a list',speech:'Use commas between things in a list: my red hat, my green scarf, my warm mittens and my new skates.',set:S.row(['hat','scarf','mittens','skates'],{labels:['hat,','scarf,','mittens and','skates']}),
   cues:[['red hat','hat','comma'],['green scarf','scarf','comma'],['warm mittens','mittens','and'],['new skates','skates','end']]},
  {say:'Commas in letters and dates',speech:'Put a comma between the day and the year: March three, twenty twenty-six. And after the greeting and closing: Dear Grandpa, Love, Kai.',set:S.word('Dear Grandpa','',[',','.','!'],',',{pic:'letter'})}],
 more:{title:'Did you know?',text:'The *Rideau Canal Skateway* in Ottawa is almost *8 kilometres* long. It is one of the biggest skating rinks in the world! People skate to work and school on it.',pics:['skates','snowflake']},
 rounds:[R.q('Which needs a capital letter?',['saturday','skates','scarf'],'saturday'),R.q('Which date is written correctly?',['March 3, 2026','march 3 2026','March, 3 2026'],'March 3, 2026'),
  R.q('Which list uses commas correctly?',['hats, mittens and skates','hats mittens, and skates','hats, mittens, and, skates'],'hats, mittens and skates'),R.word('Which word fits?','Love','Kai',[',','.','?'],',',{pic:'letter'}),
  R.q('Where did Kai skate?',['the Rideau Canal','Lake Louise','a backyard rink'],'the Rideau Canal'),R.q('When does Kai want Grandpa to come?',['in April','in March','on Saturday'],'in April'),
  R.q('Which is correct?',['Mom and I went skating.','Mom and i went skating.','mom and I went skating.'],'Mom and I went skating.'),R.tf('The word *I* is always a capital letter.',true)],
 tries:[['Write today’s date with a comma.','e.g. *November 4, 2026*'],['Write a list of 4 favourite foods with commas.','*pizza, apples, rice and soup*']]});
})();
