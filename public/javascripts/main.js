// ------------------------------------------
// jQuery
// ------------------------------------------
$(document).ready(function() {

  var popCount = 0;

  $("button").click(function() {
    console.log("Your popularity is " + popCount++);
  });

});

// ------------------------------------------
// Create articles for development
// ------------------------------------------
var artArray = [];
for(var i = 0; i < 50; i++){
  artArray.push({
    'title': 'title' + i,
    'text': 'Of course I peed my pants, everyone my age pees their pants. I ate some Triscuit crackers in the car, you should have had some. Knibb High football rules! This guy can stay in my room, I can tell you that much. I thought I was your snack-pack? When I graduated first grade, all my dad did was tell me to get a job.'
  });
}

// ------------------------------------------
// Angular
// ------------------------------------------
var peekApp = angular.module('PeekApp', []);

peekApp.controller('PeekCtrl', function($scope, $http) {

  //this pulls in the NPR api 
  $http.get('//api.npr.org/query?apiKey=MDEzMzc4NDYyMDEzOTQ3Nzk4NzVjODY2ZA001&numResults=&requiredAssets=text&format=json')
    .then(function(res){
      //this targets the stories from the NPR JSON list
      $scope.articles = res.data.list.story;                
    });
    
  var popularity = 0;

  $scope.makePopular = function() {
    popularity++;
    console.log(popularity);
  };
});

