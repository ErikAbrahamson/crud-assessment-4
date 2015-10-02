var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

  var User = new Schema({
    email: String,
    password: String
  });

module.exports = mongoose.model('users', User);
