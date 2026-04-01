import { Context } from 'hono';
export declare function trackOpen(c: Context): Promise<Response>;
export declare function trackClick(c: Context): Promise<(Response & import("hono").TypedResponse<"Missing id", 400, "text">) | (Response & import("hono").TypedResponse<"Invalid id", 400, "text">) | (Response & import("hono").TypedResponse<undefined, 302, "redirect">) | (Response & import("hono").TypedResponse<"Tracked", import("hono/utils/http-status").ContentfulStatusCode, "text">) | (Response & import("hono").TypedResponse<"Error", 500, "text">)>;
//# sourceMappingURL=tracking.d.ts.map