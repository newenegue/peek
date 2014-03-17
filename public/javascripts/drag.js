// ------------------------------------------
// Updating bucket list
// ------------------------------------------
// Refresh the bucket without refreshing the entire page
function refreshBucket() {
  // Reinitialize bucket content
  var bucketContent = '';

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
    handle: '.handle'
  });
}

// ------------------------------------------
// Drag and Drop handlers
// ------------------------------------------
function onDragStart(ev) {
  // track article id
  ev.dataTransfer.setData("article_id",ev.target.id);
}

function allowDrop(ev) {
  ev.preventDefault();
}

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

    // // Increase popularity of ID HERE ****************
    // // Notify database to increase popularity of article with article_id
    
    refreshBucket();
  }
  else {
    console.log("article is already in bucket");
  }
}