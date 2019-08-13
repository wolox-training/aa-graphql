const { query } = require('../server.spec'),
  { getAlbum, getAlbums, getAlbumsWithFilter, getAlbumsWithOffset } = require('./graphql'),
  albumFactory = require('../factories/album'),
  photoFactory = require('../factories/photos'),
  axios = require('axios');

describe('albums', () => {
  describe('queries', () => {
    it('should get album properly', async () => {
      const fakeAlbums = await albumFactory.attributesMany(3);
      const fakePhotos = await photoFactory.attributesMany(5);
      await axios.setMockAlbums(fakeAlbums);
      await axios.setMockPhotos(fakePhotos);
      await query(getAlbum(fakeAlbums[0].id)).then(res =>
        expect(res.data).toEqual({
          album: {
            userId: fakeAlbums[0].userId,
            id: fakeAlbums[0].id,
            title: fakeAlbums[0].title,
            photos: fakePhotos
          }
        })
      );
      await query(getAlbum(fakeAlbums[1].id)).then(res =>
        expect(res.data).toEqual({
          album: {
            userId: fakeAlbums[1].userId,
            id: fakeAlbums[1].id,
            title: fakeAlbums[1].title,
            photos: fakePhotos
          }
        })
      );
      await query(getAlbum(fakeAlbums[2].id)).then(res =>
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
    it('should get all albums properly', async () => {
      const fakeAlbums = await albumFactory.attributesMany(5);
      const fakePhotos = await photoFactory.attributesMany(5);
      await axios.setMockAlbums(fakeAlbums);
      await axios.setMockPhotos(fakePhotos);
      await query(getAlbums()).then(res => expect(res.data.albums).toHaveLength(5));
      await query(getAlbumsWithOffset(0, 3)).then(res => expect(res.data.albums).toHaveLength(3));
      await query(getAlbumsWithFilter(fakeAlbums[2].title)).then(res => {
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
