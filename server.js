var express = require('express');
var app = express();
var mongoose = require('mongoose');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var dbConfig = require('./config/database');
var resError = require('res-error');

mongoose.connect(dbConfig.url);

app.set('port', (process.env.PORT || 5000));

app.use(resError);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(passport.initialize());

require('./config/passport')(passport);
require('./app/routes/user')(app, passport);

app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'));
});


