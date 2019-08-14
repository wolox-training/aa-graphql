const { gql } = require('apollo-server');

module.exports = gql`
  type Query
  type Mutation
  type Subscription
  type User {
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
  type Album {
    id: ID!
    title: String!
    photos: [Photo!]!
  }
  type Photo {
    albumId: ID!
    id: Int!
    title: String!
    url: String!
    thumbnailUrl: String!
  }
`;
