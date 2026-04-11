'use strict';

import { createProductCard } from './cards.js';

const featuredGrid = document.getElementById('featuredGrid');
const dataUrl = './data/cakes.json';

async function loadFeaturedProducts() {
  try {
    const response = await fetch(dataUrl);
    const data = await response.json();
    const products = data.products ?? data;

    const featured = getRandomItems(products, 4);
    renderFeatured(featured);

  } catch (error) {
    console.error('Error loading featured products:', error);
  }
}

/**
 * Get random unique items from array
 */
function getRandomItems(items, count) {
  return [...items]
    .sort(() => 0.5 - Math.random())
    .slice(0, count);
}

function renderFeatured(products) {
  featuredGrid.innerHTML = '';

  products.forEach(product => {
    featuredGrid.insertAdjacentHTML(
      'beforeend',
      createFeaturedCard(product)
    );
  });
}

/**
 * Featured card template (vertical 9:16)
 */
function createFeaturedCard(product) {
  return `
    <article class="featured-card">
      <div class="featured-image">
        <img
          src="${product.image}"
          alt="${product.alt}"
          loading="lazy"
          decoding="async">
      </div>

      <div class="featured-info">
        <h3>${product.name}</h3>
        <p class="featured-category">${product.category}</p>
        <p class="featured-price">$${product.price.toFixed(2)}</p>
      </div>
    </article>
  `;
}

loadFeaturedProducts();