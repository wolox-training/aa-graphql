const { getAlbum, getAllAlbums, buyAlbum, getPhotosOfAlbum } = require('../../services/album');

module.exports = {
  Query: {
    album: (_, params) => getAlbum(params.id),
    albums: (_, params) => getAllAlbums(params.offset, params.limit, params.filter, params.orderBy)
  },
  Mutation: {
    buyAlbum: (_, { albumId }, context) => buyAlbum(albumId, context)
  },
  Album: {
    photos: obj => getPhotosOfAlbum(obj.id)
  }
};
