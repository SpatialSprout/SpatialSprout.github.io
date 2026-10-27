/* The Interactive Classroom: Grade 1 Science — Units 1–8: bodies, senses, living things, needs, movement, patterns, healthy eating */
(function(){
"use strict";
const P=window.PM;if(!P||!P.unit)return;const U=P.unit,R=P.R,S=P.S;

/* 1 ─ My body */
U({id:'s01',title:'My body',strand:'Life Systems',codes:['B1','B2'],
 guide:{goal:'Name the main parts of the human body and tell what each part helps us do.',words:'body, head, arms, hands, legs, feet, fingers, toes',ask:['Which body part helps you kick a ball?','What do you use to hold a crayon?'],home:'Play "Simon says" with body parts: touch your knees, wave your hand…'},
 watch:['Body parts at work','Hands hold. Legs run. Feet kick. Each part of the body has a job.'],
 fig:'Body parts and the jobs they do.',
 page:{intro:'Our bodies have many useful parts. We use different parts of our body to do different things.',
  boxes:[{title:'Parts of the body',ex:[['head','head'],['arm','arm'],['hand','hand'],['leg','leg'],['foot','foot'],['finger','finger']],cols:6},
   {title:'Parts do jobs',text:'We *see* with our eyes, *hold* with our hands, *walk* with our legs and *kick* with our feet.',ex:[['runner','legs: run'],['ball','feet: kick'],['drum','hands: drum']],cols:3}],
  cards:[{q:'I jump with my…',pics:['leg'],a:'*legs*'},{q:'I clap with my…',pics:['clap'],a:'*hands*'}],
  words:[['body part','one part of the body, like an arm'],['joint','where the body bends: knees, elbows']]},
 steps:[
  {say:'Parts of the body',speech:'Point to each part. Head. Arm. Hand. Leg. Foot. Our bodies have many useful parts.',set:S.row(['head','arm','hand','leg','foot']),
   cues:[['head.','head','head'],['arm.','arm','arm'],['hand.','hand','hand'],['leg.','leg','leg'],['foot.','foot','foot']]},
  {say:'Each part has a job',speech:'We use our legs to run. We use our feet to kick a ball. We use our hands to play a drum.',set:S.row(['runner','ball','drum'],{labels:['run','kick','drum']}),
   cues:[['legs to run','runner','legs'],['feet to kick','ball','feet'],['hands to play','drum','hands']]},
  {say:'Match the job',speech:'Which part do we use to clap? Our hands! Sort the jobs into hands and feet.',set:S.sort(['hands','feet'],[['clap',0,'clap'],['ball',1,'kick'],['paintbrush',0,'paint'],['runner',1,'run']]),
   cues:[['our hands','clap','hands'],['hands and feet','*','sort','play']]}],
 rounds:[R.pick('Tap the body part we use to *hear*.',['ear','foot','hand','leg'],'ear'),R.pick('Tap the body part we use to *kick* a ball.',['foot','ear','eye','nose'],'foot'),
  R.sort('Which body part does the job? Sort them.',['hands','legs and feet'],[['clap',0,'clap'],['runner',1,'run'],['paintbrush',0,'paint'],['ball',1,'kick'],['writing',0,'write'],['dancer',1,'dance']]),
  R.pick('Tap the body part we use to *hold* a pencil.',['hand','foot','nose','ear'],'hand'),R.ask('I drum with my…',['drum'],['hands','ears','nose'],'hands'),R.pick('Tap the body part we use to *run*.',['leg','arm','eye','mouth'],'leg')],
 tries:[['Which body part helps you smell?','your *nose*'],['Name a body part that bends.','*knee, elbow, finger*…']]});

/* 2 ─ Five senses */
U({id:'s02',title:'Five senses',strand:'Life Systems',codes:['B2'],
 guide:{goal:'Name the five senses and the sense organs: eyes (sight), ears (hearing), nose (smell), tongue (taste) and skin (touch).',words:'senses, sight, hearing, smell, taste, touch, eyes, ears, nose, tongue, skin',ask:['Which sense tells you a cake is sweet?','How do you know the stove is hot without touching it?'],home:'Go on a sense walk: name one thing you see, hear, smell, taste and touch.'},
 watch:['The five senses','Eyes see. Ears hear. Nose smells. Tongue tastes. Skin feels.'],
 fig:'Five sense organs and what they tell us.',
 page:{intro:'Our bodies have sense organs. With them we can see, hear, smell, taste and touch.',
  boxes:[{title:'Five senses',ex:[['eye','sight'],['ear','hearing'],['nose','smell'],['tongue','taste'],['hand','touch']],cols:5},
   {title:'What can we sense?',ex:[['rainbow','see colours'],['bell','hear a bell'],['rose','smell a rose'],['lemon','taste sour'],['teddy','feel soft']],cols:5}],
  cards:[{q:'Which sense? *a loud drum*',pics:['drum','ear'],a:'*hearing*'},{q:'Which sense? *sweet ice cream*',pics:['ice cream','tongue'],a:'*taste*'}],
  words:[['sense','a way our body learns about the world'],['sense organ','the body part we use for a sense']]},
 steps:[
  {say:'Five sense organs',speech:'We have five senses. We see with our eyes. We hear with our ears. We smell with our nose. We taste with our tongue. We touch with our skin.',set:S.row(['eye','ear','nose','tongue','hand'],{labels:['sight','hearing','smell','taste','touch']}),
   cues:[['with our eyes','eye','sight'],['with our ears','ear','hearing'],['with our nose','nose','smell'],['with our tongue','tongue','taste'],['with our skin','hand','touch']]},
  {say:'What do we sense?',speech:'We see a rainbow. We hear a bell. We smell a rose. We taste a sour lemon.',set:S.row(['rainbow','bell','rose','lemon']),
   cues:[['see a rainbow','rainbow','see'],['hear a bell','bell','hear'],['smell a rose','rose','smell'],['sour lemon','lemon','taste']]},
  {say:'Sort by sense',speech:'Sort things we hear and things we smell. A drum and a bell we hear. A flower and soap we smell.',set:S.sort(['hear','smell'],[['drum',0],['rose',1],['bell',0],['soap',1]]),
   cues:[['things we hear','drum|bell','hear','play'],['we smell','rose|soap','smell']]}],
 rounds:[R.pick('Tap the sense organ for *hearing*.',['ear','eye','nose','tongue'],'ear'),R.pick('Tap the sense organ for *taste*.',['tongue','ear','hand','eye'],'tongue'),
  R.sort('Which sense? *see* or *hear*?',['see','hear'],[['rainbow',0],['bell',1],['star',0],['drum',1],['tv',0],['music',1]]),R.ask('Which sense tells you ice cream is sweet?',['ice cream'],['taste','hearing','sight'],'taste'),
  R.pick('Tap the sense organ for *smell*.',['nose','hand','ear','eye'],'nose'),R.ask('Which sense tells you a teddy bear is soft?',['teddy'],['touch','smell','hearing'],'touch')],
 tries:[['Which sense organ tells you a lemon is sour?','your *tongue*'],['Name something you can smell.','*flowers, cookies, soap*…']]});

/* 3 ─ Senses at work */
U({id:'s03',title:'Our senses at work',strand:'Life Systems',codes:['B1','B2'],
 guide:{goal:'Use the senses to learn about the world and stay safe, and protect our sense organs.',words:'safe, protect, warn, sunglasses, earmuffs',ask:['How does a smoke alarm keep us safe?','How can we protect our eyes in the sun?'],home:'Find things at home that protect senses: sunglasses, oven mitts, earplugs.'},
 watch:['Senses keep us safe','A smoke alarm beeps: our ears warn us. Sunglasses protect our eyes.'],
 fig:'Senses that warn us, and ways to protect them.',
 page:{intro:'Our senses tell us all about the world. They also help keep us safe. We must protect our sense organs too.',
  boxes:[{title:'Senses keep us safe',ex:[['alarm clock','hear an alarm'],['fire','see smoke'],['hot face','feel heat']],cols:3},
   {title:'Protect your senses',ex:[['sunglasses','eyes'],['helmet','head'],['gloves','hands'],['hat','skin']],cols:4}],
  cards:[{q:'Which one does not belong? (sense of hearing)',pics:['drum','bell','book'],x:[2],a:'*book*: we see it'},{q:'Protect your eyes from the sun:',pics:['sunglasses'],a:'*sunglasses*'}],
  words:[['protect','keep safe from harm'],['warn','tell us about danger']]},
 steps:[
  {say:'Senses warn us',speech:'Our senses keep us safe. We hear a fire alarm. We see smoke. We feel when something is too hot.',set:S.row(['alarm clock','fire','hot face'],{labels:['hear','see','feel']}),
   cues:[['hear a fire alarm','alarm clock','hear'],['see smoke','fire','see'],['too hot','hot face','feel']]},
  {say:'Protect your senses',speech:'Sunglasses protect our eyes. A helmet protects our head. Gloves protect our hands. A hat protects our skin from the sun.',set:S.row(['sunglasses','helmet','gloves','hat']),
   cues:[['protect our eyes','sunglasses','eyes'],['protects our head','helmet','head'],['protect our hands','gloves','hands'],['from the sun','hat','skin']]},
  {say:'Which one does not belong?',speech:'We hear a drum and a bell. A book we see, not hear. It does not belong with hearing.',set:S.row(['drum','bell','book'],{cross:2}),
   cues:[['a drum and a bell','drum|bell','hear'],['does not belong','book','✗','x']]}],
 rounds:[R.pick('Sense of *sight*: tap the one that does *not* belong.',['rainbow','star','book','bell'],'bell'),R.pick('Tap what protects your *eyes* from the sun.',['sunglasses','gloves','socks','scarf'],'sunglasses'),
  R.pick('Tap what protects your *head* on a bike.',['helmet','glasses','mitten','shoe'],'helmet'),R.ask('A smoke alarm beeps. Which sense warns you?',['alarm clock'],['hearing','taste','smell'],'hearing'),
  R.sort('Which sense? *taste* or *touch*?',['taste','touch'],[['lemon',0],['teddy',1],['candy',0],['ice',1],['pizza',0],['cactus',1]]),R.pick('Sense of *hearing*: tap the one that does *not* belong.',['drum','guitar','trumpet','rainbow'],'rainbow')],
 tries:[['How do your ears keep you safe crossing the street?','I can *hear* cars coming.'],['What protects your hands from snow?','*mittens*']]});

/* 4 ─ Living things grow */
U({id:'s04',title:'Living things grow',strand:'Life Systems',codes:['B2'],
 guide:{goal:'Know that living things grow and change, and make young of their own.',words:'living, grow, change, young, life cycle',ask:['How have you changed since you were a baby?','What does a chick grow into?'],home:'Look at baby photos. What has changed? What has stayed the same?'},
 watch:['Watch it grow','Egg, chick, hen. A living thing grows and changes.'],
 fig:'Living things grow up in order.',
 page:{intro:'Living things *grow* and *change*. Living things also make *young*, like themselves.',
  boxes:[{title:'Growing up',ex:[['egg','egg'],['hatching','hatching'],['chick','chick'],['chicken','hen']],cols:4},
   {title:'Young and grown-up',ex:[['baby','baby → adult'],['puppy','puppy → dog'],['seedling','seed → tree']],cols:3}],
  cards:[{q:'Put in order:',pics:['seedling','herb','sunflower'],a:'seed → sprout → flower'},{q:'What does a caterpillar become?',pics:['caterpillar'],a:'a *butterfly*'}],
  words:[['living thing','something that grows, needs food and water, and has young'],['young','a baby animal or plant']]},
 steps:[
  {say:'From egg to hen',speech:'First there is an egg. Next, a chick hatches. The chick grows and grows. Last, it is a hen that lays eggs of its own.',set:S.order(['egg','hatching','chick','chicken']),
   cues:[['an egg','egg','1'],['chick hatches','hatching','2'],['grows and grows','chick','3'],['it is a hen','chicken','4']]},
  {say:'Young become grown-ups',speech:'A baby grows into an adult. A puppy grows into a dog. A seed grows into a plant.',set:S.row(['baby','puppy','seedling'],{labels:['baby → adult','puppy → dog','seed → plant']}),
   cues:[['a baby grows','baby','grows'],['a puppy grows','puppy','grows'],['a seed grows','seedling','grows']]},
  {say:'Order the growth',speech:'Put the plant in order. Seed, sprout, flower.',set:Object.assign(S.order(['seedling','herb','sunflower']),{labels:['seed','sprout','flower']}),
   cues:[['put the plant in order','*','','play']]}],
 rounds:[R.order('Tap in order: how a chick grows.',['egg','hatching','chick','chicken']),R.order('Tap in order: how a plant grows.',['seedling','herb','sunflower']),
  R.order('Tap in order: how a butterfly grows.',['egg','caterpillar','butterfly']),R.ask('What does a puppy grow into?',['puppy'],['a dog','a cat','a bird'],'a dog'),
  R.order('Tap in order: how a person grows.',['baby','child','man','grandpa']),R.ask('Do living things make young?',null,['yes','no'],'yes')],
 tries:[['What does a tadpole grow into?','a *frog*'],['Name one way you have grown.','*taller, bigger feet*…']]});

/* 5 ─ Needs of living things */
U({id:'s05',title:'What living things need',strand:'Life Systems',codes:['B1','B2'],
 guide:{goal:'Know that living things need air, water, food and shelter, and get them in different ways.',words:'needs, air, water, food, shelter',ask:['What does a plant need to grow?','How does a fish get air?'],home:'Help water a plant. Talk about what it needs to stay alive.'},
 watch:['Living things need…','Air, water, food and a safe home. Every living thing needs these.'],
 fig:'The needs of living things.',
 page:{intro:'All living things need *air*, *water* and *food*. Living things get what they need in different ways.',
  boxes:[{title:'Needs',ex:[['wind','air'],['drop','water'],['apple','food'],['house','shelter']],cols:4},
   {title:'Different ways',text:'A *fish* gets air through its gills. A *plant* gets water through its roots. A *bird* builds a nest for shelter.',ex:[['fish','gills'],['seedling','roots'],['nest','nest']],cols:3}],
  cards:[{q:'Living or not living?',pics:['frog','rock','tree'],o:[0,2],a:'frog and tree are living'},{q:'Plants get water through their…',pics:['plant'],a:'*roots*'}],
  words:[['need','something we must have to live'],['shelter','a safe place to live']]},
 steps:[
  {say:'Four needs',speech:'Living things need air, water, food and shelter, a safe place to live.',set:S.row(['wind','drop','apple','house'],{labels:['air','water','food','shelter']}),
   cues:[['need air','wind','air'],['water,','drop','water'],['food','apple','food'],['shelter','house','shelter']]},
  {say:'Different ways',speech:'A fish gets air through its gills. A plant drinks water through its roots. A bird makes a nest for shelter.',set:S.row(['fish','seedling','nest'],{labels:['gills','roots','nest']}),
   cues:[['through its gills','fish','gills'],['through its roots','seedling','roots'],['makes a nest','nest','nest']]},
  {say:'Living or not?',speech:'Living things grow and have needs. A frog and a tree are living. A rock and a car are not living.',set:S.sort(['living','not living'],[['frog',0],['rock',1],['tree',0],['car',1]]),
   cues:[['a frog and a tree','frog|tree','living','play'],['are not living','rock|car','not living']]}],
 rounds:[R.sort('Living or not living?',['living','not living'],[['dog',0],['rock',1],['tree',0],['ball',1],['bird',0],['car',1]]),R.pick('Tap what a plant needs to grow.',['drop','candy','tv','ball'],'drop',{q:'Tap the thing a plant needs: *water*, candy, a TV or a ball?'}),
  R.pick('Tap the home (shelter) a bird makes.',['nest','house','tent','car'],'nest'),R.ask('How does a fish get air?',['fish'],['through gills','through roots','through a nose'],'through gills'),
  R.sort('Living or not living?',['living','not living'],[['sunflower',0],['chair',1],['cat',0],['cup',1]]),R.ask('Which is *not* a need?',null,['water','food','a toy'],'a toy')],
 tries:[['What are four needs of living things?','*air, water, food, shelter*'],['Is the sun a living thing?','*No*: it does not grow or eat.']]});

/* 6 ─ How living things move */
U({id:'s06',title:'How living things move',strand:'Life Systems',codes:['B2'],
 guide:{goal:'Describe how people and animals move: hop, fly, swim, slither, climb, gallop and more.',words:'move, hop, fly, swim, slither, climb, gallop, crawl',ask:['How does a snake move?','Can you move like a frog?'],home:'Play an animal movement game: hop like a rabbit, slither like a snake.'},
 watch:['On the move','A frog hops. A bird flies. A fish swims. A snake slithers.'],
 fig:'Animals and the ways they move.',
 page:{intro:'Our bodies let us move in many ways. The way an animal moves depends on its body.',
  boxes:[{title:'Ways to move',ex:[['frog','hop'],['bird','fly'],['fish','swim'],['snake','slither'],['monkey','climb'],['horse','gallop']],cols:6},
   {title:'People move too',ex:[['runner','run'],['swimmer','swim'],['cyclist','ride'],['dancer','dance']],cols:4}],
  cards:[{q:'How does a kangaroo move?',pics:['kangaroo'],a:'*hop*'},{q:'Which ones fly?',pics:['bird','bee','pig'],o:[0,1],a:'bird and bee'}],
  words:[['slither','move on the belly like a snake'],['gallop','run fast like a horse']]},
 steps:[
  {say:'Animals move',speech:'A frog hops. A bird flies. A fish swims. A snake slithers along the ground.',set:S.row(['frog','bird','fish','snake']),
   cues:[['a frog hops','frog','hop'],['a bird flies','bird','fly'],['a fish swims','fish','swim'],['snake slithers','snake','slither']]},
  {say:'Bodies decide',speech:'The way an animal moves depends on its body. Wings help a bird fly. Fins help a fish swim. Strong legs help a horse gallop.',set:S.row(['bird','fish','horse'],{labels:['wings','fins','legs']}),
   cues:[['wings help','bird','wings'],['fins help','fish','fins'],['strong legs','horse','legs']]},
  {say:'Sort by movement',speech:'Sort the animals: fly or swim. The bee and the owl fly. The whale and the turtle swim.',set:S.sort(['fly','swim'],[['bee',0],['whale',1],['owl',0],['turtle',1]]),
   cues:[['fly or swim','*','sort','play'],['bee and the owl','bee|owl','fly'],['whale and the turtle','whale|turtle','swim']]}],
 rounds:[R.pick('Tap the animal that *slithers*.',['snake','bird','horse','frog'],'snake'),R.pick('Tap the animal that *hops*.',['kangaroo','fish','snail','owl'],'kangaroo'),
  R.sort('Fly or swim?',['fly','swim'],[['bird',0],['fish',1],['bee',0],['whale',1],['butterfly',0],['dolphin',1]]),R.ask('How does a horse move fast?',['horse'],['gallop','slither','swim'],'gallop'),
  R.pick('Tap the animal that *climbs* trees.',['monkey','fish','snake','duck'],'monkey'),R.ask('What helps a bird fly?',['bird'],['wings','fins','shell'],'wings')],
 tries:[['How does a duck move? Name two ways.','*swim* and *fly* (and waddle!)'],['Move like a snake. What is that called?','*slither*']]});

/* 7 ─ Patterns in living things */
U({id:'s07',title:'Patterns in nature',strand:'Life Systems',codes:['B2'],
 guide:{goal:'Find repeating patterns on living things, like stripes, spots and petals.',words:'pattern, stripes, spots, repeat',ask:['What pattern does a zebra have?','Can you find a pattern on a leaf?'],home:'Look for patterns outside: tree bark, leaves, flowers, bugs.'},
 watch:['Nature’s patterns','A zebra has stripes. A ladybug has spots. Patterns repeat!'],
 fig:'Stripes, spots and petals on living things.',
 page:{intro:'Many living things have *patterns*. A pattern is something that *repeats*.',
  boxes:[{title:'Patterns we see',ex:[['zebra','stripes'],['tiger','stripes'],['ladybug','spots'],['giraffe','patches'],['sunflower','petals'],['pineapple','bumps']],cols:6}],
  cards:[{q:'Stripes or spots?',pics:['ladybug'],a:'*spots*'},{q:'Which has stripes?',pics:['zebra','frog','cat'],o:[0],a:'*zebra*'}],
  words:[['pattern','something that repeats'],['stripes','long lines that repeat']]},
 steps:[
  {say:'Look for patterns',speech:'A zebra has black and white stripes. A tiger has stripes too. A ladybug has spots. A giraffe has patches.',set:S.row(['zebra','tiger','ladybug','giraffe'],{labels:['stripes','stripes','spots','patches']}),
   cues:[['zebra has','zebra','stripes'],['tiger has stripes','tiger','stripes'],['ladybug has spots','ladybug','spots'],['giraffe has patches','giraffe','patches']]},
  {say:'Plants have patterns',speech:'Plants have patterns too. A sunflower has petals all around. A pineapple has bumps that repeat.',set:S.row(['sunflower','pineapple'],{labels:['petals','bumps']}),
   cues:[['petals all around','sunflower','petals'],['bumps that repeat','pineapple','bumps']]},
  {say:'Sort the patterns',speech:'Sort them into stripes and spots.',set:S.sort(['stripes','spots'],[['zebra',0],['ladybug',1],['tiger',0],['giraffe',1]]),
   cues:[['stripes and spots','*','sort','play']]}],
 rounds:[R.sort('Stripes or spots?',['stripes','spots'],[['zebra',0],['ladybug',1],['tiger',0],['giraffe',1],['bee',0],['leopard'.replace('leopard','dog'),1]]),R.pick('Tap the animal with *spots*.',['ladybug','zebra','snake','fish'],'ladybug'),
  R.pick('Tap the animal with *stripes*.',['tiger','frog','duck','cow'].map(x=>x==='cow'?'pig':x),'tiger'),R.ask('What pattern does a bee have?',['bee'],['stripes','spots'],'stripes'),
  R.order('Make the pattern: *zebra, ladybug, zebra, ladybug*.',['zebra','ladybug','zebra','ladybug'].map((x,i)=>x),{q:'Tap to make the pattern: *zebra, ladybug, zebra, ladybug*.'}),R.pick('Tap the plant with petals in a pattern.',['sunflower','rock','car','cup'],'sunflower')],
 tries:[['Name an animal with stripes.','*zebra, tiger, bee*'],['Where do you see a pattern on yourself?','*fingerprints, my shirt*…']]});

/* 8 ─ Healthy eating */
U({id:'s08',title:'Healthy eating',strand:'Life Systems',codes:['B1'],
 guide:{goal:'Choose healthy foods (vegetables and fruits, whole grains, protein foods) and water as the drink of choice.',words:'healthy, vegetables, fruits, whole grains, protein, water, treat',ask:['Which snack is healthier: an apple or a candy?','What should you drink when you are thirsty?'],home:'Plan a healthy lunch together: a vegetable, a fruit, a whole grain and a protein.'},
 watch:['A healthy plate','Half the plate is vegetables and fruits. Add whole grains and protein. Drink water!'],
 fig:'Healthy foods and treats.',
 page:{intro:'Healthy food helps our bodies grow and stay strong. *Canada’s food guide* helps us choose: lots of *vegetables and fruits*, *whole grains*, *protein foods*, and *water* to drink.',
  boxes:[{title:'A healthy plate',ex:[['broccoli','vegetables'],['apple','fruits'],['bread','whole grains'],['egg','protein'],['drop','water']],cols:5},
   {title:'Sometimes treats',ex:[['candy','candy'],['pop','pop'],['fries','fries']],cols:3,note:'Treats are for sometimes, not every day.'}],
  cards:[{q:'Which is healthier?',pics:['apple','candy'],o:[0],a:'*apple*'},{q:'Best drink when thirsty?',pics:['drop'],a:'*water*'}],
  words:[['healthy','good for our bodies'],['treat','a food for sometimes']]},
 steps:[
  {say:'Healthy choices',speech:'Vegetables like broccoli. Fruits like apples. Whole grains like bread. Protein like eggs. And water to drink.',set:S.row(['broccoli','apple','bread','egg','drop'],{labels:['vegetable','fruit','grain','protein','water']}),
   cues:[['like broccoli','broccoli','vegetables'],['like apples','apple','fruits'],['like bread','bread','grains'],['like eggs','egg','protein'],['water to drink','drop','water']]},
  {say:'Treats are for sometimes',speech:'Candy, pop and fries are treats. They are for sometimes, not every day.',set:S.row(['candy','pop','fries']),
   cues:[['candy, pop and fries','candy|pop|fries','treats'],['not every day','pop','sometimes']]},
  {say:'Sort the food',speech:'Sort the foods into every day and sometimes.',set:S.sort(['every day','sometimes'],[['carrot',0],['candy',1],['banana',0],['donut',1]]),
   cues:[['every day and sometimes','*','sort','play']]}],
 rounds:[R.sort('Every day or sometimes?',['every day','sometimes'],[['carrot',0],['candy',1],['apple',0],['pop',1],['broccoli',0],['donut',1]]),R.pick('Tap the healthier snack.',['apple','candy','lollipop','chocolate'],'apple'),
  R.pick('Tap the best drink when you are thirsty.',['drop','pop','juice','milk'].map(x=>x),'drop',{q:'Tap the best drink when you are thirsty: *water*.'}),R.pick('Tap the *vegetable*.',['carrot','cookie','pizza','cake'],'carrot'),
  R.pick('Tap the *protein* food.',['egg','candy','lettuce','apple'],'egg'),R.ask('How much of our plate should be vegetables and fruits?',null,['half','none','a tiny bit'],'half')],
 tries:[['Name a healthy snack.','*apple, carrots, yogurt*…'],['Is pop an every-day drink?','*No*: water is best.']]});
})();
