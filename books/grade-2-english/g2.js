/* The Interactive Classroom: Grade 2 English — round shorthands on top of the subject kit.
   Every lesson has ten or more practice questions; many are about the lesson's story or its bonus story. */
(function(){
"use strict";
const P=window.PM;if(!P||!P.R)return;const R=P.R,S=P.S;
/* a word with a missing chunk (a blend, a digraph, a vowel team…): tap the right chunk */
R.chunk=(q,pic,word,chunk,opts,o)=>{const i=word.indexOf(chunk);const parts=[];if(i>0)parts.push(word.slice(0,i));parts.push('_');if(i+chunk.length<word.length)parts.push(word.slice(i+chunk.length));
  return Object.assign({q,set:{fill:parts,pic,opts,ans:chunk,doneMsg:word}},o||{});};
S.chunk=(pic,word,chunk,opts)=>R.chunk('',pic,word,chunk,opts).set;
/* a question answered with the big dock buttons (a thinking kid and the things it is about stand on the page) */
R.q=(q,opts,ans,o)=>Object.assign({q,set:{},o:opts,ans},o||{});
/* true or false about the story */
R.tf=(q,yes,o)=>Object.assign({q:q+' *True or false?*',set:{},o:['True','False'],ans:yes?'True':'False'},o||{});
/* choose the word that fits the sentence (blocks on the page) */
R.word=(q,before,after,opts,ans,o)=>{const parts=[].concat(before?before.split(' '):[], ['_'], after?after.split(' '):[]).filter(x=>x!=='');return R.fillw(q,parts,opts,ans,o);};
S.word=(before,after,opts,ans,o)=>R.word('',before,after,opts,ans,o).set;
})();
