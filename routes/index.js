
/*
 * GET home page.
 */

exports.index = function(req, res){
  // checkforCookie(req, res);
  console.log(req.cookies)
  res.render('index', { title: 'PEEK' });
};

var checkforCookie = function() {
  // if(cookie) 


  
}
