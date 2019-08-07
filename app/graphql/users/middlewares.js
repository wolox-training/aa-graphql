const logger = require('../../logger');
const usersMiddleware = require('../../middlewares/user.js');

const createUser = (resolve, root, args) => {
  logger.info("Middleware for 'createUser' mutation");
  // Add different actions that you want to be executed before your resolver, i.e: input validation or caching
  return resolve(root, args);
};

const user = (resolve, root, args) => {
  logger.info("Middleware for 'createUser' mutation");
  usersMiddleware.validateEmail(args.email);
  usersMiddleware.validatePassword(args.password);
  // Add different actions that you want to be executed before your resolver, i.e: input validation or caching
  return resolve(root, args);
};

module.exports = {
  // Here you add all the middlewares for the mutations, queries or field resolvers if you have any
  mutations: {
    createUser,
    user
  }
};
