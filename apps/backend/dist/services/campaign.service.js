"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactService = exports.CampaignService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const index_1 = require("../db/index");
const email_service_1 = require("./email.service");
class CampaignService {
    static async create(data) {
        const [campaign] = await index_1.db.insert(index_1.campaigns).values({
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
    static async get(id) {
        const [campaign] = await index_1.db.select().from(index_1.campaigns).where((0, drizzle_orm_1.eq)(index_1.campaigns.id, id));
        return campaign;
    }
    static async list(limit = 50, offset = 0) {
        return index_1.db.select().from(index_1.campaigns).orderBy(index_1.campaigns.createdAt).limit(limit).offset(offset);
    }
    static async update(id, data) {
        await index_1.db.update(index_1.campaigns).set({ ...data, updatedAt: new Date() }).where((0, drizzle_orm_1.eq)(index_1.campaigns.id, id));
        return this.get(id);
    }
    static async delete(id) {
        await index_1.db.delete(index_1.campaignContacts).where((0, drizzle_orm_1.eq)(index_1.campaignContacts.campaignId, id));
        await index_1.db.delete(index_1.campaigns).where((0, drizzle_orm_1.eq)(index_1.campaigns.id, id));
        return { success: true };
    }
    static async addContacts(campaignId, contactList) {
        const savedContacts = [];
        for (const contact of contactList) {
            const existing = await index_1.db.select().from(index_1.contacts).where((0, drizzle_orm_1.eq)(index_1.contacts.email, contact.email)).limit(1);
            let contactId;
            if (existing.length > 0) {
                contactId = existing[0].id;
            }
            else {
                const [saved] = await index_1.db.insert(index_1.contacts).values({
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
            await index_1.db.insert(index_1.campaignContacts).values({
                campaignId,
                contactId,
                status: 'pending',
                createdAt: new Date(),
            });
            await index_1.db.update(index_1.campaigns).set({
                totalRecipients: await this.getContactCount(campaignId),
                updatedAt: new Date()
            }).where((0, drizzle_orm_1.eq)(index_1.campaigns.id, campaignId));
        }
        return { added: contactList.length, contacts: savedContacts };
    }
    static async getContactCount(campaignId) {
        const result = await index_1.db.select().from(index_1.campaignContacts).where((0, drizzle_orm_1.eq)(index_1.campaignContacts.campaignId, campaignId));
        return result.length;
    }
    static async getContacts(campaignId) {
        const cc = await index_1.db.select().from(index_1.campaignContacts).where((0, drizzle_orm_1.eq)(index_1.campaignContacts.campaignId, campaignId));
        const contactIds = cc.map(c => c.contactId);
        if (contactIds.length === 0)
            return [];
        const allContacts = [];
        for (const id of contactIds) {
            const [contact] = await index_1.db.select().from(index_1.contacts).where((0, drizzle_orm_1.eq)(index_1.contacts.id, id)).limit(1);
            if (contact)
                allContacts.push(contact);
        }
        return allContacts;
    }
    static async start(campaignId) {
        const campaign = await this.get(campaignId);
        if (!campaign)
            throw new Error('Campaign not found');
        const campaignContactList = await index_1.db.select().from(index_1.campaignContacts).where((0, drizzle_orm_1.eq)(index_1.campaignContacts.campaignId, campaignId));
        await index_1.db.update(index_1.campaigns).set({
            status: 'sending',
            startedAt: new Date(),
            updatedAt: new Date()
        }).where((0, drizzle_orm_1.eq)(index_1.campaigns.id, campaignId));
        for (const cc of campaignContactList) {
            const contact = await index_1.db.select().from(index_1.contacts).where((0, drizzle_orm_1.eq)(index_1.contacts.id, cc.contactId)).limit(1);
            if (contact.length > 0 && contact[0].email) {
                await email_service_1.EmailService.send({
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
    static async updateStatus(campaignId, status) {
        const updateData = {
            status,
            updatedAt: new Date()
        };
        if (status === 'completed') {
            updateData.completedAt = new Date();
        }
        await index_1.db.update(index_1.campaigns).set(updateData).where((0, drizzle_orm_1.eq)(index_1.campaigns.id, campaignId));
        return { success: true };
    }
    static async updateStats(campaignId) {
        const sent = await index_1.db.select().from(index_1.emailLogs).where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(index_1.emailLogs.campaignId, campaignId), (0, drizzle_orm_1.eq)(index_1.emailLogs.status, 'sent')));
        const opened = await index_1.db.select().from(index_1.emailLogs).where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(index_1.emailLogs.campaignId, campaignId), (0, drizzle_orm_1.eq)(index_1.emailLogs.status, 'sent')));
        const clicked = await index_1.db.select().from(index_1.emailLogs).where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(index_1.emailLogs.campaignId, campaignId), (0, drizzle_orm_1.eq)(index_1.emailLogs.status, 'sent')));
        const failed = await index_1.db.select().from(index_1.emailLogs).where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(index_1.emailLogs.campaignId, campaignId), (0, drizzle_orm_1.eq)(index_1.emailLogs.status, 'failed')));
        await index_1.db.update(index_1.campaigns).set({
            sentCount: sent.length,
            openedCount: opened.filter(e => e.openedAt).length,
            clickedCount: clicked.filter(e => e.clickedAt).length,
            failedCount: failed.length,
            updatedAt: new Date(),
        }).where((0, drizzle_orm_1.eq)(index_1.campaigns.id, campaignId));
        return {
            sent: sent.length,
            opened: opened.filter(e => e.openedAt).length,
            clicked: clicked.filter(e => e.clickedAt).length,
            failed: failed.length
        };
    }
}
exports.CampaignService = CampaignService;
class ContactService {
    static async create(data) {
        const [contact] = await index_1.db.insert(index_1.contacts).values({
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
    static async createBulk(data) {
        const values = data.map(c => ({
            email: c.email,
            firstName: c.firstName ?? null,
            lastName: c.lastName ?? null,
            company: c.company ?? null,
            tags: c.tags ?? null,
            status: 'active',
            createdAt: new Date(),
            updatedAt: new Date(),
        }));
        return index_1.db.insert(index_1.contacts).values(values).returning();
    }
    static async get(id) {
        const [contact] = await index_1.db.select().from(index_1.contacts).where((0, drizzle_orm_1.eq)(index_1.contacts.id, id));
        return contact;
    }
    static async getByEmail(email) {
        const [contact] = await index_1.db.select().from(index_1.contacts).where((0, drizzle_orm_1.eq)(index_1.contacts.email, email));
        return contact;
    }
    static async list(limit = 50, offset = 0) {
        return index_1.db.select().from(index_1.contacts).orderBy(index_1.contacts.createdAt).limit(limit).offset(offset);
    }
    static async update(id, data) {
        await index_1.db.update(index_1.contacts).set({ ...data, updatedAt: new Date() }).where((0, drizzle_orm_1.eq)(index_1.contacts.id, id));
        return this.get(id);
    }
    static async delete(id) {
        await index_1.db.update(index_1.contacts).set({ status: 'deleted', updatedAt: new Date() }).where((0, drizzle_orm_1.eq)(index_1.contacts.id, id));
        return { success: true };
    }
    static async importFromCSV(csvData) {
        const lines = csvData.split('\n').filter(line => line.trim());
        const contactsList = [];
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
exports.ContactService = ContactService;
//# sourceMappingURL=campaign.service.js.map