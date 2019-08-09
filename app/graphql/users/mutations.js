const { gql } = require('apollo-server'),
  usersService = require('../../services/user');

module.exports = {
  mutations: {
    user: (_, { user }) => usersService.createUser(user),
    logIn: (_, { logIn }) => usersService.logIn(logIn)
  },
  schema: gql`
    extend type Mutation {
      user(user: UserInput!): User!
      logIn(logIn: LoginInput!): String!
    }
  `
};
