// ===============================
// NAVIGATION & MENU
// ===============================
document.addEventListener('DOMContentLoaded', function () {
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav__link');
  const header = document.querySelector('.header');

  // Mobile menu toggle
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      navMenu.classList.toggle('active');
      navToggle.classList.toggle('active');
    });

    // Close menu when clicking on a link
    navLinks.forEach(link => {
      link.addEventListener('click', function () {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
      }
    });
  }

  // Header scroll effect
  let lastScrollTop = 0;
  window.addEventListener('scroll', function () {
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
    link.addEventListener('click', function (e) {
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
  const form = document.getElementById('contact-form');

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    // Pega os dados do formulário
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('https://api.mvtechsolutions.com.br/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        // Sucesso! Você pode mostrar uma mensagem para o usuário aqui
        alert('Mensagem enviada com sucesso!');
        form.reset();
      } else {
        // Erro na requisição
        alert('Ocorreu um erro ao enviar a mensagem. Tente novamente.');
      }
    } catch (error) {
      // Erro de rede ou outro
      alert('Erro de conexão. Tente novamente mais tarde.');
      console.error(error);
    }
  });
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
  return function () {
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
document.addEventListener('DOMContentLoaded', function () {
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
window.addEventListener('error', function (e) {
  console.error('JavaScript Error:', e.error);
  // You could send this to a logging service
});

window.addEventListener('unhandledrejection', function (e) {
  console.error('Unhandled Promise Rejection:', e.reason);
  // You could send this to a logging service
});
