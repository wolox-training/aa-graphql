const { mutate, apolloServer } = require('../server.spec'),
  { createUser } = require('../users/graphql'),
  { buyAlbum } = require('./graphql'),
  albumsFactory = require('../factories/album'),
  photosFactory = require('../factories/photos'),
  usersFactory = require('../factories/user');

const axios = require('axios');

describe('albums', () => {
  describe('mutations', () => {
    it('should buy an album succesfully', async () => {
      const fakeAlbums = await albumsFactory.attributesMany(1);
      const fakePhotos = await photosFactory.attributesMany(5);
      await axios.setMockAlbums(fakeAlbums);
      await axios.setMockPhotos(fakePhotos);
      const user = await usersFactory.attributes({ email: 'ale@wolox.com.ar' });
      await mutate(await createUser(user));
      apolloServer.setContext({ user: { email: user.email } });
      const resBuyAlbum = await mutate(await buyAlbum(1));
      expect(resBuyAlbum.data.buyAlbum.title).toBe(fakeAlbums[0].title);
      expect(resBuyAlbum.errors).toBe(undefined);
    });
    it('should return unhauthorized error', async () => {
      const fakeAlbums = await albumsFactory.attributesMany(1);
      const fakePhotos = await photosFactory.attributesMany(5);
      await axios.setMockAlbums(fakeAlbums);
      await axios.setMockPhotos(fakePhotos);
      const user = await usersFactory.attributes({ email: 'ale@wolox.com.ar' });
      await mutate(await createUser(user));
      apolloServer.resetContext();
      const resBuyAlbum = await mutate(await buyAlbum(1));
      expect(typeof resBuyAlbum.errors).toBe('object');
    });
    it('should return not foun error', async () => {
      const fakeAlbums = await albumsFactory.attributesMany(1);
      const fakePhotos = await photosFactory.attributesMany(5);
      await axios.setMockAlbums(fakeAlbums);
      await axios.setMockPhotos(fakePhotos);
      const user = await usersFactory.attributes({ email: 'ale@wolox.com.ar' });
      await mutate(await createUser(user));
      apolloServer.setContext({ user: { email: 'roman@wolox.com.ar' } });
      const resBuyAlbum = await mutate(await buyAlbum(1));
      expect(typeof resBuyAlbum.errors).toBe('object');
    });
  });
});
