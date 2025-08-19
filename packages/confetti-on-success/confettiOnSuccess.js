export default function confettiOnSuccess(options = {}) {
  // Define themes
  const themes = {
    party: {
      colors: ['#ff00ff', '#00ffff', '#ffff00', '#ff0080', '#00ffea'],
      particleCount: 1500,
      message: '🎉 Party Mode!',
    },
    elegant: {
      colors: ['#d4af37', '#ffffff', '#eee8aa'],
      particleCount: 1000,
      message: '✨ Elegant Mode',
    },
    crazy: {
      colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'],
      particleCount: 3000,
      message: '💥 Crazy Mode!',
    },
    easterEgg: {
      colors: ['#ffcc00', '#00ccff', '#ff6699'],
      particleCount: 100,
      message: '🐥 Easter Egg!',
      emojis: ['🐥', '🐸', '🍕']
    }
  };

  // Detect April Fool’s for easter egg mode automatically if date option not set
  const today = new Date();
  const isAprilFools = today.getMonth() === 3 && today.getDate() === 1;

  // Choose theme
  let themeKey;
  if (options.theme && themes[options.theme]) {
    themeKey = options.theme;
  } else if (isAprilFools) {
    themeKey = 'easterEgg';
  } else {
    const keys = Object.keys(themes).filter(k => k !== 'easterEgg');
    themeKey = keys[Math.floor(Math.random() * keys.length)];
  }
  const theme = themes[themeKey];

  // Merge options with theme defaults
  const config = {
    particleCount: options.particleCount ?? theme.particleCount,
    colors: options.colors ?? theme.colors,
    duration: options.duration ?? 2000,
    message: options.message ?? theme.message,
    emojis: options.emojis ?? theme.emojis ?? [],
  };

  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = 0;
  canvas.style.left = 0;
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = 9999;
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  function setSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  setSize();
  window.addEventListener('resize', setSize);

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * -canvas.height;
      this.size = Math.random() * 20 + 20;
      this.color = config.colors[Math.floor(Math.random() * config.colors.length)];
      this.speedX = (Math.random() - 0.5) * 4;
      this.speedY = Math.random() * 3 + 2;
      this.opacity = 1;
      this.decay = 0.015 + Math.random() * 0.04;
      this.tilt = Math.random() * 10 - 10;
      this.tiltSpeed = (Math.random() * 0.1) + 0.05;
      this.isEmoji = config.emojis.length > 0 && Math.random() < 0.3;
      this.emoji = this.isEmoji ? config.emojis[Math.floor(Math.random() * config.emojis.length)] : null;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.speedY += 0.05;
      this.tilt += this.tiltSpeed;
      this.opacity -= this.decay;
    }
    draw(ctx) {
      if (this.isEmoji && this.emoji) {
        ctx.font = `${this.size}px serif`;
        ctx.globalAlpha = this.opacity;
        ctx.fillText(this.emoji, this.x, this.y);
        ctx.globalAlpha = 1;
      } else {
        ctx.beginPath();
        ctx.lineWidth = this.size / 2;
        ctx.strokeStyle = `rgba(${hexToRgb(this.color)},${this.opacity})`;
        ctx.moveTo(this.x + this.tilt, this.y);
        ctx.lineTo(this.x, this.y + this.tilt + this.size / 2);
        ctx.stroke();
      }
    }
  }

  function hexToRgb(hex) {
    hex = hex.replace('#', '');
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `${r},${g},${b}`;
  }

  const particles = [];
  for (let i = 0; i < config.particleCount; i++) {
    particles.push(new Particle());
  }

  let animationFrameId;
  const start = performance.now();

  function animate(time) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p, i) => {
      p.update();
      if (p.opacity <= 0) {
        particles[i] = new Particle();
      }
      p.draw(ctx);
    });

    if (time - start < config.duration) {
      animationFrameId = requestAnimationFrame(animate);
    } else {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', setSize);
      document.body.removeChild(canvas);
    }
  }

  animate(start);

  // Success message banner
  if (config.message) {
    const banner = document.createElement('div');
    banner.innerText = config.message;
    banner.style.position = 'fixed';
    banner.style.top = '20px';
    banner.style.left = '50%';
    banner.style.transform = 'translateX(-50%)';
    banner.style.padding = '10px 20px';
    banner.style.background = 'rgba(0,0,0,0.7)';
    banner.style.color = '#fff';
    banner.style.fontSize = '20px';
    banner.style.borderRadius = '8px';
    banner.style.zIndex = 10000;
    banner.style.userSelect = 'none';
    document.body.appendChild(banner);
    setTimeout(() => banner.remove(), config.duration);
  }
}
