'use strict';

var getsoundcloud = require('./modules/getsoundcloud');
var express = require('express')
var app = express()

app.get('/soundcloud', function(req, res){
  var url = req.query.id
  console.log(url);
  getsoundcloud(url, function(err, trackID) {
    if (err) {
      console.log('ERRRRRROR');
      res.status(500);
      // res.json({ 'error': 'err' });
      res.send('<h1>An internal error occured.</h1>')
      res.end();
    } else {
      console.log('TRACK ID' + trackID);
      res.send('<p>URL: ' + url + '\n</p><p>SoundCloud Track ID: ' + trackID + '</p>')
      res.end();
    }


  })
})

app.listen(3000, function() {
  console.log('LISTENING');
});
