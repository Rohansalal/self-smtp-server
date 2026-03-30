import { z } from 'zod';
import { router, publicProcedure } from '../../trpc/trpc';
import { CampaignService } from '../../services/campaign.service';

const contactSchema = z.object({
  email: z.string().email(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  company: z.string().optional(),
  tags: z.string().optional(),
});

export const contactRouter = router({
  create: publicProcedure
    .input(contactSchema)
    .mutation(async ({ input }) => {
      return CampaignService.create(input);
    }),

  createBulk: publicProcedure
    .input(z.array(contactSchema))
    .mutation(async ({ input }) => {
      return CampaignService.createBulk(input);
    }),

  importCSV: publicProcedure
    .input(z.object({ csv: z.string() }))
    .mutation(async ({ input }) => {
      return CampaignService.importFromCSV(input.csv);
    }),

  get: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      return CampaignService.get(input.id);
    }),

  getByEmail: publicProcedure
    .input(z.object({ email: z.string().email() }))
    .query(async ({ input }) => {
      return CampaignService.getByEmail(input.email);
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
      data: contactSchema.partial(),
    }))
    .mutation(async ({ input }) => {
      return CampaignService.update(input.id, input.data);
    }),

  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      return CampaignService.delete(input.id);
    }),
});