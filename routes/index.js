
/*
 * GET home page.
 */

exports.index = function(req, res){
<<<<<<< HEAD
  res.render('index', { title: 'PEEK' });
};
=======
  // checkforCookie(req, res);
  console.log(req.cookies)
  res.render('index', { title: 'PEEK' });
};

var checkforCookie = function() {
  // if(cookie) 


  
}
>>>>>>> 9ff5a8ac790e2379dded69d7c95ce55668cd57c0
