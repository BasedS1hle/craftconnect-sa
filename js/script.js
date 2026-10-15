// ============================================
// CraftConnect SA — Interactive Features
// JGA 2026 — Digital Entrepreneurship Prototype
// ============================================

// ---------- Smooth scroll for nav links ----------
document.querySelectorAll('nav a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});

// ---------- Shop Now button ----------
const shopBtn = document.querySelector('.shop-btn');
if (shopBtn) {
    shopBtn.addEventListener('click', () => {
        const shopSection = document.querySelector('#shop');
        if (shopSection) shopSection.scrollIntoView({ behavior: 'smooth' });
    });
}

// ---------- Simple cart counter ----------
let cartCount = 0;
const buttonsContainer = document.querySelector('.buttons');
const cartBadge = document.createElement('span');
cartBadge.style.cssText = 'background:#D4A373;color:white;border-radius:50%;padding:2px 8px;font-size:12px;margin-left:8px;display:none';
if (buttonsContainer) {
    buttonsContainer.appendChild(cartBadge);
}

document.querySelectorAll('.add-cart').forEach(btn => {
    btn.addEventListener('click', () => {
        cartCount++;
        cartBadge.textContent = cartCount;
        cartBadge.style.display = 'inline-block';

        const original = btn.textContent;
        btn.textContent = '✓ Added';
        btn.style.background = '#4CAF50';
        setTimeout(() => {
            btn.textContent = original;
            btn.style.background = '';
        }, 1200);
    });
});

// ---------- Product search ----------
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

// ---------- Newsletter subscribe ----------
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

// ---------- Login / Sign Up placeholders ----------
const loginBtn = document.querySelector('.login');
const signupBtn = document.querySelector('.signup');
if (loginBtn) {
    loginBtn.addEventListener('click', () => alert('Login page coming soon — this is a prototype.'));
}
if (signupBtn) {
    signupBtn.addEventListener('click', () => alert('Sign up page coming soon — this is a prototype.'));
}
