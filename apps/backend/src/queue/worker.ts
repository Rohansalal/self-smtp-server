import { Worker } from 'bullmq';
import IORedis from 'ioredis';
import { eq } from 'drizzle-orm';
import { db, emailLogs, contacts } from '../db/index';
import { transporter } from '../mail/transporter';
import { env } from '../env';

const connection = new IORedis({
  host: env.redis.host,
  port: env.redis.port,
});

interface EmailJob {
  id: number;
  to: string;
  subject: string;
  html?: string;
  text?: string;
  campaignId?: number;
  contactId?: number;
}

export const worker = new Worker<EmailJob>(
  'email-queue',
  async (job) => {
    const { id, to, subject, html, text, contactId } = job.data;

    try {
      await transporter.sendMail({
        from: `"Protechplanner" <${env.email.user}>`,
        to,
        subject,
        html: html || '',
        text: text || '',
      });

      await db.update(emailLogs).set({ 
        status: 'sent', 
        sentAt: new Date(),
        updatedAt: new Date() 
      }).where(eq(emailLogs.id, id));

      if (contactId) {
        const [contact] = await db.select().from(contacts).where(eq(contacts.id, contactId));
        if (contact) {
          await db.update(contacts).set({
            lastSentAt: new Date(),
            updatedAt: new Date(),
          }).where(eq(contacts.id, contactId));
        }
      }

      console.log(`[SENT] ${to}: ${subject}`);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      await db.update(emailLogs).set({ 
        status: 'failed', 
        errorMessage,
        updatedAt: new Date() 
      }).where(eq(emailLogs.id, id));
      console.error(`[FAILED] ${to}:`, errorMessage);
      throw error;
    }
  },
  {
    connection,
    limiter: {
      max: 20,
      duration: 60000,
    },
  }
);

console.log('📧 Email worker started - Processing queue...');