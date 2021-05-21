// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/timestamp/:timestamp", function (req, res) {
  let ts=req.params.timestamp;
  if(ts.match(/\d{5,}/))
    ts=+ts;
  let date=new Date(ts);
  if(date.toUTCString()=="Invalid Date")
    res.json({ error : "Invalid Date" });
  res.json({unix:date.valueOf(),utc:date.toUTCString()});
});
// Empty Date 
app.get("/api/timestamp/", function (req, res) {
  let now= new Date();
  res.json({unix:now.valueOf(),utc:now.toUTCString()});
});

// listen for requests :)
var listener = app.listen(3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
