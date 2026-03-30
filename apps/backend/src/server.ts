import express from 'express';
import cors from 'cors';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { router } from './trpc/trpc';
import { campaignRouter } from './api/routers/campaign.router';
import { contactRouter } from './api/routers/contact.router';
import { trackOpen, trackClick } from './api/tracking';
import { env } from './env';

const appRouter = router({
  campaign: campaignRouter,
  contact: contactRouter,
});

export type AppRouter = typeof appRouter;

const app = express();

app.use(cors());
app.use(express.json());

app.use(
  '/trpc',
  createExpressMiddleware({
    router: appRouter,
  })
);

app.get('/health', (_, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/track/open', trackOpen);
app.get('/track/click', trackClick);

app.listen(env.port, () => {
  console.log(`🚀 Server running on http://localhost:${env.port}`);
  console.log(`📡 tRPC endpoint: http://localhost:${env.port}/trpc`);
  console.log(`📊 Tracking: http://localhost:${env.port}/track/open & /track/click`);
});