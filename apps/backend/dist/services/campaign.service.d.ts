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
export declare class CampaignService {
    static create(data: CreateCampaignInput): Promise<{
        id: number;
        name: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        subject: string;
        htmlTemplate: string;
        textTemplate: string;
        fromName: string;
        fromEmail: string;
        userId: number;
        totalRecipients: number;
        sentCount: number;
        openedCount: number;
        clickedCount: number;
        repliedCount: number;
        failedCount: number;
        scheduledAt: Date;
        startedAt: Date;
        completedAt: Date;
    }>;
    static get(id: number): Promise<{
        id: number;
        name: string;
        subject: string;
        htmlTemplate: string;
        textTemplate: string;
        fromName: string;
        fromEmail: string;
        userId: number;
        totalRecipients: number;
        sentCount: number;
        openedCount: number;
        clickedCount: number;
        repliedCount: number;
        failedCount: number;
        status: string;
        scheduledAt: Date;
        startedAt: Date;
        completedAt: Date;
        createdAt: Date;
        updatedAt: Date;
    }>;
    static list(limit?: number, offset?: number): Promise<{
        id: number;
        name: string;
        subject: string;
        htmlTemplate: string;
        textTemplate: string;
        fromName: string;
        fromEmail: string;
        userId: number;
        totalRecipients: number;
        sentCount: number;
        openedCount: number;
        clickedCount: number;
        repliedCount: number;
        failedCount: number;
        status: string;
        scheduledAt: Date;
        startedAt: Date;
        completedAt: Date;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    static update(id: number, data: Partial<CreateCampaignInput>): Promise<{
        id: number;
        name: string;
        subject: string;
        htmlTemplate: string;
        textTemplate: string;
        fromName: string;
        fromEmail: string;
        userId: number;
        totalRecipients: number;
        sentCount: number;
        openedCount: number;
        clickedCount: number;
        repliedCount: number;
        failedCount: number;
        status: string;
        scheduledAt: Date;
        startedAt: Date;
        completedAt: Date;
        createdAt: Date;
        updatedAt: Date;
    }>;
    static delete(id: number): Promise<{
        success: boolean;
    }>;
    static addContacts(campaignId: number, contactList: AddContactInput[]): Promise<{
        added: number;
        contacts: {
            email: string;
            createdAt: Date;
            updatedAt: Date;
            id?: number;
            firstName?: string;
            lastName?: string;
            company?: string;
            tags?: string;
            status?: string;
            lastSentAt?: Date;
            lastReceivedAt?: Date;
            openCount?: number;
            clickCount?: number;
            replyCount?: number;
        }[];
    }>;
    static getContactCount(campaignId: number): Promise<number>;
    static getContacts(campaignId: number): Promise<any[]>;
    static start(campaignId: number): Promise<{
        status: string;
        count: number;
    }>;
    static updateStatus(campaignId: number, status: string): Promise<{
        success: boolean;
    }>;
    static updateStats(campaignId: number): Promise<{
        sent: number;
        opened: number;
        clicked: number;
        failed: number;
    }>;
}
export declare class ContactService {
    static create(data: AddContactInput): Promise<{
        id: number;
        email: string;
        firstName: string;
        lastName: string;
        company: string;
        tags: string;
        status: string;
        lastSentAt: Date;
        lastReceivedAt: Date;
        openCount: number;
        clickCount: number;
        replyCount: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    static createBulk(data: AddContactInput[]): Promise<{
        id: number;
        email: string;
        firstName: string;
        lastName: string;
        company: string;
        tags: string;
        status: string;
        lastSentAt: Date;
        lastReceivedAt: Date;
        openCount: number;
        clickCount: number;
        replyCount: number;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    static get(id: number): Promise<{
        id: number;
        email: string;
        firstName: string;
        lastName: string;
        company: string;
        tags: string;
        status: string;
        lastSentAt: Date;
        lastReceivedAt: Date;
        openCount: number;
        clickCount: number;
        replyCount: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    static getByEmail(email: string): Promise<{
        id: number;
        email: string;
        firstName: string;
        lastName: string;
        company: string;
        tags: string;
        status: string;
        lastSentAt: Date;
        lastReceivedAt: Date;
        openCount: number;
        clickCount: number;
        replyCount: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    static list(limit?: number, offset?: number): Promise<{
        id: number;
        email: string;
        firstName: string;
        lastName: string;
        company: string;
        tags: string;
        status: string;
        lastSentAt: Date;
        lastReceivedAt: Date;
        openCount: number;
        clickCount: number;
        replyCount: number;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    static update(id: number, data: Partial<AddContactInput>): Promise<{
        id: number;
        email: string;
        firstName: string;
        lastName: string;
        company: string;
        tags: string;
        status: string;
        lastSentAt: Date;
        lastReceivedAt: Date;
        openCount: number;
        clickCount: number;
        replyCount: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    static delete(id: number): Promise<{
        success: boolean;
    }>;
    static importFromCSV(csvData: string): Promise<{
        id: number;
        email: string;
        firstName: string;
        lastName: string;
        company: string;
        tags: string;
        status: string;
        lastSentAt: Date;
        lastReceivedAt: Date;
        openCount: number;
        clickCount: number;
        replyCount: number;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
}
export {};
//# sourceMappingURL=campaign.service.d.ts.map