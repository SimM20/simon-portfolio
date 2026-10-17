(function () {
  "use strict";

  const D = window.CV;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };

  /* ------------------------------------------------------------------
     Textos fijos de la interfaz
     ------------------------------------------------------------------ */
  const UI = {
    es: {
      "nav.about": "Sobre mí", "nav.experience": "Experiencia", "nav.education": "Educación",
      "nav.skills": "Skills", "nav.projects": "Proyectos", "nav.contact": "Contacto",
      "hero.hello": "Hola, soy", "hero.cta": "Ver experiencia", "hero.cv": "Descargar CV",
      "about.location": "Ubicación", "about.email": "Email", "about.phone": "Teléfono", "about.languages": "Idiomas",
      "skills.languages": "Idiomas",
      "contact.eyebrow": "¿Hablamos?", "contact.title": "Construyamos algo juntos",
      "contact.sub": "Estoy abierto a nuevas oportunidades, proyectos y colaboraciones. Escribime y te respondo a la brevedad.",
      "contact.email": "Enviar email", "contact.copy": "Copiar email", "contact.copied": "Email copiado al portapapeles",
      "footer.updated": "Última actualización", "lang.switch": "EN", "lang.label": "Switch to English",
      "theme.label": "Cambiar tema",
      "kicker.about": "Perfil", "kicker.experience": "Trayectoria", "kicker.education": "Formación",
      "kicker.skills": "Stack & herramientas", "kicker.projects": "Trabajos",
      "xp.more": "Ver detalle", "xp.less": "Ocultar detalle", "xp.current": "Actual", "edu.current": "En curso",
      "meta.title": "Simón Morales Lozano | Software Developer y Analista de Soluciones Digitales",
      "meta.description": "Simón Morales Lozano, Software Developer y Analista de Soluciones Digitales en Argentina. Automatización, integración de datos, C++, Unreal Engine y Unity."
    },
    en: {
      "nav.about": "About", "nav.experience": "Experience", "nav.education": "Education",
      "nav.skills": "Skills", "nav.projects": "Projects", "nav.contact": "Contact",
      "hero.hello": "Hi, I'm", "hero.cta": "See experience", "hero.cv": "Download CV",
      "about.location": "Location", "about.email": "Email", "about.phone": "Phone", "about.languages": "Languages",
      "skills.languages": "Languages",
      "contact.eyebrow": "Let's talk", "contact.title": "Let's build something together",
      "contact.sub": "I'm open to new opportunities, projects and collaborations. Drop me a line and I'll get back to you soon.",
      "contact.email": "Send email", "contact.copy": "Copy email", "contact.copied": "Email copied to clipboard",
      "footer.updated": "Last updated", "lang.switch": "ES", "lang.label": "Cambiar a español",
      "theme.label": "Toggle theme",
      "kicker.about": "Profile", "kicker.experience": "Career", "kicker.education": "Background",
      "kicker.skills": "Stack & tools", "kicker.projects": "Work",
      "xp.more": "Show details", "xp.less": "Hide details", "xp.current": "Current", "edu.current": "Ongoing",
      "meta.title": "Simón Morales Lozano | Software Developer & Digital Solutions Analyst",
      "meta.description": "Simón Morales Lozano, Software Developer and Digital Solutions Analyst based in Argentina. Automation, data integration, C++, Unreal Engine and Unity."
    }
  };

  let lang = store.get("lang") || ((navigator.language || "es").toLowerCase().startsWith("es") ? "es" : "en");
  const t = (k) => UI[lang][k] || k;
  const tr = (v) => (v && typeof v === "object" && !Array.isArray(v) ? (v[lang] ?? v.es) : v);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* ------------------------------------------------------------------
     Render del contenido desde data.js
     ------------------------------------------------------------------ */
  function socialLinks() {
    const c = D.contact, out = [];
    if (c.github) out.push({ icon: "bi-github", url: c.github, label: "GitHub" });
    if (c.linkedin) out.push({ icon: "bi-linkedin", url: c.linkedin, label: "LinkedIn" });
    if (c.email) out.push({ icon: "bi-envelope", url: "mailto:" + c.email, label: "Email" });
    if (c.whatsapp) out.push({ icon: "bi-whatsapp", url: "https://wa.me/" + c.whatsapp, label: "WhatsApp" });
    return out;
  }

  function render() {
    document.documentElement.lang = lang;
    document.title = t("meta.title");
    $('meta[name="description"]').setAttribute("content", t("meta.description"));

    $$("[data-i18n]").forEach((el) => { el.textContent = t(el.dataset.i18n); });
    // Los títulos de sección se envuelven para animarlos "subiendo" desde una máscara
    $$(".section-title").forEach((el) => { el.innerHTML = `<span class="st-inner">${esc(el.textContent)}</span>`; });

    // Hero
    const parts = D.name.split(" ");
    $("#heroFirst").textContent = parts[0];
    $("#heroLast").textContent = parts.slice(1).join(" ");
    $("#heroHeadline").textContent = tr(D.headline);
    $("#heroPhoto").src = D.photo;
    $("#cvDownload").href = tr(D.cv);
    $("#heroSocial").innerHTML = socialLinks().map((s) =>
      `<a href="${esc(s.url)}" target="_blank" rel="noopener" aria-label="${s.label}" data-bs-toggle="tooltip" data-bs-title="${s.label}"><i class="bi ${s.icon}"></i></a>`
    ).join("");

    // Marquee (lista de skills duplicada para el loop infinito)
    const words = D.skills.flatMap((s) => tr(s.items)).slice(0, 16);
    const row = words.map((w) => `<span class="marquee-item">${esc(w)}</span>`).join("");
    $("#marquee").innerHTML = row + row;

    // About
    $("#aboutHeadline").textContent = tr(D.headline);
    $("#aboutSummary").textContent = tr(D.summary);
    const info = [
      { icon: "bi-geo-alt", label: t("about.location"), value: esc(tr(D.contact.location)), cols: "col-xl-2" },
      { icon: "bi-envelope", label: t("about.email"), value: `<a href="mailto:${esc(D.contact.email)}">${esc(D.contact.email)}</a>`, cols: "col-xl-4" },
      D.contact.phone && { icon: "bi-telephone", label: t("about.phone"), value: `<a href="https://wa.me/${esc(D.contact.whatsapp)}" target="_blank" rel="noopener">${esc(D.contact.phone)}</a>` },
      { icon: "bi-translate", label: t("about.languages"), value: D.languages.map((l) => esc(tr(l.name))).join(" · ") }
    ].filter(Boolean);
    $("#aboutInfo").innerHTML = info.map((i) => `
      <div class="col-sm-6 ${i.cols || "col-xl-3"} reveal"><div class="card glass info-item">
        <div class="info-icon"><i class="bi ${i.icon}"></i></div>
        <div class="min-w-0"><div class="info-label">${i.label}</div><div class="info-value">${i.value}</div></div>
      </div></div>`).join("");

    $("#highlights").innerHTML = D.highlights.map((h, i) => `
      <div class="reveal zoom" style="--delay:${i * 90}ms">
        <div class="card glass spotlight tilt highlight-card">
          <i class="bi ${h.icon}"></i>
          <div><div class="highlight-value">${esc(h.value)}</div><div class="highlight-label">${esc(tr(h.label))}</div></div>
        </div>
      </div>`).join("");

    // Experience
    // Experience: puesto en grande, detalle desplegable
    $("#timelineItems").innerHTML = D.experience.map((e, i) => `
      <article class="card glass spotlight xp-item reveal${e.current ? " is-current" : ""}">
        <div class="row g-3 g-lg-5">
          <div class="col-lg-3">
            <div class="tl-period">${esc(tr(e.period))}</div>
            ${e.current ? `<span class="badge-current">● ${t("xp.current")}</span>` : ""}
            ${e.company ? `<div class="tl-company">${esc(e.company)}</div>` : ""}
          </div>
          <div class="col-lg-9">
            <h3 class="xp-title">${esc(tr(e.title))}</h3>
            ${e.tags && e.tags.length ? `<div class="tags">${e.tags.map((g) => `<span class="tag">${esc(g)}</span>`).join("")}</div>` : ""}
            <div class="collapse${e.current ? " show" : ""}" id="xp-${i}">
              <ul class="tl-list">${tr(e.bullets).map((b) => `<li>${b}</li>`).join("")}</ul>
            </div>
            <button class="xp-toggle${e.current ? "" : " collapsed"}" type="button" data-bs-toggle="collapse" data-bs-target="#xp-${i}"
                    aria-expanded="${e.current ? "true" : "false"}" aria-controls="xp-${i}">
              <span class="when-closed">${t("xp.more")}</span><span class="when-open">${t("xp.less")}</span>
              <i class="bi bi-plus-lg"></i>
            </button>
          </div>
        </div>
      </article>`).join("");

    // Education
    $("#educationList").innerHTML = D.education.map((e, i) => `
      <div class="col-md-6 col-lg-4 reveal" style="--delay:${i * 110}ms">
        <div class="card glass spotlight tilt edu-card">
          <div class="edu-icon"><i class="bi ${e.icon}"></i></div>
          <span class="tl-period">${esc(tr(e.period))}${e.current ? `<span class="badge-current">● ${t("edu.current")}</span>` : ""}</span>
          <h3 class="edu-title">${esc(tr(e.title))}</h3>
          <div class="edu-school">${esc(e.school)}</div>
        </div>
      </div>`).join("");

    // Skills
    // Skills: una fila por categoría (más los idiomas al final)
    const skillRows = D.skills.map((s) => ({ icon: s.icon, title: tr(s.title), items: tr(s.items) }));
    skillRows.push({
      icon: "bi-translate", title: t("skills.languages"),
      items: D.languages.map((l) => `${tr(l.name)} · ${tr(l.level)}`)
    });
    $("#skillsList").innerHTML = skillRows.map((s, i) => `
      <div class="skill-row reveal" style="--delay:${(i % 4) * 60}ms">
        <div class="row g-3 align-items-center">
          <div class="col-lg-4"><h3 class="skill-cat"><span class="skill-idx">${String(i + 1).padStart(2, "0")}</span>${esc(s.title)}</h3></div>
          <div class="col-lg-8"><div class="skill-pills">${s.items.map((it) => `<span class="skill-pill">${esc(it)}</span>`).join("")}</div></div>
        </div>
      </div>`).join("");

    // Projects
    const hasProjects = D.projects && D.projects.length > 0;
    $("#projects").classList.toggle("d-none", !hasProjects);
    $("#navProjects").classList.toggle("d-none", !hasProjects);
    if (hasProjects) {
      $("#projectsList").innerHTML = D.projects.map((p, i) => `
        <div class="col-md-6 col-lg-4 reveal" style="--delay:${(i % 3) * 100}ms">
          <div class="card glass spotlight project-card">
            <div class="project-media">${p.image ? `<img src="${esc(p.image)}" alt="${esc(p.title)}" loading="lazy">` : ""}</div>
            <div class="project-body">
              <span class="project-type">${esc(tr(p.type) || "")}</span>
              <h3 class="edu-title">${esc(p.title)}</h3>
              <p class="text-body-secondary mb-0">${esc(tr(p.description) || "")}</p>
              ${p.tags ? `<div class="tags">${p.tags.map((g) => `<span class="tag">${esc(g)}</span>`).join("")}</div>` : ""}
              <div class="project-links">${(p.links || []).map((l) =>
                `<a class="btn btn-sm btn-outline-light" href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)} <i class="bi bi-arrow-up-right"></i></a>`).join("")}</div>
            </div>
          </div>
        </div>`).join("");
    }

    // Contact
    const c = D.contact;
    $("#contactButtons").innerHTML = `
      <a class="btn btn-primary btn-lg btn-glow magnetic" href="mailto:${esc(c.email)}"><i class="bi bi-envelope me-2"></i>${t("contact.email")}</a>
      <button class="btn btn-outline-light btn-lg magnetic" type="button" id="copyEmail"><i class="bi bi-clipboard me-2"></i>${t("contact.copy")}</button>
      ${c.whatsapp ? `<a class="btn btn-outline-light btn-lg magnetic" href="https://wa.me/${esc(c.whatsapp)}" target="_blank" rel="noopener"><i class="bi bi-whatsapp me-2"></i>WhatsApp</a>` : ""}
      ${c.linkedin ? `<a class="btn btn-outline-light btn-lg magnetic" href="${esc(c.linkedin)}" target="_blank" rel="noopener"><i class="bi bi-linkedin me-2"></i>LinkedIn</a>` : ""}
      ${c.github ? `<a class="btn btn-outline-light btn-lg magnetic" href="${esc(c.github)}" target="_blank" rel="noopener"><i class="bi bi-github me-2"></i>GitHub</a>` : ""}`;
    $("#copyEmail").addEventListener("click", copyEmail);

    // Footer
    $("#year").textContent = new Date().getFullYear();
    const [y, m] = D.updated.split("-").map(Number);
    $("#updated").textContent = new Date(y, (m || 1) - 1, 1).toLocaleDateString(lang === "es" ? "es-AR" : "en-US", { month: "long", year: "numeric" });

    // Botones
    $("#langToggle").textContent = t("lang.switch");
    $("#langToggle").setAttribute("aria-label", t("lang.label"));
    $("#themeToggle").setAttribute("aria-label", t("theme.label"));

    afterRender();
  }

  /* ------------------------------------------------------------------
     Interacciones que dependen del contenido renderizado
     ------------------------------------------------------------------ */
  let revealObserver;
  function afterRender() {
    // Scroll reveal
    if (revealObserver) revealObserver.disconnect();
    const targets = $$(".reveal, .section-head");
    if (reduceMotion || !("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("is-visible"));
    } else {
      revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) { en.target.classList.add("is-visible"); revealObserver.unobserve(en.target); }
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });
      targets.forEach((el) => revealObserver.observe(el));
    }

    // Tooltips de Bootstrap
    $$('[data-bs-toggle="tooltip"]').forEach((el) => {
      const old = bootstrap.Tooltip.getInstance(el); if (old) old.dispose();
      new bootstrap.Tooltip(el);
    });

    if (finePointer && !reduceMotion) {
      $$(".tilt").forEach(bindTilt);
      $$(".magnetic").forEach(bindMagnetic);
    }
    $$(".spotlight").forEach((el) => {
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", e.clientX - r.left + "px");
        el.style.setProperty("--my", e.clientY - r.top + "px");
      });
    });

    const spy = bootstrap.ScrollSpy.getInstance(document.body);
    if (spy) spy.refresh();
    onScroll();
  }

  function bindTilt(el) {
    if (el.dataset.tiltBound) return;
    el.dataset.tiltBound = "1";
    const max = el.classList.contains("portrait") ? 10 : 6;
    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(900px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg) translateZ(0)`;
    });
    el.addEventListener("pointerleave", () => { el.style.transform = ""; });
  }

  function bindMagnetic(el) {
    if (el.dataset.magBound) return;
    el.dataset.magBound = "1";
    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      el.style.transform = `translate(${x * 0.18}px, ${y * 0.25}px)`;
    });
    el.addEventListener("pointerleave", () => { el.style.transform = ""; });
  }

  function copyEmail() {
    const done = () => bootstrap.Toast.getOrCreateInstance($("#copyToast")).show();
    if (navigator.clipboard) navigator.clipboard.writeText(D.contact.email).then(done, () => {});
  }

  /* ------------------------------------------------------------------
     Efecto de tipeo en el hero
     ------------------------------------------------------------------ */
  let typeTimer;
  function startTyping() {
    clearTimeout(typeTimer);
    const el = $("#typed");
    const words = tr(D.roles);
    if (reduceMotion) { el.textContent = words[0]; return; }
    let wi = 0, ci = 0, deleting = false;
    (function tick() {
      const w = words[wi];
      ci += deleting ? -1 : 1;
      el.textContent = w.slice(0, ci);
      let delay = deleting ? 38 : 75;
      if (!deleting && ci === w.length) { deleting = true; delay = 1800; }
      else if (deleting && ci === 0) { deleting = false; wi = (wi + 1) % words.length; delay = 350; }
      typeTimer = setTimeout(tick, delay);
    })();
  }

  /* ------------------------------------------------------------------
     Scroll: navbar y barra de progreso
     ------------------------------------------------------------------ */
  const nav = $("#mainNav");
  const progress = $(".scroll-progress");
  let ticking = false;

  function onScroll() {
    const y = window.scrollY;
    nav.classList.toggle("scrolled", y > 20);
    const h = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = `scaleX(${h > 0 ? y / h : 0})`;
    ticking = false;
  }
  window.addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });

  // Cierra el menú mobile al tocar un link
  $$("#navLinks .nav-link").forEach((a) => a.addEventListener("click", () => {
    const c = bootstrap.Collapse.getInstance($("#navLinks"));
    if (c) c.hide();
  }));

  /* ------------------------------------------------------------------
     Cursor glow
     ------------------------------------------------------------------ */
  if (finePointer && !reduceMotion) {
    const glow = $(".cursor-glow");
    let gx = 0, gy = 0, tx = 0, ty = 0;
    window.addEventListener("pointermove", (e) => { tx = e.clientX; ty = e.clientY; document.body.classList.add("has-pointer"); }, { passive: true });
    document.addEventListener("pointerleave", () => document.body.classList.remove("has-pointer"));
    (function loop() {
      gx += (tx - gx) * 0.12; gy += (ty - gy) * 0.12;
      glow.style.transform = `translate(${gx - 260}px, ${gy - 260}px)`;
      requestAnimationFrame(loop);
    })();
  }

  /* ------------------------------------------------------------------
     Partículas del hero (red de nodos que reacciona al mouse)
     ------------------------------------------------------------------ */
  function particles() {
    const canvas = $("#particles");
    const ctx = canvas.getContext("2d");
    const hero = $("#hero");
    let w, h, dpr, pts = [], mouse = { x: -9999, y: -9999 }, running = true, raf;

    function color() {
      return getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#38bdf8";
    }
    let rgb = "56,189,248";
    function updateColor() {
      const c = color();
      const m = c.match(/^#?([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i);
      if (m) rgb = [m[1], m[2], m[3]].map((x) => parseInt(x, 16)).join(",");
    }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = hero.clientWidth; h = hero.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.min(90, Math.floor((w * h) / 16000));
      pts = Array.from({ length: n }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.6 + 0.6
      }));
    }

    function frame() {
      ctx.clearRect(0, 0, w, h);
      const link = 130;
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        const dxm = p.x - mouse.x, dym = p.y - mouse.y, dm = Math.hypot(dxm, dym);
        if (dm < 140 && dm > 0) { p.x += (dxm / dm) * 1.2; p.y += (dym / dm) * 1.2; }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb},.7)`;
        ctx.fill();

        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j], dx = p.x - q.x, dy = p.y - q.y, d = dx * dx + dy * dy;
          if (d < link * link) {
            ctx.strokeStyle = `rgba(${rgb},${(1 - Math.sqrt(d) / link) * 0.22})`;
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
          }
        }
      }
      if (running) raf = requestAnimationFrame(frame);
    }

    hero.addEventListener("pointermove", (e) => { const r = hero.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; });
    hero.addEventListener("pointerleave", () => { mouse.x = mouse.y = -9999; });
    window.addEventListener("resize", () => { resize(); if (reduceMotion) frame(); });

    // Pausa cuando el hero no está a la vista
    new IntersectionObserver(([en]) => {
      const vis = en.isIntersecting;
      if (vis && !running && !reduceMotion) { running = true; frame(); }
      if (!vis) { running = false; cancelAnimationFrame(raf); }
    }).observe(hero);

    updateColor(); resize();
    if (reduceMotion) { running = false; frame(); } else frame();
    return { updateColor };
  }

  /* ------------------------------------------------------------------
     Tema e idioma
     ------------------------------------------------------------------ */
  let fx;
  function setThemeIcon() {
    const dark = document.documentElement.getAttribute("data-bs-theme") === "dark";
    $("#themeToggle").innerHTML = `<i class="bi ${dark ? "bi-sun" : "bi-moon-stars"}"></i>`;
    $('meta[name="theme-color"]').setAttribute("content", dark ? "#0b0d17" : "#f6f7fb");
  }
  $("#themeToggle").addEventListener("click", () => {
    const next = document.documentElement.getAttribute("data-bs-theme") === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-bs-theme", next);
    store.set("theme", next);
    setThemeIcon();
    if (fx) fx.updateColor();
  });

  $("#langToggle").addEventListener("click", () => {
    lang = lang === "es" ? "en" : "es";
    store.set("lang", lang);
    render();
    startTyping();
  });

  /* ------------------------------------------------------------------
     Init
     ------------------------------------------------------------------ */
  setThemeIcon();
  render();
  startTyping();
  fx = particles();
})();
