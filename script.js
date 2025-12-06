document.addEventListener('DOMContentLoaded', () => {

  // ===== HERO BUTTON SCROLL =====
  const heroBtn = document.querySelector('.text button');
  if (heroBtn) {
    heroBtn.addEventListener('click', () => {
      const productSection = document.querySelector('main');
      if (productSection) {
        productSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // ===== NAVBAR SMOOTH SCROLL =====
  const navLinks = document.querySelectorAll('.navbar a');
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  const bannerCards = document.querySelectorAll('section .card');
  bannerCards.forEach((card, index) => {
    card.addEventListener('click', () => {
      alert(`You clicked Banner Card ${index + 1}`);
    });
  });

  // ===== PRODUCT ICONS (LIKE/HEART) =====
  function activateProductIcons() {
    const productIcons = document.querySelectorAll('.product-card i');
    productIcons.forEach(icon => {
      icon.addEventListener('click', () => {
        icon.classList.toggle('active');
        icon.style.color = icon.classList.contains('active') ? 'red' : '#999';
      });
    });
  }
  activateProductIcons();

  // ===== LOAD MORE PRODUCTS =====
  const loadMoreBtn = document.querySelector('.button button');
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      const main = document.querySelector('main');
      if (main) {
        for (let i = 0; i < 2; i++) {
          const card = document.createElement('div');
          card.className = 'product-card';
          card.innerHTML = `
            <img src="https://via.placeholder.com/300x200" alt="New Product">
            <h3>New Product <i class="fa-regular fa-heart"></i></h3>
            <p>$99</p>
          `;
          main.appendChild(card);
        }
        activateProductIcons();
        addHoverZoom();
      }
    });
  }

  // ===== NEWSLETTER SUBSCRIBE =====
  const newsletterBtn = document.querySelector('.footer-child button');
  if (newsletterBtn) {
    newsletterBtn.addEventListener('click', () => {
      const emailInput = document.querySelector('.footer-child input');
      if (emailInput && emailInput.value.trim() !== '') {
        alert(`Thanks for subscribing with: ${emailInput.value}`);
        emailInput.value = ''; 
      } else {
        alert('Please enter your email!');
      }
    });
  }

  // ===== REVEAL ELEMENTS ON SCROLL =====
  const revealElements = document.querySelectorAll('.product-card, section .card');
  window.addEventListener('scroll', () => {
    revealElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        el.style.opacity = 1;
        el.style.transform = 'translateY(0)';
        el.style.transition = 'all 0.6s ease';
      }
    });
  });

  // ===== STICKY HEADER =====
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      header.classList.add('sticky');
    } else {
      header.classList.remove('sticky');
    }
  });

  // ===== BACK TO TOP BUTTON (FA ICON, Rounded) =====
  const backToTopBtn = document.createElement('button');
  backToTopBtn.className = 'back-to-top';
  backToTopBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
  backToTopBtn.style.position = 'fixed';
  backToTopBtn.style.bottom = '30px';
  backToTopBtn.style.right = '30px';
  backToTopBtn.style.width = '50px';
  backToTopBtn.style.height = '50px';
  backToTopBtn.style.borderRadius = '50%';
  backToTopBtn.style.border = 'none';
  backToTopBtn.style.cursor = 'pointer';
  backToTopBtn.style.fontSize = '1.5rem';
  backToTopBtn.style.display = 'none';
  backToTopBtn.style.backgroundColor = '#f0f0f0'; // Light mode default
  backToTopBtn.style.color = '#000';
  document.body.appendChild(backToTopBtn);

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.addEventListener('scroll', () => {
    backToTopBtn.style.display = window.scrollY > 500 ? 'block' : 'none';
  });

  // ===== SIMPLE PRODUCT FILTER =====
  const filterLinks = document.querySelectorAll('.navbar-product a');
  filterLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const category = link.textContent.toLowerCase();
      const products = document.querySelectorAll('.product-card');
      products.forEach(product => {
        if (category === 'all products' || product.querySelector('h3').textContent.toLowerCase().includes(category)) {
          product.style.display = 'block';
        } else {
          product.style.display = 'none';
        }
      });
    });
  });

  // ===== DARK/LIGHT MODE BUTTON (Font Awesome Icons) =====
  const themeBtn = document.createElement('button');
  themeBtn.className = 'theme-toggle';
  themeBtn.style.background = 'none';
  themeBtn.style.border = 'none';
  themeBtn.style.cursor = 'pointer';
  themeBtn.style.fontSize = '1.5rem';
  themeBtn.innerHTML = '<i class="fa-solid fa-moon" style="color:black"></i>';
  const headerIcons = header.querySelector('.icons');
  headerIcons.appendChild(themeBtn);

  themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    // Hero text
    const heroTextElements = document.querySelectorAll('.text h1, .text p, .text button');

    if (document.body.classList.contains('dark-mode')) {
      themeBtn.innerHTML = '<i class="fa-solid fa-sun" style="color:white"></i>';
      document.body.style.backgroundColor = '#1b1b1b';
      document.body.style.color = '#f0f0f0';
      document.querySelectorAll('a, button, .product-card h3, .product-card p').forEach(el => el.style.color = '#f0f0f0');
      heroTextElements.forEach(el => el.style.color = '#f0f0f0');
      backToTopBtn.style.backgroundColor = '#333';
      backToTopBtn.style.color = '#fff';
    } else {
      themeBtn.innerHTML = '<i class="fa-solid fa-moon" style="color:black"></i>';
      document.body.style.backgroundColor = '#fff';
      document.body.style.color = '#333';
      document.querySelectorAll('a, button, .product-card h3, .product-card p').forEach(el => el.style.color = '#333');
      heroTextElements.forEach(el => el.style.color = '#000');
      backToTopBtn.style.backgroundColor = '#f0f0f0';
      backToTopBtn.style.color = '#000';
    }
  });

  // ===== HOVER ZOOM ANIMATION =====
  function addHoverZoom() {
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'scale(1.05)';
        card.style.transition = 'all 0.3s ease';
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'scale(1)';
      });
    });
  }
  addHoverZoom();

});