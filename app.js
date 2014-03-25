
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

// var db = monk('localhost:27017/peektest');
// var db = monk('mongodb://peek:keepachu@ds045907.mongolab.com:45907/heroku_app23343437');  //need to change this database
var db = monk('mongodb://peek:peek123@ds029117.mongolab.com:29117/heroku_app23170618');


var app = express();


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

