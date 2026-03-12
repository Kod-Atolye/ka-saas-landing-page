"use strict";

window.KASaaS = window.KASaaS || {};

window.KASaaS.initPricingToggle = function initPricingToggle() {
  const pricingSwitches = document.querySelectorAll("[data-billing-toggle]");

  pricingSwitches.forEach((toggle) => {
    const buttons = toggle.querySelectorAll("[data-billing-option]");
    const scope = toggle.closest("[data-billing-scope]") || document;
    const priceTargets = scope.querySelectorAll("[data-plan-price]");
    const yearlyBadges = scope.querySelectorAll("[data-yearly-badge]");

    const setMode = (mode) => {
      buttons.forEach((button) => {
        const isActive = button.dataset.billingOption === mode;
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
      });

      priceTargets.forEach((item) => {
        const value = mode === "yearly" ? item.dataset.priceYearly : item.dataset.priceMonthly;

        if (value) {
          item.textContent = value;
        }
      });

      yearlyBadges.forEach((badge) => {
        badge.classList.toggle("is-visible", mode === "yearly");
      });

      toggle.dataset.billingState = mode;
    };

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        setMode(button.dataset.billingOption || "monthly");
      });
    });

    setMode(toggle.dataset.billingState || "monthly");
  });
};
