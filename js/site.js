/*
 * ehroz.flower — скрипты новой вёрстки.
 * Каждый блок изолирован: ошибка в одном не ломает остальные,
 * а в разметке уже стоят корректные значения на случай, если JS не выполнится.
 */
(() => {
  'use strict';

  const C = Object.assign({
    name: 'Эхроз',
    telegram: 'hhrrzz1',
    whatsapp: '77775971798',
    phone: '77775971798',
    instagram: 'ehroz1',
    codeword: 'Цветы',
    spotsTotal: 5,
    spotsLeft: 5,
    discount: 15,
  }, window.SITE_CONFIG || {});

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const safe = (name, fn) => {
    try { fn(); } catch (e) { console.error(`[site] ${name}:`, e); }
  };

  /* Контакты из config.js */
  safe('contacts', () => {
    const waUrl = (text) => `https://wa.me/${C.whatsapp}?text=${encodeURIComponent(text)}`;
    const links = {
      telegram: `https://t.me/${C.telegram}`,
      whatsapp: waUrl(C.codeword),
      instagram: `https://instagram.com/${C.instagram}`,
      phone: `tel:+${C.phone}`,
    };
    const phone = (d) => {
      const m = String(d).match(/^(\d)(\d{3})(\d{3})(\d{2})(\d{2})$/);
      return m ? `+${m[1]} ${m[2]} ${m[3]} ${m[4]} ${m[5]}` : `+${d}`;
    };
    $$('[data-link]').forEach((a) => {
      const url = links[a.dataset.link];
      if (!url) return;
      a.href = url;
      if (/^https?:/.test(url)) { a.target = '_blank'; a.rel = 'noopener'; }
    });
    $$('[data-pack]').forEach((a) => {
      a.href = waUrl(`${C.codeword}. Интересует пакет «${a.dataset.pack}»`);
      a.target = '_blank';
      a.rel = 'noopener';
    });
    const texts = {
      name: C.name,
      telegram: '@' + C.telegram,
      whatsapp: phone(C.whatsapp),
      phone: phone(C.phone),
      instagram: '@' + C.instagram,
    };
    $$('[data-text]').forEach((el) => {
      if (texts[el.dataset.text]) el.textContent = texts[el.dataset.text];
    });
    $$('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });
  });

  /* Мобильное меню */
  safe('menu', () => {
    const toggle = $('[data-menu-toggle]');
    const menu = $('[data-menu]');
    if (!toggle || !menu) return;
    const set = (open) => {
      menu.classList.toggle('is-open', open);
      document.documentElement.classList.toggle('menu-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.textContent = open ? 'Закрыть' : 'Меню';
    };
    toggle.addEventListener('click', () => set(!menu.classList.contains('is-open')));
    $$('a', menu).forEach((a) => a.addEventListener('click', () => set(false)));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') set(false); });
  });

  /* Анимация 1: фото в обложке раскрывается на всю ширину при прокрутке */
  safe('hero-reveal', () => {
    const fig = $('[data-hero-reveal]');
    if (!fig || reduce) return;
    const maxInset = () => (window.innerWidth < 720 ? 6 : 18); // % с каждой стороны
    let ticking = false;
    const update = () => {
      ticking = false;
      const r = fig.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 — фото только показалось снизу, 1 — его верх дошёл до верха экрана
      const p = clamp((vh - r.top) / vh, 0, 1);
      const e = 1 - Math.pow(1 - p, 2);
      fig.style.setProperty('--reveal-x', `${(maxInset() * (1 - e)).toFixed(2)}%`);
      fig.style.setProperty('--reveal-scale', (1.12 - 0.12 * e).toFixed(4));
    };
    const onScroll = () => {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
  });

  /* Обратный отсчёт: до 31 декабря и до 14 февраля, время Астаны (UTC+5) */
  safe('countdown', () => {
    const box = $('[data-countdown]');
    if (!box) return;
    const TZ = 5 * 3600e3;
    const pad = (n) => String(n).padStart(2, '0');
    const plural = (n, one, few, many) => {
      const a = n % 10;
      const b = n % 100;
      if (a === 1 && b !== 11) return one;
      if (a >= 2 && a <= 4 && (b < 10 || b >= 20)) return few;
      return many;
    };
    // ближайший момент «день.месяц 00:00» по Астане, который ещё впереди
    const next = (month, day, now) => {
      const y = new Date(now + TZ).getUTCFullYear();
      let t = Date.UTC(y, month, day) - TZ;
      if (t <= now) t = Date.UTC(y + 1, month, day) - TZ;
      return t;
    };
    const cell = (k) => $(`[data-cd="${k}"]`, box);
    const febEl = $('[data-feb]');
    const update = () => {
      const now = Date.now();
      let diff = next(0, 1, now) - now; // конец 31 декабря = 1 января 00:00
      const d = Math.floor(diff / 864e5); diff -= d * 864e5;
      const h = Math.floor(diff / 36e5); diff -= h * 36e5;
      const m = Math.floor(diff / 6e4); diff -= m * 6e4;
      const s = Math.floor(diff / 1e3);
      if (cell('d')) cell('d').textContent = pad(d);
      if (cell('h')) cell('h').textContent = pad(h);
      if (cell('m')) cell('m').textContent = pad(m);
      if (cell('s')) cell('s').textContent = pad(s);
      if (febEl) {
        const fd = Math.ceil((next(1, 14, now) - now) / 864e5);
        febEl.textContent = `${fd} ${plural(fd, 'день', 'дня', 'дней')}`;
      }
      box.classList.add('is-live');
    };
    update();
    setInterval(update, 1000);
  });

  /* Свободные места по акции */
  safe('spots', () => {
    const total = Math.max(0, C.spotsTotal | 0);
    const left = clamp(C.spotsLeft | 0, 0, total);
    $$('[data-spots-total]').forEach((el) => { el.textContent = total; });
    $$('[data-spots-left]').forEach((el) => { el.textContent = left; });
    $$('[data-spots]').forEach((row) => {
      row.innerHTML = Array.from({ length: total }, (_, i) =>
        `<span class="spot${i < left ? ' is-free' : ''}"></span>`).join('');
      row.setAttribute('aria-label', `Свободно ${left} из ${total}`);
    });
  });
})();
