// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize all app functionality
function initializeApp() {
    setupMobileMenu();
    setupSmoothScrolling();
    setupNavbarEffects();
    setupScrollAnimations();
    setupCTAHandlers();
    setupTooltips();
    setupFormValidation();
}

// Mobile Menu Functionality
function setupMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const navLinks = document.getElementById('navLinks');
    
    if (!mobileMenu || !navLinks) return;
    
    mobileMenu.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (navLinks.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // Close menu when clicking on a link
    navLinks.addEventListener('click', function(e) {
        if (e.target.tagName === 'A') {
            navLinks.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!mobileMenu.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Smooth Scrolling for Navigation
function setupSmoothScrolling() {
    const anchors = document.querySelectorAll('a[href^="#"]');
    
    anchors.forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Navbar Scroll Effects
function setupNavbarEffects() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove background blur effect
        if (scrollTop > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.borderBottom = '1px solid rgba(0,0,0,0.1)';
        } else {
            navbar.style.background = 'var(--white)';
            navbar.style.backdropFilter = 'none';
            navbar.style.borderBottom = 'none';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Scroll-triggered Animations
function setupScrollAnimations() {
    // Check if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) return;
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                
                // Add staggered animation for grid items
                const parent = entry.target.parentNode;
                if (parent && (entry.target.classList.contains('step') || 
                    entry.target.classList.contains('startup-card'))) {
                    const children = Array.from(parent.children);
                    const index = children.indexOf(entry.target);
                    const delay = index * 100;
                    entry.target.style.animationDelay = delay + 'ms';
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const elementsToObserve = document.querySelectorAll('.step, .startup-card, .section-title');
    elementsToObserve.forEach(function(el) {
        observer.observe(el);
    });
}

// CTA Button Handlers
function setupCTAHandlers() {
    // Browse Startups buttons
    const browseButtons = document.querySelectorAll('[href="#browse"], .btn-primary');
    browseButtons.forEach(function(button) {
        if (button.textContent.includes('Browse')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                showNotification('Redirecting to browse startups...', 'info');
                setTimeout(function() {
                    // Replace with actual navigation
                    console.log('Navigate to browse startups page');
                }, 1000);
            });
        }
    });

    // List Your Startup buttons
    const listButtons = document.querySelectorAll('.btn-secondary');
    listButtons.forEach(function(button) {
        if (button.textContent.includes('List')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                showNotification('Redirecting to startup registration...', 'info');
                setTimeout(function() {
                    console.log('Navigate to list startup page');
                }, 1000);
            });
        }
    });

    // View Details buttons
    const viewDetailsButtons = document.querySelectorAll('.view-details');
    viewDetailsButtons.forEach(function(button) {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const startupCard = this.closest('.startup-card');
            const startupNameElement = startupCard.querySelector('.startup-name');
            const startupName = startupNameElement ? startupNameElement.textContent : 'Startup';
            showStartupModal(startupName);
        });
    });

    // Login button
    const loginButtons = document.querySelectorAll('.login-btn');
    loginButtons.forEach(function(button) {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            showLoginModal();
        });
    });
}

// Enhanced Tooltip Functionality
function setupTooltips() {
    const tooltips = document.querySelectorAll('.tooltip');
    
    tooltips.forEach(function(tooltip) {
        const tooltipText = tooltip.querySelector('.tooltip-text');
        if (!tooltipText) return;
        
        tooltip.addEventListener('mouseenter', function() {
            tooltipText.style.visibility = 'visible';
            tooltipText.style.opacity = '1';
            tooltipText.style.transform = 'translateY(-5px)';
        });
        
        tooltip.addEventListener('mouseleave', function() {
            tooltipText.style.visibility = 'hidden';
            tooltipText.style.opacity = '0';
            tooltipText.style.transform = 'translateY(0)';
        });
        
        // Touch support for mobile
        tooltip.addEventListener('touchstart', function(e) {
            e.preventDefault();
            tooltipText.style.visibility = 'visible';
            tooltipText.style.opacity = '1';
            tooltipText.style.transform = 'translateY(-5px)';
            
            // Hide after 3 seconds on mobile
            setTimeout(function() {
                tooltipText.style.visibility = 'hidden';
                tooltipText.style.opacity = '0';
                tooltipText.style.transform = 'translateY(0)';
            }, 3000);
        });
    });
}

// Form Validation
function setupFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(function(form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            validateForm(this);
        });
    });
}

function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(function(input) {
        if (!input.value.trim()) {
            showFieldError(input, 'This field is required');
            isValid = false;
        } else {
            clearFieldError(input);
        }
        
        // Email validation
        if (input.type === 'email' && input.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
                showFieldError(input, 'Please enter a valid email address');
                isValid = false;
            }
        }
    });
    
    if (isValid) {
        submitForm(form);
    }
}

function showFieldError(input, message) {
    clearFieldError(input);
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    input.parentNode.appendChild(errorDiv);
    input.style.borderColor = '#e74c3c';
}

function clearFieldError(input) {
    const existingError = input.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    input.style.borderColor = '';
}

function submitForm(form) {
    const submitButton = form.querySelector('button[type="submit"]');
    if (!submitButton) return;
    
    const originalText = submitButton.textContent;
    
    submitButton.textContent = 'Submitting...';
    submitButton.disabled = true;
    submitButton.classList.add('loading');
    
    // Simulate form submission
    setTimeout(function() {
        showNotification('Form submitted successfully!', 'success');
        form.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        submitButton.classList.remove('loading');
    }, 2000);
}

// Utility Functions
function showNotification(message, type) {
    type = type || 'info';
    
    const notification = document.createElement('div');
    notification.className = 'notification notification-' + type;
    
    const content = document.createElement('div');
    content.className = 'notification-content';
    
    const icon = document.createElement('span');
    icon.className = 'notification-icon';
    icon.textContent = type === 'success' ? '✓' : type === 'error' ? '✗' : 'ℹ';
    
    const messageSpan = document.createElement('span');
    messageSpan.className = 'notification-message';
    messageSpan.textContent = message;
    
    const closeButton = document.createElement('button');
    closeButton.className = 'notification-close';
    closeButton.innerHTML = '&times;';
    
    content.appendChild(icon);
    content.appendChild(messageSpan);
    content.appendChild(closeButton);
    notification.appendChild(content);
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(function() {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove
    setTimeout(function() {
        removeNotification(notification);
    }, 5000);
    
    // Close button
    closeButton.addEventListener('click', function() {
        removeNotification(notification);
    });
}

function removeNotification(notification) {
    notification.style.transform = 'translateX(100%)';
    setTimeout(function() {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

function showStartupModal(startupName) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    
    const modalHeader = document.createElement('div');
    modalHeader.className = 'modal-header';
    
    const title = document.createElement('h2');
    title.textContent = startupName;
    
    const closeButton = document.createElement('button');
    closeButton.className = 'modal-close';
    closeButton.innerHTML = '&times;';
    
    modalHeader.appendChild(title);
    modalHeader.appendChild(closeButton);
    
    const modalBody = document.createElement('div');
    modalBody.className = 'modal-body';
    
    const description = document.createElement('p');
    description.textContent = 'Detailed information about ' + startupName + ' would be displayed here.';
    
    const actions = document.createElement('div');
    actions.className = 'modal-actions';
    
    const investButton = document.createElement('button');
    investButton.className = 'btn-primary';
    investButton.textContent = 'Invest Now';
    
    const watchlistButton = document.createElement('button');
    watchlistButton.className = 'btn-secondary';
    watchlistButton.textContent = 'Add to Watchlist';
    
    actions.appendChild(investButton);
    actions.appendChild(watchlistButton);
    
    modalBody.appendChild(description);
    modalBody.appendChild(actions);
    
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
    modal.appendChild(modalContent);
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Animate in
    setTimeout(function() {
        modal.style.opacity = '1';
        modalContent.style.transform = 'scale(1)';
    }, 100);
    
    // Close handlers
    closeButton.addEventListener('click', function() {
        closeModal(modal);
    });
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal(modal);
        }
    });
    
    // Escape key
    function escapeHandler(e) {
        if (e.key === 'Escape') {
            closeModal(modal);
            document.removeEventListener('keydown', escapeHandler);
        }
    }
    document.addEventListener('keydown', escapeHandler);
}

function showLoginModal() {
    showNotification('Login functionality would be implemented here', 'info');
}

function closeModal(modal) {
    modal.style.opacity = '0';
    const modalContent = modal.querySelector('.modal-content');
    if (modalContent) {
        modalContent.style.transform = 'scale(0.9)';
    }
    
    setTimeout(function() {
        if (modal.parentNode) {
            modal.parentNode.removeChild(modal);
        }
        document.body.style.overflow = '';
    }, 300);
}

// Error Handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
});

// Performance optimization - Lazy load images
function setupLazyLoading() {
    if (!('IntersectionObserver' in window)) return;
    
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(function(img) {
        imageObserver.observe(img);
    });
}

// Initialize lazy loading
setupLazyLoading();

// Export functions for external use
window.InvestureApp = {
    showNotification: showNotification,
    showStartupModal: showStartupModal
};