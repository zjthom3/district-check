# Changelog

All notable changes to DistrictCheck are documented here.  
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [Unreleased]

---

## [2026-04-13] — Tool data audit

### Changed
- **ClassDojo** — critical → low; `vpat: 'Exists (2025)'`; `wcag: 'Specific claim'` (Sep 2025 ACR, WCAG 2.2 A/AA, VPAT 2.5, Level Access tested)
- **Kahoot** — high → low; `vpat: 'Exists (2024)'`; `wcag: 'Specific claim'` (Dec 2024 ACR, VPAT 2.5, WCAG 2.2 AA)
- **Edpuzzle** — high → low; `vpat: 'Exists (2025)'`; `wcag: 'Specific claim'` (Apr 2025 VPAT 2.5, WCAG 2.2)
- **Kami** — medium → low; `vpat: 'Exists (2024)'`; `wcag: 'Specific claim'` (Oct 2024 VPAT 2.5)
- **Book Creator** — medium → low; `vpat: 'Exists (2024)'`; `wcag: 'Specific claim'` (WCAG 2.2, Section 508, EN 301 549)
- **Nearpod** — high → medium; `vpat: 'Exists (2023)'`; `wcag: 'Specific claim'` (WCAG 2.0 AA; needs WCAG 2.1 update)
- **IXL** — high → medium; `vpat: 'Exists (confidential)'`; `wcag: 'Specific claim'` (self-authored ACR, distributed via account contact)
- **Padlet** — high → medium; `vpat: 'Exists (2024)'`; `wcag: 'Specific claim'` (WCAG 2.2 AA, partially conformant)
- **Boom Learning** — high → medium; `vpat: 'Exists (date unconfirmed)'` (four VPATs in help center; dates need manual verification)
- **PowerSchool** — high → medium; `wcag: 'Specific claim'` (WCAG 2.1 AA commitment; VPAT gated to account portal)
- **i-Ready** — high → medium; `wcag: 'Specific claim'` (WCAG 2.0 AA claimed as of 2019–20; no VPAT published)
- **Seesaw** — `vpat: 'Exists (2024)'` (Jan 2024 ACR, revised Nov 2025; WCAG 2.2 AA partially conformant)
- **CommonLit** — `wcag: 'Aspirational'` (WCAG 2.1 AA goal stated; no VPAT)
- seoOverrides updated for ClassDojo, Kahoot, Nearpod, Padlet to reflect new tier labels
- All tool pages and sitemap regenerated via `node generate-tool-pages.js`

### Notes
- 11 tools flagged for manual verification (BrainPOP, Flip, Discovery Education, Duolingo, Clever, Typing.com, Epic, Loom, DreamBox, Lexia, Amplify) — no search results found; existing data unchanged
- Next audit recommended: 2026-10-13 (6-month cycle)

### Added
- Netlify Forms replacing Google Forms for audit intake, homepage lead capture, and vendor applications
- `/thank-you/` confirmation page with context-aware payment CTAs
- Stripe products for Compliance Retainer ($500/month) and Vendor Certification ($999/year)
- `CHANGELOG.md`

---

## [2026-04-13] — Pipeline & infrastructure

### Added
- `_redirects` file: 301 redirects all `.html` URLs to clean Netlify URLs
- Two new comparison pages: `google-classroom-vs-canvas` and `nearpod-vs-pear-deck`
- Improved `toolSeo()` fallback meta descriptions in `generate-tool-pages.js`
- `seoOverrides` for Canvas, Kahoot, and Google Classroom tool pages

### Changed
- All canonical tags and `og:url` fields updated to clean URLs (no `.html` extension)
- Sitemap regenerated with clean URLs
- Homepage countdown JS handles post-deadline state dynamically
- Blog CTAs and homepage copy updated to post-enforcement framing
- `ada-title-ii-deadline-k12-districts` title and meta description reframed for CTR

---

## [2026-04-05] — SEO audit v2

### Added
- Blog posts: enforcement update, missed deadline guide
- Section 508 category index page
- Internal linking across blog, resources, and tool pages

### Changed
- Meta descriptions improved across all tool pages
- Schema markup (Article, FAQPage, BreadcrumbList) added to comparison and blog pages

---

## [2026-04-04] — Phase 2 schema and tool rollout

### Added
- Tool pages for all 49 tracked edtech tools
- Tools category index pages (LMS, Assessment, Communication, Curriculum, Section 508)
- `sitemap.xml` generated from `generate-tool-pages.js`
- Canvas vs Schoology comparison page

### Changed
- `generate-tool-pages.js` now generates tool pages, category indexes, and sitemap in one pass

---

## [2026-03-28] — Vendor program and blog hub

### Added
- `/vendors/` — DistrictCheck Verified badge program page
- `/blog/` — blog hub with posts on VPAT basics, ADA Title II deadline, and enforcement risk
- `/resources/` — FAQ, VPAT guide, and district checklist

---

## [2026-03-20] — Audit conversion page

### Added
- `/audit/` — compliance audit conversion page with pricing, deliverables, and intake CTA
- Stripe Payment Link for $1,500 pilot audit
- Accessibility improvements across homepage, blog, and tool pages

---

## [2026-03-10] — Site launch

### Added
- Initial DistrictCheck landing page with ADA compliance tool lookup
- Tool database with risk tiers (Critical, High, Medium, Low)
- VPAT status and WCAG claim fields per tool
- Free, no-signup lookup for K-12 district teams
