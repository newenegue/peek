var trigger = false;

function triggerInfinite() {
  if(trigger == false) {
    //this sets the pixel distance of the bottom from the top of the window
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();
    //this sets the pixel distance of the articles div from the top of the window
    var elemTop = $('div.articles').offset().top;
    var elemBottom = elemTop + $('div.articles').height();

    trigger = true;
    //this activates function to add articles once you reach the bottom on the page
    if((elemBottom <= docViewBottom) && trigger == true) {
      addArticles(); 
    }
    //this prevents the function being called too quickly
    setTimeout(function(){ 
        trigger=false; }, 500);
  }
}

window.onscroll=triggerInfinite;

