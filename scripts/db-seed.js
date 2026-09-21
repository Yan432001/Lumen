import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function seedDatabase() {
  const host = process.env.DB_HOST || 'localhost';
  const port = Number(process.env.DB_PORT) || 3306;
  const user = process.env.DB_USER || 'root';
  const password = process.env.DB_PASSWORD || '';
  const database = process.env.DB_NAME || 'lumen_db';

  console.log(`[db:seed] Connecting to MySQL database '${database}'...`);

  let connection;
  try {
    connection = await mysql.createConnection({
      host,
      port,
      user,
      password,
      database,
      multipleStatements: true,
    });

    const seedPath = path.resolve(__dirname, '../sql/seed.sql');
    console.log(`[db:seed] Reading seed from: ${seedPath}`);
    const seedSql = fs.readFileSync(seedPath, 'utf8');

    console.log('[db:seed] Seeding admin user, categories, tags, photos, and sample board...');
    await connection.query(seedSql);

    console.log('[db:seed] Database seeding completed successfully.');
  } catch (error) {
    console.error('[db:seed] Error executing seed:', error.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

seedDatabase();