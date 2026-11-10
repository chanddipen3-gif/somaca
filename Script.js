
// ================= CORE STATE =================
let shoppingCart = JSON.parse(localStorage.getItem('somaca_cart') || '[]');
const somacaProducts = [
    { id: "oudh", name: "SOMACA Oudh & Vanille", price: 499, notes: "Smoky Agarwood • Madagascar Vanilla • Warm Amber", vibe: "Head-Turner Rating: 9.9/10 • Late Night & Royal Weddings", aura: "rgba(212,145,55,0.15)", story: "A midnight walk through ancient palaces, leaving a trail of warm smoke and sweet longing.", img: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=600&q=80" },
    { id: "musk", name: "SOMACA Royal White Musk", price: 499, notes: "Pure White Musk • Soft Kannauj Rose • Sandalwood", vibe: "Signature Old-Money Aura • All-Day Elegance", aura: "rgba(220,220,220,0.15)", story: "Crisp linen sheets and morning sunlight. An effortless, clean whisper of royalty.", img: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=600&q=80" },
    { id: "amber", name: "SOMACA Artisanal Amber & Rose", price: 499, notes: "Damask Rose • Golden Amber • Kashmiri Saffron", vibe: "Festive & Romantic Statement", aura: "rgba(230,110,130,0.15)", story: "A celebration in full bloom. The richness of molten gold poured over crushed velvet petals.", img: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=600&q=80" }
];

// ================= UTILS =================
function sanitize(str) {
    if (!str) return '';
    const temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
}

function showToast(msg, type="success") {
    const container = document.getElementById('toast-container');
    if(!container) return;
    const toast = document.createElement('div');
    toast.style = `background: #111; color: #fff; border: 1px solid ${type==='success'?'#D4AF37':'#ff4d4d'}; padding: 15px; font-size: 13px; margin-bottom: 10px; border-radius: 4px; box-shadow: 0 5px 15px rgba(0,0,0,0.5);`;
    toast.innerText = msg;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

function switchView(viewId) {
    // Scroll smoothly to section if it exists, since it's a single page layout mostly
    const el = document.getElementById(viewId);
    if(el) {
        el.scrollIntoView({behavior: 'smooth'});
    }
}
function scrollToCollections() {
    switchView('somaca-perfumes-showcase');
}
function toggleDrawer(id) {
    const el = document.getElementById(id);
    if(el) {
        if(el.style.transform === 'translateX(0px)') el.style.transform = 'translateX(100%)';
        else el.style.transform = 'translateX(0px)';
    }
}

// ================= MODULE 1: PRELOADER & PROGRESS =================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        if(preloader) preloader.style.display = 'none';
    }, 2500);
});

window.addEventListener('scroll', () => {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = (winScroll / height) * 100;
    const progress = document.getElementById('reading-progress');
    if(progress) progress.style.width = scrolled + "%";
});

// ================= MODULE 2: GREETING & VAULT =================
function setGreeting() {
    const hour = new Date().getHours();
    const bar = document.getElementById('greeting-bar');
    if(!bar) return;
    if(hour >= 6 && hour < 18) {
        bar.innerText = "Good Afternoon — Discover Your Daytime Royal Aura | Free Express Shipping on Prepaid Orders";
    } else {
        bar.innerText = "Welcome to the Midnight Atelier — Explore Deep Nocturnal Oudh | Free Express Shipping on Prepaid Orders";
    }
}
setGreeting();

function unlockPrivateVault() {
    const vault = document.getElementById('private-vault-locker');
    if(vault) {
        vault.style.opacity = '0';
        vault.style.transform = 'scale(1.1)';
        setTimeout(() => { vault.style.display = 'none'; }, 1500);
    }
}

let isAudioPlaying = false;
function toggleAudio() {
    const audio = document.getElementById('ambient-audio');
    const icon = document.getElementById('audio-icon');
    if(!audio || !icon) return;
    if(isAudioPlaying) {
        audio.pause();
        icon.innerHTML = '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line>';
    } else {
        audio.play().catch(e => console.log('Audio autoplay blocked'));
        icon.innerHTML = '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>';
    }
    isAudioPlaying = !isAudioPlaying;
}

// ================= MODULE 3: GOLDEN SMOKE CANVAS =================
const canvas = document.getElementById('hero-canvas');
let ctx = null, w = 0, h = 0, particles = [];
if(canvas) {
    ctx = canvas.getContext('2d');
    function resizeCanvas() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight * 0.85;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class GoldParticle {
        constructor() {
            this.x = Math.random() * w;
            this.y = Math.random() * h;
            this.size = Math.random() * 1.5;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if(this.x < 0 || this.x > w) this.speedX *= -1;
            if(this.y < 0 || this.y > h) this.speedY *= -1;
        }
        draw() {
            ctx.fillStyle = `rgba(212, 175, 55, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    for(let i=0; i<60; i++) particles.push(new GoldParticle());

    let time = 0;
    function animateCanvas() {
        ctx.clearRect(0, 0, w, h);

        ctx.beginPath();
        ctx.moveTo(0, h/2);
        for(let i=0; i<w; i+=20) {
            let waveY = h/2 + Math.sin((i*0.01) + time) * 50 * Math.sin(time*0.5);
            ctx.lineTo(i, waveY);
        }
        ctx.lineWidth = 1;
        ctx.strokeStyle = "rgba(212, 175, 55, 0.05)";
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, h/2 + 50);
        for(let i=0; i<w; i+=20) {
            let waveY = h/2 + 50 + Math.cos((i*0.008) + time*1.2) * 60;
            ctx.lineTo(i, waveY);
        }
        ctx.strokeStyle = "rgba(197, 160, 89, 0.05)";
        ctx.stroke();

        particles.forEach(p => { p.update(); p.draw(); });
        time += 0.02;
        requestAnimationFrame(animateCanvas);
    }
    animateCanvas();
}
const spotlight = document.getElementById('hero-spotlight');
const heroSection = document.getElementById('hero-section');
if (heroSection && spotlight) {
    heroSection.addEventListener('mousemove', (e) => {
        let rect = spotlight.getBoundingClientRect();
        let x = ((e.clientX - rect.left) / rect.width) * 100;
        let y = ((e.clientY - rect.top) / rect.height) * 100;
        spotlight.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(212,175,55,0.2) 0%, rgba(8,8,8,0.95) 60%)`;
    });
}


// ================= MODULE 4: COUNTDOWN =================
setInterval(() => {
    const countdown = document.getElementById('marquee-countdown');
    if(countdown) {
        let now = new Date();
        let eod = new Date();
        eod.setHours(23, 59, 59, 999);
        let diff = eod - now;
        let h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        let s = Math.floor((diff % (1000 * 60)) / 1000);
        countdown.innerText = `${h.toString().padStart(2,'0')}h : ${m.toString().padStart(2,'0')}m : ${s.toString().padStart(2,'0')}s`;
    }
}, 1000);


// ================= MODULE 5: RENDER PRODUCTS =================
function renderSomacaPerfumes() {
    const container = document.getElementById('perfumes-container');
    if(!container) return;

    let html = '';
    somacaProducts.forEach(p => {
        let badgeHtml = '<div class="coming-soon-badge" style="background:var(--gold); color:#000;">Batch #01: Only 9 Left</div>';
        html += `
            <div class="showcase-block reveal upgraded-product-card" style="padding: 20px; background: rgba(18,18,18,0.4); border: 1px solid var(--border-subtle); --aura-color: ${p.aura};" onmousemove="handleTilt(event, this)" onmouseleave="resetTilt(this)">
                ${badgeHtml}
                <div class="perfume-img" style="background: radial-gradient(circle, #333 0%, #080808 100%); display:flex; align-items:center; justify-content:center; border: 1px solid var(--gold); border-radius: 4px; overflow:hidden; width: 100%; height: 200px; margin-bottom: 20px; transform: translateZ(30px);">
                     <img src="${p.img}" style="width: 100%; height: 100%; object-fit: cover;" alt="${p.name}">
                </div>
                <h4 class="perfume-title luxury-font" style="transform: translateZ(20px); font-size: 1.2rem;">${p.name}</h4>
                <div class="perfume-notes" style="transform: translateZ(15px); font-size: 10px; color: var(--gold-light); margin-bottom: 15px;">${p.notes}</div>
                <div class="perfume-vibe" style="transform: translateZ(10px); font-size: 11px; color: var(--text-muted); font-style: italic;">${p.vibe}</div>

                <div class="longevity-toggle" onclick="this.classList.toggle('is-fabric'); let l=this.querySelectorAll('.toggle-label'); l[0].classList.toggle('active'); l[1].classList.toggle('active');">
                    <span class="toggle-label active">Skin (12h)</span>
                    <div class="toggle-track"><div class="toggle-thumb"></div></div>
                    <span class="toggle-label">Fabric (24h)</span>
                </div>

                <div style="transform: translateZ(20px); width: 100%;">
                    <div class="product-pricing" style="display: flex; justify-content: center; gap: 10px; margin: 10px 0;">
                        <span class="sell-price" style="font-size: 18px; color: var(--gold);">₹${p.price}</span>
                    </div>
                    <div style="display: flex; gap: 10px;">
                        <button class="hero-explore-btn" style="flex:1; padding: 10px;" onclick="addToCart('${p.id}')">Add to Cart</button>
                        <button class="hero-explore-btn" style="flex:1; padding: 10px;" onclick="toggleStory('${p.id}')">Feel The Scene</button>
                    </div>
                </div>
                <div id="story-${p.id}" class="poetic-story" style="display:none; transform: translateZ(10px); margin-top: 15px; font-style: italic; color: #aaa;">${p.story}</div>
            </div>
        `;
    });

    // Add Trio Box manually
    html += `
            <div class="showcase-block reveal upgraded-product-card" style="padding: 20px; background: rgba(18,18,18,0.4); border: 1px solid var(--border-subtle); --aura-color: rgba(212,175,55,0.2);" onmousemove="handleTilt(event, this)" onmouseleave="resetTilt(this)">
                <div class="coming-soon-badge" style="background:var(--gold); color:#000;">Collector's Edition</div>
                <div class="perfume-img" style="background: radial-gradient(circle, #333 0%, #080808 100%); display:flex; align-items:center; justify-content:center; border: 1px solid var(--gold); border-radius: 4px; overflow:hidden; width: 100%; height: 200px; margin-bottom: 20px; transform: translateZ(30px);">
                     <span style="color:var(--gold); font-size: 10px; letter-spacing: 2px;">MATTE BOX</span>
                </div>
                <h4 class="perfume-title luxury-font" style="transform: translateZ(20px); font-size: 1.2rem;">Royal Heritage Trio Box</h4>
                <div class="perfume-notes" style="transform: translateZ(15px); font-size: 10px; color: var(--gold-light); margin-bottom: 15px;">Curate Any 3 Roll-Ons</div>
                <div class="perfume-vibe" style="transform: translateZ(10px); font-size: 11px; color: var(--text-muted); font-style: italic;">Your personalized olfactory wardrobe.</div>
                <div style="transform: translateZ(20px); width: 100%; margin-top: 20px;">
                    <button class="hero-explore-btn" style="width: 100%; padding: 10px;" onclick="switchView('trio-section-link'); document.querySelector('.royal-trio-section').scrollIntoView({behavior:'smooth'})">Build Your Trio - ₹999</button>
                </div>
            </div>
    `;
    container.innerHTML = html;
}

function handleTilt(e, card) {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
}
function resetTilt(card) {
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
}
function toggleStory(id) {
    const el = document.getElementById('story-' + id);
    if(el) el.style.display = el.style.display === 'block' ? 'none' : 'block';
}


// ================= MODULE 9: SCENT FINDER & TRIO =================
function nextQuizStep(choice) {
    document.getElementById('quiz-step-1').style.display = 'none';
    document.getElementById('quiz-step-2').style.display = 'block';
}
function showQuizResult(recommendation) {
    document.getElementById('quiz-step-2').style.display = 'none';
    document.getElementById('quiz-result').style.display = 'block';
    let prod = somacaProducts.find(p => p.name === recommendation);
    let html = `<p style="margin-bottom: 15px;">${recommendation}</p>`;
    if(prod) {
        html += `<button class="hero-explore-btn" onclick="addToCart('${prod.id}')">Add to Cart - ₹${prod.price}</button>`;
    }
    document.getElementById('quiz-recommendation').innerHTML = html;
}
function resetQuiz() {
    document.getElementById('quiz-result').style.display = 'none';
    document.getElementById('quiz-step-1').style.display = 'block';
}

let trioSlots = [null, null, null];
let activeTrioSlot = null;
function openBundleSelector(slotNum) {
    activeTrioSlot = slotNum;
    document.getElementById('trio-selector').style.display = 'block';
}
function selectTrioItem(productName) {
    trioSlots[activeTrioSlot - 1] = productName;
    const slotEl = document.getElementById('slot-' + activeTrioSlot);
    let prod = somacaProducts.find(p => p.name === productName);
    if(prod) {
        slotEl.style.backgroundImage = `url(${prod.img})`;
        slotEl.innerText = '';
        slotEl.title = prod.name;
    }
    document.getElementById('trio-selector').style.display = 'none';
    checkTrioComplete();
}
function checkTrioComplete() {
    const filledSlots = trioSlots.filter(slot => slot !== null).length;
    const trioBtn = document.getElementById('add-trio-btn');
    const duoBtn = document.getElementById('add-duo-btn');

    if(filledSlots === 3) {
        trioBtn.style.opacity = '1';
        trioBtn.style.pointerEvents = 'auto';
    } else {
        trioBtn.style.opacity = '0.5';
        trioBtn.style.pointerEvents = 'none';
    }

    if(filledSlots >= 2) {
        duoBtn.style.opacity = '1';
        duoBtn.style.pointerEvents = 'auto';
    } else {
        duoBtn.style.opacity = '0.5';
        duoBtn.style.pointerEvents = 'none';
    }
}
function addTrioToCart() {
    let bundle = { id: "trio_bundle_" + Date.now(), name: "Royal Trio Custom Bundle", price: 999, qty: 1 };
    shoppingCart.push(bundle);
    saveCart();
    showToast("Royal Trio added to cart!", "success");
    toggleDrawer('cart-drawer');
}
function addDuoToCart() {
    let bundle = { id: "duo_bundle_" + Date.now(), name: "Layering Duo Custom Bundle", price: 799, qty: 1 };
    shoppingCart.push(bundle);
    saveCart();
    showToast("Layering Duo added to cart!", "success");
    toggleDrawer('cart-drawer');
}

// ================= CART & SHELF LOGIC =================
function addToCart(prodId) {
    let product = somacaProducts.find(p => p.id === prodId);
    if(!product) return;

    let existingItem = shoppingCart.find(item => item.id === prodId);
    if(existingItem) existingItem.qty += 1;
    else shoppingCart.push({...product, qty: 1});

    saveCart();
    showToast("Added to your shopping bag.", "success");
    toggleDrawer('cart-drawer');
}

function saveCart() {
    localStorage.setItem('somaca_cart', JSON.stringify(shoppingCart));
    renderCartDrawer();
    syncVirtualShelf();
}

function renderCartDrawer() {
    const badge = document.getElementById('cart-count');
    let totalItems = 0;
    let totalSellingPrice = 0;
    shoppingCart.forEach(i => { totalItems += i.qty; totalSellingPrice += i.price * i.qty; });
    if(badge) badge.innerText = totalItems;

    let billTotal = document.getElementById('bill-total');
    if(billTotal) {
        let gst = Math.round(totalSellingPrice * 0.18);
        billTotal.innerText = `₹${totalSellingPrice + gst}`;
    }
}

function syncVirtualShelf() {
    const shelf = document.getElementById('virtual-shelf-container');
    if(!shelf) return;
    shelf.innerHTML = '';
    shoppingCart.forEach(item => {
        for(let i=0; i<item.qty; i++) {
            shelf.innerHTML += `<div class="shelf-bottle" title="${sanitize(item.name)}"></div>`;
        }
    });
}

function checkoutWithWaxSeal() {
    if(shoppingCart.length === 0) {
        showToast("Your bag is empty.", "error");
        return;
    }
    const seal = document.getElementById('wax-seal-anim');
    const text = document.getElementById('btn-text');
    const msg = document.getElementById('reservation-msg');

    if(navigator.vibrate) navigator.vibrate(15);
    if(text) text.style.opacity = '0';
    if(seal) { seal.style.transform = 'translate(-50%, -50%) scale(1)'; seal.style.opacity = '1'; }

    setTimeout(() => {
        if(msg) { msg.innerText = `Reserved Exclusively For You`; msg.style.display = 'block'; }
        setTimeout(() => {
            showToast("Order placed.", "success");
            shoppingCart = [];
            saveCart();
            if(text) text.style.opacity = '1';
            if(seal) { seal.style.transform = 'translate(-50%, -50%) scale(0)'; seal.style.opacity = '0'; }
            if(msg) msg.style.display = 'none';
        }, 1500);
    }, 500);
}

// ================= EXIT INTENT & CURSOR =================
let exitTriggered = false;
document.addEventListener('mouseout', (e) => {
    if(e.clientY < 50 && !exitTriggered) {
        exitTriggered = true;
        const modal = document.getElementById('exit-intent-modal');
        if(modal) modal.style.display = 'flex';
    }
});
function applyExitPromo() {
    showToast("Founder's Pass Applied!", "success");
    document.getElementById('exit-intent-modal').style.display = 'none';
    toggleDrawer('cart-drawer');
}

document.addEventListener('mousemove', (e) => {
    const cursor = document.getElementById('custom-cursor');
    if(cursor) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    }
    // Particle trail
    if(Math.random() > 0.4) return;
    const p = document.createElement('div');
    p.className = 'roller-particle';
    p.style.left = (e.clientX - 2) + 'px';
    p.style.top = (e.clientY - 2) + 'px';
    const size = Math.random() * 4 + 2;
    p.style.width = size + 'px';
    p.style.height = size + 'px';
    document.body.appendChild(p);
    setTimeout(() => { p.remove(); }, 800);
});

// Init
window.addEventListener('load', () => {
    renderSomacaPerfumes();
    renderCartDrawer();
    syncVirtualShelf();

    // Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    setTimeout(() => {
        document.querySelectorAll('.reveal').forEach(el => {
            const rect = el.getBoundingClientRect();
            if(rect.top < window.innerHeight) {
                el.classList.add('active');
                observer.unobserve(el);
            }
        });
    }, 100);
});
