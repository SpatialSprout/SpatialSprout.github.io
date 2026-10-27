/* The Interactive Classroom: Grade 1 Math — theory that comes alive.
   Each theory step is read aloud. When the voice says a word in a cue, the matching 3D pieces lift, glow
   and wear a name tag, and the word is highlighted on the page. Pick by colour (c), label text (t),
   position (box, row) and order (n). keep:true adds to what is already lit. */
(function(){var P=window.PM;if(!P)return;
var O='#ff6b35',Y='#ffc04d',B='#2f7de1',G='#5fd38a',PU='#8b5cf6',FROG={c:'#5cc46a',u:'parent'};
var COL=['#ff6b35','#ff8a3d','#ffc04d','#5fd38a','#2f7de1','#8b5cf6'];
function row(r){return {c:COL,box:{x:[-.35,2.2],z:[-2.6+r*.3-.1,-2.6+r*.3+.1]}};}
var BER={c:'#ef4444',u:'parent'};function plateK(k){var x=-1.8+k*.9;return {c:'#ef4444',u:'parent',box:{x:[x-.42,x+.42]}};}
function tower(c){return {c:c,box:{z:[-2.5,-1.9]}};}
P.theory={
/* 1 */ count50:[
 {say:'Numbers tell how many.',demo:'reset',speech:'Numbers tell us how many. This is a number chart. It has every number from one to fifty. Our frog starts on number one.',
  cues:[['number chart',{c:'#e2e8f0'},'1 to 50'],['frog',FROG,'Start: 1']]},
 {say:'Skip count by 10s!',demo:'reset',speech:'Skip counting means we jump. Let’s count by tens. Ten! Twenty! Thirty! Forty! Fifty! Every jump goes down one row.',
  cues:[{w:'skip counting',hl:'skip count'},{w:'ten!',demo:'at10',p:FROG,l:'10'},{w:'twenty!',demo:'at20',p:FROG,l:'20'},{w:'thirty!',demo:'at30',p:FROG,l:'30'},{w:'forty!',demo:'at40',p:FROG,l:'40'},{w:'fifty!',demo:'at50',p:FROG,l:'50'}]}],
/* 2 */ tens50:[
 {say:'34 = 3 tens and 4 ones',demo:'show',speech:'Look at thirty-four. It is made of tens and ones. Here are three tens. Each ten is a tall rod of ten cubes. And here are four ones. They are single cubes!',
  cues:[['three tens',{c:B},'3 tens'],['four ones',{c:Y},'4 ones']]},
 {say:'Count the tens, then the ones.',demo:'show',speech:'Let’s count it. Count the tens first: ten, twenty, thirty. Then count on the ones: thirty-one, thirty-two, thirty-three, thirty-four!',
  cues:[{w:'ten,',p:{c:B,n:0},l:'10',s:.24,hl:'tens'},{w:'twenty',p:{c:B,n:1},l:'20',s:.24,ly:.32,keep:true},{w:'thirty,',p:{c:B,n:2},l:'30',s:.24,ly:.64,keep:true},
        {w:'thirty-one',p:{c:Y,n:0},l:'31',s:.22,keep:true,hl:'ones'},{w:'thirty-two',p:{c:Y,n:1},l:'32',s:.22,keep:true},{w:'thirty-three',p:{c:Y,n:2},l:'33',s:.22,keep:true},{w:'thirty-four!',p:{c:Y,n:3},l:'34',s:.22,keep:true}]},
 {say:'Break a ten into 10 ones.',demo:'show',speech:'Ten ones make one ten. We can break a ten into ten ones, too. Now thirty-four is two tens and fourteen ones. It is the same number!',
  cues:[{w:'break a ten',demo:'breaknow',hl:'ten'},['two tens',{c:B},'2 tens'],{w:'fourteen ones',p:{c:Y},l:'14 ones',keep:true},{w:'same number',l:'still 34!',keep:true}]}],
/* 3 */ compare50:[
 {say:'Which tower has more?',demo:'cmp',speech:'Leo has thirty-two cubes. Amara has twenty-three cubes. Who has more? Look at the tens first. Leo has three tens. Amara has two tens.',
  cues:[['thirty-two cubes',{c:B,u:'parent'},'32'],['twenty-three cubes',{c:'#ff6b35',u:'parent'},'23',],{w:'three tens',p:{c:B,u:'self'},l:'3 tens',hl:'tens'},{w:'two tens',p:{c:'#ff6b35',u:'self'},l:'2 tens',keep:true}]},
 {say:'32 is greater than 23.',demo:'cmp',speech:'Three tens is more than two tens. So thirty-two is greater. Twenty-three is less.',
  cues:[['greater',{c:B,u:'parent'},'32 is greater'],{w:'less',p:{c:'#ff6b35',u:'parent'},l:'23 is less',keep:true}]}],
/* 4 */ estimate50:[
 {say:'An estimate is a smart guess.',demo:'jar',speech:'An estimate is a smart guess. Look at the marbles in the jar. Are there about ten, about thirty, or about fifty? It looks like about thirty!',
  cues:[['estimate',{c:COL},'smart guess'],{w:'about thirty!',p:{c:COL},l:'about 30?'}]},
 {say:'Count to check.',demo:'jar',speech:'Now let’s count to check. We put the marbles in rows of ten. Ten, twenty, thirty, and two more. Thirty-two! Our estimate was close.',
  cues:[{w:'rows of ten',demo:'countnow',hl:'count'},{w:'ten,',p:row(0),l:'10',s:.22},{w:'twenty,',p:row(1),l:'20',s:.22,keep:true},{w:'thirty,',p:row(2),l:'30',s:.22,keep:true},{w:'two more',p:row(3),l:'32',s:.22,keep:true},{w:'close',l:'close!',keep:true}]}],
/* 5 */ share1:[
 {say:'A fair share is the same for everyone.',demo:'reset',speech:'A fair share means everyone gets the same amount. Milo has nine cookies. He shares them with two friends.',
  cues:[{w:'fair share',hl:'fair share'},['nine cookies',{c:'#d39b5a',u:'parent'},'9 cookies'],['two friends',{c:[COL[0],COL[1]],u:'parent'},'2 friends']]},
 {say:'One for you, one for you…',demo:'reset',speech:'He gives one cookie to each friend, again and again. Now each friend has four cookies. One cookie is left over!',
  cues:[{w:'gives one',demo:'deal'},{w:'four cookies',p:{c:'#d39b5a',u:'parent',box:{x:[-1.7,-.7],z:[-2.3,-1.3]}},l:'4'},{w:'four cookies',p:{c:'#d39b5a',u:'parent',box:{x:[.7,1.7],z:[-2.3,-1.3]}},l:'4',keep:true},{w:'left over',p:{c:'#d39b5a',u:'parent',box:{x:[-.9,.9],z:[-1.1,-.4]}},l:'1 left over',keep:true}]},
 {say:'1 half = 2 fourths',demo:'pizza',speech:'Cut a pizza into two equal parts. Each part is one half. Cut it into four equal parts. Each part is one fourth. Look! Two fourths cover the same as one half.',
  cues:[['one half',{c:Y,box:{x:[-2.2,0]}},'1 half'],['one fourth',{c:Y,box:{x:[0,2.2]},n:0},'1 fourth',],{w:'two fourths',p:{c:Y,box:{x:[0,2.2]}},l:'2 fourths'},{w:'same as one half',p:{c:Y,box:{x:[-2.2,0]}},l:'1 half',keep:true}]}],
/* 6 */ pieces1:[
 {say:'More friends, smaller pieces.',demo:'show24',speech:'This sandwich is shared by two friends. Each piece is one half. The same sandwich is shared by four friends. Each piece is smaller!',
  cues:[['two friends',{c:Y,u:'parent',box:{z:[-2.8,-2.2]}},'1 of 2'],['four friends',{c:Y,u:'parent',box:{z:[-1.6,-1.0]}},'1 of 4',],{w:'smaller!',p:{c:'#86efac',u:'parent',box:{z:[-1.6,-1.0]}},l:'smaller pieces',keep:true}]},
 {say:'1 half is bigger than 1 fourth.',demo:'show24',speech:'The more friends share, the smaller each piece gets. So one half is bigger than one fourth.',
  cues:[['one half',{c:Y,u:'parent',box:{z:[-2.8,-2.2]}},'bigger'],{w:'one fourth',p:{c:Y,u:'parent',box:{z:[-1.6,-1.0]}},l:'smaller',keep:true}]}],
/* 7 */ facts10:[
 {say:'6 + 3 = 9',demo:'show',speech:'A ten frame has ten spaces. Here are six orange counters and three yellow counters. Six plus three makes nine.',
  cues:[['ten spaces',{c:'#f1f5f9'},'10 spaces'],['six orange',{c:O},'6'],{w:'three yellow',p:{c:Y},l:'3',keep:true},{w:'makes nine',p:{c:[O,Y]},l:'6 + 3 = 9'}]},
 {say:'Turn it around!',demo:'show',speech:'Turn it around: three plus six is also nine. And if we take away the three yellow counters, six are left. Nine take away three is six!',
  cues:[{w:'turn it around',p:{c:Y},l:'3 + 6 = 9',hl:'turn-around'},{w:'take away',demo:'hidenow',hl:'take away'},{w:'six are left',p:{c:O},l:'6 left'},{w:'is six',p:{c:O},l:'9 − 3 = 6'}]}],
/* 8 */ make10:[
 {say:'Make 10 first!',demo:'show',speech:'Let’s add eight plus five. Here are eight orange counters, and five yellow counters. Move two yellow counters over to fill the ten frame.',
  cues:[['eight orange',{c:O},'8'],{w:'five yellow',p:{c:Y},l:'5',keep:true},{w:'move two',demo:'makenow',hl:'make 10'},{w:'fill the ten frame',p:{c:[O,Y],box:{x:[-2.5,0]}},l:'10!'}]},
 {say:'10 + 3 = 13',demo:'made',speech:'Now we have ten and three. Ten plus three is thirteen. So eight plus five is thirteen! Making ten is a super trick.',
  cues:[['ten and',{c:[O,Y],box:{x:[-2.5,0]}},'10'],{w:'three.',p:{c:Y,box:{x:[0,2.5]}},l:'3',keep:true},{w:'thirteen.',p:{c:[O,Y]},l:'10 + 3 = 13'},{w:'super trick',hl:'make 10'}]}],
/* 9 */ story50:[
 {say:'Join stories: add!',demo:'start23',speech:'Some stories join groups, so we add. Leo sees twenty-three fish. Twelve more fish swim in. How many fish now?',
  cues:[{w:'join',hl:'join'},['twenty-three',FROG,'23 fish'],{w:'twelve more',l:'+ 12',keep:true}]},
 {say:'Hop on the number line.',demo:'start23',speech:'Start at twenty-three on the number line. Jump ten to thirty-three. Then jump one, two: thirty-four, thirty-five! Twenty-three plus twelve is thirty-five.',
  cues:[['twenty-three on',FROG,'start 23'],{w:'jump ten',demo:'h10',p:FROG,l:'+10 → 33'},{w:'thirty-four',demo:'h1',p:FROG,l:'34'},{w:'thirty-five!',demo:'h1',p:FROG,l:'35'},{w:'is thirty-five',p:FROG,l:'23 + 12 = 35'}]}],
/* 10 */ groups1:[
 {say:'Equal groups have the same number.',demo:'show',speech:'Equal groups have the same number in each group. Here are three plates. Each plate has two strawberries.',
  cues:[{w:'equal groups',hl:'equal groups'},['three plates',{c:'#ffffff'},'3 plates'],{w:'two strawberries',p:plateK(0),l:'2'}]},
 {say:'Count by 2s: 2, 4, 6!',demo:'show',speech:'Let’s count by twos. Two, four, six! Three groups of two make six strawberries.',
  cues:[{w:'two, four',p:plateK(0),l:'2',s:.24},{w:'four, six',p:plateK(1),l:'4',s:.24,keep:true},{w:'six!',p:plateK(2),l:'6',s:.24,keep:true},{w:'make six',p:BER,l:'3 groups of 2 = 6'}]}],
/* 11 */ patterns1:[
 {say:'A pattern repeats.',demo:'show',speech:'A pattern repeats, like a song. Say it with me: ball, cube, ball, cube, ball, cube.',
  cues:[{w:'repeats',hl:'repeating pattern'},{w:'ball,',p:{c:[O,B],n:0},l:'A',s:.24},{w:'cube,',p:{c:[O,B],n:1},l:'B',s:.24,keep:true},{w:'ball,',p:{c:[O,B],n:2},l:'A',s:.24,keep:true},{w:'cube,',p:{c:[O,B],n:3},l:'B',s:.24,keep:true},{w:'ball,',p:{c:[O,B],n:4},l:'A',s:.24,keep:true},{w:'cube.',p:{c:[O,B],n:5},l:'B',s:.24,keep:true}]},
 {say:'Find the core.',demo:'show',speech:'The part that repeats is called the core. Here the core is ball, cube. So what comes next? A ball!',
  cues:[['core',{c:[O,B],n:[0,1]},'core: A B'],{w:'a ball!',demo:'next',p:{c:O,n:-1},l:'next: A'}]}],
/* 12 */ grow1:[
 {say:'This pattern grows!',demo:'show',speech:'A growing pattern gets bigger each time. Look at the towers: one cube, three cubes, five cubes, seven cubes.',
  cues:[{w:'growing pattern',hl:'growing pattern'},{w:'one cube',p:{c:COL[0]},l:'1'},{w:'three cubes',p:{c:COL[1]},l:'3',keep:true},{w:'five cubes',p:{c:COL[2]},l:'5',keep:true},{w:'seven cubes',p:{c:COL[3]},l:'7',keep:true}]},
 {say:'The rule is add 2.',demo:'show',speech:'Each tower has two more cubes than the one before. The rule is add two! So the next tower has nine cubes.',
  cues:[['two more',{c:COL[1]},'+2'],{w:'rule',hl:'rule'},{w:'nine cubes',demo:'grownow',p:{c:COL[4]},l:'9'}]}],
/* 13 */ change1:[
 {say:'Some things change.',demo:'days',speech:'Some things change. Kai’s plant gets taller every day. The puppy grows bigger, too.',
  cues:[{w:'change',hl:'change'},['plant',{c:'#c2410c',u:'parent'},'taller!'],{w:'puppy',p:{c:'#d6a46c',u:'parent'},l:'bigger!',keep:true}]},
 {say:'Some things stay the same.',demo:'days',speech:'Some things stay the same. The cat always has four legs. A week always has seven days.',
  cues:[{w:'stay the same',hl:'same'},['cat',{c:'#475569',u:'parent'},'4 legs'],{w:'seven days',p:{c:'#ffffff',u:'self',box:{x:[-1.6,-.8],z:[-1.2,-.6]}},l:'7 days',keep:true}]}],
/* 14 */ equal1:[
 {say:'A balance is like a seesaw.',demo:'bal',speech:'This is a balance. It works like a seesaw. On this side: three plus four. On that side: five plus two.',
  cues:[['balance',{c:'#475569'},'balance'],['three plus four',{c:[O,Y]},'3 + 4'],{w:'five plus two',p:{c:[B,G]},l:'5 + 2',keep:true}]},
 {say:'The equal sign means the same.',demo:'bal',speech:'Both sides make seven, so the balance is level. The equal sign means both sides are the same amount!',
  cues:[['seven',{c:[O,Y,B,G]},'7 and 7'],{w:'equal sign',p:{t:'='},l:'same!',hl:'equal sign'}]}],
/* 15 */ coding1:[
 {say:'Code is steps in order.',demo:'show',speech:'Code is a list of steps. The bunny does the steps in order. Here is the bunny, and here is the yummy carrot.',
  cues:[{w:'code',hl:'code'},['bunny,',{c:'#ffffff',u:'parent'},'bunny'],{w:'carrot',p:{c:'#f97316'},l:'carrot',keep:true}]},
 {say:'Right, right, up, up!',demo:'show',speech:'The code says: right, right, up, up. Let’s run it! Hop, hop, hop, hop. The bunny found the carrot!',
  cues:[['right, right',{c:'#ffffff',u:'parent'},'→ → ↑ ↑'],{w:'run it',demo:'runnow'},{w:'found the carrot',p:{c:'#f97316'},l:'Yum!'}]}],
/* 16 */ sort1:[
 {say:'Sorting makes groups.',demo:'none',speech:'Sorting means putting things into groups. A sorting rule tells us how. Let’s sort Amara’s toys by colour!',
  cues:[{w:'sorting rule',hl:'sorting rule'},{w:'by colour',demo:'colnow'}]},
 {say:'Red, blue, yellow.',demo:'colnow',speech:'The red toys go here. The blue toys go here. The yellow toys go here. The rule is colour!',
  cues:[['red',{c:'#ef4444'},'red'],{w:'blue',p:{c:B},l:'blue',keep:true},{w:'yellow',p:{c:Y},l:'yellow',keep:true},{w:'rule is colour',hl:'colour'}]}],
/* 17 */ graph1:[
 {say:'Each cube is one vote.',demo:'show',speech:'A graph helps us see the votes. Each cube is one vote. Apple has six votes.',
  cues:[{w:'graph',hl:'graph'},['each cube',{c:'#ef4444',box:{z:[-2.5,-1.9]},n:0},'1 vote'],{w:'six votes',p:tower('#ef4444'),l:'6'}]},
 {say:'Which is the favourite?',demo:'show',speech:'Banana has three votes. Grapes have four. Orange has two. The tallest tower is apple. Apple is the favourite!',
  cues:[['banana',tower('#facc15'),'3'],{w:'grapes',p:tower('#8b5cf6'),l:'4',keep:true},{w:'orange',p:tower('#fb923c'),l:'2',keep:true},{w:'tallest',p:tower('#ef4444'),l:'favourite!'}]}],
/* 18 */ chance1:[
 {say:'Certain and impossible',demo:'red',speech:'This spinner is all red. Landing on red is certain: it will always happen. Landing on blue is impossible: there is no blue at all!',
  cues:[['certain',{c:'#ef4444'},'certain'],{w:'impossible',p:{c:'#ef4444'},l:'blue: impossible',hl:'impossible'}]},
 {say:'Possible',demo:'mixs',speech:'Now the spinner is half red and half blue. Red is possible. Blue is possible, too. Possible means it might happen.',
  cues:[['half red',{c:'#ef4444'},'red: possible'],{w:'half blue',p:{c:B},l:'blue: possible',keep:true},{w:'might happen',hl:'possible'}]}],
/* 19 */ shapes1:[
 {say:'Meet the solids.',demo:'solids',speech:'These are solids. A sphere is round, like a ball. A cube has square faces. A cylinder is like a can. A cone has a point on top. A rectangular prism is like a box.',
  cues:[['sphere',{c:O},'sphere'],['cube',{c:B},'cube'],['cylinder',{c:G},'cylinder'],['cone',{c:Y},'cone'],['rectangular prism',{c:PU},'prism']]},
 {say:'Roll or stack?',demo:'solids',speech:'A flat side is called a face. Some solids can roll, like the sphere and the cylinder. Some solids can stack, like the cube and the prism.',
  cues:[['face',{c:B},'flat face'],['roll',{c:[O,G]},'roll'],['stack',{c:[B,PU]},'stack']]}],
/* 20 */ mirror1:[
 {say:'Matching halves',demo:'none',speech:'This picture has a fold line in the middle. The left side is done. The right side must match it, like a mirror.',
  cues:[['fold line',{c:'#1b2236'},'fold line'],['left side',{c:B},'left half'],{w:'right side',p:{c:'#f8fafc',box:{x:[0,2]}},l:'right half',keep:true}]},
 {say:'Fill in to match.',demo:'none',speech:'Let’s fill in the right side. Each square copies the square across the line. Now both halves match!',
  cues:[{w:'fill in',demo:'fill'},{w:'both halves match',p:{c:[B,O]},l:'They match!',hl:'matching halves'}]}],
/* 21 */ where1:[
 {say:'On, under, beside',demo:'home',speech:'Position words tell where things are. The ball is on the table. Now the ball is under the table. Now it is beside the table.',
  cues:[{w:'position words',hl:'position words'},{w:'on the table',demo:'on',p:{c:O},l:'on'},{w:'under the table',demo:'under',p:{c:O},l:'under'},{w:'beside the table',demo:'beside',p:{c:O},l:'beside'}]},
 {say:'In front of, behind',demo:'beside',speech:'Now the ball is in front of the table. Now it is behind the table. You know your position words!',
  cues:[{w:'in front of',demo:'front',p:{c:O},l:'in front of'},{w:'behind the table',demo:'behind',p:{c:O},l:'behind'}]}],
/* 22 */ measure1:[
 {say:'Line up at the same start.',demo:'lenord',speech:'Length tells how long something is. To compare, line things up at the same start. The green pencil is the longest. The yellow pencil is the shortest.',
  cues:[{w:'length',hl:'length'},['same start',{c:'#cf3f2a'},'start line'],['green pencil',{c:G,u:'parent'},'longest'],{w:'yellow pencil',p:{c:Y,u:'parent'},l:'shortest',keep:true}]},
 {say:'Heavier goes down.',demo:'mass',speech:'Mass tells how heavy something is. On a balance, the heavier side goes down. The apple is heavier than the feather.',
  cues:[{w:'mass',hl:'mass'},['balance',{c:'#475569'},'balance'],['apple',{c:'#ef4444'},'heavier'],{w:'feather',p:{c:'#e0e7ff'},l:'lighter',keep:true}]}],
/* 23 */ calendar1:[
 {say:'A week has 7 days.',demo:'oct',speech:'A calendar shows the days of a month. This month is October. Each row is one week. A week has seven days.',
  cues:[['calendar',{c:'#ffffff'},'calendar'],['october',{t:'October',exact:true,only:true},'October'],{w:'one week',p:{c:'#ffffff',row:2},l:'1 week'},{w:'seven days',p:{c:'#ffffff',row:2},l:'7 days'}]},
 {say:'Find the 15th.',demo:'oct',speech:'Milo’s party is on the fifteenth. Look up to the top of its column. It is a Thursday!',
  cues:[{w:'fifteenth',demo:'tap15',p:{c:'#ffc04d'},l:'15th'},{w:'thursday',p:{t:'Th',exact:true,only:true},l:'Thursday',keep:true}]}],
/* 24 */ money1:[
 {say:'Canadian coins',demo:'show',speech:'Canada has coins. The nickel is worth five cents. The dime is worth ten cents. The quarter is worth twenty-five cents. The loonie is one dollar, and the toonie is two dollars.',
  cues:[['nickel',{t:'5¢',exact:true},'nickel'],['dime',{t:'10¢',exact:true},'dime'],['quarter',{t:'25¢',exact:true},'quarter'],['loonie',{t:'$1',exact:true},'loonie'],['toonie',{t:'$2',exact:true},'toonie']]},
 {say:'Value: how much it is worth.',demo:'show',speech:'Value means how much money is worth. The dime is small, but it is worth more than the nickel!',
  cues:[{w:'value',hl:'value'},['dime',{t:'10¢',exact:true},'10¢: more'],{w:'nickel',p:{t:'5¢',exact:true},l:'5¢: less',keep:true}]}]
};})();
