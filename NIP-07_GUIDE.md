# NIP-07 Nostr Extension Setup Guide

This guide will help you install and configure a NIP-07 compatible Nostr browser extension to connect with brainstorm.world.

## What is NIP-07?

NIP-07 is a Nostr protocol standard that allows web applications to interact with your Nostr identity through browser extensions. This provides a secure way to sign in without exposing your private keys to websites.

## Recommended Extensions

### 1. Alby (Recommended)
**Best for:** General users, Bitcoin Lightning integration
- **Chrome/Brave:** [Chrome Web Store](https://chrome.google.com/webstore/detail/alby/iokeahhehimjnekafflcihljlcjccdbe)
- **Firefox:** [Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/alby/)
- **Features:** Lightning wallet, Nostr identity management, easy setup

### 2. nos2x
**Best for:** Nostr-focused users, minimal interface
- **Chrome/Brave:** [Chrome Web Store](https://chrome.google.com/webstore/detail/nos2x/kpgefcfmnafjgpblomihpgmejjdanjjp)
- **Firefox:** [Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/nos2x/)
- **Features:** Lightweight, Nostr-only functionality

### 3. Flamingo
**Best for:** Advanced users, multiple key management
- **Chrome/Brave:** [Chrome Web Store](https://chrome.google.com/webstore/detail/flamingo/nkjcjojkjbmfmgkjjlkjjjjjjjjjjjjj)
- **Features:** Multiple identity support, advanced key management

## Installation Steps

### Step 1: Install Extension
1. Click on your preferred extension link above
2. Click "Add to Chrome/Firefox"
3. Confirm the installation

### Step 2: Set Up Your Nostr Identity

#### Option A: Create New Identity
1. Open the extension (click the icon in your browser toolbar)
2. Choose "Generate new keys" or "Create new identity"
3. **IMPORTANT:** Save your private key securely
4. Set a strong password for the extension

#### Option B: Import Existing Identity
1. Open the extension
2. Choose "Import existing keys"
3. Enter your Nostr private key (nsec format)
4. Set a strong password for the extension

### Step 3: Configure Extension Settings
1. Enable "Auto-approve" for trusted sites (optional)
2. Set your preferred relays
3. Configure any additional security settings

## Using with Brainstorm.world

1. Visit [brainstorm.world](https://brainstorm.world)
2. Click the "Connect Wallet" button in the top navigation
3. Your extension will prompt you to authorize the connection
4. Click "Allow" or "Approve" in the extension popup
5. You're now connected! Your Nostr identity will appear in the header

## Security Best Practices

### Private Key Security
- **Never share your private key** with anyone
- Store your private key backup in a secure location
- Consider using a hardware wallet for high-value identities

### Extension Security
- Only install extensions from official browser stores
- Keep your extensions updated
- Use strong passwords for extension access
- Review permissions before approving connections

### Website Verification
- Always verify you're on the correct website (brainstorm.world)
- Check for HTTPS (secure connection)
- Be cautious of phishing attempts

## Troubleshooting

### Extension Not Detected
- Refresh the page after installing the extension
- Check if the extension is enabled in your browser settings
- Try disabling and re-enabling the extension

### Connection Failed
- Make sure you've approved the connection in the extension popup
- Check if the extension is unlocked (enter password if required)
- Try disconnecting and reconnecting

### Profile Not Loading
- Some extensions may take time to fetch profile data
- Your profile information comes from Nostr relays and may be cached
- Try refreshing the page if profile data doesn't appear

## Supported Features

When connected with a NIP-07 extension, you can:
- ✅ Authenticate with your Nostr identity
- ✅ Display your profile information
- ✅ Sign messages and events
- 🔄 Access personalized content (coming soon)
- 🔄 Interact with Brainstorm instances (coming soon)

## Privacy Notes

- Your private key never leaves your browser extension
- Brainstorm.world only receives your public key and signed messages
- Profile information is fetched from public Nostr relays
- You can disconnect at any time

## Need Help?

- **Extension Issues:** Contact the extension developer
- **Brainstorm.world Issues:** [GitHub Issues](https://github.com/Pretty-Good-Freedom-Tech/brainstorm.world/issues)
- **General Nostr Help:** [Nostr Protocol Documentation](https://github.com/nostr-protocol/nips)

## Advanced: Manual Key Management

If you prefer to manage keys manually:

1. Generate a key pair using a Nostr client
2. Import the private key into your chosen extension
3. Verify the public key matches your intended identity

Remember: Your Nostr identity is portable across all Nostr applications and relays.
