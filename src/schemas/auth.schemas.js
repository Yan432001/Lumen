import { z } from 'zod';

export const registerSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .trim()
    .email({ message: 'Invalid email format' }),
  username: z
    .string({ required_error: 'Username is required' })
    .trim()
    .min(3, { message: 'Username must be between 3 and 20 characters' })
    .max(20, { message: 'Username must be between 3 and 20 characters' })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: 'Username may only contain letters, numbers, and underscores',
    }),
  password: z
    .string({ required_error: 'Password is required' })
    .min(8, { message: 'Password must be at least 8 characters long' }),
});

export const loginSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .trim()
    .email({ message: 'Invalid email format' }),
  password: z
    .string({ required_error: 'Password is required' })
    .min(1, { message: 'Password is required' }),
});