const { createTestClient } = require('apollo-server-testing'),
  { ApolloServer } = require('apollo-server'),
  schema = require('../app/graphql');

const { query: _query, mutate } = createTestClient(
  new ApolloServer({
    schema,
    formatError: err => ({
      message: err.message,
      statusCode: err.extensions.code
    })
  })
);

const query = params => _query({ query: params });

module.exports = { query, mutate };
