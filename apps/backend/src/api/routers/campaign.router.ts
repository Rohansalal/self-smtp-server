import { z } from 'zod';
import { router, publicProcedure } from '../../trpc/trpc';
import { CampaignService } from '../../services/campaign.service';

const createCampaignSchema = z.object({
  name: z.string().min(1),
  subject: z.string().min(1),
  htmlTemplate: z.string().optional(),
  textTemplate: z.string().optional(),
  fromName: z.string().optional(),
  userId: z.number().optional(),
});

const addContactsSchema = z.object({
  campaignId: z.number(),
  contacts: z.array(z.object({
    email: z.string().email(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    company: z.string().optional(),
    tags: z.string().optional(),
  })),
});

export const campaignRouter = router({
  create: publicProcedure
    .input(createCampaignSchema)
    .mutation(async ({ input }) => {
      return CampaignService.create(input);
    }),

  get: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      return CampaignService.get(input.id);
    }),

  list: publicProcedure
    .input(z.object({
      limit: z.number().min(1).max(100).default(50),
      offset: z.number().min(0).default(0),
    }))
    .query(async ({ input }) => {
      return CampaignService.list(input.limit, input.offset);
    }),

  update: publicProcedure
    .input(z.object({
      id: z.number(),
      data: createCampaignSchema.partial(),
    }))
    .mutation(async ({ input }) => {
      return CampaignService.update(input.id, input.data);
    }),

  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      return CampaignService.delete(input.id);
    }),

  addContacts: publicProcedure
    .input(addContactsSchema)
    .mutation(async ({ input }) => {
      return CampaignService.addContacts(input.campaignId, input.contacts);
    }),

  getContacts: publicProcedure
    .input(z.object({ campaignId: z.number() }))
    .query(async ({ input }) => {
      return CampaignService.getContacts(input.campaignId);
    }),

  start: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      return CampaignService.start(input.id);
    }),

  updateStatus: publicProcedure
    .input(z.object({
      id: z.number(),
      status: z.enum(['draft', 'scheduled', 'sending', 'completed', 'paused']),
    }))
    .mutation(async ({ input }) => {
      return CampaignService.updateStatus(input.id, input.status);
    }),

  stats: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      return CampaignService.updateStats(input.id);
    }),
});