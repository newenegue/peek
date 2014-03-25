// ===========================================================
// Intro Animation
// ===========================================================

var animation = function() {

// ------------------------------------------
// Create Timeline for Animation to Run On
// ------------------------------------------
  
  //Create Timeline Instance
  var tl = new TimelineLite(),
    bothStaticRectangles = document.getElementsByClassName("staticRectangles"),
    staticArticle = document.getElementById("staticArticle"),
    staticArticle2 = document.getElementById("staticArticle2"),
    selectedRectang = document.getElementById("movingRect"),
    pointer = document.getElementById("pointer"),
    speechbubble = document.getElementById("speechbubble"),
    pointer2 = document.getElementById("pointer2"),
    introBucketStage = document.getElementById("introBucketStage"),
    openEyesIntro = document.getElementById("openEyesIntro"),
    introLeftEyeFull = document.getElementById("leftEyeFullIntro"),
    introRightEyeFull = document.getElementById("rightEyeFullIntro"),
    shot2 = document.getElementById("shot2"),
    enterButton = document.getElementsByClassName("closeIntroButton");
// ------------------------------------------
// Append action to Static Rectangles
// ------------------------------------------

  tl.from(staticArticle, .5, {scale:0, autoAlpha:0}, "+=.1");
  tl.from(selectedRectang, .5, {scale:0, autoAlpha:0}, "+=.1");
  tl.from(staticArticle2, .5, {scale:0, autoAlpha:0}, "+=.1");
  // tl.to(pointer, .5, {left: "300px", scale:0, autoAlpha:0}, "+=.5");

  //Figure out how to fade in and move to the left to select article
  tl.from(pointer, 1, {right:-400, autoAlpha:0}, "+=.5");
  
  //Select Rectangle
  tl.to(selectedRectang, .5, {backgroundColor:"red"}, "+=.2"); 

  //Shift Static Rects Diagonally (down/left)
  tl.to(bothStaticRectangles, .5, {right: "100px", top: "50px"}, "+=.1");

  //Drift Static Rects to the Left
  tl.to(bothStaticRectangles, 1.5, {right:"600px", ease:Circ.easeIn}, "+=.3");
  
  //Make Static Rects Fade Away
  tl.to(bothStaticRectangles, 1, {autoAlpha:0}, "-=.5" );

  //Shift Selected Rectangle Back
  tl.to(selectedRectang, 1, {scaleX: 0.7, scaleY: 0.7}, "-=.2");

  //Drop Selected Rectangle
  tl.to(selectedRectang, 1, {top:150, autoAlpha:0}, "+=1");

  //Bucket Appears
  tl.from(introBucketStage, .5, {bottom:-200, autoAlpha:0}, "-=1.5");

  tl.to(openEyesIntro, .1, {autoAlpha:0, overwrite: 2}, "+=.2");

  // tl.to(openEyesIntro, .1, {autoAlpha:0}, "+=.2");
  console.log(openEyesIntro);


  //Speech Bubble
  tl.from(speechbubble, 1, {bottom:-100, scaleY: 0, autoAlpha:0}, "+=1");
  tl.from(pointer2, 1, {left:-100, autoAlpha:0}, "+=.5");

  //Switch to Second Shot
  tl.from(shot2, .5, {autoAlpha:0}, "+=.5");
  console.log(introTextContent.innerHTML);
  tl.set(shot2, {top:0, onComplete: introTextContent}, "-=.5");
  tl.set(shot2, {top:0, onComplete: introTextContent2}, "+=.5");
  tl.set(shot2, {top:0, onComplete: introTextContent3}, "+=.5");
  tl.set(shot2, {top:0, onComplete: introTextContent4}, "+=.8");
  tl.set(shot2, {top:0, onComplete: introTextContent5}, "+=.5");
  tl.set(shot2, {top:0, onComplete: introTextContent6}, "+=.5");
  
  //Switch to Third Shot
  tl.set(shot3, {top:0}, "+=1");

  //Enter Button Appears
  tl.from(enterButton, .5, {autoAlpha: 0}, "+=1");
  tl.restart();

  //TO DO: Time bucket so that it becomes happy the exact fraction of a second that the article is dropped into it. Similar to blinking, but only 1x at the precise time instead of every 4 seconds x infinitely



  function introTextContent() {
    var introFront = document.getElementById("introFront");
    var introCenter = document.getElementById("introCenter");
    var introBack = document.getElementById("introBack");

    introFront.innerHTML = "Wel";
    introCenter.innerHTML = "c";
    introBack.innerHTML = "ome";

    
  };

  function introTextContent2() {
    var introFront = document.getElementById("introFront");
    var introCenter = document.getElementById("introCenter");
    var introBack = document.getElementById("introBack");

    introFront.innerHTML = "";
    introCenter.innerHTML = "t";
    introBack.innerHTML = "o"; 
  };

  function introTextContent3() {
    var introFront = document.getElementById("introFront");
    var introCenter = document.getElementById("introCenter");
    var introBack = document.getElementById("introBack");

    introFront.innerHTML = "Pe";
    introCenter.innerHTML = "e";
    introBack.innerHTML = "k."; 
  };

  function introTextContent4() {
    var introFront = document.getElementById("introFront");
    var introCenter = document.getElementById("introCenter");
    var introBack = document.getElementById("introBack");

    introFront.innerHTML = "Re";
    introCenter.innerHTML = "a";
    introBack.innerHTML = "dy"; 
  };

    function introTextContent5() {
    var introFront = document.getElementById("introFront");
    var introCenter = document.getElementById("introCenter");
    var introBack = document.getElementById("introBack");

    introFront.innerHTML = "S";
    introCenter.innerHTML = "e";
    introBack.innerHTML = "t"; 
  };

  function introTextContent6() {
    var introFront = document.getElementById("introFront");
    var introCenter = document.getElementById("introCenter");
    var introBack = document.getElementById("introBack");

    introFront.innerHTML = "G";
    introCenter.innerHTML = "o";
    introBack.innerHTML = "!"; 
  };


};
