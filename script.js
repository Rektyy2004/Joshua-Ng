// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initPreloader();
    initMobileMenu();
    initBackToTop();
    initScrollAnimations();
    initParallaxEffects();
    initActiveNavigation();
    initTypingEffect();
    initRippleButtons();
    initCardHoverEffects();
    initFormSubmission();
    initStaggeredAnimations();
    initWindowResize();
    initSmoothScrolling();
    initCurrentYear();
    initGameCarousels();
    initModals();
    initScrollDirection();
    initCarouselObservers();
    initCarouselHoverEffects();
});

// Preloader
function initPreloader() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
        }, 1000);
    }
}

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenu && navMenu) {
        mobileMenu.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
        });
        
        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
    }
}

// Back to Top Button
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('active');
            } else {
                backToTopBtn.classList.remove('active');
            }
        });
        
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Scroll Animations
function initScrollAnimations() {
    const fadeElements = document.querySelectorAll('.timeline-content, .experience-card, .skill-category, .project-card, .achievement-card, .leadership-card, .game-card, .contact-card, .contact-form');
    
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    fadeElements.forEach(element => {
        fadeObserver.observe(element);
    });
    
    // Enhanced scroll animations with fade in/out
    const animatedElements = document.querySelectorAll('.fade-in, .fade-out');
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    animatedElements.forEach(element => {
        scrollObserver.observe(element);
    });
}

// Parallax Effects
function initParallaxEffects() {
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const heroContent = document.querySelector('.hero-content');
        
        if (hero && heroContent) {
            const rate = scrolled * -0.5;
            heroContent.style.transform = `translateY(${rate}px)`;
        }
    });
    
    // Animate hero shapes
    const shapes = document.querySelectorAll('.shape');
    
    window.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        shapes.forEach((shape, index) => {
            const speed = 0.05 + (index * 0.01);
            const x = (mouseX * 20 * speed) - 10;
            const y = (mouseY * 20 * speed) - 10;
            
            shape.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
}

// Active Navigation
function initActiveNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// Typing Effect
function initTypingEffect() {
    const subtitle = document.querySelector('.subtitle');
    if (subtitle) {
        const originalText = subtitle.textContent;
        subtitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                subtitle.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }
}

// Ripple Buttons
function initRippleButtons() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add CSS for ripple effect
    const style = document.createElement('style');
    style.textContent = `
        .btn {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background-color: rgba(255, 255, 255, 0.7);
            transform: scale(0);
            animation: ripple 0.6s linear;
        }
        
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Card Hover Effects
function initCardHoverEffects() {
    const cards = document.querySelectorAll('.achievement-card, .project-card, .leadership-card, .game-card, .highlight-card, .skill-icon-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 30px rgba(0, 123, 255, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        });
    });
}

// Form Submission
function initFormSubmission() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Simulate form submission
            alert(`Thank you for your message, ${name}! I'll get back to you soon.`);
            contactForm.reset();
        });
    }
}

// Staggered Animations
function initStaggeredAnimations() {
    // Add staggered animation to timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.2}s`;
    });
    
    // Add staggered animation to experience cards
    const experienceCards = document.querySelectorAll('.experience-card');
    experienceCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.2}s`;
    });
    
    // Add staggered animation to skill categories
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach((category, index) => {
        category.style.transitionDelay = `${index * 0.2}s`;
    });
    
    // Add staggered animation to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Add staggered animation to achievement cards
    const achievementCards = document.querySelectorAll('.achievement-card');
    achievementCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Add staggered animation to leadership cards
    const leadershipCards = document.querySelectorAll('.leadership-card');
    leadershipCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Add staggered animation to game cards
    const gameCards = document.querySelectorAll('.game-card');
    gameCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Add staggered animation to contact cards
    const contactCards = document.querySelectorAll('.contact-card');
    contactCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });
}

// Window Resize Handler
function initWindowResize() {
    window.addEventListener('resize', function() {
        if (window.innerWidth > 992) {
            const mobileMenu = document.getElementById('mobile-menu');
            const navMenu = document.querySelector('.nav-menu');
            
            if (mobileMenu && navMenu) {
                mobileMenu.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        }
    });
}

// Smooth Scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Current Year in Footer
function initCurrentYear() {
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}

// Game Carousels
function initGameCarousels() {
    // Initialize all carousels on page
    document.querySelectorAll('.game-image-carousel, .achievement-image-carousel, .leadership-image-carousel').forEach(carousel => {
        const container = carousel.querySelector('.carousel-container');
        const indicators = carousel.querySelectorAll('.indicator');
        const prevBtn = carousel.querySelector('.carousel-prev');
        const nextBtn = carousel.querySelector('.carousel-next');
        
        if (container && indicators.length > 0) {
            // Set up click handlers for indicators
            indicators.forEach((indicator, index) => {
                indicator.addEventListener('click', (e) => {
                    e.stopPropagation();
                    goToCarouselSlide(container, index);
                });
            });
            
            // Set up prev/next buttons
            if (prevBtn) {
                prevBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    changeCarouselSlide(container, -1);
                });
            }
            
            if (nextBtn) {
                nextBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    changeCarouselSlide(container, 1);
                });
            }
        }
    });
}

function changeCarouselSlide(container, direction) {
    const slides = container.querySelectorAll('.carousel-slide');
    const carousel = container.closest('.achievement-image-carousel, .leadership-image-carousel, .game-image-carousel');
    const indicators = carousel ? carousel.querySelectorAll('.indicator') : [];
    
    let activeIndex = Array.from(slides).findIndex(slide => slide.classList.contains('active'));
    
    // Remove active class from current slide and indicator
    if (slides[activeIndex]) slides[activeIndex].classList.remove('active');
    if (indicators[activeIndex]) indicators[activeIndex].classList.remove('active');
    
    // Calculate new index
    let newIndex = activeIndex + direction;
    if (newIndex < 0) newIndex = slides.length - 1;
    if (newIndex >= slides.length) newIndex = 0;
    
    // Add active class to new slide and indicator
    if (slides[newIndex]) slides[newIndex].classList.add('active');
    if (indicators[newIndex]) indicators[newIndex].classList.add('active');
}

function goToCarouselSlide(container, index) {
    const slides = container.querySelectorAll('.carousel-slide');
    const carousel = container.closest('.achievement-image-carousel, .leadership-image-carousel, .game-image-carousel');
    const indicators = carousel ? carousel.querySelectorAll('.indicator') : [];
    
    // Remove active class from all slides and indicators
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    // Add active class to selected slide and indicator
    if (slides[index]) slides[index].classList.add('active');
    if (indicators[index]) indicators[index].classList.add('active');
}

// Modals
function initModals() {
    // Close modals when clicking outside
    document.addEventListener('click', function(event) {
        const achievementModal = document.getElementById('achievementModal');
        const leadershipModal = document.getElementById('leadershipModal');
        const gameModal = document.getElementById('gameModal');
        
        if (achievementModal && achievementModal.classList.contains('active') && event.target === achievementModal) {
            closeAchievementModal();
        }
        
        if (leadershipModal && leadershipModal.classList.contains('active') && event.target === leadershipModal) {
            closeLeadershipModal();
        }
        
        if (gameModal && gameModal.classList.contains('active') && event.target === gameModal) {
            closeGameModal();
        }
    });
    
    // Close modals with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            const achievementModal = document.getElementById('achievementModal');
            const leadershipModal = document.getElementById('leadershipModal');
            const gameModal = document.getElementById('gameModal');
            
            if (achievementModal && achievementModal.classList.contains('active')) {
                closeAchievementModal();
            }
            
            if (leadershipModal && leadershipModal.classList.contains('active')) {
                closeLeadershipModal();
            }
            
            if (gameModal && gameModal.classList.contains('active')) {
                closeGameModal();
            }
        }
    });
}

// Scroll Direction Detection
function initScrollDirection() {
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const st = window.pageYOffset || document.documentElement.scrollTop;
        
        if (st > lastScrollTop) {
            // Downscroll - add fade-in class
            document.querySelectorAll('.fade-in').forEach(el => {
                if (isElementInViewport(el)) {
                    el.classList.add('visible');
                    el.classList.remove('fade-out');
                }
            });
        } else {
            // Upscroll - add fade-out class
            document.querySelectorAll('.fade-out').forEach(el => {
                if (isElementInViewport(el)) {
                    el.classList.add('visible');
                    el.classList.remove('fade-in');
                }
            });
        }
        
        lastScrollTop = st <= 0 ? 0 : st;
    }, false);
}

// Check if element is in viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
    );
}

// Carousel Observers
function initCarouselObservers() {
    const achievementCards = document.querySelectorAll('.achievement-card');
    const leadershipCards = document.querySelectorAll('.leadership-card');
    const gameCards = document.querySelectorAll('.game-card');

    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                cardObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    achievementCards.forEach(card => {
        card.style.animationPlayState = 'paused';
        cardObserver.observe(card);
    });

    leadershipCards.forEach(card => {
        card.style.animationPlayState = 'paused';
        cardObserver.observe(card);
    });

    gameCards.forEach(card => {
        card.style.animationPlayState = 'paused';
        cardObserver.observe(card);
    });
}

// Carousel Hover Effects
function initCarouselHoverEffects() {
    const allCards = document.querySelectorAll('.achievement-card, .leadership-card, .game-card');
    allCards.forEach(card => {
        const carousel = card.querySelector('.achievement-image-carousel') || 
                         card.querySelector('.leadership-image-carousel') || 
                         card.querySelector('.game-image-carousel');
        if (carousel) {
            carousel.addEventListener('mouseenter', () => {
                const prevBtn = carousel.querySelector('.carousel-prev');
                const nextBtn = carousel.querySelector('.carousel-next');
                if (prevBtn) prevBtn.style.opacity = '1';
                if (nextBtn) nextBtn.style.opacity = '1';
            });
            
            carousel.addEventListener('mouseleave', () => {
                const prevBtn = carousel.querySelector('.carousel-prev');
                const nextBtn = carousel.querySelector('.carousel-next');
                if (prevBtn) prevBtn.style.opacity = '0.5';
                if (nextBtn) nextBtn.style.opacity = '0.5';
            });
        }
    });
}

// Achievement Modal Functions
let currentAchievementIndex = 0;
let achievementImages = [];

function openAchievementModal(index) {
    const achievement = achievementData[index];
    
    // Set modal content
    document.getElementById('modalAchievementTitle').textContent = achievement.title;
    document.getElementById('modalAchievementDate').textContent = achievement.date;
    document.getElementById('modalAchievementDescription').textContent = achievement.description;
    
    // Set stats
    const statsContainer = document.getElementById('modalAchievementStats');
    statsContainer.innerHTML = '';
    achievement.stats.forEach(stat => {
        const statItem = document.createElement('div');
        statItem.className = 'stat-item';
        statItem.innerHTML = `
            <div class="stat-value">${stat.value}</div>
            <div class="stat-label">${stat.label}</div>
        `;
        statsContainer.appendChild(statItem);
    });
    
    // Set links
    const linksContainer = document.getElementById('modalAchievementLinks');
    linksContainer.innerHTML = '';
    if (achievement.links && achievement.links.length > 0) {
        achievement.links.forEach(link => {
            const linkElement = document.createElement('a');
            linkElement.href = link.url;
            linkElement.target = '_blank';
            linkElement.className = 'achievement-link';
            linkElement.innerHTML = `
                <i class="${link.icon}"></i> ${link.text}
            `;
            linksContainer.appendChild(linkElement);
        });
    }
    
    // Build modal carousel
    const slidesContainer = document.querySelector('.achievement-modal-slides-container');
    const indicatorsContainer = document.querySelector('.achievement-modal-carousel-indicators');
    
    slidesContainer.innerHTML = '';
    indicatorsContainer.innerHTML = '';
    
    // Store images globally for modal navigation
    achievementImages = achievement.images;
    currentAchievementIndex = 0;
    
    // Create slides and indicators
    achievement.images.forEach((image, i) => {
        // Create slide
        const slide = document.createElement('div');
        slide.className = `achievement-modal-slide ${i === 0 ? 'active' : ''}`;
        slide.innerHTML = `<img src="${image}" alt="${achievement.title} ${i + 1}" loading="lazy">`;
        slidesContainer.appendChild(slide);
        
        // Create indicator
        const indicator = document.createElement('span');
        indicator.className = `achievement-modal-indicator ${i === 0 ? 'active' : ''}`;
        indicator.onclick = () => goToAchievementModalSlide(i);
        indicatorsContainer.appendChild(indicator);
    });
    
    // Show modal
    document.getElementById('achievementModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function changeAchievementModalSlide(direction) {
    const slidesContainer = document.querySelector('.achievement-modal-slides-container');
    const indicators = document.querySelector('.achievement-modal-carousel-indicators');
    
    // Remove active class from current slide and indicator
    const currentSlide = slidesContainer.querySelector('.achievement-modal-slide.active');
    const currentIndicator = indicators.querySelector('.achievement-modal-indicator.active');
    
    if (currentSlide) currentSlide.classList.remove('active');
    if (currentIndicator) currentIndicator.classList.remove('active');
    
    // Calculate new index
    currentAchievementIndex += direction;
    if (currentAchievementIndex < 0) currentAchievementIndex = achievementImages.length - 1;
    if (currentAchievementIndex >= achievementImages.length) currentAchievementIndex = 0;
    
    // Add active class to new slide and indicator
    const newSlide = slidesContainer.querySelectorAll('.achievement-modal-slide')[currentAchievementIndex];
    const newIndicator = indicators.querySelectorAll('.achievement-modal-indicator')[currentAchievementIndex];
    
    if (newSlide) newSlide.classList.add('active');
    if (newIndicator) newIndicator.classList.add('active');
}

function goToAchievementModalSlide(index) {
    const slidesContainer = document.querySelector('.achievement-modal-slides-container');
    const indicators = document.querySelector('.achievement-modal-carousel-indicators');
    
    // Remove active class from all slides and indicators
    slidesContainer.querySelectorAll('.achievement-modal-slide').forEach(slide => slide.classList.remove('active'));
    indicators.querySelectorAll('.achievement-modal-indicator').forEach(indicator => indicator.classList.remove('active'));
    
    // Add active class to selected slide and indicator
    const selectedSlide = slidesContainer.querySelectorAll('.achievement-modal-slide')[index];
    const selectedIndicator = indicators.querySelectorAll('.achievement-modal-indicator')[index];
    
    if (selectedSlide) selectedSlide.classList.add('active');
    if (selectedIndicator) selectedIndicator.classList.add('active');
    
    currentAchievementIndex = index;
}

function closeAchievementModal() {
    document.getElementById('achievementModal').classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Leadership Modal Functions
let currentLeadershipIndex = 0;
let leadershipImages = [];

function openLeadershipModal(index) {
    const leadership = leadershipData[index];
    
    // Set modal content
    document.getElementById('modalLeadershipTitle').textContent = leadership.title;
    document.getElementById('modalLeadershipDate').textContent = leadership.date;
    document.getElementById('modalLeadershipDescription').textContent = leadership.description;
    
    // Set stats
    const statsContainer = document.getElementById('modalLeadershipStats');
    statsContainer.innerHTML = '';
    leadership.stats.forEach(stat => {
        const statItem = document.createElement('div');
        statItem.className = 'stat-item';
        statItem.innerHTML = `
            <div class="stat-value">${stat.value}</div>
            <div class="stat-label">${stat.label}</div>
        `;
        statsContainer.appendChild(statItem);
    });
    
    // Build modal carousel
    const slidesContainer = document.querySelector('.leadership-modal-slides-container');
    const indicatorsContainer = document.querySelector('.leadership-modal-carousel-indicators');
    
    slidesContainer.innerHTML = '';
    indicatorsContainer.innerHTML = '';
    
    // Store images globally for modal navigation
    leadershipImages = leadership.images;
    currentLeadershipIndex = 0;
    
    // Create slides and indicators
    leadership.images.forEach((image, i) => {
        // Create slide
        const slide = document.createElement('div');
        slide.className = `leadership-modal-slide ${i === 0 ? 'active' : ''}`;
        slide.innerHTML = `<img src="${image}" alt="${leadership.title} ${i + 1}" loading="lazy">`;
        slidesContainer.appendChild(slide);
        
        // Create indicator
        const indicator = document.createElement('span');
        indicator.className = `leadership-modal-indicator ${i === 0 ? 'active' : ''}`;
        indicator.onclick = () => goToLeadershipModalSlide(i);
        indicatorsContainer.appendChild(indicator);
    });
    
    // Show modal
    document.getElementById('leadershipModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function changeLeadershipModalSlide(direction) {
    const slidesContainer = document.querySelector('.leadership-modal-slides-container');
    const indicators = document.querySelector('.leadership-modal-carousel-indicators');
    
    // Remove active class from current slide and indicator
    const currentSlide = slidesContainer.querySelector('.leadership-modal-slide.active');
    const currentIndicator = indicators.querySelector('.leadership-modal-indicator.active');
    
    if (currentSlide) currentSlide.classList.remove('active');
    if (currentIndicator) currentIndicator.classList.remove('active');
    
    // Calculate new index
    currentLeadershipIndex += direction;
    if (currentLeadershipIndex < 0) currentLeadershipIndex = leadershipImages.length - 1;
    if (currentLeadershipIndex >= leadershipImages.length) currentLeadershipIndex = 0;
    
    // Add active class to new slide and indicator
    const newSlide = slidesContainer.querySelectorAll('.leadership-modal-slide')[currentLeadershipIndex];
    const newIndicator = indicators.querySelectorAll('.leadership-modal-indicator')[currentLeadershipIndex];
    
    if (newSlide) newSlide.classList.add('active');
    if (newIndicator) newIndicator.classList.add('active');
}

function goToLeadershipModalSlide(index) {
    const slidesContainer = document.querySelector('.leadership-modal-slides-container');
    const indicators = document.querySelector('.leadership-modal-carousel-indicators');
    
    // Remove active class from all slides and indicators
    slidesContainer.querySelectorAll('.leadership-modal-slide').forEach(slide => slide.classList.remove('active'));
    indicators.querySelectorAll('.leadership-modal-indicator').forEach(indicator => indicator.classList.remove('active'));
    
    // Add active class to selected slide and indicator
    const selectedSlide = slidesContainer.querySelectorAll('.leadership-modal-slide')[index];
    const selectedIndicator = indicators.querySelectorAll('.leadership-modal-indicator')[index];
    
    if (selectedSlide) selectedSlide.classList.add('active');
    if (selectedIndicator) selectedIndicator.classList.add('active');
    
    currentLeadershipIndex = index;
}

function closeLeadershipModal() {
    document.getElementById('leadershipModal').classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Game Modal Functions (Fixed to use gameData)
// Game Modal Functions
let currentGameIndex = 0;
let gameModalImages = [];

function openGameModal(index) {
    const game = gameData[index];
    
    // Set modal content
    document.getElementById('modalGameTitle').textContent = game.title;
    document.getElementById('modalGameCompany').textContent = game.company;
    document.getElementById('modalGameDescription').textContent = game.description;
    
    // Set skills
    const skillsContainer = document.getElementById('modalGameSkills');
    skillsContainer.innerHTML = '';
    game.skills.forEach(skill => {
        const skillTag = document.createElement('span');
        skillTag.className = 'game-skill-tag';
        skillTag.textContent = skill;
        skillsContainer.appendChild(skillTag);
    });
    
    // Set stats
    const statsContainer = document.getElementById('modalGameStats');
    statsContainer.innerHTML = '';
    game.stats.forEach(stat => {
        const statItem = document.createElement('div');
        statItem.className = 'stat-item';
        statItem.innerHTML = `
            <div class="stat-value">${stat.value}</div>
            <div class="stat-label">${stat.label}</div>
        `;
        statsContainer.appendChild(statItem);
    });
    
    // Check if modal has carousel structure or single image
    const gameModal = document.getElementById('gameModal');
    
    // If modal has carousel structure, update it
    if (gameModal.querySelector('.game-modal-carousel')) {
        // Build modal carousel
        const slidesContainer = gameModal.querySelector('.game-modal-slides-container');
        const indicatorsContainer = gameModal.querySelector('.game-modal-carousel-indicators');
        
        slidesContainer.innerHTML = '';
        indicatorsContainer.innerHTML = '';
        
        // Store images globally for modal navigation
        gameModalImages = game.images;
        currentGameIndex = 0;
        
        // Create slides and indicators
        game.images.forEach((image, i) => {
            // Create slide
            const slide = document.createElement('div');
            slide.className = `game-modal-slide ${i === 0 ? 'active' : ''}`;
            slide.innerHTML = `<img src="${image}" alt="${game.title} ${i + 1}" loading="lazy">`;
            slidesContainer.appendChild(slide);
            
            // Create indicator
            const indicator = document.createElement('span');
            indicator.className = `game-modal-indicator ${i === 0 ? 'active' : ''}`;
            indicator.onclick = () => goToGameModalSlide(i);
            indicatorsContainer.appendChild(indicator);
        });
    } else {
        // Single image modal - update image
        const modalImage = document.getElementById('modalGameImage');
        if (modalImage && game.images.length > 0) {
            modalImage.src = game.images[0];
            modalImage.alt = game.title;
        }
    }
    
    // Show modal
    gameModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function changeGameModalSlide(direction) {
    const slidesContainer = document.querySelector('.game-modal-slides-container');
    const indicators = document.querySelector('.game-modal-carousel-indicators');
    
    if (!slidesContainer || !indicators) return;
    
    // Remove active class from current slide and indicator
    const currentSlide = slidesContainer.querySelector('.game-modal-slide.active');
    const currentIndicator = indicators.querySelector('.game-modal-indicator.active');
    
    if (currentSlide) currentSlide.classList.remove('active');
    if (currentIndicator) currentIndicator.classList.remove('active');
    
    // Calculate new index
    currentGameIndex += direction;
    if (currentGameIndex < 0) currentGameIndex = gameModalImages.length - 1;
    if (currentGameIndex >= gameModalImages.length) currentGameIndex = 0;
    
    // Add active class to new slide and indicator
    const newSlide = slidesContainer.querySelectorAll('.game-modal-slide')[currentGameIndex];
    const newIndicator = indicators.querySelectorAll('.game-modal-indicator')[currentGameIndex];
    
    if (newSlide) newSlide.classList.add('active');
    if (newIndicator) newIndicator.classList.add('active');
}

function goToGameModalSlide(index) {
    const slidesContainer = document.querySelector('.game-modal-slides-container');
    const indicators = document.querySelector('.game-modal-carousel-indicators');
    
    if (!slidesContainer || !indicators) return;
    
    // Remove active class from all slides and indicators
    slidesContainer.querySelectorAll('.game-modal-slide').forEach(slide => slide.classList.remove('active'));
    indicators.querySelectorAll('.game-modal-indicator').forEach(indicator => indicator.classList.remove('active'));
    
    // Add active class to selected slide and indicator
    const selectedSlide = slidesContainer.querySelectorAll('.game-modal-slide')[index];
    const selectedIndicator = indicators.querySelectorAll('.game-modal-indicator')[index];
    
    if (selectedSlide) selectedSlide.classList.add('active');
    if (selectedIndicator) selectedIndicator.classList.add('active');
    
    currentGameIndex = index;
}

function closeGameModal() {
    const gameModal = document.getElementById('gameModal');
    if (gameModal) {
        gameModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Achievement Data
const achievementData = [
    {
        title: "Malaysia Book of Records (MBOR) 2023",
        date: "National Recognition • 2023",
        images: [
            "image/mbor-1.jpg",
            "image/mbor-2.jpg",
            "image/mbor-3.jpg",
            "image/mbor-4.jpg"
        ],
        description: "Officially recognized by Malaysia Book of Records for setting a national record by completing the most one-arm push-ups in one minute (60 pushups). This achievement demonstrates exceptional physical strength, discipline, determination, and mental fortitude. The record was achieved through rigorous training and dedication over several months.",
        stats: [
            { value: "55", label: "One-arm Pushups" },
            { value: "1 Minute", label: "Time Record" },
            { value: "National", label: "Recognition Level" },
            { value: "2023", label: "Year Achieved" }
        ],
        links: [
            { text: "View Official Record", url: "https://www.malaysiabookofrecords.my/records-library/human-achievements?winner=264", icon: "fas fa-external-link-alt" },
            { text: "Watch Push-up Video", url: "https://www.instagram.com/p/CyhgI1rpAVO/", icon: "fab fa-instagram" }
        ]
    },
    {
        title: "Boys' Brigade Founder's Award 2024",
        date: "Highest Distinction • 2024",
        images: [
            "image/founder-1.jpg",
            "image/founder-2.jpg",
            "image/founder-3.jpg",
            "image/founder-4.jpg",
            "image/founder-5.jpg",
            "image/founder-6.jpg"
        ],
        description: "Awarded the highest distinction in Boys' Brigade Malaysia for exemplary leadership, exceptional dedication to service, and impactful contributions to the organization and community. This award represents the culmination of years of commitment, leadership development, and community service within the Boys' Brigade organization.",
        stats: [
            { value: "Highest", label: "Distinction Level" },
            { value: "Leadership", label: "Primary Focus" },
            { value: "Community", label: "Impact Area" },
            { value: "2024", label: "Year Awarded" }
        ],
        links: []
    },
    {
        title: "Boys' Brigade President's Award 2023",
        date: "2023",
        images: [
            "image/president-1.jpg",
            "image/president-2.jpg"
        ],
        description: "Honored for comprehensive development, showcasing remarkable growth in areas of physical fitness, social responsibility, educational excellence, and spiritual maturity. This award recognizes well-rounded personal development and commitment to the Boys' Brigade's core values and principles.",
        stats: [
            { value: "Comprehensive", label: "Development" },
            { value: "4 Areas", label: "Development Focus" },
            { value: "Personal", label: "Growth Category" },
            { value: "2023", label: "Year Awarded" }
        ],
        links: []
    },
    {
        title: "Personal Investment Tournament (Champion) 2023",
        date: "2023",
        images: [
            "image/investment-1.jpg",
        ],
        description: "Secured first place in a competitive stock market simulation by achieving the highest profit percentage over one week. This achievement reflects strong analytical skills, risk assessment capabilities, strategic thinking, and decision-making abilities in financial markets under time pressure.",
        stats: [
            { value: "1st Place", label: "Tournament Result" },
            { value: "Highest Profit", label: "Achievement" },
            { value: "1 Month", label: "Duration" },
            { value: "Analytical", label: "Skills Demonstrated" }
        ],
        links: []
    },
    {
        title: "Math x Programming Competition (2nd Runner-Up) 2023",
        date: "2023",
        images: [
            "image/math-1.jpg",
        ],
        description: "Placed third in a high-pressure, one-hour competition on HackerRank, solving complex math and programming problems. This achievement showcases technical proficiency, logical thinking, problem-solving abilities, and the capacity to perform under time constraints in a competitive environment.",
        stats: [
            { value: "3rd Place", label: "Competition Result" },
            { value: "6 Hour", label: "Time Limit" },
            { value: "HackerRank", label: "Platform" },
            { value: "Problem Solving", label: "Skills Demonstrated" }
        ],
        links: []
    },
    {
        title: "Bonding Event – 70th Launch Party",
        date: "2024",
        images: [
            "image/bonding-1.jpg"
        ],
        description: "Organised as part of the 70th Anniversary celebration, this bonding event united members from 1st KL Boys’ Brigade (BB) and Girls’ Brigade (GB) for an afternoon of meaningful connection and fun. Guided by the theme “Unstoppable Spirit” and inspired by 2 Timothy 1:7, the event focused on breaking the ice, strengthening friendships, and fostering unity across different age groups through interactive activities and shared experiences.",
        stats: [
            { value: "Non-Competitive", label: "Event Type" },
            { value: "250 Pax", label: "Participants" },
            { value: "Organising Committee", label: "Role" },
            { value: "Teamwork, Communication, Leadership", label: "Skills Demonstrated" }
        ],
        links: []
    }

];

// Leadership Data
const leadershipData = [
    {
        title: "Organizing Chairman, KUL Game 2025",
        date: "KL State Boys' Brigade • Jan 2025 – Jun 2025",
        images: [
            "image/organizing-1.jpg",
            "image/organizing-2.jpg",
            "image/organizing-3.jpg"
        ],
        description: "Planned and executed a state-level sporting event by coordinating logistics, managing volunteer teams, and ensuring smooth operations for 300+ participants across multiple sports disciplines. Responsibilities included budget management, venue coordination, scheduling, and stakeholder communication.",
        stats: [
            { value: "300+", label: "Participants" },
            { value: "State Level", label: "Event Scale" },
            { value: "6 Months", label: "Planning Duration" },
            { value: "Logistics", label: "Primary Focus" }
        ]
    },
    {
        title: "Staff Sergeant",
        date: "1st Kuala Lumpur Boys' Brigade Company • Nov 2024 – Aug 2025",
        images: [
            "image/staff-1.jpg",
            "image/staff-2.jpg",
            "image/staff-3.JPG",
            "image/staff-4.JPG"
        ],
        description: "Led training sessions, mentored junior members, and ensured discipline within the company. Developed leadership programs and coordinated weekly activities for 80+ members. Responsibilities included training curriculum development, performance evaluation, and team building activities.",
        stats: [
            { value: "80+", label: "Team Members" },
            { value: "Training", label: "Primary Role" },
            { value: "Mentoring", label: "Key Responsibility" },
            { value: "Discipline", label: "Focus Area" }
        ]
    },
    {
        title: "President, MCKL Student Union",
        date: "MCKL Diploma Student Union • Dec 2023 – Dec 2024",
        images: [
            "image/president-su-1.jpg",
            "image/president-su-2.png",
            "image/president-su-3.png"
        ],
        description: "Represented 500+ student interests, coordinated 12 major events, and strengthened communication between students and administration. Implemented feedback systems and improved student services. Responsibilities included budget allocation, event planning, and policy advocacy.",
        stats: [
            { value: "500+", label: "Students Represented" },
            { value: "12 Events", label: "Coordinated" },
            { value: "1 Year", label: "Term Duration" },
            { value: "Advocacy", label: "Primary Role" }
        ]
    },
    {
        title: "Volunteer Teacher",
        date: "Pertubuhan Kebajikan Mikhalai • 2024 (60 hours)",
        images: [
            "image/teacher-1.jpg",
            "image/teacher-2.jpg",
            "image/teacher-3.jpg"
        ],
        description: "Taught 30+ underprivileged children aged 7–17 with patience and dedication, addressing behavioral challenges and fostering learning. Developed customized teaching materials and progress tracking systems. Focused on creating inclusive learning environments and adapting teaching methods to individual needs.",
        stats: [
            { value: "30+", label: "Children Taught" },
            { value: "60 Hours", label: "Volunteer Time" },
            { value: "Customized", label: "Teaching Materials" },
            { value: "7-17 Years", label: "Age Range" }
        ]
    },
    {
        title: "Environmental Volunteer",
        date: "Tzu Chi Foundation • 2023 (24 hours)",
        images: [
            "image/environment-1.jpg",
            "image/environment-2.png"
        ],
        description: "Participated in recycling activities, promoted environmental awareness, and supported community sustainability initiatives. Collected and sorted 200+ kg of recyclable materials. Engaged in community education programs about environmental conservation and sustainable practices.",
        stats: [
            { value: "200+ kg", label: "Recyclables Collected" },
            { value: "24 Hours", label: "Volunteer Time" },
            { value: "Community", label: "Education Focus" },
            { value: "Sustainability", label: "Primary Goal" }
        ]
    },
    {
        title: "Community Service Volunteer",
        date: "Jubilee Home • 2024 (10 hours)",
        images: [
            "image/community-1.jpg",
            "image/community-2.jpg",
            "image/community-3.jpg",
            "image/community-4.jpg"
        ],
        description: "Conducted home visits, cleanup activities, and organized donations for 50+ residents. Coordinated volunteer teams and managed resource distribution for elderly care services. Focused on improving quality of life for elderly residents through personalized care and community support.",
        stats: [
            { value: "50+", label: "Residents Served" },
            { value: "10 Hours", label: "Volunteer Time" },
            { value: "Elderly Care", label: "Service Focus" },
            { value: "Resource", label: "Management Role" }
        ]
    },
    {
        title: "Sergeant",
        date: "1st Kuala Lumpur Boys' Brigade Company • May 2022 – Nov 2024",
        images: [
            "image/sergeant-1.png",
            "image/sergeant-2.jpg",
            "image/sergeant-3.JPG",
            "image/sergeant-4.jpg",
            "image/sergeant-4.jpg",
            "image/sergeant-4.jpg"
        ],
        description: "Supervised training sessions, maintained discipline, and coordinated weekly company programs for 60+ members. Developed junior leadership skills and organized community outreach initiatives. Responsibilities included program coordination, performance monitoring, and community engagement planning.",
        stats: [
            { value: "60+", label: "Members Supervised" },
            { value: "2.5 Years", label: "Service Duration" },
            { value: "Weekly", label: "Program Coordination" },
            { value: "Leadership", label: "Development Focus" }
        ]
    }
];

// Game Data
const gameData = [
    {
        title: "Clash Royale",
        company: "Supercell",
        images: [
            "image/clash-royale-1.jpg",
            "image/clash-royale-2.jpg",
            "image/clash-royale-3.jpg"
        ],
        description: "Achieved 12,000 Trophy Road and reached Ultimate Champion status. Maxed 12-win challenge records multiple times, demonstrating elite deck optimization, real-time strategy execution, and tournament-level decision-making under pressure. Consistently ranked in top regional brackets.",
        skills: ["Strategic Thinking", "Deck Optimization", "Real-time Decision Making", "Tournament Strategy", "Resource Management", "Adaptive Play", "Meta Analysis"],
        stats: [
            { value: "12,000", label: "Trophy Road" },
            { value: "Ultimate", label: "Champion Rank" },
            { value: "12-Win", label: "Challenge Max" },
            { value: "Top 5%", label: "Global Ranking" }
        ]
    },
    {
        title: "Clash of Clans",
        company: "Supercell",
        images: [
            "image/coc-base-1.jpg",
            "image/coc-base-2.jpg",
        ],
        description: "Level 245 account with Town Hall 18 fully upgraded. Ranked Electro 31 in main village, Builder Base League Emerald III. Expert in war strategy, base design optimization, and long-term resource planning. Led multiple successful war clans to victory.",
        skills: ["Base Design Strategy", "War Planning", "Long-term Resource Management", "Team Leadership", "Defensive Strategy", "Attack Coordination", "Progress Optimization"],
        stats: [
            { value: "Level 245", label: "Account Level" },
            { value: "TH 18", label: "Town Hall" },
            { value: "Electro 31", label: "League Rank" },
            { value: "90%", label: "War Win Rate" }
        ]
    },
    {
        title: "Hay Day",
        company: "Supercell",
        images: [
            "image/hayday-farm-1.jpg",
            "image/hayday-farm-2.jpg",
            "image/hayday-farm-3.jpg",
            "image/hayday-farm-4.jpg",
            "image/hayday-farm-5.jpg"
        ],
        description: "Level 124 farm with wealth exceeding 90% of players globally. Mastered supply chain management, market timing, and economic optimization in a farming simulation. Built efficient production systems and maximized profitability through strategic trading.",
        skills: ["Economic Management", "Supply Chain Optimization", "Market Timing", "Production Planning", "Resource Allocation", "Trading Strategy", "Efficiency Optimization"],
        stats: [
            { value: "Level 124", label: "Farm Level" },
            { value: "Top 10%", label: "Global Wealth" },
            { value: "90%+", label: "Market Efficiency" },
            { value: "Max", label: "Production Chains" }
        ]
    },
    {
        title: "Squad Busters",
        company: "Supercell",
        images: [
            "image/squad-busters-1.jpg",
        ],
        description: "All 7 heroes fully maxed with optimal builds and strategies. Consistently ranked Top 200 globally in competitive leaderboards. Demonstrated mastery of team composition, synergy understanding, and competitive ranking strategies in this fast-paced brawler.",
        skills: ["Team Composition", "Synergy Optimization", "Global Competition", "Character Mastery", "Ranking Strategy", "Quick Adaptation", "Combo Execution"],
        stats: [
            { value: "Top 200", label: "Global Rank" },
            { value: "7/7", label: "Heroes Maxed" },
            { value: "99%", label: "Win Efficiency" },
            { value: "Elite", label: "Competitive Tier" }
        ]
    },
    {
        title: "Honor of Kings",
        company: "TiMi Studio Group / Tencent",
        images: [
            "image/hok-int-1.jpg",
            "image/hok-int-2.jpg",
            "image/hok-int-3.jpg",
            "image/hok-int-4.jpg"
        ],
        description: "Rank 100★ with Peak Rank 2100 on International Server. Recognized as one of the strongest Asia server players for Liu Shan, Ming Shiyin, and Da Qiao. Demonstrated elite macro control, team coordination, and support mastery in high-level competitive play.",
        skills: ["Macro Game Control", "Team Coordination", "Support Role Mastery", "Hero Specialization", "Map Awareness", "Objective Control", "Shot Calling"],
        stats: [
            { value: "100★", label: "Current Rank" },
            { value: "2100", label: "Peak Rank" },
            { value: "Asia Top", label: "Server Standing" },
            { value: "3 Heroes", label: "Specialized" }
        ]
    },
    {
        title: "王者荣耀",
        company: "TiMi Studio Group / Tencent",
        images: [
            "image/wzry-1.png",
            "image/wzry-2.jpg",
        ],
        description: "Achieved 150★ with Peak Rank 2100 on the original Chinese server. Earned 小国标刘禅 (Small National Rank – Liu Shan), reflecting top-tier performance and hero specialization at a national competitive level. Dominated Chinese server meta with strategic innovations.",
        skills: ["National Ranking", "Hero Specialization", "Competitive Play", "Server Dominance", "Meta Adaptation", "Cultural Understanding", "Team Synergy"],
        stats: [
            { value: "150★", label: "Current Rank" },
            { value: "2100", label: "Peak Rank" },
            { value: "National", label: "Rank Badge" },
            { value: "CN Server", label: "Competitive" }
        ]
    },
    {
        title: "Mobile Legends: Bang Bang",
        company: "Moonton",
        images: [
            "image/mlbb-1.jpg",
            "image/mlbb-2.jpg",
            "image/mlbb-3.jpg",
            "image/mlbb-4.jpg"
        ],
        description: "Mythic Glory 50★ with global hero rankings for Tigreal, Lunox, Chang'e, and Moskov. Demonstrated versatility across multiple roles and mastery of the Southeast Asian MOBA meta. Consistently carried teams to victory through strategic leadership.",
        skills: ["Role Versatility", "Hero Pool Depth", "Meta Adaptation", "Global Ranking", "Team Synergy", "Carry Potential", "Strategic Leadership"],
        stats: [
            { value: "Mythic 58★", label: "Highest Rank" },
            { value: "4 Heroes", label: "Global Ranking" },
            { value: "SEA", label: "Server Region" },
            { value: "85%", label: "Win Rate" }
        ]
    },
    {
        title: "PUBG Mobile",
        company: "PUBG Corporation / Tencent",
        images: [
            "image/pubg-1.jpg",
            "image/pubg-2.jpg",
        ],
        description: "Conqueror Rank (C2S6) with Top 100 Global survival time. Demonstrated elite positioning, tactical awareness, late-game strategy, and squad leadership in competitive battle royale. Excelled in both solo and squad gameplay with high kill-death ratios.",
        skills: ["Tactical Positioning", "Survival Strategy", "Squad Leadership", "Late-game Decision Making", "Map Awareness", "Weapon Mastery", "Zone Prediction"],
        stats: [
            { value: "Conqueror", label: "Highest Rank" },
            { value: "Top 100", label: "Survival Global" },
            { value: "C2S6", label: "Season Peak" },
            { value: "3.0 K/D", label: "Kill-Death Ratio" }
        ]
    }
];