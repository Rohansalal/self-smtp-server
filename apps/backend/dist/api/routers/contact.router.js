"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactRouter = void 0;
const zod_1 = require("zod");
const trpc_1 = require("../../trpc/trpc");
const campaign_service_1 = require("../../services/campaign.service");
const contactSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    firstName: zod_1.z.string().optional(),
    lastName: zod_1.z.string().optional(),
    company: zod_1.z.string().optional(),
    tags: zod_1.z.string().optional(),
});
exports.contactRouter = (0, trpc_1.router)({
    create: trpc_1.publicProcedure
        .input(contactSchema)
        .mutation(async ({ input }) => {
        return campaign_service_1.ContactService.create(input);
    }),
    createBulk: trpc_1.publicProcedure
        .input(zod_1.z.array(contactSchema))
        .mutation(async ({ input }) => {
        return campaign_service_1.ContactService.createBulk(input);
    }),
    importCSV: trpc_1.publicProcedure
        .input(zod_1.z.object({ csv: zod_1.z.string() }))
        .mutation(async ({ input }) => {
        return campaign_service_1.ContactService.importFromCSV(input.csv);
    }),
    get: trpc_1.publicProcedure
        .input(zod_1.z.object({ id: zod_1.z.number() }))
        .query(async ({ input }) => {
        return campaign_service_1.ContactService.get(input.id);
    }),
    getByEmail: trpc_1.publicProcedure
        .input(zod_1.z.object({ email: zod_1.z.string().email() }))
        .query(async ({ input }) => {
        return campaign_service_1.ContactService.getByEmail(input.email);
    }),
    list: trpc_1.publicProcedure
        .input(zod_1.z.object({
        limit: zod_1.z.number().min(1).max(100).default(50),
        offset: zod_1.z.number().min(0).default(0),
    }))
        .query(async ({ input }) => {
        return campaign_service_1.ContactService.list(input.limit, input.offset);
    }),
    update: trpc_1.publicProcedure
        .input(zod_1.z.object({
        id: zod_1.z.number(),
        data: contactSchema.partial(),
    }))
        .mutation(async ({ input }) => {
        return campaign_service_1.ContactService.update(input.id, input.data);
    }),
    delete: trpc_1.publicProcedure
        .input(zod_1.z.object({ id: zod_1.z.number() }))
        .mutation(async ({ input }) => {
        return campaign_service_1.ContactService.delete(input.id);
    }),
});
//# sourceMappingURL=contact.router.js.map