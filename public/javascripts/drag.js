// ------------------------------------------
// Updating bucket list
// ------------------------------------------
// Refresh the bucket without refreshing the entire page
function refreshBucket() {
  // Reinitialize bucket content
  var bucketContent = '<h4 class="bucket_name">BUCKET</h4>';

  // Loop through new bucket array and add content
  for(var i = 0; i < bucketArray.length; i++) {
    // console.log($("#" + bucketArray[i])[0]);
    bucketContent += '<div class="bucket_item" data-id="' + bucketArray[i] + '">';
    bucketContent += '<div>' + $("#" + bucketArray[i] + " .title b")[0].innerHTML + '</div>';
    bucketContent += '<button class="read btn btn-default" ng-click="makePopular()">Read</button>';
    bucketContent += '<div class="handle glyphicon glyphicon-align-justify"></div>';
    bucketContent += '</div>';
  }

  // Inject html with new bucket content
  $(".bucket").html(bucketContent);

  $('.bucket').sortable({
    handle: '.handle',
    forcePlaceholderSize: true,
    items: ':not(.bucket_name)'
  });
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
  ev.dataTransfer.setData("article_id",ev.target.id);
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
  if(bucketArray.indexOf(article_id) == -1){
    bucketArray.push(article_id);
    // Adjust DOM, make article not draggable and gray out
    $("#" + article_id).parent().addClass("article_in_bucket");
    $("#" + article_id).attr({"draggable": false });
    // add heart animation to bucket
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