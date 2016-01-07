var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var AccessTokenSchema = new Schema({
  ttl: Date,
  userId: ObjectId,
  accessToken: String
});

AccessTokenSchema.plugin(findOrCreate);

module.exports = mongoose.model('AccessToken', AccessTokenSchema);