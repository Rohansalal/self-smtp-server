"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailQueue = void 0;
const bullmq_1 = require("bullmq");
const ioredis_1 = __importDefault(require("ioredis"));
const env_js_1 = require("../env.js");
const connection = new ioredis_1.default({
    host: env_js_1.env.redis.host,
    port: env_js_1.env.redis.port,
    password: env_js_1.env.redis.password || undefined,
});
exports.emailQueue = new bullmq_1.Queue('email-queue', {
    connection,
});
//# sourceMappingURL=queue.js.map