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
  const wait = (ms) => new Promise((res) => setTimeout(res, ms));
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const fmt = (n) => Math.round(n).toLocaleString('ru-RU');

  /* ------------------------------------------------------------------
     Контакты из config.js
     ------------------------------------------------------------------ */
  const waUrl = (text) => `https://wa.me/${C.whatsapp}?text=${encodeURIComponent(text)}`;
  const links = {
    telegram: `https://t.me/${C.telegram}`,
    whatsapp: waUrl(C.codeword),
    instagram: `https://instagram.com/${C.instagram}`,
    phone: `tel:+${C.phone}`,
  };
  const formatPhone = (d) => {
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
  $$('[data-text="telegram"]').forEach((el) => { el.textContent = '@' + C.telegram; });
  $$('[data-text="whatsapp"]').forEach((el) => { el.textContent = formatPhone(C.whatsapp); });
  $$('[data-text="phone"]').forEach((el) => { el.textContent = formatPhone(C.phone); });
  $$('[data-text="instagram"]').forEach((el) => { el.textContent = '@' + C.instagram; });
  $$('[data-text="name"]').forEach((el) => { el.textContent = C.name; });
  $$('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });

  /* ------------------------------------------------------------------
     Векторные цветы — заглушки, пока нет фотографий
     ------------------------------------------------------------------ */
  const PAL = {
    pink: ['#FDE3EC', '#F59DC0', '#DB5590'],
    lav: ['#F3EEFD', '#C9B8F0', '#8F76D8'],
    peach: ['#FFF0E6', '#F9C2A4', '#EA8C70'],
    cream: ['#FFFBF2', '#F7E3B5', '#E9BF6E'],
    rose: ['#FFE8EE', '#F4A9BC', '#D66682'],
    white: ['#FFFFFF', '#F6EEF3', '#E2CFDA'],
  };
  let uid = 0;

  function flower(x, y, r, palName, opt = {}) {
    const pal = PAL[palName] || PAL.pink;
    const type = opt.type || 'bloom';
    const petals = opt.petals || (type === 'daisy' ? 14 : 7);
    const layers = opt.layers || (type === 'daisy' ? 1 : 3);
    const rot = opt.rot != null ? opt.rot : (x * 7 + y * 3) % 60;
    const id = 'fl' + (++uid);
    let s = `<radialGradient id="${id}" cx=".5" cy=".95" r="1"><stop offset="0" stop-color="${pal[2]}"/><stop offset=".55" stop-color="${pal[1]}"/><stop offset="1" stop-color="${pal[0]}"/></radialGradient>`;
    for (let l = 0; l < layers; l++) {
      const lr = r * (1 - l * 0.27);
      const n = Math.max(5, petals - l);
      const w = type === 'daisy' ? 0.15 : 0.44;
      for (let i = 0; i < n; i++) {
        const a = rot + l * (180 / n) + (i * 360) / n;
        s += `<ellipse cx="${x}" cy="${(y - lr * 0.5).toFixed(1)}" rx="${(lr * w).toFixed(1)}" ry="${(lr * 0.52).toFixed(1)}" fill="url(#${id})" fill-opacity="${type === 'daisy' ? 1 : 0.88}" transform="rotate(${a.toFixed(1)} ${x} ${y})"/>`;
      }
    }
    if (type === 'daisy') {
      s += `<circle cx="${x}" cy="${y}" r="${(r * 0.24).toFixed(1)}" fill="#F2C35B"/><circle cx="${x}" cy="${y}" r="${(r * 0.12).toFixed(1)}" fill="#E5A63A"/>`;
    } else {
      s += `<circle cx="${x}" cy="${y}" r="${(r * 0.13).toFixed(1)}" fill="${pal[2]}"/>`;
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2;
        s += `<circle cx="${(x + Math.cos(a) * r * 0.1).toFixed(1)}" cy="${(y + Math.sin(a) * r * 0.1).toFixed(1)}" r="${(r * 0.035).toFixed(1)}" fill="#F7D27E"/>`;
      }
    }
    return s;
  }

  function leaf(x, y, len, angle, color = '#9DB596') {
    return `<ellipse cx="${x}" cy="${y - len / 2}" rx="${len * 0.22}" ry="${len / 2}" fill="${color}" transform="rotate(${angle} ${x} ${y})"/>`;
  }

  // [x, y, r, палитра, тип]
  const BOUQUETS = {
    b1: [[150, 120, 56, 'pink']],
    b2: [[108, 140, 46, 'lav'], [194, 132, 48, 'pink'], [152, 92, 40, 'cream', 'daisy']],
    b3: [
      [92, 150, 40, 'peach'], [208, 150, 42, 'lav'], [150, 128, 52, 'pink'],
      [114, 86, 34, 'cream', 'daisy'], [190, 84, 36, 'rose'], [150, 186, 30, 'white', 'daisy'],
    ],
    b4: [
      [64, 128, 32, 'lav'], [236, 126, 34, 'peach'], [150, 50, 30, 'lav', 'daisy'],
      [106, 82, 36, 'rose'], [196, 80, 36, 'cream', 'daisy'], [92, 158, 40, 'peach'],
      [208, 160, 42, 'lav'], [150, 120, 54, 'pink'], [118, 196, 28, 'white', 'daisy'],
      [186, 200, 30, 'rose'], [150, 214, 24, 'cream', 'daisy'],
    ],
    hero: [
      [70, 170, 34, 'lav'], [330, 160, 36, 'peach'], [200, 60, 34, 'cream', 'daisy'],
      [120, 100, 44, 'rose'], [270, 96, 46, 'pink'], [160, 52, 26, 'white', 'daisy'],
      [252, 40, 24, 'cream', 'daisy'], [100, 200, 50, 'peach'], [300, 210, 50, 'lav'],
      [200, 150, 66, 'pink'], [150, 250, 40, 'white', 'daisy'], [252, 262, 42, 'rose'],
      [200, 290, 30, 'cream', 'daisy'], [44, 240, 26, 'pink'], [356, 250, 24, 'cream', 'daisy'],
    ],
  };

  function bouquet(key) {
    const list = BOUQUETS[key];
    const big = key === 'hero';
    const W = big ? 400 : 300;
    const bx = W / 2;
    const by = big ? 470 : 330;
    let stems = '';
    let leaves = '';
    list.forEach(([x, y], i) => {
      const cx = (x + bx) / 2 + (x < bx ? -12 : 12);
      stems += `<path d="M${x} ${y} Q ${cx} ${(y + by) / 2} ${bx} ${by}" stroke="#8FA88A" stroke-width="${big ? 3 : 2.4}" fill="none" stroke-linecap="round"/>`;
      if (i % 2 === 0) {
        const lx = (x * 0.55 + bx * 0.45);
        const ly = (y * 0.45 + by * 0.55);
        leaves += leaf(lx.toFixed(1), ly.toFixed(1), big ? 46 : 34, x < bx ? -38 : 38, i % 4 ? '#A9C2A1' : '#86A07F');
      }
    });
    const heads = [...list]
      .sort((a, b) => a[1] - b[1])
      .map(([x, y, r, p, t]) => flower(x, y, r, p, { type: t }))
      .join('');
    return `<svg viewBox="0 0 ${W} ${W}" preserveAspectRatio="xMidYMax meet" aria-hidden="true">${stems}${leaves}${heads}</svg>`;
  }

  function single(palName, type) {
    return `<svg viewBox="0 0 200 200" aria-hidden="true">${flower(100, 100, 70, palName, { type, layers: type === 'daisy' ? 2 : 3, petals: type === 'daisy' ? 16 : 8 })}</svg>`;
  }

  function garden() {
    let s = '';
    const pals = ['pink', 'lav', 'peach', 'rose', 'cream', 'white'];
    let seed = 7;
    const rnd = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280);
    for (let i = 0; i < 40; i++) {
      const x = 10 + rnd() * 280;
      const y = 170 + (i / 40) * 210 + rnd() * 30;
      const r = 16 + rnd() * 24 + (i / 40) * 8;
      s += `<path d="M${x.toFixed(1)} ${y.toFixed(1)} L ${(x + (rnd() - .5) * 20).toFixed(1)} 420" stroke="#9DB596" stroke-width="2"/>`;
      s += flower(Math.round(x), Math.round(y), Math.round(r), pals[i % pals.length], { type: i % 4 === 0 ? 'daisy' : 'bloom' });
    }
    return `<svg viewBox="0 0 300 400" preserveAspectRatio="xMidYMax slice" aria-hidden="true">${s}</svg>`;
  }

  const BLOOMS = {
    hero: () => bouquet('hero'),
    b1: () => bouquet('b1'),
    b2: () => bouquet('b2'),
    b3: () => bouquet('b3'),
    b4: () => bouquet('b4'),
    thumb: () => single('pink'),
    order: () => bouquet('b3'),
    'f-lav': () => single('lav'),
    s1: () => single('lav'),
    s2: () => single('pink'),
    s3: () => single('white', 'daisy'),
    s4: () => single('rose'),
    s5: () => single('peach'),
    s6: () => single('cream', 'daisy'),
    garden,
  };
  $$('[data-bloom]').forEach((el) => {
    const make = BLOOMS[el.dataset.bloom];
    if (make) el.innerHTML = make();
  });

  /* ------------------------------------------------------------------
     Фото: показываем, когда загрузилось; иначе остаётся заглушка
     ------------------------------------------------------------------ */
  $$('[data-media]').forEach((m) => {
    const img = m.querySelector(':scope > img');
    if (!img) return;
    const ok = () => m.classList.add('has-img');
    const bad = () => m.classList.add('no-img');
    if (img.complete) {
      if (img.naturalWidth) ok(); else if (img.currentSrc || img.src) bad();
    } else {
      img.addEventListener('load', ok, { once: true });
      img.addEventListener('error', bad, { once: true });
    }
  });

  /* ------------------------------------------------------------------
     Разбивка заголовков на слова
     ------------------------------------------------------------------ */
  function splitWords(el) {
    let i = 0;
    const walk = (node) => {
      Array.from(node.childNodes).forEach((n) => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          const prev = n.previousSibling;
          n.textContent.split(/([ \t\n\r]+)/).forEach((part, idx) => {
            if (!part) return;
            if (/^[ \t\n\r]+$/.test(part)) { frag.appendChild(document.createTextNode(' ')); return; }
            const w = document.createElement('span');
            w.className = 'w';
            w.style.setProperty('--wi', i++);
            w.textContent = part;
            // запятая сразу после <em> не должна переноситься на новую строку
            if (idx === 0 && prev && prev.nodeType === 1) {
              const glue = document.createElement('span');
              glue.className = 'nw';
              prev.replaceWith(glue);
              glue.append(prev, w);
              return;
            }
            frag.appendChild(w);
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1) {
          walk(n);
        }
      });
    };
    walk(el);
  }
  $$('[data-split]').forEach(splitWords);

  /* ------------------------------------------------------------------
     Появление при скролле
     ------------------------------------------------------------------ */
  $$('[data-stagger]').forEach((group) => {
    Array.from(group.children).forEach((child, i) => child.style.setProperty('--d', `${i * 90}ms`));
  });

  const revealTargets = $$('.reveal, [data-split]').filter((el) => !el.closest('.hero'));
  if (reduce || !('IntersectionObserver' in window)) {
    revealTargets.forEach((el) => el.classList.add('is-in'));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0 });
    revealTargets.forEach((el) => io.observe(el));
  }

  /* ------------------------------------------------------------------
     Интро → запуск hero
     ------------------------------------------------------------------ */
  const hero = $('.hero');
  const startHero = () => hero && hero.classList.add('is-in');
  const intro = $('[data-intro]');
  if (!intro || reduce) {
    if (intro) intro.remove();
    startHero();
  } else {
    const fonts = document.fonts ? document.fonts.ready : Promise.resolve();
    Promise.race([fonts, wait(1800)])
      .then(() => wait(Math.max(250, 1500 - performance.now())))
      .then(() => {
        intro.classList.add('is-done');
        setTimeout(startHero, 280);
        setTimeout(() => intro.remove(), 1300);
      });
  }

  /* ------------------------------------------------------------------
     Навигация
     ------------------------------------------------------------------ */
  const nav = $('[data-nav]');
  const burger = $('[data-burger]');
  const mmenu = $('[data-mmenu]');
  const setMenu = (open) => {
    document.documentElement.classList.toggle('menu-open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
  };
  burger.addEventListener('click', () => setMenu(!document.documentElement.classList.contains('menu-open')));
  $$('a', mmenu).forEach((a) => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });

  const navLinks = $$('.nav__menu a');
  if ('IntersectionObserver' in window) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        navLinks.forEach((a) => a.classList.toggle('is-active', a.getAttribute('href') === '#' + e.target.id));
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    $$('main section[id]').forEach((s) => spy.observe(s));
  }

  /* ------------------------------------------------------------------
     Скролл: шапка, параллакс, таймлайн, плавающая кнопка
     ------------------------------------------------------------------ */
  const heroMedia = $('[data-hero-media]');
  const heroContent = $('[data-hero-content]');
  const parallax = $$('[data-parallax]');
  const timeline = $('[data-timeline]');
  const steps = $$('.step');
  const fab = $('[data-fab]');
  const contact = $('#contact');
  let lastY = window.scrollY;
  let ticking = false;

  function onScroll() {
    ticking = false;
    const y = window.scrollY;
    const vh = window.innerHeight;
    const heroH = hero ? hero.offsetHeight : vh;
    const menuOpen = document.documentElement.classList.contains('menu-open');

    nav.classList.toggle('is-light', y > heroH - 90);
    nav.classList.toggle('is-hidden', !menuOpen && y > lastY + 2 && y > heroH * 0.6);
    if (y < lastY - 2) nav.classList.remove('is-hidden');
    lastY = y;

    if (!reduce && y < heroH) {
      heroMedia.style.transform = `translate3d(0, ${y * 0.28}px, 0)`;
      heroContent.style.transform = `translate3d(0, ${y * 0.12}px, 0)`;
      heroContent.style.opacity = String(clamp(1 - y / (heroH * 0.7), 0, 1));
    }

    if (!reduce) {
      parallax.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) return;
        const off = (r.top + r.height / 2 - vh / 2) / vh;
        el.style.setProperty('--py', `${(off * -40).toFixed(1)}px`);
      });
    }

    if (timeline) {
      const r = timeline.getBoundingClientRect();
      const p = clamp((vh * 0.62 - r.top) / r.height, 0, 1);
      timeline.style.setProperty('--p', p.toFixed(3));
      steps.forEach((s) => {
        const star = s.querySelector('.step__star').getBoundingClientRect();
        if (star.top < vh * 0.72) s.classList.add('is-active');
      });
    }

    if (fab) {
      const cr = contact.getBoundingClientRect();
      fab.classList.toggle('is-shown', y > heroH * 0.8 && cr.top > vh * 0.6);
    }
  }
  const requestScroll = () => {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  };
  window.addEventListener('scroll', requestScroll, { passive: true });
  window.addEventListener('resize', requestScroll);
  onScroll();

  /* ------------------------------------------------------------------
     Лепестки
     ------------------------------------------------------------------ */
  const PETAL_COLORS = [
    ['#FFE3EE', '#F59DC0'],
    ['#FFFFFF', '#F7C6DA'],
    ['#F3EEFD', '#C9B8F0'],
    ['#FFF0E6', '#F6BFA6'],
  ];
  const sprites = PETAL_COLORS.map(([a, b]) => {
    const c = document.createElement('canvas');
    c.width = c.height = 64;
    const x = c.getContext('2d');
    const g = x.createLinearGradient(0, 4, 0, 60);
    g.addColorStop(0, a);
    g.addColorStop(1, b);
    x.fillStyle = g;
    x.beginPath();
    x.moveTo(32, 60);
    x.bezierCurveTo(4, 44, 6, 14, 26, 6);
    x.quadraticCurveTo(32, 12, 38, 6);
    x.bezierCurveTo(58, 14, 60, 44, 32, 60);
    x.fill();
    x.globalAlpha = 0.35;
    x.strokeStyle = b;
    x.lineWidth = 1.2;
    x.beginPath();
    x.moveTo(32, 56);
    x.quadraticCurveTo(30, 34, 32, 14);
    x.stroke();
    return c;
  });

  class Petals {
    constructor(canvas) {
      this.c = canvas;
      this.ctx = canvas.getContext('2d');
      this.count = parseInt(canvas.dataset.petals, 10) || 20;
      this.items = [];
      this.running = false;
      this.visible = false;
      this.resize();
      for (let i = 0; i < this.count; i++) this.items.push(this.spawn(true));
      window.addEventListener('resize', () => this.resize());
      new IntersectionObserver(([e]) => {
        this.visible = e.isIntersecting;
        if (this.visible) this.start();
      }).observe(canvas);
      document.addEventListener('visibilitychange', () => { if (!document.hidden && this.visible) this.start(); });
    }
    resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      this.w = this.c.clientWidth;
      this.h = this.c.clientHeight;
      this.c.width = this.w * dpr;
      this.c.height = this.h * dpr;
      this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const mobile = this.w < 720;
      this.target = mobile ? Math.round(this.count * 0.55) : this.count;
    }
    spawn(initial) {
      const s = 10 + Math.random() * 16;
      return {
        x: Math.random() * this.w * 1.1 - this.w * 0.1,
        y: initial ? Math.random() * this.h : -40 - Math.random() * 120,
        s,
        vy: 0.35 + Math.random() * 0.7 + s * 0.015,
        vx: 0.25 + Math.random() * 0.55,
        rot: Math.random() * Math.PI * 2,
        vr: (Math.random() - 0.5) * 0.03,
        flip: Math.random() * Math.PI * 2,
        vf: 0.015 + Math.random() * 0.03,
        sway: Math.random() * Math.PI * 2,
        img: sprites[(Math.random() * sprites.length) | 0],
        a: 0.55 + Math.random() * 0.45,
      };
    }
    start() {
      if (this.running) return;
      this.running = true;
      this.last = performance.now();
      const loop = (t) => {
        if (!this.visible || document.hidden) { this.running = false; return; }
        const dt = Math.min(3, (t - this.last) / 16.67);
        this.last = t;
        this.tick(dt, t);
        requestAnimationFrame(loop);
      };
      requestAnimationFrame(loop);
    }
    tick(dt, t) {
      const { ctx } = this;
      ctx.clearRect(0, 0, this.w, this.h);
      const wind = Math.sin(t / 3200) * 0.35;
      this.items.forEach((p, i) => {
        if (i >= this.target) return;
        p.sway += 0.012 * dt;
        p.x += (p.vx + wind + Math.sin(p.sway) * 0.6) * dt;
        p.y += p.vy * dt;
        p.rot += p.vr * dt;
        p.flip += p.vf * dt;
        if (p.y > this.h + 40 || p.x > this.w + 60) Object.assign(p, this.spawn(false));
        ctx.save();
        ctx.globalAlpha = p.a;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.scale(1, 0.35 + Math.abs(Math.cos(p.flip)) * 0.65);
        ctx.drawImage(p.img, -p.s / 2, -p.s / 2, p.s, p.s);
        ctx.restore();
      });
    }
  }
  if (!reduce) $$('canvas[data-petals]').forEach((c) => new Petals(c));

  /* ------------------------------------------------------------------
     Тост «Новый заказ» в hero
     ------------------------------------------------------------------ */
  const ORDERS = [
    ['23:47', 'Букет «Пионовое облако»', '24 500 ₸ · оплачено Kaspi'],
    ['02:14', 'Корзина «Нежность» + открытка', '18 900 ₸ · оплачено картой'],
    ['06:05', 'Розы, 25 шт. · доставка к 9:00', '32 000 ₸ · оплачено Kaspi'],
    ['13:30', 'Букет «Лавандовый закат» + шары', '27 800 ₸ · оплачено Kaspi'],
  ];
  const toast = $('[data-toast]');
  if (toast && !reduce) {
    const body = $('.toast__body', toast);
    const tTime = $('[data-toast-time]', toast);
    const tName = $('[data-toast-name]', toast);
    const tMeta = $('[data-toast-meta]', toast);
    let k = 0;
    setInterval(async () => {
      if (document.hidden || window.scrollY > window.innerHeight) return;
      k = (k + 1) % ORDERS.length;
      body.classList.add('is-swap');
      await wait(450);
      const [time, name, meta] = ORDERS[k];
      tTime.textContent = time;
      tName.textContent = name;
      tMeta.textContent = meta.replace(/ (?=₸)/, ' ');
      body.classList.remove('is-swap');
    }, 4200);
  }

  /* ------------------------------------------------------------------
     Чат в телефоне: сообщения приходят по очереди
     ------------------------------------------------------------------ */
  const chat = $('[data-chat]');
  if (chat) {
    const msgs = $$('[data-msg]', chat);
    const typing = $('[data-typing]', chat);
    const play = async () => {
      for (const m of msgs) {
        if (!m.classList.contains('tg-kb')) {
          typing.classList.add('is-on');
          await wait(reduce ? 0 : 900);
          typing.classList.remove('is-on');
        }
        m.classList.add('is-in');
        await wait(reduce ? 0 : 700);
      }
    };
    if ('IntersectionObserver' in window && !reduce) {
      const io = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) { io.disconnect(); play(); }
      }, { threshold: 0.35 });
      io.observe(chat);
    } else {
      msgs.forEach((m) => m.classList.add('is-in'));
    }
  }

  /* ------------------------------------------------------------------
     Переключатель скидки: цены пересчитываются с анимацией
     ------------------------------------------------------------------ */
  const sw = $('[data-discount]');
  const packs = $('[data-packs]');
  const prices = $$('[data-price]');
  prices.forEach((el) => { el._v = +el.dataset.price; });
  function tween(el, to) {
    const from = el._v;
    const t0 = performance.now();
    const dur = reduce ? 0 : 700;
    const step = (t) => {
      const k = dur ? clamp((t - t0) / dur, 0, 1) : 1;
      const e = 1 - Math.pow(1 - k, 3);
      el._v = from + (to - from) * e;
      el.textContent = fmt(el._v);
      if (k < 1) requestAnimationFrame(step); else el._v = to;
    };
    requestAnimationFrame(step);
  }
  if (sw) {
    sw.addEventListener('change', () => {
      packs.classList.toggle('is-discount', sw.checked);
      prices.forEach((el) => {
        const base = +el.dataset.price;
        tween(el, sw.checked ? Math.round((base * (100 - C.discount)) / 100 / 100) * 100 : base);
      });
    });
  }

  /* ------------------------------------------------------------------
     Обратный отсчёт до Нового года (время Астаны, UTC+5)
     ------------------------------------------------------------------ */
  const cd = $('[data-countdown]');
  if (cd) {
    const TZ = 5 * 3600e3;
    const cells = { d: $('[data-cd="d"]', cd), h: $('[data-cd="h"]', cd), m: $('[data-cd="m"]', cd), s: $('[data-cd="s"]', cd) };
    const feb = $('[data-feb]');
    const pad = (n) => String(n).padStart(2, '0');
    const plural = (n, a, b, c) => {
      const m10 = n % 10;
      const m100 = n % 100;
      if (m10 === 1 && m100 !== 11) return a;
      if (m10 >= 2 && m10 <= 4 && (m100 < 10 || m100 >= 20)) return b;
      return c;
    };
    const update = () => {
      const now = Date.now();
      const local = new Date(now + TZ);
      const y = local.getUTCFullYear();
      const ny = Date.UTC(y + 1, 0, 1) - TZ;
      let diff = Math.max(0, ny - now);
      const d = Math.floor(diff / 864e5); diff -= d * 864e5;
      const h = Math.floor(diff / 36e5); diff -= h * 36e5;
      const m = Math.floor(diff / 6e4); diff -= m * 6e4;
      const s = Math.floor(diff / 1e3);
      cells.d.textContent = pad(d);
      cells.h.textContent = pad(h);
      cells.m.textContent = pad(m);
      cells.s.textContent = pad(s);

      let fy = y;
      if (Date.UTC(fy, 1, 14) - TZ <= now) fy += 1;
      const fd = Math.ceil((Date.UTC(fy, 1, 14) - TZ - now) / 864e5);
      if (feb) feb.textContent = `${fd} ${plural(fd, 'день', 'дня', 'дней')}`;
    };
    update();
    setInterval(update, 1000);
  }

  /* Свободные места */
  const spotsRow = $('[data-spots]');
  if (spotsRow) {
    const total = Math.max(0, C.spotsTotal | 0);
    const left = clamp(C.spotsLeft | 0, 0, total);
    spotsRow.innerHTML = Array.from({ length: total }, (_, i) =>
      `<svg class="${i < left ? 'is-free' : ''}" style="--i:${i}" aria-hidden="true"><use href="#i-spark"/></svg>`).join('');
    $$('[data-spots-total]').forEach((el) => { el.textContent = total; });
    $$('[data-spots-left]').forEach((el) => { el.textContent = left; });
  }

  /* ------------------------------------------------------------------
     Магнитные кнопки и свечение карточек под курсором
     ------------------------------------------------------------------ */
  if (finePointer && !reduce) {
    $$('.magnetic').forEach((el) => {
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        el.style.transform = `translate(${dx * 0.18}px, ${dy * 0.3}px)`;
      });
      el.addEventListener('pointerleave', () => { el.style.transform = ''; });
    });
    $$('.glow').forEach((el) => {
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        el.style.setProperty('--mx', `${e.clientX - r.left}px`);
        el.style.setProperty('--my', `${e.clientY - r.top}px`);
      });
    });
  }
})();
