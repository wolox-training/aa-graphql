const { gql } = require('apollo-server');

const rootTypes = gql`
  extend type Query {
    user(id: ID, firstName: String, email: String): User!
    users: [User]
  }
  extend type Mutation {
    user(user: UserInput!): User!
    logIn(logIn: LoginInput!): String!
  }
`;

const customTypes = gql`
  type User {
    firstName: String! @deprecated(reason: "We join in name")
    lastName: String! @deprecated(reason: "We join in name")
    name: String!
    email: String!
    password: String!
    id: ID!
  }
`;

const inputTypes = gql`
  input UserInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }
  input LoginInput {
    email: String!
    password: String!
  }
`;

exports.typeDefs = [rootTypes, customTypes, inputTypes];
