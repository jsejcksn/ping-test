var moment = require('moment'),
  humanizeDuration = require('humanize-duration');

var mark = moment(),
  mark2 = (365.25 * 24 * 60 * 60 * 1000) + (39.5 * 24 * 60 * 60 * 1000) + (17500);
var shortEnglishHumanizer = humanizeDuration.humanizer({
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
  spacer: ''
});

function display() {
  console.log(shortEnglishHumanizer(moment.duration(moment().diff(moment(mark))))); // Get difference of duration (in ms) between marked moment and current moment, then display in human-readable format *with precision*.
}

console.log(humanizeDuration(mark2));
console.log(shortEnglishHumanizer(mark2));
setTimeout(display, 5230); // Should log '5s'
