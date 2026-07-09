document.addEventListener("DOMContentLoaded", () => {
  const card = document.querySelector(".invitation-card");
  const countdownElement = document.getElementById("countdown");
  const acceptBtn = document.getElementById("acceptBtn");
  const noBtn = document.getElementById("noBtn");

  const eventDate = new Date(card.dataset.eventDate);

  /* COUNTDOWN */

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
        <div><strong>${days}</strong><span>jours</span></div>
        <div><strong>${hours}</strong><span>heures</span></div>
        <div><strong>${minutes}</strong><span>min</span></div>
        <div><strong>${seconds}</strong><span>sec</span></div>
      </div>
    `;
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  /* SIDE SPIDERS */

  function createSideSpider(side) {
    const wrapper = document.createElement("div");
    wrapper.classList.add("side-spider");

    wrapper.style.left =
      side === "left"
        ? `${Math.random() * 11 + 2}%`
        : `${Math.random() * 11 + 87}%`;

    wrapper.style.animationDuration = `${6 + Math.random() * 3}s`;
    wrapper.style.setProperty("--scale", `${0.72 + Math.random() * 0.25}`);
    wrapper.style.setProperty("--tilt", `${Math.random() * 12 - 6}deg`);

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

  setInterval(() => createSideSpider("left"), 2600);
  setInterval(() => createSideSpider("right"), 3100);

  /* SIDE WEB LINES */

  function createSideWebLine(side) {
    const line = document.createElement("div");
    line.classList.add("side-web-line");

    line.style.left =
      side === "left"
        ? `${Math.random() * 16}%`
        : `${Math.random() * 16 + 84}%`;

    line.style.height = `${120 + Math.random() * 220}px`;
    line.style.animationDuration = `${4 + Math.random() * 4}s`;

    document.body.appendChild(line);

    setTimeout(() => {
      line.remove();
    }, 9000);
  }

  setInterval(() => createSideWebLine("left"), 1200);
  setInterval(() => createSideWebLine("right"), 1500);

  /* CARD EFFECT */

  card.addEventListener("mousemove", (event) => {
    const rect = card.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -3.5;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 3.5;

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

  /* ACCEPT BUTTON */

  acceptBtn.addEventListener("click", () => {
    launchConfetti();
    showMissionAccepted();
  });

  /* NO BUTTON ESCAPE */

  const noTexts = [
    "Non",
    "Même pas en rêve",
    "Trop tard",
    "Essaie encore",
    "Impossible",
    "Spider-sens activé",
    "Nope"
  ];

  function moveNoButton() {
    const padding = 24;
    const buttonWidth = noBtn.offsetWidth;
    const buttonHeight = noBtn.offsetHeight;

    const maxX = window.innerWidth - buttonWidth - padding;
    const maxY = window.innerHeight - buttonHeight - padding;

    const randomX = Math.floor(Math.random() * (maxX - padding)) + padding;
    const randomY = Math.floor(Math.random() * (maxY - padding)) + padding;

    noBtn.style.position = "fixed";
    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;
    noBtn.style.zIndex = "9999";

    noBtn.textContent = noTexts[Math.floor(Math.random() * noTexts.length)];

    noBtn.animate(
      [
        { transform: "scale(1) rotate(0deg)" },
        { transform: "scale(1.08) rotate(-4deg)" },
        { transform: "scale(1) rotate(2deg)" }
      ],
      {
        duration: 280,
        easing: "ease-out"
      }
    );
  }

  noBtn.addEventListener("mouseenter", moveNoButton);
  noBtn.addEventListener("click", (event) => {
    event.preventDefault();
    moveNoButton();
  });
  noBtn.addEventListener("touchstart", (event) => {
    event.preventDefault();
    moveNoButton();
  });

  /* POPUP */

  function showMissionAccepted() {
    const overlay = document.createElement("div");
    overlay.classList.add("mission-overlay");

    overlay.innerHTML = `
      <div class="mission-popup">

        <div class="spider-mask popup-mask" aria-hidden="true">
          <div class="mask-eye mask-eye-left"></div>
          <div class="mask-eye mask-eye-right"></div>
        </div>

        <h2>Mission acceptée</h2>

        <p>
          Ta Mary Jane t’attend.<br>
          Le pop-corn est validé.<br>
          Le 1er août, tu n’auras pas besoin de sauver le monde.
        </p>

        <button class="close-popup" type="button">
          Fermer
        </button>

      </div>
    `;

    document.body.appendChild(overlay);

    overlay.querySelector(".close-popup").addEventListener("click", () => {
      overlay.remove();
    });
  }

  /* CONFETTI */

  function launchConfetti() {
    const colors = ["#ff0033", "#005eff", "#ffffff"];

    for (let i = 0; i < 95; i++) {
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
});
document.addEventListener("DOMContentLoaded", () => {
  const noBtn = document.getElementById("noBtn");

  if (!noBtn) return;

  const noTexts = [
    "Non",
    "Même pas en rêve",
    "Trop tard",
    "Essaie encore",
    "Impossible",
    "Lâche l'affaire fer",
    "Nope",
    "Tu rêves",
    "Jamais",
    "Raté encore"
  ];

  function moveNoButton() {
    const padding = 24;

    const buttonWidth = noBtn.offsetWidth;
    const buttonHeight = noBtn.offsetHeight;

    const maxX = window.innerWidth - buttonWidth - padding;
    const maxY = window.innerHeight - buttonHeight - padding;

    const randomX = Math.floor(Math.random() * (maxX - padding)) + padding;
    const randomY = Math.floor(Math.random() * (maxY - padding)) + padding;

    noBtn.style.position = "fixed";
    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;
    noBtn.style.zIndex = "999999";

    noBtn.textContent = noTexts[Math.floor(Math.random() * noTexts.length)];

    noBtn.animate(
      [
        { transform: "scale(1) rotate(0deg)" },
        { transform: "scale(1.1) rotate(-5deg)" },
        { transform: "scale(1) rotate(3deg)" }
      ],
      {
        duration: 260,
        easing: "ease-out"
      }
    );
  }

  noBtn.addEventListener("mouseenter", moveNoButton);

  noBtn.addEventListener("click", (event) => {
    event.preventDefault();
    moveNoButton();
  });

  noBtn.addEventListener("touchstart", (event) => {
    event.preventDefault();
    moveNoButton();
  });
});
