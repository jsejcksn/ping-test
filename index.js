// Modules
var privateData = require('./private.js'),
  ping = require('ping'),
  postJson = require('post-json'),
  moment = require('moment'),
  humanizeDuration = require('humanize-duration'),
  shortEnglishHumanizer = humanizeDuration.humanizer({
    language: 'shortEn',
    languages: {
      shortEn: {
        y: function() { return 'y'; },
        mo: function() { return 'mo'; },
        w: function() { return 'w'; },
        d: function() { return 'd'; },
        h: function() { return 'h'; },
        m: function() { return 'm'; },
        s: function() { return 's'; },
        ms: function() { return 'ms'; },
      }
    },
    delimiter: ' ',
    round: true,
    spacer: '',
    units: ['y', 'mo', 'w', 'd', 'h', 'm']
  });

// Variables
var hosts = [privateData.server],
  url = privateData.url.jesse,
  body = {},
  mark = moment();

isDown();

function isDown() { // Loop until connection succeeds, then switch to isUp
  hosts.forEach(function(host) {
    ping.sys.probe(host, function(isAlive) { // Ping host
      if (isAlive) {
        body.value1 = "Modem is back online"; // Change value of the first key in the webhook JSON body object
        body.value2 = 'Downtime was ' + shortEnglishHumanizer(moment.duration(moment().diff(moment(mark)))); // Change value of the second key in the webhook JSON body object
        console.error(moment().format(), body.value1 + ', ' + body.value2);
        mark = moment();
        postJson(url, body, function(err, result) {}); // Trigger IFTTT webhook
        isUp();
      } else {
        console.log(moment().format() + ' ' + host + ' did not respond');
        setTimeout(isDown, (30 * 1000)); // Run isDown in 30s
      }
    });
  });
}

function isUp() { // Loop until connection fails, then switch to isDown
  hosts.forEach(function(host) {
    ping.sys.probe(host, function(isAlive) { // Ping host
      if (isAlive) {
        console.log(moment().format() + ' ' + host + ' is online');
        setTimeout(isUp, (30 * 1000)); // Run isUp in 30s
      } else {
        body.value1 = "Modem is not responding"; // Change value of the first key in the webhook JSON body object
        body.value2 = 'Uptime was ' + shortEnglishHumanizer(moment.duration(moment().diff(moment(mark)))); // Change value of the second key in the webhook JSON body object
        console.error(moment().format(), body.value1 + ', ' + body.value2);
        mark = moment();
        postJson(url, body, function(err, result) {}); // Trigger IFTTT webhook
        isDown();
      }
    });
  });
}
