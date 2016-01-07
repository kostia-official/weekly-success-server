var FacebookTokenStrategy = require('passport-facebook-token');
var TokenStrategy = require('passport-accesstoken').Strategy;

var User = require('../app/models/user');
var AccessToken = require('../app/models/access-token');
var facebookConfig = require('./auth').facebook;

module.exports = function (passport) {

  passport.use(new FacebookTokenStrategy({
      clientID: facebookConfig.appId,
      clientSecret: facebookConfig.appSecret
    }, function (accessToken, refreshToken, profile, done) {
      User.findOne({
        'facebookId': profile.id
      }, function (err, user) {
        if (err) return done(err);

        if (user) {
          AccessToken.create({accessToken, userId: user._id});
          return done(err, user);
        }

        user = new User({
          name: profile.displayName,
          email: profile.emails[0].value,
          facebookId: profile.id
        });

        user.save(function (err, user) {
          if (err) console.log(err);
          AccessToken.create({accessToken, userId: user._id});
          return done(err, user);
        });
      });
    }
  ));

  passport.use(new TokenStrategy(
    function (accessToken, done) {
      AccessToken.findOne({accessToken}, function (err, res) {
        if (err) return done(err);
        if (!res) return done(null, false);

        return done(null, res);
      });
    }
  ));

};