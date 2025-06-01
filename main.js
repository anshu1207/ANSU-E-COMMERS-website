// Mobile menu toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
});

// Theme toggle
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

function setTheme(theme) {
  if (theme === 'dark') {
    html.classList.add('dark');
    localStorage.setItem('theme', 'dark');
    // Update the icon to sun (light mode icon)
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  } else {
    html.classList.remove('dark');
    localStorage.setItem('theme', 'light');
    // Update the icon to moon (dark mode icon)
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  }
}

// Toggle between dark and light mode
themeToggle.addEventListener('click', () => {
  if (html.classList.contains('dark')) {
    setTheme('light');
  } else {
    setTheme('dark');
  }
});

// Check for saved theme preference or system preference
function checkTheme() {
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    setTheme('dark');
  } else {
    setTheme('light');
  }
}

// Initialize theme on page load
checkTheme();

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
  const newColorScheme = e.matches ? 'dark' : 'light';
  setTheme(newColorScheme);
});


// Check for saved theme preference or system preference
const savedTheme = localStorage.getItem('theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme) {
  setTheme(savedTheme);
} else if (systemPrefersDark) {
  setTheme('dark');
} else {
  setTheme('light');
}

// Scroll reveal animation
const revealElements = document.querySelectorAll('.reveal');

function checkReveal() {
  revealElements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (elementTop < windowHeight - 100) {
      element.classList.add('active');
    }
  });
}

window.addEventListener('scroll', checkReveal);
window.addEventListener('load', checkReveal);

// Back to top button
const backToTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTopButton.classList.remove('opacity-0', 'scale-0');
    backToTopButton.classList.add('flex', 'opacity-100', 'scale-100');
  } else {
    backToTopButton.classList.remove('flex', 'opacity-100', 'scale-100');
    backToTopButton.classList.add('opacity-0', 'scale-0');
  }
});

backToTopButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Close mobile menu when clicking a link
const navLinks = document.querySelectorAll('#mobile-menu a');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
  });
});

// Wishlist and Cart panels toggle
const wishlistToggle = document.getElementById('wishlist-toggle');
const cartToggle = document.getElementById('cart-toggle');
const wishlistPanel = document.getElementById('wishlist-panel');
const cartPanel = document.getElementById('cart-panel');
const overlay = document.getElementById('overlay');
const closeWishlist = document.getElementById('close-wishlist');
const closeCart = document.getElementById('close-cart');

function togglePanel(panel, otherPanel) {
  if (panel.classList.contains('translate-x-full')) {
    overlay.classList.remove('hidden');
    otherPanel.classList.add('translate-x-full');
    panel.classList.remove('translate-x-full');
  } else {
    overlay.classList.add('hidden');
    panel.classList.add('translate-x-full');
  }
}

wishlistToggle.addEventListener('click', () => {
  togglePanel(wishlistPanel, cartPanel);
});

cartToggle.addEventListener('click', () => {
  togglePanel(cartPanel, wishlistPanel);
});

closeWishlist.addEventListener('click', () => {
  wishlistPanel.classList.add('translate-x-full');
  overlay.classList.add('hidden');
});

closeCart.addEventListener('click', () => {
  cartPanel.classList.add('translate-x-full');
  overlay.classList.add('hidden');
});

overlay.addEventListener('click', () => {
  wishlistPanel.classList.add('translate-x-full');
  cartPanel.classList.add('translate-x-full');
  overlay.classList.add('hidden');
});

// Initialize cart and wishlist counts
updateCartCount();
updateWishlistCount();

// Typed.js initialization
document.addEventListener('DOMContentLoaded', () => {
  const typed = new Typed('#typed-role', {
    strings: ['Digital Marketplace', 'Template Store', 'Study Notes', 'Tech Products'],
    typeSpeed: 50,
    backSpeed: 30,
    loop: true
  });
});