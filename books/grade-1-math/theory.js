/* The Interactive Classroom: Grade 1 Math — theory that comes alive.
   Each theory step is read aloud and walks through the theory box and the worked examples on the left page.
   When the voice says a cue word, the matching 3D things lift, glow and wear a name tag, and the word is
   highlighted on the page. Picks here are small functions that find things by what they are (kind, index, value). */
(function(){var P=window.PM;if(!P)return;
function all(r,f){var o=[];r.traverse(function(x){if(x!==r&&f(x))o.push(x);});return o;}
function wx(o){var v=new P.THREE.Vector3();o.getWorldPosition(v);return v;}
function byX(a){return a.sort(function(p,q){var A=wx(p),B=wx(q);return (A.x-B.x)||(A.z-B.z);});}
function byZX(a){return a.sort(function(p,q){var A=wx(p),B=wx(q);return Math.abs(A.z-B.z)>.15?A.z-B.z:A.x-B.x;});}
var ud=function(k,v){return function(r){return all(r,function(x){return x.userData&&x.userData[k]===v;});};};
var kind=function(k){return ud('kind',k);};
var kinds=function(ks){return function(r){return all(r,function(x){return x.userData&&ks.indexOf(x.userData.kind)>=0;});};};
var nth=function(f,i,sort){return function(r){var a=(sort||byX)(f(r));return [].concat(i).map(function(k){return a[k<0?a.length+k:k];}).filter(Boolean);};};
var item=function(i){return function(r){return all(r,function(x){return x.userData&&x.userData.i===i&&x.type==='Group';});};};
var tile=function(n){return function(r){return all(r,function(x){return x.isMesh&&x.userData&&x.userData.n===n&&!(x.material&&x.material.opacity===0);});};};
var crossed=function(yes){return function(r){return all(r,function(x){return x.userData&&x.userData.kind&&!!x.userData.x===yes;});};};
function lx(r,o){return r.worldToLocal(wx(o)).x;}
var left=function(f){return function(r){return f(r).filter(function(o){return lx(r,o)<0;});};};
var right=function(f){return function(r){return f(r).filter(function(o){return lx(r,o)>0;});};};
var col=function(c){return function(){return P.spot.pick({c:c,u:'self'});};};
var txt=function(t){return {t:t,exact:true,only:true};};
P.theory={
/* 1 */ compare1:[
 {say:'big, bigger, biggest',demo:'size',speech:'Look at the three balls. Ball A is big. Ball B is bigger. Ball C is the biggest of all!',
  cues:[{w:'ball a is big',p:item(0),l:'big'},{w:'bigger',p:item(1),l:'bigger'},{w:'biggest',p:item(2),l:'biggest'}]},
 {say:'tall, taller, tallest',demo:'height',speech:'Now look at the towers. Tower B is taller than tower A. Tower C is the tallest. Tower A is the shortest.',
  cues:[{w:'taller',p:item(1),l:'taller'},{w:'the tallest',p:item(2),l:'tallest'},{w:'shortest',p:item(0),l:'shortest'}]},
 {say:'-er for 2, -est for 3 or more',demo:'two',speech:'When we compare two things, we use words like taller or longer. When we compare three or more things, we use words like tallest or longest.',
  cues:[{w:'two things',p:function(r){return item(0)(r).concat(item(1)(r));},l:'2 things: taller',hl:'2 things: use -er'},{w:'three or more',demo:'height',p:item(2),l:'3 or more: tallest',hl:'3 or more: use -est'}]},
 {say:'Line up the ends!',demo:'ordered',speech:'To compare length, line up the ends on one side. Ribbon B is the shortest. Then comes C. Ribbon A is the longest. In order: B, C, A.',
  cues:[{w:'line up the ends',p:function(r){return item(0)(r).concat(item(1)(r),item(2)(r));},l:'ends lined up'},{w:'ribbon b is the shortest',p:item(1),l:'shortest'},{w:'then comes c',p:item(2),l:'next'},{w:'ribbon a is the longest',p:item(0),l:'longest'}]}],
/* 2 */ compare2:[
 {say:'wide, narrow',demo:'width',speech:'Look at the three paths. Path B is the widest. Path A is the narrowest. Path C is wider than A, but narrower than B.',
  cues:[{w:'widest',p:item(1),l:'widest'},{w:'narrowest',p:item(0),l:'narrowest'},{w:'path c',p:item(2),l:'in between'}]},
 {say:'thick, thin',demo:'thick',speech:'These mattresses are stacked in layers. Mattress A is the thickest. Mattress B is the thinnest.',
  cues:[{w:'thickest',p:item(0),l:'thickest'},{w:'thinnest',p:item(1),l:'thinnest'}]},
 {say:'Heavier goes down',demo:'weigh',speech:'On a seesaw, the heavier side goes down. The block is heavier than the balloon, so it sinks down. The balloon is lighter, so it goes up.',
  cues:[{w:'heavier side goes down',p:kind('block'),l:'down'},{w:'the block is heavier',p:kind('block'),l:'heavier'},{w:'the balloon is lighter',p:kind('balloon'),l:'lighter'}]},
 {say:'More, most, fewest',demo:'groups',speech:'Count the ducks in each pond. Pond B has the most ducks: seven. Pond A has the fewest: three. Pond C has more than A, but fewer than B.',
  cues:[{w:'pond b has the most',p:item(1),l:'most: 7'},{w:'pond a has the fewest',p:item(0),l:'fewest: 3'},{w:'pond c',p:item(2),l:'5'}]}],
/* 3 */ order1:[
 {say:'Find what is the same',demo:'kindsorted',speech:'To sort, find what is the same. The apple, the pear and the strawberry are all fruit. The ball, the block and the kite are all toys. Our rule is: what kind of thing is it?',
  cues:[{w:'all fruit',p:kinds(['apple','pear','strawberry']),l:'fruit'},{w:'all toys',p:kinds(['ball','block','kite']),l:'toys'},{w:'our rule',hl:'rule'}]},
 {say:'Another way: by colour',demo:'colsorted',speech:'We can sort the same things another way: by colour! Red things go in one hoop. Blue things go in the other hoop.',
  cues:[{w:'red things',p:{c:'#e53935',u:'parent'},l:'red'},{w:'blue things',p:{c:'#2f7de1',u:'parent'},l:'blue'}]},
 {say:'Which does not belong?',demo:'oddx',speech:'Which one does not belong? The duck, the fish and the turtle are animals. The car is not an animal, so we cross it out.',
  cues:[{w:'are animals',p:kinds(['duck','fish','turtle']),l:'animals'},{w:'the car is not',p:kind('car'),l:'not an animal'}]},
 {say:'Put things in order',demo:'ordered',speech:'Now put the towers in order from shortest to tallest: B, then D, then A, then C. They go up like stairs!',
  cues:[{w:'b, then',p:item(1),l:'1'},{w:'d, then',p:item(3),l:'2',keep:true},{w:'a, then',p:item(0),l:'3',keep:true},{w:'then c',p:item(2),l:'4',keep:true}]}],
/* 4 */ seq1:[
 {say:'First, next, last',demo:'storydone',speech:'Some things happen in order. First, a seed goes in the soil. Next, a little sprout grows. Last, a flower opens!',
  cues:[{w:'first, a seed',p:ud('i',0),l:'first'},{w:'next, a little sprout',p:ud('i',1),l:'next'},{w:'last, a flower',p:ud('i',2),l:'last'}]},
 {say:'1st, 2nd, 3rd',demo:'places',speech:'Ordinal numbers tell position. The duck is closest to the flag, so it is first. The turtle is second. The ladybug is third.',
  cues:[{w:'ordinal numbers',hl:'Ordinal numbers tell position'},{w:'it is first',p:kind('duck'),l:'1st'},{w:'second',p:kind('turtle'),l:'2nd'},{w:'third',p:kind('ladybug'),l:'3rd'}]},
 {say:'Count from the front',demo:'places',speech:'Count from the flag: first, second, third, fourth, fifth, sixth. The fish is sixth. It is at the end, so it is last.',
  cues:[{w:'fourth',p:kind('car'),l:'4th'},{w:'fifth',p:kind('ball'),l:'5th'},{w:'the fish is sixth',p:kind('fish'),l:'6th: last'}]}],
/* 5 */ num10:[
 {say:'Count one at a time',demo:'c7',speech:'Count the ladybugs, one at a time: one, two, three, four, five, six, seven. Seven ladybugs! We write the number seven, and the word seven.',
  cues:[{w:'one,',p:nth(kind('ladybug'),0,byZX),l:'1'},{w:'two,',p:nth(kind('ladybug'),1,byZX),l:'2',keep:true},{w:'three,',p:nth(kind('ladybug'),2,byZX),l:'3',keep:true},{w:'four,',p:nth(kind('ladybug'),3,byZX),l:'4',keep:true},
        {w:'five,',p:nth(kind('ladybug'),4,byZX),l:'5',keep:true},{w:'six,',p:nth(kind('ladybug'),5,byZX),l:'6',keep:true},{w:'seven.',p:nth(kind('ladybug'),6,byZX),l:'7',keep:true},{w:'seven ladybugs',p:kind('ladybug'),l:'7 seven'}]},
 {say:'More than: count forward',demo:'more2',speech:'More than means count forward. The bunny is on five. Two more than five: hop to six, hop to seven. Two more than five is seven!',
  cues:[{w:'count forward',hl:'more than → count forward'},{w:'on five',p:tile(5),l:'5'},{w:'to six',p:tile(6),l:'+1'},{w:'to seven',p:tile(7),l:'+2'},{w:'is seven',p:kind('bunny'),l:'7'}]},
 {say:'Less than: count back',demo:'less1',speech:'Less than means count backward. The bunny is on six. One less than six: hop back to five. One less than six is five.',
  cues:[{w:'count backward',hl:'less than → count back'},{w:'on six',p:tile(6),l:'6'},{w:'back to five',p:tile(5),l:'−1'},{w:'is five',p:kind('bunny'),l:'5'}]}],
/* 6 */ plus1:[
 {say:'1 more: and … make',demo:'two',speech:'Here are five ducks. One more duck wants to swim with them. Five and one make six. Now there are six ducks in all!',
  cues:[{w:'five ducks',p:left(kind('duck')),l:'5'},{w:'one more duck',p:right(kind('duck')),l:'1 more'},{w:'make six',demo:'joined',p:kind('duck'),l:'5 and 1 make 6'},{w:'in all',hl:'in all'}]},
 {say:'1 less: take away … leaves',demo:'take',speech:'Six cupcakes are on the tray. Cross one out: it is taken away. Six take away one leaves five. Five are left.',
  cues:[{w:'six cupcakes',p:kind('cupcake'),l:'6'},{w:'cross one out',demo:'takeone',p:crossed(true),l:'take away 1'},{w:'five are left',p:crossed(false),l:'5 left'}]}],
/* 7 */ facts6:[
 {say:'3 + 2 = 5',demo:'two',speech:'Three turtles plus two turtles. Join them together. Three plus two equals five. The plus sign means add. The equals sign means is the same as.',
  cues:[{w:'three turtles',p:left(kind('turtle')),l:'3'},{w:'two turtles',p:right(kind('turtle')),l:'+ 2'},{w:'equals five',demo:'joined',p:kind('turtle'),l:'3 + 2 = 5'},{w:'plus sign',hl:'+ plus'},{w:'equals sign',hl:'= equals'}]},
 {say:'6 − 2 = 4',demo:'took2',speech:'Six strawberries. Two are crossed out: minus two. Six minus two equals four. The minus sign means take away.',
  cues:[{w:'six strawberries',p:kind('strawberry'),l:'6'},{w:'two are crossed out',p:crossed(true),l:'− 2'},{w:'equals four',p:crossed(false),l:'= 4'}]},
 {say:'Steps for a word problem',demo:'bees',speech:'Here is a word problem. Five ladybugs are on a leaf. Three fly away. How many are left? The key word is left, so we subtract. Five minus three equals two.',
  cues:[{w:'word problem',hl:'Steps for a word problem'},{w:'five ladybugs',p:kind('ladybug'),l:'5'},{w:'three fly away',p:crossed(true),l:'− 3'},{w:'key word is left',hl:'left'},{w:'equals two',p:crossed(false),l:'2 left'}]}],
/* 8 */ facts10:[
 {say:'Count on',demo:'at6',speech:'To find six plus three, start at six. Count on three: seven, eight, nine. Six plus three equals nine.',
  cues:[{w:'start at six',p:tile(6),l:'start: 6'},{w:'seven,',demo:'go7',p:tile(7),l:'1'},{w:'eight,',demo:'go8',p:tile(8),l:'2'},{w:'nine.',demo:'go9',p:tile(9),l:'3'},{w:'equals nine',p:kind('bunny'),l:'6 + 3 = 9'}]},
 {say:'Count back',demo:'at9',speech:'To find nine minus four, start at nine and count back four: eight, seven, six, five. Nine minus four equals five.',
  cues:[{w:'start at nine',p:tile(9),l:'start: 9'},{w:'eight,',demo:'go8',p:tile(8),l:'1'},{w:'seven,',demo:'go7',p:tile(7),l:'2'},{w:'six,',demo:'go6',p:tile(6),l:'3'},{w:'five.',demo:'go5',p:tile(5),l:'4'},{w:'equals five',p:kind('bunny'),l:'9 − 4 = 5'}]},
 {say:'Going down: line up on the right',demo:'vert',speech:'We can also write a sum going down. Line up the numbers on the right side, ones under ones. Six plus four equals ten.',
  cues:[{w:'going down',p:ud('vcard',1),l:'going down'},{w:'right side',p:ud('vcard',1),l:'line up on the right'},{w:'equals ten',p:kind('shell'),l:'6 + 4 = 10'}]}],
/* 9 */ zero1:[
 {say:'Adding zero',demo:'add0',speech:'Five blocks and zero blocks. Adding zero adds nothing at all, so five plus zero is still five.',
  cues:[{w:'five blocks',p:kind('block'),l:'5'},{w:'zero blocks',hl:'+ 0 ='},{w:'still five',demo:'add0j',p:kind('block'),l:'5 + 0 = 5'}]},
 {say:'Take away all: zero',demo:'four',speech:'Four cupcakes. Leo’s friends eat all four. Four take away four leaves zero. Zero means none!',
  cues:[{w:'four cupcakes',p:kind('cupcake'),l:'4'},{w:'eat all four',demo:'none',p:crossed(true),l:'− 4'},{w:'zero means none',hl:'Zero means none',l:'4 − 4 = 0'}]},
 {say:'Key words: add or subtract?',demo:'cars',speech:'Key words help us choose. Seven cars and two more cars: how many in all? In all means add. Seven plus two equals nine. Left, fewer and more than mean subtract.',
  cues:[{w:'key words',hl:'key words'},{w:'seven cars',p:left(kind('car')),l:'7'},{w:'two more cars',p:right(kind('car')),l:'2'},{w:'in all means add',hl:'in all'},{w:'equals nine',demo:'carsj',p:kind('car'),l:'7 + 2 = 9'},{w:'mean subtract',hl:'left'}]}],
/* 10 */ num20:[
 {say:'13 = 10 and 3 more',demo:'c13',speech:'Thirteen is ten and three more. Here is a full row of ten strawberries, and three more. Ten, eleven, twelve, thirteen!',
  cues:[{w:'full row of ten',p:nth(kind('strawberry'),[0,1,2,3,4,5,6,7,8,9],byZX),l:'10'},{w:'and three more',p:nth(kind('strawberry'),[10,11,12],byZX),l:'3 more'},{w:'thirteen!',p:kind('strawberry'),l:'13'}]},
 {say:'Pair them up',demo:'pair9done',speech:'Is nine even or odd? Make pairs. Every pair gets a ring. One strawberry is left over, so nine is odd.',
  cues:[{w:'make pairs',p:{c:'#16a36f',u:'self'},l:'pairs'},{w:'left over',p:txt('left over!'),l:'odd'},{w:'nine is odd',hl:'9: one left over → odd'}]},
 {say:'Look at the last digit',demo:'pair14',speech:'Fourteen makes seven pairs, with none left over. Fourteen is even. Look at the last digit: four. Numbers that end in zero, two, four, six or eight are even.',
  cues:[{w:'seven pairs',p:{c:'#16a36f',u:'self'},l:'7 pairs'},{w:'fourteen is even',hl:'14 ends in 4 → even'},{w:'end in zero',hl:'0, 2, 4, 6, 8 → even'}]}],
/* 11 */ num100:[
 {say:'47 = 4 tens and 7 ones',demo:'show47',speech:'Forty-seven has four tens and seven ones. Each blue rod is a ten. Count the tens: ten, twenty, thirty, forty. Then count on the ones: forty-one, forty-two, all the way to forty-seven.',
  cues:[{w:'four tens',p:ud('rod',1),l:'4 tens'},{w:'seven ones',p:ud('one',1),l:'7 ones'},{w:'ten,',p:nth(ud('rod',1),0),l:'10'},{w:'twenty,',p:nth(ud('rod',1),1),l:'20',keep:true},{w:'thirty,',p:nth(ud('rod',1),2),l:'30',keep:true},{w:'forty.',p:nth(ud('rod',1),3),l:'40',keep:true},
        {w:'forty-seven.',p:ud('one',1),l:'47',keep:true}]},
 {say:'The hundreds chart',demo:'chart',speech:'This is a hundreds chart. It has ten rows and ten columns. Go right, and each number is one more. Go down, and each number is ten more.',
  cues:[{w:'hundreds chart',hl:'The hundreds chart'},{w:'go right',demo:'right',l:'44 → 45: one more'},{w:'go down',demo:'down',l:'45 → 55: ten more'}]},
 {say:'Even or odd? The ones digit',demo:'odd45',speech:'The ones digit tells if a number is even or odd. Forty-five ends in five, so it is odd. Ninety-six ends in six, so it is even.',
  cues:[{w:'ones digit',hl:'ones digit'},{w:'it is odd',l:'45: odd'},{w:'it is even',l:'96: even'}]}],
/* 12 */ skip1:[
 {say:'Count by 5s',demo:'g5',speech:'Each group has five stars. Count the groups by fives: five, ten, fifteen, twenty. Four groups of five make twenty.',
  cues:[{w:'five stars',p:nth(kind('star'),[0,1,2,3,4],byZX),l:'5'},{w:'five, ten',p:txt('10'),l:'10'},{w:'fifteen',p:txt('15'),l:'15'},{w:'twenty.',p:txt('20'),l:'20'},{w:'make twenty',p:kind('star'),l:'4 fives = 20'}]},
 {say:'Count by 2s',demo:'g2c',speech:'Mittens come in pairs. Count by twos: two, four, six, eight, ten. Five pairs make ten mittens.',
  cues:[{w:'count by twos',hl:'by 2s'},{w:'four,',p:txt('4'),l:'4'},{w:'six,',p:txt('6'),l:'6'},{w:'eight,',p:txt('8'),l:'8'},{w:'ten mittens',p:kind('mitten'),l:'5 twos = 10'}]},
 {say:'Count by 10s',demo:'c10',speech:'On the hundreds chart, counting by tens goes straight down the last column: ten, twenty, thirty, all the way to one hundred.',
  cues:[{w:'counting by tens',hl:'by 10s'},{w:'last column',l:'10, 20, 30 … 100'}]}],
/* 13 */ money1:[
 {say:'Canadian coins',demo:'all',speech:'These are Canada’s coins. The nickel is five cents. The dime is ten cents. The quarter is twenty-five cents. The loonie is one dollar, and the toonie is two dollars.',
  cues:[{w:'nickel',p:ud('coin','nickel'),l:'5¢'},{w:'dime',p:ud('coin','dime'),l:'10¢'},{w:'quarter',p:ud('coin','quarter'),l:'25¢'},{w:'loonie',p:ud('coin','loonie'),l:'$1'},{w:'toonie',p:ud('coin','toonie'),l:'$2'}]},
 {say:'Size is not value',demo:'dn',speech:'Size is not value! The dime is smaller than the nickel, but the dime is worth more. Ten cents is more than five cents.',
  cues:[{w:'size is not value',hl:'Size is not value!'},{w:'the dime is smaller',p:ud('coin','dime'),l:'smaller'},{w:'worth more',p:ud('coin','dime'),l:'10¢: worth more'}]},
 {say:'Count on to find the total',demo:'g20',speech:'To find the total, start with the coin worth the most, then count on. Ten, fifteen, twenty. That is twenty cents.',
  cues:[{w:'worth the most',p:ud('coin','dime'),l:'10'},{w:'fifteen,',p:nth(ud('coin','nickel'),0),l:'15'},{w:'twenty.',p:nth(ud('coin','nickel'),1),l:'20'},{w:'twenty cents',p:function(r){return all(r,function(x){return x.userData&&x.userData.coin;});},l:'20¢'}]},
 {say:'Subtract to find the change',demo:'shopkite',speech:'To find change, subtract. The kite costs three cents. You pay with a dime. Ten cents minus three cents is seven cents. Your change is seven cents.',
  cues:[{w:'kite costs',p:kind('kite'),l:'3¢'},{w:'pay with a dime',p:function(r){return all(r,function(x){return x.userData&&x.userData.coin==='dime';});},l:'10¢'},{w:'seven cents.',l:'10¢ − 3¢ = 7¢'}]}],
/* 14 */ units1:[
 {say:'End to end, no gaps',demo:'clipsdone',speech:'Lay the paper clips end to end, with no gaps. Count them: one, two, three, four, five, six. The ribbon is about six paper clips long.',
  cues:[{w:'end to end',p:{c:'#90a4ae',u:'parent'},l:'no gaps'},{w:'one,',p:txt('1'),l:'1'},{w:'three,',p:txt('3'),l:'3'},{w:'six.',p:txt('6'),l:'6'},{w:'six paper clips long',p:{c:'#ec407a'},l:'about 6 clips'}]},
 {say:'Big units, small units',demo:'steps',speech:'A footstep is a big unit. A hand span is a small unit. From the flower to the ball is four steps, but eight hand spans. The bigger the unit, the fewer we need!',
  cues:[{w:'footstep is a big unit',p:{c:'#8d6e63',u:'self'},l:'big unit'},{w:'hand span is a small unit',p:{c:'#ffcc80',u:'self'},l:'small unit'},{w:'four steps',p:{c:'#8d6e63',u:'self'},l:'4'},{w:'eight hand spans',p:{c:'#ffcc80',u:'self'},l:'8'}]},
 {say:'Area: cover it',demo:'areadone',speech:'Area tells how much a surface covers. Twelve square stickers cover this card, with no gaps. Its area is twelve stickers.',
  cues:[{w:'area tells',hl:'Area'},{w:'twelve square stickers',p:{c:'#ffe082',u:'self'},l:'12 stickers'},{w:'area is twelve',p:{c:'#bbdefb',u:'self'},l:'area: 12'}]}],
/* 15 */ capacity1:[
 {say:'Holds more, holds most',demo:'cmp',speech:'Capacity is how much a container holds. The glass holds a little. The jug holds more. The pail holds the most!',
  cues:[{w:'capacity is',hl:'Capacity is how much a container holds'},{w:'the glass',p:ud('cont','glass'),l:'a little'},{w:'the jug',p:ud('cont','jug'),l:'more'},{w:'the pail',p:ud('cont','pail'),l:'the most'}]},
 {say:'Test it: pour',demo:'poured',speech:'To test, pour! We poured the full jug into the bottle, and it spilled over. So the jug holds more than the bottle.',
  cues:[{w:'full jug',p:ud('cont','jug'),l:'A'},{w:'spilled over',p:ud('cont','bottle'),l:'it spills!'},{w:'jug holds more',p:ud('cont','jug'),l:'holds more'}]},
 {say:'Count cups',demo:'cupsdone',speech:'We can also count cups. Five cups of water fill the jug. So the jug holds five cups.',
  cues:[{w:'five cups',p:ud('cont','glass'),l:'5 cups'},{w:'jug holds five',p:ud('cont','jug'),l:'5 cups'}]}],
/* 16 */ mass1:[
 {say:'Heavier goes down',demo:'carapple',speech:'A balance compares mass. The heavier side goes down. The car goes down, so the car is heavier than the apple.',
  cues:[{w:'compares mass',hl:'A balance compares mass'},{w:'the car goes down',p:kind('car'),l:'heavier'},{w:'than the apple',p:kind('apple'),l:'lighter'}]},
 {say:'Measure with blocks',demo:'duck4',speech:'Now we measure with blocks. The duck balances four blocks. The balance is level, so the duck has the same mass as four blocks.',
  cues:[{w:'the duck balances',p:kind('duck'),l:'duck'},{w:'four blocks.',p:{c:'#8b5cf6',u:'self'},l:'4 blocks'},{w:'is level',hl:'level',l:'level'}]},
 {say:'Big is not always heavy',demo:'balloon',speech:'Big is not always heavy! The balloon is big, but it is lighter than the little acorn.',
  cues:[{w:'the balloon is big',p:kind('balloon'),l:'big, light'},{w:'little acorn',p:kind('acorn'),l:'small, heavier'}]},
 {say:'Lightest to heaviest',demo:'ordered',speech:'Put them in order from lightest to heaviest: the acorn, then the apple, then the car.',
  cues:[{w:'the acorn',p:kind('acorn'),l:'1'},{w:'the apple',p:kind('apple'),l:'2',keep:true},{w:'the car.',p:kind('car'),l:'3',keep:true}]}],
/* 17 */ shapes2d:[
 {say:'Six flat shapes',demo:'all',speech:'Here are six flat shapes: a circle, a triangle, a square, a rectangle, a pentagon and a hexagon.',
  cues:[{w:'circle',p:ud('shape','circle'),l:'circle'},{w:'triangle',p:ud('shape','triangle'),l:'triangle'},{w:'square',p:ud('shape','square'),l:'square'},{w:'rectangle',p:ud('shape','rectangle'),l:'rectangle'},{w:'pentagon',p:ud('shape','pentagon'),l:'pentagon'},{w:'hexagon',p:ud('shape','hexagon'),l:'hexagon'}]},
 {say:'Sides and corners',demo:'five',speech:'Count the sides of the pentagon: one, two, three, four, five. It has five sides. Where two sides meet, there is a corner. It has five corners too.',
  cues:[{w:'one,',p:txt('1'),l:'side 1'},{w:'three,',p:txt('3'),l:'side 3'},{w:'five sides',p:{c:'#e4572e',u:'self'},l:'5 sides'},{w:'five corners',p:{c:'#ffd54f',u:'self'},l:'5 corners'}]},
 {say:'Any size, any turn',demo:'odd',speech:'Shapes can be big or small, and turned any way. These are all triangles. This hexagon’s sides are not all the same, but it still has six sides, so it is a hexagon!',
  cues:[{w:'all triangles',p:ud('shape','triangle'),l:'triangles'},{w:'six sides',p:nth(ud('shape','hexagon'),0),l:'still a hexagon'}]}],
/* 18 */ shapes2:[
 {say:'Halves that match',demo:'folded',speech:'A picture is symmetrical when both halves match. Fold the heart down the middle: the halves match! Fold the letter R: the halves do not match.',
  cues:[{w:'both halves match',hl:'Symmetry: halves that match'},{w:'fold the heart',p:ud('pic','heart'),l:'symmetrical'},{w:'letter r',p:ud('pic','R'),l:'not symmetrical'}]},
 {say:'One half',demo:'half',speech:'This pizza is cut into two equal parts. Each part is one half. One half is coloured.',
  cues:[{w:'two equal parts',hl:'2 equal parts'},{w:'one half is coloured',p:{c:'#ffb74d',u:'self'},l:'one half'}]},
 {say:'Thirds and fourths',demo:'fourth',speech:'Four equal parts are called fourths. One part is one fourth. Three equal parts are called thirds.',
  cues:[{w:'one fourth',p:{c:'#ffb74d',u:'self'},l:'one fourth'},{w:'called thirds',demo:'third',p:{c:'#ffb74d',u:'self'},l:'one third'}]},
 {say:'Parts must be equal',demo:'unfair',speech:'Look at these two parts. They are not the same size, so they are not halves. Halves must be equal!',
  cues:[{w:'not the same size',p:{c:'#ffb74d',u:'self'},l:'too big!'},{w:'halves must be equal',hl:'Not fair!'}]}],
/* 19 */ solids:[
 {say:'Five solids',demo:'all',speech:'Here are five solids: a sphere, a cube, a cylinder, a cone and a prism.',
  cues:[{w:'sphere',p:ud('solid','sphere'),l:'sphere'},{w:'cube',p:ud('solid','cube'),l:'cube'},{w:'cylinder',p:ud('solid','cylinder'),l:'cylinder'},{w:'cone',p:ud('solid','cone'),l:'cone'},{w:'prism',p:ud('solid','prism'),l:'prism'}]},
 {say:'Roll or slide?',demo:'pushed',speech:'Give them a push! The sphere rolls. The cube and the prism slide on their flat faces. The cylinder and the cone can roll and slide.',
  cues:[{w:'the sphere rolls',p:ud('solid','sphere'),l:'rolls'},{w:'the cube and the prism',p:function(r){return ud('solid','cube')(r).concat(ud('solid','prism')(r));},l:'slide'},{w:'the cylinder and the cone',p:function(r){return ud('solid','cylinder')(r).concat(ud('solid','cone')(r));},l:'roll and slide'}]},
 {say:'Trace a face',demo:'trace',speech:'A face is a flat side of a solid. Trace a face of a cube, and you get a square. Trace a face of a cylinder, and you get a circle.',
  cues:[{w:'face of a cube',p:ud('solid','cube'),l:'cube → square'},{w:'face of a cylinder',demo:'tracecyl',p:ud('solid','cylinder'),l:'cylinder → circle'}]},
 {say:'Solids all around us',demo:'can',speech:'Everyday things look like solids. A can of soup looks like a cylinder. An ice cream cone looks like a cone!',
  cues:[{w:'can of soup',p:txt('can of soup'),l:'can'},{w:'looks like a cylinder',p:ud('solid','cylinder'),l:'cylinder'},{w:'ice cream cone',demo:'cone',p:ud('solid','cone'),l:'cone'}]}],
/* 20 */ where1:[
 {say:'In front of, behind',demo:'race',speech:'The finish line is the front. The duck is in front of the turtle. The turtle is behind the duck. The fish is last, behind everyone.',
  cues:[{w:'finish line',p:txt('FINISH'),l:'front'},{w:'the duck is in front',p:kind('duck'),l:'in front'},{w:'the turtle is behind',p:kind('turtle'),l:'behind'},{w:'the fish is last',p:kind('fish'),l:'last'}]},
 {say:'Left and right',demo:'lr',speech:'The apple is on the left of the mitten. The ball is on the right of the mitten. Your left hand makes the letter L!',
  cues:[{w:'the apple is on the left',p:kind('apple'),l:'left'},{w:'the ball is on the right',p:kind('ball'),l:'right'},{w:'left hand',hl:'Tip: your left hand makes an L!'}]}],
/* 21 */ where2:[
 {say:'Over and under',demo:'scene',speech:'The balloon is over the table. The ball is under the table.',
  cues:[{w:'the balloon is over',p:kind('balloon'),l:'over'},{w:'the ball is under',p:kind('ball'),l:'under'}]},
 {say:'Inside and outside',demo:'scene',speech:'The kite is inside the box. The turtle is outside the box.',
  cues:[{w:'the kite is inside',p:kind('kite'),l:'inside'},{w:'the turtle is outside',p:kind('turtle'),l:'outside'}]}],
/* 22 */ temp1:[
 {say:'Four seasons',demo:'seasons',speech:'There are four seasons. Spring is cool, then warm. Summer is hot and sunny. Fall is cool, then cold. Winter is cold and snowy.',
  cues:[{w:'spring is',p:ud('season','spring'),l:'spring'},{w:'summer is',p:ud('season','summer'),l:'summer'},{w:'fall is',p:ud('season','fall'),l:'fall'},{w:'winter is',p:ud('season','winter'),l:'winter'}]},
 {say:'Reading a thermometer',demo:'t25',speech:'A thermometer measures temperature in degrees Celsius. The red line shows twenty-five degrees. Twenty-five degrees is hot!',
  cues:[{w:'degrees celsius',hl:'Temperature: degrees Celsius (°C)'},{w:'the red line',p:{c:'#e53935',u:'self'},l:'red line'},{w:'twenty-five degrees.',p:txt('25'),l:'25 °C'},{w:'is hot',hl:'21–30 hot'}]},
 {say:'Up is warmer, down is colder',demo:'t5',speech:'When it gets colder, the red line goes down. Five degrees is cold. Wear a warm coat and mittens!',
  cues:[{w:'goes down',p:{c:'#e53935',u:'self'},l:'down: colder'},{w:'five degrees is cold',p:txt('5'),l:'5 °C: cold'},{w:'mittens',p:kind('mitten'),l:'mittens!'}]}],
/* 23 */ time1:[
 {say:'Minute hand, hour hand',demo:'h830',speech:'The long blue hand is the minute hand. The short red hand is the hour hand. At half past eight, the long hand points to six, and the short hand is between eight and nine.',
  cues:[{w:'minute hand',p:{c:'#1e88e5',u:'self'},l:'minute hand'},{w:'hour hand',p:{c:'#e53935',u:'self'},l:'hour hand'},{w:'points to six',p:txt('6'),l:'6'},{w:'between eight and nine',p:{any:[txt('8'),txt('9')]},l:'8 and 9'}]},
 {say:'o’clock',demo:'h3',speech:'At three o’clock, the long hand points to twelve, and the short hand points to three.',
  cues:[{w:'points to twelve',p:txt('12'),l:'12'},{w:'points to three',p:txt('3'),l:'3 o’clock'}]},
 {say:'The calendar',demo:'cal1',speech:'A calendar shows the days of a month. There are seven days in a week. June first is a Wednesday, and June has thirty days.',
  cues:[{w:'seven days in a week',hl:'7 days in a week'},{w:'june first',l:'June 1: Wednesday'}]}],
/* 24 */ patterns1:[
 {say:'Find the core',demo:'abb6',speech:'Star, ball, ball. Star, ball, ball. The part that repeats is called the core: star, ball, ball. So what comes next? A star!',
  cues:[{w:'star, ball, ball. star',p:nth(kinds(['star','ball']),[0,1,2]),l:'core'},{w:'called the core',p:nth(kinds(['star','ball']),[3,4,5]),l:'repeats'},{w:'a star!',demo:'abb7',p:nth(kind('star'),-1),l:'next: star'}]},
 {say:'An ABC pattern',demo:'abc',speech:'This core has three things: duck, fish, turtle. Duck, fish, turtle, duck, fish, turtle, duck, fish… and next comes a turtle!',
  cues:[{w:'duck, fish, turtle.',p:nth(kinds(['duck','fish','turtle']),[0,1,2]),l:'core: ABC'},{w:'comes a turtle',p:kind('turtle'),l:'turtle'}]},
 {say:'Patterns on the chart',demo:'col3',speech:'Patterns hide on the hundreds chart too. Three, thirteen, twenty-three, thirty-three. Every number ends in three, so they make a straight line down.',
  cues:[{w:'hundreds chart',hl:'Patterns on the hundreds chart'},{w:'ends in three',l:'3, 13, 23, 33 …'}]}],
/* 25 */ data1:[
 {say:'Sort and tally',demo:'col',speech:'Sort the balls by colour. Make one tally mark for each ball. Four red balls: four marks. Three blue balls: three marks.',
  cues:[{w:'by colour',hl:'By colour'},{w:'four red balls',p:{c:'#e53935',u:'parent'},l:'4 red'},{w:'four marks',p:left(function(r){return all(r,function(x){return x.isMesh&&x.geometry&&x.geometry.parameters&&x.geometry.parameters.depth>.3&&x.geometry.parameters.width<.05;});}),l:'||||'},{w:'three blue balls',p:{c:'#2f7de1',u:'parent'},l:'3 blue'}]},
 {say:'Bundles of 5',demo:'col',speech:'When we make tally marks, the fifth mark goes across the other four. That makes a bundle of five, so we can count by fives!',
  cues:[{w:'fifth mark',hl:'5th mark'},{w:'bundle of five',l:'𝍸 = 5'}]},
 {say:'Another way: by size',demo:'size',speech:'Now sort the same balls by size. Four big balls and three small balls. Same balls, but a different rule!',
  cues:[{w:'by size',hl:'By size'},{w:'four big balls',p:left(kind('ball')),l:'4 big'},{w:'three small balls',p:right(kind('ball')),l:'3 small'}]}],
/* 26 */ picto1:[
 {say:'Reading a pictograph',demo:'show',speech:'This pictograph shows our favourite fruit. Each picture stands for one child. Strawberries have the most: six. Carrots have the fewest: two.',
  cues:[{w:'each picture',p:nth(kind('apple'),0),l:'1 child'},{w:'strawberries have the most',p:kind('strawberry'),l:'most: 6'},{w:'carrots have the fewest',p:kind('carrot'),l:'fewest: 2'}]},
 {say:'Compare the columns',demo:'show',speech:'How many more strawberries than pears? Six minus three is three. Three more children chose strawberries.',
  cues:[{w:'strawberries than pears',p:kind('pear'),l:'3'},{w:'six minus three',p:kind('strawberry'),l:'6 − 3 = 3'}]}],
/* 27 */ cgraph1:[
 {say:'One cube for each',demo:'show',speech:'In a concrete graph, each cube stands for one child. Cookies have the tallest column: six. Donuts have the shortest column: three.',
  cues:[{w:'each cube',p:nth(col('#ffc04d'),0),l:'1 child'},{w:'cookies have the tallest',p:{c:'#5fd38a',u:'self'},l:'6 cookies'},{w:'donuts have the shortest',p:{c:'#2f7de1',u:'self'},l:'3 donuts'}]},
 {say:'How many in all?',demo:'show',speech:'To find how many children in all, add the columns: four, six, three and five. That makes eighteen children.',
  cues:[{w:'add the columns',p:{any:[{c:'#ffc04d',u:'self'},{c:'#5fd38a',u:'self'},{c:'#2f7de1',u:'self'},{c:'#8b5cf6',u:'self'}]},l:'4 + 6 + 3 + 5'},{w:'eighteen',l:'18 in all'}]}],
/* 28 */ chance1:[
 {say:'More likely, less likely',demo:'spinner',speech:'This spinner has three yellow parts and one green part. Yellow has more space, so landing on yellow is more likely. Green is less likely.',
  cues:[{w:'three yellow parts',p:{c:'#ffd54f',u:'self'},l:'3 yellow'},{w:'one green part',p:{c:'#43a047',u:'self'},l:'1 green'},{w:'more likely',p:{c:'#ffd54f',u:'self'},l:'more likely'},{w:'less likely',p:{c:'#43a047',u:'self'},l:'less likely'}]},
 {say:'Likely, unlikely, impossible',demo:'bag',speech:'In this bag, four marbles are red and one is blue. Picking red is likely. Picking blue is unlikely. Picking green is impossible: there are no green marbles!',
  cues:[{w:'four marbles are red',p:{c:'#e53935',u:'self'},l:'4 red'},{w:'one is blue',p:{c:'#2f7de1',u:'self'},l:'1 blue'},{w:'red is likely',p:{c:'#e53935',u:'self'},l:'likely'},{w:'blue is unlikely',p:{c:'#2f7de1',u:'self'},l:'unlikely'},{w:'impossible',hl:'impossible'}]},
 {say:'Certain',demo:'allred',speech:'Now every marble is red. Picking red is certain. It will surely happen!',
  cues:[{w:'every marble is red',p:{c:'#e53935',u:'self'},l:'all red'},{w:'certain',hl:'certain',l:'certain'}]}]
};
})();
