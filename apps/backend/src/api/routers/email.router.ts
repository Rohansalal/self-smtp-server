import { z } from 'zod';
import { router, publicProcedure } from '../../trpc/trpc';
import { EmailService } from '../../services/email.service';

export const emailRouter = router({
  send: publicProcedure
    .input(z.object({
      to: z.string().email(),
      subject: z.string(),
      html: z.string().optional(),
      text: z.string().optional(),
      from: z.string().email().optional(),
      campaignId: z.number().optional(),
      contactId: z.number().optional(),
      replyTo: z.string().email().optional(),
    }))
    .mutation(async ({ input }) => {
      const result = await EmailService.send(input);
      return { success: true, id: result.id, message: 'Email queued' };
    }),

  sendBatch: publicProcedure
    .input(z.array(z.object({
      to: z.string().email(),
      subject: z.string(),
      html: z.string().optional(),
      text: z.string().optional(),
      from: z.string().email().optional(),
      campaignId: z.number().optional(),
      contactId: z.number().optional(),
      replyTo: z.string().email().optional(),
    })))
    .mutation(async ({ input }) => {
      const results = await EmailService.sendBatch(input);
      return { success: true, count: results.length };
    }),

  list: publicProcedure
    .input(z.object({
      campaignId: z.number().optional(),
      limit: z.number().min(1).max(100).default(50),
      offset: z.number().min(0).default(0),
    }))
    .query(async ({ input }) => {
      return EmailService.list(input.campaignId, input.limit, input.offset);
    }),

  getStatus: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      return EmailService.getStatus(input.id);
    }),

  verifyConnection: publicProcedure
    .mutation(async () => {
      return EmailService.verifyConnection();
    }),
});
