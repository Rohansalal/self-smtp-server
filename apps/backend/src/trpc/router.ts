import { router } from '../trpc/trpc';
import { emailRouter } from '../api/routers/email.router';
import { campaignRouter } from '../api/routers/campaign.router';
import { contactRouter } from '../api/routers/contact.router';

export const appRouter = router({
  email: emailRouter,
  campaign: campaignRouter,
  contact: contactRouter,
});

export type AppRouter = typeof appRouter;
