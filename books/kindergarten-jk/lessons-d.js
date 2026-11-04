/* The Interactive Classroom: Junior Kindergarten — Section 4: Story time. Little stories acted out in 3D, each with a few happy games. */
(function(){
"use strict";
const P=window.PM;if(!P||!P.unit||!P.PK)return;const U=P.unit,R=P.R,S=P.S;
const story=(id,title,pic,text,pics,acts,rounds,goal)=>U({id,title,strand:'Story Time',codes:['Literacy & Math','Belonging'],
  guide:{goal:goal||'Listen to a short story, watch it come alive in 3D, and talk about what happened first, next and last.',words:'story, first, next, last',ask:['Who was in the story?','What happened first?','What was your favourite part?'],home:'Read the story again at bedtime. Let your child tell you what happens next!'},
  watch:['Story time!','Listen and watch the story come alive.'],fig:'The story, acted out in 3D.',
  kid:{big:'',pic,line:'*'+title+'*'},page:{story:{title,text,pics,acts}},
  steps:[{say:'Story time',speech:text.replace(/\*/g,''),set:S.row(pics)}],rounds});

story('t1','Teddy’s Tidy-Up','teddy','Teddy’s playroom was a *big mess*! Toys everywhere! "Let’s *sort*," said Teddy. He put all the *red* toys in one basket. He put all the *blue* toys in another. Then he found *fruit* on the floor. "Fruit goes in the *kitchen*!" Now everything was *tidy*.',['teddy','basket','apple','ball'],
 [[null,'playroom',['teddy:big','ball','block','car'],'What a mess!'],['red','playroom',['teddy','apple','basket'],'Red with red!'],['blue','playroom',['teddy','ball','basket'],'Blue with blue!'],['tidy','playroom',['teddy:big','basket'],'All tidy!']],
 [R.feed('Help Teddy: put the *fruit* in the basket.','basket',['*apple','*banana','*strawberry','car','ball','block']),R.pop('Pop the *red* balloons!',['*balloon::#ff6b6b:red','*balloon::#ff6b6b:red','balloon::#4fb3ff:blue','balloon::#ffd43b:yellow']),R.one('Who tidied the playroom?','teddy',['cat','duck']),R.feed('Put the *toys* in the toy box.','box',['*ball','*car','*block','apple','banana'])]);

story('t2','Three Little Ducks','duck','*One* little duck went for a swim. *Quack!* Then *two* little ducks went for a swim. *Quack, quack!* Then *three* little ducks went for a swim. *Quack, quack, quack!* Mama Duck counted: "*One, two, three.* All my babies are here!" And they swam home together.',['duck','pond','sun','fish'],
 [[null,'pond',['duck'],'Quack!'],['two','pond',['duck','duck'],'Quack, quack!'],['three','pond',['duck','duck','duck'],'Quack, quack, quack!'],['swam home','pond',['duck:big','duck','duck'],'All here!']],
 [R.count('How many little ducks? Tap to count.','duck',3),R.one('Who counted the babies?','duck',['cow','dog']),R.feed('Feed the ducks *3* fish.','duck',['*fish','*fish','*fish','fish'],{need:3,count:true}),R.frog('Help the frog hop to *3*.',3,{max:5})]);

story('t3','Five Little Frogs','frog','*Five* little frogs sat on a log. *Ribbit!* One jumped into the pond. *Splash!* Now there were *four* little frogs. "Come in!" said the first frog. "The water is warm!" *Splash, splash, splash, splash!* Now all *five* frogs were swimming.',['frog','pond','log','droplet'],
 [[null,'pond',['frog','frog','frog','frog','frog'],'Ribbit!'],['Splash','pond',['frog','droplet'],'Splash!'],['four','pond',['frog','frog','frog','frog'],'Four on the log!'],['five frogs','pond',['frog:big','frog','frog'],'All five swimming!']],
 [R.count('How many frogs? Tap to count.','frog',5),R.frog('Hop the frog to *5*!',5,{max:6}),R.one('Where did the frogs jump?','pond',['tree','house']),R.spots('Give the ladybug *5* spots.',5)]);

story('t4','Rocket to the Moon','rocket','Zara built a *rocket* out of boxes. "Let’s count to blast off!" said her brother Ben. "*Ten, nine, eight, seven, six, five, four, three, two, one… BLAST OFF!*" Whoosh! In their pretend game, they flew all the way to the *Moon*.',['rocket','star','girl','moon'],
 [[null,'playroom',['box','girl','boy'],'Let’s build a rocket!'],['BLAST OFF','space',['rocket:big'],'Whoosh!'],['Moon','space',['full moon','rocket'],'We made it!']],
 [R.one('What did Zara build?','rocket',['car','boat']),R.one('Where did they fly?','moon',['sun','tree']),R.bub('Pop the bubbles with *stars*!',['*star','*star','*star','moon','rocket','planet']),R.count('How many stars? Tap to count.','star',6)]);

story('t5','Caterpillar’s Coat','caterpillar','Little *Caterpillar* wanted a new coat. "Make it a *pattern*," said Ladybug. Red, *green*, red, *green*! "What comes *next*?" "*Red*!" said Caterpillar. Bee added stripes: yellow, black, yellow, black. And one day, Caterpillar became a beautiful *butterfly*!',['caterpillar','ladybug','bee','butterfly'],
 [[null,'garden',['caterpillar','ladybug'],'I need a coat!'],['What comes next','garden',['caterpillar:big'],'Red!'],['Bee','garden',['bee','caterpillar'],'Yellow, black!'],['butterfly','garden',['butterfly:big','flower'],'Ta-da!']],
 [R.gap('What comes next?',['shape:circle:#ff6b6b','shape:circle:#5cc46a','shape:circle:#ff6b6b','shape:circle:#5cc46a','?'],['*shape:circle:#ff6b6b','shape:circle:#4fb3ff','shape:circle:#ffd43b'],{s:.8}),R.one('What did Caterpillar become?','butterfly',['bee','bird']),R.order('Tap them in order.',['caterpillar','chrysalis','butterfly']),R.web('Help the spider find the *butterflies*!',['*butterfly','*butterfly','bee','ladybug','caterpillar'])]);

story('t6','Where Is Kitten?','kitten','Kitten loved to *hide*! Was she *in* the box? Yes! Then she hid *under* the bed. Then she sat *on* the chair. Then she curled up *beside* the dog. "Where are you now?" called Maya. *Meow!* Maya found her and gave her a big hug.',['kitten','box','chair','girl'],
 [[null,'home',['kitten','box'],'In the box!'],['under','bedroom',['kitten','bed'],'Under the bed!'],['beside','home',['kitten','dog'],'Beside the dog!'],['hug','home',['girl','kitten'],'Found you!']],
 [R.dig('Where is Kitten hiding? Dig to find her!',['*kitten','ball','shoe','teddy']),R.one('Who was Kitten’s friend?','dog',['lion','whale']),R.feed('Put the toys *in* the box.','box',['*ball','*teddy','*car','tree']),R.one('Who found Kitten?','girl',['cow','fish'])]);

story('t7','Little Chick Hatches','chick','*First*, Mother Hen sat on a smooth white *egg*. She kept it warm for many days. *Next*, the egg went *tap, tap, crack*! Out came a fluffy yellow *chick*. "Peep peep!" *Last*, the little chick grew and grew into a big *hen*.',['egg','chick','hen','nest'],
 [[null,'farm',['hen','egg','nest'],'First: an egg!'],['crack','farm',['chick','egg'],'Next: a chick! Peep!'],['big hen','farm',['hen:big','egg'],'Last: a hen!']],
 [R.order('Tap them in order: first, next, last.',['egg','chick','hen']),R.one('What came out of the egg?','chick',['frog','fish']),R.feed('Put the eggs in the nest.','nest',['*egg','*egg','*egg','ball']),R.mem('Find the mama and baby pairs.',[['hen','chick'],['cat','kitten'],['dog','puppy']])]);

story('t8','Bear’s Year','bear','In *spring*, Bear woke up. *Rain* went pitter-patter and flowers popped up. In *summer*, the *sun* was hot. Bear splashed in the lake! In *fall*, red and orange *leaves* tumbled down. In *winter*, white *snow* fell softly. Bear curled up in his den and went to sleep. *Zzz*.',['bear','umbrella','sun','snowflake'],
 [[null,'meadow',['bear','flower','cloud'],'Spring rain!'],['summer','beach',['bear','sun'],'Splash!'],['fall','forest',['bear','leaf','tree'],'Leaves tumbling!'],['winter','winter',['bear','snowflake'],'Zzz…']],
 [R.one('What falls in *winter*?','snowflake',['leaf','flower']),R.feed('It is snowy! Dress the snowman.','snowman',['*hat','*gloves','*boot','sandal']),R.one('What do you need in the *rain*?','umbrella',['sunglasses','sled']),R.bub('Pop the bubbles with *snowflakes*!',['*snowflake','*snowflake','*snowflake','sun','leaf','flower'])]);
})();
