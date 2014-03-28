var count = 0;
var play = 0;
var readerTimer, text, words;
var countdown = false;

var makeToChars = function(paragraph) {
  var words = [];
  var wordArray = paragraph.split(' ');
  for(var i=0; i < wordArray.length; i++) {
    words[i] = wordArray[i].split("");
  }
  return words;
};

var breakUpWord = function(words) {
  var frontPart = [],
      centerPart = [],
      backPart = [];

  for(var i=0; i<words.length; i++){
    var centerIndex = Math.floor(words[i].length / 2) - Math.floor(words[i].length / 7);

    if(words[i].length % 2 == 0 && words[i].length > 2) {
      centerIndex--;
    }
    frontPart.push(words[i].join("").substring(0,centerIndex));
    centerPart.push(words[i].join("").substring(centerIndex, centerIndex + 1));
    backPart.push(words[i].join("").substring(centerIndex + 1, words[i].length));
  }

  frontPart.push("");
  centerPart.push("");
  backPart.push("");
  return {
    frontPart: frontPart,
    centerPart: centerPart,
    backPart: backPart
  };

};


var printWord = function(words, i) {
  $('#center').css({left: ($('#center').offset().left + $('#center').outerWidth() / 3)});
  $('#front').html(words.frontPart[i]);
  $('#center').html(words.centerPart[i]);
  $('#back').html(words.backPart[i]);
  
  //this combines the letters in the correct position
  $('#center').css({left: ($('#center').offset().left - $('#center').outerWidth() / 3)});
  $('#front').css({left: ($('#center').offset().left  - $('#front').outerWidth()) + "px"});
  $('#back').css({left: ($('#center').offset().left  + $('#center').outerWidth()) + "px"});

  if(i >= words.frontPart.length) {
    clearInterval(readerTimer);
  }

};


setTimeout(function(){ window.onscroll=triggerInfinite;}, 100);



var combineParagraphs = function(paragraph) {
  var text = "";
  for(var i=0; i < paragraph.length; i++){
    text += " " + paragraph[i].text;
  }
  return text;
};

var resetReader = function() {
  count = 0;
  clearInterval(readerTimer);
  play = 0;
  $('#front').html("");
  $('#center').html("");
  $('#back').html("");
};

var read = function(paragraph) {
  $('#counter').html('');
  if(!countdown) {
  //starts the reading at pause and toggles between states
    if (play == 0) {
      text = combineParagraphs(paragraph);
      words = breakUpWord(makeToChars(text));
      play = 2;
      $( "#slider" ).slider({
        min: 0,
        max: words.frontPart.length - 1,
        value: 0,
        slide: function(event, ui){
          count = ui.value;
          play = 1;
          read();
          read();
        }
      });
    }
    else if (play == 1) {
      play = 2;
    }
    else if (play == 2) {
      play = 1;
    }

    //pause
    if (play == 2) {
      $('#submit').removeClass("glyphicon glyphicon-pause").addClass("glyphicon glyphicon-play");
      clearInterval(readerTimer);
      $('#wpm').css("display", "inline-block");
    }

    //play
    if (play == 1) {
      $('#submit').removeClass("glyphicon glyphicon-play").addClass("glyphicon glyphicon-pause");
      var speed = 60000/$('#wpm').val();
      //the delay before the read
      if (count == 0) {
        // set countdown slider width
        $('#countdown_left').css({width: '40%', left: '0'});
        $('#countdown_right').css({width: '60%'});

        //displays the speed split up
        $('#front').html($('#wpm').val().toString().substring(0,1));
        $('#center').html($('#wpm').val().toString().substring(1,2));
        $('#back').html($('#wpm').val().toString().substring(2,1));

        //positions the parts of the word
        $('#center').css({left: ($('#center').offset().left - $('#center').outerWidth() / 3)});
        $('#front').css({left: ($('#center').offset().left  - $('#front').outerWidth()) + "px"});
        $('#back').css({left: ($('#center').offset().left  + $('#center').outerWidth()) + "px"});


        var originWidth_left = $('#countdown_left').outerWidth();
        var originWidth_right = $('#countdown_right').outerWidth();
        var subtract_left = originWidth_left * 0.0258;
        var subtract_right = originWidth_right * 0.025;
        var left_shift = subtract_left;

        //sets delay to start the reader
        var animationTimer = setInterval(function () {
          countdown = true;
          $('#countdown_left').css({width: ($('#countdown_left').outerWidth() - subtract_left) + "px", left: left_shift + "px"});
          $('#countdown_right').css({width: ($('#countdown_right').outerWidth() - subtract_right) + "px"  });
          left_shift += subtract_left;
        }, 50);

        setTimeout(function(){
          clearInterval(animationTimer);
          setTimer(speed);

          countdown = false;

          $('#countdown_left').css({width: '0%'});
          $('#countdown_right').css({width: '0%'});

        }, 2000);
      }
      else {
        setTimer(speed);
      }
      
    }
  }


function setTimer(speed) {
  readerTimer = setInterval(function () {
    printWord(words, count);
    $('#wpm').css("display", "none");
    //this calculates time counter
    var total_words = words.frontPart.length;
    var min = Math.floor(((total_words-count) * (1/$('#wpm').val())));
    var sec = function() {
      var sub_sec = Math.round((total_words-count) * (1/$('#wpm').val())*60)%60;
      console.log(sub_sec.toString().length);
      if (sub_sec.toString().length == 1) {
        return "0" + sub_sec
      }
      else {
        return sub_sec;
      }
    }
    $('#counter').html(min + ":" + sec());

    if (count < words.frontPart.length - 1) {
      count ++;
      $("#slider").slider({ value: count });
    }
    else {
      $('#submit').removeClass("glyphicon glyphicon-pause").addClass("glyphicon glyphicon-repeat");
      clearInterval(readerTimer);
      $('#wpm').css("display", "inline-block");
      play = 2;
      count = 0;
      $("#slider").slider({ value: count });
    }
  }, speed);
}
// popularity++;
// console.log(popularity);
};

exports._tests = {
  makeToChars: makeToChars,
  breakUpWord: breakUpWord,
  printWord: printWord,
  combineParagraphs: combineParagraphs,
  read: read
};
