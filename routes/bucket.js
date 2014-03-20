function parseCookies (cookie) {
  var list = {},
      rc = cookie;

  rc && rc.split(';').forEach(function( cookie ) {
      var parts = cookie.split('=');
      list[parts.shift().trim()] = unescape(parts.join('='));
  });

  console.log(list.session_id);
  return list.session_id;
}

exports.getBucket = function(db) {
  return function(req, res) {
    var collection = db.get('buckets');
    collection.find({},{},function(events, docs){
      
      // var cookie = res.send(req.headers.cookie)
      res.json('buckets', {
        buckets: docs,
        cookies: parseCookies(req.headers.cookie)
      });
    });
  }
}

exports.addBucket = function(db) {
  return function(req, res) {

    var collection = db.get('buckets');
    collection.insert({"articles": [{id: 1},{id:2},{id:3}]}, function (err, doc) {
      if (err) {
          // If it failed, return error
          res.send("There was a problem adding the information to the database.");
      }
      else {
        // res.end(req.headers.cookie);
        var cookie = parseCookies(req.headers.cookie);

        if (cookie === undefined) {
          //set new cookie
          // var randomNumber = Math.random().toString();
          // randomNumber = randomNumber.substring(2, randomNumber.length);
          res.cookie("session_id", doc._id, {maxAge: 2100000000, httpOnly: true});
          console.log("doc_id = " + doc._id);

          console.log("cookie created successfully")
          res.end("test");
        }
        else {
          //cookie was already present
          console.log("cookie exists", cookie);
          // If it worked, set the header so the address bar doesn't still say /adduser
          // res.location("/");
          // And forward to success page
          // res.redirect("/");
          res.end("didnt work");
        }
      }
    });
  }
}

exports.updateBucket = function(db) {
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


