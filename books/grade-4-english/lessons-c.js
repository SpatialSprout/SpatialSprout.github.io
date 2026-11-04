/* The Interactive Classroom: Grade 4 English — Grammar and conventions (compound and complex sentences, fragments and run-ons, capitals and commas, quotation marks and apostrophes) and Reading (main idea, cause and effect, inferences) */
(function(){
"use strict";
const P=window.PM;if(!P||!P.unit)return;const U=P.unit,R=P.R,S=P.S;

/* 15 ─ Compound and complex sentences */
U({id:'e15',title:'Compound and complex sentences',strand:'Grammar',codes:['B3.1'],
 guide:{goal:'Join independent clauses with coordinating conjunctions (and, but, or, so) to make compound sentences, and add dependent clauses with words like because, when, although and if to make complex sentences.',words:'clause, independent, dependent, conjunction, compound, complex',ask:['What does FANBOYS stand for?','Can “because the tide came in” stand alone?','Where does the comma go in a compound sentence?'],home:'Join: I wanted to swim. The water was cold. (Use but.)'},
 watch:['Join ideas smoothly!','The tide went out, so the boats sat on the mud. (compound) Because the tide is so high, fishers tie long ropes. (complex)'],
 fig:'Boats on a beach at low tide.',
 page:{story:{title:'The Highest Tides on Earth',text:'The *Bay of Fundy* has the highest tides in the world. Twice a day, the ocean rushes in, *and* the water rises up to *16* metres! Then the tide goes out, *so* boats sit on the muddy sea floor. Visitors can walk on the ocean floor at low tide, *but* they must leave before the water returns. *Because the tide comes in so fast*, park rangers post the times. *When the tide is low*, you can see the famous *Hopewell Rocks*, shaped like giant *flowerpots*. *Although the rocks look strong*, the tides slowly wear them away.',pics:['water wave','rock','sailboat','girl'],
   acts:[[null,'beach',['water wave','sailboat'],'Here comes the tide!'],['low tide','beach',['sailboat','rock'],'Boats on the mud!'],['Hopewell Rocks','beach',['rock:big','girl'],'Giant flowerpots!']]},
  boxes:[{title:'Compound sentences',text:'Two *independent clauses* (complete thoughts) + a comma + a conjunction.',lines:['FANBOYS: for, *and*, nor, *but*, *or*, yet, *so*','The tide went out, *so* boats sat on the mud.']},
   {title:'Complex sentences',text:'An independent clause + a *dependent clause* (cannot stand alone).',lines:['*because*, *when*, *although*, *if*, *after*, *since*','*Because the tide comes in fast*, rangers post the times.']}],
  cards:[{q:'Join with “but”: I like tides. I fear mud.',a:'I like tides, *but* I fear mud.'},{q:'Is “when the tide is low” a sentence?',a:'*No*: it is a dependent clause.'}],
  words:[['independent clause','a group of words with a subject and verb that makes a complete thought'],['dependent clause','a group of words with a subject and verb that cannot stand alone']]},
 steps:[
  {say:'Read the story',speech:'The tide rushes in, and the water rises sixteen metres. The tide goes out, so boats sit on the mud. Because the tide comes in so fast, rangers post the times.',set:S.row(['water wave','rock','sailboat','girl'])},
  {say:'Compound with FANBOYS',speech:'Join two complete thoughts with a comma and a conjunction like and, but, or or so.',set:S.word('The tide went out,','boats sat on the mud.',['so','because','although'],'so',{pic:'sailboat'})},
  {say:'But for a contrast',speech:'Use but when the second idea is different or surprising. You can walk on the sea floor, but you must leave in time.',set:S.word('You can walk on the sea floor,','you must leave in time.',['but','so','or'],'but',{pic:'girl'})},
  {say:'Complex sentences',speech:'A dependent clause starts with a word like because, when or although. It needs the rest of the sentence to make sense.',set:S.word('','the tide is low, you can see the rocks.',['When','And','So'],'When',{pic:'rock'})}],
 more:{title:'Did you know?',text:'During one tide, more water flows into the Bay of Fundy than flows out of *all the rivers on Earth* combined!',pics:['water wave']},
 rounds:[R.word('Which word fits?','I was tired,','I went to bed.',['so','but','or'],'so'),R.word('Which word fits?','I like soccer,','my sister likes hockey.',['but','so','because'],'but'),
  R.word('Which word fits?','Do you want juice,','do you want milk?',['or','so','because'],'or'),R.word('Which word fits?','We stayed inside','it was raining.',['because','but','or'],'because'),
  R.q('Which is a dependent clause?',['when the tide is low','The tide is low.','Boats float.'],'when the tide is low'),R.q('How high can the Fundy tide rise?',['16 metres','1 metre','100 metres'],'16 metres'),
  R.q('What are the Hopewell Rocks shaped like?',['giant flowerpots','animals','castles'],'giant flowerpots'),R.q('A compound sentence joins two…',['independent clauses','nouns','paragraphs'],'independent clauses'),R.tf('“Because the tide came in” is a complete sentence.',false)],
 tries:[['Write a compound sentence about recess with “so”.','e.g. It rained, *so* we played inside.'],['Write a complex sentence that starts with “Although”.','e.g. *Although* I was nervous, I sang.']]});

/* 16 ─ Fragments and run-ons */
U({id:'e16',title:'Fixing fragments and run-ons',strand:'Grammar',codes:['B3.1','D2.5'],
 guide:{goal:'Recognize sentence fragments (missing a subject or verb) and run-on sentences (two sentences jammed together), and fix them by adding words, punctuation or conjunctions.',words:'fragment, run-on, complete sentence, subject, predicate, revise',ask:['What does every complete sentence need?','How can you fix a run-on?','Is “Floating into the sky” a sentence?'],home:'Find a run-on in your own writing and fix it.'},
 watch:['Not too short, not too long!','A fragment is missing a part. A run-on doesn’t know when to stop.'],
 fig:'Lanterns floating into the night sky.',
 page:{story:{title:'Lanterns in the Sky',text:'In *Thailand*, the *Yi Peng* festival happens each November. Thousands of *paper lanterns* float into the night sky. Mali wrote about it, but her first draft was messy: "*Floating into the sky.*" "That is a *fragment*," said her teacher. "What is floating? Add a *subject*." Mali fixed it: "*Glowing lanterns floated into the sky.*" Her next line was "*The lanterns glowed people made wishes.*" "That is a *run-on*: two sentences stuck together." Mali added a period: "*The lanterns glowed. People made wishes.*" Then she tried "*The lanterns glowed, and people made wishes.*" Even better!',pics:['lantern','star','girl','teacher'],
   acts:[[null,'night',['lantern','star'],'Thousands of lanterns!'],['fragment','classroom',['teacher','book'],'Add a subject!'],['run-on','classroom',['girl','pencil'],'Too long!'],['Even better','night',['lantern:big','girl'],'Make a wish!']]},
  boxes:[{title:'Fragments',lines:['missing a *subject* or a *verb*','✗ Floating into the sky.','✓ *Glowing lanterns* floated into the sky.']},
   {title:'Run-ons: 3 fixes',lines:['✗ The lanterns glowed people made wishes.','1. a period: glowed*. P*eople…','2. comma + conjunction: glowed*, and* people…','3. a dependent clause: *As* the lanterns glowed, people…']}],
  cards:[{q:'Fragment or sentence: “Because it was late.”',a:'*fragment*'},{q:'Fix: I ran fast I won.',a:'I ran fast*, so* I won.'}],
  words:[['fragment','an incomplete sentence missing a subject or a verb'],['run-on sentence','two or more sentences joined without correct punctuation']]},
 steps:[
  {say:'Read the story',speech:'Mali wrote, floating into the sky. That was a fragment. Then, the lanterns glowed people made wishes. That was a run-on. She fixed both.',set:S.row(['lantern','star','girl','teacher'])},
  {say:'Fix a fragment',speech:'Floating into the sky. What is floating? Add a subject: glowing lanterns floated into the sky.',set:S.word('Glowing','floated into the sky.',['lanterns','into','glowing'],'lanterns',{pic:'lantern'})},
  {say:'Fix a run-on',speech:'The lanterns glowed people made wishes. Split it with a period, or join it with a comma and and.',set:S.word('The lanterns glowed,','people made wishes.',['and','because','the'],'and',{pic:'star'})}],
 more:{title:'Did you know?',text:'People in Thailand believe sending a lantern into the sky lets go of bad luck and sends a *wish* up to the stars.',pics:['lantern']},
 rounds:[R.q('“Ran to the park.” This is a…',['fragment','run-on','complete sentence'],'fragment'),R.q('“I like cats they are soft.” This is a…',['run-on','fragment','complete sentence'],'run-on'),
  R.q('“The lanterns glowed.” This is a…',['complete sentence','fragment','run-on'],'complete sentence'),R.q('Best fix for “I ran fast I won.”',['I ran fast, so I won.','I ran fast I, won.','Ran fast won.'],'I ran fast, so I won.'),
  R.q('A fragment is missing…',['a subject or a verb','a comma','an adjective'],'a subject or a verb'),R.q('Where is the Yi Peng festival?',['Thailand','Canada','Egypt'],'Thailand'),
  R.q('“Because it was dark.” Is it complete?',['No, it is a fragment','Yes'],'No, it is a fragment'),R.word('Which word fits?','The wind blew,','the lantern drifted away.',['and','because','the'],'and'),R.tf('A run-on sentence can be fixed with a period.',true)],
 tries:[['Fix: “The big brown dog.”','e.g. The big brown dog *barked*.'],['Fix: “It snowed we built a fort.”','It snowed*, so* we built a fort.']]});

/* 17 ─ Capitals and commas */
U({id:'e17',title:'Capital letters and commas',strand:'Grammar',codes:['B3.3'],
 guide:{goal:'Use capital letters for proper nouns, proper adjectives, titles and the first word of a sentence, and commas in lists, dates, addresses, after introductory words and to set off nouns of direct address.',words:'capitalization, comma, series, direct address, introductory word',ask:['Where does the comma go: “Maya come here”?','Why does “Thai” need a capital?','How do you write a list of three things?'],home:'Write a list of 4 favourite foods using commas correctly.'},
 watch:['Capitals start, commas pause!','“Maya, grab the water gun!” The comma sets off Maya: direct address.'],
 fig:'Kids splashing water at a festival.',
 page:{story:{title:'Happy “Wet” New Year!',text:'In *April*, people in *Thailand* celebrate *Songkran*, the *Thai New Year*. Everyone splashes water on each other to wash away bad luck! On *April 13, 2025*, Mali visited her grandparents in *Chiang Mai*. "*Grandma, look out!*" she shouted as her cousin aimed a water gun. They packed *buckets, water guns, towels and dry clothes*. "*Well,* we will get soaked," said Grandpa, laughing. "*Mali,* your hair is dripping!" At night, they ate *Thai* mango sticky rice and listened to music.',pics:['water wave','girl','grandma','bucket'],
   acts:[[null,'city',['girl','grandma'],'Happy New Year!'],['Grandma, look out','park',['bucket','droplet'],'Splash!'],['buckets','home',['bucket','towel'],'Pack it all!'],['mango sticky rice','kitchen',['rice','mango'],'Yum!']]},
  boxes:[{title:'Capital letters',lines:['first word of a sentence','proper nouns: *Thailand, Mali, April*','proper adjectives: *Thai* food, *Canadian* flag','titles: *Grandma* (as a name), *Dr. Lee*']},
   {title:'Commas',lines:['lists: buckets*,* water guns*,* towels and clothes','dates: April 13*,* 2025','places: Chiang Mai*,* Thailand','after introductory words: *Well,* we will…','direct address: *Mali,* your hair is dripping!']}],
  cards:[{q:'Add commas: Leo come here please.',a:'*Leo,* come here, please.'},{q:'Which needs a capital: thai or water?',a:'*Thai*'}],
  words:[['direct address','speaking straight to someone by name; set it off with commas'],['series','a list of three or more items']]},
 steps:[
  {say:'Read the story',speech:'Mali celebrated Songkran, the Thai New Year, on April thirteenth. She shouted, Grandma, look out! They packed buckets, water guns, towels and dry clothes.',set:S.row(['water wave','girl','grandma','bucket'])},
  {say:'Commas in a list',speech:'Put commas between items in a list: buckets, water guns, towels and dry clothes.',set:S.word('They packed buckets','water guns and towels.',[',','.','!'],',',{pic:'bucket'})},
  {say:'Direct address',speech:'When you speak to someone by name, set the name off with a comma. Mali, your hair is dripping!',set:S.word('Mali','your hair is dripping!',[',','.','?'],',',{pic:'girl'})},
  {say:'Proper adjectives',speech:'Thai comes from Thailand, so it needs a capital: Thai food, Thai New Year.',set:S.word('They ate','mango sticky rice.',['Thai','thai','THAI'],'Thai',{pic:'rice'})}],
 more:{title:'Did you know?',text:'Songkran comes at the *hottest* time of year in Thailand, so the water fights help everyone stay cool!',pics:['sun','droplet']},
 rounds:[R.word('Which fits?','Grandpa','come and see!',[',','.','?'],','),R.word('Which fits?','I bought apples','pears and grapes.',[',','.','!'],','),
  R.q('Which is written correctly?',['April 13, 2025','april 13 2025','April, 13 2025'],'April 13, 2025'),R.q('Which needs a capital letter?',['thai','splash','bucket'],'thai'),
  R.q('Where does the comma go?',['Well, let’s go.','Well let’s, go.','Well let’s go,'],'Well, let’s go.'),R.q('What is Songkran?',['the Thai New Year','a Canadian holiday','a kind of fruit'],'the Thai New Year'),
  R.q('Why do people splash water at Songkran?',['to wash away bad luck','to water plants','to clean cars'],'to wash away bad luck'),R.q('Which is correct?',['Chiang Mai, Thailand','chiang mai, thailand','Chiang Mai Thailand,'],'Chiang Mai, Thailand'),R.tf('“Canadian” needs a capital letter.',true)],
 tries:[['Write your address with commas.','e.g. 12 Pine St.*,* Sudbury*,* Ontario'],['Write a sentence speaking to a friend by name.','e.g. *Ava,* can you help me?']]});

/* 18 ─ Quotation marks and apostrophes */
U({id:'e18',title:'Quotation marks and apostrophes',strand:'Grammar',codes:['B3.3'],
 guide:{goal:'Use quotation marks for dialogue and the titles of short works (songs, poems, articles, short stories), and apostrophes for contractions and possessives.',words:'quotation marks, dialogue, title, apostrophe, contraction, possessive',ask:['What goes inside quotation marks?','How do you show the title of a song?','Is it “the girl’s book” or “the girls book”?'],home:'Write a short conversation with a family member using quotation marks.'},
 watch:['Who said it? Who owns it?','“I love this book,” said Parvana. The words she said go inside the quotation marks.'],
 fig:'A book and speech bubbles with punctuation.',
 page:{story:{title:'A Letter to an Author',text:'*Amira* finished *The Breadwinner* by *Deborah Ellis*, a Canadian author from *Ontario*. She wrote her a letter. "*I couldn’t put your book down,*" Amira wrote. "*Parvana’s courage amazed me.*" Deborah Ellis wrote back! "*Thank you, Amira,*" she said. "*You’re a thoughtful reader.*" Amira’s teacher read the letter aloud and taught the class a new rule: titles of *short* works, like a poem called "*Hope*" or an article called "*Writing Books That Help Children*," go in quotation marks too. "We’ll write our own articles next," she said.',pics:['book','letter','girl','teacher'],
   acts:[[null,'home',['book','girl'],'I can’t put it down!'],['letter','home',['letter','pencil'],'Dear Ms. Ellis…'],['wrote back','home',['envelope','girl'],'She wrote back!'],['quotation marks','classroom',['teacher','book'],'Titles of short works!']]},
  boxes:[{title:'Quotation marks “ ”',lines:['dialogue: *“You’re a thoughtful reader,”* she said.','titles of short works: the poem *“Hope”*, the song *“O Canada”*','(long works like books are *italic* or underlined)']},
   {title:'Apostrophes ’',lines:['*contractions*: could not → *couldn’t*, you are → *you’re*, we will → *we’ll*','*possessives*: Parvana*’s* courage, the girl*’s* book','plural possessive: the girls*’* books']}],
  cards:[{q:'Contraction for “they are”?',a:'*they’re*'},{q:'The dog owns a bone: the ___ bone.',a:'*dog’s*'}],
  words:[['contraction','two words joined with an apostrophe replacing missing letters'],['dialogue','the words characters say, written in quotation marks']]},
 steps:[
  {say:'Read the story',speech:'Amira wrote to author Deborah Ellis. I couldn’t put your book down, she wrote. Thank you, Amira, the author wrote back. You’re a thoughtful reader.',set:S.row(['book','letter','girl','teacher'])},
  {say:'Dialogue',speech:'Quotation marks go around the exact words someone says. Thank you, Amira, she said.',set:S.word('','Thank you, Amira,” she said.',['“','(','!'],'“',{pic:'letter'})},
  {say:'Contractions',speech:'An apostrophe takes the place of missing letters. Could not becomes couldn’t. You are becomes you’re.',set:S.word('I','put your book down.',['couldn’t','couldnt','could’nt'],'couldn’t',{pic:'book'})},
  {say:'Possessives',speech:'Add apostrophe s to show who owns something. Parvana’s courage. Amira’s teacher.',set:S.word('','courage amazed me.',['Parvana’s','Parvanas','Parvanas’'],'Parvana’s',{pic:'girl'})}],
 more:{title:'Did you know?',text:'Deborah Ellis has given away *millions of dollars* from her book sales to groups that help children in war zones and women in need.',pics:['book','heart']},
 rounds:[R.q('Contraction for *we will*:',['we’ll','well','we’ill'],'we’ll'),R.q('Contraction for *do not*:',['don’t','dont','do’nt'],'don’t'),
  R.q('Which shows the hat belongs to Sam?',['Sam’s hat','Sams hat','Sams’ hat'],'Sam’s hat'),R.q('Which title goes in quotation marks?',['a song','a whole book','a movie'],'a song'),
  R.q('Which is punctuated correctly?',['“Let’s go,” said Ana.','Let’s go, “said Ana.”','“Let’s go, said Ana.”'],'“Let’s go,” said Ana.'),R.q('Who wrote The Breadwinner?',['Deborah Ellis','Tim Horton','Plato'],'Deborah Ellis'),
  R.q('What did Amira write to the author?',['a letter','a song','a poem'],'a letter'),R.q('*you’re* means…',['you are','your','you were'],'you are'),R.tf('Quotation marks go around the exact words someone says.',true)],
 tries:[['Write 2 lines of dialogue between a cat and a dog.','“Woof!” said the dog. “Meow,” said the cat.'],['Write 4 contractions.','*can’t, it’s, I’m, they’ll*']]});

/* 19 ─ Main idea and summarizing */
U({id:'e19',title:'Main idea, details and summaries',strand:'Reading',codes:['C2.6','C3.3','C2.1'],
 guide:{goal:'Find the main idea of a text and the supporting details in order, and write a short summary that draws a simple conclusion.',words:'main idea, supporting detail, summary, sequence, conclusion',ask:['What is the main idea of the inukshuk text?','What details support it?','How long should a summary be?'],home:'Summarize your favourite movie in 3 sentences.'},
 watch:['The big idea and its helpers!','Main idea: inuksuit help people on the land. Details: they show the way, mark food caches, warn of danger.'],
 fig:'An inukshuk on the tundra.',
 page:{story:{title:'Stone Messengers',text:'Across the *Arctic*, you may see stone figures standing on the tundra. They are *inuksuit* (one is an *inukshuk*), and they help people on the land. The *Inuit* have built them for hundreds of years. Some point the way home across the flat, snowy land. Others mark places where *food was stored* or where good *fishing* spots are. Some warn travellers of *danger*, like thin ice. An inukshuk means “*in the likeness of a human*.” Today, an inukshuk appears on the *flag of Nunavut* as a symbol of guidance and teamwork.',pics:['rock','igloo','flag','snowflake'],
   acts:[[null,'arctic',['rock:big','snowflake'],'Stone messengers!'],['point the way','arctic',['rock','dog sled'],'This way home!'],['food was stored','arctic',['rock','fish'],'Food is here!'],['flag of Nunavut','arctic',['flag','rock'],'Guidance and teamwork!']]},
  boxes:[{title:'Main idea and details',lines:['*main idea*: inuksuit help people travelling on the land','detail 1: they point the way home','detail 2: they mark food caches and fishing spots','detail 3: they warn of danger']},
   {title:'Writing a summary',lines:['say the *main idea* first','add the *most important* details in order','use *your own words*','keep it *short*: 2 to 4 sentences','end with a *conclusion*']}],
  cards:[{q:'What does “inukshuk” mean?',a:'“in the *likeness* of a *human*”'},{q:'Should a summary include every detail?',a:'*No*, only the most important ones'}],
  words:[['main idea','what a text is mostly about'],['summary','a short retelling of the main idea and key details in your own words']]},
 steps:[
  {say:'Read the story',speech:'Inuksuit are stone figures built by the Inuit. They point the way home, mark food and fishing spots, and warn of danger. One appears on Nunavut’s flag.',set:S.row(['rock','igloo','flag','snowflake'])},
  {say:'The main idea',speech:'Ask: what is this mostly about? Inuksuit help people travelling on the land. That is the main idea.',set:S.word('Inuksuit help people','on the land.',['travelling','fishing only','sleeping'],'travelling',{pic:'rock'})},
  {say:'Supporting details',speech:'The details support the main idea: they point the way, mark food caches and warn of danger.',set:S.row(['map','fish','snowflake'],{labels:['point the way','mark food','warn of danger']}),
   cues:[['point the way','map','detail 1'],['mark food caches','fish','detail 2'],['warn of danger','snowflake','detail 3']]},
  {say:'Summarize',speech:'A summary: Inuksuit are stone figures the Inuit build to guide travellers. They show the way, mark food and warn of danger. They are important symbols of the north.',set:S.order(['rock','map','flag']),
   cues:[['stone figures','rock','main idea'],['show the way','map','details'],['symbols','flag','conclusion']]}],
 more:{title:'Did you know?',text:'The logo of the *2010 Vancouver Winter Olympics* was an inukshuk named *Ilanaaq*, which means “friend” in Inuktitut.',pics:['medal','rock']},
 rounds:[R.q('What is the main idea of the text?',['inuksuit help people travelling on the land','the Arctic is cold','flags are colourful'],'inuksuit help people travelling on the land'),R.q('Which is a supporting detail?',['some mark food caches','the Arctic is in Canada','I like rocks'],'some mark food caches'),
  R.q('A summary should be…',['short, in your own words','longer than the text','only the title'],'short, in your own words'),R.q('What does inukshuk mean?',['in the likeness of a human','big rock','stop here'],'in the likeness of a human'),
  R.q('Whose flag shows an inukshuk?',['Nunavut','Ontario','Quebec'],'Nunavut'),R.q('Who builds inuksuit?',['the Inuit','the Romans','tourists only'],'the Inuit'),
  R.q('What goes first in a summary?',['the main idea','a small detail','your opinion'],'the main idea'),R.q('Which danger might an inukshuk warn about?',['thin ice','traffic','bees'],'thin ice'),R.tf('A summary should include every single detail.',false)],
 tries:[['Write a 3-sentence summary of a lesson you liked.','main idea + 2 details'],['Find the main idea of a news article.','ask: what is it mostly about?']]});

/* 20 ─ Sequence and cause and effect */
U({id:'e20',title:'Sequence and cause and effect',strand:'Reading',codes:['C3.3','C2.4'],
 guide:{goal:'Follow the sequence of events using signal words (first, next, then, finally) and explain cause-and-effect relationships using words like because, so and as a result.',words:'sequence, signal words, cause, effect, as a result',ask:['What caused the snakes to leave their dens?','What signal words show order?','Which comes first, the cause or the effect?'],home:'Make a cause-and-effect chain: I forgot my umbrella → I got wet → …'},
 watch:['Why did it happen? What happened next?','Cause: the spring sun warms the rocks. Effect: thousands of snakes come out.'],
 fig:'Snakes leaving a den in spring.',
 page:{story:{title:'The Snake Dens of Narcisse',text:'Every spring in *Narcisse, Manitoba*, something amazing happens. *First*, in winter, tens of thousands of *red-sided garter snakes* crowd into deep rock *dens* *because* the ground above is frozen. *Next*, in late April, the sun warms the rocks. *As a result*, the snakes wake up and slither out in huge, wiggly piles. *Then* they travel to nearby marshes to find food. *Finally*, in the fall, they return to the dens. *Because* a highway crossed their path, many snakes were hurt. *So* people built *tunnels* under the road, and now the snakes cross safely.',pics:['snake','rock','sun','boy'],
   acts:[[null,'winter',['snake','rock'],'Sleeping in the den!'],['sun warms','meadow',['sun','rock'],'Wake up!'],['slither out','meadow',['snake','snake','snake'],'So many snakes!'],['tunnels','meadow',['snake','car'],'A safe crossing!']]},
  boxes:[{title:'Sequence signal words',lines:['*first*, *next*, *then*, *after that*, *finally*','in winter → in spring → in fall']},
   {title:'Cause and effect',lines:['*cause*: why something happens','*effect*: what happens','signal words: *because*, *so*, *as a result*, *since*','cause: highway → effect: snakes hurt','cause: tunnels → effect: snakes cross safely']}],
  cards:[{q:'Why do the snakes go into dens?',a:'*because* the ground is frozen'},{q:'What was the effect of the tunnels?',a:'snakes *cross safely*'}],
  words:[['cause','the reason something happens'],['effect','the result of a cause']]},
 steps:[
  {say:'Read the story',speech:'First, snakes crowd into dens because the ground is frozen. Next, the spring sun warms the rocks, and they come out. Then they go to marshes. Finally, they return in fall.',set:S.row(['snake','rock','sun','boy'])},
  {say:'In order',speech:'Winter in the den. Spring, out in the sun. Summer in the marsh. Fall, back to the den.',set:S.order(['snowflake','sun','frog','leaf']),
   cues:[['Winter','snowflake','first'],['Spring','sun','next'],['Summer in the marsh','frog','then'],['Fall','leaf','finally']]},
  {say:'Cause and effect',speech:'The highway was the cause; hurt snakes were the effect. Tunnels were built, and as a result, the snakes cross safely.',set:S.word('People built tunnels,','the snakes cross safely.',['so','because','before'],'so',{pic:'snake'})}],
 more:{title:'Did you know?',text:'The Narcisse Snake Dens have the *largest gathering of snakes* in the world, up to *75 000* snakes! Red-sided garter snakes are harmless to people.',pics:['snake']},
 rounds:[R.q('Why do snakes go into the dens?',['the ground above is frozen','they are hungry','it is too sunny'],'the ground above is frozen'),R.q('What caused the snakes to wake up?',['the sun warmed the rocks','a loud noise','rain'],'the sun warmed the rocks'),
  R.q('What was the effect of the tunnels?',['snakes cross safely','more snakes were hurt','the road closed'],'snakes cross safely'),R.order('Put the snakes’ year in order.',['snowflake','sun','frog','leaf']),
  R.q('Which is a sequence signal word?',['finally','because','so'],'finally'),R.q('Which is a cause-and-effect signal word?',['as a result','first','next'],'as a result'),
  R.q('Where are the Narcisse Snake Dens?',['Manitoba','Ontario','Nunavut'],'Manitoba'),R.q('Where do the snakes go in summer?',['nearby marshes','the ocean','the city'],'nearby marshes'),R.tf('The effect is the reason something happens.',false)],
 tries:[['Finish: Because I studied, …','e.g. *I did well on my test*.'],['Write 4 steps for planting a seed with signal words.','First… Next… Then… Finally…']]});

/* 21 ─ Inferences and predictions */
U({id:'e21',title:'Inferences and predictions',strand:'Reading',codes:['C3.2','C2.3'],
 guide:{goal:'Make inferences by combining clues from the text with what you already know, make predictions using evidence, and check them as you read.',words:'inference, prediction, evidence, clue, background knowledge, confirm',ask:['What is an inference?','What clues helped you predict the ending?','Was your prediction right?'],home:'Watch a show with the sound off for one minute. What can you infer from the pictures?'},
 watch:['Clues + what I know = inference!','Muddy paw prints + a missing sandwich = the dog took it!'],
 fig:'A detective scene with clues.',
 page:{story:{title:'A Mystery at Maple Lodge',text:'At *Maple Lodge* camp, Jonah’s *muffin* disappeared from the picnic table. He looked for *clues*. The wrapper was *torn* and lay near a *tree*. Tiny *crumbs* led to the trunk. Up on a branch, something *chattered* angrily. A long, bushy *tail* twitched. "I *predict* we’ll find the thief up there," Jonah said. His friend Sara looked up. "*Brown* fur, a bushy tail, loves snacks… I *infer* it is a *squirrel*!" The squirrel dropped a piece of muffin on Jonah’s head. "*Prediction confirmed*," he laughed.',pics:['squirrel','muffin','boy','tree'],
   acts:[[null,'campsite',['muffin','boy'],'My muffin is gone!'],['clues','campsite',['tree','boy'],'Crumbs!'],['chattered','forest',['squirrel','tree'],'Chit-chit-chit!'],['confirmed','campsite',['squirrel','boy','girl'],'Mystery solved!']]},
  boxes:[{title:'Making inferences',lines:['*text clues* + *what I know* = *inference*','clues: torn wrapper, crumbs, bushy tail, chattering','I know: squirrels love snacks and live in trees','inference: *a squirrel* took it']},
   {title:'Predictions',lines:['use *evidence* to guess what will happen','read on to *confirm* or *change* it','good readers predict all the time']}],
  cards:[{q:'Mom has an umbrella and wet boots. Infer:',a:'it is *raining*'},{q:'What do you do after making a prediction?',a:'*read on* to check it'}],
  words:[['inference','a smart guess based on clues and what you already know'],['prediction','a guess about what will happen next, using evidence']]},
 steps:[
  {say:'Read the story',speech:'Jonah’s muffin disappeared. A torn wrapper and crumbs led to a tree. Something chattered and a bushy tail twitched. Sara inferred it was a squirrel.',set:S.row(['squirrel','muffin','boy','tree'])},
  {say:'Text clues',speech:'The clues were a torn wrapper, crumbs leading to the tree, chattering and a bushy tail.',set:S.row(['muffin','tree','squirrel'],{labels:['torn wrapper','crumbs to tree','bushy tail']}),
   cues:[['torn wrapper','muffin','clue'],['crumbs','tree','clue'],['bushy tail','squirrel','clue']]},
  {say:'Clues plus knowledge',speech:'Add what you already know: squirrels live in trees and love snacks. Clues plus knowledge equals an inference.',set:S.word('I infer it is a','.',['squirrel','bear','bird'],'squirrel',{pic:'squirrel'})}],
 more:{title:'Did you know?',text:'Grey squirrels bury thousands of nuts each fall and find many of them later using *smell* and *memory*. The ones they forget can grow into new trees!',pics:['squirrel','acorn']},
 rounds:[R.q('Who took the muffin?',['a squirrel','a bear','Sara'],'a squirrel'),R.q('An inference uses…',['clues and what you know','only pictures','only guesses'],'clues and what you know'),
  R.q('“Leo yawned and rubbed his eyes.” Infer:',['he is tired','he is hungry','he is angry'],'he is tired'),R.q('“The sky turned dark and thunder rumbled.” Predict:',['it will rain','it will snow sugar','the sun will get brighter'],'it will rain'),
  R.q('Which was a clue in the story?',['crumbs leading to a tree','a bear footprint','a broken window'],'crumbs leading to a tree'),R.q('After predicting, good readers…',['read on to check','stop reading','close the book'],'read on to check'),
  R.q('Where did the story happen?',['Maple Lodge camp','a school','a city park'],'Maple Lodge camp'),R.q('“Ana wore a helmet and pads and carried a board.” Infer:',['she is going skateboarding','she is going swimming','she is baking'],'she is going skateboarding'),R.tf('A prediction can change as you read more.',true)],
 tries:[['Look at a book cover. Predict what happens.','use title + picture clues'],['Write 3 clues that someone just came in from the snow.','wet boots, red cheeks, snowy hat']]});
})();
