// Main JavaScript for Mohamed El-Safi's Portfolio Website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initScrollAnimations();
    initBeforeAfterSlider();
    initBackToTop();
    initContactForm();
    initSkillBars();
});

// Navigation functionality
function initNavigation() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileNavClose = document.querySelector('.mobile-nav-close');
    const overlay = document.querySelector('.overlay');
    const header = document.querySelector('header');
    
    // Mobile menu toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileNav.classList.add('active');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (mobileNavClose) {
        mobileNavClose.addEventListener('click', function() {
            mobileNav.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    const navLinks = document.querySelectorAll('.mobile-nav .nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileNav.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    if (overlay) {
        overlay.addEventListener('click', function() {
            mobileNav.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Active nav link
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
}

// Scroll animations
function initScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const fadeInObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    fadeElements.forEach(element => {
        fadeInObserver.observe(element);
    });
}

// Before/After image slider
function initBeforeAfterSlider() {
    const sliders = document.querySelectorAll('.before-after-container');
    
    sliders.forEach(slider => {
        const beforeImage = slider.querySelector('.before-image');
        const sliderHandle = slider.querySelector('.slider-handle');
        const sliderButton = slider.querySelector('.slider-button');
        
        if (!beforeImage || !sliderHandle || !sliderButton) return;
        
        let isDragging = false;
        
        const moveSlider = function(e) {
            if (!isDragging) return;
            
            const sliderRect = slider.getBoundingClientRect();
            const x = e.type === 'touchmove' ? e.touches[0].clientX - sliderRect.left : e.clientX - sliderRect.left;
            
            const position = Math.max(0, Math.min(x / sliderRect.width, 1));
            const percentage = position * 100;
            
            beforeImage.style.width = `${percentage}%`;
            sliderHandle.style.left = `${percentage}%`;
        };
        
        // Mouse events
        sliderButton.addEventListener('mousedown', () => {
            isDragging = true;
        });
        
        window.addEventListener('mouseup', () => {
            isDragging = false;
        });
        
        slider.addEventListener('mousemove', moveSlider);
        
        // Touch events
        sliderButton.addEventListener('touchstart', () => {
            isDragging = true;
        }, { passive: true });
        
        window.addEventListener('touchend', () => {
            isDragging = false;
        });
        
        slider.addEventListener('touchmove', moveSlider, { passive: true });
    });
}

// Back to top button
function initBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (!backToTopBtn) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Contact form validation
function initContactForm() {
    const contactForm = document.querySelector('.contact-form form');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        const nameInput = contactForm.querySelector('input[name="name"]');
        const emailInput = contactForm.querySelector('input[name="email"]');
        const messageInput = contactForm.querySelector('textarea[name="message"]');
        
        // Simple validation
        if (nameInput && nameInput.value.trim() === '') {
            isValid = false;
            nameInput.classList.add('error');
        } else if (nameInput) {
            nameInput.classList.remove('error');
        }
        
        if (emailInput) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value.trim())) {
                isValid = false;
                emailInput.classList.add('error');
            } else {
                emailInput.classList.remove('error');
            }
        }
        
        if (messageInput && messageInput.value.trim() === '') {
            isValid = false;
            messageInput.classList.add('error');
        } else if (messageInput) {
            messageInput.classList.remove('error');
        }
        
        if (isValid) {
            // In a real implementation, this would send the form data to a server
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        }
    });
}

// Skill bars animation
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar');
    
    if (skillBars.length === 0) return;
    
    const skillBarObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const percentage = skillBar.getAttribute('data-percentage');
                
                skillBar.querySelector('.skill-progress').style.width = percentage;
                
                observer.unobserve(skillBar);
            }
        });
    }, {
        threshold: 0.5
    });
    
    skillBars.forEach(bar => {
        skillBarObserver.observe(bar);
    });
}
