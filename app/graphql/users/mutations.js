const { gql } = require('apollo-server'),
  usersService = require('../../services/user');

module.exports = {
  mutations: {
    user: (_, { firstName, lastName, email, password }) =>
      usersService.createUser({ firstName, lastName, email, password })
  },
  schema: gql`
    extend type Mutation {
      user(firstName: String!, lastName: String!, email: String!, password: String!): User!
    }
  `
};
