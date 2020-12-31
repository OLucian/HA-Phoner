import knex from 'knex';

const knexConfig = require('../../knexfile');

const db = knex(knexConfig.production);

export { db as Knex };
