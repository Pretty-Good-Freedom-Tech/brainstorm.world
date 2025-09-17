// Instance profile fetching functionality
class InstanceProfileManager {
    constructor() {
        this.relays = [
            'wss://relay.damus.io',
            'wss://nos.lol',
            'wss://relay.nostr.band',
            'wss://nostr-pub.wellorder.net'
        ];
        this.profileCache = new Map();
    }

    // Convert hex pubkey to npub format
    hexToNpub(hex) {
        try {
            // This is a simplified conversion - in production you'd use a proper nostr library
            return `npub1${hex.substring(0, 32)}...`;
        } catch (error) {
            console.error('Error converting hex to npub:', error);
            return hex;
        }
    }

    // Fetch profile from Nostr relays
    async fetchNostrProfile(pubkey) {
        if (this.profileCache.has(pubkey)) {
            return this.profileCache.get(pubkey);
        }

        console.log(`Fetching profile for pubkey: ${pubkey}`);

        try {
            // Try to fetch from a public API first (fallback approach)
            const response = await fetch(`https://api.nostr.band/v0/metadata/${pubkey}`);
            if (response.ok) {
                const data = await response.json();
                if (data && data.name) {
                    const profile = {
                        name: data.name || 'Unknown User',
                        picture: data.picture || null,
                        about: data.about || '',
                        nip05: data.nip05 || null
                    };
                    this.profileCache.set(pubkey, profile);
                    return profile;
                }
            }
        } catch (error) {
            console.log('API fetch failed, trying WebSocket approach:', error);
        }

        // Fallback to WebSocket relay approach
        return this.fetchFromRelays(pubkey);
    }

    async fetchFromRelays(pubkey) {
        return new Promise((resolve) => {
            let resolved = false;
            let attempts = 0;
            const maxAttempts = this.relays.length;

            const tryRelay = (relayUrl) => {
                if (resolved) return;

                const ws = new WebSocket(relayUrl);
                const timeoutId = setTimeout(() => {
                    if (!resolved) {
                        ws.close();
                        attempts++;
                        if (attempts >= maxAttempts) {
                            resolved = true;
                            resolve(this.getDefaultProfile(pubkey));
                        }
                    }
                }, 5000);

                ws.onopen = () => {
                    console.log(`Connected to ${relayUrl}`);
                    // Request user metadata (kind 0)
                    const filter = {
                        kinds: [0],
                        authors: [pubkey],
                        limit: 1
                    };
                    const subscription = ["REQ", "profile_" + Date.now(), filter];
                    ws.send(JSON.stringify(subscription));
                };

                ws.onmessage = (event) => {
                    if (resolved) return;

                    try {
                        const message = JSON.parse(event.data);
                        if (message[0] === "EVENT" && message[2]) {
                            const eventData = message[2];
                            if (eventData.kind === 0) {
                                const content = JSON.parse(eventData.content);
                                const profile = {
                                    name: content.name || content.display_name || 'Unknown User',
                                    picture: content.picture || null,
                                    about: content.about || '',
                                    nip05: content.nip05 || null
                                };
                                
                                clearTimeout(timeoutId);
                                ws.close();
                                resolved = true;
                                this.profileCache.set(pubkey, profile);
                                resolve(profile);
                            }
                        }
                    } catch (error) {
                        console.error('Error parsing message:', error);
                    }
                };

                ws.onerror = (error) => {
                    console.error(`WebSocket error for ${relayUrl}:`, error);
                    clearTimeout(timeoutId);
                    attempts++;
                    if (attempts >= maxAttempts && !resolved) {
                        resolved = true;
                        resolve(this.getDefaultProfile(pubkey));
                    }
                };

                ws.onclose = () => {
                    clearTimeout(timeoutId);
                    if (!resolved) {
                        attempts++;
                        if (attempts >= maxAttempts) {
                            resolved = true;
                            resolve(this.getDefaultProfile(pubkey));
                        }
                    }
                };
            };

            // Try relays sequentially with small delays
            this.relays.forEach((relay, index) => {
                setTimeout(() => tryRelay(relay), index * 1000);
            });
        });
    }

    getDefaultProfile(pubkey) {
        return {
            name: `User ${pubkey.substring(0, 8)}...`,
            picture: null,
            about: '',
            nip05: null
        };
    }

    // Update instance card with profile data
    async updateInstanceCard(card, profile) {
        const nameElement = card.querySelector('.owner-name');
        const avatarElement = card.querySelector('.avatar-img');

        if (nameElement) {
            nameElement.textContent = profile.name;
        }

        if (avatarElement && profile.picture) {
            // Test if the image URL is valid
            const img = new Image();
            img.onload = () => {
                avatarElement.src = profile.picture;
            };
            img.onerror = () => {
                console.log('Failed to load profile picture, using default');
                // Keep default avatar
            };
            img.src = profile.picture;
        }
    }

    // Initialize profile loading for all instance cards
    async initializeInstanceProfiles() {
        const instanceCards = document.querySelectorAll('.instance-card[data-pubkey]');
        
        for (const card of instanceCards) {
            const pubkey = card.getAttribute('data-pubkey');
            if (pubkey) {
                try {
                    console.log(`Loading profile for instance: ${pubkey}`);
                    const profile = await this.fetchNostrProfile(pubkey);
                    await this.updateInstanceCard(card, profile);
                } catch (error) {
                    console.error(`Error loading profile for ${pubkey}:`, error);
                    // Update with default profile
                    const defaultProfile = this.getDefaultProfile(pubkey);
                    await this.updateInstanceCard(card, defaultProfile);
                }
            }
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Wait a bit for the header/footer to load
    setTimeout(() => {
        const profileManager = new InstanceProfileManager();
        profileManager.initializeInstanceProfiles();
    }, 1000);
});
