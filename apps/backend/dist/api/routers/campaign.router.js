"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.campaignRouter = void 0;
const zod_1 = require("zod");
const trpc_1 = require("../../trpc/trpc");
const campaign_service_1 = require("../../services/campaign.service");
const createCampaignSchema = zod_1.z.object({
    name: zod_1.z.string().min(1),
    subject: zod_1.z.string().min(1),
    htmlTemplate: zod_1.z.string().optional(),
    textTemplate: zod_1.z.string().optional(),
    fromName: zod_1.z.string().optional(),
    userId: zod_1.z.number().optional(),
});
const addContactsSchema = zod_1.z.object({
    campaignId: zod_1.z.number(),
    contacts: zod_1.z.array(zod_1.z.object({
        email: zod_1.z.string().email(),
        firstName: zod_1.z.string().optional(),
        lastName: zod_1.z.string().optional(),
        company: zod_1.z.string().optional(),
        tags: zod_1.z.string().optional(),
    })),
});
exports.campaignRouter = (0, trpc_1.router)({
    create: trpc_1.publicProcedure
        .input(createCampaignSchema)
        .mutation(async ({ input }) => {
        return campaign_service_1.CampaignService.create(input);
    }),
    get: trpc_1.publicProcedure
        .input(zod_1.z.object({ id: zod_1.z.number() }))
        .query(async ({ input }) => {
        return campaign_service_1.CampaignService.get(input.id);
    }),
    list: trpc_1.publicProcedure
        .input(zod_1.z.object({
        limit: zod_1.z.number().min(1).max(100).default(50),
        offset: zod_1.z.number().min(0).default(0),
    }))
        .query(async ({ input }) => {
        return campaign_service_1.CampaignService.list(input.limit, input.offset);
    }),
    update: trpc_1.publicProcedure
        .input(zod_1.z.object({
        id: zod_1.z.number(),
        data: createCampaignSchema.partial(),
    }))
        .mutation(async ({ input }) => {
        return campaign_service_1.CampaignService.update(input.id, input.data);
    }),
    delete: trpc_1.publicProcedure
        .input(zod_1.z.object({ id: zod_1.z.number() }))
        .mutation(async ({ input }) => {
        return campaign_service_1.CampaignService.delete(input.id);
    }),
    addContacts: trpc_1.publicProcedure
        .input(addContactsSchema)
        .mutation(async ({ input }) => {
        return campaign_service_1.CampaignService.addContacts(input.campaignId, input.contacts);
    }),
    getContacts: trpc_1.publicProcedure
        .input(zod_1.z.object({ campaignId: zod_1.z.number() }))
        .query(async ({ input }) => {
        return campaign_service_1.CampaignService.getContacts(input.campaignId);
    }),
    start: trpc_1.publicProcedure
        .input(zod_1.z.object({ id: zod_1.z.number() }))
        .mutation(async ({ input }) => {
        return campaign_service_1.CampaignService.start(input.id);
    }),
    updateStatus: trpc_1.publicProcedure
        .input(zod_1.z.object({
        id: zod_1.z.number(),
        status: zod_1.z.enum(['draft', 'scheduled', 'sending', 'completed', 'paused']),
    }))
        .mutation(async ({ input }) => {
        return campaign_service_1.CampaignService.updateStatus(input.id, input.status);
    }),
    stats: trpc_1.publicProcedure
        .input(zod_1.z.object({ id: zod_1.z.number() }))
        .query(async ({ input }) => {
        return campaign_service_1.CampaignService.updateStats(input.id);
    }),
});
//# sourceMappingURL=campaign.router.js.map