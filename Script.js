// SOMACA Core JS

// 1. Preloader & Progress
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    setTimeout(() => { document.getElementById('preloader').style.display = 'none'; }, 2500);
});

window.addEventListener('scroll', () => {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = (winScroll / height) * 100;
    document.getElementById('reading-progress').style.width = scrolled + "%";
});

// 2. Time-of-Day Greeting & Audio
function setGreeting() {
    const hour = new Date().getHours();
    const bar = document.getElementById('greeting-bar');
    if(hour >= 6 && hour < 18) {
        bar.innerText = "Good Afternoon — Discover Your Daytime Royal Aura | Free Express Shipping on Prepaid Orders";
    } else {
        bar.innerText = "Welcome to the Midnight Atelier — Explore Deep Nocturnal Oudh | Free Express Shipping on Prepaid Orders";
    }
}
setGreeting();

let isAudioPlaying = false;
function toggleAudio() {
    const audio = document.getElementById('ambient-audio');
    const icon = document.getElementById('audio-icon');
    if(isAudioPlaying) {
        audio.pause();
        icon.innerHTML = '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line>';
    } else {
        audio.play().catch(e => console.log('Audio autoplay blocked'));
        icon.innerHTML = '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>';
    }
    isAudioPlaying = !isAudioPlaying;
}

// 3. Liquid Gold Canvas & Spotlight
const canvas = document.getElementById('hero-canvas');
const ctx = canvas.getContext('2d');
let w, h, particles = [];

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

for(let i=0; i<80; i++) particles.push(new GoldParticle());

function animateCanvas() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animateCanvas);
}
animateCanvas();

// Interactive Spotlight
const spotlight = document.getElementById('hero-spotlight');
document.getElementById('hero-section').addEventListener('mousemove', (e) => {
    let rect = spotlight.getBoundingClientRect();
    let x = ((e.clientX - rect.left) / rect.width) * 100;
    let y = ((e.clientY - rect.top) / rect.height) * 100;
    spotlight.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(212,175,55,0.2) 0%, rgba(8,8,8,0.95) 60%)`;
});

// 5. Authentic Product Seeding & Rendering
const somacaProducts = [
    { id: "oudh", name: "SOMACA Oudh & Vanille", price: 499, notes: "Smoky Agarwood • Madagascar Vanilla • Warm Amber", vibe: "Head-Turner Rating: 9.9/10 • Late Night & Royal Weddings", aura: "rgba(212,145,55,0.15)", story: "A midnight walk through ancient palaces, leaving a trail of warm smoke and sweet longing." },
    { id: "musk", name: "SOMACA Royal White Musk", price: 499, notes: "Pure White Musk • Soft Kannauj Rose • Sandalwood", vibe: "Signature Old-Money Aura • All-Day Elegance", aura: "rgba(220,220,220,0.15)", story: "Crisp linen sheets and morning sunlight. An effortless, clean whisper of royalty." },
    { id: "amber", name: "SOMACA Artisanal Amber & Rose", price: 499, notes: "Damask Rose • Golden Amber • Kashmiri Saffron", vibe: "Festive & Romantic Statement", aura: "rgba(230,110,130,0.15)", story: "A celebration in full bloom. The richness of molten gold poured over crushed velvet petals." },
    { id: "trio", name: "SOMACA Royal Heritage Trio Box", price: 999, notes: "Curate Any 3 Roll-Ons", vibe: "Matte-Black Sliding Collector's Drawer Box", aura: "rgba(212,175,55,0.2)", story: "Your personalized olfactory wardrobe, housed in ultimate matte-black exclusivity." }
];

function renderPerfumes() {
    const container = document.getElementById('perfumes-container');
    if(!container) return;
    let html = '';
    somacaProducts.forEach(p => {
        let isBox = p.id === 'trio';
        html += `
            <div class="perfume-card reveal" style="--aura-color: ${p.aura};" onmousemove="handleTilt(event, this)" onmouseleave="resetTilt(this)">
                <!-- Fake image placeholder for now, since we have no real assets -->
                <div class="perfume-img" style="background: radial-gradient(circle, #333 0%, #080808 100%); display:flex; align-items:center; justify-content:center; border: 1px solid var(--gold); border-radius: 4px; overflow:hidden;">
                     <span style="color:var(--gold); font-size: 10px; letter-spacing: 2px;">${isBox ? 'MATTE BOX' : '10ML ROLL-ON'}</span>
                </div>
                <h4 class="perfume-title luxury-font">${p.name}</h4>
                <div class="perfume-notes">${p.notes}</div>
                <div class="perfume-vibe">${p.vibe}</div>

                <div style="transform: translateZ(20px);">
                    <button class="hero-explore-btn" style="padding: 10px 20px; font-size: 10px;" onclick="addToCart('${p.id}')">Add to Cart — ₹${p.price}</button>
                    <button class="hero-explore-btn" style="padding: 10px; font-size: 10px; margin-left: 5px;" onclick="toggleStory('${p.id}')">Feel The Scene</button>
                </div>

                <div class="scarcity-bar-container" style="transform: translateZ(10px);">
                    <div class="scarcity-bar-fill" style="width: ${Math.floor(Math.random() * 20 + 70)}%;"></div>
                </div>
                <div class="scarcity-text" style="transform: translateZ(10px);">Batch #01: Only 9 Bottles Left</div>

                <div id="story-${p.id}" class="poetic-story">${p.story}</div>
            </div>
        `;
    });
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
    el.style.display = el.style.display === 'block' ? 'none' : 'block';
}

renderPerfumes();

// 13. Wax Seal Checkout Animation
function checkoutWithWaxSeal() {
    if(!shoppingCart || shoppingCart.length === 0) {
        showToast("Your bag is empty.", "error");
        return;
    }

    const seal = document.getElementById('wax-seal-anim');
    const text = document.getElementById('btn-text');
    const msg = document.getElementById('reservation-msg');

    // Haptic feedback for mobile
    if(navigator.vibrate) navigator.vibrate(15);

    text.style.opacity = '0';
    seal.style.transform = 'translate(-50%, -50%) scale(1)';
    seal.style.opacity = '1';

    setTimeout(() => {
        let name = currentUser ? currentUser.name : "Guest";
        msg.innerText = `Reserved Exclusively For ${name}`;
        msg.style.display = 'block';

        setTimeout(() => {
            proceedToCheckout();
            // Reset for next time
            text.style.opacity = '1';
            seal.style.transform = 'translate(-50%, -50%) scale(0)';
            seal.style.opacity = '0';
            msg.style.display = 'none';
        }, 1500);
    }, 500);
}

// 14. Rollerball Trail
document.addEventListener('mousemove', (e) => {
    // Throttle slightly
    if(Math.random() > 0.3) return;

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

// 15. Live Reservation Toast Loop
const cities = ["South Delhi", "Bandra, Mumbai", "Jubilee Hills", "Koregaon Park", "Indiranagar", "Alipore, Kolkata"];
const prods = ["SOMACA Oudh & Vanille", "SOMACA Royal White Musk", "SOMACA Artisanal Amber & Rose", "Royal Heritage Trio Box"];

function triggerReservationToast() {
    const toast = document.getElementById('live-reservation-toast');
    if(!toast) return;

    document.getElementById('toast-city').innerText = cities[Math.floor(Math.random() * cities.length)];
    document.getElementById('toast-prod').innerText = prods[Math.floor(Math.random() * prods.length)];

    toast.style.left = '30px';

    setTimeout(() => {
        toast.style.left = '-350px';
    }, 4000);
}

// Trigger randomly every 15-25 seconds
setInterval(triggerReservationToast, Math.random() * 10000 + 15000);
setTimeout(triggerReservationToast, 5000);
