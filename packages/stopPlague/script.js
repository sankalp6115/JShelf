
// ===== THEME TOGGLE =====
const toggleWrapper = document.getElementById('themeToggle');
const toggleBtn = toggleWrapper.querySelector('.toggle-btn');
let darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

function applyTheme() {
  if (darkMode) {
    document.documentElement.style.setProperty('--bg-color', '#0d1117');
    document.documentElement.style.setProperty('--text-color', '#f0f0f0');
    document.documentElement.style.setProperty('--card-bg', 'rgba(255,255,255,0.05)');
    toggleWrapper.classList.add('toggle-dark');
    toggleBtn.style.transform = 'translateX(26px)';
  } else {
    document.documentElement.style.setProperty('--bg-color', '#f0f0f0');
    document.documentElement.style.setProperty('--text-color', '#222');
    document.documentElement.style.setProperty('--card-bg', 'rgba(255,255,255,0.15)');
    toggleWrapper.classList.remove('toggle-dark');
    toggleBtn.style.transform = 'translateX(0)';
  }
}
applyTheme();
toggleWrapper.addEventListener('click', () => { darkMode = !darkMode; applyTheme(); });

// ===== SHOOTING STARS =====
function createStar() {
  const star = document.createElement('div');
  star.classList.add('star');
  star.style.left = Math.random() * window.innerWidth + 'px';
  document.querySelector('.stars').appendChild(star);
  setTimeout(() => star.remove(), 7000);
}
setInterval(createStar, 1000);

// ===== SCROLL REVEAL =====
const sections = document.querySelectorAll('section');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('show');
  });
}, { threshold: 0.2 });
sections.forEach(sec => observer.observe(sec));

// ===== PARALLAX EFFECT =====
document.addEventListener('mousemove', e => {
  const moveX = (e.clientX / window.innerWidth - 0.5) * 10;
  const moveY = (e.clientY / window.innerHeight - 0.5) * 10;
  document.body.style.transform = `translate(${moveX}px, ${moveY}px)`;
});

function copy(text=""){
  navigator.clipboard.writeText(text);
}

