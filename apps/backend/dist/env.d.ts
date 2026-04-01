export declare const env: {
    nodeEnv: string;
    port: number;
    email: {
        host: string;
        port: number;
        secure: boolean;
        user: string;
        pass: string;
        defaultFrom: string;
        sesEnabled: boolean;
        sesRegion: string;
    };
    redis: {
        host: string;
        port: number;
        password: string;
    };
    haraka: {
        server: string;
        port: number;
        webhookSecret: string;
    };
    domain: string;
    dkim: {
        domain: string;
        selector: string;
        privateKey: string;
    };
    cloudflare: {
        accountId: string;
        apiToken: string;
    };
};
//# sourceMappingURL=env.d.ts.map