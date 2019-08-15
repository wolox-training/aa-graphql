const axios = require('axios');
const { url } = require('../../config').common.api;
const errors = require('../errors');
const { user: User } = require('../models');
const { transaction: Transaction } = require('../models');
const redisClient = require('redis').createClient();
const DataLoader = require('dataloader');
const RedisDataLoader = require('redis-dataloader')({ redis: redisClient });

const albumLoader = new RedisDataLoader(
  'album',
  new DataLoader(
    arrayId =>
      Promise.resolve(
        arrayId.map(id => {
          const endpoint = `${url}albums/${id}`;
          return axios.get(endpoint);
        })
      ),
    { cache: false }
  ),
  {
    // caching here is a local in memory cache. Caching is always done
    // to redis.
    cache: true,
    serialize: info => JSON.stringify(info.data)
  }
);

const allAlbumsLoader = new RedisDataLoader(
  'allAlbums',
  new DataLoader(arrayId =>
    Promise.resolve(
      arrayId.map(() => {
        const endpoint = `${url}albums`;
        return axios.get(endpoint);
      })
    )
  ),
  {
    // caching here is a local in memory cache. Caching is always done
    // to redis.
    cache: true,
    serialize: info => JSON.stringify(info.data)
  }
);

const photosLoader = new RedisDataLoader(
  'photos',
  new DataLoader(arrayAlbumId =>
    Promise.resolve(
      arrayAlbumId.map(albumId => {
        const query = `?albumId=${albumId}`;
        const endpoint = `${url}photos${query}`;
        return axios.get(endpoint);
      })
    )
  ),
  {
    // caching here is a local in memory cache. Caching is always done
    // to redis.
    cache: true,
    serialize: info => JSON.stringify(info.data)
  }
);

exports.getAlbum = id =>
  albumLoader.load(id).catch(e => {
    throw errors.conectionError(e.message);
  });

exports.getPhotosOfAlbum = albumId =>
  photosLoader.load(albumId).catch(e => {
    throw errors.conectionError(e.message);
  });

const sortFunction = (array, orderBy) =>
  array.sort((a, b) => {
    if (!a[orderBy] || !b[orderBy]) {
      throw errors.badRequest('The orderBy parameter do not exist');
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
  allAlbumsLoader
    .load('NaN')
    .catch(e => {
      throw errors.conectionError(e.message);
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

exports.buyAlbum = async (albumId, context) => {
  const { user } = context;
  if (!user) {
    throw errors.unauthorized('User not authorized');
  }
  const userDB = await User.getByEmail(user.email).catch(e => {
    throw errors.databaseError(e);
  });
  if (!userDB) {
    throw errors.notFound('User not found');
  }
  const transaction = await Transaction.getOne({ albumId, userId: userDB.dataValues.id }).catch(e => {
    throw errors.databaseError(e);
  });
  if (transaction) {
    throw errors.badRequest('Album alredy bought');
  }
  await Transaction.createModel({ albumId, userId: userDB.dataValues.id }).catch(e => {
    throw errors.databaseError(e);
  });
  return exports.getAlbum(albumId);
};
