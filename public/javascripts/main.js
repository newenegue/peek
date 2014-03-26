// var phantom=require('node-phantom');

// ------------------------------------------
// jQuery - on page load
// ------------------------------------------
$(document).ready(function() {

  // Close intro
  $(document.body).on('click', '.closeIntroButton', closeIntro);

  // Collapse articles toggle
  $(document.body).on('click', '.read', readArticle);

  // Close Peek reader
  $(document.body).on('click', '.close', closeArticle);

  // Click remove button
  $(document.body).on('click', '.remove_bucket_item', removeSelectedItem);

  // Delete all from bucket
  $(document.body).on('click', '.delete_all', deleteAll);

  // Main animated bucket
  $("#stage").load('images/peek_bin.svg', svgLoaded);

  // Main animated bucket: shadow
  $("#shadowStage").load('images/shadow_bucket.svg', svgLoaded);

  // Intro Animated bucket
  $("#welcomeBucketStage").load('images/peek_bin_welcome.svg', welcomeSvgLoaded);

  // EASTER EGGS
  // Click bucket to get random article
  $(document.body).on('click', '.wholeBucket', getRandomArticle);

  // Intro Animated bucket: shadow
  // $("#introShadowStage").load('images/shadow_bucket.svg', svgLoaded);

  // Toggle more information of article in bucket
  $(document.body).on('mouseover', '.bucket_item', showMoreInfo);
  $(document.body).on('mouseleave', '.bucket_item', hideMoreInfo);

  // Toggle article search
  $(document.body).on('click', '.glyphicon-search', toggleSearch);

  // Key down listener
  $(document).keydown(function(e){

    // ESC - close animation or peek reader
    if(e.keyCode == 27) {
      clearSearch();
      if( isReaderOpen() )
        closeArticle();
      if( isIntroOpen() )
        closeIntro();
    }

    // SPACE - toggle peek reader play/pause
    if(e.keyCode == 32) {
      read();
    }

    // Start search on key press
    if((e.keyCode <= 90 && e.keyCode >= 65) || (e.keyCode <= 57 && e.keyCode >= 48)) {
      openSearch();
    }
  });
});

// ------------------------------------------
// Clear and hide search
// ------------------------------------------
function clearSearch() {
  if($("input").hasClass("show_input")){
    $('input').val("");
    $("input").blur();
    $("input").removeClass("show_input");
    
    return true;
  }
  else {
    return false;
  }
}

// ------------------------------------------
// Start searching articles
// ------------------------------------------
function openSearch() {
  $("input").addClass("show_input");
  $("input").focus();
}

// ------------------------------------------
// Toggle search
// ------------------------------------------
function toggleSearch() {
  if(!clearSearch()) {
    openSearch();
  }
}

// ------------------------------------------
// Check if intro is running
// ------------------------------------------
function isIntroOpen() {
  return !$(".intro_animation").hasClass("end_intro");
}

// ------------------------------------------
// Close intro
// ------------------------------------------
function closeIntro() {
  $(".intro_animation_screen").addClass("end_intro");
}

// ------------------------------------------
// Show more info about article in bucket
// ------------------------------------------
function showMoreInfo() {
  $(this).find(".moreInfo").addClass("showMoreInfo");

}

// ------------------------------------------
// Hide the info about article in bucket
// ------------------------------------------
function hideMoreInfo() {
  $(this).find(".moreInfo").removeClass("showMoreInfo");

}

// ------------------------------------------
// Open PEEK to read article
// ------------------------------------------
function readArticle() {

  var article_id = $(this).parents(".bucket_item").attr('data-id');
  var paragraph = bucketArray[locateItem(article_id)]["paragraph"];
  var link = bucketArray[locateItem(article_id)]["link"];
  $("a.link_to_article").attr("href", link);

  read(paragraph);
  increasePop(article_id);

  $(".wholeBucket").attr("class", "wholeBucket animated rubberBand");
  $(".shadow").attr("class", "shadow animated rubberBand");
  $(".article").addClass("animated fadeOutLeft");
  setTimeout( function() {$(".article_container").addClass("peek_article");}, 1000 );
  setTimeout( function() {$(".wholeBucket").attr("class", "wholeBucket");}, 700 );
  setTimeout( function() {$(".shadow").attr("class", "shadow");}, 700 );
}

// ------------------------------------------
// Check if reader is open
// ------------------------------------------
function isReaderOpen() {
  return $(".article_container").hasClass("peek_article");
}

// ------------------------------------------
// Close article
// ------------------------------------------
function closeArticle() {
  $(".article_container").removeClass("peek_article");
  $(".article").removeClass("fadeOutLeft");
  $(".article").addClass("fadeInLeft");
  resetReader();
}

// ------------------------------------------
// Loads SVG
// ------------------------------------------
function svgLoaded(response) {
  $(this).addClass("svgLoaded");
  if(!response){
  }
}

function welcomeSvgLoaded(response) {
  $(this).addClass("welcomeSvgLoaded");
  if(!response){
  }
}

// ------------------------------------------
// Delete all articles from bucket
// ------------------------------------------
function deleteAll() {
  bucketArray = [];
  $(".article_in_bucket").removeClass("article_in_bucket");
  removeAll();
  refreshBucket();
}

// ------------------------------------------
// Locates article id from DOM and removes it from bucket
// ------------------------------------------
function removeSelectedItem() {
  var article_id = $(this).parents(".bucket_item").attr("data-id");
  removeItemFromBucket(article_id);
  refreshBucket();
}

// ------------------------------------------
// Extract image url given index's
// ------------------------------------------
function extractImageUrl(txt, index) {
  return txt.slice(index[0],index[1]);
}

// ------------------------------------------
// Find the index of image in fullText
// ------------------------------------------
function findImageIndex(txt) {
  var index = [];

  // Get start and end index of some image
  index.push(txt.indexOf("http://media.npr.org/assets/img"));
  index.push(txt.indexOf(".jpg") + 4);

  return index;
}

// ------------------------------------------
// Use square crop image if it exists
// ------------------------------------------
function findSquareImage(img) {
  // Search through all crop versions
  for(var i = 0; i < img.crop.length; i++){
    // If there is a square version, then use it
    if(img.crop[i].type == "square") {
      // Switch image to square version
      return img.crop[i];
    }
  }
  // Use original image, if not square found
  return img;
}

function getRandomArticle() {
  console.log("give me a random article");
}



// ------------------------------------------
// Angular
// ------------------------------------------
var peekApp = angular.module('PeekApp', []);

peekApp.controller('PeekCtrl', function($scope, $http, $sce) {
  $scope.articles = [];
  $scope.loading = false;
  $scope.show_articles = 'Popular';
  $scope.show_popular = false;
  $scope.articles_loaded = false;

  // ------------------------------------------
  // this pulls in the first set of articles REFACTOR!!!
  // ------------------------------------------
  if ($scope.show_popular) {
    $scope.getArticlesByPop();
  }
  else {
    loadArticles();
  }

  // ------------------------------------------
  // this adds more articles for infinite scroll REFACTOR!!!
  // ------------------------------------------

    pageNum = 0;
    popPageNum = 0;

    window.addArticles = function() {
      // show loading img
      $scope.loading = true;

      //adds more latest articles from NPR 
      if (!$scope.show_popular) {
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
            // hide loading img
            $scope.loading = false;
          });
      }

      //adds more popular articles from the DB
      if ($scope.show_popular) {
        console.log(popPageNum);
        popPageNum++;
        var start = popPageNum * 9;
        var end = start + 9;
        $http({
          url: "/articles/pop/",
          method: "GET"
        }).success(function(data) {
          articles = data.articles.slice(start, end);
          for(var i=0; i < articles.length; i++){
            $scope.articles.push(articles[i]);
          }
        });
      }
    };





  // ------------------------------------------
  // Find if article is in bucket
  // ------------------------------------------
  $scope.inBucket = function(article) {
    var isInBucket = false;
    for(var i = 0; i < bucketArray.length; i++){
      if(bucketArray[i].id == article.id) { isInBucket = true; }
    }
    return isInBucket;
  };

  // ------------------------------------------
  // Double click article to add to bucket
  // ------------------------------------------
  $scope.addToBucket = function(article) {
    if(validId(article.id)){
      addItemToBucket(article.id);
      refreshBucket();
    }
  };

  // ------------------------------------------
  // Toggle to show popular or npr articles
  // ------------------------------------------
  $scope.togglePopular = function() {
    $scope.show_popular = !$scope.show_popular;
    if($scope.show_popular) {
      $scope.show_articles = 'Latest';
      $scope.getArticlesByPop();
    }
    else {
      $scope.show_articles = 'Popular';
      loadArticles();
    }
  };

  // ------------------------------------------
  // Get popular articles from DB
  // ------------------------------------------
  $scope.getArticlesByPop = function() {
    console.log("inside get Articles by pop");
    $http({
      url: "/articles/pop/",
      method: "GET"
    }).success(function(data) {
      $scope.articles = data.articles.slice(0,9);
      console.log($scope.articles);
    });
  };

  // ------------------------------------------
  // Get NPR latest articles
  // ------------------------------------------
  function loadArticles() {
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
      $scope.articles_loaded = true;
    });
  }
});




// ------------------------------------------
// Main image filter
// - searches through APR JSON
// - returns the primary image/square image
// ------------------------------------------
peekApp.filter('getMainImage', function(){
  return function(input){

    // If NPR article has images
    if(input.image){
      // Local variables
      var images = input.image;
      var mainImage = images[0];
      // If mainImage is not primary, go look for it
      if(mainImage.type != "primary") {
        for(var i = 0; i < images.length; i++){
          // The article has a primary image
          if(images[i].type == "primary") {
            mainImage = findSquareImage(images[i]);
          }
        }
      }
      else {
        mainImage = findSquareImage(mainImage);
      }
      return mainImage.src;
    }
    // If the NPR doesn't have images, look through the html, use the first image
    else {
      var npr_logo = "/images/npr_logo.png";
      // If JSON has fullText, we will use that
      if(input.fullText){
        // Initialize local variables
        var text = input.fullText.$text;
        var image_index = findImageIndex(text);

        // If index's are valid, we found an image, otherwise just use NPR logo
        return (image_index[0] == -1 || image_index[1] == -1) ? npr_logo : extractImageUrl(text, image_index);
      }
      // If JSON doesn't have fullText, use NPR logo
      else {
        return npr_logo;
      }
    }
  };
});


// REFACTOR WITH MAIN IMAGE!!!!!
peekApp.filter("getThumbnail", function() {
  return function(input) {
    if(input.image){
      // Local variables
      var images = input.image;
      var thumb = images[0];

      if(thumb.type != "primary"){
        // Loop through all the images of article
        for(var i = 1; i < images.length; i++){
          // The article has a primary image
          if(images[i].type == "primary") {
            thumb = images[i];
          }
        }
      }
      return thumb.src;
    }
    else {
      return "/images/npr_thumb.png";
    }
  };
});

// ------------------------------------------
// Remove all stories listed as:
// - Top Stories
// - linked from sites other than npr.org
// ------------------------------------------
peekApp.filter("removeTopStories", function() {
  return function(input, scope) {
    if(scope.articles_loaded) {
      if(input[0].title != null && input[0].link[0] != null) {
        for(var i = 0; i < input.length; i++){
          // Remove all Top Stories article
          if(input[i].title.$text.indexOf("Top Stories:") >= 0){
            input.splice(i,1);
          }
          // Remove articles that are not from npr.org
          if(input[i].link[0].$text.indexOf("npr.org") == -1){
            input.splice(i,1);
          }
        }
      }
    }
    return input;
  };
});

