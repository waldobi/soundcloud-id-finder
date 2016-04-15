'use strict';

var getsoundcloud = require('./modules/getsoundcloud');
var path    = require("path");
var bodyParser = require('body-parser')
var express = require('express')
var app = express()

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.use(express.static('src'));

app.get('/soundcloud',function(req,res){
  res.sendFile(path.join(__dirname+'/src/index.html'));
});

app.post('/soundcloud', function(req, res){
  var url = req.body.scURL
 //  console.log('hello');
  getsoundcloud(url, function(err, trackID) {
    if (err) {
	console.log('SOUNDCLOUD ERROR');
      res.status(500);
      res.send('<h1>An internal error occured.</h1>')
      res.end();
    } else {
      res.status(200);
      res.send('<p><b>URL</b>: ' + url + '\n</p><p><b>SoundCloud Track ID:</b> ' + trackID + '</p>')
      res.end();
    }


  })
})

app.listen(6789, function() {
  console.log('LISTENING');
});
