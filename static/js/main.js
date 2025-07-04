document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    if (anchor.getAttribute('href').startsWith('#')) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.classList.add('highlight-scroll-target');
                
                const start = window.pageYOffset;
                const target = targetElement.offsetTop - 100;
                const distance = target - start;
                const startTime = performance.now();
                const duration = 300; 
                
                function scrollStep(timestamp) {
                    const elapsed = timestamp - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    
                    const easeInOut = t => t<.5 ? 2*t*t : -1+(4-2*t)*t;
                    
                    window.scrollTo(0, start + (distance * easeInOut(progress)));
                    
                    if (progress < 1) {
                        window.requestAnimationFrame(scrollStep);
                    }
                }
                
                window.requestAnimationFrame(scrollStep);
                
                setTimeout(() => {
                    targetElement.classList.remove('highlight-scroll-target');
                }, 2000);
            }
        });
    }
});

let isScrolling = false;
window.addEventListener('scroll', () => {
    if (isScrolling) return;
    
    isScrolling = true;
    requestAnimationFrame(() => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            navbar.classList.remove('scroll-up');
            isScrolling = false;
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
        isScrolling = false;
    });
}, { passive: true });

if (window.location.pathname === '/') {
    const navItems = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section[id]');

    function updateActiveNav() {
        let current = '';
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (scrollPosition >= sectionTop - 200 && scrollPosition < sectionTop + sectionHeight - 200) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (current && item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    }

    updateActiveNav();

    let isScrolling;
    window.addEventListener('scroll', () => {
        window.clearTimeout(isScrolling);
        isScrolling = setTimeout(updateActiveNav, 50);
    }, false);
}

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
    gsap.registerPlugin(ScrollTrigger);
    document.querySelectorAll('[data-animate]').forEach(el => {
        const animation = el.getAttribute('data-animate') || 'fadeIn';
        const delay = parseFloat(el.getAttribute('data-delay')) || 0;
        const duration = parseFloat(el.getAttribute('data-duration')) || 1;
        
        gsap.from(el, {
            opacity: 0,
            y: 50,
            duration: duration,
            delay: delay,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: el,
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
    });
    
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach((el, i) => {
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
