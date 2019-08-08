const axios = jest.genMockFromModule('axios');

let mockAlbums = Object.create(null);
let mockPhotos = Object.create(null);

function setMockAlbums(albums) {
  mockAlbums = albums;
}
function setMockPhotos(photos) {
  mockPhotos = photos;
}

function get(url) {
  if (url.includes('albums/')) {
    return Promise.resolve({ data: mockAlbums[0] });
  }
  if (url.includes('albums')) {
    return Promise.resolve({ data: mockAlbums });
  }
  if (url.includes('photos')) {
    return Promise.resolve({ data: mockPhotos });
  }
  return null;
}

axios.setMockAlbums = setMockAlbums;
axios.setMockPhotos = setMockPhotos;
axios.get = get;

module.exports = axios;
