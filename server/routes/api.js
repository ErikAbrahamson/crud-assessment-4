var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose-q')(require('mongoose'), { spread: true }),
  Vehicle = require('../models/vehicle.js');

router.get('/vehicles', function(req, res, next) {
  Vehicle.findQ().then(function(result) {
      res.json(result);
    }).catch(function(error) {
      res.send(error);
    }).done();
});

router.get('/vehicles/:id', function(req, res, next) {
  var query = {'_id': req.params.id};
  Vehicle.findByIdQ(query)
    .then(function(result) {
      res.json(result);
    })
    .catch(function(error) {
      res.send(error);
    }).done();
});

router.post('/vehicles', function(req, res, next) {
  new Vehicle(req.body)
    .saveQ(function(error, data) {
     if (error) {
      res.json({'message': error});
    } else {
      res.json(data);
    }
  });
});

router.put('/vehicles/:id', function(req, res, next) {
  var query = { '_id': req.params.id }, options = { new: true };
  Vehicle.findOneAndUpdateQ(query, req.body, options)
    .then(function(result) {
      res.json(result);
    })
    .catch(function(error) {
      res.send(error);
    }).done();
});

router.delete('/vehicles/:id', function(req, res, next) {
  Vehicle.findByIdAndRemoveQ(req.params.id)
    .then(function(result) {
      res.json(result);
    })
    .catch(function(error) {
      res.json(error);
    }).done();
});

router.get('*', function(req, res) {
  res.sendFile('../client/public/index.html');
});

module.exports = router;
