var moment = require('moment');

var now = moment();
var dateFull = moment(now).format();

console.log({
  'dateUnix': +moment(now),
  'dateFull': dateFull,
  'dateYear': +dateFull.slice(0, 4),
  'dateMonth': +dateFull.slice(5, 7),
  'dateDay': +dateFull.slice(8, 10),
  'dateHours': +dateFull.slice(11, 13),
  'dateMinutes': +dateFull.slice(14, 16),
  'dateSeconds': +dateFull.slice(17, 19),
  'dateOffset': +dateFull.slice(19, 22),
  'reachable': true
});
