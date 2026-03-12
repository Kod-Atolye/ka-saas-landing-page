"use strict";

window.KASaaS = window.KASaaS || {};

window.KASaaS.initCounters = function initCounters() {
  const counters = document.querySelectorAll("[data-counter]");

  if (!counters.length) {
    return;
  }

  const formatNumber = (value, decimals, suffix, prefix) => {
    const safeValue = Number(value);

    if (safeValue >= 1000000) {
      return `${prefix}${(safeValue / 1000000).toFixed(decimals)}M${suffix}`;
    }

    if (safeValue >= 10000) {
      return `${prefix}${(safeValue / 1000).toFixed(decimals)}K${suffix}`;
    }

    return `${prefix}${safeValue.toFixed(decimals).replace(".", ",")}${suffix}`;
  };

  const animateCounter = (element) => {
    if (element.dataset.counted === "true") {
      return;
    }

    const target = Number(element.dataset.target || "0");
    const decimals = Number(element.dataset.decimals || "0");
    const suffix = element.dataset.suffix || "";
    const prefix = element.dataset.prefix || "";
    const duration = 1600;
    const start = performance.now();

    const easeOutCubic = (time) => 1 - Math.pow(1 - time, 3);

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const current = target * easeOutCubic(progress);
      element.textContent = formatNumber(current, progress >= 1 ? decimals : Math.min(decimals, 1), suffix, prefix);

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        element.dataset.counted = "true";
      }
    };

    requestAnimationFrame(tick);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.35 });

  counters.forEach((counter) => observer.observe(counter));
};
