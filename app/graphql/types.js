const { gql } = require('apollo-server');

module.exports = gql`
  enum CacheControlScope {
    PUBLIC
    PRIVATE
  }
  directive @cacheControl(maxAge: Int, scope: CacheControlScope) on FIELD_DEFINITION | OBJECT | INTERFACE
  type Query
  type Mutation
  type Subscription
  type User @cacheControl(maxAge: 240) {
    firstName: String! @deprecated(reason: "We join in name")
    lastName: String! @deprecated(reason: "We join in name")
    name: String!
    email: String!
    password: String!
    id: ID!
  }
  type AccessToken {
    accessToken: String!
    #refreshToken: String!
    #expiresIn: Int!
  }
  type Album @cacheControl(maxAge: 240) {
    id: ID!
    title: String!
    photos: [Photo!]!
  }
  type Photo @cacheControl(maxAge: 240) {
    albumId: ID!
    id: Int!
    title: String!
    url: String!
    thumbnailUrl: String!
  }
`;
