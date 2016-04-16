'use strict'

const User = require('../model/user');
const Q = require('q');

module.exports = Q.async(function *(token, profile) {
  let user = yield User.findOne({'vkontakte.token' : token});

  if (!user) {
    user = yield User.create({
      email: null,
      vkontakte : {
        id    : profile.id,
        token : token,
        name  : profile._json.first_name + ' ' + profile._json.last_name,
        image : profile._json.photo || ''
      }
    });
  }

  return user;
});
