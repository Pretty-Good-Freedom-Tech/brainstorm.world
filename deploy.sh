#!/bin/bash

# Deployment script for brainstorm.world landing page
# Usage: ./deploy.sh [droplet-ip]

set -e

# Configuration
DROPLET_IP=${1:-"your-droplet-ip"}
REMOTE_USER="root"
REMOTE_PATH="/var/www/brainstorm.world"
LOCAL_PATH="./"

echo "🚀 Deploying brainstorm.world landing page..."
echo "Target: $REMOTE_USER@$DROPLET_IP:$REMOTE_PATH"

# Check if we can connect to the droplet
echo "📡 Testing connection to droplet..."
if ! ssh -o ConnectTimeout=10 "$REMOTE_USER@$DROPLET_IP" "echo 'Connection successful'"; then
    echo "❌ Failed to connect to droplet. Please check:"
    echo "   - Droplet IP address: $DROPLET_IP"
    echo "   - SSH key is configured"
    echo "   - Droplet is running"
    exit 1
fi

# Create remote directory if it doesn't exist
echo "📁 Creating remote directory..."
ssh "$REMOTE_USER@$DROPLET_IP" "mkdir -p $REMOTE_PATH"

# Deploy files using rsync
echo "📤 Uploading files..."
rsync -avz --delete \
    --exclude='.git' \
    --exclude='node_modules' \
    --exclude='*.md' \
    --exclude='deploy.sh' \
    "$LOCAL_PATH" "$REMOTE_USER@$DROPLET_IP:$REMOTE_PATH/"

# Set proper permissions
echo "🔐 Setting permissions..."
ssh "$REMOTE_USER@$DROPLET_IP" "chown -R www-data:www-data $REMOTE_PATH && chmod -R 755 $REMOTE_PATH"

# Test if nginx is running and configured
echo "🔍 Checking web server status..."
if ssh "$REMOTE_USER@$DROPLET_IP" "systemctl is-active nginx >/dev/null 2>&1"; then
    echo "✅ Nginx is running"
else
    echo "⚠️  Nginx is not running. You may need to:"
    echo "   - Install nginx: apt update && apt install nginx"
    echo "   - Configure nginx for brainstorm.world"
    echo "   - Start nginx: systemctl start nginx"
fi

echo "🎉 Deployment complete!"
echo "🌐 Your site should be available at: https://www.brainstorm.world"
echo ""
echo "Next steps:"
echo "1. Configure nginx virtual host for brainstorm.world"
echo "2. Set up SSL certificate (Let's Encrypt recommended)"
echo "3. Test the site in your browser"
