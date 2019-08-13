const { validateEmail } = require('../helper/validator');

exports.validateEmail = email => validateEmail(email);
