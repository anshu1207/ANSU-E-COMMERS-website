// Payment functionality
function initiateCheckout() {
  const paymentModal = document.getElementById('payment-modal');
  const successModal = document.getElementById('success-modal');
  const closePaymentModal = document.getElementById('close-payment-modal');
  const closeSuccessModal = document.getElementById('close-success-modal');
  
  // Show payment modal
  paymentModal.classList.remove('hidden');
  document.body.classList.add('overflow-hidden');
  
  // Render payment form
  const paymentForm = document.getElementById('payment-form');
  paymentForm.innerHTML = `
    <div class="space-y-4">
      <div>
        <label for="name" class="block mb-2 font-medium">Full Name</label>
        <input type="text" id="name" class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-600 dark:bg-gray-700 dark:border-gray-600" required>
      </div>
      
      <div>
        <label for="email" class="block mb-2 font-medium">Email</label>
        <input type="email" id="email" class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-600 dark:bg-gray-700 dark:border-gray-600" required>
      </div>
      
      <div>
        <label for="address" class="block mb-2 font-medium">Address</label>
        <textarea id="address" rows="3" class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-600 dark:bg-gray-700 dark:border-gray-600" required></textarea>
      </div>
      
      <div>
        <label for="payment-method" class="block mb-2 font-medium">Payment Method</label>
        <select id="payment-method" class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-600 dark:bg-gray-700 dark:border-gray-600" required>
          <option value="">Select payment method</option>
          <option value="credit-card">Credit Card</option>
          <option value="debit-card">Debit Card</option>
          <option value="upi">UPI</option>
          <option value="net-banking">Net Banking</option>
        </select>
      </div>
      
      <div id="credit-card-fields" class="hidden space-y-4">
        <div>
          <label for="card-number" class="block mb-2 font-medium">Card Number</label>
          <input type="text" id="card-number" placeholder="1234 5678 9012 3456" class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-600 dark:bg-gray-700 dark:border-gray-600">
        </div>
        
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label for="expiry-date" class="block mb-2 font-medium">Expiry Date</label>
            <input type="text" id="expiry-date" placeholder="MM/YY" class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-600 dark:bg-gray-700 dark:border-gray-600">
          </div>
          
          <div>
            <label for="cvv" class="block mb-2 font-medium">CVV</label>
            <input type="text" id="cvv" placeholder="123" class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-600 dark:bg-gray-700 dark:border-gray-600">
          </div>
        </div>
      </div>
      
      <div id="upi-fields" class="hidden">
        <label for="upi-id" class="block mb-2 font-medium">UPI ID</label>
        <input type="text" id="upi-id" placeholder="yourname@upi" class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-600 dark:bg-gray-700 dark:border-gray-600">
      </div>
      
      <div class="pt-4">
        <button id="pay-now-btn" class="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-medium transition">
          Pay Now
        </button>
      </div>
    </div>
  `;
  
  // Show/hide payment method fields
  document.getElementById('payment-method').addEventListener('change', (e) => {
    document.getElementById('credit-card-fields').classList.add('hidden');
    document.getElementById('upi-fields').classList.add('hidden');
    
    if (e.target.value === 'credit-card' || e.target.value === 'debit-card') {
      document.getElementById('credit-card-fields').classList.remove('hidden');
    } else if (e.target.value === 'upi') {
      document.getElementById('upi-fields').classList.remove('hidden');
    }
  });
  
  // Pay now button
  document.getElementById('pay-now-btn').addEventListener('click', () => {
    // Validate form
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const paymentMethod = document.getElementById('payment-method').value;
    
    if (!name || !email || !address || !paymentMethod) {
      alert('Please fill all required fields');
      return;
    }
    
    // Process payment
    processPayment();
  });
  
  // Close payment modal
  closePaymentModal.addEventListener('click', () => {
    paymentModal.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  });
  
  // Close success modal
  closeSuccessModal.addEventListener('click', () => {
    successModal.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  });
}

function processPayment() {
  const paymentModal = document.getElementById('payment-modal');
  const successModal = document.getElementById('success-modal');
  
  // Calculate total amount
  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  // For demo purposes, we'll just simulate a successful payment
  setTimeout(() => {
    paymentModal.classList.add('hidden');
    successModal.classList.remove('hidden');
    
    // Clear cart
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    renderCartItems();
  }, 2000);
  
  // In a real implementation, you would integrate with a payment gateway like Razorpay
  /*
  const options = {
    key: "YOUR_RAZORPAY_KEY",
    amount: subtotal * 100, // in paise
    currency: "INR",
    name: "TechBazaar",
    description: "Purchase",
    image: "https://example.com/logo.png",
    handler: function(response) {
      // Handle successful payment
      paymentModal.classList.add('hidden');
      successModal.classList.remove('hidden');
      
      // Clear cart
      cart = [];
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartCount();
      renderCartItems();
    },
    prefill: {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      contact: document.getElementById('phone').value || ""
    },
    theme: {
      color: "#0d9488"
    }
  };
  
  const rzp = new Razorpay(options);
  rzp.open();
  */
}