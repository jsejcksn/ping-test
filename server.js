// Modules
var privateData = require('./private.js');
var ping = require('ping');
var postJson = require('post-json');
var moment = require('moment');
var humanizeDuration = require('humanize-duration');
var shortEnglishHumanizer = humanizeDuration.humanizer({
  language: 'shortEn',
  languages: {
    shortEn: {
      y: function () { return 'y'; },
      mo: function () { return 'mo'; },
      w: function () { return 'w'; },
      d: function () { return 'd'; },
      h: function () { return 'h'; },
      m: function () { return 'm'; },
      s: function () { return 's'; },
      ms: function () { return 'ms'; }
    }
  },
  delimiter: ' ',
  round: true,
  spacer: '',
  units: ['y', 'mo', 'w', 'd', 'h', 'm']
});

// Variables
var host = privateData.server;
var webhook = {
  'url': privateData.url, // Webhook URL
  'body': {} // POST body for webhook
};
var dateSystemStatus = +moment();
var loopCount = 0;
var mark = dateSystemStatus; // Set initial moment for getting diffs
var markPrecise = process.hrtime();
var offset;
var offsetPrecise;
var offsetReadable;
var status = false; // Set initial server 'reachable' status to false/offline

// Execute
isDown(); // Initiate with the assumption that the device is offline; causes first webhook event to be about device being online

// Functions
function isDown () { // Loop until connection succeeds, then switch to isUp
  ping.sys.probe(host, function (isAlive) { // Ping host
    if (isAlive) {
      loopCount++;
      if (loopCount > 1) { // Double-check before taking action
        timeOffset();
        webhook.body.value1 = 'Modem is back online (Downtime was ' + offsetReadable + ')'; // Change value of the first key in the webhook JSON body object
        logChange();
        isUp();
      } else {
        isDown();
      }
    } else {
      logStatus();
      setTimeout(isDown, (30 * 1000)); // Run isDown in 30s
    }
  });
}

function isUp () { // Loop until connection fails, then switch to isDown
  ping.sys.probe(host, function (isAlive) { // Ping host
    if (isAlive) {
      logStatus();
      setTimeout(isUp, (30 * 1000)); // Run isUp in 30s
    } else {
      loopCount++;
      if (loopCount > 1) { // Double-check before taking action
        timeOffset();
        webhook.body.value1 = 'Modem is back online (Uptime was ' + offsetReadable + ')'; // Change value of the first key in the webhook JSON body object
        logChange();
        isDown();
      } else {
        isUp();
      }
    }
  });
}

function logChange () {
  mark = +moment(); // Reset moment for getting diffs
  markPrecise = process.hrtime();
  status = !status; // Toggle server 'reachable' status
  var msg = {
    'dateFull': moment(mark).format(),
    'dateUnix': mark,
    'diffClock': offset,
    'diffPrecise': offsetPrecise,
    'diffReadable': offsetReadable
  // 'host': host
  };
  if (status) {
    msg.reachable = true;
  } else {
    msg.reachable = false;
  }
  console.error(JSON.stringify(msg) + ','); // Log status change
  postJson(webhook.url, webhook.body, function (err, result) { // Trigger webhook
    if (err) {
      console.error(err);
    }
  });
  loopCount = 0;
}

function logStatus () {
  var timeStamp = +moment();
  if (timeStamp > (dateSystemStatus + 86400000)) { // Greater than at least 24 hours
    dateSystemStatus = timeStamp;
    var msg = {
      'dateFull': moment(timeStamp).format()
    // 'dateUnix': +moment(timeStamp),
    // 'host': host
    };
    if (status) {
      msg.reachable = true;
    } else {
      msg.reachable = false;
    }
    console.log(JSON.stringify(msg) + ',');
  }
  loopCount = 0;
}

function timeOffset () {
  offset = moment().diff(moment(mark));
  offsetPrecise = process.hrtime(markPrecise);
  offsetReadable = shortEnglishHumanizer(offset); // Round to nearest minute and display with units
}
