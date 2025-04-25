// src/config/index.ts

import dotenv from 'dotenv';
import { PusherConfig, ServerConfig } from './types';

// Load environment variables
dotenv.config();

// Validate required environment variables
const validateEnvVariables = () => {
  const required = ['PORT', 'PUSHER_APP_ID', 'PUSHER_KEY', 'PUSHER_SECRET', 'PUSHER_CLUSTER'];
  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
};

validateEnvVariables();

// Server configuration
const serverConfig: ServerConfig = {
  port: parseInt(process.env.PORT!) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  jwtSecret: process.env.JWT_SECRET || 'default_jwt_secret'
};

// Pusher configuration
const pusherConfig: PusherConfig = {
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.PUSHER_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: process.env.PUSHER_CLUSTER!,
  useTLS: true
};

export { serverConfig, pusherConfig };