import { eq, and } from 'drizzle-orm';
import { db, contacts, campaigns, campaignContacts, emailLogs, NewContact, NewCampaign, NewCampaignContact } from '../db/index';
import { emailQueue } from '../queue/queue';
import { EmailService as EmailSvc } from './email.service';

interface CreateCampaignInput {
  name: string;
  subject: string;
  htmlTemplate?: string | null;
  textTemplate?: string | null;
  fromName?: string | null;
  fromEmail?: string | null;
  userId?: number | null;
}

interface AddContactInput {
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  company?: string | null;
  tags?: string | null;
}

export class CampaignService {
  static async create(data: CreateCampaignInput) {
    const [campaign] = await db.insert(campaigns).values({
      name: data.name,
      subject: data.subject,
      htmlTemplate: data.htmlTemplate ?? null,
      textTemplate: data.textTemplate ?? null,
      fromName: data.fromName || 'Protechplanner',
      fromEmail: data.fromEmail || 'info@protechplanner.com',
      userId: data.userId ?? null,
      status: 'draft',
      createdAt: new Date(),
      updatedAt: new Date(),
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
          firstName: contact.firstName ?? null,
          lastName: contact.lastName ?? null,
          company: contact.company ?? null,
          tags: contact.tags ?? null,
          status: 'active',
          createdAt: new Date(),
          updatedAt: new Date(),
        }).returning();
        contactId = saved.id;
        savedContacts.push(saved);
      }

      await db.insert(campaignContacts).values({
        campaignId,
        contactId,
        status: 'pending',
        createdAt: new Date(),
      });

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
    
    const allContacts = [];
    for (const id of contactIds) {
      const [contact] = await db.select().from(contacts).where(eq(contacts.id, id)).limit(1);
      if (contact) allContacts.push(contact);
    }
    return allContacts;
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
        await EmailSvc.send({
          to: contact[0].email,
          subject: campaign.subject,
          html: campaign.htmlTemplate ?? undefined,
          text: campaign.textTemplate ?? undefined,
          from: campaign.fromEmail || 'info@protechplanner.com',
          campaignId,
          contactId: contact[0].id,
        });
      }
    }

    return { status: 'queued', count: campaignContactList.length };
  }

  static async updateStatus(campaignId: number, status: string) {
    const updateData: Record<string, any> = { 
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
      firstName: data.firstName ?? null,
      lastName: data.lastName ?? null,
      company: data.company ?? null,
      tags: data.tags ?? null,
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    }).returning();
    return contact;
  }

  static async createBulk(data: AddContactInput[]) {
    const values = data.map(c => ({
      email: c.email,
      firstName: c.firstName ?? null,
      lastName: c.lastName ?? null,
      company: c.company ?? null,
      tags: c.tags ?? null,
      status: 'active' as const,
      createdAt: new Date(),
      updatedAt: new Date(),
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
    const contactsList: AddContactInput[] = [];

    for (let i = 1; i < lines.length; i++) {
      const parts = lines[i].split(',').map(p => p.trim());
      if (parts[0]) {
        contactsList.push({
          email: parts[0],
          firstName: parts[1] || undefined,
          lastName: parts[2] || undefined,
          company: parts[3] || undefined,
          tags: parts[4] || undefined,
        });
      }
    }

    return this.createBulk(contactsList);
  }
}
