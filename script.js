// Portfolio Website JavaScript
// Author: Kunwar Abhay Singh

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavbar();
    initScrollAnimations();
    initSkillBars();
    initProjectCards();
    initContactForm();
    initThemeToggle();
    initTypingEffect();
    initAOS();
    initTyped();
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
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    // Observe all skill bars
    skillBars.forEach(bar => {
        observer.observe(bar);
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
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Show loading state
            const submitButton = form.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            formMessage.textContent = '';
            formMessage.className = 'form-message';
            
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
                } else {
                    throw new Error('Failed to send message');
                }
            } catch (error) {
                formMessage.textContent = 'Failed to send message. Please try again.';
                formMessage.className = 'form-message error';
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
 * Implements theme toggle functionality, allowing users to switch between
 * light and dark themes. Saves the user's preference in localStorage.
 */
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    // Theme toggle click handler
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

/**
 * Updates the theme toggle icon based on the current theme.
 * @param {string} theme - The current theme ('light' or 'dark')
 */
function updateThemeIcon(theme) {
    const themeIcon = document.querySelector('.theme-toggle i');
    if (theme === 'dark') {
        themeIcon.classList.remove('fa-moon-o');
        themeIcon.classList.add('fa-sun-o');
    } else {
        themeIcon.classList.remove('fa-sun-o');
        themeIcon.classList.add('fa-moon-o');
    }
}

/**
 * Creates a typing effect for the home section text,
 * simulating a typewriter typing out the text character by character.
 */
function initTypingEffect() {
    const textElement = document.querySelector('.home .home-content .text-2');
    if (textElement) {
        const text = textElement.textContent;
        textElement.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                textElement.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        typeWriter();
    }
}

// Initialize typing effect when the page loads
window.addEventListener('load', initTypingEffect);

// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Initialize Typed.js for typing effect
const typed = new Typed('.typing', {
    strings: ['Data Scientist', 'Python Developer', 'Web Developer', 'Machine Learning Engineer'],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true
});

// DOM Elements
const navbar = document.querySelector('.navbar');
const menuBtn = document.querySelector('.menu-btn');
const menu = document.querySelector('.menu');
const themeToggle = document.querySelector('.theme-toggle');
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