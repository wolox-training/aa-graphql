const errors = require('../errors'),
  { user: User } = require('../models'),
  bcrypt = require('bcrypt');

const logger = require('../logger');

const saltRounds = 10;

exports.createUser = user =>
  bcrypt
    .hash(user.password, saltRounds)
    .then(hash =>
      User.createModel({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: hash
      })
        .then(newUser => {
          logger.info('User created');
          return newUser;
        })
        .catch(e => {
          throw errors.databaseError(e.message);
        })
    )
    .catch(e => {
      logger.error(e.message);
      if (e.extensions) {
        throw e;
      }
      throw errors.defaultError(e.message);
    });
