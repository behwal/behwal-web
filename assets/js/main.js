// behwal game studio — small touches, no dependencies
(() => {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Reveal on scroll
  const revealables = document.querySelectorAll(".game__text, .game__art, .studio h2, .studio__cols, .studio__list");
  if ("IntersectionObserver" in window && !reduce) {
    revealables.forEach(el => el.classList.add("reveal"));
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.15 });
    revealables.forEach(el => io.observe(el));
  }

  // Dominoes of the Dead: the row topples in a chain when it scrolls into view (and on click)
  const row = document.querySelector(".dominoes");
  if (row) {
    const tiles = [...row.children];
    tiles.forEach((t, i) => { t.style.transitionDelay = `${i * 0.09}s`; });
    let fallen = false;
    const topple = () => {
      if (reduce || fallen) return;
      fallen = true;
      row.classList.add("fall");
    };
    const stand = () => { fallen = false; row.classList.remove("fall"); };
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(([e]) => { e.isIntersecting ? setTimeout(topple, 400) : stand(); }, { threshold: 0.9 }).observe(row);
    }
    row.addEventListener("click", () => { if (fallen) { stand(); setTimeout(topple, 500); } else topple(); });
    row.style.cursor = "pointer";
  }

  // Birdwalk: pads sink one by one behind an invisible bird, then come back up
  const pads = document.querySelector(".pads");
  if (pads && !reduce) {
    const list = [...pads.querySelectorAll("i:not(.flower)")];
    let running = false;
    const walk = () => {
      if (running) return;
      running = true;
      const visible = list.filter(p => p.offsetParent !== null);
      visible.forEach((p, i) => setTimeout(() => p.classList.add("sunk"), 600 + i * 520));
      setTimeout(() => { visible.forEach(p => p.classList.remove("sunk")); running = false; }, 600 + visible.length * 520 + 2600);
    };
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(([e]) => { if (e.isIntersecting) walk(); }, { threshold: 1 }).observe(pads);
    }
    pads.addEventListener("click", walk);
  }

  // Beware of the Dark: the lantern light follows the pointer; it drifts on its own otherwise
  const dark = document.querySelector(".game--dark");
  if (dark) {
    let pointerAt = 0, raf = 0, t0 = performance.now();
    const set = (x, y) => { dark.style.setProperty("--lx", x + "%"); dark.style.setProperty("--ly", y + "%"); };
    dark.addEventListener("pointermove", e => {
      const r = dark.getBoundingClientRect();
      set(((e.clientX - r.left) / r.width) * 100, ((e.clientY - r.top) / r.height) * 100);
      pointerAt = performance.now();
    });
    const drift = now => {
      if (now - pointerAt > 2500) {
        const s = (now - t0) / 1000;
        set(34 + Math.sin(s * 0.31) * 18 + Math.sin(s * 0.83) * 4, 58 + Math.sin(s * 0.47) * 14);
      }
      raf = requestAnimationFrame(drift);
    };
    if (!reduce && "IntersectionObserver" in window) {
      new IntersectionObserver(([e]) => {
        if (e.isIntersecting) { if (!raf) raf = requestAnimationFrame(drift); }
        else { cancelAnimationFrame(raf); raf = 0; }
      }).observe(dark);
    }
  }
})();
