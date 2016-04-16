'use strict'

const db = require('../service/database');
const Schema = db.Schema;

const UserSchema = new Schema({
  email     : String,
  connected : { type: Date, default : Date.now },
  created   : { type: Date, default: Date.now },
  twitter : {
    id    : String,
    token : String,
    name  : String,
    image : String
  },
  facebook : {
    id     : String,
    token  : String,
    name   : String,
    image  : String
  }
});

module.exports = db.model('User', UserSchema);
