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
    // PROGRAM VTABS (desktop) + CAROUSEL (mobile)
    // ========================================

    const MOBILE_BP = 768;

    document.querySelectorAll('.program-vtabs').forEach(vtabs => {
        const buttons = vtabs.querySelectorAll('.vtab-btn');
        const panelsEl = vtabs.querySelector('.vtab-panels');
        const panels = vtabs.querySelectorAll('.vtab-panel');
        const total = panels.length;
        let current = 0;
        let isMobile = window.innerWidth <= MOBILE_BP;

        // --- Desktop: vertical tab click ---
        function activateTab(index) {
            current = index;
            buttons.forEach(b => b.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));
            buttons[index].classList.add('active');
            panels[index].classList.add('active');
        }

        buttons.forEach((btn, i) => {
            btn.addEventListener('click', () => activateTab(i));
        });

        // Desktop keyboard nav
        vtabs.addEventListener('keydown', e => {
            if (isMobile) return;
            const focused = document.activeElement;
            const idx = Array.from(buttons).indexOf(focused);
            if (idx === -1) return;
            if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
                e.preventDefault();
                const next = (idx + 1) % total;
                buttons[next].focus();
                activateTab(next);
            } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                e.preventDefault();
                const prev = (idx - 1 + total) % total;
                buttons[prev].focus();
                activateTab(prev);
            }
        });

        // --- Mobile: carousel controls ---
        // Create nav arrows
        const prevBtn = document.createElement('button');
        prevBtn.className = 'mobile-carousel-nav mobile-carousel-prev';
        prevBtn.setAttribute('aria-label', 'Previous class');
        prevBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>';

        const nextBtn = document.createElement('button');
        nextBtn.className = 'mobile-carousel-nav mobile-carousel-next';
        nextBtn.setAttribute('aria-label', 'Next class');
        nextBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>';

        // Create footer with dots + counter
        const footer = document.createElement('div');
        footer.className = 'mobile-carousel-footer';
        const dotsEl = document.createElement('div');
        dotsEl.className = 'mobile-carousel-dots';
        const counterEl = document.createElement('div');
        counterEl.className = 'mobile-carousel-counter';
        footer.appendChild(dotsEl);
        footer.appendChild(counterEl);

        // Build dots
        for (let i = 0; i < total; i++) {
            const dot = document.createElement('button');
            dot.className = 'mobile-carousel-dot' + (i === 0 ? ' active' : '');
            dot.setAttribute('aria-label', 'Go to class ' + (i + 1));
            dot.addEventListener('click', () => goToSlide(i));
            dotsEl.appendChild(dot);
        }

        // Inject into DOM
        vtabs.insertBefore(prevBtn, panelsEl);
        vtabs.insertBefore(nextBtn, panelsEl.nextSibling);
        vtabs.appendChild(footer);

        // Create carousel track wrapper inside panels
        const track = document.createElement('div');
        track.className = 'carousel-track';
        while (panelsEl.firstChild) {
            track.appendChild(panelsEl.firstChild);
        }
        panelsEl.appendChild(track);

        function sizeCarousel() {
            if (!isMobile) return;
            // Calculate available width: viewport minus vtabs padding (40px each side)
            var w = window.innerWidth - 80;
            panelsEl.style.width = w + 'px';
            panels.forEach(function(p) { p.style.width = w + 'px'; });
        }

        function goToSlide(index) {
            current = ((index % total) + total) % total;
            track.style.transform = 'translateX(-' + (current * 100) + '%)';
            dotsEl.querySelectorAll('.mobile-carousel-dot').forEach((d, i) => {
                d.classList.toggle('active', i === current);
            });
            counterEl.textContent = (current + 1) + ' of ' + total;
        }

        prevBtn.addEventListener('click', () => goToSlide(current - 1));
        nextBtn.addEventListener('click', () => goToSlide(current + 1));

        // Touch swipe
        let startX = 0, dragging = false;
        vtabs.addEventListener('touchstart', e => { startX = e.touches[0].clientX; dragging = true; }, { passive: true });
        vtabs.addEventListener('touchend', e => {
            if (!dragging || !isMobile) return;
            dragging = false;
            const diff = startX - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 40) goToSlide(diff > 0 ? current + 1 : current - 1);
        }, { passive: true });

        // --- Mode switching on resize ---
        function enterMobileMode() {
            panelsEl.classList.add('carousel-mode');
            sizeCarousel();
            goToSlide(current);
        }

        function enterDesktopMode() {
            panelsEl.classList.remove('carousel-mode');
            track.style.transform = '';
            panelsEl.style.width = '';
            panels.forEach(p => { p.style.width = ''; p.classList.remove('active'); });
            panels[current].classList.add('active');
            buttons.forEach(b => b.classList.remove('active'));
            buttons[current].classList.add('active');
        }

        // Init
        if (isMobile) enterMobileMode();

        window.addEventListener('resize', () => {
            const nowMobile = window.innerWidth <= MOBILE_BP;
            if (nowMobile !== isMobile) {
                isMobile = nowMobile;
                if (isMobile) enterMobileMode();
                else enterDesktopMode();
            } else if (isMobile) {
                sizeCarousel();
            }
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
    // DROPDOWN LINKS TO PROGRAM SECTIONS
    // ========================================

    const dropdownLinks = document.querySelectorAll('.dropdown-link');

    dropdownLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').replace('#', '');

            // Scroll directly to the program branch section
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
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