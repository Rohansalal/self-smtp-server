export declare const emailRouter: import("@trpc/server").CreateRouterInner<import("@trpc/server").RootConfig<{
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
//# sourceMappingURL=email.router.d.ts.map