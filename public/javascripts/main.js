// ------------------------------------------
// jQuery - on page load
// ------------------------------------------
$(document).ready(function() {

  // Collapse articles toggle
  $(document.body).on('click', '.read', readArticle);

  // Close Peek reader
  $(document.body).on('click', '.close', closeArticle);

  // Double click article to remove from bucket
  $(document.body).on('dblclick', '.bucket_item', removeSelectedItem);

  // Animated bucket
  $("#stage").load('images/peek_bin.svg', svgLoaded);

  // Animated bucket: shadow
  $("#shadowStage").load('images/shadow_bucket.svg', svgLoaded);

});

// ------------------------------------------
// Open PEEK to read article
// ------------------------------------------
function readArticle() {
  var article_id = $($(this).parent()).attr('data-id');
  var paragraph = $.parseJSON($("#" + article_id).attr('data-paragraph'));
  read(paragraph);


  $(".article_container").addClass("peek_article");

  // if ($(".articles .article div").is(":hidden") || bucketArray === []) {
  //   $(".article").show("slow");
  //   // $(".article_container").removeClass("peek_article");
  // } else {
  //   $(".article").slideUp("slow", function(){
  //     // console.log("OPEN READ DIV");
      
  //   });
  // }
}

// ------------------------------------------
// Close article
// ------------------------------------------
function closeArticle() {
  // if ($(".articles .article div").is(":hidden") || bucketArray === []) {
  //   $(".article").show("slow");
  // }
  $(".article_container").removeClass("peek_article");
}

// ------------------------------------------
// Loads SVG
// ------------------------------------------
function svgLoaded(response) {
  $(this).addClass("svgLoaded");
  if(!response){
    console.log("Error loading SVG!");
  }
}

// ------------------------------------------
// Locates article id from DOM and removes it from bucket
// ------------------------------------------
function removeSelectedItem() {
  var article_id = $($(this).first()).attr("data-id");
  removeItemFromBucket(article_id);

  // NOTIFY DB TO DECREASE POPULARITY ON ARTICLE_ID
  refreshBucket();
}

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

  // ------------------------------------------
  // this pulls in the NPR api 
  // ------------------------------------------
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
        for(var j=0; j < $scope.articles[article].text.paragraph.length; j++){
          $scope.articles[article].text.paragraph[j].text = $scope.articles[article].text.paragraph[j].$text;
        }
      }
      //return only 9 articles to the scope
      $scope.articles = $scope.articles.slice(0, 14);
    });

  var popularity = 0;

  // ------------------------------------------
  // Double click article to add to bucket
  // ------------------------------------------
  $scope.addToBucket = function(article) {
    if(validId(article.id)){
      addItemToBucket(article.id);

      // NOTIFY DB TO INCREASE POPULARITY ON ARTICLE_ID
      refreshBucket();
    }
  };

  $scope.clickRead = function () {
    console.log("clicked READ in angular");
  };

  // $scope.makePopular = function() {
  //   popularity++;
  //   console.log(popularity);
  // };
});

