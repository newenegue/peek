//THIS WILL BE REMOVED


//define global variables
var count = 0;
var play = false;
var readerTimer, text, words, brokenWords, front, back, center;

//takes the article and splits the words into an array
//the it splits the words into characters (an array within an arrary, "just like inception")
function makeToChars(text) {
  var words = [];
  //spliting text into words
  var wordArray = text.split(' ');
  //spliting words into characters
  for (var i=0; i < wordArray.length; i++) {
    words[i] = wordArray[i].split('');
  }
  return words;
}

//gets the center of each word
function breakUpWord(words) {
  var frontPart = [],
    centerPart = [], 
    backPart = [];
  for (var i=0; i<words.length; i++) {
    //get the center of the word rounded down 
    //and every 7 chars move the center to the left 1
    var centerIndex = Math.floor(words[i].length / 2) - Math.floor(words[i].length / 7);
    //if the word's length is even and greater than two move the center to the left 1
    if ((words[i].length % 2) == 0 && words[i].length > 2) {centerIndex--;}

    //grab the front, center, and back part of each word and store in an array
    frontPart.push(words[i].join('').substring(0, centerIndex));
    centerPart.push(words[i].join('').substring(centerIndex, centerIndex + 1));
    backPart.push(words[i].join('').substring(centerIndex + 1, words[i].length));

  }
  //add a black space at the end of the array 
  //to show a blank screen after reader is done playing
  frontPart.push("");
  centerPart.push("");
  backPart.push("");
  return [frontPart, centerPart, backPart];
}

//puts the words into the DOM
function printWords(frontPart, centerPart, backPart) {
  document.getElementById("front").innerHTML = frontPart[count];
  document.getElementById("center").innerHTML = centerPart[count];
  document.getElementById("back").innerHTML = backPart[count];
  //determines the position of the front and back parts of the word based on the center 
  document.getElementById('front').style.left = (document.getElementById('center').offsetLeft  - document.getElementById('front').offsetWidth)  + "px";
  document.getElementById('back').style.left = (document.getElementById('center').offsetLeft  + document.getElementById('center').offsetWidth)  + "px";
}

//rewind the text only when the reader is playing
function rewind() {
  if (play) {
    //if you are on the 11th word or more go back 10
    if (count > 10) {
      count -= 10;
    }
    //if you are more than 2 words in and less than 10 words in
    //go back 2 words
    else if (count > 2 && count < 10) {
      count -= 2;
    }
  }
}

//fast forward the text only when the reader is playing
function forward() {
  if (play) {
    //if you can go 10 words forward, do it
    if (count + 10 < front.length - 1) {
      count += 10;
    }
    //if you cant go ten then see if you can go 2 words and do it
    else if (count + 2 < front.length -1 && count + 10 >= front.length - 1) {
      count += 2;
    }
  }
}

//restart the reader
function restart() {
  count = 0;
  //if the reader isn't playing make it play
  if (!play) {
    read();
  }
}
  
//main read controller
function read() {
  //toggle the play so that you cant press it twice for the same function
  play = !play

  //call the character parsing functions if its the beginning of the document
  if (count == 0) {
    text = document.getElementById('text').value;  // Patricia you will need to change this line
    words = makeToChars(text);
    brokenWords = breakUpWord(words);
    front = brokenWords[0];
    center = brokenWords[1];
    back = brokenWords[2];
  }
  //if the reader is playing (note we already toggled the play, hence the false) 
  //switch the button text to play and pause the reader
  if (play == false) {
    document.getElementById("submit").innerHTML = "Play";
    clearInterval(readerTimer);
  }
  //if the reader is not playing, play it
  if (play == true) {
    //switch the button text to pause
    document.getElementById("submit").innerHTML = "Pause";
    //get the current speed desired
    var speed = 60000 / document.getElementById('wpm').value
    //define the timer
    readerTimer = setInterval(function(){
      printWords(front, center, back); 
      //increase which word we are on if its not the last word     
      if (count < front.length - 1) {
        count++;
      }
      //if it is the last word turn off the reader
      else {
        //make the button say replay
        document.getElementById("submit").innerHTML = "Re-Play";
        //turn off the timer
        clearInterval(readerTimer);
        //reset variables to replay
        play = false;
        count = 0;
      }
    } , speed);
  }
}