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
      if (!err){
        res.json({
          bucket: docs
        });
      }
      else {
        res.end();
      }
    });
  }
}

exports.addBucket = function(db) {
  return function(req, res) {
    var collection = db.get('buckets');
    var cookie = parseCookies(req.headers.cookie);
    if (cookie === undefined) {
      collection.insert({}, function (err, doc) {
        if (err) {
            res.send("There was a problem adding the information to the database.");
        }
        else {
          res.cookie("session_id", doc._id, {maxAge: 2100000000});
          res.end("true");
        }
      });
    }
    else {
      collection.findOne({_id: cookie},{}, function(err, docs){
        cookie = decodeURI(cookie).trim();
        cookie = cookie.substr(3,(cookie.length - 4));
        res.end("false");
      });
    }
  }
}

exports.getArticles = function(db) {
  return function(req, res) {
    var collection = db.get('articlebucket');
    var bucketID = parseCookies(req.headers.cookie);
    bucketID = decodeURI(bucketID).trim();
    bucketID = bucketID.substr(3,(bucketID.length - 4));

    collection.find({bucket_id: bucketID},{},function(err, docs){
      if(docs){
        //got a bunch of articles id's 
        var articleArray = [];
        for(var i=0; i < docs.length; i++) {
          articleArray.push(docs[i].article_id);
        }
        var collection = db.get("articles");
        collection.find({_id: {$in:articleArray}}, function(err, docs) {
          if (!err){
            res.json({
              bucket: docs
            });
          }
          else {
            res.end();
          }
        });
    
      }
    }
  )}
}

exports.articlesByPop = function(db) {
  return function(req, res) {
    console.log("inside the controller for articlesByPop");
    var collection = db.get('articles');

    collection.find({},{},function(err, docs){
      if(docs){
        res.json({
          articles: docs
        });
      }
    }
  )}
}



exports.addArticle = function(db) {
  return function(req, res) {
    var article = req.body
    var collection = db.get('articles');
    collection.findById(article["id"],function(err, docs){
      if (!docs) {
        collection.insert({"_id": article["id"], "article": article, "popularity" : 1}, function (err, doc) {
          if (err) {
            res.end("could not add article to db");
          }
        } );
      }
      else {
        var pop = docs.popularity + 1;
        collection.findAndModify({ _id: docs._id }, { $set: {popularity: pop} }, function(err, doc){
        });

      }
      //call add join table function
      addArticleToBucket(article["id"], req, db);
    });
    res.end("added article");
  }
}


function addArticleToBucket(articleID, req, db) {
  var collection2 = db.get('articlebucket');
  var bucketID = parseCookies(req.headers.cookie);
  bucketID = decodeURI(bucketID).trim();
  bucketID = bucketID.substr(3,(bucketID.length - 4));

  collection2.findOne({bucket_id: bucketID, article_id: articleID},{}, function(err, docs){
    if (!docs) {
      collection2.insert({bucket_id: bucketID, article_id: articleID}, function(err, doc) {
      });
    }
  });
}

exports.removeArticle = function(db) {
  return function(req, res) {
    var collection = db.get('articlebucket');
    var articleID = req.params.id
    var bucketID = parseCookies(req.headers.cookie);
    bucketID = decodeURI(bucketID).trim();
    bucketID = bucketID.substr(3,(bucketID.length - 4));

    collection.remove({bucket_id: bucketID, article_id: articleID}, function(err){
      res.end();
    }); 
  }
}

exports.deleteAll = function(db) {
  return function(req, res) {
    var collection = db.get('articlebucket');
    var bucketID = parseCookies(req.headers.cookie);
    bucketID = decodeURI(bucketID).trim();
    bucketID = bucketID.substr(3,(bucketID.length - 4));

    collection.remove({bucket_id: bucketID}, function(err){
      res.end();
    }); 
  }
}

exports.increasePop = function(db) {
  return function(req, res) {
    var collection = db.get('articles');
    var articleID = req.body.id;

    collection.findById(articleID, function(err, docs){
      var pop = docs.popularity + 2;
      collection.findAndModify({ _id: articleID}, { $set: {popularity: pop} }, function(err, doc){
          res.end();
        });
    });
  }
}