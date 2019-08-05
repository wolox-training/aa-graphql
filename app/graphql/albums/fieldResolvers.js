const { gql } = require('apollo-server');
const albumsService = require('../../services/album');

module.exports = {
  fieldResolvers: {
    photos: obj => albumsService.getPhotosOfAlbum(obj.id),
    artist: obj => albumsService.getArtistOfAlbum(obj.userId)
  },
  schema: gql`
    extend type Query {
      photos(id: ID): [Photo]!
      artist(id: ID): Artist!
    }
  `
};
