/* The Interactive Classroom: Grade 4 English — Reading (fact and opinion, text features, story elements and point of view, texts by Indigenous creators) and Writing (paragraphs, the writing process and persuasive writing, digital media literacy) */
(function(){
"use strict";
const P=window.PM;if(!P||!P.unit)return;const U=P.unit,R=P.R,S=P.S;

/* 22 ─ Fact, opinion and perspective */
U({id:'e22',title:'Fact, opinion and perspective',strand:'Reading',codes:['C3.5','C3.2'],
 guide:{goal:'Tell facts (can be proven) from opinions (beliefs or feelings), identify the perspective of a text, and notice bias that could influence readers.',words:'fact, opinion, perspective, bias, evidence, persuade',ask:['How can you check a fact?','What words signal an opinion?','Why might an ad show only good things?'],home:'Find an ad. List one fact and one opinion in it.'},
 watch:['Can it be proven?','“The blue whale is the largest animal.” Fact! “Blue whales are the most beautiful.” Opinion!'],
 fig:'A blue whale with fact and opinion labels.',
 page:{story:{title:'The Largest of All',text:'Theo read two texts about *blue whales*. The first was a *science article*: "The blue whale is the *largest* animal that has ever lived. It can grow to about *30 metres* long. Its heart is the size of a small *car*." These are *facts*: they can be *checked* in an encyclopedia. The second was an *ad* for a whale-watching boat: "Our tour is the *best* in Canada! You will have the *most amazing* day of your life!" Those are *opinions*. "The ad shows only *good* things," said Theo. "That is its *perspective*. It wants me to buy a ticket: that is a *bias*."',pics:['whale','book','boy','sailboat'],
   acts:[[null,'ocean',['whale:big'],'The largest animal ever!'],['science article','classroom',['book','boy'],'Facts can be checked.'],['ad','beach',['sailboat','boy'],'The best tour?'],['bias','classroom',['boy','computer'],'It wants me to buy!']]},
  boxes:[{title:'Fact or opinion?',lines:['*fact*: can be proven true: Blue whales eat krill.','*opinion*: a belief or feeling: Whales are cute.','opinion words: *best, worst, beautiful, should, I think*']},
   {title:'Perspective and bias',lines:['*perspective*: the point of view of the writer','*bias*: showing only one side','ask: Who wrote it? Why? What is left out?']}],
  cards:[{q:'“Pizza is the best food.” Fact or opinion?',a:'*opinion*'},{q:'“Ottawa is Canada’s capital.” Fact or opinion?',a:'*fact*'}],
  words:[['fact','a statement that can be proven true'],['bias','favouring one side and leaving out others']]},
 steps:[
  {say:'Read the story',speech:'The science article said the blue whale is the largest animal and can grow to thirty metres. Those are facts. The ad said its tour is the best. That is an opinion.',set:S.row(['whale','book','boy','sailboat'])},
  {say:'Sort them',speech:'Can it be checked? Then it is a fact. Is it a feeling or belief? Then it is an opinion.',set:S.sort(['fact','opinion'],[['whale',0],['heart',1],['book',0],['star',1]]),
   cues:[['fact','whale','30 m long'],['opinion','heart','most beautiful']]},
  {say:'Spot the bias',speech:'The ad only shows sunny days and happy whales. It leaves out seasickness and rainy days. It wants you to buy a ticket.',set:S.word('The ad shows only','things.',['good','true','bad'],'good',{pic:'sailboat'})}],
 more:{title:'Did you know?',text:'A blue whale’s call is louder than a *jet engine*, and other whales can hear it hundreds of kilometres away. That is a fact you can check!',pics:['whale','airplane']},
 rounds:[R.q('“Blue whales can grow to 30 m.” This is a…',['fact','opinion'],'fact'),R.q('“Our tour is the best!” This is an…',['opinion','fact'],'opinion'),
  R.q('Which word often signals an opinion?',['best','metre','krill'],'best'),R.q('How can you check a fact?',['look it up in a reliable source','ask if you like it','guess'],'look it up in a reliable source'),
  R.q('Why does the ad show only good things?',['it wants you to buy a ticket','it is a science article','whales wrote it'],'it wants you to buy a ticket'),R.q('Showing only one side is…',['bias','a fact','a summary'],'bias'),
  R.q('What is a blue whale’s heart about the size of?',['a small car','a pea','a house'],'a small car'),R.q('“Winter is the most fun season.” Fact or opinion?',['opinion','fact'],'opinion'),R.tf('An opinion can be proven true.',false)],
 tries:[['Write 2 facts and 2 opinions about your school.','e.g. fact: it has 300 students / opinion: it is the best'],['Find something an ad leaves out.','e.g. cost, sugar, side effects']]});

/* 23 ─ Text features and text forms */
U({id:'e23',title:'Text features and text forms',strand:'Reading',codes:['C1.2','C1.3','C1.4'],
 guide:{goal:'Identify text forms (narrative, informational, procedural, persuasive, poetry) and text features (headings, captions, diagrams, bold words, glossary, hyperlinks) and explain how they help readers.',words:'text form, text feature, heading, caption, diagram, glossary, hyperlink',ask:['What is a caption for?','Why are some words in bold?','Is a recipe narrative or procedural?'],home:'Look at a nonfiction book. Find 5 text features.'},
 watch:['Features guide your eyes!','Headings tell what a section is about. Captions explain pictures. Bold words are important.'],
 fig:'A nonfiction page with labelled features.',
 page:{story:{title:'Our Summer at the Farm',text:'Priya’s class made an *informational* book called *Our Summer at the Farm*. Each page had a *heading*, like "*Milking the Cows*." Under each photo, they wrote a *caption*: "*Grandpa Joe feeds a calf.*" They drew a labelled *diagram* of a *barn*. Important words like *dairy* were in *bold*, and a *glossary* at the back explained them. Their online version had *hyperlinks* to videos. Ravi also wrote a *recipe* for apple crisp: a *procedural* text with numbered steps. Mei wrote a *poem* about the barn cat.',pics:['barn','cow','girl','book'],
   acts:[[null,'farm',['barn','cow'],'Our Summer at the Farm!'],['caption','farm',['cow','grandpa'],'Grandpa Joe feeds a calf.'],['recipe','kitchen',['apple','bowl'],'Step 1, step 2…'],['poem','farm',['cat','barn'],'The barn cat…']]},
  boxes:[{title:'Text features',lines:['*title* and *headings*: what each part is about','*captions*: explain pictures','*diagrams* and *labels*: show parts','*bold* words: important vocabulary','*glossary*, *index*, *table of contents*','*hyperlinks*: online links to more']},
   {title:'Text forms',lines:['*narrative*: tells a story','*informational*: teaches facts','*procedural*: how to do something (steps)','*persuasive*: tries to convince','*poetry*: rhythm, images, feelings']}],
  cards:[{q:'Where do you find word meanings at the back of a book?',a:'the *glossary*'},{q:'A recipe is which text form?',a:'*procedural*'}],
  words:[['text feature','a part of a text that helps you find and understand information'],['caption','words under a picture that explain it']]},
 steps:[
  {say:'Read the story',speech:'The class made an informational book with headings, captions, a diagram, bold words and a glossary. Ravi wrote a recipe, a procedural text. Mei wrote a poem.',set:S.row(['barn','cow','girl','book'])},
  {say:'Features',speech:'A heading tells what a section is about. A caption explains a picture. A glossary explains bold words.',set:S.row(['book','camera','book'],{labels:['heading','caption','glossary']}),
   cues:[['A heading','book','heading'],['A caption','camera','caption'],['A glossary','book','glossary']]},
  {say:'Forms',speech:'A story is narrative. A fact book is informational. A recipe is procedural. An ad is persuasive.',set:S.sort(['narrative','informational','procedural'],[['dragon',0],['globe',1],['bowl',2],['castle',0],['planet',1],['hammer',2]]),
   cues:[['narrative','dragon','story'],['informational','globe','facts'],['procedural','bowl','steps']]}],
 more:{title:'Did you know?',text:'Canada has about *10 000* dairy farms, and most of them are in *Ontario* and *Quebec*. A dairy cow can make about *30 litres* of milk a day!',pics:['cow','milk']},
 rounds:[R.q('Words under a picture are a…',['caption','heading','glossary'],'caption'),R.q('A recipe is a…',['procedural text','narrative','poem'],'procedural text'),
  R.q('Why are some words in bold?',['they are important','they are spelled wrong','for decoration only'],'they are important'),R.q('Where are word meanings at the back of a book?',['glossary','title page','cover'],'glossary'),
  R.q('Which text form tries to convince you?',['persuasive','procedural','informational'],'persuasive'),R.q('What did the class’s online version have?',['hyperlinks to videos','a puppet','a song only'],'hyperlinks to videos'),
  R.q('A labelled drawing of a barn is a…',['diagram','caption','index'],'diagram'),R.q('What did Mei write about?',['the barn cat','a dragon','hockey'],'the barn cat'),R.tf('Headings tell what a section is about.',true)],
 tries:[['Make a mini-page about your pet with 3 text features.','heading, picture + caption, bold word'],['Name the text form: a fairy tale, a map guide, a poster for a bake sale.','narrative, informational, persuasive']]});

/* 24 ─ Story elements and point of view */
U({id:'e24',title:'Story elements and point of view',strand:'Reading',codes:['C1.5','C1.6','C3.3'],
 guide:{goal:'Identify story elements (characters, setting, problem, events, solution, theme) and the narrator’s point of view (first, second or third person), and explain how it shapes the story.',words:'character, setting, plot, problem, solution, theme, point of view, narrator',ask:['Who is telling the story?','What clues show first person?','What is the theme?'],home:'Retell a fairy tale in first person from the villain’s point of view.'},
 watch:['Who, where, what happened, and who is telling?','First person uses I and we. Third person uses he, she and they.'],
 fig:'A lake with a mysterious creature and a narrator.',
 page:{story:{title:'I Saw Ogopogo!',text:'*I* had heard stories about *Ogopogo*, the legendary lake monster of *Okanagan Lake* in British Columbia, but *I* never believed them. One misty morning, *my* grandpa and *I* paddled our canoe out to fish. Suddenly, a long dark *shape* rose from the water, then another, like *humps* on a giant snake! *My* heart pounded. Grandpa grabbed *my* arm. "*Stay calm,*" he whispered. When the mist cleared, three *logs* floated by, rolling in the waves. *We* laughed all the way home. "Sometimes," Grandpa said, "*our imagination is the biggest monster of all.*"',pics:['canoe','lake','boy','grandpa'],
   acts:[[null,'lake',['canoe','boy','grandpa'],'A misty morning!'],['long dark shape','lake',['snake:big','water wave'],'Humps in the water!'],['logs','lake',['canoe','lake'],'Just logs!'],['imagination','lake',['grandpa','boy'],'Ha ha ha!']]},
  boxes:[{title:'Story elements',lines:['*characters*: the narrator and Grandpa','*setting*: Okanagan Lake, a misty morning','*problem*: a “monster” appears','*solution*: it was only logs','*theme*: imagination can scare us more than reality']},
   {title:'Point of view',lines:['*first person*: I, me, we: we know the narrator’s feelings','*second person*: you: you hear a splash…','*third person*: he, she, they: an outside narrator']}],
  cards:[{q:'“I paddled out.” Which point of view?',a:'*first person*'},{q:'What is the setting?',a:'*Okanagan Lake* on a misty morning'}],
  words:[['setting','where and when a story happens'],['point of view','who is telling the story: first, second or third person']]},
 steps:[
  {say:'Read the story',speech:'I paddled out with Grandpa on Okanagan Lake. A dark shape with humps rose from the water. When the mist cleared, it was only logs. Our imagination is the biggest monster of all.',set:S.row(['canoe','lake','boy','grandpa'])},
  {say:'Story elements',speech:'Characters: the narrator and Grandpa. Setting: Okanagan Lake. Problem: a monster appears. Solution: it was only logs.',set:S.order(['boy','lake','snake','canoe']),
   cues:[['Characters','boy','who'],['Setting','lake','where'],['Problem','snake','monster!'],['Solution','canoe','only logs']]},
  {say:'Point of view',speech:'The narrator says I, my and we. That is first person. We feel the narrator’s pounding heart because we are inside their head.',set:S.word('','had heard stories about Ogopogo.',['I','He','You'],'I',{pic:'boy'})}],
 more:{title:'Did you know?',text:'The *Syilx* (Okanagan) people tell of *N’ha-a-itk*, a powerful water spirit of the lake. The newer name *Ogopogo* came from a 1920s song!',pics:['lake','water wave']},
 rounds:[R.q('What point of view is the story told in?',['first person','third person','second person'],'first person'),R.q('What was the setting?',['Okanagan Lake','the Bay of Fundy','a school'],'Okanagan Lake'),
  R.q('What was the “monster” really?',['three logs','a whale','a snake'],'three logs'),R.q('What is the theme?',['imagination can scare us more than reality','fishing is boring','monsters are real'],'imagination can scare us more than reality'),
  R.q('“She ran to the lake.” Which point of view?',['third person','first person','second person'],'third person'),R.q('Which words show first person?',['I, me, we','he, she, they','you, your'],'I, me, we'),
  R.q('Who paddled with the narrator?',['Grandpa','a teacher','a friend'],'Grandpa'),R.q('Where something happens is the…',['setting','theme','problem'],'setting'),R.tf('Third person uses I and we.',false)],
 tries:[['Rewrite one sentence of the story in third person.','e.g. *He* had heard stories about Ogopogo.'],['What is the theme of a story you love?','e.g. friendship, courage']]});

/* 25 ─ Texts by Indigenous creators; cultural elements */
U({id:'e25',title:'Reading texts by Indigenous creators',strand:'Reading',codes:['C1.7','C3.4','C3.7'],
 guide:{goal:'Read and listen to texts by First Nations, Métis and Inuit creators, identify cultural elements (music, dance, language, values), and connect them to the creators’ histories and to your own life.',words:'Métis, culture, tradition, Michif, fiddle, jig, sash, connection',ask:['What cultural elements are in the story?','Why is the sash important?','How does the story connect to your family?'],home:'Ask a family member about a tradition in your family. Where did it come from?'},
 watch:['Stories carry culture!','Music, dance, language and family values live in stories.'],
 fig:'A Métis fiddle, sash and dancers.',
 page:{story:{title:'Fiddle Night at Batoche',text:'*Louise* is *Métis*, and every July her family drives to *Back to Batoche Days* in *Saskatchewan*. Her *mushum* (grandfather) plays the *fiddle*, and her cousins dance the *Red River Jig*, their feet flying faster and faster. Louise wears a colourful *woven sash*. "Each colour means something," her *kokum* (grandmother) says. "*Red* for the blood of our ancestors, *blue* for our spirit, *green* for growth." Kokum tells stories in *Michif*, the Métis language that mixes *Cree* and *French*. "These stories carry who we are," she says. Louise thinks about her own family and smiles.',pics:['violin','girl','grandma','grandpa'],
   acts:[[null,'prairie',['car','girl'],'Back to Batoche!'],['fiddle','meadow',['violin','grandpa'],'Play it, Mushum!'],['Red River Jig','meadow',['girl','boy'],'Faster and faster!'],['Michif','home',['grandma','book'],'Stories that carry who we are.']]},
  boxes:[{title:'Cultural elements',lines:['*music*: the fiddle','*dance*: the Red River Jig','*clothing*: the woven sash','*language*: Michif (Cree + French)','*values*: family, Elders, stories']},
   {title:'Making connections',lines:['*text to self*: Does my family have traditions?','*text to text*: Have I read a similar story?','*text to world*: What do I know about Métis history?']}],
  cards:[{q:'What does “kokum” mean?',a:'*grandmother*'},{q:'What two languages mix in Michif?',a:'*Cree* and *French*'}],
  words:[['Métis','a distinct Indigenous people with mixed First Nations and European ancestry and their own culture'],['tradition','a custom passed down through families and communities']]},
 steps:[
  {say:'Read the story',speech:'Louise’s family goes to Back to Batoche Days. Mushum plays the fiddle, cousins dance the Red River Jig, and Kokum tells stories in Michif. Louise wears a woven sash.',set:S.row(['violin','girl','grandma','grandpa'])},
  {say:'Cultural elements',speech:'The fiddle is music. The jig is dance. The sash is clothing. Michif is language. Together they show Métis culture.',set:S.row(['violin','boy','girl','book'],{labels:['music','dance','sash','language']}),
   cues:[['The fiddle','violin','music'],['The jig','boy','dance'],['The sash','girl','clothing'],['Michif','book','language']]},
  {say:'Connect',speech:'Think about your own family. What music, food or stories are special to you? Connecting helps you understand the text.',set:S.row(['family','heart'],{labels:['text to self','connection']}),
   cues:[['your own family','family','text to self']]}],
 more:{title:'Did you know?',text:'The Métis *infinity flag*, a white infinity sign on blue, stands for two cultures joining together and a people who will *live forever*.',pics:['flag']},
 rounds:[R.q('What instrument does Mushum play?',['fiddle','drum','flute'],'fiddle'),R.q('What dance do the cousins do?',['the Red River Jig','ballet','the polka'],'the Red River Jig'),
  R.q('Michif mixes which languages?',['Cree and French','English and Spanish','Inuktitut and Cree'],'Cree and French'),R.q('What does *kokum* mean?',['grandmother','grandfather','cousin'],'grandmother'),
  R.q('What does red in the sash stand for?',['the blood of the ancestors','apples','the sun'],'the blood of the ancestors'),R.q('Where is Back to Batoche?',['Saskatchewan','Ontario','Nova Scotia'],'Saskatchewan'),
  R.q('Thinking about your own family while reading is a…',['text-to-self connection','text feature','summary'],'text-to-self connection'),R.q('Which is a cultural element?',['music','a comma','a heading'],'music'),R.tf('Stories can carry a people’s culture and values.',true)],
 tries:[['Name 2 cultural elements from your family.','e.g. a holiday food, a song'],['Find a book by a First Nations, Métis or Inuit author.','e.g. *David A. Robertson*, *Julie Flett*, *Michael Kusugak*']]});

/* 26 ─ Paragraphs */
U({id:'e26',title:'Writing strong paragraphs',strand:'Writing',codes:['D1.4','D2.1','D2.3'],
 guide:{goal:'Organize ideas into paragraphs with a topic sentence, supporting details with linking words, and a concluding sentence, and use a personal voice.',words:'paragraph, topic sentence, supporting detail, concluding sentence, linking words, voice',ask:['What does a topic sentence do?','How many details should a paragraph have?','What linking words connect ideas?'],home:'Write a paragraph about your favourite season.'},
 watch:['Like a hamburger!','Top bun: topic sentence. Fillings: details. Bottom bun: concluding sentence.'],
 fig:'A hamburger showing the parts of a paragraph.',
 page:{story:{title:'The Paragraph Burger',text:'Ms. Torres drew a giant *hamburger* on the board. "A *paragraph* is like a burger," she said. "The *top bun* is the *topic sentence*: it tells the main idea. The *fillings* are *supporting details*: three good facts or examples. The *bottom bun* is the *concluding sentence*: it wraps it up." Jayden wrote: "*Hockey is the best winter sport.* *First*, it is fast and exciting. *Also*, you play on a team with friends. *Finally*, you get to skate outside on frozen ponds. *That is why I love hockey!*" "Delicious!" said Ms. Torres.',pics:['hamburger','hockey','boy','teacher'],
   acts:[[null,'classroom',['hamburger:big','teacher'],'The Paragraph Burger!'],['supporting details','classroom',['cheese','tomato','lettuce'],'The fillings!'],['Jayden','winter',['hockey','skates','boy'],'Hockey is the best!']]},
  boxes:[{title:'Parts of a paragraph',lines:['🍔 *topic sentence*: the main idea','🥬 *detail 1* 🧀 *detail 2* 🍅 *detail 3*','🍔 *concluding sentence*: wraps it up']},
   {title:'Linking words',lines:['*first, next, also, another, in addition*','*for example, because, however*','*finally, in conclusion, that is why*']}],
  cards:[{q:'Which sentence tells the main idea?',a:'the *topic sentence*'},{q:'Name 2 linking words.',a:'*first*, *also*, finally…'}],
  words:[['topic sentence','the sentence that tells what a paragraph is about'],['concluding sentence','the last sentence that sums up the paragraph']]},
 steps:[
  {say:'Read the story',speech:'A paragraph is like a burger. The topic sentence is the top bun, the details are the fillings, and the concluding sentence is the bottom bun. Jayden wrote about hockey.',set:S.row(['hamburger','hockey','boy','teacher'])},
  {say:'Build the burger',speech:'Topic sentence, detail, detail, detail, concluding sentence. Stack them in order.',set:S.order(['bread','cheese','tomato','lettuce','bread']),
   cues:[['Topic sentence','bread','top bun'],['detail','cheese','fillings'],['concluding sentence','bread','bottom bun']]},
  {say:'Linking words',speech:'Linking words connect details smoothly: first, also, finally.',set:S.word('',', it is fast and exciting.',['First','Because','The'],'First',{pic:'hockey'})}],
 more:{title:'Writing tip',text:'Show your *voice*! Instead of “Hockey is good,” try “Nothing beats the *swish* of skates on a frozen pond!” Your voice makes readers hear *you*.',pics:['skates']},
 rounds:[R.q('The top bun is the…',['topic sentence','concluding sentence','title'],'topic sentence'),R.q('The fillings are the…',['supporting details','topic sentence','glossary'],'supporting details'),
  R.q('The bottom bun is the…',['concluding sentence','first detail','heading'],'concluding sentence'),R.q('Which is a linking word?',['finally','hockey','burger'],'finally'),
  R.q('Which is the best topic sentence?',['Dogs make wonderful pets.','They wag their tails.','Also, they are fluffy.'],'Dogs make wonderful pets.'),R.q('What was Jayden’s topic?',['hockey','pizza','dogs'],'hockey'),
  R.order('Build the paragraph burger.',['bread','cheese','tomato','bread']),R.q('How many details did Ms. Torres suggest?',['three','one','ten'],'three'),R.tf('A concluding sentence wraps up the paragraph.',true)],
 tries:[['Write a topic sentence about summer.','e.g. Summer is the best time to explore outside.'],['Write a paragraph with 3 linking words.','first, also, finally']]});

/* 27 ─ The writing process and persuasive writing */
U({id:'e27',title:'The writing process: persuasive letters',strand:'Writing',codes:['D1.1','D1.2','D2.1','D2.5','D3.1'],
 guide:{goal:'Use the writing process (plan, draft, revise, edit, publish) to write a persuasive letter with an opinion, reasons, evidence and a call to action, considering purpose and audience.',words:'plan, draft, revise, edit, publish, persuasive, audience, call to action',ask:['What is the difference between revising and editing?','Who is the audience for your letter?','What makes a reason convincing?'],home:'Write a persuasive note asking for a later bedtime with 3 reasons.'},
 watch:['Plan, draft, revise, edit, publish!','A persuasive letter gives your opinion, strong reasons and a call to action.'],
 fig:'A letter moving through the five writing steps.',
 page:{story:{title:'Dear Mayor, We Need a Skate Park',text:'Kids in *Elmvale* had nowhere to skateboard. Sam decided to write a *persuasive letter* to the *mayor*. First he *planned*: his *opinion* was "*Elmvale needs a skate park*," and his *reasons* were *exercise*, *safety* and *friendship*. He wrote a quick *draft*. Then he *revised*: he added *evidence* ("*42 kids signed our petition*") and stronger words. Next he *edited* for spelling and punctuation. Finally he *published* it neatly and ended with a *call to action*: "*Please vote YES at the next council meeting!*" Three months later, a letter came back: *the skate park was approved!*',pics:['skateboard','letter','boy','parliament'],
   acts:[[null,'town',['skateboard','boy'],'Nowhere to skate!'],['planned','home',['pencil','book'],'Opinion and reasons!'],['revised','home',['letter','boy'],'Make it stronger!'],['approved','park',['ramp','skateboard','boy'],'We did it!']]},
  boxes:[{title:'The writing process',lines:['1. *plan*: topic, purpose, audience, ideas','2. *draft*: get it all down','3. *revise*: make ideas clearer and stronger','4. *edit*: fix spelling, capitals, punctuation','5. *publish*: share a neat final copy']},
   {title:'Persuasive letter',lines:['*opinion*: what you believe','*reasons* with *evidence*','*polite* tone for the audience','*call to action*: what you want them to do']}],
  cards:[{q:'Fixing spelling is…',a:'*editing*'},{q:'Adding a stronger reason is…',a:'*revising*'}],
  words:[['revise','change your writing to make the ideas better'],['call to action','the part of persuasive writing that tells the reader what to do']]},
 steps:[
  {say:'Read the story',speech:'Sam planned, drafted, revised, edited and published a letter to the mayor. He gave reasons and evidence and ended with a call to action. The skate park was approved!',set:S.row(['skateboard','letter','boy','parliament'])},
  {say:'Five steps',speech:'Plan, draft, revise, edit, publish. Each step makes the writing better.',set:S.order(['brain','pencil','scissors','magnifying glass','letter']),
   cues:[['Plan','brain','plan'],['draft','pencil','draft'],['revise','scissors','revise'],['edit','magnifying glass','edit'],['publish','letter','publish']]},
  {say:'Persuade',speech:'State your opinion. Give strong reasons with evidence. Be polite. End with a call to action.',set:S.word('Please vote','at the council meeting!',['YES','maybe','later'],'YES',{pic:'letter'})}],
 more:{title:'Did you know?',text:'Kids have changed laws with persuasive letters! Students in many Canadian cities have convinced councils to add *bike lanes*, *crosswalks* and *playgrounds*.',pics:['bicycle','traffic light']},
 rounds:[R.order('Put the writing process in order.',['pencil','scissors','letter']),R.q('Fixing spelling and punctuation is…',['editing','planning','publishing'],'editing'),
  R.q('Making ideas clearer and stronger is…',['revising','editing','publishing'],'revising'),R.q('A call to action tells the reader…',['what to do','the title','a joke'],'what to do'),
  R.q('Who was Sam’s audience?',['the mayor','his dog','his teacher'],'the mayor'),R.q('What evidence did Sam add?',['42 kids signed a petition','skateboards are blue','he likes pizza'],'42 kids signed a petition'),
  R.q('Which is the best reason for a skate park?',['kids get safe exercise','skateboards are loud','I said so'],'kids get safe exercise'),R.q('What happened in the end?',['the skate park was approved','nothing','the town closed'],'the skate park was approved'),R.tf('Publishing is the first step.',false)],
 tries:[['Plan a letter to your principal: opinion + 3 reasons.','e.g. longer recess: exercise, focus, fun'],['Write a polite call to action.','e.g. Please consider adding…']]});

/* 28 ─ Digital media literacy and online safety */
U({id:'e28',title:'Staying safe and smart online',strand:'Writing',codes:['A2.1','A2.2','A2.3'],
 guide:{goal:'Explain rights and responsibilities online, protect privacy, ask permission before sharing, check that online information is credible, and build a positive digital identity.',words:'digital citizen, privacy, password, permission, credible, digital footprint',ask:['What personal information should you never share online?','How can you tell if a website is reliable?','What is a digital footprint?'],home:'Make a family online-safety agreement.'},
 watch:['Think before you click!','Keep private things private, ask permission, check your sources and be kind.'],
 fig:'A computer with safety shields.',
 page:{story:{title:'Nora’s Research Project',text:'Nora was researching *polar bears* for a project. One website said, "*Polar bears can fly short distances!*" "That can’t be right," she thought. She checked: Who wrote it? There was *no author* and *no date*. Then she found a *government wildlife site* and an *encyclopedia*. Both said polar bears are excellent *swimmers*, not flyers! The first site was not *credible*. Later, a pop-up asked for her *full name*, *address* and *school*. Nora closed it and told her dad. "Good thinking," he said. "*Never share private information*, and always *ask permission* before posting photos of friends. What you post leaves a *digital footprint*."',pics:['computer','polar bear','girl','man'],
   acts:[[null,'home',['computer','girl'],'Polar bear research!'],['fly','arctic',['polar bear','airplane'],'Fly? No way!'],['credible','classroom',['book','computer'],'Check the source!'],['digital footprint','home',['man','girl','computer'],'Think before you post.']]},
  boxes:[{title:'Is it credible?',lines:['Who wrote it? Are they an expert?','Is there a *date*? Is it up to date?','Do other *reliable* sources agree?','Is it trying to *sell* something?']},
   {title:'Safe and kind online',lines:['never share your *address*, *school*, *passwords*','*ask permission* before posting about others','be kind: no mean comments','tell a trusted adult if something feels wrong','your *digital footprint* lasts a long time']}],
  cards:[{q:'A stranger online asks for your school name. What do you do?',a:'*don’t share*; tell a trusted adult'},{q:'Name a credible source for science facts.',a:'an *encyclopedia*, a government or museum site'}],
  words:[['credible','trustworthy and believable'],['digital footprint','the trail of information you leave online']]},
 steps:[
  {say:'Read the story',speech:'One website said polar bears can fly. Nora checked: no author, no date. Credible sources said they swim. A pop-up asked for her address, and she closed it and told her dad.',set:S.row(['computer','polar bear','girl','man'])},
  {say:'Check the source',speech:'Ask who wrote it, when, and whether other reliable sources agree. Two good sources said polar bears swim, not fly.',set:S.row(['book','computer','globe'],{labels:['encyclopedia','government site','check']}),
   cues:[['who wrote it','book','author?'],['reliable sources','computer','agree?']]},
  {say:'Protect your privacy',speech:'Never share your full name, address, school or passwords online. Ask permission before posting about others.',set:S.word('Never share your','online.',['address','favourite colour','hobby'],'address',{pic:'house'})}],
 more:{title:'Did you know?',text:'A strong *password* is long and mixes words, numbers and symbols, like *Moose!Jump42Lake*. Never use your birthday or your pet’s name!',pics:['key','computer']},
 rounds:[R.q('Which should you never share online?',['your home address','your favourite book','your favourite colour'],'your home address'),R.q('A website with no author and no date is…',['not very credible','very credible','always true'],'not very credible'),
  R.q('What can polar bears really do well?',['swim','fly','climb trees'],'swim'),R.q('Before posting a photo of a friend, you should…',['ask permission','post it quickly','change their name'],'ask permission'),
  R.q('The trail you leave online is your…',['digital footprint','password','profile picture'],'digital footprint'),R.q('What did Nora do with the pop-up?',['closed it and told her dad','typed her address','clicked it'],'closed it and told her dad'),
  R.q('Which is the strongest password?',['Moose!Jump42Lake','12345','password'],'Moose!Jump42Lake'),R.q('A credible source is…',['trustworthy','funny','colourful'],'trustworthy'),R.tf('If something online feels wrong, tell a trusted adult.',true)],
 tries:[['Write 3 rules for your family’s online safety.','no addresses, ask first, be kind'],['Check a website with the 4 credible questions.','author, date, agree, selling?']]});
})();
