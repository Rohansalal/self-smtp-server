"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailRouter = void 0;
const zod_1 = require("zod");
const trpc_1 = require("../../trpc/trpc");
const email_service_1 = require("../../services/email.service");
exports.emailRouter = (0, trpc_1.router)({
    send: trpc_1.publicProcedure
        .input(zod_1.z.object({
        to: zod_1.z.string().email(),
        subject: zod_1.z.string(),
        html: zod_1.z.string().optional(),
        text: zod_1.z.string().optional(),
        from: zod_1.z.string().email().optional(),
        campaignId: zod_1.z.number().optional(),
        contactId: zod_1.z.number().optional(),
        replyTo: zod_1.z.string().email().optional(),
    }))
        .mutation(async ({ input }) => {
        const result = await email_service_1.EmailService.send(input);
        return { success: true, id: result.id, message: 'Email queued' };
    }),
    sendBatch: trpc_1.publicProcedure
        .input(zod_1.z.array(zod_1.z.object({
        to: zod_1.z.string().email(),
        subject: zod_1.z.string(),
        html: zod_1.z.string().optional(),
        text: zod_1.z.string().optional(),
        from: zod_1.z.string().email().optional(),
        campaignId: zod_1.z.number().optional(),
        contactId: zod_1.z.number().optional(),
        replyTo: zod_1.z.string().email().optional(),
    })))
        .mutation(async ({ input }) => {
        const results = await email_service_1.EmailService.sendBatch(input);
        return { success: true, count: results.length };
    }),
    list: trpc_1.publicProcedure
        .input(zod_1.z.object({
        campaignId: zod_1.z.number().optional(),
        limit: zod_1.z.number().min(1).max(100).default(50),
        offset: zod_1.z.number().min(0).default(0),
    }))
        .query(async ({ input }) => {
        return email_service_1.EmailService.list(input.campaignId, input.limit, input.offset);
    }),
    getStatus: trpc_1.publicProcedure
        .input(zod_1.z.object({ id: zod_1.z.number() }))
        .query(async ({ input }) => {
        return email_service_1.EmailService.getStatus(input.id);
    }),
    verifyConnection: trpc_1.publicProcedure
        .mutation(async () => {
        return email_service_1.EmailService.verifyConnection();
    }),
});
//# sourceMappingURL=email.router.js.map