"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sesTransporter = exports.transporter = void 0;
exports.sendEmail = sendEmail;
exports.verifyConnection = verifyConnection;
const nodemailer_1 = __importDefault(require("nodemailer"));
const env_js_1 = require("../env.js");
// Email transporter configuration for Haraka SMTP relay
exports.transporter = nodemailer_1.default.createTransport({
    host: env_js_1.env.email.host,
    port: env_js_1.env.email.port,
    secure: env_js_1.env.email.secure,
    auth: {
        user: env_js_1.env.email.user,
        pass: env_js_1.env.email.pass,
    },
    // Haraka-specific settings
    tls: {
        rejectUnauthorized: false, // For self-signed certs in development
    },
    pool: true, // Use pooled connections
    maxConnections: 5,
    maxMessages: 100,
});
// Alternative transporter for SES/SendGrid (hybrid approach)
exports.sesTransporter = env_js_1.env.email.sesEnabled ? nodemailer_1.default.createTransport({
    SES: {
        // AWS SES configuration
        region: env_js_1.env.email.sesRegion,
    },
}) : null;
// Send email function with fallback
async function sendEmail(options) {
    const fromAddress = options.from || env_js_1.env.email.defaultFrom;
    // Primary: Haraka SMTP
    try {
        const result = await exports.transporter.sendMail({
            from: `"Protechplanner" <${fromAddress}>`,
            to: options.to,
            subject: options.subject,
            html: options.html,
            text: options.text,
            replyTo: options.replyTo,
            headers: {
                ...options.headers,
                'X-Mailer': 'Protechplanner/2.0',
                'X-Priority': '3',
            },
        });
        console.log(`[EMAIL] Sent via Haraka: ${options.to} - ${options.subject}`);
        return { success: true, messageId: result.messageId, provider: 'haraka' };
    }
    catch (harakaError) {
        console.error('[EMAIL] Haraka failed, trying SES fallback:', harakaError);
        // Fallback: SES/SendGrid
        if (exports.sesTransporter) {
            try {
                const result = await exports.sesTransporter.sendMail({
                    from: fromAddress,
                    to: options.to,
                    subject: options.subject,
                    html: options.html,
                    text: options.text,
                    replyTo: options.replyTo,
                });
                console.log(`[EMAIL] Sent via SES fallback: ${options.to}`);
                return { success: true, messageId: result.messageId, provider: 'ses' };
            }
            catch (sesError) {
                console.error('[EMAIL] SES fallback also failed:', sesError);
                throw new Error('All email providers failed');
            }
        }
        throw harakaError;
    }
}
// Verify transporter connection
async function verifyConnection() {
    try {
        await exports.transporter.verify();
        console.log('[EMAIL] Haraka connection verified');
        return true;
    }
    catch (error) {
        console.error('[EMAIL] Haraka connection failed:', error);
        return false;
    }
}
//# sourceMappingURL=transporter.js.map