/* ================= Estado persistente (localStorage) ================= */
const Store = (() => {
  const KEY = 'cloudlingo.v1';
  const MAX_HEARTS = 5;
  const HEART_MS = 15 * 60 * 1000;      // 1 vida cada 15 min
  const REFILL_COST = 60;               // gemas para recargar vidas

  const today = () => new Date().toISOString().slice(0, 10);
  const dayDiff = (a, b) => Math.round((Date.parse(b) - Date.parse(a)) / 86400000);

  const base = () => ({
    v: 1,
    xp: 0, gems: 100,
    hearts: MAX_HEARTS, heartTs: Date.now(),
    streak: 0, lastDay: null, days: [],
    dailyGoal: 50, todayXp: 0, todayDate: today(),
    lessons: {}, seen: {}, achievements: [], exams: [],
    theme: 'auto', sound: true, createdAt: Date.now()
  });

  let s;
  try { s = Object.assign(base(), JSON.parse(localStorage.getItem(KEY) || '{}')); }
  catch (e) { s = base(); }

  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) {} };

  /* ---- vidas ---- */
  function syncHearts() {
    if (s.hearts >= MAX_HEARTS) { s.heartTs = Date.now(); return; }
    const gained = Math.floor((Date.now() - s.heartTs) / HEART_MS);
    if (gained > 0) {
      s.hearts = Math.min(MAX_HEARTS, s.hearts + gained);
      s.heartTs = s.hearts >= MAX_HEARTS ? Date.now() : s.heartTs + gained * HEART_MS;
      save();
    }
  }
  function loseHeart() { syncHearts(); if (s.hearts === MAX_HEARTS) s.heartTs = Date.now(); s.hearts = Math.max(0, s.hearts - 1); save(); }
  function refillHearts(free) {
    syncHearts();
    if (!free) { if (s.gems < REFILL_COST) return false; s.gems -= REFILL_COST; }
    s.hearts = MAX_HEARTS; s.heartTs = Date.now(); save(); return true;
  }
  function heartEtaMs() { syncHearts(); return s.hearts >= MAX_HEARTS ? 0 : HEART_MS - ((Date.now() - s.heartTs) % HEART_MS); }

  /* ---- racha / día ---- */
  function rollDay() {
    const t = today();
    if (s.todayDate !== t) { s.todayDate = t; s.todayXp = 0; }
    if (s.lastDay && dayDiff(s.lastDay, t) > 1) s.streak = 0;   // racha rota
    save();
  }
  function markActivity() {
    const t = today();
    if (s.lastDay !== t) {
      const d = s.lastDay ? dayDiff(s.lastDay, t) : 99;
      s.streak = d === 1 ? s.streak + 1 : 1;
      s.lastDay = t;
      if (!s.days.includes(t)) s.days.push(t);
      s.days = s.days.slice(-400);
    }
    save();
  }

  /* ---- economía ---- */
  function addXp(n) { rollDay(); s.xp += n; s.todayXp += n; markActivity(); save(); }
  function addGems(n) { s.gems += n; save(); }

  /* ---- progreso de lecciones ---- */
  function lesson(id) { return s.lessons[id] || { stars: 0, best: 0, plays: 0 }; }
  function saveLesson(id, accuracy) {
    const cur = lesson(id);
    const stars = accuracy === 100 ? 3 : accuracy >= 80 ? 2 : 1;
    s.lessons[id] = {
      stars: Math.max(cur.stars, stars),
      best: Math.max(cur.best, accuracy),
      plays: (cur.plays || 0) + 1,
      ts: Date.now()
    };
    save();
  }
  const isDone = id => !!s.lessons[id];

  /* ---- memoria por ejercicio (para repaso inteligente) ---- */
  function track(exId, ok) {
    const r = s.seen[exId] || { c: 0, w: 0 };
    ok ? r.c++ : r.w++;
    r.last = Date.now();
    s.seen[exId] = r; save();
  }
  function weakness(exId) {
    const r = s.seen[exId];
    if (!r) return 1;                                   // nunca visto → prioridad media-alta
    const ratio = r.w / Math.max(1, r.c + r.w);
    const ageDays = (Date.now() - (r.last || 0)) / 86400000;
    return ratio * 2 + Math.min(ageDays / 7, 1) - (r.c > 2 ? .6 : 0);
  }

  /* ---- exámenes ---- */
  function saveExam(rec) { s.exams.unshift(rec); s.exams = s.exams.slice(0, 20); save(); }

  /* ---- logros ---- */
  function unlock(id) {
    if (s.achievements.includes(id)) return false;
    s.achievements.push(id); addGems(20); save(); return true;
  }

  function reset() { s = base(); save(); }

  return {
    get s() { return s; }, save, reset,
    MAX_HEARTS, REFILL_COST, HEART_MS,
    syncHearts, loseHeart, refillHearts, heartEtaMs,
    rollDay, markActivity, addXp, addGems,
    lesson, saveLesson, isDone, track, weakness, saveExam, unlock,
    today, dayDiff
  };
})();
