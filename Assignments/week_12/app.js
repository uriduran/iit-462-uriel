$(document).ready(function() {
  "use strict";
  $.ajaxSetup({
    contentType: "application/json; charset=utf-8"
  });

  //GET ALL USER REMINDERS
  var viewreminders = function ($id) {
    var $link="http://localhost:3000/users/" + $id + "/reminders";
    $.get($link, function(data, status){
      data.forEach(function (blah) {
        var $output = $("<li>");
        $output.text("Title: " + blah.title + " Description: " + blah.description + " Created: " + blah.created)
        $(".output").append($output);
      });
    });
  }

  $("#viewreminders button").on("click", function() {
    var $field1 = $(".viewreminder");
    var $id = $field1.val();
    $field1.val("");
    viewreminders($id);
  });
  
  //POST REMINDER
  var addreminder = function ($title, $des, $id) {
    var newRemind  =   {"reminder" : {
      "title" : $title,
      "description" : $des
    }};
    $.post("http://localhost:3000/users/"+ $id +"/reminders", JSON.stringify(newRemind) , function(req, res){
      var $output = $("<p>");
      $output.text("New reminderID: " + req.id);
      $(".output").html($output);
    });
  }
  //GET REMINDER
  var searchreminder = function ($iduser, $idrem) {
    var $link="http://localhost:3000/users/" + $iduser + "/reminders/" + $idrem;
    $.get($link, function(data, status){
      var $output = $("<p>");
      $output.text("Title: " + data.title + " Description: " + data.description + " Created: " + data.created);
      $(".output").html($output);
    });
  }
  //DELETE SINGLE REMINDER
  var deletereminder = function ($iduser, $idrem) {
    var $link="http://localhost:3000/users/" + $iduser + "/reminders/" + $idrem;
    $.ajax({
      url: $link,
      type: 'DELETE',
      data: "{}",
      contentType: "json",
      success: function(req) {
        var $output = $("<p>");
        $output.text("reminderId: " + $idrem + " has been deleted");
        $(".output").html($output);
      }
    });
  }
  //DELETE USER
  var deleteuser = function ($iduser) {
    var $link="http://localhost:3000/users/" + $iduser;
    $.ajax({
      url: $link,
      type: 'DELETE',
      data: "{}",
      contentType: "json",
      success: function(req) {
        var $output = $("<p>");
        $output.text("userId: " + $iduser + " has been deleted");
        $(".output").html($output);
      }
    });
  }
  //DELETE ALL USER REMINDERS
  var deletereminders = function ($iduser) {
    var $link="http://localhost:3000/users/" + $iduser + "/reminders";
    $.ajax({
      url: $link,
      type: 'DELETE',
      data: "{}",
      contentType: "json",
      success: function(req) {
        var $output = $("<p>");
        $output.text("All reminders have been deleted for userID: " + $iduser);
        $(".output").html($output);
      }
    });
  }


  //SUBMIT BUTTONS TO TAKE IN INPUT
  $("#viewusers button").on("click", function() {
    viewusers();
  });

  //GET USERS
  var viewusers = function () {
    $.get("http://localhost:3000/users", function(data, status){
      var $output = $("<p>");
      $output.text(JSON.stringify(data));
      $(".output").html($output);
    });
  }
  $("#searchuser button").on("click", function() {
    var $field1 = $(".searchuser");
    var $id = $field1.val();
    $field1.val("");
    searchuser($id);
  });

    //GET USER ID
    var searchuser = function ($id) {
      var $link="http://localhost:3000/users/" + $id;
      $.get($link, function(data, status){
        var $output = $("<p>");
        $output.text("Username: " + data.name + " Email: " + data.email);
        $(".output").html($output);
      });
    }
  $("#adduser button").on("click", function() {
    var $field1 = $(".addname");
    var $field2 = $(".addemail");
    var $name = $field1.val();
    var $email = $field2.val();
    $field1.val("");
    $field2.val("");
    adduser($name, $email);
  });

    //POST USER
    var adduser = function ($name, $email) {
      var newUser =   {'user' : {
        "name" : $name,
        "email" : $email
      }};
      $.post("http://localhost:3000/users", JSON.stringify(newUser) , function(req, res){
        var $output = $("<p>");
        $output.text("New userID: " + req.id);
        $(".output").html($output);
  
      }, "json");
    }


  $("#addreminder button").on("click", function() {
    var $field1 = $(".addtitle");
    var $field2 = $(".adddes");
    var $field3 = $(".userid");
    var $title = $field1.val();
    var $des = $field2.val();
    var $id = $field3.val();
    $field1.val("");
    $field2.val("");
    $field3.val("");
    addreminder($title, $des, $id);
  });

  $("#searchreminder button").on("click", function() {
    var $field1 = $(".search");
    var $field2 = $(".searchrem");
    var $iduser = $field1.val();
    var $idrem = $field2.val();
    $field1.val("");
    $field2.val("");
    searchreminder($iduser, $idrem);
  });

  $("#deletereminder button").on("click", function() {
    var $field1 = $(".deluser");
    var $field2 = $(".delremid");
    var $iduser = $field1.val();
    var $idrem = $field2.val();
    $field1.val("");
    $field2.val("");
    deletereminder($iduser, $idrem);
  });

  $("#deleteuser button").on("click", function() {
    var $field1 = $(".deluserid");
    var $iduser = $field1.val();
    $field1.val("");
    deleteuser($iduser);
  });
  
  $("#deleteall button").on("click", function() {
    var $field1 = $(".delall");
    var $iduser = $field1.val();
    $field1.val("");
    deletereminders($iduser);
  });
});


  //CLEAR
  $(".clear").on("click", function() {
    $(".output").html("");
    $(".input").val("");
  });