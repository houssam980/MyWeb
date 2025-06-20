// Setting up smooth scroll animations for the site
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });
});

// Hamburger menu functionality for mobile users
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Auto-close mobile menu when user clicks a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth page scrolling when clicking nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Combined navbar and scroll-to-top logic
// (Moved this to the scroll section for better organization)

// Cool typewriter effect for my name
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Start the typing animation when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        // Save the original content first
        const originalHTML = `
            <span class="hero-name">Houssam Ghmari</span><br>
            <span class="gradient-text">Software Engineer</span><br>
            <span class="hero-subtitle">UI/UX Designer & IT Specialist</span>
        `;
        
        // Empty the title to start fresh
        heroTitle.style.opacity = '0';
        
        // Fade in the completed title
        setTimeout(() => {
            heroTitle.innerHTML = originalHTML;
            heroTitle.style.opacity = '1';
            heroTitle.style.transition = 'opacity 1s ease-in-out';
        }, 500);
    }
});

// Making the tech icons float and move subtly
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    document.querySelectorAll('.floating-card').forEach((card, index) => {
        const speed = 0.5 + (index * 0.1);
        card.style.transform = `translateY(${scrolled * speed * 0.1}px) rotate(${scrolled * 0.02}deg)`;
    });
});

// Interactive CV hints I added to skill cards
document.addEventListener('DOMContentLoaded', function() {
    // Making CV hints clickable and interactive
    document.querySelectorAll('.cv-hint').forEach(hint => {
        hint.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Quick visual feedback when clicked
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Navigate smoothly to CV download section
            const cvSection = document.querySelector('#cv');
            if (cvSection) {
                cvSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Highlight the CV section briefly
                setTimeout(() => {
                    cvSection.classList.add('highlight-section');
                    setTimeout(() => {
                        cvSection.classList.remove('highlight-section');
                    }, 2000);
                }, 800);
            }
        });
        
        // Subtle hover feedback for better UX
        hint.addEventListener('mouseenter', function() {
            this.style.filter = 'brightness(1.05)';
        });
        
        hint.addEventListener('mouseleave', function() {
            this.style.filter = '';
        });
    });
    
    // Smooth entrance animation for skill categories
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, index * 200);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.skill-category').forEach(category => {
        skillObserver.observe(category);
    });
});

// Contact form logic (currently not used)
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Collect form information
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Basic field validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        // Check if email format is valid
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Mock form submission for demo
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            this.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);    });
}

function removeNotification(notification) {
    notification.style.transform = 'translateX(400px)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Animated counters for my statistics
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const target = parseInt(stat.textContent.replace('+', ''));
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = target + (stat.textContent.includes('+') ? '+' : '');
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(current) + (stat.textContent.includes('+') ? '+' : '');
            }
        }, 30);
    });
}

// Trigger stats animation when section comes into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            statsObserver.unobserve(entry.target);
        }
    });
});

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Background particle animation system I built
class ParticleSystem {
    constructor() {
        this.particles = [];
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.init();
    }
    
    init() {
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            opacity: 0.3;
        `;
        
        document.body.appendChild(this.canvas);
        this.resize();
        this.createParticles();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createParticles() {
        for (let i = 0; i < 50; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1
            });
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
            
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = '#6366f1';
            this.ctx.fill();
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Start up the particle system
document.addEventListener('DOMContentLoaded', () => {
    new ParticleSystem();
});

// Interactive hover effects for skill tags
document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
        this.style.background = 'rgba(99, 102, 241, 0.2)';
    });
    
    tag.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.background = 'rgba(99, 102, 241, 0.1)';
    });
});

// Hover animations for certificate cards
document.querySelectorAll('.certificate-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Page loading animation
window.addEventListener('load', () => {
    const loader = document.createElement('div');
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--bg-color);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        transition: opacity 0.5s ease;
    `;
    
    loader.innerHTML = `
        <div style="text-align: center;">
            <div style="width: 50px; height: 50px; border: 3px solid rgba(99, 102, 241, 0.3); border-top: 3px solid #6366f1; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 1rem;"></div>
            <p style="color: var(--text-secondary);">Loading...</p>
        </div>
    `;
    
    // Add spinning animation to loading elements
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(loader);
    
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(loader);
        }, 500);
    }, 1500);
});

// Keyboard shortcuts I added for better accessibility
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Hide mobile menu if it's open
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Dark/light theme switcher (disabled for now)
function createThemeToggle() {
    const toggle = document.createElement('button');
    toggle.innerHTML = '<i class="fas fa-moon"></i>';
    toggle.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--primary-color);
        color: white;
        border: none;
        cursor: pointer;
        box-shadow: var(--shadow);
        z-index: 1000;
        transition: all 0.3s ease;
    `;
    
    let isDark = true;
    
    toggle.addEventListener('click', () => {
        isDark = !isDark;
        toggle.innerHTML = isDark ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
        
        if (isDark) {
            document.documentElement.style.setProperty('--bg-color', '#0f0f23');
            document.documentElement.style.setProperty('--text-primary', '#ffffff');
        } else {
            document.documentElement.style.setProperty('--bg-color', '#ffffff');
            document.documentElement.style.setProperty('--text-primary', '#000000');
        }
    });
    
    document.body.appendChild(toggle);
}

// Enable theme toggle if you want it
// createThemeToggle(); // Just uncomment this line

// Download my CV when button is clicked
function downloadCV() {
    // Direct download from my assets folder
    const cvUrl = './assets/Houssam_Ghmari_CV.pdf';
    
    // Create invisible download link
    const link = document.createElement('a');
    link.href = cvUrl;
    link.download = 'Houssam_Ghmari_CV.pdf';
    link.target = '_blank';
    
    // Trigger download and clean up
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Let user know download started
    showNotification('CV download started! Thank you for your interest.', 'success');
}

// Custom notification system I built
function showNotification(message, type) {
    // Build the notification popup
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    let icon = 'fa-info-circle';
    let bgColor = '#3b82f6';
    
    if (type === 'success') {
        icon = 'fa-check-circle';
        bgColor = '#10b981';
    } else if (type === 'error') {
        icon = 'fa-exclamation-circle';
        bgColor = '#ef4444';
    }
    
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${icon}"></i>
            <span>${message}</span>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Style the notification container
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${bgColor};
        color: white;
        padding: 1rem;
        border-radius: 12px;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    // Style the message text
    const content = notification.querySelector('.notification-content');
    content.style.cssText = `
        display: flex;
        align-items: center;
        gap: 0.75rem;
    `;
    
    // Style the X close button
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0;
        margin-left: auto;
    `;
    
    // Show the notification
    document.body.appendChild(notification);
    
    // Slide in animation
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        removeNotification(notification);
    }, 5000);
    
    // Make close button work
    closeBtn.addEventListener('click', () => {
        removeNotification(notification);
    });
}

// Email modal popup controls
function openEmailModal() {
    const modal = document.getElementById('emailModal');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Stop background scrolling
}

function closeEmailModal() {
    const modal = document.getElementById('emailModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Allow scrolling again
}

// Close modal when clicking outside the popup
window.addEventListener('click', function(event) {
    const modal = document.getElementById('emailModal');
    if (event.target === modal) {
        closeEmailModal();
    }
});

// Close modal with Escape key for accessibility
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeEmailModal();
    }
});

// Back to top button functionality I implemented
const scrollToTopBtn = document.getElementById('scrollToTop');

// Show/hide scroll button and update navbar on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    
    // Change navbar style when scrolling
    if (scrollTop > 100) {
        navbar.style.background = 'rgba(15, 15, 35, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(15, 15, 35, 0.95)';
        navbar.style.boxShadow = 'none';
    }
    
    // Show scroll button after user scrolls halfway down
    const halfPageHeight = (scrollHeight - clientHeight) / 2;
    if (scrollTop > halfPageHeight) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
});

// Scroll to top function with smooth animation
function scrollToTopFunction() {
    // Smooth scroll to top
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    
    // Alternative method for browsers that don't support smooth scroll
    if (!window.CSS || !CSS.supports('scroll-behavior', 'smooth')) {
        const scrollDuration = 500;
        const scrollStep = -window.scrollY / (scrollDuration / 15);
        
        const scrollInterval = setInterval(() => {
            if (window.scrollY !== 0) {
                window.scrollBy(0, scrollStep);
            } else {
                clearInterval(scrollInterval);
            }
        }, 15);
    }
}

// Add keyboard accessibility for scroll to top button
scrollToTopBtn.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        scrollToTopFunction();
    }
});
