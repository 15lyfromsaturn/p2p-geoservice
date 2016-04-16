'use strict'

module.exports = function(app, passport) {
  app.get('/api/auth/facebook',
    passport.authenticate('facebook'),
    function(req, res){});

  app.get('/api/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/' }),
    function(req, res) {
      res.redirect('/');
    });

  app.get('/api/auth/twitter',
    passport.authenticate('twitter'),
    function(req, res){});

  app.get('/api/auth/twitter/callback',
    passport.authenticate('twitter', { failureRedirect: '/' }),
    function(req, res) {
      res.redirect('/');
    });
}
