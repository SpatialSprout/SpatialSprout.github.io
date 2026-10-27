/* The Interactive Classroom: Grade 5 Math — theory that comes alive.
   When the voice says a word in a cue, the matching 3D pieces lift, glow and wear a name tag,
   and the word is highlighted on the page. */
(function(){var P=window.PM;if(!P)return;
var TT='#8b5cf6',TH='#16a36f',HU='#2f7de1',TE='#e4572e',ON='#e89a00',VIBE=['#ff8a5b','#ffb347','#ffd24a','#5cc46a','#4fb3ff','#8b5cf6'];
function bx(x0,x1,z0,z1){var b={x:[x0,x1]};if(z0!=null)b.z=[z0,z1];return b;}
P.theory={
/* 1 */ pv5:[
 {say:'52 306: five places',demo:'show',speech:'Fifty-two thousand three hundred six has five places. Five ten thousands. Two thousands. Three hundreds. Zero tens. And six ones.',
  cues:[{w:'five ten thousands',p:{c:TT},l:'5 × 10 000',hl:'ten thousands'},{w:'two thousands',p:{c:TH},l:'2 × 1000',keep:true,hl:'thousands'},{w:'three hundreds',p:{c:HU},l:'3 × 100',keep:true,hl:'hundreds'},{w:'zero tens',l:'0 tens',keep:true},{w:'six ones',p:{c:ON},l:'6 × 1',keep:true,hl:'ones'}]},
 {say:'Each place is ten times the next.',demo:'show',speech:'Each place is worth ten times the place to its right. Ten thousands make one ten thousand. That is why we can regroup.',
  cues:[{w:'ten times',hl:'ten times'},{w:'ten thousands make',p:{c:TH},l:'10 × 1000 = 10 000'},{w:'regroup',hl:'regroup'}]}],
/* 2 */ equiv5:[
 {say:'1/2 = 2/4 = 3/6',demo:'half',speech:'The top bar shows one half. Split the bottom bar into fourths: two fourths match. Split it into sixths: three sixths match. They are equivalent fractions.',
  cues:[{w:'one half',p:{c:HU},l:'1/2'},{w:'into fourths',demo:'d4',p:{c:TH},l:'2/4'},{w:'into sixths',demo:'d6',p:{c:TH},l:'3/6'},{w:'equivalent',hl:'equivalent',l:'1/2 = 2/4 = 3/6',keep:true}]},
 {say:'Multiply top and bottom.',demo:'hold',speech:'To make an equivalent fraction, multiply the numerator and the denominator by the same number. One half, times three over three, is three sixths.',
  cues:[{w:'numerator and the denominator',hl:'numerator'},{w:'times three over three',p:{c:TH},l:'1×3 / 2×3 = 3/6'}]}],
/* 3 */ order5:[
 {say:'Use benchmarks.',demo:'show',speech:'Use benchmarks like zero, one half and one. Five twelfths is a bit less than one half. Three fourths is between one half and one. One and one half is more than one.',
  cues:[{w:'benchmarks',hl:'benchmarks'},{w:'five twelfths',p:{c:'#e4572e',u:'parent'},l:'< 1/2'},{w:'three fourths',p:{c:'#2f7de1',u:'parent'},l:'between 1/2 and 1'},{w:'one and one half',p:{c:'#16a36f',u:'parent'},l:'> 1'}]},
 {say:'Place them on the line.',demo:'show',speech:'Now place them on the number line, from least to greatest.',
  cues:[{w:'number line',demo:'sm',hl:'number line'},{w:'least to greatest',l:'5/12 < 3/4 < 1 1/2',keep:true}]}],
/* 4 */ hundredths:[
 {say:'1.47 in blocks',demo:'show',speech:'In one point four seven, the one is one whole: a flat. The four is four tenths: four rods. The seven is seven hundredths: seven small cubes.',
  cues:[{w:'one whole',p:{c:HU},l:'1 whole',hl:'whole'},{w:'four tenths',p:{c:TH},l:'4 tenths = 0.4',keep:true,hl:'tenths'},{w:'seven hundredths',p:{c:ON},l:'7 hundredths = 0.07',keep:true,hl:'hundredths'}]},
 {say:'Read it out loud.',demo:'show',speech:'We read it as one and forty-seven hundredths. It sits between one and two on the number line.',
  cues:[{w:'forty-seven hundredths',p:{c:[TH,ON]},l:'0.47'},{w:'number line',p:{c:'#e4572e'},l:'1.47'}]}],
/* 5 */ round5:[
 {say:'Between 3.4 and 3.5',demo:'r347',speech:'Three point four seven is between three point four and three point five. To round to the nearest tenth, look at the hundredths digit.',
  cues:[{w:'three point four and',p:{c:'#ffd24a'},l:'3.4 · 3.5'},{w:'hundredths digit',p:{c:'#e4572e'},l:'7 hundredths',hl:'hundredths'}]},
 {say:'7 rounds up.',demo:'r347',speech:'Seven is five or more, so we round up. The ball rolls to three point five.',
  cues:[{w:'round up',hl:'round up'},{w:'rolls to',demo:'rollnow',p:{c:'#ffd24a',box:bx(1.6,2.5)},l:'3.47 → 3.5'}]}],
/* 6 */ percent5:[
 {say:'Percent means out of 100.',demo:'clear',speech:'Percent means out of one hundred. This grid has one hundred squares. Shade twenty-five of them.',
  cues:[{w:'out of one hundred',hl:'percent',l:'100 squares'},{w:'shade twenty-five',demo:'n25',p:{c:['#2f7de1','#3b8be6','#16a36f']},l:'25 of 100'}]},
 {say:'1/4 = 0.25 = 25%',demo:'hold',speech:'Twenty-five out of one hundred is twenty-five hundredths, or zero point two five, or twenty-five percent. It is also one quarter of the grid!',
  cues:[{w:'twenty-five hundredths',l:'25/100'},{w:'zero point two five',l:'0.25'},{w:'twenty-five percent',l:'25%',hl:'percent'},{w:'one quarter',p:{c:['#2f7de1','#3b8be6','#16a36f']},l:'= 1/4'}]}],
/* 7 */ facts12:[
 {say:'12 × 7 as an array',demo:'show',speech:'Twelve rows of seven is twelve times seven. Turning the array around gives seven times twelve. Same product! That is the commutative property.',
  cues:[{w:'twelve rows of seven',p:{c:HU},l:'12 × 7'},{w:'commutative',hl:'commutative',l:'12 × 7 = 7 × 12'}]},
 {say:'Split: 10 × 7 + 2 × 7',demo:'show',speech:'Split it to make it easy. Ten times seven is seventy. Two times seven is fourteen. Seventy plus fourteen is eighty-four. That is the distributive property.',
  cues:[{w:'split it',demo:'splitnow'},{w:'ten times seven',p:{c:HU},l:'10 × 7 = 70'},{w:'two times seven',p:{c:'#f08a24'},l:'2 × 7 = 14',keep:true},{w:'eighty-four',l:'70 + 14 = 84',keep:true},{w:'distributive',hl:'distributive'}]}],
/* 8 */ times01:[
 {say:'× 0.1 moves digits right.',demo:'v3400',speech:'Multiplying by zero point one is finding one tenth. Every digit moves one place to the right. Thirty-four times zero point one is three point four.',
  cues:[{w:'one tenth',hl:'tenth'},{w:'one place to the right',demo:'ax01',hl:'right'},{w:'three point four',l:'34 × 0.1 = 3.4'}]},
 {say:'× 0.01 moves two places.',demo:'hold',speech:'Multiplying by zero point zero one moves every digit two places to the right. The number gets smaller.',
  cues:[{w:'two places',l:'two places →',hl:'two places'},{w:'smaller',l:'smaller!',keep:true}]}],
/* 9 */ addsub5:[
 {say:'Line up and add.',demo:'show',speech:'To add forty-six thousand eight hundred seventy-five plus twenty-eight thousand three hundred forty-nine, line up the places and start with the ones.',
  cues:[{w:'line up the places',p:{c:['#d7e6fb','#fbdde6']},l:'line up the places',hl:'places'},{w:'start with the ones',demo:'showme',hl:'ones'}]},
 {say:'Carry when a column is 10 or more.',demo:'hold',speech:'When a column adds to ten or more, write the ones digit and carry one to the next column. With decimals, line up the decimal points first.',
  cues:[{w:'carry one',l:'carry 1',hl:'carry'},{w:'decimal points',hl:'decimal points',l:'line up the decimal points'}]}],
/* 10 */ fracadd5:[
 {say:'3/8 + 2/8',demo:'show',speech:'Three eighths plus two eighths. The pieces are all eighths, so just count them. Three pieces, plus one, plus two. Five eighths!',
  cues:[{w:'three eighths plus',p:{c:HU},l:'3/8'},{w:'plus one',demo:'add1',p:{c:'#e4572e'},l:'+1/8'},{w:'plus two',demo:'add1',p:{c:'#e4572e'},l:'+2/8'},{w:'five eighths',p:{c:[HU,'#e4572e']},l:'5/8'}]},
 {say:'Keep the denominator.',demo:'hold',speech:'When the denominators are the same, add the numerators. The denominator stays the same, because the size of the pieces does not change.',
  cues:[{w:'add the numerators',hl:'numerators',l:'3 + 2 = 5'},{w:'stays the same',hl:'denominator',l:'still eighths'}]}],
/* 11 */ mult5:[
 {say:'Split both numbers.',demo:'show',speech:'For twenty-three times forty-seven, split twenty-three into twenty and three, and forty-seven into forty and seven. The area model has four parts.',
  cues:[{w:'twenty and three',l:'20 + 3'},{w:'forty and seven',l:'40 + 7',keep:true},{w:'four parts',p:{c:['#2f7de1','#e4572e','#16a36f','#e89a00'].map(function(c){return P.tint(c,.3);})},l:'4 parts',hl:'area model'}]},
 {say:'Find each partial product.',demo:'show',speech:'Twenty times forty is eight hundred. Twenty times seven is one hundred forty. Three times forty is one hundred twenty. Three times seven is twenty-one. The total is one thousand eighty-one.',
  cues:[{w:'twenty times forty',demo:'r0',p:{c:'#2f7de1'},l:'800'},{w:'twenty times seven',demo:'r1',p:{c:'#e4572e'},l:'140',keep:true},{w:'three times forty',demo:'r2',p:{c:'#16a36f'},l:'120',keep:true},{w:'three times seven',demo:'r3',p:{c:'#e89a00'},l:'21',keep:true},{w:'one thousand eighty-one',l:'= 1081',keep:true,hl:'partial products'}]}],
/* 12 */ divide5:[
 {say:'Divide in chunks.',demo:'show',speech:'Three hundred eighty-four divided by sixteen. Take away chunks of sixteen. Ten groups of sixteen is one hundred sixty. Take another ten groups.',
  cues:[{w:'chunks',hl:'chunks'},{w:'ten groups of sixteen',demo:'a10',p:{c:'#2f7de1'},l:'10 × 16 = 160'},{w:'another ten',demo:'a10',p:{c:'#16a36f'},l:'10 × 16 = 160'}]},
 {say:'Then the rest.',demo:'hold',speech:'Sixty-four is left. That is four groups of sixteen. Ten plus ten plus four is twenty-four. So three hundred eighty-four divided by sixteen is twenty-four.',
  cues:[{w:'sixty-four is left',p:{c:'#ffcf3f'},l:'64 left'},{w:'four groups',demo:'a4',l:'4 × 16 = 64'},{w:'is twenty-four',l:'384 ÷ 16 = 24',keep:true}]}],
/* 13 */ unitfrac5:[
 {say:'3 × 1/4 = 3/4',demo:'m0',speech:'Three times one fourth means three groups of one fourth. One fourth, two fourths, three fourths!',
  cues:[{w:'one fourth, two',demo:'add1',p:{c:'#e4572e'},l:'1/4'},{w:'two fourths',demo:'add1',p:{c:'#e4572e'},l:'2/4'},{w:'three fourths!',demo:'add1',p:{c:'#e4572e'},l:'3/4'}]},
 {say:'3 ÷ 1/4 = 12',demo:'d0',speech:'Three divided by one fourth asks: how many fourths fit in three wholes? Cut each whole into fourths and count: twelve!',
  cues:[{w:'three wholes',p:{c:['#2f7de1','#16a36f','#e89a00']},l:'3 wholes'},{w:'cut each whole',demo:'cut4',p:{c:['#2f7de1','#16a36f','#e89a00']},l:'12 fourths'},{w:'twelve!',l:'3 ÷ 1/4 = 12',keep:true}]}],
/* 14 */ ratio5:[
 {say:'A ratio of 2 to 3',demo:'show',speech:'Layla’s orange paint uses two cups of red for every three cups of white. The ratio is two to three.',
  cues:[{w:'two cups of red',p:{c:'#e0453a'},l:'2 red'},{w:'three cups of white',p:{c:'#ffffff',box:{z:[-1.6,-.9]}},l:'3 white',keep:true},{w:'two to three',l:'2 : 3',keep:true,hl:'ratio'}]},
 {say:'Equivalent ratios',demo:'show',speech:'Make two batches: four to six. Three batches: six to nine. Multiply both parts by the same number, and the ratios stay equivalent.',
  cues:[{w:'two batches',demo:'n2',p:{c:'#e0453a'},l:'4 : 6'},{w:'three batches',demo:'n3',p:{c:'#e0453a'},l:'6 : 9'},{w:'same number',hl:'equivalent',l:'2:3 = 4:6 = 6:9',keep:true}]}],
/* 15 */ patterns5:[
 {say:'A shrinking pattern',demo:'show',speech:'This pattern starts at fifteen and goes down by two each time: fifteen, thirteen, eleven, nine. It is a shrinking pattern.',
  cues:[{w:'fifteen, thirteen',p:{c:VIBE[0]},l:'15',s:.22},{w:'thirteen, eleven',p:{c:VIBE[1]},l:'13',s:.22,keep:true},{w:'eleven, nine',p:{c:VIBE[2]},l:'11',s:.22,keep:true},{w:'nine.',p:{c:VIBE[3]},l:'9',s:.22,keep:true},{w:'shrinking',hl:'shrinking'}]},
 {say:'The rule and the graph',demo:'show',speech:'The rule is: start at fifteen, subtract two. On the graph, the points still make a straight line, going down.',
  cues:[{w:'the rule',hl:'rule',l:'start 15, − 2'},{w:'straight line',p:{c:'#8b5cf6',u:'self',box:{y:[.1,3]}},l:'straight line ↘'}]}],
/* 16 */ expr5:[
 {say:'3n + 2',demo:'show',speech:'The expression three n plus two means three bags of n, plus two more. The three is the coefficient. The two is the constant.',
  cues:[{w:'three bags',p:{c:'#8b5cf6',cell:true},l:'3n'},{w:'two more',p:{c:'#16a36f'},l:'+ 2',keep:true},{w:'coefficient',hl:'coefficient'},{w:'constant',hl:'constant'}]},
 {say:'Evaluate when n = 4',demo:'show',speech:'To evaluate, put a number in for n. When n is four, three fours make twelve, plus two is fourteen.',
  cues:[{w:'evaluate',hl:'evaluate'},{w:'n is four',p:{c:'#8b5cf6',cell:true},l:'n = 4'},{w:'is fourteen',p:{c:'#ffcf3f'},l:'3 × 4 + 2 = 14'}]}],
/* 17 */ equations5:[
 {say:'n + 37 = 82',demo:'show',speech:'On the balance, n plus thirty-seven equals eighty-two. The balance is level only when both sides are equal.',
  cues:[{w:'thirty-seven',p:{c:'#16a36f'},l:'37'},{w:'eighty-two',p:{c:'#2f7de1'},l:'82',keep:true},{w:'level',hl:'equal'}]},
 {say:'Undo with the inverse.',demo:'show',speech:'Use the inverse operation to undo. Eighty-two minus thirty-seven is forty-five. So n is forty-five, and the balance is level!',
  cues:[{w:'inverse operation',hl:'inverse'},{w:'is forty-five',demo:'n45',p:{c:'#8b5cf6'},l:'n = 45 ✓'}]}],
/* 18 */ inequal5:[
 {say:'Find the boundary.',demo:'show',speech:'For x plus seven is less than twenty, first solve the matching equation: x plus seven equals twenty. So x is thirteen. That is the boundary.',
  cues:[{w:'boundary',demo:'b13',p:{c:'#ffd24a'},l:'boundary 13',hl:'boundary'}]},
 {say:'Test it, then shade.',demo:'hold',speech:'Is thirteen a solution? Thirteen plus seven is twenty, which is not less than twenty. So thirteen is not included. Every number smaller than thirteen works.',
  cues:[{w:'not included',demo:'excl',l:'13 not included'},{w:'smaller than thirteen',p:{c:'#16a36f'},l:'x < 13'}]}],
/* 19 */ coding5:[
 {say:'If, then, else',demo:'hold',speech:'A conditional statement asks a question that is true or false. If the number on the ball is greater than twenty, it goes to the red bin. Else, it goes to the blue bin.',
  cues:[{w:'conditional',hl:'conditional'},{w:'red bin',p:{c:'#e0453a'},l:'true → red'},{w:'blue bin',p:{c:'#2f7de1'},l:'false → blue'}]},
 {say:'Run the machine.',demo:'hold',speech:'Let’s run it. The machine checks each ball, one at a time, and sorts it.',
  cues:[{w:'run it',demo:'runnow',l:'if n > 20'}]}],
/* 20 */ sampling5:[
 {say:'A random sample',demo:'hold',speech:'We cannot ask all one hundred students, so we ask a sample of twenty. In a random sample, everyone has the same chance to be picked.',
  cues:[{w:'sample of twenty',demo:'rnd',p:{c:'#16a36f'},l:'20 picked',hl:'sample'},{w:'same chance',hl:'random'}]},
 {say:'Relative frequency',demo:'hold',speech:'If six of the twenty choose hockey, the relative frequency is six twentieths. That is zero point three, or thirty percent.',
  cues:[{w:'relative frequency',hl:'relative frequency'},{w:'six twentieths',l:'6/20'},{w:'thirty percent',l:'= 0.3 = 30%',keep:true}]}],
/* 21 */ stacked5:[
 {say:'Parts of a whole bar',demo:'grow',speech:'A stacked-bar graph splits each bar into parts. Each part shows walk, bus or car. The whole bar shows the total for each grade.',
  cues:[{w:'stacked-bar',hl:'stacked'},{w:'walk, bus or car',l:'walk · bus · car'},{w:'the total',l:'whole bar = total',keep:true}]},
 {say:'Watch for misleading graphs.',demo:'hold',speech:'A good graph’s scale starts at zero. If the axis starts at forty, small differences look huge. Always check the scale!',
  cues:[{w:'starts at zero',hl:'scale',l:'scale starts at 0'},{w:'look huge',demo:'mislead',l:'misleading!'}]}],
/* 22 */ mean5:[
 {say:'The median is the middle.',demo:'show',speech:'Six teammates scored goals. Sort them from least to greatest. There are two middle values: five and seven. The median is halfway between them: six.',
  cues:[{w:'least to greatest',demo:'sortnow'},{w:'two middle values',p:{c:'#ffd24a'},l:'5 and 7'},{w:'median is halfway',p:{c:'#ffd24a'},l:'median = 6',hl:'median'}]},
 {say:'Mean and mode',demo:'hold',speech:'The mode is the value that happens most often: seven. The mean is the total shared equally. Thirty-three goals for six players is five point five.',
  cues:[{w:'mode',p:{c:'#ff9f68'},l:'mode = 7',hl:'mode'},{w:'shared equally',demo:'even',hl:'mean'},{w:'five point five',l:'mean = 5.5',keep:true}]}],
/* 23 */ prob5:[
 {say:'Theoretical probability',demo:'hold',speech:'This spinner has eight equal parts. Three are red. The theoretical probability of red is three out of eight: three eighths.',
  cues:[{w:'eight equal parts',l:'8 parts'},{w:'three are red',p:{c:'#e0453a'},l:'3 red'},{w:'three eighths',p:{c:'#e0453a'},l:'P(red) = 3/8',hl:'theoretical'}]},
 {say:'Experimental probability',demo:'hold',speech:'Now let’s test it with twenty spins. The experimental results are close to three eighths, but not exactly the same.',
  cues:[{w:'twenty spins',demo:'spin20',hl:'experimental'},{w:'not exactly',l:'close, not exact',keep:true}]}],
/* 24 */ triangles5:[
 {say:'Name a triangle by its sides.',demo:'hold',speech:'By sides: an equilateral triangle has three equal sides. An isosceles triangle has two. A scalene triangle has none.',
  cues:[{w:'equilateral',hl:'equilateral',l:'3 equal sides'},{w:'isosceles',hl:'isosceles',l:'2 equal sides'},{w:'scalene',hl:'scalene',l:'no equal sides'}]},
 {say:'Name it by its angles.',demo:'hold',speech:'By angles: acute has three small angles. Right has one right angle. Obtuse has one wide angle. Watch the vertex move!',
  cues:[{w:'acute',hl:'acute',l:'acute'},{w:'right angle',hl:'right',l:'right'},{w:'obtuse',hl:'obtuse',l:'obtuse'},{w:'vertex move',demo:'reshape'}]}],
/* 25 */ congruent5:[
 {say:'Exactly the same size and shape',demo:'hold',speech:'Two shapes are congruent if they are exactly the same size and shape. Sliding, turning or flipping does not change that.',
  cues:[{w:'congruent',hl:'congruent'},{w:'sliding, turning',demo:'match',l:'slide · turn · flip'}]},
 {say:'Matching sides and angles',demo:'hold',speech:'Congruent shapes have matching sides and matching angles. The copy fits exactly on the outline.',
  cues:[{w:'matching sides',hl:'matching',l:'same sides'},{w:'fits exactly',l:'congruent!'}]}],
/* 26 */ views5:[
 {say:'Front, side and top',demo:'hold',speech:'This structure is made of cubes. Its front view is on the back wall. Its side view is on the left wall. Its top view is on the floor.',
  cues:[{w:'front view',hl:'front view',l:'front view'},{w:'side view',hl:'side view',l:'side view'},{w:'top view',hl:'top view',l:'top view'}]},
 {say:'Tallest in each column',demo:'hold',speech:'The front view shows the tallest cube in each column. Moving a cube to the back keeps the front view, but changes the side view.',
  cues:[{w:'tallest cube',l:'tallest in each column'},{w:'moving a cube',demo:'move',l:'side view changes'}]}],
/* 27 */ coords5:[
 {say:'Plot with a scale of 2',demo:'hold',speech:'On this grid, each line is worth two. To plot six, ten: go three lines across, that is six, and five lines up, that is ten.',
  cues:[{w:'worth two',hl:'scale',l:'each line = 2'},{w:'three lines across',demo:'plot',l:'x = 6'},{w:'five lines up',l:'(6, 10)',keep:true}]},
 {say:'Slide, flip, turn',demo:'hold',speech:'A translation slides a shape. A reflection flips it over a line. A rotation turns it around a point.',
  cues:[{w:'translation',hl:'translation',l:'slide'},{w:'reflection',hl:'reflection',l:'flip'},{w:'rotation',demo:'rotate',hl:'rotation',l:'turn'}]}],
/* 28 */ metric5:[
 {say:'Down the unit stairs',demo:'show',speech:'Metric units are like a staircase. Each step down to a smaller unit multiplies by ten. Three kilometres. Thirty. Three hundred. Three thousand metres!',
  cues:[{w:'staircase',hl:'staircase'},{w:'three kilometres',l:'3 km'},{w:'thirty.',demo:'st',l:'× 10'},{w:'three hundred.',demo:'st',l:'× 10'},{w:'three thousand metres',demo:'st',l:'3 km = 3000 m'}]},
 {say:'Remember the steps.',demo:'hold',speech:'One kilometre is one thousand metres. One metre is one hundred centimetres. One centimetre is ten millimetres.',
  cues:[{w:'one thousand metres',l:'1 km = 1000 m',hl:'kilometre'},{w:'one hundred centimetres',l:'1 m = 100 cm'},{w:'ten millimetres',l:'1 cm = 10 mm'}]}],
/* 29 */ protractor5:[
 {say:'Fill the angle with wedges.',demo:'a15',speech:'Each small wedge is fifteen degrees. This angle holds six wedges: fifteen, thirty, forty-five, sixty, seventy-five, ninety degrees!',
  cues:[{w:'fifteen degrees',hl:'degrees'},{w:'fifteen, thirty',demo:'a30',l:'30°'},{w:'forty-five',demo:'a45',l:'45°'},{w:'sixty',demo:'a60',l:'60°'},{w:'seventy-five',demo:'a75',l:'75°'},{w:'ninety degrees',demo:'a90',l:'90°'}]},
 {say:'Use a protractor.',demo:'hold',speech:'A protractor is a half circle with one hundred eighty degrees. Put its centre on the vertex, line up zero with one arm, and read where the other arm crosses.',
  cues:[{w:'protractor',hl:'protractor'},{w:'one hundred eighty',l:'180°'},{w:'on the vertex',l:'centre on the vertex'}]}],
/* 30 */ area5:[
 {say:'Parallelogram → rectangle',demo:'hold',speech:'Cut the triangle off one end of the parallelogram and slide it to the other end. Now it is a rectangle with the same base and height.',
  cues:[{w:'cut the triangle',demo:'cutnow',hl:'parallelogram'},{w:'same base and height',l:'area = base × height'}]},
 {say:'A triangle is half.',demo:'hold',speech:'Two copies of a triangle make a parallelogram. So the area of a triangle is base times height, divided by two.',
  cues:[{w:'two copies',demo:'tri',hl:'triangle'},{w:'divided by two',l:'area = b × h ÷ 2'}]}],
/* 31 */ tax5:[
 {say:'Add the subtotal.',demo:'show',speech:'A notebook costs three dollars forty-nine. A water bottle costs twelve dollars fifty. Line up the decimal points: the subtotal is fifteen dollars ninety-nine.',
  cues:[{w:'notebook',p:{c:'#2f7de1'},l:'$3.49'},{w:'water bottle',p:{c:'#16a36f'},l:'$12.50'},{w:'subtotal',l:'subtotal $15.99',hl:'subtotal'}]},
 {say:'Add 13% HST.',demo:'show',speech:'In Ontario, most things have thirteen percent sales tax, called HST. Thirteen percent of fifteen ninety-nine is about two dollars eight cents. The total is eighteen dollars seven cents.',
  cues:[{w:'thirteen percent',hl:'HST',l:'HST 13%'},{w:'two dollars eight',l:'tax ≈ $2.08'},{w:'eighteen dollars',l:'total $18.07',keep:true}]}],
/* 32 */ budget5:[
 {say:'Needs, wants, save, give',demo:'hold',speech:'Layla earns forty dollars a month. A budget splits it into needs, wants, savings and giving. When the plan matches the income, the budget is balanced.',
  cues:[{w:'forty dollars',l:'$40 income'},{w:'needs, wants',demo:'budget',hl:'budget'},{w:'balanced',l:'balanced!',keep:true}]},
 {say:'Credit and debt',demo:'hold',speech:'Credit lets you buy now and pay later. The money you owe is debt. Lenders charge interest, so you pay back more than you borrowed.',
  cues:[{w:'credit',hl:'credit',l:'buy now, pay later'},{w:'debt',hl:'debt',l:'money owed'},{w:'interest',hl:'interest',l:'+ interest'}]}],
/* 33 */ value5:[
 {say:'Find the unit rate.',demo:'show',speech:'Three litres of juice cost four dollars fifty. Two litres cost three dollars twenty. Split each into one-litre parts to find the price per litre.',
  cues:[{w:'unit',hl:'unit rate'},{w:'one-litre parts',demo:'splitnow',l:'$1.50 / L vs $1.60 / L'}]},
 {say:'Lowest unit rate wins.',demo:'hold',speech:'The three-litre pack is one dollar fifty per litre. The two-litre pack is one dollar sixty. The lowest unit rate is the best value!',
  cues:[{w:'one dollar fifty per',l:'$1.50 / L'},{w:'one dollar sixty',l:'$1.60 / L'},{w:'best value',l:'best value!',hl:'best value'}]}]
};})();
