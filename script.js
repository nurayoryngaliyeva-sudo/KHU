
document.addEventListener('DOMContentLoaded', () => {
  const get = (id) => document.getElementById(id);

  // ==========================================
  // 1. МАССИВ ОБЪЕКТОВ: КАТАЛОГ FOX TATU
  // ==========================================

  const tattoos = [
    { id: 1, name: 'Лиса', category: 'animals', price: 25000, master: 'Алекс' },
    { id: 2, name: 'Роза', category: 'flowers', price: 18000, master: 'Мира' },
    { id: 3, name: 'Дракон', category: 'animals', price: 35000, master: 'Алекс' },
    { id: 4, name: 'Череп', category: 'dark', price: 22000, master: 'Мира' },
    { id: 5, name: 'Пион', category: 'flowers', price: 28000, master: 'Алекс' },
    { id: 6, name: 'Змея', category: 'dark', price: 32000, master: 'Мира' }
  ];

  // ==========================================
  // 2. forEach() — ПЕРЕБОР ЭЛЕМЕНТОВ
  // ==========================================

  const categoryCounts = {};

  tattoos.forEach((tattoo) => {
    categoryCounts[tattoo.category] =
      (categoryCounts[tattoo.category] || 0) + 1;
  });

  // ==========================================
  // 3. filter() — ФИЛЬТРАЦИЯ
  // ==========================================

  let filteredTattoos = tattoos.filter(
    tattoo => tattoo.category === 'animals'
  );

  // ==========================================
  // 4. find() — ПОИСК ПО ID
  // ==========================================

  const getTattoo = (id) =>
    tattoos.find(tattoo => tattoo.id === Number(id));

  // ==========================================
  // 5. map() — ПОЛУЧЕНИЕ СПИСКА НАЗВАНИЙ
  // ==========================================

  const tattooNames = tattoos.map(tattoo => tattoo.name);

  // ==========================================
  // 6. some() — ПРОВЕРКА УСЛОВИЯ
  // ==========================================

  const hasExpensiveTattoo = tattoos.some(
    tattoo => tattoo.price > 30000
  );

  // ==========================================
  // 7. reduce() — ОБЩАЯ СТОИМОСТЬ
  // ==========================================

  const totalPrice = tattoos.reduce(
    (sum, tattoo) => sum + tattoo.price, 0
  );

  // ==========================================
  // 8. sort() — СОРТИРОВКА
  // ==========================================

  const sortedTattoos = [...tattoos].sort(
    (a, b) => a.price - b.price
  );

  // ==========================================
  // 9. ОТОБРАЖЕНИЕ РЕЗУЛЬТАТОВ
  // ==========================================

  const catalog = get('tattooCatalog');
  const catalogResult = get('catalogResult');
  const categorySelect = get('tattooCategory');
  const sortSelect = get('tattooSort');
  const searchInput = get('tattooSearch');

  function renderTattoos(items) {
    if (!catalog) return;

    catalog.innerHTML = '';

    if (items.length === 0) {
      catalog.textContent = 'Эскизы не найдены.';
      return;
    }

    items.forEach((tattoo) => {
      const card = document.createElement('article');
      card.className = 'tattoo-card';

      const name = document.createElement('h3');
      name.textContent = tattoo.name;

      const price = document.createElement('p');
      price.textContent = tattoo.price.toLocaleString('ru-RU') + ' ₸';

      const master = document.createElement('p');
      master.textContent = 'Мастер: ' + tattoo.master;

      card.append(name, price, master);
      catalog.append(card);
    });

    if (catalogResult) {
      catalogResult.textContent = `Найдено эскизов: ${items.length}`;
    }
  }

  function updateCatalog() {
    const category = categorySelect?.value || 'all';
    const search = searchInput?.value.trim().toLowerCase() || '';

    // filter()
    let result = tattoos.filter((tattoo) => {
      const matchesCategory =
        category === 'all' || tattoo.category === category;

      const matchesSearch =
        tattoo.name.toLowerCase().includes(search);

      return matchesCategory && matchesSearch;
    });

    // sort()
    const sort = sortSelect?.value || 'default';

    if (sort === 'cheap') {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sort === 'expensive') {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    renderTattoos(result);
  }

  categorySelect?.addEventListener('change', updateCatalog);
  sortSelect?.addEventListener('change', updateCatalog);
  searchInput?.addEventListener('input', updateCatalog);

  renderTattoos(tattoos);

  // Демонстрация результатов методов в консоли
  console.log('forEach() — количество категорий:', categoryCounts);
  console.log('filter() — животные:', filteredTattoos);
  console.log('find() — эскиз №1:', getTattoo(1));
  console.log('map() — названия:', tattooNames);
  console.log('some() — есть цена выше 30000:', hasExpensiveTattoo);
  console.log('reduce() — общая стоимость:', totalPrice);
  console.log('sort() — сортировка по цене:', sortedTattoos);

  // ==========================================
  // 10. ПЕРЕКЛЮЧЕНИЕ ТЕМЫ
  // ==========================================

  const themeButtons = [
    get('themeToggle'),
    get('styleThemeToggle')
  ].filter(Boolean);

  let currentTheme = localStorage.getItem('foxTatuTheme');

  if (currentTheme !== 'light' && currentTheme !== 'dark') {
    currentTheme = 'dark';
  }

  function applyTheme(theme) {
    currentTheme = theme;
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('foxTatuTheme', theme);

    themeButtons.forEach((button) => {
      button.textContent =
        theme === 'dark' ? '☀️ Светлая тема' : '🌙 Тёмная тема';

      button.setAttribute(
        'aria-label',
        theme === 'dark'
          ? 'Переключить на светлую тему'
          : 'Переключить на тёмную тему'
      );

      button.setAttribute('aria-pressed', String(theme === 'light'));
    });
  }

  applyTheme(currentTheme);

  themeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
    });
  });

  // ==========================================
  // 11. МОБИЛЬНОЕ МЕНЮ
  // ==========================================

  const burgerBtn = get('burgerBtn');
  const navMenu = get('navMenu');

  function setMenuOpen(open) {
    if (!burgerBtn || !navMenu) return;

    navMenu.classList.toggle('is-open', open);
    burgerBtn.setAttribute('aria-expanded', String(open));
    burgerBtn.setAttribute(
      'aria-label',
      open ? 'Закрыть меню' : 'Открыть меню'
    );
  }

  if (burgerBtn && navMenu) {
    burgerBtn.addEventListener('click', () => {
      setMenuOpen(burgerBtn.getAttribute('aria-expanded') !== 'true');
    });

    navMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => setMenuOpen(false));
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    });

    document.addEventListener('click', (event) => {
      if (!navMenu.contains(event.target) &&
          !burgerBtn.contains(event.target)) {
        setMenuOpen(false);
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 760) setMenuOpen(false);
    });
  }

  // ==========================================
  // 12. ВКЛАДКИ СТАЙЛГАЙДА
  // ==========================================

  const demoTabs = document.querySelectorAll('.demo-tab');
  const demoTabContent = get('demoTabContent');

  const tabDescriptions = {
    colors: 'Цветовая палитра FoxTatu: чёрный, белый и рыжий.',
    buttons: 'Кнопки имеют обычное состояние, hover, focus и disabled.',
    forms: 'Формы используют подписи, поля ввода и заметные границы.'
  };

  demoTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      demoTabs.forEach((item) => {
        item.classList.remove('active');
        item.setAttribute('aria-selected', 'false');
      });

      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      if (demoTabContent) {
        demoTabContent.textContent =
          tabDescriptions[tab.dataset.tab] || '';
      }
    });
  });

  // ==========================================
  // 13. АВТОРИЗАЦИЯ
  // ==========================================

  const authModal = get('authModal');
  const openAuthBtn = get('openAuthBtn');
  const closeAuthBtn = get('closeAuthBtn');
  const userInfo = get('userInfo');
  const userNameDisplay = get('userNameDisplay');
  const logoutBtn = get('logoutBtn');
  const tabLogin = get('tabLogin');
  const tabRegister = get('tabRegister');
  const loginForm = get('loginForm');
  const registerForm = get('registerForm');

  let lastFocusedElement = null;

  function openModal() {
    if (!authModal) return;

    lastFocusedElement = document.activeElement;
    authModal.classList.remove('hidden');
    document.body.classList.add('modal-open');

    authModal.querySelector('input')?.focus();
  }

  function closeModal() {
    if (!authModal) return;

    authModal.classList.add('hidden');
    document.body.classList.remove('modal-open');

    if (lastFocusedElement &&
        typeof lastFocusedElement.focus === 'function') {
      lastFocusedElement.focus();
    }
  }

  function setAuthTab(tab) {
    const loginActive = tab === 'login';

    tabLogin?.classList.toggle('active', loginActive);
    tabRegister?.classList.toggle('active', !loginActive);

    tabLogin?.setAttribute('aria-selected', String(loginActive));
    tabRegister?.setAttribute('aria-selected', String(!loginActive));

    loginForm?.classList.toggle('hidden', !loginActive);
    registerForm?.classList.toggle('hidden', loginActive);
  }

  openAuthBtn?.addEventListener('click', openModal);
  closeAuthBtn?.addEventListener('click', closeModal);

  tabLogin?.addEventListener('click', () => setAuthTab('login'));
  tabRegister?.addEventListener('click', () => setAuthTab('register'));

  authModal?.addEventListener('click', (event) => {
    if (event.target === authModal) closeModal();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' &&
        authModal &&
        !authModal.classList.contains('hidden')) {
      closeModal();
    }
  });

  document.querySelectorAll('.toggle-pass').forEach((button) => {
    button.addEventListener('click', () => {
      const input = get(button.dataset.target);
      if (!input) return;

      const show = input.type === 'password';
      input.type = show ? 'text' : 'password';

      button.textContent = show ? 'Скрыть' : 'Показать';
      button.setAttribute(
        'aria-label',
        show ? 'Скрыть пароль' : 'Показать пароль'
      );
    });
  });

  function loginSuccess(userName) {
    const safeName =
      String(userName || 'Гость').trim().slice(0, 80) || 'Гость';

    localStorage.setItem('foxTatuUser', safeName);

    if (userNameDisplay) {
      userNameDisplay.textContent = `🦊 ${safeName}`;
    }

    openAuthBtn?.classList.add('hidden');
    userInfo?.classList.remove('hidden');

    closeModal();
    alert(`Добро пожаловать в FoxTatu, ${safeName}!`);
  }

  loginForm?.addEventListener('submit', (event) => {
    event.preventDefault();

    const email = get('loginEmail')?.value.trim() || '';
    const password = get('loginPassword')?.value || '';

    if (email.toLowerCase() === 'fox@tatu.ru' &&
        password === '123456') {
      loginSuccess('Мастер Лиса');
    } else {
      loginSuccess(email.split('@')[0] || 'Гость');
    }
  });

  registerForm?.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = get('regName')?.value.trim() || '';
    loginSuccess(name);
  });

  const savedUser = localStorage.getItem('foxTatuUser');

  if (savedUser) {
    if (userNameDisplay) {
      userNameDisplay.textContent = `🦊 ${savedUser}`;
    }

    openAuthBtn?.classList.add('hidden');
    userInfo?.classList.remove('hidden');
  }

  logoutBtn?.addEventListener('click', () => {
    localStorage.removeItem('foxTatuUser');

    openAuthBtn?.classList.remove('hidden');
    userInfo?.classList.add('hidden');
  });

  // ==========================================
  // 14. ФИЛЬТРАЦИЯ ПОРТФОЛИО
  // ==========================================

  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterBtns.forEach((button) => {
    button.addEventListener('click', () => {
      filterBtns.forEach((item) => {
        item.classList.remove('active');
        item.setAttribute('aria-pressed', 'false');
      });

      button.classList.add('active');
      button.setAttribute('aria-pressed', 'true');

      const filter = button.dataset.filter;

      portfolioItems.forEach((item) => {
        const visible =
          filter === 'all' || item.classList.contains(filter);

        item.hidden = !visible;
      });
    });
  });

  // ==========================================
  // 15. ФОРМА ЗАПИСИ
  // ==========================================

  const bookingForm = get('bookingForm');

  bookingForm?.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = get('bookName')?.value.trim() || 'клиент';

    alert(
      `Спасибо, ${name}! Ваша заявка принята. Студия FoxTatu свяжется с вами в ближайшее время.`
    );

    bookingForm.reset();
  });

  // ==========================================
  // 16. ТЕКУЩИЙ ГОД
  // ==========================================

  const currentYear = get('currentYear');

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }
});
