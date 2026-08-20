/* =====================================================================
   Pantallas: camino, práctica, examen y perfil + logros
   ===================================================================== */

/* ------------------------------- LOGROS ------------------------------ */
const Achievements = (() => {
  const list = [
    { id:'first',    icon:'🌱', title:'Primer paso',        desc:'Completa tu primera lección',        test:s=>Object.keys(s.lessons).length>=1 },
    { id:'five',     icon:'🖐️', title:'Cinco de cinco',     desc:'Completa 5 lecciones',               test:s=>Object.keys(s.lessons).length>=5 },
    { id:'half',     icon:'🌗', title:'A medio camino',     desc:'Completa la mitad de las lecciones',  test:s=>Object.keys(s.lessons).length>=Math.ceil(CONTENT.allLessons.length/2) },
    { id:'allless',  icon:'🎓', title:'Temario completo',   desc:'Completa todas las lecciones',        test:s=>Object.keys(s.lessons).length>=CONTENT.allLessons.length },
    { id:'perfect5', icon:'💎', title:'Precisión total',    desc:'Consigue 5 lecciones perfectas',      test:s=>Object.values(s.lessons).filter(l=>l.stars===3).length>=5 },
    { id:'streak3',  icon:'🔥', title:'Racha de 3 días',    desc:'Practica 3 días seguidos',            test:s=>s.streak>=3 },
    { id:'streak7',  icon:'⚡', title:'Semana perfecta',    desc:'Practica 7 días seguidos',            test:s=>s.streak>=7 },
    { id:'streak30', icon:'🏔️', title:'Un mes imparable',   desc:'Practica 30 días seguidos',           test:s=>s.streak>=30 },
    { id:'xp250',    icon:'⭐', title:'250 XP',             desc:'Acumula 250 puntos de experiencia',   test:s=>s.xp>=250 },
    { id:'xp1000',   icon:'🌟', title:'1000 XP',            desc:'Acumula 1000 puntos de experiencia',  test:s=>s.xp>=1000 },
    { id:'exam1',    icon:'📝', title:'Primer simulacro',   desc:'Termina un simulacro completo',       test:s=>s.exams.length>=1 },
    { id:'exampass', icon:'✅', title:'Aprobado',           desc:'Supera un simulacro con 70 % o más',  test:s=>s.exams.some(e=>e.pct>=70) },
    { id:'exam90',   icon:'👑', title:'Nivel experto',      desc:'Consigue un 90 % en un simulacro',    test:s=>s.exams.some(e=>e.pct>=90) }
  ];
  function check() {
    const nuevos = [];
    list.forEach(a => { if (a.test(Store.s) && Store.unlock(a.id)) nuevos.push(a); });
    return nuevos;
  }
  return { list, check };
})();

/* ------------------------------ NIVEL -------------------------------- */
const Level = {
  of: xp => Math.floor(Math.sqrt(xp / 40)) + 1,
  needed: lvl => Math.pow(lvl, 2) * 40,
  progress(xp) {
    const l = Level.of(xp), a = Level.needed(l - 1), b = Level.needed(l);
    return { level: l, pct: Math.round(((xp - a) / (b - a)) * 100), next: b - xp };
  }
};

/* =============================== HOME ================================ */
const Home = (() => {
  function unlocked(idx) {
    if (Store.s.freeNav) return true;
    if (idx === 0) return true;
    return Store.isDone(CONTENT.allLessons[idx - 1].id);
  }

  function render() {
    Store.rollDay();
    const s = Store.s;
    const doneCount = CONTENT.allLessons.filter(l => Store.isDone(l.id)).length;
    const totalPct = Math.round((doneCount / CONTENT.allLessons.length) * 100);
    const goalPct = Math.min(100, Math.round((s.todayXp / s.dailyGoal) * 100));
    const lv = Level.progress(s.xp);
    let gi = -1;

    const html = `
      <section class="hero">
        <div>
          <h1>AWS Cloud Practitioner</h1>
          <p>CLF-C02 · ${doneCount}/${CONTENT.allLessons.length} lecciones · Nivel ${lv.level}</p>
          <p style="margin-top:10px"><span class="badge" style="background:rgba(255,255,255,.2);border-color:transparent;color:#fff">🔥 ${s.streak} días</span>
          <span class="badge" style="background:rgba(255,255,255,.2);border-color:transparent;color:#fff">⭐ ${s.xp} XP</span></p>
        </div>
        <div class="ring" style="--p:${goalPct}"><i>${s.todayXp}/${s.dailyGoal}</i></div>
      </section>

      <div class="card" style="display:flex;align-items:center;gap:12px;flex-wrap:wrap">
        <div style="flex:1;min-width:200px">
          <b>Progreso del temario</b>
          <div class="bar" style="margin-top:8px"><i class="green" style="width:${totalPct}%"></i></div>
        </div>
        <button class="btn info sm" data-act="continue">Continuar ▶</button>
      </div>

      <div class="unit-jump">
        ${CONTENT.units.map(u => {
          const d = u.lessons.filter(l => Store.isDone(l.id)).length;
          const full = d === u.lessons.length;
          return `<button data-act="jump" data-id="${u.id}" class="${full ? 'full' : ''}"
            style="--c:${u.color}" title="${UI.esc(u.title)}">${u.icon} <b>${u.num}</b></button>`;
        }).join('')}
      </div>

      ${CONTENT.units.map(u => {
        const lessons = u.lessons.map(l => {
          gi++;
          const st = Store.lesson(l.id);
          const done = Store.isDone(l.id);
          const open = unlocked(gi);
          const isNext = open && !done;
          const cls = done ? (st.stars === 3 ? 'gold' : 'done') : open ? 'current' : 'locked';
          return `<div class="node">
              ${isNext ? '<span class="start-tip">Empezar</span>' : ''}
              <button class="bubble ${cls}" ${open ? '' : 'disabled'} data-act="lesson" data-id="${l.id}"
                title="${UI.esc(l.title)}">${open ? l.icon : '🔒'}</button>
              <span class="cap">${UI.esc(l.title)}${done ? '<br>' + '⭐'.repeat(st.stars) : ''}</span>
            </div>`;
        }).join('');
        const uDone = u.lessons.filter(l => Store.isDone(l.id)).length;
        return `<section class="unit" id="sec-${u.id}">
          <div class="unit-head" style="background:${u.color}">
            <div>
              <div class="k">${u.domain} · ${u.weight} % del examen</div>
              <h2>${u.icon} Unidad ${u.num}: ${UI.esc(u.title)}</h2>
            </div>
            <span class="pill">${uDone}/${u.lessons.length}</span>
          </div>
          <p class="muted" style="margin:10px 4px 0">${UI.esc(u.intro)}</p>
          <div class="path">${lessons}</div>
        </section>`;
      }).join('')}

      <div class="card" style="text-align:center">
        <h3>¿Listo para el examen real?</h3>
        <p class="muted" style="margin:8px 0 14px">65 preguntas · 90 minutos · se aprueba con un 70 %</p>
        <button class="btn info" data-act="exam">Hacer un simulacro</button>
      </div>`;

    const root = UI.$('#screen');
    root.className = 'screen';
    root.innerHTML = html;
    UI.bind(root, {
      lesson: el => openLesson(el.dataset.id),
      exam: () => App.go('exam'),
      continue: () => {
        const nextL = CONTENT.allLessons.find(l => !Store.isDone(l.id)) || CONTENT.allLessons[0];
        openLesson(nextL.id);
      },
      jump: el => {
        const sec = document.getElementById('sec-' + el.dataset.id);
        if (sec) sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  function openLesson(id) {
    const l = CONTENT.lessonById(id);
    const u = CONTENT.unitById(l.unitId);
    const st = Store.lesson(id);
    App.modal(`
      <div style="text-align:center">
        <div style="font-size:46px">${l.icon}</div>
        <h2 style="margin:6px 0 4px">${UI.esc(l.title)}</h2>
        <p class="muted">Unidad ${u.num} · ${l.ex.length} ejercicios</p>
        ${st.plays ? `<p class="badge" style="margin-top:10px">Mejor resultado: ${st.best}% ${'⭐'.repeat(st.stars)}</p>` : ''}
        <div class="card" style="text-align:left;margin-top:14px;background:var(--bg-soft)">
          <b>💡 Idea clave</b>
          <p class="muted" style="margin-top:6px">${UI.esc(l.tip)}</p>
        </div>
        <button class="btn primary block" style="margin-top:16px" data-modal-act="start">Empezar lección</button>
      </div>`, {
      start: () => {
        App.closeModal();
        Lesson.start({ title: l.title, lessonId: l.id, exercises: UI.shuffle(l.ex), mode: 'lesson' });
      }
    });
  }

  return { render, openLesson };
})();

/* ============================== PRÁCTICA ============================== */
const Practice = (() => {
  const donePool = () => {
    const ids = Object.keys(Store.s.lessons);
    const pool = CONTENT.allExercises.filter(e => ids.includes(e.lessonId));
    return pool.length ? pool : CONTENT.units[0].lessons.flatMap(l => l.ex);
  };

  function smart(n = 15) {
    return donePool().slice()
      .sort((a, b) => Store.weakness(b.id) - Store.weakness(a.id))
      .slice(0, n * 2)
      .sort(() => Math.random() - .5)
      .slice(0, n);
  }
  const failed = () => CONTENT.allExercises.filter(e => (Store.s.seen[e.id] || {}).w > 0);

  function render() {
    const nFail = failed().length;
    const seen = Object.keys(Store.s.seen).length;
    const root = UI.$('#screen');
    root.className = 'screen';
    root.innerHTML = `
      <h1 style="margin:8px 0 4px">Práctica</h1>
      <p class="muted">Refuerza lo que peor llevas. En modo práctica no pierdes vidas.</p>

      <div class="grid two" style="margin-top:18px">
        <div class="card">
          <h3>🧠 Repaso inteligente</h3>
          <p class="muted" style="margin:8px 0 14px">15 ejercicios elegidos según tus fallos y el tiempo transcurrido.</p>
          <button class="btn primary block" data-act="smart">Empezar repaso</button>
        </div>
        <div class="card">
          <h3>🔁 Mis errores</h3>
          <p class="muted" style="margin:8px 0 14px">${nFail ? `Tienes ${nFail} ejercicio(s) que has fallado alguna vez.` : 'Aún no has fallado nada. ¡Sigue así!'}</p>
          <button class="btn info block" data-act="fails" ${nFail ? '' : 'disabled'}>Repasar errores</button>
        </div>
      </div>

      <div class="section-title">Practicar por unidad</div>
      <div class="grid two">
        ${CONTENT.units.map(u => `
          <button class="card" style="text-align:left;border-left:6px solid ${u.color}" data-act="unit" data-id="${u.id}">
            <b>${u.icon} Unidad ${u.num}: ${UI.esc(u.title)}</b>
            <p class="muted" style="margin-top:6px">${u.lessons.reduce((a, l) => a + l.ex.length, 0)} ejercicios · ${u.weight} % del examen</p>
          </button>`).join('')}
      </div>

      <div class="section-title">Fichas rápidas</div>
      <div class="card">
        <p class="muted">Repasa definiciones clave sin presión: pulsa para ver la explicación.</p>
        <button class="btn block" style="margin-top:12px" data-act="cards">Abrir fichas de servicios</button>
      </div>

      <p class="muted" style="margin-top:22px;text-align:center">Has visto ${seen} de ${CONTENT.allExercises.length} ejercicios del temario.</p>`;

    UI.bind(root, {
      smart: () => Lesson.start({ title: 'Repaso inteligente', exercises: smart(15), mode: 'practice', useHearts: false }),
      fails: () => Lesson.start({ title: 'Repaso de errores', exercises: UI.shuffle(failed()).slice(0, 20), mode: 'practice', useHearts: false }),
      unit: el => {
        const u = CONTENT.unitById(el.dataset.id);
        Lesson.start({ title: 'Unidad ' + u.num, exercises: UI.shuffle(u.lessons.flatMap(l => l.ex)).slice(0, 15), mode: 'practice', useHearts: false });
      },
      cards: () => cards()
    });
  }

  /* Fichas: pares de emparejamiento convertidos en tarjetas */
  function cards() {
    const pairs = CONTENT.allExercises.filter(e => e.t === 'match').flatMap(e => e.pairs);
    const deck = UI.shuffle(pairs);
    let i = 0, shown = false;
    const root = UI.$('#screen');
    const paint = () => {
      const [a, b] = deck[i];
      root.innerHTML = `
        <div class="lesson-top" style="padding-left:0;padding-right:0">
          <button class="icon-btn" data-act="back">✕</button>
          <div class="pbar blue"><i style="width:${Math.round((i / deck.length) * 100)}%"></i></div>
          <span class="muted">${i + 1}/${deck.length}</span>
        </div>
        <div class="card" style="min-height:210px;display:grid;place-items:center;text-align:center;margin-top:20px" data-act="flip">
          <div>
            <div class="q-kind">${shown ? 'Definición' : 'Concepto'}</div>
            <h2 style="font-size:22px;line-height:1.4">${UI.esc(shown ? b : a)}</h2>
            ${shown ? '' : '<p class="muted" style="margin-top:14px">Pulsa para revelar</p>'}
          </div>
        </div>
        <div class="grid two" style="margin-top:16px">
          <button class="btn block" data-act="prev">◀ Anterior</button>
          <button class="btn info block" data-act="nextc">Siguiente ▶</button>
        </div>`;
    };
    root.className = 'screen';
    UI.bind(root, {
      flip: () => { shown = !shown; Sfx.tap(); paint(); },
      nextc: () => { i = (i + 1) % deck.length; shown = false; paint(); },
      prev: () => { i = (i - 1 + deck.length) % deck.length; shown = false; paint(); },
      back: () => App.go('practice')
    });
    paint();
  }

  return { render };
})();

/* =============================== EXAMEN =============================== */
const Exam = (() => {
  let E = null, tick = null;

  /* Baraja las opciones de una pregunta y recalcula los índices correctos */
  function shuffleOptions(q) {
    const order = UI.shuffle(q.o.map((_, i) => i));
    const correct = new Set(Array.isArray(q.a) ? q.a : [q.a]);
    const a = [];
    const o = order.map((orig, pos) => { if (correct.has(orig)) a.push(pos); return q.o[orig]; });
    return Object.assign({}, q, { o, a: q.multi ? a.sort((x, y) => x - y) : a[0] });
  }

  function pick() {
    const out = [];
    Object.entries(EXAM_CONFIG.mix).forEach(([d, n]) => {
      out.push(...UI.sample(EXAM_BANK.filter(q => q.d === +d), n));
    });
    return UI.shuffle(out).map(shuffleOptions);
  }

  function intro() {
    const hist = Store.s.exams;
    const root = UI.$('#screen');
    root.className = 'screen';
    root.innerHTML = `
      <h1 style="margin:8px 0 4px">Simulacro de examen</h1>
      <p class="muted">Reproduce las condiciones reales del AWS Certified Cloud Practitioner.</p>

      <div class="grid three" style="margin-top:18px">
        <div class="card kpi"><b>${EXAM_CONFIG.total}</b><span>Preguntas</span></div>
        <div class="card kpi"><b>${EXAM_CONFIG.minutes}<small style="font-size:14px"> min</small></b><span>Duración</span></div>
        <div class="card kpi"><b>${EXAM_CONFIG.passScore}%</b><span>Para aprobar</span></div>
      </div>

      <div class="card" style="margin-top:14px">
        <b>Cómo funciona</b>
        <p class="muted" style="margin-top:8px;line-height:1.6">
          · Las preguntas se reparten según el peso real de cada dominio.<br>
          · Puedes marcar preguntas para revisarlas y navegar libremente.<br>
          · Las preguntas de varias respuestas lo indican expresamente.<br>
          · Al terminar verás la corrección y el desglose por dominio.
        </p>
      </div>

      <div class="grid two" style="margin-top:14px">
        <button class="btn primary block" data-act="full">Examen completo (${EXAM_CONFIG.total} preguntas)</button>
        <button class="btn info block" data-act="mini">Mini test (20 preguntas, 25 min)</button>
      </div>

      ${hist.length ? `<div class="section-title">Historial</div>
        <div class="card">
          ${hist.map(h => `<div class="list-row">
            <span>${new Date(h.ts).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
            <span class="muted">${h.correct}/${h.total}</span>
            <span class="g" style="color:${h.pct >= 70 ? 'var(--green)' : 'var(--red)'}">${h.pct}% ${h.pct >= 70 ? '✅' : '❌'}</span>
          </div>`).join('')}
        </div>` : ''}`;

    UI.bind(root, {
      full: () => start(pick(), EXAM_CONFIG.minutes),
      mini: () => start(UI.sample(EXAM_BANK, 20).map(shuffleOptions), 25)
    });
  }

  function start(qs, minutes) {
    Sfx.unlockCtx();
    E = { qs, i: 0, ans: {}, flags: new Set(), end: Date.now() + minutes * 60000, minutes };
    UI.$('#topbar').hidden = true; UI.$('#nav').hidden = true;
    clearInterval(tick);
    tick = setInterval(() => {
      const left = E.end - Date.now();
      const el = document.getElementById('timer');
      if (el) { el.textContent = UI.mmss(left); el.classList.toggle('warn', left < 5 * 60000); }
      if (left <= 0) { clearInterval(tick); UI.toast('Se acabó el tiempo'); grade(); }
    }, 1000);
    paint();
  }

  function paint() {
    const q = E.qs[E.i];
    const chosen = E.ans[E.i] || [];
    const root = UI.$('#screen');
    root.className = 'screen full';
    root.innerHTML = `
      <div class="lesson-top" style="padding-left:0;padding-right:0">
        <button class="icon-btn" data-act="quit">✕</button>
        <div class="pbar blue"><i style="width:${Math.round(((E.i + 1) / E.qs.length) * 100)}%"></i></div>
        <span class="timer" id="timer">${UI.mmss(E.end - Date.now())}</span>
      </div>

      <div style="display:flex;align-items:center;gap:10px;margin:14px 0 6px;flex-wrap:wrap">
        <span class="badge">Pregunta ${E.i + 1} de ${E.qs.length}</span>
        <span class="badge">${DOMAIN_NAMES[q.d]}</span>
        <button class="btn sm ${E.flags.has(E.i) ? 'info' : ''}" data-act="flag" style="margin-left:auto">
          ${E.flags.has(E.i) ? '🚩 Marcada' : '⚐ Marcar'}
        </button>
      </div>

      <h2 class="q-title">${UI.esc(q.q)}</h2>
      ${q.multi ? '<p class="q-note">Selecciona todas las respuestas correctas.</p>' : ''}
      <div class="opts">
        ${q.o.map((o, i) => `<button class="opt ${chosen.includes(i) ? 'sel' : ''}" data-act="opt" data-i="${i}">
            <span class="k">${['A', 'B', 'C', 'D', 'E'][i]}</span><span>${UI.esc(o)}</span></button>`).join('')}
      </div>

      <div style="display:flex;gap:10px;margin:20px 0 6px">
        <button class="btn" data-act="prev" ${E.i === 0 ? 'disabled' : ''}>◀ Anterior</button>
        <button class="btn info" style="flex:1" data-act="next">${E.i === E.qs.length - 1 ? 'Ir al resumen' : 'Siguiente ▶'}</button>
      </div>

      <div class="section-title">Navegación</div>
      <div class="exam-grid">
        ${E.qs.map((_, i) => `<button data-act="jump" data-i="${i}"
          class="${E.flags.has(i) ? 'flag' : (E.ans[i] && E.ans[i].length ? 'ans' : '')} ${i === E.i ? 'cur' : ''}">${i + 1}</button>`).join('')}
      </div>
      <button class="btn danger block" style="margin-top:16px" data-act="submit">Terminar y corregir</button>`;

    UI.bind(root, {
      opt: el => {
        const i = +el.dataset.i;
        const cur = E.ans[E.i] || [];
        if (q.multi) E.ans[E.i] = cur.includes(i) ? cur.filter(x => x !== i) : cur.concat(i);
        else E.ans[E.i] = [i];
        Sfx.tap(); paint();
      },
      flag: () => { E.flags.has(E.i) ? E.flags.delete(E.i) : E.flags.add(E.i); paint(); },
      next: () => { if (E.i < E.qs.length - 1) { E.i++; paint(); window.scrollTo(0, 0); } else summary(); },
      prev: () => { E.i--; paint(); window.scrollTo(0, 0); },
      jump: el => { E.i = +el.dataset.i; paint(); window.scrollTo(0, 0); },
      submit: () => summary(),
      quit: () => App.modal(`<h2>¿Abandonar el simulacro?</h2>
        <p class="muted" style="margin:10px 0 16px">Perderás las respuestas de este intento.</p>
        <button class="btn danger block" data-modal-act="yes">Salir</button>
        <button class="btn ghost block" style="margin-top:8px" data-modal-act="no">Seguir</button>`, {
        yes: () => { clearInterval(tick); App.closeModal(); App.go('exam'); },
        no: () => App.closeModal()
      })
    });
  }

  function summary() {
    const sinResponder = E.qs.map((_, i) => i).filter(i => !(E.ans[i] || []).length);
    App.modal(`
      <h2>Resumen antes de corregir</h2>
      <p class="muted" style="margin:10px 0">Respondidas: <b>${E.qs.length - sinResponder.length}/${E.qs.length}</b><br>
      Marcadas para revisar: <b>${E.flags.size}</b><br>
      ${sinResponder.length ? `Sin responder: <b style="color:var(--red)">${sinResponder.length}</b>` : 'Has respondido a todas 🎉'}</p>
      <button class="btn primary block" data-modal-act="grade">Corregir examen</button>
      <button class="btn ghost block" style="margin-top:8px" data-modal-act="back">Seguir revisando</button>`, {
      grade: () => { App.closeModal(); grade(); },
      back: () => App.closeModal()
    });
  }

  function grade() {
    clearInterval(tick);
    const byDom = {}; let correct = 0;
    E.qs.forEach((q, i) => {
      const want = (Array.isArray(q.a) ? q.a : [q.a]).slice().sort().join(',');
      const got = (E.ans[i] || []).slice().sort().join(',');
      const ok = want === got && got !== '';
      if (ok) correct++;
      byDom[q.d] = byDom[q.d] || { ok: 0, n: 0 };
      byDom[q.d].n++; if (ok) byDom[q.d].ok++;
      q._ok = ok; q._got = E.ans[i] || [];
    });
    const pct = Math.round((correct / E.qs.length) * 100);
    const passed = pct >= EXAM_CONFIG.passScore;

    Store.saveExam({ ts: Date.now(), correct, total: E.qs.length, pct, byDom });
    Store.addXp(Math.round(pct / 2));
    passed && Store.addGems(25);
    const nuevos = Achievements.check();
    passed ? Sfx.finish() : Sfx.fail();

    const root = UI.$('#screen');
    root.className = 'screen';
    root.innerHTML = `
      <div class="result">
        <div class="big">${passed ? '🎉' : '📚'}</div>
        <h1>${passed ? '¡Aprobado!' : 'Sigue practicando'}</h1>
        <p class="muted">${correct} de ${E.qs.length} correctas · se necesita un ${EXAM_CONFIG.passScore} %</p>
        <div style="font-size:52px;font-weight:900;color:${passed ? 'var(--green)' : 'var(--red)'};margin:10px 0">${pct}%</div>
        ${nuevos.length ? `<p class="badge">🏅 ${nuevos.map(a => UI.esc(a.title)).join(' · ')}</p>` : ''}
      </div>

      <div class="section-title">Resultado por dominio</div>
      <div class="card">
        ${Object.keys(DOMAIN_NAMES).map(d => {
          const r = byDom[d]; if (!r) return '';
          const p = Math.round((r.ok / r.n) * 100);
          return `<div style="margin-bottom:14px">
            <div style="display:flex;font-size:14px"><span>${DOMAIN_NAMES[d]}</span>
              <span class="g" style="margin-left:auto">${r.ok}/${r.n} · ${p}%</span></div>
            <div class="bar" style="margin-top:6px"><i class="${p >= 70 ? 'green' : 'red'}" style="width:${p}%"></i></div>
          </div>`;
        }).join('')}
      </div>

      <div class="section-title">Revisión de respuestas</div>
      ${E.qs.map((q, i) => `
        <div class="card" style="border-left:6px solid ${q._ok ? 'var(--green)' : 'var(--red)'}">
          <p style="font-size:14px">${i + 1}. ${UI.esc(q.q)}</p>
          <p class="muted" style="margin-top:8px">Tu respuesta: ${q._got.length ? q._got.map(x => UI.esc(q.o[x])).join(' · ') : '<i>sin responder</i>'}</p>
          <p style="margin-top:4px;font-size:14px;color:var(--green-d)">Correcta: ${(Array.isArray(q.a) ? q.a : [q.a]).map(x => UI.esc(q.o[x])).join(' · ')}</p>
          <p class="muted" style="margin-top:6px">💡 ${UI.esc(q.why)}</p>
        </div>`).join('')}

      <div class="grid two" style="margin-top:18px">
        <button class="btn primary block" data-act="again">Otro simulacro</button>
        <button class="btn block" data-act="home">Volver al camino</button>
      </div>`;

    UI.bind(root, { again: () => App.go('exam'), home: () => App.go('home') });
    window.scrollTo(0, 0);
  }

  return { render: intro, stop: () => clearInterval(tick) };
})();

/* =============================== PERFIL =============================== */
const Profile = (() => {
  function calendar() {
    const days = [];
    for (let i = 27; i >= 0; i--) {
      const d = new Date(); d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      days.push(`<div class="${Store.s.days.includes(key) ? 'on' : ''}" title="${key}">${d.getDate()}</div>`);
    }
    return `<div class="calendar">${days.join('')}</div>`;
  }

  function render() {
    Store.rollDay();
    const s = Store.s;
    const lv = Level.progress(s.xp);
    const done = Object.keys(s.lessons).length;
    const perfect = Object.values(s.lessons).filter(l => l.stars === 3).length;
    const best = s.exams.length ? Math.max(...s.exams.map(e => e.pct)) : null;
    const seen = Object.values(s.seen);
    const acc = seen.length
      ? Math.round(seen.reduce((a, r) => a + r.c, 0) / Math.max(1, seen.reduce((a, r) => a + r.c + r.w, 0)) * 100) : 0;

    const root = UI.$('#screen');
    root.className = 'screen';
    root.innerHTML = `
      <div class="card" style="display:flex;gap:16px;align-items:center;flex-wrap:wrap">
        <div class="ring" style="--p:${lv.pct};background:conic-gradient(var(--yellow) calc(var(--p)*1%), var(--line) 0)">
          <i style="background:var(--card);color:var(--text)">Lv ${lv.level}</i>
        </div>
        <div style="flex:1;min-width:180px">
          <h2>Tu progreso</h2>
          <p class="muted" style="margin-top:4px">${s.xp} XP · faltan ${lv.next} XP para el nivel ${lv.level + 1}</p>
          <div class="bar" style="margin-top:8px"><i style="width:${lv.pct}%"></i></div>
        </div>
      </div>

      <div class="grid three" style="margin-top:12px">
        <div class="card kpi"><b>🔥 ${s.streak}</b><span>Racha</span></div>
        <div class="card kpi"><b>⭐ ${s.xp}</b><span>XP total</span></div>
        <div class="card kpi"><b>💎 ${s.gems}</b><span>Gemas</span></div>
        <div class="card kpi"><b>${done}/${CONTENT.allLessons.length}</b><span>Lecciones</span></div>
        <div class="card kpi"><b>${perfect}</b><span>Perfectas</span></div>
        <div class="card kpi"><b>${acc}%</b><span>Aciertos</span></div>
      </div>

      <div class="section-title">Actividad de los últimos 28 días</div>
      <div class="card">${calendar()}
        <p class="muted" style="margin-top:12px">Meta diaria: ${s.dailyGoal} XP · hoy llevas ${s.todayXp} XP</p>
      </div>

      <div class="section-title">Dominio del temario</div>
      <div class="card">
        ${CONTENT.units.map(u => {
          const d = u.lessons.filter(l => Store.isDone(l.id)).length;
          const p = Math.round((d / u.lessons.length) * 100);
          return `<div style="margin-bottom:14px">
            <div style="display:flex;font-size:14px"><span>${u.icon} ${UI.esc(u.title)}</span>
            <span class="g" style="margin-left:auto">${d}/${u.lessons.length}</span></div>
            <div class="bar" style="margin-top:6px"><i style="width:${p}%;background:${u.color}"></i></div>
          </div>`;
        }).join('')}
      </div>

      ${best !== null ? `<div class="section-title">Simulacros</div>
      <div class="card">
        <div class="list-row"><span>Mejor resultado</span><span class="g" style="color:${best >= 70 ? 'var(--green)' : 'var(--red)'}">${best}%</span></div>
        <div class="list-row"><span>Intentos</span><span class="g">${s.exams.length}</span></div>
      </div>` : ''}

      <div class="section-title">Logros (${s.achievements.length}/${Achievements.list.length})</div>
      <div class="grid two">
        ${Achievements.list.map(a => {
          const on = s.achievements.includes(a.id);
          return `<div class="card ach ${on ? 'on' : ''}">
            <div class="m">${a.icon}</div>
            <div><b>${UI.esc(a.title)}</b><p class="muted" style="margin-top:2px;font-size:13px">${UI.esc(a.desc)}</p></div>
          </div>`;
        }).join('')}
      </div>

      <div class="section-title">Ajustes</div>
      <div class="card">
        <div class="list-row"><span>🎨 Tema</span>
          <select class="btn sm g" id="theme" style="text-transform:none">
            <option value="auto" ${s.theme === 'auto' ? 'selected' : ''}>Automático</option>
            <option value="light" ${s.theme === 'light' ? 'selected' : ''}>Claro</option>
            <option value="dark" ${s.theme === 'dark' ? 'selected' : ''}>Oscuro</option>
          </select></div>
        <div class="list-row"><span>🔊 Sonidos</span>
          <button class="btn sm g" data-act="sound">${s.sound ? 'Activados' : 'Desactivados'}</button></div>
        <div class="list-row"><span>🎯 Meta diaria</span>
          <select class="btn sm g" id="goal" style="text-transform:none">
            ${[20, 50, 100, 200].map(v => `<option value="${v}" ${s.dailyGoal === v ? 'selected' : ''}>${v} XP</option>`).join('')}
          </select></div>
        <div class="list-row"><span>🔓 Navegación libre<br><small class="muted">Acceder a cualquier lección sin desbloquear</small></span>
          <button class="btn sm g" data-act="free">${s.freeNav ? 'Sí' : 'No'}</button></div>
        <div class="list-row"><span>❤️ Recargar vidas</span>
          <button class="btn sm g info" data-act="refill">${Store.REFILL_COST} 💎</button></div>
      </div>

      <button class="btn danger block" style="margin-top:16px" data-act="reset">Borrar todo mi progreso</button>
      <p class="muted" style="text-align:center;margin:14px 0 0;font-size:12px">
        Contenido de estudio no oficial. AWS y AWS Certified Cloud Practitioner son marcas de Amazon Web Services, Inc.
      </p>`;

    UI.$('#theme').onchange = e => { Store.s.theme = e.target.value; Store.save(); UI.applyTheme(); };
    UI.$('#goal').onchange = e => { Store.s.dailyGoal = +e.target.value; Store.save(); };

    UI.bind(root, {
      sound: () => { Store.s.sound = !Store.s.sound; Store.save(); render(); },
      free: () => { Store.s.freeNav = !Store.s.freeNav; Store.save(); render(); UI.toast(Store.s.freeNav ? 'Todas las lecciones desbloqueadas' : 'Camino secuencial activado'); },
      refill: () => {
        if (Store.refillHearts(false)) { UI.toast('Vidas recargadas ❤️'); App.paintTop(); render(); }
        else UI.toast('Necesitas ' + Store.REFILL_COST + ' gemas');
      },
      reset: () => App.modal(`<h2>¿Borrar todo tu progreso?</h2>
        <p class="muted" style="margin:10px 0 16px">Se eliminarán XP, racha, lecciones y simulacros. Esta acción no se puede deshacer.</p>
        <button class="btn danger block" data-modal-act="yes">Sí, borrar todo</button>
        <button class="btn ghost block" style="margin-top:8px" data-modal-act="no">Cancelar</button>`, {
        yes: () => { Store.reset(); App.closeModal(); UI.applyTheme(); App.go('home'); UI.toast('Progreso reiniciado'); },
        no: () => App.closeModal()
      })
    });
  }
  return { render };
})();
