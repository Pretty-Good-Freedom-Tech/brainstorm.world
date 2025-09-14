# brainstorm.world

Landing page for the Brainstorm project - a decentralized web of trust system built on the Nostr protocol.

## Project Structure

```
brainstorm.world/
├── index.html          # Main landing page
├── css/
│   └── style.css       # Styles and responsive design
├── js/
│   └── main.js         # Interactive functionality
├── images/             # Static assets (logos, icons, etc.)
├── package.json        # Project metadata
├── deploy.sh           # Deployment script for Digital Ocean
└── nginx-config.example # Nginx configuration template
```

## Development

To run locally for development:

```bash
# Simple HTTP server
npm run dev
# or
python3 -m http.server 8000
```

Then visit `http://localhost:8000`

## Deployment

1. Update the droplet IP in `deploy.sh` or pass it as an argument
2. Run the deployment script:
   ```bash
   ./deploy.sh your-droplet-ip
   ```

## Server Setup

1. **Install Nginx:**
   ```bash
   apt update && apt install nginx
   ```

2. **Configure Nginx:**
   ```bash
   cp nginx-config.example /etc/nginx/sites-available/brainstorm.world
   ln -s /etc/nginx/sites-available/brainstorm.world /etc/nginx/sites-enabled/
   nginx -t && systemctl reload nginx
   ```

3. **Set up SSL with Let's Encrypt:**
   ```bash
   apt install certbot python3-certbot-nginx
   certbot --nginx -d brainstorm.world -d www.brainstorm.world
   ```

## Features

- Modern, responsive design
- Smooth scrolling navigation
- Animated elements on scroll
- SEO optimized
- Mobile-friendly
- Fast loading with optimized assets

## Contributing

This is the landing page for the Brainstorm project. The main application code is at:
https://github.com/Pretty-Good-Freedom-Tech/hasenpfeffr
