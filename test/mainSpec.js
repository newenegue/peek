var expect = require("chai").expect;
GLOBAL.document = require("jsdom").jsdom();
GLOBAL.window = document.createWindow();
GLOBAL.$ = GLOBAL.jQuery = require("jquery");
var main = require("../public/javascripts/main.js");

describe("Main", function() {
  
  describe("showMoreInfo", function(){
    it("should find element with class .moreInfo and add class .showMoreInfo", function(){
      var el = document.createElement("div");
      el.class = "moreInfo";
      document.body.appendChild(el);
      $('div').on('click', main._tests.showMoreInfo());
      // el.click(function(){showMoreInfo()});
      // Set up the event handler
      //el.on("click", main._tests.showMoreInfo);
      // Actually play as if we clicked it
      happen.click(el);     // main._tests.showMoreInfo();


      expect(el.class).to.include("showMoreInfo");
    });
  });

});