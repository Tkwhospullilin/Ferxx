const btn = document.getElementById("btnLove");
const message = document.getElementById("message");

const messages = [
  "On le savait déjà 😌",
  "Fernanda = reine officielle du Costa Rica 🇨🇷👑",
  "Incroyable est un euphémisme.",
  "Attention, niveau de beauté critique détecté.",
  "Pura vida mais version ICONIQUE 💃✨"
];

btn.addEventListener("click", () => {
  const random = messages[Math.floor(Math.random() * messages.length)];
  message.textContent = random;
});

