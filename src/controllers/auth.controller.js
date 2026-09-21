import {
  createUser,
  verifyUserCredentials,
  generateToken,
  findUserById,
} from '../services/auth.service.js';
import { env } from '../config/env.js';

const COOKIE_NAME = 'token';

function getCookieOptions() {
  const isProduction = env.NODE_ENV === 'production';
  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    path: '/',
  };
}

export async function register(req, res, next) {
  try {
    const { email, username, password } = req.body;
    const user = await createUser({ email, username, password });
    const token = generateToken(user);

    res.cookie(COOKIE_NAME, token, getCookieOptions());

    res.status(201).json({
      message: 'Registration successful',
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        avatar_url: user.avatar_url,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await verifyUserCredentials({ email, password });
    const token = generateToken(user);

    res.cookie(COOKIE_NAME, token, getCookieOptions());

    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        avatar_url: user.avatar_url,
        role: user.role,
        created_at: user.created_at,
      },
    });
  } catch (error) {
    next(error);
  }
}

export function logout(req, res) {
  res.clearCookie(COOKIE_NAME, {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });

  res.status(200).json({ message: 'Logged out successfully' });
}

export async function getMe(req, res, next) {
  try {
    const user = await findUserById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User profile not found' });
    }

    res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        avatar_url: user.avatar_url,
        role: user.role,
        created_at: user.created_at,
      },
    });
  } catch (error) {
    next(error);
  }
}