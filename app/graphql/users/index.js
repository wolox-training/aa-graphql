const { queries, schema: queriesSchema } = require('./queries'),
  { mutations, schema: mutationSchema } = require('./mutations'),
  { subscriptions, schema: subscriptionsSchema } = require('./subscriptions'),
  { fieldResolvers, schema: fieldResolversSchema } = require('./fieldResolvers'),
  middlewares = require('./middlewares');

module.exports = {
  queries,
  fieldResolvers,
  mutations,
  subscriptions,
  middlewares,
  schemas: [queriesSchema, fieldResolversSchema, mutationSchema, subscriptionsSchema]
};
