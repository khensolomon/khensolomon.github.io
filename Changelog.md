---
layout: docs
permalink: /changelog/
in_nav: true
title: "Changelog"
description: "Notable changes, newest first."
category: "Reference"
nav_order: 99
---

Versions use `yy.mm.dd` — the date the change shipped. Newest at the top.

## 26.07.25e

- Fixed the hero slogan and subject not appearing: the weekday index used a
  filter inside the array subscript, which Liquid can't evaluate, so the
  build-day entry came back empty and the optional fields were dropped. The
  index is now computed first, and the fields are always emitted (hidden when a
  day genuinely has none) so the client-side swap can fill them per weekday.
- Simplified the eyebrow: removed the `[*]` mark and dimmed the text.
- Sidebar cross-link now reads "Home" with a house icon instead of "Lethil".

## 26.07.25d

- The hero now rotates by weekday, driven by `_data/hero.yml` (index 1 = Monday
  … 7 = Sunday; fewer entries mean the last one fills the remaining days).
- Optional per-date overrides (`on:` a fixed date or `every:` a yearly month-day)
  can replace the day's content or reuse another day via `use:`.
- Selection runs in the browser so it changes day to day without a rebuild; the
  build-day copy is still rendered server-side (works with JS off, no flash).
- Renamed `hero__name` / `hero__role` / `hero__tagline` to `hero__caption` /
  `hero__slogan` / `hero__subject`; the eyebrow now shows the weekday and date.

## 26.07.25c

- Renamed the hero banner class from `.highlight` to `.feature` so it no longer
  collides with Rouge's `.highlight` on code blocks in the docs.
- Moved this changelog to the repo root as `Changelog.md` (still shown in the
  sidebar and search).
- On phones the theme switch moves into the sidebar and search opens as a
  full-screen overlay with a back button.
- Bumped the base text size a little, more so on phones.
- Cards reflow on phones: art pairs with the name on the top row, with the
  blurb and links full width beneath — no more empty space under the icon.

## 26.07.25b

- Added an optional top highlight in the hero for a current/recent focus
  ("Now building"). It renders only when set in `index.md` — no gap otherwise.
- New "Extensions & packages" section (Lesion) using the same card include;
  images are now optional and GNOME symbolic SVGs adapt to the theme.
- Softened hover borders from the loud accent to a gentle neutral.
- Rebuilt the menu button icon as three flush bars so it centers on whole
  pixels at any DPI.
- Fixed the hero name showing the filename (`page.name` collided with a Jekyll
  built-in; renamed to `fullname`).
- Reworded the role and tagline to be about language, scripts, and music
  generally, without naming a country.

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
