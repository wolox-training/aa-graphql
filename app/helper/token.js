const jwt = require('jsonwebtoken');

const { defaultError, unauthorized } = require('../errors');
const secretKey = require('../../config').common.jwt.secret_key;

exports.encrypt = data => {
  try {
    return jwt.sign(data, secretKey);
  } catch (e) {
    throw defaultError(e.message);
  }
};

exports.decode = token => {
  try {
    return jwt.verify(token, secretKey);
  } catch (e) {
    throw unauthorized('User not authorized');
  }
};
