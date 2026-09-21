import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { query } from '../db/pool.js';
import { env } from '../config/env.js';

const BCRYPT_ROUNDS = 10;

export async function findUserByEmail(email) {
  const rows = await query(
    'SELECT id, email, password_hash, username, avatar_url, role, created_at FROM users WHERE email = ? LIMIT 1',
    [email]
  );
  return rows[0] || null;
}

export async function findUserByUsername(username) {
  const rows = await query(
    'SELECT id, email, username FROM users WHERE username = ? LIMIT 1',
    [username]
  );
  return rows[0] || null;
}

export async function findUserById(id) {
  const rows = await query(
    'SELECT id, email, username, avatar_url, role, created_at FROM users WHERE id = ? LIMIT 1',
    [id]
  );
  return rows[0] || null;
}

export async function createUser({ email, username, password }) {
  const existingEmail = await findUserByEmail(email);
  if (existingEmail) {
    const error = new Error('An account with this email already exists');
    error.status = 409;
    throw error;
  }

  const existingUsername = await findUserByUsername(username);
  if (existingUsername) {
    const error = new Error('Username is already taken');
    error.status = 409;
    throw error;
  }

  const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS);

  const result = await query(
    'INSERT INTO users (email, password_hash, username, role) VALUES (?, ?, ?, ?)',
    [email, passwordHash, username, 'user']
  );

  return {
    id: result.insertId,
    email,
    username,
    avatar_url: null,
    role: 'user',
  };
}

export async function verifyUserCredentials({ email, password }) {
  const user = await findUserByEmail(email);
  if (!user) {
    const error = new Error('Invalid email or password');
    error.status = 401;
    throw error;
  }

  const isValidPassword = await bcrypt.compare(password, user.password_hash);
  if (!isValidPassword) {
    const error = new Error('Invalid email or password');
    error.status = 401;
    throw error;
  }

  return {
    id: user.id,
    email: user.email,
    username: user.username,
    avatar_url: user.avatar_url,
    role: user.role,
    created_at: user.created_at,
  };
}

export function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
    },
    env.JWT_SECRET,
    { expiresIn: env.JWT_EXPIRES_IN }
  );
}