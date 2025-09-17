// Initialize authentication when both DOM and NostrAuth are ready
function initializeAuth() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeAuth);
        return;
    }
    
    if (window.nostrAuth) {
        initAuthUI();
    } else {
        window.addEventListener('nostrAuthReady', initAuthUI);
    }
}

// Start initialization
initializeAuth();

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add scroll effect to header
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Add animation on scroll for feature cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe feature cards and steps
    const animatedElements = document.querySelectorAll('.feature-card, .step, .option-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Authentication UI Management
function initAuthUI() {
    console.log('Initializing auth UI...');
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const userProfile = document.getElementById('userProfile');
    const userName = document.getElementById('userName');
    const userAvatar = document.getElementById('userAvatar');

    if (!loginBtn) {
        console.error('Login button not found in DOM');
        return;
    }
    
    console.log('Auth UI elements found, setting up event listeners...');

    // Show appropriate UI based on login status
    function updateAuthUI() {
        if (window.nostrAuth.isLoggedIn()) {
            const user = window.nostrAuth.getCurrentUser();
            loginBtn.style.display = 'none';
            userProfile.style.display = 'flex';
            
            // Update user display
            userName.textContent = user.display_name || user.name || user.npub || 'Anonymous';
            
            // Handle avatar with loading state and fallback
            if (user.picture) {
                console.log('Loading avatar:', user.picture);
                userAvatar.classList.add('loading');
                userAvatar.src = user.picture;
                userAvatar.onload = function() {
                    this.classList.remove('loading');
                };
                userAvatar.onerror = function() {
                    console.log('Avatar failed to load, using default');
                    this.src = 'images/default-avatar.svg';
                    this.classList.remove('loading');
                    this.onerror = null; // Prevent infinite loop
                };
            } else {
                userAvatar.src = 'images/default-avatar.svg';
                userAvatar.classList.remove('loading');
            }
        } else {
            loginBtn.style.display = 'inline-block';
            userProfile.style.display = 'none';
        }
    }

    // Login button click handler
    loginBtn.addEventListener('click', async function() {
        console.log('Login button clicked');
        try {
            loginBtn.textContent = 'Connecting...';
            loginBtn.disabled = true;
            
            const user = await window.nostrAuth.login();
            
            // Show initial success message
            showNotification('Connected! Fetching profile...', 'info');
            
            // Update UI immediately with basic info
            updateAuthUI();
            
            showNotification('Successfully connected with Nostr!', 'success');
        } catch (error) {
            console.error('Login error:', error);
            showNotification(error.message, 'error');
        } finally {
            loginBtn.textContent = 'Connect Wallet';
            loginBtn.disabled = false;
        }
    });

    // Logout button click handler
    logoutBtn.addEventListener('click', function() {
        window.nostrAuth.logout();
        showNotification('Disconnected from Nostr', 'info');
    });

    // Listen for auth events
    window.nostrAuth.on('onLogin', function(user) {
        updateAuthUI();
    });

    window.nostrAuth.on('onLogout', function() {
        updateAuthUI();
    });

    window.nostrAuth.on('onError', function(error) {
        console.error('Auth error:', error);
    });

    // Initial UI update
    updateAuthUI();
}

// Notification system
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Remove notification after 4 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 4000);
}

// Add mobile menu functionality (for future enhancement)
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('mobile-open');
}
