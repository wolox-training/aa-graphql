const bcrypt = require('bcryptjs');
const errors = require('../errors');
const logger = require('../logger');

const saltRounds = 10;

exports.encrypt = password =>
  bcrypt.genSalt(saltRounds).then(salt =>
    bcrypt.hash(password, salt).catch(e => {
      logger.error(e.message);
      throw errors.defaultError(e);
    })
  );
