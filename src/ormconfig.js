module.exports = {
  type: process.env.DB_CONNECTION,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ['dist/*/.entity.js'],
  migrations: ['dist/migrations/*.js'],
  synchronize: true,
  cache: {
    duration: 30000, // 30 seconds
  },
  cli: {
    migrationsDir: 'src/migrations',
  },
};
