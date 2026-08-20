/* =====================================================================
   Router, barra superior, navegación inferior y modales
   ===================================================================== */
const App = (() => {
  let current = 'home';

  const SCREENS = {
    home:     { render: () => Home.render(),     nav: true, ico: '🏠', label: 'Aprender' },
    practice: { render: () => Practice.render(), nav: true, ico: '🧠', label: 'Práctica' },
    exam:     { render: () => Exam.render(),     nav: true, ico: '📝', label: 'Examen' },
    profile:  { render: () => Profile.render(),  nav: true, ico: '👤', label: 'Perfil' }
  };

  /* ------------------------------ Barras --------------------------- */
  function paintTop() {
    Store.syncHearts();
    const s = Store.s;
    const eta = Store.heartEtaMs();
    const top = UI.$('#topbar');
    top.hidden = false;
    top.innerHTML = `
      <div class="topbar-in">
        <div class="brand">☁️ CloudLingo <small>CLF-C02</small></div>
        <div class="stat streak" title="Racha diaria">🔥 ${s.streak}</div>
        <div class="stat gem" title="Gemas">💎 ${s.gems}</div>
        <div class="stat heart ${s.hearts === 0 ? 'dim' : ''}" id="topHearts"
             title="${s.hearts < Store.MAX_HEARTS ? 'Siguiente vida en ' + UI.mmss(eta) : 'Vidas al máximo'}">
          ❤️ ${s.hearts}
        </div>
      </div>`;
    top.querySelector('#topHearts').onclick = () => {
      if (Store.s.hearts >= Store.MAX_HEARTS) return UI.toast('Ya tienes todas las vidas');
      modal(`<div style="text-align:center">
          <div style="font-size:44px">❤️</div>
          <h2 style="margin:8px 0">Vidas: ${Store.s.hearts}/${Store.MAX_HEARTS}</h2>
          <p class="muted">Recuperas una vida cada 15 minutos.<br>Siguiente en <b>${UI.mmss(Store.heartEtaMs())}</b></p>
          <button class="btn info block" style="margin-top:16px" data-modal-act="buy">Recargar por ${Store.REFILL_COST} 💎</button>
          <button class="btn ghost block" style="margin-top:8px" data-modal-act="close">Cerrar</button>
        </div>`, {
        buy: () => {
          if (Store.refillHearts(false)) { closeModal(); paintTop(); UI.toast('¡Vidas al máximo!'); }
          else UI.toast('No tienes gemas suficientes');
        },
        close: () => closeModal()
      });
    };
  }

  function paintNav() {
    const nav = UI.$('#nav');
    nav.hidden = false;
    nav.innerHTML = `<div class="nav-in">${Object.entries(SCREENS).map(([k, v]) =>
      `<button data-nav="${k}" class="${current === k ? 'on' : ''}"><span class="ico">${v.ico}</span>${v.label}</button>`).join('')}</div>`;
    nav.querySelectorAll('[data-nav]').forEach(b => b.onclick = () => go(b.dataset.nav));
  }

  /* ------------------------------ Router --------------------------- */
  function go(name) {
    if (SCREENS[name] === undefined) name = 'home';
    if (current === 'exam') Exam.stop();
    current = name;
    document.onkeydown = null;
    UI.$('#screen').className = 'screen';
    paintTop(); paintNav();
    SCREENS[name].render();
    window.scrollTo(0, 0);
    location.hash = name;
  }

  /* ------------------------------ Modal ---------------------------- */
  let modalEl = null;
  function modal(html, acts = {}) {
    closeModal();
    modalEl = document.createElement('div');
    modalEl.style.cssText = 'position:fixed;inset:0;z-index:80;background:rgba(0,0,0,.55);display:flex;align-items:center;justify-content:center;padding:18px';
    modalEl.innerHTML = `<div class="card" style="max-width:420px;width:100%;max-height:88vh;overflow:auto;border-bottom-width:6px">${html}</div>`;
    modalEl.addEventListener('click', e => {
      if (e.target === modalEl) return closeModal();
      const el = e.target.closest('[data-modal-act]');
      if (el && acts[el.dataset.modalAct]) acts[el.dataset.modalAct]();
    });
    document.body.appendChild(modalEl);
  }
  function closeModal() { if (modalEl) { modalEl.remove(); modalEl = null; } }

  function confirmQuit(mode) {
    modal(`<h2>¿Salir de la ${mode === 'practice' ? 'práctica' : 'lección'}?</h2>
      <p class="muted" style="margin:10px 0 16px">Perderás el progreso de esta sesión.</p>
      <button class="btn danger block" data-modal-act="yes">Salir</button>
      <button class="btn ghost block" style="margin-top:8px" data-modal-act="no">Seguir aprendiendo</button>`, {
      yes: () => { closeModal(); go('home'); },
      no: () => closeModal()
    });
  }

  function showNoHearts() {
    modal(`<div style="text-align:center">
        <div style="font-size:46px">💔</div>
        <h2 style="margin:8px 0">Te has quedado sin vidas</h2>
        <p class="muted">Recuperas una cada 15 minutos.<br>Siguiente en <b>${UI.mmss(Store.heartEtaMs())}</b></p>
        <p class="muted" style="margin-top:10px">Mientras tanto puedes practicar sin vidas.</p>
        <button class="btn info block" style="margin-top:16px" data-modal-act="buy">Recargar por ${Store.REFILL_COST} 💎</button>
        <button class="btn primary block" style="margin-top:8px" data-modal-act="practice">Ir a Práctica</button>
        <button class="btn ghost block" style="margin-top:8px" data-modal-act="close">Cerrar</button>
      </div>`, {
      buy: () => {
        if (Store.refillHearts(false)) { closeModal(); paintTop(); UI.toast('¡Vidas al máximo!'); }
        else UI.toast('No tienes gemas suficientes');
      },
      practice: () => { closeModal(); go('practice'); },
      close: () => { closeModal(); go('home'); }
    });
  }

  /* ------------------------------ Init ----------------------------- */
  function init() {
    UI.applyTheme();
    Store.rollDay();
    Achievements.check();
    go((location.hash || '#home').slice(1));
    setInterval(() => { if (SCREENS[current]) paintTop(); }, 30000);   // vidas y racha al día
    window.addEventListener('hashchange', () => {
      const h = location.hash.slice(1);
      if (SCREENS[h] && h !== current) go(h);
    });
    document.addEventListener('click', () => Sfx.unlockCtx(), { once: true });
  }

  return { go, init, modal, closeModal, confirmQuit, showNoHearts, paintTop };
})();

document.addEventListener('DOMContentLoaded', App.init);
