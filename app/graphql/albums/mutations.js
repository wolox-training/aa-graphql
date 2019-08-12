const { gql } = require('apollo-server');
const albumsService = require('../../services/album');

module.exports = {
  mutations: {
    buyAlbum: (_, { albumId }, context) => albumsService.buyAlbum(albumId, context)
  },
  schema: gql`
    extend type Mutation {
      buyAlbum(albumId: ID): Album!
    }
  `
};
