// Haraka Plugin: Inbound to API
// Sends inbound emails to backend API webhook

const http = require('http');
const https = require('https');

exports.hook_data_post = function (next, connection) {
    const txn = connection.transaction;
    
    if (!txn || !txn.mail_from || !txn.rcpt_to) {
        connection.logerror(this, 'Invalid transaction data');
        return next();
    }

    const email = {
        from: txn.mail_from.address(),
        to: txn.rcpt_to.map(r => r.address()),
        subject: txn.header.get('subject') || '(No Subject)',
        body: txn.body ? txn.body.toString() : '',
        headers: {},
        messageId: txn.header.get('message-id'),
        inReplyTo: txn.header.get('in-reply-to'),
        references: txn.header.get('references') ? txn.header.get('references').split(' ') : [],
        date: txn.header.get('date'),
    };

    // Extract headers
    const headerNames = txn.header.keys();
    for (const name of headerNames) {
        email.headers[name] = txn.header.get(name);
    }

    // Send to backend API
    const postData = JSON.stringify(email);
    
    const options = {
        hostname: process.env.BACKEND_HOST || 'localhost',
        port: process.env.BACKEND_PORT || 3000,
        path: '/api/email/inbound',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(postData),
            'X-Haraka-Secret': process.env.HARAKA_WEBHOOK_SECRET || '',
        },
    };

    const protocol = process.env.BACKEND_USE_HTTPS === 'true' ? https : http;
    
    const req = protocol.request(options, (res) => {
        let data = '';
        
        res.on('data', (chunk) => {
            data += chunk;
        });
        
        res.on('end', () => {
            if (res.statusCode >= 200 && res.statusCode < 300) {
                connection.loginfo(this, `Email forwarded to API: ${email.from} -> ${email.to}`);
                return next();
            } else {
                connection.logerror(this, `API returned ${res.statusCode}: ${data}`);
                return next();
            }
        });
    });

    req.on('error', (error) => {
        connection.logerror(this, `Failed to forward to API: ${error.message}`);
        // Continue processing even if webhook fails
        return next();
    });

    req.write(postData);
    req.end();
};

exports.hook_queue = function (next, connection) {
    // If webhook fails, still accept the email
    return next(OK);
};
