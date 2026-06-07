const { Pool } = require('pg');
require('dotenv').config();

require('dotenv').config();

console.log("HOST:", process.env.DB_HOST);
console.log("USER:", process.env.DB_USER);
console.log("DATABASE:", process.env.DB_NAME);
console.log("PORT:", process.env.DB_PORT);
console.log("PASSWORD EXISTS:", !!process.env.DB_PASSWORD);

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

module.exports = pool;