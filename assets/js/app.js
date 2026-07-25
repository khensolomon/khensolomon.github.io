/* app.js — theme toggle + scroll reveal. Vanilla, no dependencies. */
(function () {
  "use strict";

  var root = document.documentElement;
  var media = window.matchMedia("(prefers-color-scheme: dark)");
  var ORDER = ["auto", "light", "dark"];

  function resolve(pref) {
    if (pref === "dark") return "dark";
    if (pref === "light") return "light";
    return media.matches ? "dark" : "light";
  }

  function apply(pref) {
    root.setAttribute("data-theme", resolve(pref));
    root.setAttribute("data-theme-pref", pref);
    document.querySelectorAll(".theme-toggle").forEach(function (btn) {
      btn.setAttribute("aria-label", "Color theme: " + pref + " (click to change)");
    });
  }

  // toggle cycles auto -> light -> dark
  document.querySelectorAll(".theme-toggle").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var current = root.getAttribute("data-theme-pref") || "auto";
      var next = ORDER[(ORDER.indexOf(current) + 1) % ORDER.length];
      try { localStorage.setItem("theme", next); } catch (e) {}
      apply(next);
    });
  });

  // re-resolve when the OS theme changes and we're in auto
  media.addEventListener("change", function () {
    if ((root.getAttribute("data-theme-pref") || "auto") === "auto") apply("auto");
  });

  // sync label on load with whatever the inline head script decided
  apply(root.getAttribute("data-theme-pref") || "auto");

  /* --- scroll reveal --- */
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var targets = document.querySelectorAll(".reveal-on-scroll");
  if (!reduce && "IntersectionObserver" in window && targets.length) {
    root.classList.add("js-reveal"); // enables the hidden start state in CSS
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -10% 0px" });
    targets.forEach(function (el) { io.observe(el); });
  }
})();