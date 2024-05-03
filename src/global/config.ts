const getDbConfig = () => ({
  dbUrl: process.env.DB_URL,
});

export default () => ({
  dbConfig: getDbConfig(),
});
