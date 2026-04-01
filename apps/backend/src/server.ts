import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { env } from './env';

const app = new Hono();

app.use('*', cors());
app.use('*', logger());

app.get('/health', (c) => {
  return c.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    version: '2.0.0',
    architecture: 'hono-rest'
  });
});

app.get('/api/health', (c) => {
  return c.json({ status: 'ok' });
});

app.post('/api/email/send', async (c) => {
  try {
    const body = await c.req.json();
    console.log('Sending email:', body);
    return c.json({ 
      success: true, 
      id: Date.now(),
      message: 'Email queued for delivery'
    });
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500);
  }
});

app.get('/api/emails', async (c) => {
  return c.json([]);
});

app.get('/api/emails/:id', async (c) => {
  return c.json({ error: 'Not found' });
});

app.get('/api/campaigns', async (c) => {
  return c.json([]);
});

app.post('/api/campaigns', async (c) => {
  try {
    const body = await c.req.json();
    return c.json({ success: true, campaign: { ...body, id: Date.now() } });
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500);
  }
});

app.get('/api/campaigns/:id', async (c) => {
  return c.json({ error: 'Not found' });
});

app.delete('/api/campaigns/:id', async (c) => {
  return c.json({ success: true });
});

app.post('/api/campaigns/:id/start', async (c) => {
  return c.json({ status: 'queued', count: 0 });
});

app.get('/api/contacts', async (c) => {
  return c.json([]);
});

app.post('/api/contacts', async (c) => {
  try {
    const body = await c.req.json();
    return c.json({ success: true, contact: { ...body, id: Date.now() } });
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500);
  }
});

app.delete('/api/contacts/:id', async (c) => {
  return c.json({ success: true });
});

app.post('/api/contacts/import', async (c) => {
  try {
    const body = await c.req.json();
    return c.json({ success: true, count: 0 });
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500);
  }
});

app.get('/api/queue/status', async (c) => {
  return c.json({ 
    status: 'active',
    queue: 'email-queue',
    timestamp: new Date().toISOString()
  });
});

export default app;

if (typeof process !== 'undefined' && process.env.NODE_ENV !== 'production') {
  import('@hono/node-server').then(({ serve }) => {
    serve({
      fetch: app.fetch,
      port: env.port,
    }, (info) => {
      console.log(`🚀 Server running on http://localhost:${info.port}`);
      console.log(`📡 REST API: http://localhost:${info.port}/api`);
    });
  });
}
