"use strict";

window.KASaaS = window.KASaaS || {};

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initMobileNav();
  initStickyHeader();
  initSmoothScroll();
  initFilters();
  initFormHandlers();
  initPasswordStrength();
  initCharts();
  initSwipers();
  initTooltips();
  window.KASaaS.initAOS?.();
  window.KASaaS.initPricingToggle?.();
  window.KASaaS.initCounters?.();
  window.KASaaS.initFaq?.();
  window.KASaaS.initVideoModal?.();
});

const chartRegistry = [];

function getThemePreference() {
  const stored = window.localStorage.getItem("ka-saas-theme");

  if (stored === "dark" || stored === "light") {
    return stored;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  window.localStorage.setItem("ka-saas-theme", theme);
  document.dispatchEvent(new CustomEvent("themechange", { detail: { theme } }));

  document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
    const icon = button.querySelector("i");
    const label = theme === "dark" ? "Aydınlık moda geç" : "Karanlık moda geç";

    button.setAttribute("aria-label", label);

    if (icon) {
      icon.className = theme === "dark" ? "fa-solid fa-sun" : "fa-solid fa-moon";
    }
  });
}

function initTheme() {
  applyTheme(getThemePreference());

  document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme") || "light";
      applyTheme(current === "dark" ? "light" : "dark");
    });
  });

  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (event) => {
    if (!window.localStorage.getItem("ka-saas-theme")) {
      applyTheme(event.matches ? "dark" : "light");
    }
  });
}

function initMobileNav() {
  const toggle = document.querySelector("[data-mobile-nav-toggle]");
  const panel = document.getElementById("mobileNavPanel");
  const overlay = document.querySelector("[data-mobile-nav-overlay]");

  if (!toggle || !panel || !overlay) {
    return;
  }

  const closeNav = () => {
    toggle.setAttribute("aria-expanded", "false");
    panel.classList.remove("is-open");
    overlay.classList.remove("is-open");
    document.body.classList.remove("nav-open");
  };

  const openNav = () => {
    toggle.setAttribute("aria-expanded", "true");
    panel.classList.add("is-open");
    overlay.classList.add("is-open");
    document.body.classList.add("nav-open");
  };

  toggle.addEventListener("click", () => {
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    if (expanded) {
      closeNav();
    } else {
      openNav();
    }
  });

  overlay.addEventListener("click", closeNav);
  panel.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeNav));

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeNav();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 992) {
      closeNav();
    }
  });
}

function initStickyHeader() {
  const header = document.querySelector(".site-header");

  if (!header) {
    return;
  }

  const syncHeader = () => {
    header.classList.toggle("scrolled", window.scrollY > 12);
  };

  syncHeader();
  document.addEventListener("scroll", syncHeader, { passive: true });
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const targetId = anchor.getAttribute("href");

      if (!targetId || targetId === "#") {
        return;
      }

      const target = document.querySelector(targetId);

      if (!target) {
        return;
      }

      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function initFilters() {
  document.querySelectorAll("[data-filter-group]").forEach((group) => {
    const buttons = group.querySelectorAll("[data-filter]");
    const targetSelector = group.getAttribute("data-filter-target");
    const items = targetSelector ? document.querySelectorAll(`${targetSelector} .filterable-item`) : [];

    if (!buttons.length || !items.length) {
      return;
    }

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const filter = button.dataset.filter || "all";

        buttons.forEach((item) => item.classList.toggle("is-active", item === button));

        items.forEach((item) => {
          const categories = (item.dataset.category || "").split(" ");
          const visible = filter === "all" || categories.includes(filter);
          item.classList.toggle("is-hidden", !visible);
        });
      });
    });
  });
}

function initFormHandlers() {
  document.querySelectorAll(".needs-validation").forEach((form) => {
    form.addEventListener("submit", (event) => {
      const successTarget = form.querySelector("[data-form-success]") || form.parentElement?.querySelector("[data-form-success]");

      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      } else {
        event.preventDefault();
        form.reset();
        form.classList.remove("was-validated");
        if (successTarget) {
          successTarget.classList.add("is-visible");
        }
      }

      form.classList.add("was-validated");
    });
  });
}

function initPasswordStrength() {
  document.querySelectorAll("[data-password-strength]").forEach((input) => {
    const wrapper = input.closest("[data-password-strength-wrap]");
    const bars = wrapper?.querySelectorAll(".password-strength span");
    const label = wrapper?.querySelector(".password-strength-text");

    if (!wrapper || !bars?.length || !label) {
      return;
    }

    input.addEventListener("input", () => {
      const value = input.value;
      let score = 0;

      if (value.length >= 8) score += 1;
      if (/[A-Z]/.test(value) && /[a-z]/.test(value)) score += 1;
      if (/\d/.test(value)) score += 1;
      if (/[^A-Za-z0-9]/.test(value)) score += 1;

      bars.forEach((bar, index) => {
        bar.classList.toggle("is-active", index < score);
      });

      if (score <= 1) {
        label.textContent = "Parola gücü: zayıf";
      } else if (score <= 3) {
        label.textContent = "Parola gücü: orta";
      } else {
        label.textContent = "Parola gücü: güçlü";
      }
    });
  });
}

function initCharts() {
  if (typeof window.Chart === "undefined") {
    return;
  }

  const buildCharts = () => {
    while (chartRegistry.length) {
      chartRegistry.pop().destroy();
    }

    const getColor = (name) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    const lineTargets = document.querySelectorAll("[data-chart='line']");
    const doughnutTargets = document.querySelectorAll("[data-chart='doughnut']");

    lineTargets.forEach((canvas) => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      chartRegistry.push(new window.Chart(ctx, {
        type: "line",
        data: {
          labels: ["Pts", "Sal", "Çar", "Per", "Cum", "Cts", "Paz"],
          datasets: [{
            label: "Otomasyon",
            data: [18, 28, 24, 36, 32, 44, 48],
            borderColor: getColor("--color-primary"),
            backgroundColor: "transparent",
            borderWidth: 3,
            pointRadius: 0,
            tension: 0.42
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: { grid: { color: "rgba(148,163,184,0.15)" }, ticks: { color: getColor("--color-text-muted") } },
            y: { grid: { color: "rgba(148,163,184,0.15)" }, ticks: { color: getColor("--color-text-muted") } }
          }
        }
      }));
    });

    doughnutTargets.forEach((canvas) => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      chartRegistry.push(new window.Chart(ctx, {
        type: "doughnut",
        data: {
          labels: ["Pazarlama", "Operasyon", "Destek"],
          datasets: [{
            data: [42, 31, 27],
            backgroundColor: [getColor("--color-primary"), getColor("--color-info"), getColor("--color-success")],
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "bottom",
              labels: { color: getColor("--color-text-muted"), boxWidth: 12 }
            }
          }
        }
      }));
    });
  };

  buildCharts();
  document.addEventListener("themechange", buildCharts);
}

function initSwipers() {
  if (typeof window.Swiper === "undefined") {
    return;
  }

  const container = document.querySelector(".testimonial-swiper");

  if (!container) {
    return;
  }

  new window.Swiper(container, {
    loop: true,
    speed: 700,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    },
    navigation: {
      nextEl: ".swiper-button-next-custom",
      prevEl: ".swiper-button-prev-custom"
    },
    breakpoints: {
      0: { slidesPerView: 1, spaceBetween: 16 },
      768: { slidesPerView: 2, spaceBetween: 20 },
      1200: { slidesPerView: 3, spaceBetween: 24 }
    }
  });
}

function initTooltips() {
  if (!window.bootstrap?.Tooltip) {
    return;
  }

  document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach((tooltipTriggerEl) => {
    new window.bootstrap.Tooltip(tooltipTriggerEl);
  });
}
