// Main JavaScript File - Dark Mode Only, WhatsApp & Telegram Integration

// Telegram Configuration - REPLACE WITH YOUR CREDENTIALS
const TELEGRAM_CONFIG = {
    BOT_TOKEN: '8197371473:AAFYktxu2BWIRHU_snGulo7oE41_K_gWstE', // Your bot token
    CHAT_ID: 'YOUR_CHAT_ID_HERE', // Get from: https://api.telegram.org/bot8197371473:AAFYktxu2BWIRHU_snGulo7oE41_K_gWstE/getUpdates
    ENABLED: true // Set to false to disable Telegram (fallback to WhatsApp only)
};

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initApp();
});

// Application initialization
function initApp() {
    // Hide loading screen after 1.5 seconds
    setTimeout(() => {
        document.querySelector('.loading-screen').style.opacity = '0';
        setTimeout(() => {
            document.querySelector('.loading-screen').style.display = 'none';
        }, 500);
    }, 1500);

    // Initialize all components
    initMobileMenu();
    initSmoothScroll();
    initTypingAnimation();
    initScrollAnimations();
    initStatsCounter();
    initContactForm();
    initBackToTop();
    initParticles();
    generateServiceCards();
    generateProjectCards();
    initFloatingCards();
    
    // Add window resize listener
    window.addEventListener('resize', handleResize);
    
    console.log('🚀 GYB Website initialized successfully!');
    console.log('📱 WhatsApp: +20 128 355 5891');
    console.log('🤖 Telegram Bot: @GrowYourBusinessNowbot');
    console.log('🔑 Telegram Token:', TELEGRAM_CONFIG.BOT_TOKEN ? 'Configured' : 'Not configured');
    console.log('💬 Telegram Chat ID:', TELEGRAM_CONFIG.CHAT_ID ? 'Configured' : 'Please set in script.js');
}

// Mobile Menu
function initMobileMenu() {
    const menuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.querySelector('.nav-links');
    
    menuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        menuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav') && !e.target.closest('.nav-links')) {
            menuBtn.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
    
    // Close menu when clicking a link
    navLinks.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            menuBtn.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// Smooth Scroll
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
}

// Typing Animation
function initTypingAnimation() {
    const typingText = document.querySelector('.typing-text');
    const cursor = document.querySelector('.cursor');
    const words = ['convert.', 'engage.', 'sell.', 'grow.'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isPaused = false;
    
    function type() {
        if (isPaused) return;
        
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }
        
        // Typing speed
        let typeSpeed = isDeleting ? 50 : 100;
        
        // If word is complete
        if (!isDeleting && charIndex === currentWord.length) {
            isPaused = true;
            setTimeout(() => {
                isPaused = false;
                isDeleting = true;
                typeSpeed = 500;
            }, 1500);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500;
        }
        
        setTimeout(type, typeSpeed);
    }
    
    // Start typing animation after loading
    setTimeout(type, 1000);
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animate stats if in view
                if (entry.target.id === 'hero') {
                    animateStats();
                }
            }
        });
    }, observerOptions);
    
    // Observe reveal text elements
    document.querySelectorAll('.reveal-text').forEach(el => {
        observer.observe(el);
    });
    
    // Header scroll effect
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Update active nav link based on scroll
        updateActiveNavLink();
    });
}

// Stats Counter Animation
function initStatsCounter() {
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        stat.textContent = '0';
    });
}

function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        const suffix = stat.textContent.includes('%') ? '%' : '+';
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const counter = setInterval(() => {
            current += step;
            if (current >= target) {
                stat.textContent = target + suffix;
                clearInterval(counter);
            } else {
                stat.textContent = Math.floor(current) + suffix;
            }
        }, 16);
    });
}

// Generate Service Cards
function generateServiceCards() {
    const services = [
        {
            icon: '💻',
            tag: 'FRONTEND',
            title: 'Web Development',
            description: 'React, Vue.js applications with modern UX/UI design patterns and AI-powered code assistance.'
        },
        {
            icon: '⚙️',
            tag: 'BACKEND',
            title: 'System Architecture',
            description: 'Scalable APIs, databases, and cloud infrastructure solutions with intelligent monitoring.'
        },
        {
            icon: '🚀',
            tag: 'DEVOPS',
            title: 'Performance & SEO',
            description: 'Fast loading, mobile-optimized sites that rank on Google with continuous optimization.'
        },
        {
            icon: '🎨',
            tag: 'DESIGN',
            title: 'Brand Identity',
            description: 'Complete visual systems from logos to marketing materials with AI-enhanced design.'
        },
        {
            icon: '📱',
            tag: 'MOBILE',
            title: 'Mobile Apps',
            description: 'Native iOS/Android and cross-platform mobile solutions with intelligent user experiences.'
        },
        {
            icon: '📈',
            tag: 'STRATEGY',
            title: 'Digital Strategy',
            description: 'Growth planning, analytics setup, and conversion optimization with AI-driven insights.'
        }
    ];
    
    const grid = document.querySelector('.services-grid');
    grid.innerHTML = '';
    
    services.forEach(service => {
        const card = document.createElement('div');
        card.className = 'service-card';
        card.innerHTML = `
            <div class="service-icon">${service.icon}</div>
            <span class="service-tag">${service.tag}</span>
            <h3>${service.title}</h3>
            <p>${service.description}</p>
        `;
        grid.appendChild(card);
    });
}

// Generate Project Cards
function generateProjectCards() {
    const projects = [
        {
            icon: '🛒',
            tag: 'Web App • Live',
            title: 'E-commerce Platform',
            tags: ['React', 'Node.js', 'Stripe'],
            description: 'Modern e-commerce platform with AI-powered recommendations and seamless checkout.'
        },
        {
            icon: '🏥',
            tag: 'Enterprise • Live',
            title: 'Healthcare Portal',
            tags: ['Vue.js', 'Python', 'PostgreSQL'],
            description: 'Secure healthcare portal with patient management and telemedicine capabilities.'
        },
        {
            icon: '🏠',
            tag: 'Marketing • Live',
            title: 'Real Estate Site',
            tags: ['Next.js', 'Sanity CMS'],
            description: 'Dynamic real estate platform with virtual tours and AI-powered property matching.'
        }
    ];
    
    const grid = document.querySelector('.projects-grid');
    grid.innerHTML = '';
    
    projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
            <div class="project-image">${project.icon}</div>
            <div class="project-content">
                <span class="service-tag">${project.tag}</span>
                <h3>${project.title}</h3>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                </div>
                <p>${project.description}</p>
                <a href="#" class="btn btn-secondary" style="margin-top: 1rem;">View Project</a>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Contact Form with Telegram Integration
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            service: document.getElementById('service').value,
            message: document.getElementById('message').value.trim()
        };
        
        // Validation
        if (!formData.name || !formData.phone || !formData.service || !formData.message) {
            showToast('Please fill in all fields', 'error');
            return;
        }
        
        // Phone validation (simple)
        const phoneRegex = /^[+]?[\d\s\-\(\)]{10,}$/;
        if (!phoneRegex.test(formData.phone)) {
            showToast('Please enter a valid phone number', 'error');
            return;
        }
        
        // Show loading
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>Sending to Telegram...</span>';
        submitBtn.disabled = true;
        
        // Check if Telegram is configured
        if (!TELEGRAM_CONFIG.ENABLED || !TELEGRAM_CONFIG.CHAT_ID || TELEGRAM_CONFIG.CHAT_ID === 'YOUR_CHAT_ID_HERE') {
            // Telegram not configured, use WhatsApp fallback
            setTimeout(() => {
                sendToWhatsApp(formData);
                form.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                showToast('Sent to WhatsApp! Check your messages.', 'success');
            }, 1000);
            return;
        }
        
        try {
            // Format message for Telegram
            const telegramMessage = `
📩 *NEW CONTACT FORM SUBMISSION* 📩

👤 *Name:* ${formData.name}
📞 *Phone:* ${formData.phone}
🎯 *Service:* ${formData.service}
📝 *Message:*
${formData.message}

⏰ *Time:* ${new Date().toLocaleString('en-US', { 
    timeZone: 'Africa/Cairo',
    hour12: false,
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
})}

🔗 *Website:* GYB Contact Form
            `;
            
            // Send to Telegram
            const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_CONFIG.BOT_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: TELEGRAM_CONFIG.CHAT_ID,
                    text: telegramMessage,
                    parse_mode: 'Markdown',
                    disable_notification: false
                })
            });
            
            const result = await response.json();
            
            if (result.ok) {
                // Success
                form.reset();
                showToast('Message sent to Telegram! We\'ll contact you soon.', 'success');
                console.log('✅ Sent to Telegram:', result);
                
                // Optional: Send a copy to WhatsApp as well
                setTimeout(() => {
                    sendToWhatsApp(formData, false);
                }, 1000);
                
            } else {
                // Error from Telegram
                console.error('❌ Telegram error:', result);
                showToast('Telegram failed. Sending to WhatsApp...', 'warning');
                
                // Fallback to WhatsApp
                setTimeout(() => {
                    sendToWhatsApp(formData);
                }, 1500);
            }
            
        } catch (error) {
            // Network error
            console.error('❌ Network error:', error);
            showToast('Connection error. Using WhatsApp instead...', 'error');
            
            // Fallback to WhatsApp
            sendToWhatsApp(formData);
            
        } finally {
            // Reset button after 2 seconds
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        }
    });
}

// Send to WhatsApp function
function sendToWhatsApp(formData, showConfirmation = true) {
    const whatsappMessage = `Hello GYB! 👋%0A%0AI want to discuss a project:%0A%0A👤 *Name:* ${encodeURIComponent(formData.name)}%0A📞 *Phone:* ${encodeURIComponent(formData.phone)}%0A🎯 *Service:* ${encodeURIComponent(formData.service)}%0A📝 *Message:* ${encodeURIComponent(formData.message)}%0A%0ALooking forward to your response!`;
    
    window.open(`https://wa.me/201283555891?text=${whatsappMessage}`, '_blank');
    
    if (showConfirmation) {
        console.log('📱 WhatsApp message prepared:', formData);
    }
}

// Back to Top Button
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Particles Background
function initParticles() {
    const container = document.querySelector('.particles-container');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random properties
        const size = Math.random() * 4 + 1;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const duration = Math.random() * 10 + 10;
        const delay = Math.random() * 5;
        
        // Apply styles
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: var(--accent-primary);
            border-radius: 50%;
            left: ${posX}%;
            top: ${posY}%;
            opacity: ${Math.random() * 0.5 + 0.2};
            animation: floatParticle ${duration}s linear infinite;
            animation-delay: ${delay}s;
        `;
        
        container.appendChild(particle);
    }
    
    // Add CSS for particle animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatParticle {
            0% {
                transform: translate(0, 0) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 0.5;
            }
            90% {
                opacity: 0.5;
            }
            100% {
                transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Floating Cards Animation
function initFloatingCards() {
    const cards = document.querySelectorAll('.floating-card');
    cards.forEach((card, index) => {
        // Add random animation delay
        const delay = index * 2;
        card.style.animationDelay = `${delay}s`;
    });
}

// Update Active Nav Link on Scroll
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Show Toast Notification
function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = 'toast';
    toast.classList.add('show');
    
    // Add type class
    if (type === 'success') {
        toast.style.borderLeft = '4px solid var(--accent-success)';
        toast.style.background = 'var(--bg-card)';
    } else if (type === 'error') {
        toast.style.borderLeft = '4px solid var(--accent-error)';
        toast.style.background = 'var(--bg-card)';
    } else if (type === 'warning') {
        toast.style.borderLeft = '4px solid var(--accent-warning)';
        toast.style.background = 'var(--bg-card)';
    } else {
        toast.style.borderLeft = '4px solid var(--accent-primary)';
        toast.style.background = 'var(--bg-card)';
    }
    
    // Hide after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Handle Window Resize
function handleResize() {
    // Update any responsive behaviors
    const header = document.querySelector('.header');
    if (window.innerWidth > 768) {
        header.classList.remove('scrolled');
    }
}

// Add CSS for particle animation
const particleStyles = document.createElement('style');
particleStyles.textContent = `
    .particle {
        position: absolute;
        background: var(--accent-primary);
        border-radius: 50%;
        pointer-events: none;
    }
`;
document.head.appendChild(particleStyles);

// Global WhatsApp function
window.openWhatsApp = function() {
    window.open('https://wa.me/201283555891', '_blank');
    console.log('WhatsApp button clicked');
};