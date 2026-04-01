"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queueRouter = void 0;
const zod_1 = require("zod");
const trpc_1 = require("../trpc/trpc");
const queue_1 = require("../queue/queue");
exports.queueRouter = (0, trpc_1.router)({
    getStatus: trpc_1.publicProcedure
        .query(async () => {
        const counts = await queue_1.emailQueue.getJobCounts('wait', 'active', 'completed', 'failed');
        return {
            waiting: counts.waiting,
            active: counts.active,
            completed: counts.completed,
            failed: counts.failed,
            timestamp: new Date().toISOString(),
        };
    }),
    getJobProgress: trpc_1.publicProcedure
        .input(zod_1.z.object({ jobId: zod_1.z.string() }))
        .query(async ({ input }) => {
        const job = await queue_1.emailQueue.getJob(input.jobId);
        if (!job)
            return null;
        return {
            id: job.id,
            progress: job.progress(),
            status: job.status,
            data: job.data,
        };
    }),
    retryFailed: trpc_1.publicProcedure
        .mutation(async () => {
        const failed = await queue_1.emailQueue.getFailed();
        for (const job of failed) {
            await job.retry();
        }
        return { retried: failed.length };
    }),
    cleanQueue: trpc_1.publicProcedure
        .input(zod_1.z.object({ olderThan: zod_1.z.number().default(24 * 60 * 60 * 1000) }))
        .mutation(async ({ input }) => {
        const completed = await queue_1.emailQueue.clean('completed', input.olderThan, 1000);
        const failed = await queue_1.emailQueue.clean('failed', input.olderThan, 1000);
        return { cleaned: { completed: completed.length, failed: failed.length } };
    }),
});
//# sourceMappingURL=queue.router.js.map