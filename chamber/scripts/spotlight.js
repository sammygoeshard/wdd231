const membersURL = './data/members.json';
const spotlightContainer = document.querySelector('#spotlights');

async function loadSpotlights() {
  try {
    const response = await fetch(membersURL);
    if (!response.ok) throw new Error('Failed to load members');
    const members = await response.json();

    const eligibleMembers = members.filter(member =>
      member.membership === 'Gold' || member.membership === 'Silver'
    );

    const selected = getRandomMembers(eligibleMembers, 2, 3);
    displaySpotlights(selected);

  } catch (error) {
    console.error('Spotlight error:', error);
  }
}

function getRandomMembers(list, min, max) {
  const shuffled = [...list].sort(() => Math.random() - 0.5);
  const count = Math.floor(Math.random() * (max - min + 1)) + min;
  return shuffled.slice(0, count);
}

function displaySpotlights(members) {
  spotlightContainer.innerHTML = '';

  members.forEach(member => {
    const card = document.createElement('article');
    card.classList.add('member');

    const imagePath = `./images/members/${member.image}`;

    card.innerHTML = `
      <img src="${imagePath}" 
       alt="${member.name} logo" 
       loading="lazy">

      <h3>${member.name}</h3>
      <p class="meta">${member.membership} Member</p>
      <p class="extra">${member.address}</p>
      <p class="extra">📞 ${member.phone}</p>
      <a class="website" href="${member.website}" target="_blank" rel="noopener">
        Visit Website
      </a>
    `;

    spotlightContainer.appendChild(card);
  });
}

loadSpotlights();