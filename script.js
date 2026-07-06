/* =========================
   SPIDER-DATE — SCRIPT.JS
   Effets propres + têtes qui tombent uniquement sur les côtés
========================= */

const card = document.querySelector(".card");
const countdownElement = document.getElementById("countdown");
const acceptBtn = document.getElementById("acceptBtn");

const eventDate = new Date(card.dataset.eventDate);
const whatsappMessage = card.dataset.whatsappMessage;

/* =========================
   COUNTDOWN
========================= */

function updateCountdown() {
  const now = new Date();
  const diff = eventDate - now;

  if (diff <= 0) {
    countdownElement.innerHTML = `
      <div class="countdown-finished">
        C’est l’heure de la mission.
      </div>
    `;
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  countdownElement.innerHTML = `
    <p class="countdown-label">Début de la mission dans</p>

    <div class="countdown-grid">
      <div>
        <strong>${days}</strong>
        <span>jours</span>
      </div>

      <div>
        <strong>${hours}</strong>
        <span>heures</span>
      </div>

      <div>
        <strong>${minutes}</strong>
        <span>min</span>
      </div>

      <div>
        <strong>${seconds}</strong>
        <span>sec</span>
      </div>
    </div>
  `;
}

updateCountdown();
setInterval(updateCountdown, 1000);

/* =========================
   SIDE SPIDER HEADS
   Elles tombent seulement à gauche et à droite
========================= */

function createSideSpiderHead(side) {
  const wrapper = document.createElement("div");
  wrapper.classList.add("side-spider");

  if (side === "left") {
    wrapper.style.left = `${Math.random() * 12 + 2}%`;
  } else {
    wrapper.style.left = `${Math.random() * 12 + 86}%`;
  }

  wrapper.style.animationDuration = `${6 + Math.random() * 3}s`;
  wrapper.style.setProperty("--swing", `${Math.random() * 12 - 6}deg`);
  wrapper.style.setProperty("--scale", `${0.75 + Math.random() * 0.25}`);

  wrapper.innerHTML = `
    <div class="side-thread"></div>

    <div class="side-head">
      <div class="side-eye side-eye-left"></div>
      <div class="side-eye side-eye-right"></div>
    </div>
  `;

  document.body.appendChild(wrapper);

  setTimeout(() => {
    wrapper.remove();
  }, 10000);
}

setInterval(() => createSideSpiderHead("left"), 2400);
setInterval(() => createSideSpiderHead("right"), 2800);

/* =========================
   SMALL WEB LINES ON SIDES
========================= */

function createSideWebLine(side) {
  const line = document.createElement("div");
  line.classList.add("side-web-line");

  if (side === "left") {
    line.style.left = `${Math.random() * 16}%`;
  } else {
    line.style.left = `${Math.random() * 16 + 84}%`;
  }

  line.style.height = `${120 + Math.random() * 220}px`;
  line.style.animationDuration = `${4 + Math.random() * 4}s`;

  document.body.appendChild(line);

  setTimeout(() => {
    line.remove();
  }, 9000);
}

setInterval(() => createSideWebLine("left"), 1100);
setInterval(() => createSideWebLine("right"), 1300);

/* =========================
   CARD 3D EFFECT
========================= */

if (card) {
  card.addEventListener("mousemove", (event) => {
    const rect = card.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -4;
    const rotateY = ((x - centerX) / centerX) * 4;

    card.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale(1.01)
    `;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = `
      perspective(1000px)
      rotateX(0deg)
      rotateY(0deg)
      scale(1)
    `;
  });
}

/* =========================
   CUSTOM CURSOR
========================= */

const cursor = document.createElement("div");
cursor.classList.add("custom-cursor");
document.body.appendChild(cursor);

let lastTrail = 0;

document.addEventListener("mousemove", (event) => {
  cursor.style.left = `${event.clientX}px`;
  cursor.style.top = `${event.clientY}px`;

  const now = Date.now();

  if (now - lastTrail > 40) {
    lastTrail = now;

    const dot = document.createElement("div");
    dot.classList.add("cursor-trail");

    dot.style.left = `${event.clientX}px`;
    dot.style.top = `${event.clientY}px`;

    document.body.appendChild(dot);

    setTimeout(() => {
      dot.remove();
    }, 650);
  }
});

/* =========================
   ACCEPT BUTTON
========================= */

acceptBtn.addEventListener("click", () => {
  launchConfetti();
  showMissionAccepted();
  playClickSound();

  const message = encodeURIComponent(whatsappMessage);

  setTimeout(() => {
    window.location.href = `https://wa.me/?text=${message}`;
  }, 2300);
});

/* =========================
   MISSION ACCEPTED POPUP
========================= */

function showMissionAccepted() {
  const overlay = document.createElement("div");
  overlay.classList.add("mission-overlay");

  overlay.innerHTML = `
    <div class="mission-popup">
      <div class="popup-head">
        <div class="popup-eye popup-eye-left"></div>
        <div class="popup-eye popup-eye-right"></div>
      </div>

      <h2>Mission acceptée</h2>

      <p>
        Le date est validé.  
        Le pop-corn est obligatoire.  
        La soirée peut commencer.
      </p>

      <span>Redirection vers WhatsApp...</span>
    </div>
  `;

  document.body.appendChild(overlay);

  setTimeout(() => {
    overlay.remove();
  }, 2300);
}

/* =========================
   CONFETTI
========================= */

function launchConfetti() {
  const colors = ["#ff0033", "#005eff", "#ffffff"];

  for (let i = 0; i < 90; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");

    confetti.style.left = `${Math.random() * 100}%`;
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.animationDuration = `${2 + Math.random() * 1.7}s`;
    confetti.style.animationDelay = `${Math.random() * 0.4}s`;

    document.body.appendChild(confetti);

    setTimeout(() => {
      confetti.remove();
    }, 4200);
  }
}

/* =========================
   CLICK SOUND WITHOUT FILE
========================= */

function playClickSound() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;

  if (!AudioContext) return;

  const context = new AudioContext();
  const oscillator = context.createOscillator();
  const gain = context.createGain();

  oscillator.type = "triangle";
  oscillator.frequency.setValueAtTime(620, context.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(140, context.currentTime + 0.12);

  gain.gain.setValueAtTime(0.1, context.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.12);

  oscillator.connect(gain);
  gain.connect(context.destination);

  oscillator.start();
  oscillator.stop(context.currentTime + 0.12);
}
