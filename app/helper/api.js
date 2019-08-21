const axios = require('axios');
const redisClient = require('redis').createClient();
const DataLoader = require('dataloader');

const RedisDataLoader = require('redis-dataloader')({ redis: redisClient });
const { url } = require('../../config').common.api;

exports.albumLoader = () =>
  new RedisDataLoader(
    'album',
    new DataLoader(
      arrayId =>
        Promise.all(
          arrayId.map(id => {
            const endpoint = `${url}albums/${id}`;
            return axios.get(endpoint);
          })
        ),
      { cache: false }
    ),
    {
      cache: true,
      serialize: info => info.data
    }
  );

exports.allAlbumsLoader = () =>
  new RedisDataLoader(
    'allAlbums',
    new DataLoader(arrayId =>
      Promise.all(
        arrayId.map(() => {
          const endpoint = `${url}albums`;
          return axios.get(endpoint);
        })
      )
    ),
    {
      cache: true,
      serialize: info => info.data
    }
  );

exports.photosLoader = () =>
  new RedisDataLoader(
    'photos',
    new DataLoader(arrayAlbumId =>
      Promise.all(
        arrayAlbumId.map(albumId => {
          const query = `?albumId=${albumId}`;
          const endpoint = `${url}photos${query}`;
          return axios.get(endpoint);
        })
      )
    ),
    {
      cache: true,
      serialize: info => info.data
    }
  );
