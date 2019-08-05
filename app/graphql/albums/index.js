const { queries, schema: queriesSchema } = require('./queries');
const { fieldResolvers, schema: fieldResolversSchema } = require('./fieldResolvers');

module.exports = {
  queries,
  fieldResolvers,
  schemas: [queriesSchema, fieldResolversSchema]
};
