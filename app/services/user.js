const { databaseError, badRequest, unauthorized } = require('../errors'),
  { createModel: createUser, getByEmail: getUserByEmail } = require('../models').user,
  { encrypt, validate } = require('../helper/encryptation'),
  { validatePassword } = require('../helper/validator'),
  { encrypt: generateToken } = require('../helper/token');

const logger = require('../logger');

exports.createUser = user => {
  validatePassword(user.password);
  return encrypt(user.password).then(hash =>
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
};

exports.logIn = logIn =>
  getUserByEmail(logIn.email)
    .then(user => {
      if (!user) {
        throw badRequest('The email not exist');
      }
      return validate(logIn.password, user.dataValues.password).then(res => {
        if (!res) {
          throw unauthorized('Invalid password');
        }
        return generateToken({ email: logIn.email });
      });
    })
    .catch(e => {
      if (e.extensions) {
        throw e;
      }
      throw databaseError(e.message);
    });
