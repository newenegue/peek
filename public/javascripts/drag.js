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

  if(bucketArray.length == 0) {
    bucketContent += '<div class="bucket_item_holder"><strong>Drag to add article</strong></div>';
  }
  else {
    bucketContent += updateItemsInBucket();
    // Loop through new bucket array and add content
  }

  return bucketContent;
}

// ------------------------------------------
// Update items of bucket
// ------------------------------------------
function updateItemsInBucket() {
  var title, thumbnail, article_id, items;
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

// ------------------------------------------
// Drag and Drop handlers
// ------------------------------------------
// ------------------------------------------
// onDragStart()
//  pass article id to bucket
// ------------------------------------------
function onDragStart(ev) {
  // track article id
  var article_id = $(ev.target).children()[0].id;
  ev.dataTransfer.setData("article_id",article_id);
}

// ------------------------------------------
// allowDrop()
//  when article is hovering over bucket
// ------------------------------------------
function allowDrop(ev) {
  ev.preventDefault();
  $(".bucket_container").addClass("bucket_selected");
  // $(".bucket_container:before").addClass("bucket_selected:before");

  // REFACTOR THIS
  var happyEyes = document.getElementById("happy");
  happyEyes.style.opacity = "1";

  var openEyes = document.getElementById("openEyes");
  openEyes.style.opacity = "0";

  var closedEyes = document.getElementById("closedEyes");
  closedEyes.style.opacity = "0";
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

    // REFACTOR THIS
    var happyEyes = document.getElementById("happy");
    happyEyes.style.opacity = "0";

    var openEyes = document.getElementById("openEyes");
    openEyes.style.opacity = "1";

    var closedEyes = document.getElementById("closedEyes");
    closedEyes.style.opacity = "1";

    // // Increase popularity of ID HERE ****************
    // // Notify database to increase popularity of article with article_id
    
    refreshBucket();
  }
  else {
    console.log("article is already in bucket");
  }
  $(".bucket_container").removeClass("bucket_selected");

}

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
  // Adjust DOM, make article not draggable and gray out
  $("#" + id).parent().addClass("article_in_bucket");
  $("#" + id).attr({"draggable": false });
  return true;
}

// ------------------------------------------
// Remove article from bucket
// ------------------------------------------
function removeItemFromBucket(id) {
  // Find article and remove it from bucketArray
  var index = bucketArray.indexOf(id);
  bucketArray.splice(index,1);
  // Adjust DOM, make article draggable
  $("#" + id).parent().removeClass("article_in_bucket");
  $("#" + id).attr({"draggable": true });
  return true;
}

// ------------------------------------------
// onLeave()
//  toggles for when article is outside bucket
// ------------------------------------------
function onLeave() {
  $(".bucket_container").removeClass("bucket_selected");

  // REFACTOR THIS
  var happyEyes = document.getElementById("happy");
  happyEyes.style.opacity = "0";

  var openEyes = document.getElementById("openEyes");
  openEyes.style.opacity = "1";

  var closedEyes = document.getElementById("closedEyes");
  closedEyes.style.opacity = "1";
}