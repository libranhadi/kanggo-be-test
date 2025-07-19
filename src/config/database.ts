import knex from 'knex';
import path from 'path';
require("dotenv").config();

const db = knex({
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    // options: `-c search_path=${process.env.DB_SCHEMA},public`
  },
  pool: {
    min: 0,
    max: 5,
    acquireTimeoutMillis: 30000,
    idleTimeoutMillis: 10000
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: path.join(__dirname, '../migrations'),
    // schemaName: process.env.DB_SCHEMA
  },
  debug: false
});

export default db;