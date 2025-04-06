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
    // Add contact form if it doesn't exist
    const contactContent = document.querySelector('.contact .contact-content');
    if (contactContent && !document.querySelector('.contact-form')) {
        const formHTML = `
            <div class="column right contact-form">
                <div class="text">Message me</div>
                <form id="contactForm">
                    <div class="fields">
                        <div class="field name">
                            <input type="text" name="name" placeholder="Name" required>
                        </div>
                        <div class="field email">
                            <input type="email" name="email" placeholder="Email" required>
                        </div>
                    </div>
                    <div class="field">
                        <input type="text" name="subject" placeholder="Subject" required>
                    </div>
                    <div class="field textarea">
                        <textarea name="message" cols="30" rows="10" placeholder="Message.." required></textarea>
                    </div>
                    <div class="button-area">
                        <button type="submit">Send message</button>
                    </div>
                    <div id="formMessage" class="form-message"></div>
                </form>
            </div>
        `;
        
        contactContent.insertAdjacentHTML('beforeend', formHTML);
        
        // Form submission handling
        const form = document.getElementById('contactForm');
        const formMessage = document.getElementById('formMessage');
        
        if (form) {
            form.addEventListener('submit', async function(e) {
                e.preventDefault();
                
                // Get form data
                const formData = new FormData(form);
                const data = Object.fromEntries(formData);
                
                // Show loading state
                const submitButton = form.querySelector('button[type="submit"]');
                const originalButtonText = submitButton.textContent;
                submitButton.textContent = 'Sending...';
                submitButton.disabled = true;
                
                try {
                    // Here you would typically send the data to your server
                    // For now, we'll simulate a successful submission
                    await new Promise(resolve => setTimeout(resolve, 1500));
                    
                    // Show success message
                    formMessage.textContent = 'Thank you for your message! I will get back to you soon.';
                    formMessage.className = 'form-message success';
                    form.reset();
                    
                    // Reset button after 3 seconds
                    setTimeout(() => {
                        submitButton.textContent = originalButtonText;
                        submitButton.disabled = false;
                        formMessage.textContent = '';
                        formMessage.className = 'form-message';
                    }, 3000);
                    
                } catch (error) {
                    // Show error message
                    formMessage.textContent = 'Sorry, there was an error sending your message. Please try again.';
                    formMessage.className = 'form-message error';
                    
                    // Reset button
                    submitButton.textContent = originalButtonText;
                    submitButton.disabled = false;
                }
            });
        }
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