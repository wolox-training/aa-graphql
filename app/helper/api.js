const { get } = require('axios');
const RedisClient = require('redis');
const DataLoader = require('dataloader');

const { host, port, name } = require('../../config').common.redis;
const RedisDataLoader = require('redis-dataloader')({
  redis: RedisClient.createClient({ host, port, db: name })
});
const { url } = require('../../config').common.api;

exports.albumLoader = () =>
  new RedisDataLoader(
    'album',
    new DataLoader(
      arrayId =>
        Promise.all(
          arrayId.map(id => {
            const endpoint = `${url}albums/${id}`;
            return get(endpoint);
          })
        ),
      { cache: false }
    ),
    {
      serialize: info => JSON.stringify(info.data)
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
      serialize: info => JSON.stringify(info.data)
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
      serialize: info => JSON.stringify(info.data)
    }
  );
