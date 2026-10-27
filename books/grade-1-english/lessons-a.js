/* The Interactive Classroom: Grade 1 English — Units 1–7: sounds and letters, rhymes, nouns */
(function(){
"use strict";
const P=window.PM;if(!P||!P.unit)return;const U=P.unit,R=P.R,S=P.S;

/* 1 ─ Beginning consonants */
U({id:'e01',title:'Beginning sounds',strand:'Sounds and Letters',codes:['B2','C1'],
 guide:{goal:'Hear and name the first sound of a word, and match it to its consonant letter.',words:'sound, letter, consonant, vowel, beginning, first',ask:['What sound does *bee* start with?','Can you think of another word that starts like *sun*?','Which letters are vowels?'],home:'Play "I spy" with first sounds: "I spy something that starts with *m*."'},
 watch:['Fill in the first letter!','Listen: fox. The first sound is f. Watch the f block fly into the gap.'],
 fig:'Picture standees and letter blocks: find the first sound.',
 page:{story:{title:'A Trip to the Pumpkin Patch',text:'On Saturday, my family went to a *pumpkin patch*. We rode on a bumpy hay wagon. A big goat stood by the gate. I picked a fat, round pumpkin. My little sister picked a tiny one. Then we had warm apple cider. What a fun day!',pics:['pumpkin','goat','hay','apple']},
  boxes:[{title:'Beginning consonants',text:'The *beginning consonant* is the first sound of a word, when that sound is not a vowel (a, e, i, o, u).',ex:[['fox','*f*ox'],['bee','*b*ee'],['sun','*s*un'],['moon','*m*oon']]}],
  cards:[{q:'Which one starts with *p*?',pics:['pig','cat','pumpkin'],o:[0,2],a:'pig, pumpkin'},{q:'Fill it in: __og',pics:['dog'],a:'*d*og'}],
  words:[['consonant','a letter that is not a, e, i, o or u'],['beginning','the very start']]},
 steps:[
  {say:'Read the story',speech:'Listen to the story. On Saturday, my family went to a pumpkin patch. We rode on a bumpy hay wagon. A big goat stood by the gate. I picked a fat, round pumpkin. Then we had warm apple cider.',set:S.row(['pumpkin','hay','goat','apple']),
   cues:[['pumpkin patch','pumpkin','pumpkin'],['hay wagon','hay','hay'],['big goat','goat','goat'],['apple cider','apple','apple']]},
  {say:'The first sound',speech:'Every word starts with a sound. Say fox. The first sound is f. F is a consonant, so it is the beginning consonant. Watch it fill the gap.',set:S.fill('fox','fox',0,['f','b','m']),
   cues:[['say fox','fox','fox'],['first sound is f','#f','f'],['fill the gap','gap','f','done']]},
  {say:'More beginning sounds',speech:'Bee starts with b. Sun starts with s. Moon starts with m. Listen for the very first sound.',set:S.row(['bee','sun','moon'],{labels:['b - bee','s - sun','m - moon']}),
   cues:[['bee starts with b','bee','b'],['sun starts with s','sun','s'],['moon starts with m','moon','m']]}],
 rounds:[R.pick('Tap the picture that starts with *b*.',['bee','cat','sun','moon'],'bee'),R.fill('What is the first letter of *dog*?','dog','dog',0,['d','p','t']),
  R.pick('Tap the picture that starts with *m*.',['mouse','fish','duck','horse'],'mouse'),R.fill('What is the first letter of *pig*?','pig','pig',0,['p','b','g']),
  R.sort('Sort by the first sound: *b* or *s*. Tap or drag each picture.',['b','s'],[['bear',0],['sun',1],['banana',0],['snake',1],['bus',0],['sock',1]].map(x=>x[0]==='sock'?['socks',1]:x)),
  R.fill('What is the first letter of *horse*?','horse','horse',0,['h','n','k']),R.pick('Tap *every* picture that starts with *c*.',['cat','car','dog','cow'],['cat','car','cow'])],
 tries:[['What sound does *lion* start with?','*l*'],['Name something that starts with *t*.','*tree*, *tiger*, *tent*…']]});

/* 2 ─ Ending consonants */
U({id:'e02',title:'Ending sounds',strand:'Sounds and Letters',codes:['B2','C1'],
 guide:{goal:'Hear the last sound of a word and match it to its consonant letter.',words:'ending, last, sound, consonant',ask:['What sound do you hear at the end of *cat*?','Do *bus* and *dress* end the same way?'],home:'Say a word and clap on the last sound together.'},
 watch:['Fill in the last letter!','Listen: bus. The last sound is s. Watch the s block fly into the gap.'],
 fig:'Boats, letters and a gap at the end of each word.',
 page:{story:{title:'Boats on the Lake',text:'Boats help people travel on water. A *canoe* is long and thin, and you paddle it. A *kayak* is small and has a seat inside. A *sailboat* has a big sail that catches the wind. A *ship* is so big that it can carry hundreds of people!',pics:['canoe','sailboat','ship','ocean']},
  boxes:[{title:'Ending consonants',text:'The *ending consonant* is the last sound of a word, when that sound is not a vowel.',ex:[['bus','bu*s*'],['cat','ca*t*'],['crab','cra*b*'],['ship','shi*p*']]}],
  cards:[{q:'Which ones end with *t*?',pics:['cat','bus','hat'],o:[0,2],a:'cat, hat'},{q:'Fill it in: dru__',pics:['drum'],a:'dru*m*'}],
  words:[['ending','the very last part'],['sound','what you hear when you say a letter']]},
 steps:[
  {say:'Read about boats',speech:'Boats help people travel on water. A canoe is long and thin, and you paddle it. A sailboat has a big sail that catches the wind. A ship is so big that it can carry hundreds of people!',set:S.row(['canoe','sailboat','ship']),
   cues:[['a canoe','canoe','canoe'],['a sailboat','sailboat','sailboat'],['a ship','ship','ship']]},
  {say:'The last sound',speech:'Say bus. Listen to the end. The last sound is s. S is the ending consonant. Watch it go into the gap.',set:S.fill('bus','bus',2,['s','t','n']),
   cues:[['say bus','bus','bus'],['last sound is s','#s','s'],['into the gap','gap','s','done']]},
  {say:'More ending sounds',speech:'Cat ends with t. Crab ends with b. Drum ends with m.',set:S.row(['cat','crab','drum'],{labels:['ca-t','cra-b','dru-m']}),
   cues:[['cat ends with t','cat','t'],['crab ends with b','crab','b'],['drum ends with m','drum','m']]}],
 rounds:[R.fill('What is the last letter of *cat*?','cat','cat',2,['t','p','n']),R.pick('Tap the picture that ends with *g*.',['pig','cat','bus','sun'],'pig'),
  R.fill('What is the last letter of *drum*?','drum','drum',3,['m','n','b']),R.sort('Sort by the last sound: *t* or *n*.',['ends in t','ends in n'],[['cat',0],['sun',1],['hat',0],['moon',1],['kite',0],['lion',1]]),
  R.fill('What is the last letter of *crab*?','crab','crab',3,['b','d','p']),R.pick('Tap the picture that ends with *s*.',['bus','fox','dog','pen'].map(x=>x==='pen'?'pencil':x),'bus')],
 tries:[['What sound does *frog* end with?','*g*'],['Do *ship* and *map* end with the same sound?','*Yes*: both end with *p*.']]});

/* 3 ─ Short vowels */
U({id:'e03',title:'Short vowels',strand:'Sounds and Letters',codes:['B2','C1'],
 guide:{goal:'Hear and read the short vowel sounds a, e, i, o and u in simple words.',words:'vowel, short vowel, a, e, i, o, u',ask:['What is the middle sound in *cat*?','Change *pig* to *peg*: what changed?'],home:'Make silly words: hat, het, hit, hot, hut. Which are real?'},
 watch:['Find the short vowel!','Listen: pig. The middle sound is short i. Watch it fill the gap.'],
 fig:'Words with a missing short vowel in the middle.',
 page:{story:{title:'The Dog Who Would Not Share',text:'A big dog found a long *stick*. A small dog asked to play, but the big dog said no and ran off. At a pond, the big dog saw his reflection. He thought it was another dog with a stick! He barked, and his stick fell in the water. Now he had *nothing*. Sharing is more fun!',pics:['dog','wood','water','puppy']},
  boxes:[{title:'Short vowels',text:'The letters *a, e, i, o, u* are vowels. In short words like these they make a *short* sound.',ex:[['cat','c*a*t'],['egg','*e*gg'],['pig','p*i*g'],['frog','fr*o*g'],['bus','b*u*s']],cols:5}],
  cards:[{q:'Fill it in: b__g',pics:['bag'].map(x=>'backpack'),a:'b*a*g'},{q:'Fill it in: s__n',pics:['sun'],a:'s*u*n'}],
  words:[['vowel','the letters a, e, i, o and u'],['short vowel','the sound in c*a*t, b*e*d, p*i*g, h*o*t, s*u*n']]},
 steps:[
  {say:'Read the story',speech:'A big dog found a long stick. A small dog asked to play, but the big dog said no. At a pond, he barked at his own reflection, and his stick fell in the water. Now he had nothing. Sharing is more fun!',set:S.row(['dog','wood','water','puppy'],{labels:['big dog','stick','pond','small dog']}),
   cues:[['a big dog','dog','big dog'],['long stick','wood','stick'],['small dog','puppy','small dog'],['in the water','water','pond']]},
  {say:'Five vowels',speech:'Five letters are vowels: a, e, i, o and u. In cat, the a is short. In egg, the e is short. Pig, frog and bus have short i, short o and short u.',set:S.row(['cat','egg','pig','frog','bus'],{labels:['a','e','i','o','u']}),
   cues:[['in cat','cat','short a'],['in egg','egg','short e'],['pig,','pig','short i'],['frog','frog','short o'],['and bus','bus','short u']]},
  {say:'Fill the short vowel',speech:'Say pig. The middle sound is short i. Watch the i block fill the gap.',set:S.fill('pig','pig',1,['i','a','o']),
   cues:[['say pig','pig','pig'],['short i','#i','i'],['fill the gap','gap','i','done']]}],
 rounds:[R.fill('Which short vowel is in *cat*?','cat','cat',1,['a','i','u']),R.fill('Which short vowel is in *sun*?','sun','sun',1,['u','a','e']),R.fill('Which short vowel is in *pig*?','pig','pig',1,['i','e','o']),
  R.fill('Which short vowel is in *bed*?','bed','bed',1,['e','a','u']),R.fill('Which short vowel is in *fox*?','fox','fox',1,['o','i','a']),
  R.ask('Which word has a *short u*: bus, bee or cake?',null,['bus','bee','cake'],'bus',{ok:'Yes! b-u-s.'})],
 tries:[['What vowel do you hear in *hat*?','short *a*'],['Change one vowel: *pin* → p__n to make a writing tool.','*pen*']]});

/* 4 ─ Long vowels */
U({id:'e04',title:'Long vowels',strand:'Sounds and Letters',codes:['B2','C1'],
 guide:{goal:'Hear long vowel sounds, which sound like the name of the letter, often with a silent e at the end.',words:'long vowel, silent e, a, e, i, o, u',ask:['What does the e at the end of *cake* do?','Is the vowel in *kite* long or short?'],home:'Read pairs together: cap–cape, kit–kite, hop–hope.'},
 watch:['Make a long vowel','Add a silent e: kit becomes kite! The i now says its name.'],
 fig:'Long vowel words with a silent e.',
 page:{story:{title:'Looking Up at the Sky',text:'At night I like to look up at the sky. The *moon* glows like a big, bright light. Tiny *stars* twinkle far away. Once I saw a shooting star! In the daytime I look for clouds. One cloud looked like a whale, and one looked like a *kite*.',pics:['full moon','star','cloud','kite']},
  boxes:[{title:'Long vowels',text:'A *long vowel* sounds the same as the *name* of the letter. A silent *e* at the end often makes the vowel long.',ex:[['cake','c*a*ke'],['kite','k*i*te'],['rose','r*o*se'],['bee','b*ee*']],cols:4}],
  cards:[{q:'Short or long?',pics:['cake','cat'],a:'c*a*ke is long, c*a*t is short'},{q:'Add a silent e: hop → ?',pics:[],a:'h*o*p*e*'}],
  words:[['long vowel','says its own name: a, e, i, o, u'],['silent e','an e at the end that you do not hear']]},
 steps:[
  {say:'Read about the sky',speech:'At night I like to look up at the sky. The moon glows like a big, bright light. Tiny stars twinkle far away. One cloud looked like a kite.',set:S.row(['full moon','star','cloud','kite'],{labels:['moon','star','cloud','kite']}),
   cues:[['the moon','full moon','moon'],['tiny stars','star','stars'],['one cloud','cloud','cloud'],['a kite','kite','kite']]},
  {say:'Long vowels say their name',speech:'A long vowel says its own name. In cake, the a says a. In kite, the i says i. In rose, the o says o.',set:S.row(['cake','kite','rose'],{labels:['a - cake','i - kite','o - rose']}),
   cues:[['in cake','cake','long a'],['in kite','kite','long i'],['in rose','rose','long o']]},
  {say:'The silent e',speech:'Look at the word kit. Add a silent e at the end, and kit becomes kite! You do not hear the e, but it makes the i long.',set:S.fill('kite','kite',3,['e','a','s']),
   cues:[['the word kit','kite','kit'],['silent e','gap','e','done'],['makes the i long','#i','long i']]}],
 rounds:[R.fill('Add the silent *e* to make *cake*.','cake','cake',3,['e','a','s']),R.ask('Is the vowel in *kite* long or short?',['kite'],['long','short'],'long'),
  R.ask('Is the vowel in *cat* long or short?',['cat'],['long','short'],'short'),R.pick('Tap the picture with a *long a* sound.',['cake','cat','bag'.replace('bag','backpack'),'hat'],'cake'),
  R.sort('Long vowel or short vowel?',['long','short'],[['cake',0],['cat',1],['kite',0],['pig',1],['rose',0],['bus',1]]),R.pick('Tap the picture with a *long o* sound.',['rose','frog','fox','dog'],'rose')],
 tries:[['Add a silent e to *cub*. What new word?','*cube*'],['Which vowel is long in *bike*?','*i*']]});

/* 5 ─ Rhyming words */
U({id:'e05',title:'Rhyming words',strand:'Sounds and Letters',codes:['B2','C1'],
 guide:{goal:'Hear and make rhyming words: words with the same ending sound.',words:'rhyme, ending sound, the same',ask:['What rhymes with *cat*?','Do *moon* and *spoon* rhyme?'],home:'Make a silly rhyme for each family member\'s name.'},
 watch:['Match the rhymes!','Cat and hat rhyme. Watch them go into the same crate.'],
 fig:'Rhyming pairs sorted into crates.',
 page:{story:{title:'A Spicy Song',text:'I like *rice* and that is *nice*. I like *bread*, some jam on *red*! A bowl of *soup* for all the *group*. A slice of *pie* way up *high*. Food is fun, so yum, yum, *yum*! A happy song for a happy *tum*.',pics:['rice','bread','soup','pie']},
  boxes:[{title:'Rhyming words',text:'*Rhyming words* end with the same sound.',ex:[['cat','c*at* – h*at*'],['moon','m*oon* – sp*oon*'],['bee','b*ee* – tr*ee*'],['frog','fr*og* – d*og*']]}],
  cards:[{q:'Which one rhymes with *cake*?',pics:['snake','cat','bus'],o:[0],a:'snake'},{q:'Which one does not rhyme?',pics:['bear','chair','sun'],x:[2],a:'sun'}],
  words:[['rhyme','words with the same ending sound'],['ending sound','the last part you hear']]},
 steps:[
  {say:'Sing the food song',speech:'I like rice and that is nice. A bowl of soup for all the group. A slice of pie way up high. Rice and nice rhyme. Soup and group rhyme. Pie and high rhyme!',set:S.row(['rice','soup','pie']),
   cues:[['i like rice','rice','rice – nice'],['bowl of soup','soup','soup – group'],['slice of pie','pie','pie – high']]},
  {say:'Same ending sound',speech:'Cat and hat end with the same sound, at. They rhyme! Moon and spoon both end with oon. They rhyme too.',set:S.row(['cat','hat','moon','spoon']),
   cues:[['cat and hat','cat|hat','-at'],['moon and spoon','moon|spoon','-oon']]},
  {say:'Sort the rhymes',speech:'Let us sort. Frog and dog go together. Bee and tree go together.',set:S.sort(['-og','-ee'],[['frog',0],['bee',1],['dog',0],['tree',1]]),
   cues:[['frog and dog','frog|dog','-og','play'],['bee and tree','bee|tree','-ee']]}],
 rounds:[R.pick('Tap the picture that rhymes with *cat*.',['hat','dog','sun','bee'],'hat'),R.pick('Tap the picture that rhymes with *moon*.',['spoon','car','fish','cake'],'spoon'),
  R.sort('Sort the rhyming words.',['-ee','-og'],[['bee',0],['frog',1],['tree',0],['dog',1]]),R.pick('Tap the picture that rhymes with *cake*.',['snake','car','pig','bus'],'snake'),
  R.pick('Tap the picture that rhymes with *bear*.',['chair','cow','duck','sun'],'chair'),R.sort('Sort the rhyming words.',['-ox','-ug'],[['fox',0],['box',0],['bug'.replace('bug','ladybug'),1],['mug',1]],{q:'Sort the rhyming words: *fox, box* and *bug, mug*.'})],
 tries:[['What rhymes with *ball*?','*wall, tall, fall*'],['Do *fish* and *dish* rhyme?','*Yes*: both end with *-ish*.']]});

/* 6 ─ Nouns */
U({id:'e06',title:'Nouns',strand:'Words',codes:['B3','C1'],
 guide:{goal:'Find nouns: words that name a person, an animal, a place or a thing.',words:'noun, person, animal, place, thing',ask:['Name three nouns you can see.','Is *run* a noun? Why not?'],home:'Point to things at home and say "noun!" for each one.'},
 watch:['Sort the nouns!','Watch each noun go into its crate: person, animal, place or thing.'],
 fig:'Nouns sorted into people, animals, places and things.',
 page:{story:{title:'Pen Pals',text:'Dear Aiko, my name is *Sam*. I live in a small *town* by a big *lake*. I have a *dog* named Pepper and a red *bike*. In winter we skate on the frozen lake. What is your *school* like? Please write back soon! Your friend, Sam',pics:['boy','lake','dog','bicycle']},
  boxes:[{title:'Nouns',text:'A *noun* is a word that names a *person*, an *animal*, a *place* or a *thing*.',ex:[['teacher','person'],['bear','animal'],['school','place'],['book','thing']]}],
  cards:[{q:'Which ones are nouns?',pics:['dog','runner','apple'],o:[0,2],a:'dog, apple'},{q:'Person, animal, place or thing?',pics:['hospital'],a:'hospital is a *place*'}],
  words:[['noun','a naming word'],['place','where something is, like a park or a city']]},
 steps:[
  {say:'Read the letter',speech:'Dear Aiko, my name is Sam. I live in a small town by a big lake. I have a dog named Pepper and a red bike. Please write back soon!',set:S.row(['boy','lake','dog','bicycle'],{labels:['Sam','lake','dog','bike']}),
   cues:[['my name is sam','boy','person'],['big lake','lake','place'],['a dog','dog','animal'],['red bike','bicycle','thing']]},
  {say:'Nouns name things',speech:'A noun names a person, an animal, a place or a thing. A teacher is a person. A bear is an animal. A school is a place. A book is a thing.',set:S.row(['teacher','bear','school','book']),
   cues:[['a teacher','teacher','person'],['a bear','bear','animal'],['a school','school','place'],['a book','book','thing']]},
  {say:'Sort the nouns',speech:'Let us sort nouns into people and animals. Doctor and baby are people. Cat and fish are animals.',set:S.sort(['people','animals'],[['doctor',0],['cat',1],['baby',0],['fish',1]]),
   cues:[['into people and animals','*','nouns','play'],['are people','doctor|baby','people'],['are animals','cat|fish','animals']]}],
 rounds:[R.sort('Sort the nouns: *people* or *animals*?',['people','animals'],[['firefighter',0],['cow',1],['grandma',0],['duck',1],['baby',0],['frog',1]]),
  R.sort('Sort the nouns: *places* or *things*?',['places','things'],[['school',0],['ball',1],['hospital',0],['cup',1],['house',0],['kite',1]]),
  R.ask('Is *jump* a noun?',null,['yes','no'],'no',{ok:'Right! Jump is an action, not a naming word.'}),R.pick('Tap the *place*.',['park','dog','pencil','teacher'],'park'),
  R.pick('Tap the *person*.',['farmer','horse','barn','hat'],'farmer'),R.pick('Tap the *animal*.',['bear','house','book','chef'],'bear')],
 tries:[['Name a noun that is a *place*.','*park, school, store*…'],['Is *happy* a noun?','*No*: it describes a feeling.']]});

/* 7 ─ Common nouns */
U({id:'e07',title:'Common nouns',strand:'Words',codes:['B3','C1'],
 guide:{goal:'Know that common nouns name any person, animal, place or thing, and do not need a capital letter.',words:'common noun, any, general',ask:['Is *dog* a common noun?','Name a common noun you can eat.'],home:'Go on a common noun walk: name ten things you pass.'},
 watch:['Common nouns','Duck, garden, paper, sister: these are common nouns. They name any duck, any garden.'],
 fig:'Common nouns all around a garden.',
 page:{story:{title:'Our Busy Kitchen',text:'Every Saturday we make pancakes. My *dad* cracks the *eggs*. My *brother* stirs the *flour* and *milk*. I pour the batter into the *pan*. Our *cat* watches from the *window*. Then we all sit at the *table* and eat. Yum!',pics:['man','egg','milk','pancakes']},
  boxes:[{title:'Common nouns',text:'A *common noun* names *any* person, animal, place or thing. It does not start with a capital letter.',ex:[['girl','sister'],['duck','duck'],['park','garden'],['paper','paper']]}],
  cards:[{q:'Find the common nouns: *The cat sat on a mat.*',pics:['cat'],a:'cat, mat'},{q:'Which is a common noun?',pics:['city'],a:'*city* (not *Toronto*)'}],
  words:[['common noun','a naming word for any person, animal, place or thing'],['capital letter','a big letter like A, B, C']]},
 steps:[
  {say:'Read about the kitchen',speech:'Every Saturday we make pancakes. My dad cracks the eggs. My brother stirs the milk. Our cat watches from the window.',set:S.row(['pancakes','egg','milk','cat']),
   cues:[['make pancakes','pancakes','pancakes'],['the eggs','egg','eggs'],['the milk','milk','milk'],['our cat','cat','cat']]},
  {say:'Any one at all',speech:'A common noun names any person, animal, place or thing. Sister, duck, garden and paper are common nouns. They start with small letters.',set:S.row(['girl','duck','park','paper'],{labels:['sister','duck','garden','paper']}),
   cues:[['sister','girl','person'],['duck,','duck','animal'],['garden','park','place'],['and paper','paper','thing']]},
  {say:'Build a sentence',speech:'Find the common nouns in this sentence: The cat sat on a mat. Cat and mat are common nouns.',set:S.build(['The','cat','sat','on','a','mat.'],'cat'),
   cues:[['the cat sat','*','','play'],['cat and mat','#cat|#mat.','nouns']]}],
 rounds:[R.pick('Tap the *common noun* for a place.',['park','runner','happy'.replace('happy','laughing'),'swimmer'],'park'),R.sort('Common noun or not a noun?',['noun','not a noun'],[['apple',0],['runner',1],['chair',0],['swimmer',1],['tree',0],['laughing',1]],{hint:'Nouns are people, animals, places or things. Running and swimming are actions.'}),
  R.build('Build the sentence: *The duck swims in the pond.*',['The','duck','swims','in','the','pond.'],'duck'),R.ask('Which word is a common noun: *Toronto* or *city*?',null,['Toronto','city'],'city'),
  R.pick('Tap the common noun that is an *animal*.',['owl','tree','house','pencil'],'owl'),R.ask('How many common nouns? *The dog ate a bone.*',['dog','bone'],['1','2','3'],'2',{ok:'Yes! dog and bone.'})],
 tries:[['Find the common noun: *We went to the zoo.*','*zoo*'],['Is *Canada* a common noun?','*No*: it is a special name.']]});
})();
