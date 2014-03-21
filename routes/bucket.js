function parseCookies (cookie) {
  var list = {},
      rc = cookie;
  rc && rc.split(';').forEach(function( cookie ) {
      var parts = cookie.split('=');
      list[parts.shift().trim()] = unescape(parts.join('='));
  });
  return list.session_id;
}

exports.getBucket = function(db) {
  return function(req, res) {
    var cookie = parseCookies(req.headers.cookie);
    var collection = db.get('buckets');
    cookie = decodeURI(cookie).trim();
    cookie = cookie.substr(3,(cookie.length - 4));
    collection.findById(cookie,function(err, docs){
      res.json('buckets', {
        bucket: docs
      });
    });
  }
}

exports.addBucket = function(db) {
  return function(req, res) {
    var collection = db.get('buckets');
    collection.insert({"articles": [{id: 1},{id:2},{id:3}]}, function (err, doc) {
      if (err) {
          res.send("There was a problem adding the information to the database.");
      }
      else {
        var cookie = parseCookies(req.headers.cookie);
        if (cookie === undefined) {
          res.cookie("session_id", doc._id, {maxAge: 2100000000});
          res.end("cookie created");
        }
        else {
          cookie = decodeURI(cookie).trim();
          cookie = cookie.substr(3,(cookie.length - 4));
          res.end("cookie exists = " + cookie);
        }
      }
    });
  }
}

exports.updateBucket = function(db, articleId) {
  return function(req, res) {
    var collection = db.get('bucketarticle');
    var collection2 = db.get('articles');




    // collection.update({"articles": articles}, function (err, doc) {
    //   if (err) {
    //       // If it failed, return error
    //       res.send("There was a problem adding the information to the database.");
    //   }
    //   else {
    //       // If it worked, set the header so the address bar doesn't still say /adduser
    //       res.location("/");
    //       // And forward to success page
    //       res.redirect("/");
    //   }
    // });
  }
}


