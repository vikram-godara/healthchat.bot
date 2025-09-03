// Wait for the DOM to be fully loaded before running scripts
document.addEventListener('DOMContentLoaded', () => {

    // --- Theme Toggle Functionality ---
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    const themeHandleIcon = document.querySelector('.theme-toggle-handle i');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    // Function to apply the theme
    const applyTheme = (theme) => {
        if (theme === 'dark') {
            body.classList.add('dark-mode');
            themeHandleIcon.className = 'fas fa-moon';
        } else {
            body.classList.remove('dark-mode');
            themeHandleIcon.className = 'fas fa-sun';
        }
    };

    // Load saved theme or use system preference
    const savedTheme = localStorage.getItem('theme') || (prefersDark.matches ? 'dark' : 'light');
    applyTheme(savedTheme);

    // Event listener for the toggle button
    themeToggle.addEventListener('click', () => {
        const newTheme = body.classList.contains('dark-mode') ? 'light' : 'dark';
        applyTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // --- Mobile Menu Functionality ---
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');
    const mobileMenuIcon = mobileMenuBtn.querySelector('i');

    mobileMenuBtn.addEventListener('click', () => {
        const isOpen = mobileNav.classList.toggle('active');
        mobileMenuIcon.className = isOpen ? 'fas fa-times' : 'fas fa-bars';
        body.style.overflow = isOpen ? 'hidden' : '';
    });
    
    // Close mobile menu when a link is clicked
    mobileNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            mobileMenuIcon.className = 'fas fa-bars';
            body.style.overflow = '';
        });
    });


    // --- Scroll-based Animations & Effects ---
    const header = document.querySelector('header');
    const scrollProgress = document.getElementById('scrollProgress');
    
    const handleScroll = () => {
        // Header style change on scroll
        if (window.scrollY > 50) {
            header.style.boxShadow = 'var(--shadow-lg)';
        } else {
            header.style.boxShadow = 'none';
        }

        // Scroll progress bar
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        scrollProgress.style.width = `${scrollPercent}%`;
    };

    window.addEventListener('scroll', handleScroll);

    // --- Intersection Observer for Fade-in Animations ---
    const fadeInElements = document.querySelectorAll('.fade-in');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeInElements.forEach(el => observer.observe(el));


    // --- Animated Counter for Stats Section ---
    const statsSection = document.querySelector('.stats');
    const counters = document.querySelectorAll('[data-count]');

    const animateCounter = (element) => {
        const target = +element.dataset.count;
        let current = 0;
        const duration = 2000;
        const increment = target / (duration / 16);

        const updateCount = () => {
            current += increment;
            if (current < target) {
                if(target > 1000) {
                   element.textContent = Math.ceil(current/1000) + 'K+';
                } else if(element.dataset.count === '98'){
                   element.textContent = Math.ceil(current) + '%';
                } else {
                   element.textContent = Math.ceil(current);
                }
                requestAnimationFrame(updateCount);
            } else {
                element.textContent = target + (element.dataset.count === '98' ? '%' : (target > 1000 ? 'K+' : ''));
            }
        };
        requestAnimationFrame(updateCount);
    };
    
    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                counters.forEach(animateCounter);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // --- Button Loading States ---
    const actionButtons = document.querySelectorAll('#chatBtn, #startConversationBtn, #getPlatformsBtn');
    actionButtons.forEach(button => {
        const originalContent = button.innerHTML;
        button.addEventListener('click', () => {
            button.innerHTML = '<div class="loading-spinner"></div>';
            button.disabled = true;

            setTimeout(() => {
                button.innerHTML = originalContent;
                button.disabled = false;
                // You would typically add navigation or other actions here
                alert('Action completed!');
            }, 1500);
        });
    });

    console.log('Swasthya Sahayak platform initialized successfully.');
});