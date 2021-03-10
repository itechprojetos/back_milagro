const SnakeNamingStrategy = require('typeorm-naming-strategies')
  .SnakeNamingStrategy;

module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'danu1985',
  //password: 'docker',
  database: 'milagro',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
  namingStrategy: new SnakeNamingStrategy(),
};
