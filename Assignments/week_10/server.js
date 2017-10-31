var express = require('express');

var bodyParser = require('body-parser');

var app = express();

//initialize server
app.listen(3000, function () {
  console.log('Reminder app listening on port 3000')
});

//testing server works
app.get('/', function (req, res) {
  console.log("Reminder App");
  res.end("Reminder App!")
});