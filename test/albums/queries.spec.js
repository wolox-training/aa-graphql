const { query } = require('../server.spec'),
  { getAlbum, getAlbums } = require('./graphql'),
  albumFactory = require('../factories/album'),
  photoFactory = require('../factories/photos'),
  axios = require('axios');

describe('albums', () => {
  describe('queries', () => {
    it('should get album properly', async () => {
      const fakeAlbums = await albumFactory.attributesMany(1);
      const fakePhotos = await photoFactory.attributesMany(5);
      await axios.setMockAlbums(fakeAlbums);
      await axios.setMockPhotos(fakePhotos);
      await query(getAlbum(1)).then(res =>
        expect(res.data).toEqual({
          album: {
            userId: fakeAlbums[0].userId,
            id: fakeAlbums[0].id,
            title: fakeAlbums[0].title,
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
    });
  });
});
