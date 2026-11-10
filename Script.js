// SOMACA Core JS - Strict Luxury Layout

const products = [
    {
        id: "p1",
        name: "SOMACA Oudh & Vanille (10ml Roll-On)",
        price: 499,
        notes: "Smoky Agarwood • Madagascar Vanilla • Warm Amber",
        img: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: "p2",
        name: "SOMACA Royal White Musk (10ml Roll-On)",
        price: 499,
        notes: "Pure White Musk • Soft Rose Petals • Sandalwood",
        img: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: "p3",
        name: "SOMACA Artisanal Amber & Rose (10ml Roll-On)",
        price: 499,
        notes: "Damask Rose • Golden Amber • Saffron Spice",
        img: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: "p4",
        name: "SOMACA Royal Trio Collector Box (Pick Any 3)",
        price: 999,
        notes: "Matte-Black Sliding Drawer Box & Velvet Insert",
        img: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=600&q=80"
    }
];

let cart = JSON.parse(localStorage.getItem('somaca_cart') || '[]');

function renderProducts() {
    const container = document.getElementById('product-grid-container');
    if (!container) return;

    let html = '';
    products.forEach(p => {
        html += `
            <div class="product-card">
                <div>
                    <img src="${p.img}" alt="${p.name}" class="product-img">
                    <h3 class="product-title">${p.name}</h3>
                    <p class="product-notes">${p.notes}</p>
                    <div class="product-price">₹${p.price}</div>
                </div>
                <button class="btn-gold" onclick="addToCart('${p.id}')">Add to Cart</button>
            </div>
        `;
    });
    container.innerHTML = html;
}

function toggleCart() {
    const drawer = document.getElementById('cart-drawer');
    const overlay = document.getElementById('drawer-overlay');

    if (drawer.classList.contains('open')) {
        drawer.classList.remove('open');
        overlay.style.display = 'none';
    } else {
        drawer.classList.add('open');
        overlay.style.display = 'block';
        renderCart();
    }
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ ...product, qty: 1 });
    }

    localStorage.setItem('somaca_cart', JSON.stringify(cart));
    updateCartBadge();
    toggleCart();
}

function updateQty(id, delta) {
    const index = cart.findIndex(item => item.id === id);
    if (index > -1) {
        cart[index].qty += delta;
        if (cart[index].qty <= 0) {
            cart.splice(index, 1);
        }
        localStorage.setItem('somaca_cart', JSON.stringify(cart));
        renderCart();
        updateCartBadge();
    }
}

function renderCart() {
    const container = document.getElementById('cart-items');
    const emptyMsg = document.getElementById('cart-empty-msg');
    const totalEl = document.getElementById('cart-total-price');

    if (cart.length === 0) {
        container.innerHTML = `<div style="text-align: center; margin-top: 40px; color: var(--text-muted); font-size: 0.9rem;">Your bag is currently empty.</div>`;
        totalEl.innerText = '₹0';
        return;
    }

    let html = '';
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.qty;
        html += `
            <div class="cart-item">
                <img src="${item.img}" class="cart-item-img" alt="${item.name}">
                <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
                    <div>
                        <div style="font-size: 0.85rem; color: #fff; font-weight: 500; line-height: 1.3; margin-bottom: 4px;">${item.name}</div>
                        <div style="font-size: 0.9rem; color: var(--gold-primary);">₹${item.price}</div>
                    </div>
                    <div style="display: flex; align-items: center; gap: 12px; margin-top: 8px;">
                        <button onclick="updateQty('${item.id}', -1)" style="background: none; border: 1px solid var(--border-gold); color: #fff; width: 24px; height: 24px; cursor: pointer;">-</button>
                        <span style="font-size: 0.85rem;">${item.qty}</span>
                        <button onclick="updateQty('${item.id}', 1)" style="background: none; border: 1px solid var(--border-gold); color: #fff; width: 24px; height: 24px; cursor: pointer;">+</button>
                    </div>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
    totalEl.innerText = `₹${total}`;
}

function updateCartBadge() {
    const badge = document.getElementById('cart-badge-count');
    if (!badge) return;
    let totalItems = 0;
    cart.forEach(i => totalItems += i.qty);
    badge.innerText = totalItems;
}

function checkoutUPI() {
    if(cart.length === 0) {
        const emptyMsg = document.getElementById('cart-empty-msg');
        if(emptyMsg) emptyMsg.innerText = "Your bag is empty. Please add items to checkout.";
        return;
    }

    // Simulate checkout success
    cart = [];
    localStorage.setItem('somaca_cart', JSON.stringify(cart));
    updateCartBadge();

    const container = document.getElementById('cart-items');
    if(container) {
        container.innerHTML = `<div style="text-align: center; margin-top: 40px; color: var(--gold-primary); font-size: 1.1rem; font-family: var(--font-serif);">Redirecting to Secure UPI Checkout...</div>`;
    }
    document.getElementById('cart-total-price').innerText = '₹0';

    setTimeout(() => {
        toggleCart();
    }, 2000);
}

// Init
window.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateCartBadge();
});
