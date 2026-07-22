// Amber site behaviors: scroll reveals, photo fallbacks, light-language demo.

// Scroll reveal (disabled visually via CSS under prefers-reduced-motion)
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.12 });
function initReveals(){ document.querySelectorAll('.rev').forEach(el => io.observe(el)); }

// Entry splash: word fades in, fades out to empty screen, THEN the page fades in
(function(){
  const splash = document.getElementById('splash');
  const word = splash && splash.querySelector('.splash-word');
  if (!splash) { initReveals(); return; }   // other pages: reveal immediately
  document.body.classList.add('splashing');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hold = reduced ? 700 : 1700, wordOut = reduced ? 0 : 550, empty = reduced ? 0 : 320;
  const finish = () => {
    // word already gone; drop the (white) overlay and start the page fade-in
    document.body.classList.remove('splashing');
    splash.remove();
    initReveals();
  };
  setTimeout(() => {
    if (word && !reduced){
      word.style.transition = 'opacity .5s ease-out, transform .5s ease-out';
      word.style.opacity = '0'; word.style.transform = 'translateY(-6px)';
    }
    setTimeout(finish, wordOut + empty);
  }, hold);
  splash.addEventListener('click', finish);
})();

// Photo slots: mark empty if the image is missing so the placeholder shows
document.querySelectorAll('.ph img').forEach(img => {
  const mark = () => { img.closest('.ph').classList.add('empty'); img.remove(); };
  if (img.complete && img.naturalWidth === 0) mark();
  else img.addEventListener('error', mark);
});

// Light-language demo (present on How It Works)
const pendantDemo = document.querySelector('[data-demo="pendant"]');
if (pendantDemo) {
  const cap = document.getElementById('statecap');
  const caps = {
    idle: "<strong>Idle.</strong> Amber cannot hear you. Hold it to begin.",
    listening: "<strong>Listening.</strong> Amber light fills the glass and pulses, only while your fingers hold it.",
    thinking: "<strong>Thinking.</strong> A thin ring of amber circles the rim.",
    speaking: "<strong>Speaking.</strong> The rim glows in rhythm with each word, so you can see who's talking.",
    open: "<strong>Standby mode.</strong> A low amber wash across the glass, listening for the wake word, visible to everyone in the room.",
    muted: "<strong>Muted.</strong> Ring twisted, notch misaligned, glass white. The microphones are physically disconnected."
  };
  const order = ['idle','listening','thinking','speaking','open','muted'];
  const buttons = Array.from(document.querySelectorAll('.statebar button'));
  const setState = (s) => {
    pendantDemo.dataset.state = s;
    pendantDemo.classList.toggle('muted', s === 'muted');
    if (cap) cap.innerHTML = caps[s];
    buttons.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.state === s)));
  };

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let timer = null, idx = 0, paused = false;
  const step = () => {
    idx = (idx + 1) % order.length;
    setState(order[idx]);
  };
  const startAuto = () => {
    if (reduced || timer) return;
    timer = setInterval(() => { if (!paused) step(); }, 2600);
  };
  const stopAuto = () => { clearInterval(timer); timer = null; };

  // manual pick: jump to it, pause the cycle briefly, then resume
  let resume = null;
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      idx = order.indexOf(btn.dataset.state);
      setState(btn.dataset.state);
      paused = true;
      clearTimeout(resume);
      resume = setTimeout(() => { paused = false; }, 6000);
    });
  });

  // only run while the demo is on screen
  const demoObs = new IntersectionObserver((entries) => {
    entries[0].isIntersecting ? startAuto() : stopAuto();
  }, { threshold: 0.3 });
  demoObs.observe(pendantDemo);
}

// Reserve buttons: concept site, acknowledge politely
document.querySelectorAll('[data-reserve]').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const prev = btn.textContent;
    btn.textContent = "You're on the list.";
    setTimeout(() => { btn.textContent = prev; }, 2200);
  });
});

// Nav: hide on scroll down (below the fold), reappear on scroll up
const navEl = document.querySelector('.nav');
if (navEl) {
  let lastY = window.scrollY;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (Math.abs(y - lastY) < 6) return;
    if (y > lastY && y > window.innerHeight * 0.8) navEl.classList.add('hide');
    else if (y < lastY) navEl.classList.remove('hide');
    lastY = y;
  }, { passive: true });
}

// Companion app: focus one screen at a time (center by default), shift on hover/tap
const appgrid = document.querySelector('.appgrid');
if (appgrid) {
  const cols = Array.from(appgrid.querySelectorAll('.appcol'));
  const setFocus = (el) => {
    appgrid.classList.add('focusing');
    cols.forEach(c => c.classList.toggle('focus', c === el));
  };
  // default: middle screen (Today)
  setFocus(cols[Math.floor(cols.length / 2)]);
  cols.forEach(c => {
    c.addEventListener('mouseenter', () => setFocus(c));
    c.addEventListener('focusin', () => setFocus(c));
    c.addEventListener('click', () => setFocus(c));
  });
}

// Animated hero conversation: cycle through scenarios, one bubble at a time
const heroChat = document.querySelector('[data-herochat]');
if (heroChat) {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const scenarios = [
    [ {me:'Should I take the 7am or the noon flight?'},
      {am:"The 7am. You'd still make your afternoon meeting."} ],
    [ {me:'Will it rain during my run at six?'},
      {am:'No, clear until nine. Good window.'} ],
    [ {me:"Explain an ETF like I'm five."},
      {am:'A basket of many stocks you buy at once, so your risk is spread out.'} ],
    [ {me:"Three gift ideas for Mom's 60th?"},
      {am:'A film camera, a weekend away, or a letter from everyone. Pick one to explore?'} ],
    [ {me:"How do you say 'table for two' in Portuguese?"},
      {am:'Uma mesa para dois.'} ],
    [ {me:"Text Sam I'll be five minutes late."},
      {am:'Sent.'} ],
  ];
  const build = (turns) => {
    heroChat.innerHTML = '';
    return turns.map(t => {
      const who = t.me !== undefined ? 'me' : 'am';
      const b = document.createElement('div');
      b.className = 'bub ' + who;
      if (who === 'am') {
        const dot = document.createElement('span');
        dot.className = 'dot'; dot.setAttribute('aria-hidden','true');
        b.appendChild(dot);
      }
      const s = document.createElement('span');
      s.textContent = who === 'me' ? t.me : t.am;
      b.appendChild(s);
      heroChat.appendChild(b);
      return { el: b, who };
    });
  };
  if (reduced) {
    build(scenarios[0]).forEach(b => b.el.classList.add('show'));
  } else {
    const wait = (ms) => new Promise(r => setTimeout(r, ms));
    const play = async (turns) => {
      const bubbles = build(turns);        // all placed (hidden) so layout is stable
      await wait(500);
      for (const b of bubbles) {
        requestAnimationFrame(() => b.el.classList.add('show'));
        await wait(b.who === 'am' ? 1150 : 950);   // pause longer before Amber replies
      }
      await wait(2600);
      bubbles.forEach(b => b.el.classList.remove('show'));
      await wait(650);
    };
    const loop = async () => {
      let i = 0;
      while (true) { await play(scenarios[i]); i = (i + 1) % scenarios.length; }
    };
    const obs = new IntersectionObserver((entries, o) => {
      if (entries[0].isIntersecting) { loop(); o.disconnect(); }
    }, { threshold: 0.4 });
    obs.observe(heroChat.closest('.ph'));
  }
}

// Interactive finish picker: switch the big pendant's finish, gentle auto-cycle
const finPicker = document.querySelector('.finishpicker');
if (finPicker) {
  const pend = finPicker.querySelector('.pendant');
  const nameEl = document.getElementById('finName');
  const descEl = document.getElementById('finDesc');
  const btns = Array.from(finPicker.querySelectorAll('.sw-btn'));
  const apply = (btn) => {
    pend.classList.add('fade');
    setTimeout(() => {
      pend.classList.remove('sage','clay','graphite');
      if (btn.dataset.fin) pend.classList.add(btn.dataset.fin);
      nameEl.textContent = btn.dataset.name;
      descEl.textContent = btn.dataset.desc;
      pend.classList.remove('fade');
    }, 180);
    btns.forEach(b => b.classList.toggle('is-on', b === btn));
  };
  const reducedF = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let fi = 0, ftimer = null, fpaused = false, fresume = null;
  btns.forEach((b, i) => b.addEventListener('click', () => {
    apply(b); fi = i; fpaused = true;
    clearTimeout(fresume); fresume = setTimeout(() => { fpaused = false; }, 8000);
  }));
  const startF = () => { if (reducedF || ftimer) return; ftimer = setInterval(() => {
    if (fpaused) return; fi = (fi + 1) % btns.length; apply(btns[fi]);
  }, 2800); };
  const stopF = () => { clearInterval(ftimer); ftimer = null; };
  new IntersectionObserver((e) => { e[0].isIntersecting ? startF() : stopF(); }, { threshold: 0.35 }).observe(finPicker);
}

