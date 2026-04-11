'use strict';

/* ===============================
   Welcome message using Local Storage
   =============================== */

const welcomeBox = document.getElementById('welcomeMessage');
const LAST_VISIT_KEY = 'rb-last-visit';

function showWelcomeMessage() {
  if (!welcomeBox) return;

  const now = Date.now();
  const lastVisit = localStorage.getItem(LAST_VISIT_KEY);

  let message = '';

  if (!lastVisit) {
    message = 'Welcome! We’re glad you’re exploring our custom cake options.';
  } else {
    const daysPassed = Math.floor(
      (now - Number(lastVisit)) / (1000 * 60 * 60 * 24)
    );

    if (daysPassed <= 7) {
      message = 'Welcome back! It’s nice to see you again.';
    } else {
      message =
        'Welcome back! It’s been a while — we’re happy to have you here again.';
    }
  }

  welcomeBox.textContent = message;
  localStorage.setItem(LAST_VISIT_KEY, now);
}

showWelcomeMessage();