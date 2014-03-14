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

// ------------------------------------------
// Ellie add
// ------------------------------------------

function generateGrid($scope) {
	$scope.boxes = [
	['item1', 'item2', 'item3'], 
	['item4', 'item5', 'item6'],
  ['item7', 'item8', 'item9']
	];

};

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("Text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("Text");
  ev.target.appendChild(document.getElementById(data));
};
