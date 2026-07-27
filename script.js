'use strict';

const EMAIL_ADDRESS = 'joshuang.ng2004@gmail.com';
const PROFILE_FALLBACK = 'assets/profile-fallback.svg';
const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

let commandReturnFocus = null;
let mediaReturnFocus = null;
let toastTimer = 0;

if (document.documentElement) {
    document.documentElement.classList.add('js', 'js-ready');
}

document.addEventListener('DOMContentLoaded', () => {
    initPortfolioView();
    initMetricCounters();
    initScrollProgress();
    initCopyEmail();
    initMobileNavigation();
    initSectionNavigation();
    initRevealAnimations();
    initCommandPalette();
    initMediaModal();
    initImageFallbacks();
    initContactForm();
    initBackToTop();
    initCurrentYear();
    initCardSpotlight();
    initNetworkCanvas();
});

function getStoredProfileMode() {
    try {
        return localStorage.getItem('profileMode');
    } catch (error) {
        return null;
    }
}

function storeProfileMode(mode) {
    try {
        localStorage.setItem('profileMode', mode);
    } catch (error) {
        // The page still works when storage is unavailable, such as file privacy mode
    }
}

function setProfileMode(mode, options = {}) {
    const nextMode = mode === 'full' ? 'full' : 'recruiter';
    const isFull = nextMode === 'full';
    const body = document.body;
    const html = document.documentElement;
    const headerToggle = document.getElementById('portfolioViewToggle');
    const extendedToggle = document.getElementById('extendedPortfolioToggle');

    body.dataset.portfolioView = nextMode;
    html.dataset.profileMode = nextMode;

    if (headerToggle) {
        headerToggle.setAttribute('aria-pressed', String(isFull));
        headerToggle.setAttribute('aria-expanded', String(isFull));
        const label = headerToggle.querySelector('.mode-label');
        if (label) label.textContent = isFull ? 'Full profile' : 'Recruiter view';
    }

    if (extendedToggle) {
        extendedToggle.setAttribute('aria-expanded', String(isFull));
        extendedToggle.textContent = isFull ? 'Return to Recruiter View' : 'Explore Full Profile';
    }

    storeProfileMode(nextMode);

    if (options.announce !== false) {
        showToast(isFull ? 'Full portfolio opened.' : 'Recruiter-focused view restored.');
    }

    if (isFull && options.scrollToGames) {
        window.setTimeout(() => {
            document.getElementById('games')?.scrollIntoView({ behavior: reducedMotionQuery.matches ? 'auto' : 'smooth', block: 'start' });
        }, 60);
    }
}

function initPortfolioView() {
    const headerToggle = document.getElementById('portfolioViewToggle');
    const extendedToggle = document.getElementById('extendedPortfolioToggle');
    const stored = getStoredProfileMode();
    setProfileMode(stored === 'full' ? 'full' : 'recruiter', { announce: false });

    headerToggle?.addEventListener('click', () => {
        const full = document.body.dataset.portfolioView === 'full';
        setProfileMode(full ? 'recruiter' : 'full');
    });

    extendedToggle?.addEventListener('click', () => {
        const full = document.body.dataset.portfolioView === 'full';
        setProfileMode(full ? 'recruiter' : 'full', { scrollToGames: !full });
    });
}

function initMetricCounters() {
    const counters = [...document.querySelectorAll('[data-counter]')];
    if (!counters.length) return;

    const renderFinal = (element) => {
        const target = Number(element.dataset.counter || 0);
        element.textContent = `${target.toLocaleString('en-IE')}${element.dataset.suffix || ''}`;
    };

    if (reducedMotionQuery.matches || !('IntersectionObserver' in window)) {
        counters.forEach(renderFinal);
        return;
    }

    counters.forEach((counter) => {
        counter.textContent = `0${counter.dataset.suffix || ''}`;
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const element = entry.target;
            const target = Number(element.dataset.counter || 0);
            const suffix = element.dataset.suffix || '';
            const duration = 900;
            const startedAt = performance.now();

            const tick = (now) => {
                const progress = Math.min((now - startedAt) / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                const current = Math.round(target * eased);
                element.textContent = `${current.toLocaleString('en-IE')}${suffix}`;
                if (progress < 1) requestAnimationFrame(tick);
            };

            requestAnimationFrame(tick);
            observer.unobserve(element);
        });
    }, { threshold: 0.42 });

    counters.forEach((counter) => observer.observe(counter));
}

function initScrollProgress() {
    const progress = document.querySelector('#scrollProgress span');
    const header = document.getElementById('siteHeader');
    const backToTop = document.getElementById('backToTop');
    if (!progress) return;

    let ticking = false;
    const update = () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
        progress.style.width = `${Math.min((scrollTop / maxScroll) * 100, 100)}%`;
        header?.classList.toggle('is-scrolled', scrollTop > 20);
        backToTop?.classList.toggle('is-visible', scrollTop > 650);
        ticking = false;
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(update);
            ticking = true;
        }
    }, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    update();
}

async function copyEmail(value = EMAIL_ADDRESS) {
    try {
        if (navigator.clipboard?.writeText && window.isSecureContext) {
            await navigator.clipboard.writeText(value);
        } else {
            const helper = document.createElement('textarea');
            helper.value = value;
            helper.setAttribute('readonly', '');
            helper.style.position = 'fixed';
            helper.style.opacity = '0';
            document.body.appendChild(helper);
            helper.select();
            const copied = document.execCommand('copy');
            helper.remove();
            if (!copied) throw new Error('Copy command was rejected');
        }
        showToast('Email address copied.');
        return true;
    } catch (error) {
        showToast(`Copy unavailable. Email: ${value}`);
        return false;
    }
}

function initCopyEmail() {
    document.querySelectorAll('[data-copy-email]').forEach((button) => {
        button.addEventListener('click', () => copyEmail(button.dataset.copyEmail || EMAIL_ADDRESS));
    });
}

function initMobileNavigation() {
    const button = document.getElementById('mobileMenu');
    const nav = document.getElementById('primaryNav');
    if (!button || !nav) return;

    const close = () => {
        button.setAttribute('aria-expanded', 'false');
        button.setAttribute('aria-label', 'Open navigation');
        nav.classList.remove('is-open');
        button.classList.remove('is-open');
    };

    button.addEventListener('click', () => {
        const isOpen = button.getAttribute('aria-expanded') === 'true';
        button.setAttribute('aria-expanded', String(!isOpen));
        button.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
        nav.classList.toggle('is-open', !isOpen);
        button.classList.toggle('is-open', !isOpen);
    });

    nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', close));
    window.addEventListener('resize', () => {
        if (window.innerWidth > 980) close();
    }, { passive: true });
}

function initSectionNavigation() {
    const navLinks = [...document.querySelectorAll('.primary-nav a[href^="#"]')];
    const targets = navLinks
        .map((link) => document.querySelector(link.getAttribute('href')))
        .filter(Boolean);

    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener('click', (event) => {
            const href = link.getAttribute('href');
            if (!href || href === '#') return;
            const target = document.querySelector(href);
            if (!target) return;
            event.preventDefault();
            target.scrollIntoView({ behavior: reducedMotionQuery.matches ? 'auto' : 'smooth', block: 'start' });
            history.replaceState(null, '', href);
        });
    });

    if (!('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver((entries) => {
        const visible = entries
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        navLinks.forEach((link) => {
            link.classList.toggle('is-active', link.getAttribute('href') === `#${visible.target.id}`);
        });
    }, { rootMargin: '-20% 0px -62% 0px', threshold: [0.1, 0.25, 0.5] });

    targets.forEach((section) => observer.observe(section));
}

function initRevealAnimations() {
    const elements = [...document.querySelectorAll('.reveal')];
    if (!elements.length) return;

    if (reducedMotionQuery.matches || !('IntersectionObserver' in window)) {
        elements.forEach((element) => element.classList.add('is-visible'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -45px' });

    elements.forEach((element, index) => {
        element.style.transitionDelay = `${Math.min((index % 5) * 45, 180)}ms`;
        observer.observe(element);
    });
}

function getFocusable(container) {
    return [...container.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')]
        .filter((element) => !element.hidden && element.offsetParent !== null);
}

function trapDialogFocus(event, container) {
    if (event.key !== 'Tab') return;
    const focusable = getFocusable(container);
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
    }
}

function openCommandPalette() {
    const palette = document.getElementById('commandPalette');
    const search = document.getElementById('commandSearch');
    if (!palette || !palette.hidden) return;
    commandReturnFocus = document.activeElement;
    palette.hidden = false;
    document.body.style.overflow = 'hidden';
    window.setTimeout(() => search?.focus(), 0);
}

function closeCommandPalette() {
    const palette = document.getElementById('commandPalette');
    if (!palette || palette.hidden) return;
    palette.hidden = true;
    document.body.style.overflow = '';
    commandReturnFocus?.focus?.();
    commandReturnFocus = null;
}

function initCommandPalette() {
    const palette = document.getElementById('commandPalette');
    const openButton = document.getElementById('commandButton');
    const closeButton = palette?.querySelector('[data-close-command]');
    const search = document.getElementById('commandSearch');
    const options = palette ? [...palette.querySelectorAll('.command-list > button, .command-list > a')] : [];
    if (!palette) return;

    let selectedIndex = 0;

    const visibleOptions = () => options.filter((option) => !option.hidden);
    const selectIndex = (index) => {
        const visible = visibleOptions();
        if (!visible.length) return;
        selectedIndex = (index + visible.length) % visible.length;
        options.forEach((option) => option.classList.remove('is-selected'));
        visible[selectedIndex].classList.add('is-selected');
        visible[selectedIndex].scrollIntoView({ block: 'nearest' });
    };

    const filterOptions = () => {
        const query = (search?.value || '').trim().toLowerCase();
        options.forEach((option) => {
            option.hidden = Boolean(query) && !option.textContent.toLowerCase().includes(query);
        });
        selectedIndex = 0;
        selectIndex(0);
    };

    openButton?.addEventListener('click', openCommandPalette);
    closeButton?.addEventListener('click', closeCommandPalette);
    search?.addEventListener('input', filterOptions);

    options.forEach((option) => {
        option.addEventListener('mouseenter', () => {
            const visible = visibleOptions();
            selectedIndex = Math.max(visible.indexOf(option), 0);
            selectIndex(selectedIndex);
        });

        if (option.matches('[data-command-target]')) {
            option.addEventListener('click', () => {
                const target = document.querySelector(option.dataset.commandTarget);
                closeCommandPalette();
                window.setTimeout(() => target?.scrollIntoView({ behavior: reducedMotionQuery.matches ? 'auto' : 'smooth', block: 'start' }), 0);
            });
        }

        if (option.matches('[data-command-full-profile]')) {
            option.addEventListener('click', () => {
                setProfileMode('full', { scrollToGames: true });
                closeCommandPalette();
            });
        }

        if (option.tagName === 'A') {
            option.addEventListener('click', closeCommandPalette);
        }
    });

    document.addEventListener('keydown', (event) => {
        if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
            event.preventDefault();
            palette.hidden ? openCommandPalette() : closeCommandPalette();
            return;
        }

        if (palette.hidden) return;
        if (event.key === 'Escape') {
            event.preventDefault();
            closeCommandPalette();
        } else if (event.key === 'ArrowDown') {
            event.preventDefault();
            selectIndex(selectedIndex + 1);
        } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            selectIndex(selectedIndex - 1);
        } else if (event.key === 'Enter' && document.activeElement === search) {
            event.preventDefault();
            visibleOptions()[selectedIndex]?.click();
        } else {
            trapDialogFocus(event, palette);
        }
    });

    palette.addEventListener('mousedown', (event) => {
        if (event.target === palette) closeCommandPalette();
    });
}

function openMediaModal(source, alt = '', caption = '') {
    const modal = document.getElementById('mediaModal');
    const image = document.getElementById('mediaImage');
    const captionElement = document.getElementById('mediaCaption');
    if (!modal || !image || !captionElement) return;

    mediaReturnFocus = document.activeElement;
    image.src = source || PROFILE_FALLBACK;
    image.alt = alt;
    image.onerror = () => {
        image.onerror = null;
        image.src = PROFILE_FALLBACK;
    };
    captionElement.textContent = caption;
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    window.setTimeout(() => modal.querySelector('[data-close-media]')?.focus(), 0);
}

function closeMediaModal() {
    const modal = document.getElementById('mediaModal');
    if (!modal || modal.hidden) return;
    modal.hidden = true;
    document.body.style.overflow = '';
    mediaReturnFocus?.focus?.();
    mediaReturnFocus = null;
}

function initMediaModal() {
    const modal = document.getElementById('mediaModal');
    if (!modal) return;

    document.querySelectorAll('.media-trigger').forEach((button) => {
        button.addEventListener('click', () => {
            openMediaModal(button.dataset.mediaSrc, button.dataset.mediaAlt, button.dataset.mediaCaption);
        });
    });

    modal.querySelector('[data-close-media]')?.addEventListener('click', closeMediaModal);
    modal.addEventListener('mousedown', (event) => {
        if (event.target === modal) closeMediaModal();
    });

    document.addEventListener('keydown', (event) => {
        if (modal.hidden) return;
        if (event.key === 'Escape') {
            event.preventDefault();
            closeMediaModal();
        } else {
            trapDialogFocus(event, modal);
        }
    });
}

function initImageFallbacks() {
    document.querySelectorAll('img[data-fallback]').forEach((image) => {
        const applyFallback = () => {
            if (image.dataset.fallbackApplied === 'true') return;
            image.dataset.fallbackApplied = 'true';
            image.src = image.dataset.fallback || PROFILE_FALLBACK;
        };

        image.addEventListener('error', applyFallback);
        if (image.complete && image.naturalWidth === 0) applyFallback();
    });
}

function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        if (!form.reportValidity()) return;

        const name = document.getElementById('contactName')?.value.trim() || 'Recruiter';
        const sender = document.getElementById('contactEmail')?.value.trim() || '';
        const subject = document.getElementById('contactSubject')?.value.trim() || 'Opportunity for Ng Yuan Xin';
        const message = document.getElementById('contactMessage')?.value.trim() || '';
        const body = `${message}\n\nFrom: ${name}${sender ? ` (${sender})` : ''}`;
        const mailto = `mailto:${EMAIL_ADDRESS}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        showToast('Opening your email application.');
        window.location.href = mailto;
    });
}

function initBackToTop() {
    document.getElementById('backToTop')?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: reducedMotionQuery.matches ? 'auto' : 'smooth' });
    });
}

function initCurrentYear() {
    const element = document.getElementById('currentYear');
    if (element) element.textContent = String(new Date().getFullYear());
}

function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    window.clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.add('is-visible');
    toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 2800);
}

function initCardSpotlight() {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches || reducedMotionQuery.matches) return;
    const cards = document.querySelectorAll('.recruiter-dashboard, .proof-card, .metric-card, .capability-card, .project-card, .leadership-feature, .game-card');
    cards.forEach((card) => {
        card.dataset.spotlight = 'true';
        card.addEventListener('pointermove', (event) => {
            const rect = card.getBoundingClientRect();
            card.style.setProperty('--spot-x', `${event.clientX - rect.left}px`);
            card.style.setProperty('--spot-y', `${event.clientY - rect.top}px`);
        });
    });
}

function initNetworkCanvas() {
    const canvas = document.getElementById('networkCanvas');
    if (!canvas || reducedMotionQuery.matches) return;
    if (window.matchMedia('(pointer: coarse)').matches && window.innerWidth < 720) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    let width = 0;
    let height = 0;
    let particles = [];
    let frameId = 0;
    let running = true;
    const pointer = { x: -1000, y: -1000, active: false };

    const resize = () => {
        const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = Math.round(width * ratio);
        canvas.height = Math.round(height * ratio);
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        context.setTransform(ratio, 0, 0, ratio, 0, 0);
        const count = width < 720 ? 24 : width < 1180 ? 38 : 52;
        particles = Array.from({ length: count }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - .5) * .16,
            vy: (Math.random() - .5) * .16,
            radius: Math.random() * 1.25 + .45,
        }));
    };

    const draw = () => {
        if (!running) return;
        context.clearRect(0, 0, width, height);

        particles.forEach((particle) => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            if (particle.x < -20) particle.x = width + 20;
            if (particle.x > width + 20) particle.x = -20;
            if (particle.y < -20) particle.y = height + 20;
            if (particle.y > height + 20) particle.y = -20;

            context.beginPath();
            context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            context.fillStyle = 'rgba(103, 222, 255, .34)';
            context.fill();
        });

        for (let i = 0; i < particles.length; i += 1) {
            for (let j = i + 1; j < particles.length; j += 1) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.hypot(dx, dy);
                if (distance > 118) continue;
                context.beginPath();
                context.moveTo(particles[i].x, particles[i].y);
                context.lineTo(particles[j].x, particles[j].y);
                context.strokeStyle = `rgba(89, 197, 239, ${(1 - distance / 118) * .07})`;
                context.lineWidth = .7;
                context.stroke();
            }

            if (pointer.active) {
                const distance = Math.hypot(particles[i].x - pointer.x, particles[i].y - pointer.y);
                if (distance < 150) {
                    context.beginPath();
                    context.moveTo(particles[i].x, particles[i].y);
                    context.lineTo(pointer.x, pointer.y);
                    context.strokeStyle = `rgba(89, 221, 255, ${(1 - distance / 150) * .13})`;
                    context.lineWidth = .8;
                    context.stroke();
                }
            }
        }

        frameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('pointermove', (event) => {
        pointer.x = event.clientX;
        pointer.y = event.clientY;
        pointer.active = true;
    }, { passive: true });
    document.addEventListener('pointerleave', () => { pointer.active = false; });
    document.addEventListener('visibilitychange', () => {
        running = !document.hidden;
        if (running) draw();
        else cancelAnimationFrame(frameId);
    });

    resize();
    draw();
}
