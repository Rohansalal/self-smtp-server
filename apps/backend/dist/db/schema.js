"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trackingPixels = exports.inboundEmails = exports.emailLogs = exports.campaignContacts = exports.campaigns = exports.contacts = void 0;
const sqlite_core_1 = require("drizzle-orm/sqlite-core");
exports.contacts = (0, sqlite_core_1.sqliteTable)('contacts', {
    id: (0, sqlite_core_1.integer)('id').primaryKey({ autoIncrement: true }),
    email: (0, sqlite_core_1.text)('email').notNull(),
    firstName: (0, sqlite_core_1.text)('first_name'),
    lastName: (0, sqlite_core_1.text)('last_name'),
    company: (0, sqlite_core_1.text)('company'),
    tags: (0, sqlite_core_1.text)('tags'),
    status: (0, sqlite_core_1.text)('status').default('active').notNull(),
    lastSentAt: (0, sqlite_core_1.integer)('last_sent_at', { mode: 'timestamp' }),
    lastReceivedAt: (0, sqlite_core_1.integer)('last_received_at', { mode: 'timestamp' }),
    openCount: (0, sqlite_core_1.integer)('open_count').default(0),
    clickCount: (0, sqlite_core_1.integer)('click_count').default(0),
    replyCount: (0, sqlite_core_1.integer)('reply_count').default(0),
    createdAt: (0, sqlite_core_1.integer)('created_at', { mode: 'timestamp' }).notNull(),
    updatedAt: (0, sqlite_core_1.integer)('updated_at', { mode: 'timestamp' }).notNull(),
});
exports.campaigns = (0, sqlite_core_1.sqliteTable)('campaigns', {
    id: (0, sqlite_core_1.integer)('id').primaryKey({ autoIncrement: true }),
    name: (0, sqlite_core_1.text)('name').notNull(),
    subject: (0, sqlite_core_1.text)('subject').notNull(),
    htmlTemplate: (0, sqlite_core_1.text)('html_template'),
    textTemplate: (0, sqlite_core_1.text)('text_template'),
    fromName: (0, sqlite_core_1.text)('from_name').default('Protechplanner'),
    fromEmail: (0, sqlite_core_1.text)('from_email').default('info@protechplanner.com'),
    userId: (0, sqlite_core_1.integer)('user_id'),
    totalRecipients: (0, sqlite_core_1.integer)('total_recipients').default(0),
    sentCount: (0, sqlite_core_1.integer)('sent_count').default(0),
    openedCount: (0, sqlite_core_1.integer)('opened_count').default(0),
    clickedCount: (0, sqlite_core_1.integer)('clicked_count').default(0),
    repliedCount: (0, sqlite_core_1.integer)('replied_count').default(0),
    failedCount: (0, sqlite_core_1.integer)('failed_count').default(0),
    status: (0, sqlite_core_1.text)('status').default('draft').notNull(),
    scheduledAt: (0, sqlite_core_1.integer)('scheduled_at', { mode: 'timestamp' }),
    startedAt: (0, sqlite_core_1.integer)('started_at', { mode: 'timestamp' }),
    completedAt: (0, sqlite_core_1.integer)('completed_at', { mode: 'timestamp' }),
    createdAt: (0, sqlite_core_1.integer)('created_at', { mode: 'timestamp' }).notNull(),
    updatedAt: (0, sqlite_core_1.integer)('updated_at', { mode: 'timestamp' }).notNull(),
});
exports.campaignContacts = (0, sqlite_core_1.sqliteTable)('campaign_contacts', {
    id: (0, sqlite_core_1.integer)('id').primaryKey({ autoIncrement: true }),
    campaignId: (0, sqlite_core_1.integer)('campaign_id').notNull(),
    contactId: (0, sqlite_core_1.integer)('contact_id').notNull(),
    status: (0, sqlite_core_1.text)('status').default('pending').notNull(),
    sentAt: (0, sqlite_core_1.integer)('sent_at', { mode: 'timestamp' }),
    openedAt: (0, sqlite_core_1.integer)('opened_at', { mode: 'timestamp' }),
    clickedAt: (0, sqlite_core_1.integer)('clicked_at', { mode: 'timestamp' }),
    repliedAt: (0, sqlite_core_1.integer)('replied_at', { mode: 'timestamp' }),
    createdAt: (0, sqlite_core_1.integer)('created_at', { mode: 'timestamp' }).notNull(),
});
exports.emailLogs = (0, sqlite_core_1.sqliteTable)('email_logs', {
    id: (0, sqlite_core_1.integer)('id').primaryKey({ autoIncrement: true }),
    toEmail: (0, sqlite_core_1.text)('to_email').notNull(),
    fromEmail: (0, sqlite_core_1.text)('from_email').notNull().default('info@protechplanner.com'),
    subject: (0, sqlite_core_1.text)('subject').notNull(),
    html: (0, sqlite_core_1.text)('html'),
    text: (0, sqlite_core_1.text)('text'),
    campaignId: (0, sqlite_core_1.integer)('campaign_id'),
    contactId: (0, sqlite_core_1.integer)('contact_id'),
    messageId: (0, sqlite_core_1.text)('message_id'),
    inReplyTo: (0, sqlite_core_1.text)('in_reply_to'),
    status: (0, sqlite_core_1.text)('status').default('queued').notNull(),
    errorMessage: (0, sqlite_core_1.text)('error_message'),
    provider: (0, sqlite_core_1.text)('provider').default('haraka'),
    sentAt: (0, sqlite_core_1.integer)('sent_at', { mode: 'timestamp' }),
    openedAt: (0, sqlite_core_1.integer)('opened_at', { mode: 'timestamp' }),
    clickedAt: (0, sqlite_core_1.integer)('clicked_at', { mode: 'timestamp' }),
    createdAt: (0, sqlite_core_1.integer)('created_at', { mode: 'timestamp' }).notNull(),
    updatedAt: (0, sqlite_core_1.integer)('updated_at', { mode: 'timestamp' }).notNull(),
});
exports.inboundEmails = (0, sqlite_core_1.sqliteTable)('inbound_emails', {
    id: (0, sqlite_core_1.text)('id').primaryKey(), // UUID
    fromEmail: (0, sqlite_core_1.text)('from_email').notNull(),
    toEmail: (0, sqlite_core_1.text)('to_email').notNull(),
    subject: (0, sqlite_core_1.text)('subject').notNull(),
    body: (0, sqlite_core_1.text)('body'),
    html: (0, sqlite_core_1.text)('html'),
    headers: (0, sqlite_core_1.text)('headers'), // JSON string
    attachments: (0, sqlite_core_1.text)('attachments'), // JSON string
    messageId: (0, sqlite_core_1.text)('message_id'),
    inReplyTo: (0, sqlite_core_1.text)('in_reply_to'),
    references: (0, sqlite_core_1.text)('references'), // JSON string
    contactId: (0, sqlite_core_1.integer)('contact_id'),
    emailLogId: (0, sqlite_core_1.integer)('email_log_id'), // Related outbound email if reply
    status: (0, sqlite_core_1.text)('status').default('received').notNull(),
    processedAt: (0, sqlite_core_1.integer)('processed_at', { mode: 'timestamp' }),
    receivedAt: (0, sqlite_core_1.integer)('received_at', { mode: 'timestamp' }).notNull(),
    createdAt: (0, sqlite_core_1.integer)('created_at', { mode: 'timestamp' }).notNull(),
    updatedAt: (0, sqlite_core_1.integer)('updated_at', { mode: 'timestamp' }).notNull(),
});
exports.trackingPixels = (0, sqlite_core_1.sqliteTable)('tracking_pixels', {
    id: (0, sqlite_core_1.integer)('id').primaryKey({ autoIncrement: true }),
    emailLogId: (0, sqlite_core_1.integer)('email_log_id').notNull(),
    url: (0, sqlite_core_1.text)('url').notNull(),
    clickedAt: (0, sqlite_core_1.integer)('clicked_at', { mode: 'timestamp' }),
    ipAddress: (0, sqlite_core_1.text)('ip_address'),
    userAgent: (0, sqlite_core_1.text)('user_agent'),
    createdAt: (0, sqlite_core_1.integer)('created_at', { mode: 'timestamp' }).notNull(),
});
//# sourceMappingURL=schema.js.map