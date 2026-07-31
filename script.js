
// ============================================
// CONTACT FORM HANDLING
// ============================================

const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!contactForm) return;

    const formData = new FormData(contactForm);
    const name = formData.get('name')?.toString().trim();
    const email = formData.get('email')?.toString().trim();
    const phone = formData.get('phone')?.toString().trim();
    const subject = formData.get('subject')?.toString().trim();
    const message = formData.get('message')?.toString().trim();

    if (!name || !email || !subject || !message) {
        showFormMessage('Por favor, completa todos los campos requeridos.', 'error');
        return;
    }

    if (!isValidEmail(email)) {
        showFormMessage('Por favor, ingresa un correo electrónico válido.', 'error');
        return;
    }

    showFormMessage('Enviando tu consulta...', 'loading');

    try {
        const response = await fetch(contactForm.action, {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
            body: formData
        });

        const result = await response.json();

        if (response.ok && result.success) {
            showFormMessage('Tu consulta se envió correctamente. Te responderemos a la brevedad.', 'success');
            contactForm.reset();
        } else {
            showFormMessage(result.message || 'No se pudo enviar el mensaje. Inténtalo de nuevo.', 'error');
        }
    } catch (error) {
        showFormMessage('Ocurrió un error al enviar la consulta. Inténtalo nuevamente.', 'error');
    }
});

// Helper function to validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Helper function to show form message
function showFormMessage(message, type) {
    formMessage.textContent = message;
    formMessage.classList.remove('success', 'error', 'loading');
    formMessage.classList.add(type);
    formMessage.style.display = 'block';
}

// ============================================
// SMOOTH SCROLL BEHAVIOR
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Skip the WhatsApp button and other non-section links
        if (href === '#') return;
        
        const target = document.querySelector(href);
        
        if (target) {
            e.preventDefault();
            
            // Calculate offset for sticky navbar
            const navHeight = navbar.offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// SCROLL-TO-TOP INDICATOR
// ============================================

window.addEventListener('scroll', () => {
    const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    
    // This can be used for visual indicators if needed
    // For example, to show a progress bar or scroll indicator
});


// ============================================
// LAZY LOAD IMAGES (for future image optimization)
// ============================================

// Check if Intersection Observer is supported
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });
    
    // Observe all images with data-src attribute
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// PAGE LOAD ANIMATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in class to body for any entrance animations
    document.body.classList.add('loaded');
    
    // Initialize any other functionality that depends on full page load
    console.log('Página cargada completamente');
});

// ============================================
// UTILITY FUNCTION FOR TRACKING EVENTS
// ============================================

// Basic event tracking function (can be expanded for analytics)
function trackEvent(eventName, eventData = {}) {
    // This can be connected to Google Analytics or similar services
    console.log(`Event: ${eventName}`, eventData);
}

// Track button clicks for analytics
document.querySelectorAll('.button-primary, .button-secondary').forEach(button => {
    button.addEventListener('click', () => {
        const text = button.textContent.trim();
        trackEvent('button_click', { button_text: text });
    });
});

// ============================================
// RESPONSIVE IMAGE HANDLING
// ============================================

// Adjust image size based on screen size
function handleImageResponsiveness() {
    const profileImage = document.querySelector('.profile-image');
    
    if (profileImage) {
        // Images will naturally scale with CSS media queries
        // This function can be enhanced for dynamic adjustments if needed
    }
}

window.addEventListener('resize', handleImageResponsiveness);

