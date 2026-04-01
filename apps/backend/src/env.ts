import dotenv from 'dotenv';

dotenv.config();

export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '3000', 10),
  
  // Email configuration (Haraka SMTP relay)
  email: {
    host: process.env.EMAIL_HOST || 'mail.protechplanner.com',
    port: parseInt(process.env.EMAIL_PORT || '587', 10),
    secure: process.env.EMAIL_SECURE === 'true',
    user: process.env.EMAIL_USER || 'info@protechplanner.com',
    pass: process.env.EMAIL_PASS || '',
    defaultFrom: process.env.EMAIL_DEFAULT_FROM || 'info@protechplanner.com',
    
    // SES/SendGrid fallback
    sesEnabled: process.env.SES_ENABLED === 'true',
    sesRegion: process.env.SES_REGION || 'us-east-1',
  },
  
  // Redis configuration (for queue)
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379', 10),
    password: process.env.REDIS_PASSWORD || '',
  },
  
  // Haraka server configuration
  haraka: {
    server: process.env.HARAKA_SERVER || 'localhost',
    port: parseInt(process.env.HARAKA_PORT || '25', 10),
    webhookSecret: process.env.HARAKA_WEBHOOK_SECRET || '',
  },
  
  // Domain configuration
  domain: process.env.DOMAIN || 'protechplanner.com',
  
  // DKIM configuration
  dkim: {
    domain: process.env.DKIM_DOMAIN || 'protechplanner.com',
    selector: process.env.DKIM_SELECTOR || 'default',
    privateKey: process.env.DKIM_PRIVATE_KEY || '',
  },
  
  // Cloudflare Workers (if deployed)
  cloudflare: {
    accountId: process.env.CLOUDFLARE_ACCOUNT_ID || '',
    apiToken: process.env.CLOUDFLARE_API_TOKEN || '',
  },
};
