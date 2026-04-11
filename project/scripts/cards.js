'use strict';

/**
 * Create a single product card
 * @param {Object} product
 * @returns {string}
 */
export function createProductCard(product) {
  return `
    <article class="product-card layout-${product.layout}">
      
      <div class="product-image">
        <img
          src="${product.image}"
          alt="${product.alt}"
          loading="lazy"
          decoding="async">
      </div>

      <div class="product-info">
        <h3 class="product-name">${product.name}</h3>

        <p class="product-category">${product.category}</p>

        <p class="product-price">$${product.price.toFixed(2)}</p>

        <button
          type="button"
          class="product-cta"
          data-product-id="${product.id}">
          Learn more
        </button>
      </div>

    </article>
  `;
}