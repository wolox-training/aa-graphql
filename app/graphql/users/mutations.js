const { gql } = require('apollo-server'),
  { createUser } = require('../../services/user');

module.exports = {
  mutations: {
    user: (_, { user }) => createUser(user)
  },
  schema: gql`
    extend type Mutation {
      user(user: UserInput!): User!
    }
  `
};
