const { gql } = require('apollo-server');
const { getPhotosOfAlbum } = require('../../services/album');

module.exports = {
  fieldResolvers: {
    photos: obj => getPhotosOfAlbum(obj.id)
  },
  schema: gql`
    extend type Query {
      photos(id: ID): [Photo]!
    }
  `
};
