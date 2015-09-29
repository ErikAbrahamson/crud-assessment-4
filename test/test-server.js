process.env.NODE_ENV = 'test';

var chai = require('chai'),
  chaiHttp = require('chai-http'),
  server = require('../server/app'),
  should = chai.should(),
  mongoose = require('mongoose');
  Vehicle = require('../server/models/vehicle');

chai.use(chaiHttp);

describe('Vehicles', function() {

  beforeEach(function(done) {
    var dummyVehicle = new Vehicle({
      maker: 'Audi',
      model: 'S4',
      year: '2001',
      engine: {
        displacement: '2.7',
        horsepower: 480,
        cylinders: 6
      },
      previous_owners: 4,
      new: false
    });
    dummyVehicle.save(function(err) {
      done();
    });
  });

  afterEach(function(done) {
    Vehicle.collection.drop();
    done();
  });
  // GET all
  it('should list ALL vehicles on /api/v1/vehicles GET', function(done) {
    chai.request(server)
      .get('/api/v1/vehicles')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body[0].should.have.property('_id');
        res.body[0].should.have.property('maker');
        res.body[0].should.have.property('model');
        res.body[0].should.have.property('year');
        res.body[0].should.have.property('engine');
        res.body[0].maker.should.equal('Audi');
        done();
      });
    });
  // GET single
  it('should get a single exercise on /api/v1/vehicles GET', function(done) {
    var testVehicle = new Vehicle({
      maker: 'BMW',
      model: 'M3',
      year: '2004',
      engine: {
        displacement: '3.2',
        horsepower: 320,
        cylinders: 6
      },
      previous_owners: 1,
      new: false
    });
    testVehicle.save(function(err, data) {
      chai.request(server)
        .get('/api/v1/vehicles/' + data.id)
        .end(function(err, res) {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.have.property('_id');
          res.body.should.have.property('maker');
          res.body.should.have.property('model');
          res.body.should.have.property('year');
          res.body.should.have.property('engine');
          res.body._id.should.equal(data.id);
          done();
        });
    });
  });
  // PUT single
  it('should update a single exercise', function(done) {
    chai.request(server)
      .get('/api/v1/vehicles/')
      .end(function(err, res) {
        chai.request(server)
          .put('/api/v1/vehicles/' + res.body[0]._id)
          .send({'maker': 'I\'ve been changed!'})
          .end(function(err, res) {
            res.should.have.status(200);
            res.body.maker.should.equal('I\'ve been changed!');
            done();
          });
      });
  });
  // Delete single
  it('should delete a single exercise', function(done){
    chai.request(server)
      .get('/api/v1/vehicles/')
      .end(function(err, res) {
        chai.request(server)
          .delete('/api/v1/vehicles/' + res.body[0]._id)
          .end(function(err, res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            done();
          });
      });
  });
});
