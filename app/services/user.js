const { databaseError } = require('../errors'),
  { createModel: createUser } = require('../models').user,
  { encrypt } = require('../helper/encryptation');

const logger = require('../logger');

exports.createUser = user =>
  encrypt(user.password).then(hash =>
    createUser({
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
