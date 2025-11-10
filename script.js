// Carousel functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const indicators = document.querySelectorAll('.indicator');
const totalSlides = slides.length;
let autoplayInterval;

// Initialize carousel
function initCarousel() {
    showSlide(currentSlide);
    startAutoplay();
}

// Show specific slide
function showSlide(index) {
    // Remove active class from all slides and indicators
    slides.forEach(slide => {
        slide.classList.remove('active');
        // Pause any videos in inactive slides
        const video = slide.querySelector('video');
        if (video) {
            video.pause();
        }
    });
    indicators.forEach(indicator => indicator.classList.remove('active'));

    // Add active class to current slide and indicator
    slides[index].classList.add('active');
    indicators[index].classList.add('active');

    // Play video if current slide has one
    const activeVideo = slides[index].querySelector('video');
    if (activeVideo) {
        activeVideo.play().catch(err => {
            // Handle autoplay errors (some browsers block autoplay)
            console.log('Video autoplay prevented:', err);
        });
    }
}

// Change slide (next or previous)
function changeSlide(direction) {
    currentSlide += direction;

    // Loop around
    if (currentSlide >= totalSlides) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
    }

    showSlide(currentSlide);
    resetAutoplay();
}

// Go to specific slide
function goToSlide(index) {
    currentSlide = index;
    showSlide(currentSlide);
    resetAutoplay();
}

// Autoplay functionality
function startAutoplay() {
    autoplayInterval = setInterval(() => {
        currentSlide++;
        if (currentSlide >= totalSlides) {
            currentSlide = 0;
        }
        showSlide(currentSlide);
    }, 6000); // Change slide every 6 seconds
}

function stopAutoplay() {
    clearInterval(autoplayInterval);
}

function resetAutoplay() {
    stopAutoplay();
    startAutoplay();
}

// Pause autoplay on hover
const carouselContainer = document.querySelector('.hero-carousel');
carouselContainer.addEventListener('mouseenter', stopAutoplay);
carouselContainer.addEventListener('mouseleave', startAutoplay);

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        changeSlide(-1);
    } else if (e.key === 'ArrowRight') {
        changeSlide(1);
    }
});

// Touch/swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

carouselContainer.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

carouselContainer.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swiped left
            changeSlide(1);
        } else {
            // Swiped right
            changeSlide(-1);
        }
    }
}

// Smooth scroll for anchor links (if needed in future)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for scroll animations
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

// Observe sections for fade-in animation
document.addEventListener('DOMContentLoaded', () => {
    initCarousel();

    // Add fade-in animation to sections
    const sections = document.querySelectorAll('.about-section, .services-section, .values-section, .contact-section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });

    // Animate stat cards on scroll
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Animate service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
});

// Navbar scroll effect (optional enhancement)
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
    }

    lastScroll = currentScroll;
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Hide form and show success message
        contactForm.style.display = 'none';
        formSuccess.style.display = 'block';

        // Optional: Reset form after 5 seconds and show it again
        setTimeout(() => {
            contactForm.reset();
            formSuccess.style.display = 'none';
            contactForm.style.display = 'block';
        }, 5000);

        // Scroll to success message
        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
}
