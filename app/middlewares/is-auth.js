var passport = require('passport');

module.exports = passport.authenticate('token', {session: false});