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

//json
app.use(bodyParser.json());

var users = []; //init users array
//Create a new user
app.post('/users', function (req, res){
  var id = {"id" : users.length + 1}; //increments IDs in array by 1.
  var newUsr = req.body; //take in info from body
  newUsr.id = id.id;
  newUsr.reminder = []; //init array to hold reminders
  users.push(newUsr); //add new user to users array
  res.status(200); //succesful completion
  res.json(id);

})