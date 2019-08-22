const { getAll: getAllUsers, getOne: getOneUser } = require('../../models').user,
  { createUser, logIn } = require('../../services/user');

const getUser = (_, params) => getOneUser(params);
const getUsers = (_, params) => getAllUsers(params);

const newUser = (_, { user }) => createUser(user);
const userLogIn = (_, { logInInput }) => logIn(logInInput);

module.exports = {
  Query: {
    user: getUser,
    users: getUsers
  },
  Mutation: {
    user: newUser,
    logIn: userLogIn
  },
  User: {
    name: obj => `${obj.firstName} ${obj.lastName}`
  }
};
