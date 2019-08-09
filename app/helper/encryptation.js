const bcrypt = require('bcrypt');
const errors = require('../errors');

const saltRounds = 10;

exports.encrypt = password =>
  bcrypt.hash(password, saltRounds).catch(e => {
    throw errors.defaultError(e);
  });
