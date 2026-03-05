// Wait for DOM to be fully loaded before initializing everything
document.addEventListener('DOMContentLoaded', function() {

// ============================================
// NAVIGATION FUNCTIONALITY
// ============================================

const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scroll for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// ACTIVE NAV LINK TRACKING
// ============================================

let activeSection = null;

const sectionObserver = new IntersectionObserver((entries) => {
    let mostVisibleSection = null;
    let maxVisibility = 0;
    
    entries.forEach(entry => {
        // Calculate how much of the section is visible
        const visibleHeight = Math.min(entry.boundingClientRect.bottom, window.innerHeight) - 
                              Math.max(entry.boundingClientRect.top, 0);
        const sectionHeight = entry.boundingClientRect.height;
        const visibilityRatio = visibleHeight / sectionHeight;
        
        // Track the most visible section
        if (visibilityRatio > maxVisibility) {
            maxVisibility = visibilityRatio;
            mostVisibleSection = entry;
        }
    });
    
    // Only update if the active section changed (prevents unnecessary updates)
    if (mostVisibleSection && mostVisibleSection.target.id !== activeSection) {
        activeSection = mostVisibleSection.target.id;
        
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        const activeLink = document.querySelector(`.nav-link[href="#${activeSection}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }
}, {
    threshold: [0, 0.1, 0.25, 0.5, 0.75],
    rootMargin: '-60px 0px -40% 0px'
});

// Observe all section elements
const sections = document.querySelectorAll('section[id]');
sections.forEach(section => {
    sectionObserver.observe(section);
});

// ============================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all animated elements
const animatedElements = document.querySelectorAll('.skill-item, .project-card, .timeline-item, .stat-item');
animatedElements.forEach(el => {
    observer.observe(el);
});

// ============================================
// SKILL BARS ANIMATION
// ============================================

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillItems = entry.target.querySelectorAll('.skill-item');
            skillItems.forEach(item => {
                const skillLevel = item.getAttribute('data-skill');
                const progressBar = item.querySelector('.skill-progress');
                if (progressBar) {
                    setTimeout(() => {
                        progressBar.style.width = skillLevel + '%';
                    }, 200);
                }
            });
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const skillCategories = document.querySelectorAll('.skill-category');
skillCategories.forEach(category => {
    skillObserver.observe(category);
});

// ============================================
// STATISTICS COUNTER ANIMATION (Enhanced Smooth Version)
// ============================================

// Enhanced counter animation with ultra-smooth easing
const initStatCounters = () => {
    // Diagnostic: Gather stat-number element data
    const statNumbers = Array.from(document.querySelectorAll('.stat-number'));
    
    const diagnosticData = {
        statNumberElements: statNumbers.map(el => ({
            id: el.id || 'no-id',
            className: el.className,
            textContent: el.textContent,
            target: el.dataset.target,
            isVisible: el.offsetParent !== null,
            rect: el.getBoundingClientRect(),
            initialContent: el.textContent,
            hasParent: !!el.parentElement
        })),
        scriptExists: true,
        domContentLoaded: document.readyState === 'complete' || document.readyState === 'interactive',
        totalElements: statNumbers.length
    };
    
    // Log diagnostics
    console.log('📊 Stat Counter Diagnostics:', diagnosticData);
    
    // Validate elements exist
    if (diagnosticData.totalElements === 0) {
        console.warn('⚠️ No .stat-number elements found!');
        return;
    }
    
    /**
     * Animates a numerical count with ultra-smooth easing
     * @param {HTMLElement} element - The element to animate
     * @param {number} start - Starting number (usually 0)
     * @param {number} end - Target number
     * @param {number} duration - Animation duration in milliseconds
     */
    function animateCount(element, start, end, duration) {
        let startTime = null;
        
        // Ultra-smooth easing function for deceleration (easeOutQuint)
        function easeOutQuint(t) {
            return 1 - Math.pow(1 - t, 5);
        }
        
        function animate(currentTime) {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            
            // Apply ultra-smooth easing
            const easedProgress = easeOutQuint(progress);
            const currentValue = Math.round(start + (end - start) * easedProgress);
            
            // Update number with locale formatting (adds commas for thousands)
            element.textContent = currentValue.toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                // Animation complete - add "+" suffix for large numbers
                if (end >= 50) {
                    element.textContent = end.toLocaleString() + '+';
                } else {
                    element.textContent = end.toLocaleString();
                }
                
                // Completion bounce effect
                element.style.transform = 'scale(1.15)';
                setTimeout(() => {
                    element.style.transform = 'scale(1)';
                }, 250);
                
                console.log(`✅ Counter completed: ${end}${end >= 50 ? '+' : ''}`);
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    // Intersection Observer for scroll-triggered animation
    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target.querySelector('.stat-number');
                const target = parseInt(statNumber.getAttribute('data-target'));
                
                if (statNumber && !statNumber.classList.contains('animated')) {
                    statNumber.classList.add('animated');
                    
                    // Staggered delay based on position
                    const statItems = Array.from(entry.target.parentElement.children);
                    const delay = statItems.indexOf(entry.target) * 300;
                    
                    console.log(`🎬 Starting smooth counter: target=${target}, delay=${delay}ms`);
                    
                    setTimeout(() => {
                        animateCount(statNumber, 0, target, 3500); // 3.5 seconds for smooth animation
                    }, delay);
                }
            }
        });
    }, { 
        threshold: 0.2,  // Trigger when 20% visible (easier to trigger)
        rootMargin: '0px'
    });
    
    // Observe all stat items
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach((item, index) => {
        statObserver.observe(item);
        console.log(`👁️ Observing stat-item ${index + 1}/${statItems.length}`);
    });
    
    // Manual trigger function for testing
    window.triggerStatCounters = () => {
        console.log('🔧 Manually triggering smooth stat counters...');
        statNumbers.forEach((el, index) => {
            const target = parseInt(el.getAttribute('data-target'));
            setTimeout(() => {
                el.classList.remove('animated'); // Reset
                el.textContent = '0'; // Reset to 0
                animateCount(el, 0, target, 3500);
            }, index * 300);
        });
    };
    
    // Fallback: Auto-trigger after 2 seconds if user is already on About section
    setTimeout(() => {
        const aboutSection = document.querySelector('#about');
        if (aboutSection) {
            const rect = aboutSection.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible) {
                console.log('🎯 About section already visible - triggering animation');
                statNumbers.forEach((el, index) => {
                    if (!el.classList.contains('animated')) {
                        const target = parseInt(el.getAttribute('data-target'));
                        setTimeout(() => {
                            el.classList.add('animated');
                            animateCount(el, 0, target, 3500);
                        }, index * 300);
                    }
                });
            }
        }
    }, 2000);
    
    console.log('✅ Smooth stat counter initialization complete');
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initStatCounters);
} else {
    initStatCounters();
}

// ============================================
// TYPING ANIMATION FOR HERO NAME
// ============================================

const typingElement = document.querySelector('.title-name');
if (typingElement) {
    const text = typingElement.getAttribute('data-text');
    let index = 0;
    
    const typeText = () => {
        if (index < text.length) {
            typingElement.textContent = text.substring(0, index + 1);
            index++;
            setTimeout(typeText, 100);
        }
    };
    
    // Start typing animation after a delay
    setTimeout(() => {
        typingElement.textContent = '';
        typeText();
    }, 1000);
}

// ============================================
// PARALLAX EFFECT FOR HERO SECTION
// ============================================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const heroContent = hero.querySelector('.hero-content');
        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
            heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
        }
    }
    
    // Parallax for gradient orbs
    const orbs = document.querySelectorAll('.gradient-orb');
    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 0.1;
        orb.style.transform = `translate(${scrolled * speed}px, ${scrolled * speed * 0.5}px)`;
    });
});

// ============================================
// EMAIL SOCIAL LINK HANDLER
// ============================================

// Find and activate the email social link
document.addEventListener('DOMContentLoaded', function() {
    const emailLink = document.querySelector('a[aria-label="Email"][href*="mailto"]');
    if (emailLink) {
        console.log('✅ Email link found:', emailLink.href);
    } else {
        console.warn('⚠️ Email link not found!');
    }
});

// ============================================
// FORM HANDLING - EMAIL INTEGRATION
// ============================================

// Initialize EmailJS
(function() {
    // ⚠️ IMPORTANT: Replace with YOUR PUBLIC KEY from EmailJS dashboard
    // Get it from: https://dashboard.emailjs.com/admin/account
    emailjs.init("YOUR_PUBLIC_KEY_HERE");
})();

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    console.log('Contact form found, attaching event listener...');
    
    contactForm.addEventListener('submit', async function(e) {
        console.log('Form submit event triggered');
        e.preventDefault();
        e.stopPropagation();
        
        // Get form data
        const formData = new FormData(contactForm);
        const submitButton = contactForm.querySelector('.btn-submit');
        const originalText = submitButton.querySelector('span').textContent;
        
        // Show loading state
        submitButton.querySelector('span').textContent = 'Sending...';
        submitButton.style.opacity = '0.6';
        submitButton.disabled = true;
        
        try {
            // Send email using EmailJS
            const emailData = {
                to_email: "prakharsaxena230706@gmail.com",
                from_name: formData.get('name'),
                from_email: formData.get('email'),
                subject: formData.get('subject'),
                message: formData.get('message'),
                reply_to: formData.get('email')
            };
            
            console.log('Sending email with data:', emailData);
            
            const response = await emailjs.send(
                "YOUR_SERVICE_ID",  // ⚠️ Replace with YOUR service ID from EmailJS dashboard
                "YOUR_TEMPLATE_ID", // ⚠️ Replace with YOUR template ID from EmailJS dashboard
                emailData
            );
            
            console.log('Email sent successfully:', response);
            
            // Show success message
            submitButton.querySelector('span').textContent = 'Message Sent!';
            submitButton.style.background = '#10b981';
            
            // Reset form
            contactForm.reset();
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitButton.querySelector('span').textContent = originalText;
                submitButton.style.background = '';
                submitButton.style.opacity = '1';
                submitButton.disabled = false;
            }, 3000);
            
        } catch (error) {
            console.error('Error sending email:', error);
            console.error('Error message:', error.message);
            console.error('Full error:', error);
            
            // Provide detailed error feedback
            let errorMsg = 'Error! Try Again';
            if (error.text === 'Missing template parameters: subject' || 
                error.text === 'Missing template parameters: message') {
                errorMsg = 'Form error. Try again.';
            }
            
            submitButton.querySelector('span').textContent = errorMsg;
            submitButton.style.background = '#ef4444';
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitButton.querySelector('span').textContent = originalText;
                submitButton.style.background = '';
                submitButton.style.opacity = '1';
                submitButton.disabled = false;
            }, 3000);
        }
        });
    } else {
        console.error('Contact form with id="contactForm" not found!');
    }

// ============================================
// CURSOR EFFECT (OPTIONAL ENHANCEMENT)
// ============================================

let cursor = null;
let cursorFollower = null;

const createCursor = () => {
    cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        width: 10px;
        height: 10px;
        border: 2px solid var(--primary-color);
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
        display: none;
    `;
    
    cursorFollower = document.createElement('div');
    cursorFollower.className = 'cursor-follower';
    cursorFollower.style.cssText = `
        width: 30px;
        height: 30px;
        border: 1px solid var(--primary-color);
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9998;
        transition: all 0.3s ease;
        opacity: 0.5;
        display: none;
    `;
    
    document.body.appendChild(cursor);
    document.body.appendChild(cursorFollower);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 5 + 'px';
        cursor.style.top = e.clientY - 5 + 'px';
        cursor.style.display = 'block';
        
        setTimeout(() => {
            cursorFollower.style.left = e.clientX - 15 + 'px';
            cursorFollower.style.top = e.clientY - 15 + 'px';
            cursorFollower.style.display = 'block';
        }, 100);
    });
    
    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursor.style.display = 'none';
        cursorFollower.style.display = 'none';
    });
    
    // Scale cursor on hover over interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-item');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursorFollower.style.transform = 'scale(1.5)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursorFollower.style.transform = 'scale(1)';
        });
    });
};

// Uncomment to enable custom cursor
// createCursor();

// ============================================
// SCROLL REVEAL ANIMATIONS
// ============================================

const revealOnScroll = () => {
    const reveals = document.querySelectorAll('.section-header, .about-text, .contact-info');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Initial check



// ============================================
// PARTICLE EFFECT (OPTIONAL)
// ============================================

const createParticles = () => {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const particleCount = 50;
    const particles = [];
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: var(--primary-color);
            border-radius: 50%;
            opacity: ${Math.random() * 0.5 + 0.2};
            pointer-events: none;
        `;
        
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `float ${5 + Math.random() * 10}s infinite ease-in-out`;
        particle.style.animationDelay = Math.random() * 5 + 's';
        
        hero.appendChild(particle);
        particles.push(particle);
    }
};

// Uncomment to enable particles
// createParticles();

// ============================================
// PAGE LOAD ANIMATION
// ============================================

window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in';
        document.body.style.opacity = '1';
    }, 100);
});

// ============================================
// CONSOLE MESSAGE
// ============================================

console.log('%c👋 Hello! Interested in the code?', 'color: #6366f1; font-size: 16px; font-weight: bold;');
console.log('%cFeel free to explore and learn!', 'color: #8b5cf6; font-size: 12px;');

}); // Close DOMContentLoaded event listener
