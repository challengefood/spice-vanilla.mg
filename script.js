document.addEventListener("DOMContentLoaded", function () {
  const body = document.body;
  const pages = Array.from(document.querySelectorAll(".page"));
  const navLinks = document.getElementById("navLinks");
  const burgerBtn = document.getElementById("burgerBtn");
  const brandHome = document.getElementById("brandHome");
  const langSwitch = document.getElementById("langSwitch");

  const productData = [
    {
      titleFr: "Vanille Bourbon de Madagascar",
      titleEn: "Madagascar Bourbon Vanilla",
      descFr: "Gousses riches en arôme, triées et préparées pour l’export premium.",
      descEn: "Aromatic beans, sorted and prepared for premium export.",
      tags: ["Gourmet & TK", "Traçabilité", "Origine SAVA", "Export premium"]
    },
    {
      titleFr: "Poivre Noir",
      titleEn: "Black Pepper",
      descFr: "Poivre intense et aromatique, calibré pour des acheteurs professionnels.",
      descEn: "Intense aromatic pepper, graded for professional buyers.",
      tags: ["Arôme intense", "Tri qualité", "Madagascar", "Conditionnement export"]
    },
    {
      titleFr: "Cacao",
      titleEn: "Cocoa Beans",
      descFr: "Fèves fermentées de qualité supérieure, adaptées aux transformateurs.",
      descEn: "High-quality fermented cocoa beans for processors.",
      tags: ["Fèves fermentées", "Qualité supérieure", "Approvisionnement fiable", "Export"]
    }
  ];

  // ---------- Navigation pages ----------
  function setActivePage(pageId) {
    pages.forEach(p => p.classList.remove("active"));
    const target = document.getElementById(pageId);
    if (target) target.classList.add("active");

    document.querySelectorAll(".nav-btn").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.page === pageId);
    });

    // ferme menu mobile
    navLinks.classList.remove("show");
    burgerBtn.classList.remove("active");

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Expose global au cas où (sécurité)
  window.goToPage = setActivePage;

  // clic sur boutons de nav
  document.addEventListener("click", function (e) {
    const navBtn = e.target.closest(".nav-btn");
    const gotoBtn = e.target.closest("[data-page]");

    if (navBtn) {
      e.preventDefault();
      setActivePage(navBtn.dataset.page);
      return;
    }

    // boutons du hero avec data-page
    if (gotoBtn && !gotoBtn.classList.contains("nav-btn")) {
      const targetPage = gotoBtn.getAttribute("data-page");
      if (targetPage && document.getElementById(targetPage)) {
        e.preventDefault();
        setActivePage(targetPage);
      }
    }
  });

  // logo -> home
  brandHome.addEventListener("click", () => setActivePage("home"));

  // burger
  burgerBtn.addEventListener("click", () => {
    burgerBtn.classList.toggle("active");
    navLinks.classList.toggle("show");
  });

  // fermer menu mobile clic extérieur
  document.addEventListener("click", function (e) {
    const clickInside = navLinks.contains(e.target) || burgerBtn.contains(e.target);
    if (!clickInside) {
      navLinks.classList.remove("show");
      burgerBtn.classList.remove("active");
    }
  });

  // langue
  langSwitch.addEventListener("click", () => {
    if (body.classList.contains("lang-fr")) {
      body.classList.remove("lang-fr");
      body.classList.add("lang-en");
    } else {
      body.classList.remove("lang-en");
      body.classList.add("lang-fr");
    }
  });

  // ---------- Carousel ----------
  const slides = Array.from(document.querySelectorAll(".product-slide"));
  const dots = Array.from(document.querySelectorAll(".dot"));
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  const prodTitleFr = document.getElementById("prodTitleFr");
  const prodTitleEn = document.getElementById("prodTitleEn");
  const prodDescFr = document.getElementById("prodDescFr");
  const prodDescEn = document.getElementById("prodDescEn");
  const prodTags = document.getElementById("prodTags");

  let current = 0;
  let timer = null;

  function renderInfo(i) {
    const p = productData[i];
    prodTitleFr.textContent = p.titleFr;
    prodTitleEn.textContent = p.titleEn;
    prodDescFr.textContent = p.descFr;
    prodDescEn.textContent = p.descEn;
    prodTags.innerHTML = "";
    p.tags.forEach(tag => {
      const li = document.createElement("li");
      li.textContent = tag;
      prodTags.appendChild(li);
    });
  }

  function showSlide(i) {
    if (!slides.length) return;
    if (i < 0) i = slides.length - 1;
    if (i >= slides.length) i = 0;
    current = i;

    slides.forEach((s, idx) => s.classList.toggle("active", idx === current));
    dots.forEach((d, idx) => d.classList.toggle("active", idx === current));
    renderInfo(current);
  }

  function nextSlide() { showSlide(current + 1); }
  function prevSlide() { showSlide(current - 1); }

  if (nextBtn) nextBtn.addEventListener("click", () => { nextSlide(); restartAuto(); });
  if (prevBtn) prevBtn.addEventListener("click", () => { prevSlide(); restartAuto(); });

  dots.forEach(dot => {
    dot.addEventListener("click", () => {
      const i = Number(dot.dataset.index);
      showSlide(i);
      restartAuto();
    });
  });

  function startAuto() { timer = setInterval(nextSlide, 4500); }
  function stopAuto() { if (timer) clearInterval(timer); }
  function restartAuto() { stopAuto(); startAuto(); }

  // init
  setActivePage("home");
  showSlide(0);
  startAuto();
});
