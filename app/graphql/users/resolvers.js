const { getAll: getAllUsers, getOne: getOneUser } = require('../../models').user,
  { createUser, logIn } = require('../../services/user');

module.exports = {
  Query: {
    user: (_, params) => getOneUser(params),
    users: (_, params) => getAllUsers(params)
  },
  Mutation: {
    user: (_, { user }) => createUser(user),
    logIn: (_, { logInInput }) => logIn(logInInput)
  },
  User: {
    name: obj => `${obj.firstName} ${obj.lastName}`
  }
};
