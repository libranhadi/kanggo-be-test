import type { Knex } from 'knex';
import path from 'path';
require("dotenv").config();


const config: Knex.Config = {
  client: 'postgresql',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  migrations: {
    directory: path.resolve(__dirname, 'migrations'), // Absolute path
    tableName: 'knex_migrations',
  }
};

export default config;