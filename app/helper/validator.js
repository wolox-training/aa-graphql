const { isEmail, isAlphanumeric, isLength } = require('validator');
const { badRequest } = require('../errors');

exports.validateEmail = email => {
  if (!isEmail(email)) {
    throw badRequest('No valid format email. It should be example@wolox.com.ar');
  }
  if (!email.includes('@wolox.com.ar')) {
    throw badRequest('Not wolox email. It should be example@wolox.com.ar');
  }
};

exports.validatePassword = password => {
  if (!isAlphanumeric(password)) {
    throw badRequest('Not alphanumeric password');
  }
  if (!isLength(password, { min: 8 })) {
    throw badRequest('Not long enough password. Minimun length is 8');
  }
};
