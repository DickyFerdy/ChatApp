import pkg from "pg";
import { logger } from "./logging.js";

const { Pool } = pkg;

export const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'ChatApp',
  password: 'dicky123',
  port: 5432
});

pool.connect((err, _, release) => {
  if (err) {
    return logger.error('Error connecting to Database', err);
  }
  logger.info('Connected to Database');
  release();
});
