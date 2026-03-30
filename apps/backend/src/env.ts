import dotenv from 'dotenv';

dotenv.config();

export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '3000', 10),
  email: {
    host: process.env.EMAIL_HOST || 'mail.protechplanner.com',
    port: parseInt(process.env.EMAIL_PORT || '587', 10),
    secure: false,
    user: process.env.EMAIL_USER || 'info@protechplanner.com',
    pass: process.env.EMAIL_PASS || '',
  },
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379', 10),
  },
};