import pkg from "pg";
import env from "dotenv";
const { Pool } = pkg;
env.config();
const pool = new Pool({
  user: process.env.NAME,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.DB_PORT,
});

export default pool;  
