export declare const contactRouter: import("@trpc/server").CreateRouterInner<import("@trpc/server").RootConfig<{
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
//# sourceMappingURL=contact.router.d.ts.map