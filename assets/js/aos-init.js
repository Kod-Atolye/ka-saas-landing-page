"use strict";

window.KASaaS = window.KASaaS || {};

window.KASaaS.initAOS = function initAOS() {
  if (typeof window.AOS === "undefined") {
    return;
  }

  window.AOS.init({
    duration: 600,
    easing: "ease-out-cubic",
    once: true,
    offset: 80,
    delay: 0
  });
};
