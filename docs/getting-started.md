---
title: "Getting started"
description: "Run the site locally and add your first page."
category: "Guide"
nav_order: 1
in_nav: true
---

Every page in the sidebar and the search index comes from one contract: a
Markdown file under `docs/` with three front-matter keys.

## The page contract

```yaml
---
title: "Getting started"   # shown in sidebar, tab title, search
description: "One line."    # shown under the heading
category: "Guide"           # eyebrow label + search category
nav_order: 1                # sidebar ordering (use 01, 02… past 9)
---
```

The layout is assigned automatically by `_config.yml`, so you never repeat
`layout: docs`.

## Run it locally

```bash
bundle exec jekyll serve --livereload
```

Then open `http://localhost:4000`.

## Add a page

1. Create `docs/how-to-deploy.md`.
2. Give it `title`, `category`, and `nav_order: 2`.
3. Write Markdown. It appears in the sidebar and search on the next build.

> Headings, code blocks, tables, and blockquotes are all styled by
> `assets/css/style.css`. No per-page CSS needed.
