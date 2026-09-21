import { Router } from 'express';
import { register, login, logout, getMe } from '../controllers/auth.controller.js';
import { validate } from '../middleware/validate.js';
import { registerSchema, loginSchema } from '../schemas/auth.schemas.js';
import { requireAuth } from '../middleware/auth.js';
import { authLimiter } from '../middleware/rateLimiter.js';

const router = Router();

// POST /api/auth/register (rate limited + Zod validation)
router.post('/register', authLimiter, validate(registerSchema), register);

// POST /api/auth/login (rate limited + Zod validation)
router.post('/login', authLimiter, validate(loginSchema), login);

// POST /api/auth/logout (clears httpOnly cookie)
router.post('/logout', logout);

// GET /api/auth/me (requires valid JWT session cookie)
router.get('/me', requireAuth, getMe);

export default router;