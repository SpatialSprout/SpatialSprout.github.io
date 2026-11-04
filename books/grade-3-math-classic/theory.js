/* The Interactive Classroom: Grade 3 Math — theory that comes alive.
   When the voice says a word in a cue, the matching 3D pieces lift, glow and wear a name tag,
   and the word is highlighted on the page. */
(function(){var P=window.PM;if(!P)return;
var H='#6ea8f5',T='#f79a5c',O='#ffcf3f',VIBE=['#ff8a5b','#ffb347','#ffd24a','#5cc46a','#4fb3ff','#8b5cf6'],FROG={c:'#5cc46a',u:'parent'};
var TOP={z:[-2.6,-1.5]},POTS=['#bcd5f7','#a7dcc0'],FCOL=['#ff8a8a','#6ea0ff','#ffd84a','#ffa060'];
function geoH(h){return function(g){var o=[];g.traverse(function(m){if(m.isMesh&&m.geometry.parameters&&Math.abs((m.geometry.parameters.height||0)-h)<.001&&Math.abs((m.geometry.parameters.width||0)-.1)<.001)o.push(m);});return o;};}
function bx(x0,x1,z0,z1){var b={x:[x0,x1]};if(z0!=null)b.z=[z0,z1];return b;}
P.theory={
/* 1 */ place:[
 {say:'Every digit has a place.',demo:'show',speech:'Every digit has a place. In two hundred forty-seven, the two is in the hundreds place: two hundreds. The four is in the tens place: four tens. The seven is in the ones place: seven ones.',
  cues:[{w:'hundreds place',p:{c:H},l:'2 hundreds = 200',hl:'hundreds'},{w:'tens place',p:{c:T},l:'4 tens = 40',keep:true,hl:'tens'},{w:'ones place',p:{c:O},l:'7 ones = 7',keep:true,hl:'ones'}]},
 {say:'247 = 200 + 40 + 7',demo:'show',speech:'So two hundred forty-seven is two hundred, plus forty, plus seven. Writing it this way is called expanded form.',
  cues:[{w:'two hundred,',p:{c:H},l:'200'},{w:'plus forty',p:{c:T},l:'+ 40',keep:true},{w:'plus seven',p:{c:O},l:'+ 7',keep:true},{w:'expanded form',l:'200 + 40 + 7',keep:true,hl:'expanded form'}]}],
/* 2 */ skip:[
 {say:'Skip count by 100s.',demo:'reset',speech:'Skip counting means adding the same amount each time. Let’s count by hundreds. One hundred! Two hundred! Three hundred! Four hundred! Five hundred!',
  cues:[{w:'same amount',hl:'skip counting'},{w:'one hundred!',demo:'j100',p:FROG,l:'100'},{w:'two hundred!',demo:'j100',p:FROG,l:'200'},{w:'three hundred!',demo:'j100',p:FROG,l:'300'},{w:'four hundred!',demo:'j100',p:FROG,l:'400'},{w:'five hundred!',demo:'j100',p:FROG,l:'500'}]},
 {say:'Further right is greater.',demo:'hold',speech:'On a number line, numbers get greater as you move to the right. Five hundred is further right than one hundred, so it is greater.',
  cues:[{w:'greater as you move',p:{c:'#2f9e5a'},l:'→ greater',hl:'greater'},{w:'so it is greater',p:FROG,l:'500 > 100'}]}],
/* 3 */ round:[
 {say:'Find the tens around it.',demo:'r47',speech:'To round forty-seven to the nearest ten, find the two tens around it: forty and fifty. Forty-seven sits between them, on the hill.',
  cues:[{w:'forty and fifty',p:{c:['#4fb3ff','#ffb347'],u:'parent'},l:'40 · 50',hl:'nearest ten'},{w:'sits between',p:{c:'#ff6a3d'},l:'47'}]},
 {say:'5 to 9 rounds up.',demo:'r47',speech:'Now look at the ones digit: seven. Zero to four rounds down. Five to nine rounds up. So the ball rolls to fifty!',
  cues:[{w:'ones digit',p:{c:'#ff6a3d'},l:'7 ones'},{w:'rounds up',hl:'rounds up'},{w:'rolls to fifty',demo:'rollnow',p:{c:'#ffb347',u:'parent'},l:'47 → 50'}]}],
/* 4 */ addsub:[
 {say:'Line up the places.',demo:'show',speech:'Let’s add two hundred forty-seven plus one hundred thirty-five. Line up the places: hundreds with hundreds, tens with tens, and ones with ones.',
  cues:[{w:'hundreds with',p:{c:H},l:'hundreds'},{w:'tens with',p:{c:T},l:'tens'},{w:'ones with',p:{c:O},l:'ones'}]},
 {say:'Add the ones first. Trade!',demo:'show',speech:'Add the ones first. Seven plus five is twelve. Twelve ones is too many, so trade ten ones for one ten!',
  cues:[{w:'ones first',demo:'co',p:{c:O},l:'7 + 5 = 12'},{w:'trade ten ones',demo:'tro',p:{c:T,box:TOP},l:'+ 1 ten',hl:'trade'}]},
 {say:'Then the tens and hundreds.',demo:'hold',speech:'Now add the tens: eight tens. Then the hundreds: three hundreds. Two hundred forty-seven plus one hundred thirty-five is three hundred eighty-two!',
  cues:[{w:'add the tens',demo:'ct',p:{c:T,box:TOP},l:'8 tens'},{w:'then the hundreds',demo:'ch',p:{c:H,box:TOP},l:'3 hundreds'},{w:'three hundred eighty-two',p:{c:[H,T,O],box:TOP},l:'382'}]}],
/* 5 */ arrays:[
 {say:'An array has equal rows.',demo:'show',speech:'An array shows equal groups in rows. Here are three rows. Each row has four plants.',
  cues:[{w:'array',hl:'array'},{w:'three rows',p:{c:POTS,u:'parent'},l:'3 rows'},{w:'four plants',p:{c:POTS,u:'parent',row:0},l:'4 in each row'}]},
 {say:'3 × 4 = 12',demo:'show',speech:'Skip count the rows: four, eight, twelve! Three rows of four is twelve. We write three times four equals twelve.',
  cues:[{w:'four, eight',p:{c:POTS,u:'parent',row:0},l:'4',s:.24},{w:'eight, twelve',p:{c:POTS,u:'parent',row:1},l:'8',s:.24,keep:true},{w:'twelve!',p:{c:POTS,u:'parent',row:2},l:'12',s:.24,keep:true},{w:'three times four',p:{c:POTS,u:'parent'},l:'3 × 4 = 12',hl:'times'}]},
 {say:'Turn it: 4 × 3 = 12',demo:'show',speech:'Now turn the array. It becomes four rows of three. The total is still twelve!',
  cues:[{w:'turn the array',demo:'turnnow'},{w:'still twelve',p:{c:POTS,u:'parent'},l:'4 × 3 = 12'}]}],
/* 6 */ share:[
 {say:'Dividing is sharing equally.',demo:'show',speech:'Dividing means sharing equally. Nova has twelve cookies to share with three friends.',
  cues:[{w:'sharing equally',hl:'dividing'},{w:'twelve cookies',p:{c:'#c98a4b'},l:'12 cookies'},{w:'three friends',p:{c:VIBE.slice(0,3)},l:'3 plates'}]},
 {say:'12 ÷ 3 = 4',demo:'show',speech:'Give one cookie to each friend, again and again. Each friend gets four cookies. Twelve divided by three equals four!',
  cues:[{w:'again and again',demo:'dealall'},{w:'four cookies',p:{c:'#c98a4b'},l:'4 each'},{w:'divided by three',p:{c:'#c98a4b'},l:'12 ÷ 3 = 4'}]}],
/* 7 */ fractions:[
 {say:'Equal parts of one whole',demo:'four',speech:'A fraction names equal parts of one whole. This cake is cut into four equal parts. Each part is one fourth.',
  cues:[{w:'fraction',hl:'fraction'},{w:'four equal parts',p:{c:'#fff4e0'},l:'4 equal parts'},{w:'one fourth',demo:'f1',p:{c:'#ff8c5a'},l:'1/4'}]},
 {say:'Numerator over denominator',demo:'four',speech:'The bottom number is the denominator. It tells how many equal parts: four. The top number is the numerator. It tells how many parts we mean. Here we mean three. Three fourths!',
  cues:[{w:'denominator.',p:{c:['#fff4e0','#ff8c5a']},l:'denominator = 4',hl:'denominator'},{w:'numerator.',demo:'f3',p:{c:'#ff8c5a'},l:'numerator',hl:'numerator'},{w:'three fourths',p:{c:'#ff8c5a'},l:'3/4'}]}],
/* 8 */ equiv:[
 {say:'1/2 = 2/4 = 4/8',demo:'clear',speech:'Equivalent fractions name the same amount. One half covers half of the wall. Two fourths cover the same length. So do four eighths!',
  cues:[{w:'equivalent',hl:'equivalent'},{w:'one half',demo:'l2',p:{c:'#ff8a8a'},l:'1/2'},{w:'two fourths',demo:'l4',p:{c:'#ffb347'},l:'2/4',keep:true},{w:'four eighths',demo:'l8',p:{c:'#ffd24a'},l:'4/8',keep:true}]},
 {say:'1/3 = 2/6',demo:'clear',speech:'One third lines up with two sixths. They are equivalent, too!',
  cues:[{w:'one third',demo:'l3',p:{c:'#5cc46a'},l:'1/3'},{w:'two sixths',demo:'l6',p:{c:'#7fd1c7'},l:'2/6',keep:true}]}],
/* 9 */ ratio:[
 {say:'A ratio compares amounts.',demo:'b1',speech:'A ratio compares two amounts. For every one bike, there are two wheels. That is a ratio of one to two.',
  cues:[{w:'ratio',hl:'ratio'},{w:'one bike',p:{c:'#e4572e',u:'parent'},l:'1 bike'},{w:'two wheels',p:{c:'#ffd24a'},l:'2 wheels'},{w:'one to two',l:'1 : 2',keep:true}]},
 {say:'Scale it up!',demo:'b1',speech:'Scale it up! Two bikes have four wheels. Three bikes have six wheels. Each bike adds two more wheels.',
  cues:[{w:'two bikes',demo:'n2',p:{c:'#ffd24a'},l:'2 : 4'},{w:'three bikes',demo:'n3',p:{c:'#ffd24a'},l:'3 : 6'},{w:'adds two',l:'+2 wheels each bike',keep:true}]}],
/* 10 */ patterns:[
 {say:'Start at 1, add 2.',demo:'show',speech:'A growing pattern changes by the same amount each time. Start at one, then add two: one, three, five, seven, nine.',
  cues:[{w:'growing pattern',hl:'growing pattern'},{w:'one, three',p:{c:VIBE[0]},l:'1',s:.24},{w:'three, five',p:{c:VIBE[1]},l:'3',s:.24,keep:true},{w:'five, seven',p:{c:VIBE[2]},l:'5',s:.24,keep:true},{w:'seven, nine',p:{c:VIBE[3]},l:'7',s:.24,keep:true},{w:'nine.',p:{c:VIBE[4]},l:'9',s:.24,keep:true}]},
 {say:'Use the rule.',demo:'show',speech:'The rule is start at one and add two. So term six is two more than nine. Term six is eleven!',
  cues:[{w:'the rule',hl:'rule'},{w:'two more than nine',p:{c:VIBE[4]},l:'9 + 2'},{w:'is eleven',demo:'reveal',p:{c:VIBE[5]},l:'term 6 = 11'}]}],
/* 11 */ balance:[
 {say:'An equation says equal.',demo:'show',speech:'An equation says two amounts are equal. On the left: seven plus five. On the right: four plus a mystery box.',
  cues:[{w:'equation',hl:'equation'},{w:'seven plus five',p:{c:['#2f7de1','#16a36f']},l:'7 + 5 = 12'},{w:'four plus a mystery',p:{c:'#f08a24'},l:'4 + □'}]},
 {say:'Make it balance.',demo:'show',speech:'Add cubes to the box until both sides are level. Four is not enough. Eight! Now it balances, so the box is eight.',
  cues:[{w:'four is not',demo:'x4',p:{c:'#ffd24a',cell:true},l:'□ = 4? no'},{w:'eight!',demo:'x8',p:{c:'#ffd24a',cell:true},l:'□ = 8'},{w:'box is eight',l:'7 + 5 = 4 + 8',keep:true,hl:'variable'}]}],
/* 12 */ coding:[
 {say:'A program is steps in order.',demo:'show',speech:'A program is a list of steps that a robot follows in order. Here is the robot, and here is the star it wants to reach.',
  cues:[{w:'program',hl:'program'},{w:'the robot',p:{c:'#4fb3ff',u:'parent'},l:'robot'},{w:'the star',p:{c:'#ffcf3f'},l:'goal',keep:true}]},
 {say:'Loops repeat steps.',demo:'show',speech:'This program says forward three times, turn right, then forward three times. Times three is a loop: it repeats a step. Let’s run it!',
  cues:[{w:'loop',hl:'loop'},{w:'run it',demo:'runnow',p:{c:'#4fb3ff',u:'parent'},l:'F × 3 · R · F × 3'}]}],
/* 13 */ sorting:[
 {say:'Two rules, two circles',demo:'show',speech:'A Venn diagram sorts things using two rules. This circle is for red things. That circle is for curved things.',
  cues:[{w:'venn diagram',hl:'venn'},{w:'red things',p:{c:'#ff6b6b'},l:'Red'},{w:'curved things',p:{c:'#4f8df7'},l:'Curved',keep:true}]},
 {say:'Both go in the middle.',demo:'show',speech:'Watch them sort. Things that fit both rules go in the middle, where the circles overlap. Things that fit neither rule go in the Neither box.',
  cues:[{w:'watch them sort',demo:'auto'},{w:'in the middle',hl:'both',l:'both → middle'},{w:'neither box',p:{c:'#e6e8ee'},l:'neither'}]}],
/* 14 */ graphs:[
 {say:'Read a bar graph.',demo:'show',speech:'A bar graph shows data with bars. Apples got eight votes. Blueberries got twelve votes: the most! Bananas got five votes: the fewest.',
  cues:[{w:'bar graph',hl:'bar graph'},{w:'apples',p:{c:FCOL[0]},l:'8'},{w:'blueberries',p:{c:FCOL[1]},l:'12: most!'},{w:'bananas',p:{c:FCOL[2]},l:'5: fewest'}]},
 {say:'The key tells the value.',demo:'show',speech:'In a pictograph, a key tells what each picture is worth. Here each circle stands for two votes. Half a circle is one vote.',
  cues:[{w:'pictograph',demo:'pict',hl:'key'},{w:'two votes',p:{c:FCOL,n:0},l:'● = 2 votes'},{w:'half a circle',l:'◐ = 1 vote',keep:true}]}],
/* 15 */ mean:[
 {say:'Collect the data.',demo:'show',speech:'Five friends read some books: two, six, four, seven and one. Altogether that is twenty books.',
  cues:[{w:'two,',p:{c:VIBE[0]},l:'2',s:.24},{w:'six,',p:{c:VIBE[1]},l:'6',s:.24,keep:true},{w:'four,',p:{c:VIBE[2]},l:'4',s:.24,keep:true},{w:'seven',p:{c:VIBE[3]},l:'7',s:.24,keep:true},{w:'and one',p:{c:VIBE[4]},l:'1',s:.24,keep:true},{w:'twenty books',l:'total 20',keep:true}]},
 {say:'The mean is the fair share.',demo:'show',speech:'The mean is the fair share. Let’s even out the towers. Now every tower has four books, so the mean is four!',
  cues:[{w:'mean',hl:'mean'},{w:'even out',demo:'even'},{w:'mean is four',p:{c:VIBE.slice(0,5)},l:'mean = 4'}]}],
/* 16 */ chance:[
 {say:'Likely and unlikely',demo:'sp1',speech:'This spinner is three fourths blue and one fourth yellow. Landing on blue is likely. Landing on yellow is unlikely.',
  cues:[{w:'three fourths blue',p:{c:'#4f8df7'},l:'3/4 blue'},{w:'blue is likely',p:{c:'#4f8df7'},l:'likely',hl:'likely'},{w:'yellow is unlikely',p:{c:'#ffd24a'},l:'unlikely',hl:'unlikely'}]},
 {say:'Equally likely',demo:'sp1',speech:'Now the spinner is half blue and half yellow. Blue and yellow are equally likely!',
  cues:[{w:'half blue',demo:'sp2',p:{c:'#4f8df7'},l:'1/2'},{w:'equally likely',p:{c:['#4f8df7','#ffd24a']},l:'equally likely',hl:'equally likely'}]}],
/* 17 */ shapes:[
 {say:'Faces, edges, vertices',demo:'cube',speech:'A face is a flat surface. An edge is where two faces meet. A vertex is a corner, where edges meet.',
  cues:[{w:'face is',p:{c:H},l:'face',hl:'face'},{w:'edge is',p:{c:H},l:'edge',hl:'edge'},{w:'vertex is',demo:'vt',p:{c:'#e4572e'},l:'vertex',hl:'vertex'}]},
 {say:'Count them on a cube.',demo:'cube',speech:'A cube has six square faces, twelve edges and eight vertices. Count the red dots: eight corners!',
  cues:[{w:'six square faces',p:{c:H},l:'6 faces'},{w:'twelve edges',p:{c:H},l:'12 edges'},{w:'eight vertices',demo:'vt',p:{c:'#e4572e'},l:'8 vertices'}]}],
/* 18 */ length:[
 {say:'Start at zero.',demo:'hold',speech:'To measure length, line up one end with zero on the ruler. The pencil ends at fourteen. It is fourteen centimetres long.',
  cues:[{w:'zero on the ruler',demo:'m0',p:{c:'#ffcf57',u:'parent'},l:'start at 0',hl:'zero'},{w:'fourteen centimetres',p:{c:'#ffcf57',u:'parent'},l:'14 cm'}]},
 {say:'10 mm = 1 cm',demo:'hold',speech:'Ten millimetres make one centimetre. So fourteen centimetres is one hundred forty millimetres. One hundred centimetres make one metre.',
  cues:[{w:'millimetres make',demo:'mm',hl:'millimetres'},{w:'hundred forty',p:{c:'#ffcf57',u:'parent'},l:'140 mm'},{w:'one metre',l:'100 cm = 1 m',keep:true}]}],
/* 19 */ mass:[
 {say:'Mass is how heavy.',demo:'apple',speech:'Mass is how heavy something is. The apple is on the balance. Its side goes down, because it is heavier than nothing at all!',
  cues:[{w:'mass',hl:'mass'},{w:'the apple',p:{c:'#ff5a5a'},l:'apple'}]},
 {say:'Balance it with cubes.',demo:'apple',speech:'Add cubes to the other side until it is level. Three is not enough. Six! The apple has a mass of six cubes.',
  cues:[{w:'three is',demo:'c3',p:{c:'#ffcf3f',cell:true},l:'3: still down'},{w:'six!',demo:'c6',p:{c:'#ffcf3f',cell:true},l:'6: level!'},{w:'six cubes',p:{c:'#ff5a5a'},l:'mass = 6 cubes'}]}],
/* 20 */ area:[
 {say:'Area covers the inside.',demo:'show',speech:'Area is how many squares cover a shape. This garden is four squares long and three squares wide. Four times three is twelve squares.',
  cues:[{w:'area',hl:'area'},{w:'four squares long',p:{c:['#16a36f','#4cc38a'],row:0},l:'4 long'},{w:'three squares wide',p:{c:['#16a36f','#4cc38a'],box:{x:[-1.7,-1.3]}},l:'3 wide'},{w:'twelve squares',p:{c:['#16a36f','#4cc38a']},l:'area = 12'}]},
 {say:'Perimeter goes around.',demo:'show',speech:'Perimeter is the distance around a shape. Walk along the fence: four, three, four, three. The perimeter is fourteen.',
  cues:[{w:'perimeter',hl:'perimeter'},{w:'along the fence',p:{c:'#e4572e'},l:'4 + 3 + 4 + 3'},{w:'is fourteen',p:{c:'#e4572e'},l:'perimeter = 14'}]}],
/* 21 */ time:[
 {say:'Hour hand and minute hand',demo:'nine',speech:'The short hand points to the hour. The long red hand points to the minutes. Right now it is nine o’clock.',
  cues:[{w:'short hand',p:geoH(.6),l:'hour hand'},{w:'long red hand',p:{c:'#e4572e',u:'parent'},l:'minute hand'},{w:'nine o',l:'9:00'}]},
 {say:'Each number is 5 minutes.',demo:'nine',speech:'For the minute hand, each number means five minutes. Fifteen minutes past nine is quarter past nine. Thirty minutes past is half past nine.',
  cues:[{w:'five minutes',hl:'minutes'},{w:'quarter past',demo:'p15',p:{c:'#e4572e',u:'parent'},l:'9:15'},{w:'half past',demo:'p15',p:{c:'#e4572e',u:'parent'},l:'9:30'}]}],
/* 22 */ money:[
 {say:'Pay for the eraser.',demo:'item0',speech:'Mei wants an eraser. It costs sixty-five cents. She pays with a loonie. A loonie is one dollar: one hundred cents.',
  cues:[{w:'eraser',p:{c:'#ffb37a'},l:'65¢'},{w:'pays with a loonie',demo:'loonie',l:'$1 = 100¢'}]},
 {say:'Count up to find change.',demo:'hold',speech:'To find the change, count up from the price. Sixty-five to seventy-five is ten cents. Seventy-five to one hundred is twenty-five cents. The change is thirty-five cents!',
  cues:[{w:'count up',demo:'pay',hl:'count up'},{w:'ten cents',l:'65 → 75: 10¢'},{w:'twenty-five cents',l:'75 → 100: 25¢'},{w:'thirty-five cents',demo:'ch35',l:'change: 35¢'}]}]
};})();
