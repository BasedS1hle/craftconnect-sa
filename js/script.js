// ============================================
// CraftConnect SA — Interactive Features
// JGA 2026 — Digital Entrepreneurship Prototype
// ============================================

// ============ 1. SMOOTH SCROLL FOR NAV LINKS ============
document.querySelectorAll('nav a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});

// ============ 2. SHOP NOW BUTTON ============
const shopBtn = document.querySelector('.shop-btn');
if (shopBtn) {
    shopBtn.addEventListener('click', () => {
        const shopSection = document.querySelector('#shop');
        if (shopSection) shopSection.scrollIntoView({ behavior: 'smooth' });
    });
}

// ============ 3. CART SYSTEM WITH SLIDE-IN PANEL ============
let cart = []; // array of { name, price, qty }

// Build the cart panel once on page load
const cartPanel = document.createElement('div');
cartPanel.id = 'cartPanel';
cartPanel.style.cssText = `
    position: fixed; top: 0; right: -420px; width: 380px; height: 100%;
    background: white; box-shadow: -4px 0 20px rgba(0,0,0,0.2);
    transition: right 0.3s ease; z-index: 1000; padding: 30px 25px;
    overflow-y: auto; font-family: 'Poppins', sans-serif;
`;
cartPanel.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
        <h2 style="color:#5C4033; font-size:22px;">Your Cart</h2>
        <button id="closeCart" style="background:none; border:none; font-size:24px; cursor:pointer; color:#5C4033;">✕</button>
    </div>
    <div id="cartItems"></div>
    <div id="cartTotal" style="margin-top:20px; padding-top:20px; border-top:2px solid #FAEDCD; font-size:18px; font-weight:600; color:#5C4033;"></div>
    <button id="checkoutBtn" style="width:100%; margin-top:20px; padding:14px; background:#5C4033; color:white; border:none; border-radius:6px; font-size:16px; cursor:pointer; font-family:inherit;">Checkout</button>
`;
document.body.appendChild(cartPanel);

// Build the cart badge in the header
const cartBadge = document.createElement('span');
cartBadge.style.cssText = 'background:#D4A373;color:white;border-radius:50%;padding:2px 8px;font-size:12px;margin-left:8px;cursor:pointer;display:none;user-select:none;';
cartBadge.title = 'View cart';
const buttonsContainer = document.querySelector('.buttons');
if (buttonsContainer) buttonsContainer.appendChild(cartBadge);

function openCart() { cartPanel.style.right = '0'; }
function closeCart() { cartPanel.style.right = '-420px'; }

cartBadge.addEventListener('click', openCart);

const closeCartBtn = document.getElementById('closeCart');
if (closeCartBtn) closeCartBtn.addEventListener('click', closeCart);

// Add-to-cart buttons
document.querySelectorAll('.add-cart').forEach(btn => {
    btn.addEventListener('click', () => {
        const productDiv = btn.closest('.product');
        const name = productDiv.getAttribute('data-name');
        const priceText = productDiv.querySelector('.price').textContent;
        const price = parseFloat(priceText.replace('R', '').replace(',', '.').trim());

        const existing = cart.find(item => item.name === name);
        if (existing) {
            existing.qty++;
        } else {
            cart.push({ name: name, price: price, qty: 1 });
        }

        updateCartUI();

        // Button feedback
        const original = btn.textContent;
        btn.textContent = '✓ Added';
        btn.style.background = '#4CAF50';
        setTimeout(() => {
            btn.textContent = original;
            btn.style.background = '';
        }, 1200);
    });
});

function updateCartUI() {
    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

    // Update badge
    if (totalQty > 0) {
        cartBadge.textContent = totalQty;
        cartBadge.style.display = 'inline-block';
    } else {
        cartBadge.style.display = 'none';
    }

    // Update items list
    const itemsDiv = document.getElementById('cartItems');
    if (!itemsDiv) return;

    if (cart.length === 0) {
        itemsDiv.innerHTML = '<p style="color:#888; text-align:center; padding:40px 0;">Your cart is empty.</p>';
    } else {
        itemsDiv.innerHTML = cart.map(item => `
            <div style="display:flex; justify-content:space-between; padding:12px 0; border-bottom:1px solid #eee;">
                <div>
                    <strong style="color:#5C4033;">${item.name}</strong><br>
                    <small style="color:#888;">R${item.price.toFixed(2)} × ${item.qty}</small>
                </div>
                <div style="font-weight:600; color:#D4A373;">
                    R${(item.price * item.qty).toFixed(2)}
                </div>
            </div>
        `).join('');
    }

    // Update total
    const totalDiv = document.getElementById('cartTotal');
    if (totalDiv) {
        totalDiv.innerHTML = `
            <div style="display:flex; justify-content:space-between;">
                <span>Total:</span>
                <span style="color:#D4A373;">R${totalPrice.toFixed(2)}</span>
            </div>
        `;
    }
}

// Checkout button
const checkoutBtn = document.getElementById('checkoutBtn');
if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Your cart is empty.');
            return;
        }
        const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
        alert(`Thank you! Your order of R${total.toFixed(2)} has been placed. (Prototype — no real payment processed.)`);
        cart = [];
        updateCartUI();
        closeCart();
    });
}

// Initial cart render
updateCartUI();

// ============ 4. PRODUCT SEARCH ============
const searchInput = document.getElementById('searchInput');
if (searchInput) {
    searchInput.addEventListener('input', e => {
        const term = e.target.value.toLowerCase();
        document.querySelectorAll('.product').forEach(card => {
            const name = (card.getAttribute('data-name') || '').toLowerCase();
            card.style.display = name.includes(term) ? '' : 'none';
        });
    });
}

// ============ 5. NEWSLETTER SUBSCRIBE ============
const subscribeBtn = document.getElementById('subscribeBtn');
const emailInput = document.getElementById('emailInput');
if (subscribeBtn && emailInput) {
    subscribeBtn.addEventListener('click', () => {
        const email = emailInput.value.trim();
        if (email.includes('@') && email.includes('.')) {
            alert('Thank you! ' + email + ' has been subscribed to CraftConnect SA updates.');
            emailInput.value = '';
        } else {
            alert('Please enter a valid email address.');
        }
    });
}

// ============ 6. LOGIN / SIGN UP PLACEHOLDERS ============
const loginBtn = document.querySelector('.login');
const signupBtn = document.querySelector('.signup');
if (loginBtn) {
    loginBtn.addEventListener('click', () => alert('Login page coming soon — this is a prototype.'));
}
if (signupBtn) {
    signupBtn.addEventListener('click', () => alert('Sign up page coming soon — this is a prototype.'));
}
