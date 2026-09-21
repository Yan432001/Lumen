import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function createDatabaseAndSchema() {
  const host = process.env.DB_HOST || '127.0.0.1';
  const port = Number(process.env.DB_PORT) || 3306;
  const user = process.env.DB_USER || 'root';
  const password = process.env.DB_PASSWORD || '';
  const database = process.env.DB_NAME || 'lumen_db';

  console.log(`[db:create] Connecting to MySQL server at ${host}:${port} as user '${user}'...`);

  let connection;
  try {
    connection = await mysql.createConnection({
      host,
      port,
      user,
      password,
      multipleStatements: true,
    });

    console.log(`[db:create] Creating database '${database}' if not exists...`);
    await connection.query(
      `CREATE DATABASE IF NOT EXISTS \`${database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`
    );
    await connection.query(`USE \`${database}\`;`);

    const schemaPath = path.resolve(__dirname, '../sql/schema.sql');
    console.log(`[db:create] Reading schema from: ${schemaPath}`);
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');

    console.log('[db:create] Executing schema table definitions and indexes...');
    await connection.query(schemaSql);

    console.log(`[db:create] Database '${database}' and all tables created successfully.`);
  } catch (error) {
    console.error('[db:create] Error creating database:', error.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

createDatabaseAndSchema();