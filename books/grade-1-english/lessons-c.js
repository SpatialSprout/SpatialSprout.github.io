/* The Interactive Classroom: Grade 1 English — Units 16–22: punctuation, subjects, pronouns, verbs, am/is/are, adjectives, location words */
(function(){
"use strict";
const P=window.PM;if(!P||!P.unit)return;const U=P.unit,R=P.R,S=P.S;

/* 16 ─ Punctuation */
U({id:'e16',title:'End marks',strand:'Sentences',codes:['B3','D2'],
 guide:{goal:'Choose the right end mark: a period for telling, a question mark for asking, an exclamation mark for strong feelings.',words:'punctuation, period, question mark, exclamation mark',ask:['Which end mark goes with *Can I play*?','How does your voice change for each mark?'],home:'Read a short book together. Point to each end mark and change your voice.'},
 watch:['Pick the end mark','Snow is falling. Is it snowing? Wow, so much snow! Three sentences, three end marks.'],
 fig:'Periods, question marks and exclamation marks.',
 page:{story:{title:'Snow Day!',text:'I woke up and looked outside. *Everything was white.* Was there school today? The radio said, "*All schools are closed!*" Hooray! I put on my snow pants, boots and mittens. My brother and I made a snowman with a carrot nose. What a fun snow day!',pics:['snowflake','radio','mitten','snowman']},
  boxes:[{title:'End marks',text:'Every sentence ends with a *punctuation mark*.',ex:[['books','telling *.*'],['question','asking *?*'],['surprised','surprising *!*']],cols:3,big:true}],
  cards:[{q:'Which mark? *Do you like snow*',pics:['snowman'],a:'*?*'},{q:'Which mark? *We made a snowman*',pics:[],a:'*.*'}],
  words:[['punctuation','marks that help us read: . ? !'],['end mark','the mark at the end of a sentence']]},
 steps:[
  {say:'Read the story',speech:'I woke up and looked outside. Everything was white. Was there school today? The radio said, All schools are closed! Hooray! We made a snowman with a carrot nose.',set:S.row(['snowflake','radio','snowman','carrot'],{labels:['snow','radio','snowman','carrot']}),
   cues:[['everything was white','snowflake','.'],['was there school today','radio','?'],['hooray','snowman','!'],['carrot nose','carrot','carrot']]},
  {say:'Three end marks',speech:'A telling sentence ends with a period. An asking sentence ends with a question mark. A surprising sentence ends with an exclamation mark.',set:S.row(['books','question','surprised'],{labels:['.','?','!']}),
   cues:[['with a period','books','.'],['with a question mark','question','?'],['with an exclamation mark','surprised','!']]},
  {say:'Choose the mark',speech:'Is it snowing. No! It asks something, so it needs a question mark.',set:S.fillw(['Is','it','snowing','_'],['?','.','!'],'?'),
   cues:[['it asks something','#Is','asks'],['needs a question mark','gap','?','done']]}],
 rounds:[R.fillw('Choose the end mark: *Can I play*',['Can','I','play','_'],['?','.','!'],'?'),R.fillw('Choose the end mark: *I have a red hat*',['I','have','a','red','hat','_'],['.','?','!'],'.'),
  R.fillw('Choose the end mark: *Wow, look at that*',['Wow,','look','at','that','_'],['!','?','.'],'!'),R.fillw('Choose the end mark: *Where is my boot*',['Where','is','my','boot','_'],['?','.','!'],'?'),
  R.sort('Sort by end mark.',['?','.'],[['question',0,'Who is it'],['books',1,'I read'],['question',0,'Can we go'],['books',1,'It is cold']]),R.fillw('Choose the end mark: *The bus is yellow*',['The','bus','is','yellow','_'],['.','?','!'],'.')],
 tries:[['Which mark? *Help, my kite is stuck*','*!*'],['Which mark? *What is your name*','*?*']]});

/* 17 ─ Subjects */
U({id:'e17',title:'The subject of a sentence',strand:'Sentences',codes:['B3','D2'],
 guide:{goal:'Find the subject of a sentence: the person or thing the sentence is about.',words:'subject, who, what, about',ask:['Who is this sentence about?','Can you change the subject and keep the rest?'],home:'Say *___ can jump.* Take turns filling in a new subject.'},
 watch:['Find the subject','The sentence is about my mom. My mom is the subject.'],
 fig:'The subject: who or what the sentence is about.',
 page:{story:{title:'Mom Goes Back to School',text:'*My mom* is a student again! She takes classes at night. *My sister* and I help her study. *Mom* reads big books about plants. *Her teacher* says she works hard. *I* am proud of my mom. Learning is for everyone!',pics:['woman','books','girl','teacher']},
  boxes:[{title:'Subjects',text:'The *subject* of a sentence tells *whom* or *what* the sentence is about.',ex:[['dog','*The dog* runs fast.'],['girl','*Anna* reads a book.']],cols:2,big:true}],
  cards:[{q:'Find the subject: *The bird sings.*',pics:['bird'],a:'*The bird*'},{q:'Find the subject: *Grandpa bakes bread.*',pics:['grandpa','bread'],a:'*Grandpa*'}],
  words:[['subject','who or what a sentence is about'],['about','what something tells of']]},
 steps:[
  {say:'Read the story',speech:'My mom is a student again! She takes classes at night. Mom reads big books about plants. Her teacher says she works hard.',set:S.row(['woman','books','plant','teacher'],{labels:['Mom','books','plants','teacher']}),
   cues:[['my mom is','woman','subject'],['big books','books','books'],['about plants','plant','plants'],['her teacher','teacher','subject']]},
  {say:'Who is it about?',speech:'The dog runs fast. Who is this sentence about? The dog. The dog is the subject.',set:S.build(['The','dog','runs','fast.'],'dog'),
   cues:[['the dog runs fast','*','','play'],['the dog is the subject','#The|#dog','subject']]},
  {say:'Change the subject',speech:'Anna reads a book. Change the subject: Grandpa reads a book. The rest stays the same.',set:S.fillw(['_','reads','a','book.'],['Grandpa','Blue','Jumps'],'Grandpa'),
   cues:[['anna reads a book','#reads','reads a book'],['grandpa reads','gap','new subject','done']]}],
 rounds:[R.ask('What is the subject? *The cat sleeps.*',['cat'],['The cat','sleeps'],'The cat'),R.ask('What is the subject? *Grandma bakes bread.*',['grandma'],['Grandma','bakes bread'],'Grandma'),
  R.fillw('Choose a subject: *___ can fly.*',['_','can','fly.'],['The bird','Under','Happy'],'The bird'),R.pick('The sentence is *The frog jumps.* Tap the subject.',['frog','dog','cat'],'frog'),
  R.ask('What is the subject? *My brother plays hockey.*',null,['My brother','plays','hockey'],'My brother'),R.fillw('Choose a subject: *___ is in the sky.*',['_','is','in','the','sky.'],['The sun','Run','Big'],'The sun')],
 tries:[['Find the subject: *The bus is late.*','*The bus*'],['Make a sentence with *my dog* as the subject.','*My dog barks.*']]});

/* 18 ─ Pronouns */
U({id:'e18',title:'Pronouns',strand:'Words',codes:['B3','D2'],
 guide:{goal:'Use pronouns (I, you, he, she, it, we, they) in place of nouns.',words:'pronoun, I, you, he, she, it, we, they',ask:['Which pronoun can take the place of *Tom*?','Which pronoun means *my friends and I*?'],home:'Retell a story using he, she, it and they.'},
 watch:['Swap in a pronoun','The turnip is huge. It is huge! It takes the place of the turnip.'],
 fig:'Pronouns take the place of nouns.',
 page:{story:{title:'The Giant Turnip',text:'Grandpa planted a turnip. *It* grew and grew! *He* pulled, but it would not come out. Grandma helped. *She* pulled too. Then the girl, the dog and the cat helped. *They* pulled together. Pop! Out came the giant turnip. *We* can do more together!',pics:['grandpa','grandma','dog','cat']},
  boxes:[{title:'Pronouns',text:'A *pronoun* takes the place of a noun. *I, you, he, she, it, we* and *they* are pronouns.',ex:[['grandpa','Grandpa → *he*'],['grandma','Grandma → *she*'],['turnip','turnip → *it*'],['family','family → *they*']].map(e=>e[0]==='turnip'?['onion',e[1]]:e)}],
  cards:[{q:'*The pumpkins are ripe. ___ are orange.*',pics:['pumpkin','pumpkin'],a:'*They* are orange.'},{q:'*Lily has a kite. ___ flies it.*',pics:['girl','kite'],a:'*She* flies it.'}],
  words:[['pronoun','a word that takes the place of a noun'],['they','more than one person or thing']]},
 steps:[
  {say:'Read the story',speech:'Grandpa planted a turnip. It grew and grew! He pulled, but it would not come out. Grandma helped. She pulled too. Then they all pulled together. Pop!',set:S.row(['grandpa','onion','grandma','family'],{labels:['he','it','she','they']}),
   cues:[['grandpa planted','grandpa','he'],['it grew','onion','it'],['grandma helped','grandma','she'],['then they all','family','they']]},
  {say:'Pronouns replace nouns',speech:'Grandpa can become he. Grandma can become she. The turnip can become it. The family can become they.',set:S.row(['grandpa','grandma','onion','family'],{labels:['he','she','it','they']}),
   cues:[['become he','grandpa','he'],['become she','grandma','she'],['become it','onion','it'],['become they','family','they']]},
  {say:'Swap the noun',speech:'The pumpkins are ripe. They are orange. They takes the place of the pumpkins.',set:S.fillw(['_','are','orange.'],['They','She','It'],'They'),
   cues:[['the pumpkins are ripe','','pumpkins'],['they are orange','gap','They','done']]}],
 rounds:[R.fillw('*Grandpa is tall. ___ is tall.*',['_','is','tall.'],['He','She','It'],'He'),R.fillw('*Mia has a cat. ___ loves it.*',['_','loves','it.'],['She','He','They'],'She'),
  R.fillw('*The ball is red. ___ is red.*',['_','is','red.'],['It','He','We'],'It'),R.fillw('*Tom and Kim play. ___ play.*',['_','play.'],['They','She','It'],'They'),
  R.ask('Which pronoun means *my friends and me*?',null,['we','she','it'],'we'),R.ask('Which word is a pronoun?',null,['she','dog','run'],'she')],
 tries:[['*The cookies are hot. ___ are hot.*','*They*'],['Which pronoun for *Dad*?','*he*']]});

/* 19 ─ Verbs */
U({id:'e19',title:'Verbs: action words',strand:'Words',codes:['B3','D2'],
 guide:{goal:'Find verbs, the action words that tell what someone or something does.',words:'verb, action, do',ask:['What can you do with your feet? Those are verbs!','Find the verb: *Birds fly.*'],home:'Play charades with action words: jump, swim, clap, read.'},
 watch:['Action words','Jump, swim, read, sing. Verbs tell what we do!'],
 fig:'Action words come alive on the page.',
 page:{story:{title:'Mr. Music’s Band',text:'Mr. Music *plays* every instrument! He *bangs* the drum with his feet. He *strums* the guitar with his hands. He *blows* the trumpet. Then he *sings* a happy song. The children *clap* and *dance*. Everyone *cheers* for Mr. Music!',pics:['drum','guitar','trumpet','dancer']},
  boxes:[{title:'Verbs',text:'Most *verbs* are *action words*. They tell what someone or something *does*.',ex:[['runner','run'],['swimmer','swim'],['singer','sing'],['dancer','dance']]}],
  cards:[{q:'Find the verb: *We walk to school.*',pics:['walker','school'],a:'*walk*'},{q:'Find the verb: *The bird flies.*',pics:['bird'],a:'*flies*'}],
  words:[['verb','an action word'],['action','something you do']]},
 steps:[
  {say:'Read the story',speech:'Mr. Music plays every instrument! He bangs the drum. He strums the guitar. He blows the trumpet. The children clap and dance.',set:S.row(['drum','guitar','trumpet','dancer']),
   cues:[['bangs the drum','drum','bangs'],['strums the guitar','guitar','strums'],['blows the trumpet','trumpet','blows'],['clap and dance','dancer','dance']]},
  {say:'Verbs are actions',speech:'A verb tells what someone does. Run. Swim. Sing. Dance. These are all action words.',set:S.row(['runner','swimmer','singer','dancer'],{labels:['run','swim','sing','dance']}),
   cues:[['run.','runner','run'],['swim.','swimmer','swim'],['sing.','singer','sing'],['dance.','dancer','dance']]},
  {say:'Find the verb',speech:'We walk to school. Walk is the action. Walk is the verb.',set:S.build(['We','walk','to','school.'],'school'),
   cues:[['we walk to school','*','','play'],['walk is the verb','#walk','verb']]}],
 rounds:[R.pick('Tap the picture that shows *swim*.',['swimmer','runner','singer','sleeping'],'swimmer'),R.ask('Which word is a verb?',null,['jump','blue','cat'],'jump'),
  R.ask('Find the verb: *The dog barks.*',['dog'],['dog','barks','The'],'barks'),R.sort('Verb or not a verb?',['action','not an action'],[['runner',0,'run'],['apple',1,'apple'],['dancer',0,'dance'],['chair',1,'chair'],['swimmer',0,'swim'],['star',1,'star']]),
  R.fillw('Choose the verb: *Birds ___ in the sky.*',['Birds','_','in','the','sky.'],['fly','blue','nest'],'fly'),R.pick('Tap the picture that shows *sing*.',['singer','walker','cyclist','skier'],'singer')],
 tries:[['Name three things you can do.','*jump, read, eat*…'],['Find the verb: *Kim kicks the ball.*','*kicks*']]});

/* 20 ─ Am, is, are */
U({id:'e20',title:'Am, is and are',strand:'Words',codes:['B3','D2'],
 guide:{goal:'Use *am* with I, *is* with one person or thing, and *are* with more than one.',words:'am, is, are, one, more than one',ask:['Which word goes with *I*?','Is it *the dogs is* or *the dogs are*?'],home:'Make sentences together: I am…, Dad is…, We are…'},
 watch:['Am, is, are','I am happy. The dog is big. The dogs are big. Watch each word find its sentence.'],
 fig:'Am, is and are join each subject.',
 page:{story:{title:'My New Puppy',text:'My new puppy *is* small and fuzzy. His name *is* Toby. His ears *are* floppy and soft. I *am* so happy! Toby and I *are* best friends. We play fetch in the yard every day. At night, Toby sleeps in a basket by my bed.',pics:['puppy','boy','ball','basket']},
  boxes:[{title:'Am, is and are',text:'Use *am* with *I*. Use *is* for *one* person, animal or thing. Use *are* for *more than one* (and with *you* and *we*).',ex:[['happy','I *am* happy.'],['dog','The dog *is* big.'],['dog','The dogs *are* big.']],cols:3}],
  cards:[{q:'*The apples ___ red.*',pics:['apple','apple'],a:'*are*'},{q:'*I ___ six.*',pics:['child'],a:'*am*'}],
  words:[['is','for one'],['are','for more than one']]},
 steps:[
  {say:'Read the story',speech:'My new puppy is small and fuzzy. His ears are floppy and soft. I am so happy! Toby and I are best friends.',set:S.row(['puppy','boy','ball','basket'],{labels:['puppy','me','ball','basket']}),
   cues:[['puppy is small','puppy','is'],['ears are floppy','puppy','are'],['i am so happy','boy','am'],['best friends','boy|puppy','are']]},
  {say:'Which word?',speech:'Use am with I. Use is for one. Use are for more than one. I am happy. The dog is big. The dogs are big.',set:S.row(['happy','dog','dog'],{labels:['I am','is','are']}),
   cues:[['i am happy','happy','am'],['the dog is big','dog','is'],['dogs are big','dog','are']]},
  {say:'Fill it in',speech:'The apples are red. There is more than one apple, so we use are.',set:S.fillw(['The','apples','_','red.'],['are','is','am'],'are'),
   cues:[['more than one apple','#apples','many'],['we use are','gap','are','done']]}],
 rounds:[R.fillw('*I ___ six years old.*',['I','_','six.'],['am','is','are'],'am'),R.fillw('*The cat ___ black.*',['The','cat','_','black.'],['is','are','am'],'is'),
  R.fillw('*The birds ___ singing.*',['The','birds','_','singing.'],['are','is','am'],'are'),R.fillw('*We ___ at the park.*',['We','_','at','the','park.'],['are','is','am'],'are'),
  R.fillw('*My mom ___ a nurse.*',['My','mom','_','a','nurse.'],['is','are','am'],'is'),R.ask('Which is correct?',null,['The dogs are big.','The dogs is big.'],'The dogs are big.')],
 tries:[['*You ___ my friend.*','*are*'],['*The sun ___ hot.*','*is*']]});

/* 21 ─ Adjectives */
U({id:'e21',title:'Describing words',strand:'Words',codes:['B3','D2'],
 guide:{goal:'Use adjectives to describe nouns: how they look, feel, sound, taste or smell.',words:'adjective, describe, colour, size, shape, feel',ask:['How would you describe snow?','Which adjective tells size?'],home:'Describe a fruit with three adjectives. Can someone guess it?'},
 watch:['Describing words','The twinkling stars are amazing. Twinkling and amazing describe the stars.'],
 fig:'Adjectives describe nouns.',
 page:{story:{title:'A Starry Night',text:'Last night, we camped by the *quiet* lake. The sky was *dark* and *clear*. *Tiny* stars twinkled everywhere. The moon was *round* and *bright*. We sat by a *warm* fire and ate *sticky* marshmallows. It was a *perfect* night!',pics:['tent','star','full moon','fire']},
  boxes:[{title:'Adjectives',text:'An *adjective* describes a noun. It often tells how someone or something *looks*, *feels*, *sounds* or *tastes*.',ex:[['elephant','*big* elephant'],['mouse','*small* mouse'],['ice','*cold* ice'],['fire','*hot* fire']]}],
  cards:[{q:'Find the adjective: *a red apple*',pics:['apple'],a:'*red*'},{q:'Describe it:',pics:['snowflake'],a:'*cold, white, soft*'}],
  words:[['adjective','a describing word'],['describe','tell what something is like']]},
 steps:[
  {say:'Read the story',speech:'Last night, we camped by the quiet lake. Tiny stars twinkled everywhere. The moon was round and bright. We sat by a warm fire.',set:S.row(['tent','star','full moon','fire'],{labels:['quiet lake','tiny stars','round moon','warm fire']}),
   cues:[['quiet lake','tent','quiet'],['tiny stars','star','tiny'],['round and bright','full moon','round'],['warm fire','fire','warm']]},
  {say:'Describing words',speech:'Adjectives describe. A big elephant. A small mouse. Cold ice. A hot fire.',set:S.row(['elephant','mouse','ice','fire'],{labels:['big','small','cold','hot']}),
   cues:[['big elephant','elephant','big'],['small mouse','mouse','small'],['cold ice','ice','cold'],['hot fire','fire','hot']]},
  {say:'Add an adjective',speech:'The lemon is sour. Sour tells how the lemon tastes.',set:S.fillw(['The','lemon','is','_'],['sour.','run.','under.'],'sour.'),
   cues:[['the lemon is sour','gap','sour','done'],['how the lemon tastes','#lemon','tastes']]}],
 rounds:[R.pick('Tap the *big* animal.',['elephant','mouse','ladybug','bee'],'elephant'),R.ask('Find the adjective: *a soft kitten*',['kitten'],['soft','kitten','a'],'soft'),
  R.fillw('Choose the adjective: *The ice is ___*',['The','ice','is','_'],['cold.','jump.','dog.'],'cold.'),R.pick('Tap something *hot*.',['fire','ice','snowman','snowflake'],'fire'),
  R.sort('Hot or cold?',['hot','cold'],[['fire',0],['ice',1],['sun',0],['snowman',1],['soup',0],['ice cream',1]]),R.ask('Which word is an adjective?',null,['happy','run','table'],'happy')],
 tries:[['Describe a lemon.','*yellow, sour, oval*'],['Find the adjective: *the tall giraffe*','*tall*']]});

/* 22 ─ Location words */
U({id:'e22',title:'Location words',strand:'Words',codes:['B3','D2'],
 guide:{goal:'Use location words like in, on, under, over, beside and behind to tell where something is.',words:'in, on, under, over, beside, behind, location',ask:['Where is your chair? Use a location word.','What is the opposite of *over*?'],home:'Hide a toy and give location clues: *It is under something soft.*'},
 watch:['Where is it?','The cat is in the box. Now it is on the box. Location words tell where.'],
 fig:'Location words tell where things are.',
 page:{story:{title:'Hide and Seek',text:'Let’s play hide and seek! Ali hid *behind* the big tree. Sara crawled *under* the bed. My little brother hid *in* the laundry basket. The cat jumped *on* the shelf. A bird flew *over* our heads. Ready or not, here I come!',pics:['tree','bed','basket','cat']},
  boxes:[{title:'Location words',text:'A *location word* tells *where* someone or something is: *in, on, under, over, beside, behind*.',ex:[['box','*in* the box'],['chair','*on* the chair'],['bed','*under* the bed'],['tree','*behind* the tree']]}],
  cards:[{q:'Where is the ball?',pics:['box','ball'],a:'*beside* the box'},{q:'Opposite of *over*?',pics:[],a:'*under*'}],
  words:[['location','where something is'],['beside','next to']]},
 steps:[
  {say:'Read the story',speech:'Ali hid behind the big tree. Sara crawled under the bed. My little brother hid in the laundry basket. The cat jumped on the shelf.',set:S.row(['tree','bed','basket','cat'],{labels:['behind','under','in','on']}),
   cues:[['behind the big tree','tree','behind'],['under the bed','bed','under'],['in the laundry basket','basket','in'],['on the shelf','cat','on']]},
  {say:'Where is it?',speech:'Location words tell where. In the box. On the chair. Under the bed. Behind the tree.',set:S.row(['box','chair','bed','tree'],{labels:['in','on','under','behind']}),
   cues:[['in the box','box','in'],['on the chair','chair','on'],['under the bed','bed','under'],['behind the tree','tree','behind']]},
  {say:'Choose the word',speech:'The bird flies over the house. Over tells where the bird is.',set:S.fillw(['The','bird','is','_','the','house.'],['over','blue','sing'],'over'),
   cues:[['flies over the house','gap','over','done']]}],
 rounds:[R.fillw('*The cat is ___ the box.*',['The','cat','is','_','the','box.'],['in','run','big'],'in'),R.fillw('*The book is ___ the table.*',['The','book','is','_','the','table.'],['on','sad','eat'],'on'),
  R.ask('Which is a location word?',null,['under','apple','jump'],'under'),R.fillw('*The dog hides ___ the tree.*',['The','dog','hides','_','the','tree.'],['behind','red','sleep'],'behind'),
  R.ask('What is the opposite of *in*?',null,['out','on','over'],'out'),R.fillw('*The plane flies ___ the clouds.*',['The','plane','flies','_','the','clouds.'],['over','sing','soft'],'over')],
 tries:[['Where is your nose?','*on* my face!'],['Opposite of *under*?','*over*']]});
})();
