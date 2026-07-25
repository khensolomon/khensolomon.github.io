/* search.js — fetches /search.json on first use, filters client-side.
   Three presentations, one state machine (box.classList 'is-open'):
     - docs desktop:  input always visible, dropdown panel
     - home desktop:  collapsible pill (icon → input)
     - phones:        icon → full-screen overlay (back button + input + results)
   CSS decides what 'is-open' looks like per width; JS just manages state. */
(function () {
  "use strict";

  var box = document.querySelector("[data-search]");
  if (!box) return;

  var input    = box.querySelector("[data-search-input]");
  var panel    = box.querySelector("[data-search-panel]");
  var results  = box.querySelector("[data-search-results]");
  var toggle   = box.querySelector("[data-search-toggle]");
  var closeBtn = box.querySelector("[data-search-close]");
  var URL_     = (window.SITE && window.SITE.searchUrl) || "/search.json";
  var mqPhone  = window.matchMedia("(max-width: 699.98px)");

  var index = null, loading = false, focusIdx = -1;

  function load() {
    if (index || loading) return;
    loading = true;
    fetch(URL_)
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(function (data) { index = data; if (document.activeElement === input) run(input.value); })
      .catch(function () { index = []; renderError(); });
  }

  function renderError() {
    results.innerHTML = '<li class="search__empty">Search index unavailable. Try reloading the page.</li>';
    showPanel();
  }

  function escapeHtml(s) {
    return s.replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  function snippet(text, q) {
    var i = text.toLowerCase().indexOf(q.toLowerCase());
    var start = Math.max(0, i - 40);
    var slice = (start > 0 ? "…" : "") + text.slice(start, start + 140);
    var rx = new RegExp("(" + q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")", "ig");
    return escapeHtml(slice).replace(rx, "<mark>$1</mark>");
  }

  function score(item, q) {
    var t = item.title.toLowerCase(), c = (item.content || "").toLowerCase();
    if (t === q) return 100;
    if (t.indexOf(q) === 0) return 60;
    if (t.indexOf(q) > -1) return 40;
    if (c.indexOf(q) > -1) return 10;
    return 0;
  }

  function run(raw) {
    var q = raw.trim().toLowerCase();
    focusIdx = -1;
    if (!q) { hidePanel(); return; }
    if (!index) { load(); return; }

    var hits = index
      .map(function (it) { return { it: it, s: score(it, q) }; })
      .filter(function (x) { return x.s > 0; })
      .sort(function (a, b) { return b.s - a.s; })
      .slice(0, 8);

    if (!hits.length) {
      results.innerHTML = '<li class="search__empty">No matches for “' + escapeHtml(raw) + '”.</li>';
      showPanel();
      return;
    }

    results.innerHTML = hits.map(function (x) {
      var it = x.it;
      return '<li role="option"><a href="' + it.url + '">' +
        '<span class="search__rcat">' + escapeHtml(it.category || "Docs") + '</span> ' +
        '<span class="search__rtitle">' + escapeHtml(it.title) + '</span>' +
        '<div class="search__rsnip">' + snippet(it.content || "", q) + '</div>' +
        '</a></li>';
    }).join("");
    showPanel();
  }

  function showPanel() { panel.hidden = false; }
  function hidePanel() { panel.hidden = true; focusIdx = -1; }

  function isCollapsible() { return box.classList.contains("search--collapsible"); }

  /* ---- open / close (shared by collapsible pill and phone overlay) ------- */
  function openSearch() {
    box.classList.add("is-open");
    if (toggle) toggle.setAttribute("aria-expanded", "true");
    input.removeAttribute("tabindex");
    if (mqPhone.matches) document.body.classList.add("search-lock");
    load();
    requestAnimationFrame(function () { input.focus(); });
  }

  function closeSearch() {
    box.classList.remove("is-open");
    if (toggle) toggle.setAttribute("aria-expanded", "false");
    if (isCollapsible()) input.setAttribute("tabindex", "-1");
    input.value = "";
    document.body.classList.remove("search-lock");
    hidePanel();
  }

  if (toggle) {
    toggle.addEventListener("click", function () {
      if (box.classList.contains("is-open")) closeSearch(); else openSearch();
    });
  }
  if (closeBtn) {
    closeBtn.addEventListener("click", function () {
      closeSearch();
      if (toggle) toggle.focus();
    });
  }

  /* if the viewport grows out of phone width while the overlay is open, drop
     the scroll lock so the desktop layout isn't left frozen */
  mqPhone.addEventListener("change", function (e) {
    if (!e.matches) document.body.classList.remove("search-lock");
  });

  /* ---- keyboard + result navigation ------------------------------------- */
  function linkEls() { return Array.prototype.slice.call(results.querySelectorAll("a")); }

  function move(dir) {
    var els = linkEls();
    if (!els.length) return;
    focusIdx = (focusIdx + dir + els.length) % els.length;
    els.forEach(function (a, i) { a.classList.toggle("is-focused", i === focusIdx); });
    els[focusIdx].scrollIntoView({ block: "nearest" });
  }

  var debounce;
  input.addEventListener("input", function () {
    clearTimeout(debounce);
    debounce = setTimeout(function () { run(input.value); }, 120);
  });
  input.addEventListener("focus", load);

  input.addEventListener("keydown", function (e) {
    if (e.key === "ArrowDown") { e.preventDefault(); move(1); }
    else if (e.key === "ArrowUp") { e.preventDefault(); move(-1); }
    else if (e.key === "Enter") {
      var els = linkEls();
      var target = els[focusIdx] || els[0];
      if (target) { e.preventDefault(); window.location.href = target.getAttribute("href"); }
    } else if (e.key === "Escape") {
      if (box.classList.contains("is-open")) { closeSearch(); toggle && toggle.focus(); }
      else { hidePanel(); input.blur(); }
    }
  });

  /* ---- click-away (desktop only; the overlay owns the whole screen) ------ */
  document.addEventListener("click", function (e) {
    if (box.contains(e.target)) return;
    hidePanel();
    if (!mqPhone.matches && isCollapsible() && !input.value.trim()) closeSearch();
  });
})();
