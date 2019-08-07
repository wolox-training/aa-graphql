const validator = require('validator');
const errors = require('../errors');

exports.validateEmail = email => {
  if (!validator.isEmail(email)) {
    throw errors.badRequest('No valid email');
  }
  if (!email.includes('@wolox.com.ar')) {
    throw errors.badRequest('Not wolox email');
  }
};

exports.validatePassword = password => {
  if (!validator.isAlphanumeric(password)) {
    throw errors.badRequest('Not alphanumeric password');
  }
  if (!validator.isLength(password, { min: 8 })) {
    throw errors.badRequest('Not long enough password');
  }
};
