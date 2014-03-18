// =================================================================================
// ------------------------------------------
// Create articles for development
// ------------------------------------------
// var artArray = [];
// for(var i = 0; i < 50; i++){
//   artArray.push({
//     'title': 'title' + i,
//     'id': i,
//     'text': 'Of course I peed my pants, everyone my age pees their pants. I ate some Triscuit crackers in the car, you should have had some. Knibb High football rules! This guy can stay in my room, I can tell you that much. I thought I was your snack-pack? When I graduated first grade, all my dad did was tell me to get a job.'
//   });
// }

// =================================================================================

// Global bucketArray
var bucketArray = [];

// ------------------------------------------
// jQuery - on load
// ------------------------------------------
$(document).ready(function() {

  // ------------------------------------------
  // Collapse articles toggle
  // ------------------------------------------
  $(document.body).on('click', '.read', function(data) {
    var article_id = $($(this).parent()).attr('data-id');
    console.log("you want to read article " + article_id);

    if ($(".articles .article div").is(":hidden") || bucketArray === []) {
      $(".article").show("slow");
      // $(".article_container").removeClass("peek_article");
    } else {
      $(".article").slideUp("slow", function(){
        // console.log("OPEN READ DIV");
        $(".article_container").addClass("peek_article");
      });
    }
  });

  // ------------------------------------------
  // Close Peek reader
  // ------------------------------------------
  $(document.body).on('click', '.close', function() {
    if ($(".articles .article div").is(":hidden") || bucketArray === []) {
      $(".article").show("slow");
    }
    $(".article_container").removeClass("peek_article");
  });

  // ------------------------------------------
  // Double click article to add to bucket
  // ------------------------------------------
  $(document.body).on('dblclick', '.article' ,function(){
    // THIS IS TOO MESSY!!!
    var article_id = $($(this).first()).children()[0].id;

    // Check if article exists in bucket, if not, add it
    if(bucketArray.indexOf(article_id) == -1){

      bucketArray.push(article_id);
      // Adjust DOM, make article not draggable and gray out
      $("#" + article_id).parent().addClass("article_in_bucket");
      $("#" + article_id).attr({"draggable": false });

      // NOTIFY DB TO INCREASE POPULARITY ON ARTICLE_ID
      refreshBucket();
    }
  });

  // ------------------------------------------
  // Double click article to remove from bucket
  // ------------------------------------------
  $(document.body).on('dblclick', '.bucket_item' ,function(){
    // MESSY!!!!!
    var article_id = $($(this).first()).attr("data-id");

    // Find article and remove it from bucketArray
    var index = bucketArray.indexOf(article_id);
    bucketArray.splice(index,1);
    // Adjust DOM, make article draggable
    $("#" + article_id).parent().removeClass("article_in_bucket");
    $("#" + article_id).attr({"draggable": true });

    if(bucketArray.length === 0){
      $(".article").show("slow");
    }

    // NOTIFY DB TO DECREASE POPULARITY ON ARTICLE_ID
    refreshBucket();
  });

  // ------------------------------------------
  // Animated bucket
  // ------------------------------------------   
  $("#stage").load('images/peek_bin.svg',function(response){

      $(this).addClass("svgLoaded");
       
      if(!response){
        console.log("Error loading SVG!");
      }
  });

});

// ------------------------------------------
// Angular
// ------------------------------------------
var peekApp = angular.module('PeekApp', []);

peekApp.controller('PeekCtrl', function($scope, $http, $sce) {
  // $scope.pageNum = 0;
  var pageNum = ($scope.pageNum + 1) * 9;
  var oldArray = [];
  if ($scope.articles != null) {
    oldArray = $scope.articles;
  }
  //this pulls in the NPR api 
  $http.get('http://api.npr.org/query?apiKey=MDEzMzc4NDYyMDEzOTQ3Nzk4NzVjODY2ZA001&startNum=' + pageNum + '&numResults=15&requiredAssets=text&format=json')
    .then(function(res){
      //this targets the stories from the NPR JSON list

      $scope.articles = res.data.list.story;
      //loop through each new article
      for(var article in $scope.articles){
        //check to see if the id of the new article is in the old array of articles
        var index = oldArray.indexOf($scope.articles[article].id);
        //if the id is in the oldArray remove it from the new articles
        if(index > -1){
          $scope.articles[article].splice(index, 1);
          console.log("IT WORKS!!!!!!");
        }
        var text = $scope.articles[article].teaser.$text;
        $scope.articles[article].teaser.$text = $sce.trustAsHtml(text);
      }
      //return only 9 articles to the scope
      $scope.articles = $scope.articles.slice(0, 14);
    });
    
  var popularity = 0;

  // $scope.makePopular = function() {
  //   popularity++;
  //   console.log(popularity);
  // };
});

