// DOM Elements
const cartIcon = document.getElementById('cart-icon');
const cartSidebar = document.getElementById('cart-sidebar');
const cartOverlay = document.getElementById('cart-overlay');
const closeCartBtn = document.getElementById('close-cart');
const cartItemsContainer = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartTotalPrice = document.getElementById('cart-total-price');
const emptyCartMsg = document.getElementById('empty-cart-msg');
const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');

// Cart State
let cart = [];

// Toggle Cart Sidebar
function toggleCart() {
    cartSidebar.classList.toggle('open');
    cartOverlay.classList.toggle('active');
}

cartIcon.addEventListener('click', toggleCart);
closeCartBtn.addEventListener('click', toggleCart);
cartOverlay.addEventListener('click', toggleCart);

// Add to Cart Logic
addToCartBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const productCard = e.target.closest('.product-card');
        const id = productCard.getAttribute('data-id');
        const title = productCard.querySelector('.product-title').innerText;
        const priceString = productCard.querySelector('.product-price').innerText;
        const price = parseFloat(priceString.replace('$', ''));
        const imgSrc = productCard.querySelector('img').src;

        addToCart(id, title, price, imgSrc);
        updateCartUI();
        
        // Optional feedback
        btn.innerText = 'Added!';
        setTimeout(() => {
            btn.innerText = 'Add to Cart';
        }, 1500);
    });
});

function addToCart(id, title, price, imgSrc) {
    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id, title, price, imgSrc, quantity: 1 });
    }
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartUI();
}

function updateCartUI() {
    // Update count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.innerText = totalItems;

    // Update items list
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.appendChild(emptyCartMsg);
        emptyCartMsg.style.display = 'block';
    } else {
        emptyCartMsg.style.display = 'none';
        
        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            
            itemElement.innerHTML = `
                <img src="${item.imgSrc}" alt="${item.title}">
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.title}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)} x ${item.quantity}</div>
                    <div class="remove-item" onclick="removeFromCart('${item.id}')">Remove</div>
                </div>
            `;
            cartItemsContainer.appendChild(itemElement);
        });
    }

    // Update Total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotalPrice.innerText = `$${total.toFixed(2)}`;
}

// Form Submission handling (prevent default)
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = this.querySelector('button');
    btn.innerText = 'Sent!';
    btn.style.backgroundColor = '#4CAF50';
    setTimeout(() => {
        btn.innerText = 'Send Message';
        btn.style.backgroundColor = '';
        this.reset();
    }, 3000);
});
