/* The Interactive Classroom: Grade 1 English — Units 8–15: proper nouns, plurals, sentences, capitals */
(function(){
"use strict";
const P=window.PM;if(!P||!P.unit)return;const U=P.unit,R=P.R,S=P.S;

/* 8 ─ Proper nouns */
U({id:'e08',title:'Proper nouns',strand:'Words',codes:['B3','C1'],
 guide:{goal:'Know that a proper noun names one special person, animal, place or thing, and always starts with a capital letter.',words:'proper noun, special name, capital letter',ask:['What is a proper noun for *city*?','Why does *Max* start with a capital letter?'],home:'Write the names of family members and pets. Check every name starts with a capital.'},
 watch:['Proper nouns','Watch: girl is a common noun, but Mia is a proper noun. It is her special name, so it gets a capital M.'],
 fig:'Special names with capital letters.',
 page:{story:{title:'A Letter from Vancouver',text:'Hi *Leo*! I moved to *Vancouver*. Our new street is called *Maple Lane*. My cat *Biscuit* loves the big window. On *Sunday* we went to *Stanley Park* and saw a heron by the water. I miss *Toronto*, but I like it here. From, *Nora*',pics:['girl','cat','park','bird']},
  boxes:[{title:'Proper nouns',text:'A *proper noun* names a *special* person, animal, place or thing. It always begins with a *capital letter*.',ex:[['girl','*M*ia'],['dog','*R*ex'],['city','*O*ttawa'],['canada','*C*anada']]}],
  cards:[{q:'Common or proper?',pics:['girl'],a:'girl → common, *A*nna → proper'},{q:'Fix it: *we live in calgary.*',pics:[],a:'We live in *C*algary.'}],
  words:[['proper noun','a special name for one person, animal, place or thing'],['capital letter','A, B, C… the big letters']]},
 steps:[
  {say:'Read the letter',speech:'Hi Leo! I moved to Vancouver. My cat Biscuit loves the big window. On Sunday we went to Stanley Park. From, Nora.',set:S.row(['boy','city','cat','park'],{labels:['Leo','Vancouver','Biscuit','Stanley Park']}),
   cues:[['hi leo','boy','Leo'],['to vancouver','city','Vancouver'],['cat biscuit','cat','Biscuit'],['stanley park','park','Stanley Park']]},
  {say:'Special names',speech:'Girl is a common noun. Mia is a proper noun, because it is one girl’s special name. Dog is common, but Rex is proper. Proper nouns start with a capital letter.',set:S.row(['girl','dog','city','canada'],{labels:['Mia','Rex','Ottawa','Canada']}),
   cues:[['mia is a proper noun','girl','Mia'],['rex is proper','dog','Rex'],['capital letter','city|canada','capital!']]},
  {say:'Give it a capital',speech:'The name ottawa needs a capital O. Watch the capital O fill the first space.',set:S.fill('city','Ottawa',0,['O','o','A']),
   cues:[['needs a capital o','city','Ottawa'],['fill the first space','gap','O','done']]}],
 rounds:[R.ask('Which is a *proper noun*?',null,['city','Toronto','street'],'Toronto'),R.ask('Which is a *proper noun*?',null,['dog','pet','Max'],'Max'),
  R.fill('Give the name a capital letter.','girl','Emma',0,['E','e','A']),R.sort('Common noun or proper noun?',['common','proper'],[['city',0,'city'],['canada',1,'Canada'],['boy',0,'boy'],['boy',1,'Omar'],['dog',0,'dog'],['dog',1,'Bella']]),
  R.ask('Which word needs a capital letter? *we saw lucy at the park.*',null,['saw','lucy','park'],'lucy',{ok:'Yes! Lucy is a name, so it needs a capital L.'}),R.fill('Give the place a capital letter.','city','Halifax',0,['H','h','N'])],
 tries:[['Write your name. Does it start with a capital?','Names are *proper nouns*: always a capital!'],['Is *Monday* a proper noun?','*Yes*: days have special names.']]});

/* 9 ─ Singular and plural */
U({id:'e09',title:'One and more than one',strand:'Words',codes:['B3','C1'],
 guide:{goal:'Tell singular nouns (one) from plural nouns (more than one), and make plurals by adding s.',words:'singular, plural, one, more than one, add s',ask:['What is the plural of *cat*?','Is *apples* singular or plural?'],home:'Count things at home: one spoon, two spoons, three spoons!'},
 watch:['Add an s','One cat. Two cats! Watch the s block make the word plural.'],
 fig:'Singular and plural: one, or more than one.',
 page:{story:{title:'The New Baby',text:'Today my baby brother came home! He has tiny *hands* and ten tiny *toes*. Grandma brought two soft *blankets*. Dad made a *cake*. My *friends* sent cards with *hearts* and *stars*. I am a big sister now. I will sing him songs and read him books.',pics:['baby','family','cake','gift']},
  boxes:[{title:'Singular and plural',text:'A *singular* noun names *one*. A *plural* noun names *more than one*. Many plurals just add *s*.',ex:[['cat','one cat'],['cat','two cat*s*'],['apple','one apple'],['apple','three apple*s*']]}],
  cards:[{q:'Singular or plural?',pics:['star','star','star'],a:'star*s*: plural'},{q:'Make it plural: one bird, two ___',pics:['bird','bird'],a:'bird*s*'}],
  words:[['singular','just one'],['plural','more than one']]},
 steps:[
  {say:'Read the story',speech:'Today my baby brother came home! Grandma brought two soft blankets. Dad made a cake. My friends sent cards with hearts and stars.',set:S.row(['baby','gift','cake','star'],{labels:['brother','blankets','cake','stars']}),
   cues:[['my baby brother','baby','one brother'],['two soft blankets','gift','blankets'],['made a cake','cake','one cake'],['and stars','star','stars']]},
  {say:'One or more than one',speech:'Singular means one: one cat. Plural means more than one: two cats. One apple, three apples.',set:S.row(['cat','cat','apple','apple'],{labels:['cat','cats','apple','apples']}),
   cues:[['one cat','cat','singular'],['two cats','cat','plural'],['three apples','apple','plural']]},
  {say:'Add s to make a plural',speech:'Most nouns add an s to name more than one. Book becomes books. Watch the s block slide into place.',set:S.fill('books','books',4,['s','e','a']),
   cues:[['add an s','#s','s'],['book becomes books','books','books'],['slide into place','gap','s','done']]}],
 rounds:[R.fill('Make it plural: *one cat, two cat_*.','cat','cats',3,['s','a','e']),R.sort('Singular or plural?',['one','more than one'],[['dog',0,'dog'],['dog',1,'dogs'],['tree',0,'tree'],['tree',1,'trees'],['ball',0,'ball'],['ball',1,'balls']]),
  R.ask('Is *apples* singular or plural?',['apple','apple','apple'],['singular','plural'],'plural'),R.fill('Make it plural: *one hat, three hat_*.','hat','hats',3,['s','e','t']),
  R.ask('Which word means more than one?',null,['frog','frogs'],'frogs'),R.fillw('Choose the right word: *I see two ___.*',['I','see','two','_'],['ducks.','duck.'],'ducks.')],
 tries:[['What is the plural of *pen*?','*pens*'],['Is *flower* singular or plural?','*singular*: just one']]});

/* 10 ─ Sentences */
U({id:'e10',title:'Sentences',strand:'Sentences',codes:['B3','D2'],
 guide:{goal:'Know that a sentence tells a complete thought, begins with a capital letter and ends with a punctuation mark.',words:'sentence, complete thought, capital letter, period',ask:['Is *the big red* a sentence? Why not?','How does a sentence begin and end?'],home:'Say a sentence about your day. Count the words together.'},
 watch:['Build a sentence','Tap the words in order: The baby is sleeping. It starts with a capital and ends with a period.'],
 fig:'Word blocks that build complete sentences.',
 page:{story:{title:'Chores at Our House',text:'Everyone helps at our house. Mom washes the *dishes*. Dad takes out the *garbage*. My big brother feeds our *dog*. I make my *bed* and put away my *toys*. When the chores are done, we all go to the park together!',pics:['woman','garbage','dog','bed']},
  boxes:[{title:'Sentences',text:'A *sentence* is a group of words that tells a *complete thought*. It begins with a *capital letter* and ends with a *period* (.).',ex:[['baby','*T*he baby is sleeping*.*'],['dog','*M*y dog can run*.*']],cols:2,big:true}],
  cards:[{q:'Is it a sentence? *the big red*',pics:[],a:'*No*: it is not a complete thought.'},{q:'Is it a sentence? *I make my bed.*',pics:['bed'],a:'*Yes!*'}],
  words:[['sentence','words that tell a complete thought'],['period','the dot (.) at the end']]},
 steps:[
  {say:'Read about chores',speech:'Everyone helps at our house. Mom washes the dishes. Dad takes out the garbage. My big brother feeds our dog. I make my bed.',set:S.row(['plate','garbage','dog','bed'],{labels:['dishes','garbage','dog','bed']}),
   cues:[['washes the dishes','plate','dishes'],['out the garbage','garbage','garbage'],['feeds our dog','dog','dog'],['make my bed','bed','bed']]},
  {say:'A complete thought',speech:'A sentence tells a complete thought. The baby is sleeping. It begins with a capital T, and ends with a period.',set:S.build(['The','baby','is','sleeping.'],'baby'),
   cues:[['the baby is sleeping','*','','play'],['capital t','#The','capital'],['with a period','#sleeping.','period']]},
  {say:'Not a sentence',speech:'The big red is not a sentence. It does not tell a complete thought. The big red what? The big red ball bounces. Now it is a sentence!',set:S.build(['The','big','red','ball','bounces.'],'ball'),
   cues:[['is not a sentence','#The|#big|#red','not yet'],['red ball bounces','*','','play']]}],
 rounds:[R.build('Build the sentence: *My dog can run.*',['My','dog','can','run.'],'dog'),R.ask('Is this a sentence? *the tall green*',null,['yes','no'],'no',{ok:'Right! It is not a complete thought.'}),
  R.build('Build the sentence: *We go to school.*',['We','go','to','school.'],'school'),R.ask('Is this a sentence? *Sam likes apples.*',['apple'],['yes','no'],'yes'),
  R.fillw('Finish the sentence: *The cat ___.*',['The','cat','_'],['is sleeping.','the.','and.'],'is sleeping.'),R.build('Build the sentence: *I make my bed.*',['I','make','my','bed.'],'bed')],
 tries:[['How does a sentence begin?','With a *capital letter*.'],['Make a sentence about a *fish*.','*The fish swims.*']]});

/* 11 ─ Telling sentences */
U({id:'e11',title:'Telling sentences',strand:'Sentences',codes:['B3','D2'],
 guide:{goal:'Write telling sentences that tell about someone or something and end with a period.',words:'telling sentence, statement, period',ask:['What does a telling sentence do?','What mark ends a telling sentence?'],home:'Tell three telling sentences about your favourite food.'},
 watch:['A telling sentence','A telling sentence tells something. It ends with a period. Watch the period go at the end.'],
 fig:'Telling sentences end with a period.',
 page:{story:{title:'Dumplings with Grandma',text:'My grandma makes *dumplings*. She rolls the dough flat. I put a spoon of potato and cheese in the middle. We pinch the edges closed. Then Grandma boils them in a big *pot*. We eat them with sour cream. They are my favourite food!',pics:['grandma','perogies','pot','cheese']},
  boxes:[{title:'Telling sentences',text:'A *telling sentence* tells about someone or something. It begins with a capital letter and ends with a *period* (.).',ex:[['perogies','We eat dumplings*.*'],['grandma','Grandma is kind*.*']],cols:2,big:true}],
  cards:[{q:'Add the end mark: *The pot is hot*',pics:['pot'],a:'The pot is hot*.*'},{q:'Is it a telling sentence? *I like cheese.*',pics:['cheese'],a:'*Yes*: it tells something.'}],
  words:[['telling sentence','tells something; ends with a period'],['period','.']]},
 steps:[
  {say:'Read the story',speech:'My grandma makes dumplings. I put a spoon of potato and cheese in the middle. Then Grandma boils them in a big pot.',set:S.row(['grandma','perogies','cheese','pot'],{labels:['Grandma','dumplings','cheese','pot']}),
   cues:[['my grandma','grandma','Grandma'],['makes dumplings','perogies','dumplings'],['and cheese','cheese','cheese'],['big pot','pot','pot']]},
  {say:'It tells something',speech:'A telling sentence tells about someone or something. We eat dumplings. It ends with a period.',set:S.fillw(['We','eat','dumplings','_'],['.','?','!'],'.'),
   cues:[['we eat dumplings','#We|#eat|#dumplings','tells'],['with a period','gap','.','done']]},
  {say:'More telling sentences',speech:'Grandma is kind. The pot is hot. Each one tells something, and each one ends with a period.',set:S.build(['Grandma','is','kind.'],'grandma'),
   cues:[['grandma is kind','*','','play'],['with a period','#kind.','period']]}],
 rounds:[R.fillw('End the telling sentence: *The sun is hot*',['The','sun','is','hot','_'],['.','?'],'.'),R.build('Build the telling sentence: *I like soup.*',['I','like','soup.'],'soup'),
  R.ask('Which is a telling sentence?',null,['The dog is brown.','Is the dog brown?'],'The dog is brown.'),R.fillw('End the telling sentence: *My cat is soft*',['My','cat','is','soft','_'],['.','?'],'.'),
  R.build('Build the telling sentence: *We ride the bus.*',['We','ride','the','bus.'],'bus'),R.ask('What ends a telling sentence?',null,['period .','question mark ?'],'period .')],
 tries:[['Tell a telling sentence about the *weather*.','*It is sunny today.*'],['Fix it: *the apple is red*','*T*he apple is red*.*']]});

/* 12 ─ Asking sentences */
U({id:'e12',title:'Asking sentences',strand:'Sentences',codes:['B3','D2'],
 guide:{goal:'Write asking sentences (questions) that begin with a capital letter and end with a question mark.',words:'asking sentence, question, question mark, who, what, where, when, why',ask:['What words often start a question?','What mark ends an asking sentence?'],home:'Ask each family member one question at dinner.'},
 watch:['An asking sentence','An asking sentence asks something. It ends with a question mark.'],
 fig:'Asking sentences end with a question mark.',
 page:{story:{title:'The Sun and the Wind',text:'The Wind said, "I am stronger than you!" The Sun asked, "*Can you take that boy’s coat off?*" The Wind blew and blew, but the boy held his coat tight. Then the Sun shone warm and bright. The boy got hot and took off his coat. Gentle can be strong!',pics:['wind','sun','boy','coat']},
  boxes:[{title:'Asking sentences',text:'An *asking sentence* asks about someone or something. It begins with a capital letter and ends with a *question mark* (?).',ex:[['question','What do you like*?*'],['sun','Is the sun hot*?*']],cols:2,big:true}],
  cards:[{q:'Add the end mark: *Where is my hat*',pics:['hat'],a:'Where is my hat*?*'},{q:'Words that ask:',pics:[],a:'*who, what, where, when, why, how*'}],
  words:[['asking sentence','asks something; ends with ?'],['question mark','?']]},
 steps:[
  {say:'Read the fable',speech:'The Wind said, I am stronger than you! The Sun asked, can you take that boy’s coat off? The Wind blew and blew, but the boy held his coat tight. Then the Sun shone warm and bright, and the boy took off his coat.',set:S.row(['wind','sun','boy','coat'],{labels:['Wind','Sun','boy','coat']}),
   cues:[['the wind said','wind','Wind'],['the sun asked','sun','Sun'],['the boy held','boy','boy'],['off his coat','coat','coat']]},
  {say:'It asks something',speech:'An asking sentence asks something. What do you like? It ends with a question mark.',set:S.fillw(['What','do','you','like','_'],['?','.','!'],'?'),
   cues:[['what do you like','#What','asks'],['question mark','gap','?','done']]},
  {say:'Question words',speech:'Many questions start with who, what, where, when, why or how. Where is my hat? Who is at the door?',set:S.build(['Where','is','my','hat?'],'hat'),
   cues:[['who, what, where','#Where','question word'],['where is my hat','*','','play']]}],
 rounds:[R.fillw('End the asking sentence: *Do you like pizza*',['Do','you','like','pizza','_'],['?','.'],'?'),R.build('Build the question: *Where is the cat?*',['Where','is','the','cat?'],'cat'),
  R.ask('Which is an asking sentence?',null,['Can you swim?','I can swim.'],'Can you swim?'),R.fillw('End the asking sentence: *What time is it*',['What','time','is','it','_'],['?','.'],'?'),
  R.ask('Which word can start a question?',null,['Where','Blue','Jump'],'Where'),R.build('Build the question: *Can we go out?*',['Can','we','go','out?'],'park')],
 tries:[['Ask a question about a *dog*.','*Can your dog jump?*'],['What mark ends a question?','the *question mark* ?']]});

/* 13 ─ Surprising sentences */
U({id:'e13',title:'Surprising sentences',strand:'Sentences',codes:['B3','D2'],
 guide:{goal:'Write sentences that show strong feelings like surprise, fear, joy or anger, ending with an exclamation mark.',words:'exclamation, exclamation mark, strong feeling',ask:['What does ! tell us?','Read *Look out!* in a strong voice.'],home:'Say a sentence three ways: as telling, asking and surprising.'},
 watch:['A surprising sentence','Wow, it is snowing! A surprising sentence shows a strong feeling and ends with an exclamation mark.'],
 fig:'Strong feelings end with an exclamation mark.',
 page:{story:{title:'Duck Pond Surprise',text:'Ben and Ava went to feed the ducks. Ben threw some seeds. *Splash!* A big duck flapped its wings. "*Wow, look at all the ducklings!*" said Ava. One little duckling ran right up to Ben’s shoe. "*It likes me!*" he laughed.',pics:['boy','girl','duck','chick']},
  boxes:[{title:'Surprising sentences',text:'A *surprising sentence* shows a strong feeling like surprise, fear, anger or joy. It ends with an *exclamation mark* (!).',ex:[['snowman','It is snowing*!*'],['surprised','What a big fish*!*']],cols:2,big:true}],
  cards:[{q:'Add the end mark: *Look out*',pics:['warning'],a:'Look out*!*'},{q:'Which feeling?',pics:['surprised'],a:'*surprise*: Wow!'}],
  words:[['exclamation mark','!'],['strong feeling','surprise, fear, anger or joy']]},
 steps:[
  {say:'Read the story',speech:'Ben and Ava went to feed the ducks. Splash! A big duck flapped its wings. Wow, look at all the ducklings! said Ava. It likes me! Ben laughed.',set:S.row(['boy','girl','duck','chick'],{labels:['Ben','Ava','duck','duckling']}),
   cues:[['ben and ava','boy|girl','Ben and Ava'],['a big duck','duck','Splash!'],['the ducklings','chick','Wow!'],['it likes me','boy','It likes me!']]},
  {say:'A strong feeling',speech:'Wow, it is snowing! This sentence shows surprise. It ends with an exclamation mark.',set:S.fillw(['It','is','snowing','_'],['!','?','.'],'!'),
   cues:[['it is snowing','#snowing','surprise!'],['exclamation mark','gap','!','done']]},
  {say:'Feelings',speech:'We can feel surprised, scared or happy. Look out! Hooray! These end with exclamation marks too.',set:S.row(['surprised','scared','happy'],{labels:['Wow!','Look out!','Hooray!']}),
   cues:[['surprised','surprised','Wow!'],['scared','scared','Look out!'],['hooray','happy','Hooray!']]}],
 rounds:[R.fillw('End the surprising sentence: *What a big cake*',['What','a','big','cake','_'],['!','?'],'!'),R.ask('Which is a surprising sentence?',null,['Wow, a rainbow!','I see a rainbow.'],'Wow, a rainbow!'),
  R.fillw('End the sentence: *Look out*',['Look','out','_'],['!','?'],'!'),R.sort('Which end mark? Sort the feelings.',['! strong','. calm'],[['surprised',0,'Wow'],['sleeping',1,'I nap'],['scared',0,'Help'],['happy',0,'Hooray']]),
  R.ask('What does ! show?',null,['a strong feeling','a question'],'a strong feeling'),R.build('Build it: *We won the game!*',['We','won','the','game!'],'trophy')],
 tries:[['Say a surprising sentence about a *birthday*.','*What a great party!*'],['Which mark? *Help*','*Help!*']]});

/* 14 ─ Capital letters (1) */
U({id:'e14',title:'Capital letters: names and I',strand:'Sentences',codes:['B3','D2'],
 guide:{goal:'Use capital letters at the start of a sentence, for names (proper nouns) and for the word I.',words:'capital letter, beginning, name, I',ask:['Why does *I* always get a capital?','Find the capitals in a book page.'],home:'Write a sentence with your name and *I* in it. Circle the capitals.'},
 watch:['Capital letters','My sister and I will meet Nora. Capitals go at the start, on names, and on I.'],
 fig:'Capital letters for the first word, names and I.',
 page:{story:{title:'Winter Fun',text:'*I* love winter! *My* friend *Kofi* and *I* build a snow fort. *We* go sledding down the big hill by *Pine Street*. *After* that, *Dad* makes hot chocolate. *My* dog *Pepper* chases the snowballs we throw. *Winter* is the best!',pics:['snowman','sled','chocolate','dog']},
  boxes:[{title:'Capital letters',text:'Always begin a sentence with a *capital letter*. Use capitals for *names* and for the word *I*.',ex:[['girl','*M*y sister and *I*…'],['boy','…will meet *N*ora.']],cols:2,big:true}],
  cards:[{q:'Fix it: *i like snow.*',pics:['snowflake'],a:'*I* like snow.'},{q:'Fix it: *we saw ali.*',pics:[],a:'*W*e saw *A*li.'}],
  words:[['capital letter','a big letter, like A, B, C'],['I','always a capital when it means me']]},
 steps:[
  {say:'Read the story',speech:'I love winter! My friend Kofi and I build a snow fort. We go sledding down the big hill. My dog Pepper chases the snowballs.',set:S.row(['snowman','boy','sled','dog'],{labels:['snow fort','Kofi','sled','Pepper']}),
   cues:[['i love winter','snowman','I'],['friend kofi','boy','Kofi'],['go sledding','sled','sled'],['dog pepper','dog','Pepper']]},
  {say:'Three rules',speech:'Use a capital letter for the first word of a sentence, for names, and for the word I. My sister and I will meet Nora.',set:S.build(['My','sister','and','I','will','meet','Nora.']),
   cues:[['first word','#My','first word'],['for names','#Nora.','name'],['the word i','#I','I'],['will meet nora','*','','play']]},
  {say:'Fix the small i',speech:'Look: i like snow. The word I needs a capital. Watch it change.',set:S.fillw(['_','like','snow.'],['I','i'],'I'),
   cues:[['needs a capital','gap','I','done']]}],
 rounds:[R.fillw('Fix the sentence: *___ like snow.*',['_','like','snow.'],['I','i'],'I'),R.ask('Which word needs a capital? *my cat is fluffy.*',null,['my','cat','fluffy'],'my',{ok:'Yes! The first word: My.'}),
  R.fillw('Fix the name: *We saw ___.*',['We','saw','_'],['Ali.','ali.'],'Ali.'),R.ask('Which is written correctly?',null,['Kim and I play.','kim and i play.'],'Kim and I play.'),
  R.build('Build it with capitals: *Sam and I run.*',['Sam','and','I','run.']),R.fillw('Fix the first word: *___ dog is big.*',['_','dog','is','big.'],['The','the'],'The')],
 tries:[['Fix it: *ben and i swim.*','*B*en and *I* swim.'],['Does *I* need a capital in the middle of a sentence?','*Yes*: always!']]});

/* 15 ─ Capital letters (2) */
U({id:'e15',title:'Capital letters: days, months and holidays',strand:'Sentences',codes:['B3','D2'],
 guide:{goal:'Use capital letters for days of the week, months of the year and holidays.',words:'days, months, holidays, capital letter',ask:['Which day comes after Monday? How do you write it?','What month is your birthday?'],home:'Look at a calendar together. Point to every capital letter.'},
 watch:['Days, months and holidays','Saturday, August and Canada Day all begin with capital letters.'],
 fig:'Days, months and holidays get capital letters.',
 page:{story:{title:'The Book Club',text:'Our class has a book club. We meet every *Friday*. In *October*, we read a spooky story about a friendly ghost. In *December*, we read about a polar bear. On *Valentine’s Day*, we made bookmarks with hearts. I love book club!',pics:['books','calendar','polar bear','heart']},
  boxes:[{title:'Capital letters',text:'*Days of the week*, *months of the year* and *holidays* all begin with *capital letters*.',ex:[['calendar','*S*aturday'],['sunflower','*A*ugust'],['canada','*C*anada *D*ay']],cols:3}],
  cards:[{q:'Fix it: *my birthday is in june.*',pics:['cake'],a:'My birthday is in *J*une.'},{q:'Fix it: *we skate on sunday.*',pics:['skates'],a:'We skate on *S*unday.'}],
  words:[['day','Monday, Tuesday… Sunday'],['month','January, February… December']]},
 steps:[
  {say:'Read the story',speech:'Our class has a book club. We meet every Friday. In December, we read about a polar bear. On Valentine’s Day, we made bookmarks with hearts.',set:S.row(['books','calendar','polar bear','heart'],{labels:['book club','Friday','December','Valentine’s Day']}),
   cues:[['book club','books','book club'],['every friday','calendar','Friday'],['in december','polar bear','December'],['valentine’s day','heart','Valentine’s Day']]},
  {say:'Capitals for time words',speech:'Days, months and holidays always start with a capital letter. Saturday. August. Canada Day.',set:S.row(['calendar','sunflower','canada'],{labels:['Saturday','August','Canada Day']}),
   cues:[['saturday','calendar','S'],['august','sunflower','A'],['canada day','canada','C, D']]},
  {say:'Fix the month',speech:'My birthday is in june. June is a month, so it needs a capital J.',set:S.fillw(['It','is','in','_'],['June.','june.'],'June.'),
   cues:[['needs a capital j','gap','J','done']]}],
 rounds:[R.fillw('Fix the day: *We swim on ___*',['We','swim','on','_'],['Monday.','monday.'],'Monday.'),R.fillw('Fix the month: *It snows in ___*',['It','snows','in','_'],['January.','january.'],'January.'),
  R.ask('Which is written correctly?',null,['Canada Day','canada day'],'Canada Day'),R.sort('Day or month?',['day','month'],[['calendar',0,'Monday'],['sunflower',1,'July'],['calendar',0,'Friday'],['snowflake',1,'January']]),
  R.ask('Which word needs a capital? *my party is on saturday.*',null,['party','saturday','is'],'saturday',{ok:'Yes! Days need capitals, and so does the first word My.'}),R.fillw('Fix the holiday: *We love ___*',['We','love','_'],['Thanksgiving.','thanksgiving.'],'Thanksgiving.')],
 tries:[['Write today’s day of the week.','It starts with a *capital*!'],['Fix it: *school starts in september.*','*S*chool starts in *S*eptember.']]});
})();
