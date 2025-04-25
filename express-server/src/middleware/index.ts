import { Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import morgan from 'morgan';

export interface CustomError extends Error {
  statusCode?: number;
}

// Security middleware
export const securityMiddleware = helmet();

// Request logging middleware
export const loggingMiddleware = morgan('dev');

// Rate limiting middleware
export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: { error: 'Too many requests, please try again later' }
});

// Request validation middleware
export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (!req.body) {
    next({ statusCode: 400, message: 'Request body is required' });
    return;
  }
  next();
};

// Game authentication middleware
export const authenticateGame = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const gameId = req.params.gameId || req.body.gameId;
  if (!gameId) {
    next({ statusCode: 401, message: 'Game ID is required' });
    return;
  }
  next();
};

// Error handler middleware
export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  console.error(`[Error] ${statusCode}: ${message}`);

  res.status(statusCode).json({
    success: false,
    error: message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
};