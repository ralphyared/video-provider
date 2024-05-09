import 'dotenv/config';

const getDbConfig = () => ({
  dbUrl: process.env.DB_URL,
});

const getPortConfig = () => ({
  port: process.env.PORT,
});

const getJwtConfig = () => ({
  jwtSecret: process.env.JWT_SECRET,
});

export default () => ({
  dbConfig: getDbConfig(),
  portConfig: getPortConfig(),
  jwtConfig: getJwtConfig(),
});
