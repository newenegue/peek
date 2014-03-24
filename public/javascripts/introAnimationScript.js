// ===========================================================
// Intro Animation
// ===========================================================

window.onload = function(){

// ------------------------------------------
// Set Kinetic Stage for Animation
// ------------------------------------------

  // var stage = new Kinetic.Stage({
  //   container: 'animationContainer',
  //   width: 578,
  //   height: 200 
  // });

// ------------------------------------------
// Create Layer for Static Articles
// ------------------------------------------

  // var staticRectsLayer = new Kinetic.Layer();

// ------------------------------------------
// Set Group for Static Articles
// ------------------------------------------

  // var staticRectsGroup = new Kinetic.Group({
  //   x: 220,
  //   y: 40
  // });

// ------------------------------------------
// Create Static Rectangles
// ------------------------------------------

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
    introBucketStage = document.getElementById("introBucketStage"),
    introBucketEyes = document.getElementById("openEyesIntro"),
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
  
  debugger;
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
  tl.to(introBucketEyes, .2, {autoAlpha:0}, "+=.2");
  // tl.to()

  //Switch to Second Shot
  tl.set(shot2, {top:0}, "+=.5");

  //Switch to Third Shot
  tl.set(shot3, {top:0}, "+=3");

  //Enter Button Appears
  tl.from(enterButton, .5, {autoAlpha: 0}, "+=1");

  //TO DO: Time bucket so that it becomes happy the exact fraction of a second that the article is dropped into it. Similar to blinking, but only 1x at the precise time instead of every 4 seconds x infinitely

};
