#!/bin/bash

# Haraka Installation and Setup Script
# For ProtechPlanner Email System

set -e

echo "🚀 Setting up Haraka SMTP Server for ProtechPlanner..."

# Check if running as root
if [ "$EUID" -ne 0 ]; then
  echo "❌ Please run as root (use sudo)"
  exit 1
fi

# Variables
HARAKA_DIR="/opt/haraka"
DOMAIN="protechplanner.com"
BACKEND_URL="http://localhost:3000"

# Install Haraka globally
echo "📦 Installing Haraka..."
npm install -g Haraka

# Create Haraka instance
echo "📁 Creating Haraka instance at $HARAKA_DIR..."
haraka -i $HARAKA_DIR
cd $HARAKA_DIR

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Copy configuration files
echo "📝 Copying configuration files..."
cp -r /home/pankaj/Protechplanner/smtp/haraka/config/* $HARAKA_DIR/config/
cp -r /home/pankaj/Protechplanner/smtp/haraka/plugins/* $HARAKA_DIR/plugins/

# Generate DKIM keys if not exists
if [ ! -f "$HARAKA_DIR/dkim.private" ]; then
  echo "🔑 Generating DKIM keys..."
  openssl genrsa -out $HARAKA_DIR/dkim.private 2048
  openssl rsa -in $HARAKA_DIR/dkim.private -pubout > $HARAKA_DIR/dkim.public
  chmod 600 $HARAKA_DIR/dkim.private
  echo "✅ DKIM keys generated"
else
  echo "✅ DKIM keys already exist"
fi

# Update DKIM config with actual paths
sed -i "s|private_key=/opt/haraka/dkim.private|private_key=$HARAKA_DIR/dkim.private|g" $HARAKA_DIR/config/dkim_sign.ini
sed -i "s|domain=protechplanner.com|domain=$DOMAIN|g" $HARAKA_DIR/config/dkim_sign.ini

# Set up inbound webhook
echo "🔗 Configuring inbound webhook to $BACKEND_URL..."
sed -i "s|localhost:3000|$BACKEND_URL|g" $HARAKA_DIR/plugins/inbound_to_api.js

# Create logs directory
mkdir -p $HARAKA_DIR/logs

# Create systemd service
echo "🔧 Creating systemd service..."
cat > /etc/systemd/system/haraka.service << EOF
[Unit]
Description=Haraka SMTP Server
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=$HARAKA_DIR
ExecStart=$HARAKA_DIR/node_modules/.bin/haraka -c $HARAKA_DIR
Restart=always
RestartSec=10
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=multi-user.target
EOF

# Reload systemd
systemctl daemon-reload

echo ""
echo "✅ Haraka installation complete!"
echo ""
echo "📋 Next steps:"
echo "1. Configure DNS records (SPF, DKIM, DMARC, PTR)"
echo "2. Update /opt/haraka/config/me with your hostname"
echo "3. Update /opt/haraka/config/dkim_sign.ini with your domain"
echo "4. Start Haraka: systemctl start haraka"
echo "5. Enable at boot: systemctl enable haraka"
echo "6. View logs: journalctl -u haraka -f"
echo ""
echo "📖 DNS Configuration:"
echo "   SPF: v=spf1 ip4:YOUR_SERVER_IP -all"
echo "   DKIM: default._domainkey.$DOMAIN -> TXT record with public key"
echo "   DMARC: _dmarc.$DOMAIN -> TXT: v=DMARC1; p=quarantine; rua=mailto:dmarc@$DOMAIN"
echo ""
echo "🔍 View DKIM public key:"
cat $HARAKA_DIR/dkim.public
echo ""
