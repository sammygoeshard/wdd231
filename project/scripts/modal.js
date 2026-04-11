'use strict';

/**
 * Initialize product modal behavior
 * @param {Array} products
 */
export function initModal(products) {

  const modal = document.getElementById('productModal');
  const closeBtn = modal.querySelector('.modal-close');

  const modalImage = document.getElementById('modalImage');
  const modalTitle = document.getElementById('modalTitle');
  const modalDescription = document.getElementById('modalDescription');
  const modalCategory = document.getElementById('modalCategory');
  const modalPrice = document.getElementById('modalPrice');

  /** Open modal when clicking Learn more */
  document.addEventListener('click', event => {
    const button = event.target.closest('.product-cta');
    if (!button) return;

    const productId = button.dataset.productId;
    const product = products.find(item => item.id === productId);
    if (!product) return;

    fillModal(product);
    modal.showModal();
  });

  /** Close modal */
  closeBtn.addEventListener('click', () => {
    modal.close();
  });

  /** Close on backdrop click */
  modal.addEventListener('click', event => {
    if (event.target === modal) {
      modal.close();
    }
  });

  /** Populate modal content */
  function fillModal(product) {
    modalImage.src = product.image;
    modalImage.alt = product.alt;
    modalTitle.textContent = product.name;
    modalDescription.textContent = product.description;
    modalCategory.textContent = product.category;
    modalPrice.textContent = `$${product.price.toFixed(2)}`;
  }
}