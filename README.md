# DistrictCheck

Static marketing site and content hub for ADA Title II and K-12 edtech accessibility.

## Source Of Truth

- `generate-tool-pages.js` is the source of truth for:
  - generated tool detail pages in `tools/*.html`
  - the generated tools hub at `tools/index.html`
  - `sitemap.xml`
- Hand-authored pages are maintained directly in:
  - `index.html`
  - `blog/`
  - `resources/`
  - `vendors/`
  - nested tool category pages such as `tools/lms/`, `tools/assessment/`, `tools/communication/`, `tools/content/`, and `tools/section-508/`

## Editing Rules

- If a change applies to all tool pages, make it in `generate-tool-pages.js`, then run:

```bash
node generate-tool-pages.js
```

- Do not hand-edit generated files in `tools/*.html` unless you also port the same change back into the generator.
- If you add a hand-authored page that should be indexable, make sure it is also represented in the sitemap source inside `generate-tool-pages.js`.

## Current Repo Conventions

- Private/internal planning files live in underscore-prefixed directories such as `_seo/`, `_accessibility/`, and `_marketing/`.
- Public content pages should include canonical tags, OG/Twitter metadata, favicon, and `robots` directives.
