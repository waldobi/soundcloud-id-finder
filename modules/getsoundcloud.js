'use strict';

var http = require('http');
var https = require('https');


module.exports = function(originalURL, callback) {

  var constructedPath =
    '/resolve?url='
    + originalURL
    + '&client_id=788bebab07b8a2a6282710fe2a80467c'

  var options = {
    host: 'api.soundcloud.com',
    path: constructedPath
  };

  var req = http.get(options, function(res) {
    var bodyChunks = [];

    res.on('data', function(chunk) {
      bodyChunks.push(chunk);
    }).on('error', function(e) {
      callback(e, null);
      return;
    }).on('end', function() {
      var body = Buffer.concat(bodyChunks);

      if (body) {
        try {
          var url = JSON.parse(body).location

          https.get(url, function(res) {

            var finalChunks = [];
            res.on('data', function(chunk) {
              finalChunks.push(chunk);

            }).on('end', function() {
              var finalBody = Buffer.concat(finalChunks);
              var scID = JSON.parse(finalBody).id;
              callback(null, scID);
            });
          });

        } catch (e) {
          callback(e, null);
        }
      }
    })
  });
}
