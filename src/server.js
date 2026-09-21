import app from './app.js';
import { pool } from './db/pool.js';
import { env } from './config/env.js';

async function startServer() {
  try {
    // Test pool connection to MySQL
    const connection = await pool.getConnection();
    console.log(`[db] Connected to MySQL database '${env.DB_NAME}' at ${env.DB_HOST}:${env.DB_PORT}`);
    connection.release();

    app.listen(env.PORT, () => {
      console.log(`[server] Lumen server running in ${env.NODE_ENV} mode on port ${env.PORT}`);
      console.log(`[server] Accepting requests from origin: ${env.CLIENT_ORIGIN}`);
    });
  } catch (error) {
    console.error('[server] Failed to connect to MySQL database:', error.message);
    process.exit(1);
  }
}

startServer();