// ------------------------------------------
// jQuery
// ------------------------------------------
$(document).ready(function() {

  var popCount = 0;

  $("button").click(function() {
    console.log("Your popularity is " + popCount++);
  });

});

var bucketArray = [];

function refreshBucket() {
  var bucketContent = '';

  for(var i = 0; i < bucketArray.length; i++) {
    
    bucketContent += '<div>' + bucketArray[i] + '</div><br>';
  }

  $(".bucket").html(bucketContent);
}

function onDragStart(ev) {
  ev.dataTransfer.setData("article_id",ev.target.id);
}

function allowDrop(ev) {
  ev.preventDefault();
}

function drop(ev) {
  ev.preventDefault();
  var id = ev.dataTransfer.getData("article_id");
  // console.log(id);
  // console.log($("#" + id)[0]);
  // console.log(ev.target);
  bucketArray.push(id);
  refreshBucket();
  // ev.target.appendChild(document.getElementById(data));
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

