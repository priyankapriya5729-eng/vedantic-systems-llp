// ============================================
// SOCIAL MEDIA LINKS CONFIGURATION
// ============================================
// Update these URLs with your actual LinkedIn and Facebook profile/page URLs
const socialLinks = {
    linkedin: 'https://in.linkedin.com/', // LinkedIn India URL - Update with your company/profile URL
    facebook: 'https://www.facebook.com/' // Facebook URL - Update with your page/profile URL
};

// Initialize social media links
function initializeSocialLinks() {
    const linkedInLink = document.querySelector('a[aria-label="LinkedIn"]');
    const facebookLink = document.querySelector('a[aria-label="Facebook"]');
    
    // Update LinkedIn link if configuration exists
    if (linkedInLink && socialLinks.linkedin) {
        linkedInLink.href = socialLinks.linkedin;
        linkedInLink.target = '_blank';
        linkedInLink.rel = 'noopener noreferrer';
    }
    
    // Update Facebook link if configuration exists
    if (facebookLink && socialLinks.facebook) {
        facebookLink.href = socialLinks.facebook;
        facebookLink.target = '_blank';
        facebookLink.rel = 'noopener noreferrer';
    }
    
    // Prevent smooth scroll from interfering with social links
    document.querySelectorAll('.social-link').forEach(link => {
        link.addEventListener('click', function(e) {
            // Allow normal link behavior for external links
            if (this.href && !this.href.startsWith('#')) {
                // Link will open in new tab naturally with target="_blank"
                return true;
            }
        });
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Header scroll effect
const header = document.querySelector('.main-header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Active nav link highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.main-nav a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mainNav = document.querySelector('.main-nav');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    mainNav.classList.toggle('active');
});

// Form submission - Now handled by FormSubmit.co
// The form will automatically send email to the address specified in the form action

// Language selector with translation
const translations = {
    en: {
        // Hero Section
        heroTag: "Welcome to the Future",
        heroTitle: "Transforming Ideas Into <span class=\"highlight\">Reality</span>",
        heroDesc: "We deliver cutting-edge IT consulting, software implementation, and business automation solutions that drive growth, efficiency, and digital transformation for enterprises across India.",
        exploreServices: "Explore Services",
        scheduleCall: "Schedule a Call",
        projectsDelivered: "Projects Delivered",
        happyClients: "Happy Clients",
        supportAvailable: "Support Available",
        
        // Navigation
        navHome: "Home",
        navServices: "Services",
        navAbout: "About Us",
        navWhyUs: "Why Choose Us",
        navContact: "Contact",
        getFreeConsultation: "Get Free Consultation",
        
        // Services Section
        servicesTag: "Our Expertise",
        servicesTitle: "Comprehensive IT Solutions <br>Tailored for Your Success",
        servicesDesc: "From consulting to implementation, we provide end-to-end services that transform your business operations",
        
        // Why Us Section
        whyUsTag: "Why Vedantic Systems",
        whyUsTitle: "Built on Trust, Driven by Excellence",
        whyUsDesc: "As a registered Limited Liability Partnership, we bring transparency, accountability, and unwavering commitment to every project we undertake.",
        
        // About Section
        aboutTag: "About Us",
        aboutTitle: "Meet the Team Behind Vedantic Systems",
        aboutDesc: "A partnership built on shared vision, complementary skills, and unwavering dedication to client success",
        
        // Testimonials
        testimonialsTag: "Client Stories",
        testimonialsTitle: "Trusted by Businesses Across Industries",
        
        // CTA Section
        ctaTitle: "Ready to Transform Your Business?",
        ctaDesc: "Let's discuss how Vedantic Systems can help you achieve your technology goals. Schedule a free consultation today.",
        callUsNow: "Call Us Now",
        
        // Contact Section
        contactTag: "Get In Touch",
        contactTitle: "Let's Start a Conversation",
        contactDesc: "Have a project in mind? We'd love to hear about it. Fill out the form and our team will get back to you within 24 hours.",
        sendMessage: "Send Message",
        
        // Footer
        copyright: "© 2026 Vedantic Systems LLP. All Rights Reserved."
    },
    hi: {
        // Hero Section
        heroTag: "भविष्य में आपका स्वागत है",
        heroTitle: "विचारों को <span class=\"highlight\">वास्तविकता</span> में बदलना",
        heroDesc: "हम अत्याधुनिक आईटी कंसल्टिंग, सॉफ्टवेयर इम्प्लीमेंटेशन और बिजनेस ऑटोमेशन समाधान प्रदान करते हैं जो पूरे भारत में उद्यमों के लिए विकास, दक्षता और डिजिटल परिवर्तन को बढ़ावा देते हैं।",
        exploreServices: "सेवाएं देखें",
        scheduleCall: "कॉल शेड्यूल करें",
        projectsDelivered: "प्रोजेक्ट्स पूरे",
        happyClients: "खुश ग्राहक",
        supportAvailable: "सहायता उपलब्ध",
        
        // Navigation
        navHome: "होम",
        navServices: "सेवाएं",
        navAbout: "हमारे बारे में",
        navWhyUs: "हमें क्यों चुनें",
        navContact: "संपर्क करें",
        getFreeConsultation: "मुफ्त परामर्श प्राप्त करें",
        
        // Services Section
        servicesTag: "हमारी विशेषज्ञता",
        servicesTitle: "आपकी सफलता के लिए <br>व्यापक आईटी समाधान",
        servicesDesc: "कंसल्टिंग से लेकर इम्प्लीमेंटेशन तक, हम एंड-टू-एंड सेवाएं प्रदान करते हैं जो आपके व्यवसाय संचालन को बदल देती हैं",
        
        // Why Us Section
        whyUsTag: "वेदांतिक सिस्टम्स क्यों",
        whyUsTitle: "विश्वास पर निर्मित, उत्कृष्टता से प्रेरित",
        whyUsDesc: "एक पंजीकृत लिमिटेड लायबिलिटी पार्टनरशिप के रूप में, हम हर प्रोजेक्ट में पारदर्शिता, जवाबदेही और अटूट प्रतिबद्धता लाते हैं।",
        
        // About Section
        aboutTag: "हमारे बारे में",
        aboutTitle: "वेदांतिक सिस्टम्स की टीम से मिलें",
        aboutDesc: "साझा दृष्टि, पूरक कौशल और ग्राहक सफलता के प्रति अटूट समर्पण पर निर्मित साझेदारी",
        
        // Testimonials
        testimonialsTag: "ग्राहक कहानियां",
        testimonialsTitle: "उद्योगों में व्यवसायों द्वारा विश्वसनीय",
        
        // CTA Section
        ctaTitle: "अपने व्यवसाय को बदलने के लिए तैयार?",
        ctaDesc: "आइए चर्चा करें कि वेदांतिक सिस्टम्स आपके टेक्नोलॉजी लक्ष्यों को प्राप्त करने में कैसे मदद कर सकता है। आज ही मुफ्त परामर्श शेड्यूल करें।",
        callUsNow: "अभी कॉल करें",
        
        // Contact Section
        contactTag: "संपर्क में रहें",
        contactTitle: "बातचीत शुरू करें",
        contactDesc: "कोई प्रोजेक्ट है? हमें इसके बारे में सुनना अच्छा लगेगा। फॉर्म भरें और हमारी टीम 24 घंटे के भीतर आपसे संपर्क करेगी।",
        sendMessage: "संदेश भेजें",
        
        // Footer
        copyright: "© 2026 वेदांतिक सिस्टम्स एलएलपी। सर्वाधिकार सुरक्षित।"
    }
};

function switchLanguage(lang) {
    const t = translations[lang];
    
    // Update elements with data-translate attribute
    document.querySelectorAll('[data-translate]').forEach(el => {
        const key = el.getAttribute('data-translate');
        if (t[key]) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = t[key];
            } else {
                el.innerHTML = t[key];
            }
        }
    });
}

document.querySelectorAll('.lang-selector button').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.lang-selector button').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        const lang = this.getAttribute('data-lang');
        switchLanguage(lang);
    });
});

// Testimonials data
const testimonialsData = [
    {
        "rating": "★★★★★",
        "text": "Vedantic Systems transformed our entire IT infrastructure. Their team's expertise and dedication exceeded our expectations. Highly recommended!",
        "author": {
            "name": "Rajesh Gupta",
            "initials": "RG",
            "company": "Manufacturing Company, Ranchi"
        }
    },
    {
        "rating": "★★★★★",
        "text": "Complete inventory and billing system for our shop. Stock management, GST invoicing are now seamless. Business efficiency doubled!",
        "author": {
            "name": "Niranjan Kumar",
            "initials": "NK",
            "company": "RK Garment - Retail Store, Delhi"
        }
    },
    {
        "rating": "★★★★★",
        "text": "Transformed our coaching institute with management software. Enrollment, fees, scheduling - all effortless now. We focus on teaching!",
        "author": {
            "name": "Sanjay Kumar",
            "initials": "SK",
            "company": "Sanjay Chem Tutorials, Giridih"
        }
    },
    {
        "rating": "★★★★★",
        "text": "Professional team with deep technical knowledge. They delivered our e-commerce platform on time and within budget. The after-sales support is exceptional!",
        "author": {
            "name": "Priya Verma",
            "initials": "PV",
            "company": "Online Retail Business, Patna"
        }
    },
    {
        "rating": "★★★★★",
        "text": "The custom CRM solution they developed has revolutionized our customer management. Lead tracking and follow-ups are now automated. Great work!",
        "author": {
            "name": "Amit Jha",
            "initials": "AJ",
            "company": "Real Estate Agency, Bokaro"
        }
    },
    {
        "rating": "★★★★☆",
        "text": "Excellent service and support. They helped us migrate our entire data to cloud with zero downtime. Very reliable and trustworthy team.",
        "author": {
            "name": "Manoj Singh",
            "initials": "MS",
            "company": "Healthcare Clinic, Dhanbad"
        }
    }
];

let carouselInitialized = false;

function loadTestimonials() {
    if (!testimonialsData || testimonialsData.length === 0) {
        console.warn('Testimonials data is empty');
        return;
    }
    
    // Update Happy Clients count
    const happyClientsCount = document.getElementById('happyClientsCount');
    if (happyClientsCount) {
        const count = testimonialsData.length;
        // Check if counter animation should trigger
        const heroStats = document.querySelector('.hero-stats');
        if (heroStats && isElementInViewport(heroStats)) {
            // Element is already visible, animate counter
            happyClientsCount.textContent = '0+';
            animateCounter(happyClientsCount, count);
        } else {
            // Element not visible yet, just set the value
            happyClientsCount.textContent = count + '+';
        }
    }
    
    // Render testimonials
    renderTestimonials();
    
    // Wait for DOM to update and layout to complete before initializing carousel
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            // Observe testimonial cards for animations
            observeTestimonialCards();
            
            // Initialize carousel after testimonials are loaded
            if (!carouselInitialized) {
                initializeCarousel();
                carouselInitialized = true;
            }
        });
    });
}

// Helper function to check if element is in viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function renderTestimonials() {
    const track = document.getElementById('testimonialTrack');
    if (!track) {
        console.error('Testimonial track element not found');
        return;
    }
    
    if (!testimonialsData || testimonialsData.length === 0) {
        console.warn('No testimonials data to render');
        track.innerHTML = '<div class="testimonial-error" style="padding: 2rem; text-align: center; color: #666;">No testimonials available.</div>';
        return;
    }
    
    track.innerHTML = '';
    
    testimonialsData.forEach((testimonial, index) => {
        if (!testimonial || !testimonial.author) {
            console.warn(`Invalid testimonial at index ${index}:`, testimonial);
            return;
        }
        
        const card = document.createElement('div');
        card.className = 'testimonial-card';
        card.innerHTML = `
            <div class="testimonial-rating">${testimonial.rating || '★★★★★'}</div>
            <p>"${testimonial.text || ''}"</p>
            <div class="testimonial-author">
                <div class="author-avatar">${testimonial.author.initials || '??'}</div>
                <div class="author-info">
                    <strong>${testimonial.author.name || 'Unknown'}</strong>
                    <span>${testimonial.author.company || ''}</span>
                </div>
            </div>
        `;
        track.appendChild(card);
    });
    
    console.log(`Successfully rendered ${testimonialsData.length} testimonial cards`);
}

// Testimonial Carousel
function initializeCarousel() {
    const carousel = document.querySelector('.testimonial-carousel');
    if (!carousel) {
        console.warn('Carousel element not found');
        return;
    }
    
    const track = carousel.querySelector('.carousel-track');
    if (!track) {
        console.warn('Carousel track not found');
        return;
    }
    
    const cards = track.querySelectorAll('.testimonial-card');
    const btnLeft = carousel.querySelector('.carousel-btn-left');
    const btnRight = carousel.querySelector('.carousel-btn-right');
    const dotsContainer = document.querySelector('.carousel-dots');
    
    if (cards.length === 0) {
        console.warn('No testimonial cards found');
        return;
    }
    
    let currentIndex = 0;
    let cardsPerView = 3;
    let autoSlideInterval;
    
    // Calculate cards per view based on viewport width
    function updateCardsPerView() {
        const viewport = carousel.querySelector('.carousel-viewport');
        const viewportWidth = viewport.offsetWidth;
        const cardWidth = 280 + 24; // card width + gap
        cardsPerView = Math.max(1, Math.floor(viewportWidth / cardWidth));
    }
    
    // Create dots
    function createDots() {
        dotsContainer.innerHTML = '';
        const totalDots = Math.ceil(cards.length / cardsPerView);
        for (let i = 0; i < totalDots; i++) {
            const dot = document.createElement('button');
            dot.classList.add('carousel-dot');
            if (i === 0) dot.classList.add('active');
            dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
    }
    
    // Update dots
    function updateDots() {
        const dots = dotsContainer.querySelectorAll('.carousel-dot');
        const activeDotIndex = Math.floor(currentIndex / cardsPerView);
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === activeDotIndex);
        });
    }
    
    // Calculate card width including gap
    function getCardWidth() {
        return 280 + 24; // Fixed card width (280px) + gap (24px)
    }
    
    // Move carousel
    function moveCarousel() {
        const cardWidth = getCardWidth();
        track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        updateDots();
        updateButtons();
    }
    
    // Update button states
    function updateButtons() {
        const maxIndex = cards.length - cardsPerView;
        btnLeft.disabled = currentIndex <= 0;
        btnRight.disabled = currentIndex >= maxIndex;
    }
    
    // Go to specific slide
    function goToSlide(dotIndex) {
        currentIndex = dotIndex * cardsPerView;
        const maxIndex = cards.length - cardsPerView;
        if (currentIndex > maxIndex) currentIndex = maxIndex;
        moveCarousel();
    }
    
    // Next slide
    function nextSlide() {
        const maxIndex = cards.length - cardsPerView;
        if (currentIndex < maxIndex) {
            currentIndex++;
            moveCarousel();
        }
    }
    
    // Previous slide
    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
            moveCarousel();
        }
    }
    
    // Auto slide
    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            const maxIndex = cards.length - cardsPerView;
            if (currentIndex >= maxIndex) {
                currentIndex = 0;
            } else {
                currentIndex++;
            }
            moveCarousel();
        }, 5000); // Change slide every 5 seconds
    }
    
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }
    
    // Event listeners
    btnLeft.addEventListener('click', () => {
        prevSlide();
        stopAutoSlide();
        startAutoSlide();
    });
    
    btnRight.addEventListener('click', () => {
        nextSlide();
        stopAutoSlide();
        startAutoSlide();
    });
    
    // Pause on hover
    carousel.addEventListener('mouseenter', stopAutoSlide);
    carousel.addEventListener('mouseleave', startAutoSlide);
    
    // Touch/Swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoSlide();
    }, { passive: true });
    
    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
        startAutoSlide();
    }, { passive: true });
    
    // Handle resize
    window.addEventListener('resize', () => {
        updateCardsPerView();
        createDots();
        currentIndex = 0;
        moveCarousel();
    });
    
    // Initialize
    updateCardsPerView();
    createDots();
    updateButtons();
    moveCarousel(); // Set initial position
    startAutoSlide();
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe existing elements
document.querySelectorAll('.service-card, .partner-card, .trust-point').forEach(el => {
    observer.observe(el);
});

// Observe dynamically loaded testimonial cards after they're rendered
function observeTestimonialCards() {
    document.querySelectorAll('.testimonial-card').forEach(el => {
        observer.observe(el);
    });
}

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + '+';
        }
    }, 16);
}

// Trigger counter animation when hero is visible
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = document.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                if (text.includes('+')) {
                    const num = parseInt(text);
                    if (!isNaN(num) && num > 0) {
                        stat.textContent = '0+';
                        animateCounter(stat, num);
                    }
                }
            });
            heroObserver.disconnect();
        }
    });
}, { threshold: 0.5 });

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        loadTestimonials();
        initializeSocialLinks();
        
        // Observe hero stats
        const heroStats = document.querySelector('.hero-stats');
        if (heroStats) {
            heroObserver.observe(heroStats);
        }
    });
} else {
    // DOM is already ready
    loadTestimonials();
    initializeSocialLinks();
    
    // Observe hero stats
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        heroObserver.observe(heroStats);
    }
}
