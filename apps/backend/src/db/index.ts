import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import * as schema from './schema';

const sqlite = new Database('./data/emails.db');
export const db = drizzle(sqlite, { schema });

export const { contacts, campaigns, campaignContacts, emailLogs, trackingPixels } = schema;
export type Contact = typeof schema.contacts.$inferSelect;
export type NewContact = typeof schema.contacts.$inferInsert;
export type Campaign = typeof schema.campaigns.$inferSelect;
export type NewCampaign = typeof schema.campaigns.$inferInsert;
export type CampaignContact = typeof schema.campaignContacts.$inferSelect;
export type NewCampaignContact = typeof schema.campaignContacts.$inferInsert;
export type EmailLog = typeof schema.emailLogs.$inferSelect;
export type NewEmailLog = typeof schema.emailLogs.$inferInsert;
export type TrackingPixel = typeof schema.trackingPixels.$inferSelect;
export type NewTrackingPixel = typeof schema.trackingPixels.$inferInsert;