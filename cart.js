// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

// Add to cart function
function addToCart(product) {
  const existingItem = cart.find(item => item.id === product.id);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  renderCartItems();
}

// Remove from cart function
function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  renderCartItems();
}

// Update quantity function
function updateQuantity(productId, newQuantity) {
  const item = cart.find(item => item.id === productId);
  
  if (item) {
    item.quantity = newQuantity;
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCartItems();
  }
}

// Add to wishlist function
function addToWishlist(product) {
  if (!wishlist.some(item => item.id === product.id)) {
    wishlist.push(product);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    updateWishlistCount();
    renderWishlistItems();
  }
}

// Remove from wishlist function
function removeFromWishlist(productId) {
  wishlist = wishlist.filter(item => item.id !== productId);
  localStorage.setItem('wishlist', JSON.stringify(wishlist));
  updateWishlistCount();
  renderWishlistItems();
}

// Update cart count display
function updateCartCount() {
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  const cartCount = document.getElementById('cart-count');
  
  if (count > 0) {
    cartCount.textContent = count;
    cartCount.classList.remove('hidden');
  } else {
    cartCount.classList.add('hidden');
  }
}

// Update wishlist count display
function updateWishlistCount() {
  const count = wishlist.length;
  const wishlistCount = document.getElementById('wishlist-count');
  
  if (count > 0) {
    wishlistCount.textContent = count;
    wishlistCount.classList.remove('hidden');
  } else {
    wishlistCount.classList.add('hidden');
  }
}

// Render cart items
function renderCartItems() {
  const cartItemsContainer = document.getElementById('cart-items');
  const cartSubtotal = document.getElementById('cart-subtotal');
  
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p class="text-center text-gray-500 py-8">Your cart is empty</p>';
    cartSubtotal.textContent = '₹0';
    return;
  }
  
  let itemsHTML = '';
  let subtotal = 0;
  
  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;
    
    itemsHTML += `
      <div class="cart-item flex items-start gap-4 border-b border-gray-200 dark:border-gray-700 pb-4">
        <div class="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded overflow-hidden">
          <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover">
        </div>
        <div class="flex-grow">
          <h4 class="font-medium">${item.name}</h4>
          <div class="flex justify-between items-center mt-1">
            <span class="text-teal-600 dark:text-teal-400 font-medium">₹${item.price}</span>
            <div class="flex items-center">
              <button class="decrease-quantity px-2 text-gray-500 hover:text-teal-600" data-id="${item.id}">
                <i class="fas fa-minus text-xs"></i>
              </button>
              <span class="quantity mx-2 w-8 text-center">${item.quantity}</span>
              <button class="increase-quantity px-2 text-gray-500 hover:text-teal-600" data-id="${item.id}">
                <i class="fas fa-plus text-xs"></i>
              </button>
            </div>
          </div>
        </div>
        <button class="remove-from-cart text-gray-400 hover:text-red-500" data-id="${item.id}">
          <i class="fas fa-times"></i>
        </button>
      </div>
    `;
  });
  
  cartItemsContainer.innerHTML = itemsHTML;
  cartSubtotal.textContent = `₹${subtotal.toFixed(2)}`;
  
  // Add event listeners to buttons
  document.querySelectorAll('.remove-from-cart').forEach(button => {
    button.addEventListener('click', (e) => {
      removeFromCart(e.target.closest('button').dataset.id);
    });
  });
  
  document.querySelectorAll('.decrease-quantity').forEach(button => {
    button.addEventListener('click', (e) => {
      const productId = e.target.closest('button').dataset.id;
      const item = cart.find(item => item.id === productId);
      if (item && item.quantity > 1) {
        updateQuantity(productId, item.quantity - 1);
      } else {
        removeFromCart(productId);
      }
    });
  });
  
  document.querySelectorAll('.increase-quantity').forEach(button => {
    button.addEventListener('click', (e) => {
      const productId = e.target.closest('button').dataset.id;
      const item = cart.find(item => item.id === productId);
      if (item) {
        updateQuantity(productId, item.quantity + 1);
      }
    });
  });
}

// Render wishlist items
function renderWishlistItems() {
  const wishlistItemsContainer = document.getElementById('wishlist-items');
  
  if (wishlist.length === 0) {
    wishlistItemsContainer.innerHTML = '<p class="text-center text-gray-500 py-8">Your wishlist is empty</p>';
    return;
  }
  
  let itemsHTML = '';
  
  wishlist.forEach(item => {
    itemsHTML += `
      <div class="wishlist-item flex items-start gap-4 border-b border-gray-200 dark:border-gray-700 pb-4">
        <div class="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded overflow-hidden">
          <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover">
        </div>
        <div class="flex-grow">
          <h4 class="font-medium">${item.name}</h4>
          <span class="text-teal-600 dark:text-teal-400 font-medium">₹${item.price}</span>
        </div>
        <div class="flex gap-2">
          <button class="add-to-cart-from-wishlist p-2 text-gray-400 hover:text-teal-600" data-id="${item.id}">
            <i class="fas fa-shopping-cart"></i>
          </button>
          <button class="remove-from-wishlist p-2 text-gray-400 hover:text-red-500" data-id="${item.id}">
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>
    `;
  });
  
  wishlistItemsContainer.innerHTML = itemsHTML;
  
  // Add event listeners to buttons
  document.querySelectorAll('.remove-from-wishlist').forEach(button => {
    button.addEventListener('click', (e) => {
      removeFromWishlist(e.target.closest('button').dataset.id);
    });
  });
  
  document.querySelectorAll('.add-to-cart-from-wishlist').forEach(button => {
    button.addEventListener('click', (e) => {
      const productId = e.target.closest('button').dataset.id;
      const product = wishlist.find(item => item.id === productId);
      if (product) {
        addToCart(product);
      }
    });
  });
}

// Initialize product data
const products = [
  {
    id: 'prod1',
    name: 'Smart Watch Pro',
    price: 2499,
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    category: 'electronics'
  },
  {
    id: 'prod2',
    name: 'Wireless Earbuds',
    price: 1799,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    category: 'electronics'
  },
  {
    id: 'prod3',
    name: 'Premium Headphones',
    price: 3299,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    category: 'electronics'
  },
  {
    id: 'prod4',
    name: 'Running Shoes',
    price: 2999,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    category: 'clothing'
  },
  {
    id: 'template1',
    name: 'Minimal Portfolio',
    price: 999,
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    category: 'templates'
  },
  {
    id: 'template2',
    name: 'Developer Portfolio',
    price: 1499,
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    category: 'templates'
  },
  {
    id: 'template3',
    name: 'Creative Portfolio',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    category: 'templates'
  },
  {
    id: 'note1',
    name: 'Data Science Fundamentals',
    price: 299,
    image: '',
    category: 'notes'
  },
  {
    id: 'note2',
    name: 'Web Development',
    price: 249,
    image: '',
    category: 'notes'
  },
  {
    id: 'note3',
    name: 'Machine Learning',
    price: 349,
    image: '',
    category: 'notes'
  }
];

// Add event listeners to all add-to-cart buttons
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      const productId = e.target.closest('.product-card, .template-card, .note-card').dataset.id || 
                       e.target.closest('[data-id]').dataset.id;
      const product = products.find(p => p.id === productId);
      if (product) {
        addToCart(product);
        
        // Show animation on the button
        e.target.innerHTML = '<i class="fas fa-check"></i> Added';
        e.target.classList.add('bg-green-500', 'hover:bg-green-600');
        setTimeout(() => {
          e.target.innerHTML = 'Add to Cart';
          e.target.classList.remove('bg-green-500', 'hover:bg-green-600');
          e.target.classList.add('bg-teal-600', 'hover:bg-teal-700');
        }, 1000);
      }
    });
  });
  
  // Add event listeners to all wishlist buttons
  document.querySelectorAll('.wishlist-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      const productId = e.target.closest('.product-card, .template-card, .note-card').dataset.id || 
                       e.target.closest('[data-id]').dataset.id;
      const product = products.find(p => p.id === productId);
      if (product) {
        addToWishlist(product);
        
        // Change icon to solid heart
        const icon = e.target.tagName === 'I' ? e.target : e.target.querySelector('i');
        if (icon) {
          icon.classList.remove('far');
          icon.classList.add('fas', 'text-red-500');
        }
      }
    });
  });
  
  // Checkout button
  document.getElementById('checkout-btn').addEventListener('click', () => {
    if (cart.length > 0) {
      initiateCheckout();
    }
  });
  
  // Initialize rendering
  renderCartItems();
  renderWishlistItems();
});

// Add data-id attributes to all product cards
document.addEventListener('DOMContentLoaded', () => {
  const productCards = document.querySelectorAll('.product-card, .template-card, .note-card');
  productCards.forEach((card, index) => {
    card.dataset.id = products[index].id;
  });
});