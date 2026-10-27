/* The Interactive Classroom: Grade 1 Social Studies — Units 13–24: safety and health workers, maps and grids, Canada, our environment, tools */
(function(){
"use strict";
const P=window.PM;if(!P||!P.unit)return;const U=P.unit,R=P.R,S=P.S;

/* 13 ─ Safety workers */
U({id:'o13',title:'Safety workers',strand:'People and Environments',codes:['B1','B3'],
 guide:{goal:'Know how police officers, firefighters and paramedics keep us safe, and the tools they use.',words:'police officer, firefighter, paramedic, emergency, 9-1-1',ask:['What does a firefighter use to put out fires?','What number do we call in an emergency?'],home:'Practise your home address and when to call 9-1-1.'},
 watch:['Keeping us safe','A firefighter uses a fire hose. A police officer uses a radio. They work hard to keep us safe.'],
 fig:'Safety workers and their tools.',
 page:{intro:'*Police officers* and *firefighters* are some of the people who help keep us safe. They use special *tools* to do their jobs.',
  boxes:[{title:'Safety workers',ex:[['police officer','police officer'],['firefighter','firefighter'],['ambulance','paramedic']],cols:3},
   {title:'Their tools',ex:[['fire truck','fire truck'],['radio','radio'],['dog','police dog'],['helmet','helmet']],cols:4}],
  cards:[{q:'In an emergency, call…',pics:['telephone'],a:'*9-1-1*'},{q:'Order: fire, call, truck comes',pics:['fire','telephone','fire truck'],a:'*1, 2, 3*'}],
  words:[['emergency','a time when someone needs help right away'],['9-1-1','the number to call in an emergency']]},
 steps:[
  {say:'Safety workers',speech:'Police officers keep our streets safe. Firefighters put out fires. Paramedics drive an ambulance to help sick or hurt people.',set:S.row(['police officer','firefighter','ambulance'],{labels:['police','firefighter','paramedic']}),
   cues:[['police officers','police officer','police'],['firefighters put out fires','firefighter','firefighter'],['an ambulance','ambulance','paramedic']]},
  {say:'Their tools',speech:'A firefighter uses a fire truck and a hose. A police officer uses a radio, and sometimes a police dog.',set:S.row(['fire truck','radio','dog'],{labels:['fire truck','radio','police dog']}),
   cues:[['fire truck and a hose','fire truck','firefighter'],['uses a radio','radio','police'],['a police dog','dog','police']]},
  {say:'What happens first?',speech:'Put it in order. There is a fire. Someone calls nine one one. The fire truck comes.',set:S.order(['fire','telephone','fire truck']),
   cues:[['there is a fire','fire','1'],['calls nine one one','telephone','2'],['fire truck comes','fire truck','3']]}],
 rounds:[R.order('Tap in order: what happens in a fire.',['fire','telephone','fire truck']),R.sort('Firefighter or police officer?',['firefighter','police'],[['fire truck',0],['police car',1],['fire',0],['radio',1]]),
  R.ask('What number do you call in an emergency?',['telephone'],['9-1-1','1-2-3'],'9-1-1'),R.pick('Tap the worker who puts out fires.',['firefighter','chef','farmer','artist'],'firefighter'),
  R.pick('Tap the vehicle a paramedic drives.',['ambulance','tractor','taxi','bus'],'ambulance'),R.ask('Who uses a police dog?',['dog'],['a police officer','a baker'],'a police officer')],
 tries:[['What does a firefighter wear on their head?','a *helmet*'],['When should you call 9-1-1?','only in an *emergency*']]});

/* 14 ─ Health workers */
U({id:'o14',title:'Health workers',strand:'People and Environments',codes:['B1','B3'],
 guide:{goal:'Name health workers (doctor, nurse, dentist, pharmacist, veterinarian, optometrist) and how they help us.',words:'doctor, nurse, dentist, pharmacist, veterinarian, optometrist',ask:['Who checks your teeth?','Who helps sick animals?'],home:'Make a pretend clinic with a toy doctor kit.'},
 watch:['Health helpers','A dentist checks teeth. A vet helps animals. A doctor helps us get well.'],
 fig:'Health workers and how they help.',
 page:{intro:'There are many different *health workers* in the community. They help us stay healthy and help us get well when we are sick.',
  boxes:[{title:'Health workers',ex:[['doctor','doctor'],['nurse','nurse'],['tooth','dentist'],['pill','pharmacist'],['paw','veterinarian'],['glasses','eye doctor']],cols:6}],
  cards:[{q:'A fever and a cough? Visit the…',pics:['sick'],a:'*doctor*'},{q:'Books are hard to see? Visit the…',pics:['glasses'],a:'*eye doctor*'}],
  words:[['health','being well in body and mind'],['veterinarian','an animal doctor']]},
 steps:[
  {say:'Health workers',speech:'A doctor helps us when we are sick. A nurse cares for us. A dentist checks our teeth. A veterinarian helps animals.',set:S.row(['doctor','nurse','tooth','paw'],{labels:['doctor','nurse','dentist','vet']}),
   cues:[['a doctor helps','doctor','doctor'],['a nurse cares','nurse','nurse'],['checks our teeth','tooth','dentist'],['helps animals','paw','vet']]},
  {say:'More helpers',speech:'A pharmacist gives us our medicine. An eye doctor checks our eyes and helps us get glasses.',set:S.row(['pill','glasses'],{labels:['pharmacist','eye doctor']}),
   cues:[['gives us our medicine','pill','pharmacist'],['checks our eyes','glasses','eye doctor']]},
  {say:'Who helps?',speech:'Sort the patients: people go to the doctor, pets go to the vet.',set:S.sort(['doctor','vet'],[['sick',0,'sick child'],['dog',1,'sick dog'],['baby',0,'baby check-up'],['cat',1,'hurt cat']]),
   cues:[['sort the patients','*','sort','play']]}],
 rounds:[R.ask('Who checks your teeth?',['tooth'],['a dentist','a vet'],'a dentist'),R.ask('Who helps a sick puppy?',['puppy'],['a veterinarian','a pilot'],'a veterinarian'),
  R.sort('Doctor or vet?',['doctor','vet'],[['sick',0,'sick child'],['dog',1,'sick dog'],['baby',0,'baby'],['cat',1,'cat'],['grandpa',0,'grandpa'],['horse',1,'horse']]),R.pick('Tap who gives you medicine at a pharmacy.',['pill','tooth','paw','glasses'],'pill',{q:'Tap the *pharmacist’s* sign.'}),
  R.ask('Words look blurry. Who can help?',['glasses'],['an eye doctor','a baker'],'an eye doctor'),R.pick('Tap a health worker.',['nurse','farmer','pilot','artist'],'nurse')],
 tries:[['Who helps you when you have a fever?','a *doctor* or *nurse*'],['Who is an animal doctor?','a *veterinarian*']]});

/* 15 ─ Uniforms and vehicles */
U({id:'o15',title:'Uniforms and vehicles',strand:'People and Environments',codes:['B1','B3'],
 guide:{goal:'Match community workers with their uniforms and special vehicles.',words:'uniform, vehicle, police car, fire truck, ambulance, garbage truck',ask:['Why do some workers wear uniforms?','Who drives a garbage truck?'],home:'Spot work vehicles on the road and say who drives them.'},
 watch:['Uniforms and vehicles','A firefighter drives a fire truck. A police officer drives a police car.'],
 fig:'Workers matched with their vehicles.',
 page:{intro:'Many community workers wear *uniforms*, so we can tell who they are. Some also use special *vehicles* for their work.',
  boxes:[{title:'Who drives it?',ex:[['police car','police officer'],['fire truck','firefighter'],['ambulance','paramedic'],['garbage truck','garbage collector'],['tractor','farmer'],['delivery truck','delivery driver']],cols:3,big:true}],
  cards:[{q:'Why wear a uniform?',pics:['police officer'],a:'so people *know who you are*'},{q:'A pilot flies a…',pics:['pilot'],a:'*plane*'}],
  words:[['uniform','special clothes for a job'],['vehicle','something that carries people or things']]},
 steps:[
  {say:'Uniforms',speech:'Many workers wear uniforms, so we know who they are. A police officer, a firefighter, a chef and a pilot all wear uniforms.',set:S.row(['police officer','firefighter','chef','pilot']),
   cues:[['police officer,','police officer','uniform'],['a firefighter','firefighter','uniform'],['a chef','chef','uniform'],['and a pilot','pilot','uniform']]},
  {say:'Special vehicles',speech:'A firefighter drives a fire truck. A farmer drives a tractor. A pilot flies an airplane.',set:S.row(['fire truck','tractor','airplane']),
   cues:[['drives a fire truck','fire truck','firefighter'],['drives a tractor','tractor','farmer'],['flies an airplane','airplane','pilot']]},
  {say:'Match them',speech:'Match each vehicle to its worker.',set:S.sort(['firefighter','farmer'],[['fire truck',0],['tractor',1],['firefighter',0,'hose'],['cow',1]]),
   cues:[['match each vehicle','*','match','play']]}],
 rounds:[R.ask('Who drives a fire truck?',['fire truck'],['a firefighter','a chef'],'a firefighter'),R.ask('Who drives a tractor?',['tractor'],['a farmer','a pilot'],'a farmer'),
  R.pick('Tap the vehicle a *police officer* uses.',['police car','tractor','sailboat','bicycle'],'police car'),R.pick('Tap the worker who flies a plane.',['pilot','chef','farmer','teacher'],'pilot'),
  R.sort('Fire truck or ambulance?',['fire','sick or hurt'],[['fire',0,'fire'],['sick',1,'sick person'],['firefighter',0,'smoke'],['bandage',1,'hurt leg']]),R.ask('Why do workers wear uniforms?',['police officer'],['so we know who they are','to hide'],'so we know who they are')],
 tries:[['Who drives a garbage truck?','a *garbage collector*'],['Name a worker who wears a uniform.','*nurse, police officer, chef*…']]});

/* 16 ─ Simple maps and directions */
U({id:'o16',title:'Maps and directions',strand:'People and Environments',codes:['B2'],
 guide:{goal:'Use symbols on a simple map, and the words left, right, above and below to tell where things are.',words:'map, symbol, left, right, above, below, legend',ask:['What does a tree symbol mean on a map?','What is to the left of the door?'],home:'Draw a map of your bedroom with symbols.'},
 watch:['Reading a map','Maps use symbols. A tree means a park. A cross means a hospital.'],
 fig:'A map with symbols and places.',
 page:{intro:'*Maps* use *symbols* to show where things are. We use words like *left*, *right*, *above* and *below* to tell where something is.',
  boxes:[{title:'Map symbols',ex:[['tree','park'],['school','school'],['hospital','hospital'],['church','church'],['beach','beach']],cols:5},
   {title:'Direction words',ex:[['teddy','left'],['car','right'],['airplane','above'],['ball','below']],cols:4}],
  cards:[{q:'On a map, a tree means…',pics:['tree'],a:'a *park*'},{q:'The plane is ___ the shelf.',pics:['airplane'],a:'*above*'}],
  words:[['symbol','a small picture that stands for something'],['map','a drawing of a place from above']]},
 steps:[
  {say:'Map symbols',speech:'This is a map seen from above. A tree symbol means a park. The school symbol means school. A cross means hospital.',set:{grid:{rows:3,cols:4,items:{A1:'tree',A3:'school',B2:'house',C4:'hospital',C1:'beach'}}},
   cues:[['tree symbol','tree','park'],['school symbol','school','school'],['means hospital','hospital','hospital']]},
  {say:'Left and right',speech:'The teddy is on the left. The car is on the right. The ball is in the middle.',set:S.row(['teddy','ball','car'],{labels:['left','middle','right'],keep:true}),
   cues:[['teddy is on the left','teddy','left'],['car is on the right','car','right'],['in the middle','ball','middle']]},
  {say:'Above and below',speech:'On the map, the school is above the house. The hospital is below.',set:{grid:{rows:3,cols:4,items:{A1:'tree',A2:'school',B2:'house',C2:'hospital'}}},
   cues:[['school is above','school','above'],['the house','house','house'],['hospital is below','hospital','below']]}],
 rounds:[R.ask('On a map, what does a tree symbol mean?',['tree'],['a park','a store'],'a park'),R.ask('Which is on the *left*?',null,['teddy','car'],'teddy',{set:{row:['teddy','ball','car'],keep:true,labels:false}}),
  R.grid('Tap the square with the *school*.',{rows:3,cols:4,items:{A1:'tree',A3:'school',B2:'house',C4:'hospital'}},'A3'),R.grid('Tap the square with the *hospital*.',{rows:3,cols:4,items:{A1:'tree',A3:'school',B2:'house',C4:'hospital'}},'C4'),
  R.ask('Which is on the *right*?',null,['car','teddy'],'car',{set:{row:['teddy','ball','car'],keep:true,labels:false}}),R.ask('A map shows a place seen from…',null,['above','below'],'above')],
 tries:[['What symbol would you use for a library?','*a book*'],['What is on your left right now?','*any answer!*']]});

/* 17 ─ Looking at a grid */
U({id:'o17',title:'Map grids',strand:'People and Environments',codes:['B2'],
 guide:{goal:'Find places on a grid using a letter (row) and a number (column), like B3.',words:'grid, row, column, square, A1',ask:['What is in square B2?','How do you find C3?'],home:'Play a grid game: draw a 3 by 3 grid and hide a treasure in one square.'},
 watch:['Find the square','Go down to row B, then across to column 3. The bee is in B3!'],
 fig:'A map grid with rows and columns.',
 page:{intro:'Besides maps, we can use *grids* to show where things are. Each square has a *letter* (row) and a *number* (column).',
  boxes:[{title:'How to find B3',text:'Find row *B* going down. Then find column *3* going across. Where they meet is *B3*.',ex:[['bee','B3'],['ice cream','A1'],['umbrella','C4']],cols:3}],
  cards:[{q:'What is in A1?',pics:['ice cream'],a:'the *ice cream*'},{q:'Where is the umbrella?',pics:['umbrella'],a:'*C4*'}],
  words:[['grid','lines that make squares'],['row','squares going across']]},
 steps:[
  {say:'Rows and columns',speech:'A grid has rows and columns. Rows have letters: A, B, C. Columns have numbers: one, two, three, four.',set:{grid:{rows:3,cols:4,items:{A1:'ice cream',B3:'bee',C4:'umbrella'}}},
   cues:[['rows have letters','',"A, B, C"],['columns have numbers','',"1, 2, 3, 4"]]},
  {say:'Find B3',speech:'To find B3, go to row B. Then go across to column 3. The bee is in B3!',set:{grid:{rows:3,cols:4,items:{A1:'ice cream',B3:'bee',C4:'umbrella'}},cell:'B3'},
   cues:[['go to row b','','row B'],['the bee is in b3','bee','B3','done']]},
  {say:'More squares',speech:'The ice cream is in A1. The umbrella is in C4.',set:{grid:{rows:3,cols:4,items:{A1:'ice cream',B3:'bee',C4:'umbrella'}}},
   cues:[['ice cream is in a1','ice cream','A1'],['umbrella is in c4','umbrella','C4']]}],
 rounds:[R.grid('Tap square *B3*.',{rows:3,cols:4,items:{A1:'ice cream',B3:'bee',C4:'umbrella'}},'B3'),R.grid('Tap square *A2*.',{rows:3,cols:4,items:{A2:'flower',B4:'house',C1:'tree'}},'A2'),
  R.grid('Tap the square with the *house*.',{rows:3,cols:4,items:{A2:'flower',B4:'house',C1:'tree'}},'B4'),R.grid('Tap square *C3*.',{rows:3,cols:4,items:{A1:'sun',C3:'fish',B2:'cat'}},'C3'),
  R.ask('What is in square C1?',null,['tree','flower','house'],'tree',{set:{grid:{rows:3,cols:4,items:{A2:'flower',B4:'house',C1:'tree'}}}}),R.grid('Tap the square with the *cat*.',{rows:3,cols:4,items:{A1:'sun',C3:'fish',B2:'cat'}},'B2')],
 tries:[['What comes first: the letter or the number?','the *letter* (row)'],['Draw a 2 by 2 grid. Name the squares.','*A1, A2, B1, B2*']]});

/* 18 ─ Streets and distances */
U({id:'o18',title:'Streets and distances',strand:'People and Environments',codes:['B2'],
 guide:{goal:'Read a simple community map with streets, and count blocks to tell how far one place is from another.',words:'street, block, distance, near, far',ask:['Which is closer to your home: school or the store?','How many blocks to the park?'],home:'Count the blocks from home to school with a grown-up.'},
 watch:['How far is it?','Count the steps along the path: the library is three squares from home.'],
 fig:'A small town map: count how far.',
 page:{intro:'Maps can tell us *how far* it is from one place to another. They also show the *streets* of a community.',
  boxes:[{title:'Ben’s community',ex:[['house','Ben’s house'],['library','library'],['school','school'],['store','store']],cols:4,note:'Count the squares between places.'}],
  cards:[{q:'Near or far? Home to school (1 square)',pics:['house','school'],a:'*near*'},{q:'More squares means…',pics:[],a:'*farther away*'}],
  words:[['distance','how far it is from one place to another'],['street','a road in a town or city']]},
 steps:[
  {say:'A town map',speech:'Here is Ben’s town. His house is in A1. The school is in A2. The library is in A4. The store is in C4.',set:{grid:{rows:3,cols:4,items:{A1:'house',A2:'school',A4:'library',C4:'store'}}},
   cues:[['his house','house','home'],['the school','school','school'],['the library','library','library'],['the store','store','store']]},
  {say:'Count the squares',speech:'From the house to the school is one square. From the house to the library is three squares. The library is farther.',set:{grid:{rows:3,cols:4,items:{A1:'house',A2:'school',A4:'library',C4:'store'}}},
   cues:[['to the school is one square','school','1'],['to the library is three','library','3'],['farther','library','far']]},
  {say:'Near or far',speech:'Places with fewer squares are near. Places with more squares are far.',set:S.sort(['near','far'],[['school',0,'school: 1'],['store',1,'store: 5'],['park',0,'park: 1'],['library',1,'library: 3']]),
   cues:[['fewer squares are near','*','sort','play']]}],
 rounds:[R.ask('How many squares from the house to the school?',null,['1','2','3'],'1',{set:{grid:{rows:3,cols:4,items:{A1:'house',A2:'school',A4:'library',C4:'store'}}}}),
  R.ask('Which is farther from the house: school or library?',null,['library','school'],'library',{set:{grid:{rows:3,cols:4,items:{A1:'house',A2:'school',A4:'library',C4:'store'}}}}),
  R.grid('Tap the *library*.',{rows:3,cols:4,items:{A1:'house',A2:'school',A4:'library',C4:'store'}},'A4'),R.grid('Tap the square right *below* the house.',{rows:3,cols:4,items:{A1:'house',A3:'park',C2:'store'}},'B1'),
  R.ask('How many squares from the house to the library (going across)?',null,['3','1','5'],'3',{set:{grid:{rows:3,cols:4,items:{A1:'house',A2:'school',A4:'library',C4:'store'}}}}),R.ask('More squares means it is…',null,['farther','nearer'],'farther')],
 tries:[['Is your school near or far from home?','*any answer!*'],['What does a street map show?','the *streets* and *places*']]});

/* 19 ─ Land and water in Canada */
U({id:'o19',title:'Land and water in Canada',strand:'People and Environments',codes:['B1','B2'],
 guide:{goal:'Name land and water features in Canada: mountains, lakes, rivers, forests, islands, oceans and waterfalls.',words:'mountain, lake, river, ocean, island, forest, waterfall, prairie',ask:['Which ocean is closest to you?','What is the difference between a lake and an ocean?'],home:'Look at a map of Canada. Find a lake, a mountain and an ocean.'},
 watch:['Canada is huge!','Canada has tall mountains, big lakes, long rivers, thick forests and three oceans.'],
 fig:'Land and water features of Canada.',
 page:{intro:'*Canada* is a huge country, with lots of *land* and *water*.',
  boxes:[{title:'Land',ex:[['snowy mountain','mountain'],['evergreen','forest'],['grass','prairie'],['island','island']],cols:4},
   {title:'Water',ex:[['lake','lake'],['water wave','ocean'],['drop','river'],['ice','ice']],cols:4}],
  cards:[{q:'Land or water?',pics:['snowy mountain'],a:'*land*'},{q:'Canada touches how many oceans?',pics:['water wave'],a:'*three*'}],
  words:[['ocean','a huge body of salt water'],['lake','water with land all around it']]},
 steps:[
  {say:'Land in Canada',speech:'Canada has tall mountains, thick forests, wide flat prairies and many islands.',set:S.row(['snowy mountain','evergreen','grass','island'],{labels:['mountains','forests','prairies','islands']}),
   cues:[['tall mountains','snowy mountain','mountain'],['thick forests','evergreen','forest'],['flat prairies','grass','prairie'],['many islands','island','island']]},
  {say:'Water in Canada',speech:'Canada has big lakes, long rivers, and three oceans: the Pacific, the Atlantic and the Arctic.',set:S.row(['lake','drop','water wave'],{labels:['lakes','rivers','oceans']}),
   cues:[['big lakes','lake','lake'],['long rivers','drop','river'],['three oceans','water wave','ocean']]},
  {say:'Land or water?',speech:'Sort the features: land or water.',set:S.sort(['land','water'],[['snowy mountain',0],['lake',1],['evergreen',0],['water wave',1]]),
   cues:[['land or water','*','sort','play']]}],
 rounds:[R.sort('Land or water?',['land','water'],[['snowy mountain',0,'mountain'],['lake',1],['evergreen',0,'forest'],['water wave',1,'ocean'],['island',0],['drop',1,'river']]),R.pick('Tap a *mountain*.',['snowy mountain','lake','fish','house'],'snowy mountain'),
  R.ask('How many oceans touch Canada?',['water wave'],['3','1','10'],'3'),R.ask('Water with land all around it is a…',['lake'],['lake','mountain'],'lake'),
  R.pick('Tap a *forest*.',['evergreen','beach','city','water wave'],'evergreen'),R.ask('Is Canada big or small?',['canada'],['huge','tiny'],'huge')],
 tries:[['Name a land feature.','*mountain, forest, island*'],['Name a water feature.','*lake, river, ocean*']]});

/* 20 ─ Animals in Canada */
U({id:'o20',title:'Animals in Canada',strand:'People and Environments',codes:['B1','B2'],
 guide:{goal:'Name animals that live in Canada and where they live: polar bear, beaver, moose, loon, bison, fox, whale.',words:'polar bear, beaver, moose, loon, bison, lynx, whale, habitat',ask:['Where does a polar bear live?','Which animal is on the Canadian nickel?'],home:'Look at Canadian coins. Which animals can you find?'},
 watch:['Canadian animals','Polar bears in the Arctic, beavers in ponds, moose in forests, whales in the ocean.'],
 fig:'Canadian animals and where they live.',
 page:{intro:'Canada is home to *many animals*. Each animal lives where it can find what it needs.',
  boxes:[{title:'Canadian animals',ex:[['polar bear','polar bear'],['beaver','beaver'],['moose','moose'],['duck','loon'],['bison','bison'],['whale','whale']],cols:6},
   {title:'Where they live',ex:[['ice','Arctic: polar bear'],['lake','ponds: beaver'],['evergreen','forest: moose']],cols:3}],
  cards:[{q:'On the nickel:',pics:['beaver'],a:'a *beaver*'},{q:'On the loonie:',pics:['duck'],a:'a *loon*'}],
  words:[['habitat','the place an animal lives'],['Arctic','the cold, icy north of Canada']]},
 steps:[
  {say:'Animals of Canada',speech:'Canada has polar bears, beavers, moose, loons, bison and whales.',set:S.row(['polar bear','beaver','moose','bison','whale']),
   cues:[['polar bears','polar bear','polar bear'],['beavers','beaver','beaver'],['moose','moose','moose'],['bison','bison','bison'],['and whales','whale','whale']]},
  {say:'Where they live',speech:'A polar bear lives on the Arctic ice. A beaver lives in a pond. A moose lives in the forest. A whale lives in the ocean.',set:S.row(['polar bear','beaver','moose','whale'],{labels:['ice','pond','forest','ocean']}),
   cues:[['arctic ice','polar bear','Arctic'],['in a pond','beaver','pond'],['in the forest','moose','forest'],['in the ocean','whale','ocean']]},
  {say:'Land or water?',speech:'Sort the animals: they live mostly on land or mostly in water.',set:S.sort(['land','water'],[['moose',0],['whale',1],['bison',0],['fish',1]]),
   cues:[['sort the animals','*','sort','play']]}],
 rounds:[R.ask('Where does a polar bear live?',['polar bear'],['the Arctic','a desert'],'the Arctic'),R.pick('Tap the animal that builds dams.',['beaver','moose','whale','bison'],'beaver'),
  R.sort('Land or water?',['land','water'],[['moose',0],['whale',1],['bison',0],['fish',1],['fox',0],['seal',1]]),R.pick('Tap the animal on the *nickel*.',['beaver','lion','zebra','camel'],'beaver'),
  R.pick('Tap an animal that lives in *Canada*.',['moose','zebra','kangaroo','camel'],'moose'),R.ask('Where does a whale live?',['whale'],['the ocean','the forest'],'the ocean')],
 tries:[['Name three Canadian animals.','*moose, beaver, polar bear*…'],['Which bird is on the loonie?','the *loon*']]});

/* 21 ─ Knowing our environment */
U({id:'o21',title:'Natural and built places',strand:'People and Environments',codes:['B1','B3'],
 guide:{goal:'Tell natural environments (forest, lake, mountain) from human-built ones (park, pool, city), and find ones that look alike.',words:'environment, natural, human-built',ask:['Is a swimming pool natural or human-built?','What natural place does a playground hill remind you of?'],home:'On a walk, sort what you see: natural or built by people?'},
 watch:['Natural or built?','A lake is natural. A pool is built by people. They look alike!'],
 fig:'Natural places and human-built places.',
 page:{intro:'Our *environment* is where we live, work and play. Some places are *natural*, and some are *human-built*. Sometimes they look alike.',
  boxes:[{title:'Natural',ex:[['lake','lake'],['evergreen','forest'],['snowy mountain','mountain']],cols:3},
   {title:'Human-built',ex:[['pool','pool'],['park','park'],['city','city']],cols:3}],
  cards:[{q:'A lake looks like a…',pics:['lake','pool'],a:'*swimming pool*'},{q:'Natural or built?',pics:['bridge'],a:'*built*'}],
  words:[['natural','made by nature'],['human-built','made by people']]},
 steps:[
  {say:'Natural places',speech:'A lake, a forest and a mountain are natural. Nature made them.',set:S.row(['lake','evergreen','snowy mountain'],{labels:['lake','forest','mountain']}),
   cues:[['a lake','lake','natural'],['a forest','evergreen','natural'],['a mountain','snowy mountain','natural']]},
  {say:'Built places',speech:'A pool, a park and a city are human-built. People made them.',set:S.row(['pool','park','city']),
   cues:[['a pool','pool','built'],['a park','park','built'],['a city','city','built']]},
  {say:'Sort them',speech:'Sort the places: natural or human-built.',set:S.sort(['natural','built'],[['lake',0],['pool',1],['evergreen',0],['bridge',1]]),
   cues:[['natural or human-built','*','sort','play']]}],
 rounds:[R.sort('Natural or human-built?',['natural','built'],[['lake',0],['pool',1],['evergreen',0,'forest'],['bridge',1],['snowy mountain',0,'mountain'],['city',1]]),R.ask('A swimming pool looks like a…',['pool'],['lake','mountain'],'lake'),
  R.pick('Tap a *natural* place.',['snowy mountain','school','bridge','store'],'snowy mountain'),R.pick('Tap a *human-built* place.',['bridge','lake','island','evergreen'],'bridge'),
  R.ask('Who made a forest?',['evergreen'],['nature','people'],'nature'),R.ask('Who made a city?',['city'],['people','nature'],'people')],
 tries:[['Name a natural place near you.','*park pond, river, woods*…'],['Is a road natural or built?','*built*']]});

/* 22 ─ Caring for our environment */
U({id:'o22',title:'Caring for our environment',strand:'People and Environments',codes:['B1','B3'],
 guide:{goal:'Name ways to care for the environment: plant trees, recycle, make less garbage, save water.',words:'environment, recycle, litter, reusable, protect',ask:['Which lunch makes less garbage?','How can you save water?'],home:'Pack a waste-free lunch with reusable containers.'},
 watch:['Take care of it','Plant a tree. Recycle. Use a reusable bottle. Turn off the tap.'],
 fig:'Choices that help the environment.',
 page:{intro:'We must take care of our environment to have clean air and water. Planting trees, *recycling* and making *less garbage* are some of the things we can do.',
  boxes:[{title:'Ways to help',ex:[['seedling','plant trees'],['recycle','recycle'],['basket','reusable bags'],['drop','save water']],cols:4},
   {title:'Less garbage',ex:[['bowl','reusable box ✓'],['bag','plastic bags ✗']],cols:2}],
  cards:[{q:'Which makes less garbage?',pics:['bowl','bag'],o:[0],a:'a *reusable* box'},{q:'Brushing teeth?',pics:['drop'],a:'*turn off the tap*'}],
  words:[['environment','the world around us'],['reusable','can be used again and again']]},
 steps:[
  {say:'Ways to help',speech:'We can plant trees. We can recycle. We can carry reusable bags. We can save water.',set:S.row(['seedling','recycle','basket','drop'],{labels:['plant','recycle','reuse','save water']}),
   cues:[['plant trees','seedling','plant'],['we can recycle','recycle','recycle'],['reusable bags','basket','reuse'],['save water','drop','save']]},
  {say:'Less garbage',speech:'A reusable lunch box makes less garbage than plastic bags.',set:S.row(['bowl','bag'],{labels:['reusable ✓','plastic ✗'],cross:1}),
   cues:[['reusable lunch box','bowl','less garbage'],['plastic bags','bag','✗','x']]},
  {say:'Helping or not?',speech:'Sort the actions: helping the environment, or not.',set:S.sort(['helps','harms'],[['seedling',0,'plant a tree'],['trash',1,'litter'],['recycle',0,'recycle'],['car',1,'idling car']]),
   cues:[['sort the actions','*','sort','play']]}],
 rounds:[R.sort('Helps or harms the environment?',['helps','harms'],[['seedling',0,'plant a tree'],['trash',1,'litter'],['recycle',0,'recycle'],['car',1,'idling car'],['bicycle',0,'ride a bike'],['drop',1,'leave tap on']]),
  R.ask('Which makes *less* garbage?',null,['a reusable lunch box','plastic bags'],'a reusable lunch box'),R.pick('Tap something that helps clean the air.',['seedling','car','fire','truck'],'seedling'),
  R.ask('While brushing your teeth, you should…',['toothbrush'],['turn off the tap','let the water run'],'turn off the tap'),R.pick('Tap the bin for cans and paper.',['recycle','fire','tv','car'],'recycle'),R.ask('What does *reusable* mean?',null,['can be used again','use once and throw away'],'can be used again')],
 tries:[['Name one way to make less garbage.','*reusable bottle, lunch box*…'],['Why plant trees?','they *clean the air*']]});

/* 23 ─ Smart tools (1) */
U({id:'o23',title:'Tools at home',strand:'People and Environments',codes:['B1','B3'],
 guide:{goal:'Name tools in our homes that make life easier, and the job each one does.',words:'tool, machine, job, easier',ask:['Which tool keeps food cold?','What tool would you use to talk to Grandma far away?'],home:'Find five tools in your kitchen. What job does each do?'},
 watch:['Smart tools','A fridge keeps food cold. A telephone lets us talk far away. Tools make life easier!'],
 fig:'Home tools and the jobs they do.',
 page:{intro:'We have *smart tools* in our homes that make our lives easier.',
  boxes:[{title:'Tools and jobs',ex:[['telephone','talk far away'],['tv','watch shows'],['washing machine','wash clothes'],['ice','keep food cold'],['lawn','cut grass'],['vacuum','clean floors']].map(e=>e[0]==='lawn'?['herb',e[1]]:e),cols:3,big:true}],
  cards:[{q:'Clean snow off the driveway with…',pics:['snowflake'],a:'a *snow shovel* or *snowblower*'},{q:'Cook food fast with…',pics:['microwave'],a:'a *microwave*'}],
  words:[['tool','something that helps us do a job'],['machine','a tool with moving parts']]},
 steps:[
  {say:'Tools at home',speech:'A telephone lets us talk to people far away. A TV shows us programs. A computer helps us learn and play.',set:S.row(['telephone','tv','computer']),
   cues:[['a telephone','telephone','talk'],['a tv shows','tv','watch'],['a computer','computer','learn']]},
  {say:'Tools for chores',speech:'A broom sweeps the floor. A washing machine cleans clothes. A fridge keeps food cold.',set:S.row(['broom','washing machine','ice'],{labels:['broom','washer','fridge']}),
   cues:[['broom sweeps','broom','sweep'],['cleans clothes','washing machine','wash'],['keeps food cold','ice','cold']]},
  {say:'Match the job',speech:'Match each tool to its job: cleaning or talking.',set:S.sort(['clean','talk'],[['broom',0],['telephone',1],['sponge',0],['phone',1]]),
   cues:[['match each tool','*','match','play']]}],
 rounds:[R.ask('Which tool keeps food cold?',null,['fridge','oven','fan'],'fridge'),R.pick('Tap the tool you use to talk to someone far away.',['telephone','broom','spoon','book'],'telephone'),
  R.sort('Cleaning tool or talking tool?',['clean','talk'],[['broom',0],['telephone',1],['sponge',0],['phone',1],['vacuum',0],['computer',1,'video call']]),R.pick('Tap the tool for sweeping floors.',['broom','tv','phone','radio'],'broom'),
  R.ask('Which tool washes clothes?',['washing machine'],['washing machine','telephone'],'washing machine'),R.ask('Why do we use tools?',null,['to make jobs easier','to make jobs harder'],'to make jobs easier')],
 tries:[['Name a tool in your kitchen.','*fridge, stove, toaster*…'],['What tool tells the time?','a *clock*']]});

/* 24 ─ Smart tools (2): then and now */
U({id:'o24',title:'Tools then and now',strand:'People and Environments',codes:['A1','B1'],
 guide:{goal:'Compare tools from long ago and today, and see how they have changed over time.',words:'long ago, today, change, before, now',ask:['How did people travel before cars?','How did people talk before phones?'],home:'Ask a grandparent what tools they used as a child.'},
 watch:['Then and now','Long ago: a horse and cart. Today: a car. Tools change over time.'],
 fig:'Tools from long ago and today.',
 page:{intro:'Tools look different in different places, and they change *through time*. Many things from before look different today.',
  boxes:[{title:'Then and now',ex:[['horse','then: horse'],['car','now: car'],['candle','then: candle'],['light bulb','now: light bulb'],['letter','then: letter'],['phone','now: phone']],cols:6}],
  cards:[{q:'Put in order: before → today',pics:['horse','car'],a:'*horse, then car*'},{q:'Before light bulbs, people used…',pics:['candle'],a:'*candles*'}],
  words:[['long ago','a time far in the past'],['today','now']]},
 steps:[
  {say:'Travel then and now',speech:'Long ago, people travelled by horse. Later came the bicycle. Today, many people drive cars.',set:S.order(['horse','bicycle','car']),
   cues:[['by horse','horse','long ago'],['the bicycle','bicycle','later'],['drive cars','car','today']]},
  {say:'Light and talk',speech:'Long ago, people used candles for light. Today, we use light bulbs. People wrote letters. Today, we use phones.',set:S.row(['candle','light bulb','letter','phone'],{labels:['then','now','then','now']}),
   cues:[['used candles','candle','then'],['light bulbs','light bulb','now'],['wrote letters','letter','then'],['use phones','phone','now']]},
  {say:'Then or now?',speech:'Sort the tools: long ago, or today.',set:S.sort(['long ago','today'],[['candle',0],['light bulb',1],['horse',0],['car',1]]),
   cues:[['long ago, or today','*','sort','play']]}],
 rounds:[R.order('Tap in order from *long ago* to *today*.',['horse','bicycle','car']),R.sort('Long ago or today?',['long ago','today'],[['candle',0],['light bulb',1],['horse',0],['car',1],['letter',0],['phone',1]]),
  R.ask('Before light bulbs, people used…',['candle'],['candles','phones'],'candles'),R.order('Tap in order from *long ago* to *today*.',['letter','telephone','phone']),
  R.pick('Tap a tool from *today*.',['phone','candle','horse','letter'],'phone'),R.ask('Do tools change over time?',null,['yes','no'],'yes')],
 tries:[['How did people wash clothes long ago?','*by hand*, in a tub'],['What tool might we use in the future?','*any good idea!*']]});
})();
