/**
 * NIP-07 Nostr Authentication Module
 * Handles login/logout using browser Nostr extensions
 */

class NostrAuth {
    constructor() {
        this.user = null;
        this.isConnected = false;
        this.callbacks = {
            onLogin: [],
            onLogout: [],
            onError: []
        };
        
        // Check if already connected on page load
        this.init();
    }

    /**
     * Initialize the auth system
     */
    async init() {
        // Check if user was previously logged in
        const savedUser = localStorage.getItem('nostr_user');
        if (savedUser) {
            try {
                this.user = JSON.parse(savedUser);
                this.isConnected = true;
                this.triggerCallbacks('onLogin', this.user);
            } catch (error) {
                console.error('Error parsing saved user data:', error);
                localStorage.removeItem('nostr_user');
            }
        }
    }

    /**
     * Check if NIP-07 extension is available
     */
    isExtensionAvailable() {
        return typeof window.nostr !== 'undefined';
    }

    /**
     * Get the user's public key using NIP-07
     */
    async getPublicKey() {
        if (!this.isExtensionAvailable()) {
            throw new Error('No Nostr extension found. Please install a NIP-07 compatible extension like Alby, nos2x, or Flamingo.');
        }

        try {
            const pubkey = await window.nostr.getPublicKey();
            return pubkey;
        } catch (error) {
            throw new Error('Failed to get public key: ' + error.message);
        }
    }

    /**
     * Convert hex pubkey to npub format
     */
    hexToNpub(hex) {
        // Simple bech32 encoding for npub (this is a simplified version)
        // In production, you'd want to use a proper bech32 library
        try {
            // For now, we'll just return the hex with npub prefix for display
            return 'npub1' + hex.substring(0, 8) + '...';
        } catch (error) {
            return hex.substring(0, 8) + '...';
        }
    }

    /**
     * Fetch user profile from Nostr relays
     */
    async fetchUserProfile(pubkey) {
        // This is a simplified profile fetch
        // In production, you'd connect to actual Nostr relays
        try {
            // For now, return a basic profile structure
            return {
                pubkey: pubkey,
                npub: this.hexToNpub(pubkey),
                name: null,
                display_name: null,
                about: null,
                picture: null,
                nip05: null
            };
        } catch (error) {
            console.error('Error fetching profile:', error);
            return {
                pubkey: pubkey,
                npub: this.hexToNpub(pubkey),
                name: null,
                display_name: null,
                about: null,
                picture: null,
                nip05: null
            };
        }
    }

    /**
     * Login using NIP-07 extension
     */
    async login() {
        try {
            if (!this.isExtensionAvailable()) {
                throw new Error('No Nostr extension found. Please install a NIP-07 compatible extension like Alby, nos2x, or Flamingo.');
            }

            // Get public key from extension
            const pubkey = await this.getPublicKey();
            
            // Fetch user profile
            const profile = await this.fetchUserProfile(pubkey);
            
            // Store user data
            this.user = profile;
            this.isConnected = true;
            
            // Save to localStorage for persistence
            localStorage.setItem('nostr_user', JSON.stringify(this.user));
            
            // Trigger login callbacks
            this.triggerCallbacks('onLogin', this.user);
            
            return this.user;
        } catch (error) {
            this.triggerCallbacks('onError', error);
            throw error;
        }
    }

    /**
     * Logout user
     */
    logout() {
        this.user = null;
        this.isConnected = false;
        
        // Clear localStorage
        localStorage.removeItem('nostr_user');
        
        // Trigger logout callbacks
        this.triggerCallbacks('onLogout');
    }

    /**
     * Sign a message using the extension
     */
    async signMessage(message) {
        if (!this.isConnected) {
            throw new Error('Not logged in');
        }

        if (!this.isExtensionAvailable()) {
            throw new Error('No Nostr extension available');
        }

        try {
            const signature = await window.nostr.signEvent({
                kind: 1,
                created_at: Math.floor(Date.now() / 1000),
                tags: [],
                content: message
            });
            return signature;
        } catch (error) {
            throw new Error('Failed to sign message: ' + error.message);
        }
    }

    /**
     * Add event listeners
     */
    on(event, callback) {
        if (this.callbacks[event]) {
            this.callbacks[event].push(callback);
        }
    }

    /**
     * Remove event listeners
     */
    off(event, callback) {
        if (this.callbacks[event]) {
            const index = this.callbacks[event].indexOf(callback);
            if (index > -1) {
                this.callbacks[event].splice(index, 1);
            }
        }
    }

    /**
     * Trigger callbacks for an event
     */
    triggerCallbacks(event, data = null) {
        if (this.callbacks[event]) {
            this.callbacks[event].forEach(callback => {
                try {
                    callback(data);
                } catch (error) {
                    console.error('Error in callback:', error);
                }
            });
        }
    }

    /**
     * Get current user
     */
    getCurrentUser() {
        return this.user;
    }

    /**
     * Check if user is logged in
     */
    isLoggedIn() {
        return this.isConnected && this.user !== null;
    }
}

// Create global instance
window.nostrAuth = new NostrAuth();
