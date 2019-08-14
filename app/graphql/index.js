const { makeExecutableSchema } = require('graphql-tools'),
  { applyMiddleware } = require('graphql-middleware'),
  types = require('./types'),
  inputs = require('./inputs'),
  users = require('./users'),
  healthCheck = require('./healthCheck'),
  albums = require('./albums');

const typeDefs = [types, inputs, ...users.schemas, ...healthCheck.schemas, ...albums.schemas];

const schema = makeExecutableSchema({
  typeDefs,
  resolvers: {
    Query: {
      ...users.queries,
      ...healthCheck.queries,
      ...albums.queries
    },
    Mutation: {
      ...users.mutations
    },
    Subscription: {
      ...users.subscriptions
    },
    Album: {
      ...albums.fieldResolvers
    },
    User: {
      ...users.fieldResolvers
    }
  }
});

module.exports = applyMiddleware(schema, {
  Mutation: {
    ...users.middlewares.mutations
  }
});
