const { databaseError } = require('../errors'),
  { user: User } = require('../models'),
  { encrypt } = require('../helper/encryptation');

const logger = require('../logger');

exports.createUser = user =>
  encrypt(user.password).then(hash =>
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
        logger.error(e.message);
        throw databaseError(e.message);
      })
  );
