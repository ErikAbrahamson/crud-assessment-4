process.env.NODE_ENV = 'test';

var chai = require('chai'),
  chaiHttp = require('chai-http'),
  server = require('../server/app'),
  should = chai.should(),
  mongoose = require('mongoose');
  Project = require('../server/models/project');

chai.use(chaiHttp);

describe('Projects', function() {

  beforeEach(function(done) {
    var dummyProject = new Project({
      name: 'Testing with Mocha and Chai',
      description: 'Dummy description',
      tags: ['Mocha','Chai','Node.js'],
      group: 'Five',
      group_members: ['Jim', 'Bob']
    });
    dummyProject.save(function(err) {
      done();
    });
  });

  afterEach(function(done) {
    Project.collection.drop();
    done();
  });
  // GET all
  it('should list ALL projects on /api/v1/projects GET', function(done) {
    chai.request(server)
      .get('/api/v1/projects')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body[0].should.have.property('_id');
        res.body[0].should.have.property('name');
        res.body[0].should.have.property('description');
        res.body[0].should.have.property('tags');
        res.body[0].should.have.property('group');
        res.body[0].name.should.equal('Testing with Mocha and Chai');
        res.body[0].tags[0].should.equal('Mocha');
        res.body[0].tags[1].should.equal('Chai');
        done();
      });
    });
  // GET single
  it('should get a single exercise on /api/v1/projects GET', function(done) {
    var testProject = new Project({
      name: 'Mocha Test',
      description: 'Mocha Description',
      tags: ['tag','another tag'],
      group: 'One',
      group_members: ['Jim', 'Bob']
    });
    testProject.save(function(err, data) {
      chai.request(server)
        .get('/api/v1/projects/' + data.id)
        .end(function(err, res) {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.have.property('_id');
          res.body.should.have.property('name');
          res.body.should.have.property('description');
          res.body.should.have.property('group');
          res.body.should.have.property('tags');
          res.body._id.should.equal(data.id);
          done();
        });
    });
  });
  // PUT single
  it('should update a single exercise', function(done) {
    chai.request(server)
      .get('/api/v1/projects/')
      .end(function(err, res) {
        chai.request(server)
          .put('/api/v1/projects/' + res.body[0]._id)
          .send({'name': 'I\'ve been changed!'})
          .end(function(err, res) {
            res.should.have.status(200);
            res.body.name.should.equal('I\'ve been changed!');
            done();
          });
      });
  });
  // Delete single
  it('should delete a single exercise', function(done){
    chai.request(server)
      .get('/api/v1/projects/')
      .end(function(err, res) {
        chai.request(server)
          .delete('/api/v1/projects/' + res.body[0]._id)
          .end(function(err, res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            done();
          });
      });
  });
});
