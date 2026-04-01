"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.worker = void 0;
const bullmq_1 = require("bullmq");
const ioredis_1 = __importDefault(require("ioredis"));
const drizzle_orm_1 = require("drizzle-orm");
const index_1 = require("../db/index");
const transporter_1 = require("../mail/transporter");
const env_1 = require("../env");
const connection = new ioredis_1.default({
    host: env_1.env.redis.host,
    port: env_1.env.redis.port,
});
exports.worker = new bullmq_1.Worker('email-queue', async (job) => {
    const { id, to, subject, html, text, contactId } = job.data;
    try {
        await transporter_1.transporter.sendMail({
            from: `"Protechplanner" <${env_1.env.email.user}>`,
            to,
            subject,
            html: html || '',
            text: text || '',
        });
        await index_1.db.update(index_1.emailLogs).set({
            status: 'sent',
            sentAt: new Date(),
            updatedAt: new Date()
        }).where((0, drizzle_orm_1.eq)(index_1.emailLogs.id, id));
        if (contactId) {
            const [contact] = await index_1.db.select().from(index_1.contacts).where((0, drizzle_orm_1.eq)(index_1.contacts.id, contactId));
            if (contact) {
                await index_1.db.update(index_1.contacts).set({
                    lastSentAt: new Date(),
                    updatedAt: new Date(),
                }).where((0, drizzle_orm_1.eq)(index_1.contacts.id, contactId));
            }
        }
        console.log(`[SENT] ${to}: ${subject}`);
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        await index_1.db.update(index_1.emailLogs).set({
            status: 'failed',
            errorMessage,
            updatedAt: new Date()
        }).where((0, drizzle_orm_1.eq)(index_1.emailLogs.id, id));
        console.error(`[FAILED] ${to}:`, errorMessage);
        throw error;
    }
}, {
    connection,
    limiter: {
        max: 20,
        duration: 60000,
    },
});
console.log('📧 Email worker started - Processing queue...');
//# sourceMappingURL=worker.js.map