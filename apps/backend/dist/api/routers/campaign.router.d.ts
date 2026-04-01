export declare const campaignRouter: import("@trpc/server").CreateRouterInner<import("@trpc/server").RootConfig<{
    ctx: object;
    meta: object;
    errorShape: never;
    transformer: import("@trpc/server").DataTransformerOptions;
}>, {
    create: import("@trpc/server").BuildProcedure<"mutation", {
        _config: import("@trpc/server").RootConfig<{
            ctx: object;
            meta: object;
            errorShape: never;
            transformer: import("@trpc/server").DataTransformerOptions;
        }>;
        _meta: object;
        _ctx_out: object;
        _input_in: {
            name?: string;
            subject?: string;
            htmlTemplate?: string;
            textTemplate?: string;
            fromName?: string;
            userId?: number;
        };
        _input_out: {
            name?: string;
            subject?: string;
            htmlTemplate?: string;
            textTemplate?: string;
            fromName?: string;
            userId?: number;
        };
        _output_in: typeof import("@trpc/server").unsetMarker;
        _output_out: typeof import("@trpc/server").unsetMarker;
    }, {
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
    get: import("@trpc/server").BuildProcedure<"query", {
        _config: import("@trpc/server").RootConfig<{
            ctx: object;
            meta: object;
            errorShape: never;
            transformer: import("@trpc/server").DataTransformerOptions;
        }>;
        _meta: object;
        _ctx_out: object;
        _input_in: {
            id?: number;
        };
        _input_out: {
            id?: number;
        };
        _output_in: typeof import("@trpc/server").unsetMarker;
        _output_out: typeof import("@trpc/server").unsetMarker;
    }, {
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
    list: import("@trpc/server").BuildProcedure<"query", {
        _config: import("@trpc/server").RootConfig<{
            ctx: object;
            meta: object;
            errorShape: never;
            transformer: import("@trpc/server").DataTransformerOptions;
        }>;
        _meta: object;
        _ctx_out: object;
        _input_in: {
            limit?: number;
            offset?: number;
        };
        _input_out: {
            limit?: number;
            offset?: number;
        };
        _output_in: typeof import("@trpc/server").unsetMarker;
        _output_out: typeof import("@trpc/server").unsetMarker;
    }, {
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
    update: import("@trpc/server").BuildProcedure<"mutation", {
        _config: import("@trpc/server").RootConfig<{
            ctx: object;
            meta: object;
            errorShape: never;
            transformer: import("@trpc/server").DataTransformerOptions;
        }>;
        _meta: object;
        _ctx_out: object;
        _input_in: {
            id?: number;
            data?: {
                name?: string;
                subject?: string;
                htmlTemplate?: string;
                textTemplate?: string;
                fromName?: string;
                userId?: number;
            };
        };
        _input_out: {
            id?: number;
            data?: {
                name?: string;
                subject?: string;
                htmlTemplate?: string;
                textTemplate?: string;
                fromName?: string;
                userId?: number;
            };
        };
        _output_in: typeof import("@trpc/server").unsetMarker;
        _output_out: typeof import("@trpc/server").unsetMarker;
    }, {
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
    delete: import("@trpc/server").BuildProcedure<"mutation", {
        _config: import("@trpc/server").RootConfig<{
            ctx: object;
            meta: object;
            errorShape: never;
            transformer: import("@trpc/server").DataTransformerOptions;
        }>;
        _meta: object;
        _ctx_out: object;
        _input_in: {
            id?: number;
        };
        _input_out: {
            id?: number;
        };
        _output_in: typeof import("@trpc/server").unsetMarker;
        _output_out: typeof import("@trpc/server").unsetMarker;
    }, {
        success: boolean;
    }>;
    addContacts: import("@trpc/server").BuildProcedure<"mutation", {
        _config: import("@trpc/server").RootConfig<{
            ctx: object;
            meta: object;
            errorShape: never;
            transformer: import("@trpc/server").DataTransformerOptions;
        }>;
        _meta: object;
        _ctx_out: object;
        _input_in: {
            contacts?: {
                email?: string;
                firstName?: string;
                lastName?: string;
                company?: string;
                tags?: string;
            }[];
            campaignId?: number;
        };
        _input_out: {
            contacts?: {
                email?: string;
                firstName?: string;
                lastName?: string;
                company?: string;
                tags?: string;
            }[];
            campaignId?: number;
        };
        _output_in: typeof import("@trpc/server").unsetMarker;
        _output_out: typeof import("@trpc/server").unsetMarker;
    }, {
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
    getContacts: import("@trpc/server").BuildProcedure<"query", {
        _config: import("@trpc/server").RootConfig<{
            ctx: object;
            meta: object;
            errorShape: never;
            transformer: import("@trpc/server").DataTransformerOptions;
        }>;
        _meta: object;
        _ctx_out: object;
        _input_in: {
            campaignId?: number;
        };
        _input_out: {
            campaignId?: number;
        };
        _output_in: typeof import("@trpc/server").unsetMarker;
        _output_out: typeof import("@trpc/server").unsetMarker;
    }, any[]>;
    start: import("@trpc/server").BuildProcedure<"mutation", {
        _config: import("@trpc/server").RootConfig<{
            ctx: object;
            meta: object;
            errorShape: never;
            transformer: import("@trpc/server").DataTransformerOptions;
        }>;
        _meta: object;
        _ctx_out: object;
        _input_in: {
            id?: number;
        };
        _input_out: {
            id?: number;
        };
        _output_in: typeof import("@trpc/server").unsetMarker;
        _output_out: typeof import("@trpc/server").unsetMarker;
    }, {
        status: string;
        count: number;
    }>;
    updateStatus: import("@trpc/server").BuildProcedure<"mutation", {
        _config: import("@trpc/server").RootConfig<{
            ctx: object;
            meta: object;
            errorShape: never;
            transformer: import("@trpc/server").DataTransformerOptions;
        }>;
        _meta: object;
        _ctx_out: object;
        _input_in: {
            id?: number;
            status?: "draft" | "sending" | "completed" | "scheduled" | "paused";
        };
        _input_out: {
            id?: number;
            status?: "draft" | "sending" | "completed" | "scheduled" | "paused";
        };
        _output_in: typeof import("@trpc/server").unsetMarker;
        _output_out: typeof import("@trpc/server").unsetMarker;
    }, {
        success: boolean;
    }>;
    stats: import("@trpc/server").BuildProcedure<"query", {
        _config: import("@trpc/server").RootConfig<{
            ctx: object;
            meta: object;
            errorShape: never;
            transformer: import("@trpc/server").DataTransformerOptions;
        }>;
        _meta: object;
        _ctx_out: object;
        _input_in: {
            id?: number;
        };
        _input_out: {
            id?: number;
        };
        _output_in: typeof import("@trpc/server").unsetMarker;
        _output_out: typeof import("@trpc/server").unsetMarker;
    }, {
        sent: number;
        opened: number;
        clicked: number;
        failed: number;
    }>;
}>;
//# sourceMappingURL=campaign.router.d.ts.map