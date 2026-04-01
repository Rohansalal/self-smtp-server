"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
const trpc_1 = require("../trpc/trpc");
const email_router_1 = require("../api/routers/email.router");
const campaign_router_1 = require("../api/routers/campaign.router");
const contact_router_1 = require("../api/routers/contact.router");
const queue_router_1 = require("../api/routers/queue.router");
exports.appRouter = (0, trpc_1.router)({
    email: email_router_1.emailRouter,
    campaign: campaign_router_1.campaignRouter,
    contact: contact_router_1.contactRouter,
    queue: queue_router_1.queueRouter,
});
//# sourceMappingURL=router.js.map