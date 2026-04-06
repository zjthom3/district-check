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
- Delivery runbook: `_marketing/runbook.md` — SOP for delivering paid audits
- Client pipeline: `_marketing/PIPELINE.md` — active leads and revenue tracking
- Existing tool pages: `tools/*.html` — match structure and style exactly
- Existing blog posts: `blog/*.html` — match structure and style exactly

---

## Revenue Model (Confirmed — do not speculate, use this)
- **Free tool** (districtcheck.io) — top of funnel. No signup, instant risk lookup. This is the demand gen engine.
- **Pilot audit** — $1,500 flat per district (up to 15 tools). Human-delivered via the runbook SOP. 4–5 hours to deliver.
- **Retainer** — $500/month per district. Quarterly re-audit + new tool reviews on request.
- **Path to $50k MRR:** 100 retainer clients at $500/month. Near-term target: 3 paying clients by April 16 ($4,500 booked).
- The free tool funnel is: tool lookup → CRITICAL/HIGH risk surfaced → audit intake CTA → $1,500 pilot → $500/month retainer.
- There is no SaaS product. The vendor badge program (`/vendors/index.html`) is a backlog experiment, not the primary revenue path.

---

## Current Focus
**Near-term (by April 16): Book 3 paying clients at $1,500 each = $4,500. This requires direct outreach — organic SEO will not close clients in 11 days.**

**Ongoing (Weeks 1–8): Build the free tool funnel infrastructure** — audit intake page, email capture pointing to the right CTA, and the content/SEO assets that generate inbound demand over the following weeks and months.

---

## In Progress
- [ ] ⚠️ **[HUMAN] Direct outreach — 3 clients by April 16** — this is not an agent task but it is the highest-priority action in the entire plan. Organic SEO will not close clients by April 16. The only path is direct outreach to district IT directors.
  - LinkedIn: DM district technology directors and IT coordinators. Lead with the specific risk finding for a tool their district likely uses ("ClassDojo is in 85% of elementary schools and has no VPAT — happy to run a full audit for your district before the April 24 deadline").
  - Email: Send warm outreach to any existing edtech or district contacts in your network.
  - r/k12sysadmin: Post one substantive thread on ADA Title II + free tool lookup — include the DistrictCheck URL. Can drive 200–500 targeted visits within 48 hours.
  - Pitch: Free tool lookup shows the pain → "We can turn this into a full district audit report in 48 hours, $1,500 flat."
  - Track all contacts in `_marketing/PIPELINE.md`
  > **Deadline: April 16, 2026. Goal: 3 clients booked = $4,500.**

- [x] **Add email capture CTA to homepage and tool lookup result** — built April 5, 2026 with placeholder form action `YOUR_FORM_EMBED_URL` on homepage and all blog post CTA sections.
  > **Remaining:** Once the audit intake page (Phase 3) is live, update all email CTAs to point there instead of a generic form. Replace `YOUR_FORM_EMBED_URL` placeholder with the real embed once the email platform is confirmed.

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

### Phase 2 — Schema + New Tool Pages (Weeks 5–8) ✅ Complete

#### Schema
- [x] Add `BreadcrumbList` JSON-LD schema to all blog posts (`blog/*.html`) — implemented April 5, 2026 on all 6 blog posts
  - Format: `Home > Blog > [Post Title]`
  - Reference: https://schema.org/BreadcrumbList
  - Estimated effort: 1 hour for all 4 posts

- [x] Add `BreadcrumbList` JSON-LD schema to all tool pages (`tools/*.html`) — implemented April 5, 2026 via `generate-tool-pages.js` across all generated tool pages, including alias pages
  - Format: `Home > Tools > [Tool Name]`
  - Estimated effort: 2 hours (script or batch)

- [x] Add `BreadcrumbList` JSON-LD schema to category pages (once built) — implemented April 5, 2026 on `/tools/lms/index.html`, `/tools/assessment/index.html`, `/tools/communication/index.html`, and `/tools/content/index.html`
  - Format: `Home > Tools > [Category]`

#### New Tool Pages (Batch 1 — target 10 pages, prioritized by district adoption)
> Use the existing tool page HTML as the template. Match structure, risk tier format, FAQ schema, and internal linking exactly. Each page needs 350–500 words of unique prose — no copy-paste from other tool pages. Refer to `_seo/content-briefs-top-tools.md` for the content angle framework.

- [x] `/tools/zoom.html` — Zoom for Education — built April 5, 2026
- [x] `/tools/clever.html` — Clever (SSO/rostering — moderate risk, widely deployed) — built April 5, 2026
- [x] `/tools/powerschool.html` — PowerSchool SIS — built April 5, 2026
- [x] `/tools/microsoft-365.html` — Microsoft 365 for Education — built April 5, 2026
- [x] `/tools/canva-edu.html` — Canva for Education *(check if alias of existing `canva-for-education.html`)* — implemented April 5, 2026 as canonical alias to `/tools/canva-for-education.html`
- [x] `/tools/typing-com.html` — Typing.com — built April 5, 2026
- [x] `/tools/duolingo-for-schools.html` — Duolingo for Schools *(check if alias of existing `duolingo.html`)* — implemented April 5, 2026 as canonical alias to `/tools/duolingo.html`
- [x] `/tools/epic.html` — Epic! (digital reading platform) — built April 5, 2026
- [x] `/tools/edpuzzle.html` — Edpuzzle — built April 5, 2026
- [x] `/tools/kami.html` — Kami — built April 5, 2026

> For each page: research the vendor's current VPAT/ACR status, assign a risk tier (Critical / High / Medium / Low) using the same rubric as existing tool pages, write the 5 content angles from the brief template, add 2–3 FAQ schema questions, add internal links to relevant category pages.

#### New Tool Pages (Batch 2 — 10 more pages)
- [x] `/tools/google-forms.html` — Google Forms — built April 5, 2026
- [x] `/tools/flipgrid-studio.html` — check if this should be a redirect to existing Flip/Flipgrid page — implemented April 5, 2026 as canonical alias to `/tools/flip.html`
- [x] `/tools/screencastify.html` — already exists — skip — verified April 5, 2026: `tools/screencastify.html` exists and now includes breadcrumb schema via generator
- [x] `/tools/loom.html` — Loom for Education — built April 5, 2026
- [x] `/tools/notion.html` — Notion (growing in secondary ed) — built April 5, 2026
- [x] `/tools/freckle.html` — Freckle (Renaissance) — built April 5, 2026
- [x] `/tools/dreambox.html` — DreamBox Learning — built April 5, 2026
- [x] `/tools/iready.html` — i-Ready (Curriculum Associates) — built April 5, 2026 as `/tools/i-ready.html`
- [x] `/tools/lexia.html` — Lexia Core5 — built April 5, 2026
- [x] `/tools/amplify.html` — Amplify ELA/Science — built April 5, 2026

---

### Phase 3 — Conversion Layer (Weeks 9–10)

- [ ] Build `/audit/index.html` — Audit intake + booking page
  > This is the conversion destination for the free tool funnel. All "get a full audit" CTAs across the site point here. There is no SaaS product — this page sells the $1,500 human-delivered pilot audit.
  - **Above the fold:** Headline ("Get a complete ADA Title II audit for your district — delivered in 48 hours"), 3-bullet value prop (what's included, turnaround time, price), primary CTA button: "Request your audit — $1,500"
  - **What's included section:** mirrors the runbook scope — up to 15 tools, risk scorecard per tool, vendor outreach emails pre-written, executive summary for superintendent, compliance documentation trail
  - **How it works:** 3 steps — (1) Fill out the intake form (15 min), (2) We audit your tools and deliver the report (48 hrs), (3) You have documentation + a clear action plan before the April 24 deadline
  - **Intake form embed:** Google Form from the runbook SOP (questions 1–10). Embed directly on the page or link to it. Flag with `<!-- TODO: replace with real Google Form embed URL -->` until confirmed.
  - **Pricing:** $1,500 flat / district (up to 15 tools). Retainer option: $500/month for ongoing quarterly re-audits. Add a Stripe payment link or "Request invoice" button.
  - **Trust signals:** reference the April 24, 2026 ADA Title II deadline; note that districts under most micro-purchase thresholds ($2,500–$10,000) don't need a PO
  - No FAQ schema on this page — it's a conversion page. Add Article schema only if a longer explanatory section is added.
  - No `/pro/index.html` — do not create that path. If it exists already, add a redirect canonical pointing to `/audit/index.html`.

- [ ] Update all tool page CTAs to point to `/audit/index.html`
  - Replace any existing "Get a full district report →" links that point to `/pro/index.html`
  - Place below the "Recommended next steps" section on every tool page
  - CTA text: "Get a full district audit →" or "Book your district audit — $1,500"
  - Style as a secondary CTA (accent color, outlined button), distinct from the primary tool lookup
  - Priority: do CRITICAL and HIGH risk tool pages first (ClassDojo, Edulastic, Kahoot, etc.)

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
- [x] 47 real tool pages live with substantive content (plus 6 canonical alias pages)
- [x] 6 blog posts live: ADA Title II deadline, missed deadline, enforcement update, 30-day roadmap, what is a VPAT, riskiest edtech tools
- [x] FAQ schema on all 47 real tool pages
- [x] Article schema on all 6 blog posts
- [x] OG + Twitter meta tags sitewide
- [x] Canonical tags on all 66 indexed pages
- [x] XML sitemap (66 URLs, all with lastmod, alias pages excluded)
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
