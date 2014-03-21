function setCookie() {
  return $.ajax({type: 'POST', url: '/bucketlist/add', success: function(response){
    console.log(response);
  }});
}
$(document).ready(function(){
  setCookie().done(function(){
    $.ajax({type: 'GET', url: '/bucketlist', success: function(response){
      console.log(response);
      //call add existing articles(response)
    }});
  });
});

//existing articles(response)
//parse the json(response)
//pull out the article ids
//find an article by its id
//load it in the bucket


//addArticle(id)
//when an article is dropped into the bucket
//grab article id from the dom
//run an ajax call while passing in the article id