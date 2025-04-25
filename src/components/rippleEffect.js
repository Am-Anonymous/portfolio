/**
 * Ripple Effect with Maximum Volume Click Sound
 */

// ======================
// 1. Initialization Styles
// ======================

if (!document.getElementById('ripple-styles')) {
  const style = document.createElement('style');
  style.id = 'ripple-styles';
  style.textContent = `
    @keyframes micro-ripple {
      to { transform: scale(4); opacity: 0; }
    }
    html {
      text-size-adjust: 100%;
    }
  `;
  document.head.appendChild(style);
}

// ======================
// 2. Core Ripple Functions
// ======================

function hslToRgb(h, s, l) {
  s /= 100;
  l /= 100;
  const k = n => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = n => l - a * Math.max(-1, Math.min(k(n) - 3, 9 - k(n), 1));
  return [Math.round(255 * f(0)), Math.round(255 * f(8)), Math.round(255 * f(4))];
}

function createRipple(x, y) {
  const ripple = document.createElement('span');
  const [r, g, b] = hslToRgb(Math.floor(Math.random() * 360), 100, 50);

  Object.assign(ripple.style, {
    position: 'fixed',
    borderRadius: '50%',
    pointerEvents: 'none',
    zIndex: '9999',
    width: '10px',
    height: '10px',
    left: `${x - 5}px`,
    top: `${y - 5}px`,
    backgroundColor: `rgba(${r}, ${g}, ${b}, 0.7)`,
    transform: 'scale(1)',
    opacity: '0.7',
    animation: 'micro-ripple 400ms linear forwards'
  });

  return ripple;
}

// ======================
// 3. Sound System at Maximum Volume
// ======================

const MAX_VOLUME = 1.0; // 100% volume
let soundReady = false;

// Base64 encoded fallback click sound (louder)
const FALLBACK_SOUND = 'data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU...';

async function initSoundSystem() {
  if (soundReady) return;

  try {
    // First try loading external sound file at MAX volume
    window.rippleSound = new Audio();
    window.rippleSound.volume = MAX_VOLUME;
    window.rippleSound.src = window.location.origin + '/click.mp3';
    
    // Add cache buster to prevent loading issues
    window.rippleSound.src += '?v=' + Date.now();
    
    await new Promise((resolve, reject) => {
      window.rippleSound.addEventListener('canplaythrough', resolve);
      window.rippleSound.addEventListener('error', reject);
      window.rippleSound.load();
    });
    
    soundReady = true;
    console.log('Using external sound at maximum volume');
  } catch (e) {
    console.log('Using fallback sound at maximum volume');
    // Fallback to base64 encoded sound at MAX volume
    window.rippleSound = new Audio(FALLBACK_SOUND);
    window.rippleSound.volume = MAX_VOLUME;
    soundReady = true;
  }
}

function playClickSound() {
  if (!soundReady) return;
  
  try {
    window.rippleSound.currentTime = 0; // Rewind to start
    window.rippleSound.play().catch(e => {
      console.debug('Playback failed:', e);
    });
  } catch (e) {
    console.debug('Sound error:', e);
  }
}

// ======================
// 4. Touch/Mouse Handling
// ======================

const TAP_THRESHOLD = { duration: 300, distance: 10 };
let touchStart = { time: 0, y: 0 };

function handleTouchStart(e) {
  touchStart.time = Date.now();
  touchStart.y = e.touches[0].clientY;
}

function handleTouchEnd(e) {
  const touch = e.changedTouches[0];
  const duration = Date.now() - touchStart.time;
  const distance = Math.abs(touch.clientY - touchStart.y);
  
  if (duration < TAP_THRESHOLD.duration && distance < TAP_THRESHOLD.distance) {
    createAndPlay(touch.clientX, touch.clientY);
  }
}

function handleMouseClick(e) {
  createAndPlay(e.clientX, e.clientY);
}

function createAndPlay(x, y) {
  const ripple = createRipple(x, y);
  document.body.appendChild(ripple);
  setTimeout(() => ripple.remove(), 400);
  playClickSound();
}

// ======================
// 5. Initialize Everything
// ======================

document.addEventListener('touchstart', handleTouchStart, { passive: true });
document.addEventListener('touchend', handleTouchEnd, { passive: false });
document.addEventListener('mousedown', handleMouseClick);

// Initialize sound on first interaction
document.addEventListener('touchstart', initSoundSystem, { once: true });
document.addEventListener('mousedown', initSoundSystem, { once: true });

export default handleMouseClick;