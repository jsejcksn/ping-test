var moment = require('moment'),
  humanizeDuration = require('humanize-duration');

var mark = moment(),
  mark2 = (1 * (365.25 * 24 * 60 * 60 * 1000)) + (1 * (30.4375 * 24 * 60 * 60 * 1000)) + (1 * (7 * 24 * 60 * 60 * 1000)) + (1 * (24 * 60 * 60 * 1000)) + (1 * (60 * 60 * 1000)) + (1 * (60 * 1000)) + (1 * (1000)),
  mark3 = (3 * (365.25 * 24 * 60 * 60 * 1000)) + (10 * (30.4375 * 24 * 60 * 60 * 1000)) + (2 * (7 * 24 * 60 * 60 * 1000)) + (21 * (24 * 60 * 60 * 1000)) + (19 * (60 * 60 * 1000)) + (45 * (60 * 1000)) + (17.5 * (1000));
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
  spacer: '',
  units: ['y', 'mo', 'w', 'd', 'h', 'm']
});

function display() {
  console.log(shortEnglishHumanizer(moment.duration(moment().diff(moment(mark))))); // Get difference of duration (in ms) between marked moment and current moment, then display in human-readable format *with precision*.
}

console.log(humanizeDuration(mark2));
console.log(shortEnglishHumanizer(mark2));
console.log(humanizeDuration(mark3));
console.log(shortEnglishHumanizer(mark3));
setTimeout(display, 5230); // Should log '0m'
// setTimeout(display, 65230); // Should log '1m'
