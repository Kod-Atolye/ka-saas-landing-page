"use strict";

window.KASaaS = window.KASaaS || {};

window.KASaaS.initVideoModal = function initVideoModal() {
  const modalElement = document.getElementById("videoModal");
  const iframe = modalElement?.querySelector("iframe");

  if (!modalElement || !iframe) {
    return;
  }

  const contentRoots = ["header", "main", "footer"].map((selector) => document.querySelector(selector)).filter(Boolean);

  modalElement.addEventListener("show.bs.modal", (event) => {
    const trigger = event.relatedTarget;
    const videoId = trigger?.getAttribute("data-video-id") || "dQw4w9WgXcQ";
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
    contentRoots.forEach((node) => {
      if (!modalElement.contains(node)) {
        node.setAttribute("aria-hidden", "true");
      }
    });
  });

  modalElement.addEventListener("hidden.bs.modal", () => {
    iframe.src = "about:blank";
    contentRoots.forEach((node) => node.removeAttribute("aria-hidden"));
  });
};
