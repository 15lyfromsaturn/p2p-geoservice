'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('./auth/index');

const app = express();

app.use(session({ secret: 'p2pgeo',
  saveUninitialized: true,
  resave : true,
   cookie: {
     secure: false,
     maxAge: 22909943600
   }
 }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('public'));
app.use(function(req, res, next) {
  res.setHeader('Content-type', 'application/json');
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,HEAD,OPTIONS');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, X-HTTP-Method-Override');
	next();
});

require('./auth/routes')(app, passport);

app.get('/', function(req, res) {
    res.send(JSON.stringify(req.session.passport)).end();
});

app.listen(process.env.PORT, function() {
  console.log('Application started on :' + process.env.PORT);
});
