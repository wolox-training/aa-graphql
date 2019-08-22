const { gql } = require('apollo-server');

module.exports = gql`
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
