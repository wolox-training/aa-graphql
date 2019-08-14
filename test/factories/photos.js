const { factory } = require('factory-girl'),
  faker = require('faker'),
  { photo: Photo } = require('../../app/models');

factory.define('photo', Photo, {
  albumId: () => String(faker.random.number()),
  id: () => faker.random.number(),
  title: () => faker.name.title(),
  url: () => faker.internet.url(),
  thumbnailUrl: () => faker.internet.url()
});

module.exports = {
  create: params => factory.create('photo', params),
  createMany: () => factory.createMany('photo', 5),
  build: params => factory.build('photo', params),
  buildMany: number => factory.buildMany('photo', number),
  attributes: params => factory.attrs('photo', params),
  attributesMany: number => factory.attrsMany('photo', number)
};
