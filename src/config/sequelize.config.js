const path = require('path');
require("dotenv").config()


/** @type {import('sequelize').Options} */
const config = {
  development: {
    dialect: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'dev_db',
    schema: process.env.DB_SCHEMA || 'kanggo',
    port: Number(process.env.DB_PORT) || 5432,
    models: [path.resolve(__dirname, '../models/**/*.ts')],
    logging: false,
    define: {
      schema: process.env.DB_SCHEMA, 
      underscored: true,          
      timestamps: true           
    },
  }
};

module.exports = config;
