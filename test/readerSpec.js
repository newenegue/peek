var expect = require("chai").expect;
var reader = require("../public/javascripts/reader.js");

describe("Reader", function() {
  describe("makeToChars", function(){
    it("should break apart a long string into an array of words with its array of characters", function(){
      var paragraph = "Hey Sexy!";
      var results = reader._tests.makeToChars(paragraph);
      var expected = [["H","e","y"], ["S","e","x","y","!"]]

      expect(results).to.deep.equal(expected);
    });
  });

  describe("breakUpWord", function(){

    it("should get the center of words in an array", function() {
      var words = [["H","e","y"], ["S","e","x","y"]];
      var results = reader._tests.breakUpWord(words);
      var expected = ["e","e"];

      expect(results).to.have.property("centerPart").and.to.include.members(expected);
    });

    it("should get the 2nd character in a word if the word is 2 characters long", function(){
      var words = [["H","e"], ["S","e","x","y"]];
      var results = reader._tests.breakUpWord(words);
      var expected = ["e","e"];

      expect(results).to.have.property("centerPart").and.to.include.members(expected);
    });

    it("should make the centerIndex 1 more to the left everytime 7 more letters are added to the word", function(){
      var words = [["H","e"], ["S","e","x","y","l","a","d","y"]];
      var results = reader._tests.breakUpWord(words);
      var expected = ["e","x"];

      expect(results).to.have.property("centerPart").and.to.include.members(expected);
    });

    it("should get the front half of the word in an array", function() {
      var words = [["H","e","y"], ["S","e","x","y","l","a","d","y"]];
      var results = reader._tests.breakUpWord(words);
      var expected = ["H","Se"];

      expect(results).to.have.property("frontPart").and.to.include.members(expected);
    });
    
    it("should get the back half of the word in an array", function() {
      var words = [["H","e","y"], ["S","e","x","y","l","a","d","y"]];
      var results = reader._tests.breakUpWord(words);
      var expected = ["y","ylady"];

      expect(results).to.have.property("backPart").and.to.include.members(expected);
    });

    it("should have an empty char in the end of each element in the returned array", function() {
      var words = [["H","e","y"], ["S","e","x","y"]];
      var results = reader._tests.breakUpWord(words);
      var expected = {frontPart: ["H","S",""], centerPart: ["e","e",""], backPart: ["y","xy",""]};

      expect(results).to.deep.equal(expected);
    });
  });

  describe("printWord", function() {
    it("should print the words to the DOM")
      // var words = {frontPart: ["H","S",""], centerPart: ["e","e",""], backPart: ["y","xy",""]};
      // reader._tests.printWord(words);
      // var results = front + center + back;
      // var expected = "Hey";

    //   expect(results).to.deep.equal(expected);

  });



});