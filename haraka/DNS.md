# Protechplanner Email System - DNS Configuration
# Add these records to your DNS provider

## 1. SPF (Sender Policy Framework)
# V=SPF1 include:_spf.protechplanner.com ~all

## 2. DMARC
# v=DMARC1; p=quarantine; rua=mailto:admin@protechplanner.com

## 3. DKIM
# Default selector: protechplanner.com._domainkey.protechplanner.com
# TXT value: v=DKIM1; k=rsa; p=<PUBLIC_KEY>

## 4. PTR (Reverse DNS)
# Set to: mail.protechplanner.com (contact your VPS provider)

## 5. MX Records
# @ MX 10 mail.protechplanner.com
# mail A <YOUR_SERVER_IP>

## DNS Check Commands
# dig TXT protechplanner.com
# dig TXT _dmarc.protechplanner.com
# dig TXT default._domainkey.protechplanner.com
