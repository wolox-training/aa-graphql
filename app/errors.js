const { ApolloError } = require('apollo-server');

const createError = (message, statusCode) => new ApolloError(message, statusCode);

const DEFAULT_ERROR = 500,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  CONNECTION_ERROR = 502,
  DATABASE_ERROR = 503;

exports.defaultError = message => createError(message, DEFAULT_ERROR);
exports.badRequest = message => createError(message, BAD_REQUEST);
exports.conectionError = message => createError(message, CONNECTION_ERROR);
exports.databaseError = message => createError(message, DATABASE_ERROR);
exports.unauthorized = message => createError(message, UNAUTHORIZED);
exports.notFound = message => createError(message, NOT_FOUND);
