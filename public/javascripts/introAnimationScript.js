$(document).ready(function(){


  // GSAP static rec 1
  var nullRectang = document.getElementById("staticArticle");
  TweenLite.to(nullRectang,.5, {right:"100px", top:"50px", delay: 1.2});
  TweenLite.to(nullRectang,2, {right:"600px", ease:Circ.easeIn, delay: 2});
  TweenLite.to(nullRectang, 1, {autoAlpha:0, delay:2.5});

    // GSAP static rec 2
  var nullRectang2 = document.getElementById("staticArticle2");
  TweenLite.to(nullRectang2,.5, {right:"100px", top:"50px", delay: 1.2});
  TweenLite.to(nullRectang2,2, {right:"600px", ease:Circ.easeIn, delay: 2});
  TweenLite.to(nullRectang2, 1, {autoAlpha:0, delay:2.5});

  // GSAP static rec 2
  // var bucketAppear = document.getElementById("bucketYo");
  // TweenLite.from(bucketAppear,.2, {autoAlpha:0, delay: 4.5});
  // TweenLite.from(bucketAppear,2.5, {width:700, top:"100px", delay:4});
  // TweenLite.to(bucketAppear,1, {autoAlpha:0, delay: 6.5});

   // GSAP moving rec
  var selectedRectang = document.getElementById("movingRect");
  TweenLite.to(selectedRectang, .5, {backgroundColor:"red", delay: 1});
  TweenLite.to(selectedRectang, 1, {scaleX: 0.6, scaleY: 0.6, delay: 3});
  // TweenLite.to(selectedRectang,.5, {left:"100px", bottom:"50px"});
  // TweenLite.to(selectedRectang,1, {left:"10px", ease:Circ.easeOut});
  TweenLite.to(selectedRectang,.5, {top:150, autoAlpha:0, delay: 5.5});

  // var pointerAnim = document.getElementById("pointer");
  // TweenLite.from(pointerAnim, .5, {autoAlpha:0, delay: .5});


});
