exports.config = {
  environment: 'production',
  common: {
    database: {
      name: process.env.DB_NAME
    },
    redis: {
      name: process.env.REDIS_NAME
    }
  },
  isProduction: true
};
