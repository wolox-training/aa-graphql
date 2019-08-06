const { gql } = require('apollo-server');
const albumsService = require('../../services/album');

module.exports = {
  queries: {
    album: (_, params) => albumsService.getAlbum(params.id)
  },
  schema: gql`
    extend type Query {
      album(id: ID): Album!
    }
  `
};
