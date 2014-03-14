// ------------------------------------------
// jQuery
// ------------------------------------------
$(document).ready(function() {

  var popCount = 0;

  $("button").click(function() {
    console.log("Your popularity is " + (++popCount));
  });

});

// ------------------------------------------
// Updating bucket list
// ------------------------------------------
// Global bucketArray
var bucketArray = [];

// Refresh the bucket without refreshing the entire page
function refreshBucket() {
  // Reinitialize bucket content
  var bucketContent = '';

  // loop through new bucket array and add content
  for(var i = 0; i < bucketArray.length; i++) {
    // console.log($("#" + bucketArray[i])[0]);
    bucketContent += '<div>' + $("#" + bucketArray[i] + " .title b")[0].innerHTML + '</div>';
    bucketContent += '<button ng-click="makePopular()">Read</button>';
    // bucketContent += '<div>' + bucketArray[i] + '</div><br>';
  }

  // inject html with new bucket content
  $(".bucket").html(bucketContent);
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
  var id = ev.dataTransfer.getData("article_id");
  bucketArray.push(id);
  $("#" + id).parent().addClass("article_in_bucket");
  $("#" + id).attr({"draggable": false });
  // Increase popularity of ID HERE ****************
  refreshBucket();
}

// ------------------------------------------
// Create articles for development
// ------------------------------------------
var artArray = [];
for(var i = 0; i < 50; i++){
  artArray.push({
    'title': 'title' + i,
    'id': i,
    'text': 'Of course I peed my pants, everyone my age pees their pants. I ate some Triscuit crackers in the car, you should have had some. Knibb High football rules! This guy can stay in my room, I can tell you that much. I thought I was your snack-pack? When I graduated first grade, all my dad did was tell me to get a job.'
  });
}

// ------------------------------------------
// Angular
// ------------------------------------------
var peekApp = angular.module('PeekApp', []);

peekApp.controller('PeekCtrl', function($scope) {
  $scope.articles = artArray;
  var popularity = 0;

  $scope.makePopular = function() {
    popularity++;
    console.log(popularity);
  };
});

