const { validateEmail } = require('../../middlewares/user.js');

const user = (resolve, root, args) => {
  validateEmail(args.email);
  return resolve(root, args);
};

module.exports = {
  // Here you add all the middlewares for the mutations, queries or field resolvers if you have any
  mutations: {
    user
  }
};
