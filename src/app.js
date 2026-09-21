import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { env } from './config/env.js';
import { generalLimiter } from './middleware/rateLimiter.js';
import { notFoundHandler, errorHandler } from './middleware/errorHandler.js';
import authRoutes from './routes/auth.routes.js';

const app = express();

// Security headers
app.use(helmet());

// CORS configuration (enabling credentials for httpOnly cookie with Vite origin)
app.use(
  cors({
    origin: env.CLIENT_ORIGIN,
    credentials: true,
  })
);

// Cookie parser for JWT session cookies
app.use(cookieParser(env.COOKIE_SECRET));

// Body parsing with 10MB limit
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Global rate limiting
app.use(generalLimiter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Mount auth routes
app.use('/api/auth', authRoutes);

// Catch-all 404 handler
app.use(notFoundHandler);

// Central error handler
app.use(errorHandler);

export default app;