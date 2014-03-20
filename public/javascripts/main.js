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

  $(".article").addClass("animated fadeOutLeft");
  setTimeout( function() {$(".article_container").addClass("peek_article")}, 1000 );
}

// ------------------------------------------
// Close article
// ------------------------------------------
function closeArticle() {
  $(".article_container").removeClass("peek_article");
  $(".article").removeClass("fadeOutLeft");
  $(".article").addClass("fadeInLeft");
  clearInterval(readerTimer);
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

  // ------------------------------------------
  // this pulls in the first set of articles REFACTOR!!!
  // ------------------------------------------
  $http.get('http://api.npr.org/query?apiKey=MDEzMzc4NDYyMDEzOTQ3Nzk4NzVjODY2ZA001&startNum=0&numResults=15&requiredAssets=text&format=json')
    .then(function(res){
      //this targets the stories from the NPR JSON list
      $scope.articles = res.data.list.story;
      //loop through each new article
      for(var article in $scope.articles){
        var text = $scope.articles[article].teaser.$text;
        $scope.articles[article].teaser.$text = $sce.trustAsHtml(text);
        for(var j=0; j < $scope.articles[article].text.paragraph.length; j++){
          $scope.articles[article].text.paragraph[j].text = $scope.articles[article].text.paragraph[j].$text;
        }
      }
      //return only 9 articles to the scope
      $scope.articles = $scope.articles.slice(0, 8);
    });

  // var popularity = 0;

  // ------------------------------------------
  // this adds more articles for infinite scroll REFACTOR!!!
  // ------------------------------------------

  pageNum = 0;

  window.addArticles = function() {
  var oldArray = $scope.articles;
  pageNum++;
  articleNum = ((pageNum + 1) * 9);
  $http.get('http://api.npr.org/query?apiKey=MDEzMzc4NDYyMDEzOTQ3Nzk4NzVjODY2ZA001&startNum=' + articleNum + '&numResults=15&requiredAssets=text&format=json')
    .then(function(res){
      //this targets the new stories from the NPR JSON list
      articles = res.data.list.story;
      //loop through each new article
      for(var i=0; i < articles.length; i++){
        //check to see if the id of the new article is in the old array of articles
        var index = oldArray.indexOf(articles[i].id);
        //if the id is in the oldArray remove it from the new articles
        if(index > -1){
          articles[i].splice(index, 1);
        }
        //this makes the teaser text html safe
        var text = articles[i].teaser.$text;
        articles[i].teaser.$text = $sce.trustAsHtml(text);
        for(var j=0; j < articles[i].text.paragraph.length; j++){
          articles[i].text.paragraph[j].text = articles[i].text.paragraph[j].$text;
        }
      }
      //this pushes only 9 articles to the full articles array
      for(var i=0; i < 9; i++){
        $scope.articles.push(articles[i]);
      }
      
    });

  };



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

  // $scope.makePopular = function() {
  //   popularity++;
  //   console.log(popularity);
  // };
});

