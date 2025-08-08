// Lightweight global ripple + press feedback for buttons/links
// Applies to: button, .view-all-btn, .read-more, .read-full-post, .contact-link-btn, .modal-close, .icon-button, #skip-intro
// Respects prefers-reduced-motion

(function () {
  const SEL = [
    'button',
    '.view-all-btn',
    '.read-more',
    '.read-full-post',
    '.contact-link-btn',
    '.modal-close',
    '.icon-button',
    '#skip-intro'
  ].join(',');

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function addRipple(e, target) {
    if (prefersReduced) return;
    // Prevent oversized ripple on right-click or modifier keys
    if (e.button === 2 || e.ctrlKey || e.metaKey) return;

    const rect = target.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.className = 'ripple';

    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + 'px';

    // Compute position relative to the element
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left - size / 2;
    const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top - size / 2;
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';

    // Ensure only a few ripples exist to avoid DOM buildup
    while (target.querySelectorAll('.ripple').length > 4) {
      target.removeChild(target.querySelector('.ripple'));
    }

    target.appendChild(ripple);

    ripple.addEventListener('animationend', () => {
      ripple.remove();
    });
  }

  function handlePointerDown(e) {
    const target = e.target.closest(SEL);
    if (!target) return;
    addRipple(e, target);
  }

  function handleKey(e) {
    const target = e.target.closest(SEL);
    if (!target) return;
    // Space or Enter triggers visual feedback
    if (e.key === 'Enter' || e.key === ' ') {
      const fakeEvent = { clientX: target.offsetLeft + target.offsetWidth / 2, clientY: target.offsetTop + target.offsetHeight / 2 };
      addRipple(fakeEvent, target);
    }
  }

  // Attach once for the document (event delegation)
  document.addEventListener('pointerdown', handlePointerDown, { passive: true });
  document.addEventListener('keydown', handleKey);
})();
