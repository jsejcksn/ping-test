var privateData = require('../private.js'),
  postJson = require('post-json');

var url = privateData.url.jesseTest,
  body = {};

body.value1 = "hola"; // Change value of one of the keys in the JSON body object
postJson(url, body, function(err, result) {
  // Do something here
});
