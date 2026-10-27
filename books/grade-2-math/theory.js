/* The Interactive Classroom: Grade 2 Math — theory that comes alive.
   When the voice says a word in a cue, the matching 3D pieces lift, glow and wear a name tag,
   and the word is highlighted on the page. */
(function(){var P=window.PM;if(!P)return;var tint=P.tint;
var O='#ff6b35',Y='#ffc04d',B='#2f7de1',G='#5fd38a',PU='#8b5cf6',R='#ef4444',FROG={c:'#5cc46a',u:'parent'};
var COL=['#ff6b35','#ff8a3d','#ffc04d','#5fd38a','#2f7de1','#8b5cf6'];
function bx(x0,x1,z0,z1){var b={x:[x0,x1]};if(z0!=null)b.z=[z0,z1];return b;}
function plate(k){var x=-1.85+k*.92;return {c:R,box:bx(x-.4,x+.4,-2.9,-2.2)};}
function basket(k){var x=-1.9+k*1.9;return {c:R,u:'parent',box:bx(x-.45,x+.45,-2.6,-1.6)};}
function hand(w){return function(g){var out=[];g.traverse(function(o){if(o.isMesh&&o.geometry&&o.geometry.parameters&&Math.abs((o.geometry.parameters.depth||0)-w)<.001&&Math.abs((o.geometry.parameters.width||0)-(w>.06?.65:1.0))<.001)out.push(o);});return out;};}
var TRAY={z:[-3.2,-1.6]};
P.theory={
/* 1 */ num200:[
 {say:'146 = 1 hundred, 4 tens, 6 ones',demo:'show',speech:'Look at one hundred forty-six. The one means one hundred: a big flat of one hundred cubes. The four means four tens: four rods of ten. The six means six ones: six little cubes.',
  cues:[{w:'one hundred:',p:{c:'#1d4ed8'},l:'1 hundred = 100',s:.24,hl:'hundreds'},{w:'four tens',p:{c:'#16a36f'},l:'4 tens = 40',s:.24,keep:true,hl:'tens'},{w:'six ones',p:{c:Y},l:'6 ones = 6',s:.24,keep:true,hl:'ones'}]},
 {say:'Count the hundred, the tens, then the ones.',demo:'show',speech:'Let’s count it. Start with the hundred: one hundred. Count on by tens: one hundred ten, one hundred twenty, one hundred thirty, one hundred forty. Then the ones: one hundred forty-six!',
  cues:[{w:'hundred: one hundred',p:{c:'#1d4ed8'},l:'100'},{w:'hundred ten',p:{c:'#16a36f',n:0},l:'110',s:.2,keep:true},{w:'hundred twenty',p:{c:'#16a36f',n:1},l:'120',s:.2,ly:.3,keep:true},{w:'hundred thirty',p:{c:'#16a36f',n:2},l:'130',s:.2,ly:.6,keep:true},{w:'hundred forty.',p:{c:'#16a36f',n:3},l:'140',s:.2,ly:.9,keep:true},{w:'forty-six!',p:{c:Y},l:'146!',keep:true}]},
 {say:'Every digit has a place.',demo:'show',speech:'Every digit has a place. In one hundred forty-six, the one is in the hundreds place. The four is in the tens place. The six is in the ones place.',
  cues:[{w:'hundreds place',p:{c:'#1d4ed8'},l:'hundreds: 1'},{w:'tens place',p:{c:'#16a36f'},l:'tens: 4'},{w:'ones place',p:{c:Y},l:'ones: 6'}]}],
/* 2 */ compare200:[
 {say:'Compare the hundreds first.',demo:'place',speech:'Compare the hundreds first. One hundred forty-eight and one hundred eighty-four both have one hundred. So look at the tens. Four tens is less than eight tens.',
  cues:[['one hundred forty-eight',{c:B,u:'parent'},'148'],{w:'one hundred eighty-four',p:{c:O,u:'parent'},l:'184',keep:true},{w:'four tens',p:{c:B,u:'parent'},l:'4 tens',hl:'tens'},{w:'eight tens',p:{c:O,u:'parent'},l:'8 tens',keep:true}]},
 {say:'184 is greater than 148.',demo:'place',speech:'So one hundred eighty-four is greater. On a number line, the greater number is always further to the right.',
  cues:[['greater',{c:O,u:'parent'},'184 > 148'],{w:'further to the right',p:{c:O,u:'parent'},l:'further right →'}]}],
/* 3 */ estimate200:[
 {say:'Use a benchmark.',demo:'jar',speech:'A benchmark is a group you know. This little cup holds ten beads. The big jar looks like about twelve cups. Twelve tens is about one hundred twenty!',
  cues:[{w:'benchmark',p:{c:'#fde68a'},l:'10 beads',hl:'benchmark'},{w:'big jar',p:{c:COL,box:bx(-2.0,-.4)},l:'about 12 cups?'},{w:'one hundred twenty',p:{c:COL,box:bx(-2.0,-.4)},l:'about 120'}]},
 {say:'Count in tens to check.',demo:'jar',speech:'Now count in groups of ten to check. There are one hundred eighteen beads. Our estimate was very close!',
  cues:[{w:'groups of ten',demo:'countnow',hl:'groups of ten'},{w:'one hundred eighteen',p:{c:COL},l:'118'},{w:'close',l:'close!',keep:true}]}],
/* 4 */ count200:[
 {say:'Skip count by 50s.',demo:'reset',speech:'Skip counting by fifties is super fast. Fifty! One hundred! One hundred fifty! Two hundred!',
  cues:[{w:'by fifties',hl:'50'},{w:'fifty!',demo:'j50',p:FROG,l:'50'},{w:'one hundred!',demo:'j50',p:FROG,l:'100'},{w:'hundred fifty!',demo:'j50',p:FROG,l:'150'},{w:'two hundred!',demo:'j50',p:FROG,l:'200'}]},
 {say:'Skip count by 20s.',demo:'reset',speech:'Counting by twenties is like counting by twos with a zero. Twenty! Forty! Sixty! Eighty!',
  cues:[{w:'twenties',hl:'20'},{w:'twenty!',demo:'j20',p:FROG,l:'20'},{w:'forty!',demo:'j20',p:FROG,l:'40'},{w:'sixty!',demo:'j20',p:FROG,l:'60'},{w:'eighty!',demo:'j20',p:FROG,l:'80'}]}],
/* 5 */ evenodd2:[
 {say:'Even numbers make pairs.',demo:'show8',speech:'An even number can make pairs with none left over. Eight makes four pairs. Eight is even!',
  cues:[{w:'even number',hl:'even'},['four pairs',{c:B},'4 pairs'],{w:'eight is even',p:{c:B},l:'8 is even'}]},
 {say:'Odd numbers have one left over.',demo:'show7',speech:'An odd number always has one left over. Seven makes three pairs, and one is left over. Seven is odd!',
  cues:[{w:'odd number',hl:'odd'},['three pairs',{c:B},'3 pairs'],{w:'left over.',p:{c:O},l:'1 left over',keep:true},{w:'seven is odd',p:{c:[B,O]},l:'7 is odd'}]}],
/* 6 */ share2:[
 {say:'Share, then cut the leftover.',demo:'reset7',speech:'Ayo has seven muffins for two friends. Each friend gets three. One muffin is left over. Cut it in half! Now each friend gets three and one half.',
  cues:[['seven muffins',{c:'#c2410c',u:'parent'},'7 muffins'],{w:'gets three',demo:'sharenow',l:'3 each'},{w:'left over',l:'1 left over',keep:true},{w:'cut it in half',demo:'cutnow',l:'3 and ½ each'}]},
 {say:'1 third = 2 sixths',demo:'pizza',speech:'Cut a pizza into three equal parts. Each part is one third. Cut it into six equal parts. Each part is one sixth. Two sixths cover the same as one third!',
  cues:[['one third',{c:Y,box:bx(-2.2,0)},'1 third'],['one sixth',{c:Y,box:bx(0,2.2),n:0},'1 sixth'],{w:'two sixths',p:{c:Y,box:bx(0,2.2)},l:'2 sixths'},{w:'same as one third',p:{c:Y,box:bx(-2.2,0)},l:'1 third',keep:true}]}],
/* 7 */ facts20:[
 {say:'Make 10 to add 8 + 7.',demo:'show',speech:'Eight plus seven. Here are eight orange counters. Move two yellow counters over to make ten. Five yellow are left. Ten plus five is fifteen!',
  cues:[['eight orange',{c:O},'8'],{w:'make ten',p:{c:[O,Y],box:bx(-2.3,0)},l:'10',hl:'make ten'},{w:'five yellow',p:{c:Y,box:bx(0,2.3)},l:'5',keep:true},{w:'fifteen!',p:{c:[O,Y]},l:'8 + 7 = 15'}]},
 {say:'Related facts',demo:'show',speech:'Related facts use the same three numbers. If eight plus seven is fifteen, then fifteen take away seven is eight.',
  cues:[{w:'related facts',hl:'related'},{w:'take away seven',demo:'subnow'},{w:'is eight',p:{c:O},l:'15 − 7 = 8'}]}],
/* 8 */ mental50:[
 {say:'Adding 9? Add 10, take 1.',demo:'start26',speech:'Adding nine? Nine is almost ten! Twenty-six plus nine: jump ten to thirty-six, then back one to thirty-five.',
  cues:[['twenty-six',FROG,'26'],{w:'jump ten',demo:'h10',p:FROG,l:'+10 → 36'},{w:'back one',demo:'hm1',p:FROG,l:'−1 → 35'}]},
 {say:'Add the tens, then the ones.',demo:'start24',speech:'Twenty-four plus thirteen. Add the tens first: thirty-four. Then add the ones: thirty-five, thirty-six, thirty-seven!',
  cues:[['twenty-four',FROG,'24'],{w:'tens first',demo:'h10',p:FROG,l:'+10 → 34'},{w:'add the ones',demo:'h3',p:FROG,l:'+3 → 37'}]}],
/* 9 */ addsub100:[
 {say:'47 + 35: tens and ones',demo:'add0',speech:'Forty-seven plus thirty-five. Forty-seven is four tens and seven ones. Thirty-five is three tens and five ones.',
  cues:[['four tens',{c:B},'4 tens'],{w:'seven ones',p:{all:1,box:bx(-1.4,-.6,-2.7,-2.1)},l:'7 ones',keep:true},{w:'three tens',p:{c:O},l:'3 tens'},{w:'five ones',p:{all:1,box:bx(.8,1.5,-2.7,-2.1)},l:'5 ones',keep:true}]},
 {say:'Trade 10 ones for a ten.',demo:'add0',speech:'Push them together: seven tens and twelve ones. Twelve ones is too many! Trade ten ones for one ten. Now there are eight tens and two ones: eighty-two!',
  cues:[{w:'push them together',demo:'go'},{w:'seven tens',p:{c:PU},l:'7 tens'},{w:'twelve ones',p:{all:1,box:bx(-.5,.35,-2.7,-2.1)},l:'12 ones',keep:true},{w:'trade ten ones',demo:'go',hl:'trade'},{w:'eighty-two',p:{c:PU},l:'47 + 35 = 82'}]}],
/* 10 */ multiply2:[
 {say:'Multiplying is adding equal groups.',demo:'show',speech:'Multiplying is adding equal groups. Here are four plates, with three strawberries on each plate.',
  cues:[{w:'equal groups',hl:'equal groups'},['four plates',{c:'#ffffff'},'4 groups'],{w:'three strawberries',p:plate(0),l:'3 each'}]},
 {say:'4 × 3 = 12',demo:'show',speech:'Count by threes: three, six, nine, twelve! Four groups of three is twelve. We write it four times three equals twelve.',
  cues:[{w:'three, six',p:plate(0),l:'3',s:.24},{w:'six, nine',p:plate(1),l:'6',s:.24,keep:true},{w:'nine, twelve',p:plate(2),l:'9',s:.24,keep:true},{w:'twelve!',p:plate(3),l:'12',s:.24,keep:true},{w:'four times three',p:{c:R},l:'4 × 3 = 12',hl:'times'}]}],
/* 11 */ divide2:[
 {say:'Dividing means sharing equally.',demo:'show',speech:'Dividing means sharing equally. Theo has twelve apples and three baskets.',
  cues:[{w:'sharing equally',hl:'dividing'},['twelve apples',{c:R,u:'parent'},'12 apples'],{w:'three baskets',p:{c:'#d97706'},l:'3 baskets',keep:true}]},
 {say:'12 ÷ 3 = 4',demo:'show',speech:'Give one apple to each basket, again and again. Each basket gets four apples. Twelve divided by three equals four!',
  cues:[{w:'again and again',demo:'dealnow'},{w:'gets four',p:basket(0),l:'4',s:.24},{w:'four apples',p:basket(1),l:'4',s:.24,keep:true},{w:'divided by three',p:basket(2),l:'4',s:.24,keep:true},{w:'equals four',p:{c:R,u:'parent'},l:'12 ÷ 3 = 4'}]}],
/* 12 */ geopat2:[
 {say:'The core repeats.',demo:'show',speech:'This triangle makes a pattern. It turns a quarter turn each time: up, right, down, left. Then it starts again!',
  cues:[{w:'quarter turn',hl:'core'},{w:'up,',p:{c:'#ff8a3d',n:0},l:'↑',s:.24},{w:'right,',p:{c:'#ff8a3d',n:1},l:'→',s:.24,keep:true},{w:'down,',p:{c:'#ff8a3d',n:2},l:'↓',s:.24,keep:true},{w:'left.',p:{c:'#ff8a3d',n:3},l:'←',s:.24,keep:true},{w:'starts again',p:{c:'#ff8a3d',n:4},l:'↑ again!',s:.24,keep:true}]},
 {say:'This design grows.',demo:'grow4',speech:'This design grows. One block, two blocks, three blocks, four blocks. Each step adds one more block.',
  cues:[{w:'one block',p:{c:PU,box:bx(-2.2,-1.8)},l:'1',s:.24},{w:'two blocks',p:{c:PU,box:bx(-1.74,-1.34)},l:'2',s:.24,keep:true},{w:'three blocks',p:{c:PU,box:bx(-1.28,-.88)},l:'3',s:.24,keep:true},{w:'four blocks',p:{c:PU,box:bx(-.82,-.42)},l:'4',s:.24,keep:true},{w:'adds one',l:'+1 each step',keep:true}]}],
/* 13 */ chart2:[
 {say:'+10 moves down one row.',demo:'blank',speech:'On a hundred chart, adding ten moves straight down one row. Start at three: three, thirteen, twenty-three, thirty-three!',
  cues:[{w:'hundred chart',p:{c:'#e2e8f0'},l:'1 to 100'},{w:'start at three',demo:'by10now',p:{c:'#e2e8f0'},l:'+10 = down 1 row'}]},
 {say:'+5 makes two columns.',demo:'blank',speech:'Adding five makes two straight columns: five, ten, fifteen, twenty. The rule is add five.',
  cues:[{w:'adding five',demo:'by5now',hl:'add 5'},{w:'rule',p:{c:'#e2e8f0'},l:'rule: add 5'}]}],
/* 14 */ symbol2:[
 {say:'A symbol stands for a number.',demo:'show',speech:'A symbol, like a box, can stand for a number we do not know yet. Box plus four equals nine. Four counters are outside the box.',
  cues:[{w:'symbol',p:{c:PU},l:'□ = ?',hl:'symbol'},{w:'four counters',p:{c:B},l:'4 outside'}]},
 {say:'Open the box!',demo:'show',speech:'Nine in all, and four are outside. Open the box: there are five inside! So the box stands for five.',
  cues:[{w:'open the box',demo:'opennow'},{w:'five inside',p:{c:Y},l:'5 inside'},{w:'stands for five',p:{c:Y},l:'□ = 5'}]}],
/* 15 */ equal2:[
 {say:'Both sides must be equal.',demo:'show',speech:'Seven plus five is on the left side. Ten plus a box is on the right side. Seven plus five makes twelve.',
  cues:[['seven plus five',{c:[B,tint(B,.4)]},'7 + 5'],{w:'ten plus a box',p:{c:O},l:'10 + □'},{w:'makes twelve',p:{c:[B,tint(B,.4)]},l:'12'}]},
 {say:'The box is 2.',demo:'show',speech:'Ten plus two is also twelve. So the box is two, and the balance is level. Both sides are equivalent!',
  cues:[{w:'ten plus two',demo:'plus2',p:{c:[O,tint(O,.4)]},l:'10 + 2 = 12'},{w:'level',p:{t:'='},l:'12 = 12'},{w:'equivalent',hl:'equivalent'}]}],
/* 16 */ coding2:[
 {say:'Sequential and concurrent',demo:'show',speech:'Sequential means one step after another. Concurrent means two things happen at the same time. Meet the blue robot and the orange robot.',
  cues:[{w:'sequential',hl:'sequential'},{w:'concurrent',hl:'concurrent'},{w:'blue robot',p:{c:B,u:'parent',box:bx(-1.6,-.9)},l:'blue robot'},{w:'orange robot',p:{c:O,u:'parent',box:bx(.9,1.6)},l:'orange robot',keep:true}]},
 {say:'Run both at once!',demo:'show',speech:'When we press Run, both robots move at the same time, one step at a time. Each robot reaches its own star!',
  cues:[{w:'press run',demo:'runok'},{w:'own star',p:{c:[B,O],box:bx(-.5,.5,-1.7,-1.1)},l:'★ both made it!'}]}],
/* 17 */ sort2:[
 {say:'A Venn diagram',demo:'venn',speech:'A Venn diagram has circles that overlap. One circle is for red shapes. The other circle is for squares.',
  cues:[{w:'venn diagram',hl:'venn'},{w:'red shapes',p:{c:R},l:'red'},{w:'squares',p:{c:B,box:bx(.2,2.0,-3.0,-1.0)},l:'square',keep:true}]},
 {say:'Both, or neither?',demo:'venn',speech:'A red square is both red and a square, so it goes in the middle. A shape that is neither goes outside both circles.',
  cues:[{w:'in the middle',p:{all:1,box:bx(-.3,.3,-2.7,-1.3)},l:'both!'},{w:'outside both',p:{all:1,box:bx(1.5,2.4,-1.5,-.4)},l:'neither'}]}],
/* 18 */ tally2:[
 {say:'A two-way table',demo:'show',speech:'A two-way table has rows and columns. Each row is a grade. Each column is a way to get to school: walk, bus or car.',
  cues:[{w:'rows',p:{c:'#eef2ff'},l:'a row',hl:'rows'},{w:'columns',p:{c:['#fef3c7','#eef2ff'],box:bx(-.6,.6)},l:'a column',hl:'columns'},{w:'walk, bus or car',p:{t:'walk',exact:true,only:true},l:'walk · bus · car'}]},
 {say:'Read a box.',demo:'show',speech:'Tally marks are grouped in fives. Find the Grade two row and the bus column: six tallies. Six students in Grade two take the bus.',
  cues:[{w:'grouped in fives',p:{c:'#c2410c'},l:'5'},{w:'six tallies',p:{c:'#eef2ff',box:bx(-.55,.55)},l:'6'}]}],
/* 19 */ graph2:[
 {say:'A line plot uses Xs.',demo:'plotall',speech:'A line plot shows data with Xs. Each X is one student’s answer to the question: how many pets do you have?',
  cues:[{w:'line plot',hl:'line plot'},{w:'each x',p:{c:B,n:0},l:'1 student'}]},
 {say:'The mode is the most common.',demo:'plotall',speech:'The mode is the answer that happens most often. The tallest stack is one pet. So the mode is one!',
  cues:[{w:'mode',hl:'mode'},{w:'tallest stack',p:{c:B,box:bx(-1.05,-.55)},l:'tallest'},{w:'mode is one',p:{c:B,box:bx(-1.05,-.55)},l:'mode = 1'}]}],
/* 20 */ chance2:[
 {say:'Likely or unlikely?',demo:'show',speech:'Priya’s bag has eight red marbles and two blue marbles. If she picks one, red is likely. Blue is unlikely.',
  cues:[['eight red',{c:R},'8 red'],{w:'two blue',p:{c:B},l:'2 blue',keep:true},{w:'red is likely',p:{c:R},l:'likely'},{w:'blue is unlikely',p:{c:B},l:'unlikely',keep:true}]},
 {say:'Red, or not red',demo:'show',speech:'The marble will be red, or not red. One of them must happen! These are called complementary events.',
  cues:[{w:'red, or not red',demo:'picknow'},{w:'complementary',hl:'complementary',l:'red + not red = certain'}]}],
/* 21 */ shapes2:[
 {say:'Sides and corners',demo:'show',speech:'Shapes have sides and corners. A triangle has three sides. A square has four equal sides and four square corners. A rectangle has four square corners, too.',
  cues:[['triangle',{c:'#ff8a3d'},'3 sides'],['square',{c:B},'4 equal sides'],['rectangle',{c:G},'4 square corners']]},
 {say:'Lines of symmetry',demo:'show',speech:'A line of symmetry folds a shape into two matching halves. A square has four lines of symmetry!',
  cues:[{w:'line of symmetry',demo:'symnow',hl:'symmetry'},{w:'four lines',p:{c:R},l:'4 lines'}]}],
/* 22 */ compose2:[
 {say:'Two triangles make a square.',demo:'square',speech:'Two triangles can make a square. Slide the orange triangle, and now they make a big triangle. The area stays the same: four square units!',
  cues:[['two triangles',{c:[B,O]},'2 triangles'],{w:'slide',demo:'tri',p:{c:O},l:'slide!'},{w:'four square units',p:{c:[B,O]},l:'4 square units'}]},
 {say:'Decompose a hexagon.',demo:'hexshow',speech:'A hexagon can be broken apart into six triangles. Breaking a shape into smaller shapes is called decomposing.',
  cues:[['hexagon',{c:COL},'hexagon'],{w:'six triangles',demo:'apart',p:{c:COL},l:'6 triangles'},{w:'decomposing',hl:'decompose'}]}],
/* 23 */ congruent2:[
 {say:'Same size, same shape',demo:'show',speech:'Congruent shapes are the same size and the same shape. Here is the blue rectangle.',
  cues:[{w:'congruent',hl:'congruent'},['blue rectangle',{c:B},'blue A']]},
 {say:'Does it fit?',demo:'show',speech:'Let’s slide the orange shape on top of it. It fits perfectly, so the two shapes are congruent!',
  cues:[{w:'slide the orange',demo:'try'},{w:'fits perfectly',p:{c:O},l:'perfect fit!'},{w:'are congruent',l:'congruent!',keep:true}]}],
/* 24 */ map2:[
 {say:'A map shows where things are.',demo:'home',speech:'A map shows where things are. Here is the slide, the swings, the sandbox and the tree.',
  cues:[['slide',{c:R},'slide'],['swings',{c:'#1d4ed8',u:'parent'},'swings'],['sandbox',{c:Y},'sandbox'],['tree',{c:'#16a34a',u:'parent'},'tree']]},
 {say:'Walk right 4 squares.',demo:'home',speech:'To get from the slide to the swings, walk right four squares. One! Two! Three! Four!',
  cues:[{w:'one!',demo:'r',p:{c:'#f97316',u:'parent'},l:'1'},{w:'two!',demo:'r',p:{c:'#f97316',u:'parent'},l:'2'},{w:'three!',demo:'r',p:{c:'#f97316',u:'parent'},l:'3'},{w:'four!',demo:'r',p:{c:'#f97316',u:'parent'},l:'4: swings!'}]}],
/* 25 */ units2:[
 {say:'Measure with units, no gaps.',demo:'u0',speech:'We measure length with units. Lay the paper clips end to end, with no gaps. The blue bar is six paper clips long.',
  cues:[{w:'paper clips',p:{c:'#94a3b8'},l:'units',hl:'units'},{w:'no gaps',hl:'gaps'},{w:'six paper clips',p:{c:B},l:'6 clips long'}]},
 {say:'Bigger units, fewer of them.',demo:'u0',speech:'Bigger units means we need fewer of them. With erasers, the same bar is only three erasers long!',
  cues:[{w:'with erasers',demo:'u2now'},{w:'three erasers',p:{c:O},l:'3 erasers long'}]}],
/* 26 */ cm2:[
 {say:'Start at zero.',demo:'zero',speech:'A ruler measures in centimetres. Line up the crayon at zero. The tip is at nine, so the crayon is nine centimetres long.',
  cues:[['ruler',{c:'#fde68a'},'cm ruler'],{w:'at zero',p:{c:R,u:'parent'},l:'start at 0'},{w:'nine centimetres',p:{c:R,u:'parent'},l:'9 cm'}]},
 {say:'Starting at 3? Count the spaces.',demo:'zero',speech:'If the crayon starts at three, it ends at twelve. From three to twelve is still nine centimetres!',
  cues:[{w:'starts at three',demo:'start3',p:{c:R,u:'parent'},l:'3 → 12'},{w:'still nine',p:{c:R,u:'parent'},l:'still 9 cm'}]}],
/* 27 */ time2:[
 {say:'Two hands on a clock',demo:'reset',speech:'A clock has two hands. The short hand shows the hour. The long hand shows the minutes. Right now it is three o’clock.',
  cues:[{w:'short hand',p:hand(.08),l:'hour hand'},{w:'long hand',p:hand(.05),l:'minute hand'},{w:'three o',l:'3:00'}]},
 {say:'15 minutes is a quarter hour.',demo:'reset',speech:'Watch the minutes go by. Fifteen minutes is a quarter of an hour. Another fifteen minutes makes thirty minutes: half an hour!',
  cues:[{w:'fifteen minutes is',demo:'m15',p:hand(.05),l:'15 min'},{w:'another fifteen',demo:'m15',p:hand(.05),l:'30 min = half hour'}]}],
/* 28 */ money2:[
 {say:'4 quarters make $1.',demo:'clear',speech:'Let’s make one dollar with quarters. Twenty-five! Fifty! Seventy-five! One hundred cents! Four quarters make one dollar.',
  cues:[{w:'twenty-five!',demo:'q',p:{t:'25¢',exact:true,box:TRAY},l:'25¢'},{w:'fifty!',demo:'q',p:{t:'25¢',exact:true,box:TRAY},l:'50¢'},{w:'seventy-five!',demo:'q',p:{t:'25¢',exact:true,box:TRAY},l:'75¢'},{w:'hundred cents!',demo:'q',p:{t:'25¢',exact:true,box:TRAY},l:'$1'}]},
 {say:'Bills for bigger amounts',demo:'clear',speech:'Bills are for bigger amounts. Here are five, ten and twenty dollars. Together, that is thirty-five dollars.',
  cues:[{w:'five,',demo:'b5',p:{t:'$5',exact:true,box:TRAY},l:'$5'},{w:'ten and',demo:'b10',p:{t:'$10',exact:true,box:TRAY},l:'$10'},{w:'twenty dollars',demo:'b20',p:{t:'$20',exact:true,box:TRAY},l:'$20'},{w:'thirty-five',p:{t:'$',box:TRAY},l:'$35'}]}]
};})();
