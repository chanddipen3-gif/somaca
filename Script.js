// SOMACA Core JS - Strict Luxury Layout

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. PRODUCT DATA ---
    const products = [
        {
            id: "p1",
            name: "SOMACA Oudh & Vanille (10ml Roll-On)",
            price: 499,
            notes: "Smoky Agarwood • Madagascar Vanilla • Warm Amber",
            img: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=600&q=80"
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

    // --- 2. RENDER PRODUCTS ---
    const gridContainer = document.getElementById('product-grid-container');
    if (gridContainer) {
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
                    <button class="btn-gold" data-id="${p.id}" aria-label="Add to Cart">Add to Cart</button>
                </div>
            `;
        });
        gridContainer.innerHTML = html;

        // Attach event listeners to generated buttons
        const addBtns = gridContainer.querySelectorAll('.btn-gold');
        addBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');
                addToCart(id);
            });
        });
    }

    // --- 3. CART MANAGEMENT ---
    const cartDrawer = document.getElementById('cart-drawer');
    const drawerOverlay = document.getElementById('drawer-overlay');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalEl = document.getElementById('cart-total-price');
    const cartBadge = document.getElementById('cart-badge-count');

    function toggleCart() {
        if (cartDrawer && drawerOverlay) {
            if (cartDrawer.classList.contains('open')) {
                cartDrawer.classList.remove('open');
                drawerOverlay.style.display = 'none';
            } else {
                cartDrawer.classList.add('open');
                drawerOverlay.style.display = 'block';
                renderCart();
            }
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

    // Expose updateQty globally for inline handlers in cart innerHTML
    window.updateQty = function(id, delta) {
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
    };

    function renderCart() {
        if (!cartItemsContainer || !cartTotalEl) return;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `<div class="cart-empty-msg">Your bag is currently empty.</div>`;
            cartTotalEl.innerText = '₹0';
            return;
        }

        let html = '';
        let total = 0;

        cart.forEach(item => {
            total += item.price * item.qty;
            html += `
                <div class="cart-item">
                    <img src="${item.img}" class="cart-item-img" alt="${item.name}">
                    <div class="cart-item-info">
                        <div>
                            <div class="cart-item-title">${item.name}</div>
                            <div class="cart-item-price">₹${item.price}</div>
                        </div>
                        <div class="cart-qty-controls">
                            <button class="cart-qty-btn" onclick="updateQty('${item.id}', -1)">-</button>
                            <span class="cart-qty-val">${item.qty}</span>
                            <button class="cart-qty-btn" onclick="updateQty('${item.id}', 1)">+</button>
                        </div>
                    </div>
                </div>
            `;
        });

        cartItemsContainer.innerHTML = html;
        cartTotalEl.innerText = `₹${total}`;
    }

    function updateCartBadge() {
        if (!cartBadge) return;
        let totalItems = 0;
        cart.forEach(i => totalItems += i.qty);
        cartBadge.innerText = totalItems;
    }

    // --- 4. EVENT LISTENERS ---

    // Header Cart Button
    const openCartBtn = document.getElementById('open-cart-btn');
    if (openCartBtn) openCartBtn.addEventListener('click', toggleCart);

    // Cart Close Button
    const closeCartBtn = document.getElementById('close-cart-btn');
    if (closeCartBtn) closeCartBtn.addEventListener('click', toggleCart);

    // Drawer Overlay Close
    if (drawerOverlay) drawerOverlay.addEventListener('click', toggleCart);

    // Hero Explore Button
    const exploreBtn = document.getElementById('explore-btn');
    const collectionSection = document.getElementById('collection');
    if (exploreBtn && collectionSection) {
        exploreBtn.addEventListener('click', () => {
            collectionSection.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Mobile Sticky Buy Bar Button
    const mobileOrderBtn = document.getElementById('mobile-order-btn');
    if (mobileOrderBtn) {
        mobileOrderBtn.addEventListener('click', () => {
            addToCart('p1'); // Defaults to first product
        });
    }

    // Checkout Online Button
    const checkoutUpiBtn = document.getElementById('checkout-upi-btn');
    if (checkoutUpiBtn) {
        checkoutUpiBtn.addEventListener('click', () => {
            if (cart.length === 0) {
                const msg = document.querySelector('.cart-empty-msg');
                if(msg) msg.innerText = "Please add items to your bag first.";
                return;
            }
            // Clear cart and show inline message instead of native alert
            cart = [];
            localStorage.setItem('somaca_cart', JSON.stringify(cart));
            updateCartBadge();

            if(cartItemsContainer) {
                cartItemsContainer.innerHTML = `<div class="cart-empty-msg" style="color: var(--gold-primary);">Redirecting to Secure UPI Checkout...</div>`;
            }
            if(cartTotalEl) cartTotalEl.innerText = '₹0';

            setTimeout(() => toggleCart(), 2000);
        });
    }

    // WhatsApp Order Button
    const checkoutWaBtn = document.getElementById('checkout-wa-btn');
    if (checkoutWaBtn) {
        checkoutWaBtn.addEventListener('click', (e) => {
            if (cart.length === 0) {
                e.preventDefault();
                const msg = document.querySelector('.cart-empty-msg');
                if(msg) msg.innerText = "Please add items to your bag first.";
                return;
            }

            let summary = "Hello SOMACA, I would like to place an order:\n\n";
            let total = 0;
            cart.forEach(item => {
                summary += `${item.qty}x ${item.name} - ₹${item.price * item.qty}\n`;
                total += item.price * item.qty;
            });
            summary += `\nGrand Total: ₹${total}`;

            const giftCheckbox = document.getElementById('gift-checkbox');
            const giftNote = document.getElementById('gift-note-input');
            if (giftCheckbox && giftCheckbox.checked && giftNote && giftNote.value.trim() !== '') {
                summary += `\n\nGift Note: "${giftNote.value.trim()}"`;
            }

            const waUrl = `https://wa.me/918373960622?text=${encodeURIComponent(summary)}`;

            // Clear cart logic optional, but let's just open link
            window.open(waUrl, '_blank');
        });
    }

    // Initialize
    updateCartBadge();
});
