import { Context } from 'hono';
import { z } from 'zod';
export declare function inboundEmailWebhook(c: Context): Promise<(Response & import("hono").TypedResponse<{
    success: false;
    error: string;
    details: ({
        code: "custom";
        params?: {
            [x: string]: any;
        };
        path: (string | number)[];
        message: string | undefined;
        fatal?: boolean | undefined;
    } | {
        code: "invalid_type";
        expected: z.ZodParsedType;
        received: z.ZodParsedType;
        path: (string | number)[];
        message: string | undefined;
        fatal?: boolean | undefined;
    } | {
        code: "invalid_literal";
        expected: import("hono/utils/types").JSONValue;
        received: import("hono/utils/types").JSONValue;
        path: (string | number)[];
        message: string | undefined;
        fatal?: boolean | undefined;
    } | {
        code: "unrecognized_keys";
        keys: string[];
        path: (string | number)[];
        message: string | undefined;
        fatal?: boolean | undefined;
    } | {
        code: "invalid_union";
        unionErrors: {
            issues: ({
                code: "custom";
                params?: {
                    [x: string]: any;
                };
                path: (string | number)[];
                message: string | undefined;
                fatal?: boolean | undefined;
            } | {
                code: "invalid_type";
                expected: z.ZodParsedType;
                received: z.ZodParsedType;
                path: (string | number)[];
                message: string | undefined;
                fatal?: boolean | undefined;
            } | {
                code: "invalid_literal";
                expected: import("hono/utils/types").JSONValue;
                received: import("hono/utils/types").JSONValue;
                path: (string | number)[];
                message: string | undefined;
                fatal?: boolean | undefined;
            } | {
                code: "unrecognized_keys";
                keys: string[];
                path: (string | number)[];
                message: string | undefined;
                fatal?: boolean | undefined;
            } | /*elided*/ any | {
                code: "invalid_union_discriminator";
                options: (string | number | boolean)[];
                path: (string | number)[];
                message: string | undefined;
                fatal?: boolean | undefined;
            } | {
                received: string | number;
                code: "invalid_enum_value";
                options: (string | number)[];
                path: (string | number)[];
                message: string | undefined;
                fatal?: boolean | undefined;
            } | {
                code: "invalid_arguments";
                argumentsError: /*elided*/ any;
                path: (string | number)[];
                message: string | undefined;
                fatal?: boolean | undefined;
            } | {
                code: "invalid_return_type";
                returnTypeError: /*elided*/ any;
                path: (string | number)[];
                message: string | undefined;
                fatal?: boolean | undefined;
            } | {
                code: "invalid_date";
                path: (string | number)[];
                message: string | undefined;
                fatal?: boolean | undefined;
            } | {
                code: "invalid_string";
                validation: "date" | "duration" | "email" | "url" | "base64" | "base64url" | "emoji" | "uuid" | "nanoid" | "regex" | "cuid" | "cuid2" | "ulid" | "datetime" | "time" | "ip" | "cidr" | "jwt" | {
                    includes: string;
                    position?: number | undefined;
                } | {
                    startsWith: string;
                } | {
                    endsWith: string;
                };
                path: (string | number)[];
                message: string | undefined;
                fatal?: boolean | undefined;
            } | {
                code: "too_small";
                minimum: number;
                inclusive: boolean;
                exact?: boolean;
                type: "array" | "string" | "number" | "set" | "date" | "bigint";
                path: (string | number)[];
                message: string | undefined;
                fatal?: boolean | undefined;
            } | {
                code: "too_big";
                maximum: number;
                inclusive: boolean;
                exact?: boolean;
                type: "array" | "string" | "number" | "set" | "date" | "bigint";
                path: (string | number)[];
                message: string | undefined;
                fatal?: boolean | undefined;
            } | {
                code: "invalid_intersection_types";
                path: (string | number)[];
                message: string | undefined;
                fatal?: boolean | undefined;
            } | {
                code: "not_multiple_of";
                multipleOf: number;
                path: (string | number)[];
                message: string | undefined;
                fatal?: boolean | undefined;
            } | {
                code: "not_finite";
                path: (string | number)[];
                message: string | undefined;
                fatal?: boolean | undefined;
            })[];
            readonly errors: ({
                code: "custom";
                params?: {
                    [x: string]: any;
                };
                path: (string | number)[];
                message: string | undefined;
                fatal?: boolean | undefined;
            } | {
                code: "invalid_type";
                expected: z.ZodParsedType;
                received: z.ZodParsedType;
                path: (string | number)[];
                message: string | undefined;
                fatal?: boolean | undefined;
            } | {
                code: "invalid_literal";
                expected: import("hono/utils/types").JSONValue;
                received: import("hono/utils/types").JSONValue;
                path: (string | number)[];
                message: string | undefined;
                fatal?: boolean | undefined;
            } | {
                code: "unrecognized_keys";
                keys: string[];
                path: (string | number)[];
                message: string | undefined;
                fatal?: boolean | undefined;
            } | /*elided*/ any | {
                code: "invalid_union_discriminator";
                options: (string | number | boolean)[];
                path: (string | number)[];
                message: string | undefined;
                fatal?: boolean | undefined;
            } | {
                received: string | number;
                code: "invalid_enum_value";
                options: (string | number)[];
                path: (string | number)[];
                message: string | undefined;
                fatal?: boolean | undefined;
            } | {
                code: "invalid_arguments";
                argumentsError: /*elided*/ any;
                path: (string | number)[];
                message: string | undefined;
                fatal?: boolean | undefined;
            } | {
                code: "invalid_return_type";
                returnTypeError: /*elided*/ any;
                path: (string | number)[];
                message: string | undefined;
                fatal?: boolean | undefined;
            } | {
                code: "invalid_date";
                path: (string | number)[];
                message: string | undefined;
                fatal?: boolean | undefined;
            } | {
                code: "invalid_string";
                validation: "date" | "duration" | "email" | "url" | "base64" | "base64url" | "emoji" | "uuid" | "nanoid" | "regex" | "cuid" | "cuid2" | "ulid" | "datetime" | "time" | "ip" | "cidr" | "jwt" | {
                    includes: string;
                    position?: number | undefined;
                } | {
                    startsWith: string;
                } | {
                    endsWith: string;
                };
                path: (string | number)[];
                message: string | undefined;
                fatal?: boolean | undefined;
            } | {
                code: "too_small";
                minimum: number;
                inclusive: boolean;
                exact?: boolean;
                type: "array" | "string" | "number" | "set" | "date" | "bigint";
                path: (string | number)[];
                message: string | undefined;
                fatal?: boolean | undefined;
            } | {
                code: "too_big";
                maximum: number;
                inclusive: boolean;
                exact?: boolean;
                type: "array" | "string" | "number" | "set" | "date" | "bigint";
                path: (string | number)[];
                message: string | undefined;
                fatal?: boolean | undefined;
            } | {
                code: "invalid_intersection_types";
                path: (string | number)[];
                message: string | undefined;
                fatal?: boolean | undefined;
            } | {
                code: "not_multiple_of";
                multipleOf: number;
                path: (string | number)[];
                message: string | undefined;
                fatal?: boolean | undefined;
            } | {
                code: "not_finite";
                path: (string | number)[];
                message: string | undefined;
                fatal?: boolean | undefined;
            })[];
            readonly message: string;
            readonly isEmpty: boolean;
            readonly formErrors: {
                formErrors: string[];
                fieldErrors: {
                    [x: string]: string[];
                    [x: number]: string[];
                };
            };
            name: string;
            stack?: string;
            cause?: import("hono/utils/types").JSONValue;
        }[];
        path: (string | number)[];
        message: string | undefined;
        fatal?: boolean | undefined;
    } | {
        code: "invalid_union_discriminator";
        options: (string | number | boolean)[];
        path: (string | number)[];
        message: string | undefined;
        fatal?: boolean | undefined;
    } | {
        received: string | number;
        code: "invalid_enum_value";
        options: (string | number)[];
        path: (string | number)[];
        message: string | undefined;
        fatal?: boolean | undefined;
    } | {
        code: "invalid_arguments";
        argumentsError: {
            issues: ({
                code: "custom";
                params?: {
                    [x: string]: any;
                };
                path: (string | number)[];
                message: string | undefined;
                fatal?: boolean | undefined;
            } | {
                code: "invalid_type";
                expected: z.ZodParsedType;
                received: z.ZodParsedType;
                path: (string | number)[];
                message: string | undefined;
                fatal?: boolean | undefined;
            } | {
                code: "invalid_literal";
                expected: import("hono/utils/types").JSONValue;
                received: import("hono/utils/types").JSONValue;
                path: (string | number)[];
                message: string | undefined;
                fatal?: boolean | undefined;
            } | {
                code: "unrecognized_keys";
                keys: string[];
                path: (string | number)[];
                message: string | undefined;
                fatal?: boolean | undefined;
            } | {
                code: "invalid_union";
                unionErrors: /*elided*/ any[];
                path: (string | number)[];
                message: string | undefined;
                fatal?: boolean | undefined;
            } | {
                code: "invalid_union_discriminator";
                options: (string | number | boolean)[];
                path: (string | number)[];
                message: string | undefined;
                fatal?: boolean | undefined;
            } | {
                received: string | number;
                code: "invalid_enum_value";
                options: (string | number)[];
                path: (string | number)[];
                message: string | undefined;
                fatal?: boolean | undefined;
            } | /*elided*/ any | {
                code: "invalid_return_type";
                returnTypeError: /*elided*/ any;
                path: (string | number)[];
                message: string | undefined;
                fatal?: boolean | undefined;
            } | {
                code: "invalid_date";
                path: (string | number)[];
                message: string | undefined;
                fatal?: boolean | undefined;
            } | {
                code: "invalid_string";
                validation: "date" | "duration" | "email" | "url" | "base64" | "base64url" | "emoji" | "uuid" | "nanoid" | "regex" | "cuid" | "cuid2" | "ulid" | "datetime" | "time" | "ip" | "cidr" | "jwt" | {
                    includes: string;
                    position?: number | undefined;
                } | {
                    startsWith: string;
                } | {
                    endsWith: string;
                };
                path: (string | number)[];
                message: string | undefined;
                fatal?: boolean | undefined;
            } | {
                code: "too_small";
                minimum: number;
                inclusive: boolean;
                exact?: boolean;
                type: "array" | "string" | "number" | "set" | "date" | "bigint";
                path: (string | number)[];
                message: string | undefined;
                fatal?: boolean | undefined;
            } | {
                code: "too_big";
                maximum: number;
                inclusive: boolean;
                exact?: boolean;
                type: "array" | "string" | "number" | "set" | "date" | "bigint";
                path: (string | number)[];
                message: string | undefined;
                fatal?: boolean | undefined;
            } | {
                code: "invalid_intersection_types";
                path: (string | number)[];
                message: string | undefined;
                fatal?: boolean | undefined;
            } | {
                code: "not_multiple_of";
                multipleOf: number;
                path: (string | number)[];
                message: string | undefined;
                fatal?: boolean | undefined;
            } | {
                code: "not_finite";
                path: (string | number)[];
                message: string | undefined;
                fatal?: boolean | undefined;
            })[];
            readonly errors: ({
                code: "custom";
                params?: {
                    [x: string]: any;
                };
                path: (string | number)[];
                message: string | undefined;
                fatal?: boolean | undefined;
            } | {
                code: "invalid_type";
                expected: z.ZodParsedType;
                received: z.ZodParsedType;
                path: (string | number)[];
                message: string | undefined;
                fatal?: boolean | undefined;
            } | {
                code: "invalid_literal";
                expected: import("hono/utils/types").JSONValue;
                received: import("hono/utils/types").JSONValue;
                path: (string | number)[];
                message: string | undefined;
                fatal?: boolean | undefined;
            } | {
                code: "unrecognized_keys";
                keys: string[];
                path: (string | number)[];
                message: string | undefined;
                fatal?: boolean | undefined;
            } | {
                code: "invalid_union";
                unionErrors: /*elided*/ any[];
                path: (string | number)[];
                message: string | undefined;
                fatal?: boolean | undefined;
            } | {
                code: "invalid_union_discriminator";
                options: (string | number | boolean)[];
                path: (string | number)[];
                message: string | undefined;
                fatal?: boolean | undefined;
            } | {
                received: string | number;
                code: "invalid_enum_value";
                options: (string | number)[];
                path: (string | number)[];
                message: string | undefined;
                fatal?: boolean | undefined;
            } | /*elided*/ any | {
                code: "invalid_return_type";
                returnTypeError: /*elided*/ any;
                path: (string | number)[];
                message: string | undefined;
                fatal?: boolean | undefined;
            } | {
                code: "invalid_date";
                path: (string | number)[];
                message: string | undefined;
                fatal?: boolean | undefined;
            } | {
                code: "invalid_string";
                validation: "date" | "duration" | "email" | "url" | "base64" | "base64url" | "emoji" | "uuid" | "nanoid" | "regex" | "cuid" | "cuid2" | "ulid" | "datetime" | "time" | "ip" | "cidr" | "jwt" | {
                    includes: string;
                    position?: number | undefined;
                } | {
                    startsWith: string;
                } | {
                    endsWith: string;
                };
                path: (string | number)[];
                message: string | undefined;
                fatal?: boolean | undefined;
            } | {
                code: "too_small";
                minimum: number;
                inclusive: boolean;
                exact?: boolean;
                type: "array" | "string" | "number" | "set" | "date" | "bigint";
                path: (string | number)[];
                message: string | undefined;
                fatal?: boolean | undefined;
            } | {
                code: "too_big";
                maximum: number;
                inclusive: boolean;
                exact?: boolean;
                type: "array" | "string" | "number" | "set" | "date" | "bigint";
                path: (string | number)[];
                message: string | undefined;
                fatal?: boolean | undefined;
            } | {
                code: "invalid_intersection_types";
                path: (string | number)[];
                message: string | undefined;
                fatal?: boolean | undefined;
            } | {
                code: "not_multiple_of";
                multipleOf: number;
                path: (string | number)[];
                message: string | undefined;
                fatal?: boolean | undefined;
            } | {
                code: "not_finite";
                path: (string | number)[];
                message: string | undefined;
                fatal?: boolean | undefined;
            })[];
            readonly message: string;
            readonly isEmpty: boolean;
            readonly formErrors: {
                formErrors: string[];
                fieldErrors: {
                    [x: string]: string[];
                    [x: number]: string[];
                };
            };
            name: string;
            stack?: string;
            cause?: import("hono/utils/types").JSONValue;
        };
        path: (string | number)[];
        message: string | undefined;
        fatal?: boolean | undefined;
    } | {
        code: "invalid_return_type";
        returnTypeError: {
            issues: ({
                code: "custom";
                params?: {
                    [x: string]: any;
                };
                path: (string | number)[];
                message: string | undefined;
                fatal?: boolean | undefined;
            } | {
                code: "invalid_type";
                expected: z.ZodParsedType;
                received: z.ZodParsedType;
                path: (string | number)[];
                message: string | undefined;
                fatal?: boolean | undefined;
            } | {
                code: "invalid_literal";
                expected: import("hono/utils/types").JSONValue;
                received: import("hono/utils/types").JSONValue;
                path: (string | number)[];
                message: string | undefined;
                fatal?: boolean | undefined;
            } | {
                code: "unrecognized_keys";
                keys: string[];
                path: (string | number)[];
                message: string | undefined;
                fatal?: boolean | undefined;
            } | {
                code: "invalid_union";
                unionErrors: /*elided*/ any[];
                path: (string | number)[];
                message: string | undefined;
                fatal?: boolean | undefined;
            } | {
                code: "invalid_union_discriminator";
                options: (string | number | boolean)[];
                path: (string | number)[];
                message: string | undefined;
                fatal?: boolean | undefined;
            } | {
                received: string | number;
                code: "invalid_enum_value";
                options: (string | number)[];
                path: (string | number)[];
                message: string | undefined;
                fatal?: boolean | undefined;
            } | {
                code: "invalid_arguments";
                argumentsError: /*elided*/ any;
                path: (string | number)[];
                message: string | undefined;
                fatal?: boolean | undefined;
            } | /*elided*/ any | {
                code: "invalid_date";
                path: (string | number)[];
                message: string | undefined;
                fatal?: boolean | undefined;
            } | {
                code: "invalid_string";
                validation: "date" | "duration" | "email" | "url" | "base64" | "base64url" | "emoji" | "uuid" | "nanoid" | "regex" | "cuid" | "cuid2" | "ulid" | "datetime" | "time" | "ip" | "cidr" | "jwt" | {
                    includes: string;
                    position?: number | undefined;
                } | {
                    startsWith: string;
                } | {
                    endsWith: string;
                };
                path: (string | number)[];
                message: string | undefined;
                fatal?: boolean | undefined;
            } | {
                code: "too_small";
                minimum: number;
                inclusive: boolean;
                exact?: boolean;
                type: "array" | "string" | "number" | "set" | "date" | "bigint";
                path: (string | number)[];
                message: string | undefined;
                fatal?: boolean | undefined;
            } | {
                code: "too_big";
                maximum: number;
                inclusive: boolean;
                exact?: boolean;
                type: "array" | "string" | "number" | "set" | "date" | "bigint";
                path: (string | number)[];
                message: string | undefined;
                fatal?: boolean | undefined;
            } | {
                code: "invalid_intersection_types";
                path: (string | number)[];
                message: string | undefined;
                fatal?: boolean | undefined;
            } | {
                code: "not_multiple_of";
                multipleOf: number;
                path: (string | number)[];
                message: string | undefined;
                fatal?: boolean | undefined;
            } | {
                code: "not_finite";
                path: (string | number)[];
                message: string | undefined;
                fatal?: boolean | undefined;
            })[];
            readonly errors: ({
                code: "custom";
                params?: {
                    [x: string]: any;
                };
                path: (string | number)[];
                message: string | undefined;
                fatal?: boolean | undefined;
            } | {
                code: "invalid_type";
                expected: z.ZodParsedType;
                received: z.ZodParsedType;
                path: (string | number)[];
                message: string | undefined;
                fatal?: boolean | undefined;
            } | {
                code: "invalid_literal";
                expected: import("hono/utils/types").JSONValue;
                received: import("hono/utils/types").JSONValue;
                path: (string | number)[];
                message: string | undefined;
                fatal?: boolean | undefined;
            } | {
                code: "unrecognized_keys";
                keys: string[];
                path: (string | number)[];
                message: string | undefined;
                fatal?: boolean | undefined;
            } | {
                code: "invalid_union";
                unionErrors: /*elided*/ any[];
                path: (string | number)[];
                message: string | undefined;
                fatal?: boolean | undefined;
            } | {
                code: "invalid_union_discriminator";
                options: (string | number | boolean)[];
                path: (string | number)[];
                message: string | undefined;
                fatal?: boolean | undefined;
            } | {
                received: string | number;
                code: "invalid_enum_value";
                options: (string | number)[];
                path: (string | number)[];
                message: string | undefined;
                fatal?: boolean | undefined;
            } | {
                code: "invalid_arguments";
                argumentsError: /*elided*/ any;
                path: (string | number)[];
                message: string | undefined;
                fatal?: boolean | undefined;
            } | /*elided*/ any | {
                code: "invalid_date";
                path: (string | number)[];
                message: string | undefined;
                fatal?: boolean | undefined;
            } | {
                code: "invalid_string";
                validation: "date" | "duration" | "email" | "url" | "base64" | "base64url" | "emoji" | "uuid" | "nanoid" | "regex" | "cuid" | "cuid2" | "ulid" | "datetime" | "time" | "ip" | "cidr" | "jwt" | {
                    includes: string;
                    position?: number | undefined;
                } | {
                    startsWith: string;
                } | {
                    endsWith: string;
                };
                path: (string | number)[];
                message: string | undefined;
                fatal?: boolean | undefined;
            } | {
                code: "too_small";
                minimum: number;
                inclusive: boolean;
                exact?: boolean;
                type: "array" | "string" | "number" | "set" | "date" | "bigint";
                path: (string | number)[];
                message: string | undefined;
                fatal?: boolean | undefined;
            } | {
                code: "too_big";
                maximum: number;
                inclusive: boolean;
                exact?: boolean;
                type: "array" | "string" | "number" | "set" | "date" | "bigint";
                path: (string | number)[];
                message: string | undefined;
                fatal?: boolean | undefined;
            } | {
                code: "invalid_intersection_types";
                path: (string | number)[];
                message: string | undefined;
                fatal?: boolean | undefined;
            } | {
                code: "not_multiple_of";
                multipleOf: number;
                path: (string | number)[];
                message: string | undefined;
                fatal?: boolean | undefined;
            } | {
                code: "not_finite";
                path: (string | number)[];
                message: string | undefined;
                fatal?: boolean | undefined;
            })[];
            readonly message: string;
            readonly isEmpty: boolean;
            readonly formErrors: {
                formErrors: string[];
                fieldErrors: {
                    [x: string]: string[];
                    [x: number]: string[];
                };
            };
            name: string;
            stack?: string;
            cause?: import("hono/utils/types").JSONValue;
        };
        path: (string | number)[];
        message: string | undefined;
        fatal?: boolean | undefined;
    } | {
        code: "invalid_date";
        path: (string | number)[];
        message: string | undefined;
        fatal?: boolean | undefined;
    } | {
        code: "invalid_string";
        validation: "date" | "duration" | "email" | "url" | "base64" | "base64url" | "emoji" | "uuid" | "nanoid" | "regex" | "cuid" | "cuid2" | "ulid" | "datetime" | "time" | "ip" | "cidr" | "jwt" | {
            includes: string;
            position?: number | undefined;
        } | {
            startsWith: string;
        } | {
            endsWith: string;
        };
        path: (string | number)[];
        message: string | undefined;
        fatal?: boolean | undefined;
    } | {
        code: "too_small";
        minimum: number;
        inclusive: boolean;
        exact?: boolean;
        type: "array" | "string" | "number" | "set" | "date" | "bigint";
        path: (string | number)[];
        message: string | undefined;
        fatal?: boolean | undefined;
    } | {
        code: "too_big";
        maximum: number;
        inclusive: boolean;
        exact?: boolean;
        type: "array" | "string" | "number" | "set" | "date" | "bigint";
        path: (string | number)[];
        message: string | undefined;
        fatal?: boolean | undefined;
    } | {
        code: "invalid_intersection_types";
        path: (string | number)[];
        message: string | undefined;
        fatal?: boolean | undefined;
    } | {
        code: "not_multiple_of";
        multipleOf: number;
        path: (string | number)[];
        message: string | undefined;
        fatal?: boolean | undefined;
    } | {
        code: "not_finite";
        path: (string | number)[];
        message: string | undefined;
        fatal?: boolean | undefined;
    })[];
}, 400, "json">) | (Response & import("hono").TypedResponse<{
    success: true;
    message: string;
    id: string;
    timestamp: string;
}, 200, "json">) | (Response & import("hono").TypedResponse<{
    success: false;
    error: string;
}, 500, "json">)>;
export declare function getEmailStatus(c: Context): Promise<(Response & import("hono").TypedResponse<{
    error: string;
}, 400, "json">) | (Response & import("hono").TypedResponse<{
    id: string;
    status: string;
    timestamp: string;
}, import("hono/utils/http-status").ContentfulStatusCode, "json">)>;
//# sourceMappingURL=inbound.d.ts.map