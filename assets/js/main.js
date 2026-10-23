(() => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
      toggle.textContent = open ? '×' : '☰';
    });
  }

  const search = document.querySelector('#software-search');
  const grid = document.querySelector('#software-grid');
  if (!search || !grid) return;
  const cards = [...grid.querySelectorAll('.software-card')];
  const filters = [...document.querySelectorAll('#category-filters [data-category]')];
  const count = document.querySelector('#results-count');
  const empty = document.querySelector('#empty-state');
  let category = 'all';

  function applyFilters() {
    const query = search.value.trim().toLocaleLowerCase('ru');
    let visible = 0;
    cards.forEach(card => {
      const matchesCategory = category === 'all' || card.dataset.category === category;
      const matchesQuery = !query || (card.dataset.search + ' ' + card.innerText).toLocaleLowerCase('ru').includes(query);
      const show = matchesCategory && matchesQuery;
      card.hidden = !show;
      if (show) visible++;
    });
    if (count) count.textContent = `Найдено программ: ${visible}`;
    if (empty) empty.hidden = visible !== 0;
  }

  filters.forEach(button => button.addEventListener('click', () => {
    category = button.dataset.category;
    filters.forEach(item => item.classList.toggle('active', item === button));
    applyFilters();
  }));
  search.addEventListener('input', applyFilters);
  applyFilters();
})();