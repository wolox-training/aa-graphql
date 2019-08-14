const { gql } = require('apollo-server'),
  { createUser, logIn } = require('../../services/user');

module.exports = {
  mutations: {
    user: (_, { user }) => createUser(user),
    logIn: (_, { logInInput }) => logIn(logInInput)
  },
  schema: gql`
    extend type Mutation {
      user(user: UserInput!): User!
      logIn(logIn: LoginInput!): String!
    }
  `
};
