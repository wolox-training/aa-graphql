const { get } = require('axios');
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
            console(arrayId);
            const endpoint = `${url}albums/${id}`;
            return get(endpoint).then(response => {
              console.log(response);
              return response;
            });
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
          return get(endpoint);
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
          return get(endpoint);
        })
      )
    ),
    {
      cache: true,
      serialize: info => info.data
    }
  );
