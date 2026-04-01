# Haraka SMTP Server Setup Guide

## Architecture Overview

```
Frontend (React/Vite)
        ↓
Backend API (Hono / Cloudflare Workers)
        ↓
Outbound Queue (BullMQ / Redis)
        ↓
Haraka SMTP (Outbound)
        ↓
Internet (Gmail, Outlook)

Inbound Flow:
Internet → Haraka → Webhook/API → Backend → DB
```

## 1. Install Haraka

```bash
npm install -g Haraka
haraka -i /opt/haraka
cd /opt/haraka
npm install
```

## 2. Configuration Files

Copy the configuration files from `haraka/config/` to `/opt/haraka/config/`:

```bash
cp -r haraka/config/* /opt/haraka/config/
cp -r haraka/plugins/* /opt/haraka/plugins/
```

## 3. Generate DKIM Keys

```bash
cd /opt/haraka
openssl genrsa -out dkim.private 2048
openssl rsa -in dkim.private -pubout > dkim.public
```

Update `config/dkim_sign.ini` with your domain and key path.

## 4. DNS Configuration (Critical for Deliverability)

### SPF Record
```
v=spf1 ip4:YOUR_SERVER_IP -all
```

### DKIM Record
Create TXT record for `default._domainkey.protechplanner.com`:
```
v=DKIM1; k=rsa; p=YOUR_PUBLIC_KEY
```

### DMARC Record
Create TXT record for `_dmarc.protechplanner.com`:
```
v=DMARC1; p=quarantine; rua=mailto:dmarc@protechplanner.com
```

### PTR Record (Reverse DNS)
Contact your VPS provider to set up:
```
YOUR_IP → mail.protechplanner.com
```

## 5. Start Haraka Server

```bash
cd /opt/haraka
haraka -c .
```

## 6. Environment Variables

Update your backend `.env` file:

```env
HARAKA_SERVER=mail.protechplanner.com
HARAKA_PORT=25
HARAKA_WEBHOOK_SECRET=your-secret-key
BACKEND_HOST=localhost
BACKEND_PORT=3000
```

## 7. Testing

### Test Inbound
Send an email to `info@protechplanner.com` and check the backend logs.

### Test Outbound
Use the API endpoint:
```bash
curl -X POST http://localhost:3000/api/email/send \
  -H "Content-Type: application/json" \
  -d '{"to": "test@example.com", "subject": "Test", "html": "<h1>Hello</h1>"}'
```

## 8. Production Checklist

- [ ] Configure DKIM signing
- [ ] Set up SPF, DKIM, DMARC records
- [ ] Configure PTR (Reverse DNS)
- [ ] Warm up IP address (start with 20-50 emails/day)
- [ ] Register with Gmail Postmaster Tools
- [ ] Monitor email delivery rates
- [ ] Set up bounce/spam feedback loops

## 9. Monitoring

### Haraka Logs
```bash
tail -f /opt/haraka/logs/haraka.log
```

### Backend Logs
```bash
tail -f /var/log/protechplanner/backend.log
```

## 10. Hybrid Approach (Recommended for Production)

For high deliverability, use a hybrid approach:

1. **Inbound**: Haraka receives emails → forwards to backend
2. **Outbound**: Haraka for initial emails + SES/SendGrid as fallback

Configure in `config/queue/smtp_forward`:
```
[protechplanner.com]
host=email-smtp.us-east-1.amazonaws.com
port=587
auth_user=YOUR_SES_USER
auth_pass=YOUR_SES_PASS
```
