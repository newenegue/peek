var makeToChars = function(paragraph) {
  var words = [];
  var wordArray = paragraph.split(' ');
  for(var i=0; i < wordArray.length; i++) {
    words[i] = wordArray[i].split("");
  }
  return words;
}

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

}


var printWord = function(words, i) {
  $('#front').html(words.frontPart[i]);
  $('#center').html(words.centerPart[i]);
  $('#back').html(words.backPart[i]);
  
  //this combines the letters in the correct position
  $('#front').css({left: ($('#center').offset().left  - $('#front').outerWidth()) + "px"});
  $('#back').css({left: ($('#center').offset().left  + $('#center').outerWidth()) + "px"});

  if(i >= words.frontPart.length) {
    clearInterval(readerTimer);
  }
  
}



var combineParagraphs = function(paragraph) {
  var text = ""
  for(var i=0; i < paragraph.length; i++){
    text += " " + paragraph[i].text;
  }
  return text;
}

var read = function(paragraph) {
  var text = combineParagraphs(paragraph);
  var words = breakUpWord(makeToChars(text));
    i =0;
    readerTimer = setInterval(function(){
      printWord(words, i);
      i++;
    }, 100);
// popularity++;
// console.log(popularity);
}


exports._tests = {
  makeToChars: makeToChars,
  breakUpWord: breakUpWord,
  printWord: printWord,
  combineParagraphs: combineParagraphs,
  read: read
}