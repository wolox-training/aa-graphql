const errors = require('../errors'),
  { user: User } = require('../models'),
  encryptationHelper = require('../helper/encryptation'),
  jwtHelper = require('../helper/token');

const logger = require('../logger');

exports.createUser = user =>
  encryptationHelper.encrypt(user.password).then(hash =>
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
        throw errors.databaseError(e.message);
      })
  );

exports.logIn = logIn =>
  User.getByEmail(logIn.email)
    .then(user => {
      if (!user) {
        throw errors.badRequest('The email not exist');
      }
      return encryptationHelper.validate(logIn.password, user.dataValues.password).then(res => {
        if (!res) {
          throw errors.unauthorized('Invalid password');
        }
        return jwtHelper.encrypt({ email: logIn.email });
      });
    })
    .catch(e => {
      if (e.extensions) {
        throw e;
      }
      throw errors.databaseError(e.message);
    });
