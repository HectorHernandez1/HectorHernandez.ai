// ===================================
// Smooth Scrolling for Navigation Links
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar

            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
            }
        }
    });
});

// ===================================
// Navbar Background on Scroll
// ===================================
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('mainNav');
    const backToTopBtn = document.getElementById('backToTop');

    if (window.scrollY > 100) {
        navbar.style.backgroundColor = 'rgba(44, 62, 80, 0.95)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.backgroundColor = '#2C3E50';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }

    // Show/hide back to top button
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

// ===================================
// Active Navigation Link Highlighting
// ===================================
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===================================
// Back to Top Button
// ===================================
const backToTopBtn = document.getElementById('backToTop');

backToTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===================================
// Scroll Animations (Intersection Observer)
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.timeline-item, .experience-card, .project-card, .skills-category');
    animateElements.forEach(el => {
        observer.observe(el);
    });
});

// Add CSS for animation
const style = document.createElement('style');
style.textContent = `
    .timeline-item,
    .experience-card,
    .project-card,
    .skills-category {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }

    .timeline-item.animate-in,
    .experience-card.animate-in,
    .project-card.animate-in,
    .skills-category.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// ===================================
// Contact Form Handling
// ===================================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };

    // Simple validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
        alert('Please fill in all fields');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        alert('Please enter a valid email address');
        return;
    }

    // TODO: Replace with your actual form handling service
    // Options: Formspree, EmailJS, Netlify Forms, or backend API

    // For now, we'll simulate a successful submission
    console.log('Form data:', formData);

    // Create mailto link as fallback
    const mailtoLink = `mailto:hhhector9@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;

    // Show success message
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
    submitBtn.disabled = true;
    submitBtn.classList.add('btn-success');
    submitBtn.classList.remove('btn-primary');

    // Open mailto as fallback
    window.location.href = mailtoLink;

    // Reset form
    setTimeout(() => {
        contactForm.reset();
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
        submitBtn.classList.remove('btn-success');
        submitBtn.classList.add('btn-primary');
    }, 3000);
});

// ===================================
// Project Card Placeholder Images
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    const projectImages = document.querySelectorAll('.project-image img');

    projectImages.forEach((img, index) => {
        // If image fails to load, use a placeholder
        img.addEventListener('error', function() {
            // Create a canvas with gradient background
            const canvas = document.createElement('canvas');
            canvas.width = 800;
            canvas.height = 600;
            const ctx = canvas.getContext('2d');

            // Create gradient
            const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            const colors = ['#2C3E50', '#1ABC9C', '#3498DB', '#9B59B6', '#E74C3C', '#F39C12'];
            gradient.addColorStop(0, colors[index % colors.length]);
            gradient.addColorStop(1, '#34495e');

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Add text
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 48px Montserrat, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            const projectTitle = img.alt || 'Project';
            ctx.fillText(projectTitle, canvas.width / 2, canvas.height / 2);

            // Convert canvas to image
            this.src = canvas.toDataURL();
        });
    });
});

// ===================================
// Typing Effect for Hero Subtitle (Optional)
// ===================================
function typeWriter(element, text, speed = 100) {
    let i = 0;
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

// Uncomment to enable typing effect
// document.addEventListener('DOMContentLoaded', function() {
//     const subtitle = document.querySelector('.hero-subtitle');
//     const originalText = subtitle.textContent;
//     typeWriter(subtitle, originalText, 50);
// });

// ===================================
// Navbar Collapse on Click Outside
// ===================================
document.addEventListener('click', function(event) {
    const navbar = document.querySelector('.navbar-collapse');
    const toggler = document.querySelector('.navbar-toggler');

    if (navbar.classList.contains('show') &&
        !navbar.contains(event.target) &&
        !toggler.contains(event.target)) {
        toggler.click();
    }
});

// ===================================
// Skill Tag Hover Counter (Easter Egg)
// ===================================
let skillClickCount = 0;
document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('click', function() {
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
console.log('%c👋 Hello, fellow developer!', 'font-size: 20px; font-weight: bold; color: #1ABC9C;');
console.log('%cThanks for checking out my portfolio!', 'font-size: 14px; color: #2C3E50;');
console.log('%cBuilt with HTML, CSS, and JavaScript', 'font-size: 12px; color: #666;');
console.log('%cFeel free to reach out: hhhector9@gmail.com', 'font-size: 12px; color: #1ABC9C;');
