import { config } from './config';
import path from 'path';

const { url: host, db: database, user, pass: password } = config.db;

const directory = path.normalize(path.join(__dirname, '/migrations'));
const migrations = {
  tableName: 'knex_migrations',
  directory,
};
const connection = { host, user, password, database };

const knexConfig: { development: any; staging: any; production: any } = {
  development: {
    client: 'postgresql',
    connection,
    pool: { min: 2, max: 10 },
    migrations,
  },

  staging: {
    client: 'postgresql',
    connection,
    pool: { min: 2, max: 10 },
    migrations,
  },

  production: {
    client: 'postgresql',
    connection,
    pool: { min: 2, max: 10 },
    migrations,
  },
};

module.exports = knexConfig;
