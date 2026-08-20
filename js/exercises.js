/* =====================================================================
   Renderizado y corrección de cada tipo de ejercicio.
   Cada constructor devuelve: { ready, grade(), solutionText, onDone? }
   ===================================================================== */
const Exercises = (() => {
  const esc = UI.esc;
  const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

  const KIND_LABEL = {
    choice: 'Elige la respuesta correcta',
    multi: 'Selecciona TODAS las correctas',
    tf: '¿Verdadero o falso?',
    match: 'Empareja los pares',
    fill: 'Completa los huecos',
    cat: 'Clasifica cada elemento'
  };

  /* ---------------------------------------------------------------- */
  function opciones(ex) {
    // Baraja opciones manteniendo la pista de las respuestas correctas
    const idx = ex.o.map((_, i) => i);
    const order = UI.shuffle(idx);
    const correct = new Set(Array.isArray(ex.a) ? ex.a : [ex.a]);
    return order.map((orig, pos) => ({ pos, orig, text: ex.o[orig], ok: correct.has(orig) }));
  }

  /* ------------------------------ CHOICE / MULTI / TF -------------- */
  function buildChoice(ex, root, onChange) {
    const multi = ex.t === 'multi';
    const items = ex.t === 'tf'
      ? UI.shuffle([{ text: 'Verdadero', ok: ex.a === true }, { text: 'Falso', ok: ex.a === false }])
      : opciones(ex);

    root.innerHTML = `<div class="opts">` + items.map((it, i) =>
      `<button class="opt" data-i="${i}"><span class="k">${LETTERS[i]}</span><span>${esc(it.text)}</span></button>`
    ).join('') + `</div>`;

    const sel = new Set();
    root.querySelectorAll('.opt').forEach(btn => btn.addEventListener('click', () => {
      const i = +btn.dataset.i;
      if (multi) { sel.has(i) ? sel.delete(i) : sel.add(i); }
      else { sel.clear(); sel.add(i); }
      root.querySelectorAll('.opt').forEach(b => b.classList.toggle('sel', sel.has(+b.dataset.i)));
      Sfx.tap(); onChange();
    }));

    return {
      get ready() { return sel.size > 0; },
      grade() {
        const ok = items.every((it, i) => it.ok === sel.has(i));
        root.querySelectorAll('.opt').forEach(b => {
          const i = +b.dataset.i;
          b.classList.remove('sel'); b.classList.add('dis');
          if (items[i].ok) b.classList.add('ok');
          else if (sel.has(i)) b.classList.add('bad');
        });
        return ok;
      },
      solutionText: items.filter(i => i.ok).map(i => i.text).join(' · ')
    };
  }

  /* ------------------------------ MATCH ---------------------------- */
  function buildMatch(ex, root, onChange, onDone) {
    const left = UI.shuffle(ex.pairs.map((p, i) => ({ i, text: p[0] })));
    const right = UI.shuffle(ex.pairs.map((p, i) => ({ i, text: p[1] })));
    root.innerHTML = `<div class="match">
      <div class="col">${left.map(o => `<button class="chip" data-side="l" data-i="${o.i}">${esc(o.text)}</button>`).join('')}</div>
      <div class="col">${right.map(o => `<button class="chip" data-side="r" data-i="${o.i}">${esc(o.text)}</button>`).join('')}</div>
    </div>`;

    let pick = null, solved = 0, errors = 0, done = false;
    root.querySelectorAll('.chip').forEach(btn => btn.addEventListener('click', () => {
      if (done || btn.classList.contains('gone')) return;
      if (!pick) {
        root.querySelectorAll('.chip').forEach(c => c.classList.remove('sel'));
        pick = btn; btn.classList.add('sel'); Sfx.tap(); return;
      }
      if (pick === btn) { pick.classList.remove('sel'); pick = null; return; }
      if (pick.dataset.side === btn.dataset.side) {           // cambiar la selección del mismo lado
        pick.classList.remove('sel'); pick = btn; btn.classList.add('sel'); Sfx.tap(); return;
      }
      const a = pick, b = btn; pick = null;
      a.classList.remove('sel');
      if (a.dataset.i === b.dataset.i) {
        [a, b].forEach(c => { c.classList.add('ok'); setTimeout(() => c.classList.add('gone'), 320); });
        solved++; Sfx.correct();
        if (solved === ex.pairs.length) { done = true; onChange(); onDone && onDone(); }
      } else {
        errors++; Sfx.wrong();
        [a, b].forEach(c => { c.classList.add('bad'); setTimeout(() => c.classList.remove('bad'), 480); });
        onChange();
      }
    }));

    return {
      get ready() { return done; },
      grade() { return errors === 0; },
      auto: true,
      solutionText: ex.pairs.map(p => p[0] + ' → ' + p[1]).join(' · ')
    };
  }

  /* ------------------------------ FILL ----------------------------- */
  function buildFill(ex, root, onChange) {
    const parts = ex.s.split('___');
    const nBlanks = parts.length - 1;
    const filled = new Array(nBlanks).fill(null);
    const bank = UI.shuffle(ex.bank.map((w, i) => ({ i, w })));

    const paint = () => {
      root.querySelector('.fill-sentence').innerHTML = parts.map((p, i) =>
        esc(p) + (i < nBlanks
          ? `<span class="blank${filled[i] !== null ? ' filled' : ''}" data-blank="${i}">${filled[i] !== null ? esc(bank[filled[i]].w) : '&nbsp;'}</span>`
          : '')).join('');
      root.querySelectorAll('.bank .chip').forEach(c => c.classList.toggle('gone', filled.includes(+c.dataset.b)));
    };

    root.innerHTML = `<div class="fill-sentence"></div>
      <div class="bank">${bank.map((o, i) => `<button class="chip" data-b="${i}">${esc(o.w)}</button>`).join('')}</div>`;

    root.addEventListener('click', e => {
      const chip = e.target.closest('.bank .chip');
      const blank = e.target.closest('.blank');
      if (chip && !chip.classList.contains('gone')) {
        const slot = filled.indexOf(null);
        if (slot === -1) return;
        filled[slot] = +chip.dataset.b; Sfx.tap(); paint(); onChange();
      } else if (blank) {
        const i = +blank.dataset.blank;
        if (filled[i] !== null) { filled[i] = null; Sfx.tap(); paint(); onChange(); }
      }
    });
    paint();

    return {
      get ready() { return filled.every(v => v !== null); },
      grade() {
        const ok = filled.every((v, i) => v !== null && bank[v].w === ex.a[i]);
        root.querySelectorAll('.blank').forEach((el, i) => {
          const good = filled[i] !== null && bank[filled[i]].w === ex.a[i];
          el.style.borderColor = good ? 'var(--green)' : 'var(--red)';
          el.style.color = good ? 'var(--green-d)' : 'var(--red-d)';
        });
        root.querySelectorAll('.bank .chip').forEach(c => c.style.pointerEvents = 'none');
        return ok;
      },
      solutionText: ex.a.join(' / ')
    };
  }

  /* ------------------------------ CAT ------------------------------ */
  function buildCat(ex, root, onChange) {
    const items = UI.shuffle(ex.items.map((it, i) => ({ i, text: it[0], bucket: it[1] })));
    const placed = new Array(items.length).fill(-1);   // -1 = sin colocar
    let pick = null;

    const paint = () => {
      root.querySelector('.buckets').innerHTML = ex.buckets.map((b, bi) =>
        `<div class="bucket" data-bucket="${bi}"><h4>${esc(b)}</h4>` +
        items.map((it, i) => placed[i] === bi
          ? `<button class="chip" data-item="${i}">${esc(it.text)}</button>` : '').join('') +
        `</div>`).join('');
      root.querySelector('.bank').innerHTML = items.map((it, i) => placed[i] === -1
        ? `<button class="chip${pick === i ? ' sel' : ''}" data-item="${i}">${esc(it.text)}</button>` : '').join('')
        || '<span class="muted">Todo colocado — pulsa Comprobar</span>';
    };

    root.innerHTML = `<div class="buckets"></div><div class="bank"></div>`;
    root.addEventListener('click', e => {
      const chip = e.target.closest('.chip[data-item]');
      const bucket = e.target.closest('.bucket');
      if (chip) {
        const i = +chip.dataset.item;
        if (placed[i] !== -1) { placed[i] = -1; pick = null; }      // devolver al banco
        else pick = (pick === i ? null : i);
        Sfx.tap(); paint(); onChange(); return;
      }
      if (bucket && pick !== null) {
        placed[pick] = +bucket.dataset.bucket; pick = null;
        Sfx.tap(); paint(); onChange();
      }
    });
    paint();

    return {
      get ready() { return placed.every(v => v !== -1); },
      grade() {
        const ok = items.every((it, i) => placed[i] === it.bucket);
        root.querySelectorAll('.bucket .chip').forEach(c => {
          const i = +c.dataset.item;
          c.classList.add(placed[i] === items[i].bucket ? 'ok' : 'bad');
          c.style.pointerEvents = 'none';
        });
        return ok;
      },
      solutionText: ex.buckets.map((b, bi) =>
        b + ': ' + items.filter(it => it.bucket === bi).map(it => it.text).join(', ')).join(' | ')
    };
  }

  /* ---------------------------------------------------------------- */
  function build(ex, root, onChange, onDone) {
    switch (ex.t) {
      case 'match': return buildMatch(ex, root, onChange, onDone);
      case 'fill':  return buildFill(ex, root, onChange);
      case 'cat':   return buildCat(ex, root, onChange);
      default:      return buildChoice(ex, root, onChange);
    }
  }

  const title = ex => ex.t === 'tf' ? ex.q : (ex.q || '');
  const kindLabel = ex => KIND_LABEL[ex.t] || '';

  return { build, title, kindLabel };
})();
