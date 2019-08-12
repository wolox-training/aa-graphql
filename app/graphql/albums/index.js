const { queries, schema: queriesSchema } = require('./queries');
const { fieldResolvers, schema: fieldResolversSchema } = require('./fieldResolvers');
const { mutations, schema: mutationsSchema } = require('./mutations');

module.exports = {
  queries,
  mutations,
  fieldResolvers,
  schemas: [queriesSchema, mutationsSchema, fieldResolversSchema]
};
