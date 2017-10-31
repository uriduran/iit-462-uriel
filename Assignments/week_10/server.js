var express = require('express');

var bodyParser = require('body-parser');

var app = express();

//json
app.use(bodyParser.json());

//initialize server
app.listen(3000, function () {
  console.log('Reminder app listening on port 3000')
});

//testing server works
app.get('/', function (req, res) {
  console.log("Reminder App");
  res.end("Reminder App!")
});


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

app.post('/users/:userId/reminders', function (req, res) {
  var inputUserId = req.params.userId; //take in user id from post
  var location = inputUserId - 1; //takes user ID and subtracts one for location in array
  var date = new Date(); //take js date into variable



  if(!users[location]){//if user not found in users array
    res.status(404);
    res.json({"message" : "userId not found: " + inputUserId});
  }else{
    var id = {"id" : users[location].reminders.length + 1};
    var newRem = req.body; //take in body msg
    newRem.reminder.created = date;
    users[location].reminders.push(newRem);
    res.status(200); //succesful
    res.json(id);
  }

})