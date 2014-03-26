var cronJob = require('cron').CronJob;
var http = require('http');



var job = new cronJob({
  cronTime: '00 00 01 * * *',
  onTick: function() {
    console.log('you will see this message every day at 1am');
    http.request({host: 'localhost', path: '/articles/decpop/', port: '3000', method: 'PUT'}, function(response) {
      response.on('data', function (chunk) {
        console.log("finished call " + chunk);
      });
    }).end();
  }
});

job.start();