var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: String,
  email: String,
  facebookId: String,
  accessToken: String,
  bonus: Number,
  skip: Number
});

module.exports = mongoose.model('User', UserSchema);