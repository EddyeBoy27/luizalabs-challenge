export default () => ({
  mongodb: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10),
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE_NAME,
  },
  api: {
    port: parseInt(process.env.SERVER_PORT, 10),
    secret: process.env.SERVER_SECRET,
  },
});
