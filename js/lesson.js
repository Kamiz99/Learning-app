/* =====================================================================
   Motor de lección: cola de ejercicios, vidas, feedback y resultados.
   Se reutiliza para lecciones normales y para sesiones de repaso.
   ===================================================================== */
const Lesson = (() => {
  let S = null;

  function start(opts) {
    // opts: { title, exercises:[], lessonId?, mode:'lesson'|'practice', useHearts }
    Store.syncHearts();
    if (opts.useHearts !== false && Store.s.hearts === 0) { App.showNoHearts(opts); return; }
    S = {
      title: opts.title,
      lessonId: opts.lessonId || null,
      mode: opts.mode || 'lesson',
      useHearts: opts.useHearts !== false,
      queue: opts.exercises.slice(),
      total: opts.exercises.length,
      done: 0, firstTry: 0, mistakes: 0, answered: 0,
      wrongList: [],
      t0: Date.now(),
      retry: new Set()
    };
    Sfx.unlockCtx();
    next();
  }

  function next() {
    if (!S.queue.length) return finish(true);
    const ex = S.queue[0];
    render(ex);
  }

  function progressPct() {
    return Math.round((S.done / Math.max(1, S.total)) * 100);
  }

  function render(ex) {
    const app = UI.$('#screen');
    UI.$('#topbar').hidden = true; UI.$('#nav').hidden = true;
    app.classList.add('full');
    app.innerHTML = `
      <div class="lesson-top">
        <button class="icon-btn" id="quit" title="Salir">✕</button>
        <div class="pbar ${S.mode === 'practice' ? 'blue' : ''}"><i style="width:${progressPct()}%"></i></div>
        ${S.useHearts ? `<div class="hearts" id="hearts">${UI.heartsHtml()}</div>` : '<span class="badge">Repaso</span>'}
      </div>
      <div class="q-wrap">
        <div class="q-kind">${UI.esc(Exercises.kindLabel(ex))}</div>
        <h2 class="q-title">${UI.esc(Exercises.title(ex))}</h2>
        <div id="exroot"></div>
      </div>
      <div class="foot" id="foot">
        <div class="foot-in">
          <div class="fb" id="fb"></div>
          <button class="btn primary" id="check" disabled>Comprobar</button>
        </div>
      </div>`;

    const checkBtn = UI.$('#check');
    const ctrl = Exercises.build(ex, UI.$('#exroot'),
      () => { checkBtn.disabled = !ctrl.ready; },
      () => { if (ctrl.auto) setTimeout(() => doCheck(ex, ctrl), 380); });

    if (ctrl.auto) {                       // emparejar: se corrige solo al completarse
      checkBtn.hidden = true;
      UI.$('#fb').innerHTML = '<p class="muted">Toca un elemento de cada columna para emparejarlos.</p>';
    }
    checkBtn.disabled = !ctrl.ready;
    checkBtn.onclick = () => doCheck(ex, ctrl);
    UI.$('#quit').onclick = () => App.confirmQuit(S.mode);
    document.onkeydown = e => {
      if (e.key === 'Enter' && !checkBtn.disabled) { e.preventDefault(); checkBtn.click(); }
    };
  }

  function doCheck(ex, ctrl) {
    if (ctrl.graded) return;
    ctrl.graded = true;
    const ok = ctrl.grade();
    const isRetry = S.retry.has(ex.id);
    S.answered++;
    Store.track(ex.id, ok);

    if (ok) {
      if (!isRetry) S.firstTry++;
      S.queue.shift(); S.done++;
      if (!ctrl.auto) Sfx.correct();
    } else {
      S.mistakes++;
      if (!S.wrongList.find(w => w.id === ex.id)) S.wrongList.push(ex);
      S.retry.add(ex.id);
      S.queue.shift();
      S.queue.splice(Math.min(S.queue.length, 2 + Math.floor(Math.random() * 2)), 0, ex);  // vuelve más tarde
      if (S.useHearts) { Store.loseHeart(); }
      if (!ctrl.auto) Sfx.wrong();
    }

    const foot = UI.$('#foot');
    foot.classList.add(ok ? 'ok' : 'bad');
    UI.$('#fb').innerHTML = ok
      ? `<h3>✅ ${['¡Correcto!', '¡Muy bien!', '¡Exacto!', '¡Genial!'][Math.floor(Math.random() * 4)]}</h3>
         <p>${UI.esc(ex.why || '')}</p>`
      : `<h3>❌ Respuesta incorrecta</h3>
         <p><b>Solución:</b> ${UI.esc(ctrl.solutionText)}<br>${UI.esc(ex.why || '')}</p>`;

    const btn = UI.$('#check');
    btn.hidden = false;
    btn.className = 'btn ' + (ok ? 'primary' : 'danger');
    btn.disabled = false;
    btn.textContent = 'Continuar';
    UI.$('#hearts') && (UI.$('#hearts').innerHTML = UI.heartsHtml());

    btn.onclick = () => {
      if (S.useHearts && Store.s.hearts === 0) return finish(false);
      next();
    };
    document.onkeydown = e => { if (e.key === 'Enter') { e.preventDefault(); btn.click(); } };
  }

  /* ------------------------------ Resultado ------------------------ */
  function finish(completed) {
    document.onkeydown = null;
    const secs = Math.round((Date.now() - S.t0) / 1000);
    const acc = S.total ? Math.round((S.firstTry / S.total) * 100) : 0;

    let xp = 0, gems = 0, firstClear = false;
    if (completed) {
      const before = S.lessonId ? Store.isDone(S.lessonId) : true;
      xp = S.mode === 'practice' ? 10 + Math.round(acc / 10) : 15 + (acc === 100 ? 5 : 0);
      Store.addXp(xp);
      if (S.lessonId) {
        Store.saveLesson(S.lessonId, acc);
        if (!before) { firstClear = true; gems = 5; Store.addGems(gems); }
      }
      Sfx.finish();
    } else {
      Sfx.fail();
    }

    const newAch = completed ? Achievements.check() : [];
    const app = UI.$('#screen');
    app.classList.add('full');

    if (!completed) {
      app.innerHTML = `
        <div class="result">
          <div class="big">💔</div>
          <h1>Te has quedado sin vidas</h1>
          <p class="muted" style="margin-top:8px">Repasa la teoría y vuelve a intentarlo. Las vidas se recuperan con el tiempo o con gemas.</p>
          <div class="stats-row">
            <div class="stat-card b"><h4>Acertadas</h4><b>${S.firstTry}/${S.total}</b></div>
            <div class="stat-card"><h4>Fallos</h4><b>${S.mistakes}</b></div>
          </div>
          ${wrongReview()}
          <div class="grid" style="margin-top:18px">
            <button class="btn primary block" data-go="home">Volver al camino</button>
            <button class="btn info block" data-go="refill">Recargar vidas (${Store.REFILL_COST} 💎)</button>
          </div>
        </div>`;
    } else {
      app.innerHTML = `
        <div class="result">
          <div class="big">${acc === 100 ? '🏆' : acc >= 80 ? '🎉' : '👏'}</div>
          <h1>${acc === 100 ? '¡Lección perfecta!' : '¡Lección completada!'}</h1>
          <p class="muted">${UI.esc(S.title)}</p>
          <div class="stats-row">
            <div class="stat-card"><h4>XP ganada</h4><b>+${xp}</b></div>
            <div class="stat-card g"><h4>Precisión</h4><b>${acc}%</b></div>
            <div class="stat-card b"><h4>Tiempo</h4><b>${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, '0')}</b></div>
          </div>
          ${gems ? `<p class="badge">💎 +${gems} gemas por completarla por primera vez</p>` : ''}
          ${newAch.length ? `<div class="card" style="margin-top:14px;text-align:left">
              <b>🏅 Nuevo logro desbloqueado</b>
              ${newAch.map(a => `<p class="muted" style="margin-top:6px">${a.icon} ${UI.esc(a.title)} — ${UI.esc(a.desc)}</p>`).join('')}
            </div>` : ''}
          ${wrongReview()}
          <div class="grid" style="margin-top:18px">
            <button class="btn primary block" data-go="home">Continuar</button>
            ${S.wrongList.length ? '<button class="btn info block" data-go="again">Repasar los fallos</button>' : ''}
          </div>
        </div>`;
    }

    const wrong = S.wrongList.slice();
    app.querySelectorAll('[data-go]').forEach(b => b.onclick = () => {
      const go = b.dataset.go;
      if (go === 'home') App.go('home');
      else if (go === 'again') start({ title: 'Repaso de fallos', exercises: UI.shuffle(wrong), mode: 'practice', useHearts: false });
      else if (go === 'refill') {
        if (Store.refillHearts(false)) { UI.toast('Vidas recargadas ❤️'); App.go('home'); }
        else UI.toast('No tienes gemas suficientes');
      }
    });
  }

  function wrongReview() {
    if (!S.wrongList.length) return '';
    return `<div class="card" style="text-align:left;margin-top:18px">
      <div class="section-title" style="margin-top:0">Para repasar</div>
      ${S.wrongList.map(e => `<div style="padding:8px 0;border-bottom:2px solid var(--line)">
          <p style="font-size:14px">${UI.esc(Exercises.title(e))}</p>
          <p class="muted" style="margin-top:4px;font-size:13px">${UI.esc(e.why || '')}</p>
        </div>`).join('')}
    </div>`;
  }

  return { start };
})();
