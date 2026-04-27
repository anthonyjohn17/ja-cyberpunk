// ========================================
// FUTURISTIC AI PORTFOLIO - JAVASCRIPT
// ========================================

// ========================================
// Particle Animation Background
// ========================================
class ParticleNetwork {
    constructor() {
        this.canvas = document.getElementById('particleCanvas');
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 80;
        this.maxDistance = 150;
        
        this.resize();
        this.init();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    init() {
        this.particles = [];
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1
            });
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update and draw particles
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Bounce off edges
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
            
            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = 'rgba(0, 240, 255, 0.6)';
            this.ctx.fill();
        });
        
        // Draw connections
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.maxDistance) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.strokeStyle = `rgba(0, 240, 255, ${0.15 * (1 - distance / this.maxDistance)})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.stroke();
                }
            }
        }
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize particle network
document.addEventListener('DOMContentLoaded', () => {
    new ParticleNetwork();
});

// ========================================
// Navigation Scroll Effects
// ========================================
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    updateActiveNavLink();
});

// ========================================
// Mobile Navigation
// ========================================
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

// ========================================
// Smooth Scrolling
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// Active Navigation Link
// ========================================
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (correspondingLink) {
                correspondingLink.classList.add('active');
            }
        }
    });
}

// ========================================
// Scroll Progress Bar
// ========================================
function updateScrollProgress() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    
    let progressBar = document.getElementById('scroll-progress');
    if (!progressBar) {
        progressBar = document.createElement('div');
        progressBar.id = 'scroll-progress';
        document.body.appendChild(progressBar);
    }
    
    progressBar.style.width = scrolled + '%';
}

window.addEventListener('scroll', updateScrollProgress);

// ========================================
// Intersection Observer for Animations
// ========================================
const observerOptions = {
    threshold: 0.15,
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

document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll(`
        .stat-card,
        .experience-card,
        .project-card,
        .skill-category,
        .edu-card,
        .award-item,
        .contact-info-card,
        .contact-form-wrap
    `);
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// ========================================
// Typing Effect for Hero
// ========================================
function typeWriter(element, text, speed = 100) {
    let i = 0;
    const originalText = element.textContent;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

window.addEventListener('load', () => {
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        typeWriter(typingElement, "Hello, I'm", 100);
    }
});

// ========================================
// Card Hover Effects
// ========================================
document.querySelectorAll('.stat-card, .experience-card, .project-card, .contact-info-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// ========================================
// Skill Chip Interactions
// ========================================
document.querySelectorAll('.skill-chip, .competency-tag, .project-tag').forEach(chip => {
    chip.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.05)';
    });
    
    chip.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ========================================
// Button Ripple Effect
// ========================================
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            left: ${x}px;
            top: ${y}px;
            transform: scale(0);
            animation: ripple-animation 0.6s ease-out;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ========================================
// Parallax Effect
// ========================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    // Hero parallax
    const heroContent = document.querySelector('.hero-content');
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - (scrolled / 700);
    }
});

// ========================================
// Console Easter Egg
// ========================================
console.log('%c🚀 JA.AI', 'color: #00f0ff; font-size: 30px; font-weight: bold; text-shadow: 0 0 10px #00f0ff;');
console.log('%c👨‍💻 AI Product Manager & Agentic AI Solutions Architect', 'color: #a855f7; font-size: 16px;');
console.log('%c📧 anthony.john42@gmail.com', 'color: #00ff88; font-size: 14px;');
console.log('%c💡 Interested in the code? Let\'s connect!', 'color: #ffffff; font-size: 12px;');

// ========================================
// Performance Monitoring
// ========================================
window.addEventListener('load', () => {
    const loadTime = window.performance.timing.domContentLoadedEventEnd - 
                     window.performance.timing.navigationStart;
    console.log(`⚡ Page loaded in ${loadTime}ms`);
});

// ========================================
// Check for success message on page load
// ========================================
window.addEventListener('load', () => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === 'true') {
        showToast("Thanks! I'll get back to you soon.", 'success');
        // Clean URL
        window.history.replaceState({}, document.title, window.location.pathname);
    }
});

// ========================================
// Contact Form Submit (Formspree)
// ========================================
// SETUP INSTRUCTIONS:
// 1. Go to https://formspree.io and create a free account
// 2. Create a new form and get your Form ID (e.g., "xvgwqkny")
// 3. Replace "YOUR_FORM_ID" in index.html form action with your Form ID
// 4. Formspree will send emails to the email you verify during signup
// 5. Free tier: 50 submissions/month, upgrade for more

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    // Check if form ID is configured
    if (contactForm.action.includes('YOUR_FORM_ID')) {
        console.warn('⚠️ Formspree not configured! Please replace YOUR_FORM_ID in the form action with your Formspree form ID.');
    }
    const emailInput = document.getElementById('contact-email');
    const replytoInput = document.getElementById('contact-replyto');
    if (emailInput && replytoInput) {
        emailInput.addEventListener('input', () => {
            replytoInput.value = emailInput.value;
        });
    }
    
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('.contact-submit');
        const originalHTML = btn.innerHTML;
        btn.innerHTML = '<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>';
        btn.disabled = true;
        
        const action = contactForm.action;
        const isFormspreeConfigured = action && !action.includes('YOUR_FORM_ID');
        
        // Fallback: Formspree not configured — use mailto
        if (!isFormspreeConfigured) {
            const name = contactForm.querySelector('[name="name"]').value;
            const email = contactForm.querySelector('[name="email"]').value;
            const subject = contactForm.querySelector('[name="subject"]').value || 'Portfolio Contact';
            const message = contactForm.querySelector('[name="message"]').value;
            const mailto = `mailto:anthony.john42@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name} <${email}>\n\n${message}`)}`;
            window.location.href = mailto;
            contactForm.reset();
            btn.innerHTML = originalHTML;
            btn.disabled = false;
            showToast("Opened your email app. Send the draft to reach me.", 'success');
            return;
        }
        
        const formData = new FormData(contactForm);
        if (emailInput) {
            formData.set('_replyto', emailInput.value);
        }
        formData.set('_subject', `Portfolio Contact: ${formData.get('subject') || 'New Message'}`);
        formData.append('_next', window.location.href.split('?')[0] + '?success=true');
        
        try {
            const response = await fetch(action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });
            
            const text = await response.text();
            let data;
            try {
                data = text ? JSON.parse(text) : {};
            } catch (_) {
                data = {};
            }
            
            if (response.ok) {
                contactForm.reset();
                showToast("Thanks! I'll get back to you soon.", 'success');
            } else {
                const msg = (data.errors && Array.isArray(data.errors))
                    ? data.errors.map(e => e.message || e).join(', ')
                    : (data.error || `Request failed (${response.status})`);
                showToast('Error: ' + msg, 'error');
            }
        } catch (err) {
            console.error('Form submission error:', err);
            showToast('Network error. Check your connection and try again.', 'error');
        } finally {
            btn.innerHTML = originalHTML;
            btn.disabled = false;
        }
    });
}

// Helper function to show toast messages
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `contact-toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('show'));
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, type === 'error' ? 5000 : 3000);
}

// ========================================
// Handle External Links Security
// ========================================
document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.setAttribute('rel', 'noopener noreferrer');
});

// ========================================
// Accessibility - Keyboard Navigation
// ========================================
document.addEventListener('keydown', (e) => {
    // Focus visible for keyboard navigation
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
    
    // Quick navigation shortcuts
    if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
            case 'k':
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                break;
        }
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// ========================================
// Neural Network Animation (Optional)
// ========================================
class NeuralNetworkAnimation {
    constructor() {
        this.container = document.querySelector('.neural-network');
        if (!this.container) return;
        
        this.createNodes();
    }
    
    createNodes() {
        const nodeCount = 20;
        for (let i = 0; i < nodeCount; i++) {
            const node = document.createElement('div');
            node.className = 'neural-node';
            node.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: #00f0ff;
                border-radius: 50%;
                box-shadow: 0 0 10px #00f0ff;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: pulse ${2 + Math.random() * 3}s infinite;
            `;
            this.container.appendChild(node);
        }
    }
}

// Initialize neural network
document.addEventListener('DOMContentLoaded', () => {
    new NeuralNetworkAnimation();
});

// Add pulse animation
const pulseStyle = document.createElement('style');
pulseStyle.textContent = `
    @keyframes pulse {
        0%, 100% {
            opacity: 0.3;
            transform: scale(1);
        }
        50% {
            opacity: 1;
            transform: scale(1.5);
        }
    }
`;
document.head.appendChild(pulseStyle);

// ========================================
// Loading Screen (Optional)
// ========================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ========================================
// Smooth Reveal on Load
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});
