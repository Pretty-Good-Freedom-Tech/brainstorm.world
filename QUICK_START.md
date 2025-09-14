# Quick Start Guide

## Local Development

1. **Start local server:**
   ```bash
   cd /Users/wds/CascadeProjects/brainstorm.world
   python3 -m http.server 8000
   ```

2. **View in browser:**
   Open `http://localhost:8000`

## Deploy to Digital Ocean

### One-Command Deploy
```bash
./deploy.sh YOUR_DROPLET_IP
```

### First-Time Setup
```bash
# On your droplet
ssh root@YOUR_DROPLET_IP
apt update && apt install nginx certbot python3-certbot-nginx -y

# Deploy files
./deploy.sh YOUR_DROPLET_IP

# Configure nginx
cp /var/www/brainstorm.world/nginx-config.example /etc/nginx/sites-available/brainstorm.world
ln -s /etc/nginx/sites-available/brainstorm.world /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx

# Setup SSL
certbot --nginx -d brainstorm.world -d www.brainstorm.world
```

### Update Website
```bash
# Make changes, then:
git add . && git commit -m "Update content" && git push
./deploy.sh YOUR_DROPLET_IP
```

That's it! Your site will be live at https://www.brainstorm.world
