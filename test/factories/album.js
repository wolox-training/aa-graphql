const { factory } = require('factory-girl'),
  faker = require('faker'),
  { album: Album } = require('../../app/models');

factory.define('album', Album, {
  id: () => String(faker.random.number()),
  title: () => faker.name.title()
});

module.exports = {
  create: params => factory.create('album', params),
  createMany: () => factory.createMany('album', 5),
  build: params => factory.build('album', params),
  buildMany: number => factory.buildMany('album', number),
  attributes: params => factory.attrs('album', params),
  attributesMany: number => factory.attrsMany('album', number)
};
