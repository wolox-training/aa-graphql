const { gql } = require('apollo-server');
const { getAlbum, getAllAlbums } = require('../../services/album');

module.exports = {
  queries: {
    album: (_, params) => getAlbum(params.id),
    albums: (_, params) => getAllAlbums(params.offset, params.limit, params.filter, params.orderBy)
  },
  schema: gql`
    extend type Query {
      album(id: ID): Album!
      albums(offset: Int, limit: Int, filter: String, orderBy: String): [Album!]!
    }
  `
};