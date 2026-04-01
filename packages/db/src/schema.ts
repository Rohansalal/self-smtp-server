import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const contacts = sqliteTable('contacts', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  email: text('email').notNull(),
  firstName: text('first_name'),
  lastName: text('last_name'),
  company: text('company'),
  tags: text('tags'),
  status: text('status').default('active').notNull(),
  lastSentAt: integer('last_sent_at', { mode: 'timestamp' }),
  lastReceivedAt: integer('last_received_at', { mode: 'timestamp' }),
  openCount: integer('open_count').default(0),
  clickCount: integer('click_count').default(0),
  replyCount: integer('reply_count').default(0),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
});

export const campaigns = sqliteTable('campaigns', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  subject: text('subject').notNull(),
  htmlTemplate: text('html_template'),
  textTemplate: text('text_template'),
  fromName: text('from_name').default('Protechplanner'),
  fromEmail: text('from_email').default('info@protechplanner.com'),
  userId: integer('user_id'),
  totalRecipients: integer('total_recipients').default(0),
  sentCount: integer('sent_count').default(0),
  openedCount: integer('opened_count').default(0),
  clickedCount: integer('clicked_count').default(0),
  repliedCount: integer('replied_count').default(0),
  failedCount: integer('failed_count').default(0),
  status: text('status').default('draft').notNull(),
  scheduledAt: integer('scheduled_at', { mode: 'timestamp' }),
  startedAt: integer('started_at', { mode: 'timestamp' }),
  completedAt: integer('completed_at', { mode: 'timestamp' }),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
});

export const campaignContacts = sqliteTable('campaign_contacts', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  campaignId: integer('campaign_id').notNull(),
  contactId: integer('contact_id').notNull(),
  status: text('status').default('pending').notNull(),
  sentAt: integer('sent_at', { mode: 'timestamp' }),
  openedAt: integer('opened_at', { mode: 'timestamp' }),
  clickedAt: integer('clicked_at', { mode: 'timestamp' }),
  repliedAt: integer('replied_at', { mode: 'timestamp' }),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
});

export const emailLogs = sqliteTable('email_logs', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  toEmail: text('to_email').notNull(),
  fromEmail: text('from_email').notNull().default('info@protechplanner.com'),
  subject: text('subject').notNull(),
  html: text('html'),
  text: text('text'),
  campaignId: integer('campaign_id'),
  contactId: integer('contact_id'),
  messageId: text('message_id'),
  inReplyTo: text('in_reply_to'),
  status: text('status').default('queued').notNull(),
  errorMessage: text('error_message'),
  provider: text('provider').default('haraka'),
  sentAt: integer('sent_at', { mode: 'timestamp' }),
  openedAt: integer('opened_at', { mode: 'timestamp' }),
  clickedAt: integer('clicked_at', { mode: 'timestamp' }),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
});

export const inboundEmails = sqliteTable('inbound_emails', {
  id: text('id').primaryKey(), // UUID
  fromEmail: text('from_email').notNull(),
  toEmail: text('to_email').notNull(),
  subject: text('subject').notNull(),
  body: text('body'),
  html: text('html'),
  headers: text('headers'), // JSON string
  attachments: text('attachments'), // JSON string
  messageId: text('message_id'),
  inReplyTo: text('in_reply_to'),
  references: text('references'), // JSON string
  contactId: integer('contact_id'),
  emailLogId: integer('email_log_id'), // Related outbound email if reply
  status: text('status').default('received').notNull(),
  processedAt: integer('processed_at', { mode: 'timestamp' }),
  receivedAt: integer('received_at', { mode: 'timestamp' }).notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
});

export const trackingPixels = sqliteTable('tracking_pixels', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  emailLogId: integer('email_log_id').notNull(),
  url: text('url').notNull(),
  clickedAt: integer('clicked_at', { mode: 'timestamp' }),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
});

export type Contact = typeof contacts.$inferSelect;
export type NewContact = typeof contacts.$inferInsert;
export type Campaign = typeof campaigns.$inferSelect;
export type NewCampaign = typeof campaigns.$inferInsert;
export type CampaignContact = typeof campaignContacts.$inferSelect;
export type NewCampaignContact = typeof campaignContacts.$inferInsert;
export type EmailLog = typeof emailLogs.$inferSelect;
export type NewEmailLog = typeof emailLogs.$inferInsert;
export type InboundEmail = typeof inboundEmails.$inferSelect;
export type NewInboundEmail = typeof inboundEmails.$inferInsert;
export type TrackingPixel = typeof trackingPixels.$inferSelect;
export type NewTrackingPixel = typeof trackingPixels.$inferInsert;
