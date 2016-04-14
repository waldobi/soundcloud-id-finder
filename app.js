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

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
});

app.post('/', function(req, res){
  var url = req.body.scURL
  console.log('hello');
  getsoundcloud(url, function(err, trackID) {
    if (err) {
      res.status(500);
      res.send('<h1>An internal error occured.</h1>')
      res.end();
    } else {
      res.status(200);
      res.send('<p>URL: ' + url + '\n</p><p>SoundCloud Track ID: ' + trackID + '</p>')
      res.end();
    }


  })
})

app.listen(3000, function() {
  console.log('LISTENING');
});
