// Countdown Timer
function updateCountdown() {
    const weddingDate = new Date('2026-02-11T21:00:00').getTime();
    const now = new Date().getTime();
    const distance = weddingDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Update countdown
    const countdownDays = document.getElementById('countdown-days');
    const countdownHours = document.getElementById('countdown-hours');
    const countdownMinutes = document.getElementById('countdown-minutes');
    const countdownSeconds = document.getElementById('countdown-seconds');

    if (countdownDays) countdownDays.textContent = days;
    if (countdownHours) countdownHours.textContent = hours;
    if (countdownMinutes) countdownMinutes.textContent = minutes;
    if (countdownSeconds) countdownSeconds.textContent = seconds;

    if (distance < 0) {
        if (countdownDays) countdownDays.textContent = '0';
        if (countdownHours) countdownHours.textContent = '0';
        if (countdownMinutes) countdownMinutes.textContent = '0';
        if (countdownSeconds) countdownSeconds.textContent = '0';
        return;
    }
}

// Update countdown every second
setInterval(updateCountdown, 1000);
updateCountdown();

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.getElementById('navbar');
if (navbar) {
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
        if (currentScroll > 100) {
            navbar.style.opacity = '1';
        } else {
            navbar.style.opacity = '0.8';
        }
        lastScroll = currentScroll;
    });
}

// Audio Player
const audio = document.getElementById('backgroundMusic');
const audioToggle = document.getElementById('audioToggle');
const eventInfoCard = document.getElementById('eventInfoCard');
const closeEventInfo = document.getElementById('closeEventInfo');

if (audio && audioToggle) {
    let isPlaying = false;

    // Try to autoplay
    const tryAutoplay = () => {
        if (audio && !isPlaying) {
            audio.play().then(() => {
                isPlaying = true;
                updateAudioButton();
            }).catch(() => {
                // Autoplay blocked
            });
        }
    };

    // Multiple attempts to autoplay
    document.addEventListener('DOMContentLoaded', tryAutoplay);
    window.addEventListener('load', tryAutoplay);
    document.addEventListener('click', tryAutoplay, { once: true });
    document.addEventListener('touchstart', tryAutoplay, { once: true });
    document.addEventListener('scroll', tryAutoplay, { once: true });
    document.addEventListener('mousemove', tryAutoplay, { once: true });
    document.addEventListener('keydown', tryAutoplay, { once: true });

    audio.volume = 0.5;

    const updateAudioButton = () => {
        if (audioToggle) {
            const icon = audioToggle.querySelector('.audio-icon');
            if (icon) {
                icon.textContent = isPlaying ? '🎵' : '🔇';
            }
        }
    };

    audioToggle.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
            isPlaying = false;
    } else {
            audio.play();
            isPlaying = true;
        }
        updateAudioButton();
    });

    audio.addEventListener('ended', () => {
        audio.currentTime = 0;
        audio.play();
    });

    audio.addEventListener('error', () => {
        console.log('Audio loading error');
    });
}

// Event Info Card Toggle
if (audioToggle && eventInfoCard) {
    audioToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        if (eventInfoCard) {
            eventInfoCard.classList.toggle('active');
        }
    });
}

if (closeEventInfo && eventInfoCard) {
    closeEventInfo.addEventListener('click', () => {
        eventInfoCard.classList.remove('active');
    });
}

// Close event info when clicking outside
document.addEventListener('click', (e) => {
    if (eventInfoCard && audioToggle) {
        if (!eventInfoCard.contains(e.target) && !audioToggle.contains(e.target)) {
            eventInfoCard.classList.remove('active');
        }
    }
});

// Gift Box QR Code Toggle
document.querySelectorAll('.gift-item').forEach(item => {
    item.addEventListener('click', function() {
        const qrContainer = this.querySelector('.gift-qr-container');
        const bankInfo = this.querySelector('.gift-bank-info');
        const hint = this.querySelector('.gift-click-hint');

        if (qrContainer) {
            qrContainer.classList.toggle('gift-qr-visible');
        }
        if (bankInfo) {
            bankInfo.classList.toggle('gift-bank-visible');
        }
        if (hint) {
            hint.style.display = qrContainer && qrContainer.classList.contains('gift-qr-visible') ? 'none' : 'block';
        }
    });
});

// Lightbox for Images
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');

let currentImageIndex = 0;
const images = [];

// Collect all images
document.querySelectorAll('img').forEach(img => {
    if (img.src && !img.classList.contains('gift-qr-image')) {
        images.push(img.src);
    }
});

function openLightbox(index) {
    if (lightbox && lightboxImg && images.length > 0) {
        currentImageIndex = index;
        lightboxImg.src = images[currentImageIndex];
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    }
}

function closeLightbox() {
    if (lightbox) {
    lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function showNextImage() {
    if (images.length > 0) {
    currentImageIndex = (currentImageIndex + 1) % images.length;
        if (lightboxImg) {
    lightboxImg.src = images[currentImageIndex];
        }
    }
}

function showPrevImage() {
    if (images.length > 0) {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        if (lightboxImg) {
    lightboxImg.src = images[currentImageIndex];
}
    }
}

// Add click event to images
document.querySelectorAll('img').forEach((img, index) => {
    if (!img.classList.contains('gift-qr-image')) {
        img.style.cursor = 'pointer';
        img.addEventListener('click', () => {
            const imgIndex = images.indexOf(img.src);
            if (imgIndex !== -1) {
                openLightbox(imgIndex);
            }
        });
    }
});

if (lightboxClose) {
lightboxClose.addEventListener('click', closeLightbox);
}

if (lightboxNext) {
lightboxNext.addEventListener('click', showNextImage);
}

if (lightboxPrev) {
lightboxPrev.addEventListener('click', showPrevImage);
}

if (lightbox) {
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});
}

// Keyboard navigation for lightbox
document.addEventListener('keydown', (e) => {
    if (lightbox && lightbox.classList.contains('active')) {
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowRight') {
            showNextImage();
        } else if (e.key === 'ArrowLeft') {
            showPrevImage();
        }
    }
});

// Envelope Opening
const envelope = document.getElementById('envelope');
if (envelope) {
    envelope.addEventListener('click', () => {
        envelope.classList.toggle('opened');
    });
}

// Interactive Buttons Functions
function openWishesModal() {
    // Scroll to gift box section or show wishes modal
    const giftBox = document.getElementById('gift-box');
    if (giftBox) {
        giftBox.scrollIntoView({ behavior: 'smooth' });
    }
}

function openGiftModal() {
    const giftBox = document.getElementById('gift-box');
    if (giftBox) {
        giftBox.scrollIntoView({ behavior: 'smooth' });
    }
}

// Heart and Like animations
function sendHeart() {
    createFloatingEmoji('❤️');
}

function sendLike() {
    createFloatingEmoji('👍');
}

function createFloatingEmoji(emoji) {
    const floatingEmoji = document.createElement('div');
    floatingEmoji.textContent = emoji;
    floatingEmoji.style.position = 'fixed';
    floatingEmoji.style.fontSize = '2rem';
    floatingEmoji.style.pointerEvents = 'none';
    floatingEmoji.style.zIndex = '9999';
    floatingEmoji.style.left = '50%';
    floatingEmoji.style.top = '50%';
    floatingEmoji.style.transform = 'translate(-50%, -50%)';
    floatingEmoji.style.animation = 'floatUp 2s ease-out forwards';
    
    document.body.appendChild(floatingEmoji);
    
    setTimeout(() => {
        floatingEmoji.remove();
    }, 2000);
}

// Add float animation
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
        100% {
            opacity: 0;
            transform: translate(-50%, -150%) scale(1.5);
        }
    }
    
    .touch-device .hover-panel:hover,
    .touch-device .event-card-hover:hover {
        transform: none;
    }
    
    .hover-panel.hover-active,
    .event-card-hover.hover-active {
        transform: rotateY(180deg);
    }
`;
document.head.appendChild(style);

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.hover-panel, .event-card-hover, .gift-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Falling Hearts Animation
function createFallingHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.textContent = '❤️';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDuration = (Math.random() * 3 + 2) + 's';
    heart.style.fontSize = (Math.random() * 10 + 15) + 'px';
    heart.style.opacity = Math.random() * 0.5 + 0.3;
    
    const fallingHearts = document.getElementById('fallingHearts');
    if (fallingHearts) {
        fallingHearts.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 5000);
    }
}

// Create falling hearts periodically
setInterval(createFallingHeart, 300);

// Gallery Lightbox
document.querySelectorAll('.gallery-item img').forEach(img => {
    img.addEventListener('click', function() {
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightboxImg');
        if (lightbox && lightboxImg) {
            lightboxImg.src = this.src;
            lightbox.classList.add('active');
        }
    });
});
