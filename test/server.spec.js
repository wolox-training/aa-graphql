const { createTestClient } = require('apollo-server-testing'),
  { ApolloServer } = require('apollo-server'),
  schema = require('../app/graphql');

ApolloServer.prototype.setContext = function setContext(newContext) {
  this.context = newContext;
};

ApolloServer.prototype.resetContext = function resetContext() {
  this.context = undefined;
};

const apolloServer = new ApolloServer({
  schema,
  formatError: err => ({
    message: err.message,
    statusCode: err.extensions.code
  })
});

const { query: _query, mutate } = createTestClient(apolloServer);

const query = params => _query({ query: params });

module.exports = { query, mutate, apolloServer };
