"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hono_1 = require("hono");
const cors_1 = require("hono/cors");
const logger_1 = require("hono/logger");
const tracking_1 = require("./api/tracking");
const inbound_1 = require("./api/inbound");
const env_1 = require("./env");
const app = new hono_1.Hono();
app.use('*', (0, cors_1.cors)());
app.use('*', (0, logger_1.logger)());
app.get('/health', (c) => {
    return c.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        version: '2.0.0',
        architecture: 'hono-trpc'
    });
});
app.get('/track/open', tracking_1.trackOpen);
app.get('/track/click', tracking_1.trackClick);
app.post('/api/email/inbound', inbound_1.inboundEmailWebhook);
app.get('/api/campaigns', async (c) => {
    const limit = parseInt(c.req.query('limit') || '50');
    const offset = parseInt(c.req.query('offset') || '0');
    return c.json({ message: 'Campaigns endpoint', limit, offset });
});
app.post('/api/campaigns', async (c) => {
    const body = await c.req.json();
    return c.json({ message: 'Campaign created', data: body });
});
app.get('/api/queue/status', async (c) => {
    return c.json({
        status: 'active',
        queue: 'email-queue',
        timestamp: new Date().toISOString()
    });
});
app.post('/api/email/send', async (c) => {
    const body = await c.req.json();
    return c.json({
        message: 'Email queued for delivery',
        to: body.to,
        subject: body.subject
    });
});
exports.default = app;
if (typeof process !== 'undefined' && process.env.NODE_ENV !== 'production') {
    import('@hono/node-server').then(({ serve }) => {
        serve({
            fetch: app.fetch,
            port: env_1.env.port,
        }, (info) => {
            console.log(`🚀 Server running on http://localhost:${info.port}`);
            console.log(`📡 API endpoints: http://localhost:${info.port}/api`);
            console.log(`📥 Inbound webhook: http://localhost:${info.port}/api/email/inbound`);
        });
    });
}
//# sourceMappingURL=server.js.map