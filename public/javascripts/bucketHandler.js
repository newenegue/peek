function setCookie() {
  return $.ajax({type: 'POST', url: '/bucketlist/add', success: function(response){
    //need to set response to true in the routes/bucket.js
    //can trigger the animation to run or not here
    if (response == "true") {
      animation();
    }
    else {
      // ELLIE: CHANGE THIS BACK
      // closeIntro();
      animation();
    }

  }});
}

function getBucket() {
    return $.ajax({type: 'GET', url: '/bucketlist', success: function(response){
    }});
}

function getArticles() {
  return $.ajax({type: 'GET', url: '/articles', success: function(response){
    var persistedBucket = [];
    
    for(var i=0; i < response.bucket.length; i++){
      persistedBucket.push(response.bucket[i].article);
    }
    bucketArray = bucketArray.concat(persistedBucket);
    refreshBucket();
  }});
}

$(document).ready(function(){
  setCookie().done(getBucket().done(getArticles()));
});


function addArticleToDatabase(article) {
  //run an ajax call while passing in the article id
  $.ajax({type: 'POST', url: '/article/add/' + article["id"], data: {id: article["id"], title: article["title"], teaser: article["teaser"], thumbnail: article["thumbnail"], paragraph: article["paragraph"], link: article["link"], mainImage: article["mainImage"]}, success: function(response){
  }});
}

function removeArticleFromBucket(id) {
  //run an ajax call while passing in the article id
  $.ajax({type: 'DELETE', url: '/article/del/' + id, success: function(response){
  }});
}

function removeAll() {
  //run an ajax call while passing in the article id
  $.ajax({type: 'DELETE', url: '/article/del/', success: function(response){

  }});
}


function increasePop(id) {
  $.ajax({type: 'PUT', url: '/article/pop/', data: {id: id}, success: function(response){

  }});
}