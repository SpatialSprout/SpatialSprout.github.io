/* The Interactive Classroom: Junior Kindergarten — Section 3: Shapes and colours */
(function(){
"use strict";
const P=window.PM;if(!P||!P.unit||!P.PK)return;const U=P.unit,R=P.R,S=P.S;const {shuffle}=P.PK;
const C={red:'#ff6b6b',blue:'#4fb3ff',green:'#5cc46a',yellow:'#ffd43b',orange:'#ffa94d',purple:'#b07cff',pink:'#ff8fc7'};
const sh=(k,c,ok)=>(ok?'*':'')+'shape:'+k+':'+(C[c]||c)+':'+k;
const SH=[{k:'circle',c:'red',pic:'circle',things:['ball','clock','donut'],not:['book','gift','pizza'],line:'A *circle* is round. No corners!',say:'round and round, a circle has no corners'},
 {k:'square',c:'blue',pic:'square',things:['gift','block','box'],not:['ball','pizza','donut'],line:'A *square* has *4* sides, all the same.',say:'a square has four sides, all the same'},
 {k:'triangle',c:'green',pic:'triangle',things:['pizza','tent','pyramid'],not:['ball','clock','box'],line:'A *triangle* has *3* sides and *3* corners.',say:'a triangle has three sides and three corners'},
 {k:'rectangle',c:'orange',pic:'rectangle',things:['book','door','bus'],not:['ball','donut','pizza'],line:'A *rectangle* has *2* long sides and *2* short sides.',say:'a rectangle has two long sides and two short sides'}];
SH.forEach((s,i)=>{const others=['circle','square','triangle','rectangle','star','heart'].filter(x=>x!==s.k);const oc=['blue','green','yellow','purple','pink','orange'];
  U({id:'s'+s.k,title:'The '+s.k,strand:'Shapes and Colours',codes:['Literacy & Math','Problem Solving'],
    guide:{goal:'Know the '+s.k+': name it, find it in toys and things around them, and tell it apart from other shapes.',words:s.k+', sides, corners',ask:['What shape is this?','Where do you see a '+s.k+'?','How many corners?'],home:'Go on a '+s.k+' hunt around the house!'},
    watch:['A '+s.k+'!',s.say+'.'],fig:'A big 3D '+s.k+' and things shaped like it.',
    kid:{big:'',pic:s.pic,line:s.line,words:s.things.map(t=>[t,t])},page:{},
    steps:[{say:'Meet the '+s.k,speech:'This is a '+s.k+'. '+s.say+'. Tap it!',set:S.tap([sh(s.k,s.c)+'@2'],{layout:'row',free:true})},
      {say:'Find '+s.k+'s',speech:'These things are shaped like a '+s.k+': '+s.things.join(', ')+'. Tap each one!',set:S.tap(s.things,{layout:'row',free:true})},
      {say:'Pop the '+s.k+'s',speech:'Pop every bubble with a '+s.k+' inside!',set:{custom:'bubbles',items:[sh(s.k,s.c,1),sh(s.k,'purple',1),sh(others[0],oc[0]),sh(s.k,'pink',1),sh(others[1],oc[1]),sh(others[2],oc[2])]}}],
    rounds:[R.bub('Pop the bubbles with a *'+s.k+'*!',[sh(s.k,s.c,1),sh(s.k,'yellow',1),sh(s.k,'pink',1),sh(others[0],oc[0]),sh(others[1],oc[1]),sh(others[2],oc[2])]),
      R.tap('Tap every *'+s.k+'*.',[sh(s.k,s.c,1),sh(s.k,'purple',1),sh(others[0],oc[0]),sh(others[1],oc[1])]),
      R.feed('Put the things shaped like a *'+s.k+'* in the basket.','basket',s.things.map(t=>'*'+t).concat(s.not)),
      R.web('Help the spider catch the *'+s.k+'s*!',[sh(s.k,s.c,1),sh(s.k,'yellow',1),sh(s.k,'green',1),sh(others[0],oc[0]),sh(others[1],oc[1]),sh(others[3],oc[3])]),
      R.mem('Find the pairs: a shape and a thing shaped like it.',[[sh('circle','red'),'ball'],[sh('triangle','green'),'pizza'],[sh('square','blue'),'gift']]),
      R.dig('Dig in the sand! Find the *'+s.k+'s*.',[sh(s.k,s.c,1),sh(s.k,'pink',1),sh(others[0],oc[0]),sh(others[1],oc[1]),sh(others[2],oc[2]),sh(others[3],oc[3])]),
      R.gap('What comes next?',[sh(s.k,s.c),sh(others[0],oc[0]),sh(s.k,s.c),sh(others[0],oc[0]),'?'],[sh(s.k,s.c,1),sh(others[1],oc[1]),sh(others[2],oc[2])],{s:.8}),
      R.one('Which one is shaped like a *'+s.k+'*?',s.things[0],s.not.slice(0,2)),
      R.cups('Watch the cups! Where is the *'+s.k+'* hiding?',sh(s.k,s.c),[sh(others[0],oc[0]),sh(others[1],oc[1])],{level:i%2}),
      R.shadow('Which shape fits the shadow?',[sh(s.k,s.c,1),sh(others[0],oc[0]),sh(others[1],oc[1])],{big:1.5})],
    tries:[['Draw a '+s.k+' in the air with your finger.','slowly!'],['Find 3 '+s.k+'s at home.','e.g. '+s.things.join(', ')]]});});

/* Colours */
U({id:'scolours',title:'Colours',strand:'Shapes and Colours',codes:['Problem Solving'],
  guide:{goal:'Name the colours red, yellow, blue, green, orange and purple, find them in things around them, and see that mixing two colours makes a new one.',words:'red, yellow, blue, green, orange, purple, mix',ask:['What colour is the apple?','What colour is the sky?','What do yellow and blue make?'],home:'Finger paint: mix two colours and name the new one!'},
  watch:['Colours everywhere!','Red apple, yellow sun, blue sky, green leaf.'],fig:'Paint pots mixing new colours.',
  kid:{big:'',pic:'rainbow',line:'*red*, *orange*, *yellow*, *green*, *blue*, *purple*!',words:[['apple','red'],['sun','yellow'],['leaf','green']]},page:{},
  steps:[{say:'Colour friends',speech:'Red like an apple. Yellow like the sun. Green like a leaf. Blue like the sea. Tap each one!',set:S.tap(['apple','sun','leaf','whale'],{layout:'row',free:true})},
    {say:'Yellow and blue',speech:'Pour yellow and blue together and stir. Swish, swish… green!',set:S.mix('#ffd43b','yellow','#4dabf7','blue','#40c057','green','Yellow and blue make green!')},
    {say:'Red and yellow',speech:'Now red and yellow. Swish, swish… orange!',set:S.mix('#ff6b6b','red','#ffd43b','yellow','#ff922b','orange','Red and yellow make orange!')}],
  rounds:[R.bub('Pop the *red* bubbles!',['*balloon::#ff6b6b:red','*balloon::#ff6b6b:red','*apple','balloon::#4fb3ff:blue','balloon::#ffd43b:yellow','leaf']),
    (R.rocket?R.rocket('Which rocket carries the *blue* paint? Tap it for blast off!',['*paint:#4fb3ff:blue','paint:#ff6b6b:red','paint:#ffd43b:yellow']):R.pop('Pop the *blue* balloons!',['*balloon::#4fb3ff:blue','*balloon::#4fb3ff:blue','balloon::#ff6b6b:red','balloon::#5cc46a:green','balloon::#ffd43b:yellow'])),
    R.feed('Put the *yellow* things in the basket.','basket',['*banana','*sun','*star','apple','leaf','whale']),
    R.one('What colour is a *leaf*? Tap the green paint.','paint:#40c057:green',['paint:#ff6b6b:red','paint:#4dabf7:blue']),
    R.tap('Red and yellow make… tap the paint!',['*paint:#ff922b:orange','paint:#40c057:green','paint:#845ef7:purple']),
    R.tap('Yellow and blue make… tap the paint!',['*paint:#40c057:green','paint:#ff922b:orange','paint:#ff6b6b:red']),
    R.mem('Find the pairs: a colour and a thing that colour.',[['paint:#ff6b6b:red','apple'],['paint:#ffd43b:yellow','banana'],['paint:#40c057:green','leaf']]),
    R.web('Help the spider catch the *red* things!',['*apple','*strawberry','*cherries','banana','leaf','whale']),
    R.cups('Watch the cups! Where is the *purple* paint?','paint:#845ef7:purple',['paint:#ff6b6b:red','paint:#4fb3ff:blue']),
    R.peek('Hide and seek! Find all the *green* animals.',['*frog','*turtle','*snake','pig','penguin','flamingo'])],
  tries:[['Find something red, yellow and blue.','look around!'],['Mix two crayons on paper.','what new colour?']]});
})();
