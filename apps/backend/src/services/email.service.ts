import { eq, and } from 'drizzle-orm';
import { db, contacts, campaigns, campaignContacts, emailLogs, inboundEmails } from '../db/index';
import { emailQueue } from '../queue/queue';
import { sendEmail, verifyConnection } from '../mail/transporter';

interface SendEmailInput {
  to: string;
  subject: string;
  html?: string | null;
  text?: string | null;
  from?: string | null;
  campaignId?: number | null;
  contactId?: number | null;
  replyTo?: string | null;
  messageId?: string | null;
}

export class EmailService {
  static async send(data: SendEmailInput) {
    const [log] = await db.insert(emailLogs).values({
      toEmail: data.to,
      fromEmail: (data.from || 'info@protechplanner.com') as string,
      subject: data.subject,
      html: data.html ?? null,
      text: data.text ?? null,
      campaignId: data.campaignId ?? null,
      contactId: data.contactId ?? null,
      inReplyTo: data.messageId ?? null,
      status: 'queued',
      provider: 'haraka',
      createdAt: new Date(),
      updatedAt: new Date(),
    }).returning();

    await emailQueue.add('send-email', {
      id: log.id,
      to: data.to,
      subject: data.subject,
      html: data.html,
      text: data.text,
      replyTo: data.replyTo,
      campaignId: data.campaignId,
      contactId: data.contactId,
    });

    return log;
  }

  static async sendBatch(emails: SendEmailInput[]) {
    const results = [];
    for (const email of emails) {
      const result = await this.send(email);
      results.push(result);
    }
    return results;
  }

  static async processInbound(data: any) {
    let relatedEmailLogId: number | undefined;
    let relatedContactId: number | undefined;
    
    if (data.inReplyTo) {
      const [originalEmail] = await db
        .select()
        .from(emailLogs)
        .where(eq(emailLogs.messageId, data.inReplyTo))
        .limit(1);
      
      if (originalEmail) {
        relatedEmailLogId = originalEmail.id;
        relatedContactId = originalEmail.contactId || undefined;
      }
    }
    
    const fromEmail = data.from;
    let contact = await db
      .select()
      .from(contacts)
      .where(eq(contacts.email, fromEmail))
      .limit(1);
    
    if (contact.length === 0) {
      const [newContact] = await db.insert(contacts).values({
        email: fromEmail,
        firstName: extractNameFromEmail(fromEmail),
        status: 'active',
        lastReceivedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      }).returning();
      
      relatedContactId = newContact.id;
    } else {
      relatedContactId = contact[0].id;
      await db
        .update(contacts)
        .set({ 
          lastReceivedAt: new Date(),
          replyCount: (contact[0].replyCount || 0) + 1,
          updatedAt: new Date() 
        })
        .where(eq(contacts.id, contact[0].id));
    }
    
    const [inboundEmail] = await db.insert(inboundEmails).values({
      id: data.id,
      fromEmail: data.from,
      toEmail: Array.isArray(data.to) ? data.to.join(', ') : data.to,
      subject: data.subject,
      body: data.body,
      html: data.html,
      headers: data.headers ? JSON.stringify(data.headers) : null,
      messageId: data.messageId,
      inReplyTo: data.inReplyTo,
      references: data.references ? JSON.stringify(data.references) : null,
      contactId: relatedContactId,
      emailLogId: relatedEmailLogId,
      status: 'processed',
      processedAt: new Date(),
      receivedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }).returning();
    
    if (relatedEmailLogId) {
      const [originalLog] = await db
        .select()
        .from(emailLogs)
        .where(eq(emailLogs.id, relatedEmailLogId))
        .limit(1);
      
      if (originalLog?.campaignId) {
        await db
          .update(campaigns)
          .set({ 
            repliedCount: await this.getReplyCount(originalLog.campaignId),
            updatedAt: new Date() 
          })
          .where(eq(campaigns.id, originalLog.campaignId));
      }
    }
    
    return inboundEmail;
  }

  static async getReplyCount(campaignId: number) {
    const replies = await db
      .select()
      .from(inboundEmails)
      .innerJoin(emailLogs, eq(inboundEmails.emailLogId, emailLogs.id))
      .where(eq(emailLogs.campaignId, campaignId));
    
    return replies.length;
  }

  static async getStatus(id: number) {
    const [log] = await db.select().from(emailLogs).where(eq(emailLogs.id, id));
    return log;
  }

  static async list(campaignId?: number, limit = 50, offset = 0) {
    if (campaignId) {
      return db
        .select()
        .from(emailLogs)
        .where(eq(emailLogs.campaignId, campaignId))
        .limit(limit)
        .offset(offset);
    }
    return db
      .select()
      .from(emailLogs)
      .orderBy(emailLogs.createdAt)
      .limit(limit)
      .offset(offset);
  }

  static async listInbound(limit = 50, offset = 0) {
    return db
      .select()
      .from(inboundEmails)
      .orderBy(inboundEmails.receivedAt)
      .limit(limit)
      .offset(offset);
  }

  static async verifyConnection() {
    return verifyConnection();
  }
}

function extractNameFromEmail(email: string): string {
  const match = email.match(/^([^<@]+)</);
  if (match) {
    return match[1].trim().replace(/"/g, '');
  }
  return email.split('@')[0];
}
