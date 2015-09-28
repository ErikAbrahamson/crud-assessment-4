var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

  var Vehicle = new Schema({
    maker: String,
    model: String,
    year: String,
    engine: {
      displacement: String,
      horsepower: String,
      cylinders: Number
    },
    previous_owners: Number,
    new: Boolean
  });

module.exports = mongoose.model('vehicles', Vehicle);
