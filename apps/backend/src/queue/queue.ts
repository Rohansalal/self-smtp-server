import { Queue } from 'bullmq';
import IORedis from 'ioredis';
import { env } from '../env.js';

const connection = new IORedis({
  host: env.redis.host,
  port: env.redis.port,
  password: env.redis.password || undefined,
});

export const emailQueue = new Queue('email-queue', {
  connection,
});
