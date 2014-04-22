// ===========================================================
// Intro Animation
// ===========================================================

$(window).load(function(){ 


});

// ===========================================================
// Global Variables
// ===========================================================

// ------------------------------------------
// Create Timeline for Animation to Run On
// ------------------------------------------
  
//Create Timeline Instance
var tl = new TimelineLite(),
  
  newspaper = document.getElementById("newspaper"),
  pointer = document.getElementById("pointer"),
  speechbubble = document.getElementById("speechbubble"),
  pointer2 = document.getElementById("pointer2"),
  introBucketStage = document.getElementById("introBucketStage"),
  regularIntroBucket = document.getElementById("regularIntroBucket"),
  openEyesIntro = document.getElementById("openEyesIntro"),
  introLeftEyeFull = document.getElementById("leftEyeFullIntro"),
  introRightEyeFull = document.getElementById("rightEyeFullIntro"),
  shot2 = document.getElementById("shot2"),
  welcomeText = document.getElementById("welcomeText"),
  openEyesWelcome = document.getElementById("openEyesWelcome"),
  welcomeIntroBucket = document.getElementById("welcomeIntroBucket"),
  enterButton = document.getElementsByClassName("closeIntroButton"),
  intro_animation_screen = document.getElementsByClassName("intro_animation_screen"),
  shot0 = document.getElementById("shot0"),
  shot1 = document.getElementById("shot1"); 

var introFront = document.getElementById("introFront");
var introCenter = document.getElementById("introCenter");
var introBack = document.getElementById("introBack");

// var screenVisibility = $("#shot1").css("visibility", "hidden");

function introTextContent1() {   
  introFront.innerHTML = "Wel";
  introCenter.innerHTML = "c";
  introBack.innerHTML = "ome";
};

function introTextContent2() {

  introFront.innerHTML = "";
  introCenter.innerHTML = "t";
  introBack.innerHTML = "o"; 
};

function introTextContent3() {

  introFront.innerHTML = "P";
  introCenter.innerHTML = "e";
  introBack.innerHTML = "ek."; 
};

function introTextContent4() {

  introFront.innerHTML = "Re";
  introCenter.innerHTML = "a";
  introBack.innerHTML = "dy&nbsp; &nbsp;"; 
};

function introTextContent5() {

  introFront.innerHTML = "S";
  introCenter.innerHTML = "e";
  introBack.innerHTML = "t &nbsp;"; 
};

function introTextContent6() {

  introFront.innerHTML = "G";
  introCenter.innerHTML = "o";
  introBack.innerHTML = "!&nbsp; &nbsp;"; 
};



function animation() {
  $(".intro_animation_screen").css("visibility", "visible");
  $("#shot1").css("visibility", "visible");
  tl.set(shot1, {top:0}, "+=.1");
  tl.from(shot1, .5, {autoAlpha:0}, "+=.5");

  tl.from(newspaper, .5, {scale:0, autoAlpha:0}, "+=.1");

// ------------------------------------------
// Append action to Static Rectangles
// ------------------------------------------

  
  tl.from(pointer, .5, {right:-400, autoAlpha:0}, "+=.5");
  tl.from(newspaper_article, .5, {scale: 0, autoAlpha: 0}, "+=.5");

  tl.to(newspaper, .5, {right: "300px", top: "200px"}, "+=.1");
  tl.to(newspaper, 1, {right:"600px", ease:Circ.easeIn}, "+=.3");
  tl.to(newspaper, .5, {autoAlpha:0}, "-=.5" );

  tl.to(newspaper_article, 1, {scaleX: 0.5, scaleY: 0.5}, "-=.2");
  tl.to(newspaper_article, .5, {top:100, autoAlpha:0}, "+=.5"); 

  //Bucket Appears
  tl.from(regularIntroBucket, .5, {bottom:-200, autoAlpha:0}, "-=1.5");
  tl.set(regularIntroBucket, {css:{backgroundPosition: "-159px -265px"}}, "+=1");
  // tl.to(regularIntroBucket2, .01, {css:{backgroundPosition: "-108px -292px"}}, "+=1");
  tl.to(regularIntroBucket, .5, {bottom:'100px', ease:Circ.easeIn}, "+=.5");


  //Speech Bubble
  tl.from(speechbubble, 1, {bottom:-100, scaleY: 0, autoAlpha:0}, "+=1");
  tl.from(pointer2, 1, {left:-100, autoAlpha:0}, "+=.5");

  //Switch to Second Shot
  tl.from(shot2, .5, {autoAlpha:0}, "+=.5");
  
  tl.set(shot2, {top:0, onComplete: introTextContent1}, "-=.5");
  tl.set(shot2, {top:0, onComplete: introTextContent2}, "+=.2");
  tl.set(shot2, {top:0, onComplete: introTextContent3}, "+=.5");
  tl.set(shot2, {top:0, onComplete: introTextContent4}, "+=1");
  tl.set(shot2, {top:0, onComplete: introTextContent5}, "+=.5");
  tl.set(shot2, {top:0, onComplete: introTextContent6}, "+=.5");
  
  //Switch to Third Shot
  tl.set(shot3, {top:0}, "+=1");
  tl.from(shot3, .5, {bottom:-200, autoAlpha:0}, "+=.5");
  tl.from(welcomeIntroBucket, .5, {top:-200, autoAlpha:0}, "-=1.5");
  // tl.to(welcomeIntroBucket2, .01, {css:{backgroundPosition: "-108px -292px"}}, "+=1");
  tl.set(welcomeIntroBucket, {css:{backgroundPosition: "-159px -265px"}}, "+=1");
  tl.from(welcomeText, .5, {bottom:-100, scaleY: 0, autoAlpha: 0}, "+=.5");

  //Enter Button Appears
  tl.from(enterButton, .5, {autoAlpha: 0}, "+=1");
  tl.to(intro_animation_screen, 1, {autoAlpha: 0}, "+=5");
  tl.set(intro_animation_screen, {css:{visibility: "hidden"}}, "+=.2");
  // tl.restart();

};
