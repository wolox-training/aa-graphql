const jwt = require('jsonwebtoken');

const secretKey = require('../../config').common.jwt.secret_key;

exports.encrypt = data => jwt.sign(data, secretKey);
