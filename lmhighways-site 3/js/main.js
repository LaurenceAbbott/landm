// L&M Highways — shared site behaviour
(function () {
  "use strict";

  // Mobile nav
  var toggle = document.getElementById("navToggle");
  var closeBtn = document.getElementById("navClose");
  var mobileNav = document.getElementById("navMobile");

  function openNav() {
    if (!mobileNav) return;
    mobileNav.classList.add("is-open");
    document.body.style.overflow = "hidden";
    toggle && toggle.setAttribute("aria-expanded", "true");
  }
  function closeNav() {
    if (!mobileNav) return;
    mobileNav.classList.remove("is-open");
    document.body.style.overflow = "";
    toggle && toggle.setAttribute("aria-expanded", "false");
  }
  toggle && toggle.addEventListener("click", openNav);
  closeBtn && closeBtn.addEventListener("click", closeNav);
  mobileNav && mobileNav.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", closeNav);
  });

  // Footer year
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Auto-tag scroll-reveal targets site-wide so every page feels alive,
  // without hand-adding a class to every element in every file.
  var autoRevealSelectors = [
    ".card", ".stat", ".step", ".work-card", ".info-block",
    ".faq-item", ".hero-panel", ".section-head"
  ];
  document.querySelectorAll(autoRevealSelectors.join(",")).forEach(function (el, i) {
    if (!el.classList.contains("reveal")) {
      el.classList.add("reveal");
      el.style.transitionDelay = (i % 6) * 60 + "ms";
    }
  });

  // Scroll reveal — elements are visible by default in CSS; only once we're about
  // to observe them do we arm the hidden state, so there's never a moment where
  // content depends on JS/IO succeeding to be seen.
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -8% 0px" }
    );
    revealEls.forEach(function (el) {
      el.classList.add("reveal-init");
      io.observe(el);
    });
    // Safety net: if anything is ever missed (e.g. a layout edge case), reveal it
    // anyway after a short delay rather than leaving it invisible forever.
    setTimeout(function () {
      document.querySelectorAll(".reveal-init:not(.is-visible)").forEach(function (el) {
        el.classList.add("is-visible");
      });
    }, 2500);
  }

  // Our Work — category filter
  var filterButtons = document.querySelectorAll(".filter-btn");
  var workCards = document.querySelectorAll("[data-category]");
  if (filterButtons.length && workCards.length) {
    filterButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        filterButtons.forEach(function (b) { b.classList.remove("is-active"); });
        btn.classList.add("is-active");
        var cat = btn.getAttribute("data-filter");
        workCards.forEach(function (card) {
          var show = cat === "all" || card.getAttribute("data-category") === cat;
          card.style.display = show ? "" : "none";
        });
      });
    });
  }

  // Contact form — static placeholder (no backend wired up yet)
  var form = document.getElementById("quoteForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var note = document.getElementById("formStatus");
      if (note) {
        note.textContent =
          "This form isn't connected to an inbox yet — please email enquiries@lmhighways.co.uk directly, or call us, until it's wired up.";
      }
    });
  }
})();
