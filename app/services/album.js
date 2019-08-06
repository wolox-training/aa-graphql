const axios = require('axios');
const { url } = require('../../config').common.api;
const errors = require('../errors');

exports.getAlbum = id => {
  const endpoint = `${url}albums/${id}`;
  return axios
    .get(endpoint)
    .then(response => response.data)
    .catch(e => {
      throw errors.conectionError(e.message);
    });
};

exports.getPhotosOfAlbum = albumId => {
  const query = `?albumId=${albumId}`;
  const endpoint = `${url}photos${query}`;
  return axios
    .get(endpoint)
    .then(response => response.data)
    .catch(e => {
      throw errors.conectionError(e.message);
    });
};
