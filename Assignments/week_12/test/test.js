process.env.NODE_ENV = 'test';
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
chai.use(chaiHttp);

describe('Reminders', () => {

  //Tests will post new user > post new reminder 
  //get user > get user reminders
  //delete specific reminder > delete all user reminders > delete user


  //Test posting a new user
  describe('/POST user', () => {
    it('it should post new user with userID', (done) => {
      let newuser =
      {'user' : {
        "name" : "Uriel",
        "email" : "uduran@hawk.iit.edu"
      }}
      chai.request(server)
      .post('/users')
      .send(newuser)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('id');
        done();
      });
    });
  });

  //test posting a reminder
  describe('/POST reminder', () => {
    let newremind  =   {"reminder" : {
      "title" : "Do HW",
      "description" : "finish web app hw"
    }}
    it('it should post a new reminder to a user', (done) => {
      let userId = 1;
      chai.request(server)
      .post('/users/' + userId + '/reminders')
      .send(newremind)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('id');
        done();
      });
    });
    it('it should not POST a new reminder if no userid found', (done) => {
      let userId = 2;
      chai.request(server)
      .post('/users/' + userId + '/reminders')
      .send(newremind)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql("userId not found: " + userId);
        done();
      });
    });
  });

  //test getting user by userID
  describe('/GET/:userid ', () => {
    it('it should GET a user by the given id', (done) => {
      let userId = 1;
      chai.request(server)
      .get('/users/' + userId)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('name');
        res.body.should.have.property('email');
        done();
      });
    });
    it('it should not get user if no userID found', (done) => {
      let userId = 2;
      chai.request(server)
      .get('/users/' + userId)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql("userId not found: " + userId);
        done();
      });
    });
  });


  //testing getting reminders
  describe('/GET/ reminders', () => {
    it('it should get all reminders of userID', (done) => {
      let userId = 1;
      chai.request(server)
      .get('/users/' + userId + '/reminders')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        done();
      });
    });
    it('it should not get reminders if no userID found', (done) => {
      let userId = 2;
      chai.request(server)
      .get('/users/' + userId + '/reminders')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql("userId not found: " + userId);
        done();
      });
    });
  });

  //get reminders for specific user
  describe('/GET/:userId/reminders/:reminderId users', () => {
    it('it should get reminders by spcific user ID', (done) => {
      let userId = 1;
      let remindId = 1;
      chai.request(server)
      .get('/users/' + userId + '/reminders/' + remindId)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('title');
        res.body.should.have.property('description');
        done();
      });
    });
    it('it should not GET reminder if no userID found', (done) => {
      let userId = 1;
      let remindId = 2;
      chai.request(server)
      .get('/users/' + userId + '/reminders/' + remindId)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql("reminderId not found: " + remindId);
        done();
      });
    });
  });

  //testing delete user reminder
  describe('/DELETE/:userId/reminders/:reminderId', () => {
    it('it should delete reminder by userID and reminderID', (done) => {
      let userId = 1;
      let remindId = 1;
      chai.request(server)
      .delete('/users/' + userId + '/reminders/' + remindId)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.eql({});
        done();
      });
    });
    it('it should not delete reminder if no reminder by that ID', (done) => {
      let userId = 1;
      let remindId = 3;
      chai.request(server)
      .delete('/users/' + userId + '/reminders/' + remindId)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql("reminderId not found: " + remindId);
        done();
      });
    });
  });

  //testing delete all user reminders
  describe('/DELETE/:userId/reminders', () => {
    it('it should delete all reminders by a user', (done) => {
      let userId = 1;
      chai.request(server)
      .delete('/users/' + userId + '/reminders')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.eql({});
        done();
      });
    });
    it('it should not delete reminders if no userid is found', (done) => {
      let userId = 2;
      chai.request(server)
      .delete('/users/' + userId + '/reminders')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql("userId not found: " + userId);
        done();
      });
    });
  });

  //testing delete user
  describe('/DELETE/:userId', () => {
    it('it should delete the user if userID found', (done) => {
      let userId = 1;
      chai.request(server)
      .delete('/users/' + userId)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.eql({});
        done();
      });
    });
    it('it should not delete a use rif no user is found', (done) => {
      let userId = 1;
      chai.request(server)
      .delete('/users/' + userId)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql("userId not found: " + userId);
        done();
      });
    });
  });

});