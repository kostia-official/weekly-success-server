var isAuth = require('../middlewares/is-auth');
var User = require('../models/user');

module.exports = function (app, passport) {

  app.post('/auth/facebook/token',
    passport.authenticate('facebook-token', {session: false}),
    function (req, res) {
      res.send(req.user ? req.user : 401);
    }
  );

  app.get('/loggedin', isAuth, function (req, res) {
    User.findOne({_id: req.user.userId}, (err, user) => {
      if (err) return res.error(err);

      res.send(user);
    });
  });

  app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });

};