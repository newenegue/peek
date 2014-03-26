var cronJob = require('cron').CronJob;

var job = new cronJob({
  cronTime: '*/12 * * * * *',
  onTick: function() {
    console.log('you will see this message every 30 seconds');
    $.ajax({type: 'PUT', url: '/articles/decpop/', success: function(response){
      console.log("decrease pop complete");
    }});
  }
});

job.start();