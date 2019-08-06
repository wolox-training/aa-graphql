const { gql } = require('apollo-server');
const albumsService = require('../../services/album');

module.exports = {
  fieldResolvers: {
    photos: obj => albumsService.getPhotosOfAlbum(obj.id)
  },
  schema: gql`
    extend type Query {
      photos(id: ID): [Photo]!
    }
  `
};
