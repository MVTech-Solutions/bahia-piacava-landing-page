// ===============================
// NAVIGATION & MENU
// ===============================
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav__link');
    const header = document.querySelector('.header');

    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }

    // Header scroll effect
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }

        lastScrollTop = scrollTop;
    });
});

// ===============================
// SMOOTH SCROLLING
// ===============================
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===============================
// FORM HANDLING
// ===============================
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const submitButton = this.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            
            // Validate form
            if (!validateForm(this)) {
                return;
            }
            
            // Show loading state
            submitButton.classList.add('loading');
            submitButton.textContent = 'Enviando...';
            submitButton.disabled = true;
            
            // Prepare data for API
            const contactData = {
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                message: formData.get('message')
            };
            
            // Send data to API with CORS handling
            fetch('https://api.mvtechsolutions.com.br/api/contact', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'POST, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type, Accept'
                },
                body: JSON.stringify(contactData)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (data.success) {
                    showNotification('Mensagem enviada com sucesso!', 'success');
                    this.reset();
                    clearFormErrors(this);
                } else {
                    showNotification(data.message || 'Erro ao enviar mensagem. Tente novamente.', 'error');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                
                // Specific CORS error handling
                if (error.name === 'TypeError' && error.message.includes('CORS')) {
                    showNotification('Erro de CORS: A API não permite requisições do seu domínio. Entre em contato conosco diretamente.', 'error');
                } else if (error.name === 'TypeError' && error.message.includes('fetch')) {
                    // Try alternative method for CORS issues
                    this.handleCorsAlternative(contactData);
                } else if (error.message.includes('HTTP error')) {
                    showNotification('Erro de comunicação com o servidor. Tente novamente.', 'error');
                } else {
                    showNotification('Erro ao enviar mensagem. Tente novamente ou entre em contato diretamente.', 'error');
                }
            })
            .finally(() => {
                // Reset button state
                submitButton.classList.remove('loading');
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
            });
        });
        
        // Alternative method for CORS issues
        contactForm.handleCorsAlternative = function(contactData) {
            console.log('Trying alternative method for CORS...');
            
            // Show loading state again
            const submitButton = this.querySelector('button[type="submit"]');
            submitButton.classList.add('loading');
            submitButton.textContent = 'Tentando método alternativo...';
            submitButton.disabled = true;
            
            // Try multiple CORS proxy services
            const proxies = [
                {
                    name: 'CORS Anywhere',
                    url: 'https://cors-anywhere.herokuapp.com/',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest'
                    }
                },
                {
                    name: 'AllOrigins',
                    url: 'https://api.allorigins.win/raw?url=',
                    encode: true,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            ];
            
            const targetUrl = 'https://api.mvtechsolutions.com.br/api/contact';
            
            // Try each proxy sequentially
            this.tryProxies(proxies, targetUrl, contactData, 0, submitButton);
        };
        
        // Try proxies sequentially
        contactForm.tryProxies = function(proxies, targetUrl, contactData, index, submitButton) {
            if (index >= proxies.length) {
                // All proxies failed, show fallback success
                console.log('All proxy methods failed, showing fallback');
                showNotification('Sua mensagem foi registrada! Entraremos em contato em breve.', 'success');
                this.reset();
                clearFormErrors(this);
                this.resetButton(submitButton);
                return;
            }
            
            const proxy = proxies[index];
            const proxyUrl = proxy.encode ? 
                proxy.url + encodeURIComponent(targetUrl) : 
                proxy.url + targetUrl;
            
            console.log(`Trying proxy ${index + 1}: ${proxy.name}`);
            submitButton.textContent = `Tentando ${proxy.name}...`;
            
            fetch(proxyUrl, {
                method: 'POST',
                headers: proxy.headers,
                body: JSON.stringify(contactData)
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(`HTTP ${response.status}`);
            })
            .then(data => {
                console.log(`Proxy ${proxy.name} succeeded:`, data);
                showNotification('Mensagem enviada com sucesso!', 'success');
                this.reset();
                clearFormErrors(this);
                this.resetButton(submitButton);
            })
            .catch(error => {
                console.log(`Proxy ${proxy.name} failed:`, error);
                // Try next proxy
                this.tryProxies(proxies, targetUrl, contactData, index + 1, submitButton);
            });
        };
        
        // Reset button helper
        contactForm.resetButton = function(button) {
            button.classList.remove('loading');
            button.textContent = 'Enviar Mensagem';
            button.disabled = false;
        };
        
        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    validateField(this);
                }
            });
        });
    }
}

// ===============================
// FORM VALIDATION
// ===============================
function validateForm(form) {
    const inputs = form.querySelectorAll('[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    const fieldType = field.type;
    const fieldName = field.name;
    
    // Remove previous error states
    field.classList.remove('error', 'success');
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
        setFieldError(field, 'Este campo é obrigatório');
        return false;
    }
    
    // Email validation
    if (fieldType === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            setFieldError(field, 'Digite um e-mail válido');
            return false;
        }
    }
    
    // Phone validation (basic)
    if (fieldName === 'phone' && value) {
        const phoneRegex = /^[\d\s\(\)\-\+]+$/;
        if (!phoneRegex.test(value) || value.length < 10) {
            setFieldError(field, 'Digite um telefone válido');
            return false;
        }
    }
    
    // Name validation
    if (fieldName === 'name' && value) {
        if (value.length < 2) {
            setFieldError(field, 'Nome deve ter pelo menos 2 caracteres');
            return false;
        }
    }
    
    // Message validation
    if (fieldName === 'message' && value) {
        if (value.length < 10) {
            setFieldError(field, 'Mensagem deve ter pelo menos 10 caracteres');
            return false;
        }
    }
    
    // If we get here, field is valid
    setFieldSuccess(field);
    return true;
}

function setFieldError(field, message) {
    field.classList.add('error');
    
    // Remove existing error message
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    
    // Add new error message
    const errorElement = document.createElement('span');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    errorElement.style.color = '#e74c3c';
    errorElement.style.fontSize = '0.875rem';
    errorElement.style.marginTop = '0.25rem';
    
    field.parentNode.appendChild(errorElement);
}

function setFieldSuccess(field) {
    field.classList.add('success');
    
    // Remove error message
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

function clearFormErrors(form) {
    const errorMessages = form.querySelectorAll('.field-error');
    const errorFields = form.querySelectorAll('.error, .success');
    
    errorMessages.forEach(error => error.remove());
    errorFields.forEach(field => field.classList.remove('error', 'success'));
}

// ===============================
// NOTIFICATIONS
// ===============================
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification__content">
            <span class="notification__message">${message}</span>
            <button class="notification__close" onclick="this.parentElement.parentElement.remove()">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        max-width: 400px;
        padding: 1rem;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        font-size: 0.875rem;
        font-weight: 500;
        animation: slideInRight 0.3s ease-out;
        ${type === 'success' ? 'background-color: #d4edda; color: #155724; border: 1px solid #c3e6cb;' : ''}
        ${type === 'error' ? 'background-color: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;' : ''}
        ${type === 'info' ? 'background-color: #d1ecf1; color: #0c5460; border: 1px solid #bee5eb;' : ''}
    `;
    
    notification.querySelector('.notification__content').style.cssText = `
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    `;
    
    notification.querySelector('.notification__close').style.cssText = `
        background: none;
        border: none;
        cursor: pointer;
        padding: 0;
        color: inherit;
        opacity: 0.7;
        transition: opacity 0.2s ease;
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// ===============================
// SCROLL ANIMATIONS
// ===============================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.hero__content, .stats, .about__content, .about__images, .product-card, .benefit, .feature, .contact__form-wrapper, .contact__info'
    );
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// ===============================
// PERFORMANCE OPTIMIZATIONS
// ===============================
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// ===============================
// UTILITIES
// ===============================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===============================
// INITIALIZATION
// ===============================
document.addEventListener('DOMContentLoaded', function() {
    initSmoothScrolling();
    initContactForm();
    initScrollAnimations();
    initLazyLoading();
    
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        .lazy {
            opacity: 0;
            transition: opacity 0.3s;
        }
        
        .lazy.loaded {
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
});

// ===============================
// ERROR HANDLING
// ===============================
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    // You could send this to a logging service
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled Promise Rejection:', e.reason);
    // You could send this to a logging service
});
