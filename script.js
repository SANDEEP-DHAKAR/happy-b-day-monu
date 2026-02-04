/* =======================
   🎵 LIVE BACKGROUND MUSIC
======================= */
const birthdaySong = new Audio(
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
);
birthdaySong.loop = true;
birthdaySong.volume = 0.6;
birthdaySong.preload = 'auto';

/* =======================
   ELEMENTS & STATE
======================= */
let started = false;
let intervals = [];

const startBtn = document.getElementById('startBtn');
const entryScreen = document.getElementById('entryScreen');
const content = document.getElementById('content');
const musicBtn = document.getElementById('musicBtn');
const replayBtn = document.getElementById('replayBtn');

const songBtn = document.getElementById('songBtn');
const fadeBtn = document.getElementById('fadeBtn');
const beatBtn = document.getElementById('beatBtn');

/* =======================
   HELPERS
======================= */
function addInterval(fn, time) {
  const id = setInterval(fn, time);
  intervals.push(id);
}

function clearAllIntervals() {
  intervals.forEach(clearInterval);
  intervals = [];
}

/* =======================
   START SHOW
======================= */
function startShow() {
  if (started) return;
  started = true;

  entryScreen.classList.add('hide');
  content.hidden = false;
  content.offsetHeight;
  content.classList.add('show');

  /* 🎶 Play music */
  birthdaySong
    .play()
    .then(() => {
      musicBtn.classList.remove('hide');
      musicBtn.textContent = '🔇';
    })
    .catch(() => {
      musicBtn.classList.remove('hide');
      musicBtn.textContent = '🎵';
    });

  /* 🎉 CONFETTI */
  addInterval(() => {
    confetti({
      particleCount: 140,
      spread: 180,
      startVelocity: 45,
      origin: { x: Math.random(), y: Math.random() - 0.1 },
      colors: ['#ec4899', '#a855f7', '#f472b6', '#fbbf24', '#ffffff'],
    });
  }, 3000);

  /* ✨ SPARKLES */
  addInterval(() => {
    const s = document.createElement('div');
    s.className = 'sparkle';
    s.style.left = Math.random() * innerWidth + 'px';
    s.style.top = innerHeight + 'px';
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 2000);
  }, 180);

  /* ❤️ HEARTS */
  addInterval(() => {
    const h = document.createElement('span');
    h.className = 'heart';
    h.textContent = '❤️';
    h.style.left = Math.random() * innerWidth + 'px';
    h.style.animationDuration = 3 + Math.random() * 4 + 's';
    document.body.appendChild(h);
    setTimeout(() => h.remove(), 7000);
  }, 700);

  /* 🎈 BALLOONS */
  addInterval(() => {
    const b = document.createElement('div');
    b.className = 'balloon';
    b.textContent = '🎈';
    b.style.left = Math.random() * innerWidth + 'px';
    b.style.animationDuration = 5 + Math.random() * 5 + 's';
    document.body.appendChild(b);
    setTimeout(() => b.remove(), 10000);
  }, 1400);
}

/* =======================
   START EVENTS
======================= */
startBtn.addEventListener('click', startShow);
document.addEventListener(
  'click',
  () => { if (!started) startShow(); },
  { once: true }
);

/* =======================
   MUSIC TOGGLE
======================= */
musicBtn.addEventListener('click', () => {
  if (birthdaySong.paused) {
    birthdaySong.play();
    musicBtn.textContent = '🔇';
  } else {
    birthdaySong.pause();
    musicBtn.textContent = '🎵';
  }
});

/* =======================
   REPLAY CONFETTI
======================= */
replayBtn.addEventListener('click', () => {
  confetti({
    particleCount: 180,
    spread: 180,
    startVelocity: 45,
    origin: { x: 0.5, y: 0.6 },
    colors: ['#ec4899', '#a855f7', '#f472b6', '#fbbf24', '#ffffff'],
  });
});

/* =======================
   EXTRA BUTTONS LOGIC
======================= */
songBtn.addEventListener('click', () => {
  birthdaySong.src = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3';
  birthdaySong.currentTime = 0;
  birthdaySong.play();
  musicBtn.classList.remove('hide');
  musicBtn.textContent = '🔇';
});

fadeBtn.addEventListener('click', () => {
  birthdaySong.volume = 0;
  birthdaySong.play();
  let vol = 0;
  const fade = setInterval(() => {
    vol += 0.05;
    if (vol >= 0.6) { vol = 0.6; clearInterval(fade); }
    birthdaySong.volume = vol;
  }, 200);
});

beatBtn.addEventListener('click', () => {
  const beatInterval = setInterval(() => {
    confetti({
      particleCount: 80,
      spread: 120,
      startVelocity: 35,
      origin: { x: Math.random(), y: 0.6 },
      colors: ['#ec4899', '#a855f7', '#f472b6', '#ffffff'],
    });
  }, 600);
  setTimeout(() => clearInterval(beatInterval), 8000);
});

/* =======================
   TAB VISIBILITY FIX
======================= */
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    birthdaySong.pause();
  } else if (started) {
    birthdaySong.play().catch(() => {});
  }
});
