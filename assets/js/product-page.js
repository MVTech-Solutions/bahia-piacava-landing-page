(function () {
  const productCatalog = {
    0: {
      content: {
        pt: {
          title: 'Piaçava Cortada e Penteada',
          description: 'Fibra de piaçava premium para produção de vassouras artesanais de alta qualidade.'
        },
        en: {
          title: 'Cut and Combed Piassava',
          description: 'Premium piassava fiber for crafting high-quality handmade brooms.'
        }
      },
      images: [
        'assets/images/broom/broom-main.jpeg',
        'assets/images/broom/product-1.jpeg',
        'assets/images/broom/product-2.avif',
        'assets/images/broom/product-3.avif',
        'assets/images/broom/product-4.avif',
        'assets/images/broom/product-5.avif',
        'assets/images/broom/product-6.avif',
        'assets/images/broom/product-7.avif',
        'assets/images/broom/product-8.avif'
      ]
    },
    1: {
      content: {
        pt: {
          title: 'Coco de Piaçava Natural',
          description: 'Coco de piaçava natural para artesanato sustentável e aplicações decorativas.'
        },
        en: {
          title: 'Natural Piassava Coconut',
          description: 'Natural piassava coconut for sustainable handicrafts and decorative applications.'
        }
      },
      images: [
        'assets/images/coconut/product-1.jpg',
        'assets/images/coconut/product-2.jpg',
        'assets/images/coconut/product-3.avif',
        'assets/images/coconut/product-4.avif'
      ]
    },
    2: {
      content: {
        pt: {
          title: 'Piaçava para Coberturas Naturais',
          description: 'Piaçava para cobertura natural com resistência e isolamento térmico.'
        },
        en: {
          title: 'Piassava for Natural Roofing',
          description: 'Piassava for natural roofing with durability and thermal insulation.'
        }
      },
      images: [
        'assets/images/kiosk/kiosk-main.jpeg',
        'assets/images/kiosk/product-1.avif',
        'assets/images/kiosk/product-2.avif',
        'assets/images/kiosk/product-3.avif',
        'assets/images/kiosk/product-4.avif',
        'assets/images/kiosk/product-5.avif',
        'assets/images/kiosk/product-6.avif',
        'assets/images/kiosk/product-7.avif'
      ]
    }
  };

  const params = new URLSearchParams(window.location.search);
  const productId = params.get('product') || '0';
  const product = productCatalog[productId] || productCatalog[0];

  const titleElement = document.getElementById('product-title');
  const descriptionElement = document.getElementById('product-description');
  const imageElement = document.getElementById('product-image');
  const counterElement = document.getElementById('image-counter');
  const prevButton = document.getElementById('prev-image');
  const nextButton = document.getElementById('next-image');
  const backLink = document.getElementById('back-link');
  const contactLink = document.getElementById('contact-link');

  let currentIndex = 0;

  function getCurrentLanguage() {
    return new URLSearchParams(window.location.search).get('language') || 'pt';
  }

  function updateNavigationLinks(language) {
    backLink.href = `index.html?language=${encodeURIComponent(language)}#produtos`;

    if (contactLink) {
      contactLink.href = `index.html?language=${encodeURIComponent(language)}#contato`;
    }
  }

  function getLocalizedProduct(language) {
    return product.content[language] || product.content.pt;
  }

  function applyLocalizedContent(language) {
    const localizedProduct = getLocalizedProduct(language);
    titleElement.textContent = localizedProduct.title;
    descriptionElement.textContent = localizedProduct.description;
    updateNavigationLinks(language);
    updateImage();
  }

  function updateImage() {
    const language = getCurrentLanguage();
    const localizedProduct = getLocalizedProduct(language);
    const currentImage = product.images[currentIndex];
    imageElement.src = currentImage;
    imageElement.alt = `${localizedProduct.title} - image ${currentIndex + 1}`;
    counterElement.textContent = `${currentIndex + 1} / ${product.images.length}`;
  }

  function showPreviousImage() {
    currentIndex = (currentIndex - 1 + product.images.length) % product.images.length;
    updateImage();
  }

  function showNextImage() {
    currentIndex = (currentIndex + 1) % product.images.length;
    updateImage();
  }

  prevButton.addEventListener('click', showPreviousImage);
  nextButton.addEventListener('click', showNextImage);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      showPreviousImage();
    }

    if (event.key === 'ArrowRight') {
      showNextImage();
    }
  });

  document.addEventListener('languagechange', (event) => {
    applyLocalizedContent(event.detail.lang);
  });

  applyLocalizedContent(getCurrentLanguage());
})();
