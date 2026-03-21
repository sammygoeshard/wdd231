/**
 * Responsive, accessible navigation
 * - Toggles mobile menu visibility by switching aria-expanded on the button.
 * - Keeps styles CSS-driven: small.css uses
 *   #menuButton[aria-expanded="true"] ~ nav.site-nav { display: block; }
 * - Closes on link click, Escape key, or outside click.
 * - Highlights the active link by URL.
 */

(function () {
  'use strict';

  const menuButton = document.getElementById('menuButton');
  const siteNav = document.getElementById('siteNav');
  const primaryNav = document.getElementById('primaryNav');

  if (!menuButton || !siteNav || !primaryNav) return;

  const navLinks = Array.from(primaryNav.querySelectorAll('a[href]'));

  // Helper: toggle menu state
  const setMenuState = (open) => {
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close main menu' : 'Open main menu');

    // Manage focusability of links for small screens when closed
    const isSmall = window.matchMedia('(max-width: 47.999rem)').matches;
    navLinks.forEach((a) => {
      if (isSmall) {
        a.tabIndex = open ? 0 : -1;
      } else {
        a.tabIndex = 0; // ensure focusable on large screens
      }
    });

    // Focus the first link when opened via keyboard
    if (open) {
      // Wait a tick for rendering
      window.requestAnimationFrame(() => {
        const firstLink = navLinks[0];
        if (firstLink) firstLink.focus();
      });
    }
  };

  // Initialize state: closed on small, open (focusable) on large (CSS shows it)
  const init = () => {
    const isSmall = window.matchMedia('(max-width: 47.999rem)').matches;
    setMenuState(!isSmall ? false : false); // default closed; CSS in larger.css shows nav without button
    // On large screens, we keep aria-expanded false but links are focusable via resize handler below
    handleResize();
    highlightActiveLink();
  };

  // Toggle on button click
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') === 'true';
    setMenuState(!open);
  });

  // Close when a nav link is clicked (on mobile)
  primaryNav.addEventListener('click', (evt) => {
    const target = evt.target;
    if (target && target.closest('a')) {
      const isSmall = window.matchMedia('(max-width: 47.999rem)').matches;
      if (isSmall) setMenuState(false);
    }
  });

  // Close on Escape key when open
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      const open = menuButton.getAttribute('aria-expanded') === 'true';
      if (open) {
        setMenuState(false);
        menuButton.focus();
      }
    }
  });

  // Close if clicking outside the nav/menu button (mobile only)
  document.addEventListener('click', (evt) => {
    const open = menuButton.getAttribute('aria-expanded') === 'true';
    if (!open) return;
    const insideToggle = menuButton.contains(evt.target);
    const insideNav = siteNav.contains(evt.target);
    const isSmall = window.matchMedia('(max-width: 47.999rem)').matches;
    if (isSmall && !insideToggle && !insideNav) {
      setMenuState(false);
    }
  });

  // Keep focusability correct across resizes
  const handleResize = () => {
    const isSmall = window.matchMedia('(max-width: 47.999rem)').matches;
    if (isSmall) {
      const open = menuButton.getAttribute('aria-expanded') === 'true';
      navLinks.forEach((a) => (a.tabIndex = open ? 0 : -1));
    } else {
      // Large view: links always focusable
      navLinks.forEach((a) => (a.tabIndex = 0));
      // Ensure menu button is visually hidden by CSS but still operable if user tabs—so keep it focusable but not needed
      menuButton.setAttribute('aria-expanded', 'false');
    }
  };

  window.addEventListener('resize', handleResize);

  // Active link highlighting based on current URL
  function highlightActiveLink() {
    const here = new URL(window.location.href);
    navLinks.forEach((a) => {
      try {
        const url = new URL(a.href, here.origin);
        const isActive =
          url.pathname.replace(/\/+$/, '') === here.pathname.replace(/\/+$/, '');
        if (isActive) {
          a.setAttribute('aria-current', 'page');
          a.classList.add('active');
        } else {
          a.removeAttribute('aria-current');
          a.classList.remove('active');
        }
      } catch {
        // ignore malformed hrefs
      }
    });
  }

  // Run
  init();
})();