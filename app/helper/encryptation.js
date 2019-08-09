const bcrypt = require('bcrypt');
const errors = require('../errors');
const logger = require('../logger');

const saltRounds = 10;

exports.encrypt = password =>
  bcrypt.hash(password, saltRounds).catch(e => {
    logger.error(e.message);
    throw errors.defaultError(e);
  });

exports.validate = (password, hash) =>
  bcrypt.compare(password, hash).catch(e => {
    throw errors.defaultError(e.message);
  });
