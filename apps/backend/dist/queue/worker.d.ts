import { Worker } from 'bullmq';
interface EmailJob {
    id: number;
    to: string;
    subject: string;
    html?: string;
    text?: string;
    campaignId?: number;
    contactId?: number;
}
export declare const worker: Worker<EmailJob, any, string>;
export {};
//# sourceMappingURL=worker.d.ts.map