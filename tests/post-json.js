var privateData = require('../private.js');
var postJson = require('post-json');

var url = privateData.url.jesseTest;
var body = {};

body.value1 = 'hola'; // Change value of one of the keys in the JSON body object
postJson(url, body, function (err, result) {
  if (err) {
    console.error(err);
  }
});
