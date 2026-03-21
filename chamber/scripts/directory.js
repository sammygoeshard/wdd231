// wdd231/chamber/js/directory.js
/* Directory rendering and view toggle:
 * - Fetches ./data/members.json
 * - Renders member "cards" (grid) by default
 * - Allows switching to "list" view via buttons
 */
(async () => {
  'use strict';

  const membersEl = document.getElementById('members');
  const gridBtn = document.getElementById('gridBtn');
  const listBtn = document.getElementById('listBtn');

  // Helper: build one member article
  function buildMemberElement(m) {
    const article = document.createElement('article');
    article.className = 'member';

    const img = document.createElement('img');
    img.loading = 'lazy';
    img.decoding = 'async';
    img.src = `./images/members/${m.image}`;
    img.alt = `${m.name} logo`;
    img.width = 240;
    img.height = 240;

    const h3 = document.createElement('h3');
    h3.textContent = m.name;

    const meta = document.createElement('p');
    meta.className = 'meta';
    // Wrap phone in a tel: link; sanitize non-numeric except leading +
    const telHref = m.phone ? `tel:${m.phone.replace(/(?!^\+)[^\d]/g, '')}` : '#';
    meta.innerHTML = `
      <span class="address">${m.address || ''}</span><br>
      <a class="phone" href="${telHref}">${m.phone || ''}</a>
    `;

    const extra = document.createElement('p');
    extra.className = 'extra';
    const parts = [];
    if (m.industry) parts.push(m.industry);
    if (m.founded) parts.push(`Founded ${m.founded}`);
    if (m.membershipLevel) {
      const tier = { 1: 'Member', 2: 'Silver', 3: 'Gold' }[m.membershipLevel] || `Level ${m.membershipLevel}`;
      parts.push(tier);
    }
    extra.textContent = parts.join(' • ');

    const desc = document.createElement('p');
    desc.className = 'description';
    if (m.description) desc.textContent = m.description;

    const link = document.createElement('a');
    link.href = m.website;
    link.target = '_blank';
    link.rel = 'noopener';
    link.className = 'website';
    link.textContent = 'Visit Website';

    article.append(img, h3, meta, extra, desc, link);
    return article;
  }

  async function loadMembers() {
    try {
      const res = await fetch('./data/members.json', { cache: 'no-store' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      membersEl.innerHTML = ''; // clear loading message
      data.forEach((m) => membersEl.appendChild(buildMemberElement(m)));
    } catch (err) {
      console.error('Failed to load members:', err);
      membersEl.innerHTML = '<p class="error">Sorry, we could not load the member directory right now.</p>';
    }
  }

  function setView(view) {
    const isGrid = view === 'grid';
    membersEl.classList.toggle('cards', isGrid);
    membersEl.classList.toggle('list', !isGrid);
    gridBtn?.setAttribute('aria-pressed', String(isGrid));
    listBtn?.setAttribute('aria-pressed', String(!isGrid));
  }

  gridBtn?.addEventListener('click', () => setView('grid'));
  listBtn?.addEventListener('click', () => setView('list'));

  setView('grid');    // default view
  await loadMembers();
})();