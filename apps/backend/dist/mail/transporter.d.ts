import nodemailer from 'nodemailer';
export declare const transporter: nodemailer.Transporter<import("nodemailer/lib/smtp-pool/index.js").SentMessageInfo, import("nodemailer/lib/smtp-pool/index.js").Options>;
export declare const sesTransporter: nodemailer.Transporter<import("nodemailer/lib/smtp-pool/index.js").SentMessageInfo, import("nodemailer/lib/smtp-pool/index.js").Options>;
export declare function sendEmail(options: {
    from?: string;
    to: string;
    subject: string;
    html?: string;
    text?: string;
    replyTo?: string;
    headers?: Record<string, string>;
}): Promise<{
    success: boolean;
    messageId: string;
    provider: string;
}>;
export declare function verifyConnection(): Promise<boolean>;
//# sourceMappingURL=transporter.d.ts.map