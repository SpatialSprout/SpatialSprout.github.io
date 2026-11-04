/* The Interactive Classroom: Grade 4 Social Studies — Heritage and Identity: daily life then and now, the environment, natural events, investigating with sources and maps */
(function(){
"use strict";
const P=window.PM;if(!P||!P.unit)return;const U=P.unit,R=P.R,S=P.S;

/* 8 ─ Children then and now */
U({id:'t08',title:'Growing up long ago',strand:'Early Societies',codes:['A1.3','A3.3'],
 guide:{goal:'Compare the daily lives of young people in early societies (school, work, toys and games) with their own lives today, and explain how differences were connected to each society’s organization.',words:'daily life, chores, apprentice, toys, education, compare',ask:['Did most children go to school long ago?','What toys did children play with?','How is your day different from a medieval peasant child’s?'],home:'Ask a grandparent what toys and games they had as a child.'},
 watch:['Then and now!','Long ago most children worked: farming, herding, weaving. Only a few went to school.'],
 fig:'Toys and tools from early societies.',
 page:{story:{title:'A Museum Sleepover',text:'At the *Royal Ontario Museum* sleepover, Grade 4 explored *toys* from long ago. An *Egyptian* wooden *cat toy* had a jaw that opened and closed. *Medieval* children played with *spinning tops*, *marbles* and *hoops*. *Inuit* children played *ajagaq*, a cup-and-pin game made of bone, and learned to hunt by playing. "Most children *worked* from a young age," said the guide. "Peasant kids herded sheep. A few boys became *apprentices* to learn a trade. Only rich children, or future *scribes*, went to *school*." Leah thought about her day. "I go to school, and I get *recess*!"',pics:['toy','marble','girl','book'],
   acts:[[null,'city',['toy','girl'],'Toys from long ago!'],['spinning tops','castle',['toy','boy'],'Spin it!'],['ajagaq','arctic',['bone','boy'],'Catch the pin!'],['recess','school',['ball','girl'],'I get recess!']]},
  boxes:[{title:'Then',lines:['most children *worked*: farming, weaving, herding','*apprentices* learned trades from a master','few went to *school*; few could read','toys: tops, dolls, marbles, bone games']},
   {title:'Now',lines:['all children *go to school* (it is the law in Canada)','*laws* protect children from hard work','toys: video games, bikes, Lego… and still tops and marbles!']}],
  cards:[{q:'What is an apprentice?',a:'a young person learning a *trade* from a master'},{q:'What Inuit game uses a bone and pin?',a:'*ajagaq*'}],
  words:[['apprentice','someone who learns a job by working with an expert'],['daily life','what people do every day: work, eat, play, learn']]},
 steps:[
  {say:'Read the story',speech:'Egyptian children had wooden cat toys. Medieval children spun tops. Inuit children played ajagaq. Most children worked, and only a few went to school.',set:S.row(['toy','marble','girl','book'])},
  {say:'Work and learn',speech:'Peasant children herded sheep and helped farm. Apprentices learned to be blacksmiths or weavers. Future scribes learned to write.',set:S.row(['sheep','anvil','scroll'],{labels:['herding','apprentice','scribe']}),
   cues:[['herded sheep','sheep','work'],['Apprentices','anvil','trade'],['scribes','scroll','school']]},
  {say:'Play',speech:'Children everywhere played. Tops, marbles, dolls and ball games have been around for thousands of years.',set:S.row(['toy','marble','ball','kite']),
   cues:[['Tops','toy','spin'],['marbles','marble','roll'],['ball games','ball','play!']]}],
 more:{title:'Did you know?',text:'Archaeologists found *board games* in Egyptian tombs. A game called *Senet* is more than *5 000 years old*!',pics:['puzzle']},
 rounds:[R.q('Long ago, most children…',['worked','went to school all day','had video games'],'worked'),R.q('An apprentice…',['learned a trade from an expert','was a king','was a toy'],'learned a trade from an expert'),
  R.q('What Egyptian toy did the class see?',['a wooden cat with a moving jaw','a robot','a bicycle'],'a wooden cat with a moving jaw'),R.q('Which children went to school in Egypt?',['future scribes and rich children','all children','no one'],'future scribes and rich children'),
  R.q('What is ajagaq?',['an Inuit cup-and-pin game','a castle','a dance'],'an Inuit cup-and-pin game'),R.q('Today in Canada, children…',['must go to school','must work on farms','cannot play'],'must go to school'),
  R.pick('Tap toys that children played with long ago.',['marble','toy','computer'],['marble','toy']),R.tf('Some games are thousands of years old.',true)],
 tries:[['Make a Venn diagram: your day vs a medieval child’s day.','both: play, family / different: school vs work'],['Which old toy would you like to try? Why?','e.g. spinning top']]});

/* 9 ─ Environment then and now */
U({id:'t09',title:'Living with the environment',strand:'Early Societies',codes:['A1.4','A3.5','A3.4'],
 guide:{goal:'Compare how early societies used and cared for their environments (food, shelter, clothing, sustainability) with environmental practices in Canada today.',words:'environment, sustainable, natural resource, waste, respect',ask:['How did the Thule avoid waste?','How did the Haudenosaunee keep their soil healthy?','What can Canadians learn from early societies?'],home:'Count how much garbage your family makes in one day. How could you make less?'},
 watch:['Take only what you need!','Many early societies used local materials and wasted almost nothing.'],
 fig:'Early homes made from local materials.',
 page:{story:{title:'The Garbage Challenge',text:'Mr. Bouchard’s class weighed their garbage for one week: *8 kilograms*! "Long ago, people used what was *nearby*," he said. "*Egyptians* made bricks from Nile *mud*. The *Haudenosaunee* built longhouses from *elm bark* and moved their villages every *15 to 20* years so the soil and forest could *recover*. The *Thule* used every part of a whale." "Some early societies harmed nature too," said Rosa. "Medieval cities cut down forests and dumped waste in rivers." The class made a plan: *reusable* lunch containers, a *compost* bin and a *Three Sisters* garden.',pics:['trash','compost bin','teacher','girl'],
   acts:[[null,'classroom',['trash','teacher'],'8 kg of garbage!'],['elm bark','nation',['longhouse','tree'],'Let the forest recover.'],['dumped waste','castle',['castle','river'],'Not so good…'],['compost','garden',['compost bin','three sisters','girl'],'Our plan!']]},
  boxes:[{title:'Then',lines:['*local* materials: mud, bark, snow, stone','used every part of plants and animals','moved camps so land could recover','but some cut forests and polluted rivers']},
   {title:'Now in Canada',lines:['👍 recycling, compost, parks, clean energy','👎 lots of packaging and waste','learn from Indigenous ways: take only what you need, think *seven generations* ahead']}],
  cards:[{q:'Why did the Haudenosaunee move villages?',a:'so the *soil* and *forest* could recover'},{q:'What does sustainable mean?',a:'using resources so they *last* for the future'}],
  words:[['sustainable','using resources in a way that they will last for future generations'],['natural resource','something from nature that people use, like water, wood or soil']]},
 steps:[
  {say:'Read the story',speech:'The class made eight kilograms of garbage in a week. Early societies used local materials and wasted little. The class planned to reuse, compost and garden.',set:S.row(['trash','compost bin','teacher','girl'])},
  {say:'Local materials',speech:'Egyptians used Nile mud for bricks. The Haudenosaunee used elm bark. The Thule used snow and whale bones.',set:S.row(['brick','longhouse','igloo'],{labels:['mud brick','elm bark','snow']}),
   cues:[['Nile mud','brick','Egypt'],['elm bark','longhouse','Haudenosaunee'],['snow','igloo','Thule']]},
  {say:'Then and now',speech:'Then: little packaging and much reuse. Now: lots of plastic, but also recycling and clean energy. We can learn from both.',set:S.sort(['helps','harms'],[['compost bin',0],['plastic bottle',1],['solar panel',0],['trash',1]]),
   cues:[['recycling','compost bin','helps'],['lots of plastic','plastic bottle','harms']]}],
 more:{title:'Did you know?',text:'Many First Nations teach the *Seventh Generation Principle*: make decisions that will be good for people living *seven generations* (about 150 years) from now.',pics:['tree','family']},
 rounds:[R.q('*Sustainable* means…',['resources will last for the future','using everything up','buying more'],'resources will last for the future'),R.q('Why did the Haudenosaunee move their villages?',['to let the land recover','to find gold','because of floods only'],'to let the land recover'),
  R.q('What did Egyptians make bricks from?',['Nile mud','snow','elm bark'],'Nile mud'),R.q('How much garbage did the class make in a week?',['8 kg','80 kg','1 kg'],'8 kg'),
  R.sort('Does it *help* or *harm* the environment?',['helps','harms'],[['compost bin',0],['plastic bottle',1],['seedling',0],['trash',1]]),R.q('What did the Thule do with a whale?',['used every part','used only the meat','sold it'],'used every part'),
  R.q('The Seventh Generation Principle means…',['think about people far in the future','have seven children','plant seven trees'],'think about people far in the future'),R.tf('All early societies were perfect for the environment.',false)],
 tries:[['Name one Indigenous practice Canada could use today.','e.g. take only what you need'],['Plan a waste-free lunch.','reusable box, cloth napkin, no wrappers']]});

/* 10 ─ Natural events */
U({id:'t10',title:'Floods, droughts and natural events',strand:'Early Societies',codes:['A3.4','A3.5'],
 guide:{goal:'Describe important physical features and natural events (floods, droughts, volcanoes, harsh winters) in early societies and how they affected food production and survival.',words:'natural event, drought, flood, volcano, famine, adapt',ask:['Why could a weak Nile flood cause hunger?','How did Pompeii change in one day?','How did Arctic people prepare for winter?'],home:'Find out what natural events happen in your province.'},
 watch:['Nature can help or harm!','A good flood brought food to Egypt, but a weak one brought famine.'],
 fig:'A volcano erupting over an ancient town.',
 page:{story:{title:'When Nature Changes the Story',text:'In *Ancient Egypt*, people measured the Nile’s rise with a *Nilometer*: steps cut into the riverbank. "Too *little* water means *drought* and *famine*," said the priest. "Too *much* floods our villages." Far away in *79 CE*, the volcano *Vesuvius* erupted and buried the Roman town of *Pompeii* in ash in a single day. In the *Arctic*, the Thule stored *dried meat* in stone caches to survive long, dark *winters*. "Every society had to *adapt* to nature," said Ms. Ng. "Today we have weather forecasts, but floods and droughts still affect farmers in *Canada*."',pics:['river','volcano','igloo','teacher'],
   acts:[[null,'egypt',['river','man'],'Measure the Nile!'],['drought','desert',['sun','cactus'],'No water, no food.'],['Vesuvius','mountain',['volcano:big'],'Buried in ash!'],['winters','arctic',['igloo','snowflake'],'Store food for winter.']]},
  boxes:[{title:'Natural events',lines:['*flood*: too much water','*drought*: too little rain','*volcano*: lava and ash','*harsh winters*: cold, little food','can cause *famine* (lack of food)']},
   {title:'How people adapted',lines:['Egypt: *Nilometers*, storing grain','China: *dikes* along the Yellow River','Thule: *food caches*, warm clothing','Canada today: forecasts, dams, crop insurance']}],
  cards:[{q:'What did a Nilometer measure?',a:'how high the *Nile* rose'},{q:'What buried Pompeii?',a:'*ash* from Mount Vesuvius'}],
  words:[['drought','a long time with little or no rain'],['famine','a time when there is not enough food']]},
 steps:[
  {say:'Read the story',speech:'Egyptians measured the Nile to predict floods or drought. Vesuvius buried Pompeii in one day. The Thule stored dried meat for winter.',set:S.row(['river','volcano','igloo','teacher'])},
  {say:'Too much or too little',speech:'A flood brings too much water. A drought brings too little. Either one can ruin crops and cause hunger.',set:S.row(['droplet','sun','corn'],{labels:['flood','drought','crops']}),
   cues:[['A flood','droplet','too much'],['A drought','sun','too little'],['ruin crops','corn','famine']]},
  {say:'Adapting',speech:'Egyptians stored grain in big granaries. The Chinese built dikes to hold back the Yellow River. The Thule hid food in stone caches.',set:S.row(['jar','great wall','rock'],{labels:['granary','dikes','cache']}),
   cues:[['stored grain','jar','Egypt'],['built dikes','great wall','China'],['stone caches','rock','Thule']]}],
 more:{title:'Did you know?',text:'In *1954*, *Hurricane Hazel* caused terrible floods in *Toronto*. Afterward, the city stopped building homes in river valleys and turned them into *parks*.',pics:['cloud','park']},
 rounds:[R.q('A long time with little rain is a…',['drought','flood','volcano'],'drought'),R.q('What did a Nilometer measure?',['the height of the Nile','the size of pyramids','time'],'the height of the Nile'),
  R.q('What happened to Pompeii?',['buried by volcanic ash','flooded by the Nile','frozen'],'buried by volcanic ash'),R.q('How did the Thule survive winter?',['stored dried meat in caches','moved to Egypt','grew rice'],'stored dried meat in caches'),
  R.q('Not enough food for people is a…',['famine','feast','festival'],'famine'),R.q('What did China build along the Yellow River?',['dikes','pyramids','igloos'],'dikes'),
  R.q('Which natural event made Toronto build parks in river valleys?',['Hurricane Hazel','Vesuvius','a drought'],'Hurricane Hazel'),R.tf('Natural events still affect farmers in Canada today.',true)],
 tries:[['Which natural event could affect your town? How would you prepare?','e.g. ice storm: flashlight, food, water'],['Why was the Nile both helpful and dangerous?','floods brought silt but could destroy villages']]});

/* 11 ─ Governments compared */
U({id:'t11',title:'Who makes the rules?',strand:'Early Societies',codes:['A3.7','A3.8','A1.1'],
 guide:{goal:'Compare how a few early societies were governed (pharaoh, emperor, king and lords, Haudenosaunee Grand Council, Inuit camp leaders) and how social organization affected people’s rights.',words:'government, ruler, council, consensus, democracy, rights',ask:['Who made decisions in Ancient Egypt?','How did the Haudenosaunee make decisions?','How do Canadians choose leaders today?'],home:'Hold a family vote on what to have for dinner. Is everyone happy with the result?'},
 watch:['One ruler or many voices?','A pharaoh ruled alone. The Haudenosaunee Grand Council talked until everyone agreed.'],
 fig:'Rulers and councils from different societies.',
 page:{story:{title:'The Class Council',text:'Ms. Rivera’s class had to choose a *field trip*. "Let’s try different *governments*," she said. First, she acted like a *pharaoh*: "We go to the museum. No discussion!" The class groaned. Next, the class tried a *medieval* system: four “lords” decided for everyone else. Then they tried the *Haudenosaunee* way: everyone sat in a circle and talked until they reached *consensus*, an agreement everyone could accept. It took a long time, but everyone felt heard. Last, they *voted*, like Canadians do in a *democracy*. "The *science centre* wins!" said Jai.',pics:['crown','castle','teacher','boy'],
   acts:[[null,'classroom',['teacher','crown'],'No discussion!'],['lords','castle',['castle','knight'],'Four lords decide.'],['circle','nation',['fire','feather'],'Everyone is heard.'],['voted','classroom',['boy','girl'],'Science centre!']]},
  boxes:[{title:'Ways of governing',lines:['*Egypt*: pharaoh, one ruler with total power','*China*: emperor and officials','*Medieval Europe*: king, lords, knights','*Haudenosaunee*: Grand Council, *consensus*, Clan Mothers','*Inuit camps*: respected elders and skilled hunters guided']},
   {title:'Canada today',lines:['*democracy*: citizens vote','elected leaders make laws','the *Charter of Rights and Freedoms* protects everyone']}],
  cards:[{q:'What is consensus?',a:'an agreement *everyone* can accept'},{q:'Who guided Inuit camps?',a:'respected *elders* and skilled hunters'}],
  words:[['government','the people and system that make and enforce rules'],['consensus','a decision everyone in a group agrees to']]},
 steps:[
  {say:'Read the story',speech:'The class tried a pharaoh, then lords, then a Haudenosaunee council circle, then a vote. Everyone felt heard in the circle and in the vote.',set:S.row(['crown','castle','teacher','boy'])},
  {say:'One ruler',speech:'A pharaoh or an emperor had almost all the power. People had to obey, and few had a say.',set:S.row(['crown','sphinx','great wall'],{labels:['ruler','pharaoh','emperor']}),
   cues:[['A pharaoh','sphinx','Egypt'],['an emperor','great wall','China']]},
  {say:'Many voices',speech:'The Haudenosaunee Grand Council talked until everyone agreed. Inuit camps listened to wise elders. Canadians vote for their leaders.',set:S.row(['feather','grandpa','flag'],{labels:['council','elders','vote']}),
   cues:[['Grand Council','feather','consensus'],['wise elders','grandpa','Inuit'],['vote','flag','democracy']]}],
 more:{title:'Did you know?',text:'*Ancient Athens* in Greece is often called the birthplace of *democracy*, around *500 BCE*. But only free men could vote: not women, not enslaved people.',pics:['temple']},
 rounds:[R.q('Who ruled Ancient Egypt with total power?',['the pharaoh','a council','the people'],'the pharaoh'),R.q('A decision everyone agrees to is…',['consensus','a decree','a tax'],'consensus'),
  R.q('How did the Haudenosaunee Grand Council decide?',['talking until all agreed','one person decided','flipping a coin'],'talking until all agreed'),R.q('Who guided Inuit camps?',['elders and skilled hunters','a pharaoh','an emperor'],'elders and skilled hunters'),
  R.q('Canada is a…',['democracy','pharaoh-ruled kingdom','feudal system'],'democracy'),R.q('Which way took the longest in the story?',['the council circle','the pharaoh','the vote'],'the council circle'),
  R.q('Where did the class go in the end?',['the science centre','the museum','the zoo'],'the science centre'),R.tf('In Ancient Athens, everyone was allowed to vote.',false)],
 tries:[['Which system is fairest? Explain.','give 2 reasons'],['Compare a pharaoh and a prime minister.','born vs elected; total power vs shared']]});

/* 12 ─ Investigating the past: sources and maps */
U({id:'t12',title:'Investigating the past',strand:'Early Societies',codes:['A2.1','A2.2','A2.3','A2.4','A2.5','A2.6'],
 guide:{goal:'Ask questions, gather evidence from primary and secondary sources, read thematic maps, and draw conclusions about early societies and their environments.',words:'inquiry, primary source, secondary source, artifact, thematic map, legend, evidence',ask:['Is a 3 000-year-old pot a primary or secondary source?','What does a thematic map show?','How do archaeologists know how people lived?'],home:'Find a primary source at home: an old photo, letter or family object. What does it tell you?'},
 watch:['Be a history detective!','Artifacts are clues. Maps and books help us read them.'],
 fig:'An archaeologist with artifacts and a map.',
 page:{story:{title:'The Dig at Crawford Lake',text:'At *Crawford Lake* near Milton, Ontario, Grade 4 visited a rebuilt *Haudenosaunee village*. Archaeologist Dr. Martin showed them pieces of *pottery*, a *bone needle* and burnt *corn cobs*. "These are *artifacts*, *primary sources*: things made and used by people long ago." She opened a book about the village. "This is a *secondary source*: someone studied the artifacts and wrote about them." Then she showed a *thematic map* with a *legend*: green for *forests*, yellow for *cornfields*, blue for *water*. "Our *question* was: what did these people eat? The *evidence* says corn, beans, squash, fish and deer!"',pics:['map','pottery','woman','corn'],
   acts:[[null,'nation',['longhouse','girl'],'Crawford Lake!'],['artifacts','nation',['pottery','bone','corn'],'Primary sources!'],['thematic map','classroom',['map','woman'],'Read the legend!'],['evidence','nation',['corn','fish','deer'],'What did they eat?']]},
  boxes:[{title:'Sources',lines:['*primary*: made at the time: artifacts, diaries, photos, carvings','*secondary*: made later about the past: textbooks, websites, documentaries']},
   {title:'The inquiry process',lines:['1. ask a *question*','2. gather *evidence* from sources','3. organize it (charts, maps)','4. draw a *conclusion*','5. share what you learned']}],
  cards:[{q:'A textbook about Egypt is a…',a:'*secondary* source'},{q:'What does a map legend tell you?',a:'what the *colours* and *symbols* mean'}],
  words:[['artifact','an object made or used by people long ago'],['thematic map','a map that shows one topic, like crops, climate or population']]},
 steps:[
  {say:'Read the story',speech:'At Crawford Lake, the class saw pottery, a bone needle and corn cobs: primary sources. A book about the village was a secondary source. A thematic map showed forests, fields and water.',set:S.row(['map','pottery','woman','corn'])},
  {say:'Primary or secondary?',speech:'A clay pot made long ago is a primary source. A book written today about that pot is a secondary source.',set:S.sort(['primary','secondary'],[['pottery',0],['book',1],['bone',0],['computer',1]]),
   cues:[['A clay pot','pottery','primary'],['A book','book','secondary']]},
  {say:'Read the map',speech:'A thematic map shows one theme, like land use. The legend says green is forest, yellow is cornfield and blue is water.',set:S.row(['map','tree','corn','droplet'],{labels:['legend','forest','corn','water']}),
   cues:[['The legend','map','key'],['green is forest','tree','forest'],['yellow is cornfield','corn','fields'],['blue is water','droplet','water']]}],
 more:{title:'Did you know?',text:'Mud at the bottom of *Crawford Lake* has a layer for every year, going back over *1 000 years*. Scientists found corn pollen in the layers, proving people farmed there!',pics:['corn','droplet']},
 rounds:[R.q('An old clay pot is a…',['primary source','secondary source'],'primary source'),R.q('A website about Egypt is a…',['secondary source','primary source'],'secondary source'),
  R.q('What does a map legend show?',['what colours and symbols mean','the title','the date'],'what colours and symbols mean'),R.q('An object made by people long ago is an…',['artifact','legend','inquiry'],'artifact'),
  R.q('What was the class’s question?',['What did these people eat?','How tall was the longhouse?','Who was the chief?'],'What did these people eat?'),R.q('What is the first step of an inquiry?',['ask a question','draw a conclusion','share'],'ask a question'),
  R.q('A thematic map shows…',['one topic, like crops','every street','only rivers'],'one topic, like crops'),R.tf('Archaeologists use artifacts as evidence.',true)],
 tries:[['Write an inquiry question about Ancient China.','e.g. How did the Great Wall help China?'],['Name 2 primary sources about your own life.','photos, report cards, drawings']]});
})();
