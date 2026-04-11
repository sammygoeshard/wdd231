'use strict';

import { createProductCard } from './cards.js';
import { initModal } from './modal.js';

const grid = document.getElementById('productsGrid');
const dataUrl = './data/cakes.json';

async function loadProducts() {
  try {
    const response = await fetch(dataUrl);
    const data = await response.json();

    const products = data.products ?? data;

    renderProducts(products);
    initModal(products); // activate modal

  } catch (error) {
    console.error('Error loading products:', error);
  }
}

function renderProducts(products) {
  grid.innerHTML = '';

  products.forEach(product => {
    grid.insertAdjacentHTML('beforeend', createProductCard(product));
  });
}

loadProducts();