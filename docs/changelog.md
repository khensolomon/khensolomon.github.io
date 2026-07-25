---
title: "Changelog"
description: "Notable changes, newest first."
category: "Reference"
nav_order: 99
---

Versions use `yy.mm.dd` — the date the change shipped. Newest at the top.

## 26.07.25

- Home now shows real project cards (MyOrdbok, Lai Siangtho, Zaideih) with
  short descriptions and store links, driven by front-matter data — no raw
  HTML in `index.md`.
- Header and sidebar drop the `[*]` / `[>]` prefixes; "Docs" is now
  capitalized in both places.
- Hero links point at `myordbok.com` and `zaideih.com`.
- Added this changelog.

## 26.07.22

- Reworked the header and navigation: one global full-height sidebar shared by
  Home and Docs, hidden by default on Home and open by default on Docs.
- Opening the sidebar resizes the content on desktop/tablet (no horizontal
  scrollbar) and pushes it on mobile.
- Search is a single collapsible box on Home (icon expands into the input) and
  always visible on Docs. Its radius matches the theme toggle.
- Icon buttons unified at 35×35 with an 8px radius; the menu button animates
  between a hamburger and an X.
- Added a Pages workflow that deploys only on commits starting with `deploy:`.

## 26.06.20

- Initial site: portfolio Home + docs, pure-CSS theming (light/dark/auto),
  client-side search, left-anchored layout.
