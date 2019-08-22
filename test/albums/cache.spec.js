const { query } = require('../server.spec'),
  { getAlbum } = require('./graphql'),
  albumFactory = require('../factories/album'),
  photoFactory = require('../factories/photos'),
  axios = require('axios'),
  moment = require('moment');

describe('albums', () => {
  describe('queries', () => {
    it('testing cache', () => {
      const fakeAlbumsProm = albumFactory.attributesMany(3).then(fakeAlbumsToMock => {
        axios.setMockAlbums(fakeAlbumsToMock);
        return fakeAlbumsToMock;
      });
      const fakePhotosProm = photoFactory.attributesMany(5).then(fakePhotosToMock => {
        axios.setMockPhotos(fakePhotosToMock);
        return fakePhotosToMock;
      });
      return Promise.all([fakeAlbumsProm, fakePhotosProm]).then(([fakeAlbums]) => {
        const hrstartNoChached = moment();
        return query(getAlbum(fakeAlbums[0].id)).then(() => {
          const hrendNoCached = moment().diff(hrstartNoChached);
          const hrstartCached = moment();
          return query(getAlbum(fakeAlbums[0].id)).then(() => {
            const hrendCached = moment().diff(hrstartCached);
            return expect(hrendNoCached - hrendCached).toBeGreaterThan(100);
          });
        });
      });
    });
  });
});
