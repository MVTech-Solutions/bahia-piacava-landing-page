(function () {
  const productCatalog = {
    0: {
      fallbackTitle: 'Piacava Cortada e Penteada',
      fallbackDescription: 'Fibra de piacava premium para producao de vassouras artesanais de alta qualidade.',
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
      fallbackTitle: 'Coco de Piacava Natural',
      fallbackDescription: 'Coco de piacava natural para artesanato sustentavel e aplicacoes decorativas.',
      images: [
        'assets/images/coconut/product-1.jpg',
        'assets/images/coconut/product-2.jpg',
        'assets/images/coconut/product-3.avif',
        'assets/images/coconut/product-4.avif'
      ]
    },
    2: {
      fallbackTitle: 'Piacava para Coberturas Naturais',
      fallbackDescription: 'Piacava para cobertura natural com resistencia e isolamento termico.',
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

  const title = params.get('title') || product.fallbackTitle;
  const description = params.get('description') || product.fallbackDescription;
  const language = params.get('language') || 'pt';

  const titleElement = document.getElementById('product-title');
  const descriptionElement = document.getElementById('product-description');
  const imageElement = document.getElementById('product-image');
  const counterElement = document.getElementById('image-counter');
  const prevButton = document.getElementById('prev-image');
  const nextButton = document.getElementById('next-image');
  const backLink = document.getElementById('back-link');
  const contactLink = document.getElementById('contact-link');

  titleElement.textContent = title;
  descriptionElement.textContent = description;

  backLink.href = `index.html?language=${encodeURIComponent(language)}#produtos`;
  if (contactLink) {
    contactLink.href = `index.html?language=${encodeURIComponent(language)}#contato`;
  }

  let currentIndex = 0;

  function updateImage() {
    const currentImage = product.images[currentIndex];
    imageElement.src = currentImage;
    imageElement.alt = `${title} - imagem ${currentIndex + 1}`;
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

  updateImage();
})();
