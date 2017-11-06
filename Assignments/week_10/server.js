const express = require('express')
const bodyParser = require('body-parser')
const app = express()

//json parse
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

//init users array
var users = [];

//POST NEW USER
app.post('/users', function (req, res) {
    var id = {"id" : users.length + 1};//increments IDs in array by 1.
    var postUser = req.body;//take in info from body

    postUser.id = id.id;
    postUser.rems = [];//init array to hold reminders

    users.push(postUser);//succesful completion

    res.status(200);
    //Return succesful
    res.json(id);
});

//POST REMINDERS
app.post('/users/:userId/reminders', function (req, res) {
    //take in user id from post
    var inID = req.params.userId;
    var location = inID - 1;//takes user ID and subtracts one for location in array
    var date = new Date();//take js date into variable
    
    //if user not found in users array
    if(!users[location]){
      res.status(404);
      res.json({"message" : "userId not found: " + inID});
    }
    else {
      var id = {"id" : users[location].rems.length + 1};
      var nReminder = req.body;//take in body msg

      nReminder.id = id.id;
      nReminder.reminder.created = date;
      users[location].rems.push(nReminder);//push reminder into the corresponding user

      res.status(200);//succesful
      res.json(id);
    }
});

//GET USERS
app.get('/users/:userId', function (req, res) {
  var inID = req.params.userId;//take in params from GET
  var location = inID - 1;//ID minus 1 to find index of array

  if(!users[location]){//If location does not exist
    res.status(404);//not found
    res.json({"message" : "userId not found: " + inID});
  }
  else {
    res.status(200);
    res.json(users[location].user);
  }
});

//GET USER REMINDERS
app.get('/users/:userId/reminders', function (req, res) {
  var inID = req.params.userId;//Take in userId
  var uLocation = inID - 1; //find user location in the array

  if(!users[uLocation]){
    res.status(404);
    res.json({"message" : "userId not found: " + inID});
  }
  else {
    //find the location of the reminder based on the user location
    var rLocation = users[uLocation].rems.length - 1;
    var allRem = []; 
    users[uLocation].rems.forEach(function(ret) {
      allRem.push(ret.reminder)
    });

    res.status(200);//succesful
    res.json(allRem);
  }
});

//GET REMINDER BY ID
app.get('/users/:userId/reminders/:reminderId', function (req, res) {
  var inID = req.params.userId;//take in userID
  var remID = req.params.reminderId;//take in reminderId
  //find location of user and reminder in array
  var uLocation = inID - 1;
  var rLocation = remID - 1;

  if(!users[uLocation].rems[rLocation]){//is not found
    res.status(404);
    res.json({"message" : "reminderId not found: " + remID});
  }
  else {
    res.status(200);//found
    res.json(users[uLocation].rems[rLocation].reminder);//output
  }
});

//DELETE USER
app.delete('/users/:userId', function (req, res) {
  var inID = req.params.userId;//take in ID from params
  var uLocation = inID - 1;//find user location in array

  if(!users[uLocation]){
    res.status(404);
    res.json({"message" : "userId not found: " + inID})
  }
  else {
    delete users[uLocation];//delete user
    res.send("204 No Content");
  }
});

//Delete all reminders from user
app.delete('/users/:userId/reminders', function (req, res) {
  var inID = req.params.userId;//input user id
  var uLocation = inID - 1; //find position in array

  if(!users[uLocation]){//if not found
    res.status(404)
    res.json({"message" : "userId not found: " + inID})
  }
  else {
    users[uLocation].rems = [ ];//empty the users "sub array"
    res.status(204);
    res.send("204 No Content");
  }
});

//DELETE SPECIFIC REMINDER
app.delete('/users/:userId/reminders/:reminderId', function (req, res) {
  //Take in user id and reminder id from params
  var inID = req.params.userId;
  var remID = req.params.reminderId;
  //find location in array
  var rLocation = remID - 1;
  var uLocation = inID - 1;

  if(!users[uLocation].rems[rLocation]){
    res.status(404);
    res.json({"message" : "reminderId not found: " + remID})
  }
  else {
    delete users[uLocation].rems[rLocation];//delete specific array
    res.send("204 No Content");
  }
});