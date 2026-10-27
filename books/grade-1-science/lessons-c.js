/* The Interactive Classroom: Grade 1 Science — Units 17–24: structures, day and night, seasons, plants and animals through the year */
(function(){
"use strict";
const P=window.PM;if(!P||!P.unit)return;const U=P.unit,R=P.R,S=P.S;

/* 17 ─ Structures around us */
U({id:'s17',title:'Structures around us',strand:'Structures and Mechanisms',codes:['D1','D2'],
 guide:{goal:'Know that structures are things built for a purpose, and are often made of simple shapes like triangles, rectangles and circles.',words:'structure, purpose, shape, triangle, rectangle, circle, strong',ask:['What is a bridge for?','What shapes can you see in a swing set?'],home:'Build a tower from paper cups. Which shape at the bottom makes it strongest?'},
 watch:['Structures have a purpose','A bridge helps us cross. A tent keeps us dry. A tower lets us see far.'],
 fig:'Structures and the jobs they do.',
 page:{intro:'A *structure* is something built for a *purpose*. Structures can be made from simple *shapes*.',
  boxes:[{title:'Structures and purposes',ex:[['bridge','cross water'],['tent','shelter'],['lighthouse','light for ships'],['chair','sit on']],cols:4},
   {title:'Shapes in structures',ex:[['tent','triangle'],['door','rectangle'],['wheel','circle']],cols:3}],
  cards:[{q:'What is a fence for?',pics:['house'],a:'*keep things in or out*'},{q:'Which shape is strong in bridges?',pics:['bridge'],a:'*triangles*'}],
  words:[['structure','something built for a purpose'],['purpose','the job it does']]},
 steps:[
  {say:'Structures have jobs',speech:'A bridge helps us cross water. A tent gives us shelter. A lighthouse shines a light for ships. A chair holds us up.',set:S.row(['bridge','tent','lighthouse','chair']),
   cues:[['a bridge','bridge','cross'],['a tent','tent','shelter'],['a lighthouse','lighthouse','light'],['a chair','chair','sit']]},
  {say:'Simple shapes',speech:'Structures use simple shapes. A tent is a triangle. A door is a rectangle. A wheel is a circle.',set:S.row(['tent','door','wheel'],{labels:['triangle','rectangle','circle']}),
   cues:[['tent is a triangle','tent','triangle'],['door is a rectangle','door','rectangle'],['wheel is a circle','wheel','circle']]},
  {say:'Match the purpose',speech:'Sort the structures: places to live, and ways to travel.',set:S.sort(['live in','travel on'],[['house',0],['bridge',1],['tent',0],['train',1]]),
   cues:[['places to live','*','sort','play']]}],
 rounds:[R.ask('What is a bridge for?',['bridge'],['to cross over','to sleep in','to eat'],'to cross over'),R.pick('Tap a structure that gives *shelter*.',['tent','apple','dog','sun'],'tent'),
  R.ask('What shape is a tent?',['tent'],['triangle','circle','square'],'triangle'),R.sort('Live in or travel on?',['live in','travel on'],[['house',0],['bridge',1],['igloo',0],['train',1],['tent',0],['ship',1]]),
  R.pick('Tap the structure that helps ships at night.',['lighthouse','chair','tent','house'],'lighthouse'),R.ask('What shape is a wheel?',['wheel'],['circle','triangle','rectangle'],'circle')],
 tries:[['Name a structure in your classroom.','*desk, chair, shelf*'],['What is the purpose of a roof?','to keep us *dry*']]});

/* 18 ─ Natural structures */
U({id:'s18',title:'Natural structures',strand:'Structures and Mechanisms',codes:['D1','D2'],
 guide:{goal:'Find structures built by nature and by animals (nests, webs, dams, hives) and the human structures they inspire.',words:'natural, nest, web, dam, hive, honeycomb',ask:['Who builds a dam?','What human-made thing looks like a spider web?'],home:'Look for a nest, web or anthill outside. Draw it!'},
 watch:['Built by nature','A bird builds a nest. A spider spins a web. A beaver builds a dam.'],
 fig:'Animal builders and what they build.',
 page:{intro:'Living and non-living things in nature make *structures*. People often copy ideas from nature.',
  boxes:[{title:'Animal builders',ex:[['bird','nest'],['spider','web'],['beaver','dam'],['bee','hive']],cols:4},
   {title:'Nature gives us ideas',ex:[['web','web → net'],['beaver','dam → dam'],['honeycomb','honeycomb → shapes']],cols:3}],
  cards:[{q:'Who builds a nest?',pics:['nest'],a:'a *bird*'},{q:'Who spins a web?',pics:['web'],a:'a *spider*'}],
  words:[['natural','made by nature, not by people'],['dam','a wall that holds back water']]},
 steps:[
  {say:'Animal builders',speech:'A bird builds a nest. A spider spins a web. A beaver builds a dam. Bees build a hive.',set:S.row(['bird','spider','beaver','bee']),
   cues:[['bird builds a nest','bird','nest'],['spider spins a web','spider','web'],['beaver builds a dam','beaver','dam'],['bees build a hive','bee','hive']]},
  {say:'Nature’s structures',speech:'Here are the structures: the nest, the web and the honeycomb.',set:S.row(['nest','web','honeycomb']),
   cues:[['the nest','nest','nest'],['the web','web','web'],['the honeycomb','honeycomb','hive']]},
  {say:'Natural or human-made?',speech:'Sort the structures: made by nature, or made by people.',set:S.sort(['nature','people'],[['nest',0],['house',1],['web',0],['bridge',1]]),
   cues:[['made by nature','*','sort','play']]}],
 rounds:[R.ask('Who builds a dam?',['beaver'],['a beaver','a cat','a fish'],'a beaver'),R.pick('Tap the animal that spins a *web*.',['spider','bird','bee','fox'],'spider'),
  R.sort('Made by nature or by people?',['nature','people'],[['nest',0],['house',1],['web',0],['bridge',1],['honeycomb',0],['tower',1]]),R.pick('Tap the animal that builds a *nest*.',['bird','fish','bear','dog'],'bird'),
  R.ask('Who makes honeycomb?',['honeycomb'],['bees','ducks','cows'],'bees'),R.pick('Tap the *natural* structure.',['web','car','chair','tent'],'web')],
 tries:[['Name a natural structure.','*nest, web, dam, hive, anthill*'],['What does a spider web catch?','*bugs*']]});

/* 19 ─ Structures together */
U({id:'s19',title:'Building with parts',strand:'Structures and Mechanisms',codes:['D1','D2'],
 guide:{goal:'Know that two or more structures can be joined to make a new device, like a wagon from a box and wheels.',words:'device, parts, join, design',ask:['What parts make a wagon?','What would you need to build a bird feeder?'],home:'Build a vehicle from a box, straws and bottle-cap wheels.'},
 watch:['Parts make a device','A box plus wheels makes a wagon! Parts join to make a new device.'],
 fig:'Simple parts joined to make new things.',
 page:{intro:'Two or more structures can be *joined* to make a *device*. A device helps us do a job.',
  boxes:[{title:'Parts + parts = device',ex:[['box','box'],['wheel','+ wheels'],['delivery truck','= wagon']],cols:3},
   {title:'More devices',ex:[['lock','lock + box = safe'],['wood','board + wheels = skateboard']],cols:2}],
  cards:[{q:'What parts make a bike?',pics:['bicycle'],a:'*wheels, a seat, pedals*'},{q:'Box + string + stick = ?',pics:['box','knot'],a:'a *pull toy*'}],
  words:[['device','something built to do a job'],['part','one piece of a bigger thing']]},
 steps:[
  {say:'Parts make a device',speech:'Take a box. Add wheels. Now it is a wagon! Two structures joined together make a new device.',set:S.order(['box','wheel','delivery truck']),
   cues:[['take a box','box','box'],['add wheels','wheel','+ wheels'],['it is a wagon','delivery truck','wagon']]},
  {say:'Look for parts',speech:'A bike has wheels, a seat and pedals. A skateboard is a board with wheels.',set:S.row(['bicycle','skateboard']),
   cues:[['a bike has','bicycle','parts'],['a skateboard','skateboard','board + wheels']]},
  {say:'What parts?',speech:'Which parts would you need to build a kite? Sticks, paper and string!',set:S.row(['stick','paper','knot','kite'],{labels:['sticks','paper','string','kite']}),
   cues:[['build a kite','kite','kite!'],['sticks, paper and string','stick|paper|knot','parts']]}],
 rounds:[R.ask('Box + wheels makes a…',['box','wheel'],['wagon','nest','sandwich'],'wagon'),R.pick('Tap a part you need to build a *bike*.',['wheel','apple','sun','fish'],'wheel'),
  R.ask('What parts make a kite?',['kite'],['sticks, paper, string','water and sand'],'sticks, paper, string'),R.order('Tap in order: build a wagon.',['box','wheel','delivery truck']),
  R.pick('Tap the device made of a board and wheels.',['skateboard','book','apple','sun'],'skateboard'),R.ask('What is a device?',null,['something built to do a job','a kind of food'],'something built to do a job')],
 tries:[['What parts make a chair?','*legs, a seat, a back*'],['Invent a device! What parts?','*any good answer!*']]});

/* 20 ─ Day and night */
U({id:'s20',title:'Day and night',strand:'Earth and Space Systems',codes:['E1','E2'],
 guide:{goal:'Know that the Sun gives us light; the Earth spins, so the side facing the Sun has day and the other side has night.',words:'day, night, Earth, Sun, spin, rotate',ask:['Why is it dark at night?','What do you do during the day? At night?'],home:'Shine a flashlight on a ball and spin it slowly. Which side has day?'},
 watch:['The Earth spins','The Earth spins around. The side facing the Sun has day. The other side has night.'],
 fig:'The Earth spins in sunlight: day and night.',
 page:{intro:'The *Sun* gives us light. The *Earth* spins. When our side faces the Sun, it is *day*. When our side turns away, it is *night*.',
  boxes:[{title:'Day and night',ex:[['sun','day: sunny, bright'],['moon','night: dark, stars']],cols:2,big:true},
   {title:'Our routine',ex:[['sunrise','wake up'],['school','school'],['sunset','sunset'],['bed','sleep']],cols:4}],
  cards:[{q:'An owl hunts at…',pics:['owl','moon'],a:'*night*'},{q:'A sunflower faces the…',pics:['sunflower','sun'],a:'*Sun*'}],
  words:[['day','when our side of the Earth faces the Sun'],['night','when our side faces away from the Sun']]},
 steps:[
  {say:'The Earth spins',speech:'This is the Earth, and this is the Sun. The Earth spins all the way around every day.',set:{custom:'globe',time:'day'},
   cues:[['this is the earth','child','you are here'],['is the sun','sun','Sun'],['spins all the way around','','spin!','play']]},
  {say:'Facing the Sun',speech:'When our side faces the Sun, it is day. When our side turns away, it is night.',set:{custom:'globe',time:'day'},
   cues:[['faces the sun, it is day','sun','day'],['it is night','child','night','play']]},
  {say:'Day or night?',speech:'Sort what we do. We go to school in the day. We sleep at night.',set:S.sort(['day','night'],[['school',0],['bed',1],['sun',0,'sunny'],['moon',1,'stars']]),
   cues:[['sort what we do','*','sort','play']]}],
 rounds:[R.sort('Day or night?',['day','night'],[['school',0],['bed',1],['sun',0],['moon',1],['sunflower',0],['owl',1]]),R.ask('Why do we have day and night?',null,['the Earth spins','the Sun turns off'],'the Earth spins'),
  R.ask('Look at the child on the Earth. Is it day or night there?',null,['day','night'],'day',{set:{custom:'globe',time:'day'}}),R.ask('Look at the child on the Earth. Is it day or night there?',null,['day','night'],'night',{set:{custom:'globe',time:'night'}}),
  R.pick('Tap the animal that is awake at *night*.',['owl','chicken','cow','bee'],'owl'),R.order('Tap our day in order.',['sunrise','school','sunset','bed'])],
 tries:[['When does the Moon come out?','usually at *night*'],['What gives us light in the day?','the *Sun*']]});

/* 21 ─ Seasons */
U({id:'s21',title:'The four seasons',strand:'Earth and Space Systems',codes:['E1','E2'],
 guide:{goal:'Name the four seasons and describe the weather and activities of each.',words:'spring, summer, fall, winter, season, weather',ask:['What do you wear in winter?','Which season has the longest days?'],home:'Look out the window each week. What season is it? What clues tell you?'},
 watch:['Four seasons','Spring, summer, fall and winter: every year, the seasons come around again.'],
 fig:'The four seasons and what we do in each.',
 page:{intro:'The four *seasons* are *spring*, *summer*, *fall* and *winter*. The things we do depend on the season.',
  boxes:[{title:'The seasons',ex:[['tulip','spring'],['sun','summer'],['fallen leaf','fall'],['snowflake','winter']],cols:4},
   {title:'What we do',ex:[['umbrella','spring rain'],['swimsuit','summer swim'],['jack o lantern','fall harvest'],['sled','winter sled']],cols:4}],
  cards:[{q:'Which season?',pics:['snowman','sled'],a:'*winter*'},{q:'Which season?',pics:['fallen leaf','pumpkin'],a:'*fall*'}],
  words:[['season','one of four parts of the year'],['weather','what it is like outside']]},
 steps:[
  {say:'Four seasons',speech:'Spring is when flowers bloom. Summer is hot and sunny. In fall, the leaves change colour. Winter is cold and snowy.',set:S.order(['tulip','sun','fallen leaf','snowflake']),
   cues:[['spring is','tulip','spring'],['summer is hot','sun','summer'],['in fall','fallen leaf','fall'],['winter is cold','snowflake','winter']]},
  {say:'What we do',speech:'We splash in puddles in spring. We swim in summer. We rake leaves in fall. We sled in winter.',set:S.row(['umbrella','swimsuit','fallen leaf','sled']),
   cues:[['puddles in spring','umbrella','spring'],['swim in summer','swimsuit','summer'],['rake leaves in fall','fallen leaf','fall'],['sled in winter','sled','winter']]},
  {say:'Summer or winter?',speech:'Sort the things: summer or winter.',set:S.sort(['summer','winter'],[['sunglasses',0],['mitten',1],['ice cream',0],['snowman',1]]),
   cues:[['summer or winter','*','sort','play']]}],
 rounds:[R.order('Tap the seasons in order, starting with *spring*.',['tulip','sun','fallen leaf','snowflake'],{set:{row:['tulip','sun','fallen leaf','snowflake'],order:['tulip','sun','fallen leaf','snowflake'],labels:['spring','summer','fall','winter']}}),
  R.sort('Summer or winter?',['summer','winter'],[['sunglasses',0],['mitten',1],['swimsuit',0],['snowman',1],['ice cream',0],['sled',1]]),R.ask('When do leaves change colour and fall?',['fallen leaf'],['fall','summer','spring'],'fall'),
  R.pick('Tap the thing you use in *winter*.',['sled','swimsuit','sunglasses','kite'],'sled'),R.ask('Which season comes after winter?',['snowflake'],['spring','fall','summer'],'spring'),R.pick('Tap a sign of *spring*.',['tulip','snowman','fallen leaf','jack o lantern'],'tulip')],
 tries:[['What is your favourite season? Why?','*any good answer!*'],['Which season comes after summer?','*fall*']]});

/* 22 ─ Plants through the seasons */
U({id:'s22',title:'Plants through the year',strand:'Earth and Space Systems',codes:['E1','E2'],
 guide:{goal:'Describe how plants change with the seasons: buds in spring, green leaves in summer, colour and seeds in fall, rest in winter.',words:'bud, bloom, leaf, seed, bare, evergreen',ask:['What happens to maple trees in fall?','Which trees stay green all winter?'],home:'Pick one tree near your home. Take a photo each season.'},
 watch:['One tree, four seasons','Buds in spring, green leaves in summer, red leaves in fall, bare branches in winter.'],
 fig:'One tree through the four seasons.',
 page:{intro:'From season to season, we can see changes in many plants.',
  boxes:[{title:'A maple tree',ex:[['blossom','spring: buds'],['tree','summer: green'],['maple leaf','fall: colour'],['wood','winter: bare']],cols:4},
   {title:'Evergreens',text:'An *evergreen* tree keeps its needles all year, even in winter.',ex:[['evergreen','evergreen'],['snowflake','green in snow']],cols:2}],
  cards:[{q:'Which season? Seeds and pumpkins',pics:['pumpkin','corn'],a:'*fall* harvest'},{q:'Which tree stays green in winter?',pics:['evergreen'],a:'*evergreen*'}],
  words:[['bud','a small bump that grows into a leaf or flower'],['evergreen','a tree that stays green all year']]},
 steps:[
  {say:'A tree’s year',speech:'In spring, a tree grows buds and blossoms. In summer, its leaves are big and green. In fall, the leaves turn red and fall. In winter, the branches are bare.',set:Object.assign(S.order(['blossom','tree','maple leaf','wood']),{labels:['spring','summer','fall','winter']}),
   cues:[['buds and blossoms','blossom','spring'],['big and green','tree','summer'],['turn red and fall','maple leaf','fall'],['branches are bare','wood','winter']]},
  {say:'Evergreen trees',speech:'An evergreen tree keeps its green needles all year, even in the snow.',set:S.row(['evergreen','snowflake'],{labels:['evergreen','still green!']}),
   cues:[['evergreen tree','evergreen','evergreen'],['even in the snow','snowflake','winter']]},
  {say:'Harvest time',speech:'In fall, farmers harvest food: pumpkins, corn and apples.',set:S.row(['pumpkin','corn','apple']),
   cues:[['pumpkins','pumpkin','harvest'],['corn','corn','harvest'],['and apples','apple','harvest']]}],
 rounds:[R.order('Tap one tree through the year, starting in *spring*.',['blossom','tree','maple leaf','wood'],{set:{row:['blossom','tree','maple leaf','wood'],order:['blossom','tree','maple leaf','wood'],labels:['buds','green','red','bare']}}),
  R.ask('When do maple leaves turn red?',['maple leaf'],['fall','spring','summer'],'fall'),R.pick('Tap the tree that stays green in *winter*.',['evergreen','maple leaf','blossom','tulip'],'evergreen'),
  R.sort('Spring or fall?',['spring','fall'],[['blossom',0],['maple leaf',1],['tulip',0],['pumpkin',1],['seedling',0],['corn',1]]),R.ask('When do plants grow buds?',['blossom'],['spring','winter'],'spring'),R.pick('Tap a fall harvest food.',['pumpkin','snowflake','tulip','ice'],'pumpkin')],
 tries:[['What do trees look like in winter?','*bare* branches (unless evergreen!)'],['When do flowers bloom?','*spring* and *summer*']]});

/* 23 ─ Animals through the seasons */
U({id:'s23',title:'Animals through the year',strand:'Earth and Space Systems',codes:['E1','E2'],
 guide:{goal:'Describe how animals live through cold winters: some hibernate, some migrate, some grow thick fur coats.',words:'hibernate, migrate, fur, store food',ask:['Where do geese go in winter?','Why does a bear sleep all winter?'],home:'Watch for birds flying south in fall, and coming back in spring.'},
 watch:['Getting ready for winter','A bear hibernates. Geese migrate south. A fox grows a thick coat.'],
 fig:'How animals get through the winter.',
 page:{intro:'Animals change with the seasons. They have different ways of living through *cold winters*.',
  boxes:[{title:'Winter ways',ex:[['bear','hibernate'],['goose','migrate'],['fox','thick fur'],['squirrel','store food']],cols:4}],
  cards:[{q:'*Hibernate* means…',pics:['bear','zzz'],a:'*sleep all winter*'},{q:'*Migrate* means…',pics:['goose'],a:'*travel to a warmer place*'}],
  words:[['hibernate','sleep through the winter'],['migrate','move to a warmer place for winter']]},
 steps:[
  {say:'Winter ways',speech:'A bear hibernates: it sleeps all winter. Geese migrate: they fly south. A fox grows thick fur. A squirrel stores food.',set:S.row(['bear','goose','fox','squirrel']),
   cues:[['bear hibernates','bear','hibernate'],['geese migrate','goose','migrate'],['grows thick fur','fox','fur'],['stores food','squirrel','store food']]},
  {say:'Migrate',speech:'In fall, geese fly south where it is warm. In spring, they fly back.',set:S.order(['fallen leaf','goose','sun','tulip']),
   cues:[['in fall','fallen leaf','fall'],['fly south','goose','south'],['where it is warm','sun','warm'],['in spring, they fly back','tulip','back!']]},
  {say:'Sort them',speech:'Sort the animals: hibernate or migrate.',set:S.sort(['hibernate','migrate'],[['bear',0],['goose',1],['frog',0],['butterfly',1]]),
   cues:[['hibernate or migrate','*','sort','play']]}],
 rounds:[R.sort('Hibernate or migrate?',['hibernate','migrate'],[['bear',0],['goose',1],['frog',0],['butterfly',1],['snake',0],['swan',1]]),R.ask('What does a bear do in winter?',['bear'],['hibernates','swims south'],'hibernates'),
  R.ask('Where do geese go in winter?',['goose'],['south, where it is warm','to the moon'],'south, where it is warm'),R.pick('Tap the animal that stores nuts for winter.',['squirrel','fish','bee','goose'],'squirrel'),
  R.pick('Tap the animal that *migrates*.',['goose','bear','frog','snake'],'goose'),R.ask('What helps a fox stay warm?',['fox'],['thick fur','a hat'],'thick fur')],
 tries:[['What does *hibernate* mean?','*sleep all winter*'],['Name a bird that migrates.','*goose, swan, robin*']]});

/* 24 ─ Night animals */
U({id:'s24',title:'Animals of the night',strand:'Earth and Space Systems',codes:['E1','E2'],
 guide:{goal:'Know that nocturnal animals sleep in the day and are awake at night, using strong senses to live in the dark.',words:'nocturnal, sense of hearing, sense of sight, smell',ask:['Why do owls have big eyes?','How does a bat find its way in the dark?'],home:'Listen at night with the window open. Can you hear any night animals?'},
 watch:['Awake at night','Owls, bats and raccoons are nocturnal. They sleep in the day and wake at night.'],
 fig:'Nocturnal animals and their strong senses.',
 page:{intro:'Some animals sleep in the day and are awake at night. They are *nocturnal*. Nocturnal animals have *strong senses* to help them in the dark.',
  boxes:[{title:'Nocturnal animals',ex:[['owl','owl: big eyes'],['bat','bat: hearing'],['raccoon','raccoon: smell'],['moth'.replace('moth','butterfly'),'moth: smell']],cols:4}],
  cards:[{q:'Nocturnal or not?',pics:['owl','chicken'],o:[0],a:'owl is *nocturnal*'},{q:'A bat finds its way by…',pics:['bat','ear'],a:'*hearing*'}],
  words:[['nocturnal','awake at night, asleep in the day'],['sense','a way to learn about the world']]},
 steps:[
  {say:'Nocturnal animals',speech:'Owls, bats and raccoons are nocturnal. They sleep in the day and are awake at night.',set:S.row(['owl','bat','raccoon','moon'],{labels:['owl','bat','raccoon','night']}),
   cues:[['owls,','owl','nocturnal'],['bats','bat','nocturnal'],['raccoons','raccoon','nocturnal'],['awake at night','moon','night']]},
  {say:'Strong senses',speech:'An owl has big eyes to see in the dark. A bat has strong hearing. A raccoon has a strong sense of smell.',set:S.row(['owl','bat','raccoon'],{labels:['sight','hearing','smell']}),
   cues:[['big eyes','owl','sight'],['strong hearing','bat','hearing'],['sense of smell','raccoon','smell']]},
  {say:'Day or night?',speech:'Sort the animals: awake in the day, or awake at night.',set:S.sort(['day','night'],[['chicken',0],['owl',1],['bee',0],['bat',1]]),
   cues:[['awake in the day','*','sort','play']]}],
 rounds:[R.sort('Awake in the day or at night?',['day','night'],[['chicken',0],['owl',1],['bee',0],['bat',1],['cow',0],['raccoon',1]]),R.pick('Tap the *nocturnal* animal.',['owl','chicken','bee','cow'],'owl'),
  R.ask('What does *nocturnal* mean?',null,['awake at night','awake in the day'],'awake at night'),R.ask('Which sense helps a bat most?',['bat'],['hearing','taste'],'hearing'),
  R.pick('Tap the animal with big eyes for the dark.',['owl','fish','pig','duck'],'owl'),R.pick('Tap an animal that is awake in the *day*.',['chicken','bat','owl','raccoon'],'chicken')],
 tries:[['Name a nocturnal animal.','*owl, bat, raccoon*'],['Why are owl eyes big?','to *see in the dark*']]});
})();
