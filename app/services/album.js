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

exports.getAllAlbums = async (offset, limit, filter, orderBy = 'id') => {
  const endpoint = `${url}albums`;
  try {
    let albums = await fetch(endpoint);
    albums = await albums.json();
    console.log(filter);
    if (filter) {
      return albums.filter(album => album.title === filter);
    }
    albums.sort((a, b) => {
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
    if (offset !== undefined && limit !== undefined) {
      albums = albums.slice(offset, offset + limit);
    }
    return albums;
  } catch (e) {
    if (e.extensions) {
      throw e;
    }
    throw errors.conectionError(e.message);
  }
};
