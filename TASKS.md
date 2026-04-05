# Tasks
## Agent Instructions
You are working in this repository as an autonomous agent. Before taking any action, read this file completely. Follow these rules:
1. **Read before acting.** Understand the full task list and current focus before writing any code.
2. **Work the queue.** Execute tasks in order unless dependencies or context require otherwise. Do not skip tasks without noting why.
3. **Update as you go.** Mark tasks `[x]` when complete. If you leave a task incomplete, add a note explaining why and what's blocked.
4. **Stay scoped.** Do not refactor, reorganize, or add features outside the current task list. If you identify something worth doing, add it to the backlog — don't just do it.
5. **On ambiguity, stop.** If a task is unclear or has multiple valid interpretations, do not guess. Surface the ambiguity as a comment below the task and halt until resolved.
6. **Leave the repo cleaner than you found it.** No dead code, no TODO comments, no console.logs left behind.

---

## File Organization Rules
- All new pages follow the canonical directory structure: content pages in `/tools/`, `/blog/`, or root-level for standalone resources (e.g. `/resources/vendor-vpat-request-template.html`)
- Private/internal files (audits, briefs, planning docs) go in underscore-prefixed directories: `_seo/`, `_accessibility/`, `_marketing/`
- File names are lowercase, hyphenated, descriptive (e.g. `wcag-checklist-edtech.html`, not `checklist.html`)
- Every new HTML page must include: canonical tag, OG/Twitter meta, favicon, robots `index,follow`, consistent nav + footer matching the existing site design
- Every new tool page must include: FAQ schema (2–3 questions), risk tier badge, VPAT status, next steps CTA
- Do not touch files outside the scope of the current task

---

## Reference Files
- Campaign plan: `_marketing/organic-growth-campaign-plan.md`
- SEO audit (current): `_seo/seo-audit-v3.md`
- Content briefs (tool pages): `_seo/content-briefs-top-tools.md`
- Existing tool pages: `tools/*.html` — match structure and style exactly
- Existing blog posts: `blog/*.html` — match structure and style exactly

---

## Current Focus
**Phase 0–1 (Weeks 1–4): Unlock indexation + build the content gap pages that represent the clearest keyword opportunities.**

The site is technically solid (SEO score 8/10) but has zero Google indexation and zero off-site authority. No traffic will come until indexation is resolved. In parallel, the four highest-opportunity content gap pages need to be built — these are the fastest path to long-tail rankings once the site is indexed.

---

## In Progress
- [ ] **Add email capture CTA to homepage and tool lookup result** — inline CTA below the tool result: "Want a full compliance report for your district? Enter your work email." Capture email + district name. Use a simple HTML form pointing to a Beehiiv/ConvertKit embed URL (placeholder `YOUR_FORM_EMBED_URL` if not yet decided). Place a second CTA at the bottom of every blog post. This is a prerequisite for all distribution work — do not start driving traffic before this exists.
  > **Dependency:** Revenue model and email platform must be decided by Jerel before the form embed URL is known. Use a placeholder and flag clearly in the HTML with a `<!-- TODO: replace with real embed URL -->` comment.

---

## Up Next

### Phase 0 — Unlock Indexation ✅ Complete
> All GSC actions confirmed complete as of April 4, 2026. Google is now crawling — indexation typically follows within 1–4 weeks. Monitor GSC Coverage report weekly.
- [x] ⚠️ **[HUMAN]** Submit `sitemap.xml` to Google Search Console → Indexing → Sitemaps
- [x] ⚠️ **[HUMAN]** Use GSC URL Inspection to request indexing for: `/`, `/blog/ada-title-ii-deadline-k12-districts.html`, `/blog/what-is-a-vpat-school-districts.html`, `/tools/classdojo.html`, `/tools/google-classroom.html`, `/tools/canvas.html`
- [x] ⚠️ **[HUMAN]** Confirm GSC ownership verification is active (file `google838396fbdba882e4.html` is at root — confirmed green in GSC)

### Phase 1 — Content Gap Pages (Weeks 1–4) ✅ Complete

#### 1. Vendor VPAT Request Email Template Page
- [x] Build `/resources/vendor-vpat-request-template.html` — built April 5, 2026
  - Target keyword: "email template request VPAT from vendor" / "edtech vendor accessibility outreach"
  - Content: Intro paragraph explaining why districts need a VPAT in writing, then 2–3 copy-paste email template blocks (initial request, follow-up, escalation). Each block in a styled `<pre>` or card with a "Copy" button (plain JS, no dependencies).
  - CTA at bottom: link to the WCAG checklist page (once built) and a "Check your tool's status" search link back to the homepage
  - Include FAQ schema: "What is a VPAT?", "How do I request a VPAT from an edtech vendor?", "What if a vendor won't provide a VPAT?"
  - Estimated effort: 2–3 hours
  - Priority: **P0** — quick win, highly shareable, natural link target from all high/critical risk tool pages
  - After building: add a "Request a VPAT from this vendor →" link to every HIGH and CRITICAL risk tool page pointing to this resource

#### 2. WCAG 2.1 AA Edtech Compliance Checklist
- [x] Build `/resources/wcag-checklist-edtech.html` — built April 5, 2026 (interactive HTML version with 38-item checklist, progress tracker, filter by principle; PDF version TODO: needs email embed URL)
  - Target keyword: "wcag 2.1 aa edtech checklist" / "ada compliance checklist k-12 district"
  - Content: Intro (why WCAG 2.1 AA applies to K-12 edtech procurement under ADA Title II), then a structured checklist organized by WCAG principle (Perceivable, Operable, Understandable, Robust). For each criterion, include: the criterion code + name, a plain-English explanation, and a K-12 edtech-specific example (e.g. "1.1.1 Non-text content — student avatar images in ClassDojo must have descriptive alt text or be marked decorative").
  - Format: interactive HTML checklist (checkboxes, print-friendly CSS). Add a "Download as PDF" link (static PDF version at `/resources/wcag-checklist-edtech.pdf`).
  - The PDF version is the primary lead magnet — gate it behind the email capture form.
  - Include FAQ schema: "What is WCAG 2.1 AA?", "Does WCAG 2.1 AA apply to K-12 schools?", "How do I use a WCAG checklist for edtech procurement?"
  - Estimated effort: 4–5 hours
  - Priority: **P0** — featured snippet candidate; PDF = top lead magnet

#### 3. Category Landing Pages (build in this order)

- [x] Build `/tools/lms/index.html` — "ADA Compliant LMS Options for K-12 Districts" — built April 5, 2026
  - Target keyword: "ada compliant lms k-12" / "accessible learning management system schools"
  - Tools to include: Canvas, Schoology, Google Classroom, Microsoft Teams for Education
  - Content structure: intro (why LMS accessibility matters most — it's the platform students spend the most time in), comparison table (tool name | risk tier | VPAT status | WCAG claim), then a card for each tool linking to its full tool page, then a "How to evaluate your LMS for ADA compliance" section (3–4 actionable steps), then FAQ schema (3 questions)
  - Priority: **P1**

- [x] Build `/tools/assessment/index.html` — "ADA Compliant Assessment Tools for K-12 Districts" — built April 5, 2026
  - Target keyword: "accessible assessment tools schools" / "ada compliant assessment platform k-12"
  - Tools to include: Edulastic, Formative, GoFormative, Kahoot, Quizlet
  - Same structure as LMS page. Note in intro: assessment tools are especially high-stakes — inaccessible tools can prevent students with disabilities from demonstrating their knowledge on required assessments.
  - Priority: **P1**

- [x] Build `/tools/communication/index.html` — "ADA Compliant Communication Tools for K-12 Districts" — built April 5, 2026
  - Target keyword: "ada compliant school communication tools" / "accessible parent communication platform k-12"
  - Tools to include: ClassDojo, Remind, ParentSquare, Seesaw
  - Same structure. Note in intro: family communication tools reach parents with disabilities too — ADA Title II applies to district communications broadly, not just classroom tools.
  - Priority: **P1**

- [x] Build `/tools/content/index.html` — "ADA Compliant Content & Curriculum Tools for K-12 Districts" — built April 5, 2026
  - Target keyword: "accessible edtech content tools schools" / "ada compliant curriculum platform k-12"
  - Tools to include: Newsela, CommonLit, ReadWorks, Khan Academy, BrainPOP, Discovery Education
  - Same structure.
  - Priority: **P2**

#### 4. ADA Title II 30-Day Compliance Roadmap
- [x] Build `/blog/ada-title-ii-30-day-compliance-roadmap.html` — built April 5, 2026
  - Target keyword: "ada title ii compliance checklist school district" / "how to prepare for ada title ii k-12"
  - Content: intro (the DOJ 2024 final rule, what it requires, who's affected), then a numbered 30-day roadmap with specific, actionable steps organized by week. Week 1: inventory all deployed edtech tools. Week 2: check VPAT status for each (link to DistrictCheck). Week 3: contact vendors with no VPAT (link to vendor template). Week 4: document findings and establish ongoing review cadence.
  - Include Article schema. Link to: WCAG checklist, vendor template, relevant tool pages (especially ClassDojo, Edulastic).
  - Priority: **P1** — featured snippet candidate

---

### Phase 2 — Schema + New Tool Pages (Weeks 5–8)

#### Schema
- [ ] Add `BreadcrumbList` JSON-LD schema to all blog posts (`blog/*.html`)
  - Format: `Home > Blog > [Post Title]`
  - Reference: https://schema.org/BreadcrumbList
  - Estimated effort: 1 hour for all 4 posts

- [ ] Add `BreadcrumbList` JSON-LD schema to all tool pages (`tools/*.html`)
  - Format: `Home > Tools > [Tool Name]`
  - Estimated effort: 2 hours (script or batch)

- [ ] Add `BreadcrumbList` JSON-LD schema to category pages (once built)
  - Format: `Home > Tools > [Category]`

#### New Tool Pages (Batch 1 — target 10 pages, prioritized by district adoption)
> Use the existing tool page HTML as the template. Match structure, risk tier format, FAQ schema, and internal linking exactly. Each page needs 350–500 words of unique prose — no copy-paste from other tool pages. Refer to `_seo/content-briefs-top-tools.md` for the content angle framework.

- [ ] `/tools/zoom.html` — Zoom for Education
- [ ] `/tools/clever.html` — Clever (SSO/rostering — moderate risk, widely deployed)
- [ ] `/tools/powerschool.html` — PowerSchool SIS
- [ ] `/tools/microsoft-365.html` — Microsoft 365 for Education
- [ ] `/tools/canva-edu.html` — Canva for Education *(check if alias of existing `canva-for-education.html`)*
- [ ] `/tools/typing-com.html` — Typing.com
- [ ] `/tools/duolingo-for-schools.html` — Duolingo for Schools *(check if alias of existing `duolingo.html`)*
- [ ] `/tools/epic.html` — Epic! (digital reading platform)
- [ ] `/tools/edpuzzle.html` — Edpuzzle
- [ ] `/tools/kami.html` — Kami

> For each page: research the vendor's current VPAT/ACR status, assign a risk tier (Critical / High / Medium / Low) using the same rubric as existing tool pages, write the 5 content angles from the brief template, add 2–3 FAQ schema questions, add internal links to relevant category pages.

#### New Tool Pages (Batch 2 — 10 more pages)
- [ ] `/tools/google-forms.html` — Google Forms
- [ ] `/tools/flipgrid-studio.html` — check if this should be a redirect to existing Flip/Flipgrid page
- [~] `/tools/screencastify.html` — already exists — skip — verified: tools/screencastify.html exists
- [ ] `/tools/loom.html` — Loom for Education
- [ ] `/tools/notion.html` — Notion (growing in secondary ed)
- [ ] `/tools/freckle.html` — Freckle (Renaissance)
- [ ] `/tools/dreambox.html` — DreamBox Learning
- [ ] `/tools/iready.html` — i-Ready (Curriculum Associates)
- [ ] `/tools/lexia.html` — Lexia Core5
- [ ] `/tools/amplify.html` — Amplify ELA/Science

---

### Phase 3 — Conversion Layer (Weeks 9–10)

- [ ] Build `/pro/index.html` — DistrictCheck Pro landing page
  > **Dependency:** Jerel must decide on pricing, feature set, and payment processor before this page can be finalized. Scaffold the page structure and use placeholder pricing/features. Flag all placeholder content with `<!-- TODO: confirm with Jerel -->` comments.
  - Above the fold: headline, 3-bullet value prop, email/district name capture form or Stripe payment button
  - Features section: what Pro includes vs. free (batch scanning, compliance report PDF export, monitoring alerts, documentation trail)
  - Pricing section: placeholder — `$499/district/year` as working assumption
  - CTA: "Join the early access waitlist" or "Start your district audit"
  - No FAQ schema needed on this page — it's a conversion page, not an informational one

- [ ] Add "Get a full district report →" CTA to every tool page linking to `/pro/index.html`
  - Place below the "Recommended next steps" section
  - Style as a secondary CTA (accent color, outlined button), not competing with the primary tool lookup

---

## Backlog

- [x] Build `/resources/ada-title-ii-faq.html` — comprehensive FAQ page targeting long-tail informational queries about the DOJ rule (what it covers, who it applies to, deadlines, enforcement) — built April 5, 2026
- [x] Build `/tools/section-508/index.html` — "Section 508 vs ADA Title II: What K-12 Districts Need to Know" (crossover SEO for Section 508 queries) — built April 5, 2026
- [x] Add "DistrictCheck Verified" badge program infrastructure — vendor-facing landing page at `/vendors/index.html` explaining the badge, how to apply, pricing — built April 5, 2026
- [x] Build `/tools/lms/canvas-vs-schoology.html` — comparison page targeting "canvas vs schoology accessibility" (medium-volume, very low competition) — built April 5, 2026
- [x] Expand blog: "What Happens After the ADA Title II Deadline? Enforcement Update" — published `/blog/ada-title-ii-enforcement-update.html` April 5, 2026
- [ ] Batch 3 tool pages (15 more): Newsela already exists — skip. Targets: Wixie, Book Creator already exists, Formative already exists, Pear Deck already exists — audit for gaps then build remaining
  - Blocked April 5, 2026: the task does not define the remaining target list beyond Wixie and three already-existing pages. Per repo rule 5, this needs a concrete page list before implementation.
- [x] Add "Related tools" section to every tool page (3–4 tools in the same category, linking to their tool pages) — improves internal linking and dwell time — verified April 5, 2026 on all generated tool pages
- [x] XML sitemap update — after each batch of new pages, verify new pages are in `sitemap.xml`; add if missing — updated April 5, 2026 for blog/resource/tool/vendor backlog pages
- [x] robots.txt review — confirm no new directories need to be excluded — updated April 5, 2026 to exclude internal underscore/private directories

---

## Done
- [x] Site architecture and HTML foundation built
- [x] 31 tool pages live with substantive content (17.5KB+ each)
- [x] 6 blog posts live: ADA Title II deadline, missed deadline, enforcement update, 30-day roadmap, what is a VPAT, riskiest edtech tools
- [x] FAQ schema on all 31 real tool pages
- [x] Article schema on all 6 blog posts
- [x] OG + Twitter meta tags sitewide
- [x] Canonical tags on all 53 indexed pages
- [x] XML sitemap (53 URLs, all with lastmod, alias pages excluded)
- [x] robots.txt configured
- [x] GSC verification file at root (`google838396fbdba882e4.html`)
- [x] Internal linking: homepage → tools hub → tool pages; blog posts link to tool pages
- [x] Alias pages canonicalized and removed from sitemap (Flipgrid → Flip, IXL Learning → IXL, GoFormative → Formative)
- [x] Title tags ≤60 chars sitewide
- [x] Meta descriptions ≤156 chars sitewide
- [x] og:image as PNG (291KB) — renders on all social platforms
- [x] SEO audit completed to v3 (score: 8/10)
- [x] WCAG 2.1 AA accessibility audit completed (April 4, 2026)
- [x] Organic growth campaign plan written (`_marketing/organic-growth-campaign-plan.md`)
- [x] GSC ownership verification confirmed (April 4, 2026)
- [x] `sitemap.xml` submitted to Google Search Console (April 4, 2026)
- [x] Indexing requested via GSC URL Inspection for homepage, 2 blog posts, 3 top tool pages (April 4, 2026)
