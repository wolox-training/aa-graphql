const { gql } = require('apollo-server'),
  { userLoggedIn } = require('../events'),
  usersService = require('../../services/user');

module.exports = {
  mutations: {
    createUser: (_, { user }) => usersService.createUser(user),
    login: (_, { credentials }) => {
      // IMPORTANT: Not a functional login, its just for illustrative purposes
      userLoggedIn.publish(credentials.username);
      return {
        accessToken: 'example_token',
        refreshToken: 'example_refresh_token',
        expiresIn: 134567899123
      };
    }
  },
  schema: gql`
    extend type Mutation {
      createUser(user: UserInput!): User!
      login(credentials: LoginInput!): AccessToken
    }
  `
};
