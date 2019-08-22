exports.config = {
  environment: 'development',
  common: {
    database: {
      name: process.env.DB_NAME_DEV
    },
    redis: {
      name: process.env.REDIS_NAME_DEV
    }
  },
  isDevelopment: true
};
