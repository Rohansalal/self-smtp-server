import nodemailer from 'nodemailer';
import { env } from '../env.js';

// Email transporter configuration for Haraka SMTP relay
export const transporter = nodemailer.createTransport({
  host: env.email.host,
  port: env.email.port,
  secure: env.email.secure,
  auth: {
    user: env.email.user,
    pass: env.email.pass,
  },
  // Haraka-specific settings
  tls: {
    rejectUnauthorized: false, // For self-signed certs in development
  },
  pool: true, // Use pooled connections
  maxConnections: 5,
  maxMessages: 100,
});

// Alternative transporter for SES/SendGrid (hybrid approach)
export const sesTransporter = env.email.sesEnabled ? nodemailer.createTransport({
  SES: {
    // AWS SES configuration
    region: env.email.sesRegion,
  },
}) : null;

// Send email function with fallback
export async function sendEmail(options: {
  from?: string;
  to: string;
  subject: string;
  html?: string;
  text?: string;
  replyTo?: string;
  headers?: Record<string, string>;
}) {
  const fromAddress = options.from || env.email.defaultFrom;
  
  // Primary: Haraka SMTP
  try {
    const result = await transporter.sendMail({
      from: `"Protechplanner" <${fromAddress}>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
      replyTo: options.replyTo,
      headers: {
        ...options.headers,
        'X-Mailer': 'Protechplanner/2.0',
        'X-Priority': '3',
      },
    });
    
    console.log(`[EMAIL] Sent via Haraka: ${options.to} - ${options.subject}`);
    return { success: true, messageId: result.messageId, provider: 'haraka' };
  } catch (harakaError) {
    console.error('[EMAIL] Haraka failed, trying SES fallback:', harakaError);
    
    // Fallback: SES/SendGrid
    if (sesTransporter) {
      try {
        const result = await sesTransporter.sendMail({
          from: fromAddress,
          to: options.to,
          subject: options.subject,
          html: options.html,
          text: options.text,
          replyTo: options.replyTo,
        });
        
        console.log(`[EMAIL] Sent via SES fallback: ${options.to}`);
        return { success: true, messageId: result.messageId, provider: 'ses' };
      } catch (sesError) {
        console.error('[EMAIL] SES fallback also failed:', sesError);
        throw new Error('All email providers failed');
      }
    }
    
    throw harakaError;
  }
}

// Verify transporter connection
export async function verifyConnection(): Promise<boolean> {
  try {
    await transporter.verify();
    console.log('[EMAIL] Haraka connection verified');
    return true;
  } catch (error) {
    console.error('[EMAIL] Haraka connection failed:', error);
    return false;
  }
}
