const { ApolloServer } = require('apollo-server'),
  config = require('./config'),
  migrationsManager = require('./migrations'),
  logger = require('./app/logger'),
  schema = require('./app/graphql'),
  tokenHelper = require('./app/helper/token');

const port = config.common.api.port || 8080;

migrationsManager
  .check()
  .then(() =>
    new ApolloServer({
      schema,
      formatError: err => ({
        message: err.message,
        statusCode: err.extensions.code
      }),
      context: ({ req }) => {
        const token = req.headers.authorization || '';
        const user = tokenHelper.decode(token);
        return { user };
      }
    })
      .listen(port)
      .then(({ url, subscriptionsUrl }) => {
        logger.info(`🚀 Server ready at ${url}`);
        logger.info(`🚀 Subscriptions ready at ${subscriptionsUrl}`);
      })
  )
  .catch(logger.error);
