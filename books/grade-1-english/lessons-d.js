/* The Interactive Classroom: Grade 1 English — Units 23–28: articles, and/or, but, word order, related sentences, sequencing */
(function(){
"use strict";
const P=window.PM;if(!P||!P.unit)return;const U=P.unit,R=P.R,S=P.S;

/* 23 ─ Articles */
U({id:'e23',title:'A, an and the',strand:'Words',codes:['B3','D2'],
 guide:{goal:'Use *a* before a consonant sound, *an* before a vowel sound, and *the* for a particular person or thing.',words:'article, a, an, the, vowel, consonant',ask:['Is it *a apple* or *an apple*?','When do we use *the*?'],home:'Point at things and say a or an: an egg, a cup, an orange…'},
 watch:['A or an?','A dog. An egg. The vowel sound at the start tells us to use an.'],
 fig:'Choose a, an or the.',
 page:{story:{title:'My Wobbly Tooth',text:'I have *a* wobbly tooth! I ate *an* apple, and the tooth wiggled even more. At dinner, it fell out on *a* napkin. I put *the* tooth under my pillow. In the morning, there was *a* shiny coin and *a* tiny note. I smiled *a* big gap-tooth smile!',pics:['tooth','apple','coin','letter']},
  boxes:[{title:'A, an and the',text:'*A* goes before a word that begins with a *consonant* sound. *An* goes before a *vowel* sound. *The* names a *particular* one.',ex:[['dog','*a* dog'],['egg','*an* egg'],['orange','*an* orange'],['sun','*the* sun']]}],
  cards:[{q:'___ owl',pics:['owl'],a:'*an* owl'},{q:'___ kite',pics:['kite'],a:'*a* kite'}],
  words:[['article','the little words a, an and the'],['vowel','a, e, i, o, u']]},
 steps:[
  {say:'Read the story',speech:'I have a wobbly tooth! I ate an apple, and the tooth wiggled. I put the tooth under my pillow. In the morning, there was a shiny coin.',set:S.row(['tooth','apple','bed','coin'],{labels:['a tooth','an apple','the pillow','a coin']}),
   cues:[['a wobbly tooth','tooth','a'],['an apple','apple','an'],['the tooth under my pillow','bed','the'],['a shiny coin','coin','a']]},
  {say:'A or an?',speech:'Use a before a consonant sound: a dog. Use an before a vowel sound: an egg, an orange.',set:S.row(['dog','egg','orange'],{labels:['a dog','an egg','an orange']}),
   cues:[['a dog','dog','a'],['an egg','egg','an'],['an orange','orange','an']]},
  {say:'Choose the article',speech:'Owl starts with a vowel sound, o. So we say an owl.',set:Object.assign(S.fillw(['_','owl'],['an','a'],'an'),{pic:'owl'}),
   cues:[['owl starts with','owl','o'],['an owl','gap','an','done']]}],
 rounds:[R.fillw('Choose: *___ egg*',['_','egg'],['an','a'],'an',{pic:'egg'}),R.fillw('Choose: *___ cat*',['_','cat'],['a','an'],'a',{pic:'cat'}),R.fillw('Choose: *___ apple*',['_','apple'],['an','a'],'an',{pic:'apple'}),
  R.fillw('Choose: *___ ball*',['_','ball'],['a','an'],'a',{pic:'ball'}),R.sort('A or an?',['a','an'],[['dog',0],['owl',1],['kite',0],['egg',1],['bus',0],['orange',1]]),R.fillw('Choose: *Look at ___ moon!*',['Look','at','_','moon!'],['the','an'],'the')],
 tries:[['___ elephant','*an* elephant'],['___ banana','*a* banana']]});

/* 24 ─ And / or */
U({id:'e24',title:'Joining words: and, or',strand:'Writing',codes:['B3','D2'],
 guide:{goal:'Use *and* to add things together and *or* to show a choice.',words:'and, or, join, choice',ask:['Do you want milk *or* juice?','Name two things you like, using *and*.'],home:'At snack time, offer choices with *or* and lists with *and*.'},
 watch:['And or or?','I have a ball and a kite. Do you want an apple or a pear? And adds; or gives a choice.'],
 fig:'And joins; or offers a choice.',
 page:{story:{title:'A Day with Grandpa',text:'On Saturday I visited Grandpa. We fed the birds *and* the squirrels. Grandpa asked, "Do you want to bake cookies *or* go fishing?" I picked fishing! We caught two fish *and* one old boot. Then we had sandwiches *and* lemonade.',pics:['grandpa','bird','fish','sandwich']},
  boxes:[{title:'And and or',text:'*And* joins things to show *adding*. *Or* joins things to show a *choice*.',ex:[['ball','a ball *and* a kite'],['apple','an apple *or* a pear']],cols:2,big:true}],
  cards:[{q:'*I like cats ___ dogs.*',pics:['cat','dog'],a:'*and*'},{q:'*Is it hot ___ cold?*',pics:['fire','ice'],a:'*or*'}],
  words:[['and','adds things together'],['or','shows a choice']]},
 steps:[
  {say:'Read the story',speech:'We fed the birds and the squirrels. Grandpa asked, do you want to bake cookies or go fishing? We had sandwiches and lemonade.',set:S.row(['bird','squirrel','cookie','fish'],{labels:['birds','squirrels','cookies','fishing']}),
   cues:[['birds and the squirrels','bird|squirrel','and'],['cookies or go fishing','cookie|fish','or']]},
  {say:'And adds',speech:'I have a ball and a kite. And means both things together.',set:S.fillw(['a','ball','_','a','kite'],['and','or'],'and'),
   cues:[['a ball and a kite','gap','and','done'],['both things','#ball|#kite','both']]},
  {say:'Or is a choice',speech:'Do you want an apple or a pear? Or means you choose one.',set:S.row(['apple','pear'],{labels:['apple','pear']}),
   cues:[['an apple or a pear','apple|pear','or'],['choose one','pear','pick one!']]}],
 rounds:[R.fillw('*I have a cat ___ a dog.*',['I','have','a','cat','_','a','dog.'],['and','or'],'and'),R.fillw('*Do you want milk ___ juice?*',['Do','you','want','milk','_','juice?'],['or','and'],'or'),
  R.fillw('*We need bread ___ milk.*',['We','need','bread','_','milk.'],['and','or'],'and'),R.fillw('*Is it day ___ night?*',['Is','it','day','_','night?'],['or','and'],'or'),
  R.ask('Which word shows a *choice*?',null,['or','and'],'or'),R.fillw('*She has two coins ___ a dime.*',['She','has','two','coins','_','a','dime.'],['and','or'],'and')],
 tries:[['*Do you like red ___ blue more?*','*or*'],['*Salt ___ pepper are on the table.*','*and*']]});

/* 25 ─ But */
U({id:'e25',title:'Joining words: but',strand:'Writing',codes:['B3','D2'],
 guide:{goal:'Use *but* to join two ideas that are different or surprising.',words:'but, different, contrast',ask:['Finish it: *I like snow, but…*','Why do we use *but*?'],home:'Make *but* sentences: *Penguins are birds, but they cannot fly.*'},
 watch:['But shows a difference','Chickens have wings, but they cannot fly far. But joins two different ideas.'],
 fig:'But joins two different ideas.',
 page:{story:{title:'Riddle Time',text:'I have a face *but* no eyes. I have hands *but* no fingers. I tell you when to wake up. What am I? A *clock*! Here is another one. I have keys *but* no locks. I make music. What am I? A *piano*!',pics:['clock','piano','question','music']},
  boxes:[{title:'But',text:'*But* joins two ideas that are *different*.',ex:[['chicken','Chickens have wings, *but* they cannot fly far.'],['penguin','Penguins are birds, *but* they swim.']],cols:2,big:true}],
  cards:[{q:'*It is sunny, ___ it is cold.*',pics:['sun','snowflake'],a:'*but*'},{q:'Finish: *I am tired, but…*',pics:['yawning'],a:'*…I want to play!*'}],
  words:[['but','joins two different ideas'],['different','not the same']]},
 steps:[
  {say:'Read the riddles',speech:'I have a face but no eyes. I have hands but no fingers. What am I? A clock! I have keys but no locks. What am I? A piano!',set:S.row(['clock','piano'],{labels:['clock','piano']}),
   cues:[['a face but no eyes','clock','but'],['a clock','clock','clock!'],['keys but no locks','piano','but'],['a piano','piano','piano!']]},
  {say:'Two different ideas',speech:'Chickens have wings, but they cannot fly far. Penguins are birds, but they swim. But joins ideas that are different.',set:S.row(['chicken','penguin'],{labels:['wings, but…','birds, but…']}),
   cues:[['chickens have wings','chicken','but'],['penguins are birds','penguin','but']]},
  {say:'Choose but',speech:'It is sunny, but it is cold. The two ideas are different, so we use but.',set:S.fillw(['It','is','sunny,','_','it','is','cold.'],['but','and','or'],'but'),
   cues:[['sunny, but it is cold','gap','but','done']]}],
 rounds:[R.fillw('*I like milk, ___ I do not like cheese.*',['I','like','milk,','_','not','cheese.'],['but','and'],'but'),R.fillw('*The bag is big, ___ it is light.*',['The','bag','is','big,','_','light.'],['but','or'],'but'),
  R.ask('Which sentence makes sense?',null,['Fish swim, but they cannot walk.','Fish swim, but they swim.'],'Fish swim, but they cannot walk.'),R.fillw('*Penguins are birds, ___ they cannot fly.*',['Penguins','are','birds,','_','cannot','fly.'],['but','and'],'but'),
  R.ask('What does *but* join?',null,['two different ideas','two of the same'],'two different ideas'),R.fillw('*It is raining, ___ we have umbrellas.*',['It','is','raining,','_','we','have','umbrellas.'],['but','or'],'but')],
 tries:[['Finish: *The soup is hot, but…*','*…I can blow on it.*'],['Riddle: I have a mouth but cannot eat. What am I?','a *river*!']]});

/* 26 ─ Word order */
U({id:'e26',title:'Word order',strand:'Writing',codes:['B3','D2'],
 guide:{goal:'Put words in an order that makes sense, and see that changing the order can change the meaning.',words:'word order, makes sense, meaning',ask:['Does *dog the runs* make sense?','How does *The girl walks the dog* change if we swap girl and dog?'],home:'Write a short sentence, cut the words apart, and mix them up. Can you rebuild it?'},
 watch:['Put the words in order','The girl is walking the dog. Watch the words line up in an order that makes sense.'],
 fig:'Word blocks lined up in an order that makes sense.',
 page:{story:{title:'The King of the Jungle',text:'The lion roared, "I am the king of the jungle!" The monkey laughed. "*A king must be kind*," said the monkey. So the lion helped the elephant lift a log. He shared his water with the zebra. Now all the animals cheer for the kind king.',pics:['lion','monkey','elephant','zebra']},
  boxes:[{title:'Word order',text:'Words in a sentence must be in an *order* that *makes sense*. Changing the order can change the meaning.',ex:[['girl','The girl is walking the dog. ✓'],['dog','The dog is walking the girl. ✗']],cols:2,big:true}],
  cards:[{q:'Fix it: *fast runs dog The.*',pics:['dog'],a:'The dog runs fast.'},{q:'Fix it: *likes Kim apples.*',pics:['apple'],a:'Kim likes apples.'}],
  words:[['order','which word comes first, next and last'],['makes sense','means something we understand']]},
 steps:[
  {say:'Read the story',speech:'The lion roared, I am the king of the jungle! A king must be kind, said the monkey. So the lion helped the elephant and shared his water with the zebra.',set:S.row(['lion','monkey','elephant','zebra']),
   cues:[['the lion roared','lion','king'],['said the monkey','monkey','monkey'],['helped the elephant','elephant','help'],['with the zebra','zebra','share']]},
  {say:'Order makes sense',speech:'The girl is walking the dog. These words are in an order that makes sense.',set:S.build(['The','girl','is','walking','the','dog.'],'dog'),
   cues:[['the girl is walking the dog','*','','play']]},
  {say:'Order changes meaning',speech:'If we swap the words, we get: The dog is walking the girl! That is silly. The order changes the meaning.',set:S.build(['The','dog','is','walking','the','girl.'],'girl'),
   cues:[['the dog is walking the girl','*','silly!','play'],['changes the meaning','#dog','swapped']]}],
 rounds:[R.build('Put the words in order: *The cat is sleeping.*',['The','cat','is','sleeping.'],'cat'),R.build('Put the words in order: *I like to read.*',['I','like','to','read.'],'books'),
  R.build('Put the words in order: *The sun is hot.*',['The','sun','is','hot.'],'sun'),R.ask('Which one makes sense?',null,['The boy kicks the ball.','The ball kicks the boy.'],'The boy kicks the ball.'),
  R.build('Put the words in order: *We play in the snow.*',['We','play','in','the','snow.'],'snowman'),R.build('Put the words in order: *Fish swim in the lake.*',['Fish','swim','in','the','lake.'],'fish')],
 tries:[['Fix it: *red is The apple.*','*The apple is red.*'],['Which is silly? *The mouse chased the cat.*','It is silly! Usually *the cat chased the mouse.*']]});

/* 27 ─ Related sentences */
U({id:'e27',title:'Sentences that belong together',strand:'Writing',codes:['D1','D2'],
 guide:{goal:'Keep sentences about the same topic together, and find a sentence that does not belong.',words:'topic, related, belong, same idea',ask:['What is this story about?','Which sentence does not belong?'],home:'Tell three sentences about your pet or your favourite toy. Keep to one topic!'},
 watch:['Which one does not belong?','All the sentences are about the dentist, except one. Watch it get crossed out.'],
 fig:'Sentences on the same topic stay together.',
 page:{story:{title:'My First Visit to the Dentist',text:'Today I went to the *dentist*. I sat in a big chair that went up and down. The dentist counted my teeth with a tiny mirror. She cleaned them until they sparkled. Then she showed me how to brush in little circles. I got a new *toothbrush*!',pics:['tooth','chair','toothbrush','happy']},
  boxes:[{title:'Related sentences',text:'Sentences that are *related* are about the *same topic*. A sentence about something else does not belong.',ex:[['tooth','The dentist checked my teeth.'],['toothbrush','She showed me how to brush.'],['dinosaur','Dinosaurs are big. ✗']],cols:3}],
  cards:[{q:'Topic: *winter*. Which does not belong?',pics:['snowman','sled','sunglasses'],x:[2],a:'*It is hot at the beach.*'},{q:'Topic: *pets*.',pics:['cat','dog','fish'],a:'All belong!'}],
  words:[['topic','what the sentences are about'],['related','connected; about the same thing']]},
 steps:[
  {say:'Read the story',speech:'Today I went to the dentist. I sat in a big chair. The dentist cleaned my teeth until they sparkled. Then she showed me how to brush in little circles.',set:S.row(['tooth','chair','toothbrush','happy'],{labels:['dentist','chair','brush','smile']}),
   cues:[['to the dentist','tooth','topic'],['big chair','chair','chair'],['how to brush','toothbrush','brush']]},
  {say:'Same topic',speech:'All of these sentences are about the dentist. They are related. They stay together.',set:S.row(['tooth','toothbrush','chair'],{labels:['checks teeth','brushing','big chair']}),
   cues:[['about the dentist','tooth|toothbrush|chair','dentist']]},
  {say:'Does not belong',speech:'The dentist checked my teeth. Dinosaurs are big. Dinosaurs are not about the dentist, so that sentence does not belong.',set:S.row(['tooth','dinosaur','toothbrush'],{labels:['teeth','dinosaurs','brush'],cross:1}),
   cues:[['dinosaurs are big','dinosaur','?'],['does not belong','dinosaur','✗','x']]}],
 rounds:[R.pick('Topic: *winter*. Tap the one that does *not* belong.',['snowman','sled','mitten','sunglasses'],'sunglasses'),R.pick('Topic: *the farm*. Tap the one that does *not* belong.',['cow','pig','tractor','rocket'],'rocket'),
  R.pick('Topic: *the beach*. Tap the one that does *not* belong.',['beach','shell','swimsuit','snowman'],'snowman'),R.ask('Topic: *my cat*. Which sentence does *not* belong?',['cat'],['My cat is grey.','My cat likes milk.','Buses are yellow.'],'Buses are yellow.'),
  R.ask('Topic: *the dentist*. Which sentence belongs?',['tooth'],['She cleaned my teeth.','Fish live in water.'],'She cleaned my teeth.'),R.pick('Topic: *breakfast*. Tap the one that does *not* belong.',['pancakes','milk','egg','car'],'car')],
 tries:[['Topic: *rain*. Name a sentence that belongs.','*I wear my rain boots.*'],['Does *I like pizza* belong in a story about *the zoo*?','*No*.']]});

/* 28 ─ Sequencing */
U({id:'e28',title:'Putting sentences in order',strand:'Writing',codes:['D1','D2'],
 guide:{goal:'Put sentences in a logical order (first, next, then, last) so a reader can follow the idea.',words:'first, next, then, last, order, sequence',ask:['What happens first when you make a sandwich?','What clue words tell the order?'],home:'Tell how you get ready for bed in order: first, next, then, last.'},
 watch:['Put the steps in order','First the seed, next the sprout, last the flower. Watch the pictures line up in order.'],
 fig:'Story steps in order: first, next, then, last.',
 page:{story:{title:'Making a Sandwich',text:'*First*, I get two slices of bread. *Next*, I spread butter on them. *Then*, I add cheese and lettuce. *Last*, I put the slices together and cut it in half. Now I can eat my lunch! If I mixed up the order, it would be a very messy sandwich.',pics:['bread','butter','cheese','sandwich']},
  boxes:[{title:'Sequencing',text:'Put sentences in an *order* that makes sense, so people can follow the idea. Clue words: *first, next, then, last*.',ex:[['seedling','1. first'],['herb','2. next'],['sunflower','3. last']],cols:3}],
  cards:[{q:'Order: get dressed?',pics:['socks','shoe'],a:'*First socks, then shoes!*'},{q:'Clue words:',pics:[],a:'*first, next, then, last*'}],
  words:[['sequence','the order things happen in'],['first','what happens at the start']]},
 steps:[
  {say:'Read the steps',speech:'First, I get two slices of bread. Next, I spread butter on them. Then, I add cheese. Last, I put the slices together.',set:S.order(['bread','butter','cheese','sandwich']),
   cues:[['first, i get','bread','first'],['next, i spread','butter','next'],['then, i add','cheese','then'],['last, i put','sandwich','last']]},
  {say:'First, next, last',speech:'A seed is planted first. Next, a sprout grows. Last, a flower blooms. The order makes sense.',set:Object.assign(S.order(['seedling','herb','sunflower']),{labels:['seed','sprout','flower']}),
   cues:[['planted first','seedling','1'],['a sprout grows','herb','2'],['a flower blooms','sunflower','3'],['order makes sense','*','','play']]},
  {say:'Order the sentences',speech:'Build the steps in order. First wake up, then get dressed, then eat breakfast.',set:S.build(['wake up,','get dressed,','eat breakfast.']),
   cues:[['first wake up','*','','play']]}],
 rounds:[R.order('Tap the pictures in order: *first, next, last*.',['egg','hatching','chick']),R.order('Tap the steps in order to make a sandwich.',['bread','butter','cheese','sandwich']),
  R.order('Tap in order: how a plant grows.',['seedling','herb','sunflower']),R.build('Put the morning in order.',['wake up,','brush teeth,','go to school.']),
  R.order('Tap in order: building a snowman.',['snowflake','snowman','scarf'].map(x=>x),{q:'Tap in order: *snow falls, we build a snowman, we add a scarf*.'}),R.ask('Which clue word comes *last*?',null,['last','first','next'],'last')],
 tries:[['What comes first: *eat* or *wash hands*?','*Wash hands* first!'],['Order: *sleep, pajamas, bath*','*bath, pajamas, sleep*']]});
})();
