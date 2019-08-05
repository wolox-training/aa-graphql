const fetch = require('node-fetch');
const { url } = require('../../config').common.api;
const errors = require('../errors');

exports.getAlbum = async id => {
  const endpoint = `${url}albums/${id}`;
  try {
    const album = await fetch(endpoint);
    return album.json();
  } catch (e) {
    throw errors.conectionError(e.message);
  }
};

exports.getPhotosOfAlbum = async albumId => {
  const query = `?albumId=${albumId}`;
  const endpoint = `${url}photos${query}`;
  try {
    const photos = await fetch(endpoint);
    return photos.json();
  } catch (e) {
    throw errors.conectionError(e.message);
  }
};

exports.getArtistOfAlbum = async userId => {
  const endpoint = `${url}users/${userId}`;
  try {
    const user = await fetch(endpoint);
    return user.json();
  } catch (e) {
    throw errors.conectionError(e.message);
  }
};
