/* The Interactive Classroom: Grade 4 English — Grammar: nouns, pronouns, verb tenses, perfect tenses, sentence kinds, adjectives and adverbs, prepositions */
(function(){
"use strict";
const P=window.PM;if(!P||!P.unit)return;const U=P.unit,R=P.R,S=P.S;

/* 8 ─ Nouns */
U({id:'e08',title:'Nouns: common, proper, collective, plural',strand:'Grammar',codes:['B3.2','B3.3'],
 guide:{goal:'Identify common, proper and collective nouns, capitalize proper nouns, and spell regular and irregular plurals.',words:'noun, common noun, proper noun, collective noun, plural, irregular',ask:['Why does “Toronto” need a capital letter?','What is a group of geese called?','What is the plural of child?'],home:'List 5 proper nouns in your neighbourhood: streets, stores, parks.'},
 watch:['People, places, things and ideas!','Common: player. Proper: Tim Horton. Collective: a team.'],
 fig:'A hockey team with nouns labelled.',
 page:{story:{title:'Tim Horton on the Ice',text:'Before there were doughnut shops, *Tim Horton* was a hockey *player*. Born in *Cochrane, Ontario*, in *1930*, he played defence for the *Toronto Maple Leafs* and helped his *team* win *four* Stanley Cups. He was known for his great *strength* and *kindness*. In *1964*, he opened a small coffee *shop* in *Hamilton*. Today there are thousands of *cafés* with his name, serving *coffees*, *doughnuts* and *loaves* of bread to *people* across *Canada*. A *crowd* of fans still remembers him.',pics:['hockey','donut','man','coffee'],
   acts:[[null,'winter',['hockey','skates','man'],'Tim Horton on defence!'],['Stanley Cups','winter',['trophy','hockey'],'Four Stanley Cups!'],['coffee shop','town',['coffee','donut'],'Hamilton, 1964!'],['crowd','city',['family','coffee'],'Across Canada!']]},
  boxes:[{title:'Kinds of nouns',lines:['*common*: player, team, city','*proper*: Tim Horton, Hamilton, Canada (capital letter!)','*collective*: a *team* of players, a *crowd* of fans, a *flock* of geese','*abstract*: strength, kindness (ideas)']},
   {title:'Plurals',lines:['add *s*: shop → shops','add *es*: box → boxes','*y → ies*: city → cities','*f → ves*: loaf → loaves','irregular: child → *children*, person → *people*, mouse → *mice*']}],
  cards:[{q:'Plural of “knife”?',a:'*knives*'},{q:'Is “Ottawa” common or proper?',a:'*proper*'}],
  words:[['proper noun','the name of a specific person, place or thing; it starts with a capital'],['collective noun','a word for a group, like team or herd']]},
 steps:[
  {say:'Read the story',speech:'Tim Horton was a hockey player from Cochrane, Ontario. He helped his team win four Stanley Cups and opened a coffee shop in Hamilton.',set:S.row(['hockey','donut','man','coffee'])},
  {say:'Common or proper',speech:'Player is a common noun. Tim Horton is a proper noun, so it starts with a capital letter. City is common. Hamilton is proper.',set:S.sort(['common','proper'],[['hockey',0],['man',1],['coffee',0],['maple leaf',1]]),
   cues:[['common noun','hockey','player'],['proper noun','man','Tim Horton']]},
  {say:'Collective nouns',speech:'A team of players. A crowd of fans. A flock of geese. A collective noun names a whole group.',set:S.row(['family','goose','cow'],{labels:['a crowd','a flock','a herd']}),
   cues:[['A crowd','family','crowd'],['A flock','goose','flock'],['herd','cow','herd']]},
  {say:'Tricky plurals',speech:'One loaf, two loaves. One child, two children. One person, many people. Some plurals don’t follow the rules.',set:S.word('He served','of bread.',['loaves','loafs','loafes'],'loaves',{pic:'bread'})}],
 more:{title:'Did you know?',text:'The first Tim Hortons doughnut shop sold a coffee and a doughnut for just *15 cents*!',pics:['donut','coin']},
 rounds:[R.q('Which is a proper noun?',['Hamilton','city','shop'],'Hamilton'),R.q('Which is a collective noun?',['team','player','puck'],'team'),
  R.word('Which word fits?','The','played in the park.',['children','childs','childrens'],'children'),R.word('Which word fits?','We saw three','in the barn.',['mice','mouses','mices'],'mice'),
  R.q('Plural of *city*:',['cities','citys','cityes'],'cities'),R.q('Where was Tim Horton born?',['Cochrane, Ontario','Halifax','Calgary'],'Cochrane, Ontario'),
  R.q('Which is an abstract noun (an idea)?',['kindness','doughnut','arena'],'kindness'),R.q('A group of geese is a…',['flock','pack','school'],'flock'),R.tf('Proper nouns begin with a capital letter.',true)],
 tries:[['Write the plurals: wolf, baby, tooth.','*wolves, babies, teeth*'],['Name 3 collective nouns.','herd, pack, school (of fish)']]});

/* 9 ─ Pronouns, including relative pronouns */
U({id:'e09',title:'Pronouns, including who, which and that',strand:'Grammar',codes:['B3.2'],
 guide:{goal:'Use subject, object and possessive pronouns correctly, use possessive pronouns as adjectives (her boat), and use relative pronouns (who, whom, whose, which, that) to join ideas.',words:'pronoun, subject, object, possessive, relative pronoun, antecedent',ask:['Do we use who for people or things?','“Her boat” — what job is “her” doing?','Is it “Me and Ella sailed” or “Ella and I sailed”?'],home:'Join two sentences with “who”: My aunt is a pilot. She flies to Iqaluit.'},
 watch:['Pronouns stand in for nouns!','Ellen MacArthur, who sailed alone, broke a record. Who joins the ideas.'],
 fig:'A sailboat on the ocean with pronoun labels.',
 page:{story:{title:'Alone Around the World',text:'*Ellen MacArthur* is a sailor *who* loved boats from a young age. *She* saved *her* lunch money for years to buy *her* first small boat. In *2005*, *she* sailed alone around the whole world in *71 days*, a world record! *Her* boat, *which* was called *B&Q*, was *23* metres long. *She* slept in short naps of *20 minutes* so *she* could watch the sea. People *who* followed *her* trip online sent messages. "The ocean is *mine* for a while," *she* wrote, "but it belongs to all of *us*."',pics:['sailboat','girl','ocean','computer'],
   acts:[[null,'beach',['sailboat','girl'],'Saving for a boat!'],['sailed alone','ocean',['sailboat','water wave'],'71 days!'],['naps','ocean',['clock','sailboat'],'20-minute naps!'],['online','home',['computer','family'],'Go, Ellen!']]},
  boxes:[{title:'Pronouns',lines:['*subject*: I, you, he, she, it, we, they','*object*: me, you, him, her, it, us, them','*possessive*: mine, yours, his, hers, ours, theirs','*as adjectives*: my, your, her, our, their + noun (*her* boat)']},
   {title:'Relative pronouns',lines:['*who*: people → a sailor *who* loved boats','*which*: things → a boat, *which* was 23 m long','*that*: people or things → the record *that* she broke','*whose*: ownership → the girl *whose* boat won']}],
  cards:[{q:'___ and I went sailing. (Me / Ella)',a:'*Ella* and I'},{q:'The dog ___ barked is mine. (who / that)',a:'*that*'}],
  words:[['relative pronoun','who, which, that, whose: joins a describing part to a noun'],['possessive pronoun','shows who owns something: mine, hers, theirs']]},
 steps:[
  {say:'Read the story',speech:'Ellen MacArthur is a sailor who loved boats. She sailed alone around the world in seventy-one days. Her boat, which was called B and Q, was twenty-three metres long.',set:S.row(['sailboat','girl','ocean','computer'])},
  {say:'Who for people',speech:'Use who for people. Ellen is a sailor who loved boats. Who joins two ideas into one sentence.',set:S.word('Ellen is a sailor','loved boats.',['who','which','whose'],'who',{pic:'girl'})},
  {say:'Which and that for things',speech:'Use which or that for things. Her boat, which was twenty-three metres long, was fast.',set:S.word('Her boat,','was long, was fast.',['which','who','whom'],'which',{pic:'sailboat'})},
  {say:'Pronouns as adjectives',speech:'My, your, her and their come before a noun and describe whose it is: her boat, their messages.',set:S.word('She saved','lunch money.',['her','hers','she'],'her',{pic:'coin'})}],
 more:{title:'Did you know?',text:'Ellen MacArthur later started a foundation that takes young people who have been sick with cancer on *sailing trips* to rebuild their confidence.',pics:['sailboat','heart']},
 rounds:[R.word('Which word fits?','The woman','sailed is Ellen.',['who','which','what'],'who'),R.word('Which word fits?','The boat,','was blue, was fast.',['which','who','whom'],'which'),
  R.word('Which word fits?','Ella and','went to the beach.',['I','me','myself'],'I'),R.word('Which word fits?','Give the map to','.',['me','I','mine'],'me'),
  R.q('How long did Ellen’s trip take?',['71 days','7 days','1 year'],'71 days'),R.q('In “her boat”, *her* is…',['a pronoun used as an adjective','a verb','a proper noun'],'a pronoun used as an adjective'),
  R.q('Which relative pronoun shows ownership?',['whose','which','that'],'whose'),R.q('How long were Ellen’s naps?',['20 minutes','2 hours','5 minutes'],'20 minutes'),R.tf('We use “who” for things and “which” for people.',false)],
 tries:[['Join: I have a cat. It loves tuna.','I have a cat *that/which* loves tuna.'],['Write a sentence with “whose”.','e.g. The boy *whose* bike is red won.']]});

/* 10 ─ Verb tenses */
U({id:'e10',title:'Verb tenses: past, present, future',strand:'Grammar',codes:['B3.2'],
 guide:{goal:'Use verbs in the past, present and future tense consistently, including irregular past-tense verbs (ride → rode, take → took).',words:'verb, tense, past, present, future, irregular verb',ask:['What is the past tense of ride?','How do you show the future?','Why should a story stay in one tense?'],home:'Tell about your weekend: yesterday (past), today (present), tomorrow (future).'},
 watch:['When did it happen?','Yesterday we rode. Today we ride. Tomorrow we will ride.'],
 fig:'A train crossing Canada: past, present, future stations.',
 page:{story:{title:'The Longest Train Ride',text:'Last summer, Kenji and his grandpa *rode* *The Canadian*, a train that *crosses* Canada from *Toronto* to *Vancouver*. The trip *took* *four* days! They *saw* lakes in the Shield, wheat fields on the prairies and snowy peaks in the Rockies. They *ate* in a dining car and *slept* in tiny bunks. "Now I *write* in my travel journal every night," Kenji *says*. "Next year, we *will ride* the train to *Churchill* to see polar bears!"',pics:['train','boy','grandpa','mountain'],
   acts:[[null,'city',['train','boy','grandpa'],'All aboard!'],['wheat fields','prairie',['train','grain elevator'],'Wheat everywhere!'],['Rockies','mountain',['train','snowy mountain'],'Snowy peaks!'],['polar bears','arctic',['polar bear','train'],'Next year!']]},
  boxes:[{title:'Three tenses',lines:['*past*: rode, saw, ate (already happened)','*present*: ride, see, eat (happening now)','*future*: will ride, will see (will happen)']},
   {title:'Irregular past tense',lines:['ride → *rode* · take → *took*','see → *saw* · eat → *ate*','sleep → *slept* · write → *wrote*','go → *went* · bring → *brought*']}],
  cards:[{q:'Past tense of “bring”?',a:'*brought*'},{q:'Future tense: We ___ visit Churchill.',a:'*will*'}],
  words:[['tense','the form of a verb that shows when something happens'],['irregular verb','a verb that does not add -ed in the past tense']]},
 steps:[
  {say:'Read the story',speech:'Last summer Kenji and his grandpa rode The Canadian. The trip took four days. Now Kenji writes in his journal. Next year they will ride to Churchill.',set:S.row(['train','boy','grandpa','mountain'])},
  {say:'Past tense',speech:'Things that already happened use the past tense. They rode, they saw, they ate. These are irregular: no ed!',set:S.word('Last summer they','the train.',['rode','ride','will ride'],'rode',{pic:'train'})},
  {say:'Present tense',speech:'Things happening now use the present tense. Kenji writes in his journal every night.',set:S.word('Now Kenji','in his journal.',['writes','wrote','will write'],'writes',{pic:'book'})},
  {say:'Future tense',speech:'Things that will happen use will plus a verb. Next year they will ride to Churchill.',set:S.word('Next year they','ride to Churchill.',['will','did','was'],'will',{pic:'polar bear'})}],
 more:{title:'Did you know?',text:'*The Canadian* travels about *4 466 kilometres*. The *Trans-Siberian Railway* in Russia is even longer: *9 289 kilometres*, about *7 days*!',pics:['train','map']},
 rounds:[R.word('Which word fits?','Yesterday I','a great book.',['read','will read','reading'],'read'),R.word('Which word fits?','Last week we','to the zoo.',['went','go','will go'],'went'),
  R.word('Which word fits?','Tomorrow she','bake a cake.',['will','did','was'],'will'),R.q('Past tense of *take*:',['took','taked','taken'],'took'),
  R.q('Past tense of *sleep*:',['slept','sleeped','sleept'],'slept'),R.q('How long did the trip take?',['four days','four hours','four weeks'],'four days'),
  R.q('Where will they ride next year?',['Churchill','Halifax','Paris'],'Churchill'),R.q('“She *eats* lunch” is…',['present tense','past tense','future tense'],'present tense'),R.tf('“Ride” becomes “rided” in the past tense.',false)],
 tries:[['Change to past: I swim, I sing, I catch.','*swam, sang, caught*'],['Write 3 sentences about a trip: past, present, future.','e.g. I went… I am… I will…']]});

/* 11 ─ Perfect tenses */
U({id:'e11',title:'Perfect tenses: has, have, had',strand:'Grammar',codes:['B3.2'],
 guide:{goal:'Form and use the present perfect (has/have + past participle) and past perfect (had + past participle) to show actions that are finished or happened before another action.',words:'perfect tense, helping verb, past participle, has, have, had',ask:['What helping verbs make the perfect tense?','What is the past participle of see?','When do you use had?'],home:'Say 3 things you have done this year: I have learned…, I have visited…'},
 watch:['Has, have, had + a verb!','People have walked on the Great Wall for centuries. By 1600, workers had built thousands of kilometres.'],
 fig:'The Great Wall stretching over hills.',
 page:{story:{title:'Walking the Great Wall',text:'"I *have dreamed* about this for years!" said Aunt Mei as they climbed the *Great Wall of China*. Millions of people *have walked* on it. Workers *had built* the oldest parts more than *2 000* years before. Ruby counted the steps. "I *have climbed* *500* steps already!" By the time they reached the top tower, the sun *had set*. "*Has* anyone ever walked the whole wall?" Ruby asked. "A few people *have done* it," said Aunt Mei. "It takes many months!"',pics:['great wall','girl','woman','sun'],
   acts:[[null,'mountain',['great wall','woman','girl'],'I have dreamed of this!'],['500 steps','mountain',['great wall:big','girl'],'500 steps!'],['sun had set','night',['great wall','full moon'],'The sun had set.']]},
  boxes:[{title:'Present perfect',lines:['*has* / *have* + past participle','I *have climbed*, she *has seen*','an action that happened at some time up to now']},
   {title:'Past perfect',lines:['*had* + past participle','the sun *had set* before they reached the top','an action *before* another past action'],ex:[['great wall','see → *seen*'],['book','write → *written*'],['ball','go → *gone*']]}],
  cards:[{q:'She has ___ (eat) breakfast.',a:'*eaten*'},{q:'By noon, we ___ finished. (have/had)',a:'*had*'}],
  words:[['perfect tense','a verb tense made with has, have or had plus a past participle'],['past participle','the verb form used after has/have/had: seen, built, gone']]},
 steps:[
  {say:'Read the story',speech:'Aunt Mei had dreamed of the Great Wall. Millions of people have walked on it. Ruby had climbed five hundred steps, and by the top, the sun had set.',set:S.row(['great wall','girl','woman','sun'])},
  {say:'Have and has',speech:'Use have or has with a past participle for actions up to now. I have climbed. She has seen.',set:S.word('I','climbed 500 steps!',['have','has','had been'],'have',{pic:'great wall'})},
  {say:'Had',speech:'Use had for something that happened before another past action. When they reached the top, the sun had set.',set:S.word('By then, the sun','set.',['had','have','has'],'had',{pic:'sun'})},
  {say:'Past participles',speech:'Some past participles are irregular. See becomes seen. Go becomes gone. Write becomes written.',set:S.word('She has','the wall.',['seen','saw','see'],'seen',{pic:'woman'})}],
 more:{title:'Did you know?',text:'Parts of the Great Wall were held together with mortar made from *sticky rice*! It made the wall very strong.',pics:['rice','great wall']},
 rounds:[R.word('Which word fits?','She has','her homework.',['finished','finish','finishing'],'finished'),R.word('Which word fits?','We','visited Ottawa twice.',['have','has','is'],'have'),
  R.word('Which word fits?','He has','his lunch.',['eaten','ate','eat'],'eaten'),R.word('Which word fits?','The movie','started before we arrived.',['had','have','has'],'had'),
  R.q('Past participle of *go*:',['gone','went','goed'],'gone'),R.q('How many steps had Ruby climbed?',['500','50','5 000'],'500'),
  R.q('What had happened when they reached the top?',['the sun had set','it had snowed','the wall had fallen'],'the sun had set'),R.q('Perfect tenses use…',['has, have or had','will','-ing'],'has, have or had'),R.tf('“She has wrote” is correct.',false)],
 tries:[['Write 2 things you have done today.','e.g. I *have read*… I *have eaten*…'],['Finish: Before I woke up, my dad had…','e.g. *had made* pancakes']]});

/* 12 ─ Sentence kinds: interrogative and imperative */
U({id:'e12',title:'Four kinds of sentences',strand:'Grammar',codes:['B3.1','B3.2','B3.3'],
 guide:{goal:'Write and punctuate statements (declarative), questions (interrogative), commands (imperative) and exclamations, and use imperative verbs in instructions.',words:'declarative, interrogative, imperative, exclamatory, command',ask:['What punctuation ends a question?','What is the subject of an imperative sentence?','Why do instructions use imperative verbs?'],home:'Write instructions for making a sandwich using imperative verbs.'},
 watch:['Tell, ask, command, exclaim!','Fill the pot. (command) Does basil need sun? (question) Look, it sprouted! (exclamation)'],
 fig:'A window box of herbs with instruction cards.',
 page:{story:{title:'Our Window Box Herb Garden',text:'Ms. Patel’s class planted a *window box herb garden*. She wrote *instructions* on the board: "*Fill* the box with soil. *Plant* the basil seeds 1 cm deep. *Water* them gently. *Place* the box in a sunny window." "Why do instructions start with verbs?" asked Omar. "They are *commands*: *imperative* sentences," said Ms. Patel. "Can we eat the herbs?" asked Zoe. That is a *question*: an *interrogative* sentence. Two weeks later, everyone shouted, "Look, the basil sprouted!" An *exclamation*!',pics:['plant','seedling','teacher','girl'],
   acts:[[null,'classroom',['seedling','teacher'],'Let’s plant herbs!'],['Fill','classroom',['plant','shovel'],'Fill, plant, water, place!'],['Can we eat','kitchen',['girl','plant'],'Can we eat them?'],['sprouted','classroom',['seedling:big','boy','girl'],'It sprouted!']]},
  boxes:[{title:'Four kinds of sentences',lines:['*declarative* (tells): Basil needs sun.','*interrogative* (asks): Can we eat the herbs?','*imperative* (commands): Water the seeds.','*exclamatory* (strong feeling): Look, it sprouted!']},
   {title:'Imperative verbs',text:'Commands start with a verb. The subject “you” is hidden.',lines:['(You) *Fill* the box.','(You) *Place* it in the sun.']}],
  cards:[{q:'“Close the window.” What kind?',a:'*imperative*'},{q:'What ends an exclamation?',a:'an *exclamation mark* !'}],
  words:[['interrogative','a sentence that asks a question'],['imperative','a sentence that gives a command or instruction']]},
 steps:[
  {say:'Read the story',speech:'The instructions said fill, plant, water and place. Those are commands. Zoe asked a question. Everyone shouted an exclamation when the basil sprouted.',set:S.row(['plant','seedling','teacher','girl'])},
  {say:'Commands',speech:'Imperative sentences give commands. They start with a verb: fill, plant, water. The subject, you, is hidden.',set:S.word('','the seeds gently.',['Water','Watered','Watering'],'Water',{pic:'droplet'})},
  {say:'Questions',speech:'Interrogative sentences ask something and end with a question mark. Can we eat the herbs?',set:S.word('Can we eat the herbs','',['?','.','!'],'?',{pic:'plant'})},
  {say:'Exclamations',speech:'Exclamations show strong feeling and end with an exclamation mark. Look, the basil sprouted!',set:S.word('Look, it sprouted','',['!','?',','],'!',{pic:'seedling'})}],
 more:{title:'Did you know?',text:'Basil, mint and chives grow well indoors in a sunny window. Mint grows so fast it can take over a whole garden!',pics:['plant']},
 rounds:[R.q('“Water the seeds.” What kind of sentence?',['imperative','interrogative','declarative'],'imperative'),R.q('“Does basil need sun?” What kind?',['interrogative','imperative','exclamatory'],'interrogative'),
  R.q('“Basil smells nice.” What kind?',['declarative','imperative','interrogative'],'declarative'),R.q('“Wow, it grew so fast!” What kind?',['exclamatory','declarative','imperative'],'exclamatory'),
  R.word('Which ends the sentence?','Where is the watering can','',['?','.','!'],'?'),R.q('What is the hidden subject of a command?',['you','I','they'],'you'),
  R.q('What herb did the class plant?',['basil','carrots','tulips'],'basil'),R.q('Instructions usually start with…',['a verb','a question','a name'],'a verb'),R.tf('Questions end with a period.',false)],
 tries:[['Write 3 imperative steps for brushing teeth.','*Wet* the brush. *Add* toothpaste. *Brush* for 2 minutes.'],['Write one of each kind of sentence about recess.','tell, ask, command, exclaim']]});

/* 13 ─ Adjectives and adverbs */
U({id:'e13',title:'Adjectives and adverbs',strand:'Grammar',codes:['B3.2','B3.3','D2.3'],
 guide:{goal:'Use adjectives (including comparative -er and superlative -est, and proper adjectives with capitals) to describe nouns, and adverbs to tell how, when or where actions happen.',words:'adjective, adverb, comparative, superlative, proper adjective',ask:['Is “Canadian” a proper adjective?','Which is correct: more taller or taller?','What question does “quickly” answer?'],home:'Describe your breakfast with 3 adjectives and 1 adverb.'},
 watch:['Describe the noun, describe the verb!','The tall girl (adjective) ran quickly (adverb).'],
 fig:'Kids from many countries with describing words.',
 page:{story:{title:'Third Culture Kids',text:'*Aisha* was born in *Kenya* to *Pakistani* parents, then moved to *Japan*, and now lives in *Calgary*. She is a *third culture kid*: someone who grows up in a culture different from their parents’. At her *new* school, she spoke *softly* at first. She shared *spicy* *Pakistani* samosas, *sticky* *Japanese* rice balls and *sweet* *Kenyan* mandazi. "These are the *best* snacks *ever*!" said her *Canadian* friend Liam. Aisha laughed *happily*. "My life is *more colourful* than a rainbow!"',pics:['girl','globe','boy','rice'],
   acts:[[null,'city',['globe','girl'],'Kenya, Japan, Canada!'],['softly','classroom',['girl','book'],'Hello…'],['samosas','kitchen',['dumpling','rice','girl'],'Spicy, sticky, sweet!'],['best snacks','classroom',['boy','girl'],'The best ever!']]},
  boxes:[{title:'Adjectives describe nouns',lines:['*spicy* samosas, *new* school','comparative: sweet → *sweeter*; colourful → *more colourful*','superlative: sweet → *sweetest*; good → *best*','*proper adjectives* need capitals: *Canadian*, *Japanese*, *Pakistani*']},
   {title:'Adverbs describe verbs',lines:['*how*: softly, happily, quickly','*when*: soon, yesterday, now','*where*: here, outside, everywhere']}],
  cards:[{q:'Comparative of “big”?',a:'*bigger*'},{q:'She sang ___ (beautiful/beautifully).',a:'*beautifully*'}],
  words:[['proper adjective','an adjective made from a proper noun, like Canadian; it needs a capital'],['adverb','a word that tells how, when or where something happens']]},
 steps:[
  {say:'Read the story',speech:'Aisha moved from Kenya to Japan to Calgary. She spoke softly, shared spicy Pakistani samosas, and laughed happily. Her life is more colourful than a rainbow.',set:S.row(['girl','globe','boy','rice'])},
  {say:'Proper adjectives',speech:'Japanese, Pakistani and Canadian come from names of countries. They are proper adjectives, so they need capital letters.',set:S.word('She shared sticky','rice balls.',['Japanese','japanese','Japan'],'Japanese',{pic:'rice'})},
  {say:'Compare with adjectives',speech:'Sweet, sweeter, sweetest. Good, better, best. Longer adjectives use more and most: more colourful.',set:S.word('These are the','snacks ever!',['best','goodest','better'],'best',{pic:'cookie'})},
  {say:'Adverbs',speech:'Adverbs tell how. She spoke softly. She laughed happily. Many adverbs end in l y.',set:S.word('Aisha laughed','.',['happily','happy','happiness'],'happily',{pic:'girl'})}],
 more:{title:'Did you know?',text:'More than *1 in 5* people in Canada were born in another country. Canadian classrooms are full of stories from all over the world!',pics:['maple leaf','globe']},
 rounds:[R.word('Which word fits?','My dog is','than your cat.',['bigger','biggest','more big'],'bigger'),R.word('Which word fits?','This is the','day of the year!',['happiest','happier','most happy'],'happiest'),
  R.word('Which word fits?','The turtle walked','.',['slowly','slow','slowness'],'slowly'),R.q('Which needs a capital letter?',['canadian','happy','tall'],'canadian'),
  R.q('An adverb tells…',['how, when or where','who','what colour'],'how, when or where'),R.q('Where does Aisha live now?',['Calgary','Tokyo','Nairobi'],'Calgary'),
  R.q('What is a third culture kid?',['someone raised in a culture different from their parents’','a kid in grade 3','a kid with 3 pets'],'someone raised in a culture different from their parents’'),R.q('Superlative of *good*:',['best','goodest','better'],'best'),R.tf('“More taller” is correct.',false)],
 tries:[['Write a sentence with a proper adjective.','e.g. I love *Italian* pizza.'],['Add an adverb: The wind blew.','e.g. The wind blew *fiercely*.']]});

/* 14 ─ Prepositions and prepositional phrases */
U({id:'e14',title:'Prepositions and prepositional phrases',strand:'Grammar',codes:['B3.1','B3.2'],
 guide:{goal:'Use prepositions (in, on, under, beneath, across, through, beyond) and prepositional phrases to tell where, when and how, and to add detail to sentences.',words:'preposition, prepositional phrase, location, time',ask:['What is a prepositional phrase?','Which words in “under the sea” show location?','How can a prepositional phrase add detail?'],home:'Hide a toy and give clues with prepositions: under the bed, behind the door.'},
 watch:['Where? When? How?','The city sank beneath the waves. Beneath the waves is a prepositional phrase.'],
 fig:'An underwater city with location words.',
 page:{story:{title:'The Lost City of Atlantis',text:'More than *2 000* years ago, a Greek writer named *Plato* told a legend about *Atlantis*, a rich city *on an island* *beyond* the sea. Its people built temples *of gold* and sailed *across* the ocean. But one day, *during* a terrible storm, the island sank *beneath* the waves. Divers have searched *under the sea* *for centuries*. Some say Atlantis is *near* Greece; others say it is *in* the Atlantic. Most scientists think it was just a story, but the mystery lives *in* our imaginations.',pics:['temple','island','ocean','fish'],
   acts:[[null,'beach',['island','temple'],'A city on an island!'],['across','ocean',['sailboat','water wave'],'Across the ocean!'],['beneath the waves','underwater',['temple','fish'],'Sinking…'],['Divers','underwater',['fish','octopus'],'Still searching!']]},
  boxes:[{title:'Prepositions',lines:['*place*: in, on, under, beneath, beside, between, near, beyond','*direction*: across, through, toward, into','*time*: before, after, during, since']},
   {title:'Prepositional phrases',text:'A preposition + a noun (and its describing words).',lines:['*beneath* + *the waves*','*across* + *the ocean*','*during* + *a terrible storm*']}],
  cards:[{q:'Find the phrase: The cat slept under the warm blanket.',a:'*under the warm blanket*'},{q:'Name a preposition of time.',a:'*before*, after, during'}],
  words:[['preposition','a word that shows how a noun relates to another word: in, on, under, during'],['prepositional phrase','a preposition plus a noun and its describing words']]},
 steps:[
  {say:'Read the story',speech:'Atlantis was a city on an island beyond the sea. During a terrible storm, it sank beneath the waves. Divers have searched under the sea for centuries.',set:S.row(['temple','island','ocean','fish'])},
  {say:'Where?',speech:'Prepositions show location. On an island. Beneath the waves. Under the sea.',set:S.word('The island sank','the waves.',['beneath','during','after'],'beneath',{pic:'water wave'})},
  {say:'When?',speech:'Prepositions also show time. During a terrible storm. For centuries. Before and after.',set:S.word('It sank','a terrible storm.',['during','under','across'],'during',{pic:'cloud'})},
  {say:'Add detail',speech:'Prepositional phrases add detail. Sailors sailed. Sailors sailed across the ocean in golden ships. Much better!',set:S.word('They sailed','the ocean.',['across','beneath','during'],'across',{pic:'sailboat'})}],
 more:{title:'Did you know?',text:'Real sunken cities exist! *Pavlopetri* in Greece is about *5 000 years old* and lies just *4 metres* under the water. You can snorkel over its streets!',pics:['fish','temple']},
 rounds:[R.word('Which word fits?','The cat hid','the bed.',['under','during','after'],'under'),R.word('Which word fits?','We ate popcorn','the movie.',['during','beneath','across'],'during'),
  R.word('Which word fits?','The bridge goes','the river.',['across','during','since'],'across'),R.q('Which is a prepositional phrase?',['beneath the waves','the city sank','very old'],'beneath the waves'),
  R.q('Who first told the legend of Atlantis?',['Plato','Tim Horton','Ellen MacArthur'],'Plato'),R.q('What happened to Atlantis in the legend?',['it sank beneath the waves','it burned','it flew away'],'it sank beneath the waves'),
  R.q('Which preposition shows time?',['after','under','beside'],'after'),R.q('A prepositional phrase starts with…',['a preposition','a verb','an adverb'],'a preposition'),R.tf('“Beyond the sea” is a prepositional phrase.',true)],
 tries:[['Write 3 phrases telling where your backpack is.','e.g. *beside the door*, *under my desk*'],['Add detail: The bird flew.','The bird flew *over the lake* *at sunset*.']]});
})();
