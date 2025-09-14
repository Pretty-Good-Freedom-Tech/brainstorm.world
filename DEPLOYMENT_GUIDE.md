# Brainstorm.world Deployment Guide

This guide will walk you through deploying the brainstorm.world landing page to your Digital Ocean droplet.

## Prerequisites

- Digital Ocean droplet with Ubuntu/Debian
- Domain `brainstorm.world` and `www.brainstorm.world` pointing to your droplet's IP
- SSH access to your droplet
- Root or sudo access on the droplet

## Step 1: Initial Server Setup

Connect to your droplet:
```bash
ssh root@your-droplet-ip
```

Update the system and install required packages:
```bash
apt update && apt upgrade -y
apt install nginx certbot python3-certbot-nginx ufw -y
```

## Step 2: Configure Firewall

Set up basic firewall rules:
```bash
ufw default deny incoming
ufw default allow outgoing
ufw allow ssh
ufw allow 'Nginx Full'
ufw --force enable
```

## Step 3: Deploy the Website

From your local machine, run the deployment script:
```bash
cd /Users/wds/CascadeProjects/brainstorm.world
./deploy.sh your-droplet-ip
```

This will:
- Test connection to your droplet
- Create the web directory `/var/www/brainstorm.world`
- Upload all website files
- Set proper permissions

## Step 4: Configure Nginx

On your droplet, set up the nginx configuration:
```bash
# Copy the nginx configuration
cp /var/www/brainstorm.world/nginx-config.example /etc/nginx/sites-available/brainstorm.world

# Enable the site
ln -s /etc/nginx/sites-available/brainstorm.world /etc/nginx/sites-enabled/

# Remove default nginx site
rm -f /etc/nginx/sites-enabled/default

# Test nginx configuration
nginx -t

# If test passes, reload nginx
systemctl reload nginx
```

## Step 5: Set Up SSL Certificate

Install SSL certificate using Let's Encrypt:
```bash
certbot --nginx -d brainstorm.world -d www.brainstorm.world
```

Follow the prompts:
- Enter your email address
- Agree to terms of service
- Choose whether to share email with EFF
- Select option 2 to redirect HTTP to HTTPS

## Step 6: Verify Deployment

Test your website:
```bash
# Test HTTP redirect
curl -I http://brainstorm.world

# Test HTTPS
curl -I https://brainstorm.world

# Check nginx status
systemctl status nginx

# Check SSL certificate
certbot certificates
```

## Step 7: Set Up Automatic SSL Renewal

Let's Encrypt certificates expire every 90 days. Set up automatic renewal:
```bash
# Test renewal process
certbot renew --dry-run

# The renewal cron job is automatically installed, but you can verify:
systemctl status certbot.timer
```

## Troubleshooting

### Common Issues

1. **502 Bad Gateway**: Check nginx error logs
   ```bash
   tail -f /var/log/nginx/error.log
   ```

2. **Permission Issues**: Ensure correct ownership
   ```bash
   chown -R www-data:www-data /var/www/brainstorm.world
   chmod -R 755 /var/www/brainstorm.world
   ```

3. **DNS Issues**: Verify domain points to your droplet
   ```bash
   dig brainstorm.world
   dig www.brainstorm.world
   ```

4. **Firewall Blocking**: Check UFW status
   ```bash
   ufw status verbose
   ```

### Log Files

- Nginx access logs: `/var/log/nginx/access.log`
- Nginx error logs: `/var/log/nginx/error.log`
- Certbot logs: `/var/log/letsencrypt/letsencrypt.log`

## Updating the Website

To update the website content:

1. Make changes locally
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Update website content"
   git push origin main
   ```
3. Deploy changes:
   ```bash
   ./deploy.sh your-droplet-ip
   ```

## Performance Optimization

The nginx configuration includes:
- Gzip compression for faster loading
- Browser caching for static assets
- Security headers for better security
- HTTP/2 support for improved performance

## Security Features

- Automatic HTTP to HTTPS redirect
- Security headers (X-Frame-Options, X-XSS-Protection, etc.)
- SSL/TLS encryption with modern cipher suites
- Firewall protection with UFW

## Monitoring

Monitor your website:
```bash
# Check nginx status
systemctl status nginx

# Monitor access logs
tail -f /var/log/nginx/access.log

# Check SSL certificate expiry
certbot certificates
```

## Backup

Consider setting up automated backups:
```bash
# Create backup script
cat > /root/backup-website.sh << 'EOF'
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
tar -czf /root/brainstorm-world-backup-$DATE.tar.gz /var/www/brainstorm.world
find /root -name "brainstorm-world-backup-*.tar.gz" -mtime +30 -delete
EOF

chmod +x /root/backup-website.sh

# Add to crontab for daily backups
echo "0 2 * * * /root/backup-website.sh" | crontab -
```

Your brainstorm.world landing page should now be live and secure!
