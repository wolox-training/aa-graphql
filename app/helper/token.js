const jwt = require('jsonwebtoken');

const errors = require('../errors');
const secretKey = require('../../config').common.jwt.secret_key;

exports.encrypt = data => {
  try {
    return jwt.sign(data, secretKey);
  } catch (e) {
    throw errors.defaultError(e.message);
  }
};

exports.decode = token => {
  try {
    return jwt.verify(token, secretKey);
  } catch (e) {
    return null;
  }
};
