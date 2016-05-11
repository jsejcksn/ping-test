var moment = require('moment'),
  humanizeDuration = require('humanize-duration');

var mark = moment();

function display() {
  console.log(humanizeDuration(moment.duration(moment().diff(moment(mark))))); // Get difference of duration (in ms) between marked moment and current moment, then display in human-readable format *with precision*.
}

setTimeout(display, 12000); // Should log ~12 seconds
