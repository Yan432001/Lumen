import mysql from 'mysql2/promise';
import { env } from '../config/env.js';

// Connection pool configured for MySQL 8 / phpMyAdmin
export const pool = mysql.createPool({
  host: env.DB_HOST,
  port: env.DB_PORT,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  timezone: '+00:00',
  decimalNumbers: true,
});

/**
 * Execute a parameterized query with safe variable binding
 * @param {string} sql - Parameterized SQL string
 * @param {Array} params - Array of parameter bindings
 */
export async function query(sql, params = []) {
  const [rows] = await pool.execute(sql, params);
  return rows;
}