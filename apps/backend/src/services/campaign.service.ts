import { eq, and } from 'drizzle-orm';
import { db, contacts, campaigns, campaignContacts, emailLogs, NewContact, NewCampaign, NewCampaignContact } from '../db/index';
import { emailQueue } from '../queue/queue';

interface CreateCampaignInput {
  name: string;
  subject: string;
  htmlTemplate?: string;
  textTemplate?: string;
  fromName?: string;
  userId?: number;
}

interface AddContactInput {
  email: string;
  firstName?: string;
  lastName?: string;
  company?: string;
  tags?: string;
}

export class CampaignService {
  static async create(data: CreateCampaignInput) {
    const [campaign] = await db.insert(campaigns).values({
      name: data.name,
      subject: data.subject,
      htmlTemplate: data.htmlTemplate,
      textTemplate: data.textTemplate,
      fromName: data.fromName || 'Protechplanner',
      userId: data.userId,
      status: 'draft',
    }).returning();
    return campaign;
  }

  static async get(id: number) {
    const [campaign] = await db.select().from(campaigns).where(eq(campaigns.id, id));
    return campaign;
  }

  static async list(limit = 50, offset = 0) {
    return db.select().from(campaigns).orderBy(campaigns.createdAt).limit(limit).offset(offset);
  }

  static async update(id: number, data: Partial<CreateCampaignInput>) {
    await db.update(campaigns).set({ ...data, updatedAt: new Date() }).where(eq(campaigns.id, id));
    return this.get(id);
  }

  static async delete(id: number) {
    await db.delete(campaignContacts).where(eq(campaignContacts.campaignId, id));
    await db.delete(campaigns).where(eq(campaigns.id, id));
    return { success: true };
  }

  static async addContacts(campaignId: number, contactList: AddContactInput[]) {
    const savedContacts: NewContact[] = [];

    for (const contact of contactList) {
      const existing = await db.select().from(contacts).where(eq(contacts.email, contact.email)).limit(1);
      
      let contactId: number;
      
      if (existing.length > 0) {
        contactId = existing[0].id;
      } else {
        const [saved] = await db.insert(contacts).values({
          email: contact.email,
          firstName: contact.firstName,
          lastName: contact.lastName,
          company: contact.company,
          tags: contact.tags,
          status: 'active',
        }).returning();
        contactId = saved.id;
        savedContacts.push(saved);
      }

      const [campaignContact] = await db.insert(campaignContacts).values({
        campaignId,
        contactId,
        status: 'pending',
      }).returning();

      await db.update(campaigns).set({ 
        totalRecipients: await this.getContactCount(campaignId),
        updatedAt: new Date()
      }).where(eq(campaigns.id, campaignId));
    }

    return { added: contactList.length, contacts: savedContacts };
  }

  static async getContactCount(campaignId: number) {
    const result = await db.select().from(campaignContacts).where(eq(campaignContacts.campaignId, campaignId));
    return result.length;
  }

  static async getContacts(campaignId: number) {
    const cc = await db.select().from(campaignContacts).where(eq(campaignContacts.campaignId, campaignId));
    const contactIds = cc.map(c => c.contactId);
    
    if (contactIds.length === 0) return [];
    
    return db.select().from(contacts).where(
      // @ts-expect-error - dynamic where
      contacts.id.in(contactIds)
    );
  }

  static async start(campaignId: number) {
    const campaign = await this.get(campaignId);
    if (!campaign) throw new Error('Campaign not found');

    const campaignContactList = await db.select().from(campaignContacts).where(eq(campaignContacts.campaignId, campaignId));

    await db.update(campaigns).set({ 
      status: 'sending',
      startedAt: new Date(),
      updatedAt: new Date()
    }).where(eq(campaigns.id, campaignId));

    for (const cc of campaignContactList) {
      const contact = await db.select().from(contacts).where(eq(contacts.id, cc.contactId)).limit(1);
      
      if (contact.length > 0 && contact[0].email) {
        const [log] = await db.insert(emailLogs).values({
          toEmail: contact[0].email,
          fromEmail: 'info@protechplanner.com',
          subject: campaign.subject,
          html: campaign.htmlTemplate,
          text: campaign.textTemplate,
          campaignId,
          contactId: contact[0].id,
          status: 'queued',
        }).returning();

        await emailQueue.add('send-email', {
          id: log.id,
          to: contact[0].email,
          subject: campaign.subject,
          html: campaign.htmlTemplate,
          text: campaign.textTemplate,
          campaignId,
          contactId: contact[0].id,
        });
      }
    }

    return { status: 'queued', count: campaignContactList.length };
  }

  static async updateStatus(campaignId: number, status: string) {
    const updateData: Record<string, unknown> = { 
      status, 
      updatedAt: new Date() 
    };

    if (status === 'completed') {
      updateData.completedAt = new Date();
    }

    await db.update(campaigns).set(updateData).where(eq(campaigns.id, campaignId));
    return { success: true };
  }

  static async updateStats(campaignId: number) {
    const sent = await db.select().from(emailLogs).where(
      and(eq(emailLogs.campaignId, campaignId), eq(emailLogs.status, 'sent'))
    );
    const opened = await db.select().from(emailLogs).where(
      and(eq(emailLogs.campaignId, campaignId), eq(emailLogs.status, 'sent'))
    );
    const clicked = await db.select().from(emailLogs).where(
      and(eq(emailLogs.campaignId, campaignId), eq(emailLogs.status, 'sent'))
    );
    const failed = await db.select().from(emailLogs).where(
      and(eq(emailLogs.campaignId, campaignId), eq(emailLogs.status, 'failed'))
    );

    await db.update(campaigns).set({
      sentCount: sent.length,
      openedCount: opened.filter(e => e.openedAt).length,
      clickedCount: clicked.filter(e => e.clickedAt).length,
      failedCount: failed.length,
      updatedAt: new Date(),
    }).where(eq(campaigns.id, campaignId));

    return { 
      sent: sent.length, 
      opened: opened.filter(e => e.openedAt).length,
      clicked: clicked.filter(e => e.clickedAt).length,
      failed: failed.length 
    };
  }
}

export class ContactService {
  static async create(data: AddContactInput) {
    const [contact] = await db.insert(contacts).values({
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      company: data.company,
      tags: data.tags,
      status: 'active',
    }).returning();
    return contact;
  }

  static async createBulk(data: AddContactInput[]) {
    const values = data.map(c => ({
      email: c.email,
      firstName: c.firstName,
      lastName: c.lastName,
      company: c.company,
      tags: c.tags,
      status: 'active' as const,
    }));
    return db.insert(contacts).values(values).returning();
  }

  static async get(id: number) {
    const [contact] = await db.select().from(contacts).where(eq(contacts.id, id));
    return contact;
  }

  static async getByEmail(email: string) {
    const [contact] = await db.select().from(contacts).where(eq(contacts.email, email));
    return contact;
  }

  static async list(limit = 50, offset = 0) {
    return db.select().from(contacts).orderBy(contacts.createdAt).limit(limit).offset(offset);
  }

  static async update(id: number, data: Partial<AddContactInput>) {
    await db.update(contacts).set({ ...data, updatedAt: new Date() }).where(eq(contacts.id, id));
    return this.get(id);
  }

  static async delete(id: number) {
    await db.update(contacts).set({ status: 'deleted', updatedAt: new Date() }).where(eq(contacts.id, id));
    return { success: true };
  }

  static async importFromCSV(csvData: string) {
    const lines = csvData.split('\n').filter(line => line.trim());
    const contacts: AddContactInput[] = [];

    for (let i = 1; i < lines.length; i++) {
      const parts = lines[i].split(',').map(p => p.trim());
      if (parts[0]) {
        contacts.push({
          email: parts[0],
          firstName: parts[1] || '',
          lastName: parts[2] || '',
          company: parts[3] || '',
          tags: parts[4] || '',
        });
      }
    }

    return this.createBulk(contacts);
  }
}

export class EmailService {
  static async logEmail(data: {
    to: string;
    subject: string;
    html?: string;
    text?: string;
    campaignId?: number;
    contactId?: number;
  }) {
    const [log] = await db.insert(emailLogs).values({
      toEmail: data.to,
      subject: data.subject,
      html: data.html,
      text: data.text,
      campaignId: data.campaignId,
      contactId: data.contactId,
      status: 'queued',
    }).returning();
    return log;
  }

  static async getStatus(id: number) {
    const [log] = await db.select().from(emailLogs).where(eq(emailLogs.id, id));
    return log;
  }

  static async list(campaignId?: number, limit = 50, offset = 0) {
    if (campaignId) {
      return db.select().from(emailLogs).where(eq(emailLogs.campaignId, campaignId)).limit(limit).offset(offset);
    }
    return db.select().from(emailLogs).orderBy(emailLogs.createdAt).limit(limit).offset(offset);
  }

  static async trackOpen(id: number) {
    await db.update(emailLogs).set({ 
      openedAt: new Date(),
      updatedAt: new Date()
    }).where(eq(emailLogs.id, id));
    
    const log = await this.getStatus(id);
    if (log?.contactId) {
      await db.update(contacts).set({ 
        openCount: (await this.get(log.contactId))?.openCount || 0 + 1,
        updatedAt: new Date()
      }).where(eq(contacts.id, log.contactId));
    }
  }

  static async trackClick(id: number) {
    await db.update(emailLogs).set({ 
      clickedAt: new Date(),
      updatedAt: new Date()
    }).where(eq(emailLogs.id, id));

    const log = await this.getStatus(id);
    if (log?.contactId) {
      const contact = await ContactService.get(log.contactId);
      await db.update(contacts).set({ 
        clickCount: (contact?.clickCount || 0) + 1,
        updatedAt: new Date()
      }).where(eq(contacts.id, log.contactId));
    }
  }
}