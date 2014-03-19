// ===========================================================
// Update bucket functions
// ===========================================================
// Global bucketArray
var bucketArray = [];
// ------------------------------------------
// Refresh bucket list
// ------------------------------------------
function refreshBucket() {
  var bucketContent = updateBucketContent();

  // Inject html with new bucket content
  $(".bucket").html(bucketContent);

  // Make new list sortable
  $('.bucket').sortable({
    handle: '.handle',
    forcePlaceholderSize: true,
    items: ':not(.bucket_name)'
  });
}

// ------------------------------------------
// Update bucket content
// ------------------------------------------
function updateBucketContent() {
  var bucketContent = '<h4 class="bucket_name">BUCKET</h4>';

  bucketContent += bucketArray.length === 0 ? '<div class="bucket_item_holder"><strong>Drag to add article</strong></div>' : updateItemsInBucket();

  return bucketContent;
}

// ------------------------------------------
// Update items of bucket
// ------------------------------------------
function updateItemsInBucket() {
  var title, thumbnail, article_id, items="";

  for(var i = 0; i < bucketArray.length; i++) {

    // Set local variables
    article_id = bucketArray[i];
    title = $("#" + bucketArray[i] + " .title b")[0].innerHTML;
    thumbnail = $("#" + bucketArray[i] +" img").first().data("thumb");
    if(thumbnail === null || thumbnail === '') {
      thumbnail = $("#" + bucketArray[i] +" img").first().attr("src");
    }

    // Inject HTML to update bucket
    items += '<div class="bucket_item" data-id="' + article_id + '">';
    if(thumbnail){
      items += '<img class="thumb" src="'+ thumbnail +'" height="50">';
    }
    items += '<div>' + title + '</div>';
    items += '<button class="read btn btn-default" ng-click="clickRead()">Read</button>';
    items += '<div class="handle glyphicon glyphicon-align-justify"></div>';
    items += '</div>';
  }
  
  return items;
}

// ===========================================================
// Drag and Drop functions
// ===========================================================
// ------------------------------------------
// onDragStart()
//  pass article id to bucket
// ------------------------------------------
function onDragStart(ev) {
  var article_id = $(ev.target).children()[0].id;
  ev.dataTransfer.setData("article_id",article_id);
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


// ===========================================================
// Bucket control functions
// ===========================================================
// ------------------------------------------
// Check that article id is valid
// ------------------------------------------
function validId(id) {
  return (bucketArray.indexOf(id) == -1 && id != '') ? true : false;
}

// ------------------------------------------
// Add article to bucket
// ------------------------------------------
function addItemToBucket(id) {
  bucketArray.push(id);
  $("#" + id).parent().addClass("article_in_bucket");
  return true;
}

// ------------------------------------------
// Remove article from bucket
// ------------------------------------------
function removeItemFromBucket(id) {
  // Find article and remove it from bucketArray
  var index = bucketArray.indexOf(id);
  bucketArray.splice(index,1);
  $("#" + id).parent().removeClass("article_in_bucket");
  return true;
}