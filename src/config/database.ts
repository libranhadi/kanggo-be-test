import { Sequelize } from 'sequelize-typescript';
import path from 'path';
require("dotenv").config()


const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  schema: process.env.DB_SCHEMA,
  dialect: 'postgres',
  models: [path.join(__dirname, '../modules/**/models/*.model.ts')],
  logging: false,
    pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
    }
});

export default sequelize;