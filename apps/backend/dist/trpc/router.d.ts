export declare const appRouter: import("@trpc/server").CreateRouterInner<import("@trpc/server").RootConfig<{
    ctx: object;
    meta: object;
    errorShape: never;
    transformer: import("@trpc/server").DataTransformerOptions;
}>, {
    email: import("@trpc/server").CreateRouterInner<import("@trpc/server").RootConfig<{
        ctx: object;
        meta: object;
        errorShape: never;
        transformer: import("@trpc/server").DataTransformerOptions;
    }>, {
        send: import("@trpc/server").BuildProcedure<"mutation", {
            _config: import("@trpc/server").RootConfig<{
                ctx: object;
                meta: object;
                errorShape: never;
                transformer: import("@trpc/server").DataTransformerOptions;
            }>;
            _meta: object;
            _ctx_out: object;
            _input_in: {
                text?: string;
                subject?: string;
                campaignId?: number;
                contactId?: number;
                html?: string;
                from?: string;
                to?: string;
                replyTo?: string;
            };
            _input_out: {
                text?: string;
                subject?: string;
                campaignId?: number;
                contactId?: number;
                html?: string;
                from?: string;
                to?: string;
                replyTo?: string;
            };
            _output_in: typeof import("@trpc/server").unsetMarker;
            _output_out: typeof import("@trpc/server").unsetMarker;
        }, {
            success: boolean;
            id: number;
            message: string;
        }>;
        sendBatch: import("@trpc/server").BuildProcedure<"mutation", {
            _config: import("@trpc/server").RootConfig<{
                ctx: object;
                meta: object;
                errorShape: never;
                transformer: import("@trpc/server").DataTransformerOptions;
            }>;
            _meta: object;
            _ctx_out: object;
            _input_in: {
                text?: string;
                subject?: string;
                campaignId?: number;
                contactId?: number;
                html?: string;
                from?: string;
                to?: string;
                replyTo?: string;
            }[];
            _input_out: {
                text?: string;
                subject?: string;
                campaignId?: number;
                contactId?: number;
                html?: string;
                from?: string;
                to?: string;
                replyTo?: string;
            }[];
            _output_in: typeof import("@trpc/server").unsetMarker;
            _output_out: typeof import("@trpc/server").unsetMarker;
        }, {
            success: boolean;
            count: number;
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
                campaignId?: number;
                limit?: number;
                offset?: number;
            };
            _input_out: {
                campaignId?: number;
                limit?: number;
                offset?: number;
            };
            _output_in: typeof import("@trpc/server").unsetMarker;
            _output_out: typeof import("@trpc/server").unsetMarker;
        }, {
            id: number;
            toEmail: string;
            fromEmail: string;
            subject: string;
            html: string;
            text: string;
            campaignId: number;
            contactId: number;
            messageId: string;
            inReplyTo: string;
            status: string;
            errorMessage: string;
            provider: string;
            sentAt: Date;
            openedAt: Date;
            clickedAt: Date;
            createdAt: Date;
            updatedAt: Date;
        }[]>;
        getStatus: import("@trpc/server").BuildProcedure<"query", {
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
            toEmail: string;
            fromEmail: string;
            subject: string;
            html: string;
            text: string;
            campaignId: number;
            contactId: number;
            messageId: string;
            inReplyTo: string;
            status: string;
            errorMessage: string;
            provider: string;
            sentAt: Date;
            openedAt: Date;
            clickedAt: Date;
            createdAt: Date;
            updatedAt: Date;
        }>;
        verifyConnection: import("@trpc/server").BuildProcedure<"mutation", {
            _config: import("@trpc/server").RootConfig<{
                ctx: object;
                meta: object;
                errorShape: never;
                transformer: import("@trpc/server").DataTransformerOptions;
            }>;
            _ctx_out: object;
            _input_in: typeof import("@trpc/server").unsetMarker;
            _input_out: typeof import("@trpc/server").unsetMarker;
            _output_in: typeof import("@trpc/server").unsetMarker;
            _output_out: typeof import("@trpc/server").unsetMarker;
            _meta: object;
        }, boolean>;
    }>;
    campaign: import("@trpc/server").CreateRouterInner<import("@trpc/server").RootConfig<{
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
    contact: import("@trpc/server").CreateRouterInner<import("@trpc/server").RootConfig<{
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
                email?: string;
                firstName?: string;
                lastName?: string;
                company?: string;
                tags?: string;
            };
            _input_out: {
                email?: string;
                firstName?: string;
                lastName?: string;
                company?: string;
                tags?: string;
            };
            _output_in: typeof import("@trpc/server").unsetMarker;
            _output_out: typeof import("@trpc/server").unsetMarker;
        }, {
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
        createBulk: import("@trpc/server").BuildProcedure<"mutation", {
            _config: import("@trpc/server").RootConfig<{
                ctx: object;
                meta: object;
                errorShape: never;
                transformer: import("@trpc/server").DataTransformerOptions;
            }>;
            _meta: object;
            _ctx_out: object;
            _input_in: {
                email?: string;
                firstName?: string;
                lastName?: string;
                company?: string;
                tags?: string;
            }[];
            _input_out: {
                email?: string;
                firstName?: string;
                lastName?: string;
                company?: string;
                tags?: string;
            }[];
            _output_in: typeof import("@trpc/server").unsetMarker;
            _output_out: typeof import("@trpc/server").unsetMarker;
        }, {
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
        importCSV: import("@trpc/server").BuildProcedure<"mutation", {
            _config: import("@trpc/server").RootConfig<{
                ctx: object;
                meta: object;
                errorShape: never;
                transformer: import("@trpc/server").DataTransformerOptions;
            }>;
            _meta: object;
            _ctx_out: object;
            _input_in: {
                csv?: string;
            };
            _input_out: {
                csv?: string;
            };
            _output_in: typeof import("@trpc/server").unsetMarker;
            _output_out: typeof import("@trpc/server").unsetMarker;
        }, {
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
        getByEmail: import("@trpc/server").BuildProcedure<"query", {
            _config: import("@trpc/server").RootConfig<{
                ctx: object;
                meta: object;
                errorShape: never;
                transformer: import("@trpc/server").DataTransformerOptions;
            }>;
            _meta: object;
            _ctx_out: object;
            _input_in: {
                email?: string;
            };
            _input_out: {
                email?: string;
            };
            _output_in: typeof import("@trpc/server").unsetMarker;
            _output_out: typeof import("@trpc/server").unsetMarker;
        }, {
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
                    email?: string;
                    firstName?: string;
                    lastName?: string;
                    company?: string;
                    tags?: string;
                };
            };
            _input_out: {
                id?: number;
                data?: {
                    email?: string;
                    firstName?: string;
                    lastName?: string;
                    company?: string;
                    tags?: string;
                };
            };
            _output_in: typeof import("@trpc/server").unsetMarker;
            _output_out: typeof import("@trpc/server").unsetMarker;
        }, {
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
    }>;
    queue: any;
}>;
export type AppRouter = typeof appRouter;
//# sourceMappingURL=router.d.ts.map