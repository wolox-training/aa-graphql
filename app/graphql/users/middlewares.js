const usersMiddleware = require('../../middlewares/user.js');

const user = (resolve, root, args) => {
  usersMiddleware.validateEmail(args.user.email);
  usersMiddleware.validatePassword(args.user.password);
  return resolve(root, args);
};
const logIn = (resolve, root, args) => {
  usersMiddleware.validateEmail(args.logIn.email);
  return resolve(root, args);
};

module.exports = {
  // Here you add all the middlewares for the mutations, queries or field resolvers if you have any
  mutations: {
    user,
    logIn
  }
};
