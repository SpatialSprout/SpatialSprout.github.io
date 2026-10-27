/* The Interactive Classroom: Grade 1 Social Studies — Units 1–12: me, family, rules, community, travel, workers */
(function(){
"use strict";
const P=window.PM;if(!P||!P.unit)return;const U=P.unit,R=P.R,S=P.S;

/* 1 ─ This is me */
U({id:'o01',title:'This is me',strand:'Heritage and Identity',codes:['A1','A3'],
 guide:{goal:'Describe yourself: your name, what you look like, what you like, and who is important to you.',words:'me, name, favourite, special, unique',ask:['What makes you special?','What is your favourite game?'],home:'Make an "All About Me" poster with photos and drawings.'},
 watch:['All about me','Everyone is different. We each have a name, a look and things we love.'],
 fig:'Things that tell about me.',
 page:{intro:'We each have different things to tell about ourselves: who we are, where we live, what we look like and what we like.',
  boxes:[{title:'All about me',ex:[['child','my name'],['eyes','how I look'],['house','where I live'],['heart','what I love']],cols:4},
   {title:'My favourite things',ex:[['puzzle','game'],['ball','sport'],['pizza','food'],['crayon','colour']],cols:4}],
  cards:[{q:'Finish it: *My name is…*',pics:['child'],a:'*any name!*'},{q:'We are all…',pics:['family'],a:'*different, and special*'}],
  words:[['unique','one of a kind'],['favourite','the one you like best']]},
 steps:[
  {say:'About me',speech:'Every person has a name. We each look different. We live in different places, and we each love different things.',set:S.row(['child','eyes','house','heart'],{labels:['name','look','home','love']}),
   cues:[['has a name','child','name'],['look different','eyes','look'],['different places','house','home'],['different things','heart','love']]},
  {say:'Favourite things',speech:'Kai’s favourite game is puzzles. His favourite sport is soccer. His favourite food is pizza.',set:S.row(['puzzle','ball','pizza'],{labels:['game','sport','food']}),
   cues:[['game is puzzles','puzzle','game'],['sport is soccer','ball','sport'],['food is pizza','pizza','food']]},
  {say:'We are all different',speech:'Sort the favourites. Some are foods. Some are sports.',set:S.sort(['foods','sports'],[['pizza',0],['hockey',1],['apple',0],['basketball',1]]),
   cues:[['sort the favourites','*','sort','play']]}],
 rounds:[R.sort('Food or sport?',['food','sport'],[['pizza',0],['hockey',1],['apple',0],['basketball',1],['rice',0],['tennis',1]]),R.pick('Tap a *game* you could play.',['puzzle','bread','tree','bus'],'puzzle'),
  R.ask('Is everyone the same?',['family'],['no, everyone is unique','yes, all the same'],'no, everyone is unique'),R.pick('Tap something that shows *where you live*.',['house','apple','ball','star'],'house'),
  R.ask('What tells others who you are?',['child'],['my name','my shoes'],'my name'),R.sort('Things I can *see* about me, or things I *like*?',['how I look','what I like'],[['eyes',0,'brown eyes'],['pizza',1,'pizza'],['hair',0,'curly hair'],['music',1,'music']])],
 tries:[['Say three things about you.','*my name, my age, what I like*'],['How are you different from a friend?','*any good answer!*']]});

/* 2 ─ My life in a timeline */
U({id:'o02',title:'My life in a timeline',strand:'Heritage and Identity',codes:['A1','A2'],
 guide:{goal:'Use a timeline to show important events in your life in the order they happened.',words:'timeline, past, present, order, birthday, year',ask:['What did you learn to do when you were a baby?','What comes first on a timeline?'],home:'Make a timeline with family photos from baby to now.'},
 watch:['A timeline','Born, first tooth, first steps, first day of school: a timeline shows things in order.'],
 fig:'Events of a life, in order on a timeline.',
 page:{intro:'A *timeline* shows when things happened, in *order*. It starts with the first thing, on the left.',
  boxes:[{title:'Growing up',ex:[['baby','born'],['tooth','first tooth'],['walker','first steps'],['school','school']],cols:4,note:'first  →  next  →  then  →  now'}],
  cards:[{q:'Which came first?',pics:['walker','baby'],o:[1],a:'being a *baby*'},{q:'Now I can…',pics:['cyclist'],a:'*ride a bike!*'}],
  words:[['timeline','a line that shows events in order'],['past','time that has already happened']]},
 steps:[
  {say:'A timeline',speech:'A timeline starts on the day you were born. Then a first tooth. Then first steps. Then the first day of school!',set:S.order(['baby','tooth','walker','school']),
   cues:[['day you were born','baby','birth'],['a first tooth','tooth','1 year'],['first steps','walker','2 years'],['first day of school','school','now']]},
  {say:'Past and now',speech:'Long ago you crawled. Now you can run and ride a bike! The past is on the left. Now is on the right.',set:S.order(['baby','runner','cyclist']),
   cues:[['you crawled','baby','past'],['ride a bike','cyclist','now']]},
  {say:'Put it in order',speech:'Put the events in order: tricycle, first day of school, skating lesson.',set:Object.assign(S.order(['cyclist','school','skates']),{labels:['tricycle','school','skating']}),
   cues:[['put the events in order','*','','play']]}],
 rounds:[R.order('Tap the timeline in order.',['baby','tooth','walker','school']),R.ask('What comes *first* on a timeline?',null,['the oldest event','the newest event'],'the oldest event'),
  R.order('Tap in order: baby, child, grown-up.',['baby','child','man']),R.ask('Which happened first?',['baby','school'],['being a baby','going to school'],'being a baby'),
  R.order('Tap in order: how a day goes.',['sunrise','school','sunset']),R.ask('A timeline shows events…',null,['in order','mixed up'],'in order')],
 tries:[['What is one thing you can do now that you could not do as a baby?','*walk, talk, read*…'],['When is your birthday?','*any date!*']]});

/* 3 ─ My family */
U({id:'o03',title:'My family',strand:'Heritage and Identity',codes:['A1','A3'],
 guide:{goal:'Know that families are different sizes and kinds, live in different homes, and share jobs to care for one another.',words:'family, home, care, share, job, chore',ask:['Who is in your family?','What job do you do at home?'],home:'Make a family job chart together.'},
 watch:['Families care','Families are big or small. People in a family take care of one another.'],
 fig:'Families, homes and family jobs.',
 page:{intro:'Some families are big and some are small. Whatever the size, people in a family *take care of one another*. Doing different jobs is one way to help.',
  boxes:[{title:'Homes',ex:[['house','house'],['office','apartment'],['hut','cabin'],['home','townhouse']],cols:4},
   {title:'Family jobs',ex:[['pancakes','make breakfast'],['dog','feed the pet'],['bed','make the bed'],['plate','wash dishes']],cols:4}],
  cards:[{q:'Families can be…',pics:['family','people'],a:'*big or small*'},{q:'A job you can do:',pics:['teddy'],a:'*tidy up toys*'}],
  words:[['family','people who love and care for each other'],['chore','a job at home']]},
 steps:[
  {say:'All kinds of families',speech:'Some families are big. Some families are small. Some have grandparents living with them.',set:S.row(['family','people','grandma'],{labels:['big','small','with Grandma']}),
   cues:[['families are big','family','big'],['are small','people','small'],['grandparents','grandma','grandparents']]},
  {say:'Homes',speech:'Families live in many kinds of homes: houses, apartments and cabins.',set:S.row(['house','office','hut'],{labels:['house','apartment','cabin']}),
   cues:[['houses','house','house'],['apartments','office','apartment'],['and cabins','hut','cabin']]},
  {say:'Sharing jobs',speech:'Everyone helps. Who makes breakfast? Who feeds the pet? Who makes the bed? Sharing jobs is a way to care.',set:S.row(['pancakes','dog','bed','plate'],{labels:['breakfast','feed pet','make bed','dishes']}),
   cues:[['makes breakfast','pancakes','job'],['feeds the pet','dog','job'],['makes the bed','bed','job'],['sharing jobs','*','care']]}],
 rounds:[R.pick('Tap a job a child can do at home.',['teddy','car','fire','tractor'],'teddy',{q:'Tap a job a child can do at home: *tidy up toys*.'}),R.ask('Are all families the same size?',['family'],['no','yes'],'no'),
  R.pick('Tap a kind of home.',['house','apple','bus','tree'],'house'),R.sort('A home job or a school job?',['home','school'],[['bed',0,'make bed'],['books',1,'read with class'],['dog',0,'feed pet'],['pencil',1,'do worksheet']]),
  R.ask('Why do family members share jobs?',null,['to take care of each other','to be bored'],'to take care of each other'),R.pick('Tap a job: *feed the pet*.',['dog','cake','tv','car'],'dog')],
 tries:[['Name a job you do at home.','*make my bed, set the table*…'],['Who is in your family?','*any answer!*']]});

/* 4 ─ Responsibilities and rules (1) */
U({id:'o04',title:'Rules and responsibilities',strand:'Heritage and Identity',codes:['A1','A3'],
 guide:{goal:'Know that we have responsibilities and rules at home, at school and in the community; some keep us safe, some help us work and play together.',words:'rule, responsibility, safe, fair',ask:['What is a rule at your school?','Why do we wear helmets?'],home:'Talk about one family rule. Why do we have it?'},
 watch:['Rules help us','Wear a helmet. Wait in line. Wash your hands. Rules keep us safe and fair.'],
 fig:'Rules at home, school and in the community.',
 page:{intro:'We have *responsibilities* and *rules* at home, at school and in our community. Some rules keep us *safe*. Others help us work and play *together*.',
  boxes:[{title:'Responsibilities',ex:[['cat','feed my cat'],['seedling','water plants'],['books','return library books']],cols:3},
   {title:'Rules',ex:[['helmet','wear a helmet'],['people','wait in line'],['soap','wash hands'],['no littering','no littering']],cols:4}],
  cards:[{q:'Which rule? Riding a bike…',pics:['bicycle'],a:'*wear a helmet*'},{q:'At the store…',pics:['shopping cart'],a:'*wait in line*'}],
  words:[['rule','what we should or should not do'],['responsibility','a job we are trusted to do']]},
 steps:[
  {say:'Responsibilities',speech:'A responsibility is a job we are trusted to do. I feed my cat. I water my plants. I return my library books.',set:S.row(['cat','seedling','books'],{labels:['feed cat','water plants','return books']}),
   cues:[['feed my cat','cat','job'],['water my plants','seedling','job'],['library books','books','job']]},
  {say:'Rules keep us safe',speech:'Rules keep us safe and fair. Wear a helmet. Wait in line. Wash your hands. Do not litter.',set:S.row(['helmet','people','soap','no littering'],{labels:['helmet','line','wash','no litter']}),
   cues:[['wear a helmet','helmet','safe'],['wait in line','people','fair'],['wash your hands','soap','healthy'],['do not litter','no littering','clean']]},
  {say:'Match the rule',speech:'Match each picture with its rule. Bike: wear a helmet. Park: no littering.',set:S.sort(['wear a helmet','no littering'],[['bicycle',0],['trash',1],['scooter',0],['park',1]]),
   cues:[['match each picture','*','match','play']]}],
 rounds:[R.ask('You ride a bike. Which rule?',['bicycle'],['wear a helmet','wash your hands'],'wear a helmet'),R.ask('You are in a park. Which rule?',['park'],['no littering','no talking'],'no littering'),
  R.ask('Before you eat, the rule is…',['soap'],['wash your hands','run fast'],'wash your hands'),R.pick('Tap a *responsibility*: feeding your pet.',['cat','car','rocket','robot'],'cat'),
  R.sort('Keeps us safe, or helps us be fair?',['safe','fair'],[['helmet',0,'helmet'],['people',1,'take turns'],['life jacket',0,'life jacket'],['helping hands',1,'share']]),R.ask('Why do we have rules?',null,['to keep us safe and fair','to be mean'],'to keep us safe and fair')],
 tries:[['Name a rule at school.','*walk in the hall, raise your hand*…'],['What is one responsibility you have?','*any good answer!*']]});

/* 5 ─ Rules (2): courtesy and change */
U({id:'o05',title:'Being courteous',strand:'Heritage and Identity',codes:['A1','A3'],
 guide:{goal:'Show courtesy (please, thank you, sorry, sharing, indoor voice) and know that rules can change when situations change.',words:'courteous, polite, please, thank you, sorry, share, change',ask:['What do you say when someone helps you?','Why might a rule change?'],home:'Have a polite-words day: count how many times you say please and thank you.'},
 watch:['Be courteous','Say please and thank you. Share. Use an indoor voice. Say sorry.'],
 fig:'Courteous ways to get along.',
 page:{intro:'Rules in the community help us get along. When we follow them, we are being *courteous*. Sometimes rules need to *change*, and we make new ones.',
  boxes:[{title:'Courteous ways',ex:[['pray','please'],['clap','thank you'],['helping hands','share'],['sad','sorry']],cols:4},
   {title:'Rules can change',text:'At home, the youngest goes first. When a *guest* comes, the *guest* goes first!',ex:[['child','youngest first'],['wave','guest first']],cols:2}],
  cards:[{q:'In the library, use…',pics:['books'],a:'*an indoor voice*'},{q:'In summer, wear…',pics:['sun'],a:'*sunscreen*, not mittens'}],
  words:[['courteous','polite and kind'],['change','become different']]},
 steps:[
  {say:'Courteous words',speech:'Courteous people say please and thank you. They share. When they make a mistake, they say sorry.',set:S.row(['pray','clap','helping hands','sad'],{labels:['please','thank you','share','sorry']}),
   cues:[['say please','pray','please'],['thank you','clap','thank you'],['they share','helping hands','share'],['say sorry','sad','sorry']]},
  {say:'Polite or not?',speech:'Sort. Waiting in line is courteous. Pushing is not.',set:S.sort(['courteous','not courteous'],[['people',0,'wait in line'],['angry',1,'push'],['helping hands',0,'share'],['scared',1,'shout']]),
   cues:[['waiting in line','*','sort','play']]},
  {say:'Rules can change',speech:'When it is cold, the rule is wear mittens. When it is summer, the rule changes: wear sunscreen!',set:S.row(['mitten','sun'],{labels:['winter: mittens','summer: sunscreen']}),
   cues:[['wear mittens','mitten','winter'],['wear sunscreen','sun','summer']]}],
 rounds:[R.ask('Someone gives you a gift. You say…',['gift'],['thank you','go away'],'thank you'),R.sort('Courteous or not?',['courteous','not courteous'],[['people',0,'wait in line'],['angry',1,'grab toys'],['helping hands',0,'share'],['scared',1,'shout indoors'],['pray',0,'say please'],['sad',1,'push']]),
  R.ask('You bump into someone. You say…',['sad'],['sorry','hooray'],'sorry'),R.ask('A guest comes to play. Who goes first?',['wave'],['the guest','me always'],'the guest'),
  R.ask('It is summer now. The new rule is…',['sun'],['wear sunscreen','wear mittens'],'wear sunscreen'),R.ask('In the library, we use…',['books'],['an indoor voice','a loud voice'],'an indoor voice')],
 tries:[['What are two courteous words?','*please* and *thank you*'],['Why might bedtime change when you are older?','older kids need *less sleep*']]});

/* 6 ─ Responsibilities, rules and relationships */
U({id:'o06',title:'Caring for others',strand:'Heritage and Identity',codes:['A1','A3'],
 guide:{goal:'Know that responsibilities and rules help us build good relationships with people, pets and the community.',words:'relationship, care, respect, pet, community',ask:['How do you show you care for a pet?','How can a rule help a friendship?'],home:'Do one kind thing for a neighbour this week.'},
 watch:['Care builds friendships','Walk the dog on a leash. Ask politely. Help others. That builds good relationships.'],
 fig:'Caring for pets, people and places.',
 page:{intro:'Responsibilities and rules help us build *relationships*. If we have a pet, we take care of it and follow rules in public, like keeping dogs on a leash.',
  boxes:[{title:'Ways to care',ex:[['dog','walk the dog'],['helping hands','help a friend'],['trash','clean up'],['pray','ask politely']],cols:4},
   {title:'Park signs',ex:[['dog','keep dogs on leash'],['no littering','do not litter'],['duck','no feeding ducks']],cols:3}],
  cards:[{q:'Which question is courteous?',pics:['question'],a:'*Excuse me, did you see my dog?*'},{q:'A lost dog! Who helps?',pics:['dog','helping hands'],a:'*someone who looks with you*'}],
  words:[['relationship','how people (and pets) get along'],['respect','treat others with care']]},
 steps:[
  {say:'Caring for a pet',speech:'A pet needs care. Feed it, give it water, and walk it on a leash in the park.',set:S.row(['dog','bone','drop'],{labels:['walk','feed','water']}),
   cues:[['feed it','bone','feed'],['give it water','drop','water'],['on a leash','dog','leash']]},
  {say:'Park rules',speech:'Signs in the park tell us the rules: keep dogs on a leash, do not litter, do not feed the ducks.',set:S.row(['dog','no littering','duck'],{labels:['leash','no litter','no feeding']}),
   cues:[['keep dogs on a leash','dog','leash'],['do not litter','no littering','no litter'],['feed the ducks','duck','no feeding']]},
  {say:'Kind or unkind?',speech:'Sort the actions into kind and unkind.',set:S.sort(['kind','unkind'],[['helping hands',0,'help'],['angry',1,'yell'],['pray',0,'ask nicely'],['trash',1,'litter']]),
   cues:[['kind and unkind','*','sort','play']]}],
 rounds:[R.ask('Which is the courteous way to ask?',['question'],['Excuse me, did you see my dog?','Hey! Where is my dog?'],'Excuse me, did you see my dog?'),R.sort('Kind or unkind?',['kind','unkind'],[['helping hands',0,'help'],['angry',1,'yell'],['pray',0,'say please'],['trash',1,'litter'],['clap',0,'cheer'],['scared',1,'push']]),
  R.ask('Which sign tells dog owners to keep dogs close?',['dog'],['keep dogs on leash','no littering'],'keep dogs on leash'),R.pick('Tap a way to care for a pet.',['bone','candy','phone','car'],'bone'),
  R.ask('Being kind helps us…',null,['make friends','lose friends'],'make friends'),R.ask('You see litter in the park. What can you do?',['trash'],['put it in the bin','leave it'],'put it in the bin')],
 tries:[['How can you help a new student?','*show them around, play with them*'],['Name a rule for pets in a park.','*keep dogs on a leash*']]});

/* 7 ─ The community */
U({id:'o07',title:'Our community',strand:'People and Environments',codes:['B1','B3'],
 guide:{goal:'Describe the local community: a city, town, farm or seaside, and the places we share to live, work, play and learn.',words:'community, neighbour, city, town, farm, seaside',ask:['What kind of community do you live in?','Who are your neighbours?'],home:'Take a community walk. Name places you pass.'},
 watch:['Kinds of communities','A city has tall buildings. A farm has fields. A seaside town has boats.'],
 fig:'Different kinds of communities.',
 page:{intro:'Our *community* is the place we and our *neighbours* share. We may work, play and learn in our community.',
  boxes:[{title:'Kinds of communities',ex:[['city','downtown'],['farm','farm'],['beach','seaside'],['house','small town']],cols:4},
   {title:'Riddle',text:'*Our roads are many. Our buildings are tall. Museums and shops, there is something for all!* Where is it?',note:'downtown in a city!'}],
  cards:[{q:'Tractors and fields?',pics:['tractor','grass'],a:'a *farm*'},{q:'Boats and fish?',pics:['sailboat','fish'],a:'the *seaside*'}],
  words:[['community','a place where people live, work and play'],['neighbour','someone who lives near you']]},
 steps:[
  {say:'Kinds of communities',speech:'Some people live downtown in a city, with tall buildings. Some live on a farm. Some live by the seaside. Some live in a small town.',set:S.row(['city','farm','beach','house'],{labels:['city','farm','seaside','town']}),
   cues:[['in a city','city','city'],['on a farm','farm','farm'],['by the seaside','beach','seaside'],['small town','house','town']]},
  {say:'What belongs?',speech:'In the city we see buses and tall buildings. On a farm we see tractors and cows.',set:S.sort(['city','farm'],[['bus',0],['tractor',1],['office',0],['cow',1]]),
   cues:[['buses and tall buildings','bus|office','city','play'],['tractors and cows','tractor|cow','farm']]},
  {say:'Neighbours share',speech:'Neighbours share parks, schools and libraries in their community.',set:S.row(['park','school','library']),
   cues:[['parks,','park','share'],['schools','school','share'],['libraries','library','share']]}],
 rounds:[R.sort('City or farm?',['city','farm'],[['bus',0],['tractor',1],['office',0],['cow',1],['taxi',0],['barn',1]]),R.ask('Boats, a dock and fish: what community is it?',['sailboat'],['seaside','downtown','farm'],'seaside'),
  R.ask('*We grow food on the land.* What community is it?',['farm'],['farm','downtown'],'farm'),R.pick('Tap a place neighbours *share*.',['park','toothbrush','bed','socks'],'park'),
  R.ask('Who lives near you?',['house'],['neighbours','penguins'],'neighbours'),R.pick('Tap something you would see *downtown*.',['office','tractor','cow','barn'],'office')],
 tries:[['What kind of community do you live in?','*city, town, farm, seaside*…'],['Name a place you share with neighbours.','*park, school, library*']]});

/* 8 ─ The community up close */
U({id:'o08',title:'What a community needs',strand:'People and Environments',codes:['B1','B3'],
 guide:{goal:'Name what people in a community need (water, food, homes, health care, schools, safety) and places for fun and exercise.',words:'needs, services, health care, police, school, recreation',ask:['Where do people go when they are sick?','Where can you exercise in your community?'],home:'Find these on a walk: a school, a store, a park and a fire station.'},
 watch:['Community needs','Homes, food, schools, health care and safety: a community needs them all.'],
 fig:'Places that meet a community’s needs.',
 page:{intro:'People in a community need clean water, food, shelter and *services* that help them. They also need places for *fun* and *exercise*.',
  boxes:[{title:'Needs and services',ex:[['house','homes'],['store','food'],['hospital','health care'],['school','school'],['police car','police'],['post office','mail']],cols:6},
   {title:'Fun and exercise',ex:[['park','park'],['pool','pool'],['cinema','movies'],['rink','rink']],cols:4}],
  cards:[{q:'Where do you go to see a movie?',pics:['cinema'],a:'a *movie theatre*'},{q:'Where do you swim?',pics:['pool'],a:'a *pool*'}],
  words:[['service','work that helps people'],['recreation','things we do for fun']]},
 steps:[
  {say:'Needs',speech:'A community needs homes, food from stores, health care at a hospital, schools, and police to keep it safe.',set:S.row(['house','store','hospital','school','police car'],{labels:['homes','food','health','school','police']}),
   cues:[['homes,','house','homes'],['food from stores','store','food'],['at a hospital','hospital','health care'],['schools,','school','school'],['police','police car','safety']]},
  {say:'Fun and exercise',speech:'A community also needs places for fun: parks, pools, rinks and movie theatres.',set:S.row(['park','pool','rink','cinema']),
   cues:[['parks,','park','fun'],['pools','pool','swim'],['rinks','rink','skate'],['movie theatres','cinema','movies']]},
  {say:'Need or fun?',speech:'Sort the places: things we need, and places for fun.',set:S.sort(['need','fun'],[['hospital',0],['park',1],['store',0],['cinema',1]]),
   cues:[['sort the places','*','sort','play']]}],
 rounds:[R.ask('Where do you go to see a movie?',['cinema'],['a movie theatre','a hospital'],'a movie theatre'),R.ask('Where do people go for health care?',['hospital'],['a hospital','a pool'],'a hospital'),
  R.sort('Need or fun?',['need','fun'],[['hospital',0],['park',1],['store',0],['cinema',1],['school',0],['pool',1]]),R.pick('Tap where you could *swim*.',['pool','library','bank','store'],'pool'),
  R.pick('Tap who keeps a community *safe*.',['police car','tractor','taxi','bus'],'police car'),R.pick('Tap where you buy *food*.',['store','school','hospital','church'],'store')],
 tries:[['Name a place for fun in your community.','*park, pool, rink*'],['Where do you go when you are sick?','the *doctor* or *hospital*']]});

/* 9 ─ Out and about (1): travel */
U({id:'o09',title:'Getting around',strand:'People and Environments',codes:['B1','B2'],
 guide:{goal:'Name ways people travel in a community, and make a simple graph of how children get to school.',words:'travel, walk, bike, bus, car, taxi, graph',ask:['How do you get to school?','Which way of travel is best for the environment?'],home:'Count how many people walk past your home in 5 minutes.'},
 watch:['Ways to travel','Walk, bike, bus, car. We travel around our community in many ways.'],
 fig:'Ways to travel, and a graph of how we get to school.',
 page:{intro:'There are many ways to *travel* around a community. Children may travel to school in different ways. A *graph* lets us compare.',
  boxes:[{title:'Ways to travel',ex:[['walker','walk'],['bicycle','bike'],['school bus','bus'],['car','car'],['taxi','taxi'],['horse','horse']],cols:6},
   {title:'How we get to school',text:'Walk *5*, bike *3*, bus *7*, car *4*. Most children take the *bus*.'}],
  cards:[{q:'How does this person travel?',pics:['cyclist'],a:'by *bike*'},{q:'Fewest children…',pics:['bicycle'],a:'*bike*: 3'}],
  words:[['travel','go from one place to another'],['graph','a picture that compares numbers']]},
 steps:[
  {say:'Ways to travel',speech:'We can walk, ride a bike, take the bus, or go by car.',set:S.row(['walker','bicycle','school bus','car'],{labels:['walk','bike','bus','car']}),
   cues:[['we can walk','walker','walk'],['ride a bike','bicycle','bike'],['take the bus','school bus','bus'],['by car','car','car']]},
  {say:'A travel graph',speech:'Five children walk. Three bike. Seven take the bus. Four come by car. The bus has the most.',set:{custom:'graph',cats:['walker','bicycle','school bus','car'],v:[5,3,7,4],labels:['walk','bike','bus','car']},
   cues:[['five children walk','walker','5'],['three bike','bicycle','3'],['seven take the bus','school bus','7'],['the bus has the most','school bus','most!']]},
  {say:'Sort the travel',speech:'Some ways use a motor, like a car and a bus. Some use our muscles, like walking and biking.',set:S.sort(['motor','muscles'],[['car',0],['walker',1],['school bus',0],['bicycle',1]]),
   cues:[['use a motor','car|school bus','motor'],['use our muscles','walker|bicycle','muscles','play']]}],
 rounds:[R.ask('How do most children get to school?',null,['bus','bike','walk'],'bus',{set:{custom:'graph',cats:['walker','bicycle','school bus','car'],v:[5,3,7,4],labels:['walk','bike','bus','car']}}),
  R.ask('How many children walk?',null,['5','3','7'],'5',{set:{custom:'graph',cats:['walker','bicycle','school bus','car'],v:[5,3,7,4],labels:['walk','bike','bus','car']}}),
  R.pick('Tap the way to travel that uses *no motor*.',['bicycle','car','school bus','taxi'],'bicycle'),R.sort('Motor or muscles?',['motor','muscles'],[['car',0],['walker',1],['school bus',0],['bicycle',1],['taxi',0],['scooter',1]]),
  R.ask('Which way of travel has the fewest children?',null,['bike','bus'],'bike',{set:{custom:'graph',cats:['walker','bicycle','school bus','car'],v:[5,3,7,4],labels:['walk','bike','bus','car']}}),R.pick('Tap a *taxi*.',['taxi','bus','tractor','train'],'taxi')],
 tries:[['How do you get to school?','*walk, bus, car, bike*…'],['Which is better for the air: biking or driving?','*biking*']]});

/* 10 ─ Out and about (2): signs */
U({id:'o10',title:'Signs keep us safe',strand:'People and Environments',codes:['B1','B2'],
 guide:{goal:'Read common safety signs (stop, crosswalk, walk signal, no bikes, wet floor) and know why we follow them.',words:'sign, stop, crosswalk, signal, safe',ask:['What does a stop sign tell drivers?','When is it safe to cross the road?'],home:'Spot five safety signs on your next walk.'},
 watch:['Read the signs','Stop sign: cars stop. Walk signal: we cross. Signs keep us safe.'],
 fig:'Safety signs and what they mean.',
 page:{intro:'We need to follow *signs* when we travel around our community. They are there to keep us *safe*.',
  boxes:[{title:'Safety signs',ex:[['stop sign','stop'],['crossing','crosswalk'],['traffic light','walk signal'],['no bikes','no bikes'],['warning','careful!']],cols:5}],
  cards:[{q:'I cross only when this is on:',pics:['traffic light'],a:'the *walk signal*'},{q:'Cars must…',pics:['stop sign'],a:'*stop*'}],
  words:[['sign','a picture or word that tells us what to do'],['crosswalk','a safe place to cross the street']]},
 steps:[
  {say:'Road signs',speech:'A stop sign tells cars to stop. A crosswalk is a safe place to cross. A walk signal tells us when to go.',set:S.row(['stop sign','crossing','traffic light'],{labels:['stop','crosswalk','walk signal']}),
   cues:[['stop sign tells','stop sign','stop'],['a crosswalk','crossing','cross here'],['walk signal','traffic light','go']]},
  {say:'More signs',speech:'No bikes means do not ride here. A warning sign says be careful, like on a wet floor.',set:S.row(['no bikes','warning'],{labels:['no bikes','careful']}),
   cues:[['no bikes','no bikes','no bikes'],['warning sign','warning','careful']]},
  {say:'Match the sign',speech:'Match each sign with what to do.',set:S.sort(['stop','careful'],[['stop sign',0,'stop sign'],['warning',1,'wet floor'],['police officer',0,'crossing guard'],['construction',1,'work zone']]),
   cues:[['match each sign','*','match','play']]}],
 rounds:[R.ask('What does a stop sign tell drivers?',['stop sign'],['stop','go fast'],'stop'),R.pick('Tap the sign that means *do not ride your bike here*.',['no bikes','stop sign','crossing','parking'],'no bikes'),
  R.pick('Tap the safe place to *cross the road*.',['crossing','construction','fuel','parking'],'crossing'),R.ask('When is it safe to cross?',['traffic light'],['when the walk signal is on','any time'],'when the walk signal is on'),
  R.ask('The floor is wet. The sign says…',['warning'],['walk carefully','run'],'walk carefully'),R.pick('Tap the *stop* sign.',['stop sign','no bikes','warning','wheelchair'],'stop sign')],
 tries:[['Make a new sign for your school. What does it say?','*any good answer!*'],['What do you do at a stop sign when walking?','*stop, look both ways*']]});

/* 11 ─ Working in the community */
U({id:'o11',title:'Jobs in the community',strand:'People and Environments',codes:['B1','B3'],
 guide:{goal:'Name jobs in the community and what each worker does.',words:'job, worker, community, help',ask:['Who delivers mail?','What job would you like?'],home:'Ask a grown-up about their job. What do they do all day?'},
 watch:['People at work','A baker bakes bread. A driver drives the bus. A mail carrier brings letters.'],
 fig:'Community workers and their jobs.',
 page:{intro:'There are many different *jobs* in a community. Workers help each other and help us.',
  boxes:[{title:'Who does it?',ex:[['baker','bakes bread'],['school bus','drives a bus'],['construction worker','fixes buildings'],['letter','carries mail'],['garbage truck','collects garbage'],['chef','makes pizza']],cols:3,big:true}],
  cards:[{q:'Who cuts hair?',pics:['scissors','comb'],a:'a *hair stylist*'},{q:'Who works outdoors?',pics:['farmer'],a:'a *farmer*'}],
  words:[['job','work someone does'],['worker','a person who does a job']]},
 steps:[
  {say:'Workers in town',speech:'A baker bakes bread. A construction worker fixes buildings. A chef makes pizza. A farmer grows food.',set:S.row(['baker','construction worker','chef','farmer'],{labels:['baker','builder','chef','farmer']}),
   cues:[['baker bakes bread','baker','bread'],['fixes buildings','construction worker','build'],['makes pizza','chef','pizza'],['grows food','farmer','food']]},
  {say:'Tools of the job',speech:'Each worker uses tools. A builder uses a hammer. A hair stylist uses scissors and a comb.',set:S.row(['hammer','scissors','comb']),
   cues:[['uses a hammer','hammer','builder'],['scissors and a comb','scissors|comb','stylist']]},
  {say:'Match the worker',speech:'Match each tool with its worker.',set:S.sort(['builder','chef'],[['hammer',0],['pot',1],['saw',0],['spoon',1]]),
   cues:[['match each tool','*','match','play']]}],
 rounds:[R.ask('Who bakes bread?',['bread'],['a baker','a pilot'],'a baker'),R.pick('Tap the worker who grows food.',['farmer','pilot','doctor','judge'],'farmer'),
  R.sort('Builder’s tool or chef’s tool?',['builder','chef'],[['hammer',0],['pot',1],['saw',0],['spoon',1],['ladder',0],['fork',1]]),R.ask('Who drives a bus?',['school bus'],['a bus driver','a farmer'],'a bus driver'),
  R.pick('Tap the worker who fixes buildings.',['construction worker','chef','nurse','artist'],'construction worker'),R.ask('I use a comb and scissors to do my job. Who am I?',['scissors'],['a hair stylist','a pilot'],'a hair stylist')],
 tries:[['What job would you like to do? Why?','*any good answer!*'],['Who delivers letters?','a *mail carrier*']]});

/* 12 ─ Service workers */
U({id:'o12',title:'Workers make things',strand:'People and Environments',codes:['B1','B3'],
 guide:{goal:'Match workers with the things they make or the services they give: a farmer and milk, a chef and food, a potter and a vase.',words:'product, service, make, give',ask:['What does a farmer make?','What service does a teacher give?'],home:'Look at your lunch. Which workers helped make it?'},
 watch:['Workers and products','A farmer gives us milk. A chef cooks a meal. A builder builds a house.'],
 fig:'Workers and the things they make.',
 page:{intro:'Workers in a community *make* many different things, and give *services* that help us.',
  boxes:[{title:'Workers and what they make',ex:[['farmer','milk'],['chef','meals'],['construction worker','houses'],['artist','paintings']],cols:4},
   {title:'Services',ex:[['teacher','teaching'],['doctor','health care'],['cashier','selling']],cols:3}],
  cards:[{q:'A farmer gives us…',pics:['milk','egg'],a:'*milk and eggs*'},{q:'A teacher gives…',pics:['teacher'],a:'*lessons*'}],
  words:[['product','something that is made'],['service','work that helps people']]},
 steps:[
  {say:'What workers make',speech:'A farmer gives us milk. A chef cooks meals. A builder makes houses. An artist makes paintings.',set:S.row(['milk','spaghetti','house','paintbrush'],{labels:['farmer','chef','builder','artist']}),
   cues:[['gives us milk','milk','farmer'],['cooks meals','spaghetti','chef'],['makes houses','house','builder'],['makes paintings','paintbrush','artist']]},
  {say:'Services help us',speech:'Some workers give services. A teacher teaches. A doctor helps us stay healthy. A cashier helps us buy things.',set:S.row(['teacher','doctor','cashier']),
   cues:[['a teacher teaches','teacher','teaching'],['a doctor','doctor','health'],['a cashier','cashier','selling']]},
  {say:'Match them',speech:'Match the worker to what they make.',set:S.sort(['farmer','chef'],[['milk',0],['spaghetti',1],['egg',0],['pizza',1]]),
   cues:[['match the worker','*','match','play']]}],
 rounds:[R.ask('What does a farmer give us?',['farmer'],['milk','cars','books'],'milk'),R.sort('Farmer or chef?',['farmer','chef'],[['milk',0],['spaghetti',1],['egg',0],['pizza',1],['corn',0],['soup',1]]),
  R.pick('Tap the worker who gives *health care*.',['doctor','chef','artist','farmer'],'doctor'),R.ask('Who makes paintings?',['paintbrush'],['an artist','a pilot'],'an artist'),
  R.pick('Tap the worker who *teaches*.',['teacher','baker','farmer','mechanic'],'teacher'),R.ask('Who builds houses?',['house'],['a construction worker','a chef'],'a construction worker')],
 tries:[['Which workers helped make your lunch?','*farmer, baker, truck driver, cashier*…'],['What service does a librarian give?','helps us *find books*']]});
})();
