/* The Interactive Classroom: Grade 1 Science — Units 9–16: safe living, materials, joining, changing, recycling, energy */
(function(){
"use strict";
const P=window.PM;if(!P||!P.unit)return;const U=P.unit,R=P.R,S=P.S;

/* 9 ─ Safe and healthy living */
U({id:'s09',title:'Safe and healthy living',strand:'Life Systems',codes:['A1','B1'],
 guide:{goal:'Name healthy habits (washing hands, exercise, sleep) and safety gear and rules that keep us safe.',words:'healthy, habit, exercise, sleep, safe, helmet, life jacket',ask:['Why do we wash our hands?','What do you wear when you ride a bike?'],home:'Make a chart of healthy habits and tick each one you do today.'},
 watch:['Healthy habits','Wash your hands, move your body, get lots of sleep. Wear a helmet to ride!'],
 fig:'Healthy habits and safety gear.',
 page:{intro:'There are many things we can do to stay healthy: keep our bodies clean, exercise and get plenty of sleep. *Safety rules* help keep us safe.',
  boxes:[{title:'Healthy habits',ex:[['soap','wash hands'],['toothbrush','brush teeth'],['runner','exercise'],['bed','sleep']],cols:4},
   {title:'Stay safe',ex:[['helmet','helmet for biking'],['life jacket','life jacket on a boat'],['sunglasses','sun safety']],cols:3}],
  cards:[{q:'Riding a bike? Wear a…',pics:['helmet'],a:'*helmet*'},{q:'Before eating, …',pics:['soap'],a:'*wash your hands*'}],
  words:[['habit','something you do again and again'],['exercise','moving your body to stay strong']]},
 steps:[
  {say:'Healthy habits',speech:'Healthy habits keep our bodies strong. Wash your hands with soap. Brush your teeth. Exercise every day. Get plenty of sleep.',set:S.row(['soap','toothbrush','runner','bed'],{labels:['wash','brush','exercise','sleep']}),
   cues:[['with soap','soap','wash'],['brush your teeth','toothbrush','brush'],['exercise every day','runner','exercise'],['plenty of sleep','bed','sleep']]},
  {say:'Safety gear',speech:'Wear a helmet when you ride a bike. Wear a life jacket on a boat. Wear sunglasses and a hat in the sun.',set:S.row(['helmet','life jacket','sunglasses']),
   cues:[['wear a helmet','helmet','bike'],['wear a life jacket','life jacket','boat'],['sunglasses and a hat','sunglasses','sun']]},
  {say:'Healthy or not?',speech:'Sort the habits. Sleeping well and eating fruit are healthy. Staying up late and eating lots of candy are not.',set:S.sort(['healthy','not healthy'],[['bed',0,'sleep well'],['candy',1,'lots of candy'],['apple',0,'eat fruit'],['tv',1,'TV all night']]),
   cues:[['sort the habits','*','sort','play']]}],
 rounds:[R.pick('Tap what you wear to ride a bike.',['helmet','sandal','scarf','dress'],'helmet'),R.pick('Tap what you wear on a boat.',['life jacket','mitten','cap','backpack'],'life jacket'),
  R.sort('Healthy habit or not?',['healthy','not healthy'],[['soap',0,'wash hands'],['candy',1,'candy all day'],['runner',0,'play outside'],['tv',1,'TV all night'],['toothbrush',0,'brush teeth'],['pop',1,'pop for breakfast']]),
  R.ask('When should you wash your hands?',['soap'],['before eating','never','only on Sunday'],'before eating'),R.pick('Tap a way to exercise.',['cyclist','sleeping','tv','candy'],'cyclist'),R.ask('How much sleep do children need?',['bed'],['lots, every night','very little'],'lots, every night')],
 tries:[['Name two healthy habits.','*wash hands, brush teeth, sleep, exercise*'],['What keeps your head safe on a scooter?','a *helmet*']]});

/* 10 ─ Objects and materials */
U({id:'s10',title:'Objects and materials',strand:'Matter and Energy',codes:['C1','C2'],
 guide:{goal:'Tell the difference between an object and the material it is made from, and describe materials: hard, soft, rough, smooth, light, heavy.',words:'object, material, wood, metal, plastic, glass, paper, fabric, hard, soft, rough, smooth',ask:['What is your chair made of?','Is a pillow hard or soft?'],home:'Go on a material hunt: find something made of wood, metal, plastic, glass and cloth.'},
 watch:['What is it made of?','A chair is an object. It is made of wood. Wood is the material.'],
 fig:'Objects sorted by what they are made of.',
 page:{intro:'*Objects* are things we can see and touch. *Materials* are what objects are made from. Materials have properties: hard or soft, rough or smooth, light or heavy.',
  boxes:[{title:'Materials',ex:[['wood','wood'],['nut bolt','metal'],['plastic bottle','plastic'],['glass','glass'],['paper','paper'],['shirt','fabric']],cols:6},
   {title:'Properties',ex:[['rock','hard'],['teddy','soft'],['cactus','rough'],['glass','smooth']],cols:4}],
  cards:[{q:'A spoon is made of…',pics:['spoon'],a:'*metal*'},{q:'Hard or soft?',pics:['bed'],a:'a pillow is *soft*'}],
  words:[['object','a thing we can see and touch'],['material','what an object is made of']]},
 steps:[
  {say:'Object and material',speech:'A chair is an object. It is made of wood. Wood is the material. A spoon is an object made of metal.',set:S.row(['chair','wood','spoon','nut bolt'],{labels:['chair','wood','spoon','metal']}),
   cues:[['a chair is an object','chair','object'],['made of wood','wood','material'],['a spoon','spoon','object'],['of metal','nut bolt','material']]},
  {say:'Properties',speech:'A rock is hard. A teddy bear is soft. A cactus is rough. Glass is smooth.',set:S.row(['rock','teddy','cactus','glass'],{labels:['hard','soft','rough','smooth']}),
   cues:[['a rock is hard','rock','hard'],['teddy bear is soft','teddy','soft'],['cactus is rough','cactus','rough'],['glass is smooth','glass','smooth']]},
  {say:'Sort by material',speech:'Sort the objects by what they are made of: wood or metal.',set:S.sort(['wood','metal'],[['chair',0],['spoon',1],['log',0],['key',1]]),
   cues:[['wood or metal','*','sort','play']]}],
 rounds:[R.sort('Wood or metal?',['wood','metal'],[['chair',0],['spoon',1],['log',0],['key',1],['violin',0],['nut bolt',1]]),R.sort('Hard or soft?',['hard','soft'],[['rock',0],['teddy',1],['brick',0],['bed',1],['key',0],['socks',1]]),
  R.pick('Tap the object made of *glass*.',['glass','socks','book','chair'],'glass'),R.pick('Tap the object made of *fabric* (cloth).',['shirt','spoon','rock','key'],'shirt'),
  R.ask('A book is made of…',['book'],['paper','metal','glass'],'paper'),R.pick('Tap the *rough* object.',['cactus','glass','ice','teddy'],'cactus')],
 tries:[['What is a window made of?','*glass*'],['Name something soft.','*pillow, kitten, scarf*…']]});

/* 11 ─ Materials that join */
U({id:'s11',title:'Joining materials',strand:'Matter and Energy',codes:['C1','C2'],
 guide:{goal:'Choose materials that join things together: glue, tape, nails, thread, string, staples, paper clips.',words:'join, glue, tape, nail, thread, string, paper clip',ask:['How would you join two pieces of paper?','What joins wood to wood?'],home:'Make a card and choose how to join it: glue, tape or string?'},
 watch:['Join it!','Glue joins paper. Nails join wood. Thread joins cloth.'],
 fig:'Things that join materials together.',
 page:{intro:'Some materials are used to *join* things together. The best one depends on what we are joining.',
  boxes:[{title:'Joiners',ex:[['glue','glue'],['tape','tape'],['nut bolt','nails and bolts'],['thread','thread'],['paperclip','paper clip'],['knot','string']],cols:6},
   {title:'Which joiner?',ex:[['paper','paper: glue or tape'],['wood','wood: nails'],['shirt','cloth: thread']],cols:3}],
  cards:[{q:'Fix a torn page with…',pics:['tape'],a:'*tape*'},{q:'Sew a button with…',pics:['thread','button'],a:'*thread*'}],
  words:[['join','put together'],['sew','join cloth with a needle and thread']]},
 steps:[
  {say:'Things that join',speech:'Glue, tape, nails, thread and paper clips all join things together.',set:S.row(['glue','tape','nut bolt','thread','paperclip'],{labels:['glue','tape','nails','thread','clip']}),
   cues:[['glue,','glue','glue'],['tape,','tape','tape'],['nails','nut bolt','nails'],['thread','thread','thread'],['paper clips','paperclip','clip']]},
  {say:'The right joiner',speech:'Glue joins paper. Nails join wood. Thread joins cloth when we sew.',set:S.row(['paper','wood','shirt'],{labels:['glue','nails','thread']}),
   cues:[['glue joins paper','paper','glue'],['nails join wood','wood','nails'],['thread joins cloth','shirt','thread']]},
  {say:'Match them',speech:'Sort the jobs: paper jobs use glue, cloth jobs use thread.',set:S.sort(['glue','thread'],[['paper',0,'paper card'],['shirt',1,'torn shirt'],['books',0,'book cover'],['socks',1,'hole in sock']]),
   cues:[['paper jobs','*','sort','play']]}],
 rounds:[R.ask('What joins two pieces of wood?',['wood'],['nails','thread','water'],'nails'),R.ask('What do you use to sew a button?',['button'],['thread','glue','tape'],'thread'),
  R.pick('Tap something that *joins* things.',['tape','apple','ball','sun'],'tape'),R.sort('Glue or thread?',['glue','thread'],[['paper',0,'paper'],['shirt',1,'shirt'],['books',0,'cardboard'],['socks',1,'socks']]),
  R.pick('Tap what holds papers together.',['paperclip','spoon','cup','key'],'paperclip'),R.ask('A page is torn. What can fix it?',['books'],['tape','nails','ice'],'tape')],
 tries:[['What joins LEGO-style blocks?','they *snap* together'],['Name two joiners.','*glue, tape, string, nails*…']]});

/* 12 ─ Changing materials */
U({id:'s12',title:'Changing materials',strand:'Matter and Energy',codes:['C1','C2'],
 guide:{goal:'Describe how heat, cold and mixing change materials: ice melts, water freezes, bread toasts, eggs cook.',words:'change, melt, freeze, heat, cold, cook, toast',ask:['What happens to ice in the sun?','How does bread change in a toaster?'],home:'Make ice cubes, then watch them melt. Talk about before and after.'},
 watch:['Watch it change','Ice in the sun melts into water. Heat changes materials!'],
 fig:'Materials before and after they change.',
 page:{intro:'*Heat*, *cold* and other things can *change* materials. When a material changes, some of its properties change too: how it feels, looks, smells or tastes.',
  boxes:[{title:'Before and after',ex:[['ice','ice'],['drop','→ water'],['bread','bread'],['pancakes','→ toast'],['egg','egg'],['chicken leg','→ cooked']],cols:6,note:'Heat melts and cooks. Cold freezes.'}],
  cards:[{q:'Water in the freezer becomes…',pics:['drop','ice'],a:'*ice*'},{q:'Ice cream in the sun…',pics:['ice cream','sun'],a:'*melts*'}],
  words:[['melt','change from solid to liquid with heat'],['freeze','change from liquid to solid with cold']]},
 steps:[
  {say:'Heat melts',speech:'Ice is hard and cold. In the sun, heat melts the ice into water.',set:S.order(['ice','sun','drop']),
   cues:[['ice is hard','ice','ice'],['in the sun','sun','heat'],['melts the ice','*','','play'],['into water','drop','water']]},
  {say:'Cold freezes',speech:'Water in the freezer gets very cold. It freezes into ice.',set:S.order(['drop','snowflake','ice']),
   cues:[['water in the freezer','drop','water'],['very cold','snowflake','cold'],['into ice','ice','ice']]},
  {say:'Before and after',speech:'Sort before and after. Bread becomes toast. A raw egg becomes a cooked egg.',set:S.sort(['before','after'],[['bread',0,'bread'],['pancakes',1,'toast'],['egg',0,'raw egg'],['chicken leg',1,'cooked']]),
   cues:[['before and after','*','sort','play']]}],
 rounds:[R.ask('What happens to ice in the sun?',['ice','sun'],['it melts','it grows','it freezes'],'it melts'),R.ask('Water goes in the freezer. It becomes…',['drop'],['ice','sand','steam'],'ice'),
  R.order('Tap in order: ice, heat, water.',['ice','fire','drop']),R.sort('Changed by *heat* or by *cold*?',['heat','cold'],[['pancakes',0,'toast'],['ice',1,'ice cubes'],['fried egg'.replace('fried egg','egg'),0,'cooked egg'],['snowman',1,'snowman']]),
  R.ask('A snowman on a warm day will…',['snowman'],['melt','freeze'],'melt'),R.pick('Tap what *melts* in the sun.',['ice cream','rock','key','book'],'ice cream')],
 tries:[['What makes chocolate melt?','*heat*'],['How can we make water into ice?','put it in the *freezer*']]});

/* 13 ─ Reuse and recycle */
U({id:'s13',title:'Reuse and recycle',strand:'Matter and Energy',codes:['C1','C2'],
 guide:{goal:'Reduce, reuse and recycle: sort materials into bins and find new uses for old things.',words:'reduce, reuse, recycle, compost, garbage, bin',ask:['Which bin does a pop can go in?','How could you reuse a jar?'],home:'Help sort the recycling at home. Make a craft from something you would throw away.'},
 watch:['Sort the bins','Paper in the blue bin. Peels in the green bin. Reuse what we can!'],
 fig:'Recycling, compost and garbage bins.',
 page:{intro:'Many objects can be *reused* or *recycled*. We sort things by the *materials* they are made from.',
  boxes:[{title:'Three Rs',ex:[['bag','reduce: use less'],['jar','reuse: use again'],['recycle','recycle: make new']],cols:3},
   {title:'Which bin?',ex:[['newspaper','recycling'],['can','recycling'],['banana','compost'],['fallen leaf','compost']],cols:4}],
  cards:[{q:'Reuse a jar as a…',pics:['jar','pencil'],a:'*pencil holder*'},{q:'Banana peel goes in…',pics:['banana'],a:'*compost*'}],
  words:[['recycle','turn old materials into new things'],['compost','food scraps that turn into soil']]},
 steps:[
  {say:'Three Rs',speech:'Reduce means use less. Reuse means use again. Recycle means make old things into new things.',set:S.row(['bag','jar','recycle'],{labels:['reduce','reuse','recycle']}),
   cues:[['use less','bag','reduce'],['use again','jar','reuse'],['into new things','recycle','recycle']]},
  {say:'Sort the bins',speech:'Paper and cans go in recycling. Banana peels and leaves go in compost.',set:S.sort(['recycling','compost'],[['newspaper',0],['banana',1],['can',0],['fallen leaf',1]]),
   cues:[['paper and cans','newspaper|can','recycling','play'],['and leaves','banana|fallen leaf','compost']]},
  {say:'Reuse it',speech:'An old jar can hold pencils. An old box can become a toy house. Reusing keeps things out of the garbage.',set:S.row(['jar','box'],{labels:['pencil jar','toy house']}),
   cues:[['an old jar','jar','pencils'],['an old box','box','toy house']]}],
 rounds:[R.sort('Recycling or compost?',['recycling','compost'],[['newspaper',0],['banana',1],['can',0],['apple',1],['plastic bottle',0],['fallen leaf',1]]),R.ask('What does *reuse* mean?',null,['use again','throw away'],'use again'),
  R.pick('Tap the thing that goes in *compost*.',['banana','can','newspaper','glass'],'banana'),R.pick('Tap the thing that can be *recycled*.',['can','banana','fallen leaf','egg'],'can'),
  R.ask('How can you reuse a jar?',['jar'],['as a pencil holder','eat it'],'as a pencil holder'),R.sort('Recycling or compost?',['recycling','compost'],[['box',0,'cardboard'],['carrot',1,'carrot top'],['paper',0],['egg',1,'egg shell']])],
 tries:[['Name something you can recycle.','*cans, paper, plastic bottles*'],['How could you reuse a sock?','a *puppet*!']]});

/* 14 ─ Energy and the sun */
U({id:'s14',title:'Energy and the Sun',strand:'Matter and Energy',codes:['C1','C2'],
 guide:{goal:'Know that energy makes things move or change, and that most energy on Earth comes from the Sun.',words:'energy, sun, light, heat, life',ask:['What does the Sun give us?','What would happen if there was no Sun?'],home:'Put two ice cubes outside: one in the sun, one in the shade. Which melts first?'},
 watch:['The Sun gives energy','The Sun gives us light and heat. Plants use sunlight to grow.'],
 fig:'Sunlight, heat and growing plants.',
 page:{intro:'*Energy* makes things move or change. Most of the energy on Earth comes from the *Sun*.',
  boxes:[{title:'The Sun gives us',ex:[['sun','light'],['hot face','heat'],['seedling','life for plants']],cols:3},
   {title:'Energy makes things go',ex:[['runner','moving bodies'],['car','moving cars'],['light bulb','lights']],cols:3}],
  cards:[{q:'Plants need the Sun to…',pics:['seedling','sun'],a:'*grow*'},{q:'Where does most energy come from?',pics:['sun'],a:'the *Sun*'}],
  words:[['energy','what makes things move or change'],['sunlight','light from the Sun']]},
 steps:[
  {say:'The Sun gives energy',speech:'The Sun gives us light, so we can see. It gives us heat, so we stay warm. It helps plants grow.',set:S.row(['sun','hot face','seedling'],{labels:['light','heat','growing']}),
   cues:[['gives us light','sun','light'],['gives us heat','hot face','heat'],['plants grow','seedling','life']]},
  {say:'Energy makes things go',speech:'Energy makes things move or change. Food gives our bodies energy to run. Fuel gives cars energy to move. Electricity makes a light bulb glow.',set:S.row(['runner','car','light bulb'],{labels:['body','car','light']}),
   cues:[['bodies energy to run','runner','food'],['cars energy','car','fuel'],['light bulb','light bulb','electricity']]},
  {say:'From the Sun',speech:'Most energy on Earth starts with the Sun. Sun to plant to apple to you!',set:S.order(['sun','seedling','apple','runner']),
   cues:[['most energy on earth','*','','play'],['sun to plant','sun|seedling','start'],['apple to you','apple|runner','energy!']]}],
 rounds:[R.ask('Where does most energy on Earth come from?',['sun'],['the Sun','the Moon','a lamp'],'the Sun'),R.order('Tap in order: energy from the Sun to you.',['sun','seedling','apple','runner']),
  R.pick('Tap what gives the Earth light and heat.',['sun','cloud','rock','car'],'sun'),R.ask('What does energy do?',null,['makes things move or change','nothing'],'makes things move or change'),
  R.pick('Tap what needs sunlight to grow.',['seedling','rock','car','key'],'seedling'),R.ask('Which ice cube melts first?',['ice','sun'],['the one in the sun','the one in the shade'],'the one in the sun')],
 tries:[['Name two things the Sun gives us.','*light* and *heat*'],['Where do you get energy?','from *food*']]});

/* 15 ─ Energy and food */
U({id:'s15',title:'Energy and food',strand:'Matter and Energy',codes:['C1','C2'],
 guide:{goal:'Know that plants get energy from the Sun and animals (and people) get energy by eating; make a simple food chain.',words:'food chain, energy, plant, eat',ask:['What does a rabbit eat?','Where does the grass get energy?'],home:'Trace your lunch back to the Sun: bread → wheat → Sun!'},
 watch:['A food chain','Sun, grass, grasshopper, frog. Energy passes from one to the next.'],
 fig:'A food chain from the Sun.',
 page:{intro:'The Sun gives energy to green plants. Animals get energy by *eating* plants or other animals. A *food chain* shows how energy moves.',
  boxes:[{title:'A food chain',ex:[['sun','sun'],['grass','grass'],['cricket','grasshopper'],['frog','frog']],cols:4,note:'sun → grass → grasshopper → frog'}],
  cards:[{q:'A rabbit gets energy from…',pics:['rabbit','carrot'],a:'*eating plants*'},{q:'Plants get energy from…',pics:['sun'],a:'the *Sun*'}],
  words:[['food chain','who eats what, starting with the Sun'],['energy','what living things need to move and grow']]},
 steps:[
  {say:'Plants use sunlight',speech:'Green plants get energy from the Sun. They use sunlight to make their own food.',set:S.row(['sun','grass','seedling']),
   cues:[['from the sun','sun','energy'],['make their own food','grass|seedling','plants']]},
  {say:'A food chain',speech:'Here is a food chain. The Sun gives energy to the grass. A grasshopper eats the grass. A frog eats the grasshopper.',set:Object.assign(S.order(['sun','grass','cricket','frog']),{labels:['sun','grass','grasshopper','frog']}),
   cues:[['the sun gives energy','sun','1'],['to the grass','grass','2'],['eats the grass','cricket','3'],['frog eats','frog','4']]},
  {say:'Another chain',speech:'Sun, carrot, rabbit, fox. Energy moves along the chain.',set:Object.assign(S.order(['sun','carrot','rabbit','fox'])),
   cues:[['sun, carrot, rabbit, fox','*','','play']]}],
 rounds:[R.order('Tap the food chain in order.',['sun','grass','cricket','frog'],{set:{row:['sun','grass','cricket','frog'],order:['sun','grass','cricket','frog'],labels:['sun','grass','grasshopper','frog']}}),
  R.order('Tap the food chain in order.',['sun','carrot','rabbit','fox']),R.ask('Where do green plants get energy?',['sun'],['the Sun','candy','rocks'],'the Sun'),
  R.ask('What does a rabbit eat?',['rabbit'],['plants','rocks','cars'],'plants'),R.order('Tap the food chain in order.',['sun','leaf','caterpillar','bird']),R.ask('How do animals get energy?',null,['by eating','by sleeping only'],'by eating')],
 tries:[['Make a chain: sun, ___, cow','*grass*'],['Where does your energy come from?','*food*']]});

/* 16 ─ Smart energy use */
U({id:'s16',title:'Using energy wisely',strand:'Matter and Energy',codes:['C1','C2'],
 guide:{goal:'Name sources of energy (sun, wind, electricity, wood, gas) and ways to save energy.',words:'electricity, wind, sun, save, turn off',ask:['How can you save energy at home?','What uses electricity in your kitchen?'],home:'Be an energy detective: find lights or screens left on and turn them off.'},
 watch:['Save energy','Turn off the light when you leave. Walk or bike instead of driving.'],
 fig:'Energy sources and ways to save energy.',
 page:{intro:'We use energy every day. It comes from many places: the *sun*, the *wind*, *electricity*, *wood* and *gas*. We should use energy *wisely*.',
  boxes:[{title:'Energy sources',ex:[['sun','sun'],['wind','wind'],['plug','electricity'],['wood','wood'],['fuel','gas']],cols:5},
   {title:'Save energy',ex:[['light bulb','turn off lights'],['cyclist','walk or bike'],['shower','short showers']],cols:3}],
  cards:[{q:'What uses electricity?',pics:['tv','computer','tree'],o:[0,1],a:'TV, computer'},{q:'Leaving the room?',pics:['light bulb'],a:'*turn off the light*'}],
  words:[['electricity','energy that runs lights and machines'],['save','use less']]},
 steps:[
  {say:'Energy sources',speech:'Energy comes from the sun, the wind, electricity, wood and gas.',set:S.row(['sun','wind','plug','wood','fuel'],{labels:['sun','wind','electricity','wood','gas']}),
   cues:[['the sun','sun','sun'],['the wind','wind','wind'],['electricity','plug','electricity'],['wood','wood','wood'],['gas','fuel','gas']]},
  {say:'Uses electricity',speech:'A TV, a computer and a lamp all use electricity. A tree does not.',set:S.row(['tv','computer','light bulb','tree'],{cross:3}),
   cues:[['use electricity','tv|computer|light bulb','electricity'],['a tree does not','tree','✗','x']]},
  {say:'Save energy',speech:'We can save energy. Turn off lights. Walk or ride a bike. Take short showers.',set:S.row(['light bulb','cyclist','shower'],{labels:['lights off','bike','short shower']}),
   cues:[['turn off lights','light bulb','save'],['ride a bike','cyclist','save'],['short showers','shower','save']]}],
 rounds:[R.pick('Tap something that uses *electricity*.',['tv','tree','rock','apple'],'tv'),R.ask('How can you save energy when you leave a room?',['light bulb'],['turn off the light','leave it on'],'turn off the light'),
  R.sort('Uses electricity or not?',['electricity','no electricity'],[['tv',0],['book',1],['computer',0],['ball',1],['light bulb',0],['kite',1]]),R.pick('Tap a way to travel that saves energy.',['cyclist','car','airplane','truck'],'cyclist'),
  R.pick('Tap the energy source that turns windmills.',['wind','rock','apple','book'],'wind'),R.ask('Which saves energy?',['shower'],['a short shower','a very long shower'],'a short shower')],
 tries:[['Name something that uses electricity.','*fridge, TV, lamp*…'],['How does the wind help us?','it can make *electricity* and dry clothes']]});
})();
