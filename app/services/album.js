const { get } = require('axios');
const { url } = require('../../config').common.api;
const { getByEmail: getUserByEmail } = require('../models').user;
const { getOne: getOneTransaction, createModel: createTransaction } = require('../models').transaction;
const { badRequest, conectionError, unauthorized, notFound, databaseError } = require('../errors');

exports.getAlbum = id => {
  const endpoint = `${url}albums/${id}`;
  return get(endpoint)
    .then(response => response.data)
    .catch(e => {
      throw conectionError(e.message);
    });
};

exports.getPhotosOfAlbum = albumId => {
  const query = `?albumId=${albumId}`;
  const endpoint = `${url}photos${query}`;
  return get(endpoint)
    .then(response => response.data)
    .catch(e => {
      throw conectionError(e.message);
    });
};

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

exports.getAllAlbums = (offset, limit, filter, orderBy) => {
  const endpoint = `${url}albums`;
  return get(endpoint)
    .then(response => response.data)
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
};

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
      return getOneTransaction({ albumId, userId: userDB.dataValues.id })
        .catch(e => {
          throw databaseError(e);
        })
        .then(transaction => {
          if (transaction) {
            throw badRequest('Album alredy bought');
          }
          return createTransaction({ albumId, userId: userDB.dataValues.id })
            .catch(e => {
              throw databaseError(e);
            })
            .then(() => exports.getAlbum(albumId));
        });
    });
};
