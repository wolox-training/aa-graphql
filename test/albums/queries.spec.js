const { query } = require('../server.spec'),
  { getAlbum, getAlbums, getAlbumsWithFilter, getAlbumsWithOffset } = require('./graphql'),
  albumFactory = require('../factories/album'),
  photoFactory = require('../factories/photos'),
  axios = require('axios');

describe('albums', () => {
  describe('queries', () => {
    it('should get album properly', () => {
      const fakeAlbumsProm = albumFactory.attributesMany(3).then(fakeAlbumsToMock => {
        axios.setMockAlbums(fakeAlbumsToMock);
        return fakeAlbumsToMock;
      });
      const fakePhotosProm = photoFactory.attributesMany(5).then(fakePhotosToMock => {
        axios.setMockPhotos(fakePhotosToMock);
        return fakePhotosToMock;
      });
      return Promise.all([fakeAlbumsProm, fakePhotosProm]).then(([fakeAlbums, fakePhotos]) => {
        query(getAlbum(fakeAlbums[0].id)).then(res =>
          expect(res.data).toEqual({
            album: {
              userId: fakeAlbums[0].userId,
              id: fakeAlbums[0].id,
              title: fakeAlbums[0].title,
              photos: fakePhotos
            }
          })
        );
        query(getAlbum(fakeAlbums[1].id)).then(res =>
          expect(res.data).toEqual({
            album: {
              userId: fakeAlbums[1].userId,
              id: fakeAlbums[1].id,
              title: fakeAlbums[1].title,
              photos: fakePhotos
            }
          })
        );
        query(getAlbum(fakeAlbums[2].id)).then(res =>
          expect(res.data).toEqual({
            album: {
              userId: fakeAlbums[2].userId,
              id: fakeAlbums[2].id,
              title: fakeAlbums[2].title,
              photos: fakePhotos
            }
          })
        );
      });
    });
    it('should get all albums properly', () => {
      const fakeAlbumsProm = albumFactory.attributesMany(5).then(fakeAlbumsToMock => {
        axios.setMockAlbums(fakeAlbumsToMock);
        return fakeAlbumsToMock;
      });
      const fakePhotosProm = photoFactory.attributesMany(5).then(fakePhotosToMock => {
        axios.setMockPhotos(fakePhotosToMock);
        return fakePhotosToMock;
      });
      return Promise.all([fakeAlbumsProm, fakePhotosProm]).then(([fakeAlbums, fakePhotos]) => {
        query(getAlbums()).then(res => expect(res.data.albums).toHaveLength(5));
        query(getAlbumsWithOffset(0, 3)).then(res => expect(res.data.albums).toHaveLength(3));
        query(getAlbumsWithFilter(fakeAlbums[2].title)).then(res => {
          expect(res.data.albums).toHaveLength(1);
          expect(res.data.albums[0]).toEqual({
            id: fakeAlbums[2].id,
            title: fakeAlbums[2].title,
            photos: fakePhotos
          });
        });
      });
    });
  });
});
