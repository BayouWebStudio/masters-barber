// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(26, 26, 26, 0.98)';
        navbar.style.boxShadow = '0 8px 25px rgba(0,0,0,0.25)';
    } else {
        navbar.style.background = '#1a1a1a';
        navbar.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
    }
});

// Intersection Observer for Animations
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

// Setup animations on page load
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.service-card, .review-card, .vintage-frame, .contact-block');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
});

// Language Toggle with Barber Shop Specific Translations
const langToggle = document.getElementById('lang-toggle');
let isSpanish = false;

const translations = {
    en: {
        'AUTHENTIC BARBERSHOP EXPERIENCE': 'AUTHENTIC BARBERSHOP EXPERIENCE',
        'Where tradition meets style. Noe delivers quality cuts with old-school charm and modern precision.': 'Where tradition meets style. Noe delivers quality cuts with old-school charm and modern precision.',
        'Call Now': 'Call Now',
        'Find Us': 'Find Us',
        'BARBER SERVICES': 'BARBER SERVICES',
        'WHAT CUSTOMERS SAY': 'WHAT CUSTOMERS SAY',
        'READY FOR A FRESH CUT?': 'READY FOR A FRESH CUT?',
        'SHOP HOURS': 'SHOP HOURS',
        'VISIT THE SHOP': 'VISIT THE SHOP',
        'Walk-ins welcome': 'Walk-ins welcome',
        'No appointment needed': 'No appointment needed',
        'Español': 'Español'
    },
    es: {
        'AUTHENTIC BARBERSHOP EXPERIENCE': 'EXPERIENCIA AUTÉNTICA DE BARBERÍA',
        'Where tradition meets style. Noe delivers quality cuts with old-school charm and modern precision.': 'Donde la tradición se encuentra con el estilo. Noe ofrece cortes de calidad con encanto de la vieja escuela y precisión moderna.',
        'Call Now': 'Llame Ahora',
        'Find Us': 'Encuéntranos',
        'BARBER SERVICES': 'SERVICIOS DE BARBERÍA',
        'WHAT CUSTOMERS SAY': 'LO QUE DICEN LOS CLIENTES',
        'READY FOR A FRESH CUT?': '¿LISTO PARA UN CORTE FRESCO?',
        'SHOP HOURS': 'HORARIOS DE LA TIENDA',
        'VISIT THE SHOP': 'VISITE LA TIENDA',
        'Walk-ins welcome': 'Se aceptan clientes sin cita',
        'No appointment needed': 'No se necesita cita',
        'Español': 'English'
    }
};

langToggle.addEventListener('click', (e) => {
    e.preventDefault();
    isSpanish = !isSpanish;
    
    const currentLang = isSpanish ? 'es' : 'en';
    langToggle.textContent = translations[currentLang]['Español'];
    
    // Update key text elements
    const elementsToTranslate = [
        { selector: '.hero-title', key: 'AUTHENTIC BARBERSHOP EXPERIENCE' },
        { selector: '.hero-subtitle', key: 'Where tradition meets style. Noe delivers quality cuts with old-school charm and modern precision.' },
        { selector: '.btn-primary', key: 'Call Now' },
        { selector: '.btn-secondary', key: 'Find Us' },
        { selector: '#services .section-title', key: 'BARBER SERVICES' },
        { selector: '#reviews .section-title', key: 'WHAT CUSTOMERS SAY' },
        { selector: '#contact h2', key: 'READY FOR A FRESH CUT?' },
        { selector: '#hours h2', key: 'SHOP HOURS' },
        { selector: '.location-info h2', key: 'VISIT THE SHOP' },
        { selector: '.contact-lead', key: 'No appointment needed' }
    ];
    
    elementsToTranslate.forEach(item => {
        const element = document.querySelector(item.selector);
        if (element && translations[currentLang][item.key]) {
            if (item.selector === '.hero-title') {
                element.innerHTML = translations[currentLang][item.key].replace('BARBERSHOP', '<span class="accent">BARBERSHOP</span>');
            } else {
                element.textContent = translations[currentLang][item.key];
            }
        }
    });
});

// Current time and business hours checker
function checkBusinessHours() {
    const now = new Date();
    const day = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const hour = now.getHours();
    const minute = now.getMinutes();
    const currentTime = hour * 60 + minute;
    
    // Business hours (convert to minutes)
    const hours = {
        1: null, // Monday - Closed
        2: { open: 630, close: 1080 }, // Tuesday 10:30-18:00
        3: { open: 630, close: 900 },  // Wednesday 10:30-15:00
        4: { open: 630, close: 1080 }, // Thursday 10:30-18:00
        5: { open: 630, close: 1080 }, // Friday 10:30-18:00
        6: { open: 630, close: 900 },  // Saturday 10:30-15:00
        0: null  // Sunday - Closed
    };
    
    const todayHours = hours[day];
    const statusElement = document.querySelector('.business-status');
    
    if (statusElement) {
        if (!todayHours) {
            statusElement.textContent = 'CLOSED TODAY';
            statusElement.className = 'business-status closed';
        } else if (currentTime >= todayHours.open && currentTime <= todayHours.close) {
            statusElement.textContent = 'OPEN NOW';
            statusElement.className = 'business-status open';
        } else {
            statusElement.textContent = 'CLOSED NOW';
            statusElement.className = 'business-status closed';
        }
    }
}

// Add business status indicator
document.addEventListener('DOMContentLoaded', () => {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        const statusDiv = document.createElement('div');
        statusDiv.className = 'business-status';
        statusDiv.style.cssText = `
            display: inline-block;
            padding: 8px 16px;
            margin-bottom: 1rem;
            font-weight: bold;
            border-radius: 20px;
            font-size: 0.9rem;
            letter-spacing: 1px;
        `;
        
        // Insert after hero-badge
        const heroBadge = document.querySelector('.hero-badge');
        if (heroBadge) {
            heroBadge.parentNode.insertBefore(statusDiv, heroBadge.nextSibling);
        }
    }
    
    checkBusinessHours();
    // Update status every minute
    setInterval(checkBusinessHours, 60000);
});

// Add styles for business status
const style = document.createElement('style');
style.textContent = `
    .business-status.open {
        background: #28a745;
        color: white;
    }
    
    .business-status.closed {
        background: #dc143c;
        color: white;
    }
    
    .service-card:hover .service-icon {
        transform: scale(1.2) rotate(5deg);
        transition: transform 0.3s ease;
    }
    
    .vintage-frame:hover {
        transform: rotate(0deg) scale(1.02);
        transition: transform 0.5s ease;
    }
    
    .review-card:hover {
        transform: translateY(-8px) scale(1.02);
    }
    
    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.7; }
    }
    
    .business-status.open {
        animation: pulse 2s infinite;
    }
`;
document.head.appendChild(style);

// Phone number tracking
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', () => {
        console.log('Phone call initiated:', link.href);
        // Add analytics tracking here if needed
    });
});

// Add click effects to service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', function() {
        this.style.transform = 'scale(0.98)';
        setTimeout(() => {
            this.style.transform = 'translateY(-5px)';
        }, 100);
    });
});

// Parallax effect for hero background stripes
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const stripes = document.querySelector('.barber-stripes');
    
    if (stripes) {
        const rate = scrolled * 0.3;
        stripes.style.transform = `translateY(${rate}px) rotate(45deg)`;
    }
});

// Add loading animation for external links
document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.addEventListener('click', function() {
        this.style.opacity = '0.6';
        setTimeout(() => {
            this.style.opacity = '1';
        }, 1500);
    });
});

// Special beer tip easter egg (based on the Yelp review)
let clickCount = 0;
document.querySelector('.logo')?.addEventListener('click', () => {
    clickCount++;
    if (clickCount === 5) {
        const beerTip = document.createElement('div');
        beerTip.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #ffd700;
            color: #1a1a1a;
            padding: 2rem;
            border-radius: 10px;
            text-align: center;
            font-weight: bold;
            z-index: 10000;
            box-shadow: 0 15px 35px rgba(0,0,0,0.3);
        `;
        beerTip.innerHTML = `
            <h3>🍺 Pro Tip! 🍺</h3>
            <p>Karbach Brewery is right down the street and Noe likes his beer,<br>
            so bring him a fresh cerveza for a tip!</p>
            <button onclick="this.parentElement.remove()" style="margin-top: 1rem; padding: 0.5rem 1rem; border: none; background: #dc143c; color: white; border-radius: 5px; cursor: pointer;">Got it!</button>
        `;
        document.body.appendChild(beerTip);
        setTimeout(() => beerTip.remove(), 8000);
        clickCount = 0;
    }
});

// Add barber pole animation speed control
document.addEventListener('mouseover', (e) => {
    if (e.target.closest('.logo-icon')) {
        e.target.style.animationDuration = '1s';
    }
});

document.addEventListener('mouseout', (e) => {
    if (e.target.closest('.logo-icon')) {
        e.target.style.animationDuration = '3s';
    }
});

// Add scroll progress bar with barber pole colors
function addScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 4px;
        background: linear-gradient(90deg, #dc143c, #ffffff, #1a237e);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Initialize scroll progress
document.addEventListener('DOMContentLoaded', addScrollProgress);

// Add click sound effect for buttons (visual feedback)
document.querySelectorAll('.btn, .contact-btn').forEach(button => {
    button.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'translateY(-2px)';
        }, 150);
    });
});

// Add typing effect to hero title
function typeWriter(element, text, speed = 100) {
    element.innerHTML = '';
    let i = 0;
    
    function type() {
        if (i < text.length) {
            if (text.charAt(i) === '<') {
                const tagEnd = text.indexOf('>', i);
                element.innerHTML += text.slice(i, tagEnd + 1);
                i = tagEnd + 1;
            } else {
                element.innerHTML += text.charAt(i);
                i++;
            }
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect on page load
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            const originalText = heroTitle.innerHTML;
            typeWriter(heroTitle, originalText, 80);
        }
    }, 500);
});