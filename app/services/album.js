const { conectionError, badRequest, unauthorized, databaseError, notFound } = require('../errors');
const { getByEmail: getUserByEmail } = require('../models').user;
const { getOne: getOnePurchase, createModel: createPurchase } = require('../models').purchase;
const { albumLoader, allAlbumsLoader, photosLoader } = require('../helper/api');

exports.getAlbum = id =>
  albumLoader()
    .load(id)
    .catch(e => {
      throw conectionError(e.message);
    });

exports.getPhotosOfAlbum = albumId =>
  photosLoader()
    .load(albumId)
    .catch(e => {
      throw conectionError(e.message);
    });

const sortFunction = (array, orderBy) =>
  array.sort((a, b) => {
    if (!a[orderBy] || !b[orderBy]) {
      throw badRequest('The orderBy parameter do not exist');
    }
    if (a[orderBy] < b[orderBy]) {
      return -1;
    }
    if (a[orderBy] > b[orderBy]) {
      return 1;
    }
    return 0;
  });

exports.getAllAlbums = (offset, limit, filter, orderBy) =>
  allAlbumsLoader()
    .load('NaN')
    .catch(e => {
      throw conectionError(e.message);
    })
    .then(albums => {
      const processedAlbums = albums.slice();
      if (filter) {
        return processedAlbums.filter(album => album.title === filter);
      }
      if (orderBy) {
        sortFunction(processedAlbums, orderBy);
      }
      return processedAlbums.slice(offset, limit);
    });

exports.buyAlbum = (albumId, context) => {
  const { user } = context;
  if (!user) {
    throw unauthorized('User not authorized');
  }
  return getUserByEmail(user.email)
    .catch(e => {
      throw databaseError(e);
    })
    .then(userDB => {
      if (!userDB) {
        throw notFound('User not found');
      }
      return getOnePurchase({ albumId, userId: userDB.dataValues.id })
        .catch(e => {
          throw databaseError(e);
        })
        .then(transaction => {
          if (transaction) {
            throw badRequest('Album alredy bought');
          }
          return createPurchase({ albumId, userId: userDB.dataValues.id })
            .catch(e => {
              throw databaseError(e);
            })
            .then(() => exports.getAlbum(albumId));
        });
    });
};
