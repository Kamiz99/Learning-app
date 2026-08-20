/* ================= Utilidades de UI ================= */
const UI = (() => {
  const $ = sel => document.querySelector(sel);
  const esc = str => String(str).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  }
  const sample = (arr, n) => shuffle(arr).slice(0, n);

  function toast(msg, ms = 2200) {
    const wrap = $('#toast');
    const t = document.createElement('div');
    t.className = 'toast'; t.textContent = msg;
    wrap.appendChild(t);
    setTimeout(() => { t.style.transition = 'opacity .3s'; t.style.opacity = '0'; setTimeout(() => t.remove(), 320); }, ms);
  }

  const mmss = ms => {
    const s = Math.max(0, Math.round(ms / 1000));
    return String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0');
  };

  function heartsHtml() {
    Store.syncHearts();
    const h = Store.s.hearts;
    return '❤️'.repeat(h) + '<span style="opacity:.28">' + '❤️'.repeat(Store.MAX_HEARTS - h) + '</span>';
  }

  function applyTheme() {
    const t = Store.s.theme;
    if (t === 'auto') document.documentElement.removeAttribute('data-theme');
    else document.documentElement.setAttribute('data-theme', t);
  }

  /** Delegación de eventos por [data-act] dentro de un contenedor */
  function bind(root, handlers) {
    root.addEventListener('click', e => {
      const el = e.target.closest('[data-act]');
      if (!el || !root.contains(el)) return;
      const fn = handlers[el.dataset.act];
      if (fn) fn(el, e);
    });
  }

  return { $, esc, shuffle, sample, toast, mmss, heartsHtml, applyTheme, bind };
})();
