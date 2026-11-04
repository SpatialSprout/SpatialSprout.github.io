/* The Interactive Classroom: Junior Kindergarten — My World (senses, animals, plants, weather and seasons), Me and My Community (me and my feelings, family and friends, helpers and safety) and Art and Music */
(function(){
"use strict";
const P=window.PM;if(!P||!P.unit||!P.PK)return;const U=P.unit,R=P.R,S=P.S;
const FR='Literacy & Math',PS='Problem Solving',BC='Belonging',SR='Well-Being';

/* 18 ─ Five senses */
U({id:'k18',title:'My five senses',strand:'My World',codes:[PS,SR],
 guide:{goal:'Name the five senses (seeing, hearing, smelling, tasting, touching), the body part for each, and use them to explore the world.',words:'see, hear, smell, taste, touch, senses',ask:['What do you use to smell a flower?','What can you hear right now?','How does a teddy bear feel?'],home:'Go on a senses walk: name one thing you see, hear, smell and touch.'},
 watch:['Eyes, ears, nose, mouth, hands!','I see with my eyes, I hear with my ears, I smell with my nose, I taste with my tongue, I touch with my hands.'],
 fig:'A child using all five senses at a picnic.',
 page:{story:{title:'Picnic Senses',text:'Lily went on a *picnic*. She *saw* a red ladybug with her *eyes*. She *heard* birds sing with her *ears*. She *smelled* sweet flowers with her *nose*. She *tasted* a juicy strawberry with her *tongue*. Yum! She *touched* the soft grass with her *hands*. "My five senses help me *explore*!" said Lily.',pics:['eye','ear','nose','hand'],
   acts:[[null,'meadow',['girl','blanket'],'Picnic time!'],['ladybug','meadow',['ladybug','eye'],'I see you!'],['birds','meadow',['bird','ear'],'Tweet tweet!'],['strawberry','meadow',['strawberry','girl'],'Yum!']]},
  boxes:[{title:'Five senses',ex:[['eye','*see*'],['ear','*hear*'],['nose','*smell*'],['tongue','*taste*'],['hand','*touch*']],cols:5}],
  cards:[{q:'What do you use to hear music?',pics:['musical note'],a:'your *ears*'},{q:'Is ice hot or cold to touch?',pics:['snowflake'],a:'*cold*'}],
  words:[['senses','the ways your body learns about the world'],['explore','look, listen and touch to find out']]},
 steps:[
  {say:'Read the story',speech:'Lily saw a ladybug, heard birds, smelled flowers, tasted a strawberry and touched the grass. Five senses!',set:S.row(['eye','ear','nose','hand'])},
  {say:'Meet your senses',speech:'Tap each one. Eyes to see. Ears to hear. Nose to smell. Hands to touch.',set:S.look(['eye','ear','nose','hand'])},
  {say:'Use your nose',speech:'Which things can you smell? Tap the flower, the cookie and the pizza!',set:S.tap(['*flower','*cookie','*pizza','rock'],{layout:'row'})}],
 more:{title:'Mystery bag',text:'Put a toy in a bag. Feel it without looking. Can you *guess* what it is using *touch*?',pics:['bag']},
 rounds:[R.one('What do you use to *see*?','eye',['ear','nose']),R.one('What do you use to *hear*?','ear',['eye','hand']),R.one('What do you use to *smell*?','nose',['ear','hand']),
  R.one('What do you use to *touch*?','hand',['eye','ear']),R.tap('Tap the things you can *hear*.',['*bell','*drum','*dog','flower']),R.tap('Tap the things that *smell* yummy.',['*cookie','*pizza','rock','socks']),
  R.one('Which one feels *soft*?','teddy',['rock','fork']),R.one('Which one is *cold*?','ice cream',['soup','sun']),R.one('Which one is *loud*?','drum',['feather','butterfly'])],
 tries:[['Close your eyes. What can you hear?','birds, cars, voices…'],['Taste test: sweet or sour?','lemon is sour, apple is sweet']]});

/* 19 ─ Animals */
U({id:'k19',title:'Animals and their babies',strand:'My World',codes:[PS],
 guide:{goal:'Name farm and wild animals, match animal babies to their parents, and talk about where animals live.',words:'animal, baby, farm, home, puppy, kitten, calf',ask:['What is a baby cow called?','Where does a bird live?','Which animals live on a farm?'],home:'Visit a farm or petting zoo, or look at animal books together.'},
 watch:['Moo, baa, oink!','A baby cat is a kitten. A baby dog is a puppy. A baby cow is a calf.'],
 fig:'Farm animals with their babies.',
 page:{story:{title:'Who Is My Mama?',text:'On the farm, a little *chick* went *peep*. "Where is my mama?" She asked the *cow*. "*Moo*, I am the mama of the *calf*!" She asked the *sheep*. "*Baa*, I am the mama of the *lamb*!" She asked the *pig*. "*Oink*, I am the mama of the *piglet*!" Then she heard *cluck, cluck*. "*Mama Hen!*" The chick snuggled under her warm wing.',pics:['chick','cow','sheep','hen'],
   acts:[[null,'farm',['chick'],'Peep! Where is my mama?'],['cow','farm',['cow','chick'],'Moo!'],['sheep','farm',['sheep','lamb'],'Baa!'],['Mama Hen','farm',['hen:big','chick'],'Cluck! Here I am!']]},
  boxes:[{title:'Mamas and babies',ex:[['cat','cat → *kitten*'],['dog','dog → *puppy*'],['cow','cow → *calf*'],['hen','hen → *chick*']],cols:4},
   {title:'Animal homes',ex:[['nest','bird: *nest*'],['barn','cow: *barn*'],['pond','fish: *pond*']],cols:3}],
  cards:[{q:'What sound does a cow make?',pics:['cow'],a:'*moo*!'},{q:'What is a baby sheep called?',pics:['sheep'],a:'a *lamb*'}],
  words:[['baby animal','a young animal, like a puppy or a calf'],['farm','a place where animals and food are raised']]},
 steps:[
  {say:'Read the story',speech:'The little chick looked for her mama. The cow was the calf’s mama, the sheep was the lamb’s mama. Then Mama Hen clucked.',set:S.row(['chick','cow','sheep','hen'])},
  {say:'Animal sounds',speech:'Tap each animal and say its sound. Cow, moo! Pig, oink! Sheep, baa! Duck, quack!',set:S.look(['cow','pig','sheep','duck'])},
  {say:'Find the babies',speech:'Tap the baby animals: the chick, the kitten and the puppy!',set:S.tap(['*chick','*kitten','*puppy','cow'],{layout:'row'})}],
 more:{title:'Did you know?',text:'A baby *kangaroo* is called a *joey*, and it rides in its mama’s pouch!',pics:['kangaroo']},
 rounds:[R.one('Which one is a *baby* cat?','kitten',['cat','dog']),R.one('Which one is a *baby* dog?','puppy',['dog','cow']),R.one('Who is the chick’s *mama*?','hen',['cow','pig']),
  R.one('Which animal says *moo*?','cow',['duck','dog']),R.one('Which animal says *oink*?','pig',['sheep','cat']),R.feed('Put the *farm animals* in the barn.','barn',['*cow','*pig','*sheep','lion','whale']),
  R.feed('Put the birds in the *nest*.','nest',['*chick','*bird','fish','dog']),R.one('Which animal lives in the *water*?','fish',['cow','sheep']),R.one('Which animal says *quack*?','duck',['pig','horse'])],
 tries:[['Moo like a cow and hop like a bunny!','animal moves'],['Name 3 baby animals.','kitten, puppy, calf']]});

/* 20 ─ Plants grow */
U({id:'k20',title:'Seeds grow into plants',strand:'My World',codes:[PS],
 guide:{goal:'Explain that seeds grow into plants when they get water, sunlight and soil, and name the parts: roots, stem, leaves and flower.',words:'seed, sprout, roots, stem, leaf, flower, water, sun',ask:['What does a seed need to grow?','Which part of the plant drinks water?','What grows first, the flower or the roots?'],home:'Plant a bean seed in a cup. Water it and watch it sprout!'},
 watch:['Seed, sprout, flower!','A seed needs soil, water and sun. Then it sprouts and grows.'],
 fig:'A seed growing into a sunflower.',
 page:{story:{title:'Sunny the Sunflower',text:'Max planted a tiny *seed* in the *soil*. He gave it *water* every day. The *sun* shone warm. One morning — *pop*! A little green *sprout* came up. It grew a *stem* and big *leaves*. It grew *taller* than Max! At the top bloomed a giant yellow *flower*. "I’ll call you *Sunny*!" said Max. The bees buzzed by to say hello.',pics:['seed','droplet','sun','sunflower'],
   acts:[[null,'garden',['seed','boy','shovel'],'Plant the seed!'],['water','garden',['droplet','seedling'],'Drink up!'],['sprout','garden',['seedling:big'],'Pop!'],['yellow flower','garden',['sunflower:big','bee','boy'],'Hello, Sunny!']]},
  boxes:[{title:'A seed needs',ex:[['droplet','*water*'],['sun','*sun*'],['soil layers','*soil*']],cols:3},
   {title:'Plant parts',ex:[['carrot','*roots*'],['seedling','*stem*'],['leaf','*leaves*'],['flower','*flower*']],cols:4}],
  cards:[{q:'What does a plant drink?',pics:['droplet'],a:'*water*'},{q:'What grows from a seed?',pics:['seed'],a:'a *plant*'}],
  words:[['seed','a tiny thing that grows into a plant'],['sprout','a new little plant just coming up']]},
 steps:[
  {say:'Read the story',speech:'Max planted a seed. Water and sun helped it sprout. It grew a stem, leaves and a big yellow flower called Sunny.',set:S.row(['seed','droplet','sun','sunflower'])},
  {say:'Help it grow',speech:'Give the seed what it needs. Tap the water and the sun. Not the cookie!',set:S.tap(['*droplet','*sun','cookie'],{mode:'collect',basket:'seedling'})},
  {say:'In order',speech:'Tap them in order. First the seed, next the sprout, last the flower.',set:S.order(['seed','seedling','sunflower'])}],
 more:{title:'Did you know?',text:'Sunflowers turn their faces to follow the *sun* across the sky when they are young!',pics:['sunflower','sun']},
 rounds:[R.feed('Give the plant what it needs.','seedling',['*droplet','*sun','pizza','car']),R.order('Tap them in order.',['seed','seedling','sunflower']),
  R.one('What does a seed need?','droplet',['candy','toy']),R.one('Which one grows from a seed?','flower',['rock','car']),R.tap('Tap all the *plants*.',['*tree','*flower','*cactus','dog','ball']),
  R.one('Which part of a carrot do we eat? The…','carrot',['flower','leaf']),R.gap('What comes next?',['seed','seedling','?'],['*sunflower','egg','sun']),R.one('Who visits flowers?','bee',['fish','dog'])],
 tries:[['Plant a seed and draw it every day.','watch it grow!'],['Name 3 foods that grow on plants.','apple, carrot, corn']]});

/* 21 ─ Weather and seasons */
U({id:'k21',title:'Weather and seasons',strand:'My World',codes:[PS,SR],
 guide:{goal:'Describe the weather (sunny, rainy, snowy, windy, cloudy), name the four seasons, and choose clothing for the weather.',words:'weather, sunny, rainy, snowy, windy, seasons, spring, summer, fall, winter',ask:['What is the weather today?','What do you wear in the snow?','Which season has falling leaves?'],home:'Be the family weather reporter every morning!'},
 watch:['Sun, rain, snow, wind!','In winter it snows, in spring it rains, in summer it is hot and in fall the leaves fall.'],
 fig:'Four trees in four seasons.',
 page:{story:{title:'Bear’s Year',text:'In *spring*, Bear woke up. *Rain* went pitter-patter and flowers popped up. In *summer*, the *sun* was hot. Bear splashed in the lake! In *fall*, the *wind* blew and red and orange *leaves* tumbled down. Bear ate lots of berries. In *winter*, white *snow* fell softly. Bear curled up in his den and went to sleep. "See you in spring!" *Zzz*.',pics:['bear','umbrella','sun','snowflake'],
   acts:[[null,'meadow',['bear','flower','cloud'],'Spring rain!'],['summer','beach',['bear','sun'],'Splash!'],['fall','forest',['bear','leaf','tree'],'Leaves tumbling!'],['winter','winter',['bear','snowflake'],'Zzz… see you in spring!']]},
  boxes:[{title:'Weather',ex:[['sun','*sunny*'],['umbrella','*rainy*'],['snowflake','*snowy*'],['wind','*windy*']],cols:4},
   {title:'Four seasons',ex:[['flower','*spring*'],['sun','*summer*'],['maple leaf','*fall*'],['snowman','*winter*']],cols:4}],
  cards:[{q:'What do you wear in the rain?',pics:['umbrella'],a:'*boots* and a raincoat'},{q:'Which season is snowy?',pics:['snowman'],a:'*winter*'}],
  words:[['weather','what it is like outside: sunny, rainy, snowy'],['season','a time of year: spring, summer, fall or winter']]},
 steps:[
  {say:'Read the story',speech:'Bear saw spring rain, the summer sun, fall leaves and winter snow. Then he slept until spring.',set:S.row(['bear','umbrella','sun','snowflake'])},
  {say:'What is the weather?',speech:'Tap each one. Sunny! Rainy! Snowy! Windy!',set:S.look(['sun','umbrella','snowflake','wind'])},
  {say:'Dress for snow',speech:'It is snowing! Tap the clothes to wear: mittens, a hat and boots. Not shorts!',set:S.tap(['*gloves','*hat','*boot','sandal'],{mode:'collect',basket:'snowman'})}],
 more:{title:'Did you know?',text:'Every *snowflake* has *six* sides, and no two are exactly the same!',pics:['snowflake']},
 rounds:[R.feed('It is snowy! Dress the snowman.','snowman',['*hat','*gloves','*boot','sandal','sunglasses']),R.one('What do you need when it *rains*?','umbrella',['sunglasses','sled']),
  R.one('Which one is *winter*?','snowman',['flower','sun']),R.one('Which one is *summer*?','sun',['snowflake','maple leaf']),R.one('In which season do *leaves fall*?','maple leaf',['snowman','sun']),
  R.one('What do you wear on a *hot sunny* day?','sunglasses',['gloves','scarf']),R.one('What can you build with *snow*?','snowman',['sandcastle','kite']),R.one('What flies on a *windy* day?','kite',['boot','car'])],
 tries:[['Draw today’s weather.','sun, cloud, rain or snow?'],['What is your favourite season? Why?','e.g. winter, for sledding!']]});

/* 22 ─ All about me and my feelings */
U({id:'k22',title:'All about me',strand:'Me and My Community',codes:[SR,BC],
 guide:{goal:'Talk about themselves (name, age, favourite things), name feelings (happy, sad, angry, scared, calm) and use calming strategies like deep breaths.',words:'me, special, happy, sad, angry, scared, calm, feelings',ask:['What makes you happy?','How does your face look when you are sad?','What can you do when you feel angry?'],home:'Make an “All about me” poster with photos and favourite things.'},
 watch:['I am special!','Everyone has feelings. When I feel angry, I can smell the flower and blow out the candle.'],
 fig:'Faces showing different feelings.',
 page:{story:{title:'Noor’s Feelings Day',text:'Noor is *four*. She loves *strawberries* and the colour *purple*. In the morning she felt *happy*: her dog licked her cheek! At the park, her ice cream fell. She felt *sad*. When a boy took her shovel, she felt *angry*! Noor took a deep breath: *smell the flower, blow out the candle*. She felt *calm*. "Can I have a turn, please?" The boy shared, and Noor felt happy again.',pics:['girl','dog','ice cream','flower'],
   acts:[[null,'home',['girl','dog'],'Happy! Licks!'],['ice cream','park',['ice cream','girl'],'Oh no… sad.'],['angry','park',['shovel','boy'],'Hey!'],['calm','park',['flower','girl'],'Smell the flower…']]},
  boxes:[{title:'Feelings',ex:[['happy face','*happy*'],['sad face','*sad*'],['angry face','*angry*'],['scared face','*scared*']],cols:4},
   {title:'Calm down',lines:['smell the flower (breathe in)','blow out the candle (breathe out)','hug a teddy','use your words']}],
  cards:[{q:'How do you feel at a birthday party?',pics:['cake'],a:'*happy*!'},{q:'What helps when you are angry?',a:'take a *deep breath*'}],
  words:[['feelings','what we feel inside: happy, sad, angry, scared'],['calm','quiet and peaceful inside']]},
 steps:[
  {say:'Read the story',speech:'Noor felt happy, then sad, then angry. She took a deep breath, smell the flower, blow out the candle, and felt calm.',set:S.row(['girl','dog','ice cream','flower'])},
  {say:'Name the feeling',speech:'Tap each face. Happy. Sad. Angry. Scared.',set:S.look(['happy face','sad face','angry face','scared face'])},
  {say:'Breathe with me',speech:'Let’s breathe together. Smell the flower… and blow out the candle. Tap them both.',set:S.tap(['*flower','*candle'],{layout:'row'})}],
 more:{title:'Feelings song',text:'Sing: *If you’re happy and you know it, clap your hands!* Then try: if you’re *sleepy*, give a yawn!',pics:['hand']},
 rounds:[R.one('Which face is *happy*?','happy face',['sad face','angry face']),R.one('Which face is *sad*?','sad face',['happy face','scared face']),R.one('Which face is *angry*?','angry face',['happy face','sad face']),
  R.one('How would you feel at a *birthday party*?','happy face',['sad face','angry face']),R.one('How would you feel if your ice cream *fell*?','sad face',['happy face','scared face']),
  R.tap('Tap the things that help you feel *calm*.',['*teddy','*book','*flower','drum']),R.one('What helps when you feel angry?','flower',['drum','rock']),R.one('Which face is *scared*?','scared face',['happy face','angry face'])],
 tries:[['Make a happy face, then a sad face!','use a mirror'],['Practise: smell the flower, blow out the candle.','3 times']]});

/* 23 ─ Family and friends */
U({id:'k23',title:'Family and friends',strand:'Me and My Community',codes:[BC,SR],
 guide:{goal:'Talk about families (all families are different and special), and practise being a good friend: sharing, taking turns, helping and saying please and thank you.',words:'family, friend, share, take turns, kind, please, thank you',ask:['Who is in your family?','How can you be a good friend?','What do you say when someone helps you?'],home:'Play a board game and practise taking turns.'},
 watch:['Share, take turns, be kind!','Friends share toys, take turns and say please and thank you.'],
 fig:'Friends sharing toys in a playroom.',
 page:{story:{title:'The Block Tower',text:'Ava and Ben both wanted the *blocks*. "Mine!" said Ben. "No, mine!" said Ava. The blocks fell down. *Crash!* Teacher Kim said, "What if you *share*?" So Ava built the bottom, and Ben built the top. They *took turns*. The tower grew SO tall! "*Thank you* for sharing," said Ben. "You’re *welcome*," said Ava. Now they are *best friends*.',pics:['block','girl','boy','teacher'],
   acts:[[null,'playroom',['block','girl','boy'],'Mine! Mine!'],['Crash','playroom',['block','teacher'],'Crash!'],['took turns','playroom',['block:big','girl','boy'],'Your turn!'],['best friends','playroom',['heart','girl','boy'],'Best friends!']]},
  boxes:[{title:'Families',text:'All families are different. Some are big, some are small. Families *love* and *care* for each other.',ex:[['family','*family*'],['grandma','grandma'],['baby','baby']],cols:3},
   {title:'Good friends',lines:['*share* toys','*take turns*','say *please* and *thank you*','*help* each other']}],
  cards:[{q:'Your friend is sad. What can you do?',a:'give a *hug* or ask “Are you OK?”'},{q:'What do you say when you get a gift?',pics:['gift'],a:'*thank you*!'}],
  words:[['share','let others use something too'],['take turns','one person, then the other']]},
 steps:[
  {say:'Read the story',speech:'Ava and Ben both wanted the blocks, and the tower fell. Then they shared and took turns, and built a tall tower together.',set:S.row(['block','girl','boy','teacher'])},
  {say:'Build together',speech:'Take turns and tap the blocks to build the tower. One for Ava, one for Ben!',set:S.count('block',6,{say:'What a tall tower!'})},
  {say:'Kind or not kind?',speech:'Tap the kind things: sharing, helping and hugging.',set:S.tap(['*heart','*gift','*hand'],{layout:'row'})}],
 more:{title:'Kindness jar',text:'Put a pom-pom in a jar every time someone in your family is kind. When it’s full, have a family party!',pics:['jar','heart']},
 rounds:[R.one('Your friend wants a turn. What do you do?','hand',['angry face','trash']),R.one('Someone gives you a gift. You say…','heart',['angry face','sad face']),
  R.one('Your friend fell down. You…','hand',['ball','tv']),R.tap('Tap the *kind* things.',['*heart','*gift','*hand','angry face']),R.one('Which picture shows a *family*?','family',['car','tree']),
  R.one('How do friends feel when they share?','happy face',['angry face','sad face']),R.feed('Share the cookies: give *2* to your friend.','boy',['*cookie','*cookie','cookie','cookie'],{need:2,count:true}),R.one('Which face shows a *kind* friend?','happy face',['angry face','scared face'])],
 tries:[['Do one kind thing today.','help set the table!'],['Draw your family.','everyone counts!']]});

/* 24 ─ Helpers and safety */
U({id:'k24',title:'Helpers and staying safe',strand:'Me and My Community',codes:[BC,SR],
 guide:{goal:'Name community helpers (firefighter, police officer, doctor, teacher, crossing guard) and simple safety rules: hold hands to cross, stop at red, wear a helmet, never touch hot things.',words:'helper, firefighter, police, doctor, safe, stop, crosswalk, helmet',ask:['Who helps when there is a fire?','What does a red light mean?','Why do we wear a helmet?'],home:'Practise crossing the street: stop, look left and right, listen, hold hands.'},
 watch:['Stop, look, listen!','Helpers keep us safe. Red means stop, green means go.'],
 fig:'Community helpers on a town street.',
 page:{story:{title:'Safety Street',text:'On *Safety Street*, Officer Lee helped children *cross* the road. "*Stop*, look, listen!" The traffic light turned *red*: cars stopped. *Green*: go! Firefighter Fatima showed her shiny *fire truck*. "Never touch *hot* things!" Doctor Dan gave Owen a *check-up*. "Wear your *helmet* when you ride your bike!" Owen waved: "*Thank you*, helpers!"',pics:['police car','fire truck','doctor','traffic light'],
   acts:[[null,'town',['traffic light','boy'],'Stop, look, listen!'],['fire truck','town',['fire truck:big'],'Never touch hot things!'],['check-up','town',['doctor','boy'],'Say ahh!'],['helmet','park',['bicycle','helmet'],'Safety first!']]},
  boxes:[{title:'Helpers',ex:[['firefighter','*firefighter*'],['police car','*police*'],['doctor','*doctor*'],['teacher','*teacher*']],cols:4},
   {title:'Safety rules',ex:[['traffic light','red = *stop*'],['helmet','wear a *helmet*'],['fire','hot! *don’t touch*']],cols:3}],
  cards:[{q:'Who puts out fires?',pics:['fire truck'],a:'a *firefighter*'},{q:'What does a green light mean?',pics:['traffic light'],a:'*go*!'}],
  words:[['helper','a person whose job is to help us'],['safe','not in danger']]},
 steps:[
  {say:'Read the story',speech:'Officer Lee helped children cross. Red means stop and green means go. Firefighter Fatima and Doctor Dan helped too. Wear your helmet!',set:S.row(['police car','fire truck','doctor','traffic light'])},
  {say:'Meet the helpers',speech:'Tap each helper. Firefighter. Police officer. Doctor. Teacher.',set:S.look(['firefighter','police car','doctor','teacher'])},
  {say:'Be safe',speech:'Tap the safe things: a helmet, a seatbelt car seat, and holding hands. Not the hot fire!',set:S.tap(['*helmet','*hand','*traffic light','fire'],{layout:'row'})}],
 more:{title:'9-1-1',text:'In an emergency, a grown-up calls *9-1-1* for help. Helpers will come fast!',pics:['phone','ambulance']},
 rounds:[R.one('Who puts out *fires*?','firefighter',['doctor','teacher']),R.one('Who helps when you are *sick*?','doctor',['firefighter','farmer']),R.one('Who helps you *learn*?','teacher',['police car','fire truck']),
  R.one('What do you wear when you ride a *bike*?','helmet',['sandal','crown']),R.one('Which is *not* safe to touch?','fire',['teddy','ball']),R.tap('Tap the *helpers*.',['*firefighter','*doctor','*teacher','tree']),
  R.one('Which vehicle helps sick people?','ambulance',['school bus','tractor']),R.one('Which helper drives a *fire truck*?','firefighter',['doctor','teacher'])],
 tries:[['Practise: stop, look, listen.','before crossing'],['Thank a helper you know!','draw them a picture']]});

/* 25 ─ Colours and music */
U({id:'k25',title:'Colours and music',strand:'Art and Music',codes:[PS,SR],
 guide:{goal:'Name colours, mix primary colours to make new ones, and explore music: loud and soft, fast and slow.',words:'red, yellow, blue, orange, green, purple, mix, loud, soft, fast, slow',ask:['What do red and yellow make?','Can you sing softly?','Is a turtle fast or slow?'],home:'Finger paint! Mix two colours and name the new one.'},
 watch:['Mix it up!','Red and yellow make orange. Yellow and blue make green. Blue and red make purple.'],
 fig:'Paint pots mixing into new colours.',
 page:{story:{title:'Painting with Penguin',text:'*Penguin* only had three paints: *red*, *yellow* and *blue*. "I want to paint a *green* frog!" he said. Owl laughed. "*Mix* yellow and blue!" Swish, swish… *green*! Then Penguin mixed red and yellow: *orange*, for a pumpkin! Then blue and red: *purple*, for grapes! Penguin was so happy, he played the drums: *loud*, *soft*, *fast*, *slow*! *Boom, boom, tap, tap!*',pics:['penguin','paintbrush','frog','drum'],
   acts:[[null,'playroom',['penguin','paintbrush'],'Only three paints?'],['green','playroom',['frog','penguin'],'Green!'],['orange','playroom',['pumpkin','grapes'],'Orange and purple!'],['drums','playroom',['drum','penguin'],'Boom, boom, tap!']]},
  boxes:[{title:'Mix colours',lines:['*red* + *yellow* = *orange*','*yellow* + *blue* = *green*','*blue* + *red* = *purple*']},
   {title:'Music words',ex:[['lion','*loud*'],['mouse','*soft*'],['rabbit','*fast*'],['turtle','*slow*']],cols:4}],
  cards:[{q:'What colour is grass?',pics:['plant'],a:'*green*'},{q:'Is a lion’s roar loud or soft?',pics:['lion'],a:'*loud*!'}],
  words:[['mix','stir together to make something new'],['loud','a big sound, like a drum']]},
 steps:[
  {say:'Read the story',speech:'Penguin mixed yellow and blue to make green, red and yellow to make orange, and blue and red to make purple. Then he played the drums.',set:S.row(['penguin','paintbrush','frog','drum'])},
  {say:'Yellow and blue',speech:'Pour yellow and blue together, and stir. Swish, swish… it turns green!',set:S.mix('#ffd43b','yellow','#4dabf7','blue','#40c057','green','Yellow and blue make green!')},
  {say:'Red and yellow',speech:'Now red and yellow. Swish, swish… orange!',set:S.mix('#ff6b6b','red','#ffd43b','yellow','#ff922b','orange','Red and yellow make orange!')},
  {say:'Loud and soft',speech:'Tap the lion: roar! That is loud. Tap the mouse: squeak. That is soft.',set:S.look(['lion','mouse','rabbit','turtle'])}],
 more:{title:'Kitchen band',text:'Make music with pots and spoons! Play *loud*, then *soft*. *Fast*, then *slow*.',pics:['drum','spoon']},
 rounds:[R.pop('Pop the *green* balloons!',['*balloon::#5cc46a:green','*balloon::#5cc46a:green','balloon::#ff6b6b:red','balloon::#4fb3ff:blue','balloon::#ffd43b:yellow']),
  R.pop('Pop the *purple* balloons!',['*balloon::#b07cff:purple','*balloon::#b07cff:purple','balloon::#ffa94d:orange','balloon::#5cc46a:green']),
  R.tap('Red and yellow make… tap the paint!',['*paint:#ff922b:orange','paint:#40c057:green','paint:#845ef7:purple']),R.tap('Yellow and blue make… tap the paint!',['*paint:#40c057:green','paint:#ff922b:orange','paint:#ff6b6b:red']),
  R.one('Which one is *loud*?','lion',['mouse','butterfly']),R.one('Which one is *slow*?','turtle',['rabbit','car']),R.one('Which one is *fast*?','rabbit',['turtle','snail']),R.one('Which one is *red*?','apple',['banana','leaf'])],
 tries:[['Mix 2 colours of playdough.','what colour did you make?'],['Sing a song softly, then loudly!','twinkle, twinkle']]});
})();
