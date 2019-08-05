const { gql } = require('apollo-server');
const albumsService = require('../../services/album');

module.exports = {
  queries: {
    album: (_, params) => albumsService.getAlbum(params.id),
    albums: (_, params) => albumsService.getAllAlbums(params.offset, params.limit, params.orderBy)
  },
  schema: gql`
    extend type Query {
      album(id: ID): Album!
      albums(offset: Int, limit: Int, orderBy: String): [Album!]!
    }
  `
};
