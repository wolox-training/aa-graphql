const { mutate, apolloServer } = require('../server.spec'),
  { createUser } = require('../users/graphql'),
  { buyAlbum } = require('./graphql'),
  albumsFactory = require('../factories/album'),
  photosFactory = require('../factories/photos'),
  usersFactory = require('../factories/user');

const axios = require('axios');

describe('albums', () => {
  describe('mutations', () => {
    it('should buy an album succesfully', () => {
      const fakeAlbumsProm = albumsFactory.attributesMany(5).then(fakeAlbumsToMock => {
        axios.setMockAlbums(fakeAlbumsToMock);
        return fakeAlbumsToMock;
      });
      const fakePhotosProm = photosFactory.attributesMany(5).then(fakePhotosToMock => {
        axios.setMockPhotos(fakePhotosToMock);
        return fakePhotosToMock;
      });
      return usersFactory.attributes({ email: 'ale@wolox.com.ar' }).then(fakeUser =>
        mutate(createUser(fakeUser)).then(res => {
          expect(res.errors).toBe(undefined);
          return Promise.all([fakeAlbumsProm, fakePhotosProm]).then(([fakeAlbums, fakePhotos]) => {
            apolloServer.setContext({ user: { email: fakeUser.email } });
            return mutate(buyAlbum(fakeAlbums[0].id)).then(album => {
              expect(album.errors).toBe(undefined);
              expect(album.data.buyAlbum).toEqual({
                userId: fakeAlbums[0].userId,
                id: fakeAlbums[0].id,
                title: fakeAlbums[0].title,
                photos: fakePhotos
              });
            });
          });
        })
      );
    });
    it('should alredy bought error', () => {
      const fakeAlbumsProm = albumsFactory.attributesMany(5).then(fakeAlbumsToMock => {
        axios.setMockAlbums(fakeAlbumsToMock);
        return fakeAlbumsToMock;
      });
      const fakePhotosProm = photosFactory.attributesMany(5).then(fakePhotosToMock => {
        axios.setMockPhotos(fakePhotosToMock);
        return fakePhotosToMock;
      });
      return usersFactory.attributes({ email: 'ale@wolox.com.ar' }).then(fakeUser =>
        mutate(createUser(fakeUser)).then(res => {
          expect(res.errors).toBe(undefined);
          return Promise.all([fakeAlbumsProm, fakePhotosProm]).then(([fakeAlbums]) => {
            apolloServer.setContext({ user: { email: fakeUser.email } });
            return mutate(buyAlbum(fakeAlbums[0].id)).then(album => {
              expect(album.errors).toBe(undefined);
              return mutate(buyAlbum(fakeAlbums[0].id)).then(sameAlbum => {
                expect(typeof sameAlbum.errors).toBe('object');
                expect(sameAlbum.errors[0].message).toBe('Album alredy bought');
                expect(sameAlbum.errors[0].statusCode).toBe(400);
              });
            });
          });
        })
      );
    });
    it('should return unhauthorized error', () => {
      apolloServer.resetContext();
      const fakeAlbumsProm = albumsFactory.attributesMany(5).then(fakeAlbumsToMock => {
        axios.setMockAlbums(fakeAlbumsToMock);
        return fakeAlbumsToMock;
      });
      const fakePhotosProm = photosFactory.attributesMany(5).then(fakePhotosToMock => {
        axios.setMockPhotos(fakePhotosToMock);
        return fakePhotosToMock;
      });
      return usersFactory.attributes({ email: 'ale@wolox.com.ar' }).then(user =>
        mutate(createUser(user)).then(res => {
          expect(res.errors).toBe(undefined);
          return Promise.all([fakeAlbumsProm, fakePhotosProm]).then(([fakeAlbums]) =>
            mutate(buyAlbum(fakeAlbums[0].id)).then(album => {
              expect(typeof album.errors).toBe('object');
              expect(album.errors[0].message).toBe('User not authorized');
              expect(album.errors[0].statusCode).toBe(401);
            })
          );
        })
      );
    });
    it('should return not found error', () => {
      apolloServer.resetContext();
      const fakeAlbumsProm = albumsFactory.attributesMany(5).then(fakeAlbumsToMock => {
        axios.setMockAlbums(fakeAlbumsToMock);
        return fakeAlbumsToMock;
      });
      const fakePhotosProm = photosFactory.attributesMany(5).then(fakePhotosToMock => {
        axios.setMockPhotos(fakePhotosToMock);
        return fakePhotosToMock;
      });
      return usersFactory.attributes({ email: 'ale@wolox.com.ar' }).then(user =>
        mutate(createUser(user)).then(res => {
          expect(res.errors).toBe(undefined);
          return Promise.all([fakeAlbumsProm, fakePhotosProm]).then(([fakeAlbums]) => {
            apolloServer.setContext({ user: { email: 'roman@wolox.com.ar' } });
            return mutate(buyAlbum(fakeAlbums[0].id)).then(album => {
              expect(typeof album.errors).toBe('object');
              expect(album.errors[0].message).toBe('User not found');
              expect(album.errors[0].statusCode).toBe(404);
            });
          });
        })
      );
    }); /*
    it('should return not found error', async () => {
      const fakeAlbums = await albumsFactory.attributesMany(1);
      const fakePhotos = await photosFactory.attributesMany(5);
      await axios.setMockAlbums(fakeAlbums);
      await axios.setMockPhotos(fakePhotos);
      const user = await usersFactory.attributes({ email: 'ale@wolox.com.ar' });
      await mutate(await createUser(user));
      apolloServer.setContext({ user: { email: 'roman@wolox.com.ar' } });
      const resBuyAlbum = await mutate(await buyAlbum(1));
      expect(typeof resBuyAlbum.errors).toBe('object');
    });*/
  });
});
