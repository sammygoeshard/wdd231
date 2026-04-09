import { discoverItems } from "../data/discover.mjs";

/* =========================
   CARD GENERATION
========================= */
const grid = document.getElementById("discoverGrid");

discoverItems.forEach(item => {
  const card = document.createElement("article");
  card.classList.add("discover-card");

  card.innerHTML = `
    <h2>${item.name}</h2>
    <figure>
      <img src="${item.image}" alt="${item.name}" loading="lazy" />
    </figure>
    <address>${item.address}</address>
    <p>${item.description}</p>
    <button type="button">Learn More</button>
  `;

  grid.appendChild(card);
});

/* =========================
   VISIT TRACKING (localStorage)
========================= */
const messageBox = document.getElementById("visitMessage");
const lastVisit = localStorage.getItem("lastVisit");
const now = Date.now();

if (!lastVisit) {
  messageBox.textContent = "Welcome! Let us know if you have any questions.";
} else {
  const daysPassed = Math.floor((now - lastVisit) / 86400000);

  if (daysPassed < 1) {
    messageBox.textContent = "Back so soon! Awesome!";
  } else {
    messageBox.textContent = `You last visited ${daysPassed} ${daysPassed === 1 ? "day" : "days"} ago.`;
  }
}

localStorage.setItem("lastVisit", now);