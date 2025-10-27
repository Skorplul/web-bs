// dynamic year + expandable card logic (inner-wrapper animation)

document.getElementById('year').textContent = new Date().getFullYear();

(function(){
  const cards = document.querySelectorAll('.expand-card');
  cards.forEach(card => {
    const btn = card.querySelector('.card-toggle');
    const body = card.querySelector('.card-body');
    const inner = card.querySelector('.card-inner');

    // ensure collapsed at start
    inner.style.maxHeight = '0px';
    inner.style.overflow = 'hidden';

    const open = () => {
      btn.setAttribute('aria-expanded', 'true');
      card.classList.add('expanded');

      // measure then animate to measured px
      const height = inner.scrollHeight;
      inner.style.maxHeight = height + 'px';

      const tidy = () => {
        // allow auto height after animation so resizing won't clip content
        if (btn.getAttribute('aria-expanded') === 'true') {
          inner.style.maxHeight = 'none';
        }
        inner.removeEventListener('transitionend', tidy);
      };
      inner.addEventListener('transitionend', tidy);
    };

    const close = () => {
      // if currently auto, set to measured px to animate from
      if (inner.style.maxHeight === 'none') {
        inner.style.maxHeight = inner.scrollHeight + 'px';
        // force reflow
        inner.getBoundingClientRect();
      }
      btn.setAttribute('aria-expanded', 'false');
      card.classList.remove('expanded');

      // force reflow so the browser sees changes then animate to 0
      inner.getBoundingClientRect();
      inner.style.maxHeight = '0px';
    };

    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      if (!expanded) open(); else close();
    });
  });
})();