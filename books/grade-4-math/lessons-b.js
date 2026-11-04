/* The Interactive Classroom: Grade 4 Math — Number: fractions, fair shares, counting by fractions, decimal tenths, rounding decimals, fractions and decimals, adding and subtracting tenths, rates */
(function(){
"use strict";
const P=window.PM;if(!P||!P.unit||!P.M4)return;const U=P.unit,R=P.R,S=P.S,M=P.M4;const {rnd,pick,near,f1,dnear}=M;

/* 11 ─ Fractions */
U({id:'n11',title:'Fractions: numerator and denominator',strand:'Number',codes:['B1.4'],
 guide:{goal:'Show fractions from halves to tenths with drawings and models, and explain what the numerator and the denominator mean.',words:'fraction, numerator, denominator, equal parts, whole',ask:['What does the bottom number of a fraction tell you?','What does 3/8 of a pizza mean?','Why must the parts be equal?'],home:'Fold a paper strip into 4 equal parts. Colour 3. What fraction did you colour?'},
 watch:['Bottom: how many equal parts. Top: how many we count.','In 3/8, the whole has 8 equal parts and we count 3 of them.'],
 fig:'A bar cut into eighths with three parts shaded.',
 page:{story:{title:'The Garden Plots',text:'The class garden at *Sunnyside School* was split into *8 equal plots*. Lucas planted *carrots* in *3* of them. "Carrots fill *3/8* of the garden," said Ms. Dubé. "The *8* is the *denominator*: the number of equal parts. The *3* is the *numerator*: the parts we are talking about." Hana planted *tomatoes* in the other plots. "That is *5/8*," she said. "*3/8 + 5/8* is the *whole* garden!"',pics:['carrot','tomato','boy','girl'],
   acts:[[null,'garden',['seedling','boy','shovel'],'8 equal plots!'],['denominator','garden',['carrot','carrot','teacher'],'3 out of 8!'],['tomatoes','garden',['tomato','girl'],'5/8 for tomatoes!']]},
  boxes:[{title:'Reading a fraction',lines:['*3* ← numerator: parts counted','─','*8* ← denominator: equal parts in the whole','say: “three eighths”']},
   {title:'Halves to tenths',lines:['1/2 one half','1/3 one third','1/4 one fourth','1/5, 1/6, 1/8, *1/10* one tenth']}],
  cards:[{q:'A pie in 6 equal slices, 5 eaten. Fraction eaten?',a:'*5/6*'},{q:'Which is the denominator in 7/10?',a:'*10*'}],
  words:[['numerator','the top number: how many parts we count'],['denominator','the bottom number: how many equal parts make the whole']]},
 steps:[
  {say:'Read the story',speech:'The garden had eight equal plots. Carrots filled three of them: three eighths. Tomatoes filled five: five eighths.',set:S.row(['carrot','tomato','boy','girl'])},
  {say:'Eight equal parts',speech:'The whole is cut into eight equal parts. That makes eight the denominator. Three are shaded. That makes three the numerator.',set:{custom:'frac',list:[{parts:8,shade:3,shape:'bar',label:'3/8'}]},
   cues:[['eight equal parts','part','8 parts'],['Three are shaded','shaded','3 shaded','play']]},
  {say:'From halves to tenths',speech:'One half, one fourth, one sixth, one tenth. The more equal parts we cut, the smaller each part becomes.',set:{custom:'frac',list:[{parts:2,shade:1,label:'1/2'},{parts:4,shade:1,label:'1/4'},{parts:6,shade:1,label:'1/6'},{parts:10,shade:1,label:'1/10'}]},
   cues:[['smaller','shaded','1/10 is smallest','play']]}],
 more:{title:'Did you know?',text:'Music uses fractions too! A *half note* lasts half as long as a whole note, and a *quarter note* lasts one fourth as long.',pics:['musical note']},
 rounds:[M.frac(rnd(1,4),5),M.frac(rnd(1,7),8),M.frac(rnd(1,9),10),M.frac(rnd(1,5),6),
  R.q('What fraction of the garden had carrots?',['3/8','5/8','3/5'],'3/8'),R.q('In *3/8*, the *8* is the…',['denominator','numerator','whole'],'denominator'),
  R.q('A pizza has 6 equal slices. You eat 5. What fraction did you eat?',['5/6','1/6','6/5'],'5/6'),R.q('Which shows *one third*?',['1/3','3/1','1/30'],'1/3'),R.tf('The parts of a fraction must be equal.',true)],
 tries:[['Draw 4/10 of a chocolate bar.','10 equal pieces, *4* shaded'],['What fraction of a week is a weekend?','*2/7*']]});

/* 12 ─ Fair shares, compare and order */
U({id:'n12',title:'Fair shares and comparing fractions',strand:'Number',codes:['B1.5'],
 guide:{goal:'Use drawings and models to show fair shares from two sharing stories, and compare and order unit fractions and fractions with the same denominator.',words:'fair share, unit fraction, compare, greater, smaller',ask:['Is 1/3 or 1/5 of a pizza bigger?','Why do more sharers mean smaller pieces?','Which is greater, 3/8 or 5/8?'],home:'Share a sandwich among 2 people, then another among 4. Which pieces are bigger?'},
 watch:['More sharers, smaller shares!','1 pie for 3 kids gives 1/3 each. 1 pie for 5 kids gives 1/5 each. 1/3 > 1/5.'],
 fig:'Two pies shared by different numbers of kids.',
 page:{story:{title:'Two Lasagnas',text:'At the family *reunion*, Aunt Rosa brought *two lasagnas* the same size. *3* cousins shared the first one. *5* grown-ups shared the second. "Who got more?" asked little Gio. Each cousin got *1/3* and each grown-up got *1/5*. "Fewer people, *bigger* pieces," said Rosa. "So *1/3 > 1/5*." Later, the cousins ate *2/3* of their lasagna, and the grown-ups ate *2/5*. "We ate *more*!" laughed Gio.',pics:['lasagna','family','girl','boy'],
   acts:[[null,'kitchen',['lasagna','woman'],'Two lasagnas!'],['cousins','home',['lasagna','girl','boy'],'1/3 each!'],['grown-ups','home',['lasagna','man','woman'],'1/5 each!']]},
  boxes:[{title:'Unit fractions',text:'A *unit fraction* has 1 on top. The bigger the denominator, the *smaller* the piece.',lines:['1/2 > 1/3 > 1/4 > 1/5 > 1/6 > 1/8 > 1/10']},
   {title:'Same denominator',text:'Same-size pieces? Compare the numerators.',lines:['3/8 < 5/8','7/10 > 4/10']}],
  cards:[{q:'1/4 or 1/8: which is greater?',a:'*1/4*'},{q:'Order: 3/6, 1/6, 5/6',a:'*1/6, 3/6, 5/6*'}],
  words:[['fair share','an equal part for each sharer'],['unit fraction','a fraction with 1 as the numerator, like 1/5']]},
 steps:[
  {say:'Read the story',speech:'Three cousins shared one lasagna, so each got one third. Five grown-ups shared the other, so each got one fifth. One third is bigger.',set:S.row(['lasagna','family','girl','boy'])},
  {say:'Thirds and fifths',speech:'Look at the two wholes. Thirds are bigger pieces than fifths, because the same lasagna is cut into fewer parts.',set:{custom:'frac',list:[{parts:3,shade:1,label:'1/3'},{parts:5,shade:1,label:'1/5'}]},
   cues:[['Thirds','shaded','1/3 > 1/5','play']]},
  {say:'Same-size pieces',speech:'Three eighths and five eighths have the same size pieces. Five pieces is more than three, so five eighths is greater.',set:{custom:'frac',list:[{parts:8,shade:3,shape:'bar',label:'3/8'},{parts:8,shade:5,shape:'bar',label:'5/8'}]},
   cues:[['five eighths is greater','shaded','5/8 > 3/8','play']]}],
 more:{title:'Fraction riddle',text:'Would you rather have *1/2* of a small pizza or *1/4* of a giant pizza? Fractions are only fair to compare when the *wholes are the same size*!',pics:['pizza']},
 rounds:[...[[2,3],[4,8],[3,6],[5,10]].map(([a,b])=>R.q('Which is greater?',['1/'+a,'1/'+b],'1/'+a,{set:{custom:'frac',list:[{parts:a,shade:1,label:'1/'+a},{parts:b,shade:1,label:'1/'+b}]}})),
  R.q('Who got bigger pieces of lasagna?',['the 3 cousins','the 5 grown-ups','they were the same'],'the 3 cousins'),R.q('Which is greater, *3/8* or *5/8*?',['5/8','3/8'],'5/8'),
  R.q('Order from least: *1/2, 1/10, 1/4*',['1/10, 1/4, 1/2','1/2, 1/4, 1/10','1/4, 1/10, 1/2'],'1/10, 1/4, 1/2'),R.q('6 friends share 1 cake. Each gets…',['1/6','6','1/5'],'1/6'),R.tf('1/10 is bigger than 1/5.',false)],
 tries:[['2 pizzas: one for 4 kids, one for 8 kids. Which kids get more?','the group of *4*'],['Order 2/5, 4/5, 1/5.','*1/5, 2/5, 4/5*']]});

/* 13 ─ Counting by fractions and unit fraction × whole */
U({id:'n13',title:'Counting by fractions',strand:'Number',codes:['B1.6','B2.7'],
 guide:{goal:'Count to 10 by halves, thirds, fourths, fifths, sixths, eighths and tenths, and connect adding a unit fraction again and again to multiplying it by a whole number.',words:'count by, mixed number, improper fraction, repeated addition',ask:['Count by fourths from 0 to 2.','What is 1/4 + 1/4 + 1/4?','How is 3 × 1/4 the same as 1/4 + 1/4 + 1/4?'],home:'Count by halves while you walk: ½, 1, 1½, 2…'},
 watch:['Hop by fourths!','1/4, 2/4, 3/4, 4/4 = 1 whole, 5/4 = 1 1/4…'],
 fig:'A frog hopping by fourths on a number line.',
 page:{story:{title:'Quarter-Hour Laps',text:'Zoe swims at the *community pool*. In the big outdoor pool, each *lap* is *1/4* of a kilometre. "*1/4, 2/4, 3/4, 4/4*," she counted. "*4/4* is *1* whole kilometre!" She kept going: *5/4* is *1 and 1/4*. After *8* laps she had swum *8 × 1/4 = 8/4 = 2* kilometres. Her coach wrote on the board: *1/4 + 1/4 + … = 8 × 1/4*.',pics:['swimmer','pool','girl','stopwatch'],
   acts:[[null,'beach',['swimmer','girl'],'Lap one!'],['4/4','beach',['swimmer','stopwatch'],'One whole kilometre!'],['coach','classroom',['teacher','girl'],'8 × 1/4 = 2']]},
  boxes:[{title:'Count by fourths',lines:['1/4, 2/4, 3/4, *1*','1 1/4, 1 2/4, 1 3/4, *2*','4/4 = 1 · 8/4 = 2']},
   {title:'Repeated addition = multiplication',lines:['1/3 + 1/3 + 1/3 + 1/3 = *4/3*','4 × 1/3 = *4/3* = 1 1/3']}],
  cards:[{q:'5 × 1/2 = ?',a:'*5/2* = 2 1/2'},{q:'Count by tenths: 7/10, 8/10, 9/10, …',a:'*10/10 = 1*'}],
  words:[['mixed number','a whole number and a fraction, like 1 1/4'],['improper fraction','a fraction with a numerator bigger than the denominator, like 5/4']]},
 steps:[
  {say:'Read the story',speech:'Each lap is one fourth of a kilometre. Four fourths make one whole kilometre. Eight laps make eight fourths: two kilometres.',set:S.row(['swimmer','pool','girl','stopwatch'])},
  {say:'Hop by fourths',speech:'Start at zero and hop one fourth each time. After four hops, the frog lands on one. After eight hops, it lands on two.',set:{custom:'line',min:0,max:2,step:.25,every:1,hops:[[0,.25],[.25,.5],[.5,.75],[.75,1],[1,1.25],[1.25,1.5],[1.5,1.75],[1.75,2]],hopLabels:false},
   cues:[['four hops','frog','4/4 = 1','play'],['two','frog','8/4 = 2']]},
  {say:'Add again and again',speech:'One third plus one third plus one third plus one third is four thirds. It is the same as four times one third.',set:{custom:'frac',list:[{parts:3,shade:3,label:'3/3'},{parts:3,shade:1,label:'1/3'}]},
   cues:[['four thirds','shaded','4 × 1/3 = 4/3','play']]}],
 more:{title:'Did you know?',text:'Canadian coins count by fractions of a dollar! A *quarter* is *1/4* of a dollar, so *4 quarters = 1 dollar*.',pics:['coin']},
 rounds:[R.q('Count by fourths: 1/4, 2/4, 3/4, __',['4/4','5/4','1/5'],'4/4'),R.q('Count by halves: 1/2, 1, 1 1/2, __',['2','2 1/2','1 1/4'],'2'),
  R.q('*3 × 1/5 = ?*',['3/5','1/15','3/15'],'3/5'),R.q('*1/6 + 1/6 + 1/6 + 1/6* is the same as…',['4 × 1/6','6 × 1/4','4 + 6'],'4 × 1/6'),
  R.q('How far did Zoe swim in 8 laps?',['2 km','8 km','1 km'],'2 km'),R.q('*5/4* as a mixed number is…',['1 1/4','5 1/4','4 1/5'],'1 1/4'),
  R.q('How many tenths make 1 whole?',['10','1','100'],'10'),R.q('Count by thirds: 2, 2 1/3, 2 2/3, __',['3','3 1/3','2 3/3 + 1'],'3'),R.tf('8/8 is one whole.',true)],
 tries:[['Count by fifths from 0 to 2.','1/5, 2/5, … 10/5 = *2*'],['Write 7 × 1/2 as a mixed number.','*3 1/2*']]});

/* 14 ─ Decimal tenths */
U({id:'n14',title:'Decimal tenths',strand:'Number',codes:['B1.7'],
 guide:{goal:'Read, write, show, compare and order decimal tenths such as 0.7 and 2.3, using grids, number lines and money.',words:'decimal, decimal point, tenth, whole, compare',ask:['What does the 3 mean in 2.3?','Which is greater, 0.8 or 0.6?','Where do you see decimals in real life?'],home:'Find decimals at home: on a thermometer, a measuring cup, or a gas price.'},
 watch:['A decimal point splits wholes from parts.','2.3 means 2 wholes and 3 tenths.'],
 fig:'A number line from 2 to 3 marked in tenths.',
 page:{story:{title:'The Long Jump',text:'At the *track meet*, Aiden jumped *2.3* metres in the long jump. "That is *2 whole metres* and *3 tenths* of a metre," said Coach Kim. Bella jumped *2.7* metres. "Both have *2* wholes, so compare the *tenths*: *7 tenths > 3 tenths*. Bella wins!" Then little Theo from Grade 2 jumped *1.9*. "Almost *2*!" he cheered. The scores went on the board in order: *1.9, 2.3, 2.7*.',pics:['runner','medal','boy','girl'],
   acts:[[null,'park',['runner','boy'],'2.3 metres!'],['Bella','park',['runner','girl','medal'],'2.7 metres!'],['Theo','park',['boy','trophy'],'Almost 2!']]},
  boxes:[{title:'Tenths',lines:['0.1 = 1/10 one tenth','0.5 = 5/10 five tenths','1.0 = 10/10 one whole','*2.3* = two and three tenths']},
   {title:'Compare decimals',lines:['look at the wholes first','then compare the tenths','2.7 > 2.3 · 1.9 < 2.0']}],
  cards:[{q:'Write four and six tenths.',a:'*4.6*'},{q:'0.9 or 1.2: which is greater?',a:'*1.2*'}],
  words:[['decimal point','the dot that separates wholes from parts'],['tenth','one of 10 equal parts of a whole: 0.1']]},
 steps:[
  {say:'Read the story',speech:'Aiden jumped two point three metres. Bella jumped two point seven. Theo jumped one point nine. Bella’s jump was the longest.',set:S.row(['runner','medal','boy','girl'])},
  {say:'Tenths on a line',speech:'Between two and three there are ten tenths. Two point three is three tenths past two. Two point seven is seven tenths past two.',set:{custom:'dline',min:2,max:3,mark:[2.3,2.7]},
   cues:[['three tenths','m0','2.3'],['seven tenths','m1','2.7']]},
  {say:'Tenths on a grid',speech:'A whole cut into ten equal strips. Shade seven strips and you have seven tenths, or zero point seven.',set:{custom:'frac',list:[{parts:10,shade:7,shape:'bar',label:'0.7 = 7/10'}]},
   cues:[['seven strips','shaded','0.7','play']]}],
 more:{title:'Did you know?',text:'A healthy body temperature is about *37.0* degrees Celsius. If a thermometer says *38.5*, you might have a fever!',pics:['thermometer']},
 rounds:[M.dec(rnd(0,4)+rnd(1,9)/10),M.dec(rnd(1,8)+rnd(1,9)/10),M.dec(rnd(2,6)+rnd(1,9)/10),
  R.q('How far did Bella jump?',['2.7 m','2.3 m','1.9 m'],'2.7 m'),R.q('In *2.3*, the *3* means…',['3 tenths','3 wholes','3 hundreds'],'3 tenths'),
  R.q('Which is greater?',['1.2','0.9'],'1.2'),R.q('Write *four and six tenths*.',['4.6','46','6.4'],'4.6'),
  R.q('Order from least: 3.1, 1.3, 3.0',['1.3, 3.0, 3.1','3.1, 3.0, 1.3','3.0, 1.3, 3.1'],'1.3, 3.0, 3.1'),R.tf('0.5 is the same as five tenths.',true)],
 tries:[['Name a decimal between 5.4 and 5.6.','*5.5*'],['Write 8/10 as a decimal.','*0.8*']]});

/* 15 ─ Rounding decimals and fractions as decimals */
U({id:'n15',title:'Rounding decimals; fractions and decimals',strand:'Number',codes:['B1.8','B1.9'],
 guide:{goal:'Round decimal tenths to the nearest whole number, and show that fractions in tenths, halves and fifths can be written as decimals.',words:'round, nearest whole, equivalent, half, tenth',ask:['Round 6.4 to the nearest whole.','What decimal equals 1/2?','Is 3/10 the same as 0.3?'],home:'Round the kilometres on a trip meter to the nearest whole.'},
 watch:['Is it closer to 6 or 7?','6.4 rounds to 6. 6.5 or more rounds up to 7.'],
 fig:'A decimal line showing 6.4 closer to 6.',
 page:{story:{title:'The Pumpkin Weigh-Off',text:'At the *Port Elgin Pumpkinfest*, farmers weigh giant pumpkins. Jada’s pumpkin was *6.4* kilograms. "About *6* kilograms," she said, *rounding* to the nearest whole. Her brother’s was *8.5*. "*.5* rounds *up*, so about *9*!" At the pie booth, a sign said "*1/2* price: *$0.5* off each slice of *$1*". Jada laughed. "*1/2* is the same as *0.5*!" Another sign said "*3/10* of the pies are sold." "That is *0.3*," she said.',pics:['pumpkin','pie','girl','balance'],
   acts:[[null,'farm',['pumpkin:big','girl','balance'],'6.4 kg!'],['brother','farm',['pumpkin','boy'],'About 9!'],['pie booth','store',['pie','girl'],'1/2 = 0.5!']]},
  boxes:[{title:'Round to the nearest whole',lines:['look at the *tenths* digit','0–4 → round down: *6.4 → 6*','5–9 → round up: *8.5 → 9*']},
   {title:'Equal fractions and decimals',lines:['1/10 = *0.1*','3/10 = *0.3*','1/2 = 5/10 = *0.5*','1/5 = 2/10 = *0.2*']}],
  cards:[{q:'Round 12.7 to the nearest whole.',a:'*13*'},{q:'Write 4/5 as a decimal.',a:'8/10 = *0.8*'}],
  words:[['equivalent','equal in value, like 1/2 and 0.5'],['nearest whole','the closest whole number']]},
 steps:[
  {say:'Read the story',speech:'Jada’s pumpkin was six point four kilograms, about six. Her brother’s was eight point five, about nine. And one half is the same as zero point five.',set:S.row(['pumpkin','pie','girl','balance'])},
  {say:'Closer to which whole?',speech:'Six point four is between six and seven. It is closer to six, so it rounds down to six.',set:{custom:'dline',min:6,max:7,mark:[6.4]},
   cues:[['closer to six','m0','≈ 6']]},
  {say:'One half is five tenths',speech:'One half of a bar covers five of its ten strips. So one half equals five tenths, which is zero point five.',set:{custom:'frac',list:[{parts:2,shade:1,shape:'bar',label:'1/2'},{parts:10,shade:5,shape:'bar',label:'5/10 = 0.5'}]},
   cues:[['five tenths','shaded','0.5','play']]}],
 more:{title:'Did you know?',text:'The heaviest pumpkin grown in Canada weighed more than *1 000* kilograms. That is heavier than a small car!',pics:['pumpkin','car']},
 rounds:[...[0,1,2].map(()=>{const n=rnd(1,19)+rnd(1,9)/10;const r=Math.round(n);return R.q('Round *'+f1(n)+'* to the nearest whole.',[String(r),String(r===Math.floor(n)?r+1:r-1)],String(r),{set:{custom:'dline',min:Math.floor(n),max:Math.floor(n)+1,mark:[n]}});}),
  R.q('*1/2* as a decimal is…',['0.5','0.2','1.2'],'0.5'),R.q('*3/10* as a decimal is…',['0.3','3.10','0.03'],'0.3'),R.q('*1/5* as a decimal is…',['0.2','0.5','1.5'],'0.2'),
  R.q('What did Jada’s pumpkin weigh?',['6.4 kg','8.5 kg','9 kg'],'6.4 kg'),R.q('Round *8.5* to the nearest whole.',['9','8'],'9'),R.tf('0.7 and 7/10 are equivalent.',true)],
 tries:[['Round 15.5 and 15.4.','*16* and *15*'],['Write 0.9 as a fraction.','*9/10*']]});

/* 16 ─ Adding and subtracting tenths */
U({id:'n16',title:'Adding and subtracting tenths',strand:'Number',codes:['B2.3','B2.4','B1.10'],
 guide:{goal:'Add and subtract decimal tenths using number lines, models and the column method, lining up the decimal points, and use mental math.',words:'decimal point, line up, tenths, regroup',ask:['Why do you line up decimal points?','What is 0.6 + 0.7?','What is 3.2 − 1.5?'],home:'Measure two pencils in centimetres and tenths, then add the lengths.'},
 watch:['Line up the points!','0.6 + 0.7 = 13 tenths = 1.3.'],
 fig:'A frog hopping along a decimal line.',
 page:{story:{title:'Rainy Days in Vancouver',text:'Arjun tracked the rain in *Vancouver* for science. On Monday, *1.6* centimetres of rain fell. On Tuesday, *0.8* centimetres. "*6 tenths + 8 tenths = 14 tenths*. That is *1 whole and 4 tenths*," he said. "So *1.6 + 0.8 = 2.4* centimetres." On Wednesday the sun came out, and *0.9* centimetres of a puddle dried up from his *2.4* centimetre puddle. "*2.4 − 0.9 = 1.5*," he wrote. "Still enough to jump in!"',pics:['umbrella','cloud','boy','droplet'],
   acts:[[null,'city',['umbrella','boy','cloud'],'1.6 cm Monday!'],['Tuesday','city',['cloud','droplet'],'+0.8 cm!'],['Wednesday','park',['sun','boy','droplet'],'Puddle jump!']]},
  boxes:[{title:'Add tenths',lines:['  1.6','+ 0.8','  *2.4*','10 tenths → 1 whole']},
   {title:'Subtract tenths',lines:['  2.4','− 0.9','  *1.5*','Trade 1 whole for 10 tenths when you need to.']}],
  cards:[{q:'0.6 + 0.7 = ?',a:'*1.3*'},{q:'5.0 − 2.3 = ?',a:'*2.7*'}],
  words:[['line up','put digits of the same place in the same column'],['regroup','trade 10 tenths for 1 whole, or 1 whole for 10 tenths']]},
 steps:[
  {say:'Read the story',speech:'One point six centimetres fell on Monday and zero point eight on Tuesday. Together, two point four. Then zero point nine dried up, leaving one point five.',set:S.row(['umbrella','cloud','boy','droplet'])},
  {say:'Hop to add',speech:'Start at one point six. Hop four tenths to reach two. Hop four more tenths to reach two point four.',set:{custom:'dline',min:1,max:3,step:.1,hops:[[1.6,2],[2,2.4]],mark:[2.4]},
   cues:[['reach two','frog','+0.4','play'],['two point four','m0','2.4']]},
  {say:'Hop back to subtract',speech:'Start at two point four. Hop back four tenths to two, then five more tenths to one point five.',set:{custom:'dline',min:1,max:3,step:.1,hops:[[2.4,2],[2,1.5]],mark:[1.5]},
   cues:[['back four tenths','frog','−0.4','play'],['one point five','m0','1.5']]}],
 more:{title:'Did you know?',text:'*Henderson Lake* in British Columbia is one of the rainiest places in North America. It can get more than *650* centimetres of rain in a year!',pics:['cloud','umbrella']},
 rounds:[...[0,1,2].map(()=>{const a=rnd(5,40)/10,b=rnd(3,19)/10;return R.q('What is *'+f1(a)+' + '+f1(b)+'*?',dnear(a+b),f1(a+b),{set:{custom:'dline',min:Math.floor(a),max:Math.ceil(a+b)+(Number.isInteger(a+b)?0:0),hops:[[a,a+b]],mark:[a]}});}),
  ...[0,1].map(()=>{const a=rnd(20,60)/10,b=rnd(3,19)/10;return R.q('What is *'+f1(a)+' − '+f1(b)+'*?',dnear(a-b),f1(a-b));}),
  R.q('How much rain fell on Monday and Tuesday?',['2.4 cm','1.4 cm','2.2 cm'],'2.4 cm'),R.q('*0.6 + 0.7* = ?',['1.3','0.13','13'],'1.3'),
  R.q('Why do we line up the decimal points?',['so tenths add to tenths','to make it look neat','we don’t need to'],'so tenths add to tenths'),R.tf('10 tenths make 1 whole.',true)],
 tries:[['Add 3.7 + 2.8.','*6.5*'],['A ribbon is 4.0 m. Cut off 1.6 m. What is left?','*2.4 m*']]});

/* 17 ─ Rates */
U({id:'n17',title:'Rates: how many for each',strand:'Number',codes:['B2.8'],
 guide:{goal:'Show simple whole-number rates like “3 for $1” or “60 km in 1 hour” using tables, drawings and multiplication.',words:'rate, per, for each, table, scale',ask:['If apples are 3 for $1, how many for $4?','A car goes 80 km in 1 hour. How far in 3 hours?','How does a table show a rate?'],home:'Your heart beats about 80 times per minute. How many beats in 5 minutes?'},
 watch:['A rate compares two different things.','3 apples per $1 → 12 apples for $4.'],
 fig:'Groups that grow in a rate table.',
 page:{story:{title:'The Farmers’ Market',text:'At the *St. Jacobs Farmers’ Market*, a sign said "Apples: *3 for $1*". Liam had *$4*. He made a *rate table*: *$1 → 3*, *$2 → 6*, *$3 → 9*, *$4 → 12*. "I can buy *12* apples!" Next door, honey cost *$8 per jar*. "*3* jars cost *3 × $8 = $24*," said his mom. On the drive home, they went *80 kilometres per hour* for *2* hours. "That is *160* kilometres," said Liam. "Rates are everywhere!"',pics:['apple','honey','boy','car'],
   acts:[[null,'store',['apple','basket','boy'],'3 for $1!'],['honey','store',['honey','jar','woman'],'$8 per jar!'],['drive home','city',['car','boy'],'80 km per hour!']]},
  boxes:[{title:'Rate table: 3 apples for $1',lines:['$: 1, 2, 3, *4*','apples: 3, 6, 9, *12*']},
   {title:'Rates around us',lines:['*80 km per hour*','*$8 per jar*','*60 minutes per hour*','*100 cm per metre*']}],
  cards:[{q:'Pencils are 4 for $1. How many for $5?',a:'*20*'},{q:'A bike goes 15 km per hour. How far in 3 hours?',a:'*45 km*'}],
  words:[['rate','a comparison of two different kinds of amounts, like km per hour'],['per','for each']]},
 steps:[
  {say:'Read the story',speech:'Apples were three for one dollar. With four dollars, Liam could buy twelve apples. Honey was eight dollars per jar.',set:S.row(['apple','honey','boy','car'])},
  {say:'Groups of three',speech:'Each dollar buys a group of three apples. Four dollars buy four groups of three: twelve apples.',set:{custom:'groups',g:4,n:3,item:'apple',label:'$4 → 12 apples'},
   cues:[['four groups','group','4 × 3'],['twelve apples','sentence','12','play']]},
  {say:'A rate table',speech:'The table grows by three apples for every dollar: three, six, nine, twelve.',set:{custom:'tiles',nums:[3,6,9,12],rule:'$1, $2, $3, $4 → apples'},
   cues:[['three apples for every dollar','rule','+3 each']]}],
 more:{title:'Did you know?',text:'A hummingbird’s heart can beat about *1 200* times *per minute*. Yours beats about *80* times per minute.',pics:['bird','heart']},
 rounds:[...[[3,'apple'],[4,'pencil'],[5,'cookie'],[2,'balloon']].map(([r,item])=>{const n=rnd(3,6);return M.q(item[0].toUpperCase()+item.slice(1)+'s are *'+r+' for $1*. How many for *$'+n+'*?',{custom:'groups',g:n,n:r,item,label:r+' for $1'},near(n*r,{lo:0,d:[r,-r,1,-1]}),n*r);}),
  R.q('How many apples could Liam buy with $4?',['12','7','4'],'12'),R.q('Honey is $8 per jar. How much for 3 jars?',['$24','$11','$38'],'$24'),
  R.q('80 km per hour for 2 hours is…',['160 km','82 km','40 km'],'160 km'),R.q('What does *per* mean?',['for each','in total','less than'],'for each'),R.tf('A rate compares two different kinds of amounts.',true)],
 tries:[['Tickets are $6 each. Make a table for 1 to 5 tickets.','$6, $12, $18, $24, *$30*'],['You read 20 pages per day. How many in a week?','*140*']]});
})();
