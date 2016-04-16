'use strict'

const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;

const Twitter  = require('./twitter');
const Facebook = require('./facebook');

const callBackPath = process.env.DOMAIN + 'api/auth/';

passport.use(
  new FacebookStrategy({
      clientID: process.env.FACEBOOK_APPID,
      clientSecret: process.env.FACEBOOK_SECRET,
      callbackURL: callBackPath + 'facebook/callback'
    },
    function(accessToken, refreshToken, profile, done) {
      Facebook(accessToken, profile).then(function(user) {
        done(null, user)
      }).catch(function(e) {
        done('Err')
      });
    }
));

passport.use(
  new TwitterStrategy({
      consumerKey: process.env.TWITTER_KEY,
      consumerSecret: process.env.TWITTER_SECRET,
      callbackURL: callBackPath + 'twitter/callback'
    },
    function (accessToken, refreshToken, profile, done) {
      Twitter(accessToken, profile).then(function(user) {
        done(null, user)
      }).catch(function(e) {
        done('Err')
      });
    }
));



passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});


module.exports = passport;