export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    username: process.env.DATABASE_USER || 'postgres',
    password: process.env.DATABASE_PASSWORD || 'postgres',
    dialect: process.env.DATABASE_DIALECT || 'postgres',
    database: process.env.DATABASE || '',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'must_secret_ok!',
  },
});
