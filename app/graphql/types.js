const { gql } = require('apollo-server');

module.exports = gql`
  type Query
  type Mutation
  type Subscription
  type User {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    id: ID!
  }
  type AccessToken {
    accessToken: String!
    refreshToken: String!
    expiresIn: Int!
  }
  type Album {
    id: ID!
    artist: Artist
    title: String!
    photos: [Photo!]!
  }
  type Photo {
    albumID: ID!
    id: Int!
    title: String!
    url: String!
    thumbnailUrl: String!
  }
  type Artist {
    id: ID!
    name: String!
    username: String!
    email: String!
    address: Address!
    phone: String!
    website: String!
    company: Company!
  }
  type Address {
    street: String!
    suite: String!
    city: String!
    zipcode: String!
  }
  type Company {
    name: String!
    catchPhrase: String!
    bs: String!
  }
`;
