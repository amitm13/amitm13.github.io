(function () {
  const apps = window.VEDICORE_APPS || [];
  const profile = window.VEDICORE_PROFILE || {
    title: "Vedicore",
    subtitle: "Spiritual apps crafted with calm, clarity, and devotion.",
    developerUrl: "https://play.google.com/store/apps/developer?id=vedicore",
    heroNote: "A growing collection of devotional tools.",
  };

  const pageType = document.body.dataset.page;

  function getAppBySlug(slug) {
    return apps.find((app) => app.slug === slug) || apps[0];
  }

  function createAppCard(app, detailMode = false) {
    const article = document.createElement("article");
    article.className = detailMode ? "app-card detail-card" : "app-card";
    article.innerHTML = `
      <div class="app-card-head">
        <div class="app-badge" style="background: linear-gradient(145deg, ${app.gradient[0]}, ${app.gradient[1]});">${app.icon}</div>
        <div>
          <div class="eyebrow" style="margin-bottom: 10px;">${app.featureTag}</div>
          <h3>${app.title}</h3>
          <p>${app.tagline}</p>
        </div>
      </div>
      <p>${app.description}</p>
      <div class="meta">
        ${app.features.map((feature) => `<span class="chip">${feature}</span>`).join("")}
      </div>
      <div class="app-card-footer">
        <a class="button button-primary" href="app.html?app=${app.slug}">View details</a>
        <a class="button button-secondary" href="${app.playStoreUrl}" target="_blank" rel="noopener noreferrer">Google Play</a>
      </div>
    `;
    return article;
  }

  function renderIndex() {
    const heroTitle = document.querySelector("[data-hero-title]");
    const heroSubtitle = document.querySelector("[data-hero-subtitle]");
    const heroNote = document.querySelector("[data-hero-note]");
    const developerLinks = document.querySelectorAll("[data-developer-link]");
    const countEl = document.querySelector("[data-app-count]");
    const appGrid = document.querySelector("[data-app-grid]");
    const spotlight = document.querySelector("[data-spotlight]");

    if (heroTitle) heroTitle.textContent = profile.title;
    if (heroSubtitle) heroSubtitle.textContent = profile.subtitle;
    if (heroNote) heroNote.textContent = profile.heroNote;
    developerLinks.forEach((link) => {
      link.href = profile.developerUrl;
    });
    if (countEl) countEl.textContent = `${apps.length}`;

    if (appGrid) {
      appGrid.innerHTML = "";
      apps.forEach((app) => appGrid.appendChild(createAppCard(app)));
    }

    if (spotlight && apps[0]) {
      const app = apps[0];
      spotlight.innerHTML = `
        <div class="orb" style="background: linear-gradient(145deg, ${app.gradient[0]}, ${app.gradient[1]});">${app.icon}</div>
        <h2>${app.title}</h2>
        <p>${app.details}</p>
      `;
    }
  }

  function renderDetail() {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get("app");
    const app = getAppBySlug(slug);

    document.title = `${app.title} | ${profile.title}`;

    const titleEl = document.querySelector("[data-detail-title]");
    const subtitleEl = document.querySelector("[data-detail-subtitle]");
    const iconEl = document.querySelector("[data-detail-icon]");
    const featureTagEl = document.querySelector("[data-detail-feature]");
    const introEl = document.querySelector("[data-detail-intro]");
    const featureListEl = document.querySelector("[data-detail-features]");
    const highlightsEl = document.querySelector("[data-detail-highlights]");
    const playLink = document.querySelector("[data-detail-play]");
    const devLink = document.querySelector("[data-detail-developer]");
    const allAppsGrid = document.querySelector("[data-other-apps]");

    if (titleEl) titleEl.textContent = app.title;
    if (subtitleEl) subtitleEl.textContent = app.tagline;
    if (iconEl) {
      iconEl.textContent = app.icon;
      iconEl.style.background = `linear-gradient(145deg, ${app.gradient[0]}, ${app.gradient[1]})`;
    }
    if (featureTagEl) featureTagEl.textContent = app.featureTag;
    if (introEl) introEl.textContent = app.details;
    if (playLink) playLink.href = app.playStoreUrl;
    if (devLink) devLink.href = profile.developerUrl;

    if (featureListEl) {
      featureListEl.innerHTML = app.features.map((feature) => `<li>${feature}</li>`).join("");
    }

    if (highlightsEl) {
      highlightsEl.innerHTML = app.highlights
        .map((highlight) => `<li>${highlight}</li>`)
        .join("");
    }

    if (allAppsGrid) {
      allAppsGrid.innerHTML = "";
      apps.forEach((item) => allAppsGrid.appendChild(createAppCard(item, true)));
    }
  }

  if (pageType === "home") {
    renderIndex();
  }

  if (pageType === "detail") {
    renderDetail();
  }
})();
