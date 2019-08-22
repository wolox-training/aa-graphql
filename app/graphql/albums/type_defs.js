const { gql } = require('apollo-server');

const rootTypes = gql`
  extend type Query {
    album(id: ID): Album!
    albums(offset: Int, limit: Int, filter: String, orderBy: String): [Album!]!
  }
  extend type Mutation {
    buyAlbum(albumId: ID): Album!
  }
`;

const customTypes = gql`
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

const inputTypes = gql``;

exports.typeDefs = [rootTypes, customTypes, inputTypes];
