// Portfolio Website JavaScript
// Author: Kunwar Abhay Singh

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavbar();
    initScrollAnimations();
    initSkillBars();
    initSkillBarHover();
    initProjectCards();
    initContactForm();
    initContactAnimations();
    initAboutAnimations();
    initFooterAnimations();

    initTypingEffect();
    initAOS();
    initFilterBtns();
    initFormMessage();
    initSkillBarsAnimation();
    initArrowBtn();
    initObserver();
    initProjectCardHover();
    initLoadedAnimation();
    initFormInputAnimations();
    initParallaxEffect();
    initEmailJS();
});

/**
 * Initializes the navbar functionality including sticky behavior,
 * mobile menu toggle, and smooth scrolling for navigation links.
 */
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const menuBtn = document.querySelector('.menu-btn');
    const menu = document.querySelector('.navbar .menu');
    
    // Sticky navbar on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 20) {
            navbar.classList.add('sticky');
        } else {
            navbar.classList.remove('sticky');
        }
        
        // Show/hide back to top button
        const arrowBtn = document.querySelector('.arrow-btn');
        if (window.scrollY > 500) {
            arrowBtn.classList.add('show');
        } else {
            arrowBtn.classList.remove('show');
        }
    });
    
    // Mobile menu toggle
    menuBtn.addEventListener('click', function() {
        menu.classList.toggle('active');
        menuBtn.querySelector('i').classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!menu.contains(e.target) && !menuBtn.contains(e.target) && menu.classList.contains('active')) {
            menu.classList.remove('active');
            menuBtn.querySelector('i').classList.remove('active');
        }
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('.navbar .menu a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            // Close mobile menu if open
            if (menu.classList.contains('active')) {
                menu.classList.remove('active');
                menuBtn.querySelector('i').classList.remove('active');
            }
            
            // Smooth scroll to target
            window.scrollTo({
                top: targetSection.offsetTop - 70,
                behavior: 'smooth'
            });
        });
    });
}

/**
 * Sets up scroll animations for sections and elements with the fade-in class
 * using the Intersection Observer API.
 */
function initScrollAnimations() {
    const sections = document.querySelectorAll('section');
    const fadeElements = document.querySelectorAll('.fade-in');
    
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Observe all sections and fade elements
    sections.forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });
    
    fadeElements.forEach(element => {
        observer.observe(element);
    });
}

/**
 * Initializes animated skill bars that fill when scrolled into view
 * using the Intersection Observer API.
 */
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skills .skills-content .right .line');
    
    // Intersection Observer for skill bars
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation class with delay for each bar
                setTimeout(() => {
                entry.target.classList.add('animate');
                }, 200);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3
    });
    
    // Observe all skill bars
    skillBars.forEach((bar, index) => {
        observer.observe(bar);
    });
}

/**
 * Adds hover animations to skill bars
 */
function initSkillBarHover() {
    const skillBars = document.querySelectorAll('.skills .skills-content .right .bars');
    
    skillBars.forEach(bar => {
        bar.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        bar.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

/**
 * Adds interactive hover and click effects to project cards.
 */
function initProjectCards() {
    const projectCards = document.querySelectorAll('.work .work-content .card');
    
    projectCards.forEach(card => {
        // Add hover effect
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
        
        // Add click effect for project links
        const projectLinks = card.querySelectorAll('.project-links a');
        projectLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.stopPropagation();
            });
        });
    });
}

/**
 * Creates and initializes the contact form with validation and submission handling.
 * Displays success or error messages after form submission.
 */
function initContactForm() {
    const form = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (form) {
        // Add input focus animations
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.style.transform = 'scale(1.02)';
                this.parentElement.style.transition = 'transform 0.3s ease';
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.style.transform = 'scale(1)';
            });
        });

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Show loading state
            const submitButton = form.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            formMessage.textContent = '';
            formMessage.className = 'form-message';
            
            // Add loading animation to button
            submitButton.style.background = 'linear-gradient(135deg, var(--accent-color), var(--secondary-color))';
            
            try {
                const formData = new FormData(form);
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    formMessage.textContent = 'Message sent successfully! I will get back to you soon.';
                    formMessage.className = 'form-message success';
                    form.reset();
                    
                    // Add success animation
                    submitButton.style.background = 'linear-gradient(135deg, #00b894, #00a085)';
                    setTimeout(() => {
                        submitButton.style.background = 'linear-gradient(135deg, var(--secondary-color), var(--accent-color))';
                    }, 2000);
                } else {
                    throw new Error('Failed to send message');
                }
            } catch (error) {
                formMessage.textContent = 'Failed to send message. Please try again.';
                formMessage.className = 'form-message error';
                
                // Add error animation
                submitButton.style.background = 'linear-gradient(135deg, #ff4757, #ff3742)';
                setTimeout(() => {
                    submitButton.style.background = 'linear-gradient(135deg, var(--secondary-color), var(--accent-color))';
                }, 2000);
            } finally {
                // Reset button state
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
                
                // Clear message after 5 seconds
                setTimeout(() => {
                    formMessage.textContent = '';
                    formMessage.className = 'form-message';
                }, 5000);
            }
        });
    }
}

/**
 * Adds hover animations to contact info rows
 */
function initContactAnimations() {
    const contactRows = document.querySelectorAll('.contact .contact-content .row');
    
    contactRows.forEach((row, index) => {
        // Add staggered animation on page load
        setTimeout(() => {
            row.style.opacity = '0';
            row.style.transform = 'translateX(-20px)';
            row.style.transition = 'all 0.5s ease';
            
            setTimeout(() => {
                row.style.opacity = '1';
                row.style.transform = 'translateX(0)';
            }, 100);
        }, index * 200);
    });
}

/**
 * Adds animations to footer elements
 */
function initFooterAnimations() {
    const footerElements = document.querySelectorAll('footer h1, footer h2, footer .social-icon, footer p');
    
    // Add intersection observer for footer animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3
    });
    
    footerElements.forEach(element => {
        element.style.animationPlayState = 'paused';
        observer.observe(element);
    });
    
    // Add hover effects to social icons
    const socialItems = document.querySelectorAll('footer .social-item');
    socialItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
        });
    });
}

/**
 * Adds animations to about section elements
 */
function initAboutAnimations() {
    const aboutImage = document.querySelector('.about .about-content .left img');
    const aboutText = document.querySelector('.about .about-content .right');
    const aboutButton = document.querySelector('.about .about-content .right a');
    
    // Add intersection observer for about section animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target === aboutImage) {
                    entry.target.style.animation = 'slideInLeft 1s ease forwards';
                } else if (entry.target === aboutText) {
                    entry.target.style.animation = 'slideInRight 1s ease forwards';
                }
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3
    });
    
    if (aboutImage) {
        aboutImage.style.opacity = '0';
        aboutImage.style.transform = 'translateX(-50px)';
        observer.observe(aboutImage);
    }
    
    if (aboutText) {
        aboutText.style.opacity = '0';
        aboutText.style.transform = 'translateX(50px)';
        observer.observe(aboutText);
    }
    
    // Add button animation after text appears
    if (aboutButton) {
        setTimeout(() => {
            aboutButton.style.animation = 'fadeInUp 0.8s ease forwards';
        }, 1000);
    }
}

// Add CSS animations for about section
const aboutAnimations = `
@keyframes slideInLeft {
    from {
        opacity: 0;
        transform: translateX(-50px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes slideInRight {
    from {
        opacity: 0;
        transform: translateX(50px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}
`;

// Inject CSS animations
const style = document.createElement('style');
style.textContent = aboutAnimations;
document.head.appendChild(style);



// Name display is handled directly in HTML - no typing effect needed

// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Initialize Typed.js for typing effect
const typed = new Typed('.typing', {
    strings: ['Software Engineer'],
    typeSpeed: 100,
    backSpeed: 60,
    loop: false
});

// DOM Elements
const navbar = document.querySelector('.navbar');
const menuBtn = document.querySelector('.menu-btn');
const menu = document.querySelector('.menu');

const arrowBtn = document.querySelector('.arrow-btn');
const contactForm = document.getElementById('contactForm');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.card');

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
        navbar.classList.add('sticky');
        arrowBtn.classList.add('active');
    } else {
        navbar.classList.remove('sticky');
        arrowBtn.classList.remove('active');
    }
});

// Mobile Menu Toggle
menuBtn.addEventListener('click', () => {
    menu.classList.toggle('active');
    menuBtn.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && !menuBtn.contains(e.target)) {
        menu.classList.remove('active');
        menuBtn.classList.remove('active');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu after clicking a link
            menu.classList.remove('active');
            menuBtn.classList.remove('active');
        }
    });
});

// Theme Toggle
themeToggle.addEventListener('click', () => {
    document.body.dataset.theme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
    themeToggle.querySelector('i').classList.toggle('fa-moon-o');
    themeToggle.querySelector('i').classList.toggle('fa-sun-o');
    localStorage.setItem('theme', document.body.dataset.theme);
});

// Load saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.body.dataset.theme = savedTheme;
    themeToggle.querySelector('i').classList.toggle('fa-moon-o', savedTheme === 'light');
    themeToggle.querySelector('i').classList.toggle('fa-sun-o', savedTheme === 'dark');
}

// Project Filtering
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filter = btn.dataset.filter;
        
        projectCards.forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 200);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 200);
            }
        });
    });
});

// Skill Bars Animation
const skillBars = document.querySelectorAll('.line');
const animateSkillBars = () => {
    skillBars.forEach(bar => {
        const barTop = bar.getBoundingClientRect().top;
        const triggerBottom = window.innerHeight * 0.8;
        
        if (barTop < triggerBottom) {
            bar.style.width = bar.dataset.percent;
        }
    });
};

window.addEventListener('scroll', animateSkillBars);
window.addEventListener('load', animateSkillBars);

// Back to Top Button
arrowBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
        }
    });
}, observerOptions);

document.querySelectorAll('[data-aos]').forEach(element => {
    observer.observe(element);
});

// Add hover effect to project cards
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Handle form input animations
const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
formInputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
        if (!input.value) {
            input.parentElement.classList.remove('focused');
        }
    });
});

// Add parallax effect to home section
window.addEventListener('scroll', () => {
    const homeSection = document.querySelector('.home');
    const scrollPosition = window.scrollY;
    
    if (homeSection) {
        homeSection.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
    }
});

// Initialize EmailJS
(function() {
    emailjs.init("YOUR_PUBLIC_KEY"); // Add your EmailJS public key here
})(); 