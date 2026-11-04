/* The Interactive Classroom: Grade 4 English — Word Study: prefixes, suffixes, base words, synonyms and antonyms, homophones and homographs, context clues, figurative language */
(function(){
"use strict";
const P=window.PM;if(!P||!P.unit)return;const U=P.unit,R=P.R,S=P.S;

/* 1 ─ Prefixes */
U({id:'e01',title:'Prefixes change meaning',strand:'Word Study',codes:['B2.1','B2.2'],
 guide:{goal:'Use common prefixes (un-, re-, dis-, mis-, pre-, non-) to read, spell and understand new words.',words:'prefix, base word, un-, re-, dis-, mis-, pre-',ask:['What does re- mean in rewrite?','How does un- change happy?','What is a prefix?'],home:'Find 5 words with prefixes on cereal boxes or signs.'},
 watch:['A prefix goes at the front!','un + zip = unzip (the opposite). re + fasten = refasten (again).'],
 fig:'Word blocks: a prefix snapping onto a base word.',
 page:{story:{title:'The Burr That Became Velcro',text:'In *1941*, a Swiss engineer named *George de Mestral* went for a walk with his dog. When they came home, both were covered in prickly *burrs*. They were *unpleasant* to pull off! George looked at a burr under a microscope and saw tiny *hooks*. They grabbed onto loops in fabric. He was not *discouraged* by early failures. He kept *redesigning* until he made two strips: one with hooks and one with loops. You could fasten, *unfasten* and *refasten* them again and again. He called it *Velcro*. Today it is on shoes, jackets and even astronaut suits!',pics:['dog','plant','man','shoe'],
   acts:[[null,'mountain',['dog','man'],'A walk in the hills!'],['burrs','meadow',['dog','plant'],'Prickly burrs!'],['microscope','lab',['beaker','man'],'Tiny hooks!'],['Velcro','city',['shoe','rocket'],'Rrrrrip!']]},
  boxes:[{title:'Common prefixes',lines:['*un-* = not: unhappy, unfasten','*re-* = again: redo, refasten','*dis-* = not, opposite: disagree, discouraged','*mis-* = wrongly: misspell','*pre-* = before: preview','*non-* = not: nonstop']},
   {title:'Prefix + base word',lines:['un + *lock* = unlock','re + *design* = redesign','pre + *heat* = preheat']}],
  cards:[{q:'What does misplace mean?',a:'*place wrongly* (lose)'},{q:'Add a prefix to “agree” to mean the opposite.',a:'*disagree*'}],
  words:[['prefix','a word part added to the beginning of a base word'],['base word','a word that can stand alone and have parts added to it']]},
 steps:[
  {say:'Read the story',speech:'George de Mestral found burrs on his dog. Under a microscope, they had tiny hooks. He kept redesigning until he made Velcro, which you can fasten, unfasten and refasten.',set:S.row(['dog','plant','man','shoe'])},
  {say:'Un- means not',speech:'Un means not or the opposite. Unfasten means the opposite of fasten. Unpleasant means not pleasant.',set:S.word('Pulling burrs off was','.',['unpleasant','pleasant','replease'],'unpleasant',{pic:'plant'})},
  {say:'Re- means again',speech:'Re means again. Redesign means design again. Refasten means fasten again.',set:S.word('He kept','until it worked.',['redesigning','undesigning','predesigning'],'redesigning',{pic:'man'})},
  {say:'Dis- and mis-',speech:'Dis means not or the opposite: discouraged means not encouraged. Mis means wrongly: misspell means spell wrongly.',set:S.word('He was not','by failures.',['discouraged','miscouraged','recouraged'],'discouraged',{pic:'man'})}],
 more:{title:'Did you know?',text:'The name *Velcro* comes from two French words: *velours* (velvet) and *crochet* (hook). So Velcro means “velvet hook”!',pics:['shoe']},
 rounds:[R.word('Which word fits?','Please','your messy drawing.',['redo','undo','predo'],'redo'),R.word('Which word fits?','I','with you. I think it is wrong.',['disagree','reagree','preagree'],'disagree'),
  R.q('What does *un-* mean in *unlock*?',['not, the opposite','again','before'],'not, the opposite'),R.q('What does *pre-* mean in *preview*?',['before','again','wrongly'],'before'),
  R.q('Which word means *spell wrongly*?',['misspell','respell','unspell'],'misspell'),R.q('What did George find on his dog?',['burrs','fleas','mud'],'burrs'),
  R.q('What did George see under the microscope?',['tiny hooks','tiny wheels','tiny eggs'],'tiny hooks'),R.q('What is the base word in *refasten*?',['fasten','re','ten'],'fasten'),R.tf('A prefix goes at the end of a word.',false)],
 tries:[['Make 3 words with re-.','*reread, rebuild, recycle*'],['Write a sentence with “unbelievable”.','e.g. The magic trick was unbelievable!']]});

/* 2 ─ Suffixes */
U({id:'e02',title:'Suffixes change meaning',strand:'Word Study',codes:['B2.1','B2.2'],
 guide:{goal:'Use common suffixes (-ful, -less, -ness, -ly, -able, -er, -ment) to read, spell and understand words, noticing spelling changes like dropping e or changing y to i.',words:'suffix, -ful, -less, -ness, -ly, -able, -er',ask:['What does -less mean in careless?','How does -ly change quick?','What happens to happy when you add -ness?'],home:'Add -ful and -less to: help, care, use, hope, fear.'},
 watch:['A suffix goes at the end!','use + ful = useful. use + less = useless. Opposite meanings!'],
 fig:'Word blocks with suffixes at the end.',
 page:{story:{title:'The Zipper’s Bumpy Start',text:'In the *1890s*, people spent ages doing up *buttons* on boots. An inventor made a hook-and-eye *fastener*, but it was *useless*: it kept popping open. Then *Gideon Sundback*, a *Swedish-Canadian* engineer who lived in *St. Catharines, Ontario*, had a *wonderful* idea. He made metal *teeth* that locked together *smoothly*. His new fastener was *dependable* and *unbreakable*. A company used it on rubber boots and called it the *zipper* because of the *zip* sound it made. Its *usefulness* changed clothing forever!',pics:['boot','shirt','man','backpack'],
   acts:[[null,'home',['boot','man'],'So many buttons!'],['useless','home',['boot','man'],'Pop! It opened.'],['Gideon Sundback','workshop',['gears','man'],'A wonderful idea!'],['zipper','city',['backpack','shirt'],'Zzzzip!']]},
  boxes:[{title:'Common suffixes',lines:['*-ful* = full of: wonderful, careful','*-less* = without: useless, fearless','*-ness* = state of: kindness, darkness','*-ly* = in a way: smoothly, quickly','*-able* = can be: dependable, washable','*-er* = one who: inventor, teacher']},
   {title:'Spelling changes',lines:['happy → happ*i*ness (y → i)','use → us*able* (drop the e)','big → bi*gg*er (double the consonant)']}],
  cards:[{q:'What does fearless mean?',a:'*without* fear'},{q:'Add -ness to kind.',a:'*kindness*'}],
  words:[['suffix','a word part added to the end of a base word'],['dependable','can be depended on, reliable']]},
 steps:[
  {say:'Read the story',speech:'The first fastener was useless. Gideon Sundback had a wonderful idea. His teeth locked smoothly, and his zipper was dependable.',set:S.row(['boot','shirt','man','backpack'])},
  {say:'-ful and -less',speech:'Ful means full of. Less means without. Useful is full of use. Useless has no use at all.',set:S.word('The first fastener was',': it popped open.',['useless','useful','usely'],'useless',{pic:'boot'})},
  {say:'-ly and -able',speech:'Ly tells how something is done: smoothly. Able means it can be: dependable means it can be depended on.',set:S.word('The teeth locked','together.',['smoothly','smoothness','smoothable'],'smoothly',{pic:'backpack'})},
  {say:'-ness',speech:'Ness turns a describing word into a thing. Kind becomes kindness. Useful becomes usefulness.',set:S.word('Its','changed clothing forever.',['usefulness','useful','usefully'],'usefulness',{pic:'shirt'})}],
 more:{title:'Did you know?',text:'Before zippers, it could take *several minutes* to button up tall boots. Some people used a special *buttonhook* tool!',pics:['boot']},
 rounds:[R.word('Which word fits?','Be','with the scissors!',['careful','careless','carefully'],'careful'),R.word('Which word fits?','The puppy ran','across the yard.',['quickly','quickness','quickful'],'quickly'),
  R.q('What does *-less* mean?',['without','full of','again'],'without'),R.q('*happy + ness* is spelled…',['happiness','happyness','happness'],'happiness'),
  R.q('Someone who *teaches* is a…',['teacher','teachful','teachness'],'teacher'),R.q('Where did Gideon Sundback live?',['St. Catharines, Ontario','Paris','Tokyo'],'St. Catharines, Ontario'),
  R.q('Why was it called a zipper?',['the zip sound it made','a man named Zip','it was fast'],'the zip sound it made'),R.q('A shirt you can wash is…',['washable','washful','washless'],'washable'),R.tf('*Fearless* means full of fear.',false)],
 tries:[['Make 4 words from “help”.','*helpful, helpless, helper, helpfully*'],['Use “dependable” in a sentence.','e.g. My dog is a dependable friend.']]});

/* 3 ─ Base words and word families */
U({id:'e03',title:'Base words and word families',strand:'Word Study',codes:['B2.1','B2.2'],
 guide:{goal:'Break long words into prefix + base + suffix (morphemes) to read, spell and understand them, and find words in the same family.',words:'morpheme, base, word family, syllable, compound word',ask:['What is the base word in unbelievable?','Name three words in the “play” family.','How can breaking a word into parts help you read it?'],home:'Pick a base word like “view”. How many family words can you make?'},
 watch:['Break it into parts!','un + believe + able = unbelievable: “not able to be believed”.'],
 fig:'A long word split into colour-coded parts.',
 page:{story:{title:'Unbelievable Madagascar',text:'*Madagascar* is a huge island off the coast of *Africa*. About *90%* of its animals live *nowhere* else on Earth! Ring-tailed *lemurs* leap through the trees. *Chameleons* change colour. The tiny *leaf-tailed gecko* is nearly *invisible* against bark. "That is *unbelievable*!" said Leo, reading his library book. His teacher wrote it on the board: *un* + *believe* + *able*. "Break long words into parts, and they are not *unreadable* anymore!" Leo found more family words: *believe*, *belief*, *believer*, *believable*.',pics:['monkey','lizard','boy','island'],
   acts:[[null,'jungle',['monkey','island'],'Madagascar!'],['Chameleons','jungle',['lizard','tree'],'Colour-changers!'],['unbelievable','classroom',['book','boy'],'Unbelievable!']]},
  boxes:[{title:'Word parts (morphemes)',lines:['*un* + *believe* + *able*','prefix + base + suffix','*in* + *vis* + *ible* = invisible (cannot be seen)']},
   {title:'Word families',lines:['*believe*: belief, believer, believable, unbelievable','*play*: player, playful, replay, playground','*sign*: signal, signature, design']}],
  cards:[{q:'Split “disagreement” into parts.',a:'*dis* + *agree* + *ment*'},{q:'Name a compound word.',a:'*playground*, sunflower, rainforest'}],
  words:[['morpheme','the smallest part of a word that has meaning'],['word family','words that share the same base word']]},
 steps:[
  {say:'Read the story',speech:'Madagascar’s lemurs, chameleons and nearly invisible geckos live nowhere else. Leo found the word unbelievable and broke it into parts.',set:S.row(['monkey','lizard','boy','island'])},
  {say:'Break it apart',speech:'Unbelievable has three parts: un, believe and able. Un means not. Able means can be. So unbelievable means it cannot be believed.',set:S.build(['un','believe','able'],'book'),cues:[['un','un','not'],['believe','believe','base'],['able','able','can be']]},
  {say:'A word family',speech:'Believe, belief, believer and believable all share the same base. They are one word family.',set:S.row(['book','book','book','book'],{labels:['believe','belief','believer','believable']}),
   cues:[['Believe','book','base']]}],
 more:{title:'Did you know?',text:'Lemurs are *primates*, like monkeys and apes. The *aye-aye*, a strange lemur, taps on trees with a long, thin finger to find bugs!',pics:['monkey']},
 rounds:[R.q('What is the base word in *unbelievable*?',['believe','able','un'],'believe'),R.q('Which word is in the *play* family?',['playful','plane','plate'],'playful'),
  R.q('*invisible* means…',['cannot be seen','very big','very old'],'cannot be seen'),R.q('Split *replayed*:',['re + play + ed','rep + lay + ed','replay + ed + re'],'re + play + ed'),
  R.q('Which is a compound word?',['rainforest','rainy','raining'],'rainforest'),R.q('Where is Madagascar?',['off the coast of Africa','in Canada','near the North Pole'],'off the coast of Africa'),
  R.q('About how many of Madagascar’s animals live nowhere else?',['90%','10%','50%'],'90%'),R.q('Which animal changes colour?',['chameleon','lemur','gecko'],'chameleon'),R.tf('Breaking words into parts can help you read them.',true)],
 tries:[['How many words can you make from “happy”?','unhappy, happily, happiness…'],['Split “unforgettable”.','*un* + *forget* + *able*']]});

/* 4 ─ Synonyms and antonyms */
U({id:'e04',title:'Synonyms and antonyms',strand:'Word Study',codes:['B2.2','D2.2'],
 guide:{goal:'Use synonyms (same meaning) to make writing more interesting and antonyms (opposite meaning) to compare, and choose the most precise word.',words:'synonym, antonym, precise, thesaurus, shades of meaning',ask:['What is a synonym for strong?','What is an antonym for heavy?','Why would a writer use “enormous” instead of “big”?'],home:'Find 3 synonyms for “said” in a storybook.'},
 watch:['Same or opposite?','Strong and mighty are synonyms. Strong and weak are antonyms.'],
 fig:'Pairs of synonyms and antonyms.',
 page:{story:{title:'The Mightiest Beetle',text:'Which animal is the *strongest* on Earth? Not the *enormous* elephant or the *powerful* gorilla. It is a *tiny* beetle! The *horned dung beetle* can pull about *1 100 times* its own weight. That is like a person pulling *six* double-decker buses! These *mighty* insects roll balls of dung that are much *heavier* than they are. "Strong, powerful and mighty are *synonyms*," said Mr. Lee. "And tiny and enormous are *antonyms*: opposites. Choosing the right word makes writing *exciting*, not *boring*!"',pics:['beetle','elephant','teacher','bus'],
   acts:[[null,'savannah',['elephant'],'Not the elephant…'],['tiny beetle','savannah',['beetle:big','rock'],'A tiny beetle!'],['double-decker','city',['bus','bus'],'Six buses!'],['synonyms','classroom',['teacher','book'],'Strong, powerful, mighty!']]},
  boxes:[{title:'Synonyms (same)',lines:['strong → *powerful, mighty*','big → *enormous, huge, gigantic*','said → *shouted, whispered, replied*','tired → *exhausted, sleepy*']},
   {title:'Antonyms (opposite)',lines:['tiny ↔ *enormous*','heavy ↔ *light*','exciting ↔ *boring*','ancient ↔ *modern*']}],
  cards:[{q:'A synonym for “quick”?',a:'*fast*, speedy, rapid'},{q:'An antonym for “brave”?',a:'*afraid*, cowardly'}],
  words:[['synonym','a word that means the same or nearly the same as another'],['antonym','a word that means the opposite of another']]},
 steps:[
  {say:'Read the story',speech:'The tiny horned dung beetle can pull more than one thousand times its own weight. Strong, powerful and mighty are synonyms. Tiny and enormous are antonyms.',set:S.row(['beetle','elephant','teacher','bus'])},
  {say:'Synonyms',speech:'Strong, powerful and mighty all mean about the same thing. Writers use synonyms so they do not repeat the same word.',set:S.word('The','beetle pulled a heavy load.',['mighty','weak','tiny'],'mighty',{pic:'beetle'})},
  {say:'Antonyms',speech:'Tiny is the opposite of enormous. Heavy is the opposite of light. Antonyms help us compare things.',set:S.sort(['synonyms of big','antonyms of big'],[['elephant',0],['beetle',1],['whale',0],['ant',1]]),
   cues:[['enormous','elephant','big'],['Tiny','beetle','small']]}],
 more:{title:'Did you know?',text:'A *thesaurus* is a book (or website) full of synonyms and antonyms. The word comes from Greek and means “treasure house” of words!',pics:['book']},
 rounds:[R.q('A synonym for *strong*:',['mighty','weak','slow'],'mighty'),R.q('An antonym for *tiny*:',['enormous','small','little'],'enormous'),
  R.q('Which pair are synonyms?',['huge, gigantic','hot, cold','up, down'],'huge, gigantic'),R.q('Which pair are antonyms?',['ancient, modern','happy, glad','big, large'],'ancient, modern'),
  R.q('What is the strongest animal in the story?',['horned dung beetle','elephant','gorilla'],'horned dung beetle'),R.q('A book of synonyms is a…',['thesaurus','dictionary of maps','atlas'],'thesaurus'),
  R.word('Which word fits?','The beetle is small, but the elephant is','.',['enormous','tiny','little'],'enormous'),R.q('A more exciting word for *said* when someone is very quiet:',['whispered','shouted','yelled'],'whispered'),R.tf('Exciting and boring are synonyms.',false)],
 tries:[['Rewrite: “The big dog ate a big bone.”','e.g. The *huge* dog ate an *enormous* bone.'],['List 3 antonym pairs.','hot/cold, open/closed, early/late']]});

/* 5 ─ Homophones and homographs */
U({id:'e05',title:'Homophones and homographs',strand:'Word Study',codes:['B2.2','B2.1'],
 guide:{goal:'Tell apart homophones (sound the same, spelled differently: their/there/they’re) and homographs (spelled the same, different meaning, sometimes different sound: wind/wind) using context.',words:'homophone, homograph, context, spelling, meaning',ask:['Which “there” means a place?','What are the two meanings of “bat”?','How do you know which meaning to use?'],home:'Make a homophone poster: to/too/two, hear/here, write/right.'},
 watch:['Sound alike or look alike?','Homophones sound alike: hear and here. Homographs look alike: a bat (animal) and a bat (baseball).'],
 fig:'Homophone pairs with pictures.',
 page:{story:{title:'The Great Cheese Chase',text:'Every spring in *Gloucester, England*, people race *down* a steep hill chasing a *wheel* of cheese! The cheese *rolls* faster than anyone can run. Racers tumble, slide and *flip*. "I *knew* it would be wild," said Maya, watching a *new* video. "*Their* legs fly everywhere! Look over *there*! *They’re* falling!" The winner gets to keep the cheese. Her brother laughed. "I would *wind* up with bruises." "Then the *wind* would blow you down the hill," Maya joked.',pics:['cheese','mountain','girl','boy'],
   acts:[[null,'meadow',['cheese:big','mountain'],'Chase the cheese!'],['tumble','meadow',['runner','boy'],'Whoa!'],['Their legs','home',['girl','tv'],'They’re falling!'],['wind','meadow',['cloud','boy'],'Whoosh!']]},
  boxes:[{title:'Homophones (sound the same)',lines:['*their* (belongs to them) · *there* (a place) · *they’re* (they are)','*to* · *too* · *two*','*knew* · *new*','*hear* · *here*','*right* · *write*']},
   {title:'Homographs (spelled the same)',lines:['*wind* (moving air) · *wind* (turn)','*bat* (animal) · *bat* (baseball)','*row* (a line) · *row* (paddle)','*close* (shut) · *close* (near)']}],
  cards:[{q:'___ going to the park. (their/there/they’re)',a:'*They’re*'},{q:'Two meanings of “bark”?',a:'a *dog’s sound* and *tree skin*'}],
  words:[['homophone','words that sound the same but have different spellings and meanings'],['homograph','words spelled the same with different meanings']]},
 steps:[
  {say:'Read the story',speech:'People chase a wheel of cheese down a hill. Maya said, their legs fly everywhere, look over there, they’re falling! Her brother said he would wind up with bruises.',set:S.row(['cheese','mountain','girl','boy'])},
  {say:'Their, there, they’re',speech:'Their means belonging to them. There is a place. They’re is short for they are.',set:S.word('Look over','! The cheese is rolling.',['there','their','they’re'],'there',{pic:'cheese'})},
  {say:'Knew or new?',speech:'Knew is the past of know. New means not old. They sound the same but mean different things.',set:S.word('I','it would be wild.',['knew','new','know'],'knew',{pic:'girl'})},
  {say:'Homographs',speech:'Wind can be moving air, or wind can mean to turn, like winding a clock. The sentence tells you which one.',set:S.row(['cloud','clock'],{labels:['wind (air)','wind (turn)']}),
   cues:[['moving air','cloud','wind'],['winding a clock','clock','wind']]}],
 more:{title:'Did you know?',text:'The Gloucester cheese is a *Double Gloucester*, weighing about *3 to 4 kilograms*. It can roll at up to *110 km/h*!',pics:['cheese']},
 rounds:[R.word('Which word fits?','','dog wagged its tail.',['Their','There','They’re'],'Their'),R.word('Which word fits?','I have','sisters.',['two','too','to'],'two'),
  R.word('Which word fits?','Can you','the music?',['hear','here'],'hear'),R.word('Which word fits?','Please','your name.',['write','right'],'write'),
  R.q('Homophones…',['sound the same, spelled differently','are spelled the same','are opposites'],'sound the same, spelled differently'),R.q('Which is a homograph?',['bat','cat','hat'],'bat'),
  R.q('What did the people chase?',['a wheel of cheese','a ball','a dog'],'a wheel of cheese'),R.q('*They’re* means…',['they are','belongs to them','a place'],'they are'),R.tf('“Wind” can mean moving air or to turn something.',true)],
 tries:[['Write a silly sentence with to, too and two.','e.g. *Two* cats went *to* the park *too*.'],['Find 2 meanings of “row”.','a line / to paddle a boat']]});

/* 6 ─ Context clues and multiple-meaning words */
U({id:'e06',title:'Context clues',strand:'Word Study',codes:['B2.2','C2.4'],
 guide:{goal:'Use context clues (definitions, examples, synonyms, antonyms in the sentence) and word parts to figure out unfamiliar and multiple-meaning words, and check with a dictionary.',words:'context clue, unfamiliar, definition, example, dictionary, glossary',ask:['What are context clues?','What does “crater” mean in the story?','When should you use a dictionary?'],home:'Read a newspaper article. Underline a new word and guess its meaning from clues.'},
 watch:['Be a word detective!','Look around the word: the sentence often explains it.'],
 fig:'A meteorite crater with clue words around it.',
 page:{story:{title:'Rocks from Space',text:'Long ago, a giant *meteorite*, a space rock that falls to Earth, smashed into what is now *Quebec*. It made a huge *crater*: a round hole, about *100 kilometres* wide. Today the *Manicouagan crater* is filled with water and looks like a giant ring. Most meteorites are *minuscule*, as tiny as grains of sand, and burn up in the sky as *shooting stars*. Scientists who find meteorites are *ecstatic*: they are so happy because these rocks are clues to how the *solar system* formed.',pics:['rock','star','lake','girl'],
   acts:[[null,'space',['rock','star'],'A space rock!'],['crater','shield',['lake','rock'],'A giant ring!'],['shooting stars','night',['star','girl'],'Make a wish!'],['ecstatic','lab',['rock','woman'],'So happy!']]},
  boxes:[{title:'Kinds of context clues',lines:['*definition*: a meteorite, *a space rock that falls to Earth*','*example*: minuscule, *as tiny as grains of sand*','*synonym*: ecstatic, *so happy*','*antonym*: not huge but *minuscule*']},
   {title:'Multiple meanings',lines:['*ring*: a circle or a sound','*star*: in the sky or a famous person','use the *sentence* to choose']}],
  cards:[{q:'“The arid desert had no rain.” What does arid mean?',a:'*dry*'},{q:'Where can you check a word’s meaning?',a:'a *dictionary* or *glossary*'}],
  words:[['context clue','a hint in the nearby words that helps you understand a new word'],['glossary','a mini dictionary at the back of a book']]},
 steps:[
  {say:'Read the story',speech:'A giant meteorite made the Manicouagan crater in Quebec. Most meteorites are minuscule, as tiny as grains of sand. Scientists are ecstatic when they find one.',set:S.row(['rock','star','lake','girl'])},
  {say:'Definition clues',speech:'Sometimes the sentence explains the word right away. A meteorite, a space rock that falls to Earth. The clue is right there!',set:S.word('A meteorite is a space','that falls to Earth.',['rock','cloud','bird'],'rock',{pic:'rock'})},
  {say:'Example clues',speech:'Minuscule, as tiny as grains of sand. The example tells you minuscule means very, very small.',set:S.word('Minuscule means very','.',['small','big','fast'],'small',{pic:'star'})},
  {say:'Synonym clues',speech:'Ecstatic, so happy. The synonym nearby gives the meaning.',set:S.word('Ecstatic means very','.',['happy','sad','sleepy'],'happy',{pic:'girl'})}],
 more:{title:'Did you know?',text:'About *50 tonnes* of space dust and tiny meteorites fall on Earth *every day*! Most of it is too small to see.',pics:['star']},
 rounds:[R.q('In the story, a *crater* is…',['a round hole','a mountain','a river'],'a round hole'),R.q('*Minuscule* means…',['very small','very fast','very bright'],'very small'),
  R.q('*Ecstatic* means…',['very happy','angry','tired'],'very happy'),R.q('“The *arid* desert had no rain.” *Arid* means…',['dry','wet','cold'],'dry'),
  R.q('“The *famished* boy ate three sandwiches.” *Famished* means…',['very hungry','very tired','very small'],'very hungry'),R.q('Where is the Manicouagan crater?',['Quebec','Alberta','Nova Scotia'],'Quebec'),
  R.q('What are shooting stars?',['tiny meteorites burning up','stars falling','planes'],'tiny meteorites burning up'),R.q('A mini dictionary at the back of a book is a…',['glossary','table of contents','title'],'glossary'),R.tf('Context clues are hints in the words around a new word.',true)],
 tries:[['Write a sentence with a context clue for “enormous”.','e.g. The *enormous* whale was as long as a bus.'],['Find 2 meanings of “bright”.','shiny / smart']]});

/* 7 ─ Figurative language */
U({id:'e07',title:'Similes, metaphors and personification',strand:'Word Study',codes:['C3.1','C1.5','D2.3'],
 guide:{goal:'Identify and use figurative language: similes (like/as), metaphors, personification, idioms and onomatopoeia, and explain how they create pictures in the reader’s mind.',words:'figurative language, simile, metaphor, personification, idiom, onomatopoeia',ask:['What word does a simile use?','“The rain whispered.” What kind of language is that?','What does “raining cats and dogs” mean?'],home:'Describe your pet or toy with a simile and a metaphor.'},
 watch:['Paint pictures with words!','The rainforest is like a giant green umbrella (simile). The canopy is a roof (metaphor). The trees whisper (personification).'],
 fig:'A rainforest full of lively words.',
 page:{story:{title:'Rainforest Morning',text:'In the *Amazon rainforest*, the morning began with a *roar*. *Howler monkeys* called *as loud as a fire truck*. The *canopy* was *a green roof* over the world. Raindrops *danced* on the leaves, and the river *whispered* secrets to the frogs. A *toucan* flew past, its beak *like a slice of rainbow*. *Drip, drop, splash!* Then the clouds opened and it *rained cats and dogs*. "This place is *a living library*," said the guide. "Every plant and animal is a book we are still learning to read."',pics:['monkey','toucan','frog','tree'],
   acts:[[null,'jungle',['monkey','tree'],'ROAR!'],['canopy','jungle',['tree:big','bird'],'A green roof!'],['toucan','jungle',['toucan','rainbow'],'A slice of rainbow!'],['rained cats and dogs','jungle',['umbrella','cloud'],'Splash!']]},
  boxes:[{title:'Figurative language',lines:['*simile*: compares with *like* or *as*: as loud as a fire truck','*metaphor*: says one thing *is* another: the canopy was a green roof','*personification*: gives human actions to things: the river whispered','*onomatopoeia*: sound words: drip, roar, splash','*idiom*: a saying: raining cats and dogs (= very hard)']}],
  cards:[{q:'“Her smile was the sun.” Simile or metaphor?',a:'*metaphor*'},{q:'What does “break a leg” mean?',a:'*good luck*'}],
  words:[['simile','a comparison using like or as'],['personification','giving human qualities to non-human things']]},
 steps:[
  {say:'Read the story',speech:'Howler monkeys called as loud as a fire truck. The canopy was a green roof. Raindrops danced and the river whispered. Then it rained cats and dogs.',set:S.row(['monkey','toucan','frog','tree'])},
  {say:'Similes',speech:'A simile compares two things using like or as. The toucan’s beak was like a slice of rainbow.',set:S.word('The beak was','a slice of rainbow.',['like','is','was'],'like',{pic:'toucan'})},
  {say:'Metaphors',speech:'A metaphor says one thing is another, without like or as. The canopy was a green roof.',set:S.word('The canopy','a green roof.',['was','like','as'],'was',{pic:'tree'})},
  {say:'Personification',speech:'Personification gives human actions to things. Raindrops danced. The river whispered. Rivers cannot really whisper, but it paints a picture!',set:S.row(['droplet','river'],{labels:['danced','whispered']}),
   cues:[['Raindrops danced','droplet','personification'],['The river whispered','river','personification']]}],
 more:{title:'Did you know?',text:'The *Amazon* produces about *20%* of the oxygen made by land plants, which is why people call it “*the lungs of the Earth*”: a metaphor!',pics:['tree','leaf']},
 rounds:[R.q('“As loud as a fire truck” is a…',['simile','metaphor','idiom'],'simile'),R.q('“The canopy was a green roof” is a…',['metaphor','simile','sound word'],'metaphor'),
  R.q('“The river whispered” is…',['personification','a simile','a fact'],'personification'),R.q('*Raining cats and dogs* means…',['raining very hard','animals falling','a light drizzle'],'raining very hard'),
  R.q('Which is onomatopoeia?',['splash','beautiful','quickly'],'splash'),R.q('What was the toucan’s beak like?',['a slice of rainbow','a banana','a sword'],'a slice of rainbow'),
  R.q('Which is a simile?',['He ran like the wind.','He is a rocket.','He ran fast.'],'He ran like the wind.'),R.q('Which animal called as loud as a fire truck?',['howler monkeys','frogs','toucans'],'howler monkeys'),R.tf('Metaphors always use “like” or “as”.',false)],
 tries:[['Write a simile about snow.','e.g. The snow was as soft as a pillow.'],['Personify the wind in one sentence.','e.g. The wind howled at my window.']]});
})();
