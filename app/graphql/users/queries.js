const { gql } = require('apollo-server'),
  { getAll: getAllUsers, getOne: getOneUser } = require('../../models').user;

module.exports = {
  queries: {
    user: (_, params) => getOneUser(params),
    users: (_, params) => getAllUsers(params)
  },
  schema: gql`
    extend type Query {
      user(id: ID, firstName: String, email: String): User!
      users: [User]
    }
  `
};
