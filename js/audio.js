/* ================= Sonidos sintetizados (sin assets) ================= */
const Sfx = (() => {
  let ctx = null;
  const on = () => Store.s.sound;
  function ac() {
    if (!ctx) { const C = window.AudioContext || window.webkitAudioContext; if (C) ctx = new C(); }
    if (ctx && ctx.state === 'suspended') ctx.resume();
    return ctx;
  }
  function tone(freq, start, dur, type = 'sine', vol = .18) {
    const a = ac(); if (!a) return;
    const o = a.createOscillator(), g = a.createGain();
    o.type = type; o.frequency.value = freq;
    const t = a.currentTime + start;
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(vol, t + .015);
    g.gain.exponentialRampToValueAtTime(.0001, t + dur);
    o.connect(g); g.connect(a.destination); o.start(t); o.stop(t + dur + .05);
  }
  return {
    correct() { if (!on()) return; tone(660, 0, .18, 'triangle'); tone(880, .09, .22, 'triangle'); },
    wrong()   { if (!on()) return; tone(200, 0, .22, 'sawtooth', .12); tone(150, .1, .25, 'sawtooth', .1); },
    tap()     { if (!on()) return; tone(520, 0, .06, 'sine', .07); },
    finish()  { if (!on()) return; [523, 659, 784, 1046].forEach((f, i) => tone(f, i * .1, .32, 'triangle', .16)); },
    fail()    { if (!on()) return; [392, 330, 262].forEach((f, i) => tone(f, i * .14, .3, 'sine', .14)); },
    unlockCtx: ac
  };
})();
