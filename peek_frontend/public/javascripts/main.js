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
// Angular
// ------------------------------------------
var peekApp = angular.module('PeekApp', []);

peekApp.controller('PeekCtrl', function($scope) {
  console.log('Inside PeekCtrl');
  $scope.articles = [];
});

