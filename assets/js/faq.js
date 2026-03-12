"use strict";

window.KASaaS = window.KASaaS || {};

window.KASaaS.initFaq = function initFaq() {
  const accordions = document.querySelectorAll(".accordion");

  accordions.forEach((accordion) => {
    accordion.querySelectorAll(".accordion-collapse").forEach((collapse) => {
      collapse.addEventListener("show.bs.collapse", (event) => {
        accordion.querySelectorAll(".accordion-item").forEach((item) => item.classList.remove("active"));
        event.target.closest(".accordion-item")?.classList.add("active");
      });

      collapse.addEventListener("hide.bs.collapse", (event) => {
        event.target.closest(".accordion-item")?.classList.remove("active");
      });
    });
  });

  const hash = window.location.hash;

  if (!hash) {
    return;
  }

  const target = document.querySelector(hash);

  if (!target || !target.classList.contains("accordion-collapse")) {
    return;
  }

  const collapseInstance = window.bootstrap?.Collapse.getOrCreateInstance(target, { toggle: false });
  collapseInstance?.show();
  target.closest(".accordion-item")?.classList.add("active");
};
