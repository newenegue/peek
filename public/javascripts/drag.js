// ===========================================================
// Drag and Drop functions
// ===========================================================
// ------------------------------------------
// onDragStart()
//  pass article id to bucket
// ------------------------------------------
function onDragStart(ev) {
  var article = $(ev.target).children()[0];

  ev.dataTransfer.setData("article_id",article.id);

  // Use article main image for drag image
  var dragImage = $(article).children(".main_image")[0];
  ev.dataTransfer.setDragImage(dragImage, 180, 10);
  
  dropFace("");
}

// ------------------------------------------
// allowDrop()
//  when article is hovering over bucket
// ------------------------------------------
function allowDrop(ev) {
  ev.preventDefault();
  bucketFace('excited', '1');
}

// ------------------------------------------
// drop()
//  when article is dropped into bucket
// ------------------------------------------
function drop(ev) {
  ev.preventDefault();
  var article_id = ev.dataTransfer.getData("article_id");
  // var dragIcon;
  // ev.dataTransfer.setDragImage(dragIcon, 10, 10);
  // Add to bucket
  if(validId(article_id)) {
    addItemToBucket(article_id);
    console.log("heart animation");
    var heart = document.getElementById("heart");
    heart.style.opacity = "1";
    $(heart).fadeTo("slow", 0.0, function(){

    });

    dropFace("animated bounce");

    // // Increase popularity of ID HERE ****************
    // // Notify database to increase popularity of article with article_id
    
    refreshBucket();
  }
  else {
    console.log("article is already in bucket");
  }
  bucketFace('default_eyes', '0');

}

// ------------------------------------------
// onLeave()
//  toggles for when article is outside bucket
// ------------------------------------------
function onLeave() {
  bucketFace('default_eyes', '0');
}

// ===========================================================
// Bucket animations
// ===========================================================


// ------------------------------------------
// Change bucket face
// ------------------------------------------
function bucketFace(face, opc) {
  // controls scale of eyes depending on mood
  $("#leftEyeFull").attr("class", face);
  $("#rightEyeFull").attr("class", face);
  // controls mouth depending on mood
  document.getElementById("grin").style.opacity = opc;

  if(opc == "0"){
    // removes bucket container outer glow
    $(".bucket_container").removeClass("bucket_selected");
  }
  else {
    // adds bucket container outer glow
    $(".bucket_container").addClass("bucket_selected");
  }
}

// ------------------------------------------
// Reset drop animation
// ------------------------------------------
function dropFace(face) {
  $("#Layer_1").attr("class", face);
}