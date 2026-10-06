// Navigation for the standalone preview. Satellite owns the live site's header.
(() => {
  const nav = document.querySelector('.esn-site-nav');
  if (!nav) return;

  const collapse = nav.querySelector('.navbar-collapse');
  const menuButton = nav.querySelector('.navbar-toggler');
  const dropdowns = [...nav.querySelectorAll('.nav-item.dropdown')];
  const canHover = matchMedia('(min-width: 1400px) and (hover: hover)');

  const setOpen = (item, open) => {
    item.querySelector('.dropdown-toggle').setAttribute('aria-expanded', String(open));
    item.querySelector('.dropdown-menu').classList.toggle('show', open);
    item.classList.toggle('esn-nav-open', open);
  };

  const closeOthers = (except) => dropdowns.forEach((item) => {
    if (item !== except) setOpen(item, false);
  });

  dropdowns.forEach((item) => {
    const button = item.querySelector('.dropdown-toggle');
    button.addEventListener('click', () => {
      const nextOpen = button.getAttribute('aria-expanded') !== 'true';
      closeOthers(item);
      setOpen(item, nextOpen);
    });
    item.addEventListener('pointerenter', (event) => {
      if (!canHover.matches || event.pointerType === 'touch') return;
      closeOthers(item);
      setOpen(item, true);
    });
    item.addEventListener('pointerleave', (event) => {
      if (canHover.matches && event.pointerType !== 'touch' && !item.contains(document.activeElement)) {
        setOpen(item, false);
      }
    });
    item.addEventListener('focusout', (event) => {
      if (!item.contains(event.relatedTarget)) setOpen(item, false);
    });
  });

  menuButton.addEventListener('click', () => {
    const open = !collapse.classList.contains('show');
    collapse.classList.toggle('show', open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Toggle navigation');
    if (!open) closeOthers();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    const openItem = dropdowns.find((item) => item.classList.contains('esn-nav-open'));
    if (openItem) {
      openItem.querySelector('.dropdown-toggle').focus();
      setOpen(openItem, false);
      event.preventDefault();
    } else if (collapse.classList.contains('show')) {
      menuButton.click();
      menuButton.focus();
    }
  });

  document.addEventListener('pointerdown', (event) => {
    if (!nav.contains(event.target)) closeOthers();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1400 && collapse.classList.contains('show')) {
      collapse.classList.remove('show');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Toggle navigation');
      closeOthers();
    }
  });
})();
