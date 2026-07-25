/* search.js — fetches /search.json on first use and filters client-side.
   Handles both modes of _includes/search.html:
     - docs:  input always visible
     - home:  .search--collapsible — icon button expands into the input */
(function () {
  "use strict";

  var box = document.querySelector("[data-search]");
  if (!box) return;

  var input   = box.querySelector("[data-search-input]");
  var panel   = box.querySelector("[data-search-panel]");
  var results = box.querySelector("[data-search-results]");
  var toggle  = box.querySelector("[data-search-toggle]");
  var URL_    = (window.SITE && window.SITE.searchUrl) || "/search.json";

  var index = null;     // loaded lazily
  var loading = false;
  var focusIdx = -1;

  function load() {
    if (index || loading) return;
    loading = true;
    fetch(URL_)
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(function (data) { index = data; if (document.activeElement === input) run(input.value); })
      .catch(function () { index = []; renderError(); });
  }

  function renderError() {
    results.innerHTML =
      '<li class="search__empty">Search index unavailable. Try reloading the page.</li>';
    open();
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
    var safe = escapeHtml(slice);
    var rx = new RegExp("(" + q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")", "ig");
    return safe.replace(rx, "<mark>$1</mark>");
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
    if (!q) { close(); return; }
    if (!index) { load(); return; }

    var hits = index
      .map(function (it) { return { it: it, s: score(it, q) }; })
      .filter(function (x) { return x.s > 0; })
      .sort(function (a, b) { return b.s - a.s; })
      .slice(0, 8);

    if (!hits.length) {
      results.innerHTML = '<li class="search__empty">No matches for “' + escapeHtml(raw) + '”.</li>';
      open();
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
    open();
  }

  function open()  { panel.hidden = false; }
  function close() { panel.hidden = true; focusIdx = -1; }

  /* ---- collapsible mode (home) ------------------------------------------ */
  function isCollapsible() { return box.classList.contains("search--collapsible"); }

  function expand() {
    box.classList.add("is-open");
    if (toggle) toggle.setAttribute("aria-expanded", "true");
    input.removeAttribute("tabindex");
    load();
    // focus after the width transition has a frame to start, so the caret
    // doesn't appear in a zero-width box
    requestAnimationFrame(function () { input.focus(); });
  }

  function collapse() {
    box.classList.remove("is-open");
    if (toggle) toggle.setAttribute("aria-expanded", "false");
    input.setAttribute("tabindex", "-1");
    input.value = "";
    close();
  }

  if (toggle) {
    toggle.addEventListener("click", function () {
      if (box.classList.contains("is-open")) collapse(); else expand();
    });
  }

  /* ---- shared behavior --------------------------------------------------- */
  function links() { return Array.prototype.slice.call(results.querySelectorAll("a")); }

  function move(dir) {
    var els = links();
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
      var els = links();
      var target = els[focusIdx] || els[0];
      if (target) { e.preventDefault(); window.location.href = target.getAttribute("href"); }
    } else if (e.key === "Escape") {
      if (isCollapsible()) { collapse(); toggle && toggle.focus(); }
      else { close(); input.blur(); }
    }
  });

  document.addEventListener("click", function (e) {
    if (box.contains(e.target)) return;
    close();
    // clicking away from an empty expanded search collapses it back to the icon
    if (isCollapsible() && !input.value.trim()) collapse();
  });
})();
