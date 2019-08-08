const { gql } = require('apollo-server');

module.exports = {
  fieldResolvers: {
    name: obj => `${obj.firstName} ${obj.lastName}`
  },
  schema: gql`
    extend type Query {
      name(firstName: String!, lastName: String!): String!
    }
  `
};
