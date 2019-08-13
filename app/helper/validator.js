const { isEmail, isAlphanumeric, isLength } = require('validator');
const { badRequest } = require('../errors');

exports.validateEmail = email => {
  if (!isEmail(email)) {
    throw badRequest('No valid email');
  }
  if (!email.includes('@wolox.com.ar')) {
    throw badRequest('Not wolox email');
  }
};

exports.validatePassword = password => {
  if (!isAlphanumeric(password)) {
    throw badRequest('Not alphanumeric password');
  }
  if (!isLength(password, { min: 8 })) {
    throw badRequest('Not long enough password');
  }
};
