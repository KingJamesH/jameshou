// Function to load page content
async function loadPage(path) {
    try {
        // Fetch the new page
        const response = await fetch(path);
        const html = await response.text();
        
        // Parse the HTML
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        // Update the main content
        const newContent = doc.querySelector('main').innerHTML;
        document.querySelector('main').innerHTML = newContent;
        
        // Update the page title
        document.title = doc.title;
        
        // Update the URL without reload
        window.history.pushState({}, '', path);
        
        // Update active navigation
        updateActiveLink();
        
        // Scroll to top
        window.scrollTo(0, 0);
        
        // Re-initialize animations
        initAnimations();
    } catch (error) {
        console.error('Error loading page:', error);
        // Fallback to full page load if there's an error
        window.location.href = path;
    }
}

// Update active link in navigation
function updateActiveLink() {
    const path = window.location.pathname;
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === path || 
           (path.endsWith('/') && link.getAttribute('href') + '/' === path)) {
            link.classList.add('active');
        }
    });
}

// Initialize animations
function initAnimations() {
    // Reset all fade-in elements
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Trigger animations
    animateOnScroll();
}

// Handle navigation
function handleNavigation(e) {
    // Handle internal anchor links
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
        return;
    }
    
    // Handle internal page navigation
    const link = e.target.closest('a[href^="/"]');
    if (link) {
        e.preventDefault();
        const path = link.getAttribute('href');
        loadPage(path);
    }
}

// Event listeners
document.addEventListener('click', handleNavigation);

// Handle browser back/forward buttons
window.addEventListener('popstate', () => {
    loadPage(window.location.pathname);
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    updateActiveLink();
    initAnimations();
});

const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    
    lastScroll = currentScroll;
});

const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').includes(current)) {
            item.classList.add('active');
        }
    });
});

const animateOnScroll = () => {
    const elements = document.querySelectorAll('.fade-in');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    animateOnScroll();
});

window.addEventListener('scroll', animateOnScroll);

const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });
}

const navLinksList = document.querySelectorAll('.nav-links a');
navLinksList.forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        }
    });
});

const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
}

const currentYear = new Date().getFullYear();
const yearElement = document.querySelector('.current-year');
if (yearElement) {
    yearElement.textContent = currentYear;
}
