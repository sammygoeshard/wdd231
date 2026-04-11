'use strict';

const params = new URLSearchParams(window.location.search);

function setText(id, paramName) {
  const element = document.getElementById(id);
  if (!element) return;

  const value = params.get(paramName);
  element.textContent = value ? value : 'Not provided';
}

setText('firstName', 'firstName');
setText('lastName', 'lastName');
setText('phone', 'phone');
setText('address', 'address');
setText('cakeType', 'cakeType');
setText('decoration', 'decoration');
setText('details', 'details');