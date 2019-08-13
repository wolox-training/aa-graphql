const { genSalt, hash } = require('bcryptjs');
const { defaultError } = require('../errors');
const { error: logError } = require('../logger');

const saltRounds = 10;

exports.encrypt = password =>
  genSalt(saltRounds).then(salt =>
    hash(password, salt).catch(e => {
      logError(e.message);
      throw defaultError(e);
    })
  );
