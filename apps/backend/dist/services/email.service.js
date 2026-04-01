"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const index_1 = require("../db/index");
const queue_1 = require("../queue/queue");
const transporter_1 = require("../mail/transporter");
class EmailService {
    static async send(data) {
        const [log] = await index_1.db.insert(index_1.emailLogs).values({
            toEmail: data.to,
            fromEmail: (data.from || 'info@protechplanner.com'),
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
        await queue_1.emailQueue.add('send-email', {
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
    static async sendBatch(emails) {
        const results = [];
        for (const email of emails) {
            const result = await this.send(email);
            results.push(result);
        }
        return results;
    }
    static async processInbound(data) {
        let relatedEmailLogId;
        let relatedContactId;
        if (data.inReplyTo) {
            const [originalEmail] = await index_1.db
                .select()
                .from(index_1.emailLogs)
                .where((0, drizzle_orm_1.eq)(index_1.emailLogs.messageId, data.inReplyTo))
                .limit(1);
            if (originalEmail) {
                relatedEmailLogId = originalEmail.id;
                relatedContactId = originalEmail.contactId || undefined;
            }
        }
        const fromEmail = data.from;
        let contact = await index_1.db
            .select()
            .from(index_1.contacts)
            .where((0, drizzle_orm_1.eq)(index_1.contacts.email, fromEmail))
            .limit(1);
        if (contact.length === 0) {
            const [newContact] = await index_1.db.insert(index_1.contacts).values({
                email: fromEmail,
                firstName: extractNameFromEmail(fromEmail),
                status: 'active',
                lastReceivedAt: new Date(),
                createdAt: new Date(),
                updatedAt: new Date(),
            }).returning();
            relatedContactId = newContact.id;
        }
        else {
            relatedContactId = contact[0].id;
            await index_1.db
                .update(index_1.contacts)
                .set({
                lastReceivedAt: new Date(),
                replyCount: (contact[0].replyCount || 0) + 1,
                updatedAt: new Date()
            })
                .where((0, drizzle_orm_1.eq)(index_1.contacts.id, contact[0].id));
        }
        const [inboundEmail] = await index_1.db.insert(index_1.inboundEmails).values({
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
            const [originalLog] = await index_1.db
                .select()
                .from(index_1.emailLogs)
                .where((0, drizzle_orm_1.eq)(index_1.emailLogs.id, relatedEmailLogId))
                .limit(1);
            if (originalLog?.campaignId) {
                await index_1.db
                    .update(index_1.campaigns)
                    .set({
                    repliedCount: await this.getReplyCount(originalLog.campaignId),
                    updatedAt: new Date()
                })
                    .where((0, drizzle_orm_1.eq)(index_1.campaigns.id, originalLog.campaignId));
            }
        }
        return inboundEmail;
    }
    static async getReplyCount(campaignId) {
        const replies = await index_1.db
            .select()
            .from(index_1.inboundEmails)
            .innerJoin(index_1.emailLogs, (0, drizzle_orm_1.eq)(index_1.inboundEmails.emailLogId, index_1.emailLogs.id))
            .where((0, drizzle_orm_1.eq)(index_1.emailLogs.campaignId, campaignId));
        return replies.length;
    }
    static async getStatus(id) {
        const [log] = await index_1.db.select().from(index_1.emailLogs).where((0, drizzle_orm_1.eq)(index_1.emailLogs.id, id));
        return log;
    }
    static async list(campaignId, limit = 50, offset = 0) {
        if (campaignId) {
            return index_1.db
                .select()
                .from(index_1.emailLogs)
                .where((0, drizzle_orm_1.eq)(index_1.emailLogs.campaignId, campaignId))
                .limit(limit)
                .offset(offset);
        }
        return index_1.db
            .select()
            .from(index_1.emailLogs)
            .orderBy(index_1.emailLogs.createdAt)
            .limit(limit)
            .offset(offset);
    }
    static async listInbound(limit = 50, offset = 0) {
        return index_1.db
            .select()
            .from(index_1.inboundEmails)
            .orderBy(index_1.inboundEmails.receivedAt)
            .limit(limit)
            .offset(offset);
    }
    static async verifyConnection() {
        return (0, transporter_1.verifyConnection)();
    }
}
exports.EmailService = EmailService;
function extractNameFromEmail(email) {
    const match = email.match(/^([^<@]+)</);
    if (match) {
        return match[1].trim().replace(/"/g, '');
    }
    return email.split('@')[0];
}
//# sourceMappingURL=email.service.js.map