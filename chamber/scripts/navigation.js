/**
 * Responsive, accessible navigation
 * Toggles mobile menu visibility by switching aria-expanded on the button.
 * CSS controls display.
 */
(function () {
  'use strict';

  const menuButton = document.getElementById('menuButton');
  const siteNav = document.getElementById('siteNav');
  const primaryNav = document.getElementById('primaryNav');


  if (!menuButton || !siteNav || !primaryNav) return;

  const navLinks = Array.from(primaryNav.querySelectorAll('a[href]'));

  /* Helper: toggle menu state */
  const setMenuState = (open) => {
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute(
      'aria-label',
      open ? 'Close main menu' : 'Open main menu'
    );
  };

  const init = () => {
    setMenuState(false);          // always start closed
    handleResize();               // let CSS + resize logic manage visibility
    highlightActiveLink();
  };

  /* Toggle on button click */
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') === 'true';
    setMenuState(!open);
  });

  /* Close when a nav link is clicked (mobile only) */
  primaryNav.addEventListener('click', (evt) => {
    const link = evt.target.closest('a');
    if (!link) return;

    const isSmall = window.matchMedia('(max-width: 47.999rem)').matches;
    if (isSmall) setMenuState(false);
  });

  /* Close on Escape */
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      if (menuButton.getAttribute('aria-expanded') === 'true') {
        setMenuState(false);
        menuButton.focus();
      }
    }
  });

  /* Click outside to close (mobile only) */
  document.addEventListener('click', (evt) => {
    const open = menuButton.getAttribute('aria-expanded') === 'true';
    if (!open) return;

    const isSmall = window.matchMedia('(max-width: 47.999rem)').matches;
    if (
      isSmall &&
      !menuButton.contains(evt.target) &&
      !siteNav.contains(evt.target)
    ) {
      setMenuState(false);
    }
  });

  /* Maintain focusability across resizes */
  const handleResize = () => {
    const isSmall = window.matchMedia('(max-width: 47.999rem)').matches;

    if (isSmall) {
      const open = menuButton.getAttribute('aria-expanded') === 'true';
      navLinks.forEach(a => (a.tabIndex = open ? 0 : -1));
    } else {
      navLinks.forEach(a => (a.tabIndex = 0));
      setMenuState(false); // desktop nav always visible via CSS
    }
  };

  window.addEventListener('resize', handleResize);

function highlightActiveLink() {
  const currentPath = window.location.pathname;

  navLinks.forEach(link => {
    const linkUrl = new URL(link.href, window.location.origin);

    // Get filenames only
    const currentPage = currentPath.endsWith("/")
      ? "index.html"
      : currentPath.split("/").pop();

    const linkPage = linkUrl.pathname.split("/").pop();

    if (currentPage === linkPage) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    } else {
      link.classList.remove("active");
      link.removeAttribute("aria-current");
    }
  });
}

  /* Run */
  init();
})();