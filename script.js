// ========================================
// MARIELLA MONTESSORI - MODERN MINIMALIST
// Option 1 JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', function() {

    // ========================================
    // MOBILE NAVIGATION
    // ========================================

    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target) || navToggle.contains(event.target);
        if (!isClickInsideNav && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });


    // ========================================
    // SMOOTH SCROLLING & ACTIVE NAV LINKS
    // ========================================

    // Smooth scroll to sections
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Update active nav link on scroll
    const sections = document.querySelectorAll('.section');
    const navbarHeight = document.querySelector('.navbar').offsetHeight;

    function updateActiveNavLink() {
        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbarHeight - 100;
            const sectionHeight = section.offsetHeight;

            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentSection) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink);


    // ========================================
    // NAVBAR BACKGROUND ON SCROLL
    // ========================================

    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
        }
    });


    // ========================================
    // PROGRAMS TAB FUNCTIONALITY
    // ========================================

    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');

            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });


    // ========================================
    // CALENDAR TABS
    // ========================================

    const calendarTabButtons = document.querySelectorAll('.calendar-tab-button');
    const calendarTabContents = document.querySelectorAll('.calendar-tab-content');

    calendarTabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetCalendar = this.getAttribute('data-calendar');

            // Remove active class from all buttons and contents
            calendarTabButtons.forEach(btn => btn.classList.remove('active'));
            calendarTabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            document.getElementById(targetCalendar + '-calendar').classList.add('active');
        });
    });


    // ========================================
    // PROGRAM READ MORE BUTTONS
    // ========================================

    const readMoreButtons = document.querySelectorAll('.read-more-btn');

    readMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const expandable = this.previousElementSibling;

            if (expandable && expandable.classList.contains('program-expandable')) {
                expandable.classList.toggle('active');
                this.classList.toggle('active');
                this.textContent = expandable.classList.contains('active') ? 'Read Less' : 'Read More';
            }
        });
    });


    // ========================================
    // MOBILE DROPDOWN TOGGLE
    // ========================================

    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            // Only prevent default on mobile
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const parent = this.parentElement;
                parent.classList.toggle('active');
            }
        });
    });


    // ========================================
    // DROPDOWN LINKS TO PROGRAM TABS
    // ========================================

    const dropdownLinks = document.querySelectorAll('.dropdown-link');

    dropdownLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetTab = this.getAttribute('href').replace('#', '');

            // Scroll to programs section
            const programsSection = document.getElementById('programs');
            if (programsSection) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = programsSection.offsetTop - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }

            // Activate the correct tab
            const tabButton = document.querySelector(`.tab-button[data-tab="${targetTab}"]`);
            if (tabButton) {
                // Remove active from all tabs
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));

                // Activate clicked tab
                tabButton.classList.add('active');
                document.getElementById(targetTab).classList.add('active');
            }

            // Close mobile menu if open
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });


    // ========================================
    // BACK TO TOP BUTTON
    // ========================================

    const backToTopButton = document.getElementById('backToTop');

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 500) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });

    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });


    // ========================================
    // SCROLL ANIMATIONS
    // ========================================

    // Intersection Observer for fade-in animations
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

    // Observe all fade-in elements
    const fadeElements = document.querySelectorAll('.fade-in, .fade-in-delay, .fade-in-delay-2');
    fadeElements.forEach(element => {
        observer.observe(element);
    });


    // ========================================
    // NEWSLETTER FORM (Simple Placeholder)
    // ========================================

    const newsletterForm = document.querySelector('.simple-newsletter-form');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;

            // This is a placeholder - replace with actual form submission
            alert('Thank you for subscribing! (This is a placeholder - integrate with your actual newsletter service)');
            emailInput.value = '';

            // TODO: Integrate with actual Google Form or newsletter service
            // Example: Submit to Google Form endpoint or Mailchimp API
        });
    }


    // ========================================
    // BRANCH CARD HOVER EFFECTS
    // ========================================

    const branchCards = document.querySelectorAll('.branch-card');

    branchCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.branch-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
            }
        });

        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.branch-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });


    // Program card hover effects are now handled via CSS


    // Philosophy card hover effects are now handled via CSS


    // ========================================
    // ENROLLMENT STEPS ANIMATION
    // ========================================

    const steps = document.querySelectorAll('.step');

    const stepObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 100);
            }
        });
    }, { threshold: 0.5 });

    steps.forEach(step => {
        step.style.opacity = '0';
        step.style.transform = 'translateX(-20px)';
        step.style.transition = 'all 0.5s ease';
        stepObserver.observe(step);
    });


    // ========================================
    // PHOTO GALLERY PLACEHOLDERS
    // ========================================

    const photoPlaceholders = document.querySelectorAll('.photo-placeholder');

    photoPlaceholders.forEach(placeholder => {
        placeholder.addEventListener('click', function() {
            // Placeholder for future lightbox functionality
            console.log('Photo clicked - implement lightbox here');
            // TODO: Integrate with a lightbox library like GLightbox or PhotoSwipe
        });
    });


    // ========================================
    // UTILITY FUNCTIONS
    // ========================================

    // Debounce function for performance
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Apply debounce to scroll events if needed
    const debouncedScroll = debounce(updateActiveNavLink, 100);
    window.addEventListener('scroll', debouncedScroll);


    // ========================================
    // ACCESSIBILITY ENHANCEMENTS
    // ========================================

    // Keyboard navigation for tabs
    tabButtons.forEach((button, index) => {
        button.addEventListener('keydown', function(e) {
            let newIndex;

            if (e.key === 'ArrowRight') {
                e.preventDefault();
                newIndex = (index + 1) % tabButtons.length;
                tabButtons[newIndex].focus();
                tabButtons[newIndex].click();
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                newIndex = (index - 1 + tabButtons.length) % tabButtons.length;
                tabButtons[newIndex].focus();
                tabButtons[newIndex].click();
            }
        });
    });

    // Announce page changes to screen readers
    function announcePageChange(sectionName) {
        const announcement = document.createElement('div');
        announcement.setAttribute('role', 'status');
        announcement.setAttribute('aria-live', 'polite');
        announcement.classList.add('sr-only');
        announcement.textContent = `Navigated to ${sectionName} section`;
        document.body.appendChild(announcement);

        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }


    // ========================================
    // PRELOAD IMPROVEMENTS
    // ========================================

    // Lazy load images when they're added
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
    }


    // ========================================
    // QUOTES SLIDESHOW
    // ========================================

    const quoteCards = document.querySelectorAll('.quote-card');
    const quotePrev = document.querySelector('.quote-prev');
    const quoteNext = document.querySelector('.quote-next');
    const quoteIndicatorsContainer = document.querySelector('.quote-indicators');

    let currentQuoteIndex = 0;
    let quoteInterval;

    // Create indicator dots
    if (quoteIndicatorsContainer && quoteCards.length > 0) {
        quoteCards.forEach((_, index) => {
            const indicator = document.createElement('div');
            indicator.classList.add('quote-indicator');
            if (index === 0) indicator.classList.add('active');
            indicator.addEventListener('click', () => showQuote(index));
            quoteIndicatorsContainer.appendChild(indicator);
        });
    }

    function showQuote(index) {
        // Remove active class from all cards and indicators
        quoteCards.forEach(card => card.classList.remove('active'));
        const indicators = document.querySelectorAll('.quote-indicator');
        indicators.forEach(ind => ind.classList.remove('active'));

        // Add active class to current card and indicator
        if (quoteCards[index]) {
            quoteCards[index].classList.add('active');
            if (indicators[index]) {
                indicators[index].classList.add('active');
            }
        }

        currentQuoteIndex = index;
    }

    function nextQuote() {
        currentQuoteIndex = (currentQuoteIndex + 1) % quoteCards.length;
        showQuote(currentQuoteIndex);
    }

    function prevQuote() {
        currentQuoteIndex = (currentQuoteIndex - 1 + quoteCards.length) % quoteCards.length;
        showQuote(currentQuoteIndex);
    }

    // Navigation button event listeners
    if (quoteNext) {
        quoteNext.addEventListener('click', () => {
            nextQuote();
            resetQuoteInterval();
        });
    }

    if (quotePrev) {
        quotePrev.addEventListener('click', () => {
            prevQuote();
            resetQuoteInterval();
        });
    }

    // Auto-advance quotes every 6 seconds
    function startQuoteInterval() {
        quoteInterval = setInterval(nextQuote, 6000);
    }

    function resetQuoteInterval() {
        clearInterval(quoteInterval);
        startQuoteInterval();
    }

    // Start auto-advance if there are quotes
    if (quoteCards.length > 1) {
        startQuoteInterval();
    }

    // Pause on hover
    const quotesContainer = document.querySelector('.quotes-container');
    if (quotesContainer) {
        quotesContainer.addEventListener('mouseenter', () => {
            clearInterval(quoteInterval);
        });

        quotesContainer.addEventListener('mouseleave', () => {
            startQuoteInterval();
        });
    }


    // ========================================
    // HERO SLIDESHOW
    // ========================================

    const heroSlides = document.querySelectorAll('.hero-slide');
    let currentHeroIndex = 0;
    let heroInterval;

    function showHeroSlide(index) {
        heroSlides.forEach(slide => slide.classList.remove('active'));
        if (heroSlides[index]) {
            heroSlides[index].classList.add('active');
        }
        currentHeroIndex = index;
    }

    function nextHeroSlide() {
        currentHeroIndex = (currentHeroIndex + 1) % heroSlides.length;
        showHeroSlide(currentHeroIndex);
    }

    if (heroSlides.length > 1) {
        heroInterval = setInterval(nextHeroSlide, 4000);

        // Pause on hover
        const heroSlideshow = document.querySelector('.hero-slideshow');
        if (heroSlideshow) {
            heroSlideshow.addEventListener('mouseenter', () => clearInterval(heroInterval));
            heroSlideshow.addEventListener('mouseleave', () => {
                heroInterval = setInterval(nextHeroSlide, 4000);
            });
        }
    }


    // ========================================
    // CONSOLE MESSAGE
    // ========================================

    console.log('%c Mariella Montessori ',
                'background: #017067; color: #ffffff; font-size: 16px; padding: 10px;');
    console.log('%c A Creative Education Community ',
                'background: #774e8b; color: #ffffff; font-size: 14px; padding: 8px;');

});


// ========================================
// EXTERNAL INTEGRATIONS (Placeholder functions)
// ========================================

/**
 * Stripe Payment Integration
 * Replace this with actual Stripe Elements integration
 */
function initializeStripePayment() {
    // TODO: Add Stripe Elements
    // Example:
    // const stripe = Stripe('your_publishable_key');
    // const elements = stripe.elements();
    // const cardElement = elements.create('card');
    // cardElement.mount('#card-element');
}

/**
 * Google Calendar Integration
 * Replace placeholder with actual Google Calendar embed
 */
function loadGoogleCalendar() {
    // TODO: Add Google Calendar embed code
    // The calendar should be embedded in the .calendar-placeholder div
}

/**
 * Newsletter Form Integration
 * Connect to existing Google Form
 */
function connectNewsletterForm() {
    // TODO: Embed existing Google Form
    // Replace the placeholder form with actual Google Form embed
    // Ensure it feeds to the existing Google Sheet
}

/**
 * Social Media Feed Integration
 * Optional: Add Instagram feed to community page
 */
function loadSocialMediaFeed() {
    // TODO: Consider adding Instagram feed widget
    // Example using Instagram Basic Display API or third-party service
}


// ========================================
// ANALYTICS TRACKING (When ready)
// ========================================

/**
 * Google Analytics Event Tracking
 * Uncomment when GA is set up
 */
function trackEvent(category, action, label) {
    // if (typeof gtag !== 'undefined') {
    //     gtag('event', action, {
    //         'event_category': category,
    //         'event_label': label
    //     });
    // }
}

// Track button clicks
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn')) {
        const buttonText = e.target.textContent.trim();
        // trackEvent('Button', 'Click', buttonText);
    }
});


// ========================================
// PERFORMANCE MONITORING
// ========================================

// Log page load time
window.addEventListener('load', function() {
    const loadTime = window.performance.timing.domContentLoadedEventEnd -
                     window.performance.timing.navigationStart;
    console.log(`Page loaded in ${loadTime}ms`);
});