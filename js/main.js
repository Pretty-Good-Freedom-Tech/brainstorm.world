// Modal functions
function showBetaModal() {
    const modal = document.getElementById('betaModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeBetaModal() {
    const modal = document.getElementById('betaModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Main.js loaded');
    
    // Wait for header to load before initializing smooth scrolling and beta modal
    setTimeout(() => {
        initSmoothScrolling();
        initializeBetaModal();
        initializeLaunchInstanceModal();
        initAuthUI();
    }, 500);
});

// Beta modal functionality
function initializeBetaModal() {
    const betaBadge = document.getElementById('betaBadge');
    const betaModal = document.getElementById('betaModal');
    const closeBtn = betaModal?.querySelector('.close');

    if (betaBadge && betaModal) {
        // Open modal when beta badge is clicked
        betaBadge.addEventListener('click', function() {
            betaModal.style.display = 'block';
        });

        // Close modal when X is clicked
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                betaModal.style.display = 'none';
            });
        }

        // Close modal when clicking outside of it
        window.addEventListener('click', function(event) {
            if (event.target === betaModal) {
                betaModal.style.display = 'none';
            }
        });
    }
}

// Launch Instance modal functionality
function initializeLaunchInstanceModal() {
    const launchInstanceBtn = document.getElementById('launchInstanceBtn');
    const launchInstanceModal = document.getElementById('launchInstanceModal');
    const closeBtn = launchInstanceModal?.querySelector('.close');

    if (launchInstanceBtn && launchInstanceModal) {
        // Open modal when Launch Instance button is clicked
        launchInstanceBtn.addEventListener('click', function(e) {
            e.preventDefault();
            launchInstanceModal.style.display = 'block';
        });

        // Close modal when X is clicked
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                launchInstanceModal.style.display = 'none';
            });
        }

        // Close modal when clicking outside of it
        window.addEventListener('click', function(event) {
            if (event.target === launchInstanceModal) {
                launchInstanceModal.style.display = 'none';
            }
        });
    }
}

// Initialize components and auth when components are loaded
document.addEventListener('componentsLoaded', function() {
    console.log('Components loaded, initializing...');
    
    // Initialize smooth scrolling now that header is loaded
    initSmoothScrolling();
    
    // Add a small delay to ensure DOM elements are fully rendered
    setTimeout(() => {
        // Wait for NostrAuth to be ready before initializing auth UI
        if (window.nostrAuth && window.nostrAuth.isReady) {
            console.log('NostrAuth already ready, initializing auth UI...');
            initAuthUI();
        } else {
            console.log('Waiting for NostrAuth to be ready...');
            document.addEventListener('nostrAuthReady', function() {
                console.log('NostrAuth ready event received, initializing auth UI...');
                initAuthUI();
            });
        }
    }, 100);
});

function initModalHandlers() {
    const modal = document.getElementById('betaModal');
    const closeBtn = modal.querySelector('.close');
    
    // Close modal when clicking the X button
    closeBtn.addEventListener('click', closeBetaModal);
    
    // Close modal when clicking outside of it
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeBetaModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            closeBetaModal();
        }
    });
    
    // Add event listener to Launch Instance button
    const launchBtn = document.querySelector('a.btn.btn-primary');
    if (launchBtn && launchBtn.textContent.trim() === 'Launch Instance') {
        launchBtn.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default anchor behavior
            showBetaModal();
        });
    }
}

// This function is now handled by the componentsLoaded event listener
// Removed duplicate initialization that was running before header was loaded

// Smooth scrolling function
function initSmoothScrolling() {
    // Smooth scrolling for anchor links
    console.log('Initializing smooth scrolling...');
    // Select both #anchor and index.html#anchor format links
    const links = document.querySelectorAll('a[href^="#"], a[href*="#"]');
    console.log('Found anchor links:', links.length);
    
    // Debug: Log all found links
    links.forEach((link, index) => {
        console.log(`Link ${index}:`, link.getAttribute('href'), link.textContent.trim());
    });
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            console.log('Smooth scrolling clicked: ' + href);
            
            // Only handle links that contain hash fragments and are on the same page
            if (!href.includes('#')) return;
            
            // Extract the hash part (everything after #)
            const hashIndex = href.indexOf('#');
            const targetId = href.substring(hashIndex);
            
            // Skip if hash is empty or just '#'
            if (targetId === '#' || targetId === '') {
                console.log('Skipping empty hash link:', href);
                return;
            }
            
            // Check if this is a same-page link (no domain/path before # or starts with current page)
            const beforeHash = href.substring(0, hashIndex);
            const currentPage = window.location.pathname.split('/').pop() || 'index.html';
            
            if (beforeHash === '' || beforeHash === currentPage || beforeHash === 'index.html') {
                console.log('Processing same-page anchor link:', targetId);
                e.preventDefault();
                
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const header = document.querySelector('.header');
                    const headerHeight = header ? header.offsetHeight : 0;
                    const targetPosition = targetSection.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Add scroll effect to header
    const header = document.querySelector('.header');
    if (header) {
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
    }
    
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
}

// Authentication UI Management
function initAuthUI() {
    console.log('Initializing auth UI...');
    
    // Debug: Check if header is loaded
    const headerPlaceholder = document.getElementById('header-placeholder');
    console.log('Header placeholder found:', !!headerPlaceholder);
    console.log('Header placeholder content:', headerPlaceholder ? headerPlaceholder.innerHTML.length : 'N/A');
    
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const userProfile = document.getElementById('userProfile');
    const userName = document.getElementById('userName');
    const userAvatar = document.getElementById('userAvatar');

    console.log('Auth elements found:', {
        loginBtn: !!loginBtn,
        logoutBtn: !!logoutBtn,
        userProfile: !!userProfile,
        userName: !!userName,
        userAvatar: !!userAvatar
    });

    if (!loginBtn) {
        console.error('Login button not found in DOM - header may not be loaded yet');
        // Retry after a longer delay
        setTimeout(() => {
            console.log('Retrying auth UI initialization...');
            initAuthUI();
        }, 500);
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
