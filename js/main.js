// ===================================
// Theme Toggle (dark is the default)
// ===================================
(function () {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;

    const html = document.documentElement;
    const icon = themeToggle.querySelector('i');

    const savedTheme = localStorage.getItem('theme');
    const initial = savedTheme || html.getAttribute('data-theme') || 'dark';
    html.setAttribute('data-theme', initial);
    updateIcon(initial);

    themeToggle.addEventListener('click', function () {
        const newTheme = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateIcon(newTheme);
    });

    function updateIcon(theme) {
        if (icon) icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
})();

// ===================================
// Mobile Navigation Toggle
// ===================================
(function () {
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    if (!navToggle || !navLinks) return;

    function setOpen(open) {
        navToggle.classList.toggle('open', open);
        navLinks.classList.toggle('open', open);
        navToggle.setAttribute('aria-expanded', open);
    }

    navToggle.addEventListener('click', function () {
        setOpen(!navLinks.classList.contains('open'));
    });

    // Close when a link is clicked or when clicking outside
    navLinks.addEventListener('click', function (e) {
        if (e.target.closest('a')) setOpen(false);
    });

    document.addEventListener('click', function (e) {
        if (navLinks.classList.contains('open') &&
            !navLinks.contains(e.target) &&
            !navToggle.contains(e.target)) {
            setOpen(false);
        }
    });
})();

// ===================================
// Smooth Scrolling for Anchor Links
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        window.scrollTo({
            top: target.offsetTop - 70,
            behavior: 'smooth'
        });
    });
});

// ===================================
// Navbar State + Back to Top on Scroll
// ===================================
(function () {
    const navbar = document.getElementById('mainNav');
    const backToTopBtn = document.getElementById('backToTop');

    function onScroll() {
        if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 40);
        if (backToTopBtn) backToTopBtn.classList.toggle('show', window.scrollY > 300);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
})();

// ===================================
// Active Navigation Link Highlighting
// ===================================
(function () {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links .nav-link');
    if (!sections.length || !navLinks.length) return;

    window.addEventListener('scroll', function () {
        let current = '';
        sections.forEach(section => {
            if (window.scrollY >= section.offsetTop - 120) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
        });
    }, { passive: true });
})();

// ===================================
// Scroll-Reveal Animations
// ===================================
(function () {
    const elements = document.querySelectorAll('.reveal');
    if (!elements.length) return;

    if (!('IntersectionObserver' in window)) {
        elements.forEach(el => el.classList.add('animate-in'));
        return;
    }

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    elements.forEach(el => observer.observe(el));
})();

// ===================================
// Contact Form Handling (Formspree AJAX)
// ===================================
(function () {
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const formStatus = document.getElementById('formStatus');
    if (!contactForm || !submitBtn || !formStatus) return;

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        if (!name || !email || !subject || !message) {
            showStatus('Please fill in all fields.', 'error');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showStatus('Please enter a valid email address.', 'error');
            return;
        }

        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        })
            .then(response => {
                if (response.ok) {
                    showStatus('Message sent successfully! I\'ll get back to you soon.', 'success');
                    contactForm.reset();
                    submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
                    submitBtn.classList.add('btn-success');
                    submitBtn.classList.remove('btn-solid');
                } else {
                    return response.json().then(data => {
                        throw new Error(data.errors ? data.errors.map(e => e.message).join(', ') : 'Something went wrong.');
                    });
                }
            })
            .catch(error => {
                showStatus('Oops! ' + error.message + ' Please try emailing me directly.', 'error');
                submitBtn.innerHTML = originalBtnText;
            })
            .finally(() => {
                submitBtn.disabled = false;
                setTimeout(() => {
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.classList.remove('btn-success');
                    submitBtn.classList.add('btn-solid');
                }, 4000);
            });
    });

    function showStatus(message, type) {
        formStatus.textContent = message;
        formStatus.className = 'form-status ' + type;
        formStatus.style.display = 'block';

        setTimeout(() => {
            formStatus.style.display = 'none';
        }, 6000);
    }
})();

// ===================================
// Project Card Placeholder Images
// ===================================
document.addEventListener('DOMContentLoaded', function () {
    const projectImages = document.querySelectorAll('.project-image img');

    projectImages.forEach((img, index) => {
        img.addEventListener('error', function () {
            const canvas = document.createElement('canvas');
            canvas.width = 800;
            canvas.height = 500;
            const ctx = canvas.getContext('2d');

            const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            const colors = ['#171c26', '#1c2230', '#141822', '#1a1f2b'];
            gradient.addColorStop(0, colors[index % colors.length]);
            gradient.addColorStop(1, '#0a0c10');

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#ffb224';
            ctx.font = '600 40px "Bricolage Grotesque", sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(img.alt || 'Project', canvas.width / 2, canvas.height / 2);

            this.src = canvas.toDataURL();
        });
    });
});

// ===================================
// Skill Tag Click Counter (Easter Egg)
// ===================================
let skillClickCount = 0;
document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('click', function () {
        skillClickCount++;
        if (skillClickCount >= 10) {
            console.log('🎉 You found the easter egg! Thanks for exploring!');
            skillClickCount = 0;
        }
    });
});

// ===================================
// Performance: Lazy Loading Images
// ===================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===================================
// Console Message
// ===================================
console.log('%c👋 Hello, fellow developer!', 'font-size: 20px; font-weight: bold; color: #ffb224;');
console.log('%cThanks for checking out my portfolio!', 'font-size: 14px; color: #e9ecf2;');
console.log('%cBuilt with HTML, CSS, and JavaScript', 'font-size: 12px; color: #8f97aa;');
console.log('%cFeel free to reach out: hhhector9@gmail.com', 'font-size: 12px; color: #ffb224;');
