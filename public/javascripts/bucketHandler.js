function setCookie() {
  return $.ajax({type: 'POST', url: '/bucketlist/add', success: function(response){
    console.log(response);
  }});
}

function getBucket() {
    return $.ajax({type: 'GET', url: '/bucketlist', success: function(response){
      console.log(response);
    }});
}

function getArticles() {
  return $.ajax({type: 'GET', url: '/articles', success: function(response){
    console.log(response);
    //existing articles(response)
    //parse the json(response)
    //pull out the article ids
    //find an article by its id
    //load it in the bucket
  }});
}

$(document).ready(function(){
  setCookie().done(getBucket().done(getArticles()));
});



function addArticleToDatabase(id) {
  //run an ajax call while passing in the article id
  console.log(id);
  $.ajax({type: 'POST', url: '/article/add/' + id, success: function(response){
    console.log(response);
  }});
}

function removeArticleFromBucket(id) {
  //run an ajax call while passing in the article id
  console.log(id);
  $.ajax({type: 'DELETE', url: '/article/del/' + id, success: function(response){
    console.log(response);
  }});
}