
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var bucket = require('./routes/bucket.js');
var http = require('http');
var path = require('path');

var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/peektest');

var app = express();

var mongoUri = process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost/mydb';

mongo.Db.connect(mongoUri, function (err, db) {
  db.collection('mydocs', function(er, collection) {
    collection.insert({'mykey': 'myvalue'}, {safe: true}, function(er,rs) {
    });
  });
});

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.cookieParser());
app.use(function(req, res, next) {
  // var cookie = req.cookies.session_id;

  // if (cookie === undefined) {
  //   //set new cookie
  //   var randomNumber = Math.random().toString();
  //   randomNumber = randomNumber.substring(2, randomNumber.length);
  //   res.cookie("session_id", randomNumber, {httpOnly: true});

  //   console.log("cookie created successfully")
  // }
  // else {
  //   //cookie was already present
  //   console.log("cookie exists", cookie);
  //   // skip the intro animation
  // }

  next();
});
// app.use(express.static(_dirname + '/public'));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/bucketlist', bucket.getBucket(db));
app.get('/articles', bucket.getArticles(db));
app.post('/bucketlist/add', bucket.addBucket(db));
app.post('/article/add/:id', bucket.addArticle(db));
app.del('/article/del/:id', bucket.removeArticle(db));
app.del('/article/del/', bucket.deleteAll(db));
app.put('/article/pop/', bucket.increasePop(db));
app.get('/articles/pop/', bucket.articlesByPop(db));


http.createServer(app).listen(app.get('port'), function(){

  console.log('Express server listening on port ' + app.get('port'));
});

