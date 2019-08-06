const errors = require('../errors'),
  { user: User } = require('../models');

exports.createUser = user =>
  User.createModel(user)
    .then(userCreated => userCreated)
    .catch(e => {
      throw errors.defaultError(e.message);
    });
