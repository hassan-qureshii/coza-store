// ===============================
// script.js - Interactive Features
// ===============================

// 1. Hero Section Button → Scroll to Products
const heroBtn = document.querySelector('.text button');
if (heroBtn) {
  heroBtn.addEventListener('click', () => {
    const productSection = document.querySelector('main');
    if (productSection) {
      productSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

// 2. Navbar Links → Smooth Scroll
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

// 3. Banner Cards → Click Alerts
const bannerCards = document.querySelectorAll('section .card');
bannerCards.forEach((card, index) => {
  card.addEventListener('click', () => {
    alert(`You clicked Banner Card ${index + 1}`);
  });
});

// 4. Product Cards → Favorite Toggle
function activateProductIcons() {
  const productIcons = document.querySelectorAll('.product-card i');
  productIcons.forEach(icon => {
    icon.addEventListener('click', () => {
      icon.classList.toggle('active');
      if (icon.classList.contains('active')) {
        icon.style.color = 'red';
      } else {
        icon.style.color = '#999';
      }
    });
  });
}
activateProductIcons();

// 5. Load More Button → Add New Products
const loadMoreBtn = document.querySelector('.button button');
if (loadMoreBtn) {
  loadMoreBtn.addEventListener('click', () => {
    const main = document.querySelector('main');
    if (main) {
      for (let i = 0; i < 2; i++) { // Add 2 new cards
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
          <img src="https://via.placeholder.com/300x200" alt="New Product">
          <h3>New Product <i class="fa fa-heart"></i></h3>
          <p>$99</p>
        `;
        main.appendChild(card);
      }
      // Re-activate icons for new cards
      activateProductIcons();
    }
  });
}

// 6. Footer Newsletter → Subscription Alert
const newsletterBtn = document.querySelector('.footer-child button');
if (newsletterBtn) {
  newsletterBtn.addEventListener('click', () => {
    const emailInput = document.querySelector('.footer-child input');
    if (emailInput && emailInput.value.trim() !== '') {
      alert(`Thanks for subscribing with: ${emailInput.value}`);
      emailInput.value = ''; // Clear input after submission
    } else {
      alert('Please enter your email!');
    }
  });
}

// ===============================
// Optional: Scroll Animations
// ===============================
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
