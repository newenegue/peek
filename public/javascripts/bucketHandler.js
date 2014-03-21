function setCookie() {
  return $.ajax({type: 'POST', url: '/bucketlist/add', success: function(response){
    console.log(response);
  }});
}
$(document).ready(function(){
  setCookie().done(function(){
    $.ajax({type: 'GET', url: '/bucketlist', success: function(response){
      console.log(response);
    }});
  });
});

