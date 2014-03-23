// ===========================================================
// Intro Animation
// ===========================================================

$(document).ready(function(){

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
    //bezier
    quantity = 30,
    duration = 3,
    path = [{x:0, y:0}, {x:50, y:100}, {x:300, y:20}, {x:400, y:200}, {x:500, y:0}],
    position = {x:path[0].x, y:[path[0].y]},
    tween = TweenMax.to(position, quantity, {bezier:path, ease: Linear.easeNone}),
    tl2 = new TimelineMax({repeat:-1, yoyo:true}),
    i, dot;

// ------------------------------------------
// Bezier test
// ------------------------------------------
path.shift();

    for (i = 0; i < quantity; i++) {
      tween.time(i); //jumps to the appropriate time in the tween, causing position.x and position.y to be updated accordingly.
      dot = $("<div />", {id:"dot"+i}).addClass("dot").css({left:position.x+"px", top:position.y+"px"}).appendTo(".intro_animation"); //create a new dot, add the .dot class, set the position, and add it to the body.
      tl2.set(dot, {visibility:"visible"}, i * (duration / quantity)); //toggle the visibility on at the appropriate time.
    }

// ------------------------------------------
// Append action to Static Rectangles
// ------------------------------------------

  //Shift Static Rects Diagonally (down/left)
  tl.to(bothStaticRectangles, .5, {right: "100px", top: "50px"}, "+=1.2");

  //Drift Static Rects to the Left
  tl.to(bothStaticRectangles, 2, {right:"600px", ease:Circ.easeIn}, "+=.3");
  
  //Make Static Rects Fade Away
  tl.to(bothStaticRectangles, 1, {autoAlpha:0}, "-=1.5" );

// ------------------------------------------
// Append action to Selected Rectangle
// ------------------------------------------

  // GSAP moving rec
  var selectedRectang = document.getElementById("movingRect");
  TweenLite.to(selectedRectang, .5, {backgroundColor:"red", delay: 1});
  TweenLite.to(selectedRectang, 1, {scaleX: 0.6, scaleY: 0.6, delay: 3});
  TweenLite.to(selectedRectang,.5, {top:150, autoAlpha:0, delay: 5.5});

  var enterButton = document.getElementsByClassName("closeIntroButton");
  TweenLite.from(enterButton,.5, {autoAlpha:0, delay: 5.5});

});
