/* The Interactive Classroom: Grade 4 Math — theory that comes alive.
   When the voice says a word in a cue, the matching 3D pieces lift, glow and wear a name tag,
   and the word is highlighted on the page. */
(function(){var P=window.PM;if(!P)return;
var TH='#16a36f',HU='#2f7de1',TE='#e4572e',ON='#e89a00',VIBE=['#ff8a5b','#ffb347','#ffd24a','#5cc46a','#4fb3ff','#8b5cf6'];
var ROBOT={c:'#4fb3ff',u:'parent'},TILES=['#16a36f','#4cc38a'],PLC_LEFT={x:[-2.2,-1.0]};
function bx(x0,x1,z0,z1){var b={x:[x0,x1]};if(z0!=null)b.z=[z0,z1];return b;}
function hand(h){return function(g){var o=[];g.traverse(function(m){if(m.isMesh&&m.geometry.parameters&&Math.abs((m.geometry.parameters.height||0)-h)<.001)o.push(m);});return o;};}
P.theory={
/* 1 */ thousands:[
 {say:'3406: four places',demo:'show',speech:'Look at three thousand four hundred six. Three thousands. Four hundreds. Zero tens. Six ones. The zero holds the tens place, so the other digits stay in the right spots.',
  cues:[{w:'three thousands',p:{c:TH},l:'3 thousands = 3000',hl:'thousands'},{w:'four hundreds',p:{c:HU},l:'4 hundreds = 400',keep:true,hl:'hundreds'},{w:'zero tens',l:'0 tens',keep:true,hl:'zero'},{w:'six ones',p:{c:ON},l:'6 ones = 6',keep:true,hl:'ones'}]},
 {say:'Each place is 10 times bigger.',demo:'show',speech:'Each place is worth ten times the place to its right. Ten ones make a ten. Ten tens make a hundred. Ten hundreds make one thousand.',
  cues:[{w:'ten times',hl:'ten times'},{w:'ten ones',p:{c:ON},l:'10 ones = 1 ten'},{w:'ten tens',l:'10 tens = 1 hundred'},{w:'ten hundreds',p:{c:HU},l:'10 hundreds = 1 thousand'}]}],
/* 2 */ round4:[
 {say:'Find the landmarks.',demo:'r3482',speech:'To round three thousand four hundred eighty-two to the nearest hundred, find the two landmark hundreds: three thousand four hundred and three thousand five hundred.',
  cues:[{w:'nearest hundred',p:{c:'#e4572e'},l:'3482',hl:'nearest'},{w:'landmark hundreds',p:{c:'#ffd24a'},l:'3400 · 3500',hl:'landmark'}]},
 {say:'Look one place to the right.',demo:'r3482',speech:'Look at the digit to the right of the hundreds: eight tens. Five to nine rounds up. So the ball rolls up to three thousand five hundred!',
  cues:[{w:'eight tens',p:{c:'#e4572e'},l:'8 tens'},{w:'rounds up',hl:'rounds up'},{w:'rolls up',demo:'rollnow',p:{c:'#ffd24a',box:bx(1.6,2.5)},l:'3482 → 3500'}]}],
/* 3 */ fractions4:[
 {say:'Three fifths',demo:'d5',speech:'A fraction names equal parts of a whole. This bar is cut into five equal parts: fifths. Light up one, two, three. That is three fifths.',
  cues:[{w:'five equal parts',p:{c:'#eef2f8',box:bx(-2.1,0)},l:'5 equal parts'},{w:'one, two',demo:'n1',p:{c:HU},l:'1/5'},{w:'two, three',demo:'n2',p:{c:HU},l:'2/5'},{w:'three.',demo:'n3',p:{c:HU},l:'3/5'},{w:'three fifths',p:{c:HU},l:'3 out of 5 = 3/5'}]},
 {say:'Numerator and denominator',demo:'hold',speech:'The bottom number, the denominator, tells how many equal parts make one whole: five. The top number, the numerator, tells how many parts we count: three.',
  cues:[{w:'denominator,',p:{c:['#eef2f8',HU],box:bx(-2.1,0)},l:'denominator = 5',hl:'denominator'},{w:'numerator,',p:{c:HU},l:'numerator = 3',hl:'numerator'}]}],
/* 4 */ fairshare:[
 {say:'More people, smaller shares',demo:'show46',speech:'Two pizzas are the same size. Four friends share the blue table’s pizza. Six friends share the red table’s pizza. Each piece at the red table is smaller.',
  cues:[{w:'four friends',p:{c:HU},l:'1/4'},{w:'six friends',p:{c:'#e4572e'},l:'1/6',keep:true},{w:'is smaller',p:{c:'#e4572e'},l:'smaller'}]},
 {say:'1/4 is greater than 1/6.',demo:'show46',speech:'When the same whole is shared by more people, each share is smaller. So one fourth is greater than one sixth.',
  cues:[{w:'more people',hl:'more people'},{w:'one fourth is greater',p:{c:HU},l:'1/4 > 1/6'}]}],
/* 5 */ decimals:[
 {say:'2.7 = 2 wholes and 7 tenths',demo:'show',speech:'Two point seven means two wholes and seven tenths. Here are the two whole bars. And here are seven tenth pieces. Ten tenths make one whole.',
  cues:[{w:'two wholes',p:{c:HU},l:'2 wholes',hl:'wholes'},{w:'seven tenth pieces',p:{c:TH},l:'7 tenths = 0.7',keep:true,hl:'tenths'},{w:'ten tenths',l:'10 tenths = 1 whole',keep:true}]},
 {say:'Round to the nearest whole.',demo:'show',speech:'Two point seven is between two and three on the number line. It is closer to three, so it rounds up to three.',
  cues:[{w:'between two and three',p:{c:'#e4572e'},l:'2.7'},{w:'rounds up',demo:'roundnow',p:{c:'#e4572e'},l:'2.7 → 3'}]}],
/* 6 */ facts:[
 {say:'Factors and product',demo:'show',speech:'This array has seven rows of eight. Seven and eight are the factors. The answer, fifty-six, is the product.',
  cues:[{w:'seven rows',p:{c:HU},l:'7 rows'},{w:'factors',hl:'factors',l:'7 × 8'},{w:'the product',p:{c:HU},l:'product = 56',hl:'product'}]},
 {say:'Split it to make it easy.',demo:'show',speech:'Seven times eight is tricky? Split it into five times eight, which is forty, plus two times eight, which is sixteen. Forty plus sixteen is fifty-six!',
  cues:[{w:'split it',demo:'splitnow',hl:'distributive'},{w:'five times eight',p:{c:HU},l:'5 × 8 = 40'},{w:'two times eight',p:{c:'#f08a24'},l:'2 × 8 = 16',keep:true},{w:'is fifty-six',p:{c:[HU,'#f08a24']},l:'40 + 16 = 56'}]}],
/* 7 */ times10:[
 {say:'× 10 moves digits left.',demo:'v34',speech:'When you multiply by ten, every digit moves one place to the left. Thirty-four times ten: the three moves to the hundreds, the four moves to the tens. Three hundred forty!',
  cues:[{w:'one place to the left',hl:'left'},{w:'thirty-four times ten',demo:'ax10'},{w:'three hundred forty',l:'34 × 10 = 340'}]},
 {say:'÷ 10 moves digits right.',demo:'v45',speech:'Dividing by ten moves every digit one place to the right. Forty-five divided by ten is four point five. The five lands in the tenths place.',
  cues:[{w:'one place to the right',demo:'ad10',hl:'right'},{w:'four point five',l:'45 ÷ 10 = 4.5'},{w:'tenths place',l:'tenths',keep:true,hl:'tenths'}]}],
/* 8 */ addsub4:[
 {say:'Line up the places.',demo:'show',speech:'To add four thousand three hundred seventy-eight plus two thousand five hundred seventeen, line up the places. Ones under ones, tens under tens, and so on.',
  cues:[{w:'line up the places',p:{c:['#d7e6fb','#fbdde6']},l:'line up!',hl:'places'}]},
 {say:'Start with the ones. Regroup!',demo:'show',speech:'Start with the ones. Eight plus seven is fifteen. Write five, and regroup one ten into the tens column. Then keep going, column by column.',
  cues:[{w:'start with the ones',demo:'showme',hl:'ones'},{w:'regroup one ten',l:'carry 1',hl:'regroup'},{w:'column by column',l:'4378 + 2517 = 6895',keep:true}]}],
/* 9 */ multiply4:[
 {say:'Split 236 into parts.',demo:'show',speech:'Four times two hundred thirty-six looks big. Split two hundred thirty-six into two hundred, thirty, and six. Each part gets its own block.',
  cues:[{w:'two hundred,',p:{c:'#2f7de1'},l:'200'},{w:'thirty,',p:{c:'#e4572e'},l:'30',keep:true},{w:'and six',p:{c:'#e89a00'},l:'6',keep:true}]},
 {say:'Multiply each part, then add.',demo:'show',speech:'Four times two hundred is eight hundred. Four times thirty is one hundred twenty. Four times six is twenty-four. Add the partial products: nine hundred forty-four!',
  cues:[{w:'four times two hundred',demo:'r0',p:{c:'#2f7de1'},l:'800'},{w:'four times thirty',demo:'r1',p:{c:'#e4572e'},l:'120',keep:true},{w:'four times six',demo:'r2',p:{c:'#e89a00'},l:'24',keep:true},{w:'partial products',l:'800 + 120 + 24 = 944',keep:true,hl:'partial products'}]}],
/* 10 */ divide4:[
 {say:'Share the tens first.',demo:'show',speech:'Let’s divide fifty-seven beads by four. Fifty-seven is five tens and seven ones. Share the tens first: one ten for each plate.',
  cues:[{w:'five tens',p:{c:'#f79a5c'},l:'5 tens'},{w:'seven ones',p:{c:'#ffcf3f'},l:'7 ones',keep:true},{w:'one ten for each',demo:'dealnow',p:{c:'#f79a5c'},l:'1 ten each'}]},
 {say:'Break the extra ten.',demo:'hold',speech:'One ten is left, so break it into ten ones. Now share the seventeen ones: four each. One is left over. Fifty-seven divided by four is fourteen, remainder one.',
  cues:[{w:'break it',demo:'brk',p:{c:'#ffcf3f'},l:'1 ten → 10 ones'},{w:'four each',demo:'dealnow',p:{c:'#ffcf3f'},l:'4 ones each'},{w:'remainder one',l:'57 ÷ 4 = 14 R1',hl:'remainder'}]}],
/* 11 */ unitfrac:[
 {say:'1/4 + 1/4 + 1/4',demo:'show0',speech:'A unit fraction has a one on top, like one fourth. Add one fourth, plus one fourth, plus one fourth.',
  cues:[{w:'unit fraction',hl:'unit fraction'},{w:'add one fourth',demo:'add1',p:{c:VIBE[0]},l:'1/4'},{w:'plus one fourth,',demo:'add1',p:{c:VIBE[1]},l:'2/4'},{w:'plus one fourth.',demo:'add1',p:{c:VIBE[2]},l:'3/4'}]},
 {say:'3 × 1/4 = 3/4',demo:'hold',speech:'Three pieces of one fourth is three times one fourth. That makes three fourths. The whole number tells how many pieces.',
  cues:[{w:'three times one fourth',p:{c:VIBE.slice(0,3)},l:'3 × 1/4'},{w:'three fourths',p:{c:VIBE.slice(0,3)},l:'= 3/4'}]}],
/* 12 */ rates:[
 {say:'A rate: for every one',demo:'show1',speech:'A rate tells how much for every one. One egg carton holds six eggs. That is six eggs for every carton.',
  cues:[{w:'rate',hl:'rate'},{w:'one egg carton',p:{c:'#f3e3c3'},l:'1 carton'},{w:'six eggs',p:{c:'#fffaf0'},l:'6 eggs',keep:true}]},
 {say:'Multiply by the rate.',demo:'show1',speech:'Two cartons hold twelve eggs. Three cartons hold eighteen eggs. Each new carton adds six more. To find the eggs, multiply by six.',
  cues:[{w:'two cartons',demo:'n2',p:{c:'#f3e3c3'},l:'2 → 12'},{w:'three cartons',demo:'n3',p:{c:'#f3e3c3'},l:'3 → 18'},{w:'multiply by six',l:'cartons × 6',keep:true}]}],
/* 13 */ patterns4:[
 {say:'Start at 3, add 2.',demo:'show',speech:'This pattern starts at three and adds two each time: three, five, seven, nine, eleven, thirteen.',
  cues:[{w:'three, five',p:{c:VIBE[0]},l:'3',s:.22},{w:'five, seven',p:{c:VIBE[1]},l:'5',s:.22,keep:true},{w:'seven, nine',p:{c:VIBE[2]},l:'7',s:.22,keep:true},{w:'nine, eleven',p:{c:VIBE[3]},l:'9',s:.22,keep:true},{w:'eleven, thirteen',p:{c:VIBE[4]},l:'11',s:.22,keep:true},{w:'thirteen.',p:{c:VIBE[5]},l:'13',s:.22,keep:true}]},
 {say:'The graph is a straight line.',demo:'show',speech:'Look at the tops of the towers. They make a straight line on the graph, because the pattern grows by the same amount each time.',
  cues:[{w:'straight line',p:{c:'#8b5cf6',u:'self',box:{y:[.1,3]}},l:'straight line!',hl:'straight line'},{w:'same amount',l:'+2 every term',keep:true}]}],
/* 14 */ equations4:[
 {say:'n is a variable.',demo:'show',speech:'In n plus seventeen equals forty-two, the letter n is a variable. It stands for a number we need to find. The balance shows both sides.',
  cues:[{w:'variable',hl:'variable'},{w:'seventeen',p:{c:'#16a36f'},l:'17'},{w:'forty-two',p:{c:'#2f7de1'},l:'42',keep:true}]},
 {say:'Solve and verify.',demo:'show',speech:'Try twenty: too light. Try twenty-five: both sides are equal! So n is twenty-five. To verify, check: twenty-five plus seventeen is forty-two.',
  cues:[{w:'try twenty',demo:'n20',p:{c:'#8b5cf6'},l:'n = 20? too light'},{w:'twenty-five:',demo:'n25',p:{c:'#8b5cf6'},l:'n = 25 ✓'},{w:'verify',hl:'verify',l:'25 + 17 = 42',keep:true}]}],
/* 15 */ inequal:[
 {say:'Less than 14',demo:'show',speech:'Which whole numbers make x plus six less than fourteen? Test them. Zero plus six is six: yes. Seven plus six is thirteen: still yes!',
  cues:[{w:'less than',hl:'less than'},{w:'zero plus six',demo:'t0',p:{c:'#16a36f'},l:'0 ✓'},{w:'seven plus six',demo:'t7',p:{c:'#16a36f'},l:'7 ✓'}]},
 {say:'Graph the solutions.',demo:'hold',speech:'Eight plus six is fourteen, which is not less than fourteen. So the solutions are zero to seven. We graph them on the number line.',
  cues:[{w:'eight plus six',p:{c:'#ffd24a'},l:'8 ✗'},{w:'zero to seven',p:{c:'#16a36f'},l:'solutions: 0 to 7',hl:'solutions'}]}],
/* 16 */ coding4:[
 {say:'A loop inside a loop',demo:'show',speech:'This program repeats a group of steps three times: forward, turn right, forward, turn left. A loop inside a loop is called a nested loop.',
  cues:[{w:'three times',p:ROBOT,l:'repeat × 3'},{w:'nested loop',hl:'nested loop'}]},
 {say:'Run it: three stairs!',demo:'show',speech:'Let’s run it. Each time the group repeats, the robot climbs one stair. Three repeats, three stairs, and it reaches the star!',
  cues:[{w:'run it',demo:'runnow'},{w:'reaches the star',p:{c:'#ffcf3f'},l:'★'}]}],
/* 17 */ datatypes:[
 {say:'Words or numbers?',demo:'sortm',speech:'Qualitative data uses words, like a favourite colour. Quantitative data uses numbers you can count or measure, like height in centimetres.',
  cues:[{w:'qualitative',p:{c:'#f08a24'},l:'words',hl:'qualitative'},{w:'quantitative',p:{c:'#2f7de1'},l:'numbers',hl:'quantitative'}]},
 {say:'Stem-and-leaf plot',demo:'stemall',speech:'A stem-and-leaf plot organizes numbers. The tens digit is the stem. The ones digit is the leaf. Four and seven means forty-seven.',
  cues:[{w:'is the stem',p:{c:'#16a36f'},l:'stems: tens',hl:'stem'},{w:'is the leaf',p:{c:'#c9f0dd'},l:'leaves: ones',hl:'leaf'},{w:'forty-seven',p:{t:'Key'},l:'4 | 7 = 47'}]}],
/* 18 */ doublebar:[
 {say:'Two bars side by side',demo:'show',speech:'A double-bar graph puts two bars side by side. Blue is Class A. Orange is Class B. Now we can compare each sport.',
  cues:[{w:'blue is class a',p:{c:'#2f7de1'},l:'Class A'},{w:'orange is class b',p:{c:'#f08a24'},l:'Class B'},{w:'compare',hl:'compare'}]},
 {say:'Read the legend and scale.',demo:'show',speech:'Every good graph has a title, labels, a legend and a scale. In soccer, Class A has six votes and Class B has three.',
  cues:[{w:'legend',p:{t:'Class A'},l:'legend',hl:'legend'},{w:'class a has six',p:{c:'#2f7de1',box:bx(-2.0,-1.6)},l:'6'},{w:'class b has three',p:{c:'#f08a24',box:bx(-1.5,-1.1)},l:'3',keep:true}]}],
/* 19 */ median:[
 {say:'Sort, then find the middle.',demo:'show',speech:'These towers show books read by seven friends. To find the median, sort them from least to greatest. The middle tower is the median: five.',
  cues:[{w:'median,',hl:'median'},{w:'least to greatest',demo:'sortnow'},{w:'middle tower',p:{c:'#ffd24a'},l:'median = 5'}]},
 {say:'Mode and mean',demo:'hold',speech:'The mode is the value that appears most often: six appears twice. The mean is the fair share when you even out all the towers.',
  cues:[{w:'mode',p:{c:'#ff9f68'},l:'mode = 6',hl:'mode'},{w:'mean',l:'mean = fair share',hl:'mean'}]}],
/* 20 */ probline:[
 {say:'From impossible to certain',demo:'show',speech:'A probability line goes from impossible on the left, to certain on the right. Equally likely is right in the middle.',
  cues:[{w:'impossible',p:{c:'#e0453a',box:bx(-2.3,-1.7)},l:'impossible'},{w:'certain',p:{c:'#16a36f',box:bx(1.7,2.3)},l:'certain'},{w:'equally likely',p:{c:'#f2c200',box:bx(-.3,.3)},l:'equally likely'}]},
 {say:'Place red on the line.',demo:'show',speech:'Isla’s bag has eight marbles. Four are red: exactly half. So picking red is equally likely.',
  cues:[{w:'four are red',p:{c:'#e0453a',box:bx(-2.2,-.2,-3,-1.4)},l:'4 of 8 red'},{w:'equally likely',demo:'ch2',p:{c:'#f2c200',box:bx(-.3,.3)},l:'red: equally likely'}]}],
/* 21 */ rectangles:[
 {say:'Four right angles',demo:'rect',speech:'A rectangle has four right angles: four square corners.',
  cues:[{w:'four right angles',demo:'ra',p:{c:'#2f7de1',box:bx(-1.4,1.4,-2.6,-1.1)},l:'4 right angles',hl:'right angles'}]},
 {say:'Parallel and perpendicular',demo:'rect',speech:'Opposite sides are parallel: they never meet. Sides that meet at a corner are perpendicular. A rectangle also has two lines of symmetry.',
  cues:[{w:'parallel:',demo:'par',p:{c:['#2f7de1','#e4572e'],u:'self',box:{y:[.1,1]}},l:'parallel',hl:'parallel'},{w:'perpendicular',hl:'perpendicular',l:'perpendicular ⊥'},{w:'lines of symmetry',demo:'symon',l:'2 lines of symmetry',hl:'symmetry'}]}],
/* 22 */ grid:[
 {say:'(3, 2): across, then up',demo:'origin',speech:'A point on a grid is named by an ordered pair. The first number tells how far across. The second tells how far up. Go across three: one, two, three. Then up two: one, two.',
  cues:[{w:'ordered pair',hl:'ordered pair'},{w:'three: one,',demo:'r',p:{c:'#e0453a',u:'parent'},l:'1'},{w:'two, three.',demo:'r',l:'2',keep:true},{w:'three. then',demo:'r',l:'3 across',keep:true},{w:'up two: one',demo:'u',l:'1 up'},{w:'one, two.',demo:'u',l:'(3, 2)'}]},
 {say:'Slide or flip',demo:'hold',speech:'A translation slides a point without turning it. A reflection flips it over a line, like a mirror.',
  cues:[{w:'translation',hl:'translation',l:'slide'},{w:'reflection',hl:'reflection',l:'flip'}]}],
/* 23 */ angles:[
 {say:'Acute and right',demo:'a45',speech:'An angle has two arms that meet at a vertex. An acute angle is smaller than a right angle. A right angle is a square corner.',
  cues:[{w:'vertex',p:{c:'#e4572e'},l:'vertex',hl:'vertex'},{w:'acute angle',demo:'a45',p:{c:'#16a36f'},l:'acute',hl:'acute'},{w:'square corner',demo:'a90',p:{c:'#2f7de1'},l:'right: 90°',hl:'right'}]},
 {say:'Obtuse and straight',demo:'a90',speech:'An obtuse angle is bigger than a right angle. A straight angle is a straight line.',
  cues:[{w:'obtuse angle',demo:'a135',p:{c:'#f08a24'},l:'obtuse',hl:'obtuse'},{w:'straight line',demo:'a180',p:{c:'#8b5cf6'},l:'straight: 180°',hl:'straight'}]}],
/* 24 */ metric:[
 {say:'Kilo means 1000.',demo:'empty',speech:'Kilo means one thousand. A kilogram is one thousand grams. A book is five hundred grams. Two butters are two hundred fifty grams each.',
  cues:[{w:'kilogram',hl:'kilogram'},{w:'book is',demo:'book',p:{c:'#2f7de1'},l:'500 g'},{w:'two butters',demo:'butter',p:{c:'#ffe27a'},l:'250 g'},{w:'each.',demo:'butter',p:{c:'#ffe27a'},l:'250 g + 250 g'}]},
 {say:'500 + 250 + 250 = 1000 g',demo:'hold',speech:'Together that is one thousand grams: exactly one kilogram! And one litre is one thousand millilitres.',
  cues:[{w:'one thousand grams',p:{t:' kg'},l:'1000 g = 1 kg'},{w:'one litre',l:'1 L = 1000 mL',keep:true,hl:'litre'}]}],
/* 25 */ elapsed:[
 {say:'Count on to the hour.',demo:'movie',speech:'A movie starts at two fifteen and lasts one hour and thirty minutes. Jump one hour first: three fifteen.',
  cues:[{w:'two fifteen',p:hand(.56),l:'start 2:15'},{w:'jump one hour',demo:'p60',p:{c:'#16a36f',box:{z:[-.6,-.1]}},l:'+1 h → 3:15'}]},
 {say:'Then add the minutes.',demo:'hold',speech:'Then add thirty more minutes: three forty-five. The movie ends at three forty-five.',
  cues:[{w:'thirty more',demo:'p30',p:{c:'#e4572e',u:'parent'},l:'+30 min → 3:45'},{w:'ends at',l:'ends 3:45',keep:true}]}],
/* 26 */ area4:[
 {say:'Area = length × width',demo:'show',speech:'Area is the space inside a shape. This garden has four rows of six square metres. Four times six is twenty-four square metres.',
  cues:[{w:'area',hl:'area'},{w:'four rows',p:{c:TILES,row:0},l:'6 in a row'},{w:'four times six',p:{c:TILES},l:'4 × 6 = 24 m²'}]},
 {say:'Missing side? Divide.',demo:'show',speech:'If you know the area and one side, divide to find the other side. Twenty-four divided by four is six metres.',
  cues:[{w:'divide',hl:'divide'},{w:'six metres',p:{c:TILES,row:0},l:'24 ÷ 4 = 6 m'}]}],
/* 27 */ shopping:[
 {say:'Add up the cart.',demo:'empty',speech:'Kofi puts a ball for seven dollars in the cart. Then a kite for nine dollars. Seven plus nine is sixteen dollars.',
  cues:[{w:'ball for',demo:'ball',p:{c:'#e4572e',box:bx(-2.2,-1.4,-2.8,-2)},l:'$7'},{w:'kite for',demo:'kite',p:{c:'#2f7de1',box:bx(-1.5,-.7,-2.8,-2)},l:'$9'},{w:'sixteen dollars',p:{c:'#9fb4d1'},l:'total $16'}]},
 {say:'Count up to find change.',demo:'hold',speech:'He pays with a twenty-dollar bill. Count up from sixteen to twenty: the change is four dollars.',
  cues:[{w:'twenty-dollar bill',demo:'pay20',p:{c:'#7fd0a0'},l:'$20'},{w:'four dollars',l:'change: $4',hl:'change'}]}],
/* 28 */ budget:[
 {say:'Spend, save, invest, donate',demo:'jars',speech:'Hana earns ten dollars. She can spend some, save some for a goal, invest some so it can grow, and donate some to help others.',
  cues:[{w:'earns ten',demo:'earn',l:'$10 earned'},{w:'spend some',demo:'dsp',p:{c:'#e4572e',u:'parent'},l:'spend'},{w:'save some',demo:'dsv',p:{c:'#2f7de1',u:'parent'},l:'save'},{w:'invest some',demo:'din',p:{c:'#16a36f',u:'parent'},l:'invest'},{w:'donate some',demo:'ddo',p:{c:'#f08a24',u:'parent'},l:'donate'}]},
 {say:'Find the better buy.',demo:'cmp',speech:'Six granola bars cost three dollars. Twelve bars cost five dollars. Two packs of six would cost six dollars, so twelve for five is the better buy!',
  cues:[{w:'six granola bars',p:{c:'#c9e7a3'},l:'6 for $3'},{w:'twelve bars',p:{c:'#ffd27a'},l:'12 for $5'},{w:'better buy',p:{c:'#ffd27a'},l:'better buy!',hl:'better buy'}]}]
};})();
