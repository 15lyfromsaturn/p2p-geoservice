'use strict'

const User = require('../model/user');
const Q = require('q');

module.exports = Q.async(function *(token, profile) {
  let user = yield User.findOne({'facebook.token' : token});

  if (!user) {
    user = yield User.create({
      email: null,
      twitter : {
        id    : profile.id,
        token : token,
        name  : profile.displayName || profile.username,
        image : profile.photos ? profile.photos[0].value : ''
      }
    });
  }

  return user;
});
