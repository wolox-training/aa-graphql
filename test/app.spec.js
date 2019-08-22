'use strict';

const { host, port, name } = require('../config').common.redis;

const fs = require('fs'),
  models = require('../app/models'),
  path = require('path'),
  redisClient = require('redis').createClient({ host, port, db: name });

const tables = Object.values(models.sequelize.models);

const truncateTable = model =>
  model.destroy({ truncate: true, cascade: true, force: true, restartIdentity: true });

const truncateDatabase = () => Promise.all(tables.map(truncateTable));

const flushRedis = () =>
  new Promise(resolve => {
    redisClient.sendCommand('FLUSHALL');
    resolve();
  });

beforeEach(done => {
  Promise.all([flushRedis(), truncateDatabase()]).then(() => done());
});

// including all test files
const normalizedPath = path.join(__dirname, '.');

const requireAllTestFiles = pathToSearch => {
  fs.readdirSync(pathToSearch).forEach(file => {
    if (fs.lstatSync(`${pathToSearch}/${file}`).isDirectory()) {
      requireAllTestFiles(`${pathToSearch}/${file}`);
    } else {
      require(`${pathToSearch}/${file}`);
    }
  });
};

requireAllTestFiles(normalizedPath);
