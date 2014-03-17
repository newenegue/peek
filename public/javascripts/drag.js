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
    // bucketContent += '<div class="bucket_item" data-id="' + bucketArray[i] + '" draggable="true" ondragstart="dragBucketItem(event)">';
    bucketContent += '<div class="bucket_item" data-id="' + bucketArray[i] + '">';
    bucketContent += '<div>' + $("#" + bucketArray[i] + " .title b")[0].innerHTML + '</div>';
    bucketContent += '<button class="read btn btn-default" ng-click="makePopular()">Read</button>';
    bucketContent += '</div>';
    // bucketContent += '<div>' + bucketArray[i] + '</div><br>';
  }

  // Inject html with new bucket content
  $(".bucket").html(bucketContent);
}

// ------------------------------------------
// Drag and Drop handlers
// ------------------------------------------
function dragBucketItem(ev) {
  // console.log(ev.target.style.opat);
}

function onDragStart(ev) {
  // track article id
  // console.log(ev);
  // console.log(ev.target);
  ev.dataTransfer.setData("article_id",ev.target.id);
  // console.log("drag start: " + ev.target.id);
}

function allowDrop(ev) {
  console.log("ready to drop");
  ev.preventDefault();
}

function drop(ev) {
  ev.preventDefault();
  var article_id = ev.dataTransfer.getData("article_id");
  console.log(ev.target);
  console.log(article_id);
  // Add to bucket
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
  

  // Increase popularity of ID HERE ****************
  // Notify database to increase popularity of article with article_id
  
  refreshBucket();
}