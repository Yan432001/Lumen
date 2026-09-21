import { env } from '../config/env.js';

export function notFoundHandler(req, res, next) {
  res.status(404).json({ error: `Cannot ${req.method} ${req.originalUrl}` });
}

export function errorHandler(err, req, res, next) {
  if (err.code === 'ER_DUP_ENTRY') {
    return res.status(409).json({
      error: 'Conflict: A resource with that unique identifier already exists.',
    });
  }

  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: 'Malformed JSON payload.' });
  }

  const statusCode = err.status || err.statusCode || 500;
  const response = {
    error: err.message || 'Internal Server Error',
  };

  if (env.NODE_ENV !== 'production' && err.stack) {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
}