/**
 * Date utilities:
 * - Inserts current year into #currentyear
 * - Inserts document.lastModified (localized) into #lastModified
 */

(function () {
  'use strict';

  const yearEl = document.getElementById('currentyear');
  const modEl = document.getElementById('lastModified');

  // Current year
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  // Last modified: format nicely in the user's locale
  if (modEl) {
    // document.lastModified returns a string; convert to Date for trusted formatting.
    const last = new Date(document.lastModified);
    // Fallback if parsing fails
    const isValid = !isNaN(last.getTime());
    const formatted = isValid
      ? last.toLocaleString(undefined, {
          year: 'numeric',
          month: 'long',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      : document.lastModified;

    modEl.textContent = `Last Modification: ${formatted}`;
  }
})();